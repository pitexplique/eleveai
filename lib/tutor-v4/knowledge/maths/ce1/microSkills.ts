// Micro-competences de mathematiques pour la classe de CE1.
// Reference : programme officiel de mathematiques du cycle 2,
// BO n. 41 du 31 octobre 2024, applicable a la rentree 2025.

import type { MicroSkillSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

export const microSkills: MicroSkillSource[] = [
  { id: "ce1_entier_lire_ecrire", label: "Lire et ecrire les nombres jusqu'a 1 000", notionId: "nombre_entier", prerequis: [] },
  { id: "ce1_entier_centaines", label: "Comprendre centaines, dizaines et unites", notionId: "nombre_entier", prerequis: ["ce1_entier_lire_ecrire"] },
  { id: "ce1_entier_decomposer", label: "Decomposer un nombre jusqu'a 1 000", notionId: "nombre_entier", prerequis: ["ce1_entier_centaines"] },
  { id: "ce1_entier_comparer", label: "Comparer et ranger des nombres", notionId: "nombre_entier", prerequis: ["ce1_entier_lire_ecrire"] },
  { id: "ce1_entier_encadrer", label: "Encadrer un nombre entre deux dizaines ou centaines", notionId: "nombre_entier", prerequis: ["ce1_entier_comparer"] },
  { id: "ce1_entier_droite", label: "Placer un nombre sur une droite graduee", notionId: "nombre_entier", prerequis: ["ce1_entier_comparer"] },
  { id: "ce1_entier_defi", label: "Resoudre un defi sur les nombres", notionId: "nombre_entier", prerequis: ["ce1_entier_decomposer", "ce1_entier_droite"] },

  { id: "ce1_suite_continuer", label: "Continuer une suite de nombres", notionId: "suite_nombre", prerequis: ["ce1_entier_lire_ecrire"] },
  { id: "ce1_suite_pas", label: "Trouver le pas d'une suite", notionId: "suite_nombre", prerequis: ["ce1_suite_continuer"] },
  { id: "ce1_suite_10_100", label: "Compter de 10 en 10 ou de 100 en 100", notionId: "suite_nombre", prerequis: ["ce1_entier_centaines"] },
  { id: "ce1_suite_defi", label: "Resoudre un defi de suites", notionId: "suite_nombre", prerequis: ["ce1_suite_pas"] },

  { id: "ce1_addition_posee", label: "Poser une addition avec retenue simple", notionId: "addition_soustraction", prerequis: ["ce1_entier_decomposer"] },
  { id: "ce1_soustraction_posee", label: "Poser une soustraction simple", notionId: "addition_soustraction", prerequis: ["ce1_entier_decomposer"] },
  { id: "ce1_add_sous_complement", label: "Trouver un terme manquant dans une addition ou soustraction", notionId: "addition_soustraction", prerequis: ["ce1_addition_posee", "ce1_soustraction_posee"] },
  { id: "ce1_add_sous_estimer", label: "Estimer l'ordre de grandeur d'un resultat", notionId: "addition_soustraction", prerequis: ["ce1_entier_encadrer"] },
  { id: "ce1_add_sous_defi", label: "Resoudre un defi addition-soustraction", notionId: "addition_soustraction", prerequis: ["ce1_add_sous_complement"] },

  { id: "ce1_multiplication_sens", label: "Comprendre la multiplication comme addition repetee", notionId: "multiplication", prerequis: ["ce1_addition_posee"] },
  { id: "ce1_table_2", label: "Connaitre la table de 2", notionId: "multiplication", prerequis: ["ce1_multiplication_sens"] },
  { id: "ce1_table_5", label: "Connaitre la table de 5", notionId: "multiplication", prerequis: ["ce1_multiplication_sens"] },
  { id: "ce1_table_10", label: "Connaitre la table de 10", notionId: "multiplication", prerequis: ["ce1_entier_centaines"] },
  { id: "ce1_multiplication_calculer", label: "Calculer un produit simple", notionId: "multiplication", prerequis: ["ce1_table_2", "ce1_table_5", "ce1_table_10"] },
  { id: "ce1_multiplication_defi", label: "Resoudre un defi de multiplication", notionId: "multiplication", prerequis: ["ce1_multiplication_calculer"] },

  { id: "ce1_division_partage", label: "Partager une quantite en parts egales", notionId: "division_partage", prerequis: ["ce1_multiplication_sens"] },
  { id: "ce1_division_groupement", label: "Faire des groupements egaux", notionId: "division_partage", prerequis: ["ce1_multiplication_sens"] },
  { id: "ce1_division_reste", label: "Comprendre qu'il peut rester des objets", notionId: "division_partage", prerequis: ["ce1_division_partage"] },
  { id: "ce1_division_defi", label: "Resoudre un defi de partage", notionId: "division_partage", prerequis: ["ce1_division_partage", "ce1_division_groupement"] },

  { id: "ce1_calcul_complements_100", label: "Connaitre des complements a 100", notionId: "calcul_mental", prerequis: ["ce1_entier_centaines"] },
  { id: "ce1_calcul_doubles_moities", label: "Utiliser doubles et moities", notionId: "calcul_mental", prerequis: ["ce1_table_2"] },
  { id: "ce1_calcul_plus_moins_9_11", label: "Ajouter ou retirer 9 ou 11", notionId: "calcul_mental", prerequis: ["ce1_addition_posee"] },
  { id: "ce1_calcul_multiplier_10", label: "Multiplier par 10", notionId: "calcul_mental", prerequis: ["ce1_table_10"] },
  { id: "ce1_calcul_defi", label: "Resoudre un defi de calcul mental", notionId: "calcul_mental", prerequis: ["ce1_calcul_complements_100", "ce1_calcul_doubles_moities"] },

  { id: "ce1_fraction_partage", label: "Comprendre une fraction comme partage de l'unite", notionId: "fraction", prerequis: ["ce1_division_partage"] },
  { id: "ce1_fraction_demi", label: "Reconnaitre un demi", notionId: "fraction", prerequis: ["ce1_fraction_partage"] },
  { id: "ce1_fraction_quart", label: "Reconnaitre un quart", notionId: "fraction", prerequis: ["ce1_fraction_partage"] },
  { id: "ce1_fraction_tiers", label: "Reconnaitre un tiers", notionId: "fraction", prerequis: ["ce1_fraction_partage"] },
  { id: "ce1_fraction_representer", label: "Representer une fraction simple", notionId: "fraction", prerequis: ["ce1_fraction_demi", "ce1_fraction_quart"] },
  { id: "ce1_fraction_defi", label: "Resoudre un defi de fractions simples", notionId: "fraction", prerequis: ["ce1_fraction_representer"] },

  { id: "ce1_probleme_operation", label: "Choisir l'operation adaptee", notionId: "probleme", prerequis: ["ce1_addition_posee", "ce1_soustraction_posee"] },
  { id: "ce1_probleme_add_sous", label: "Resoudre un probleme additif ou soustractif", notionId: "probleme", prerequis: ["ce1_probleme_operation"] },
  { id: "ce1_probleme_multiplicatif", label: "Resoudre un probleme multiplicatif simple", notionId: "probleme", prerequis: ["ce1_multiplication_sens"] },
  { id: "ce1_probleme_schema", label: "Utiliser un schema pour raisonner", notionId: "probleme", prerequis: ["ce1_probleme_operation"] },
  { id: "ce1_probleme_reponse", label: "Rediger une reponse avec l'unite", notionId: "probleme", prerequis: ["ce1_probleme_add_sous"] },
  { id: "ce1_probleme_defi", label: "Resoudre un defi de probleme", notionId: "probleme", prerequis: ["ce1_probleme_reponse", "ce1_probleme_multiplicatif"] },

  { id: "ce1_longueur_mesurer_cm_m", label: "Mesurer en centimetres et en metres", notionId: "longueur", prerequis: ["ce1_entier_lire_ecrire"] },
  { id: "ce1_longueur_comparer", label: "Comparer des longueurs", notionId: "longueur", prerequis: ["ce1_entier_comparer"] },
  { id: "ce1_longueur_convertir_simple", label: "Convertir m et cm dans des cas simples", notionId: "longueur", prerequis: ["ce1_entier_centaines"] },
  { id: "ce1_longueur_tracer", label: "Tracer un segment de longueur donnee", notionId: "longueur", prerequis: ["ce1_longueur_mesurer_cm_m"] },
  { id: "ce1_longueur_defi", label: "Resoudre un defi de longueurs", notionId: "longueur", prerequis: ["ce1_longueur_convertir_simple"] },

  { id: "ce1_masse_comparer", label: "Comparer des masses", notionId: "masse", prerequis: ["ce1_entier_comparer"] },
  { id: "ce1_masse_kg_g", label: "Utiliser kilogramme et gramme dans des cas simples", notionId: "masse", prerequis: ["ce1_entier_lire_ecrire"] },
  { id: "ce1_masse_probleme", label: "Resoudre un probleme simple de masses", notionId: "masse", prerequis: ["ce1_probleme_add_sous"] },
  { id: "ce1_masse_defi", label: "Resoudre un defi de masses", notionId: "masse", prerequis: ["ce1_masse_kg_g"] },

  { id: "ce1_contenance_comparer", label: "Comparer des contenances", notionId: "contenance", prerequis: ["ce1_entier_comparer"] },
  { id: "ce1_contenance_litre", label: "Utiliser le litre", notionId: "contenance", prerequis: ["ce1_entier_lire_ecrire"] },
  { id: "ce1_contenance_probleme", label: "Resoudre un probleme simple de contenances", notionId: "contenance", prerequis: ["ce1_probleme_add_sous"] },
  { id: "ce1_contenance_defi", label: "Resoudre un defi de contenances", notionId: "contenance", prerequis: ["ce1_contenance_litre"] },

  { id: "ce1_duree_lire_heure_demi", label: "Lire l'heure et la demi-heure", notionId: "duree", prerequis: ["ce1_entier_lire_ecrire"] },
  { id: "ce1_duree_calendrier", label: "Utiliser un calendrier", notionId: "duree", prerequis: ["ce1_suite_continuer"] },
  { id: "ce1_duree_calculer_simple", label: "Calculer une duree simple", notionId: "duree", prerequis: ["ce1_duree_lire_heure_demi"] },
  { id: "ce1_duree_defi", label: "Resoudre un defi de durees", notionId: "duree", prerequis: ["ce1_duree_calculer_simple"] },

  { id: "ce1_monnaie_constituer", label: "Constituer une somme en euros", notionId: "monnaie", prerequis: ["ce1_addition_posee"] },
  { id: "ce1_monnaie_rendre", label: "Calculer un rendu de monnaie simple", notionId: "monnaie", prerequis: ["ce1_soustraction_posee"] },
  { id: "ce1_monnaie_probleme", label: "Resoudre un probleme de monnaie", notionId: "monnaie", prerequis: ["ce1_probleme_add_sous"] },
  { id: "ce1_monnaie_defi", label: "Resoudre un defi de monnaie", notionId: "monnaie", prerequis: ["ce1_monnaie_rendre"] },

  { id: "ce1_reperage_cases_noeuds", label: "Lire cases et noeuds d'un quadrillage", notionId: "reperage", prerequis: ["ce1_entier_lire_ecrire"] },
  { id: "ce1_reperage_coordonnees", label: "Lire des coordonnees simples", notionId: "reperage", prerequis: ["ce1_reperage_cases_noeuds"] },
  { id: "ce1_reperage_deplacement", label: "Decrire un deplacement sur quadrillage", notionId: "reperage", prerequis: ["ce1_reperage_cases_noeuds"] },
  { id: "ce1_reperage_defi", label: "Resoudre un defi de reperage", notionId: "reperage", prerequis: ["ce1_reperage_coordonnees"] },

  { id: "ce1_droite_segment_reconnaitre", label: "Reconnaitre droite, segment et alignement", notionId: "droites_segments", prerequis: ["ce1_reperage_cases_noeuds"] },
  { id: "ce1_droite_segment_tracer", label: "Tracer un segment ou une droite avec la regle", notionId: "droites_segments", prerequis: ["ce1_droite_segment_reconnaitre"] },
  { id: "ce1_droite_milieu", label: "Reperer le milieu d'un segment simple", notionId: "droites_segments", prerequis: ["ce1_longueur_mesurer_cm_m"] },
  { id: "ce1_droite_defi", label: "Resoudre un defi sur droites et segments", notionId: "droites_segments", prerequis: ["ce1_droite_segment_tracer"] },

  { id: "ce1_figure_reconnaitre", label: "Reconnaitre les figures planes usuelles", notionId: "figures_planes", prerequis: ["ce1_droite_segment_reconnaitre"] },
  { id: "ce1_figure_decrire", label: "Decrire cotes et sommets", notionId: "figures_planes", prerequis: ["ce1_figure_reconnaitre"] },
  { id: "ce1_angle_droit", label: "Reconnaitre un angle droit", notionId: "figures_planes", prerequis: ["ce1_figure_decrire"] },
  { id: "ce1_figure_construire", label: "Construire une figure simple", notionId: "figures_planes", prerequis: ["ce1_droite_segment_tracer"] },
  { id: "ce1_figure_defi", label: "Resoudre un defi de figures planes", notionId: "figures_planes", prerequis: ["ce1_figure_decrire", "ce1_angle_droit"] },

  { id: "ce1_solide_reconnaitre", label: "Reconnaitre les solides usuels", notionId: "solides", prerequis: ["ce1_figure_reconnaitre"] },
  { id: "ce1_solide_faces", label: "Identifier les faces d'un solide", notionId: "solides", prerequis: ["ce1_solide_reconnaitre"] },
  { id: "ce1_solide_sommets_aretes", label: "Identifier sommets et aretes", notionId: "solides", prerequis: ["ce1_solide_reconnaitre"] },
  { id: "ce1_solide_defi", label: "Resoudre un defi sur les solides", notionId: "solides", prerequis: ["ce1_solide_faces", "ce1_solide_sommets_aretes"] },

  { id: "ce1_symetrie_axe", label: "Reconnaitre un axe de symetrie", notionId: "symetrie", prerequis: ["ce1_figure_reconnaitre"] },
  { id: "ce1_symetrie_completer", label: "Completer une figure par symetrie sur quadrillage", notionId: "symetrie", prerequis: ["ce1_symetrie_axe", "ce1_reperage_cases_noeuds"] },
  { id: "ce1_symetrie_defi", label: "Resoudre un defi de symetrie", notionId: "symetrie", prerequis: ["ce1_symetrie_completer"] },

  { id: "ce1_donnees_lire_tableau", label: "Lire un tableau", notionId: "donnees", prerequis: ["ce1_entier_lire_ecrire"] },
  { id: "ce1_donnees_completer_tableau", label: "Completer un tableau", notionId: "donnees", prerequis: ["ce1_donnees_lire_tableau"] },
  { id: "ce1_donnees_lire_graphique", label: "Lire un graphique simple", notionId: "donnees", prerequis: ["ce1_donnees_lire_tableau"] },
  { id: "ce1_donnees_defi", label: "Resoudre un defi avec des donnees", notionId: "donnees", prerequis: ["ce1_donnees_lire_graphique"] },

  { id: "ce1_algo_instruction", label: "Suivre un programme d'instructions", notionId: "algorithmique", prerequis: ["ce1_reperage_deplacement"] },
  { id: "ce1_algo_deplacement", label: "Coder un deplacement", notionId: "algorithmique", prerequis: ["ce1_reperage_deplacement"] },
  { id: "ce1_algo_repetition", label: "Utiliser une repetition simple", notionId: "algorithmique", prerequis: ["ce1_suite_pas"] },
  { id: "ce1_algo_defi", label: "Resoudre un defi d'algorithmique", notionId: "algorithmique", prerequis: ["ce1_algo_instruction", "ce1_algo_deplacement"] },
];
