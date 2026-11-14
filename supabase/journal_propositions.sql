-- LES ARTICLES PROPOSÉS PAR LES ÉLÈVES POUR LE JOURNAL (14/11/2026).
-- Frédéric : « on pourrait mettre dans le dashboard élève : écrire article »,
-- « ils peuvent choisir centre d'intérêt ou autre chose ».
-- L'élève connecté écrit depuis /dashboard-eleve (carte « Écrire pour le
-- Journal ») ; le prof de SON établissement relit depuis /dashboard-prof.
-- Rien n'est publié sans la validation du prof. Prénom + classe seulement.
--
-- À exécuter UNE FOIS dans le SQL Editor de Supabase.

create table if not exists public.journal_propositions (
  id                 uuid primary key default gen_random_uuid(),
  code_etablissement text not null,
  code_utilisateur   text not null,
  prenom             text,
  classe             text,
  centre             text not null,        -- id de CENTRES_INTERET, ou 'autre'
  sujet              text,                 -- précision libre (obligatoire si 'autre')
  question           text not null,        -- « Ma question »
  trouve             text not null,        -- « Ce que j'ai mesuré ou trouvé »
  qcm_question       text not null,
  qcm_choix          text[] not null,      -- 3 réponses
  qcm_bonne          integer not null check (qcm_bonne between 0 and 2),
  statut             text not null default 'a_relire'
                     check (statut in ('a_relire', 'acceptee', 'a_corriger', 'refusee')),
  commentaire_prof   text,
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now()
);

create index if not exists journal_propositions_etab_idx
  on public.journal_propositions using btree (code_etablissement, statut, created_at desc);

create index if not exists journal_propositions_eleve_idx
  on public.journal_propositions using btree (code_etablissement, code_utilisateur, created_at desc);

-- RLS activé SANS policy : uniquement via l'API (clé service-role).
alter table public.journal_propositions enable row level security;
