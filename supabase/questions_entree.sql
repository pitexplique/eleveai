-- CE QUE LES GENS DEMANDENT À L'ENTRÉE — « Qui es-tu ? / Que veux-tu faire ? ».
--
-- Pourquoi cette table existe : sans elle, on sait COMBIEN de questions tombent
-- à vide, jamais LESQUELLES. Or c'est exactement ce qui manque au catalogue qui
-- dit quoi construire ensuite — et, dans un mois, si une API vaut son prix.
--
-- RGPD — ce qu'on stocke et ce qu'on ne stocke pas :
--   ✔ la phrase tapée (tronquée à 300 caractères), le profil choisi, ce que le
--     moteur a compris (notion, intention), le nombre de résultats trouvés ;
--   ✘ AUCUNE identité : ni nom, ni code utilisateur, ni IP, ni identifiant de
--     session. Deux questions de la même personne ne sont pas rattachables.
--   ⚠️ Une phrase libre PEUT contenir un prénom (« ma fille Léa n'y arrive
--     pas »). C'est le risque assumé de ce champ, et la raison des trois
--     garde-fous ci-dessous : troncature, purge automatique à 90 jours, et
--     mention dans la politique de confidentialité.
--
-- Alimentée côté serveur (clé service role) depuis /api/questions-entree,
-- en fire-and-forget : elle ne doit jamais ralentir ni bloquer une recherche.
--
-- À exécuter dans l'éditeur SQL de Supabase.

create table if not exists public.questions_entree (
  id uuid not null default gen_random_uuid (),
  created_at timestamp with time zone not null default now(),
  question text not null,              -- la phrase tapée, tronquée à 300 caractères
  profil text null,                    -- 'cp' … 'terminale', 'parent', 'prof', 'direction'
  chip text null,                      -- la chip cliquée, si elle l'a été
  notion text null,                    -- notion reconnue par le moteur ; null = pas comprise
  intention text null,                 -- intention lue ; null = pas comprise
  trouves smallint not null default 0, -- nombre de ressources proposées ; 0 = le trou à combler
  ou text null,                        -- 'accueil' ou 'page' (/ia) — d'où la question part
  constraint questions_entree_pkey primary key (id)
) TABLESPACE pg_default;

-- LA REQUÊTE QU'ON VIENDRA LIRE : ce qu'on nous demande et qu'on n'a pas.
create index if not exists questions_entree_trouves_idx
  on public.questions_entree using btree (trouves, created_at desc) TABLESPACE pg_default;

create index if not exists questions_entree_created_idx
  on public.questions_entree using btree (created_at desc) TABLESPACE pg_default;

-- RLS : personne ne lit ni n'écrit avec la clé publique. L'API écrit en
-- service-role, la lecture se fait depuis l'admin (même clé) — comme pages_vues.
alter table public.questions_entree enable row level security;

-- ── PURGE AUTOMATIQUE À 90 JOURS ────────────────────────────────────────────
-- Une question de la rentrée ne sert plus à rien en janvier, et garder du texte
-- libre indéfiniment n'a aucune raison d'être. Si pg_cron est disponible :
--
--   select cron.schedule(
--     'purge-questions-entree', '0 3 * * *',
--     $$delete from public.questions_entree where created_at < now() - interval '90 days'$$
--   );
--
-- Sinon, à passer à la main de temps en temps :
--   delete from public.questions_entree where created_at < now() - interval '90 days';
