-- Ajout du suivi "traité" sur les retours élèves (/admin/retours).
-- À exécuter dans l'éditeur SQL de Supabase (la table retours_eleves existe déjà).

alter table public.retours_eleves
  add column if not exists traite boolean not null default false;

create index IF not exists retours_eleves_traite_idx on public.retours_eleves using btree (traite, created_at desc) TABLESPACE pg_default;
