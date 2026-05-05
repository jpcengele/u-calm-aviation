import { Link } from "react-router-dom";
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
const Services = () => {
  useDocumentMeta({
    title: "Services — Six channels, one concierge | U-Calm Aviation",
    description:
      "Bespoke charter, on-demand, membership, group, destination management, and executive protection — six service channels held by one named concierge, on one itinerary, against one file.",
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
          name: s.title,
          url: `https://u-calmaviation.com/services/${s.slug}`,
          description: s.cardDescription,
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
            How it is arranged
          </p>
          <h1 className="mt-3 font-serif text-4xl md:text-6xl font-light text-background">
            Six channels, one concierge.
          </h1>
          <p className="mt-6 text-lg text-background/90 max-w-2xl">
            Aviation, ground, and protection — held by the same hand, on the same itinerary, against the same file.
          </p>
        </div>
      </section>

      {/* Six service cards */}
      <section className="bg-background">
        <div className="container py-20">
          <div className="max-w-2xl mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">
              The catalogue
            </p>
            <h2 className="mt-4 font-serif text-3xl md:text-4xl font-normal text-foreground">
              Six services, drawn from one relationship.
            </h2>
            <p className="mt-6 text-foreground/85 leading-relaxed">
              Aviation in U-CALM is not a single product. It splits into the four channels members ask for most — bespoke charter, on-demand response, membership-included flying, and group lift — and is held alongside the destination and protection desks that complete the day. All are arranged through the same concierge, on the same file.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service) => {
              const Icon = service.icon;
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
                      {service.title}
                    </p>
                  </div>

                  <h3 className="font-serif text-2xl text-foreground">{service.subtitle}</h3>
                  <p className="mt-4 text-foreground/80 leading-relaxed text-sm flex-grow">
                    {service.cardDescription}
                  </p>

                  <ul className="mt-5 space-y-2">
                    {service.cardFeatures.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm text-foreground/75">
                        <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-champagne mt-1.5" />
                        <span className="leading-snug">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <p className="mt-6 inline-flex items-center text-sm text-primary-deep font-medium group-hover:gap-3 gap-2 transition-all">
                    Read more
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
            Lead times
          </p>
          <h2 className="mt-4 font-serif text-3xl md:text-4xl font-normal text-foreground">
            Typical notice windows.
          </h2>
          <p className="mt-6 text-foreground/85 leading-relaxed max-w-3xl">
            The below are the windows the desk works to comfortably. Faster is possible — and frequently arranged — but lead time is what allows the operational house to do its quiet best work for the member.
          </p>

          <div className="mt-12 divide-y divide-border">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-6">
              <p className="font-serif text-lg text-primary-deep md:col-span-1">Charter, intra-European</p>
              <p className="text-foreground/85 leading-relaxed md:col-span-2">
                24–72 hours preferred. Slot-restricted European fields (London City, Lugano, certain Alpine fields in season) settle most easily with 48 hours.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-6">
              <p className="font-serif text-lg text-primary-deep md:col-span-1">Charter, transcontinental</p>
              <p className="text-foreground/85 leading-relaxed md:col-span-2">
                3–7 days preferred for ultra-long-range routes; longer for non-customary city pairs that may require permits or fuel-stop coordination.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-6">
              <p className="font-serif text-lg text-primary-deep md:col-span-1">Group lift</p>
              <p className="text-foreground/85 leading-relaxed md:col-span-2">
                10–14 days minimum for parties above twenty; longer for weddings or off-sites that benefit from operator-side scheduling.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-6">
              <p className="font-serif text-lg text-primary-deep md:col-span-1">Helicopter transfers</p>
              <p className="text-foreground/85 leading-relaxed md:col-span-2">
                24 hours typical; same-day arrangement frequently possible into Alpine and Mediterranean valleys when weather windows permit.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-6">
              <p className="font-serif text-lg text-primary-deep md:col-span-1">Short-notice window</p>
              <p className="text-foreground/85 leading-relaxed md:col-span-2">
                4-hour notice on eligible aircraft for enrolled members — for the day that did not go as planned, the call no one wanted to have to make.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA band */}
      <section className="bg-foreground text-background">
        <div className="container py-20 max-w-3xl mx-auto text-center">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-champagne">
            Open a conversation
          </p>
          <h2 className="mt-4 font-serif text-3xl md:text-4xl font-light">
            One itinerary. One statement. One voice.
          </h2>
          <p className="mt-6 text-background/85 leading-relaxed">
            From a Sunday lunch in London to a Tuesday supper in Gstaad — held by the same concierge, in the same voice, end to end.
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
              to="/destinations"
              className={cn(
                buttonVariants({ size: "lg" }),
                "rounded-full bg-champagne hover:bg-champagne/90 text-foreground shadow-lg",
              )}
            >
              Where we operate
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
