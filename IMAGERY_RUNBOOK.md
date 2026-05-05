# U-Calm Aviation — Imagery Runbook

How to generate the 162-prompt brand photography library with **Gemini 3.1 Flash Image (Nano Banana 2)** and wire it into the live site.

This is a discrete, considered piece of work — schedule it for an unhurried morning, ideally just after Sunday-morning Claude credit refresh if you want to use Claude Design alongside for mood-board iteration. Total ~$10 at 2K, ~$15 at 4K, takes about an hour of script time once running.

## What you have already

- **`brand-assets/scripts/prompts.py`** — single source of truth, 162 prompts across 13 sections. Each prompt: id, filename, title, body (composition + lens + light + triad + discipline notes), aspect ratio. The global brand grammar (Deep Teal palette, three principles of Continuity / Quietness / Warmth, face-out-of-frame discipline, no-rendered-text rule, cabin-realism rules, disqualified-register list) is prepended to every generation as system instruction.
- **`brand-assets/scripts/generate_imagery.py`** — orchestration: section batching, exponential-backoff retry on 429s, idempotent (skips files already generated unless `--force`), `manifest.jsonl` provenance write, dry-run mode.
- **`brand-assets/scripts/requirements.txt`** — `google-genai`.
- **`brand-assets/_incoming-imagery/`** — empty folder ready to receive generated jpgs (gitignored).
- **`src/brand/imagery.ts`** — the typed manifest already wires all 162 slots. Currently `IMAGERY_READY = false`, so every slot renders the gradient placeholder. Flip this to `true` once images are in place.

## One-time setup (Mac terminal)

```bash
cd ~/Documents/Claude/Projects/u-calm-aviation

# Python virtual environment, in the repo root
python3 -m venv .venv
source .venv/bin/activate
pip install -r brand-assets/scripts/requirements.txt
```

You'll need a **Gemini API key** from https://aistudio.google.com/apikey (free to create, billing is per-image; the script uses your project's key). Export it for the session:

```bash
export GEMINI_API_KEY="your-key-here"
```

(If you want this to persist across terminal sessions, add the `export` line to `~/.zshrc`.)

## Step 1 — Smoke test (12 images, ~$1.30 at 2K)

Always start here. Generates one image per section (14 with the Milan addition), exercises the face-out-of-frame discipline (#124, #126), and stress-tests the no-rendered-text rule (#144). If these come back looking right, the rest of the library will too.

```bash
python3 brand-assets/scripts/generate_imagery.py --test
```

Output lands in `brand-assets/generated/<section-slug>/` per image. Open the folder in Finder and look at all 14:

- **Palette check** — every frame should have a Deep Teal in the deepest shadow, Champagne in the warm highlight, Ivory or Cloud-White as dominant surface. **No red anywhere. No orange.** If anything reads cool-blue-tinted or warm-orange-saturated, regenerate that ID.
- **Face check** — no recognisable faces, no eyes-to-camera. Backs, silhouettes, fragments only. If a face appears, re-run with `--ids <id> --force`.
- **Text check** — zoom into any surface that could carry writing (book spines, brass plaques, watch dials, signage, magazines). If you see *any* pseudo-letter-forms, regenerate.
- **Cabin realism** (cabin shots only) — oval windows, curved walls, business-jet proportions. Not a hotel suite, not a yacht saloon, not an airliner.

If you want to eyeball the composed prompts before spending any money, add `--dry-run`:

```bash
python3 brand-assets/scripts/generate_imagery.py --test --dry-run
```

## Step 2 — Section by section (recommended over a single full run)

Batching by section keeps the lighting / mood / triad consistent within each group. After the test passes, work through the sections one at a time:

```bash
# London (14 images, ~$1.40)
python3 brand-assets/scripts/generate_imagery.py --section 2

# Lugano (10 images, ~$1.00)
python3 brand-assets/scripts/generate_imagery.py --section 3

# ...and so on
```

The 13 sections in order:

| § | Slug | Count | Cost @ 2K | Theme |
|---|------|-------|-----------|-------|
| 1 | brand-heroes | 10 | ~$1.00 | Brand-defining heroes (London hallway, threshold, garden) |
| 2 | london | 14 | ~$1.40 | Knightsbridge, Belgravia, Mayfair, Notting Hill |
| 3 | lugano-ticino | 10 | ~$1.00 | Lake terrace, Italianate arcades, LSZA apron |
| 4 | gstaad-alpine | 14 | ~$1.40 | Chalet interiors, Piz Nair, Samedan |
| 5 | monaco-cote-dazur | 10 | ~$1.00 | Pre-dawn harbour, corniche, Cap Ferrat |
| 6 | mediterranean-islands | 14 | ~$1.40 | Ibiza, Mykonos, Mustique — salt and stone |
| 7 | provence-countryside | 10 | ~$1.00 | Olive trees, lavender, stone farmhouses |
| 8 | caribbean-transatlantic | 8 | ~$0.80 | Mustique, Aspen, Manhattan first light |
| 9 | domestic-interiors | 15 | ~$1.50 | Member homes, anticipation, before-and-after |
| 10 | cabin-stills | 13 | ~$1.30 | Aircraft interiors (Global / Gulfstream / Falcon) |
| 11 | hands-and-vignettes | 14 | ~$1.40 | Fragments, cuffs, breath on glass |
| 12 | textures-ambient-arrivals | 18 | ~$1.80 | Linen, leather, brass, light pools |
| 13 | milan-english-speaker-city | 12 | ~$1.20 | Milan-as-Milan + Italy-for-English-speakers |
| **Total** | | **162** | **~$16.20 at 2K** | |

(1K is cheaper at ~$11 for the full set, but doesn't meet the medium-format brief. 4K is ~$24. Stick with 2K for production assets.)

Specific ids:
```bash
python3 brand-assets/scripts/generate_imagery.py --ids 151,152,157,162
```

Force regenerate (clears existing file before re-running):
```bash
python3 brand-assets/scripts/generate_imagery.py --ids 151 --force
```

Full library at 2K (don't do this until the per-section results are landing right):
```bash
python3 brand-assets/scripts/generate_imagery.py --all --resolution 2K
```

## Step 3 — Curate

The `brand-assets/generated/` folder is gitignored — it's an inbox, not a vault. Work through the generated set:

1. **Reject and regenerate** anything failing the brand book §11 image-test (the seven gates: subject-matter, identity, light, composition, grade, wellness, continuity).
2. **Move keepers** into `brand-assets/_incoming-imagery/<section-slug>/` (this folder is also gitignored but is the staging area read by the wiring step).
3. **Optional**: keep a side-folder of "generated but not used yet" alternates for future swap-in.

## Step 4 — Wire into the live site

Once `brand-assets/_incoming-imagery/` has the curated set:

```bash
# From the repo root, copy the curated images into the public folder
mkdir -p public/brand
rsync -av --include='*/' --include='*.jpg' --exclude='*' \
  brand-assets/_incoming-imagery/ public/brand/
```

Then:

1. Open `src/brand/imagery.ts`.
2. Change `export const IMAGERY_READY = false;` to `export const IMAGERY_READY = true;`.
3. (Optional) Re-tune the typed exports (`PAGE_HEROES`, `THREE_CITIES`, `HOME_EDITORIAL`, `SERVICES_SCENES`, `ABOUT_SCENES`, `CONTACT_EDITORIAL`, `SEASONAL_BANK`) to point at your favourite ids from the curated set rather than the defaults I set during the wire-up. Each typed export is a small object — change a few numbers, save.
4. `npm run dev` and walk every page. The gradient placeholders are now real photographs.

If a slot is still missing a photograph (e.g., you didn't curate a particular id), the BrandImage component falls back to the gradient automatically — it will look fine.

## Troubleshooting

**`Cannot find module @rollup/rollup-darwin-arm64` or similar** — your local node_modules may have stale platform binaries. Fix: `rm -rf node_modules package-lock.json && npm install`.

**`google.genai.errors.PermissionDeniedError`** — your `GEMINI_API_KEY` is missing or wrong. Check the env var is exported in the same shell where you're running the script.

**`429 Too Many Requests`** — the script handles this with exponential backoff. If you keep hitting it, you've burned through your daily quota; wait until tomorrow.

**An image came back with garbled pseudo-text on a book spine** — re-run that single id with `--force`. The text rule sometimes needs two passes; if it fails twice, edit the prompt body in `prompts.py` to call out the specific failure (e.g., "the book spine is turned to the wall, no cover or spine visible") and regenerate.

**A face appeared in focus** — re-run with `--force`. If it persists, check the prompt body — does it say "deeply out of focus" / "back of head" / "silhouette"? If not, add the language and regenerate.

**The colours read cool-blue or warm-orange** — never colour-grade in post. Edit the prompt body to be more specific about the triad (e.g., "warm champagne midtones, deep teal shadow only, no orange in the highlight roll-off") and regenerate.

## What's next

Once the library is in place and `IMAGERY_READY = true`:
- The site is visually complete and ready for production deploy.
- The Supabase backend wiring (contact form → Edge Function → Resend → `flyhigh@u-calmaviation.com`) is the next discrete piece — see the existing tasks #8-12 in the project task list.
- After backend, GitHub repo + Cloudflare Pages + custom domain `u-calmaviation.com` + Google Workspace alias for `flyhigh@` — tasks #13-16.

## References

- `brand-assets/11-Photography-and-Imagery.md` — the brand-level visual rules and the 7-gate image test
- `brand-assets/12-AI-Prompt-Templates.md` — copy-paste prompts for non-photography uses (mood-board prompts, member-story illustrations)
- `brand-assets/scripts/prompts.py` — the 162 image briefs
- `brand-assets/scripts/generate_imagery.py` — the orchestration script
- `src/brand/imagery.ts` — the typed manifest the React components consume

---

**Version**: 2026-05-03. Aviation library v1 — 162 prompts including the new §13 Milan section (12 prompts split between Milan-as-Milan and Milan-as-Italy-for-English-speakers). Maintained alongside the brand book; reviewed when prompt iteration produces a meaningfully better visual law.
