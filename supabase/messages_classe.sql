-- ✉️ MESSAGE À LA CLASSE (24/11/2026) — Frédéric : « que le prof, dans son
-- dashboard, puisse envoyer un message aux élèves par classe » (ex. « devoir
-- pour jeudi : coach fractions »).
--
-- SENS UNIQUE : le prof écrit, les élèves de la classe lisent. Pas de réponse
-- des élèves (plus sûr avec des mineurs). Texte simple, 500 signes au plus.
--
-- QUI A LE DROIT (contrôlé dans les routes, clé service role) :
--   · écrire / supprimer : /api/prof/messages-classe — seulement le prof
--     propriétaire de la classe (classes_prof.prof_id = son jeton EMAIL-<id>) ;
--   · lire : /api/eleve/messages-classe — seulement un élève dont le jeton
--     porte CE code de classe (session.code_etablissement).
-- Le site n'utilise pas Supabase Auth (jetons maison signés) : une policy RLS
-- ne peut pas reconnaître le prof ni l'élève. Donc RLS activé SANS policy et
-- droits retirés à anon / authenticated : la clé publique ne voit RIEN.

create table if not exists public.messages_classe (
  id uuid not null default gen_random_uuid (),
  created_at timestamp with time zone not null default now(),
  prof_id text not null,                 -- users_email.id du prof
  code_etablissement text not null,      -- le CODE DE LA CLASSE (classes_prof)
  texte text not null,
  constraint messages_classe_pkey primary key (id),
  constraint messages_classe_texte_court check (char_length(texte) between 1 and 500),
  constraint messages_classe_classe_fk foreign key (code_etablissement)
    references public.classes_prof (code_etablissement) on delete cascade
) TABLESPACE pg_default;

create index if not exists messages_classe_classe_idx
  on public.messages_classe using btree (code_etablissement, created_at desc) TABLESPACE pg_default;
create index if not exists messages_classe_prof_idx
  on public.messages_classe using btree (prof_id, created_at desc) TABLESPACE pg_default;

-- « Nouveau » tant que l'élève n'a pas appuyé sur « J'ai lu ».
create table if not exists public.messages_classe_lus (
  message_id uuid not null references public.messages_classe (id) on delete cascade,
  code_utilisateur text not null,        -- le code de l'élève (6A07…)
  lu_at timestamp with time zone not null default now(),
  constraint messages_classe_lus_pkey primary key (message_id, code_utilisateur)
) TABLESPACE pg_default;

alter table public.messages_classe enable row level security;
alter table public.messages_classe_lus enable row level security;
revoke all on public.messages_classe from anon, authenticated;
revoke all on public.messages_classe_lus from anon, authenticated;
