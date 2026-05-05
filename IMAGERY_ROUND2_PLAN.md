# U-Calm Aviation — Imagery Round 2 plan (Michael's feedback reconciled)

Source: `MICHAEL_FEEDBACK.csv` (160 of 162 photos, 2026-05-05).
Cross-referenced against Raf's must-keeps (`IMAGERY_RAF_KEEPERS.md`)
and the live typed-export allocations (`src/brand/imagery.ts`).

## Status

- ✅ **Wave 1 complete** (2026-05-05) — 4 swaps applied in `imagery.ts` +
  Index.tsx + Destinations.tsx; 3 discards set `enabled: false` in
  `BRAND_IMAGES`. Live site now uses Michael-pre-approved photos in
  every previously-flagged P0 slot except where Gemini regen is needed.
- ✅ **Wave 2 complete** (2026-05-05) — `prompts.py` patched with two
  systemic reinforcements (body-always-implied + watches-back-only) and
  surgical fixes on #5, #45, #75, #76, #125.
- ⏳ **Wave 3 pending** — run Gemini regen for #5, #45, #76, #125, plus
  the still-missing #51 monaco-study-lamplit. Command at the end of
  this file.

## Verdict counts

| Verdict | Count | Notes |
|---|--:|---|
| **KEEP — strong** | ~85 | "Perfect", "lovely", "great", "wonderful", "gorgeous" |
| **KEEP — with "if accurate" caveat** | ~25 | Geographic plausibility worry; AI imagery is impressionistic — accept as-is |
| **REGEN** | ~20 | Specific issue Michael wants fixed |
| **SMALL FIX** | ~12 | One element to remove/replace; same composition |
| **DISCARD** | 3 | "No thanks" / "completely senseless" — drop from library |
| **NO COMMENT** | 1 | gstaad-chalet-dawn (#35) — chase Michael for verdict |

Total: 162 photos. Net **30–35 photos need work**, the rest stand.

---

## P0 — Live-site regens (8 photos behind currently-shown slots)

These are the ones the few people you're sharing with will actually see.
Fix these first.

| # | Slot consumed | Photo | Michael's verdict | Action |
|---|---|---|---|---|
| 143 | `HOME_EDITORIAL.one` (Index §2 paired image) | arrange-garment-bag | "ehh feels fake" | **REGEN** — re-roll with the same prompt; if still fake, swap to **#15 london-breakfast-tray** ("Sure") or **#91 interior-breakfast-tray** ("nice") |
| 125 | `SERVICES.protection` (Executive Protection ServiceDetail hero) | hand-at-car-door | "what is the interior? seems weird" | **REGEN** — tighten prompt to "rear-door interior, no occupant visible, walnut + leather, hand entering frame from upper-left" |
| 129 | `ABOUT.team` (About §5 team) | forearm-railing-alpine | "weird hand placement, where is the body?" | **REGEN** — prompt update: "forearm framed mid-image, full sleeve cuff visible, body implied off-camera left" |
| 43 | Destinations Featured St. Moritz + Index §8 St. Moritz | stmoritz-lake-afternoon | "feels like a person wouldn't walk on ice this cracked" | **REGEN** — prompt fix: drop the figure; St. Moritz lake at 16:00, low sun, no walker on ice |
| 7 | Destinations Featured Mykonos | hero-mykonos-threshold | "Lovely but the shoulder cutting off is weird" | **SMALL FIX** — remove the figure entirely; Mykonos doorway empty |
| 76 | Destinations Featured Tuscany | tuscany-villa-loggia | "Weird arm, remove. All else is lovely" | **SMALL FIX** — remove the arm; same composition otherwise |
| 5 | `SEASONAL.winterHearth` (Footer texture band) | hero-gstaad-chalet | "Socks are weirdly placed" | **SMALL FIX** — remove the socks; same composition otherwise |
| 45 | `SEASONAL.springDinner` (RESERVED — not currently consumed but typed) | alpine-morning-coffee | "Is that a pear or a wooden toy? Change the fruit" | **SMALL FIX** — replace fruit with apple or pomegranate |

---

## P1 — Discards (drop from typed slots and from library)

These three are the only "no thanks" verdicts. Drop them.

| # | Photo | Verdict | Action |
|---|---|---|---|
| 44 | stmoritz-lobby-window | "Really weird see through room, no thanks" | Mark `enabled: false` in `BRAND_IMAGES`; not currently typed anywhere — no slot disruption |
| 122 | cuff-sill | "decapitated hand no thanks" | Mark `enabled: false`; not currently typed |
| 130 | hand-porcelain-cup | "completely senseless unless we're selling prosthesis" | Mark `enabled: false`; not currently typed |

Note: **#84 nyc-pied-a-terre** is filed under `08-caribbean-transatlantic` but it's NYC. Michael flagged this ("seems out of place for caribbean") — the photo itself is fine ("morning, considered" residence) but the folder is misleading. Consider moving it to a North America section or relabelling. Not urgent — currently in Destinations gallery only.

---

## P2 — Library regens (not currently typed, lower priority)

Fix these with the next regen batch but they're not visible on the live site, so this can wait until Round 2 cleanup is done.

| # | Photo | Verdict |
|---|---|---|
| 2 | hero-quiet-threshold | Hand looks weirdly photoshopped |
| 18 | london-knightsbridge-hall | Weird motion blur (we replaced this earlier due to background figure) |
| 19 | london-farnborough-apron | Plane support struts implausible |
| 22 | london-evening-return | Very weird door dimensions |
| 36 | gstaad-fireplace | Fire looks fake + book writing weird |
| 54 | monaco-car-kerb | Car feels fake |
| 63 | mustique-veranda | "The man has no legs" |
| 81 | provence-outdoor-bath | Weird bathtub placement |
| 89 | transatlantic-cruise-window | "Go away strange hand" |
| 98 | interior-flowers-restrained | Weird positioning of the person |
| 101 | interior-hall-evening-return | Weird arm |
| 107 | cabin-window-soft-cloud | Weird hand |
| 111 | cabin-reading-lamp | "Weird hand again, where is the person's body, outside the plane?" |
| 116 | cabin-pet-carrier | Weird dog |
| 118 | cabin-breakfast-late | Clouds too fake |
| 135 | texture-brass-worn | Weird placement |
| 155 | milan-quadrilatero-dusk | Car feels out of place |

---

## P3 — Small fixes (one element to remove or swap)

These keep their composition, just fix the named element. Cheaper to regen with a tweaked prompt.

| # | Photo | What to fix |
|---|---|---|
| 24 | london-stairwell | Remove the book |
| 26 | lugano-palazzo-doorway | Remove the plaque (or add real text) |
| 33 | lugano-alpine-shoulder | Watch back / no face — see P4 |
| 52 | monaco-threshold | Remove the plan paper |
| 67 | mustique-hand-railing | Watch fix — see P4 |
| 75 | provence-kitchen-terracotta | Replace the wooden pear with real fruit |
| 94 | interior-study-lamplit | Subtle device branding (no logo reads "sus") |
| 108 | cabin-galley-detail | Remove the towel |
| 119 | hand-stone-balustrade | Watch fix (Michael wrote "reverse watch") — see P4 |
| 144 | arrange-concierge-note | Remove the card |
| 157 | milan-english-kitchen-italian-window | Fix the milk jug |

---

## P4 — Systemic prompt updates (`brand-assets/scripts/prompts.py`)

Three patterns repeat across photos. Best to fix once in the prompt source and let the regens inherit the rule.

### 1. Watches
Three photos got the same complaint. Brand book §11 and Michael align: **don't show watch faces**.

Photos: #33 lugano-alpine-shoulder, #67 mustique-hand-railing, #119 hand-stone-balustrade.

Add to prompts.py for any photo featuring a wrist:
> "Watch — strap and back-of-watch only; never the face. No brand logos. No visible dial. The crown side may be implied at the edge of frame."

### 2. Body parts (hands without bodies)
Eight regen flags about disembodied hands, weird arms, "where is the body?" Michael wants the body implied off-frame, not literally severed.

Photos: #2, #63, #89, #98, #101, #107, #111, #125, #129.

Add to prompts.py for any photo with a hand or partial figure:
> "Hand or forearm framed naturally — body always implied off-camera, never bisected at the wrist or forearm. Cuff/shirt sleeve visible, never floating limbs."

### 3. Milan should not feel like Lugano
Two photos got "feels like lugano" — #160 milan-walnut-library-como-view and #162 milan-como-weekend-kitchen. The English-speaker-Milan register risks dissolving into Ticinese-Lugano warmth.

Update Milan §13 prompts to push toward:
- Quadrilatero d'Oro fashion district neutrals (cream, charcoal, oxblood)
- Palazzo formality over chalet rusticity
- Sycamore + travertine, not lake stone + larch
- North-light, not golden-hour warmth

---

## P5 — Sequencing recommendation

**This week (before sharing the live URL widely):**
1. Run P0 regens (8 photos behind live slots).
2. Apply P1 discards (`enabled: false` on 3 photos).
3. Patch the watch + body-parts prompt-source rules in `prompts.py` (P4.1 + P4.2).

**Next week (post-share, before custom domain wires):**
4. Run P2 library regens (17 photos).
5. Run P3 small fixes (11 photos).
6. Apply P4.3 Milan register update + regen the 12 Milan photos.

**Before public launch:**
7. Final pass — get Michael's verdict on the regens; chase him for #35 gstaad-chalet-dawn (no comment in CSV).

---

## Wave 3 — Gemini regen command

Five photos to regenerate. Four are Michael's surgical fixes; #51 is the one
that never generated cleanly first time round (currently library-reserve).

```bash
cd ~/Documents/Claude/Projects/u-calm-aviation
export GEMINI_API_KEY=...           # use the same key you used for Round 1
python3 brand-assets/scripts/generate_imagery.py --ids 5,45,51,75,76,125 --clear
```

Output lands in `brand-assets/_incoming-imagery/<section>/<filename>.jpg`.
Review each; if happy, copy them into `public/brand/<section>/` to overwrite:

```bash
cp brand-assets/_incoming-imagery/01-brand-heroes/hero-gstaad-chalet.jpg public/brand/01-brand-heroes/
cp brand-assets/_incoming-imagery/04-gstaad-alpine/alpine-morning-coffee.jpg public/brand/04-gstaad-alpine/
cp brand-assets/_incoming-imagery/05-monaco-cote-dazur/monaco-study-lamplit.jpg public/brand/05-monaco-cote-dazur/
cp brand-assets/_incoming-imagery/07-provence-countryside/provence-kitchen-terracotta.jpg public/brand/07-provence-countryside/
cp brand-assets/_incoming-imagery/07-provence-countryside/tuscany-villa-loggia.jpg public/brand/07-provence-countryside/
cp brand-assets/_incoming-imagery/11-hands-and-vignettes/hand-at-car-door.jpg public/brand/11-hands-and-vignettes/
```

If any of the regens still fail Michael's "good enough" bar, re-run that
single ID with `--ids <n> --clear` to spin a different sample.

## What's already locked in

The 8 typed slots Michael unambiguously praised — keep these untouched.

| Slot | Photo | Comment |
|---|---|---|
| `PAGE_HEROES.services` | #14 london-dressing-room | "My favourite image you've made so far, feels super authentic" |
| `PAGE_HEROES.about` | #152 milan-brera-arcade-morning | "is this how their doors look?" — accept |
| `PAGE_HEROES.contact` | #62 ibiza-linen-curtain | "Nice, bit of a sus tiling job but alright" — accept |
| `THREE_CITIES.lugano` | #4 hero-lake-lugano-dawn | "Nice like it" |
| `THREE_CITIES.milan` | #156 milan-navigli-first-light | "nice if it's accurate" — accept |
| `THREE_CITIES.london` | #12 london-mews-threshold | "Like it" |
| `ABOUT.household` | #158 milan-mayfair-coded-study | "lovely" |
| `ABOUT.founding2013` | #27 lugano-lake-jetty | "Yeah nice" |
| `Destinations Featured London` | #23 london-garden-window | "Wonderful" |
| `Destinations Featured Mustique` | #83 caribbean-veranda-18h | "That's great" |
| `Destinations Featured Ibiza` | #59 ibiza-cala-stone-house | "perfect" |
| `Destinations Featured Lugano` | #25 lugano-villa-terrace-dawn | "Lush" |
| `SEASONAL.midsummerTerrace` | #9 hero-mustique-hammock | "perfect" |
| `SEASONAL.disruption` | #110 cabin-water-carafe | "lovely" |
