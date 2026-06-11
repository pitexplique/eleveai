import { answersMatch } from "@/lib/answerMatch";
import type {
  ParcoursAnswer,
  ParcoursNotionScore,
  ParcoursStatus,
} from "./types";

export function isCorrectAnswer(userAnswer: string, expected: string[]) {
  return expected.some((answer) => answersMatch(userAnswer, answer));
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