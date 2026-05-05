# U-Calm Aviation — Brand Guidelines

Master visual identity. Everything you need to execute U-Calm Aviation as a coherent system — palette, typography, logo, motion, layout, accessibility, and what to avoid. Pair this file with `04-Design-Tokens.json`, `05-CSS-Variables.css`, and `06-Tailwind-Config.ts` for implementation.

---

## 1. Design philosophy

U-Calm Aviation is the concierge-wrapped aviation service of U-CALM. The design language inherits from the U-CALM parent and diverges from the Ascent Aviation sister. It is warm, restrained, continuous. It communicates *arrangement*, not *transaction*.

Three principles, in order:

### 1.1 Continuity
Nothing in the visual system should tell the member they have left the concierge environment. The palette, typography, and layout read as U-CALM. Aviation is the service; U-CALM is the brand.

### 1.2 Warmth
Ivory grounds. Champagne highlights. Deep teal as the hero. Shadows are soft; corners are generously rounded; motion is unhurried. The member should feel the design exhale.

### 1.3 Restraint
No gradient fireworks. No glass-morphism. No oversized hero imagery. One focal point per section. Plenty of margin. The system is calibrated to feel *present but quiet*.

---

## 2. Logo

### 2.1 The lockup
The U-Calm Aviation lockup inherits from the U-CALM parent wordmark. A tall, airy capital **U** in deep teal, paired with a two-tone wordmark — **CALM** in teal, **AVIATION** in champagne — set in Cormorant Garamond.

### 2.2 Variants
- **Primary two-tone** — teal U, teal CALM, champagne AVIATION. On ivory or cloud-white.
- **All-teal** — full lockup in deep teal. On cream, pale linen, or lightly-washed photography.
- **All-champagne** — full lockup in champagne. On deep teal or deep night backgrounds; reserved for member-facing premium surfaces.
- **All-white** — full lockup in cloud white. On deep night or photographic backgrounds.

### 2.3 Construction
- **Symbol:** a tall, open capital U — light stroke, rounded base. The open top evokes breath and uplift.
- **Wordmark:** CALM / AVIATION stacked, Cormorant Garamond 300–400 weight, generous tracking (+8% at display size).
- **The two-tone split** between CALM (teal) and AVIATION (champagne) is constant and must not be reversed or recoloured.

### 2.4 Clear space and minimum size
- **Clear space** equal to the cap-height of AVIATION on all sides.
- **Minimum digital:** 72 px tall for the full lockup; 48 px for the U mark alone. Prefer the U mark alone when space is tight rather than shrinking the full lockup.
- **Favicon:** the U mark alone, teal on ivory.

### 2.5 Logo don'ts
- Do not recolour the mark. Teal, champagne, white, cloud-white only.
- Do not thicken the U stroke. Its airiness is load-bearing.
- Do not apply gradients, shadows, embosses, or bevels.
- Do not place the mark over busy imagery without an ivory, champagne-mist, or deep-night overlay restoring contrast.
- Do not pair the U-Calm Aviation mark with Ascent Aviation imagery or palette.

---

## 3. Colour system

A deliberately quiet palette. One hero colour (deep teal), one supporting warm neutral (champagne), ivory as the default surface, navy as text only.

### 3.1 Core palette

| Role | Name | HEX | HSL | Usage |
|---|---|---|---|---|
| Primary | **Deep Teal** | `#2A8A98` | `hsl(187 56% 38%)` | U mark, CTAs, links, key accents. Use on ivory. |
| Primary Hero | Serene Teal | `#3BB5C7` | `hsl(189 55% 51%)` | Decorative washes, hero emphases, dark-mode primary. |
| Primary Soft | Mist Teal | `#BEE3E9` | `hsl(187 48% 83%)` | Card hover, section washes, subtle dividers. |
| Secondary | **Warm Champagne** | `#BCB17A` | `hsl(48 37% 61%)` | AVIATION wordmark, member surfaces, gold-accent framings. |
| Secondary Soft | Champagne Mist | `#E4DDBE` | `hsl(48 44% 82%)` | Soft member surfaces, dividers, premium-card backgrounds. |
| Text | **Still Navy** | `#1C2B3A` | `hsl(211 34% 17%)` | All body and heading text on light. |
| Text Muted | Harbour Grey | `#6B7785` | `hsl(213 11% 47%)` | Captions, metadata, subdued supporting text. |
| Background | **Ivory** | `#FAF7F2` | `hsl(36 40% 97%)` | Default page background. Shared with U-CALM parent. |
| Background Cloud | Cloud White | `#FBFCFD` | `hsl(210 25% 99%)` | Alt surface; cooler than ivory, useful for digital product. |
| Surface | Linen | `#F3F1EA` | `hsl(44 23% 93%)` | Alt section, card background, form fill. |
| Border | Whisper | `#E6EAEE` | `hsl(210 14% 92%)` | Borders, inputs, dividers. |

### 3.2 Dark mode

Background shifts to **Deep Night** `#0E1A26` (`hsl(210 46% 10%)`); text to Cloud White. Deep Teal becomes Serene Teal (the brighter cousin) for readability. Champagne holds constant — it's the single warm anchor. See `05-CSS-Variables.css` for the full spec.

### 3.3 Gradients

- **Primary gradient** — `linear-gradient(135deg, #2A8A98 0%, #3BB5C7 100%)` — primary CTAs, teal surfaces.
- **Champagne gradient** — `linear-gradient(135deg, #BCB17A 0%, #E4DDBE 100%)` — member and premium surfaces.
- **Calm gradient** — `linear-gradient(180deg, #FAF7F2 0%, #EEF6F7 100%)` — subtle section transitions on ivory.
- **Horizon gradient** — `linear-gradient(180deg, #BEE3E9 0%, #FAF7F2 60%, #F3F1EA 100%)` — hero washes evoking a soft dawn.

### 3.4 Forbidden colours

U-Calm Aviation never uses:
- Red (belongs to the Ascent sister brand).
- Navy as a fill (navy is text only).
- Neon, safety orange, lime green.
- Pastels outside the approved champagne-mist / mist-teal range.
- Pure black (`#000`) — always Still Navy or Deep Night.
- Pure white (`#FFF`) — always Ivory or Cloud White.

### 3.5 Accessibility

- Body text: Still Navy on Ivory — contrast ≈ 13:1, AAA.
- Deep Teal passes AA on ivory at normal body size; Serene Teal passes only for large text.
- Warm Champagne is **decorative only** — never body text on ivory; contrast fails.
- Interactive elements carry a visible 2 px teal focus ring at offset 2 px.

---

## 4. Typography

Two typefaces. One for display, one for body. Both shared with the U-CALM parent.

### 4.1 Display — Cormorant Garamond

An elegant, high-contrast serif. Used at **300–400 weight** for H1–H3, hero wordmarks, and the logo lockup style. Its airy, slightly fragile feel is deliberately calm — the opposite of confident, planted typography.

- **Hero / H1:** `clamp(3.5rem, 6vw, 5.5rem)` — 300 weight — line-height 1.15 — letter-spacing -0.01em.
- **H2:** `clamp(2.25rem, 4vw, 3.5rem)` — 400 weight — line-height 1.2 — letter-spacing -0.005em.
- **H3:** `clamp(1.75rem, 2.5vw, 2.5rem)` — 500 weight — line-height 1.25.
- **Display caps (wordmark style):** 400 weight — letter-spacing +0.08em.

### 4.2 Body — Gill Sans (with Inter fallback)

Humanist sans. Warm, neutral, legible. Shared with U-CALM parent. Web fallback uses Inter where Gill Sans licensing is not available.

- **H4:** `1.5rem` — 600 weight — line-height 1.3.
- **H5:** `1.25rem` — 600 weight — line-height 1.4.
- **H6:** `1rem` — 600 weight — line-height 1.5.
- **Body:** `1.0625rem` — 400 weight — line-height **1.7** (more generous than Ascent; reinforces calm).
- **Body Large:** `1.1875rem` — 400 weight — line-height 1.65.
- **Small / caption:** `0.875rem` — 400 weight — Harbour Grey.
- **Nav:** `0.875rem` — 500 weight — sentence case.
- **Eyebrow:** `0.75rem` — 500 weight — letter-spacing 0.12em — uppercase, sparingly.

### 4.3 Font stack (web)

```css
--font-serif: 'Cormorant Garamond', 'Playfair Display', Georgia, 'Times New Roman', serif;
--font-sans: 'Gill Sans', 'Gill Sans Nova', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

### 4.4 Rhythm

Longer leading, looser letter spacing, and more white space than typical aviation brands. The reader should feel their breathing slow. Body paragraphs of 2–4 sentences; never wall-of-text. Line length 60–72 characters on desktop.

---

## 5. Space, shape, and shadow

### 5.1 Border radius

- Default `--radius: 14px`. Rounder than Ascent's 8 px. Round corners evoke calm.
- Buttons: `999px` (fully pill-shaped). Soft, approachable. Never square-cornered.
- Cards: `14px`.
- Modals / sheets: `20px`.
- Images / hero media: `14px` or `20px` — never right-angle.

### 5.2 Shadows

Soft, never heavy. Colour-tinted to the primary palette rather than pure black.

- `--shadow-calm`: `0 10px 40px -10px rgba(42, 138, 152, 0.15)` — elevated cards, default.
- `--shadow-float`: `0 20px 60px -20px rgba(28, 43, 58, 0.12)` — modals, hero cards.
- `--shadow-whisper`: `0 2px 8px rgba(28, 43, 58, 0.04)` — subtle lift on buttons and inputs.
- `--shadow-gold`: `0 10px 30px -10px rgba(188, 177, 122, 0.25)` — champagne member surfaces.

### 5.3 Motion

Slower than Ascent. Everything at human breathing rhythm.

- **Standard transition:** `all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)` — slow, unhurried ease.
- **Hover scale:** max 1.02. Never 1.05 — too eager.
- **Signature keyframes:**
  - `breathe` — 4-second slow scale (1.0 → 1.015 → 1.0) — reserved for the U mark or a single hero.
  - `drift` — 8-second slow horizontal translation — reserved for cloud / horizon imagery.
  - `fade-soft` — 1.0-second fade-in.
- **No** bounces, shimmers, sparkles, or confetti. No typewriter effects. No kinetic typography.
- **`prefers-reduced-motion`** honoured — all non-essential animation disabled.

### 5.4 Layout

- **Container max-width:** `1280px` (narrower than Ascent). More focused.
- **Container padding:** `2.5rem` (40 px) desktop; `1.25rem` mobile.
- **Section vertical padding:** `6rem` (96 px) desktop; `3.5rem` mobile. Generous to read as calm.
- **Grid gutter:** 32 px (cards); 48 px (major sections).
- **Baseline grid:** 8 px. All vertical spacing a multiple of 8 px.

---

## 6. Iconography

- **Library:** [Lucide](https://lucide.dev/) or an equivalent thin-line icon set — shared with Ascent and U-CALM parent for simplicity.
- **Stroke weight:** 1.5 px at 24 px icon size.
- **Colour:** Still Navy default; Deep Teal for affirmative action states; Champagne for decorative accents only.
- **Never:** gradient-filled icons, shadowed icons, or emoji-adjacent illustration.
- **Icons are affordance, not ornament.** If an icon is purely decorative, remove it.

---

## 7. Buttons, forms, tags

### 7.1 Buttons

- **Primary:** pill, Deep Teal fill, Cloud White text, `--shadow-whisper` default, `--shadow-calm` on hover. Transform scale 1.02 on hover. `padding: 14px 28px`.
- **Secondary:** pill, transparent fill, 1.5 px Deep Teal border, Deep Teal text. Fills to champagne mist on hover.
- **Champagne / member:** pill, champagne-gradient fill, Still Navy text. Reserved for member-only surfaces.
- **Tertiary / text link:** Deep Teal text, Deep Teal underline on hover, no border.
- **Destructive:** not used in client-facing surfaces; reserved for admin interfaces only.

### 7.2 Forms

- Inputs on Linen (`#F3F1EA`) or Cloud White surfaces.
- 14 px corner radius. 1 px Whisper border. 2 px Deep Teal border on focus.
- Labels above inputs, Harbour Grey, `0.875rem`, 500 weight.
- Placeholder text: Harbour Grey; sentence case; never instructional ("Enter your name" → "Your name").
- Field padding: 14 px 18 px.

### 7.3 Tags and badges

- Small pill — 999 px corner radius; champagne-mist fill; Harbour Grey text; `0.75rem` size; letter-spacing 0.04em.
- Used sparingly — categorisation, never emphasis.

---

## 8. Imagery treatment

(See `11-Photography-and-Imagery.md` for full specification. Summary here.)

- Desaturated by 15–25% vs unprocessed RAW.
- Lifted shadows; warm-cool split grade.
- Soft overlay wash — `rgba(42, 138, 152, 0.06)` — over hero imagery to unify tone.
- Cinematic crops with generous negative space.
- **No** yachts, champagne flutes, mid-deal boardroom shots, or group-toast imagery.

---

## 9. Don't-do summary

**Never:**
- Use red, orange, or vivid accent colours.
- Use exclamation marks, emojis, or all-caps emphasis.
- Share a palette, photograph, or headline with Ascent Aviation.
- Use stock "luxury lifestyle" imagery.
- Over-design. The brand's aesthetic budget is restraint.
- Claim cabin-altitude, HEPA-filtration, or onboard-practitioner specifications without operator-by-operator verification.

**Always:**
- Whisper.
- Lead pages with ivory, light, or soft photography — not aircraft.
- Treat Deep Teal as the hero; Warm Champagne as the small jewellery.
- Pair Cormorant with Gill Sans. Keep leading generous.
- Write in short, declarative sentences with full stops.

---

## 10. The "is it U-Calm Aviation?" six-point test

Before an artefact ships, it must pass all six:

1. **Palette test** — ivory, deep teal, champagne, navy text. Nothing else.
2. **Typography test** — Cormorant (display), Gill Sans / Inter (body). No third face.
3. **Voice test** — concierge register. No aviation-first framing.
4. **Tagline test** — *Aviation, arranged.* used correctly. No "Fly calm, arrive restored".
5. **Architecture test** — no mention of Ascent Aviation. U-CALM parent discreetly acknowledged, never promoted externally.
6. **Restraint test** — would a long-standing family office find this understated enough to put on a letterhead?

Six of six passes: ship. Any one fails: rework.

---

## 11. Connection to the rest of the pack

- `00-START-HERE.md` — the non-negotiables.
- `04-Design-Tokens.json` — the token-format version of this file.
- `05-CSS-Variables.css` — drop-in CSS implementation.
- `06-Tailwind-Config.ts` — Tailwind theme extension.
- `07-Voice-and-Messaging.md` — the tonal parallel of this visual document.
- `11-Photography-and-Imagery.md` — the imagery detail referenced in section 8.

**Version:** U-Calm Aviation Guidelines v2.0 — April 2026.
