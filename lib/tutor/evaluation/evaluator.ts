import { compareAnswer } from "@/lib/tutor/evaluation/comparators";
import type { TutorQuestion } from "@/lib/tutor/types";

function normalize(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/\s*\/\s*/g, "/")
    .replace(",", ".");
}

export function evaluateAnswer(question: TutorQuestion, answer: string) {
  const ok = compareAnswer({
    comparator: question.comparator,
    answer,
    expected: question.expected,
  });

  return {
    ok,
    normalizedAnswer: normalize(answer),
    feedback: ok
      ? "Bravo, c'est correct."
      : "Ce n'est pas encore ça.",
    flags: ok ? [] : ["wrong_answer"],
  };
}