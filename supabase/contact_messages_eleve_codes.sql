-- Identité élève sur les messages « Écris-moi », pour pouvoir afficher la
-- réponse du prof sur le dashboard de l'élève (jusqu'ici les codes n'étaient
-- que concaténés dans `org`, non requêtables).
-- À exécuter dans l'éditeur SQL de Supabase (après reponse_messages.sql).

alter table public.contact_messages
  add column if not exists code_etablissement text null,
  add column if not exists code_utilisateur text null;

-- Recherche des messages d'un élève donné (dashboard élève).
create index if not exists contact_messages_eleve_idx
  on public.contact_messages using btree (code_etablissement, code_utilisateur, created_at desc) TABLESPACE pg_default;
