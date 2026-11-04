-- Dragaum: progresso de cada usuária (1 linha por conta)
create table if not exists public.progress (
  user_id uuid primary key references auth.users (id) on delete cascade,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

comment on table public.progress is 'Progresso do app Dragaum (XP, lições, revisão, simulados...) — um JSON por usuário.';

alter table public.progress enable row level security;

-- cada pessoa só enxerga e altera a própria linha
create policy "progress_select_own" on public.progress
  for select to authenticated using ((select auth.uid()) = user_id);

create policy "progress_insert_own" on public.progress
  for insert to authenticated with check ((select auth.uid()) = user_id);

create policy "progress_update_own" on public.progress
  for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

create policy "progress_delete_own" on public.progress
  for delete to authenticated using ((select auth.uid()) = user_id);

-- updated_at automático
create or replace function public.progress_touch()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists progress_touch on public.progress;
create trigger progress_touch before update on public.progress
  for each row execute function public.progress_touch();
