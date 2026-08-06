-- SIGNALEMENTS — bugs, erreurs pédagogiques, idées, avis.
--
-- Pourquoi une table à part de `retours_eleves` : celle-ci est faite pour des
-- ÉLÈVES CONNECTÉS et ne porte pas le contexte. Ici, n'importe qui peut
-- signaler — un parent, un professeur, un visiteur de passage sans compte —
-- et surtout on garde ce que la personne était en train de faire. Sans ce
-- contexte, « ça marche pas » est inexploitable ; avec, on rejoue la scène.
--
-- ── QUI, EN DEUX COLONNES ET C'EST VOULU ───────────────────────────────────
-- `profil` est ce que la personne a DIT être dans la matrice (déclaratif,
-- jamais vérifié). `type_utilisateur` vient de son compte quand elle en a un.
-- Les deux peuvent se contredire — quelqu'un qui déclare « Professeur » sans
-- être connecté n'est pas un professeur, et le voir vaut mieux que le croire.
--
-- ── RGPD ────────────────────────────────────────────────────────────────────
--   ✔ le message (tronqué à 1000 signes), le profil déclaré, le contexte de la
--     recherche, et le code établissement UNIQUEMENT si la personne est connectée ;
--   ✘ aucun nom, aucune IP en clair, aucun identifiant de session.
--   ⚠️ `empreinte` est un HACHAGE (SHA-256 tronqué) d'IP + navigateur, qui ne
--     sert qu'à bloquer un spammeur. Elle ne permet pas de remonter à quelqu'un
--     et se purge avec le reste.
--   ⚠️ Un enfant écrira « Léa de ma classe n'y arrive pas ». D'où la purge à
--     90 jours, et la mention dans la politique de confidentialité.
--
-- À exécuter dans l'éditeur SQL de Supabase.

create table if not exists public.signalements (
  id uuid not null default gen_random_uuid (),
  created_at timestamp with time zone not null default now(),

  -- ── QUI ──
  connecte boolean not null default false,
  profil text null,                    -- déclaré dans la matrice : 'cp'…'terminale', 'parent', 'prof', 'direction'
  code_etablissement text null,        -- seulement si connecté ; c'est par là qu'on recontacte
  type_utilisateur text null,          -- du compte réel : 'eleve', 'prof', 'principal'

  -- ── QUOI ──
  type text not null default 'bug',    -- 'bug' | 'erreur_pedagogique' | 'idee' | 'avis'
  message text not null,               -- tronqué à 1000 signes côté API

  -- ── OÙ — le contexte, et c'est lui qui rend le signalement exploitable ──
  page text null,                      -- section visitée, ex. '/ia', '/accueil'
  question text null,                  -- ce qui était tapé dans la barre
  notion_lue text null,                -- ce que le moteur avait compris
  intention_lue text null,
  ressources_proposees text null,      -- ids séparés par des virgules
  ressource_visee text null,           -- si le signalement porte sur UNE ressource

  -- ── TRAITEMENT (admin) ──
  statut text not null default 'nouveau',  -- 'nouveau' | 'vu' | 'traite' | 'rejete'
  note_interne text null,
  points_attribues smallint not null default 0,  -- ⚠️ jamais > 0 si connecte = false

  -- ── ANTI-SPAM ──
  empreinte text null,                 -- SHA-256 tronqué d'IP+navigateur ; jamais l'IP

  constraint signalements_pkey primary key (id)
) TABLESPACE pg_default;

-- La requête de tous les jours : ce qui vient d'arriver et qu'on n'a pas vu.
create index if not exists signalements_statut_idx
  on public.signalements using btree (statut, created_at desc) TABLESPACE pg_default;

create index if not exists signalements_created_idx
  on public.signalements using btree (created_at desc) TABLESPACE pg_default;

-- Le rate-limit interroge par empreinte sur une fenêtre courte.
create index if not exists signalements_empreinte_idx
  on public.signalements using btree (empreinte, created_at desc) TABLESPACE pg_default;

-- RLS : personne ne lit ni n'écrit avec la clé publique. L'API écrit en
-- service-role, l'admin lit en service-role — comme pages_vues et questions_entree.
alter table public.signalements enable row level security;

-- ── PURGE À 90 JOURS ────────────────────────────────────────────────────────
-- Un signalement traité depuis trois mois n'apprend plus rien, et garder du
-- texte libre indéfiniment n'a aucune raison d'être. Si pg_cron est disponible :
--
--   select cron.schedule(
--     'purge-signalements', '0 3 * * *',
--     $$delete from public.signalements where created_at < now() - interval '90 days'$$
--   );
--
-- Sinon, à passer à la main :
--   delete from public.signalements where created_at < now() - interval '90 days';
