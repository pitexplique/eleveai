alter table public.acces_etablissement
add column if not exists classe text null;

alter table public.acces_etablissement
drop constraint if exists acces_etablissement_classe_check;

-- MAJ 31/07/2026 — OUVERTURE AU LYCÉE.
-- La liste s'arrêtait à la 3e puis sautait directement à 'terminale-spe' :
-- un élève de SECONDE ou de PREMIÈRE ne pouvait pas exister dans un
-- établissement, alors qu'il peut s'inscrire seul par e-mail (users_email a
-- toujours eu 'seconde' et 'premiere-spe'). Un lycée entier était donc
-- inimportable. Les deux listes sont désormais alignées ; 'adulte' reste
-- propre aux comptes établissement.
-- Le script est idempotent : on peut le rejouer.
alter table public.acces_etablissement
add constraint acces_etablissement_classe_check
check (
  classe is null
  or classe = any (
    array[
      'cp'::text,
      'ce1'::text,
      'ce2'::text,
      'cm1'::text,
      'cm2'::text,
      '6e'::text,
      '5e'::text,
      '4e'::text,
      '3e'::text,
      'seconde'::text,
      'premiere-spe'::text,
      'terminale-spe'::text,
      'adulte'::text
    ]
  )
);

create index if not exists acces_etablissement_classe_idx
on public.acces_etablissement using btree (code_etablissement, classe);
