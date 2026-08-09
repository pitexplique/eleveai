import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { microSkills } from "@/lib/tutor-v4/knowledge/maths/ce1/microSkills";
import { buildCycle2QuestionBank } from "@/lib/tutor-v4/questionBank/cycle2/maths/buildCycle2Bank";
import { applyMathsKeyboardFree } from "../../mathsKeyboardFreeTransform";

import { longueurBank } from "./longueur.bank";
import { masseBank } from "./masse.bank";
import { monnaieBank } from "./monnaie.bank";
import { dureeBank } from "./duree.bank";
import { nombresEntiersBank } from "./nombres-entiers.bank";

// ⏳ LE CE1 SORT DU CONSTRUCTEUR COMMUN — chantier ouvert le 09/08/2026.
//
// `buildCycle2QuestionBank` aiguille sur la NOTION, jamais sur la
// micro-compétence. Mesuré ce jour-là en le faisant tourner : 92
// micro-compétences sur 92 recevaient un énoncé partagé. « Un ruban mesure
// 25 cm. On ajoute 22 cm… » servait à 21 micros réparties sur cinq notions —
// contenance, durée, longueur, masse, monnaie. Le cas qui résume tout :
//
//     ce1_monnaie_constituer → « Un ruban mesure 61 cm. On ajoute 21 cm.
//                               Quelle est sa nouvelle longueur ? »
//
// Ce n'est pas une approximation, c'est hors sujet.
//
// Le mécanisme est celui du CE2. Chaque banque écrite à la main fait reculer le
// repli micro par micro : ce que `BANQUES_ECRITES` couvre est retiré de ce que
// le constructeur fabrique. On n'arrache rien d'avance — mieux vaut une
// question approximative que pas de question du tout.
//
// Pour ajouter une notion : écrire son fichier `<notion>.bank.ts`, l'importer,
// l'ajouter à BANQUES_ECRITES. Le repli s'efface tout seul pour ce qu'elle
// couvre.
const BANQUES_ECRITES: TutorBankItemV4[] = [
  ...longueurBank,
  ...masseBank,
  ...monnaieBank,
  ...dureeBank,
  ...nombresEntiersBank,
];

const MICROS_COUVERTES = new Set(BANQUES_ECRITES.map((item) => item.microId));

const REPLI = buildCycle2QuestionBank("ce1", microSkills).filter(
  (item) => !MICROS_COUVERTES.has(item.microId),
);

// Pas de clavier au CE1 : on clique. Même règle qu'au CM1, où le principal
// l'avait demandée parce que les élèves tapent trop lentement. Mesuré avant de
// brancher : les 276 items restent, 111 d'entre eux passent d'une réponse à
// taper à une réponse à cliquer, aucun n'est perdu.
// ⚠️ Conséquence pour qui écrit les banques qui manquent : une question
// `format: "open"` est RETIRÉE par cette transformation, sauf si elle demande
// « quelle opération choisir ». Au cycle 2, on écrit donc des QCM et des
// réponses courtes numériques — pas de rédaction.
export const mathsCe1QuestionBank: TutorBankItemV4[] = applyMathsKeyboardFree([
  ...BANQUES_ECRITES,
  ...REPLI,
]);

/** Micro-compétences qui attendent encore leur banque écrite à la main. */
export const microsCe1SansBanque: string[] = microSkills
  .map((m) => m.id)
  .filter((id) => !MICROS_COUVERTES.has(id));

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
