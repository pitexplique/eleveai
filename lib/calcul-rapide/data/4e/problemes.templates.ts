// lib/calcul-rapide/data/4e/problemes.templates.ts

import type { CalculRapideItem } from "../../types";

export const problemesTemplates4e: CalculRapideItem[] = [
  // 🔵 RÉACTIVATION conversions

  {
    id: "4e_template_randonnee_001",
    niveau: "4e",
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
      km: [3.5, 4.2, 5.8, 7.4, 9.1],
    },
    answerRule: "km * 1000",
    hint: "1 km = 1000 m.",
    explanationTemplate:
      "{{km}} × 1000 = {{answer}} m.",
    tags: ["conversion", "longueur", "reunion"],
  },

  {
    id: "4e_template_volume_001",
    niveau: "4e",
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
      L: [0.75, 1.2, 1.5, 2.25, 3.4],
    },
    answerRule: "L * 1000",
    hint: "1 L = 1000 mL.",
    explanationTemplate:
      "{{L}} × 1000 = {{answer}} mL.",
    tags: ["volume", "contenance"],
  },

  // 🔴 Durées

  {
    id: "4e_template_duree_001",
    niveau: "4e",
    type: "probleme",
    mode: "template",
    notionId: "grandeurs_mesures",
    microId: "conversion_duree",
    difficulty: 3,
    durationSec: 60,
    media: {
      text: "Une activité dure {{h}} h {{m}} min. Quelle est la durée totale en minutes ?",
    },
    template:
      "Une activité dure {{h}} h {{m}} min. Quelle est la durée totale en minutes ?",
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
    type: "probleme",
    mode: "template",
    notionId: "proportionnalite",
    microId: "vitesse_simple",
    difficulty: 3,
    durationSec: 60,
    media: {
      text: "Une voiture roule à {{v}} km/h pendant {{t}} h. Quelle distance parcourt-elle ?",
    },
    template:
      "Une voiture roule à {{v}} km/h pendant {{t}} h. Quelle distance parcourt-elle ?",
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
    id: "4e_template_aire_001",
    niveau: "4e",
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
      L: [8, 10, 12, 15],
      l: [3, 4, 5, 6],
    },
    answerRule: "L * l",
    hint: "Aire = longueur × largeur.",
    explanationTemplate:
      "{{L}} × {{l}} = {{answer}} m².",
    tags: ["aire", "rectangle"],
  },

  // 🔴 Piège cognitif

  {
    id: "4e_template_piege_aire_001",
    niveau: "4e",
    type: "probleme",
    mode: "template",
    notionId: "aires",
    microId: "aire_unites",
    difficulty: 4,
    durationSec: 60,
    media: {
      text: "Un rectangle mesure {{a}} cm sur {{b}} cm. Un élève répond : “l’aire vaut {{r}} cm”. A-t-il raison ?",
    },
    template:
      "Un rectangle mesure {{a}} cm sur {{b}} cm. Un élève répond : “l’aire vaut {{r}} cm”. A-t-il raison ?",
    variables: {
      a: [3, 4, 5, 6],
      b: [2, 3, 4, 5],
      r: [6, 12, 20, 30],
    },
    answerRule: "'non'",
    hint: "Une aire s’exprime en cm².",
    explanationTemplate:
      "Le calcul est correct mais l’unité est fausse : il faut écrire cm².",
    tags: ["aire", "piege", "unites"],
  },

  // 🔴 Réactivation Pythagore

  {
    id: "4e_template_pythagore_001",
    niveau: "4e",
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
      a: [3, 5, 6, 8],
      b: [4, 12, 8, 15],
    },
    answerRule: "Math.sqrt(a*a + b*b)",
    hint: "Utilise le théorème de Pythagore.",
    explanationTemplate:
      "{{a}}² + {{b}}² = {{answer}}² donc hypoténuse = {{answer}} cm.",
    tags: ["pythagore", "triangle"],
  },
];