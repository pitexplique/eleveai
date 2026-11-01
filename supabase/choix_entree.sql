-- Le CHOIX DU CHEMIN sur la page d'entrée (eleveai.fr/) — 01/11/2026.
-- Frédéric : « en arrivant, soit tu vas dans le coach, soit dans le journal
-- d'EleveAI », « et tu vas compter dans Supabase le nombre de clics sur chaque
-- chemin ». Appelé par /api/choix-entree (sendBeacon au clic).
-- RGPD : aucune identité, aucune IP — un COMPTEUR par chemin et par jour,
-- comme video_vues.sql.
-- À exécuter dans l'éditeur SQL de Supabase.

create table if not exists public.choix_entree (
  chemin text not null check (chemin in ('coach', 'journal', 'accueil')),
  jour date not null default current_date,
  clics integer not null default 0,
  constraint choix_entree_pkey primary key (chemin, jour)
) TABLESPACE pg_default;

-- +1 en une seule requête (crée la ligne du jour si besoin), jour de La Réunion.
create or replace function public.compter_choix_entree(p_chemin text)
returns void
language sql
security definer
set search_path = public
as $$
  insert into public.choix_entree (chemin, jour, clics)
  values (p_chemin, (now() at time zone 'Indian/Reunion')::date, 1)
  on conflict (chemin, jour) do update set clics = public.choix_entree.clics + 1;
$$;

revoke all on function public.compter_choix_entree(text) from public, anon, authenticated;

-- RLS activé sans policy : seule la clé service role (API) écrit et lit.
alter table public.choix_entree enable row level security;

-- Lire le résultat :
--   select chemin, sum(clics) from public.choix_entree group by chemin;
--   select * from public.choix_entree order by jour desc, chemin;
