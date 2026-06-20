-- Réponse du professeur aux messages des élèves.
-- Étape 1 (côté admin) : on stocke la réponse + sa date sur les deux tables
-- de messages. L'affichage côté élève (dashboard) viendra ensuite.
-- À exécuter dans l'éditeur SQL de Supabase.

-- Messages « Écris-moi » + contact site
alter table public.contact_messages
  add column if not exists reponse text null,
  add column if not exists reponse_at timestamp with time zone null;

-- Retours élèves (bugs / idées / avis)
alter table public.retours_eleves
  add column if not exists reponse text null,
  add column if not exists reponse_at timestamp with time zone null;
