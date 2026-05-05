import { Link } from "react-router-dom";
import {
  ArrowRight,
  UserCheck,
  Clock3,
  Globe2,
  ShieldCheck,
  Languages,
  Receipt,
} from "lucide-react";
import { BrandImage } from "@/components/brand/BrandImage";
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
 *   1. Hero — full-bleed photograph + double CTA + 4-number proof strip
 *   2. The continuity proposition (editorial pair)
 *   3. Three Cities — Lugano · Milan · London (J-P decision: capture wealthy
 *      English-speakers in Milan via visible English-language coverage)
 *   4. How a journey is held — 4-stage operational arc
 *   5. Six service cards — links to /services/:slug detail pages
 *   6. Why us — 6-icon grid (named, notice, airports, protection, languages, billing)
 *   7. Standards held — short narrative reinforcement
 *   8. Destinations preview — 4-card link to /destinations
 *   9. Quiet questions — restrained 6-item FAQ
 *  10. Closing soul + CTA
 */

const WHY_ITEMS = [
  {
    Icon: UserCheck,
    title: "A named specialist",
    body:
      "Every member is held by a primary aviation specialist who knows the file. The desk runs in shifts so the same names cover twenty-four hours a day, every day.",
  },
  {
    Icon: Clock3,
    title: "A four-hour notice window",
    body:
      "Enrolled members hold a four-hour notice window on eligible aircraft. For the day that did not go as planned, we are already moving while the call is still on the line.",
  },
  {
    Icon: Globe2,
    title: "Two-hundred-plus destinations",
    body:
      "Twelve regions, named local fixers in every signature destination, partner desks for the further-afield places. Aircraft can land almost anywhere; the desk holds the day after.",
  },
  {
    Icon: ShieldCheck,
    title: "Vetted operators only",
    body:
      "ARGUS Platinum, Wyvern Wingman, or IS-BAO Stage 2 equivalent. Annual review, re-confirmation before each flight, insurance at the upper bound of practice.",
  },
  {
    Icon: Languages,
    title: "Four working languages",
    body:
      "English, Italian, French, German held in-house — with Spanish and Arabic available through named partner desks. The English-speaking community is held by an English-speaking specialist.",
  },
  {
    Icon: Receipt,
    title: "One monthly statement",
    body:
      "Aviation appears on the same U-CALM monthly statement as the rest of the member's arrangements. Pass-through costs itemised. No second invoice. No promotional pricing. No surprises.",
  },
];

const Home = () => {
  // Per-page SEO. The FAQPage block on Home is real schema-valid markup
  // that lets Google show the FAQ rich result for U-Calm Aviation queries.
  useDocumentMeta({
    title: "U-Calm Aviation — Aviation, arranged. Lugano · Milan · London",
    description:
      "The aviation service line inside U-CALM, the concierge house. Bespoke charter, on-demand, membership, group, destination management, and executive protection — held in the same English voice from Lugano, Milan, and London.",
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
        mainEntity: [
          {
            "@type": "Question",
            name: "How do I become a member?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "U-Calm Aviation is the aviation service line inside U-CALM. New members come through introduction — typically from an existing member, an introducer the house knows, or a quiet conversation directly with us. We do not run a sign-up form, and we do not advertise.",
            },
          },
          {
            "@type": "Question",
            name: "What lead time do I need?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "Twenty-four to seventy-two hours is preferred for most charter flights, particularly into slot-restricted European fields. Enrolled members hold a four-hour notice window on eligible aircraft for unforeseen days.",
            },
          },
          {
            "@type": "Question",
            name: "How is this different from a charter broker?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "A broker sells the flight. We arrange it inside a relationship. The flight, the cars at both ends, the household at the far end, the table at supper — all coordinated by the same concierge against the same file.",
            },
          },
          {
            "@type": "Question",
            name: "Are there membership tiers?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "No. There is one membership in U-CALM, and aviation is included in it. We do not publish a tiered catalogue, because the work is bespoke to the member.",
            },
          },
          {
            "@type": "Question",
            name: "Do you do empty legs?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "On request, where the route and aircraft genuinely fit the mission. We do not push them as a category — empty-leg pricing carries scheduling risk that does not always sit well with concierge-grade arrangements.",
            },
          },
          {
            "@type": "Question",
            name: "How is billing done?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "Aviation appears on the same monthly U-CALM statement as the rest of the member's arrangements. Pass-through operator costs are itemised; coordination is absorbed into membership.",
            },
          },
        ],
      },
    ],
  });

  return (
    <>
      {/* 1. Hero */}
      <section className="relative">
        <div className="absolute inset-0 overflow-hidden">
          <BrandImage id={PAGE_HEROES.home} priority className="w-full h-full object-cover" />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-overlay" />
        </div>

        <div className="relative container min-h-[88vh] flex flex-col justify-end py-24 animate-fade-soft">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-champagne">
            Lugano · Milan · London
          </p>
          <h1 className="mt-4 font-serif text-4xl md:text-6xl lg:text-7xl font-light text-background max-w-3xl">
            Aviation, arranged.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-background/90 max-w-2xl">
            The aviation service line inside U-CALM. Your existing concierge arranges the flight, the ground, and the itinerary. One relationship. One statement.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/contact"
              className={cn(
                buttonVariants({ size: "lg" }),
                "rounded-full bg-primary hover:bg-primary-deep text-primary-foreground shadow-lg",
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
              Explore the arrangement
            </Link>
          </div>

          {/* Hero proof-point strip — concrete numbers, ported from Ascent */}
          <dl className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-3xl border-t border-background/15 pt-8">
            <div>
              <dt className="text-[0.7rem] tracking-[0.16em] uppercase text-background/65 mb-1">
                Cities
              </dt>
              <dd className="text-lg md:text-xl font-serif text-background">
                Lugano · Milan · London
              </dd>
            </div>
            <div>
              <dt className="text-[0.7rem] tracking-[0.16em] uppercase text-background/65 mb-1">
                Notice window
              </dt>
              <dd className="text-lg md:text-xl font-serif text-background">
                4 hours
              </dd>
            </div>
            <div>
              <dt className="text-[0.7rem] tracking-[0.16em] uppercase text-background/65 mb-1">
                Destinations
              </dt>
              <dd className="text-lg md:text-xl font-serif text-background">
                200+ across 12 regions
              </dd>
            </div>
            <div>
              <dt className="text-[0.7rem] tracking-[0.16em] uppercase text-background/65 mb-1">
                Concierge desk
              </dt>
              <dd className="text-lg md:text-xl font-serif text-background">
                24 / 7 · 365
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {/* 2. The continuity proposition — two images stacked on the left to mirror
            the transition the copy describes (residence → cabin, same register). */}
      <section className="bg-linen">
        <div className="container py-24 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <BrandImage
              id={HOME_EDITORIAL.one}
              className="w-full rounded-lg overflow-hidden"
              alt="Breakfast tray at the sash window in a member's residence — the week being held."
            />
            <BrandImage
              id={HOME_EDITORIAL.two}
              className="w-full rounded-lg overflow-hidden"
              alt="Carafe on the walnut cabin table at cruise altitude — the same register, in the air."
            />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">
              Inside the relationship
            </p>
            <h2 className="mt-4 font-serif text-3xl md:text-4xl font-normal text-foreground">
              The concierge who arranges your week, now arranges the aircraft.
            </h2>
            <p className="mt-6 text-foreground/85 leading-relaxed">
              U-Calm Aviation is how U-CALM members fly. It is not a separate brand to join, a new app to learn, or a second inbox to manage. The concierge who arranges your week arranges the aircraft. The preferences held on file are the preferences the cabin receives. Ground is coordinated on the same itinerary. Billing appears on the same statement. Aviation, arranged, inside the relationship the member already has.
            </p>
            <p className="mt-4 text-foreground/85 leading-relaxed">
              The operational house behind the voice is held to full aviation standards — vetted operator panel, four working languages, twenty-four-hour coverage, named specialists who know the member by file. None of that has to surface to the member. It is, in the older sense of the word, kept.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Three Cities — Lugano / Milan / London */}
      <section className="bg-background">
        <div className="container py-24">
          <div className="max-w-2xl mb-16">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">
              Where we are
            </p>
            <h2 className="mt-4 font-serif text-3xl md:text-4xl font-normal text-foreground">
              Lugano, Milan, and London — held in the same English voice.
            </h2>
            <p className="mt-6 text-foreground/85 leading-relaxed">
              The desk is based in Lugano, with a strong reach into Milan and London. The same English-speaking specialists who hold a London arrangement hold a Milan arrangement; the file does not change shape across borders.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {/* Lugano */}
            <div>
              <div className="relative overflow-hidden rounded-lg aspect-[4/5] mb-6 shadow-whisper">
                <BrandImage id={THREE_CITIES.lugano} className="w-full h-full object-cover" />
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
                Switzerland
              </p>
              <h3 className="mt-2 font-serif text-2xl md:text-3xl text-foreground">Lugano</h3>
              <p className="mt-4 text-foreground/85 leading-relaxed">
                The desk's base. Lugano-Agno (LSZA) is the only Swiss city with a private FBO inside its own valley, with direct light- and mid-jet access from London, Paris, Frankfurt, and Madrid. Helicopter into the lake-side residences of Castagnola and Morcote in the same hour. Four-language ground in thirty minutes.
              </p>
            </div>

            {/* Milan */}
            <div>
              <div className="relative overflow-hidden rounded-lg aspect-[4/5] mb-6 shadow-whisper">
                <BrandImage id={THREE_CITIES.milan} className="w-full h-full object-cover" />
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
                Italy
              </p>
              <h3 className="mt-2 font-serif text-2xl md:text-3xl text-foreground">Milan</h3>
              <p className="mt-4 text-foreground/85 leading-relaxed">
                An English-speaking concierge desk for an English-speaking community that has chosen to make Italy home. Linate (LIML) for short-haul, Malpensa (LIMC) for transcontinental. Direct calls to Milan are taken in English by a named specialist; ground, restaurants, and household held with the same continuity members expect of London.
              </p>
            </div>

            {/* London */}
            <div>
              <div className="relative overflow-hidden rounded-lg aspect-[4/5] mb-6 shadow-whisper">
                <BrandImage id={THREE_CITIES.london} className="w-full h-full object-cover" />
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
                United Kingdom
              </p>
              <h3 className="mt-2 font-serif text-2xl md:text-3xl text-foreground">London</h3>
              <p className="mt-4 text-foreground/85 leading-relaxed">
                Held through the U-CALM concierge house's broader reach. Farnborough and London City handle most member arrivals; Biggin Hill for short-notice; Luton when cabin scale or helicopter shuttle to Battersea requires it. Mayfair concierge integration via the parent house.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. How a journey is held — operational arc */}
      <section className="bg-linen">
        <div className="container py-24">
          <div className="max-w-2xl mb-16">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">
              How a journey is held
            </p>
            <h2 className="mt-4 font-serif text-3xl md:text-4xl font-normal text-foreground">
              From the first note to wheels-up, four quiet stages.
            </h2>
            <p className="mt-6 text-foreground/85 leading-relaxed">
              Most members never see the operational arc; that is the point. Below is what is happening, on the member's behalf, between the first note to the concierge and the door of the cabin closing.
            </p>
          </div>

          <ol className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <li className="rounded-lg border border-border bg-card p-8 shadow-whisper">
              <p className="font-serif text-3xl text-primary-deep">01</p>
              <h3 className="mt-3 font-serif text-xl text-foreground">The note</h3>
              <p className="mt-3 text-sm text-foreground/80 leading-relaxed">
                A short message to the concierge — a date, a city pair, who is travelling. No form, no portal, no requirement to specify aircraft type. The mission is described; the rest is inferred.
              </p>
            </li>
            <li className="rounded-lg border border-border bg-card p-8 shadow-whisper">
              <p className="font-serif text-3xl text-primary-deep">02</p>
              <h3 className="mt-3 font-serif text-xl text-foreground">The match</h3>
              <p className="mt-3 text-sm text-foreground/80 leading-relaxed">
                The aviation specialist sources the aircraft from the vetted operator panel — light, mid, super-mid, heavy, or ultra-long-range — matched to the route, the party, and the weight of the day. Three options at most are returned to the concierge, in plain language.
              </p>
            </li>
            <li className="rounded-lg border border-border bg-card p-8 shadow-whisper">
              <p className="font-serif text-3xl text-primary-deep">03</p>
              <h3 className="mt-3 font-serif text-xl text-foreground">The hold</h3>
              <p className="mt-3 text-sm text-foreground/80 leading-relaxed">
                One option is selected. The aircraft is held. The slot is filed. Crew are briefed against the preferences already on the member's file. Cars are placed at both ends. The member receives a single, considered confirmation — never a thread.
              </p>
            </li>
            <li className="rounded-lg border border-border bg-card p-8 shadow-whisper">
              <p className="font-serif text-3xl text-primary-deep">04</p>
              <h3 className="mt-3 font-serif text-xl text-foreground">The arrival</h3>
              <p className="mt-3 text-sm text-foreground/80 leading-relaxed">
                The driver is at wheels-down, not at published ETA. The household, restaurant, and onward arrangements are already in motion. The flight, the ground, and the day arrive together. The member is met by their day, not by a logistics queue.
              </p>
            </li>
          </ol>
        </div>
      </section>

      {/* 5. Six service cards */}
      <section className="bg-background">
        <div className="container py-24">
          <div className="max-w-2xl mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">
              The catalogue
            </p>
            <h2 className="mt-4 font-serif text-3xl md:text-4xl font-normal text-foreground">
              Six channels, drawn from one relationship.
            </h2>
            <p className="mt-6 text-foreground/85 leading-relaxed">
              Aviation in U-CALM is not a single product. It splits into the four channels members ask for most — bespoke charter, on-demand response, membership-included flying, and group lift — and is held alongside the destination and protection desks that complete the day.
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
                      {service.title}
                    </p>
                  </div>
                  <h3 className="font-serif text-xl text-foreground leading-snug">{service.subtitle}</h3>
                  <p className="mt-3 text-sm text-foreground/75 leading-relaxed flex-grow">
                    {service.cardDescription}
                  </p>
                  <p className="mt-5 inline-flex items-center text-sm text-primary-deep font-medium group-hover:gap-3 gap-2 transition-all">
                    Read more
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
              See the catalogue
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Why us — icon grid */}
      <section className="bg-linen">
        <div className="container py-24">
          <div className="max-w-2xl mb-16">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">
              Why us
            </p>
            <h2 className="mt-4 font-serif text-3xl md:text-4xl font-normal text-foreground">
              Six things we hold for the member, every day.
            </h2>
            <p className="mt-6 text-foreground/85 leading-relaxed">
              Not slogans, not promises. Operational standards the desk is invited to be measured against at every booking.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-12">
            {WHY_ITEMS.map(({ Icon, title, body }) => (
              <div key={title} className="flex flex-col items-start">
                <Icon className="h-7 w-7 text-primary-deep mb-5" strokeWidth={1.5} aria-hidden="true" />
                <h3 className="font-serif text-xl md:text-2xl text-foreground mb-3">{title}</h3>
                <p className="text-sm md:text-base text-foreground/80 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Standards held — narrative reinforcement */}
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
            Standards held
          </p>
          <h2 className="mt-4 font-serif text-3xl md:text-4xl font-light text-background">
            The operational house behind the voice.
          </h2>
          <p className="mt-8 text-background/85 leading-relaxed text-lg">
            U-Calm Aviation does not source the cheapest aircraft on the market; it sources the right aircraft, from operators we have personally inspected and continue to inspect, at prices that reflect the standards held. Operator panel held to ARGUS Platinum, Wyvern Wingman, or IS-BAO Stage 2 equivalent. Insurance levels at the upper bound of industry practice. Crew currency re-confirmed before each flight. Privacy held under non-disclosure across the panel. Member identity filed only where aviation-authority compliance requires it.
          </p>
        </div>
      </section>

      {/* 8. Destinations preview — 4 cards linking to /destinations */}
      <section className="bg-background">
        <div className="container py-24">
          <div className="max-w-2xl mb-14">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">
              Where we operate
            </p>
            <h2 className="mt-4 font-serif text-3xl md:text-4xl font-normal text-foreground">
              Held in deepest detail.
            </h2>
            <p className="mt-6 text-foreground/85 leading-relaxed">
              The destination desk holds twelve regions and two-hundred-plus places — but four are held in the highest detail. Below is a glimpse; the full regional view sits one click away.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              // Place-register cards (residence/coast/hall/lake), distinct from
              // the aviation-coded "first light" register used in §3 Three Cities.
              { name: "Lugano", country: "Switzerland", id: 25 },     // Villa terrace, 06:45 — Raf must-keep, residence on Lugano lake.
              { name: "St. Moritz", country: "Switzerland", id: 37 }, // §4 Gstaad window, snow — Michael "Lovely". Alpine winter through a window. Replaces #43 (figure on impossibly cracked ice; Michael flagged 2026-05-05).
              { name: "London", country: "United Kingdom", id: 23 },  // §2 Garden window, cloud-morning — London townhouse register, no figures. (Replaced #11 Knightsbridge hall — background figure issue.)
              { name: "Monaco", country: "Principality", id: 49 },    // Monte Carlo balcony — direct Monaco-place. Replaces #8 (cabin window, not Monaco).
            ].map((d) => (
              <Link
                key={d.name}
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
                    {d.country}
                  </p>
                  <h3 className="font-serif text-2xl md:text-3xl text-background">{d.name}</h3>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12">
            <Link
              to="/destinations"
              className="inline-flex items-center gap-2 text-primary-deep font-medium hover:gap-3 transition-all"
            >
              See all destinations
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </section>

      {/* 9. Quiet questions — restrained FAQ */}
      <section className="bg-linen">
        <div className="container py-24 max-w-4xl">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">
            Quiet questions
          </p>
          <h2 className="mt-4 font-serif text-3xl md:text-4xl font-normal text-foreground">
            What members tend to ask, before they have asked.
          </h2>

          <div className="mt-12 divide-y divide-border">
            <article className="py-8">
              <h3 className="font-serif text-xl text-foreground">How do I become a member?</h3>
              <p className="mt-3 text-foreground/85 leading-relaxed">
                U-Calm Aviation is the aviation service line inside U-CALM. New members come through introduction — typically from an existing member, an introducer the house knows, or a quiet conversation directly with us. We do not run a sign-up form, and we do not advertise.
              </p>
            </article>
            <article className="py-8">
              <h3 className="font-serif text-xl text-foreground">What lead time do I need?</h3>
              <p className="mt-3 text-foreground/85 leading-relaxed">
                Twenty-four to seventy-two hours is preferred for most charter flights, particularly into slot-restricted European fields. Enrolled members hold a four-hour notice window on eligible aircraft for unforeseen days. Group and ultra-long-range arrangements are best held earlier — a week or more if the date can sit.
              </p>
            </article>
            <article className="py-8">
              <h3 className="font-serif text-xl text-foreground">How is this different from a charter broker?</h3>
              <p className="mt-3 text-foreground/85 leading-relaxed">
                A broker sells the flight. We arrange it inside a relationship. The flight, the cars at both ends, the household at the far end, the table at supper — all are coordinated by the same concierge against the same file. Aviation is one channel of a continuous arrangement, not a separate transaction with its own login.
              </p>
            </article>
            <article className="py-8">
              <h3 className="font-serif text-xl text-foreground">Are there membership tiers?</h3>
              <p className="mt-3 text-foreground/85 leading-relaxed">
                No. There is one membership in U-CALM, and aviation is included in it. We do not publish a tiered catalogue, because the work is bespoke to the member; price-list aviation tends to encourage the wrong kind of conversation.
              </p>
            </article>
            <article className="py-8">
              <h3 className="font-serif text-xl text-foreground">Do you do empty legs?</h3>
              <p className="mt-3 text-foreground/85 leading-relaxed">
                On request, where the route and aircraft genuinely fit the mission. We do not push them as a category — empty-leg pricing carries scheduling risk that does not always sit well with concierge-grade arrangements. If the right one is on the board for the right day, we will say so.
              </p>
            </article>
            <article className="py-8">
              <h3 className="font-serif text-xl text-foreground">How is billing done?</h3>
              <p className="mt-3 text-foreground/85 leading-relaxed">
                Aviation appears on the same monthly U-CALM statement as the rest of the member's arrangements. Pass-through operator costs are itemised; coordination is absorbed into membership. There are no positioning-leg surprises, no opaque mark-ups, and no second invoice from a separate brand.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* 10. Closing — the soul */}
      <section className="bg-background">
        <div className="container py-24 grid md:grid-cols-2 gap-12 items-center">
          <div className="md:order-2">
            <BrandImage id={SEASONAL_BANK.returningHome} className="w-full rounded-lg overflow-hidden" />
          </div>
          <div className="md:order-1">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">
              The arrangement
            </p>
            <h2 className="mt-4 font-serif text-3xl md:text-4xl font-normal text-foreground">
              No new brand. No new broker. No new inbox.
            </h2>
            <p className="mt-6 text-foreground/85 leading-relaxed">
              The same voice, from the table to the cabin door. The flight, the driver, the housekeeper, the dinner reservation — all arranged by the same concierge, on the same itinerary. The member never notices the seam, because there isn't one.
            </p>
            <div className="mt-8">
              <Link
                to="/contact"
                className={cn(
                  buttonVariants(),
                  "rounded-full bg-primary hover:bg-primary-deep text-primary-foreground",
                )}
              >
                Open a conversation
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
