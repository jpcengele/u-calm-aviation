import { Link } from "react-router-dom";
import { brand } from "@/brand/config";
import { useDocumentMeta, canonical } from "@/lib/useDocumentMeta";

/**
 * U-Calm Aviation — Privacy notice.
 *
 * Concierge-voice statutory page covering inquiry handling, member-file
 * storage, transactional email, and the operator-panel NDA. Updated in
 * line with the rest of the U-CALM house's privacy posture.
 *
 * This is a public-facing notice — not the contract itself. Members
 * receive a fuller data-processing schedule at onboarding.
 */
const Privacy = () => {
  useDocumentMeta({
    title: "Privacy notice — U-Calm Aviation",
    description:
      "How U-Calm Aviation handles inquiries, member files, and operator-panel disclosures. Swiss FADP and EU GDPR aligned.",
    canonical: canonical("/legal/privacy"),
  });

  const today = new Date().toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <section className="bg-background border-b border-border">
        <div className="container py-16 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">
            Legal
          </p>
          <h1 className="mt-3 font-serif text-4xl md:text-5xl font-light text-foreground">
            Privacy notice
          </h1>
          <p className="mt-4 text-sm text-muted-foreground">Last updated: {today}</p>
        </div>
      </section>

      <section className="bg-background">
        <div className="container py-16 max-w-3xl">
          <div className="prose-quiet space-y-10 text-foreground/85 leading-relaxed">
            <div>
              <p>
                U-Calm Aviation is the aviation service line inside U-CALM, the concierge house. This notice describes how the desk handles personal information received through this website, by email at{" "}
                <a href={`mailto:${brand.inquiryEmail}`} className="text-primary-deep hover:underline">
                  {brand.inquiryEmail}
                </a>
                , or by referral. It applies to website visitors, prospective members, and existing members. It is written in plain English and is not legal advice.
              </p>
              <p className="mt-4">
                The data controller for U-Calm Aviation is U-CALM, registered in Switzerland. Members and prospective members may contact the privacy desk at{" "}
                <a href={`mailto:${brand.privacyEmail}`} className="text-primary-deep hover:underline">
                  {brand.privacyEmail}
                </a>{" "}
                with any question, request, or instruction relating to their personal information.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-foreground mb-4">What we collect</h2>
              <p>From the contact form on this site we collect only what the visitor enters: a name, an email address, and the body of the message. From email correspondence we hold whatever the visitor shares with us. From referrals we typically hold the introducer's note and any details the prospective member shares during the first conversation.</p>
              <p className="mt-4">For members, the file holds the operational detail required to arrange aviation, ground, household and protection: travel preferences, household members and dependants, dietary and accessibility requirements, residences and frequented destinations, payment authority, and the relationship history with the desk. We do not hold passport numbers or government identifiers on the central file unless aviation-authority compliance specifically requires it for a particular journey.</p>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-foreground mb-4">Why we hold it</h2>
              <p>To respond to inquiries and to arrange the work. The lawful basis is contract or, in the case of inquiries that do not become a relationship, our legitimate interest in responding considerately to people who write to us. Member arrangements are coordinated against this information; it is the file every specialist on the desk works from.</p>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-foreground mb-4">Where it lives</h2>
              <p>Inquiry submissions from this website are stored on Supabase in the European Union. Transactional notification emails are sent through Resend. Member files are held inside the U-CALM operational stack, hosted within the European Union, with access restricted to named specialists on the desk. We do not sell, rent, or otherwise share personal information with third parties for marketing purposes; we do not allow third-party trackers, advertising pixels, or analytics surveillance on this site.</p>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-foreground mb-4">Sharing with operators</h2>
              <p>To arrange flights, the aviation desk shares the minimum information operators require: passenger names, ages where regulator-required, special handling notes, and contact details for the day. All operators on the panel are bound by non-disclosure agreements that hold information to U-CALM standards. Where authority filings (slot, customs, immigration) require additional information, that is filed only as compliance demands and is otherwise held inside the desk.</p>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-foreground mb-4">How long we keep it</h2>
              <p>Inquiries that do not become a relationship are typically held for twelve months and then deleted, unless the inquirer asks us to keep them on file. Member files are held for the duration of the relationship and for a limited statutory window thereafter, as accounting and aviation-authority retention rules require.</p>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-foreground mb-4">Your rights</h2>
              <p>Under the Swiss Federal Act on Data Protection (FADP) and, where applicable, the EU General Data Protection Regulation (GDPR), individuals have rights of access, rectification, deletion, restriction, and data portability over their personal information. Members may exercise any of these rights by writing to{" "}
                <a href={`mailto:${brand.privacyEmail}`} className="text-primary-deep hover:underline">
                  {brand.privacyEmail}
                </a>
                . We respond within thirty days, often sooner.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-foreground mb-4">Cookies & tracking</h2>
              <p>This website does not set advertising cookies, third-party trackers, or analytics surveillance. Functional cookies (language preference, session continuity) are set only as the site itself requires, and are first-party.</p>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-foreground mb-4">Changes to this notice</h2>
              <p>We update this notice when our practices change or when the law requires it. The "Last updated" date at the top of the page reflects the most recent revision. Material changes are communicated to members directly through the desk; website visitors should consult this page periodically.</p>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-foreground mb-4">Contact</h2>
              <p>
                For any privacy question, request, or instruction, please write to{" "}
                <a href={`mailto:${brand.privacyEmail}`} className="text-primary-deep hover:underline">
                  {brand.privacyEmail}
                </a>
                . For general inquiries,{" "}
                <Link to="/contact" className="text-primary-deep hover:underline">
                  open a conversation
                </Link>{" "}
                with the concierge desk.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Privacy;
