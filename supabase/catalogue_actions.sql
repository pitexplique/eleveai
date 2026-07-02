-- « Catalogue des actions » : la liste de TOUT ce qu'un élève peut faire sur EleveAI
-- (Coachs, Parcours, rituels du jour, révision, concours, cahiers de vacances…).
-- C'est la 1re brique de la matrice profil élève : croisée avec le journal d'activité
-- (ce que l'élève a fait), elle sert de réservoir de recommandations.
--
-- Chaque ligne est étiquetée pour que la reco puisse trancher :
--   valeur  = importance dans l'évolution de l'élève (0 → 1)
--   attrait = plaisir / engagement moyen du format, hors élève (0 → 1)
--   valeur_interet = valeur × attrait (calculée) = score « idéal » de démarrage
--   roles   = 🔥 progresser · 🧭 explorer · ☀️ rituel · 🏆 competition · 📖 reviser · 📥 hors-ligne
--
-- Lecture via la clé service role (lib/server/catalogue.ts) — RLS bloque le navigateur.
-- À exécuter dans l'éditeur SQL de Supabase. Ré-exécutable sans risque (upsert par id).

-- 1) Table.
create table if not exists public.catalogue_actions (
  id             text not null,                       -- slug stable, ex "coach-maths"
  famille        text not null default 'autre',       -- coach|parcours|rituel|reviser|ouverture|evenement|cahier
  type           text not null,                       -- coach|parcours|cahier|dictee|calcul-rapide|defi|fiche|dico|podcast|eval|concours|autre
  matiere        text not null default 'transversal', -- maths|francais|anglais|espagnol|ia|economie|transversal
  label          text not null,
  description    text null,
  route          text not null,
  niveaux        text null,                           -- "CP → Terminale", "A1 → B2"…
  duree          text null,                           -- court|moyen|long
  rythme         text not null default 'ponctuel',    -- quotidien|hebdo|ponctuel
  roles          text[] not null default '{}',
  valeur         numeric(3, 2) not null default 0,    -- 0 → 1
  attrait        numeric(3, 2) not null default 0,    -- 0 → 1
  valeur_interet numeric(4, 3) generated always as (valeur * attrait) stored,
  etat           text not null default 'actif',       -- actif|a-creer|optionnel
  actif          boolean not null default true,       -- la route fonctionne aujourd'hui ?
  ordre          int not null default 100,
  created_at     timestamptz not null default now(),
  constraint catalogue_actions_pkey primary key (id)
) TABLESPACE pg_default;

create index if not exists catalogue_actions_ordre_idx
  on public.catalogue_actions using btree (actif, ordre) TABLESPACE pg_default;

-- 2) RLS activé sans policy : navigateur (anon) bloqué ; l'app lit via service role.
alter table public.catalogue_actions enable row level security;

-- 3) Remplissage (34 actions). Upsert : ré-exécuter met à jour les valeurs.
insert into public.catalogue_actions
  (id, famille, type, matiere, label, description, route, niveaux, duree, rythme, roles, valeur, attrait, etat, actif, ordre)
values
  -- 🎓 Coachs — le cœur, 1 par matière (l'examen = un mode de Coach Maths, pas une ligne)
  ('coach-maths',     'coach', 'coach', 'maths',    'Coach Maths IA',      'Toutes notions, CP → Terminale. Progresse à ton rythme.',        '/coach-ia/maths',         'CP → Terminale', 'moyen', 'quotidien', array['progresser','explorer'], 1.00, 0.45, 'actif', true, 10),
  ('coach-francais',  'coach', 'coach', 'francais', 'Coach Français IA',   'Grammaire, conjugaison, vocabulaire.',                            '/coach-ia/francais',      'Collège',        'moyen', 'quotidien', array['progresser','explorer'], 1.00, 0.50, 'actif', true, 11),
  ('coach-anglais',   'coach', 'coach', 'anglais',  'Coach English Maths', 'A1 → B2, vocabulaire et maths en anglais.',                       '/coach-ia/english-maths', 'A1 → B2',        'moyen', 'quotidien', array['progresser','explorer'], 1.00, 0.50, 'actif', true, 12),
  ('coach-espagnol',  'coach', 'coach', 'espagnol', 'Coach Espagnol IA',   'A1 → B2, vocabulaire et expressions.',                            '/coach-ia/espagnol',      'A1 → B2',        'moyen', 'quotidien', array['progresser','explorer'], 1.00, 0.50, 'actif', true, 13),
  ('coach-ia',        'coach', 'coach', 'ia',       'Coach IA',            'A1 → C1 : comprendre, utiliser, vérifier, créer.',                '/coach-ia/ia',            'A1 → C1',        'moyen', 'quotidien', array['progresser','explorer'], 0.85, 0.70, 'actif', true, 14),
  ('coach-economie',  'coach', 'coach', 'economie', 'Coach Économie IA',   'Entreprise, marché, travail, fiscalité.',                         '/coach-ia/economie',      'Découverte → Lycée', 'moyen', 'quotidien', array['progresser','explorer'], 0.60, 0.55, 'actif', true, 15),

  -- 🛤️ Parcours — bilan de compétences par matière
  ('parcours-maths',    'parcours', 'parcours', 'maths',    'Parcours Maths',    'Bilan de compétences personnalisé.', '/parcours',               'Collège / Lycée', 'long', 'ponctuel', array['explorer'], 0.80, 0.40, 'actif', true, 20),
  ('parcours-francais', 'parcours', 'parcours', 'francais', 'Parcours Français', 'Bilan de compétences français.',     '/parcours-francais',      'Collège',         'long', 'ponctuel', array['explorer'], 0.80, 0.40, 'actif', true, 21),
  ('parcours-anglais',  'parcours', 'parcours', 'anglais',  'Parcours English',  'Bilan de niveau CECRL avec audio.',  '/parcours-english-maths', 'A1 → B2',         'long', 'ponctuel', array['explorer'], 0.80, 0.40, 'actif', true, 22),
  ('parcours-espagnol', 'parcours', 'parcours', 'espagnol', 'Parcours Espagnol', 'Bilan de niveau CECRL avec audio.',  '/parcours-espagnol',      'A1 → B2',         'long', 'ponctuel', array['explorer'], 0.80, 0.40, 'actif', true, 23),
  ('parcours-ia',       'parcours', 'parcours', 'ia',       'Parcours IA',       'Bilan de culture et de réflexes IA.', '/parcours-ia',           'A1 → C1',         'long', 'ponctuel', array['explorer'], 0.70, 0.45, 'actif', true, 24),

  -- ☀️ Rituels quotidiens — le carburant du rendez-vous du matin
  ('defis-du-jour',  'rituel', 'defi',         'maths',       'Défis du jour',    'Un défi maths chaque jour (Grand Raid 2026).', '/defis-du-jour', 'Tous', 'court', 'quotidien', array['rituel','competition'], 0.70, 0.90, 'actif', true, 30),
  ('calcul-rapide',  'rituel', 'calcul-rapide','maths',       'Calcul rapide',    '5 min d''automatismes.',                        '/calcul-rapide', 'Tous', 'court', 'quotidien', array['rituel','progresser'], 0.75, 0.80, 'actif', true, 31),
  ('dictee-du-jour', 'rituel', 'dictee',       'transversal', 'Dictée du jour',   'Un mot à écouter et écrire, 5 matières mélangées.', '/dictee-du-jour', 'Tous', 'court', 'quotidien', array['rituel','explorer'], 0.75, 0.70, 'actif', true, 32),
  ('semaine-verbes', 'rituel', 'autre',        'anglais',     'Semaine des verbes','Le vocabulaire anglais de la semaine.',        '/english-maths', 'Collège', 'court', 'hebdo', array['rituel'], 0.60, 0.50, 'actif', true, 33),

  -- 📖 Réviser & découvrir — supports et formats d'appoint
  ('dico-maths',    'reviser', 'dico',    'maths',    'Dico Maths 6e',      '50 mots & gestes pour l''éval nationale.', '/dico/maths/6e',        '6e',      'court',    'ponctuel', array['reviser','explorer'], 0.60, 0.40, 'actif', true, 40),
  ('dico-francais', 'reviser', 'dico',    'francais', 'Dico Français 6e',   '50 mots & gestes pour l''éval nationale.', '/dico/francais/6e',     '6e',      'court',    'ponctuel', array['reviser','explorer'], 0.60, 0.40, 'actif', true, 41),
  ('podcast-maths', 'reviser', 'podcast', 'maths',    'Podcast maths',      'Fractions, pourcentages, probas en audio.', '/podcast-maths',       'Collège', 'moyen',    'ponctuel', array['explorer'], 0.45, 0.60, 'actif', true, 42),
  ('fiches-maths',  'reviser', 'fiche',   'maths',    'Fiches de cours',    'Cours maths courts à lire ou télécharger.', '/fiches-cours/maths',   'Collège', 'variable', 'ponctuel', array['reviser','hors-ligne'], 0.55, 0.30, 'actif', true, 43),
  ('fiches-ia',     'reviser', 'fiche',   'ia',       'Fiches de cours IA', 'Cours IA par domaine, à lire ou en PDF.',   '/fiches-cours/ia',      'Tous',    'variable', 'ponctuel', array['reviser','hors-ligne'], 0.50, 0.30, 'actif', true, 44),
  ('livre-ia',      'reviser', 'fiche',   'ia',       'Le livre IA / Ebook','Les 16 fiches en un livre (PDF / EPUB).',    '/fiches-cours/ia/livre','Tous',    'long',     'ponctuel', array['hors-ligne','reviser'], 0.50, 0.35, 'actif', true, 45),

  -- 🧭 Ouverture — le sens, la motivation
  ('maths-974',     'ouverture', 'autre', 'maths', 'Maths Réel · 974', 'La Réunion en vidéo : à quoi servent les maths.', '/maths-974',     'Tous', 'court', 'ponctuel', array['explorer'], 0.40, 0.75, 'actif', true, 50),
  ('le-bon-prompt', 'ouverture', 'autre', 'ia',    'Le bon prompt',    'Apprendre à bien parler à une IA.',               '/le-bon-prompt', 'Tous', 'court', 'ponctuel', array['explorer'], 0.45, 0.70, 'actif', true, 51),

  -- 🏆 Évaluations & concours
  ('eval-pix-ia',      'evenement', 'eval',    'ia',          'Éval blanche Pix IA', 'Prépa éval nationale : 3 domaines, profil.', '/eval-pix-ia',      'Collège / Lycée', 'moyen', 'ponctuel', array['competition'], 0.70, 0.50, 'actif', true, 60),
  ('grand-oral',       'evenement', 'autre',   'francais',    'Grand oral',          'Préparer et s''entraîner à l''oral.',        '/grand-oral',       'Terminale',       'long',  'ponctuel', array['reviser','progresser'], 0.50, 0.35, 'actif', true, 61),
  ('concours-ia',      'evenement', 'concours','ia',          'Concours IA',         'Un défi IA événementiel.',                   '/concours-ia',      'Tous',            null,    'ponctuel', array['competition'], 0.30, 0.70, 'actif', true, 62),
  ('concours-general', 'evenement', 'concours','maths',       'Concours général',    'Problèmes avancés.',                         '/concours-general', 'Lycée',           'long',  'ponctuel', array['competition'], 0.35, 0.50, 'actif', true, 63),
  ('concours-logo',    'evenement', 'concours','transversal', 'Concours logo',       'Crée et partage ton logo.',                  '/concours-logo',    'Tous',            null,    'ponctuel', array['competition'], 0.20, 0.85, 'actif', true, 64),

  -- 📥 Cahiers de vacances par matière (à décliner : les cahiers actuels sont par niveau, multi-matière)
  ('cahier-maths',    'cahier', 'cahier', 'maths',    'Cahier de vacances · Maths',    'À faire sur papier, même sans connexion.', '/cahier-vacances', 'CP → Terminale', 'long', 'ponctuel', array['hors-ligne'], 0.65, 0.35, 'a-creer',   false, 70),
  ('cahier-francais', 'cahier', 'cahier', 'francais', 'Cahier de vacances · Français', 'À faire sur papier, même sans connexion.', '/cahier-vacances', 'CP → Terminale', 'long', 'ponctuel', array['hors-ligne'], 0.65, 0.35, 'a-creer',   false, 71),
  ('cahier-anglais',  'cahier', 'cahier', 'anglais',  'Cahier de vacances · Anglais',  'À faire sur papier, même sans connexion.', '/cahier-vacances', 'Collège',        'long', 'ponctuel', array['hors-ligne'], 0.65, 0.35, 'a-creer',   false, 72),
  ('cahier-espagnol', 'cahier', 'cahier', 'espagnol', 'Cahier de vacances · Espagnol', 'À faire sur papier, même sans connexion.', '/cahier-vacances', 'Collège',        'long', 'ponctuel', array['hors-ligne'], 0.60, 0.35, 'a-creer',   false, 73),
  ('cahier-ia',       'cahier', 'cahier', 'ia',       'Cahier de vacances · IA',       'À faire sur papier, même sans connexion.', '/cahier-vacances', 'Tous',           'long', 'ponctuel', array['hors-ligne'], 0.55, 0.40, 'optionnel', false, 74),
  ('cahier-economie', 'cahier', 'cahier', 'economie', 'Cahier de vacances · Économie', 'À faire sur papier, même sans connexion.', '/cahier-vacances', 'Tous',           'long', 'ponctuel', array['hors-ligne'], 0.50, 0.40, 'optionnel', false, 75)
on conflict (id) do update set
  famille     = excluded.famille,
  type        = excluded.type,
  matiere     = excluded.matiere,
  label       = excluded.label,
  description = excluded.description,
  route       = excluded.route,
  niveaux     = excluded.niveaux,
  duree       = excluded.duree,
  rythme      = excluded.rythme,
  roles       = excluded.roles,
  valeur      = excluded.valeur,
  attrait     = excluded.attrait,
  etat        = excluded.etat,
  actif       = excluded.actif,
  ordre       = excluded.ordre;
