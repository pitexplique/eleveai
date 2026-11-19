-- Webhooks Stripe traités UNE seule fois (19/11/2026, modèle « on paie le suivi »).
-- Stripe peut renvoyer le même événement : on note son id avant de le traiter ;
-- un id déjà noté est ignoré. Si le traitement échoue, la ligne est retirée pour
-- que Stripe puisse le renvoyer.
-- ⚠️ À exécuter dans Supabase (SQL Editor), après abonnements.sql.

create table if not exists public.stripe_evenements (
  id text primary key,                 -- evt_…
  type text not null,
  traite_le timestamp with time zone not null default now()
);

alter table public.stripe_evenements enable row level security;
-- Aucune politique : seule la clé de service (le webhook) y écrit.

-- Le tarif payé (suivi_monthly / suivi_yearly), pour savoir d'où vient l'accès.
alter table public.abonnements add column if not exists tarif text;
