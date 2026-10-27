-- « MES CLASSES » : UN PROF INSCRIT PAR E-MAIL CRÉE SES CLASSES — 27/10/2026
--
-- LE BESOIN (Frédéric). Un prof s'inscrit avec son adresse (ex.
-- prenom.nom@ac-reunion.fr), enregistre « 6e A » de son collège, et le site
-- fabrique les comptes de ses élèves : un code de classe, un code par élève,
-- un mot de passe SIMPLE (« tigre27 » — ses 6e lisent mal). Ensuite il suit
-- en cours ce qu'ils font dans le coach et les vidéos.
--
-- LE CHOIX. Pas de deuxième système de comptes : chaque élève devient une
-- ligne de `acces_etablissement`, dont le code_etablissement est le CODE DE
-- LA CLASSE (ex. « LAC6A »). La connexion (/api/code-login) et tous les
-- résultats (rangés par code_etablissement + code_utilisateur) marchent donc
-- sans rien changer.
--
-- ⚠️ LE PÉRIMÈTRE VIENT DU RATTACHEMENT, JAMAIS DU RÔLE. `type_utilisateur`
-- est auto-déclaré à l'inscription par e-mail (voir voitToutSonEtablissement
-- dans lib/server/session.ts). C'est CETTE table qui dit qu'un compte e-mail
-- a le droit de voir les élèves d'un code de classe — un fait que le serveur
-- a écrit lui-même au moment de la création.
--
-- QUI PEUT CRÉER UNE CLASSE. Une adresse académique (@ac-xxx.fr ou
-- @education.gouv.fr) : tout de suite, Supabase Auth ayant prouvé que la
-- boîte existe. Une autre adresse : quand Frédéric a mis prof_valide = true
-- sur sa ligne users_email (en attendant un bouton dans l'admin) :
--   update public.users_email set prof_valide = true where email = '…';
--
-- À exécuter dans l'éditeur SQL de Supabase AVANT de déployer le code.
-- Idempotent : on peut le rejouer.

alter table public.users_email
  add column if not exists prof_valide boolean not null default false;

create table if not exists public.classes_prof (
  id uuid not null default gen_random_uuid (),
  created_at timestamp with time zone not null default now(),
  prof_id text not null,                 -- users_email.id du prof (jeton : EMAIL-<id>)
  prof_email text null,
  etablissement text not null,           -- texte libre : « Collège Dimitile »
  nom_classe text not null,              -- ce que le prof a tapé : « 6e A »
  niveau text not null,                  -- '6e', '4e', 'seconde'… (acces_etablissement.classe)
  code_etablissement text not null,      -- le CODE DE LA CLASSE : « LAC6A »
  prefixe_eleves text not null,          -- « 6A » → élèves 6A01, 6A02…
  nb_eleves integer not null default 0,
  archivee boolean not null default false,
  constraint classes_prof_pkey primary key (id),
  constraint classes_prof_code_unique unique (code_etablissement)
) TABLESPACE pg_default;

create index if not exists classes_prof_prof_idx
  on public.classes_prof using btree (prof_id, created_at desc) TABLESPACE pg_default;

-- RLS activé sans policy : seules les routes /api/prof/* (clé service role)
-- lisent et écrivent.
alter table public.classes_prof enable row level security;
