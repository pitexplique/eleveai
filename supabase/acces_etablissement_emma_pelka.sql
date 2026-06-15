-- Ajout d'un accès élève : EMMA PELKA
-- Établissement DIMITILE, code CM2001, mot de passe DANSE (hashé par le trigger).
-- À exécuter dans l'éditeur SQL de Supabase.

insert into public.acces_etablissement
  (code_etablissement, code_utilisateur, type_utilisateur, nom, classe, mot_de_passe, actif)
values
  ('DIMITILE', 'CM2001', 'eleve', 'EMMA PELKA', 'cm2', 'DANSE', true)
on conflict (code_etablissement, code_utilisateur) do update
set type_utilisateur = excluded.type_utilisateur,
    nom             = excluded.nom,
    classe          = excluded.classe,
    mot_de_passe    = excluded.mot_de_passe,
    actif           = excluded.actif;
