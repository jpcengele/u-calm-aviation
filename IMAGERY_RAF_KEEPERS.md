# U-Calm Aviation — Raf's First-Pass Imagery Keepers

Raf's must-keep selections from the 162-prompt library, parsed and mapped
to specific prompt IDs on 2026-05-04. This is the first reviewer's input;
Michael's review (still in progress as of 2026-05-04 lunchtime) will be
reconciled into a final keep / regenerate / discard list when it lands.

## Raf's notes mapped to library IDs

47 of 48 mentions matched cleanly; 1 unmapped (left as TODO at the bottom).
42 unique prompt IDs flagged.

| Raf's note | ID | Title | Section |
|---|---|---|---|
| 01 Lake (hero) | #4 | Lake Lugano, first light | 01-brand-heroes |
| 02 Monaco balcony | #6 | Monaco balcony, 17:30 | 01-brand-heroes |
| 02 Mustique hammock | #9 | Mustique veranda | 01-brand-heroes |
| 02 Dressing | #14 | Dressing room before departure | 02-london |
| 03 Farnborough apron | #19 | Farnborough, first light | 02-london |
| 03 Mews threshold | #12 | Mews doorway, rain | 02-london |
| 03 Alpine shoulder | #33 | Crossing shoulder, wool cuff | 03-lugano-ticino |
| 03 Boat still | #25 | Villa terrace, 06:45 | 03-lugano-ticino |
| 03 Lake jetty | #27 | Lake jetty, morning mist | 03-lugano-ticino |
| 03 Mendrisio vineyard | #30 | Mendrisiotto vineyard | 03-lugano-ticino |
| 03 Villa terrace dawn | #25 | Villa terrace, 06:45 | 03-lugano-ticino |
| 04 Skihall | #38 | Skis by the door | 04-gstaad-alpine |
| 05 Gstaad fireplace | #5 | Chalet morning, Gstaad | 01-brand-heroes |
| 05 Ski stall macro | #46 | Ski bag, threshold | 04-gstaad-alpine |
| 05 Sunset lake afternoon | #136 | Wide-board oak floor | 12-textures-ambient-arrivals |
| 05 Cap Ferrat terrace | #50 | Cap Ferrat terrace | 05-monaco-cote-dazur |
| 05 Monaco balcony 17h | #6 | Monaco balcony, 17:30 | 01-brand-heroes |
| 05 Harbour mist | #54 | Car at the curb, harbour road | 05-monaco-cote-dazur |
| 06 Linen curtain | #62 | Linen curtain, breath of wind | 06-mediterranean-islands |
| 07 Island garden stone | #71 | Garden stone, morning | 06-mediterranean-islands |
| 07 Mustique hand railing | #9 | Mustique veranda | 01-brand-heroes |
| 07 Mykonos threshold | #7 | Mykonos, white and teal | 01-brand-heroes |
| 07 Lavender restrained | #74 | Lavender field, restrained | 07-provence-countryside |
| 07 Vineyard morning | #80 | Vineyard morning | 07-provence-countryside |
| 07 Tuscany villa | #76 | Tuscan loggia | 07-provence-countryside |
| 07 Bahamas dock | #85 | Quiet dock, Bahamas | 08-caribbean-transatlantic |
| 07 Barbados garden | #88 | Walled garden, morning | 08-caribbean-transatlantic |
| 08 NYC pied-à-terre | #84 | New York pied-à-terre, morning | 08-caribbean-transatlantic |
| 08 Caribbean veranda | #83 | Caribbean veranda, 18:00 | 08-caribbean-transatlantic |
| 09 Bedroom first light | #95 | Bedroom, first light | 09-domestic-interiors |
| 09 Kitchen late | #100 | Kitchen, late return | 09-domestic-interiors |
| 10 Salon breakfast late | #118 | Mid-flight breakfast | 10-cabin-stills |
| 10 Galley detail | #115 | Galley detail, crew-set | 10-cabin-stills |
| 10 Stairs runner | #24 | Stairwell, afternoon | 02-london |
| 11 Stateroom bed | #112 | Stateroom, turned down | 10-cabin-stills |
| 11 Forearm railing alpine | #129 | Forearm, alpine rail | 11-hands-and-vignettes |
| 11 Hand harbour rope | #128 | Hand on mooring rope | 11-hands-and-vignettes |
| 11 Stone balustrade | #119 | Hand on stone, lake | 11-hands-and-vignettes |
| 12 Ambient rope first light | #137 | Alpine first light | 12-textures-ambient-arrivals |
| 13 Cabin empty ready | #3 | Aviation, arranged | 01-brand-heroes |
| 13 Lugano dock | #25 | Villa terrace, 06:45 | 03-lugano-ticino |
| 13 Island door | #7 | Mykonos, white and teal | 01-brand-heroes |
| 13 Milan / Mayfair-coded study | #158 | Mayfair-coded study with Linate haze | 13-milan-english-speaker-city |
| 13 Como villa terrace | #154 | Lake Como villa terrace, 06:45 | 13-milan-english-speaker-city |
| 13 Linate FBO first light | #151 | Linate FBO, first light | 13-milan-english-speaker-city |
| 13 Navigli first light | #156 | Navigli reflection, first light | 13-milan-english-speaker-city |
| 13 Quadrilatero dusk | #155 | Quadrilatero d'Oro, late autumn dusk | 13-milan-english-speaker-city |

## Currently unmapped

| Raf's note | Possible match | Action |
|---|---|---|
| 07 Mediterranean pool stone | None obvious in §6 or §7 | Confirm with Raf — may be a scene that doesn't yet exist in the library, or a different name for an existing one. |

## How this slots into the live site

Of the 42 unique IDs Raf flagged, several already happen to be wired
to typed-export slots in `src/brand/imagery.ts`:

- **#3 Aviation arranged** → already `PAGE_HEROES.home` (the home hero)
- **#4 Lake Lugano first light** → already `THREE_CITIES.lugano` and `ABOUT_SCENES.parcoCiani` and `SEASONAL_BANK.newYearFirstLight`
- **#5 Chalet morning Gstaad** → already `SEASONAL_BANK.winterHearth`
- **#6 Monaco balcony** → not yet in a typed slot — Raf flagged it twice; consider promoting to a `SEASONAL_BANK` slot
- **#7 Mykonos white and teal** → not yet in a typed slot; could go on a destinations card
- **#9 Mustique veranda** → already `SEASONAL_BANK.midsummerTerrace`
- **#19 Farnborough first light** → already `THREE_CITIES.london`
- **#25 Villa terrace, 06:45** → already `SERVICES_SCENES.travelEvents`
- **#46 Ski bag threshold** → already `SERVICES_SCENES.relocations`
- **#106 Seat belt folded** → already `SERVICES_SCENES.corporate`
- **#112 Stateroom turned down** → already `SEASONAL_BANK.returningHome`
- **#114 Member desk mid-flight** → already `SERVICES_SCENES.aviation`
- **#117 Ski bag at threshold** → already `PAGE_HEROES.destinations`
- **#119 Hand on stone, lake** → already `ABOUT_SCENES.team`
- **#151 Linate FBO** → already `THREE_CITIES.milan`
- **#154 Lake Como villa terrace** → already `HOME_EDITORIAL.two`
- **#156 Navigli reflection** → already `ABOUT_SCENES.founding2013`
- **#158 Mayfair-coded study** → not yet in a typed slot; strong Milan candidate

## Open questions awaiting Michael's review

1. The slots Raf hasn't called out — were they neutral, or did he
   actively dislike any? Michael's CSV will help triangulate.
2. For prompts that don't yet appear on the live site (library reserve),
   should we promote the strongest ones into typed-export slots, or keep
   them as a deeper bench for editorial future use?
3. The unmapped "Mediterranean pool stone" — confirm with Raf which
   scene he meant.

## Source

Raf's list received 2026-05-04 from J-P. Parsed by fuzzy-matching
against `brand-assets/scripts/prompts.py` (162 prompts, 13 sections).
Confidence threshold: matches needed a relevance score ≥ 50 to count.
Two matches with comparatively low confidence — "05 Sunset lake
afternoon → #136 Wide-board oak floor" — are the best library has;
worth confirming with Raf.
