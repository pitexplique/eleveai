// lib/calcul-rapide/data/6e/calculs.templates.ts

import type { CalculRapideItem } from "../../types";

export const calculsTemplates6e: CalculRapideItem[] = [
  {
    id: "6e_template_addition_flash_001",
    niveau: "6e",
    type: "calcul",
    mode: "template",
    notionId: "calcul_mental",
    microId: "addition_mentale",
    difficulty: 1,
    durationSec: 20,
    media: {
      text: "{{a}} + {{b}}",
    },
    template: "{{a}} + {{b}}",
    variables: {
      a: [57, 123, 194, 238],
      b: [8, 9, 39, 42],
    },
    answerRule: "a + b",
    explanationTemplate: "{{a}} + {{b}} = {{answer}}.",
    tags: ["addition", "calcul-mental"],
  },
  {
    id: "6e_template_multiplication_flash_001",
    niveau: "6e",
    type: "calcul",
    mode: "template",
    notionId: "calcul_mental",
    microId: "multiplication_mentale",
    difficulty: 1,
    durationSec: 20,
    media: {
      text: "{{a}} × {{b}}",
    },
    template: "{{a}} × {{b}}",
    variables: {
      a: [6, 7, 8, 9, 12, 24],
      b: [5, 6, 8, 10],
    },
    answerRule: "a * b",
    explanationTemplate: "{{a}} × {{b}} = {{answer}}.",
    tags: ["multiplication", "tables"],
  },
  {
    id: "6e_template_diviser_10_100_001",
    niveau: "6e",
    type: "calcul",
    mode: "template",
    notionId: "decimaux",
    microId: "decimal_diviser_10_100_1000",
    difficulty: 2,
    durationSec: 20,
    media: {
      text: "{{n}} : {{d}}",
    },
    template: "{{n}} : {{d}}",
    variables: {
      n: [732, 513.7, 48.5, 1200, 76.5],
      d: [10, 100],
    },
    answerRule: "n / d",
    hint: "Diviser par 10 ou 100 décale la virgule vers la gauche.",
    explanationTemplate: "{{n}} : {{d}} = {{answer}}.",
    tags: ["decimaux", "division-par-10", "division-par-100"],
  },
  {
    id: "6e_template_pourcentage_25_001",
    niveau: "6e",
    type: "calcul",
    mode: "template",
    notionId: "proportionnalite",
    microId: "pourcentage_simple",
    difficulty: 2,
    durationSec: 20,
    media: {
      text: "Combien font 25 % de {{n}} ?",
    },
    template: "Combien font 25 % de {{n}} ?",
    variables: {
      n: [40, 80, 120, 160, 200, 224, 240],
    },
    answerRule: "n / 4",
    hint: "25 %, c’est un quart.",
    explanationTemplate: "25 % de {{n}}, c’est {{n}} ÷ 4 = {{answer}}.",
    tags: ["pourcentage", "quart", "proportionnalite"],
  },
];