# U-Calm Aviation — Deploy Runbook

Step-by-step from "code is good and imagery is curated" to "live site at
`https://u-calmaviation.com`". Same shape as `IMAGERY_RUNBOOK.md`. Each
step says exactly what to do, where to do it, and what success looks
like.

Estimated time end-to-end: **~90 minutes** of focused click-through, of
which ~20 minutes is waiting for DNS / SSL.

Prereqs you'll need open in tabs:
- https://supabase.com/dashboard
- https://resend.com/api-keys
- https://github.com (signed in as `jpcengele`)
- https://dash.cloudflare.com
- https://admin.google.com (signed in as `jp@u-calm.com`)
- Your domain registrar for `u-calmaviation.com` (look at your domain receipt — it's whichever of Gandi / GoDaddy / etc. you bought it through)

---

## 1. Supabase project

**Where:** https://supabase.com/dashboard → **New project**

| Field | Value |
|---|---|
| Name | `u-calm-aviation` |
| Database password | Generate a strong one. Save to 1Password / your keychain. You won't need it for the app, but you'll want it for SQL editor access. |
| Region | `eu-central-1 (Frankfurt)` — same as `u-calm-concierge` |
| Plan | Free (Nano) — fine for a marketing site |

Click **Create new project**, wait ~2 minutes for it to provision.

When it's ready, go to **Project Settings → API** in the left nav.
Copy two values into a temporary note:

- **Project URL** → starts with `https://...supabase.co`
- **anon public key** → the long `eyJ…` JWT (NOT the service_role key)

You'll paste these into Cloudflare Pages later.

✅ Done when: project shows "Active" (green dot), and you have the URL +
anon key in a note.

---

## 2. Run the migration (creates `contact_inquiries` table + RLS)

**Where:** Project dashboard → **SQL editor** in the left nav.

Open `supabase/migrations/20260503_120000_contact_inquiries.sql` from
your local repo (TextEdit is fine — VS Code if you have it). Copy the
entire file contents.

In the SQL editor:
1. Click **+ New query**
2. Paste the file contents
3. Click **Run** (or Cmd-Enter)

You should see "Success. No rows returned." in the result panel.

Verify:
- Left nav → **Table editor** → `public.contact_inquiries` should be
  listed with 4 columns (`id`, `name`, `email`, `message`, `created_at`)
- Click the table → **Authentication → Policies** should show two
  policies: "anon can insert..." and "authenticated can insert..."

✅ Done when: the table exists with the two insert policies enabled.

---

## 3. Resend API key (in your existing Resend account)

**Where:** https://resend.com/api-keys

You already have a Resend account named "u-calm" (created during the
concierge build). **Don't create a new account** — just add a new key
inside it so usage shows up separately:

1. Click **Create API Key**
2. Name: `u-calm-aviation`
3. Permission: `Sending access` (read-only is enough for sends; full
   access if you want to manage from API later)
4. Click **Create**
5. **Copy the `re_…` key immediately** — you can't view it again.

✅ Done when: you have the `re_…` key in a temporary note.

---

## 4. Set Edge Function secrets in Supabase

**Where:** Supabase dashboard → **Project Settings → Edge Functions →
Secrets** in the left nav.

Add these three secrets (click **Add new secret** for each):

| Name | Value |
|---|---|
| `RESEND_API_KEY` | The `re_…` key from step 3 |
| `NOTIFY_EMAIL` | `jp@u-calm.com` for now (we'll switch to `flyhigh@u-calmaviation.com` after step 9 lands the alias) |
| `FROM_DOMAIN` | `resend.dev` for now (until step 9b verifies u-calmaviation.com as a sending domain) |

Click **Save** after each.

✅ Done when: all three secrets show in the list with a "✓ saved" indicator.

---

## 5. Deploy the Edge Function

**Where:** your Mac terminal, in the repo root.

If you don't have the Supabase CLI installed yet:

```bash
brew install supabase/tap/supabase
```

Then:

```bash
cd ~/Documents/Claude/Projects/u-calm-aviation

# Log in (opens a browser tab — accept access)
supabase login

# Link this repo to your new project. The project ref is the bit
# between https:// and .supabase.co in your URL.
supabase link --project-ref <your-project-ref>

# Deploy the notify-contact function
supabase functions deploy notify-contact
```

Verify in the dashboard: **Edge Functions** in the left nav → you should
see `notify-contact` listed with a green status. Click into it; it
should show the version you just deployed and the secrets it has access
to.

The function URL will be:
`https://<your-project-ref>.supabase.co/functions/v1/notify-contact`

Copy that URL into your temporary note — you'll need it for step 6.

✅ Done when: the function is deployed and you have its URL.

**Smoke test the function** (optional but recommended):

```bash
curl -X POST \
  -H "Authorization: Bearer <your-anon-key>" \
  -H "Content-Type: application/json" \
  -d '{"record":{"name":"Smoke Test","email":"jp@u-calm.com","message":"Testing the deploy runbook."}}' \
  https://<your-project-ref>.supabase.co/functions/v1/notify-contact
```

Within 30 seconds an email should land in `jp@u-calm.com` from
`onboarding@resend.dev`, subject `U-Calm Aviation — new inquiry from
Smoke Test`. If yes, the function is wired correctly. If not, check:
- Resend dashboard → Emails — the send should be visible
- Supabase Edge Function logs — any errors will show there

---

## 6. Configure the Database Webhook

**Where:** Supabase dashboard → **Database → Webhooks** in the left nav.

The webhook fires on every INSERT into `contact_inquiries` and POSTs to
your Edge Function.

1. Click **Create a new hook**
2. Fill in:

| Field | Value |
|---|---|
| Name | `notify-contact-on-insert` |
| Table | `public.contact_inquiries` |
| Events | tick `Insert` only (leave Update + Delete unticked) |
| Type | `HTTP Request` |
| Method | `POST` |
| URL | `https://<your-project-ref>.supabase.co/functions/v1/notify-contact` (the URL from step 5) |
| HTTP Headers | Add: `Authorization` = `Bearer <your-anon-key>` and `Content-Type` = `application/json` |
| HTTP Params | (leave empty) |

3. Click **Create webhook**

✅ Done when: the webhook shows in the list with a green "Enabled" badge.

**End-to-end test**:
- In Supabase **Table editor**, open `contact_inquiries`
- Click **Insert → Insert row**, fill in `name`, `email` (use
  `jp@u-calm.com`), `message` — click Save
- Within 30 seconds an email arrives at `jp@u-calm.com`
- If yes, the full chain (form → table → webhook → function → Resend
  → inbox) is live

---

## 7. GitHub repo + first push

**Where:** your Mac terminal.

You'll need [`gh`](https://cli.github.com) installed. If not:

```bash
brew install gh
gh auth login
```

Then:

```bash
cd ~/Documents/Claude/Projects/u-calm-aviation

# Local git is already initialised. Check what you've got:
git status

# Stage and commit everything as the launch baseline
git add -A
git commit -m "U-Calm Aviation — launch baseline (site + brand pack + imagery library + backend)"

# Create the GitHub repo. Public so Cloudflare Pages can read it
# without GitHub-app rigmarole. Replace u-calm-concierge if you prefer
# a private repo + CF GitHub app.
gh repo create jpcengele/u-calm-aviation --public --source=. --remote=origin --push
```

The `--push` flag pushes `main` to GitHub.

✅ Done when: https://github.com/jpcengele/u-calm-aviation shows the
code with a recent commit.

---

## 8. Cloudflare Pages — connect repo + first deploy

**Where:** https://dash.cloudflare.com → **Workers & Pages** → **Create
application** → **Pages** tab → **Connect to Git**.

1. Select **GitHub** → authorise if prompted → pick
   `jpcengele/u-calm-aviation`
2. Begin setup. Configure:

| Field | Value |
|---|---|
| Project name | `u-calm-aviation` |
| Production branch | `main` |
| Framework preset | `Vite` |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | (leave blank) |

3. **Environment variables** — click **Add variable** for each:

| Variable | Value |
|---|---|
| `VITE_SUPABASE_URL` | Your Supabase Project URL (from step 1) |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Your anon public key (from step 1) |
| `NODE_VERSION` | `20` (Vite 5 needs Node 18+; 20 is the safe bet) |

4. Click **Save and Deploy**.

The first build takes ~3 minutes. When it finishes, Cloudflare gives you
a `*.pages.dev` URL like `u-calm-aviation.pages.dev` — open it.

✅ Done when: the site loads at the `*.pages.dev` URL with all routes
working (Home, Services, six service detail pages, Destinations, About,
Contact, Privacy). Submit the contact form once and confirm the email
notification arrives.

**If the build fails:**
- Cloudflare → Pages → your project → click the failed deploy → read
  the build log. Common issues:
  - `Module not found` for one of the shadcn UI files — those are
    listed in tsconfig.app.json but missing on disk. Either add the
    missing component(s) under `src/components/ui/` or remove from the
    tsconfig include. Vite ignores them at runtime if not imported.

---

## 9. Custom domain `u-calmaviation.com`

This breaks into two halves: pointing DNS to Cloudflare, and adding the
domain in Cloudflare Pages.

### 9a. Move DNS to Cloudflare (one-time, ~10 min + propagation)

**Where:** https://dash.cloudflare.com → **Add a site**.

1. Enter `u-calmaviation.com` → click **Continue**
2. Pick the **Free** plan → Continue
3. Cloudflare scans existing DNS records; review and confirm
4. Cloudflare tells you to update **nameservers** at your registrar to
   the two it assigns (something like `xxx.ns.cloudflare.com` and
   `yyy.ns.cloudflare.com`)
5. Open your registrar (Gandi / GoDaddy / wherever), find the domain,
   change nameservers to the two Cloudflare ones, save.
6. Back in Cloudflare, click **Done, check nameservers**. Propagation
   usually takes 5–60 minutes.

✅ Done when: Cloudflare emails you "Your domain is now active on
Cloudflare".

### 9b. Add the domain to your Pages project

**Where:** Cloudflare → Workers & Pages → `u-calm-aviation` project →
**Custom domains** tab.

1. Click **Set up a custom domain**
2. Enter `u-calmaviation.com` → **Continue**
3. Cloudflare auto-creates the CNAME / A record. Click **Activate**
4. Repeat for `www.u-calmaviation.com` if you want the www variant too
   (recommended).

SSL provisioning takes ~5–15 minutes. When it's ready the domain shows
"Active" with a green padlock.

✅ Done when: https://u-calmaviation.com loads the site with a valid
SSL certificate.

### 9c. Verify u-calmaviation.com as a Resend sending domain (optional but recommended)

**Where:** https://resend.com/domains → **Add Domain**

1. Enter `u-calmaviation.com` → **Add**
2. Resend gives you 3 DNS records to add (SPF, DKIM, DMARC). They look
   like:
   - TXT `_dmarc.u-calmaviation.com` → `v=DMARC1; ...`
   - TXT `resend._domainkey.u-calmaviation.com` → `p=...`
   - TXT `send.u-calmaviation.com` → `v=spf1 include:amazonses.com ~all`
3. Add these records in Cloudflare → DNS → your domain. **Set Proxy
   status to DNS-only (grey cloud)** — proxied DNS breaks DKIM signing.
4. Wait 10–60 minutes for Resend to verify. The domain shows "Verified".
5. Once verified, update the Supabase Edge Function secret:
   `FROM_DOMAIN` = `u-calmaviation.com`
6. Redeploy the function (or wait for cold-start to pick up the new
   secret): `supabase functions deploy notify-contact`

Now sender shows `flyhigh@u-calmaviation.com` instead of
`onboarding@resend.dev`.

---

## 10. Google Workspace alias for `flyhigh@u-calmaviation.com`

**Where:** https://admin.google.com (signed in as `jp@u-calm.com`).

This makes `flyhigh@u-calmaviation.com` route to your Gmail inbox without
needing a paid additional license.

1. Admin console → **Account → Domains → Manage domains**
2. **Add a domain** → enter `u-calmaviation.com` → **User Alias Domain**
   (NOT Secondary Domain — alias is free, secondary needs a license)
3. Verify ownership: Google gives you a TXT record to add to DNS. Add
   it in Cloudflare → DNS for `u-calmaviation.com`. Wait for verification.
4. Once verified, set up MX records. In Cloudflare → DNS for
   `u-calmaviation.com`, add the **5 Google MX records**:

| Type | Name | Mail Server | Priority |
|---|---|---|---|
| MX | @ | ASPMX.L.GOOGLE.COM | 1 |
| MX | @ | ALT1.ASPMX.L.GOOGLE.COM | 5 |
| MX | @ | ALT2.ASPMX.L.GOOGLE.COM | 5 |
| MX | @ | ALT3.ASPMX.L.GOOGLE.COM | 10 |
| MX | @ | ALT4.ASPMX.L.GOOGLE.COM | 10 |

Set TTL to Auto. Set Proxy status to DNS-only (MX records can't be
proxied anyway, but check just in case).

5. Wait 5–60 minutes. Then test:
   - Send an email from a non-Workspace account to
     `flyhigh@u-calmaviation.com`
   - It should arrive in `jp@u-calm.com` inbox within a minute.
6. Once confirmed, update the Supabase Edge Function secret:
   `NOTIFY_EMAIL` = `flyhigh@u-calmaviation.com`
7. Redeploy the function: `supabase functions deploy notify-contact`

Now the contact form notifications go to `flyhigh@u-calmaviation.com`,
which routes to your `jp@u-calm.com` Gmail.

---

## Final smoke tests

End-to-end check (do all of these):

1. **Homepage loads** — `https://u-calmaviation.com` shows the Three
   Cities, the six-service grid, the FAQ, and footer. Logo visible. No
   console errors.
2. **All routes load** — click through Services, each ServiceDetail
   slug, Destinations, About, Contact, Privacy. Each renders.
3. **Contact form works** — submit with a real email. Within 30
   seconds you receive an email at `flyhigh@u-calmaviation.com` (or
   wherever NOTIFY_EMAIL is currently pointing) with the inquiry
   formatted in U-Calm Aviation brand voice (Deep Teal heading,
   Champagne hairline rule, serif body).
4. **Hard-refresh + lighthouse** — open Chrome DevTools → Lighthouse →
   run on mobile. Performance should be 90+, accessibility 95+, SEO
   90+. If anything is below, check `index.html` meta tags first.
5. **Imagery state** — every image slot still renders the gradient
   placeholder (because `IMAGERY_READY = false`). Once curated photos
   land in `/public/brand/<section>/`, flip the flag and redeploy.
6. **Tag the launch commit**:

```bash
git tag -a v1.0.0-launch -m "U-Calm Aviation v1 launch"
git push --tags
```

---

## Troubleshooting

### Cloudflare build fails on Tailwind plugin
Vite's Tailwind plugin sometimes needs the `NODE_VERSION` env var. If
the build log shows `Cannot find module 'tailwindcss'`, set
`NODE_VERSION=20` in CF Pages env vars and re-trigger the deploy.

### Edge Function logs show "RESEND_API_KEY not configured"
The function picked up its env vars on cold start, then redeployed
without them. Re-set the secret and redeploy:
```bash
supabase secrets set RESEND_API_KEY=re_...
supabase functions deploy notify-contact
```

### Webhook fires but no email arrives
Check the Edge Function logs (Supabase dashboard → Edge Functions →
notify-contact → Logs tab). If it's silent, the webhook URL or
Authorization header is wrong — re-check step 6.

### Contact form submits but the row doesn't appear in the table
RLS is blocking the insert. Verify the policies from step 2 are
enabled. The anon role MUST have INSERT permission. The contact form
uses the anon key, so without that policy, the insert silently fails.

### Cloudflare cache shows stale content
Push any commit to `main` to flush the edge cache. There's a memory
note about this from the u-calm.com migration —
`feedback_cloudflare_cache_invalidation.md`.

---

## What's next after launch

- **Imagery wiring** — once triage is done, copy curated jpgs from
  `brand-assets/_incoming-imagery/` into `/public/brand/<section>/`,
  flip `IMAGERY_READY = true` in `src/brand/imagery.ts`, push.
- **DE/FR/IT translations** — `src/i18n/locales/` is scaffolded; copy
  needs to be translated (DeepL handles the rough cut, human reviews).
- **Member portal** — Brand Book §00 founding refusal says no portal
  for now; revisit when membership scale demands it.

## References

- `IMAGERY_RUNBOOK.md` — Gemini imagery generation pipeline
- `brand-assets/00-START-HERE.md` — orientation to the full brand pack
- `brand-assets/11-Photography-and-Imagery.md` — visual rules
- `supabase/migrations/20260503_120000_contact_inquiries.sql` — table schema
- `supabase/functions/notify-contact/index.ts` — notification function

---

**Version:** 2026-05-03. Maintain alongside the codebase; if any step
in deployment changes (e.g. Cloudflare Pages UI updates, Supabase
secret-set syntax changes), update this file in the same commit.
