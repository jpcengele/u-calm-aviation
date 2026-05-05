import { useParams, Link, Navigate } from "react-router-dom";
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
 */
const ServiceDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? getService(slug) : undefined;

  // Hook must be called unconditionally — pass safe defaults when service
  // is undefined (the redirect below means those defaults are never user-
  // visible, but they keep the hook order stable across renders).
  useDocumentMeta(
    service
      ? {
          title: `${service.title} — ${service.subtitle.replace(/\.$/, "")} | U-Calm Aviation`,
          description: service.cardDescription,
          canonical: canonical(`/services/${service.slug}`),
          jsonLd: [
            ORGANIZATION_JSONLD,
            {
              "@context": "https://schema.org",
              "@type": "Service",
              "@id": `https://u-calmaviation.com/services/${service.slug}#service`,
              name: service.title,
              description: service.cardDescription,
              provider: { "@id": "https://u-calmaviation.com/#desk" },
              serviceType: service.title,
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
                  name: service.title,
                  item: `https://u-calmaviation.com/services/${service.slug}`,
                },
              ],
            },
          ],
        }
      : {
          title: "Services — U-Calm Aviation",
          description: "Six channels, one concierge.",
          canonical: canonical("/services"),
        },
  );

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const Icon = service.icon;
  const heroSlot = SERVICES_SCENES[service.imageSlot];
  const relatedServices = getRelatedServices(service.slug, 3);

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
            Back to services
          </Link>
          <div className="flex items-center gap-4 mb-3">
            <div className="w-12 h-12 rounded-full bg-champagne flex items-center justify-center shadow-lg">
              <Icon className="h-6 w-6 text-foreground" strokeWidth={1.5} />
            </div>
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-champagne">
              {service.title}
            </p>
          </div>
          <h1 className="font-serif text-4xl md:text-6xl font-light text-background max-w-3xl">
            {service.subtitle}
          </h1>
          <p className="mt-6 font-serif italic text-lg md:text-xl text-background/90 max-w-2xl">
            {service.tagline}
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
                Overview
              </p>
              <h2 className="mt-3 font-serif text-3xl md:text-4xl font-normal text-foreground">
                What this service holds.
              </h2>
              <div className="mt-8 space-y-6">
                {service.longDescription.map((para, idx) => (
                  <p key={idx} className="text-foreground/85 leading-relaxed text-lg">
                    {para}
                  </p>
                ))}
              </div>

              {/* Key benefits — checks */}
              <div className="mt-16">
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">
                  Key benefits
                </p>
                <h3 className="mt-3 font-serif text-2xl md:text-3xl font-normal text-foreground">
                  What the member receives.
                </h3>
                <ul className="mt-8 grid sm:grid-cols-2 gap-4">
                  {service.keyBenefits.map((benefit, idx) => (
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
                  What is included
                </p>
                <h3 className="mt-3 font-serif text-2xl md:text-3xl font-normal text-foreground">
                  The detail behind the service.
                </h3>
                <ul className="mt-8 grid md:grid-cols-2 gap-4">
                  {service.features.map((feature, idx) => (
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
                  How to begin
                </p>
                <h3 className="mt-3 font-serif text-2xl text-foreground">
                  Open a conversation.
                </h3>
                <p className="mt-4 text-foreground/85 leading-relaxed">{service.howToBegin}</p>

                <div className="mt-8 space-y-3">
                  <Link
                    to="/contact"
                    className={cn(
                      buttonVariants(),
                      "w-full rounded-full bg-primary hover:bg-primary-deep text-primary-foreground",
                    )}
                  >
                    Speak with your concierge
                  </Link>
                  <Link
                    to="/services"
                    className={cn(
                      buttonVariants({ variant: "outline" }),
                      "w-full rounded-full border-primary text-primary-deep hover:bg-primary-soft",
                    )}
                  >
                    See all services
                  </Link>
                </div>

                <div className="mt-8 pt-6 border-t border-border">
                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground mb-4">
                    Held throughout
                  </p>
                  <ul className="space-y-3 text-sm text-foreground/80">
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-champagne mt-0.5 flex-shrink-0" />
                      <span>Same named specialist on every booking</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-champagne mt-0.5 flex-shrink-0" />
                      <span>One file, four working languages</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-champagne mt-0.5 flex-shrink-0" />
                      <span>One monthly U-CALM statement</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-champagne mt-0.5 flex-shrink-0" />
                      <span>Privacy held under operator-panel NDA</span>
                    </li>
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
            Held alongside
          </p>
          <h2 className="mt-3 font-serif text-3xl md:text-4xl font-normal text-foreground">
            Other channels in the same arrangement.
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
                    <h3 className="font-serif text-xl text-foreground">{rel.title}</h3>
                  </div>
                  <p className="text-sm text-foreground/80 leading-relaxed">{rel.cardDescription}</p>
                  <p className="mt-4 inline-flex items-center text-sm text-primary-deep font-medium group-hover:gap-3 gap-2 transition-all">
                    Read more
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
