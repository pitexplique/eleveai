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
// ✅ Classe branchée et ouverte : coach, parcours, /programme/stmg. Le
// sélecteur du coach est groupé par cycle et par voie.
//
// ⛔⛔ UN ITEM PAR MICRO — CE QUE ÇA COÛTE, ET POURQUOI ON L'A GARDÉ
//
// Cette banque compte 338 items pour 304 micros, soit 1,1 item par micro, là
// où les autres classes en ont ~9. Ce n'est PAS une pauvreté de contenu :
// ailleurs ce sont des items FIGÉS, ici c'est un générateur par micro, qui
// produit 94 questions réellement distinctes en médiane. 94 bat 9.
//
// Mais le coach sert des PAIRES de questions, et `questionPairBuilder`
// comptait les ITEMS de banque, pas les questions générables : sous deux
// items, il levait « Aucune paire disponible dans la notion … ». La classe
// était verte aux cinq vérificateurs et 274 micros sur 304 ne démarraient
// pas — c'est en l'ouvrant dans un navigateur qu'on l'a vu, jamais autrement.
//
// En mode simple (« Affichage classe »), une seule question est affichée :
// `allowSingleItem` autorise donc le second tirage à venir du même
// générateur, avec d'autres nombres. 304/304 démarrent.
// En mode complet, deux questions sont OPPOSÉES et doivent contraster : il y
// faut deux items d'angles différents. 30/304 aujourd'hui.
//
// ⏳ RESTE À FAIRE : un second générateur par micro, d'un ANGLE DIFFÉRENT du
// premier — pas une variante de nombres, sinon le contraste ne sert à rien.
//
// À CHAQUE BANQUE, les cinq vérificateurs :
//   node --experimental-strip-types scripts/verifier-knowledge.mjs stmg
//   node --experimental-strip-types scripts/verifier-generateurs.mjs stmg maths 600
//   node --experimental-strip-types scripts/verifier-variete.mjs stmg maths
//   node --experimental-strip-types scripts/verifier-canvas.mjs stmg maths
//   node --experimental-strip-types scripts/echantillon-banque.mjs stmg maths --lire 2
//   npx tsc --noEmit
//
// Ils ont eu raison une dizaine de fois sur ce chantier, dont trois sur des
// corrections que je venais d'écrire. Les défauts qu'ils attrapent ne se
// voient PAS à la relecture : des distracteurs qui se recoupent sur certains
// tirages seulement, un croisement de courbes qui tombe hors du tableau
// affiché, un générateur juste mais qui ne produit que trois énoncés.
//
// ⚠️ Mais AUCUN des cinq ne lit la LANGUE ni ne lance le coach. La lecture à
// la main du 16/08 a trouvé, après leur feu vert : deux propositions
// équivalentes dans un QCM (l'élève avait raison et était compté faux), un
// effectif d'abonnés à 118,75, un crédit à coût négatif, et 55 tournures
// fautives nées des réservoirs de contexte (« Combien de abonnés », « la
// probabilité que il est hors tolérance »). Les réservoirs portent désormais
// le genre et l'élision : ne pas y remettre un nom sans son genre.
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
