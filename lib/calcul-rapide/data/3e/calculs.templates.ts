// lib/calcul-rapide/data/3e/calculs.templates.ts

import type { CalculRapideItem } from "../../types";

export const calculsTemplates3e: CalculRapideItem[] = [
  {
    id: "3e_template_puissance_001",
    niveau: "3e",
    type: "calcul",
    mode: "template",
    notionId: "puissances",
    microId: "puissance_calcul",
    difficulty: 2,
    durationSec: 20,
    media: { text: "{{a}}² × {{a}}³" },
    template: "{{a}}² × {{a}}³",
    variables: { a: [2, 3, 4, 5] },
    answerRule: "Math.pow(a,5)",
    explanationTemplate: "{{a}}² × {{a}}³ = {{a}}⁵ = {{answer}}",
  },
  {
    id: "3e_template_relatif_001",
    niveau: "3e",
    type: "calcul",
    mode: "template",
    notionId: "operations_relatifs",
    microId: "relatif_calcul",
    difficulty: 2,
    durationSec: 20,
    media: { text: "{{a}} × {{b}}" },
    template: "{{a}} × {{b}}",
    variables: {
      a: [-9, -6, 7],
      b: [-4, 5, -3],
    },
    answerRule: "a*b",
    explanationTemplate: "{{a}} × {{b}} = {{answer}}",
  },
];