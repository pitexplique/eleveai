-- Les codes d'abonnement : contreparties Ulule (08/11/2026).
-- Ulule encaisse ; chaque contributeur reçoit un code à usage unique, qu'il active
-- sur eleveai.fr/code. Le code prolonge la table `abonnements` (acces_jusquau),
-- la même que Stripe : il n'y a pas d'abonnement parallèle.
-- RLS activé sans policy : lecture et écriture par la clé service role uniquement.
-- À exécuter dans l'éditeur SQL de Supabase, APRÈS abonnements.sql.

create table if not exists public.codes_abonnement (
  -- MARGO-XXXX-XXXX, alphabet sans 0, O, 1, I, L (scripts/codes-ulule.mjs).
  code text primary key check (code ~ '^MARGO-[2-9A-HJKMNP-Z]{4}-[2-9A-HJKMNP-Z]{4}$'),
  duree_mois integer not null check (duree_mois in (1, 2, 6, 12)),
  type text not null check (type in ('famille', 'cadeau', 'classe')),
  -- Seulement pour une licence classe.
  nb_eleves integer check (nb_eleves is null or nb_eleves > 0),
  origine text not null default 'ulule',
  -- Le nom du lot d'export (un CSV = un lot), pour retrouver un envoi.
  lot text,
  utilise_le timestamp with time zone,
  utilise_par uuid references auth.users (id) on delete set null,
  created_at timestamp with time zone not null default now(),
  constraint codes_abonnement_classe_a_des_eleves
    check ((type = 'classe') = (nb_eleves is not null))
);

create index if not exists codes_abonnement_utilise_par_idx on public.codes_abonnement (utilise_par);
create index if not exists codes_abonnement_lot_idx on public.codes_abonnement (lot);

alter table public.codes_abonnement enable row level security;

-- ⭐ Utiliser un code, en UNE transaction : la ligne du code est verrouillée,
-- donc deux personnes qui tapent le même code en même temps ne l'ouvrent pas deux fois.
-- Réponse : { resultat, duree_mois, type, nb_eleves, acces_jusquau }
--   inconnu               le code n'existe pas
--   deja_utilise          un autre compte l'a déjà utilisé
--   deja_utilise_par_vous ce compte l'a déjà utilisé (double clic, retour arrière)
--   abonnement_mensuel    un abonnement Stripe au mois court encore : le code n'est PAS consommé
--   classe                licence classe enregistrée (rien à ouvrir côté famille)
--   ouvert                l'accès est prolongé de duree_mois
create or replace function public.utiliser_code_abonnement(p_code text, p_user uuid, p_email text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  c public.codes_abonnement%rowtype;
  a public.abonnements%rowtype;
  depart timestamp with time zone;
  fin timestamp with time zone;
begin
  select * into c from public.codes_abonnement where code = p_code for update;
  if not found then
    return jsonb_build_object('resultat', 'inconnu');
  end if;
  if c.utilise_le is not null then
    return jsonb_build_object(
      'resultat', case when c.utilise_par = p_user then 'deja_utilise_par_vous' else 'deja_utilise' end,
      'duree_mois', c.duree_mois, 'type', c.type);
  end if;

  if c.type = 'classe' then
    update public.codes_abonnement set utilise_le = now(), utilise_par = p_user where code = p_code;
    return jsonb_build_object('resultat', 'classe', 'duree_mois', c.duree_mois, 'type', c.type,
      'nb_eleves', c.nb_eleves);
  end if;

  select * into a from public.abonnements where user_id = p_user for update;
  -- Un abonnement Stripe au mois encore vivant (même arrêté, jusqu'à la fin du mois payé) :
  -- le webhook réécrira acces_jusquau au renouvellement ou à la fin, et les mois du code
  -- seraient perdus. On attend sa fin ; le code n'est pas consommé.
  if found and a.formule = 'mensuel' and a.stripe_subscription_id is not null
     and a.statut in ('active', 'trialing', 'past_due') then
    return jsonb_build_object('resultat', 'abonnement_mensuel', 'duree_mois', c.duree_mois, 'type', c.type,
      'acces_jusquau', a.acces_jusquau);
  end if;

  -- Les mois s'ajoutent à un accès déjà en cours (deux codes = deux durées).
  depart := greatest(now(), coalesce(a.acces_jusquau, now()));
  fin := depart + make_interval(months => c.duree_mois);

  insert into public.abonnements (user_id, email, statut, acces_jusquau, fin_programmee, updated_at)
  values (p_user, p_email, 'code', fin, true, now())
  on conflict (user_id) do update set
    email = coalesce(public.abonnements.email, excluded.email),
    statut = 'code',
    acces_jusquau = excluded.acces_jusquau,
    fin_programmee = true,
    updated_at = now();

  update public.codes_abonnement set utilise_le = now(), utilise_par = p_user where code = p_code;

  return jsonb_build_object('resultat', 'ouvert', 'duree_mois', c.duree_mois, 'type', c.type,
    'acces_jusquau', fin);
end;
$$;

-- Seule la clé service role l'appelle (route /api/code/activer).
revoke all on function public.utiliser_code_abonnement(text, uuid, text) from public, anon, authenticated;
grant execute on function public.utiliser_code_abonnement(text, uuid, text) to service_role;

-- Pour essayer après exécution (à effacer ensuite) :
-- insert into public.codes_abonnement (code, duree_mois, type, origine, lot)
--   values ('MARGO-TEST-FAM2', 1, 'famille', 'essai', 'essai');
-- delete from public.codes_abonnement where origine = 'essai';
