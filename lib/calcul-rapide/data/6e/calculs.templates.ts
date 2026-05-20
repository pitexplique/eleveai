// lib/calcul-rapide/data/6e/calculs.templates.ts

import type { CalculRapideItem } from "../../types";

export const calculsTemplates6e: CalculRapideItem[] = [
  // ============================================================
  // SEMAINE MESURES
  // ============================================================

  {
    id: "6e_template_conversion_longueur_001",
    niveau: "6e",
    type: "calcul",
    mode: "template",
    notionId: "grandeurs_mesures",
    microId: "conversion_longueur",
    difficulty: 1,
    durationSec: 20,
    media: { text: "{{n}} m = ? cm" },
    template: "{{n}} m = ? cm",
    variables: {
      n: [2, 3, 4.5, 7, 12],
    },
    answerRule: "n * 100",
    hint: "1 m = 100 cm.",
    explanationTemplate: "{{n}} m = {{n}} × 100 = {{answer}} cm.",
    tags: ["longueur", "conversion"],
  },

  {
    id: "6e_template_conversion_masse_001",
    niveau: "6e",
    type: "calcul",
    mode: "template",
    notionId: "grandeurs_mesures",
    microId: "conversion_masse",
    difficulty: 1,
    durationSec: 20,
    media: { text: "{{n}} kg = ? g" },
    template: "{{n}} kg = ? g",
    variables: {
      n: [1.5, 2, 3.4, 5, 7],
    },
    answerRule: "n * 1000",
    hint: "1 kg = 1000 g.",
    explanationTemplate: "{{n}} kg = {{n}} × 1000 = {{answer}} g.",
    tags: ["masse"],
  },

  {
    id: "6e_template_conversion_contenance_001",
    niveau: "6e",
    type: "calcul",
    mode: "template",
    notionId: "grandeurs_mesures",
    microId: "conversion_contenance",
    difficulty: 1,
    durationSec: 20,
    media: { text: "{{n}} cL = ? L" },
    template: "{{n}} cL = ? L",
    variables: {
      n: [150, 250, 300, 450, 600],
    },
    answerRule: "n / 100",
    hint: "100 cL = 1 L.",
    explanationTemplate: "{{n}} cL = {{n}} ÷ 100 = {{answer}} L.",
    tags: ["contenance"],
  },

  {
    id: "6e_template_conversion_duree_001",
    niveau: "6e",
    type: "calcul",
    mode: "template",
    notionId: "grandeurs_mesures",
    microId: "conversion_duree",
    difficulty: 2,
    durationSec: 20,
    media: { text: "{{h}} h = ? min" },
    template: "{{h}} h = ? min",
    variables: {
      h: [1, 2, 3, 4],
    },
    answerRule: "h * 60",
    hint: "1 h = 60 min.",
    explanationTemplate: "{{h}} × 60 = {{answer}} min.",
    tags: ["duree"],
  },

  // ============================================================
  // SEMAINE FRACTIONS
  // ============================================================

  {
    id: "6e_template_fraction_moitie_001",
    niveau: "6e",
    type: "calcul",
    mode: "template",
    notionId: "fractions",
    microId: "fraction_quantite",
    difficulty: 1,
    durationSec: 20,
    media: { text: "La moitié de {{n}}" },
    template: "La moitié de {{n}}",
    variables: {
      n: [20, 36, 40, 48, 60, 80, 100],
    },
    answerRule: "n / 2",
    hint: "La moitié, c’est diviser par 2.",
    explanationTemplate: "La moitié de {{n}}, c’est {{n}} ÷ 2 = {{answer}}.",
    tags: ["fraction", "moitie"],
  },

  {
    id: "6e_template_fraction_quart_001",
    niveau: "6e",
    type: "calcul",
    mode: "template",
    notionId: "fractions",
    microId: "fraction_quantite",
    difficulty: 1,
    durationSec: 20,
    media: { text: "Le quart de {{n}}" },
    template: "Le quart de {{n}}",
    variables: {
      n: [20, 40, 60, 80, 100, 120],
    },
    answerRule: "n / 4",
    hint: "Le quart, c’est diviser par 4.",
    explanationTemplate: "Le quart de {{n}}, c’est {{n}} ÷ 4 = {{answer}}.",
    tags: ["fraction", "quart"],
  },

  {
    id: "6e_template_fraction_dixieme_001",
    niveau: "6e",
    type: "calcul",
    mode: "template",
    notionId: "fractions",
    microId: "fraction_quantite",
    difficulty: 1,
    durationSec: 20,
    media: { text: "Le dixième de {{n}}" },
    template: "Le dixième de {{n}}",
    variables: {
      n: [50, 80, 100, 120, 250, 300],
    },
    answerRule: "n / 10",
    hint: "Le dixième, c’est diviser par 10.",
    explanationTemplate: "Le dixième de {{n}}, c’est {{n}} ÷ 10 = {{answer}}.",
    tags: ["fraction", "dixieme"],
  },

  {
    id: "6e_template_fraction_trois_quarts_001",
    niveau: "6e",
    type: "calcul",
    mode: "template",
    notionId: "fractions",
    microId: "fraction_quantite",
    difficulty: 2,
    durationSec: 20,
    media: { text: "Les 3/4 de {{n}}" },
    template: "Les 3/4 de {{n}}",
    variables: {
      n: [20, 40, 60, 80, 100, 120],
    },
    answerRule: "n * 3 / 4",
    hint: "Calcule d’abord le quart, puis multiplie par 3.",
    explanationTemplate:
      "Les 3/4 de {{n}}, c’est {{n}} × 3 ÷ 4 = {{answer}}.",
    tags: ["fraction", "trois_quarts"],
  },
];