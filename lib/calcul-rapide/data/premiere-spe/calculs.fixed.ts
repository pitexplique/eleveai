// lib/calcul-rapide/data/premiere-spe/calculs.fixed.ts
//
// Les pièges de Première, et les réponses littérales que le générateur ne
// sait pas produire. Les valeurs remarquables de trigonométrie sont ici :
// elles se savent, elles ne se calculent pas.

import type { CalculRapideItem } from "../../types";

export const calculsFixedPremiereSpe: CalculRapideItem[] = [
  {
    id: "premiere_calcul_trig_cos_pi3_001",
    niveau: "premiere-spe",
    type: "calcul",
    mode: "fixed",
    notionId: "trigonometrie",
    microId: "trig_valeurs",
    difficulty: 3,
    durationSec: 30,
    media: { text: "Combien vaut cos(π/3) ?" },
    expected: ["1/2", "0,5", "0.5"],
    hint: "π/3, c'est 60°. Pense au triangle équilatéral coupé en deux.",
    explanation: "cos(π/3) = 1/2. Et sin(π/3) = √3/2 — on les échange souvent.",
    tags: ["trigonometrie", "premiere"],
  },

  {
    id: "premiere_calcul_trig_cos_pi_001",
    niveau: "premiere-spe",
    type: "calcul",
    mode: "fixed",
    notionId: "trigonometrie",
    microId: "trig_cercle",
    difficulty: 3,
    durationSec: 30,
    media: { text: "Combien vaut cos(π) ?" },
    expected: ["-1"],
    hint: "Place π sur le cercle trigonométrique : un demi-tour.",
    explanation: "cos(π) = -1. Le point d'arrivée est à gauche du cercle, d'abscisse -1.",
    tags: ["trigonometrie", "piege", "premiere"],
  },

  {
    id: "premiere_calcul_derivee_inverse_001",
    niveau: "premiere-spe",
    type: "calcul",
    mode: "fixed",
    notionId: "derivation",
    microId: "der_usuelles",
    difficulty: 3,
    durationSec: 30,
    media: { text: "f(x) = 1/x. Que vaut f'(x) ?" },
    expected: ["-1/x²", "-1/x^2", "-1/x2"],
    hint: "Le signe compte autant que l'expression : la fonction inverse décroît.",
    explanation: "f'(x) = -1/x². Le signe moins traduit que la fonction inverse est décroissante sur chaque intervalle.",
    tags: ["derivation", "premiere"],
  },

  {
    id: "premiere_calcul_piege_derivee_produit_001",
    niveau: "premiere-spe",
    type: "calcul",
    mode: "fixed",
    notionId: "derivation",
    microId: "der_operations",
    difficulty: 3,
    durationSec: 30,
    media: { text: "Un élève écrit (uv)' = u'v'. A-t-il raison ? Réponds oui ou non." },
    expected: ["non"],
    hint: "Teste avec u = x et v = x : à droite tu trouverais 1.",
    explanation: "Non. (uv)' = u'v + uv'. Avec u = v = x : (x²)' = 2x, et non 1 × 1 = 1.",
    tags: ["derivation", "piege", "premiere"],
  },

  {
    id: "premiere_calcul_piege_exp_somme_001",
    niveau: "premiere-spe",
    type: "calcul",
    mode: "fixed",
    notionId: "exponentielle",
    microId: "exp_proprietes",
    difficulty: 3,
    durationSec: 30,
    media: { text: "On sait que e^a × e^b = e^(a+b). Et e^a + e^b, cela se simplifie-t-il en e^(ab) ? Réponds oui ou non." },
    expected: ["non"],
    hint: "Les règles portent sur les PRODUITS d'exponentielles, jamais sur les sommes.",
    explanation: "Non. Une somme d'exponentielles ne se simplifie pas. Seuls les produits et quotients se transforment en sommes et différences d'exposants.",
    tags: ["exponentielle", "piege", "premiere"],
  },

  {
    id: "premiere_calcul_piege_discriminant_nul_001",
    niveau: "premiere-spe",
    type: "calcul",
    mode: "fixed",
    notionId: "second_degre",
    microId: "sd_racines",
    difficulty: 2,
    durationSec: 30,
    media: { text: "Le discriminant d'une équation du second degré vaut 0. Combien l'équation a-t-elle de solutions ?" },
    expected: ["1", "une"],
    hint: "La parabole touche l'axe des abscisses sans le traverser.",
    explanation: "Une seule solution, x = -b/(2a). On l'appelle racine double : c'est une racine, comptée deux fois.",
    tags: ["second_degre", "premiere"],
  },
];
