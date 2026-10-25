// Belgique, Fédération Wallonie-Bruxelles : le TRONC COMMUN au secondaire (S1, S2, S3).
// Source OFFICIELLE : « Référentiel de mathématiques — Tronc commun », Fédération
// Wallonie-Bruxelles, Administration générale de l'Enseignement, juin 2022 (annexe IV
// de l'arrêté du Gouvernement du 9 septembre 2021 fixant les référentiels du tronc
// commun, confirmé par le décret du 22 juin 2022 ; texte légal sur gallilex.cfwb.be,
// document 49935). PDF : https://ifpc.cfwb.be/v5/documents/tc/refMATH.pdf (157 p.,
// texte lisible). Relevé le 25/10/2026 : 1re secondaire p. 108-119, 2e p. 120-129,
// 3e p. 130-137.
// Entrée en vigueur progressive : P1-P2 en 2022, P3-P4 en 2023, P5 en 2024… et la
// 3e secondaire en 2028 (les « Socles de compétences » restent la référence des
// années pas encore atteintes). Le tronc commun va de la 1re primaire (6 ans) à la
// 3e secondaire (14-15 ans) : S1 a l'âge de notre 5e, S3 celui de notre 3e.
// Le référentiel n'a pas de codes par énoncé : il range chaque année en CHAMPS
// (1 géométrie, 2 grandeurs, 3 nombres et algèbre, 4 données et statistique) et
// sous-champs numérotés (« 1.2 »), chacun avec ses SAVOIRS, SAVOIR-FAIRE et
// COMPÉTENCES, chaque intitulé détaillé en « attendus ». Code retenu ici :
// sous-champ + Sv (savoir), SF (savoir-faire) ou C (compétence) + rang dans le
// référentiel (« 1.2 SF2 » = 2e savoir-faire du sous-champ 1.2). Texte = l'intitulé
// suivi des attendus abrégés. Pas de probabilités ni d'algorithmique au tronc commun.

import type { Classe } from "@/lib/tutor-v4/catalog";
import type { ProgrammePays, RenvoiMicro } from "./types";

const m = (classe: Classe, ...micros: string[]): RenvoiMicro[] =>
  micros.map((micro) => ({ classe, micro }));

const GEO = "Des objets de l'espace à la géométrie";
const GRA = "Des grandeurs à la relation entre variables";
const NBR = "De l'arithmétique à l'algèbre";
const STA = "De l'organisation des données à la statistique";

const SOURCE = "https://ifpc.cfwb.be/v5/documents/tc/refMATH.pdf";
const VERSION = "Référentiel de mathématiques du tronc commun, FWB, juin 2022 (AGCF du 9/09/2021)";

export const BELGIQUE_S1: ProgrammePays = {
  pays: "belgique",
  cle: "s1",
  niveau: "1re secondaire",
  equivalentFrance: "5e",
  source: SOURCE,
  version: VERSION,
  contenus: [
    { code: "1.1 Sv1", domaine: GEO, texte: "Les systèmes de repérage, du quadrillage au repère orthonormé : axes perpendiculaires, unités, origine.", couverture: "complete", micros: m("4e", "repere_plan") },
    { code: "1.1 SF1", domaine: GEO, texte: "Situer, placer un point dans un repère orthonormé : abscisse, ordonnée, coordonnées.", couverture: "complete", micros: [...m("4e", "repere_plan"), ...m("seconde", "repere_coordonnees_point")] },
    {
      code: "1.1 C1", domaine: GEO, texte: "Placer un ensemble de points qui vérifient une relation entre abscisse et ordonnée dite en langage courant (« l'ordonnée est le double de l'abscisse »).",
      couverture: "partielle", micros: [...m("4e", "repere_plan", "prop_graphique")],
      note: "Pas de micro qui fasse placer une famille de points définie par une phrase.",
    },
    {
      code: "1.2 Sv1", domaine: GEO, texte: "Les figures, leurs composantes, caractéristiques et propriétés : triangles, quadrilatères, polygones réguliers, angles particuliers ; médiatrice, bissectrice, droites remarquables du triangle (identifier, définir, propriétés) ; quadrilatères à axe(s) ou centre de symétrie.",
      couverture: "partielle",
      micros: [
        ...m("6e", "triangle_type_cote", "triangle_type_angle", "quadrilatere_identifier_nature", "angle_reconnaitre", "mediatrice_definition", "bissectrice_definition", "circonscrit_concourantes", "sym_axe"),
        ...m("5e", "para_diagonales"),
        ...m("4e", "triangle_droites"),
      ],
      note: "Manquent les polygones réguliers, les médianes et hauteurs concourantes (centre de gravité, orthocentre).",
    },
    { code: "1.2 SF1", domaine: GEO, texte: "Interpréter et utiliser les symboles géométriques : point, segment, demi-droite, droite, angle, parallèles, perpendiculaires ; codage.", couverture: "partielle", micros: m("6e", "distance_definition"), note: "Seule la notation (AB), [AB], AB est entraînée ; ni // ni ⊥ ni le codage des figures." },
    {
      code: "1.2 SF2", domaine: GEO, texte: "Construire des figures : mesurer et construire un angle au rapporteur ; triangle (côté et deux angles, deux côtés et l'angle compris, trois côtés), isocèle, équilatéral ; losange, parallélogramme.",
      couverture: "complete", micros: [...m("6e", "angle_mesurer", "angle_tracer", "quadrilatere_completer_construire"), ...m("5e", "triangle_construire", "para_construire")],
    },
    {
      code: "1.2 SF3", domaine: GEO, texte: "Construire la médiatrice, la bissectrice, les droites remarquables d'un triangle ou d'un quadrilatère, les axes et le centre de symétrie d'une figure simple.",
      couverture: "partielle", micros: [...m("6e", "mediatrice_construire", "bissectrice_construire", "circonscrit_construire", "sym_axe"), ...m("5e", "sym_centrale_figure")],
      note: "Pas de construction des hauteurs et des médianes.",
    },
    { code: "1.2 C1", domaine: GEO, texte: "Construire une figure complexe dont les étapes sont données ; rédiger les étapes de construction d'une figure complexe.", couverture: "partielle", micros: m("4e", "triangle_construire"), note: "Le protocole n'est entraîné que pour le triangle." },
    {
      code: "1.3 Sv1", domaine: GEO, texte: "Des mouvements (glisser, pivoter, retourner) vers les isométries : symétrie orthogonale, symétrie centrale, translation, rotation ; leurs éléments caractéristiques et leurs invariants.",
      couverture: "complete", micros: [...m("6e", "sym_reconnaitre"), ...m("5e", "sym_centrale_reconnaitre"), ...m("4e", "sym_translation", "sym_rotation", "sym_transformation_propriete")],
    },
    {
      code: "1.3 Sv2", domaine: GEO, texte: "Les angles et leurs propriétés : complémentaires, supplémentaires, opposés par le sommet ; somme des angles d'un triangle et d'un quadrilatère.",
      couverture: "partielle", micros: [...m("5e", "angle_paires", "triangle_somme_angle")], note: "La somme des angles d'un quadrilatère (360°) n'a pas de micro.",
    },
    {
      code: "1.3 SF1", domaine: GEO, texte: "Construire l'image d'un triangle ou d'un quadrilatère par les quatre isométries (rotation de ±90°) ; retrouver les éléments caractéristiques quand la figure et son image sont données.",
      couverture: "partielle", micros: [...m("6e", "sym_figure"), ...m("5e", "sym_centrale_figure"), ...m("4e", "sym_translation", "sym_rotation")],
      note: "Retrouver l'axe, le centre ou la translation à partir d'une figure et de son image n'est pas entraîné.",
    },
    { code: "1.3 SF2", domaine: GEO, texte: "Déterminer l'amplitude d'un angle avec les angles complémentaires, supplémentaires, opposés par le sommet et la somme des angles du triangle et du quadrilatère.", couverture: "complete", micros: [...m("5e", "angle_paires", "triangle_somme_angle"), ...m("6e", "triangle_angle_manquant")] },
    { code: "1.3 SF3", domaine: GEO, texte: "Utiliser des propriétés pour construire : terminer une figure sous contraintes (droites remarquables, symétries) ; cercle inscrit et cercle circonscrit à un triangle.", couverture: "partielle", micros: m("6e", "circonscrit_construire", "quadrilatere_completer_construire"), note: "Le cercle inscrit (bissectrices) manque." },
    { code: "1.3 SF4", domaine: GEO, texte: "Justifier l'amplitude d'un angle en utilisant des propriétés.", couverture: "partielle", micros: [...m("5e", "angle_paires"), ...m("6e", "bissectrice_probleme")], note: "On calcule l'angle, on ne rédige pas la justification." },
    {
      code: "1.3 C1", domaine: GEO, texte: "Articuler propriétés et constructions : figure dont les axes, le centre, une diagonale, des médiatrices ou des bissectrices sont donnés ; problèmes d'angles et d'isométries justifiés ; montrer que deux figures sont (ou ne sont pas) isométriques.",
      couverture: "partielle", micros: [...m("6e", "mediatrice_defi", "bissectrice_defi"), ...m("5e", "para_defi"), ...m("4e", "sym_transformation_defi")],
    },
    {
      code: "2.1 Sv1", domaine: GRA, texte: "Périmètres et aires : périmètre du triangle équilatéral, du rectangle, du carré, du cercle ; liens entre les formules d'aire du rectangle, du parallélogramme, du trapèze, du triangle, du losange ; aire du disque.",
      couverture: "partielle", micros: [...m("6e", "aire_perimetre_rectangle", "aire_perimetre_carre", "cercle_perimetre", "aire_rectangle"), ...m("5e", "aire_triangle", "aire_parallelogramme"), ...m("3e", "aire_disque")],
      note: "Pas de micro pour l'aire du trapèze ni du losange (formules D × d / 2 et (B + b) × h / 2).",
    },
    {
      code: "2.1 SF1", domaine: GRA, texte: "Calculer périmètres et aires : côté d'un polygone régulier de périmètre donné, périmètre du cercle, aire d'une figure simple, décomposition d'une surface complexe.",
      couverture: "complete", micros: [...m("6e", "aire_perimetre_figure", "cercle_perimetre"), ...m("5e", "aire_composer"), ...m("3e", "aire_disque", "aire_figure_composee")],
    },
    {
      code: "2.1 C1", domaine: GRA, texte: "Résoudre des problèmes d'aire et de périmètre de figures simples ou complexes en contexte ; représenter une figure de même aire qu'une figure donnée.",
      couverture: "partielle", micros: [...m("6e", "aire_probleme", "aire_perimetre_probleme"), ...m("3e", "aire_figure_composee")], note: "Construire une figure équivalente (même aire) n'est pas entraîné.",
    },
    { code: "2.2 SF1", domaine: GRA, texte: "Exploiter des fractions partages et des pourcentages : additionner deux fractions d'une même grandeur ; calculer un pourcentage en contexte.", couverture: "complete", micros: [...m("6e", "fraction_additionner", "pourcentage_calcul_simple"), ...m("5e", "prop_pourcentage")] },
    { code: "2.2 C1", domaine: GRA, texte: "Résoudre des problèmes à deux pourcentages ou plus : comparer des offres, pourcentages successifs (10 % de 30 %, −10 % puis +20 %).", couverture: "complete", micros: [...m("4e", "prop_evolution", "prop_coeff_multiplicateur"), ...m("seconde", "info_pourcentage_de_pourcentage", "info_evolutions_successives")] },
    { code: "2.3 Sv1", domaine: GRA, texte: "La proportionnalité directe : grandeurs « multiples l'une de l'autre » ; reconnaître et justifier à partir d'un texte, d'un tableau ou d'un graphique.", couverture: "complete", micros: [...m("5e", "prop_reconnaitre"), ...m("4e", "prop_graphique")] },
    { code: "2.3 SF1", domaine: GRA, texte: "Exploiter la proportionnalité directe : passer du tableau au graphique et inversement, liens multiplicatifs, compléter un tableau.", couverture: "complete", micros: [...m("5e", "prop_table", "prop_coeff"), ...m("4e", "prop_graphique")] },
    { code: "2.3 C1", domaine: GRA, texte: "Résoudre des situations de proportionnalité directe : construire tableau ou graphique en contexte, résoudre un problème.", couverture: "complete", micros: m("5e", "prop_probleme", "prop_quatrieme") },
    {
      code: "3.1 Sv1", domaine: NBR, texte: "Des naturels aux réels : placer entiers et décimaux et leurs opposés sur la droite graduée ; naturel, entier, rationnel ; fraction nombre = quotient ; écritures décimale, fractionnaire, pourcentage ; 10ⁿ et les préfixes kilo, méga, giga ; opposé, inverse.",
      couverture: "complete",
      micros: [...m("5e", "relatif_placer", "relatif_oppose", "fraction_rationnel"), ...m("6e", "fraction_decimal", "pourcentage_decimal"), ...m("4e", "ordre_prefixe", "puissance_dix", "fraction_inverse"), ...m("seconde", "reels_ensembles")],
    },
    { code: "3.1 Sv2", domaine: NBR, texte: "La relation d'ordre : symboles <, >, = et position sur une droite graduée orientée.", couverture: "complete", micros: [...m("5e", "relatif_comparer"), ...m("6e", "entier_comparer")] },
    { code: "3.1 Sv3", domaine: NBR, texte: "L'approximation : valeur exacte, valeurs approchées par défaut et par excès, arrondi ; lire l'écriture décimale d'une calculatrice.", couverture: "partielle", micros: [...m("6e", "decimal_arrondir", "decimal_encadrer"), ...m("seconde", "reels_encadrement")], note: "Le vocabulaire « par défaut / par excès » n'est pas travaillé pour lui-même." },
    { code: "3.1 Sv4", domaine: NBR, texte: "La lettre et ses statuts : coefficient, inconnue, terme indépendant, termes semblables ; conventions d'écriture (3x = 3.x, a = 1a).", couverture: "complete", micros: m("5e", "litteral_expression_comprendre", "litteral_reduire") },
    { code: "3.1 SF1", domaine: NBR, texte: "Dire, lire, écrire les nombres sous différentes formes : écriture fractionnaire ↔ écriture décimale.", couverture: "complete", micros: [...m("6e", "fraction_decimal"), ...m("4e", "fraction_decimal")] },
    { code: "3.1 SF2", domaine: NBR, texte: "Comparer, encadrer (unité, dixième, centième), ordonner des entiers et des rationnels ; les placer sur une droite graduée.", couverture: "complete", micros: [...m("5e", "relatif_comparer", "relatif_placer", "fraction_comparer"), ...m("6e", "decimal_encadrer", "abscisse_fraction")] },
    {
      code: "3.1 SF3", domaine: NBR, texte: "Généraliser des régularités : suites numériques ou de motifs (rang, terme, relation rang → nombre d'éléments) ; traduire « nombre pair, multiple de… augmenté de… » ; expression algébrique d'un périmètre ou d'une aire.",
      couverture: "complete", micros: [...m("6e", "algebre_motif"), ...m("5e", "litteral_traduire", "litteral_expression_comprendre"), ...m("seconde", "arith_multiple_diviseur")],
    },
    {
      code: "3.2 Sv1", domaine: NBR, texte: "Les opérations et leurs propriétés : vocabulaire (terme, facteur, dividende, reste, base, exposant) ; addition d'entiers sur la droite ; règles des signes pour × et ÷ ; puissance à exposant naturel ; commutativité, associativité, neutre, absorbant ; justifier le calcul mental (×5, ×9, ×11) ; carrés jusqu'à 15² ; principes d'équivalence d'une égalité.",
      couverture: "partielle",
      micros: [...m("5e", "relatif_addition"), ...m("4e", "relatif_multiplication", "relatif_division", "puissance_comprendre", "pythagore_carre_racine"), ...m("6e", "entier_strategie_mentale"), ...m("3e", "entier_racine_carre_parfait")],
      note: "Les propriétés nommées (commutativité, neutre, absorbant) et le vocabulaire des opérations ne sont pas des micros.",
    },
    { code: "3.2 SF1", domaine: NBR, texte: "Exploiter des expressions algébriques : réduire les termes semblables, produit de monômes du 1er degré ; valeur numérique.", couverture: "complete", micros: [...m("5e", "litteral_reduire", "litteral_substituer"), ...m("4e", "litteral_expression_reduire")] },
    { code: "3.2 SF2", domaine: NBR, texte: "Résoudre une équation ax = b, ax + b = c (a, b, c entiers), vérifier la solution, écrire une équation de solution donnée.", couverture: "complete", micros: m("4e", "equation_resoudre_simple", "equation_verifier") },
    {
      code: "3.2 SF3", domaine: NBR, texte: "Procédures de calcul : fractions équivalentes, simplifier, rendre irréductible ; les quatre opérations sur les entiers ; propriétés et distributivité ; priorités ; puissance de base et exposant naturels.",
      couverture: "complete", micros: [...m("5e", "fraction_egale", "fraction_simplifier", "litteral_distributivite"), ...m("4e", "relatif_calcul", "puissance_calculer"), ...m("cm2", "calcul_priorite")],
    },
    { code: "3.2 SF4", domaine: NBR, texte: "Utiliser une calculatrice ; estimer l'ordre de grandeur d'un résultat ; vérifier sa plausibilité.", couverture: "partielle", micros: [...m("4e", "ordre_estimer", "ordre_vraisemblance"), ...m("6e", "entier_calcul_verifier")], note: "L'usage de la calculatrice n'est pas entraîné par le coach." },
    { code: "3.2 C1", domaine: NBR, texte: "Résoudre des problèmes : traduire par un schéma, une expression ou une équation ; associer une situation à une équation ; rédiger un énoncé.", couverture: "complete", micros: [...m("6e", "algebre_barres"), ...m("4e", "equation_traduire", "equation_probleme")] },
    {
      code: "4.1 Sv1", domaine: STA, texte: "Notions de statistique : population, variable (qualitative ou quantitative), modalités, effectifs, fréquences, étendue ; diagramme en bâtonnets, à bandes, circulaire.",
      couverture: "partielle", micros: [...m("5e", "stat_donnee_organiser", "stat_effectif_frequence", "stat_representation_choisir"), ...m("4e", "stat_etendue")],
      note: "Le vocabulaire population / variable / modalité et la nature de la variable ne sont pas travaillés en tant que tels.",
    },
    { code: "4.1 Sv2", domaine: STA, texte: "Les paramètres de position : la moyenne arithmétique (variable discrète).", couverture: "complete", micros: m("5e", "stat_moyenne") },
    { code: "4.1 SF1", domaine: STA, texte: "Traiter, calculer, présenter : effectif total, effectif et fréquence d'une modalité, moyenne ; relier liste, tableau de distribution et diagrammes ; diagramme en bâtonnets et à bandes.", couverture: "complete", micros: m("5e", "stat_effectif_frequence", "stat_moyenne", "stat_representer", "stat_lire_tableau") },
    { code: "4.1 C1", domaine: STA, texte: "Lire et interpréter des données : interpréter une valeur en contexte, lire plusieurs supports, choisir l'information pertinente.", couverture: "complete", micros: [...m("5e", "stat_lire_graphique"), ...m("6e", "stat_donnee_prelever", "stat_donnee_interpreter"), ...m("4e", "stat_interpreter")] },
  ],
};

export const BELGIQUE_S2: ProgrammePays = {
  pays: "belgique",
  cle: "s2",
  niveau: "2e secondaire",
  equivalentFrance: "4e",
  source: SOURCE,
  version: VERSION,
  contenus: [
    {
      code: "1.1 Sv1", domaine: GEO, texte: "Les solides et leurs représentations planes : cylindre, cube, parallélépipède rectangle, pyramide, prisme droit, cône ; figures vues en perspective cavalière ; vues coordonnées ; éléments en vraie grandeur.",
      couverture: "partielle", micros: [...m("4e", "vision_reconnaitre", "vision_vues", "vision_representation"), ...m("3e", "volume_representation")],
      note: "Repérer ce qui est en vraie grandeur dans une perspective n'est pas entraîné.",
    },
    { code: "1.1 SF1", domaine: GEO, texte: "Relier vues coordonnées et perspective cavalière d'un solide ou d'un assemblage ; représenter cube, pavé, pyramide en perspective ; dessiner une vue d'un prisme.", couverture: "partielle", micros: [...m("4e", "vision_vues", "vision_representation"), ...m("6e", "vision_vues")], note: "On lit les représentations ; on ne les trace pas." },
    { code: "1.1 C1", domaine: GEO, texte: "Nature de la section d'un cube ou d'un pavé (plan parallèle à une face ou passant par trois sommets) et sa vraie grandeur ; vue d'un assemblage de prismes.", couverture: "partielle", micros: [...m("3e", "section_pave_cube", "section_calculer_longueur"), ...m("6e", "vision_denombrer")], note: "La section par trois sommets n'est pas couverte." },
    { code: "1.2 Sv1", domaine: GEO, texte: "Des agrandissements et réductions vers les figures semblables : isométriques, agrandies ou déformées ; variants et invariants ; effet sur le périmètre et l'aire.", couverture: "complete", micros: m("4e", "agrandissement_rapport", "agrandissement_aire", "triangle_semblable") },
    {
      code: "1.2 Sv2", domaine: GEO, texte: "Distances et lieux géométriques : distance entre deux points, entre deux parallèles, d'un point à une droite ; parallèles, médiatrice, bissectrice et cercle définis comme lieux.",
      couverture: "partielle", micros: [...m("6e", "distance_definition", "mediatrice_propriete", "cercle_ensemble"), ...m("seconde", "geo_projete_orthogonal")],
      note: "Manquent la bissectrice comme lieu des points équidistants des côtés et les parallèles comme lieu.",
    },
    { code: "1.2 Sv3", domaine: GEO, texte: "Les angles : correspondants, alternes-internes, alternes-externes ; propriétés des parallèles coupées par une sécante.", couverture: "complete", micros: m("5e", "angle_paralleles") },
    { code: "1.2 SF1", domaine: GEO, texte: "Réaliser des agrandissements et réductions : construire l'image (coefficient donné), trouver le coefficient, périmètre et aire de l'image.", couverture: "complete", micros: [...m("4e", "agrandissement_rapport", "agrandissement_aire"), ...m("3e", "aire_agrandissement_reduction", "sym_homothetie_construire")] },
    { code: "1.2 SF2", domaine: GEO, texte: "Déterminer des amplitudes d'angles avec la somme des angles d'un polygone et les parallèles coupées par une sécante.", couverture: "partielle", micros: m("5e", "angle_paralleles", "triangle_somme_angle"), note: "La somme des angles d'un polygone, (n − 2) × 180°, manque." },
    { code: "1.2 SF3", domaine: GEO, texte: "Représenter la distance entre deux parallèles ou d'un point à une droite ; construire un lieu de points sous une contrainte de distance.", couverture: "partielle", micros: m("6e", "cercle_distance", "mediatrice_probleme") },
    { code: "1.2 SF4", domaine: GEO, texte: "Justifier l'amplitude d'un angle en utilisant une propriété.", couverture: "partielle", micros: m("5e", "angle_paralleles", "angle_paires"), note: "Le calcul est entraîné, pas la rédaction." },
    { code: "1.2 C1", domaine: GEO, texte: "Problèmes de lieux géométriques, d'angles justifiés, de périmètre et d'aire d'une figure agrandie ; justifier chaque étape d'une construction.", couverture: "partielle", micros: [...m("6e", "circonscrit_defi"), ...m("5e", "angle_defi"), ...m("4e", "echelle_defi")] },
    { code: "2.1 Sv1", domaine: GRA, texte: "Les volumes : formules du parallélépipède rectangle, du cube, du prisme droit, du cylindre.", couverture: "complete", micros: m("5e", "volume_pave", "volume_prisme", "volume_cylindre") },
    { code: "2.1 SF1", domaine: GRA, texte: "Calculer le volume d'un cube, d'un pavé, d'un prisme droit, d'un cylindre, d'un solide complexe décomposé.", couverture: "complete", micros: m("5e", "volume_pave", "volume_prisme", "volume_cylindre", "volume_assemblage") },
    { code: "2.1 C1", domaine: GRA, texte: "Résoudre des problèmes de volumes de solides simples ou complexes en contexte.", couverture: "complete", micros: [...m("5e", "volume_defi"), ...m("4e", "volume_unite")] },
    {
      code: "2.2 Sv1", domaine: GRA, texte: "La proportionnalité directe : rôle du coefficient, écriture y = a.x, signe du coefficient et (dé)croissance ; reconnaître et justifier (texte, tableau, graphique, expression analytique).",
      couverture: "complete", micros: [...m("4e", "prop_relation", "prop_coeff", "prop_graphique"), ...m("3e", "fonction_affine_lineaire")],
    },
    { code: "2.2 SF1", domaine: GRA, texte: "Exploiter la proportionnalité : associer tableau, graphique et expression analytique ; calculer avec y = a.x ; construire tableau et graphique ; calculer le coefficient.", couverture: "complete", micros: m("4e", "prop_relation", "prop_graphique", "prop_table", "prop_coeff") },
    { code: "2.2 C1", domaine: GRA, texte: "Résoudre des problèmes de proportionnalité directe par différentes stratégies.", couverture: "complete", micros: m("4e", "prop_probleme", "prop_quatrieme") },
    { code: "3.1 Sv1", domaine: NBR, texte: "Des naturels aux réels : le dixième = 10⁻¹, le centième = 10⁻², le millième = 10⁻³ ; conventions d'écriture algébrique.", couverture: "complete", micros: m("4e", "puissance_exposant_negatif", "puissance_dix") },
    { code: "3.1 SF1", domaine: NBR, texte: "Généraliser : expression algébrique du terme d'une suite selon son rang, l'utiliser ; traduire une situation ou une phrase ; expression d'un périmètre, d'une aire, d'un volume.", couverture: "complete", micros: [...m("4e", "litteral_expression_traduire", "litteral_expression_substituer"), ...m("6e", "algebre_motif")] },
    {
      code: "3.2 Sv1", domaine: NBR, texte: "Opérations et propriétés : règles des quatre opérations sur les fractions ; parité de l'exposant quand la base est négative ; distributivité et sa figure ; propriétés des puissances (énoncer, justifier) ; 10⁻ⁿ inverse de 10ⁿ ; solution d'une équation, principes d'équivalence.",
      couverture: "partielle", micros: [...m("4e", "fraction_additionner", "fraction_multiplier", "fraction_diviser", "puissance_calcul", "litteral_identite_lier_distributivite", "equation_reconnaitre")],
      note: "Justifier les propriétés des opérations et des puissances n'est pas entraîné.",
    },
    {
      code: "3.2 SF1", domaine: NBR, texte: "Transformer une expression : réduire, supprimer les parenthèses, produit de facteurs, propriétés des puissances ; distributivité simple et double, carré d'une somme, d'une différence, binômes conjugués ; valeur numérique.",
      couverture: "complete", micros: m("4e", "litteral_expression_reduire", "litteral_distributivite_simple", "litteral_distributivite_double", "litteral_identite_developper", "puissance_calcul", "litteral_expression_substituer"),
    },
    { code: "3.2 SF2", domaine: NBR, texte: "Résoudre ax = b, ax + b = c, ax + b = cx + d (coefficients entiers ou rationnels), vérifier, écrire deux équations de solution donnée.", couverture: "complete", micros: m("4e", "equation_resoudre_reduction", "equation_resoudre_distributivite", "equation_verifier") },
    { code: "3.2 SF3", domaine: NBR, texte: "Calculer : les quatre opérations sur les fractions, propriétés et priorités avec des rationnels, puissance de base entière ou fractionnaire.", couverture: "complete", micros: [...m("4e", "fraction_additionner", "fraction_multiplier", "fraction_diviser", "relatif_calcul", "puissance_calculer"), ...m("3e", "fraction_rationnel_calculer")] },
    { code: "3.2 SF4", domaine: NBR, texte: "Calculatrice (puissances), ordre de grandeur, plausibilité d'un résultat.", couverture: "partielle", micros: m("4e", "ordre_estimer", "ordre_vraisemblance"), note: "La calculatrice elle-même n'est pas entraînée." },
    { code: "3.2 C1", domaine: NBR, texte: "Résoudre des problèmes avec les outils algébriques ; traduire une situation par une expression ou une équation ; rédiger un énoncé.", couverture: "complete", micros: m("4e", "equation_probleme", "equation_traduire", "litteral_expression_traduire") },
    {
      code: "4.1 Sv1", domaine: STA, texte: "Vocabulaire : population, échantillon, variable, modalité, effectif et effectif cumulé, fréquence et fréquence cumulée, étendue ; moyenne, mode, médiane (variable discrète).",
      couverture: "partielle", micros: m("4e", "stat_effectif", "stat_frequence", "stat_moyenne", "stat_mediane", "stat_etendue"), note: "Effectifs et fréquences cumulés, mode et échantillon n'ont pas de micro.",
    },
    {
      code: "4.1 SF1", domaine: STA, texte: "Traiter, calculer, présenter : tableau de distribution (groupé ou non), effectif à partir de la fréquence, moyenne, mode, médiane ; diagrammes en bâtonnets, à bandes, circulaire ; diagramme par outil numérique.",
      couverture: "partielle", micros: [...m("4e", "stat_frequence", "stat_moyenne", "stat_mediane"), ...m("5e", "stat_representer"), ...m("6e", "stat_construire_tableau")],
      note: "Manquent les cumulés, les classes, le mode et la construction du diagramme circulaire.",
    },
    { code: "4.1 C1", domaine: STA, texte: "Lire et interpréter : modalité répondant à « au moins », « au plus » ; décrire dans plusieurs registres ; choisir un paramètre ou un support.", couverture: "complete", micros: [...m("4e", "stat_interpreter", "stat_lire_graphique", "stat_probleme"), ...m("5e", "stat_representation_choisir")] },
  ],
};

export const BELGIQUE_S3: ProgrammePays = {
  pays: "belgique",
  cle: "s3",
  niveau: "3e secondaire",
  equivalentFrance: "3e",
  source: SOURCE,
  version: VERSION,
  contenus: [
    { code: "1.1 Sv1", domaine: GEO, texte: "Vers les figures semblables : configuration de Thalès, égalités de rapports, parallélisme justifié par des rapports égaux.", couverture: "complete", micros: m("3e", "thales_configuration", "thales_rapport", "thales_reciproque") },
    { code: "1.1 Sv2", domaine: GEO, texte: "Distances : condition d'existence d'un triangle (inégalité triangulaire), vérifier si trois longueurs conviennent.", couverture: "complete", micros: m("3e", "triangle_inegalite") },
    { code: "1.1 Sv3", domaine: GEO, texte: "Le théorème de Pythagore : l'énoncer, écrire les relations d'un triangle rectangle donné.", couverture: "complete", micros: [...m("3e", "pythagore_reconnaitre"), ...m("4e", "pythagore_calculer_hypotenuse")] },
    {
      code: "1.1 SF1", domaine: GEO, texte: "Calculer : longueur par Thalès ou triangles semblables ; longueurs possibles du 3e côté ; côtés d'un triangle rectangle ; distance de deux points dans un repère ; diagonale d'un rectangle, d'un cube, d'un pavé.",
      couverture: "complete", micros: [...m("3e", "thales_calculer_longueur", "triangle_inegalite", "pythagore_calculer_hypotenuse", "pythagore_calculer_cote", "pythagore_solide"), ...m("4e", "triangle_semblable"), ...m("seconde", "repere_distance")],
    },
    { code: "1.1 SF2", domaine: GEO, texte: "Justifier : parallélisme par des longueurs, constructibilité d'un triangle, triangle rectangle (réciproque de Pythagore) ou non (contraposée).", couverture: "complete", micros: [...m("3e", "thales_reciproque", "pythagore_reciproque", "triangle_inegalite"), ...m("4e", "pythagore_reciproque_conclure")] },
    { code: "1.1 C1", domaine: GEO, texte: "Résoudre un problème avec Thalès ou Pythagore et justifier chaque étape en langage courant et mathématique.", couverture: "complete", micros: m("3e", "thales_rediger", "pythagore_rediger", "thales_defi", "pythagore_defi") },
    {
      code: "2.1 Sv1", domaine: GRA, texte: "Du proportionnel à la relation entre variables : sur un graphique, image, zéro, ordonnée à l'origine, minimum, maximum, croissance, signe ; fonction du 1er degré : zéro, ordonnée à l'origine, signe et valeur du taux de variation, trois représentations, reconnaître le modèle linéaire.",
      couverture: "complete",
      micros: [...m("3e", "fonction_graphique", "affine_reconnaitre", "affine_coeff_directeur", "affine_ordonnee_origine"), ...m("seconde", "variation_croissance", "variation_extremum", "graph_tableau_signes")],
    },
    {
      code: "2.1 SF1", domaine: GRA, texte: "Exploiter des fonctions : lire images, zéros, extremums, intervalles de croissance et de signe ; image et antécédent ; tracer le graphique ; appartenance d'un point ; résoudre graphiquement une équation du 1er degré ; taux de variation ; tableau de signes.",
      couverture: "complete",
      micros: [...m("3e", "fonction_image", "fonction_antecedent", "affine_calcul_image", "affine_graphique", "affine_coeff_directeur"), ...m("seconde", "graph_resoudre_equation", "affine_signe", "signes_premier_degre")],
    },
    {
      code: "2.1 C1", domaine: GRA, texte: "Modéliser une situation par une fonction du 1er degré, résoudre le problème, chercher l'intersection de deux fonctions (graphiquement, algébriquement), utiliser l'outil informatique.",
      couverture: "partielle", micros: [...m("3e", "affine_probleme", "affine_expression"), ...m("seconde", "droite_intersection")], note: "L'outil informatique (tableur, grapheur) n'est pas couvert.",
    },
    { code: "3.1 Sv1", domaine: NBR, texte: "Des naturels aux réels : placer un rationnel sur la droite par Thalès ; rationnel ou irrationnel ; écriture décimale d'un irrationnel à la calculatrice.", couverture: "partielle", micros: [...m("seconde", "reels_ensembles"), ...m("3e", "fraction_rationnel_reconnaitre")], note: "Placer un rationnel par la construction de Thalès n'est pas entraîné." },
    { code: "3.1 SF1", domaine: NBR, texte: "Comparer, encadrer, ordonner entiers, rationnels et irrationnels ; les placer ; valeur approchée par défaut ou par excès.", couverture: "complete", micros: [...m("3e", "entier_racine_encadrer", "fraction_rationnel_comparer"), ...m("seconde", "reels_encadrement", "reels_droite_graduee")] },
    {
      code: "3.2 Sv1", domaine: NBR, texte: "Le radical (√) dans les équations-produits et les triangles rectangles ; racines des 15 premiers carrés parfaits ; factorisation : mise en évidence, différence de deux carrés, trinôme carré parfait ; règle fondamentale des proportions ; équation sans solution ou vraie pour tout réel.",
      couverture: "partielle", micros: [...m("3e", "entier_racine_comprendre", "entier_racine_carre_parfait", "litteral_factoriser", "litteral_identite"), ...m("seconde", "devfac_factoriser_identite")],
      note: "Les équations sans solution ou à infinité de solutions n'ont pas de micro.",
    },
    { code: "3.2 SF1", domaine: NBR, texte: "Factoriser (mise en évidence, différence de deux carrés, trinôme carré parfait) ; reconnaître une expression non factorisable par ces outils.", couverture: "complete", micros: [...m("3e", "litteral_factoriser", "litteral_identite"), ...m("seconde", "devfac_facteur_commun", "devfac_factoriser_identite", "ir_difference_carres")] },
    { code: "3.2 SF2", domaine: NBR, texte: "Résoudre ax + b = cx + d, une équation produit nul, une équation par le produit en croix ; vérifier ; écrire une équation de deux solutions données.", couverture: "complete", micros: [...m("3e", "equation_resoudre_developper", "equation_produit_nul", "equation_verifier"), ...m("4e", "prop_quatrieme")] },
    { code: "3.2 SF3", domaine: NBR, texte: "Calculer avec des puissances de 10 à exposants entiers ; valeur approchée d'une racine à la calculatrice ; ordre de grandeur, plausibilité.", couverture: "partielle", micros: [...m("3e", "entier_puissance_dix", "entier_puissance_ecriture_scientifique", "entier_racine_calculer"), ...m("4e", "ordre_estimer")], note: "La calculatrice n'est pas entraînée." },
    { code: "3.2 C1", domaine: NBR, texte: "Résoudre des problèmes avec les nombres, les opérations et les outils algébriques ; rédiger un énoncé.", couverture: "complete", micros: [...m("3e", "equation_probleme"), ...m("4e", "equation_traduire")] },
    { code: "4.1 Sv1", domaine: STA, texte: "Notions : population, variable, classes et centres de classes ; variable discrète ou continue ; bâtonnets, bandes ou histogramme.", couverture: "partielle", micros: m("3e", "stat_lire_tableau", "stat_lire_graphique"), note: "Les séries en classes et l'histogramme n'ont pas de micro." },
    {
      code: "4.1 SF1", domaine: STA, texte: "Traiter et calculer : effectifs et fréquences (cumulés), effectif d'une classe, moyenne d'une variable continue, médiane approchée sur la courbe des effectifs cumulés.",
      couverture: "partielle", micros: [...m("3e", "stat_effectif_frequence", "stat_moyenne", "stat_mediane"), ...m("seconde", "stat_moyenne_ponderee", "stat_mediane_quartiles")],
      note: "Manquent les cumulés, la moyenne par centres de classes et la médiane lue sur la courbe des cumulés.",
    },
    { code: "4.1 SF2", domaine: STA, texte: "Présenter : tableau de distribution en classes, histogramme, histogramme par outil numérique.", couverture: "absente", micros: [], note: "Micro « histogramme et classes » à écrire." },
    { code: "4.1 C1", domaine: STA, texte: "Interpréter en contexte, critiquer des informations sur une même situation, choisir un paramètre ou un support.", couverture: "complete", micros: [...m("3e", "stat_interpreter"), ...m("seconde", "stat_interpreter")] },
  ],
};
