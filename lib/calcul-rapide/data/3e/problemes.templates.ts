// lib/calcul-rapide/data/3e/problemes.templates.ts

import type { CalculRapideItem } from "../../types";

export const problemesTemplates3e: CalculRapideItem[] = [
  {
    id: "3e_template_vitesse_001",
    niveau: "3e",
    type: "probleme",
    mode: "template",
    notionId: "proportionnalite",
    microId: "vitesse",
    difficulty: 2,
    durationSec: 60,
    media: { text: "{{d}} km en {{t}} h. Vitesse ?" },
    template: "{{d}} km en {{t}} h. Vitesse ?",
    variables: {
      d: [60, 120, 180],
      t: [1, 2, 3],
    },
    answerRule: "d / t",
    explanationTemplate: "{{answer}} km/h",
  },
];