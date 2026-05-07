import { Link } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";
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
 *
 * Inline links are handled via the <Trans> component with numeric
 * placeholder children — preserves localisation while keeping the JSX
 * structure (mailto: anchors, <Link> to /contact) untranslated.
 */
const Privacy = () => {
  const { t, i18n } = useTranslation();
  useDocumentMeta({
    title: t("privacy.meta.title"),
    description: t("privacy.meta.description"),
    canonical: canonical("/legal/privacy"),
  });

  // Date format hint follows the active locale; `en-GB` style for English,
  // standard locale-tagged format otherwise.
  const today = new Date().toLocaleDateString(i18n.language || "en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <section className="bg-background border-b border-border">
        <div className="container py-16 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">
            {t("privacy.eyebrow")}
          </p>
          <h1 className="mt-3 font-serif text-4xl md:text-5xl font-light text-foreground">
            {t("privacy.headline")}
          </h1>
          <p className="mt-4 text-sm text-muted-foreground">
            {t("common.lastUpdated")}: {today}
          </p>
        </div>
      </section>

      <section className="bg-background">
        <div className="container py-16 max-w-3xl">
          <div className="prose-quiet space-y-10 text-foreground/85 leading-relaxed">
            <div>
              <p>
                <Trans
                  i18nKey="privacy.intro.p1"
                  values={{ inquiryEmail: brand.inquiryEmail }}
                  components={[
                    <a href={`mailto:${brand.inquiryEmail}`} className="text-primary-deep hover:underline" />,
                  ]}
                />
              </p>
              <p className="mt-4">
                <Trans
                  i18nKey="privacy.intro.p2"
                  values={{ privacyEmail: brand.privacyEmail }}
                  components={[
                    <a href={`mailto:${brand.privacyEmail}`} className="text-primary-deep hover:underline" />,
                  ]}
                />
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-foreground mb-4">{t("privacy.collect.title")}</h2>
              <p>{t("privacy.collect.p1")}</p>
              <p className="mt-4">{t("privacy.collect.p2")}</p>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-foreground mb-4">{t("privacy.why.title")}</h2>
              <p>{t("privacy.why.body")}</p>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-foreground mb-4">{t("privacy.where.title")}</h2>
              <p>{t("privacy.where.body")}</p>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-foreground mb-4">{t("privacy.operators.title")}</h2>
              <p>{t("privacy.operators.body")}</p>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-foreground mb-4">{t("privacy.retention.title")}</h2>
              <p>{t("privacy.retention.body")}</p>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-foreground mb-4">{t("privacy.rights.title")}</h2>
              <p>
                <Trans
                  i18nKey="privacy.rights.body"
                  values={{ privacyEmail: brand.privacyEmail }}
                  components={[
                    <a href={`mailto:${brand.privacyEmail}`} className="text-primary-deep hover:underline" />,
                  ]}
                />
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-foreground mb-4">{t("privacy.cookies.title")}</h2>
              <p>{t("privacy.cookies.body")}</p>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-foreground mb-4">{t("privacy.changes.title")}</h2>
              <p>{t("privacy.changes.body")}</p>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-foreground mb-4">{t("privacy.contact.title")}</h2>
              <p>
                <Trans
                  i18nKey="privacy.contact.body"
                  values={{ privacyEmail: brand.privacyEmail }}
                  components={[
                    <a href={`mailto:${brand.privacyEmail}`} className="text-primary-deep hover:underline" />,
                    <Link to="/contact" className="text-primary-deep hover:underline" />,
                  ]}
                />
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Privacy;
