// lib/calcul-rapide/data/5e/calculs.templates.ts

import type { CalculRapideItem } from "../../types";

export const calculsTemplates5e: CalculRapideItem[] = [
  {
    id: "5e_template_relatifs_001",
    niveau: "5e",
    type: "calcul",
    mode: "template",
    notionId: "operations_relatifs",
    microId: "relatif_calcul",
    difficulty: 2,
    durationSec: 20,
    media: { text: "{{a}} + {{b}}" },
    template: "{{a}} + {{b}}",
    variables: {
      a: [-12, -7, 15, -20],
      b: [5, 8, -6, 12],
    },
    answerRule: "a + b",
    explanationTemplate: "{{a}} + {{b}} = {{answer}}",
  },
  {
    id: "5e_template_fraction_produit_001",
    niveau: "5e",
    type: "calcul",
    mode: "template",
    notionId: "fractions",
    microId: "fraction_produit",
    difficulty: 3,
    durationSec: 20,
    media: { text: "{{a}}/{{b}} × {{c}}" },
    template: "{{a}}/{{b}} × {{c}}",
    variables: {
      a: [1, 2, 3],
      b: [2, 3, 4],
      c: [2, 3, 4],
    },
    answerRule: "(a * c) / b",
    explanationTemplate: "{{a}}/{{b}} × {{c}} = {{answer}}",
  },
];