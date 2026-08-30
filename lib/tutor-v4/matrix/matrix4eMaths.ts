import type { SkillMatrix, MatrixValue } from "@/lib/tutor-v4/types";
import { microSkills } from "@/lib/tutor-v4/knowledge/maths/4e/microSkills";

/**
 * Ordre des micro-compétences.
 * Dérivé automatiquement du référentiel central 4e.
 */
export const microSkillIndex4eMaths = microSkills.map((micro) => micro.id);

/**
 * Liens forts :
 * dérivés automatiquement des prérequis définis dans microSkills.ts
 *
 * Si A dépend de B, alors :
 * - M[A][B] = 2
 * - M[B][A] = -2
 */
const directParents: Record<string, string[]> = Object.fromEntries(
  microSkills.map((micro) => [micro.id, micro.prerequis])
);

/**
 * Liens secondaires :
 * plus faibles, mais utiles pour guider la progression.
 */
const supportLinks: Record<string, string[]> = {
  // =========================
  // OPÉRATIONS SUR LES RELATIFS
  // =========================
  relatif_soustraction: ["relatif_addition"],
  relatif_multiplication: ["relatif_addition"],
  relatif_division: ["relatif_multiplication"],
  relatif_calcul: [
    "relatif_addition",
    "relatif_soustraction",
    "relatif_multiplication",
    "relatif_division",
  ],
  relatif_probleme: ["relatif_calcul"],
  relatif_operation_defi: ["relatif_soustraction", "relatif_multiplication"],

  // =========================
  // FRACTIONS
  // =========================
  fraction_simplifier: ["fraction_egale"],
  fraction_decimal: ["fraction_simplifier"],
  fraction_rationnel: ["fraction_egale", "fraction_decimal"],
  fraction_comparer: ["fraction_simplifier", "fraction_decimal"],
  fraction_additionner: ["fraction_comparer", "relatif_addition"],
  fraction_multiplier: ["fraction_simplifier"],
  fraction_quantite: ["fraction_comparer", "fraction_multiplier"],
  fraction_inverse: ["fraction_simplifier", "fraction_rationnel"],
  fraction_diviser: ["fraction_inverse", "fraction_multiplier"],
  fraction_oppose: ["fraction_rationnel", "relatif_multiplication"],
  fraction_defi: ["fraction_quantite", "fraction_diviser", "fraction_oppose"],

  // =========================
  // PUISSANCES ET NOTATION SCIENTIFIQUE
  // =========================
  // ⭐ Ajouté le 28/08/2026 avec la notion. Les liens FORTS viennent déjà des
  // `prerequis` de microSkills.ts et se dérivent tout seuls ; ceux-ci sont les
  // liens FAIBLES, qui disent au moteur sur quoi s'appuyer pour remédier.
  // ⚠️ Rien ne vérifie ce tableau : une micro oubliée ici ne casse rien, elle
  // rend seulement la progression plus pauvre. 24 des 136 micros de la classe
  // n'en ont aucun (mesuré le 27/08) — ne pas grossir ce chiffre.
  puissance_calculer: ["puissance_comprendre", "relatif_multiplication"],
  // Le piège du signe ((−2)³ contre −2³) se remédie par les relatifs.
  puissance_exposant_negatif: [
    "puissance_calculer",
    "fraction_inverse",
    "fraction_decimal",
  ],
  puissance_dix: ["puissance_calculer", "puissance_comprendre"],
  puissance_notation_scientifique: [
    "puissance_dix",
    "puissance_exposant_negatif",
    "fraction_decimal",
  ],
  // Comparer deux écritures scientifiques, c'est comparer des nombres : la
  // remédiation passe par la comparaison de fractions et de décimaux.
  puissance_comparer: ["puissance_notation_scientifique", "fraction_comparer"],
  puissance_calcul: ["puissance_calculer", "puissance_dix", "relatif_calcul"],
  puissance_defi: [
    "puissance_calcul",
    "puissance_comparer",
    "puissance_notation_scientifique",
  ],

  // =========================
  // ORDRES DE GRANDEUR ET PRÉFIXES
  // =========================
  // ⭐ Les liens de remédiation descendent tous vers les PUISSANCES DE DIX :
  // c'est là que l'élève bloque quand un ordre de grandeur lui échappe, jamais
  // dans l'estimation elle-même.
  ordre_prefixe: ["puissance_dix", "puissance_exposant_negatif"],
  ordre_associer: [
    "puissance_notation_scientifique",
    "puissance_comparer",
    "ordre_prefixe",
  ],
  // ⚠️ Estimer, c'est arrondir PUIS multiplier des puissances de dix : quand
  // l'estimation rate, c'est presque toujours l'addition des exposants qui a
  // lâché, pas l'arrondi.
  ordre_estimer: ["puissance_dix", "puissance_calcul"],
  ordre_vraisemblance: ["ordre_estimer", "puissance_dix"],
  ordre_defi: ["ordre_vraisemblance", "ordre_associer", "ordre_prefixe"],

  // =========================
  // RATIOS ET POURCENTAGES
  // =========================
  // ⭐ Ajoutés le 28/08/2026 avec la scission. Les liens FORTS viennent des
  // `prerequis` de microSkills et se dérivent seuls ; ceux-ci sont les liens
  // FAIBLES, qui disent au moteur sur quoi s'appuyer pour remédier.
  // ⚠️ Les trois micros de pourcentage gardent les leurs, écrits plus bas sous
  // « PROPORTIONNALITÉ » : elles ont changé de notion, pas d'identifiant.
  // Un ratio se lit comme un tableau de proportionnalité à deux colonnes :
  // c'est là qu'on renvoie un élève qui bute sur l'écriture 2 : 3.
  prop_rapport: ["prop_table", "prop_coeff"],
  prop_ratio_quotients: ["prop_rapport", "fraction_egale", "fraction_simplifier"],
  prop_ratio_trois: ["prop_ratio_quotients", "prop_rapport"],
  // Partager, c'est d'abord diviser par la SOMME des parts : la quatrième
  // proportionnelle et le retour à l'unité sont les appuis de remédiation.
  prop_ratio_partager: ["prop_ratio_trois", "prop_quatrieme", "prop_coeff"],
  prop_ratio_defi: [
    "prop_ratio_partager",
    "prop_evolution",
    "prop_pourcentage",
  ],

  // =========================
  // LE TRIANGLE POUR DÉMONTRER
  // =========================
  // ⭐ Ajouté le 28/08/2026. La remédiation d'un cas d'égalité passe par les
  // TRANSFORMATIONS — deux triangles égaux sont superposables — et non par
  // Pythagore, qui mesure au lieu de comparer.
  triangle_somme_angle: ["triangle_inegalite", "sym_transformation_propriete"],
  triangle_droites: ["aire_triangle", "aire_perimetre_triangle", "triangle_somme_angle"],
  triangle_egalite: ["sym_transformation_propriete", "sym_axiale", "triangle_somme_angle"],
  triangle_construire: ["triangle_egalite", "triangle_inegalite", "triangle_somme_angle"],
  // ⭐ Des triangles semblables sont un AGRANDISSEMENT l'un de l'autre : c'est
  // là qu'il faut redescendre, et c'est aussi le lien que le BO demande entre
  // la proportionnalité et les configurations géométriques.
  triangle_semblable: ["agrandissement_rapport", "thales_configuration", "prop_coeff"],
  triangle_defi: ["triangle_semblable", "triangle_construire", "pythagore_rediger"],

  // =========================
  // DÉPENDANCE ENTRE DEUX GRANDEURS
  // =========================
  // ⭐ Ajouté le 28/08/2026. La remédiation d'une dépendance ne passe PAS par
  // « les fonctions » — la notion n'existe pas encore pour l'élève — mais par
  // les deux objets qu'il connaît déjà : le TABLEAU de proportionnalité et
  // l'EXPRESSION littérale à substituer.
  fonction_programme: ["litteral_expression_substituer", "algo_variable", "relatif_calcul"],
  fonction_tableau_lire: ["prop_table", "fonction_programme", "stat_lire_tableau"],
  // ⭐ Lire un graphique de dépendance, c'est d'abord lire un graphique tout
  // court : quand ça bloque, on redescend vers les statistiques.
  fonction_graphique_lire: ["stat_lire_graphique", "fonction_tableau_lire"],
  fonction_changer_mode: [
    "fonction_tableau_lire",
    "fonction_graphique_lire",
    "fonction_programme",
  ],
  fonction_probleme: ["fonction_changer_mode", "prop_probleme", "equation_probleme"],
  fonction_defi: ["fonction_probleme", "fonction_graphique_lire", "fonction_changer_mode"],

  // =========================
  // GRANDEURS COMPOSÉES ET UNITÉS
  // =========================
  // ⭐ Ajouté le 28/08/2026. La remédiation ne passe PAS par le calcul mais par
  // la grandeur concrète : quand l'élève bute sur une unité composée, c'est
  // qu'il a perdu de vue ce qu'il mesure.
  grandeur_produit: ["aire_rectangle", "aire_comprendre", "volume_lien_aire"],
  grandeur_quotient: ["prop_coeff", "prop_probleme", "fraction_diviser"],
  grandeur_unite_composee: ["grandeur_produit", "grandeur_quotient", "volume_unite"],
  // ⭐ La conversion d'une aire se remédie par les PUISSANCES DE 10, pas par un
  // tableau : 1 m² = 100 × 100 cm² parce que 1 m = 100 cm.
  grandeur_convertir: ["puissance_dix", "volume_unite", "grandeur_produit"],
  grandeur_coherence: ["grandeur_unite_composee", "grandeur_convertir", "aire_comprendre"],
  grandeur_defi: ["grandeur_coherence", "grandeur_quotient", "grandeur_convertir"],

  // =========================
  // FRÉQUENCES OBSERVÉES ET PROBABILITÉ
  // =========================
  // ⭐ Ajouté le 28/08/2026. Une fréquence est une STATISTIQUE avant d'être une
  // probabilité : quand l'élève bute ici, c'est presque toujours vers
  // `stat_frequence` qu'il faut redescendre, pas vers le vocabulaire du hasard.
  proba_frequence_calculer: ["stat_frequence", "stat_effectif", "proba_calculer_fraction"],
  proba_frequence_comparer: ["proba_frequence_calculer", "proba_convertir", "proba_equiprobabilite"],
  proba_frequence_repeter: ["proba_frequence_comparer", "proba_comparer"],
  // ⭐ Le raisonnement sur l'échantillon s'appuie sur les EFFECTIFS : ce qui
  // trompe, c'est un petit nombre d'essais, et ça se voit dans le tableau.
  proba_frequence_echantillon: ["proba_frequence_repeter", "stat_effectif", "stat_interpreter"],
  proba_frequence_defi: [
    "proba_frequence_echantillon",
    "proba_frequence_repeter",
    "proba_defi",
  ],

  // =========================
  // AGRANDISSEMENT, RÉDUCTION ET ÉCHELLES
  // =========================
  // ⭐ Ajouté le 28/08/2026 avec la notion. Les liens FORTS se dérivent des
  // `prerequis` ; ceux-ci sont les liens FAIBLES, qui disent au moteur sur quoi
  // s'appuyer pour remédier. ⚠️ Rien ne vérifie ce tableau.
  echelle_distance_reelle: ["echelle_comprendre", "prop_coeff", "aire_longueur_convertir"],
  echelle_distance_plan: ["echelle_comprendre", "echelle_distance_reelle", "fraction_diviser"],
  // Un rapport d'agrandissement est un coefficient de proportionnalité : quand
  // l'élève bute ici, c'est presque toujours là qu'il faut redescendre.
  agrandissement_rapport: ["prop_coeff", "prop_quatrieme", "echelle_comprendre"],
  // ⭐ Le k² ne se remédie PAS par la proportionnalité — c'est justement ce
  // qu'il contredit. On redescend vers l'AIRE, où l'élève voit les carreaux.
  agrandissement_aire: ["aire_rectangle", "aire_carre", "aire_comprendre"],
  agrandissement_volume: ["volume_pave", "volume_lien_aire", "agrandissement_aire"],
  echelle_defi: [
    "echelle_distance_reelle",
    "echelle_distance_plan",
    "agrandissement_aire",
    "agrandissement_volume",
  ],

  // =========================
  // PROPORTIONNALITÉ
  // =========================
  prop_table: ["prop_reconnaitre", "fraction_comparer"],
  prop_coeff: ["prop_table", "fraction_comparer"],
  prop_quatrieme: ["prop_table", "prop_coeff", "fraction_comparer"],
  prop_pourcentage: ["prop_coeff", "fraction_comparer"],
  prop_coeff_multiplicateur: ["prop_pourcentage", "prop_coeff"],
  prop_evolution: ["prop_pourcentage", "prop_coeff_multiplicateur", "relatif_calcul"],
  prop_probleme: [
    "prop_quatrieme",
    "prop_coeff",
    "prop_pourcentage",
    "prop_evolution",
    "fraction_quantite",
    "relatif_calcul",
  ],
  prop_defi: ["prop_evolution", "prop_probleme", "prop_coeff_multiplicateur"],

  // =========================
  // EXPRESSIONS LITTÉRALES
  // =========================
  litteral_expression_traduire: ["relatif_calcul"],
  litteral_expression_substituer: ["relatif_calcul"],
  litteral_expression_reduire: ["litteral_expression_substituer"],
  litteral_expression_defi: ["litteral_expression_reduire"],

  // =========================
  // DISTRIBUTIVITÉ
  // =========================
  litteral_distributivite_simple: ["litteral_expression_reduire"],
  litteral_distributivite_double: ["litteral_distributivite_reconnaitre"],
  litteral_distributivite_reduire: ["litteral_expression_reduire", "litteral_distributivite_double"],
  litteral_distributivite_reconnaitre: ["litteral_expression_comprendre"],
  litteral_distributivite_defi: ["litteral_distributivite_reduire", "litteral_distributivite_double"],

  // =========================
  // IDENTITÉS REMARQUABLES
  // =========================
  litteral_identite_lier_distributivite: ["litteral_distributivite_double", "litteral_distributivite_reduire"],
  litteral_identite_reconnaitre: ["litteral_identite_lier_distributivite", "litteral_distributivite_reconnaitre"],
  litteral_identite_developper: ["litteral_identite_reconnaitre", "litteral_identite_lier_distributivite", "litteral_distributivite_double"],
  litteral_identite_choisir: ["litteral_identite_reconnaitre", "litteral_identite_developper"],
  litteral_identite_defi: ["litteral_identite_choisir", "litteral_identite_developper", "litteral_distributivite_double"],


  // =========================
  // FACTORISATION
  // =========================
  litteral_facteur_commun: ["litteral_distributivite_simple", "litteral_expression_reduire"],
  litteral_factoriser_simple: ["litteral_facteur_commun", "litteral_distributivite_simple"],
  litteral_factoriser_identite: ["litteral_factoriser_simple", "litteral_identite_reconnaitre", "litteral_identite_developper"],
  litteral_factoriser_verifier: ["litteral_factoriser_simple", "litteral_distributivite_simple"],
  litteral_factorisation_defi: ["litteral_factoriser_identite", "litteral_factoriser_verifier"],

  // =========================
  // ÉQUATIONS
  // =========================
  equation_traduire: ["litteral_expression_traduire"],
  equation_resoudre_simple: ["litteral_expression_substituer", "relatif_calcul"],
  equation_resoudre_reduction: ["litteral_expression_reduire"],
  equation_resoudre_distributivite: ["litteral_distributivite_simple"],
  equation_verifier: ["litteral_expression_substituer"],
  equation_probleme: ["equation_traduire", "relatif_calcul"],
  equation_defi: ["equation_probleme", "equation_resoudre_distributivite"],


  // =========================
  // PYTHAGORE
  // =========================
  pythagore_carre_racine: ["relatif_calcul"],
  pythagore_reconnaitre: [],
  pythagore_calculer_hypotenuse: [
    "pythagore_carre_racine",
    "pythagore_reconnaitre",
  ],
  pythagore_calculer_cote: [
    "pythagore_carre_racine",
    "pythagore_reconnaitre",
  ],
  pythagore_reciproque_verifier: ["pythagore_carre_racine"],
  pythagore_reciproque_conclure: [
    "pythagore_reciproque_verifier",
    "pythagore_reconnaitre",
  ],
  pythagore_rediger: [
    "pythagore_calculer_hypotenuse",
    "pythagore_calculer_cote",
    "pythagore_reciproque_conclure",
  ],
  pythagore_defi: [
    "pythagore_rediger",
    "pythagore_reciproque_conclure",
  ],

  // =========================
  // THALÈS
  // =========================
  thales_configuration: ["prop_reconnaitre"],
  thales_rapport: [
    "thales_configuration",
    "prop_table",
    "prop_coeff",
    "fraction_comparer",
  ],
  thales_calculer_longueur: [
    "thales_rapport",
    "prop_quatrieme",
    "prop_coeff",
    "relatif_calcul",
  ],
  thales_reciproque_verifier: [
    "thales_rapport",
    "fraction_comparer",
    "prop_coeff",
  ],
  thales_reciproque_conclure: [
    "thales_reciproque_verifier",
    "thales_configuration",
  ],
  thales_rediger: [
    "thales_calculer_longueur",
    "thales_reciproque_conclure",
    "prop_probleme",
  ],
  thales_defi: [
    "thales_rediger",
    "thales_calculer_longueur",
    "thales_reciproque_conclure",
    "prop_defi",
  ],

  // =========================
  // PARALLÉLOGRAMMES
  // =========================
  quadrilatere_parallelogramme_propriete: ["quadrilatere_parallelogramme_reconnaitre"],
  quadrilatere_parallelogramme_diagonale: ["quadrilatere_parallelogramme_propriete"],
  quadrilatere_parallelogramme_montrer: ["quadrilatere_parallelogramme_propriete", "quadrilatere_parallelogramme_diagonale"],
  quadrilatere_parallelogramme_aire: ["aire_parallelogramme"],
  quadrilatere_parallelogramme_probleme: ["quadrilatere_parallelogramme_montrer", "quadrilatere_parallelogramme_aire"],
  quadrilatere_parallelogramme_defi: ["quadrilatere_parallelogramme_probleme"],

  // =========================
  // TRANSFORMATIONS
  // =========================
  // =========================
  // TRANSFORMATIONS
  // =========================
    sym_centrale: ["sym_axiale"],

    sym_translation: [
      "sym_axiale",
      "sym_centrale",
    ],

    sym_rotation: [
      "sym_centrale",
    ],

    sym_transformation_propriete: [
      "sym_axiale",
      "sym_centrale",
      "sym_translation",
      "sym_rotation",
    ],

    sym_transformation_defi: [
      "sym_axiale",
      "sym_centrale",
      "sym_translation",
      "sym_rotation",
      "sym_transformation_propriete",
    ],

  // =========================
  // PÉRIMÈTRES
  // =========================
  aire_perimetre_rectangle: ["relatif_addition"],
  aire_perimetre_carre: ["relatif_multiplication"],
  aire_perimetre_triangle: ["relatif_addition"],
  aire_perimetre_figure: [
    "aire_perimetre_rectangle",
    "aire_perimetre_carre",
    "aire_perimetre_triangle",
  ],
  aire_perimetre_probleme: ["aire_perimetre_figure"],
  aire_perimetre_defi: ["aire_perimetre_probleme"],

  // =========================
  // AIRES
  // =========================
  aire_rectangle: ["relatif_multiplication"],
  aire_carre: ["relatif_multiplication"],
  aire_triangle: ["aire_rectangle"],
  aire_parallelogramme: ["aire_rectangle"],
  aire_figure: [
    "aire_rectangle",
    "aire_carre",
    "aire_triangle",
    "aire_parallelogramme",
  ],
  aire_probleme: ["aire_figure"],
  aire_defi: ["aire_probleme"],

  // =========================
  // VOLUMES
  // =========================
  volume_lien_aire: [
    "aire_rectangle",
    "aire_triangle",
    "aire_parallelogramme",
  ],

  volume_pave: ["volume_lien_aire", "aire_rectangle", "relatif_multiplication"],

  volume_prisme: [
    "volume_lien_aire",
    "aire_triangle",
    "aire_parallelogramme",
    "relatif_multiplication",
  ],

  volume_cylindre: [
    "volume_lien_aire",
    "aire_carre",
    "relatif_multiplication",
  ],

  volume_unite: ["volume_pave", "volume_prisme", "volume_cylindre"],

  volume_defi: [
    "volume_pave",
    "volume_prisme",
    "volume_cylindre",
    "volume_unite",
  ],

// =========================
// STATISTIQUES
// =========================
  stat_lire_graphique: ["stat_lire_tableau"],
  stat_effectif: ["stat_lire_tableau"],
  stat_frequence: ["stat_effectif"],
  // ⭐ Ajouté le 28/08 avec la scission : le défi de la notion neuve s'appuie
  // sur la LECTURE, jamais sur les indicateurs — c'est toute la coupure.
  stat_donnee_defi: ["stat_frequence", "stat_lire_graphique", "stat_lire_tableau"],
  stat_moyenne: ["stat_effectif", "relatif_calcul"],
  stat_mediane: ["stat_effectif"],
  stat_etendue: ["stat_lire_tableau"],
  stat_interpreter: ["stat_moyenne", "stat_mediane", "stat_etendue"],
  stat_probleme: ["stat_interpreter"],
  stat_defi: ["stat_probleme"],

  // =========================
  // PROBABILITÉS
  // =========================
  proba_issue: ["proba_vocabulaire", "stat_lire_tableau"],
  proba_evenement: ["proba_vocabulaire", "proba_issue"],
  proba_equiprobabilite: ["proba_issue"],
  proba_calculer_fraction: [
    "proba_issue",
    "proba_equiprobabilite",
    "fraction_comparer",
  ],
  proba_convertir: ["proba_calculer_fraction", "prop_pourcentage"],
  proba_comparer: [
    "proba_calculer_fraction",
    "fraction_comparer",
  ],
  proba_defi: [
    "proba_evenement",
    "proba_convertir",
    "proba_comparer",
  ],
  // =========================
  // ALGORITHMIQUE
  // =========================
  algo_instruction_conditionnelle: [
    "algo_condition",
    "relatif_calcul",
  ],

  algo_variable: [
    "algo_instruction_conditionnelle",
    "litteral_expression_substituer",
    "relatif_calcul",
  ],

  algo_programme_objectif: [
    "algo_variable",
    "algo_instruction_conditionnelle",
    "prop_reconnaitre",
    "equation_reconnaitre",
  ],

  algo_modifier: [
    "algo_programme_objectif",
    "algo_variable",
    "litteral_expression_reduire",
  ],

  algo_defi: [
    "algo_condition",
    "algo_instruction_conditionnelle",
    "algo_variable",
    "algo_programme_objectif",
    "algo_modifier",
    "relatif_probleme",
    "prop_probleme",
  ],
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

export const matrix4eMathsValues = buildMatrix(
  microSkillIndex4eMaths,
  directParents,
  supportLinks
);

export const matrix4eMaths: SkillMatrix = {
  id: "4e_maths_matrix_v4",
  classe: "4e",
  matiere: "maths",
  microSkillIndex: [...microSkillIndex4eMaths],
  matrix: matrix4eMathsValues,
};