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

-- Un article = un lien unique par rubrique : c'est CETTE contrainte qui rend
-- les graines réexécutables. (Sans elle, « on conflict do nothing » ne protège
-- rien — le fichier rejoué le 21/07 avait dupliqué l'epsilon.)
create unique index if not exists journal_articles_rubrique_lien_uniq
  on public.journal_articles using btree (rubrique, lien);

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
on conflict (rubrique, lien) do nothing;

-- ── Article 2 (21/07) : la courbe en cloche née des coefficients ─────────────
-- L'intuition de Frédéric, dessinée au stylo sur une feuille à carreaux :
-- la loi normale est la LIMITE d'une loi à coefficients (la binomiale, les
-- coefficients du triangle de Pascal) — le théorème de De Moivre-Laplace
-- (1733). ordre 5 : l'article le plus récent passe en tête de rubrique.
insert into public.journal_articles (rubrique, ordre, titre, accroche, image_url, lien, cta) values
  ('un-peu-de-maths', 5,
   'La courbe en cloche n''est pas tombée du ciel',
   'Tout est parti d''un dessin au stylo sur une feuille à carreaux : une courbe dentelée, une flèche « n → ∞ », une courbe lisse. La loi normale n''est pas un décret — c''est la limite d''une loi à coefficients. Fais grandir n, regarde l''escalier devenir cloche (De Moivre l''a prouvé en 1733), et apprends à ne jamais te juger sur une seule note.',
   '/images/binomiale-vers-normale.svg',
   '/loi-normale',
   '🔔 Fais grandir n →')
on conflict (rubrique, lien) do nothing;

-- ── Article 3 (22/07) : l'exponentielle en miroir ────────────────────────────
-- Le pendant de la cloche : deux courbes nées d'un dessin au stylo. La MONTÉE
-- (e^x — la vitesse proportionnelle à la hauteur, « le plat n'est pas
-- l'échec ») et la DESCENTE (e^(-x) — la courbe de l'oubli d'Ebbinghaus,
-- relancée par la révision espacée). ordre 3 : passe en tête de rubrique.
insert into public.journal_articles (rubrique, ordre, titre, accroche, image_url, lien, cta) values
  ('un-peu-de-maths', 3,
   'Plus j''avance, plus ma vitesse augmente',
   'Tout est parti d''un dessin au stylo : deux courbes en miroir. La montée — ta vitesse grandit avec ta hauteur, le plat du début n''est pas l''échec, c''est l''élan qui se charge. La descente — la courbe de l''oubli, qu''on relance en révisant. Oublier n''est pas un échec, c''est une loi.',
   '/images/exponentielle-miroir.svg',
   '/exponentielle',
   '🌱 Fais grandir ta vitesse →')
on conflict (rubrique, lien) do nothing;
