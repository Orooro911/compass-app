-- Ensure the browser client (authenticated role) can read/write onboarding rows.
-- If this was missing, selects/upserts would fail or behave inconsistently depending on project defaults.

grant usage on schema public to authenticated;

grant select, insert, update, delete on table public.user_onboarding_progress to authenticated;
