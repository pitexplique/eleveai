-- BÊTA TESTEURS — 50 places pour l'année scolaire 2026-2027.
--
-- Pourquoi une TABLE et pas une colonne `beta_testeur` sur les comptes : il y a
-- deux systèmes de comptes dans le site (`acces_etablissement` par code, et
-- `users_email` par e-mail). Un booléen devrait vivre dans les deux, être lu
-- dans les deux, et divergerait — c'est exactement ce qui est arrivé aux trois
-- listes « classe ». Et un booléen ne sait répondre à aucune des questions du
-- quotidien : quelle place occupe-t-il, sur quel groupe compte-t-il, est-il
-- candidat ou accepté, combien reste-t-il de places en collège.
--
-- ── LES 50 PLACES, ET POURQUOI ELLES SONT RÉPARTIES ─────────────────────────
-- Cinquante bons élèves de 6e testent tous la même chose. Un HPI trouve les
-- erreurs de maths ; il ne verra jamais ce qui bloque un CE1 sur une consigne.
-- D'où les groupes, pondérés par où le contenu est le plus neuf :
--   college        20   6e → 3e, le cœur du public, et ils écrivent seuls
--   parent-cycle2  10   CP·CE1·CE2 — un CP ne rédige pas un signalement,
--                       le testeur est l'adulte à côté
--   lycee           8   la Première spé est la banque la plus fragile
--   cm1-cm2         7   ils rédigent mal mais ils y arrivent
--   prof            5   ils voient les écarts au programme, pas les bugs
-- ⛔ Un ÉTABLISSEMENT ne prend pas de place : un collège de 600 élèves avalerait
--    la bêta entière. Il passe par l'accès pilote gratuit de 4 semaines.
--
-- ── CE QU'ON NE DEMANDE PAS ─────────────────────────────────────────────────
-- Pas de nom de famille : `prenom` seul, comme partout ailleurs sur le site.
-- Pas d'obligation chiffrée non plus, et ça ne relève pas du schéma mais ça
-- explique l'absence de colonne « quota » : ce sont des mineurs, et Frédéric est
-- leur professeur. Un bêta testeur signale quand il veut. Dès qu'il y a un
-- rythme exigé, ce n'est plus du test.
--
-- À exécuter dans l'éditeur SQL de Supabase. Idempotent : ré-exécutable.

create table if not exists public.beta_testeurs (
  id uuid not null default gen_random_uuid (),
  created_at timestamp with time zone not null default now(),

  -- ── PAR OÙ ON LE RECONTACTE — l'un OU l'autre, jamais forcément les deux ──
  email text null,
  code_etablissement text null,
  code_utilisateur text null,
  prenom text null,                          -- prénom seul, jamais le nom

  -- ── CE QU'IL DÉCLARE ÊTRE ──
  groupe text not null,                      -- le quota : voir la liste ci-dessus
  niveau text null,                          -- sa classe exacte, vocabulaire d'acces_etablissement
  motivation text null,                      -- 600 signes, tronqué côté API

  -- ── LA CANDIDATURE ──
  annee text not null default '2026-2027',
  statut text not null default 'candidat',   -- 'candidat' | 'accepte' | 'refuse' | 'termine'
  numero_place smallint null,                -- attribué à l'acceptation ; Arthur = 1
  note_interne text null,

  -- ── ANTI-SPAM ── SHA-256 tronqué d'IP+navigateur ; jamais l'IP en clair.
  empreinte text null,

  constraint beta_testeurs_pkey primary key (id)
) TABLESPACE pg_default;

alter table public.beta_testeurs
  drop constraint if exists beta_testeurs_groupe_check;
alter table public.beta_testeurs
  add constraint beta_testeurs_groupe_check check (
    groupe = any (array['college'::text, 'lycee'::text, 'cm1-cm2'::text,
                        'parent-cycle2'::text, 'prof'::text])
  );

alter table public.beta_testeurs
  drop constraint if exists beta_testeurs_statut_check;
alter table public.beta_testeurs
  add constraint beta_testeurs_statut_check check (
    statut = any (array['candidat'::text, 'accepte'::text, 'refuse'::text, 'termine'::text])
  );

-- Au moins un moyen de recontact, sinon la candidature ne sert à rien.
alter table public.beta_testeurs
  drop constraint if exists beta_testeurs_contact_check;
alter table public.beta_testeurs
  add constraint beta_testeurs_contact_check check (
    email is not null or (code_etablissement is not null and code_utilisateur is not null)
  );

-- ── UNICITÉ — posée MAINTENANT, pas après ────────────────────────────────────
-- La leçon de la Diagonale des Fous : sans index unique en production, on finit
-- par écrire des `insert … where not exists` pour rattraper les doublons.
-- Une personne ne candidate qu'une fois par année de bêta.
create unique index if not exists beta_testeurs_email_annee_idx
  on public.beta_testeurs (annee, lower(email))
  where email is not null;

create unique index if not exists beta_testeurs_compte_annee_idx
  on public.beta_testeurs (annee, code_etablissement, code_utilisateur)
  where code_etablissement is not null and code_utilisateur is not null;

-- Deux bêta testeurs ne portent pas le même numéro la même année.
create unique index if not exists beta_testeurs_place_annee_idx
  on public.beta_testeurs (annee, numero_place)
  where numero_place is not null;

-- La requête de tous les jours : combien de places prises, par groupe.
create index if not exists beta_testeurs_compte_idx
  on public.beta_testeurs (annee, statut, groupe);

-- L'écran d'admin : ce qui vient d'arriver et qu'on n'a pas traité.
create index if not exists beta_testeurs_attente_idx
  on public.beta_testeurs (statut, created_at desc);

-- RLS : personne ne lit ni n'écrit avec la clé publique. L'API écrit en
-- service-role, l'admin lit en service-role — comme signalements et pages_vues.
alter table public.beta_testeurs enable row level security;

-- ── PURGE ───────────────────────────────────────────────────────────────────
-- Une candidature refusée ou jamais traitée n'apprend plus rien après trois
-- mois. Les ACCEPTÉES vivent l'année : elles portent l'accès.
--   delete from public.beta_testeurs
--   where statut in ('candidat', 'refuse') and created_at < now() - interval '90 days';
