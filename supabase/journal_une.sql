-- LA RÉGIE DU RÉDACTEUR EN CHEF : les slides du carrousel de la Une du journal
-- (accueil). Édités depuis /admin/journal (Frédéric) ou directement en base
-- (l'assistant). Le carrousel de l'accueil lit les slides actifs par ordre ;
-- si la table est vide/absente, le code retombe sur les 6 épisodes en dur.
--
-- Un slide = une « manchette » : surtitre (kicker), titre, chapô (accroche),
-- une image (vignette YouTube auto via youtube_id, OU image_url libre),
-- un lien CTA (interne « /defis-du-jour » ou externe « https://youtu.be/... »),
-- et une ligne défi optionnelle.
--
-- À exécuter dans le SQL Editor de Supabase (une fois).

create table if not exists public.journal_une (
  id         uuid primary key default gen_random_uuid(),
  kicker     text not null default 'Réfléchir · En vrai, à La Réunion',
  titre      text not null,
  accroche   text,
  youtube_id text,
  image_url  text,
  lien       text not null,
  cta        text not null default 'Lire →',
  defi       text,
  actif      boolean not null default true,
  ordre      integer not null default 100,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists journal_une_actif_ordre_idx
  on public.journal_une using btree (actif, ordre);

-- RLS activé SANS policy : lecture/écriture uniquement via la clé service-role
-- (page serveur de l'accueil + API admin). Aucun accès direct navigateur.
alter table public.journal_une enable row level security;

-- ── Graine : la Une actuelle (les 6 épisodes « en vrai ») ─────────────────────
insert into public.journal_une (ordre, titre, accroche, youtube_id, lien, cta, defi) values
  (10, 'La canne à sucre : du champ à la lumière',
      'Suis un planteur : sa canne devient du jus, du sirop, des cristaux au Gol. Et la bagasse fait de l''électricité — la canne donne du sucre ET de la lumière. Derrière, une filière de 18 000 personnes qu''on n''oublie jamais.',
      'hH2N0Cvx-AI', 'https://youtu.be/hH2N0Cvx-AI', 'Regarder l''épisode →',
      'la proportionnalité — 3 000 m² de canne, combien de sucre ?'),
  (20, 'Les requins : la peur et le risque réel',
      '~10 morts/an dans le monde ; la route : ~1 300 000. Et le requin garde le récif qui fait le lagon.',
      '3bPBjYsRciA', 'https://youtu.be/3bPBjYsRciA', 'Regarder l''épisode →',
      'les probabilités — morsure : 1 chance sur 4 000 000 ; la route : 1 sur 4 000.'),
  (30, 'Le Piton de la Fournaise',
      'La lave à 1 100 °C, et un volcan qui fabrique de la terre neuve.',
      '4f2U1RAgk_A', 'https://youtu.be/4f2U1RAgk_A', 'Regarder l''épisode →', null),
  (40, 'Les cyclones',
      'L''œil, les vents, et le record du monde de pluie... à La Réunion !',
      '0WUIzfICz4o', 'https://youtu.be/0WUIzfICz4o', 'Regarder l''épisode →', null),
  (50, 'Le lait de la Plaine des Cafres',
      '10 litres de lait pour 1 seul kg de fromage, du pré des hauts au yaourt.',
      'UjblKadInPw', 'https://youtu.be/UjblKadInPw', 'Regarder l''épisode →', null),
  (60, 'L''eau de La Réunion',
      'Il pleut 20 fois plus à l''Est qu''à l''Ouest. De l''océan à ton robinet.',
      'zLpqiueEIEc', 'https://youtu.be/zLpqiueEIEc', 'Regarder l''épisode →', null)
on conflict do nothing;
