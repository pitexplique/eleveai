// Côte d'Ivoire, PREMIER CYCLE DU SECONDAIRE (collège : 6e, 5e, 4e, 3e ; le
// BEPC en fin de 3e).
// Source OFFICIELLE : « Programme éducatif et guide d'exécution —
// Mathématiques », un fascicule par classe, ministère de l'Éducation nationale
// et de l'Alphabétisation (MENA), Inspection générale, Direction de la pédagogie
// et de la formation continue (DPFC). Version « CND 0923 » (septembre 2023),
// PDF texte sur le site de la DPFC :
//   https://dpfc-ci.net/dpfc/programmes/maths/01.%20Prog%20%C3%89duct%20MATHS%206e%20CND%200923.pdf
//   (02 = 5e, 03 = 4e, 04 = 3e, même nom de fichier)
// Relevé le 25/10/2026 sur le CORPS DU PROGRAMME (habiletés et contenus, leçon
// par leçon), pas sur les exemples de situation. Approche par les compétences
// (APC) : 3 compétences, 4 h par semaine, 128 h par an.
// Le programme n'a pas de codes : C n-L k = compétence n, k-ième leçon dans
// l'ordre du corps du programme (C1 calculs algébriques et fonctions, C2
// données et aléatoire, C3 géométrie et transformations).
// Limites : la progression annuelle n'est pas dans le fascicule (« se conformer
// à la progression en vigueur ») ; elle est publiée à part, « Progressions
// annuelles 2026-2027 » de la Coordination nationale de mathématiques
// (https://dpfc-ci.net/dpfc/2027/progressions/MATHEMATIQUES%20-%20Progressions%20annuelles_DPFC_2026_2027.pdf),
// où l'on retrouve les mêmes leçons (vérifié pour la 6e) ; le tableau synoptique 5e diffère un peu du
// corps (on suit le corps). Pas de probabilités ni d'algorithmique au collège.
// Langue : les mathématiques sont enseignées en FRANÇAIS à tous les niveaux.
// Décalages avec la France : relatifs dès la 6e ; Pythagore et trigonométrie
// en 3e seulement ; vecteurs, coordonnées, équations de droites, systèmes et
// inéquations à deux inconnues en 4e-3e (chez nous en seconde) ; angles
// inscrits, pyramides et cônes (volumes, troncs) en 3e.

import type { Classe } from "@/lib/tutor-v4/catalog";
import type { ProgrammePays, RenvoiMicro } from "./types";

const m = (classe: Classe, ...micros: string[]): RenvoiMicro[] =>
  micros.map((micro) => ({ classe, micro }));

const CALC = "Calculs algébriques";
const FONC = "Fonctions";
const DONN = "Organisation et traitement de données";
const GPLAN = "Géométrie du plan";
const GESP = "Géométrie de l'espace";
const TRANS = "Transformations du plan";

const SOURCE = "https://dpfc-ci.net/dpfc/programmes/maths/ (01 à 04, Prog Éduct MATHS 6e à 3e CND 0923)";
const VERSION = "programmes éducatifs et guides d'exécution MENA/DPFC, version CND 0923 (2023)";

export const COTE_DIVOIRE_6E: ProgrammePays = {
  pays: "cote-divoire",
  cle: "6e",
  niveau: "Sixième",
  equivalentFrance: "6e",
  source: SOURCE,
  version: VERSION,
  contenus: [
    {
      code: "C1-L1", domaine: CALC,
      texte: "Nombres entiers naturels : ℕ, symboles ∈ et ∉, entiers consécutifs, multiples, diviseurs (tous les diviseurs d'un entier < 1 000), caractères de divisibilité par 2, 3, 5, 9, 10, 100, 1 000.",
      couverture: "partielle",
      micros: [
        ...m("5e", "div_multiple_diviseur", "div_critere_2_5_10", "div_critere_3_9", "div_lister_diviseurs"),
        ...m("cm2", "entier_multiple"),
      ],
      note: "Manquent les symboles ∈ / ∉ et le nombre d'entiers consécutifs de m à n (n − m + 1).",
    },
    {
      code: "C1-L2", domaine: CALC,
      texte: "Nombres décimaux relatifs : ℤ et 𝔻, opposé, comparaison, droite graduée (lire, graduer, placer), somme de deux décimaux relatifs.",
      couverture: "complete",
      micros: m("5e", "relatif_lire", "relatif_signe", "relatif_oppose", "relatif_comparer", "relatif_placer", "relatif_addition"),
    },
    {
      code: "C1-L3", domaine: CALC,
      texte: "Fractions : fraction décimale, fractions égales, simplifier, fraction d'une quantité, décimal en fraction décimale, distance sur un segment gradué, même dénominateur, comparer (et comparer à 1), somme de deux fractions.",
      couverture: "complete",
      micros: [
        ...m("6e", "fraction_lire_ecrire", "fraction_egale", "fraction_quantite", "fraction_decimal", "abscisse_fraction", "fraction_comparer", "fraction_additionner"),
        ...m("5e", "fraction_simplifier"),
      ],
    },
    {
      code: "C2-L1", domaine: DONN,
      texte: "Proportionnalité : grandeurs proportionnelles, coefficient, propriétés de linéarité, pourcentage en décimal et en fraction décimale, échelle (reproduire un dessin).",
      couverture: "complete",
      micros: m("6e", "prop_reconnaitre", "prop_table", "prop_coeff", "prop_direct", "pourcentage_decimal", "pourcentage_fraction", "pourcentage_calcul_simple", "echelle_distance_reelle", "echelle_distance_plan"),
    },
    {
      code: "C2-L2", domaine: DONN,
      texte: "Statistique : effectif, effectif total, fréquence, fréquence en pourcentage ; tableau d'effectifs ↔ tableau de fréquences.",
      couverture: "complete",
      micros: [
        ...m("6e", "stat_construire_tableau", "stat_donnee_lire_tableau"),
        ...m("5e", "stat_effectif_frequence"),
      ],
    },
    {
      code: "C3-L1", domaine: GPLAN,
      texte: "Droites et points : points alignés, demi-droite, droites sécantes, perpendiculaires, parallèles ; tracer la perpendiculaire ou la parallèle passant par un point.",
      couverture: "complete",
      micros: m("cm2", "droite_reconnaitre", "droite_parallele", "droite_perpendiculaire", "droite_tracer"),
    },
    {
      code: "C3-L2", domaine: GPLAN,
      texte: "Segments : segment, milieu, médiatrice (règle et équerre), report de longueurs au compas.",
      couverture: "complete",
      micros: m("6e", "distance_definition", "distance_milieu", "mediatrice_definition", "mediatrice_construire", "aire_longueur_mesurer"),
    },
    {
      code: "C3-L3", domaine: GPLAN,
      texte: "Cercles et disques : centre, rayon, diamètre, corde, C(A, r) et D(A, r), AM = r ; périmètre du cercle et aire du disque (valeur exacte en π, valeur approchée).",
      couverture: "complete",
      micros: [
        ...m("6e", "cercle_vocabulaire", "cercle_ensemble", "cercle_distance", "cercle_perimetre"),
        ...m("3e", "aire_disque"),
      ],
    },
    {
      code: "C3-L4", domaine: GPLAN,
      texte: "Angles : sommet, côtés, angle nul, aigu, droit, obtus, plat ; mesurer, reproduire (rapporteur ou compas), construire ; bissectrice.",
      couverture: "complete",
      micros: m("6e", "angle_reconnaitre", "angle_droit", "angle_comparer", "angle_mesurer", "angle_tracer", "bissectrice_definition", "bissectrice_construire"),
    },
    {
      code: "C3-L5", domaine: GPLAN,
      texte: "Triangles : rectangle, isocèle, équilatéral ; hauteur, médiane, médiatrice d'un côté ; construire (compas, règle) ; périmètre et aire.",
      couverture: "partielle",
      micros: [
        ...m("6e", "triangle_type_cote", "triangle_type_angle", "mediatrice_construire"),
        ...m("5e", "triangle_construire", "aire_triangle"),
        ...m("4e", "triangle_droites", "aire_perimetre_triangle"),
      ],
      note: "La médiane d'un triangle n'a pas de micro (triangle_droites : hauteur et médiatrice).",
    },
    {
      code: "C3-L6", domaine: GPLAN,
      texte: "Parallélogramme : définition, diagonales et côtés opposés (propriétés directes et réciproques), construire, démontrer qu'un quadrilatère est un parallélogramme ; périmètre et aire.",
      couverture: "complete",
      micros: [
        ...m("5e", "para_reconnaitre", "para_cotes_angles", "para_diagonales", "para_construire", "aire_parallelogramme"),
        ...m("4e", "quadrilatere_parallelogramme_montrer"),
      ],
    },
    {
      code: "C3-L7", domaine: GESP,
      texte: "Pavés droits et cylindres droits : sommets, arêtes, faces, patrons ; aire d'une face, aire latérale, aire totale ; volume du pavé, du cube, du cylindre.",
      couverture: "partielle",
      micros: [
        ...m("cm2", "solide_sommet_arete_face", "solide_patron"),
        ...m("5e", "volume_pave", "volume_cylindre"),
      ],
      note: "Pas de micro « aire latérale / aire totale » d'un pavé ou d'un cylindre.",
    },
    {
      code: "C3-L8", domaine: TRANS,
      texte: "Figures symétriques par rapport à un point : symétrique d'un point, d'une droite, d'un segment, d'un angle, d'un cercle ; centre de symétrie ; propriétés de conservation.",
      couverture: "complete",
      micros: m("5e", "sym_centrale_reconnaitre", "sym_centrale_point", "sym_centrale_figure", "sym_centrale_propriete"),
    },
  ],
};

export const COTE_DIVOIRE_5E: ProgrammePays = {
  pays: "cote-divoire",
  cle: "5e",
  niveau: "Cinquième",
  equivalentFrance: "5e",
  source: SOURCE,
  version: VERSION,
  contenus: [
    {
      code: "C1-L1", domaine: CALC,
      texte: "Nombres premiers : puissance d'exposant entier d'un entier naturel, priorité de la puissance, (a × b)ⁿ = aⁿ × bⁿ, aⁿ × aᵐ = aⁿ⁺ᵐ ; division euclidienne (égalité, encadrement de a entre deux multiples consécutifs de b) ; reconnaître un nombre premier (2 ou 3 chiffres), décomposer en produit de facteurs premiers.",
      couverture: "complete",
      micros: m("4e", "puissance_comprendre", "puissance_calculer", "puissance_calcul", "div_euclidienne", "premier_definition", "premier_determiner", "premier_decomposer"),
    },
    {
      code: "C1-L2", domaine: CALC,
      texte: "Nombres décimaux relatifs : comparer, ranger ; différence, somme algébrique, produit ; équation x + b = a.",
      couverture: "complete",
      micros: [
        ...m("5e", "relatif_comparer", "relatif_soustraction", "relatif_calcul"),
        ...m("4e", "relatif_multiplication", "equation_resoudre_simple"),
      ],
    },
    {
      code: "C1-L3", domaine: CALC,
      texte: "Fractions : différence de deux fractions, produit d'une fraction par un entier, produit de deux fractions, puissance entière d'une fraction ; encadrer une fraction par deux décimaux consécutifs de même ordre.",
      couverture: "partielle",
      micros: [
        ...m("5e", "fraction_additionner", "fraction_multiplier"),
        ...m("6e", "fraction_multiplier_entier"),
      ],
      note: "Manquent la puissance d'une fraction ((a/b)ⁿ = aⁿ/bⁿ) et l'encadrement décimal d'une fraction.",
    },
    {
      code: "C2-L1", domaine: DONN,
      texte: "Proportionnalité : vitesse moyenne, débit moyen, masse volumique ; reconnaître et représenter graphiquement une situation de proportionnalité dans un quadrillage, lire le coefficient sur le graphique.",
      couverture: "complete",
      micros: [
        ...m("4e", "prop_graphique", "grandeur_quotient", "grandeur_unite_composee"),
        ...m("3e", "prop_vitesse_debit"),
        ...m("cm2", "reperage_coordonnees"),
      ],
    },
    {
      code: "C2-L2", domaine: DONN,
      texte: "Statistique : population, caractère qualitatif ou quantitatif, modalités ; diagramme en bâtons et diagramme à bandes (construire, lire effectifs et fréquences).",
      couverture: "complete",
      micros: m("5e", "stat_donnee_organiser", "stat_lire_graphique", "stat_effectif_frequence", "stat_representer", "stat_representation_choisir"),
    },
    {
      code: "C3-L1", domaine: GPLAN,
      texte: "Angles : adjacents, complémentaires, supplémentaires, opposés par le sommet ; somme des angles d'un triangle (calculer le troisième angle).",
      couverture: "complete",
      micros: m("5e", "angle_paires", "triangle_somme_angle"),
    },
    {
      code: "C3-L2", domaine: GPLAN,
      texte: "Segments : caractérisation d'un segment (AM + MB = AB) et de la médiatrice ; médiatrice et milieu à la règle et au compas ; alignement, appartenance à un segment ou à la médiatrice.",
      couverture: "complete",
      micros: [
        ...m("6e", "distance_inegalite", "mediatrice_propriete", "mediatrice_construire", "mediatrice_probleme"),
      ],
    },
    {
      code: "C3-L3", domaine: GPLAN,
      texte: "Triangles : inégalité triangulaire, axes de symétrie et droites particulières des triangles particuliers ; construire et démontrer qu'un triangle est isocèle, équilatéral ou rectangle ; bissectrice au compas.",
      couverture: "complete",
      micros: [
        ...m("5e", "triangle_inegalite", "triangle_nature", "triangle_construire"),
        ...m("6e", "bissectrice_construire", "sym_axe"),
      ],
    },
    {
      code: "C3-L4", domaine: GPLAN,
      texte: "Cercles : point intérieur, sur, extérieur ; disque (AM ≤ r) ; cercle circonscrit à un triangle (cas général et triangle rectangle).",
      couverture: "partielle",
      micros: m("6e", "cercle_ensemble", "cercle_distance", "circonscrit_concourantes", "circonscrit_construire"),
      note: "Le cas du triangle rectangle (centre = milieu de l'hypoténuse) n'a pas de micro dédiée.",
    },
    {
      code: "C3-L5", domaine: GPLAN,
      texte: "Parallélogrammes particuliers : angles consécutifs et opposés, rectangle, losange, carré (définitions, diagonales, réciproques), construire, démontrer ; périmètre et aire du losange.",
      couverture: "partielle",
      micros: [
        ...m("5e", "para_cotes_angles", "para_particuliers", "para_construire"),
        ...m("6e", "quadrilatere_lien_propriete", "quadrilatere_conclusion"),
      ],
      note: "Pas de micro « aire du losange (D × d ÷ 2) ».",
    },
    {
      code: "C3-L6", domaine: GESP,
      texte: "Prisme droit : faces latérales, bases, arêtes, hauteur, patron ; aire latérale, aire totale, volume.",
      couverture: "partielle",
      micros: [
        ...m("5e", "volume_prisme"),
        ...m("6e", "vision_representation"),
      ],
      note: "Pas de micro « aire latérale / aire totale » d'un prisme.",
    },
    {
      code: "C3-L7", domaine: TRANS,
      texte: "Figures symétriques par rapport à une droite : symétrique d'un point, d'une droite, d'un segment, d'un angle, d'un cercle ; axes de symétrie ; propriétés de conservation ; démontrer avec la symétrie.",
      couverture: "complete",
      micros: [
        ...m("6e", "sym_reconnaitre", "sym_point", "sym_figure", "sym_propriete", "sym_axe"),
        ...m("4e", "sym_axiale"),
      ],
    },
  ],
};

export const COTE_DIVOIRE_4E: ProgrammePays = {
  pays: "cote-divoire",
  cle: "4e",
  niveau: "Quatrième",
  equivalentFrance: "4e",
  source: SOURCE,
  version: VERSION,
  contenus: [
    {
      code: "C1-L1", domaine: CALC,
      texte: "Nombres décimaux relatifs : puissances de 10 d'exposant entier relatif, écriture a × 10ᵖ, notation scientifique, ordre d'un décimal, produits (a × 10ᵖ) × (b × 10ᵠ), comparaison.",
      couverture: "complete",
      micros: m("4e", "puissance_exposant_negatif", "puissance_dix", "puissance_notation_scientifique", "puissance_comparer", "puissance_calcul"),
    },
    {
      code: "C1-L2", domaine: CALC,
      texte: "Nombres rationnels : ℚ, décimal en fraction ; somme, différence, produit, quotient, inverse ; PGCD (simplifier, diviseurs communs) et PPCM (même dénominateur) ; valeurs approchées par défaut et par excès, troncature, arrondi ; encadrement.",
      couverture: "partielle",
      micros: [
        ...m("4e", "fraction_rationnel", "fraction_additionner", "fraction_multiplier", "fraction_inverse", "fraction_diviser", "fraction_simplifier"),
        ...m("3e", "entier_pgcd_ppcm"),
        ...m("6e", "decimal_arrondir"),
      ],
      note: "Manquent troncature et valeurs approchées par défaut / par excès d'un rationnel.",
    },
    {
      code: "C1-L3", domaine: CALC,
      texte: "Calcul littéral : développer a(x + y), (a + b)(x + y) ; identités remarquables (a + b)², (a − b)², (a + b)(a − b) ; factoriser ax + ay, ax + ay + bx + by et les expressions remarquables.",
      couverture: "complete",
      micros: m("4e", "litteral_distributivite_simple", "litteral_distributivite_double", "litteral_identite_developper", "litteral_identite_reconnaitre", "litteral_facteur_commun", "litteral_factoriser_simple"),
    },
    {
      code: "C1-L4", domaine: CALC,
      texte: "Équations et inéquations du premier degré dans ℚ : vocabulaire, propriétés des égalités et des inégalités, tester une solution, résoudre, traduire un problème ; inéquations x + a < b, ax + b > c ; solutions sur une droite graduée.",
      couverture: "partielle",
      micros: [
        ...m("4e", "equation_reconnaitre", "equation_traduire", "equation_resoudre_simple", "equation_resoudre_reduction", "equation_verifier", "equation_probleme"),
        ...m("seconde", "inequation_resoudre", "intervalle_representer"),
      ],
      note: "Les inéquations sont chez nous en seconde ; pas de micro « inéquation » au collège.",
    },
    {
      code: "C2-L1", domaine: DONN,
      texte: "Statistique : mode, moyenne d'une série quantitative ; diagramme semi-circulaire (construire, lire, en tirer un tableau).",
      couverture: "partielle",
      micros: [
        ...m("4e", "stat_moyenne", "stat_lire_graphique"),
        ...m("6e", "stat_donnee_lire_circulaire"),
      ],
      note: "Ni le mode ni la construction d'un diagramme semi-circulaire n'ont de micro.",
    },
    {
      code: "C3-L1", domaine: GPLAN,
      texte: "Angles : angle au centre, arcs et cordes de même longueur, longueur d'un arc ; angles alternes-internes et correspondants (propriétés, parallélisme).",
      couverture: "partielle",
      micros: m("5e", "angle_paralleles"),
      note: "Manquent angle au centre, cordes et longueur d'un arc.",
    },
    {
      code: "C3-L2", domaine: GPLAN,
      texte: "Distances : distance d'un point à une droite, de deux droites parallèles ; bissectrice (propriété directe et réciproque : équidistance des côtés), construction au compas.",
      couverture: "partielle",
      micros: m("6e", "bissectrice_definition", "bissectrice_construire", "bissectrice_probleme"),
      note: "Pas de micro « distance d'un point à une droite » ni « bissectrice = points équidistants des côtés ».",
    },
    {
      code: "C3-L3", domaine: GPLAN,
      texte: "Cercles et triangles : tangente à un cercle, positions relatives cercle-droite ; droite des milieux ; hauteurs, médianes, bissectrices ; centre de gravité, orthocentre, cercle inscrit.",
      couverture: "absente",
      micros: [],
      note: "Trou : tangente, droite des milieux, points remarquables (déjà relevé pour le Maroc 2AC). triangle_droites (4e) ne couvre que hauteur et médiatrice.",
    },
    {
      code: "C3-L4", domaine: GPLAN,
      texte: "Vecteurs : direction, sens, longueur, vecteurs égaux et opposés, somme et relation de Chasles ; caractériser le parallélogramme et le milieu.",
      couverture: "complete",
      micros: m("seconde", "vecteur_definition", "vecteur_egalite", "vecteur_somme", "vecteur_chasles_calcul"),
      note: "Chez nous en seconde.",
    },
    {
      code: "C3-L5", domaine: GESP,
      texte: "Perspective cavalière : règles, plans de face, de profil, horizontal ; représenter pavé, prisme, cylindre droits.",
      couverture: "complete",
      micros: [
        ...m("4e", "vision_representation"),
        ...m("3e", "volume_representation"),
      ],
    },
    {
      code: "C3-L6", domaine: TRANS,
      texte: "Symétries et translations : application du plan dans le plan, translation, symétrie orthogonale, symétrie centrale ; images d'un point, d'une droite, d'un segment, d'un angle, d'un cercle ; démontrer (alignement, parallélisme, longueurs, angles).",
      couverture: "complete",
      micros: m("4e", "sym_axiale", "sym_centrale", "sym_translation", "sym_transformation_propriete"),
    },
  ],
};

export const COTE_DIVOIRE_3E: ProgrammePays = {
  pays: "cote-divoire",
  cle: "3e",
  niveau: "Troisième (BEPC)",
  equivalentFrance: "3e",
  source: SOURCE,
  version: VERSION,
  contenus: [
    {
      code: "C1-L1", domaine: CALC,
      texte: "Calcul littéral : polynômes (somme, différence, produit, quotient), puissances d'exposant relatif, produit nul, nombres de même carré, développer, réduire, factoriser, valeur numérique ; fraction rationnelle (condition d'existence, simplification).",
      couverture: "partielle",
      micros: [
        ...m("3e", "litteral_substituer", "litteral_reduire", "litteral_developper", "litteral_factoriser", "litteral_identite", "equation_produit_nul"),
        ...m("4e", "puissance_exposant_negatif"),
      ],
      note: "Les fractions rationnelles (valeurs interdites, simplification) n'ont pas de micro.",
    },
    {
      code: "C1-L2", domaine: CALC,
      texte: "Racines carrées : ℝ, racine carrée d'un positif, √(a²) = |a|, valeur absolue, propriétés (produit, quotient), expressions conjuguées et quotient sans radical au dénominateur, sommes et produits avec radicaux.",
      couverture: "partielle",
      micros: [
        ...m("3e", "entier_racine_comprendre", "entier_racine_calculer"),
        ...m("seconde", "racine_carre_de_a2", "racine_produit", "racine_simplification", "racine_somme", "valeur_absolue_distance"),
      ],
      note: "Manque « rendre rationnel le dénominateur » avec l'expression conjuguée.",
    },
    {
      code: "C1-L3", domaine: CALC,
      texte: "Calcul numérique : intervalles (notation, inégalités, droite graduée, centre, amplitude, intersection et réunion) ; comparer par la différence, les carrés, les inverses ; encadrer un réel ; opérations sur les encadrements ; arrondi d'une racine carrée.",
      couverture: "partielle",
      micros: [
        ...m("seconde", "intervalle_representer", "intervalle_appartenance", "reels_encadrement", "comparer_difference_quotient"),
        ...m("3e", "entier_racine_encadrer"),
      ],
      note: "Manquent centre et amplitude d'un intervalle, réunion / intersection, opérations sur les encadrements.",
    },
    {
      code: "C1-L4", domaine: CALC,
      texte: "Équations et inéquations du premier degré dans ℝ : ax + b = 0, ax + b = cx + d, (ax + b)(cx + d) = 0 ; inéquations ax + b ≥ 0, ax + b < cx + d ; système de deux inéquations ; solutions en intervalles.",
      couverture: "partielle",
      micros: [
        ...m("3e", "equation_resoudre_simple", "equation_resoudre_developper", "equation_produit_nul", "equation_probleme"),
        ...m("seconde", "inequation_resoudre"),
      ],
      note: "Pas de micro « système de deux inéquations à une inconnue ».",
    },
    {
      code: "C1-L5", domaine: CALC,
      texte: "Équations et inéquations du premier degré dans ℝ × ℝ : couples solutions, systèmes de deux équations (substitution, combinaison, graphique) ; résolution graphique d'une inéquation ou d'un système d'inéquations (demi-plans).",
      couverture: "partielle",
      micros: m("seconde", "droite_systeme", "droite_intersection"),
      note: "Les demi-plans (inéquations à deux inconnues) n'ont pas de micro (trou déjà vu au Sénégal et au Québec).",
    },
    {
      code: "C1-L6", domaine: FONC,
      texte: "Applications affines et linéaires : définition, représentation graphique, sens de variation, expression à partir de deux images ou du graphique, image et antécédent (calcul et lecture), proportionnalité et application linéaire.",
      couverture: "complete",
      micros: m("3e", "fonction_affine_lineaire", "affine_reconnaitre", "affine_coeff_directeur", "affine_ordonnee_origine", "affine_calcul_image", "affine_expression", "affine_graphique", "affine_probleme"),
    },
    {
      code: "C2-L1", domaine: DONN,
      texte: "Statistique : classes de même amplitude, classe modale, effectifs et fréquences cumulés croissants, polygone des effectifs cumulés, médiane (discrète et continue, lecture graphique), moyenne d'une série en classes, diagramme circulaire.",
      couverture: "partielle",
      micros: [
        ...m("3e", "stat_effectif_frequence", "stat_moyenne", "stat_mediane", "stat_interpreter"),
        ...m("6e", "stat_donnee_lire_circulaire"),
      ],
      note: "Manquent les séries en classes, les effectifs cumulés et leur polygone, la médiane par lecture graphique.",
    },
    {
      code: "C3-L1", domaine: GPLAN,
      texte: "Triangle rectangle : Pythagore et sa réciproque, relation métrique déduite de l'aire, cosinus, sinus, tangente d'un angle aigu, cos² + sin² = 1, angles complémentaires ; construire un segment de longueur √a.",
      couverture: "partielle",
      micros: [
        ...m("3e", "pythagore_reconnaitre", "pythagore_calculer_hypotenuse", "pythagore_calculer_cote", "pythagore_reciproque", "trigo_cosinus", "trigo_sinus", "trigo_tangente", "trigo_calculer_longueur", "trigo_calculer_angle"),
        ...m("seconde", "geo_trig_identite"),
      ],
      note: "Manque la relation AH × BC = AB × AC (aire) et la construction d'un segment de longueur √a.",
    },
    {
      code: "C3-L2", domaine: GPLAN,
      texte: "Propriétés de Thalès dans un triangle : propriété, conséquence, réciproque ; partager un segment en segments de même longueur ; calculer des distances, démontrer un parallélisme.",
      couverture: "complete",
      micros: m("3e", "thales_configuration", "thales_rapport", "thales_calculer_longueur", "thales_reciproque", "thales_rediger"),
    },
    {
      code: "C3-L3", domaine: GPLAN,
      texte: "Angles inscrits : arc intercepté, angle inscrit et angle au centre associé, deux angles inscrits interceptant le même arc.",
      couverture: "absente",
      micros: [],
      note: "Trou : angles inscrits (retirés du programme français, présents au Sénégal et au Maroc).",
    },
    {
      code: "C3-L4", domaine: GPLAN,
      texte: "Vecteurs : différence, produit par un réel, vecteurs colinéaires, orthogonaux, vecteur directeur ; construire M tel que AM = k AB (vecteurs) ; alignement, parallélisme.",
      couverture: "complete",
      micros: m("seconde", "vecteur_somme", "vecteur_produit_reel", "vecteur_point_defini", "vecteur_colinearite", "vecteur_chasles_calcul"),
    },
    {
      code: "C3-L5", domaine: GPLAN,
      texte: "Coordonnées d'un vecteur : coordonnées d'une somme, d'un produit par un réel, du milieu ; égalité, colinéarité, orthogonalité ; distance de deux points.",
      couverture: "complete",
      micros: [
        ...m("seconde", "vecteur_coordonnees", "repere_milieu", "repere_distance", "vecteur_colinearite"),
        ...m("premiere-spe", "ps_orthogonalite"),
      ],
    },
    {
      code: "C3-L6", domaine: GPLAN,
      texte: "Équations de droites : coefficient directeur (calcul, lecture), équation par deux points, par un point et un vecteur directeur, parallèle ou perpendiculaire à une droite donnée ; appartenance d'un point.",
      couverture: "partielle",
      micros: m("seconde", "droite_pente_ordonne", "droite_vecteur_directeur", "droite_equation_reduite", "droite_parallelisme"),
      note: "La perpendicularité par les coefficients directeurs (a × a′ = −1) n'a pas de micro.",
    },
    {
      code: "C3-L7", domaine: GESP,
      texte: "Pyramides et cônes : pyramide régulière, cône de révolution, patrons, apothème, angle de développement ; volume, aire latérale, aire totale ; troncs ; réduction (coefficient, aires, volumes).",
      couverture: "partielle",
      micros: m("3e", "section_cone_pyramide", "aire_agrandissement_reduction", "volume_agrandissement_reduction"),
      note: "Trou commun : volume et aire latérale de la pyramide et du cône, angle de développement, troncs.",
    },
  ],
};
