// microSkills6e.ts
import type { KnowledgeMicroSkill } from "@/lib/tutor-v4/types";

export const microSkills6e: KnowledgeMicroSkill[] = [

  /* =========================
     NOMBRES ENTIERS
  ========================= */
  { id: "entier_lire_ecrire", label: "Lire et écrire un nombre entier", notionId: "nombres_entiers", boId: "BO6N1", prerequis: [] },
  { id: "entier_rang", label: "Identifier le rang d’un chiffre", notionId: "nombres_entiers", boId: "BO6N1", prerequis: ["entier_lire_ecrire"] },
  { id: "entier_compare", label: "Comparer des nombres entiers", notionId: "nombres_entiers", boId: "BO6N1", prerequis: ["entier_lire_ecrire"] },
  { id: "entier_decomposer", label: "Décomposer un nombre entier", notionId: "nombres_entiers", boId: "BO6N1", prerequis: ["entier_rang"] },
  { id: "entier_encadrer", label: "Encadrer un nombre entier", notionId: "nombres_entiers", boId: "BO6N1", prerequis: ["entier_compare"] },
  { id: "entier_defis", label: "Défis sur les nombres entiers", notionId: "nombres_entiers", boId: "BO6N1", prerequis: ["entier_compare"] },

  /* =========================
     DECIMAUX
  ========================= */
  { id: "decimal_lire_ecrire", label: "Lire et écrire un nombre décimal", notionId: "decimaux", boId: "BO6N1", prerequis: ["entier_lire_ecrire"] },
  { id: "decimal_rang", label: "Identifier le rang d’un chiffre décimal", notionId: "decimaux", boId: "BO6N1", prerequis: ["decimal_lire_ecrire"] },
  { id: "decimal_compare", label: "Comparer des nombres décimaux", notionId: "decimaux", boId: "BO6N1", prerequis: ["decimal_rang"] },
  { id: "decimal_add", label: "Additionner des nombres décimaux", notionId: "decimaux", boId: "BO6N1", prerequis: ["decimal_lire_ecrire"] },
  { id: "decimal_multiply", label: "Multiplier des nombres décimaux", notionId: "decimaux", boId: "BO6N1", prerequis: ["decimal_add"] },
  { id: "decimal_divide_by_integer", label: "Diviser un nombre décimal par un entier", notionId: "decimaux", boId: "BO6N1", prerequis: ["decimal_lire_ecrire"] },
  { id: "decimal_defis", label: "Défis sur les nombres décimaux", notionId: "decimaux", boId: "BO6N1", prerequis: ["decimal_compare"] },

  /* =========================
     FRACTIONS
  ========================= */
  { id: "fraction_lire_ecrire", label: "Lire et écrire une fraction", notionId: "fractions", boId: "BO6N2", prerequis: ["decimal_lire_ecrire"] },
  { id: "fraction_representer", label: "Représenter une fraction", notionId: "fractions", boId: "BO6N2", prerequis: ["fraction_lire_ecrire"] },
  { id: "fraction_quantite", label: "Comprendre une fraction comme quantité", notionId: "fractions", boId: "BO6N2", prerequis: ["fraction_representer"] },
  { id: "fraction_decimal", label: "Relier fraction et décimal", notionId: "fractions", boId: "BO6N2", prerequis: ["fraction_quantite"] },
  { id: "fraction_compare", label: "Comparer des fractions", notionId: "fractions", boId: "BO6N2", prerequis: ["fraction_lire_ecrire"] },
  { id: "fraction_defis", label: "Défis sur les fractions", notionId: "fractions", boId: "BO6N2", prerequis: ["fraction_compare"] },

  /* =========================
     POURCENTAGES
  ========================= */
  { id: "pourcentage_comprendre", label: "Comprendre un pourcentage", notionId: "pourcentages", boId: "BO6N2", prerequis: ["fraction_quantite"] },
  { id: "pourcentage_fraction", label: "Relier pourcentage et fraction", notionId: "pourcentages", boId: "BO6N2", prerequis: ["pourcentage_comprendre"] },
  { id: "pourcentage_decimal", label: "Relier pourcentage et décimal", notionId: "pourcentages", boId: "BO6N2", prerequis: ["pourcentage_fraction"] },
  { id: "pourcentage_lire", label: "Lire un pourcentage", notionId: "pourcentages", boId: "BO6N2", prerequis: ["pourcentage_comprendre"] },
  { id: "pourcentage_calcul_simple", label: "Calculer un pourcentage simple", notionId: "pourcentages", boId: "BO6N2", prerequis: ["pourcentage_decimal"] },
  { id: "pourcentage_defis", label: "Défis sur les pourcentages", notionId: "pourcentages", boId: "BO6N2", prerequis: ["pourcentage_calcul_simple"] },

  /* =========================
     PROPORTIONNALITE
  ========================= */
  { id: "prop_reconnaitre", label: "Reconnaître une situation de proportionnalité", notionId: "proportionnalite", boId: "BO6N3", prerequis: ["pourcentage_comprendre"] },
  { id: "prop_table", label: "Compléter un tableau", notionId: "proportionnalite", boId: "BO6N3", prerequis: ["prop_reconnaitre"] },
  { id: "prop_coeff", label: "Utiliser un coefficient", notionId: "proportionnalite", boId: "BO6N3", prerequis: ["prop_table"] },
  { id: "prop_unit", label: "Passer par l’unité", notionId: "proportionnalite", boId: "BO6N3", prerequis: ["prop_table"] },
  { id: "prop_direct", label: "Résoudre une situation", notionId: "proportionnalite", boId: "BO6N3", prerequis: ["prop_coeff"] },
  { id: "prop_defis", label: "Défis de proportionnalité", notionId: "proportionnalite", boId: "BO6N3", prerequis: ["prop_direct"] },

  /* =========================
     CALCUL MENTAL
  ========================= */
  { id: "mental_addition", label: "Addition mentale", notionId: "calcul_mental", boId: "BO6N4", prerequis: [] },
  { id: "mental_subtraction", label: "Soustraction mentale", notionId: "calcul_mental", boId: "BO6N4", prerequis: ["mental_addition"] },
  { id: "mental_multiplication", label: "Multiplication mentale", notionId: "calcul_mental", boId: "BO6N4", prerequis: ["mental_addition"] },
  { id: "mental_division", label: "Division mentale", notionId: "calcul_mental", boId: "BO6N4", prerequis: ["mental_multiplication"] },
  { id: "mental_strategies", label: "Stratégies de calcul mental", notionId: "calcul_mental", boId: "BO6N4", prerequis: ["mental_addition"] },
  { id: "mental_defis", label: "Défis de calcul mental", notionId: "calcul_mental", boId: "BO6N4", prerequis: ["mental_strategies"] }

];