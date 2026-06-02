import type { CalculRapideItem } from "../../types";

export const problemesFixedCM1: CalculRapideItem[] = [
  {
    id: "cm1_probleme_partage_billes_001",
    niveau: "CM1",
    type: "probleme",
    mode: "fixed",
    notionId: "problemes",
    microId: "partage_equitable",
    difficulty: 2,
    durationSec: 60,
    media: {
      text: "On partage 48 billes entre 6 enfants. Combien chacun reçoit-il ?",
    },
    expected: ["8"],
    hint: "Cherche 48 ÷ 6.",
    explanation: "48 ÷ 6 = 8 billes.",
    tags: ["partage", "division"],
  },
];
