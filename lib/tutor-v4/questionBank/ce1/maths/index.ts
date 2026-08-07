import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { microSkills } from "@/lib/tutor-v4/knowledge/maths/ce1/microSkills";
import { buildCycle2QuestionBank } from "@/lib/tutor-v4/questionBank/cycle2/maths/buildCycle2Bank";
import { applyMathsKeyboardFree } from "../../mathsKeyboardFreeTransform";

// Pas de clavier au CE1 : on clique. Même règle qu'au CM1, où le principal
// l'avait demandée parce que les élèves tapent trop lentement. Mesuré avant de
// brancher : les 276 items restent, 111 d'entre eux passent d'une réponse à
// taper à une réponse à cliquer, aucun n'est perdu.
export const mathsCe1QuestionBank: TutorBankItemV4[] = applyMathsKeyboardFree(
  buildCycle2QuestionBank("ce1", microSkills),
);

export function getMathCe1QuestionBank(args?: {
  notionId?: string | null;
  microId?: string | null;
}): TutorBankItemV4[] {
  let bank = mathsCe1QuestionBank;

  if (args?.notionId) {
    bank = bank.filter((item) => item.notionId === args.notionId);
  }

  if (args?.microId) {
    bank = bank.filter((item) => item.microId === args.microId);
  }

  return bank;
}
