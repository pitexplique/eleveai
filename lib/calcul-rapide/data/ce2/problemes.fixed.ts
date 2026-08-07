// lib/calcul-rapide/data/ce2/problemes.fixed.ts

import type { CalculRapideItem } from "../../types";

export const problemesFixedCE2: CalculRapideItem[] = [
  {
    id: "ce2_probleme_perimetre_001",
    niveau: "CE2",
    type: "probleme",
    mode: "fixed",
    notionId: "perimetre",
    microId: "ce2_perimetre_rectangle",
    difficulty: 3,
    durationSec: 75,
    media: { text: "Le terrain de foot du quartier mesure 40 m de long et 25 m de large. Quel est son périmètre, en mètres ?" },
    expected: ["130", "130 m"],
    hint: "Le périmètre, c'est le tour complet : quatre côtés, deux longueurs et deux largeurs.",
    explanation: "40 + 25 + 40 + 25 = 130 m. Ou plus vite : (40 + 25) × 2 = 130 m.",
    tags: ["probleme", "perimetre", "974", "ce2"],
  },

  {
    id: "ce2_probleme_deux_etapes_001",
    niveau: "CE2",
    type: "probleme",
    mode: "fixed",
    notionId: "probleme",
    microId: "ce2_probleme_deux_etapes",
    difficulty: 3,
    durationSec: 75,
    media: { text: "Maman achète 3 paquets de 6 letchis. Elle en donne 5 à la voisine. Combien de letchis lui reste-t-il ?" },
    expected: ["13"],
    hint: "Compte d'abord tout ce qu'elle a acheté. Ensuite seulement, enlève.",
    explanation: "3 × 6 = 18 letchis, puis 18 - 5 = 13. Il lui en reste 13.",
    tags: ["probleme", "deux_etapes", "974", "ce2"],
  },
];
