// lib/calcul-rapide/data/3e/calculs.templates.ts

import type { CalculRapideItem } from "../../types";

export const calculsTemplates3e: CalculRapideItem[] = [
  {
    id: "3e_template_equation_001",
    niveau: "3e",
    type: "calcul",
    mode: "template",
    notionId: "equations",
    microId: "equation_simple",
    difficulty: 2,
    durationSec: 20,
    media: { text: "{{a}}x + {{b}} = {{c}}" },
    template: "{{a}}x + {{b}} = {{c}}",
    variables: {
      a: [2, 3, 4],
      b: [3, 5, 7],
      c: [11, 17, 19],
    },
    answerRule: "(c - b) / a",
    explanationTemplate: "x = {{answer}}",
  },
  {
    id: "3e_template_fonction_001",
    niveau: "3e",
    type: "calcul",
    mode: "template",
    notionId: "fonctions_affines",
    microId: "fonction_image",
    difficulty: 2,
    durationSec: 20,
    media: { text: "f(x)={{a}}x+{{b}}, f({{x}})=?" },
    template: "f(x)={{a}}x+{{b}}, f({{x}})=?",
    variables: {
      a: [2, 3, -1],
      b: [1, 4, -2],
      x: [2, 3, 5],
    },
    answerRule: "a * x + b",
    explanationTemplate: "f({{x}})={{answer}}",
  },
];