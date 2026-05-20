// lib/calcul-rapide/data/6e/problemes.fixed.ts

import type { CalculRapideItem } from "../../types";

export const problemesFixed6e: CalculRapideItem[] = [
  // ============================================================
  // SEMAINE MESURES
  // ============================================================

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
    explanation: "2,4 × 1000 = 2400 m.",
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
    explanation: "6 ÷ 1,5 = 4. Il faut 4 bouteilles.",
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
    explanation: "4 × 3 = 12 m².",
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
    explanation: "3 × 1000 = 3000 g.",
    tags: ["masse", "reunion"],
  },

  // ============================================================
  // SEMAINE FRACTIONS
  // ============================================================

  {
    id: "6e_probleme_fraction_letchis_001",
    niveau: "6e",
    type: "probleme",
    mode: "fixed",
    notionId: "fractions",
    microId: "fraction_quantite",
    difficulty: 2,
    durationSec: 60,
    media: {
      text: "Au marché, un sac contient 24 letchis. On en mange 1/3. Combien de letchis sont mangés ?",
    },
    expected: ["8"],
    hint: "1/3, c’est diviser par 3.",
    explanation: "24 ÷ 3 = 8. On mange 8 letchis.",
    tags: ["fraction", "reunion"],
  },

  {
    id: "6e_probleme_fraction_bouteille_001",
    niveau: "6e",
    type: "probleme",
    mode: "fixed",
    notionId: "fractions",
    microId: "fraction_quantite",
    difficulty: 2,
    durationSec: 60,
    media: {
      text: "Une bouteille contient 1 L d’eau. Lina boit 1/4 de la bouteille. Combien de cL boit-elle ?",
    },
    expected: ["25", "25 cL", "25cl"],
    hint: "1 L = 100 cL, puis calcule le quart.",
    explanation: "1 L = 100 cL. Le quart de 100 cL est 25 cL.",
    tags: ["fraction", "contenance"],
  },

  {
    id: "6e_probleme_fraction_randonnee_001",
    niveau: "6e",
    type: "probleme",
    mode: "fixed",
    notionId: "fractions",
    microId: "fraction_quantite",
    difficulty: 2,
    durationSec: 60,
    media: {
      text: "Une randonnée mesure 12 km. La famille a parcouru les 3/4 du trajet. Combien de kilomètres a-t-elle parcourus ?",
    },
    expected: ["9", "9 km"],
    hint: "Calcule d’abord 1/4 de 12.",
    explanation: "1/4 de 12 = 3, donc 3/4 de 12 = 9 km.",
    tags: ["fraction", "reunion", "longueur"],
  },

  {
    id: "6e_probleme_fraction_gateau_001",
    niveau: "6e",
    type: "probleme",
    mode: "fixed",
    notionId: "fractions",
    microId: "fraction_comparer",
    difficulty: 2,
    durationSec: 60,
    media: {
      text: "Maya mange 1/2 d’un gâteau. Noé mange 1/4 du même gâteau. Qui a mangé le plus ?",
    },
    expected: ["Maya", "maya"],
    hint: "Compare 1/2 et 1/4.",
    explanation: "1/2 est plus grand que 1/4. Maya a mangé le plus.",
    tags: ["fraction", "comparer"],
  },
];