// lib/calcul-rapide/data/seconde/calculs.fixed.ts
//
// Ici, les PIÈGES de Seconde — ceux qu'on veut voir tomber au tableau, avec
// toujours les mêmes nombres, parce que c'est l'erreur qui fait la leçon. Et
// les réponses littérales, que le générateur ne sait pas produire.
//
// La comparaison des réponses ignore les espaces et la casse : « (x-5)(x+5) »
// et « (x - 5)(x + 5) » sont acceptées toutes les deux, mais l'ordre des
// facteurs, lui, compte — d'où les variantes listées dans `expected`.

import type { CalculRapideItem } from "../../types";

export const calculsFixedSeconde: CalculRapideItem[] = [
  {
    id: "seconde_calcul_piege_carre_somme_001",
    niveau: "seconde",
    type: "calcul",
    mode: "fixed",
    notionId: "identites_remarquables_2de",
    microId: "ir_carre_somme",
    difficulty: 2,
    durationSec: 30,
    media: { text: "Un élève écrit (a + b)² = a² + b². A-t-il raison ? Réponds oui ou non." },
    expected: ["non"],
    hint: "Teste avec a = 1 et b = 1 : à gauche 4, à droite 2.",
    explanation: "Non. (a + b)² = a² + 2ab + b². C'est le double produit 2ab qu'on oublie — l'erreur la plus fréquente de la Seconde.",
    tags: ["identite_remarquable", "piege", "seconde"],
  },

  {
    id: "seconde_calcul_developper_carre_001",
    niveau: "seconde",
    type: "calcul",
    mode: "fixed",
    notionId: "identites_remarquables_2de",
    microId: "ir_carre_somme",
    difficulty: 3,
    durationSec: 30,
    media: { text: "Développe : (x + 3)²" },
    expected: ["x²+6x+9", "x^2+6x+9", "x2+6x+9"],
    hint: "(a + b)² = a² + 2ab + b², avec a = x et b = 3.",
    explanation: "(x + 3)² = x² + 2 × 3 × x + 3² = x² + 6x + 9.",
    tags: ["identite_remarquable", "seconde"],
  },

  {
    id: "seconde_calcul_factoriser_difference_001",
    niveau: "seconde",
    type: "calcul",
    mode: "fixed",
    notionId: "identites_remarquables_2de",
    microId: "ir_difference_carres",
    difficulty: 3,
    durationSec: 30,
    media: { text: "Factorise : x² - 25" },
    expected: ["(x-5)(x+5)", "(x+5)(x-5)"],
    hint: "25 est un carré : c'est une différence de deux carrés.",
    explanation: "x² - 25 = x² - 5² = (x - 5)(x + 5).",
    tags: ["identite_remarquable", "factorisation", "seconde"],
  },

  {
    id: "seconde_calcul_piege_racine_somme_001",
    niveau: "seconde",
    type: "calcul",
    mode: "fixed",
    notionId: "racine_carree_2de",
    microId: "racine_calcul",
    difficulty: 3,
    durationSec: 30,
    media: { text: "Combien vaut √(9 + 16) ?" },
    expected: ["5"],
    hint: "Calcule d'abord ce qu'il y a sous la racine.",
    explanation: "√(9 + 16) = √25 = 5. Et surtout pas √9 + √16 = 7 : la racine d'une somme n'est pas la somme des racines.",
    tags: ["racine", "piege", "seconde"],
  },

  {
    id: "seconde_calcul_piege_exposant_negatif_001",
    niveau: "seconde",
    type: "calcul",
    mode: "fixed",
    notionId: "puissances_2de",
    microId: "puiss_exposant_negatif",
    difficulty: 3,
    durationSec: 30,
    media: { text: "Combien vaut 2^(-3) ?" },
    expected: ["1/8", "0,125", "0.125"],
    hint: "Un exposant négatif ne rend pas le nombre négatif : il l'inverse.",
    explanation: "2^(-3) = 1 / 2³ = 1/8 = 0,125. Le résultat reste positif.",
    tags: ["puissances", "piege", "seconde"],
  },

  {
    id: "seconde_calcul_piege_evolution_001",
    niveau: "seconde",
    type: "calcul",
    mode: "fixed",
    notionId: "information_chiffree_evolutions",
    microId: "info_evolutions_successives",
    difficulty: 3,
    durationSec: 30,
    media: { text: "Un prix augmente de 20 %, puis baisse de 20 %. Est-il revenu à son prix de départ ? Réponds oui ou non." },
    expected: ["non"],
    hint: "La baisse ne porte pas sur le même prix que la hausse.",
    explanation: "Non : 1,2 × 0,8 = 0,96. Le prix a perdu 4 %. Les pourcentages ne s'additionnent pas.",
    tags: ["pourcentage", "piege", "seconde"],
  },
];
