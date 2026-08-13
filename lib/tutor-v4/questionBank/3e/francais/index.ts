import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { microSkills } from "@/lib/tutor-v4/knowledge/francais/3e/microSkills";
import { buildCycle4FrancaisBank } from "@/lib/tutor-v4/questionBank/cycle4/francais/buildCycle4FrancaisBank";
import { francais3eFixedBank } from "@/lib/tutor-v4/questionBank/3e/francais/fixed.bank";
// Enrichissement des pools d'étude de la langue (01/08) : le builder cycle 4
// ne produisait que 7 énoncés par micro-compétence, contre 32 en cycle 3.
import { complementsEtudeLangue3eBank } from "@/lib/tutor-v4/questionBank/3e/francais/complements-etude-langue.bank";
// « Fonctionnement de la phrase complexe » : section entière du programme de
// cycle 4 encore en vigueur pour la 3e, et la notion n'existait pas — alors que
// le CM2 et la 6e en ont une.
import { phraseComplexe3eBank } from "@/lib/tutor-v4/questionBank/3e/francais/phrase-complexe.bank";
// Les chaines d'accord que le programme énumère, et qu'aucune notion ne portait.
import { orthographeGrammaticale3eBank } from "@/lib/tutor-v4/questionBank/3e/francais/orthographe-grammaticale.bank";
// ⚠️ Dans le programme de la 3e, le conditionnel est un MODE — l'inverse de la
// 5e. Voir l'en-tête du fichier : les deux banques ont raison chacune pour sa
// classe, il ne faut pas les « harmoniser ».
import { conjugaison3eBank } from "@/lib/tutor-v4/questionBank/3e/francais/conjugaison.bank";

// Banque du coach = gabarits générés (variété) + couche "fixed" imprimable
// (≥5 QCM fixes par notion). La couche "fixed" enrichit le coach ET sert de
// source aux tests du guide de survie (testDeSurvie ne garde que les "fixed").
export const francais3eQuestionBank: TutorBankItemV4[] = [
  ...buildCycle4FrancaisBank("3e", microSkills),
  ...francais3eFixedBank,
  ...complementsEtudeLangue3eBank,
  ...phraseComplexe3eBank,
  ...orthographeGrammaticale3eBank,
  ...conjugaison3eBank,
];

export function getFrancais3eQuestionBank(args?: {
  notionId?: string | null;
  microId?: string | null;
}): TutorBankItemV4[] {
  let bank = francais3eQuestionBank;
  if (args?.notionId) bank = bank.filter((item) => item.notionId === args.notionId);
  if (args?.microId) bank = bank.filter((item) => item.microId === args.microId);
  return bank;
}
