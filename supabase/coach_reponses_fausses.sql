-- Réponses FAUSSES au coach — « qu'ont tapé les élèves ? ».
-- 28/10/2026. Le compteur (coach_reponses.sql) montrait 2 justes sur 21 en
-- decimal_lire_ecrire : vraie difficulté ou correction trop stricte ? Sans
-- les réponses tapées, impossible de trancher. Frédéric : « on va les
-- enregistrer dans un premier temps et une fois corrigé on doit pouvoir les
-- supprimer ».
--
-- RGPD : AUCUNE identité (ni code élève, ni établissement, ni IP). Seulement
-- la question et ce qui a été tapé. ⚠️ Un élève peut taper son prénom dans
-- la case : d'où la purge automatique à 30 jours (dans /api/coach/answer,
-- une requête sur cent), et la suppression à la main dans /admin/reponses-fausses
-- dès qu'une question est vue ou corrigée.
-- À exécuter dans l'éditeur SQL de Supabase.

create table if not exists public.coach_reponses_fausses (
  id bigint generated always as identity,
  created_at timestamp with time zone not null default now(),
  classe text not null,
  matiere text not null,
  micro_id text not null,
  question_id text not null,           -- id de l'item (un gabarit : son id de gabarit)
  enonce text not null,                -- tronqué à 400 signes
  attendu text null,                   -- les réponses acceptées, séparées par « | »
  reponse text not null,               -- ce que l'élève a tapé, tronqué à 120 signes
  constraint coach_reponses_fausses_pkey primary key (id)
) TABLESPACE pg_default;

create index if not exists coach_reponses_fausses_micro_idx
  on public.coach_reponses_fausses using btree (classe, micro_id, created_at desc) TABLESPACE pg_default;

create index if not exists coach_reponses_fausses_date_idx
  on public.coach_reponses_fausses using btree (created_at) TABLESPACE pg_default;

-- RLS activé sans policy : seule la clé service role (API) écrit et lit.
alter table public.coach_reponses_fausses enable row level security;
