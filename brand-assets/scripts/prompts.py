"""
U-Calm Aviation — 162-prompt imagery library.

Sister face of the U-CALM concierge house. Aviation is one service line of
U-CALM membership, not a standalone product; the imagery must sit beside the
parent concierge world without dissonance.

Single source of truth for the Nano Banana 2 / Gemini 3.1 Flash Image
generation pipeline. Do not edit images in post — edit the prompts here
and regenerate, so the whole library stays on one visual grammar.
"""

from dataclasses import dataclass
from typing import List


# ---------------------------------------------------------------------------
# Global brand grammar — prepended to every prompt as a system instruction.
# ---------------------------------------------------------------------------

GLOBAL_RULES = """You are the lead photographer for U-Calm Aviation, the aviation service line of the
U-CALM concierge house. The visual register is a quietly confident travel-and-interiors quarterly —
the reticent, architectural corner of Cereal, The Gentlewoman, Kinfolk, and Apartamento. This is
commissioned editorial, never stock catalogue. Captured on medium-format digital (Hasselblad X2D or
Phase One XF), handheld, in real available light, on real skin and real materials.

THE THREE PRINCIPLES — everything obeys these:
- CONTINUITY: the image feels like a natural extension of a member's domestic life, not a departure
  from it. The tone at the threshold is the tone in the cabin is the tone at the villa. Never a visual
  rupture between home, journey, and destination.
- QUIETNESS: the frame is calm. Generous negative space, one hero element, off-centre composition.
  Nothing is triumphant; something is simply happening, or has just settled.
- WARMTH: the light is warm; the materials are warm; the mood is warm. Clinical, cold, minimal-
  gallery sterility is disqualified. This is a warm concierge house, not a wellness clinic.

PALETTE (cool-elegant with warm accents — never warm-dominant, never cold-dominant):
- Deep Teal (#2A8A98) — anchoring shadow, considered accent
- Serene Teal (#3BB5C7) — the brand tuning fork, used sparingly in a highlight, a detail, a ribbon
  of light on water; never a dominant flood
- Mist Teal (#BEE3E9) — soft coastal daylight, morning glass, distant horizon
- Warm Champagne (#BCB17A) — lamplight, late sun on stone, brass fittings, a cashmere throw
- Champagne Mist (#E4DDBE) — pale lamplit cotton, domestic cushion, interior stone
- Still Navy (#1C2B3A) — deepest shadow only, never as fill; small dark punctuation
- Harbour Grey (#6B7785) — overcast distance, worn stone, cool mid-tone
- Ivory (#FAF7F2) — the dominant highlight surface — never pure white
- Cloud White (#FBFCFD) — slightly cooler interior highlight
- Linen (#F3F1EA) — warm alternate surface for fabric-led compositions
- Whisper (#E6EAEE) — cool neutral surface for water-led and window-light compositions

FORBIDDEN COLOURS — absolutely non-negotiable:
- ANY red: no red jackets, no red flowers, no red rug, no red carpet, no red fire extinguisher, no
  red light, no red leather, no red signage, no red detail of any kind. This brand has no red.
- ANY orange: no orange sunset flaring, no orange fabric, no orange light. Sunset reads as warm
  champagne tipping to teal, never as orange sky.
- Neon green, neon cyan, hot pink, vivid yellow — all disqualified.
- Pure black: replaced by Still Navy for deep shadow. Pure white: replaced by Ivory or Cloud White.
- No pastels outside the Mist Teal / Champagne Mist range — no baby blue, no mint, no lavender.
Per frame, draw a three-tone triad from within this palette plus warm-neutral complements (oatmeal,
stone, camel, dove, slate, olive-green restraint only where the scene calls for it) and hold it as
law. Hero bodies name their triad explicitly.

LIGHT: natural domestic morning (07:30–08:30), soft overcast, low lamplight evening, alpine first
light (06:30), Mediterranean late afternoon (17:00–18:00), candlelit interior after dusk. Light
always rakes, wraps, or pools — never flat, never cold, never mixed-temperature. Shadow is part of
the frame; Deep Teal in the darkest passage, Still Navy only at the absolute deepest point. Never
harsh studio flash, never fluorescent hospital light, never neon.

GRADE: warm highlights with champagne notes, deep-teal shadow where the shadow would naturally be
cool. Slight desaturation — minus 5 to minus 10 percent — so the world looks considered, not
ColorChecker-vivid. Never HDR halos, never film-emulation grain, never Instagram filter. Medium-
format honest tonal range, micro-contrast, controlled highlight roll-off.

LENS & FRAME: 35mm at f/2.0–2.8 as the house lens for shallow but honest DOF; 24–28mm for
architectural and destination wides with a human anchor (hand, cuff, shoulder receding from frame);
50mm for natural mid-distance storytelling; 85mm at f/2 for compressed detail or character
fragments; 100–150mm macro for texture and still-life. Hero bodies state their lens choice.
Composition is restrained and architectural — generous negative space, off-centre framing, quiet
geometry, one hero element. Never symmetrical magazine-cover centring, never a busy tableau.

PEOPLE — the discipline of the face-out-of-frame:
- Faces are NEVER recognisable, NEVER in focus, NEVER in the primary plane. This is the hard rule
  of the Aviation brand. Discretion is the brand value.
- Permitted renderings of people: back of the head, neck and shoulder cropped at the jaw, silhouette
  against a window, reflected in glass, profile deeply out of focus, an arm entering frame, a wool
  cuff on a sill, a hand on a railing, breath condensing on cold glass, a shoulder receding. The
  smaller and more fragmentary the better.
- No group photos, no line-ups, no executive-team arrangements, no smiling principals.
- No visible children at all — no small hands, no small feet, no child's coat on a peg, no toy in
  frame. Children belong in the concierge parent brand, not in the Aviation face.
- Where two figures are needed (e.g. a quiet walk toward a doorway), they are separated by clear
  air — a half-step of lateral space or more — and both are rendered from behind or from the side,
  out of focus, with no face in the primary read.
- Cast is scene-specific and believable: international mid-life adults, not generic "travellers."
  Modern, considered tailoring — soft wool, charcoal, camel, oatmeal, forest green, dove grey,
  deep teal knitwear. Never corporate-blue-suit-white-shirt cliché, never the boardroom-stock pose.
- Skin must read as real skin — pores, small asymmetries, the warmth of a living body. Hands must
  read as real hands: five fingers, correct knuckles, nail texture, no fused or elongated digits.
- No visible tattoos on the hands, forearms, or neck. No loud watches. No phones held to ears.

LIKENESSES: any visible profile, silhouette, or fragment must not resemble any real public figure —
politician, actor, musician, athlete, journalist, royal, executive, or member of an identifiable
family. If a composition trends toward recognisability, re-crop, rotate away, silhouette, obscure,
or discard.

PROPS AND ACCESSORIES — contemporary, lived-in, never decorative or anachronistic:
- No horn-handled letter openers, no silver cigarette cases, no wooden toy aeroplanes, no ornamental
  brass globes, no heritage-signalling desk furniture. Anything that exists purely to suggest "old
  money" reads as theatre and is disqualified.
- No pens clipped into briefcases, jacket sleeves, cuff plackets, or shirt pockets. If a pen is
  needed in frame, let it lie on the surface already in use.
- Working surfaces are digital-first: tablets, slim laptops, e-ink readers, a phone face-down. No
  printed decks, no paper route-briefings, no paper agendas, no flight-plan printouts in any
  contemporary context. A closed hardback with the rear board up, a folded linen napkin, an
  unlabelled bottle of still water, or a quiet porcelain cup are the only paper-like objects
  permitted near a working cabin or lounge.
- Leather, canvas, linen, wool, and metal accessories look lived-in: softened corners, small patina,
  a crease at a handle, a faint scuff at a base. Nothing showroom-polished, nothing display-shiny.

HUMAN ANCHOR (for destination / interior / still-life shots): prefer a fragment of a person in the
foreground over an empty frame — a wool cuff on a sill, a hand on a railing, breath on cold glass,
a profile deeply out of focus, a shoulder receding. Reserve "no people at all" for pure macro,
texture, and architectural detail.

TEXT AND SIGNAGE — critical, assume every image will be inspected at 100% zoom:
ZOOM TEST: If any viewer zooms into any part of the final image and finds approximated letter-forms,
fake-English pseudo-text, garbled mastheads, invented book titles, hallucinated brass-plate
engraving, or any pixel that looks like writing-that-isn't-writing, the image is a failure. The AI
tell is the letter that almost-but-doesn't spell a word. We refuse that entire class.
- No rendered written language anywhere in frame at any scale. No headlines, no captions, no menus,
  no boarding-card lettering, no flight-deck instrument labels, no signage on buildings, no airport
  wayfinding, no street names, no shop signs, no car licence plates, no brass plaque engraving, no
  nameplates, no book titles on spines or covers, no page-interior paragraphs of text, no newspaper
  columns, no magazine mastheads, no embroidered monograms, no luggage tags with writing, no air-
  traffic-control strips, no chart place-names, no watch-dial lettering.
- No fake logos, brand marks, airline liveries, crests, coats of arms, or emblems of any kind.
- No aircraft registration numbers on the fuselage. Either crop them out, shoot from an angle that
  hides them, or leave the panel plain. The same for cabin-door placards, hangar signage, and FBO
  branding. No operator tail numbers ever.
- No departure boards, no flight-information displays, no gate signage.
- TEXT-BEARING OBJECTS — when a scene calls for an object that would naturally carry text, always
  pick the text-free staging first:
    * Newspapers are high-risk; strongly prefer an alternative — a folded linen napkin, a bundle of
      fresh herbs, a hardback with the rear board up, a bowl of fruit, a worn leather travel wallet
      (closed), an unlabelled glass decanter. If a newspaper must appear, fold in quarters with the
      crease up, face-down and partly covered.
    * Books: show the rear cover, the cloth side, or the fore-edge only. Spines turned away. Never
      an open book showing the page interior.
    * Boarding cards, passport covers, business cards, letterhead: blank, unprinted, abstracted into
      warm tonal blocks. Always blank beats always-hallucinated.
    * Watch dials: minimal hour batons only — no numerals, no brand wordmark, no date window text,
      no subsidiary dial writing.
    * Aeronautical charts: abstracted meridian and topographic lines only — no place names.
    * Flight-planning monitors, cabin displays, seat-back screens: dark interface, abstract curves
      and glow, deliberately out of focus, no discernible letters or numerals.
    * Brass plaques, door plates, house numbers: unengraved — polished blank brass catching light.
- If garbled pseudo-text would otherwise appear, omit the text entirely and render the surface clean.
  A blank cream boarding card is always better than a hallucinated one.

CABIN INTERIOR REALISM — when depicting an aircraft cabin:
- Render the geometry of a real ultra-long-range or super-midsize business jet — Bombardier Global
  7500/8000, Gulfstream G650/G700/G800, Dassault Falcon 8X, or Challenger 3500 / Praetor 600 for
  super-midsize. Never a generic "luxury interior," a hotel suite, a yacht saloon, a first-class
  airliner cabin, or a private-train carriage.
- Internal cabin width is ~2.4–2.6 m (~8 ft); ceiling ~1.9 m (~6'3"). Walls curve at top and bottom.
- Windows are oval, modestly sized, set at consistent intervals. Never square, never rectangular,
  never airliner-scale, never overscale "panorama" windows.
- Furniture is flush-fitted to the curved wall. Club seats face each other across a deployable
  walnut table. Galleys are compact. Staterooms are narrow with flush bed enclosures.
- Materials: hand-stitched leather in cream, champagne, or deep-teal piping; brushed or bead-blasted
  metal; lacquered wood veneer on curved bulkheads. No domestic furniture transplanted in, no
  oversized pendants, no chandeliers, no crown mouldings.
- Light: soft warm LED indirect cove wash, point reading lamps, plus cloud-diffused daylight through
  oval windows. Never hotel chandelier light, never yacht sconces, never restaurant pendants.
- Spatial proportions must be physically plausible. A pet carrier fits its animal, not warped; a
  ski bag enters the hold at correct scale; a cabin seat is the correct width for one adult.

DISQUALIFIED REGISTERS — the brand never reads as:
- Wellness clinic: no onboard practitioner, no yoga mat, no meditation cushion, no aromatherapy
  diffuser visible, no "cabin altitude therapy" theatre. Peace of mind is in the light and the
  composition, not in the props.
- Stock-jet brochure: no couple toasting champagne mid-flight, no smiling captain at the aircraft
  steps, no branded staircase, no tail-number hero shot, no shaking-hands-with-crew on tarmac.
- Bling-broker imagery: no Rolls-Royce front-three-quarter at golden hour next to a jet, no
  helicopter-to-yacht transfer with sunset flare, no influencer-leg-dangling-out-of-doorway.
- Aspirational-influencer imagery: no champagne flutes raised, no passports-in-hand victory poses,
  no "just-landed-in-paradise" sun-drenched airport exit shots.

If a scene would be difficult to render both realistically and without hallucinated text, favour the
abstract, the cropped, the folded, or the shadowed read over a literal one. The quietest image wins.
"""


# Negative prompt — appended to every individual prompt.
NEGATIVE_PROMPT = (
    "Do not include: logos, brand names, written text of any kind, watermarks, airline liveries, "
    "operator tail numbers, aircraft registration marks, FBO branding, departure boards, gate "
    "signage, cartoon or illustration style, CGI look, heavy bokeh, lens flare, Instagram filter, "
    "film grain, HDR halos, faces to camera, recognisable faces, identifiable children, neon light, "
    "hard studio flash. "
    "NO RED anywhere — no red jackets, no red flowers, no red leather, no red rug, no red signage, "
    "no red fire extinguisher, no red light source, no red detail of any kind. NO ORANGE — no orange "
    "sky, no orange fabric, no orange sunset flare. NO neon green, NO neon cyan, NO hot pink, NO "
    "vivid yellow. NO pure black — replaced by Still Navy. NO pure white — replaced by Ivory or "
    "Cloud White. NO pastels outside Mist Teal / Champagne Mist. "
    "CRITICAL — no garbled pseudo-text or fake letter-forms anywhere in the image at any zoom level: "
    "no approximated-English gibberish on newspaper columns, no hallucinated book-spine titles, no "
    "invented magazine mastheads, no pretend engraving on brass plates, no pseudo-numerals on watch "
    "dials, no fake place-names on charts, no fake interface text on screens, no garbled street "
    "signs, no invented shop signs, no hallucinated licence plates, no gibberish on passport covers, "
    "no fake boarding-card print, no pretend letterhead, no unreadable pseudo-script on menus. "
    "Any surface that would naturally carry text must be blank, folded-away, face-down, deeply "
    "angled, out-of-focus, in shadow, or abstracted to plain tonal blocks. "
    "Never: identical-looking people, corporate stock-photo composition, matching blue suits, "
    "white-shirt-and-tie cliché, symmetrical clones, plastic or waxy skin, glassy dead eyes, over-"
    "retouched airbrushed pores, magazine-ad gloss, extra or fused fingers, elongated or malformed "
    "digits, uncanny or too-white teeth, puppet-stiff posture, direct-to-camera smiles, mannequin "
    "faces, hotel-lobby-masquerading-as-jet-cabin, airliner-square windows. "
    "No wellness-clinic props: no yoga mat, no meditation cushion, no aromatherapy diffuser, no "
    "onboard-practitioner theatre, no circadian-light panels, no biophilic-cabin vegetation walls. "
    "No stock-jet-brochure tropes: no champagne toasts mid-flight, no smiling captain at aircraft "
    "steps, no branded airstair, no tail-number hero shots, no tarmac handshakes, no couple "
    "silhouetted against a jet. "
    "No anachronistic or decorative props: no horn-handled letter openers, no wooden toy aeroplanes, "
    "no silver cigarette cases, no fountain-pen-as-lapel-accessory, no pens clipped into briefcases "
    "or shirt cuffs, no heritage-signalling desk ornaments. "
    "No paper decks, printed briefings, printed route maps, or newspapers in any contemporary "
    "business or cabin context — crews and members work on tablets, laptops, and phones. "
    "No showroom-polished or display-case-shiny accessories; leather and metal read lived-in. "
    "No faces, profiles, or identifiable heads that resemble any real public figure. "
    "No spatially implausible compositions: no dog larger than its carrier, no ski bag bent through "
    "a too-small door, no car with mismatched or extra windows, no cabin interior wider than a real "
    "business-jet fuselage, no figures packed shoulder-to-shoulder where real people would leave "
    "air between them."
)


# ---------------------------------------------------------------------------
# Data structures
# ---------------------------------------------------------------------------

@dataclass(frozen=True)
class Prompt:
    id: int
    filename: str
    title: str
    body: str
    aspect: str  # "4:5", "16:9", "1:1", "3:4", "21:9"


@dataclass(frozen=True)
class Section:
    number: int
    slug: str
    name: str
    prompts: List[Prompt]


# ---------------------------------------------------------------------------
# The library — 162 prompts across 13 sections
#   §1  Brand Heroes and Openers           (10)
#   §2  London — Residence and Corridor    (14)
#   §3  Lugano and Ticino — Lakeside Quiet (10)
#   §4  Gstaad, St Moritz, Alpine Quiet    (14)
#   §5  Monaco and the Côte d'Azur         (10)
#   §6  Mediterranean Islands              (14)
#   §7  Provence and Countryside           (10)
#   §8  Caribbean and Transatlantic         (8)
#   §9  Domestic Interiors — Before/After  (15)
#   §10 Cabin Stills                       (13)
#   §11 Hands-only Vignettes               (14)
#   §12 Textures, Ambient, Arrivals        (18)
#   §13 Milan — the English-speaker city   (12)  ← added 2026-05-03
# ---------------------------------------------------------------------------

SECTIONS: List[Section] = [
    Section(
        number=1,
        slug="01-brand-heroes",
        name="Brand Heroes and Openers",
        prompts=[
            Prompt(1, "hero-home-to-air.jpg", "Home to air, morning",
                   "Editorial wide, 24mm, 07:45 domestic morning. An open panelled hallway in a London "
                   "townhouse; soft cloud-white walls, an oak floor warmed by a single pool of sun through "
                   "a sash window. A camel wool coat on a cast-iron hook, a leather holdall settled on the "
                   "floor below it, the faint shape of someone turned away at the far end of the hall. "
                   "Triad: ivory, camel, deep teal shadow. No face, no text, no logo.",
                   "16:9"),
            Prompt(2, "hero-quiet-threshold.jpg", "Quiet threshold",
                   "35mm, f/2.2. A black car door held open at the curb of a Mayfair mews, seen from "
                   "inside the house looking out. The threshold stone is damp from early rain; the car's "
                   "lacquer catches a cool cloud-mist highlight. A hand in a charcoal wool cuff reaches "
                   "toward the door handle at mid-frame, face entirely out of frame. Triad: oatmeal "
                   "stone, charcoal wool, deep teal shadow inside the car.",
                   "16:9"),
            Prompt(3, "hero-aviation-arranged.jpg", "Aviation, arranged",
                   "24mm architectural still. An empty super-midsize cabin at dawn, shot from the forward "
                   "galley looking aft — oval windows catching mist-teal first light, champagne-cream "
                   "leather club seats, walnut table surfaces bare except for a single folded linen "
                   "napkin at the nearest seat. Soft warm LED cove wash. No crew, no guests, no text on "
                   "any surface. The cabin has just been prepared.",
                   "21:9"),
            Prompt(4, "hero-lake-lugano-dawn.jpg", "Lake Lugano, first light",
                   "85mm. A low terrace above Lake Lugano at 06:45 — still water, mist sitting on the "
                   "surface, a pale champagne-warm band of first sun on the far ridge, the nearer water "
                   "in deep teal. A single stone balustrade in the foreground, a hand in a dark knit "
                   "cuff resting lightly on the stone at lower-right, the person out of frame. No people "
                   "visible, no signage, no boats.",
                   "16:9"),
            Prompt(5, "hero-gstaad-chalet.jpg", "Chalet morning, Gstaad",
                   "35mm interior. A weathered-wood chalet room in Saanenland at 07:15 — alpine first "
                   "light just beginning to pass through linen-curtained windows, a deep-teal-ticking "
                   "eiderdown folded at the end of a bed, a pair of grey wool socks on an oak floor, a "
                   "leather overnight bag half-visible in the left edge of frame. Triad: champagne wool, "
                   "oak, deep teal. No people, no text.",
                   "4:5"),
            Prompt(6, "hero-monaco-balcony.jpg", "Monaco balcony, 17:30",
                   "24mm. A shaded balcony in Monte Carlo at late afternoon, looking out across a slate "
                   "of harbour in harbour-grey and mist-teal. A single oatmeal linen curtain lifts in "
                   "the breeze at the left edge of frame. A pale stone balustrade, a ceramic cup of "
                   "coffee half-drunk on a teak side table. No yacht-flash, no sunset-orange sky — the "
                   "light is champagne warming a cool slate horizon. No faces.",
                   "16:9"),
            Prompt(7, "hero-mykonos-threshold.jpg", "Mykonos, white and teal",
                   "28mm. The threshold of a white-rendered Cycladic house at 17:45, the last warm light "
                   "on the lime-wash wall, a deep-teal painted door open a hand's width. A folded linen "
                   "towel on a whitewashed stone bench. No signage, no café awnings, no pool flotation. "
                   "Triad: cloud-white, deep teal door, champagne late-sun. No faces.",
                   "4:5"),
            Prompt(8, "hero-cabin-window-cloud.jpg", "Cabin window, soft cloud",
                   "50mm. The interior of a Gulfstream-scale oval window at cruise altitude, shot from "
                   "low in the club seat upward — cloud-mist sky beyond, soft cool mist-teal light "
                   "entering the cabin, a cream cashmere throw on the adjacent seat catching warm LED "
                   "cove light. A hand in a dark knit cuff rests lightly on the armrest at lower-right. "
                   "No text, no decal, no seat-back logo.",
                   "4:5"),
            Prompt(9, "hero-mustique-hammock.jpg", "Mustique veranda",
                   "35mm. A veranda on Mustique at 17:00 — a cream-rope hammock catching a champagne band "
                   "of late sun, a linen sarong folded over its edge, the sea in the distance deep teal. "
                   "The slatted teak deck shows the slightly uneven weather of salt air. No bar, no "
                   "towel-stack, no hotel signage — a domestic veranda, not a resort. No faces.",
                   "16:9"),
            Prompt(10, "hero-navigation-detail.jpg", "Navigation, abstracted",
                   "100mm macro. A single brass bulkhead fitting on the interior of a business-jet galley "
                   "— polished blank brass, no engraving, no airline livery, no switch legend. Warm LED "
                   "rake across its curve, deep-teal shadow in the recess. Triad: brass-warm, champagne, "
                   "deep teal. Absolutely no legible lettering on any adjacent surface.",
                   "1:1"),
        ],
    ),
    Section(
        number=2,
        slug="02-london",
        name="London — Residence and Corridor",
        prompts=[
            Prompt(11, "london-knightsbridge-hall.jpg", "Knightsbridge hall",
                   "35mm. A wide panelled hallway in a Knightsbridge townhouse, 08:00. Soft cloud-white "
                   "walls, wide oak floorboards, an overcast London light entering from the front door "
                   "fanlight. A camel coat over a charcoal wool one on a hook; a leather holdall on the "
                   "floor. Triad: ivory, camel, deep teal shadow at the far end of the hall. No one in "
                   "focus; a shoulder receding at the far end, deeply out of focus.",
                   "4:5"),
            Prompt(12, "london-mews-threshold.jpg", "Mews doorway, rain",
                   "28mm. A Belgravia mews doorway seen from the pavement, 07:30 after overnight rain. "
                   "A glossy black-painted door, unnumbered brass plaque (blank, unengraved), a single "
                   "stone step wet with the last of the rain. A black saloon at the curb in the right "
                   "edge of frame. Triad: slate-wet stone, black lacquer, champagne-warm doorlamp. No "
                   "licence plate, no street signage, no house number.",
                   "16:9"),
            Prompt(13, "london-study-desk.jpg", "Study desk, slim laptop",
                   "50mm, f/2. A lamplit study desk in a Notting Hill first-floor room, 08:15. A slim "
                   "laptop, closed; a tablet face-down on worn leather desk blotter; a single porcelain "
                   "cup of black coffee; an unlabelled glass carafe of water. Warm tungsten lamplight, "
                   "deep teal shadow under the desk, a thin band of overcast daylight from a sash window "
                   "at frame-right. No printed papers, no books with legible spines.",
                   "1:1"),
            Prompt(14, "london-dressing-room.jpg", "Dressing room before departure",
                   "35mm. A compact Marylebone dressing room at 08:45. A camel wool coat on a soft "
                   "garment rail beside a charcoal suit; a folded stack of cream knitwear on an oak "
                   "shelf; a pair of dark brown brogues on a felt mat. A single linen-shaded lamp "
                   "giving warm champagne light. No brand labels visible anywhere. No people.",
                   "4:5"),
            Prompt(15, "london-breakfast-tray.jpg", "Breakfast tray, quiet kitchen",
                   "85mm, f/2. A walnut kitchen island at 07:15, shot from low at the edge. A linen tray "
                   "with a single white porcelain cup, a silver butter knife, a small dish of dark "
                   "honey, a pale ceramic plate with a folded cotton napkin. The first cold morning "
                   "light through a sash at left, warm lamp at right. No newspaper, no magazine, no "
                   "print on any surface. No hands visible.",
                   "3:4"),
            Prompt(16, "london-hallway-holdall.jpg", "Holdall by the door",
                   "35mm. A dark-green softened-leather weekender settled on a black-and-white tiled "
                   "Victorian floor, at the foot of a polished mahogany bannister. 08:00 overcast London "
                   "light through a fanlight. A pair of camel gloves lying on top. Triad: deep forest "
                   "bag, champagne glove, oatmeal tile. Absolutely no luggage tags, no airline tags, no "
                   "text on any surface. No people.",
                   "1:1"),
            Prompt(17, "london-car-kerb.jpg", "Car at the kerb, Westbourne",
                   "24mm. A matte-black saloon at a Notting Hill stuccoed curb, seen from above and "
                   "behind — 07:50, rain-dark pavement, a single plane tree just out of leaf to the "
                   "left. The driver's door is closed, the rear door open a hand's width. No licence "
                   "plate visible (cropped out), no house numbers, no shop signage. Triad: wet slate, "
                   "stucco cream, deep teal shadow inside the car.",
                   "16:9"),
            Prompt(18, "london-rain-glass.jpg", "Rain on sash glass",
                   "100mm macro. The interior side of a sash-window pane at 07:30; the outside world is "
                   "a mist-teal blur of stuccoed London, the inside is warm champagne-lit. A single "
                   "drop of condensation running down the inner glass. A pale linen curtain half-drawn "
                   "to the right. Triad: cool mist-teal outside, warm champagne inside, still navy at "
                   "the inner corner. No signage legible on any building through the glass.",
                   "1:1"),
            Prompt(19, "london-farnborough-apron.jpg", "Farnborough, first light",
                   "28mm, 06:40. A private terminal apron in low-cloud morning, shot so the aircraft "
                   "tail is out of frame. A single handling vehicle in deep charcoal, its panels slightly "
                   "wet. Apron markings are abstracted and out of focus. Airport wayfinding is not "
                   "visible. A pale champagne band of sun beginning to break low on the horizon. No "
                   "signage legible, no tail numbers, no operator branding.",
                   "21:9"),
            Prompt(20, "london-biggin-gate.jpg", "Quiet gatehouse, Biggin Hill",
                   "35mm. A side view of a small private-terminal garden-walk at 07:20 — oatmeal gravel, "
                   "a single low yew hedge, a teak bench with a folded cream throw. Mist-teal early "
                   "light. The back of a figure in a charcoal wool coat receding toward an interior "
                   "doorway at the far end, deeply out of focus. No signage anywhere in frame.",
                   "16:9"),
            Prompt(21, "london-member-hallway-candle.jpg", "Hallway, candlelight",
                   "50mm. A panelled London hallway at 18:30 in late autumn. A single pillar candle on "
                   "a console table throwing warm champagne light onto cloud-white wainscot; a deep "
                   "teal framed mirror above, showing only abstract reflection (no reflected face). A "
                   "linen coat on a hook at frame-right. Triad: champagne, cloud-white, deep teal. No "
                   "text on any framed print.",
                   "4:5"),
            Prompt(22, "london-evening-return.jpg", "Evening return, threshold",
                   "28mm. The interior view of a Notting Hill front door at 19:45 — softly lit from a "
                   "brass-shaded sconce above, the door just closing on a dark street beyond. A set of "
                   "keys settling onto a small oak console. A camel coat being hung by a shoulder that "
                   "is out of frame. Triad: warm lamp, deep navy street beyond, champagne wool. No "
                   "house number visible through the door.",
                   "16:9"),
            Prompt(23, "london-garden-window.jpg", "Garden window, cloud-morning",
                   "85mm. The inside of a Chelsea garden-facing French window, 08:15. A single pale-pink "
                   "magnolia just visible on a bare branch outside (keep restrained — no saturated red "
                   "or pink, read as dusted champagne). A linen cushion on a sill seat. A pale porcelain "
                   "teacup half-drunk. No hands, no face, no text. Triad: champagne magnolia, mist teal "
                   "garden, linen cushion.",
                   "4:5"),
            Prompt(24, "london-stairwell.jpg", "Stairwell, afternoon",
                   "24mm. A polished Georgian stairwell in a Mayfair house seen from the first landing "
                   "looking down, 15:30. Soft overcast light from a tall sash on the half-landing "
                   "below. A dark wool runner held by brass stair-rods. A single linen-bound book on "
                   "the bannister newel post, spine turned to the wall so the cover and spine are not "
                   "visible. Triad: cloud-white, walnut, harbour grey.",
                   "3:4"),
        ],
    ),
    Section(
        number=3,
        slug="03-lugano-ticino",
        name="Lugano and Ticino — Lakeside Quiet",
        prompts=[
            Prompt(25, "lugano-villa-terrace-dawn.jpg", "Villa terrace, 06:45",
                   "24mm. A stone terrace of a low Ticinese villa above Lake Lugano, 06:45 — mist on "
                   "the water, a pale champagne band of first sun just visible on Monte San Salvatore, "
                   "the nearer water in deep teal. A linen-cushioned teak lounger at frame-right with a "
                   "cream throw. No boats, no jetty signage, no people.",
                   "16:9"),
            Prompt(26, "lugano-palazzo-doorway.jpg", "Palazzo doorway, Lugano",
                   "35mm. A narrow lane in Lugano città vecchia at 08:30 — wet cobbles, a deep-teal "
                   "painted wooden door set into old stucco, a single brass knocker (no legible "
                   "engraving), a terracotta pot of rosemary (not flowering red — only grey-green "
                   "needle) at the base. Triad: ochre stucco restrained to warm champagne, deep teal, "
                   "slate cobble. No shop signage. No people.",
                   "3:4"),
            Prompt(27, "lugano-lake-jetty.jpg", "Lake jetty, morning mist",
                   "85mm. A weathered-oak jetty edge receding into mist-teal water, 07:15. A single "
                   "mooring ring of tarnished brass (no text, no number), a coiled length of cream rope "
                   "on the planks. The far shore dissolved into pale champagne mist. No boats visible, "
                   "no human figure.",
                   "21:9"),
            Prompt(28, "lugano-kitchen-porcelain.jpg", "Kitchen, porcelain and stone",
                   "50mm. A Ticinese farmhouse kitchen at 09:00 — a single thick pale-stone countertop, "
                   "a cream porcelain teapot, two unmatched oatmeal cups, a folded linen napkin. A "
                   "window sill behind holds a sprig of rosemary in a small glass jar of water. Warm "
                   "champagne morning light from the sash. No recipe book, no printed packaging, no "
                   "text on any container.",
                   "4:5"),
            Prompt(29, "lugano-gandria-alley.jpg", "Gandria alley",
                   "35mm. A narrow stone alley in Gandria descending toward the lake, 17:30 — late sun "
                   "on one wall in warm champagne, the other in deep teal shadow. A single figure in "
                   "charcoal wool receding down the alley, shoulders only visible, deeply out of focus. "
                   "No shop signage legible.",
                   "4:5"),
            Prompt(30, "lugano-mendrisio-vineyard.jpg", "Mendrisiotto vineyard",
                   "28mm. Low rows of Merlot vines in Mendrisiotto at 07:30, early autumn — leaves "
                   "turning dusted-champagne, not red (keep saturated red out). The mist-teal hills of "
                   "Monte Generoso behind. A single oak post in the foreground catching the first "
                   "light. No farm buildings with signage, no people.",
                   "16:9"),
            Prompt(31, "lugano-interior-library.jpg", "Library interior, Bellinzona",
                   "24mm. A panelled library in a Ticinese palazzo near Bellinzona, 14:00 — bookcases "
                   "of worn walnut, the spines deliberately turned to the wall so only the fore-edges "
                   "of the pages show (cream-ivory block). A single brass reading lamp. A deep-teal "
                   "upholstered reading chair. Cool overcast light from a tall window. No people, no "
                   "legible text anywhere.",
                   "4:5"),
            Prompt(32, "lugano-boat-still.jpg", "Wooden launch, stillness",
                   "50mm. A classic wooden launch moored at a lake jetty, seen from the water side at "
                   "07:00. Varnished mahogany hull reflecting deep teal; a single cream rope fender "
                   "at the bow; the helm brass fittings polished blank (no gauge numerals legible). "
                   "Mist on the water. No registration numbers on the hull, no livery.",
                   "16:9"),
            Prompt(33, "lugano-alpine-shoulder.jpg", "Crossing shoulder, wool cuff",
                   "85mm, f/2. A dark wool cuff with a simple unbranded steel watch (hour batons only, "
                   "no numerals, no wordmark), forearm resting on a pale stone balustrade above Lake "
                   "Lugano at 17:15. The lake reads as deep teal; the far ridge in warm champagne "
                   "late-sun. Only the cuff, the watch, and the hand are in frame; no face.",
                   "1:1"),
            Prompt(34, "lugano-church-bell.jpg", "Morriello campanile, 06:30",
                   "135mm. The upper stage of a Ticinese stone campanile seen across tiled roofs at "
                   "06:30 — pale champagne first light on one face, deep teal shadow on the other. "
                   "Slate tiles in the foreground out of focus. No town signage, no people.",
                   "3:4"),
        ],
    ),
    Section(
        number=4,
        slug="04-gstaad-alpine",
        name="Gstaad, St Moritz and Alpine Quiet",
        prompts=[
            Prompt(35, "gstaad-chalet-dawn.jpg", "Chalet bedroom, first light",
                   "35mm. An alpine chalet bedroom in Saanenland at 07:15 — weathered-pine walls, "
                   "linen-curtained windows letting in pale champagne first light, a deep-teal ticking "
                   "eiderdown folded at the end of a bed, a pair of grey wool socks on a small oak "
                   "rug. A leather overnight bag half-visible at frame-right. No people, no text.",
                   "4:5"),
            Prompt(36, "gstaad-fireplace.jpg", "Fireplace, evening",
                   "50mm, f/2. A low-burning hearth in a Saanen chalet at 18:45, the fire throwing warm "
                   "champagne light onto cloud-white wool rugs and a deep-teal linen sofa. A cream "
                   "cashmere throw over the sofa arm. A porcelain cup of herbal tea on a hearth-side "
                   "oak stool. No people, no text on any spine.",
                   "16:9"),
            Prompt(37, "gstaad-window-snow.jpg", "Window snow, still morning",
                   "85mm. The view through a mullioned alpine window at 07:30 — fresh snow on a "
                   "weathered balcony rail, pine needles dark teal beyond, the sky cool mist-teal. A "
                   "single linen curtain softly framing the right edge, a porcelain cup of black "
                   "coffee on the sill. No people. No text on the cup.",
                   "3:4"),
            Prompt(38, "gstaad-ski-still.jpg", "Skis by the door",
                   "35mm. A pair of pale ash-grain skis leaning against a weathered chalet porch wall, "
                   "boots on a slate floor beside them. A pair of dark-teal wool mittens balanced on "
                   "the slate. 08:00 alpine light. No brand names visible on ski, no binding logos, no "
                   "brass signage on the wall.",
                   "4:5"),
            Prompt(39, "gstaad-alpine-pass.jpg", "Alpine pass, early sun",
                   "24mm. A quiet alpine road curving above Saanen at 06:45 — first light on a distant "
                   "peak in warm champagne, the road in deep teal shadow. A single black saloon parked "
                   "at a pull-off, all four doors closed, no licence plate visible. No signage.",
                   "21:9"),
            Prompt(40, "gstaad-cashmere-throw.jpg", "Cashmere folded",
                   "100mm macro. Tight macro of folded cream cashmere on a deep-teal linen chair. "
                   "Warm directional champagne light catching the weave, the small slubs of the yarn, "
                   "the precise edge where two folds meet. Deep teal in the shadowed valley of a fold. "
                   "No people, no text.",
                   "1:1"),
            Prompt(41, "gstaad-village-path.jpg", "Village path, morning",
                   "35mm. A short flagstone path behind a chalet in Saanen at 08:00 — a narrow wooden "
                   "gate, a single oak-handled broom leaning by a doorway, pale snow patches. A "
                   "shoulder in a charcoal wool coat receding toward the chalet door, deeply out of "
                   "focus. No shop signage anywhere.",
                   "16:9"),
            Prompt(42, "gstaad-interior-library.jpg", "Chalet library",
                   "28mm. A small panelled chalet library at 17:00 — bookshelves turned so only the "
                   "page fore-edges show, a walnut desk with a slim laptop closed, a single linen-"
                   "shaded lamp. A deep-teal velvet reading chair with a cream sheepskin throw. Warm "
                   "champagne lamp light, cool mist-teal from the window. No legible text anywhere.",
                   "4:5"),
            Prompt(43, "stmoritz-lake-afternoon.jpg", "St Moritz lake, 16:00",
                   "24mm. The frozen surface of Lake St Moritz at 16:00 in late winter, thin afternoon "
                   "light in warm champagne raking across the ice. Engadin peaks in deep teal distance. "
                   "A single figure in a charcoal coat walking at the far edge of the ice, back to "
                   "camera, deeply out of focus. No event signage, no people clustered.",
                   "21:9"),
            Prompt(44, "stmoritz-lobby-window.jpg", "Engadin window seat",
                   "50mm. A deep mullioned window seat in an Engadin chalet, 08:15. A cream sheepskin "
                   "throw on the seat, a single porcelain cup of coffee. Through the window, snow-"
                   "dusted larches in dark teal and distant slopes in champagne. No people.",
                   "4:5"),
            Prompt(45, "alpine-morning-coffee.jpg", "Morning coffee, balcony",
                   "85mm. A small teak balcony at 07:45 above Saanen — a tray with a single dark "
                   "porcelain cup of coffee, a small dish with a single pear, a folded linen napkin. "
                   "Mist-teal morning valley beyond. Warm champagne light just catching the tray edge. "
                   "No hands, no text.",
                   "1:1"),
            Prompt(46, "alpine-skihold-macro.jpg", "Ski bag, threshold",
                   "35mm. A single charcoal ski bag laid along a stone chalet threshold at 08:00 — "
                   "correct scale for the skis inside (not warped, not oversized). A pair of dark "
                   "leather boots beside it. Cool champagne alpine light. No brand names, no tags.",
                   "16:9"),
            Prompt(47, "alpine-pine-detail.jpg", "Pine needles, close",
                   "100mm macro. A tight shot of dew on dark pine needles, 07:30 alpine light. The "
                   "needles read as deep teal with champagne highlights on the beaded water. A soft "
                   "blur of cloud-mist behind. No text, no people.",
                   "1:1"),
            Prompt(48, "alpine-dusk-larch.jpg", "Larch at dusk",
                   "135mm. A single mature larch against a pale cool sky at 17:30 — the tree's needles "
                   "catching a last breath of warm champagne, the sky behind in mist-teal tipping to "
                   "deep teal. No buildings in frame, no signage.",
                   "3:4"),
        ],
    ),
    Section(
        number=5,
        slug="05-monaco-cote-dazur",
        name="Monaco and the Côte d'Azur",
        prompts=[
            Prompt(49, "monaco-balcony-17h.jpg", "Monte Carlo balcony",
                   "24mm. A shaded stone balcony in Monte Carlo at 17:30 — oatmeal linen curtain "
                   "lifting gently at frame-left, slate harbour water in the distance, pale champagne "
                   "late light. A teak side table with a single coffee cup half-drunk. No yachts in "
                   "foreground flash, no casino signage, no sunset-orange sky.",
                   "16:9"),
            Prompt(50, "capferrat-terrace.jpg", "Cap Ferrat terrace",
                   "35mm. The low-stone terrace of a Cap Ferrat villa at 16:45 — pale limestone, a "
                   "single olive tree in a terracotta pot (keep leaves muted silver-green), a pair of "
                   "cream linen-cushioned chairs. Mediterranean deep teal water beyond. A folded book "
                   "on a chair, rear board up, no spine visible. No people.",
                   "4:5"),
            Prompt(51, "monaco-study-lamplit.jpg", "Private study, lamplit",
                   "50mm, f/2. A small study in a Monaco apartment at 19:00 — walnut desk, a slim "
                   "laptop closed, a single cream porcelain tumbler of still water, a linen-shaded "
                   "lamp throwing warm champagne light. A deep-teal leather blotter. No printed paper, "
                   "no books with legible spines.",
                   "1:1"),
            Prompt(52, "monaco-threshold.jpg", "Monte Carlo doorstep",
                   "35mm. A stone-paved step outside a discreet Monte Carlo apartment doorway at 08:30 "
                   "— a pair of simple black flat leather shoes placed neatly by the door, a single "
                   "folded newspaper face-down and closed (no print visible on any side). Warm "
                   "champagne morning light. No name plaques, no numbers on the door.",
                   "4:5"),
            Prompt(53, "cotedazur-cape.jpg", "Cape, late afternoon",
                   "85mm. A low stone wall above a Cap d'Antibes cove at 17:30 — pine trees to one "
                   "side in deep teal, the sea a soft champagne-and-mist reflection. A single pair "
                   "of oatmeal canvas espadrilles on the wall. No boats in the water.",
                   "3:4"),
            Prompt(54, "monaco-car-kerb.jpg", "Car at the curb, harbour road",
                   "28mm. A matte navy saloon parked at a Monte Carlo curb at 18:00 — the harbour "
                   "below reading as deep teal and mist. A single figure in charcoal wool closing the "
                   "rear door, back to camera, deeply out of focus. No licence plate, no casino "
                   "signage visible in frame.",
                   "16:9"),
            Prompt(55, "coastal-breakfast-tray.jpg", "Coastal breakfast tray",
                   "50mm. A small linen-draped tray on a stone terrace in Cap Ferrat at 09:00 — a "
                   "single cream porcelain cup, a ceramic dish with sliced fig (muted purple, no "
                   "saturated red), a small glass carafe of olive oil (unlabelled, no print), a folded "
                   "linen napkin. No hands, no text, no magazine.",
                   "3:4"),
            Prompt(56, "monaco-harbour-mist.jpg", "Harbour mist, early",
                   "135mm. The harbour at Monte Carlo at 06:45 — mist on the water, a few masts in the "
                   "distance abstracted to grey-teal verticals, the sky a cool champagne-into-mist-"
                   "teal wash. Soft, no detail of boats legible, no brand-name scripts.",
                   "21:9"),
            Prompt(57, "menton-lemon-detail.jpg", "Menton lemon, restrained",
                   "100mm macro. A single lemon on a stone windowsill in Menton, 17:00 — keep the "
                   "yellow muted toward champagne, not vivid. Warm side light, deep teal shadow "
                   "under the fruit. A fine crease in the linen cloth beside it. No text, no label.",
                   "1:1"),
            Prompt(58, "nice-promenade.jpg", "Promenade, overcast",
                   "35mm. An early-morning promenade along a Nice-style seafront at 07:15 on an "
                   "overcast day — pale harbour grey sea, mist-teal sky, a single cast-iron lamp "
                   "post. A figure in a charcoal wool coat walking away from camera, deeply out of "
                   "focus. No legible shop signage.",
                   "16:9"),
        ],
    ),
    Section(
        number=6,
        slug="06-mediterranean-islands",
        name="Ibiza, Mykonos, Mustique — Islands",
        prompts=[
            Prompt(59, "ibiza-cala-stone-house.jpg", "Ibiza finca, 17:30",
                   "28mm. A whitewashed finca in northern Ibiza at 17:30 — the pale lime-washed wall "
                   "catching the warm champagne band of late sun, a deep-teal wooden door ajar. A "
                   "rough olive-wood bench with a folded linen towel. No hotel signage, no cocktail "
                   "clichés.",
                   "4:5"),
            Prompt(60, "mykonos-threshold.jpg", "Mykonos threshold, open door",
                   "35mm. The threshold of a white-rendered Cycladic house at 18:00 — last warm light "
                   "on the wall, a deep-teal-painted door open a hand's width. A folded linen towel "
                   "on a whitewashed stone bench. Triad: cloud-white, deep teal, champagne late-sun.",
                   "4:5"),
            Prompt(61, "mykonos-staircase.jpg", "Cycladic stair",
                   "85mm. A whitewashed external staircase winding up a Cycladic house, 17:45. Deep "
                   "teal painted handrail. The risers in pure cloud-white; treads catching a warm "
                   "champagne light. No people, no café signage, no potted geraniums (no red).",
                   "3:4"),
            Prompt(62, "ibiza-linen-curtain.jpg", "Linen curtain, breath of wind",
                   "100mm. The corner of a white-rendered interior where a long oatmeal linen curtain "
                   "is lifting in an evening breeze, 18:15. Deep teal shadow in the window recess, "
                   "warm champagne light across the wall. A terracotta tile floor just visible, muted "
                   "toward stone, not saturated.",
                   "1:1"),
            Prompt(63, "mustique-veranda.jpg", "Mustique veranda, 17:00",
                   "35mm. A teak veranda on Mustique at 17:00 — a cream-rope hammock catching warm "
                   "champagne late light, a linen sarong folded at its edge, the sea deep teal "
                   "beyond. Slatted teak deck slightly weathered by salt air. No hotel signage.",
                   "16:9"),
            Prompt(64, "island-kitchen-stone.jpg", "Island kitchen, stone",
                   "50mm. A rustic stone-counter Mediterranean kitchen at 09:00 — a single stone bowl "
                   "of lemons (muted, not vivid), an olive-wood board with a bread knife, a folded "
                   "linen cloth, a glass carafe of water. Warm champagne morning light. No jars with "
                   "readable labels, no print.",
                   "4:5"),
            Prompt(65, "ibiza-bougainvillea-restrained.jpg", "Bougainvillea, restrained",
                   "135mm. A small spray of bougainvillea against a whitewashed wall at 08:00 — keep "
                   "the colour restrained to muted champagne-pink and dusty mauve only (absolutely no "
                   "saturated red, no hot pink, no neon fuchsia). Warm morning light, deep teal "
                   "shadow in the recess behind.",
                   "1:1"),
            Prompt(66, "mykonos-jetty.jpg", "Mykonos jetty, stillness",
                   "28mm. A low stone jetty on the Mykonos shore at 07:00, mist on the sea, an old "
                   "brass mooring ring (no text, no numerals). A single coil of cream rope. Deep teal "
                   "water in the foreground, cool mist-teal horizon. No boats in frame.",
                   "21:9"),
            Prompt(67, "mustique-hand-railing.jpg", "Hand on railing, salt air",
                   "85mm, f/2. A hand in a pale linen cuff resting on a sun-weathered teak railing at "
                   "17:30 — the sea in deep teal beyond. Only the hand and cuff are in frame — no "
                   "face, no shoulder visible. A simple unbranded steel watch (hour batons only).",
                   "1:1"),
            Prompt(68, "mediterranean-pool-stone.jpg", "Stone pool, still",
                   "35mm. The corner of a private stone pool in a Mediterranean courtyard at 17:45, "
                   "the water reading deep teal, the stone surround warm champagne in the last sun. "
                   "A folded oatmeal towel on a teak lounger. No people, no pool noodles, no hotel "
                   "signage.",
                   "16:9"),
            Prompt(69, "ibiza-hilltop-olive.jpg", "Olive grove, Ibiza",
                   "50mm. A low olive grove on an Ibiza hillside at 07:30 — silvered leaves, pale "
                   "stone between roots, mist-teal sea in the far distance. A simple low stone wall "
                   "in the foreground. No farm equipment, no signage.",
                   "3:4"),
            Prompt(70, "mykonos-evening-candle.jpg", "Cycladic candle, 19:30",
                   "85mm, f/2. A single pillar candle on a whitewashed stone shelf at 19:30 — warm "
                   "champagne flame throwing soft light on the lime-wash, deep teal shadow in the "
                   "recess. A folded linen napkin beside the candle. No printed matches, no label.",
                   "1:1"),
            Prompt(71, "island-garden-stone.jpg", "Garden stone, morning",
                   "28mm. A narrow stone path through a Mediterranean herb garden at 07:45 — grey-"
                   "green rosemary, lavender in muted dusty mauve (never saturated), stone underfoot. "
                   "A single terracotta pot. A shoulder in an oatmeal linen shirt receding at the far "
                   "end of the path, deeply out of focus.",
                   "16:9"),
            Prompt(72, "mustique-hammock-detail.jpg", "Hammock detail, late light",
                   "100mm macro. The cream rope of a veranda hammock at 17:30 on Mustique — tight "
                   "macro on the weave, champagne light catching the high strands, deep teal shadow "
                   "in the interstices. No logos, no text.",
                   "1:1"),
        ],
    ),
    Section(
        number=7,
        slug="07-provence-countryside",
        name="Provence and European Countryside",
        prompts=[
            Prompt(73, "provence-farmhouse.jpg", "Provence farmhouse, 08:00",
                   "35mm. The long shaded side of a Luberon stone farmhouse at 08:00 — pale limestone, "
                   "a deep-teal painted wooden shutter half-open, a single terracotta pot (herbs, not "
                   "flowers). A shoulder in an oatmeal linen shirt just out of frame at left. Warm "
                   "champagne morning, cool mist-teal distance.",
                   "4:5"),
            Prompt(74, "provence-lavender-restrained.jpg", "Lavender field, restrained",
                   "85mm. A row of lavender on a Provence hillside at 07:00 — keep the purple muted "
                   "toward dusty mauve, never saturated or vivid. The sky a cool mist-teal; warm "
                   "champagne first light on the distant ridge. A single olive tree on the edge of "
                   "frame.",
                   "16:9"),
            Prompt(75, "provence-kitchen-terracotta.jpg", "Farmhouse kitchen, quiet",
                   "50mm. A rustic Provençal kitchen at 09:15 — thick oak table, a linen runner, an "
                   "olive-wood board with a single pear, a porcelain cup of coffee. Warm champagne "
                   "light from a small window. A glass carafe of water. No jars with legible labels, "
                   "no recipe card.",
                   "4:5"),
            Prompt(76, "tuscany-villa-loggia.jpg", "Tuscan loggia",
                   "28mm. The low shaded loggia of a Tuscan farmhouse at 17:30 — pale plastered wall "
                   "in warm champagne, deep teal shadow, a single pair of linen-cushioned chairs, a "
                   "weathered oak table. Olive trees receding into mist-teal distance. No hotel "
                   "signage.",
                   "16:9"),
            Prompt(77, "provence-garden-path.jpg", "Garden path, afternoon",
                   "35mm. A narrow gravel path between low lavender (muted) and rosemary in a Provence "
                   "garden at 16:00 — dappled shade from an olive tree. A folded book with the rear "
                   "board up on a stone bench. No print visible on any surface.",
                   "3:4"),
            Prompt(78, "tuscan-window-sill.jpg", "Tuscan window, cool light",
                   "85mm. A mullioned window in a Tuscan stone farmhouse at 07:30 — pale morning "
                   "light on the sill, a single porcelain cup, a small jar of dried herbs (jar "
                   "unlabelled, glass clear). Cool mist-teal through the glass, warm champagne light "
                   "inside.",
                   "1:1"),
            Prompt(79, "countryside-road.jpg", "Empty country road",
                   "50mm. A narrow empty country lane at 06:45 in early autumn — hedgerows in deep "
                   "teal, distant field in champagne mist, a single black saloon parked at a pull-"
                   "off (no licence plate visible). Harbour grey sky. No signage.",
                   "21:9"),
            Prompt(80, "provence-vineyard-morning.jpg", "Vineyard morning",
                   "28mm. Low rows of vines in Provence, early autumn, 07:15 — leaves turning toward "
                   "dusted champagne, not red. A single stone cistern at frame-right. Mist-teal "
                   "distant hills. No farm equipment, no signage.",
                   "16:9"),
            Prompt(81, "provence-outdoor-bath.jpg", "Outdoor tub, courtyard",
                   "35mm. A standalone cast-iron bath in a Provençal stone courtyard at 17:00 — deep "
                   "teal water in the tub, champagne late light on the stone, a folded oatmeal towel "
                   "on an oak stool. No people, no soap brands, no labels.",
                   "4:5"),
            Prompt(82, "countryside-oak-shadow.jpg", "Single oak, shadow long",
                   "135mm. A single mature oak in a Provence meadow at 17:45, its long shadow in "
                   "deep teal across champagne grass. A low stone wall at the foreground. Cool "
                   "mist-teal sky. Keep greens muted — no saturated chartreuse or lime.",
                   "16:9"),
        ],
    ),
    Section(
        number=8,
        slug="08-caribbean-transatlantic",
        name="Caribbean and Transatlantic",
        prompts=[
            Prompt(83, "caribbean-veranda-18h.jpg", "Caribbean veranda, 18:00",
                   "35mm. A teak veranda on a small Caribbean island at 18:00 — warm champagne late "
                   "light on the timber, deep teal sea beyond, a single cream rope hammock. A folded "
                   "linen sarong on its edge. No tiki torches, no hotel bar signage, no sunset-orange "
                   "sky (keep warm champagne tipping to cool teal).",
                   "16:9"),
            Prompt(84, "nyc-pied-a-terre.jpg", "New York pied-à-terre, morning",
                   "28mm. The living room of a New York pied-à-terre at 07:45 — tall casement windows "
                   "with soft overcast Manhattan light, a deep-teal velvet sofa, a cashmere throw in "
                   "champagne. A slim laptop closed on a walnut coffee table. Triad: champagne "
                   "cashmere, deep teal, cloud-white wall. No skyline signage, no street-sign text.",
                   "4:5"),
            Prompt(85, "bahamas-dock.jpg", "Quiet dock, Bahamas",
                   "85mm. A short teak dock extending into still deep-teal water at 07:00 — mist on "
                   "the sea, a single coil of cream rope on the planks, a pair of canvas espadrilles. "
                   "No boats visible, no signage.",
                   "21:9"),
            Prompt(86, "caribbean-house-doorway.jpg", "House doorway, dusk",
                   "35mm. The deep-teal wooden door of a Caribbean island house at 18:30 — lit by a "
                   "single warm candle inside visible through a narrow gap. Pale coral-stone wall "
                   "(keep coral toward oatmeal/stone, not orange). A folded linen towel on a stone "
                   "step.",
                   "3:4"),
            Prompt(87, "mustique-interior.jpg", "Mustique interior, cool late",
                   "50mm. A low-ceilinged sitting room in a Mustique house at 17:45 — cream cotton "
                   "sofas, deep-teal linen cushions, a rattan ceiling fan stilled. Cool mist-teal "
                   "light through louvred shutters. A porcelain cup on a coffee table. No hands, no "
                   "text.",
                   "4:5"),
            Prompt(88, "barbados-garden.jpg", "Walled garden, morning",
                   "28mm. A walled tropical garden at 07:30 — high coral-stone walls softened to "
                   "warm champagne in first light, a narrow gravel path, a single teak bench. Palms "
                   "in dark teal silhouette against mist-teal sky. No resort signage.",
                   "16:9"),
            Prompt(89, "transatlantic-cruise-window.jpg", "Cabin window, cruise height",
                   "85mm. The inside of an oval cabin window at cruise — the view is abstract cloud-"
                   "mist in cool teal-and-champagne, deep navy shadow at the window edge. A cream "
                   "cashmere throw on the adjacent seat. A hand in a dark knit cuff at the armrest "
                   "edge. No seat-back text, no decal.",
                   "4:5"),
            Prompt(90, "caribbean-pool-edge.jpg", "Pool edge, dawn",
                   "100mm. The stone edge of a private pool at 06:45 — water in deep teal, the stone "
                   "warmed by first champagne light. A folded oatmeal towel on a teak stool. No "
                   "branded floats, no hotel signage.",
                   "1:1"),
        ],
    ),
    Section(
        number=9,
        slug="09-domestic-interiors",
        name="Domestic Interiors — Before and After",
        prompts=[
            Prompt(91, "interior-breakfast-tray.jpg", "Breakfast tray at the sash",
                   "85mm. A linen-lined tray on a deep windowsill at 07:45 — a single porcelain cup "
                   "of black coffee, a small dish of sliced pear, a folded cotton napkin, an "
                   "unlabelled glass carafe of water. Overcast cool morning light through the sash; "
                   "warm lamp light from inside. No print, no magazine.",
                   "4:5"),
            Prompt(92, "interior-dressing-room.jpg", "Dressing room, before",
                   "35mm. A compact dressing room at 08:15 — a camel coat on a rail, a charcoal suit, "
                   "a stack of folded cream knitwear on an oak shelf. Warm champagne lamp light, cool "
                   "mist-teal from a small window. No brand labels visible.",
                   "4:5"),
            Prompt(93, "interior-sitting-afternoon.jpg", "Sitting room, 15:30",
                   "24mm. A quiet London sitting room at 15:30 — a deep-teal linen sofa, cream "
                   "cashmere throw, a walnut coffee table with a closed book (rear board up). Cool "
                   "overcast light from tall windows. No legible text anywhere.",
                   "4:5"),
            Prompt(94, "interior-study-lamplit.jpg", "Study, 19:00",
                   "50mm, f/2. A panelled study at 19:00 — a green shaded reading lamp casting warm "
                   "champagne light on a walnut desk, a slim laptop closed, a single tumbler of "
                   "still water. Deep teal shadow beyond the pool of light. No printed papers.",
                   "1:1"),
            Prompt(95, "interior-bedroom-first-light.jpg", "Bedroom, first light",
                   "28mm. A quiet bedroom at 06:45 — linen curtains half-drawn, a deep-teal "
                   "upholstered headboard, a cream coverlet turned down. A folded cashmere throw at "
                   "the foot of the bed. Warm champagne first light in a single band across the "
                   "floor. No people.",
                   "16:9"),
            Prompt(96, "interior-bathroom-morning.jpg", "Bathroom, morning",
                   "50mm. A walk-in shower and marble vanity at 07:30 — cool mist-teal morning light "
                   "on pale stone, a single oatmeal linen towel on a brass rail. A folded flannel. "
                   "No product bottles with legible labels — only unmarked glass and ceramic.",
                   "4:5"),
            Prompt(97, "interior-children-room-empty.jpg", "Child's room, tidied",
                   "35mm. A tidied child's bedroom at 08:00 — empty of occupant (no child, no child's "
                   "face, no child's hands in frame). A cream linen throw on a low bed, a single "
                   "hardback book on the nightstand (spine turned away), a wooden reading stool. "
                   "Keep palette muted — no primary-red toys, no orange plastic. Warm champagne "
                   "morning light.",
                   "4:5"),
            Prompt(98, "interior-pet-basket.jpg", "Pet basket, morning",
                   "85mm. A tweed dog-bed beside a set of French doors at 08:15 — empty (the dog is "
                   "out with the walker). A cream wool blanket inside. Warm champagne light on the "
                   "floor beside the bed, deep teal shadow under. No brand tags on the bed.",
                   "1:1"),
            Prompt(99, "interior-staff-space.jpg", "Quiet staff corridor",
                   "35mm. A narrow service corridor in a private London townhouse at 08:30 — cloud-"
                   "white walls, worn oak floor, a single pressed linen uniform on a hook, a stacked "
                   "pair of crisp white napkins on a shelf. Warm lamp light. No laundry tags visible.",
                   "4:5"),
            Prompt(100, "interior-kitchen-late.jpg", "Kitchen, late return",
                   "50mm. A London kitchen at 22:00 — a single pendant lamp casting warm champagne "
                   "light on a walnut counter, a porcelain cup of herbal tea, a folded tea-towel. "
                   "Deep navy beyond the window. No appliance brand names visible.",
                   "4:5"),
            Prompt(101, "interior-hall-evening-return.jpg", "Hallway, evening return",
                   "28mm. The inside of a front door at 19:50 — a camel coat being hung by a hand "
                   "out of frame, a pair of leather shoes being placed on a mat. A set of keys "
                   "settling into a small porcelain dish. Warm champagne sconce light, deep navy "
                   "beyond the door. No house number visible.",
                   "16:9"),
            Prompt(102, "interior-library-shelf.jpg", "Shelf, fore-edges",
                   "100mm macro. A library shelf seen from a low angle — all books turned spine-"
                   "inward so only cream-ivory page fore-edges show. Warm champagne light raking "
                   "across the block of edges. A single brass reading-lamp base at frame-right "
                   "(blank, no engraving). No text anywhere.",
                   "1:1"),
            Prompt(103, "interior-window-seat.jpg", "Window seat, reading",
                   "50mm. A deep bay window seat at 15:45 — a deep-teal linen cushion, a cream "
                   "sheepskin throw, a single closed hardback with the rear board up, a porcelain "
                   "cup half-drunk. Overcast light from outside. No people, no visible print.",
                   "4:5"),
            Prompt(104, "interior-flowers-restrained.jpg", "Flowers, restrained",
                   "85mm. A low stoneware vase on a walnut console at 08:30 — eucalyptus and pale "
                   "cream hellebore (absolutely no red, no saturated yellow, no hot pink — keep "
                   "palette to soft champagne, sage, and ivory). Warm morning light. No card, no "
                   "ribbon with printing.",
                   "1:1"),
            Prompt(105, "interior-stairs-runner.jpg", "Stairs runner, morning",
                   "35mm. A Georgian staircase with a dark-teal wool runner held by brass stair rods, "
                   "08:00. A single leather holdall at the foot of the stairs. Warm lamp light "
                   "overhead, cool overcast light from a half-landing window. No labels on the bag.",
                   "3:4"),
        ],
    ),
    Section(
        number=10,
        slug="10-cabin-stills",
        name="Cabin Stills — Interior of the Aircraft",
        prompts=[
            Prompt(106, "cabin-seat-belt-folded.jpg", "Seat belt folded, ready",
                   "85mm. A cream leather business-jet club seat photographed from above at 07:20, "
                   "the seat belt folded into a neat cross and laid on the seat cushion. Warm LED cove "
                   "light, deep teal shadow in the recess of the seat. No seat-back screen legible.",
                   "1:1"),
            Prompt(107, "cabin-window-soft-cloud.jpg", "Oval window, cloud",
                   "50mm. The interior of an oval cabin window at cruise — cool mist-teal cloud "
                   "beyond, a cream cashmere throw on the adjacent seat, a hand in a dark knit cuff "
                   "resting on the armrest. No text, no decal, no seat-back logo. Warm LED cove "
                   "light interior.",
                   "4:5"),
            Prompt(108, "cabin-galley-detail.jpg", "Galley, ready",
                   "35mm. The compact galley of a super-midsize business jet at 06:45 — brushed "
                   "metal surfaces, a single porcelain cup on a stowed tray, a folded linen napkin. "
                   "Warm LED indirect light. No airline logo, no operator branding, no brand names "
                   "on any appliance face.",
                   "4:5"),
            Prompt(109, "cabin-throw-still.jpg", "Cashmere throw in cabin",
                   "100mm macro. A cream cashmere throw settled on a champagne-leather cabin seat, "
                   "warm LED cove light raking across the weave, deep teal shadow in the fold. No "
                   "text, no brand tag visible.",
                   "1:1"),
            Prompt(110, "cabin-water-carafe.jpg", "Carafe on walnut table",
                   "85mm. A deployable walnut cabin table with a single unlabelled glass carafe of "
                   "still water and a cream porcelain tumbler. Warm LED cove light. No place names "
                   "etched on glass, no print.",
                   "1:1"),
            Prompt(111, "cabin-reading-lamp.jpg", "Reading lamp, mid-flight",
                   "50mm. A single brushed-metal reading lamp mounted to a cabin wall, casting a "
                   "warm champagne circle of light onto a cream leather armrest. Deep teal shadow "
                   "beyond the circle. A closed hardback with the rear board up on the armrest. No "
                   "legible text on any surface.",
                   "4:5"),
            Prompt(112, "cabin-stateroom-bed.jpg", "Stateroom, turned down",
                   "28mm. A narrow stateroom at the rear of an ultra-long-range business jet at "
                   "22:15 — cream cotton sheets turned down, a folded deep-teal cashmere throw at "
                   "the foot of the bed. A single reading lamp in warm champagne. Flush wall "
                   "geometry correct to the aircraft type (narrow fuselage, oval window).",
                   "16:9"),
            Prompt(113, "cabin-bulkhead-detail.jpg", "Bulkhead, walnut",
                   "100mm macro. A tight detail of a walnut veneer cabin bulkhead — warm champagne "
                   "light across the grain, a single brushed-metal seam. Deep teal shadow in the "
                   "curve of the bulkhead. No legible engraving, no switch labels.",
                   "1:1"),
            Prompt(114, "cabin-laptop-tablet.jpg", "Member desk, mid-flight",
                   "50mm. A walnut cabin desk with a slim laptop open (screen deliberately out of "
                   "focus, no legible interface text), a tablet face-down, a folded linen napkin, a "
                   "porcelain cup of coffee. Warm LED cove light, cool mist-teal daylight through an "
                   "oval window at frame-right. No paper documents.",
                   "16:9"),
            Prompt(115, "cabin-crew-still.jpg", "Galley detail, crew-set",
                   "85mm. A linen-lined tray in a galley prep area — a single folded cotton napkin, a "
                   "porcelain dish of shelled pistachios, a small unlabelled glass bottle of still "
                   "water. No brand names, no operator branding, no menu card.",
                   "1:1"),
            Prompt(116, "cabin-pet-carrier.jpg", "Pet carrier, tucked",
                   "35mm. A soft-sided dark-green canvas pet carrier tucked neatly under a cabin "
                   "club-seat at 07:30, correct scale for the small dog inside (sleeping, not "
                   "visible). Warm LED cove light, deep teal shadow beneath the seat. No branded "
                   "mesh, no tag with text.",
                   "4:5"),
            Prompt(117, "cabin-skis-correct-scale.jpg", "Ski bag at threshold",
                   "28mm. A single dark-charcoal ski bag laid at the open threshold of a cabin door "
                   "at 07:15 — correct length and scale for the skis inside, photographed so it "
                   "clearly fits the aperture. Warm apron daylight beyond. No brand names on the bag.",
                   "16:9"),
            Prompt(118, "cabin-breakfast-late.jpg", "Mid-flight breakfast",
                   "50mm. A walnut cabin table at 09:30 mid-flight — a linen-lined tray with a "
                   "porcelain cup of black coffee, a small plate with a sliced pear (muted palette), "
                   "a folded linen napkin. Cool mist-teal daylight from an oval window, warm LED "
                   "cove light interior. No print, no menu, no logo.",
                   "3:4"),
        ],
    ),
    Section(
        number=11,
        slug="11-hands-and-vignettes",
        name="Hands-only Vignettes and Human Fragments",
        prompts=[
            Prompt(119, "hand-stone-balustrade.jpg", "Hand on stone, lake",
                   "85mm, f/2. A hand in a dark wool cuff resting on a pale stone balustrade above "
                   "Lake Lugano at 17:15 — lake deep teal, far ridge warm champagne. Only the cuff "
                   "and hand in frame. Simple unbranded steel watch, hour batons only.",
                   "1:1"),
            Prompt(120, "hand-brass-railing.jpg", "Hand on brass rail",
                   "100mm macro. A hand in a charcoal knit cuff resting on a brass stair rail in a "
                   "London townhouse at 08:00 — warm lamp light catching the patina of the brass, "
                   "deep teal shadow below. Only the hand, cuff, and rail in frame.",
                   "1:1"),
            Prompt(121, "breath-cold-glass.jpg", "Breath on glass",
                   "135mm macro. Breath condensing on the inside of a cool casement window at 07:30, "
                   "the outer world reading as mist-teal blur, the inner glass warm champagne from "
                   "a lamp behind. No face visible, no hand visible — only the breath trace.",
                   "1:1"),
            Prompt(122, "cuff-sill.jpg", "Wool cuff on sill",
                   "85mm. A camel wool cuff on a cool stone windowsill at 08:15 — the cool mist-"
                   "teal world beyond the glass out of focus, warm champagne interior light. Only "
                   "the cuff in frame.",
                   "1:1"),
            Prompt(123, "hands-folded-linen.jpg", "Hands, folded linen",
                   "100mm macro. Two hands lightly folded at the edge of a linen-covered table at "
                   "19:30 — the linen oatmeal, the hands in soft champagne lamp light, a single "
                   "faint wedding band. Deep teal shadow beyond. No face, no shoulders, no text on "
                   "the table.",
                   "1:1"),
            Prompt(124, "shoulder-receding-hall.jpg", "Shoulder receding",
                   "35mm. A figure in a charcoal wool coat turned away and walking toward a distant "
                   "doorway at the far end of a panelled Mayfair hallway at 08:00 — deeply out of "
                   "focus, the shoulder, back of the head, and coat only visible. Warm lamp light, "
                   "cloud-white walls.",
                   "16:9"),
            Prompt(125, "hand-at-car-door.jpg", "Hand at the car door",
                   "50mm. A hand in a dark wool cuff reaching toward the open rear door of a matte-"
                   "black saloon at a London mews curb at 07:45 — the door half-open, cream leather "
                   "interior visible, deep teal shadow inside. Only the hand, cuff, and door edge in "
                   "frame.",
                   "16:9"),
            Prompt(126, "profile-out-of-focus.jpg", "Profile, deeply out of focus",
                   "85mm, f/1.8. A figure at a cool casement window at 08:00 — the profile turned "
                   "three-quarters away from camera and deeply out of focus so no face feature is "
                   "legible. Warm champagne lamp light on the shoulder, cool mist-teal light on the "
                   "window.",
                   "4:5"),
            Prompt(127, "reflected-silhouette.jpg", "Silhouette in glass",
                   "135mm. A soft silhouette reflected in a tall sash window of a London drawing "
                   "room at 18:30 — the silhouette abstracted to a dark shape, no facial features "
                   "legible. Warm champagne interior lamp light reflecting in the glass, mist-teal "
                   "street beyond.",
                   "4:5"),
            Prompt(128, "hand-harbour-rope.jpg", "Hand on mooring rope",
                   "100mm macro. A hand in a pale linen cuff holding a length of cream mooring rope "
                   "on a teak jetty at 07:00 — the water beyond deep teal, mist rising. Only the hand, "
                   "cuff, and rope in frame.",
                   "1:1"),
            Prompt(129, "forearm-railing-alpine.jpg", "Forearm, alpine rail",
                   "85mm. A forearm in a dark-teal knit sleeve resting on a weathered timber balcony "
                   "rail above Saanenland at 07:45 — alpine first light on the distant peak, deep "
                   "teal valley below. No face.",
                   "1:1"),
            Prompt(130, "hand-porcelain-cup.jpg", "Hand, porcelain cup",
                   "100mm macro. A hand in a pale linen cuff lifting a cream porcelain coffee cup "
                   "from a walnut table at 07:45 — warm champagne lamp light, deep teal shadow "
                   "beyond. Only hand, cuff, and cup in frame.",
                   "1:1"),
            Prompt(131, "back-of-head-car.jpg", "Back of head, rear seat",
                   "50mm. The back of a head of a figure in a charcoal wool coat seated in the rear "
                   "seat of a saloon at 08:00 — mist-teal London street through the front windshield, "
                   "warm champagne lamp light from the car interior. No face visible.",
                   "16:9"),
            Prompt(132, "hand-alpine-glove.jpg", "Glove on timber",
                   "85mm. A single dark-teal wool mitten lying on a weathered chalet balcony rail "
                   "at 08:00 — alpine first light in warm champagne, pine trees in dark teal beyond. "
                   "A trace of snow on the fabric. No text.",
                   "1:1"),
        ],
    ),
    Section(
        number=12,
        slug="12-textures-ambient-arrivals",
        name="Textures, Ambient Light and Arrivals",
        prompts=[
            Prompt(133, "texture-linen-weave.jpg", "Linen weave, close",
                   "100mm macro. Tight macro of oatmeal linen draped across a walnut surface — warm "
                   "champagne directional light catching the weave, deep teal shadow in the fold. A "
                   "small crease where a hand has recently been. No text.",
                   "1:1"),
            Prompt(134, "texture-walnut-grain.jpg", "Walnut grain, lamplit",
                   "100mm macro. A tight detail of polished walnut veneer — warm champagne lamp "
                   "light raking across the grain pattern, deep teal shadow in a subtle recess. No "
                   "inlaid lettering, no monogram.",
                   "1:1"),
            Prompt(135, "texture-brass-worn.jpg", "Brass handle, worn",
                   "135mm macro. A weathered brass door handle on a deep-teal-painted wooden door — "
                   "warm light catching the worn high points, no engraving legible on the brass, no "
                   "hallmark visible. The paintwork softly chipped at the edge.",
                   "1:1"),
            Prompt(136, "texture-oak-floor.jpg", "Wide-board oak floor",
                   "85mm. A wide-board oak floor in a London drawing room seen from low at a slight "
                   "angle — warm champagne sunlight in a single band across the wood, a corner of a "
                   "deep-teal linen rug just entering frame. No text, no printed rug pattern.",
                   "3:4"),
            Prompt(137, "ambient-alpine-first-light.jpg", "Alpine first light",
                   "50mm. A distant peak catching the first light at 06:30 — warm champagne band on "
                   "the summit, deep teal valley below, mist-teal sky above. No foreground structures, "
                   "no signage.",
                   "21:9"),
            Prompt(138, "ambient-mediterranean-late.jpg", "Mediterranean late sun",
                   "135mm. The sea at 17:45 in the Med — mirror-still in parts, deep teal in shadow, "
                   "warm champagne on the sunlit band, a pale cloud-mist horizon. No boats visible, "
                   "no orange sunset sky.",
                   "21:9"),
            Prompt(139, "ambient-london-overcast.jpg", "London overcast, 07:30",
                   "28mm. A soft overcast view down a London stucco terrace at 07:30 — pale cream "
                   "facades, wet slate pavement, mist-teal sky. A single plane tree at the far end. "
                   "No shop signage legible, no licence plates.",
                   "16:9"),
            Prompt(140, "ambient-lugano-dusk.jpg", "Lugano quay at dusk",
                   "85mm. The quayside promenade in Lugano at 19:15 — lake surface deep teal, "
                   "streetlamps coming on in warm champagne. A shoulder in charcoal coat receding, "
                   "out of focus. No shop signage legible.",
                   "16:9"),
            Prompt(141, "arrange-car-waiting.jpg", "Car waiting, threshold",
                   "35mm. The view from inside a house out across the open front door at 08:00 — a "
                   "matte-black saloon idling at the kerb (no exhaust plume), rear door held open "
                   "by a hand out of frame. Soft overcast morning, cloud-white walls of the hall, "
                   "warm lamp light inside. No licence plate visible.",
                   "16:9"),
            Prompt(142, "arrange-florist-dawn.jpg", "Florist delivery, 07:00",
                   "50mm. A single stone doorstep at 07:00 with a loose bunch of restrained flowers "
                   "— eucalyptus, pale hellebore, a sprig of rosemary (absolutely no red, no "
                   "saturated yellow, no hot pink). Wrapped in plain brown craft paper, no printed "
                   "label, no ribbon text. Warm first light.",
                   "1:1"),
            Prompt(143, "arrange-garment-bag.jpg", "Garment bag, hall chair",
                   "35mm. A soft grey garment bag draped over the back of a walnut hall chair at "
                   "08:15 — no zipper pull logo, no branded print on the bag. A pair of dark "
                   "leather shoes on the floor beside. Warm lamp light, overcast morning from a "
                   "sash behind.",
                   "4:5"),
            Prompt(144, "arrange-concierge-note.jpg", "Concierge note, folded",
                   "100mm macro. A folded cream card resting on a small porcelain dish at 07:45, "
                   "the card BLANK — absolutely no written text, no monogram, no crest, no "
                   "printing. Warm champagne lamp light, deep teal shadow. A set of keys beside. If "
                   "the model would otherwise hallucinate writing, render the card as smooth empty "
                   "cream paper.",
                   "1:1"),
            Prompt(145, "arrival-london-sash.jpg", "Arrival, sash rain",
                   "85mm. The view of a glossy black-painted London front door from the interior at "
                   "19:45, wet pavement beyond, a single plane tree receding. The door is just "
                   "closing — a hand in a dark wool cuff on the handle, face out of frame. Warm "
                   "sconce light inside, deep navy street beyond.",
                   "3:4"),
            Prompt(146, "arrival-alpine-porch.jpg", "Arrival, alpine porch",
                   "35mm. The timber porch of a Saanen chalet at 17:30, a leather holdall just "
                   "placed on the stone threshold, a pair of dark leather boots beside it. Warm "
                   "champagne evening light just catching the pine wall, deep teal shadow below. "
                   "No people.",
                   "16:9"),
            Prompt(147, "arrival-island-door.jpg", "Arrival, island door",
                   "50mm. A deep-teal wooden door to a Mediterranean island villa at 18:15, just "
                   "opened — a single oatmeal linen holdall on the stone threshold, a folded cream "
                   "throw on a teak chair just inside. Warm champagne late light on the rendered "
                   "wall, mist-teal sea beyond in the distance.",
                   "4:5"),
            Prompt(148, "ambient-mist-on-lake.jpg", "Mist on water, 06:45",
                   "135mm. Mist lifting from a still alpine lake at 06:45 — the water deep teal in "
                   "the foreground, fading to pale cloud-mist at the far shore. A single oak "
                   "bough in dark silhouette entering frame at top-right. No boats, no jetties.",
                   "21:9"),
            Prompt(149, "ambient-candle-evening.jpg", "Candle, evening interior",
                   "100mm macro. A single pillar candle on a walnut console table at 19:00, warm "
                   "champagne flame, deep teal shadow behind on a cloud-white panelled wall. A "
                   "folded linen square beside the candle. No label, no text.",
                   "1:1"),
            Prompt(150, "ambient-cabin-empty-ready.jpg", "Cabin ready, night return",
                   "24mm. The interior of a super-midsize cabin at 22:30 after night-flight turnaround "
                   "— warm LED cove wash, cream-leather club seats, a single cream cashmere throw "
                   "folded on the nearest seat. Deep teal shadow in the aft galley end of the cabin. "
                   "Correct narrow fuselage geometry, oval windows showing only deep navy night "
                   "beyond. No people, no text.",
                   "21:9"),
        ],
    ),
    Section(
        number=13,
        slug="13-milan-english-speaker-city",
        name="Milan — the English-speaker city",
        prompts=[
            # ─── Milan as Milan (6) ───────────────────────────────────────────
            Prompt(151, "milan-linate-fbo-first-light.jpg", "Linate FBO, first light",
                   "28mm, 06:35. The drive into a quiet private terminal at Linate (LIML), seen from "
                   "inside a slow-moving black saloon. Mist-teal early light over a low-cloud Lombard "
                   "morning; champagne sodium just beginning to fade on the apron edge. The aircraft "
                   "tail is out of frame; a single handling vehicle in deep charcoal at far right, panels "
                   "softly wet. Apron markings out of focus. Triad: mist teal, charcoal-wet, faint "
                   "champagne horizon. No signage legible, no tail numbers, no operator branding, no "
                   "departure board, no number plate.",
                   "21:9"),
            Prompt(152, "milan-brera-arcade-morning.jpg", "Brera arcade, before the city",
                   "35mm, 07:10. A stone arcade in Brera, Milan, in early morning before the cafés open. "
                   "Polished travertine floor still cool from night; a single quiet shopfront in deep "
                   "olive-green at the far end, name plate blank. Soft overcast light from the open "
                   "courtyard at right. The shoulder of a single figure in a charcoal wool coat receding "
                   "deeply out of focus toward a mid-distance doorway. Triad: cloud-white travertine, "
                   "deep olive door, mist-teal far courtyard. No street signs, no shop names, no posters.",
                   "16:9"),
            Prompt(153, "milan-palazzo-courtyard.jpg", "Palazzo courtyard, sycamore shadow",
                   "24mm. A private palazzo courtyard in central Milan at 09:30 — a single mature plane "
                   "tree casting soft sycamore shadow across pale Lombard stone. A wrought-iron gate "
                   "half-open at the far end giving onto a quiet inner garden. A black saloon parked "
                   "discreetly at the side, three-quarters in shadow. No house numbers, no plaques. "
                   "Triad: pale stone, sycamore shadow, deep teal in the gate's shadow.",
                   "3:4"),
            Prompt(154, "milan-lake-como-villa-terrace.jpg", "Lake Como villa terrace, 06:45",
                   "35mm. The stone terrace of a low villa above Lake Como at 06:45 — mist still on the "
                   "water below, the far Bellagio shore reading as soft mist-teal silhouette. A linen-"
                   "covered breakfast table set for two, untouched: a white porcelain coffee pot, two "
                   "porcelain cups face-down, a small dish of pale honey, a folded oatmeal napkin. A "
                   "single fig branch from the garden in a stone vase. No people. No text on any "
                   "surface. Triad: mist teal lake, ivory linen, deep teal stone shadow.",
                   "4:5"),
            Prompt(155, "milan-quadrilatero-dusk.jpg", "Quadrilatero d'Oro, late autumn dusk",
                   "50mm, 17:40. A quiet Milanese street in the Quadrilatero d'Oro at late-autumn dusk — "
                   "wet pavement reflecting the warm champagne of a single window light, cool deep teal "
                   "above where the sky has gone to night. The corner of a discreet boutique window at "
                   "frame-right, with no display visible (cropped to abstract reflective glass). A "
                   "matte-black saloon paused at the far kerb, no licence plate visible. Triad: warm "
                   "champagne window, wet slate, deep teal sky.",
                   "16:9"),
            Prompt(156, "milan-navigli-first-light.jpg", "Navigli reflection, first light",
                   "50mm, f/2.0. The Navigli canal in Milan at 06:20 — black-mirror water with the "
                   "champagne reflection of a single café-window light just beginning to register. A "
                   "narrow stone bridge at mid-distance reading as silhouette. A wrought-iron mooring "
                   "ring on the embankment in the foreground, lived-in patina. No people, no boats, "
                   "no signage. Triad: still navy water, champagne reflected light, harbour grey "
                   "embankment stone.",
                   "21:9"),

            # ─── Milan as Italy-for-English-speakers (6) ─────────────────────
            Prompt(157, "milan-english-kitchen-italian-window.jpg",
                   "English kitchen, Italian shutters beyond",
                   "35mm, 08:00. The kitchen of an English-speaker's Milanese flat — a deep walnut "
                   "Shaker-style island in the foreground, a porcelain tea service laid for one (cup "
                   "face-up, milk jug half-full, a silver teaspoon resting on the saucer). Beyond the "
                   "open sash window, the green-painted wooden shutters of a Milanese palazzo across the "
                   "street, slightly ajar; soft Lombard morning light entering. The visual rhyme of "
                   "London on the inside, Milan beyond. Triad: walnut, ivory porcelain, soft mist teal "
                   "through the window. No tea-tin labels, no newspaper, no text on any surface.",
                   "4:5"),
            Prompt(158, "milan-mayfair-coded-study.jpg",
                   "Mayfair-coded study with Linate haze",
                   "50mm, f/2.0. A first-floor study in a Milanese flat that reads more Mayfair than "
                   "Milano — a green leather-topped writing desk, a brass library lamp, a single closed "
                   "hardback (rear board up), a slim closed laptop. Beyond a tall sash window, a low "
                   "Lombard morning haze with the silhouette of the city receding to soft champagne; "
                   "a distant aviation light blinking deeply out of focus on the horizon. Warm champagne "
                   "interior, cool mist-teal beyond. Triad: champagne lamplight, deep teal shadow, mist "
                   "teal far horizon. No book titles legible, no map text, no signage.",
                   "3:4"),
            Prompt(159, "milan-tea-on-marble.jpg", "Tea things on Milan marble, 08:15",
                   "85mm, f/2. A pale Italian marble counter at 08:15 — a single white porcelain teapot, "
                   "a porcelain cup half-drunk, a small dish of unsalted butter, a folded oatmeal "
                   "napkin, a closed silver-plate sugar bowl. The cool morning light of a Milan kitchen "
                   "from a window at left; a single small fig from the garden on a porcelain plate at "
                   "right. The visual feels of an English breakfast laid in an Italian room — restrained, "
                   "domestic, continuous. Triad: pale marble, ivory porcelain, soft mist teal shadow. "
                   "No newspaper, no labels, no print of any kind.",
                   "1:1"),
            Prompt(160, "milan-walnut-library-como-view.jpg",
                   "Walnut library, Como view at 16:00",
                   "35mm. A walnut-panelled library room in a Milan-area villa at 16:00 — soft warm "
                   "afternoon light entering through a tall window that looks out over Lake Como. Two "
                   "deep-teal velvet wing chairs facing each other across a small walnut table; a "
                   "porcelain cup on a saucer, the tea half-drunk; a folded cashmere throw on the chair "
                   "arm. The library shelves visible in soft focus, books with rear boards turned out "
                   "(no titles legible). Triad: walnut, deep teal velvet, champagne afternoon light. "
                   "No people. No text on book covers, lamp bases, or framed prints.",
                   "16:9"),
            Prompt(161, "milan-dressing-room-italian-light.jpg",
                   "Dressing room, sash window, Milan",
                   "35mm. A compact dressing room in a Milanese flat at 08:50 — a soft garment rail "
                   "with a charcoal English suit beside a camel wool coat, both finished with quietly "
                   "considered tailoring. A folded stack of cream knitwear on an oak shelf; a pair of "
                   "dark brown English brogues on a felt mat. The Italian sash window beyond, half-open, "
                   "letting in the late-summer Milan morning. The continuity is the point: the same "
                   "wardrobe a member would have in London, situated in Milan. Triad: charcoal wool, "
                   "camel coat, cool mist-teal Italian morning. No brand labels visible.",
                   "4:5"),
            Prompt(162, "milan-como-weekend-kitchen.jpg",
                   "Como weekend kitchen — could be the Cotswolds",
                   "28mm. The weekend kitchen of a Lake Como property held by an English-speaking family "
                   "— the visual deliberately reads as the Cotswolds: a heavy timber range, an oak table, "
                   "a Welsh dresser of pale-green cabinetry with porcelain stacked carefully behind. "
                   "Beyond the window, instead of a Cotswold lane, the morning shoulder of Como mountain "
                   "rising in soft mist-teal. A single jug of garden-cut greenery on the table. The "
                   "rhyme is the entire frame: an English kitchen, an Italian view. Triad: oak warmth, "
                   "pale green cabinetry, mist teal mountain. No text, no labels, no people.",
                   "4:5"),
        ],
    ),
]


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def all_prompts() -> List[Prompt]:
    """Flatten the library to a single ordered list."""
    return [p for section in SECTIONS for p in section.prompts]


def section_by_number(number: int) -> Section:
    for s in SECTIONS:
        if s.number == number:
            return s
    raise ValueError(f"No section numbered {number}")


# Curated one-per-section test set for smoke-testing the pipeline.
# Stress-tests faces-out-of-frame discipline (#124, #126) and text rule (#144).
# §13 (Milan) added 2026-05-03 — id 157 stresses the visual-rhyme principle
# (English kitchen + Italian shutters in one frame).
TEST_PROMPT_IDS: List[int] = [1, 15, 27, 40, 51, 63, 74, 85, 97, 110, 124, 126, 144, 157]


def test_prompts() -> List[Prompt]:
    by_id = {p.id: p for p in all_prompts()}
    return [by_id[i] for i in TEST_PROMPT_IDS]
