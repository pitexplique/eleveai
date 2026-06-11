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

alter table public.acces_etablissement       enable row level security;
alter table public.resultats_parcours_maths  enable row level security;
alter table public.resultats_calcul_rapide   enable row level security;
alter table public.resultats_defis_jour      enable row level security;
alter table public.resultats_english_maths   enable row level security;
alter table public.resultats_tutor           enable row level security;

-- Tables optionnelles (créées séparément) : si l'une d'elles n'existe pas
-- encore, exécuter ces deux lignes séparément et ignorer l'erreur.
alter table public.resultats_parcours_english  enable row level security;
alter table public.resultats_parcours_espagnol enable row level security;

-- Vérification : doit renvoyer rowsecurity = true pour chaque table.
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

-- NOTE (hors périmètre de ce script, à traiter ensuite) :
-- la table users_email est encore lue côté navigateur après la connexion
-- e-mail (app/auth/signin/page.tsx). Si on active le RLS dessus, ajouter
-- une policy du type :
--   alter table public.users_email enable row level security;
--   create policy "users_email_self" on public.users_email
--     for select using (auth.uid() = auth_user_id);
