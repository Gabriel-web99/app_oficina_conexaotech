create table if not exists public.teste_nomes (
  id uuid primary key default gen_random_uuid(),
  nome text not null check (char_length(trim(nome)) between 1 and 120),
  created_at timestamptz not null default now()
);

alter table public.teste_nomes enable row level security;

grant usage on schema public to anon;
grant insert on table public.teste_nomes to anon;

drop policy if exists "Permitir cadastro anonimo de nomes de teste" on public.teste_nomes;
create policy "Permitir cadastro anonimo de nomes de teste"
on public.teste_nomes
for insert
to anon
with check (true);
