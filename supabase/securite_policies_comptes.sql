-- Durcissement des policies sur les tables comptes e-mail et presets.
-- Ces tables ont le RLS « activé » au dashboard mais avec des policies
-- probablement permissives. Ce script remplace toutes les policies par des
-- policies strictes alignées sur l'usage réel du code (vérifié fichier par
-- fichier). Il est indépendant du déploiement : l'ancien comme le nouveau
-- code fonctionnent avec ces policies, car tous les accès navigateur à ces
-- tables se font avec une session Supabase Auth (rôle authenticated).
--
-- Chaque section vérifie que la table existe (to_regclass) : les tables
-- absentes sont simplement ignorées avec un NOTICE. Exemple constaté :
-- user_payments n'existe pas (le code qui la référence est mort).
--
-- Audit préalable (facultatif) : voir les policies actuelles.
select tablename, policyname, cmd, roles, qual, with_check
from pg_policies
where schemaname = 'public'
  and tablename in (
    'users_email', 'presets_email', 'preset_runs_email',
    'presets_eleveai', 'user_payments'
  )
order by tablename, policyname;

-- ── users_email ──────────────────────────────────────────────────────
-- Usage navigateur : lecture de SON profil (signin, votre-avis, compte),
-- upsert à l'inscription (signup), mise à jour de SON profil (compte).
do $$
declare p record;
begin
  if to_regclass('public.users_email') is null then
    raise notice 'users_email absente — section ignorée';
  else
    for p in select policyname from pg_policies
             where schemaname = 'public' and tablename = 'users_email' loop
      execute format('drop policy %I on public.users_email', p.policyname);
    end loop;
    execute 'alter table public.users_email enable row level security';
    execute 'create policy "users_email_select_self" on public.users_email
             for select to authenticated using (auth.uid() = auth_user_id)';
    execute 'create policy "users_email_insert_self" on public.users_email
             for insert to authenticated with check (auth.uid() = auth_user_id)';
    execute 'create policy "users_email_update_self" on public.users_email
             for update to authenticated
             using (auth.uid() = auth_user_id)
             with check (auth.uid() = auth_user_id)';
  end if;
end $$;

-- ── presets_email ────────────────────────────────────────────────────
-- Usage navigateur : insert/select/delete de SES presets
-- (lib/presetsEmailClient.ts, app/dashboard/presets).
do $$
declare p record;
begin
  if to_regclass('public.presets_email') is null then
    raise notice 'presets_email absente — section ignorée';
  else
    for p in select policyname from pg_policies
             where schemaname = 'public' and tablename = 'presets_email' loop
      execute format('drop policy %I on public.presets_email', p.policyname);
    end loop;
    execute 'alter table public.presets_email enable row level security';
    execute 'create policy "presets_email_select_self" on public.presets_email
             for select to authenticated using (auth.uid() = auth_user_id)';
    execute 'create policy "presets_email_insert_self" on public.presets_email
             for insert to authenticated with check (auth.uid() = auth_user_id)';
    execute 'create policy "presets_email_delete_self" on public.presets_email
             for delete to authenticated using (auth.uid() = auth_user_id)';
  end if;
end $$;

-- ── preset_runs_email ────────────────────────────────────────────────
-- Usage navigateur : insert de SES runs + lecture (app/dashboard/historique).
do $$
declare p record;
begin
  if to_regclass('public.preset_runs_email') is null then
    raise notice 'preset_runs_email absente — section ignorée';
  else
    for p in select policyname from pg_policies
             where schemaname = 'public' and tablename = 'preset_runs_email' loop
      execute format('drop policy %I on public.preset_runs_email', p.policyname);
    end loop;
    execute 'alter table public.preset_runs_email enable row level security';
    execute 'create policy "preset_runs_email_select_self" on public.preset_runs_email
             for select to authenticated using (auth.uid() = auth_user_id)';
    execute 'create policy "preset_runs_email_insert_self" on public.preset_runs_email
             for insert to authenticated with check (auth.uid() = auth_user_id)';
  end if;
end $$;

-- ── presets_eleveai ──────────────────────────────────────────────────
-- Catalogue public : lecture seule pour tout le monde. Les seules écritures
-- client sont dans des fichiers morts (« EspaceProfsClient copy.tsx »).
do $$
declare p record;
begin
  if to_regclass('public.presets_eleveai') is null then
    raise notice 'presets_eleveai absente — section ignorée';
  else
    for p in select policyname from pg_policies
             where schemaname = 'public' and tablename = 'presets_eleveai' loop
      execute format('drop policy %I on public.presets_eleveai', p.policyname);
    end loop;
    execute 'alter table public.presets_eleveai enable row level security';
    execute 'create policy "presets_eleveai_read_public" on public.presets_eleveai
             for select to anon, authenticated using (true)';
  end if;
end $$;

-- ── user_payments ────────────────────────────────────────────────────
-- Table absente à ce jour (le seul code qui la référence,
-- lib/supabase/paymentStatusScript.ts, n'est jamais appelé). Si elle est
-- créée un jour : RLS sans policy, accès service role uniquement.
do $$
declare p record;
begin
  if to_regclass('public.user_payments') is null then
    raise notice 'user_payments absente — section ignorée';
  else
    for p in select policyname from pg_policies
             where schemaname = 'public' and tablename = 'user_payments' loop
      execute format('drop policy %I on public.user_payments', p.policyname);
    end loop;
    execute 'alter table public.user_payments enable row level security';
  end if;
end $$;

-- Vérification finale.
select tablename, policyname, cmd, roles
from pg_policies
where schemaname = 'public'
  and tablename in (
    'users_email', 'presets_email', 'preset_runs_email',
    'presets_eleveai', 'user_payments'
  )
order by tablename, policyname;
