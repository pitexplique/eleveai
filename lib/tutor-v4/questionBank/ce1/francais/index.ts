import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { microSkills } from "@/lib/tutor-v4/knowledge/francais/ce1/microSkills";
import { buildCycle2FrancaisBank } from "@/lib/tutor-v4/questionBank/cycle2/francais/buildCycle2FrancaisBank";

import { conjugaisonBank } from "./conjugaison.bank";

// LE CE1 SORT DU CONSTRUCTEUR COMMUN — chantier ouvert le 10/08/2026, après le
// CP, qui est le patron.
//
// `buildCycle2FrancaisBank` aiguille sur la NOTION, jamais sur la
// micro-compétence, et son paramètre de niveau s'appelle `_level` : aucun
// générateur ne s'en sert. Mesuré en l'exécutant, 400 tirages par item :
// 171 items pour **53 énoncés différents**, dont 25 servis à l'identique au CP,
// au CE1 et au CE2. À nombre égal d'items, le CM1 en sort 1 998.
//
// Les dix micro-compétences de conjugaison recevaient les mêmes douze
// questions : trois verbes, le seul présent, et « Conjugue le verbe manger au
// présent avec je » arrivait aussi bien sur « Reconnaître l'infinitif » que sur
// « Retrouver l'infinitif d'un verbe conjugué ». Et `ce1_flue_mots_connus`
// — « Lire des mots connus sans déchiffrer » — servait
//
//     « Parmi ces syllabes, laquelle commence par la lettre b ? »
//
// avec `expected: ["ba"]` en dur, alors que deux jeux de syllabes sur trois
// sont `ro/no/lo` et `fi/si/di` : deux fois sur trois, aucune proposition ne
// répondait à la question.
//
// Chaque banque écrite fait reculer le repli d'autant de micro-compétences.
// On n'arrache rien : mieux vaut une question approximative que pas de
// question. Quand `microsCe1FrancaisSansBanque` sera vide, le repli sera à
// zéro — c'est l'objectif, comme au CP.
//
// Pour ajouter une notion : écrire `<notion>.bank.ts`, l'importer, l'ajouter à
// BANQUES_ECRITES. Le repli s'efface tout seul pour ce qu'elle couvre.
const BANQUES_ECRITES: TutorBankItemV4[] = [
  ...conjugaisonBank,
];

const MICROS_COUVERTES = new Set(BANQUES_ECRITES.map((item) => item.microId));

const REPLI = buildCycle2FrancaisBank("ce1", microSkills).filter(
  (item) => !MICROS_COUVERTES.has(item.microId),
);

export const francaisCe1QuestionBank: TutorBankItemV4[] = [
  ...BANQUES_ECRITES,
  ...REPLI,
];

/** Micro-compétences qui attendent encore leur banque écrite à la main. */
export const microsCe1FrancaisSansBanque: string[] = microSkills
  .map((m) => m.id)
  .filter((id) => !MICROS_COUVERTES.has(id));

export function getFrancaisCe1QuestionBank(args?: {
  notionId?: string | null;
  microId?: string | null;
}): TutorBankItemV4[] {
  let bank = francaisCe1QuestionBank;

  if (args?.notionId) {
    bank = bank.filter((item) => item.notionId === args.notionId);
  }

  if (args?.microId) {
    bank = bank.filter((item) => item.microId === args.microId);
  }

  return bank;
}
