import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { BrandImage } from "@/components/brand/BrandImage";
import { PAGE_HEROES } from "@/brand/imagery";
import { SERVICES } from "@/lib/services-data";
import { cn } from "@/lib/utils";
import { useDocumentMeta, canonical, ORGANIZATION_JSONLD } from "@/lib/useDocumentMeta";

/**
 * U-Calm Aviation — Services index.
 *
 * Six services as cards (Brand Book v2.1 + J-P decision 2026-05-03 to mirror
 * Ascent's service-split). Each card links to /services/:slug for the long-form
 * detail page. Below the grid, two reinforcement bands: Standards held
 * (icon-led 6-reason grid) and Lead times (typical notice windows).
 */
const LEAD_TIME_KEYS = [
  "intraEuropean",
  "transcontinental",
  "groupLift",
  "helicopter",
  "shortNotice",
] as const;

const Services = () => {
  const { t } = useTranslation();
  useDocumentMeta({
    title: t("services.meta.title"),
    description: t("services.meta.description"),
    canonical: canonical("/services"),
    jsonLd: [
      ORGANIZATION_JSONLD,
      {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "U-Calm Aviation Services",
        itemListElement: SERVICES.map((s, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: t(`services.catalogue.${s.i18nKey}.title`),
          url: `https://u-calmaviation.com/services/${s.slug}`,
          description: t(`services.catalogue.${s.i18nKey}.cardDescription`),
        })),
      },
    ],
  });

  return (
    <>
      {/* Hero */}
      <section className="relative">
        <div className="absolute inset-0 overflow-hidden">
          <BrandImage id={PAGE_HEROES.services} priority className="w-full h-full object-cover" />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-overlay" />
        </div>
        <div className="relative container min-h-[60vh] flex flex-col justify-end py-20">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-champagne">
            {t("services.hero.eyebrow")}
          </p>
          <h1 className="mt-3 font-serif text-4xl md:text-6xl font-light text-background">
            {t("services.hero.headline")}
          </h1>
          <p className="mt-6 text-lg text-background/90 max-w-2xl">
            {t("services.hero.body")}
          </p>
        </div>
      </section>

      {/* Six service cards */}
      <section className="bg-background">
        <div className="container py-20">
          <div className="max-w-2xl mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">
              {t("services.intro.eyebrow")}
            </p>
            <h2 className="mt-4 font-serif text-3xl md:text-4xl font-normal text-foreground">
              {t("services.intro.headline")}
            </h2>
            <p className="mt-6 text-foreground/85 leading-relaxed">
              {t("services.intro.body")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service) => {
              const Icon = service.icon;
              const cardFeatures = t(`services.catalogue.${service.i18nKey}.cardFeatures`, {
                returnObjects: true,
              }) as string[];
              return (
                <Link
                  key={service.slug}
                  to={`/services/${service.slug}`}
                  className="group rounded-lg border border-border bg-card p-8 shadow-whisper hover:shadow-lg transition-shadow flex flex-col"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon className="h-5 w-5 text-primary-deep" strokeWidth={1.5} />
                    </div>
                    <p className="text-xs font-bold uppercase tracking-[0.15em] text-primary-deep">
                      {t(`services.catalogue.${service.i18nKey}.title`)}
                    </p>
                  </div>

                  <h3 className="font-serif text-2xl text-foreground">
                    {t(`services.catalogue.${service.i18nKey}.subtitle`)}
                  </h3>
                  <p className="mt-4 text-foreground/80 leading-relaxed text-sm flex-grow">
                    {t(`services.catalogue.${service.i18nKey}.cardDescription`)}
                  </p>

                  <ul className="mt-5 space-y-2">
                    {cardFeatures.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm text-foreground/75">
                        <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-champagne mt-1.5" />
                        <span className="leading-snug">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <p className="mt-6 inline-flex items-center text-sm text-primary-deep font-medium group-hover:gap-3 gap-2 transition-all">
                    {t("cta.readMore")}
                    <ArrowRight className="h-4 w-4" />
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Lead times — typical windows */}
      <section className="bg-linen">
        <div className="container py-20 max-w-4xl">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">
            {t("services.leadTimes.eyebrow")}
          </p>
          <h2 className="mt-4 font-serif text-3xl md:text-4xl font-normal text-foreground">
            {t("services.leadTimes.headline")}
          </h2>
          <p className="mt-6 text-foreground/85 leading-relaxed max-w-3xl">
            {t("services.leadTimes.intro")}
          </p>

          <div className="mt-12 divide-y divide-border">
            {LEAD_TIME_KEYS.map((key) => (
              <div key={key} className="grid grid-cols-1 md:grid-cols-3 gap-4 py-6">
                <p className="font-serif text-lg text-primary-deep md:col-span-1">
                  {t(`services.leadTimes.rows.${key}.label`)}
                </p>
                <p className="text-foreground/85 leading-relaxed md:col-span-2">
                  {t(`services.leadTimes.rows.${key}.body`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA band */}
      <section className="bg-foreground text-background">
        <div className="container py-20 max-w-3xl mx-auto text-center">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-champagne">
            {t("services.closing.eyebrow")}
          </p>
          <h2 className="mt-4 font-serif text-3xl md:text-4xl font-light">
            {t("services.closing.headline")}
          </h2>
          <p className="mt-6 text-background/85 leading-relaxed">
            {t("services.closing.body")}
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
              to="/destinations"
              className={cn(
                buttonVariants({ size: "lg" }),
                "rounded-full bg-champagne hover:bg-champagne/90 text-foreground shadow-lg",
              )}
            >
              {t("cta.whereWeOperate")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
