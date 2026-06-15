#!/usr/bin/env node
/**
 * prerender.mjs — post-build static-meta prerender for U-Calm Aviation.
 *
 * Ported from the U-CALM Concierge prerender (2026-06-15). Same contract:
 * after `vite build`, for every known route write dist/<route>/index.html —
 * a copy of the built shell with that route's <title>, meta description,
 * canonical, Open Graph/Twitter tags and JSON-LD baked into static HTML.
 * The <body> is untouched (still the hydrating #root), so humans are
 * unaffected and there is NO hydration change and NO headless browser.
 *
 * WHY: non-JS crawlers (AI fetchers, social unfurlers, Google's first pass)
 * otherwise see one generic shell for every route. This makes each route
 * self-describe in raw HTML — per-route canonical, social cards, Schema.org.
 *
 * AVIATION SPECIFICS
 *   - Titles/descriptions are resolved from src/i18n/locales/en.json — the
 *     same `*.meta.*` and `services.catalogue.*` keys the client hook reads —
 *     so the crawler baseline never drifts from the page copy.
 *   - The dynamic /services/:slug route is enumerated from the six service
 *     slugs; the route-sync assertion skips ':' (dynamic) and '*' (catch-all).
 *
 * SAFETY: zero dependencies; if it throws, the build fails and Cloudflare
 * keeps the previous deployment. ROUTES is asserted against src/App.tsx so a
 * new <Route> can never silently ship without prerendered meta.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const DIST = join(ROOT, "dist");
const ORIGIN = "https://u-calmaviation.com";

// ---- en.json resolver (mirrors the client meta.* lookups) -------------------
const EN = JSON.parse(readFileSync(join(ROOT, "src", "i18n", "locales", "en.json"), "utf8"));
const tk = (p) => p.split(".").reduce((o, k) => (o && o[k] !== undefined ? o[k] : undefined), EN);
function need(path) {
  const v = tk(path);
  if (typeof v !== "string" || !v) {
    console.error(`[prerender] FAIL: missing/empty en.json string at "${path}".`);
    process.exit(1);
  }
  return v;
}

// ---- Schema blocks (mirror src/lib/useDocumentMeta.ts) ----------------------
const ORG = {
  "@context": "https://schema.org", "@type": "Organization", "@id": `${ORIGIN}/#org`,
  name: "U-Calm Aviation", legalName: "U-Calm Aviation, a service line of U-CALM",
  alternateName: ["U-CALM Aviation", "UCalm Aviation", "Ucalm Aviation", "U Calm Aviation", "U-Calm Aviation Lugano"],
  url: ORIGIN, logo: `${ORIGIN}/brand/logo-aviation.jpg`,
  parentOrganization: { "@type": "Organization", name: "U-CALM", url: "https://u-calm.com" },
  description: "U-Calm Aviation is the aviation service line inside U-CALM, the concierge house. Bespoke charter, on-demand, group, destination management, and executive protection — all held within the U-CALM membership relationship.",
  email: "flyhigh@u-calmaviation.com",
  areaServed: ["Switzerland", "Italy", "United Kingdom", "Worldwide"],
  knowsLanguage: ["en", "it", "fr", "de"], sameAs: ["https://u-calm.com"],
};
const DESK = {
  "@context": "https://schema.org", "@type": "ProfessionalService", "@id": `${ORIGIN}/#desk`,
  name: "U-Calm Aviation", alternateName: ["UCalm Aviation", "Ucalm Aviation"],
  url: ORIGIN, image: `${ORIGIN}/brand/logo-aviation.jpg`, email: "flyhigh@u-calmaviation.com",
  description: "Aviation desk operating from Lugano, Switzerland — bespoke charter, on-demand, membership, group, destination management, and executive protection. Held in English, Italian, French, German.",
  areaServed: [
    { "@type": "City", name: "Lugano" }, { "@type": "City", name: "Milan" }, { "@type": "City", name: "London" },
    { "@type": "Place", name: "Switzerland" }, { "@type": "Place", name: "Italy" },
    { "@type": "Place", name: "United Kingdom" }, { "@type": "Place", name: "Worldwide" },
  ],
  address: { "@type": "PostalAddress", addressLocality: "Lugano", addressRegion: "Ticino", addressCountry: "CH" },
  geo: { "@type": "GeoCoordinates", latitude: 46.0037, longitude: 8.9511 },
  contactPoint: { "@type": "ContactPoint", contactType: "Inquiries", email: "flyhigh@u-calmaviation.com", availableLanguage: ["English", "Italian", "French", "German"], areaServed: ["CH", "IT", "GB", "Worldwide"] },
  parentOrganization: { "@id": "https://u-calm.com/#org" },
};
const WEBSITE = {
  "@context": "https://schema.org", "@type": "WebSite", name: "U-Calm Aviation",
  url: ORIGIN, inLanguage: ["en", "it", "fr", "de"], publisher: { "@id": `${ORIGIN}/#org` },
};
const serviceSchema = (slug, name, description) => ({
  "@context": "https://schema.org", "@type": "Service", "@id": `${ORIGIN}/services/${slug}#service`,
  name, description, serviceType: name, provider: { "@id": `${ORIGIN}/#desk` },
  areaServed: ["Switzerland", "Italy", "United Kingdom", "Worldwide"], url: `${ORIGIN}/services/${slug}`,
});

// ---- Service catalogue (slug ↔ i18n key — mirrors src/lib/services-data.ts) -
const SERVICES = [
  { slug: "bespoke-charter", key: "bespokeCharter" },
  { slug: "on-demand", key: "onDemand" },
  { slug: "membership", key: "membership" },
  { slug: "group-charter", key: "groupCharter" },
  { slug: "destination-management", key: "destinationManagement" },
  { slug: "executive-protection", key: "executiveProtection" },
];

// ---- Route manifest (asserted against src/App.tsx) --------------------------
const PAGES = [
  { path: "/", titleKey: "home.meta.title", descKey: "home.meta.description", jsonLd: [ORG, DESK, WEBSITE] },
  { path: "/services", titleKey: "services.meta.title", descKey: "services.meta.description", jsonLd: [ORG, DESK] },
  { path: "/destinations", titleKey: "destinations.meta.title", descKey: "destinations.meta.description", jsonLd: [ORG, DESK] },
  { path: "/about", titleKey: "about.meta.title", descKey: "about.meta.description", jsonLd: [ORG, DESK] },
  { path: "/contact", titleKey: "contact.meta.title", descKey: "contact.meta.description", jsonLd: [ORG, DESK] },
  { path: "/legal/privacy", titleKey: "privacy.meta.title", descKey: "privacy.meta.description", jsonLd: [ORG] },
];
const SERVICE_ROUTES = SERVICES.map((s) => {
  const name = need(`services.catalogue.${s.key}.title`);
  const subtitle = need(`services.catalogue.${s.key}.subtitle`).replace(/\.$/, "");
  const description = need(`services.catalogue.${s.key}.cardDescription`);
  return {
    path: `/services/${s.slug}`,
    title: `${name} — ${subtitle} | U-Calm Aviation`,
    description,
    jsonLd: [ORG, DESK, serviceSchema(s.slug, name, description)],
  };
});
const ROUTES = [...PAGES, ...SERVICE_ROUTES];

const DEFAULT_OG = `${ORIGIN}/og/default.png`;

// ---- helpers ----------------------------------------------------------------
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const titleOf = (r) => r.title ?? need(r.titleKey);
const descOf = (r) => r.description ?? need(r.descKey);

function rewrite(shell, route) {
  const url = ORIGIN + (route.path === "/" ? "/" : route.path);
  const og = route.ogImage || DEFAULT_OG;
  const title = titleOf(route);
  const description = descOf(route);
  const ld = (route.jsonLd || []).map((b) => `<script type="application/ld+json">${JSON.stringify(b)}</script>`).join("\n    ");
  let html = shell;
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${esc(title)}</title>`);
  html = html.replace(/<meta name="description"[^>]*>/i, `<meta name="description" content="${esc(description)}" />`);
  const set = (prop, val, byProp = true) => {
    const attr = byProp ? "property" : "name";
    const re = new RegExp(`<meta ${attr}="${prop}"[^>]*>`, "i");
    const tag = `<meta ${attr}="${prop}" content="${esc(val)}" />`;
    html = re.test(html) ? html.replace(re, tag) : html.replace("</head>", `    ${tag}\n  </head>`);
  };
  set("og:title", title);
  set("og:description", description);
  set("og:url", url);
  set("og:type", "website");
  set("og:image", og);
  set("og:image:alt", `U-Calm Aviation — ${title}`);
  set("twitter:title", title, false);
  set("twitter:description", description, false);
  set("twitter:image", og, false);
  html = html.replace("</head>", `    <link rel="canonical" href="${url}" />\n    ${ld}\n  </head>`);
  return html;
}

// ---- assert ROUTES match src/App.tsx ---------------------------------------
function assertRoutesInSync() {
  const app = readFileSync(join(ROOT, "src", "App.tsx"), "utf8");
  const declared = new Set();
  if (/<Route\s+index\b/.test(app)) declared.add("/");
  for (const m of app.matchAll(/<Route\s+path="([^"*]+)"/g)) {
    if (m[1].includes(":")) continue; // dynamic route (e.g. services/:slug) — prerendered via enumerated slugs
    declared.add(m[1].startsWith("/") ? m[1] : "/" + m[1]);
  }
  const manifest = new Set(ROUTES.map((r) => r.path));
  const missing = [...declared].filter((p) => !manifest.has(p));
  if (missing.length) {
    console.error(`[prerender] FAIL: routes in App.tsx not in prerender manifest: ${missing.join(", ")}`);
    console.error("[prerender] Add them to PAGES/SERVICES in scripts/prerender.mjs (or they ship with generic meta).");
    process.exit(1);
  }
}

// ---- run --------------------------------------------------------------------
const shellPath = join(DIST, "index.html");
if (!existsSync(shellPath)) {
  console.error(`[prerender] FAIL: ${shellPath} not found — run after \`vite build\`.`);
  process.exit(1);
}
assertRoutesInSync();
const shell = readFileSync(shellPath, "utf8");
let n = 0;
for (const route of ROUTES) {
  if (route.path === "/") continue; // homepage already lives at dist/index.html — rewrite it in place
  const outDir = join(DIST, route.path.replace(/^\//, ""));
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "index.html"), rewrite(shell, route), "utf8");
  n++;
}
writeFileSync(shellPath, rewrite(shell, ROUTES.find((r) => r.path === "/")), "utf8");
console.log(`[prerender] wrote ${n} route files + homepage — ${ROUTES.length} routes, meta + JSON-LD baked in.`);
