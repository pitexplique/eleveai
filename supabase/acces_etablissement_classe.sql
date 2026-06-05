alter table public.acces_etablissement
add column if not exists classe text null;

alter table public.acces_etablissement
drop constraint if exists acces_etablissement_classe_check;

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
      'terminale-spe'::text,
      'adulte'::text
    ]
  )
);

create index if not exists acces_etablissement_classe_idx
on public.acces_etablissement using btree (code_etablissement, classe);
