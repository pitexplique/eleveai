-- PROFS DE L'AVENTURE — une classe offerte, dans l'un des 8 pays du plan.
--
-- 03/11/2026. Un professeur rejoint l'aventure : sa classe a tout EleveAI
-- gratuitement pour l'année, et il apporte son regard de prof de son pays
-- (ce qui colle à son programme, ce qui coince, les contextes de chez lui).
-- Les 8 pays sont les cases d'un plan d'expérience 2³ : voir lib/aventure/pays.ts.
--
-- Pourquoi une table à part et pas un groupe de plus dans beta_testeurs : la
-- bêta compte 50 PLACES et son compteur est public ; une classe offerte n'en
-- prend aucune, et elle porte un pays et une classe que la bêta n'a pas.
--
-- On n'attribue RIEN automatiquement : Frédéric accepte à la main, pour que
-- chaque pays ait ses deux classes et pas vingt la même.
--
-- À exécuter dans l'éditeur SQL de Supabase. Idempotent : ré-exécutable.

create table if not exists public.profs_aventure (
  id uuid not null default gen_random_uuid (),
  created_at timestamp with time zone not null default now(),

  prenom text null,                          -- prénom seul, jamais le nom
  email text not null,
  pays text not null,                        -- slug de lib/aventure/pays.ts
  niveaux text null,                         -- ce qu'il enseigne, en clair (« 6e et 4e »)
  etablissement text null,                   -- facultatif : ville ou établissement
  message text null,                         -- 600 signes, tronqué côté API

  annee text not null default '2026-2027',
  statut text not null default 'candidat',   -- 'candidat' | 'accepte' | 'refuse' | 'termine'
  note_interne text null,

  -- ANTI-SPAM : SHA-256 tronqué d'IP+navigateur ; jamais l'IP en clair.
  empreinte text null,

  constraint profs_aventure_pkey primary key (id)
) TABLESPACE pg_default;

alter table public.profs_aventure
  drop constraint if exists profs_aventure_pays_check;
alter table public.profs_aventure
  add constraint profs_aventure_pays_check check (
    pays = any (array['france'::text, 'andorre'::text, 'suisse'::text, 'belgique'::text,
                      'luxembourg'::text, 'cote-divoire'::text, 'senegal'::text, 'maroc'::text])
  );

alter table public.profs_aventure
  drop constraint if exists profs_aventure_statut_check;
alter table public.profs_aventure
  add constraint profs_aventure_statut_check check (
    statut = any (array['candidat'::text, 'accepte'::text, 'refuse'::text, 'termine'::text])
  );

-- Un prof ne candidate qu'une fois par année.
create unique index if not exists profs_aventure_email_annee_idx
  on public.profs_aventure (annee, lower(email));

-- L'écran de tous les jours : combien de classes par pays, et ce qui attend.
create index if not exists profs_aventure_pays_idx
  on public.profs_aventure (annee, statut, pays);

-- RLS : personne ne lit ni n'écrit avec la clé publique. L'API écrit en
-- service-role, comme beta_testeurs et signalements.
alter table public.profs_aventure enable row level security;
