// lib/tutor-v4/knowledge/maths/terminale-spe/matrixTerminaleSpeMaths.ts

import type { SkillMatrix, MatrixValue } from "@/lib/tutor-v4/types";
import { microSkills } from "@/lib/tutor-v4/knowledge/maths/terminale-spe/microSkills";

/**
 * Index des micro-compétences
 */
export const microSkillIndexTerminaleSpeMaths = microSkills.map((m) => m.id);

/**
 * Liens forts (prérequis directs)
 */
const directParents: Record<string, string[]> = Object.fromEntries(
  microSkills.map((m) => [m.id, m.prerequis])
);

/**
 * Liens secondaires
 *
 * Objectif :
 * - renforcer les dépendances transversales importantes ;
 * - aider Coach IA / Tutor V4 à mieux diagnostiquer les blocages ;
 * - relier les notions bac entre elles.
 */
const supportLinks: Record<string, string[]> = {
  // =========================
  // SUITES
  // =========================
  suite_recurrence_preuve: ["suite_calculer_termes"],
  suite_variation: ["derivation_variation"],
  suite_bornee: ["suite_variation"],
  suite_defi: [
    "suite_recurrence_preuve",
    "suite_variation",
    "suite_bornee",
    "limite_suite_interpreter",
  ],

  // =========================
  // LIMITES DE SUITES
  // =========================
  limite_suite_calculer: ["limite_fonction_reference"],
  limite_suite_operations: ["limite_fonction_operations"],
  limite_suite_comparaison: ["suite_bornee"],
  limite_suite_monotone_bornee: ["suite_variation", "suite_bornee"],
  limite_suite_defi: [
    "suite_defi",
    "limite_suite_comparaison",
    "limite_suite_monotone_bornee",
    "python_seuil",
  ],

  // =========================
  // LIMITES DE FONCTIONS
  // =========================
  limite_fonction_infini: ["limite_fonction_reference"],
  limite_fonction_point: ["limite_fonction_reference"],
  limite_fonction_asymptote: [
    "limite_fonction_infini",
    "limite_fonction_point",
  ],
  limite_fonction_defi: [
    "limite_fonction_asymptote",
    "exp_limite",
    "ln_limite",
  ],

  // =========================
  // CONTINUITÉ / TVI
  // =========================
  continuite_reconnaitre: ["limite_fonction_point"],
  tvi_appliquer: ["continuite_reconnaitre"],
  tvi_unicite: ["derivation_variation"],
  tvi_rediger: ["tvi_appliquer"],
  tvi_defi: ["tvi_unicite", "tvi_rediger", "derivation_variation"],

  // =========================
  // DÉRIVATION
  // =========================
  derivation_somme_produit_quotient: ["derivation_formules"],
  derivation_composee: ["derivation_somme_produit_quotient"],
  derivation_variation: ["derivation_composee"],
  derivation_tangente: ["derivation_formules"],
  derivation_optimisation: ["derivation_variation"],
  derivation_defi: [
    "derivation_variation",
    "derivation_tangente",
    "derivation_optimisation",
    "tvi_unicite",
  ],

  // =========================
  // CONVEXITÉ
  // =========================
  convexite_reconnaitre: ["derivation_variation"],
  convexite_derivee_seconde: ["derivation_composee"],
  convexite_point_inflexion: ["convexite_derivee_seconde"],
  convexite_tangente: ["derivation_tangente"],
  convexite_defi: [
    "convexite_point_inflexion",
    "convexite_tangente",
    "derivation_defi",
  ],

  // =========================
  // EXPONENTIELLE
  // =========================
  exp_proprietes: ["exp_definition"],
  exp_deriver: ["derivation_composee"],
  exp_equation_inequation: ["exp_proprietes"],
  exp_limite: ["limite_fonction_operations"],
  exp_defi: [
    "exp_deriver",
    "exp_limite",
    "derivation_variation",
    "convexite_derivee_seconde",
  ],

  // =========================
  // LOGARITHME
  // =========================
  ln_definition: ["exp_definition"],
  ln_proprietes: ["ln_definition"],
  ln_deriver: ["derivation_composee"],
  ln_equation_inequation: ["ln_proprietes"],
  ln_limite: ["limite_fonction_operations"],
  ln_defi: [
    "ln_deriver",
    "ln_limite",
    "derivation_variation",
    "tvi_appliquer",
  ],

  // =========================
  // PRIMITIVES / INTÉGRALES
  // =========================
  primitive_reconnaitre: ["derivation_formules"],
  primitive_calculer: [
    "primitive_reconnaitre",
    "exp_deriver",
    "ln_deriver",
  ],
  integrale_calculer: ["primitive_calculer"],
  integrale_aire: ["integrale_calculer"],
  integrale_valeur_moyenne: ["integrale_calculer"],
  integrale_defi: [
    "integrale_aire",
    "integrale_valeur_moyenne",
    "derivation_defi",
  ],

  // =========================
  // DÉNOMBREMENT / COMBINATOIRE
  // =========================
  denombrement_produit_somme: ["denombrement_reconnaitre"],
  denombrement_arrangement_combinaison: ["denombrement_produit_somme"],
  denombrement_coefficient_binomial: [
    "denombrement_arrangement_combinaison",
  ],
  denombrement_pascal: ["denombrement_coefficient_binomial"],
  denombrement_defi: [
    "denombrement_pascal",
    "binomiale_calculer",
  ],

  // =========================
  // GÉOMÉTRIE DANS L’ESPACE
  // =========================
  espace_repere_coordonnees: ["espace_vecteurs"],
  espace_droite_parametrique: ["espace_repere_coordonnees"],
  espace_plan_equation: ["espace_repere_coordonnees"],
  espace_position_relative: [
    "espace_droite_parametrique",
    "espace_plan_equation",
  ],
  espace_defi: [
    "espace_position_relative",
    "ps_espace_plan_normal",
  ],

  // =========================
  // PRODUIT SCALAIRE DANS L’ESPACE
  // =========================
  ps_espace_calculer: ["espace_vecteurs", "espace_repere_coordonnees"],
  ps_espace_orthogonalite: ["ps_espace_calculer"],
  ps_espace_norme_distance: ["ps_espace_calculer"],
  ps_espace_angle: ["ps_espace_calculer"],
  ps_espace_plan_normal: [
    "ps_espace_orthogonalite",
    "espace_plan_equation",
  ],
  ps_espace_defi: [
    "ps_espace_angle",
    "ps_espace_plan_normal",
    "espace_defi",
  ],

  // =========================
  // PROBABILITÉS CONDITIONNELLES
  // =========================
  proba_conditionnelle_formule: ["proba_conditionnelle_arbre"],
  proba_totales: ["proba_conditionnelle_formule"],
  proba_inverse_bayes: ["proba_totales"],
  proba_conditionnelle_defi: [
    "proba_inverse_bayes",
    "va_loi_probabilite",
  ],

  // =========================
  // VARIABLES ALÉATOIRES
  // =========================
  va_definition: ["proba_conditionnelle_formule"],
  va_loi_probabilite: ["va_definition"],
  va_esperance: ["va_loi_probabilite"],
  va_variance_ecart_type: ["va_esperance"],
  va_interpreter: ["va_variance_ecart_type"],
  va_defi: [
    "va_interpreter",
    "proba_conditionnelle_defi",
  ],

  // =========================
  // LOI BINOMIALE
  // =========================
  binomiale_schema: ["va_definition"],
  binomiale_reconnaitre: ["binomiale_schema"],
  binomiale_calculer: [
    "binomiale_reconnaitre",
    "denombrement_coefficient_binomial",
  ],
  binomiale_esperance_variance: [
    "binomiale_calculer",
    "va_variance_ecart_type",
  ],
  binomiale_intervalle: ["binomiale_calculer"],
  binomiale_defi: [
    "binomiale_esperance_variance",
    "binomiale_intervalle",
    "denombrement_defi",
  ],

  // =========================
  // ALGORITHMIQUE / PYTHON
  // =========================
  python_variable_boucle: ["python_lire_algorithme"],
  python_suite: [
    "python_variable_boucle",
    "suite_calculer_termes",
  ],
  python_seuil: [
    "python_suite",
    "limite_suite_interpreter",
    "limite_suite_calculer",
  ],
  python_simulation_proba: [
    "python_variable_boucle",
    "proba_conditionnelle_arbre",
    "binomiale_schema",
  ],
  python_defi: [
    "python_seuil",
    "python_simulation_proba",
    "suite_defi",
    "binomiale_defi",
  ],
};

/**
 * Génération matrice
 */
function buildMatrix(
  skillIndex: readonly string[],
  parentsMap: Record<string, string[]>,
  supportMap: Record<string, string[]>
): MatrixValue[][] {
  const size = skillIndex.length;

  const matrix: MatrixValue[][] = Array.from({ length: size }, () =>
    Array.from({ length: size }, () => 0 as MatrixValue)
  );

  const indexMap = new Map<string, number>();
  skillIndex.forEach((id, index) => {
    indexMap.set(id, index);
  });

  // Liens forts
  for (const [childId, parentIds] of Object.entries(parentsMap)) {
    const childIndex = indexMap.get(childId);
    if (childIndex === undefined) continue;

    for (const parentId of parentIds) {
      const parentIndex = indexMap.get(parentId);
      if (parentIndex === undefined) continue;

      matrix[childIndex][parentIndex] = 2;
      matrix[parentIndex][childIndex] = -2;
    }
  }

  // Liens faibles
  for (const [childId, supportIds] of Object.entries(supportMap)) {
    const childIndex = indexMap.get(childId);
    if (childIndex === undefined) continue;

    for (const supportId of supportIds) {
      const supportIndex = indexMap.get(supportId);
      if (supportIndex === undefined) continue;

      if (matrix[childIndex][supportIndex] === 0) {
        matrix[childIndex][supportIndex] = 1;
        matrix[supportIndex][childIndex] = -1;
      }
    }
  }

  return matrix;
}

export const matrixTerminaleSpeMathsValues = buildMatrix(
  microSkillIndexTerminaleSpeMaths,
  directParents,
  supportLinks
);

export const matrixTerminaleSpeMaths: SkillMatrix = {
  id: "terminale_spe_maths_matrix_v4",
  classe: "terminale-spe",
  matiere: "maths",
  microSkillIndex: [...microSkillIndexTerminaleSpeMaths],
  matrix: matrixTerminaleSpeMathsValues,
};