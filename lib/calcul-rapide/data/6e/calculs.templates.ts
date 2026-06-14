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
      n: [1.85, 2.85, 3.55, 6.35, 8.75, 10.05],
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
      n: [0.85, 1.55, 2.85, 5.15, 6.65, 8.35],
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
      n: [140, 200, 260, 387, 540, 770],
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
      h: [4, 5, 7, 8],
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
      n: [36, 54, 68, 90, 96, 108, 140],
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
      n: [44, 60, 84, 108, 156, 220],
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
      n: [90, 110, 180, 260, 470, 820],
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
      n: [44, 60, 84, 108, 156, 220],
    },
    answerRule: "n * 3 / 4",
    hint: "Calcule d’abord le quart, puis multiplie par 3.",
    explanationTemplate:
      "Les 3/4 de {{n}}, c’est {{n}} × 3 ÷ 4 = {{answer}}.",
    tags: ["fraction", "trois_quarts"],
  },
  // ============================================================
  // SEMAINE 20 - DECIMAUX EXPRESS
  // ============================================================

  {
    id: "6e_template_decimal_addition_001",
    niveau: "6e",
    type: "calcul",
    mode: "template",
    notionId: "nombres_decimaux",
    microId: "addition_decimaux",
    difficulty: 2,
    durationSec: 20,
    media: { text: "{{a}} + {{b}} = ?" },
    template: "{{a}} + {{b}} = ?",
    variables: {
      a: [1.55, 2.75, 3.85, 4.95, 6.15],
      b: [1.15, 1.95, 2.85, 3.75, 4.55],
    },
    answerRule: "a + b",
    hint: "Aligne bien les virgules.",
    explanationTemplate: "{{a}} + {{b}} = {{answer}}.",
    tags: ["decimaux", "addition"],
  },

  {
    id: "6e_template_decimal_multiplier_10_100_001",
    niveau: "6e",
    type: "calcul",
    mode: "template",
    notionId: "nombres_decimaux",
    microId: "multiplier_par_10_100",
    difficulty: 2,
    durationSec: 20,
    media: { text: "{{n}} x {{k}} = ?" },
    template: "{{n}} x {{k}} = ?",
    variables: {
      n: [1.6, 2.85, 4.1, 5.15, 6.39],
      k: [10, 100],
    },
    answerRule: "n * k",
    hint: "Multiplier par 10 ou 100 decale la virgule vers la droite.",
    explanationTemplate: "{{n}} x {{k}} = {{answer}}.",
    tags: ["decimaux", "multiplier"],
  },
];
