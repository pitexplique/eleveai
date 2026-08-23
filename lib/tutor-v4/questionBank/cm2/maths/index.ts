import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { applyMathsKeyboardFree } from "../../mathsKeyboardFreeTransform";

import { proportionnaliteBank } from "./proportionnalite.bank";
import { algebreBank } from "./algebre.bank";
import { nombresDecimauxBank } from "./nombres-decimaux.bank";
import { suitesBank } from "./suites.bank";
import { multiplicationBank } from "./multiplication.bank";
import { divisionBank } from "./division.bank";
import { nombresEntiersBank } from "./nombres-entiers.bank";
import { fractionsBank } from "./fractions.bank";
import { fractionsSuperieuresBank } from "./fractions-superieures.bank";
import { fractionsCalculCm2Bank } from "./fractions-calcul.bank";
import { calculBank } from "./calcul.bank";
import { problemeBank } from "./probleme.bank";
import { pourcentagesBank } from "./pourcentages.bank";
import { longueursBank } from "./longueurs.bank";
import { perimetresBank } from "./perimetres.bank";
import { airesBank } from "./aires.bank";
import { dureesBank } from "./durees.bank";
import { anglesBank } from "./angles.bank";
import { reperageBank } from "./reperage.bank";
import { droitesBank } from "./droites.bank";
import { tableauxBank } from "./tableaux.bank";
import { graphiquesBank } from "./graphiques.bank";
import { probabilitesBank } from "./probabilites.bank";
import { figuresPlanesBank } from "./figures-planes.bank";
import { symetrieBank } from "./symetrie.bank";
import { solidesBank } from "./solides.bank";
import { algorithmiqueBank } from "./algorithmique.bank";
import { massesBank} from "./masses.bank"

import { contenancesBank} from "./contenance.bank"
// ⚠️ OUBLIÉE JUSQU'AU 11/08. Le fichier existait, ses 65 items portaient bien
// `notionId: "echelle"`, la notion est déclarée dans le knowledge — mais la
// banque n'était importée nulle part. Autrement dit : aucune question
// d'échelle n'a jamais été servie, ni dans le coach, ni dans les épreuves.
// Trouvée en cherchant pourquoi la tranche « résolution de problèmes » de
// grandeurs et mesures s'épuisait au cinquième passage.
import { echellesBank } from "./echelles.bank";
// Les 7 micro-compétences que l'audit avait trouvées vides (01/08) — quatre
// sur les fractions, deux sur les figures planes, une sur les probabilités.
// Voir scripts/auditer-banque.mjs.
import { complementsEvalNationaleBank } from "./complements-eval-nationale.bank";

// Zéro clavier en CM2 : short numériques -> QCM, et open « Explique… » retirées
// (cf. applyMathsKeyboardFree). Appliqué à TOUTES les banques maths CM2.
export const mathsCm2QuestionBank: TutorBankItemV4[] = [
  ...applyMathsKeyboardFree(proportionnaliteBank),
  ...applyMathsKeyboardFree(algebreBank),
  ...applyMathsKeyboardFree(nombresDecimauxBank),
  ...applyMathsKeyboardFree(suitesBank),
  ...applyMathsKeyboardFree(multiplicationBank),
  ...applyMathsKeyboardFree(divisionBank),
  ...applyMathsKeyboardFree(nombresEntiersBank),
  ...applyMathsKeyboardFree(fractionsBank),
  ...applyMathsKeyboardFree(fractionsSuperieuresBank),
  ...applyMathsKeyboardFree(fractionsCalculCm2Bank),
  ...applyMathsKeyboardFree(algorithmiqueBank),
  ...applyMathsKeyboardFree(calculBank),
  ...applyMathsKeyboardFree(problemeBank),
  ...applyMathsKeyboardFree(pourcentagesBank),
  ...applyMathsKeyboardFree(longueursBank),
  ...applyMathsKeyboardFree(perimetresBank),
  ...applyMathsKeyboardFree(airesBank),
  ...applyMathsKeyboardFree(dureesBank),
  ...applyMathsKeyboardFree(anglesBank),
  ...applyMathsKeyboardFree(reperageBank),
  ...applyMathsKeyboardFree(droitesBank),
  ...applyMathsKeyboardFree(tableauxBank),
  ...applyMathsKeyboardFree(graphiquesBank),
  ...applyMathsKeyboardFree(probabilitesBank),

  ...applyMathsKeyboardFree(figuresPlanesBank),
  ...applyMathsKeyboardFree(symetrieBank),
  ...applyMathsKeyboardFree(solidesBank),

  ...applyMathsKeyboardFree(massesBank),
  ...applyMathsKeyboardFree(contenancesBank),
  ...applyMathsKeyboardFree(echellesBank),

  ...applyMathsKeyboardFree(complementsEvalNationaleBank),
];

export function getMathCm2QuestionBank(args?: {
  notionId?: string | null;
  microId?: string | null;
}): TutorBankItemV4[] {
  let bank = mathsCm2QuestionBank;

  if (args?.notionId) {
    bank = bank.filter((item) => item.notionId === args.notionId);
  }

  if (args?.microId) {
    bank = bank.filter((item) => item.microId === args.microId);
  }

  return bank;
}