-- Concours logo EleveAI : propositions de logos envoyées par les élèves connectés.
-- L'upload du fichier ET l'insertion de la ligne passent uniquement par l'API
-- (/api/concours-logo, clé service role). La clé anon (navigateur) ne peut rien.
-- À exécuter dans l'éditeur SQL de Supabase avant la mise en ligne.

-- 1) Bucket de stockage des images.
--    public = true : lecture publique (pour afficher la galerie via l'URL).
--    L'écriture reste réservée au service role (l'API).
insert into storage.buckets (id, name, public)
values ('concours-logos', 'concours-logos', true)
on conflict (id) do nothing;

-- 2) Table des métadonnées (jamais le nom de famille — RGPD élèves).
create table if not exists public.concours_logos (
  id uuid not null default gen_random_uuid (),
  code_etablissement text not null,
  code_utilisateur text not null,
  prenom text null,
  classe text null,
  image_path text not null,
  image_url text not null,
  masque boolean not null default false,
  created_at timestamp with time zone not null default now(),
  constraint concours_logos_pkey primary key (id)
) TABLESPACE pg_default;

create index if not exists concours_logos_visible_idx
  on public.concours_logos using btree (masque, created_at desc) TABLESPACE pg_default;

create index if not exists concours_logos_eleve_idx
  on public.concours_logos using btree (code_etablissement, code_utilisateur) TABLESPACE pg_default;

-- 3) RLS activé sans aucune policy : navigateur (anon) bloqué en lecture/écriture.
--    L'API utilise la clé service role, qui ignore RLS.
alter table public.concours_logos enable row level security;
