// ÉPREUVE BLANCHE — évaluation nationale de 4ᵉ, mathématiques.
//
// LE CONTENU EST DE LA 5ᵉ (Frédéric, 01/08), pour la même raison qu'en 6ᵉ on
// prend le CM2 : l'évaluation de rentrée mesure ce que l'élève emporte de
// l'année d'avant, pas ce qu'il n'a pas encore appris.
//
// Vivier vérifié avant d'écrire ceci : 86 micro-compétences couvertes à
// 100 %, 629 items fixes et 236 générateurs (node scripts/auditer-banque.mjs
// 5e maths). Au passage, la notion « opérations sur les relatifs » semblait
// vide : son fichier s'appelait operations-relatifs.bank.ts.ts et personne
// ne le lisait — corrigé.

import { maths5eQuestionBank } from "@/lib/tutor-v4/questionBank/5e/maths";
import { buildKnowledge5eMaths } from "@/lib/tutor-v4/knowledge/maths/5e/buildKnowledge5e";
import type { ConfigEpreuve, ThemeEval } from "./moteur";

const knowledge = buildKnowledge5eMaths();

// Les quatre domaines, avec les 13 notions de 5ᵉ réparties. Équilibre voulu :
// 4 notions pour les nombres, 2 pour les grandeurs, 3 pour la géométrie,
// 4 pour les données — assez de matière partout pour cinq questions tirées
// sur cinq micro-compétences différentes.
const THEMES: ThemeEval[] = [
  {
    id: "nombres",
    label: "Les nombres et le calcul",
    quoi: "Relatifs, fractions et premières lettres du calcul littéral.",
    notions: [
      "relatif_nombre",
      "relatif_operation",
      "fraction_nombre",
      "litteral_calcul",
    ],
    nbQuestions: 5,
  },
  {
    id: "grandeurs",
    label: "Les grandeurs et les mesures",
    // ⚠️ LES CONVERSIONS ONT ÉTÉ AJOUTÉES LE 15/08, sur constat des items
    // officiels : l'évaluation nationale teste dans ce domaine 135 min en
    // heures et minutes, 75 L en centilitres, et un problème lait/beurre qui
    // mêle kilogrammes et grammes. Ce thème ne proposait qu'aires et volumes —
    // cinq questions sur vingt ne ressemblaient pas à celles du jour J.
    quoi: "Conversions, durées, aires des figures usuelles et volumes des solides.",
    notions: ["grandeur_conversion", "aire_surface", "volume_solide"],
    nbQuestions: 5,
  },
  {
    id: "espace",
    label: "L'espace et la géométrie",
    quoi: "Triangles, angles et symétrie centrale.",
    notions: ["triangle_figure", "angle_mesure", "sym_centrale"],
    nbQuestions: 5,
  },
  {
    id: "donnees",
    label: "Données, proportionnalité et problèmes",
    quoi: "Lire des statistiques, comparer des chances, raisonner par étapes.",
    notions: [
      "prop_proportionnalite",
      "stat_statistique",
      "proba_experience",
      "algo_programmation",
    ],
    nbQuestions: 5,
  },
];

export const CONFIG_4E_MATHS: ConfigEpreuve = {
  slug: "4e-maths",
  classe: "4e",
  matiere: "maths",
  classeSource: "5e",
  labelSource: "la 5ᵉ",
  matiereLabel: "Mathématiques",
  // Une minute par question, comme en 6ᵉ — voir 6e-maths.ts.
  dureeSecondes: 20 * 60,
  themes: THEMES,
  banque: maths5eQuestionBank,
  labelsNotion: new Map(knowledge.notions.map((n) => [n.id, n.label])),
  labelsMicro: new Map(knowledge.microSkills.map((m) => [m.id, m.label])),
};
