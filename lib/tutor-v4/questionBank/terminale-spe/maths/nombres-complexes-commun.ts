// NOMBRES COMPLEXES (06/11/2026) : outils communs aux deux banques de la notion.
// Maths expertes en France, hors tronc commun : micros masquées (`hors_france`).
// Écritures LaTeX exactes, angles en fractions de π, valeurs remarquables.

import type { CanvasFigure, TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { entre, fabrique, pgcd, un } from "../../lycee-commun";

export const tpl = fabrique("terminale-spe", "nombres_complexes", "tle_");

/* ───────────────── nombres à parties entières ───────────────── */

export type Z = [number, number];
export const zAdd = (u: Z, v: Z): Z => [u[0] + v[0], u[1] + v[1]];
export const zSub = (u: Z, v: Z): Z => [u[0] - v[0], u[1] - v[1]];
export const zMul = (u: Z, v: Z): Z => [u[0] * v[0] - u[1] * v[1], u[0] * v[1] + u[1] * v[0]];
export const zConj = (u: Z): Z => [u[0], -u[1]];
export const zK = (k: number, u: Z): Z => [k * u[0], k * u[1]];
export const zN2 = (u: Z) => u[0] * u[0] + u[1] * u[1];
export function zPow(u: Z, n: number): Z {
  let r: Z = [1, 0];
  for (let k = 0; k < n; k++) r = zMul(r, u);
  return r;
}
export const zEq = (u: Z, v: Z) => u[0] === v[0] && u[1] === v[1];

/** Un entier non nul entre −m et m. */
export const nz = (m: number) => entre(1, m) * (Math.random() < 0.5 ? 1 : -1);
/** Un complexe dont les deux parties sont non nulles. */
export const zTire = (m = 6): Z => [nz(m), nz(m)];

/** « 3 + 2i », « -i », « 4 » : l'écriture LaTeX. */
export function zT([a, b]: Z) {
  if (b === 0) return String(a);
  const c = Math.abs(b) === 1 ? "i" : `${Math.abs(b)}i`;
  if (a === 0) return `${b < 0 ? "-" : ""}${c}`;
  return `${a} ${b < 0 ? "-" : "+"} ${c}`;
}
/** Entre parenthèses dès qu'il le faut. */
export function zP(z: Z) {
  return (z[0] !== 0 && z[1] !== 0) || z[0] < 0 || z[1] < 0 ? `(${zT(z)})` : zT(z);
}
/** L'écriture désordonnée, partie imaginaire d'abord : « 2i - 3 ». */
export function zInverse([a, b]: Z) {
  const c = zT([0, b]);
  return `${c} ${a < 0 ? "-" : "+"} ${Math.abs(a)}`;
}
/** La réponse attendue, avec le vrai signe moins. */
export const zR = (z: Z) => zT(z).replace(/-/g, "−");
/** « + 2 - i » à la suite d'une expression ; vide si z est nul. */
export function suite(z: Z) {
  if (z[0] === 0 && z[1] === 0) return "";
  const s = zT(z);
  return s.startsWith("-") ? ` - ${s.slice(1)}` : ` + ${s}`;
}
/** « (1 + i)z », « 2z », « -iz », « z ». */
export function coefZ(a: Z, v = "z") {
  if (a[0] === 1 && a[1] === 0) return v;
  if (a[0] === -1 && a[1] === 0) return `-${v}`;
  if (a[0] !== 0 && a[1] !== 0) return `(${zT(a)})${v}`;
  return `${zT(a)}${v}`;
}

/** Réponse courte complexe : 3 + 2i, 2i + 3, 3+2i passent, 3 + 2i + 0 et le calcul non réduit non. */
export function courtZ(text: string, z: Z | string, explanation: string, canvas?: CanvasFigure, autres: string[] = []): TutorGeneratedQuestionV4 {
  return { text, format: "short", expected: [typeof z === "string" ? z : zR(z), ...autres], comparator: "expression_reduite", explanation, ...(canvas ? { canvas } : {}) };
}

/** La consigne, puis la formule seule dans son paragraphe : rien d'orphelin à 375 px. */
// Vu à 375 px : une formule seule sur sa ligne ne se coupe pas, et poussait la page à 435 px.
export const pose = (formes: readonly string[], formule: string) => `${un(formes)}\n\n$${formule.replace(/\\nobreak /g, "").length > 40 ? "\\footnotesize " : ""}${formule}$`;

/* ───────────────── fractions ───────────────── */

export type Fr = [number, number];
export function red(p: number, q: number): Fr {
  const g = pgcd(p, q) || 1;
  const s = q < 0 ? -1 : 1;
  return [(s * p) / g, (s * q) / g];
}
export function frT(p: number, q: number) {
  const [a, b] = red(p, q);
  if (b === 1) return String(a);
  return a < 0 ? `-\\dfrac{${-a}}{${b}}` : `\\dfrac{${a}}{${b}}`;
}
/** « \dfrac{1}{5} - \dfrac{3}{5}i ». */
export function zFr(a: Fr, b: Fr) {
  const [an, ad] = red(a[0], a[1]);
  const [bn, bd] = red(b[0], b[1]);
  const abs = Math.abs(bn);
  const ib = bn === 0 ? "" : bd === 1 ? (abs === 1 ? "i" : `${abs}i`) : `\\dfrac{${abs}}{${bd}}i`;
  if (bn === 0) return frT(an, ad);
  if (an === 0) return `${bn < 0 ? "-" : ""}${ib}`;
  return `${frT(an, ad)} ${bn < 0 ? "-" : "+"} ${ib}`;
}

/* ───────────────── angles en fractions de π ───────────────── */

/** n·π/d. */
export type A = [number, number];
/** La mesure principale, dans ]−π ; π]. */
export function princ([n, d]: A): A {
  const per = 2 * d;
  let m = ((n % per) + per) % per;
  if (m > d) m -= per;
  if (m === 0) return [0, 1];
  return red(m, d);
}
export const aAdd = (u: A, v: A) => princ([u[0] * v[1] + v[0] * u[1], u[1] * v[1]]);
export const aSub = (u: A, v: A) => princ([u[0] * v[1] - v[0] * u[1], u[1] * v[1]]);
export const aMul = (k: number, u: A) => princ([k * u[0], u[1]]);
export const aEq = (u: A, v: A) => {
  const [p, q] = [princ(u), princ(v)];
  return p[0] === q[0] && p[1] === q[1];
};

function piFrac(n: number, d: number, f = "\\dfrac") {
  const num = n === 1 ? "\\pi" : `${n}\\pi`;
  return d === 1 ? num : `${f}{${num}}{${d}}`;
}
/** « \dfrac{\pi}{3} », « -\dfrac{2\pi}{3} », « \pi », « 0 ». */
export function angT([n, d]: A) {
  if (n === 0) return "0";
  return `${n < 0 ? "-" : ""}${piFrac(Math.abs(n), d)}`;
}
/** « \mathrm{e}^{i\frac{\pi}{3}} », « \mathrm{e}^{-i\pi} ». */
export function eiT([n, d]: A) {
  if (n === 0) return "\\mathrm{e}^{0}";
  return `\\mathrm{e}^{${n < 0 ? "-" : ""}i${piFrac(Math.abs(n), d, "\\dfrac")}}`;
}
/** r·e^{iθ}, avec r écrit en LaTeX ; « 1 » disparaît. */
export const rE = (r: string, a: A) => `${r === "1" ? "" : r}${eiT(a)}`;
/** r(cos θ + i sin θ). */
export function trigT(r: string, a: A, moins = false) {
  const t = a[0] < 0 ? `\\left(${angT(a)}\\right)` : a[0] === 0 ? " 0" : angT(a);
  const c = `\\cos${t} ${moins ? "-" : "+"} i\\sin${t}`;
  return r === "1" ? c : `${r}\\bigl(${c}\\bigr)`;
}

/** Des mesures principales fausses, toutes différentes de la bonne. */
export function fauxAngles(a: A, n = 6): string[] {
  const j = angT(princ(a));
  const l: A[] = [
    princ([-a[0], a[1]]),
    aSub([1, 1], a),
    aAdd(a, [1, 1]),
    aSub([1, 2], a),
    aAdd(a, [1, 2]),
    aMul(2, a),
    [1, 6], [-1, 6], [1, 4], [-3, 4], [1, 3], [2, 3], [-2, 3], [5, 6], [1, 2], [-1, 2],
  ];
  return [...new Set(l.map(angT))].filter((s) => s !== j).slice(0, n);
}

/* ───────────────── valeurs remarquables ───────────────── */

export type Rem = { t: string; rT: string; r: number; a: A; x: number; y: number };

/** k + ki, k + ki√3, k√3 + ki, avec les signes voulus. `type` : 4, 3 ou 6 (θ de base = π/type). */
export function rem(k: number, type: 3 | 4 | 6, sx: 1 | -1, sy: 1 | -1): Rem {
  const c = k === 1 ? "" : String(k);
  const m = sy < 0 ? "-" : "+";
  const base: A = [1, type];
  const a: A = sx > 0 ? (sy > 0 ? base : princ([-1, type])) : sy > 0 ? aSub([1, 1], base) : aSub(base, [1, 1]);
  if (type === 4) return { t: zT([sx * k, sy * k]), rT: `${c}\\sqrt{2}`, r: k * Math.SQRT2, a, x: sx * k, y: sy * k };
  if (type === 3) return { t: `${sx * k} ${m} ${c}i\\sqrt{3}`, rT: String(2 * k), r: 2 * k, a, x: sx * k, y: sy * k * Math.sqrt(3) };
  return { t: `${sx < 0 ? "-" : ""}${c}\\sqrt{3} ${m} ${c}i`, rT: String(2 * k), r: 2 * k, a, x: sx * k * Math.sqrt(3), y: sy * k };
}
export const signe = (): 1 | -1 => (Math.random() < 0.5 ? 1 : -1);
export const remTire = (kmax = 3, types: readonly (3 | 4 | 6)[] = [3, 4, 6]) => rem(entre(1, kmax), un(types), signe(), signe());

const BASE: Record<string, [string, string]> = {
  "1/4": ["\\dfrac{\\sqrt{2}}{2}", "\\dfrac{\\sqrt{2}}{2}"],
  "1/3": ["\\dfrac{1}{2}", "\\dfrac{\\sqrt{3}}{2}"],
  "1/6": ["\\dfrac{\\sqrt{3}}{2}", "\\dfrac{1}{2}"],
};
/** e^{iθ} écrit sous forme algébrique, pour θ remarquable. */
export function unitT(a: A) {
  const [n, d] = princ(a);
  if (n === 0) return "1";
  if (n === 1 && d === 1) return "-1";
  if (d === 2) return n > 0 ? "i" : "-i";
  const abs = Math.abs(n);
  const aigu = abs * 2 < d;
  const cle = aigu ? `${abs}/${d}` : (() => { const r = red(d - abs, d); return `${r[0]}/${r[1]}`; })();
  const [c, s] = BASE[cle];
  return `${aigu ? "" : "-"}${c} ${n < 0 ? "-" : "+"} ${s}i`;
}
export const ANGLES_REM: A[] = [[1, 6], [1, 4], [1, 3], [2, 3], [3, 4], [5, 6], [-1, 6], [-1, 4], [-1, 3], [-2, 3], [-3, 4], [-5, 6]];
export const ANGLES_AXES: A[] = [[0, 1], [1, 1], [1, 2], [-1, 2]];

/** Des pièges pour √(a² + b²) : jamais deux de même valeur, ni égaux à la bonne. */
export function fauxRacines(a: number, b: number): string[] {
  const [A, B] = [Math.abs(a), Math.abs(b)];
  const N = A * A + B * B;
  const l: [string, number][] = [
    [String(A + B), A + B],
    [String(N), N],
    [`\\sqrt{${A + B}}`, Math.sqrt(A + B)],
    [`\\sqrt{${Math.abs(A * A - B * B)}}`, Math.sqrt(Math.abs(A * A - B * B))],
    [`\\sqrt{${N + 2}}`, Math.sqrt(N + 2)],
    [`\\sqrt{${N + 1}}`, Math.sqrt(N + 1)],
    [`\\sqrt{${N + 3}}`, Math.sqrt(N + 3)],
    [`\\sqrt{${2 * N}}`, Math.sqrt(2 * N)],
  ];
  const vus = new Set([Math.sqrt(N)]);
  return l.filter(([, v]) => {
    if (v === 0 || vus.has(v)) return false;
    vus.add(v);
    return true;
  }).map(([s]) => s);
}

/* ───────────────── polynômes et figures ───────────────── */

/** « 2z^{2} - 3z + 5 ». */
export function polyT(a: number, b: number, c: number, v = "z") {
  const mono = (k: number, corps: string, tete: boolean) => {
    if (k === 0) return "";
    const abs = Math.abs(k);
    const coef = abs === 1 && corps ? "" : String(abs);
    return tete ? `${k < 0 ? "-" : ""}${coef}${corps}` : ` ${k < 0 ? "-" : "+"} ${coef}${corps}`;
  };
  return `${mono(a, `${v}^{2}`, true)}${mono(b, v, false)}${mono(c, "", false)}`;
}

type P = { x: number; y: number; label?: string };
/** Le plan complexe : axes gradués, points nommés, segments ou contours. */
export function plan(points: P[], contours: P[][] = []): CanvasFigure {
  const xs = [0, ...points.map((p) => p.x)];
  const ys = [0, ...points.map((p) => p.y)];
  return {
    kind: "fonctionGraphique",
    xmin: Math.floor(Math.min(...xs)) - 1,
    xmax: Math.ceil(Math.max(...xs)) + 2,
    ymin: Math.floor(Math.min(...ys)) - 1,
    ymax: Math.ceil(Math.max(...ys)) + 2,
    grille: true,
    courbes: contours.map((c, k) => ({ id: `c${k}`, type: "points" as const, points: c.map((p) => ({ x: p.x, y: p.y })), couleur: "#2563eb" })),
    // Un point juste à gauche de l'axe : son nom, à droite, tombait sur les graduations.
    points: points.map((p) => ({ x: p.x, y: p.y, label: p.label, couleur: "#dc2626", labelGauche: p.x < 0 && p.x >= -2 })),
  } as CanvasFigure;
}

/** Les sommets d'un polygone régulier sur le cercle unité (racines n-ièmes de 1). */
export function polygoneUnite(n: number): CanvasFigure {
  const pts = Array.from({ length: n }, (_, k) => ({
    id: `P${k}`,
    x: Math.round(Math.cos((2 * k * Math.PI) / n) * 1e4) / 1e4,
    y: Math.round(Math.sin((2 * k * Math.PI) / n) * 1e4) / 1e4,
    nom: k === 0 ? "A" : k === 1 ? "B" : "",
  }));
  return {
    kind: "construction",
    points: [{ id: "O", x: 0, y: 0, nom: "O" }, ...pts],
    cercles: [{ centre: "O", rayon: 1, couleur: "#94a3b8" }],
    polygones: [{ sommets: pts.map((p) => p.id), contour: "#2563eb" }],
    largeur: 240,
    description: `Polygone régulier à ${n} côtés inscrit dans le cercle de centre O et de rayon 1.`,
  } as CanvasFigure;
}

/* ───────────────── tournures communes ───────────────── */

export const F_ALG = [
  "Écris ce nombre sous forme algébrique.",
  "Calcule, puis donne le résultat sous la forme $a + bi$.",
  "Effectue ce calcul dans $\\mathbb{C}$.",
  "Donne la forme algébrique de ce nombre.",
  "Réduis cette expression.",
  "Que vaut ce nombre complexe ?",
  "Quelle est la forme algébrique de ce résultat ?",
  "Mets ce calcul sous la forme $a + bi$.",
  "Calcule ce nombre complexe.",
  "Simplifie jusqu'à obtenir la forme $a + bi$.",
  "Sans calculatrice, calcule ce nombre.",
  "Trouve la forme $a + bi$ de ce résultat.",
  "Écris ce résultat avec une partie réelle et une partie imaginaire.",
  "Développe et réduis, en te souvenant que $i^{2} = -1$.",
];
export const F_EXACT = [
  "Quelle est la bonne écriture de ce nombre ?",
  "Parmi ces propositions, laquelle est égale à ce nombre ?",
  "Quelle proposition vaut ce nombre ?",
  "Sans calculatrice, choisis l'écriture juste.",
  "Quelle écriture correspond à ce nombre ?",
  "Une seule proposition est égale à ce nombre. Laquelle ?",
  "À quoi ce nombre est-il égal ?",
  "Repère l'écriture exacte de ce nombre.",
  "Choisis l'écriture juste de ce nombre.",
  "Trois propositions sont fausses. Quelle est la bonne ?",
  "Quelle est la valeur exacte de ce nombre ?",
  "Quelle forme est celle de ce nombre ?",
];
export const F_ARG = [
  "Quelle est la mesure principale de l'argument de ce nombre ?",
  "Donne la mesure principale d'un argument de ce nombre.",
  "Quel est l'argument de ce nombre, dans $]-\\pi\\,;\\pi]$ ?",
  "Parmi ces valeurs, laquelle est un argument de ce nombre ?",
  "Quel angle est un argument de ce complexe ?",
  "Choisis l'argument principal de ce nombre.",
  "Détermine l'argument principal de ce complexe.",
  "Sans calculatrice, repère l'argument de ce nombre.",
  "Quelle mesure de l'argument de ce nombre est juste ?",
  "Une seule valeur est un argument de ce nombre. Laquelle ?",
  "Quelle est la mesure dans $]-\\pi\\,;\\pi]$ d'un argument de ce nombre ?",
  "Lis l'argument principal de ce complexe.",
];
export const F_MOD = [
  "Calcule ce module.",
  "Que vaut ce module ?",
  "Quel réel positif ce module vaut-il ?",
  "Donne la valeur de ce module.",
  "Détermine ce module.",
  "Sans calculatrice, trouve ce module.",
  "Quelle est la valeur de ce module ?",
  "Trouve la valeur de ce module.",
  "Ce module est un réel positif. Lequel ?",
  "Applique la formule du module à ce nombre.",
  "Ce module est une distance à l'origine. Combien vaut-elle ?",
  "Utilise $a^{2} + b^{2}$ pour calculer ce module.",
];
export const F_RESOUS = [
  "Résous cette équation dans $\\mathbb{C}$.",
  "Quelle est la solution de cette équation ?",
  "Trouve le complexe $z$ qui vérifie cette égalité.",
  "Détermine $z$.",
  "Isole $z$ dans cette égalité, puis écris-le sous la forme $a + bi$.",
  "Quel nombre complexe $z$ convient ?",
  "Donne $z$ sous forme algébrique.",
  "Résous dans $\\mathbb{C}$ et écris $z$ sous la forme $a + bi$.",
  "Pour quel complexe $z$ cette égalité est-elle vraie ?",
  "Trouve la solution complexe de cette équation.",
  "Que vaut $z$ dans cette équation ?",
  "Calcule $z$ sachant que cette égalité est vraie.",
];
export const F_PAIRE = [
  "Quelles sont les solutions de cette équation dans $\\mathbb{C}$ ?",
  "Résous cette équation dans $\\mathbb{C}$.",
  "Quel est l'ensemble des solutions complexes ?",
  "Parmi ces propositions, laquelle donne les solutions ?",
  "Détermine les solutions complexes de cette équation.",
  "Quelles valeurs de $z$ vérifient cette équation ?",
  "Choisis les deux solutions de cette équation.",
  "Calcule le discriminant, puis trouve les solutions.",
  "Quelles sont les deux racines complexes ?",
  "Trouve les solutions de cette équation.",
  "Une seule proposition donne les bonnes solutions. Laquelle ?",
  "Sans calculatrice, résous cette équation.",
];
