-- Extension de notion_ressources : rattacher une ressource (vidéo YouTube…) à
-- une MICRO-COMPÉTENCE précise, et plus seulement à la notion entière.
--
-- Idée : à côté de chaque micro-compétence du coach, on veut pouvoir coller un
-- lien YouTube qui porte EXACTEMENT sur cette compétence. La vidéo EleveAI de
-- la notion (micro_id vide) reste, elle : les deux niveaux coexistent.
--
--   micro_id = ''      → ressource de la NOTION (vidéo EleveAI, comportement
--                        historique : badge « Vidéo » dans l'en-tête de notion).
--   micro_id = "<id>"  → ressource attachée à CETTE micro-compétence (petit
--                        lien YouTube sur la ligne correspondante).
--
-- La clé reste le microId/notionId DU COACH — aucune table de correspondance.
--
-- À exécuter dans l'éditeur SQL de Supabase APRÈS notion_ressources.sql. Sans
-- elle, rien ne casse : les liens par micro n'apparaissent simplement pas.

alter table public.notion_ressources
  add column if not exists micro_id text not null default '';

-- L'unicité inclut désormais le micro : une même URL peut servir la notion ET
-- une micro-compétence donnée sans se marcher dessus.
alter table public.notion_ressources
  drop constraint if exists notion_ressources_unique;

alter table public.notion_ressources
  add constraint notion_ressources_unique
  unique (matiere, classe, notion_id, micro_id, url);
