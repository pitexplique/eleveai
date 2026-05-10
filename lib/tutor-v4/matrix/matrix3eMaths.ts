// lib/tutor-v4/knowledge/maths/3e/matrix3eMaths.ts

import type { SkillMatrix, MatrixValue } from "@/lib/tutor-v4/types";
import { microSkills } from "@/lib/tutor-v4/knowledge/maths/3e/microSkills";

/**
 * Index des micro-compétences
 */
export const microSkillIndex3eMaths = microSkills.map((m) => m.id);

/**
 * Liens forts (prérequis directs)
 */
const directParents: Record<string, string[]> = Object.fromEntries(
  microSkills.map((m) => [m.id, m.prerequis])
);

/**
 * Liens secondaires (très important en 3e 🔥)
 */
const supportLinks: Record<string, string[]> = {
  // =========================
  // RATIONNELS
  // =========================
  rationnel_comparer: ["prop_reconnaitre"],
  rationnel_calculer: ["litteral_substituer"],

  // =========================
  // PUISSANCES
  // =========================
  puissance_dix: ["rationnel_ecritures"],
  puissance_calculs: ["litteral_reduire"],
  puissance_ecriture_scientifique: ["rationnel_ecritures"],

  // =========================
  // RACINES
  // =========================
  racine_comprendre: ["puissance_comprendre"],
  racine_calculer: ["puissance_calculer"],
  racine_encadrer: ["rationnel_comparer"],

  // =========================
  // TRIANGLES
  // =========================
  triangle_construire: ["triangle_angles", "triangle_inegalite"],

  // =========================
  // PYTHAGORE
  // =========================
  pythagore_reconnaitre: ["triangle_reconnaitre"],
  pythagore_calculer_hypotenuse: ["racine_calculer"],
  pythagore_calculer_cote: ["racine_calculer"],
  pythagore_reciproque: ["triangle_inegalite"],

  // =========================
  // THALÈS
  // =========================
  thales_rapports: ["prop_quatrieme"],
  thales_calculer_longueur: ["prop_quatrieme"],
  thales_reciproque: ["prop_reconnaitre"],

  // =========================
  // TRIGONOMÉTRIE
  // =========================
  trigo_triangle_rectangle: ["pythagore_reconnaitre"],
  trigo_calculer_longueur: ["pythagore_calculer_hypotenuse"],
  trigo_calculer_angle: ["pythagore_calculer_cote"],

  // =========================
  // FONCTIONS
  // =========================
  fonction_graphique: ["prop_reconnaitre"],
  fonction_affine_lineaire: ["prop_reconnaitre", "prop_quatrieme"],

  // =========================
  // FONCTIONS AFFINES
  // =========================
  affine_reconnaitre: ["fonction_affine_lineaire"],
  affine_coeff_directeur: ["prop_quatrieme", "fonction_graphique"],
  affine_ordonnee_origine: ["fonction_graphique"],
  affine_calcul_image: ["fonction_image", "equation_resoudre_simple"],
  affine_expression: ["equation_resoudre_simple", "fonction_tableau"],
  affine_graphique: ["fonction_graphique", "affine_coeff_directeur"],
  affine_probleme: ["prop_defis", "equation_defis"],
  affine_defis: ["fonction_defis", "equation_defis"],

  // =========================
  // GRANDEURS
  // =========================
  aire_triangle: ["triangle_reconnaitre"],
  volume_prisme: ["aire_triangle"],
  volume_cylindre: ["aire_disque"],
  volume_boule: ["volume_cylindre"],

  // =========================
  // PROBAS
  // =========================
  proba_calculer: ["rationnel_comparer"],
  proba_deux_epreuves: ["proba_calculer"],

  // =========================
  // ALGORITHMIQUE
  // =========================
  algo_conditions_complexes: [
    "equation_verifier",
    "fonction_image",
    "rationnel_comparer",
  ],

  algo_variables_boucles: [
    "algo_conditions_complexes",
    "litteral_substituer",
    "rationnel_calculer",
  ],

  algo_programme_calcul: [
    "algo_variables_boucles",
    "litteral_reduire",
    "litteral_developper",
    "fonction_tableau",
  ],

  algo_debug: [
    "algo_programme_calcul",
    "equation_verifier",
    "fonction_image",
  ],

  algo_generaliser: [
    "algo_programme_calcul",
    "equation_probleme",
    "fonction_affine_lineaire",
    "affine_expression",
  ],

  algo_defis: [
    "algo_conditions_complexes",
    "algo_variables_boucles",
    "algo_programme_calcul",
    "algo_debug",
    "algo_generaliser",
    "equation_defis",
    "fonction_defis",
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

export const matrix3eMathsValues = buildMatrix(
  microSkillIndex3eMaths,
  directParents,
  supportLinks
);

export const matrix3eMaths: SkillMatrix = {
  id: "3e_maths_matrix_v4",
  classe: "3e",
  matiere: "maths",
  microSkillIndex: [...microSkillIndex3eMaths],
  matrix: matrix3eMathsValues,
};