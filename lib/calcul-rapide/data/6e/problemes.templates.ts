// lib/calcul-rapide/data/6e/problemes.templates.ts

import type { CalculRapideItem } from "../../types";

export const problemesTemplates6e: CalculRapideItem[] = [
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
    template:
      "Une randonnée mesure {{km}} km. Combien cela fait-il en mètres ?",
    variables: {
      km: [2, 3.5, 4, 6.2],
    },
    answerRule: "km * 1000",
    hint: "1 km = 1000 m.",
    explanationTemplate:
      "{{km}} × 1000 = {{answer}} m.",
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
      cl: [150, 200, 250, 450, 600],
    },
    answerRule: "cl / 100",
    hint: "100 cL = 1 L.",
    explanationTemplate:
      "{{cl}} ÷ 100 = {{answer}} L.",
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
    template:
      "Une course dure {{h}} heures. Combien cela fait-il en minutes ?",
    variables: {
      h: [1, 2, 3, 4],
    },
    answerRule: "h * 60",
    hint: "1 heure = 60 minutes.",
    explanationTemplate:
      "{{h}} × 60 = {{answer}} minutes.",
    tags: ["duree"],
  },
];
