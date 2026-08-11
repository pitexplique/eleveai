// ÉPREUVE BLANCHE — évaluation nationale de 6ᵉ, mathématiques.
//
// LE CONTENU EST DU CM2 (Frédéric, 01/08) : l'évaluation de rentrée de 6ᵉ ne
// porte pas sur le programme de 6ᵉ — l'élève vient d'arriver. Elle mesure ce
// qui est sorti du CM2.
//
// ELLE COLLE AU SUJET OFFICIEL (Frédéric, 11/08, après la remarque de
// M. Pelka : « ce serait intéressant qu'elles ressemblent encore plus à celles
// des évaluations nationales »). Tout ce qui suit est relevé sur le document
// professeur de la DEPP, « Évaluation nationale — Classe de sixième —
// Mathématiques », septembre 2025 :
//
//   • TROIS DOMAINES, pas quatre. Nous en avions un cinquième, « Résoudre un
//     problème » — l'intuition était juste, le rangement non : la résolution
//     de problèmes n'est pas un domaine, c'est un TEST SPÉCIFIQUE qui traverse
//     les deux autres.
//   • 62 QUESTIONS EN 50 MINUTES, soit 48 secondes chacune. On ne reproduit
//     donc plus seulement la cadence (arbitrage du 01/08, pris en croyant
//     l'épreuve plus courte qu'elle n'est) : on reproduit l'épreuve.
//   • LES SEUILS DE MAÎTRISE sont donnés en nombre de réponses, domaine par
//     domaine, et ne tombent pas sur les mêmes proportions.
//
// Tout le mécanisme est dans moteur.ts ; ici, seulement ce qui est propre à
// cette épreuve : où piocher, selon quels domaines, et selon quel barème.

import { mathsCm2QuestionBank } from "@/lib/tutor-v4/questionBank/cm2/maths";
import { buildKnowledgeCm2Maths } from "@/lib/tutor-v4/knowledge/maths/cm2/buildKnowledgeCm2";
import type { ConfigEpreuve, ThemeEval, TypeItem } from "./moteur";

const knowledge = buildKnowledgeCm2Maths();

// ─── Ce qui relève des deux tests spécifiques ────────────────────────────────
//
// LE PARTAGE SE FAIT SUR LA MICRO-COMPÉTENCE, pas sur la notion : « calculer
// une durée » est un problème, « lire une heure » est un automatisme, et les
// deux vivent sous `duree`.
//
// AUTOMATISMES — « des tâches relevant d'une activité mentale pouvant être
// attendue dans un temps court ». Lire, comparer, ranger, convertir, estimer,
// et les techniques posées : tout ce qui doit venir sans être reconstruit.

const AUTOMATISMES = [
  // Nombres et calculs
  "entier_lire",
  "entier_comparer",
  "entier_decomposer",
  "entier_arrondir",
  "entier_multiple",
  "decimal_lire",
  "decimal_fraction",
  "decimal_valeur_chiffre",
  "decimal_comparer",
  "decimal_ordonner",
  "decimal_droite",
  "decimal_arrondir",
  "fraction_lire",
  "fraction_representer",
  "fraction_droite",
  "fraction_comparer",
  "fraction_equivalente",
  "fraction_decimale",
  "calcul_mental",
  "calcul_addition_posee",
  "calcul_soustraction_posee",
  "calcul_decimal_addition",
  "calcul_decimal_soustraction",
  "calcul_priorite",
  "multiplication_table",
  "multiplication_mental",
  "multiplication_posee",
  "multiplication_puissance_dix",
  "division_sens",
  "division_lien_multiplication",
  "division_posee",
  "suite_continuer",
  "suite_croissante_decroissante",
  "pourcentage_comprendre",
  "pourcentage_fraction_decimal",
  "algebre_egalite",
  "algebre_completer_egalite",
  // Grandeurs et mesures
  "longueur_comparer",
  "longueur_convertir",
  "longueur_estimer",
  "masse_comparer",
  "masse_convertir",
  "masse_estimer",
  "contenance_comparer",
  "contenance_convertir",
  "contenance_estimer",
  "duree_lire",
  "duree_convertir",
  "angle_reconnaitre",
  "angle_droit",
  "angle_type",
  "angle_mesurer",
  "perimetre_comprendre",
  "aire_comprendre",
];

// RÉSOLUTION DE PROBLÈMES — « reconnaissance et automatisation de procédures
// de résolutions ; compréhension des situations en inhibant des biais
// cognitifs ». Une situation à lire, à modéliser, et une question à laquelle
// aucune technique seule ne répond.
const RESOLUTION_PROBLEMES = [
  // Nombres et calculs
  "probleme_choisir_operation",
  "probleme_une_etape",
  "probleme_plusieurs_etapes",
  "probleme_rediger",
  "multiplication_probleme",
  "division_probleme",
  "division_reste",
  "prop_reconnaitre",
  "prop_tableau",
  "prop_coefficient",
  "prop_quatrieme",
  "prop_probleme",
  "pourcentage_calculer",
  "pourcentage_probleme",
  "algebre_nombre_inconnu",
  "algebre_schema_barre",
  "algebre_relation",
  // Grandeurs et mesures
  "duree_calculer",
  "duree_probleme",
  "echelle_comprendre",
  "echelle_distance_reelle",
  "echelle_distance_plan",
  "perimetre_triangle",
  "perimetre_quadrilatere",
  "perimetre_polygone",
  "aire_carre_rectangle",
  "aire_triangle_rectangle",
  "aire_composer",
];

// ⛔ AUCUNE MICRO-COMPÉTENCE D'ESPACE ET GÉOMÉTRIE N'EST ICI, et ce n'est pas
// un oubli : le document officiel le dit en toutes lettres — les deux tests
// spécifiques « relèvent de deux domaines distincts : Nombres et calculs et
// Grandeurs et mesures ». Les 14 questions de géométrie sont toutes des
// « autres ». En classer une ici la ferait disparaître de l'épreuve.
const TYPES_MICRO = new Map<string, TypeItem>([
  ...AUTOMATISMES.map((m) => [m, "automatisme"] as const),
  ...RESOLUTION_PROBLEMES.map((m) => [m, "resolution_probleme"] as const),
]);

// ─── Les trois domaines ──────────────────────────────────────────────────────
//
// ⛔ `probabilite` N'EST DANS AUCUN D'EUX, et ses 81 items sortent donc de
// l'épreuve. Les probabilités ne sont pas au programme du cycle 3 — elles
// commencent au cycle 4. Les poser à un entrant de 6ᵉ, c'est l'évaluer sur ce
// qu'on ne lui a jamais enseigné. Elles restent dans le coach, où elles sont à
// leur place.
//
// ⚠️ ET `algorithmique` EST EN GÉOMÉTRIE, ce qui surprend jusqu'à ce qu'on
// relise le programme : « programmer des déplacements d'un robot ou ceux d'un
// personnage sur un écran […] corriger un programme erroné » figure sous
// « (Se) repérer et (se) déplacer dans l'espace ». C'est de la géométrie.

const DOMAINES: ThemeEval[] = [
  {
    id: "espace_geometrie",
    label: "Espace et géométrie",
    quoi: "Reconnaître les figures et les solides, se repérer, se déplacer.",
    notions: [
      "figure_plane",
      "solide",
      "droite",
      "symetrie",
      "reperage",
      "algorithmique",
    ],
    nbQuestions: 14,
    repartition: [{ type: "autre", nbQuestions: 14 }],
    seuils: { aBesoinsMax: 5, satisfaisantMin: 9 },
  },
  {
    id: "grandeurs_mesures",
    label: "Grandeurs et mesures",
    quoi: "Longueurs, masses, contenances, durées, angles, périmètres et aires.",
    notions: [
      "longueur",
      "masse",
      "contenance",
      "duree",
      "angle",
      "perimetre",
      "aire",
      "echelle",
    ],
    nbQuestions: 18,
    repartition: [
      { type: "automatisme", nbQuestions: 8 },
      { type: "resolution_probleme", nbQuestions: 9 },
      { type: "autre", nbQuestions: 1 },
    ],
    seuils: { aBesoinsMax: 5, satisfaisantMin: 10 },
  },
  {
    id: "nombres_calculs",
    label: "Nombres et calculs",
    quoi: "Lire, comparer, calculer — entiers, décimaux, fractions et données.",
    notions: [
      "nombre_entier",
      "nombre_decimal",
      "fraction",
      "calcul",
      "multiplication",
      "division",
      "suite",
      "algebre",
      "proportionnalite",
      "pourcentage",
      "probleme",
      "tableau",
      "graphique",
    ],
    nbQuestions: 30,
    repartition: [
      { type: "automatisme", nbQuestions: 15 },
      { type: "resolution_probleme", nbQuestions: 10 },
      { type: "autre", nbQuestions: 5 },
    ],
    seuils: { aBesoinsMax: 10, satisfaisantMin: 17 },
  },
];

export const CONFIG_6E_MATHS: ConfigEpreuve = {
  slug: "6e-maths",
  classe: "6e",
  matiere: "maths",
  classeSource: "cm2",
  labelSource: "le CM2",
  matiereLabel: "Mathématiques",
  // 50 MINUTES — la durée officielle de passation. Le ministère annonce
  // 60 minutes par discipline : ce sont 10 minutes de prise en main, que nous
  // faisons à part, puis 50 minutes d'épreuve. Pour 62 questions, cela laisse
  // 48 secondes chacune.
  dureeSecondes: 50 * 60,
  volumeOfficiel: true,
  themes: DOMAINES,
  testsSpecifiques: [
    {
      id: "automatisme",
      label: "Automatismes",
      quoi: "Mobiliser directement des procédures et des connaissances.",
      seuils: { aBesoinsMax: 6, satisfaisantMin: 13 },
    },
    {
      id: "resolution_probleme",
      label: "Résolution de problèmes",
      quoi: "Résoudre des problèmes en utilisant des nombres et des grandeurs.",
      seuils: { aBesoinsMax: 4, satisfaisantMin: 10 },
    },
  ],
  typesMicro: TYPES_MICRO,
  banque: mathsCm2QuestionBank,
  labelsNotion: new Map(knowledge.notions.map((n) => [n.id, n.label])),
  labelsMicro: new Map(knowledge.microSkills.map((m) => [m.id, m.label])),
};
