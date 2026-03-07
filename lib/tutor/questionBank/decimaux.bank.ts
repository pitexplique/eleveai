import type { BankItem } from "@/lib/tutor/types";

export const decimauxBank: BankItem[] = [
  {
    kind: "fixed",
    id: "dec_cmp_1",
    notionId: "decimaux",
    microId: "decimal_compare",
    difficulty: 1,
    text: "Quel nombre est le plus grand : 3.5 ou 3.8 ?",
    format: "short",
    expected: ["3.8"],
    comparator: "exact_text",
  },

  {
    kind: "template",
    id: "dec_cmp_template_1",
    notionId: "decimaux",
    microId: "decimal_compare",
    difficulty: 1,
    generate: () => {
      const a = (Math.random() * 10).toFixed(1);
      const b = (Math.random() * 10).toFixed(1);

      const answer = parseFloat(a) > parseFloat(b) ? a : b;

      return {
        text: `Quel nombre est le plus grand : ${a} ou ${b} ?`,
        expected: [answer],
        comparator: "exact_text",
      };
    },
  },
];