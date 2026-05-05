/**
 * U-Calm Aviation — brand facts used across the site.
 * Single source of truth for copy-adjacent identity data.
 *
 * U-Calm Aviation is the aviation service line inside U-CALM (the parent
 * concierge house). Members come from U-CALM, not from aviation marketing.
 * Tagline is "Aviation, arranged." — never "Fly calm. Arrive restored."
 * (See Brand Book v2.1, April 2026.)
 */

export const brand = {
  name: "U-Calm Aviation",
  shortName: "U-Calm Aviation",
  /** Primary strapline — the tagline. */
  expansion: "Aviation, arranged.",
  /** Supporting tagline — same value; we keep one tagline only. */
  strapline: "Aviation, arranged.",
  description:
    "U-Calm Aviation is the aviation service line inside U-CALM, the concierge house. Your existing concierge arranges the flight, the ground, and the itinerary. One relationship. One statement.",
  domain: "u-calmaviation.com",
  canonicalUrl: "https://u-calmaviation.com/",
  inquiryEmail: "flyhigh@u-calmaviation.com",
  privacyEmail: "privacy@u-calmaviation.com",
  transactionalFromEmail: "flyhigh@u-calmaviation.com",

  /** Offices — kept light per the brand book's restraint principle. */
  offices: [] as Array<{ city: string; country: string }>,

  /** Primary brand colour (hex) — Deep Teal — used in meta theme-color and elsewhere. */
  primaryHex: "#2A8A98",

  /** Supabase project ref — set when the U-Calm Aviation Supabase project is created. */
  supabaseProjectRef: null as string | null,

  /** The parent house — U-CALM is visible to members; reference allowed in member-facing copy. */
  parent: "U-CALM",
} as const;

export type BrandConfig = typeof brand;
