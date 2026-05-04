// loaders/matrix/matrix3eMaths.ts

import type { SkillMatrix, MatrixValue } from "@/lib/tutor-v4/types";
import { microSkills } from "@/lib/tutor-v4/knowledge/maths/3e/microSkills";

/**
 * Ordre des micro-compétences.
 * Dérivé automatiquement du référentiel central 3e.
 */
export const microSkillIndex3eMaths = microSkills.map((micro) => micro.id);

/**
 * Liens forts :
 * dérivés automatiquement des prérequis définis dans microSkills.ts
 */
const directParents: Record<string, string[]> = Object.fromEntries(
  microSkills.map((micro) => [micro.id, micro.prerequis])
);

/**
 * Liens secondaires :
 * liens faibles utiles pour guider la progression et la remédiation.
 */
const supportLinks: Record<string, string[]> = {
  // NOMBRES RATIONNELS
  rationnel_ecritures: ["arith_multiple_diviseur"],
  rationnel_comparer: ["rationnel_ecritures"],
  rationnel_calculer: ["rationnel_comparer"],
  rationnel_defis: ["rationnel_calculer"],

  // PUISSANCES
  puissance_calculer: ["rationnel_calculer"],
  puissance_dix: ["puissance_calculer"],
  puissance_ecriture_scientifique: ["puissance_dix"],
  puissance_calculs: ["rationnel_calculer"],
  puissance_defis: ["puissance_calculs", "puissance_ecriture_scientifique"],

  // RACINES
  racine_carres_parfaits: ["puissance_calculer"],
  racine_calculer: ["racine_carres_parfaits"],
  racine_encadrer: ["rationnel_comparer"],
  racine_defis: ["racine_calculer", "racine_encadrer"],

  // ARITHMÉTIQUE
  arith_criteres: ["arith_multiple_diviseur"],
  arith_nombre_premier: ["arith_criteres"],
  arith_decomposer: ["arith_nombre_premier"],
  arith_pgcd_ppcm: ["arith_decomposer", "rationnel_ecritures"],
  arith_defis: ["arith_pgcd_ppcm"],

  // PROPORTIONNALITÉ
  prop_table: ["rationnel_comparer"],
  prop_quatrieme: ["prop_table", "rationnel_calculer"],
  prop_pourcentage: ["prop_quatrieme"],
  prop_evolution: ["prop_pourcentage"],
  prop_vitesse_debit: ["prop_quatrieme", "rationnel_calculer"],
  prop_defis: ["prop_evolution", "prop_vitesse_debit"],

  // CALCUL LITTÉRAL
  litteral_substituer: ["rationnel_calculer"],
  litteral_reduire: ["rationnel_calculer"],
  litteral_developper: ["litteral_reduire"],
  litteral_factoriser: ["litteral_developper"],
  litteral_identites: ["litteral_developper", "litteral_factoriser"],
  litteral_defis: ["litteral_identites"],

  // ÉQUATIONS
  equation_resoudre_simple: ["rationnel_calculer"],
  equation_resoudre_developper: ["litteral_developper", "litteral_reduire"],
  equation_produit_nul: ["litteral_factoriser"],
  equation_verifier: ["litteral_substituer"],
  equation_probleme: ["equation_resoudre_developper", "equation_verifier"],
  equation_defis: ["equation_produit_nul", "equation_probleme"],

  // FONCTIONS
  fonction_image: ["litteral_substituer"],
  fonction_antecedent: ["equation_resoudre_simple"],
  fonction_tableau: ["fonction_image"],
  fonction_graphique: ["fonction_tableau"],
  fonction_affine_lineaire: ["prop_reconnaitre", "equation_resoudre_simple"],
  fonction_defis: ["fonction_graphique", "fonction_affine_lineaire"],

  // PYTHAGORE
  pythagore_calculer_hypotenuse: ["racine_calculer"],
  pythagore_calculer_cote: ["racine_calculer"],
  pythagore_reciproque: ["racine_carres_parfaits"],
  pythagore_rediger: ["pythagore_reciproque"],
  pythagore_defis: ["pythagore_rediger"],

  // THALÈS
  thales_rapports: ["prop_quatrieme", "rationnel_comparer"],
  thales_calculer_longueur: ["equation_resoudre_simple"],
  thales_reciproque: ["thales_rapports"],
  thales_rediger: ["thales_calculer_longueur", "thales_reciproque"],
  thales_defis: ["thales_rediger"],

  // TRIGONOMÉTRIE
  trigo_triangle_rectangle: ["pythagore_reconnaitre"],
  trigo_cosinus: ["rationnel_comparer"],
  trigo_sinus: ["rationnel_comparer"],
  trigo_tangente: ["rationnel_comparer"],
  trigo_calculer_longueur: ["equation_resoudre_simple"],
  trigo_calculer_angle: ["trigo_cosinus", "trigo_sinus", "trigo_tangente"],
  trigo_choisir_ratio: ["trigo_calculer_longueur", "trigo_calculer_angle"],
  trigo_defis: ["trigo_choisir_ratio"],

  // TRANSFORMATIONS
  transfo_homothetie_reconnaitre: ["prop_quatrieme"],
  transfo_homothetie_construire: ["thales_configuration"],
  transfo_homothetie_rapport: ["prop_quatrieme", "prop_pourcentage"],
  transfo_effets: ["transfo_homothetie_rapport", "aire_agrandissement_reduction"],
  transfo_defis: ["transfo_effets"],

  // ESPACE
  espace_sections: ["espace_solides_reconnaitre"],
  espace_representation: ["espace_solides_reconnaitre"],
  espace_defis: ["espace_sections", "espace_representation"],

  // AIRES
  aire_triangle: ["pythagore_reconnaitre"],
  aire_disque: ["racine_carres_parfaits"],
  aire_figure_composee: ["aire_triangle", "aire_disque"],
  aire_agrandissement_reduction: ["transfo_homothetie_rapport"],
  aire_defis: ["aire_figure_composee", "aire_agrandissement_reduction"],

  // VOLUMES
  volume_pave: ["aire_comprendre", "rationnel_calculer"],
  volume_prisme: ["aire_triangle"],
  volume_cylindre: ["aire_disque"],
  volume_boule: ["volume_cylindre", "puissance_calculer"],
  volume_agrandissement_reduction: ["transfo_homothetie_rapport"],
  volume_unites: ["volume_comprendre", "prop_quatrieme"],
  volume_defis: [
    "volume_pave",
    "volume_prisme",
    "volume_cylindre",
    "volume_boule",
    "volume_agrandissement_reduction",
    "volume_unites",
  ],

  // STATISTIQUES
  stat_lire_graphique: ["stat_lire_tableau"],
  stat_effectif_frequence: ["rationnel_comparer", "prop_pourcentage"],
  stat_moyenne: ["rationnel_calculer"],
  stat_mediane: ["rationnel_comparer"],
  stat_etendue: ["rationnel_calculer"],
  stat_interpreter: ["stat_moyenne", "stat_mediane", "stat_etendue"],
  stat_defis: ["stat_interpreter"],

  // PROBABILITÉS
  proba_issues: ["stat_lire_tableau"],
  proba_evenement: ["proba_issues"],
  proba_calculer: ["rationnel_comparer", "stat_effectif_frequence"],
  proba_evenement_contraire: ["proba_calculer"],
  proba_deux_epreuves: ["proba_calculer", "rationnel_calculer"],
  proba_defis: ["proba_evenement_contraire", "proba_deux_epreuves"],
};

/**
 * Génère automatiquement la matrice.
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

  // Liens forts : parent direct
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

  // Liens secondaires
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