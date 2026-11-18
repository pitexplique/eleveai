-- Plafond des questions à l'IA (18/11/2026).
-- Un compteur par jour et par clé (« eleve:<id> », « ip:<adresse> », « total »).
-- La fonction ajoute 1 et renvoie le nouveau total, sauf si le plafond est
-- déjà atteint : elle renvoie alors -1 sans rien ajouter. Atomique.
-- ⚠️ À exécuter dans Supabase (SQL Editor). Tant qu'elle n'existe pas, le site
-- laisse passer les questions (lib/ia/plafond.ts, « échec ouvert »).

create table if not exists public.usage_ia (
  jour date not null default (now() at time zone 'Indian/Reunion')::date,
  cle text not null,
  nombre integer not null default 0,
  primary key (jour, cle)
);

alter table public.usage_ia enable row level security;
-- Aucune politique : seule la clé de service (côté serveur) y accède.

create or replace function public.compter_question_ia(p_cle text, p_max integer)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  v_jour date := (now() at time zone 'Indian/Reunion')::date;
  v_nombre integer;
begin
  insert into public.usage_ia (jour, cle, nombre)
  values (v_jour, p_cle, 0)
  on conflict (jour, cle) do nothing;

  update public.usage_ia
     set nombre = nombre + 1
   where jour = v_jour and cle = p_cle and nombre < p_max
  returning nombre into v_nombre;

  return coalesce(v_nombre, -1);
end;
$$;

revoke all on function public.compter_question_ia(text, integer) from public, anon, authenticated;
