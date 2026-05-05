#!/usr/bin/env python3
"""
U-Calm Aviation — Nano Banana 2 imagery pipeline.

Runs the 150-prompt library through Gemini 3.1 Flash Image with:
  • The global brand grammar prepended as a system instruction
  • The shared negative prompt appended to every body
  • Section-by-section batching (each section shares lighting & palette)
  • Exponential-backoff retry on 429 / 5xx
  • Deterministic output paths under brand-assets/generated/<section>/<filename>
  • A JSONL manifest of what was generated, for provenance

Quick start (2K test run, one image per section):
    export GEMINI_API_KEY=...
    python3 generate_imagery.py --test

Full library at 2K:
    python3 generate_imagery.py --all --resolution 2K

Regenerate one section only:
    python3 generate_imagery.py --section 5

Regenerate specific IDs:
    python3 generate_imagery.py --ids 61,67,77

Clean re-run (delete prior outputs + prune manifest first — recommended):
    python3 generate_imagery.py --test --clear
    python3 generate_imagery.py --section 5 --clear
    python3 generate_imagery.py --ids 61,67,77 --clear

Dry run (print the full prompt for each, no API calls):
    python3 generate_imagery.py --test --dry-run
"""

from __future__ import annotations

import argparse
import datetime as dt
import json
import os
import random
import sys
import time
from pathlib import Path
from typing import Iterable, List, Optional

# Local import — the prompt data module lives next to this file.
SCRIPT_DIR = Path(__file__).resolve().parent
sys.path.insert(0, str(SCRIPT_DIR))
from prompts import (  # noqa: E402
    GLOBAL_RULES,
    NEGATIVE_PROMPT,
    SECTIONS,
    Prompt,
    Section,
    all_prompts,
    section_by_number,
    test_prompts,
)

REPO_ROOT = SCRIPT_DIR.parent.parent
BRAND_ROOT = SCRIPT_DIR.parent  # u-calm-brand-assets/
DEFAULT_OUT_DIR = BRAND_ROOT / "_incoming-imagery"
MANIFEST_PATH = DEFAULT_OUT_DIR / "manifest.jsonl"

DEFAULT_MODEL = "gemini-3.1-flash-image-preview"
VALID_RESOLUTIONS = ("1K", "2K", "4K")


# ---------------------------------------------------------------------------
# Prompt assembly
# ---------------------------------------------------------------------------

def build_full_prompt(p: Prompt) -> str:
    """Compose the per-image prompt. The GLOBAL_RULES go in system_instruction;
    here we just add the image-specific body, framing, and negative prompt."""
    return (
        f"Image subject: {p.title}.\n\n"
        f"{p.body}\n\n"
        f"Aspect ratio: {p.aspect}. "
        f"Shot on medium-format (Hasselblad X2D or Phase One XF, 80mm). "
        f"Maintain the U-Calm Aviation visual grammar from the system instruction.\n\n"
        f"{NEGATIVE_PROMPT}"
    )


# ---------------------------------------------------------------------------
# Gemini client — kept lazy so --dry-run works without the SDK/key.
# ---------------------------------------------------------------------------

class GeminiImageClient:
    def __init__(self, api_key: str, model: str, resolution: str,
                 allow_downgrade: bool = False):
        from google import genai  # type: ignore
        from google.genai import types  # type: ignore

        self._genai = genai
        self._types = types
        self._client = genai.Client(api_key=api_key)
        self.model = model
        self.resolution = resolution

        # Probe which fields ImageConfig actually accepts on this SDK version.
        # Older google-genai builds only expose aspect_ratio; newer ones
        # (~1.x) also accept image_size="1K"|"2K"|"4K".
        self._image_config_fields = self._probe_image_config_fields()
        if "image_size" not in self._image_config_fields and resolution != "1K":
            msg = (
                f"Installed google-genai SDK does not support image_size — "
                f"a run at '{resolution}' would silently fall back to ~1K.\n"
                f"  Fix:      pip install -U 'google-genai>=1.0.0'\n"
                f"  Override: re-run with --allow-downgrade to proceed at ~1K."
            )
            if not allow_downgrade:
                raise RuntimeError(msg)
            print(f"WARNING (downgrade allowed): {msg}")

    def _probe_image_config_fields(self) -> set[str]:
        """Return the set of field names supported by ImageConfig on the
        installed SDK. Works with either pydantic v2 model_fields or
        dataclass __dataclass_fields__ or as a last resort an introspection
        of __init__ kwargs."""
        ImageConfig = getattr(self._types, "ImageConfig", None)
        if ImageConfig is None:
            return set()
        model_fields = getattr(ImageConfig, "model_fields", None)
        if model_fields:
            return set(model_fields.keys())
        dc_fields = getattr(ImageConfig, "__dataclass_fields__", None)
        if dc_fields:
            return set(dc_fields.keys())
        # Last resort — try a minimal instantiation and catch the error.
        return {"aspect_ratio"}

    def _build_image_config(self, aspect: str):
        types = self._types
        kwargs: dict = {}
        if "aspect_ratio" in self._image_config_fields:
            kwargs["aspect_ratio"] = aspect
        if "image_size" in self._image_config_fields:
            kwargs["image_size"] = self.resolution
        return types.ImageConfig(**kwargs)

    def _build_config(self, aspect: str):
        """Build a GenerateContentConfig. System instruction + aspect (+ size
        where supported). Fields the SDK doesn't recognise are dropped."""
        types = self._types
        try:
            return types.GenerateContentConfig(
                response_modalities=["IMAGE"],
                image_config=self._build_image_config(aspect),
                system_instruction=GLOBAL_RULES,
            )
        except TypeError:
            raise RuntimeError(
                "Installed google-genai SDK is too old to generate images. "
                "Upgrade with: pip install -U google-genai"
            )

    def generate(self, prompt: Prompt) -> bytes:
        config = self._build_config(prompt.aspect)
        response = self._client.models.generate_content(
            model=self.model,
            contents=build_full_prompt(prompt),
            config=config,
        )
        # Walk the response for the first inline image part.
        for candidate in getattr(response, "candidates", []) or []:
            content = getattr(candidate, "content", None)
            if content is None:
                continue
            for part in getattr(content, "parts", []) or []:
                inline = getattr(part, "inline_data", None)
                if inline is not None and getattr(inline, "data", None):
                    return inline.data

        # Nothing returned — surface useful detail for debugging.
        reason = getattr(response, "prompt_feedback", None)
        raise RuntimeError(
            f"No image returned for prompt #{prompt.id} ({prompt.filename}). "
            f"Feedback: {reason!r}"
        )


# ---------------------------------------------------------------------------
# Retry with exponential backoff
# ---------------------------------------------------------------------------

class RateLimitOrTransientError(Exception):
    pass


def is_retryable(err: BaseException) -> bool:
    msg = f"{err.__class__.__name__}: {err}".lower()
    if "429" in msg or "rate" in msg or "quota" in msg:
        return True
    if "503" in msg or "504" in msg or "500" in msg:
        return True
    if "deadline" in msg or "timeout" in msg or "unavailable" in msg:
        return True
    return False


def with_backoff(fn, *, max_attempts: int = 6, base_delay: float = 2.0):
    """Call fn() with exponential backoff + jitter on retryable errors."""
    last_err: Optional[BaseException] = None
    for attempt in range(1, max_attempts + 1):
        try:
            return fn()
        except BaseException as err:  # noqa: BLE001
            last_err = err
            if not is_retryable(err) or attempt == max_attempts:
                raise
            delay = base_delay * (2 ** (attempt - 1)) + random.uniform(0, 0.75)
            print(f"   ↳ transient error: {err}. Retry {attempt}/{max_attempts - 1} in {delay:.1f}s")
            time.sleep(delay)
    assert last_err is not None
    raise last_err


# ---------------------------------------------------------------------------
# Orchestration
# ---------------------------------------------------------------------------

def group_by_section(prompts: Iterable[Prompt]) -> List[tuple[Section, List[Prompt]]]:
    by_section: dict[int, list[Prompt]] = {}
    for p in prompts:
        for s in SECTIONS:
            if p in s.prompts:
                by_section.setdefault(s.number, []).append(p)
                break
    return [(section_by_number(n), by_section[n]) for n in sorted(by_section)]


def output_path(out_dir: Path, section: Section, prompt: Prompt) -> Path:
    return out_dir / section.slug / prompt.filename


def append_manifest(entry: dict) -> None:
    MANIFEST_PATH.parent.mkdir(parents=True, exist_ok=True)
    with MANIFEST_PATH.open("a", encoding="utf-8") as f:
        f.write(json.dumps(entry, ensure_ascii=False) + "\n")


def prune_manifest(paths_to_drop: set[str]) -> int:
    """Remove all manifest entries whose 'path' is in paths_to_drop.

    Returns the number of rows dropped. Malformed lines are preserved so we
    never lose data through a parse error."""
    if not MANIFEST_PATH.exists() or not paths_to_drop:
        return 0
    kept: list[str] = []
    dropped = 0
    for line in MANIFEST_PATH.read_text(encoding="utf-8").splitlines():
        if not line.strip():
            continue
        try:
            rec = json.loads(line)
        except json.JSONDecodeError:
            kept.append(line)
            continue
        if rec.get("path") in paths_to_drop:
            dropped += 1
        else:
            kept.append(line)
    MANIFEST_PATH.write_text(("\n".join(kept) + "\n") if kept else "",
                             encoding="utf-8")
    return dropped


def clear_targets(
    groups: List[tuple[Section, List[Prompt]]],
    out_dir: Path,
) -> tuple[int, int]:
    """Delete output files and prune manifest rows for every prompt in groups.

    Scope is exactly the prompt set being run — never the whole generated/ tree.
    Returns (files_deleted, manifest_rows_dropped)."""
    files_deleted = 0
    paths_to_drop: set[str] = set()
    for section, items in groups:
        for p in items:
            dest = output_path(out_dir, section, p)
            if dest.exists():
                dest.unlink()
                files_deleted += 1
            paths_to_drop.add(str(dest.relative_to(REPO_ROOT)))
    rows_dropped = prune_manifest(paths_to_drop)
    return files_deleted, rows_dropped


def run(
    prompts_to_run: List[Prompt],
    *,
    out_dir: Path,
    resolution: str,
    model: str,
    dry_run: bool,
    force: bool,
    clear: bool,
    sleep_between: float,
    allow_downgrade: bool = False,
) -> int:
    print(f"U-Calm Aviation imagery pipeline")
    print(f"  model:       {model}")
    print(f"  resolution:  {resolution}")
    print(f"  output:      {out_dir}")
    print(f"  prompts:     {len(prompts_to_run)}")
    print(f"  mode:        {'DRY RUN (no API calls)' if dry_run else 'live generation'}")
    if clear:
        print(f"  clear:       on  (delete prior outputs + prune manifest first)")
    if force:
        print(f"  force:       on  (overwrite existing files; prior manifest rows pruned)")
    print("")

    groups = group_by_section(prompts_to_run)

    # --- Pre-run cleanup --------------------------------------------------
    # --clear: delete the target files AND drop their manifest rows. After
    #          this the rest of the run is just a normal first-time write.
    # --force: leave files in place but drop their manifest rows so the new
    #          rows we're about to append don't pile on top of stale ones.
    # Both are scoped strictly to the prompt set being run.
    if clear and not dry_run:
        files_deleted, rows_dropped = clear_targets(groups, out_dir)
        print(f"  cleared {files_deleted} file(s), pruned {rows_dropped} manifest row(s)\n")
    elif clear and dry_run:
        would_delete = sum(
            1 for section, items in groups for p in items
            if output_path(out_dir, section, p).exists()
        )
        print(f"  [dry-run] would clear {would_delete} file(s) and matching manifest rows\n")
    elif force and not dry_run:
        paths = {
            str(output_path(out_dir, section, p).relative_to(REPO_ROOT))
            for section, items in groups for p in items
        }
        rows_dropped = prune_manifest(paths)
        print(f"  pruned {rows_dropped} prior manifest row(s) for these prompts\n")

    client: Optional[GeminiImageClient] = None
    if not dry_run:
        api_key = os.environ.get("GEMINI_API_KEY")
        if not api_key:
            print("ERROR: GEMINI_API_KEY environment variable is not set.", file=sys.stderr)
            return 2
        try:
            client = GeminiImageClient(
                api_key=api_key,
                model=model,
                resolution=resolution,
                allow_downgrade=allow_downgrade,
            )
        except ImportError:
            print("ERROR: google-genai is not installed. Run: pip install -U google-genai",
                  file=sys.stderr)
            return 2
        except RuntimeError as err:
            print(f"ERROR: {err}", file=sys.stderr)
            return 3

    total = len(prompts_to_run)
    done = 0
    skipped = 0
    failed = 0

    for section, items in groups:
        print(f"── Section {section.number:02d} · {section.name} ({len(items)} image(s))")
        for p in items:
            dest = output_path(out_dir, section, p)
            dest.parent.mkdir(parents=True, exist_ok=True)

            if dest.exists() and not force:
                print(f"  [skip] #{p.id:3d} {p.filename}  (already exists)")
                skipped += 1
                continue

            print(f"  [run ] #{p.id:3d} {p.filename}  · {p.aspect}  · {p.title}")
            if dry_run:
                # Show the first couple of lines of the composed prompt so the
                # user can sanity-check before a paid run.
                preview = build_full_prompt(p).splitlines()[0]
                print(f"         ↳ {preview}")
                done += 1
                continue

            assert client is not None
            try:
                image_bytes = with_backoff(lambda: client.generate(p))
                dest.write_bytes(image_bytes)
                append_manifest({
                    "id": p.id,
                    "filename": p.filename,
                    "section": section.slug,
                    "aspect": p.aspect,
                    "title": p.title,
                    "resolution": resolution,
                    "model": model,
                    "bytes": len(image_bytes),
                    "generated_at": dt.datetime.now(dt.timezone.utc).isoformat(),
                    "path": str(dest.relative_to(REPO_ROOT)),
                })
                done += 1
                print(f"         ↳ saved {len(image_bytes) / 1024:.0f} KB → {dest.relative_to(REPO_ROOT)}")
            except Exception as err:  # noqa: BLE001
                failed += 1
                print(f"         ↳ FAILED: {err}")

            if sleep_between > 0 and not dry_run:
                time.sleep(sleep_between)
        print("")

    print(f"Done. generated={done}  skipped={skipped}  failed={failed}  of total={total}")
    return 0 if failed == 0 else 1


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------

def parse_ids(raw: str) -> List[int]:
    return [int(x.strip()) for x in raw.split(",") if x.strip()]


def select_prompts(args) -> List[Prompt]:
    if args.test:
        return test_prompts()
    if args.ids:
        ids = set(parse_ids(args.ids))
        return [p for p in all_prompts() if p.id in ids]
    if args.section is not None:
        return list(section_by_number(args.section).prompts)
    if args.all:
        return list(all_prompts())
    return []


def main(argv: Optional[List[str]] = None) -> int:
    parser = argparse.ArgumentParser(
        description="Generate the U-Calm Aviation imagery library with Nano Banana 2.",
    )
    scope = parser.add_mutually_exclusive_group()
    scope.add_argument("--test", action="store_true",
                       help="Run the 13-prompt smoke test (stress-tests faces + text).")
    scope.add_argument("--all", action="store_true",
                       help="Run the full 150-prompt library.")
    scope.add_argument("--section", type=int,
                       help="Run a single section by number (1-12).")
    scope.add_argument("--ids", type=str,
                       help="Run specific prompt ids, comma-separated (e.g. 1,11,22).")

    parser.add_argument("--resolution", choices=VALID_RESOLUTIONS, default="2K",
                        help="Target image size. Default: 2K.")
    parser.add_argument("--model", default=DEFAULT_MODEL,
                        help=f"Gemini image model. Default: {DEFAULT_MODEL}.")
    parser.add_argument("--out", type=Path, default=DEFAULT_OUT_DIR,
                        help="Output directory. Default: u-calm-brand-assets/_incoming-imagery/")
    parser.add_argument("--dry-run", action="store_true",
                        help="Do not call the API — just print what would run.")
    parser.add_argument("--force", action="store_true",
                        help=("Regenerate even if the output file already exists. "
                              "Also prunes prior manifest rows for these paths so the "
                              "manifest doesn't accumulate duplicates across re-runs."))
    parser.add_argument("--clear", action="store_true",
                        help=("Before generating, delete the destination files for the "
                              "selected prompts AND prune their manifest rows. Use this "
                              "when you want a clean slate for the prompt set you're "
                              "running. Strictly scoped — never touches files outside "
                              "the selected prompt set."))
    parser.add_argument("--sleep", type=float, default=0.5,
                        help="Seconds to wait between calls (helps with rate limits). Default: 0.5.")
    parser.add_argument("--allow-downgrade", action="store_true",
                        help=("Proceed at ~1K if the installed google-genai SDK does not "
                              "support image_size. Off by default to prevent a paid 2K/4K "
                              "run from silently returning 1K images."))

    args = parser.parse_args(argv)
    prompts_to_run = select_prompts(args)

    if not prompts_to_run:
        parser.print_help()
        print("\nNothing selected. Choose one of --test, --all, --section, or --ids.",
              file=sys.stderr)
        return 2

    return run(
        prompts_to_run,
        out_dir=args.out,
        resolution=args.resolution,
        model=args.model,
        dry_run=args.dry_run,
        force=args.force,
        clear=args.clear,
        sleep_between=args.sleep,
        allow_downgrade=args.allow_downgrade,
    )


if __name__ == "__main__":
    sys.exit(main())
