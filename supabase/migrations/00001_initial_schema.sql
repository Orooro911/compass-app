-- Compass App: Initial schema
-- Run this in Supabase Dashboard → SQL Editor

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Module items: Life Roles, Shared Growth, Situations (each item is user-created)
create table public.module_items (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  module_id text not null check (module_id in ('life-roles', 'shared-growth', 'situations')),
  name text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  unique(user_id, module_id, name)
);

-- Links between items across modules
create table public.links (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  from_item_id uuid not null references public.module_items(id) on delete cascade,
  to_item_id uuid not null references public.module_items(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique(user_id, from_item_id, to_item_id),
  check (from_item_id != to_item_id)
);

-- Situation-principle content: user's notes for each principle in each situation
create table public.situation_principle_content (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  situation_item_id uuid not null references public.module_items(id) on delete cascade,
  principle_id text not null check (principle_id in ('P1','P2','P3','P4','P5','P6','P7','P8','P9')),
  content text not null default '',
  updated_at timestamptz not null default now(),
  unique(user_id, situation_item_id, principle_id)
);

-- Indexes for common queries
create index idx_module_items_user_module on public.module_items(user_id, module_id);
create index idx_links_user on public.links(user_id);
create index idx_links_from_to on public.links(from_item_id, to_item_id);
create index idx_situation_principle_user on public.situation_principle_content(user_id);

-- Row Level Security: users can only access their own data
alter table public.module_items enable row level security;
alter table public.links enable row level security;
alter table public.situation_principle_content enable row level security;

create policy "Users can manage own module items"
  on public.module_items for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can manage own links"
  on public.links for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can manage own situation principle content"
  on public.situation_principle_content for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
