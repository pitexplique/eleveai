-- Table maintenance_checklist : état COCHÉ de la checklist de maintenance du
-- dashboard admin (app/admin/dashboard/MaintenanceChecklist.tsx). La LISTE des
-- tâches vit dans le code (lib/admin/maintenance.ts, elle change rarement) ; seul
-- l'état « fait / pas fait » est persisté ici, pour qu'il tienne d'un jour à
-- l'autre ET d'un appareil à l'autre (vs localStorage d'un seul navigateur).
--
-- Une ligne = une tâche cochée pour une période donnée. Présence de la ligne =
-- tâche faite ; on la supprime quand on décoche. Les périodes se « réinitialisent »
-- toutes seules : chaque jour / chaque semaine a sa propre `cle_periode`.
--
-- Accès via la clé service role (route /api/admin/maintenance, cookie admin) —
-- RLS bloque le navigateur. À exécuter dans l'éditeur SQL de Supabase.

create table public.maintenance_checklist (
  id uuid not null default gen_random_uuid (),
  periode text not null,        -- 'quotidien' | 'hebdo'
  cle_periode text not null,    -- jour '2026-07-03' | semaine ISO '2026-W27'
  tache_id text not null,       -- id de la tâche (cf. lib/admin/maintenance.ts)
  done_at timestamp with time zone not null default now(),
  constraint maintenance_checklist_pkey primary key (id),
  -- Une seule ligne par (période, clé, tâche) → l'upsert coche, le delete décoche.
  constraint maintenance_checklist_unique unique (periode, cle_periode, tache_id)
) TABLESPACE pg_default;

create index IF not exists maintenance_checklist_periode_idx
  on public.maintenance_checklist using btree (periode, cle_periode) TABLESPACE pg_default;

-- RLS activé SANS policy : navigateur (anon) bloqué ; l'app lit/écrit via service role.
alter table public.maintenance_checklist enable row level security;
