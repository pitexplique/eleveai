-- Table notion_ressources : les ressources EXTERNES attachées à une notion du
-- coach (vidéos YouTube d'abord, podcasts ensuite…). La clé est le `notion_id`
-- DU COACH (ex. "triangle_figure") — le même identifiant partout, donc aucune
-- table de correspondance à maintenir.
--
-- Ce qui N'EST PAS ici : les fiches de cours (elles sont du code, leur
-- existence est déjà connue via le registre — slug de fiche = notion_id) et
-- les libellés de notions (déjà dans le catalogue coach). On ne stocke que ce
-- qui est de la DONNÉE externe et éditable sans redéploiement.
--
-- Administrée depuis /admin/ressources (cookie admin signé) via
-- /api/admin/notion-ressources. Lue publiquement (vidéos seulement) par le
-- coach via /api/notion-videos.
--
-- À exécuter dans l'éditeur SQL de Supabase. Sans elle, rien ne casse : le
-- coach n'affiche simplement aucun badge « Vidéo ».

create table if not exists public.notion_ressources (
  id         uuid not null default gen_random_uuid (),
  matiere    text not null,               -- "maths"
  classe     text not null,               -- "6e", "premiere-spe"…
  notion_id  text not null,               -- notionId DU COACH : "triangle_figure"
  type       text not null default 'video', -- "video" | "podcast" | …
  url        text not null,               -- lien YouTube (ou autre)
  titre      text null,                    -- titre affiché (optionnel)
  created_at timestamp with time zone not null default now(),
  constraint notion_ressources_pkey primary key (id),
  -- Une même URL n'est attachée qu'une fois à une notion donnée.
  constraint notion_ressources_unique unique (matiere, classe, notion_id, url)
) TABLESPACE pg_default;

create index if not exists notion_ressources_notion_idx
  on public.notion_ressources using btree (matiere, classe, notion_id) TABLESPACE pg_default;

-- RLS activé SANS policy : la clé anon (navigateur) ne touche pas la table.
-- L'admin y accède via la clé service role ; le coach lit via une route
-- serveur (/api/notion-videos) qui ne renvoie que les vidéos.
alter table public.notion_ressources enable row level security;
