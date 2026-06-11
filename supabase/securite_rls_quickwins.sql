-- GAINS RAPIDES — exécutable IMMÉDIATEMENT, même avant le déploiement du code.
-- Ces deux tables ne sont touchées par AUCUN code navigateur : uniquement des
-- routes API service role (qui ignorent le RLS). Les verrouiller ne casse rien.
--   - retours_eleves        -> /api/retours
--   - questions_ia_parcours -> /api/parcours/explain et /api/accueil/chat
-- (état constaté au dashboard : toutes deux « Unrestricted »)

alter table public.retours_eleves enable row level security;
alter table public.questions_ia_parcours enable row level security;

-- Vérification : rowsecurity doit être true pour les deux.
select tablename, rowsecurity
from pg_tables
where schemaname = 'public'
  and tablename in ('retours_eleves', 'questions_ia_parcours');
