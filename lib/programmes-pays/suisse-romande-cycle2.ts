// Suisse romande, CYCLE 2 (5e à 8e années HarmoS, primaire, 8 à 12 ans).
// Source OFFICIELLE : Plan d'études romand (PER), CIIP, version 3.0 d'août 2024,
// domaine MSN, discipline Mathématiques, objectifs MSN 21 à MSN 25.
// Site : https://portail.ciip.ch/per (ancien plandetudes.ch).
// Relevé le 25/10/2026 dans les tableaux « Progression des apprentissages »,
// lus par l'API publique du site :
//   https://per.ciip.ch/api/bdper/objectifs-apprentissage/{40,41,42,43,154}/tableau
// (40 = MSN 21 Espace, 41 = MSN 22 Nombres, 42 = MSN 23 Opérations,
//  43 = MSN 24 Grandeurs et mesures, 154 = MSN 25 Modélisation).
// ⚠️ Au cycle 2, le PER n'a que DEUX colonnes : « 5e – 6e années » et
// « 7e – 8e années ». Il ne dit pas ce qui se fait en 5H plutôt qu'en 6H :
// on fait donc UNE matrice par paire d'années (clés 5-6h et 7-8h), sans
// inventer de partage. Codes : objectif officiel + une lettre à nous.
// Âges : 5H = 8 ans (CE2), 6H = CM1, 7H = CM2, 8H = 6e. Les micros viennent
// des classes françaises du même âge (CE2-CM1 pour 5-6H, CM2-6e pour 7-8H).
// Domaine numérique : naturels de 0 à 10 000 en 5-6H ; naturels et rationnels
// positifs en 7-8H. Le PER du cycle 2 ne CALCULE pas avec les fractions
// (comparer des fractions unitaires ou de même dénominateur, moitié = 0,5…) :
// le calcul fractionnaire arrive au cycle 3.

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

const ESP = "MSN 21 — Espace";
const NB = "MSN 22 — Nombres";
const OP = "MSN 23 — Opérations";
const GM = "MSN 24 — Grandeurs et mesures";
const MOD = "MSN 25 — Modélisation";

const SOURCE = "https://portail.ciip.ch/per";
const VERSION = "Plan d'études romand (CIIP), version 3.0 août 2024, MSN 21 à 25, relevé le 25/10/2026";

const PROBLEMES = c(
  "MSN 21-24", MOD,
  "Résolution de problèmes (géométriques, numériques, de mesurage) : tri des informations, démarche, essais successifs, conjecture, déduction, vérification et communication.",
  "hors-coach", [],
  "Démarche transversale ; travaillée dans les défis de chaque notion."
);
const MODELISER = c("MSN 25", MOD, "Représenter des phénomènes naturels, techniques, sociaux ou des situations mathématiques : « cet objectif n'est pas travaillé pour lui-même ».", "hors-coach", []);
const CALCULATRICE = c("MSN 23-c", OP,
  "Calculatrice : fonctions de base, ordre dans lequel elle effectue les opérations ; l'utiliser quand le calcul est secondaire ou pour vérifier, accepter ou refuser l'affichage par l'ordre de grandeur.",
  "hors-coach", [], "Geste d'outil.");
const FRISES = c("MSN 21-j", ESP,
  "Réalisation de frises, de pavages à l'aide d'isométries sur papier à réseau ou avec du matériel (calque, ciseaux, miroir…).",
  "absente", [], "Pas de micro « frise » ni « pavage ».");
const ESTIMER_COLLECTION = c("MSN 22-b", NB, "Estimation du nombre d'objets d'une collection (perception globale…).", "partielle",
  m("ce2", "ce2_add_sous_estimer"), "Estimer une QUANTITÉ vue d'un coup d'œil n'a pas de micro ; on estime des résultats de calcul.");
const NUMERATIONS = c("MSN 22-n", NB, "Exploration de différentes écritures de nombres et de systèmes de numération, présents ou passés.", "absente", [],
  "Pas de micro sur les numérations (romaine, égyptienne, maya…).");
const MESURAGE = c("MSN 24-a", GM,
  "Organisation d'un mesurage, choix d'une unité (conventionnelle ou non) et d'une procédure ; estimation de grandeurs : longueur, aire, volume, masse, temps.",
  "complete",
  [...m("ce2", "ce2_longueur_choisir_unite", "ce2_longueur_estimer", "ce2_masse_choisir_unite", "ce2_masse_estimer"), ...m("cm1", "longueur_estimer", "masse_estimer")]);
const UNITES_AILLEURS = c("MSN 24-u", GM, "Exploration d'unités de mesure d'autres pays et d'autres époques.", "hors-coach", [],
  "Sensibilisation culturelle.");

export const SUISSE_5_6H: ProgrammePays = {
  pays: "suisse",
  cle: "5-6h",
  niveau: "5e – 6e années (5H-6H, cycle 2)",
  equivalentFrance: "ce2",
  source: SOURCE,
  version: VERSION,
  contenus: [
    c("MSN 21-a", ESP, "Figures planes (triangle, carré, rectangle, losange, cercle) : reconnaître, décrire, nommer selon leurs propriétés (symétries, parallélisme, isométrie…).", "complete",
      [...m("ce2", "ce2_figure_reconnaitre", "ce2_figure_losange", "ce2_figure_proprietes", "ce2_figure_cercle"), ...m("cm1", "figure_quadrilatere")]),
    c("MSN 21-b", ESP, "Décomposition d'une surface plane en surfaces élémentaires et recomposition.", "partielle",
      m("cm1", "aire_composer"), "Couvert par l'aire ; pas de micro de découpage-recomposition sans mesure (tangram)."),
    c("MSN 21-c", ESP, "Croquis de figures planes ; dessin de carrés et de rectangles à la règle graduée.", "complete",
      m("ce2", "ce2_figure_construire")),
    c("MSN 21-d", ESP, "Reconnaissance du parallélisme et de la perpendicularité.", "complete",
      [...m("ce2", "ce2_droite_perpendiculaire"), ...m("cm1", "droite_parallele", "droite_perpendiculaire")]),
    c("MSN 21-e", ESP, "Solides (cube, pyramide, parallélépipède rectangle) : reconnaître, décrire, nommer selon faces, sommets, arêtes ; lien entre un solide et son développement (avec du matériel).", "complete",
      m("ce2", "ce2_solide_reconnaitre", "ce2_solide_decrire", "ce2_solide_faces_pyramide", "ce2_solide_patron")),
    c("MSN 21-f", ESP, "Isométries : observation des propriétés (variants, invariants) ; repérage des axes de symétrie d'une figure ; reproduction par translation ou symétrie axiale avec du matériel.", "partielle",
      [...m("ce2", "ce2_symetrie_axe", "ce2_symetrie_completer"), ...m("cm1", "symetrie_axe", "symetrie_propriete")],
      "La translation (glisser une figure sur quadrillage) n'a pas de micro au primaire."),
    FRISES,
    c("MSN 21-k", ESP, "Code personnel pour mémoriser et communiquer des itinéraires de son environnement familier.", "complete",
      [...m("ce2", "ce2_reperage_deplacement", "ce2_reperage_plan"), ...m("cm1", "reperage_deplacement")]),
    c("MSN 22-a", NB, "Dénombrer une collection par comptage organisé, groupements par 10, 100, 1000 ; constituer une collection d'un nombre donné ; compter et décompter de 1 en 1, de 10 en 10, de 100 en 100, de 1000 en 1000.", "complete",
      [...m("ce2", "ce2_entier_milliers", "ce2_suite_continuer"), ...m("ce1", "ce1_entier_denombrer", "ce1_entier_construire_collection", "ce1_suite_pas")]),
    ESTIMER_COLLECTION,
    c("MSN 22-c", NB, "Exploration de l'infiniment grand.", "hors-coach", [], "Exploration ouverte."),
    c("MSN 22-d", NB, "Comparer, classer, encadrer, intercaler des nombres (0 à 10 000) ; les lire et représenter sur une bande numérique.", "complete",
      m("ce2", "ce2_entier_comparer", "ce2_entier_encadrer", "ce2_entier_droite")),
    c("MSN 22-e", NB, "Produire le nombre plus petit ou plus grand d'une unité, d'une dizaine, d'une centaine, d'un millier ; extraire le nombre entier de dizaines, centaines, milliers.", "complete",
      [...m("ce2", "ce2_suite_regle", "ce2_entier_decomposer"), ...m("cm1", "entier_decomposer")]),
    c("MSN 22-f", NB, "Passer du mot-nombre (oral ou écrit) à l'écriture chiffrée et à la décomposition en unités, dizaines, centaines, milliers, et inversement.", "complete",
      m("ce2", "ce2_entier_lire_ecrire", "ce2_entier_decomposer")),
    NUMERATIONS,
    PROBLEMES,
    c("MSN 23-a", OP, "Traduire les données d'un problème en opérations (additions, soustractions, multiplications) ; lire un tableau de valeurs pour en extraire des informations.", "complete",
      [...m("ce2", "ce2_probleme_choisir_operation", "ce2_probleme_deux_etapes", "ce2_donnees_lire_tableau"), ...m("cm1", "tableau_lire")]),
    c("MSN 23-b", OP, "Problèmes additifs et soustractifs (EEE, ECE, ETE : composition, comparaison, transformation).", "complete",
      m("ce2", "ce2_probleme_une_etape", "ce2_probleme_comparaison", "ce2_probleme_schema_barre")),
    c("MSN 23-b2", OP, "Problèmes multiplicatifs et divisifs : itération, produit cartésien, produit de mesures, proportionnalité.", "complete",
      [...m("ce2", "ce2_probleme_comparaison_multiplicative", "ce2_probleme_produit_cartesien", "ce2_division_probleme"), ...m("cm1", "prop_probleme")]),
    CALCULATRICE,
    c("MSN 23-d", OP, "Multiples d'un nombre ; critères de divisibilité par 2, 5, 10, 100.", "partielle",
      m("cm1", "entier_multiple"), "Pas de micro « critères de divisibilité » au primaire (5e : div_critere_2_5_10)."),
    c("MSN 23-e", OP, "Reconnaître et établir des suites arithmétiques.", "complete",
      [...m("ce2", "ce2_suite_regle", "ce2_suite_croissante_decroissante"), ...m("cm1", "suite_regle")]),
    c("MSN 23-f", OP, "Propriétés de l'addition et de la multiplication (commutativité, associativité), décompositions des nombres pour calculer efficacement et estimer ; outils de calcul (réfléchi, algorithmes, répertoire, calculatrice).", "complete",
      m("ce2", "ce2_calcul_decomposer", "ce2_calcul_distributivite", "ce2_add_sous_estimer", "ce2_calcul_fluence")),
    c("MSN 23-g", OP, "Algorithmes (calcul posé) de l'addition, de la soustraction, de la multiplication.", "complete",
      [...m("ce2", "ce2_addition_posee", "ce2_soustraction_posee", "ce2_multiplication_posee"), ...m("cm1", "multiplication_posee")]),
    c("MSN 23-h", OP, "Mémorisation du répertoire soustractif (0−0 à 19−9) et du répertoire multiplicatif (0×0 à 9×9).", "complete",
      [...m("ce2", "ce2_calcul_complements", "ce2_tables_2_3_4_5_10", "ce2_tables_6_7_8_9"), ...m("cm1", "tables_melangees")]),
    MODELISER,
    MESURAGE,
    c("MSN 24-b", GM, "Comparer, classer, mesurer des grandeurs (longueur, aire, volume, masse) par manipulation, avec des unités non conventionnelles.", "complete",
      [...m("ce2", "ce2_longueur_comparer", "ce2_masse_comparer", "ce2_contenance_comparer"), ...m("cm1", "aire_comprendre")]),
    c("MSN 24-c", GM, "Mesurer une longueur à la règle graduée, communiquer le résultat par un nombre ou un encadrement ; unités cm et m.", "complete",
      m("ce2", "ce2_longueur_mesurer", "ce2_longueur_unites", "ce2_longueur_relations")),
    UNITES_AILLEURS,
  ],
};

export const SUISSE_7_8H: ProgrammePays = {
  pays: "suisse",
  cle: "7-8h",
  niveau: "7e – 8e années (7H-8H, cycle 2)",
  equivalentFrance: "cm2",
  source: SOURCE,
  version: VERSION,
  contenus: [
    c("MSN 21-a", ESP, "Figures planes (triangles, quadrilatères, cercle) : reconnaître, décrire, nommer selon leurs propriétés (symétries, parallélisme, isométrie…).", "complete",
      [...m("cm2", "figure_reconnaitre", "figure_triangle", "figure_quadrilatere", "figure_cercle", "figure_propriete"), ...m("6e", "quadrilatere_identifier_nature", "triangle_type_cote")]),
    c("MSN 21-b", ESP, "Décomposition d'une surface plane en surfaces élémentaires et recomposition.", "complete",
      [...m("cm2", "aire_composer"), ...m("6e", "aire_decomposer")]),
    c("MSN 21-c", ESP, "Croquis ; construction des figures planes courantes aux instruments (règle, équerre, compas, rapporteur).", "complete",
      [...m("cm2", "figure_construire"), ...m("6e", "triangle_sommet_cote", "quadrilatere_completer_construire", "angle_tracer")]),
    c("MSN 21-d", ESP, "Construction de droites parallèles et perpendiculaires.", "complete",
      m("cm2", "droite_parallele", "droite_perpendiculaire", "droite_tracer")),
    c("MSN 21-e", ESP, "Solides (cube, parallélépipède rectangle, pyramide) selon faces, sommets, arêtes, vérification de propriétés ; construction de solides selon des critères ; développements du cube et du pavé.", "complete",
      [...m("cm2", "solide_reconnaitre", "solide_sommet_arete_face", "solide_face", "solide_patron")]),
    c("MSN 21-e2", ESP, "Interpréter la représentation en perspective d'un solide ou d'un assemblage ; ébauches de perspective.", "complete",
      m("6e", "vision_vues", "vision_denombrer", "vision_representation")),
    c("MSN 21-f", ESP,
      "Isométries (translation, symétrie axiale, rotation) : reconnaître, décrire, nommer ; anticiper la position d'une figure ; axes de symétrie d'une figure ; reproduire par une isométrie avec du matériel ; construire par translation ou symétrie axiale aux instruments.",
      "partielle",
      [...m("cm2", "symetrie_axe", "symetrie_construire", "symetrie_propriete"), ...m("6e", "sym_figure", "sym_axe")],
      "La symétrie axiale est très couverte ; translation et rotation n'ont de micros qu'en 4e (sym_translation, sym_rotation)."),
    FRISES,
    c("MSN 21-g", ESP, "Agrandissement et réduction de figures planes sur papier à réseau.", "partielle",
      m("cm2", "echelle_comprendre"), "Pas de micro d'agrandissement sur quadrillage au primaire (4e : agrandissement_rapport)."),
    c("MSN 21-k", ESP, "Système de repérage personnel ou conventionnel (plan) pour communiquer positions et itinéraires ; orienter un plan, une carte à partir de repères.", "complete",
      m("cm2", "reperage_quadrillage", "reperage_coordonnees", "reperage_placer_point", "reperage_deplacement")),
    ESTIMER_COLLECTION,
    c("MSN 22-c", NB, "Exploration de l'infiniment grand et de l'infiniment petit.", "hors-coach", [], "Exploration ouverte."),
    c("MSN 22-d", NB, "Comparer, classer, encadrer, intercaler des nombres décimaux ; les représenter et lire sur une droite graduée.", "complete",
      [...m("cm2", "decimal_comparer", "decimal_ordonner", "decimal_droite", "decimal_arrondir"), ...m("6e", "decimal_encadrer", "abscisse_placer")]),
    c("MSN 22-e", NB, "Relations entre nombres (dix fois plus, cent fois plus, une dizaine de moins…) ; extraire le nombre entier de dizaines, centaines, milliers, et de dixièmes, centièmes, millièmes.", "complete",
      [...m("cm2", "decimal_valeur_chiffre", "multiplication_puissance_dix"), ...m("6e", "decimal_rang", "entier_rang")]),
    c("MSN 22-g", NB, "Comparer, classer des fractions unitaires ou de même dénominateur.", "complete",
      m("cm2", "fraction_comparer", "fraction_droite")),
    c("MSN 22-h", NB, "Explorer, comparer, placer sur une droite graduée des entiers relatifs (températures, niveaux, pertes, ligne du temps).", "complete",
      m("5e", "relatif_lire", "relatif_comparer", "relatif_placer"),
      "Chez nous en 5e."),
    c("MSN 22-f", NB, "Mot-nombre ↔ écriture chiffrée ↔ décomposition (jusqu'aux millièmes, au plus 3 décimales).", "complete",
      [...m("cm2", "entier_lire", "entier_decomposer", "decimal_lire"), ...m("6e", "decimal_lire_ecrire")]),
    c("MSN 22-i", NB, "Diverses écritures d'un même nombre (la moitié = 1/2 = 0,5 = 5 dixièmes…) ; moitié, tiers, quart, trois quarts, dixième d'une quantité.", "complete",
      [...m("cm2", "fraction_decimale", "decimal_fraction", "fraction_equivalente", "fraction_quantite"), ...m("6e", "fraction_decimal")]),
    c("MSN 22-j", NB, "Écriture des nombres à l'aide de puissances (8 = 2³…).", "complete",
      m("4e", "puissance_comprendre"), "Chez nous en 4e."),
    NUMERATIONS,
    PROBLEMES,
    c("MSN 23-a", OP, "Traduire un problème en opérations (+, −, ×, ÷), avec parenthèses au besoin ; lire, utiliser et élaborer des tableaux de valeurs ; lire des représentations graphiques.", "complete",
      m("cm2", "probleme_choisir_operation", "probleme_plusieurs_etapes", "calcul_priorite", "tableau_lire", "tableau_completer", "graphique_lire")),
    c("MSN 23-b", OP, "Problèmes additifs et soustractifs (EEE, ECE, ETE, TTT : composition, comparaison, transformations).", "complete",
      m("cm2", "probleme_une_etape", "probleme_plusieurs_etapes", "algebre_schema_barre")),
    c("MSN 23-b2", OP, "Problèmes multiplicatifs et divisifs : itération, produit cartésien, produit de mesures, proportionnalité.", "complete",
      m("cm2", "multiplication_probleme", "division_probleme", "prop_probleme", "prop_quatrieme")),
    CALCULATRICE,
    c("MSN 23-d", OP, "Multiples et diviseurs d'un nombre ; critères de divisibilité par 2, 3, 5, 9, 10, 100.", "complete",
      [...m("cm2", "entier_multiple"), ...m("5e", "div_multiple_diviseur", "div_critere_2_5_10", "div_critere_3_9", "div_lister_diviseurs")]),
    c("MSN 23-e", OP, "Suites numériques et leur loi de formation (progressions, multiples, puissances…).", "complete",
      m("cm2", "suite_continuer", "suite_regle", "algebre_motif")),
    c("MSN 23-f", OP, "Propriétés de l'addition et de la multiplication (commutativité, associativité, distributivité) et décompositions pour calculer efficacement et estimer.", "complete",
      [...m("cm2", "calcul_mental", "multiplication_mental"), ...m("6e", "entier_strategie_mentale")]),
    c("MSN 23-g", OP,
      "Algorithmes avec des décimaux < 10 000 : addition et soustraction (au plus 2 décimales), multiplication (au plus 2 décimales), division euclidienne (dividende < 10 000, diviseur < 100), division décimale (au plus une décimale aux termes, deux au quotient).",
      "partielle",
      [...m("cm2", "calcul_decimal_addition", "calcul_decimal_soustraction", "division_posee", "division_reste"), ...m("6e", "decimal_multiplier", "decimal_diviser_par_entier")],
      "Diviser par un diviseur DÉCIMAL (ex. 12,6 ÷ 0,3) n'a pas de micro."),
    c("MSN 23-h", OP, "Mémorisation du répertoire multiplicatif de 0×0 à 12×12.", "partielle",
      m("cm1", "tables_melangees", "tables_trous"), "Nos tables s'arrêtent à 10 × 10 : manquent 11 et 12."),
    MODELISER,
    MESURAGE,
    c("MSN 24-b", GM, "Comparer, classer, mesurer longueur, aire, volume, masse avec des unités conventionnelles et non conventionnelles ; doubler, tripler, fractionner une grandeur (moitié, tiers, quart…).", "complete",
      [...m("cm2", "longueur_comparer", "masse_comparer", "aire_comprendre"), ...m("6e", "volume_compter", "fraction_quantite")]),
    c("MSN 24-c", GM, "Mesurer une longueur à la règle et un angle au rapporteur (nombre ou encadrement).", "complete",
      [...m("cm2", "angle_mesurer"), ...m("6e", "aire_longueur_mesurer", "angle_mesurer")]),
    c("MSN 24-d", GM, "Calcul de longueurs, de trajets et de périmètres.", "complete",
      [...m("cm2", "perimetre_polygone", "perimetre_quadrilatere"), ...m("6e", "aire_perimetre_figure")]),
    c("MSN 24-e", GM, "Aire (mesures entières) du carré, du rectangle ; du triangle, du parallélogramme, du losange et d'autres surfaces par décomposition et recomposition.", "partielle",
      [...m("cm2", "aire_carre_rectangle", "aire_triangle_rectangle", "aire_composer"), ...m("5e", "aire_triangle", "aire_parallelogramme")],
      "Pas de micro sur l'aire du losange."),
    c("MSN 24-f", GM, "Volume du cube et du parallélépipède rectangle (mesures entières).", "complete",
      [...m("6e", "volume_compter"), ...m("5e", "volume_pave")]),
    c("MSN 24-g", GM, "Unités conventionnelles : longueur (mm à km), aire (cm², dm², m²), volume (cm³, dm³, m³), angle (degrés) ; même grandeur en différentes unités (km↔m, t↔kg, h↔min, l↔dl…).", "complete",
      [...m("cm2", "longueur_convertir", "masse_convertir", "contenance_convertir", "duree_convertir"), ...m("6e", "aire_convertir", "volume_unite")]),
    UNITES_AILLEURS,
  ],
};
