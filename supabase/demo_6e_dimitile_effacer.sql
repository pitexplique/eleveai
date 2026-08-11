-- EFFACER LA CLASSE DE DÉMONSTRATION « 6ᵉ TEST ».
--
-- ⛔ À JOUER AVANT LA RENTRÉE, sans faute (consigne de Frédéric, 11/08/2026).
--
-- POURQUOI CE FICHIER EXISTE. Les résultats créés par demo_6e_dimitile.sql
-- sont SIMULÉS. Le jour où une vraie 6ᵉ passe l'épreuve, ils se mélangeraient
-- aux vrais dans la moyenne de l'établissement et dans la répartition des
-- groupes de maîtrise — c'est-à-dire dans le chiffre même sur lequel l'équipe
-- va constituer ses groupes de besoins. Un bilan de rentrée faussé par des
-- élèves qui n'existent pas, c'est pire que pas de bilan du tout.
--
-- CE QUI PART : les 30 comptes 6ETEST-01 à 6ETEST-30 et TOUT ce qu'ils ont
-- produit — y compris les épreuves passées pour de vrai par les testeurs sur
-- les comptes 16 à 30. C'est voulu : ce sont des essais, pas des élèves.
--
-- ⚠️ VÉRIFIER AVANT DE SUPPRIMER. Jouer d'abord les deux `select` ci-dessous
-- et lire ce qu'ils renvoient : rien d'autre que des codes 6ETEST-NN ne doit
-- apparaître. La suppression, elle, ne se rattrape pas.

-- ── 1. CE QUI VA ÊTRE SUPPRIMÉ ───────────────────────────────────────────────
select code_etablissement, code_utilisateur, nom, classe
from public.acces_etablissement
where code_utilisateur like '6ETEST-%'
order by code_utilisateur;

select code_etablissement, code_utilisateur, nom, matiere, score, total, created_at
from public.resultats_evaluation_nationale
where code_utilisateur like '6ETEST-%'
order by code_utilisateur;

-- ── 2. LA SUPPRESSION ────────────────────────────────────────────────────────
-- Décommenter et jouer seulement après avoir relu les deux listes ci-dessus.
--
-- Les résultats d'abord, les comptes ensuite : dans l'autre ordre, on perdrait
-- le moyen de retrouver les résultats orphelins.
--
-- delete from public.resultats_evaluation_nationale
-- where code_utilisateur like '6ETEST-%';
--
-- Les autres activités : un testeur aura pu ouvrir le coach ou la dictée avec
-- son compte. On nettoie aussi, sinon la classe « disparaît » du bilan de
-- l'évaluation mais reste dans les statistiques de l'établissement.
--
-- delete from public.resultats_parcours_maths   where code_utilisateur like '6ETEST-%';
-- delete from public.resultats_parcours_francais where code_utilisateur like '6ETEST-%';
-- delete from public.resultats_dictee           where code_utilisateur like '6ETEST-%';
-- delete from public.resultats_calcul_rapide    where code_utilisateur like '6ETEST-%';
-- delete from public.connexions                 where code_utilisateur like '6ETEST-%';
--
-- Les comptes en dernier.
--
-- delete from public.acces_etablissement
-- where code_utilisateur like '6ETEST-%';

-- ── 3. CONTRÔLE APRÈS COUP ───────────────────────────────────────────────────
-- Les deux doivent renvoyer 0.
--
-- select count(*) from public.acces_etablissement            where code_utilisateur like '6ETEST-%';
-- select count(*) from public.resultats_evaluation_nationale where code_utilisateur like '6ETEST-%';
