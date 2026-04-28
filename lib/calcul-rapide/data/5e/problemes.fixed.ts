// lib/calcul-rapide/data/5e/problemes.fixed.ts

import type { CalculRapideItem } from "../../types";

export const problemesFixed5e: CalculRapideItem[] = [
  {
    id: "5e_probleme_temperature_001",
    niveau: "5e",
    type: "probleme",
    mode: "fixed",
    notionId: "operations_relatifs",
    microId: "relatif_addition",
    difficulty: 2,
    durationSec: 60,
    media: {
      text: "À Cilaos, il fait -2 °C le matin. La température augmente de 7 °C. Quelle est la température ?",
    },
    expected: ["5", "5°", "5°C", "5 °C"],
    hint: "Calcule -2 + 7.",
    explanation: "-2 + 7 = 5. La température est donc de 5 °C.",
    tags: ["relatifs", "temperature", "reunion"],
  },
  {
    id: "5e_probleme_fraction_pizza_001",
    niveau: "5e",
    type: "probleme",
    mode: "fixed",
    notionId: "fractions",
    microId: "fraction_addition",
    difficulty: 3,
    durationSec: 60,
    media: {
      text: "Léna mange 1/4 d’une pizza et Sami mange 1/2 de la même pizza. Quelle fraction de pizza ont-ils mangée ensemble ?",
    },
    expected: ["3/4"],
    hint: "Écris 1/2 avec le dénominateur 4.",
    explanation: "1/2 = 2/4. Donc 1/4 + 2/4 = 3/4.",
    tags: ["fractions", "addition", "probleme"],
  },
  {
    id: "5e_probleme_proportionnalite_marche_001",
    niveau: "5e",
    type: "probleme",
    mode: "fixed",
    notionId: "proportionnalite",
    microId: "proportionnalite_calculer",
    difficulty: 2,
    durationSec: 60,
    media: {
      text: "Au marché de Saint-Pierre, 4 mangues coûtent 8 €. Combien coûtent 7 mangues ?",
    },
    expected: ["14", "14€", "14 €"],
    hint: "Cherche le prix d’une mangue.",
    explanation: "4 mangues coûtent 8 €, donc 1 mangue coûte 2 €. Alors 7 mangues coûtent 14 €.",
    tags: ["proportionnalite", "prix", "reunion"],
  },
  {
    id: "5e_probleme_aire_rectangle_001",
    niveau: "5e",
    type: "probleme",
    mode: "fixed",
    notionId: "aires",
    microId: "aire_rectangle",
    difficulty: 2,
    durationSec: 60,
    media: {
      text: "Un rectangle mesure 8 cm de longueur et 5 cm de largeur. Quelle est son aire ?",
    },
    expected: ["40", "40 cm²", "40 cm2", "40cm2"],
    hint: "Aire d’un rectangle = longueur × largeur.",
    explanation: "8 × 5 = 40. L’aire du rectangle est 40 cm².",
    tags: ["aire", "rectangle", "geometrie"],
  },
];