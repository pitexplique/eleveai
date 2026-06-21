-- Bulletin pré-calculé par élève (snapshot événementiel).
-- Au lieu de recalculer le bulletin à chaque affichage, on le recalcule à
-- chaque SAUVEGARDE de résultat (app/api/resultats) et on stocke le résultat
-- ici : 1 ligne par élève, lue instantanément côté élève/parents.
--
-- data = JSON { prenom, classe, computed_at, periodes: { "30j", "trim", "debut" } }
--   chaque période : { moyenne, progression, assiduite, matieres[], appreciation }
--   (notes ramenées sur 20). Voir lib/bulletin/computeBulletin.ts.
--
-- RLS activé sans policy : lecture/écriture via la clé service role uniquement.
-- À exécuter dans l'éditeur SQL de Supabase avant la mise en ligne.

create table if not exists public.bulletins (
  code_etablissement text not null,
  code_utilisateur text not null,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamp with time zone not null default now(),
  constraint bulletins_pkey primary key (code_etablissement, code_utilisateur)
) TABLESPACE pg_default;

alter table public.bulletins enable row level security;
