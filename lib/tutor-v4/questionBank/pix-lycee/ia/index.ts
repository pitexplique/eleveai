// Banque du coach IA — palier avancé et expert (lycée).
//
// Les questions ne sont pas réécrites ici : elles VIENNENT de `lib/pix-ia`,
// qui reste la source unique, partagée avec l'évaluation blanche
// `/eval-pix-ia`. Une question corrigée là-bas est corrigée ici le jour même.
// Ce fichier ne fait que traduire la forme Pix en item du moteur tutor-v4.
//
// ⚠️ CE QUE CETTE BANQUE N'EST PAS ENCORE. Les 206 questions Pix ont été
// écrites pour une ÉVALUATION : une question par compétence, posée une fois.
// Un coach, lui, demande de revenir sans retomber sur la même — il faut
// environ huit questions distinctes par savoir-faire, on en a deux de médiane.
// Le complément s'écrit domaine par domaine ; d'ici là, `verifierVivier()`
// dit exactement où ça manque, et la classe ne s'ouvre pas aux élèves sur les
// savoir-faire qui n'ont pas de quoi tenir une séance.

import { convertirQuestionsPix } from "@/lib/tutor-v4/questionBank/pix/depuisPixIa";
import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

export const iaPixLyceeQuestionBank: TutorBankItemV4[] =
  convertirQuestionsPix("lycee");

export function getIaPixLyceeQuestionBank(args?: {
  notionId?: string | null;
  microId?: string | null;
}): TutorBankItemV4[] {
  let bank = iaPixLyceeQuestionBank;

  if (args?.notionId) bank = bank.filter((item) => item.notionId === args.notionId);
  if (args?.microId) bank = bank.filter((item) => item.microId === args.microId);

  return bank;
}
