-- Abonnements Stripe du suivi famille (05/11/2026).
-- Une ligne par compte. Seul le webhook Stripe (clé service role) écrit l'accès.
-- RLS activé sans policy : lecture et écriture par la clé service role uniquement.
-- À exécuter dans l'éditeur SQL de Supabase avant d'encaisser.

create table if not exists public.abonnements (
  user_id uuid primary key references auth.users (id) on delete cascade,
  email text,
  stripe_customer_id text unique,
  stripe_subscription_id text,
  formule text check (formule in ('mensuel', 'annee')),
  statut text not null default 'aucun',
  acces_jusquau timestamp with time zone,
  fin_programmee boolean not null default false,
  zone text,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

alter table public.abonnements enable row level security;
