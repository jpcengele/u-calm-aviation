import { useParams, Link, Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { BrandImage } from "@/components/brand/BrandImage";
import { SERVICES_SCENES, SEASONAL_BANK } from "@/brand/imagery";
import { getService, getRelatedServices } from "@/lib/services-data";
import { cn } from "@/lib/utils";
import { useDocumentMeta, canonical, ORGANIZATION_JSONLD } from "@/lib/useDocumentMeta";

/**
 * U-Calm Aviation — ServiceDetail.
 *
 * One component renders all six service detail pages, keyed by slug.
 * Pattern adopted from Ascent's ServiceDetail.tsx, with two material changes:
 *   1. No published pricing card. Per Brand Book v2.1 founding refusals, we
 *      replace Ascent's right-rail "Pricing" card with a "How to begin" call
 *      to a conversation.
 *   2. Concierge voice throughout — no aviation-marketing register.
 *
 * Copy is resolved through i18n: services-data.ts holds only metadata
 * (slug, icon, imageSlot, i18nKey), and t() looks up the localised
 * strings under `services.catalogue.<i18nKey>.*`.
 */
const ServiceDetail = () => {
  const { t } = useTranslation();
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? getService(slug) : undefined;

  // Resolve copy keys for the active service. When the slug doesn't match a
  // service we still call t() with safe fallback keys to keep hook order
  // stable; the redirect below means the values are never user-visible.
  const titleKey = service ? `services.catalogue.${service.i18nKey}.title` : "";
  const subtitleKey = service ? `services.catalogue.${service.i18nKey}.subtitle` : "";
  const cardDescKey = service ? `services.catalogue.${service.i18nKey}.cardDescription` : "";
  const taglineKey = service ? `services.catalogue.${service.i18nKey}.tagline` : "";
  const longDescKey = service ? `services.catalogue.${service.i18nKey}.longDescription` : "";
  const keyBenefitsKey = service ? `services.catalogue.${service.i18nKey}.keyBenefits` : "";
  const featuresKey = service ? `services.catalogue.${service.i18nKey}.features` : "";
  const howToBeginKey = service ? `services.catalogue.${service.i18nKey}.howToBegin` : "";

  // Hook must be called unconditionally — pass safe defaults when service
  // is undefined.
  useDocumentMeta(
    service
      ? {
          title: `${t(titleKey)} — ${t(subtitleKey).replace(/\.$/, "")} | U-Calm Aviation`,
          description: t(cardDescKey),
          canonical: canonical(`/services/${service.slug}`),
          jsonLd: [
            ORGANIZATION_JSONLD,
            {
              "@context": "https://schema.org",
              "@type": "Service",
              "@id": `https://u-calmaviation.com/services/${service.slug}#service`,
              name: t(titleKey),
              description: t(cardDescKey),
              provider: { "@id": "https://u-calmaviation.com/#desk" },
              serviceType: t(titleKey),
              areaServed: ["Switzerland", "Italy", "United Kingdom", "Worldwide"],
              url: `https://u-calmaviation.com/services/${service.slug}`,
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: "https://u-calmaviation.com/",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Services",
                  item: "https://u-calmaviation.com/services",
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: t(titleKey),
                  item: `https://u-calmaviation.com/services/${service.slug}`,
                },
              ],
            },
          ],
        }
      : {
          title: t("serviceDetail.fallbackMeta.title"),
          description: t("serviceDetail.fallbackMeta.description"),
          canonical: canonical("/services"),
        },
  );

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const Icon = service.icon;
  const heroSlot = SERVICES_SCENES[service.imageSlot];
  const relatedServices = getRelatedServices(service.slug, 3);

  const longDescription = t(longDescKey, { returnObjects: true }) as string[];
  const keyBenefits = t(keyBenefitsKey, { returnObjects: true }) as string[];
  const features = t(featuresKey, { returnObjects: true }) as string[];
  const heldThroughout = t("serviceDetail.heldThroughout.items", {
    returnObjects: true,
  }) as string[];

  return (
    <>
      {/* Hero — full-bleed photograph + champagne icon disc + serif H1 */}
      <section className="relative">
        <div className="absolute inset-0 overflow-hidden">
          <BrandImage id={heroSlot} priority className="w-full h-full object-cover" />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-overlay" />
        </div>
        <div className="relative container min-h-[55vh] flex flex-col justify-end py-20">
          <Link
            to="/services"
            className="inline-flex items-center text-background/85 hover:text-background transition-colors mb-6 text-sm"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t("cta.backToServices")}
          </Link>
          <div className="flex items-center gap-4 mb-3">
            <div className="w-12 h-12 rounded-full bg-champagne flex items-center justify-center shadow-lg">
              <Icon className="h-6 w-6 text-foreground" strokeWidth={1.5} />
            </div>
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-champagne">
              {t(titleKey)}
            </p>
          </div>
          <h1 className="font-serif text-4xl md:text-6xl font-light text-background max-w-3xl">
            {t(subtitleKey)}
          </h1>
          <p className="mt-6 font-serif italic text-lg md:text-xl text-background/90 max-w-2xl">
            {t(taglineKey)}
          </p>
        </div>
      </section>

      {/* Body — 2/3 article + 1/3 sticky "How to begin" card */}
      <section className="bg-background">
        <div className="container py-20">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Long-form */}
            <div className="lg:col-span-2">
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">
                {t("serviceDetail.overview.eyebrow")}
              </p>
              <h2 className="mt-3 font-serif text-3xl md:text-4xl font-normal text-foreground">
                {t("serviceDetail.overview.headline")}
              </h2>
              <div className="mt-8 space-y-6">
                {longDescription.map((para, idx) => (
                  <p key={idx} className="text-foreground/85 leading-relaxed text-lg">
                    {para}
                  </p>
                ))}
              </div>

              {/* Key benefits — checks */}
              <div className="mt-16">
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">
                  {t("serviceDetail.keyBenefits.eyebrow")}
                </p>
                <h3 className="mt-3 font-serif text-2xl md:text-3xl font-normal text-foreground">
                  {t("serviceDetail.keyBenefits.headline")}
                </h3>
                <ul className="mt-8 grid sm:grid-cols-2 gap-4">
                  {keyBenefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                        <Check className="h-4 w-4 text-primary-deep" strokeWidth={2} />
                      </span>
                      <span className="text-foreground/85 leading-relaxed">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Editorial supporting image */}
              <div className="mt-16 relative aspect-[16/9] rounded-lg overflow-hidden shadow-whisper">
                <BrandImage id={SEASONAL_BANK.midsummerTerrace} className="w-full h-full object-cover" />
              </div>

              {/* Features — bullets in cards */}
              <div className="mt-16">
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">
                  {t("serviceDetail.features.eyebrow")}
                </p>
                <h3 className="mt-3 font-serif text-2xl md:text-3xl font-normal text-foreground">
                  {t("serviceDetail.features.headline")}
                </h3>
                <ul className="mt-8 grid md:grid-cols-2 gap-4">
                  {features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="rounded-lg border border-border bg-card p-5 shadow-whisper flex items-start gap-3"
                    >
                      <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-champagne mt-2.5" />
                      <span className="text-sm text-foreground/85 leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sticky right-rail — "How to begin" (replaces Ascent's pricing card) */}
            <div>
              <div className="sticky top-36 md:top-44 rounded-lg border border-border bg-card p-8 shadow-whisper">
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-primary-deep">
                  {t("serviceDetail.howToBegin.eyebrow")}
                </p>
                <h3 className="mt-3 font-serif text-2xl text-foreground">
                  {t("serviceDetail.howToBegin.headline")}
                </h3>
                <p className="mt-4 text-foreground/85 leading-relaxed">{t(howToBeginKey)}</p>

                <div className="mt-8 space-y-3">
                  <Link
                    to="/contact"
                    className={cn(
                      buttonVariants(),
                      "w-full rounded-full bg-primary hover:bg-primary-deep text-primary-foreground",
                    )}
                  >
                    {t("cta.speakSpecialist")}
                  </Link>
                  <Link
                    to="/services"
                    className={cn(
                      buttonVariants({ variant: "outline" }),
                      "w-full rounded-full border-primary text-primary-deep hover:bg-primary-soft",
                    )}
                  >
                    {t("cta.seeAllServices")}
                  </Link>
                </div>

                <div className="mt-8 pt-6 border-t border-border">
                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground mb-4">
                    {t("serviceDetail.heldThroughout.label")}
                  </p>
                  <ul className="space-y-3 text-sm text-foreground/80">
                    {heldThroughout.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-champagne mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related services */}
      <section className="bg-linen">
        <div className="container py-20">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">
            {t("serviceDetail.related.eyebrow")}
          </p>
          <h2 className="mt-3 font-serif text-3xl md:text-4xl font-normal text-foreground">
            {t("serviceDetail.related.headline")}
          </h2>

          <div className="mt-12 grid md:grid-cols-3 gap-8">
            {relatedServices.map((rel) => {
              const RelIcon = rel.icon;
              return (
                <Link
                  key={rel.slug}
                  to={`/services/${rel.slug}`}
                  className="group rounded-lg border border-border bg-card p-8 shadow-whisper hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <RelIcon className="h-5 w-5 text-primary-deep" strokeWidth={1.5} />
                    </div>
                    <h3 className="font-serif text-xl text-foreground">
                      {t(`services.catalogue.${rel.i18nKey}.title`)}
                    </h3>
                  </div>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    {t(`services.catalogue.${rel.i18nKey}.cardDescription`)}
                  </p>
                  <p className="mt-4 inline-flex items-center text-sm text-primary-deep font-medium group-hover:gap-3 gap-2 transition-all">
                    {t("cta.readMore")}
                    <ArrowRight className="h-4 w-4" />
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default ServiceDetail;
