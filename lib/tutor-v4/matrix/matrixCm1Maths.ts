// loaders/matrix/matrixCm1Maths.ts

import type { SkillMatrix, MatrixValue } from "@/lib/tutor-v4/types";
import { microSkills } from "@/lib/tutor-v4/knowledge/maths/cm1/microSkills";

/**
 * Progression étoilée CM1 :
 * - les niveaux 1 → 5 sont portés par les difficultés des questions ;
 * - la matrice garde les dépendances entre micro-compétences ;
 * - les liens directs viennent des prerequis déclarés dans microSkills.ts ;
 * - les supportLinks ajoutent des aides transversales utiles.
 */
export const microSkillIndexCm1Maths = microSkills.map((micro) => micro.id);

const directParents: Record<string, string[]> = Object.fromEntries(
  microSkills.map((micro) => [micro.id, micro.prerequis])
);

/**
 * Liens de soutien transversaux.
 *
 * Valeur 2 : prérequis direct, déjà géré par directParents.
 * Valeur 1 : compétence d’appui utile mais non obligatoire.
 */
const supportLinks: Record<string, string[]> = {
  // ============================================================
  // NOMBRES ENTIERS
  // ============================================================

  entier_comparer: ["entier_decomposer"],
  entier_arrondir: ["entier_decomposer"],
  entier_multiple: ["table_2", "table_5", "table_10"],
  entier_defi: ["calcul_mental"],

  // ============================================================
  // SUITES
  // ============================================================

  suite_continuer: ["calcul_mental"],
  suite_regle: ["entier_comparer", "calcul_mental"],
  suite_croissante_decroissante: ["entier_comparer"],
  suite_defi: ["suite_continuer", "calcul_mental"],

  // ============================================================
  // TABLES DE MULTIPLICATION
  // ============================================================

  table_2: ["entier_decomposer", "calcul_mental"],
  table_3: ["suite_continuer", "calcul_mental"],
  table_4: ["table_2"],
  table_5: ["table_10", "calcul_mental"],
  table_6: ["table_3", "table_2"],
  table_7: ["table_5", "table_2"],
  table_8: ["table_4", "table_2"],
  table_9: ["table_10", "table_3"],
  table_10: ["multiplication_puissance_dix", "entier_decomposer"],

  tables_melangees: [
    "table_2",
    "table_3",
    "table_4",
    "table_5",
    "table_6",
    "table_7",
    "table_8",
    "table_9",
    "table_10",
  ],
  tables_trous: ["tables_melangees", "division_sens"],
  tables_defi: ["tables_trous", "probleme_une_etape"],

  // ============================================================
  // MULTIPLICATION
  // ============================================================

  multiplication_mental: ["entier_decomposer", "tables_melangees"],
  multiplication_posee: ["calcul_addition_posee", "tables_melangees"],
  multiplication_puissance_dix: ["entier_decomposer", "table_10"],
  multiplication_probleme: ["probleme_choisir_operation", "tables_melangees"],
  multiplication_defi: ["probleme_une_etape", "multiplication_probleme"],

  // ============================================================
  // DIVISION
  // ============================================================

  division_sens: ["tables_melangees"],
  division_lien_multiplication: ["tables_melangees", "tables_trous"],
  division_posee: ["multiplication_posee"],
  division_reste: ["division_sens"],
  division_probleme: ["probleme_choisir_operation"],
  division_defi: ["probleme_une_etape"],

  // ============================================================
  // FRACTIONS
  // ============================================================

  fraction_lire: ["division_sens"],
  fraction_representer: ["division_sens"],
  fraction_unite: ["fraction_representer"],
  fraction_superieure_1: ["fraction_unite", "entier_lire"],
  fraction_droite: ["reperage_quadrillage"],
  fraction_comparer: ["entier_comparer", "fraction_representer"],
  fraction_equivalente: ["tables_melangees", "division_lien_multiplication"],
  fraction_decimale: ["multiplication_puissance_dix", "table_10"],
  fraction_defi: ["probleme_une_etape", "fraction_representer"],

  // ============================================================
  // NOMBRES DÉCIMAUX
  // ============================================================

  decimal_fraction: ["fraction_decimale"],
  decimal_lire: ["fraction_decimale"],
  decimal_valeur_chiffre: ["entier_decomposer"],
  decimal_comparer: ["entier_comparer"],
  decimal_ordonner: ["decimal_comparer"],
  decimal_droite: ["reperage_quadrillage"],
  decimal_defi: ["probleme_une_etape"],

  // ============================================================
  // CALCUL
  // ============================================================

  calcul_mental: ["entier_decomposer", "tables_melangees"],
  calcul_addition_posee: ["entier_decomposer"],
  calcul_soustraction_posee: ["entier_decomposer"],
  calcul_multiplication_posee: ["multiplication_posee"],
  calcul_decimal_addition: ["decimal_valeur_chiffre"],
  calcul_decimal_soustraction: ["decimal_valeur_chiffre"],
  calcul_priorite: ["tables_melangees"],
  calcul_defi: ["probleme_choisir_operation"],

  // ============================================================
  // PROBLÈMES
  // ============================================================

  probleme_choisir_operation: [
    "calcul_mental",
    "tables_melangees",
    "division_sens",
  ],
  probleme_une_etape: [
    "calcul_addition_posee",
    "calcul_soustraction_posee",
    "multiplication_mental",
    "division_sens",
  ],
  probleme_plusieurs_etapes: [
    "probleme_une_etape",
    "calcul_priorite",
  ],
  probleme_rediger: ["probleme_choisir_operation"],
  probleme_verifier: ["calcul_mental", "probleme_une_etape"],
  probleme_defi: ["probleme_plusieurs_etapes"],

  // ============================================================
  // ALGÈBRE
  // ============================================================

  algebre_egalite: ["calcul_mental"],
  algebre_completer_egalite: [
    "calcul_addition_posee",
    "calcul_soustraction_posee",
  ],
  algebre_nombre_inconnu: [
    "algebre_completer_egalite",
    "probleme_choisir_operation",
  ],
  algebre_schema_barre: [
    "probleme_une_etape",
    "fraction_representer",
  ],
  algebre_motif: [
    "suite_regle",
    "calcul_mental",
  ],
  algebre_defi: [
    "algebre_nombre_inconnu",
    "algebre_schema_barre",
    "probleme_plusieurs_etapes",
  ],

  // ============================================================
  // PROPORTIONNALITÉ
  // ============================================================

  prop_reconnaitre: ["tableau_lire", "tables_melangees"],
  prop_fois_plus: ["multiplication_mental", "prop_reconnaitre"],
  prop_fois_moins: ["division_sens", "prop_reconnaitre"],
  prop_tableau: ["tableau_completer", "multiplication_mental"],
  prop_probleme: ["probleme_une_etape", "tableau_lire"],
  prop_defi: ["probleme_plusieurs_etapes", "prop_tableau"],

  // ============================================================
  // LONGUEURS
  // ============================================================

  longueur_comparer: ["decimal_comparer"],
  longueur_convertir: [
    "multiplication_puissance_dix",
    "decimal_valeur_chiffre",
  ],
  longueur_estimer: ["decimal_comparer"],
  longueur_mesurer: ["droite_reconnaitre"],
  longueur_defi: ["probleme_une_etape"],

  // ============================================================
  // MASSES
  // ============================================================

  masse_comparer: ["decimal_comparer"],
  masse_convertir: [
    "multiplication_puissance_dix",
    "decimal_valeur_chiffre",
  ],
  masse_estimer: ["decimal_comparer"],
  masse_defi: ["probleme_une_etape"],

  // ============================================================
  // CONTENANCES
  // ============================================================

  contenance_comparer: ["decimal_comparer"],
  contenance_convertir: [
    "multiplication_puissance_dix",
    "decimal_valeur_chiffre",
  ],
  contenance_estimer: ["decimal_comparer"],
  contenance_defi: ["probleme_une_etape"],

  // ============================================================
  // DURÉES
  // ============================================================

  duree_lire: ["entier_lire"],
  duree_convertir: ["table_6", "table_10"],
  duree_calculer: ["calcul_addition_posee", "calcul_soustraction_posee"],
  duree_probleme: ["probleme_choisir_operation"],
  duree_defi: ["probleme_plusieurs_etapes"],

  // ============================================================
  // PÉRIMÈTRES
  // ============================================================

  perimetre_comprendre: ["longueur_comparer"],
  perimetre_triangle: ["calcul_addition_posee", "figure_triangle"],
  perimetre_quadrilatere: [
    "calcul_addition_posee",
    "figure_quadrilatere",
  ],
  perimetre_polygone: ["calcul_addition_posee"],
  perimetre_defi: ["probleme_une_etape"],

  // ============================================================
  // AIRES
  // ============================================================

  aire_comprendre: ["longueur_comparer"],
  aire_unite: ["aire_comprendre"],
  aire_carre_rectangle: ["tables_melangees", "figure_quadrilatere"],
  aire_composer: [
    "calcul_addition_posee",
    "calcul_soustraction_posee",
  ],
  aire_defi: ["probleme_une_etape"],

  // ============================================================
  // ANGLES
  // ============================================================

  angle_reconnaitre: ["droite_reconnaitre"],
  angle_droit: ["droite_perpendiculaire"],
  angle_type: ["angle_droit"],
  angle_comparer: ["angle_reconnaitre"],
  angle_defi: ["figure_triangle", "figure_quadrilatere"],

  // ============================================================
  // REPÉRAGE
  // ============================================================

  reperage_quadrillage: ["entier_lire"],
  reperage_coordonnees: ["entier_comparer"],
  reperage_placer_point: ["reperage_coordonnees"],
  reperage_deplacement: ["algo_instruction"],
  reperage_defi: ["algo_deplacement"],

  // ============================================================
  // DROITES
  // ============================================================

  droite_reconnaitre: ["reperage_quadrillage"],
  droite_parallele: ["droite_reconnaitre"],
  droite_perpendiculaire: ["droite_reconnaitre", "angle_droit"],
  droite_tracer: ["droite_parallele", "droite_perpendiculaire"],
  droite_defi: ["figure_construire"],

  // ============================================================
  // SYMÉTRIE
  // ============================================================

  symetrie_axe: ["droite_reconnaitre"],
  symetrie_completer: ["reperage_quadrillage"],
  symetrie_construire: [
    "droite_perpendiculaire",
    "reperage_quadrillage",
  ],
  symetrie_propriete: ["symetrie_construire"],
  symetrie_defi: ["figure_construire"],

  // ============================================================
  // FIGURES PLANES
  // ============================================================

  figure_triangle: ["droite_reconnaitre", "angle_reconnaitre"],
  figure_quadrilatere: ["droite_parallele", "droite_perpendiculaire"],
  figure_cercle: ["droite_reconnaitre"],
  figure_propriete: ["angle_type"],
  figure_construire: ["droite_tracer", "angle_comparer"],
  figure_defi: ["perimetre_triangle", "perimetre_quadrilatere"],

  // ============================================================
  // SOLIDES
  // ============================================================

  solide_reconnaitre: ["figure_triangle", "figure_quadrilatere"],
  solide_sommet_arete_face: ["solide_reconnaitre"],
  solide_face: ["figure_triangle", "figure_quadrilatere"],
  solide_patron: ["solide_face"],
  solide_defi: ["solide_sommet_arete_face"],

  // ============================================================
  // TABLEAUX
  // ============================================================

  tableau_lire: ["entier_lire"],
  tableau_completer: ["calcul_mental"],
  tableau_interpreter: ["entier_comparer"],
  tableau_defi: ["probleme_une_etape"],

  // ============================================================
  // GRAPHIQUES
  // ============================================================

  graphique_lire: ["tableau_lire"],
  graphique_completer: ["tableau_completer"],
  graphique_interpreter: ["tableau_interpreter"],
  graphique_defi: ["probleme_une_etape"],

  // ============================================================
  // PROBABILITÉS
  // ============================================================

  probabilite_vocabulaire: ["tableau_lire"],
  probabilite_hasard: ["probabilite_vocabulaire"],
  probabilite_comparer: ["entier_comparer", "fraction_representer"],
  probabilite_roue_de_sac: ["probabilite_comparer"],
  probabilite_defi: ["probleme_une_etape"],

  // ============================================================
  // ALGORITHMIQUE
  // ============================================================

  algo_instruction: ["reperage_quadrillage"],
  algo_logique: ["suite_regle", "algebre_motif"],
  algo_deplacement: ["reperage_deplacement"],
  algo_programme: ["algo_instruction", "algo_deplacement"],
  algo_repetition: ["tables_melangees", "suite_regle"],
  algo_defi: ["algo_programme", "probleme_une_etape"],
};

function buildMatrix(
  skillIndex: readonly string[],
  parentsMap: Record<string, string[]>,
  supportMap: Record<string, string[]>
): MatrixValue[][] {
  const matrix: MatrixValue[][] = Array.from({ length: skillIndex.length }, () =>
    Array.from({ length: skillIndex.length }, () => 0 as MatrixValue)
  );

  const indexMap = new Map<string, number>();
  skillIndex.forEach((id, index) => indexMap.set(id, index));

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

export const matrixCm1MathsValues = buildMatrix(
  microSkillIndexCm1Maths,
  directParents,
  supportLinks
);

export const matrixCm1Maths: SkillMatrix = {
  id: "cm1_maths_matrix_v4",
  classe: "cm1",
  matiere: "maths",
  microSkillIndex: [...microSkillIndexCm1Maths],
  matrix: matrixCm1MathsValues,
};