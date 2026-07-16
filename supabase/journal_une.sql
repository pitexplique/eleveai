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

-- ── Graine : une Une MIXTE façon MSN — les types ALTERNENT ────────────────────
-- (retour de Frédéric : « le slide ne doit pas comporter que des liens
-- YouTube ! ») : vidéo → geste interne → vidéo → geste... Le lecteur qui
-- laisse défiler voit la richesse du site, pas une pub pour la chaîne.
insert into public.journal_une (ordre, kicker, titre, accroche, youtube_id, image_url, lien, cta, defi) values
  (10, 'Réfléchir · En vrai, à La Réunion',
      'La canne à sucre : du champ à la lumière',
      'Suis un planteur : sa canne devient du jus, du sirop, des cristaux au Gol. Et la bagasse fait de l''électricité — la canne donne du sucre ET de la lumière. Derrière, une filière de 18 000 personnes qu''on n''oublie jamais.',
      'hH2N0Cvx-AI', null, 'https://youtu.be/hH2N0Cvx-AI', '🌾 Regarder l''épisode →',
      'la proportionnalité — 3 000 m² de canne, combien de sucre ?'),
  (20, 'Apprendre · Le rendez-vous quotidien',
      'Le défi du jour : un vrai problème chaque matin',
      'Foot, volcan, cyclones, océan... chaque jour un problème « en vrai » à résoudre — et sa correction qui t''explique sans faire à ta place.',
      null, '/images/defis-du-jour/coupe-monde-foot.webp', '/defis-du-jour', '🎯 Relever le défi du jour →', null),
  (30, 'Réfléchir · En vrai, à La Réunion',
      'Les requins : la peur et le risque réel',
      '~10 morts/an dans le monde ; la route : ~1 300 000. Et le requin garde le récif qui fait le lagon.',
      '3bPBjYsRciA', null, 'https://youtu.be/3bPBjYsRciA', '🦈 Regarder l''épisode →',
      'les probabilités — morsure : 1 chance sur 4 000 000 ; la route : 1 sur 4 000.'),
  (40, 'S''amuser · L''exploration',
      'La chasse aux trésors sur la carte de l''île',
      'La Réunion posée sur une carte : des trésors à trouver — maths, écologie, histoire. Lieu par lieu, comme un explorateur.',
      null, '/images/lagon.webp', '/carte', '🗺️ Explorer la carte →', null),
  (50, 'Réfléchir · En vrai, à La Réunion',
      'Le Piton de la Fournaise',
      'Un des volcans les plus actifs du monde ! La lave à 1 100 °C, et un volcan qui fabrique de la terre neuve.',
      '4f2U1RAgk_A', null, 'https://youtu.be/4f2U1RAgk_A', '🌋 Regarder l''épisode →', null),
  (60, 'Le supplément de l''été · À imprimer',
      'Les cahiers de vacances, du CE1 au Bac +1',
      'Gratuits, imprimables, avec Ti Margo : chaque cahier est un voyage — l''île, l''océan Indien, l''espace... et les maths du niveau suivant.',
      null, '/images/accueil-eleveai-reunion.webp', '/cahier-vacances', '🏖️ Imprimer son cahier →', null)
on conflict do nothing;
