// lib/calcul-rapide/data/4e/calculs.templates.ts

import type { CalculRapideItem } from "../../types";

export const calculsTemplates4e: CalculRapideItem[] = [
  {
    id: "4e_template_relatifs_001",
    niveau: "4e",
    type: "calcul",
    mode: "template",
    notionId: "operations_relatifs",
    microId: "relatif_calcul",
    difficulty: 2,
    durationSec: 20,
    media: { text: "{{a}} × {{b}}" },
    template: "{{a}} × {{b}}",
    variables: {
      a: [-7, -5, 6, -8],
      b: [4, -3, 7, -2],
    },
    answerRule: "a * b",
    explanationTemplate: "{{a}} × {{b}} = {{answer}}",
  },
  {
    id: "4e_template_puissance_001",
    niveau: "4e",
    type: "calcul",
    mode: "template",
    notionId: "puissances",
    microId: "puissance_calcul",
    difficulty: 2,
    durationSec: 20,
    media: { text: "{{a}}²" },
    template: "{{a}}²",
    variables: {
      a: [3, 4, 5, 6, 7],
    },
    answerRule: "a * a",
    explanationTemplate: "{{a}}² = {{answer}}",
  },
];