import type { BankItem } from "@/lib/tutor/types";

export const proportionnaliteBank: BankItem[] = [
  {
    kind: "fixed",
    id: "prop_table_1",
    notionId: "proportionnalite",
    microId: "prop_table",
    difficulty: 1,
    text: "Si 2 pommes coûtent 4€, combien coûtent 4 pommes ?",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
  },

  {
    kind: "template",
    id: "prop_template_1",
    notionId: "proportionnalite",
    microId: "prop_table",
    difficulty: 1,
    generate: () => {
      const a = Math.floor(Math.random() * 5) + 1;
      const b = a * 2;

      return {
        text: `${a} objets coûtent ${a * 3}€. Combien coûtent ${b} objets ?`,
        expected: [(b * 3).toString()],
        comparator: "number_equal",
      };
    },
  },
];