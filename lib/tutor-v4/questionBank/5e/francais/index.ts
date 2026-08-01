import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { microSkills } from "@/lib/tutor-v4/knowledge/francais/5e/microSkills";
import { buildCycle4FrancaisBank } from "@/lib/tutor-v4/questionBank/cycle4/francais/buildCycle4FrancaisBank";
import { francais5eFixedBank } from "@/lib/tutor-v4/questionBank/5e/francais/fixed.bank";
// Enrichissement des pools d'étude de la langue (01/08) : le builder cycle 4
// ne produisait que 7 énoncés par micro-compétence, contre 32 en cycle 3, et
// ce sont ces notions qui alimentent 15 des 20 questions de l'épreuve blanche.
import { complementsEtudeLangue5eBank } from "@/lib/tutor-v4/questionBank/5e/francais/complements-etude-langue.bank";

// Banque du coach = gabarits générés (variété) + couche "fixed" imprimable
// (≥5 QCM fixes par notion). La couche "fixed" enrichit le coach ET sert de
// source aux tests du guide de survie (testDeSurvie ne garde que les "fixed").
export const francais5eQuestionBank: TutorBankItemV4[] = [
  ...buildCycle4FrancaisBank("5e", microSkills),
  ...francais5eFixedBank,
  ...complementsEtudeLangue5eBank,
];

export function getFrancais5eQuestionBank(args?: {
  notionId?: string | null;
  microId?: string | null;
}): TutorBankItemV4[] {
  let bank = francais5eQuestionBank;
  if (args?.notionId) bank = bank.filter((item) => item.notionId === args.notionId);
  if (args?.microId) bank = bank.filter((item) => item.microId === args.microId);
  return bank;
}
