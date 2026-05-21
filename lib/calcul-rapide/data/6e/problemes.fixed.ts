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
      text: "Un sentier mesure 3,7 km. Combien cela fait-il en mètres ?",
    },
    expected: ["3700"],
    hint: "1 km = 1000 m.",
    explanation: "3,7 × 1000 = 3700 m.",
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
      text: "Une bouteille contient 2 L. Combien faut-il de bouteilles pour obtenir 10 L ?",
    },
    expected: ["5"],
    hint: "Cherche combien de fois 2 est contenu dans 10.",
    explanation: "10 ÷ 2 = 5. Il faut 5 bouteilles.",
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
      text: "Une chambre mesure 5 m sur 4 m. Quelle est son aire ?",
    },
    expected: ["20", "20 m²", "20 m2"],
    hint: "Aire = longueur × largeur.",
    explanation: "5 × 4 = 20 m².",
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
      text: "Un pêcheur vend 4,5 kg de poisson. Quelle est cette masse en grammes ?",
    },
    expected: ["4500"],
    hint: "1 kg = 1000 g.",
    explanation: "4,5 × 1000 = 4500 g.",
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
      text: "Au marché, un sac contient 36 letchis. On en mange 1/3. Combien de letchis sont mangés ?",
    },
    expected: ["12"],
    hint: "1/3, c’est diviser par 3.",
    explanation: "36 ÷ 3 = 12. On mange 12 letchis.",
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
      text: "Une bouteille contient 2 L d’eau. Lina boit 1/4 de la bouteille. Combien de cL boit-elle ?",
    },
    expected: ["50", "50 cL", "50cl"],
    hint: "2 L = 200 cL, puis calcule le quart.",
    explanation: "2 L = 200 cL. Le quart de 200 cL est 50 cL.",
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
      text: "Une randonnée mesure 16 km. La famille a parcouru les 3/4 du trajet. Combien de kilomètres a-t-elle parcourus ?",
    },
    expected: ["12", "12 km"],
    hint: "Calcule d’abord 1/4 de 16.",
    explanation: "1/4 de 16 = 4, donc 3/4 de 16 = 12 km.",
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
      text: "Maya mange 1/3 d’un gâteau. Noé mange 1/2 du même gâteau. Qui a mangé le plus ?",
    },
    expected: ["Noé", "noé", "Noe", "noe"],
    hint: "Compare 1/3 et 1/2.",
    explanation: "1/2 est plus grand que 1/3. Noé a mangé le plus.",
    tags: ["fraction", "comparer"],
  },
];