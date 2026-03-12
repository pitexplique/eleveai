/**
 * questionPairBuilder.ts
 *
 * Construit une paire de questions à partir de la questionBank existante.
 * Ne contient aucune question en dur.
 */

import { randomUUID } from "crypto";
import type { BankItem } from "@/lib/tutor/types";
import type {
  ComparatorName,
  QuestionFormat,
  QuestionTheme,
  StarLevel,
  TutorQuestionOption,
  TutorQuestionPair,
} from "@/lib/tutor-v4/types";

function materializeBankItem(item: BankItem): {
  id: string;
  notionId: string;
  microId: string;
  text: string;
  format: QuestionFormat;
  choices?: string[];
  expected: string[];
  comparator: ComparatorName;
  hint?: string;
  difficulty: number;
} {
  if (item.kind === "fixed") {
    return {
      id: item.id,
      notionId: item.notionId,
      microId: item.microId,
      text: item.text,
      format: item.format,
      choices: item.choices,
      expected: item.expected,
      comparator: item.comparator,
      hint: item.hint,
      difficulty: item.difficulty,
    };
  }

  const generated = item.generate();

  return {
    id: `${item.id}_${Date.now()}_${Math.floor(Math.random() * 10000)}`,
    notionId: item.notionId,
    microId: item.microId,
    text: generated.text,
    format: generated.format ?? "short",
    choices: generated.choices,
    expected: generated.expected,
    comparator: generated.comparator,
    hint: item.hint,
    difficulty: item.difficulty,
  };
}

function difficultyToStar(difficulty: number): StarLevel {
  if (difficulty <= 1) return 1;
  if (difficulty === 2) return 2;
  if (difficulty === 3) return 3;
  if (difficulty === 4) return 4;
  return 5;
}

function inferTheme(text: string): QuestionTheme {
  const t = text.toLowerCase();

  if (
    t.includes("réunion") ||
    t.includes("saint-pierre") ||
    t.includes("samoussa") ||
    t.includes("bouchon") ||
    t.includes("mangue")
  ) {
    return "reunion";
  }

  if (
    t.includes("sport") ||
    t.includes("foot") ||
    t.includes("tournoi") ||
    t.includes("maillot") ||
    t.includes("gourde")
  ) {
    return "sport";
  }

  if (
    t.includes("cuisine") ||
    t.includes("recette") ||
    t.includes("yaourt") ||
    t.includes("œuf") ||
    t.includes("oeuf")
  ) {
    return "cuisine";
  }

  if (
    t.includes("jeu vidéo") ||
    t.includes("potion") ||
    t.includes("pièce") ||
    t.includes("pièces")
  ) {
    return "jeux_video";
  }

  return "neutral";
}

function inferFamilyId(item: BankItem): string {
  if (item.id.includes("qcm")) return `${item.microId}_qcm`;
  if (item.id.includes("tpl")) return `${item.microId}_template`;
  return `${item.microId}_fixed`;
}

function toTutorQuestionOption(item: BankItem): TutorQuestionOption {
  const q = materializeBankItem(item);

  return {
    id: q.id,
    notionId: q.notionId,
    microId: q.microId,
    text: q.text,
    format: q.format,
    choices: q.choices,
    expected: q.expected,
    comparator: q.comparator,
    hint: q.hint,
    meta: {
      familyId: inferFamilyId(item),
      theme: inferTheme(q.text),
      supportLevel: q.hint ? "medium" : "low",
      readingLoad: q.text.length < 60 ? "short" : q.text.length < 120 ? "medium" : "long",
      challengeType: q.format === "qcm" ? "guided" : "direct",
      starLevel: difficultyToStar(q.difficulty),
    },
  };
}

function pickRandom<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function isGoodContrast(a: TutorQuestionOption, b: TutorQuestionOption): boolean {
  if (a.id === b.id) return false;

  return (
    a.meta.theme !== b.meta.theme ||
    a.meta.familyId !== b.meta.familyId ||
    a.format !== b.format ||
    a.meta.starLevel !== b.meta.starLevel
  );
}

export function buildQuestionPair(args: {
  bank: BankItem[];
  notionId: string;
  microId: string;
  recommendedStar: StarLevel;
  recentQuestionIds?: string[];
}): TutorQuestionPair {
  const { bank, notionId, microId, recommendedStar, recentQuestionIds = [] } = args;

  const filtered = bank.filter(
    (item) =>
      item.notionId === notionId &&
      item.microId === microId &&
      !recentQuestionIds.includes(item.id)
  );

  if (filtered.length < 2) {
    throw new Error(
      `Pas assez de questions disponibles pour ${notionId}/${microId} en V4.`
    );
  }

  const nearLevel = filtered.filter((item) => {
    const star = difficultyToStar(item.difficulty);
    return Math.abs(star - recommendedStar) <= 1;
  });

  const source = nearLevel.length >= 2 ? nearLevel : filtered;

  const firstItem = pickRandom(source);
  const optionA = toTutorQuestionOption(firstItem);

  const remaining = source.filter((item) => item.id !== firstItem.id);
  const contrasted = remaining
    .map(toTutorQuestionOption)
    .filter((candidate) => isGoodContrast(optionA, candidate));

  const optionB =
    contrasted.length > 0
      ? pickRandom(contrasted)
      : toTutorQuestionOption(pickRandom(remaining));

  return {
    pairId: randomUUID(),
    notionId,
    microId,
    recommendedStar,
    optionA,
    optionB,
  };
}