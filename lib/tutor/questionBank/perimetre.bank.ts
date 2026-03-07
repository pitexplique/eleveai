import type { BankItem } from "@/lib/tutor/types";

export const perimetreBank: BankItem[] = [
  {
    kind: "fixed",
    id: "per_rect_1",
    notionId: "perimetre",
    microId: "perim_rectangle",
    difficulty: 1,
    text: "Quel est le périmètre d’un rectangle de 4 cm et 2 cm ?",
    format: "short",
    expected: ["12"],
    comparator: "number_equal",
  },

  {
    kind: "fixed",
    id: "per_sq_1",
    notionId: "perimetre",
    microId: "perim_square",
    difficulty: 1,
    text: "Quel est le périmètre d’un carré de côté 5 cm ?",
    format: "short",
    expected: ["20"],
    comparator: "number_equal",
  },
];