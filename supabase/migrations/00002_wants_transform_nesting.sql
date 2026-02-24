-- Wants & Transformations: nesting, promote/demote/move
-- Run after 00001_initial_schema.sql

-- 1. Add parent_item_id for nesting (situations under wants, wants under transformations)
alter table public.module_items
  add column if not exists parent_item_id uuid references public.module_items(id) on delete set null;

create index if not exists idx_module_items_parent on public.module_items(parent_item_id);

-- 2. Extend module_id to include wants and transformations
alter table public.module_items drop constraint if exists module_items_module_id_check;
alter table public.module_items add constraint module_items_module_id_check
  check (module_id in ('life-roles', 'shared-growth', 'situations', 'wants', 'transformations'));

-- 3. Generalize situation_principle_content → item_principle_content (for situations, wants, transformations)
alter table public.situation_principle_content rename to item_principle_content;
alter table public.item_principle_content rename column situation_item_id to item_id;

-- Rename index for clarity
alter index if exists idx_situation_principle_user rename to idx_item_principle_user;

-- Update RLS policy (policy names reference table - need to drop and recreate)
drop policy if exists "Users can manage own situation principle content" on public.item_principle_content;
create policy "Users can manage own item principle content"
  on public.item_principle_content for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
