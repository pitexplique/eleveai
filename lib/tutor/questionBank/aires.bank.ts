import type { BankItem } from "@/lib/tutor/types";

export const airesBank: BankItem[] = [
  {
    kind: "fixed",
    id: "area_rect_1",
    notionId: "aires",
    microId: "area_rectangle",
    difficulty: 1,
    text: "Quelle est l’aire d’un rectangle de 3 cm par 4 cm ?",
    format: "short",
    expected: ["12"],
    comparator: "number_equal",
  },

  {
    kind: "fixed",
    id: "area_sq_1",
    notionId: "aires",
    microId: "area_square",
    difficulty: 1,
    text: "Quelle est l’aire d’un carré de côté 6 cm ?",
    format: "short",
    expected: ["36"],
    comparator: "number_equal",
  },
];