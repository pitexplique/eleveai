-- Résultats de la « Dictée du jour » (/dictee-du-jour), enregistrés pour les
-- élèves connectés. Même structure que les autres resultats_* : score/total en
-- numeric, pourcentage généré automatiquement (ne pas l'insérer).
-- Écriture service-role uniquement (RLS actif) via /api/resultats (type=dictee).
-- À exécuter dans l'éditeur SQL de Supabase avant la mise en ligne.

create table if not exists public.resultats_dictee (
  id uuid not null default gen_random_uuid (),
  code_etablissement text not null,
  code_utilisateur text not null,
  nom text null,
  classe text null,
  score numeric not null,
  total numeric not null,
  pourcentage numeric GENERATED ALWAYS as (
    case
      when (total > (0)::numeric) then round(((score / total) * (100)::numeric), 2)
      else (0)::numeric
    end
  ) STORED null,
  details jsonb null,
  created_at timestamp with time zone not null default now(),
  constraint resultats_dictee_pkey primary key (id)
) TABLESPACE pg_default;

create index if not exists resultats_dictee_eleve_idx
  on public.resultats_dictee using btree (code_etablissement, code_utilisateur, created_at desc) TABLESPACE pg_default;

create index if not exists resultats_dictee_etablissement_idx
  on public.resultats_dictee using btree (code_etablissement, created_at desc) TABLESPACE pg_default;

-- RLS activé sans policy : navigateur bloqué, seule la clé service role écrit/lit.
alter table public.resultats_dictee enable row level security;
