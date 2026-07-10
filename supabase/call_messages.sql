-- « En direct » : inscriptions aux calls (sessions visio avec le fondateur).
-- Un call = une entrée dans lib/calls.ts (source de vérité, versionnée) ;
-- cette table ne stocke QUE les inscriptions (« réponses »), à la manière de
-- contact_messages. RGPD : l'email sert uniquement à envoyer le lien visio et
-- le rappel du call ; le lien visio n'est jamais affiché publiquement.
-- Écriture via /api/call (clé service role). RLS sans policy : le navigateur
-- (clé anon) ne peut ni lire ni écrire.
-- À exécuter dans l'éditeur SQL de Supabase avant la mise en ligne.

create table if not exists public.call_messages (
  id uuid not null default gen_random_uuid (),
  created_at timestamp with time zone not null default now(),
  call_id text not null,               -- id du call dans lib/calls.ts, ex. 'decouverte-2026-07'
  email text not null,                 -- pour envoyer le lien + le rappel
  prenom text null,                    -- optionnel, pour personnaliser l'email
  role text not null default 'parent'
    check (role in ('eleve', 'parent', 'enseignant')),
  consentement_newsletter boolean not null default false, -- opt-in nouveautés (séparé du lien du call)
  present boolean null,                -- coché APRÈS le call -> mesure le taux de présence réel
  constraint call_messages_pkey primary key (id)
) TABLESPACE pg_default;

-- Une seule inscription par email et par call (anti-doublon, insensible à la casse).
create unique index if not exists call_messages_unique_inscription
  on public.call_messages (call_id, lower(email)) TABLESPACE pg_default;

-- Liste des inscrits d'un call, du plus récent au plus ancien.
create index if not exists call_messages_call_idx
  on public.call_messages using btree (call_id, created_at desc) TABLESPACE pg_default;

-- RLS activé sans policy : seule la clé service role (API) lit et écrit.
alter table public.call_messages enable row level security;
