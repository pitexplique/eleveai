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
      micros: m("seconde", "vecteur_somme", "vecteur_chasles_calcul", "vecteur_produit_reel", "vecteur_point_defini", "vecteur_colinearite"),
    },
    {
      code: "AG 2", domaine: "Géométrie plane",
      texte: "Barycentre de deux ou trois points pondérés : définition, propriétés (homogénéité, associativité), construction, réduction de αMA + βMB + γMC.",
      couverture: "absente",
      micros: [],
      note: "Le barycentre a quitté le programme français : micros à écrire (construire G, réduire αMA + βMB).",
    },
    {
      code: "AG 3", domaine: "Géométrie plane",
      texte: "Repérage cartésien : abscisse et mesure algébrique, repère quelconque, coordonnées du barycentre, changement de repère par translation ; déterminant et colinéarité ; équations de droites (vecteur directeur, équation générale et réduite, équations paramétriques).",
      couverture: "partielle",
      micros: m("seconde", "repere_coordonnees_point", "repere_milieu", "vecteur_coordonnees", "vecteur_colinearite", "droite_vecteur_directeur", "droite_equation_cartesienne", "droite_equation_reduite", "droite_pente_ordonne", "droite_parallelisme"),
      note: "Manquent les équations PARAMÉTRIQUES d'une droite du plan, la mesure algébrique et le changement de repère par translation.",
    },
    {
      code: "AG 4", domaine: "Géométrie plane",
      texte: "Angles : longueur d'un arc, radian, conversion degrés-radians ; angle inscrit, angle au centre, quadrilatères inscriptibles ; orientation du plan, angle orienté de deux demi-droites ou de deux vecteurs, mesure principale.",
      couverture: "partielle",
      micros: m("premiere-spe", "trig_radian", "trig_arc", "trig_enroulement", "trig_grand_reel"),
      note: "Manquent les angles inscrits et les quadrilatères inscriptibles (retirés en France), et les angles ORIENTÉS de vecteurs.",
    },
    {
      code: "AG 5", domaine: "Géométrie plane",
      texte: "Lignes trigonométriques : cercle trigonométrique, cosinus, sinus et tangente d'un angle orienté ; cos²x + sin²x = 1 ; angles complémentaires, opposés, supplémentaires ; signe dans les quatre quadrants.",
      couverture: "partielle",
      micros: [
        ...m("premiere-spe", "trig_cercle", "trig_cos_sin", "trig_valeurs", "trig_angles_associes"),
        ...m("seconde", "geo_trig_identite"),
      ],
      note: "La TANGENTE d'un angle orienté (tan x = sin x ÷ cos x sur le cercle) n'a pas de micro.",
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
      couverture: "partielle",
      micros: [
        ...m("3e", "pythagore_calculer_hypotenuse", "pythagore_calculer_cote"),
        ...m("seconde", "geo_projete_orthogonal"),
      ],
      note: "Seul Pythagore est travaillé : les relations avec le pied de la hauteur (AH² = HB·HC…) n'ont pas de micro.",
    },
    {
      code: "AG 9", domaine: "Géométrie plane",
      texte: "Transformations : translation, symétries, homothétie (Thalès vectoriel), rotation ; composées (homothéties de même centre, homothétie et translation, symétries) ; expression analytique ; lieux géométriques ; bijection.",
      couverture: "partielle",
      micros: [
        ...m("3e", "sym_homothetie_reconnaitre", "sym_homothetie_construire", "sym_homothetie_rapport", "sym_symetrie_translation_rotation", "sym_transformation_effet"),
        ...m("4e", "sym_translation", "sym_rotation"),
      ],
      note: "Manquent la COMPOSÉE de deux transformations, leur expression analytique et les lieux géométriques.",
    },
    {
      code: "AG 10", domaine: "Géométrie dans l'espace",
      texte: "Perspective cavalière ; positions relatives de droites et de plans ; sections de prismes et de pyramides par un plan ; orthogonalité dans l'espace (droite et plan, plans perpendiculaires, droites orthogonales).",
      couverture: "partielle",
      micros: [
        ...m("3e", "volume_representation", "section_pave_cube", "section_cone_pyramide"),
        ...m("terminale-spe", "espace_position_relative"),
      ],
      note: "L'orthogonalité dans l'espace, démontrée sans vecteurs (droite orthogonale à deux droites sécantes d'un plan), n'a pas de micro.",
    },

    {
      code: "AN 1", domaine: "Activités numériques",
      texte: "Calcul dans ℝ : puissances, radicaux (√(a²b) = |a|√b), valeur absolue, distance sur une droite ; résoudre |ax + b| = |cx + d|, |x − a| ≤ b.",
      couverture: "complete",
      micros: m("seconde", "puiss_calcul", "puiss_produit_quotient", "racine_carre_de_a2", "racine_produit", "racine_simplification", "valeur_absolue_distance", "reference_valeur_absolue"),
    },
    {
      code: "AN 2", domaine: "Activités numériques",
      texte: "Intervalles et calcul approché : intervalles bornés ou non, centre et rayon ; approximation décimale, encadrement d'une somme et d'un produit, ordre de grandeur, partie entière, arrondi.",
      couverture: "partielle",
      micros: [
        ...m("seconde", "reels_ensembles", "intervalle_representer", "intervalle_appartenance", "reels_encadrement"),
        ...m("6e", "decimal_arrondir"),
        ...m("4e", "ordre_estimer"),
      ],
      note: "Manquent le centre et le rayon d'un intervalle, l'encadrement d'une somme ou d'un produit, la partie entière.",
    },
    {
      code: "AN 3", domaine: "Activités numériques",
      texte: "Fonctions, généralités : définition, ensemble de définition, restriction, sens de variation, taux de variation, extremum, parité, composée de deux fonctions, représentation graphique et changement d'origine.",
      couverture: "partielle",
      micros: [
        ...m("seconde", "fonction_vocabulaire", "fonction_domaine", "fonction_image_formule", "fonction_antecedent", "fonction_tableau_graphique", "fonction_resolution_graphique", "variation_tableau", "variation_croissance", "variation_extremum"),
        ...m("premiere-spe", "der_taux"),
      ],
      note: "Manquent la PARITÉ (lien avec la symétrie de la courbe), la COMPOSÉE f ∘ g et le changement d'origine.",
    },
    {
      code: "AN 4", domaine: "Activités numériques",
      texte: "Étude de fonctions : partie entière, x ↦ ax², x ↦ ax² + bx + c, cube, inverse, x ↦ k/x, homographiques x ↦ (ax + b)/(cx + d), racine carrée ; asymptotes parallèles aux axes (intuitif).",
      couverture: "partielle",
      micros: [
        ...m("seconde", "reference_carre", "reference_cube", "reference_inverse", "reference_racine", "reference_comparer"),
        ...m("premiere-spe", "sd_canonique", "var_second_degre"),
      ],
      note: "Manquent la fonction partie entière et les fonctions HOMOGRAPHIQUES avec leurs asymptotes.",
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
      micros: m("seconde", "droite_systeme", "droite_intersection"),
      note: "Manquent la méthode de Cramer (déterminant), le régionnement du plan et la programmation linéaire.",
    },
    {
      code: "AN 7", domaine: "Activités numériques",
      texte: "Polynômes (degré ≤ 4) et fractions rationnelles : zéro, factorisation par (x − a) (identification, Horner, division euclidienne), signe ; condition d'existence, simplification, zéros et signe d'une fraction rationnelle.",
      couverture: "partielle",
      micros: [
        ...m("seconde", "signes_premier_degre", "signes_produit", "signes_quotient", "fonction_domaine"),
        ...m("premiere-spe", "sd_factorisation"),
      ],
      note: "Manquent la factorisation d'un polynôme de degré 3 ou 4 par (x − a), la méthode de Horner et la division euclidienne.",
    },
    {
      code: "AN 8", domaine: "Activités numériques",
      texte: "Raisonnement : syllogisme, contraposée, raisonnement par l'absurde, symboles de l'implication et de l'équivalence.",
      couverture: "complete",
      micros: [
        ...m("seconde", "logique_connecteurs", "logique_implication_reciproque", "logique_negation_contre_exemple"),
        ...m("premiere-spe", "log_raisonnements", "log_equivalence"),
      ],
    },

    {
      code: "ST 1", domaine: "Statistique",
      texte: "Statistique descriptive : diagrammes cumulatifs, histogramme, mode, classe modale, moyenne, médiane, quartiles (graphiquement et par le calcul) ; variance, écart-type, interprétation.",
      couverture: "partielle",
      micros: m("seconde", "stat_lire_serie", "stat_frequence", "stat_moyenne_ponderee", "stat_mediane_quartiles", "stat_ecart_interquartile", "stat_ecart_type", "stat_interpreter"),
      note: "Manquent les séries en classes : histogramme, polygone des effectifs cumulés, quartiles lus sur la courbe.",
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
      couverture: "absente",
      micros: [],
      note: "Micros à écrire : tracer |f| et f(|x|) à partir de la courbe de f, démontrer un centre de symétrie (f(a + x) + f(a − x) = 2b).",
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
      micros: m("terminale-spe", "continuite_reconnaitre", "tvi_unicite"),
      note: "Manque la preuve de la continuité en un point par les limites (fonctions définies par morceaux, à droite et à gauche).",
    },
    {
      code: "AN 4", domaine: "Analyse",
      texte: "Dérivation : nombre dérivé, à gauche et à droite, demi-tangentes et point anguleux, tangente, approximation affine, dérivées usuelles, somme, produit, quotient, x ↦ f(ax + b).",
      couverture: "complete",
      micros: m("premiere-spe", "der_taux", "der_nombre_derive", "der_definition", "der_tangente", "der_valeur_absolue", "der_usuelles", "der_operations", "der_quotient", "der_composee_affine"),
    },
    {
      code: "AN 5", domaine: "Analyse",
      texte: "Dérivée et sens de variation : dérivée nulle, positive, négative ; extremum quand f' s'annule en changeant de signe ; problèmes d'optimisation ; dérivée et bijection.",
      couverture: "complete",
      micros: [
        ...m("premiere-spe", "var_constante", "var_signe_derivee", "var_tableau", "var_extremum", "var_optimisation"),
        ...m("terminale-spe", "tvi_unicite"),
      ],
    },
    {
      code: "AN 6", domaine: "Analyse",
      texte: "Étude de fonctions : polynômes de degré ≤ 3, rationnelles (asymptotes obliques), irrationnelles, sinus, cosinus, tangente (périodicité, composées avec une affine) ; résolution graphique de f(x) = g(x), f(x) > g(x), discussion de f(x) = m.",
      couverture: "partielle",
      micros: [
        ...m("premiere-spe", "var_tableau", "var_position_relative", "graph1s_resoudre_equation", "graph1s_resoudre_inequation", "trig_courbes", "trig_periodicite"),
        ...m("terminale-spe", "limite_fonction_asymptote"),
      ],
      note: "Manquent les ASYMPTOTES OBLIQUES, l'étude des fonctions irrationnelles et la discussion graphique d'une équation f(x) = m.",
    },
    {
      code: "AN 7", domaine: "Analyse",
      texte: "Suites : définition, sens de variation, suites bornées, périodiques, raisonnement par récurrence, représentation graphique ; suites arithmétiques et géométriques, somme de p termes ; convergence (approche intuitive).",
      couverture: "complete",
      micros: [
        ...m("premiere-spe", "suite_termes", "suite_recurrence", "suite_variation", "suite_arithmetique", "suite_geometrique", "suite_sommes", "suite_somme_geo", "suite_limite"),
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
      micros: m("premiere", "info_tab_frequence_marginale", "info_tab_frequence_conditionnelle", "info_nuage_construire", "info_point_moyen_calculer", "info_point_moyen_droite", "info_ajust_determiner", "info_ajust_equation"),
      note: "Renvois à l'enseignement scientifique de 1re (tronc commun). La méthode de MAYER (deux sous-nuages, deux points moyens) n'a pas de micro propre.",
    },

    {
      code: "AL 1", domaine: "Algèbre",
      texte: "Applications : image directe, image réciproque, applications injectives, surjectives, bijectives, application réciproque, restriction.",
      couverture: "absente",
      micros: [],
      note: "Ce vocabulaire n'est plus enseigné au lycée en France : micros à écrire.",
    },
    {
      code: "AL 2", domaine: "Algèbre",
      texte: "Équations et inéquations : irrationnelles (√f(x) = ax + b, √f(x) ≤ g(x)), bicarrées, avec un paramètre réel, se ramenant au second degré.",
      couverture: "partielle",
      micros: m("premiere-spe", "sd_discriminant", "sd_racines", "sd_inequation", "sd_forme_adaptee"),
      note: "Manquent les équations IRRATIONNELLES (élever au carré, vérifier), les bicarrées (poser X = x²) et la discussion selon un paramètre.",
    },
    {
      code: "AL 3", domaine: "Algèbre",
      texte: "Systèmes d'équations linéaires dans ℝ³ (méthode du pivot de Gauss) ; systèmes d'inéquations, programmation linéaire.",
      couverture: "absente",
      micros: [],
      note: "Ni le pivot de Gauss ni la programmation linéaire ne sont dans le coach : micros à écrire.",
    },

    {
      code: "GE 1", domaine: "Géométrie",
      texte: "Outil vectoriel : vecteurs du plan et de l'espace, décomposition d'un vecteur de l'espace ; barycentre de quatre points pondérés, coordonnées, centre d'inertie d'une plaque homogène.",
      couverture: "partielle",
      micros: m("terminale-spe", "espace_vecteurs", "espace_repere_coordonnees"),
      note: "Manque tout le BARYCENTRE (et le centre d'inertie), retiré du programme français.",
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
      couverture: "partielle",
      micros: m("premiere-spe", "trig_grand_reel", "trig_valeurs", "trig_angles_associes", "trig_cercle"),
      note: "Manquent les angles ORIENTÉS, les formules d'addition et de duplication, et les équations et inéquations trigonométriques.",
    },
    {
      code: "GE 4", domaine: "Géométrie",
      texte: "Transformations : composée de deux transformations planes (rotations de même centre, symétries orthogonales, homothétie et rotation de même centre), expression analytique, isométries ayant un point invariant.",
      couverture: "absente",
      micros: [],
      note: "Le coach s'arrête aux transformations de 3e : composées et expressions analytiques à écrire.",
    },
    {
      code: "GE 5", domaine: "Géométrie",
      texte: "Géométrie dans l'espace : plan médiateur, sections planes (sphère, prisme, pyramide), distances, angles, aires et volumes ; produit vectoriel (coordonnées, propriétés).",
      couverture: "partielle",
      micros: m("3e", "section_pave_cube", "section_cone_pyramide", "section_calculer_longueur", "volume_boule"),
      note: "Manquent le plan médiateur et le PRODUIT VECTORIEL (absent du lycée français).",
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
      micros: m("terminale-spe", "continuite_reconnaitre", "tvi_appliquer", "tvi_unicite", "tvi_rediger", "python_seuil", "limite_fonction_operations", "limite_fonction_asymptote"),
      note: "Manquent la FONCTION RÉCIPROQUE (courbe symétrique par rapport à y = x, expression de f⁻¹) et les branches paraboliques.",
    },
    {
      code: "AN 2", domaine: "Analyse",
      texte: "Dérivées et primitives : dérivée d'une composée et d'une réciproque, dérivées successives, point d'inflexion ; primitives des fonctions usuelles, de (g' ∘ f)·f' et fⁿ·f' ; inégalité des accroissements finis.",
      couverture: "partielle",
      micros: m("terminale-spe", "derivation_formules", "derivation_composee", "convexite_derivee_seconde", "convexite_point_inflexion", "primitive_reconnaitre", "primitive_calculer"),
      note: "Manquent la dérivée de la RÉCIPROQUE et l'inégalité des accroissements finis.",
    },
    {
      code: "AN 3", domaine: "Analyse",
      texte: "Logarithme népérien : primitive de x ↦ 1/x qui s'annule en 1, propriétés algébriques, limites (dont ln(1 + x)/x en 0 et ln(x)/xᵃ en +∞), dérivée, courbe.",
      couverture: "complete",
      micros: m("terminale-spe", "ln_definition", "ln_proprietes", "ln_deriver", "ln_equation_inequation", "ln_limite"),
      note: "En France, ln est défini comme réciproque de exp : l'ordre est inverse, le contenu est le même. Le logarithme décimal n'a pas de micro.",
    },
    {
      code: "AN 4", domaine: "Analyse",
      texte: "Exponentielle : réciproque de ln, propriétés, limites (eˣ/xᵃ, xⁿeˣ, (eˣ − 1)/x), dérivée, primitives de (exp ∘ f)·f', courbe.",
      couverture: "complete",
      micros: m("terminale-spe", "exp_definition", "exp_proprietes", "exp_deriver", "exp_equation_inequation", "exp_limite"),
    },
    {
      code: "AN 5", domaine: "Analyse",
      texte: "Études de fonctions : polynômes, rationnelles, trigonométriques ; fonctions puissances x ↦ xᵃ (a entier ou rationnel).",
      couverture: "partielle",
      micros: m("terminale-spe", "derivation_variation", "derivation_optimisation", "limite_fonction_asymptote"),
      note: "Manquent les fonctions puissances à exposant RATIONNEL et l'étude complète des fonctions trigonométriques.",
    },
    {
      code: "AN 6", domaine: "Analyse",
      texte: "Suites : rappels sur les suites arithmétiques et géométriques ; suites récurrentes uₙ₊₁ = f(uₙ) avec f continue (représentation, sens de variation, limite solution de f(x) = x) ; convergence des suites monotones bornées.",
      couverture: "complete",
      micros: m("terminale-spe", "suite_explicite_recurrence", "suite_recurrence_preuve", "suite_variation", "suite_bornee", "limite_suite_monotone_bornee", "limite_suite_calculer", "limite_suite_defi"),
    },
    {
      code: "AN 7", domaine: "Analyse",
      texte: "Calcul intégral : intégrale d'une fonction continue, linéarité, Chasles, positivité, inégalité de la moyenne, intégration par parties ; aires planes, volumes V = ∫ S(z) dz et solides de révolution.",
      couverture: "partielle",
      micros: m("terminale-spe", "primitive_calculer", "integrale_calculer", "integrale_aire", "integrale_valeur_moyenne"),
      note: "Manquent l'INTÉGRATION PAR PARTIES (pourtant au programme français) et les calculs de VOLUMES.",
    },
    {
      code: "AN 8", domaine: "Analyse",
      texte: "Équations différentielles linéaires à coefficients constants : premier ordre et SECOND ordre, homogènes ou avec second membre, solution vérifiant des conditions initiales.",
      couverture: "partielle",
      micros: m("terminale-spe", "equadiff_reconnaitre", "equadiff_y_prime_ay", "equadiff_y_prime_ay_b", "equadiff_solution_particuliere", "equadiff_condition_initiale"),
      note: "Le SECOND ordre (y'' + ay' + by = 0, oscillations) n'est plus au programme français : micros à écrire.",
    },

    {
      code: "OD 1", domaine: "Organisation de données",
      texte: "Séries statistiques à deux variables : méthode des moindres carrés, coefficient de corrélation linéaire, droites de régression, prévisions.",
      couverture: "partielle",
      micros: m("premiere", "info_nuage_construire", "info_point_moyen_calculer", "info_ajust_equation", "info_ajust_interpoler", "info_ajust_extrapoler"),
      note: "Renvois à l'enseignement scientifique de 1re. Manquent le COEFFICIENT DE CORRÉLATION et les droites de régression par les moindres carrés.",
    },
    {
      code: "OD 2", domaine: "Organisation de données",
      texte: "Probabilités : vocabulaire, probabilité d'un événement, contraire, réunion, équiprobabilité ; probabilité conditionnelle, événements indépendants, formule des probabilités totales.",
      couverture: "complete",
      micros: [
        ...m("seconde", "proba_vocabulaire", "proba_calculer", "proba_evenement_contraire", "proba_formule_union"),
        ...m("premiere-spe", "pc_independance"),
        ...m("terminale-spe", "proba_conditionnelle_arbre", "proba_conditionnelle_formule", "proba_totales", "proba_inverse_bayes"),
      ],
    },
    {
      code: "OD 3", domaine: "Organisation de données",
      texte: "Variables aléatoires : loi, fonction de répartition F(x) = P(X ≤ x), espérance, variance, écart-type ; schéma de Bernoulli, loi binomiale.",
      couverture: "partielle",
      micros: m("terminale-spe", "va_definition", "va_loi_probabilite", "va_esperance", "va_variance_ecart_type", "binomiale_schema", "binomiale_reconnaitre", "binomiale_calculer", "binomiale_esperance_variance"),
      note: "La FONCTION DE RÉPARTITION (fonction en escalier, à tracer) n'a pas de micro.",
    },

    {
      code: "AG 1", domaine: "Algèbre et géométrie",
      texte: "Nombres complexes : forme algébrique, somme, produit, quotient, conjugué ; module, argument, forme trigonométrique, notation e^{iθ} ; affixe d'un point, d'un vecteur.",
      couverture: "absente",
      micros: [],
      note: "En France, les complexes sont en maths EXPERTES, que le coach ne couvre pas encore : micros à écrire.",
    },
    {
      code: "AG 2", domaine: "Algèbre et géométrie",
      texte: "Formules de Moivre et d'Euler, linéarisation, racines n-ièmes de l'unité et d'un complexe ; équations du second degré à coefficients complexes.",
      couverture: "absente",
      micros: [],
      note: "Maths expertes en France : micros à écrire.",
    },
    {
      code: "AG 3", domaine: "Algèbre et géométrie",
      texte: "Complexes et géométrie : alignement, longueurs, nature d'une configuration ; similitudes planes directes z ↦ az + b et leurs éléments caractéristiques.",
      couverture: "absente",
      micros: [],
      note: "Les similitudes ne sont plus enseignées en France : micros à écrire.",
    },
  ],
};
