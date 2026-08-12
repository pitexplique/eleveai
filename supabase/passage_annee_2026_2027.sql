-- PASSAGE D'ANNÉE — rentrée d'août 2026 (année scolaire 2026-2027)
-- Collèges concernés : DIMITILE et TROISMARES.
--
-- CE QUI CHANGE : uniquement la colonne `classe` (et `actif` pour les sortants).
-- CE QUI NE CHANGE JAMAIS : `code_utilisateur`. Le code est l'IDENTITÉ de
-- l'élève, pas la description de son niveau. Il est écrit en texte brut dans
-- 21 tables (resultats_*, connexions, bulletins, signalements, profil_eleve…)
-- et une seule clé étrangère existe dans tout le schéma — elle pointe sur `id`,
-- pas sur le code. Renommer un code ne suit donc NULLE PART : l'élève
-- réapparaîtrait comme n'ayant jamais rien fait. Les codes restent tels quels,
-- même quand ils mentent (« 6C00 » pour un élève passé en 5e).
--
-- ⚠️ L'ORDRE DES BLOCS EST OBLIGATOIRE. Les jouer un par un dans l'éditeur SQL
-- de Supabase, en vérifiant le résultat entre chaque.
--
-- ⚠️ NE JAMAIS monter les niveaux dans l'ordre croissant en trois updates
-- séparés (6e→5e, puis 5e→4e, puis 4e→3e) : le deuxième rattrape les élèves
-- que le premier vient de promouvoir, et TOUT LE COLLÈGE finit en 3e,
-- silencieusement. Le bloc 4 fait la montée en UN SEUL passage : Postgres
-- évalue le CASE sur les valeurs d'AVANT l'update, l'effet domino est donc
-- impossible par construction.


-- ═══════════════════════════════════════════════════════════════════════
-- BLOC 1 — LA PHOTO D'AVANT (à jouer en premier, sans exception)
-- ═══════════════════════════════════════════════════════════════════════
-- L'update écrase l'ancienne classe sans la garder nulle part. Cette table
-- est la seule trace qui restera de l'année 2025-2026 — et le seul moyen
-- d'annuler (bloc 6). C'est maintenant ou jamais.

create table if not exists public.affectations_2025_2026 as
select code_etablissement, code_utilisateur, nom, classe, actif
from public.acces_etablissement
where type_utilisateur = 'eleve';


-- ═══════════════════════════════════════════════════════════════════════
-- BLOC 2 — L'ÉTAT AVANT (à relire avant de toucher à quoi que ce soit)
-- ═══════════════════════════════════════════════════════════════════════
-- Noter les totaux par collège. Ils devront être IDENTIQUES au bloc 5 :
-- seule la répartition bouge, jamais le nombre d'élèves.

select code_etablissement, classe, actif, count(*) as nb
from public.acces_etablissement
where type_utilisateur = 'eleve'
group by 1, 2, 3
order by 1, 2;


-- ═══════════════════════════════════════════════════════════════════════
-- BLOC 3 — LES SORTANTS : les 3e partent au lycée
-- ═══════════════════════════════════════════════════════════════════════
-- ⚠️ IMPÉRATIVEMENT AVANT LE BLOC 4. Si on promeut d'abord, les 4e devenus
-- 3e se feraient désactiver dans la foulée.
--
-- On DÉSACTIVE, on ne supprime pas : `actif = false` bloque réellement la
-- connexion (fonction verifier_acces_etablissement, `and a.actif = true`,
-- + le chemin de repli de /api/code-login). Les données restent cohérentes,
-- les comptes ne polluent plus les tableaux de bord.
--
-- ⏭️ S'il n'y a aucun 3e en base (le bloc 2 le dit), ce bloc ne fait rien.
--    Le jouer quand même ne coûte rien.

update public.acces_etablissement
set actif = false
where code_etablissement in ('DIMITILE', 'TROISMARES')
  and type_utilisateur = 'eleve'
  and classe = '3e';


-- ═══════════════════════════════════════════════════════════════════════
-- BLOC 4 — LA MONTÉE : 6e→5e, 5e→4e, 4e→3e, EN UN SEUL PASSAGE
-- ═══════════════════════════════════════════════════════════════════════
-- Le filtre sur les deux collèges laisse VALERIE (le compte de l'inspectrice)
-- intact, ainsi que tout établissement fantôme. `type_utilisateur = 'eleve'`
-- laisse les profs et le principal en place.

update public.acces_etablissement
set classe = case classe
  when '6e' then '5e'
  when '5e' then '4e'
  when '4e' then '3e'
end
where code_etablissement in ('DIMITILE', 'TROISMARES')
  and type_utilisateur = 'eleve'
  and classe in ('6e', '5e', '4e');


-- ═══════════════════════════════════════════════════════════════════════
-- BLOC 5 — L'ÉTAT APRÈS (même requête que le bloc 2)
-- ═══════════════════════════════════════════════════════════════════════
-- À VÉRIFIER :
--   • le total par collège est inchangé (aucun élève perdu, aucun dupliqué) ;
--   • plus aucun 6e actif — ils sont tous passés en 5e ;
--   • les anciens 3e sont là, en `actif = false`.

select code_etablissement, classe, actif, count(*) as nb
from public.acces_etablissement
where type_utilisateur = 'eleve'
group by 1, 2, 3
order by 1, 2;


-- ═══════════════════════════════════════════════════════════════════════
-- BLOC 6 — ANNULER (⛔ à ne jouer QUE si le bloc 5 montre autre chose que
--          ce qui est attendu)
-- ═══════════════════════════════════════════════════════════════════════
-- Remet chaque élève exactement dans l'état du bloc 1. Ne touche ni aux
-- codes, ni aux résultats — qui n'ont de toute façon jamais bougé.

-- update public.acces_etablissement a
-- set classe = s.classe,
--     actif  = s.actif
-- from public.affectations_2025_2026 s
-- where a.code_etablissement = s.code_etablissement
--   and a.code_utilisateur   = s.code_utilisateur;


-- ═══════════════════════════════════════════════════════════════════════
-- CE QUE CE SCRIPT NE FAIT PAS
-- ═══════════════════════════════════════════════════════════════════════
-- 1. LES ENTRANTS. Les nouveaux 6e n'existent pas encore : ils arrivent par
--    l'import de masse (upsert sur `(code_etablissement, code_utilisateur)`,
--    rejouable sans dupliquer). ⚠️ Leurs codes ne doivent PAS contenir leur
--    niveau — les élèves sont redistribués chaque année, un code qui décrit
--    ment douze mois plus tard.
--
-- 2. LA DIVISION (« 5e B »). Elle n'est stockée nulle part : elle est
--    aujourd'hui DEVINÉE sur le préfixe du code par /api/evaluation-nationale/
--    classe, qui documente lui-même que ce n'est qu'un dépannage. Après ce
--    script, « 6C00 » sera en 5e mais s'affichera toujours dans un groupe
--    « 6C ». Purement cosmétique, et de toute façon faux dès que les élèves
--    sont redistribués — ce que font les deux collèges.
--
-- 3. L'HISTORIQUE PAR ANNÉE. Il n'existe aucune colonne `annee_scolaire` dans
--    tout le schéma. Conséquence : la « moyenne de la 5e » de cette année et
--    celle de l'an dernier se mélangeront. La vraie forme est une table
--    d'affectation — une ligne par élève ET par année
--    (code_etablissement, code_utilisateur, annee_scolaire, niveau, division) —
--    où la rentrée devient un INSERT au lieu d'un UPDATE destructeur.
--    La table du bloc 1 en est la première ligne, faite à la main.
--
-- Bonne nouvelle : les résultats déjà en base n'ont besoin de RIEN. Chaque
-- ligne resultats_* fige la `classe` au moment de l'exercice. Un exercice fait
-- en 6e en mai restera étiqueté « 6e » pour toujours, quoi qu'il arrive au
-- compte. La chronologie est déjà juste.
