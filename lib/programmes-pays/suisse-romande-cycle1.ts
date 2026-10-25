// Suisse romande, CYCLE 1 (1re à 4e années HarmoS, 4 à 8 ans).
// Source OFFICIELLE : Plan d'études romand (PER), CIIP, version 3.0 d'août 2024,
// domaine MSN, discipline Mathématiques, objectifs MSN 11 à MSN 15.
// Site : https://portail.ciip.ch/per (ancien plandetudes.ch).
// Relevé le 25/10/2026 dans les tableaux « Progression des apprentissages »,
// lus par l'API publique du site :
//   https://per.ciip.ch/api/bdper/objectifs-apprentissage/{36,37,38,39,167}/tableau
// Deux colonnes seulement : « 1re – 2e années » et « 3e – 4e années ».
// On ne fait que 3-4H (6-8 ans, = CP-CE1) : 1-2H est l'école enfantine
// (4-6 ans, nombres jusqu'à 12, manipulation), sans micros chez nous (pas de
// maternelle) ; cette classe reste grisée.
// Domaine numérique en 3-4H : 0 à 20 en 3H, 0 à 200 en 4H (MSN 13).
// Codes : objectif officiel + une lettre à nous.

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

const ESP = "MSN 11 — Espace";
const NB = "MSN 12 — Nombres";
const OP = "MSN 13 — Opérations";
const GM = "MSN 14 — Grandeurs et mesures";
const MOD = "MSN 15 — Modélisation";

export const SUISSE_3_4H: ProgrammePays = {
  pays: "suisse",
  cle: "3-4h",
  niveau: "3e – 4e années (3H-4H, cycle 1)",
  equivalentFrance: "cp",
  source: "https://portail.ciip.ch/per",
  version: "Plan d'études romand (CIIP), version 3.0 août 2024, MSN 11 à 15, relevé le 25/10/2026",
  contenus: [
    c("MSN 11-a", ESP, "Manipuler, observer, reconnaître, décrire et nommer des formes géométriques simples : solides et formes planes.", "complete",
      [...m("cp", "cp_figure_reconnaitre", "cp_figure_decrire", "cp_solide_reconnaitre", "cp_solide_faces"), ...m("ce1", "ce1_figure_reconnaitre", "ce1_solide_nommer")]),
    c("MSN 11-b", ESP, "Composer une surface élémentaire à partir d'autres surfaces élémentaires ; construire une forme plane ou un solide avec du matériel (plots, mosaïque…).", "partielle",
      [...m("cp", "cp_reperage_assemblage"), ...m("ce1", "ce1_espace_assemblages", "ce1_solide_construire")],
      "La manipulation réelle ne se remplace pas ; nos micros la travaillent sur image."),
    c("MSN 11-c", ESP, "Classer des objets selon deux critères (forme, taille, orientation…).", "partielle",
      m("ce1", "ce1_figure_proprietes"), "Pas de micro de tri selon deux critères (tableau à double entrée de formes)."),
    c("MSN 11-d", ESP, "Observer « ce qui change » et « ce qui ne change pas » lors de transformations géométriques ; reproduire et réaliser des formes planes (frises, pavages…).", "partielle",
      m("ce1", "ce1_algo_repetition"), "Les frises (motif qui se répète) sont effleurées ; pas de micro « pavage » ni d'observation d'une transformation."),
    c("MSN 11-e", ESP, "Situer sa position ou celle d'un objet (devant, derrière, sur, sous, entre, à gauche, à droite…) selon différents repères ; décrire un trajet (départ, arrivée, directions, repères) ; code personnel pour mémoriser un itinéraire.", "complete",
      [...m("cp", "cp_reperage_vocabulaire", "cp_reperage_gauche_droite", "cp_reperage_deplacement"), ...m("ce1", "ce1_espace_positions", "ce1_reperage_deplacement", "ce1_algo_deplacement")]),
    c("MSN 12-a", NB, "Dénombrer une collection par comptage organisé, par groupements de 10 ; estimer le nombre d'objets par perception globale.", "partielle",
      [...m("cp", "cp_entier_denombre", "cp_entier_dizaine_unite"), ...m("ce1", "ce1_entier_denombrer")],
      "L'estimation globale (sans compter) n'a pas de micro propre."),
    c("MSN 12-b", NB, "Comparer des collections ou constituer une collection d'un nombre donné (terme à terme, dénombrement, estimation).", "complete",
      m("cp", "cp_entier_construire_collection", "cp_entier_comparer")),
    c("MSN 12-c", NB, "Produire le nombre plus grand ou plus petit d'une unité ; compter et décompter de 1 en 1, de 10 en 10 à partir d'un nombre ; compter de 2 en 2, de 5 en 5 à partir de 0.", "complete",
      [...m("cp", "cp_suite_compter_avant", "cp_suite_compter_arriere", "cp_suite_2_5_10", "cp_calcul_plus_moins_1_2_10"), ...m("ce1", "ce1_suite_pas", "ce1_suite_10_100")]),
    c("MSN 12-d", NB, "Reconnaître quelques suites numériques (pair, impair…).", "complete",
      [...m("ce1", "ce1_nombre_parite", "ce1_suite_continuer"), ...m("cp", "cp_suite_completer")]),
    c("MSN 12-e", NB, "Passer du mot-nombre (oral ou écrit) à l'écriture chiffrée et à la décomposition en unités et dizaines, et inversement (0 à 200).", "complete",
      [...m("cp", "cp_entier_lire_ecrire", "cp_entier_decomposer"), ...m("ce1", "ce1_entier_lire_ecrire", "ce1_entier_centaines", "ce1_entier_decomposer")]),
    c("MSN 12-f", NB, "Comparer, classer, encadrer, intercaler des nombres.", "complete",
      [...m("cp", "cp_entier_ordonner", "cp_entier_droite"), ...m("ce1", "ce1_entier_comparer", "ce1_entier_encadrer", "ce1_entier_ordonner")]),
    c("MSN 13-a", OP, "Traduire les données d'un problème en additions et soustractions.", "complete",
      [...m("cp", "cp_probleme_additif", "cp_probleme_soustractif", "cp_probleme_schema"), ...m("ce1", "ce1_probleme_add_sous", "ce1_probleme_comparaison")]),
    c("MSN 13-b", OP, "Approche de la multiplication par des situations-problèmes : itération (5+5+5), produit cartésien (3×5).", "complete",
      [...m("cp", "cp_mult_sens", "cp_probleme_multiplicatif"), ...m("ce1", "ce1_multiplication_sens", "ce1_probleme_multiplicatif")]),
    c("MSN 13-c", OP, "Surcomptage ; calcul réfléchi avec un support (bande numérique, tableau des nombres), répertoire mémorisé, calculatrice ; propriétés de la numération et de l'addition (commutativité, associativité, élément neutre).", "complete",
      [...m("cp", "cp_add_calculer", "cp_calcul_complement_dizaine", "cp_calcul_ajouter_deux_nombres"), ...m("ce1", "ce1_calcul_dizaines_centaines", "ce1_calcul_ajouter_9_19_29_39")]),
    c("MSN 13-d", OP, "Mémoriser le répertoire additif (0+0 à 9+9) et soustractif (0−0 à 10−10).", "complete",
      [...m("cp", "cp_calcul_tables_addition", "cp_calcul_complements_10", "cp_calcul_doubles"), ...m("ce1", "ce1_calcul_tables_addition")]),
    c("MSN 13-e", OP, "Anticiper le résultat d'un calcul.", "complete",
      m("ce1", "ce1_add_sous_estimer")),
    c("MSN 14-a", GM, "Expérimenter avec différents matériaux (eau, sable, bâtons, carrelages…).", "hors-coach", [], "Manipulation en classe."),
    c("MSN 14-b", GM, "Organiser un mesurage, choisir une unité (conventionnelle ou non) et une procédure (longueur, aire, volume, masse, temps) ; estimer longueurs et aires en reportant ou en recouvrant avec une unité.", "partielle",
      [...m("cp", "cp_longueur_mesurer_unite", "cp_longueur_regle", "cp_masse_contenance_estimer"), ...m("ce1", "ce1_longueur_choisir_unite", "ce1_longueur_estimer")],
      "L'aire par recouvrement (pavage d'une surface par une unité) n'a pas de micro avant le CM1."),
    c("MSN 14-c", GM, "Comparer directement ou indirectement et classer des objets selon une grandeur (longueur, aire, volume, masse) ; relier grandeurs perçues et mesurées.", "complete",
      [...m("cp", "cp_longueur_comparer", "cp_masse_comparer"), ...m("ce1", "ce1_longueur_comparer", "ce1_masse_comparer", "ce1_masse_soupeser")]),
    c("MSN 11-14", MOD, "Résolution de problèmes (espace, nombres, additions, mesures) : démarche, essais, vérification, communication.", "hors-coach", []),
    c("MSN 15", MOD, "Représenter des phénomènes ou des situations mathématiques : « cet objectif n'est pas travaillé pour lui-même ».", "hors-coach", []),
  ],
};
