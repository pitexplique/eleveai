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

-- ── Article 4 (22/07) : le but qui sort de la moyenne — la loi de Pareto ──────
-- Né d'une phrase de Mbappé (on renforce ses défauts, mais ce sont nos qualités
-- qui nous différencient). En maths : combler ses défauts, c'est la loi normale
-- (on converge vers la moyenne) ; cultiver sa qualité rare, c'est la queue
-- lourde de la loi de Pareto — là où vivent les records. Le contrepoint direct
-- de /loi-normale. ordre 2 : passe en tête de rubrique.
-- ── Article 5 (22/07) : la loi de la performance — le neurone de Mbappé ───────
-- Le dessin d'origine de Frédéric, un soir de juillet après une interview de
-- Kylian Mbappé (« améliorer ses défauts, mais surtout ses qualités »). ADN →
-- variables x → coefficients → réseau de neurones → performance : un neurone,
-- Σ aᵢxᵢ, dont l'élève règle les coefficients. Pendant individuel de la loi de
-- Pareto (l'un règle SES coefficients, l'autre regarde TOUS les joueurs).
-- ordre 1 : passe en tête de rubrique.
insert into public.journal_articles (rubrique, ordre, titre, accroche, image_url, lien, cta) values
  ('un-peu-de-maths', 1,
   'Faut-il améliorer ses défauts ou ses qualités ?',
   'Un soir de juillet, une interview de Mbappé : « améliore tes défauts, mais SURTOUT tes qualités ». J''ai dessiné ça sur une feuille à carreaux — ton ADN te donne des traits, tu poses des coefficients, un réseau de neurones les combine, et il en sort ta performance. C''est un neurone : une somme pondérée Σ aᵢxᵢ. Règle tes coefficients et vois.',
   '/images/adn-reseau-coeur.svg',
   '/loi-performance',
   '🧠 Règle tes coefficients →')
on conflict (rubrique, lien) do nothing;

insert into public.journal_articles (rubrique, ordre, titre, accroche, image_url, lien, cta) values
  ('un-peu-de-maths', 2,
   'Le but qui sort de la moyenne',
   '« On renforce ses défauts, mais ce sont nos qualités qui nous différencient » (Mbappé). En maths : combler ses défauts, c''est la loi normale — on converge vers la moyenne. Mais un record, « meilleur buteur de la Coupe du monde », n''est jamais une moyenne : c''est une valeur extrême, née dans la queue lourde de la loi de Pareto. Pousse le curseur, joue une saison, et regarde les buteurs d''exception surgir.',
   '/images/pareto-mbappe.svg',
   '/loi-pareto',
   '⚽ Fais surgir les records →')
on conflict (rubrique, lien) do nothing;

-- ── Article 6 (23/07) : la Diagonale des Fous — une équation différentielle ────
-- Le Grand Raid de La Réunion en maths : la réserve du coureur se vide au CARRÉ
-- de l'effort et avec la pente (dR/dt = −c·effort²·(1+pente)), intégrée pas à
-- pas (méthode d'Euler). Trop vite = le mur avant l'arrivée ; trop lent = la
-- barrière des 66 h ; le bon dosage vide la réserve pile à Saint-Denis. Image +
-- réglage + résultat sur un seul écran. ordre 0 : passe en tête de rubrique.
insert into public.journal_articles (rubrique, ordre, titre, accroche, image_url, lien, cta) values
  ('un-peu-de-maths', 0,
   'La Diagonale des Fous : doser, ou taper le mur',
   '165 km à travers l''île, barrière à 66 h. Ta réserve se vide au carré de l''effort et avec la pente — c''est une équation différentielle. Pars trop fort, tu tapes le mur avant l''arrivée ; trop doucement, la barrière te rattrape. Règle l''allure, lance la course, et cherche le dosage qui vide la réserve pile à Saint-Denis.',
   '/images/diagonale-des-fous.svg',
   '/diagonale-des-fous',
   '🏃 Lance la course →')
on conflict (rubrique, lien) do nothing;

-- ── Article 7 (25/07) : l'aiguille de Hong Wang — médaille Fields 2026 ────────
-- Le problème de l'aiguille (Kakeya, 1917) : faire demi-tour en balayant le
-- moins de surface possible — π/2, π/4, π/8… et Besicovitch prouve qu'on peut
-- approcher 0. Hong Wang (avec Joshua Zahl, 2025) ferme la version 3D → médaille
-- Fields le 23/07/2026 à Philadelphie (3e femme lauréate). Avec son tableau
-- décodé (projection, ombre F, tiroirs F′ ⊆ F) et ses mots (hommage aux profs
-- français ; « aucune différence entre les femmes et les hommes »).
-- INSERT en `where not exists` : rejouable même si la contrainte d'unicité
-- venait à manquer en prod. ordre -1 : passe en tête de rubrique.
insert into public.journal_articles (rubrique, ordre, titre, accroche, image_url, lien, cta)
select 'un-peu-de-maths', -1,
   'L''aiguille de Kakeya — Hong Wang, médaille Fields 2026',
   'Fais faire demi-tour à une aiguille en balayant le moins de place possible : 1,57 → 0,79 → 0,39… et les mathématiciens savent approcher 0. Le 23 juillet à Philadelphie, Hong Wang a reçu la médaille Fields pour avoir fermé la conjecture de Kakeya en 3D — en remerciant ses professeurs français. Troisième femme médaillée en 90 ans : pour elle, les maths ne font aucune différence entre les femmes et les hommes.',
   '/images/aiguille-de-kakeya.svg',
   '/aiguille-de-kakeya',
   '🪡 Fais tourner l''aiguille →'
where not exists (
  select 1 from public.journal_articles
  where rubrique = 'un-peu-de-maths' and lien = '/aiguille-de-kakeya'
);

-- ── Article 8 (26/07) : la dimension du volcan — le pont Fields → Fournaise ───
-- Le théorème de Hong Wang parle de DIMENSION, et la dimension se mesure :
-- box-counting sur le profil du rempart (ligne lisse ×2 → d = 1 ; rempart
-- ×2,4 → d ≈ 1,25, l'ordre de grandeur des côtes de Mandelbrot). ordre -2 :
-- passe en tête de rubrique.
insert into public.journal_articles (rubrique, ordre, titre, accroche, image_url, lien, cta)
select 'un-peu-de-maths', -2,
   'La dimension du volcan : la rugosité se mesure',
   'La médaille Fields de Hong Wang récompense une idée : la dimension — le nombre qui dit à quel point une forme remplit l''espace. Et la dimension, ça se mesure : pose une grille sur le rempart de la Fournaise, compte les carrés que la crête traverse, affine. Une ligne lisse fait ×2 (d = 1) ; le rempart fait ×2,4 → d ≈ 1,25. La rugosité du volcan, en un seul nombre.',
   '/images/dimension-volcan.svg',
   '/dimension-du-volcan',
   '📏 Mesure le rempart →'
where not exists (
  select 1 from public.journal_articles
  where rubrique = 'un-peu-de-maths' and lien = '/dimension-du-volcan'
);

-- ── Article 9 (30/07) : pourquoi les bulles sont rondes — l'isopérimétrie ─────
-- À périmètre fixe (la même ficelle), le CERCLE enferme le plus : on arrondit un
-- polygone et sa note 4πA/P² monte vers 1 (l'inégalité isopérimétrique). La bulle
-- « résout » ce problème par la physique (tension de surface → surface minimale →
-- sphère). Le hook : la question d'enfance de Yilin Wang (prix Salem 2024). Vidéos
-- Manim FR (youtu.be/LglNQebtdGs) + EN (youtu.be/h2t4Ce0ucfI), vitrine EN
-- /en/simulators/round-bubbles. ordre -3 : passe en tête de rubrique.
insert into public.journal_articles (rubrique, ordre, titre, accroche, image_url, lien, cta)
select 'un-peu-de-maths', -3,
   'Pourquoi les bulles sont rondes ?',
   'À ficelle égale, quelle forme enferme le plus de place ? On arrondit une forme et l''aire grimpe, jusqu''au cercle : c''est l''inégalité isopérimétrique. La bulle, elle, la résout sans calcul — sa peau se contracte pour avoir le moins de surface possible, une sphère. Cette question, la mathématicienne Yilin Wang (prix Salem 2024) se la posait déjà, enfant. Souffle ta bulle et fais monter la note jusqu''à 1.',
   '/images/bulles-rondes.svg',
   '/pourquoi-les-bulles-sont-rondes',
   '🫧 Souffle la bulle →'
where not exists (
  select 1 from public.journal_articles
  where rubrique = 'un-peu-de-maths' and lien = '/pourquoi-les-bulles-sont-rondes'
);
