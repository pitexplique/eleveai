// lib/calcul-rapide/data/5e/calculs.templates.ts

import type { CalculRapideItem } from "../../types";

export const calculsTemplates5e: CalculRapideItem[] = [
  {
    id: "5e_template_conversion_longueur_001",
    niveau: "5e",
    type: "calcul",
    mode: "template",
    notionId: "grandeurs_mesures",
    microId: "conversion_longueur",
    difficulty: 2,
    durationSec: 20,
    media: { text: "{{n}} km = ? m" },
    template: "{{n}} km = ? m",
    variables: {
      n: [1.5, 2, 3.4, 4.5, 7],
    },
    answerRule: "n * 1000",
    hint: "1 km = 1000 m.",
    explanationTemplate:
      "{{n}} × 1000 = {{answer}} m.",
    tags: ["longueur", "conversion"],
  },

  {
    id: "5e_template_conversion_masse_001",
    niveau: "5e",
    type: "calcul",
    mode: "template",
    notionId: "grandeurs_mesures",
    microId: "conversion_masse",
    difficulty: 2,
    durationSec: 20,
    media: { text: "{{n}} g = ? kg" },
    template: "{{n}} g = ? kg",
    variables: {
      n: [250, 500, 750, 1200, 3500],
    },
    answerRule: "n / 1000",
    hint: "1 kg = 1000 g.",
    explanationTemplate:
      "{{n}} ÷ 1000 = {{answer}} kg.",
    tags: ["masse"],
  },

  {
    id: "5e_template_conversion_contenance_001",
    niveau: "5e",
    type: "calcul",
    mode: "template",
    notionId: "grandeurs_mesures",
    microId: "conversion_contenance",
    difficulty: 2,
    durationSec: 20,
    media: { text: "{{n}} L = ? cL" },
    template: "{{n}} L = ? cL",
    variables: {
      n: [1.5, 2, 2.5, 3.2, 4],
    },
    answerRule: "n * 100",
    hint: "1 L = 100 cL.",
    explanationTemplate:
      "{{n}} × 100 = {{answer}} cL.",
    tags: ["contenance"],
  },

  {
    id: "5e_template_conversion_duree_001",
    niveau: "5e",
    type: "calcul",
    mode: "template",
    notionId: "grandeurs_mesures",
    microId: "conversion_duree",
    difficulty: 3,
    durationSec: 20,
    media: { text: "{{h}} h {{m}} min = ? min" },
    template: "{{h}} h {{m}} min = ? min",
    variables: {
      h: [1, 2, 3, 4],
      m: [10, 15, 20, 30, 45],
    },
    answerRule: "(h * 60) + m",
    hint: "Transforme les heures en minutes puis ajoute.",
    explanationTemplate:
      "{{h}} h = {{h}} × 60 = {{h * 60}} min puis {{h * 60}} + {{m}} = {{answer}} min.",
    tags: ["duree"],
  },

  {
    id: "5e_template_vitesse_001",
    niveau: "5e",
    type: "calcul",
    mode: "template",
    notionId: "proportionnalite",
    microId: "vitesse_simple",
    difficulty: 3,
    durationSec: 20,
    media: { text: "{{v}} km/h pendant {{t}} h" },
    template: "{{v}} km/h pendant {{t}} h",
    variables: {
      v: [50, 60, 70, 80, 90],
      t: [2, 3, 4],
    },
    answerRule: "v * t",
    hint: "Distance = vitesse × temps.",
    explanationTemplate:
      "{{v}} × {{t}} = {{answer}} km.",
    tags: ["vitesse", "distance"],
  },

  {
    id: "5e_template_aire_rectangle_001",
    niveau: "5e",
    type: "calcul",
    mode: "template",
    notionId: "aires",
    microId: "aire_rectangle",
    difficulty: 3,
    durationSec: 20,
    media: { text: "Rectangle : {{L}} m × {{l}} m" },
    template: "Rectangle : {{L}} m × {{l}} m",
    variables: {
      L: [5, 6, 7, 8, 10],
      l: [2, 3, 4, 5],
    },
    answerRule: "L * l",
    hint: "Aire = longueur × largeur.",
    explanationTemplate:
      "{{L}} × {{l}} = {{answer}} m².",
    tags: ["aire"],
  },
];