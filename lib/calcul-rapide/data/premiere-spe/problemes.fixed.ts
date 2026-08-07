// lib/calcul-rapide/data/premiere-spe/problemes.fixed.ts

import type { CalculRapideItem } from "../../types";

export const problemesFixedPremiereSpe: CalculRapideItem[] = [
  {
    id: "premiere_probleme_second_degre_001",
    niveau: "premiere-spe",
    type: "probleme",
    mode: "fixed",
    notionId: "second_degre",
    microId: "sd_racines",
    difficulty: 3,
    durationSec: 75,
    media: { text: "Résous x² - 5x + 6 = 0. Quelle est la plus grande des deux solutions ?" },
    expected: ["3"],
    hint: "Cherche deux nombres dont la somme fait 5 et le produit 6 — le discriminant n'est pas toujours le plus rapide.",
    explanation: "2 et 3 conviennent : leur somme fait 5, leur produit 6. La plus grande solution est 3.",
    tags: ["probleme", "second_degre", "premiere"],
  },

  {
    id: "premiere_probleme_tangente_horizontale_001",
    niveau: "premiere-spe",
    type: "probleme",
    mode: "fixed",
    notionId: "derivation",
    microId: "der_tangente",
    difficulty: 3,
    durationSec: 75,
    media: { text: "f(x) = x². La tangente à la courbe au point d'abscisse 0 est-elle horizontale ? Réponds oui ou non." },
    expected: ["oui"],
    hint: "Calcule f'(0) : une tangente horizontale a un coefficient directeur nul.",
    explanation: "Oui. f'(x) = 2x, donc f'(0) = 0 : la tangente au sommet de la parabole est horizontale.",
    tags: ["probleme", "derivation", "premiere"],
  },

  {
    id: "premiere_probleme_piege_incompatibles_001",
    niveau: "premiere-spe",
    type: "probleme",
    mode: "fixed",
    notionId: "probabilites_conditionnelles",
    microId: "pc_independance_incompatible",
    difficulty: 4,
    durationSec: 75,
    media: { text: "A et B sont incompatibles, avec P(A) = 0,3 et P(B) = 0,5. Combien vaut P(A ∪ B) ?" },
    expected: ["0,8", "0.8"],
    hint: "Incompatibles veut dire que les deux ne peuvent pas arriver ensemble : leur intersection est vide.",
    explanation: "P(A ∪ B) = P(A) + P(B) - P(A ∩ B), et P(A ∩ B) = 0 puisque les événements sont incompatibles. Donc 0,3 + 0,5 = 0,8. Attention : incompatibles n'est PAS synonyme d'indépendants.",
    tags: ["probleme", "probabilites", "piege", "premiere"],
  },
];
