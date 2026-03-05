import type { TutorQuestion } from "@/lib/tutor/types";

function normalize(value: string) {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

export function evaluateAnswer(question: TutorQuestion, answer: string) {
  const normalizedAnswer = normalize(answer);
  const expected = normalize(question.expected);
  const ok = normalizedAnswer === expected;

  return {
    ok,
    normalizedAnswer,
    feedback: ok ? "Bravo, c'est correct." : "Ce n'est pas encore ça. On ajuste ensemble.",
    flags: ok ? [] : ["wrong_answer"],
  };
}
