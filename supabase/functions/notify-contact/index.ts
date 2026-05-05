// Edge Function: notify-contact (U-Calm Aviation)
//
// Triggered by a Supabase Database Webhook on INSERT into contact_inquiries.
// Sends an email notification via Resend so J-P sees new inquiries
// immediately in his Gmail inbox.
//
// Environment secrets required (set in Supabase → Project Settings →
// Edge Functions → Secrets, or via `supabase secrets set`):
//
//   RESEND_API_KEY  — the `re_...` key from the existing "u-calm" Resend
//                     account; create a new key named "u-calm-aviation"
//                     so usage shows up separately from the concierge key.
//   NOTIFY_EMAIL    — (optional) override destination. Defaults to
//                     flyhigh@u-calmaviation.com once the Google Workspace
//                     alias is live; until then, set to jp@u-calm.com so
//                     notifications still land somewhere reachable.
//   FROM_DOMAIN     — (optional) override sender domain. Defaults to
//                     resend.dev (use until u-calmaviation.com is verified
//                     as a sending domain on Resend).
//
// Schema expected on the contact_inquiries table:
//   id (uuid), name (text), email (text), message (text), created_at (timestamptz)
// See: supabase/migrations/20260503_120000_contact_inquiries.sql

import { serve } from "https://deno.land/std@0.208.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const NOTIFY_EMAIL = Deno.env.get("NOTIFY_EMAIL") || "flyhigh@u-calmaviation.com";
const FROM_DOMAIN = Deno.env.get("FROM_DOMAIN") || "resend.dev";
const FROM_EMAIL =
    FROM_DOMAIN === "resend.dev"
        ? "U-Calm Aviation <onboarding@resend.dev>"
        : `U-Calm Aviation <flyhigh@${FROM_DOMAIN}>`;

interface InquiryRecord {
    id?: string;
    name: string;
    email: string;
    message?: string;
    created_at?: string;
}

interface WebhookPayload {
    type?: string;
    table?: string;
    record?: InquiryRecord;
}

serve(async (req: Request) => {
    if (req.method !== "POST") {
        return new Response("Method not allowed", { status: 405 });
    }

    if (!RESEND_API_KEY) {
        return new Response("RESEND_API_KEY not configured", { status: 500 });
    }

    let payload: WebhookPayload;
    try {
        payload = await req.json();
    } catch {
        return new Response("Invalid JSON body", { status: 400 });
    }

    const record = payload?.record;
    if (!record || !record.email || !record.name) {
        return new Response("Missing required fields in record", { status: 400 });
    }

    const submittedAt = record.created_at
        ? new Date(record.created_at).toLocaleString("en-GB", { timeZone: "Europe/Zurich" })
        : new Date().toLocaleString("en-GB", { timeZone: "Europe/Zurich" });

    // Brand-voice email body — concierge register, not auto-mail-tone.
    // Deep Teal in headings, Champagne in the rule, Ivory in the surface.
    const html = `
        <div style="font-family: 'Cormorant Garamond', Georgia, serif; max-width: 640px; margin: 0; padding: 24px; background: #FAF7F2; color: #1C2B3A;">
            <p style="font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: #2A8A98; margin: 0 0 16px;">
                U-Calm Aviation · new inquiry
            </p>
            <h1 style="font-family: 'Cormorant Garamond', Georgia, serif; font-weight: 300; font-size: 28px; color: #1C2B3A; margin: 0 0 16px;">
                A note has arrived.
            </h1>
            <p style="font-family: 'Lato', Arial, sans-serif; font-size: 14px; line-height: 1.6; color: #1C2B3A; margin: 0 0 24px;">
                Submitted via <a href="https://u-calmaviation.com/contact" style="color: #2A8A98;">u-calmaviation.com</a> at ${submittedAt} (Europe/Zurich).
            </p>

            <table style="font-family: 'Lato', Arial, sans-serif; font-size: 14px; line-height: 1.6; border-collapse: collapse; width: 100%;">
                <tr>
                    <td style="padding: 6px 16px 6px 0; vertical-align: top; color: #6B7785; width: 90px;"><strong>Name</strong></td>
                    <td style="padding: 6px 0;">${escapeHtml(record.name)}</td>
                </tr>
                <tr>
                    <td style="padding: 6px 16px 6px 0; vertical-align: top; color: #6B7785;"><strong>Email</strong></td>
                    <td style="padding: 6px 0;"><a href="mailto:${escapeHtml(record.email)}" style="color: #2A8A98;">${escapeHtml(record.email)}</a></td>
                </tr>
            </table>

            <p style="font-family: 'Lato', Arial, sans-serif; font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: #6B7785; margin: 28px 0 8px;">
                What can we arrange?
            </p>
            <p style="font-family: 'Cormorant Garamond', Georgia, serif; font-size: 17px; line-height: 1.55; color: #1C2B3A; white-space: pre-wrap; margin: 0;">
                ${escapeHtml(record.message || "(no message provided)")}
            </p>

            <hr style="margin: 32px 0 16px; border: none; border-top: 1px solid #BCB17A;">
            <p style="font-family: 'Lato', Arial, sans-serif; font-size: 11px; color: #6B7785; line-height: 1.5;">
                Reply directly to this email to reach the inquirer (Reply-To is set to ${escapeHtml(record.email)}).<br>
                Inquiry ID: ${escapeHtml(record.id || "unknown")}
            </p>
        </div>
    `;

    // ─────────────────────────────────────────────────────────────────
    // Email 1 — desk notification (to J-P / flyhigh@u-calmaviation.com)
    // ─────────────────────────────────────────────────────────────────

    const deskRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${RESEND_API_KEY}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            from: FROM_EMAIL,
            to: [NOTIFY_EMAIL],
            reply_to: record.email,
            subject: `U-Calm Aviation — new inquiry from ${record.name}`,
            html,
        }),
    });

    if (!deskRes.ok) {
        const errorText = await deskRes.text();
        console.error("Resend API error (desk notification):", deskRes.status, errorText);
        return new Response(`Resend error (desk): ${errorText}`, { status: 502 });
    }

    const deskResult = await deskRes.json();

    // ─────────────────────────────────────────────────────────────────
    // Email 2 — inquirer acknowledgement (back to whoever submitted)
    // ─────────────────────────────────────────────────────────────────
    //
    // Concierge-voice receipt. Confirms arrival, sets the response
    // expectation (within the working day), names the desk's geography
    // and languages, gently positions U-Calm Aviation inside U-CALM.
    // Reply-To is set to NOTIFY_EMAIL so a reply lands at the desk, not
    // at a no-reply address.

    const ackHtml = buildAckHtml(record.name);

    const ackRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${RESEND_API_KEY}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            from: FROM_EMAIL,
            to: [record.email],
            reply_to: NOTIFY_EMAIL,
            subject: "We have your note — U-Calm Aviation",
            html: ackHtml,
        }),
    });

    if (!ackRes.ok) {
        // Don't fail the whole webhook if the acknowledgement fails —
        // the desk notification already went through. Log it and let the
        // function return success so the database webhook doesn't retry
        // and double-send the desk email.
        const errorText = await ackRes.text();
        console.error(
            "Resend API error (inquirer acknowledgement, non-fatal):",
            ackRes.status,
            errorText,
        );
    }

    const ackResult = ackRes.ok ? await ackRes.json() : null;

    return new Response(
        JSON.stringify({
            success: true,
            desk_resend_id: deskResult.id,
            ack_resend_id: ackResult?.id ?? null,
            ack_sent: ackRes.ok,
        }),
        {
            status: 200,
            headers: { "Content-Type": "application/json" },
        },
    );
});

function buildAckHtml(name: string): string {
    return `
        <div style="font-family: 'Cormorant Garamond', Georgia, serif; max-width: 640px; margin: 0; padding: 24px; background: #FAF7F2; color: #1C2B3A;">
            <p style="font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: #2A8A98; margin: 0 0 16px;">
                U-Calm Aviation · acknowledgement
            </p>
            <h1 style="font-family: 'Cormorant Garamond', Georgia, serif; font-weight: 300; font-size: 32px; color: #1C2B3A; margin: 0 0 24px; line-height: 1.15;">
                We have your note, ${escapeHtml(firstNameOnly(name))}.
            </h1>
            <p style="font-family: 'Cormorant Garamond', Georgia, serif; font-size: 18px; line-height: 1.55; color: #1C2B3A; margin: 0 0 16px;">
                A named specialist will respond personally — through the concierge relationship that already holds your other arrangements, or, if you are new to U-CALM, by way of a quiet introduction. Notes received during European working hours are answered the same day; notes received overnight are held until first thing in the morning, in the language you wrote to us in.
            </p>
            <p style="font-family: 'Cormorant Garamond', Georgia, serif; font-size: 18px; line-height: 1.55; color: #1C2B3A; margin: 0 0 24px;">
                There is nothing further we need from you in the meantime. We will be in touch.
            </p>

            <hr style="margin: 32px 0 20px; border: none; border-top: 1px solid #BCB17A;">

            <p style="font-family: 'Lato', Arial, sans-serif; font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: #6B7785; margin: 0 0 6px;">
                The desk
            </p>
            <p style="font-family: 'Lato', Arial, sans-serif; font-size: 14px; line-height: 1.6; color: #1C2B3A; margin: 0 0 4px;">
                Lugano · Milan · London. Twenty-four hours, three-hundred-and-sixty-five days.
            </p>
            <p style="font-family: 'Lato', Arial, sans-serif; font-size: 14px; line-height: 1.6; color: #1C2B3A; margin: 0 0 16px;">
                English · Italiano · Français · Deutsch
            </p>

            <p style="font-family: 'Lato', Arial, sans-serif; font-size: 11px; color: #6B7785; line-height: 1.55; margin: 0;">
                This is an acknowledgement of receipt. A specialist will write to you in person from this address.<br>
                If your need is urgent, you may reply directly to this email and the desk will see it.
            </p>
            <p style="font-family: 'Cormorant Garamond', Georgia, serif; font-style: italic; font-size: 16px; color: #2A8A98; margin: 24px 0 0;">
                Aviation, arranged.
            </p>
        </div>
    `;
}

function firstNameOnly(fullName: string): string {
    // The concierge register prefers "Dear James" over "Dear James Smith"
    // in an automated touch — feels less robotic. Strip after the first
    // whitespace; if the input has only one word, keep it as-is.
    const trimmed = fullName.trim();
    const space = trimmed.indexOf(" ");
    return space === -1 ? trimmed : trimmed.slice(0, space);
}

function escapeHtml(s: string): string {
    return s
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}
