import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

// --- Banques par notion (standard terminale, ~10 items/micro) ---
import { reelsIntervallesBank } from "./reels-intervalles.bank";
import { arithmetiqueEntiersBank } from "./arithmetique-entiers.bank";
import { puissancesBank } from "./puissances.bank";
import { racineCarreeBank } from "./racine-carree.bank";
import { developpementFactorisationBank } from "./developpement-factorisation.bank";
import { identitesRemarquablesBank } from "./identites-remarquables.bank";
import { expressionsLitteralesBank } from "./expressions-litterales.bank";
import { equationsInequationsBank } from "./equations-inequations.bank";
import { repereCoordonneesBank } from "./repere-coordonnees.bank";
import { droitesPlanBank } from "./droites-plan.bank";
import { vecteursPlanBank } from "./vecteurs-plan.bank";
import { geometrieProblemesPlanBank } from "./geometrie-problemes-plan.bank";
import { fonctionVocabulaireBank } from "./fonction-vocabulaire.bank";
import { fonctionVariationsBank } from "./fonction-variations.bank";
import { fonctionsAffinesBank } from "./fonctions-affines.bank";
import { fonctionsReferenceBank } from "./fonctions-reference.bank";
import { informationChiffreeBank } from "./information-chiffree.bank";
import { statistiquesDescriptivesBank } from "./statistiques-descriptives.bank";
import { probabilitesBank } from "./probabilites.bank";
import { echantillonnageBank } from "./echantillonnage.bank";
import { algorithmiquePythonBank } from "./algorithmique-python.bank";
import { logiqueEnsemblesBank } from "./logique-ensembles.bank";

export const mathsSecondeQuestionBank: TutorBankItemV4[] = [
  // === Domaine NOMBRES ET CALCULS — entièrement refait (1 banque par notion) ===
  ...reelsIntervallesBank,
  ...arithmetiqueEntiersBank,
  ...puissancesBank,
  ...racineCarreeBank,
  ...developpementFactorisationBank,
  ...identitesRemarquablesBank,
  ...expressionsLitteralesBank,
  ...equationsInequationsBank,
  // === Domaine GEOMETRIE — en cours de refonte (1 banque par notion) ===
  ...repereCoordonneesBank,
  ...droitesPlanBank,
  ...vecteursPlanBank,
  ...geometrieProblemesPlanBank,
  // === Domaine FONCTIONS — en cours de refonte (1 banque par notion) ===
  ...fonctionVocabulaireBank,
  ...fonctionVariationsBank,
  ...fonctionsAffinesBank,
  ...fonctionsReferenceBank,
  // === Domaine STATS & PROBAS — en cours de refonte (1 banque par notion) ===
  ...informationChiffreeBank,
  ...statistiquesDescriptivesBank,
  ...probabilitesBank,
  ...echantillonnageBank,
  // === Domaine ALGORITHMIQUE — refait (1 banque par notion) ===
  ...algorithmiquePythonBank,
  // === Domaine VOCABULAIRE ENSEMBLISTE ET LOGIQUE ===
  ...logiqueEnsemblesBank,
];

export function getMathsSecondeQuestionBank(args?: {
  notionId?: string | null;
  microId?: string | null;
}): TutorBankItemV4[] {
  let bank = mathsSecondeQuestionBank;

  if (args?.notionId) {
    bank = bank.filter((item) => item.notionId === args.notionId);
  }

  if (args?.microId) {
    bank = bank.filter((item) => item.microId === args.microId);
  }

  return bank;
}
