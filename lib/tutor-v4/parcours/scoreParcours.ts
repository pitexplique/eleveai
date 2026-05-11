import type {
  ParcoursAnswer,
  ParcoursNotionScore,
  ParcoursStatus,
} from "./types";

function normalize(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(",", ".")
    .replace(/\s+/g, " ");
}

export function isCorrectAnswer(userAnswer: string, expected: string[]) {
  const cleanUser = normalize(userAnswer);

  return expected.some((answer) => {
    const cleanExpected = normalize(answer);

    if (cleanUser === cleanExpected) return true;

    const userNumber = Number(cleanUser);
    const expectedNumber = Number(cleanExpected);

    if (!Number.isNaN(userNumber) && !Number.isNaN(expectedNumber)) {
      return Math.abs(userNumber - expectedNumber) < 0.0001;
    }

    return false;
  });
}

export function getParcoursStatus(score: number, maxScore: number): ParcoursStatus {
  const ratio = maxScore === 0 ? 0 : score / maxScore;

  if (ratio >= 0.8) return "maitrise";
  if (ratio >= 0.5) return "a_revoir";
  return "fragile";
}

export function getStatusLabel(status: ParcoursStatus) {
  if (status === "maitrise") return "🟢 maîtrisé";
  if (status === "a_revoir") return "🟡 à revoir";
  return "🔴 fragile";
}

export function scoreParcours(args: {
  notionId: string;
  notionLabel: string;
  answers: ParcoursAnswer[];
}): ParcoursNotionScore {
  const relatedAnswers = args.answers.filter(
    (a) => a.notionId === args.notionId
  );

  const score = relatedAnswers.filter((a) => a.isCorrect).length;
  const maxScore = relatedAnswers.length;

  return {
    notionId: args.notionId,
    notionLabel: args.notionLabel,
    score,
    maxScore,
    status: getParcoursStatus(score, maxScore),
  };
}