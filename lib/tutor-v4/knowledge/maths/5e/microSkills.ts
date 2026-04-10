// knowledge/maths/5e/microSkills.ts

import type { MicroSkillSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

export const microSkills: MicroSkillSource[] = [

  // =========================
  // NOMBRES RELATIFS
  // =========================
  {
    id: "relatif_lire",
    label: "Lire un nombre relatif",
    notionId: "nombres_relatifs",
    prerequis: [],
  },
  {
    id: "relatif_comparer",
    label: "Comparer des relatifs",
    notionId: "nombres_relatifs",
    prerequis: ["relatif_lire"],
  },
  {
    id: "relatif_placer",
    label: "Placer sur une droite",
    notionId: "nombres_relatifs",
    prerequis: ["relatif_lire"],
  },
  {
    id: "relatif_opposes",
    label: "Trouver l’opposé",
    notionId: "nombres_relatifs",
    prerequis: ["relatif_lire"],
  },
  {
    id: "relatif_defis",
    label: "Défis relatifs",
    notionId: "nombres_relatifs",
    prerequis: ["relatif_comparer"],
  },

  // =========================
  // OPERATIONS RELATIFS
  // =========================
  {
    id: "relatif_addition",
    label: "Additionner des relatifs",
    notionId: "operations_relatifs",
    prerequis: ["relatif_lire"],
  },
  {
    id: "relatif_soustraction",
    label: "Soustraire des relatifs",
    notionId: "operations_relatifs",
    prerequis: ["relatif_addition"],
  },
  {
    id: "relatif_multiplication",
    label: "Multiplier des relatifs",
    notionId: "operations_relatifs",
    prerequis: ["relatif_addition"],
  },
  {
    id: "relatif_division",
    label: "Diviser des relatifs",
    notionId: "operations_relatifs",
    prerequis: ["relatif_multiplication"],
  },
  {
    id: "relatif_defis_ops",
    label: "Défis opérations",
    notionId: "operations_relatifs",
    prerequis: ["relatif_division"],
  },

  // =========================
  // FRACTIONS
  // =========================
  {
    id: "fraction_simplifier",
    label: "Simplifier une fraction",
    notionId: "fractions",
    prerequis: [],
  },
  {
    id: "fraction_comparer",
    label: "Comparer des fractions",
    notionId: "fractions",
    prerequis: ["fraction_simplifier"],
  },
  {
    id: "fraction_addition",
    label: "Additionner des fractions",
    notionId: "fractions",
    prerequis: ["fraction_comparer"],
  },
  {
    id: "fraction_multiplier",
    label: "Multiplier des fractions",
    notionId: "fractions",
    prerequis: ["fraction_simplifier"],
  },
  {
    id: "fraction_defis",
    label: "Défis fractions",
    notionId: "fractions",
    prerequis: ["fraction_multiplier"],
  },

  // =========================
  // PROPORTIONNALITE
  // =========================
  {
    id: "prop_table",
    label: "Utiliser un tableau",
    notionId: "proportionnalite",
    prerequis: [],
  },
  {
    id: "prop_coeff",
    label: "Coefficient de proportionnalité",
    notionId: "proportionnalite",
    prerequis: ["prop_table"],
  },
  {
    id: "prop_pourcentage",
    label: "Appliquer un pourcentage",
    notionId: "proportionnalite",
    prerequis: ["prop_coeff"],
  },
  {
    id: "prop_probleme",
    label: "Résoudre un problème",
    notionId: "proportionnalite",
    prerequis: ["prop_coeff"],
  },
  {
    id: "prop_defis",
    label: "Défis proportionnalité",
    notionId: "proportionnalite",
    prerequis: ["prop_probleme"],
  },

  // =========================
  // CALCUL LITTERAL
  // =========================
  {
    id: "litteral_expression",
    label: "Comprendre une expression",
    notionId: "calcul_litteral",
    prerequis: [],
  },
  {
    id: "litteral_substituer",
    label: "Substituer une valeur",
    notionId: "calcul_litteral",
    prerequis: ["litteral_expression"],
  },
  {
    id: "litteral_reduire",
    label: "Réduire une expression",
    notionId: "calcul_litteral",
    prerequis: ["litteral_expression"],
  },
  {
    id: "litteral_defis",
    label: "Défis littéral",
    notionId: "calcul_litteral",
    prerequis: ["litteral_reduire"],
  },

];