import type { BankItem } from "@/lib/tutor/types";

export const fractionsBank: BankItem[] = [
  {
    kind: "fixed",
    id: "fraction_read_fixed_1",
    notionId: "fractions",
    microId: "fraction_read",
    difficulty: 1,
    text: "Quelle fraction représente 1 part sur 4 parts égales ?",
    format: "short",
    expected: ["1/4", "1 / 4", "0,25", "0.25"],
    comparator: "fraction_decimal_equivalent",
    hint: "Une part sur quatre."
  },
  {
    kind: "fixed",
    id: "fraction_compare_fixed_1",
    notionId: "fractions",
    microId: "fraction_compare",
    difficulty: 2,
    text: "Compare 1/4 et 1/2 : lequel est le plus grand ?",
    format: "short",
    expected: ["1/2", "1 / 2", "1/2 est plus grand", "1/2 > 1/4", "0,5", "0.5"],
    comparator: "fraction_decimal_equivalent",
    hint: "Une moitié est plus grande qu'un quart."
  },
  {
    kind: "fixed",
    id: "fraction_quantity_fixed_1",
    notionId: "fractions",
    microId: "fraction_quantity",
    difficulty: 2,
    text: "La moitié de 10, c'est combien ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "Partage 10 en 2 parts égales."
  },
  {
    kind: "template",
    id: "fraction_read_tpl_1",
    notionId: "fractions",
    microId: "fraction_read",
    difficulty: 1,
    generate: () => {
      const den = [2, 3, 4, 5, 6, 8][Math.floor(Math.random() * 6)];
      const num = 1;
      return {
        text: `Quelle fraction représente ${num} part sur ${den} parts égales ?`,
        format: "short",
        expected: [`${num}/${den}`, `${num} / ${den}`],
        comparator: "fraction_decimal_equivalent",
      };
    },
    hint: "Numérateur = parts prises."
  },
  {
    kind: "template",
    id: "fraction_compare_tpl_1",
    notionId: "fractions",
    microId: "fraction_compare",
    difficulty: 2,
    generate: () => {
      const den = [3, 4, 5, 6, 8, 10][Math.floor(Math.random() * 6)];
      const a = 1 + Math.floor(Math.random() * (den - 2));
      let b = 1 + Math.floor(Math.random() * (den - 1));
      while (b === a) b = 1 + Math.floor(Math.random() * (den - 1));
      const max = Math.max(a, b);
      return {
        text: `Compare ${a}/${den} et ${b}/${den} : lequel est le plus grand ?`,
        format: "short",
        expected: [`${max}/${den}`, `${max} / ${den}`],
        comparator: "fraction_decimal_equivalent",
      };
    },
    hint: "Même dénominateur : compare les numérateurs."
  },
  {
    kind: "template",
    id: "fraction_quantity_tpl_1",
    notionId: "fractions",
    microId: "fraction_quantity",
    difficulty: 2,
    generate: () => {
      const base = [8, 10, 12, 16, 20][Math.floor(Math.random() * 5)];
      const type = Math.random() > 0.5 ? "moitié" : "quart";
      const expected = type === "moitié" ? String(base / 2) : String(base / 4);
      return {
        text: `Le ${type} de ${base}, c'est combien ?`,
        format: "short",
        expected: [expected],
        comparator: "number_equal",
      };
    },
    hint: "Partage la quantité en parts égales."
  }
];