-- LES ARTICLES DES RUBRIQUES DU JOURNAL — le patron de la régie (journal_une)
-- généralisé : une table, une colonne `rubrique`, et chaque rubrique de
-- l'accueil peut être pilotée depuis la base sans toucher au code.
-- Première rubrique servie : « Un peu de maths » (Frédéric, 20/07/2026) —
-- les pépites du prof, premier article : le simulateur d'epsilon.
-- Repli : si la table est vide/absente, le code affiche ses articles en dur.
--
-- À exécuter dans le SQL Editor de Supabase (une fois).

create table if not exists public.journal_articles (
  id         uuid primary key default gen_random_uuid(),
  rubrique   text not null,            -- 'un-peu-de-maths', demain 'comprendre'…
  titre      text not null,
  accroche   text,
  image_url  text,                     -- SVG animé bienvenu (il joue dans <img>)
  lien       text not null,
  cta        text,
  actif      boolean not null default true,
  ordre      integer not null default 100,
  created_at timestamptz not null default now()
);

create index if not exists journal_articles_rubrique_idx
  on public.journal_articles using btree (rubrique, actif, ordre);

-- RLS activé SANS policy : lecture/écriture uniquement via la clé service-role
-- (page serveur de l'accueil). Aucun accès direct navigateur.
alter table public.journal_articles enable row level security;

-- ── Graine : le premier article d'« Un peu de maths » ─────────────────────────
insert into public.journal_articles (rubrique, ordre, titre, accroche, image_url, lien, cta) values
  ('un-peu-de-maths', 10,
   'Activer des epsilons peut engendrer des infinis',
   'Chaque étincelle en allume k autres. Pousse le coefficient : à k = 2, ton premier infini s''allume — la suite géométrique, le R₀ des épidémies et l''entraide dans un seul curseur. En créole : « In min i lav lot ».',
   '/images/coeur-epsilon-infini.svg',
   '/simulateur-epsilon',
   '⚡ Active un epsilon →')
on conflict do nothing;
