-- Table des retours élèves (/votre-avis) : bugs, idées et avis.
-- L'insertion passe uniquement par l'API (service role), pas de politique RLS publique.
-- Deux modes d'identification, tous deux optionnels :
--   - connexion par codes (acces_etablissement) -> code_etablissement / code_eleve
--   - connexion par e-mail (users_email)        -> auth_user_id / email
-- À exécuter dans l'éditeur SQL de Supabase avant la mise en ligne.

create table public.retours_eleves (
  id uuid not null default gen_random_uuid (),
  type text not null check (type in ('bug', 'idee', 'avis')),
  page text null,
  message text not null,
  note integer null check (note between 1 and 5),
  code_etablissement text null,
  code_eleve text null,
  auth_user_id uuid null,
  email text null,
  prenom text null,
  classe text null,
  source text not null default 'votre-avis'::text,
  traite boolean not null default false,
  created_at timestamp with time zone not null default now(),
  constraint retours_eleves_pkey primary key (id)
) TABLESPACE pg_default;

create index IF not exists retours_eleves_etablissement_idx on public.retours_eleves using btree (code_etablissement, created_at desc) TABLESPACE pg_default;

create index IF not exists retours_eleves_type_idx on public.retours_eleves using btree (type, created_at desc) TABLESPACE pg_default;

create index IF not exists retours_eleves_traite_idx on public.retours_eleves using btree (traite, created_at desc) TABLESPACE pg_default;

-- RLS activé sans aucune policy : la clé anon (navigateur) ne peut ni lire ni écrire.
-- L'API /api/retours utilise la clé service role, qui ignore RLS.
alter table public.retours_eleves enable row level security;

-- Si la table existait déjà sans les colonnes e-mail, exécuter à la place :
-- alter table public.retours_eleves add column if not exists auth_user_id uuid null;
-- alter table public.retours_eleves add column if not exists email text null;
