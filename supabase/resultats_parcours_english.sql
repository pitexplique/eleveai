-- Table des résultats du Parcours English (/parcours-english-maths).
-- Même structure que resultats_parcours (maths) : score/total en numeric,
-- pourcentage calculé automatiquement (colonne générée — ne pas l'insérer).
-- À exécuter dans l'éditeur SQL de Supabase : sans elle, le bouton
-- « Save my score » du parcours anglais échoue silencieusement.

create table public.resultats_parcours_english (
  id uuid not null default gen_random_uuid (),
  code_etablissement text not null,
  code_utilisateur text not null,
  nom text null,
  classe text null,
  niveau text null,
  matiere text not null default 'english'::text,
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
  constraint resultats_parcours_english_pkey primary key (id)
) TABLESPACE pg_default;

create index IF not exists resultats_parcours_english_eleve_idx on public.resultats_parcours_english using btree (
  code_etablissement,
  code_utilisateur,
  created_at desc
) TABLESPACE pg_default;

create index IF not exists resultats_parcours_english_etablissement_idx on public.resultats_parcours_english using btree (code_etablissement, created_at desc) TABLESPACE pg_default;
