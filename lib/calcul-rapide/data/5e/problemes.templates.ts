// lib/calcul-rapide/data/5e/problemes.templates.ts

import type { CalculRapideItem } from "../../types";

export const problemesTemplates5e: CalculRapideItem[] = [
  {
    id: "5e_template_randonnee_001",
    niveau: "5e",
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
      km: [2.5, 4, 5.2, 7.5, 9],
    },
    answerRule: "km * 1000",
    hint: "1 km = 1000 m.",
    explanationTemplate:
      "{{km}} × 1000 = {{answer}} m.",
    tags: ["longueur", "conversion", "reunion"],
  },

  {
    id: "5e_template_bouteille_001",
    niveau: "5e",
    type: "probleme",
    mode: "template",
    notionId: "grandeurs_mesures",
    microId: "conversion_contenance",
    difficulty: 2,
    durationSec: 60,
    media: {
      text: "Une bouteille contient {{L}} L de jus. Quelle quantité cela représente-t-il en cL ?",
    },
    template:
      "Une bouteille contient {{L}} L de jus. Quelle quantité cela représente-t-il en cL ?",
    variables: {
      L: [1.25, 1.5, 2, 2.5, 3],
    },
    answerRule: "L * 100",
    hint: "1 L = 100 cL.",
    explanationTemplate:
      "{{L}} × 100 = {{answer}} cL.",
    tags: ["contenance"],
  },

  {
    id: "5e_template_course_001",
    niveau: "5e",
    type: "probleme",
    mode: "template",
    notionId: "grandeurs_mesures",
    microId: "conversion_duree",
    difficulty: 3,
    durationSec: 60,
    media: {
      text: "Une course dure {{h}} h {{m}} min. Quelle est la durée totale en minutes ?",
    },
    template:
      "Une course dure {{h}} h {{m}} min. Quelle est la durée totale en minutes ?",
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

  {
    id: "5e_template_vitesse_001",
    niveau: "5e",
    type: "probleme",
    mode: "template",
    notionId: "proportionnalite",
    microId: "vitesse_simple",
    difficulty: 3,
    durationSec: 60,
    media: {
      text: "Une voiture roule à {{v}} km/h pendant {{t}} heures. Quelle distance parcourt-elle ?",
    },
    template:
      "Une voiture roule à {{v}} km/h pendant {{t}} heures. Quelle distance parcourt-elle ?",
    variables: {
      v: [60, 70, 80, 90, 100],
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
    type: "probleme",
    mode: "template",
    notionId: "aires",
    microId: "aire_rectangle",
    difficulty: 3,
    durationSec: 60,
    media: {
      text: "Une terrasse mesure {{L}} m de longueur et {{l}} m de largeur. Quelle est son aire ?",
    },
    template:
      "Une terrasse mesure {{L}} m de longueur et {{l}} m de largeur. Quelle est son aire ?",
    variables: {
      L: [5, 6, 7, 8, 10],
      l: [3, 4, 5, 6],
    },
    answerRule: "L * l",
    hint: "Aire = longueur × largeur.",
    explanationTemplate:
      "{{L}} × {{l}} = {{answer}} m².",
    tags: ["aire", "rectangle"],
  },
];