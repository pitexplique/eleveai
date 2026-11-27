-- ⭐ 27/11/2026 — TOUT CE QU'IL FAUT DANS SUPABASE POUR LE PAIEMENT DES FAMILLES, EN UNE FOIS.
-- À coller dans Supabase → SQL Editor → Run. Sans danger à relancer : chaque ligne
-- vérifie d'abord si la table ou la colonne existe déjà (if not exists).
-- Contient : abonnements.sql + suivi_parent.sql + stripe_evenements.sql + la grille du 27/11.

-- ===== supabase/abonnements.sql =====
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

-- ===== supabase/suivi_parent.sql =====
-- La vue parent du suivi famille (05/11/2026).
-- L'enfant crée un code dans son espace, le parent abonné le saisit : c'est ainsi
-- que le lien naît, jamais sans l'enfant.
-- RLS activé sans policy : lecture et écriture par la clé service role uniquement.
-- À exécuter dans l'éditeur SQL de Supabase, après abonnements.sql.

create table if not exists public.codes_parent (
  code text primary key,
  code_etablissement text not null,
  code_utilisateur text not null,
  expire_le timestamp with time zone not null,
  created_at timestamp with time zone not null default now(),
  constraint codes_parent_un_par_enfant unique (code_etablissement, code_utilisateur)
);

create table if not exists public.enfants_parent (
  parent_user_id uuid not null references auth.users (id) on delete cascade,
  code_etablissement text not null,
  code_utilisateur text not null,
  created_at timestamp with time zone not null default now(),
  constraint enfants_parent_pkey primary key (parent_user_id, code_etablissement, code_utilisateur)
);

create index if not exists enfants_parent_enfant_idx
  on public.enfants_parent (code_etablissement, code_utilisateur);

-- Le compte rendu hebdomadaire par courriel (06/11/2026).
alter table public.abonnements add column if not exists compte_rendu boolean not null default true;
alter table public.abonnements add column if not exists dernier_compte_rendu timestamp with time zone;

alter table public.codes_parent enable row level security;
alter table public.enfants_parent enable row level security;

-- ===== supabase/stripe_evenements.sql =====
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

-- ===== Grille familles du 27/11/2026 =====
-- offre : 'eleve' (1 enfant) ou 'famille' (3 enfants) ; enfants : le nombre payé
-- (3 + les enfants en plus). Écrit par le webhook Stripe seulement.
alter table public.abonnements add column if not exists offre text check (offre in ('eleve', 'famille'));
alter table public.abonnements add column if not exists enfants integer not null default 3 check (enfants between 1 and 20);
