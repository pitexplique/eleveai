-- Table des résultats du Parcours Français (/parcours-francais).
-- Même structure que resultats_parcours_maths : score/total en numeric,
-- pourcentage calculé automatiquement (colonne générée — ne pas l'insérer).
-- À exécuter dans l'éditeur SQL de Supabase : sans elle, le bouton
-- « Enregistrer mon score » du parcours français échoue.
--
-- Les écritures passent par /api/resultats (clé service role) et les
-- lectures par /api/dashboard : le RLS est donc activé directement,
-- sans policy (même pattern que les autres tables resultats_*).

create table public.resultats_parcours_francais (
  id uuid not null default gen_random_uuid (),
  code_etablissement text not null,
  code_utilisateur text not null,
  nom text null,
  classe text null,
  niveau text null,
  matiere text not null default 'francais'::text,
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
  constraint resultats_parcours_francais_pkey primary key (id)
) TABLESPACE pg_default;

create index IF not exists resultats_parcours_francais_eleve_idx on public.resultats_parcours_francais using btree (
  code_etablissement,
  code_utilisateur,
  created_at desc
) TABLESPACE pg_default;

create index IF not exists resultats_parcours_francais_etablissement_idx on public.resultats_parcours_francais using btree (code_etablissement, created_at desc) TABLESPACE pg_default;

-- RLS sans policy : la clé anon (navigateur) ne peut ni lire ni écrire ;
-- la clé service role (routes API) ignore le RLS.
alter table public.resultats_parcours_francais enable row level security;
