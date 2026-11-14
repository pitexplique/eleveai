// lib/tutor-v4/questionBank/ce1/maths/droites-segments.bank.ts
//
// Les droites, les segments et les alignements du CE1, écrits à la main.
//
// PÉRIMÈTRE BO (Annexe 4, programme de mathématiques du cycle 2) :
//   — le lexique « point, droite, segment, milieu d'un segment » est introduit
//     EN SITUATION, sans définition formelle ;
//   — utiliser la règle pour REPÉRER et VÉRIFIER des alignements. Le texte est
//     précis : l'élève sait dire que des points ne sont pas alignés sans
//     utiliser la règle quand il n'y a aucun doute, et se sert de la règle
//     quand la réponse n'est pas évidente ;
//   — utiliser la règle graduée comme instrument de tracé ;
//   — trouver le MILIEU d'un segment, PAR PLIAGE.
//
// LE PIÈGE DE LA NOTION : croire qu'un segment et une droite sont la même
// chose. Le segment s'arrête à ses deux extrémités, la droite continue des
// deux côtés — on ne peut jamais la dessiner en entier.
//
// ⚠️ PAS DE QUESTION À RÉDIGER : `applyMathsKeyboardFree` retire les items
// `format: "open"`. Un CE1 clique, il ne tape pas.

import type { CanvasFigure, DifficultyLevel, TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { cap, entre, etapes, gab, lettres, melange, prenom, qcm, qcmN, tournure, un } from "./geo-outils-ce1";
import { melangeEnPlace } from "@/lib/tutor-v4/questionBank/melange";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffle<T>(items: readonly T[]): T[] {
  return melangeEnPlace([...items]);
}

function makeChoices(correct: string, wrongs: readonly string[]) {
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct),
  ).slice(0, 3);
  return shuffle([correct, ...distracteurs]);
}

function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return `Définition : ${definition}

Méthode : ${methode}

Calcul : ${calcul}

Conclusion : ${conclusion}`;
}

const anciens: TutorBankItemV4[] = [
  /* =========================================================
     CE1_DROITE_SEGMENT_RECONNAITRE — droite, segment, alignement
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_droite_reconnaitre_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "droites_segments",
    microId: "ce1_droite_segment_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la différence entre un segment et une droite ?",
    format: "qcm",
    choices: [
      "le segment s'arrête à ses deux bouts, la droite continue",
      "le segment est toujours horizontal",
      "la droite est plus courte",
      "il n'y a aucune différence",
    ],
    expected: ["le segment s'arrête à ses deux bouts, la droite continue"],
    comparator: "mcq_exact",
    hint: "Peut-on dessiner une droite en entier sur une feuille ?",
    explanation: exp(
      "Un segment est un morceau de droite limité par deux points ; une droite, elle, n'a pas de bout.",
      "On regarde si le trait s'arrête ou s'il pourrait continuer.",
      "Un segment a deux extrémités qu'on peut montrer du doigt. Une droite continue des deux côtés : sur la feuille, on n'en voit jamais qu'un morceau.",
      "Le segment s'arrête à ses deux bouts, la droite continue.",
    ),
    tags: ["ce1", "droites_segments", "reconnaitre", "definition", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce1_droite_reconnaitre_fixed_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "droites_segments",
    microId: "ce1_droite_segment_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    text: "Que veut dire « trois points sont alignés » ?",
    format: "qcm",
    choices: [
      "on peut faire passer une seule droite par les trois",
      "les trois points sont très proches",
      "les trois points sont de la même couleur",
      "les trois points forment un triangle",
    ],
    expected: ["on peut faire passer une seule droite par les trois"],
    comparator: "mcq_exact",
    hint: "Pose ta règle : passe-t-elle par les trois d'un coup ?",
    explanation: exp(
      "Des points sont alignés quand une même droite passe par tous.",
      "On pose le bord de la règle sur deux points, puis on regarde le troisième.",
      "Si le troisième point est lui aussi contre la règle, les trois sont alignés. S'il s'en écarte, ils ne le sont pas — et ils forment alors un triangle.",
      "On peut faire passer une seule droite par les trois.",
    ),
    tags: ["ce1", "droites_segments", "alignement", "definition", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_droite_reconnaitre_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "droites_segments",
    microId: "ce1_droite_segment_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    hint: "Un segment a deux extrémités ; une droite n'en a pas.",
    tags: ["ce1", "droites_segments", "reconnaitre", "template"],
    generate: () => {
      const cas = randomChoice([
        { desc: "un trait qui va d'un point à un autre, et qui s'arrête", bonne: "un segment" },
        { desc: "un trait tout droit qui continue des deux côtés, sans fin", bonne: "une droite" },
        { desc: "une croix marquée sur la feuille, sans longueur", bonne: "un point" },
      ]);
      return {
        text: `Comment appelle-t-on ${cas.desc} ?`,
        format: "qcm",
        choices: makeChoices(cas.bonne, [
          "un segment",
          "une droite",
          "un point",
          "un cercle",
        ]),
        expected: [cas.bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "En géométrie, le point, le segment et la droite ne se confondent pas.",
          "On regarde si l'objet a une longueur, et s'il s'arrête quelque part.",
          `${cas.desc.charAt(0).toUpperCase()}${cas.desc.slice(1)} : c'est ${cas.bonne}.`,
          `C'est ${cas.bonne}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_DROITE_ALIGNEMENT_REGLE — vérifier avec la règle
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_droite_alignement_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "droites_segments",
    microId: "ce1_droite_alignement_regle",
    difficulty: 3,
    theme: "neutral",
    text: "Comment vérifie-t-on que trois points sont alignés ?",
    format: "qcm",
    choices: [
      "on pose le bord de la règle sur deux points et on regarde le troisième",
      "on mesure la distance entre les deux premiers",
      "on relie les points au compas",
      "on regarde de loin, cela suffit toujours",
    ],
    expected: ["on pose le bord de la règle sur deux points et on regarde le troisième"],
    comparator: "mcq_exact",
    hint: "La règle sert de droite.",
    explanation: exp(
      "Vérifier un alignement, c'est chercher si une même droite passe par tous les points.",
      "On pose le bord de la règle contre deux des points, puis on regarde le troisième.",
      "Si le troisième point touche lui aussi le bord de la règle, les points sont alignés. À l'œil, on peut se tromper de peu : la règle tranche.",
      "On pose le bord de la règle sur deux points et on regarde le troisième.",
    ),
    tags: ["ce1", "droites_segments", "alignement", "methode", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce1_droite_alignement_fixed_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "droites_segments",
    microId: "ce1_droite_alignement_regle",
    difficulty: 4,
    theme: "reunion",
    text: "Dans la cour, on veut planter trois piquets bien alignés. Quel outil remplace la règle ?",
    format: "qcm",
    choices: [
      "une ficelle bien tendue",
      "un seau d'eau",
      "un mètre ruban enroulé",
      "rien, il faut le faire à l'œil",
    ],
    expected: ["une ficelle bien tendue"],
    comparator: "mcq_exact",
    hint: "Il faut quelque chose de bien droit, plus long qu'une règle.",
    explanation: exp(
      "Un alignement se vérifie avec un objet parfaitement droit qui joue le rôle de la droite.",
      "On tend la ficelle entre les deux piquets des extrémités, puis on place le troisième contre elle.",
      "Une ficelle tendue est droite : c'est la règle des grandes distances. Enroulé, le mètre ruban ne l'est pas ; à l'œil, on se trompe.",
      "Une ficelle bien tendue.",
    ),
    tags: ["ce1", "droites_segments", "alignement", "reunion", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_droite_alignement_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "droites_segments",
    microId: "ce1_droite_alignement_regle",
    difficulty: 4,
    theme: "neutral",
    hint: "La règle passe-t-elle par les trois points à la fois ?",
    tags: ["ce1", "droites_segments", "alignement", "template"],
    generate: () => {
      const alignes = randomChoice([true, false]);
      const trio = randomChoice([
        { a: "A", b: "B", c: "C" },
        { a: "M", b: "N", c: "P" },
        { a: "R", b: "S", c: "T" },
      ]);
      const bonne = alignes
        ? "oui, les trois points sont alignés"
        : "non, les trois points ne sont pas alignés";
      return {
        text: alignes
          ? `On pose le bord de la règle sur les points ${trio.a} et ${trio.b}. Le point ${trio.c} touche lui aussi le bord de la règle. Que peut-on dire ?`
          : `On pose le bord de la règle sur les points ${trio.a} et ${trio.b}. Le point ${trio.c} reste un peu à côté du bord. Que peut-on dire ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          alignes
            ? "non, les trois points ne sont pas alignés"
            : "oui, les trois points sont alignés",
          "il faut mesurer les distances pour le savoir",
          "seuls deux points peuvent être alignés",
          "il faut utiliser le compas",
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Des points sont alignés quand une même droite passe par tous.",
          "On pose le bord de la règle sur deux points, puis on regarde si le troisième le touche.",
          alignes
            ? `Le point ${trio.c} est contre le bord de la règle : la même droite passe par ${trio.a}, ${trio.b} et ${trio.c}.`
            : `Le point ${trio.c} s'écarte du bord : aucune droite ne passe par les trois. Ils forment un triangle, même s'il est très aplati.`,
          `${bonne.charAt(0).toUpperCase()}${bonne.slice(1)}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_DROITE_SEGMENT_TRACER — tracer à la règle
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_droite_tracer_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "droites_segments",
    microId: "ce1_droite_segment_tracer",
    difficulty: 2,
    theme: "neutral",
    text: "Combien de points faut-il pour tracer un segment ?",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    hint: "Un pour le départ, un pour l'arrivée.",
    explanation: exp(
      "Un segment est limité par deux points, ses extrémités.",
      "On marque les deux points, puis on les relie en suivant la règle.",
      "Avec un seul point, on ne sait pas où aller. Avec deux, le trait est complètement décidé.",
      "Il faut 2 points.",
    ),
    tags: ["ce1", "droites_segments", "tracer", "definition"],
  },
  {
    kind: "template",
    id: "ce1_droite_tracer_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "droites_segments",
    microId: "ce1_droite_segment_tracer",
    difficulty: 3,
    theme: "neutral",
    hint: "Le zéro de la règle se pose sur le premier point.",
    tags: ["ce1", "droites_segments", "tracer", "template"],
    generate: () => {
      const longueur = randomInt(4, 12);
      return {
        text: `Tu poses le 0 de ta règle sur le premier point d'un segment de ${longueur} cm. Sur quelle graduation marques-tu le second point ?`,
        format: "short",
        expected: [String(longueur)],
        comparator: "number_equal",
        explanation: exp(
          "Tracer un segment d'une longueur donnée, c'est placer deux points puis les relier.",
          "On pose le 0 sur le premier point, et on lit la graduation qui correspond à la longueur voulue.",
          `Du 0 à la graduation ${longueur}, il y a exactement ${longueur} cm.`,
          `On marque le second point sur la graduation ${longueur}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_DROITE_MILIEU — le milieu, par pliage
     Le programme est explicite : au CE1, le milieu se trouve
     par PLIAGE.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_droite_milieu_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "droites_segments",
    microId: "ce1_droite_milieu",
    difficulty: 3,
    theme: "neutral",
    text: "Comment trouve-t-on le milieu d'un segment par pliage ?",
    format: "qcm",
    choices: [
      "on plie la feuille de façon que les deux extrémités se superposent",
      "on plie la feuille n'importe où sur le segment",
      "on plie la feuille en quatre",
      "on ne peut pas trouver le milieu par pliage",
    ],
    expected: ["on plie la feuille de façon que les deux extrémités se superposent"],
    comparator: "mcq_exact",
    hint: "Les deux bouts doivent tomber exactement l'un sur l'autre.",
    explanation: exp(
      "Le milieu d'un segment est le point qui le partage en deux morceaux de la même longueur.",
      "On plie la feuille en amenant une extrémité du segment sur l'autre.",
      "Quand les deux extrémités se superposent, le pli tombe exactement au milieu : les deux morceaux ont la même longueur.",
      "On plie de façon que les deux extrémités se superposent.",
    ),
    tags: ["ce1", "droites_segments", "milieu", "methode", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_droite_milieu_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "droites_segments",
    microId: "ce1_droite_milieu",
    difficulty: 4,
    theme: "neutral",
    hint: "Le milieu coupe le segment en deux morceaux égaux.",
    tags: ["ce1", "droites_segments", "milieu", "template"],
    generate: () => {
      const moitie = randomInt(2, 9);
      const longueur = moitie * 2;
      return {
        text: `Un segment mesure ${longueur} cm. Son milieu se trouve à combien de centimètres de chaque extrémité ?`,
        format: "short",
        expected: [String(moitie)],
        comparator: "number_equal",
        explanation: exp(
          "Le milieu d'un segment le partage en deux morceaux de la même longueur.",
          "On cherche la moitié de la longueur totale.",
          `La moitié de ${longueur} est ${moitie}, car ${moitie} + ${moitie} = ${longueur}.`,
          `Le milieu est à ${moitie} cm de chaque extrémité.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_DROITE_DEFI — les défis
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_droite_defi_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "droites_segments",
    microId: "ce1_droite_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Par deux points, combien peut-on tracer de droites différentes ?",
    format: "short",
    expected: ["1"],
    comparator: "number_equal",
    hint: "Essaie de poser ta règle autrement sur les deux mêmes points.",
    explanation: exp(
      "Deux points suffisent à décider complètement une droite.",
      "On pose la règle contre les deux points et on essaie de la faire pivoter.",
      "Dès que la règle touche les deux points, elle ne peut plus bouger : il n'y a qu'une seule droite possible. Par UN seul point, au contraire, il en passe une infinité.",
      "On ne peut en tracer qu'une seule.",
    ),
    tags: ["ce1", "droites_segments", "defi", "remarquable"],
  },
  {
    kind: "template",
    id: "ce1_droite_defi_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "droites_segments",
    microId: "ce1_droite_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Le milieu partage en deux parts égales.",
    tags: ["ce1", "droites_segments", "defi", "template"],
    generate: () => {
      const demi = randomInt(3, 12);
      const total = demi * 2;
      return {
        text: `Le milieu d'un segment est à ${demi} cm de l'une de ses extrémités. Combien mesure le segment en entier ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Le milieu partage le segment en deux morceaux de la même longueur.",
          "On double la distance entre le milieu et une extrémité.",
          `Les deux morceaux mesurent ${demi} cm chacun : ${demi} + ${demi} = ${total}.`,
          `Le segment mesure ${total} cm.`,
        ),
      };
    },
  },
];

/* ═════════════════════════════════════════════════════════════════════════
   GABARITS DU 10/11/2026 — robustesse et dessins.
   Mesuré ce jour-là : 2 à 8 squelettes par micro, 12 à 18 répétitions sur 20,
   et AUCUN dessin. On trace maintenant ce dont on parle : des points, des traits
   qui s'arrêtent ou qui continuent jusqu'au bord, une règle graduée en cm, des
   points alignés ou pas (l'écart se voit, ou il faut la règle à ★4). Les items
   figés sont gardés ; les anciens gabarits sont remplacés (mêmes ids).
   ⚠️ Pas de notation [AB] ou (AB) dans les choix : elle arrive au cycle 3. On dit
   « le trait de A à B », « le segment qui va de A à B ».
   ═════════════════════════════════════════════════════════════════════════ */

const ND = "droites_segments";
const g = (micro: string, id: string, d: DifficultyLevel, hint: string, gen: Parameters<typeof gab>[5]) => gab(ND, micro, id, d, hint, gen);
const VOIR = ["", "Regarde le dessin.", "Observe bien.", "Regarde bien."];
const ROUGE = "#dc2626";
const BLEU = "#2563eb";

type P = { id: string; x: number; y: number; nom?: string; cache?: boolean; couleur?: string };
/** Quatre coins cachés : le cadre du dessin, pour que les droites aient la place de continuer. */
const cadre = (l = 8, h = 5): P[] => [
  { id: "k1", x: 0, y: 0, cache: true },
  { id: "k2", x: l, y: 0, cache: true },
  { id: "k3", x: l, y: h, cache: true },
  { id: "k4", x: 0, y: h, cache: true },
];
const fig = (points: P[], extra: { segments?: object[]; droites?: object[] }, description: string): CanvasFigure =>
  ({ kind: "construction", points, segments: extra.segments ?? [], droites: extra.droites ?? [], largeur: 320, hauteurMax: 220, description }) as CanvasFigure;

/** Une règle graduée en centimètres, avec des points posés dessus. */
function regle(points: { value: number; label: string }[], max = 12): CanvasFigure {
  return {
    kind: "number_line",
    size: { width: 360, height: 90 },
    min: 0,
    max,
    step: 1,
    points,
    display: { showTicks: true, showValues: true, showPoints: true, showPointLabels: true },
  } as CanvasFigure;
}

/* ─────────────── ce1_droite_segment_reconnaitre ─────────────── */
const DR = "ce1_droite_segment_reconnaitre";

/** Un trait rouge et un trait bleu : l'un s'arrête, l'autre continue jusqu'au bord. */
function segmentOuDroite(ctx: boolean) {
  const [A, B, C, D] = lettres(4);
  const segRouge = Math.random() < 0.5;
  const y1 = un([1, 1.4]);
  const y2 = un([3.4, 3.8]);
  const pts: P[] = [...cadre(), { id: "A", x: un([1.5, 2]), y: y1, nom: A }, { id: "B", x: un([5.5, 6]), y: y1 + un([0.4, -0.3, 0.8]), nom: B }, { id: "C", x: 2.4, y: y2, nom: C }, { id: "D", x: 5.2, y: y2 + un([0.5, -0.5]), nom: D }];
  const [haut, bas] = Math.random() < 0.5 ? (["C", "A"] as const) : (["A", "C"] as const);
  const segment = { a: bas, b: bas === "A" ? "B" : "D", couleur: segRouge ? ROUGE : BLEU, epais: true };
  const droite = { a: haut, b: haut === "A" ? "B" : "D", couleur: segRouge ? BLEU : ROUGE };
  const couleur = un(["rouge", "bleu"]);
  const estSegment = (couleur === "rouge") === segRouge;
  const juste = estSegment ? "un segment" : "une droite";
  const debut = ctx ? un([`${prenom()} a tracé deux traits.`, `La maîtresse a tracé deux traits.`, `Pic voit deux traits sur sa carte.`, `${prenom()} trace deux chemins pour son train.`]) : un(VOIR);
  return {
    text: `${debut} ${un([`Le trait ${couleur} est-il un segment ou une droite ?`, `Comment s'appelle le trait ${couleur} ?`, `Le trait ${couleur}, c'est quoi ?`])}`.trim(),
    ...qcm(juste, ["un segment", "une droite", "un point", "un cercle"].filter((x) => x !== juste)),
    canvas: fig(pts, { segments: [segment], droites: [droite] }, "Un segment et une droite, de deux couleurs."),
    explanation: etapes("un segment s'arrête à ses deux bouts ; une droite continue des deux côtés.", estSegment ? `Le trait ${couleur} s'arrête à deux points.` : `Le trait ${couleur} va jusqu'au bord du dessin, et continuerait encore.`, `C'est ${juste}.`),
  };
}

/** Combien de segments sur le dessin ? (des droites pour piéger) */
function compterSegments() {
  const nSeg = entre(1, 4);
  const nDr = entre(1, 2);
  const pts: P[] = [...cadre(9, 6)];
  const segments: object[] = [];
  const droites: object[] = [];
  // Les segments à gauche, les uns sous les autres ; les droites à droite, de haut en bas.
  const ys = melange([0.6, 2, 3.4, 4.8]);
  for (let k = 0; k < nSeg; k++) {
    const x = un([0.4, 0.8]);
    const y = ys[k];
    pts.push({ id: `s${k}a`, x, y, nom: " " }, { id: `s${k}b`, x: x + un([2.4, 3]), y: y + un([0.2, 0.5, -0.3]), nom: " " });
    segments.push({ a: `s${k}a`, b: `s${k}b`, epais: true });
  }
  for (let k = 0; k < nDr; k++) {
    const x = k === 0 ? 5 : 7.4;
    pts.push({ id: `d${k}a`, x, y: 1.5, cache: true }, { id: `d${k}b`, x: x + un([0.6, -0.6]), y: 4.5, cache: true });
    droites.push({ a: `d${k}a`, b: `d${k}b`, couleur: "#0f172a" });
  }
  return {
    text: tournure(VOIR, ["Combien de segments vois-tu ?", "Compte les segments.", "Il y a combien de segments ?", "Combien de segments vois-tu en tout ?"]).trim(),
    ...qcmN(nSeg, [nSeg + nDr, nSeg + 1, nSeg - 1, nDr]),
    canvas: fig(pts, { segments, droites }, "Des segments et des droites."),
    explanation: etapes("un segment a deux bouts ; une droite traverse tout le dessin.", `Les traits avec deux bouts : ${nSeg}. Les traits qui traversent sont des droites.`, `Il y a ${nSeg} segment${nSeg > 1 ? "s" : ""}.`),
  };
}

/* ─────────────── ce1_droite_alignement_regle ─────────────── */
const DA = "ce1_droite_alignement_regle";
const SITU_ALIGN = [
  (p: string) => `${p} plante trois piquets.`,
  (p: string) => `${p} pose trois plots dans la cour.`,
  (_: string) => `Le jardinier plante trois arbres.`,
  (p: string) => `${p} regarde trois bouées.`,
  (_: string) => `Pic se pose sur trois poteaux.`,
  (p: string) => `${p} colle trois gommettes.`,
  (_: string) => `La carte au trésor a trois croix.`,
];

/** Trois points : alignés, ou pas (l'écart se voit). */
function alignesOuPas(ctx: boolean, serre: boolean) {
  const [A, B, C] = lettres(3);
  const alignes = Math.random() < 0.5;
  const pente = un([0, 0.3, -0.25, 0.5]);
  const xs = [0.5, un([3, 3.5, 4]), 7];
  const ecart = serre ? un([0.35, -0.35]) : un([1.1, -1.1, 1.4]);
  const pts: P[] = xs.map((x, k) => ({ id: `p${k}`, x, y: 2 + pente * x + (k === 1 && !alignes ? ecart : 0), nom: [A, B, C][k] }));
  const juste = alignes ? "oui, ils sont alignés" : "non, ils ne sont pas alignés";
  const debut = ctx ? un(SITU_ALIGN)(prenom()) : un(["Pose ta règle.", "Regarde les points.", ""]);
  return {
    text: `${debut} ${un([`Les points ${A}, ${B} et ${C} sont-ils alignés ?`, `${A}, ${B} et ${C} sont-ils alignés ?`, `${A}, ${B} et ${C} sont-ils sur une ligne droite ?`])}`.trim(),
    ...qcm(juste, [alignes ? "non, ils ne sont pas alignés" : "oui, ils sont alignés", "on ne peut pas savoir"]),
    canvas: fig([...cadre(7.5, 4.5).map((q) => ({ ...q, y: q.y - 0.4 })), ...pts], {}, "Trois points nommés."),
    explanation: etapes(`on pose le bord de la règle sur ${A} et ${C}, puis on regarde ${B}.`, alignes ? `${B} touche le bord de la règle.` : `${B} reste à côté de la règle.`, cap(juste) + "."),
  };
}

/** Quatre points : lequel est aligné avec les deux premiers ? */
function quelPointAligne() {
  const [A, B, X, Y, Z] = lettres(5);
  const pente = un([0, 0.25, -0.3]);
  const ligne = (x: number) => 1.6 + pente * x;
  const cand = melange([X, Y, Z]);
  const bon = cand[0];
  const pts: P[] = [
    { id: "a", x: 0.4, y: ligne(0.4), nom: A },
    { id: "b", x: 2.6, y: ligne(2.6), nom: B },
    { id: "c0", x: un([5, 5.6]), y: 0, nom: bon },
    { id: "c1", x: un([4.4, 4.8]), y: 0, nom: cand[1] },
    { id: "c2", x: un([6.4, 6.8]), y: 0, nom: cand[2] },
  ];
  pts[2].y = ligne(pts[2].x);
  pts[3].y = ligne(pts[3].x) + un([0.9, 1.1]);
  pts[4].y = ligne(pts[4].x) - un([0.9, 1.1]);
  return {
    text: `${un(["Pose ta règle.", `${prenom()} cherche avec sa règle.`, "Prends ta règle."])} ${un([`Quel point est aligné avec ${A} et ${B} ?`, `Lequel est sur la même ligne droite que ${A} et ${B} ?`, `Quel point continue la ligne de ${A} et ${B} ?`])}`,
    ...qcm(`le point ${bon}`, [`le point ${cand[1]}`, `le point ${cand[2]}`, "aucun"]),
    canvas: fig(pts, {}, "Deux points, et trois points au choix."),
    explanation: etapes(`on pose la règle sur ${A} et ${B}, et on la prolonge.`, `Le bord de la règle passe sur ${bon}.`, `C'est le point ${bon}.`),
  };
}

/* ─────────────── ce1_droite_segment_tracer ─────────────── */
const DT = "ce1_droite_segment_tracer";
const SITU_LONG = [
  (p: string) => `${p} mesure un crayon avec sa règle.`,
  (p: string) => `${p} mesure une chenille du jardin.`,
  (p: string) => `${p} mesure une plume de Pic.`,
  (p: string) => `${p} trace un chemin pour sa petite voiture.`,
  (p: string) => `${p} mesure un ruban pour un cadeau.`,
  (p: string) => `${p} trace un trait pour la ligne d'arrivée.`,
  (p: string) => `${p} mesure une brindille.`,
];

function longueurSurRegle(zero: boolean) {
  const [A, B] = lettres(2);
  const a = zero ? 0 : entre(1, 5);
  const b = a + entre(zero ? 2 : 3, 12 - a - (zero ? 0 : 1));
  const L = b - a;
  return {
    text: `${zero ? un(["", ...SITU_LONG.map((f) => f(prenom()))]) : un(SITU_LONG)(prenom())} ${un([`Combien de centimètres de ${A} à ${B} ?`, `Le segment de ${A} à ${B} mesure combien ?`, `Combien mesure le segment de ${A} à ${B} ?`])}`.trim(),
    ...qcmN(L, zero ? [L + 1, L - 1, L + 2] : [b, L + 1, L - 1, a], "cm"),
    canvas: regle([{ value: a, label: A }, { value: b, label: B }]),
    explanation: etapes(zero ? "le segment part du 0 : on lit le nombre au bout." : `le segment ne part pas du 0 : on compte les centimètres de ${a} à ${b}.`, zero ? `${B} est sur ${b}.` : `${b} − ${a} = ${L}.`, `Le segment mesure ${L} cm.`),
  };
}

function ouMarquer() {
  const [A, B] = lettres(2);
  const a = un([0, 0, 1, 2]);
  const L = entre(3, 9);
  const p = prenom();
  return {
    text: `${p} trace un segment de ${L} cm depuis ${A}. ${un([`Où marquer le point ${B} ?`, `Sur quelle graduation mettre ${B} ?`])}`,
    ...qcm(`sur le ${a + L}`, [`sur le ${L}`, `sur le ${a + L + 1}`, `sur le ${a + L - 1}`, `sur le ${L + 2}`].filter((x) => x !== `sur le ${a + L}`)),
    canvas: regle([{ value: a, label: A }]),
    explanation: etapes(`on part de ${A} et on avance de ${L} centimètres.`, `${a} + ${L} = ${a + L}.`, `On marque ${B} sur le ${a + L}.`),
  };
}

/* ─────────────── ce1_droite_milieu ─────────────── */
const DM = "ce1_droite_milieu";

function milieuCode(cherche: "moitie" | "tout") {
  const [A, M, B] = lettres(3);
  const d = entre(2, 8);
  const pts: P[] = [{ id: "a", x: 0, y: 0, nom: A }, { id: "m", x: 3, y: un([0, 0.6, -0.6]) / 2, nom: M }, { id: "b", x: 6, y: 0, nom: B }];
  pts[2].y = 2 * pts[1].y;
  const canvas = fig([...pts, { id: "h", x: 0, y: 1.4, cache: true }, { id: "h2", x: 6, y: -1.4, cache: true }], { segments: [{ a: "a", b: "m", code: 1, texte: `${d} cm` }, { a: "m", b: "b", code: 1 }] }, "Un segment et son milieu, codés.");
  const debut = un([`${M} est le milieu du segment.`, `${prenom()} a marqué le milieu ${M}.`, `Pic se pose au milieu, en ${M}.`]);
  if (cherche === "moitie") {
    return {
      text: `${debut} ${un([`Combien mesure le segment de ${M} à ${B} ?`, `Combien de centimètres de ${M} à ${B} ?`])}`,
      ...qcmN(d, [2 * d, d + 1, d - 1], "cm"),
      canvas,
      explanation: etapes("le milieu coupe le segment en deux morceaux égaux (les petits traits).", `De ${A} à ${M} : ${d} cm. De ${M} à ${B} : pareil.`, `${d} cm.`),
    };
  }
  return {
    text: `${debut} ${un([`Combien mesure le segment de ${A} à ${B} ?`, `Quelle est la longueur de ${A} à ${B} ?`])}`,
    ...qcmN(2 * d, [d, 2 * d + 1, d + 2], "cm"),
    canvas,
    explanation: etapes("le milieu coupe le segment en deux morceaux égaux.", `${d} cm + ${d} cm = ${2 * d} cm.`, `Le segment mesure ${2 * d} cm.`),
  };
}

function milieuSurRegle() {
  const [A, B] = lettres(2);
  const a = entre(0, 4);
  const L = 2 * entre(2, 4);
  const b = a + L;
  const m = a + L / 2;
  return {
    text: `${un([`${prenom()} plie le segment de ${A} à ${B} en deux.`, `On cherche le milieu du segment de ${A} à ${B}.`, `Pic veut se poser au milieu, entre ${A} et ${B}.`])} ${un(["Sur quelle graduation est le milieu ?", "Où est le milieu ?"])}`,
    ...qcm(`sur le ${m}`, [`sur le ${L / 2}`, `sur le ${m + 1}`, `sur le ${m - 1}`].filter((x) => x !== `sur le ${m}`)),
    canvas: regle([{ value: a, label: A }, { value: b, label: B }]),
    explanation: etapes("le milieu est à la même distance des deux bouts.", `De ${a} à ${b} : ${L} cm. La moitié : ${L / 2} cm. ${a} + ${L / 2} = ${m}.`, `Le milieu est sur le ${m}.`),
  };
}

/* ─────────────── ce1_droite_defi ─────────────── */
const DF = "ce1_droite_defi";

function segmentsEntrePoints() {
  const cas = un(["alignes3", "alignes4", "triangle", "carre"] as const);
  const noms = lettres(cas === "alignes3" || cas === "triangle" ? 3 : 4);
  const pos = cas === "alignes3" ? [[0, 0], [2.5, 0], [6, 0]] : cas === "alignes4" ? [[0, 0], [2, 0], [4.5, 0], [6.5, 0]] : cas === "triangle" ? [[0, 0], [5, 0], [2, 3]] : [[0, 0], [3.5, 0], [3.5, 3.5], [0, 3.5]];
  const pts: P[] = pos.map(([x, y], k) => ({ id: `p${k}`, x, y, nom: noms[k] }));
  const juste = cas === "alignes3" || cas === "triangle" ? 3 : 6;
  const segments = cas.startsWith("alignes") ? pts.slice(0, -1).map((p, k) => ({ a: p.id, b: pts[k + 1].id })) : [];
  return {
    text: cas.startsWith("alignes")
      ? `${un(["Défi !", `${prenom()} lance un défi.`, "Pic a un défi."])} ${un(["Combien de segments vois-tu en tout, petits et grands ?", "Compte tous les segments, même les grands."])}`
      : `${un(["Défi !", `${prenom()} lance un défi.`, "Pic a un défi."])} ${un(["On relie chaque point à tous les autres. Combien de segments ?", "Combien de segments pour relier chaque point à chaque autre ?"])}`,
    ...qcmN(juste, [juste - 1, juste + 1, pts.length]),
    canvas: fig([...pts, { id: "h", x: 0, y: cas.startsWith("alignes") ? 1 : 0, cache: true }, { id: "h2", x: 0, y: cas.startsWith("alignes") ? -1 : 0, cache: true }], { segments }, "Des points nommés."),
    explanation: etapes("on part de chaque point et on compte les segments, sans en oublier ni en compter deux fois.", juste === 3 ? `${noms[0]}${noms[1]}, ${noms[1]}${noms[2]}, ${noms[0]}${noms[2]}.` : cas === "alignes4" ? `${noms[0]}${noms[1]}, ${noms[1]}${noms[2]}, ${noms[2]}${noms[3]}, ${noms[0]}${noms[2]}, ${noms[1]}${noms[3]}, ${noms[0]}${noms[3]}.` : "4 côtés et 2 diagonales.", `Il y a ${juste} segments.`),
  };
}

/* ─────────────── la banque ─────────────── */
const nouveaux: TutorBankItemV4[] = [
  g(DR, "ce1_droite_reconnaitre_tpl_1", 3, "Un segment a deux bouts. Une droite ne s'arrête pas.", () => (Math.random() < 0.5 ? segmentOuDroite(true) : compterSegments())),
  g(DR, "ce1_droite_reconnaitre_tpl_2", 2, "Le trait s'arrête-t-il, ou va-t-il jusqu'au bord ?", () => segmentOuDroite(false)),

  g(DA, "ce1_droite_alignement_tpl_1", 4, "Pose la règle sur les deux premiers points.", () => (Math.random() < 0.5 ? quelPointAligne() : alignesOuPas(true, true))),
  g(DA, "ce1_droite_alignement_tpl_2", 3, "Pose le bord de la règle sur deux points, regarde le troisième.", () => alignesOuPas(Math.random() < 0.6, false)),

  g(DT, "ce1_droite_tracer_tpl_1", 3, "Le segment ne part pas toujours du 0 !", () => (Math.random() < 0.6 ? longueurSurRegle(false) : ouMarquer())),
  g(DT, "ce1_droite_tracer_tpl_2", 2, "Le segment part du 0 : lis le nombre au bout.", () => longueurSurRegle(true)),

  g(DM, "ce1_droite_milieu_tpl_1", 4, "Le milieu est à la même distance des deux bouts.", () => (Math.random() < 0.5 ? milieuSurRegle() : milieuCode("tout"))),
  g(DM, "ce1_droite_milieu_tpl_2", 3, "Les petits traits montrent deux longueurs égales.", () => milieuCode("moitie")),

  g(DF, "ce1_droite_defi_tpl_1", 5, "Le milieu coupe le segment en deux morceaux égaux.", () => (Math.random() < 0.5 ? milieuCode("tout") : milieuSurRegle())),
  g(DF, "ce1_droite_defi_tpl_2", 5, "Pars de chaque point, sans compter deux fois le même segment.", () => segmentsEntrePoints()),
];

export const droitesSegmentsBank: TutorBankItemV4[] = [...anciens.filter((i) => i.kind !== "template"), ...nouveaux];
