// lib/calcul-rapide/data/ce2/calculs.fixed.ts

import type { CalculRapideItem } from "../../types";

export const calculsFixedCE2: CalculRapideItem[] = [
  {
    id: "ce2_calcul_piege_7x8_001",
    niveau: "CE2",
    type: "calcul",
    mode: "fixed",
    notionId: "multiplication",
    microId: "ce2_tables_6_7_8_9",
    difficulty: 3,
    durationSec: 30,
    media: { text: "7 × 8 = ?" },
    expected: ["56"],
    hint: "Celui-là, il faut le savoir par cœur : 5, 6, 7, 8 → 56 = 7 × 8.",
    explanation: "7 × 8 = 56. C'est le produit le plus souvent raté de toutes les tables.",
    tags: ["table", "piege", "ce2"],
  },

  {
    id: "ce2_calcul_piege_produit_zero_001",
    niveau: "CE2",
    type: "calcul",
    mode: "fixed",
    notionId: "multiplication",
    microId: "ce2_multiplication_sens",
    difficulty: 3,
    durationSec: 30,
    media: { text: "3 × 4 × 0 = ?" },
    expected: ["0"],
    hint: "Regarde bien tous les facteurs avant de calculer.",
    explanation: "3 × 4 × 0 = 0. Dès qu'un seul facteur vaut 0, tout le produit vaut 0.",
    tags: ["zero", "piege", "ce2"],
  },

  {
    id: "ce2_calcul_piege_moitie_1000_001",
    niveau: "CE2",
    type: "calcul",
    mode: "fixed",
    notionId: "calcul_mental",
    microId: "ce2_calcul_doubles_moities",
    difficulty: 3,
    durationSec: 30,
    media: { text: "La moitié de 100, c'est 50. Et la moitié de 1000 ?" },
    expected: ["500"],
    hint: "Dix fois plus grand au départ, donc dix fois plus grand à l'arrivée.",
    explanation: "La moitié de 1000, c'est 500. Ce n'est pas 50 : 1000 vaut dix fois 100.",
    tags: ["moitie", "piege", "ce2"],
  },

  {
    id: "ce2_calcul_piege_chiffre_nombre_001",
    niveau: "CE2",
    type: "calcul",
    mode: "fixed",
    notionId: "nombre_entier",
    microId: "ce2_entier_decomposer",
    difficulty: 3,
    durationSec: 30,
    media: { text: "Dans 247, combien y a-t-il de dizaines en tout ?" },
    expected: ["24"],
    hint: "Attention : on ne demande pas le CHIFFRE des dizaines, mais combien de dizaines contient le nombre.",
    explanation: "247 = 24 dizaines et 7 unités. Le chiffre des dizaines est 4, mais le NOMBRE de dizaines est 24.",
    tags: ["numeration", "piege", "ce2"],
  },
];
