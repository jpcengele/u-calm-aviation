import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useDocumentMeta, canonical } from "@/lib/useDocumentMeta";

/**
 * U-Calm Aviation — 404. Brand-voice over generic "page not found".
 *
 * The 404 page also sets a noindex hint via meta robots so search engines
 * don't index URLs that legitimately don't exist.
 */
const NotFound = () => {
  const { t } = useTranslation();
  useDocumentMeta({
    title: t("notFound.meta.title"),
    description: t("notFound.meta.description"),
    canonical: canonical("/"),
  });

  return (
    <section className="container py-32 max-w-2xl mx-auto text-center">
      <p className="text-xs font-bold uppercase tracking-[0.15em] text-champagne">
        {t("notFound.eyebrow")}
      </p>
      <h1 className="mt-6 font-serif text-4xl md:text-5xl font-light text-foreground">
        {t("notFound.headline")}
      </h1>
      <p className="mt-6 text-foreground/85 leading-relaxed">
        {t("notFound.body")}
      </p>
      <div className="mt-10 flex flex-wrap gap-4 justify-center">
        <Link
          to="/"
          className={cn(
            buttonVariants(),
            "rounded-full bg-primary hover:bg-primary-deep text-primary-foreground",
          )}
        >
          {t("cta.returnHome")}
        </Link>
        <Link
          to="/contact"
          className={cn(
            buttonVariants(),
            "rounded-full bg-champagne hover:bg-champagne/90 text-foreground",
          )}
        >
          {t("cta.speakSpecialist")}
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
