// lib/calcul-rapide/data/5e/problemes.templates.ts

import type { CalculRapideItem } from "../../types";

export const problemesTemplates5e: CalculRapideItem[] = [
  {
    id: "5e_template_pourcentage_001",
    niveau: "5e",
    type: "probleme",
    mode: "template",
    notionId: "proportionnalite",
    microId: "prop_pourcentage",
    difficulty: 2,
    durationSec: 60,
    media: { text: "{{p}} % de {{n}}" },
    template: "{{p}} % de {{n}}",
    variables: {
      p: [10, 20, 25],
      n: [100, 150, 200],
    },
    answerRule: "(p/100)*n",
    explanationTemplate: "{{p}} % de {{n}} = {{answer}}",
  },
];