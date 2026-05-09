// lib/calcul-rapide/data/4e/calculs.templates.ts

import type { CalculRapideItem } from "../../types";

export const calculsTemplates4e: CalculRapideItem[] = [
  // 🔵 RÉACTIVATION conversions

  {
    id: "4e_template_conversion_longueur_001",
    niveau: "4e",
    type: "calcul",
    mode: "template",
    notionId: "grandeurs_mesures",
    microId: "conversion_longueur",
    difficulty: 2,
    durationSec: 20,
    media: { text: "{{n}} km = ? m" },
    template: "{{n}} km = ? m",
    variables: {
      n: [1.2, 2.5, 3.6, 4.8, 7.4],
    },
    answerRule: "n * 1000",
    hint: "1 km = 1000 m.",
    explanationTemplate:
      "{{n}} × 1000 = {{answer}} m.",
    tags: ["conversion", "longueur", "reactivation"],
  },

  {
    id: "4e_template_conversion_masse_001",
    niveau: "4e",
    type: "calcul",
    mode: "template",
    notionId: "grandeurs_mesures",
    microId: "conversion_masse",
    difficulty: 2,
    durationSec: 20,
    media: { text: "{{n}} kg = ? g" },
    template: "{{n}} kg = ? g",
    variables: {
      n: [0.5, 0.75, 1.2, 2.4, 3.8],
    },
    answerRule: "n * 1000",
    hint: "1 kg = 1000 g.",
    explanationTemplate:
      "{{n}} × 1000 = {{answer}} g.",
    tags: ["conversion", "masse", "reactivation"],
  },

  // 🔴 Durées

  {
    id: "4e_template_conversion_duree_001",
    niveau: "4e",
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
      "{{h}} h = {{h * 60}} min puis {{h * 60}} + {{m}} = {{answer}} min.",
    tags: ["duree"],
  },

  // 🔴 Vitesses

  {
    id: "4e_template_vitesse_001",
    niveau: "4e",
    type: "calcul",
    mode: "template",
    notionId: "proportionnalite",
    microId: "vitesse_simple",
    difficulty: 3,
    durationSec: 20,
    media: { text: "{{v}} km/h pendant {{t}} h" },
    template: "{{v}} km/h pendant {{t}} h",
    variables: {
      v: [60, 72, 80, 90, 110],
      t: [2, 3, 4],
    },
    answerRule: "v * t",
    hint: "Distance = vitesse × temps.",
    explanationTemplate:
      "{{v}} × {{t}} = {{answer}} km.",
    tags: ["vitesse", "distance"],
  },

  // 🔴 Aires

  {
    id: "4e_template_aire_rectangle_001",
    niveau: "4e",
    type: "calcul",
    mode: "template",
    notionId: "aires",
    microId: "aire_rectangle",
    difficulty: 3,
    durationSec: 20,
    media: { text: "Rectangle : {{L}} m × {{l}} m" },
    template: "Rectangle : {{L}} m × {{l}} m",
    variables: {
      L: [8, 10, 12, 15],
      l: [3, 4, 5, 6],
    },
    answerRule: "L * l",
    hint: "Aire = longueur × largeur.",
    explanationTemplate:
      "{{L}} × {{l}} = {{answer}} m².",
    tags: ["aire"],
  },

  // 🔴 Volumes

  {
    id: "4e_template_volume_001",
    niveau: "4e",
    type: "calcul",
    mode: "template",
    notionId: "volumes",
    microId: "volume_contenance",
    difficulty: 3,
    durationSec: 20,
    media: { text: "{{n}} L = ? mL" },
    template: "{{n}} L = ? mL",
    variables: {
      n: [0.75, 1.2, 1.5, 2.25, 3.4],
    },
    answerRule: "n * 1000",
    hint: "1 L = 1000 mL.",
    explanationTemplate:
      "{{n}} × 1000 = {{answer}} mL.",
    tags: ["volume", "contenance"],
  },

  // 🔴 Piège cognitif unités

  {
    id: "4e_template_piege_aire_001",
    niveau: "4e",
    type: "calcul",
    mode: "template",
    notionId: "aires",
    microId: "aire_unites",
    difficulty: 4,
    durationSec: 20,
    media: { text: "{{a}} cm × {{b}} cm = ? cm²" },
    template: "{{a}} cm × {{b}} cm = ? cm²",
    variables: {
      a: [3, 4, 5, 6, 8],
      b: [2, 3, 4, 5],
    },
    answerRule: "a * b",
    hint: "Une aire s’exprime en cm².",
    explanationTemplate:
      "{{a}} × {{b}} = {{answer}} cm².",
    tags: ["aire", "piege", "unites"],
  },
];