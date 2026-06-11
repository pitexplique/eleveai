-- Durcissement des policies sur les tables comptes e-mail et presets.
-- Ces tables ont déjà le RLS « activé » au dashboard mais avec des policies
-- probablement permissives. Ce script remplace toutes les policies par des
-- policies strictes alignées sur l'usage réel du code (vérifié fichier par
-- fichier). Il est indépendant du déploiement : l'ancien comme le nouveau
-- code fonctionnent avec ces policies, car tous les accès navigateur à ces
-- tables se font avec une session Supabase Auth (rôle authenticated).
--
-- Avant d'exécuter : lancer l'audit ci-dessous et vérifier qu'aucune policy
-- existante ne couvre un usage qu'on aurait raté.
select tablename, policyname, cmd, roles, qual, with_check
from pg_policies
where schemaname = 'public'
  and tablename in (
    'users_email', 'presets_email', 'preset_runs_email',
    'presets_eleveai', 'user_payments'
  )
order by tablename, policyname;

-- Helper : suppression de toutes les policies d'une table.
create or replace function pg_temp.drop_policies(p_table text)
returns void language plpgsql as $$
declare
  p record;
begin
  for p in
    select policyname from pg_policies
    where schemaname = 'public' and tablename = p_table
  loop
    execute format('drop policy %I on public.%I', p.policyname, p_table);
  end loop;
end $$;

-- ── users_email ──────────────────────────────────────────────────────
-- Usage navigateur : lecture de SON profil (signin, votre-avis, compte),
-- upsert à l'inscription (signup), mise à jour de SON profil (compte).
select pg_temp.drop_policies('users_email');
alter table public.users_email enable row level security;

create policy "users_email_select_self" on public.users_email
  for select to authenticated using (auth.uid() = auth_user_id);
create policy "users_email_insert_self" on public.users_email
  for insert to authenticated with check (auth.uid() = auth_user_id);
create policy "users_email_update_self" on public.users_email
  for update to authenticated
  using (auth.uid() = auth_user_id) with check (auth.uid() = auth_user_id);

-- ── presets_email ────────────────────────────────────────────────────
-- Usage navigateur : insert/select/delete de SES presets
-- (lib/presetsEmailClient.ts, app/dashboard/presets).
select pg_temp.drop_policies('presets_email');
alter table public.presets_email enable row level security;

create policy "presets_email_select_self" on public.presets_email
  for select to authenticated using (auth.uid() = auth_user_id);
create policy "presets_email_insert_self" on public.presets_email
  for insert to authenticated with check (auth.uid() = auth_user_id);
create policy "presets_email_delete_self" on public.presets_email
  for delete to authenticated using (auth.uid() = auth_user_id);

-- ── preset_runs_email ────────────────────────────────────────────────
-- Usage navigateur : insert de SES runs + lecture (app/dashboard/historique).
select pg_temp.drop_policies('preset_runs_email');
alter table public.preset_runs_email enable row level security;

create policy "preset_runs_email_select_self" on public.preset_runs_email
  for select to authenticated using (auth.uid() = auth_user_id);
create policy "preset_runs_email_insert_self" on public.preset_runs_email
  for insert to authenticated with check (auth.uid() = auth_user_id);

-- ── presets_eleveai ──────────────────────────────────────────────────
-- Catalogue public : lecture seule pour tout le monde. Les seules écritures
-- client sont dans des fichiers morts (« EspaceProfsClient copy.tsx »).
select pg_temp.drop_policies('presets_eleveai');
alter table public.presets_eleveai enable row level security;

create policy "presets_eleveai_read_public" on public.presets_eleveai
  for select to anon, authenticated using (true);

-- ── user_payments ────────────────────────────────────────────────────
-- Aucun code actif ne touche cette table (lib/supabase/paymentStatusScript.ts
-- n'est référencé que par une page de documentation). On la verrouille
-- complètement : RLS sans policy, accès service role uniquement.
select pg_temp.drop_policies('user_payments');
alter table public.user_payments enable row level security;

-- Vérification finale.
select tablename, policyname, cmd, roles
from pg_policies
where schemaname = 'public'
  and tablename in (
    'users_email', 'presets_email', 'preset_runs_email',
    'presets_eleveai', 'user_payments'
  )
order by tablename, policyname;
