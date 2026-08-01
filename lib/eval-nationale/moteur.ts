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
import type { SupportTexte } from "./supports";

export type ThemeEval = {
  id: string;
  label: string;
  /** Ce que le thème recouvre, dit à l'élève avant d'y entrer. */
  quoi: string;
  /** Notions de la banque source qui l'alimentent. */
  notions: string[];
  nbQuestions: number;
  /**
   * TEXTES SUPPORTS — pour les thèmes de compréhension de l'écrit. Quand un
   * thème en a, l'épreuve tire UN support et pose SES questions à la suite,
   * le texte restant affiché. C'est ainsi que procède l'évaluation officielle
   * (dix questions sur un même texte littéraire), et c'est la seule façon de
   * tester la compréhension d'un texte plutôt que celle d'une phrase.
   * Les notions ci-dessus servent alors de secours, si tous les supports ont
   * déjà été vus.
   */
  supports?: SupportTexte[];
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
  /**
   * Ce que notre épreuve NE couvre pas de l'épreuve officielle, dit à l'élève
   * sur la page d'accueil. En français, la fluence n'est pas numérique et la
   * compréhension de l'oral demande un support audio : taire ces deux
   * domaines laisserait croire qu'on reproduit toute l'épreuve.
   */
  reserve?: string;
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
  /**
   * CE QU'ON MÉMORISE POUR NE PAS LE REVOIR — et ce n'est pas l'identifiant de
   * l'item (corrigé le 01/08). Un item `template` porte un seul id pour tout
   * son pool : le marquer « vu » après un tirage brûlait ses sept à treize
   * énoncés d'un coup. Mesuré : l'épreuve de français de 6ᵉ n'allait pas
   * au-delà de quatre passages complets. La clé est donc l'id pour un item
   * fixe, et l'id PLUS l'empreinte de l'énoncé pour un gabarit.
   */
  cle: string;
  /** Identifiant de l'item d'origine (un gabarit en produit plusieurs énoncés). */
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
  /** Le texte à lire, affiché au-dessus de la question et gardé pendant toute
   *  la série tirée sur ce support. */
  support?: {
    kicker: string;
    titre: string;
    source: string;
    texte: string;
    /** Présent = support ORAL : le texte se joue, il ne s'affiche pas. */
    oral?: { ecoutes: number };
  };
};

export type EpreuveEval = {
  questions: QuestionEval[];
  dureeSecondes: number;
};

// ─── Tirage ───────────────────────────────────────────────────────────────────

/** Empreinte courte d'un énoncé — on en stocke des centaines côté navigateur. */
function empreinte(texte: string): string {
  let h = 0;
  for (let i = 0; i < texte.length; i += 1) {
    h = (h * 31 + texte.charCodeAt(i)) | 0;
  }
  return (h >>> 0).toString(36);
}

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
    // L'empreinte de l'ÉNONCÉ, pas de l'item : deux gabarits différents
    // peuvent produire la même question, et c'est la question que l'élève
    // reconnaît — pas son origine.
    cle: empreinte(text),
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
  textesDuTirage: Set<string>,
): QuestionEval[] {
  // ── LE THÈME EST PORTÉ PAR UN TEXTE ─────────────────────────────────────
  // On choisit d'abord un support dont l'élève n'a pas déjà vu les questions.
  // Si tous ont servi, on retombe sur le tirage ordinaire dans les notions :
  // mieux vaut une question isolée qu'un texte relu par cœur.
  if (theme.supports?.length) {
    // ON CLASSE PAR QUESTIONS NEUVES, PAS PAR QUESTIONS VUES (corrigé le
    // 01/08, en ajoutant les troisièmes supports). Les deux revenaient au même
    // tant que tous les supports avaient cinq questions ; ils divergent dès
    // qu'un support en porte huit et un autre cinq — le moins vu n'est alors
    // pas le plus disponible. Et l'on prend le premier qui a DE QUOI TENIR le
    // thème, pas le premier tout court : sinon un support à une seule question
    // neuve faisait basculer tout le thème vers le repli, alors qu'un autre
    // était intact.
    const neuvesDe = (s: SupportTexte) =>
      s.questions.filter((q) => !dejaVus.has(empreinte(q.text)));
    const dispos = melanger(theme.supports).sort(
      (a, b) => neuvesDe(b).length - neuvesDe(a).length,
    );
    const support =
      dispos.find((s) => neuvesDe(s).length >= theme.nbQuestions) ?? dispos[0];
    const neuves = neuvesDe(support);

    if (neuves.length >= theme.nbQuestions) {
      return melanger(neuves)
        .slice(0, theme.nbQuestions)
        .map((q) => {
          textesDuTirage.add(q.text);
          return {
            cle: empreinte(q.text),
            itemId: `${support.id}_${q.microId}`,
            themeId: theme.id,
            themeLabel: theme.label,
            notionId: q.notionId,
            notionLabel: config.labelsNotion.get(q.notionId) ?? q.notionId,
            microId: q.microId,
            microLabel: config.labelsMicro.get(q.microId) ?? q.microId,
            text: q.text,
            choices: melanger(q.choices),
            expected: [q.expected],
            explanation: q.explanation,
            support: {
              kicker: support.kicker,
              titre: support.titre,
              source: support.source,
              texte: support.texte,
              oral: support.oral,
            },
          };
        });
    }

    // ⚠️ PAS DE REPLI POUR L'ORAL. Quand un thème visuel a épuisé ses textes,
    // retomber sur la banque reste honnête : ce sont des questions de lecture.
    // Pour l'oral, non — la banque contient des questions SUR la pratique de
    // l'oral, qu'on lit à l'écran. Les servir sous un thème intitulé
    // « Comprendre ce qu'on écoute », sans rien à écouter, serait un mensonge
    // d'étiquette. Le thème disparaît alors de l'épreuve, et le bilan avec
    // (il ne garde que les thèmes qui ont des questions).
    if (theme.supports.some((s) => s.oral)) return [];
  }

  // AUCUN PRÉ-FILTRE SUR L'ID : on ne peut juger qu'après génération, puisque
  // « déjà vu » porte désormais sur l'énoncé et non sur l'item.
  const parNotion = melanger(theme.notions).map((notionId) =>
    melanger(config.banque.filter((item) => item.notionId === notionId)),
  );

  const questions: QuestionEval[] = [];
  const microsPris = new Set<string>();

  // Deux passes : la première refuse deux fois la même micro-compétence
  // (le bilan doit couvrir large), la seconde accepte tout pour compléter.
  for (const strict of [true, false]) {
    // ⚠️ COMPTEUR REMIS À ZÉRO À CHAQUE PASSE. Partagé, il était épuisé par la
    // passe stricte — qui tourne à vide une fois toutes les micro-compétences
    // prises, puisque les recalés lui reviennent — et la passe permissive
    // n'était alors jamais exécutée. C'est ce qui laissait l'épreuve de
    // français de 4ᵉ à 19 questions sur 20.
    let tour = 0;
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
        // LES RECALÉS SONT RENDUS À LA PILE (corrigé le 01/08). La passe
        // stricte refuse un item dont la micro-compétence est déjà prise —
        // mais elle le JETAIT, alors que la seconde passe, elle, l'aurait
        // accepté. Un thème bâti sur une seule notion (« la phrase et les
        // accords », 4 micro-compétences) ne pouvait donc pas atteindre ses
        // 5 questions : mesuré, l'épreuve de français de 4ᵉ sortait 19/20 dès
        // le premier passage.
        const recales: typeof pile = [];
        while (pile.length) {
          const item = pile.pop()!;
          if (strict && microsPris.has(item.microId)) {
            recales.push(item);
            continue;
          }
          const candidat = materialiser(item, config);
          // Déjà tombé lors d'un passage précédent, ou déjà dans CETTE
          // épreuve : deux gabarits différents peuvent produire le même
          // énoncé.
          if (
            !candidat ||
            dejaVus.has(candidat.cle) ||
            textesDuTirage.has(candidat.text)
          ) {
            continue;
          }
          retenue = candidat;
          microRetenu = item.microId;
          break;
        }
        pile.push(...recales);
        if (!retenue) continue;

        textesDuTirage.add(retenue.text);
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
  // Partagé entre les thèmes : un même énoncé ne doit pas tomber deux fois
  // dans la même épreuve, fût-ce sous deux notions différentes.
  const textesDuTirage = new Set<string>();
  const questions = config.themes.flatMap((theme) =>
    tirerTheme(theme, config, vus, textesDuTirage),
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

// ─── Les groupes de maîtrise ──────────────────────────────────────────────────
// LE VOCABULAIRE DE L'INSTITUTION, PAS LE NÔTRE (Frédéric, 01/08, document
// éduscol à l'appui). L'évaluation nationale ne rend pas une note : elle range
// dans trois groupes — « à besoins », « fragile », « satisfaisant » — et le
// professeur reçoit sa classe dans ces termes-là. Parler la même langue que le
// bilan officiel, c'est ce qui rend le nôtre lisible pour lui.
//
// LES SEUILS viennent du test d'automatismes de 6ᵉ, sur 30 questions :
// 9 réponses ou moins → à besoins ; 10 à 17 → fragile ; 18 ou plus →
// satisfaisant. Soit 30 % et 60 %, qu'on applique en proportion puisque nos
// épreuves n'ont pas 30 questions.
//
// LE TON : UN MIX, ET IL EST DÉLIBÉRÉ (Frédéric, 01/08).
//
// Les descriptions officielles enveloppent — jusqu'au groupe « à besoins »,
// décrit par ce que l'élève « est éventuellement capable » de faire. Dit à un
// enfant qui a 6 sur 20, ce n'est pas de la bienveillance : c'est du coussin,
// et il le sent. Frédéric : « bienveillance à la con ».
//
// Mais tout dire à sec ne vaut pas mieux : un enfant à qui l'on annonce « ce
// n'est pas acquis » et rien d'autre ferme la page.
//
// D'où DEUX TEMPS, et la structure du code les tient séparés pour qu'on ne
// puisse pas les confondre en les réécrivant :
//   `constat` — ce qui est là, dit sans flatterie. C'est leur apport : on
//               commence par ce que l'élève tient, pas par ce qui manque.
//   `geste`   — ce qu'il fait maintenant, dit sans détour. C'est le nôtre :
//               un élève qu'on informe peut agir, un élève qu'on rassure
//               reste où il est.

export type GroupeMaitrise = "a_besoins" | "fragile" | "satisfaisant";

export const GROUPES: Record<
  GroupeMaitrise,
  { label: string; constat: string; geste: string; couleur: string }
> = {
  satisfaisant: {
    label: "Satisfaisant",
    constat: "Ce que tu sais là-dessus tient.",
    geste: "Passe à la suite : tu n'as rien à reprendre ici.",
    couleur: "text-cyan-800",
  },
  fragile: {
    label: "Fragile",
    constat: "Tu sais faire — pas encore à tous les coups.",
    geste:
      "Ce qui manque, ce sont des passages, pas des explications. Reprends les compétences de droite, elles y sont presque.",
    couleur: "text-amber-700",
  },
  a_besoins: {
    label: "À besoins",
    constat: "Il y a des bases, elles ne portent pas encore ici.",
    geste:
      "Reprends par la première compétence de la liste, une seule à la fois. Il n'y a pas de raccourci — et c'est la seule mauvaise nouvelle.",
    couleur: "text-red-800",
  },
};

export function groupeDeMaitrise(justes: number, total: number): GroupeMaitrise {
  if (total === 0) return "a_besoins";
  const pct = (justes / total) * 100;
  if (pct >= 60) return "satisfaisant";
  if (pct > 30) return "fragile";
  return "a_besoins";
}

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
