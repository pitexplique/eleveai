-- users_email : colonne « source » d'acquisition
-- -----------------------------------------------------------------------------
-- Trace d'où vient une inscription email (ex. "cahier-vacances" quand l'utilisateur
-- arrive via /auth/signin?from=cahier). NULL = origine non renseignée (inscription
-- directe, ancien compte…). Permet de mesurer les inscriptions générées par le
-- cahier de vacances (1er canal d'acquisition organique).
--
-- Idempotent : ré-exécutable sans risque.

do $$
begin
  if to_regclass('public.users_email') is null then
    raise notice 'users_email absente — migration ignorée';
  else
    alter table public.users_email
      add column if not exists source text;

    comment on column public.users_email.source is
      'Canal d''acquisition à la création du compte (ex. "cahier-vacances"). NULL si non renseigné.';
  end if;
end $$;
