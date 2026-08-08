import type { NotionSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

// Notions de seconde alignées sur le programme officiel (BO).
export const notions: NotionSource[] = [
  /* ===================== NOMBRES ET CALCULS (BO2N1) ===================== */
  {
    id: "reels_intervalles",
    label: "Nombres reels et intervalles",
    boId: "BO2N1",
    prerequis: [],
    levels: [1, 2, 3],
  },
  {
    id: "arithmetique_entiers",
    label: "Multiples, diviseurs et nombres premiers",
    boId: "BO2N1",
    prerequis: [],
    levels: [1, 2],
  },
  {
    id: "puissances_2de",
    label: "Puissances",
    boId: "BO2N1",
    prerequis: ["reels_intervalles"],
    levels: [1, 2, 3],
  },
  {
    id: "racine_carree_2de",
    label: "Racine carree",
    boId: "BO2N1",
    prerequis: ["reels_intervalles"],
    levels: [1, 2, 3],
  },
  {
    id: "developpement_factorisation_2de",
    label: "Developpement et factorisation",
    boId: "BO2N1",
    prerequis: ["reels_intervalles"],
    levels: [1, 2, 3],
  },
  {
    id: "identites_remarquables_2de",
    label: "Identites remarquables",
    boId: "BO2N1",
    prerequis: ["developpement_factorisation_2de"],
    levels: [1, 2, 3],
  },
  {
    id: "expressions_litterales_2de",
    label: "Expressions litterales",
    boId: "BO2N1",
    prerequis: ["developpement_factorisation_2de"],
    levels: [1, 2, 3],
  },
  {
    id: "equations_inequations_1er_degre",
    label: "Equations et inequations du premier degre",
    boId: "BO2N1",
    prerequis: ["developpement_factorisation_2de", "reels_intervalles"],
    levels: [1, 2, 3],
  },

  /* ===================== GEOMETRIE (BO2G1) ===================== */
  {
    id: "vecteurs_plan",
    label: "Vecteurs du plan",
    boId: "BO2G1",
    prerequis: [],
    levels: [1, 2, 3],
  },
  {
    id: "repere_coordonnees",
    label: "Repere et coordonnees",
    boId: "BO2G1",
    prerequis: ["reels_intervalles"],
    levels: [1, 2, 3],
  },
  {
    id: "droites_plan",
    label: "Droites du plan",
    boId: "BO2G1",
    prerequis: ["repere_coordonnees", "equations_inequations_1er_degre", "vecteurs_plan"],
    levels: [1, 2, 3],
  },
  {
    id: "geometrie_problemes_plan",
    label: "Problemes de geometrie plane",
    boId: "BO2G1",
    prerequis: [],
    levels: [1, 2, 3],
  },

  /* ===================== FONCTIONS (BO2F1) ===================== */
  {
    id: "fonction_vocabulaire_2de",
    label: "Fonctions : vocabulaire et representations",
    boId: "BO2F1",
    prerequis: ["reels_intervalles"],
    levels: [1, 2, 3],
  },
  {
    id: "fonction_variations_extremums",
    label: "Variations et extremums",
    boId: "BO2F1",
    prerequis: ["fonction_vocabulaire_2de"],
    levels: [1, 2, 3],
  },
  {
    id: "fonctions_affines_2de",
    label: "Fonctions affines",
    boId: "BO2F1",
    prerequis: ["fonction_vocabulaire_2de", "droites_plan"],
    levels: [1, 2, 3],
  },
  {
    id: "fonctions_reference_2de",
    label: "Fonctions de reference",
    boId: "BO2F1",
    prerequis: ["fonction_variations_extremums", "developpement_factorisation_2de"],
    levels: [1, 2, 3],
  },

  /* ===================== STATISTIQUES ET PROBABILITES (BO2D1) ===================== */
  {
    id: "information_chiffree_evolutions",
    label: "Information chiffree : proportions, pourcentages et evolutions",
    boId: "BO2D1",
    prerequis: [],
    levels: [1, 2, 3],
  },
  {
    id: "statistiques_descriptives",
    label: "Statistiques descriptives",
    boId: "BO2D1",
    prerequis: [],
    levels: [1, 2, 3],
  },
  {
    id: "probabilites_ensemble_fini",
    label: "Probabilites sur un ensemble fini",
    boId: "BO2D1",
    prerequis: ["reels_intervalles"],
    levels: [1, 2, 3],
  },
  {
    id: "echantillonnage_simulation",
    label: "Echantillonnage et simulation",
    boId: "BO2D1",
    prerequis: ["probabilites_ensemble_fini", "statistiques_descriptives"],
    levels: [2, 3],
  },

  /* ===================== ALGORITHMIQUE (BO2I1) ===================== */
  {
    id: "algorithmique_python_2de",
    label: "Algorithmique et Python",
    boId: "BO2I1",
    prerequis: ["expressions_litterales_2de"],
    levels: [1, 2, 3],
  },

  /* ===================== VOCABULAIRE ENSEMBLISTE ET LOGIQUE (BO2L1) ===================== */
  {
    id: "logique_ensembles",
    label: "Vocabulaire ensembliste et logique",
    boId: "BO2L1",
    prerequis: [],
    levels: [1, 2, 3],
  },
];
