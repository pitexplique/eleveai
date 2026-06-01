create table if not exists public.questions_ia_parcours (
  id uuid not null default gen_random_uuid(),
  acces_id uuid null,
  code_etablissement text not null,
  code_utilisateur text not null,
  nom text null,
  type_utilisateur text not null default 'eleve'::text,
  source text not null default 'parcours_correction_chat'::text,
  matiere text not null default 'maths'::text,
  classe text null,
  notion_id text null,
  notion_label text null,
  question_index integer null,
  question_text text not null,
  student_answer text null,
  expected_answer text null,
  explanation text null,
  student_question text not null,
  coach_answer text null,
  model text not null,
  input_tokens integer null,
  output_tokens integer null,
  total_tokens integer null,
  created_at timestamp with time zone not null default now(),
  constraint questions_ia_parcours_pkey primary key (id),
  constraint questions_ia_parcours_acces_id_fkey foreign key (acces_id)
    references public.acces_etablissement (id)
    on delete set null,
  constraint questions_ia_parcours_type_check check (
    type_utilisateur = any (
      array['eleve'::text, 'prof'::text, 'principal'::text]
    )
  )
);

alter table public.questions_ia_parcours
  add column if not exists notion_id text null;

alter table public.questions_ia_parcours
  add column if not exists question_index integer null;

create index if not exists questions_ia_parcours_etab_user_created_idx
  on public.questions_ia_parcours using btree
  (code_etablissement, code_utilisateur, created_at desc);

create index if not exists questions_ia_parcours_etab_created_idx
  on public.questions_ia_parcours using btree
  (code_etablissement, created_at desc);

create index if not exists questions_ia_parcours_acces_created_idx
  on public.questions_ia_parcours using btree
  (acces_id, created_at desc);

create index if not exists questions_ia_parcours_notion_created_idx
  on public.questions_ia_parcours using btree
  (classe, notion_id, created_at desc);
