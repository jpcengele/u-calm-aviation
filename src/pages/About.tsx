import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
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
const PRINCIPLE_KEYS = [
  "continuity",
  "restraint",
  "independence",
  "privacy",
  "standards",
  "honesty",
] as const;

const HANDSHAKE_STEPS = [
  { key: "step1", numeral: "i." },
  { key: "step2", numeral: "ii." },
  { key: "step3", numeral: "iii." },
  { key: "step4", numeral: "iv." },
] as const;

const About = () => {
  const { t } = useTranslation();
  useDocumentMeta({
    title: t("about.meta.title"),
    description: t("about.meta.description"),
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
            {t("about.hero.eyebrow")}
          </p>
          <h1 className="mt-3 font-serif text-4xl md:text-6xl font-light text-background">
            {t("about.hero.headline")}
          </h1>
          <p className="mt-6 text-lg text-background/90 max-w-2xl">
            {t("about.hero.body")}
          </p>
        </div>
      </section>

      {/* The founding question */}
      <section className="bg-background">
        <div className="container py-20 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">
            {t("about.founding.eyebrow")}
          </p>
          <h2 className="mt-4 font-serif text-3xl md:text-4xl font-normal text-foreground">
            {t("about.founding.headline")}
          </h2>
          <p className="mt-8 text-foreground/85 leading-relaxed">
            {t("about.founding.p1")}
          </p>
          <p className="mt-6 text-foreground/85 leading-relaxed">
            {t("about.founding.p2")}
          </p>

          {/* Small editorial vignette — detail accent + caption */}
          <div className="mt-12 flex items-center gap-5">
            <div className="relative w-20 h-20 md:w-24 md:h-24 overflow-hidden rounded-sm shadow-whisper flex-shrink-0">
              <BrandImage id={ABOUT_SCENES.calmAcronym} className="w-full h-full object-cover" />
            </div>
            <p className="text-xs tracking-[0.16em] uppercase text-muted-foreground leading-relaxed whitespace-pre-line">
              {t("about.founding.vignette")}
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
              {t("about.history.eyebrow")}
            </p>
            <h2 className="mt-4 font-serif text-3xl md:text-4xl font-normal text-foreground">
              {t("about.history.headline")}
            </h2>
            <p className="mt-6 text-foreground/85 leading-relaxed">
              {t("about.history.p1")}
            </p>
            <p className="mt-4 text-foreground/85 leading-relaxed">
              {t("about.history.p2")}
            </p>
            <p className="mt-4 text-foreground/85 leading-relaxed">
              {t("about.history.p3")}
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
              {t("about.architecture.eyebrow")}
            </p>
            <h2 className="mt-4 font-serif text-3xl md:text-4xl font-normal text-foreground">
              {t("about.architecture.headline")}
            </h2>
            <p className="mt-6 text-foreground/85 leading-relaxed">
              {t("about.architecture.p1")}
            </p>
            <p className="mt-4 text-foreground/85 leading-relaxed">
              {t("about.architecture.p2")}
            </p>
            <p className="mt-4 text-foreground/85 leading-relaxed">
              {t("about.architecture.p3")}
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
              {t("about.team.eyebrow")}
            </p>
            <h2 className="mt-4 font-serif text-3xl md:text-4xl font-normal text-foreground">
              {t("about.team.headline")}
            </h2>
            <p className="mt-6 text-foreground/85 leading-relaxed">
              {t("about.team.p1")}
            </p>
            <p className="mt-4 text-foreground/85 leading-relaxed">
              {t("about.team.p2")}
            </p>
            <p className="mt-4 text-foreground/85 leading-relaxed">
              {t("about.team.p3")}
            </p>
          </div>
        </div>
      </section>

      {/* What we hold ourselves to */}
      <section className="bg-background">
        <div className="container py-20">
          <div className="max-w-2xl mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">
              {t("about.principles.eyebrow")}
            </p>
            <h2 className="mt-4 font-serif text-3xl md:text-4xl font-normal text-foreground">
              {t("about.principles.headline")}
            </h2>
            <p className="mt-6 text-foreground/85 leading-relaxed">
              {t("about.principles.intro")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {PRINCIPLE_KEYS.map((key) => (
              <article key={key} className="rounded-lg border border-border bg-card p-8 shadow-whisper">
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-primary-deep">
                  {t(`about.principles.${key}.title`)}
                </p>
                <p className="mt-4 text-foreground/85 leading-relaxed">
                  {t(`about.principles.${key}.body`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* The handshake — onboarding overview */}
      <section className="bg-linen">
        <div className="container py-20 max-w-4xl">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">
            {t("about.handshake.eyebrow")}
          </p>
          <h2 className="mt-4 font-serif text-3xl md:text-4xl font-normal text-foreground">
            {t("about.handshake.headline")}
          </h2>
          <p className="mt-6 text-foreground/85 leading-relaxed">
            {t("about.handshake.intro")}
          </p>

          <ol className="mt-12 space-y-8">
            {HANDSHAKE_STEPS.map(({ key, numeral }) => (
              <li key={key} className="grid grid-cols-[auto_1fr] gap-6 items-start">
                <span className="font-serif text-3xl text-primary-deep leading-none">{numeral}</span>
                <div>
                  <h3 className="font-serif text-xl text-foreground">
                    {t(`about.handshake.${key}.title`)}
                  </h3>
                  <p className="mt-2 text-foreground/85 leading-relaxed">
                    {t(`about.handshake.${key}.body`)}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* The soul */}
      <section className="bg-background">
        <div className="container py-20 max-w-3xl mx-auto text-center">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">
            {t("about.soul.eyebrow")}
          </p>
          <h2 className="mt-4 font-serif text-3xl md:text-5xl font-light text-foreground italic">
            {t("about.soul.headline")}
          </h2>
          <p className="mt-10 text-foreground/85 leading-relaxed max-w-2xl mx-auto">
            {t("about.soul.body")}
          </p>
          <div className="mt-10">
            <Link
              to="/contact"
              className={cn(
                buttonVariants(),
                "rounded-full bg-primary hover:bg-primary-deep text-primary-foreground",
              )}
            >
              {t("cta.speakSpecialist")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
