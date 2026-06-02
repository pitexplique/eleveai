import type { NotionSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

export const notions: NotionSource[] = [
  {
    id: "calcul_mental_utile",
    label: "Calcul mental utile",
    boId: "ADULTE_QUOTIDIEN",
    prerequis: [],
    levels: [1, 2, 3],
  },
  {
    id: "argent_budget",
    label: "Argent et budget",
    boId: "ADULTE_BUDGET",
    prerequis: ["calcul_mental_utile"],
    levels: [1, 2, 3],
  },
  {
    id: "prix_comparer",
    label: "Comparer des prix",
    boId: "ADULTE_BUDGET",
    prerequis: ["argent_budget"],
    levels: [1, 2, 3],
  },
  {
    id: "pourcentages_quotidien",
    label: "Pourcentages du quotidien",
    boId: "ADULTE_BUDGET",
    prerequis: ["calcul_mental_utile"],
    levels: [1, 2, 3],
  },
  {
    id: "proportionnalite_pratique",
    label: "Proportionnalité pratique",
    boId: "ADULTE_QUOTIDIEN",
    prerequis: ["calcul_mental_utile"],
    levels: [1, 2, 3],
  },
  {
    id: "fractions_ratios",
    label: "Fractions et ratios utiles",
    boId: "ADULTE_QUOTIDIEN",
    prerequis: ["calcul_mental_utile"],
    levels: [1, 2, 3],
  },
  {
    id: "mesures_conversions",
    label: "Mesures et conversions",
    boId: "ADULTE_QUOTIDIEN",
    prerequis: ["calcul_mental_utile"],
    levels: [1, 2, 3],
  },
  {
    id: "durees_trajets",
    label: "Durées, trajets et horaires",
    boId: "ADULTE_QUOTIDIEN",
    prerequis: ["calcul_mental_utile"],
    levels: [1, 2, 3],
  },
  {
    id: "donnees_tableaux",
    label: "Lire un tableau ou un graphique",
    boId: "ADULTE_DONNEES",
    prerequis: ["calcul_mental_utile"],
    levels: [1, 2, 3],
  },
  {
    id: "statistiques_simples",
    label: "Statistiques simples",
    boId: "ADULTE_DONNEES",
    prerequis: ["donnees_tableaux"],
    levels: [1, 2, 3],
  },
];
