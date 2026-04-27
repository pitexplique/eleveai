// lib/calcul-rapide/data/5e/problemes.fixed.ts

import type { CalculRapideItem } from "../../types";

export const problemesFixed5e: CalculRapideItem[] = [
  {
    id: "5e_probleme_fraction_quantite_001",
    niveau: "5e",
    type: "probleme",
    mode: "fixed",
    notionId: "fractions",
    microId: "fraction_quantite",
    difficulty: 2,
    durationSec: 60,
    media: { text: "Quel est 3/4 de 80 ?" },
    expected: ["60"],
    hint: "1/4 = 20",
    explanation: "3 × 20 = 60.",
  },
  {
    id: "5e_probleme_volume_001",
    niveau: "5e",
    type: "probleme",
    mode: "fixed",
    notionId: "volumes",
    microId: "volume_pave",
    difficulty: 2,
    durationSec: 60,
    media: { text: "Un pavé de dimensions 5, 4 et 3 cm. Volume ?" },
    expected: ["60"],
    hint: "Volume = L × l × h",
    explanation: "5 × 4 × 3 = 60.",
  },
];