-- U-Calm Aviation — contact_inquiries table + RLS
--
-- Mirrors the u-calm-concierge contact_inquiries schema but kept as a
-- proper migration file so the repo is the source of truth (rather than
-- only the dashboard).
--
-- Run on the U-Calm Aviation Supabase project either via:
--   • supabase db push  (CLI, requires `supabase link` to the project)
--   • Project dashboard → SQL editor → paste this whole file → Run
--
-- The contact form on https://u-calmaviation.com/contact submits a row
-- via the anon-key Supabase client; a Database Webhook on this table's
-- INSERT event posts to the notify-contact Edge Function which emails
-- flyhigh@u-calmaviation.com via Resend.

set search_path = public;

create table if not exists public.contact_inquiries (
    id          uuid        primary key default gen_random_uuid(),
    name        text        not null check (length(name)  between 1 and 200),
    email       text        not null check (length(email) between 3 and 320),
    message     text        not null check (length(message) between 1 and 5000),
    created_at  timestamptz not null default now()
);

-- Index on created_at so the dashboard "Recent inquiries" view stays fast.
create index if not exists contact_inquiries_created_at_idx
    on public.contact_inquiries (created_at desc);

-- Row-Level Security: lock the table down. The anon client may insert
-- (so the public form works) but cannot read, update, or delete. Only
-- service_role (Edge Function, dashboard) can do anything else.
alter table public.contact_inquiries enable row level security;

-- Public can insert from the contact form. We deliberately allow the
-- anon role because the website's Supabase client uses the anon key.
drop policy if exists "anon can insert contact inquiries"
    on public.contact_inquiries;
create policy "anon can insert contact inquiries"
    on public.contact_inquiries
    for insert
    to anon
    with check (true);

-- Authenticated users (e.g. a future member portal) can also insert.
drop policy if exists "authenticated can insert contact inquiries"
    on public.contact_inquiries;
create policy "authenticated can insert contact inquiries"
    on public.contact_inquiries
    for insert
    to authenticated
    with check (true);

-- No SELECT / UPDATE / DELETE policies are defined, so by default RLS
-- denies those operations for anon and authenticated. service_role
-- bypasses RLS, so the Edge Function and dashboard retain full access.

-- Useful comment for the dashboard.
comment on table public.contact_inquiries is
    'Public-form inquiries from u-calmaviation.com. anon may insert; reads via service_role only.';
