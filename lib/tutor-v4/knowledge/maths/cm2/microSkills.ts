// Micro-compétences de mathématiques pour la classe de CM2.

import type { MicroSkillSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

export const microSkills: MicroSkillSource[] = [
  // ============================================================
  // NOMBRES ENTIERS
  // ============================================================
  {
    id: "entier_lire",
    label: "Lire et écrire des nombres entiers",
    notionId: "nombre_entier",
    prerequis: [],
  },
  {
    id: "entier_comparer",
    label: "Comparer et ordonner des nombres entiers",
    notionId: "nombre_entier",
    prerequis: ["entier_lire"],
  },
  {
    id: "entier_decomposer",
    label: "Décomposer des nombres entiers",
    notionId: "nombre_entier",
    prerequis: ["entier_lire"],
  },
  {
    id: "entier_arrondir",
    label: "Arrondir un nombre entier",
    notionId: "nombre_entier",
    prerequis: ["entier_comparer"],
  },
  {
    id: "entier_multiple",
    label: "Reconnaître les multiples d’un nombre",
    notionId: "nombre_entier",
    prerequis: ["entier_decomposer"],
  },
  {
    id: "entier_defi",
    label: "Résoudre un défi sur les nombres entiers",
    notionId: "nombre_entier",
    prerequis: ["entier_comparer", "entier_multiple"],
  },

  // ============================================================
  // SUITES
  // ============================================================
  {
    id: "suite_continuer",
    label: "Continuer une suite de nombres",
    notionId: "suite",
    prerequis: ["entier_lire"],
  },
  {
    id: "suite_regle",
    label: "Trouver la règle d’une suite",
    notionId: "suite",
    prerequis: ["suite_continuer"],
  },
  {
    id: "suite_croissante_decroissante",
    label: "Reconnaître une suite croissante ou décroissante",
    notionId: "suite",
    prerequis: ["entier_comparer"],
  },
  {
    id: "suite_defi",
    label: "Résoudre un défi sur les suites",
    notionId: "suite",
    prerequis: ["suite_regle"],
  },

  // ============================================================
  // MULTIPLICATION
  // ============================================================
  {
    id: "multiplication_table",
    label: "Connaître les tables de multiplication",
    notionId: "multiplication",
    prerequis: ["entier_lire"],
  },
  {
    id: "multiplication_mental",
    label: "Multiplier mentalement",
    notionId: "multiplication",
    prerequis: ["multiplication_table"],
  },
  {
    id: "multiplication_posee",
    label: "Poser une multiplication",
    notionId: "multiplication",
    prerequis: ["multiplication_table"],
  },
  {
    id: "multiplication_puissance_dix",
    label: "Multiplier par 10, 100 ou 1 000",
    notionId: "multiplication",
    prerequis: ["multiplication_table"],
  },
  {
    id: "multiplication_probleme",
    label: "Utiliser la multiplication dans un problème",
    notionId: "multiplication",
    prerequis: ["multiplication_mental"],
  },
  {
    id: "multiplication_defi",
    label: "Résoudre un défi de multiplication",
    notionId: "multiplication",
    prerequis: ["multiplication_posee"],
  },

  // ============================================================
  // DIVISION
  // ============================================================
  {
    id: "division_sens",
    label: "Comprendre le sens de la division",
    notionId: "division",
    prerequis: ["multiplication_table"],
  },
  {
    id: "division_lien_multiplication",
    label: "Associer multiplication et division",
    notionId: "division",
    prerequis: ["division_sens"],
  },
  {
    id: "division_posee",
    label: "Poser une division simple",
    notionId: "division",
    prerequis: ["division_lien_multiplication"],
  },
  {
    id: "division_reste",
    label: "Interpréter le reste d’une division",
    notionId: "division",
    prerequis: ["division_posee"],
  },
  {
    id: "division_probleme",
    label: "Utiliser la division dans un problème",
    notionId: "division",
    prerequis: ["division_sens"],
  },
  {
    id: "division_defi",
    label: "Résoudre un défi de division",
    notionId: "division",
    prerequis: ["division_posee"],
  },

  // ============================================================
  // FRACTIONS
  // ============================================================
  {
    id: "fraction_lire",
    label: "Lire une fraction",
    notionId: "fraction",
    prerequis: ["entier_lire"],
  },
  {
    id: "fraction_representer",
    label: "Représenter une fraction",
    notionId: "fraction",
    prerequis: ["fraction_lire"],
  },
  {
    id: "fraction_droite",
    label: "Placer une fraction sur une droite graduée",
    notionId: "fraction",
    prerequis: ["fraction_lire"],
  },
  {
    id: "fraction_comparer",
    label: "Comparer des fractions simples",
    notionId: "fraction",
    prerequis: ["fraction_representer"],
  },
  {
    id: "fraction_equivalente",
    label: "Reconnaître des fractions équivalentes",
    notionId: "fraction",
    prerequis: ["fraction_representer"],
  },
  {
    id: "fraction_decimale",
    label: "Reconnaître une fraction décimale",
    notionId: "fraction",
    prerequis: ["fraction_lire"],
  },
  {
    id: "fraction_defi",
    label: "Résoudre un défi sur les fractions",
    notionId: "fraction",
    prerequis: ["fraction_comparer", "fraction_equivalente"],
  },

  // ============================================================
  // NOMBRES DÉCIMAUX
  // ============================================================
  {
    id: "decimal_lire",
    label: "Lire et écrire un nombre décimal",
    notionId: "nombre_decimal",
    prerequis: ["fraction_decimale"],
  },
  {
    id: "decimal_fraction",
    label: "Relier fraction décimale et nombre décimal",
    notionId: "nombre_decimal",
    prerequis: ["fraction_decimale"],
  },
  {
    id: "decimal_valeur_chiffre",
    label: "Donner la valeur d’un chiffre dans un nombre décimal",
    notionId: "nombre_decimal",
    prerequis: ["decimal_lire"],
  },
  {
    id: "decimal_comparer",
    label: "Comparer des nombres décimaux",
    notionId: "nombre_decimal",
    prerequis: ["decimal_valeur_chiffre"],
  },
  {
    id: "decimal_ordonner",
    label: "Ordonner des nombres décimaux",
    notionId: "nombre_decimal",
    prerequis: ["decimal_comparer"],
  },
  {
    id: "decimal_droite",
    label: "Placer un nombre décimal sur une droite graduée",
    notionId: "nombre_decimal",
    prerequis: ["decimal_lire"],
  },
  {
    id: "decimal_arrondir",
    label: "Arrondir un nombre décimal",
    notionId: "nombre_decimal",
    prerequis: ["decimal_comparer"],
  },
  {
    id: "decimal_defi",
    label: "Résoudre un défi sur les nombres décimaux",
    notionId: "nombre_decimal",
    prerequis: ["decimal_comparer", "decimal_droite"],
  },

  // ============================================================
  // CALCUL
  // ============================================================
  {
    id: "calcul_mental",
    label: "Calculer mentalement",
    notionId: "calcul",
    prerequis: ["entier_lire"],
  },
  {
    id: "calcul_addition_posee",
    label: "Poser une addition",
    notionId: "calcul",
    prerequis: ["calcul_mental"],
  },
  {
    id: "calcul_soustraction_posee",
    label: "Poser une soustraction",
    notionId: "calcul",
    prerequis: ["calcul_addition_posee"],
  },
  {
    id: "calcul_decimal_addition",
    label: "Additionner des nombres décimaux",
    notionId: "calcul",
    prerequis: ["decimal_lire", "calcul_addition_posee"],
  },
  {
    id: "calcul_decimal_soustraction",
    label: "Soustraire des nombres décimaux",
    notionId: "calcul",
    prerequis: ["decimal_lire", "calcul_soustraction_posee"],
  },
  {
    id: "calcul_priorite",
    label: "Utiliser les priorités opératoires simples",
    notionId: "calcul",
    prerequis: ["calcul_mental"],
  },
  {
    id: "calcul_defi",
    label: "Résoudre un défi de calcul",
    notionId: "calcul",
    prerequis: ["calcul_mental", "calcul_priorite"],
  },

  // ============================================================
  // PROBLÈMES
  // ============================================================
  {
    id: "probleme_choisir_operation",
    label: "Choisir la bonne opération dans un problème",
    notionId: "probleme",
    prerequis: ["calcul_mental"],
  },
  {
    id: "probleme_une_etape",
    label: "Résoudre un problème à une étape",
    notionId: "probleme",
    prerequis: ["probleme_choisir_operation"],
  },
  {
    id: "probleme_plusieurs_etapes",
    label: "Résoudre un problème à plusieurs étapes",
    notionId: "probleme",
    prerequis: ["probleme_une_etape"],
  },
  {
    id: "probleme_rediger",
    label: "Rédiger une réponse claire à un problème",
    notionId: "probleme",
    prerequis: ["probleme_une_etape"],
  },
  {
    id: "probleme_defi",
    label: "Résoudre un défi de problème",
    notionId: "probleme",
    prerequis: ["probleme_plusieurs_etapes"],
  },

    // ============================================================
  // ALGÈBRE
  // ============================================================
  {
    id: "algebre_egalite",
    label: "Comprendre une égalité",
    notionId: "algebre",
    prerequis: ["calcul_mental"],
  },
  {
    id: "algebre_completer_egalite",
    label: "Compléter une égalité",
    notionId: "algebre",
    prerequis: ["algebre_egalite"],
  },
  {
    id: "algebre_nombre_inconnu",
    label: "Trouver un nombre inconnu",
    notionId: "algebre",
    prerequis: ["algebre_completer_egalite"],
  },
  {
    id: "algebre_schema_barre",
    label: "Utiliser un schéma en barres",
    notionId: "algebre",
    prerequis: ["probleme_une_etape", "algebre_egalite"],
  },
  {
    id: "algebre_motif",
    label: "Reconnaître et poursuivre un motif évolutif",
    notionId: "algebre",
    prerequis: ["suite_regle"],
  },
  {
    id: "algebre_relation",
    label: "Décrire une relation entre deux quantités",
    notionId: "algebre",
    prerequis: ["algebre_egalite", "algebre_motif"],
  },
  {
    id: "algebre_defi",
    label: "Résoudre un défi d’algèbre",
    notionId: "algebre",
    prerequis: ["algebre_nombre_inconnu", "algebre_schema_barre", "algebre_relation"],
  },
  
  // ============================================================
  // PROPORTIONNALITÉ
  // ============================================================
  {
    id: "prop_reconnaitre",
    label: "Reconnaître une situation de proportionnalité",
    notionId: "proportionnalite",
    prerequis: ["multiplication_table"],
  },
  {
    id: "prop_tableau",
    label: "Compléter un tableau de proportionnalité",
    notionId: "proportionnalite",
    prerequis: ["prop_reconnaitre"],
  },
  {
    id: "prop_coefficient",
    label: "Utiliser un coefficient de proportionnalité",
    notionId: "proportionnalite",
    prerequis: ["prop_tableau"],
  },
  {
    id: "prop_quatrieme",
    label: "Calculer une quatrième proportionnelle",
    notionId: "proportionnalite",
    prerequis: ["prop_tableau"],
  },
  {
    id: "prop_probleme",
    label: "Résoudre un problème de proportionnalité",
    notionId: "proportionnalite",
    prerequis: ["prop_tableau"],
  },
  {
    id: "prop_defi",
    label: "Résoudre un défi de proportionnalité",
    notionId: "proportionnalite",
    prerequis: ["prop_quatrieme", "prop_probleme"],
  },

  // ============================================================
  // POURCENTAGES
  // ============================================================
  {
    id: "pourcentage_comprendre",
    label: "Comprendre un pourcentage simple",
    notionId: "pourcentage",
    prerequis: ["fraction_lire"],
  },
  {
    id: "pourcentage_fraction_decimal",
    label: "Relier pourcentage, fraction et nombre décimal",
    notionId: "pourcentage",
    prerequis: ["pourcentage_comprendre", "decimal_fraction"],
  },
  {
    id: "pourcentage_calculer",
    label: "Calculer un pourcentage simple",
    notionId: "pourcentage",
    prerequis: ["pourcentage_comprendre"],
  },
  {
    id: "pourcentage_probleme",
    label: "Résoudre un problème avec un pourcentage simple",
    notionId: "pourcentage",
    prerequis: ["pourcentage_calculer"],
  },
  {
    id: "pourcentage_defi",
    label: "Résoudre un défi de pourcentage",
    notionId: "pourcentage",
    prerequis: ["pourcentage_calculer"],
  },

  // ============================================================
  // ÉCHELLES
  // ============================================================
  {
    id: "echelle_comprendre",
    label: "Comprendre une échelle simple",
    notionId: "echelle",
    prerequis: ["prop_reconnaitre", "longueur_convertir"],
  },
  {
    id: "echelle_distance_reelle",
    label: "Calculer une distance réelle avec une échelle",
    notionId: "echelle",
    prerequis: ["echelle_comprendre"],
  },
  {
    id: "echelle_distance_plan",
    label: "Calculer une distance sur un plan avec une échelle",
    notionId: "echelle",
    prerequis: ["echelle_comprendre"],
  },
  {
    id: "echelle_defi",
    label: "Résoudre un défi d’échelle",
    notionId: "echelle",
    prerequis: ["echelle_distance_reelle"],
  },

  // ============================================================
  // LONGUEURS
  // ============================================================
  {
    id: "longueur_comparer",
    label: "Comparer des longueurs",
    notionId: "longueur",
    prerequis: ["decimal_comparer"],
  },
  {
    id: "longueur_convertir",
    label: "Convertir des longueurs",
    notionId: "longueur",
    prerequis: ["longueur_comparer"],
  },
  {
    id: "longueur_estimer",
    label: "Estimer une longueur",
    notionId: "longueur",
    prerequis: ["longueur_comparer"],
  },
  {
    id: "longueur_defi",
    label: "Résoudre un défi de longueurs",
    notionId: "longueur",
    prerequis: ["longueur_convertir"],
  },

  // ============================================================
  // MASSES
  // ============================================================
  {
    id: "masse_comparer",
    label: "Comparer des masses",
    notionId: "masse",
    prerequis: ["decimal_comparer"],
  },
  {
    id: "masse_convertir",
    label: "Convertir des masses",
    notionId: "masse",
    prerequis: ["masse_comparer"],
  },
  {
    id: "masse_estimer",
    label: "Estimer une masse",
    notionId: "masse",
    prerequis: ["masse_comparer"],
  },
  {
    id: "masse_defi",
    label: "Résoudre un défi de masses",
    notionId: "masse",
    prerequis: ["masse_convertir"],
  },

  // ============================================================
  // CONTENANCES
  // ============================================================
  {
    id: "contenance_comparer",
    label: "Comparer des contenances",
    notionId: "contenance",
    prerequis: ["decimal_comparer"],
  },
  {
    id: "contenance_convertir",
    label: "Convertir des contenances",
    notionId: "contenance",
    prerequis: ["contenance_comparer"],
  },
  {
    id: "contenance_estimer",
    label: "Estimer une contenance",
    notionId: "contenance",
    prerequis: ["contenance_comparer"],
  },
  {
    id: "contenance_defi",
    label: "Résoudre un défi de contenances",
    notionId: "contenance",
    prerequis: ["contenance_convertir"],
  },

  // ============================================================
  // DURÉES
  // ============================================================
  {
    id: "duree_lire",
    label: "Lire une heure ou une durée",
    notionId: "duree",
    prerequis: ["entier_lire"],
  },
  {
    id: "duree_convertir",
    label: "Convertir des durées",
    notionId: "duree",
    prerequis: ["duree_lire"],
  },
  {
    id: "duree_calculer",
    label: "Calculer une durée",
    notionId: "duree",
    prerequis: ["duree_convertir"],
  },
  {
    id: "duree_probleme",
    label: "Résoudre un problème de durées",
    notionId: "duree",
    prerequis: ["duree_calculer"],
  },
  {
    id: "duree_defi",
    label: "Résoudre un défi de durées",
    notionId: "duree",
    prerequis: ["duree_probleme"],
  },

  // ============================================================
  // PÉRIMÈTRES
  // ============================================================
  {
    id: "perimetre_comprendre",
    label: "Comprendre ce qu’est un périmètre",
    notionId: "perimetre",
    prerequis: ["longueur_comparer"],
  },
  {
    id: "perimetre_triangle",
    label: "Calculer le périmètre d’un triangle",
    notionId: "perimetre",
    prerequis: ["perimetre_comprendre"],
  },
  {
    id: "perimetre_quadrilatere",
    label: "Calculer le périmètre d’un quadrilatère",
    notionId: "perimetre",
    prerequis: ["perimetre_comprendre"],
  },
  {
    id: "perimetre_polygone",
    label: "Calculer le périmètre d’un polygone",
    notionId: "perimetre",
    prerequis: ["perimetre_comprendre"],
  },
  {
    id: "perimetre_defi",
    label: "Résoudre un défi de périmètre",
    notionId: "perimetre",
    prerequis: ["perimetre_triangle", "perimetre_quadrilatere"],
  },

  // ============================================================
  // AIRES
  // ============================================================
  {
    id: "aire_comprendre",
    label: "Comprendre ce qu’est une aire",
    notionId: "aire",
    prerequis: ["longueur_comparer"],
  },
  {
    id: "aire_carre_rectangle",
    label: "Calculer l’aire d’un carré ou d’un rectangle",
    notionId: "aire",
    prerequis: ["aire_comprendre", "multiplication_table"],
  },
  {
    id: "aire_triangle_rectangle",
    label: "Calculer l’aire d’un triangle rectangle",
    notionId: "aire",
    prerequis: ["aire_carre_rectangle"],
  },
  {
    id: "aire_composer",
    label: "Calculer une aire par découpage ou assemblage",
    notionId: "aire",
    prerequis: ["aire_carre_rectangle"],
  },
  {
    id: "aire_defi",
    label: "Résoudre un défi d’aire",
    notionId: "aire",
    prerequis: ["aire_carre_rectangle", "aire_composer"],
  },

  // ============================================================
  // ANGLES
  // ============================================================
  {
    id: "angle_reconnaitre",
    label: "Reconnaître un angle",
    notionId: "angle",
    prerequis: ["droite_reconnaitre"],
  },
  {
    id: "angle_droit",
    label: "Reconnaître un angle droit",
    notionId: "angle",
    prerequis: ["angle_reconnaitre"],
  },
  {
    id: "angle_type",
    label: "Reconnaître un angle aigu, obtus, plat ou droit",
    notionId: "angle",
    prerequis: ["angle_droit"],
  },
  {
    id: "angle_mesurer",
    label: "Mesurer un angle avec un rapporteur",
    notionId: "angle",
    prerequis: ["angle_reconnaitre"],
  },
  {
    id: "angle_defi",
    label: "Résoudre un défi sur les angles",
    notionId: "angle",
    prerequis: ["angle_type", "angle_mesurer"],
  },

  // ============================================================
  // REPÉRAGE
  // ============================================================
  {
    id: "reperage_quadrillage",
    label: "Se repérer sur un quadrillage",
    notionId: "reperage",
    prerequis: ["entier_lire"],
  },
  {
    id: "reperage_coordonnees",
    label: "Lire les coordonnées d’un point",
    notionId: "reperage",
    prerequis: ["reperage_quadrillage"],
  },
  {
    id: "reperage_placer_point",
    label: "Placer un point à partir de ses coordonnées",
    notionId: "reperage",
    prerequis: ["reperage_coordonnees"],
  },
  {
    id: "reperage_deplacement",
    label: "Décrire un déplacement sur quadrillage",
    notionId: "reperage",
    prerequis: ["reperage_quadrillage"],
  },
  {
    id: "reperage_defi",
    label: "Résoudre un défi de repérage",
    notionId: "reperage",
    prerequis: ["reperage_coordonnees", "reperage_placer_point"],
  },

  // ============================================================
  // DROITES
  // ============================================================
  {
    id: "droite_reconnaitre",
    label: "Reconnaître des droites, segments et demi-droites",
    notionId: "droite",
    prerequis: ["reperage_quadrillage"],
  },
  {
    id: "droite_parallele",
    label: "Reconnaître des droites parallèles",
    notionId: "droite",
    prerequis: ["droite_reconnaitre"],
  },
  {
    id: "droite_perpendiculaire",
    label: "Reconnaître des droites perpendiculaires",
    notionId: "droite",
    prerequis: ["droite_reconnaitre"],
  },
  {
    id: "droite_tracer",
    label: "Tracer des droites parallèles ou perpendiculaires",
    notionId: "droite",
    prerequis: ["droite_parallele", "droite_perpendiculaire"],
  },
  {
    id: "droite_defi",
    label: "Résoudre un défi sur les droites",
    notionId: "droite",
    prerequis: ["droite_parallele", "droite_perpendiculaire"],
  },

  // ============================================================
  // SYMÉTRIE
  // ============================================================
  {
    id: "symetrie_axe",
    label: "Reconnaître un axe de symétrie",
    notionId: "symetrie",
    prerequis: ["droite_reconnaitre"],
  },
  {
    id: "symetrie_completer",
    label: "Compléter une figure par symétrie",
    notionId: "symetrie",
    prerequis: ["symetrie_axe"],
  },
  {
    id: "symetrie_construire",
    label: "Construire le symétrique d’un point ou d’une figure",
    notionId: "symetrie",
    prerequis: ["symetrie_axe"],
  },
  {
    id: "symetrie_propriete",
    label: "Utiliser les propriétés de la symétrie",
    notionId: "symetrie",
    prerequis: ["symetrie_construire"],
  },
  {
    id: "symetrie_defi",
    label: "Résoudre un défi de symétrie",
    notionId: "symetrie",
    prerequis: ["symetrie_completer", "symetrie_construire"],
  },

  // ============================================================
  // FIGURES PLANES
  // ============================================================
  {
    id: "figure_triangle",
    label: "Reconnaître les triangles",
    notionId: "figure_plane",
    prerequis: ["angle_reconnaitre"],
  },
  {
    id: "figure_quadrilatere",
    label: "Reconnaître les quadrilatères",
    notionId: "figure_plane",
    prerequis: ["angle_reconnaitre"],
  },
  {
    id: "figure_cercle",
    label: "Reconnaître et utiliser le cercle",
    notionId: "figure_plane",
    prerequis: ["droite_reconnaitre"],
  },
  {
    id: "figure_propriete",
    label: "Utiliser les propriétés des figures planes",
    notionId: "figure_plane",
    prerequis: ["figure_triangle", "figure_quadrilatere"],
  },
  {
    id: "figure_construire",
    label: "Construire une figure plane simple",
    notionId: "figure_plane",
    prerequis: ["figure_propriete"],
  },
  {
    id: "figure_defi",
    label: "Résoudre un défi sur les figures planes",
    notionId: "figure_plane",
    prerequis: ["figure_triangle", "figure_quadrilatere"],
  },

  // ============================================================
  // SOLIDES
  // ============================================================
  {
    id: "solide_reconnaitre",
    label: "Reconnaître les solides usuels",
    notionId: "solide",
    prerequis: ["figure_triangle", "figure_quadrilatere"],
  },
  {
    id: "solide_sommet_arete_face",
    label: "Identifier sommets, arêtes et faces",
    notionId: "solide",
    prerequis: ["solide_reconnaitre"],
  },
  {
    id: "solide_face",
    label: "Identifier les faces d’un solide",
    notionId: "solide",
    prerequis: ["solide_sommet_arete_face"],
  },
  {
    id: "solide_patron",
    label: "Reconnaître un patron de solide",
    notionId: "solide",
    prerequis: ["solide_face"],
  },
  {
    id: "solide_defi",
    label: "Résoudre un défi sur les solides",
    notionId: "solide",
    prerequis: ["solide_sommet_arete_face"],
  },

  // ============================================================
  // TABLEAUX
  // ============================================================
  {
    id: "tableau_lire",
    label: "Lire un tableau",
    notionId: "tableau",
    prerequis: ["entier_lire"],
  },
  {
    id: "tableau_completer",
    label: "Compléter un tableau",
    notionId: "tableau",
    prerequis: ["tableau_lire"],
  },
  {
    id: "tableau_interpreter",
    label: "Interpréter les informations d’un tableau",
    notionId: "tableau",
    prerequis: ["tableau_lire"],
  },
  {
    id: "tableau_defi",
    label: "Résoudre un défi avec un tableau",
    notionId: "tableau",
    prerequis: ["tableau_interpreter"],
  },

  // ============================================================
  // GRAPHIQUES
  // ============================================================
  {
    id: "graphique_lire",
    label: "Lire un graphique ou un diagramme",
    notionId: "graphique",
    prerequis: ["tableau_lire"],
  },
  {
    id: "graphique_completer",
    label: "Compléter un graphique ou un diagramme",
    notionId: "graphique",
    prerequis: ["graphique_lire"],
  },
  {
    id: "graphique_interpreter",
    label: "Interpréter un graphique ou un diagramme",
    notionId: "graphique",
    prerequis: ["graphique_lire"],
  },
  {
    id: "graphique_defi",
    label: "Résoudre un défi avec un graphique",
    notionId: "graphique",
    prerequis: ["graphique_interpreter"],
  },

  // ============================================================
  // PROBABILITÉS
  // ============================================================
  {
    id: "probabilite_vocabulaire",
    label: "Utiliser les mots certain, impossible, possible",
    notionId: "probabilite",
    prerequis: ["tableau_lire"],
  },
  {
    id: "probabilite_hasard",
    label: "Reconnaître une situation de hasard",
    notionId: "probabilite",
    prerequis: ["probabilite_vocabulaire"],
  },
  {
    id: "probabilite_comparer",
    label: "Comparer des chances simples",
    notionId: "probabilite",
    prerequis: ["probabilite_hasard"],
  },
  {
    id: "probabilite_roue_de_sac",
    label: "Raisonner avec une roue, un dé ou un sac",
    notionId: "probabilite",
    prerequis: ["probabilite_comparer"],
  },
  {
    id: "probabilite_defi",
    label: "Résoudre un défi de probabilité simple",
    notionId: "probabilite",
    prerequis: ["probabilite_roue_de_sac"],
  },

  // ============================================================
  // ALGORITHMIQUE
  // ============================================================
  {
    id: "algo_instruction",
    label: "Suivre une suite d’instructions",
    notionId: "algorithmique",
    prerequis: ["reperage_quadrillage"],
  },
  {
    id: "algo_logique",
    label: "Compléter une suite logique",
    notionId: "algorithmique",
    prerequis: ["algo_instruction"],
  },
  {
    id: "algo_deplacement",
    label: "Coder un déplacement sur quadrillage",
    notionId: "algorithmique",
    prerequis: ["reperage_deplacement"],
  },
  {
    id: "algo_programme",
    label: "Lire ou compléter un programme simple",
    notionId: "algorithmique",
    prerequis: ["algo_instruction", "algo_deplacement"],
  },
  {
    id: "algo_repetition",
    label: "Utiliser une répétition simple",
    notionId: "algorithmique",
    prerequis: ["algo_programme"],
  },
  {
    id: "algo_defi",
    label: "Résoudre un défi d’algorithmique",
    notionId: "algorithmique",
    prerequis: ["algo_repetition"],
  },
];