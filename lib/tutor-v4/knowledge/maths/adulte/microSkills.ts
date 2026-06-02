import type { MicroSkillSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

export const microSkills: MicroSkillSource[] = [
  {
    id: "adulte_calcul_mental_total",
    label: "Calculer un total rapidement",
    notionId: "calcul_mental_utile",
    prerequis: [],
  },
  {
    id: "adulte_budget_reste",
    label: "Calculer ce qu'il reste dans un budget",
    notionId: "argent_budget",
    prerequis: ["adulte_calcul_mental_total"],
  },
  {
    id: "adulte_prix_unitaire",
    label: "Comparer deux prix unitaires",
    notionId: "prix_comparer",
    prerequis: ["adulte_calcul_mental_total"],
  },
  {
    id: "adulte_remise",
    label: "Calculer une remise simple",
    notionId: "pourcentages_quotidien",
    prerequis: ["adulte_calcul_mental_total"],
  },
  {
    id: "adulte_recette",
    label: "Adapter une recette ou une quantité",
    notionId: "proportionnalite_pratique",
    prerequis: ["adulte_calcul_mental_total"],
  },
  {
    id: "adulte_fraction_part",
    label: "Utiliser moitié, quart, tiers",
    notionId: "fractions_ratios",
    prerequis: ["adulte_calcul_mental_total"],
  },
  {
    id: "adulte_conversion_mesure",
    label: "Convertir une mesure courante",
    notionId: "mesures_conversions",
    prerequis: ["adulte_calcul_mental_total"],
  },
  {
    id: "adulte_horaire_duree",
    label: "Calculer une durée ou une heure d'arrivée",
    notionId: "durees_trajets",
    prerequis: ["adulte_calcul_mental_total"],
  },
  {
    id: "adulte_tableau_lire",
    label: "Lire une valeur dans un tableau",
    notionId: "donnees_tableaux",
    prerequis: ["adulte_calcul_mental_total"],
  },
  {
    id: "adulte_moyenne",
    label: "Calculer une moyenne simple",
    notionId: "statistiques_simples",
    prerequis: ["adulte_tableau_lire"],
  },
];
