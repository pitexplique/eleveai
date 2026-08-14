// lib/tutor-v4/questionBank/seconde/francais/index.ts
//
// LA BANQUE DE FRANÇAIS DE SECONDE.
//
// ⚠️ ÉTAT AU 14/08/2026 : la GRAMMAIRE est écrite (5 notions, 29 micros).
// Les onze autres notions déclarées dans
// `knowledge/francais/seconde/microSkills.ts` — lexique, expression, poésie,
// littérature d'idées et presse, roman, théâtre — n'ont PAS encore de banque.
//
// ⛔ CE N'EST PAS UN BUG SILENCIEUX, ET C'EST VOULU. Contrairement au cycle 4,
// AUCUN REPLI GÉNÉRIQUE N'EXISTE AU LYCÉE : `buildCycle4FrancaisBank` ne
// couvre que 5e|4e|3e. Une micro sans banque renvoie donc un tableau vide au
// lieu de servir du hors-sujet — c'est le piège du CM2, retourné à notre
// avantage. La porte élève reste fermée (`lib/programme.ts`, la seconde n'a que
// « maths » dans ses matières) tant que tout n'est pas écrit.
//
// ⚠️ Ne JAMAIS ouvrir cette porte avant d'avoir mesuré la couverture à
// l'exécution : charger `microSkills` et cet index, compter par `microId`, et
// lister les micros à zéro item.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

// --- Étude de la langue : grammaire (les 4 points « dès la seconde ») ---
import { accordsSecondeBank } from "./accords.bank";
import { verbeValeursSecondeBank } from "./verbe-valeurs.bank";
import { concordanceTempsSecondeBank } from "./concordance-temps.bank";
import { phraseComplexeSecondeBank } from "./phrase-complexe.bank";
import { relativesSecondeBank } from "./relatives.bank";

export const francaisSecondeQuestionBank: TutorBankItemV4[] = [
  // === ÉTUDE DE LA LANGUE : GRAMMAIRE (BO2DEFRG) ===
  ...accordsSecondeBank,
  ...verbeValeursSecondeBank,
  ...concordanceTempsSecondeBank,
  ...phraseComplexeSecondeBank,
  ...relativesSecondeBank,
];

export function getFrancaisSecondeQuestionBank(args?: {
  notionId?: string | null;
  microId?: string | null;
}): TutorBankItemV4[] {
  let bank = francaisSecondeQuestionBank;

  if (args?.notionId) {
    bank = bank.filter((item) => item.notionId === args.notionId);
  }

  if (args?.microId) {
    bank = bank.filter((item) => item.microId === args.microId);
  }

  return bank;
}
