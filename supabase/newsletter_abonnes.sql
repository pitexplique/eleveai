-- Abonnés newsletter SANS compte (coupon « Recevez le journal » de l'accueil).
-- users_email exige auth_user_id (comptes authentifiés) : un lecteur du journal
-- qui laisse juste son email vit ici. L'envoi admin lit LES DEUX sources :
--   users_email.accepte_newsletter = true  (comptes consentants)
--   newsletter_abonnes.actif = true        (abonnés du journal)
-- La désinscription (jeton HMAC) met à jour les deux tables.
--
-- À exécuter dans le SQL Editor de Supabase (une fois).

create table if not exists public.newsletter_abonnes (
  id         uuid primary key default gen_random_uuid(),
  email      text not null unique,
  source     text not null default 'journal',
  actif      boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists newsletter_abonnes_actif_idx
  on public.newsletter_abonnes using btree (actif);

-- RLS activé SANS policy : lecture/écriture uniquement via la clé service-role
-- (routes serveur). Aucun accès direct depuis le navigateur.
alter table public.newsletter_abonnes enable row level security;
