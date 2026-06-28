-- « Les maths en vrai — 974 » : carnet de bord réel d'EleveAI.
-- Le fondateur capture sur le terrain (photo + texte) une situation de La Réunion
-- et la notion de maths qui se cache derrière. La vidéo, elle, vit sur YouTube
-- (gratuit) : on ne stocke que son identifiant. Tout passe par l'API admin
-- (/api/admin/maths-974, clé service role) — le navigateur (anon) ne peut rien.
-- À exécuter dans l'éditeur SQL de Supabase avant la mise en ligne.

-- 1) Bucket des photos. public = true : lecture publique pour afficher les cartes.
--    L'écriture reste réservée au service role (l'API, après contrôle du cookie admin).
insert into storage.buckets (id, name, public)
values ('maths-974', 'maths-974', true)
on conflict (id) do nothing;

-- 2) Table des captures.
create table if not exists public.maths_974 (
  id uuid not null default gen_random_uuid (),
  lieu text not null,                 -- "Piton de la Fournaise", "Marché de Saint-Paul"…
  titre text not null,                -- accroche de la carte
  situation text not null,            -- ce que l'on voit, le contexte réel
  notion text null,                   -- la/les notion(s) de maths : "Proportionnalité, débit"
  niveau text null,                   -- "5e–4e", "Cycle 4"…
  question text null,                 -- le mini-défi
  reponse text null,                  -- le corrigé (révélé au clic)
  emerveillement text null,           -- le brin de poésie : pourquoi c'est beau, l'espoir, l'amour
  image_path text null,               -- chemin dans le bucket (null si vidéo seule)
  image_url text null,                -- URL publique de la photo
  youtube_id text null,               -- identifiant de la vidéo YouTube (null si photo seule)
  coach_classe text null,             -- "5e" -> lien « je m'entraîne » /coach-ia/maths?classe=5e
  lat double precision null,          -- pour la future carte de l'île (vide pour l'instant)
  lng double precision null,
  masque boolean not null default false, -- caché du public sans suppression
  created_at timestamp with time zone not null default now(),
  constraint maths_974_pkey primary key (id)
) TABLESPACE pg_default;

create index if not exists maths_974_visible_idx
  on public.maths_974 using btree (masque, created_at desc) TABLESPACE pg_default;

-- 2 bis) Migration pour une base déjà créée : ajoute la colonne « émerveillement ».
--        Sans risque si elle existe déjà.
alter table public.maths_974 add column if not exists emerveillement text null;

-- 3) RLS activé sans aucune policy : navigateur (anon) bloqué.
--    L'API utilise la clé service role, qui ignore RLS.
alter table public.maths_974 enable row level security;
