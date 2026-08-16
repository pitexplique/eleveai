import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

// Banques par notion du cycle terminal de la voie technologique (série STMG).
//
// ─────────────────────────────────────────────────────────────────────────────
// ✅ COMPLET — 15/08/2026 : 338 items, 304 micro-compétences sur 304.
//
//   ✅ STMGAU  Automatismes .......................... 61/61 micros
//   ✅ STMGSU  Suites numériques ..................... 45/45
//   ✅ STMGFO  Fonctions et polynômes ................ 35/35
//   ✅ STMGDE  Dérivation ............................ 25/25
//   ✅ STMGEX  Exponentielles et logarithme décimal .. 31/31
//   ✅ STMGDC  Données croisées ...................... 12/12
//   ✅ STMGST  Statistique à deux variables .......... 16/16
//   ✅ STMGPR  Probabilités conditionnelles .......... 22/22
//   ✅ STMGVA  Variables aléatoires et loi binomiale . 28/28
//   ✅ STMGAL  Algorithmique, tableur et logique ..... 29/29
//
// Aucune micro sans question. Médiane de 94 questions RÉELLEMENT distinctes
// par micro (nombres et figure différents, pas seulement l'habillage) et
// minimum de 10 — le seuil de la règle d'or. 51 % des micros portent une
// figure ; les 13 micros graphiques obligatoires sont toutes illustrées.
//
// ⏳ RESTE À FAIRE : brancher la classe au sélecteur du coach (`CLASSES` dans
// app/coach-ia/[matiere]/page.tsx), à `PROGRAMME_CLASSES` dans lib/programme.ts
// et à lib/matrice/coach.ts. La liste du sélecteur passera à 15 boutons : c'est
// le moment de la grouper par cycle et par voie (générale / technologique)
// plutôt que d'allonger la ligne.
//
// À CHAQUE BANQUE, les quatre vérificateurs :
//   node --experimental-strip-types scripts/verifier-knowledge.mjs stmg
//   node --experimental-strip-types scripts/verifier-generateurs.mjs stmg maths 600
//   node --experimental-strip-types scripts/verifier-variete.mjs stmg maths
//   node --experimental-strip-types scripts/verifier-canvas.mjs stmg maths
//   npx tsc --noEmit
//
// Ils ont eu raison une dizaine de fois sur ce chantier, dont trois sur des
// corrections que je venais d'écrire. Les défauts qu'ils attrapent ne se
// voient PAS à la relecture : des distracteurs qui se recoupent sur certains
// tirages seulement, un croisement de courbes qui tombe hors du tableau
// affiché, un générateur juste mais qui ne produit que trois énoncés.
//
// ─────────────────────────────────────────────────────────────────────────────
// À QUI ON ÉCRIT
//
// La série STMG accueille beaucoup d'élèves à qui les maths se sont mal
// passées. Ce n'est pas une raison pour baisser le niveau — le programme est le
// programme — mais ça décide de la FORME :
//
//   · un GRAPHIQUE ou un TABLEAU dès qu'une question peut en porter un ;
//   · des SITUATIONS DE GESTION, jamais « soit f(x) = 2x² − 3x + 1 » tout
//     seul : une marge, un chiffre d'affaires, une remise, un stock, un taux de
//     TVA, un emprunt, un capital placé. Le programme le demande lui-même —
//     « emprunts, placements, coûts, vitesses » ;
//   · le MAXIMUM de générateurs. Un élève ne doit pas retomber sur la même
//     question en dix minutes : à une minute par question, cela fait DIX
//     ÉNONCÉS DISTINCTS minimum par micro-compétence.
//
// Canvas disponibles : `fonctionGraphique` (courbe, droite, nuage de points
// d'une suite), `tableau_donnees` (tableau croisé à double entrée),
// `arbre_proba` (arbre pondéré), `stat_graph`.
// ─────────────────────────────────────────────────────────────────────────────
//
// ⛔ Trois interdits du texte, à tenir dans CHAQUE item :
//    pas de discriminant (racines par la forme factorisée seulement) ;
//    pas de forme canonique ;
//    suites géométriques à termes strictement positifs.
//
// ⚠️ Et deux frontières première/terminale à ne pas franchir dans les items de
//    première : le terme général d'une suite est en terminale, et la
//    probabilité conditionnelle s'y calcule uniquement sur un tableau croisé
//    (ni arbre, ni probabilités totales).

import { proportionsEvolutionsBank } from "./proportions-evolutions.bank";
import { automatismesCalculBank } from "./automatismes-calcul.bank";
import { automatismesAlgebreBank } from "./automatismes-algebre.bank";
import { automatismesGraphiquesBank } from "./automatismes-graphiques.bank";
import { automatismesTerminaleBank } from "./automatismes-terminale.bank";
import { suitesPremiereBank } from "./suites-premiere.bank";
import { suitesTerminaleBank } from "./suites-terminale.bank";
import { fonctionsRepresentationBank } from "./fonctions-representation.bank";
import { fonctionsPolynomesBank } from "./fonctions-polynomes.bank";
import { fonctionInverseBank } from "./fonction-inverse.bank";
import { derivationBank } from "./derivation.bank";
import { exponentiellesBank } from "./exponentielles.bank";
import { logarithmeBank } from "./logarithme.bank";
import { donneesCroiseesBank } from "./donnees-croisees.bank";
import { probabilitesConditionnellesBank } from "./probabilites-conditionnelles.bank";
import { variablesAleatoiresBank } from "./variables-aleatoires.bank";
import { statistiqueDeuxVariablesBank } from "./statistique-deux-variables.bank";
import { algorithmiqueBank } from "./algorithmique.bank";

export const mathsStmgQuestionBank: TutorBankItemV4[] = [
  ...proportionsEvolutionsBank,
  ...automatismesCalculBank,
  ...automatismesAlgebreBank,
  ...automatismesGraphiquesBank,
  ...automatismesTerminaleBank,
  ...suitesPremiereBank,
  ...suitesTerminaleBank,
  ...fonctionsRepresentationBank,
  ...fonctionsPolynomesBank,
  ...fonctionInverseBank,
  ...derivationBank,
  ...exponentiellesBank,
  ...logarithmeBank,
  ...donneesCroiseesBank,
  ...probabilitesConditionnellesBank,
  ...variablesAleatoiresBank,
  ...statistiqueDeuxVariablesBank,
  ...algorithmiqueBank,
];
