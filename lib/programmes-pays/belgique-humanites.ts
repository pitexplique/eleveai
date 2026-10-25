// Belgique, Fédération Wallonie-Bruxelles : la FIN DES HUMANITÉS (6e secondaire,
// section de transition, humanités générales et technologiques).
// Source OFFICIELLE : « Mathématiques — Compétences terminales et savoirs requis,
// humanités générales et technologiques », annexe II du décret du 5 mai 1999
// (M.B. 25-08-1999), texte coordonné sur Gallilex (document 23271, mis à jour au
// 01/01/2005 ; le décret modificatif du 22-03-2018 n'abroge que l'article 1er et
// l'annexe I, le français) : https://gallilex.cfwb.be/sites/default/files/imports/23271_001.pdf
// Relevé le 25/10/2026 sur les pages 4 à 16, lues en image (tableaux à trois
// colonnes illisibles en texte). Un arrêté du 16-01-2014 (Gallilex 40140) vise
// aussi les compétences terminales « en mathématiques », mais ses annexes ne sont
// pas publiées sur Gallilex : non vérifié.
// ⚠️ Ce référentiel ne découpe PAS par année : il fixe ce qui est attendu à la
// sortie de la 6e secondaire, en trois profils (colonnes) qui s'emboîtent :
// mathématiques de base (2 h), générales (4 h), pour scientifiques (6 h). La
// répartition sur S4, S5, S6 relève des programmes des réseaux (WBE, FESeC…),
// qui ne sont pas des textes de la Fédération : S4 et S5 restent donc sans
// matrice. Matrice ci-dessous = profil « mathématiques générales » (il inclut
// « de base ») ; ce qui n'est attendu que des « scientifiques » (complexes,
// matrices, coniques par foyer, loi de Poisson, binôme de Newton démontré…) est
// laissé de côté. Codes : section 3.1 fonctions, 3.2 algèbre, 3.3 géométrie et
// trigonométrie, 3.4 traitement des données ; puis la rubrique (1 savoir,
// 2 calculer, 3 appliquer, 4 modéliser, 5 démontrer, 6 synthétiser) et une
// lettre pour la ligne du tableau (« 3.2.2b » = systèmes d'équations).

import type { Classe } from "@/lib/tutor-v4/catalog";
import type { ContenuPays, ProgrammePays, RenvoiMicro } from "./types";

const m = (classe: Classe, ...micros: string[]): RenvoiMicro[] =>
  micros.map((micro) => ({ classe, micro }));

const FON = "Étude des fonctions";
const ALG = "Algèbre";
const GEO = "Géométrie et trigonométrie";
const DON = "Traitement des données";

const c = (code: string, domaine: string, texte: string, couverture: ContenuPays["couverture"], micros: RenvoiMicro[], note?: string): ContenuPays =>
  note ? { code, domaine, texte, couverture, micros, note } : { code, domaine, texte, couverture, micros };

export const BELGIQUE_S6: ProgrammePays = {
  pays: "belgique",
  cle: "s6",
  niveau: "6e secondaire (fin des humanités, maths générales)",
  codeCours: "CT maths générales",
  equivalentFrance: "terminale-spe",
  source: "https://gallilex.cfwb.be/sites/default/files/imports/23271_001.pdf",
  version: "Compétences terminales et savoirs requis en mathématiques, HGT, décret du 5 mai 1999 (annexe II)",
  contenus: [
    c("3.1.1a", FON, "Suites : vocabulaire, limite d'une suite, définitions, notion de récurrence.", "partielle", [...m("premiere-spe", "suite_registres", "suite_recurrence", "suite_limite"), ...m("terminale-spe", "limite_suite_interpreter")], "La démonstration par récurrence n'est attendue que des « scientifiques »."),
    c("3.1.1b", FON, "Suites arithmétiques et géométriques (avec définitions).", "complete", m("premiere-spe", "suite_arithmetique", "suite_geometrique")),
    c("3.1.1c", FON, "Fonctions de référence (ax + b, ax², x³, 1/x, √x, ∛x, |x|, sin x, ln x, eˣ, logₐ x, aˣ) : extremums, variations, périodicité, fonction réciproque.", "partielle", [...m("seconde", "variation_croissance", "variation_extremum", "reference_carre", "reference_inverse", "reference_racine"), ...m("premiere-spe", "trig_periodicite"), ...m("terminale-spe", "ln_definition")], "La fonction réciproque et logₐ x ne sont pas entraînés."),
    c("3.1.1d", FON, "Les opérations usuelles sur les fonctions, y compris la composition.", "partielle", m("terminale-spe", "derivation_composee"), "La composition comme opération sur les fonctions n'a pas de micro dédiée."),
    c("3.1.1e", FON, "La signification de la dérivée.", "complete", m("premiere-spe", "der_nombre_derive", "der_interpreter")),
    c("3.1.1f", FON, "La signification de l'intégrale, à partir d'un graphique ou d'un calcul numérique.", "complete", m("terminale-spe", "integrale_aire")),
    c("3.1.2a", FON, "Suites arithmétiques et géométriques : un terme, la raison, la somme des n premiers termes.", "complete", m("premiere-spe", "suite_arithmetique", "suite_geometrique", "suite_sommes", "suite_somme_geo")),
    c("3.1.2b", FON, "Une incertitude sur un résultat obtenu à partir de valeurs approchées.", "absente", [], "Micro « propagation d'une incertitude » à écrire."),
    c("3.1.2c", FON, "Limites, dérivées, intégrales des fonctions de référence et de celles des problèmes.", "complete", m("terminale-spe", "limite_fonction_reference", "derivation_formules", "primitive_calculer", "integrale_calculer")),
    c("3.1.3a", FON, "Appliquer dérivation et intégration à des problèmes à données numériques : aires, volumes, longueurs, tangentes, croissance, optimisation.", "complete", [...m("premiere-spe", "der_tangente", "var_optimisation"), ...m("terminale-spe", "integrale_aire", "derivation_optimisation")]),
    c("3.1.4a", FON, "Modéliser des problèmes avec les fonctions de référence (logarithme et exponentielle compris), la dérivée et l'intégrale.", "partielle", [...m("premiere-spe", "exp_modelisation", "suite_evolution"), ...m("terminale-spe", "derivation_optimisation")], "Modéliser par un logarithme : pas de micro."),
    c("3.1.4b", FON, "Esquisser, construire un graphique qui met en évidence les caractéristiques du phénomène.", "partielle", [...m("premiere-spe", "var_tableau"), ...m("seconde", "graph_tableau_variations")], "Le tracé lui-même n'est pas entraîné."),
    c("3.1.4c", FON, "Interpréter un graphique en le reliant au problème qu'il modélise.", "complete", [...m("premiere-spe", "var_lecture_courbe"), ...m("seconde", "graph_image", "graph_resoudre_equation")]),
    c("3.1.4d", FON, "Déduire du graphique de y = f(x) ceux de f(x) + k, kf(x), f(x + k), f(kx).", "partielle", m("stmg", "fct_d2_translation"), "Seule la translation verticale est entraînée."),
    c("3.1.5a", FON, "Justifier les étapes d'une démonstration ou d'un calcul : formules du calcul différentiel, propriétés des logarithmes (éventuellement guidé).", "partielle", [...m("premiere-spe", "der_definition"), ...m("terminale-spe", "ln_proprietes")], "On applique les formules ; on ne les démontre pas."),
    c("3.1.6a", FON, "Synthétiser les informations d'une étude de fonction.", "complete", m("terminale-spe", "derivation_defi", "exp_defi", "ln_defi")),
    c("3.1.6b", FON, "Cas limites : comportement asymptotique, comportement localement linéaire.", "complete", [...m("terminale-spe", "limite_fonction_asymptote", "limite_fonction_infini"), ...m("premiere-spe", "der_tangente")]),
    c("3.1.6c", FON, "Dégager des propriétés communes à plusieurs fonctions.", "partielle", m("seconde", "reference_comparer")),
    c("3.2.1a", ALG, "Propriétés des opérations sur les nombres et les formes littérales.", "complete", m("seconde", "devfac_developper_double", "puiss_produit_quotient", "racine_produit")),
    c("3.2.1b", ALG, "Compatibilité des opérations avec les égalités et les inégalités.", "complete", m("seconde", "equation_resoudre", "inequation_resoudre")),
    c("3.2.1c", ALG, "Opérations sur les polynômes, égalité de polynômes, factorisation.", "partielle", [...m("premiere-spe", "sd_forme_factorisee"), ...m("stmg", "fct_d2_factoriser_racine_connue")], "Division et identification de polynômes de degré > 2 : pas de micro."),
    c("3.2.2a", ALG, "Résoudre équations et inéquations, y compris trigonométriques, logarithmiques, exponentielles (sans paramètre).", "partielle", [...m("premiere-spe", "sd_racines", "sd_inequation"), ...m("terminale-spe", "exp_equation_inequation", "ln_equation_inequation")], "Les équations trigonométriques manquent."),
    c("3.2.2b", ALG, "Résoudre un système de 2 ou 3 équations linéaires (sans paramètre).", "partielle", m("seconde", "droite_systeme"), "Les systèmes 3 × 3 manquent."),
    c("3.2.3a", ALG, "Organiser les opérations menant à la solution, interpréter et présenter le résultat dans le contexte.", "complete", m("seconde", "equation_probleme", "inequation_intervalle")),
    c("3.2.4a", ALG, "Traduire une situation en équation, inéquation ou autre condition.", "complete", m("seconde", "equation_probleme", "expr_modeliser")),
    c("3.2.5a", ALG, "Justifier les étapes d'un calcul.", "partielle", m("seconde", "devfac_choisir_forme")),
    c("3.2.6a", ALG, "Commenter les extensions successives de la notion de nombre jusqu'aux réels.", "complete", m("seconde", "reels_ensembles")),
    c("3.3.1a", GEO, "Grands théorèmes de géométrie et de trigonométrie (longueurs, rapports, angles, aires), y compris les formules d'addition et de duplication.", "partielle", [...m("3e", "thales_reciproque", "pythagore_reciproque"), ...m("seconde", "geo_trigonometrie", "geo_trig_identite"), ...m("premiere-spe", "trig_valeurs", "ps_alkashi")], "Formules d'addition et de duplication : pas de micro."),
    c("3.3.1b", GEO, "Translations, symétries, rotations, homothéties dans le plan (sans définition formelle).", "complete", [...m("4e", "sym_translation", "sym_rotation"), ...m("3e", "sym_homothetie_rapport")]),
    c("3.3.1c", GEO, "Projections parallèles de figures ou de solides (sans définition formelle).", "partielle", m("seconde", "geo_projete_orthogonal"), "Seule la projection orthogonale est entraînée."),
    c("3.3.1d", GEO, "Calcul vectoriel dans le plan et l'espace : composantes, égalité, produit scalaire.", "complete", [...m("seconde", "vecteur_coordonnees", "vecteur_egalite"), ...m("premiere-spe", "ps_coordonnees"), ...m("terminale-spe", "espace_vecteurs", "ps_espace_calculer")]),
    c("3.3.1e", GEO, "Forme analytique de l'incidence, de l'alignement, de la concourance, du parallélisme, de l'orthogonalité, de la longueur.", "complete", [...m("seconde", "vecteur_colinearite", "droite_equation_reduite", "droite_parallelisme", "repere_distance"), ...m("premiere-spe", "gr_droites"), ...m("terminale-spe", "espace_plan_equation")]),
    c("3.3.1f", GEO, "Reconnaître une conique à partir d'une équation y² = 2px ou αx² + βy² = γ.", "partielle", m("premiere-spe", "gr_cercle_reconnaitre", "gr_parabole"), "Ellipse et hyperbole : pas de micro."),
    c("3.3.2a", GEO, "Déterminer une longueur, un angle, une relation entre points, droites, plans, une équation par une méthode routinière.", "complete", [...m("premiere-spe", "ps_angle_longueur", "gr_equation_droite"), ...m("terminale-spe", "espace_droite_parametrique")]),
    c("3.3.3a", GEO, "Choisir des propriétés et organiser une démarche pour déterminer des éléments d'une figure.", "complete", [...m("premiere-spe", "gr_configuration"), ...m("seconde", "repere_configuration")]),
    c("3.3.4a", GEO, "Tracer des figures à la main, aux instruments ou au logiciel pour illustrer ou éclairer une recherche.", "hors-coach", []),
    c("3.3.4b", GEO, "Relier les notions de géométrie à l'espace physique (mouvement, forces).", "hors-coach", []),
    c("3.3.4c", GEO, "Effectuer et interpréter des représentations planes de figures de l'espace.", "partielle", [...m("3e", "volume_representation", "section_cone_pyramide"), ...m("terminale-spe", "espace_position_relative")]),
    c("3.3.5a", GEO, "Organiser les étapes d'une construction et les justifier.", "hors-coach", []),
    c("3.3.5b", GEO, "Distinguer implication simple et équivalence, hypothèse et thèse.", "complete", m("premiere-spe", "log_implication", "log_equivalence", "log_reciproque")),
    c("3.3.5c", GEO, "Démarches logiques : négation, réciproque d'un énoncé (propositions du cours).", "complete", [...m("premiere-spe", "log_negation", "log_reciproque"), ...m("seconde", "logique_negation_contre_exemple")]),
    c("3.3.5d", GEO, "Rédiger une démonstration (faite en classe ou fournie) en faisant apparaître étapes, liens logiques et théorèmes.", "partielle", m("3e", "thales_rediger", "pythagore_rediger")),
    c("3.4.1a", DON, "Série à une variable discrète ou continue : paramètres de position et de dispersion.", "complete", m("seconde", "stat_mediane_quartiles", "stat_ecart_type", "stat_ecart_interquartile")),
    c("3.4.1b", DON, "Série à deux variables : principe de la méthode des moindres carrés.", "partielle", m("stmg", "statT_mc_comparer")),
    c("3.4.1c", DON, "Propriétés de base des probabilités simples et conditionnelles.", "complete", m("premiere-spe", "pc_conditionnelle", "pc_totales", "pc_independance")),
    c("3.4.1d", DON, "Permutations, combinaisons simples, arrangements.", "complete", m("terminale-spe", "denombrement_arrangement_combinaison", "denombrement_coefficient_binomial")),
    c("3.4.1e", DON, "Conditions d'application des lois : loi normale, loi binomiale.", "partielle", m("terminale-spe", "binomiale_schema", "binomiale_reconnaitre"), "La loi normale n'a pas de micro."),
    c("3.4.2a", DON, "Calculer, cumuler des pourcentages ; tableaux indicés (emprunts, tables de mortalité, dilution).", "partielle", [...m("seconde", "info_evolutions_successives"), ...m("stmg", "suiteT_somme_versements")], "Indices et tables de mortalité : pas de micro."),
    c("3.4.2b", DON, "Moyenne, médiane, quartiles, variance, écart type (outil informatique) et leur signification.", "complete", m("seconde", "stat_moyenne", "stat_mediane_quartiles", "stat_ecart_type", "stat_interpreter")),
    c("3.4.2c", DON, "Ajuster linéairement un nuage de points, par la méthode des moindres carrés.", "complete", m("stmg", "statT_nuage_representer", "statT_ajust_equation", "statT_mc_comparer")),
    c("3.4.2d", DON, "Estimer la pertinence d'un ajustement linéaire par le coefficient de corrélation.", "partielle", m("stmg", "statT_ajust_pertinence"), "Le coefficient de corrélation n'a pas de micro."),
    c("3.4.2e", DON, "Puissances d'un binôme par la formule de Newton.", "partielle", m("terminale-spe", "denombrement_coefficient_binomial", "denombrement_pascal"), "Le développement (a + b)ⁿ n'est pas entraîné."),
    c("3.4.3a", DON, "Résoudre des problèmes statistiques et probabilistes : arbres, tableaux, aires, lois de la somme et du produit, analyse combinatoire, lois.", "complete", [...m("premiere-spe", "pc_arbre", "pc_tableau"), ...m("terminale-spe", "denombrement_defi", "binomiale_calculer")]),
    c("3.4.4a", DON, "Représenter une série (fréquences, fréquences cumulées), y situer médiane et quartiles.", "partielle", m("seconde", "stat_mediane_quartiles"), "La courbe des fréquences cumulées n'a pas de micro."),
    c("3.4.4b", DON, "Représenter une série à deux variables et tracer la droite des moindres carrés.", "complete", m("stmg", "statT_nuage_representer", "statT_ajust_equation")),
    c("3.4.4c", DON, "Triangle de Pascal : premières lignes, lien avec un arbre, applications.", "complete", m("terminale-spe", "denombrement_pascal")),
    c("3.4.5a", DON, "Démontrer les formules de Cₙᵖ, la symétrie Cₙᵖ = Cₙⁿ⁻ᵖ et la formule de Pascal.", "partielle", m("terminale-spe", "denombrement_coefficient_binomial", "denombrement_pascal"), "Les formules sont utilisées, pas démontrées."),
    c("3.4.6a", DON, "Relier la probabilité à la fréquence statistique.", "complete", m("seconde", "echantillon_loi_grands_nombres", "echantillon_fluctuation")),
    c("3.4.6b", DON, "Dans une information, relever les notions statistiques, examiner procédés et conclusions de l'auteur, les critiquer.", "complete", [...m("seconde", "stat_interpreter"), ...m("4e", "proba_frequence_echantillon")]),
    c("4", "Culture scientifique et humaniste", "Intégrer le savoir dans une culture scientifique et humaniste : rôle des problèmes dans l'émergence des concepts, histoire des mathématiques.", "hors-coach", []),
  ],
};
