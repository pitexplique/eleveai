-- Journal des connexions (un enregistrement par connexion réussie).
-- Alimentée côté serveur uniquement (clé service role) depuis :
--   - /api/code-login    -> connexion par codes établissement   (source = 'code')
--   - /api/email-session -> connexion par e-mail (Supabase Auth) (source = 'email')
-- Permet le suivi d'activité : élèves connectés par jour, dernière connexion,
-- courbes de fréquentation. RLS activé sans policy : lecture/écriture service role.
-- À exécuter dans l'éditeur SQL de Supabase avant la mise en ligne.

create table if not exists public.connexions (
  id uuid not null default gen_random_uuid (),
  created_at timestamp with time zone not null default now(),
  code_etablissement text null,        -- 'INDEPENDANT' pour les comptes e-mail
  code_utilisateur text not null,      -- code élève, ou EMAIL-<users_email.id>
  type_utilisateur text null,          -- eleve / prof / principal / perso / parent…
  nom text null,
  classe text null,
  source text not null default 'code'::text check (source in ('code', 'email')),
  constraint connexions_pkey primary key (id)
) TABLESPACE pg_default;

-- Connexions d'un établissement, triées par date (graphe par collège).
create index if not exists connexions_etablissement_idx
  on public.connexions using btree (code_etablissement, created_at desc) TABLESPACE pg_default;

-- Dernière connexion / historique par utilisateur.
create index if not exists connexions_utilisateur_idx
  on public.connexions using btree (code_utilisateur, created_at desc) TABLESPACE pg_default;

-- RLS activé sans policy : la clé anon (navigateur) ne peut ni lire ni écrire.
alter table public.connexions enable row level security;

-- ---------------------------------------------------------------------------
-- BACKFILL OPTIONNEL (à exécuter une seule fois, si tu veux que le dashboard
-- ne démarre pas vide). On considère qu'un élève ayant enregistré une activité
-- un jour donné s'était connecté ce jour-là : on crée 1 connexion par
-- (utilisateur, jour) reconstituée depuis l'historique des résultats.
-- Décommente le bloc et exécute-le après avoir créé la table.
-- ---------------------------------------------------------------------------
-- insert into public.connexions (created_at, code_etablissement, code_utilisateur, nom, classe, source)
-- select min(created_at) as created_at, code_etablissement, code_utilisateur,
--        max(nom) as nom, max(classe) as classe, 'code' as source
-- from (
--   select created_at, code_etablissement, code_utilisateur, nom, classe from public.resultats_parcours_maths
--   union all select created_at, code_etablissement, code_utilisateur, nom, classe from public.resultats_parcours_english
--   union all select created_at, code_etablissement, code_utilisateur, nom, classe from public.resultats_parcours_espagnol
--   union all select created_at, code_etablissement, code_utilisateur, nom, classe from public.resultats_parcours_francais
--   union all select created_at, code_etablissement, code_utilisateur, nom, classe from public.resultats_calcul_rapide
--   union all select created_at, code_etablissement, code_utilisateur, nom, classe from public.resultats_defis_jour
--   union all select created_at, code_etablissement, code_utilisateur, nom, null  from public.resultats_english_maths
--   union all select created_at, code_etablissement, code_utilisateur, nom, classe from public.resultats_tutor
-- ) t
-- group by code_etablissement, code_utilisateur, date_trunc('day', created_at);
