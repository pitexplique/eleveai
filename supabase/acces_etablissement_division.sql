-- LA DIVISION DEVIENT UNE VRAIE COLONNE — 12/08/2026
--
-- LE PROBLÈME. `acces_etablissement.classe` ne connaît que le NIVEAU ('6e',
-- '4e') et sa contrainte SQL n'accepte rien d'autre. Or un collège n'a pas
-- « une 6e » : il a une 6e A, une 6e B, une 6e C. Faute de colonne pour la
-- porter, la division était DEVINÉE sur le préfixe du code_utilisateur
-- (« 6C07 » → « 6C ») par groupeDuCode() dans
-- app/api/evaluation-nationale/classe/route.ts, qui documente lui-même que
-- ce n'est qu'un dépannage.
--
-- POURQUOI MAINTENANT. Le devinage tient tant que le code décrit la classe.
-- Il s'effondre dès que les élèves sont REDISTRIBUÉS — ce que font DIMITILE et
-- TROISMARES chaque année. Depuis le passage d'année du 12/08, les codes
-- « 6C00 »… désignent des élèves de 5e : le préfixe ment déjà.
--
-- ⚠️ ET C'EST L'ORDRE QUI COMPTE. Tant que cette colonne n'existe pas, le
-- préfixe du code est la SEULE chose qui distingue la 6e C de la 6e D. Donner
-- des codes neutres (« ELEVE-0001 ») avant de poser la colonne rangerait tous
-- les élèves dans un même tas. La colonne d'abord, les codes neutres ensuite.
--
-- ⛔ CE SCRIPT NE TOUCHE PAS AUX `code_utilisateur`. Un code est une IDENTITÉ.
-- Il est écrit en texte brut dans 21 tables et une seule clé étrangère existe
-- dans tout le schéma — elle pointe sur `id`, pas sur le code. Le renommer ne
-- suivrait nulle part. Après ce script, le contenu du code ne veut plus rien
-- dire, et c'est exactement le but : plus rien ne le lit.
--
-- Script idempotent : on peut le rejouer.


-- ═══════════════════════════════════════════════════════════════════════
-- 1. LES DEUX COLONNES
-- ═══════════════════════════════════════════════════════════════════════
-- `division`      : la classe réelle de l'élève — « 6C », « 5B ». Texte libre :
--                   chaque collège nomme ses divisions comme il veut, et une
--                   contrainte figée n'y survivrait pas (« 6e1 », « 6°C »…).
-- `annee_scolaire`: l'année à laquelle cette affectation s'applique. Le compte
--                   ne porte que l'affectation COURANTE ; l'historique vit dans
--                   les tables photo (cf. affectations_2025_2026, créée par
--                   passage_annee_2026_2027.sql).

alter table public.acces_etablissement
add column if not exists division text null;

alter table public.acces_etablissement
add column if not exists annee_scolaire text null;


-- ═══════════════════════════════════════════════════════════════════════
-- 2. REPRISE DE L'EXISTANT — le devinage joué UNE FOIS, puis jeté
-- ═══════════════════════════════════════════════════════════════════════
-- Même règle que groupeDuCode() : un préfixe, puis un numéro.
--   « 6C07 » → « 6C »   « 6ETEST-12 » → « 6ETEST »   « CM1000 » → « CM »
-- Ce qui ne matche pas reste NULL — « division inconnue », pas une valeur
-- inventée. La route sait retomber sur le préfixe tant que c'est NULL.
--
-- ⚠️ CES VALEURS SONT CELLES DE L'AN DERNIER. Après la redistribution de
-- septembre, elles seront fausses : ce n'est qu'une amorce pour que rien ne
-- régresse en attendant les listes réelles. Voir le bloc 4.

update public.acces_etablissement
set division = nullif(
      trim(coalesce(substring(code_utilisateur from '^(.*?)[-_ ]?[0-9]+$'), '')),
      ''
    )
where type_utilisateur = 'eleve'
  and division is null;

update public.acces_etablissement
set annee_scolaire = '2026-2027'
where type_utilisateur = 'eleve'
  and annee_scolaire is null;

create index if not exists acces_etablissement_division_idx
on public.acces_etablissement using btree (code_etablissement, classe, division);


-- ═══════════════════════════════════════════════════════════════════════
-- 3. VÉRIFIER CE QUE LA REPRISE A PRODUIT
-- ═══════════════════════════════════════════════════════════════════════
-- Lire cette sortie AVANT de faire confiance à l'affichage. Une division
-- « 6C » sur des élèves désormais en 5e est NORMALE ici : c'est le préfixe de
-- l'an dernier. Une division NULL signale un code hors convention.

select code_etablissement, classe, division, annee_scolaire, count(*) as nb
from public.acces_etablissement
where type_utilisateur = 'eleve'
group by 1, 2, 3, 4
order by 1, 2, 3;


-- ═══════════════════════════════════════════════════════════════════════
-- 4. LA VRAIE AFFECTATION, quand les listes de septembre arriveront
-- ═══════════════════════════════════════════════════════════════════════
-- Les élèves sont redistribués : la division reprise au bloc 2 est celle de
-- l'an dernier. À corriger classe par classe, une ligne par division. Exemple :
--
--   update public.acces_etablissement
--   set division = '5B'
--   where code_etablissement = 'DIMITILE'
--     and code_utilisateur in ('6C00', '6C04', '6C11');
--
-- Les codes restent tels quels — ils ne décrivent plus rien, ils identifient.
-- C'est le seul geste à répéter chaque rentrée, avec `classe`.
