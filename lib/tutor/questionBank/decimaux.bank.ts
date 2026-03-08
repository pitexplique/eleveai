import type { BankItem } from "@/lib/tutor/types";

export const decimauxBank: BankItem[] = [
  {
    kind: "fixed",
    id: "decimal_compare_fixed_1",
    notionId: "decimaux",
    microId: "decimal_compare",
    difficulty: 1,
    text: "Quel nombre est le plus grand : 0,7 ou 0,65 ?",
    format: "short",
    expected: ["0,7", "0.7"],
    comparator: "number_equal",
    hint: "Compare d'abord les dixièmes."
  },
  {
    kind: "fixed",
    id: "decimal_write_fixed_1",
    notionId: "decimaux",
    microId: "decimal_write",
    difficulty: 1,
    text: "Écris en décimal : 7/10",
    format: "short",
    expected: ["0,7", "0.7", "0,70", "0.70"],
    comparator: "fraction_decimal_equivalent",
    hint: "7 dixièmes = 0,7."
  },
  {
    kind: "template",
    id: "decimal_compare_tpl_1",
    notionId: "decimaux",
    microId: "decimal_compare",
    difficulty: 1,
    generate: () => {
      let a = Number((Math.random() * 0.8 + 0.1).toFixed(2));
      let b = Number((Math.random() * 0.8 + 0.1).toFixed(2));
      while (a === b) b = Number((Math.random() * 0.8 + 0.1).toFixed(2));
      const max = Math.max(a, b);
      return {
        text: `Quel nombre est le plus grand : ${String(a).replace(".", ",")} ou ${String(b).replace(".", ",")} ?`,
        format: "short",
        expected: [String(max), String(max).replace(".", ",")],
        comparator: "number_equal",
      };
    },
    hint: "Compare d'abord les dixièmes."
  },
  {
    kind: "template",
    id: "decimal_write_tpl_1",
    notionId: "decimaux",
    microId: "decimal_write",
    difficulty: 1,
    generate: () => {
      const numerators = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      const n = numerators[Math.floor(Math.random() * numerators.length)];
      const decimal = (n / 10).toFixed(1);
      return {
        text: `Écris en décimal : ${n}/10`,
        format: "short",
        expected: [decimal, decimal.replace(".", ",")],
        comparator: "fraction_decimal_equivalent",
      };
    },
    hint: "n/10 = n dixièmes."
  }
];