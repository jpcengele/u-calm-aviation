import { useEffect } from "react";

/**
 * Per-page SEO meta — lightweight, no helmet-async dependency.
 *
 * Mutates the document <head> on mount. Sufficient for an SPA on
 * Cloudflare Pages where Googlebot evaluates JS before indexing
 * (Googlebot has been Chromium-evergreen since 2019, so this works).
 *
 * If we later move to Vite SSG, the same per-page meta config can drive
 * the static prerender step instead — keep page components self-contained.
 *
 * Usage:
 *   useDocumentMeta({
 *     title: "Services — U-Calm Aviation",
 *     description: "Six channels, one concierge: bespoke charter, …",
 *     canonical: "https://u-calmaviation.com/services",
 *     ogImage: "https://u-calmaviation.com/og/services.jpg",
 *   });
 */
export interface DocumentMeta {
  /** Final document title — typically `<page> — U-Calm Aviation`. */
  title: string;
  /** 150–160 char description. */
  description: string;
  /** Absolute canonical URL for this route. */
  canonical: string;
  /** Optional absolute OG image URL. Falls back to /og/default.png. */
  ogImage?: string;
  /** Optional og:type override. Defaults to "website". */
  ogType?: "website" | "article" | "profile";
  /** Optional structured-data block(s) — array of JSON-serialisable objects. */
  jsonLd?: object | readonly object[];
}

const DEFAULT_OG_IMAGE = "https://u-calmaviation.com/og/default.png";
const SITE_NAME = "U-Calm Aviation";

const JSONLD_ATTR = "data-ucalm-jsonld";
const META_ATTR = "data-ucalm-meta";

function setMeta(name: string, content: string, byProperty = false) {
  const selector = byProperty
    ? `meta[property="${name}"]`
    : `meta[name="${name}"]`;
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    if (byProperty) el.setAttribute("property", name);
    else el.setAttribute("name", name);
    el.setAttribute(META_ATTR, "true");
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    el.setAttribute(META_ATTR, "true");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export function useDocumentMeta(meta: DocumentMeta): void {
  useEffect(() => {
    const ogImage = meta.ogImage ?? DEFAULT_OG_IMAGE;
    const ogType = meta.ogType ?? "website";

    document.title = meta.title;
    setMeta("description", meta.description);
    setLink("canonical", meta.canonical);

    setMeta("og:title", meta.title, true);
    setMeta("og:description", meta.description, true);
    setMeta("og:url", meta.canonical, true);
    setMeta("og:type", ogType, true);
    setMeta("og:site_name", SITE_NAME, true);
    setMeta("og:image", ogImage, true);
    setMeta("og:image:alt", `${SITE_NAME} — ${meta.title}`, true);

    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", meta.title);
    setMeta("twitter:description", meta.description);
    setMeta("twitter:image", ogImage);

    // Remove any prior JSON-LD blocks added by this hook
    const previous = document.head.querySelectorAll(`script[${JSONLD_ATTR}]`);
    previous.forEach((node) => node.remove());

    if (meta.jsonLd) {
      const blocks = Array.isArray(meta.jsonLd) ? meta.jsonLd : [meta.jsonLd];
      blocks.forEach((block) => {
        const script = document.createElement("script");
        script.setAttribute("type", "application/ld+json");
        script.setAttribute(JSONLD_ATTR, "true");
        script.textContent = JSON.stringify(block);
        document.head.appendChild(script);
      });
    }
  }, [
    meta.title,
    meta.description,
    meta.canonical,
    meta.ogImage,
    meta.ogType,
    // jsonLd is intentionally excluded from the dependency list to avoid
    // re-stringifying on every parent re-render; it only updates when the
    // route changes (and the route change triggers a remount of the page
    // component anyway).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  ]);
}

/** Helper for building absolute canonical URLs. */
export function canonical(path: string): string {
  const trimmed = path.startsWith("/") ? path : `/${path}`;
  return `https://u-calmaviation.com${trimmed === "/" ? "/" : trimmed}`;
}

/** Common JSON-LD blocks used across multiple pages. */
export const ORGANIZATION_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "U-Calm Aviation",
  legalName: "U-Calm Aviation, a service line of U-CALM",
  alternateName: "U-CALM Aviation",
  url: "https://u-calmaviation.com",
  logo: "https://u-calmaviation.com/brand/logo-aviation.jpg",
  parentOrganization: {
    "@type": "Organization",
    name: "U-CALM",
    url: "https://u-calm.com",
  },
  description:
    "U-Calm Aviation is the aviation service line inside U-CALM, the concierge house. Bespoke charter, on-demand, group, destination management, and executive protection — all held within the U-CALM membership relationship.",
  email: "flyhigh@u-calmaviation.com",
  areaServed: ["Switzerland", "Italy", "United Kingdom", "Worldwide"],
  knowsLanguage: ["en", "it", "fr", "de"],
  sameAs: ["https://u-calm.com"],
} as const;

export const LOCALBUSINESS_JSONLD = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://u-calmaviation.com/#desk",
  name: "U-Calm Aviation",
  url: "https://u-calmaviation.com",
  image: "https://u-calmaviation.com/brand/logo-aviation.jpg",
  email: "flyhigh@u-calmaviation.com",
  description:
    "Aviation desk operating from Lugano, Switzerland — bespoke charter, on-demand, membership, group, destination management, and executive protection. Held in English, Italian, French, German.",
  areaServed: [
    { "@type": "City", name: "Lugano" },
    { "@type": "City", name: "Milan" },
    { "@type": "City", name: "London" },
    { "@type": "Place", name: "Switzerland" },
    { "@type": "Place", name: "Italy" },
    { "@type": "Place", name: "United Kingdom" },
    { "@type": "Place", name: "Worldwide" },
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lugano",
    addressCountry: "CH",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Inquiries",
    email: "flyhigh@u-calmaviation.com",
    availableLanguage: ["English", "Italian", "French", "German"],
    areaServed: ["CH", "IT", "GB", "Worldwide"],
  },
  parentOrganization: {
    "@type": "Organization",
    name: "U-CALM",
    url: "https://u-calm.com",
  },
} as const;
