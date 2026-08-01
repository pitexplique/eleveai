// ÉPREUVE BLANCHE — évaluation nationale de 4ᵉ, français.
//
// LE CONTENU EST DE LA 5ᵉ, comme la 6ᵉ prend le CM2 : l'évaluation de rentrée
// mesure ce que l'élève emporte de l'année d'avant.
//
// LES THÈMES SUIVENT LES DOMAINES OFFICIELS (document éduscol de septembre
// 2025, « Évaluation nationale — classe de quatrième — Français ») :
// compréhension de l'écrit (texte littéraire 10 items + groupement thématique
// 9), étude de la langue (lexique 15, grammaire 12, orthographe 12),
// compréhension de l'oral (9), fluence à part — 67 items en 50 minutes.
//
// Le cahier officiel de 5ᵉ montre l'esprit du dernier thème : on n'y demande
// presque jamais une terminaison, on demande CE QU'UN TEMPS VEUT DIRE —
// « cette phrase signifie que Mathis… », « l'impératif exprime un ordre, un
// souhait ou une impossibilité ». D'où « Les discours et les temps » plutôt
// que « conjugaison ».
//
// ⚠️ VIVIER PLUS MAIGRE QU'EN 6ᵉ. Le builder du cycle 4 (5e/4e/3e) produit
// 246 énoncés distincts en 5ᵉ, 7 par micro-compétence, contre 1613 et 32 en
// CM2 (npx tsx scripts/auditer-banque-runtime.ts 5e --variete). Le premier
// passage n'en souffre pas — l'épreuve tire 20 micro-compétences sur les 34
// du niveau — mais c'est la tenue dans la durée qu'il faut surveiller, et
// l'enrichissement du builder cycle 4 reste le vrai chantier de contenu.

import { francais5eQuestionBank } from "@/lib/tutor-v4/questionBank/5e/francais";
import { buildKnowledge5eFrancais } from "@/lib/tutor-v4/knowledge/francais/5e/buildKnowledge5eFrancais";
import type { ConfigEpreuve, ThemeEval } from "./moteur";

const knowledge = buildKnowledge5eFrancais();

const THEMES: ThemeEval[] = [
  {
    id: "ecrit",
    label: "Comprendre ce qu'on lit",
    quoi: "Interpréter un texte, l'apprécier, et le relier à ce qu'on a lu.",
    notions: ["lecture_comprehension", "culture_litteraire"],
    nbQuestions: 5,
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
    quoi: "Constituants de la phrase, phrase complexe, accords.",
    notions: ["grammaire_phrase"],
    nbQuestions: 5,
  },
  {
    id: "discours",
    label: "Les discours et les temps",
    quoi: "Qui parle, sur quel ton — et ce qu'un temps veut dire.",
    notions: ["analyse_discours", "conjugaison"],
    nbQuestions: 5,
  },
];

export const CONFIG_4E_FRANCAIS: ConfigEpreuve = {
  slug: "4e-francais",
  classe: "4e",
  matiere: "francais",
  classeSource: "5e",
  labelSource: "la 5ᵉ",
  matiereLabel: "Français",
  dureeSecondes: 50 * 60,
  reserve:
    "L'épreuve officielle comporte deux choses qu'on ne peut pas reproduire ici : la fluence, qui se passe à voix haute avec un professeur, et la compréhension de l'oral, qui demande d'écouter un enregistrement. Elles viendront.",
  themes: THEMES,
  banque: francais5eQuestionBank,
  labelsNotion: new Map(knowledge.notions.map((n) => [n.id, n.label])),
  labelsMicro: new Map(knowledge.microSkills.map((m) => [m.id, m.label])),
};
