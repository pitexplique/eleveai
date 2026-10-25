// Maroc, cycle secondaire QUALIFIANT (lycée) : tronc commun scientifique (TC),
// 1re année du bac sciences expérimentales (1re Bac SE), 2e année du bac
// sciences expérimentales (2e Bac, filières PC et SVT, la plus suivie).
// Source : les « Orientations pédagogiques et programmes de l'enseignement des
// mathématiques au cycle secondaire qualifiant » du ministère de l'Éducation
// nationale (Direction des curricula, novembre 2007), toujours en vigueur au bac.
// Le texte officiel est en arabe ; nous avons relevé sa VERSION FRANÇAISE (option
// internationale « BIOF »), tableaux « Contenus / Capacités attendues /
// Recommandations pédagogiques », en trois PDF diffusés par lycee.mathtutor.ma
// (fichiers Word 2014-2015 des enseignants, relus le 25/10/2026) :
//   · TC scientifique + 1re Bac SE : un même livret (sommaire p. 1 : TC sciences
//     p. 2-10, TC lettres p. 11-13, 1re Bac SE p. 14-21, 1re Bac SM p. 22-32…),
//     diffusé en deux extraits ;
//   · 2e Bac SE : livret à part (12 p.), commun aux filières PC, SVT et
//     agronomiques (le programme de maths est le même).
// ⚠️ Deux pages manquent aux extraits diffusés :
//   · p. 10, les STATISTIQUES du TC scientifique : la ligne VI-1 reprend le résumé
//     du site (effectifs et fréquences cumulés, graphiques, moyenne, médiane,
//     mode, variance, écart type), à revérifier sur le livret complet ;
//   · p. 21, la fin du 1re Bac SE (après « Dérivation et représentation des
//     fonctions ») : vraisemblablement l'étude et la représentation des fonctions
//     (branches infinies, concavité, éléments de symétrie, que le 2e Bac dit
//     « maintenir »). Nous ne l'avons PAS inventée : elle n'a pas de ligne.
// Pas de codes officiels : le code reprend la numérotation des tableaux
// (« I-5 » = partie I, paragraphe 5 ; les paragraphes à plusieurs volets sont
// découpés en a, b, c).
// Âge : le TC a l'âge de notre seconde, la 1re Bac celui de notre première, la
// 2e Bac celui de notre terminale. Le Maroc garde des contenus retirés en France
// (barycentre, rotation, angles inscrits, trigonométrie des formules
// d'addition, produit vectoriel, nombres complexes en filière SE, y'' + ay' + by
// = 0, volumes de révolution) et avance d'un an le produit scalaire (dès le TC).
// Langue : les maths sont enseignées en FRANÇAIS dans les sections
// internationales (BIOF) et, avec la loi-cadre 51-17 (2019), dans une part
// croissante du lycée public ; les autres classes les font encore en arabe.

import type { Classe } from "@/lib/tutor-v4/catalog";
import type { ProgrammePays, RenvoiMicro } from "./types";

const m = (classe: Classe, ...micros: string[]): RenvoiMicro[] =>
  micros.map((micro) => ({ classe, micro }));

const SOURCE = "https://lycee.mathtutor.ma/documents/cadre-referentiel/";
const VERSION =
  "orientations pédagogiques officielles 2007 (secondaire qualifiant), version française de l'option internationale (BIOF)";

// ════════════════════════════════════════════════════════════════════════════
// Tronc commun scientifique
// ════════════════════════════════════════════════════════════════════════════
const NB = "Ensembles de nombres et calcul numérique";
const GP = "Géométrie plane";
const GE = "Géométrie dans l'espace";
const FN = "Fonctions numériques";
const TR = "Trigonométrie";
const ST = "Statistiques";

export const MAROC_TC: ProgrammePays = {
  pays: "maroc",
  cle: "tc",
  niveau: "Tronc commun scientifique (TC)",
  equivalentFrance: "seconde",
  source: `${SOURCE}tronc-commun/sciences/`,
  version: VERSION,
  contenus: [
    // ── I. Ensembles de nombres et calcul numérique ─────────────────────────
    {
      code: "I-1", domaine: NB,
      texte: "Entiers naturels et arithmétique : pairs et impairs, multiples et PPCM, diviseurs et PGCD, nombres premiers, décomposition en produit de facteurs premiers.",
      couverture: "complete",
      micros: [
        ...m("seconde", "arith_multiple_diviseur", "arith_nombre_premier", "arith_fraction_irreductible", "arith_probleme"),
        ...m("3e", "entier_decomposer_facteur", "entier_pgcd_ppcm"),
      ],
    },
    {
      code: "I-2a", domaine: NB,
      texte: "Les ensembles ℕ, ℤ, 𝔻, ℚ et ℝ : écritures, notations, exemples de nombres irrationnels, opérations dans ℝ.",
      couverture: "complete",
      micros: m("seconde", "reels_ensembles", "reels_droite_graduee", "racine_calcul"),
    },
    {
      code: "I-2b", domaine: NB,
      texte: "Puissances et leurs propriétés, puissances de 10, écriture scientifique d'un décimal.",
      couverture: "complete",
      micros: m("seconde", "puiss_calcul", "puiss_produit_quotient", "puiss_puissance_puissance", "puiss_exposant_negatif", "puiss_notation_scientifique"),
    },
    {
      code: "I-2c", domaine: NB,
      texte: "Identités remarquables (a ± b)², a² − b², a³ − b³ et a³ + b³ ; développement et factorisation.",
      couverture: "partielle",
      micros: m("seconde", "ir_carre_somme", "ir_carre_difference", "ir_difference_carres", "devfac_developper_double", "devfac_factoriser_identite"),
      note: "Manquent les identités du troisième degré a³ − b³ = (a − b)(a² + ab + b²) et a³ + b³.",
    },
    {
      code: "I-3a", domaine: NB,
      texte: "Ordre et opérations : comparer deux nombres ou deux expressions, majorer et minorer une expression algébrique.",
      couverture: "partielle",
      micros: m("seconde", "comparer_difference_quotient"),
      note: "Manquent les majorations et minorations d'expressions par les règles de l'ordre et l'inégalité triangulaire.",
    },
    {
      code: "I-3b", domaine: NB,
      texte: "Valeur absolue et propriétés, intervalles, relations |x − a| ≤ r interprétées comme des distances sur la droite graduée.",
      couverture: "complete",
      micros: m("seconde", "valeur_absolue_distance", "intervalle_representer", "intervalle_appartenance", "reference_valeur_absolue"),
    },
    {
      code: "I-3c", domaine: NB,
      texte: "Encadrement et approximation d'un nombre ou d'une expression ; valeurs approchées à la calculatrice.",
      couverture: "partielle",
      micros: m("seconde", "reels_encadrement"),
      note: "Manque l'encadrement d'une somme, d'une différence, d'un produit et d'un quotient à partir d'encadrements donnés.",
    },
    {
      code: "I-4", domaine: NB,
      texte: "Polynômes : degré, égalité, somme et produit ; racine d'un polynôme, division euclidienne par x − a, factorisation.",
      couverture: "partielle",
      micros: m("stmg", "fct_d2_verifier_racine", "fct_d2_factoriser_racine_connue", "fct_d3_verifier_racine", "fct_d3_racines"),
      note: "Manque la division euclidienne par x − a (et l'identification des coefficients) : absente des programmes français.",
    },
    {
      code: "I-5a", domaine: NB,
      texte: "Équations et inéquations du premier degré à une inconnue, dont des cas simples avec valeur absolue ou paramètre ; mise en équation de problèmes.",
      couverture: "partielle",
      micros: m("seconde", "equation_resoudre", "equation_probleme", "inequation_resoudre", "inequation_intervalle"),
      note: "Manquent les équations avec valeur absolue (|2x − 1| = 3) et les équations paramétriques simples, par disjonction des cas.",
    },
    {
      code: "I-5b", domaine: NB,
      texte: "Second degré : forme canonique d'un trinôme, équations, signe du trinôme, inéquations du second degré.",
      couverture: "complete",
      micros: m("premiere-spe", "sd_canonique", "sd_discriminant", "sd_racines", "sd_factorisation", "sd_signe", "sd_inequation"),
      note: "Au Maroc en TC, chez nous en 1re spécialité.",
    },
    {
      code: "I-5c", domaine: NB,
      texte: "Systèmes de deux équations du premier degré à deux inconnues : combinaison linéaire, substitution, déterminant ; lien avec la position de deux droites.",
      couverture: "partielle",
      micros: m("seconde", "droite_systeme", "droite_intersection"),
      note: "La méthode du déterminant (règle de Cramer) n'a pas de micro.",
    },
    {
      code: "I-5d", domaine: NB,
      texte: "Inéquations et systèmes d'inéquations du premier degré à deux inconnues : régionnement du plan, programmation linéaire simple.",
      couverture: "absente",
      micros: [],
      note: "Demi-plans et programmation linéaire : trou déjà relevé au Sénégal et au Québec.",
    },
    // ── II. Géométrie plane ─────────────────────────────────────────────────
    {
      code: "II-1", domaine: GP,
      texte: "Calcul vectoriel : égalité, somme, relation de Chasles, produit par un réel, colinéarité et alignement, définition vectorielle du milieu.",
      couverture: "complete",
      micros: m("seconde", "vecteur_egalite", "vecteur_somme", "vecteur_chasles_calcul", "vecteur_produit_reel", "vecteur_point_defini", "vecteur_colinearite"),
    },
    {
      code: "II-2", domaine: GP,
      texte: "Projection sur une droite, projection orthogonale ; théorème de Thalès et sa réciproque ; conservation du coefficient de colinéarité par projection.",
      couverture: "partielle",
      micros: [...m("3e", "thales_configuration", "thales_reciproque"), ...m("seconde", "geo_projete_orthogonal")],
      note: "Manquent la projection parallèlement à une droite et sa traduction vectorielle du théorème de Thalès.",
    },
    {
      code: "II-3", domaine: GP,
      texte: "La droite dans le plan (étude analytique) : coordonnées, colinéarité, droite par un point et un vecteur directeur, représentation paramétrique, équation cartésienne, positions relatives.",
      couverture: "partielle",
      micros: m("seconde", "repere_coordonnees_point", "vecteur_coordonnees", "vecteur_colinearite", "droite_vecteur_directeur", "droite_equation_cartesienne", "droite_equation_reduite", "droite_parallelisme"),
      note: "Manque la représentation paramétrique d'une droite du plan.",
    },
    {
      code: "II-4", domaine: GP,
      texte: "Transformations : symétries axiale et centrale, translation (rappels), homothétie ; propriétés caractéristiques ; conservation des distances ; images de segments, droites, cercles, angles.",
      couverture: "partielle",
      micros: [
        ...m("4e", "sym_translation"),
        ...m("3e", "sym_symetrie_translation_rotation", "sym_homothetie_reconnaitre", "sym_homothetie_construire", "sym_homothetie_rapport"),
      ],
      note: "Manquent les définitions vectorielles (M'N' = k·MN) et la résolution de problèmes par les transformations.",
    },
    {
      code: "II-5", domaine: GP,
      texte: "Produit scalaire : définition par projection, expression trigonométrique, orthogonalité ; relations métriques du triangle rectangle, théorème de la médiane, théorème d'Al-Kashi.",
      couverture: "partielle",
      micros: m("premiere-spe", "ps_projection", "ps_norme_angle", "ps_proprietes", "ps_orthogonalite", "ps_alkashi", "ps_angle_longueur"),
      note: "Au Maroc dès le TC (en France en 1re spé). Manque le théorème de la médiane (AB² + AC² = 2AI² + BC²/2).",
    },
    // ── III. Géométrie dans l'espace ────────────────────────────────────────
    {
      code: "III-1", domaine: GE,
      texte: "Axiomes d'incidence, détermination d'un plan ; positions relatives de droites et de plans ; parallélisme et orthogonalité (droite et plan, deux plans) ; représentation en perspective.",
      couverture: "partielle",
      micros: [...m("terminale-spe", "espace_position_relative"), ...m("3e", "section_reconnaitre", "section_pave_cube")],
      note: "Notre micro de Terminale passe par les vecteurs ; manquent la géométrie de position sans repère (théorème du toit, orthogonalité droite-plan) et les règles de la perspective.",
    },
    // ── IV. Fonctions numériques ────────────────────────────────────────────
    {
      code: "IV-1", domaine: FN,
      texte: "Généralités : ensemble de définition, égalité de deux fonctions, courbe ; lecture graphique d'images et d'antécédents ; résolution graphique d'équations et d'inéquations.",
      couverture: "complete",
      micros: m("seconde", "fonction_domaine", "fonction_vocabulaire", "graph_image", "graph_antecedent", "fonction_resolution_graphique", "fonction_comparer_courbes"),
    },
    {
      code: "IV-2", domaine: FN,
      texte: "Fonction paire, fonction impaire, et leur interprétation graphique.",
      couverture: "partielle",
      micros: m("premiere-spe", "trig_parite"),
      note: "Seule la parité de cos et sin est travaillée : manque la parité d'une fonction quelconque (f(−x) = ±f(x), symétrie de la courbe).",
    },
    {
      code: "IV-3", domaine: FN,
      texte: "Variations d'une fonction ; maximum et minimum sur un intervalle, problèmes d'extremum.",
      couverture: "complete",
      micros: m("seconde", "variation_tableau", "variation_croissance", "variation_extremum", "graph_tableau_variations", "geo_optimisation"),
    },
    {
      code: "IV-4", domaine: FN,
      texte: "Fonctions de référence : x ↦ ax², x ↦ a/x, x ↦ ax² + bx + c, x ↦ (ax + b)/(cx + d), sin et cos ; courbes sans changement de repère.",
      couverture: "partielle",
      micros: [
        ...m("seconde", "reference_carre", "reference_inverse"),
        ...m("premiere-spe", "gr_parabole", "var_second_degre", "trig_courbes"),
      ],
      note: "Manque la fonction homographique x ↦ (ax + b)/(cx + d) (courbe, asymptotes, centre de symétrie).",
    },
    // ── V. Trigonométrie ────────────────────────────────────────────────────
    {
      code: "V-1", domaine: TR,
      texte: "Cercle trigonométrique, abscisses curvilignes d'un point et abscisse curviligne principale ; relations entre degré, radian et grade.",
      couverture: "complete",
      micros: m("premiere-spe", "trig_radian", "trig_arc", "trig_enroulement", "trig_cercle", "trig_grand_reel"),
      note: "Le grade n'est pas travaillé (anecdotique).",
    },
    {
      code: "V-2", domaine: TR,
      texte: "Angle orienté de deux demi-droites et de deux vecteurs, mesure principale, relation de Chasles.",
      couverture: "absente",
      micros: [],
      note: "Les angles orientés ont quitté le programme français en 2019 : micro à écrire.",
    },
    {
      code: "V-3", domaine: TR,
      texte: "Lignes trigonométriques d'un réel, valeurs pour 0, π/6, π/4, π/3, π/2 ; relations cos² x + sin² x = 1, tan x = sin x / cos x, 1 + tan² x = 1/cos² x.",
      couverture: "partielle",
      micros: [...m("premiere-spe", "trig_cos_sin", "trig_valeurs"), ...m("seconde", "geo_trig_identite")],
      note: "Manque la tangente d'un réel et la relation 1 + tan² x = 1/cos² x.",
    },
    {
      code: "V-4", domaine: TR,
      texte: "Lignes trigonométriques des angles associés : −x, π − x, π + x, π/2 − x, π/2 + x.",
      couverture: "complete",
      micros: m("premiere-spe", "trig_angles_associes"),
    },
    {
      code: "V-5", domaine: TR,
      texte: "Courbes des fonctions cos et sin ; périodicité, parité, monotonie.",
      couverture: "complete",
      micros: m("premiere-spe", "trig_courbes", "trig_periodicite", "trig_parite"),
    },
    {
      code: "V-6", domaine: TR,
      texte: "Équations et inéquations trigonométriques fondamentales : sin x = a, cos x = a, tan x = a et leurs inéquations, résolues sur le cercle.",
      couverture: "absente",
      micros: [],
      note: "Aucune micro de résolution d'équation trigonométrique (hors programme de 1re spé en France).",
    },
    {
      code: "V-7", domaine: TR,
      texte: "Angles inscrits, quadrilatères inscriptibles.",
      couverture: "absente",
      micros: [],
      note: "Trou déjà relevé au Sénégal (3e).",
    },
    {
      code: "V-8", domaine: TR,
      texte: "Relations dans le triangle : loi des sinus a/sin A = b/sin B = c/sin C = 2R, aire S = ½ ab sin C, S = pr.",
      couverture: "absente",
      micros: [],
    },
    // ── VI. Statistiques ────────────────────────────────────────────────────
    {
      code: "VI-1", domaine: ST,
      texte: "Statistiques : effectifs et fréquences (simples et cumulés), représentations graphiques, moyenne, médiane, mode, variance et écart type.",
      couverture: "complete",
      micros: m("seconde", "stat_lire_serie", "stat_frequence", "stat_moyenne", "stat_moyenne_ponderee", "stat_mediane_quartiles", "stat_ecart_type", "stat_interpreter"),
      note: "Page 10 du livret absente de l'extrait diffusé : contenu d'après le résumé de mathtutor.ma, à revérifier.",
    },
  ],
};

// ════════════════════════════════════════════════════════════════════════════
// 1re année du baccalauréat, sciences expérimentales
// ════════════════════════════════════════════════════════════════════════════
const AA = "Algèbre et analyse";

export const MAROC_1BAC: ProgrammePays = {
  pays: "maroc",
  cle: "1bac",
  niveau: "1re année du bac sciences expérimentales (1re Bac SE)",
  equivalentFrance: "premiere-spe",
  source: `${SOURCE}1ere-bac/sciences-experimentales/`,
  version: VERSION,
  contenus: [
    // ── Géométrie plane ─────────────────────────────────────────────────────
    {
      code: "GP-1", domaine: GP,
      texte: "Barycentre de 2 à 4 points, centre de gravité ; propriété caractéristique, invariance, associativité ; coordonnées du barycentre ; alignement et concours de droites.",
      couverture: "absente",
      micros: [],
      note: "Le barycentre a quitté le programme français : micros à écrire (classique au Maroc, utile en physique).",
    },
    {
      code: "GP-2", domaine: GP,
      texte: "Rotation : définition par centre et angle, rotation réciproque ; conservation des distances, des angles orientés et du barycentre ; images d'une droite, d'un segment, d'un cercle.",
      couverture: "partielle",
      micros: [...m("4e", "sym_rotation"), ...m("3e", "sym_symetrie_translation_rotation")],
      note: "Nos micros de collège construisent l'image ; manquent l'angle orienté et les propriétés de conservation.",
    },
    {
      code: "GP-3a", domaine: GP,
      texte: "Expression analytique du produit scalaire en repère orthonormé, de la norme et de la distance ; cos et sin d'un angle par le produit scalaire.",
      couverture: "complete",
      micros: m("premiere-spe", "ps_coordonnees", "ps_norme", "ps_angle_longueur"),
    },
    {
      code: "GP-3b", domaine: GP,
      texte: "La droite (étude analytique) : vecteur normal, équation cartésienne par un point et un vecteur normal, distance d'un point à une droite.",
      couverture: "partielle",
      micros: m("premiere-spe", "gr_vecteur_normal", "gr_equation_droite", "gr_droites", "gr_projete"),
      note: "Manque la formule de la distance d'un point à une droite |ax₀ + by₀ + c| / √(a² + b²).",
    },
    {
      code: "GP-3c", domaine: GP,
      texte: "Le cercle (étude analytique) : équation cartésienne, représentation paramétrique, ensemble x² + y² + ax + by + c = 0, ensemble MA·MB = 0, position d'un cercle et d'une droite, tangente en un point.",
      couverture: "partielle",
      micros: m("premiere-spe", "gr_cercle", "gr_cercle_reconnaitre", "gr_cercle_utiliser", "ps_ma_mb"),
      note: "Manquent la représentation paramétrique du cercle, la position cercle-droite et l'équation de la tangente à un cercle.",
    },
    // ── Géométrie dans l'espace ─────────────────────────────────────────────
    {
      code: "GE-1", domaine: GE,
      texte: "Vecteurs de l'espace : calcul vectoriel, colinéarité (définition vectorielle d'une droite), coplanarité (définition vectorielle d'un plan).",
      couverture: "complete",
      micros: m("terminale-spe", "espace_vecteurs"),
      note: "Au Maroc en 1re, chez nous en Terminale spé.",
    },
    {
      code: "GE-2", domaine: GE,
      texte: "Étude analytique de l'espace : coordonnées, déterminant de trois vecteurs, représentations paramétriques d'une droite et d'un plan, équation cartésienne d'un plan, positions relatives.",
      couverture: "partielle",
      micros: m("terminale-spe", "espace_repere_coordonnees", "espace_droite_parametrique", "espace_plan_equation", "espace_position_relative"),
      note: "Manquent le déterminant de trois vecteurs (coplanarité) et la représentation paramétrique d'un plan.",
    },
    // ── Algèbre et analyse ──────────────────────────────────────────────────
    {
      code: "AA-1", domaine: AA,
      texte: "Logique : propositions, opérations, quantificateurs ; raisonnements par l'absurde, par contraposée, par disjonction des cas, par équivalence, par récurrence.",
      couverture: "complete",
      micros: [
        ...m("premiere-spe", "log_connecteurs", "log_implication", "log_equivalence", "log_quantificateurs", "log_negation", "log_raisonnements"),
        ...m("terminale-spe", "suite_recurrence_preuve"),
      ],
    },
    {
      code: "AA-2a", domaine: AA,
      texte: "Suites numériques : suites récurrentes, suites majorées, minorées, bornées, monotonie d'une suite.",
      couverture: "complete",
      micros: [...m("premiere-spe", "suite_termes", "suite_recurrence", "suite_variation"), ...m("terminale-spe", "suite_bornee")],
    },
    {
      code: "AA-2b", domaine: AA,
      texte: "Suites arithmétiques et géométriques : raison, premier terme, somme de n termes consécutifs, problèmes.",
      couverture: "complete",
      micros: m("premiere-spe", "suite_arithmetique", "suite_geometrique", "suite_sommes", "suite_somme_geo", "suite_modeliser"),
    },
    {
      code: "AA-3a", domaine: AA,
      texte: "Calcul trigonométrique : formules de transformation (addition, duplication) ; transformation de a cos x + b sin x.",
      couverture: "absente",
      micros: [],
      note: "Formules d'addition et de duplication : retirées du programme français (seulement en option maths expertes).",
    },
    {
      code: "AA-3b", domaine: AA,
      texte: "Équations et inéquations trigonométriques se ramenant aux équations fondamentales ; lecture des solutions sur le cercle.",
      couverture: "absente",
      micros: [],
    },
    {
      code: "AA-4a", domaine: FN,
      texte: "Généralités (rappels et compléments) : fonction majorée, minorée, bornée, périodique ; comparaison de deux fonctions ; extremums, monotonie ; résolution graphique de f(x) = g(x), f(x) ≤ g(x).",
      couverture: "partielle",
      micros: [
        ...m("premiere-spe", "var_tableau", "var_lecture_courbe", "var_extremum", "var_position_relative", "trig_periodicite"),
        ...m("seconde", "fonction_comparer_courbes"),
      ],
      note: "Manque la notion de fonction majorée, minorée, bornée.",
    },
    {
      code: "AA-4b", domaine: FN,
      texte: "Composée de deux fonctions et sa monotonie ; variations de f + λ et λf ; courbes de x ↦ √(x + a) et x ↦ ax³.",
      couverture: "partielle",
      micros: [...m("seconde", "reference_racine", "reference_cube"), ...m("premiere-spe", "der_composee_affine")],
      note: "Manque la composée g∘f et la monotonie d'une composée (sans dérivée).",
    },
    {
      code: "AA-4c", domaine: FN,
      texte: "Limites : fonctions de référence en 0 et en ±∞, limites finies et infinies, opérations, limites à gauche et à droite, polynômes, rationnelles, irrationnelles ; limites trigonométriques sin x / x, tan x / x, (1 − cos x)/x² ; limites et ordre.",
      couverture: "partielle",
      micros: m("terminale-spe", "limite_fonction_reference", "limite_fonction_operations", "limite_fonction_infini", "limite_fonction_point", "limite_fonction_asymptote"),
      note: "Au Maroc en 1re, chez nous en Terminale. Manquent les limites trigonométriques usuelles (sin x / x…) et les limites à gauche et à droite comme exercice à part.",
    },
    {
      code: "AA-4d", domaine: FN,
      texte: "Dérivabilité en un point, nombre dérivé, tangente, approximation affine ; dérivabilité à gauche et à droite, demi-tangentes (et tangentes verticales).",
      couverture: "partielle",
      micros: m("premiere-spe", "der_taux", "der_nombre_derive", "der_definition", "der_graphique", "der_tangente", "der_valeur_absolue"),
      note: "Manquent l'approximation affine au voisinage de 0 ((1 + h)² ≈ 1 + 2h) et les demi-tangentes.",
    },
    {
      code: "AA-4e", domaine: FN,
      texte: "Dérivées successives ; dérivée de f + g, λf, fg, f/g, fⁿ, x ↦ f(ax + b), √f.",
      couverture: "complete",
      micros: [
        ...m("premiere-spe", "der_usuelles", "der_puissance", "der_operations", "der_quotient", "der_composee_affine"),
        ...m("terminale-spe", "derivation_composee"),
      ],
    },
    {
      code: "AA-4f", domaine: FN,
      texte: "Monotonie et signe de la dérivée, extremum d'une fonction dérivable ; problèmes de valeurs minimales et maximales.",
      couverture: "complete",
      micros: m("premiere-spe", "var_signe_derivee", "var_tableau", "var_extremum", "var_optimisation"),
    },
    {
      code: "AA-4g", domaine: FN,
      texte: "Équation différentielle y'' + ω²y = 0 (solution générale admise).",
      couverture: "absente",
      micros: [],
      note: "Liée à la physique (oscillateur) ; absente du programme français.",
    },
  ],
};

// ════════════════════════════════════════════════════════════════════════════
// 2e année du baccalauréat, sciences expérimentales (PC, SVT)
// ════════════════════════════════════════════════════════════════════════════
const AN = "Analyse";
const AL = "Algèbre et géométrie";

export const MAROC_2BAC: ProgrammePays = {
  pays: "maroc",
  cle: "2bac",
  niveau: "2e année du bac sciences expérimentales (2e Bac PC / SVT)",
  equivalentFrance: "terminale-spe",
  source: `${SOURCE}2eme-bac/sciences-experimentales/`,
  version: VERSION,
  contenus: [
    // ── Analyse : suites ────────────────────────────────────────────────────
    {
      code: "A1-1", domaine: AN,
      texte: "Limite d'une suite : suites de référence (n, n², nᵖ, √n, 1/n…), suite convergente, divergente, opérations, limites et ordre (comparaison, encadrement), suites monotones bornées.",
      couverture: "complete",
      micros: m("terminale-spe", "limite_suite_interpreter", "limite_suite_calculer", "limite_suite_operations", "limite_suite_comparaison", "limite_suite_monotone_bornee"),
    },
    {
      code: "A1-2", domaine: AN,
      texte: "Suites récurrentes u(n+1) = a·u(n) + b, homographiques, u(n+1) = f(u(n)) (limite solution de f(x) = x), suites v(n) = f(u(n)) ; limites de aⁿ et de n^α.",
      couverture: "partielle",
      micros: [...m("premiere-spe", "suite_auxiliaire"), ...m("terminale-spe", "suite_recurrence_preuve", "limite_suite_monotone_bornee", "limite_suite_defi")],
      note: "Manquent les suites homographiques et la recherche de la limite comme point fixe de f.",
    },
    // ── Analyse : fonctions ─────────────────────────────────────────────────
    {
      code: "A2-1", domaine: AN,
      texte: "Continuité en un point, à droite, à gauche, sur un intervalle ; image d'un intervalle ; théorème des valeurs intermédiaires ; dichotomie.",
      couverture: "complete",
      micros: m("terminale-spe", "continuite_reconnaitre", "tvi_appliquer", "tvi_unicite", "tvi_rediger", "python_seuil"),
    },
    {
      code: "A2-2", domaine: AN,
      texte: "Fonction réciproque d'une fonction continue strictement monotone : existence, monotonie, courbe symétrique, nombre dérivé de la réciproque.",
      couverture: "absente",
      micros: [],
      note: "La fonction réciproque n'est pas au programme français : micros à écrire.",
    },
    {
      code: "A2-3", domaine: AN,
      texte: "Puissances rationnelles x^r et racine n-ième : propriétés, dérivée de x ↦ ⁿ√x.",
      couverture: "partielle",
      micros: m("stmg", "expoT_exposant_un_sur_n"),
      note: "Seule l'écriture a^(1/n) (STMG) existe ; manquent le calcul sur les racines n-ièmes et leur dérivée.",
    },
    {
      code: "A2-4", domaine: AN,
      texte: "Dérivée d'une composée ; études de fonctions rationnelles, trigonométriques et irrationnelles : branches infinies, concavité, éléments de symétrie, résolution graphique.",
      couverture: "partielle",
      micros: m("terminale-spe", "derivation_composee", "derivation_variation", "derivation_defi", "limite_fonction_asymptote", "convexite_derivee_seconde", "convexite_point_inflexion"),
      note: "Manquent les branches paraboliques, les asymptotes obliques, les centres et axes de symétrie d'une courbe.",
    },
    {
      code: "A2-5", domaine: AN,
      texte: "Fonctions primitives d'une fonction continue ; primitives d'une somme et d'un produit par un réel ; primitives des fonctions usuelles.",
      couverture: "complete",
      micros: m("terminale-spe", "primitive_reconnaitre", "primitive_calculer"),
    },
    {
      code: "A2-6", domaine: AN,
      texte: "Logarithme népérien (primitive de 1/x qui s'annule en 1) : propriétés, étude, dérivée logarithmique, primitives de u'/u, limites fondamentales.",
      couverture: "complete",
      micros: m("terminale-spe", "ln_definition", "ln_proprietes", "ln_deriver", "ln_equation_inequation", "ln_limite", "ln_defi"),
      note: "En France, ln vient après l'exponentielle (réciproque) ; au Maroc, avant (primitive).",
    },
    {
      code: "A2-7", domaine: AN,
      texte: "Logarithme de base a, logarithme décimal (équations 10ˣ = a, inéquations 10ˣ < a).",
      couverture: "partielle",
      micros: m("stmg", "logT_definition", "logT_valeurs_remarquables", "logT_produit", "logT_resoudre_exponentielle", "logT_inequation"),
      note: "Le logarithme décimal est couvert (STMG) ; manque le logarithme de base a quelconque.",
    },
    {
      code: "A2-8", domaine: AN,
      texte: "Exponentielle népérienne (réciproque de ln) : propriétés, étude, nombre e, primitives de u'·e^u, limites fondamentales.",
      couverture: "complete",
      micros: m("terminale-spe", "exp_definition", "exp_proprietes", "exp_deriver", "exp_equation_inequation", "exp_limite", "exp_defi"),
    },
    {
      code: "A2-9", domaine: AN,
      texte: "Exponentielle de base a : définition (aˣ = e^(x ln a)), propriétés, dérivée de x ↦ aˣ.",
      couverture: "partielle",
      micros: m("stmg", "expoT_reconnaitre", "expoT_sens_selon_a", "expoT_somme_exposants", "expoT_transformer"),
      note: "Manque la dérivée (aˣ)' = aˣ ln a.",
    },
    {
      code: "A2-10", domaine: AN,
      texte: "Équation différentielle y' = ay + b, utilisée dans des situations de physique, de chimie et de SVT.",
      couverture: "complete",
      micros: m("terminale-spe", "equadiff_reconnaitre", "equadiff_y_prime_ay", "equadiff_y_prime_ay_b", "equadiff_condition_initiale"),
    },
    {
      code: "A2-11", domaine: AN,
      texte: "Équation différentielle y'' + ay' + by = 0 (solution générale admise).",
      couverture: "absente",
      micros: [],
      note: "Absente du programme français (équation caractéristique, solutions oscillantes).",
    },
    // ── Analyse : calcul intégral ───────────────────────────────────────────
    {
      code: "A3-1", domaine: AN,
      texte: "Intégrale d'une fonction continue sur un segment, définie par une primitive ; relation de Chasles, linéarité, intégrale et ordre, valeur moyenne.",
      couverture: "complete",
      micros: m("terminale-spe", "integrale_calculer", "integrale_valeur_moyenne", "integrale_defi"),
    },
    {
      code: "A3-2", domaine: AN,
      texte: "Intégration par parties.",
      couverture: "absente",
      micros: [],
      note: "Au programme de Terminale spé en France, mais sans micro chez nous : à écrire.",
    },
    {
      code: "A3-3", domaine: AN,
      texte: "Aire d'un domaine limité par deux courbes et deux droites parallèles à l'axe des ordonnées.",
      couverture: "partielle",
      micros: m("terminale-spe", "integrale_aire"),
      note: "Manque l'aire entre deux courbes (intégrale de f − g).",
    },
    {
      code: "A3-4", domaine: AN,
      texte: "Volume d'un solide engendré par la rotation d'une courbe autour de l'axe des abscisses.",
      couverture: "absente",
      micros: [],
    },
    // ── Algèbre et géométrie ────────────────────────────────────────────────
    {
      code: "G-1", domaine: AL,
      texte: "Produit scalaire dans l'espace : définition, propriétés, base et repère orthonormés, expression analytique, norme, distance.",
      couverture: "complete",
      micros: m("terminale-spe", "ps_espace_calculer", "ps_espace_orthogonalite", "ps_espace_norme_distance", "ps_espace_angle"),
    },
    {
      code: "G-2", domaine: AL,
      texte: "Vecteur normal à un plan, équation cartésienne d'un plan par un point et un vecteur normal, droite orthogonale à un plan, distance d'un point à un plan.",
      couverture: "partielle",
      micros: m("terminale-spe", "ps_espace_plan_normal", "espace_plan_equation", "espace_droite_parametrique"),
      note: "Manque la formule de la distance d'un point à un plan.",
    },
    {
      code: "G-3", domaine: AL,
      texte: "Sphère : équation cartésienne, ensemble x² + y² + z² + ax + by + cz + d = 0, représentation paramétrique, intersection avec un plan ou une droite, plan tangent.",
      couverture: "absente",
      micros: [],
    },
    {
      code: "G-4", domaine: AL,
      texte: "Produit vectoriel : orientation de l'espace, définition, propriétés, coordonnées ; aire d'un triangle, plan par trois points, distance d'un point à une droite.",
      couverture: "absente",
      micros: [],
      note: "Absent du lycée français.",
    },
    {
      code: "C-1", domaine: AL,
      texte: "Nombres complexes : écriture algébrique, représentation géométrique, affixe, opérations, conjugué, module.",
      couverture: "absente",
      micros: [],
      note: "En France, seulement en option maths expertes : aucune micro chez nous. Gros chapitre du bac marocain.",
    },
    {
      code: "C-2", domaine: AL,
      texte: "Argument, forme trigonométrique, notation exponentielle e^(iθ), formules de Moivre et d'Euler, linéarisation.",
      couverture: "absente",
      micros: [],
    },
    {
      code: "C-3", domaine: AL,
      texte: "Équation az² + bz + c = 0 à coefficients réels dans ℂ.",
      couverture: "absente",
      micros: [],
    },
    {
      code: "C-4", domaine: AL,
      texte: "Complexes et géométrie : distance, angle orienté, alignement, cocyclicité ; écriture complexe d'une translation, d'une homothétie, d'une rotation.",
      couverture: "absente",
      micros: [],
    },
    {
      code: "P-1", domaine: AL,
      texte: "Dénombrement : principe fondamental, arbre de choix, arrangements avec et sans répétition, combinaisons, nombres Aₙᵖ, Cₙᵖ et n!.",
      couverture: "complete",
      micros: m("terminale-spe", "denombrement_reconnaitre", "denombrement_produit_somme", "denombrement_arrangement_combinaison", "denombrement_coefficient_binomial"),
    },
    {
      code: "P-2", domaine: AL,
      texte: "Expériences aléatoires, stabilité de la fréquence, probabilité d'un événement, équiprobabilité ; réunion, intersection, événement contraire.",
      couverture: "complete",
      micros: m("seconde", "proba_vocabulaire", "proba_calculer", "proba_evenement_contraire", "proba_formule_union", "simulation_frequence", "echantillon_loi_grands_nombres"),
    },
    {
      code: "P-3", domaine: AL,
      texte: "Probabilité conditionnelle, indépendance de deux événements et de deux épreuves.",
      couverture: "complete",
      micros: [
        ...m("terminale-spe", "proba_conditionnelle_arbre", "proba_conditionnelle_formule", "proba_totales"),
        ...m("premiere-spe", "pc_independance", "pc_succession"),
      ],
    },
    {
      code: "P-4", domaine: AL,
      texte: "Variable aléatoire : loi de probabilité, espérance, écart type.",
      couverture: "complete",
      micros: m("terminale-spe", "va_definition", "va_loi_probabilite", "va_esperance", "va_variance_ecart_type"),
    },
    {
      code: "P-5", domaine: AL,
      texte: "Loi binomiale, appliquée à des situations des disciplines de la spécialité.",
      couverture: "complete",
      micros: m("terminale-spe", "binomiale_schema", "binomiale_reconnaitre", "binomiale_calculer", "binomiale_esperance_variance"),
    },
  ],
};
