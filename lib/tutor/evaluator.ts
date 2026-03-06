import type { TutorQuestion } from "@/lib/tutor/types";

function normalize(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/\s*\/\s*/g, "/")
    .replace(",", ".");
}

function inEquivalenceGroup(a: string, e: string) {
  const groups = [
    ["0.5", "1/2", "2/4", "0.50"],
    ["0.25", "1/4", "2/8", "0.250"],
    ["0.75", "3/4", "6/8", "0.750"],
    ["0.7", "7/10", "0.70"],
    ["0.4", "2/5", "4/10", "0.40"],
    ["0.8", "4/5", "8/10", "0.80"],
  ].map((g) => g.map(normalize));

  return groups.some((group) => group.includes(a) && group.includes(e));
}

export function evaluateAnswer(question: TutorQuestion, answer: string) {
  const normalizedAnswer = normalize(answer);

  const ok = question.expected.some((exp) => {
    const expected = normalize(exp);
    return normalizedAnswer === expected || inEquivalenceGroup(normalizedAnswer, expected);
  });

  return {
    ok,
    normalizedAnswer,
    feedback: ok
      ? "Bravo, c'est correct."
      : "Ce n'est pas encore ça. On ajuste ensemble.",
    flags: ok ? [] : ["wrong_answer"],
  };
}