import type { BankItem } from "@/lib/tutor/types";

export const anglesBank: BankItem[] = [
  {
    kind: "fixed",
    id: "angle_right_1",
    notionId: "angles",
    microId: "angle_right",
    difficulty: 1,
    text: "Combien mesure un angle droit ?",
    format: "short",
    expected: ["90"],
    comparator: "number_equal",
  },

  {
    kind: "fixed",
    id: "angle_cmp_1",
    notionId: "angles",
    microId: "angle_compare",
    difficulty: 1,
    text: "Quel angle est le plus grand : 30° ou 60° ?",
    format: "short",
    expected: ["60"],
    comparator: "number_equal",
  },
];