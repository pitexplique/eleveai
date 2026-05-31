// Micro-competences de mathematiques pour la classe de CE2.
// Reference : programme officiel de mathematiques du cycle 2,
// BO n. 41 du 31 octobre 2024, applicable a la rentree 2025.

import type { MicroSkillSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

export const microSkills: MicroSkillSource[] = [
  { id: "ce2_entier_lire_ecrire", label: "Lire et ecrire les nombres jusqu'a 10 000", notionId: "nombre_entier", prerequis: [] },
  { id: "ce2_entier_milliers", label: "Comprendre milliers, centaines, dizaines et unites", notionId: "nombre_entier", prerequis: ["ce2_entier_lire_ecrire"] },
  { id: "ce2_entier_decomposer", label: "Decomposer un nombre jusqu'a 10 000", notionId: "nombre_entier", prerequis: ["ce2_entier_milliers"] },
  { id: "ce2_entier_comparer", label: "Comparer et ordonner des nombres", notionId: "nombre_entier", prerequis: ["ce2_entier_lire_ecrire"] },
  { id: "ce2_entier_encadrer_arrondir", label: "Encadrer et arrondir un nombre", notionId: "nombre_entier", prerequis: ["ce2_entier_comparer"] },
  { id: "ce2_entier_droite", label: "Placer un nombre sur une droite graduee", notionId: "nombre_entier", prerequis: ["ce2_entier_comparer"] },
  { id: "ce2_entier_defi", label: "Resoudre un defi sur les nombres", notionId: "nombre_entier", prerequis: ["ce2_entier_decomposer", "ce2_entier_droite"] },

  { id: "ce2_suite_continuer", label: "Continuer une suite de nombres", notionId: "suite_nombre", prerequis: ["ce2_entier_lire_ecrire"] },
  { id: "ce2_suite_regle", label: "Trouver la regle d'une suite", notionId: "suite_nombre", prerequis: ["ce2_suite_continuer"] },
  { id: "ce2_suite_croissante_decroissante", label: "Reconnaitre une suite croissante ou decroissante", notionId: "suite_nombre", prerequis: ["ce2_entier_comparer"] },
  { id: "ce2_suite_defi", label: "Resoudre un defi de suites", notionId: "suite_nombre", prerequis: ["ce2_suite_regle"] },

  { id: "ce2_addition_posee", label: "Poser une addition avec retenues", notionId: "addition_soustraction", prerequis: ["ce2_entier_decomposer"] },
  { id: "ce2_soustraction_posee", label: "Poser une soustraction avec retenues", notionId: "addition_soustraction", prerequis: ["ce2_entier_decomposer"] },
  { id: "ce2_add_sous_complement", label: "Completer une egalite additive", notionId: "addition_soustraction", prerequis: ["ce2_addition_posee", "ce2_soustraction_posee"] },
  { id: "ce2_add_sous_estimer", label: "Controler un resultat par estimation", notionId: "addition_soustraction", prerequis: ["ce2_entier_encadrer_arrondir"] },
  { id: "ce2_add_sous_defi", label: "Resoudre un defi addition-soustraction", notionId: "addition_soustraction", prerequis: ["ce2_add_sous_complement"] },

  { id: "ce2_tables_2_3_4_5_10", label: "Connaitre les tables de 2, 3, 4, 5 et 10", notionId: "multiplication", prerequis: ["ce2_addition_posee"] },
  { id: "ce2_tables_6_7_8_9", label: "Connaitre les tables de 6, 7, 8 et 9", notionId: "multiplication", prerequis: ["ce2_tables_2_3_4_5_10"] },
  { id: "ce2_multiplication_sens", label: "Relier multiplication, groupes egaux et tableau", notionId: "multiplication", prerequis: ["ce2_tables_2_3_4_5_10"] },
  { id: "ce2_multiplication_posee", label: "Poser une multiplication par un nombre a un chiffre", notionId: "multiplication", prerequis: ["ce2_tables_6_7_8_9"] },
  { id: "ce2_multiplication_10_100", label: "Multiplier par 10 ou 100", notionId: "multiplication", prerequis: ["ce2_entier_milliers"] },
  { id: "ce2_multiplication_defi", label: "Resoudre un defi de multiplication", notionId: "multiplication", prerequis: ["ce2_multiplication_posee"] },

  { id: "ce2_division_sens", label: "Comprendre la division comme partage ou groupement", notionId: "division", prerequis: ["ce2_multiplication_sens"] },
  { id: "ce2_division_lien_multiplication", label: "Utiliser le lien entre multiplication et division", notionId: "division", prerequis: ["ce2_tables_6_7_8_9"] },
  { id: "ce2_division_reste", label: "Interpreter le reste d'une division", notionId: "division", prerequis: ["ce2_division_sens"] },
  { id: "ce2_division_probleme", label: "Utiliser la division dans un probleme", notionId: "division", prerequis: ["ce2_division_lien_multiplication"] },
  { id: "ce2_division_defi", label: "Resoudre un defi de division", notionId: "division", prerequis: ["ce2_division_reste"] },

  { id: "ce2_calcul_complements", label: "Utiliser des complements a 100 et 1 000", notionId: "calcul_mental", prerequis: ["ce2_entier_milliers"] },
  { id: "ce2_calcul_doubles_moities", label: "Utiliser doubles et moities", notionId: "calcul_mental", prerequis: ["ce2_tables_2_3_4_5_10"] },
  { id: "ce2_calcul_decomposer", label: "Calculer mentalement par decomposition", notionId: "calcul_mental", prerequis: ["ce2_entier_decomposer"] },
  { id: "ce2_calcul_priorites_simples", label: "Respecter des priorites simples sans parentheses", notionId: "calcul_mental", prerequis: ["ce2_tables_6_7_8_9"] },
  { id: "ce2_calcul_defi", label: "Resoudre un defi de calcul mental", notionId: "calcul_mental", prerequis: ["ce2_calcul_decomposer", "ce2_calcul_doubles_moities"] },

  { id: "ce2_fraction_unite", label: "Comprendre l'unite dans une fraction", notionId: "fraction", prerequis: ["ce2_division_sens"] },
  { id: "ce2_fraction_lire", label: "Lire et nommer une fraction simple", notionId: "fraction", prerequis: ["ce2_fraction_unite"] },
  { id: "ce2_fraction_representer", label: "Representer une fraction simple", notionId: "fraction", prerequis: ["ce2_fraction_lire"] },
  { id: "ce2_fraction_droite", label: "Placer une fraction simple sur une droite graduee", notionId: "fraction", prerequis: ["ce2_fraction_lire", "ce2_entier_droite"] },
  { id: "ce2_fraction_comparer_unite", label: "Comparer une fraction simple a l'unite", notionId: "fraction", prerequis: ["ce2_fraction_representer"] },
  { id: "ce2_fraction_defi", label: "Resoudre un defi de fractions", notionId: "fraction", prerequis: ["ce2_fraction_droite", "ce2_fraction_comparer_unite"] },

  { id: "ce2_probleme_choisir_operation", label: "Choisir une operation adaptee", notionId: "probleme", prerequis: ["ce2_addition_posee", "ce2_tables_2_3_4_5_10"] },
  { id: "ce2_probleme_une_etape", label: "Resoudre un probleme a une etape", notionId: "probleme", prerequis: ["ce2_probleme_choisir_operation"] },
  { id: "ce2_probleme_deux_etapes", label: "Resoudre un probleme a deux etapes", notionId: "probleme", prerequis: ["ce2_probleme_une_etape"] },
  { id: "ce2_probleme_schema_barre", label: "Utiliser un schema en barres simple", notionId: "probleme", prerequis: ["ce2_probleme_une_etape"] },
  { id: "ce2_probleme_verifier", label: "Verifier la vraisemblance d'un resultat", notionId: "probleme", prerequis: ["ce2_add_sous_estimer"] },
  { id: "ce2_probleme_defi", label: "Resoudre un defi de probleme", notionId: "probleme", prerequis: ["ce2_probleme_deux_etapes"] },

  { id: "ce2_longueur_convertir", label: "Convertir mm, cm, dm, m et km dans des cas simples", notionId: "longueur", prerequis: ["ce2_entier_milliers"] },
  { id: "ce2_longueur_mesurer", label: "Mesurer et tracer des segments", notionId: "longueur", prerequis: ["ce2_entier_lire_ecrire"] },
  { id: "ce2_longueur_comparer", label: "Comparer des longueurs avec conversions simples", notionId: "longueur", prerequis: ["ce2_longueur_convertir"] },
  { id: "ce2_longueur_probleme", label: "Resoudre un probleme de longueurs", notionId: "longueur", prerequis: ["ce2_probleme_une_etape"] },
  { id: "ce2_longueur_defi", label: "Resoudre un defi de longueurs", notionId: "longueur", prerequis: ["ce2_longueur_probleme"] },

  { id: "ce2_masse_convertir", label: "Utiliser g et kg dans des conversions simples", notionId: "masse", prerequis: ["ce2_entier_milliers"] },
  { id: "ce2_masse_comparer", label: "Comparer des masses", notionId: "masse", prerequis: ["ce2_masse_convertir"] },
  { id: "ce2_masse_probleme", label: "Resoudre un probleme de masses", notionId: "masse", prerequis: ["ce2_probleme_une_etape"] },
  { id: "ce2_masse_defi", label: "Resoudre un defi de masses", notionId: "masse", prerequis: ["ce2_masse_probleme"] },

  { id: "ce2_contenance_convertir", label: "Utiliser L, dL et cL dans des cas simples", notionId: "contenance", prerequis: ["ce2_entier_milliers"] },
  { id: "ce2_contenance_comparer", label: "Comparer des contenances", notionId: "contenance", prerequis: ["ce2_contenance_convertir"] },
  { id: "ce2_contenance_probleme", label: "Resoudre un probleme de contenances", notionId: "contenance", prerequis: ["ce2_probleme_une_etape"] },
  { id: "ce2_contenance_defi", label: "Resoudre un defi de contenances", notionId: "contenance", prerequis: ["ce2_contenance_probleme"] },

  { id: "ce2_duree_lire_heure", label: "Lire l'heure et les minutes usuelles", notionId: "duree", prerequis: ["ce2_entier_lire_ecrire"] },
  { id: "ce2_duree_convertir", label: "Convertir heures et minutes dans des cas simples", notionId: "duree", prerequis: ["ce2_tables_6_7_8_9"] },
  { id: "ce2_duree_calculer", label: "Calculer une duree simple", notionId: "duree", prerequis: ["ce2_duree_convertir"] },
  { id: "ce2_duree_defi", label: "Resoudre un defi de durees", notionId: "duree", prerequis: ["ce2_duree_calculer"] },

  { id: "ce2_monnaie_constituer", label: "Constituer une somme en euros et centimes", notionId: "monnaie", prerequis: ["ce2_addition_posee"] },
  { id: "ce2_monnaie_rendre", label: "Calculer un rendu de monnaie", notionId: "monnaie", prerequis: ["ce2_soustraction_posee"] },
  { id: "ce2_monnaie_probleme", label: "Resoudre un probleme de monnaie", notionId: "monnaie", prerequis: ["ce2_probleme_une_etape"] },
  { id: "ce2_monnaie_defi", label: "Resoudre un defi de monnaie", notionId: "monnaie", prerequis: ["ce2_monnaie_rendre"] },

  { id: "ce2_perimetre_comprendre", label: "Comprendre ce qu'est un perimetre", notionId: "perimetre", prerequis: ["ce2_longueur_mesurer"] },
  { id: "ce2_perimetre_polygone", label: "Calculer le perimetre d'un polygone simple", notionId: "perimetre", prerequis: ["ce2_addition_posee"] },
  { id: "ce2_perimetre_rectangle", label: "Calculer le perimetre d'un rectangle ou carre", notionId: "perimetre", prerequis: ["ce2_multiplication_sens"] },
  { id: "ce2_perimetre_defi", label: "Resoudre un defi de perimetre", notionId: "perimetre", prerequis: ["ce2_perimetre_polygone", "ce2_perimetre_rectangle"] },

  { id: "ce2_reperage_coordonnees", label: "Lire et placer un point sur quadrillage", notionId: "reperage", prerequis: ["ce2_entier_lire_ecrire"] },
  { id: "ce2_reperage_deplacement", label: "Decrire un deplacement sur quadrillage", notionId: "reperage", prerequis: ["ce2_reperage_coordonnees"] },
  { id: "ce2_reperage_plan", label: "Lire un plan simple", notionId: "reperage", prerequis: ["ce2_reperage_deplacement"] },
  { id: "ce2_reperage_defi", label: "Resoudre un defi de reperage", notionId: "reperage", prerequis: ["ce2_reperage_plan"] },

  { id: "ce2_droite_alignement", label: "Reconnaitre et tracer alignements, droites et segments", notionId: "droites_angles", prerequis: ["ce2_reperage_coordonnees"] },
  { id: "ce2_angle_droit", label: "Reconnaitre et tracer un angle droit", notionId: "droites_angles", prerequis: ["ce2_droite_alignement"] },
  { id: "ce2_droite_perpendiculaire", label: "Reconnaitre des droites perpendiculaires", notionId: "droites_angles", prerequis: ["ce2_angle_droit"] },
  { id: "ce2_droite_defi", label: "Resoudre un defi de droites et angles droits", notionId: "droites_angles", prerequis: ["ce2_droite_perpendiculaire"] },

  { id: "ce2_figure_reconnaitre", label: "Reconnaitre triangles, carres, rectangles et cercles", notionId: "figures_planes", prerequis: ["ce2_droite_alignement"] },
  { id: "ce2_figure_proprietes", label: "Utiliser les proprietes des figures usuelles", notionId: "figures_planes", prerequis: ["ce2_angle_droit"] },
  { id: "ce2_figure_construire", label: "Construire une figure simple", notionId: "figures_planes", prerequis: ["ce2_figure_proprietes"] },
  { id: "ce2_figure_cercle", label: "Utiliser le vocabulaire du cercle", notionId: "figures_planes", prerequis: ["ce2_figure_reconnaitre"] },
  { id: "ce2_figure_defi", label: "Resoudre un defi de figures planes", notionId: "figures_planes", prerequis: ["ce2_figure_construire"] },

  { id: "ce2_solide_reconnaitre", label: "Reconnaitre les solides usuels", notionId: "solides", prerequis: ["ce2_figure_reconnaitre"] },
  { id: "ce2_solide_decrire", label: "Decrire faces, aretes et sommets", notionId: "solides", prerequis: ["ce2_solide_reconnaitre"] },
  { id: "ce2_solide_patron", label: "Reconnaitre un patron simple", notionId: "solides", prerequis: ["ce2_solide_decrire"] },
  { id: "ce2_solide_defi", label: "Resoudre un defi sur les solides", notionId: "solides", prerequis: ["ce2_solide_decrire"] },

  { id: "ce2_symetrie_axe", label: "Reconnaitre un ou plusieurs axes de symetrie", notionId: "symetrie", prerequis: ["ce2_figure_reconnaitre"] },
  { id: "ce2_symetrie_completer", label: "Completer une figure par symetrie", notionId: "symetrie", prerequis: ["ce2_symetrie_axe"] },
  { id: "ce2_symetrie_construire", label: "Construire le symetrique d'un point sur quadrillage", notionId: "symetrie", prerequis: ["ce2_reperage_coordonnees"] },
  { id: "ce2_symetrie_defi", label: "Resoudre un defi de symetrie", notionId: "symetrie", prerequis: ["ce2_symetrie_completer", "ce2_symetrie_construire"] },

  { id: "ce2_donnees_lire_tableau", label: "Lire un tableau", notionId: "donnees", prerequis: ["ce2_entier_lire_ecrire"] },
  { id: "ce2_donnees_completer_tableau", label: "Completer un tableau", notionId: "donnees", prerequis: ["ce2_donnees_lire_tableau"] },
  { id: "ce2_donnees_lire_graphique", label: "Lire un graphique ou un diagramme simple", notionId: "donnees", prerequis: ["ce2_donnees_lire_tableau"] },
  { id: "ce2_donnees_interpreter", label: "Interpreter des donnees", notionId: "donnees", prerequis: ["ce2_donnees_lire_graphique"] },
  { id: "ce2_donnees_defi", label: "Resoudre un defi avec des donnees", notionId: "donnees", prerequis: ["ce2_donnees_interpreter"] },

  { id: "ce2_algo_instruction", label: "Lire un programme d'instructions", notionId: "algorithmique", prerequis: ["ce2_reperage_deplacement"] },
  { id: "ce2_algo_deplacement", label: "Coder un deplacement sur quadrillage", notionId: "algorithmique", prerequis: ["ce2_reperage_deplacement"] },
  { id: "ce2_algo_repetition", label: "Utiliser une repetition", notionId: "algorithmique", prerequis: ["ce2_suite_regle"] },
  { id: "ce2_algo_corriger", label: "Corriger une instruction dans un programme", notionId: "algorithmique", prerequis: ["ce2_algo_instruction"] },
  { id: "ce2_algo_defi", label: "Resoudre un defi d'algorithmique", notionId: "algorithmique", prerequis: ["ce2_algo_deplacement", "ce2_algo_corriger"] },
];
