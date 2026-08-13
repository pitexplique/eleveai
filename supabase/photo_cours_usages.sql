-- Qui se sert de « Photographier un cours », et sur quoi.
--
-- Frédéric, 12/08/2026 : « on verra qui l'utilise ! et on réglera les pb
-- après », puis « avec qui l'utilise visible dans admin ».
--
-- ⛔ CE QUE CETTE TABLE NE CONTIENDRA JAMAIS : la photo, et le texte du cours.
-- La photo est lue puis oubliée — elle porte une écriture, souvent un prénom,
-- parfois le nom d'un établissement, et rien ne justifie de la garder.
-- On garde ICI l'USAGE : qui, quand, quelle étape, sur quelle notion, et si la
-- lecture a tenu. C'est ce qu'il faut pour décider si la fonction sert.
--
-- ⚠️ LE COURS, LUI, A FINI PAR ÊTRE CONSERVÉ — mais AILLEURS, dans la table
-- `photo_cours` (12/08 au soir, quand la fonction s'est ouverte à l'élève et au
-- parent, dont le besoin est de REVENIR). Cette table-ci n'a pas changé : des
-- statistiques sans contenu, lisibles par l'admin. L'autre est privée, jamais
-- mutualisée, purgée à 12 mois. Les deux ne se mélangent pas, et c'est exprès :
-- on peut regarder l'usage sans jamais ouvrir le cahier de quelqu'un.
--
-- Alimentée côté serveur uniquement (clé service role) depuis :
--   /api/photo-cours/lire      -> etape = 'lecture'
--   /api/photo-cours/produire  -> etape = 'production'
--
-- ⚠️ À EXÉCUTER DANS L'ÉDITEUR SQL DE SUPABASE AVANT LA MISE EN LIGNE.
-- Sans elle, les deux routes continuent de fonctionner (l'insert échoue en
-- silence et part dans les logs) — mais l'écran admin restera vide.

create table if not exists public.photo_cours_usages (
  id uuid not null default gen_random_uuid (),
  created_at timestamp with time zone not null default now(),

  -- Qui.
  code_etablissement text null,
  code_utilisateur text not null,
  type_utilisateur text null,          -- eleve / prof / principal
  nom text null,

  -- Quoi.
  etape text not null check (etape in ('lecture', 'production')),
  type_production text null,           -- exercices / seance / evaluation / …

  -- Ce que la machine a cru voir. Sert à répondre à « ça marche vraiment ? » :
  -- une moyenne de confiance basse dit que les photos sont mauvaises, pas que
  -- la fonction est mauvaise — et les deux ne se corrigent pas pareil.
  confiance smallint null,             -- 0..100, sur l'étape de lecture
  niveau text null,
  notion text null,
  matiere text null,
  zones_illisibles smallint null,      -- combien de passages non lus

  constraint photo_cours_usages_pkey primary key (id)
) TABLESPACE pg_default;

-- L'écran admin lit par date décroissante.
create index if not exists photo_cours_usages_date_idx
  on public.photo_cours_usages using btree (created_at desc) TABLESPACE pg_default;

-- « Qui l'utilise » : l'historique d'une personne.
create index if not exists photo_cours_usages_utilisateur_idx
  on public.photo_cours_usages using btree (code_utilisateur, created_at desc) TABLESPACE pg_default;

-- RLS activé sans policy : la clé anon (navigateur) ne peut ni lire ni écrire.
alter table public.photo_cours_usages enable row level security;
