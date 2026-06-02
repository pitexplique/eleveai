import type { NotionSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

export const notions: NotionSource[] = [
  {
    id: "calcul_mental_utile",
    label: "Calculer vite dans la vie courante",
    boId: "ADULTE_CALCULS",
    prerequis: [],
    levels: [1, 2, 3],
  },
  {
    id: "argent_budget",
    label: "Gerer un budget simple",
    boId: "ADULTE_ARGENT",
    prerequis: ["calcul_mental_utile"],
    levels: [1, 2, 3],
  },
  {
    id: "prix_comparer",
    label: "Comparer des prix et des offres",
    boId: "ADULTE_ARGENT",
    prerequis: ["argent_budget"],
    levels: [1, 2, 3],
  },
  {
    id: "pourcentages_quotidien",
    label: "Utiliser les pourcentages au quotidien",
    boId: "ADULTE_POURCENTAGES",
    prerequis: ["calcul_mental_utile"],
    levels: [1, 2, 3],
  },
  {
    id: "proportionnalite_pratique",
    label: "Adapter des quantites",
    boId: "ADULTE_MESURES",
    prerequis: ["calcul_mental_utile"],
    levels: [1, 2, 3],
  },
  {
    id: "fractions_ratios",
    label: "Utiliser moitie, quart, tiers",
    boId: "ADULTE_CALCULS",
    prerequis: ["calcul_mental_utile"],
    levels: [1, 2, 3],
  },
  {
    id: "mesures_conversions",
    label: "Convertir des mesures courantes",
    boId: "ADULTE_MESURES",
    prerequis: ["calcul_mental_utile"],
    levels: [1, 2, 3],
  },
  {
    id: "durees_trajets",
    label: "Calculer des durees et des horaires",
    boId: "ADULTE_MESURES",
    prerequis: ["calcul_mental_utile"],
    levels: [1, 2, 3],
  },
  {
    id: "donnees_tableaux",
    label: "Lire un tableau ou une information chiffree",
    boId: "ADULTE_DONNEES",
    prerequis: ["calcul_mental_utile"],
    levels: [1, 2, 3],
  },
  {
    id: "statistiques_simples",
    label: "Moyennes et reperes simples",
    boId: "ADULTE_DONNEES",
    prerequis: ["donnees_tableaux"],
    levels: [1, 2, 3],
  },
];
