-- Sessions du tutor V4 (Coach IA) persistées côté base.
-- Avant, elles vivaient en mémoire serveur : en serverless (Vercel), chaque
-- requête peut toucher une instance différente → « Session introuvable »
-- aléatoires (retours élèves du 11/06/2026).
-- À exécuter dans l'éditeur SQL de Supabase AVANT de déployer le code
-- (sans la table, le code retombe sur la mémoire = comportement actuel).

create table public.tutor_sessions_v4 (
  id text not null,
  data jsonb not null,
  expires_at timestamp with time zone not null,
  updated_at timestamp with time zone not null default now(),
  constraint tutor_sessions_v4_pkey primary key (id)
) TABLESPACE pg_default;

create index IF not exists tutor_sessions_v4_expires_idx on public.tutor_sessions_v4 using btree (expires_at) TABLESPACE pg_default;

-- RLS activé sans policy : la clé anon ne peut ni lire ni écrire.
-- Les API /api/tutor-v4/* utilisent la clé service role, qui ignore RLS.
alter table public.tutor_sessions_v4 enable row level security;
