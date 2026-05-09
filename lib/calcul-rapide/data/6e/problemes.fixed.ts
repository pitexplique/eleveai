// lib/calcul-rapide/data/6e/problemes.fixed.ts

import type { CalculRapideItem } from "../../types";

export const problemesFixed6e: CalculRapideItem[] = [
  {
    id: "6e_probleme_sentier_001",
    niveau: "6e",
    type: "probleme",
    mode: "fixed",
    notionId: "grandeurs_mesures",
    microId: "conversion_longueur",
    difficulty: 2,
    durationSec: 60,
    media: {
      text: "Un sentier mesure 2,4 km. Combien cela fait-il en mètres ?",
    },
    expected: ["2400"],
    hint: "1 km = 1000 m.",
    explanation:
      "2,4 × 1000 = 2400 m.",
    tags: ["longueur", "conversion"],
  },

  {
    id: "6e_probleme_bouteilles_001",
    niveau: "6e",
    type: "probleme",
    mode: "fixed",
    notionId: "grandeurs_mesures",
    microId: "conversion_contenance",
    difficulty: 2,
    durationSec: 60,
    media: {
      text: "Une bouteille contient 1,5 L. Combien faut-il de bouteilles pour obtenir 6 L ?",
    },
    expected: ["4"],
    hint: "Cherche combien de fois 1,5 est contenu dans 6.",
    explanation:
      "6 ÷ 1,5 = 4. Il faut 4 bouteilles.",
    tags: ["contenance"],
  },

  {
    id: "6e_probleme_chambre_001",
    niveau: "6e",
    type: "probleme",
    mode: "fixed",
    notionId: "aires",
    microId: "aire_rectangle",
    difficulty: 2,
    durationSec: 60,
    media: {
      text: "Une chambre mesure 4 m sur 3 m. Quelle est son aire ?",
    },
    expected: ["12", "12 m²", "12 m2"],
    hint: "Aire = longueur × largeur.",
    explanation:
      "4 × 3 = 12 m².",
    tags: ["aire"],
  },

  {
    id: "6e_probleme_poisson_001",
    niveau: "6e",
    type: "probleme",
    mode: "fixed",
    notionId: "grandeurs_mesures",
    microId: "conversion_masse",
    difficulty: 2,
    durationSec: 60,
    media: {
      text: "Un pêcheur vend 3 kg de poisson. Quelle est cette masse en grammes ?",
    },
    expected: ["3000"],
    hint: "1 kg = 1000 g.",
    explanation:
      "3 × 1000 = 3000 g.",
    tags: ["masse", "reunion"],
  },
];