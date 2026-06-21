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

// --- Anciennes banques groupées (provisoires, en cours de remplacement) ---
import { algorithmiqueSecondeBank } from "./algorithmique.bank";
import { fonctionsSecondeBank } from "./fonctions.bank";
import { geometrieSecondeBank } from "./geometrie.bank";
import { statistiquesProbabilitesSecondeBank } from "./statistiques-probabilites.bank";

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
  // === Domaines encore servis par les anciennes banques groupées (provisoires) ===
  ...geometrieSecondeBank,
  ...fonctionsSecondeBank,
  ...statistiquesProbabilitesSecondeBank,
  ...algorithmiqueSecondeBank,
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
