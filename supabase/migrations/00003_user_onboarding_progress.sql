-- Per-user onboarding progress (cross-device persistent)
-- Run after 00002_wants_transform_nesting.sql

create table if not exists public.user_onboarding_progress (
  user_id uuid primary key references auth.users(id) on delete cascade,
  framework_overview_read boolean not null default false,
  framework_overview_instruction_hidden boolean not null default false,
  updated_at timestamptz not null default now()
);

alter table public.user_onboarding_progress enable row level security;

drop policy if exists "Users can manage own onboarding progress" on public.user_onboarding_progress;
create policy "Users can manage own onboarding progress"
  on public.user_onboarding_progress for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
