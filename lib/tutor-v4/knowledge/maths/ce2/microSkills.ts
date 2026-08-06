// Micro-compétences de mathématiques pour la classe de CE2.
// Référence : programme officiel de mathématiques du cycle 2,
// BO n° 41 du 31 octobre 2024, applicable à la rentrée 2025.

// lib/tutor-v4/knowledge/maths/ce2/microSkills.ts

// Relu ligne à ligne contre le tableau CE2 du programme le 05/08/2026. Trois
// contraintes du texte pèsent sur presque toutes les micro-compétences de
// mesure, et il ne faut pas les perdre de vue en écrivant les questions :
//   — pas de tableau de conversion au cycle 2, on s'appuie sur les relations
//     connues entre les unités ;
//   — l'écriture à virgule n'est PAS attendue pour les longueurs, les masses
//     et les contenances… mais elle l'est pour la monnaie, où elle est même le
//     cœur du programme de CE2 ;
//   — les fractions restent inférieures ou égales à 1, dénominateur au plus 12.

import type { MicroSkillSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

export const microSkills: MicroSkillSource[] = [
  // ============================================================
  // NOMBRES ENTIERS — jusqu'à 10 000
  // ============================================================

  { id: "ce2_entier_lire_ecrire", label: "Lire et écrire les nombres jusqu'à 10 000", notionId: "nombre_entier", prerequis: [] },
  { id: "ce2_entier_milliers", label: "Comprendre milliers, centaines, dizaines et unités", notionId: "nombre_entier", prerequis: ["ce2_entier_lire_ecrire"] },
  { id: "ce2_entier_decomposer", label: "Décomposer un nombre jusqu'à 10 000", notionId: "nombre_entier", prerequis: ["ce2_entier_milliers"] },
  { id: "ce2_entier_comparer", label: "Comparer et ranger des nombres jusqu'à 10 000", notionId: "nombre_entier", prerequis: ["ce2_entier_lire_ecrire"] },
  // L'arrondi n'apparaît pas au cycle 2 : on s'en tient à l'encadrement.
  { id: "ce2_entier_encadrer", label: "Encadrer un nombre entre deux dizaines, centaines ou milliers", notionId: "nombre_entier", prerequis: ["ce2_entier_comparer"] },
  { id: "ce2_entier_droite", label: "Placer un nombre sur une droite graduée", notionId: "nombre_entier", prerequis: ["ce2_entier_comparer"] },
  { id: "ce2_entier_defi", label: "Résoudre un défi sur les nombres", notionId: "nombre_entier", prerequis: ["ce2_entier_decomposer", "ce2_entier_droite"] },

  // ============================================================
  // SUITES DE NOMBRES
  // ============================================================

  { id: "ce2_suite_continuer", label: "Continuer une suite de nombres", notionId: "suite_nombre", prerequis: ["ce2_entier_lire_ecrire"] },
  { id: "ce2_suite_regle", label: "Trouver la règle d'une suite", notionId: "suite_nombre", prerequis: ["ce2_suite_continuer"] },
  { id: "ce2_suite_croissante_decroissante", label: "Reconnaître une suite croissante ou décroissante", notionId: "suite_nombre", prerequis: ["ce2_entier_comparer"] },
  { id: "ce2_suite_defi", label: "Résoudre un défi de suites", notionId: "suite_nombre", prerequis: ["ce2_suite_regle"] },

  // ============================================================
  // ADDITION ET SOUSTRACTION — posées dès la période 1
  // ============================================================

  { id: "ce2_addition_posee", label: "Poser une addition avec retenues", notionId: "addition_soustraction", prerequis: ["ce2_entier_decomposer"] },
  { id: "ce2_soustraction_posee", label: "Poser une soustraction avec retenues", notionId: "addition_soustraction", prerequis: ["ce2_entier_decomposer"] },
  { id: "ce2_add_sous_complement", label: "Compléter une égalité additive", notionId: "addition_soustraction", prerequis: ["ce2_addition_posee", "ce2_soustraction_posee"] },
  { id: "ce2_add_sous_estimer", label: "Contrôler un résultat par estimation", notionId: "addition_soustraction", prerequis: ["ce2_entier_encadrer"] },
  { id: "ce2_add_sous_defi", label: "Résoudre un défi addition-soustraction", notionId: "addition_soustraction", prerequis: ["ce2_add_sous_complement"] },

  // ============================================================
  // MULTIPLICATION — posée en période 4
  // ============================================================

  { id: "ce2_tables_2_3_4_5_10", label: "Connaître les tables de 2, 3, 4, 5 et 10", notionId: "multiplication", prerequis: ["ce2_addition_posee"] },
  { id: "ce2_tables_6_7_8_9", label: "Connaître les tables de 6, 7, 8 et 9", notionId: "multiplication", prerequis: ["ce2_tables_2_3_4_5_10"] },
  { id: "ce2_multiplication_sens", label: "Relier multiplication, groupes égaux et tableau", notionId: "multiplication", prerequis: ["ce2_tables_2_3_4_5_10"] },
  { id: "ce2_multiplication_posee", label: "Poser une multiplication par un nombre à un chiffre", notionId: "multiplication", prerequis: ["ce2_tables_6_7_8_9"] },
  { id: "ce2_multiplication_10_100", label: "Multiplier par 10 ou par 100", notionId: "multiplication", prerequis: ["ce2_entier_milliers"] },
  { id: "ce2_multiplication_defi", label: "Résoudre un défi de multiplication", notionId: "multiplication", prerequis: ["ce2_multiplication_posee"] },

  // ============================================================
  // DIVISION — sens du partage et du groupement.
  // ⚠️ La division POSÉE n'est pas au programme du CE2 : on reste sur le sens,
  // le lien avec la multiplication et l'interprétation du reste.
  // ============================================================

  { id: "ce2_division_sens", label: "Comprendre la division comme partage ou groupement", notionId: "division", prerequis: ["ce2_multiplication_sens"] },
  { id: "ce2_division_lien_multiplication", label: "Utiliser le lien entre multiplication et division", notionId: "division", prerequis: ["ce2_tables_6_7_8_9"] },
  { id: "ce2_division_reste", label: "Interpréter le reste d'une division", notionId: "division", prerequis: ["ce2_division_sens"] },
  { id: "ce2_division_probleme", label: "Utiliser la division dans un problème", notionId: "division", prerequis: ["ce2_division_lien_multiplication"] },
  { id: "ce2_division_defi", label: "Résoudre un défi de division", notionId: "division", prerequis: ["ce2_division_reste"] },

  // ============================================================
  // CALCUL MENTAL — fluence visée : 15 résultats en 3 minutes.
  // Les huit familles ci-dessous sont celles que le programme nomme une par
  // une. Elles remplacent l'ancienne « priorités simples sans parenthèses »,
  // qui relève du cycle 3 et n'avait rien à faire ici.
  // ============================================================

  { id: "ce2_calcul_complements", label: "Utiliser des compléments à 100 et à 1 000", notionId: "calcul_mental", prerequis: ["ce2_entier_milliers"] },
  { id: "ce2_calcul_doubles_moities", label: "Utiliser doubles et moitiés", notionId: "calcul_mental", prerequis: ["ce2_tables_2_3_4_5_10"] },
  { id: "ce2_calcul_decomposer", label: "Calculer mentalement par décomposition", notionId: "calcul_mental", prerequis: ["ce2_entier_decomposer"] },
  { id: "ce2_calcul_ajouter_9_19", label: "Ajouter 8, 9, 18 ou 19", notionId: "calcul_mental", prerequis: ["ce2_calcul_decomposer"] },
  { id: "ce2_calcul_soustraire_9_19", label: "Soustraire 9, 19, 29 ou 39", notionId: "calcul_mental", prerequis: ["ce2_calcul_decomposer"] },
  { id: "ce2_calcul_multiplier_4_8", label: "Multiplier par 4 ou par 8 en doublant", notionId: "calcul_mental", prerequis: ["ce2_calcul_doubles_moities"] },
  { id: "ce2_calcul_multiples_25", label: "Utiliser les multiples de 25", notionId: "calcul_mental", prerequis: ["ce2_calcul_doubles_moities"] },
  { id: "ce2_calcul_dizaines_entieres", label: "Multiplier un nombre inférieur à 10 par un nombre entier de dizaines", notionId: "calcul_mental", prerequis: ["ce2_multiplication_10_100"] },
  { id: "ce2_calcul_distributivite", label: "Multiplier un nombre entre 11 et 99 par un nombre à un chiffre en décomposant", notionId: "calcul_mental", prerequis: ["ce2_calcul_decomposer", "ce2_tables_6_7_8_9"] },
  { id: "ce2_calcul_fluence", label: "Enchaîner quinze résultats en trois minutes", notionId: "calcul_mental", prerequis: ["ce2_tables_6_7_8_9", "ce2_calcul_complements"] },
  { id: "ce2_calcul_defi", label: "Résoudre un défi de calcul mental", notionId: "calcul_mental", prerequis: ["ce2_calcul_decomposer", "ce2_calcul_doubles_moities"] },

  // ============================================================
  // FRACTIONS — inférieures ou égales à 1, dénominateur au plus 12.
  // Le programme demande explicitement l'ÉGALITÉ de fractions (période 1) et
  // les fractions d'une unité de longueur avec la bande unité (période 3).
  // ============================================================

  { id: "ce2_fraction_unite", label: "Comprendre l'unité dans une fraction", notionId: "fraction", prerequis: ["ce2_division_sens"] },
  { id: "ce2_fraction_lire", label: "Lire et nommer une fraction simple", notionId: "fraction", prerequis: ["ce2_fraction_unite"] },
  { id: "ce2_fraction_representer", label: "Représenter une fraction d'un tout", notionId: "fraction", prerequis: ["ce2_fraction_lire"] },
  { id: "ce2_fraction_egalite", label: "Reconnaître deux fractions égales", notionId: "fraction", prerequis: ["ce2_fraction_representer"] },
  { id: "ce2_fraction_bande_unite", label: "Exprimer une fraction d'une unité de longueur avec la bande unité", notionId: "fraction", prerequis: ["ce2_fraction_representer"] },
  { id: "ce2_fraction_droite", label: "Placer une fraction simple sur une droite graduée", notionId: "fraction", prerequis: ["ce2_fraction_lire", "ce2_entier_droite"] },
  { id: "ce2_fraction_comparer_unite", label: "Comparer une fraction simple à l'unité", notionId: "fraction", prerequis: ["ce2_fraction_representer"] },
  { id: "ce2_fraction_defi", label: "Résoudre un défi de fractions", notionId: "fraction", prerequis: ["ce2_fraction_droite", "ce2_fraction_comparer_unite"] },

  // ============================================================
  // RÉSOLUTION DE PROBLÈMES — six types nommés par le programme.
  // Les trois derniers manquaient : comparaison multiplicative, produit
  // cartésien, et problème mixte à trois étapes.
  // ============================================================

  { id: "ce2_probleme_choisir_operation", label: "Choisir une opération adaptée", notionId: "probleme", prerequis: ["ce2_addition_posee", "ce2_tables_2_3_4_5_10"] },
  { id: "ce2_probleme_une_etape", label: "Résoudre un problème parties-tout à une étape", notionId: "probleme", prerequis: ["ce2_probleme_choisir_operation"] },
  { id: "ce2_probleme_comparaison", label: "Résoudre un problème additif de comparaison", notionId: "probleme", prerequis: ["ce2_probleme_une_etape"] },
  { id: "ce2_probleme_deux_etapes", label: "Résoudre un problème à deux étapes", notionId: "probleme", prerequis: ["ce2_probleme_une_etape"] },
  { id: "ce2_probleme_trois_etapes", label: "Résoudre un problème mixte à trois étapes", notionId: "probleme", prerequis: ["ce2_probleme_deux_etapes"] },
  { id: "ce2_probleme_comparaison_multiplicative", label: "Résoudre un problème de comparaison multiplicative", notionId: "probleme", prerequis: ["ce2_multiplication_sens", "ce2_probleme_comparaison"] },
  { id: "ce2_probleme_produit_cartesien", label: "Résoudre un problème de produit cartésien", notionId: "probleme", prerequis: ["ce2_multiplication_sens"] },
  { id: "ce2_probleme_schema_barre", label: "Utiliser un schéma en barres simple", notionId: "probleme", prerequis: ["ce2_probleme_une_etape"] },
  { id: "ce2_probleme_verifier", label: "Vérifier la vraisemblance d'un résultat", notionId: "probleme", prerequis: ["ce2_add_sous_estimer"] },
  { id: "ce2_probleme_defi", label: "Résoudre un défi de problème", notionId: "probleme", prerequis: ["ce2_probleme_deux_etapes"] },

  // ============================================================
  // LONGUEURS — m, dm, cm, mm, km.
  // ⚠️ Sans tableau de conversion et sans écriture à virgule : on relie les
  // unités entre elles (1 m = 100 cm, 1 km = 1 000 m…).
  // ============================================================

  { id: "ce2_longueur_unites", label: "Connaître les unités m, dm, cm, mm et km", notionId: "longueur", prerequis: ["ce2_entier_milliers"] },
  { id: "ce2_longueur_relations", label: "Utiliser les relations entre unités de longueur", notionId: "longueur", prerequis: ["ce2_longueur_unites"] },
  { id: "ce2_longueur_mesurer", label: "Mesurer et tracer des segments", notionId: "longueur", prerequis: ["ce2_entier_lire_ecrire"] },
  { id: "ce2_longueur_comparer", label: "Comparer des longueurs", notionId: "longueur", prerequis: ["ce2_longueur_relations"] },
  { id: "ce2_longueur_choisir_unite", label: "Choisir l'unité la mieux adaptée à une longueur", notionId: "longueur", prerequis: ["ce2_longueur_unites"] },
  { id: "ce2_longueur_estimer", label: "Estimer une longueur à partir de références", notionId: "longueur", prerequis: ["ce2_longueur_choisir_unite"] },
  { id: "ce2_longueur_probleme", label: "Résoudre un problème de longueurs", notionId: "longueur", prerequis: ["ce2_probleme_une_etape"] },
  { id: "ce2_longueur_defi", label: "Résoudre un défi de longueurs", notionId: "longueur", prerequis: ["ce2_longueur_probleme"] },

  // ============================================================
  // MASSES — g, kg et t. La tonne manquait.
  // ============================================================

  { id: "ce2_masse_unites", label: "Connaître les unités g, kg et t", notionId: "masse", prerequis: ["ce2_entier_milliers"] },
  { id: "ce2_masse_relations", label: "Utiliser les relations entre unités de masse", notionId: "masse", prerequis: ["ce2_masse_unites"] },
  { id: "ce2_masse_comparer", label: "Comparer des masses", notionId: "masse", prerequis: ["ce2_masse_relations"] },
  { id: "ce2_masse_choisir_unite", label: "Choisir l'unité la mieux adaptée à une masse", notionId: "masse", prerequis: ["ce2_masse_unites"] },
  { id: "ce2_masse_estimer", label: "Estimer la masse d'un objet à partir de références", notionId: "masse", prerequis: ["ce2_masse_choisir_unite"] },
  { id: "ce2_masse_probleme", label: "Résoudre un problème de masses", notionId: "masse", prerequis: ["ce2_probleme_une_etape"] },
  { id: "ce2_masse_defi", label: "Résoudre un défi de masses", notionId: "masse", prerequis: ["ce2_masse_probleme"] },

  // ============================================================
  // CONTENANCES — L, dL et cL. 1 L = 10 dL = 100 cL.
  // ============================================================

  { id: "ce2_contenance_unites", label: "Connaître les unités L, dL et cL", notionId: "contenance", prerequis: ["ce2_entier_milliers"] },
  { id: "ce2_contenance_relations", label: "Savoir que 1 L vaut 10 dL et 100 cL", notionId: "contenance", prerequis: ["ce2_contenance_unites"] },
  { id: "ce2_contenance_comparer", label: "Comparer des contenances", notionId: "contenance", prerequis: ["ce2_contenance_relations"] },
  { id: "ce2_contenance_probleme", label: "Résoudre un problème de contenances", notionId: "contenance", prerequis: ["ce2_probleme_une_etape"] },
  { id: "ce2_contenance_defi", label: "Résoudre un défi de contenances", notionId: "contenance", prerequis: ["ce2_contenance_probleme"] },

  // ============================================================
  // TEMPS ET DURÉES — horloge à aiguilles, durées dans la journée.
  // ============================================================

  { id: "ce2_duree_lire_heure", label: "Lire l'heure sur une horloge à aiguilles", notionId: "duree", prerequis: ["ce2_entier_lire_ecrire"] },
  { id: "ce2_duree_positionner_aiguilles", label: "Positionner les aiguilles pour une heure donnée", notionId: "duree", prerequis: ["ce2_duree_lire_heure"] },
  { id: "ce2_duree_convertir", label: "Utiliser les relations entre heures et minutes", notionId: "duree", prerequis: ["ce2_tables_6_7_8_9"] },
  { id: "ce2_duree_calculer", label: "Mesurer une durée écoulée dans la journée", notionId: "duree", prerequis: ["ce2_duree_convertir"] },
  { id: "ce2_duree_probleme", label: "Résoudre un problème de durée à une ou deux étapes", notionId: "duree", prerequis: ["ce2_duree_calculer", "ce2_probleme_une_etape"] },
  { id: "ce2_duree_defi", label: "Résoudre un défi de durées", notionId: "duree", prerequis: ["ce2_duree_calculer"] },

  // ============================================================
  // MONNAIE — ⚠️ c'est ICI que l'écriture à virgule est attendue au CE2,
  // et nulle part ailleurs en grandeurs et mesures.
  // ============================================================

  { id: "ce2_monnaie_ecriture_virgule", label: "Écrire un montant en euros et centimes avec une virgule", notionId: "monnaie", prerequis: ["ce2_entier_lire_ecrire"] },
  { id: "ce2_monnaie_constituer", label: "Constituer une somme en euros et centimes", notionId: "monnaie", prerequis: ["ce2_monnaie_ecriture_virgule"] },
  { id: "ce2_monnaie_additionner", label: "Additionner des montants avec virgule", notionId: "monnaie", prerequis: ["ce2_monnaie_ecriture_virgule", "ce2_addition_posee"] },
  { id: "ce2_monnaie_rendre", label: "Soustraire des montants et rendre la monnaie", notionId: "monnaie", prerequis: ["ce2_monnaie_ecriture_virgule", "ce2_soustraction_posee"] },
  { id: "ce2_monnaie_probleme", label: "Résoudre un problème de monnaie", notionId: "monnaie", prerequis: ["ce2_probleme_une_etape"] },
  { id: "ce2_monnaie_defi", label: "Résoudre un défi de monnaie", notionId: "monnaie", prerequis: ["ce2_monnaie_rendre"] },

  // ============================================================
  // PÉRIMÈTRES — savoir ce que c'est, comparer, déterminer.
  // ============================================================

  { id: "ce2_perimetre_comprendre", label: "Comprendre ce qu'est le périmètre d'une figure", notionId: "perimetre", prerequis: ["ce2_longueur_mesurer"] },
  { id: "ce2_perimetre_polygone", label: "Déterminer le périmètre d'un polygone", notionId: "perimetre", prerequis: ["ce2_addition_posee"] },
  { id: "ce2_perimetre_comparer", label: "Comparer les périmètres de plusieurs polygones", notionId: "perimetre", prerequis: ["ce2_perimetre_polygone"] },
  { id: "ce2_perimetre_rectangle", label: "Déterminer le périmètre d'un rectangle ou d'un carré", notionId: "perimetre", prerequis: ["ce2_multiplication_sens"] },
  { id: "ce2_perimetre_defi", label: "Résoudre un défi de périmètre", notionId: "perimetre", prerequis: ["ce2_perimetre_polygone", "ce2_perimetre_rectangle"] },

  // ============================================================
  // REPÉRAGE SUR QUADRILLAGE
  // ⚠️ Le tableau CE2 du programme ne comporte plus de ligne « repérage dans
  // l'espace » (elle est au CP et au CE1). On garde ces micro-compétences
  // comme SUPPORT : le quadrillage sert à construire les figures et à
  // compléter une symétrie, deux attendus explicites du CE2.
  // ============================================================

  { id: "ce2_reperage_coordonnees", label: "Lire et placer un point sur un quadrillage", notionId: "reperage", prerequis: ["ce2_entier_lire_ecrire"] },
  { id: "ce2_reperage_deplacement", label: "Décrire un déplacement sur un quadrillage", notionId: "reperage", prerequis: ["ce2_reperage_coordonnees"] },
  { id: "ce2_reperage_plan", label: "Lire un plan simple", notionId: "reperage", prerequis: ["ce2_reperage_deplacement"] },
  { id: "ce2_reperage_defi", label: "Résoudre un défi de repérage", notionId: "reperage", prerequis: ["ce2_reperage_plan"] },

  // ============================================================
  // DROITES ET ANGLES DROITS — le CODAGE est un attendu nommé du CE2.
  // ============================================================

  { id: "ce2_droite_alignement", label: "Reconnaître et tracer alignements, droites et segments", notionId: "droites_angles", prerequis: ["ce2_reperage_coordonnees"] },
  { id: "ce2_angle_droit", label: "Reconnaître et tracer un angle droit à l'équerre", notionId: "droites_angles", prerequis: ["ce2_droite_alignement"] },
  { id: "ce2_angle_droit_codage", label: "Utiliser le codage de l'angle droit", notionId: "droites_angles", prerequis: ["ce2_angle_droit"] },
  { id: "ce2_segments_codage", label: "Utiliser le codage des segments de même longueur", notionId: "droites_angles", prerequis: ["ce2_angle_droit_codage"] },
  { id: "ce2_droite_perpendiculaire", label: "Reconnaître deux côtés perpendiculaires dans une figure", notionId: "droites_angles", prerequis: ["ce2_angle_droit"] },
  { id: "ce2_droite_defi", label: "Résoudre un défi de droites et d'angles droits", notionId: "droites_angles", prerequis: ["ce2_droite_perpendiculaire"] },

  // ============================================================
  // FIGURES PLANES — le losange et le triangle rectangle entrent au CE2.
  // ============================================================

  { id: "ce2_figure_reconnaitre", label: "Reconnaître carré, rectangle, triangle et cercle", notionId: "figures_planes", prerequis: ["ce2_droite_alignement"] },
  { id: "ce2_figure_triangle_rectangle", label: "Reconnaître et décrire un triangle rectangle", notionId: "figures_planes", prerequis: ["ce2_figure_reconnaitre", "ce2_angle_droit"] },
  { id: "ce2_figure_losange", label: "Reconnaître et décrire un losange", notionId: "figures_planes", prerequis: ["ce2_figure_reconnaitre"] },
  { id: "ce2_figure_proprietes", label: "Utiliser les propriétés des angles et les égalités de longueur", notionId: "figures_planes", prerequis: ["ce2_angle_droit"] },
  { id: "ce2_figure_construire", label: "Construire une figure à la règle, à l'équerre ou au compas", notionId: "figures_planes", prerequis: ["ce2_figure_proprietes"] },
  { id: "ce2_figure_cercle", label: "Tracer un cercle au compas", notionId: "figures_planes", prerequis: ["ce2_figure_reconnaitre"] },
  { id: "ce2_figure_defi", label: "Résoudre un défi de figures planes", notionId: "figures_planes", prerequis: ["ce2_figure_construire"] },

  // ============================================================
  // SOLIDES — la pyramide et la construction à partir d'un patron.
  // ============================================================

  { id: "ce2_solide_reconnaitre", label: "Nommer un cube, une boule, un pavé, un cône, une pyramide ou un cylindre", notionId: "solides", prerequis: ["ce2_figure_reconnaitre"] },
  { id: "ce2_solide_decrire", label: "Décrire un solide avec faces, arêtes et sommets", notionId: "solides", prerequis: ["ce2_solide_reconnaitre"] },
  { id: "ce2_solide_faces_pyramide", label: "Connaître la nature des faces d'une pyramide", notionId: "solides", prerequis: ["ce2_solide_decrire", "ce2_figure_reconnaitre"] },
  { id: "ce2_solide_patron", label: "Construire un cube à partir d'un patron", notionId: "solides", prerequis: ["ce2_solide_decrire"] },
  { id: "ce2_solide_defi", label: "Résoudre un défi sur les solides", notionId: "solides", prerequis: ["ce2_solide_decrire"] },

  // ============================================================
  // SYMÉTRIE AXIALE — pliage, papier calque, quadrillage.
  // ============================================================

  { id: "ce2_symetrie_axe", label: "Reconnaître un ou plusieurs axes de symétrie", notionId: "symetrie", prerequis: ["ce2_figure_reconnaitre"] },
  { id: "ce2_symetrie_completer", label: "Compléter une figure pour la rendre symétrique", notionId: "symetrie", prerequis: ["ce2_symetrie_axe"] },
  { id: "ce2_symetrie_construire", label: "Construire le symétrique d'un point sur quadrillage", notionId: "symetrie", prerequis: ["ce2_reperage_coordonnees"] },
  { id: "ce2_symetrie_defi", label: "Résoudre un défi de symétrie", notionId: "symetrie", prerequis: ["ce2_symetrie_completer", "ce2_symetrie_construire"] },

  // ============================================================
  // TABLEAUX ET GRAPHIQUES — le tableau à DOUBLE ENTRÉE et la PRODUCTION
  // de données sont deux attendus nommés qui manquaient.
  // ============================================================

  { id: "ce2_donnees_lire_tableau", label: "Lire un tableau", notionId: "donnees", prerequis: ["ce2_entier_lire_ecrire"] },
  { id: "ce2_donnees_double_entree", label: "Lire un tableau à double entrée", notionId: "donnees", prerequis: ["ce2_donnees_lire_tableau"] },
  { id: "ce2_donnees_completer_tableau", label: "Compléter un tableau", notionId: "donnees", prerequis: ["ce2_donnees_lire_tableau"] },
  { id: "ce2_donnees_lire_graphique", label: "Lire un diagramme en barres", notionId: "donnees", prerequis: ["ce2_donnees_lire_tableau"] },
  { id: "ce2_donnees_produire", label: "Produire un tableau ou un diagramme en barres", notionId: "donnees", prerequis: ["ce2_donnees_completer_tableau", "ce2_donnees_lire_graphique"] },
  { id: "ce2_donnees_interpreter", label: "Interpréter des données", notionId: "donnees", prerequis: ["ce2_donnees_lire_graphique"] },
  { id: "ce2_donnees_probleme", label: "Résoudre un problème à partir d'un tableau ou d'un diagramme", notionId: "donnees", prerequis: ["ce2_donnees_double_entree", "ce2_donnees_interpreter"] },
  { id: "ce2_donnees_defi", label: "Résoudre un défi avec des données", notionId: "donnees", prerequis: ["ce2_donnees_interpreter"] },

  // ============================================================
  // PROGRAMMES ET DÉPLACEMENTS CODÉS
  // ⚠️ Le tableau CE2 du nouveau programme ne comporte PAS de ligne
  // programmation : « produire une suite d'instructions qui code un
  // déplacement » est un attendu du CP et du CE1. On garde ces
  // micro-compétences en consolidation du cycle, à trancher avec Frédéric.
  // ============================================================

  { id: "ce2_algo_instruction", label: "Lire un programme d'instructions", notionId: "algorithmique", prerequis: ["ce2_reperage_deplacement"] },
  { id: "ce2_algo_deplacement", label: "Coder un déplacement sur un quadrillage", notionId: "algorithmique", prerequis: ["ce2_reperage_deplacement"] },
  { id: "ce2_algo_repetition", label: "Utiliser une répétition", notionId: "algorithmique", prerequis: ["ce2_suite_regle"] },
  { id: "ce2_algo_corriger", label: "Corriger une instruction dans un programme", notionId: "algorithmique", prerequis: ["ce2_algo_instruction"] },
  { id: "ce2_algo_defi", label: "Résoudre un défi d'algorithmique", notionId: "algorithmique", prerequis: ["ce2_algo_deplacement", "ce2_algo_corriger"] },
];
