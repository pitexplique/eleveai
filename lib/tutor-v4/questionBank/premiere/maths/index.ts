import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

// Banques par notion du module spécifique de Première (élèves sans spé maths).
//
// ⚠️ VIDE AU 14/08/2026. La structure (bo → notions → micro-compétences) est
// posée, les banques restent à écrire, notion par notion. Tant que ce tableau
// est vide, la classe n'est branchée ni au coach ni aux pages programme : on
// n'annonce pas ce qui n'a rien derrière.
//
// ─────────────────────────────────────────────────────────────────────────────
// À QUI ON ÉCRIT (Frédéric, 14/08/2026)
//
// Ces élèves n'ont pas pris la spécialité, et pour beaucoup d'entre eux les
// maths se sont mal passées jusqu'ici. Ce n'est pas une raison pour baisser le
// niveau — le programme est le programme — mais ça décide de la FORME :
//
//   · un GRAPHIQUE ou un TABLEAU dès qu'une question peut en porter un. On lit
//     avant de calculer ; une valeur relevée soi-même sur une courbe est une
//     prise, une valeur donnée dans un énoncé n'est qu'un nombre de plus ;
//   · des SITUATIONS CONCRÈTES, jamais « soit f(x) = 2x² − 3x + 1 » tout seul :
//     un prix, une population, un capital, des adhérents, une substance dans le
//     sang. Le programme fournit lui-même ces situations, elles sont rangées
//     par notion dans knowledge/maths/premiere/situations.ts ;
//   · le MAXIMUM de générateurs — et ce programme s'y prête presque partout.
//
// Canvas disponibles et déjà utilisés ici : `fonctionGraphique` (nuage de
// points d'une suite, courbe d'évolution, droite), `tableau_donnees` (tableau
// croisé à double entrée), `arbre_proba` (arbre pondéré, branche effaçable).
// ─────────────────────────────────────────────────────────────────────────────
//
// EN ÉCRIVANT : DES GÉNÉRATEURS, PAS DES ITEMS FIGÉS (rappel de Frédéric)
//
//   template → tout ce qui se calcule. Un générateur bat dix items figés :
//              il ne s'épuise pas, l'élève peut refaire la notion en boucle.
//   fixed    → réservé aux PIÈGES, à ce qui ne se paramètre pas : une baisse
//              de 10 % suivie d'une hausse de 10 % ne ramène pas au prix
//              initial ; P_A(B) confondu avec P_B(A) sur un test médical ;
//              « ils sont indépendants » quand ils sont incompatibles.
//
// Cette classe s'y prête particulièrement : taux d'évolution, termes d'une
// suite, dérivée d'un polynôme, racines d'une forme factorisée, fréquences
// dans un tableau croisé — tout cela se génère.
//
// ⛔ Deux interdits du programme, à tenir dans CHAQUE item :
//    pas de discriminant (racines par la forme factorisée seulement) ;
//    suites géométriques à termes strictement positifs.
// ─────────────────────────────────────────────────────────────────────────────

import { evolutionsBank } from "./evolutions.bank";
import { lectureGraphiqueBank } from "./lecture-graphique.bank";
import { suitesArithmetiquesBank } from "./suites-arithmetiques.bank";
import { fonctionsAffinesBank } from "./fonctions-affines.bank";
import { suitesGeometriquesBank } from "./suites-geometriques.bank";
import { fonctionExponentielleBank } from "./fonction-exponentielle.bank";
import { ajustementAffineBank } from "./ajustement-affine.bank";
import { informationChiffreeBank } from "./information-chiffree.bank";
import { deriveeLectureBank } from "./derivee-lecture.bank";
import { deriveeCalculBank } from "./derivee-calcul.bank";
import { paraboleBank } from "./parabole.bank";
import { probabilitesConditionnellesBank } from "./probabilites-conditionnelles.bank";
import { arbresPonderesBank } from "./arbres-ponderes.bank";

export const mathsPremiereQuestionBank: TutorBankItemV4[] = [
  // === AUTOMATISMES ===
  ...evolutionsBank, // coefficient multiplicateur · taux d'évolution
  ...lectureGraphiqueBank, // lire · résoudre graphiquement · droites
  // === VARIATION LINÉAIRE ===
  ...suitesArithmetiquesBank, // suite arithmétique · terme général
  ...fonctionsAffinesBank, // fonction affine · lecture · modéliser · seuil
  // === VARIATION EXPONENTIELLE ===
  ...suitesGeometriquesBank, // suite géométrique · terme général
  ...fonctionExponentielleBank, // fonction a^x · taux moyen · modéliser · seuil
  // === ANALYSE DE L'INFORMATION CHIFFRÉE ===
  ...informationChiffreeBank, // tableau croisé · fréquences · diagrammes · tableur · filtres
  ...ajustementAffineBank, // nuage · point moyen · ajustement · interpoler
  // === PHÉNOMÈNES ALÉATOIRES ===
  ...probabilitesConditionnellesBank, // conditionnelle · calcul · indépendance
  ...arbresPonderesBank, // arbre pondéré · calcul sur l'arbre
  // === MODÉLISATION QUADRATIQUE ===
  ...paraboleBank, // parabole · sommet et axe · variations · racines et signe
  // === DÉRIVATION ===
  ...deriveeLectureBank, // lire un graphique · nombre dérivé et tangente
  ...deriveeCalculBank, // formules · polynômes · signe · variations
];

export function getMathsPremiereQuestionBank(args?: {
  notionId?: string | null;
  microId?: string | null;
}): TutorBankItemV4[] {
  let bank = mathsPremiereQuestionBank;
  if (args?.notionId) bank = bank.filter((i) => i.notionId === args.notionId);
  if (args?.microId) bank = bank.filter((i) => i.microId === args.microId);
  return bank;
}
