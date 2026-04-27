// lib/calcul-rapide/data/3e/problemes.fixed.ts

import type { CalculRapideItem } from "../../types";

export const problemesFixed3e: CalculRapideItem[] = [
  {
    id: "3e_probleme_pythagore_001",
    niveau: "3e",
    type: "probleme",
    mode: "fixed",
    notionId: "pythagore",
    microId: "pythagore_calcul",
    difficulty: 2,
    durationSec: 60,
    media: {
      text: "Triangle rectangle : côtés 6 et 8. Hypoténuse ?",
    },
    expected: ["10"],
    hint: "6² + 8²",
    explanation: "36+64=100 → √100=10",
  },
  {
    id: "3e_probleme_pourcentage_001",
    niveau: "3e",
    type: "probleme",
    mode: "fixed",
    notionId: "proportionnalite",
    microId: "pourcentage",
    difficulty: 2,
    durationSec: 60,
    media: {
      text: "Prix 80€ augmente de 25%. Nouveau prix ?",
    },
    expected: ["100"],
    hint: "25% de 80",
    explanation: "80+20=100",
  },
];