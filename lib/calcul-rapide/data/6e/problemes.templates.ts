// lib/calcul-rapide/data/6e/problemes.templates.ts

import type { CalculRapideItem } from "../../types";

export const problemesTemplates6e: CalculRapideItem[] = [
  // ============================================================
  // SEMAINE MESURES
  // ============================================================

  {
    id: "6e_template_randonnee_001",
    niveau: "6e",
    type: "probleme",
    mode: "template",
    notionId: "grandeurs_mesures",
    microId: "conversion_longueur",
    difficulty: 2,
    durationSec: 60,
    media: {
      text: "Une randonnée mesure {{km}} km. Combien cela fait-il en mètres ?",
    },
    template: "Une randonnée mesure {{km}} km. Combien cela fait-il en mètres ?",
    variables: {
      km: [1.8, 2.6, 4.5, 5.7, 8.2],
    },
    answerRule: "km * 1000",
    hint: "1 km = 1000 m.",
    explanationTemplate: "{{km}} × 1000 = {{answer}} m.",
    tags: ["longueur", "reunion"],
  },

  {
    id: "6e_template_jus_fruits_001",
    niveau: "6e",
    type: "probleme",
    mode: "template",
    notionId: "grandeurs_mesures",
    microId: "conversion_contenance",
    difficulty: 2,
    durationSec: 60,
    media: {
      text: "Une bouteille contient {{cl}} cL de jus. Quelle quantité cela représente-t-il en litres ?",
    },
    template:
      "Une bouteille contient {{cl}} cL de jus. Quelle quantité cela représente-t-il en litres ?",
    variables: {
      cl: [120, 180, 240, 350, 750],
    },
    answerRule: "cl / 100",
    hint: "100 cL = 1 L.",
    explanationTemplate: "{{cl}} ÷ 100 = {{answer}} L.",
    tags: ["contenance"],
  },

  {
    id: "6e_template_course_001",
    niveau: "6e",
    type: "probleme",
    mode: "template",
    notionId: "grandeurs_mesures",
    microId: "conversion_duree",
    difficulty: 2,
    durationSec: 60,
    media: {
      text: "Une course dure {{h}} heures. Combien cela fait-il en minutes ?",
    },
    template: "Une course dure {{h}} heures. Combien cela fait-il en minutes ?",
    variables: {
      h: [2, 3, 5, 6],
    },
    answerRule: "h * 60",
    hint: "1 heure = 60 minutes.",
    explanationTemplate: "{{h}} × 60 = {{answer}} minutes.",
    tags: ["duree"],
  },

  // ============================================================
  // SEMAINE FRACTIONS
  // ============================================================

  {
    id: "6e_template_fraction_randonnee_001",
    niveau: "6e",
    type: "probleme",
    mode: "template",
    notionId: "fractions",
    microId: "fraction_quantite",
    difficulty: 2,
    durationSec: 60,
    media: {
      text: "Une randonnée mesure {{n}} km. La famille parcourt la moitié. Combien de kilomètres a-t-elle parcourus ?",
    },
    template:
      "Une randonnée mesure {{n}} km. La famille parcourt la moitié. Combien de kilomètres a-t-elle parcourus ?",
    variables: {
      n: [6, 8, 14, 18, 24],
    },
    answerRule: "n / 2",
    hint: "La moitié, c’est diviser par 2.",
    explanationTemplate:
      "La moitié de {{n}}, c’est {{n}} ÷ 2 = {{answer}} km.",
    tags: ["fraction", "reunion", "longueur"],
  },

  {
    id: "6e_template_fraction_jus_001",
    niveau: "6e",
    type: "probleme",
    mode: "template",
    notionId: "fractions",
    microId: "fraction_quantite",
    difficulty: 2,
    durationSec: 60,
    media: {
      text: "Une bouteille contient {{n}} cL de jus. On boit le quart. Combien de cL a-t-on bus ?",
    },
    template:
      "Une bouteille contient {{n}} cL de jus. On boit le quart. Combien de cL a-t-on bus ?",
    variables: {
      n: [80, 120, 160, 200, 240],
    },
    answerRule: "n / 4",
    hint: "Le quart, c’est diviser par 4.",
    explanationTemplate:
      "Le quart de {{n}} cL, c’est {{n}} ÷ 4 = {{answer}} cL.",
    tags: ["fraction", "contenance"],
  },

  {
    id: "6e_template_fraction_marche_001",
    niveau: "6e",
    type: "probleme",
    mode: "template",
    notionId: "fractions",
    microId: "fraction_quantite",
    difficulty: 2,
    durationSec: 60,
    media: {
      text: "Au marché, un panier contient {{n}} fruits. On en vend les 3/4. Combien de fruits sont vendus ?",
    },
    template:
      "Au marché, un panier contient {{n}} fruits. On en vend les 3/4. Combien de fruits sont vendus ?",
    variables: {
      n: [32, 48, 72, 96, 144],
    },
    answerRule: "n * 3 / 4",
    hint: "Calcule d’abord le quart, puis multiplie par 3.",
    explanationTemplate:
      "Les 3/4 de {{n}}, c’est {{n}} × 3 ÷ 4 = {{answer}} fruits.",
    tags: ["fraction", "reunion"],
  },

  {
    id: "6e_template_fraction_course_001",
    niveau: "6e",
    type: "probleme",
    mode: "template",
    notionId: "fractions",
    microId: "fraction_quantite",
    difficulty: 2,
    durationSec: 60,
    media: {
      text: "Une course fait {{n}} km. Jade a parcouru 1/10 du trajet. Combien de kilomètres a-t-elle parcourus ?",
    },
    template:
      "Une course fait {{n}} km. Jade a parcouru 1/10 du trajet. Combien de kilomètres a-t-elle parcourus ?",
    variables: {
      n: [20, 40, 60, 90, 120],
    },
    answerRule: "n / 10",
    hint: "1/10, c’est diviser par 10.",
    explanationTemplate:
      "1/10 de {{n}}, c’est {{n}} ÷ 10 = {{answer}} km.",
    tags: ["fraction", "sport"],
  },
];
