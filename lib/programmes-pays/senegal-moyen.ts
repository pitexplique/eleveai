// Sénégal, enseignement MOYEN (6e, 5e, 4e, 3e ; le BFEM en fin de 3e).
// Source OFFICIELLE : « Programmes de mathématiques du premier cycle », année
// 2006, ministère de l'Éducation, Inspection générale de l'éducation nationale
// (programmes de 2000 « consolidés », écrits par objectifs, 5 h par semaine
// à chaque niveau). PDF archivé par le Bureau international d'éducation de
// l'UNESCO : https://www.ibe.unesco.org/curricula/senegal/sg_ls_mt_2006_fre.pdf
// Relevé le 25/10/2026 sur son TABLEAU SYNOPTIQUE (p. 6 à 13 : chaque thème,
// classe par classe). Les pages détaillées par classe (p. 15 à 100) n'ont pas
// pu être lues : le serveur ne renvoie que le début du fichier.
// Ordre et titres des chapitres : fascicules ADEM-Dakar (ministère de
// l'Éducation nationale et AFD, version 10.17, 2017), qui disent couvrir « tout
// le programme en vigueur » : https://apprendre.auf.org/wp-content/uploads/2021/08/fascicule_adem_math_6e.pdf
// (idem _5e, _4e, _3e). Une révision a été lancée en 2017 (rencontre nationale
// de juillet 2017), mais aucun nouveau programme n'a été publié en ligne.
// Langue : les mathématiques sont enseignées en FRANÇAIS à tous les niveaux.
// Le programme n'a pas de codes officiels : AN n = n-ième chapitre des
// « Activités numériques », AG n = des « Activités géométriques », dans l'ordre
// du fascicule ADEM. Pas de probabilités ni d'algorithmique au moyen.
// Les classes ont le nom et l'âge des nôtres, mais le programme va plus loin en
// géométrie analytique (vecteurs, équations de droites, systèmes en 3e : chez
// nous en seconde) et garde les angles inscrits, retirés en France.

import type { Classe } from "@/lib/tutor-v4/catalog";
import type { ProgrammePays, RenvoiMicro } from "./types";

const m = (classe: Classe, ...micros: string[]): RenvoiMicro[] =>
  micros.map((micro) => ({ classe, micro }));

const AN = "Activités numériques";
const AG = "Activités géométriques";

const SOURCE = "https://www.ibe.unesco.org/curricula/senegal/sg_ls_mt_2006_fre.pdf";
const VERSION = "programme du premier cycle 2006 (tableau synoptique), chapitres des fascicules ADEM-Dakar 2017";

export const SENEGAL_6E: ProgrammePays = {
  pays: "senegal",
  cle: "6e",
  niveau: "6e",
  equivalentFrance: "6e",
  source: SOURCE,
  version: VERSION,
  contenus: [
    {
      code: "AN 1", domaine: AN,
      texte: "Nombres décimaux arithmétiques : entiers naturels, chiffres, unités, dizaines, centaines ; partie entière, partie décimale ; ensembles ℕ et 𝔻 ; autres systèmes de numération.",
      couverture: "partielle",
      micros: m("6e", "entier_lire_ecrire", "entier_rang", "entier_decomposer", "decimal_lire_ecrire", "decimal_rang"),
      note: "Manquent les autres systèmes de numération (base 2, base 5, chiffres romains) et la notation des ensembles ℕ et 𝔻.",
    },
    {
      code: "AN 2", domaine: AN,
      texte: "Addition et soustraction de décimaux arithmétiques : termes, somme, commutativité, associativité ; égalités a + x = b.",
      couverture: "complete",
      micros: [
        ...m("6e", "decimal_additionner", "entier_addition_posee", "entier_soustraction_posee", "entier_addition_mentale", "entier_soustraction_mentale"),
        ...m("cm2", "algebre_completer_egalite"),
      ],
    },
    {
      code: "AN 3", domaine: AN,
      texte: "Rangement des décimaux arithmétiques : comparer, ranger, symboles, encadrement, ordre de grandeur d'un résultat.",
      couverture: "complete",
      micros: [
        ...m("6e", "entier_comparer", "entier_encadrer", "decimal_comparer", "decimal_encadrer", "decimal_arrondir"),
        ...m("4e", "ordre_estimer"),
      ],
    },
    {
      code: "AN 4", domaine: AN,
      texte: "Multiplication de décimaux arithmétiques : facteur, produit, distributivité ; multiplier par une fraction a/b.",
      couverture: "complete",
      micros: [
        ...m("6e", "decimal_multiplier", "decimal_multiplier_par_01", "entier_multiplication_posee", "entier_multiplication_mentale", "fraction_quantite", "fraction_multiplier_entier"),
        ...m("5e", "litteral_distributivite"),
      ],
    },
    {
      code: "AN 5", domaine: AN,
      texte: "Division des décimaux arithmétiques : quotient entier, quotient décimal, division par un décimal.",
      couverture: "partielle",
      micros: m("6e", "entier_division_posee", "entier_division_mentale", "decimal_diviser_par_entier"),
      note: "Pas de micro « diviser par un nombre décimal » (12,6 ÷ 0,3 : on multiplie les deux nombres par 10).",
    },
    {
      code: "AN 6", domaine: AN,
      texte: "Organisation d'un calcul : priorités des opérations, parenthèses, schémas, initiation au calcul littéral avec les aires et les volumes.",
      couverture: "complete",
      micros: [
        ...m("cm2", "calcul_priorite"),
        ...m("6e", "algebre_barres"),
        ...m("5e", "litteral_expression_comprendre", "litteral_substituer"),
      ],
    },
    {
      code: "AN 7", domaine: AN,
      texte: "Proportionnalité : nombres proportionnels, pourcentage.",
      couverture: "complete",
      micros: m("6e", "prop_reconnaitre", "prop_table", "prop_coeff", "prop_unite", "prop_direct", "pourcentage_comprendre", "pourcentage_calcul_simple"),
    },
    {
      code: "AN 8", domaine: AN,
      texte: "Nombres décimaux relatifs : ℤ et 𝔻, lecture, signe, opposé, comparaison.",
      couverture: "complete",
      micros: m("5e", "relatif_lire", "relatif_signe", "relatif_oppose", "relatif_comparer", "relatif_placer"),
    },
    {
      code: "AN 9", domaine: AN,
      texte: "Repérage sur la droite et dans le plan.",
      couverture: "complete",
      micros: [
        ...m("6e", "abscisse_lire", "abscisse_placer", "abscisse_graduer"),
        ...m("4e", "repere_plan"),
      ],
    },

    {
      code: "AG 1", domaine: AG,
      texte: "Introduction à la géométrie : plan, points, droites, demi-droites, segments, polygones, notations ; longueur, milieu d'un segment, périmètre, inégalité triangulaire.",
      couverture: "complete",
      micros: [
        ...m("cm2", "droite_reconnaitre"),
        ...m("6e", "distance_definition", "distance_milieu", "distance_inegalite", "aire_longueur_mesurer", "aire_perimetre_figure"),
      ],
    },
    {
      code: "AG 2", domaine: AG,
      texte: "Le cercle : centre, rayon, diamètre, disque, arc, corde, périmètre ; intérieur et extérieur ; cercles sécants, tangents, disjoints.",
      couverture: "partielle",
      micros: m("6e", "cercle_vocabulaire", "cercle_ensemble", "cercle_distance", "cercle_perimetre"),
      note: "Manque la position de deux cercles (sécants, tangents, disjoints) selon la distance des centres.",
    },
    {
      code: "AG 3", domaine: AG,
      texte: "Droites perpendiculaires et droites parallèles ; médiatrice d'un segment : définition, propriétés.",
      couverture: "complete",
      micros: [
        ...m("cm2", "droite_parallele", "droite_perpendiculaire", "droite_tracer"),
        ...m("6e", "mediatrice_definition", "mediatrice_propriete", "mediatrice_construire"),
      ],
    },
    {
      code: "AG 4", domaine: AG,
      texte: "Symétrie orthogonale par rapport à une droite : construction à la règle et au compas, images, axes de symétrie, conservation.",
      couverture: "complete",
      micros: m("6e", "sym_reconnaitre", "sym_point", "sym_figure", "sym_propriete", "sym_axe"),
    },
    {
      code: "AG 5", domaine: AG,
      texte: "Angles : vocabulaire, mesure au rapporteur (degré, grade), bissectrice, angles droits, plats, aigus, obtus, complémentaires, supplémentaires ; symétrique d'un angle.",
      couverture: "partielle",
      micros: [
        ...m("6e", "angle_reconnaitre", "angle_comparer", "angle_mesurer", "angle_tracer", "bissectrice_definition", "bissectrice_construire"),
        ...m("5e", "angle_paires"),
      ],
      note: "Le grade (100 grades = 1 angle droit) n'est pas dans le coach.",
    },
    {
      code: "AG 6", domaine: AG,
      texte: "Polygones : triangles (vocabulaire, droites remarquables, triangles particuliers et leurs axes de symétrie) ; parallélogramme, trapèze, rectangle, losange, carré : description, construction.",
      couverture: "partielle",
      micros: [
        ...m("6e", "triangle_nommer", "triangle_sommet_cote", "triangle_type_cote", "triangle_type_angle", "quadrilatere_nommer_vocabulaire", "quadrilatere_identifier_nature", "quadrilatere_lire_propriete"),
        ...m("4e", "triangle_droites"),
      ],
      note: "Les médianes d'un triangle (construction dès la 6e au Sénégal) n'ont pas de micro.",
    },
    {
      code: "AG 7", domaine: AG,
      texte: "Aires : rectangle, carré, triangle, parallélogramme ; unités d'aire.",
      couverture: "complete",
      micros: [
        ...m("6e", "aire_rectangle", "aire_carre", "aire_decomposer", "aire_convertir"),
        ...m("5e", "aire_triangle", "aire_parallelogramme"),
      ],
    },
    {
      code: "AG 8", domaine: AG,
      texte: "Géométrie dans l'espace : pavé droit, cube, cylindre, sphère et boule — patron, représentation plane, aire, volume.",
      couverture: "partielle",
      micros: [
        ...m("cm2", "solide_patron"),
        ...m("6e", "vision_vues", "vision_representation"),
        ...m("5e", "volume_pave", "volume_cylindre"),
        ...m("3e", "volume_boule"),
      ],
      note: "Manquent les AIRES des solides : aire latérale et totale du pavé et du cylindre, aire de la sphère (4πR²).",
    },
    {
      code: "AG 9", domaine: AG,
      texte: "Repérage sur la sphère : pôles, équateur, parallèles, méridiens, latitude, longitude.",
      couverture: "complete",
      micros: m("4e", "repere_terre"),
    },
  ],
};

export const SENEGAL_5E: ProgrammePays = {
  pays: "senegal",
  cle: "5e",
  niveau: "5e",
  equivalentFrance: "5e",
  source: SOURCE,
  version: VERSION,
  contenus: [
    {
      code: "AN 1", domaine: AN,
      texte: "Puissances dans 𝔻 : écriture, calcul, puissances de 10.",
      couverture: "complete",
      micros: m("4e", "puissance_comprendre", "puissance_calculer", "puissance_dix"),
    },
    {
      code: "AN 2", domaine: AN,
      texte: "Multiples et diviseurs ; nombres premiers ; décomposition en produit de facteurs premiers ; PPMC et PGDC.",
      couverture: "complete",
      micros: [
        ...m("5e", "div_multiple_diviseur", "div_critere_2_5_10", "div_critere_3_9", "div_lister_diviseurs"),
        ...m("4e", "premier_definition", "premier_decomposer"),
        ...m("3e", "entier_pgcd_ppcm"),
      ],
    },
    {
      code: "AN 3", domaine: AN,
      texte: "Fractions : simplification, comparaison, passage de l'écriture décimale à la fractionnaire, addition et soustraction, division d'une fraction par un décimal, rangement.",
      couverture: "complete",
      micros: [
        ...m("5e", "fraction_egale", "fraction_simplifier", "fraction_comparer", "fraction_additionner"),
        ...m("6e", "fraction_decimal"),
        ...m("4e", "fraction_diviser"),
      ],
    },
    {
      code: "AN 4", domaine: AN,
      texte: "Proportionnalité : pourcentage, échelle, vitesse moyenne.",
      couverture: "complete",
      micros: [
        ...m("5e", "prop_quatrieme", "prop_probleme", "prop_pourcentage"),
        ...m("6e", "echelle_distance_reelle", "echelle_distance_plan"),
        ...m("3e", "prop_vitesse_debit"),
      ],
    },
    {
      code: "AN 5", domaine: AN,
      texte: "Nombres décimaux relatifs : opérations, sommes algébriques et suppression des parenthèses, rangement et inégalités dans 𝔻, équations a + x = b et ax = b, inéquations a + x ≤ b.",
      couverture: "partielle",
      micros: [
        ...m("5e", "relatif_addition", "relatif_soustraction", "relatif_calcul", "relatif_comparer"),
        ...m("4e", "relatif_multiplication", "relatif_division", "equation_resoudre_simple"),
        ...m("seconde", "inequation_resoudre"),
      ],
      note: "Pas de micro sur la suppression des parenthèses (a − (b − c) = a − b + c) ; les inéquations n'existent chez nous qu'en seconde.",
    },
    {
      code: "AN 6", domaine: AN,
      texte: "Représentation graphique d'un tableau de correspondance ; repère d'axes perpendiculaires, coordonnées d'un point.",
      couverture: "complete",
      micros: [
        ...m("cm2", "reperage_coordonnees"),
        ...m("4e", "repere_plan", "prop_graphique", "fonction_graphique_lire"),
      ],
    },

    {
      code: "AG 1", domaine: AG,
      texte: "Symétrie centrale : symétrique d'un point, d'une figure ; conservation de l'alignement, des longueurs, du parallélisme, des angles et des aires.",
      couverture: "complete",
      micros: m("5e", "sym_centrale_reconnaitre", "sym_centrale_point", "sym_centrale_figure", "sym_centrale_propriete"),
    },
    {
      code: "AG 2", domaine: AG,
      texte: "Angles : opposés par le sommet, alternes-internes, alternes-externes, correspondants, intérieurs d'un même côté ; symétrique d'un angle par rapport à un point.",
      couverture: "complete",
      micros: m("5e", "angle_paires", "angle_paralleles", "sym_centrale_propriete"),
    },
    {
      code: "AG 3", domaine: AG,
      texte: "Parallélogramme : propriétés et reconnaissances.",
      couverture: "complete",
      micros: [
        ...m("5e", "para_reconnaitre", "para_cotes_angles", "para_diagonales", "para_construire"),
        ...m("4e", "quadrilatere_parallelogramme_montrer"),
      ],
    },
    {
      code: "AG 4", domaine: AG,
      texte: "Triangles : somme des angles ; médiatrices et cercle circonscrit ; hauteurs et orthocentre ; triangles particuliers (rectangle, isocèle, équilatéral) : propriétés et reconnaissances.",
      couverture: "partielle",
      micros: [
        ...m("5e", "triangle_somme_angle", "triangle_nature", "triangle_construire"),
        ...m("6e", "circonscrit_concourantes", "circonscrit_construire"),
        ...m("4e", "triangle_droites"),
      ],
      note: "Les hauteurs concourantes et l'orthocentre n'ont pas de micro dédiée.",
    },
    {
      code: "AG 5", domaine: AG,
      texte: "Trapèze : propriétés, trapèze isocèle, trapèze rectangle.",
      couverture: "partielle",
      micros: m("6e", "quadrilatere_identifier_nature", "quadrilatere_distinguer"),
      note: "Rien sur les propriétés du trapèze isocèle ni sur l'aire du trapèze.",
    },
    {
      code: "AG 6-8", domaine: AG,
      texte: "Rectangle, losange, carré : propriétés et reconnaissances.",
      couverture: "complete",
      micros: [
        ...m("5e", "para_particuliers"),
        ...m("6e", "quadrilatere_lien_propriete", "quadrilatere_conclusion"),
      ],
    },
    {
      code: "AG 9", domaine: AG,
      texte: "Géométrie dans l'espace : le prisme droit — description, représentation, patron, orthogonalité et parallélisme, longueurs, aires, volume.",
      couverture: "partielle",
      micros: [
        ...m("4e", "vision_reconnaitre", "vision_representation"),
        ...m("5e", "volume_prisme"),
      ],
      note: "Manque l'aire latérale du prisme droit (périmètre de la base × hauteur).",
    },
  ],
};

export const SENEGAL_4E: ProgrammePays = {
  pays: "senegal",
  cle: "4e",
  niveau: "4e",
  equivalentFrance: "4e",
  source: SOURCE,
  version: VERSION,
  contenus: [
    {
      code: "AN 1", domaine: AN,
      texte: "Nombres rationnels : définition, écritures, valeur absolue, simplification, opérations dans ℚ, comparaison, opérations et inégalités, approximation décimale, intervalles.",
      couverture: "partielle",
      micros: [
        ...m("4e", "fraction_rationnel", "fraction_egale", "fraction_simplifier", "fraction_comparer", "fraction_additionner", "fraction_multiplier", "fraction_inverse", "fraction_diviser", "fraction_oppose", "fraction_decimal"),
        ...m("5e", "relatif_valeur_absolue"),
        ...m("seconde", "intervalle_representer", "reels_encadrement"),
      ],
      note: "Manquent les règles de l'ordre (si a < b alors a + c < b + c ; multiplier par un négatif renverse) : même trou qu'au Maroc.",
    },
    {
      code: "AN 2", domaine: AN,
      texte: "Calcul algébrique : développement, réduction, égalités usuelles (identités remarquables), factorisation, valeur numérique d'une expression littérale.",
      couverture: "complete",
      micros: [
        ...m("4e", "litteral_distributivite_simple", "litteral_distributivite_double", "litteral_expression_reduire", "litteral_identite_developper", "litteral_facteur_commun", "litteral_factoriser_simple", "litteral_expression_substituer"),
        ...m("seconde", "devfac_factoriser_identite"),
      ],
    },
    {
      code: "AN 3", domaine: AN,
      texte: "Équations à une inconnue : ax + b = 0, (ax + b)(cx + d) = 0, a/x = b, (a/b)x = c ; problèmes.",
      couverture: "complete",
      micros: [
        ...m("4e", "equation_resoudre_simple", "equation_resoudre_reduction", "equation_traduire", "equation_probleme"),
        ...m("3e", "equation_produit_nul"),
      ],
    },
    {
      code: "AN 4", domaine: AN,
      texte: "Inéquations et systèmes de deux inéquations à une inconnue.",
      couverture: "partielle",
      micros: m("seconde", "inequation_resoudre", "inequation_intervalle"),
      note: "Les inéquations sont en seconde chez nous ; manque le SYSTÈME de deux inéquations (intersection des deux intervalles de solutions).",
    },
    {
      code: "AN 5", domaine: AN,
      texte: "Applications linéaires : définition, représentation graphique.",
      couverture: "complete",
      micros: [
        ...m("4e", "prop_graphique", "prop_relation"),
        ...m("3e", "fonction_affine_lineaire", "affine_reconnaitre", "affine_graphique"),
      ],
    },
    {
      code: "AN 6", domaine: AN,
      texte: "Statistique : série brute, série ordonnée, effectif, mode, fréquence, pourcentage, moyenne ; diagrammes en bâtons, en bandes, circulaire et semi-circulaire.",
      couverture: "partielle",
      micros: [
        ...m("4e", "stat_lire_tableau", "stat_lire_graphique", "stat_effectif", "stat_frequence", "stat_moyenne"),
        ...m("5e", "stat_donnee_organiser", "stat_representer"),
        ...m("6e", "stat_donnee_lire_circulaire"),
      ],
      note: "Manque le MODE, et la construction d'un diagramme circulaire ou semi-circulaire (angle proportionnel à l'effectif).",
    },

    {
      code: "AG 1", domaine: AG,
      texte: "Distance : distance de deux points, distance d'un point à une droite.",
      couverture: "partielle",
      micros: [
        ...m("6e", "distance_definition", "distance_inegalite"),
        ...m("seconde", "geo_projete_orthogonal"),
      ],
      note: "La distance d'un point à une droite (le plus court chemin, par la perpendiculaire) n'a pas de micro au collège.",
    },
    {
      code: "AG 2", domaine: AG,
      texte: "Droites des milieux dans un triangle.",
      couverture: "partielle",
      micros: m("4e", "thales_configuration", "thales_calculer_longueur"),
      note: "Le théorème des milieux (parallèle au troisième côté, longueur moitié) et sa réciproque n'ont pas de micro : Thalès le contient, mais il n'est pas nommé.",
    },
    {
      code: "AG 3", domaine: AG,
      texte: "Droites remarquables dans un triangle : bissectrices et cercle inscrit, médianes et centre de gravité ; angle au centre et arc intercepté.",
      couverture: "partielle",
      micros: [
        ...m("6e", "bissectrice_definition", "bissectrice_construire"),
        ...m("4e", "triangle_droites"),
      ],
      note: "Manquent le cercle inscrit (bissectrices concourantes), les médianes et le centre de gravité (aux deux tiers de chaque médiane).",
    },
    {
      code: "AG 4", domaine: AG,
      texte: "Triangle rectangle : aire, théorème de Pythagore et sa réciproque ; triangle isocèle : reconnaissances.",
      couverture: "complete",
      micros: m("4e", "pythagore_carre_racine", "pythagore_reconnaitre", "pythagore_calculer_hypotenuse", "pythagore_calculer_cote", "pythagore_reciproque_conclure", "pythagore_rediger", "aire_triangle"),
    },
    {
      code: "AG 5", domaine: AG,
      texte: "Translations et vecteurs : définition, propriétés, construction ; parallélogramme et vecteur, milieu et vecteur.",
      couverture: "complete",
      micros: [
        ...m("4e", "sym_translation", "sym_transformation_propriete"),
        ...m("seconde", "vecteur_definition", "vecteur_egalite"),
      ],
    },
    {
      code: "AG 6", domaine: AG,
      texte: "Projection orthogonale dans le plan.",
      couverture: "partielle",
      micros: m("seconde", "geo_projete_orthogonal"),
      note: "Seulement le projeté d'un point, en seconde ; rien sur la conservation des milieux et des rapports de longueurs par projection.",
    },
    {
      code: "AG 7", domaine: AG,
      texte: "Rotations : définition, construction, propriétés ; polygones réguliers et leurs angles au centre.",
      couverture: "partielle",
      micros: m("4e", "sym_rotation", "sym_transformation_propriete"),
      note: "Les polygones réguliers (hexagone, octogone : angle au centre 360° ÷ n, construction) n'ont pas de micro.",
    },
    {
      code: "AG 8", domaine: AG,
      texte: "Géométrie dans l'espace : positions relatives de droites et de plans ; section d'une sphère par un plan.",
      couverture: "partielle",
      micros: [
        ...m("4e", "vision_section"),
        ...m("3e", "section_reconnaitre", "volume_section"),
      ],
      note: "Manquent les positions relatives dans l'espace (droites coplanaires ou non, droite et plan, deux plans) et le rayon d'une section de sphère (Pythagore).",
    },
    {
      code: "AG 9", domaine: AG,
      texte: "Repérage dans le plan : coordonnées du milieu d'un segment, carré de la distance de deux points.",
      couverture: "complete",
      micros: [
        ...m("4e", "repere_plan"),
        ...m("seconde", "repere_milieu", "repere_distance"),
      ],
      note: "Au tableau synoptique du programme, sans chapitre propre dans le fascicule ADEM.",
    },
  ],
};

export const SENEGAL_3E: ProgrammePays = {
  pays: "senegal",
  cle: "3e",
  niveau: "3e",
  equivalentFrance: "3e",
  source: SOURCE,
  version: VERSION,
  contenus: [
    {
      code: "AN 1", domaine: AN,
      texte: "Racine carrée et nombres réels : définition, propriétés (√(ab) = √a × √b, √(a/b) = √a ÷ √b), ℕ ⊂ ℤ ⊂ 𝔻 ⊂ ℚ ⊂ ℝ, valeur absolue d'un réel, calcul sur les radicaux, expression conjuguée, rendre rationnel un dénominateur, comparer des réels avec radicaux.",
      couverture: "partielle",
      micros: [
        ...m("3e", "entier_racine_comprendre", "entier_racine_carre_parfait", "entier_racine_calculer", "entier_racine_encadrer"),
        ...m("seconde", "racine_produit", "racine_simplification", "racine_somme", "reels_ensembles", "valeur_absolue_distance"),
      ],
      note: "Manque « rendre rationnel le dénominateur » par l'expression conjuguée (1/(√3 − 1)) : même trou qu'au Maroc.",
    },
    {
      code: "AN 2", domaine: AN,
      texte: "Équations et inéquations à une inconnue : |ax + b| = c, |ax + b| = |cx + d|, équations produits, inéquations (ax + b)(cx + d) ≤ 0.",
      couverture: "partielle",
      micros: [
        ...m("3e", "equation_resoudre_developper", "equation_produit_nul"),
        ...m("seconde", "inequation_resoudre", "signes_produit", "signes_resoudre_inequation", "reference_valeur_absolue"),
      ],
      note: "Les équations avec valeur absolue (|2x − 1| = 3) n'ont pas de micro.",
    },
    {
      code: "AN 3", domaine: AN,
      texte: "Équations et systèmes de deux équations à deux inconnues : méthodes de résolution, interprétation graphique.",
      couverture: "complete",
      micros: m("seconde", "droite_systeme", "droite_intersection"),
    },
    {
      code: "AN 4", domaine: AN,
      texte: "Inéquations et systèmes d'inéquations à deux inconnues (résolution graphique par demi-plans).",
      couverture: "absente",
      micros: [],
      note: "Le régionnement du plan (hachurer le demi-plan 2x + y − 3 < 0) n'est pas au programme français : micros à écrire.",
    },
    {
      code: "AN 5", domaine: AN,
      texte: "Statistique : regroupement en classes d'égales amplitudes, centre de classe, histogramme, diagramme des effectifs cumulés, classe modale, médiane, moyenne.",
      couverture: "partielle",
      micros: [
        ...m("3e", "stat_effectif_frequence", "stat_moyenne", "stat_mediane", "stat_interpreter"),
        ...m("seconde", "stat_moyenne_ponderee"),
      ],
      note: "Manquent les séries en CLASSES : centre de classe, histogramme, effectifs cumulés, classe modale, moyenne par les centres.",
    },
    {
      code: "AN 6", domaine: AN,
      texte: "Applications affines : définition, application linéaire associée, variation, représentation graphique ; applications affines par intervalles (x ↦ |ax + b|, constantes par intervalles).",
      couverture: "partielle",
      micros: [
        ...m("3e", "affine_reconnaitre", "affine_coeff_directeur", "affine_ordonnee_origine", "affine_expression", "affine_graphique", "affine_probleme"),
        ...m("seconde", "variation_croissance", "reference_valeur_absolue"),
      ],
      note: "Manquent les fonctions affines PAR INTERVALLES (tarifs par tranches, |ax + b| tracée en deux morceaux).",
    },

    {
      code: "AG 1", domaine: AG,
      texte: "Théorème de Thalès et sa réciproque : cas du triangle, cas du trapèze.",
      couverture: "partielle",
      micros: m("3e", "thales_configuration", "thales_rapport", "thales_calculer_longueur", "thales_reciproque", "thales_rediger"),
      note: "Le « cas du trapèze » (parallèles coupant deux sécantes) n'a pas de micro propre.",
    },
    {
      code: "AG 2", domaine: AG,
      texte: "Angles inscrits : angle inscrit, angle au centre associé, arc intercepté ; angles inscrits interceptant le même arc ; triangle rectangle et cercle ; longueur d'un arc.",
      couverture: "absente",
      micros: [],
      note: "Retiré du programme français : micros à écrire (angle inscrit = moitié de l'angle au centre), comme pour le Maroc.",
    },
    {
      code: "AG 3", domaine: AG,
      texte: "Relations trigonométriques dans le triangle rectangle : cosinus, sinus, tangente d'un angle aigu ; cos² + sin² = 1 ; angles complémentaires ; valeurs pour 30°, 45°, 60°.",
      couverture: "partielle",
      micros: [
        ...m("3e", "trigo_triangle_rectangle", "trigo_cosinus", "trigo_sinus", "trigo_tangente", "trigo_calculer_longueur", "trigo_calculer_angle", "trigo_choisir_rapport"),
        ...m("seconde", "geo_trig_identite"),
      ],
      note: "Manquent les valeurs remarquables (cos 60° = 1/2, sin 45° = √2/2) et sin x = cos(90° − x).",
    },
    {
      code: "AG 4", domaine: AG,
      texte: "Géométrie dans l'espace : pyramide et cône de révolution — patron, représentation, aire, volume, section par un plan parallèle à la base.",
      couverture: "partielle",
      micros: m("3e", "volume_solide_reconnaitre", "volume_representation", "section_cone_pyramide", "pythagore_solide", "volume_agrandissement_reduction"),
      note: "Pas de micro « volume d'une pyramide ou d'un cône » (V = B × h ÷ 3) ni d'aire latérale du cône : même trou qu'au Maroc.",
    },
    {
      code: "AG 5", domaine: AG,
      texte: "Vecteurs : addition, relation de Chasles, parallélogramme et somme de vecteurs, multiplication par un réel, vecteurs colinéaires.",
      couverture: "complete",
      micros: m("seconde", "vecteur_egalite", "vecteur_somme", "vecteur_chasles_calcul", "vecteur_produit_reel", "vecteur_colinearite"),
    },
    {
      code: "AG 6", domaine: AG,
      texte: "Repérage dans le plan : coordonnées d'un vecteur, distance de deux points, équation générale et réduite d'une droite, vecteur directeur ; équations d'une médiane, d'une hauteur, d'une médiatrice.",
      couverture: "partielle",
      micros: m("seconde", "vecteur_coordonnees", "repere_distance", "droite_pente_ordonne", "droite_equation_reduite", "droite_equation_cartesienne", "droite_vecteur_directeur", "droite_parallelisme"),
      note: "Manquent les droites PERPENDICULAIRES par les coordonnées, donc les équations d'une hauteur et d'une médiatrice.",
    },
    {
      code: "AG 7", domaine: AG,
      texte: "Transformations du plan : composées de deux translations, de deux symétries centrales, de deux symétries orthogonales d'axes parallèles, perpendiculaires ou sécants.",
      couverture: "partielle",
      micros: [
        ...m("3e", "sym_symetrie_translation_rotation", "sym_transformation_effet"),
        ...m("4e", "sym_translation", "sym_rotation"),
      ],
      note: "La COMPOSÉE de deux transformations (deux symétries d'axes parallèles = une translation) n'a pas de micro.",
    },
  ],
};
