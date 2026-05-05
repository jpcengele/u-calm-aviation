import { Link } from "react-router-dom";
import { BrandImage } from "@/components/brand/BrandImage";
import { PAGE_HEROES, ABOUT_SCENES } from "@/brand/imagery";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  useDocumentMeta,
  canonical,
  ORGANIZATION_JSONLD,
  LOCALBUSINESS_JSONLD,
} from "@/lib/useDocumentMeta";

/**
 * U-Calm Aviation — About.
 *
 * Per Brand Book §01 (Brand Story & Origin), the About page exists to
 * explain why U-Calm Aviation is folded into the U-CALM concierge
 * relationship rather than standing as a separate aviation brand.
 * The U-CALM parent IS visible to members; the sister brand Ascent
 * is never referenced.
 *
 * Sections (top to bottom):
 *   1. Hero
 *   2. The founding question
 *   3. How it came about
 *   4. The architecture
 *   5. The team
 *   6. What we hold ourselves to
 *   7. The handshake — onboarding overview
 *   8. The soul + CTA
 */
const About = () => {
  useDocumentMeta({
    title: "About — A concierge house, extended | U-Calm Aviation",
    description:
      "U-Calm Aviation is the aviation service line inside U-CALM, founded in Lugano in 2013. Aviation, inside the concierge relationship — unseparated. Named four-language specialists, vetted operator panel, twenty-four-hour reachability through the same desk that holds the rest of the member's arrangements.",
    canonical: canonical("/about"),
    jsonLd: [
      ORGANIZATION_JSONLD,
      LOCALBUSINESS_JSONLD,
      {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        url: "https://u-calmaviation.com/about",
        about: { "@id": "https://u-calmaviation.com/#desk" },
      },
    ],
  });

  return (
    <>
      {/* Hero */}
      <section className="relative">
        <div className="absolute inset-0 overflow-hidden">
          <BrandImage id={PAGE_HEROES.about} priority className="w-full h-full object-cover" />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-overlay" />
        </div>
        <div className="relative container min-h-[60vh] flex flex-col justify-end py-20">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-champagne">
            The house
          </p>
          <h1 className="mt-3 font-serif text-4xl md:text-6xl font-light text-background">
            A concierge house, extended.
          </h1>
          <p className="mt-6 text-lg text-background/90 max-w-2xl">
            U-Calm Aviation is the aviation service line inside U-CALM — the way the house's existing members fly.
          </p>
        </div>
      </section>

      {/* The founding question */}
      <section className="bg-background">
        <div className="container py-20 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">
            The founding question
          </p>
          <h2 className="mt-4 font-serif text-3xl md:text-4xl font-normal text-foreground">
            Can aviation disappear into the concierge relationship our members already trust?
          </h2>
          <p className="mt-8 text-foreground/85 leading-relaxed">
            Members of U-CALM are used to calling one person, or sending one email, to have something arranged — a restaurant, a driver, a household, a school run, a birthday table. Private aviation, in most members' lives, was the one category that broke that pattern. They had to switch to another brand, another login, another broker, another tone of voice, another invoice.
          </p>
          <p className="mt-6 text-foreground/85 leading-relaxed">
            U-Calm Aviation is the answer to that discontinuity. The member does not learn an aviation brand; the aviation service simply shows up in the concierge relationship, wearing the same face, speaking the same voice, billing on the same statement.
          </p>

          {/* Small editorial vignette — detail accent + caption */}
          <div className="mt-12 flex items-center gap-5">
            <div className="relative w-20 h-20 md:w-24 md:h-24 overflow-hidden rounded-sm shadow-whisper flex-shrink-0">
              <BrandImage id={ABOUT_SCENES.calmAcronym} className="w-full h-full object-cover" />
            </div>
            <p className="text-xs tracking-[0.16em] uppercase text-muted-foreground leading-relaxed">
              The same hand, from breakfast to wheels-up.<br />A continuous arrangement, kept quiet.
            </p>
          </div>
        </div>
      </section>

      {/* How it came about */}
      <section className="bg-linen">
        <div className="container py-20 grid md:grid-cols-2 gap-12 items-center">
          <BrandImage id={ABOUT_SCENES.founding2013} className="w-full rounded-lg overflow-hidden" />
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">
              How it came about
            </p>
            <h2 className="mt-4 font-serif text-3xl md:text-4xl font-normal text-foreground">
              Quietly, over a number of years.
            </h2>
            <p className="mt-6 text-foreground/85 leading-relaxed">
              U-CALM was founded in Lugano, in 2013, around a single proposition: that the membership relationship between a member and their concierge should be the only relationship a member has to think about. From the first months, members asked the desk to arrange aircraft alongside everything else — and for a long time, the desk did so quietly, on a one-by-one basis, working with carefully chosen operators in the background.
            </p>
            <p className="mt-4 text-foreground/85 leading-relaxed">
              Over the years that arrangement became formal. The aviation desk was constituted as its own service line, with its own specialists, its own vetted operator panel, and its own standards documentation — but always, deliberately, inside U-CALM. It was never spun out as a separate brand, because the entire point was that members shouldn't have to deal with a separate brand.
            </p>
            <p className="mt-4 text-foreground/85 leading-relaxed">
              U-Calm Aviation, today, is the public name for that long-running internal arrangement. The voice the member hears is the same as it has always been; what stands behind it has simply been brought into clearer view.
            </p>
          </div>
        </div>
      </section>

      {/* The architecture */}
      <section className="bg-background">
        <div className="container py-20 grid md:grid-cols-2 gap-12 items-center">
          <div className="md:order-2">
            <BrandImage id={ABOUT_SCENES.household} className="w-full rounded-lg overflow-hidden" />
          </div>
          <div className="md:order-1">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">
              The architecture
            </p>
            <h2 className="mt-4 font-serif text-3xl md:text-4xl font-normal text-foreground">
              Aviation, inside U-CALM.
            </h2>
            <p className="mt-6 text-foreground/85 leading-relaxed">
              U-CALM is the concierge and lifestyle-management house. U-Calm Aviation is a service line inside U-CALM, served to existing members. We do not market aviation to strangers; we extend a concierge relationship into the air.
            </p>
            <p className="mt-4 text-foreground/85 leading-relaxed">
              The operation behind the voice is held to full aviation-house standards — verified operators, four working languages, twenty-four-hour coverage, named specialists, signature-destination expertise. The voice is concierge. The operation is aviation. The member never has to notice the seam, because there isn't one.
            </p>
            <p className="mt-4 text-foreground/85 leading-relaxed">
              When a member sends a one-line note about a Friday flight to Cannes, the response that returns — within the hour, in the same voice, on the same thread — already contains the aircraft option, the cars at both ends, the FBO, the table at supper. The member has not been escalated to a second team; the second team has been quietly woven in.
            </p>
          </div>
        </div>
      </section>

      {/* The team */}
      <section className="bg-linen">
        <div className="container py-20 grid md:grid-cols-2 gap-12 items-center">
          <BrandImage id={ABOUT_SCENES.team} className="w-full rounded-lg overflow-hidden" />
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">
              The team
            </p>
            <h2 className="mt-4 font-serif text-3xl md:text-4xl font-normal text-foreground">
              Named, four-language, on file.
            </h2>
            <p className="mt-6 text-foreground/85 leading-relaxed">
              The aviation desk operates from Lugano, with named aviation specialists working in English, Italian, French, and German. Each member is held by a primary specialist; the desk runs in shifts so that twenty-four-hour reachability is genuine, not theoretical.
            </p>
            <p className="mt-4 text-foreground/85 leading-relaxed">
              The destination-management desk operates alongside, with its own four-language coverage and named local fixers in every signature destination. The protection desk is held in partnership with a single carefully chosen operator, used across every U-CALM service line for consistency of standards and discretion.
            </p>
            <p className="mt-4 text-foreground/85 leading-relaxed">
              The principle, on every desk, is the same: the member knows the person they are speaking to, the person they are speaking to knows the file, and the file holds everything that has ever been arranged. There is never a queue, never a stranger, never a request to "fill out the form".
            </p>
          </div>
        </div>
      </section>

      {/* What we hold ourselves to */}
      <section className="bg-background">
        <div className="container py-20">
          <div className="max-w-2xl mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">
              What we hold ourselves to
            </p>
            <h2 className="mt-4 font-serif text-3xl md:text-4xl font-normal text-foreground">
              The principles, written quietly.
            </h2>
            <p className="mt-6 text-foreground/85 leading-relaxed">
              U-Calm Aviation operates against a small set of internal standards that the desk is invited, and expected, to hold against the member's interest at every turn. None of this has to surface to the member; all of it is true in the background.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Continuity",
                body:
                  "The aviation arrangement does not break the concierge relationship. The same voice, on the same thread, against the same file. Hand-offs are internal, not member-facing.",
              },
              {
                title: "Restraint",
                body:
                  "We propose at most three options on most missions; we do not flood the member with comparison spreadsheets. Restraint is itself a service.",
              },
              {
                title: "Independence",
                body:
                  "We do not own aircraft, and the desk does not benefit from steering members toward any particular operator. The aircraft chosen is the right aircraft for the day, not the most lucrative.",
              },
              {
                title: "Privacy",
                body:
                  "Members are held under non-disclosure across the operator panel, and identifying information is filed only where aviation authority compliance requires.",
              },
              {
                title: "Standards",
                body:
                  "Operators meet ARGUS Platinum, Wyvern Wingman, or IS-BAO Stage 2 equivalent; insurance levels sit at the upper bound of industry practice; crew currency is verified before each flight.",
              },
              {
                title: "Honesty about lead time",
                body:
                  "We say what is genuinely possible, not what closes the conversation. A 24-hour ask into a slot-restricted European field gets the honest answer first; the workaround follows if there is one.",
              },
            ].map((p) => (
              <article key={p.title} className="rounded-lg border border-border bg-card p-8 shadow-whisper">
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-primary-deep">{p.title}</p>
                <p className="mt-4 text-foreground/85 leading-relaxed">{p.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* The handshake — onboarding overview */}
      <section className="bg-linen">
        <div className="container py-20 max-w-4xl">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">
            The handshake
          </p>
          <h2 className="mt-4 font-serif text-3xl md:text-4xl font-normal text-foreground">
            How a referral becomes a journey.
          </h2>
          <p className="mt-6 text-foreground/85 leading-relaxed">
            New members come through introduction, not advertising. The path from a quiet word with the house to the first flight is short, considered, and almost entirely handled by the concierge — never by a sales process.
          </p>

          <ol className="mt-12 space-y-8">
            <li className="grid grid-cols-[auto_1fr] gap-6 items-start">
              <span className="font-serif text-3xl text-primary-deep leading-none">i.</span>
              <div>
                <h3 className="font-serif text-xl text-foreground">A conversation</h3>
                <p className="mt-2 text-foreground/85 leading-relaxed">
                  Most new members are introduced by an existing member or by an introducer the house already knows. The first conversation is short, in person or on a quiet call, and is about whether the relationship is a fit for both sides — never about closing a deal.
                </p>
              </div>
            </li>
            <li className="grid grid-cols-[auto_1fr] gap-6 items-start">
              <span className="font-serif text-3xl text-primary-deep leading-none">ii.</span>
              <div>
                <h3 className="font-serif text-xl text-foreground">The file</h3>
                <p className="mt-2 text-foreground/85 leading-relaxed">
                  If we proceed, the member is set up on the U-CALM file: household, preferences, the people in the family, the patterns of the year. Aviation preferences sit in the same file — the cabin temperature, the catering, the seat by the window, the bag arrangements at the FBO.
                </p>
              </div>
            </li>
            <li className="grid grid-cols-[auto_1fr] gap-6 items-start">
              <span className="font-serif text-3xl text-primary-deep leading-none">iii.</span>
              <div>
                <h3 className="font-serif text-xl text-foreground">The named specialist</h3>
                <p className="mt-2 text-foreground/85 leading-relaxed">
                  A primary aviation specialist is named to the member, working in the language the member prefers, on the desk that holds the rest of the member's arrangements. The member is given the specialist's direct line, alongside the always-available concierge desk.
                </p>
              </div>
            </li>
            <li className="grid grid-cols-[auto_1fr] gap-6 items-start">
              <span className="font-serif text-3xl text-primary-deep leading-none">iv.</span>
              <div>
                <h3 className="font-serif text-xl text-foreground">The first journey</h3>
                <p className="mt-2 text-foreground/85 leading-relaxed">
                  The first journey is, deliberately, treated like the hundredth. The same operational arc, the same restraint, the same single statement at month-end. After it, the member usually goes quiet — which is the indicator the house is looking for that everything has gone as it ought.
                </p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      {/* The soul */}
      <section className="bg-background">
        <div className="container py-20 max-w-3xl mx-auto text-center">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">
            The one idea that governs everything
          </p>
          <h2 className="mt-4 font-serif text-3xl md:text-5xl font-light text-foreground italic">
            Aviation, inside the concierge relationship. Unseparated.
          </h2>
          <p className="mt-10 text-foreground/85 leading-relaxed max-w-2xl mx-auto">
            If the work makes a member feel they have had to leave the concierge to get on a plane, we have failed. If the work makes a member feel the flight was arranged by the same person who arranged last Friday's dinner, we have succeeded.
          </p>
          <div className="mt-10">
            <Link
              to="/contact"
              className={cn(
                buttonVariants(),
                "rounded-full bg-primary hover:bg-primary-deep text-primary-foreground",
              )}
            >
              Speak with your concierge
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
