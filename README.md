# U-Calm Aviation

The website for U-Calm Aviation — the aviation service line inside U-CALM,
the concierge house. Sister-brand to U-Calm Concierge (`u-calm.com`); the
commercially-separate Ascent Aviation Advisers is a different business
under the same family.

Strapline: **Aviation, arranged.**

## Stack

- Vite + React 18 + TypeScript
- Tailwind 3 (brand tokens in `src/index.css`, aliases in
  `tailwind.config.ts`)
- react-i18next (EN populated; DE/FR/IT scaffolded)
- react-router-dom 6
- shadcn/ui components under `src/components/ui/`
- Supabase (contact form → `contact_inquiries` → Edge Function → Resend
  → email to `flyhigh@u-calmaviation.com`)
- Cloudflare Pages (build via auto-deploy from GitHub `main`)
- Custom domain `u-calmaviation.com` on Cloudflare DNS

## Routes

- `/` — Home (Three Cities, six-service grid, FAQ, soul band)
- `/services` — six-card catalogue
- `/services/:slug` — long-form per service (six routes)
- `/destinations` — featured + 12 regional + gallery
- `/about` — founding question, team, principles, handshake
- `/contact` — form (Supabase) + what to expect + desk info
- `/legal/privacy` — privacy notice

## Local dev

```bash
npm install                          # or bun install
cp .env.local.example .env.local     # fill in real values from Supabase
npm run dev                          # serves at http://localhost:8080
npm run build                        # outputs dist/
```

Without real Supabase env vars the site still boots — the contact form
silently no-ops. The console will warn that env vars are missing.

## Brand & content

- `brand-assets/` — full v2.1 brand book (00-START-HERE through
  13-Sales-Discipline-and-KPIs), the imagery library script
  (`brand-assets/scripts/prompts.py` — 162 prompts across 13 sections),
  and `_incoming-imagery/` (gitignored, local-only).
- `src/brand/imagery.ts` — typed manifest of all 162 image slots; flip
  `IMAGERY_READY = true` once curated photographs are in `/public/brand/`.
- `src/brand/config.ts` — single source of truth for brand-adjacent facts
  (name, strapline, primary hex, inquiry email, etc.).
- `src/lib/services-data.ts` — the six-service catalogue used by the
  Services index, ServiceDetail pages, and Home cards.

## Imagery pipeline

See `IMAGERY_RUNBOOK.md` at the repo root.

```bash
python3 -m venv .venv && source .venv/bin/activate
pip install -r brand-assets/scripts/requirements.txt
export GEMINI_API_KEY=...
python3 brand-assets/scripts/generate_imagery.py --test     # 14 images, ~$1.30
python3 brand-assets/scripts/generate_imagery.py --all      # 162 images, ~$16.20
```

## Backend & deploy

See `DEPLOY_RUNBOOK.md` at the repo root for the full step-by-step:
Supabase project, migration, Edge Function, Resend secret, database
webhook, GitHub repo, Cloudflare Pages, custom domain, Google Workspace
alias.

```bash
supabase link --project-ref <your-project-ref>
supabase db push
supabase functions deploy notify-contact
supabase secrets set RESEND_API_KEY=re_...
```

## House standards

- **Cloudflare Pages, not Hostinger.** This brand inherits the
  Cloudflare deploy pattern proven on `u-calm.com` and
  `ascentaviationadvisers.com`. Push to `main`; CF Pages builds and
  deploys automatically.
- **Brand book founding refusals are absolute.** No tiered pricing, no
  published case studies, no aviation-marketing register, no red, no
  rendered text in imagery. See `brand-assets/00-START-HERE.md` and
  `brand-assets/11-Photography-and-Imagery.md`.

## Memory

If you're a future Claude session picking this up, the project memory
files in the parent's auto-memory directory are the fastest way in.
Specifically:
- `project_u_calm_aviation_brand.md` — palette, voice, founding refusals
- `project_u_calm_aviation_decisions.md` — six-service split + Three
  Cities (Lugano/Milan/London) decisions made 2026-05-03
- `user_deploy_house_standard.md` — Cloudflare Pages recipe
