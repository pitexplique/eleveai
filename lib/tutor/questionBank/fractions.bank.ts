import type { BankItem } from "@/lib/tutor/types";

export const fractionsBank: BankItem[] = [
  {
    kind: "fixed",
    id: "frac_read_1",
    notionId: "fractions",
    microId: "fraction_read",
    difficulty: 1,
    text: "Comment lit-on la fraction 3/4 ?",
    format: "short",
    expected: ["trois quarts"],
    comparator: "contains_keyword",
  },

  {
    kind: "fixed",
    id: "frac_cmp_1",
    notionId: "fractions",
    microId: "fraction_compare",
    difficulty: 1,
    text: "Quelle fraction est la plus grande : 1/2 ou 3/4 ?",
    format: "short",
    expected: ["3/4"],
    comparator: "exact_text",
  },

  {
    kind: "template",
    id: "frac_cmp_template",
    notionId: "fractions",
    microId: "fraction_compare",
    difficulty: 1,
    generate: () => {
      const a = Math.floor(Math.random() * 4) + 1;
      const b = Math.floor(Math.random() * 4) + 1;

      const answer = a > b ? `${a}/5` : `${b}/5`;

      return {
        text: `Quelle fraction est la plus grande : ${a}/5 ou ${b}/5 ?`,
        expected: [answer],
        comparator: "exact_text",
      };
    },
  },
];