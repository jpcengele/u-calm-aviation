import { createClient } from "@supabase/supabase-js";

/**
 * Supabase client.
 *
 * In production deploys (Cloudflare Pages), VITE_SUPABASE_URL and
 * VITE_SUPABASE_PUBLISHABLE_KEY are baked in at build time and the form
 * submits work normally.
 *
 * In local dev without a .env.local, the client falls back to harmless
 * placeholder values so the app boots. Form submission will fail (with a
 * clear runtime error) until real env vars are provided. This avoids the
 * "blank page" failure mode where a top-level throw kills the whole app.
 */
const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseKey =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || "placeholder-key";

if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY) {
  // eslint-disable-next-line no-console
  console.warn(
    "[supabase] Missing VITE_SUPABASE_URL or VITE_SUPABASE_PUBLISHABLE_KEY. " +
      "Form submissions will fail until you set them in .env.local or your deploy environment.",
  );
}

export const supabase = createClient(supabaseUrl, supabaseKey);
