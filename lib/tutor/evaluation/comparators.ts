
//lib/evaluation/comparators.ts
import { answersMatch } from "@/lib/answerMatch";
import type { ComparatorName } from "@/lib/tutor/types";

function normalize(value: string) {
 const normalized = value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/\s*\/\s*/g, "/")
    .replace(/\s*:\s*/g, "/")
    .replace(/\bsur\b/g, "/")
    .replace(/\s*\/\s*/g, "/")
    .replace(",", ".");
    
  // Canonicalise les fractions simples écrites en "a/b".
  // Exemples acceptés : "1 : 10", "1 sur 10", " 1/10 ".
  const fractionMatch = normalized.match(/^(-?\d+)\s*\/\s*(-?\d+)$/);
  if (fractionMatch) {
    const numerator = Number(fractionMatch[1]);
    const denominator = Number(fractionMatch[2]);

    if (Number.isFinite(numerator) && Number.isFinite(denominator) && denominator !== 0) {
      return `${numerator}/${denominator}`;
    }
  }

  return normalized;
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

export function compareAnswer(args: {
  comparator: ComparatorName;
  answer: string;
  expected: string[];
}) {
  const a = normalize(args.answer);

  // answersMatch tolère les espaces en plus/en moins et les unités ajoutées
  // ou omises (« 190cm », « 5 cm » pour « 5 »…) — voir lib/answerMatch.ts.
  switch (args.comparator) {
    case "exact_text":
    case "mcq_exact":
    case "number_equal":
      return args.expected.some(
        (exp) => normalize(exp) === a || answersMatch(args.answer, exp)
      );

    case "fraction_decimal_equivalent":
      return args.expected.some((exp) => {
        const e = normalize(exp);
        return e === a || inEquivalenceGroup(a, e) || answersMatch(args.answer, exp);
      });

    case "contains_keyword":
      return args.expected.some((exp) => a.includes(normalize(exp)));

    default:
      return args.expected.some(
        (exp) => normalize(exp) === a || answersMatch(args.answer, exp)
      );
  }
}