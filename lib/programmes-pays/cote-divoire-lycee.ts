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
        ...m("seconde", "devfac_factoriser_identite", "signes_produit"),
      ],
      note: "Manquent la division euclidienne de polynômes, les coefficients indéterminés et les fractions rationnelles.",
    },
    {
      code: "C1-L3", domaine: CALC,
      texte: "Équations et inéquations dans ℝ : équations équivalentes, ensemble de validité ; membres polynômes ou fractions rationnelles ; équations et inéquations avec valeur absolue.",
      couverture: "partielle",
      micros: m("seconde", "equation_resoudre", "inequation_resoudre", "signes_quotient", "signes_resoudre_equation", "signes_resoudre_inequation"),
      note: "Pas de micro « équation ou inéquation avec valeur absolue ».",
    },
    {
      code: "C1-L4", domaine: CALC,
      texte: "Inéquations dans ℝ × ℝ : interprétation graphique (demi-plans), systèmes d'inéquations du premier degré, programmation linéaire.",
      couverture: "absente",
      micros: [],
      note: "Trou : demi-plans et programmation linéaire (vu aussi au Québec CST 5 et au Maroc).",
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
      couverture: "partielle",
      micros: m("seconde", "reference_carre", "reference_cube", "reference_inverse", "reference_racine", "reference_valeur_absolue", "reference_comparer"),
      note: "Manquent la partie entière et les fonctions affines par intervalles.",
    },
    {
      code: "C2-L1", domaine: DONN,
      texte: "Statistique à une variable : classes de même amplitude, classe modale, effectifs et fréquences cumulés croissants et décroissants, polygones, médiane par lecture graphique, moyenne, écart moyen, variance, écart type.",
      couverture: "partielle",
      micros: m("seconde", "stat_moyenne", "stat_mediane_quartiles", "stat_frequence", "stat_ecart_type", "stat_interpreter"),
      note: "Manquent les séries en classes, les polygones des effectifs cumulés et l'écart moyen.",
    },
    {
      code: "C3-L1", domaine: GPLAN,
      texte: "Vecteurs et points du plan : combinaison linéaire, base, colinéarité, norme, base orthonormée, mesure algébrique, déterminant de deux vecteurs ; équation cartésienne de droite, alignement et parallélisme par le déterminant.",
      couverture: "complete",
      micros: m("seconde", "vecteur_coordonnees", "vecteur_norme", "vecteur_produit_reel", "vecteur_colinearite", "vecteur_chasles_calcul", "droite_vecteur_directeur", "droite_equation_cartesienne", "droite_parallelisme"),
    },
    {
      code: "C3-L2", domaine: GPLAN,
      texte: "Produit scalaire : définition, carré scalaire, interprétation géométrique (projeté), règles de calcul, expression en base orthonormée, orthogonalité, Al Kashi, relations métriques du triangle rectangle, angle de deux vecteurs, cercle de diamètre donné.",
      couverture: "complete",
      micros: m("premiere-spe", "ps_projection", "ps_norme_angle", "ps_coordonnees", "ps_proprietes", "ps_orthogonalite", "ps_alkashi", "ps_angle_longueur", "ps_ma_mb", "gr_cercle"),
      note: "Chez nous en 1re spécialité.",
    },
    {
      code: "C3-L3", domaine: GPLAN,
      texte: "Angles inscrits : angle au centre, angle inscrit défini par une corde et une demi-tangente, arc capable ; aire d'un triangle (½ ab sin C), théorème des sinus.",
      couverture: "absente",
      micros: [],
      note: "Trou : angles inscrits et loi des sinus (déjà en 3e ivoirienne).",
    },
    {
      code: "C3-L4", domaine: GPLAN,
      texte: "Angles orientés et trigonométrie : radian, conversions, angle orienté et mesure principale, cercle trigonométrique, cosinus, sinus, tangente, angles opposés.",
      couverture: "partielle",
      micros: m("premiere-spe", "trig_radian", "trig_enroulement", "trig_cercle", "trig_cos_sin", "trig_valeurs", "trig_angles_associes"),
      note: "Manquent l'angle orienté de deux vecteurs et sa mesure principale, et la tangente.",
    },
    {
      code: "C3-L5", domaine: GESP,
      texte: "Droites et plans de l'espace : positions relatives (droites, droite et plan, plans), détermination d'un plan, parallélisme, coplanarité, section plane d'un solide.",
      couverture: "partielle",
      micros: [
        ...m("terminale-spe", "espace_position_relative"),
        ...m("3e", "section_reconnaitre", "section_pave_cube"),
      ],
      note: "Pas de micro « démontrer un parallélisme dans l'espace » (théorème du toit, etc.).",
    },
    {
      code: "C3-L6", domaine: TRANS,
      texte: "Utilisation des symétries et translations : propriété caractéristique de la translation, constructions, démonstrations, lieux de points.",
      couverture: "complete",
      micros: [
        ...m("4e", "sym_axiale", "sym_centrale", "sym_translation", "sym_transformation_propriete"),
        ...m("3e", "sym_symetrie_translation_rotation"),
      ],
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
      couverture: "partielle",
      micros: m("seconde", "droite_systeme"),
      note: "Manquent le déterminant d'un système et les systèmes 3 × 3 (pivot de Gauss).",
    },
    {
      code: "C1-L3", domaine: FONC,
      texte: "Généralités sur les fonctions : restriction, application injective, surjective, bijective et réciproque, comparaison de fonctions, somme, produit, quotient, composée ; fonctions associées f(x − a) + b, f(−x), −f(x), |f(x)| et leurs courbes (translations, symétries).",
      couverture: "absente",
      micros: [],
      note: "Trou : bijections, composée et courbes des fonctions associées.",
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
      couverture: "partielle",
      micros: m("premiere-spe", "der_nombre_derive", "der_graphique", "der_tangente", "der_usuelles", "der_operations", "der_quotient", "der_composee_affine", "var_signe_derivee", "var_extremum"),
      note: "La dérivée de tan n'a pas de micro.",
    },
    {
      code: "C1-L7", domaine: FONC,
      texte: "Étude et représentation d'une fonction : parité, périodicité, axe et centre de symétrie de la courbe, asymptotes (dont obliques), polynômes de degré ≤ 3, homographiques, ax + b + c/(dx + e), fonctions circulaires.",
      couverture: "partielle",
      micros: m("premiere-spe", "var_tableau", "var_lecture_courbe", "trig_parite", "trig_periodicite", "trig_courbes"),
      note: "Manquent axe / centre de symétrie d'une courbe et asymptote oblique.",
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
      micros: m("seconde", "stat_moyenne_ponderee", "stat_mediane_quartiles", "stat_ecart_interquartile", "stat_ecart_type"),
      note: "Manquent histogramme, densité de classe et courbes cumulatives.",
    },
    {
      code: "C2-L2", domaine: ALEA,
      texte: "Dénombrement : ensembles finis, cardinal de la réunion et du complémentaire, produit cartésien, p-uplets, arrangements, permutations, combinaisons (n!, Aₙᵖ, Cₙᵖ), arbres et tableaux.",
      couverture: "complete",
      micros: m("terminale-spe", "denombrement_reconnaitre", "denombrement_produit_somme", "denombrement_arrangement_combinaison", "denombrement_coefficient_binomial"),
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
      couverture: "absente",
      micros: [],
      note: "Trou : barycentre (vu aussi au Maroc et au Sénégal).",
    },
    {
      code: "C3-L2", domaine: GPLAN,
      texte: "Angles orientés et trigonométrie : Chasles, angle double, angles inscrits orientés, cocyclicité ; formules d'addition, de duplication, de linéarisation ; a cos x + b sin x ; équations et inéquations trigonométriques.",
      couverture: "partielle",
      micros: m("premiere-spe", "trig_cercle", "trig_valeurs", "trig_angles_associes", "trig_grand_reel"),
      note: "Manquent les formules d'addition et de duplication et les équations trigonométriques.",
    },
    {
      code: "C3-L3", domaine: GESP,
      texte: "Orthogonalité dans l'espace : droites orthogonales, droite orthogonale à un plan, plans perpendiculaires, projection orthogonale, distance d'un point à un plan.",
      couverture: "partielle",
      micros: m("terminale-spe", "ps_espace_orthogonalite", "ps_espace_norme_distance", "espace_position_relative"),
      note: "Approche géométrique (sans coordonnées) : nos micros sont analytiques.",
    },
    {
      code: "C3-L4", domaine: TRANS,
      texte: "Composées de transformations de même nature : deux translations, deux homothéties ou deux rotations de même centre ; expressions analytiques d'une translation et d'une homothétie.",
      couverture: "absente",
      micros: [],
      note: "Trou : composées de transformations (vu aussi au Sénégal).",
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
      couverture: "absente",
      micros: [],
      note: "Trou majeur : les nombres complexes (en France : maths expertes).",
    },
    {
      code: "C1-L2", domaine: FONC,
      texte: "Limites et continuité : limite d'une composée, comparaison, branches paraboliques, image d'un intervalle, théorème des valeurs intermédiaires, bijection continue strictement monotone, dichotomie et balayage, racine n-ième et puissances d'exposant rationnel, prolongement par continuité.",
      couverture: "partielle",
      micros: m("terminale-spe", "limite_fonction_operations", "limite_fonction_reference", "continuite_reconnaitre", "tvi_appliquer", "tvi_unicite", "tvi_rediger"),
      note: "Manquent bijection réciproque, racine n-ième, branches paraboliques, prolongement par continuité.",
    },
    {
      code: "C1-L3", domaine: FONC,
      texte: "Dérivabilité et étude de fonctions : dérivée à gauche et à droite, dérivée d'une composée, dérivées successives, point d'inflexion, inégalité des accroissements finis, dérivée d'une réciproque ; études de fonctions rationnelles, irrationnelles, trigonométriques, par raccordement.",
      couverture: "partielle",
      micros: m("terminale-spe", "derivation_formules", "derivation_composee", "derivation_variation", "derivation_tangente", "convexite_derivee_seconde", "convexite_point_inflexion"),
      note: "Manquent accroissements finis, dérivée d'une réciproque et dérivabilité à gauche / à droite.",
    },
    {
      code: "C1-L4", domaine: FONC,
      texte: "Primitives : définition, primitives usuelles, de u′ + v′, λu′, u′·(f∘u), u′/√u, u′cos u, u′sin u, u′uʳ ; primitive prenant une valeur donnée.",
      couverture: "complete",
      micros: m("terminale-spe", "primitive_reconnaitre", "primitive_calculer"),
    },
    {
      code: "C1-L5", domaine: FONC,
      texte: "Fonctions logarithmes : ln (propriétés, dérivée, variations, courbe, limites), ln∘u et ln|u|, primitives de u′/u ; logarithme décimal et de base a ; équations xⁿ = k et qⁿ ≥ a.",
      couverture: "partielle",
      micros: m("terminale-spe", "ln_definition", "ln_proprietes", "ln_deriver", "ln_equation_inequation", "ln_limite"),
      note: "Manquent le logarithme décimal et le logarithme de base a.",
    },
    {
      code: "C1-L6", domaine: FONC,
      texte: "Fonctions exponentielles et puissances : exp (propriétés, dérivée, limites), exp∘u, primitives de u′eᵘ ; exponentielle de base a, puissance d'exposant réel ; croissances comparées.",
      couverture: "partielle",
      micros: m("terminale-spe", "exp_definition", "exp_proprietes", "exp_deriver", "exp_equation_inequation", "exp_limite"),
      note: "Manquent aˣ et x^α pour α réel.",
    },
    {
      code: "C1-L7", domaine: FONC,
      texte: "Calcul intégral : intégrale, linéarité, Chasles, positivité, inégalité de la moyenne, valeur moyenne, intégration par parties, changement de variable affine, aire, x ↦ ∫ₐˣ f(t) dt.",
      couverture: "partielle",
      micros: m("terminale-spe", "integrale_calculer", "integrale_aire", "integrale_valeur_moyenne"),
      note: "Manquent intégration par parties, encadrement d'une intégrale et fonctions définies par une intégrale.",
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
      couverture: "partielle",
      micros: m("terminale-spe", "equadiff_reconnaitre", "equadiff_y_prime_ay", "equadiff_y_prime_ay_b", "equadiff_condition_initiale"),
      note: "Les équations du second ordre (f″ ± ω²f = 0) n'ont pas de micro.",
    },
    {
      code: "C2-L1", domaine: DONN,
      texte: "Statistique à deux variables : séries marginales, nuage de points, point moyen, covariance, coefficient de corrélation linéaire, droite de régression par les moindres carrés.",
      couverture: "partielle",
      micros: m("premiere", "info_nuage_lire", "info_nuage_construire", "info_ajust_determiner", "info_ajust_equation"),
      note: "Manquent covariance, coefficient de corrélation et formules des moindres carrés.",
    },
    {
      code: "C2-L2", domaine: ALEA,
      texte: "Probabilité conditionnelle et variable aléatoire : probabilité conditionnelle, indépendance, système complet, probabilités totales, arbre pondéré ; loi, fonction de répartition, espérance, variance, écart type ; schéma de Bernoulli et loi binomiale.",
      couverture: "partielle",
      micros: m("terminale-spe", "proba_conditionnelle_arbre", "proba_conditionnelle_formule", "proba_totales", "va_loi_probabilite", "va_esperance", "va_variance_ecart_type", "binomiale_schema", "binomiale_calculer", "binomiale_esperance_variance"),
      note: "La fonction de répartition n'a pas de micro.",
    },
    {
      code: "C3-L1", domaine: GPLAN,
      texte: "Nombres complexes et géométrie du plan : écriture complexe d'une translation, symétrie, homothétie, rotation, similitude directe ; éléments caractéristiques ; caractérisations complexes (alignement, cocyclicité, triangles particuliers) ; lieux.",
      couverture: "absente",
      micros: [],
      note: "Trou : complexes et similitudes directes.",
    },
  ],
};
