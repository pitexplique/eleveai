-- Lectures des vidéos EleveAI sur Cloudflare R2 — « combien de vues ? ».
-- 20/10/2026. R2 ne compte rien par fichier : c'est le lecteur du site qui
-- signale chaque lecture lancée (une par vidéo et par ouverture de page), via
-- /api/video-vue. RGPD : aucune identité, aucune IP — juste un COMPTEUR.
--
-- ⭐ Un compteur par vidéo et par JOUR, pas une ligne par vue : la taille ne
-- dépend pas du succès. Au pire 3 000 vidéos vues chaque jour = 1,1 M lignes
-- par an (~100 Mo) ; en vrai bien moins (une ligne n'existe que si la vidéo a
-- été vue ce jour-là). Le plan gratuit de Supabase donne 500 Mo.
-- À exécuter dans l'éditeur SQL de Supabase.

create table if not exists public.video_vues (
  video_id text not null,              -- clé de lib/videos/videos-r2.json, ex. '3e-proba-vocabulaire'
  jour date not null default current_date,
  vues integer not null default 0,
  constraint video_vues_pkey primary key (video_id, jour)
) TABLESPACE pg_default;

create index if not exists video_vues_jour_idx
  on public.video_vues using btree (jour desc) TABLESPACE pg_default;

-- +1 en une seule requête (crée la ligne du jour si besoin).
create or replace function public.compter_vue_video(p_video text)
returns void
language sql
security definer
set search_path = public
as $$
  insert into public.video_vues (video_id, jour, vues)
  values (p_video, (now() at time zone 'Indian/Reunion')::date, 1)
  on conflict (video_id, jour) do update set vues = public.video_vues.vues + 1;
$$;

revoke all on function public.compter_vue_video(text) from public, anon, authenticated;

-- RLS activé sans policy : seule la clé service role (API) écrit et lit.
alter table public.video_vues enable row level security;
