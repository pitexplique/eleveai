// Micro-compétences de mathématiques pour la classe de CE1.
// Référence : programme officiel de mathématiques du cycle 2,
// BO n° 41 du 31 octobre 2024, applicable à la rentrée 2025.

// lib/tutor-v4/knowledge/maths/ce1/microSkills.ts

// ⚠️ CES INTITULÉS SONT AFFICHÉS À L'ÉLÈVE dans le coach. Ils sont restés sans
// accent jusqu'au 09/08/2026 — un CE1 lisait « Resoudre un defi de fractions
// simples ». Relus et réaccentués ce jour-là contre le tableau CE1 du
// programme ; les identifiants, eux, n'ont pas bougé.
//
// PÉRIMÈTRE DU CE1, relevé sur le tableau officiel. Un an avant le CE2 : ce qui
// suit change les questions, ligne à ligne.
//   — les nombres vont jusqu'à 1 000, et les ordinaux jusqu'à cent ;
//   — les fractions sont d'abord UNITAIRES : 1/2, 1/3, 1/4, 1/5, 1/6, 1/8 et
//     1/10, toutes inférieures ou égales à 1. On compare celles de même
//     dénominateur, et celles dont le numérateur est 1 ;
//   — les longueurs se disent en m, cm et km. PAS de décimètre ni de
//     millimètre : ils arrivent au CE2 ;
//   — les masses en g et kg, avec 1 kg = 1 000 g ;
//   — la monnaie va jusqu'aux centimes et à l'écriture à virgule ;
//   — l'heure se lit en heures entières, demi-heures et quarts d'heure ;
//   — l'angle droit et l'équerre SONT au programme du CE1, ainsi que le code
//     de l'angle droit ;
//   — la division est un partage ou un groupement, avec un reste à
//     interpréter ; pas de division posée.
//
// ⚠️ Deux notions de cette liste ne figurent pas au tableau CE1 : `contenance`
// (le litre y apparaît au CE2) et `symetrie` (la symétrie axiale aussi). Elles
// sont gardées parce qu'elles se travaillent en classe et qu'un élève qui les
// cherche doit trouver quelque chose — mais on y reste au ras du concret.

import type { MicroSkillSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

export const microSkills: MicroSkillSource[] = [
  { id: "ce1_entier_lire_ecrire", label: "Lire et écrire les nombres jusqu'à 1 000", notionId: "nombre_entier", prerequis: [] },
  { id: "ce1_entier_centaines", label: "Comprendre centaines, dizaines et unités", notionId: "nombre_entier", prerequis: ["ce1_entier_lire_ecrire"] },
  { id: "ce1_entier_decomposer", label: "Décomposer un nombre jusqu'à 1 000", notionId: "nombre_entier", prerequis: ["ce1_entier_centaines"] },
  { id: "ce1_entier_comparer", label: "Comparer et ranger des nombres", notionId: "nombre_entier", prerequis: ["ce1_entier_lire_ecrire"] },
  { id: "ce1_entier_encadrer", label: "Encadrer un nombre entre deux dizaines ou centaines", notionId: "nombre_entier", prerequis: ["ce1_entier_comparer"] },
  { id: "ce1_entier_droite", label: "Placer un nombre sur une droite graduée", notionId: "nombre_entier", prerequis: ["ce1_entier_comparer"] },
  { id: "ce1_entier_defi", label: "Résoudre un défi sur les nombres", notionId: "nombre_entier", prerequis: ["ce1_entier_decomposer", "ce1_entier_droite"] },

  { id: "ce1_suite_continuer", label: "Continuer une suite de nombres", notionId: "suite_nombre", prerequis: ["ce1_entier_lire_ecrire"] },
  { id: "ce1_suite_pas", label: "Trouver le pas d'une suite", notionId: "suite_nombre", prerequis: ["ce1_suite_continuer"] },
  { id: "ce1_suite_10_100", label: "Compter de 10 en 10 ou de 100 en 100", notionId: "suite_nombre", prerequis: ["ce1_entier_centaines"] },
  { id: "ce1_suite_defi", label: "Résoudre un défi de suites", notionId: "suite_nombre", prerequis: ["ce1_suite_pas"] },

  { id: "ce1_addition_posee", label: "Poser une addition avec retenue simple", notionId: "addition_soustraction", prerequis: ["ce1_entier_decomposer"] },
  { id: "ce1_soustraction_posee", label: "Poser une soustraction simple", notionId: "addition_soustraction", prerequis: ["ce1_entier_decomposer"] },
  { id: "ce1_add_sous_complement", label: "Trouver un terme manquant dans une addition ou une soustraction", notionId: "addition_soustraction", prerequis: ["ce1_addition_posee", "ce1_soustraction_posee"] },
  { id: "ce1_add_sous_estimer", label: "Estimer l'ordre de grandeur d'un résultat", notionId: "addition_soustraction", prerequis: ["ce1_entier_encadrer"] },
  { id: "ce1_add_sous_defi", label: "Résoudre un défi addition-soustraction", notionId: "addition_soustraction", prerequis: ["ce1_add_sous_complement"] },

  { id: "ce1_multiplication_sens", label: "Comprendre la multiplication comme une addition répétée", notionId: "multiplication", prerequis: ["ce1_addition_posee"] },
  { id: "ce1_table_2", label: "Connaître la table de 2", notionId: "multiplication", prerequis: ["ce1_multiplication_sens"] },
  { id: "ce1_table_5", label: "Connaître la table de 5", notionId: "multiplication", prerequis: ["ce1_multiplication_sens"] },
  { id: "ce1_table_10", label: "Connaître la table de 10", notionId: "multiplication", prerequis: ["ce1_entier_centaines"] },
  { id: "ce1_multiplication_calculer", label: "Calculer un produit simple", notionId: "multiplication", prerequis: ["ce1_table_2", "ce1_table_5", "ce1_table_10"] },
  { id: "ce1_multiplication_defi", label: "Résoudre un défi de multiplication", notionId: "multiplication", prerequis: ["ce1_multiplication_calculer"] },

  { id: "ce1_division_partage", label: "Partager une quantité en parts égales", notionId: "division_partage", prerequis: ["ce1_multiplication_sens"] },
  { id: "ce1_division_groupement", label: "Faire des groupements égaux", notionId: "division_partage", prerequis: ["ce1_multiplication_sens"] },
  { id: "ce1_division_reste", label: "Comprendre qu'il peut rester des objets", notionId: "division_partage", prerequis: ["ce1_division_partage"] },
  { id: "ce1_division_defi", label: "Résoudre un défi de partage", notionId: "division_partage", prerequis: ["ce1_division_partage", "ce1_division_groupement"] },

  { id: "ce1_calcul_complements_100", label: "Connaître des compléments à 100", notionId: "calcul_mental", prerequis: ["ce1_entier_centaines"] },
  { id: "ce1_calcul_doubles_moities", label: "Utiliser doubles et moitiés", notionId: "calcul_mental", prerequis: ["ce1_table_2"] },
  { id: "ce1_calcul_plus_moins_9_11", label: "Ajouter ou retirer 9 ou 11", notionId: "calcul_mental", prerequis: ["ce1_addition_posee"] },
  { id: "ce1_calcul_multiplier_10", label: "Multiplier par 10", notionId: "calcul_mental", prerequis: ["ce1_table_10"] },
  { id: "ce1_calcul_defi", label: "Résoudre un défi de calcul mental", notionId: "calcul_mental", prerequis: ["ce1_calcul_complements_100", "ce1_calcul_doubles_moities"] },

  { id: "ce1_fraction_partage", label: "Comprendre une fraction comme un partage de l'unité", notionId: "fraction", prerequis: ["ce1_division_partage"] },
  { id: "ce1_fraction_demi", label: "Reconnaître un demi", notionId: "fraction", prerequis: ["ce1_fraction_partage"] },
  { id: "ce1_fraction_quart", label: "Reconnaître un quart", notionId: "fraction", prerequis: ["ce1_fraction_partage"] },
  { id: "ce1_fraction_tiers", label: "Reconnaître un tiers", notionId: "fraction", prerequis: ["ce1_fraction_partage"] },
  { id: "ce1_fraction_representer", label: "Représenter une fraction simple", notionId: "fraction", prerequis: ["ce1_fraction_demi", "ce1_fraction_quart"] },
  { id: "ce1_fraction_defi", label: "Résoudre un défi de fractions simples", notionId: "fraction", prerequis: ["ce1_fraction_representer"] },

  { id: "ce1_probleme_operation", label: "Choisir l'opération adaptée", notionId: "probleme", prerequis: ["ce1_addition_posee", "ce1_soustraction_posee"] },
  { id: "ce1_probleme_add_sous", label: "Résoudre un problème additif ou soustractif", notionId: "probleme", prerequis: ["ce1_probleme_operation"] },
  { id: "ce1_probleme_multiplicatif", label: "Résoudre un problème multiplicatif simple", notionId: "probleme", prerequis: ["ce1_multiplication_sens"] },
  { id: "ce1_probleme_schema", label: "Utiliser un schéma pour raisonner", notionId: "probleme", prerequis: ["ce1_probleme_operation"] },
  { id: "ce1_probleme_reponse", label: "Rédiger une réponse avec l'unité", notionId: "probleme", prerequis: ["ce1_probleme_add_sous"] },
  { id: "ce1_probleme_defi", label: "Résoudre un défi de problème", notionId: "probleme", prerequis: ["ce1_probleme_reponse", "ce1_probleme_multiplicatif"] },

  { id: "ce1_longueur_mesurer_cm_m", label: "Mesurer en centimètres et en mètres", notionId: "longueur", prerequis: ["ce1_entier_lire_ecrire"] },
  { id: "ce1_longueur_comparer", label: "Comparer des longueurs", notionId: "longueur", prerequis: ["ce1_entier_comparer"] },
  { id: "ce1_longueur_convertir_simple", label: "Convertir m et cm dans des cas simples", notionId: "longueur", prerequis: ["ce1_entier_centaines"] },
  { id: "ce1_longueur_tracer", label: "Tracer un segment de longueur donnée", notionId: "longueur", prerequis: ["ce1_longueur_mesurer_cm_m"] },
  { id: "ce1_longueur_defi", label: "Résoudre un défi de longueurs", notionId: "longueur", prerequis: ["ce1_longueur_convertir_simple"] },

  { id: "ce1_masse_comparer", label: "Comparer des masses", notionId: "masse", prerequis: ["ce1_entier_comparer"] },
  { id: "ce1_masse_kg_g", label: "Utiliser kilogramme et gramme dans des cas simples", notionId: "masse", prerequis: ["ce1_entier_lire_ecrire"] },
  { id: "ce1_masse_probleme", label: "Résoudre un problème simple de masses", notionId: "masse", prerequis: ["ce1_probleme_add_sous"] },
  { id: "ce1_masse_defi", label: "Résoudre un défi de masses", notionId: "masse", prerequis: ["ce1_masse_kg_g"] },

  { id: "ce1_contenance_comparer", label: "Comparer des contenances", notionId: "contenance", prerequis: ["ce1_entier_comparer"] },
  { id: "ce1_contenance_litre", label: "Utiliser le litre", notionId: "contenance", prerequis: ["ce1_entier_lire_ecrire"] },
  { id: "ce1_contenance_probleme", label: "Résoudre un problème simple de contenances", notionId: "contenance", prerequis: ["ce1_probleme_add_sous"] },
  { id: "ce1_contenance_defi", label: "Résoudre un défi de contenances", notionId: "contenance", prerequis: ["ce1_contenance_litre"] },

  { id: "ce1_duree_lire_heure_demi", label: "Lire l'heure et la demi-heure", notionId: "duree", prerequis: ["ce1_entier_lire_ecrire"] },
  { id: "ce1_duree_calendrier", label: "Utiliser un calendrier", notionId: "duree", prerequis: ["ce1_suite_continuer"] },
  { id: "ce1_duree_calculer_simple", label: "Calculer une durée simple", notionId: "duree", prerequis: ["ce1_duree_lire_heure_demi"] },
  { id: "ce1_duree_defi", label: "Résoudre un défi de durées", notionId: "duree", prerequis: ["ce1_duree_calculer_simple"] },

  { id: "ce1_monnaie_constituer", label: "Constituer une somme en euros", notionId: "monnaie", prerequis: ["ce1_addition_posee"] },
  { id: "ce1_monnaie_rendre", label: "Calculer un rendu de monnaie simple", notionId: "monnaie", prerequis: ["ce1_soustraction_posee"] },
  { id: "ce1_monnaie_probleme", label: "Résoudre un problème de monnaie", notionId: "monnaie", prerequis: ["ce1_probleme_add_sous"] },
  { id: "ce1_monnaie_defi", label: "Résoudre un défi de monnaie", notionId: "monnaie", prerequis: ["ce1_monnaie_rendre"] },

  { id: "ce1_reperage_cases_noeuds", label: "Lire cases et nœuds d'un quadrillage", notionId: "reperage", prerequis: ["ce1_entier_lire_ecrire"] },
  { id: "ce1_reperage_coordonnees", label: "Lire des coordonnées simples", notionId: "reperage", prerequis: ["ce1_reperage_cases_noeuds"] },
  { id: "ce1_reperage_deplacement", label: "Décrire un déplacement sur quadrillage", notionId: "reperage", prerequis: ["ce1_reperage_cases_noeuds"] },
  { id: "ce1_reperage_defi", label: "Résoudre un défi de repérage", notionId: "reperage", prerequis: ["ce1_reperage_coordonnees"] },

  { id: "ce1_droite_segment_reconnaitre", label: "Reconnaître droite, segment et alignement", notionId: "droites_segments", prerequis: ["ce1_reperage_cases_noeuds"] },
  { id: "ce1_droite_segment_tracer", label: "Tracer un segment ou une droite avec la règle", notionId: "droites_segments", prerequis: ["ce1_droite_segment_reconnaitre"] },
  { id: "ce1_droite_milieu", label: "Repérer le milieu d'un segment simple", notionId: "droites_segments", prerequis: ["ce1_longueur_mesurer_cm_m"] },
  { id: "ce1_droite_defi", label: "Résoudre un défi sur droites et segments", notionId: "droites_segments", prerequis: ["ce1_droite_segment_tracer"] },

  { id: "ce1_figure_reconnaitre", label: "Reconnaître les figures planes usuelles", notionId: "figures_planes", prerequis: ["ce1_droite_segment_reconnaitre"] },
  { id: "ce1_figure_decrire", label: "Décrire côtés et sommets", notionId: "figures_planes", prerequis: ["ce1_figure_reconnaitre"] },
  { id: "ce1_angle_droit", label: "Reconnaître un angle droit", notionId: "figures_planes", prerequis: ["ce1_figure_decrire"] },
  { id: "ce1_figure_construire", label: "Construire une figure simple", notionId: "figures_planes", prerequis: ["ce1_droite_segment_tracer"] },
  { id: "ce1_figure_defi", label: "Résoudre un défi de figures planes", notionId: "figures_planes", prerequis: ["ce1_figure_decrire", "ce1_angle_droit"] },

  { id: "ce1_solide_reconnaitre", label: "Reconnaître les solides usuels", notionId: "solides", prerequis: ["ce1_figure_reconnaitre"] },
  { id: "ce1_solide_faces", label: "Identifier les faces d'un solide", notionId: "solides", prerequis: ["ce1_solide_reconnaitre"] },
  { id: "ce1_solide_sommets_aretes", label: "Identifier sommets et arêtes", notionId: "solides", prerequis: ["ce1_solide_reconnaitre"] },
  { id: "ce1_solide_defi", label: "Résoudre un défi sur les solides", notionId: "solides", prerequis: ["ce1_solide_faces", "ce1_solide_sommets_aretes"] },

  { id: "ce1_symetrie_axe", label: "Reconnaître un axe de symétrie", notionId: "symetrie", prerequis: ["ce1_figure_reconnaitre"] },
  { id: "ce1_symetrie_completer", label: "Compléter une figure par symétrie sur quadrillage", notionId: "symetrie", prerequis: ["ce1_symetrie_axe", "ce1_reperage_cases_noeuds"] },
  { id: "ce1_symetrie_defi", label: "Résoudre un défi de symétrie", notionId: "symetrie", prerequis: ["ce1_symetrie_completer"] },

  { id: "ce1_donnees_lire_tableau", label: "Lire un tableau", notionId: "donnees", prerequis: ["ce1_entier_lire_ecrire"] },
  { id: "ce1_donnees_completer_tableau", label: "Compléter un tableau", notionId: "donnees", prerequis: ["ce1_donnees_lire_tableau"] },
  { id: "ce1_donnees_lire_graphique", label: "Lire un graphique simple", notionId: "donnees", prerequis: ["ce1_donnees_lire_tableau"] },
  { id: "ce1_donnees_defi", label: "Résoudre un défi avec des données", notionId: "donnees", prerequis: ["ce1_donnees_lire_graphique"] },

  { id: "ce1_algo_instruction", label: "Suivre un programme d'instructions", notionId: "algorithmique", prerequis: ["ce1_reperage_deplacement"] },
  { id: "ce1_algo_deplacement", label: "Coder un déplacement", notionId: "algorithmique", prerequis: ["ce1_reperage_deplacement"] },
  { id: "ce1_algo_repetition", label: "Utiliser une répétition simple", notionId: "algorithmique", prerequis: ["ce1_suite_pas"] },
  { id: "ce1_algo_defi", label: "Résoudre un défi d'algorithmique", notionId: "algorithmique", prerequis: ["ce1_algo_instruction", "ce1_algo_deplacement"] },
];
