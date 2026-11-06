// Côte d'Ivoire, SECOND CYCLE DU SECONDAIRE (lycée : 2nde C, 1re D, Tle D ;
// le bac en fin de Terminale).
// Source OFFICIELLE : « Programme éducatif et guide d'exécution —
// Mathématiques », MENA / Inspection générale / DPFC, version « CND 0923 »
// (2023), PDF texte sur le site de la DPFC :
//   https://dpfc-ci.net/dpfc/programmes/maths/06.Prog%20Educt%20maths%202C%20CND%200923.pdf
//   https://dpfc-ci.net/dpfc/programmes/maths/10.Prog%20Educt%20maths%201D%20CND%200923.pdf
//   https://dpfc-ci.net/dpfc/programmes/maths/14.%20Prog%20Educt%20maths%20TD%20CND%200923.pdf
// Relevé le 25/10/2026 sur le CORPS DU PROGRAMME (habiletés et contenus).
// ⭐ POURQUOI LA SÉRIE D : la 2nde C est le tronc commun des séries C et D ;
// ensuite la série D (sciences expérimentales, la plus nombreuse) a le même
// cœur que notre spécialité maths (second degré, dérivation, suites, limites,
// ln, exp, intégrales, équations différentielles, probabilités conditionnelles,
// loi binomiale) ; la série C y ajoute l'arithmétique, les coniques, les
// isométries et similitudes, la géométrie analytique de l'espace — plutôt nos
// « maths expertes », que le coach n'a pas. Les fascicules 1re C
// (09. … 1C …) et Tle C (13. … TC …) sont au même endroit, pour plus tard.
// Codes : C n-L k = compétence n, k-ième leçon dans l'ordre du corps du
// programme. La progression annuelle n'est pas dans le fascicule.
// Décalages avec la France : produit scalaire, angles orientés et homothéties
// dès la 2nde ; dénombrement et barycentre en 1re ; nombres complexes et
// similitudes en Tle D (absents de notre spécialité) ; statistique à deux
// variables (moindres carrés) en Tle.

import type { Classe } from "@/lib/tutor-v4/catalog";
import type { ProgrammePays, RenvoiMicro } from "./types";

const m = (classe: Classe, ...micros: string[]): RenvoiMicro[] =>
  micros.map((micro) => ({ classe, micro }));

const CALC = "Calculs algébriques";
const FONC = "Fonctions";
const DONN = "Organisation et traitement des données";
const ALEA = "Modélisation d'un phénomène aléatoire";
const GPLAN = "Géométrie du plan";
const GESP = "Géométrie de l'espace";
const TRANS = "Transformations du plan";

const SOURCE = "https://dpfc-ci.net/dpfc/programmes/maths/ (06 = 2nde C, 10 = 1re D, 14 = Tle D, CND 0923)";
const VERSION = "programmes éducatifs et guides d'exécution MENA/DPFC, version CND 0923 (2023)";

export const COTE_DIVOIRE_2NDE: ProgrammePays = {
  pays: "cote-divoire",
  cle: "2nde",
  niveau: "Seconde C",
  equivalentFrance: "seconde",
  source: SOURCE,
  version: VERSION,
  contenus: [
    {
      code: "C1-L1", domaine: CALC,
      texte: "Ensemble des nombres réels : majorant, minorant, maximum, minimum ; valeur absolue et distance ; approximation et arrondi d'ordre n, encadrement ; |x − a| = r et |x − a| ≤ r (algébriquement et graphiquement) ; raisonnement par l'absurde.",
      couverture: "partielle",
      micros: [
        ...m("seconde", "reels_ensembles", "valeur_absolue_distance", "reels_encadrement", "intervalle_representer"),
        ...m("premiere-spe", "log_raisonnements"),
      ],
      note: "Majorant, minorant, maximum d'un ensemble n'ont pas de micro.",
    },
    {
      code: "C1-L2", domaine: CALC,
      texte: "Polynômes et fractions rationnelles : degré, zéro, égalité de polynômes, factorisation par x − α (coefficients indéterminés, division euclidienne), forme canonique du second degré, signe d'un trinôme factorisé ; écritures d'une fraction rationnelle.",
      couverture: "partielle",
      micros: [
        ...m("premiere-spe", "sd_canonique", "sd_completion_carre", "sd_forme_factorisee"),
        ...m("seconde", "devfac_factoriser_identite", "signes_produit", "poly_racine_factoriser", "poly_division", "poly_horner"),
      ],
      note: "Manquent les coefficients indéterminés et les fractions rationnelles.",
    },
    {
      code: "C1-L3", domaine: CALC,
      texte: "Équations et inéquations dans ℝ : équations équivalentes, ensemble de validité ; membres polynômes ou fractions rationnelles ; équations et inéquations avec valeur absolue.",
      couverture: "complete",
      micros: m("seconde", "equation_resoudre", "inequation_resoudre", "signes_quotient", "signes_resoudre_equation", "signes_resoudre_inequation", "valeur_absolue_distance", "va_equation_affine", "va_inequation_affine"),
    },
    {
      code: "C1-L4", domaine: CALC,
      texte: "Inéquations dans ℝ × ℝ : interprétation graphique (demi-plans), systèmes d'inéquations du premier degré, programmation linéaire.",
      couverture: "complete",
      micros: m("seconde", "demi_plan_couple_solution", "demi_plan_representer", "demi_plan_systeme"),
    },
    {
      code: "C1-L5", domaine: FONC,
      texte: "Généralités sur les fonctions : ensemble de définition, image, antécédents, image directe et réciproque d'un intervalle, maximum et minimum, sens de variation (graphique), fonctions égales.",
      couverture: "partielle",
      micros: m("seconde", "fonction_vocabulaire", "fonction_domaine", "fonction_image_formule", "fonction_antecedent", "graph_image", "graph_antecedent", "graph_tableau_variations", "variation_tableau", "variation_extremum"),
      note: "L'image directe et l'image réciproque d'un intervalle n'ont pas de micro.",
    },
    {
      code: "C1-L6", domaine: FONC,
      texte: "Fonctions élémentaires : x², x³, 1/x, √x, partie entière E(x), |ax + b|, affines par intervalles, ax² et a/x ; sens de variation et tableau.",
      couverture: "complete",
      micros: [
        ...m("seconde", "reference_carre", "reference_cube", "reference_inverse", "reference_racine", "reference_valeur_absolue", "reference_comparer", "fct_partie_entiere", "fct_par_intervalles", "abs_affine_morceaux"),
        ...m("premiere", "lin_affine_par_morceaux"),
      ],
    },
    {
      code: "C2-L1", domaine: DONN,
      texte: "Statistique à une variable : classes de même amplitude, classe modale, effectifs et fréquences cumulés croissants et décroissants, polygones, médiane par lecture graphique, moyenne, écart moyen, variance, écart type.",
      couverture: "partielle",
      micros: [
        ...m("seconde", "stat_moyenne", "stat_mediane_quartiles", "stat_frequence", "stat_ecart_type", "stat_interpreter", "stat_histogramme", "stat_polygone_cumule", "stat_mediane_estimee"),
        ...m("3e", "stat_classe_modale_centre", "stat_effectifs_cumules"),
        ...m("4e", "stat_histogramme_lire"),
        ...m("premiere", "auto_stat_moyenne"),
      ],
      note: "Séries en classes et polygones couverts ; reste l'écart moyen.",
    },
    {
      code: "C3-L1", domaine: GPLAN,
      texte: "Vecteurs et points du plan : combinaison linéaire, base, colinéarité, norme, base orthonormée, mesure algébrique, déterminant de deux vecteurs ; équation cartésienne de droite, alignement et parallélisme par le déterminant.",
      couverture: "partielle",
      micros: m("seconde", "vecteur_coordonnees", "vecteur_norme", "vecteur_produit_reel", "vecteur_colinearite", "vecteur_combinaison_lineaire", "vecteur_chasles_calcul", "droite_vecteur_directeur", "droite_equation_cartesienne", "droite_parallelisme"),
      note: "Manque la mesure algébrique.",
    },
    {
      code: "C3-L2", domaine: GPLAN,
      texte: "Produit scalaire : définition, carré scalaire, interprétation géométrique (projeté), règles de calcul, expression en base orthonormée, orthogonalité, Al Kashi, relations métriques du triangle rectangle, angle de deux vecteurs, cercle de diamètre donné.",
      couverture: "complete",
      micros: [...m("premiere-spe", "ps_projection", "ps_norme_angle", "ps_coordonnees", "ps_proprietes", "ps_orthogonalite", "ps_alkashi", "ps_angle_longueur", "ps_ma_mb", "gr_cercle"), ...m("3e", "metrique_produit", "metrique_carre")],
    },
    {
      code: "C3-L3", domaine: GPLAN,
      texte: "Angles inscrits : angle au centre, angle inscrit défini par une corde et une demi-tangente, arc capable ; aire d'un triangle (½ ab sin C), théorème des sinus.",
      couverture: "partielle",
      micros: [...m("3e", "angle_inscrit_centre", "angles_inscrits_meme_arc"), ...m("premiere-spe", "trig_loi_sinus", "trig_aire_heron")],
      note: "Manquent la demi-tangente et l'arc capable.",
    },
    {
      code: "C3-L4", domaine: GPLAN,
      texte: "Angles orientés et trigonométrie : radian, conversions, angle orienté et mesure principale, cercle trigonométrique, cosinus, sinus, tangente, angles opposés.",
      couverture: "complete",
      micros: m("premiere-spe", "trig_radian", "trig_enroulement", "trig_cercle", "trig_cos_sin", "trig_valeurs", "trig_angles_associes", "angle_oriente_mesure_principale", "tan_reel"),
    },
    {
      code: "C3-L5", domaine: GESP,
      texte: "Droites et plans de l'espace : positions relatives (droites, droite et plan, plans), détermination d'un plan, parallélisme, coplanarité, section plane d'un solide.",
      couverture: "partielle",
      micros: [
        ...m("terminale-spe", "espace_position_relative"),
        ...m("3e", "section_reconnaitre", "section_pave_cube"),
        ...m("seconde", "espace_positions_relatives"),
      ],
      note: "Reste la détermination d'un plan comme savoir ; le parallélisme se travaille en QCM, pas par la rédaction d'une preuve.",
    },
    {
      code: "C3-L6", domaine: TRANS,
      texte: "Utilisation des symétries et translations : propriété caractéristique de la translation, constructions, démonstrations, lieux de points.",
      couverture: "partielle",
      micros: [
        ...m("4e", "sym_axiale", "sym_centrale", "sym_translation", "sym_transformation_propriete"),
        ...m("3e", "sym_symetrie_translation_rotation"),
      ],
      note: "Propriétés et constructions couvertes ; manquent les démonstrations et les lieux de points par ces transformations.",
    },
    {
      code: "C3-L7", domaine: TRANS,
      texte: "Homothéties : définition, centre, rapport, points invariants, propriété fondamentale, images de figures, conservations, longueurs et aires multipliées ; démontrer avec une homothétie.",
      couverture: "partielle",
      micros: m("3e", "sym_homothetie_reconnaitre", "sym_homothetie_construire", "sym_homothetie_rapport", "sym_transformation_effet"),
      note: "Manquent la propriété fondamentale (vecteurs) et les démonstrations par homothétie.",
    },
    {
      code: "C3-L8", domaine: TRANS,
      texte: "Rotations : définition, points invariants, propriété fondamentale, images de figures, conservations ; démontrer avec une rotation.",
      couverture: "partielle",
      micros: [
        ...m("4e", "sym_rotation"),
        ...m("3e", "sym_transformation_effet"),
      ],
      note: "Pas de micro « démontrer avec une rotation » (triangles équilatéraux, carrés).",
    },
  ],
};

export const COTE_DIVOIRE_1RE: ProgrammePays = {
  pays: "cote-divoire",
  cle: "1re",
  niveau: "Première D",
  equivalentFrance: "premiere-spe",
  source: SOURCE,
  version: VERSION,
  contenus: [
    {
      code: "C1-L1", domaine: CALC,
      texte: "Équations et inéquations du second degré : discriminant, racines, somme et produit, factorisation, signe du trinôme, résolution graphique ; √p(x) = q(x) et inéquations associées ; équations bicarrées ax⁴ + bx² + c = 0.",
      couverture: "partielle",
      micros: m("premiere-spe", "sd_discriminant", "sd_racines", "sd_forme_factorisee", "sd_factorisation", "sd_somme_produit", "sd_deux_racines", "sd_signe", "sd_inequation"),
      note: "Manquent les équations irrationnelles √p(x) = q(x) et les bicarrées.",
    },
    {
      code: "C1-L2", domaine: CALC,
      texte: "Systèmes d'équations linéaires dans ℝ² (déterminant, existence et unicité) et dans ℝ³ (substitution, pivot de Gauss) ; mise en équation de situations concrètes.",
      couverture: "complete",
      micros: [...m("seconde", "droite_systeme", "systeme_determinant", "systeme_cramer"), ...m("terminale-spe", "systeme_3x3_gauss")],
    },
    {
      code: "C1-L3", domaine: FONC,
      texte: "Généralités sur les fonctions : restriction, application injective, surjective, bijective et réciproque, comparaison de fonctions, somme, produit, quotient, composée ; fonctions associées f(x − a) + b, f(−x), −f(x), |f(x)| et leurs courbes (translations, symétries).",
      couverture: "partielle",
      micros: [...m("terminale-spe", "reciproque_bijection", "reciproque_expression", "reciproque_courbe", "composee_ecrire"), ...m("seconde", "courbe_translation", "courbe_dilatation_abs"), ...m("premiere-spe", "var_parite")],
      note: "Manquent la restriction et la comparaison de fonctions ; la courbe de f(−x) n'est vue que par la symétrie des fonctions paires et impaires.",
    },
    {
      code: "C1-L4", domaine: FONC,
      texte: "Limites et continuité en un point : limite, limite à gauche et à droite, opérations, continuité en un point et sur un intervalle.",
      couverture: "complete",
      micros: m("terminale-spe", "limite_fonction_point", "limite_fonction_operations", "limite_fonction_reference", "continuite_reconnaitre"),
      note: "Chez nous en Terminale.",
    },
    {
      code: "C1-L5", domaine: FONC,
      texte: "Extension de la notion de limite : limites infinies, limites à l'infini, fonctions de référence, polynômes et fonctions rationnelles, asymptotes verticales et horizontales.",
      couverture: "complete",
      micros: m("terminale-spe", "limite_fonction_reference", "limite_fonction_infini", "limite_fonction_operations", "limite_fonction_asymptote"),
    },
    {
      code: "C1-L6", domaine: FONC,
      texte: "Dérivation : nombre dérivé, tangente, fonction dérivée, dérivées usuelles (y compris cos, sin, tan), opérations, f(ax + b) ; signe de la dérivée et variations, extremum.",
      couverture: "complete",
      micros: [
        ...m("premiere-spe", "der_nombre_derive", "der_graphique", "der_tangente", "der_usuelles", "der_operations", "der_quotient", "der_composee_affine", "var_signe_derivee", "var_extremum", "tan_identite_derivee"),
        ...m("terminale-spe", "trigo_etude_fonction"),
      ],
    },
    {
      code: "C1-L7", domaine: FONC,
      texte: "Étude et représentation d'une fonction : parité, périodicité, axe et centre de symétrie de la courbe, asymptotes (dont obliques), polynômes de degré ≤ 3, homographiques, ax + b + c/(dx + e), fonctions circulaires.",
      couverture: "partielle",
      micros: [...m("premiere-spe", "var_tableau", "var_lecture_courbe", "trig_parite", "trig_periodicite", "trig_courbes"), ...m("seconde", "fct_homographique"), ...m("terminale-spe", "asymptote_oblique", "symetrie_courbe")],
      note: "Reste l'étude complète des familles citées (degré ≤ 3, ax + b + c/(dx + e)), non portée par une micro dédiée.",
    },
    {
      code: "C1-L8", domaine: FONC,
      texte: "Suites numériques : formule explicite et récurrence, représentation graphique, suites arithmétiques et géométriques (terme général, raison, sommes), sens de variation.",
      couverture: "complete",
      micros: m("premiere-spe", "suite_registres", "suite_termes", "suite_recurrence", "suite_arithmetique", "suite_geometrique", "suite_sommes", "suite_somme_geo", "suite_variation"),
    },
    {
      code: "C2-L1", domaine: DONN,
      texte: "Statistique à une variable en classes (amplitudes égales ou non) : densité, classe modale, histogramme, polygones, courbes cumulatives, moyenne, médiane, quartiles, variance, écart type, écart interquartile.",
      couverture: "partielle",
      micros: [
        ...m("seconde", "stat_moyenne_ponderee", "stat_mediane_quartiles", "stat_ecart_interquartile", "stat_ecart_type", "stat_histogramme", "stat_polygone_cumule", "stat_mediane_estimee"),
        ...m("3e", "stat_classe_modale_centre"),
        ...m("4e", "stat_histogramme_lire"),
        ...m("premiere", "auto_stat_moyenne"),
      ],
      note: "Histogramme et courbes cumulatives couverts ; reste la densité (classes inégales).",
    },
    {
      code: "C2-L2", domaine: ALEA,
      texte: "Dénombrement : ensembles finis, cardinal de la réunion et du complémentaire, produit cartésien, p-uplets, arrangements, permutations, combinaisons (n!, Aₙᵖ, Cₙᵖ), arbres et tableaux.",
      couverture: "complete",
      micros: [
        ...m("terminale-spe", "denombrement_reconnaitre", "denombrement_produit_somme", "denombrement_arrangement_combinaison", "denombrement_coefficient_binomial"),
        ...m("premiere-spe", "log_couple"),
      ],
      note: "Chez nous en Terminale.",
    },
    {
      code: "C2-L3", domaine: ALEA,
      texte: "Probabilité sur un ensemble fini : vocabulaire, équiprobabilité, p(A ∪ B), p(Ā), cas favorables et cas possibles.",
      couverture: "complete",
      micros: m("seconde", "proba_vocabulaire", "proba_modele", "proba_calculer", "proba_evenement_contraire", "proba_reunion_intersection", "proba_formule_union"),
    },
    {
      code: "C3-L1", domaine: GPLAN,
      texte: "Barycentre de 2 ou 3 points pondérés : existence, isobarycentre, homogénéité, barycentres partiels, réduction de aMA + bMB (+ cMC), coordonnées, alignement, concours, lieux.",
      couverture: "partielle",
      micros: m("premiere-spe", "barycentre_deux_points", "barycentre_coordonnees"),
      note: "Restent l'alignement, le concours et les lieux de points par le barycentre.",
    },
    {
      code: "C3-L2", domaine: GPLAN,
      texte: "Angles orientés et trigonométrie : Chasles, angle double, angles inscrits orientés, cocyclicité ; formules d'addition, de duplication, de linéarisation ; a cos x + b sin x ; équations et inéquations trigonométriques.",
      couverture: "partielle",
      micros: [
        ...m("premiere-spe", "trig_cercle", "trig_valeurs", "trig_angles_associes", "trig_grand_reel", "trig_formule_addition", "trig_formule_duplication", "trig_equation_generale", "angle_oriente_mesure_principale", "angle_oriente_chasles", "trig_equation_formes"),
        ...m("terminale-spe", "trigo_equation_cos", "trigo_inequation_cos"),
      ],
      note: "Manquent les angles inscrits orientés et la cocyclicité.",
    },
    {
      code: "C3-L3", domaine: GESP,
      texte: "Orthogonalité dans l'espace : droites orthogonales, droite orthogonale à un plan, plans perpendiculaires, projection orthogonale, distance d'un point à un plan.",
      couverture: "partielle",
      micros: [...m("terminale-spe", "ps_espace_orthogonalite", "ps_espace_norme_distance", "espace_position_relative"), ...m("seconde", "espace_orthogonalite_droite_plan")],
      note: "Approche sans coordonnées désormais couverte. Manquent la projection orthogonale sur un plan et la distance d'un point à un plan sans coordonnées.",
    },
    {
      code: "C3-L4", domaine: TRANS,
      texte: "Composées de transformations de même nature : deux translations, deux homothéties ou deux rotations de même centre ; expressions analytiques d'une translation et d'une homothétie.",
      couverture: "partielle",
      micros: m("seconde", "composee_symetries", "composee_homotheties"),
      note: "Deux translations, deux homothéties de même centre, expression analytique de l'homothétie et de la translation couvertes. Manquent deux rotations de même centre (seule sym_transformation_defi, 4e, les compose).",
    },
  ],
};

export const COTE_DIVOIRE_TLE: ProgrammePays = {
  pays: "cote-divoire",
  cle: "tle",
  niveau: "Terminale D",
  equivalentFrance: "terminale-spe",
  source: SOURCE,
  version: VERSION,
  contenus: [
    {
      code: "C1-L1", domaine: CALC,
      texte: "Nombres complexes : formes algébrique, trigonométrique, exponentielle ; conjugué, module, argument ; Moivre, Euler, linéarisation ; racines carrées, racines n-ièmes ; équations du second degré à coefficients complexes ; lieux géométriques.",
      couverture: "complete",
      micros: m("terminale-spe", "cx_forme_algebrique", "cx_conjugue_quotient", "cx_module_argument", "cx_forme_exponentielle", "cx_equation_second_degre", "cx_racines_nieme", "cx_geometrie"),
      note: "Équations à coefficients complexes en QCM seulement : pas de saisie d'une racine du discriminant complexe. Lieux : médiatrice et cercle.",
    },
    {
      code: "C1-L2", domaine: FONC,
      texte: "Limites et continuité : limite d'une composée, comparaison, branches paraboliques, image d'un intervalle, théorème des valeurs intermédiaires, bijection continue strictement monotone, dichotomie et balayage, racine n-ième et puissances d'exposant rationnel, prolongement par continuité.",
      couverture: "partielle",
      micros: m("terminale-spe", "limite_fonction_operations", "limite_fonction_reference", "continuite_reconnaitre", "tvi_appliquer", "tvi_unicite", "tvi_rediger", "reciproque_bijection", "expo_ratio_racine", "expo_ratio_calcul", "branches_infinies", "limite_gauche_droite"),
      note: "Manquent la limite d'une composée, la comparaison, l'image d'un intervalle, dichotomie et balayage. Le prolongement par continuité n'est pas une micro : seul le raccord d'une fonction par morceaux est travaillé.",
    },
    {
      code: "C1-L3", domaine: FONC,
      texte: "Dérivabilité et étude de fonctions : dérivée à gauche et à droite, dérivée d'une composée, dérivées successives, point d'inflexion, inégalité des accroissements finis, dérivée d'une réciproque ; études de fonctions rationnelles, irrationnelles, trigonométriques, par raccordement.",
      couverture: "partielle",
      micros: m("terminale-spe", "derivation_formules", "derivation_composee", "derivation_variation", "derivation_tangente", "convexite_derivee_seconde", "convexite_point_inflexion", "reciproque_derivee", "trigo_etude_fonction", "derivabilite_gauche_droite"),
      note: "Manque l'inégalité des accroissements finis ; les études par raccordement ne sont abordées que par le point anguleux.",
    },
    {
      code: "C1-L4", domaine: FONC,
      texte: "Primitives : définition, primitives usuelles, de u′ + v′, λu′, u′·(f∘u), u′/√u, u′cos u, u′sin u, u′uʳ ; primitive prenant une valeur donnée.",
      couverture: "partielle",
      micros: m("terminale-spe", "primitive_reconnaitre", "primitive_calculer", "trigo_primitives"),
      note: "Manquent les primitives de u′/√u, et de u′cos u, u′sin u quand u n'est pas affine.",
    },
    {
      code: "C1-L5", domaine: FONC,
      texte: "Fonctions logarithmes : ln (propriétés, dérivée, variations, courbe, limites), ln∘u et ln|u|, primitives de u′/u ; logarithme décimal et de base a ; équations xⁿ = k et qⁿ ≥ a.",
      couverture: "complete",
      micros: [
        ...m("terminale-spe", "ln_definition", "ln_proprietes", "ln_deriver", "ln_equation_inequation", "ln_limite", "primitive_calculer", "log_base_calcul", "log_base_proprietes"),
        ...m("stmg", "logT_definition", "logT_produit", "logT_resoudre_puissance"),
      ],
    },
    {
      code: "C1-L6", domaine: FONC,
      texte: "Fonctions exponentielles et puissances : exp (propriétés, dérivée, limites), exp∘u, primitives de u′eᵘ ; exponentielle de base a, puissance d'exposant réel ; croissances comparées.",
      couverture: "partielle",
      micros: [
        ...m("terminale-spe", "exp_definition", "exp_proprietes", "exp_deriver", "exp_equation_inequation", "exp_limite", "expo_ratio_regles", "primitive_calculer", "exp_base_a"),
        ...m("stmg", "expoT_reconnaitre", "expoT_sens_selon_a"),
      ],
      note: "Manque x^α pour α réel.",
    },
    {
      code: "C1-L7", domaine: FONC,
      texte: "Calcul intégral : intégrale, linéarité, Chasles, positivité, inégalité de la moyenne, valeur moyenne, intégration par parties, changement de variable affine, aire, x ↦ ∫ₐˣ f(t) dt.",
      couverture: "partielle",
      micros: m("terminale-spe", "integrale_calculer", "integrale_aire", "integrale_valeur_moyenne", "integrale_ipp_choisir", "integrale_ipp_calculer", "integrale_ipp_primitive", "integrale_proprietes", "integrale_encadrer"),
      note: "Intégration par parties et encadrement couverts ; manquent le changement de variable et les fonctions définies par une intégrale.",
    },
    {
      code: "C1-L8", domaine: FONC,
      texte: "Suites numériques : majorée, minorée, bornée, convergente ; suites monotones ; suites récurrentes uₙ₊₁ = f(uₙ) ; comparaison ; raisonnement par récurrence ; seuils ; suites arithmético-géométriques.",
      couverture: "complete",
      micros: [
        ...m("terminale-spe", "suite_recurrence_preuve", "suite_bornee", "suite_variation", "limite_suite_calculer", "limite_suite_operations", "limite_suite_comparaison", "limite_suite_monotone_bornee", "python_seuil"),
        ...m("premiere-spe", "suite_auxiliaire"),
      ],
    },
    {
      code: "C1-L9", domaine: FONC,
      texte: "Équations différentielles : f′ + af = 0, f′ + af = b, f″ = 0, f″ + ω²f = 0, f″ − ω²f = 0 ; conditions initiales.",
      couverture: "complete",
      micros: m("terminale-spe", "equadiff_reconnaitre", "equadiff_y_prime_ay", "equadiff_y_prime_ay_b", "equadiff_condition_initiale", "equadiff_second_ordre", "equadiff_second_ordre_conditions"),
    },
    {
      code: "C2-L1", domaine: DONN,
      texte: "Statistique à deux variables : séries marginales, nuage de points, point moyen, covariance, coefficient de corrélation linéaire, droite de régression par les moindres carrés.",
      couverture: "complete",
      micros: [
        ...m("premiere", "info_nuage_lire", "info_nuage_construire", "info_point_moyen_calculer", "info_ajust_determiner", "info_ajust_equation"),
        ...m("stmg", "statT_mc_principe", "stat_covariance", "stat_correlation_r", "stat_regression_formules"),
      ],
    },
    {
      code: "C2-L2", domaine: ALEA,
      texte: "Probabilité conditionnelle et variable aléatoire : probabilité conditionnelle, indépendance, système complet, probabilités totales, arbre pondéré ; loi, fonction de répartition, espérance, variance, écart type ; schéma de Bernoulli et loi binomiale.",
      couverture: "partielle",
      micros: [
        ...m("terminale-spe", "proba_conditionnelle_arbre", "proba_conditionnelle_formule", "proba_totales", "va_loi_probabilite", "va_esperance", "va_variance_ecart_type", "va_somme", "binomiale_schema", "binomiale_calculer", "binomiale_esperance_variance"),
        ...m("premiere-spe", "pc_independance", "pc_partition"),
      ],
      note: "La fonction de répartition n'a pas de micro.",
    },
    {
      code: "C3-L1", domaine: GPLAN,
      texte: "Nombres complexes et géométrie du plan : écriture complexe d'une translation, symétrie, homothétie, rotation, similitude directe ; éléments caractéristiques ; caractérisations complexes (alignement, cocyclicité, triangles particuliers) ; lieux.",
      couverture: "partielle",
      micros: m("terminale-spe", "cx_geometrie", "cx_transformations", "similitude_directe"),
      note: "La symétrie axiale n'est traitée que pour z' = z̄ (axe des réels) : pas de réflexion d'axe quelconque.",
    },
  ],
};
