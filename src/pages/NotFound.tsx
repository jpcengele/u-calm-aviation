import { Link } from "react-router-dom";
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
  useDocumentMeta({
    title: "Page not found — U-Calm Aviation",
    description:
      "The page you were looking for has moved, or never existed. Return to U-Calm Aviation, or write to the desk.",
    canonical: canonical("/"),
  });

  return (
    <section className="container py-32 max-w-2xl mx-auto text-center">
      <p className="text-xs font-bold uppercase tracking-[0.15em] text-champagne">
        404 · the corridor turns here
      </p>
      <h1 className="mt-6 font-serif text-4xl md:text-5xl font-light text-foreground">
        We can't find what you were looking for.
      </h1>
      <p className="mt-6 text-foreground/85 leading-relaxed">
        The page may have moved, or the link may have arrived a little out of shape. Return to the home, or open a conversation with the desk — whichever serves the moment.
      </p>
      <div className="mt-10 flex flex-wrap gap-4 justify-center">
        <Link
          to="/"
          className={cn(
            buttonVariants(),
            "rounded-full bg-primary hover:bg-primary-deep text-primary-foreground",
          )}
        >
          Return home
        </Link>
        <Link
          to="/contact"
          className={cn(
            buttonVariants(),
            "rounded-full bg-champagne hover:bg-champagne/90 text-foreground",
          )}
        >
          Speak with your concierge
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
