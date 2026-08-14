// lib/tutor-v4/questionBank/seconde/francais/index.ts
//
// LA BANQUE DE FRANÇAIS DE SECONDE.
//
// ⚠️ ÉTAT AU 14/08/2026 : la GRAMMAIRE est écrite (5 notions, 29 micros).
// Les onze autres notions déclarées dans
// `knowledge/francais/seconde/microSkills.ts` — lexique, expression, poésie,
// littérature d'idées et presse, roman, théâtre — n'ont PAS encore de banque.
//
// ⚠️ RECTIFICATION DU 14/08 — la version précédente de cet en-tête affirmait
// qu'« AUCUN REPLI GÉNÉRIQUE N'EXISTE AU LYCÉE ». C'est vrai DE LA BANQUE et
// c'était FAUX DU KNOWLEDGE, ce qui rassurait à tort :
//   — côté BANQUE, c'est exact : `buildCycle4FrancaisBank` ne couvre que
//     5e|4e|3e, donc une micro sans items rend un tableau vide, jamais du
//     hors-sujet. C'est le piège du CM2, retourné à notre avantage ;
//   — côté KNOWLEDGE, c'était faux : `lib/tutor-v4/catalog.ts` finissait sur
//     `default: return buildKnowledgeCe1Francais()`. La seconde y était absente
//     et recevait les 125 micros du CE1, EN SILENCE. Corrigé le 14/08.
// ⭐ La leçon vaut au-delà : il y a DEUX registres de knowledge —
// `loaders/loadKnowledgeV4.ts` ET `catalog.ts` — et n'en brancher qu'un ne lève
// aucune erreur. Le second est celui qu'utilise `TutorV4Client`.
//
// La porte élève reste fermée (`lib/programme.ts`, la seconde n'a que « maths »
// dans ses matières) tant que tout n'est pas écrit.
//
// ⚠️ Ne JAMAIS ouvrir cette porte avant d'avoir mesuré la couverture à
// l'exécution : charger `microSkills` et cet index, compter par `microId`, et
// lister les micros à zéro item.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

// --- Étude de la langue : grammaire (les 4 points « dès la seconde ») ---
import { accordsSecondeBank } from "./accords.bank";
import { verbeValeursSecondeBank } from "./verbe-valeurs.bank";
import { concordanceTempsSecondeBank } from "./concordance-temps.bank";
import { phraseComplexeSecondeBank } from "./phrase-complexe.bank";
import { relativesSecondeBank } from "./relatives.bank";

// --- Étude de la langue : lexique (2de ET 1re, dit le programme) ---
import { lexiqueSecondeBank } from "./lexique.bank";

// --- Expression écrite et orale ---
import { relationsLogiquesSecondeBank } from "./relations-logiques.bank";
import { methodeExercicesSecondeBank } from "./methode-exercices.bank";

// --- Objet d'étude : la poésie du Moyen Âge au XVIIIe siècle ---
import { poesieSecondeBank } from "./poesie.bank";

// --- Objet d'étude : la littérature d'idées et la presse ---
import { ideesPresseSecondeBank } from "./idees-presse.bank";

export const francaisSecondeQuestionBank: TutorBankItemV4[] = [
  // === ÉTUDE DE LA LANGUE : GRAMMAIRE (BO2DEFRG) ===
  ...accordsSecondeBank,
  ...verbeValeursSecondeBank,
  ...concordanceTempsSecondeBank,
  ...phraseComplexeSecondeBank,
  ...relativesSecondeBank,
  // === ÉTUDE DE LA LANGUE : LEXIQUE (BO2DEFRV) ===
  ...lexiqueSecondeBank,
  // === EXPRESSION ÉCRITE ET ORALE (BO2DEFRE) ===
  ...relationsLogiquesSecondeBank,
  ...methodeExercicesSecondeBank,
  // === LA POÉSIE DU MOYEN ÂGE AU XVIIIe SIÈCLE (BO2DEFRP) ===
  ...poesieSecondeBank,
  // === LA LITTÉRATURE D'IDÉES ET LA PRESSE (BO2DEFRI) ===
  ...ideesPresseSecondeBank,
];

export function getFrancaisSecondeQuestionBank(args?: {
  notionId?: string | null;
  microId?: string | null;
}): TutorBankItemV4[] {
  let bank = francaisSecondeQuestionBank;

  if (args?.notionId) {
    bank = bank.filter((item) => item.notionId === args.notionId);
  }

  if (args?.microId) {
    bank = bank.filter((item) => item.microId === args.microId);
  }

  return bank;
}
