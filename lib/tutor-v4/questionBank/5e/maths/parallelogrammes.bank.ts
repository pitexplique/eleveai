// Parallélogrammes (5e).
// Écrit le 04/08/2026 : le parallélogramme n'existait que côté grandeurs, pour
// son aire. C'est pourtant en 5e qu'on démontre ses propriétés, et son centre
// de symétrie prolonge directement la symétrie centrale vue juste avant.

import type { TutorBankItemV4, QuadrilatereCanvasData } from "@/lib/tutor-v4/types";
import { PRENOMS, de } from "@/lib/tutor-v4/questionBank/6e/maths/entiers.bank";

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function makeChoices(correct: string, wrongs: readonly string[]) {
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct),
  ).slice(0, 3);
  return shuffle([correct, ...distracteurs]);
}

// Un parallélogramme couché, ses deux paires de côtés parallèles codées.
// Les variantes servent à distinguer le losange (quatre côtés égaux), le
// rectangle (quatre angles droits) et le carré (les deux à la fois).
function paraCanvas(params: {
  variante?: "quelconque" | "losange" | "rectangle" | "carre" | "trapeze";
  diagonales?: boolean;
  angleLabels?: Partial<Record<"A" | "B" | "C" | "D", string>>;
  sideLabels?: Partial<Record<"AB" | "BC" | "CD" | "DA", string>>;
} = {}): QuadrilatereCanvasData {
  const variante = params.variante ?? "quelconque";

  const points =
    variante === "rectangle"
      ? { A: { x: 60, y: 190 }, B: { x: 270, y: 190 }, C: { x: 270, y: 70 }, D: { x: 60, y: 70 } }
      : variante === "carre"
        ? { A: { x: 95, y: 205 }, B: { x: 245, y: 205 }, C: { x: 245, y: 55 }, D: { x: 95, y: 55 } }
        : variante === "losange"
          ? { A: { x: 60, y: 190 }, B: { x: 190, y: 190 }, C: { x: 270, y: 70 }, D: { x: 140, y: 70 } }
          : variante === "trapeze"
            ? { A: { x: 50, y: 190 }, B: { x: 290, y: 190 }, C: { x: 230, y: 70 }, D: { x: 110, y: 70 } }
            : { A: { x: 55, y: 190 }, B: { x: 215, y: 190 }, C: { x: 285, y: 75 }, D: { x: 125, y: 75 } };

  const marks: QuadrilatereCanvasData["marks"] = {
    parallelSides: variante === "trapeze" ? [["AB", "CD"]] : [["AB", "CD"], ["BC", "DA"]],
  };
  if (variante === "losange" || variante === "carre") {
    marks.equalSides = [["AB", "BC"], ["BC", "CD"], ["CD", "DA"]];
  }
  if (variante === "rectangle" || variante === "carre") {
    marks.rightAnglesAt = ["A", "B", "C", "D"];
  }

  return {
    kind: "quadrilatere",
    size: { width: 340, height: 250 },
    points,
    display: {
      showPoints: true,
      showLabels: true,
      showDiagonals: params.diagonales ?? false,
    },
    angleLabels: params.angleLabels,
    sideLabels: params.sideLabels,
    marks,
  };
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Des noms variés — le parallélogramme n'est pas toujours ABCD : quatre lettres
// qui se suivent dans l'alphabet (EFGH, MNPQ, RSTU…), sans le O, gardé pour le
// centre. Les sommets sont donnés dans l'ordre du tour.
const ALPHABET_SANS_O = "ABCDEFGHIJKLMNPQRSTUVWXYZ";
function sommetsPara(): [string, string, string, string] {
  const i = randomInt(0, ALPHABET_SANS_O.length - 4);
  const [a, b, c, d] = ALPHABET_SANS_O.slice(i, i + 4).split("");
  return [a, b, c, d];
}

/** Les sommets relus à partir du k-ième : le côté ou l'angle demandé change. */
function tourner(s: readonly string[], k: number): [string, string, string, string] {
  return [s[k % 4], s[(k + 1) % 4], s[(k + 2) % 4], s[(k + 3) % 4]];
}

/** Un segment avec ses extrémités dans l'ordre alphabétique : [EG]. */
function seg(p: string, q: string) {
  return `[${[p, q].sort().join("")}]`;
}

/** Une longueur, sans les crochets : EG. */
function lg(p: string, q: string) {
  return [p, q].sort().join("");
}

/** Une longueur au demi-centimètre près, écrite à la française : 4,5. */
function demi(): number {
  return randomInt(4, 30) / 2;
}
function fr(x: number) {
  return String(x).replace(".", ",");
}

function expl(calcul: string) {
  return (
    "Définition : un parallélogramme est un quadrilatère dont les côtés opposés sont parallèles deux à deux.\n\n" +
    "Méthode : on utilise les propriétés de ses côtés, de ses angles ou de ses diagonales.\n\nCalcul : " +
    calcul +
    "\n\nConclusion : la propriété ou la mesure obtenue convient pour ce quadrilatère."
  );
}

/* ⭐ 09/10/2026 — LA VARIÉTÉ ET LA FIGURE CALCULÉE.
   Mesuré le 09/10 : 7 à 10 squelettes sur para_construire et para_defi, 16 à
   19 répétitions sur 20 à plusieurs étoiles. Chaque gabarit compose désormais
   un NOM tiré (EFGH, MNPQ…, lu à partir d'un sommet au hasard) × un OBJET réel
   (tuile, cerf-volant, parcelle…) × une TOURNURE. Les figures sont dessinées À
   LEURS MESURES (`figurePara`) : un angle de 118° est obtus sur le dessin, le
   côté de 9 cm plus long que celui de 4 cm. Le correcteur
   (correcteurs/parallelogrammes.ts) relit le texte ET la figure. */

const K4 = ["A", "B", "C", "D"] as const;
const COTES4 = ["AB", "BC", "CD", "DA"] as const;
type I4 = 0 | 1 | 2 | 3;

/** Le parallélogramme dessiné : AB = long[0], AD = long[1], angle en A = angleA (degrés). */
function pointsPara(ab: number, ad: number, angleA: number): QuadrilatereCanvasData["points"] {
  const r = (angleA * Math.PI) / 180;
  const A = { x: 0, y: 0 };
  const B = { x: ab, y: 0 };
  const D = { x: ad * Math.cos(r), y: ad * Math.sin(r) };
  const C = { x: B.x + D.x, y: D.y };
  const xs = [A.x, B.x, C.x, D.x];
  const x0 = Math.min(...xs);
  const x1 = Math.max(...xs);
  const s = Math.min(230 / (x1 - x0), 140 / D.y);
  const ox = 170 - (s * (x0 + x1)) / 2;
  const oy = 125 + (s * D.y) / 2;
  const m = (p: { x: number; y: number }) => ({ x: Math.round((ox + s * p.x) * 10) / 10, y: Math.round((oy - s * p.y) * 10) / 10 });
  return { A: m(A), B: m(B), C: m(C), D: m(D) };
}

/**
 * La figure du quadrilatère `s` (sommets dans l'ordre du tour : s[0] dessiné en
 * A, en bas à gauche). `long` : longueurs de s[0]s[1] et s[3]s[0] ; `angle0` :
 * l'angle en s[0]. `cotes[i]` étiquette le côté s[i]s[i+1], `angles[i]` l'angle
 * en s[i]. Le dessin respecte les mesures.
 */
function figurePara(
  s: readonly string[],
  o: {
    long?: [number, number];
    angle0?: number;
    cotes?: Partial<Record<I4, string>>;
    angles?: Partial<Record<I4, string>>;
    diagonales?: boolean;
    variante?: "quelconque" | "losange" | "rectangle" | "carre" | "trapeze";
  } = {},
): QuadrilatereCanvasData {
  const v = o.variante ?? "quelconque";
  let [ab, ad] = o.long ?? [1.6, 1];
  let a = o.angle0 ?? 64;
  if (v === "losange") ad = ab;
  if (v === "carre") [ad, a] = [ab, 90];
  if (v === "rectangle") a = 90;
  let points = pointsPara(ab, ad, a);
  if (v === "trapeze") {
    // Une seule paire de côtés parallèles : le haut est raccourci.
    const P = pointsPara(ab, ad, a);
    const dx = (P.C.x - P.D.x) * 0.3;
    points = { ...P, C: { x: Math.round((P.C.x - dx) * 10) / 10, y: P.C.y } };
  }
  const marks: NonNullable<QuadrilatereCanvasData["marks"]> = {
    parallelSides: v === "trapeze" ? [["AB", "CD"]] : [["AB", "CD"], ["BC", "DA"]],
  };
  if (v === "losange" || v === "carre") marks.equalSides = [["AB", "BC"], ["BC", "CD"], ["CD", "DA"]];
  if (v === "rectangle" || v === "carre") marks.rightAnglesAt = ["A", "B", "C", "D"];
  const canvas: QuadrilatereCanvasData = {
    kind: "quadrilatere",
    size: { width: 340, height: 250 },
    points,
    labels: { A: s[0], B: s[1], C: s[2], D: s[3] },
    display: { showPoints: true, showLabels: true, showDiagonals: o.diagonales ?? false, showSides: !!o.cotes, showAngles: !!o.angles },
    marks,
  };
  if (o.cotes) canvas.sideLabels = Object.fromEntries(Object.entries(o.cotes).map(([i, t]) => [COTES4[Number(i)], t]));
  if (o.angles) canvas.angleLabels = Object.fromEntries(Object.entries(o.angles).map(([i, t]) => [K4[Number(i)], t]));
  return canvas;
}

/** Un nom de parallélogramme lu à partir d'un sommet au hasard : FGHE, NPQM… */
function nomPara(): string[] {
  return tourner(sommetsPara(), randomInt(0, 3));
}
/** Le centre : une lettre libre. */
function centreDe(s: readonly string[]) {
  return randomChoice(["O", "I", "K", "J"].filter((x) => !s.includes(x)));
}

/** Des objets réels en forme de parallélogramme, avec une unité et des longueurs plausibles. */
type ObjetPara = { intro: (N: string) => string; u: "cm" | "m"; min: number; max: number };
const OBJETS_PARA: ObjetPara[] = [
  { intro: (N) => `Le motif d’un tissu est un parallélogramme ${N}.`, u: "cm", min: 3, max: 12 },
  { intro: (N) => `Une tuile de mosaïque a la forme d’un parallélogramme ${N}.`, u: "cm", min: 4, max: 15 },
  { intro: (N) => `Sur le plan d’un parking, une place en épi est un parallélogramme ${N}.`, u: "m", min: 3, max: 6 },
  { intro: (N) => `Les barres articulées d’un portillon forment un parallélogramme ${N}.`, u: "cm", min: 20, max: 60 },
  { intro: (N) => `Les bras d’une lampe de bureau dessinent un parallélogramme ${N}.`, u: "cm", min: 15, max: 40 },
  { intro: (N) => `Une étagère mal fixée s’est penchée : son cadre forme un parallélogramme ${N}.`, u: "cm", min: 30, max: 80 },
  { intro: (N) => `Un jardin partagé a la forme d’un parallélogramme ${N}.`, u: "m", min: 8, max: 30 },
  { intro: (N) => `Un carreau posé en biais dessine un parallélogramme ${N}.`, u: "cm", min: 10, max: 30 },
  { intro: (N) => `Le logo d’un club de handball est un parallélogramme ${N}.`, u: "cm", min: 3, max: 10 },
  { intro: (N) => `Dans un vitrail, une pièce de verre a la forme d’un parallélogramme ${N}.`, u: "cm", min: 5, max: 20 },
  { intro: (N) => `Un champ de blé a la forme d’un parallélogramme ${N}.`, u: "m", min: 40, max: 120 },
  { intro: (N) => `Sur un drapeau, une bande oblique est un parallélogramme ${N}.`, u: "cm", min: 10, max: 40 },
  { intro: (N) => `Un autocollant a la forme d’un parallélogramme ${N}.`, u: "cm", min: 3, max: 9 },
  { intro: (N) => `Vue du ciel, une passerelle est un parallélogramme ${N}.`, u: "m", min: 4, max: 20 },
  { intro: (N) => `Une part de gâteau découpée en biais forme un parallélogramme ${N}.`, u: "cm", min: 4, max: 12 },
  { intro: (N) => `Un champ de cannes à sucre a la forme d’un parallélogramme ${N}.`, u: "m", min: 50, max: 150 },
  { intro: (N) => {
    const p = randomChoice(PRENOMS);
    return `${p.nom} trace dans son cahier un parallélogramme ${N}.`;
  }, u: "cm", min: 3, max: 12 },
  { intro: (N) => {
    const p = randomChoice(PRENOMS);
    return `Sur l’écran de l’ordinateur ${de(p.nom)}, un logiciel de géométrie affiche un parallélogramme ${N}.`;
  }, u: "cm", min: 3, max: 15 },
];

/** Une longueur plausible pour l'objet : au demi-centimètre en cm (jusqu'à 20), entière sinon. */
function longueurPour(o: ObjetPara): number {
  if (o.u === "cm" && o.max <= 20) return randomInt(o.min * 2, o.max * 2) / 2;
  return randomInt(o.min, o.max);
}
/** Deux longueurs différentes pour l'objet, de rapport au plus 3. */
function deuxLongueurs(o: ObjetPara): [number, number] {
  for (;;) {
    const x = longueurPour(o);
    const y = longueurPour(o);
    if (x !== y && Math.max(x, y) / Math.min(x, y) <= 3) return [x, y];
  }
}
/** Trois façons de nommer l'angle en s[i] : « l’angle en F », « l’angle de sommet F », « l’angle EFG ». */
function nomAngle(s: readonly string[], i: number, style: number) {
  if (style === 0) return `l’angle en ${s[i]}`;
  if (style === 1) return `l’angle de sommet ${s[i]}`;
  return `l’angle ${s[(i + 3) % 4]}${s[i]}${s[(i + 1) % 4]}`;
}
/** Un angle non droit, en degrés entiers. */
function angleNonDroit(): number {
  let a = randomInt(35, 145);
  while (a >= 84 && a <= 96) a = randomInt(35, 145);
  return a;
}

/* ⭐ 13/10/2026 — DIAGONALES, CAS PARTICULIERS, CONSTRUCTION, DÉFIS.
   Mesuré le 13/10 : para_construire 7 squelettes, para_defi 10, para_diagonales
   17 répétitions sur 20 à ★4, para_particuliers 14 à ★5. Chaque gabarit tire un
   nom (EFGH lu d'un sommet), un centre, un objet réel, une tournure ; les
   figures des diagonales sont dessinées à partir des demi-diagonales de
   l'énoncé (`figureDiagonales`). */

function prenomAuHasard() {
  return randomChoice(PRENOMS);
}
const ilElle = (p: { f: boolean }) => (p.f ? "elle" : "il");
const Maj = (t: string) => t[0].toUpperCase() + t.slice(1);

/**
 * Le parallélogramme dessiné à partir de ses demi-diagonales : x (de s[0] et
 * s[2] au centre), y (de s[1] et s[3] au centre), et l'angle (en degrés) entre
 * les demi-diagonales vers s[0] et vers s[1]. Les diagonales se coupent en leur
 * milieu : c'est un parallélogramme.
 */
function figureDiagonales(s: readonly string[], x: number, y: number, theta: number): QuadrilatereCanvasData {
  const a0 = (200 * Math.PI) / 180;
  const a1 = a0 + (theta * Math.PI) / 180;
  const A = { x: x * Math.cos(a0), y: x * Math.sin(a0) };
  const B = { x: y * Math.cos(a1), y: y * Math.sin(a1) };
  const brut = { A, B, C: { x: -A.x, y: -A.y }, D: { x: -B.x, y: -B.y } };
  const xs = Object.values(brut).map((p) => p.x), ys = Object.values(brut).map((p) => p.y);
  const sc = Math.min(260 / (Math.max(...xs) - Math.min(...xs)), 190 / (Math.max(...ys) - Math.min(...ys)));
  const cx = (Math.max(...xs) + Math.min(...xs)) / 2, cy = (Math.max(...ys) + Math.min(...ys)) / 2;
  const m = (p: { x: number; y: number }) => ({ x: Math.round((170 + sc * (p.x - cx)) * 10) / 10, y: Math.round((125 - sc * (p.y - cy)) * 10) / 10 });
  return {
    kind: "quadrilatere",
    size: { width: 340, height: 250 },
    points: { A: m(brut.A), B: m(brut.B), C: m(brut.C), D: m(brut.D) },
    labels: { A: s[0], B: s[1], C: s[2], D: s[3] },
    display: { showPoints: true, showLabels: true, showDiagonals: true },
    marks: { parallelSides: [["AB", "CD"], ["BC", "DA"]] },
  };
}
/** L'angle entre les demi-diagonales x et y quand le côté qui les relie mesure z (Al-Kashi). */
const angleEntre = (x: number, y: number, z: number) => (Math.acos((x * x + y * y - z * z) / (2 * x * y)) * 180) / Math.PI;

function genDiagonales(star: 2 | 4 | 5) {
  const s = nomPara();
  const N = s.join("");
  const [P, Q, R, T] = s;
  const I = centreDe(s);
  const enSituation = Math.random() < 0.45;
  // sans objet réel : une figure de cahier, en cm
  const o = enSituation ? randomChoice(OBJETS_PARA) : { intro: (n: string) => n, u: "cm" as const, min: 3, max: 12 };
  const u = o.u;
  const intro = enSituation ? `${o.intro(N)} Ses diagonales se coupent en ${I}.` : `Les diagonales du parallélogramme ${N} se coupent en ${I}.`;
  const x = longueurPour(o);
  let y = longueurPour(o);
  if (y === x) y = x + (u === "cm" && o.max <= 20 ? 0.5 : 1);
  const theta = randomInt(55, 125);
  const combien = (quoi: string) => randomChoice([`Combien mesure ${quoi} ?`, `Quelle est la longueur de ${quoi} ?`, `Calcule la longueur ${quoi.startsWith("la ") ? "de " : ""}${quoi}.`]);
  const prop = "Dans un parallélogramme, les diagonales se coupent en leur milieu.";
  const res = (text: string, v: number, pourquoi: string, canvas?: QuadrilatereCanvasData) => ({
    text,
    format: "short" as const,
    expected: [`${fr(v)} ${u}`],
    comparator: "number_equal" as const,
    explanation: expl(`${prop} ${pourquoi}`),
    ...(canvas && Math.random() < 0.7 ? { canvas } : {}),
  });
  const fig = figureDiagonales(s, x, y, theta);
  if (star === 2) {
    const r = Math.random();
    if (r < 0.25) {
      // symétrique d'un point, ou milieu d'une diagonale
      const [V, W] = randomChoice([[P, R], [Q, T], [R, P], [T, Q]]);
      if (Math.random() < 0.5)
        return {
          text: `${intro} ${randomChoice([`Quel est le symétrique du point ${V} par rapport à ${I} ?`, `Par la symétrie de centre ${I}, sur quel point arrive ${V} ?`])}`,
          format: "qcm" as const,
          choices: shuffle([P, Q, R, T]),
          expected: [W],
          comparator: "mcq_exact" as const,
          explanation: expl(`${I} est le milieu de la diagonale ${seg(V, W)}. Le symétrique de ${V} par rapport à ${I} est l’autre extrémité : ${W}.`),
          canvas: fig,
        };
      return {
        text: `${intro} ${randomChoice([`Quel point est le milieu du segment ${seg(V, W)} ?`, `Le milieu de ${seg(V, W)} est le point :`])}`,
        format: "qcm" as const,
        choices: shuffle([I, ...s.filter((k) => k !== V && k !== W)]),
        expected: [I],
        comparator: "mcq_exact" as const,
        explanation: expl(`${prop} ${I} est donc le milieu de ${seg(V, W)}.`),
        canvas: fig,
      };
    }
    const [V, W] = randomChoice([[P, R], [Q, T], [R, P], [T, Q]]);
    const h = randomChoice([x, y]);
    const cas = randomInt(0, 2);
    if (cas === 0) return res(`${intro} On sait que ${lg(V, I)} = ${fr(h)} ${u}. ${combien(lg(W, I))}`, h, `${I} est le milieu de ${seg(V, W)}, donc ${lg(W, I)} = ${lg(V, I)} = ${fr(h)} ${u}.`);
    if (cas === 1) return res(`${intro} On sait que ${lg(V, I)} = ${fr(h)} ${u}. ${combien(`la diagonale ${seg(V, W)}`)}`, 2 * h, `${I} est le milieu de ${seg(V, W)} : la diagonale mesure 2 × ${fr(h)} = ${fr(2 * h)} ${u}.`);
    return res(`${intro} La diagonale ${seg(V, W)} mesure ${fr(2 * h)} ${u}. ${combien(lg(V, I))}`, h, `${I} est le milieu de ${seg(V, W)} : ${lg(V, I)} = ${fr(2 * h)} ÷ 2 = ${fr(h)} ${u}.`);
  }
  if (star === 4) {
    const cas = randomInt(0, 3);
    if (cas === 0)
      return res(`${intro} On sait que ${lg(P, I)} = ${fr(x)} ${u} et ${lg(Q, I)} = ${fr(y)} ${u}. ${combien(`la diagonale ${seg(Q, T)}`)}`, 2 * y, `${I} est le milieu de ${seg(Q, T)} : ${seg(Q, T)} mesure 2 × ${lg(Q, I)} = 2 × ${fr(y)} = ${fr(2 * y)} ${u}. La longueur ${lg(P, I)} ne sert pas ici.`, fig);
    if (cas === 1)
      return res(`${intro} La diagonale ${seg(P, R)} mesure ${fr(2 * x)} ${u} et la diagonale ${seg(Q, T)} mesure ${fr(2 * y)} ${u}. ${combien(lg(T, I))}`, y, `${I} est le milieu de ${seg(Q, T)} : ${lg(T, I)} = ${fr(2 * y)} ÷ 2 = ${fr(y)} ${u}.`, fig);
    if (cas === 2)
      return res(`${intro} On sait que ${lg(R, I)} = ${fr(x)} ${u} et ${lg(T, I)} = ${fr(y)} ${u}. ${randomChoice(["Quelle est la somme des longueurs des deux diagonales ?", "Combien mesurent les deux diagonales mises bout à bout ?"])}`, 2 * x + 2 * y, `${seg(P, R)} mesure 2 × ${fr(x)} = ${fr(2 * x)} ${u} et ${seg(Q, T)} mesure 2 × ${fr(y)} = ${fr(2 * y)} ${u}. Somme : ${fr(2 * x + 2 * y)} ${u}.`, fig);
    return res(`${intro} On sait que ${lg(P, I)} = ${fr(x)} ${u} et que la diagonale ${seg(Q, T)} mesure ${fr(2 * y)} ${u}. ${randomChoice([`De combien la diagonale ${seg(P, R)} est-elle plus ${x > y ? "longue" : "courte"} que ${seg(Q, T)} ?`, `Quel est l’écart entre les longueurs des deux diagonales ?`])}`, Math.abs(2 * x - 2 * y), `${seg(P, R)} mesure 2 × ${fr(x)} = ${fr(2 * x)} ${u}. L’écart vaut ${fr(Math.max(2 * x, 2 * y))} − ${fr(Math.min(2 * x, 2 * y))} = ${fr(Math.abs(2 * x - 2 * y))} ${u}.`, fig);
  }
  // ★5 : périmètre d'un triangle formé par le centre, ou symétrique d'un côté
  if (Math.random() < 0.3) {
    const [V, W] = randomChoice([[P, Q], [Q, R], [R, T], [T, P]]);
    const k = s.indexOf(V);
    const opp = seg(s[(k + 2) % 4], s[(k + 3) % 4]);
    return {
      text: `${intro} ${randomChoice([`Quel est le symétrique du côté ${seg(V, W)} par rapport à ${I} ?`, `Par la symétrie de centre ${I}, sur quel segment arrive le côté ${seg(V, W)} ?`])}`,
      format: "qcm" as const,
      choices: shuffle([opp, seg(s[(k + 1) % 4], s[(k + 2) % 4]), seg(s[(k + 3) % 4], s[k]), seg(s[k], s[(k + 2) % 4])]),
      expected: [opp],
      comparator: "mcq_exact" as const,
      explanation: expl(`${I} est le milieu des deux diagonales : ${V} va sur ${s[(k + 2) % 4]} et ${W} va sur ${s[(k + 3) % 4]}. Le côté ${seg(V, W)} arrive sur ${opp}.`),
      canvas: fig,
    };
  }
  // un côté z plausible : |x − y| < z < x + y
  const pas = u === "cm" && o.max <= 20 ? 0.5 : 1;
  const zMin = Math.abs(x - y) + pas, zMax = x + y - pas;
  const z = Math.round((zMin + Math.random() * (zMax - zMin)) / pas) * pas;
  const figZ = figureDiagonales(s, x, y, angleEntre(x, y, z));
  const per = x + y + z;
  return res(
    `${intro} La diagonale ${seg(P, R)} mesure ${fr(2 * x)} ${u}, la diagonale ${seg(Q, T)} mesure ${fr(2 * y)} ${u} et ${lg(P, Q)} = ${fr(z)} ${u}. ${randomChoice([`Quel est le périmètre du triangle ${P}${I}${Q} ?`, `Calcule le périmètre du triangle ${P}${Q}${I}.`])}`,
    per,
    `${lg(P, I)} = ${fr(2 * x)} ÷ 2 = ${fr(x)} ${u} et ${lg(Q, I)} = ${fr(2 * y)} ÷ 2 = ${fr(y)} ${u}. Périmètre : ${fr(x)} + ${fr(y)} + ${fr(z)} = ${fr(per)} ${u}.`,
    figZ,
  );
}

/* ── PARA_PARTICULIERS (13/10/2026) ─────────────────────────────────────── */

const NATURES = ["un losange", "un rectangle", "un carré"] as const;

function genParticuliers(star: 3 | 4 | 5) {
  const s = nomPara();
  const N = s.join("");
  const [P, Q, R, T] = s;
  const p = prenomAuHasard();
  if (star === 3) {
    const a = demi();
    let b = demi();
    if (b === a) b = a + 1;
    const d = randomInt(6, 20);
    const cas = randomChoice([
      { info: `${lg(P, Q)} = ${lg(Q, R)}`, rep: "un losange", pourquoi: "deux côtés consécutifs égaux : les quatre côtés sont égaux, c’est un losange." },
      { info: `${lg(P, Q)} = ${fr(a)} cm et ${lg(Q, R)} = ${fr(a)} cm`, rep: "un losange", pourquoi: `deux côtés consécutifs mesurent ${fr(a)} cm : les quatre côtés sont égaux, c’est un losange.` },
      { info: `l’angle en ${P} est droit`, rep: "un rectangle", pourquoi: "un angle droit : les quatre angles sont droits, c’est un rectangle." },
      { info: `l’angle en ${Q} mesure 90°`, rep: "un rectangle", pourquoi: "un angle de 90° : les quatre angles sont droits, c’est un rectangle." },
      { info: `ses diagonales ${seg(P, R)} et ${seg(Q, T)} ont la même longueur`, rep: "un rectangle", pourquoi: "des diagonales de même longueur : c’est un rectangle." },
      { info: `${lg(P, R)} = ${d} cm et ${lg(Q, T)} = ${d} cm`, rep: "un rectangle", pourquoi: `les deux diagonales mesurent ${d} cm : c’est un rectangle.` },
      { info: `ses diagonales ${seg(P, R)} et ${seg(Q, T)} sont perpendiculaires`, rep: "un losange", pourquoi: "des diagonales perpendiculaires : c’est un losange." },
      { info: `${lg(P, Q)} = ${lg(Q, R)} et l’angle en ${Q} est droit`, rep: "un carré", pourquoi: "deux côtés consécutifs égaux (losange) et un angle droit (rectangle) : c’est un carré." },
      { info: `ses diagonales ont la même longueur et sont perpendiculaires`, rep: "un carré", pourquoi: "diagonales de même longueur (rectangle) et perpendiculaires (losange) : c’est un carré." },
    ]);
    const text = randomChoice([
      `${N} est un parallélogramme. On sait que ${cas.info}. Quelle est sa nature ?`,
      `Le quadrilatère ${N} est un parallélogramme, et ${cas.info}. Quel parallélogramme particulier est-ce ?`,
      `${p.nom} a tracé le parallélogramme ${N}. ${Maj(ilElle(p))} remarque que ${cas.info}. Quelle est la nature de ${N} ?`,
    ]);
    return { text, format: "qcm" as const, choices: shuffle([...NATURES]), expected: [cas.rep], comparator: "mcq_exact" as const, explanation: expl(`${N} est un parallélogramme et ${cas.pourquoi}`) };
  }
  if (star === 4) {
    const c = demi();
    const d = randomInt(6, 24);
    const cas = randomInt(0, 5);
    const num = (text: string, v: number, unite: string, pourquoi: string) => ({
      text,
      format: "short" as const,
      expected: [unite === "°" ? `${fr(v)}°` : `${fr(v)} ${unite}`],
      comparator: "number_equal" as const,
      explanation: expl(pourquoi),
    });
    if (cas === 0) return num(`${N} est un losange et ${lg(P, Q)} = ${fr(c)} cm. ${randomChoice([`Combien mesure ${lg(R, T)} ?`, `Quelle est la longueur de ${lg(Q, R)} ?`])}`, c, "cm", `Un losange a ses quatre côtés de même longueur : ${fr(c)} cm.`);
    if (cas === 1) return num(`${N} est un losange de côté ${fr(c)} cm. ${randomChoice(["Quel est son périmètre ?", "Calcule son périmètre."])}`, 4 * c, "cm", `Quatre côtés de ${fr(c)} cm : 4 × ${fr(c)} = ${fr(4 * c)} cm.`);
    if (cas === 2) {
      const k = randomInt(3, 15);
      return num(`${N} est un carré de périmètre ${4 * k} cm. ${randomChoice(["Combien mesure un côté ?", `Quelle est la longueur de ${lg(P, Q)} ?`])}`, k, "cm", `Les quatre côtés sont égaux : ${4 * k} ÷ 4 = ${k} cm.`);
    }
    if (cas === 3) return num(`${N} est un rectangle. Sa diagonale ${seg(P, R)} mesure ${d} cm. ${randomChoice([`Combien mesure la diagonale ${seg(Q, T)} ?`, `Quelle est la longueur de ${seg(Q, T)} ?`])}`, d, "cm", `Les diagonales d’un rectangle ont la même longueur : ${seg(Q, T)} = ${d} cm.`);
    if (cas === 4) {
      const I = centreDe(s);
      return num(`${N} est un losange. Ses diagonales se coupent en ${I}. ${randomChoice([`Combien mesure l’angle ${P}${I}${Q} ?`, `Quelle est la mesure de l’angle ${Q}${I}${R} ?`])}`, 90, "°", "Les diagonales d’un losange sont perpendiculaires : l’angle mesure 90°.");
    }
    const I = centreDe(s);
    return num(`${N} est un rectangle. Ses diagonales se coupent en ${I} et ${lg(P, R)} = ${d} cm. ${randomChoice([`Combien mesure ${lg(Q, I)} ?`, `Quelle est la longueur de ${lg(T, I)} ?`])}`, d / 2, "cm", `Les diagonales du rectangle ont la même longueur (${d} cm) et se coupent en leur milieu : ${d} ÷ 2 = ${fr(d / 2)} cm.`);
  }
  // ★5 : inclusions, ou « est-ce un carré ? »
  const r = Math.random();
  if (r < 0.5) {
    const INCL: [string, string, boolean][] = [
      ["carré", "losange", true], ["carré", "rectangle", true], ["carré", "parallélogramme", true],
      ["losange", "parallélogramme", true], ["rectangle", "parallélogramme", true],
      ["losange", "carré", false], ["rectangle", "carré", false], ["losange", "rectangle", false],
      ["rectangle", "losange", false], ["parallélogramme", "losange", false], ["parallélogramme", "rectangle", false],
    ];
    const [x, y, vrai] = randomChoice(INCL);
    const vf = Math.random() < 0.5;
    const text = vf
      ? randomChoice([`Vrai ou faux ? Tout ${x} est un ${y}.`, `Vrai ou faux ? Un ${x} est toujours un ${y}.`])
      : randomChoice([`Un ${x} est-il toujours un ${y} ?`, `${p.nom} affirme que tout ${x} est un ${y}. A-t-${ilElle(p)} raison ?`]);
    const [o, n] = vf ? ["vrai", "faux"] : ["oui", "non"];
    const DEF: Record<string, string> = { carré: "quatre côtés égaux et quatre angles droits", losange: "quatre côtés égaux", rectangle: "quatre angles droits", parallélogramme: "les côtés opposés parallèles" };
    return {
      text,
      format: "qcm" as const,
      choices: [o, n],
      expected: [vrai ? o : n],
      comparator: "mcq_exact" as const,
      explanation: expl(`Un ${y} a ${DEF[y]}. Un ${x} a ${DEF[x]}. ${vrai ? `Donc tout ${x} est un ${y}.` : `Un ${x} n’a pas forcément ${DEF[y]} : ce n’est pas toujours un ${y}.`}`),
    };
  }
  if (r < 0.75) {
    let a = randomInt(40, 140);
    if (Math.random() < 0.25) a = 90;
    const carre = a === 90;
    const text = randomChoice([`${N} est un losange. Son angle en ${P} mesure ${a}°. Est-ce un carré ?`, `${p.nom} dessine un losange ${N} dont l’angle en ${Q} mesure ${a}°. Ce losange est-il un carré ?`]);
    return { text, format: "qcm" as const, choices: ["oui", "non"], expected: [carre ? "oui" : "non"], comparator: "mcq_exact" as const, explanation: expl(carre ? "Un losange qui a un angle droit a ses quatre angles droits : c’est un carré." : `Un carré a quatre angles droits. Ce losange a un angle de ${a}°, pas de 90° : ce n’est pas un carré.`) };
  }
  const a = randomInt(3, 12);
  const b = Math.random() < 0.3 ? a : a + randomInt(1, 6);
  const carre = a === b;
  const text = randomChoice([`${N} est un rectangle. ${lg(P, Q)} = ${a} cm et ${lg(Q, R)} = ${b} cm. Est-ce un carré ?`, `${p.nom} découpe un rectangle ${N} avec ${lg(P, Q)} = ${a} cm et ${lg(Q, R)} = ${b} cm. Ce rectangle est-il un carré ?`]);
  return { text, format: "qcm" as const, choices: ["oui", "non"], expected: [carre ? "oui" : "non"], comparator: "mcq_exact" as const, explanation: expl(carre ? "Un rectangle qui a deux côtés consécutifs égaux a ses quatre côtés égaux : c’est un carré." : `${lg(P, Q)} et ${lg(Q, R)} sont consécutifs et différents : les quatre côtés ne sont pas égaux, ce n’est pas un carré.`) };
}

/* ── PARA_CONSTRUIRE (13/10/2026) ───────────────────────────────────────── */

function genConstruire(star: 4 | 5) {
  const s = nomPara();
  const N = s.join("");
  const [P, Q, R, T] = s;
  const p = prenomAuHasard();
  const a = randomInt(3, 9);
  let b = randomInt(3, 9);
  while (b === a) b = randomInt(3, 9);
  const qui = randomChoice([`On construit le parallélogramme ${N}`, `${p.nom} construit le parallélogramme ${N}`, `Pour son exercice, ${p.nom} doit construire le parallélogramme ${N}`]);
  if (star === 4) {
    const r = Math.random();
    if (r < 0.35) {
      const rep = `à ${a} cm de ${R} et à ${b} cm de ${P}`;
      return {
        text: `${qui} avec ${lg(P, Q)} = ${a} cm et ${lg(Q, R)} = ${b} cm. ${randomChoice([`Une fois ${P}, ${Q} et ${R} placés, où se trouve le point ${T} ?`, `${P}, ${Q} et ${R} sont tracés. Où faut-il placer ${T} ?`])}`,
        format: "qcm" as const,
        choices: makeChoices(rep, [`à ${b} cm de ${R} et à ${a} cm de ${P}`, `à ${a} cm de ${P} et à ${a} cm de ${R}`, `à ${b} cm de ${P} et à ${b} cm de ${R}`]),
        expected: [rep],
        comparator: "mcq_exact" as const,
        explanation: expl(`${seg(R, T)} est opposé à ${seg(P, Q)} : ${lg(R, T)} = ${a} cm. ${seg(T, P)} est opposé à ${seg(Q, R)} : ${lg(P, T)} = ${b} cm. Deux arcs de compas suffisent.`),
      };
    }
    if (r < 0.6) {
      const [centre, rayon] = randomChoice([[R, a], [P, b]] as [string, number][]);
      return {
        text: `${qui} avec ${lg(P, Q)} = ${a} cm et ${lg(Q, R)} = ${b} cm. ${P}, ${Q} et ${R} sont tracés. Pour placer ${T}, quel rayon faut-il donner à l’arc de cercle de centre ${centre} ?`,
        format: "short" as const,
        expected: [`${rayon} cm`],
        comparator: "number_equal" as const,
        explanation: expl(`${T} est à la distance ${lg(T, centre)} de ${centre}. Le côté ${seg(T, centre)} est opposé à ${centre === R ? seg(P, Q) : seg(Q, R)} : il mesure ${rayon} cm.`),
      };
    }
    if (r < 0.8) {
      const I = centreDe(s);
      return {
        text: `${qui}. ${P}, ${Q} et ${R} sont placés, puis le milieu ${I} de ${seg(P, R)}. ${randomChoice([`${T} est alors le symétrique de quel point par rapport à ${I} ?`, `De quel point ${T} est-il le symétrique par rapport à ${I} ?`])}`,
        format: "qcm" as const,
        choices: shuffle([P, Q, R]),
        expected: [Q],
        comparator: "mcq_exact" as const,
        explanation: expl(`Les diagonales ${seg(P, R)} et ${seg(Q, T)} se coupent en leur milieu ${I}. Donc ${T} est le symétrique de ${Q} par rapport à ${I}.`),
      };
    }
    const etapes: [string, string][] = [
      [`ouvrir un angle de ${randomInt(40, 140)}° en ${Q}`, "le rapporteur"],
      [`tracer un arc de cercle de rayon ${a} cm autour de ${R}`, "le compas"],
      [`tracer le segment ${seg(P, Q)} de ${a} cm`, "la règle graduée"],
      [`vérifier que l’angle en ${P} est droit`, "l’équerre"],
    ];
    const [etape, outil] = randomChoice(etapes);
    return {
      text: `${qui}. Quel instrument faut-il pour ${etape} ?`,
      format: "qcm" as const,
      choices: shuffle(["le rapporteur", "le compas", "la règle graduée", "l’équerre"]),
      expected: [outil],
      comparator: "mcq_exact" as const,
      explanation: expl(`Le rapporteur ouvre un angle ; le compas trace un arc (il reporte une longueur) ; la règle graduée trace un segment de longueur donnée ; l’équerre trace ou vérifie un angle droit. Pour ${etape} : ${outil}.`),
    };
  }
  // ★5 : préparer les mesures de la construction (figure aux mesures)
  let alpha = randomInt(40, 140);
  while (alpha >= 85 && alpha <= 95) alpha = randomInt(40, 140);
  const enQ = Math.random() < 0.5; // l'angle donné est en P ou en Q
  const donne = enQ ? Q : P;
  const angleP = enQ ? 180 - alpha : alpha;
  const deux = Math.random() < 0.5;
  const quoi = randomChoice(deux ? ["RT", "TP", "per", "angle"] : ["RT", "angle"]);
  const cotes: Partial<Record<I4, string>> = { 0: `${a} cm` };
  if (deux) cotes[1] = `${b} cm`;
  const angles: Partial<Record<I4, string>> = { [enQ ? 1 : 0]: `${alpha}°` } as Partial<Record<I4, string>>;
  let cible = "";
  let text: string, expected: string, pourquoi: string;
  const donnees = `${lg(P, Q)} = ${a} cm${deux ? `, ${lg(Q, R)} = ${b} cm` : ""} et un angle de ${alpha}° en ${donne}`;
  if (quoi === "RT" || quoi === "TP") {
    const [x, y, v, face] = quoi === "RT" ? [R, T, a, seg(P, Q)] : [T, P, b, seg(Q, R)];
    cotes[quoi === "RT" ? 2 : 3] = "?";
    text = `${qui} avec ${donnees}. Quelle longueur faut-il donner à ${seg(x, y)} ?`;
    expected = `${v} cm`;
    pourquoi = `${seg(x, y)} est opposé à ${face} : même longueur, ${v} cm.`;
  } else if (quoi === "per") {
    text = `${qui} avec ${donnees}. Quel sera son périmètre ?`;
    expected = `${2 * (a + b)} cm`;
    pourquoi = `Les côtés opposés sont égaux : 2 × (${a} + ${b}) = ${2 * (a + b)} cm.`;
  } else {
    const autres = s.filter((k) => k !== donne);
    cible = randomChoice(autres);
    const k = s.indexOf(cible), j = s.indexOf(donne);
    const oppose = (k - j + 4) % 4 === 2;
    const v = oppose ? alpha : 180 - alpha;
    angles[k as I4] = "?";
    text = `${qui} avec ${donnees}. Quel angle faut-il tracer en ${cible} ?`;
    expected = `${v}°`;
    pourquoi = oppose ? `${cible} est opposé à ${donne} : les angles opposés sont égaux, ${v}°.` : `${cible} et ${donne} sont consécutifs : leur somme fait 180°, 180 − ${alpha} = ${v}°.`;
  }
  return {
    text,
    format: "short" as const,
    expected: [expected],
    comparator: "number_equal" as const,
    explanation: expl(pourquoi),
    canvas: figurePara(s, { long: [a, deux ? b : randomChoice([a * 0.6, a * 0.8])], angle0: angleP, cotes, angles }),
  };
}

/* ── PARA_DEFI (13/10/2026) ─────────────────────────────────────────────── */

/** Défis de mesures : sommes d'angles, angles liés (« 40° de plus », « le double »), périmètre à rebours. */
function genDefiMesures() {
  const s = nomPara();
  const N = s.join("");
  const [P, Q, R, T] = s;
  const o = randomChoice(OBJETS_PARA);
  const intro = Math.random() < 0.5 ? o.intro(N) : `${N} est un parallélogramme.`;
  const cas = randomInt(0, 4);
  const deg = (v: number, text: string, pourquoi: string) => ({ text, format: "short" as const, expected: [`${v}°`], comparator: "number_equal" as const, explanation: expl(pourquoi) });
  if (cas <= 1) {
    const a = angleNonDroit();
    const [X, Y, val, pourquoi] = randomChoice([
      [Q, R, 180, `${Q} est consécutif à ${P} : ${180 - a}°. ${R} est opposé à ${P} : ${a}°. Somme : ${180 - a} + ${a} = 180°.`],
      [Q, T, 2 * (180 - a), `${Q} et ${T} sont consécutifs à ${P} : chacun mesure 180 − ${a} = ${180 - a}°. Somme : ${2 * (180 - a)}°.`],
      [R, T, 180, `${R} est opposé à ${P} : ${a}°. ${T} est consécutif à ${P} : ${180 - a}°. Somme : 180°.`],
      [R, P, 2 * a, `${R} est opposé à ${P} : ${a}°. Somme : ${a} + ${a} = ${2 * a}°.`],
    ] as [string, string, number, string][]);
    const nomA = randomChoice([`l’angle en ${P} mesure ${a}°`, `l’angle de sommet ${P} mesure ${a}°`]);
    return deg(val, `${intro} ${Maj(nomA)}. ${randomChoice([`Quelle est la somme des angles en ${X} et en ${Y} ?`, `Combien valent les angles en ${X} et en ${Y} réunis ?`])}`, pourquoi);
  }
  if (cas === 2) {
    const d = randomChoice([10, 20, 30, 40, 50, 60, 70, 80]);
    const grand = (180 + d) / 2;
    const [X, Y] = randomChoice([[P, Q], [Q, R], [R, T], [T, P]]);
    const demandeGrand = Math.random() < 0.5;
    return deg(
      demandeGrand ? grand : 180 - grand,
      `${intro} L’angle en ${X} mesure ${d}° de plus que l’angle en ${Y}. ${demandeGrand ? `Combien mesure l’angle en ${X} ?` : `Combien mesure l’angle en ${Y} ?`}`,
      `${X} et ${Y} sont consécutifs : leur somme fait 180°. Le plus grand vaut (180 + ${d}) ÷ 2 = ${grand}°, le plus petit 180 − ${grand} = ${180 - grand}°.`,
    );
  }
  if (cas === 3) {
    const k = randomChoice([2, 3, 4, 5]);
    const petit = 180 / (k + 1);
    const [X, Y] = randomChoice([[P, Q], [Q, R], [R, T], [T, P]]);
    const mot = k === 2 ? "le double" : k === 3 ? "le triple" : k === 4 ? "le quadruple" : "cinq fois";
    const demandeGrand = Math.random() < 0.5;
    return deg(
      demandeGrand ? k * petit : petit,
      `${intro} L’angle en ${X} mesure ${mot} de l’angle en ${Y}. ${demandeGrand ? `Combien mesure l’angle en ${X} ?` : `Combien mesure l’angle en ${Y} ?`}`,
      `${X} et ${Y} sont consécutifs : ensemble, ils font 180°, soit ${k + 1} fois l’angle en ${Y}. L’angle en ${Y} mesure 180 ÷ ${k + 1} = ${petit}°, l’angle en ${X} ${k * petit}°.`,
    );
  }
  // périmètre à rebours
  const u = o.u;
  const [x, y] = deuxLongueurs(o).map((v) => Math.round(v)) as [number, number];
  const per = 2 * (x + y);
  const [X, Y, Z] = randomChoice([[P, Q, R], [Q, R, T], [R, T, P], [T, P, Q]]);
  return {
    text: `${intro} Son périmètre est ${per} ${u} et ${lg(X, Y)} = ${x} ${u}. ${randomChoice([`Combien mesure ${lg(Y, Z)} ?`, `Quelle est la longueur de ${lg(Y, Z)} ?`])}`,
    format: "short" as const,
    expected: [`${y} ${u}`],
    comparator: "number_equal" as const,
    explanation: expl(`Les côtés opposés sont égaux : ${lg(X, Y)} + ${lg(Y, Z)} vaut la moitié du périmètre, ${per} ÷ 2 = ${x + y} ${u}. Donc ${lg(Y, Z)} = ${x + y} − ${x} = ${y} ${u}.`),
  };
}

/** Une information suffit-elle à affirmer « parallélogramme » ? */
function genDefiSuffit() {
  const s = nomPara();
  const N = s.join("");
  const [P, Q, R, T] = s;
  const I = centreDe(s);
  const a = randomInt(3, 9);
  let b = randomInt(3, 9);
  if (b === a) b = a + 1;
  const cas = randomChoice([
    { fait: `ses diagonales se coupent en leur milieu`, oui: true, pourquoi: "c’est la propriété caractéristique du parallélogramme." },
    { fait: `deux de ses côtés sont parallèles`, oui: false, pourquoi: "une seule paire parallèle peut donner un trapèze." },
    { fait: `deux de ses côtés opposés sont parallèles et de même longueur`, oui: true, pourquoi: "une paire de côtés opposés parallèles ET de même longueur suffit." },
    { fait: `ses quatre côtés ont la même longueur`, oui: true, pourquoi: "c’est un losange, et tout losange est un parallélogramme." },
    { fait: `ses diagonales sont perpendiculaires`, oui: false, pourquoi: "un cerf-volant a des diagonales perpendiculaires sans être un parallélogramme." },
    { fait: `ses diagonales ont la même longueur`, oui: false, pourquoi: "un trapèze isocèle a des diagonales de même longueur sans être un parallélogramme." },
    { fait: `ses diagonales [${[P, R].sort().join("")}] et [${[Q, T].sort().join("")}] se coupent en ${I}, avec ${lg(P, I)} = ${lg(R, I)} = ${a} cm et ${lg(Q, I)} = ${lg(T, I)} = ${b} cm`, oui: true, pourquoi: `${I} est le milieu des deux diagonales : elles se coupent en leur milieu.` },
    { fait: `ses diagonales [${[P, R].sort().join("")}] et [${[Q, T].sort().join("")}] se coupent en ${I}, avec ${lg(P, I)} = ${a} cm, ${lg(R, I)} = ${b} cm et ${lg(Q, I)} = ${lg(T, I)} = ${a} cm`, oui: false, pourquoi: `${I} n’est pas le milieu de ${seg(P, R)} (${a} cm et ${b} cm) : les diagonales ne se coupent pas en leur milieu.` },
    { fait: `(${lg(P, Q)}) et (${lg(R, T)}) sont parallèles, avec ${lg(P, Q)} = ${a} cm et ${lg(R, T)} = ${b} cm`, oui: false, pourquoi: `les côtés parallèles n’ont pas la même longueur (${a} cm et ${b} cm) : c’est un trapèze.` },
    { fait: `(${lg(P, Q)}) et (${lg(R, T)}) sont parallèles, avec ${lg(P, Q)} = ${lg(R, T)} = ${a} cm`, oui: true, pourquoi: "deux côtés opposés parallèles et de même longueur : c’est un parallélogramme." },
  ]);
  const vf = Math.random() < 0.35;
  const text = vf
    ? `Vrai ou faux ? Si un quadrilatère ${N} vérifie : ${cas.fait}, alors c’est un parallélogramme.`
    : randomChoice([
        `Du quadrilatère ${N}, on sait seulement que ${cas.fait}. Est-ce forcément un parallélogramme ?`,
        `Un quadrilatère ${N} a une seule propriété connue : ${cas.fait}. Est-ce forcément un parallélogramme ?`,
      ]);
  const [o, n] = vf ? ["vrai", "faux"] : ["oui", "non"];
  return { text, format: "qcm" as const, choices: [o, n], expected: [cas.oui ? o : n], comparator: "mcq_exact" as const, explanation: expl(`${cas.oui ? "Oui" : "Non"} : ${cas.pourquoi}`) };
}

export const parallelogrammesBank: TutorBankItemV4[] = [
  /* ===== PARA_RECONNAITRE ===== */
  {
    kind: "fixed",
    id: "para_reconnaitre_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "parallelogramme",
    microId: "para_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    text: "Qu’est-ce qui définit un parallélogramme ?",
    format: "qcm",
    choices: [
      "ses côtés opposés sont parallèles deux à deux",
      "ses quatre côtés sont égaux",
      "il a quatre angles droits",
      "ses diagonales sont perpendiculaires",
    ],
    expected: ["ses côtés opposés sont parallèles deux à deux"],
    comparator: "mcq_exact",
    hint: "Le mot est dans le nom de la figure.",
    explanation: expl(
      "Le nom le dit : dans un parallélogramme, les côtés qui se font face sont parallèles, et cela pour les deux paires. Tout le reste — côtés égaux, angles droits — découle de cette seule définition ou caractérise des cas particuliers.",
    ),
    tags: ["parallelogramme", "definition", "qcm"],
    canvas: paraCanvas(),
  },
  {
    kind: "fixed",
    id: "para_reconnaitre_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "parallelogramme",
    microId: "para_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    text: "Un quadrilatère n’a qu’UNE seule paire de côtés parallèles. Comment s’appelle-t-il ?",
    format: "qcm",
    choices: ["un trapèze", "un parallélogramme", "un losange", "un rectangle"],
    expected: ["un trapèze"],
    comparator: "mcq_exact",
    hint: "Il en manque une paire pour être un parallélogramme.",
    explanation: expl(
      "Avec une seule paire de côtés parallèles, c’est un trapèze. Il faut LES DEUX paires pour un parallélogramme : c’est le piège le plus courant quand on regarde une figure de travers.",
    ),
    tags: ["parallelogramme", "piege", "trapeze", "qcm"],
    canvas: paraCanvas({ variante: "trapeze" }),
  },
  {
    kind: "fixed",
    id: "para_reconnaitre_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "parallelogramme",
    microId: "para_reconnaitre",
    difficulty: 4,
    theme: "neutral",
    text: "Un carré est-il un parallélogramme ?",
    format: "qcm",
    choices: ["oui", "non", "seulement s’il est penché", "on ne peut pas dire"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Reprends la définition et vérifie-la sur le carré.",
    explanation: expl(
      "Dans un carré, les côtés opposés sont bien parallèles deux à deux : il vérifie donc la définition. Un carré est un parallélogramme — un parallélogramme très particulier, mais un parallélogramme quand même.",
    ),
    tags: ["parallelogramme", "inclusion", "raisonnement", "qcm"],
    canvas: paraCanvas({ variante: "carre" }),
  },
  {
    kind: "fixed",
    id: "para_reconnaitre_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "parallelogramme",
    microId: "para_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric). Avant : « Explique comment vérifier… ».
    text: "Pour être un parallélogramme, combien de paires de côtés parallèles faut-il ? Réponds par un nombre.",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    hint: "Avec une seule paire, c’est un trapèze.",
    explanation: expl(
      "Il faut 2 paires de côtés parallèles. Avec une seule paire, c’est un trapèze. Sur une figure, le codage (des petites flèches) montre les côtés parallèles.",
    ),
    tags: ["parallelogramme", "short", "methode"],
    canvas: paraCanvas(),
  },
  {
    kind: "template",
    id: "para_reconnaitre_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "parallelogramme",
    microId: "para_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    hint: "Compte les paires de côtés parallèles.",
    tags: ["parallelogramme", "template", "canvas"],
    // 09/10/2026 : un nom tiré, un objet réel, une tournure ; la figure est
    // dessinée à des proportions tirées (le trapèze n'a qu'une paire parallèle).
    generate: () => {
      const cas = randomChoice([
        { v: "quelconque" as const, oui: true, pourquoi: "les deux paires de côtés opposés portent le même codage : ils sont parallèles deux à deux." },
        { v: "trapeze" as const, oui: false, pourquoi: "une seule paire de côtés est parallèle : c’est un trapèze, pas un parallélogramme." },
        { v: "trapeze" as const, oui: false, pourquoi: "seuls deux côtés portent le codage des parallèles : il manque la deuxième paire. C’est un trapèze." },
        { v: "losange" as const, oui: true, pourquoi: "les deux paires de côtés opposés sont parallèles : le losange est un parallélogramme aux quatre côtés égaux." },
        { v: "rectangle" as const, oui: true, pourquoi: "les deux paires de côtés opposés sont parallèles : le rectangle est un parallélogramme à angles droits." },
      ]);
      const s = nomPara();
      const N = s.join("");
      const objet = randomChoice([
        "Une dalle de terrasse", "Une pièce de puzzle", "Un autocollant", "Une plaque de métal", "Une étiquette",
        "Un badge brodé", "Une tuile de mosaïque", "Un tapis", "Une parcelle de jardin", "Une planche découpée",
        "Une voile de bateau", "Un panneau de signalisation", "Une fenêtre de toit",
      ]);
      const p = randomChoice(PRENOMS);
      const question = randomChoice([
        `Le quadrilatère ${N} est-il un parallélogramme ?`,
        `Peut-on dire que ${N} est un parallélogramme ?`,
        `D’après le codage, ${N} est-il un parallélogramme ?`,
        `${p.nom} dit que ${N} est un parallélogramme. Est-ce juste ?`,
      ]);
      const intro = randomChoice([
        `${objet} a la forme du quadrilatère ${N} dessiné ci-contre, avec son codage.`,
        `Voici le quadrilatère ${N}. Les petites flèches codent les côtés parallèles.`,
        `${objet} est dessinée sur la figure : c’est le quadrilatère ${N}.`.replace(/^(Un .*?) est dessinée/, "$1 est dessiné"),
        `On a codé la figure du quadrilatère ${N} : les côtés parallèles portent les mêmes flèches.`,
      ]);
      const oui = question.startsWith(p.nom) ? "oui, c’est juste" : "oui";
      const non = question.startsWith(p.nom) ? "non, c’est faux" : "non";
      const rep = cas.oui ? oui : non;
      return {
        text: `${intro} ${question}`,
        format: "qcm",
        choices: makeChoices(rep, [oui, non, "seulement si on le redresse", "on ne peut pas savoir"]),
        expected: [rep],
        comparator: "mcq_exact",
        explanation: expl(`Dans ${N}, ${cas.pourquoi}`),
        canvas: figurePara(s, { variante: cas.v, long: [randomInt(14, 22) / 10, 1], angle0: randomInt(55, 75) }),
      };
    },
  },
  {
    // 09/10/2026 : l'étoile 1 n'avait qu'un item figé (17 à 19 répétitions sur 20).
    kind: "template",
    id: "para_reconnaitre_tpl_vocabulaire",
    niveau: "5e",
    matiere: "maths",
    notionId: "parallelogramme",
    microId: "para_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    hint: "Les côtés opposés se font face ; les diagonales relient deux sommets opposés.",
    tags: ["parallelogramme", "vocabulaire", "qcm", "template", "canvas"],
    generate: () => {
      const s = nomPara();
      const N = s.join("");
      const o = randomChoice(OBJETS_PARA);
      const [P, Q, R, T] = s;
      const cas = randomChoice([
        () => {
          const q = randomChoice([
            `Quel côté est opposé au côté ${seg(P, Q)} ?`,
            `Quel côté fait face au côté ${seg(P, Q)} ?`,
            `Quel côté est parallèle au côté ${seg(P, Q)} ?`,
            `Avec quel côté le côté ${seg(P, Q)} est-il parallèle ?`,
          ]);
          return { q, rep: seg(R, T), leurres: [seg(Q, R), seg(T, P), seg(P, R)], pourquoi: `Dans ${N}, le côté ${seg(P, Q)} fait face au côté ${seg(R, T)} : ce sont deux côtés opposés, donc parallèles.` };
        },
        () => {
          const q = randomChoice([
            `Quel est le sommet opposé au sommet ${Q} ?`,
            `Quel sommet fait face au sommet ${Q} ?`,
            `Quel sommet n’est pas voisin du sommet ${Q} ?`,
          ]);
          return { q, rep: T, leurres: [P, R, Q], pourquoi: `Dans le nom ${N}, les voisins de ${Q} sont ${P} et ${R}. Le sommet opposé à ${Q} est ${T}.` };
        },
        () => {
          const q = randomChoice([`Quelles sont ses diagonales ?`, `Quels segments sont ses diagonales ?`, `Nomme ses deux diagonales.`]);
          return {
            q,
            rep: `${seg(P, R)} et ${seg(Q, T)}`,
            leurres: [`${seg(P, Q)} et ${seg(R, T)}`, `${seg(Q, R)} et ${seg(T, P)}`, `${seg(P, R)} et ${seg(P, Q)}`],
            pourquoi: `Une diagonale relie deux sommets opposés : ${P} et ${R}, puis ${Q} et ${T}. Les diagonales sont ${seg(P, R)} et ${seg(Q, T)}.`,
          };
        },
      ])();
      return {
        text: `${o.intro(N)} ${cas.q}`,
        format: "qcm",
        choices: makeChoices(cas.rep, cas.leurres),
        expected: [cas.rep],
        comparator: "mcq_exact",
        explanation: expl(cas.pourquoi),
        canvas: figurePara(s, { long: [randomInt(14, 22) / 10, 1], angle0: randomInt(55, 75), diagonales: cas.q.includes("diagonales") }),
      };
    },
  },

  /* ===== PARA_COTES_ANGLES ===== */
  {
    kind: "fixed",
    id: "para_cotes_angles_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "parallelogramme",
    microId: "para_cotes_angles",
    difficulty: 2,
    theme: "neutral",
    text: "Dans un parallélogramme, que peut-on dire de deux côtés opposés ?",
    format: "qcm",
    choices: [
      "ils ont la même longueur",
      "ils sont perpendiculaires",
      "l’un est le double de l’autre",
      "on ne peut rien dire",
    ],
    expected: ["ils ont la même longueur"],
    comparator: "mcq_exact",
    hint: "Deux côtés qui se font face.",
    explanation: expl(
      "Dans un parallélogramme, les côtés opposés sont non seulement parallèles, mais aussi de même longueur. C’est cette propriété qui permet de calculer un côté sans le mesurer.",
    ),
    tags: ["parallelogramme", "cotes", "propriete", "qcm"],
    canvas: paraCanvas(),
  },
  {
    kind: "fixed",
    id: "para_cotes_angles_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "parallelogramme",
    microId: "para_cotes_angles",
    difficulty: 3,
    theme: "neutral",
    text: "Dans un parallélogramme, deux angles CONSÉCUTIFS ont pour somme...",
    format: "qcm",
    choices: ["180°", "90°", "360°", "ils sont égaux"],
    expected: ["180°"],
    comparator: "mcq_exact",
    hint: "Deux côtés parallèles coupés par un troisième : que sais-tu des angles ?",
    explanation: expl(
      "Deux angles consécutifs sont deux angles internes situés du même côté d’une sécante qui coupe deux parallèles : ils sont supplémentaires, donc leur somme fait 180°. Les angles OPPOSÉS, eux, sont égaux.",
    ),
    tags: ["parallelogramme", "angles", "propriete", "qcm"],
    canvas: paraCanvas({ angleLabels: { A: "?", B: "?" } }),
  },
  {
    kind: "fixed",
    id: "para_cotes_angles_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "parallelogramme",
    microId: "para_cotes_angles",
    difficulty: 4,
    theme: "neutral",
    text: "Dans le parallélogramme ABCD, l’angle en A mesure 70°. Combien mesure l’angle en C ? Réponds par un nombre.",
    format: "short",
    expected: ["70"],
    comparator: "number_equal",
    hint: "A et C se font face.",
    explanation: expl(
      "A et C sont des angles opposés : ils ont la même mesure. L’angle en C mesure donc 70°. Attention à ne pas confondre avec B et D, qui mesurent chacun 180 - 70 = 110°.",
    ),
    tags: ["parallelogramme", "angles", "canvas"],
    canvas: paraCanvas({ angleLabels: { A: "70°", C: "?" } }),
  },
  {
    kind: "fixed",
    id: "para_cotes_angles_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "parallelogramme",
    microId: "para_cotes_angles",
    difficulty: 5,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric). Avant : « tous les angles sont égaux », explique l'erreur.
    text: "Un élève dit : « dans un parallélogramme, tous les angles sont égaux ». Dans ABCD, l’angle en A mesure 65°. Combien mesure l’angle en B ?",
    format: "short",
    expected: ["115"],
    comparator: "number_equal",
    hint: "A et B sont consécutifs : leur somme fait 180°.",
    explanation: expl(
      "A et B sont consécutifs. Leur somme fait 180°. 180 − 65 = 115. L’angle en B mesure 115°, pas 65°. L’élève se trompe : seuls les angles opposés sont égaux.",
    ),
    tags: ["parallelogramme", "angles", "short", "piege"],
    canvas: paraCanvas({ angleLabels: { A: "65°", B: "?" } }),
  },
  {
    kind: "template",
    id: "para_cotes_angles_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "parallelogramme",
    microId: "para_cotes_angles",
    difficulty: 4,
    theme: "neutral",
    hint: "Angles opposés : égaux. Angles consécutifs : leur somme fait 180°.",
    tags: ["parallelogramme", "angles", "template", "canvas"],
    // 09/10/2026 : nom tiré, objet réel, trois façons de nommer un angle, le
    // sommet demandé opposé OU voisin (des deux côtés) ; figure à l'angle juste.
    generate: () => {
      const s = nomPara();
      const N = s.join("");
      const a = angleNonDroit();
      const d = randomChoice([2, 1, 3]); // 2 : opposé ; 1 ou 3 : consécutif
      const res = d === 2 ? a : 180 - a;
      const o = randomChoice(OBJETS_PARA);
      const donne = nomAngle(s, 0, randomInt(0, 2));
      const cible = nomAngle(s, d, randomInt(0, 2));
      const q = randomChoice([
        `Combien mesure ${cible} ?`,
        `Quelle est la mesure de ${cible} ?`,
        `Calcule la mesure de ${cible}.`,
        `Sans rapporteur, trouve la mesure de ${cible}.`,
      ]);
      return {
        text: `${o.intro(N)} ${donne.charAt(0).toUpperCase() + donne.slice(1)} mesure ${a}°. ${q}`,
        format: "short",
        expected: [`${res}°`],
        comparator: "number_equal",
        explanation: expl(
          d === 2
            ? `${s[0]} et ${s[2]} ne sont pas voisins dans le nom ${N} : ce sont des sommets opposés. Deux angles opposés sont égaux : l’angle en ${s[2]} mesure ${a}°.`
            : `${s[0]} et ${s[d]} sont voisins dans le nom ${N} : ce sont des angles consécutifs. Leur somme fait 180°. 180 − ${a} = ${res}. L’angle en ${s[d]} mesure ${res}°.`,
        ),
        canvas: figurePara(s, { long: [randomInt(14, 20) / 10, 1], angle0: a, angles: { 0: `${a}°`, [d]: "?" } }),
      };
    },
  },
  {
    kind: "template",
    id: "para_cotes_angles_tpl_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "parallelogramme",
    microId: "para_cotes_angles",
    difficulty: 4,
    theme: "neutral",
    hint: "Cherche le côté qui fait face à celui demandé.",
    tags: ["parallelogramme", "cotes", "short", "template"],
    // 08/10/2026 : précise et simple (Frédéric). Avant : « Explique comment tu trouves CD ».
    // Désormais on demande CD ou DA ; AB ≠ BC pour que le leurre (l'autre côté) se voie.
    // 09/10/2026 : nom tiré, objet réel (son unité, ses longueurs), deux
    // écritures d'une longueur, quatre tournures ; figure aux bonnes proportions.
    generate: () => {
      const s = nomPara();
      const N = s.join("");
      const o = randomChoice(OBJETS_PARA);
      const [x, y] = deuxLongueurs(o); // x = s0s1, y = s1s2
      const demande = randomChoice([2, 3] as const); // côté s2s3 (opposé à s0s1) ou s3s0 (opposé à s1s2)
      const rep = demande === 2 ? x : y;
      const c1 = randomChoice([`${s[0]}${s[1]} = ${fr(x)} ${o.u}`, `[${s[0]}${s[1]}] mesure ${fr(x)} ${o.u}`]);
      const c2 = randomChoice([`${s[1]}${s[2]} = ${fr(y)} ${o.u}`, `[${s[1]}${s[2]}] mesure ${fr(y)} ${o.u}`]);
      const cible = demande === 2 ? `${s[2]}${s[3]}` : `${s[3]}${s[0]}`;
      const q = randomChoice([
        `Combien mesure ${cible} ?`,
        `Quelle est la longueur du côté [${cible}] ?`,
        `Donne la longueur ${cible}.`,
        `Sans mesurer, trouve la longueur ${cible}.`,
      ]);
      const face = demande === 2 ? `${s[0]}${s[1]}` : `${s[1]}${s[2]}`;
      return {
        text: `${o.intro(N)} On sait que ${c1} et ${c2}. ${q}`,
        format: "short",
        expected: [`${fr(rep)} ${o.u}`],
        comparator: "number_equal",
        explanation: expl(`[${cible}] fait face à [${face}]. Deux côtés opposés ont la même longueur. ${cible} = ${face} = ${fr(rep)} ${o.u}.`),
        canvas: figurePara(s, {
          long: [x, y],
          angle0: randomInt(55, 75),
          cotes: { 0: `${fr(x)} ${o.u}`, 1: `${fr(y)} ${o.u}`, [demande]: "?" },
        }),
      };
    },
  },

  /* ===== PARA_DIAGONALES ===== */
  {
    kind: "fixed",
    id: "para_diagonales_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "parallelogramme",
    microId: "para_diagonales",
    difficulty: 2,
    theme: "neutral",
    text: "Dans un parallélogramme, que font les diagonales ?",
    format: "qcm",
    choices: [
      "elles se coupent en leur milieu",
      "elles ont la même longueur",
      "elles sont perpendiculaires",
      "elles ne se croisent pas",
    ],
    expected: ["elles se coupent en leur milieu"],
    comparator: "mcq_exact",
    hint: "Le point de croisement partage chaque diagonale en deux.",
    explanation: expl(
      "Les diagonales d’un parallélogramme se coupent en leur milieu. Ce point de croisement est le centre de la figure. Elles n’ont pas forcément la même longueur — ça, c’est le rectangle — ni ne sont perpendiculaires — ça, c’est le losange.",
    ),
    tags: ["parallelogramme", "diagonales", "propriete", "qcm"],
    canvas: paraCanvas({ diagonales: true }),
  },
  {
    kind: "fixed",
    id: "para_diagonales_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "parallelogramme",
    microId: "para_diagonales",
    difficulty: 3,
    theme: "neutral",
    text: "Combien un parallélogramme a-t-il de centres de symétrie ? Réponds par un nombre.",
    format: "short",
    expected: ["1"],
    comparator: "number_equal",
    hint: "Pense au point où les diagonales se croisent.",
    explanation: expl(
      "Un parallélogramme a exactement un centre de symétrie : le point de croisement de ses diagonales. Un demi-tour autour de ce point ramène la figure exactement sur elle-même.",
    ),
    tags: ["parallelogramme", "diagonales", "symetrie", "remarquable"],
    canvas: paraCanvas({ diagonales: true }),
  },
  {
    kind: "fixed",
    id: "para_diagonales_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "parallelogramme",
    microId: "para_diagonales",
    difficulty: 4,
    theme: "neutral",
    text: "Les diagonales d’un parallélogramme se coupent en O. On sait que AO = 4 cm. Combien mesure la diagonale AC ? Réponds par un nombre.",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "O est le milieu de AC.",
    explanation: expl(
      "O est le milieu de la diagonale AC, donc OC mesure autant que AO, soit 4 cm. La diagonale entière vaut AO + OC = 4 + 4 = 8 cm.",
    ),
    tags: ["parallelogramme", "diagonales", "canvas"],
    canvas: paraCanvas({ diagonales: true }),
  },
  {
    kind: "fixed",
    id: "para_diagonales_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "parallelogramme",
    microId: "para_diagonales",
    difficulty: 5,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric). Avant : « Explique le lien entre le centre de symétrie et les diagonales ».
    text: "Les diagonales du parallélogramme ABCD se coupent en O. Quel est le symétrique de A par rapport à O ?",
    format: "qcm",
    choices: ["C", "B", "D"],
    expected: ["C"],
    comparator: "mcq_exact",
    hint: "Fais un demi-tour autour de O : A va sur le sommet d’en face.",
    explanation: expl(
      "O est le milieu de la diagonale [AC]. Un demi-tour autour de O envoie A sur C. Le point O est le centre de symétrie du parallélogramme.",
    ),
    tags: ["parallelogramme", "diagonales", "qcm", "symetrie"],
    canvas: paraCanvas({ diagonales: true }),
  },
  {
    kind: "template",
    id: "para_diagonales_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "parallelogramme",
    microId: "para_diagonales",
    difficulty: 4,
    theme: "neutral",
    hint: "Le point de croisement est le milieu de chaque diagonale.",
    tags: ["parallelogramme", "diagonales", "template", "canvas"],
    // 13/10/2026 : deux demi-diagonales données (une seule sert), somme, écart ; figure à leurs mesures.
    generate: () => genDiagonales(4),
  },
  {
    kind: "template",
    id: "para_diagonales_tpl_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "parallelogramme",
    microId: "para_diagonales",
    difficulty: 5,
    theme: "neutral",
    hint: "Le point de croisement est le milieu de la diagonale.",
    tags: ["parallelogramme", "diagonales", "short", "template"],
    // 08/10/2026 : précise et simple (Frédéric). Avant : « Explique comment tu trouves la distance… ».
    // Des noms de sommets variés (EFGH, MNPQ…) ; la diagonale entière est donnée, on demande la moitié.
    // 13/10/2026 : périmètre du triangle formé avec le centre, symétrique d'un côté.
    generate: () => genDiagonales(5),
  },

  /* ===== PARA_PARTICULIERS ===== */
  {
    kind: "fixed",
    id: "para_particuliers_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "parallelogramme",
    microId: "para_particuliers",
    difficulty: 3,
    theme: "neutral",
    text: "Un parallélogramme dont les quatre côtés sont égaux s’appelle...",
    format: "qcm",
    choices: ["un losange", "un rectangle", "un trapèze", "un carré"],
    expected: ["un losange"],
    comparator: "mcq_exact",
    hint: "Ses angles ne sont pas forcément droits.",
    explanation: expl(
      "Quatre côtés égaux font un losange. Attention : ce n’est un carré que si, EN PLUS, ses angles sont droits. Un losange penché reste un losange.",
    ),
    tags: ["parallelogramme", "losange", "qcm"],
    canvas: paraCanvas({ variante: "losange" }),
  },
  {
    kind: "fixed",
    id: "para_particuliers_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "parallelogramme",
    microId: "para_particuliers",
    difficulty: 3,
    theme: "neutral",
    text: "Un parallélogramme qui a un angle droit est forcément...",
    format: "qcm",
    choices: ["un rectangle", "un losange", "un carré", "un trapèze"],
    expected: ["un rectangle"],
    comparator: "mcq_exact",
    hint: "Que deviennent les trois autres angles ?",
    explanation: expl(
      "Un seul angle droit suffit. L’angle opposé lui est égal, donc droit aussi. Les deux angles consécutifs valent 180 - 90 = 90°. Les quatre angles sont droits : c’est un rectangle.",
    ),
    tags: ["parallelogramme", "rectangle", "raisonnement", "qcm"],
    canvas: paraCanvas({ variante: "rectangle" }),
  },
  {
    kind: "fixed",
    id: "para_particuliers_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "parallelogramme",
    microId: "para_particuliers",
    difficulty: 5,
    theme: "neutral",
    text: "Un parallélogramme a ses diagonales de même longueur ET perpendiculaires. C’est...",
    format: "qcm",
    choices: ["un carré", "un rectangle", "un losange", "un trapèze"],
    expected: ["un carré"],
    comparator: "mcq_exact",
    hint: "Chaque condition donne une figure. Que donnent les deux ensemble ?",
    explanation: expl(
      "Des diagonales de même longueur font un rectangle. Des diagonales perpendiculaires font un losange. Les deux à la fois : la figure est rectangle ET losange, donc un carré.",
    ),
    tags: ["parallelogramme", "carre", "diagonales", "raisonnement", "qcm"],
    canvas: paraCanvas({ variante: "carre", diagonales: true }),
  },
  {
    kind: "fixed",
    id: "para_particuliers_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "parallelogramme",
    microId: "para_particuliers",
    difficulty: 5,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric). Avant : « Explique pourquoi tout carré est un losange, mais… ».
    text: "ABCD est un losange. Son angle en A mesure 70°. Est-ce un carré ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Un carré a quatre angles droits.",
    explanation: expl(
      "Un carré a quatre côtés égaux ET quatre angles droits. Ce losange a un angle de 70°, pas de 90°. Ce n’est pas un carré. Un losange n’est pas toujours un carré. Mais un carré est toujours un losange.",
    ),
    tags: ["parallelogramme", "qcm", "inclusion", "raisonnement"],
    canvas: paraCanvas({ variante: "losange", angleLabels: { A: "70°" } }),
  },
  {
    kind: "template",
    id: "para_particuliers_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "parallelogramme",
    microId: "para_particuliers",
    difficulty: 4,
    theme: "neutral",
    hint: "Côtés égaux → losange. Angles droits → rectangle. Les deux → carré.",
    tags: ["parallelogramme", "particuliers", "template"],
    // 13/10/2026 : les propriétés en mesures (losange de côté…, carré de périmètre…, diagonales du rectangle).
    generate: () => genParticuliers(4),
  },
  {
    kind: "template",
    id: "para_particuliers_tpl_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "parallelogramme",
    microId: "para_particuliers",
    difficulty: 5,
    theme: "neutral",
    hint: "Regarde ce que chaque figure exige : côtés égaux, angles droits.",
    tags: ["parallelogramme", "particuliers", "qcm", "template"],
    // 08/10/2026 : précise et simple (Frédéric). Avant : « Est-ce que… forcément… ? Explique. ».
    // Désormais un QCM oui / non, avec deux cas « non » (le rectangle, le losange ne sont pas des carrés).
    // 13/10/2026 : onze inclusions (vrai / faux, oui / non), le losange à angle droit, le rectangle à côtés égaux.
    generate: () => genParticuliers(5),
  },

  /* ===== PARA_CONSTRUIRE ===== */
  {
    kind: "fixed",
    id: "para_construire_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "parallelogramme",
    microId: "para_construire",
    difficulty: 3,
    theme: "neutral",
    text: "On connaît trois sommets A, B et C d’un parallélogramme ABCD. Comment placer D le plus simplement ?",
    format: "qcm",
    choices: [
      "en prenant le symétrique de B par rapport au milieu de AC",
      "au hasard, pourvu que la figure soit fermée",
      "à égale distance de A et de C",
      "en traçant un cercle de centre B",
    ],
    expected: ["en prenant le symétrique de B par rapport au milieu de AC"],
    comparator: "mcq_exact",
    hint: "Les diagonales se coupent en leur milieu.",
    explanation: expl(
      "Les diagonales AC et BD se coupent en leur milieu. On place donc le milieu de AC, puis on prend le symétrique de B par rapport à ce point : c’est D. Une seule construction, aucun tâtonnement.",
    ),
    tags: ["parallelogramme", "construire", "qcm"],
    canvas: paraCanvas({ diagonales: true }),
  },
  {
    kind: "fixed",
    id: "para_construire_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "parallelogramme",
    microId: "para_construire",
    difficulty: 4,
    theme: "neutral",
    text: "Pour construire un parallélogramme dont on connaît deux côtés consécutifs et l’angle entre eux, quel instrument ouvre l’angle ?",
    format: "qcm",
    choices: ["le rapporteur", "le compas", "l’équerre", "la calculatrice"],
    expected: ["le rapporteur"],
    comparator: "mcq_exact",
    hint: "On ouvre un angle, on ne reporte pas une longueur.",
    explanation: expl(
      "Le rapporteur sert à ouvrir l’angle donné entre les deux côtés. La règle trace les longueurs, le compas les reporte pour placer le quatrième sommet.",
    ),
    tags: ["parallelogramme", "construire", "instrument", "qcm"],
  },
  {
    kind: "fixed",
    id: "para_construire_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "parallelogramme",
    microId: "para_construire",
    difficulty: 5,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric). Avant : « Décris les étapes pour construire ABCD… ».
    text: "On construit le parallélogramme ABCD : AB = 6 cm, BC = 4 cm, angle en B de 60°. A, B et C sont tracés. À quelle distance de C faut-il placer D ?",
    format: "short",
    expected: ["6 cm", "6"],
    comparator: "number_equal",
    hint: "[CD] fait face à [AB].",
    explanation: expl(
      "On trace AB = 6 cm, puis l’angle de 60° en B au rapporteur, puis BC = 4 cm. Pour D : [CD] fait face à [AB], donc CD = 6 cm. On trace un arc de compas de 6 cm autour de C. (Et un arc de 4 cm autour de A.)",
    ),
    tags: ["parallelogramme", "construire", "short", "methode"],
    canvas: paraCanvas({ angleLabels: { B: "60°" }, sideLabels: { AB: "6 cm", BC: "4 cm", CD: "?" } }),
  },
  {
    kind: "template",
    id: "para_construire_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "parallelogramme",
    microId: "para_construire",
    difficulty: 4,
    theme: "neutral",
    hint: "Les côtés opposés sont égaux : le quatrième sommet est à distance connue des deux autres.",
    tags: ["parallelogramme", "construire", "template"],
    // 13/10/2026 : noms tirés ; où placer le 4e sommet, rayon du compas, symétrique par le centre, instrument.
    // (bc ≠ ab : avec deux côtés égaux, les pièges s'écrivaient avec le même nombre.)
    generate: () => genConstruire(4),
  },
  {
    kind: "template",
    id: "para_construire_tpl_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "parallelogramme",
    microId: "para_construire",
    difficulty: 5,
    theme: "neutral",
    hint: "Côtés opposés : même longueur. Angles consécutifs : 180° à eux deux.",
    tags: ["parallelogramme", "construire", "short", "template"],
    // 08/10/2026 : précise et simple (Frédéric). Avant : « Explique comment construire ABCD avec AB et un angle en A ».
    // Désormais une mesure à préparer pour la construction : CD, l'angle en B ou l'angle en C.
    // 13/10/2026 : noms tirés, angle donné en P ou en Q, côté, angle ou périmètre ; figure à ses mesures.
    generate: () => genConstruire(5),
  },

  /* ===== PARA_DEFI ===== */
  {
    kind: "fixed",
    id: "para_defi_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "parallelogramme",
    microId: "para_defi",
    difficulty: 5,
    theme: "reunion",
    text: "Un charpentier de Saint-Louis assemble un cadre en bois. Il veut vérifier qu’il est bien rectangulaire, sans équerre. Il mesure les deux diagonales et trouve la même longueur. Que peut-il conclure, sachant que les côtés opposés du cadre sont déjà égaux ?",
    format: "qcm",
    choices: [
      "le cadre est bien un rectangle",
      "le cadre est un losange",
      "le cadre est un carré",
      "il ne peut rien conclure",
    ],
    expected: ["le cadre est bien un rectangle"],
    comparator: "mcq_exact",
    hint: "Côtés opposés égaux : c’est déjà un parallélogramme. Que dit l’égalité des diagonales ?",
    explanation: expl(
      "Des côtés opposés égaux deux à deux font déjà un parallélogramme. Dans un parallélogramme, des diagonales de même longueur caractérisent le rectangle. Le charpentier peut donc conclure sans équerre — c’est la méthode que les menuisiers utilisent vraiment.",
    ),
    tags: ["parallelogramme", "defi", "reunion", "diagonales", "qcm"],
  },
  {
    kind: "fixed",
    id: "para_defi_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "parallelogramme",
    microId: "para_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Dans un parallélogramme, la somme des quatre angles vaut... Réponds par un nombre.",
    format: "short",
    expected: ["360"],
    comparator: "number_equal",
    hint: "Deux angles consécutifs font 180°. Et il y a deux paires.",
    explanation: expl(
      "Deux angles consécutifs sont supplémentaires : leur somme fait 180°. Il y a deux paires de ce type, donc 180 + 180 = 360°. C’est vrai dans tout quadrilatère, mais ici on le démontre sans rien mesurer.",
    ),
    tags: ["parallelogramme", "defi", "angles", "remarquable"],
  },
  {
    kind: "fixed",
    id: "para_defi_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "parallelogramme",
    microId: "para_defi",
    difficulty: 5,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric). Avant : « Explique pourquoi il suffit que les diagonales se coupent en leur milieu ».
    text: "Les diagonales [EG] et [FH] du quadrilatère EFGH se coupent en I. EI = IG = 5 cm et FI = IH = 3 cm. EFGH est-il un parallélogramme ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "I est-il le milieu des deux diagonales ?",
    explanation: expl(
      "EI = IG : I est le milieu de [EG]. FI = IH : I est le milieu de [FH]. Les diagonales se coupent en leur milieu. Cela suffit : EFGH est un parallélogramme. Les diagonales n’ont pas besoin d’avoir la même longueur.",
    ),
    tags: ["parallelogramme", "defi", "qcm", "raisonnement", "reciproque"],
  },
  {
    kind: "template",
    id: "para_defi_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "parallelogramme",
    microId: "para_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Trouve d’abord l’angle voisin, puis additionne ce qu’on te demande.",
    tags: ["parallelogramme", "defi", "angles", "template"],
    // 13/10/2026 : sommes d'angles, angles liés (« 40° de plus », « le triple »), périmètre à rebours ; objets réels.
    generate: () => genDefiMesures(),
  },
  {
    kind: "template",
    id: "para_defi_tpl_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "parallelogramme",
    microId: "para_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Pense à un trapèze, à un cerf-volant : vérifient-ils aussi cette propriété ?",
    tags: ["parallelogramme", "defi", "qcm", "template"],
    // 08/10/2026 : précise et simple (Frédéric). Avant : « Cela suffit-il ? Explique. » au mot-clé.
    // Désormais QCM oui / non ; deux cas « non » ajoutés (diagonales perpendiculaires, de même longueur).
    // 13/10/2026 : dix informations (dont des mesures de diagonales et de côtés), oui / non, vrai / faux, noms tirés.
    generate: () => genDefiSuffit(),
  },

  /* ===== GÉNÉRATEURS DU 29/09/2026 — L'ÉVALUATION PAR CHAPITRES =====
     Le mode Révision (difficultés 1 à 3) n'offrait que 11 questions
     distinctes sur « Parallélogrammes » : presque tout était en défi. Sept
     générateurs qui appliquent UNE propriété à la fois — côtés opposés, angles
     opposés, diagonales, centre de symétrie, cas particuliers, reconnaissance
     — avec des noms de sommets et des mesures qui changent à chaque tirage. */
  {
    kind: "template",
    id: "para_cotes_angles_tpl_cote_oppose",
    niveau: "5e",
    matiere: "maths",
    notionId: "parallelogramme",
    microId: "para_cotes_angles",
    difficulty: 2,
    theme: "neutral",
    hint: "Dans un parallélogramme, deux côtés opposés ont la même longueur.",
    tags: ["parallelogramme", "cotes", "template"],
    generate: () => {
      const s = sommetsPara();
      const [P, Q, R, T] = tourner(s, randomInt(0, 3));
      const a = demi();
      let b = demi();
      if (b === a) b = a + 1;
      const [cherche, rep, face] = randomChoice([
        [lg(R, T), a, lg(P, Q)],
        [lg(T, P), b, lg(Q, R)],
      ] as Array<[string, number, string]>);
      return {
        text: `Dans le parallélogramme ${s.join("")}, ${lg(P, Q)} = ${fr(a)} cm et ${lg(Q, R)} = ${fr(b)} cm. Combien mesure ${cherche} ?`,
        format: "short",
        expected: [`${fr(rep)} cm`],
        comparator: "number_equal",
        explanation: expl(`[${cherche}] est le côté opposé à [${face}]. Dans un parallélogramme, les côtés opposés ont la même longueur : ${cherche} = ${face} = ${fr(rep)} cm.`),
      };
    },
  },
  {
    kind: "template",
    id: "para_cotes_angles_tpl_angle_oppose",
    niveau: "5e",
    matiere: "maths",
    notionId: "parallelogramme",
    microId: "para_cotes_angles",
    difficulty: 2,
    theme: "neutral",
    hint: "Deux angles opposés d’un parallélogramme ont la même mesure.",
    tags: ["parallelogramme", "angles", "template"],
    generate: () => {
      const s = sommetsPara();
      const [P, , R] = tourner(s, randomInt(0, 3));
      let a = randomInt(35, 145);
      if (a === 90) a = 72;
      return {
        text: `Dans le parallélogramme ${s.join("")}, l’angle en ${P} mesure ${a}°. Combien mesure l’angle en ${R} ?`,
        format: "short",
        expected: [`${a}°`],
        comparator: "number_equal",
        explanation: expl(`${P} et ${R} ne sont pas voisins dans le nom ${s.join("")} : ce sont des sommets opposés. Dans un parallélogramme, deux angles opposés sont égaux : l’angle en ${R} mesure ${a}°.`),
      };
    },
  },
  {
    kind: "template",
    id: "para_cotes_angles_tpl_perimetre",
    niveau: "5e",
    matiere: "maths",
    notionId: "parallelogramme",
    microId: "para_cotes_angles",
    difficulty: 3,
    theme: "neutral",
    hint: "On ne connaît que deux côtés, mais les deux autres leur sont égaux.",
    tags: ["parallelogramme", "cotes", "perimetre", "template"],
    generate: () => {
      const s = sommetsPara();
      const [P, Q, R] = tourner(s, randomInt(0, 3));
      const a = demi();
      let b = demi();
      if (b === a) b = a + 1.5;
      const perimetre = 2 * (a + b);
      return {
        text: `Dans le parallélogramme ${s.join("")}, ${lg(P, Q)} = ${fr(a)} cm et ${lg(Q, R)} = ${fr(b)} cm. Quel est son périmètre ?`,
        format: "short",
        expected: [`${fr(perimetre)} cm`],
        comparator: "number_equal",
        explanation: expl(`Les côtés opposés sont égaux : le parallélogramme a deux côtés de ${fr(a)} cm et deux côtés de ${fr(b)} cm. Périmètre : 2 × (${fr(a)} + ${fr(b)}) = 2 × ${fr(a + b)} = ${fr(perimetre)} cm.`),
      };
    },
  },
  {
    kind: "template",
    id: "para_diagonales_tpl_milieu",
    niveau: "5e",
    matiere: "maths",
    notionId: "parallelogramme",
    microId: "para_diagonales",
    difficulty: 2,
    theme: "neutral",
    hint: "Les diagonales d’un parallélogramme se coupent en leur milieu.",
    tags: ["parallelogramme", "diagonales", "template"],
    // 13/10/2026 : objets réels, centre tiré, tournures ; symétrique d'un point, milieu.
    generate: () => genDiagonales(2),
  },
  {
    kind: "template",
    id: "para_diagonales_qcm_tpl_symetrique",
    niveau: "5e",
    matiere: "maths",
    notionId: "parallelogramme",
    microId: "para_diagonales",
    difficulty: 2,
    theme: "neutral",
    hint: "Le centre d’un parallélogramme est le milieu de ses deux diagonales.",
    tags: ["parallelogramme", "diagonales", "symetrie_centrale", "qcm", "template"],
    generate: () => {
      const s = sommetsPara();
      const [P, Q, R, T] = tourner(s, randomInt(0, 3));
      const O = randomChoice(["O", "I", "K", "M"].filter((x) => !s.includes(x)));
      if (Math.random() < 0.5) {
        return {
          text: `Le parallélogramme ${s.join("")} a pour centre ${O}. Quel est le symétrique du point ${P} par rapport à ${O} ?`,
          format: "qcm",
          choices: shuffle([R, Q, T, P]),
          expected: [R],
          comparator: "mcq_exact",
          explanation: expl(`${O} est le milieu de la diagonale ${seg(P, R)}. Le symétrique de ${P} par rapport à ${O} est donc l’autre extrémité de cette diagonale : ${R}.`),
        };
      }
      return {
        text: `Le parallélogramme ${s.join("")} a pour centre ${O}. Quel est le symétrique du côté ${seg(P, Q)} par rapport à ${O} ?`,
        format: "qcm",
        choices: shuffle([seg(R, T), seg(Q, R), seg(T, P), seg(P, R)]),
        expected: [seg(R, T)],
        comparator: "mcq_exact",
        explanation: expl(`Par rapport à ${O}, ${P} a pour symétrique ${R} et ${Q} a pour symétrique ${T}. Le côté ${seg(P, Q)} a donc pour symétrique ${seg(R, T)}, le côté opposé.`),
      };
    },
  },
  {
    kind: "template",
    id: "para_particuliers_qcm_tpl_propriete",
    niveau: "5e",
    matiere: "maths",
    notionId: "parallelogramme",
    microId: "para_particuliers",
    difficulty: 3,
    theme: "neutral",
    hint: "Côtés consécutifs égaux ou diagonales perpendiculaires : losange. Angle droit ou diagonales de même longueur : rectangle.",
    tags: ["parallelogramme", "particuliers", "qcm", "template"],
    // 13/10/2026 : neuf indices (dont des mesures), trois tournures, noms tirés.
    generate: () => genParticuliers(3),
  },
  {
    kind: "template",
    id: "para_reconnaitre_qcm_tpl_suffit",
    niveau: "5e",
    matiere: "maths",
    notionId: "parallelogramme",
    microId: "para_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    hint: "Une seule paire de côtés parallèles, ou des diagonales seulement égales ou perpendiculaires, ne suffit pas.",
    tags: ["parallelogramme", "reconnaitre", "qcm", "template"],
    generate: () => {
      const s = sommetsPara();
      const [P, Q, R, T] = tourner(s, randomInt(0, 3));
      const oui = "oui";
      const non = "non, pas forcément";
      const cas = randomChoice([
        { info: `(${lg(P, Q)}) // (${lg(R, T)}) et (${lg(Q, R)}) // (${lg(T, P)})`, rep: oui, pourquoi: "Ses côtés opposés sont parallèles deux à deux : c’est la définition du parallélogramme." },
        { info: `ses diagonales ${seg(P, R)} et ${seg(Q, T)} ont le même milieu`, rep: oui, pourquoi: "Un quadrilatère dont les diagonales se coupent en leur milieu est un parallélogramme." },
        { info: `(${lg(P, Q)}) // (${lg(R, T)}) et ${lg(P, Q)} = ${lg(R, T)}`, rep: oui, pourquoi: "Deux côtés opposés à la fois parallèles et de même longueur suffisent : c’est un parallélogramme." },
        { info: `ses quatre côtés ont la même longueur`, rep: oui, pourquoi: "Quatre côtés égaux font un losange, et tout losange est un parallélogramme." },
        { info: `(${lg(P, Q)}) // (${lg(R, T)})`, rep: non, pourquoi: "Une seule paire de côtés parallèles peut donner un trapèze : il faut les deux paires." },
        { info: `ses diagonales ${seg(P, R)} et ${seg(Q, T)} ont la même longueur`, rep: non, pourquoi: "Des diagonales de même longueur ne suffisent pas : si elles ne se coupent pas en leur milieu, la figure n’est pas un parallélogramme (un trapèze isocèle, par exemple)." },
        { info: `ses diagonales ${seg(P, R)} et ${seg(Q, T)} sont perpendiculaires`, rep: non, pourquoi: "Des diagonales perpendiculaires ne suffisent pas : un cerf-volant a ses diagonales perpendiculaires sans être un parallélogramme." },
      ]);
      return {
        text: `Du quadrilatère ${s.join("")}, on sait seulement ceci : ${cas.info}. Peut-on affirmer que c’est un parallélogramme ?`,
        format: "qcm",
        choices: [oui, non],
        expected: [cas.rep],
        comparator: "mcq_exact",
        explanation: expl(cas.pourquoi),
      };
    },
  },
];
