-- users_email : colonne « classe » (élèves indépendants)
-- -----------------------------------------------------------------------------
-- Les comptes établissement portent leur classe dans acces_etablissement.classe,
-- mais les élèves inscrits par email (users_email) n'avaient aucune classe :
-- impossible de personnaliser les recommandations (accueil, coach ?classe=…).
-- Cette colonne est demandée à l'inscription quand le profil choisi est
-- « Élève », et modifiable depuis /dashboard/compte. NULL pour les autres
-- profils (prof, parent, perso) et les anciens comptes élève.
--
-- Idempotent : ré-exécutable sans risque.

do $$
begin
  if to_regclass('public.users_email') is null then
    raise notice 'users_email absente — migration ignorée';
  else
    alter table public.users_email
      add column if not exists classe text;

    alter table public.users_email
      drop constraint if exists users_email_classe_check;

    alter table public.users_email
      add constraint users_email_classe_check
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
            'terminale-spe'::text
          ]
        )
      );

    comment on column public.users_email.classe is
      'Classe déclarée à l''inscription (profil élève uniquement). NULL = non renseignée (autres profils, anciens comptes).';
  end if;
end $$;
