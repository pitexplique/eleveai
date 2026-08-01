-- Résultats des ÉPREUVES BLANCHES DE L'ÉVALUATION NATIONALE du collège.
--
-- UNE SEULE table pour les quatre épreuves — 6ᵉ et 4ᵉ, français et maths :
-- les colonnes `classe` et `matiere` distinguent. Même choix que
-- resultats_langue_du_jour, et pour la même raison : quatre tables jumelles
-- obligeraient le tableau de suivi du prof à quatre requêtes et à quatre
-- migrations à chaque nouveau couple. Ici, une vue de classe se lit d'un
-- seul select.
--
-- Ce qu'on garde de particulier par rapport aux autres resultats_* :
--   `duree_sec`  — l'épreuve est chronométrée (50 min) : savoir qu'un élève a
--                  fini en 12 minutes ou qu'il a été coupé par le chrono dit
--                  autant que son score.
--   `chrono_ecoule` — vrai si c'est le temps qui a arrêté l'épreuve, et non
--                  l'élève. Un 8/20 fini en avance et un 8/20 interrompu ne se
--                  lisent pas de la même façon.
--   `details.micros` — LE cœur : la liste des micro-compétences testées et
--                  réussies ou non. C'est ce que l'évaluation officielle ne
--                  rend jamais à l'élève, et ce qui permet au prof de voir
--                  ce qui coince pour tout un groupe.
--
-- Score/total numeric, pourcentage généré — NE PAS l'insérer.
-- Écriture service-role uniquement (RLS actif) via /api/resultats
-- (type=evaluation_nationale).
-- À exécuter dans l'éditeur SQL de Supabase avant la mise en ligne.

create table if not exists public.resultats_evaluation_nationale (
  id uuid not null default gen_random_uuid (),
  code_etablissement text not null,
  code_utilisateur text not null,
  nom text null,
  classe text not null,            -- '6e' | '4e'
  matiere text not null,           -- 'maths' | 'francais'
  score numeric not null,
  total numeric not null,
  pourcentage numeric GENERATED ALWAYS as (
    case
      when (total > (0)::numeric) then round(((score / total) * (100)::numeric), 2)
      else (0)::numeric
    end
  ) STORED null,
  duree_sec integer null,          -- temps réellement passé sur l'épreuve
  chrono_ecoule boolean not null default false,
  details jsonb null,              -- { themes: [{ id, label, justes, total }],
                                   --   micros: [{ microId, microLabel,
                                   --              notionId, notionLabel, reussi }] }
  created_at timestamp with time zone not null default now(),
  constraint resultats_evaluation_nationale_pkey primary key (id)
) TABLESPACE pg_default;

create index if not exists resultats_evaluation_nationale_eleve_idx
  on public.resultats_evaluation_nationale using btree (code_etablissement, code_utilisateur, created_at desc) TABLESPACE pg_default;

create index if not exists resultats_evaluation_nationale_etablissement_idx
  on public.resultats_evaluation_nationale using btree (code_etablissement, created_at desc) TABLESPACE pg_default;

-- La vue qui servira au prof à la rentrée : « ma 6ᵉ B en maths ».
create index if not exists resultats_evaluation_nationale_epreuve_idx
  on public.resultats_evaluation_nationale using btree (classe, matiere, created_at desc) TABLESPACE pg_default;

-- RLS activé sans policy : navigateur bloqué, seule la clé service role écrit/lit.
alter table public.resultats_evaluation_nationale enable row level security;
