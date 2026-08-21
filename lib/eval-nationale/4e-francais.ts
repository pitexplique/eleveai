// ÉPREUVE BLANCHE — évaluation nationale de 4ᵉ, français.
//
// LE CONTENU EST DE LA 5ᵉ, comme la 6ᵉ prend le CM2 : l'évaluation de rentrée
// mesure ce que l'élève emporte de l'année d'avant.
//
// ELLE REPREND LE VOLUME DU SUJET OFFICIEL DEPUIS LE 16/08 : 67 questions en
// 50 minutes. Elle en posait 25 en 25 minutes. C'est la dernière des quatre
// épreuves à passer au volume du jour J.
//
// LES SIX DOMAINES SONT CEUX DU BILAN OFFICIEL, relevés sur le document de
// résultats 2025 — les mêmes qu'en 6ᵉ : compréhension de l'oral ·
// compréhension de l'écrit · étude de la langue Grammaire · étude de la
// langue Orthographe · lexique · fluence. Et le découpage en items, du
// document éduscol :
//   10 texte littéraire · 9 groupement de documents · 15 lexique ·
//   12 grammaire · 12 orthographe · 9 compréhension de l'oral = 67.
//
// ⚠️ TROIS ÉCARTS AVEC LA 6ᵉ, ET ILS SONT TOUS DANS LE SUJET : l'étude de la
// langue pèse plus lourd (12 + 12 au lieu de 9 + 9), l'oral pose une question
// de plus, et le second support d'écrit est un GROUPEMENT de documents — pas
// un document composite. Trois textes à confronter, là où la 6ᵉ en donne un
// seul à décomposer.
//
// ⭐ ET UNE BONNE SURPRISE : en 5ᵉ, `grammaire_phrase` et
// `orthographe_grammaticale` sont DÉJÀ deux notions distinctes. Le filtre par
// micro-compétence (`ThemeEval.micros`) écrit pour la 6ᵉ — où les deux
// familles vivaient sous une seule notion — n'a pas à servir ici.
//
// ⚠️ LE THÈME « LES DISCOURS ET LES TEMPS » DISPARAÎT, comme la conjugaison
// en 6ᵉ. Le bilan officiel ne connaît pas ce domaine : rapporter des paroles,
// ajuster un registre, dire ce qu'un temps veut dire, tout cela relève de
// l'étude de la langue. Ses micro-compétences rejoignent la grammaire, où le
// cahier officiel de 5ᵉ les met déjà — on n'y demande presque jamais une
// terminaison, on demande ce qu'un temps signifie.
//
// CE QU'ON NE FAIT PAS : la FLUENCE, et elle seule — une minute de lecture à
// voix haute en tête-à-tête avec un professeur, qu'aucun ordinateur ne peut
// évaluer. C'est dit à l'élève sur la page (champ `reserve`).
//
// 📏 VIVIER MESURÉ AVANT DE MONTER LE COMPTEUR :
//   littéraire   4 supports × 10 questions — le compte exact, pas un de plus
//   groupement   2 supports ×  9 questions
//   oral        10 supports ×  9 questions
//   lexique     155 énoncés ÷ 15 = 10 passages · 11 micro-compétences
//   grammaire   538 énoncés ÷ 12 = 44 passages · 35 micro-compétences
//   orthographe 121 énoncés ÷ 12 = 10 passages ·  6 micro-compétences
//
// ⏳ COMME EN 6ᵉ, L'ORTHOGRAPHE EST LE PLANCHER de la banque — six
// micro-compétences pour tout un domaine. Et comme en 6ᵉ, c'est le domaine où
// le collège de référence décroche le plus : 38 % d'élèves à besoins en
// orthographe contre 19 % en grammaire. Le même trou des deux côtés.

import { francais5eQuestionBank } from "@/lib/tutor-v4/questionBank/5e/francais";
import { buildKnowledge5eFrancais } from "@/lib/tutor-v4/knowledge/francais/5e/buildKnowledge5eFrancais";
import {
  SUPPORTS_5E_LITTERAIRE,
  SUPPORTS_5E_COMPOSITE,
  SUPPORTS_ORAL_5E,
} from "./supports";
import type { ConfigEpreuve, ThemeEval } from "./moteur";

const knowledge = buildKnowledge5eFrancais();

const THEMES: ThemeEval[] = [
  {
    id: "ecrit_litteraire",
    label: "Comprendre un texte littéraire",
    quoi: "Un récit entier — ce qu'il dit, ce qu'il tait, et l'atmosphère qu'il installe.",
    notions: ["lecture_comprehension", "culture_litteraire"],
    nbQuestions: 10,
    // Les notions ci-dessus ne servent que si tous les textes ont déjà servi.
    supports: SUPPORTS_5E_LITTERAIRE,
  },
  {
    id: "ecrit_composite",
    label: "Comprendre un groupement de documents",
    quoi: "Un article, une enquête, un témoignage — et ce qu'ils disent ensemble.",
    notions: ["lecture_comprehension"],
    nbQuestions: 9,
    supports: SUPPORTS_5E_COMPOSITE,
  },
  {
    id: "lexique",
    label: "Lexique",
    quoi: "Le sens des mots, leurs nuances, et comment ils sont fabriqués.",
    notions: ["vocabulaire"],
    nbQuestions: 15,
  },
  {
    id: "grammaire",
    label: "Étude de la langue — Grammaire",
    quoi: "La phrase et ses groupes, les paroles rapportées, les temps et leurs valeurs.",
    notions: ["grammaire_phrase", "conjugaison", "analyse_discours"],
    nbQuestions: 12,
  },
  {
    id: "orthographe",
    label: "Étude de la langue — Orthographe",
    quoi: "Les accords, et tout ce qui s'entend pareil mais ne s'écrit pas pareil.",
    notions: ["orthographe_grammaticale"],
    nbQuestions: 12,
  },
  // On écoute, le texte ne s'affiche pas, on répond de mémoire.
  {
    id: "oral",
    label: "Comprendre ce qu'on écoute",
    quoi: "Un enregistrement, deux écoutes, et rien sous les yeux.",
    notions: ["oral"],
    nbQuestions: 9,
    supports: SUPPORTS_ORAL_5E,
  },
];

export const CONFIG_4E_FRANCAIS: ConfigEpreuve = {
  slug: "4e-francais",
  classe: "4e",
  matiere: "francais",
  classeSource: "5e",
  labelSource: "la 5ᵉ",
  matiereLabel: "Français",
  // 50 MINUTES — la durée officielle de passation, pour 67 questions, soit
  // 45 secondes chacune. C'est l'épreuve la plus serrée des quatre, et c'est
  // le sujet qui le veut. L'écoute des enregistrements est comprise dedans,
  // comme le jour J.
  dureeSecondes: 50 * 60,
  volumeOfficiel: true,
  // Le sujet papier existe : /evaluation-nationale-college/4e-francais/a-imprimer
  // (21/08). ⚠️ Il demande un adulte : les neuf questions de compréhension de
  // l'oral s'appuient sur un texte LU À VOIX HAUTE, imprimé sur la feuille du
  // professeur et jamais sur celle de l'élève. Voir `EncartTextesALire`.
  sujetPapier: true,
  // Six domaines, 67 questions, relevés le 16/08/2026.
  baremeVersion: "2026-08",
  reserve:
    "Une seule chose de l'épreuve officielle manque ici : la fluence, qui se passe à voix haute, en tête à tête avec un professeur — un ordinateur ne peut pas l'évaluer. La compréhension de l'oral, elle, y est : prévois des écouteurs ou une pièce calme.",
  themes: THEMES,
  banque: francais5eQuestionBank,
  labelsNotion: new Map(knowledge.notions.map((n) => [n.id, n.label])),
  labelsMicro: new Map(knowledge.microSkills.map((m) => [m.id, m.label])),
};
