import { Link } from "react-router-dom";
import { MapPin, ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { BrandImage } from "@/components/brand/BrandImage";
import { PAGE_HEROES, byId, SEASONAL_BANK } from "@/brand/imagery";
import { cn } from "@/lib/utils";
import { useDocumentMeta, canonical, ORGANIZATION_JSONLD } from "@/lib/useDocumentMeta";

/**
 * U-Calm Aviation — Destinations page.
 *
 * Pattern adopted from Ascent's Destinations.tsx on 2026-05-03 per J-P's
 * benchmark direction. Four featured destinations as cards, then a wider
 * gallery drawn from the imagery library, then a closing CTA card.
 *
 * The four featured destinations chosen here align with U-Calm Aviation's
 * core geography and the Three Cities (Lugano/Milan/London) emphasis on Home:
 *   - Lugano — desk base, signature Alpine + Mediterranean access
 *   - St. Moritz — flagship Alpine destination
 *   - London — U-CALM concierge house reach
 *   - Monaco — flagship Mediterranean destination
 */
const FEATURED_DESTINATIONS = [
  {
    name: "Lugano",
    country: "Switzerland",
    description:
      "The desk's base and the only Swiss city with a private FBO inside its own valley. Direct light- and mid-jet access from London, Paris, Frankfurt, Madrid; helicopter into the lake-side residences of Castagnola and Morcote in the same hour.",
    highlights: [
      "Lugano-Agno (LSZA) — slot-restricted, locally arranged",
      "Helicopter to St. Moritz, Verbier, Lake Como",
      "U-CALM preferred properties on the lake",
      "Four-language ground in 30 minutes",
    ],
    imageId: 25, // Villa terrace, 06:45 — Raf must-keep, residence on Lugano lake. Replaces #3 (empty cabin, not Lugano).
  },
  {
    name: "London",
    country: "United Kingdom",
    description:
      "Held through the U-CALM concierge house's broader reach. Farnborough and London City handle most member arrivals; Biggin Hill for short-notice; Luton when the cabin scale or helicopter shuttle to the heliport requires it.",
    highlights: [
      "Farnborough, London City, Biggin Hill, Luton",
      "Mayfair concierge integration via U-CALM",
      "Helicopter into Battersea on request",
      "Same-day return windows held",
    ],
    imageId: 23, // §2 Garden window, cloud-morning — London townhouse register, no figures. Replaces #11 Knightsbridge hall (background figure issue).
  },
  {
    name: "St. Moritz",
    country: "Switzerland",
    description:
      "Samedan (LSZS) is the highest aerodrome in Europe and one of the most weather-sensitive. The desk monitors the field daily through the winter season and arranges the helicopter back-up routinely. Cars, chalet, and table held for arrival.",
    highlights: [
      "Samedan (LSZS) — winter-season specialist coverage",
      "Helicopter back-up from Lugano or Zurich",
      "Engadin chalet network",
      "Restaurant tables held under member preference",
    ],
    imageId: 43, // St Moritz lake, 16:00 — literal city match. Replaces #5 (Chalet morning, GSTAAD — wrong city).
  },
  {
    name: "Monaco",
    country: "Principality",
    description:
      "Nice (LFMN) is the operational airport; Monaco itself is helicopter-served via Heli Air Monaco from Nice in seven minutes. The desk holds the helicopter-shuttle, FBO car, and Monte-Carlo arrival end-to-end.",
    highlights: [
      "Nice Côte d'Azur (LFMN) FBO arrangements",
      "Helicopter shuttle to Monte-Carlo",
      "Yachting calendar coordination",
      "Grand Prix and Yacht Show specialist coverage",
    ],
    imageId: 49, // Monte Carlo balcony — direct Monaco-place. Replaces #8 (cabin window, not Monaco).
  },
  // Doubled 2026-05-05 — 4 → 8 to reflect breadth of an aviation desk.
  // Geographic spread: Switzerland ×2, UK, Riviera, Italian, Aegean,
  // Caribbean, Balearic. Each picks a Raf-must-keep where one exists.
  {
    name: "Mykonos",
    country: "Greece",
    description:
      "Mykonos (JMK) is one of the Aegean's busiest private fields through the summer season. We hold the slot, the marina dispatch, the villa coordination, and the early-evening table — quietly, away from the centre.",
    highlights: [
      "Mykonos JMK — Aegean-season slot specialism",
      "Cycladic villa network on the western coast",
      "Yacht and tender coordination",
      "Restaurant continuity at the quieter coves",
    ],
    imageId: 7, // §1 Mykonos, white and teal — Raf must-keep (flagged twice).
  },
  {
    name: "Tuscany",
    country: "Italy",
    description:
      "Florence (FLR) and Pisa (PSA) handle most arrivals; Forte dei Marmi via the Versilia coast for the summer house, Lucca and Siena for the slower stay. The villa, the driver, the trattoria the family already knows — all on the same itinerary.",
    highlights: [
      "Florence FLR, Pisa PSA, Olbia for Costa Smeralda crossings",
      "Villa network in Chianti, Forte dei Marmi, Argentario",
      "Helicopter into the cypress hills",
      "Restaurant continuity across multi-week stays",
    ],
    imageId: 76, // §7 Tuscan loggia — Raf must-keep.
  },
  {
    name: "Mustique",
    country: "St. Vincent & the Grenadines",
    description:
      "The island operates by introduction; aircraft are received at St. Vincent (SVD) with helicopter shuttle directly into Mustique. The desk coordinates the arrival, the villa, and the cricket-pitch supper with the same cadence we hold for an alpine arrival.",
    highlights: [
      "St. Vincent SVD with helicopter shuttle into Mustique",
      "Villa coordination via the Mustique Company",
      "Boat charter and reef expertise",
      "Cricket pitch and beach-dinner held",
    ],
    imageId: 83, // §8 Caribbean veranda, 18:00 — Raf must-keep. Reserves #9 Mustique veranda for SEASONAL_BANK.midsummerTerrace and ServiceDetail body.
  },
  {
    name: "Ibiza",
    country: "Spain (Balearic Islands)",
    description:
      "Ibiza (IBZ) is one of the Mediterranean's busier private fields in summer; we hold the slot, the rural finca on the quieter north coast, and the Formentera day-trips. Discretion at every stage.",
    highlights: [
      "Ibiza IBZ — peak-season slot management",
      "Rural finca network on the north coast",
      "Boat charter and Formentera day-trips",
      "Quiet-side itinerary, away from San Antonio",
    ],
    imageId: 59, // §6 Ibiza finca, 17:30 — direct destination match.
  },
];

// Gallery — "moments of arrival" across destination sections. Re-curated
// 2026-05-05: dropped §1/§2 aviation-and-London hardcoded picks (#1, #6,
// #9, #10, #13–#20) which duplicated typed slots and tilted the gallery
// toward operational/aviation rather than destinations. Replaced with
// destination-section picks (Lugano, Alpine, Monaco/Côte d'Azur,
// Mediterranean Islands, Provence/Tuscany, Caribbean) — most flagged by
// Raf. Trailing seasonal-bank IDs add textural variety.
const GALLERY_IDS = [
  27, // Lake jetty, morning mist — Raf must-keep, Lugano-Ticino
  30, // Mendrisiotto vineyard — Raf must-keep
  38, // Skis by the door — Raf must-keep, alpine
  50, // Cap Ferrat terrace — Raf must-keep, Côte d'Azur
  54, // Car at the curb, harbour road — Raf must-keep, Monaco
  61, // Cycladic stair — Mediterranean Islands
  66, // Mykonos jetty, stillness — Mediterranean Islands
  74, // Lavender field, restrained — Raf must-keep, Provence
  76, // Tuscan loggia — Raf must-keep
  80, // Vineyard morning — Raf must-keep
  84, // New York pied-à-terre, morning — Raf must-keep, North America representation
  85, // Quiet dock, Bahamas — Raf must-keep
  88, // Walled garden, Barbados — Raf must-keep
  67, // Hand on railing, salt air — Mediterranean coastal vignette
  SEASONAL_BANK.springMagnolia,    // §6 Garden stone, morning
  SEASONAL_BANK.summerBlueHour,    // §12 Mediterranean late sun
  SEASONAL_BANK.autumnCatChair,    // §12 Walnut grain, lamplit
  SEASONAL_BANK.winterHearth,      // §1 Chalet morning, Gstaad
  SEASONAL_BANK.midsummerTerrace,  // §1 Mustique veranda
  SEASONAL_BANK.autumnLurcherWalk, // §7 Single oak, shadow long
];
// 20 images = 5 even rows on the lg 4-column grid (no orphans on last row).

const Destinations = () => {
  useDocumentMeta({
    title: "Destinations — Twelve regions, two-hundred-plus places | U-Calm Aviation",
    description:
      "Lugano, London, St. Moritz, Monaco — held in deepest detail. Twelve regional desks covering Switzerland, France, Italy, UK, Iberia, Greece, the Mediterranean, Central Europe, the Middle East, North America, the Caribbean, Asia, and beyond. Aircraft can land almost anywhere; the work is in what happens once the door opens.",
    canonical: canonical("/destinations"),
    jsonLd: [
      ORGANIZATION_JSONLD,
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://u-calmaviation.com/" },
          { "@type": "ListItem", position: 2, name: "Destinations", item: "https://u-calmaviation.com/destinations" },
        ],
      },
    ],
  });

  // Filter to only valid IDs that exist in the brand library
  const galleryImages = GALLERY_IDS.flatMap((id) => {
    try {
      return [byId(id)];
    } catch {
      return [];
    }
  });

  return (
    <>
      {/* Hero */}
      <section className="relative">
        <div className="absolute inset-0 overflow-hidden">
          <BrandImage id={PAGE_HEROES.destinations} priority className="w-full h-full object-cover" />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-overlay" />
        </div>
        <div className="relative container min-h-[55vh] flex flex-col justify-end py-20">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-champagne">
            Where we operate
          </p>
          <h1 className="mt-3 font-serif text-4xl md:text-6xl font-light text-background">
            Held in detail. Held everywhere.
          </h1>
          <p className="mt-6 text-lg text-background/90 max-w-2xl">
            Aircraft can land almost anywhere. The work is in what happens once the door opens. These are the places our destination-management desk holds in the highest detail; many other destinations, of course, are arranged with the same care on request.
          </p>
        </div>
      </section>

      {/* Featured destinations — selection of the places we hold in deepest detail.
          Title intentionally avoids quoting the count of cards (was "Four places…")
          so that growing or shrinking FEATURED_DESTINATIONS doesn't leave the
          headline stale. The brand stance is: aircraft can land almost anywhere —
          this section is a *selection*, not an exhaustive catalogue. */}
      <section className="bg-background">
        <div className="container py-20">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">
            Featured destinations
          </p>
          <h2 className="mt-3 font-serif text-3xl md:text-4xl font-normal text-foreground">
            Some of the places we hold in deepest detail.
          </h2>
          <p className="mt-4 text-foreground/85 leading-relaxed max-w-2xl">
            A small selection of the destinations the desk holds in the highest detail. Many more sit in the file alongside them; aircraft can land almost anywhere, and our destination desk follows.
          </p>

          <div className="mt-12 grid lg:grid-cols-2 gap-8">
            {FEATURED_DESTINATIONS.map((dest) => (
              <article
                key={dest.name}
                className="group rounded-lg overflow-hidden border border-border bg-card shadow-whisper hover:shadow-lg transition-shadow"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <BrandImage
                    id={dest.imageId}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(28,43,58,0) 35%, rgba(28,43,58,0.75) 100%)",
                    }}
                    aria-hidden="true"
                  />
                  <div className="absolute bottom-5 left-6 right-6">
                    <div className="flex items-center gap-2 mb-2 text-champagne">
                      <MapPin className="h-4 w-4" />
                      <span className="text-xs font-bold uppercase tracking-[0.15em]">
                        {dest.country}
                      </span>
                    </div>
                    <h3 className="font-serif text-3xl text-background">{dest.name}</h3>
                  </div>
                </div>

                <div className="p-8">
                  <p className="text-foreground/85 leading-relaxed">{dest.description}</p>

                  <div className="mt-6">
                    <p className="text-xs font-bold uppercase tracking-[0.15em] text-primary-deep mb-3">
                      What we hold for the day
                    </p>
                    <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-2">
                      {dest.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-2 text-sm text-foreground/80">
                          <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-champagne mt-1.5" />
                          <span className="leading-snug">{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Regional view — 12 regional cards */}
      <section className="bg-linen">
        <div className="container py-20">
          <div className="max-w-2xl mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">
              The wider picture
            </p>
            <h2 className="mt-3 font-serif text-3xl md:text-4xl font-normal text-foreground">
              Twelve regions, two-hundred-plus places.
            </h2>
            <p className="mt-6 text-foreground/85 leading-relaxed">
              The destination desk is structured by region, with named local fixers in every signature destination and named partner desks for the further-afield places. The regional view below is illustrative; many other destinations sit in the file.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                region: "Switzerland",
                places:
                  "Lugano · Geneva · Zurich · Bern · Basel · Sion · Samedan (St. Moritz) · St. Moritz · Verbier · Gstaad · Zermatt · Klosters · Davos · Crans-Montana · Andermatt · Engelberg · Lucerne · Interlaken · Lausanne · Montreux",
              },
              {
                region: "France & Monaco",
                places:
                  "Paris (Le Bourget) · Nice · Cannes · Monaco · Saint-Tropez · Antibes · Cap Ferrat · Megève · Courchevel · Méribel · Val d'Isère · Chamonix · Avoriaz · Lyon · Bordeaux · Biarritz · Deauville · Aix-en-Provence · Cap d'Antibes · Île de Ré",
              },
              {
                region: "Italy",
                places:
                  "Milan (Linate, Malpensa) · Rome (Ciampino) · Florence · Venice · Naples · Olbia (Costa Smeralda) · Cagliari · Capri · Ischia · Portofino · Forte dei Marmi · Lake Como · Lake Maggiore · Lake Garda · Bologna · Verona · Turin · Palermo · Catania · Bari · Cortina d'Ampezzo",
              },
              {
                region: "United Kingdom & Ireland",
                places:
                  "London (City, Farnborough, Biggin Hill, Luton) · Oxford · the Cotswolds · Edinburgh · Glasgow · the Highlands · the Hebrides · Manchester · Birmingham · Bristol · Jersey · Guernsey · Dublin · Shannon · Belfast · the Lake District · Cornwall",
              },
              {
                region: "Iberia & Atlantic Islands",
                places:
                  "Madrid · Barcelona · Marbella (Málaga) · Valencia · Seville · Bilbao · Mallorca · Menorca · Ibiza · Formentera · Lisbon · Porto · Faro · Cascais · Madeira · the Azores · Tenerife · Lanzarote",
              },
              {
                region: "Greece, Cyprus & Eastern Med",
                places:
                  "Athens · Mykonos · Santorini · Paros · Antiparos · Skiathos · Corfu · Rhodes · Crete · Hydra · Sifnos · Halkidiki · Limassol · Larnaca · Bodrum · Antalya · Istanbul",
              },
              {
                region: "Adriatic & Central Europe",
                places:
                  "Vienna · Salzburg · Innsbruck · Kitzbühel · Munich · Frankfurt · Berlin · Hamburg · Düsseldorf · Prague · Budapest · Hvar · Split · Dubrovnik · Tivat · Ljubljana · Krakow · Warsaw",
              },
              {
                region: "North Africa & Middle East",
                places:
                  "Marrakech · Casablanca · Rabat · Tangier · Tunis · Cairo · Sharm el-Sheikh · Dubai · Abu Dhabi · Doha · Riyadh · Jeddah · Muscat · Tel Aviv · Amman · Beirut",
              },
              {
                region: "North America",
                places:
                  "New York (Teterboro, Westchester) · Boston · Washington · Miami · Palm Beach · Aspen · Vail · Telluride · Sun Valley · Los Angeles (Van Nuys) · San Francisco · Las Vegas · Toronto · Montreal · Vancouver",
              },
              {
                region: "Caribbean & Latin America",
                places:
                  "St. Barth's · Antigua · Barbados · St. Lucia · Mustique · Anguilla · Turks & Caicos · Nassau · Cabo San Lucas · Mexico City · Punta Cana · Bermuda · Cartagena · São Paulo · Rio de Janeiro · Buenos Aires",
              },
              {
                region: "Asia & Indian Ocean",
                places:
                  "Singapore · Hong Kong · Tokyo · Shanghai · Bangkok · Phuket · Bali · Hanoi · Seoul · Mumbai · Delhi · the Maldives · Mauritius · Seychelles · Sri Lanka",
              },
              {
                region: "Further afield",
                places:
                  "Sydney · Melbourne · Auckland · Cape Town · Mahé · the Antarctic gateway via Punta Arenas — arranged through named partner desks, on extended lead times.",
              },
            ].map((row) => (
              <article key={row.region} className="rounded-lg border border-border bg-card p-6 shadow-whisper">
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-primary-deep">
                  {row.region}
                </p>
                <p className="mt-3 font-serif text-foreground/85 leading-relaxed">{row.places}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Image gallery — quiet visual band */}
      <section className="bg-background">
        <div className="container py-20">
          <div className="max-w-2xl mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">
              Moments held
            </p>
            <h2 className="mt-3 font-serif text-3xl md:text-4xl font-normal text-foreground">
              Some of what arrival looks like.
            </h2>
            <p className="mt-6 text-foreground/85 leading-relaxed">
              The desk's photography is editorial, never staged. The images below are drawn from the U-CALM brand library and are illustrative of the rhythm of an arrangement, not specific to any one member.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {galleryImages.map((image) => (
              <figure
                key={image.id}
                className="group relative overflow-hidden rounded-md aspect-[4/5] bg-muted"
              >
                <BrandImage
                  id={image.id}
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(28,43,58,0) 45%, rgba(28,43,58,0.85) 100%)",
                  }}
                  aria-hidden="true"
                />
                <figcaption className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="font-serif text-sm md:text-base text-background leading-tight">
                    {image.title}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-foreground text-background">
        <div className="container py-20 max-w-3xl mx-auto text-center">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-champagne">
            Discuss a destination
          </p>
          <h2 className="mt-4 font-serif text-3xl md:text-4xl font-light">
            Somewhere not on the list?
          </h2>
          <p className="mt-6 text-background/85 leading-relaxed">
            The signature destinations are the places we hold in deepest detail. Anywhere else is arranged with the same care, on request — through named partner desks where it makes sense, directly when the file already holds the local knowledge.
          </p>
          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <Link
              to="/contact"
              className={cn(
                buttonVariants({ size: "lg" }),
                "rounded-full bg-primary hover:bg-primary-hero text-primary-foreground shadow-lg",
              )}
            >
              Speak with your concierge
            </Link>
            <Link
              to="/services"
              className={cn(
                buttonVariants({ size: "lg" }),
                "rounded-full bg-champagne hover:bg-champagne/90 text-foreground shadow-lg",
              )}
            >
              See the catalogue
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Destinations;
