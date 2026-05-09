// lib/calcul-rapide/data/3e/calculs.templates.ts

import type { CalculRapideItem } from "../../types";

export const calculsTemplates3e: CalculRapideItem[] = [
  // 🔵 RÉACTIVATION conversions

  {
    id: "3e_template_conversion_longueur_001",
    niveau: "3e",
    type: "calcul",
    mode: "template",
    notionId: "grandeurs_mesures",
    microId: "conversion_longueur",
    difficulty: 2,
    durationSec: 20,
    media: { text: "{{n}} km = ? m" },
    template: "{{n}} km = ? m",
    variables: {
      n: [1.8, 2.5, 3.2, 4.7, 6.4],
    },
    answerRule: "n * 1000",
    hint: "1 km = 1000 m.",
    explanationTemplate:
      "{{n}} × 1000 = {{answer}} m.",
    tags: ["conversion", "longueur", "reactivation"],
  },

  {
    id: "3e_template_conversion_masse_001",
    niveau: "3e",
    type: "calcul",
    mode: "template",
    notionId: "grandeurs_mesures",
    microId: "conversion_masse",
    difficulty: 2,
    durationSec: 20,
    media: { text: "{{n}} kg = ? g" },
    template: "{{n}} kg = ? g",
    variables: {
      n: [0.25, 0.5, 0.75, 1.2, 2.8],
    },
    answerRule: "n * 1000",
    hint: "1 kg = 1000 g.",
    explanationTemplate:
      "{{n}} × 1000 = {{answer}} g.",
    tags: ["conversion", "masse", "reactivation"],
  },

  // 🔴 Durées

  {
    id: "3e_template_conversion_duree_001",
    niveau: "3e",
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
    id: "3e_template_vitesse_001",
    niveau: "3e",
    type: "calcul",
    mode: "template",
    notionId: "proportionnalite",
    microId: "vitesse_moyenne",
    difficulty: 3,
    durationSec: 20,
    media: { text: "{{v}} km/h pendant {{t}} h" },
    template: "{{v}} km/h pendant {{t}} h",
    variables: {
      v: [70, 80, 90, 110, 130],
      t: [1.5, 2, 2.5, 3],
    },
    answerRule: "v * t",
    hint: "Distance = vitesse × temps.",
    explanationTemplate:
      "{{v}} × {{t}} = {{answer}} km.",
    tags: ["vitesse", "distance"],
  },

  // 🔴 Aires

  {
    id: "3e_template_aire_001",
    niveau: "3e",
    type: "calcul",
    mode: "template",
    notionId: "aires",
    microId: "aire_rectangle",
    difficulty: 3,
    durationSec: 20,
    media: { text: "Rectangle : {{L}} m × {{l}} m" },
    template: "Rectangle : {{L}} m × {{l}} m",
    variables: {
      L: [10, 12, 15, 18],
      l: [4, 5, 6, 8],
    },
    answerRule: "L * l",
    hint: "Aire = longueur × largeur.",
    explanationTemplate:
      "{{L}} × {{l}} = {{answer}} m².",
    tags: ["aire"],
  },

  // 🔴 Volumes

  {
    id: "3e_template_volume_001",
    niveau: "3e",
    type: "calcul",
    mode: "template",
    notionId: "volumes",
    microId: "volume_contenance",
    difficulty: 3,
    durationSec: 20,
    media: { text: "{{n}} L = ? mL" },
    template: "{{n}} L = ? mL",
    variables: {
      n: [0.75, 1.25, 2.4, 3.5, 4.8],
    },
    answerRule: "n * 1000",
    hint: "1 L = 1000 mL.",
    explanationTemplate:
      "{{n}} × 1000 = {{answer}} mL.",
    tags: ["volume", "contenance"],
  },

  // 🔴 Piège brevet

  {
    id: "3e_template_piege_aire_001",
    niveau: "3e",
    type: "calcul",
    mode: "template",
    notionId: "aires",
    microId: "aire_unites",
    difficulty: 4,
    durationSec: 20,
    media: { text: "{{a}} cm × {{b}} cm = ? cm²" },
    template: "{{a}} cm × {{b}} cm = ? cm²",
    variables: {
      a: [4, 5, 6, 8, 10],
      b: [3, 4, 5, 6],
    },
    answerRule: "a * b",
    hint: "Attention à l’unité d’aire.",
    explanationTemplate:
      "{{a}} × {{b}} = {{answer}} cm².",
    tags: ["aire", "piege", "brevet"],
  },
];