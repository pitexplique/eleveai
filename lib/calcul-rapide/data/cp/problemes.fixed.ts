// lib/calcul-rapide/data/cp/problemes.fixed.ts

import type { CalculRapideItem } from "../../types";

export const problemesFixedCP: CalculRapideItem[] = [
  {
    id: "cp_probleme_letchis_001",
    niveau: "CP",
    type: "probleme",
    mode: "fixed",
    notionId: "probleme",
    microId: "cp_probleme_additif",
    difficulty: 2,
    durationSec: 75,
    media: { text: "Manon cueille 6 letchis. Son frère en cueille 4. Combien de letchis ont-ils en tout ?" },
    expected: ["10"],
    hint: "« En tout », c'est qu'on rassemble les deux tas.",
    explanation: "6 + 4 = 10 letchis.",
    tags: ["probleme", "974", "cp"],
  },

  {
    id: "cp_probleme_piege_deux_etapes_001",
    niveau: "CP",
    type: "probleme",
    mode: "fixed",
    notionId: "probleme",
    microId: "cp_probleme_soustractif",
    difficulty: 3,
    durationSec: 75,
    media: { text: "Il y a 9 samoussas. Papa en mange 3, maman en mange 2. Combien reste-t-il de samoussas ?" },
    expected: ["4"],
    hint: "Deux personnes en ont mangé : compte d'abord combien sont partis.",
    explanation: "3 + 2 = 5 samoussas mangés, puis 9 - 5 = 4. Il en reste 4.",
    tags: ["probleme", "deux_etapes", "974", "cp"],
  },
];
