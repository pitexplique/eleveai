
//lib/evaluation/comparators.ts
import type { ComparatorName } from "@/lib/tutor/types";

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

export function compareAnswer(args: {
  comparator: ComparatorName;
  answer: string;
  expected: string[];
}) {
  const a = normalize(args.answer);

  switch (args.comparator) {
    case "exact_text":
    case "mcq_exact":
      return args.expected.some((exp) => normalize(exp) === a);

    case "number_equal":
      return args.expected.some((exp) => normalize(exp) === a);

    case "fraction_decimal_equivalent":
      return args.expected.some((exp) => {
        const e = normalize(exp);
        return e === a || inEquivalenceGroup(a, e);
      });

    case "contains_keyword":
      return args.expected.some((exp) => a.includes(normalize(exp)));

    default:
      return args.expected.some((exp) => normalize(exp) === a);
  }
}