// lib/calcul-rapide/data/4e/problemes.templates.ts

import type { CalculRapideItem } from "../../types";

export const problemesTemplates4e: CalculRapideItem[] = [
  {
    id: "4e_template_pourcentage_001",
    niveau: "4e",
    type: "probleme",
    mode: "template",
    notionId: "proportionnalite",
    microId: "pourcentage",
    difficulty: 2,
    durationSec: 60,
    media: { text: "{{p}} % de {{n}}" },
    template: "{{p}} % de {{n}}",
    variables: {
      p: [10, 20, 30],
      n: [100, 200, 300],
    },
    answerRule: "(p/100)*n",
    explanationTemplate: "{{p}} % de {{n}} = {{answer}}",
  },
];