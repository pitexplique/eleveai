import type { BankItem } from "@/lib/tutor/types";

export const perimetreBank: BankItem[] = [
  {
    kind: "fixed",
    id: "perim_square_fixed_1",
    notionId: "perimetre",
    microId: "perim_square",
    difficulty: 1,
    text: "Quel est le périmètre d’un carré de côté 5 cm ?",
    format: "short",
    expected: ["20", "20 cm", "20cm"],
    comparator: "number_equal",
    hint: "4 × côté."
  },
  {
    kind: "fixed",
    id: "perim_rectangle_fixed_1",
    notionId: "perimetre",
    microId: "perim_rectangle",
    difficulty: 1,
    text: "Un rectangle mesure 3 cm sur 7 cm. Quel est son périmètre ?",
    format: "short",
    expected: ["20", "20 cm", "20cm"],
    comparator: "number_equal",
    hint: "2 × longueur + 2 × largeur."
  },
  {
    kind: "template",
    id: "perim_square_tpl_1",
    notionId: "perimetre",
    microId: "perim_square",
    difficulty: 1,
    generate: () => {
      const c = [2, 3, 4, 5, 6, 7][Math.floor(Math.random() * 6)];
      return {
        text: `Quel est le périmètre d’un carré de côté ${c} cm ?`,
        format: "short",
        expected: [String(c * 4), `${c * 4} cm`, `${c * 4}cm`],
        comparator: "number_equal",
      };
    },
    hint: "Le carré a 4 côtés égaux."
  },
  {
    kind: "template",
    id: "perim_rectangle_tpl_1",
    notionId: "perimetre",
    microId: "perim_rectangle",
    difficulty: 1,
    generate: () => {
      const l = [3, 4, 5, 6, 7][Math.floor(Math.random() * 5)];
      const w = [2, 3, 4, 5][Math.floor(Math.random() * 4)];
      return {
        text: `Un rectangle mesure ${l} cm sur ${w} cm. Quel est son périmètre ?`,
        format: "short",
        expected: [String(2 * (l + w)), `${2 * (l + w)} cm`, `${2 * (l + w)}cm`],
        comparator: "number_equal",
      };
    },
    hint: "Additionne les 4 côtés."
  }
];