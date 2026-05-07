# U-Calm Aviation — i18n string inventory (refactor scope)

Generated 2026-05-06 evening, before the i18n refactor pass that will
happen in a fresh tomorrow-morning session.

**Headline:** ~450 hardcoded English strings across 8 page components +
`src/lib/services-data.ts`. The existing `src/i18n/locales/en.json` is
the wrong-brand U-CALM concierge bundle (carried over from a copied
scaffold) — it needs to be wiped and rebuilt with an aviation-specific
key tree.

The de.json / fr.json / it.json siblings almost certainly contain the
concierge translations too — also wrong, also need rebuilding via DeepL
once the new en.json is in place.

---

## File-by-file inventory

### `src/pages/Index.tsx`

**§1 Hero (~5 strings)**
- "Lugano · Milan · London" (eyebrow)
- "Aviation, arranged." (h1)
- Long body paragraph
- 2 button labels

**§1 Proof strip (~8 strings)** — 4 dt+dd pairs

**§2 Continuity proposition (~4 strings)**
- "Inside the relationship" eyebrow
- "The concierge who arranges your week, now arranges the aircraft." h2
- 2 long body paragraphs

**§3 Three Cities (~16 strings)**
- "Where we are" / h2 / intro paragraph
- 3 cities × (country label + city name + description) = 12

**§4 Operational arc — How a journey is held (~12 strings)**
- Eyebrow / h2 / intro paragraph
- 4 stages × (number + title + body) = 12

**§5 Service cards eyebrow + intro (~3 strings)** + "Read more" recurring + "See the catalogue"

**§5b WHY_ITEMS array (~12 strings)** — 6 items × (title + body)

**§7 Standards held — Index full-bleed band (~3 strings)**
- Eyebrow / h2 / long body

**§8 Destinations preview (~5 strings)** — eyebrow / h2 / paragraph + "See all destinations"
- Plus 4 cards × (name + country) — actually consumed from a hardcoded array

**§9 FAQ — Quiet questions (~14 strings)**
- Eyebrow / h2
- 6 Q&As

**§10 Closing (~5 strings)**
- "The arrangement" eyebrow
- "No new brand. No new broker. No new inbox." h2
- Body + button

### `src/pages/Services.tsx`

- Hero (~3 strings)
- Service grid intro (~3) + "Read more" recurring
- Lead times section (~3 + 5 lead-time entries × 2 fields = 13)
- Closing CTA (~5)

### `src/pages/ServiceDetail.tsx`

- Hero chrome (~3 strings) + service title (from data)
- "Overview" / "What this service holds" (h2) / paragraphs from data
- "Key benefits" / "What the member receives"
- "What is included" / "The detail behind the service"
- Right-rail "How to begin" / "Open a conversation." / 2 buttons + 4 bullet items
- Related services chrome (~3)

### `src/pages/Destinations.tsx`

- Hero (~3 strings)
- Featured destinations chrome (~3)
- 8 destinations × (name + country + description + 4 highlights) = 56 strings
- Regional view chrome (~3)
- 12 regional cards × (region name + place list) = 24 strings
- Gallery chrome (~3)
- Closing CTA (~5)

### `src/pages/About.tsx`

- Hero (~3)
- 6 main sections × (eyebrow + h2 + body paragraphs) = ~25
- 6 principle cards × (title + body) = 12
- 4 onboarding steps × (number + title + body) = 12
- Closing (~5)

### `src/pages/Contact.tsx`

- Hero (~2)
- Form section (~10 — labels, placeholders, button states, error/success)
- "What to expect" 3 cards × (number + title + body) = 9
- "Where the desk operates" section (~10)

### `src/pages/NotFound.tsx`

- 5 strings: 404 eyebrow, h1, body, 2 buttons

### `src/pages/Privacy.tsx`

- Header (~3)
- 9 numbered sections × (heading + body) = ~30 strings

### `src/lib/services-data.ts`

6 services × ~10 fields each = ~60 keys. Per service:
- title, subtitle, cardDescription
- cardFeatures (array of 3)
- tagline
- longDescription (array of paragraphs)
- keyBenefits (array of 4–6)
- features (array of 6–9)
- howToBegin

---

## Refactor strategy (tomorrow morning)

**Order of operations:**

1. Wipe `en.json`, `de.json`, `fr.json`, `it.json` of all the
   concierge keys. Keep only genuinely shared keys (nav labels,
   ctas, language switcher, brand strapline).
2. Build a fresh `aviation.*` key tree in `en.json` using the
   inventory above. Suggested structure:
   - `aviation.brand.*` (already partly here)
   - `aviation.cta.*` (already partly here)
   - `aviation.home.hero.*`, `aviation.home.proof.*`,
     `aviation.home.continuity.*`, `aviation.home.threeCities.*`,
     `aviation.home.journey.*`, `aviation.home.servicesIntro.*`,
     `aviation.home.whyUs.*`, `aviation.home.standards.*`,
     `aviation.home.destinationsPreview.*`, `aviation.home.faq.*`,
     `aviation.home.closing.*`
   - `aviation.services.*`
   - `aviation.serviceDetail.*` (chrome only — service-level copy
     comes from `aviation.services.<slug>.*`)
   - `aviation.destinations.*`
   - `aviation.about.*`
   - `aviation.contact.*`
   - `aviation.notFound.*`
   - `aviation.privacy.*`
   - `aviation.footer.*`
3. Refactor each page in `t("aviation.<section>.<key>")` form.
4. Refactor `services-data.ts` so each service entry references
   keys instead of holding literal strings:
   ```ts
   interface Service {
     slug: string;
     iconName: string;
     // copy keys, not literals
     titleKey: string;
     subtitleKey: string;
     descriptionKey: string;
     // etc
   }
   ```
   Pages call `t(service.titleKey)` etc.
5. Run `npm run i18n:sync` to push to de/fr/it via DeepL.
6. Hand-review the voice-critical lines — straplines, hero
   headlines, FAQ tone — and add overrides to
   `i18n-overrides.json` where DeepL flattens the brand voice.
7. Manually test each page in each locale via the language
   switcher — visual QA.
8. Push.

**Estimated focused time:** 5–7 hours. Worth a dedicated morning.

**DeepL key:** already in `.env.local` per `I18N.md`. The pipeline
itself is wired; this is purely a content-layer refactor.

---

## Voice-critical strings (need overrides, not DeepL)

Strings the brand voice will not survive a literal translation —
these go into `i18n-overrides.json` for de/fr/it:

- "Aviation, arranged." (strapline)
- "Consider it done." (concierge parent strapline if mentioned)
- "Lugano, Milan, and London — held in the same English voice." (h2)
- "The concierge who arranges your week, now arranges the aircraft."
- "Six channels, one concierge."
- "No new brand. No new broker. No new inbox."
- "Held in detail. Held everywhere."
- "Some of the places we hold in deepest detail."
- "A concierge house, extended."
- "Aviation, inside the concierge relationship. Unseparated."
- "Open a conversation." (h1 on Contact)
- The FAQ headlines, particularly the rhythmic ones
- "Quiet questions"

---

This file is the working brief for tomorrow's session.
