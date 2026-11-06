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
