-- Réponses données au coach — « combien de questions répondues ? », comme
-- le compteur d'IXL (« 222,145,706,959 questions answered! »).
-- 28/10/2026. Frédéric : 40 élèves ont travaillé en classe le 27/10 au matin
-- et n'apparaissaient nulle part, parce qu'il n'oblige pas la connexion et que
-- seuls les connectés laissaient une trace (resultats_tutor, activite_eleve).
-- Ici, TOUTE réponse corrigée par /api/coach/answer compte, connecté ou non.
-- RGPD : aucune identité, aucune IP — juste des COMPTEURS.
--
-- ⭐ Deux tables, comme video_vues :
--   - coach_reponses : un compteur par jour, classe, matière et micro (pour le
--     relevé de la réussite : quelles micros servent, quel taux de réussite) ;
--   - coach_reponses_total : UNE ligne, le grand total affiché en direct sur
--     le coach — se lit sans rien additionner.
-- À exécuter dans l'éditeur SQL de Supabase.

create table if not exists public.coach_reponses (
  jour date not null,
  classe text not null,                -- '6e', '4e', 'seconde'…
  matiere text not null,               -- 'maths', 'francais'…
  micro_id text not null,
  reponses integer not null default 0,
  justes integer not null default 0,
  constraint coach_reponses_pkey primary key (jour, classe, matiere, micro_id)
) TABLESPACE pg_default;

create index if not exists coach_reponses_jour_idx
  on public.coach_reponses using btree (jour desc) TABLESPACE pg_default;

create table if not exists public.coach_reponses_total (
  id smallint not null default 1,
  total bigint not null default 0,
  constraint coach_reponses_total_pkey primary key (id),
  constraint coach_reponses_total_une_ligne check (id = 1)
) TABLESPACE pg_default;

insert into public.coach_reponses_total (id, total) values (1, 0)
  on conflict (id) do nothing;

-- +1 en une seule requête : le compteur du jour et le grand total.
create or replace function public.compter_reponse_coach(
  p_classe text, p_matiere text, p_micro text, p_juste boolean
)
returns void
language sql
security definer
set search_path = public
as $$
  insert into public.coach_reponses (jour, classe, matiere, micro_id, reponses, justes)
  values ((now() at time zone 'Indian/Reunion')::date, p_classe, p_matiere, p_micro, 1, case when p_juste then 1 else 0 end)
  on conflict (jour, classe, matiere, micro_id) do update set
    reponses = public.coach_reponses.reponses + 1,
    justes = public.coach_reponses.justes + excluded.justes;
  update public.coach_reponses_total set total = total + 1 where id = 1;
$$;

revoke all on function public.compter_reponse_coach(text, text, text, boolean) from public, anon, authenticated;

-- RLS activé sans policy : seule la clé service role (API) écrit et lit.
alter table public.coach_reponses enable row level security;
alter table public.coach_reponses_total enable row level security;
