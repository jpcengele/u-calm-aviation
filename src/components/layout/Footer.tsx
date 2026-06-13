import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { brand } from "@/brand/config";
import { buttonVariants } from "@/components/ui/button";
import { BrandImage } from "@/components/brand/BrandImage";
import { SEASONAL_BANK } from "@/brand/imagery";
import { cn } from "@/lib/utils";

/**
 * U-Calm Aviation — Footer.
 *
 * Pattern adopted from Ascent's footer on 2026-05-03 (J-P benchmark direction):
 *   1. Texture band above the sitemap (warm closing note)
 *   2. Tagline / CTA band on Still Navy
 *   3. 4-column sitemap (Brand · Services · Explore · Practical)
 *   4. Legal strip
 *
 * Adheres to Brand Book v2.1 §00 (Six non-negotiables) and §03 (Restraint).
 * Tagline appears once, italic, in serif. No marketing copy in the legal strip.
 */
const Footer = () => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24">
      {/* Texture band — warm closing note before the footer grid */}
      <div className="relative h-20 md:h-28 overflow-hidden">
        <BrandImage
          id={SEASONAL_BANK.winterHearth}
          alt=""
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(28,43,58,0.2) 0%, rgba(28,43,58,0.55) 100%)",
          }}
          aria-hidden="true"
        />
      </div>

      {/* Tagline / CTA band */}
      <section className="bg-foreground text-background">
        <div className="container py-20 md:py-24 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-champagne">
            {t("brand.shortName")}
          </p>

          <p className="mt-10 font-serif italic text-2xl md:text-3xl text-background/95">
            {t("brand.strapline")}
          </p>

          <p className="mt-8 max-w-xl mx-auto text-background/75 leading-relaxed">
            {t("brand.description")}
          </p>

          <div className="mt-10">
            <Link
              to="/contact"
              className={cn(
                buttonVariants({ size: "lg" }),
                "rounded-full bg-primary hover:bg-primary-hero text-primary-foreground shadow-lg",
              )}
            >
              {t("cta.speakSpecialist")}
            </Link>
          </div>
        </div>
      </section>

      {/* 4-column sitemap */}
      <div className="bg-linen border-t border-border">
        <div className="container py-14 grid grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="inline-block mb-4" aria-label={t("footer.homeAriaLabel")}>
              <img
                src="/brand/logo-aviation.jpg"
                alt={t("footer.logoAlt")}
                className="h-[5.4rem] w-auto"
                draggable={false}
              />
            </Link>
            <p className="font-serif italic text-foreground/85 text-sm mb-2">
              {t("brand.expansion")}
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-xs">
              {t("footer.blurb")}
            </p>
          </div>

          {/* Services column */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-primary-deep mb-4">
              {t("footer.services")}
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  to="/services/bespoke-charter"
                  className="text-foreground/75 hover:text-primary-deep transition-colors"
                >
                  {t("services.catalogue.bespokeCharter.title")}
                </Link>
              </li>
              <li>
                <Link
                  to="/services/on-demand"
                  className="text-foreground/75 hover:text-primary-deep transition-colors"
                >
                  {t("services.catalogue.onDemand.title")}
                </Link>
              </li>
              <li>
                <Link
                  to="/services/membership"
                  className="text-foreground/75 hover:text-primary-deep transition-colors"
                >
                  {t("services.catalogue.membership.title")}
                </Link>
              </li>
              <li>
                <Link
                  to="/services/group-charter"
                  className="text-foreground/75 hover:text-primary-deep transition-colors"
                >
                  {t("services.catalogue.groupCharter.title")}
                </Link>
              </li>
              <li>
                <Link
                  to="/services/destination-management"
                  className="text-foreground/75 hover:text-primary-deep transition-colors"
                >
                  {t("services.catalogue.destinationManagement.title")}
                </Link>
              </li>
              <li>
                <Link
                  to="/services/executive-protection"
                  className="text-foreground/75 hover:text-primary-deep transition-colors"
                >
                  {t("services.catalogue.executiveProtection.title")}
                </Link>
              </li>
              <li className="pt-2">
                <Link
                  to="/services"
                  className="text-primary-deep hover:underline font-medium"
                >
                  {t("cta.seeAllServices")} →
                </Link>
              </li>
            </ul>
          </div>

          {/* Explore column */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-primary-deep mb-4">
              {t("footer.explore")}
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/destinations" className="text-foreground/75 hover:text-primary-deep transition-colors">
                  {t("footer.destinationsLabel")}
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-foreground/75 hover:text-primary-deep transition-colors">
                  {t("footer.aboutLabel")}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-foreground/75 hover:text-primary-deep transition-colors">
                  {t("footer.contactLabel")}
                </Link>
              </li>
              <li>
                <a
                  href="https://u-calm.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/75 hover:text-primary-deep transition-colors"
                  aria-label={t("a11y.parentHouse")}
                >
                  U-CALM Concierge ↗
                </a>
              </li>
            </ul>

            <h3 className="mt-8 text-xs font-bold uppercase tracking-[0.15em] text-primary-deep mb-4">
              {t("footer.languages")}
            </h3>
            <p className="text-sm text-foreground/75 leading-relaxed">
              {t("footer.languagesList")}
            </p>
          </div>

          {/* Practical column */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-primary-deep mb-4">
              {t("footer.practical")}
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <span className="block text-xs text-muted-foreground uppercase tracking-wider mb-0.5">{t("footer.inquiries")}</span>
                <a
                  href={`mailto:${brand.inquiryEmail}`}
                  className="text-foreground/85 hover:text-primary-deep transition-colors break-all"
                >
                  {brand.inquiryEmail}
                </a>
              </li>
              <li className="pt-1">
                <span className="block text-xs text-muted-foreground uppercase tracking-wider mb-0.5">{t("footer.hours")}</span>
                <span className="text-foreground/85">{t("footer.hoursValue")}</span>
              </li>
              <li className="pt-1">
                <span className="block text-xs text-muted-foreground uppercase tracking-wider mb-0.5">{t("footer.desk")}</span>
                <span className="text-foreground/85">{t("footer.deskValue")}</span>
              </li>
            </ul>

            <h3 className="mt-8 text-xs font-bold uppercase tracking-[0.15em] text-primary-deep mb-4">
              {t("footer.legal")}
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/legal/privacy" className="text-foreground/75 hover:text-primary-deep transition-colors">
                  {t("footer.privacyNotice")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom legal strip */}
        <div className="border-t border-border">
          <div className="container py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs text-muted-foreground">
            <p>{t("footer.copyright", { year, name: brand.name })}</p>
            <p className="font-serif italic">{t("brand.expansion")}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
