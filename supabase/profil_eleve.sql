-- Table profil_eleve : snapshot du profil d'un élève (Niveau + Comportement +
-- recommandations rule-based), recalculé à chaque sauvegarde de résultat par
-- mettreAJourProfil() (lib/profil-eleve/computeProfil.ts) et lu par
-- /api/profil-eleve. Même pattern que la table `bulletins` : tout le profil est
-- stocké dans une colonne `data jsonb`, une ligne par élève.
--
-- À exécuter dans l'éditeur SQL de Supabase : sans elle, le profil ne se
-- persiste pas (mais /api/resultats reste OK — l'upsert est tolérant).

create table public.profil_eleve (
  id uuid not null default gen_random_uuid (),
  code_etablissement text not null,
  code_utilisateur text not null,
  data jsonb not null,
  updated_at timestamp with time zone not null default now(),
  created_at timestamp with time zone not null default now(),
  constraint profil_eleve_pkey primary key (id),
  -- Une seule ligne par élève → l'upsert (onConflict) écrase le snapshot.
  constraint profil_eleve_eleve_unique unique (code_etablissement, code_utilisateur)
) TABLESPACE pg_default;

create index IF not exists profil_eleve_etablissement_idx on public.profil_eleve using btree (code_etablissement, updated_at desc) TABLESPACE pg_default;

-- RLS activé SANS aucune policy (même pattern que resultats_* et bulletins) :
-- la clé anon (navigateur) ne peut ni lire ni écrire ; seule la clé service role
-- utilisée par /api/resultats et /api/profil-eleve accède à la table.
-- Important RGPD : profilage de mineurs → jamais exposé à la clé publique.
alter table public.profil_eleve enable row level security;
