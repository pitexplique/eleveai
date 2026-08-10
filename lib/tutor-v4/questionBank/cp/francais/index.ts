import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { microSkills } from "@/lib/tutor-v4/knowledge/francais/cp/microSkills";
import { buildCycle2FrancaisBank } from "@/lib/tutor-v4/questionBank/cycle2/francais/buildCycle2FrancaisBank";

import { consciencePhonologiqueBank } from "./conscience-phonologique.bank";
import { lectureSyllabiqueBank } from "./lecture-syllabique.bank";
import { graphemePhonemeBank } from "./grapheme-phoneme.bank";
import { orthographeLexicaleBank } from "./orthographe-lexicale.bank";
import { conjugaisonBank } from "./conjugaison.bank";
import { grammairePhraseBank } from "./grammaire-phrase.bank";
import { orthographeBank } from "./orthographe.bank";
import { comprehensionLectureBank } from "./comprehension-lecture.bank";

// LE CP SORT DU CONSTRUCTEUR COMMUN — chantier ouvert le 09/08/2026.
//
// `buildCycle2FrancaisBank` aiguille sur la NOTION, jamais sur la
// micro-compétence, et son paramètre de niveau s'appelle `_level` : aucun
// générateur ne s'en sert. Mesuré en l'exécutant, 400 tirages par item :
// 138 questions pour **57 énoncés différents**, dont 25 servis à l'identique
// au CP, au CE1 et au CE2. À nombre égal de micro-compétences et d'items, le
// CM1 en sort 1 998.
//
// Les six micro-compétences de conscience phonologique recevaient les deux
// mêmes questions : compter les syllabes, et « est-ce que chat et rat
// riment ? ». « Identifier un son dans un mot » ne demandait jamais
// d'identifier un son. Et `cp_lec_syllabes_cv` servait
//
//     « Parmi ces syllabes, laquelle commence par la lettre b ? »
//
// avec `expected: ["ba"]` en dur, alors que deux jeux de syllabes sur trois
// sont `ro/no/lo` et `fi/si/di` : deux fois sur trois, aucune proposition ne
// répondait à la question.
//
// Chaque banque écrite fait reculer le repli d'autant de micro-compétences.
// On n'arrache rien : mieux vaut une question approximative que pas de
// question. Quand `microsCpFrancaisSansBanque` sera vide, le repli sera à
// zéro — c'est l'objectif, comme pour le CP de maths.
//
// Pour ajouter une notion : écrire `<notion>.bank.ts`, l'importer, l'ajouter à
// BANQUES_ECRITES. Le repli s'efface tout seul pour ce qu'elle couvre.
const BANQUES_ECRITES: TutorBankItemV4[] = [
  ...consciencePhonologiqueBank,
  ...lectureSyllabiqueBank,
  ...graphemePhonemeBank,
  ...orthographeLexicaleBank,
  ...conjugaisonBank,
  ...grammairePhraseBank,
  ...orthographeBank,
  ...comprehensionLectureBank,
];

const MICROS_COUVERTES = new Set(BANQUES_ECRITES.map((item) => item.microId));

const REPLI = buildCycle2FrancaisBank("cp", microSkills).filter(
  (item) => !MICROS_COUVERTES.has(item.microId),
);

export const francaisCpQuestionBank: TutorBankItemV4[] = [
  ...BANQUES_ECRITES,
  ...REPLI,
];

/** Micro-compétences qui attendent encore leur banque écrite à la main. */
export const microsCpFrancaisSansBanque: string[] = microSkills
  .map((m) => m.id)
  .filter((id) => !MICROS_COUVERTES.has(id));

export function getFrancaisCpQuestionBank(args?: {
  notionId?: string | null;
  microId?: string | null;
}): TutorBankItemV4[] {
  let bank = francaisCpQuestionBank;

  if (args?.notionId) {
    bank = bank.filter((item) => item.notionId === args.notionId);
  }

  if (args?.microId) {
    bank = bank.filter((item) => item.microId === args.microId);
  }

  return bank;
}
