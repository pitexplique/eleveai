-- LE PRÉNOM OU PSEUDO DE L'ÉLÈVE — 10/11/2026 (lib/pseudo.ts)
--
-- Frédéric suit ses élèves EN DIRECT mais ne voit que leur code : l'élève peut
-- écrire son prénom ou un pseudo depuis son tableau de bord. Facultatif, 20
-- caractères au plus, jamais de nom de famille demandé.
--
-- Rangé avec les passions et l'avatar (supabase/passions_eleves.sql, à
-- exécuter d'abord s'il ne l'a jamais été).
--
-- SÉCURITÉ : RLS activé SANS policy sur passions_eleves → personne ne lit ni
-- n'écrit avec la clé publique. Seule /api/passions (clé service role) écrit,
-- et seulement la ligne de l'élève du jeton de session : un élève ne modifie
-- que le sien. Les pages du prof (/api/prof/classes, …/direct, …/bilan) ne
-- lisent que les élèves des classes qu'il possède.
--
-- À exécuter dans l'éditeur SQL de Supabase. Idempotent. Tant qu'il n'a pas
-- tourné, le champ s'affiche mais l'enregistrement échoue sans erreur grave.

alter table public.passions_eleves add column if not exists pseudo text null;

alter table public.passions_eleves drop constraint if exists passions_eleves_pseudo_longueur;
alter table public.passions_eleves
  add constraint passions_eleves_pseudo_longueur check (pseudo is null or char_length(pseudo) between 1 and 20);

alter table public.passions_eleves enable row level security;
