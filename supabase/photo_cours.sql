-- Les cours photographiés, et ce qu'on en a produit.
--
-- ⭐ UN REVIREMENT ASSUMÉ (12/08/2026, dans la soirée). Le matin, la règle
-- écrite dans photo_cours_usages.sql était : « le texte du cours n'est jamais
-- conservé ». Elle était juste pour ce que la fonction était alors — un essai
-- côté professeur, où l'on produit une fiche et où l'on repart.
--
-- Le soir, elle est ouverte à l'élève et au parent, et leur besoin est de
-- REVENIR : réviser la veille du contrôle, refaire une série. Sans le texte,
-- il faut rephotographier la page à chaque fois, ce qui condamne l'usage qu'on
-- vient d'ouvrir. Frédéric, 12/08 : « on sauvegarde rien ? ».
--
-- ⛔ CE QUI RESTE INTERDIT, ET QUI NE BOUGERA PAS :
--   1. LA PHOTO. Jamais stockée, nulle part. Elle est lue puis oubliée. C'est
--      elle qui porte l'écriture, souvent un prénom, parfois les coordonnées
--      GPS de la salle de classe.
--   2. LA MISE EN COMMUN. Le cours reste l'œuvre du professeur (ou d'un
--      éditeur de manuel) : on l'héberge pour la personne qui l'a relu, on ne
--      le redistribue à personne. Jamais montré à un autre élève, jamais
--      indexé, jamais versé dans une banque publique.
--
-- ⚠️ À EXÉCUTER DANS L'ÉDITEUR SQL DE SUPABASE AVANT LA MISE EN LIGNE.
-- Sans ces tables, la fonction marche encore (les insert échouent en silence,
-- l'erreur part dans les logs) — mais plus personne ne peut revenir sur un
-- cours déjà photographié.

-- ── LE COURS RELU ───────────────────────────────────────────────────────────
create table if not exists public.photo_cours (
  id uuid not null default gen_random_uuid (),
  created_at timestamp with time zone not null default now(),

  -- Qui. (Pas de FK : `acces_etablissement` n'en a pas non plus, et le code
  -- utilisateur est la clé d'identité en texte brut dans tout le dépôt.)
  code_etablissement text null,
  code_utilisateur text not null,
  type_utilisateur text null,
  nom text null,

  -- Pour qui on a produit : prof / eleve / parent. Déduit du COMPTE.
  public text not null check (public in ('prof', 'eleve', 'parent')),

  -- Ce que la page dit. La classe et la matière sont CONFIRMÉES par la
  -- personne sur l'écran de relecture — « fraction en 5e et en 4e, ce n'est
  -- pas la même » (Frédéric, 12/08).
  niveau text null,
  matiere text null,
  notion text null,

  -- ⭐ LE COURS, TEL QUE LA PERSONNE L'A RELU ET CORRIGÉ — pas la lecture
  -- brute de la machine. C'est ce qui le rend défendable : elle en répond.
  texte text not null,

  -- Ce que la lecture a coûté en incertitude, gardé pour savoir a posteriori
  -- si une production douteuse venait d'une photo douteuse.
  confiance smallint null,
  zones_illisibles smallint null,
  manques smallint null,
  erreurs_probables smallint null,

  -- ⏳ PURGE À 12 MOIS. Un cours de 5e ne sert plus l'année d'après, et garder
  -- des années de cahiers d'enfants sans raison ne se défend devant personne.
  expire_le timestamp with time zone not null default (now() + interval '12 months'),

  constraint photo_cours_pkey primary key (id)
) TABLESPACE pg_default;

create index if not exists photo_cours_utilisateur_idx
  on public.photo_cours using btree (code_utilisateur, created_at desc) TABLESPACE pg_default;

create index if not exists photo_cours_expire_idx
  on public.photo_cours using btree (expire_le) TABLESPACE pg_default;

alter table public.photo_cours enable row level security;

-- ── CE QU'ON EN A PRODUIT ───────────────────────────────────────────────────
-- Une ligne par demande : un même cours peut donner des questions le lundi et
-- une fiche de révision le jeudi.
create table if not exists public.photo_cours_productions (
  id uuid not null default gen_random_uuid (),
  created_at timestamp with time zone not null default now(),

  photo_cours_id uuid not null,
  code_utilisateur text not null,

  -- interroger / expliquer / retenir / ce-soir / exercices / erreurs / …
  type_production text not null,
  -- Le document rendu, en Markdown. C'est ce que la personne relira.
  contenu text not null,

  constraint photo_cours_productions_pkey primary key (id),
  constraint photo_cours_productions_cours_fkey
    foreign key (photo_cours_id) references public.photo_cours (id) on delete cascade
) TABLESPACE pg_default;

create index if not exists photo_cours_productions_cours_idx
  on public.photo_cours_productions using btree (photo_cours_id, created_at desc) TABLESPACE pg_default;

alter table public.photo_cours_productions enable row level security;

-- ── LA PURGE ────────────────────────────────────────────────────────────────
-- À appeler depuis un cron Supabase, ou à la main de temps en temps.
-- Les productions partent avec leur cours (on delete cascade).
create or replace function public.purger_photo_cours()
returns integer
language plpgsql
security definer
as $$
declare
  supprimes integer;
begin
  delete from public.photo_cours where expire_le < now();
  get diagnostics supprimes = row_count;
  return supprimes;
end;
$$;
