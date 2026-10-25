// Maroc, 1re et 2e années du collège (1AC, 2AC ; le 3AC est dans ./maroc-3ac.ts).
// Source : les « Orientations pédagogiques et programmes de l'enseignement des
// mathématiques au cycle secondaire collégial » du ministère de l'Éducation
// nationale (Direction des curricula, Rabat, août 2009), toujours en vigueur.
// Le texte officiel est en ARABE et n'est pas en ligne sur men.gov.ma : nous
// avons relevé sa TRADUCTION FRANÇAISE faite par deux enseignants (Aziz Aït
// El Yazid, direction provinciale de Chtouka Aït Baha ; Fahd Ouaiour, direction
// provinciale de Guelmim), pour les sections internationales option française
// (« 1.A.P.I.C », « 2.A.P.I.C »), diffusée par les blogs d'enseignants
// (alra2id-educ.blogspot.com, octobre 2019). Tableaux « Contenu du programme /
// Capacités attendues / Orientations pédagogiques » et répartition semestrielle
// avec les horaires, relus le 25/10/2026. Les titres des chapitres concordent
// avec AlloSchool (source du 3AC).
// Langue : au collège public, les maths ont été enseignées en ARABE jusqu'à la
// fin des années 2010 ; les sections internationales (option française) les
// enseignent en français depuis 2014, et la loi-cadre 51-17 (2019) fait passer
// progressivement les matières scientifiques au FRANÇAIS dans tout le collège.
// Selon l'établissement, un élève de 1AC peut donc encore les apprendre en arabe.
// Pas de codes officiels : S1-n / S2-n = semestre, rang du contenu dans l'ordre
// des tableaux officiels (les paragraphes à plusieurs volets sont découpés).
// Âge : le 1AC suit le 6AEP (6 ans de primaire) et a l'âge de notre 5e ; le 2AC
// celui de notre 4e. Le Maroc va plus vite en géométrie (vecteurs et translation
// dès le 2AC) et garde des contenus retirés en France (médianes et centre de
// gravité, droite des milieux, tangente au cercle, aires latérales).

import type { Classe } from "@/lib/tutor-v4/catalog";
import type { ProgrammePays, RenvoiMicro } from "./types";

const m = (classe: Classe, ...micros: string[]): RenvoiMicro[] =>
  micros.map((micro) => ({ classe, micro }));

const AN = "Activités numériques";
const AG = "Activités géométriques";
const GS = "Activités graphiques et statistiques";

const SOURCE = "https://alra2id-educ.blogspot.com/2019/10/Directives-pedagogiques-math-biof-college-pdf.html";
const VERSION =
  "orientations pédagogiques officielles 2009 (secondaire collégial), traduction française d'enseignants pour l'option française";

// Horaires officiels du 1AC. S1 : entiers et décimaux 10 h, écritures
// fractionnaires 12 h, relatifs 22 h, notions de base 15 h, triangle 15 h.
// S2 : développement et factorisation 8 h, équations 7 h, symétrie centrale,
// parallélogramme, quadrilatères, sécante 28 h, cercle 6 h, prisme et cylindre
// 8 h, droite graduée et repère 5 h, proportionnalité 6 h, statistiques 6 h.
export const MAROC_1AC: ProgrammePays = {
  pays: "maroc",
  cle: "1ac",
  niveau: "1re année collège (1AC)",
  equivalentFrance: "5e",
  source: SOURCE,
  version: VERSION,
  contenus: [
    // ── Semestre 1 ──────────────────────────────────────────────────────────
    {
      code: "S1-1", domaine: AN,
      texte: "Opérations sur les entiers et les décimaux positifs : écrire une expression à plusieurs opérations, priorités ; k(a + b) = ka + kb et k(a − b) = ka − kb dans les deux sens.",
      couverture: "complete",
      micros: [
        ...m("cm2", "calcul_priorite"),
        ...m("6e", "decimal_additionner", "decimal_multiplier", "entier_strategie_mentale"),
        ...m("5e", "litteral_distributivite"),
      ],
    },
    {
      code: "S1-2", domaine: AN,
      texte: "Écritures fractionnaires : écritures égales d'un même nombre, simplification, rendre entier un dénominateur décimal, comparer deux fractions.",
      couverture: "partielle",
      micros: [
        ...m("6e", "fraction_egale", "fraction_comparer"),
        ...m("5e", "fraction_egale", "fraction_simplifier", "fraction_comparer"),
      ],
      note: "Manque le quotient à dénominateur décimal rendu entier (2,5 ÷ 1,5 = 25 ÷ 15) comme exercice à part.",
    },
    {
      code: "S1-3", domaine: AN,
      texte: "Somme, différence et produit de deux fractions.",
      couverture: "complete",
      micros: [...m("5e", "fraction_additionner", "fraction_multiplier"), ...m("4e", "fraction_additionner")],
    },
    {
      code: "S1-4", domaine: AN,
      texte: "Nombres décimaux relatifs : ranger dans l'ordre croissant ou décroissant, graduer une droite.",
      couverture: "complete",
      micros: m("5e", "relatif_lire", "relatif_comparer", "relatif_placer", "relatif_oppose"),
    },
    {
      code: "S1-5", domaine: AN,
      texte: "Addition et soustraction des relatifs : a − b = a + (−b), sommes algébriques, parenthèses, factoriser des sommes algébriques simples.",
      couverture: "complete",
      micros: [
        ...m("5e", "relatif_addition", "relatif_soustraction", "relatif_calcul"),
        ...m("4e", "relatif_calcul", "litteral_facteur_commun"),
      ],
    },
    {
      code: "S1-6", domaine: AN,
      texte: "Multiplication et division des relatifs : produit de plusieurs facteurs, inverse, écriture a/b, valeurs approchées et encadrement d'un quotient.",
      couverture: "partielle",
      micros: [
        ...m("4e", "relatif_multiplication", "relatif_division", "fraction_inverse"),
        ...m("6e", "decimal_arrondir", "decimal_encadrer"),
      ],
      note: "Manquent les valeurs approchées PAR DÉFAUT et PAR EXCÈS d'un quotient (17 ÷ 7 ≈ 2,42 par défaut, 2,43 par excès), au cœur du chapitre marocain.",
    },
    {
      code: "S1-7", domaine: AN,
      texte: "Puissances d'un relatif, propriétés, puissances de 10 ; savoir lire l'écriture scientifique donnée par la calculatrice.",
      couverture: "complete",
      micros: m("4e", "puissance_comprendre", "puissance_calculer", "puissance_dix", "puissance_notation_scientifique", "puissance_calcul"),
      note: "Chez nous, les puissances commencent en 4e.",
    },
    {
      code: "S1-8", domaine: AG,
      texte: "Notions de base : droite, demi-droite, segment, perpendiculaires, parallèles, points alignés ; construire des figures usuelles ; mesurer et comparer longueurs, périmètres, aires et angles.",
      couverture: "complete",
      micros: [
        ...m("cm2", "droite_parallele", "droite_perpendiculaire", "droite_tracer"),
        ...m("6e", "distance_definition", "quadrilatere_completer_construire", "aire_perimetre_figure", "aire_comparer", "angle_mesurer", "angle_tracer"),
      ],
    },
    {
      code: "S1-9", domaine: AG,
      texte: "Le triangle : somme des angles égale à 180°, triangles particuliers ; construire un triangle de côtés connus ; inégalité triangulaire.",
      couverture: "complete",
      micros: [
        ...m("6e", "triangle_somme_angle", "triangle_angle_manquant", "triangle_possible_ou_non"),
        ...m("5e", "triangle_nature", "triangle_inegalite", "triangle_construire"),
      ],
    },
    {
      code: "S1-10", domaine: AG,
      texte: "Droites du triangle : médiatrice (propriété caractéristique) et cercle circonscrit ; bissectrice (propriété caractéristique) et cercle inscrit ; hauteurs et orthocentre ; distance d'un point à une droite.",
      couverture: "partielle",
      micros: [
        ...m("6e", "mediatrice_propriete", "mediatrice_construire", "circonscrit_concourantes", "circonscrit_construire", "bissectrice_definition", "bissectrice_construire"),
        ...m("4e", "triangle_droites"),
      ],
      note: "Manquent la bissectrice comme lieu des points ÉQUIDISTANTS des côtés, le cercle inscrit, l'orthocentre et la distance d'un point à une droite.",
    },

    // ── Semestre 2 ──────────────────────────────────────────────────────────
    {
      code: "S2-1", domaine: AN,
      texte: "Développement et factorisation : développer un produit, factoriser une somme (facteur commun), règles des parenthèses. Identités remarquables non exigées.",
      couverture: "complete",
      micros: [
        ...m("5e", "litteral_distributivite", "litteral_reduire"),
        ...m("4e", "litteral_distributivite_simple", "litteral_facteur_commun", "litteral_factoriser_simple"),
      ],
    },
    {
      code: "S2-2", domaine: AN,
      texte: "Équations : l'inconnue, techniques simples de résolution, vérifier une solution, mettre en équation une situation.",
      couverture: "complete",
      micros: m("4e", "equation_reconnaitre", "equation_traduire", "equation_resoudre_simple", "equation_verifier", "equation_probleme"),
      note: "Chez nous, les équations commencent en 4e.",
    },
    {
      code: "S2-3", domaine: AG,
      texte: "Symétrie centrale : symétrique d'un point, d'un segment, d'une droite, d'une demi-droite, d'un angle, d'un cercle ; conservation des distances, de l'alignement, des aires et des angles.",
      couverture: "complete",
      micros: m("5e", "sym_centrale_reconnaitre", "sym_centrale_point", "sym_centrale_figure", "sym_centrale_propriete"),
    },
    {
      code: "S2-4", domaine: AG,
      texte: "Le parallélogramme : propriétés de ses côtés, de ses angles et de ses diagonales, reliées à la symétrie centrale.",
      couverture: "complete",
      micros: [
        ...m("5e", "para_reconnaitre", "para_cotes_angles", "para_diagonales", "para_construire"),
        ...m("4e", "quadrilatere_parallelogramme_montrer"),
      ],
    },
    {
      code: "S2-5", domaine: AG,
      texte: "Quadrilatères particuliers : losange, rectangle, carré ; centre et axes de symétrie de figures simples.",
      couverture: "complete",
      micros: [...m("5e", "para_particuliers"), ...m("6e", "quadrilatere_identifier_nature", "sym_axe")],
    },
    {
      code: "S2-6", domaine: AG,
      texte: "Deux parallèles et une sécante : angles alternes-internes et correspondants ; angles adjacents, complémentaires, opposés par le sommet ; démontrer que la somme des angles d'un triangle vaut 180°.",
      couverture: "complete",
      micros: m("5e", "angle_paralleles", "angle_paires"),
    },
    {
      code: "S2-7", domaine: AG,
      texte: "Le cercle : centre, corde, diamètre, tangente ; tracer la tangente en un point ; un triangle dont un côté est un diamètre du cercle circonscrit est rectangle.",
      couverture: "partielle",
      micros: m("6e", "cercle_vocabulaire", "cercle_ensemble", "cercle_distance"),
      note: "Manquent la tangente (perpendiculaire au rayon) et le triangle inscrit dans un demi-cercle, absents du programme français actuel.",
    },
    {
      code: "S2-8", domaine: AG,
      texte: "Prisme droit et cylindre de révolution : représentation, patron, aire latérale et volume.",
      couverture: "partielle",
      micros: [...m("5e", "volume_prisme", "volume_cylindre"), ...m("4e", "vision_representation")],
      note: "Manque l'AIRE LATÉRALE (périmètre de la base × hauteur) : pas de micro chez nous.",
    },
    {
      code: "S2-9", domaine: GS,
      texte: "Droite graduée (lire et placer une abscisse, distance de deux points d'abscisses connues) ; repère du plan (lire et placer des coordonnées).",
      couverture: "partielle",
      micros: [...m("6e", "abscisse_lire", "abscisse_placer"), ...m("5e", "relatif_placer"), ...m("4e", "repere_plan")],
      note: "Manque la distance de deux points d'une droite graduée comme différence de leurs abscisses (relatifs compris).",
    },
    {
      code: "S2-10", domaine: GS,
      texte: "Proportionnalité : coefficient, reconnaître et compléter un tableau, pourcentages, échelle, vitesse moyenne, conversions d'unités.",
      couverture: "complete",
      micros: [
        ...m("6e", "prop_reconnaitre", "prop_table", "prop_coeff", "echelle_distance_reelle"),
        ...m("5e", "prop_quatrieme", "prop_pourcentage", "conversion_decimal"),
        ...m("3e", "prop_vitesse_debit"),
      ],
    },
    {
      code: "S2-11", domaine: GS,
      texte: "Statistiques : population, lire et interpréter un tableau, un diagramme en barres, un diagramme circulaire ; représenter une série ; classer des données.",
      couverture: "complete",
      micros: [
        ...m("6e", "stat_donnee_lire_tableau", "stat_donnee_lire_graphique", "stat_donnee_lire_circulaire"),
        ...m("5e", "stat_donnee_organiser", "stat_representer", "stat_effectif_frequence"),
      ],
    },
  ],
};

// Horaires officiels du 2AC. S1 : relatifs et rationnels 8 h, opérations sur les
// rationnels 16 h, puissances 8 h, symétrie axiale 8 h, droites remarquables
// 8 h, droite des milieux 8 h. S2 : calcul littéral 6 h, équations 6 h, ordre
// et opérations 6 h, triangle rectangle et cercle 10 h, vecteurs et translation
// 7 h, pyramide et cône 10 h, proportionnalité 5 h, statistiques 6 h.
export const MAROC_2AC: ProgrammePays = {
  pays: "maroc",
  cle: "2ac",
  niveau: "2e année collège (2AC)",
  equivalentFrance: "4e",
  source: SOURCE,
  version: VERSION,
  contenus: [
    // ── Semestre 1 ──────────────────────────────────────────────────────────
    {
      code: "S1-1", domaine: AN,
      texte: "Calcul dans l'ensemble des rationnels : a/b = a × 1/b, inverse d'un nombre, 1/a = a⁻¹ ; les quatre opérations.",
      couverture: "complete",
      micros: [
        ...m("4e", "fraction_rationnel", "fraction_additionner", "fraction_multiplier", "fraction_inverse", "fraction_diviser"),
        ...m("3e", "fraction_rationnel_calculer"),
      ],
    },
    {
      code: "S1-2", domaine: AN,
      texte: "Puissances à exposant entier relatif : aᵐ × aⁿ = aᵐ⁺ⁿ, (ab)ⁿ = aⁿbⁿ, (a/b)ⁿ = aⁿ/bⁿ ; exposants négatifs ; écriture scientifique et ordre de grandeur.",
      couverture: "complete",
      micros: [
        ...m("4e", "puissance_calcul", "puissance_exposant_negatif", "puissance_dix", "puissance_notation_scientifique", "ordre_estimer"),
        ...m("seconde", "puiss_produit_quotient"),
      ],
    },
    {
      code: "S1-3", domaine: AG,
      texte: "Symétrie axiale : symétrique d'un point, d'un segment, d'une droite, d'un angle, d'un cercle ; résoudre des problèmes avec les symétries axiale et centrale et les propriétés du parallélogramme.",
      couverture: "complete",
      micros: [
        ...m("6e", "sym_point", "sym_figure", "sym_propriete"),
        ...m("4e", "sym_axiale", "sym_centrale", "sym_transformation_propriete", "quadrilatere_parallelogramme_propriete"),
      ],
    },
    {
      code: "S1-4", domaine: AG,
      texte: "Droites remarquables du triangle : hauteurs, médianes, médiatrices, bissectrices ; position du centre de gravité.",
      couverture: "partielle",
      micros: [...m("4e", "triangle_droites"), ...m("6e", "circonscrit_concourantes", "bissectrice_definition")],
      note: "Manquent les MÉDIANES et le CENTRE DE GRAVITÉ (aux deux tiers de chaque médiane), retirés du programme français.",
    },
    {
      code: "S1-5", domaine: AG,
      texte: "Droite des milieux et sa réciproque ; le segment des milieux mesure la moitié du troisième côté ; si (MN) ∥ (BC) alors AM/AB = AN/AC = MN/BC ; partager un segment en segments égaux.",
      couverture: "partielle",
      micros: m("4e", "thales_configuration", "thales_rapport", "thales_calculer_longueur"),
      note: "Manquent le théorème des milieux (et sa réciproque) et le partage d'un segment en n parts égales. Le Thalès « complet » vient en 3AC.",
    },

    // ── Semestre 2 ──────────────────────────────────────────────────────────
    {
      code: "S2-1", domaine: AN,
      texte: "Calcul littéral : réduire une expression à une variable, développer (a + b)(c + d), factoriser des expressions simples ; identités remarquables sans excès.",
      couverture: "complete",
      micros: m("4e", "litteral_expression_reduire", "litteral_distributivite_double", "litteral_distributivite_reduire", "litteral_facteur_commun", "litteral_factoriser_simple", "litteral_identite_developper"),
    },
    {
      code: "S2-2", domaine: AN,
      texte: "Équations du premier degré à une inconnue ; mettre une situation en équation et interpréter la solution. Les équations produits (2x + 3)(x + 1) = 0 sont hors programme.",
      couverture: "complete",
      micros: m("4e", "equation_resoudre_reduction", "equation_resoudre_distributivite", "equation_verifier", "equation_probleme"),
    },
    {
      code: "S2-3", domaine: AN,
      texte: "Ordre et opérations : comparer deux rationnels, ordre et addition, ordre et multiplication par un positif.",
      couverture: "partielle",
      micros: [...m("4e", "fraction_comparer"), ...m("3e", "fraction_rationnel_comparer"), ...m("seconde", "comparer_difference_quotient")],
      note: "Manquent les règles de l'ordre comme notion (si a < b alors a + c < b + c ; multiplier par un positif conserve l'ordre) : même trou qu'au 3AC.",
    },
    {
      code: "S2-4", domaine: GS,
      texte: "Proportionnalité et fonctions linéaires : points alignés avec l'origine, lecture graphique, vitesse moyenne, représenter une situation de proportionnalité dans un repère.",
      couverture: "complete",
      micros: [
        ...m("4e", "prop_graphique", "prop_relation", "fonction_graphique_lire"),
        ...m("3e", "prop_vitesse_debit", "fonction_affine_lineaire"),
      ],
    },
    {
      code: "S2-5", domaine: GS,
      texte: "Statistiques : effectifs cumulés, fréquences cumulées, moyenne ; diagrammes en bâtons, en barres, courbe (ligne brisée).",
      couverture: "partielle",
      micros: [...m("4e", "stat_effectif", "stat_frequence", "stat_moyenne", "stat_lire_graphique"), ...m("5e", "stat_representer")],
      note: "Manquent les effectifs et fréquences CUMULÉS (même trou qu'au 3AC).",
    },
    {
      code: "S2-6", domaine: AG,
      texte: "Triangle rectangle et cercle : le cercle circonscrit à un triangle rectangle a pour centre le milieu de l'hypoténuse (propriété caractéristique).",
      couverture: "partielle",
      micros: m("6e", "circonscrit_construire"),
      note: "Pas de micro sur la propriété elle-même (et sa réciproque), absente du programme français actuel.",
    },
    {
      code: "S2-7", domaine: AG,
      texte: "Théorème de Pythagore : calculer un côté du triangle rectangle, valeurs approchées à la calculatrice ; premiers nombres réels (racines carrées).",
      couverture: "complete",
      micros: [
        ...m("4e", "pythagore_carre_racine", "pythagore_reconnaitre", "pythagore_calculer_hypotenuse", "pythagore_calculer_cote"),
        ...m("3e", "entier_racine_calculer"),
      ],
      note: "La réciproque vient en 3AC.",
    },
    {
      code: "S2-8", domaine: AG,
      texte: "Cosinus d'un angle aigu dans le triangle rectangle ; valeurs arrondies à la calculatrice.",
      couverture: "complete",
      micros: m("4e", "cos_cotes", "cos_definition", "cos_calculer_longueur", "cos_calculer_angle", "cos_probleme"),
    },
    {
      code: "S2-9", domaine: AG,
      texte: "Vecteurs et translation : sens, direction, norme ; égalité de deux vecteurs, AB = DC et parallélogramme ; somme, relation de Chasles ; image d'un point par une translation.",
      couverture: "complete",
      micros: [
        ...m("4e", "sym_translation"),
        ...m("seconde", "vecteur_definition", "vecteur_egalite", "vecteur_somme", "vecteur_chasles_calcul"),
      ],
      note: "Chez nous en seconde : à proposer comme avance.",
    },
    {
      code: "S2-10", domaine: AG,
      texte: "Pyramide, cône de révolution, prisme droit : patrons, représentation, aire latérale, volumes.",
      couverture: "partielle",
      micros: [...m("4e", "vision_representation", "volume_prisme"), ...m("3e", "volume_solide_reconnaitre", "section_cone_pyramide")],
      note: "Manquent le volume de la pyramide et du cône (V = B × h ÷ 3) et l'aire latérale : trou déjà relevé au 3AC.",
    },
  ],
};
