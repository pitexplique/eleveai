import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { microSkills } from "@/lib/tutor-v4/knowledge/francais/ce2/microSkills";
import { buildCycle2FrancaisBank } from "@/lib/tutor-v4/questionBank/cycle2/francais/buildCycle2FrancaisBank";

import { conjugaisonBank } from "./conjugaison.bank";

// LE CE2 SORT DU CONSTRUCTEUR COMMUN — chantier ouvert le 10/08/2026, sur le
// modèle du CP (`cp/francais/index.ts`, 09-10/08).
//
// L'ÉTAT DE DÉPART, mesuré en exécutant les générateurs, pas en les lisant :
// 120 micro-compétences, 150 items de repli, et **41 énoncés différents**. Le
// chiffre le plus bas de tout le coach. À nombre égal de micro-compétences et
// d'items, le CM2 en produit 1 990.
//
// `buildCycle2FrancaisBank` aiguille sur la NOTION, jamais sur la
// micro-compétence, et son paramètre de niveau s'appelle `_level` : aucun
// générateur ne s'en sert. Vingt-cinq énoncés sont servis à l'identique au CP,
// au CE1 et au CE2 — le repli ne sait pas quel âge a l'enfant en face.
//
// Six micro-compétences de classes de mots recevaient le même « Quel mot est un
// nom commun ? ». Et `ce2_flue_mots_irreguliers` — « Lire rapidement des mots
// fréquents et irréguliers » — servait
//
//     « Parmi ces syllabes, laquelle commence par la lettre b ? »
//
// une question de CP à laquelle, deux fois sur trois, aucune proposition ne
// répond.
//
// Chaque banque écrite fait reculer le repli d'autant de micro-compétences. On
// n'arrache rien : mieux vaut une question approximative que pas de question.
// Quand `microsCe2FrancaisSansBanque` sera vide, le repli sera à zéro — c'est
// l'objectif, celui que le CP a atteint.
//
// Pour ajouter une notion : écrire `<notion>.bank.ts`, l'importer, l'ajouter à
// BANQUES_ECRITES. Le repli s'efface tout seul pour ce qu'elle couvre.
const BANQUES_ECRITES: TutorBankItemV4[] = [...conjugaisonBank];

const MICROS_COUVERTES = new Set(BANQUES_ECRITES.map((item) => item.microId));

const REPLI = buildCycle2FrancaisBank("ce2", microSkills).filter(
  (item) => !MICROS_COUVERTES.has(item.microId),
);

export const francaisCe2QuestionBank: TutorBankItemV4[] = [
  ...BANQUES_ECRITES,
  ...REPLI,
];

/** Micro-compétences qui attendent encore leur banque écrite à la main. */
export const microsCe2FrancaisSansBanque: string[] = microSkills
  .map((m) => m.id)
  .filter((id) => !MICROS_COUVERTES.has(id));

export function getFrancaisCe2QuestionBank(args?: {
  notionId?: string | null;
  microId?: string | null;
}): TutorBankItemV4[] {
  let bank = francaisCe2QuestionBank;

  if (args?.notionId) {
    bank = bank.filter((item) => item.notionId === args.notionId);
  }

  if (args?.microId) {
    bank = bank.filter((item) => item.microId === args.microId);
  }

  return bank;
}
