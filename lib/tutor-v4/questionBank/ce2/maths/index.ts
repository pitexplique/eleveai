import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { microSkills } from "@/lib/tutor-v4/knowledge/maths/ce2/microSkills";
import { buildCycle2QuestionBank } from "@/lib/tutor-v4/questionBank/cycle2/maths/buildCycle2Bank";

import { nombresEntiersBank } from "./nombres-entiers.bank";
import { calculBank } from "./calcul.bank";

// Le CE2 quitte le constructeur commun, une notion à la fois.
//
// `buildCycle2QuestionBank` aiguille sur la NOTION, jamais sur la
// micro-compétence : les six notions de mesure y partagent une seule fonction,
// les cinq notions de géométrie une autre. Mesuré le 05/08/2026, cela donnait
// « Calculer un rendu de monnaie » → « Un ruban mesure 117 cm… », et les
// vingt et une micro-compétences de géométrie servaient toutes « Combien de
// côtés a un triangle ? ». On écrit donc de vraies banques, comme en CM1 et en
// CM2, et on ne garde le constructeur que pour ce qui n'est pas encore écrit —
// mieux vaut une question approximative que pas de question du tout.
//
// À chaque banque ajoutée : l'importer, l'ajouter à BANQUES_ECRITES. Le repli
// disparaît tout seul pour les micro-compétences qu'elle couvre.
const BANQUES_ECRITES: TutorBankItemV4[] = [
  ...nombresEntiersBank,
  ...calculBank,
];

const MICROS_COUVERTES = new Set(BANQUES_ECRITES.map((item) => item.microId));

const REPLI = buildCycle2QuestionBank("ce2", microSkills).filter(
  (item) => !MICROS_COUVERTES.has(item.microId),
);

export const mathsCe2QuestionBank: TutorBankItemV4[] = [
  ...BANQUES_ECRITES,
  ...REPLI,
];

/** Micro-compétences qui attendent encore leur banque écrite à la main. */
export const microsCe2SansBanque: string[] = microSkills
  .map((m) => m.id)
  .filter((id) => !MICROS_COUVERTES.has(id));

export function getMathCe2QuestionBank(args?: {
  notionId?: string | null;
  microId?: string | null;
}): TutorBankItemV4[] {
  let bank = mathsCe2QuestionBank;

  if (args?.notionId) {
    bank = bank.filter((item) => item.notionId === args.notionId);
  }

  if (args?.microId) {
    bank = bank.filter((item) => item.microId === args.microId);
  }

  return bank;
}
