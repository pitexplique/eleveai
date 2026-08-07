// lib/calcul-rapide/data/ce1/problemes.fixed.ts

import type { CalculRapideItem } from "../../types";

export const problemesFixedCE1: CalculRapideItem[] = [
  {
    id: "ce1_probleme_letchis_001",
    niveau: "CE1",
    type: "probleme",
    mode: "fixed",
    notionId: "masse",
    microId: "ce1_masse_probleme",
    difficulty: 2,
    durationSec: 75,
    media: { text: "Un régime de letchis pèse 3 kg. Maman en achète 4. Quelle masse cela fait-il en tout, en kg ?" },
    expected: ["12", "12 kg"],
    hint: "Quatre fois la même masse.",
    explanation: "4 × 3 = 12 kg.",
    tags: ["probleme", "masse", "974", "ce1"],
  },

  {
    id: "ce1_probleme_piege_reste_001",
    niveau: "CE1",
    type: "probleme",
    mode: "fixed",
    notionId: "division_partage",
    microId: "ce1_division_reste",
    difficulty: 3,
    durationSec: 75,
    media: { text: "Il y a 25 élèves. Le maître forme des équipes de 4. Combien d'équipes complètes peut-il faire ?" },
    expected: ["6"],
    hint: "Compte de 4 en 4 sans dépasser 25. Il restera peut-être quelqu'un.",
    explanation: "6 × 4 = 24, et il reste 1 élève. On peut donc faire 6 équipes complètes.",
    tags: ["probleme", "reste", "piege", "ce1"],
  },
];
