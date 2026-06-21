-- Snapshot pré-calculé des palmarès « Élèves à l'honneur ».
-- Au lieu de recalculer le palmarès à chaque rendu de la page d'accueil
-- (lourd à l'échelle de centaines/milliers d'élèves), on stocke le résultat
-- déjà calculé dans cette table : 1 ligne par palmarès, lue instantanément.
--
-- Le rafraîchissement est « paresseux » (côté serveur, lib/ameliorations/
-- honneurServer.ts) : si la ligne a plus de TTL (1 h), le prochain rendu la
-- recalcule et la réécrit. Aucun cron nécessaire. Si un jour on veut un vrai
-- cron (Vercel Cron / pg_cron), il suffira d'appeler le même recalcul.
--
-- id = clé du palmarès : 'avis' (avis/bugs/idées). Plus tard : 'resultats'.
-- data = tableau JSON d'objets { emoji, categorie, eleve, pour }.
--
-- RLS activé sans policy : lecture/écriture via la clé service role uniquement
-- (la clé anon du navigateur n'y touche pas). À exécuter dans l'éditeur SQL de
-- Supabase avant la mise en ligne.

create table if not exists public.palmares (
  id text not null,                                  -- 'avis' | 'resultats' | …
  data jsonb not null default '[]'::jsonb,           -- entrées du palmarès
  computed_at timestamp with time zone not null default now(),
  constraint palmares_pkey primary key (id)
) TABLESPACE pg_default;

alter table public.palmares enable row level security;
