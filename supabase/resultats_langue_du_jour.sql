-- Résultats des RITUELS DE LANGUE « X du jour » — UNE SEULE table pour toutes
-- les langues (anglais, espagnol, et plus tard d'autres) : la colonne `langue`
-- distingue. Enregistrés pour les élèves connectés, même structure que les
-- autres resultats_* (score/total numeric, pourcentage généré — ne pas
-- l'insérer). Écriture service-role uniquement (RLS actif) via /api/resultats
-- (type=langue_du_jour).
-- À exécuter dans l'éditeur SQL de Supabase avant la mise en ligne.

create table if not exists public.resultats_langue_du_jour (
  id uuid not null default gen_random_uuid (),
  code_etablissement text not null,
  code_utilisateur text not null,
  nom text null,
  langue text not null,          -- 'anglais' | 'espagnol' | …
  niveau text null,              -- 'tous' | 'A1' | 'A2' | 'B1' | 'B2'
  score numeric not null,
  total numeric not null,
  pourcentage numeric GENERATED ALWAYS as (
    case
      when (total > (0)::numeric) then round(((score / total) * (100)::numeric), 2)
      else (0)::numeric
    end
  ) STORED null,
  details jsonb null,            -- { date, mots: [{ mot, fr, niveau, ok }], revisions }
  created_at timestamp with time zone not null default now(),
  constraint resultats_langue_du_jour_pkey primary key (id)
) TABLESPACE pg_default;

create index if not exists resultats_langue_du_jour_eleve_idx
  on public.resultats_langue_du_jour using btree (code_etablissement, code_utilisateur, created_at desc) TABLESPACE pg_default;

create index if not exists resultats_langue_du_jour_etablissement_idx
  on public.resultats_langue_du_jour using btree (code_etablissement, created_at desc) TABLESPACE pg_default;

create index if not exists resultats_langue_du_jour_langue_idx
  on public.resultats_langue_du_jour using btree (langue, created_at desc) TABLESPACE pg_default;

-- RLS activé sans policy : navigateur bloqué, seule la clé service role écrit/lit.
alter table public.resultats_langue_du_jour enable row level security;
