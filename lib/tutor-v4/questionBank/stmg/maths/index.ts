import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

// Banques par notion du cycle terminal de la voie technologique (série STMG).
//
// ⚠️ VIDE AU 15/08/2026. La structure (bo → notions → micro-compétences) est
// posée, les banques restent à écrire, notion par notion. Tant que ce tableau
// est vide, la classe n'est branchée ni au sélecteur du coach ni aux pages
// programme : on n'annonce pas ce qui n'a rien derrière.
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

export const mathsStmgQuestionBank: TutorBankItemV4[] = [
  ...proportionsEvolutionsBank,
  ...automatismesCalculBank,
  ...automatismesAlgebreBank,
  ...automatismesGraphiquesBank,
  ...automatismesTerminaleBank,
  ...suitesPremiereBank,
  ...suitesTerminaleBank,
];
