import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ArrowRight,
  UserCheck,
  Clock3,
  Globe2,
  ShieldCheck,
  Languages,
  Receipt,
  type LucideIcon,
} from "lucide-react";
import { BrandImage } from "@/components/brand/BrandImage";
import { HeroVideo } from "@/components/brand/HeroVideo";
import {
  PAGE_HEROES,
  HOME_EDITORIAL,
  THREE_CITIES,
  SEASONAL_BANK,
  SERVICES_SCENES,
} from "@/brand/imagery";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SERVICES } from "@/lib/services-data";
import {
  useDocumentMeta,
  canonical,
  ORGANIZATION_JSONLD,
  LOCALBUSINESS_JSONLD,
} from "@/lib/useDocumentMeta";

/**
 * U-Calm Aviation — Home.
 *
 * Per Brand Book v2.1 + 2026-05-03 Ascent benchmark direction.
 *
 * Sections (top to bottom):
 *   1. Hero — full-bleed video + double CTA + 4-number proof strip
 *   2. The continuity proposition (editorial pair)
 *   3. Three Cities — Lugano · Milan · London
 *   4. How a journey is held — 4-stage operational arc
 *   5. Six service cards — links to /services/:slug detail pages
 *   6. Why us — 6-icon grid
 *   7. Standards held — short narrative reinforcement
 *   8. Destinations preview — 4-card link to /destinations
 *   9. Quiet questions — restrained 6-item FAQ
 *  10. Closing soul + CTA
 *
 * After the i18n refactor (2026-05-07), all copy is sourced through
 * `t()` calls into `home.*`. The structural arrays below hold only the
 * Lucide icon references and i18n key suffixes; copy lives in
 * `src/i18n/locales/<lng>.json`.
 */

const WHY_ITEMS: ReadonlyArray<{ Icon: LucideIcon; key: string }> = [
  { Icon: UserCheck, key: "namedSpecialist" },
  { Icon: Clock3, key: "noticeWindow" },
  { Icon: Globe2, key: "destinations" },
  { Icon: ShieldCheck, key: "operators" },
  { Icon: Languages, key: "languages" },
  { Icon: Receipt, key: "billing" },
];

const JOURNEY_STEPS = [
  { key: "step1", number: "01" },
  { key: "step2", number: "02" },
  { key: "step3", number: "03" },
  { key: "step4", number: "04" },
] as const;

const FAQ_KEYS = ["q1", "q2", "q3", "q4", "q5", "q6"] as const;

const Home = () => {
  const { t } = useTranslation();

  // Per-page SEO. The FAQPage block on Home is real schema-valid markup
  // that lets Google show the FAQ rich result for U-Calm Aviation queries.
  // Schema.org items are pulled from the active locale so localized
  // versions of the home page emit localized FAQs to crawlers.
  useDocumentMeta({
    title: t("home.meta.title"),
    description: t("home.meta.description"),
    canonical: canonical("/"),
    jsonLd: [
      ORGANIZATION_JSONLD,
      LOCALBUSINESS_JSONLD,
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "U-Calm Aviation",
        url: "https://u-calmaviation.com",
        inLanguage: ["en", "it", "fr", "de"],
        publisher: { "@id": "https://u-calmaviation.com/#desk" },
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: FAQ_KEYS.map((key) => ({
          "@type": "Question",
          name: t(`home.faq.${key}.q`),
          acceptedAnswer: {
            "@type": "Answer",
            text: t(`home.faq.${key}.a`),
          },
        })),
      },
    ],
  });

  return (
    <>
      {/* 1. Hero */}
      <section className="relative">
        <div className="absolute inset-0 overflow-hidden">
          <HeroVideo
            videoSrc="/brand/hero/cabin-window-cumulus.mp4"
            posterImageId={PAGE_HEROES.home}
            className="w-full h-full object-cover"
            alt={t("home.hero.videoAlt")}
          />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-overlay" />
        </div>

        <div className="relative container min-h-[88vh] flex flex-col justify-end py-24 animate-fade-soft">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-champagne">
            {t("home.hero.eyebrow")}
          </p>
          <h1 className="mt-4 font-serif text-4xl md:text-6xl lg:text-7xl font-light text-background max-w-3xl">
            {t("home.hero.headline")}
          </h1>
          <p className="mt-6 text-lg md:text-xl text-background/90 max-w-2xl">
            {t("home.hero.body")}
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/contact"
              className={cn(
                buttonVariants({ size: "lg" }),
                "rounded-full bg-primary hover:bg-primary-deep text-primary-foreground shadow-lg",
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
              {t("cta.exploreArrangement")}
            </Link>
          </div>

          {/* Hero proof-point strip */}
          <dl className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-3xl border-t border-background/15 pt-8">
            {(["cities", "notice", "destinations", "desk"] as const).map((key) => (
              <div key={key}>
                <dt className="text-[0.7rem] tracking-[0.16em] uppercase text-background/65 mb-1">
                  {t(`home.proof.${key}.label`)}
                </dt>
                <dd className="text-lg md:text-xl font-serif text-background">
                  {t(`home.proof.${key}.value`)}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* 2. The continuity proposition */}
      <section className="bg-linen">
        <div className="container py-24 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <BrandImage
              id={HOME_EDITORIAL.one}
              className="w-full rounded-lg overflow-hidden"
              alt={t("home.continuity.imageAlt1")}
            />
            <BrandImage
              id={HOME_EDITORIAL.two}
              className="w-full rounded-lg overflow-hidden"
              alt={t("home.continuity.imageAlt2")}
            />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">
              {t("home.continuity.eyebrow")}
            </p>
            <h2 className="mt-4 font-serif text-3xl md:text-4xl font-normal text-foreground">
              {t("home.continuity.headline")}
            </h2>
            <p className="mt-6 text-foreground/85 leading-relaxed">
              {t("home.continuity.p1")}
            </p>
            <p className="mt-4 text-foreground/85 leading-relaxed">
              {t("home.continuity.p2")}
            </p>
          </div>
        </div>
      </section>

      {/* 3. Three Cities */}
      <section className="bg-background">
        <div className="container py-24">
          <div className="max-w-2xl mb-16">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">
              {t("home.threeCities.eyebrow")}
            </p>
            <h2 className="mt-4 font-serif text-3xl md:text-4xl font-normal text-foreground">
              {t("home.threeCities.headline")}
            </h2>
            <p className="mt-6 text-foreground/85 leading-relaxed">
              {t("home.threeCities.intro")}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {(["lugano", "milan", "london"] as const).map((city) => (
              <div key={city}>
                <div className="relative overflow-hidden rounded-lg aspect-[4/5] mb-6 shadow-whisper">
                  <BrandImage id={THREE_CITIES[city]} className="w-full h-full object-cover" />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(28,43,58,0) 60%, rgba(28,43,58,0.55) 100%)",
                    }}
                    aria-hidden="true"
                  />
                </div>
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-primary-deep">
                  {t(`home.threeCities.${city}.country`)}
                </p>
                <h3 className="mt-2 font-serif text-2xl md:text-3xl text-foreground">
                  {t(`home.threeCities.${city}.name`)}
                </h3>
                <p className="mt-4 text-foreground/85 leading-relaxed">
                  {t(`home.threeCities.${city}.body`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. How a journey is held */}
      <section className="bg-linen">
        <div className="container py-24">
          <div className="max-w-2xl mb-16">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">
              {t("home.journey.eyebrow")}
            </p>
            <h2 className="mt-4 font-serif text-3xl md:text-4xl font-normal text-foreground">
              {t("home.journey.headline")}
            </h2>
            <p className="mt-6 text-foreground/85 leading-relaxed">
              {t("home.journey.intro")}
            </p>
          </div>

          <ol className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {JOURNEY_STEPS.map(({ key, number }) => (
              <li key={key} className="rounded-lg border border-border bg-card p-8 shadow-whisper">
                <p className="font-serif text-3xl text-primary-deep">{number}</p>
                <h3 className="mt-3 font-serif text-xl text-foreground">
                  {t(`home.journey.${key}.title`)}
                </h3>
                <p className="mt-3 text-sm text-foreground/80 leading-relaxed">
                  {t(`home.journey.${key}.body`)}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 5. Six service cards */}
      <section className="bg-background">
        <div className="container py-24">
          <div className="max-w-2xl mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">
              {t("home.servicesIntro.eyebrow")}
            </p>
            <h2 className="mt-4 font-serif text-3xl md:text-4xl font-normal text-foreground">
              {t("home.servicesIntro.headline")}
            </h2>
            <p className="mt-6 text-foreground/85 leading-relaxed">
              {t("home.servicesIntro.intro")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service) => {
              const Icon = service.icon;
              return (
                <Link
                  key={service.slug}
                  to={`/services/${service.slug}`}
                  className="group rounded-lg border border-border bg-card p-7 shadow-whisper hover:shadow-lg transition-shadow flex flex-col"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon className="h-5 w-5 text-primary-deep" strokeWidth={1.5} />
                    </div>
                    <p className="text-xs font-bold uppercase tracking-[0.15em] text-primary-deep">
                      {t(`services.catalogue.${service.i18nKey}.title`)}
                    </p>
                  </div>
                  <h3 className="font-serif text-xl text-foreground leading-snug">
                    {t(`services.catalogue.${service.i18nKey}.subtitle`)}
                  </h3>
                  <p className="mt-3 text-sm text-foreground/75 leading-relaxed flex-grow">
                    {t(`services.catalogue.${service.i18nKey}.cardDescription`)}
                  </p>
                  <p className="mt-5 inline-flex items-center text-sm text-primary-deep font-medium group-hover:gap-3 gap-2 transition-all">
                    {t("cta.readMore")}
                    <ArrowRight className="h-4 w-4" />
                  </p>
                </Link>
              );
            })}
          </div>

          <div className="mt-12">
            <Link
              to="/services"
              className={cn(
                buttonVariants(),
                "rounded-full bg-primary hover:bg-primary-deep text-primary-foreground",
              )}
            >
              {t("cta.seeCatalogue")}
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Why us */}
      <section className="bg-linen">
        <div className="container py-24">
          <div className="max-w-2xl mb-16">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">
              {t("home.whyUs.eyebrow")}
            </p>
            <h2 className="mt-4 font-serif text-3xl md:text-4xl font-normal text-foreground">
              {t("home.whyUs.headline")}
            </h2>
            <p className="mt-6 text-foreground/85 leading-relaxed">
              {t("home.whyUs.intro")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-12">
            {WHY_ITEMS.map(({ Icon, key }) => (
              <div key={key} className="flex flex-col items-start">
                <Icon className="h-7 w-7 text-primary-deep mb-5" strokeWidth={1.5} aria-hidden="true" />
                <h3 className="font-serif text-xl md:text-2xl text-foreground mb-3">
                  {t(`home.whyUs.${key}.title`)}
                </h3>
                <p className="text-sm md:text-base text-foreground/80 leading-relaxed">
                  {t(`home.whyUs.${key}.body`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Standards held */}
      <section className="relative">
        <div className="absolute inset-0 overflow-hidden">
          <BrandImage id={SERVICES_SCENES.aviation} className="w-full h-full object-cover" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(28,43,58,0.85) 0%, rgba(28,43,58,0.75) 100%)",
            }}
            aria-hidden="true"
          />
        </div>
        <div className="relative container py-24 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-champagne">
            {t("home.standards.eyebrow")}
          </p>
          <h2 className="mt-4 font-serif text-3xl md:text-4xl font-light text-background">
            {t("home.standards.headline")}
          </h2>
          <p className="mt-8 text-background/85 leading-relaxed text-lg">
            {t("home.standards.body")}
          </p>
        </div>
      </section>

      {/* 8. Destinations preview */}
      <section className="bg-background">
        <div className="container py-24">
          <div className="max-w-2xl mb-14">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">
              {t("home.destinationsPreview.eyebrow")}
            </p>
            <h2 className="mt-4 font-serif text-3xl md:text-4xl font-normal text-foreground">
              {t("home.destinationsPreview.headline")}
            </h2>
            <p className="mt-6 text-foreground/85 leading-relaxed">
              {t("home.destinationsPreview.intro")}
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { key: "lugano", id: 25 },
              { key: "stMoritz", id: 37 },
              { key: "london", id: 23 },
              { key: "monaco", id: 49 },
            ].map((d) => (
              <Link
                key={d.key}
                to="/destinations"
                className="group relative overflow-hidden rounded-lg aspect-[4/5] block shadow-whisper hover:shadow-lg transition-shadow"
              >
                <BrandImage
                  id={d.id}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                <div
                  className="absolute inset-0 transition-opacity duration-500"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(28,43,58,0) 35%, rgba(28,43,58,0.75) 100%)",
                  }}
                  aria-hidden="true"
                />
                <div className="absolute bottom-5 left-5 right-5">
                  <p className="text-[0.7rem] tracking-[0.16em] uppercase text-background/75 mb-1">
                    {t(`home.destinationsPreview.${d.key}.country`)}
                  </p>
                  <h3 className="font-serif text-2xl md:text-3xl text-background">
                    {t(`home.destinationsPreview.${d.key}.name`)}
                  </h3>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12">
            <Link
              to="/destinations"
              className="inline-flex items-center gap-2 text-primary-deep font-medium hover:gap-3 transition-all"
            >
              {t("cta.seeAllDestinations")}
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </section>

      {/* 9. Quiet questions */}
      <section className="bg-linen">
        <div className="container py-24 max-w-4xl">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">
            {t("home.faq.eyebrow")}
          </p>
          <h2 className="mt-4 font-serif text-3xl md:text-4xl font-normal text-foreground">
            {t("home.faq.headline")}
          </h2>

          <div className="mt-12 divide-y divide-border">
            {FAQ_KEYS.map((key) => (
              <article key={key} className="py-8">
                <h3 className="font-serif text-xl text-foreground">
                  {t(`home.faq.${key}.q`)}
                </h3>
                <p className="mt-3 text-foreground/85 leading-relaxed">
                  {t(`home.faq.${key}.a`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Closing */}
      <section className="bg-background">
        <div className="container py-24 grid md:grid-cols-2 gap-12 items-center">
          <div className="md:order-2">
            <BrandImage id={SEASONAL_BANK.returningHome} className="w-full rounded-lg overflow-hidden" />
          </div>
          <div className="md:order-1">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">
              {t("home.closing.eyebrow")}
            </p>
            <h2 className="mt-4 font-serif text-3xl md:text-4xl font-normal text-foreground">
              {t("home.closing.headline")}
            </h2>
            <p className="mt-6 text-foreground/85 leading-relaxed">
              {t("home.closing.body")}
            </p>
            <div className="mt-8">
              <Link
                to="/contact"
                className={cn(
                  buttonVariants(),
                  "rounded-full bg-primary hover:bg-primary-deep text-primary-foreground",
                )}
              >
                {t("home.closing.cta")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
