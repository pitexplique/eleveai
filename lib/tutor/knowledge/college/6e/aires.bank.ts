import type { BankItem } from "@/lib/tutor/types";

export const airesBank: BankItem[] = [
  {
    kind: "fixed",
    id: "area_rectangle_fixed_1",
    notionId: "aires",
    microId: "area_rectangle",
    difficulty: 2,
    text: "Quelle est l’aire d’un rectangle de 4 cm sur 3 cm ?",
    format: "short",
    expected: ["12", "12 cm²", "12 cm2", "12cm²", "12cm2"],
    comparator: "number_equal",
    hint: "longueur × largeur"
  },
  {
    kind: "fixed",
    id: "area_square_fixed_1",
    notionId: "aires",
    microId: "area_square",
    difficulty: 2,
    text: "Quelle est l’aire d’un carré de côté 5 cm ?",
    format: "short",
    expected: ["25", "25 cm²", "25 cm2", "25cm²", "25cm2"],
    comparator: "number_equal",
    hint: "côté × côté"
  },
  {
    kind: "template",
    id: "area_rectangle_tpl_1",
    notionId: "aires",
    microId: "area_rectangle",
    difficulty: 2,
    generate: () => {
      const l = [3, 4, 5, 6, 7][Math.floor(Math.random() * 5)];
      const w = [2, 3, 4, 5][Math.floor(Math.random() * 4)];
      const a = l * w;
      return {
        text: `Quelle est l’aire d’un rectangle de ${l} cm sur ${w} cm ?`,
        format: "short",
        expected: [String(a), `${a} cm²`, `${a} cm2`, `${a}cm²`, `${a}cm2`],
        comparator: "number_equal",
      };
    },
    hint: "Aire = longueur × largeur."
  },
  {
    kind: "template",
    id: "area_square_tpl_1",
    notionId: "aires",
    microId: "area_square",
    difficulty: 2,
    generate: () => {
      const c = [2, 3, 4, 5, 6, 7][Math.floor(Math.random() * 6)];
      const a = c * c;
      return {
        text: `Quelle est l’aire d’un carré de côté ${c} cm ?`,
        format: "short",
        expected: [String(a), `${a} cm²`, `${a} cm2`, `${a}cm²`, `${a}cm2`],
        comparator: "number_equal",
      };
    },
    hint: "Aire du carré = côté × côté."
  }
];