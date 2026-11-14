// ─── Le cercle et le périmètre du disque (6e) ──────────────────────────────────
//
// ⛔ POURQUOI CETTE BANQUE EXISTE (21/08/2026). L'extrait du BO envoyé par
// Frédéric liste, pour les périmètres en 6e :
//   · savoir que le périmètre du disque est PROPORTIONNEL à son diamètre ;
//   · connaître la formule du périmètre d'un disque ;
//   · calculer le périmètre d'un disque ;
//   · calculer des périmètres de figures composées ;
//   · résoudre des problèmes impliquant des longueurs.
//
// Le coach n'avait AUCUNE micro cercle, disque, rayon ou diamètre — ni en 6e,
// ni dans aucune autre classe de maths. `aire_perimetre` s'arrêtait au carré,
// au rectangle et à la figure quelconque. Un chapitre entier du programme était
// invisible, et rien ne le signalait : un vérificateur compte les items d'une
// micro, aucun ne demande si une micro manque.
//
// Découpage (notions courtes : 4 micros) :
//   cercle_vocabulaire   centre, rayon, diamètre, d = 2 × r
//   cercle_proportionnel le tour grandit COMME le diamètre — double, triple
//   cercle_perimetre     P = π × d = 2 × π × r, et on calcule
//   cercle_defi          les défis, roue et rond-point
//
// ⭐ La proportionnalité vient AVANT la formule, comme dans le BO : π n'est pas
// un nombre tombé du ciel, c'est le quotient P ÷ d, le même pour tous les
// disques. C'est ce que montre le canvas `tableau_proportionnalite`.
//
// Valeur approchée retenue partout : π ≈ 3,14 (convention 6e).

import type { TutorBankItemV4, TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { PRENOMS, de, pick, type Prenom } from "./entiers.bank";
import { melangeEnPlace } from "@/lib/tutor-v4/questionBank/melange";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function expl(calcul: string) {
  return (
    "Définition : le périmètre d’un disque est la longueur de son tour, le cercle.\n\n" +
    "Méthode : on repère le rayon ou le diamètre, puis on utilise P = π × d, avec d = 2 × r.\n\n" +
    "Calcul : " +
    calcul +
    "\n\nConclusion : on garde la réponse obtenue."
  );
}

/**
 * LE CERCLE COMME ENSEMBLE DE POINTS — avec des points posés à des distances
 * choisies du centre : sur le cercle, dedans, dehors.
 *
 * ⭐ C'est la figure qui fait basculer la définition. Tant qu'on ne voit qu'un
 * rond, le cercle est une FORME ; dès qu'on y pose des points en disant leur
 * distance à O, il devient un ENSEMBLE — ce que le BO demande de comprendre.
 *
 * `distances` est exprimé en fraction du rayon : 1 = sur le cercle, 0,6 =
 * dedans, 1,4 = dehors.
 */
function cercleDesPoints(
  pts: { id: string; distance: number; angle: number; highlight?: boolean }[],
  options?: { disque?: boolean }
) {
  const cx = 170;
  const cy = 130;
  const r = 80;
  return {
    kind: "cercle" as const,
    size: { width: 340, height: 260 },
    circle: {
      cx,
      cy,
      r,
      showCircle: true,
      showDisk: options?.disque ?? false,
    },
    points: [
      { id: "O", x: cx, y: cy, label: "O", color: "#ef4444", highlight: true },
      ...pts.map((p) => ({
        id: p.id,
        x: cx + p.distance * r * Math.cos((p.angle * Math.PI) / 180),
        y: cy - p.distance * r * Math.sin((p.angle * Math.PI) / 180),
        label: p.id,
        highlight: p.highlight,
      })),
    ],
    segments: pts.map((p) => ({
      id: `s_${p.id}`,
      kind: "segment" as const,
      from: "O",
      to: p.id,
      dashed: true,
    })),
    display: {
      showLabels: true,
      showPoints: true,
      showCenter: true,
      showDisk: options?.disque ?? false,
    },
  };
}

/** Un cercle portant une CORDE — le mot du BO qu'aucun item ne posait. */
function cercleAvecCorde() {
  const cx = 170;
  const cy = 130;
  const r = 80;
  return {
    kind: "cercle" as const,
    size: { width: 340, height: 260 },
    circle: { cx, cy, r, showCircle: true },
    points: [
      { id: "O", x: cx, y: cy, label: "O", color: "#ef4444", highlight: true },
      { id: "A", x: cx + r * Math.cos((140 * Math.PI) / 180), y: cy - r * Math.sin((140 * Math.PI) / 180), label: "A" },
      { id: "B", x: cx + r * Math.cos((40 * Math.PI) / 180), y: cy - r * Math.sin((40 * Math.PI) / 180), label: "B" },
    ],
    segments: [
      { id: "c1", kind: "corde" as const, from: "A", to: "B", label: "[AB]", highlight: true },
    ],
    display: { showLabels: true, showPoints: true, showCenter: true, showChord: true },
  };
}

/** Un cercle de centre O, avec le segment demandé mis en avant. */
function cercleAvec(segment: "rayon" | "diametre", label?: string) {
  const cx = 170;
  const cy = 130;
  const r = 80;
  return {
    kind: "cercle" as const,
    size: { width: 340, height: 260 },
    circle: { cx, cy, r, showCircle: true },
    points:
      segment === "rayon"
        ? [
            { id: "O", x: cx, y: cy, label: "O", color: "#ef4444", highlight: true },
            { id: "A", x: cx + r, y: cy, label: "A" },
          ]
        : [
            { id: "O", x: cx, y: cy, label: "O", color: "#ef4444", highlight: true },
            { id: "A", x: cx - r, y: cy, label: "A" },
            { id: "B", x: cx + r, y: cy, label: "B" },
          ],
    segments:
      segment === "rayon"
        ? [{ id: "s1", kind: "rayon" as const, from: "O", to: "A", label, highlight: true }]
        : [{ id: "s1", kind: "diametre" as const, from: "A", to: "B", label, highlight: true }],
    display: { showLabels: true, showPoints: true, showCenter: true },
  };
}

/** Le tableau « diamètre → périmètre » : la proportionnalité se VOIT. */
function tableauTour(diametres: number[], manquant: number, u: "cm" | "m" = "cm", ligne: 0 | 1 = 1) {
  return {
    kind: "tableau_proportionnalite" as const,
    rows: 2,
    cols: diametres.length,
    rowLabels: [`Diamètre (${u})`, `Tour (${u})`],
    values: [
      diametres.map((d) => String(d)),
      diametres.map((d) => String(Number((d * 3.14).toFixed(2))).replace(".", ",")),
    ],
    missing: [{ row: ligne, col: manquant }],
    display: { showRowLabels: true, showMissing: true, showGrid: true },
  };
}

// =========================
// ⭐ 06/10/2026 — SITUATIONS × TOURNURES × PRÉNOMS × NOMS DE POINTS
// (PASSATION-COACH-MATHS-6E-CONSIGNE.md). Mesuré le 06/10 : 7 à 15 squelettes
// par micro, 13 à 18 répétitions sur 20. Les gabarits composent maintenant un
// objet rond réel, un centre et des points aux noms tirés au sort, un prénom et
// une tournure. Les correcteurs (correcteurs/cercle.ts) relisent les nombres,
// les lettres ET le canvas.
// =========================

const LETTRES = "ABCDEFGHIJKLMNPRSTUVWXYZ".split("");
function shuffle<T>(arr: readonly T[]): T[] {
  return melangeEnPlace([...arr]);
}
function lettres(k: number): string[] {
  return shuffle(LETTRES).slice(0, k);
}
/** Virgule française, deux décimales au plus. */
const fr = (x: number) => String(Math.round(x * 100) / 100).replace(".", ",");
const maj = (s: string) => s[0].toUpperCase() + s.slice(1);
/** « d’une roue », « d’un rond-point ». */
const dUn = (nom: string) => `d’${nom}`;
const il = (p: Prenom) => (p.f ? "elle" : "il");

/** Des objets ronds de la vie courante, et leurs diamètres plausibles. */
type ObjetRond = { nom: string; u: "cm" | "m"; dMin: number; dMax: number };
const RONDS: ObjetRond[] = [
  { nom: "une roue de vélo", u: "cm", dMin: 50, dMax: 70 },
  { nom: "une roue de trottinette", u: "cm", dMin: 12, dMax: 24 },
  { nom: "une pizza", u: "cm", dMin: 26, dMax: 40 },
  { nom: "une assiette", u: "cm", dMin: 18, dMax: 28 },
  { nom: "un cerceau de gym", u: "cm", dMin: 60, dMax: 90 },
  { nom: "une horloge murale", u: "cm", dMin: 20, dMax: 50 },
  { nom: "un trampoline", u: "m", dMin: 2, dMax: 5 },
  { nom: "un rond-point", u: "m", dMin: 16, dMax: 40 },
  { nom: "un bassin rond", u: "m", dMin: 3, dMax: 12 },
  { nom: "une piscine ronde", u: "m", dMin: 3, dMax: 6 },
  { nom: "un tambour", u: "cm", dMin: 20, dMax: 50 },
  { nom: "une piste de cirque", u: "m", dMin: 12, dMax: 14 },
  { nom: "un couvercle de bocal", u: "cm", dMin: 6, dMax: 12 },
  { nom: "une table ronde", u: "cm", dMin: 80, dMax: 140 },
  { nom: "un manège", u: "m", dMin: 6, dMax: 16 },
  { nom: "une galette des rois", u: "cm", dMin: 20, dMax: 32 },
];
/** Un objet rond et un RAYON entier plausible (le diamètre 2 × r reste dans les bornes). */
function rondEtRayon(): { o: ObjetRond; r: number } {
  const o = pick(RONDS);
  return { o, r: randomInt(Math.ceil(o.dMin / 2), Math.floor(o.dMax / 2)) };
}

/** Un cercle de centre `c`, des points (angle en degrés, distance en part du rayon), des segments. */
function figureCercle(
  c: string,
  pts: { id: string; angle: number; distance?: number; highlight?: boolean }[],
  segs: { kind: "rayon" | "diametre" | "corde" | "segment"; from: string; to: string; label?: string; dashed?: boolean }[],
  opts: { disque?: boolean } = {},
) {
  const cx = 170;
  const cy = 130;
  const r = 80;
  return {
    kind: "cercle" as const,
    size: { width: 340, height: 260 },
    circle: { cx, cy, r, showCircle: true, showDisk: !!opts.disque },
    points: [
      { id: c, x: cx, y: cy, label: c.startsWith("_") ? "" : c, color: "#ef4444", highlight: true },
      ...pts.map((p) => ({
        id: p.id,
        x: Math.round(cx + (p.distance ?? 1) * r * Math.cos((p.angle * Math.PI) / 180)),
        y: Math.round(cy - (p.distance ?? 1) * r * Math.sin((p.angle * Math.PI) / 180)),
        // Un id « _1 » : point sans nom (l'énoncé ne le nomme pas).
        label: p.id.startsWith("_") ? "" : p.id,
        highlight: p.highlight,
      })),
    ],
    segments: segs.map((s, k) => ({ id: `s${k}`, ...s, highlight: !s.dashed })),
    display: { showLabels: true, showPoints: true, showCenter: true, showDisk: !!opts.disque },
  };
}

/** Le cercle et son rayon écrit, sans le point dont on demande la place. */
function figureRayonSeul(c: string, r: number, u: "cm" | "m", disque = false) {
  return figureCercle(c, [{ id: "_1", angle: randomInt(20, 160) }], [{ kind: "rayon", from: c, to: "_1", label: `${r} ${u}` }], { disque });
}

/**
 * ⭐ 14/11/2026 — LA DONNÉE DE L'ÉNONCÉ PORTÉE SUR LA FIGURE : le rayon OU le
 * diamètre, celui que dit le texte, coté de sa longueur ; points sans nom.
 * Sans `label`, le segment est tracé sans longueur : c'est celui qu'on cherche
 * (sa mesure ne s'écrit jamais sur la figure).
 */
function figureDonnee(seg: "rayon" | "diametre", label?: string) {
  const a = randomInt(0, 50);
  const l = label ? { label } : {};
  return seg === "rayon"
    ? figureCercle("_0", [{ id: "_1", angle: a }], [{ kind: "rayon", from: "_0", to: "_1", ...l }])
    : figureCercle("_0", [{ id: "_1", angle: a + 180 }, { id: "_2", angle: a }], [{ kind: "diametre", from: "_1", to: "_2", ...l }]);
}

/**
 * Deux disques côte à côte, À LA MÊME ÉCHELLE, chacun avec son diamètre coté :
 * on voit que le grand tour va avec le grand diamètre. Canvas `construction`
 * (le canvas `cercle` ne sait tracer qu'un cercle).
 */
function deuxDisques(d1: number, d2: number, u: string) {
  const [r1, r2] = [d1 / 2, d2 / 2];
  const x2 = r1 + Math.max(r1, r2) * 0.5 + r2;
  return {
    kind: "construction" as const,
    points: [
      { id: "O1", x: 0, y: 0, cache: true }, { id: "P1", x: -r1, y: 0, cache: true }, { id: "Q1", x: r1, y: 0, cache: true },
      { id: "O2", x: x2, y: 0, cache: true }, { id: "P2", x: x2 - r2, y: 0, cache: true }, { id: "Q2", x: x2 + r2, y: 0, cache: true },
    ],
    cercles: [{ centre: "O1", rayon: r1 }, { centre: "O2", rayon: r2 }],
    segments: [{ a: "P1", b: "Q1", texte: `${d1} ${u}` }, { a: "P2", b: "Q2", texte: `${d2} ${u}` }],
    description: `Deux disques de diamètres ${d1} ${u} et ${d2} ${u}`,
  };
}

/**
 * Deux cercles de centres A et B (rayons a et b, AB = c, À L'ÉCHELLE) : les
 * longueurs données s'écrivent, celle qu'on cherche jamais. `M` : un point
 * commun aux deux cercles (il faut |a − b| < c < a + b) ; `rayonA` : un rayon
 * de A coté, tracé vers le haut ; `AB` : le segment des centres, coté.
 */
function deuxCercles(
  A: string, B: string, a: number, b: number | null, c: number,
  o: { M?: string; MA?: boolean; MB?: boolean; AB?: boolean; rayonA?: boolean; u?: string },
) {
  const u = o.u ?? "cm";
  const pts: { id: string; x: number; y: number; nom?: string; cache?: boolean }[] = [
    { id: A, x: 0, y: 0, nom: A },
    { id: B, x: c, y: 0, nom: B },
  ];
  const segs: { a: string; b: string; texte?: string }[] = [];
  if (o.M && b !== null) {
    const x = (c * c + a * a - b * b) / (2 * c);
    pts.push({ id: o.M, x, y: Math.sqrt(Math.max(0, a * a - x * x)), nom: o.M });
    segs.push({ a: o.M, b: A, ...(o.MA ? { texte: `${a} ${u}` } : {}) }, { a: o.M, b: B, ...(o.MB ? { texte: `${b} ${u}` } : {}) });
  }
  if (o.rayonA) {
    pts.push({ id: "_R", x: a * Math.cos((2 * Math.PI) / 3), y: a * Math.sin((2 * Math.PI) / 3), cache: true });
    segs.push({ a: A, b: "_R", texte: `${a} ${u}` });
  }
  if (o.AB) segs.push({ a: A, b: B, texte: `${c} ${u}` });
  return {
    kind: "construction" as const,
    points: pts,
    cercles: [{ centre: A, rayon: a }, ...(b !== null ? [{ centre: B, rayon: b }] : [])],
    segments: segs,
    description: `Cercles de centres ${A} et ${B}`,
  };
}

/**
 * Le périmètre d'un disque dont on donne le diamètre (★2) ou le rayon (★3).
 * ★2 nu (03/11/2026, REGLES-6E.md) : « Calcule le périmètre d’un disque de
 * diamètre 6 cm (π ≈ 3,14). » ; les objets ronds et les prénoms passent à ★3.
 */
function perimetreDepuis(donne: "diametre" | "rayon", ctx = true, objet = false): TutorGeneratedQuestionV4 {
  if (!ctx) return perimetreNu();
  const p = pick(PRENOMS);
  const fin = pick([
    "Calcule son périmètre (π ≈ 3,14).",
    "Quelle est la longueur de son tour (π ≈ 3,14) ?",
    "Combien mesure son périmètre ? Prends π ≈ 3,14.",
  ]);
  const motDonne = donne === "diametre" ? "diamètre" : "rayon";
  if (!objet && Math.random() < 0.45) {
    const [C, A, B] = lettres(3);
    const v = donne === "diametre" ? randomInt(2, 20) : randomInt(2, 12);
    const d = donne === "diametre" ? v : 2 * v;
    const P = Number((d * 3.14).toFixed(2));
    const k = randomInt(0, 2);
    const debut = [
      `Le cercle de centre ${C} a un ${motDonne} de ${v} cm.`,
      donne === "diametre"
        ? `[${A}${B}] est un diamètre du cercle de centre ${C}, et ${A}${B} = ${v} cm.`
        : `[${C}${A}] est un rayon du cercle de centre ${C}, et ${C}${A} = ${v} cm.`,
      `${p.nom} trace au compas un disque de centre ${C} et de ${motDonne} ${v} cm.`,
    ][k];
    const a = randomInt(0, 50);
    const nomme = k === 1;
    const canvas =
      donne === "diametre"
        ? figureCercle(C, [{ id: nomme ? A : "_1", angle: a + 180 }, { id: nomme ? B : "_2", angle: a }], [
            { kind: "diametre", from: nomme ? A : "_1", to: nomme ? B : "_2", label: `${v} cm` },
          ])
        : figureCercle(C, [{ id: nomme ? A : "_1", angle: a }], [{ kind: "rayon", from: C, to: nomme ? A : "_1", label: `${v} cm` }]);
    return {
      text: `${debut} ${fin}`,
      format: "short" as const,
      expected: [`${fr(P)} cm`, fr(P)],
      comparator: "number_equal" as const,
      explanation: expl(
        donne === "diametre"
          ? `P = π × d = 3,14 × ${d} = ${fr(P)} cm.`
          : `d = 2 × ${v} = ${d} cm, puis P = π × d = 3,14 × ${d} = ${fr(P)} cm.`,
      ),
      canvas,
    };
  }
  const { o, r } = rondEtRayon();
  const d = 2 * r;
  const v = donne === "diametre" ? d : r;
  const P = Number((d * 3.14).toFixed(2));
  const debut = pick([
    `${maj(o.nom)} a un ${motDonne} de ${v} ${o.u}.`,
    `${p.nom} mesure le ${motDonne} ${dUn(o.nom)} : ${v} ${o.u}.`,
    `Le ${motDonne} ${dUn(o.nom)} vaut ${v} ${o.u}.`,
  ]);
  return {
    text: `${debut} ${fin}`,
    format: "short" as const,
    expected: [`${fr(P)} ${o.u}`, fr(P)],
    comparator: "number_equal" as const,
    explanation: expl(
      donne === "diametre"
        ? `P = π × d = 3,14 × ${d} = ${fr(P)} ${o.u}.`
        : `d = 2 × ${r} = ${d} ${o.u}, puis P = π × d = 3,14 × ${d} = ${fr(P)} ${o.u}.`,
    ),
    canvas: figureDonnee(donne, `${v} ${o.u}`),
  };
}

/** ★2 nu : le diamètre est donné, sans objet ni prénom ; une figure quand les points sont nommés. */
function perimetreNu(): TutorGeneratedQuestionV4 {
  const u = Math.random() < 0.8 ? "cm" : "m";
  const d = randomInt(2, 20);
  const P = Number((d * 3.14).toFixed(2));
  const [A, B] = lettres(2);
  const k = randomInt(0, 7);
  const text = [
    `Calcule le périmètre d’un disque de diamètre ${d} ${u} (π ≈ 3,14).`,
    `Un disque a un diamètre de ${d} ${u}. Calcule son périmètre (π ≈ 3,14).`,
    `Le diamètre [${A}${B}] mesure ${d} ${u}. Calcule le périmètre du cercle (π ≈ 3,14).`,
    `Diamètre du disque : ${d} ${u}. Quel est son périmètre (π ≈ 3,14) ?`,
    `Quel est le tour d’un disque de diamètre ${d} ${u} (π ≈ 3,14) ?`,
    `Combien mesure le périmètre d’un cercle de diamètre ${d} ${u} (π ≈ 3,14) ?`,
    `Trouve la longueur du tour : diamètre ${d} ${u} (π ≈ 3,14).`,
    `Prends π ≈ 3,14. Calcule le périmètre d’un disque de diamètre ${d} ${u}.`,
  ][k];
  const a = randomInt(0, 50);
  return {
    text,
    format: "short",
    expected: [`${fr(P)} ${u}`, fr(P)],
    comparator: "number_equal",
    explanation: expl(`P = π × d = 3,14 × ${d} = ${fr(P)} ${u}.`),
    canvas:
      k === 2
        ? figureCercle("_0", [{ id: A, angle: a + 180 }, { id: B, angle: a }], [{ kind: "diametre", from: A, to: B, label: `${d} ${u}` }])
        : figureDonnee("diametre", `${d} ${u}`),
  };
}

/** Rayon → diamètre (★2 nu) ; avec un objet rond ou un prénom (★3). */
function genRayonVersDiametre(ctx: boolean): TutorGeneratedQuestionV4 {
  const p = pick(PRENOMS);
  if (!ctx || Math.random() < 0.3) {
    const [C, A0] = lettres(2);
    const r = randomInt(2, 12);
    if (ctx) {
      const t = `${p.nom} trace un cercle de centre ${C} avec un écart de compas de ${r} cm. Quel est le diamètre du cercle ?`;
      return {
        text: t,
        format: "short",
        expected: [`${2 * r} cm`, String(2 * r)],
        comparator: "number_equal",
        explanation: expl(`L’écart du compas est le rayon. Le diamètre vaut deux rayons : d = 2 × ${r} = ${2 * r} cm.`),
        canvas: figureCercle(C, [{ id: "_1", angle: randomInt(0, 60) }], [{ kind: "rayon", from: C, to: "_1", label: `${r} cm` }]),
      };
    }
    const u = Math.random() < 0.8 ? "cm" : "m";
    const k = randomInt(0, 7);
    const t = [
      `Le cercle de centre ${C} a un rayon de ${r} ${u}. Combien mesure son diamètre ?`,
      `Le rayon [${C}${A0}] mesure ${r} ${u}. Combien mesure le diamètre ?`,
      `Le compas est écarté de ${r} ${u}. Quel est le diamètre du cercle ?`,
      `Complète : un cercle de rayon ${r} ${u} a un diamètre de … ${u}.`,
      `Un cercle a un rayon de ${r} ${u}. Calcule son diamètre.`,
      `Rayon du cercle : ${r} ${u}. Quel est son diamètre ?`,
      `Combien mesure le diamètre d’un cercle de rayon ${r} ${u} ?`,
      `Écris le diamètre d’un cercle de rayon ${r} ${u}.`,
    ][k];
    // Sur la figure, seuls les points nommés par l'énoncé portent un nom.
    const centre = k === 0 || k === 1 ? C : "_0";
    const A = k === 1 ? A0 : "_1";
    return {
      text: t,
      format: "short",
      expected: [`${2 * r} ${u}`, String(2 * r)],
      comparator: "number_equal",
      explanation: expl(`Le diamètre vaut deux rayons : d = 2 × r = 2 × ${r} = ${2 * r} ${u}.`),
      // La figure dit les mêmes nombres ET les mêmes lettres que l'énoncé.
      canvas: figureCercle(centre, [{ id: A, angle: randomInt(0, 60) }], [{ kind: "rayon", from: centre, to: A, label: `${r} ${u}` }]),
    };
  }
  const { o, r } = rondEtRayon();
  const t = pick([
    `${maj(o.nom)} a un rayon de ${r} ${o.u}. Quel est son diamètre ?`,
    `${p.nom} mesure le rayon ${dUn(o.nom)} : ${r} ${o.u}. Combien mesure son diamètre ?`,
    `Le rayon ${dUn(o.nom)} mesure ${r} ${o.u}. Calcule son diamètre.`,
  ]);
  return {
    text: t,
    format: "short",
    expected: [`${2 * r} ${o.u}`, String(2 * r)],
    comparator: "number_equal",
    explanation: expl(`Le diamètre vaut deux rayons : 2 × ${r} = ${2 * r} ${o.u}.`),
    canvas: figureDonnee("rayon", `${r} ${o.u}`),
  };
}

/** Diamètre → rayon (★2 nu) ; avec un objet rond ou un prénom (★3). */
function genDiametreVersRayon(ctx: boolean): TutorGeneratedQuestionV4 {
  const p = pick(PRENOMS);
  if (!ctx || Math.random() < 0.3) {
    const [C0, A0, B0] = lettres(3);
    const r = randomInt(2, 12);
    const d = 2 * r;
    const a = randomInt(0, 50);
    if (ctx) {
      return {
        text: `${p.nom} veut tracer au compas un cercle de diamètre ${d} cm. De combien écarte-t-${il(p)} son compas ?`,
        format: "short",
        expected: [`${r} cm`, String(r)],
        comparator: "number_equal",
        explanation: expl(`L’écart du compas est le rayon, la moitié du diamètre : ${d} ÷ 2 = ${r} cm.`),
        canvas: figureCercle("_0", [{ id: "_1", angle: a + 180 }, { id: "_2", angle: a }], [{ kind: "diametre", from: "_1", to: "_2", label: `${d} cm` }]),
      };
    }
    const u = Math.random() < 0.8 ? "cm" : "m";
    const k = randomInt(0, 7);
    const t = [
      `Le cercle de centre ${C0} a un diamètre de ${d} ${u}. Combien mesure son rayon ?`,
      `Le diamètre [${A0}${B0}] du cercle de centre ${C0} mesure ${d} ${u}. Combien mesure ${C0}${A0} ?`,
      `Pour tracer un cercle de diamètre ${d} ${u}, de combien écartes-tu le compas ?`,
      `Complète : un cercle de diamètre ${d} ${u} a un rayon de … ${u}.`,
      `Un cercle a un diamètre de ${d} ${u}. Calcule son rayon.`,
      `Diamètre du cercle : ${d} ${u}. Quel est son rayon ?`,
      `Combien mesure le rayon d’un cercle de diamètre ${d} ${u} ?`,
      `Écris le rayon d’un cercle de diamètre ${d} ${u}.`,
    ][k];
    const [C, A, B] = k === 1 ? [C0, A0, B0] : k === 0 ? [C0, "_1", "_2"] : ["_0", "_1", "_2"];
    return {
      text: t,
      format: "short",
      expected: [`${r} ${u}`, String(r)],
      comparator: "number_equal",
      explanation: expl(`Le rayon est la moitié du diamètre : r = d ÷ 2 = ${d} ÷ 2 = ${r} ${u}.`),
      canvas: figureCercle(C, [{ id: A, angle: a + 180 }, { id: B, angle: a }], [{ kind: "diametre", from: A, to: B, label: `${d} ${u}` }]),
    };
  }
  const { o, r } = rondEtRayon();
  const d = 2 * r;
  const t = pick([
    `${maj(o.nom)} a un diamètre de ${d} ${o.u}. Quel est son rayon ?`,
    `${p.nom} mesure le diamètre ${dUn(o.nom)} : ${d} ${o.u}. Combien mesure son rayon ?`,
    `Le diamètre ${dUn(o.nom)} mesure ${d} ${o.u}. Calcule son rayon.`,
  ]);
  return {
    text: t,
    format: "short",
    expected: [`${r} ${o.u}`, String(r)],
    comparator: "number_equal",
    explanation: expl(`Le rayon est la moitié du diamètre : ${d} ÷ 2 = ${r} ${o.u}.`),
    canvas: figureDonnee("diametre", `${d} ${o.u}`),
  };
}

/** Rayon, diamètre, corde, cercle ou disque (★1 nu, sur la figure) ; le contour d'un objet rond (★3). */
function genNommer(ctx: boolean): TutorGeneratedQuestionV4 {
  const [C, A, B] = lettres(3);
  const p = pick(PRENOMS);
  const cas = ctx ? pick([0, 1, 2, 3, 3, 3]) : randomInt(0, 3);
  const a = randomInt(0, 60);
  const NOMS = ["un rayon", "un diamètre", "une corde", "le centre"];
  if (cas === 3) {
    if (ctx) {
      const o = pick(RONDS);
      const t = pick([
        `${p.nom} dessine le contour ${dUn(o.nom)}. Ce trait rond est :`,
        `${p.nom} colorie tout l’intérieur ${dUn(o.nom)} dessiné(e) sur sa feuille. La partie coloriée est :`,
      ]);
      const contour = t.includes("contour");
      return {
        text: t.replace(/dessiné\(e\)/, o.nom.startsWith("une") ? "dessinée" : "dessiné"),
        format: "qcm",
        choices: shuffle(["un cercle", "un disque", "un rayon", "un diamètre"]),
        expected: [contour ? "un cercle" : "un disque"],
        comparator: "mcq_exact",
        explanation: expl("Le cercle est la ligne, le tour. Le disque est la surface : le tour ET tout l’intérieur."),
      };
    }
    // Nu : la figure montre le trait seul, ou la surface coloriée.
    const disque = Math.random() < 0.5;
    return {
      text: disque
        ? pick(["Observe la figure. La partie coloriée est :", "Comment s’appelle la partie coloriée ?", "Quel est le nom de la partie coloriée ?"])
        : pick(["Observe la figure. Le trait rond est :", "Comment s’appelle le trait rond ?", "Quel est le nom du trait rond ?"]),
      format: "qcm",
      choices: shuffle(["un cercle", "un disque", "un rayon", "un diamètre"]),
      expected: [disque ? "un disque" : "un cercle"],
      comparator: "mcq_exact",
      explanation: expl("Le cercle est la ligne, le tour. Le disque est la surface : le tour ET tout l’intérieur."),
      canvas: figureCercle("_0", [], [], { disque }),
    };
  }
  const seg = cas === 0 ? "rayon" : cas === 1 ? "diametre" : "corde";
  const nom = seg === "rayon" ? `[${C}${A}]` : `[${A}${B}]`;
  const t = ctx
    ? `${p.nom} a tracé le segment ${nom} sur le cercle de centre ${C}. C’est :`
    : pick([
        `Le centre est ${C}. Comment s’appelle le segment ${nom} ?`,
        `Dans le cercle de centre ${C}, le segment ${nom} est :`,
        `Centre ${C}. Quel est le nom du segment ${nom} ?`,
        `Observe le cercle de centre ${C}. Le segment ${nom} est :`,
        `Regarde le centre ${C}. Que représente le segment ${nom} ?`,
        `Cercle de centre ${C} : nomme le segment ${nom}.`,
        `Le point ${C} est le centre. Le segment ${nom} est :`,
        `Centre ${C}, segment ${nom} : choisis le bon mot.`,
      ]);
  const juste = seg === "rayon" ? "un rayon" : seg === "diametre" ? "un diamètre" : "une corde";
  const pts =
    seg === "rayon"
      ? [{ id: A, angle: a }]
      : seg === "diametre"
        ? [{ id: A, angle: a + 180 }, { id: B, angle: a }]
        : [{ id: A, angle: a + 110 }, { id: B, angle: a }];
  return {
    text: t,
    format: "qcm",
    choices: shuffle(NOMS),
    expected: [juste],
    comparator: "mcq_exact",
    explanation: expl(
      seg === "rayon"
        ? `${nom} va du centre ${C} à un point du cercle : c’est un rayon.`
        : seg === "diametre"
          ? `${nom} relie deux points du cercle en passant par le centre ${C} : c’est un diamètre.`
          : `${nom} relie deux points du cercle sans passer par le centre ${C} : c’est une corde.`,
    ),
    canvas: figureCercle(C, pts, [{ kind: seg, from: seg === "rayon" ? C : A, to: seg === "rayon" ? A : B }]),
  };
}

/** Le tour d'après le tableau « diamètre → tour » (★2 nu) ; le tour d'un objet rond (★3). */
function genTableau(ctx: boolean): TutorGeneratedQuestionV4 {
  let u: "cm" | "m";
  let d: number;
  let t: string;
  if (ctx) {
    const p = pick(PRENOMS);
    const o = pick(RONDS);
    u = o.u;
    d = randomInt(o.dMin, o.dMax);
    t = pick([
      `Complète le tableau : quel est le tour ${dUn(o.nom)} de diamètre ${d} ${u} ?`,
      `${p.nom} mesure ${o.nom} : ${d} ${u} de diamètre. Avec le tableau, trouve son tour.`,
      `${maj(o.nom)} a un diamètre de ${d} ${u}. Avec le tableau, trouve son tour.`,
    ]);
  } else {
    u = Math.random() < 0.75 ? "cm" : "m";
    d = randomInt(2, u === "cm" ? 30 : 12);
    t = pick([
      `Complète le tableau : quel est le tour d’un disque de diamètre ${d} ${u} ?`,
      `Un disque a un diamètre de ${d} ${u}. Avec le tableau, trouve son tour.`,
      `Avec le tableau, calcule le tour d’un disque de diamètre ${d} ${u}.`,
      `Lis le tableau. Quel tour correspond au diamètre ${d} ${u} ?`,
      `Diamètre ${d} ${u} : trouve le tour avec le tableau.`,
      `Le tableau est proportionnel. Quel est le tour pour ${d} ${u} ?`,
      `Utilise le tableau. Combien mesure le tour pour ${d} ${u} de diamètre ?`,
      `Quel nombre manque dans le tableau, pour un diamètre de ${d} ${u} ?`,
    ]);
  }
  const tour = Number((d * 3.14).toFixed(2));
  return {
    text: t,
    format: "short",
    expected: [`${fr(tour)} ${u}`, fr(tour)],
    comparator: "number_equal",
    explanation: expl(`Dans le tableau, on passe du diamètre au tour en multipliant par 3,14 : ${d} × 3,14 = ${fr(tour)} ${u}.`),
    canvas: tableauTour([1, d], 1, u),
  };
}

/** Un gabarit de la notion cercle_disque. */
function gabarit(id: string, microId: string, difficulty: number, hint: string, tags: string[], generate: () => TutorGeneratedQuestionV4): TutorBankItemV4 {
  return { kind: "template", id, niveau: "6e", matiere: "maths", notionId: "cercle_disque", microId, difficulty, theme: "neutral", hint, tags, generate } as TutorBankItemV4;
}

// =====================================================================
// ⭐ 07/11/2026 — LA MÊME PHRASE REVENAIT (scripts/mesurer-squelettes-coach.ts
// --lettres : 8 à 12 répétitions sur 20 à ★1-★2). Il faut une quarantaine de
// phrases à peu près équiprobables par étoile : chaque gabarit ci-dessous pose la
// question de plusieurs FAÇONS (lire la figure, vrai ou faux, compter, estimer,
// repérer l'erreur, prendre la question par l'autre bout).
// ★1 : 12 mots au plus. ★2 : 15 mots au plus. Aucun prénom, aucun objet à ★1-★2
// (../REGLES-6E.md). π ≈ 3,14, P = π × d et P = 2 × π × r, comme tout ce fichier.
// Correcteurs : correcteurs/cercle.ts, section du 07/11.
// =====================================================================
type G = TutorGeneratedQuestionV4;
const qc = (text: string, juste: string, faux: string[], calcul: string, canvas?: unknown): G =>
  ({ text, format: "qcm", choices: shuffle([juste, ...faux]), expected: [juste], comparator: "mcq_exact", explanation: expl(calcul), ...(canvas ? { canvas } : {}) }) as G;
/** Une longueur : nombre et unité, le nombre seul est accepté aussi. */
const lg = (text: string, v: number, u: string, calcul: string, canvas?: unknown): G =>
  ({ text, format: "short", expected: [`${fr(v)} ${u}`, fr(v)], comparator: "number_equal", explanation: expl(calcul), ...(canvas ? { canvas } : {}) }) as G;
/** Un nombre sans unité. */
const nb = (text: string, n: number, calcul: string, canvas?: unknown): G =>
  ({ text, format: "short", expected: [fr(n)], comparator: "number_equal", explanation: expl(calcul), ...(canvas ? { canvas } : {}) }) as G;
const lt = (text: string, justes: string[], calcul: string, canvas?: unknown): G =>
  ({ text, format: "short", expected: justes, comparator: "exact_text", explanation: expl(calcul), ...(canvas ? { canvas } : {}) }) as G;
const ouiNon = (text: string, oui: boolean, calcul: string, canvas?: unknown) => qc(text, oui ? "oui" : "non", [oui ? "non" : "oui"], calcul, canvas);
const vraiFaux = (text: string, vrai: boolean, calcul: string, canvas?: unknown) => qc(text, vrai ? "vrai" : "faux", [vrai ? "faux" : "vrai"], calcul, canvas);
const POSITIONS = ["sur le cercle", "à l'intérieur du disque, mais pas sur le cercle", "à l'extérieur du disque", "au centre du cercle"];

// ----- CERCLE_VOCABULAIRE ★1
/** Le mot juste d'après sa définition. */
function genVocDef(): G {
  const [t, juste, faux, pourquoi] = pick<[string, string, string[], string]>([
    ["Quel segment va du centre à un point du cercle ?", "un rayon", ["un diamètre", "une corde", "un arc"], "Du centre à un point du cercle : c’est un rayon."],
    ["Quel segment joint deux points du cercle par le centre ?", "un diamètre", ["un rayon", "un arc", "le centre"], "Il passe par le centre : c’est un diamètre."],
    ["Quel segment joint deux points du cercle sans passer par le centre ?", "une corde", ["un rayon", "un diamètre", "le centre"], "Deux points du cercle, sans le centre : c’est une corde."],
    ["Quel point est à la même distance de tout le cercle ?", "le centre", ["un rayon", "une corde", "un diamètre"], "Tous les points du cercle sont à la même distance du centre."],
    ["Comment s’appelle la moitié d’un diamètre ?", "un rayon", ["une corde", "un arc", "le centre"], "Un diamètre vaut deux rayons : sa moitié est un rayon."],
    ["Quel segment mesure deux rayons ?", "un diamètre", ["un arc", "le centre", "un rayon"], "Le diamètre vaut deux rayons."],
    ["Quelle est la plus longue corde d’un cercle ?", "un diamètre", ["un rayon", "un arc", "le centre"], "La corde la plus longue passe par le centre : c’est un diamètre."],
    ["Quel mot désigne le tour du disque ?", "le cercle", ["le rayon", "le centre", "le diamètre"], "Le cercle est la ligne, le tour du disque."],
    ["Quel mot désigne le tour et tout l’intérieur ?", "le disque", ["le cercle", "le rayon", "le centre"], "Le disque est le tour ET tout l’intérieur."],
  ]);
  return qc(t, juste, faux, pourquoi);
}
function genVocVF(): G {
  const [t, vrai, pourquoi] = pick<[string, boolean, string]>([
    ["un diamètre passe par le centre", true, "Un diamètre passe toujours par le centre."],
    ["un rayon part du centre", true, "Un rayon va du centre à un point du cercle."],
    ["un rayon joint deux points du cercle", false, "Un rayon joint le centre à UN point du cercle."],
    ["une corde passe toujours par le centre", false, "Seul le diamètre passe par le centre."],
    ["le diamètre vaut deux rayons", true, "d = 2 × r."],
    ["le rayon vaut deux diamètres", false, "C’est l’inverse : le diamètre vaut deux rayons."],
    ["tous les rayons d’un cercle sont égaux", true, "Tous les points du cercle sont à la même distance du centre."],
    ["le centre est sur le cercle", false, "Le centre est à l’intérieur, il n’est pas sur le tour."],
    ["le disque comprend le tour et l’intérieur", true, "Le disque est le tour ET tout l’intérieur."],
    ["le cercle comprend tout l’intérieur", false, "Le cercle est seulement le tour."],
  ]);
  return vraiFaux(`Vrai ou faux : ${t}.`, vrai, pourquoi);
}
/** La figure porte un diamètre, un rayon et une corde : on lit lequel est lequel. */
function genVocLire(): G {
  const [C, A, B, D, E] = lettres(5);
  const a = randomInt(0, 40);
  const fig = figureCercle(
    C,
    [{ id: A, angle: a + 180 }, { id: B, angle: a }, { id: D, angle: a + randomInt(70, 110) }, { id: E, angle: a + randomInt(235, 265) }],
    [{ kind: "diametre", from: A, to: B }, { kind: "rayon", from: C, to: D }, { kind: "corde", from: B, to: E }],
  );
  const segs = { rayon: `[${C}${D}]`, diamètre: `[${A}${B}]`, corde: `[${B}${E}]` };
  const motif = pick([
    (m: string) => `Observe la figure. Quel segment est ${m} ?`,
    (m: string) => `Choisis ${m} tracé sur la figure.`,
    (m: string) => `Trouve ${m} sur cette figure.`,
  ]);
  const quoi = pick(["rayon", "diamètre", "corde", "centre"] as const);
  if (quoi === "centre") {
    const pourquoi = `${C} est à la même distance de tous les points du cercle.`;
    return Math.random() < 0.5
      ? qc(pick(["Quel point est le centre du cercle ?", "Observe la figure. Quel point est le centre ?"]), C, [A, D, E], pourquoi, fig)
      : lt(pick(["Écris la lettre du centre.", "Observe la figure. Écris le nom du centre."]), [C], pourquoi, fig);
  }
  const m = quoi === "corde" ? "une corde" : `un ${quoi}`;
  const texte = motif(m).replace("une corde tracé", "une corde tracée");
  return qc(texte, segs[quoi], Object.values(segs).filter((x) => x !== segs[quoi]), `${segs[quoi]} est ${m} : regarde ses deux extrémités et le centre ${C}.`, fig);
}
/** On compte sur la figure : les rayons, les diamètres, les points du cercle. */
function genVocCompter(): G {
  const a = randomInt(0, 60);
  const quoi = pick(["rayons", "rayons", "rayons", "diametres", "diametres", "diametres", "points", "points"] as const);
  if (quoi === "rayons") {
    const n = randomInt(2, 5);
    const pts = Array.from({ length: n }, (_, i) => ({ id: `_${i + 1}`, angle: a + (i * 360) / n }));
    return nb(
      pick(["Combien de rayons sont tracés ?", "Compte les rayons sur la figure.", "Observe la figure. Combien vois-tu de rayons ?"]),
      n,
      `Chaque segment part du centre et s’arrête sur le cercle : ${n} rayons.`,
      figureCercle("_0", pts, pts.map((p) => ({ kind: "rayon" as const, from: "_0", to: p.id }))),
    );
  }
  if (quoi === "diametres") {
    const n = randomInt(1, 3);
    const pts = Array.from({ length: n }, (_, i) => [{ id: `_${2 * i + 1}`, angle: a + (i * 180) / n }, { id: `_${2 * i + 2}`, angle: a + 180 + (i * 180) / n }]).flat();
    return nb(
      pick(["Combien de diamètres sont tracés ?", "Compte les diamètres sur la figure.", "Observe la figure. Combien vois-tu de diamètres ?"]),
      n,
      `Chaque segment joint deux points du cercle en passant par le centre : ${n}.`,
      figureCercle("_0", pts, Array.from({ length: n }, (_, i) => ({ kind: "diametre" as const, from: `_${2 * i + 1}`, to: `_${2 * i + 2}` }))),
    );
  }
  const n = randomInt(2, 5);
  const horsCercle = randomInt(1, 2);
  const total = n + horsCercle;
  const pts = Array.from({ length: total }, (_, i) => ({ id: `_${i + 1}`, angle: a + (i * 360) / total, distance: i < n ? 1 : pick([0.55, 1.3]) }));
  return nb(pick(["Combien de points sont sur le cercle ?", "Compte les points placés sur le cercle."]), n, `Seuls ${n} points sont sur le trait du cercle.`, figureCercle("_0", pts, []));
}
/** Le geste : rayon → diamètre, diamètre → rayon. */
function genVocCalc1(): G {
  const r = randomInt(2, 12);
  const d = 2 * r;
  if (Math.random() < 0.5) {
    const t = pick([`Un rayon mesure ${r} cm. Combien mesure le diamètre ?`, `Rayon : ${r} cm. Quel est le diamètre ?`, `Le rayon vaut ${r} cm. Trouve le diamètre.`, `Rayon de ${r} cm : écris le diamètre.`]);
    return lg(t, d, "cm", `d = 2 × ${r} = ${d} cm.`, figureDonnee("rayon", `${r} cm`));
  }
  const t = pick([`Un diamètre mesure ${d} cm. Combien mesure le rayon ?`, `Diamètre : ${d} cm. Quel est le rayon ?`, `Le diamètre vaut ${d} cm. Trouve le rayon.`, `Diamètre de ${d} cm : écris le rayon.`]);
  return lg(t, r, "cm", `r = ${d} ÷ 2 = ${r} cm.`, figureDonnee("diametre", `${d} cm`));
}
/** Le compas et la règle. */
function genVocOutil(): G {
  const n = randomInt(2, 12);
  const cas = randomInt(0, 7);
  if (cas === 0) return qc("Quel instrument trace un cercle ?", "un compas", ["une équerre", "un rapporteur", "une règle"], "Le compas garde le même écart autour du centre.", figureCercle("_0", [], []));
  if (cas === 1) return qc("Où pique-t-on la pointe du compas ?", "au centre", ["sur le cercle", "sur un rayon", "sur une corde"], "On pique la pointe au centre du cercle.");
  if (cas === 2) return qc("L’écart du compas donne quelle longueur ?", "le rayon", ["le diamètre", "le tour", "la corde"], "L’écart du compas est le rayon.");
  if (cas === 3) return qc("Avec quoi mesure-t-on un rayon ?", "une règle graduée", ["un rapporteur", "une équerre", "un crayon"], "Un rayon est une longueur : on la mesure à la règle graduée.");
  // La longueur donnée sur la figure ; « Compas écarté de 5 cm. Quel est le rayon ? » : le rayon tracé sans longueur.
  if (cas === 4) return lg(`Compas écarté de ${n} cm. Quel est le rayon ?`, n, "cm", `L’écart du compas est le rayon : ${n} cm.`, figureDonnee("rayon"));
  if (cas === 5) return lg(`Compas écarté de ${n} cm. Quel est le diamètre ?`, 2 * n, "cm", `L’écart est le rayon, le diamètre vaut 2 × ${n} = ${2 * n} cm.`, figureDonnee("rayon", `${n} cm`));
  if (cas === 6) return lg(`Rayon de ${n} cm : de combien écarter le compas ?`, n, "cm", `L’écart du compas est le rayon : ${n} cm.`, figureDonnee("rayon"));
  return lg(`Diamètre de ${2 * n} cm : de combien écarter le compas ?`, n, "cm", `L’écart est le rayon : ${2 * n} ÷ 2 = ${n} cm.`, figureDonnee("diametre", `${2 * n} cm`));
}

// ----- CERCLE_VOCABULAIRE ★2
/** La corde ne dépasse jamais le diamètre. */
function genVocCorde(): G {
  const r = randomInt(3, 10);
  const d = 2 * r;
  const possible = Math.random() < 0.5;
  const c = possible ? randomInt(2, d - 1) : d + randomInt(1, 5);
  const pourquoi = `La plus longue corde est le diamètre, ${d} cm : ${c} cm ${possible ? "ne le dépasse pas" : "le dépasse"}.`;
  // La donnée sur la figure (le rayon ou le diamètre de l’énoncé) ; la corde n’est pas dessinée. « La plus
  // longue corde mesure 12 cm » reste sans figure : la dessiner en diamètre donnerait la clé.
  const figR = figureDonnee("rayon", `${r} cm`);
  const figD = figureDonnee("diametre", `${d} cm`);
  switch (randomInt(0, 7)) {
    case 0: return ouiNon(`Un cercle a un rayon de ${r} cm. Une corde peut-elle mesurer ${c} cm ?`, possible, pourquoi, figR);
    case 1: return ouiNon(`Rayon : ${r} cm. Une corde de ${c} cm est-elle possible ?`, possible, pourquoi, figR);
    case 2: return ouiNon(`Un diamètre mesure ${d} cm. Une corde peut-elle mesurer ${c} cm ?`, possible, pourquoi, figD);
    case 3: return ouiNon(`Diamètre : ${d} cm. Une corde de ${c} cm est-elle possible ?`, possible, pourquoi, figD);
    case 4: return lg(`Un cercle a un rayon de ${r} cm. Combien mesure sa plus longue corde ?`, d, "cm", `La plus longue corde est le diamètre : 2 × ${r} = ${d} cm.`, figR);
    case 5: return lg(`Combien mesure la plus longue corde d’un cercle de rayon ${r} cm ?`, d, "cm", `La plus longue corde est le diamètre : 2 × ${r} = ${d} cm.`, figR);
    case 6: return lg(`La plus longue corde d’un cercle mesure ${d} cm. Quel est son rayon ?`, r, "cm", `La plus longue corde est le diamètre : ${d} ÷ 2 = ${r} cm.`);
    default: return lg(`Quel est le rayon si la plus longue corde mesure ${d} cm ?`, r, "cm", `La plus longue corde est le diamètre : ${d} ÷ 2 = ${r} cm.`);
  }
}
/** Des segments nommés : tous les rayons sont égaux, le diamètre en vaut deux. */
function genVocEgal(): G {
  const [C, A, B] = lettres(3);
  const r = randomInt(2, 12);
  const d = 2 * r;
  const a = randomInt(0, 40);
  const deuxRayons = figureCercle(C, [{ id: A, angle: a + randomInt(20, 60) }, { id: B, angle: a + randomInt(130, 200) }], [{ kind: "rayon", from: C, to: A }, { kind: "rayon", from: C, to: B }]);
  const diam = figureCercle(C, [{ id: A, angle: a + 180 }, { id: B, angle: a }], [{ kind: "diametre", from: A, to: B }]);
  const egaux = `Tous les rayons sont égaux : ${r} cm.`;
  const moitie = `Le rayon est la moitié du diamètre : ${d} ÷ 2 = ${r} cm.`;
  const double = `Le diamètre vaut deux rayons : 2 × ${r} = ${d} cm.`;
  switch (randomInt(0, 7)) {
    case 0: return lg(`[${C}${A}] et [${C}${B}] sont deux rayons. ${C}${A} = ${r} cm. Combien mesure ${C}${B} ?`, r, "cm", egaux, deuxRayons);
    case 1: return lg(`${A} et ${B} sont sur le cercle de centre ${C}. ${C}${A} = ${r} cm. Calcule ${C}${B}.`, r, "cm", egaux, deuxRayons);
    case 2: return lg(`Rayon [${C}${A}] : ${r} cm. Quelle est la longueur du rayon [${C}${B}] ?`, r, "cm", egaux, deuxRayons);
    case 3: return lg(`[${A}${B}] est un diamètre du cercle de centre ${C}. ${A}${B} = ${d} cm. Combien mesure ${C}${A} ?`, r, "cm", moitie, diam);
    case 4: return lg(`Diamètre [${A}${B}], centre ${C}. ${C}${A} = ${r} cm. Combien mesure ${A}${B} ?`, d, "cm", double, diam);
    case 5: return lg(`${C} est le milieu du diamètre [${A}${B}]. ${A}${B} = ${d} cm. Calcule ${C}${B}.`, r, "cm", moitie, diam);
    case 6: return lg(`Diamètre [${A}${B}], centre ${C}. ${A}${B} = ${d} cm. Calcule ${C}${A}.`, r, "cm", moitie, diam);
    default: return lg(`${C} est le centre. ${C}${A} = ${r} cm et [${A}${B}] est un diamètre. Calcule ${A}${B}.`, d, "cm", double, diam);
  }
}
/** La longueur est sur la figure, pas dans le texte. */
function genVocLireMesure(): G {
  const u = Math.random() < 0.8 ? "cm" : "m";
  const r = randomInt(2, 12);
  const d = 2 * r;
  const a = randomInt(0, 50);
  if (Math.random() < 0.5) {
    const t = pick(["Observe la figure. Combien mesure le diamètre ?", "Lis la figure. Quel est le diamètre du cercle ?", "La figure donne un rayon. Calcule le diamètre.", "Regarde le rayon tracé. Écris le diamètre de ce cercle."]);
    return lg(t, d, u, `Le segment tracé est un rayon : d = 2 × ${r} = ${d} ${u}.`, figureCercle("_0", [{ id: "_1", angle: a }], [{ kind: "rayon", from: "_0", to: "_1", label: `${r} ${u}` }]));
  }
  const t = pick(["Observe la figure. Combien mesure le rayon ?", "Lis la figure. Quel est le rayon du cercle ?", "La figure donne un diamètre. Calcule le rayon.", "Regarde le diamètre tracé. Écris le rayon de ce cercle."]);
  return lg(t, r, u, `Le segment tracé est un diamètre : r = ${d} ÷ 2 = ${r} ${u}.`, figureCercle("_0", [{ id: "_1", angle: a + 180 }, { id: "_2", angle: a }], [{ kind: "diametre", from: "_1", to: "_2", label: `${d} ${u}` }]));
}
/** Trois cercles donnés par leur rayon ou leur diamètre : il faut les ramener à la même mesure. */
function genVocComparer(): G {
  const ds = shuffle([4, 6, 8, 10, 12, 14, 16, 18, 20, 24]).slice(0, 3);
  const ecrit = (d: number, k: number) => (k === 0 || (k === 2 && Math.random() < 0.5) ? `rayon ${d / 2} cm` : `diamètre ${d} cm`);
  const choix = ds.map((d, k) => ({ d, s: ecrit(d, k) }));
  const grand = Math.random() < 0.5;
  const mot = grand ? "grand" : "petit";
  const t = pick([`Quel cercle est le plus ${mot} ?`, `Quel cercle a le plus ${mot} rayon ?`, `Quel cercle a le plus ${mot} diamètre ?`, `Trouve le plus ${mot} cercle.`]);
  const dBon = grand ? Math.max(...ds) : Math.min(...ds);
  const bon = choix.find((c) => c.d === dBon)!;
  return qc(t, bon.s, choix.filter((c) => c !== bon).map((c) => c.s), `On compare les diamètres (un rayon se double) : ${choix.map((c) => `${c.d} cm`).join(", ")}. Le plus ${mot} : ${dBon} cm.`);
}
function genVocVF2(): G {
  const r = randomInt(3, 12);
  const d = 2 * r;
  const juste = Math.random() < 0.5;
  const xD = juste ? d : pick([r, r + 2, 3 * r, 4 * r]);
  const xR = juste ? r : pick([d, d + 2, 2 * d]);
  const dd = `Le diamètre vaut deux rayons : 2 × ${r} = ${d} cm.`;
  // Sur la figure, seule la longueur SÛRE de l'énoncé (le rayon r ou le diamètre d) ; celle à vérifier n'y est pas.
  const figR = figureDonnee("rayon", `${r} cm`);
  const figD = figureDonnee("diametre", `${d} cm`);
  switch (randomInt(0, 7)) {
    case 0: return vraiFaux(`Vrai ou faux : un rayon de ${r} cm donne un diamètre de ${xD} cm.`, juste, dd, figR);
    case 1: return vraiFaux(`Vrai ou faux : un diamètre de ${d} cm donne un rayon de ${xR} cm.`, juste, dd, figD);
    case 2: return ouiNon(`Rayon ${r} cm et diamètre ${xD} cm : est-ce possible ?`, juste, dd, figR);
    case 3: return ouiNon(`Diamètre ${d} cm et rayon ${xR} cm : est-ce possible ?`, juste, dd, figD);
    case 4: return ouiNon(`d = 2 × r. Avec r = ${r} cm, a-t-on d = ${xD} cm ?`, juste, dd, figR);
    case 5: return ouiNon(`r = d ÷ 2. Avec d = ${d} cm, a-t-on r = ${xR} cm ?`, juste, dd, figD);
    case 6: {
      const [A, B] = lettres(2);
      const a = randomInt(0, 50);
      return ouiNon(`[${A}${B}] est un diamètre de ${d} cm. Le rayon mesure-t-il ${xR} cm ?`, juste, dd,
        figureCercle("_0", [{ id: A, angle: a + 180 }, { id: B, angle: a }], [{ kind: "diametre", from: A, to: B, label: `${d} cm` }]));
    }
    default: return ouiNon(`Un cercle : rayon ${r} cm, diamètre ${xD} cm. Est-ce juste ?`, juste, dd, figR);
  }
}

// ----- CERCLE_PROPORTIONNEL ★1
const fois = (n: number) => `il est multiplié par ${n}`;
const divise = (n: number) => `il est divisé par ${n}`;
const fauxFois = (n: number) => ["il ne change pas", `il augmente de ${n} cm`, fois(n * n)];
const fauxDivise = (n: number) => ["il ne change pas", `il diminue de ${n} cm`, fois(n)];
/** Le diamètre change : que devient le tour ? Et à l'envers. */
function genPropEffet(): G {
  const mot = pick(["double", "triple"] as const);
  const km = mot === "double" ? 2 : 3;
  const k = randomInt(2, 6);
  const m = `Le tour et le diamètre sont proportionnels : ils changent dans le même rapport.`;
  switch (randomInt(0, 7)) {
    case 0: return qc(`Le diamètre ${mot}. Que devient le tour ?`, fois(km), fauxFois(km), m);
    case 1: return qc(`On ${mot} le diamètre. Que fait le tour ?`, fois(km), fauxFois(km), m);
    case 2: return qc(`Le tour ${mot}. Que devient le diamètre ?`, fois(km), fauxFois(km), m);
    case 3: return qc(`Le diamètre est multiplié par ${k}. Que devient le tour ?`, fois(k), fauxFois(k), m);
    case 4: return qc(`Le tour est multiplié par ${k}. Et le diamètre ?`, fois(k), fauxFois(k), m);
    case 5: return qc(`Le diamètre est divisé par ${k}. Que devient le tour ?`, divise(k), fauxDivise(k), m);
    case 6: return qc(`Le tour est divisé par ${k}. Et le diamètre ?`, divise(k), fauxDivise(k), m);
    default: return nb(`Diamètre multiplié par ${k} : le tour est multiplié par combien ?`, k, m);
  }
}
function genPropVF(): G {
  const [t, vrai, pourquoi] = pick<[string, boolean, string]>([
    ["un plus grand diamètre donne un plus grand tour", true, "Le tour grandit avec le diamètre."],
    ["deux disques de même diamètre ont le même tour", true, "Le tour ne dépend que du diamètre."],
    ["le tour ne dépend pas du diamètre", false, "Le tour vaut π × d : il dépend du diamètre."],
    ["le tour est proportionnel au diamètre", true, "P = π × d : c’est la proportionnalité."],
    ["le tour vaut exactement 2 diamètres", false, "Le tour vaut environ 3,14 diamètres."],
    ["tour ÷ diamètre donne toujours le même nombre", true, "Tour ÷ diamètre donne toujours π, environ 3,14."],
    ["tour ÷ diamètre change avec la taille", false, "Tour ÷ diamètre donne toujours π, environ 3,14."],
    ["le tour vaut environ 3 diamètres", true, "Le tour vaut environ 3,14 diamètres."],
    ["si le diamètre double, le tour quadruple", false, "Si le diamètre double, le tour double."],
    ["un plus petit diamètre donne un plus grand tour", false, "Un plus petit diamètre donne un plus petit tour."],
  ]);
  return vraiFaux(`Vrai ou faux : ${t}.`, vrai, pourquoi);
}
/** Sans calcul : le plus grand diamètre a le plus grand tour. */
function genPropChoisir(): G {
  const ds = shuffle([2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20]).slice(0, 4);
  const grand = Math.random() < 0.5;
  const t = grand
    ? pick(["Quel diamètre donne le plus grand tour ?", "Avec quel diamètre le tour est-il le plus long ?", "Le plus long tour va avec quel diamètre ?", "Choisis le diamètre du plus grand tour."])
    : pick(["Quel diamètre donne le plus petit tour ?", "Avec quel diamètre le tour est-il le plus court ?", "Le plus court tour va avec quel diamètre ?", "Choisis le diamètre du plus petit tour."]);
  const bon = grand ? Math.max(...ds) : Math.min(...ds);
  return qc(t, `${bon} cm`, ds.filter((d) => d !== bon).map((d) => `${d} cm`), "Le tour est proportionnel au diamètre : pas besoin de calculer, on compare les diamètres.");
}
/** Le diamètre passe d'une valeur à une autre : le rapport, sans calcul de tour. */
function genPropMult1(): G {
  const a = randomInt(2, 10);
  const k = randomInt(2, 4);
  const b = a * k;
  const m = `${b} ÷ ${a} = ${k} : le tour et le diamètre sont multipliés par le même nombre.`;
  const faux = ["il ne change pas", `il augmente de ${b - a} cm`, fois(k + 1)];
  const fig = deuxDisques(a, b, "cm");
  switch (randomInt(0, 5)) {
    case 0: return qc(`Le diamètre passe de ${a} cm à ${b} cm. Et le tour ?`, fois(k), faux, m, fig);
    case 1: return nb(`Diamètre : de ${a} cm à ${b} cm. Par combien multiplier le tour ?`, k, m, fig);
    case 2: return nb(`De ${a} cm à ${b} cm de diamètre : tour multiplié par ?`, k, m, fig);
    case 3: return qc(`Un diamètre de ${a} cm devient ${b} cm. Que fait le tour ?`, fois(k), faux, m, fig);
    case 4: return qc(`Le tour passe de ${fr(a * 3.14)} cm à ${fr(b * 3.14)} cm. Et le diamètre ?`, fois(k), ["il ne change pas", `il augmente de ${fr((b - a) * 3.14)} cm`, fois(k + 1)], `${fr(b * 3.14)} ÷ ${fr(a * 3.14)} = ${k} : le diamètre est multiplié par le même nombre.`);
    default: return nb(`Tour de ${fr(a * 3.14)} cm, puis de ${fr(b * 3.14)} cm : multiplié par ?`, k, `${fr(b * 3.14)} ÷ ${fr(a * 3.14)} = ${k}.`);
  }
}
/** Le nombre π, quotient du tour par le diamètre. */
function genPropPi(): G {
  const u = pick(["cm", "m"]);
  const m = "Tour ÷ diamètre donne toujours le même nombre : π, environ 3,14.";
  switch (randomInt(0, 7)) {
    case 0: return qc("Tour ÷ diamètre vaut environ combien ?", "3,14", ["2", "1", "6,28"], m);
    case 1: return qc("Comment s’appelle le nombre tour ÷ diamètre ?", "π", ["d", "r", "P"], m);
    case 2: return qc("Environ combien de diamètres font un tour ?", "environ 3", ["environ 1", "environ 2", "environ 6"], m, figureDonnee("diametre"));
    case 3: return qc("Le nombre π vaut environ :", "3,14", ["2", "31,4", "1,14"], m);
    case 4: return ouiNon("Le nombre π change-t-il avec le disque ?", false, m);
    case 5: return lg(`Un disque a un diamètre de 1 ${u}. Quel est son tour ?`, 3.14, u, `3,14 × 1 = 3,14 ${u}.`, figureDonnee("diametre", `1 ${u}`));
    case 6: return lg(`Diamètre 1 ${u} : combien mesure le tour ?`, 3.14, u, `3,14 × 1 = 3,14 ${u}.`, figureDonnee("diametre", `1 ${u}`));
    default: return qc("Par quel nombre multiplier le diamètre pour obtenir le tour ?", "3,14", ["2", "10", "1"], m);
  }
}
/** Le tableau de proportionnalité, sans aucun nombre dans le texte. */
function genPropTableau1(): G {
  const [a, b] = pick([[1, 2], [1, 3], [1, 4], [1, 5], [1, 6], [1, 10], [2, 4], [2, 6], [3, 6], [5, 10], [2, 10]]);
  const u = Math.random() < 0.75 ? "cm" : "m";
  const col = pick([1, 1, 1, 0]) as number;
  const t = pick([
    "Complète le tableau.",
    "Trouve le tour manquant.",
    "Quel nombre manque dans le tableau ?",
    "Lis le tableau. Écris le tour caché.",
    "Quel est le tour manquant ?",
    "Le tableau est proportionnel. Trouve la case vide.",
    "Observe le tableau. Quel tour manque ?",
    "Regarde les diamètres. Quel tour manque ?",
  ]);
  const d = col === 1 ? b : a;
  return lg(t, Number((d * 3.14).toFixed(2)), u, `On multiplie le diamètre par 3,14 : ${d} × 3,14 = ${fr(d * 3.14)} ${u}.`, tableauTour([a, b], col, u as "cm" | "m"));
}

// ----- CERCLE_PROPORTIONNEL ★2
/** Un tableau tout rempli, éventuellement faux en une colonne. */
function tableauPlein(ds: number[], faux: number | null) {
  return {
    kind: "tableau_proportionnalite" as const,
    rows: 2,
    cols: ds.length,
    rowLabels: ["Diamètre (cm)", "Tour (cm)"],
    values: [ds.map(String), ds.map((d) => fr(d === faux ? d * pick([2, 4]) : d * 3.14))],
    missing: [],
    display: { showRowLabels: true, showMissing: false, showGrid: true },
  };
}
/** Un disque connu, on en déduit un autre, sans formule. */
function genPropValeur2(): G {
  const d0 = randomInt(2, 10);
  const k = randomInt(2, 4);
  const grand = d0 * k;
  const descend = Math.random() < 0.25;
  const d = descend ? grand : d0;
  const c = descend ? d0 : grand;
  const t = fr(d * 3.14);
  const tc = fr(c * 3.14);
  const rapport = descend ? `divisé par ${k}` : `multiplié par ${k}`;
  const cTour = `Le diamètre est ${rapport}, donc le tour aussi : ${tc} cm.`;
  const cDiam = `Le tour est ${rapport}, donc le diamètre aussi : ${c} cm.`;
  // Le disque connu sur la figure : son diamètre, celui de l'énoncé.
  const fig = figureDonnee("diametre", `${d} cm`);
  switch (randomInt(0, 6)) {
    case 0: return lg(`Diamètre ${d} cm : tour ${t} cm. Quel est le tour pour diamètre ${c} cm ?`, c * 3.14, "cm", cTour, fig);
    case 1: return lg(`Un diamètre de ${d} cm donne un tour de ${t} cm. Et ${c} cm ?`, c * 3.14, "cm", cTour, fig);
    case 2: return lg(`Le tour vaut ${t} cm pour ${d} cm de diamètre. Et pour ${c} cm ?`, c * 3.14, "cm", cTour, fig);
    case 3: return lg(`Pour ${d} cm de diamètre, le tour fait ${t} cm. Et pour ${c} cm ?`, c * 3.14, "cm", cTour, fig);
    case 4: return lg(`Diamètre ${d} cm : tour ${t} cm. Quel diamètre pour un tour de ${tc} cm ?`, c, "cm", cDiam, fig);
    case 5: return lg(`Un tour de ${t} cm pour ${d} cm de diamètre. Quel diamètre pour ${tc} cm ?`, c, "cm", cDiam, fig);
    default: return lg(`Tour ${t} cm, diamètre ${d} cm. Quel diamètre pour un tour de ${tc} cm ?`, c, "cm", cDiam, fig);
  }
}
/** Tour ÷ diamètre, avec les vrais nombres. */
function genPropRapport2(): G {
  const d = randomInt(2, 20);
  const t = fr(d * 3.14);
  const m = `${t} ÷ ${d} = 3,14 : c’est le nombre π.`;
  const fig = figureDonnee("diametre", `${d} cm`);
  switch (randomInt(0, 6)) {
    case 0: return nb(`Tour ${t} cm, diamètre ${d} cm. Calcule tour ÷ diamètre.`, 3.14, m, fig);
    case 1: return nb(`Diamètre ${d} cm, tour ${t} cm. Que vaut tour ÷ diamètre ?`, 3.14, m, fig);
    case 2: return nb(`Tour ÷ diamètre : calcule ${t} ÷ ${d}.`, 3.14, m, fig);
    case 3: return nb(`Tour ÷ diamètre, avec ${t} cm et ${d} cm : combien ?`, 3.14, m, fig);
    case 4: return nb(`Un tour de ${t} cm pour ${d} cm de diamètre. Calcule le quotient.`, 3.14, m, fig);
    case 5: return nb(`Diamètre ${d} cm, tour ${t} cm. Combien de diamètres dans ce tour ?`, 3.14, m, fig);
    default: return nb("Le tableau donne un diamètre et son tour. Calcule tour ÷ diamètre.", 3.14, m, tableauPlein([d], null));
  }
}
/** Ce tour est-il possible ? On vérifie par le calcul. */
function genPropVerif2(): G {
  const d = randomInt(2, 20);
  const juste = Math.random() < 0.5;
  const x = juste ? d * 3.14 : d * pick([2, 4, 6.28]);
  const X = fr(x);
  const m = `3,14 × ${d} = ${fr(d * 3.14)} cm${juste ? " : c’est juste" : ` et pas ${X} cm`}.`;
  const fig = figureDonnee("diametre", `${d} cm`);
  switch (randomInt(0, 7)) {
    case 0: return ouiNon(`Diamètre ${d} cm, tour ${X} cm. Est-ce possible ?`, juste, m, fig);
    case 1: return ouiNon(`Un disque de diamètre ${d} cm a un tour de ${X} cm. Est-ce juste ?`, juste, m, fig);
    case 2: return ouiNon(`Tour de ${X} cm pour ${d} cm de diamètre : est-ce juste ?`, juste, m, fig);
    case 3: return vraiFaux(`Vrai ou faux : un diamètre de ${d} cm donne un tour de ${X} cm.`, juste, m, fig);
    case 4: return vraiFaux(`Vrai ou faux : pour ${d} cm de diamètre, le tour fait ${X} cm.`, juste, m, fig);
    case 5: return ouiNon(`Le tour fait ${X} cm. Le diamètre peut-il mesurer ${d} cm ?`, juste, m);
    case 6: return ouiNon(`Ce calcul est-il juste : ${d} × 3,14 = ${X} ?`, juste, m);
    default: return ouiNon(`Diamètre ${d} cm. Le tour peut-il mesurer ${X} cm ?`, juste, m, fig);
  }
}
/** Le rapport entre deux diamètres ou deux tours. */
function genPropFois2(): G {
  const a = randomInt(2, 8);
  const k = randomInt(2, 5);
  const b = a * k;
  const t1 = fr(a * 3.14);
  const t2 = fr(b * 3.14);
  const mD = `${b} ÷ ${a} = ${k} : le tour est multiplié par ${k}.`;
  const mT = `${t2} ÷ ${t1} = ${k} : le diamètre est multiplié par ${k}.`;
  const fig = deuxDisques(a, b, "cm");
  switch (randomInt(0, 6)) {
    case 0: return nb(`Le diamètre passe de ${a} cm à ${b} cm. Par combien le tour est-il multiplié ?`, k, mD, fig);
    case 1: return nb(`Le diamètre va de ${a} cm à ${b} cm. Le tour est multiplié par ?`, k, mD, fig);
    case 2: return nb(`Deux diamètres : ${a} cm et ${b} cm. Le grand tour vaut combien de petits tours ?`, k, mD, fig);
    case 3: return nb(`Le tour passe de ${t1} cm à ${t2} cm. Par combien le diamètre est-il multiplié ?`, k, mT);
    case 4: return nb(`Le tour va de ${t1} cm à ${t2} cm. Le diamètre est multiplié par ?`, k, mT);
    case 5: return nb(`Un tour fait ${t2} cm, un autre ${t1} cm. Combien de fois plus grand ?`, k, mT);
    default: return qc(`Le diamètre de ${a} cm devient ${b} cm. Que fait le tour ?`, fois(k), ["il ne change pas", `il augmente de ${b - a} cm`, fois(k + 1)], mD, fig);
  }
}
/** Une colonne fausse dans le tableau. */
function genPropIntrus2(): G {
  const ds = shuffle([1, 2, 3, 4, 5, 6, 8, 10]).slice(0, 3).sort((x, y) => x - y);
  const texte = pick([
    "Une seule colonne du tableau est fausse. Quel est son diamètre ?",
    "Un tour du tableau est faux. Pour quel diamètre ?",
    "Trouve l’erreur du tableau : quel diamètre ?",
    "Quel diamètre du tableau a un tour faux ?",
    "Cherche le tour faux. Quel diamètre ?",
    "Ce tableau est-il proportionnel ?",
    "Tous les tours du tableau sont-ils justes ?",
    "Ce tableau de tours est-il juste ?",
  ]);
  const m = "Dans chaque colonne, le tour doit valoir 3,14 × le diamètre.";
  if (/-il|-ils/.test(texte)) {
    const juste = Math.random() < 0.5;
    return ouiNon(texte, juste, m, tableauPlein(ds, juste ? null : pick(ds)));
  }
  const faux = pick(ds);
  return qc(texte, `${faux} cm`, ds.filter((d) => d !== faux).map((d) => `${d} cm`), m, tableauPlein(ds, faux));
}

// ----- CERCLE_PERIMETRE ★1
function genPeriFormule(): G {
  switch (randomInt(0, 8)) {
    case 0: return qc("Quelle formule donne le périmètre avec le diamètre d ?", "P = π × d", ["P = 2 × d", "P = π + d", "P = d ÷ π"], "P = π × d.");
    case 1: return qc("Quelle formule donne le périmètre avec le rayon r ?", "P = 2 × π × r", ["P = π × r", "P = 2 + π + r", "P = r × r"], "P = 2 × π × r, car d = 2 × r.");
    case 2: return qc("Complète : P = π × …", "d", ["P", "π", "2"], "P = π × d.");
    case 3: return qc("Complète : P = 2 × π × …", "r", ["d", "P", "2"], "P = 2 × π × r.");
    case 4: return qc("Complète : P = … × d", "π", ["P", "r", "d"], "P = π × d.");
    case 5: return qc("Dans P = π × d, que désigne d ?", "le diamètre", ["le rayon", "le périmètre", "le centre"], "d est le diamètre.");
    case 6: return qc("Dans P = π × d, que désigne P ?", "le périmètre", ["le rayon", "le diamètre", "le centre"], "P est le périmètre.");
    case 7: return qc("Dans P = 2 × π × r, que désigne r ?", "le rayon", ["le diamètre", "le périmètre", "le centre"], "r est le rayon.");
    default: return qc("Dans P = π × d, quelle valeur prend-on pour π ?", "3,14", ["2", "1,14", "31,4"], "On prend π ≈ 3,14.");
  }
}
function genPeriSens(): G {
  const [t, vrai, pourquoi] = pick<[string, boolean, string]>([
    ["le périmètre est une longueur", true, "Le périmètre est la longueur du tour."],
    ["P = π × d", true, "C’est la formule, avec le diamètre."],
    ["P = π × r", false, "Avec le rayon, P = 2 × π × r."],
    ["P = 2 × π × r", true, "C’est la formule, avec le rayon."],
    ["le périmètre est la surface du disque", false, "Le périmètre est le tour, pas la surface."],
    ["π vaut environ 3,14", true, "π ≈ 3,14."],
    ["π vaut exactement 3", false, "π vaut un peu plus de 3 : environ 3,14."],
  ]);
  if (Math.random() < 0.65) return vraiFaux(`Vrai ou faux : ${t}.`, vrai, pourquoi);
  return pick<() => G>([
    () => qc("Le périmètre d’un disque, c’est :", "la longueur de son tour", ["sa surface", "son rayon", "son centre"], "Le périmètre est la longueur du tour."),
    () => qc("Que mesure le périmètre d’un disque ?", "la longueur de son tour", ["sa surface", "son rayon", "son centre"], "Le périmètre est la longueur du tour."),
    () => qc("Quel mot veut dire le tour d’un disque ?", "le périmètre", ["le rayon", "le diamètre", "le centre"], "Le tour d’un disque, c’est son périmètre."),
    () => qc("Le périmètre s’exprime dans quelle unité ?", "cm", ["cm²", "°", "kg"], "Le périmètre est une longueur : on l’écrit en cm."),
  ])();
}
/** Choisir le bon calcul, sans le faire. */
function genPeriCalculChoisi(): G {
  const v = randomInt(3, 15);
  const rayon = Math.random() < 0.5;
  const mot = rayon ? "rayon" : "diamètre";
  const unUn = `un ${mot}`;
  const t = pick([
    `${maj(mot)} ${v} cm. Quel calcul donne le périmètre ?`,
    `Pour ${v} cm de ${mot}, quel calcul donne le tour ?`,
    `Choisis le calcul du périmètre, avec ${unUn} de ${v} cm.`,
    `Un disque a ${unUn} de ${v} cm. Quel calcul convient ?`,
  ]);
  const fig = figureDonnee(rayon ? "rayon" : "diametre", `${v} cm`);
  return rayon
    ? qc(t, `2 × 3,14 × ${v}`, [`3,14 × ${v}`, `2 + 3,14 + ${v}`, `${v} × ${v}`], `Avec le rayon : P = 2 × π × r = 2 × 3,14 × ${v}.`, fig)
    : qc(t, `3,14 × ${v}`, [`3,14 + ${v}`, `${v} × ${v}`, `2 × ${v}`], `Avec le diamètre : P = π × d = 3,14 × ${v}.`, fig);
}
/** Un calcul facile : des diamètres ronds. */
function genPeriCalculSimple(): G {
  const d = pick([1, 2, 3, 4, 5, 10, 20, 100]);
  const t = pick([
    `Diamètre ${d} cm. Calcule le périmètre (π ≈ 3,14).`,
    `Calcule le périmètre : diamètre ${d} cm (π ≈ 3,14).`,
    `Quel est le périmètre pour ${d} cm de diamètre (π ≈ 3,14) ?`,
    `Disque de diamètre ${d} cm. Son périmètre (π ≈ 3,14) ?`,
    `Un diamètre de ${d} cm donne quel tour (π ≈ 3,14) ?`,
    `Trouve le tour : ${d} cm de diamètre (π ≈ 3,14).`,
    `Combien mesure le tour pour ${d} cm de diamètre (π ≈ 3,14) ?`,
    `Écris le périmètre pour un diamètre de ${d} cm (π ≈ 3,14).`,
  ]);
  return lg(t, Number((d * 3.14).toFixed(2)), "cm", `P = π × d = 3,14 × ${d} = ${fr(d * 3.14)} cm.`, figureDonnee("diametre", `${d} cm`));
}
/** Quel nombre va dans la formule ? Le geste avant le calcul. */
function genPeriDansFormule(): G {
  const r = randomInt(2, 12);
  const d = 2 * r;
  const dbl = `d = 2 × ${r} = ${d} cm.`;
  const mt = `r = ${d} ÷ 2 = ${r} cm.`;
  switch (randomInt(0, 7)) {
    case 0: return lg(`Le rayon est ${r} cm. Quel diamètre mettre dans P = π × d ?`, d, "cm", dbl, figureDonnee("rayon", `${r} cm`));
    case 1: return lg(`Rayon ${r} cm. Que vaut d dans P = π × d ?`, d, "cm", dbl, figureDonnee("rayon", `${r} cm`));
    case 2: return lg(`P = 3,14 × ${d} cm. Quel est le diamètre ?`, d, "cm", `Le diamètre est le nombre multiplié par 3,14 : ${d} cm.`);
    case 3: return lg(`P = 3,14 × ${d} cm. Que vaut d ?`, d, "cm", `Le diamètre est le nombre multiplié par 3,14 : ${d} cm.`);
    case 4: return lg(`P = 3,14 × ${d} cm. Quel est le rayon ?`, r, "cm", mt);
    case 5: return lg(`P = 2 × 3,14 × ${r} cm. Quel est le rayon ?`, r, "cm", `Dans P = 2 × π × r, le rayon est ${r} cm.`);
    case 6: return lg(`P = 2 × 3,14 × ${r} cm. Quel est le diamètre ?`, d, "cm", dbl);
    default: return lg(`Avant de calculer P, que vaut d si r = ${r} cm ?`, d, "cm", dbl, figureDonnee("rayon", `${r} cm`));
  }
}

// ----- CERCLE_PERIMETRE ★2
/** Le rayon est donné : deux étapes. */
function genPeriRayon2(): G {
  const u = Math.random() < 0.8 ? "cm" : "m";
  const r = randomInt(2, 12);
  const d = 2 * r;
  const [C, A] = lettres(2);
  const k = randomInt(0, 7);
  const t = [
    `Calcule le périmètre d’un disque de rayon ${r} ${u} (π ≈ 3,14).`,
    `Un disque a un rayon de ${r} ${u}. Calcule son périmètre (π ≈ 3,14).`,
    `Rayon du disque : ${r} ${u}. Quel est son périmètre (π ≈ 3,14) ?`,
    `Quel est le tour d’un disque de rayon ${r} ${u} (π ≈ 3,14) ?`,
    `Combien mesure le périmètre d’un cercle de rayon ${r} ${u} (π ≈ 3,14) ?`,
    `Le rayon [${C}${A}] mesure ${r} ${u}. Calcule le périmètre du cercle (π ≈ 3,14).`,
    `Trouve la longueur du tour : rayon ${r} ${u} (π ≈ 3,14).`,
    `Prends π ≈ 3,14. Calcule le périmètre d’un disque de rayon ${r} ${u}.`,
  ][k];
  const canvas = k === 5 ? figureCercle(C, [{ id: A, angle: randomInt(0, 60) }], [{ kind: "rayon", from: C, to: A, label: `${r} ${u}` }]) : figureDonnee("rayon", `${r} ${u}`);
  return lg(t, Number((d * 3.14).toFixed(2)), u, `d = 2 × ${r} = ${d} ${u}, puis P = 3,14 × ${d} = ${fr(d * 3.14)} ${u}.`, canvas);
}
/** La longueur n'est que sur la figure : rayon ou diamètre, à l'élève de voir. */
function genPeriFigure2(): G {
  const u = Math.random() < 0.8 ? "cm" : "m";
  const a = randomInt(0, 50);
  const rayon = Math.random() < 0.5;
  const v = randomInt(2, 12);
  const d = rayon ? 2 * v : v;
  const t = pick([
    "Lis la longueur sur la figure. Calcule le périmètre (π ≈ 3,14).",
    "Regarde le segment tracé. Calcule le tour du disque (π ≈ 3,14).",
    "Quel est le périmètre de ce cercle (π ≈ 3,14) ?",
    "Trouve le périmètre de ce disque (π ≈ 3,14).",
    "Combien mesure le tour de ce cercle (π ≈ 3,14) ?",
    "La figure donne une longueur. Trouve le périmètre (π ≈ 3,14).",
    "Utilise la figure pour calculer le périmètre (π ≈ 3,14).",
    "Observe bien le segment. Quel est le périmètre (π ≈ 3,14) ?",
  ]);
  const canvas = rayon
    ? figureCercle("_0", [{ id: "_1", angle: a }], [{ kind: "rayon", from: "_0", to: "_1", label: `${v} ${u}` }])
    : figureCercle("_0", [{ id: "_1", angle: a + 180 }, { id: "_2", angle: a }], [{ kind: "diametre", from: "_1", to: "_2", label: `${v} ${u}` }]);
  return lg(t, Number((d * 3.14).toFixed(2)), u, `${rayon ? `Le segment est un rayon, d = 2 × ${v} = ${d} ${u}. ` : ""}P = 3,14 × ${d} = ${fr(d * 3.14)} ${u}.`, canvas);
}
/** Le chemin inverse : du périmètre au diamètre, au rayon. */
function genPeriInverse2(): G {
  const d = 2 * randomInt(1, 10);
  const P = fr(d * 3.14);
  const m = `d = P ÷ π = ${P} ÷ 3,14 = ${d} cm.`;
  const quoi = Math.random() < 0.5 ? "diamètre" : "rayon";
  const t = pick([
    `Un disque a un périmètre de ${P} cm. Trouve son ${quoi} (π ≈ 3,14).`,
    `Périmètre : ${P} cm. Quel est le ${quoi} (π ≈ 3,14) ?`,
    `Le tour mesure ${P} cm. Combien mesure le ${quoi} (π ≈ 3,14) ?`,
    `Calcule le ${quoi} d’un disque de périmètre ${P} cm (π ≈ 3,14).`,
  ]);
  // Le segment cherché est tracé, sans sa longueur.
  const fig = figureDonnee(quoi === "diamètre" ? "diametre" : "rayon");
  return quoi === "diamètre" ? lg(t, d, "cm", m, fig) : lg(t, d / 2, "cm", `${m} Puis r = ${d} ÷ 2 = ${d / 2} cm.`, fig);
}
/** Trois disques, donnés par rayon ou diamètre : le tour se compare sans calcul. */
function genPeriComparer2(): G {
  const ds = shuffle([4, 6, 8, 10, 12, 14, 16, 18, 20, 24]).slice(0, 3);
  const choix = ds.map((d, k) => ({ d, s: k === 0 || (k === 2 && Math.random() < 0.5) ? `rayon ${d / 2} cm` : `diamètre ${d} cm` }));
  const grand = Math.random() < 0.5;
  const t = grand
    ? pick(["Quel disque a le plus grand périmètre ?", "Quel disque a le plus long tour ?", "Sans calcul, choisis le plus grand périmètre.", "Choisis le disque au plus long tour."])
    : pick(["Quel disque a le plus petit périmètre ?", "Quel disque a le plus court tour ?", "Sans calcul, choisis le plus petit périmètre.", "Choisis le disque au plus court tour."]);
  const dBon = grand ? Math.max(...ds) : Math.min(...ds);
  const bon = choix.find((c) => c.d === dBon)!;
  return qc(t, bon.s, choix.filter((c) => c !== bon).map((c) => c.s), `Le tour suit le diamètre (un rayon se double) : ${choix.map((c) => `${c.d} cm`).join(", ")}.`);
}
/** Le bon nombre dans la formule ? L'erreur classique : le rayon à la place du diamètre. */
function genPeriErreur2(): G {
  const rayon = Math.random() < 0.5;
  const v = randomInt(2, 15);
  const juste = Math.random() < 0.5;
  const bonNb = rayon ? 2 * v : v;
  const x = juste ? bonNb : rayon ? v : 2 * v;
  const mot = rayon ? "rayon" : "diamètre";
  const m = rayon ? `Le rayon se double d’abord : P = 3,14 × ${bonNb}.` : `Le diamètre se met tel quel : P = 3,14 × ${bonNb}.`;
  const fig = figureDonnee(rayon ? "rayon" : "diametre", `${v} cm`);
  switch (randomInt(0, 3)) {
    case 0: return ouiNon(`${maj(mot)} ${v} cm. On écrit P = 3,14 × ${x}. Est-ce juste ?`, juste, m, fig);
    case 1: return vraiFaux(`Vrai ou faux : pour un ${mot} de ${v} cm, P = 3,14 × ${x}.`, juste, m, fig);
    case 2: return ouiNon(`Un disque de ${mot} ${v} cm a pour périmètre 3,14 × ${x}. Juste ?`, juste, m, fig);
    default: return ouiNon(`${maj(mot)} ${v} cm. Le calcul 3,14 × ${x} donne-t-il le périmètre ?`, juste, m, fig);
  }
}
/** Un ordre de grandeur : le tour vaut environ 3 diamètres. */
function genPeriEstim2(): G {
  const rayon = Math.random() < 0.5;
  const v = rayon ? pick([4, 5, 7, 8, 9, 10, 11, 12]) : pick([5, 6, 7, 8, 9, 10, 12, 15, 20, 30]);
  const d = rayon ? 2 * v : v;
  const mot = rayon ? "rayon" : "diamètre";
  const t = pick([
    `${maj(mot)} ${v} cm. Environ combien mesure le périmètre ?`,
    `Un disque a un ${mot} de ${v} cm. Son tour est proche de :`,
    `Estime le périmètre pour ${v} cm de ${mot}.`,
    `Sans poser : le tour d’un disque de ${mot} ${v} cm vaut :`,
  ]);
  const ec = (n: number) => `environ ${n} cm`;
  const faux = rayon ? [ec(3 * v), ec(v * v), ec(v)] : [ec(d), ec(2 * d), ec(d * d)];
  return qc(t, ec(3 * d), faux, `Le tour vaut un peu plus de 3 diamètres : 3 × ${d} = ${3 * d}, donc environ ${3 * d} cm.`, figureDonnee(rayon ? "rayon" : "diametre", `${v} cm`));
}

// ----- CERCLE_ENSEMBLE ★2
/** Une distance, un rayon, et le point est sur, dans ou hors du disque. */
function posTirage() {
  const r = randomInt(3, 9);
  const cas = randomInt(0, 2);
  const x = cas === 0 ? r : cas === 1 ? randomInt(1, r - 1) : r + randomInt(1, 4);
  return { r, x, cas };
}
function genEnsPosition2(): G {
  const { r, x, cas } = posTirage();
  const [O, P] = lettres(2);
  const t = pick([
    `Cercle de centre ${O}, rayon ${r} cm. ${O}${P} = ${x} cm. Où est ${P} ?`,
    `Rayon ${r} cm, centre ${O}. ${O}${P} = ${x} cm. Où se trouve ${P} ?`,
    `Centre ${O}, rayon ${r} cm, ${O}${P} = ${x} cm. Où est ${P} ?`,
    `Le rayon mesure ${r} cm et ${O}${P} = ${x} cm. Où est ${P} ?`,
    `Le point ${P} est à ${x} cm du centre ${O}. Rayon : ${r} cm. Où est-il ?`,
    `Compare ${O}${P} = ${x} cm au rayon ${r} cm. Où est ${P} ?`,
    `Disque de rayon ${r} cm, centre ${O}. ${O}${P} = ${x} cm. Où est ${P} ?`,
    `Rayon : ${r} cm. Distance ${O}${P} : ${x} cm. Où se place ${P} ?`,
  ]);
  return qc(t, POSITIONS[cas], POSITIONS.filter((_, i) => i !== cas), `On compare ${x} cm au rayon ${r} cm : ${cas === 0 ? "c’est égal" : cas === 1 ? "c’est plus petit" : "c’est plus grand"}.`, figureRayonSeul(O, r, "cm"));
}
function genEnsOuiNon2(): G {
  const { r, x } = posTirage();
  const [O, M] = lettres(2);
  const debut = pick([`Centre ${O}, rayon ${r} cm, ${O}${M} = ${x} cm.`, `${O}${M} = ${x} cm. Rayon : ${r} cm.`]);
  const [q, vrai] = pick<[string, boolean]>([
    [`${M} est-il sur le cercle ?`, x === r],
    [`${M} est-il dans le disque ?`, x <= r],
    [`${M} est-il hors du disque ?`, x > r],
  ]);
  const t = Math.random() < 0.75 ? `${debut} ${q}` : pick<string>([
    `Disque de rayon ${r} cm et de centre ${O}. ${O}${M} = ${x} cm. ${M} est-il dedans ?`,
    `Cercle de rayon ${r} cm, centre ${O}. ${O}${M} = ${x} cm. ${M} est-il dessus ?`,
  ]);
  const oui = /dedans/.test(t) ? x <= r : /dessus/.test(t) ? x === r : vrai;
  return ouiNon(t, oui, `On compare ${x} cm au rayon ${r} cm. Le disque contient aussi le cercle, son bord.`, figureRayonSeul(O, r, "cm"));
}
/**
 * Un point M posé sur le cercle de centre O, et la donnée de l'énoncé : le rayon
 * coté vers un autre point (figR), le diamètre coté (figD), ou [OM] coté (figOM).
 * [OM] n'est coté que quand l'énoncé donne OM ; sinon M est seul sur le cercle.
 */
function figuresPointSurCercle(O: string, M: string, r: number) {
  const a = randomInt(0, 40);
  const b = a + randomInt(110, 160);
  return [
    figureCercle(O, [{ id: "_1", angle: a }, { id: M, angle: b }], [{ kind: "rayon", from: O, to: "_1", label: `${r} cm` }]),
    figureCercle(O, [{ id: "_1", angle: a + 180 }, { id: "_2", angle: a }, { id: M, angle: b }], [{ kind: "diametre", from: "_1", to: "_2", label: `${2 * r} cm` }]),
    figureCercle(O, [{ id: M, angle: b }], [{ kind: "rayon", from: O, to: M, label: `${r} cm` }]),
  ];
}
/** Un point SUR le cercle : sa distance au centre est le rayon. */
function genEnsDistance2(): G {
  const r = randomInt(2, 12);
  const d = 2 * r;
  const [O, M] = lettres(2);
  const m = `${M} est sur le cercle : ${O}${M} est un rayon, ${r} cm.`;
  const [figR, figD, figOM] = figuresPointSurCercle(O, M, r);
  switch (randomInt(0, 7)) {
    case 0: return lg(`${M} est sur le cercle de centre ${O}, de rayon ${r} cm. Calcule ${O}${M}.`, r, "cm", m, figR);
    case 1: return lg(`Rayon ${r} cm, centre ${O}. ${M} est sur le cercle. Combien mesure ${O}${M} ?`, r, "cm", m, figR);
    case 2: return lg(`${M} est sur le cercle de centre ${O}. Son diamètre vaut ${d} cm. Calcule ${O}${M}.`, r, "cm", m, figD);
    case 3: return lg(`Diamètre ${d} cm, centre ${O}. ${M} est sur le cercle. Combien mesure ${O}${M} ?`, r, "cm", m, figD);
    case 4: return lg(`${M} est sur le cercle de centre ${O}. ${O}${M} = ${r} cm. Quel est le rayon ?`, r, "cm", m);
    case 5: return lg(`${M} est sur le cercle de centre ${O}. ${O}${M} = ${r} cm. Quel est le diamètre ?`, d, "cm", `${m} Le diamètre vaut ${d} cm.`, figOM);
    case 6: return lg(`${O}${M} = ${r} cm, et ${M} est sur le cercle de centre ${O}. Trouve le rayon.`, r, "cm", m);
    default: return lg(`${O}${M} = ${r} cm, et ${M} est sur le cercle de centre ${O}. Trouve le diamètre.`, d, "cm", `${m} Le diamètre vaut ${d} cm.`, figOM);
  }
}
/** La figure porte trois points : un dessus, un dedans, un dehors. On lit. */
function genEnsChoixPoint2(): G {
  const [O, A, B, C] = lettres(4);
  const a = randomInt(0, 100);
  const places = shuffle([
    { id: A, quoi: "sur" },
    { id: B, quoi: "dans" },
    { id: C, quoi: "hors" },
  ]);
  const pts = places.map((p, i) => ({ id: p.id, angle: a + 30 + i * 120, distance: p.quoi === "sur" ? 1 : p.quoi === "dans" ? 0.55 : 1.35 }));
  const fig = figureCercle(O, pts, []);
  const [t, quoi] = pick<[string, string]>([
    ["Quel point est sur le cercle ?", "sur"],
    ["Choisis le point placé sur le cercle.", "sur"],
    ["Quel point est à l’extérieur du disque ?", "hors"],
    ["Choisis le point placé hors du disque.", "hors"],
    ["Quel point est à l’intérieur du disque, pas sur le cercle ?", "dans"],
    ["Observe la figure. Quel point est dans le disque, pas sur le cercle ?", "dans"],
    [`Quel point est le plus loin du centre ${O} ?`, "hors"],
    [`Quel point est le plus près du centre ${O} ?`, "dans"],
  ]);
  const bon = places.find((p) => p.quoi === quoi)!.id;
  return qc(t, bon, places.map((p) => p.id).filter((x) => x !== bon), "On regarde la distance au centre : sur le trait, plus près, ou plus loin.", fig);
}
/** La définition par ensemble de points. */
function genEnsDef2(): G {
  const r = randomInt(2, 9);
  const [O] = lettres(1);
  const pts = (s: string) => s;
  const exact = `à ${r} cm de ${O}`;
  const auPlus = `à ${r} cm au plus de ${O}`;
  const ens = "Le cercle : à exactement cette distance. Le disque : à cette distance au plus.";
  switch (randomInt(0, 7)) {
    case 0: return qc(`Les points à ${r} cm de ${O} forment :`, "un cercle", ["un disque", "une droite", "un carré"], ens);
    case 1: return qc(`Les points à ${r} cm au plus de ${O} forment :`, "un disque", ["un cercle", "une droite", "un carré"], ens);
    case 2: return qc(`Le cercle de centre ${O} et de rayon ${r} cm, ce sont les points :`, pts(exact), [auPlus, `à ${2 * r} cm de ${O}`, `à plus de ${r} cm de ${O}`], ens);
    case 3: return qc(`Le disque de centre ${O} et de rayon ${r} cm, ce sont les points :`, pts(auPlus), [exact, `à ${2 * r} cm de ${O}`, `à plus de ${r} cm de ${O}`], ens);
    case 4: return qc(`Tous les points à exactement ${r} cm de ${O} dessinent :`, "un cercle", ["un disque", "un segment", "un carré"], ens);
    case 5: return qc(`Tous les points à ${r} cm ou moins de ${O} dessinent :`, "un disque", ["un cercle", "un segment", "un carré"], ens);
    case 6: return lg(`Un cercle a pour rayon ${r} cm. Quelle distance au centre ont ses points ?`, r, "cm", `Tous ses points sont à ${r} cm du centre.`);
    default: return qc(`Combien de points sont à ${r} cm de ${O} ?`, "une infinité", ["un seul", "deux", "quatre"], "Ils forment un cercle entier : il y en a une infinité.");
  }
}
function genEnsVF2(): G {
  const [t, vrai, pourquoi] = pick<[string, boolean, string]>([
    ["un point du cercle est aussi dans le disque", true, "Le disque contient son bord, le cercle."],
    ["le centre est sur le cercle", false, "Le centre est à l’intérieur du disque."],
    ["le centre est dans le disque", true, "Le centre est à l’intérieur du disque."],
    ["tous les points du cercle sont à la même distance du centre", true, "C’est la définition du cercle."],
    ["un point du disque est toujours sur le cercle", false, "Il peut être à l’intérieur."],
    ["le cercle est le bord du disque", true, "Le cercle est le tour du disque."],
    ["un point à plus d’un rayon du centre est dans le disque", false, "Plus loin qu’un rayon : il est dehors."],
    ["un point à moins d’un rayon du centre est dans le disque", true, "Plus près qu’un rayon : il est dedans."],
  ]);
  return vraiFaux(`Vrai ou faux : ${t}.`, vrai, pourquoi);
}

// ----- CERCLE_ENSEMBLE ★3
function genEnsCompas3(): G {
  const { r, x } = posTirage();
  const [O, M] = lettres(2);
  const p = pick(PRENOMS);
  const intro = pick([
    `${p.nom} trace un cercle de centre ${O}, de rayon ${r} cm.`,
    `${p.nom} pique son compas en ${O}, écarté de ${r} cm.`,
    `${p.nom} dessine un cercle de rayon ${r} cm et de centre ${O}.`,
  ]);
  const [q, vrai] = pick<[string, boolean]>([
    [`${M} est-il sur le cercle ?`, x === r],
    [`${M} est-il dans le disque ?`, x <= r],
    [`${M} est-il hors du disque ?`, x > r],
  ]);
  return ouiNon(`${intro} ${maj(il(p))} place ${M} à ${x} cm de ${O}. ${q}`, vrai, `On compare ${x} cm au rayon ${r} cm. Le disque contient aussi le cercle, son bord.`, figureRayonSeul(O, r, "cm"));
}
function genEnsRayon3(): G {
  const r = randomInt(2, 12);
  const d = 2 * r;
  const [O, M] = lettres(2);
  const p = pick(PRENOMS);
  const q = Math.random() < 0.5;
  const m = `${M} est sur le cercle : ${O}${M} est un rayon, de ${r} cm, et le diamètre vaut ${d} cm.`;
  const Il = maj(il(p));
  const [figR, figD, figOM] = figuresPointSurCercle(O, M, r);
  switch (randomInt(0, 3)) {
    case 0: return q ? lg(`${p.nom} place ${M} sur un cercle de centre ${O}. ${Il} mesure ${O}${M} = ${r} cm. Quel est le rayon ?`, r, "cm", m) : lg(`${p.nom} place ${M} sur un cercle de centre ${O}. ${Il} mesure ${O}${M} = ${r} cm. Quel est le diamètre ?`, d, "cm", m, figOM);
    case 1: return q ? lg(`${p.nom} trace un cercle de centre ${O}. ${M} est dessus, et ${O}${M} = ${r} cm. Quel est le rayon ?`, r, "cm", m) : lg(`${p.nom} trace un cercle de centre ${O}. ${M} est dessus, et ${O}${M} = ${r} cm. Quel est le diamètre ?`, d, "cm", m, figOM);
    case 2: return lg(`${p.nom} trace un cercle de centre ${O}, de rayon ${r} cm. ${M} est sur ce cercle. Combien mesure ${O}${M} ?`, r, "cm", m, figR);
    default: return lg(`${p.nom} trace un cercle de centre ${O}, de diamètre ${d} cm. ${M} est sur ce cercle. Combien mesure ${O}${M} ?`, r, "cm", m, figD);
  }
}
/** Trois distances, un rayon : on trie les points. */
function genEnsListe3(): G {
  const [O, A, B, C] = lettres(4);
  const r = randomInt(3, 9);
  const dist = shuffle([r, randomInt(1, r - 1), r + randomInt(1, 4)]);
  const intro = pick([`Le cercle de centre ${O} a pour rayon ${r} cm.`, `Cercle de centre ${O}, rayon ${r} cm.`, `Le rayon du cercle de centre ${O} est ${r} cm.`]);
  const listeD = `${O}${A} = ${dist[0]} cm, ${O}${B} = ${dist[1]} cm, ${O}${C} = ${dist[2]} cm.`;
  const noms = [A, B, C];
  const [q, test] = pick<[string, (x: number) => boolean]>([
    ["Quel point est sur le cercle ?", (x) => x === r],
    ["Quel point est hors du disque ?", (x) => x > r],
    ["Quel point est à l’intérieur ?", (x) => x < r],
  ]);
  const bon = noms[dist.findIndex(test)];
  // Le cercle et son rayon seulement : placer A, B, C trahirait la réponse.
  return qc(`${listeD} ${intro} ${q}`, bon, noms.filter((n) => n !== bon), `On compare chaque distance au rayon ${r} cm.`, figureRayonSeul(O, r, "cm"));
}
/** Quelle distance convient ? La question prise à l'envers. */
function genEnsChoixDistance3(): G {
  const r = randomInt(3, 9);
  const [O, M] = lettres(2);
  const p = pick(PRENOMS);
  const intro = pick([`Le cercle de centre ${O} a pour rayon ${r} cm.`, `${p.nom} trace un cercle de centre ${O}, de rayon ${r} cm.`, `${p.nom} écarte son compas de ${r} cm et pique en ${O}.`]);
  const ec = (x: number) => `${O}${M} = ${x} cm`;
  const m = `On compare la distance au rayon ${r} cm.`;
  const fig = figureRayonSeul(O, r, "cm");
  return pick<() => G>([
    () => qc(`${intro} Quelle distance place ${M} sur le cercle ?`, ec(r), [ec(r - 1), ec(r + 1), ec(2 * r)], m, fig),
    () => qc(`${intro} Quelle distance place ${M} à l’intérieur du disque ?`, ec(randomInt(1, r - 1)), [ec(r), ec(r + 1), ec(2 * r)], m, fig),
    () => qc(`${intro} Quelle distance place ${M} hors du disque ?`, ec(r + randomInt(2, 4)), [ec(r), ec(r - 1), ec(1)], m, fig),
  ])();
}
/** Le segment décrit en mots : rayon, diamètre ou corde. */
function genEnsCorde3(): G {
  const [O, A, B] = lettres(3);
  const p = pick(PRENOMS);
  const choix = ["un rayon", "un diamètre", "une corde", "un arc"];
  const cas = pick<[string, string]>([
    [`[${A}${B}] joint deux points du cercle de centre ${O} et passe par ${O}. Ce segment est :`, "un diamètre"],
    [`[${A}${B}] joint deux points du cercle de centre ${O}, sans passer par ${O}. Ce segment est :`, "une corde"],
    [`[${O}${A}] joint le centre ${O} à un point du cercle. Ce segment est :`, "un rayon"],
    [`${p.nom} relie ${A} et ${B}, deux points du cercle de centre ${O}, en passant par ${O}. Ce segment est :`, "un diamètre"],
    [`${p.nom} relie ${A} et ${B}, deux points du cercle de centre ${O}, sans passer par ${O}. Ce segment est :`, "une corde"],
    [`${p.nom} relie le centre ${O} au point ${A} du cercle. Ce segment est :`, "un rayon"],
  ]);
  // La figure montre ce que le texte DIT du segment (par le centre ou non) : rien de plus.
  const a = randomInt(0, 60);
  const fig =
    cas[1] === "un rayon"
      ? figureCercle(O, [{ id: A, angle: a }], [{ kind: "segment", from: O, to: A }])
      : cas[1] === "un diamètre"
        ? figureCercle(O, [{ id: A, angle: a + 180 }, { id: B, angle: a }], [{ kind: "segment", from: A, to: B }])
        : figureCercle(O, [{ id: A, angle: a + 110 }, { id: B, angle: a }], [{ kind: "segment", from: A, to: B }]);
  return qc(cas[0], cas[1], choix.filter((c) => c !== cas[1]), "Rayon : du centre au cercle. Diamètre : deux points du cercle, par le centre. Corde : deux points du cercle.", fig);
}

// ⭐ 07/11/2026 — cercle_distance ★5 n'avait qu'un gabarit et un figé : les prénoms
// faisaient passer la même phrase pour neuve. Sept façons de raisonner sur deux
// cercles. Correcteurs : correcteurs/cercle.ts, section « deux cercles ★5 ».
function genDeuxExtreme(plusGrand: boolean): G {
  const [A, B, M] = lettres(3);
  const a = randomInt(3, 12);
  let b = randomInt(2, 11);
  while (b === a) b = randomInt(2, 11);
  const v = plusGrand ? a + b : Math.abs(a - b);
  const mot = plusGrand ? "plus grande" : "plus petite";
  const text = pick([
    `${M} est à ${a} cm de ${A} et à ${b} cm de ${B}. Quelle est la ${mot} longueur possible de [${A}${B}] ?`,
    `Un point est à ${a} cm de ${A} et à ${b} cm de ${B}. Combien peut mesurer ${A}${B}, au ${plusGrand ? "plus" : "moins"} ?`,
    `On place ${M} à ${a} cm de ${A} et à ${b} cm de ${B}. Trouve la ${mot} distance possible entre ${A} et ${B}.`,
    `${A} et ${B} peuvent bouger, mais ${M} reste à ${a} cm de ${A} et à ${b} cm de ${B}. Quelle est la ${mot} valeur de ${A}${B} ?`,
    `Trois points : ${M} est à ${a} cm de ${A} et à ${b} cm de ${B}. Donne la ${mot} valeur possible de ${A}${B}.`,
    `Avec un point à ${a} cm de ${A} et à ${b} cm de ${B}, quelle est la ${mot} distance possible entre ${A} et ${B} ?`,
    `Les trois points ${A}, ${B} et ${M} peuvent être alignés. ${M} est à ${a} cm de ${A} et à ${b} cm de ${B}. Calcule la ${mot} longueur ${A}${B} possible.`,
  ]);
  return lg(text, v, "cm", plusGrand
    ? `${A}${B} est la plus grande quand ${M} est entre ${A} et ${B}, sur une même droite : ${a} + ${b} = ${v} cm.`
    : `${A}${B} est la plus petite quand ${A} et ${B} sont du même côté de ${M}, sur une même droite : ${Math.max(a, b)} − ${Math.min(a, b)} = ${v} cm.`);
}
function genDeuxTouche(sansToucher: boolean): G {
  const [A, B] = lettres(2);
  const a = randomInt(2, 9);
  const r = randomInt(sansToucher ? 3 : 2, 10);
  const c = a + r;
  const v = sansToucher ? r - 1 : r;
  const text = sansToucher
    ? pick([
        `${A}${B} = ${c} cm. Le cercle de centre ${A} a un rayon de ${a} cm. Le cercle de centre ${B} reste dehors, sans le toucher. Quel est son plus grand rayon entier ?`,
        `Le cercle de centre ${A} a un rayon de ${a} cm, et ${A}${B} = ${c} cm. Quel plus grand rayon entier donner au cercle de centre ${B}, dehors, sans le toucher ?`,
        `Un cercle de centre ${B} doit rester à l’extérieur du cercle de centre ${A} et de rayon ${a} cm, sans le toucher. ${A}${B} = ${c} cm. Quel est son plus grand rayon entier ?`,
        `${A}${B} = ${c} cm et le rayon du cercle de centre ${A} est ${a} cm. Écris le plus grand rayon entier du cercle de centre ${B}, placé dehors, sans le toucher.`,
        `Le cercle de centre ${A} a pour rayon ${a} cm, et ${A}${B} = ${c} cm. Un cercle de centre ${B} reste dehors, sans le toucher. Quel plus grand rayon entier peut-il avoir ?`,
        `Le plus grand rayon entier du cercle de centre ${B}, dehors et sans le toucher, vaut combien ? Le cercle de centre ${A} a pour rayon ${a} cm et ${A}${B} = ${c} cm.`,
      ])
    : pick([
        `${A}${B} = ${c} cm. Le cercle de centre ${A} a un rayon de ${a} cm. Quel rayon donner au cercle de centre ${B} pour qu’ils se touchent de l’extérieur ?`,
        `Deux cercles se touchent de l’extérieur, en un seul point. Le premier a pour centre ${A} et pour rayon ${a} cm. Le second a pour centre ${B}, et ${A}${B} = ${c} cm. Calcule son rayon.`,
        `Le cercle de centre ${A} a un rayon de ${a} cm, et ${A}${B} = ${c} cm. Le cercle de centre ${B} le touche de l’extérieur. Quel est son rayon ?`,
        `${A}${B} = ${c} cm. Pour toucher de l’extérieur le cercle de centre ${A} et de rayon ${a} cm, quel rayon faut-il au cercle de centre ${B} ?`,
        `Un cercle de centre ${B} touche de l’extérieur le cercle de centre ${A}, de rayon ${a} cm. Sachant que ${A}${B} = ${c} cm, trouve le rayon du cercle de centre ${B}.`,
        `Quel est le rayon du cercle de centre ${B}, s’il touche de l’extérieur le cercle de centre ${A} de rayon ${a} cm ? On a ${A}${B} = ${c} cm.`,
      ]);
  // Le cercle de A, son rayon et AB cotés ; le cercle de B (quand il touche) tracé sans son rayon.
  const fig = deuxCercles(A, B, a, sansToucher ? null : r, c, { rayonA: true, AB: true });
  return lg(text, v, "cm", sansToucher
    ? `Pour se toucher de l’extérieur, il faudrait ${c} − ${a} = ${r} cm. Sans toucher, le plus grand rayon entier est ${v} cm.`
    : `Les deux rayons, bout à bout, font la distance entre les centres : ${c} − ${a} = ${v} cm.`, fig);
}
function genDeuxCoupent(): G {
  const [A, B] = lettres(2);
  const a = randomInt(3, 9);
  let b = randomInt(2, 8);
  while (b === a) b = randomInt(2, 8);
  const cas = randomInt(0, 4);
  // Se coupent, trop loin, ou l'un dans l'autre ; jamais tangents, « se coupent » y serait discutable.
  const d = Math.abs(a - b);
  const c = cas <= 1 ? randomInt(d + 1, a + b - 1) : cas <= 3 || d < 2 ? a + b + randomInt(1, 5) : randomInt(1, d - 1);
  const oui = c > d && c < a + b;
  const ra = `centre ${A} et de rayon ${a} cm`;
  const rb = `centre ${B} et de rayon ${b} cm`;
  const text = pick([
    `Le cercle de ${ra} coupe-t-il le cercle de ${rb} ? On a ${A}${B} = ${c} cm.`,
    `${A}${B} = ${c} cm. Le cercle de ${ra} et le cercle de ${rb} se coupent-ils ?`,
    `On trace le cercle de ${ra}, puis le cercle de ${rb}. ${A}${B} = ${c} cm. Ont-ils des points communs ?`,
    `Deux cercles : ${ra} ; ${rb}. Comme ${A}${B} = ${c} cm, se croisent-ils ?`,
    `Sans tracer : ${A}${B} = ${c} cm. Le cercle de ${ra} rencontre-t-il le cercle de ${rb} ?`,
    `Avec ${A}${B} = ${c} cm, un point peut-il être sur le cercle de ${ra} et aussi sur le cercle de ${rb} ?`,
  ]);
  return qc(text, oui ? "oui" : "non", [oui ? "non" : "oui", "on ne peut pas savoir"],
    oui
      ? `${c} cm est plus petit que ${a} + ${b} = ${a + b} cm et plus grand que ${d} cm : les cercles se coupent.`
      : c >= a + b
        ? `${c} cm est plus grand que ${a} + ${b} = ${a + b} cm : les cercles sont trop loin.`
        : `${c} cm est plus petit que ${Math.max(a, b)} − ${Math.min(a, b)} = ${d} cm : un cercle est à l’intérieur de l’autre.`);
}
function genDeuxZone(): G {
  const [A, B] = lettres(2);
  const a = randomInt(3, 12);
  const b = randomInt(3, 12);
  const oui = Math.random() < 0.5;
  const c = oui ? randomInt(Math.max(1, a + b - 5), a + b - 1) : a + b + randomInt(1, 6);
  const z = `à moins de ${a} m de ${A} et à moins de ${b} m de ${B}`;
  const text = pick([
    `On cherche une place ${z}. ${A}${B} = ${c} m. Cette place existe-t-elle ?`,
    `${A}${B} = ${c} m. Une place ${z} : est-ce possible ?`,
    `Une balise est ${z}, avec ${A}${B} = ${c} m. Est-ce possible ?`,
    `Peut-on trouver un point ${z}, quand ${A}${B} = ${c} m ?`,
    `Deux disques se chevauchent-ils ? On veut un point ${z}, et ${A}${B} = ${c} m.`,
    `${A}${B} = ${c} m. Y a-t-il au moins un point ${z} ?`,
    `Un chat reste ${z}. Sachant que ${A}${B} = ${c} m, est-ce possible ?`,
  ]);
  return qc(text, oui ? "oui" : "non", [oui ? "non" : "oui", "on ne peut pas savoir"],
    oui
      ? `Les deux disques se chevauchent, car ${c} m est plus petit que ${a} + ${b} = ${a + b} m.`
      : `Les deux disques ne se touchent pas, car ${c} m est plus grand que ${a} + ${b} = ${a + b} m.`);
}
function genDeuxSomme(): G {
  const [A, B, M] = lettres(3);
  const a = randomInt(3, 12);
  const b = randomInt(3, 12);
  const c = randomInt(Math.abs(a - b) + 1, a + b - 1);
  const ra = `centre ${A} et de rayon ${a} cm`;
  const rb = `centre ${B} et de rayon ${b} cm`;
  if (Math.random() < 0.5) {
    const text = pick([
      `${M} est sur le cercle de ${ra}, et sur celui de ${rb}. Calcule ${M}${A} + ${M}${B}.`,
      `Le point ${M} appartient au cercle de ${ra} et au cercle de ${rb}. Que vaut ${M}${A} + ${M}${B} ?`,
      `Deux cercles se coupent en ${M} : ${ra} ; ${rb}. Trouve ${M}${A} + ${M}${B}.`,
      `Sans mesurer : ${M} est sur le cercle de ${ra} et sur le cercle de ${rb}. Combien font ${M}${A} + ${M}${B} ?`,
    ]);
    // [MA] et [MB] tracés sans longueur : voir que ce sont des rayons, c'est la question.
    return lg(text, a + b, "cm", `${M}${A} est un rayon du premier cercle, ${M}${B} un rayon du second : ${a} + ${b} = ${a + b} cm.`, deuxCercles(A, B, a, b, c, { M }));
  }
  const text = pick([
    `${M} est sur le cercle de ${ra}, et sur celui de ${rb}. ${A}${B} = ${c} cm. Calcule le périmètre du triangle ${M}${A}${B}.`,
    `Deux cercles se coupent en ${M} : ${ra} ; ${rb}. ${A}${B} = ${c} cm. Quel est le périmètre du triangle ${A}${B}${M} ?`,
    `${A}${B} = ${c} cm. Le point ${M} appartient au cercle de ${ra} et au cercle de ${rb}. Donne le périmètre de ${M}${A}${B}.`,
    `Le triangle ${M}${A}${B} a son sommet ${M} sur le cercle de ${ra} et sur le cercle de ${rb}. ${A}${B} = ${c} cm. Trouve son périmètre.`,
  ]);
  return lg(text, a + b + c, "cm", `${M}${A} = ${a} cm et ${M}${B} = ${b} cm sont des rayons : ${a} + ${b} + ${c} = ${a + b + c} cm.`, deuxCercles(A, B, a, b, c, { M, AB: true }));
}

export const cercleBank: TutorBankItemV4[] = [
  // =========================
  // CERCLE_VOCABULAIRE
  // =========================
  {
    kind: "fixed",
    id: "cercle_vocabulaire_canvas_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_vocabulaire",
    difficulty: 1,
    theme: "neutral",
    text: "Observe la figure. Comment s’appelle le segment [OA] ?",
    format: "qcm",
    choices: ["un rayon", "un diamètre", "une corde", "un arc"],
    expected: ["un rayon"],
    comparator: "mcq_exact",
    hint: "Il part du centre O et s’arrête sur le cercle.",
    explanation: expl(
      "Un segment qui joint le centre à un point du cercle est un rayon. Le diamètre, lui, traverse le cercle en passant par le centre."
    ),
    tags: ["cercle_disque", "vocabulaire", "canvas", "qcm"],
    canvas: cercleAvec("rayon"), // 07/11 : l’étiquette « rayon » donnait la réponse.
  },
  {
    kind: "fixed",
    id: "cercle_vocabulaire_canvas_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_vocabulaire",
    difficulty: 1,
    theme: "neutral",
    text: "Observe la figure. Comment s’appelle le segment [AB] ?",
    format: "qcm",
    choices: ["un diamètre", "un rayon", "une corde qui évite le centre", "un arc de cercle"],
    expected: ["un diamètre"],
    comparator: "mcq_exact",
    hint: "Il joint deux points du cercle EN PASSANT par le centre.",
    explanation: expl(
      "Un segment qui joint deux points du cercle en passant par le centre est un diamètre. Il vaut deux rayons."
    ),
    tags: ["cercle_disque", "vocabulaire", "canvas", "qcm"],
    canvas: cercleAvec("diametre"), // 07/11 : l’étiquette « diamètre » donnait la réponse.
  },
  {
    kind: "fixed",
    id: "cercle_vocabulaire_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_vocabulaire",
    difficulty: 1,
    theme: "neutral",
    text: "Un cercle a un rayon de 4 cm. Combien mesure son diamètre ?",
    format: "short",
    expected: ["8", "8 cm"],
    comparator: "number_equal",
    hint: "Le diamètre vaut deux fois le rayon.",
    explanation: expl("d = 2 × r = 2 × 4 = 8 cm."),
    tags: ["cercle_disque", "vocabulaire", "short"],
  },
  {
    kind: "fixed",
    id: "cercle_vocabulaire_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_vocabulaire",
    difficulty: 1,
    theme: "neutral",
    text: "Un cercle a un diamètre de 10 cm. Combien mesure son rayon ?",
    format: "short",
    expected: ["5", "5 cm"],
    comparator: "number_equal",
    hint: "Le rayon est la moitié du diamètre.",
    explanation: expl("r = d ÷ 2 = 10 ÷ 2 = 5 cm."),
    tags: ["cercle_disque", "vocabulaire", "short"],
  },
  {
    kind: "fixed",
    id: "cercle_vocabulaire_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_vocabulaire",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la différence entre un cercle et un disque ?",
    format: "qcm",
    choices: [
      "le cercle est le bord, le disque est toute la surface",
      "le disque est le bord, le cercle est toute la surface",
      "ce sont deux mots pour la même chose",
      "le cercle est plat, le disque est en relief",
    ],
    expected: ["le cercle est le bord, le disque est toute la surface"],
    comparator: "mcq_exact",
    hint: "Une pièce de monnaie, c’est un disque ; son bord, c’est un cercle.",
    explanation: expl(
      "Le cercle est la ligne, le contour. Le disque est cette ligne AVEC tout l’intérieur : c’est pour cela qu’on parle du périmètre du disque et de l’aire du disque."
    ),
    tags: ["cercle_disque", "vocabulaire", "qcm"],
  },
  {
    kind: "fixed",
    id: "cercle_vocabulaire_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_vocabulaire",
    difficulty: 2,
    theme: "neutral",
    text: "Combien un cercle a-t-il de rayons différents ?",
    format: "qcm",
    choices: ["une infinité", "un seul", "deux", "quatre"],
    expected: ["une infinité"],
    comparator: "mcq_exact",
    hint: "On peut joindre le centre à n’importe quel point du cercle.",
    explanation: expl(
      "Chaque point du cercle donne un rayon, et il y en a une infinité. Tous ont la même longueur : c’est justement ce qui définit le cercle."
    ),
    tags: ["cercle_disque", "vocabulaire", "qcm"],
  },
  {
    kind: "fixed",
    id: "cercle_vocabulaire_fixed_5",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_vocabulaire",
    difficulty: 2,
    theme: "neutral",
    text: "Avec quel instrument trace-t-on un cercle de rayon 3 cm ?",
    format: "qcm",
    choices: [
      "un compas, écarté de 3 cm",
      "une règle, posée sur 3 cm",
      "une équerre, calée sur 3 cm",
      "un rapporteur, ouvert à 3°",
    ],
    expected: ["un compas, écarté de 3 cm"],
    comparator: "mcq_exact",
    hint: "L’écartement du compas EST le rayon.",
    explanation: expl(
      "On pointe le compas sur le centre et on l’écarte de 3 cm : la mine reste à 3 cm du centre tout au long du tracé, ce qui donne exactement le cercle de rayon 3 cm."
    ),
    tags: ["cercle_disque", "vocabulaire", "qcm"],
  },
  // ★1-★2 nus (03/11/2026) ; les objets ronds et les prénoms sont dans les « _ctx3 ».
  gabarit("cercle_vocabulaire_tpl_1", "cercle_vocabulaire", 2, "Le diamètre vaut deux fois le rayon.",
    ["cercle_disque", "vocabulaire", "template"], () => genRayonVersDiametre(false)),
  gabarit("cercle_vocabulaire_tpl_2", "cercle_vocabulaire", 2, "Le rayon est la moitié du diamètre.",
    ["cercle_disque", "vocabulaire", "template"], () => genDiametreVersRayon(false)),
  gabarit("cercle_vocabulaire_tpl_nommer", "cercle_vocabulaire", 1,
    "Rayon : du centre au cercle. Diamètre : passe par le centre. Corde : deux points du cercle.",
    ["cercle_disque", "vocabulaire", "template", "qcm"], () => genNommer(false)),
  // ★3 en situation : les objets ronds (roue, assiette, rond-point…), les prénoms.
  gabarit("cercle_vocabulaire_tpl_ctx3", "cercle_vocabulaire", 3, "Rayon = la moitié du diamètre ; diamètre = deux rayons.",
    ["cercle_disque", "vocabulaire", "template", "contexte"], () => pick([genRayonVersDiametre, genDiametreVersRayon, genNommer])(true)),

  // =========================
  // CERCLE_PROPORTIONNEL
  // =========================
  {
    kind: "fixed",
    id: "cercle_proportionnel_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_proportionnel",
    difficulty: 1,
    theme: "neutral",
    text: "Le diamètre d’un disque double. Que devient son tour ?",
    format: "qcm",
    choices: ["il double", "il ne change pas", "il augmente de 2 cm", "il est multiplié par 4"],
    expected: ["il double"],
    comparator: "mcq_exact",
    hint: "Le tour et le diamètre grandissent ensemble, dans le même rapport.",
    explanation: expl(
      "Le périmètre d’un disque est proportionnel à son diamètre : si le diamètre double, le tour double aussi."
    ),
    tags: ["cercle_disque", "proportionnalite", "qcm"],
  },
  {
    kind: "fixed",
    id: "cercle_proportionnel_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_proportionnel",
    difficulty: 2,
    theme: "neutral",
    text: "Complète le tableau : quel est le tour d’un disque de diamètre 3 m ?",
    format: "short",
    expected: ["9,42", "9.42", "9,42 m"],
    comparator: "number_equal",
    hint: "Un diamètre 3 fois plus grand donne un tour 3 fois plus grand.",
    explanation: expl(
      "Le tour est proportionnel au diamètre : 3 × 3,14 = 9,42 m. On n’a même pas besoin de la formule, seulement de la proportionnalité."
    ),
    tags: ["cercle_disque", "proportionnalite", "short", "canvas"],
    canvas: tableauTour([1, 3], 1, "m"),
  },
  {
    kind: "fixed",
    id: "cercle_proportionnel_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_proportionnel",
    difficulty: 2,
    theme: "neutral",
    text: "Divise le tour de n’importe quel disque par son diamètre. Que trouves-tu ?",
    format: "qcm",
    choices: [
      "toujours le même nombre, environ 3,14",
      "un nombre différent pour chaque disque",
      "toujours 2",
      "un nombre qui grandit avec le disque",
    ],
    expected: ["toujours le même nombre, environ 3,14"],
    comparator: "mcq_exact",
    hint: "C’est ce nombre qu’on appelle π.",
    explanation: expl(
      "Tour ÷ diamètre donne toujours le même nombre, quel que soit le disque : environ 3,14. Ce nombre s’appelle π. C’est exactement ce que veut dire « le tour est proportionnel au diamètre »."
    ),
    tags: ["cercle_disque", "proportionnalite", "qcm"],
  },
  {
    kind: "fixed",
    id: "cercle_proportionnel_canvas_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_proportionnel",
    difficulty: 2,
    theme: "neutral",
    text: "Complète le tableau : quel est le tour d’un disque de diamètre 4 cm ?",
    format: "short",
    expected: ["12,56", "12.56", "12,56 cm"],
    comparator: "number_equal",
    hint: "Le coefficient du tableau est toujours le même : environ 3,14.",
    explanation: expl(
      "On multiplie le diamètre par 3,14 : 4 × 3,14 = 12,56 cm. La colonne manquante se complète comme dans n’importe quel tableau de proportionnalité."
    ),
    tags: ["cercle_disque", "proportionnalite", "canvas"],
    canvas: tableauTour([1, 2, 3, 4], 3),
  },
  {
    kind: "fixed",
    id: "cercle_proportionnel_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_proportionnel",
    difficulty: 3,
    theme: "neutral",
    text: "Deux roues : l’une a un diamètre de 20 cm, l’autre de 60 cm. Le tour de la grande vaut…",
    format: "qcm",
    choices: [
      "3 fois le tour de la petite",
      "le même que la petite",
      "40 cm de plus que la petite",
      "9 fois le tour de la petite",
    ],
    expected: ["3 fois le tour de la petite"],
    comparator: "mcq_exact",
    hint: "60 ÷ 20 = 3.",
    explanation: expl(
      "Le diamètre est multiplié par 3, donc le tour aussi : la proportionnalité conserve le rapport. (Attention : c’est l’AIRE qui serait multipliée par 9.)"
    ),
    tags: ["cercle_disque", "proportionnalite", "qcm"],
  },
  {
    kind: "fixed",
    id: "cercle_proportionnel_fixed_5",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_proportionnel",
    difficulty: 3,
    theme: "neutral",
    text: "Un disque a un tour de 6,28 cm pour un diamètre de 2 cm. Quel diamètre donne un tour de 18,84 cm ?",
    format: "short",
    expected: ["6", "6 cm"],
    comparator: "number_equal",
    hint: "18,84 ÷ 6,28 = 3 : le tour est 3 fois plus grand.",
    explanation: expl(
      "Le tour est multiplié par 3 (6,28 × 3 = 18,84), donc le diamètre aussi : 2 × 3 = 6 cm."
    ),
    tags: ["cercle_disque", "proportionnalite", "short"],
  },
  {
    kind: "template",
    id: "cercle_proportionnel_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_proportionnel",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche par combien le diamètre est multiplié.",
    tags: ["cercle_disque", "proportionnalite", "template"],
    // ⭐ 06/10 : deux objets du même genre, un petit et un grand ; on cherche le
    // tour du grand, ou son diamètre à partir de son tour.
    generate: () => {
      const paire = pick([
        { petit: "une petite roue", grand: "une grande roue", u: "cm" as const, min: 10, max: 30 },
        { petit: "une petite assiette", grand: "un grand plat", u: "cm" as const, min: 10, max: 15 },
        { petit: "un petit cerceau", grand: "un grand cerceau", u: "cm" as const, min: 20, max: 30 },
        { petit: "un petit bassin", grand: "un grand bassin", u: "m" as const, min: 2, max: 5 },
        { petit: "un petit manège", grand: "un grand manège", u: "m" as const, min: 4, max: 6 },
        { petit: "une petite pizza", grand: "une pizza géante", u: "cm" as const, min: 15, max: 20 },
        { petit: "un petit tambour", grand: "une grosse caisse", u: "cm" as const, min: 15, max: 20 },
        { petit: "une petite horloge", grand: "une grande horloge", u: "cm" as const, min: 10, max: 25 },
      ]);
      const p = pick(PRENOMS);
      const d = randomInt(paire.min, paire.max);
      const k = randomInt(2, 4);
      const tour = Number((d * 3.14).toFixed(2));
      const grand = Number((d * k * 3.14).toFixed(2));
      const u = paire.u;
      const debut = pick([
        `${maj(paire.petit)} : diamètre ${d} ${u}, tour ${fr(tour)} ${u}.`,
        `${p.nom} mesure ${paire.petit} : diamètre ${d} ${u}, tour ${fr(tour)} ${u}.`,
        `Le tour ${dUn(paire.petit)} de diamètre ${d} ${u} vaut ${fr(tour)} ${u}.`,
      ]);
      if (Math.random() < 0.6) {
        const fin = pick([
          `Quel est le tour ${dUn(paire.grand)} de diamètre ${d * k} ${u} ?`,
          `${maj(paire.grand)} a un diamètre de ${d * k} ${u}. Combien mesure son tour ?`,
          `Sans formule : quel est le tour pour ${d * k} ${u} de diamètre ?`,
        ]);
        return {
          text: `${debut} ${fin}`,
          format: "short",
          expected: [`${fr(grand)} ${u}`, fr(grand)],
          comparator: "number_equal",
          explanation: expl(`Le diamètre est multiplié par ${k} (${d} × ${k} = ${d * k}), donc le tour aussi : ${fr(tour)} × ${k} = ${fr(grand)} ${u}.`),
          canvas: tableauTour([d, d * k], 1, u),
        };
      }
      const fin = pick([
        `${maj(paire.grand)} a un tour de ${fr(grand)} ${u}. Quel est son diamètre ?`,
        `Le tour ${dUn(paire.grand)} mesure ${fr(grand)} ${u}. Combien mesure son diamètre ?`,
      ]);
      return {
        text: `${debut} ${fin}`,
        format: "short",
        expected: [`${d * k} ${u}`, String(d * k)],
        comparator: "number_equal",
        explanation: expl(`Le tour est multiplié par ${k} (${fr(tour)} × ${k} = ${fr(grand)}), donc le diamètre aussi : ${d} × ${k} = ${d * k} ${u}.`),
        canvas: tableauTour([d, d * k], 1, u, 0),
      };
    },
  },
  gabarit("cercle_proportionnel_tpl_2", "cercle_proportionnel", 2,
    "Dans le tableau, on passe du diamètre au tour en multipliant par 3,14.",
    ["cercle_disque", "proportionnalite", "template"], () => genTableau(false)),
  gabarit("cercle_proportionnel_tpl_ctx3", "cercle_proportionnel", 3, "Dans le tableau, on passe du diamètre au tour en multipliant par 3,14.",
    ["cercle_disque", "proportionnalite", "template", "contexte"], () => genTableau(true)),

  // =========================
  // CERCLE_PERIMETRE
  // =========================
  {
    kind: "fixed",
    id: "cercle_perimetre_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_perimetre",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle est la formule du périmètre d’un disque de diamètre d ?",
    format: "qcm",
    choices: ["P = π × d", "P = 2 × d", "P = π × d × d", "P = d ÷ π"],
    expected: ["P = π × d"],
    comparator: "mcq_exact",
    hint: "Le tour vaut π fois le diamètre.",
    explanation: expl(
      "P = π × d. Comme le diamètre vaut deux rayons, on peut aussi écrire P = 2 × π × r."
    ),
    tags: ["cercle_disque", "formule", "qcm"],
  },
  {
    kind: "fixed",
    id: "cercle_perimetre_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_perimetre",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle formule donne le périmètre d’un disque à partir de son RAYON r ?",
    format: "qcm",
    choices: ["P = 2 × π × r", "P = π × r", "P = π × r × r", "P = 4 × r"],
    expected: ["P = 2 × π × r"],
    comparator: "mcq_exact",
    hint: "Il faut d’abord passer du rayon au diamètre.",
    explanation: expl(
      "d = 2 × r, donc P = π × d = π × 2 × r = 2 × π × r. Écrire P = π × r reviendrait à oublier la moitié du tour."
    ),
    tags: ["cercle_disque", "formule", "qcm"],
  },
  {
    kind: "fixed",
    id: "cercle_perimetre_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_perimetre",
    difficulty: 2,
    theme: "neutral",
    text: "Un disque a un diamètre de 10 cm. Calcule son périmètre (π ≈ 3,14).",
    format: "short",
    expected: ["31,4", "31.4", "31,4 cm"],
    comparator: "number_equal",
    hint: "P = π × d.",
    explanation: expl("P = π × d = 3,14 × 10 = 31,4 cm."),
    tags: ["cercle_disque", "calcul", "short"],
  },
  {
    kind: "fixed",
    id: "cercle_perimetre_canvas_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_perimetre",
    difficulty: 2,
    theme: "neutral",
    text: "Observe la figure. Calcule le périmètre de ce disque (π ≈ 3,14).",
    format: "short",
    expected: ["18,84", "18.84", "18,84 cm"],
    comparator: "number_equal",
    hint: "La figure donne le diamètre : P = π × d.",
    explanation: expl("P = π × d = 3,14 × 6 = 18,84 cm."),
    tags: ["cercle_disque", "calcul", "canvas"],
    canvas: cercleAvec("diametre", "6 cm"),
  },
  {
    kind: "fixed",
    id: "cercle_perimetre_canvas_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_perimetre",
    difficulty: 3,
    theme: "neutral",
    text: "Observe la figure : c’est le RAYON qui est donné. Calcule le périmètre (π ≈ 3,14).",
    format: "short",
    expected: ["31,4", "31.4", "31,4 cm"],
    comparator: "number_equal",
    hint: "Passe d’abord au diamètre : d = 2 × 5.",
    explanation: expl(
      "d = 2 × r = 2 × 5 = 10 cm, puis P = π × d = 3,14 × 10 = 31,4 cm. (Multiplier 3,14 par 5 donnerait 15,7 : la moitié du tour.)"
    ),
    tags: ["cercle_disque", "calcul", "canvas"],
    canvas: cercleAvec("rayon", "5 cm"),
  },
  {
    kind: "fixed",
    id: "cercle_perimetre_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_perimetre",
    difficulty: 3,
    theme: "neutral",
    text: "Un disque a un périmètre de 31,4 cm. Quel est son diamètre (π ≈ 3,14) ?",
    format: "short",
    expected: ["10", "10 cm"],
    comparator: "number_equal",
    hint: "On fait le calcul à l’envers : d = P ÷ π.",
    explanation: expl("d = P ÷ π = 31,4 ÷ 3,14 = 10 cm. Vérification : 3,14 × 10 = 31,4 cm."),
    tags: ["cercle_disque", "calcul", "short"],
  },
  {
    kind: "fixed",
    id: "cercle_perimetre_fixed_5",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_perimetre",
    difficulty: 3,
    theme: "neutral",
    text: "Un rond-point a un diamètre de 20 m. Quelle longueur parcourt-on en en faisant tout le tour (π ≈ 3,14) ?",
    format: "short",
    expected: ["62,8", "62.8", "62,8 m"],
    comparator: "number_equal",
    hint: "Faire le tour, c’est parcourir le périmètre.",
    explanation: expl("P = π × d = 3,14 × 20 = 62,8 m."),
    tags: ["cercle_disque", "probleme", "short"],
  },
  {
    kind: "template",
    id: "cercle_perimetre_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_perimetre",
    difficulty: 2,
    theme: "neutral",
    hint: "P = π × d, avec π ≈ 3,14.",
    tags: ["cercle_disque", "calcul", "template"],
    // ⭐ 03/11 : nu à ★2 (diamètre donné) ; objets ronds et prénoms dans le _ctx3.
    generate: () => perimetreDepuis("diametre", false),
  },
  gabarit("cercle_perimetre_tpl_ctx3", "cercle_perimetre", 3, "P = π × d, avec π ≈ 3,14.",
    ["cercle_disque", "calcul", "template", "contexte"], () => perimetreDepuis("diametre", true, true)),
  {
    kind: "template",
    id: "cercle_perimetre_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_perimetre",
    difficulty: 3,
    theme: "neutral",
    hint: "Le rayon d’abord, le diamètre ensuite : d = 2 × r.",
    tags: ["cercle_disque", "calcul", "template"],
    generate: () => perimetreDepuis("rayon"),
  },

  // =========================
  // CERCLE_DEFI
  // =========================
  {
    kind: "fixed",
    id: "cercle_defi_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_defi",
    difficulty: 3,
    theme: "neutral",
    text: "Une roue de vélo a un diamètre de 70 cm. Quelle distance parcourt le vélo en un tour de roue (π ≈ 3,14) ?",
    format: "short",
    expected: ["219,8", "219.8", "219,8 cm"],
    comparator: "number_equal",
    hint: "Un tour de roue = le périmètre de la roue.",
    explanation: expl(
      "P = π × d = 3,14 × 70 = 219,8 cm, soit environ 2,20 m à chaque tour de roue."
    ),
    tags: ["cercle_disque", "defi", "probleme"],
  },
  {
    kind: "fixed",
    id: "cercle_defi_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_defi",
    difficulty: 3,
    theme: "neutral",
    text: "Pourquoi utilise-t-on 3,14 et pas exactement 3 pour calculer un tour de disque ?",
    format: "qcm",
    choices: [
      "parce que le tour vaut un peu plus de 3 diamètres",
      "parce que le tour vaut exactement 3 diamètres",
      "parce que 3,14 est plus facile à multiplier",
      "parce que 3,14 dépend de la taille du disque",
    ],
    expected: ["parce que le tour vaut un peu plus de 3 diamètres"],
    comparator: "mcq_exact",
    hint: "Enroule une ficelle autour d’une boîte ronde, puis compare-la au diamètre.",
    explanation: expl(
      "En reportant le diamètre le long du tour, on en place 3 et il reste un petit morceau. Ce « 3 et un peu » est le nombre π, environ 3,14 — le même pour tous les disques."
    ),
    tags: ["cercle_disque", "defi", "qcm"],
  },
  {
    kind: "fixed",
    id: "cercle_defi_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Peut-on calculer le périmètre d’un disque si l’on connaît seulement son rayon ?",
    format: "qcm",
    choices: [
      "oui, car le diamètre se déduit du rayon",
      "non, il faut absolument mesurer le diamètre",
      "non, il faut aussi connaître l’aire",
      "oui, mais seulement si le rayon est un nombre entier",
    ],
    expected: ["oui, car le diamètre se déduit du rayon"],
    comparator: "mcq_exact",
    hint: "d = 2 × r.",
    explanation: expl(
      "Le rayon suffit : d = 2 × r, donc P = 2 × π × r. Un seul des deux, rayon ou diamètre, suffit toujours."
    ),
    tags: ["cercle_disque", "defi", "qcm"],
  },
  {
    kind: "fixed",
    id: "cercle_defi_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_defi",
    difficulty: 4,
    theme: "neutral",
    text: "À La Réunion, un bassin rond a un tour de 15,7 m. Quel est son rayon (π ≈ 3,14) ?",
    format: "short",
    expected: ["2,5", "2.5", "2,5 m"],
    comparator: "number_equal",
    hint: "Trouve d’abord le diamètre : d = P ÷ π.",
    explanation: expl(
      "d = 15,7 ÷ 3,14 = 5 m, puis r = 5 ÷ 2 = 2,5 m. Le rayon du bassin mesure 2,5 m."
    ),
    tags: ["cercle_disque", "defi", "probleme"],
  },
  {
    kind: "fixed",
    id: "cercle_defi_fixed_5",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Une piste est formée d’un carré de côté 10 m dont on a remplacé un côté par un demi-cercle de diamètre 10 m. Quel est le périmètre de la piste (π ≈ 3,14) ?",
    format: "short",
    expected: ["45,7", "45.7", "45,7 m"],
    comparator: "number_equal",
    hint: "Trois côtés droits, plus la moitié du tour d’un disque de diamètre 10 m.",
    explanation: expl(
      "Les trois côtés droits donnent 3 × 10 = 30 m. Le demi-cercle vaut la moitié du tour : (3,14 × 10) ÷ 2 = 31,4 ÷ 2 = 15,7 m. Périmètre total : 30 + 15,7 = 45,7 m."
    ),
    tags: ["cercle_disque", "defi", "figure_composee"],
  },
  {
    kind: "fixed",
    id: "cercle_defi_fixed_6",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_defi",
    difficulty: 5,
    theme: "neutral",
    // 08/10/2026 : question rendue précise (Frédéric).
    text: "Un disque a un diamètre de 20 cm. Son tour mesure 62,8 cm.\nCalcule tour ÷ diamètre.",
    format: "short",
    expected: ["3,14"],
    comparator: "number_equal",
    hint: "Calcule 62,8 ÷ 20.",
    explanation: expl(
      "62,8 ÷ 20 = 3,14. Pour tous les disques, petits ou grands, tour ÷ diamètre donne le même nombre : π ≈ 3,14."
    ),
    tags: ["cercle_disque", "defi", "raisonnement"],
  },
  // ⭐ LES DÉFIS AUSSI ONT LEUR GÉNÉRATEUR (règle d'or : dix variantes minimum
  // par micro, sinon l'élève retombe sur la même question en dix minutes).
  {
    kind: "template",
    id: "cercle_defi_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Un tour complet, c'est le périmètre du disque.",
    tags: ["cercle_disque", "defi", "template"],
    // ⭐ 06/10 : plusieurs tours, ou le chemin inverse (du tour au diamètre ou
    // au rayon, par une division) ; objets réels et prénoms.
    generate: () => {
      const p = pick(PRENOMS);
      const cas = randomInt(0, 1);
      if (cas === 0) {
        const roulants = [
          { nom: "une roue de vélo", sujet: "La roue", u: "cm" as const, dMin: 50, dMax: 70, verbe: "roule" },
          { nom: "une roue de trottinette", sujet: "La roue", u: "cm" as const, dMin: 12, dMax: 24, verbe: "roule" },
          { nom: "un cerceau", sujet: "Le cerceau", u: "cm" as const, dMin: 60, dMax: 90, verbe: "roule" },
          { nom: "un rond-point", sujet: "", u: "m" as const, dMin: 16, dMax: 40, verbe: "" },
          { nom: "une piste de cirque", sujet: "", u: "m" as const, dMin: 12, dMax: 14, verbe: "" },
          { nom: "un bassin rond", sujet: "", u: "m" as const, dMin: 3, dMax: 12, verbe: "" },
        ];
        const o = pick(roulants);
        const d = randomInt(o.dMin, o.dMax);
        // En cm, on reste sous 1 000 (pas d'espace des milliers dans ce fichier).
        const kMax = o.u === "cm" ? Math.max(2, Math.min(5, Math.floor(999 / (d * 3.14)))) : 5;
        const k = randomInt(2, kMax);
        const P = Number((d * 3.14).toFixed(2));
        const total = Number((P * k).toFixed(2));
        const t = o.verbe
          ? pick([
              `${p.nom} fait rouler ${o.nom} de diamètre ${d} ${o.u}. ${o.sujet} fait ${k} tours complets. Quelle distance parcourt-elle (π ≈ 3,14) ?`,
              `${maj(o.nom)} a un diamètre de ${d} ${o.u}. Quelle distance parcourt-${o.sujet === "Le cerceau" ? "il" : "elle"} en ${k} tours (π ≈ 3,14) ?`,
            ]).replace(/Le cerceau fait (\d+) tours complets\. Quelle distance parcourt-elle/, "Le cerceau fait $1 tours complets. Quelle distance parcourt-il")
          : pick([
              `${p.nom} fait ${k} fois le tour ${dUn(o.nom)} de diamètre ${d} ${o.u}. Quelle distance parcourt-${il(p)} (π ≈ 3,14) ?`,
              `${maj(o.nom)} a un diamètre de ${d} ${o.u}. ${p.nom} en fait ${k} fois le tour. Combien de mètres parcourt-${il(p)} (π ≈ 3,14) ?`,
            ]);
        return {
          text: t,
          format: "short",
          expected: [`${fr(total)} ${o.u}`, fr(total)],
          comparator: "number_equal",
          explanation: expl(`Un tour = le périmètre : 3,14 × ${d} = ${fr(P)} ${o.u}. Pour ${k} tours : ${fr(P)} × ${k} = ${fr(total)} ${o.u}.`),
          canvas: figureDonnee("diametre", `${d} ${o.u}`),
        };
      }
      // Du tour au diamètre ou au rayon : une division par 3,14 qui tombe juste.
      const o = pick(RONDS);
      const d = 2 * randomInt(Math.ceil(o.dMin / 2), Math.floor(o.dMax / 2));
      const P = Number((d * 3.14).toFixed(2));
      const veutRayon = Math.random() < 0.5;
      const t = pick([
        `${maj(o.nom)} a un tour de ${fr(P)} ${o.u}. Quel est son ${veutRayon ? "rayon" : "diamètre"} (π ≈ 3,14) ?`,
        `${p.nom} enroule une ficelle autour ${dUn(o.nom)} : il faut ${fr(P)} ${o.u}. Combien mesure son ${veutRayon ? "rayon" : "diamètre"} (π ≈ 3,14) ?`,
      ]);
      const r = veutRayon ? d / 2 : d;
      return {
        text: t,
        format: "short",
        expected: [`${r} ${o.u}`, String(r)],
        comparator: "number_equal",
        explanation: expl(`d = P ÷ π = ${fr(P)} ÷ 3,14 = ${d} ${o.u}.${veutRayon ? ` Puis r = d ÷ 2 = ${d / 2} ${o.u}.` : ""}`),
        canvas: figureDonnee(veutRayon ? "rayon" : "diametre"),
      };
    },
  },
  {
    // ⭐ 06/10/2026 : le ★3 du défi n'avait AUCUN générateur (2 items figés).
    // Comparer deux tours sans calcul (le diamètre suffit), ou dire si un ruban
    // suffit à faire le tour d'un objet rond.
    kind: "template",
    id: "cercle_defi_tpl_comparer",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Le tour est proportionnel au diamètre : le plus grand diamètre a le plus grand tour.",
    tags: ["cercle_disque", "defi", "template", "qcm"],
    generate: () => {
      const p = pick(PRENOMS);
      let q = pick(PRENOMS);
      while (q.nom === p.nom) q = pick(PRENOMS);
      if (Math.random() < 0.5) {
        const o = pick(RONDS.filter((x) => x.dMax - x.dMin >= 6));
        const r1 = randomInt(Math.ceil(o.dMin / 2), Math.floor(o.dMax / 2));
        let d2 = randomInt(o.dMin, o.dMax);
        while (d2 === 2 * r1) d2 = randomInt(o.dMin, o.dMax);
        const t = pick([
          `${p.nom} a ${o.nom} de rayon ${r1} ${o.u}, ${q.nom} de diamètre ${d2} ${o.u}. Qui a le plus grand tour ?`,
          `L’objet rond ${de(p.nom)} a un rayon de ${r1} ${o.u}, celui ${de(q.nom)} un diamètre de ${d2} ${o.u}. Qui a le plus grand tour ?`,
        ]);
        const gagnant = 2 * r1 > d2 ? p.nom : q.nom;
        // « la roue de vélo d’Inès », « l’assiette de Hugo », « le tambour de Léa ».
        const nu = o.nom.replace(/^une? /, "");
        const le = /^[aeiouhéè]/i.test(nu) ? "l’" : o.nom.startsWith("une") ? "la " : "le ";
        const ch = (x: string) => `${le}${nu} ${de(x)}`;
        return {
          text: t,
          format: "qcm",
          choices: shuffle([ch(p.nom), ch(q.nom), "les deux ont le même tour"]),
          expected: [ch(gagnant)],
          comparator: "mcq_exact",
          explanation: expl(`On compare les diamètres : ${r1} × 2 = ${2 * r1} ${o.u} contre ${d2} ${o.u}. Le plus grand diamètre donne le plus grand tour : ${ch(gagnant)}.`),
        };
      }
      const o = pick(RONDS.filter((x) => x.u === "cm"));
      const d = randomInt(o.dMin, o.dMax);
      const P = Number((d * 3.14).toFixed(2));
      // Un ruban un peu trop court ou un peu trop long (jamais égal).
      const ruban = Math.random() < 0.5 ? Math.floor(P) - randomInt(2, 8) : Math.ceil(P) + randomInt(2, 8);
      const ok = ruban > P;
      const t = pick([
        `${p.nom} fait le tour ${dUn(o.nom)} de diamètre ${d} cm avec un ruban de ${ruban} cm. Le ruban suffit-il (π ≈ 3,14) ?`,
        `Un ruban de ${ruban} cm suffit-il pour faire le tour ${dUn(o.nom)} de ${d} cm de diamètre (π ≈ 3,14) ?`,
      ]);
      const oui = `oui, le tour mesure ${fr(P)} cm`;
      const non = `non, le tour mesure ${fr(P)} cm`;
      return {
        text: t,
        format: "qcm",
        choices: shuffle([oui, non, `oui, le tour mesure ${fr(Number((d * 3).toFixed(2)))} cm`, `non, le tour mesure ${fr(Number((d * 6.28).toFixed(2)))} cm`]),
        expected: [ok ? oui : non],
        comparator: "mcq_exact",
        explanation: expl(`Le tour vaut 3,14 × ${d} = ${fr(P)} cm. Le ruban mesure ${ruban} cm : ${ok ? "c’est plus, il suffit" : "c’est moins, il est trop court"}.`),
        canvas: figureDonnee("diametre", `${d} cm`),
      };
    },
  },
  {
    kind: "template",
    id: "cercle_defi_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Le tour, c'est π × le DIAMÈTRE. Une figure composée : additionne chaque morceau de son bord.",
    tags: ["cercle_disque", "defi", "template"],
    // ⭐ 06/10 : la question ouverte à mots-clés (dont « 8 », « 2 cm ») devient
    // trois défis corrigeables : trouver l'erreur d'un camarade (QCM), le
    // périmètre d'une figure composée (demi-disque, piste de stade), et
    // « qui a raison ? » sur la proportionnalité.
    generate: () => {
      const p = pick(PRENOMS);
      let q = pick(PRENOMS);
      while (q.nom === p.nom) q = pick(PRENOMS);
      const cas = randomInt(0, 2);
      if (cas === 0) {
        const r = randomInt(2, 15);
        const faux = Number((r * 3.14).toFixed(2));
        const juste = Number((2 * r * 3.14).toFixed(2));
        const t = pick([
          `${p.nom} calcule le périmètre d’un disque de rayon ${r} cm et trouve ${fr(faux)} cm. Quelle est son erreur ?`,
          `Pour un cercle de rayon ${r} cm, ${p.nom} annonce un tour de ${fr(faux)} cm. Où s’est-${il(p)} trompé${p.f ? "e" : ""} ?`,
        ]);
        const bon = `${p.f ? "elle" : "il"} a multiplié 3,14 par le rayon au lieu du diamètre`;
        return {
          text: t,
          format: "qcm",
          choices: shuffle([
            bon,
            `${p.f ? "elle" : "il"} aurait dû prendre π = 3`,
            `${p.f ? "elle" : "il"} aurait dû diviser par 3,14`,
            "il n’y a pas d’erreur",
          ]),
          expected: [bon],
          comparator: "mcq_exact",
          explanation: expl(`${fr(faux)} = 3,14 × ${r} : c’est le rayon qui a été multiplié. Le diamètre vaut 2 × ${r} = ${2 * r} cm, donc P = 3,14 × ${2 * r} = ${fr(juste)} cm.`),
          canvas: figureDonnee("rayon", `${r} cm`),
        };
      }
      if (cas === 1) {
        if (Math.random() < 0.5) {
          const d = 2 * randomInt(2, 10);
          const P = Number((d * 3.14 / 2 + d).toFixed(2));
          const t = pick([
            `Une figure est un demi-disque : un demi-cercle de diamètre ${d} cm, fermé par ce diamètre. Calcule son périmètre (π ≈ 3,14).`,
            `${p.nom} découpe un demi-disque de diamètre ${d} cm. Quelle est la longueur de son bord (π ≈ 3,14) ?`,
          ]);
          return {
            text: t,
            format: "short",
            expected: [`${fr(P)} cm`, fr(P)],
            comparator: "number_equal",
            explanation: expl(`Le demi-cercle : 3,14 × ${d} ÷ 2 = ${fr(d * 3.14 / 2)} cm. On ajoute le diamètre droit : ${fr(d * 3.14 / 2)} + ${d} = ${fr(P)} cm.`),
          };
        }
        const L = 10 * randomInt(6, 12);
        const d = 2 * randomInt(20, 35);
        const P = Number((2 * L + d * 3.14).toFixed(2));
        const t = pick([
          `Une piste de stade a deux lignes droites de ${L} m et deux virages en demi-cercle de diamètre ${d} m. Quelle est la longueur d’un tour (π ≈ 3,14) ?`,
          `${p.nom} court un tour de piste : deux lignes droites de ${L} m et deux demi-cercles de diamètre ${d} m. Combien de mètres parcourt-${il(p)} (π ≈ 3,14) ?`,
        ]);
        return {
          text: t,
          format: "short",
          expected: [`${fr(P)} m`, fr(P)],
          comparator: "number_equal",
          explanation: expl(`Deux demi-cercles font un cercle entier : 3,14 × ${d} = ${fr(d * 3.14)} m. Deux lignes droites : 2 × ${L} = ${2 * L} m. Total : ${fr(d * 3.14)} + ${2 * L} = ${fr(P)} m.`),
        };
      }
      const k = randomInt(2, 4);
      const motK = ["", "", "double", "triple", "quadruple"][k];
      const vrai = `le tour est multiplié par ${k}`;
      // Celui qui a raison parle en premier une fois sur deux.
      const [a, b] = Math.random() < 0.5 ? [p, q] : [q, p];
      const dit = (x: Prenom) => (x === p ? `le tour est multiplié par ${k}` : `le tour est multiplié par ${k * k}`);
      const t = pick([
        `Le diamètre d’un disque ${motK}. ${a.nom} dit : « ${maj(dit(a))}. » ${b.nom} dit : « ${maj(dit(b))}. » Qui a raison ?`,
        `On multiplie le diamètre d’une roue par ${k}. ${a.nom} pense que ${dit(a)}, ${b.nom} pense que ${dit(b)}. Qui a raison ?`,
      ]);
      return {
        text: t,
        format: "qcm",
        choices: shuffle([p.nom, q.nom, "les deux", "aucun des deux"]),
        expected: [p.nom],
        comparator: "mcq_exact",
        explanation: expl(`Le tour est proportionnel au diamètre (P = π × d) : si d est multiplié par ${k}, ${vrai}. ${p.nom} a raison.`),
      };
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // CERCLE_ENSEMBLE — le cercle et le disque comme ENSEMBLES DE POINTS
  //
  // ⛔ OUVERTE LE 23/08/2026 — TROU DU PROGRAMME (6e-G-cercles-2) : « comprendre
  // la définition d'un cercle et celle d'un disque sous la forme d'ensembles de
  // points ». Le BO l'écrit ainsi : « le cercle de centre O et de rayon 2 cm est
  // l'ensemble des points situés à 2 cm de O ».
  //
  // ⭐ CE N'EST PAS DU VOCABULAIRE EN PLUS, C'EST UN CHANGEMENT DE NATURE. Tant
  // qu'on le dessine au compas, le cercle est une FORME — un rond. La définition
  // par ensemble de points en fait un CRITÈRE : pour savoir si un point est
  // dessus, on ne regarde plus le dessin, on mesure sa distance au centre. C'est
  // ce basculement qui rend possibles la médiatrice, le cercle circonscrit et
  // toute la géométrie de 5e.
  //
  // ⚠️ CERCLE ET DISQUE SE DISTINGUENT ICI, ET NULLE PART AILLEURS : le cercle
  // est l'ensemble des points situés à EXACTEMENT r du centre — le tour seul ;
  // le disque, ceux situés à AU PLUS r — le tour et tout l'intérieur. Confondre
  // les deux est l'erreur du chapitre, et elle a ses items.
  //
  // ⚠️ LA CORDE EST TRAITÉE ICI AUSSI. L'objectif 6e-G-cercles-1 la réclame
  // (« connaître les définitions d'un cercle, d'un disque, d'un rayon, d'un
  // diamètre, d'une CORDE ») et `cercle_vocabulaire` s'arrêtait au diamètre.
  // ═══════════════════════════════════════════════════════════════════════════
  {
    kind: "fixed",
    id: "cercle_ensemble_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_ensemble",
    difficulty: 3,
    theme: "neutral",
    text: "Le cercle de centre O et de rayon 3 cm, c'est l'ensemble des points situés…",
    format: "qcm",
    choices: [
      "à exactement 3 cm de O",
      "à 3 cm au plus de O",
      "à 3 cm au moins de O",
      "à exactement 6 cm de O",
    ],
    expected: ["à exactement 3 cm de O"],
    comparator: "mcq_exact",
    hint: "Le cercle est le tour seul, pas ce qu'il y a dedans.",
    explanation: expl(
      "Le cercle de centre O et de rayon 3 cm est l'ensemble des points situés à EXACTEMENT 3 cm de O : ni plus près, ni plus loin. « À 3 cm au plus » décrirait le DISQUE, qui comprend l'intérieur ; « à 3 cm au moins » décrirait tout l'extérieur ; et 6 cm est le diamètre, pas le rayon."
    ),
    tags: ["cercle_disque", "ensemble", "qcm"],
  },
  {
    kind: "fixed",
    id: "cercle_ensemble_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_ensemble",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle est la différence entre le cercle et le disque de centre O et de rayon 4 cm ?",
    format: "qcm",
    choices: [
      "le cercle est le tour seul, le disque comprend aussi l'intérieur",
      "le disque est le tour seul, le cercle comprend aussi l'intérieur",
      "il n'y en a aucune, ce sont deux mots pour la même chose",
      "le disque a un rayon deux fois plus grand",
    ],
    expected: ["le cercle est le tour seul, le disque comprend aussi l'intérieur"],
    comparator: "mcq_exact",
    hint: "Pense à une pièce de monnaie et à son contour.",
    explanation: expl(
      "Le cercle est l'ensemble des points à exactement 4 cm de O : c'est une ligne, le tour. Le disque est l'ensemble des points à 4 cm AU PLUS de O : c'est une surface, le tour ET tout l'intérieur. Une pièce de monnaie est un disque ; le trait qu'on dessine autour est un cercle. C'est pour cela qu'on parle du PÉRIMÈTRE du disque et de l'AIRE du disque, mais jamais de l'aire d'un cercle."
    ),
    tags: ["cercle_disque", "ensemble", "piege", "canvas", "qcm"],
    canvas: cercleDesPoints([], { disque: true }),
  },
  {
    kind: "fixed",
    id: "cercle_ensemble_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_ensemble",
    difficulty: 2,
    theme: "neutral",
    text: "OM = 5 cm. M est-il sur le cercle de centre O de rayon 5 cm ?",
    format: "qcm",
    choices: [
      "oui, car OM = 5 cm",
      "non, on ne sait pas où est M",
      "non, M est dans le disque",
      "seulement si [OM] est tracé",
    ],
    expected: ["oui, car OM = 5 cm"],
    comparator: "mcq_exact",
    hint: "La seule chose qui compte est la distance à O.",
    explanation: expl(
      "Oui. Appartenir au cercle de centre O et de rayon 5 cm, c'est exactement être à 5 cm de O — rien d'autre n'est demandé. Peu importe la direction dans laquelle se trouve M : il y a une infinité de points à 5 cm de O, et ils forment justement ce cercle. C'est toute la force de la définition par ensemble de points : elle donne un CRITÈRE qu'on peut vérifier au compas, sans regarder le dessin."
    ),
    tags: ["cercle_disque", "ensemble", "canvas", "qcm"],
    // 07/11 : M n’est plus dessiné, la figure donnait la réponse.
    canvas: cercleDesPoints([]),
  },
  {
    kind: "fixed",
    id: "cercle_ensemble_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_ensemble",
    difficulty: 4,
    theme: "neutral",
    text: "On considère le disque de centre O et de rayon 5 cm. Où se trouve le point N tel que ON = 4 cm ?",
    format: "qcm",
    choices: [
      "à l'intérieur du disque, mais pas sur le cercle",
      "sur le cercle",
      "à l'extérieur du disque",
      "au centre du disque",
    ],
    expected: ["à l'intérieur du disque, mais pas sur le cercle"],
    comparator: "mcq_exact",
    hint: "Compare 4 cm au rayon 5 cm.",
    explanation: expl(
      "4 cm est plus petit que 5 cm : N est donc à moins de 5 cm de O. Il appartient bien au disque, qui rassemble tous les points à 5 cm AU PLUS, mais pas au cercle, qui exige exactement 5 cm. N n'est pas non plus au centre, ce qui demanderait ON = 0."
    ),
    tags: ["cercle_disque", "ensemble", "canvas", "qcm"],
    // 07/11 : N n’est plus dessiné, la figure donnait la réponse.
    canvas: cercleDesPoints([], { disque: true }),
  },
  {
    kind: "fixed",
    id: "cercle_ensemble_fixed_5",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_ensemble",
    difficulty: 3,
    theme: "neutral",
    text: "Sur la figure, [AB] joint deux points du cercle sans passer par le centre O. Comment appelle-t-on ce segment ?",
    format: "qcm",
    choices: ["une corde", "un diamètre", "un rayon", "un arc"],
    expected: ["une corde"],
    comparator: "mcq_exact",
    hint: "Un diamètre passerait par O ; un arc serait courbe.",
    explanation: expl(
      "Un segment qui joint deux points d'un cercle s'appelle une CORDE. Le diamètre est la corde particulière qui passe par le centre — c'est la plus longue de toutes. L'arc, lui, n'est pas un segment : c'est la portion de cercle entre les deux points, donc une ligne courbe. Et le rayon joint le centre à un point du cercle."
    ),
    tags: ["cercle_disque", "ensemble", "corde", "canvas", "qcm"],
    canvas: cercleAvecCorde(),
  },
  {
    kind: "template",
    id: "cercle_ensemble_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_ensemble",
    difficulty: 3,
    theme: "neutral",
    hint: "Compare la distance donnée au rayon.",
    tags: ["cercle_disque", "ensemble", "template"],
    // ⭐ 06/10 : centre et point aux noms tirés au sort, prénoms, tournures ; la
    // figure porte les mêmes lettres et la même distance que l'énoncé.
    generate: () => {
      const rayon = randomInt(3, 9);
      const cas = randomInt(0, 2);
      const distance = cas === 0 ? rayon : cas === 1 ? randomInt(1, rayon - 1) : rayon + randomInt(1, 4);
      const bonne =
        cas === 0
          ? "sur le cercle"
          : cas === 1
            ? "à l'intérieur du disque, mais pas sur le cercle"
            : "à l'extérieur du disque";
      const [O, P] = lettres(2);
      const pr = pick(PRENOMS);
      const t = pick([
        `Un cercle a pour centre ${O} et pour rayon ${rayon} cm. Un point ${P} vérifie ${O}${P} = ${distance} cm. Où se trouve ${P} ?`,
        `${pr.nom} trace le cercle de centre ${O}, de rayon ${rayon} cm. ${maj(il(pr))} place ${P} à ${distance} cm de ${O}. Où est ${P} ?`,
        `On considère le cercle de centre ${O} et de rayon ${rayon} cm. Le point ${P} est à ${distance} cm de ${O}. Où se trouve-t-il ?`,
        `${O}${P} = ${distance} cm. Le cercle de centre ${O} a un rayon de ${rayon} cm. Où est le point ${P} ?`,
        `${pr.nom} pique son compas en ${O}, écarté de ${rayon} cm. ${maj(il(pr))} trace un cercle. ${P} est à ${distance} cm de ${O}. Où est ${P} ?`,
        `Le disque de centre ${O} a un rayon de ${rayon} cm. Le point ${P} est à ${distance} cm de ${O}. Où est ${P} ?`,
        `Trace un cercle de centre ${O}, de rayon ${rayon} cm. Place ${P} avec ${O}${P} = ${distance} cm. Où est ${P} ?`,
        `${pr.nom} dessine un disque de centre ${O}, de rayon ${rayon} cm. ${O}${P} = ${distance} cm. Où se trouve ${P} ?`,
      ]);

      return {
        text: t,
        format: "qcm",
        choices: [
          "sur le cercle",
          "à l'intérieur du disque, mais pas sur le cercle",
          "à l'extérieur du disque",
          "au centre du cercle",
        ],
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: expl(
          `On compare la distance au rayon : ${distance} cm ${
            cas === 0
              ? `est égal au rayon ${rayon} cm, donc ${P} est à exactement ${rayon} cm de ${O} : il est SUR le cercle`
              : cas === 1
                ? `est plus petit que le rayon ${rayon} cm, donc ${P} est trop près de ${O} pour être sur le cercle : il est à l'intérieur du disque`
                : `est plus grand que le rayon ${rayon} cm, donc ${P} est trop loin de ${O} : il est à l'extérieur du disque`
          }. Seule la distance à ${O} compte, jamais la direction.`
        ),
        // 07/11 : le rayon seul ; le point dessiné donnait la réponse.
        canvas: figureRayonSeul(O, rayon, "cm"),
      };
    },
  },
  {
    kind: "template",
    id: "cercle_ensemble_tpl_ouverte",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_ensemble",
    difficulty: 5,
    theme: "neutral",
    hint: "Seule la DISTANCE au centre compte. Un point du cercle est aussi dans le disque.",
    tags: ["cercle_disque", "ensemble", "template", "qui_a_raison"],
    // ⭐ 06/10 : la question ouverte à mots-clés (dont « 2 cm ») devient un
    // « Qui a raison ? » : deux camarades affirment où est un point ; on tranche
    // en comparant sa distance au rayon. Piège fin : un point SUR le cercle est
    // aussi DANS le disque — les deux peuvent avoir raison.
    generate: () => {
      const [O, M] = lettres(2);
      const p = pick(PRENOMS);
      let q = pick(PRENOMS);
      while (q.nom === p.nom) q = pick(PRENOMS);
      const r = randomInt(3, 9);
      const pos = randomInt(0, 2);
      const x = pos === 0 ? r : pos === 1 ? randomInt(1, r - 1) : r + randomInt(1, 4);
      const AFF = [
        { s: `${M} est sur le cercle`, vrai: x === r },
        { s: `${M} est dans le disque`, vrai: x <= r },
        { s: `${M} est à l’extérieur du disque`, vrai: x > r },
        { s: `${M} est à l’intérieur du disque, mais pas sur le cercle`, vrai: x < r },
        { s: "on ne peut pas savoir, ça dépend de la direction", vrai: false },
      ];
      const vraies = shuffle(AFF.filter((a) => a.vrai));
      const fausses = shuffle(AFF.filter((a) => !a.vrai));
      const voulu = Math.random();
      // Une vraie et une fausse le plus souvent ; parfois deux vraies, parfois deux fausses.
      const [sa, sb] =
        voulu < 0.2 && vraies.length >= 2 ? [vraies[0], vraies[1]] : voulu > 0.85 ? [fausses[0], fausses[1]] : shuffle([vraies[0], fausses[0]]);
      const juste = sa.vrai && sb.vrai ? "les deux" : sa.vrai ? p.nom : sb.vrai ? q.nom : "aucun des deux";
      const t = pick([
        `Le cercle de centre ${O} a pour rayon ${r} cm, et ${O}${M} = ${x} cm. ${p.nom} dit : « ${maj(sa.s)}. » ${q.nom} dit : « ${maj(sb.s)}. » Qui a raison ?`,
        `${O}${M} = ${x} cm. On trace le cercle de centre ${O} et de rayon ${r} cm. ${p.nom} affirme : « ${maj(sa.s)}. » ${q.nom} répond : « ${maj(sb.s)}. » Qui a raison ?`,
      ]);
      return {
        text: t,
        format: "qcm",
        choices: shuffle([p.nom, q.nom, "les deux", "aucun des deux"]),
        expected: [juste],
        comparator: "mcq_exact",
        explanation: expl(
          `On compare ${O}${M} = ${x} cm au rayon ${r} cm : ${
            x === r ? `c’est égal, ${M} est SUR le cercle — donc aussi dans le disque, qui contient son bord` : x < r ? `c’est plus petit, ${M} est à l’intérieur du disque, pas sur le cercle` : `c’est plus grand, ${M} est à l’extérieur du disque`
          }. La direction ne compte jamais.`,
        ),
        canvas: figureRayonSeul(O, r, "cm"),
      };
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // CERCLE_DISTANCE — les problèmes de distances à un point
  //
  // ⛔ OUVERTE LE 23/08/2026 — TROU DU PROGRAMME (6e-G-cercles-3) : « résoudre
  // des problèmes mettant en jeu des distances à un point ». L'exemple de
  // réussite du BO est la chèvre attachée à une corde de 8 m, dont on demande de
  // hachurer la zone de broutage.
  //
  // ⭐ C'EST LA DÉFINITION PRÉCÉDENTE, MISE AU TRAVAIL. « Les points à moins de
  // 8 m du piquet » n'a l'air de rien tant qu'on ne l'a pas reconnu : c'est un
  // DISQUE de rayon 8 m. Le chapitre sert à ça — traduire une contrainte de
  // distance en une figure, puis lire la réponse sur la figure.
  //
  // ⚠️ LA CORDE DONNE UN DISQUE, PAS UN CERCLE : la chèvre peut brouter partout
  // où la corde n'est pas tendue, donc à 8 m AU PLUS. Répondre « un cercle »,
  // c'est ne lui laisser que le tour — l'erreur exacte que le BO vise.
  // ═══════════════════════════════════════════════════════════════════════════
  {
    kind: "fixed",
    id: "cercle_distance_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_distance",
    difficulty: 3,
    theme: "neutral",
    text: "Une chèvre est attachée à un piquet par une corde de 8 m. Quelle est la forme de la zone où elle peut brouter ?",
    format: "qcm",
    choices: [
      "un disque de rayon 8 m",
      "un cercle de rayon 8 m",
      "un disque de rayon 16 m",
      "un carré de 8 m de côté",
    ],
    expected: ["un disque de rayon 8 m"],
    comparator: "mcq_exact",
    hint: "La corde peut aussi être détendue.",
    explanation: expl(
      "La chèvre peut aller partout où sa distance au piquet ne dépasse pas 8 m — corde tendue, mais aussi corde détendue. La zone est donc l'ensemble des points situés à 8 m AU PLUS du piquet : un DISQUE de rayon 8 m. Répondre « un cercle » ne lui laisserait que le tour, corde toujours tendue, ce qui n'a aucun sens pour brouter. Et 16 m serait le diamètre, pas le rayon."
    ),
    // 07/11 : plus de figure, le disque colorié donnait la réponse.
    tags: ["cercle_disque", "distance", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "cercle_distance_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_distance",
    difficulty: 3,
    theme: "neutral",
    text: "Une chèvre est attachée à un piquet par une corde de 8 m. Un arbre est à 9 m du piquet. Peut-elle l'atteindre ?",
    format: "qcm",
    choices: [
      "non, car 9 m dépasse la longueur de la corde",
      "oui, si elle tire bien sur la corde",
      "oui, car 9 m est proche de 8 m",
      "on ne peut pas savoir sans connaître la direction",
    ],
    expected: ["non, car 9 m dépasse la longueur de la corde"],
    comparator: "mcq_exact",
    hint: "Compare 9 m au rayon de la zone.",
    explanation: expl(
      "La zone de broutage est le disque de rayon 8 m. L'arbre est à 9 m, donc plus loin que 8 m : il est en dehors du disque, et la chèvre ne peut pas l'atteindre. La direction n'y change rien — la contrainte ne porte que sur la distance au piquet."
    ),
    tags: ["cercle_disque", "distance", "qcm"],
  },
  {
    kind: "fixed",
    id: "cercle_distance_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_distance",
    difficulty: 5,
    theme: "neutral",
    text: "On cherche les points situés à la fois à 3 cm du point A et à 4 cm du point B, avec AB = 5 cm. Combien y en a-t-il ?",
    format: "qcm",
    choices: ["2", "1", "aucun", "une infinité"],
    expected: ["2"],
    comparator: "mcq_exact",
    hint: "Trace les deux cercles : où se coupent-ils ?",
    explanation: expl(
      "Les points à 3 cm de A forment le cercle de centre A et de rayon 3 cm ; ceux à 4 cm de B, le cercle de centre B et de rayon 4 cm. Les points cherchés sont sur les DEUX : ce sont les points d'intersection des deux cercles. Comme 5 cm est plus petit que 3 + 4 = 7 cm et plus grand que 4 − 3 = 1 cm, les cercles se coupent en DEUX points. C'est exactement la méthode pour construire un triangle dont on connaît les trois côtés."
    ),
    tags: ["cercle_disque", "distance", "construction", "qcm"],
  },
  {
    kind: "fixed",
    id: "cercle_distance_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_distance",
    difficulty: 4,
    theme: "reunion",
    text: "Une borne de secours couvre tout ce qui est à moins de 500 m d'elle. Une case est à 500 m exactement. Est-elle couverte ?",
    format: "qcm",
    choices: [
      "non : « à moins de 500 m » exclut la distance 500 m elle-même",
      "oui, car 500 m est la portée annoncée",
      "oui, car la borne couvre un disque de rayon 500 m",
      "on ne peut pas savoir sans connaître la direction",
    ],
    expected: ["non : « à moins de 500 m » exclut la distance 500 m elle-même"],
    comparator: "mcq_exact",
    hint: "Lis très précisément : « à moins de » ou « à 500 m au plus » ?",
    explanation: expl(
      "« À moins de 500 m » veut dire strictement moins : la case, qui est à 500 m tout juste, n'est pas couverte. Si l'énoncé avait dit « à 500 m au plus », elle l'aurait été. En géométrie comme en droit, la frontière appartient à l'un ou à l'autre selon la formulation — c'est la différence entre le disque avec son bord et le disque sans son bord."
    ),
    tags: ["cercle_disque", "distance", "974", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "cercle_distance_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_distance",
    difficulty: 4,
    theme: "neutral",
    hint: "Traduis la contrainte de distance en disque, puis compare.",
    tags: ["cercle_disque", "distance", "template"],
    // ⭐ 06/10 : plus d'objets, de lieux, de lettres et de tournures ; le cas
    // limite « à N m au plus » et un lieu à N m pile (il est concerné).
    generate: () => {
      const [C, M] = lettres(2);
      const pr = pick(PRENOMS);
      const objets = [
        { quoi: "un arroseur", placé: "placé", verbe: "arroser", lieux: [["le massif", "arrosé"], ["le potager", "arrosé"], ["la pelouse", "arrosée"], ["le rosier", "arrosé"]], min: 3, max: 12 },
        { quoi: "un lampadaire", placé: "placé", verbe: "éclairer", lieux: [["le banc", "éclairé"], ["l’allée", "éclairée"], ["la fontaine", "éclairée"]], min: 5, max: 15 },
        { quoi: "une borne wifi", placé: "placée", verbe: "couvrir", lieux: [["la salle de jeux", "couverte"], ["le bureau", "couvert"], ["la chambre", "couverte"]], min: 8, max: 25 },
        { quoi: "un chien", placé: "attaché", verbe: "atteindre", lieux: [["la gamelle", "atteinte"], ["l’os", "atteint"], ["la balle", "atteinte"]], min: 2, max: 6 },
        { quoi: "une chèvre", placé: "attachée", verbe: "atteindre", lieux: [["le buisson", "atteint"], ["la haie", "atteinte"], ["le seau d’eau", "atteint"]], min: 3, max: 10 },
        { quoi: "un phare", placé: "placé", verbe: "éclairer", lieux: [["le bateau", "éclairé"], ["la bouée", "éclairée"]], min: 15, max: 30 },
        { quoi: "un haut-parleur", placé: "placé", verbe: "se faire entendre de", lieux: [["la tente", "concernée"], ["le stand", "concerné"]], min: 10, max: 30 },
      ];
      const o = pick(objets);
      const [lieu, part] = pick(o.lieux);
      const portee = randomInt(o.min, o.max);
      const cas = randomInt(0, 4);
      // Hors du disque, mais pas trop loin : le point reste dans la figure.
      const distance = cas <= 1 ? randomInt(1, portee - 1) : cas <= 3 ? portee + randomInt(1, Math.max(1, Math.floor(portee / 2))) : portee;
      const dedans = distance <= portee;
      const fem = /e$/.test(part);
      const nu = o.quoi;
      const debut =
        o.quoi === "un phare" || Math.random() < 0.5
          ? `${maj(o.quoi)} ${o.placé} en ${C} peut ${o.verbe} tout ce qui se trouve à ${portee} m au plus.`
          : `${pr.nom} ${/chien|chèvre/.test(nu) ? "attache" : "installe"} ${nu} en ${C}. ${o.quoi.startsWith("une") ? "Elle" : "Il"} peut ${o.verbe} tout ce qui est à ${portee} m au plus de ${C}.`;
      const t = `${debut} ${maj(lieu)} est en ${M}, à ${distance} m de ${C}. Est-${fem ? "elle" : "il"} ${part} ?`;
      const oui = `oui, ${M} est dans le disque de centre ${C} et de rayon ${portee} m`;
      const non = `non, ${M} est en dehors du disque de centre ${C} et de rayon ${portee} m`;
      return {
        text: t,
        format: "qcm",
        choices: shuffle([oui, non, "oui, mais seulement dans la bonne direction", "on ne peut pas savoir sans la forme du terrain"]),
        expected: [dedans ? oui : non],
        comparator: "mcq_exact",
        explanation: expl(
          `La zone est l'ensemble des points situés à ${portee} m au plus de ${C} : le disque de centre ${C} et de rayon ${portee} m. On compare ${distance} m à ${portee} m — ${
            distance === portee ? "c'est égal : « au plus » inclut le bord, le point est concerné" : distance < portee ? "c'est plus petit, le point est dans la zone" : "c'est plus grand, le point est hors de la zone"
          }. La direction n'intervient jamais : seule la distance à ${C} compte.`,
        ),
        // 07/11 : la zone et son rayon ; le point dessiné donnait la réponse.
        canvas: figureRayonSeul(C, portee, "m", true),
      };
    },
  },
  {
    kind: "template",
    id: "cercle_distance_tpl_ouverte",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_distance",
    difficulty: 5,
    theme: "neutral",
    hint: "Chaque condition de distance donne un cercle. Les points cherchés sont là où les deux cercles se coupent.",
    tags: ["cercle_disque", "distance", "template", "deux_cercles"],
    // ⭐ 06/10 : la question ouverte à mots-clés (dont « 8 ») devient un
    // problème à deux cercles : combien de points sont à a de A ET à b de B ?
    // On trace (ou on raisonne) : deux, un seul, ou aucun.
    generate: () => {
      const [A, B] = lettres(2);
      const p = pick(PRENOMS);
      const a = randomInt(2, 7);
      const b = randomInt(2, 7);
      const cas = randomInt(0, 3);
      // Deux points (le plus souvent), un seul (cercles tangents), aucun (trop loin).
      const c = cas <= 1 ? randomInt(Math.abs(a - b) + 1, a + b - 1) : cas === 2 ? a + b : a + b + randomInt(1, 4);
      const n = c === a + b ? 1 : c > a + b ? 0 : 2;
      const enTresor = Math.random() < 0.5;
      const t = enTresor
        ? pick([
            `Sur la carte ${de(p.nom)}, le trésor est à ${a} m de l’arbre ${A} et à ${b} m du rocher ${B}. ${A}${B} = ${c} m. Combien d’endroits possibles pour le trésor ?`,
            `${p.nom} cherche un trésor caché à ${a} m du puits ${A} et à ${b} m du chêne ${B}, qui sont à ${c} m l’un de l’autre. Combien d’endroits conviennent ?`,
            `Un trésor est à ${a} m de l’arbre ${A} et à ${b} m du rocher ${B}. ${A}${B} = ${c} m. Combien de places sont possibles ?`,
            `${A}${B} = ${c} m. Le trésor est à ${a} m du puits ${A} et à ${b} m du chêne ${B}. Combien d’endroits possibles ?`,
            `Trésor : à ${a} m du puits ${A}, à ${b} m du rocher ${B}. ${A}${B} = ${c} m. Combien de cachettes possibles ?`,
          ])
        : pick([
            `On cherche les points situés à ${a} cm de ${A} et à ${b} cm de ${B}, avec ${A}${B} = ${c} cm. Combien y en a-t-il ?`,
            `${A}${B} = ${c} cm. Combien de points sont à la fois à ${a} cm de ${A} et à ${b} cm de ${B} ?`,
            `Cherche les points à ${a} cm de ${A} et à ${b} cm de ${B}. ${A}${B} = ${c} cm. Combien en trouves-tu ?`,
            `Un point est à ${a} cm de ${A} et à ${b} cm de ${B}, avec ${A}${B} = ${c} cm. Combien de places sont possibles ?`,
            `Avec ${A}${B} = ${c} cm, combien de points sont à ${a} cm de ${A} et à ${b} cm de ${B} ?`,
            `${A}${B} = ${c} cm. Les points à ${a} cm de ${A} et à ${b} cm de ${B} : combien y en a-t-il ?`,
            `On trace le cercle de centre ${A} et de rayon ${a} cm, puis celui de centre ${B} et de rayon ${b} cm. ${A}${B} = ${c} cm. Combien de points communs ?`,
            `Deux cercles : centre ${A} et de rayon ${a} cm, centre ${B} et de rayon ${b} cm. ${A}${B} = ${c} cm. En combien de points se coupent-ils ?`,
            `${p.nom} trace le cercle de centre ${A} et de rayon ${a} cm, puis celui de centre ${B} et de rayon ${b} cm, avec ${A}${B} = ${c} cm. En combien de points se coupent-ils ?`,
          ]);
      const rep = ["aucun", "un seul", "deux"][n];
      const u = enTresor ? "m" : "cm";
      return {
        text: t,
        format: "qcm",
        choices: shuffle(["aucun", "un seul", "deux", "une infinité"]),
        expected: [rep],
        comparator: "mcq_exact",
        explanation: expl(
          `Les points à ${a} ${u} de ${A} forment le cercle de centre ${A} et de rayon ${a} ${u} ; ceux à ${b} ${u} de ${B}, le cercle de centre ${B} et de rayon ${b} ${u}. On compare ${A}${B} = ${c} ${u} à ${a} + ${b} = ${a + b} ${u} : ${
            n === 2 ? "c’est plus petit, les cercles se coupent en deux points" : n === 1 ? "c’est égal, les cercles se touchent en un seul point" : "c’est plus grand, les cercles ne se touchent pas : aucun point"
          }.`,
        ),
      };
    },
  },
  {
    // ⭐ 06/10/2026 : le ★3 de cette micro n'avait AUCUN générateur (2 items
    // figés). L'exemple du BO : l'animal attaché broute un DISQUE, pas un cercle.
    kind: "template",
    id: "cercle_distance_tpl_zone",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_distance",
    difficulty: 3,
    theme: "neutral",
    hint: "L'animal peut aller PARTOUT à la longueur de la corde au plus : le tour ET l'intérieur.",
    tags: ["cercle_disque", "distance", "template", "qcm"],
    generate: () => {
      const [P] = lettres(1);
      const pr = pick(PRENOMS);
      const animal = pick([
        { nom: "une chèvre", verbe: "brouter" },
        { nom: "un poney", verbe: "brouter" },
        { nom: "un âne", verbe: "brouter" },
        { nom: "une vache", verbe: "brouter" },
        { nom: "un chien", verbe: "se promener" },
        { nom: "un mouton", verbe: "brouter" },
      ]);
      const L = randomInt(3, 12);
      const pron = animal.nom.startsWith("une") ? "elle" : "il";
      const intro = pick([
        `${maj(animal.nom)} est attaché${pron === "elle" ? "e" : ""} au piquet ${P} par une corde de ${L} m.`,
        `${pr.nom} attache ${animal.nom} au piquet ${P} avec une corde de ${L} m.`,
      ]);
      if (Math.random() < 0.6) {
        const t = `${intro} Où peut-${pron} ${animal.verbe} ?`;
        const bon = `dans le disque de centre ${P} et de rayon ${L} m`;
        return {
          text: t,
          format: "qcm",
          choices: shuffle([bon, `sur le cercle de centre ${P} et de rayon ${L} m`, `dans le disque de centre ${P} et de rayon ${2 * L} m`, `dans un carré de côté ${L} m`]),
          expected: [bon],
          comparator: "mcq_exact",
          // 07/11 : le disque colorié donnait la réponse. 14/11 : le cercle seul, corde = rayon, rien de colorié.
          canvas: figureCercle(P, [{ id: "_1", angle: randomInt(20, 160) }], [{ kind: "rayon", from: P, to: "_1", label: `${L} m` }]),
          explanation: expl(`L'animal va partout où sa distance à ${P} est de ${L} m au plus : corde tendue, il est sur le cercle ; corde détendue, il est à l'intérieur. La zone est le DISQUE de centre ${P} et de rayon ${L} m.`),
        };
      }
      const t = `${intro} Quelle est la plus grande distance entre deux points de sa zone ?`;
      return {
        text: t,
        format: "short",
        expected: [`${2 * L} m`, String(2 * L)],
        comparator: "number_equal",
        explanation: expl(`La zone est le disque de rayon ${L} m. Les deux points les plus éloignés sont aux deux bouts d'un diamètre : 2 × ${L} = ${2 * L} m.`),
        canvas: figureCercle(P, [{ id: "_1", angle: randomInt(20, 160) }], [{ kind: "rayon", from: P, to: "_1", label: `${L} m` }], { disque: true }),
      };
    },
  },

  // =========================
  // ⭐ 07/11/2026 — GABARITS « À PLUSIEURS FAÇONS » : une quarantaine de phrases par étoile.
  // =========================
  gabarit("cercle_vocabulaire_tpl_def", "cercle_vocabulaire", 1, "Rayon : du centre au cercle. Diamètre : passe par le centre. Corde : deux points du cercle.", ["cercle_disque", "vocabulaire", "template", "qcm"], genVocDef),
  gabarit("cercle_vocabulaire_tpl_vrai_faux", "cercle_vocabulaire", 1, "Le diamètre vaut deux rayons et passe par le centre.", ["cercle_disque", "vocabulaire", "template", "qcm"], genVocVF),
  gabarit("cercle_vocabulaire_tpl_lire", "cercle_vocabulaire", 1, "Regarde si le segment part du centre, ou s’il passe par le centre.", ["cercle_disque", "vocabulaire", "template", "canvas"], genVocLire),
  gabarit("cercle_vocabulaire_tpl_compter", "cercle_vocabulaire", 1, "Rayon : du centre au cercle. Diamètre : d’un bord à l’autre, par le centre.", ["cercle_disque", "vocabulaire", "template", "canvas"], genVocCompter),
  gabarit("cercle_vocabulaire_tpl_calcul", "cercle_vocabulaire", 1, "Le diamètre vaut deux rayons.", ["cercle_disque", "vocabulaire", "template"], genVocCalc1),
  gabarit("cercle_vocabulaire_tpl_outil", "cercle_vocabulaire", 1, "L’écart du compas est le rayon.", ["cercle_disque", "vocabulaire", "template"], genVocOutil),
  gabarit("cercle_vocabulaire_tpl_corde", "cercle_vocabulaire", 2, "La plus longue corde est le diamètre.", ["cercle_disque", "vocabulaire", "template", "corde"], genVocCorde),
  gabarit("cercle_vocabulaire_tpl_egal", "cercle_vocabulaire", 2, "Tous les rayons sont égaux ; le diamètre en vaut deux.", ["cercle_disque", "vocabulaire", "template", "canvas"], genVocEgal),
  gabarit("cercle_vocabulaire_tpl_lire_mesure", "cercle_vocabulaire", 2, "Regarde d’abord si le segment tracé est un rayon ou un diamètre.", ["cercle_disque", "vocabulaire", "template", "canvas"], genVocLireMesure),
  gabarit("cercle_vocabulaire_tpl_comparer", "cercle_vocabulaire", 2, "Ramène tout au diamètre : un rayon se double.", ["cercle_disque", "vocabulaire", "template", "qcm"], genVocComparer),
  gabarit("cercle_vocabulaire_tpl_vrai_faux2", "cercle_vocabulaire", 2, "Le diamètre vaut deux rayons.", ["cercle_disque", "vocabulaire", "template", "qcm"], genVocVF2),

  gabarit("cercle_proportionnel_tpl_effet", "cercle_proportionnel", 1, "Le tour et le diamètre changent dans le même rapport.", ["cercle_disque", "proportionnalite", "template"], genPropEffet),
  gabarit("cercle_proportionnel_tpl_vrai_faux", "cercle_proportionnel", 1, "Le tour vaut environ 3,14 fois le diamètre.", ["cercle_disque", "proportionnalite", "template", "qcm"], genPropVF),
  gabarit("cercle_proportionnel_tpl_choisir", "cercle_proportionnel", 1, "Plus le diamètre est grand, plus le tour est grand.", ["cercle_disque", "proportionnalite", "template", "qcm"], genPropChoisir),
  gabarit("cercle_proportionnel_tpl_rapport1", "cercle_proportionnel", 1, "Cherche par combien on a multiplié.", ["cercle_disque", "proportionnalite", "template"], genPropMult1),
  gabarit("cercle_proportionnel_tpl_pi", "cercle_proportionnel", 1, "Tour ÷ diamètre donne toujours π, environ 3,14.", ["cercle_disque", "proportionnalite", "template"], genPropPi),
  gabarit("cercle_proportionnel_tpl_tableau1", "cercle_proportionnel", 1, "On passe du diamètre au tour en multipliant par 3,14.", ["cercle_disque", "proportionnalite", "template", "canvas"], genPropTableau1),
  gabarit("cercle_proportionnel_tpl_valeur", "cercle_proportionnel", 2, "Cherche par combien le diamètre est multiplié ou divisé.", ["cercle_disque", "proportionnalite", "template"], genPropValeur2),
  gabarit("cercle_proportionnel_tpl_quotient", "cercle_proportionnel", 2, "Divise le tour par le diamètre.", ["cercle_disque", "proportionnalite", "template"], genPropRapport2),
  gabarit("cercle_proportionnel_tpl_verifier", "cercle_proportionnel", 2, "Calcule 3,14 × le diamètre, puis compare.", ["cercle_disque", "proportionnalite", "template", "qcm"], genPropVerif2),
  gabarit("cercle_proportionnel_tpl_rapport2", "cercle_proportionnel", 2, "Divise le plus grand par le plus petit.", ["cercle_disque", "proportionnalite", "template"], genPropFois2),
  gabarit("cercle_proportionnel_tpl_intrus", "cercle_proportionnel", 2, "Dans chaque colonne : tour = 3,14 × diamètre.", ["cercle_disque", "proportionnalite", "template", "canvas"], genPropIntrus2),

  gabarit("cercle_perimetre_tpl_formule", "cercle_perimetre", 1, "P = π × d, ou P = 2 × π × r.", ["cercle_disque", "formule", "template", "qcm"], genPeriFormule),
  gabarit("cercle_perimetre_tpl_sens", "cercle_perimetre", 1, "Le périmètre est la longueur du tour.", ["cercle_disque", "formule", "template", "qcm"], genPeriSens),
  gabarit("cercle_perimetre_tpl_choisir_calcul", "cercle_perimetre", 1, "Avec le diamètre : 3,14 × d. Avec le rayon : 2 × 3,14 × r.", ["cercle_disque", "calcul", "template", "qcm"], genPeriCalculChoisi),
  gabarit("cercle_perimetre_tpl_calcul1", "cercle_perimetre", 1, "P = π × d, avec π ≈ 3,14.", ["cercle_disque", "calcul", "template"], genPeriCalculSimple),
  gabarit("cercle_perimetre_tpl_dans_formule", "cercle_perimetre", 1, "Dans P = π × d, le nombre après 3,14 est le diamètre.", ["cercle_disque", "formule", "template"], genPeriDansFormule),
  gabarit("cercle_perimetre_tpl_rayon2", "cercle_perimetre", 2, "Le rayon d’abord, le diamètre ensuite : d = 2 × r.", ["cercle_disque", "calcul", "template"], genPeriRayon2),
  gabarit("cercle_perimetre_tpl_figure2", "cercle_perimetre", 2, "Regarde si la figure donne un rayon ou un diamètre.", ["cercle_disque", "calcul", "template", "canvas"], genPeriFigure2),
  gabarit("cercle_perimetre_tpl_inverse2", "cercle_perimetre", 2, "On fait le calcul à l’envers : d = P ÷ π.", ["cercle_disque", "calcul", "template"], genPeriInverse2),
  gabarit("cercle_perimetre_tpl_comparer2", "cercle_perimetre", 2, "Le plus grand diamètre a le plus grand tour. Un rayon se double.", ["cercle_disque", "calcul", "template", "qcm"], genPeriComparer2),
  gabarit("cercle_perimetre_tpl_erreur2", "cercle_perimetre", 2, "Dans P = π × d, il faut le diamètre, pas le rayon.", ["cercle_disque", "calcul", "template", "qcm"], genPeriErreur2),
  gabarit("cercle_perimetre_tpl_estimer2", "cercle_perimetre", 2, "Le tour vaut un peu plus de 3 diamètres.", ["cercle_disque", "calcul", "template", "qcm"], genPeriEstim2),

  gabarit("cercle_ensemble_tpl_position2", "cercle_ensemble", 2, "Compare la distance au rayon.", ["cercle_disque", "ensemble", "template", "qcm"], genEnsPosition2),
  gabarit("cercle_ensemble_tpl_oui_non2", "cercle_ensemble", 2, "Compare la distance au rayon. Le disque contient son bord.", ["cercle_disque", "ensemble", "template", "qcm"], genEnsOuiNon2),
  gabarit("cercle_ensemble_tpl_distance2", "cercle_ensemble", 2, "Un point du cercle est à un rayon du centre.", ["cercle_disque", "ensemble", "template"], genEnsDistance2),
  gabarit("cercle_ensemble_tpl_choix_point2", "cercle_ensemble", 2, "Regarde où est chaque point par rapport au trait du cercle.", ["cercle_disque", "ensemble", "template", "canvas"], genEnsChoixPoint2),
  gabarit("cercle_ensemble_tpl_definition2", "cercle_ensemble", 2, "Cercle : à exactement cette distance. Disque : à cette distance au plus.", ["cercle_disque", "ensemble", "template", "qcm"], genEnsDef2),
  gabarit("cercle_ensemble_tpl_vrai_faux2", "cercle_ensemble", 2, "Le disque est le cercle et tout son intérieur.", ["cercle_disque", "ensemble", "template", "qcm"], genEnsVF2),
  gabarit("cercle_ensemble_tpl_ctx3_compas", "cercle_ensemble", 3, "Compare la distance au rayon. Le disque contient son bord.", ["cercle_disque", "ensemble", "template", "contexte"], genEnsCompas3),
  gabarit("cercle_ensemble_tpl_rayon3", "cercle_ensemble", 3, "Un point du cercle est à un rayon du centre.", ["cercle_disque", "ensemble", "template", "contexte"], genEnsRayon3),
  gabarit("cercle_ensemble_tpl_liste3", "cercle_ensemble", 3, "Compare chaque distance au rayon.", ["cercle_disque", "ensemble", "template", "qcm"], genEnsListe3),
  gabarit("cercle_ensemble_tpl_choix_distance3", "cercle_ensemble", 3, "Sur le cercle : égale au rayon. Dedans : plus petite. Dehors : plus grande.", ["cercle_disque", "ensemble", "template", "qcm"], genEnsChoixDistance3),
  gabarit("cercle_ensemble_tpl_corde3", "cercle_ensemble", 3, "Regarde si le segment part du centre, ou s’il passe par le centre.", ["cercle_disque", "ensemble", "template", "corde", "qcm"], genEnsCorde3),
  gabarit("cercle_distance_tpl_deux_plus_grande", "cercle_distance", 5, "La plus grande distance : le point est entre les deux autres, on additionne.", ["cercle_disque", "distance", "template", "deux_cercles"], () => genDeuxExtreme(true)),
  gabarit("cercle_distance_tpl_deux_plus_petite", "cercle_distance", 5, "La plus petite distance : les deux autres sont du même côté, on soustrait.", ["cercle_disque", "distance", "template", "deux_cercles"], () => genDeuxExtreme(false)),
  gabarit("cercle_distance_tpl_deux_touche", "cercle_distance", 5, "De l’extérieur, les deux rayons bout à bout font la distance entre les centres.", ["cercle_disque", "distance", "template", "deux_cercles"], () => genDeuxTouche(false)),
  gabarit("cercle_distance_tpl_deux_sans_toucher", "cercle_distance", 5, "Cherche d’abord le rayon qui touche, puis prends l’entier juste en dessous.", ["cercle_disque", "distance", "template", "deux_cercles"], () => genDeuxTouche(true)),
  gabarit("cercle_distance_tpl_deux_coupent", "cercle_distance", 5, "Compare la distance entre les centres à la somme et à la différence des rayons.", ["cercle_disque", "distance", "template", "deux_cercles", "qcm"], genDeuxCoupent),
  gabarit("cercle_distance_tpl_deux_zone", "cercle_distance", 5, "Deux disques se chevauchent si la distance entre les centres est plus petite que la somme des rayons.", ["cercle_disque", "distance", "template", "deux_cercles", "qcm"], genDeuxZone),
  gabarit("cercle_distance_tpl_deux_somme", "cercle_distance", 5, "Un point sur un cercle est à un rayon de son centre.", ["cercle_disque", "distance", "template", "deux_cercles"], genDeuxSomme),
];
