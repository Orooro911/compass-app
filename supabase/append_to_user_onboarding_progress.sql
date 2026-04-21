-- Paste this at the BOTTOM of your existing "User Onboarding Progress" script in Supabase SQL Editor, then Run (whole file or select only this block).
-- Safe to run more than once.

alter table public.user_onboarding_progress
  add column if not exists framework_in_practice_read boolean not null default false;

alter table public.user_onboarding_progress
  add column if not exists framework_in_practice_instruction_hidden boolean not null default false;

grant usage on schema public to authenticated;

grant select, insert, update, delete on table public.user_onboarding_progress to authenticated;
