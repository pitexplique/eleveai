// ÉPREUVE BLANCHE — évaluation nationale de 6ᵉ, français.
//
// LE CONTENU EST DU CM2, comme en maths et pour la même raison : l'évaluation
// de rentrée mesure ce que l'élève emporte du primaire.
//
// ELLE REPREND LE VOLUME DU SUJET OFFICIEL DEPUIS LE 16/08 : 60 questions en
// 50 minutes. Elle en posait 25 en 25 minutes — la cadence du jour J, sur un
// échantillon. Un échantillon ne dit pas à un élève s'il tiendra cinquante
// minutes.
//
// LES SIX DOMAINES SONT CEUX DU BILAN OFFICIEL, mot pour mot, relevés sur le
// document de résultats 2025 : compréhension de l'oral · compréhension de
// l'écrit · étude de la langue Grammaire · étude de la langue Orthographe ·
// lexique · fluence. Et le découpage en items, du document éduscol :
//   10 texte littéraire · 9 document composite · 15 lexique · 9 grammaire ·
//   9 orthographe · 8 compréhension de l'oral = 60.
//
// ⭐ LES DEUX TESTS SPÉCIFIQUES DU FRANÇAIS SONT L'ÉCRIT ET LE LEXIQUE — pas
// des automatismes comme en maths. C'est ce que confirme le document de
// résultats, qui ne détaille item par item que ces deux-là : 19 items (10 + 9)
// pour l'écrit, 15 pour le lexique. Les 26 autres questions relèvent des
// domaines seuls.
//
// ⚠️ LA CONJUGAISON N'EST PAS UN DOMAINE, et notre thème « Les verbes » a donc
// disparu. Le bilan officiel n'en connaît pas : conjuguer relève de l'étude de
// la langue. Ses micro-compétences n'ont pas été perdues pour autant — elles
// rejoignent la grammaire, où l'on demande la valeur d'un temps autant que sa
// terminaison.
//
// CE QU'ON NE FAIT PAS, ET POURQUOI : la FLUENCE, et elle seule. Elle n'est
// pas numérique — c'est une minute de lecture à voix haute en tête-à-tête avec
// un professeur. La compréhension de l'oral, elle, est faite depuis le 01/08 :
// la synthèse vocale de la dictée du jour lit un texte écrit pour l'oreille,
// deux écoutes, rien à l'écran. On ne promet que ce qu'on couvre vraiment, et
// on le dit à l'élève sur la page (champ `reserve`).
//
// 📏 VIVIER MESURÉ AVANT DE MONTER LE COMPTEUR (`scripts/verifier-supports.ts`
// et `scripts/auditer-banque-runtime.ts cm2 --variete`) :
//   littéraire  4 supports × 10 questions — le compte exact, pas un de plus
//   composite   2 supports ×  9 questions
//   oral       10 supports ×  8 questions
//   lexique    143 énoncés ÷ 15 =  9 passages · 11 micro-compétences
//   grammaire  231 énoncés ÷  9 = 25 passages · 19 micro-compétences
//   orthographe 61 énoncés ÷  9 =  6 passages ·  5 micro-compétences
//
// ⏳ L'ORTHOGRAPHE EST LE PLANCHER, et ce n'est pas un hasard : cinq
// micro-compétences seulement portent tout le domaine. C'est aussi celui où le
// collège de référence décroche le plus — 28 % d'élèves à besoins contre 15 %
// en grammaire. Le domaine qui manque de matière chez nous est celui qui en
// manque chez eux. À étoffer en priorité.

import { francaisCm2QuestionBank } from "@/lib/tutor-v4/questionBank/cm2/francais";
import { buildKnowledgeCm2Francais } from "@/lib/tutor-v4/knowledge/francais/cm2/buildKnowledgeCm2Francais";
import {
  SUPPORTS_CM2_LITTERAIRE,
  SUPPORTS_CM2_COMPOSITE,
  SUPPORTS_ORAL_CM2,
} from "./supports";
import type { ConfigEpreuve, ThemeEval } from "./moteur";

const knowledge = buildKnowledgeCm2Francais();

// LES CINQ MICRO-COMPÉTENCES D'ORTHOGRAPHE. Elles vivent sous la notion
// `grammaire_orthographe`, avec les treize de grammaire : c'est notre
// rangement, pas celui du bilan officiel, qui les note à part. D'où la liste —
// voir `micros` dans moteur.ts.
const MICROS_ORTHOGRAPHE = [
  "cm2_orth_accord_gn",
  "cm2_orth_attribut",
  "cm2_orth_homophones",
  "cm2_orth_participe_passe",
  "cm2_orth_sujet_verbe",
];

const THEMES: ThemeEval[] = [
  {
    id: "ecrit_litteraire",
    label: "Comprendre un texte littéraire",
    quoi: "Un récit entier, et dix questions dessus.",
    notions: ["comprehension_textes_documents", "lecture_oeuvres"],
    nbQuestions: 10,
    // Les notions ci-dessus ne servent que si tous les textes ont déjà servi.
    supports: SUPPORTS_CM2_LITTERAIRE,
  },
  {
    id: "ecrit_composite",
    label: "Comprendre un document composite",
    quoi: "Un article, un tableau, un schéma — et ce qu'ils disent ensemble.",
    notions: ["comprehension_textes_documents"],
    nbQuestions: 9,
    supports: SUPPORTS_CM2_COMPOSITE,
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
    quoi: "Les constituants de la phrase, la phrase complexe, les temps et leurs valeurs.",
    notions: ["grammaire_orthographe", "phrase_complexe", "conjugaison"],
    // Tout sauf l'orthographe, qui est un domaine à part dans le bilan.
    micros: [
      "cm2_gram_attribut",
      "cm2_gram_cc_sortes",
      "cm2_gram_cod_coi",
      "cm2_gram_complement_nom",
      "cm2_gram_complements",
      "cm2_gram_gn",
      "cm2_gram_nature_fonction",
      "cm2_gram_phrase_simple",
      "cm2_gram_prepositions",
      "cm2_gram_sujet_inverse",
      "cm2_gram_sujet_verbe",
      "cm2_complexe_coordination",
      "cm2_complexe_pronom_relatif",
      "cm2_complexe_propositions",
      "cm2_conj_futur",
      "cm2_conj_imparfait",
      "cm2_conj_infinitif_groupe",
      "cm2_conj_passe_compose",
      "cm2_conj_passe_simple_intro",
      "cm2_conj_plus_que_parfait",
      "cm2_conj_present",
      "cm2_conj_valeur_temps",
    ],
    nbQuestions: 9,
  },
  {
    id: "orthographe",
    label: "Étude de la langue — Orthographe",
    quoi: "Les accords, et les homophones qui se ressemblent à l'oreille.",
    notions: ["grammaire_orthographe"],
    micros: MICROS_ORTHOGRAPHE,
    nbQuestions: 9,
  },
  // On écoute, le texte ne s'affiche pas, on répond de mémoire.
  {
    id: "oral",
    label: "Comprendre ce qu'on écoute",
    quoi: "Un enregistrement, deux écoutes, et rien sous les yeux.",
    notions: ["oral"],
    nbQuestions: 8,
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
  // 50 MINUTES — la durée officielle de passation, pour 60 questions, soit
  // 50 secondes chacune. L'écoute des enregistrements est comprise dedans,
  // comme le jour J. L'arbitrage du 01/08 (une minute par question sur un
  // échantillon de 25) tenait la cadence faute de connaître les effectifs ;
  // nous les avons.
  dureeSecondes: 50 * 60,
  volumeOfficiel: true,
  reserve:
    "Une seule chose de l'épreuve officielle manque ici : la fluence, qui se passe à voix haute, en tête à tête avec un professeur — un ordinateur ne peut pas l'évaluer. La compréhension de l'oral, elle, y est : prévois des écouteurs ou une pièce calme.",
  themes: THEMES,
  banque: francaisCm2QuestionBank,
  labelsNotion: new Map(knowledge.notions.map((n) => [n.id, n.label])),
  labelsMicro: new Map(knowledge.microSkills.map((m) => [m.id, m.label])),
};
