-- Le coût de l'IA, par utilisateur et par jour (19/11/2026).
-- Modèle du 19/11 : tokens et coût estimé suivis pour chaque question à l'IA ;
-- une alerte par courriel part UNE fois par mois quand le coût du mois dépasse
-- le budget (lib/tarifs.ts, COUT_IA.budgetMensuelEuros, 50 € par défaut).
-- ⚠️ À exécuter dans Supabase (SQL Editor), après usage_ia.sql. Tant que ce
-- n'est pas fait, le site répond normalement et ne compte rien (échec ouvert).

create table if not exists public.usage_ia_cout (
  jour date not null default (now() at time zone 'Indian/Reunion')::date,
  cle text not null,              -- « eleve:<id> », « ip:<adresse> »
  modele text not null,
  appels integer not null default 0,
  tokens_entree bigint not null default 0,
  tokens_sortie bigint not null default 0,
  cout_euros numeric(12, 6) not null default 0,
  primary key (jour, cle, modele)
);

create index if not exists usage_ia_cout_jour_idx on public.usage_ia_cout (jour);

-- Une ligne par mois où l'alerte est partie : elle ne part qu'une fois.
create table if not exists public.alertes_budget_ia (
  mois text primary key,          -- « 2026-11 »
  cout_euros numeric(12, 2) not null,
  budget_euros numeric(12, 2) not null,
  creee_le timestamp with time zone not null default now()
);

alter table public.usage_ia_cout enable row level security;
alter table public.alertes_budget_ia enable row level security;
-- Aucune politique : seule la clé de service (côté serveur) y accède.

-- Ajoute un appel, renvoie le coût du mois et s'il faut envoyer l'alerte.
create or replace function public.noter_cout_ia(
  p_cle text, p_modele text, p_entree integer, p_sortie integer, p_cout numeric, p_budget numeric
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_jour date := (now() at time zone 'Indian/Reunion')::date;
  v_mois text := to_char(v_jour, 'YYYY-MM');
  v_total numeric;
  v_alerte boolean := false;
begin
  insert into public.usage_ia_cout (jour, cle, modele, appels, tokens_entree, tokens_sortie, cout_euros)
  values (v_jour, p_cle, p_modele, 1, greatest(p_entree, 0), greatest(p_sortie, 0), greatest(p_cout, 0))
  on conflict (jour, cle, modele) do update
     set appels = usage_ia_cout.appels + 1,
         tokens_entree = usage_ia_cout.tokens_entree + excluded.tokens_entree,
         tokens_sortie = usage_ia_cout.tokens_sortie + excluded.tokens_sortie,
         cout_euros = usage_ia_cout.cout_euros + excluded.cout_euros;

  select coalesce(sum(cout_euros), 0) into v_total
    from public.usage_ia_cout
   where jour >= date_trunc('month', v_jour)::date;

  if v_total > p_budget then
    insert into public.alertes_budget_ia (mois, cout_euros, budget_euros)
    values (v_mois, v_total, p_budget)
    on conflict (mois) do nothing;
    v_alerte := found;
  end if;

  return jsonb_build_object('total_mois', v_total, 'alerte', v_alerte);
end;
$$;

revoke all on function public.noter_cout_ia(text, text, integer, integer, numeric, numeric) from public, anon, authenticated;

-- Pour regarder (SQL Editor) : le coût par jour, et les plus gros utilisateurs du mois.
-- select jour, sum(appels) appels, sum(cout_euros) euros from usage_ia_cout group by jour order by jour desc;
-- select cle, sum(appels), sum(cout_euros) from usage_ia_cout where jour >= date_trunc('month', now())::date group by cle order by 3 desc limit 20;
