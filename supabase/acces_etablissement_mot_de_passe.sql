-- Sécurisation des mots de passe de acces_etablissement.
-- À exécuter dans l'éditeur SQL de Supabase APRÈS le déploiement du code
-- (la route /api/code-login sait fonctionner avec ou sans ce script),
-- et AVANT supabase/securite_rls.sql.
--
-- Ce script :
--   1. ajoute une colonne mot_de_passe_hash (bcrypt via pgcrypto) ;
--   2. remplit le hash pour toutes les lignes existantes ;
--   3. installe un trigger : toute insertion/modification de mot_de_passe
--      met à jour le hash automatiquement (on peut donc continuer à créer
--      des comptes en saisissant le mot de passe en clair dans le dashboard) ;
--   4. crée la fonction verifier_acces_etablissement utilisée par
--      /api/code-login, appelable uniquement avec la clé service role.

-- Sur Supabase, les extensions sont installées dans le schéma "extensions".
create extension if not exists pgcrypto with schema extensions;

alter table public.acces_etablissement
  add column if not exists mot_de_passe_hash text null;

-- 2) Backfill des lignes existantes.
update public.acces_etablissement
set mot_de_passe_hash = extensions.crypt(mot_de_passe, extensions.gen_salt('bf', 10))
where mot_de_passe is not null
  and mot_de_passe <> ''
  and mot_de_passe_hash is null;

-- 3) Trigger de synchronisation du hash.
create or replace function public.acces_etablissement_hash_mdp()
returns trigger
language plpgsql
security definer
set search_path = public, extensions
as $$
begin
  if new.mot_de_passe is not null and new.mot_de_passe <> '' then
    if tg_op = 'INSERT'
       or new.mot_de_passe is distinct from old.mot_de_passe then
      new.mot_de_passe_hash := extensions.crypt(new.mot_de_passe, extensions.gen_salt('bf', 10));
    end if;
  end if;
  return new;
end;
$$;

drop trigger if exists trg_acces_etablissement_hash_mdp on public.acces_etablissement;
create trigger trg_acces_etablissement_hash_mdp
before insert or update on public.acces_etablissement
for each row execute function public.acces_etablissement_hash_mdp();

-- 4) Fonction de login appelée par /api/code-login (clé service role).
-- Renvoie la ligne uniquement si le compte est actif ET que le mot de passe
-- correspond (hash en priorité, sinon comparaison avec l'ancien champ en
-- clair pour les lignes pas encore hashées).
create or replace function public.verifier_acces_etablissement(
  p_code_etablissement text,
  p_code_utilisateur text,
  p_mot_de_passe text
)
returns setof public.acces_etablissement
language sql
security definer
set search_path = public, extensions
as $$
  select a.*
  from public.acces_etablissement a
  where a.code_etablissement = p_code_etablissement
    and a.code_utilisateur = p_code_utilisateur
    and a.actif = true
    and (
      (
        a.mot_de_passe_hash is not null
        and a.mot_de_passe_hash = extensions.crypt(p_mot_de_passe, a.mot_de_passe_hash)
      )
      or (
        a.mot_de_passe_hash is null
        and a.mot_de_passe is not null
        and a.mot_de_passe = p_mot_de_passe
      )
    )
  limit 1;
$$;

-- Indispensable : la fonction est "security definer", elle doit donc être
-- inaccessible à la clé anon (sinon n'importe qui pourrait tester des mots
-- de passe en masse directement via l'API REST).
revoke all on function public.verifier_acces_etablissement(text, text, text)
  from public, anon, authenticated;
grant execute on function public.verifier_acces_etablissement(text, text, text)
  to service_role;

-- 5) OPTIONNEL — à exécuter plus tard, une fois la connexion vérifiée en
-- production pendant quelques jours. Supprime définitivement les mots de
-- passe en clair (ils ne seront plus récupérables : pour redonner son code
-- à un élève qui l'a perdu, il faudra définir un nouveau mot de passe).
--
-- update public.acces_etablissement set mot_de_passe = null;
-- alter table public.acces_etablissement drop column mot_de_passe;
-- (si la colonne est supprimée, supprimer aussi le trigger et adapter la
--  fonction verifier_acces_etablissement pour ne garder que le hash)
