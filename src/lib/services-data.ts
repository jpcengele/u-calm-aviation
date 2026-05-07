import { Plane, Clock, Shield, Star, MapPin, Users, type LucideIcon } from "lucide-react";

/**
 * U-Calm Aviation — service catalogue (6 entries).
 *
 * After the i18n refactor (2026-05-07) this file holds only the
 * structural metadata: slug, icon, imageSlot, and the i18n key under
 * which the localised copy lives in `src/i18n/locales/<lng>.json` at
 * `services.catalogue.<i18nKey>.*`.
 *
 * Pages resolve copy with `t(\`services.catalogue.${service.i18nKey}.title\`)`
 * etc. Arrays (`cardFeatures`, `longDescription`, `keyBenefits`,
 * `features`) are read with `t(..., { returnObjects: true })` and cast
 * to `string[]`.
 *
 * Per Brand Book v2.1 founding refusals, NO published pricing appears
 * anywhere in this catalogue, including on Membership.
 */
export interface Service {
  /** URL slug — used for /services/:slug route */
  slug: string;
  /** Lucide icon used on cards and detail hero */
  icon: LucideIcon;
  /**
   * i18n key under `services.catalogue.<i18nKey>.*`. Distinct from `slug`
   * because slug is kebab-case (URL-safe) and i18nKey is camelCase
   * (JSON-friendly).
   */
  i18nKey:
    | "bespokeCharter"
    | "onDemand"
    | "membership"
    | "groupCharter"
    | "destinationManagement"
    | "executiveProtection";
  /** Imagery slot key from src/brand/imagery.ts SERVICES_SCENES */
  imageSlot: "phone" | "ground" | "relocations" | "corporate" | "protection" | "travelEvents" | "aviation" | "coolCalm";
}

export const SERVICES: readonly Service[] = [
  {
    slug: "bespoke-charter",
    icon: Plane,
    i18nKey: "bespokeCharter",
    imageSlot: "aviation",
  },
  {
    slug: "on-demand",
    icon: Clock,
    i18nKey: "onDemand",
    imageSlot: "phone",
  },
  {
    slug: "membership",
    icon: Star,
    i18nKey: "membership",
    imageSlot: "coolCalm",
  },
  {
    slug: "group-charter",
    icon: Users,
    i18nKey: "groupCharter",
    imageSlot: "corporate",
  },
  {
    slug: "destination-management",
    icon: MapPin,
    i18nKey: "destinationManagement",
    imageSlot: "ground",
  },
  {
    slug: "executive-protection",
    icon: Shield,
    i18nKey: "executiveProtection",
    imageSlot: "protection",
  },
] as const;

export function getService(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

export function getRelatedServices(slug: string, count = 3): readonly Service[] {
  return SERVICES.filter((s) => s.slug !== slug).slice(0, count);
}
