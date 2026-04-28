// lib/calcul-rapide/data/3e/problemes.templates.ts

import type { CalculRapideItem } from "../../types";

export const problemesTemplates3e: CalculRapideItem[] = [
  {
    id: "3e_template_pourcentage_001",
    niveau: "3e",
    type: "probleme",
    mode: "template",
    notionId: "proportionnalite",
    microId: "pourcentage",
    difficulty: 2,
    durationSec: 60,
    media: { text: "{{p}} % de {{n}}" },
    template: "{{p}} % de {{n}}",
    variables: {
      p: [15, 20, 25],
      n: [200, 300, 400],
    },
    answerRule: "(p/100)*n",
    explanationTemplate: "{{p}} % de {{n}} = {{answer}}",
  },
];