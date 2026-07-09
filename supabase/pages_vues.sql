-- Journal AGRÉGÉ des pages vues par les élèves connectés — « où vont les élèves ».
-- RGPD : volontairement SANS identité (pas de code_utilisateur, pas de nom).
-- On ne stocke que la SECTION visitée (1er segment de l'URL, ex. « /dico »,
-- « /tutor-v4 ») + le code établissement, pour une lecture 100 % agrégée.
-- Alimentée côté serveur (clé service role) depuis /api/track (fire-and-forget).
-- À exécuter dans l'éditeur SQL de Supabase avant la mise en ligne.

create table if not exists public.pages_vues (
  id uuid not null default gen_random_uuid (),
  created_at timestamp with time zone not null default now(),
  page text not null,                  -- section visitée, ex. '/dico', '/tutor-v4', '/'
  code_etablissement text null,        -- 'INDEPENDANT' pour les comptes email ; null si inconnu
  pays text null,                      -- code ISO 2 lettres (x-vercel-ip-country), ex. 'FR','RE','US' ; null en dev
  constraint pages_vues_pkey primary key (id)
) TABLESPACE pg_default;

-- Si la table existe déjà (créée avant l'ajout du pays), exécuter :
alter table public.pages_vues add column if not exists pays text null;

create index if not exists pages_vues_created_idx
  on public.pages_vues using btree (created_at desc) TABLESPACE pg_default;

create index if not exists pages_vues_etab_idx
  on public.pages_vues using btree (code_etablissement, created_at desc) TABLESPACE pg_default;

create index if not exists pages_vues_pays_idx
  on public.pages_vues using btree (pays, created_at desc) TABLESPACE pg_default;

-- RLS activé sans policy : la clé anon (navigateur) ne peut ni lire ni écrire.
-- Seule la clé service role (API) écrit et lit.
alter table public.pages_vues enable row level security;
