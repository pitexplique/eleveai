// ÉPREUVE BLANCHE — évaluation nationale de 6ᵉ, français.
//
// LE CONTENU EST DU CM2, comme en maths et pour la même raison : l'évaluation
// de rentrée mesure ce que l'élève emporte du primaire.
//
// LES THÈMES SUIVENT LES DOMAINES OFFICIELS (document éduscol de septembre
// 2025, « Évaluation nationale — classe de sixième — Français ») :
//   compréhension de l'écrit · étude de la langue (lexique, grammaire,
//   orthographe) · compréhension de l'oral · fluence.
// Le découpage réel de l'épreuve officielle : 10 items sur un texte
// littéraire, 9 sur un document composite, 15 de lexique, 9 de grammaire,
// 9 d'orthographe, 8 de compréhension de l'oral — 60 items en 50 minutes.
//
// CE QU'ON NE FAIT PAS, ET POURQUOI :
//   - la FLUENCE est hors de portée : elle n'est pas numérique, c'est une
//     minute de lecture à voix haute en tête-à-tête avec un professeur ;
//   - la COMPRÉHENSION DE L'ORAL demande un support audio. C'est faisable —
//     la dictée du jour a déjà sa synthèse vocale — mais ce sera un autre
//     chantier, pas un thème qu'on bricole.
// On ne promet donc que les deux domaines qu'on couvre vraiment, et on le
// dit à l'élève sur la page.
//
// Vivier vérifié avant d'écrire ceci (npx tsx scripts/auditer-banque-runtime.ts
// cm2 --epreuve --variete) : 50 micro-compétences couvertes à 100 %, 1613
// énoncés distincts, et 100 % des items exploitables en questions fermées —
// ce que l'épreuve exige, puisque l'évaluation nationale ne pose que des
// questions fermées où « seule l'action de cliquer est autorisée ».

import { francaisCm2QuestionBank } from "@/lib/tutor-v4/questionBank/cm2/francais";
import { buildKnowledgeCm2Francais } from "@/lib/tutor-v4/knowledge/francais/cm2/buildKnowledgeCm2Francais";
import { SUPPORTS_CM2, SUPPORTS_ORAL_CM2 } from "./supports";
import type { ConfigEpreuve, ThemeEval } from "./moteur";

const knowledge = buildKnowledgeCm2Francais();

const THEMES: ThemeEval[] = [
  {
    id: "ecrit",
    label: "Comprendre ce qu'on lit",
    quoi: "Textes, documents, images — et les œuvres qu'on a lues.",
    notions: ["comprehension_textes_documents", "lecture_oeuvres"],
    nbQuestions: 5,
    // Un texte entier et cinq questions dessus, comme la vraie épreuve. Les
    // notions ci-dessus ne servent que si tous les supports ont déjà servi.
    supports: SUPPORTS_CM2,
  },
  {
    id: "lexique",
    label: "Le lexique",
    quoi: "Le sens des mots, leurs nuances, et comment ils s'écrivent.",
    notions: ["vocabulaire"],
    nbQuestions: 5,
  },
  {
    id: "grammaire",
    label: "La phrase et les accords",
    quoi: "Constituants de la phrase simple, phrase complexe, accords et homophones.",
    notions: ["grammaire_orthographe", "phrase_complexe"],
    nbQuestions: 5,
  },
  {
    id: "conjugaison",
    label: "Les verbes : temps et valeurs",
    quoi: "Conjuguer, mais surtout savoir ce qu'un temps veut dire.",
    notions: ["conjugaison"],
    nbQuestions: 5,
  },
  // Le quatrième domaine de l'épreuve officielle : on écoute, le texte ne
  // s'affiche pas, on répond de mémoire.
  {
    id: "oral",
    label: "Comprendre ce qu'on écoute",
    quoi: "Un enregistrement, deux écoutes, et rien sous les yeux.",
    notions: ["oral"],
    nbQuestions: 5,
    supports: SUPPORTS_ORAL_CM2,
  },
];

export const CONFIG_6E_FRANCAIS: ConfigEpreuve = {
  slug: "6e-francais",
  classe: "6e",
  matiere: "francais",
  classeSource: "cm2",
  labelSource: "le CM2",
  matiereLabel: "Français",
  dureeSecondes: 50 * 60,
  reserve:
    "Une seule chose de l'épreuve officielle manque ici : la fluence, qui se passe à voix haute, en tête à tête avec un professeur — un ordinateur ne peut pas l'évaluer. La compréhension de l'oral, elle, y est : prévois des écouteurs ou une pièce calme.",
  themes: THEMES,
  banque: francaisCm2QuestionBank,
  labelsNotion: new Map(knowledge.notions.map((n) => [n.id, n.label])),
  labelsMicro: new Map(knowledge.microSkills.map((m) => [m.id, m.label])),
};
