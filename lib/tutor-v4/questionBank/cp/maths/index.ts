import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { microSkills } from "@/lib/tutor-v4/knowledge/maths/cp/microSkills";
import { buildCycle2QuestionBank } from "@/lib/tutor-v4/questionBank/cycle2/maths/buildCycle2Bank";
import { applyMathsKeyboardFree } from "../../mathsKeyboardFreeTransform";

import { nombresEntiersBank } from "./nombres-entiers.bank";

// ⏳ LE CP SORT DU CONSTRUCTEUR COMMUN — chantier ouvert le 09/08/2026.
//
// `buildCycle2QuestionBank` aiguille sur la NOTION, jamais sur la
// micro-compétence. Mesuré ce jour-là en le faisant tourner sur le CP : les 62
// micro-compétences d'alors recevaient toutes un énoncé partagé, et il n'y
// avait en tout que DIX-HUIT énoncés différents pour 186 questions. Seize
// micro-compétences — longueur, masse, temps ET monnaie — servaient le même
// « Un ruban mesure 12 cm. On ajoute 11 cm… », et neuf autres « Combien de
// cotes a un triangle ? ». Le cas qui résume tout :
//
//     cp_monnaie_constituer → « Quelle unite convient le mieux pour mesurer
//                               la longueur d'un crayon ? »
//
// avec, parmi les propositions, le kilomètre et le litre — qui ne sont ni
// l'un ni l'autre au programme du CP.
//
// Le mécanisme est celui du CE2. Chaque banque écrite à la main fait reculer
// le repli micro par micro : ce que `BANQUES_ECRITES` couvre est retiré de ce
// que le constructeur fabrique. On n'arrache rien d'avance — mieux vaut une
// question approximative que pas de question du tout.
//
// Pour ajouter une notion : écrire son fichier `<notion>.bank.ts`, l'importer,
// l'ajouter à BANQUES_ECRITES. Le repli s'efface tout seul pour ce qu'elle
// couvre.
const BANQUES_ECRITES: TutorBankItemV4[] = [
  ...nombresEntiersBank,
];

const MICROS_COUVERTES = new Set(BANQUES_ECRITES.map((item) => item.microId));

const REPLI = buildCycle2QuestionBank("cp", microSkills).filter(
  (item) => !MICROS_COUVERTES.has(item.microId),
);

// Pas de clavier au CP : on clique. Le principal l'avait demandé pour le CM1
// parce que les élèves tapent trop lentement — un CP tape moins vite encore,
// et il cherche ses chiffres un par un.
// ⚠️ Conséquence pour qui écrit les banques qui manquent : une question
// `format: "open"` est RETIRÉE par cette transformation, sauf si elle demande
// « quelle opération choisir ». Au cycle 2, on écrit donc des QCM et des
// réponses courtes numériques — pas de rédaction.
export const mathsCpQuestionBank: TutorBankItemV4[] = applyMathsKeyboardFree([
  ...BANQUES_ECRITES,
  ...REPLI,
]);

/** Micro-compétences qui attendent encore leur banque écrite à la main. */
export const microsCpSansBanque: string[] = microSkills
  .map((m) => m.id)
  .filter((id) => !MICROS_COUVERTES.has(id));

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
