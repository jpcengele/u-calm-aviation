import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
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
 * benchmark direction. Eight featured destinations as cards, then a wider
 * gallery drawn from the imagery library, then a closing CTA card.
 *
 * After the i18n refactor (2026-05-07), the FEATURED_DESTINATIONS and
 * regional listing copy lives under `destinations.featured.*` and
 * `destinations.regional.rows.*` in the locale files. This module
 * holds only the structural data: i18n key + image id for featured,
 * i18n key for regional rows.
 *
 * The eight featured destinations align with U-Calm Aviation's core
 * geography (Switzerland ×2, UK, Riviera, Italian, Aegean, Caribbean,
 * Balearic). Image IDs are picked from the brand library — Raf
 * must-keeps and Michael "lovely"-flagged scenes where available.
 */
const FEATURED_DESTINATIONS = [
  // Picks documented inline at site of selection (image library audit
  // 2026-05-05).
  { i18nKey: "lugano", imageId: 25 }, // Villa terrace, 06:45 — Raf must-keep, residence on Lugano lake.
  { i18nKey: "london", imageId: 23 }, // §2 Garden window, cloud-morning — London townhouse register, no figures.
  { i18nKey: "stMoritz", imageId: 37 }, // §4 Gstaad window, snow — Michael "Lovely". Generic alpine winter through window.
  { i18nKey: "monaco", imageId: 49 }, // Monte Carlo balcony — direct Monaco place.
  { i18nKey: "mykonos", imageId: 60 }, // §6 Mykonos threshold, open door — Michael "Also perfect".
  { i18nKey: "tuscany", imageId: 76 }, // §7 Tuscan loggia — Raf must-keep.
  { i18nKey: "mustique", imageId: 83 }, // §8 Caribbean veranda, 18:00 — Raf must-keep.
  { i18nKey: "ibiza", imageId: 59 }, // §6 Ibiza finca, 17:30 — direct destination match.
] as const;

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

const REGIONAL_KEYS = [
  "switzerland",
  "franceMonaco",
  "italy",
  "ukIreland",
  "iberia",
  "greece",
  "adriatic",
  "africaMiddleEast",
  "northAmerica",
  "caribbean",
  "asia",
  "furtherAfield",
] as const;

const Destinations = () => {
  const { t } = useTranslation();
  useDocumentMeta({
    title: t("destinations.meta.title"),
    description: t("destinations.meta.description"),
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
            {t("destinations.hero.eyebrow")}
          </p>
          <h1 className="mt-3 font-serif text-4xl md:text-6xl font-light text-background">
            {t("destinations.hero.headline")}
          </h1>
          <p className="mt-6 text-lg text-background/90 max-w-2xl">
            {t("destinations.hero.body")}
          </p>
        </div>
      </section>

      {/* Featured destinations */}
      <section className="bg-background">
        <div className="container py-20">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">
            {t("destinations.featured.eyebrow")}
          </p>
          <h2 className="mt-3 font-serif text-3xl md:text-4xl font-normal text-foreground">
            {t("destinations.featured.headline")}
          </h2>
          <p className="mt-4 text-foreground/85 leading-relaxed max-w-2xl">
            {t("destinations.featured.intro")}
          </p>

          <div className="mt-12 grid lg:grid-cols-2 gap-8">
            {FEATURED_DESTINATIONS.map((dest) => {
              const highlights = t(`destinations.featured.${dest.i18nKey}.highlights`, {
                returnObjects: true,
              }) as string[];
              return (
                <article
                  key={dest.i18nKey}
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
                          {t(`destinations.featured.${dest.i18nKey}.country`)}
                        </span>
                      </div>
                      <h3 className="font-serif text-3xl text-background">
                        {t(`destinations.featured.${dest.i18nKey}.name`)}
                      </h3>
                    </div>
                  </div>

                  <div className="p-8">
                    <p className="text-foreground/85 leading-relaxed">
                      {t(`destinations.featured.${dest.i18nKey}.description`)}
                    </p>

                    <div className="mt-6">
                      <p className="text-xs font-bold uppercase tracking-[0.15em] text-primary-deep mb-3">
                        {t("destinations.featured.highlightsLabel")}
                      </p>
                      <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-2">
                        {highlights.map((h) => (
                          <li key={h} className="flex items-start gap-2 text-sm text-foreground/80">
                            <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-champagne mt-1.5" />
                            <span className="leading-snug">{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Regional view — 12 regional cards */}
      <section className="bg-linen">
        <div className="container py-20">
          <div className="max-w-2xl mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">
              {t("destinations.regional.eyebrow")}
            </p>
            <h2 className="mt-3 font-serif text-3xl md:text-4xl font-normal text-foreground">
              {t("destinations.regional.headline")}
            </h2>
            <p className="mt-6 text-foreground/85 leading-relaxed">
              {t("destinations.regional.intro")}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {REGIONAL_KEYS.map((key) => (
              <article key={key} className="rounded-lg border border-border bg-card p-6 shadow-whisper">
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-primary-deep">
                  {t(`destinations.regional.rows.${key}.region`)}
                </p>
                <p className="mt-3 font-serif text-foreground/85 leading-relaxed">
                  {t(`destinations.regional.rows.${key}.places`)}
                </p>
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
              {t("destinations.gallery.eyebrow")}
            </p>
            <h2 className="mt-3 font-serif text-3xl md:text-4xl font-normal text-foreground">
              {t("destinations.gallery.headline")}
            </h2>
            <p className="mt-6 text-foreground/85 leading-relaxed">
              {t("destinations.gallery.intro")}
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
            {t("destinations.closing.eyebrow")}
          </p>
          <h2 className="mt-4 font-serif text-3xl md:text-4xl font-light">
            {t("destinations.closing.headline")}
          </h2>
          <p className="mt-6 text-background/85 leading-relaxed">
            {t("destinations.closing.body")}
          </p>
          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <Link
              to="/contact"
              className={cn(
                buttonVariants({ size: "lg" }),
                "rounded-full bg-primary hover:bg-primary-hero text-primary-foreground shadow-lg",
              )}
            >
              {t("cta.speakSpecialist")}
            </Link>
            <Link
              to="/services"
              className={cn(
                buttonVariants({ size: "lg" }),
                "rounded-full bg-champagne hover:bg-champagne/90 text-foreground shadow-lg",
              )}
            >
              {t("cta.seeCatalogue")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Destinations;
