// ÉPREUVE BLANCHE — évaluation nationale de 6ᵉ, mathématiques.
//
// LE CONTENU EST DU CM2 (Frédéric, 01/08) : l'évaluation de rentrée de 6ᵉ ne
// porte pas sur le programme de 6ᵉ — l'élève vient d'arriver. Elle mesure ce
// qui est sorti du CM2.
//
// Tout le mécanisme est dans moteur.ts ; ici, seulement ce qui est propre à
// cette épreuve : où piocher, et selon quels thèmes.

import { mathsCm2QuestionBank } from "@/lib/tutor-v4/questionBank/cm2/maths";
import { buildKnowledgeCm2Maths } from "@/lib/tutor-v4/knowledge/maths/cm2/buildKnowledgeCm2";
import type { ConfigEpreuve, ThemeEval } from "./moteur";

const knowledge = buildKnowledgeCm2Maths();

// Les quatre domaines de l'évaluation nationale de 6ᵉ en mathématiques.
// 5 questions par thème = 20 questions.
const THEMES: ThemeEval[] = [
  {
    id: "nombres",
    label: "Les nombres et le calcul",
    quoi: "Lire, comparer, calculer — entiers, décimaux et fractions.",
    notions: [
      "nombre_entier",
      "nombre_decimal",
      "fraction",
      "calcul",
      "multiplication",
      "division",
      "suite",
      "algebre",
    ],
    nbQuestions: 5,
  },
  {
    id: "grandeurs",
    label: "Les grandeurs et les mesures",
    quoi: "Longueurs, masses, contenances, durées, périmètres et aires.",
    notions: [
      "longueur",
      "masse",
      "contenance",
      "duree",
      "perimetre",
      "aire",
      "angle",
      "echelle",
    ],
    nbQuestions: 5,
  },
  {
    id: "espace",
    label: "L'espace et la géométrie",
    quoi: "Reconnaître les figures, se repérer, tracer.",
    notions: ["figure_plane", "droite", "symetrie", "solide", "reperage"],
    nbQuestions: 5,
  },
  {
    id: "problemes",
    label: "Résoudre un problème",
    quoi: "Lire des données, raisonner, trouver ce qu'on cherche.",
    notions: [
      "probleme",
      "proportionnalite",
      "pourcentage",
      "tableau",
      "graphique",
      "probabilite",
      "algorithmique",
    ],
    nbQuestions: 5,
  },
];

export const CONFIG_6E_MATHS: ConfigEpreuve = {
  slug: "6e-maths",
  classe: "6e",
  matiere: "maths",
  classeSource: "cm2",
  labelSource: "le CM2",
  matiereLabel: "Mathématiques",
  // UNE MINUTE PAR QUESTION (arbitrage de Frédéric, 01/08). On donnait
  // 50 minutes pour 20 questions — 2 min 30 chacune, quand la vraie épreuve
  // en laisse moins d'une. Ce qu'on reproduit désormais, c'est la CADENCE,
  // pas le volume : moins de questions que le jour J, mais au même tempo.
  dureeSecondes: 20 * 60,
  themes: THEMES,
  banque: mathsCm2QuestionBank,
  labelsNotion: new Map(knowledge.notions.map((n) => [n.id, n.label])),
  labelsMicro: new Map(knowledge.microSkills.map((m) => [m.id, m.label])),
};
