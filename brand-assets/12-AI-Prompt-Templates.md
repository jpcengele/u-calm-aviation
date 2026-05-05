# U-Calm Aviation — AI Prompt Templates

Paste-ready prompts for Claude, Claude Design, Artifacts, and other LLM tools. Each prompt is written so that — when combined with the other documents in this pack — the model can produce on-brand U-Calm Aviation work without further handholding.

**How to use.** For most prompts, the assumed context is that the LLM can access (or has been given) the brand pack files. Where a prompt depends on specific documents, the dependency is named inline. If you are pasting into a blank window with no file context, paste the relevant section from the referenced file into the system or user message first.

**What this file is not.** This is not a library of pre-generated copy. It is a library of *prompts* that produce copy aligned with the rest of this pack. Review and edit every output before shipping.

**A standing constraint on every prompt in this file.** U-Calm Aviation is a service line *inside* the U-CALM concierge relationship, addressed to existing members. Copy is written in a concierge register, not an aviation-marketing register. The retired 2025 "wellness aviation" vocabulary (cabin altitude, HEPA, onboard practitioners, circadian lighting, "Fly calm. Arrive restored.") is forbidden in every output. See 07-Voice-and-Messaging.md §6.4 for the full forbidden list. Every prompt below assumes the model will police this on its own output.

---

## 1. Hero section — member-facing web section

```
You are writing for U-Calm Aviation, the aviation service line
inside the U-CALM concierge membership. Use the voice and rules in
07-Voice-and-Messaging.md and the visual/layout expectations of
the brand guidelines and tokens in this pack.

Write a hero section for the [page name] section. Context: this
page sits inside the U-CALM member experience, not on an open
marketing site. The reader is already a member.

Constraints:
- Headline ≤ 8 words, Cormorant Garamond, sentence-case.
- Subhead 1 sentence ≤ 24 words, Gill Sans (Inter fallback),
  British English.
- 1 CTA, and only 1: "Ask your concierge". Never "Book", never
  "Request a quote", never "Get started".
- No exclamation marks. No emojis.
- The approved tagline is "Aviation, arranged." Do not invent
  variations. Do not use the retired tagline "Fly calm. Arrive
  restored." under any circumstances.
- Reference at most 1 proof point from section 11 of the voice doc.

Output as:
HEADLINE:
SUBHEAD:
CTA:
```

---

## 2. Service-page body — inside the member experience

```
You are writing for U-Calm Aviation. Use the voice in
07-Voice-and-Messaging.md, the services definition in
08-Services-and-Offerings.md, and the persona context in
09-Target-Personas-and-Market.md.

Write a 90-word description of how the concierge arranges
[service scenario, e.g. "a Sunday return from Sardinia"] for
the member. Constraints:
- Opens with the member's life, not the aircraft.
- Positions aviation as one service line inside the concierge
  relationship — not as a product the member buys separately.
- Includes exactly one approved proof point (section 11 of
  07-Voice-and-Messaging.md).
- Written for the primary persona of this service, named in
  09-Target-Personas-and-Market.md.
- No adjective stacking. No "unlock", "elevate", "experience",
  "restored", "recharge", "wellness", "optimised".
- British English. Sentence-case subhead if present.

Output as plain prose — a single block. Do not bullet-list.
```

---

## 3. Concierge email — flight arrangement confirmation

```
You are writing a concierge email to a U-CALM member confirming
aviation arrangements handled by U-Calm Aviation.

Voice: 07-Voice-and-Messaging.md sections 2, 3, 8.2, and 12.
Services referenced: 08-Services-and-Offerings.md.

Draft an email from the member's named concierge (not from an
aviation desk) confirming:
- Origin: [airport + FBO]
- Destination: [airport + FBO]
- Departure: [24-hour local time, date]
- Arrival (local): [24-hour local time]
- Aircraft recommended by the concierge: [category + type, e.g.
  "Heavy Jet — Falcon 7X"]. State it once; do not present a menu.
- Tail number: [placeholder TBC]
- Crew: [captain + first officer + cabin crew names or placeholders]
- Ground at origin: [car/driver/time]
- Ground at destination: [car/driver/time]
- Other arrangements already in motion alongside the flight
  (dinner, housekeeping, school run, vet, etc. — the continuity
  note).

Constraints:
- Open: "Dear [First name],"
- Max 140 words — slightly longer than an aviation-only note
  because the email carries continuity across multiple services.
- 24-hour times throughout.
- Close: "With warm regards, [Concierge name] · U-CALM" — the
  signature is U-CALM, not U-Calm Aviation. The aviation line
  is a service the concierge arranges, not the concierge's
  employer.
- No marketing footer. No emojis. No exclamation marks.
- No wellness language, no "cabin altitude", no "HEPA", no
  "arrive restored".
```

---

## 4. WhatsApp concierge note

```
You are writing a single-sentence WhatsApp message from the
member's named U-CALM concierge about aviation arrangements.

Voice: 07-Voice-and-Messaging.md section 8.4.

Context: [describe the event, e.g. "tender confirmed for 14:30 at
Porto Cervo ahead of the 17:10 departure"].

Constraints:
- One sentence, in the concierge's voice, not a desk's voice.
- British English.
- Acknowledgement first, information second.
- No emojis. No abbreviations.
- No more than 24 words.
- Signed only if helpful — usually not, because the member is in
  a threaded chat with the concierge.

Output only the message text.
```

---

## 5. Social post — on U-CALM's feed (quiet)

```
You are writing a quiet social post for U-CALM's own feed (not a
separate U-Calm Aviation account — that does not exist). The post
obliquely references aviation without saying "we fly you".

Voice: 07-Voice-and-Messaging.md section 8.5.
Imagery context: 11-Photography-and-Imagery.md section 2 and
the destination vocabulary in section 6.

Image description: [describe the image; ensure subject is on the
permitted list in section 2 of 11-Photography-and-Imagery.md —
i.e. a domestic morning, a villa pergola, an empty Sunday
kitchen, not a jet on a ramp].

Constraints:
- Single sentence, ≤ 16 words.
- Understated, warm. No performance of wealth. No aviation
  vocabulary unless the image itself is aviation-led.
- British English.
- No hashtags. No emojis.
- Never mention Ascent, Ascent Aviation, or any sister brand.
- Never use the retired wellness vocabulary.

Output only the caption text.
```

---

## 6. Itinerary cover letter — to an established member

```
You are writing an itinerary cover letter from U-CALM to an
existing member for a multi-day arrangement in which aviation
is one of several service lines.

Voice: 07-Voice-and-Messaging.md sections 2, 3, and 9.
Persona: the primary reader is [Claire & Henri / Alexander /
Lady Marguerite / Ravelli Office principal] as defined in
09-Target-Personas-and-Market.md.
Services relevant: [list from 08-Services-and-Offerings.md,
typically at least two: Aviation plus Destination Management
or Executive Protection].

Draft a 220-word cover letter from the member's named concierge.
Structure:
- Opening paragraph: the shape of the week, from the member's
  side of things. One sentence.
- Second paragraph: how the concierge has arranged the flight,
  car, ground-side detail and any continuity item (housekeeping
  at home, wardrobe forward, school run, vet).
- Third paragraph: a single proof point from section 11 of
  07-Voice-and-Messaging.md.
- Closing: a calm, human line. An opening for the member to
  adjust anything.
- Sign-off: "With warm regards, [Concierge name] · U-CALM" —
  never "U-Calm Aviation" as a separate signature.

Constraints:
- No exclamation marks. No superlatives without citation.
- British English.
- No "thank you for choosing us". No "we are excited to". No
  "delighted to confirm".
- No wellness language. No cabin-altitude or HEPA references.
- No Ascent reference, internal or otherwise.

Output the letter as plain prose.
```

---

## 7. Continuity note — between two service lines

```
You are writing an internal continuity note that travels inside
U-CALM between the aviation concierge and another service line
(Destination Management, Executive Protection, House &
Household). This is NOT for external publication.

Voice: 07-Voice-and-Messaging.md sections 2, 3, 8.3.

Input: [summary of what the aviation side has arranged, what the
receiving service line needs to know, what the member's own
standing preferences are].

Structure:
1. Mission header — date, member reference (no name unless
   required), origin/destination, aircraft category.
2. What the aviation side has done — factual, bulleted.
3. What the receiving service line must hold — preferences,
   timings, handovers.
4. Member standing notes — patterns learned over the relationship
   (e.g. "never schedules ground-side movements within 40 minutes
   of landing at LHR", "prefers the second villa bedroom as a
   study on arrival days").
5. Action points with named owner.

Constraints:
- Operational register. Terse.
- No marketing language. No brand copy.
- No member name in body — use "the principal", "the family",
  or [placeholder]. The reference number carries identity.
- The note is signed by the aviation concierge and counter-read
  by the receiving-line concierge.

Output as a structured document.
```

---

## 8. Member-story page — interior case study

```
You are writing a member-story page for use inside the U-CALM
member portal or an introducer-facing document. This is never
published on an open site and never mentions a named member
without explicit consent.

Voice: 07-Voice-and-Messaging.md sections 2 and 8.6.

Context: [describe the member's pattern — what U-Calm Aviation
arranges for them over a year, without identifying detail].

Constraints:
- Third-person. Factual. Restrained. Warm.
- ≤ 220 words.
- Framed as a year in the concierge relationship, with aviation
  as one thread — not a "why we chose U-Calm Aviation" testimony.
- No superlatives without citation.
- No direct quote unless the member has given consent in writing.
- Ends with a statement of continued service, not a pitch.
- No wellness language. No cabin-altitude claims.

Output only the page text plus a one-line attribution placeholder.
```

---

## 9. Pitch-deck slide — for introducer / family-office audience

```
You are writing a pitch-deck slide for U-CALM, in a section that
describes the aviation service line (U-Calm Aviation) as one
channel inside the membership.

Voice: 07-Voice-and-Messaging.md.
Audience: [introducer, family office principal, or a prospect
being routed to U-CALM rather than to an aviation-first brand].
Services context: 08-Services-and-Offerings.md.

Generate content for the "[slide title]" slide. Provide:
- Slide title (≤ 6 words).
- 3 supporting bullets (each ≤ 18 words).
- 1 footer line (≤ 10 words) suitable as a speaker's pay-off.

Constraints:
- Each bullet either (a) one proof point from the voice doc, or
  (b) one service benefit from the services doc, or (c) one
  continuity statement (aviation inside the relationship).
- British English. No emojis. No superlatives without citation.
- The slide must not read as a free-standing aviation brand.
  The aviation line never speaks without U-CALM behind it.
- No reference to Ascent or any sister brand in the content
  (the audience does not need to know; the architecture is
  internal).

Output as:
TITLE:
BULLET 1:
BULLET 2:
BULLET 3:
FOOTER:
```

---

## 10. Edit pass — rewrite an off-brand draft (with explicit wellness strip)

```
You are editing a draft for U-Calm Aviation.

Voice: 07-Voice-and-Messaging.md (especially sections 6, 6.4,
7, 12, 13).
Forbidden phrase list: section 12 of the voice doc.
Retired 2025 wellness vocabulary: section 6.4 of the voice doc.

Rewrite the following draft in the U-Calm Aviation voice:
---
[PASTE DRAFT]
---

Your edit pass must:
1. Remove every forbidden phrase.
2. Remove every instance of the retired wellness vocabulary —
   cabin altitude, HEPA filtration, onboard practitioner,
   circadian lighting, wellness aviation, "Fly calm. Arrive
   restored." — replace with a concierge-register equivalent
   or cut entirely.
3. Demote adjectives. Favour nouns and verbs.
4. Replace claims not on the approved proof-point list
   (section 11 of the voice doc) with either an approved proof
   point or a neutral statement.
5. Shift any copy that reads like an aviation-first pitch into
   copy that reads like a concierge arrangement.
6. Shorten. Break long sentences. Prefer paragraphs of 2–4
   sentences.
7. Preserve the meaning and the action the original was asking
   of the reader.
8. Remove every external reference to Ascent or any sister
   brand (those are internal-only — the reader does not need
   them and they will confuse the relationship).

Output:
- "CLEAN DRAFT:" (the rewritten copy).
- "CHANGES MADE:" (short bulleted list of what was changed
  and why).
- "WELLNESS STRIP:" (explicit list of retired-vocabulary items
  that were removed, even if none — write "none" if clean).
- "FLAGGED CLAIMS:" (any claim the writer must verify before
  publication).
```

---

## 11. Member portal page — full scaffolding

```
You are generating a member portal page for U-Calm Aviation (a
page *inside* U-CALM's member experience — never a public
landing page).

Voice: 07-Voice-and-Messaging.md.
Visual system: brand guidelines and tokens in this pack, with
the ivory / deep-teal / champagne palette and Cormorant Garamond
+ Gill Sans typography. Container 1280px, motion 500ms with the
calm-eased curve, radius 14px default.
Services context: 08-Services-and-Offerings.md.
Personas: 09-Target-Personas-and-Market.md.

Generate the content (not code) for a portal page titled
"[Page title]". Target reader: [named archetype from 09].

Provide:
- HERO: headline, subhead, single CTA ("Ask your concierge").
- CONTINUITY BAR: 4 short proof points from section 11 of the
  voice doc (max 6 words each).
- SECTION 1 (the life): 1 paragraph from the member's life —
  not from the product. Plain-language. No aviation copy yet.
- SECTION 2 (the arrangement): 3 service lines from
  08-Services-and-Offerings.md most relevant to this member,
  each as a title + 30-word description of *how the concierge
  handles them*, not how the member buys them.
- SECTION 3 (the concierge): the relationship in 1 paragraph.
  Named specialist, named back-up, same people over years.
  Understated.
- SECTION 4 (the next step): a quiet CTA block — 1 sentence
  and the "Ask your concierge" button. Never a form.

Constraints:
- British English throughout.
- Never use forbidden phrases.
- No wellness vocabulary of any kind.
- No lifestyle adjectives. No "unlock", "elevate", "experience".
- No external Ascent reference.
- The page must not read as a self-contained aviation product;
  it must read as a room inside the concierge house.
```

---

## 12. Imagery mood-board prompt (for Midjourney / Claude Image)

```
You are generating a mood-board image for U-Calm Aviation. This
image is INTERNAL USE ONLY — for brief development, never
published.

Visual system: 11-Photography-and-Imagery.md (especially
sections 1, 3, 4, 5, and the destination vocabulary in 6).
Philosophy pillars: Continuity, Quietness, Warmth.

Generate a single image with the following prompt to an
image-generation model:

"cinematic editorial photograph, Leica M11, 35mm lens, natural
light, [time of day from 11-Photography-and-Imagery.md §3],
wide negative space, warm highlights with champagne notes and
deep-teal shadow, [destination or domestic scene from §6 — e.g.
a Sunday-morning kitchen with the coffee already made, a villa
pergola before breakfast, a chalet sitting room before the fire
is lit], restrained composition, no people, architectural
clarity, no branding, aspect ratio 16:9"

Add no superlatives. Remove any request for "ultra", "hyper",
"dramatic", "stunning", "luxurious".

Specifically forbid:
- No jet interior shots with performative wellness cues
  (diffuser, candle, yoga mat, water bottle, singing bowl).
- No aircraft on a ramp at golden hour.
- No red tones anywhere in the grade.

Output: the generated image, plus a short caption noting that
the image is internal use only and not for external publication.
```

---

## 13. Onboarding welcome note — member adding aviation to their membership

```
You are writing a welcome note to a U-CALM member who has just
added aviation to their membership (or who is flying with the
concierge arranging it for the first time).

Voice: 07-Voice-and-Messaging.md.
Services context: 08-Services-and-Offerings.md (aviation
service line and onboarding).

Draft a 150-word note addressed to [Member name]. It is
delivered in writing, slipped into the member folio alongside
the itinerary — not email. Typeset in Cormorant Garamond.

Structure:
1. A single, warm opening line. Not "thank you for joining",
   because the member is already a member.
2. A confirmation of their named concierge (same person they
   already know) and the specialist on the aviation side who
   will sit alongside.
3. A single sentence confirming the quiet onboarding shape —
   how the first mission will be handled, what the concierge
   will carry for them.
4. A closing commitment from [Concierge name or Managing
   Director name].

Constraints:
- First-person singular (the concierge's voice or the MD's
  voice — chosen in the prompt).
- British English.
- No bullet points.
- No marketing language.
- No wellness vocabulary.
- No reference to Ascent or any sister brand — the member is
  a U-CALM member; the architecture above is not their
  business.
- Handwritten tone.
```

---

## 14. Quality-assurance edit (before ship)

```
You are a brand editor for U-Calm Aviation doing a pre-ship QA
pass.

Voice: 07-Voice-and-Messaging.md (all sections, especially
§6.4 on the retired wellness vocabulary).
Services: 08-Services-and-Offerings.md.
Personas: 09-Target-Personas-and-Market.md.
Architecture: 10-Parent-and-Sister-Brand.md (internal only —
do not let the sister brand Ascent appear in any external
output; U-CALM parent may appear in member-facing output
because the member knows U-CALM).

Review the following content:
---
[PASTE CONTENT]
---

Return:
- PASS / REWORK verdict.
- Pillar test (section 2 of voice doc): 5 pillars —
  Continuity, Anticipation, Warmth, Composure, Restraint —
  tick per pillar.
- Claim test: list any claim not on the approved proof-point
  list.
- Register test: is this written in concierge register or
  aviation-marketing register? The former is correct.
- Lexicon test: list any forbidden phrase found.
- Wellness test: explicit list of any retired 2025
  vocabulary found (cabin altitude, HEPA, onboard
  practitioner, circadian lighting, "Fly calm. Arrive
  restored."). Write "none" if clean.
- Architecture leak:
  · Does external-facing content mention Ascent or any
    sister brand? If yes, flag.
  · Does member-facing content correctly treat U-CALM as
    the visible home brand, with aviation as a service line
    inside it? If not, flag.
- Redrafted version (if REWORK).
```

---

## 15. Concierge cadence & disruption prompts — internal use

*Credit: Fly Victor sales and operational discipline, translated into concierge register for U-Calm Aviation.* The five prompts below drive the concierge cadence described in `07-Voice-and-Messaging.md` §8.9–8.10 and `13-Sales-Discipline-and-KPIs.md`. They are internal, concierge-voiced, and must never read like broker follow-ups. Receipt-confirmation WhatsApps and quote-expiry close-outs (used by the Ascent desk) have no direct analogue here — the concierge does not chase; she holds.

### 15.1 Annual / seasonal planning note

```
You are writing an annual or seasonal planning note from a
U-CALM member's named concierge to the member.

Voice: 07-Voice-and-Messaging.md §8.2 and §8.9.

Context:
- Member: [first name]
- Season or window: [Easter / Summer peak / Asia peak / Festive /
  Named event — from 08-Services-and-Offerings.md §12]
- Forward-looking prompt: [a possibility the concierge wants to
  hold without commitment — e.g., an alpine weekend, a harbour
  arrangement, an event box]

Constraints:
- ≤ 120 words.
- Open: "Dear [First name],".
- Middle: state what the concierge has noticed about the window
  and the one possibility she'd like to hold; offer without pushing.
- Close: "With warm regards, [Concierge name] · U-CALM".
- No "circling back", no "touching base", no "just following up".
- British English. No exclamation marks.

Output the note as plain prose.
```

### 15.2 Delay update — concierge WhatsApp

```
You are writing a delay-update WhatsApp message from the
member's named concierge — not from an aviation ops desk.

Voice: 07-Voice-and-Messaging.md §8.4 and §8.10.

Context:
- Member: [first name]
- Aircraft: [category, e.g. "the long-range aircraft" — specify
  tail only if the member has asked]
- Delay magnitude: [minutes or hours]
- Original departure: [time]
- New departure: [time]
- Ground rebuilt: [car time shift; concierge at the other end
  already informed]

Constraints:
- One message. Three movements: the shift, the ground already
  rebuilt, the continuity that holds.
- Concierge voice — warm, composed, never apologetic in a way
  that sounds theatrical.
- No operator blame. No scheduling explanation.
- ≤ 60 words. British English. 24-hour times. No emojis.
- Never the words "unfortunately", "regret", or "due to".

Output only the message text.
```

### 15.3 Aircraft change (tail swap) — concierge WhatsApp

```
You are writing an aircraft-change WhatsApp message from the
member's named concierge.

Voice: 07-Voice-and-Messaging.md §8.4 and §8.10.

Context:
- Member: [first name]
- Change: [new aircraft type / tail, same operator panel]
- Equivalence: [crew standard / configuration / catering /
  ETA — all carried over]

Constraints:
- State what changed. State what did not. Emphasise continuity
  throughout.
- Never "downgrade", "unfortunately", "as a result of".
- Avoid technical aviation language unless the member has asked.
- ≤ 70 words. British English. No emojis.

Output only the message text.
```

### 15.4 Pre-brief — concierge WhatsApp

```
You are writing a pre-brief WhatsApp message from the member's
named concierge, sent the evening before or morning of an early
departure.

Voice: 07-Voice-and-Messaging.md §8.4 and §8.10.

Context (fill all that apply):
- Member: [first name]
- Car-at-residence time
- FBO (by name, not code, where the member knows it that way)
- Aircraft (member-facing language: "the long-range aircraft" or
  "the midsize" — specify only if the member knows it that way)
- Departure time
- Arrival (local time + destination by name)
- Ground at destination (concierge there already expecting you)
- Continuity note (something waiting — lunch, housekeeping, school
  run, the florist, the vet)
- Weather (if notable and useful)

Constraints:
- Woven into sentences, not bulleted — this is not an ops doc.
- Eight facts maximum, organised as a short, warm narrative.
- No questions. Close with "Safe travels." or similar.
- British English. 24-hour times where used. No emojis.
- Concierge signature only if not in a long-standing thread.

Output only the message text.
```

### 15.5 Slot-window advisory — concierge-side, to the member

```
You are writing a slot-window advisory from the member's named
concierge — used when a slot-coordinated airport is filling and
the concierge wants to hold a possibility for the member.

Voice: 07-Voice-and-Messaging.md §8.2 and §8.9.

Context:
- Member: [first name]
- Airport and season: [IBZ summer / JMK August / CMF winter
  weekends / CVF festive — from 08-Services-and-Offerings.md §12.2]
- What the concierge has noticed: [window filling; a specific
  weekend is the tightest]
- Proposed hold: [date range the concierge would like to hold
  aviation possibility for, without commitment]

Constraints:
- ≤ 110 words.
- Open: "Dear [First name],".
- Carry the "no slot, no proposal" standard without saying it —
  the concierge is being forward-looking on the member's behalf.
- Offer the hold as an arrangement; do not pitch.
- Close: "With warm regards, [Concierge name] · U-CALM".
- British English. No aviation-marketing language.

Output the note as plain prose.
```

---

## 16. Do-not-do prompt patterns

These patterns frequently produce off-brand copy. Avoid them.

**Don't say:**
> *"Write an exciting, premium aviation homepage for U-Calm Aviation…"*

The word *exciting* guarantees superlatives. The word *homepage* implies a standalone aviation brand — which this is not. Instead:

> *"Write a restrained, quiet member-portal hero for the aviation service line inside U-CALM, for an existing member…"*

---

**Don't say:**
> *"Write wellness-aviation copy about cabin comfort…"*

Wellness-aviation is the retired 2025 positioning. The brand has repudiated it. Instead:

> *"Write a 75-word concierge note about how the flight is arranged alongside the rest of the week, drawing on section 2 of 08-Services-and-Offerings.md. Do not reference cabin altitude, air filtration, or any wellness feature of the aircraft."*

---

**Don't say:**
> *"Write luxurious lifestyle copy about our members' travel…"*

*Luxurious* pulls in every cliché. *Our members' travel* objectifies the relationship. Instead:

> *"Write in a concierge register about how an established U-CALM member's week unfolds, with aviation threaded through — drawing on the Claire & Henri / Alexander persona in 09-Target-Personas-and-Market.md. Warm, specific, not performative."*

---

**Don't say:**
> *"Use lots of aviation buzzwords…"*

The model will produce *cutting-edge, bespoke, world-class*. Instead:

> *"Use aviation vocabulary where natural (FBO, slot, repositioning) but only where the concierge would actually say it to a member. Most of the copy is concierge language, not aviation language. Review against the forbidden phrase list in section 12 of the voice doc and the retired wellness vocabulary in section 6.4."*

---

**Don't say:**
> *"Be creative with the tagline…"*

The tagline is fixed. Variations dilute the brand — especially the retired "Fly calm. Arrive restored.", which must never reappear. Instead:

> *"Use the approved tagline 'Aviation, arranged.' Do not invent variations. Do not use the retired tagline 'Fly calm. Arrive restored.' under any circumstances."*

---

**Don't say:**
> *"Differentiate U-Calm Aviation from Ascent Aviation in the copy…"*

The sister brand is internal-only. Naming it in external copy collapses the architecture. Instead:

> *"Write for a reader who is already inside the U-CALM concierge relationship. Do not reference any other brand. Do not compare. Do not explain the wider architecture — the member does not need it."*

---

## 17. Workflow — how these prompts compose

For a full member-facing brief (e.g. an introducer brief, a portal launch, an onboarding pack), run the prompts in this order:

1. **Prompt 6** (itinerary cover letter) → produces the lead artefact — it models the concierge register better than any other prompt.
2. **Prompt 2** (service-page body) → produces the supporting portal content.
3. **Prompt 11** (member portal scaffolding) → produces the full portal page around the service-page bodies.
4. **Prompt 5** (quiet social post) → produces any public-facing U-CALM post, if aviation is being obliquely shown.
5. **Prompt 12** (imagery mood-board) → produces the internal-only mood board for the shoot brief.
6. **Prompt 13** (onboarding welcome note) → produces the in-folio welcome for a member adding aviation.
7. **Prompt 14** (QA pass) → run every output through this before ship. Non-optional.

---

## 18. Connection to the rest of the pack

- `00-START-HERE.md` — the non-negotiables these prompts enforce.
- `03-Brand-Guidelines.md` — the visual rules the prompts reference.
- `07-Voice-and-Messaging.md` — the tonal backbone of almost every prompt here, including the explicit retirement of the 2025 wellness vocabulary in §6.4.
- `08-Services-and-Offerings.md` — the source of service-line definitions and the aviation-usage profile language (not a tiered product catalogue).
- `09-Target-Personas-and-Market.md` — the audience scaffolding. All primary archetypes are U-CALM members first.
- `10-Parent-and-Sister-Brand.md` — the internal-only architecture the QA prompt (section 14) polices, including the U-CALM-visible / sister-brand-hidden rule.
- `11-Photography-and-Imagery.md` — the visual rules the imagery mood-board prompt (section 12) enforces, with the Continuity / Quietness / Warmth philosophy.

**Version:** U-Calm Aviation Prompts v2.0. Add new prompts with a version bump; remove outdated ones rather than let them drift. If the wellness vocabulary re-surfaces anywhere, treat it as a pack-level incident, not a drafting mistake.
