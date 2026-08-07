import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { microSkills } from "@/lib/tutor-v4/knowledge/maths/cp/microSkills";
import { buildCycle2QuestionBank } from "@/lib/tutor-v4/questionBank/cycle2/maths/buildCycle2Bank";
import { applyMathsKeyboardFree } from "../../mathsKeyboardFreeTransform";

// Pas de clavier au CP : on clique. Le principal l'avait demandé pour le CM1
// parce que les élèves tapent trop lentement — un CP tape moins vite encore, et
// il cherche ses chiffres un par un. Mesuré avant de brancher : les 186 items
// restent, 89 d'entre eux passent d'une réponse à taper à une réponse à
// cliquer, et aucun n'est perdu en route.
export const mathsCpQuestionBank: TutorBankItemV4[] = applyMathsKeyboardFree(
  buildCycle2QuestionBank("cp", microSkills),
);

export function getMathCpQuestionBank(args?: {
  notionId?: string | null;
  microId?: string | null;
}): TutorBankItemV4[] {
  let bank = mathsCpQuestionBank;

  if (args?.notionId) {
    bank = bank.filter((item) => item.notionId === args.notionId);
  }

  if (args?.microId) {
    bank = bank.filter((item) => item.microId === args.microId);
  }

  return bank;
}
