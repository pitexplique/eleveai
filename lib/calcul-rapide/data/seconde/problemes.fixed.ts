// lib/calcul-rapide/data/seconde/problemes.fixed.ts

import type { CalculRapideItem } from "../../types";

export const problemesFixedSeconde: CalculRapideItem[] = [
  {
    id: "seconde_probleme_piege_evolutions_001",
    niveau: "seconde",
    type: "probleme",
    mode: "fixed",
    notionId: "information_chiffree_evolutions",
    microId: "info_evolutions_successives",
    difficulty: 4,
    durationSec: 75,
    media: { text: "Un salaire augmente de 10 %, puis encore de 10 %. De combien a-t-il augmenté en tout, en pourcentage ?" },
    expected: ["21", "21 %", "21%"],
    hint: "Multiplie les coefficients au lieu d'additionner les taux.",
    explanation: "1,1 × 1,1 = 1,21, soit +21 % — et non +20 %. La deuxième hausse porte sur un salaire déjà augmenté.",
    tags: ["probleme", "pourcentage", "piege", "seconde"],
  },

  {
    id: "seconde_probleme_distance_001",
    niveau: "seconde",
    type: "probleme",
    mode: "fixed",
    notionId: "repere_coordonnees",
    microId: "repere_distance",
    difficulty: 3,
    durationSec: 75,
    media: { text: "Dans un repère orthonormé, A(1 ; 2) et B(4 ; 6). Quelle est la distance AB ?" },
    expected: ["5"],
    hint: "AB² = (xB - xA)² + (yB - yA)². C'est Pythagore, déguisé en coordonnées.",
    explanation: "AB = √(3² + 4²) = √25 = 5. Le triangle 3-4-5 se cache derrière beaucoup d'exercices.",
    tags: ["probleme", "repere", "seconde"],
  },

  {
    id: "seconde_probleme_piege_intervalle_001",
    niveau: "seconde",
    type: "probleme",
    mode: "fixed",
    notionId: "reels_intervalles",
    microId: "intervalle_appartenance",
    difficulty: 4,
    durationSec: 75,
    media: { text: "Combien y a-t-il de nombres entiers dans l'intervalle [-3 ; 4] ?" },
    expected: ["8"],
    hint: "Les crochets sont fermés : les bornes comptent. Et n'oublie pas zéro.",
    explanation: "-3, -2, -1, 0, 1, 2, 3, 4 : cela fait 8 entiers. On en oublie deux d'habitude — une borne, et le zéro.",
    tags: ["probleme", "intervalles", "piege", "seconde"],
  },
];
