import { useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { BrandImage } from "@/components/brand/BrandImage";
import { PAGE_HEROES } from "@/brand/imagery";
import { brand } from "@/brand/config";
import { supabase } from "@/integrations/supabase/client";
import {
  useDocumentMeta,
  canonical,
  ORGANIZATION_JSONLD,
  LOCALBUSINESS_JSONLD,
} from "@/lib/useDocumentMeta";

type SubmitState = "idle" | "submitting" | "success" | "error";

/**
 * U-Calm Aviation — Contact.
 *
 * Per Brand Book §00 (Six non-negotiables) and §07 (Voice), the form is
 * understated and the concierge register holds throughout. This page is
 * the primary action of the public site — for the small number of
 * member-referrals the brand book carves out.
 *
 * Backend: writes to the U-Calm Aviation Supabase project's
 * contact_inquiries table; webhook + Edge Function emails J-P via Resend.
 */
const Contact = () => {
  const { t } = useTranslation();
  useDocumentMeta({
    title: t("contact.meta.title"),
    description: t("contact.meta.description"),
    canonical: canonical("/contact"),
    jsonLd: [
      ORGANIZATION_JSONLD,
      LOCALBUSINESS_JSONLD,
      {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        url: "https://u-calmaviation.com/contact",
        about: { "@id": "https://u-calmaviation.com/#desk" },
      },
    ],
  });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [state, setState] = useState<SubmitState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setState("submitting");
    setErrorMsg("");

    const { error } = await supabase.from("contact_inquiries").insert({
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
    });

    if (error) {
      setState("error");
      setErrorMsg(error.message);
      return;
    }

    setState("success");
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <>
      <section className="relative">
        <div className="absolute inset-0 overflow-hidden">
          <BrandImage id={PAGE_HEROES.contact} priority className="w-full h-full object-cover" />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-overlay" />
        </div>
        <div className="relative container min-h-[50vh] flex flex-col justify-end py-20">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-champagne">
            {t("contact.hero.eyebrow")}
          </p>
          <h1 className="mt-3 font-serif text-4xl md:text-6xl font-light text-background">
            {t("contact.hero.headline")}
          </h1>
        </div>
      </section>

      <section className="container py-20 max-w-2xl">
        <p className="text-lg text-foreground/85 leading-relaxed">
          {t("contact.intro")}
        </p>

        {state === "success" ? (
          <div className="mt-10 rounded-lg border border-border bg-card p-8 shadow-whisper">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-champagne">
              {t("contact.success.eyebrow")}
            </p>
            <p className="mt-3 font-serif text-2xl text-primary-deep">
              {t("contact.success.headline")}
            </p>
            <p className="mt-3 text-foreground/80 leading-relaxed">
              {t("contact.success.body")}
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-10 rounded-lg border border-border bg-card p-8 shadow-whisper space-y-6"
          >
            <div>
              <label htmlFor="contact-name" className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground block">
                {t("contact.form.name")}
              </label>
              <input
                id="contact-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={state === "submitting"}
                className="mt-2 w-full rounded border border-border bg-background px-4 py-3 text-foreground focus:border-primary-deep focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="contact-email" className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground block">
                {t("contact.form.email")}
              </label>
              <input
                id="contact-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={state === "submitting"}
                className="mt-2 w-full rounded border border-border bg-background px-4 py-3 text-foreground focus:border-primary-deep focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="contact-message" className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground block">
                {t("contact.form.message")}
              </label>
              <textarea
                id="contact-message"
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={state === "submitting"}
                className="mt-2 w-full rounded border border-border bg-background px-4 py-3 text-foreground focus:border-primary-deep focus:outline-none"
              />
            </div>

            {state === "error" && (
              <p className="text-sm text-destructive">
                {t("contact.form.errorPrefix")} {errorMsg}. {t("contact.form.errorSuffix", { email: brand.inquiryEmail })}
              </p>
            )}

            <button
              type="submit"
              disabled={state === "submitting"}
              className="rounded-full bg-primary hover:bg-primary-deep px-8 py-3 text-primary-foreground font-medium transition-colors disabled:opacity-60"
            >
              {state === "submitting" ? t("contact.form.submitting") : t("contact.form.submit")}
            </button>
          </form>
        )}

        <p className="mt-12 text-sm text-muted-foreground">
          {t("contact.directWrite")}{" "}
          <a href={`mailto:${brand.inquiryEmail}`} className="text-primary-deep hover:underline">{brand.inquiryEmail}</a>.
        </p>
      </section>

      {/* What to expect */}
      <section className="bg-linen">
        <div className="container py-20 max-w-4xl">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">
            {t("contact.expectations.eyebrow")}
          </p>
          <h2 className="mt-4 font-serif text-3xl md:text-4xl font-normal text-foreground">
            {t("contact.expectations.headline")}
          </h2>

          <div className="mt-12 grid md:grid-cols-3 gap-8">
            {(["step1", "step2", "step3"] as const).map((stepKey, idx) => (
              <article key={stepKey} className="rounded-lg border border-border bg-card p-8 shadow-whisper">
                <p className="font-serif text-3xl text-primary-deep">{`0${idx + 1}`}</p>
                <h3 className="mt-3 font-serif text-xl text-foreground">
                  {t(`contact.expectations.${stepKey}.title`)}
                </h3>
                <p className="mt-3 text-foreground/80 leading-relaxed">
                  {t(`contact.expectations.${stepKey}.body`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Where we are */}
      <section className="bg-background">
        <div className="container py-20 grid md:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">
              {t("contact.whereWeAre.eyebrow")}
            </p>
            <h2 className="mt-4 font-serif text-3xl md:text-4xl font-normal text-foreground">
              {t("contact.whereWeAre.headline")}
            </h2>
            <p className="mt-6 text-foreground/85 leading-relaxed">
              {t("contact.whereWeAre.body")}
            </p>
          </div>
          <dl className="space-y-6">
            <div>
              <dt className="text-xs font-bold uppercase tracking-[0.15em] text-primary-deep">
                {t("contact.whereWeAre.emailLabel")}
              </dt>
              <dd className="mt-2 text-foreground/85">
                <a href={`mailto:${brand.inquiryEmail}`} className="text-primary-deep hover:underline">{brand.inquiryEmail}</a>
              </dd>
            </div>
            <div>
              <dt className="text-xs font-bold uppercase tracking-[0.15em] text-primary-deep">
                {t("contact.whereWeAre.hoursLabel")}
              </dt>
              <dd className="mt-2 text-foreground/85 leading-relaxed">
                {t("contact.whereWeAre.hoursValue")}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-bold uppercase tracking-[0.15em] text-primary-deep">
                {t("contact.whereWeAre.languagesLabel")}
              </dt>
              <dd className="mt-2 text-foreground/85 leading-relaxed">
                {t("contact.whereWeAre.languagesValue")}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-bold uppercase tracking-[0.15em] text-primary-deep">
                {t("contact.whereWeAre.privacyLabel")}
              </dt>
              <dd className="mt-2 text-foreground/85 leading-relaxed">
                {t("contact.whereWeAre.privacyValue")}
              </dd>
            </div>
          </dl>
        </div>
      </section>
    </>
  );
};

export default Contact;
