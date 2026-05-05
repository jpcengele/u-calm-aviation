import { Plane, Clock, Shield, Star, MapPin, Users, type LucideIcon } from "lucide-react";

/**
 * U-Calm Aviation — service catalogue (6 entries).
 *
 * Adopted from Ascent's structure on 2026-05-03 per J-P's decision
 * (project_u_calm_aviation_decisions.md). Six services total: aviation
 * splits into Bespoke charter / On-demand / Membership / Group, plus
 * Destination management and Executive protection.
 *
 * Each entry has a slug — used for /services/:slug route. Copy lives
 * inline (not yet i18n) to mirror the rest of the site's English-first
 * pattern. Per Brand Book v2.1 founding refusals, NO published pricing
 * appears anywhere in this catalogue, including on Membership.
 */
export interface Service {
  slug: string;
  /** Lucide icon used on cards and detail hero */
  icon: LucideIcon;
  /** Card-level title (short) */
  title: string;
  /** One-sentence card subtitle */
  subtitle: string;
  /** 1-2 sentence description on cards */
  cardDescription: string;
  /** 3 short feature bullets on cards */
  cardFeatures: readonly string[];
  /** Detail-page hero tagline (italic, serif) */
  tagline: string;
  /** Detail-page main paragraph(s) */
  longDescription: readonly string[];
  /** Detail-page key benefits (4-6 items, shown with checks) */
  keyBenefits: readonly string[];
  /** Detail-page features grid (6-9 items, shown with bullets) */
  features: readonly string[];
  /** "How to begin" — replaces Ascent's pricing card per brand book founding refusals */
  howToBegin: string;
  /** Imagery slot key from src/brand/imagery.ts SERVICES_SCENES */
  imageSlot: "phone" | "ground" | "relocations" | "corporate" | "protection" | "travelEvents" | "aviation" | "coolCalm";
}

export const SERVICES: readonly Service[] = [
  {
    slug: "bespoke-charter",
    icon: Plane,
    title: "Bespoke charter",
    subtitle: "The flight, sourced and held to the day's weight.",
    cardDescription:
      "The aircraft is matched to the mission, the party, and the day. Sourced from a vetted operator panel, proposed in your concierge's voice, held against the file the rest of your arrangement already sits on.",
    cardFeatures: [
      "Vetted operator panel (ARGUS Platinum / Wyvern / IS-BAO Stage 2 equivalent)",
      "Light through ultra-long-range cabins, helicopters, group lift",
      "One member statement; no separate broker invoice",
    ],
    tagline: "The aircraft chosen for the day, not the menu.",
    longDescription: [
      "Bespoke charter is U-Calm Aviation's primary register. A short note to the concierge — date, city pair, party — is enough to begin. The aviation specialist sources the aircraft from the vetted operator panel, matched to the route, the weight of the day, and the preferences already on the member's file. At most three options return, in plain language, in the concierge's voice.",
      "The work behind the proposal is held quietly: operator vetting against ARGUS Platinum, Wyvern Wingman, or IS-BAO Stage 2 equivalent; insurance levels at the upper bound of practice; crew currency re-confirmed before each flight. The member sees one option chosen, one aircraft held, one car at wheels-down, one statement at month-end.",
    ],
    keyBenefits: [
      "Aircraft category matched to the route — never a single house default",
      "Crew briefed on the preferences already held on file",
      "Cars and ground at both ends, woven into the same itinerary",
      "One U-CALM monthly statement; no separate broker invoice",
      "Same named specialist throughout — never a queue, never a stranger",
    ],
    features: [
      "Light, mid, super-mid, heavy, ultra-long-range cabins",
      "Helicopters for valley and event transfers",
      "Slot-restricted European fields handled (Lugano, London City, Alpine)",
      "FBO selection and ground coordination at both ends",
      "Catering and cabin preferences from member file",
      "Privacy held under non-disclosure across the operator panel",
    ],
    howToBegin:
      "A short note to the concierge — date, city pair, party — is all that is needed to start. A specialist responds within the working day with a considered proposal.",
    imageSlot: "aviation",
  },

  {
    slug: "on-demand",
    icon: Clock,
    title: "On-demand",
    subtitle: "The four-hour notice window for the day that did not go as planned.",
    cardDescription:
      "Enrolled members hold a four-hour notice window on eligible aircraft. For the call no one wanted to have to make — the meeting that has to happen, the relative that has to be reached, the day that has slipped sideways — we are already moving while the conversation is still on the line.",
    cardFeatures: [
      "Four-hour notice on eligible aircraft for enrolled members",
      "Twenty-four-hour reachability through the concierge desk",
      "Same standards held — no compromise on operator vetting under pressure",
    ],
    tagline: "Already moving while the conversation is still on the line.",
    longDescription: [
      "Most journeys are arranged with a comfortable lead time. Some are not. On-demand is the line we hold for the day that did not go as planned — the urgent meeting, the medical recall, the family situation that needs the member somewhere by tomorrow morning.",
      "Enrolled members hold a four-hour notice window on eligible aircraft within the operator panel. The desk does not change its standards under pressure: vetting, insurance, and crew currency are held identically; what shortens is the lead time, not the rigour. The member places the call once; the desk does the rest.",
    ],
    keyBenefits: [
      "Four-hour minimum notice on eligible aircraft for enrolled members",
      "Twenty-four-hour, three-hundred-and-sixty-five-day desk coverage",
      "No upcharge surprises — pricing held to membership rate band",
      "Cars at both ends mobilised in parallel, not after the fact",
      "Single named specialist — never re-explained from scratch",
    ],
    features: [
      "Four-hour notice window on eligible aircraft",
      "Same operator-panel standards under time pressure",
      "Pre-authorised payment on file — no friction at the moment of need",
      "Concurrent ground mobilisation (cars, household alerted, medical if relevant)",
      "Slot-restriction workarounds on European fields",
      "Privacy held identically — no thinning of NDA under speed",
    ],
    howToBegin:
      "On-demand availability is opened for enrolled members at onboarding. A short conversation with the concierge confirms eligibility, payment authority, and the preferred reach number for short-notice calls.",
    imageSlot: "phone",
  },

  {
    slug: "membership",
    icon: Star,
    title: "Membership",
    subtitle: "Aviation, included in the U-CALM relationship.",
    cardDescription:
      "U-Calm Aviation is held inside U-CALM membership; it is not sold separately, and it is not tiered. The flight, the ground, the cars at both ends — all sit on the same monthly statement as the rest of the member's arrangements.",
    cardFeatures: [
      "Aviation included in U-CALM membership — no separate sign-up",
      "No tiered catalogue — the work is bespoke to the member",
      "One file, one specialist, one statement",
    ],
    tagline: "One membership. One file. One concierge. Everything else follows.",
    longDescription: [
      "U-Calm Aviation is the aviation service line inside U-CALM, the concierge house. There is no separate aviation membership to sign up for; existing U-CALM members receive aviation as a continuous extension of the same relationship, on the same file, against the same statement.",
      "The house does not publish a tiered catalogue — Bronze, Silver, Gold, Platinum — because the work is bespoke to each member, and price-list aviation tends to encourage the wrong kind of conversation. What the member receives instead is a primary specialist named to them, a four-hour notice window on eligible aircraft, member rates applied across the operator panel, and a single monthly statement that holds aviation alongside the rest of the arrangement.",
      "Onboarding is by referral or quiet introduction. The first conversation is short, in person or on a call, and is about whether the relationship fits both sides — never about closing a deal.",
    ],
    keyBenefits: [
      "Aviation included in U-CALM membership — no separate sign-up or tier",
      "Same named specialist on every booking — never a stranger, never a queue",
      "Member rates applied across the operator panel",
      "One monthly statement — aviation, ground, household together",
      "Four-hour notice window on eligible aircraft",
      "Continuous file — preferences carry across every booking",
    ],
    features: [
      "Concierge-led onboarding — referral or quiet introduction",
      "Member file holds preferences across every booking",
      "Twenty-four-hour reachability through the concierge desk",
      "Four working languages held in-house",
      "Aviation, destination management, and protection on one relationship",
      "No published tier; no promotional pricing; no second invoice",
    ],
    howToBegin:
      "Membership begins with a short, considered conversation — by introduction, in person or on a call. We say plainly whether the fit is right; if it is, the file is set up and a primary specialist is named to the relationship. There is no membership pipeline to push anyone through.",
    imageSlot: "coolCalm",
  },

  {
    slug: "group-charter",
    icon: Users,
    title: "Group charter",
    subtitle: "Parties of fifteen and above, held to the same standards.",
    cardDescription:
      "Weddings, off-sites, family movements, sports delegations. Airliners and bizliners sourced from the same vetted panel; ground, accommodation, and tables coordinated against a single itinerary that does not split when the party lands.",
    cardFeatures: [
      "Airliners and bizliners (15–60+ seats) on the same vetted panel",
      "Single itinerary across the full party — no splitting at arrival",
      "Co-ordinated ground, accommodation, dining for everyone",
    ],
    tagline: "Fifteen people, one itinerary, one voice.",
    longDescription: [
      "Group lift is where the operational discipline of the desk shows most clearly. A wedding party of forty does not arrive as forty individual bookings; it arrives as one arrangement, on one itinerary, with one specialist holding the entire shape — the aircraft, the ground at the FBO, the cars in convoy, the rooms held at the hotel, the tables already laid.",
      "Aircraft for groups are sourced from the same operator panel as bespoke charter, including airliners and bizliners between fifteen and sixty seats and beyond. Lead time is naturally longer — ten to fourteen days minimum, longer for off-sites and weddings — but the principle is identical: the right aircraft for the day, the same standards held, one file, one statement.",
    ],
    keyBenefits: [
      "Single itinerary held across the entire party",
      "Airliners and bizliners (15–60+) sourced from the same vetted panel",
      "Co-ordinated ground, accommodation, dining for the full party",
      "Children, dogs, dietary requirements held on the central file",
      "One specialist; no fragmentation across the day",
    ],
    features: [
      "Weddings, off-sites, family movements, sports and corporate delegations",
      "Pre-departure passenger manifest co-ordination",
      "Multi-vehicle ground convoys at both ends",
      "Hotel block management at U-CALM preferred properties",
      "Dietary, accessibility, and special-requirements register",
      "Cabin briefing tailored to occasion, not template",
    ],
    howToBegin:
      "Group bookings benefit from earlier conversation — ten to fourteen days minimum, longer for weddings and off-sites. A short call with the concierge gathers the shape of the day; the desk returns with a single, considered proposal.",
    imageSlot: "corporate",
  },

  {
    slug: "destination-management",
    icon: MapPin,
    title: "Destination management",
    subtitle: "Ground, woven into the itinerary.",
    cardDescription:
      "Cars at both ends, accommodation at U-CALM's preferred properties or your own, restaurant tables, household coordination, medical on standby, named local fixers in every signature destination — all held on the same itinerary as the flight.",
    cardFeatures: [
      "Cars at both ends — driver waiting at wheels-down",
      "Named local fixers in every signature destination",
      "Coordination absorbed into membership; pass-through costs itemised",
    ],
    tagline: "The day continues, in the same voice, from the FBO to the front door.",
    longDescription: [
      "Destination management is the second half of every aviation arrangement. The aircraft arrives; the day continues. The driver is at wheels-down, not at published ETA. The housekeeper has been preparing since Wednesday. The table is held without anyone needing to ask. The member is met by their day, not by a logistics queue.",
      "The destination desk operates alongside the aviation desk, with named local fixers in every signature destination, four working languages held in-house, and named partner desks in the further-afield places. Coordination is absorbed into the membership; pass-through costs (hotel, car, restaurant) appear itemised on the same monthly statement.",
    ],
    keyBenefits: [
      "Cars at both ends, with drivers briefed on preferences from the member file",
      "Accommodation at U-CALM's preferred properties or the member's own",
      "Restaurant, table, household, medical coordination — all on one itinerary",
      "Named local fixers in every signature destination",
      "Pass-through costs itemised on the U-CALM monthly statement",
      "Driver waiting at wheels-down, not at published ETA",
    ],
    features: [
      "Switzerland, France & Monaco, Italy, UK, Iberia, Greece, Adriatic, Central Europe, North Africa & Middle East, North America, Caribbean, Asia, further afield",
      "Four-language coverage in-house; partners for Spanish/Arabic",
      "U-CALM preferred-property network",
      "Restaurant, household, medical, security on the same itinerary",
      "Multi-leg trip coordination across multiple destinations",
      "Real-time on-day support via the concierge desk",
    ],
    howToBegin:
      "Destination management opens automatically alongside any aviation arrangement; or it can be requested independently for a member's own travel that did not start with U-Calm Aviation. The concierge brings it into the file.",
    imageSlot: "ground",
  },

  {
    slug: "executive-protection",
    icon: Shield,
    title: "Executive protection",
    subtitle: "Coordinated with the flight.",
    cardDescription:
      "Risk assessment, close protection, secure ground, advance party — coordinated through the same partner across every U-CALM service line, integrated with aviation where the mission requires.",
    cardFeatures: [
      "Single trusted partner across every U-CALM service line",
      "Risk-matrix-driven mandatory assessment for sensitive destinations",
      "Optional on every other mission; integrated with aviation where it fits",
    ],
    tagline: "Held in the same hand, on the same itinerary.",
    longDescription: [
      "Executive protection is held in partnership with a single, carefully chosen operator used across every U-CALM service line. The choice of one partner — rather than a marketplace — is deliberate: continuity of standards, continuity of discretion, and a single relationship the member can hold over many years.",
      "For destinations on the U-CALM internal risk matrix, an assessment is mandatory; for all other missions it is offered, optional, and integrated with the rest of the arrangement at the member's discretion. Existing household security details are integrated where present; we lead or support as required.",
    ],
    keyBenefits: [
      "Single trusted partner across all U-CALM service lines",
      "Mandatory risk assessment for sensitive destinations",
      "Optional and integrated for all other missions",
      "Existing household details integrated; we lead or support as required",
      "On the same itinerary as the flight and the ground — never a third inbox",
    ],
    features: [
      "Pre-trip risk assessment against U-CALM internal matrix",
      "Close protection (single, team, advance party)",
      "Secure ground transport with vetted drivers",
      "Residential and event protection",
      "Executive medical capability on request",
      "Privacy and discretion held to the same NDA standard as aviation",
    ],
    howToBegin:
      "Protection is offered during onboarding for every member; mandatory for destinations on the internal risk matrix; otherwise opened on request. A short conversation with the concierge brings it into the file.",
    imageSlot: "protection",
  },
] as const;

export function getService(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

export function getRelatedServices(slug: string, count = 3): readonly Service[] {
  return SERVICES.filter((s) => s.slug !== slug).slice(0, count);
}
