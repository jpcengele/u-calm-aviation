import { useState, type FormEvent } from "react";
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
 * (Supabase project to be created when the site is deployed.)
 */
const Contact = () => {
  useDocumentMeta({
    title: "Contact — Open a conversation | U-Calm Aviation",
    description:
      "Write to the U-Calm Aviation desk in Lugano. Twenty-four-hour reachability, named specialists in English, Italian, French, German. A response within the working day, in the same voice that holds the rest of your arrangement.",
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
            How to reach us
          </p>
          <h1 className="mt-3 font-serif text-4xl md:text-6xl font-light text-background">
            Open a conversation.
          </h1>
        </div>
      </section>

      <section className="container py-20 max-w-2xl">
        <p className="text-lg text-foreground/85 leading-relaxed">
          Tell us briefly what you have in mind. A named specialist will respond personally — through the concierge relationship that already holds your other arrangements, or, if you are new to U-CALM, by way of a quiet introduction.
        </p>

        {state === "success" ? (
          <div className="mt-10 rounded-lg border border-border bg-card p-8 shadow-whisper">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-champagne">
              Thank you
            </p>
            <p className="mt-3 font-serif text-2xl text-primary-deep">
              We will be in touch.
            </p>
            <p className="mt-3 text-foreground/80 leading-relaxed">
              Your note has been received. A specialist will respond within one working day.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-10 rounded-lg border border-border bg-card p-8 shadow-whisper space-y-6"
          >
            <div>
              <label htmlFor="contact-name" className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground block">
                Name
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
                Email
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
                What can we arrange?
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
                Something did not go through: {errorMsg}. Please try again, or email {brand.inquiryEmail} directly.
              </p>
            )}

            <button
              type="submit"
              disabled={state === "submitting"}
              className="rounded-full bg-primary hover:bg-primary-deep px-8 py-3 text-primary-foreground font-medium transition-colors disabled:opacity-60"
            >
              {state === "submitting" ? "Sending..." : "Open a conversation"}
            </button>
          </form>
        )}

        <p className="mt-12 text-sm text-muted-foreground">
          Or write directly to <a href={`mailto:${brand.inquiryEmail}`} className="text-primary-deep hover:underline">{brand.inquiryEmail}</a>.
        </p>
      </section>

      {/* What to expect */}
      <section className="bg-linen">
        <div className="container py-20 max-w-4xl">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">
            What to expect
          </p>
          <h2 className="mt-4 font-serif text-3xl md:text-4xl font-normal text-foreground">
            How a first conversation tends to unfold.
          </h2>

          <div className="mt-12 grid md:grid-cols-3 gap-8">
            <article className="rounded-lg border border-border bg-card p-8 shadow-whisper">
              <p className="font-serif text-3xl text-primary-deep">01</p>
              <h3 className="mt-3 font-serif text-xl text-foreground">A reply within a working day</h3>
              <p className="mt-3 text-foreground/80 leading-relaxed">
                Notes received during European working hours are answered the same day; notes received overnight are held until first thing in the morning, in the language the member writes to us in. There is no auto-responder; the first message back is from a person who has read what you wrote.
              </p>
            </article>
            <article className="rounded-lg border border-border bg-card p-8 shadow-whisper">
              <p className="font-serif text-3xl text-primary-deep">02</p>
              <h3 className="mt-3 font-serif text-xl text-foreground">A short call, if useful</h3>
              <p className="mt-3 text-foreground/80 leading-relaxed">
                If the inquiry warrants it, we suggest a brief call — twenty minutes, in the working language of your choice, with one of the named specialists who would hold the relationship. The call is to discover whether the fit is right for both sides.
              </p>
            </article>
            <article className="rounded-lg border border-border bg-card p-8 shadow-whisper">
              <p className="font-serif text-3xl text-primary-deep">03</p>
              <h3 className="mt-3 font-serif text-xl text-foreground">A considered next step</h3>
              <p className="mt-3 text-foreground/80 leading-relaxed">
                If we proceed, the desk sets up the file, names a specialist to the relationship, and invites the first arrangement. If the timing or fit isn't right, we say so plainly — there is no membership pipeline to push anyone through.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Where we are */}
      <section className="bg-background">
        <div className="container py-20 grid md:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">
              Where the desk operates
            </p>
            <h2 className="mt-4 font-serif text-3xl md:text-4xl font-normal text-foreground">
              Lugano. Four working languages. Always reachable.
            </h2>
            <p className="mt-6 text-foreground/85 leading-relaxed">
              The aviation desk operates from Lugano, in southern Switzerland, with named specialists working in English, Italian, French, and German. The destination-management desk operates alongside, with named local fixers in every signature destination. Out-of-hours and weekend cover is genuine — the same desk, in shifts, never a queue.
            </p>
          </div>
          <dl className="space-y-6">
            <div>
              <dt className="text-xs font-bold uppercase tracking-[0.15em] text-primary-deep">Email</dt>
              <dd className="mt-2 text-foreground/85">
                <a href={`mailto:${brand.inquiryEmail}`} className="text-primary-deep hover:underline">{brand.inquiryEmail}</a>
              </dd>
            </div>
            <div>
              <dt className="text-xs font-bold uppercase tracking-[0.15em] text-primary-deep">Hours</dt>
              <dd className="mt-2 text-foreground/85 leading-relaxed">
                Twenty-four hours, three-hundred-and-sixty-five days, through the concierge desk. Inquiry replies during European working hours; out-of-hours operational coverage for enrolled members.
              </dd>
            </div>
            <div>
              <dt className="text-xs font-bold uppercase tracking-[0.15em] text-primary-deep">Languages</dt>
              <dd className="mt-2 text-foreground/85 leading-relaxed">
                English · Italiano · Français · Deutsch · Español and العربية on request, through named partner desks.
              </dd>
            </div>
            <div>
              <dt className="text-xs font-bold uppercase tracking-[0.15em] text-primary-deep">Privacy</dt>
              <dd className="mt-2 text-foreground/85 leading-relaxed">
                Inquiries and member files are held under non-disclosure across the U-CALM house, including on the operator panel. Identifying information is filed only where aviation-authority compliance requires.
              </dd>
            </div>
          </dl>
        </div>
      </section>
    </>
  );
};

export default Contact;
