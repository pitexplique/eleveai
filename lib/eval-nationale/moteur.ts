// MOTEUR COMMUN DES ÉPREUVES BLANCHES de l'évaluation nationale du collège.
//
// Quatre épreuves sont prévues — 6ᵉ et 4ᵉ, français et maths. Elles partagent
// TOUT : le format (une diapositive qui glisse vers la droite, sans retour en
// arrière, par thèmes, chronométrée), la prise en main d'avant-épreuve, le
// tirage, le bilan par micro-compétence. Ce qui change d'une épreuve à
// l'autre tient dans une `ConfigEpreuve` : la banque où piocher, les thèmes,
// et la durée.
//
// LA CLASSE TESTÉE N'EST PAS LA CLASSE DE L'ÉLÈVE (le point posé par
// Frédéric) : l'évaluation de rentrée de 6ᵉ porte sur le CM2, celle de 4ᵉ sur
// la 5ᵉ. L'élève vient d'arriver — on mesure ce qu'il emporte, pas ce qu'il
// n'a pas encore appris. D'où `classe` (la sienne) et `classeSource` (le
// programme testé), qui ne sont jamais la même chose.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import type { CanvasFigure } from "@/lib/tutor-v4/types_canvas";

export type ThemeEval = {
  id: string;
  label: string;
  /** Ce que le thème recouvre, dit à l'élève avant d'y entrer. */
  quoi: string;
  /** Notions de la banque source qui l'alimentent. */
  notions: string[];
  nbQuestions: number;
};

export type ConfigEpreuve = {
  /** Segment d'URL, ex. « 4e-maths ». */
  slug: string;
  /** La classe de l'élève : '6e' | '4e'. Va en base. */
  classe: string;
  /** 'maths' | 'francais'. Va en base. */
  matiere: string;
  /** Le programme réellement testé, ex. '5e'. Sert aussi à la remédiation. */
  classeSource: string;
  /** Comment on le dit à l'élève, ex. « la 5ᵉ ». */
  labelSource: string;
  matiereLabel: string;
  dureeSecondes: number;
  themes: ThemeEval[];
  /** La banque où piocher — déjà transformée (zéro-clavier au primaire). */
  banque: TutorBankItemV4[];
  /** Libellés lisibles, portés par le knowledge et non par la banque. */
  labelsNotion: Map<string, string>;
  labelsMicro: Map<string, string>;
};

export function nbQuestions(config: ConfigEpreuve) {
  return config.themes.reduce((n, t) => n + t.nbQuestions, 0);
}

/** Où l'on renvoie l'élève pour retravailler une micro-compétence ratée. */
export function routeRemediation(
  config: ConfigEpreuve,
  notionId: string,
  microId: string,
) {
  return (
    `/tutor-v4?classe=${encodeURIComponent(config.classeSource)}` +
    `&matiere=${encodeURIComponent(config.matiere)}` +
    `&notion=${encodeURIComponent(notionId)}` +
    `&microId=${encodeURIComponent(microId)}&display=simple`
  );
}

export type QuestionEval = {
  /** Identifiant de l'item d'origine : sert à ne pas le retirer au tour suivant. */
  itemId: string;
  themeId: string;
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
 * corrige toute seule. Les propositions sont remélangées : dans nos banques
 * la bonne réponse est souvent en première position, ce qui la trahirait.
 */
function materialiser(
  item: TutorBankItemV4,
  config: ConfigEpreuve,
): QuestionEval | null {
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

  return {
    itemId: item.id,
    themeId: "",
    themeLabel: "",
    notionId: item.notionId,
    notionLabel: config.labelsNotion.get(item.notionId) ?? item.notionId,
    microId: item.microId,
    microLabel: config.labelsMicro.get(item.microId) ?? item.microId,
    text,
    choices: melanger(choices),
    expected,
    explanation: genere.explanation as string | undefined,
    canvas: genere.canvas as CanvasFigure | undefined,
  };
}

/**
 * Tire les questions d'un thème en TOURNANT sur ses notions plutôt qu'en
 * piochant au hasard dans le tas : sans ça, une notion à 200 items rafle les
 * cinq questions et le thème ne teste qu'elle.
 */
function tirerTheme(
  theme: ThemeEval,
  config: ConfigEpreuve,
  dejaVus: Set<string>,
): QuestionEval[] {
  const parNotion = melanger(theme.notions).map((notionId) =>
    melanger(
      config.banque.filter(
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
        if (!pile.length) continue;
        piocheFaite = true;

        // ON DÉPILE JUSQU'À TROUVER UN ITEM JOUABLE (corrigé le 01/08).
        // Avant, un seul essai par notion et par tour : si l'item tiré
        // n'était pas un QCM, la notion passait son tour. Or les banques
        // sont très inégales — en 5ᵉ, 8 QCM sur 50 items pour les opérations
        // avec les relatifs, contre 40 pour l'algorithmique. Résultat : les
        // notions pauvres en QCM disparaissaient de l'épreuve, et le thème
        // « nombres et calcul » ne testait ni les opérations sur les
        // relatifs ni le calcul littéral. La couverture suivait la forme des
        // items au lieu de suivre le programme.
        let retenue: QuestionEval | null = null;
        let microRetenu = "";
        while (pile.length) {
          const item = pile.pop()!;
          if (strict && microsPris.has(item.microId)) continue;
          const candidat = materialiser(item, config);
          if (candidat) {
            retenue = candidat;
            microRetenu = item.microId;
            break;
          }
        }
        if (!retenue) continue;

        microsPris.add(microRetenu);
        questions.push({
          ...retenue,
          themeId: theme.id,
          themeLabel: theme.label,
        });
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
export function tirerEpreuve(
  config: ConfigEpreuve,
  dejaVus: string[] = [],
): EpreuveEval {
  const vus = new Set(dejaVus);
  const questions = config.themes.flatMap((theme) =>
    tirerTheme(theme, config, vus),
  );

  return { questions, dureeSecondes: config.dureeSecondes };
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
  themeId: string;
  themeLabel: string;
  justes: number;
  total: number;
  micros: BilanMicro[];
};

export function construireBilan(
  config: ConfigEpreuve,
  questions: QuestionEval[],
  reponses: Record<number, string>,
): BilanTheme[] {
  return config.themes
    .map((theme) => {
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

      return {
        themeId: theme.id,
        themeLabel: theme.label,
        justes,
        total,
        micros,
      };
    })
    .filter((t) => t.total > 0);
}
