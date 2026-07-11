-- Table fiches_compositions : la fiche de cours composée par un prof
-- (rubriques cochées + ordre) sur une notion donnée. Écrite par
-- /api/fiches/composition (PUT) depuis le composeur de FicheCoursClient,
-- lue au chargement de la fiche et listée dans le dashboard-prof
-- (« Mes fiches de cours »). Une ligne par (prof, matière, classe, notion).
--
-- C'est aussi la fondation du partage aux classes (plus tard, via l'import
-- Pronote) : on diffusera ce qui est déjà enregistré ici.
--
-- À exécuter dans l'éditeur SQL de Supabase : sans elle, le composeur
-- retombe sur le localStorage (comportement du prototype, rien ne casse).

create table public.fiches_compositions (
  id uuid not null default gen_random_uuid (),
  code_etablissement text not null,
  code_utilisateur text not null,
  matiere text not null,
  classe text not null,
  notion text not null,
  -- { ordre: FicheRubriqueId[], actives: Record<FicheRubriqueId, boolean> }
  data jsonb not null,
  updated_at timestamp with time zone not null default now(),
  created_at timestamp with time zone not null default now(),
  constraint fiches_compositions_pkey primary key (id),
  -- Une seule composition par prof et par fiche → l'upsert écrase.
  constraint fiches_compositions_unique unique (
    code_etablissement,
    code_utilisateur,
    matiere,
    classe,
    notion
  )
) TABLESPACE pg_default;

create index IF not exists fiches_compositions_prof_idx on public.fiches_compositions using btree (
  code_etablissement,
  code_utilisateur,
  updated_at desc
) TABLESPACE pg_default;

-- RLS activé SANS aucune policy (même pattern que profil_eleve et bulletins) :
-- la clé anon (navigateur) ne peut ni lire ni écrire ; seule la clé service
-- role utilisée par /api/fiches/composition accède à la table.
alter table public.fiches_compositions enable row level security;
