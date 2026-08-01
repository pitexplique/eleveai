// ÉPREUVE BLANCHE — évaluation nationale de 6ᵉ, mathématiques.
//
// CE QU'ELLE TESTE, ET POURQUOI C'EST DU CM2 (Frédéric, 01/08) : l'évaluation
// de rentrée de 6ᵉ ne porte pas sur le programme de 6ᵉ — l'élève vient
// d'arriver. Elle mesure ce qui est sorti du CM2. On pioche donc dans la
// banque CM2, pas dans la 6ᵉ.
//
// LE FORMAT, CALQUÉ SUR LA VRAIE (Frédéric) : ni Concours Avenir (60 QCU au
// barème négatif), ni parcours (une liste qu'on remplit dans l'ordre qu'on
// veut). L'évaluation nationale est une diapositive qui glisse vers la
// DROITE, SANS RETOUR EN ARRIÈRE, organisée par thèmes, en 50 MINUTES. Et
// elle commence par une PRISE EN MAIN — on vérifie que l'élève sait cliquer
// et choisir avant de mesurer quoi que ce soit.
//
// CE QU'ON AJOUTE, ET QUE LA VRAIE NE DONNE JAMAIS À L'ÉLÈVE : le nom de la
// notion et de la micro-compétence derrière chaque question. L'épreuve
// officielle rend un profil au professeur ; l'élève, lui, n'apprend jamais ce
// qui a coincé. C'est tout l'intérêt de la refaire ici.

import { mathsCm2QuestionBank } from "@/lib/tutor-v4/questionBank/cm2/maths";
import { buildKnowledgeCm2Maths } from "@/lib/tutor-v4/knowledge/maths/cm2/buildKnowledgeCm2";
import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import type { CanvasFigure } from "@/lib/tutor-v4/types_canvas";

/** 50 minutes, comme la vraie. */
export const DUREE_SECONDES = 50 * 60;

export type ThemeId = "nombres" | "grandeurs" | "espace" | "problemes";

export type ThemeEval = {
  id: ThemeId;
  label: string;
  /** Ce que le thème recouvre, dit à l'élève avant d'y entrer. */
  quoi: string;
  /** Notions CM2 qui l'alimentent. */
  notions: string[];
  nbQuestions: number;
};

// Les quatre domaines de l'évaluation nationale de 6ᵉ en mathématiques.
// 5 questions par thème = 20 questions pour 50 minutes, soit 2 min 30 par
// question : le vrai rythme laisse le temps de poser un calcul.
export const THEMES: ThemeEval[] = [
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

export const NB_QUESTIONS = THEMES.reduce((n, t) => n + t.nbQuestions, 0);

export type QuestionEval = {
  /** Identifiant de l'item d'origine : sert à ne pas le retirer au tour suivant. */
  itemId: string;
  themeId: ThemeId;
  themeLabel: string;
  notionId: string;
  notionLabel: string;
  microId: string;
  microLabel: string;
  text: string;
  choices: string[];
  expected: string[];
  explanation?: string;
  canvas?: CanvasFigure;
};

export type EpreuveEval = {
  questions: QuestionEval[];
  dureeSecondes: number;
};

// ─── Libellés : c'est le knowledge qui les porte, pas la banque ───────────────

const knowledge = buildKnowledgeCm2Maths();

const LABEL_NOTION = new Map(knowledge.notions.map((n) => [n.id, n.label]));
const LABEL_MICRO = new Map(knowledge.microSkills.map((m) => [m.id, m.label]));

// ─── Tirage ───────────────────────────────────────────────────────────────────

function melanger<T>(liste: readonly T[]): T[] {
  const copie = [...liste];
  for (let i = copie.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copie[i], copie[j]] = [copie[j], copie[i]];
  }
  return copie;
}

/**
 * Rend l'item jouable : un `template` se génère à la volée, un `fixed` se
 * prend tel quel. On ne garde que ce qui a des propositions — l'épreuve se
 * corrige toute seule, et le CM2 est zéro-clavier de toute façon.
 * Les propositions sont remélangées : dans nos banques la bonne réponse est
 * souvent en première position, ce qui la trahirait.
 */
function materialiser(item: TutorBankItemV4): QuestionEval | null {
  const genere =
    item.kind === "template"
      ? ({ ...item, ...item.generate() } as Record<string, unknown>)
      : (item as unknown as Record<string, unknown>);

  const choices = genere.choices as string[] | undefined;
  const expected = genere.expected as string[] | undefined;
  const text = genere.text as string | undefined;

  if (!text) return null;
  if (!choices || choices.length < 2) return null;
  if (!expected || expected.length !== 1) return null;
  if (!choices.includes(expected[0])) return null;

  const notionId = item.notionId;
  const microId = item.microId;

  return {
    itemId: item.id,
    themeId: "nombres", // écrasé par le tirage, qui connaît le thème
    themeLabel: "",
    notionId,
    notionLabel: LABEL_NOTION.get(notionId) ?? notionId,
    microId,
    microLabel: LABEL_MICRO.get(microId) ?? microId,
    text,
    choices: melanger(choices),
    expected,
    explanation: genere.explanation as string | undefined,
    canvas: genere.canvas as CanvasFigure | undefined,
  };
}

/**
 * Tire les questions d'un thème en tournant sur ses notions plutôt qu'en
 * piochant au hasard dans le tas : sans ça, une notion à 200 items rafle les
 * cinq questions et le thème ne teste qu'elle.
 */
function tirerTheme(theme: ThemeEval, dejaVus: Set<string>): QuestionEval[] {
  const parNotion = melanger(theme.notions).map((notionId) =>
    melanger(
      mathsCm2QuestionBank.filter(
        (item) => item.notionId === notionId && !dejaVus.has(item.id),
      ),
    ),
  );

  const questions: QuestionEval[] = [];
  const microsPris = new Set<string>();
  let tour = 0;

  // Deux passes : la première refuse deux fois la même micro-compétence
  // (le bilan doit couvrir large), la seconde accepte tout pour compléter.
  for (const strict of [true, false]) {
    while (questions.length < theme.nbQuestions && tour < 400) {
      tour += 1;
      let piocheFaite = false;

      for (const pile of parNotion) {
        if (questions.length >= theme.nbQuestions) break;
        const item = pile.pop();
        if (!item) continue;
        piocheFaite = true;

        if (strict && microsPris.has(item.microId)) continue;

        const q = materialiser(item);
        if (!q) continue;

        microsPris.add(item.microId);
        questions.push({ ...q, themeId: theme.id, themeLabel: theme.label });
      }

      if (!piocheFaite) break;
    }
    if (questions.length >= theme.nbQuestions) break;
  }

  return questions;
}

/**
 * @param dejaVus identifiants des items déjà rencontrés lors des passages
 *   précédents — l'élève doit pouvoir refaire l'épreuve sans la revoir.
 */
export function tirerEpreuve(dejaVus: string[] = []): EpreuveEval {
  const vus = new Set(dejaVus);
  const questions = THEMES.flatMap((theme) => tirerTheme(theme, vus));

  return { questions, dureeSecondes: DUREE_SECONDES };
}

// ─── Le bilan ─────────────────────────────────────────────────────────────────

export type BilanMicro = {
  microId: string;
  microLabel: string;
  notionId: string;
  notionLabel: string;
  reussi: boolean;
};

export type BilanTheme = {
  themeId: ThemeId;
  themeLabel: string;
  justes: number;
  total: number;
  micros: BilanMicro[];
};

export function construireBilan(
  questions: QuestionEval[],
  reponses: Record<number, string>,
): BilanTheme[] {
  return THEMES.map((theme) => {
    const micros: BilanMicro[] = [];
    let justes = 0;
    let total = 0;

    questions.forEach((q, index) => {
      if (q.themeId !== theme.id) return;
      total += 1;
      const reussi = reponses[index] === q.expected[0];
      if (reussi) justes += 1;
      micros.push({
        microId: q.microId,
        microLabel: q.microLabel,
        notionId: q.notionId,
        notionLabel: q.notionLabel,
        reussi,
      });
    });

    return { themeId: theme.id, themeLabel: theme.label, justes, total, micros };
  }).filter((t) => t.total > 0);
}
