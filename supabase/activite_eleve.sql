-- « EN DIRECT » : CE QUE FONT LES ÉLÈVES PENDANT LE COURS — 27/10/2026
--
-- LE BESOIN (Frédéric). « En cours je peux suivre les élèves sur ce qu'ils
-- font dans coach-maths ou s'ils regardent les vidéos. » Les tables
-- existantes ne le permettent pas : une séance du coach n'arrive dans
-- resultats_tutor que si l'élève clique « Enregistrer », et video_vues n'est
-- qu'un compteur anonyme.
--
-- UNE LIGNE PAR GESTE, d'un élève CONNECTÉ À UN ÉTABLISSEMENT seulement (les
-- comptes e-mail INDEPENDANT et les visiteurs ne laissent rien) :
--   coach        une réponse au coach (micro, juste ou faux)
--   video_debut  une vidéo lancée
--   video_fin    une vidéo regardée jusqu'au bout
-- Écrite par /api/activite, lue par /api/prof/classes/direct (clé service role).
--
-- 30 JOURS, PAS PLUS. C'est un suivi de cours, pas un dossier : /api/activite
-- efface de temps en temps les lignes de plus de 30 jours. Ordre de grandeur :
-- 30 élèves × 60 gestes × 4 cours par semaine ≈ 7 000 lignes par classe et par
-- semaine, ~30 000 au plus par classe — rien pour le plan gratuit.
--
-- À exécuter dans l'éditeur SQL de Supabase AVANT de déployer le code
-- (sans la table, /api/activite échoue en silence : le coach et les vidéos
-- marchent comme avant). Idempotent.

create table if not exists public.activite_eleve (
  id bigint generated always as identity,
  created_at timestamp with time zone not null default now(),
  code_etablissement text not null,
  code_utilisateur text not null,
  type text not null check (type in ('coach', 'video_debut', 'video_fin')),
  ressource text null,                 -- micro id, ou clé de lib/videos/videos-r2.json
  libelle text null,                   -- « Comparer des fractions », titre de la vidéo
  juste boolean null,                  -- coach seulement
  constraint activite_eleve_pkey primary key (id)
) TABLESPACE pg_default;

-- La page « En direct » : les gestes d'une classe, les plus récents d'abord.
create index if not exists activite_eleve_classe_idx
  on public.activite_eleve using btree (code_etablissement, created_at desc) TABLESPACE pg_default;

-- La purge des 30 jours.
create index if not exists activite_eleve_date_idx
  on public.activite_eleve using btree (created_at) TABLESPACE pg_default;

alter table public.activite_eleve enable row level security;
