import type { BankItem } from "@/lib/tutor/types";

export const proportionnaliteBank: BankItem[] = [
  {
    kind: "fixed",
    id: "prop_table_fixed_1",
    notionId: "proportionnalite",
    microId: "prop_table",
    difficulty: 2,
    text: "Si 2 cahiers coûtent 4 €, combien coûtent 4 cahiers ?",
    format: "short",
    expected: ["8", "8€", "8 €"],
    comparator: "number_equal",
    hint: "Si on double, le prix double."
  },
  {
    kind: "fixed",
    id: "prop_unit_fixed_1",
    notionId: "proportionnalite",
    microId: "prop_unit",
    difficulty: 2,
    text: "3 bonbons coûtent 6 €. Combien coûte 1 bonbon ?",
    format: "short",
    expected: ["2", "2€", "2 €"],
    comparator: "number_equal",
    hint: "Passe à l'unité."
  },
  {
    kind: "fixed",
    id: "prop_direct_fixed_1",
    notionId: "proportionnalite",
    microId: "prop_direct",
    difficulty: 2,
    text: "4 cahiers coûtent 8 €. Combien coûtent 2 cahiers ?",
    format: "short",
    expected: ["4", "4€", "4 €"],
    comparator: "number_equal",
    hint: "Si on divise par 2, le prix aussi."
  },
  {
    kind: "template",
    id: "prop_table_tpl_1",
    notionId: "proportionnalite",
    microId: "prop_table",
    difficulty: 2,
    generate: () => {
      const a = [2, 3, 4][Math.floor(Math.random() * 3)];
      const coef = [2, 3, 4][Math.floor(Math.random() * 3)];
      return {
        text: `Si ${a} objets coûtent ${a * 2} €, combien coûtent ${a * coef} objets ?`,
        format: "short",
        expected: [String(a * 2 * coef), `${a * 2 * coef}€`, `${a * 2 * coef} €`],
        comparator: "number_equal",
      };
    },
    hint: "Utilise le coefficient multiplicateur."
  },
  {
    kind: "template",
    id: "prop_unit_tpl_1",
    notionId: "proportionnalite",
    microId: "prop_unit",
    difficulty: 2,
    generate: () => {
      const qty = [2, 3, 4, 5][Math.floor(Math.random() * 4)];
      const unit = [2, 3, 4][Math.floor(Math.random() * 3)];
      return {
        text: `${qty} objets coûtent ${qty * unit} €. Combien coûte 1 objet ?`,
        format: "short",
        expected: [String(unit), `${unit}€`, `${unit} €`],
        comparator: "number_equal",
      };
    },
    hint: "Divise par le nombre d'objets."
  }
];