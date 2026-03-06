import type { TutorQuestion } from "@/lib/tutor/types";

function normalize(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/\s*\/\s*/g, "/")
    .replace(",", ".");
}

function isEquivalentFractionDecimal(answer: string, expected: string) {
  const a = normalize(answer);
  const e = normalize(expected);

  if (a === e) return true;

  const knownEquivalences: Record<string, string[]> = {
    "0.5": ["1/2", "2/4", "0.50"],
    "0.25": ["1/4", "2/8", "0.250"],
    "0.75": ["3/4", "6/8", "0.750"],
    "0.7": ["7/10", "0.70"],
    "0.4": ["2/5", "4/10", "0.40"],
    "0.8": ["4/5", "8/10", "0.80"]
  };

  for (const [decimal, variants] of Object.entries(knownEquivalences)) {
    const group = [decimal, ...variants].map(normalize);
    if (group.includes(a) && group.includes(e)) return true;
  }

  return false;
}

export function evaluateAnswer(question: TutorQuestion, answer: string) {
  const normalizedAnswer = normalize(answer);

  const ok = question.expected.some((exp) => {
    const expected = normalize(exp);
    return normalizedAnswer === expected || isEquivalentFractionDecimal(normalizedAnswer, expected);
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