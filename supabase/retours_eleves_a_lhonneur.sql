-- « À l'honneur » : le cran au-dessus de « traité ».
-- ---------------------------------------------------------------------------
-- Quand Frédéric retient une contribution (idée/bug/avis), il la met À L'HONNEUR
-- et écrit ce qu'elle a PRODUIT (l'amélioration). La ligne devient alors une
-- production publique et signée (prénom seul, RGPD) sur le mur « Vous l'avez
-- demandé → c'est fait », et le contributeur gagne un gros bonus de points.
--
-- Remplace l'édition manuelle de lib/ameliorations/realisees.ts : désormais le
-- mur se remplit tout seul depuis l'admin.
--
-- Idempotent : ré-exécutable sans risque.

do $$
begin
  if to_regclass('public.retours_eleves') is null then
    raise notice 'retours_eleves absente — migration ignorée';
  else
    -- Le contributeur est mis en avant + gagne le bonus « à l'honneur ».
    alter table public.retours_eleves
      add column if not exists a_lhonneur boolean not null default false;

    -- Ce que la contribution a produit (le « c'est fait »). Rédigé par Frédéric.
    alter table public.retours_eleves
      add column if not exists amelioration text null;

    comment on column public.retours_eleves.a_lhonneur is
      'true = contribution retenue et publiée sur le mur des améliorations (bonus points).';
    comment on column public.retours_eleves.amelioration is
      'Ce que la contribution a produit sur EleveAI (le « c''est fait »), rédigé par l''admin.';

    -- Lecture rapide du mur public (les lignes à l'honneur, les plus récentes).
    create index if not exists retours_eleves_a_lhonneur_idx
      on public.retours_eleves using btree (a_lhonneur, created_at desc);
  end if;
end $$;
