-- LES PASSIONS DES ÉLÈVES CONNECTÉS — 30/10/2026
--
-- Frédéric : « quand les élèves se connectent, ce serait bien qu'ils
-- sélectionnent leurs centres d'intérêt », « même les non connectés, mais tu
-- stockes les préférences pour les élèves connectés ». Un élève non connecté
-- garde ses passions dans son navigateur (localStorage) ; un élève connecté
-- les retrouve ici, d'un poste à l'autre.
--
-- Une passion = « sport », « sport:lutte » ou « autre:pétanque » (liste fermée
-- dans lib/videos/centres-interet.ts ; 3 au plus). Le tableau /admin/passions
-- les compte : c'est ce qui dit quelle vidéo écrire ensuite.
--
-- Rangé comme tous les résultats : code_etablissement + code_utilisateur
-- (un compte e-mail = INDEPENDANT + EMAIL-<id>).
--
-- À exécuter dans l'éditeur SQL de Supabase. Idempotent. Tant qu'elle n'existe
-- pas, le site garde les passions dans le navigateur seulement.

create table if not exists public.passions_eleves (
  code_etablissement text not null,
  code_utilisateur text not null,
  classe text null,
  passions text[] not null default '{}',
  updated_at timestamp with time zone not null default now(),
  constraint passions_eleves_pkey primary key (code_etablissement, code_utilisateur)
) TABLESPACE pg_default;

-- RLS activé sans policy : seule /api/passions (clé service role) lit et écrit.
alter table public.passions_eleves enable row level security;
