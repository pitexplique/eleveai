// lib/calcul-rapide/data/ce1/calculs.fixed.ts
//
// Les pièges du CE1 tournent tous autour de la multiplication qui arrive :
// le zéro qui écrase, le un qui ne change rien, l'ordre qui ne compte pas.

import type { CalculRapideItem } from "../../types";

export const calculsFixedCE1: CalculRapideItem[] = [
  {
    id: "ce1_calcul_piege_x0_001",
    niveau: "CE1",
    type: "calcul",
    mode: "fixed",
    notionId: "multiplication",
    microId: "ce1_multiplication_calculer",
    difficulty: 2,
    durationSec: 30,
    media: { text: "6 × 0 = ?" },
    expected: ["0"],
    hint: "Six paquets… de zéro objet chacun.",
    explanation: "6 × 0 = 0. Six fois rien, ça fait rien.",
    tags: ["zero", "piege", "ce1"],
  },

  {
    id: "ce1_calcul_piege_x1_001",
    niveau: "CE1",
    type: "calcul",
    mode: "fixed",
    notionId: "multiplication",
    microId: "ce1_multiplication_calculer",
    difficulty: 1,
    durationSec: 30,
    media: { text: "7 × 1 = ?" },
    expected: ["7"],
    hint: "Un seul paquet de sept.",
    explanation: "7 × 1 = 7. Multiplier par 1 ne change rien.",
    tags: ["piege", "ce1"],
  },

  {
    id: "ce1_calcul_piege_ordre_001",
    niveau: "CE1",
    type: "calcul",
    mode: "fixed",
    notionId: "multiplication",
    microId: "ce1_multiplication_sens",
    difficulty: 2,
    durationSec: 30,
    media: { text: "5 × 4 = 20. Alors 4 × 5 = ?" },
    expected: ["20"],
    hint: "4 rangées de 5, ou 5 rangées de 4 : c'est le même rectangle.",
    explanation: "4 × 5 = 20. Dans une multiplication, on peut échanger les deux nombres.",
    tags: ["commutativite", "piege", "ce1"],
  },

  {
    id: "ce1_calcul_piege_double_001",
    niveau: "CE1",
    type: "calcul",
    mode: "fixed",
    notionId: "calcul_mental",
    microId: "ce1_calcul_doubles_moities",
    difficulty: 3,
    durationSec: 30,
    media: { text: "La moitié de 50, c'est 25. Et le double de 50 ?" },
    expected: ["100"],
    hint: "La moitié descend, le double monte.",
    explanation: "Le double de 50, c'est 100. Ne pas confondre : la moitié partage en deux, le double prend deux fois.",
    tags: ["double", "moitie", "piege", "ce1"],
  },
];
