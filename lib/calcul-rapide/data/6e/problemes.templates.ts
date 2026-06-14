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
      km: [2.4, 3.2, 5.1, 6.3, 8.8],
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
      cl: [900, 1000, 1100, 1200, 1300],
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
      h: [6, 7, 9, 10],
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
      n: [38, 40, 42, 44, 46],
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
      n: [292, 296, 300, 304, 308],
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
      n: [188, 192, 196, 200, 204],
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
      n: [170, 180, 190, 200, 210],
    },
    answerRule: "n / 10",
    hint: "1/10, c’est diviser par 10.",
    explanationTemplate:
      "1/10 de {{n}}, c’est {{n}} ÷ 10 = {{answer}} km.",
    tags: ["fraction", "sport"],
  },
  // ============================================================
  // SEMAINE 20 - DECIMAUX EXPRESS
  // ============================================================

  {
    id: "6e_template_decimal_monnaie_001",
    niveau: "6e",
    type: "probleme",
    mode: "template",
    notionId: "nombres_decimaux",
    microId: "addition_decimaux",
    difficulty: 2,
    durationSec: 60,
    media: {
      text: "Un article coute {{a}} euros et un autre coute {{b}} euros. Quel est le total ?",
    },
    template:
      "Un article coute {{a}} euros et un autre coute {{b}} euros. Quel est le total ?",
    variables: {
      a: [2.1, 3, 3.85, 5.35, 7.4],
      b: [1.1, 2.2, 3.35, 3.85, 4.8],
    },
    answerRule: "a + b",
    hint: "Additionne les deux prix.",
    explanationTemplate: "{{a}} + {{b}} = {{answer}} euros.",
    tags: ["decimaux", "monnaie"],
  },
  {
    id: "6e_template_decimal_monnaie_rendu_001",
    niveau: "6e",
    type: "probleme",
    mode: "template",
    notionId: "nombres_decimaux",
    microId: "soustraction_decimaux",
    difficulty: 2,
    durationSec: 60,
    media: {
      text: "Tu paies {{prix}} euros avec {{billet}} euros. Combien doit-on te rendre ?",
    },
    template:
      "Tu paies {{prix}} euros avec {{billet}} euros. Combien doit-on te rendre ?",
    variables: {
      prix: [3.1, 4.35, 4.8, 7.1, 8.85],
      billet: [10],
    },
    answerRule: "billet - prix",
    hint: "Soustrais le prix au montant donne.",
    explanationTemplate: "{{billet}} - {{prix}} = {{answer}} euros.",
    tags: ["decimaux", "monnaie", "quotidien"],
  },
  {
    id: "6e_template_fraction_partage_pique_nique_001",
    niveau: "6e",
    type: "probleme",
    mode: "template",
    notionId: "fractions",
    microId: "fraction_quantite",
    difficulty: 2,
    durationSec: 60,
    media: {
      text: "Pour un pique-nique, il y a {{n}} samoussas. On en mange la moitie. Combien sont manges ?",
    },
    template:
      "Pour un pique-nique, il y a {{n}} samoussas. On en mange la moitie. Combien sont manges ?",
    variables: {
      n: [68, 70, 72, 74, 76],
    },
    answerRule: "n / 2",
    hint: "La moitie, c'est diviser par 2.",
    explanationTemplate: "{{n}} / 2 = {{answer}} samoussas.",
    tags: ["fraction", "reunion", "quotidien"],
  },
];
