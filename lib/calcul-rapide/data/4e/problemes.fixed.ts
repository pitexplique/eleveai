// lib/calcul-rapide/data/4e/problemes.fixed.ts

import type { CalculRapideItem } from "../../types";

export const problemesFixed4e: CalculRapideItem[] = [
  {
    id: "4e_probleme_pythagore_001",
    niveau: "4e",
    type: "probleme",
    mode: "fixed",
    notionId: "pythagore",
    microId: "pythagore_calcul",
    difficulty: 3,
    durationSec: 60,
    media: {
      text: "Triangle rectangle, côtés 3 cm et 4 cm. Hypoténuse ?",
    },
    expected: ["5"],
    hint: "3² + 4²",
    explanation: "9 + 16 = 25 donc √25 = 5",
  },
  {
    id: "4e_probleme_vitesse_001",
    niveau: "4e",
    type: "probleme",
    mode: "fixed",
    notionId: "proportionnalite",
    microId: "vitesse",
    difficulty: 2,
    durationSec: 60,
    media: {
      text: "Une voiture parcourt 120 km en 2 h. Vitesse ?",
    },
    expected: ["60", "60 km/h"],
    hint: "v = distance / temps",
    explanation: "120 ÷ 2 = 60 km/h",
  },
];