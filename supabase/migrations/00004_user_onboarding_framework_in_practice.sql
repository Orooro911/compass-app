-- Extend onboarding progress for Compass Framework "In Practice" tab (checkbox + instruction dismissed).
-- Run after 00003_user_onboarding_progress.sql

alter table public.user_onboarding_progress
  add column if not exists framework_in_practice_read boolean not null default false;

alter table public.user_onboarding_progress
  add column if not exists framework_in_practice_instruction_hidden boolean not null default false;
