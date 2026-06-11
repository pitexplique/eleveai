-- Activation du RLS sur les tables élèves.
-- À exécuter dans l'éditeur SQL de Supabase EN DERNIER :
--   1. déployer le code (routes /api/code-login, /api/email-session,
--      /api/resultats, /api/dashboard + clients migrés) ;
--   2. exécuter supabase/acces_etablissement_mot_de_passe.sql ;
--   3. exécuter ce script.
--
-- Stratégie : RLS activé SANS aucune policy (même pattern que
-- retours_eleves). La clé anon (navigateur) ne peut plus ni lire ni
-- écrire ces tables ; tous les accès passent par les routes API
-- Next.js qui utilisent la clé service role (laquelle ignore le RLS) :
--   - écriture des résultats  -> /api/resultats (identité forcée depuis
--     le jeton de session signé, un élève ne peut pas écrire pour un autre)
--   - lecture des dashboards  -> /api/dashboard (scopé par rôle :
--     élève = ses résultats, prof/principal = son établissement)
--   - login établissement     -> /api/code-login (vérification du mot de
--     passe côté serveur via verifier_acces_etablissement)
--
-- Avant ce script, n'importe qui pouvait lire/modifier/supprimer les
-- prénoms, classes, codes et résultats de tous les élèves — et surtout
-- la table acces_etablissement (codes + mots de passe).

-- ── acces_etablissement ──────────────────────────────────────────────
-- ⚠️ Le RLS y est DÉJÀ activé au dashboard, mais une policy permissive
-- laisse tout passer (la preuve : le navigateur lit mot_de_passe avec la
-- clé anon). Activer le RLS ne suffit donc pas : on supprime TOUTES les
-- policies existantes. Sans policy, la clé anon est bloquée et la
-- service role continue de passer.
do $$
declare
  p record;
begin
  for p in
    select policyname from pg_policies
    where schemaname = 'public' and tablename = 'acces_etablissement'
  loop
    execute format(
      'drop policy %I on public.acces_etablissement', p.policyname
    );
  end loop;
end $$;

alter table public.acces_etablissement       enable row level security;

-- ── Tables de résultats (« Unrestricted » au dashboard) ──────────────
alter table public.resultats_parcours_maths  enable row level security;
alter table public.resultats_calcul_rapide   enable row level security;
alter table public.resultats_defis_jour      enable row level security;
alter table public.resultats_english_maths   enable row level security;
alter table public.resultats_tutor           enable row level security;

-- Tables optionnelles (créées séparément) : ignorées si absentes, pour ne
-- pas faire échouer la transaction.
do $$
begin
  if to_regclass('public.resultats_parcours_english') is not null then
    execute 'alter table public.resultats_parcours_english enable row level security';
  else
    raise notice 'resultats_parcours_english absente — ignorée';
  end if;
  if to_regclass('public.resultats_parcours_espagnol') is not null then
    execute 'alter table public.resultats_parcours_espagnol enable row level security';
  else
    raise notice 'resultats_parcours_espagnol absente — ignorée';
  end if;
end $$;

-- Vérification 1 : doit renvoyer rowsecurity = true pour chaque table.
select tablename, rowsecurity
from pg_tables
where schemaname = 'public'
  and tablename in (
    'acces_etablissement',
    'resultats_parcours_maths',
    'resultats_parcours_english',
    'resultats_parcours_espagnol',
    'resultats_calcul_rapide',
    'resultats_defis_jour',
    'resultats_english_maths',
    'resultats_tutor'
  );

-- Vérification 2 : plus AUCUNE policy ne doit rester sur ces tables
-- (et celles d'acces_etablissement doivent avoir disparu).
select tablename, policyname, cmd, roles, qual, with_check
from pg_policies
where schemaname = 'public'
order by tablename, policyname;

-- Pour les tables e-mail (users_email, presets_email, preset_runs_email,
-- presets_eleveai, user_payments) : voir securite_policies_comptes.sql.
