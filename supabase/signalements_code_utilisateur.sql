-- SIGNALEMENTS — la colonne qui manquait : QUI a signalé.
--
-- Constaté le 11/08/2026 en exécutant la chaîne de bout en bout. La table
-- gardait `connecte` (quelqu'un avait un compte) et `code_etablissement` (lequel),
-- mais jamais `code_utilisateur`. Autrement dit : on savait qu'un élève du
-- collège avait trouvé une erreur, sans savoir lequel.
--
-- ⭐ Conséquence : `points_attribues` était INUTILISABLE. La colonne existait,
-- l'API la remplissait à 0, l'admin aurait pu l'augmenter — et personne n'aurait
-- jamais reçu ces points, parce qu'aucune requête ne pouvait relier la ligne à
-- un élève. La promesse « ton signalement retenu te rapporte » n'avait aucun
-- support en base.
--
-- RGPD : c'est un code de connexion, pas une identité — même donnée que
-- `retours_eleves.code_eleve`, et elle part avec la purge à 90 jours.
--
-- À exécuter dans l'éditeur SQL de Supabase. Idempotent : ré-exécutable.

alter table public.signalements
  add column if not exists code_utilisateur text null;

comment on column public.signalements.code_utilisateur is
  'Code de connexion de la personne (acces_etablissement.code_utilisateur), seulement si connecte = true. C''est lui qui permet de créditer les points d''un signalement retenu.';

-- La requête des points : tous les signalements d'un élève donné.
create index if not exists signalements_auteur_idx
  on public.signalements using btree (code_etablissement, code_utilisateur);
