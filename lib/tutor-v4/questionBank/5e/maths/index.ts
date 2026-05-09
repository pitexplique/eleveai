// lib/tutor-v4/questionBank/5e/maths/index.ts

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

import { nombresRelatifsBank } from "./nombres-relatifs.bank";
import { proportionnaliteBank } from "./proportionnalite.bank";
import { fractionsBank } from "./fractions.bank";
import { operationsRelatifsBank } from "./operations-relatifs.bank.ts";
import { calculLitteralBank } from "./calcul-litteral.bank";
import { statistiquesBank } from "./statistiques.bank";
import { probabilitesBank } from "./probabilites.bank";
import { anglesBank } from "./angles.bank";
import { trianglesBank } from "./triangles.bank";
import { symetrieCentraleBank} from "./symetrie_centrale.bank"
import { volumesBank } from "./volumes.bank";
import { airesBank } from "./aires.bank";


export const maths5eQuestionBank: TutorBankItemV4[] = [
  ...nombresRelatifsBank,
  ...proportionnaliteBank,
  ...fractionsBank,
  ...operationsRelatifsBank,
  ...calculLitteralBank,
  ...statistiquesBank,
  ...probabilitesBank,
  ...anglesBank,
  ...trianglesBank,
  ...symetrieCentraleBank,
  ...volumesBank,
  ...airesBank

];

export function getMaths5eQuestionBank(args?: {
  notionId?: string | null;
  microId?: string | null;
}): TutorBankItemV4[] {
  let bank = maths5eQuestionBank;

  if (args?.notionId) {
    bank = bank.filter((item) => item.notionId === args.notionId);
  }

  if (args?.microId) {
    bank = bank.filter((item) => item.microId === args.microId);
  }

  return bank;
}