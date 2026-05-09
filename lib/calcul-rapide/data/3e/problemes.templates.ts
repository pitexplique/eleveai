// lib/calcul-rapide/data/3e/problemes.templates.ts

import type { CalculRapideItem } from "../../types";

export const problemesTemplates3e: CalculRapideItem[] = [
  // 🔵 RÉACTIVATION conversions

  {
    id: "3e_template_randonnee_001",
    niveau: "3e",
    type: "probleme",
    mode: "template",
    notionId: "grandeurs_mesures",
    microId: "conversion_longueur",
    difficulty: 2,
    durationSec: 60,
    media: {
      text: "Une randonnée mesure {{km}} km. Combien cela représente-t-il en mètres ?",
    },
    template:
      "Une randonnée mesure {{km}} km. Combien cela représente-t-il en mètres ?",
    variables: {
      km: [5.2, 7.5, 8.4, 10.8, 12.5],
    },
    answerRule: "km * 1000",
    hint: "1 km = 1000 m.",
    explanationTemplate:
      "{{km}} × 1000 = {{answer}} m.",
    tags: ["conversion", "longueur", "reactivation"],
  },

  // 🔴 Vitesses

  {
    id: "3e_template_vitesse_001",
    niveau: "3e",
    type: "probleme",
    mode: "template",
    notionId: "proportionnalite",
    microId: "vitesse_moyenne",
    difficulty: 3,
    durationSec: 60,
    media: {
      text: "Une voiture roule à {{v}} km/h pendant {{t}} h. Quelle distance parcourt-elle ?",
    },
    template:
      "Une voiture roule à {{v}} km/h pendant {{t}} h. Quelle distance parcourt-elle ?",
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

  {
    id: "3e_template_vitesse_moyenne_001",
    niveau: "3e",
    type: "probleme",
    mode: "template",
    notionId: "proportionnalite",
    microId: "vitesse_moyenne",
    difficulty: 3,
    durationSec: 60,
    media: {
      text: "Une distance de {{d}} km est parcourue en {{t}} h. Quelle est la vitesse moyenne ?",
    },
    template:
      "Une distance de {{d}} km est parcourue en {{t}} h. Quelle est la vitesse moyenne ?",
    variables: {
      d: [120, 180, 240, 300, 360],
      t: [2, 3, 4, 5],
    },
    answerRule: "d / t",
    hint: "Vitesse = distance ÷ temps.",
    explanationTemplate:
      "{{d}} ÷ {{t}} = {{answer}} km/h.",
    tags: ["vitesse", "moyenne"],
  },

  // 🔴 Aires

  {
    id: "3e_template_aire_001",
    niveau: "3e",
    type: "probleme",
    mode: "template",
    notionId: "aires",
    microId: "aire_rectangle",
    difficulty: 3,
    durationSec: 60,
    media: {
      text: "Une terrasse mesure {{L}} m sur {{l}} m. Quelle est son aire ?",
    },
    template:
      "Une terrasse mesure {{L}} m sur {{l}} m. Quelle est son aire ?",
    variables: {
      L: [12, 15, 18, 20],
      l: [4, 5, 6, 8],
    },
    answerRule: "L * l",
    hint: "Aire = longueur × largeur.",
    explanationTemplate:
      "{{L}} × {{l}} = {{answer}} m².",
    tags: ["aire", "rectangle"],
  },

  // 🔴 Volumes

  {
    id: "3e_template_volume_001",
    niveau: "3e",
    type: "probleme",
    mode: "template",
    notionId: "volumes",
    microId: "volume_contenance",
    difficulty: 3,
    durationSec: 60,
    media: {
      text: "Une bouteille contient {{L}} L. Quelle quantité cela représente-t-il en mL ?",
    },
    template:
      "Une bouteille contient {{L}} L. Quelle quantité cela représente-t-il en mL ?",
    variables: {
      L: [1.25, 2.4, 3.5, 4.2, 5.8],
    },
    answerRule: "L * 1000",
    hint: "1 L = 1000 mL.",
    explanationTemplate:
      "{{L}} × 1000 = {{answer}} mL.",
    tags: ["volume", "contenance"],
  },

  // 🔴 Piège brevet

  {
    id: "3e_template_piege_aire_001",
    niveau: "3e",
    type: "probleme",
    mode: "template",
    notionId: "aires",
    microId: "aire_unites",
    difficulty: 4,
    durationSec: 60,
    media: {
      text: "Un élève écrit : “l’aire d’un rectangle de {{a}} cm sur {{b}} cm vaut {{r}} cm”. A-t-il raison ?",
    },
    template:
      "Un élève écrit : “l’aire d’un rectangle de {{a}} cm sur {{b}} cm vaut {{r}} cm”. A-t-il raison ?",
    variables: {
      a: [4, 5, 6, 8],
      b: [3, 4, 5, 6],
      r: [12, 20, 30, 48],
    },
    answerRule: "'non'",
    hint: "Attention à l’unité d’aire.",
    explanationTemplate:
      "Le calcul est correct mais l’unité correcte est cm².",
    tags: ["aire", "piege", "brevet"],
  },

  // 🔴 Réactivation Pythagore

  {
    id: "3e_template_pythagore_001",
    niveau: "3e",
    type: "probleme",
    mode: "template",
    notionId: "pythagore",
    microId: "pythagore_calcul",
    difficulty: 4,
    durationSec: 60,
    media: {
      text: "Dans un triangle rectangle, les côtés de l’angle droit mesurent {{a}} cm et {{b}} cm. Quelle est l’hypoténuse ?",
    },
    template:
      "Dans un triangle rectangle, les côtés de l’angle droit mesurent {{a}} cm et {{b}} cm. Quelle est l’hypoténuse ?",
    variables: {
      a: [5, 6, 8, 9],
      b: [12, 8, 15, 12],
    },
    answerRule: "Math.sqrt(a*a + b*b)",
    hint: "Utilise le théorème de Pythagore.",
    explanationTemplate:
      "{{a}}² + {{b}}² = {{answer}}² donc hypoténuse = {{answer}} cm.",
    tags: ["pythagore", "triangle", "brevet"],
  },
];