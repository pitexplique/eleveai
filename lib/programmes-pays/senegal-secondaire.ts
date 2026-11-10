// Sénégal, enseignement SECONDAIRE (2nde, 1re, Tle ; le bac en fin de Tle).
// Série retenue : la série SCIENTIFIQUE la plus suivie, 2nde S → 1re S2 → Tle S2
// (sciences expérimentales ; S4 a le même programme de maths). Les séries S1/S3
// (maths, techniques) et L ont d'autres programmes, non relevés ici.
// Sources OFFICIELLES : « Programmes de mathématiques du second cycle », année
// 2006, ministère de l'Éducation (programmes de 2000 « consolidés », écrits en
// contenus / commentaires / compétences exigibles), un fascicule par classe :
// - 2nde S (5 h) : https://apams.gouv.sn/sites/default/files/math_2de_S.pdf
// - 1re S2 et S4 (6 h) : https://apams.gouv.sn/sites/default/files/math1erS2etS4_0.pdf
//   Le site du ministère (apams.gouv.sn) est SUSPENDU au 25/10/2026 : les deux
//   fascicules ont été lus en entier dans les copies de la Wayback Machine
//   (15/06/2024), dont le lien est donné ci-dessous.
// - Tle S2 et S4 (5 h) : recueil « Programme d'enseignement, niveau Terminale »
//   mis en ligne par l'Office du Bac en janvier 2026, p. 71 à 80, lu en entier.
// Relevé le 25/10/2026. Aucun programme plus récent n'a été publié en ligne.
// Le programme n'a pas de codes officiels : les codes suivent l'ordre des parties
// du fascicule (AG = activités géométriques, AN = analyse ou activités
// numériques, ST = statistique, AL = algèbre, GE = géométrie, DN =
// dénombrement, OD = organisation de données).
// Le programme sénégalais garde beaucoup de ce que la France a retiré :
// barycentre, transformations et leurs composées, systèmes et programmation
// linéaire, limites et continuité dès la 1re, nombres complexes et similitudes
// en Tle S2 (chez nous : maths expertes, sans micro dans le coach).

import type { Classe } from "@/lib/tutor-v4/catalog";
import type { ProgrammePays, RenvoiMicro } from "./types";

const m = (classe: Classe, ...micros: string[]): RenvoiMicro[] =>
  micros.map((micro) => ({ classe, micro }));

const WAYBACK = "https://web.archive.org/web/20240615173343/";

export const SENEGAL_2NDE: ProgrammePays = {
  pays: "senegal",
  cle: "2nde",
  niveau: "2nde S",
  equivalentFrance: "seconde",
  source: `${WAYBACK}https://apams.gouv.sn/sites/default/files/math_2de_S.pdf`,
  version: "programme du second cycle 2006, Seconde S (5 h par semaine)",
  contenus: [
    {
      code: "AG 1", domaine: "Géométrie plane",
      texte: "Calcul vectoriel : combinaisons linéaires de vecteurs, décomposition par la relation de Chasles, passage de AC = λ·AB à la relation algébrique, démonstrations (alignement, milieu, parallélisme).",
      couverture: "complete",
      micros: m("seconde", "vecteur_somme", "vecteur_chasles_calcul", "vecteur_produit_reel", "vecteur_point_defini", "vecteur_colinearite", "vecteur_combinaison_lineaire"),
    },
    {
      code: "AG 2", domaine: "Géométrie plane",
      texte: "Barycentre de deux ou trois points pondérés : définition, propriétés (homogénéité, associativité), construction, réduction de αMA + βMB + γMC.",
      couverture: "partielle",
      micros: m("premiere-spe", "barycentre_deux_points", "barycentre_coordonnees"),
      note: "Position de G calculée et lue sur une droite graduée, réduction à 2 et 3 points ; reste la construction à la règle et au compas.",
    },
    {
      code: "AG 3", domaine: "Géométrie plane",
      texte: "Repérage cartésien : abscisse et mesure algébrique, repère quelconque, coordonnées du barycentre, changement de repère par translation ; déterminant et colinéarité ; équations de droites (vecteur directeur, équation générale et réduite, équations paramétriques).",
      couverture: "partielle",
      micros: [...m("seconde", "repere_coordonnees_point", "repere_milieu", "vecteur_coordonnees", "vecteur_colinearite", "droite_vecteur_directeur", "droite_equation_cartesienne", "droite_equation_reduite", "droite_pente_ordonne", "droite_parallelisme"), ...m("premiere-spe", "barycentre_coordonnees")],
      note: "Manquent les équations PARAMÉTRIQUES d'une droite du plan, la mesure algébrique et le changement de repère par translation.",
    },
    {
      code: "AG 4", domaine: "Géométrie plane",
      texte: "Angles : longueur d'un arc, radian, conversion degrés-radians ; angle inscrit, angle au centre, quadrilatères inscriptibles ; orientation du plan, angle orienté de deux demi-droites ou de deux vecteurs, mesure principale.",
      couverture: "complete",
      micros: [
        ...m("premiere-spe", "trig_radian", "trig_arc", "trig_enroulement", "trig_grand_reel", "angle_oriente_mesure_principale", "angle_oriente_chasles"),
        ...m("3e", "angle_inscrit_centre", "angles_inscrits_meme_arc"),
      ],
    },
    {
      code: "AG 5", domaine: "Géométrie plane",
      texte: "Lignes trigonométriques : cercle trigonométrique, cosinus, sinus et tangente d'un angle orienté ; cos²x + sin²x = 1 ; angles complémentaires, opposés, supplémentaires ; signe dans les quatre quadrants.",
      couverture: "complete",
      micros: [
        ...m("premiere-spe", "trig_cercle", "trig_cos_sin", "trig_valeurs", "trig_angles_associes", "tan_reel"),
        ...m("seconde", "geo_trig_identite"),
      ],
    },
    {
      code: "AG 6", domaine: "Géométrie plane",
      texte: "Produit scalaire : définition par le projeté orthogonal, AB·AC = AB × AC × cos, règles de calcul, identités remarquables, norme et ses propriétés.",
      couverture: "complete",
      micros: m("premiere-spe", "ps_projection", "ps_norme_angle", "ps_proprietes", "ps_norme_somme", "ps_norme", "ps_angle_longueur"),
    },
    {
      code: "AG 7", domaine: "Géométrie plane",
      texte: "Orthogonalité et expressions analytiques : vecteur normal, Pythagore et réciproque, produit scalaire et distance en coordonnées, équation d'une droite par un vecteur normal, équation du cercle (MA·MB = 0, OM² = R²), distance d'un point à une droite.",
      couverture: "partielle",
      micros: [
        ...m("premiere-spe", "ps_coordonnees", "ps_orthogonalite", "gr_vecteur_normal", "gr_equation_droite", "gr_projete", "gr_cercle", "gr_cercle_reconnaitre", "ps_ma_mb"),
        ...m("seconde", "repere_distance"),
      ],
      note: "La formule de la distance d'un point à une droite, |aα + bβ + c| ÷ √(a² + b²), n'a pas de micro.",
    },
    {
      code: "AG 8", domaine: "Géométrie plane",
      texte: "Relations métriques dans le triangle rectangle : AB² = BC·BH, AH² = HB·HC, AB·AC = BC·AH.",
      couverture: "complete",
      micros: m("3e", "metrique_produit", "metrique_carre"),
    },
    {
      code: "AG 9", domaine: "Géométrie plane",
      texte: "Transformations : translation, symétries, homothétie (Thalès vectoriel), rotation ; composées (homothéties de même centre, homothétie et translation, symétries) ; expression analytique ; lieux géométriques ; bijection.",
      couverture: "partielle",
      micros: [
        ...m("3e", "sym_homothetie_reconnaitre", "sym_homothetie_construire", "sym_homothetie_rapport", "sym_symetrie_translation_rotation", "sym_transformation_effet"),
        ...m("4e", "sym_translation", "sym_rotation"),
        ...m("seconde", "composee_symetries", "composee_homotheties"),
      ],
      note: "Composées et expression analytique couvertes pour des centres, des axes horizontaux ou verticaux et des homothéties ; manquent les lieux géométriques, la bijection et Thalès vectoriel.",
    },
    {
      code: "AG 10", domaine: "Géométrie dans l'espace",
      texte: "Perspective cavalière ; positions relatives de droites et de plans ; sections de prismes et de pyramides par un plan ; orthogonalité dans l'espace (droite et plan, plans perpendiculaires, droites orthogonales).",
      couverture: "partielle",
      micros: [
        ...m("3e", "volume_representation", "section_pave_cube", "section_cone_pyramide"),
        ...m("terminale-spe", "espace_position_relative"),
        ...m("seconde", "espace_positions_relatives", "espace_orthogonalite_droite_plan"),
      ],
      note: "Manquent les règles de la perspective cavalière.",
    },

    {
      code: "AN 1", domaine: "Activités numériques",
      texte: "Calcul dans ℝ : puissances, radicaux (√(a²b) = |a|√b), valeur absolue, distance sur une droite ; résoudre |ax + b| = |cx + d|, |x − a| ≤ b.",
      couverture: "complete",
      micros: m("seconde", "puiss_calcul", "puiss_produit_quotient", "puiss_puissance_puissance", "puiss_exposant_negatif", "puiss_expression_composee", "puiss_meme_exposant", "racine_carre_de_a2", "racine_produit", "racine_simplification", "valeur_absolue_distance", "reference_valeur_absolue", "va_equation_affine", "va_inequation_affine"),
    },
    {
      code: "AN 2", domaine: "Activités numériques",
      texte: "Intervalles et calcul approché : intervalles bornés ou non, centre et rayon ; approximation décimale, encadrement d'une somme et d'un produit, ordre de grandeur, partie entière, arrondi.",
      couverture: "partielle",
      micros: [
        ...m("seconde", "reels_ensembles", "intervalle_representer", "intervalle_appartenance", "reels_encadrement", "encadrer_somme_produit"),
        ...m("6e", "decimal_arrondir"),
        ...m("4e", "ordre_estimer"),
      ],
      note: "Manquent le centre et le rayon d'un intervalle.",
    },
    {
      code: "AN 3", domaine: "Activités numériques",
      texte: "Fonctions, généralités : définition, ensemble de définition, restriction, sens de variation, taux de variation, extremum, parité, composée de deux fonctions, représentation graphique et changement d'origine.",
      couverture: "partielle",
      micros: [
        ...m("seconde", "fonction_vocabulaire", "fonction_domaine", "fonction_image_formule", "fonction_antecedent", "fonction_tableau_graphique", "fonction_resolution_graphique", "variation_tableau", "variation_croissance", "variation_extremum", "reference_carre"),
        ...m("premiere-spe", "der_taux", "trig_parite", "var_parite"),
        ...m("terminale-spe", "composee_ecrire"),
      ],
      note: "Manquent la restriction et le changement d'origine.",
    },
    {
      code: "AN 4", domaine: "Activités numériques",
      texte: "Étude de fonctions : partie entière, x ↦ ax², x ↦ ax² + bx + c, cube, inverse, x ↦ k/x, homographiques x ↦ (ax + b)/(cx + d), racine carrée ; asymptotes parallèles aux axes (intuitif).",
      couverture: "complete",
      micros: [
        ...m("seconde", "reference_carre", "reference_cube", "reference_inverse", "reference_racine", "reference_comparer", "fct_partie_entiere", "fct_homographique"),
        ...m("premiere-spe", "sd_canonique", "var_second_degre"),
      ],
    },
    {
      code: "AN 5", domaine: "Activités numériques",
      texte: "Second degré : discriminant (et discriminant réduit), forme canonique, équations se ramenant au second degré, somme et produit des racines, signe du trinôme, inéquations.",
      couverture: "complete",
      micros: m("premiere-spe", "sd_canonique", "sd_completion_carre", "sd_discriminant", "sd_racines", "sd_somme_produit", "sd_forme_factorisee", "sd_signe", "sd_inequation"),
      note: "En France, c'est le programme de 1re spécialité.",
    },
    {
      code: "AN 6", domaine: "Activités numériques",
      texte: "Systèmes du premier degré : deux équations à deux inconnues (méthode de Cramer), deux ou trois équations à deux inconnues et leur interprétation ; systèmes d'inéquations, régionnement du plan, exemples de programmation linéaire.",
      couverture: "partielle",
      micros: m("seconde", "droite_systeme", "droite_intersection", "systeme_determinant", "systeme_cramer", "demi_plan_couple_solution", "demi_plan_representer", "demi_plan_systeme"),
      note: "Manquent trois équations à deux inconnues et leur interprétation.",
    },
    {
      code: "AN 7", domaine: "Activités numériques",
      texte: "Polynômes (degré ≤ 4) et fractions rationnelles : zéro, factorisation par (x − a) (identification, Horner, division euclidienne), signe ; condition d'existence, simplification, zéros et signe d'une fraction rationnelle.",
      couverture: "partielle",
      micros: [
        ...m("seconde", "signes_premier_degre", "signes_produit", "signes_quotient", "fonction_domaine", "poly_racine_factoriser", "poly_division", "poly_horner"),
        ...m("premiere-spe", "sd_factorisation"),
      ],
      note: "Manquent l'identification et la simplification d'une fraction rationnelle ; le degré 4 n'est vu que par Horner.",
    },
    {
      code: "AN 8", domaine: "Activités numériques",
      texte: "Raisonnement : syllogisme, contraposée, raisonnement par l'absurde, symboles de l'implication et de l'équivalence.",
      couverture: "complete",
      micros: [
        ...m("seconde", "logique_connecteurs", "logique_implication_reciproque", "logique_negation_contre_exemple", "logique_contraposee", "logique_raisonnement_type"),
        ...m("premiere-spe", "log_raisonnements", "log_equivalence"),
      ],
    },

    {
      code: "ST 1", domaine: "Statistique",
      texte: "Statistique descriptive : diagrammes cumulatifs, histogramme, mode, classe modale, moyenne, médiane, quartiles (graphiquement et par le calcul) ; variance, écart-type, interprétation.",
      couverture: "complete",
      micros: [
        ...m("seconde", "stat_lire_serie", "stat_frequence", "stat_moyenne_ponderee", "stat_mediane_quartiles", "stat_ecart_interquartile", "stat_ecart_type", "stat_interpreter", "stat_histogramme", "stat_polygone_cumule", "stat_mediane_estimee", "stat_linearite_moyenne"),
        ...m("3e", "stat_classe_modale_centre", "stat_lire_tableau"),
        ...m("4e", "stat_histogramme_lire"),
        ...m("premiere", "auto_stat_moyenne"),
        ...m("5e", "stat_mode"),
      ],
    },
  ],
};

export const SENEGAL_1RE: ProgrammePays = {
  pays: "senegal",
  cle: "1re",
  niveau: "1re S2",
  equivalentFrance: "premiere-spe",
  source: `https://web.archive.org/web/20240615173321/https://apams.gouv.sn/sites/default/files/math1erS2etS4_0.pdf`,
  version: "programme du second cycle 2006, Premières S2 et S4 (6 h par semaine)",
  contenus: [
    {
      code: "AN 1", domaine: "Analyse",
      texte: "Fonctions associées : courbes de x ↦ f(x − a), f(x) + b, |f(x)|, f(|x|) ; centre et axe de symétrie d'une courbe ; courbe de la réciproque d'une bijection.",
      couverture: "partielle",
      micros: [...m("terminale-spe", "reciproque_courbe", "symetrie_courbe"), ...m("seconde", "courbe_translation", "courbe_dilatation_abs")],
      note: "Manque la courbe de f(|x|).",
    },
    {
      code: "AN 2", domaine: "Analyse",
      texte: "Limites : approche intuitive, notations, limite à droite et à gauche, limites infinies et à l'infini, opérations, formes indéterminées, asymptotes horizontales et verticales.",
      couverture: "complete",
      micros: m("terminale-spe", "limite_fonction_reference", "limite_fonction_operations", "limite_fonction_infini", "limite_fonction_point", "limite_fonction_asymptote"),
      note: "En France, c'est le programme de Terminale.",
    },
    {
      code: "AN 3", domaine: "Analyse",
      texte: "Continuité : en un point, à droite, à gauche, sur un intervalle ; image d'un intervalle ; une fonction continue strictement monotone est une bijection.",
      couverture: "partielle",
      micros: m("terminale-spe", "continuite_reconnaitre", "tvi_unicite", "reciproque_bijection", "limite_gauche_droite"),
      note: "Manque l'image d'un intervalle.",
    },
    {
      code: "AN 4", domaine: "Analyse",
      texte: "Dérivation : nombre dérivé, à gauche et à droite, demi-tangentes et point anguleux, tangente, approximation affine, dérivées usuelles, somme, produit, quotient, x ↦ f(ax + b).",
      couverture: "complete",
      micros: m("premiere-spe", "der_taux", "der_nombre_derive", "der_definition", "der_tangente", "der_interpreter", "der_valeur_absolue", "der_usuelles", "der_operations", "der_quotient", "der_composee_affine"),
    },
    {
      code: "AN 5", domaine: "Analyse",
      texte: "Dérivée et sens de variation : dérivée nulle, positive, négative ; extremum quand f' s'annule en changeant de signe ; problèmes d'optimisation ; dérivée et bijection.",
      couverture: "complete",
      micros: [
        ...m("premiere-spe", "var_constante", "var_signe_derivee", "var_tableau", "var_extremum", "var_extremum_tangente", "var_optimisation", "var_inegalite"),
        ...m("terminale-spe", "tvi_unicite"),
      ],
    },
    {
      code: "AN 6", domaine: "Analyse",
      texte: "Étude de fonctions : polynômes de degré ≤ 3, rationnelles (asymptotes obliques), irrationnelles, sinus, cosinus, tangente (périodicité, composées avec une affine) ; résolution graphique de f(x) = g(x), f(x) > g(x), discussion de f(x) = m.",
      couverture: "partielle",
      micros: [
        ...m("premiere-spe", "var_tableau", "var_position_relative", "graph1s_resoudre_equation", "graph1s_resoudre_inequation", "trig_courbes", "trig_periodicite", "tan_reel", "tan_identite_derivee"),
        ...m("terminale-spe", "limite_fonction_asymptote", "asymptote_oblique"),
      ],
      note: "Asymptotes obliques couvertes ; domaine, période et dérivée de tan aussi. Manquent l'étude complète de la fonction tangente, les fonctions irrationnelles et la discussion graphique de f(x) = m.",
    },
    {
      code: "AN 7", domaine: "Analyse",
      texte: "Suites : définition, sens de variation, suites bornées, périodiques, raisonnement par récurrence, représentation graphique ; suites arithmétiques et géométriques, somme de p termes ; convergence (approche intuitive).",
      couverture: "complete",
      micros: [
        ...m("premiere-spe", "suite_termes", "suite_recurrence", "suite_variation", "suite_arithmetique", "suite_geometrique", "suite_sommes", "suite_somme_geo", "suite_limite", "suite_algorithme"),
        ...m("terminale-spe", "suite_bornee", "suite_recurrence_preuve"),
      ],
    },

    {
      code: "DN 1", domaine: "Dénombrement",
      texte: "Ensembles finis, cardinal, produit cartésien ; p-listes, arrangements, permutations, combinaisons ; triangle de Pascal, binôme de Newton.",
      couverture: "partielle",
      micros: [
        ...m("premiere-spe", "log_appartenance", "log_operations", "log_couple"),
        ...m("terminale-spe", "denombrement_reconnaitre", "denombrement_produit_somme", "denombrement_arrangement_combinaison", "denombrement_coefficient_binomial", "denombrement_pascal"),
      ],
      note: "La formule du binôme de Newton, (a + b)ⁿ, n'a pas de micro. En France, le dénombrement est en Terminale.",
    },

    {
      code: "ST 1", domaine: "Statistique",
      texte: "Séries classées d'inégales amplitudes ; séries à deux variables : effectifs et fréquences marginaux et conditionnels, nuage de points, point moyen, ajustement à main levée et par la méthode de Mayer.",
      couverture: "partielle",
      micros: [...m("premiere", "info_tab_frequence_marginale", "info_tab_frequence_conditionnelle", "info_nuage_construire", "info_point_moyen_calculer", "info_point_moyen_droite", "info_ajust_determiner", "info_ajust_equation"), ...m("seconde", "croise_completer_tableau", "croise_frequence_marginale", "croise_frequence_conditionnelle")],
      note: "Renvois à l'enseignement scientifique de 1re (tronc commun). Les classes d'inégales amplitudes et la méthode de MAYER (deux sous-nuages, deux points moyens) n'ont pas de micro propre.",
    },

    {
      code: "AL 1", domaine: "Algèbre",
      texte: "Applications : image directe, image réciproque, applications injectives, surjectives, bijectives, application réciproque, restriction.",
      couverture: "partielle",
      micros: m("terminale-spe", "reciproque_bijection", "reciproque_expression"),
      note: "Injective, surjective, bijective et réciproque couvertes ; image directe et image réciproque d'un ensemble ne sont pas travaillées pour elles-mêmes.",
    },
    {
      code: "AL 2", domaine: "Algèbre",
      texte: "Équations et inéquations : irrationnelles (√f(x) = ax + b, √f(x) ≤ g(x)), bicarrées, avec un paramètre réel, se ramenant au second degré.",
      couverture: "partielle",
      micros: m("premiere-spe", "sd_discriminant", "sd_racines", "sd_inequation", "sd_forme_adaptee"),
      note: "Les bicarrées (poser X = x²) sont dans sd_racines ; manquent les équations IRRATIONNELLES (élever au carré, vérifier) et la discussion selon un paramètre.",
    },
    {
      code: "AL 3", domaine: "Algèbre",
      texte: "Systèmes d'équations linéaires dans ℝ³ (méthode du pivot de Gauss) ; systèmes d'inéquations, programmation linéaire.",
      couverture: "complete",
      micros: [...m("seconde", "demi_plan_systeme"), ...m("terminale-spe", "systeme_3x3_gauss")],
    },

    {
      code: "GE 1", domaine: "Géométrie",
      texte: "Outil vectoriel : vecteurs du plan et de l'espace, décomposition d'un vecteur de l'espace ; barycentre de quatre points pondérés, coordonnées, centre d'inertie d'une plaque homogène.",
      couverture: "complete",
      micros: [...m("terminale-spe", "espace_vecteurs", "espace_repere_coordonnees"), ...m("premiere-spe", "barycentre_coordonnees")],
    },
    {
      code: "GE 2", domaine: "Géométrie",
      texte: "Outil métrique : produit scalaire, distance d'un point à une droite, lignes de niveau u·OM = k, MA·MB = k, aMA² + bMB² = k ; dans l'espace : bases orthonormales, distance, norme, orthogonalité, équation d'une sphère, d'un plan, distance d'un point à un plan.",
      couverture: "partielle",
      micros: [
        ...m("premiere-spe", "ps_ma_mb", "gr_projete", "gr_cercle_utiliser", "ps_methode"),
        ...m("terminale-spe", "ps_espace_calculer", "ps_espace_norme_distance", "ps_espace_orthogonalite", "ps_espace_plan_normal", "espace_plan_equation"),
      ],
      note: "Manquent la ligne de niveau aMA² + bMB² = k et l'équation cartésienne de la SPHÈRE.",
    },
    {
      code: "GE 3", domaine: "Géométrie",
      texte: "Angles orientés et trigonométrie : relation de Chasles, mesure principale, congruences ; formules d'addition, de duplication, de linéarisation ; équations cos x = cos a, sin x = sin a, tan x = tan a, a cos x + b sin x + c = 0 ; inéquations trigonométriques.",
      couverture: "complete",
      micros: [
        ...m("premiere-spe", "trig_grand_reel", "trig_valeurs", "trig_angles_associes", "trig_cercle", "trig_formule_addition", "trig_formule_duplication", "trig_equation_generale", "angle_oriente_mesure_principale", "angle_oriente_chasles", "trig_equation_formes"),
        ...m("terminale-spe", "trigo_equation_cos", "trigo_inequation_cos"),
      ],
    },
    {
      code: "GE 4", domaine: "Géométrie",
      texte: "Transformations : composée de deux transformations planes (rotations de même centre, symétries orthogonales, homothétie et rotation de même centre), expression analytique, isométries ayant un point invariant.",
      couverture: "partielle",
      micros: [...m("4e", "sym_transformation_defi"), ...m("seconde", "composee_symetries", "composee_homotheties")],
      note: "Deux rotations de même centre : seulement sym_transformation_defi (4e, ★5) ; manquent les isométries à point invariant.",
    },
    {
      code: "GE 5", domaine: "Géométrie",
      texte: "Géométrie dans l'espace : plan médiateur, sections planes (sphère, prisme, pyramide), distances, angles, aires et volumes ; produit vectoriel (coordonnées, propriétés).",
      couverture: "partielle",
      micros: m("3e", "section_pave_cube", "section_cone_pyramide", "section_calculer_longueur", "volume_boule", "section_sphere"),
      note: "Section d'une sphère couverte ; manquent le plan médiateur et le PRODUIT VECTORIEL (absent du lycée français).",
    },
  ],
};

export const SENEGAL_TLE: ProgrammePays = {
  pays: "senegal",
  cle: "tle",
  niveau: "Tle S2",
  equivalentFrance: "terminale-spe",
  source: "https://officedubac.sn/wp-content/uploads/2026/01/Programme_Maths-LS.pdf",
  version: "programme du second cycle 2006, Terminales S2 et S4 (5 h par semaine), recueil de l'Office du Bac 2026",
  contenus: [
    {
      code: "AN 1", domaine: "Analyse",
      texte: "Continuité et fonction réciproque : théorème des valeurs intermédiaires, valeur approchée d'un zéro ; réciproque d'une fonction continue strictement monotone (existence, courbe) ; branches infinies, comparaison de limites, limite d'une composée.",
      couverture: "partielle",
      micros: m("terminale-spe", "continuite_reconnaitre", "tvi_appliquer", "tvi_unicite", "tvi_rediger", "limite_fonction_operations", "limite_fonction_asymptote", "reciproque_bijection", "reciproque_expression", "reciproque_courbe", "branches_infinies", "tvi_defi"),
      note: "Manquent le calcul d'une valeur approchée d'un zéro (le défi tvi_defi nomme seulement le balayage et la dichotomie), la comparaison de limites et la limite d'une composée pour les fonctions.",
    },
    {
      code: "AN 2", domaine: "Analyse",
      texte: "Dérivées et primitives : dérivée d'une composée et d'une réciproque, dérivées successives, point d'inflexion ; primitives des fonctions usuelles, de (g' ∘ f)·f' et fⁿ·f' ; inégalité des accroissements finis.",
      couverture: "partielle",
      micros: m("terminale-spe", "derivation_formules", "derivation_somme_produit_quotient", "derivation_composee", "convexite_derivee_seconde", "convexite_point_inflexion", "primitive_reconnaitre", "primitive_calculer", "reciproque_derivee"),
      note: "La dérivée de la réciproque est couverte ; manquent les primitives de fⁿ·f' et l'inégalité des accroissements finis.",
    },
    {
      code: "AN 3", domaine: "Analyse",
      texte: "Logarithme népérien : primitive de x ↦ 1/x qui s'annule en 1, propriétés algébriques, limites (dont ln(1 + x)/x en 0 et ln(x)/xᵃ en +∞), dérivée, courbe.",
      couverture: "complete",
      micros: m("terminale-spe", "ln_definition", "ln_proprietes", "ln_deriver", "ln_equation_inequation", "ln_limite"),
      note: "En France, ln est défini comme réciproque de exp : l'ordre est inverse, le contenu est le même.",
    },
    {
      code: "AN 4", domaine: "Analyse",
      texte: "Exponentielle : réciproque de ln, propriétés, limites (eˣ/xᵃ, xⁿeˣ, (eˣ − 1)/x), dérivée, primitives de (exp ∘ f)·f', courbe.",
      couverture: "complete",
      micros: [...m("terminale-spe", "exp_definition", "exp_proprietes", "exp_deriver", "exp_equation_inequation", "exp_limite", "primitive_calculer"), ...m("premiere-spe", "exp_relation", "exp_signe", "exp_simplifier", "exp_courbe")],
    },
    {
      code: "AN 5", domaine: "Analyse",
      texte: "Études de fonctions : polynômes, rationnelles, trigonométriques ; fonctions puissances x ↦ xᵃ (a entier ou rationnel).",
      couverture: "complete",
      micros: m("terminale-spe", "derivation_variation", "derivation_optimisation", "limite_fonction_asymptote", "trigo_etude_fonction", "expo_ratio_regles"),
    },
    {
      code: "AN 6", domaine: "Analyse",
      texte: "Suites : rappels sur les suites arithmétiques et géométriques ; suites récurrentes uₙ₊₁ = f(uₙ) avec f continue (représentation, sens de variation, limite solution de f(x) = x) ; convergence des suites monotones bornées.",
      couverture: "complete",
      micros: m("terminale-spe", "suite_reconnaitre", "suite_calculer_termes", "suite_explicite_recurrence", "suite_recurrence_preuve", "suite_variation", "suite_bornee", "limite_suite_monotone_bornee", "limite_suite_calculer", "limite_suite_defi", "suite_defi"),
    },
    {
      code: "AN 7", domaine: "Analyse",
      texte: "Calcul intégral : intégrale d'une fonction continue, linéarité, Chasles, positivité, inégalité de la moyenne, intégration par parties ; aires planes, volumes V = ∫ S(z) dz et solides de révolution.",
      couverture: "partielle",
      micros: m("terminale-spe", "primitive_calculer", "integrale_calculer", "integrale_aire", "integrale_valeur_moyenne", "integrale_ipp_choisir", "integrale_ipp_calculer", "integrale_ipp_primitive", "integrale_proprietes", "integrale_encadrer"),
      note: "Intégration par parties et propriétés couvertes ; manquent les calculs de VOLUMES.",
    },
    {
      code: "AN 8", domaine: "Analyse",
      texte: "Équations différentielles linéaires à coefficients constants : premier ordre et SECOND ordre, homogènes ou avec second membre, solution vérifiant des conditions initiales.",
      couverture: "partielle",
      micros: m("terminale-spe", "equadiff_reconnaitre", "equadiff_y_prime_ay", "equadiff_y_prime_ay_b", "equadiff_solution_particuliere", "equadiff_condition_initiale", "equadiff_second_ordre", "equadiff_second_ordre_conditions"),
      note: "Manque le second ordre avec second membre : seules les équations homogènes sont traitées.",
    },

    {
      code: "OD 1", domaine: "Organisation de données",
      texte: "Séries statistiques à deux variables : méthode des moindres carrés, coefficient de corrélation linéaire, droites de régression, prévisions.",
      couverture: "complete",
      micros: [
        ...m("premiere", "info_nuage_construire", "info_point_moyen_calculer", "info_ajust_equation", "info_ajust_interpoler", "info_ajust_extrapoler"),
        ...m("stmg", "statT_mc_principe", "statT_mc_calculer", "statT_mc_comparer", "stat_covariance", "stat_correlation_r", "stat_regression_formules"),
      ],
    },
    {
      code: "OD 2", domaine: "Organisation de données",
      texte: "Probabilités : vocabulaire, probabilité d'un événement, contraire, réunion, équiprobabilité ; probabilité conditionnelle, événements indépendants, formule des probabilités totales.",
      couverture: "complete",
      micros: [
        ...m("seconde", "proba_vocabulaire", "proba_calculer", "proba_evenement_contraire", "proba_formule_union"),
        ...m("premiere-spe", "pc_independance", "pc_arbre_construire", "pc_inverser"),
        ...m("terminale-spe", "proba_conditionnelle_arbre", "proba_conditionnelle_formule", "proba_totales", "proba_inverse_bayes", "proba_conditionnelle_defi"),
      ],
    },
    {
      code: "OD 3", domaine: "Organisation de données",
      texte: "Variables aléatoires : loi, fonction de répartition F(x) = P(X ≤ x), espérance, variance, écart-type ; schéma de Bernoulli, loi binomiale.",
      couverture: "partielle",
      micros: [...m("terminale-spe", "va_definition", "va_loi_probabilite", "va_esperance", "va_variance_ecart_type", "va_interpreter", "va_somme", "binomiale_schema", "binomiale_reconnaitre", "binomiale_calculer", "binomiale_intervalle", "binomiale_esperance_variance", "va_defi", "binomiale_defi"), ...m("premiere-spe", "va_notation", "pc_bernoulli_repetition", "pc_bernoulli_au_moins_un")],
      note: "P(X ⩽ a) se lit et se calcule dans va_notation (1re) ; la FONCTION DE RÉPARTITION comme fonction en escalier, à tracer, n'a pas de micro.",
    },

    {
      code: "AG 1", domaine: "Algèbre et géométrie",
      texte: "Nombres complexes : forme algébrique, somme, produit, quotient, conjugué ; module, argument, forme trigonométrique, notation e^{iθ} ; affixe d'un point, d'un vecteur.",
      couverture: "complete",
      micros: m("terminale-spe", "cx_forme_algebrique", "cx_conjugue_quotient", "cx_module_argument", "cx_forme_exponentielle", "cx_geometrie"),
    },
    {
      code: "AG 2", domaine: "Algèbre et géométrie",
      texte: "Formules de Moivre et d'Euler, linéarisation, racines n-ièmes de l'unité et d'un complexe ; équations du second degré à coefficients complexes.",
      couverture: "complete",
      micros: m("terminale-spe", "cx_forme_exponentielle", "cx_racines_nieme", "cx_equation_second_degre"),
      note: "Équations à coefficients complexes en QCM seulement (somme et produit, test des solutions) : pas de saisie d'une racine du discriminant complexe.",
    },
    {
      code: "AG 3", domaine: "Algèbre et géométrie",
      texte: "Complexes et géométrie : alignement, longueurs, nature d'une configuration ; similitudes planes directes z ↦ az + b et leurs éléments caractéristiques.",
      couverture: "complete",
      micros: m("terminale-spe", "cx_geometrie", "similitude_directe"),
    },
  ],
};
