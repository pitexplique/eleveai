// lib/calcul-rapide/data/cp/calculs.fixed.ts
//
// RÈGLE DU DÉPÔT : un générateur bat dix questions figées. Ce qu'on écrit en
// dur ici, ce sont donc les PIÈGES — ceux qu'on veut voir tomber au tableau,
// toujours avec les mêmes nombres, parce que c'est l'erreur qui compte.

import type { CalculRapideItem } from "../../types";

export const calculsFixedCP: CalculRapideItem[] = [
  {
    id: "cp_calcul_piege_zero_001",
    niveau: "CP",
    type: "calcul",
    mode: "fixed",
    notionId: "addition_soustraction",
    microId: "cp_sous_calculer",
    difficulty: 2,
    durationSec: 30,
    media: { text: "7 - 0 = ?" },
    expected: ["7"],
    hint: "Enlever zéro, c'est n'enlever aucun objet.",
    explanation: "7 - 0 = 7. On n'a rien retiré, il en reste 7.",
    tags: ["zero", "piege", "cp"],
  },

  {
    id: "cp_calcul_piege_commutativite_001",
    niveau: "CP",
    type: "calcul",
    mode: "fixed",
    notionId: "addition_soustraction",
    microId: "cp_add_calculer",
    difficulty: 2,
    durationSec: 30,
    media: { text: "Tu sais que 8 + 2 = 10. Alors 2 + 8 = ?" },
    expected: ["10"],
    hint: "Les deux nombres sont les mêmes, ils ont juste changé de place.",
    explanation: "2 + 8 = 10. Dans une addition, on peut échanger les deux nombres : le résultat ne change pas.",
    tags: ["commutativite", "piege", "cp"],
  },

  {
    id: "cp_calcul_piege_dix_plus_001",
    niveau: "CP",
    type: "calcul",
    mode: "fixed",
    notionId: "calcul_mental",
    microId: "cp_calcul_plus_moins_1_2_10",
    difficulty: 2,
    durationSec: 30,
    media: { text: "10 + 9 = ?" },
    expected: ["19"],
    hint: "Une dizaine, et neuf unités à côté.",
    explanation: "10 + 9 = 19. Attention : ce n'est pas 90 — le 9 reste dans les unités.",
    tags: ["dizaine", "piege", "cp"],
  },

  {
    id: "cp_calcul_piege_double_moitie_001",
    niveau: "CP",
    type: "calcul",
    mode: "fixed",
    notionId: "calcul_mental",
    microId: "cp_calcul_doubles",
    difficulty: 3,
    durationSec: 30,
    media: { text: "La moitié de 10, c'est 5. Et le double de 10 ?" },
    expected: ["20"],
    hint: "Le double, ça monte. La moitié, ça descend.",
    explanation: "Le double de 10, c'est 20. La moitié partage, le double rassemble deux fois la même quantité.",
    tags: ["double", "moitie", "piege", "cp"],
  },
];
