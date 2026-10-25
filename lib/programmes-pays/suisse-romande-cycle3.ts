// Suisse romande, CYCLE 3 (9e, 10e, 11e années HarmoS : le secondaire I, fin de
// la scolarité obligatoire). Une seule matrice pour les 7 cantons romands (BE
// francophone, FR, GE, JU, NE, VD, VS).
// Source OFFICIELLE : Plan d'études romand (PER), CIIP, version 3.0 d'août 2024
// (« la version 2024 intégrant l'Éducation numérique est la référence »),
// domaine MSN, discipline Mathématiques, objectifs MSN 31 à MSN 35.
// Site : https://portail.ciip.ch/per (ancien plandetudes.ch, qui y redirige).
// Relevé le 25/10/2026 dans les TABLEAUX « Progression des apprentissages » du
// PER, lus par l'API publique du site :
//   https://per.ciip.ch/api/bdper/objectifs-apprentissage/{45,48,51,54,151}/tableau
// (45 = MSN 31 Espace, 48 = MSN 32 Nombres, 51 = MSN 33 Opérations,
//  54 = MSN 34 Grandeurs et mesures, 151 = MSN 35 Modélisation).
// Au cycle 3, le PER a UNE COLONNE PAR ANNÉE (9e, 10e, 11e) : un contenu va
// dans l'année dont la colonne le porte ; un contenu sur deux ou trois
// colonnes est répété dans chaque année.
// « Niv 1, 2, 3 » : les niveaux d'exigence du PER au cycle 3 (les cantons
// organisent filières ou groupes de niveau ; le niveau 3 est le plus exigeant :
// systèmes, second degré, identités remarquables). On les garde dans le texte.
// Le suffixe « s » (« Niv 1s », « Niv 2s ») n'est pas expliqué dans les
// tableaux relevés : recopié tel quel, sans interprétation.
// Codes : « MSN 32-c » = objectif officiel MSN 32 + une lettre À NOUS (ordre
// des lignes du tableau) ; le PER ne numérote pas les lignes.
// Âges : 1H à 4 ans, 3H à 6 ans (= CP), donc 8H ≈ 6e, 9H ≈ 5e, 10H ≈ 4e,
// 11H ≈ 3e (fin de l'école obligatoire à 15 ans, comme la 3e).
// Ce que le PER n'a PAS au cycle 3 : la trigonométrie (au secondaire II),
// l'algorithmique (dans le domaine Éducation numérique, pas en maths), les
// statistiques au sens moyenne/médiane (seulement lecture et réalisation de
// diagrammes). Il a en plus : systèmes de numération anciens, frises et pavages,
// polygones réguliers, angles inscrits, arcs et secteurs, « formule de Viète ».

import type { Classe } from "@/lib/tutor-v4/catalog";
import type { ContenuPays, Couverture, ProgrammePays, RenvoiMicro } from "./types";

const m = (classe: Classe, ...micros: string[]): RenvoiMicro[] =>
  micros.map((micro) => ({ classe, micro }));

const c = (
  code: string,
  domaine: string,
  texte: string,
  couverture: Couverture,
  micros: RenvoiMicro[],
  note?: string
): ContenuPays => ({ code, domaine, texte, couverture, micros, ...(note ? { note } : {}) });

const ESP = "MSN 31 — Espace";
const NB = "MSN 32 — Nombres";
const OP = "MSN 33 — Opérations (fonctions, algèbre)";
const GM = "MSN 34 — Grandeurs et mesures";
const MOD = "MSN 35 — Modélisation";

const SOURCE = "https://portail.ciip.ch/per";
const VERSION = "Plan d'études romand (CIIP), version 3.0 août 2024, MSN 31 à 35, relevé le 25/10/2026";

// Lignes communes à plusieurs années (même texte dans le PER).
const PROBLEMES = c(
  "MSN 31-34", MOD,
  "Résolution de problèmes (géométriques, numériques, algébriques, de mesurage) : tri des informations, démarche, essais successifs, conjectures, preuves, vérification et communication.",
  "hors-coach", [],
  "Démarche transversale des quatre objectifs ; travaillée dans les défis de chaque notion, pas comme une série à part."
);
const MODELISER = c(
  "MSN 35", MOD,
  "Modéliser des phénomènes naturels, techniques, sociaux ou des situations mathématiques : « cet objectif n'est pas travaillé pour lui-même ».",
  "hors-coach", []
);
const CALCULATRICE = c(
  "MSN 32-a", NB,
  "Connaissance et utilisation des fonctions de la calculatrice (opérations, parenthèses, mémoire, puissance, racine) ; ordre dans lequel elle effectue les calculs.",
  "hors-coach", [],
  "Geste d'outil, pas une série d'exercices."
);
const NUMERATION = c(
  "MSN 32-n", NB,
  "Discernement des ensembles de nombres, découverte de quelques nombres irrationnels ; exploration de systèmes de numération (Rome, Égypte, Babylone, binaire…).",
  "partielle",
  [...m("seconde", "reels_ensembles"), ...m("3e", "fraction_rationnel_reconnaitre", "entier_racine_comprendre")],
  "Ensembles de nombres couverts ; aucune micro sur les numérations anciennes ni le binaire."
);
const ECHELLE_CROQUIS = c(
  "MSN 31-e", ESP,
  "Représentation de figures planes par un croquis et/ou un dessin à l'échelle (y compris 1:1).",
  "partielle",
  m("6e", "echelle_comprendre", "echelle_distance_plan"),
  "Le dessin à l'échelle est couvert, pas le croquis à main levée comme outil de raisonnement."
);
const PERSPECTIVE = c(
  "MSN 31-h", ESP,
  "Représentation de solides en perspective.",
  "complete",
  [...m("6e", "vision_representation"), ...m("4e", "vision_representation")]
);
const ISOMETRIES_SUITE = c(
  "MSN 31-j", ESP,
  "Anticipation de la position d'une figure après une ou plusieurs isométries ; réalisation de frises ou de pavages à l'aide d'isométries.",
  "partielle",
  m("3e", "sym_transformation_effet"),
  "Pas de micro « frise » ni « pavage »."
);
const REPERAGE = c(
  "MSN 31-m", ESP,
  "Systèmes de repérage pour communiquer des positions et des itinéraires, placer des points (plan et espace) ; lire un plan.",
  "complete",
  m("4e", "repere_plan", "repere_espace", "abscisse_placer")
);
const FONCTIONS_BASE = c(
  "MSN 33-c", OP,
  "Fonctions : reconnaître les situations modélisables ; lire et interpréter tableaux de valeurs et graphiques ; représenter une relation entre deux grandeurs par un tableau, un graphique (à la main, tableur, grapheur), un opérateur (« machine ») ; passer de l'opérateur au tableau et du tableau au graphique, et inversement.",
  "complete",
  m("4e", "fonction_reconnaitre", "fonction_programme", "fonction_tableau_lire", "fonction_graphique_lire", "fonction_changer_mode", "fonction_probleme")
);
const DIAGRAMMES_LIRE = c(
  "MSN 33-f", OP,
  "Lecture de données (horaires, statistiques…) et interprétation de diagrammes ; utilisation d'outils (tableur, grapheur).",
  "complete",
  m("5e", "stat_lire_tableau", "stat_lire_graphique", "stat_donnee_organiser")
);
const MESURER = c(
  "MSN 34-a", GM,
  "Comparaison, classement et mesure de grandeurs (longueur, aire, volume, angle, masse), avec des unités conventionnelles et non conventionnelles.",
  "complete",
  [...m("6e", "aire_longueur_mesurer", "aire_comparer", "angle_mesurer", "volume_compter"), ...m("cm2", "masse_comparer")]
);
const MESURE_CULTURE = c(
  "MSN 34-c", GM,
  "Aspects culturels (degré Fahrenheit, mile, pouce, mille marin, nœud…) et historiques (coudée, pied, arpent…) de la mesure.",
  "hors-coach", [],
  "Sensibilisation culturelle ; matière à vidéo plus qu'à exercices."
);

export const SUISSE_9H: ProgrammePays = {
  pays: "suisse",
  cle: "9h",
  niveau: "9e année (9H, cycle 3)",
  equivalentFrance: "5e",
  source: SOURCE,
  version: VERSION,
  contenus: [
    c("MSN 31-b", ESP,
      "Reconnaissance, dénomination, description de figures planes selon leurs propriétés (symétries, côtés, angles, somme des angles, diagonales) et construction de triangles, quadrilatères, cercles.",
      "complete",
      [...m("5e", "triangle_nature", "triangle_construire", "triangle_somme_angle", "para_reconnaitre", "para_diagonales", "para_particuliers", "para_construire"), ...m("6e", "cercle_vocabulaire")]),
    c("MSN 31-c", ESP, "Reconnaissance et dénomination des angles (aigu, obtus, droit, plat).", "complete",
      [...m("6e", "angle_reconnaitre"), ...m("5e", "angle_lire")]),
    c("MSN 31-d", ESP,
      "Propriétés et construction : droites parallèles, perpendiculaires ; hauteur, médiatrice, bissectrice ; cercles inscrit et circonscrit (Niv 1s-2-3) ; médiane, centre de gravité (Niv 2-3).",
      "partielle",
      [...m("cm2", "droite_parallele", "droite_perpendiculaire"), ...m("6e", "mediatrice_construire", "mediatrice_propriete", "bissectrice_construire", "circonscrit_construire"), ...m("4e", "triangle_droites")],
      "Manquent le cercle inscrit, les médianes et le centre de gravité."),
    ECHELLE_CROQUIS,
    c("MSN 31-f", ESP,
      "Reconnaissance, description de solides (faces, sommets, arêtes, polyèdre ou non) : cube, parallélépipède rectangle, prisme droit, cylindre, pyramide.",
      "complete",
      [...m("cm2", "solide_reconnaitre", "solide_sommet_arete_face"), ...m("4e", "vision_reconnaitre")]),
    c("MSN 31-g", ESP, "Développements et construction de solides : cube, parallélépipède rectangle, prisme droit.", "partielle",
      [...m("cm2", "solide_patron"), ...m("6e", "vision_representation")],
      "On reconnaît un patron ; pas de micro qui fait CONSTRUIRE le développement d'un prisme droit."),
    PERSPECTIVE,
    c("MSN 31-i", ESP,
      "Isométries (translation, symétrie axiale, rotation, symétrie centrale) : reconnaissance, caractéristiques (vecteur, axe, centre, conservation des grandeurs), construction de l'image d'une figure.",
      "complete",
      [...m("4e", "sym_axiale", "sym_centrale", "sym_translation", "sym_rotation", "sym_transformation_propriete"), ...m("5e", "sym_centrale_figure")]),
    ISOMETRIES_SUITE,
    c("MSN 31-k", ESP, "Agrandissement et réduction de figures planes en utilisant la proportionnalité (Niv s).", "complete",
      m("4e", "agrandissement_rapport", "echelle_comprendre")),
    REPERAGE,
    CALCULATRICE,
    c("MSN 32-b", NB,
      "Propriétés des nombres naturels : critères de divisibilité, multiples et diviseurs communs ; ppmc, pgdc, nombres premiers, produit de facteurs (Niv 2-3).",
      "complete",
      [...m("5e", "div_multiple_diviseur", "div_critere_2_5_10", "div_critere_3_9", "div_lister_diviseurs"), ...m("4e", "premier_definition", "premier_decomposer"), ...m("3e", "entier_pgcd_ppcm")]),
    c("MSN 32-c", NB,
      "Écritures d'un même nombre ; comparer, approcher, encadrer, placer sur une droite, ordre de grandeur : entiers dans ℤ, décimaux dans ℚ (dans ℚ+ en Niv 1-2).",
      "complete",
      [...m("5e", "relatif_comparer", "relatif_placer"), ...m("6e", "decimal_comparer", "decimal_encadrer", "decimal_arrondir"), ...m("4e", "ordre_estimer")]),
    c("MSN 32-d", NB, "Écriture fractionnaire (simplification et amplification) et pourcentage : comparer, approcher, placer sur une droite.", "complete",
      [...m("5e", "fraction_egale", "fraction_simplifier", "fraction_comparer"), ...m("6e", "fraction_decimal", "pourcentage_fraction", "pourcentage_decimal", "abscisse_fraction")]),
    c("MSN 32-e", NB, "Puissance aᵇ (a décimal, b dans ℕ ; a dans ℚ+ en Niv 1-2, dans ℚ en Niv 3).", "complete",
      m("4e", "puissance_comprendre", "puissance_calculer")),
    NUMERATION,
    c("MSN 32-g", NB, "Priorités des opérations (y compris parenthèses).", "complete",
      [...m("cm2", "calcul_priorite"), ...m("4e", "relatif_calcul")]),
    c("MSN 32-h", NB, "Propriétés des opérations (+, −, ×, ÷) pour calculer efficacement et estimer.", "complete",
      [...m("6e", "entier_strategie_mentale"), ...m("5e", "litteral_distributivite"), ...m("4e", "ordre_estimer")]),
    c("MSN 32-i", NB, "Calcul réfléchi et mental avec des décimaux positifs (+, −, ×, ÷).", "complete",
      m("6e", "entier_addition_mentale", "entier_multiplication_mentale", "entier_division_mentale", "decimal_additionner", "decimal_multiplier_par_01")),
    c("MSN 32-j", NB, "Calcul réfléchi avec les entiers relatifs de −100 à +100 (+, −, ×, ÷) (Niv 2-3).", "complete",
      [...m("5e", "relatif_addition", "relatif_soustraction"), ...m("4e", "relatif_multiplication", "relatif_division")]),
    c("MSN 32-k", NB,
      "Algorithmes de calcul : décimaux positifs inférieurs à 10 000, au plus deux décimales (+, −, ×, ÷) ; fractions positives (+, −) en Niv 3.",
      "partielle",
      [...m("6e", "entier_addition_posee", "entier_soustraction_posee", "entier_multiplication_posee", "entier_division_posee", "decimal_multiplier", "decimal_diviser_par_entier"), ...m("5e", "fraction_additionner")],
      "Pas de micro « diviser par un nombre décimal » (12,6 ÷ 0,3)."),
    PROBLEMES,
    c("MSN 33-a", OP, "Proportionnalité (propriétés, facteur de proportionnalité) : quantité/quantité (prix, poids, devises…), agrandissement et réduction de figures.", "complete",
      m("5e", "prop_reconnaitre", "prop_table", "prop_quatrieme", "prop_coeff", "prop_probleme")),
    FONCTIONS_BASE,
    DIAGRAMMES_LIRE,
    c("MSN 33-g", OP, "Réalisation de diagrammes : diagramme cartésien, en colonnes.", "complete",
      m("5e", "stat_representer", "stat_representation_choisir")),
    c("MSN 33-h", OP, "Règles et conventions usuelles d'écriture algébrique (Niv 2s-3s).", "complete",
      m("5e", "litteral_expression_comprendre")),
    c("MSN 33-i", OP, "Valeur numérique d'une expression littérale en substituant des nombres aux lettres (Niv 2-3).", "complete",
      m("5e", "litteral_substituer")),
    c("MSN 33-j", OP, "Élaboration d'expressions littérales à partir de figures géométriques ou d'expressions verbales (Niv 2s-3s).", "complete",
      m("5e", "litteral_traduire")),
    MODELISER,
    MESURER,
    c("MSN 34-b", GM,
      "Estimer, choisir une unité, mesurer, exprimer dans diverses unités : longueur, angle (degrés), masse, aire ; volume, capacité, temps (Niv s).",
      "complete",
      [...m("6e", "aire_longueur_convertir", "aire_convertir"), ...m("5e", "conversion_decimal", "conversion_duree", "volume_unite"), ...m("cm2", "masse_convertir", "contenance_convertir")]),
    MESURE_CULTURE,
    c("MSN 34-d", GM, "Périmètre d'un polygone.", "complete", [...m("6e", "aire_perimetre_figure"), ...m("cm2", "perimetre_polygone")]),
    c("MSN 34-e", GM, "Aire du carré, du rectangle, du triangle, du parallélogramme, du losange (par décomposition et par formule) ; aire d'un polygone par décomposition.", "partielle",
      [...m("6e", "aire_rectangle", "aire_carre", "aire_decomposer"), ...m("5e", "aire_triangle", "aire_parallelogramme", "aire_composer")],
      "Pas de micro sur l'aire du losange (D × d ÷ 2)."),
    c("MSN 34-f", GM, "Volume et aire du cube et du parallélépipède rectangle ; volume et aire de prismes droits (Niv 2-3).", "partielle",
      m("5e", "volume_pave", "volume_prisme"),
      "Les volumes sont couverts ; pas de micro « aire totale (surface) d'un pavé ou d'un prisme »."),
  ],
};

export const SUISSE_10H: ProgrammePays = {
  pays: "suisse",
  cle: "10h",
  niveau: "10e année (10H, cycle 3)",
  equivalentFrance: "4e",
  source: SOURCE,
  version: VERSION,
  contenus: [
    c("MSN 31-b", ESP, "Figures planes selon leurs propriétés (symétries, côtés, angles, diagonales) et construction : triangles, quadrilatères, cercles.", "complete",
      [...m("4e", "triangle_construire", "triangle_egalite", "quadrilatere_parallelogramme_propriete", "quadrilatere_parallelogramme_diagonale"), ...m("6e", "cercle_vocabulaire")]),
    c("MSN 31-c", ESP, "Polygones réguliers (Niv 1s-2-3) : reconnaître, décrire, construire.", "absente", [],
      "Aucune micro « polygone régulier » (angle au centre 360° ÷ n, construction dans un cercle)."),
    c("MSN 31-d", ESP,
      "Propriétés et construction : parallèles, perpendiculaires ; hauteur, médiatrice, bissectrice ; cercles inscrit et circonscrit (Niv 1s-2-3) ; médiane, centre de gravité (Niv 2-3).",
      "partielle",
      [...m("6e", "mediatrice_construire", "bissectrice_construire", "circonscrit_construire"), ...m("4e", "triangle_droites")],
      "Manquent le cercle inscrit, les médianes et le centre de gravité."),
    ECHELLE_CROQUIS,
    c("MSN 31-f", ESP, "Solides (faces, sommets, arêtes, polyèdre ou non) : cube, parallélépipède rectangle, prisme droit, cylindre, pyramide ; leurs développements (cube, pavé, prisme droit).", "partielle",
      [...m("4e", "vision_reconnaitre", "vision_representation"), ...m("cm2", "solide_patron")],
      "Pas de micro qui fait construire le développement d'un prisme droit."),
    PERSPECTIVE,
    c("MSN 31-i", ESP, "Isométries (translation, symétrie axiale, rotation, symétrie centrale) : reconnaissance, caractéristiques, construction de l'image d'une figure (instruments ou logiciel).", "complete",
      m("4e", "sym_axiale", "sym_centrale", "sym_translation", "sym_rotation", "sym_transformation_propriete", "sym_transformation_defi")),
    ISOMETRIES_SUITE,
    c("MSN 31-k", ESP, "Agrandissement et réduction de figures planes en utilisant la proportionnalité.", "complete",
      m("4e", "agrandissement_rapport", "agrandissement_aire", "triangle_semblable")),
    REPERAGE,
    CALCULATRICE,
    c("MSN 32-a2", NB, "Exploration de situations aléatoires : dénombrer un ensemble de possibilités ; raisonnement probabiliste simple, cas favorables et cas possibles (Niv 3).", "complete",
      [...m("4e", "proba_issue", "proba_evenement", "proba_equiprobabilite", "proba_calculer_fraction"), ...m("3e", "proba_deux_epreuve")]),
    c("MSN 32-b", NB, "ppmc, pgdc, nombres premiers, produit de facteurs premiers (Niv 1).", "complete",
      [...m("4e", "premier_definition", "premier_determiner", "premier_decomposer"), ...m("3e", "entier_pgcd_ppcm")]),
    c("MSN 32-c", NB, "Comparer, encadrer, placer sur une droite des décimaux dans ℚ (Niv 1-2) ; écritures fractionnaire (simplification, amplification) et en pourcentage.", "complete",
      [...m("4e", "fraction_egale", "fraction_simplifier", "fraction_comparer", "fraction_decimal", "abscisse_fraction"), ...m("5e", "relatif_comparer"), ...m("6e", "pourcentage_fraction")]),
    c("MSN 32-e", NB, "Puissance aᵇ (a décimal, b dans ℕ ; a dans ℚ en Niv 2).", "complete",
      m("4e", "puissance_comprendre", "puissance_calculer", "puissance_comparer")),
    c("MSN 32-f", NB, "Notation scientifique a·10ⁿ (n dans ℕ en Niv 1s, dans ℤ en Niv 2-3) ; racine carrée et racine cubique dans ℝ+.", "partielle",
      [...m("4e", "puissance_dix", "puissance_exposant_negatif", "puissance_notation_scientifique"), ...m("3e", "entier_racine_comprendre", "entier_racine_calculer")],
      "Pas de micro « racine cubique »."),
    NUMERATION,
    c("MSN 32-g", NB, "Priorités des opérations (y compris parenthèses).", "complete", m("4e", "relatif_calcul")),
    c("MSN 32-h", NB, "Propriétés des puissances (a, b, m, n dans ℕ) : produit, quotient, puissance de puissance, produit de puissances de même exposant (Niv 2-3).", "complete",
      [...m("4e", "puissance_calcul"), ...m("seconde", "puiss_produit_quotient", "puiss_puissance_puissance")]),
    c("MSN 32-i", NB, "Calcul réfléchi avec des rationnels sous forme décimale (+, −, ×, ÷) (Niv 2-3) ; carrés parfaits pour en extraire la racine.", "complete",
      [...m("6e", "decimal_additionner", "decimal_multiplier"), ...m("4e", "relatif_calcul"), ...m("3e", "entier_racine_carre_parfait")]),
    c("MSN 32-j", NB, "Calcul réfléchi avec les entiers relatifs de −100 à +100 : (+) en Niv 1 ; (+, −, ×, ÷) en Niv 2-3.", "complete",
      m("4e", "relatif_addition", "relatif_soustraction", "relatif_multiplication", "relatif_division")),
    c("MSN 32-k", NB, "Calcul avec des fractions : positives (+, −) en Niv 1-2 ; rationnelles (+, −, ×, ÷) en Niv 3.", "complete",
      m("4e", "fraction_additionner", "fraction_multiplier", "fraction_inverse", "fraction_diviser")),
    PROBLEMES,
    c("MSN 33-a", OP, "Proportionnalité : quantité/quantité (prix, poids, devises…), agrandissement et réduction de figures.", "complete",
      m("4e", "prop_reconnaitre", "prop_table", "prop_coeff", "prop_quatrieme", "prop_probleme")),
    c("MSN 33-b", OP, "Proportionnalité : échelle, pourcentage, pente.", "partielle",
      m("4e", "echelle_distance_reelle", "echelle_distance_plan", "prop_pourcentage", "prop_coeff_multiplicateur"),
      "La pente (d'une route, en %) comme rapport dénivelé / distance horizontale n'a pas de micro."),
    FONCTIONS_BASE,
    c("MSN 33-d", OP, "De l'expression fonctionnelle au tableau de valeurs et au graphique : x→b, x→ax, x→ax+b, x→ax² (a, b dans ℤ) (Niv 2-3).", "complete",
      [...m("3e", "fonction_image", "fonction_tableau", "fonction_graphique", "affine_calcul_image", "affine_graphique"), ...m("seconde", "reference_carre")]),
    DIAGRAMMES_LIRE,
    c("MSN 33-g", OP, "Réalisation de diagrammes : circulaire, en barre (Niv 1s-2-3).", "complete",
      [...m("5e", "stat_representer"), ...m("6e", "stat_donnee_lire_circulaire")]),
    c("MSN 33-h", OP, "Règles d'écriture algébrique (Niv 1s-2-3) ; valeur numérique d'une expression (Niv 1 : bh/2, 4x+5… ; Niv 2-3 : a²+b², 3x²−7, (B+b)h/2, πr²h…).", "complete",
      m("4e", "litteral_expression_comprendre", "litteral_expression_substituer")),
    c("MSN 33-j", OP, "Élaboration d'expressions littérales à partir d'énoncés, de figures ou d'expressions verbales ; interprétation, expressions équivalentes (Niv 2-3).", "complete",
      [...m("4e", "litteral_expression_traduire", "litteral_distributivite_reconnaitre"), ...m("5e", "litteral_tester")]),
    c("MSN 33-k", OP, "Terminologie, écriture réduite et ordonnée de monômes à coefficients entiers, au plus trois indéterminées (degré ≤ 3 en Niv 2, ≤ 6 en Niv 3).", "partielle",
      m("4e", "litteral_expression_reduire"),
      "Le vocabulaire « monôme, coefficient, degré » n'est pas travaillé à part."),
    c("MSN 33-l", OP, "Addition, soustraction, multiplication de monômes et de polynômes (Niv 2-3).", "complete",
      m("4e", "litteral_expression_reduire", "litteral_distributivite_simple", "litteral_distributivite_double", "litteral_distributivite_reduire")),
    c("MSN 33-m", OP, "Problèmes nécessitant l'algèbre : traduction par une équation du premier degré à une inconnue, résolution par les règles d'équivalence (Niv 2-3).", "complete",
      m("4e", "equation_traduire", "equation_resoudre_simple", "equation_resoudre_reduction", "equation_resoudre_distributivite", "equation_verifier", "equation_probleme")),
    MODELISER,
    MESURER,
    c("MSN 34-b", GM, "Estimer, choisir une unité, convertir : volume, capacité, temps ; vitesse (Niv s).", "complete",
      [...m("5e", "volume_unite", "conversion_duree"), ...m("4e", "grandeur_quotient", "grandeur_convertir")]),
    MESURE_CULTURE,
    c("MSN 34-d", GM, "Périmètre et aire d'un disque.", "complete",
      [...m("6e", "cercle_perimetre"), ...m("3e", "aire_perimetre_cercle", "aire_disque")]),
    c("MSN 34-g", GM, "Longueur d'un arc de cercle, aire d'un secteur circulaire (Niv 2-3).", "absente", [],
      "Aucune micro « arc » ni « secteur » (proportionnalité à l'angle)."),
    c("MSN 34-e", GM, "Aire d'un polygone, périmètre et aire d'une surface par décomposition en figures simples.", "complete",
      [...m("4e", "aire_figure", "aire_perimetre_figure"), ...m("5e", "aire_composer")]),
    c("MSN 34-f", GM, "Volume et aire du cylindre (Niv 2-3) ; volume (par décomposition et par formule) et aire de prismes droits ; volume d'un solide décomposé en solides simples.", "partielle",
      [...m("4e", "volume_prisme", "volume_cylindre", "volume_lien_aire"), ...m("5e", "volume_assemblage")],
      "Volumes couverts ; pas de micro « aire latérale ou totale » d'un prisme ou d'un cylindre."),
    c("MSN 34-h", GM, "Calcul d'une grandeur manquante à partir de celles qui sont connues (hauteur d'un triangle à partir de sa base et de son aire…).", "partielle",
      m("4e", "aire_probleme", "aire_perimetre_probleme"),
      "Pas de micro dédiée « retrouver une dimension à partir de l'aire ou du volume »."),
    c("MSN 34-i", GM, "Utilisation du théorème de Pythagore (Niv 2-3).", "complete",
      m("4e", "pythagore_reconnaitre", "pythagore_calculer_hypotenuse", "pythagore_calculer_cote", "pythagore_reciproque_verifier", "pythagore_rediger")),
  ],
};

export const SUISSE_11H: ProgrammePays = {
  pays: "suisse",
  cle: "11h",
  niveau: "11e année (11H, cycle 3)",
  equivalentFrance: "3e",
  source: SOURCE,
  version: VERSION,
  contenus: [
    c("MSN 31-c", ESP, "Polygones réguliers (Niv 1s-2-3) : reconnaître, décrire, construire.", "absente", [],
      "Aucune micro « polygone régulier »."),
    c("MSN 31-d", ESP,
      "Tangente, angle au centre, angle inscrit dans un cercle, angles isométriques (opposés par le sommet, alternes-internes…) (Niv 2s-3) ; cercle de Thalès (Niv 3).",
      "partielle",
      m("5e", "angle_paires", "angle_paralleles"),
      "Angles opposés par le sommet et alternes-internes couverts ; manquent tangente, angle au centre / angle inscrit et cercle de Thalès (triangle inscrit dans un demi-cercle)."),
    ECHELLE_CROQUIS,
    c("MSN 31-f", ESP, "Solides : cône, sphère (reconnaître, nommer, décrire).", "complete",
      m("3e", "volume_solide_reconnaitre", "volume_representation")),
    c("MSN 31-g", ESP, "Développements : cylindre (Niv 1s-2-3), pyramide régulière (Niv 2-3).", "partielle",
      [...m("cm2", "solide_patron"), ...m("6e", "vision_representation")],
      "Reconnaître un patron, oui ; construire celui d'un cylindre (longueur du rectangle = périmètre du disque) ou d'une pyramide, non."),
    PERSPECTIVE,
    c("MSN 31-i", ESP,
      "Caractéristiques et construction de l'image d'une figure par une isométrie, par une homothétie (centre, rapport) (Niv 2-3), par une similitude (Niv 3s).",
      "partielle",
      [...m("3e", "sym_symetrie_translation_rotation", "sym_homothetie_reconnaitre", "sym_homothetie_construire", "sym_homothetie_rapport"), ...m("4e", "triangle_semblable")],
      "La similitude (composée d'une homothétie et d'une isométrie) n'a pas de micro."),
    ISOMETRIES_SUITE,
    REPERAGE,
    CALCULATRICE,
    c("MSN 32-a2", NB, "Situations aléatoires traitées à l'aide de notions de probabilités (Niv 2-3) : dénombrement, cas favorables et cas possibles.", "complete",
      m("3e", "proba_vocabulaire", "proba_issue", "proba_equiprobabilite", "proba_calculer", "proba_evenement_contraire", "proba_deux_epreuve")),
    c("MSN 32-f", NB, "Notation scientifique a·10ⁿ ; racine carrée et racine cubique dans ℝ+.", "partielle",
      m("3e", "entier_puissance_ecriture_scientifique", "entier_racine_comprendre", "entier_racine_encadrer"),
      "Pas de micro « racine cubique »."),
    NUMERATION,
    c("MSN 32-h", NB, "Racines carrées (cubiques), y compris extraction d'entiers : √(a·b) = √a·√b, √(a/b) = √a/√b, √(a²·b) = a√b (Niv 3).", "partielle",
      m("seconde", "racine_produit", "racine_simplification", "racine_carre_de_a2"),
      "Les racines carrées sont couvertes (micros de seconde), pas les racines cubiques."),
    c("MSN 32-i", NB, "Calcul réfléchi avec des rationnels sous forme décimale (Niv 2-3) ; carrés parfaits pour en extraire la racine.", "complete",
      [...m("4e", "relatif_calcul"), ...m("3e", "entier_racine_carre_parfait")]),
    c("MSN 32-j", NB, "Calcul réfléchi avec les entiers relatifs de −100 à +100 (+, −, ×, ÷) (Niv 1).", "complete",
      m("4e", "relatif_addition", "relatif_soustraction", "relatif_multiplication", "relatif_division")),
    c("MSN 32-k", NB, "Calcul avec des fractions : positives (+, −, ×, ÷) en Niv 2 ; rationnelles (+, −, ×, ÷) en Niv 1-2.", "complete",
      [...m("4e", "fraction_additionner", "fraction_multiplier", "fraction_diviser"), ...m("3e", "fraction_rationnel_calculer")]),
    PROBLEMES,
    c("MSN 33-b", OP, "Proportionnalité : échelle, pourcentage, pente.", "partielle",
      m("3e", "prop_pourcentage", "prop_evolution", "prop_quatrieme"),
      "La pente (en %) n'a pas de micro."),
    c("MSN 33-c2", OP, "Proportionnalité : vitesse moyenne ; masse volumique (Niv 1s-2-3) ; débit (Niv 3).", "complete",
      [...m("3e", "prop_vitesse_debit"), ...m("4e", "grandeur_quotient", "grandeur_unite_composee")]),
    FONCTIONS_BASE,
    c("MSN 33-d", OP,
      "De l'expression fonctionnelle au tableau et au graphique : x→b, ax, ax+b, ax² (Niv 1, a, b dans ℤ) ; en Niv 2-3 aussi x→a/x, x³, ax²+bx+c, √x (Niv 3s), a, b, c dans ℚ.",
      "complete",
      [...m("3e", "fonction_image", "fonction_tableau", "fonction_graphique", "affine_graphique"), ...m("seconde", "reference_carre", "reference_inverse", "reference_cube", "reference_racine")]),
    c("MSN 33-e", OP, "De la représentation graphique à l'expression fonctionnelle : x→b, x→ax, x→ax+b (a, b dans ℚ) (Niv 2-3).", "complete",
      [...m("3e", "affine_coeff_directeur", "affine_ordonnee_origine", "affine_expression"), ...m("seconde", "affine_determiner_expression")]),
    DIAGRAMMES_LIRE,
    c("MSN 33-g", OP, "Réalisation de diagrammes : circulaire, en barre (Niv 1s-2-3).", "complete",
      [...m("5e", "stat_representer"), ...m("6e", "stat_donnee_lire_circulaire")]),
    c("MSN 33-h", OP, "Règles d'écriture algébrique (Niv 1) ; valeur numérique d'une expression (a²+b², 4(x+y+z), πr²h…).", "complete",
      m("3e", "litteral_comprendre", "litteral_substituer")),
    c("MSN 33-j", OP, "Élaboration d'expressions littérales à partir d'énoncés, de figures ou d'expressions verbales (Niv 1s, Niv 2-3) ; interprétation, expressions équivalentes (Niv 2-3).", "complete",
      [...m("4e", "litteral_expression_traduire"), ...m("seconde", "expr_modeliser")]),
    c("MSN 33-k", OP, "Terminologie, écriture réduite et ordonnée de polynômes de degré ≤ 3, au plus trois indéterminées (coefficients entiers en Niv 2, rationnels en Niv 3).", "partielle",
      m("3e", "litteral_reduire"),
      "Le vocabulaire « polynôme, degré, ordonné » n'est pas travaillé à part."),
    c("MSN 33-l", OP, "Opérations : réduction de polynômes du premier degré à une indéterminée (Niv 1) ; addition, soustraction, multiplication de polynômes (Niv 2-3).", "complete",
      m("3e", "litteral_reduire", "litteral_developper")),
    c("MSN 33-l2", OP, "Identités remarquables de degré 2, décomposition de polynômes en produit de facteurs, calcul littéral comme outil de preuve dans des cas simples (Niv 3).", "complete",
      [...m("3e", "litteral_identite", "litteral_factoriser"), ...m("4e", "litteral_identite_developper", "litteral_factoriser_simple")]),
    c("MSN 33-m", OP, "Traduction d'une situation par une équation du premier degré à une inconnue (Niv 1s, Niv 2) ; résolution à l'aide des règles d'équivalence (Niv 1, Niv 2).", "complete",
      m("3e", "equation_reconnaitre", "equation_resoudre_simple", "equation_resoudre_developper", "equation_verifier", "equation_probleme")),
    c("MSN 33-n", OP, "Système de deux équations du premier degré à deux inconnues : traduction d'une situation, résolution par combinaison linéaire et par substitution (Niv 3).", "partielle",
      m("seconde", "droite_systeme"),
      "Une seule micro (seconde) ; pas de micro qui distingue combinaison et substitution, ni de mise en équation d'un problème à deux inconnues."),
    c("MSN 33-o", OP, "Équation du deuxième degré à une inconnue : traduction d'une situation ; résolution par factorisation ou à l'aide de la formule de Viète (Niv 3).", "complete",
      [...m("3e", "equation_produit_nul", "litteral_factoriser"), ...m("premiere-spe", "sd_discriminant", "sd_racines")],
      "La « formule de Viète » du PER = la formule de résolution avec le discriminant (micros de 1re spé)."),
    c("MSN 33-p", OP, "Exprimer chacune des variables d'une formule connue en fonction des autres (Niv 2-3) : d = vt, A = bh/2, A = πr², p = 2(a+b)…", "complete",
      m("seconde", "expr_exprimer_variable")),
    MODELISER,
    MESURER,
    c("MSN 34-b", GM, "Estimer, choisir une unité, convertir : volume, capacité, temps ; vitesse et autres grandeurs (débit, masse volumique…) (Niv 1s-2-3).", "complete",
      [...m("4e", "grandeur_quotient", "grandeur_unite_composee", "grandeur_convertir"), ...m("3e", "volume_unite")]),
    MESURE_CULTURE,
    c("MSN 34-g", GM, "Longueur d'un arc de cercle, aire d'un secteur circulaire (Niv 2-3).", "absente", [],
      "Aucune micro « arc » ni « secteur »."),
    c("MSN 34-e", GM, "Périmètre et aire d'une surface par décomposition en figures simples.", "complete",
      m("3e", "aire_perimetre_figure_composee", "aire_figure_composee")),
    c("MSN 34-f", GM, "Volume du cylindre (Niv 1) ; volume et aire de prismes droits (Niv 1) ; volume d'un solide décomposé en solides simples.", "partielle",
      [...m("3e", "volume_cylindre", "volume_prisme"), ...m("5e", "volume_assemblage")],
      "Pas de micro « aire latérale ou totale » d'un prisme."),
    c("MSN 34-f2", GM, "Volume et aire d'une pyramide (Niv 2-3) et d'une sphère (Niv 3) ; volume d'un cône (Niv 2-3).", "partielle",
      m("3e", "volume_boule"),
      "Volume de la boule couvert ; manquent le volume de la pyramide et du cône (trou commun à tous les pays) et l'aire de la sphère."),
    c("MSN 34-h", GM, "Calcul d'une grandeur manquante à partir de celles qui sont connues.", "partielle",
      [...m("4e", "aire_probleme"), ...m("seconde", "expr_exprimer_variable")],
      "Pas de micro dédiée « retrouver une dimension à partir de l'aire ou du volume »."),
    c("MSN 34-i", GM, "Utilisation du théorème de Pythagore (Niv 1 ; Niv 2-3), y compris dans l'espace (Niv 3).", "complete",
      m("3e", "pythagore_reconnaitre", "pythagore_calculer_hypotenuse", "pythagore_calculer_cote", "pythagore_reciproque", "pythagore_solide")),
    c("MSN 34-j", GM, "Proportionnalité des figures semblables et théorème de Thalès (Niv 2-3).", "complete",
      [...m("3e", "thales_configuration", "thales_rapport", "thales_calculer_longueur", "thales_reciproque"), ...m("4e", "triangle_semblable")]),
  ],
};
