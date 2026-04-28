// lib/calcul-rapide/data/3e/problemes.fixed.ts

import type { CalculRapideItem } from "../../types";

export const problemesFixed3e: CalculRapideItem[] = [
  {
    id: "3e_probleme_vitesse_001",
    niveau: "3e",
    type: "probleme",
    mode: "fixed",
    notionId: "proportionnalite",
    microId: "vitesse",
    difficulty: 2,
    durationSec: 60,
    media: { text: "Un train parcourt 300 km en 3 h. Vitesse ?" },
    expected: ["100", "100 km/h"],
    hint: "v = d/t",
    explanation: "300 ÷ 3 = 100 km/h",
  },
  {
    id: "3e_probleme_pythagore_001",
    niveau: "3e",
    type: "probleme",
    mode: "fixed",
    notionId: "pythagore",
    microId: "pythagore_calcul",
    difficulty: 3,
    durationSec: 60,
    media: { text: "Triangle rectangle : 6 cm et 8 cm. Hypoténuse ?" },
    expected: ["10"],
    hint: "6² + 8²",
    explanation: "36 + 64 = 100 donc 10",
  },
];