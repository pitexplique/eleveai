import type { BankItem } from "@/lib/tutor/types";

export const anglesBank: BankItem[] = [
  {
    kind: "fixed",
    id: "angle_right_fixed_1",
    notionId: "angles",
    microId: "angle_right",
    difficulty: 1,
    text: "Un angle droit mesure combien de degrés ?",
    format: "short",
    expected: ["90", "90°"],
    comparator: "number_equal",
    hint: "Le coin d'un carré."
  },
  {
    kind: "fixed",
    id: "angle_compare_fixed_1",
    notionId: "angles",
    microId: "angle_compare",
    difficulty: 1,
    text: "Quel angle est le plus grand : 30° ou 80° ?",
    format: "short",
    expected: ["80", "80°"],
    comparator: "number_equal",
    hint: "Compare les nombres."
  },
  {
    kind: "template",
    id: "angle_compare_tpl_1",
    notionId: "angles",
    microId: "angle_compare",
    difficulty: 1,
    generate: () => {
      const a = [20, 30, 40, 50, 60][Math.floor(Math.random() * 5)];
      let b = [70, 80, 90, 100][Math.floor(Math.random() * 4)];
      if (a > b) [b] = [a];
      const max = Math.max(a, b);
      return {
        text: `Quel angle est le plus grand : ${a}° ou ${b}° ?`,
        format: "short",
        expected: [String(max), `${max}°`],
        comparator: "number_equal",
      };
    },
    hint: "L'angle le plus grand a le plus grand nombre."
  }
];