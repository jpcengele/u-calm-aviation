# U-Calm Aviation — Brand Assets Package

The concierge-wrapped aviation offering of **U-CALM**, the private concierge and lifestyle-management house. This pack is everything a human — or Claude Design / Artifacts — needs to build on-brand websites, decks, emails, one-pagers, social posts, itineraries, proposals, and documents for U-Calm Aviation.

Drop the entire `u-calm-brand-assets/` folder into a Claude project. Paste the **How to use** snippet at the bottom as the first message. Build.

---

## What U-Calm Aviation is — in one sentence

> **U-Calm Aviation is the aviation service inside U-CALM's concierge relationship — private charter, ground, and arrival coordination delivered through the concierge a member already trusts.**

It is not a wellness airline. It is not a retreat operator. It is not a challenger charter brand. It is the answer to a U-CALM member saying *"we're going to Gstaad on Friday"* — handled by the same people who handle everything else, in the same ivory-and-teal register, with the same quiet continuity.

See `01-Brand-Story-and-Origin.md` for the founding story and `10-Parent-and-Sister-Brand.md` for the internal architecture.

---

## The 14-file structure

| # | File | Purpose |
|---|---|---|
| 00 | `00-START-HERE.md` | This file — the index and the upload instructions. |
| 01 | `01-Brand-Story-and-Origin.md` | Name, tagline, founding story, the insight behind the brand. |
| 02 | `02-Brand-Positioning-Canvas.md` | Eight-box canvas: competition, target, insight, benefits, values, differentiator, RTB, soul. |
| 03 | `03-Brand-Guidelines.md` | Master visual identity — palette, typography, logo, motion, layout, accessibility. |
| 04 | `04-Design-Tokens.json` | Machine-readable W3C-DTCG tokens. Drop into Figma, Style Dictionary, or any tooling. |
| 05 | `05-CSS-Variables.css` | Drop-in CSS custom properties plus signature components. Light and dark mode. |
| 06 | `06-Tailwind-Config.ts` | Drop-in Tailwind theme extension — `hsl(var(--token))` wiring to the CSS variables. |
| 07 | `07-Voice-and-Messaging.md` | Tone, register, boilerplate bank, headline bank, lexicon, forbidden phrases, channel rules, concierge cadence, disruption scripts. |
| 08 | `08-Services-and-Offerings.md` | The service catalogue, tier architecture, pricing philosophy, seasonality, operator discipline, disruption protocols. |
| 09 | `09-Target-Personas-and-Market.md` | Named archetypes, fit criteria, market character. |
| 10 | `10-Parent-and-Sister-Brand.md` | **Internal only.** The architecture note on U-CALM parent and Ascent Aviation sister. |
| 11 | `11-Photography-and-Imagery.md` | Visual grammar for photography, iconography, motion, and AI image generation. |
| 12 | `12-AI-Prompt-Templates.md` | Paste-ready prompts for Claude — proposals, itineraries, landing pages, social, cadence, disruption. |
| 13 | `13-Sales-Discipline-and-KPIs.md` | **Internal only.** Concierge cadence, KPI thresholds, operator register, belt-and-braces, seasonal arrangement-ahead targets. |
| 🛈 | `logos/` | SVG / PNG logo masters and a README describing usage rules. |

Read the files in order. Each assumes the one before it.

---

## Six non-negotiables

These are hard rules. Any artefact violating any one of them is off-brand, regardless of what the rest of the work does well.

1. **U-Calm Aviation never sounds like an aviation brand first.** It sounds like a concierge extending itself into aviation. Read section 2 of `07-Voice-and-Messaging.md` before writing a single sentence.

2. **The visual palette is ivory, deep teal, and champagne.** Never red. Never navy as a primary brand colour (navy is text only). Never a saturated or "wellness-spa" palette.

3. **The typefaces are Cormorant Garamond (display) and Gill Sans (body).** This matches the U-CALM parent. No other typefaces in client-facing material.

4. **British English. No exclamation marks. No emojis. No superlatives without citation.** The brand speaks the way a long-standing family office speaks — precisely and quietly.

5. **The tagline is *Aviation, arranged.*** It is the aviation counterpart to the U-CALM parent's *Consider it arranged.* Never invent a new tagline. Never deploy "Fly calm. Arrive restored." — that was an earlier working draft and is out of use.

6. **Ascent Aviation, the sister brand, is never referenced externally.** Internal documents (this pack, `10-Parent-and-Sister-Brand.md`) know about Ascent; client-facing documents do not. See `10-Parent-and-Sister-Brand.md` for the full architecture.

---

## The U-CALM house — where U-Calm Aviation fits

```
┌────────────────────────────────────────────────────────────────────┐
│                     U-CALM (parent)                                │
│        Concierge & lifestyle-management house.                     │
│           Members-only. Invitation-based.                          │
│                                                                    │
│   ┌──────────────────┬──────────────────┬──────────────────┐       │
│   │                  │                  │                  │       │
│   ▼                  ▼                  ▼                  ▼       │
│  Concierge        U-Calm            Lifestyle           Household  │
│  desk             Aviation          services            services   │
│                    ◄─────────────── this brand ──────────►         │
│                                                                    │
│                          shared operation                          │
│                                 │                                  │
│                                 ▼                                  │
│                       ASCENT AVIATION                              │
│              (external, public-facing aviation brand)              │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘
```

U-CALM is the parent. U-Calm Aviation is a service line inside U-CALM, visible to members only. Ascent Aviation is the external commercial brand for households who came to us for aviation first. U-Calm Aviation and Ascent Aviation share the operational backbone; their faces are deliberately distinct. See `10-Parent-and-Sister-Brand.md`.

---

## How to use this package with Claude

Paste the following as the first instruction in any Claude Design / Claude Artifacts build:

> Use the brand assets in this project to build on-brand for **U-Calm Aviation** — the aviation service line inside the U-CALM concierge house. Read `01-Brand-Story-and-Origin.md`, `03-Brand-Guidelines.md`, and `07-Voice-and-Messaging.md` before writing copy. For visual work, pair `05-CSS-Variables.css` with `06-Tailwind-Config.ts`. The tagline is *Aviation, arranged.* — never invent new taglines. Use British English. No exclamation marks, no emojis, no "luxury lifestyle" clichés. Never mention the sister brand Ascent Aviation externally. Follow every rule in `00-START-HERE.md` section *Six non-negotiables*.

For proposal, itinerary, social, or landing-page work, pair this with the prompts in `12-AI-Prompt-Templates.md`.

---

## Brand at a glance

- **Ivory (background)** — approx. `hsl(36 22% 96%)`
- **Deep Teal (primary)** — approx. `hsl(187 56% 38%)`
- **Warm Champagne (secondary)** — approx. `hsl(48 37% 61%)`
- **Still Navy (text)** — `hsl(211 34% 17%)`
- **Display type** — Cormorant Garamond, 300–400 weight
- **Body type** — Gill Sans (or Gill Sans Nova), with Inter as a web fallback
- **Voice** — concierge register; warm, anticipatory, never promotional
- **Tagline** — *Aviation, arranged.*

Exact hex values, HSL triplets, and dark-mode variants are in `03-Brand-Guidelines.md` and `04-Design-Tokens.json`.

---

## Maintenance

- This pack is versioned alongside the U-CALM parent pack.
- Any visual or tonal change proposed here must be reconciled against the parent pack first.
- Ascent Aviation (sister) diverges intentionally; do not attempt to harmonise U-Calm Aviation with Ascent's palette or voice.
- Annual review. Any new service, destination corridor, or persona is added to this pack before it goes to market.

**Version:** U-Calm Aviation Brand Pack v2.1 — April 2026. *(v2.1 integrates concierge cadence, disruption scripting, and an internal sales-discipline register translated from the Fly Victor sales methodology.)*
