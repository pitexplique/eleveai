// FONCTION RÉCIPROQUE (05/11/2026). Hors programme français (registre `hors_france`).
// Lignes visées : Sénégal (« réciproque d'une fonction continue strictement monotone,
// courbe symétrique par rapport à y = x, dérivée »), Maroc 2e bac (existence, monotonie,
// courbe, nombre dérivé), Côte d'Ivoire (bijection, réciproque, dérivée d'une réciproque),
// Belgique humanités 3.1.1c, et les applications injectives / surjectives / bijectives
// du Sénégal et de la Côte d'Ivoire.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import type { FonctionGraphiqueCanvasData } from "@/lib/tutor-v4/types_canvas";
import { T, court, entre, expl, fabrique, fr, melange, phrase, qcm, somme, un } from "../../lycee-commun";

const tpl = fabrique("terminale-spe", "fonction_reciproque", "tle_");

const nomF = () => un(["f", "g", "h"]);
const nz = (a: number, b: number) => {
  for (;;) {
    const v = entre(a, b);
    if (v !== 0) return v;
  }
};
/** « s + 3 », « s - 3 », « s » : une constante ajoutée proprement. */
const plus = (s: string, c: number) => (c === 0 ? s : c > 0 ? `${s} + ${c}` : `${s} - ${-c}`);
const moinsDans = (c: number, v = "x") => plus(v, -c);
const coefX = (m: number, s = "x") => (m === 1 ? s : m === -1 ? `-${s}` : `${m}${s}`);
const affine = (m: number, p: number) => plus(coefX(m), p);

const R = "\\mathbb{R}";
const dd = (a: number, ouvert = false) => `${ouvert ? "]" : "["}${a}\\,;+\\infty[`;
const gg = (b: number, ouvert = false) => `]-\\infty\\,;${b}${ouvert ? "[" : "]"}`;
const seg = (a: number, b: number) => `[${a}\\,;${b}]`;

/* ───────────────── familles : f, sa réciproque, les intervalles ───────────────── */

type Fam = { f: string; g: string; I: string; J: string; faux: string[] };

function affineInverse(m: number, p: number) {
  // (x − p) / m, écrit avec un dénominateur positif.
  const haut = m > 0 ? moinsDans(p) : somme([T(p, 1), T(-1, 1, "x")]);
  const d = Math.abs(m);
  return d === 1 ? haut : `\\dfrac{${haut}}{${d}}`;
}
function familleAffine(): Fam {
  const m = un([-5, -4, -3, -2, -1, 2, 3, 4, 5]);
  const p = nz(-9, 9);
  const dv = Math.abs(m);
  return {
    f: affine(m, p),
    g: affineInverse(m, p),
    I: R,
    J: R,
    faux: [
      affineInverse(m, -p),
      dv === 1 ? moinsDans(-p) : `\\dfrac{${moinsDans(-p)}}{${dv}}`,
      `\\dfrac{${moinsDans(p)}}{${dv + 1}}`,
      affine(-m, -p),
      `\\dfrac{1}{${affine(m, p)}}`,
    ],
  };
}
function familleUsuelle(): Fam {
  const c = nz(-6, 6);
  const a = nz(-5, 5);
  const k = entre(2, 5);
  const fams: Fam[] = [
    { f: plus("x^2", c), g: `\\sqrt{${moinsDans(c)}}`, I: dd(0), J: dd(c), faux: [plus("\\sqrt{x}", -c), `\\sqrt{${moinsDans(-c)}}`, plus("x^2", -c), `-\\sqrt{${moinsDans(c)}}`] },
    { f: plus("x^2", c), g: `-\\sqrt{${moinsDans(c)}}`, I: gg(0), J: dd(c), faux: [`\\sqrt{${moinsDans(c)}}`, plus("-\\sqrt{x}", -c), `-\\sqrt{${moinsDans(-c)}}`, plus("x^2", -c)] },
    { f: `(${moinsDans(a)})^2`, g: plus("\\sqrt{x}", a), I: dd(a), J: dd(0), faux: [plus("\\sqrt{x}", -a), `\\sqrt{${moinsDans(a)}}`, `\\sqrt{${moinsDans(-a)}}`, plus("x^2", a)] },
    { f: `\\sqrt{${moinsDans(a)}}`, g: plus("x^2", a), I: dd(a), J: dd(0), faux: [plus("x^2", -a), `(${moinsDans(a)})^2`, `(${moinsDans(-a)})^2`, plus("\\sqrt{x}", a)] },
    { f: plus("\\sqrt{x}", c), g: `(${moinsDans(c)})^2`, I: dd(0), J: dd(c), faux: [`(${moinsDans(-c)})^2`, plus("x^2", -c), plus("x^2", c), `\\sqrt{${moinsDans(c)}}`] },
    { f: plus("\\dfrac{1}{x}", c), g: `\\dfrac{1}{${moinsDans(c)}}`, I: dd(0, true), J: dd(c, true), faux: [`\\dfrac{1}{${moinsDans(-c)}}`, plus("\\dfrac{1}{x}", -c), plus("\\dfrac{1}{x}", c), plus("x", -c)] },
    { f: `\\dfrac{1}{${moinsDans(a)}}`, g: plus("\\dfrac{1}{x}", a), I: dd(a, true), J: dd(0, true), faux: [plus("\\dfrac{1}{x}", -a), `\\dfrac{1}{${moinsDans(-a)}}`, `\\dfrac{1}{${moinsDans(a)}}`, plus("x", a)] },
    { f: plus("e^{x}", c), g: `\\ln(${moinsDans(c)})`, I: R, J: dd(c, true), faux: [`\\ln(${moinsDans(-c)})`, plus("\\ln x", -c), plus("\\ln x", c), plus("e^{-x}", -c)] },
    { f: `e^{${moinsDans(a)}}`, g: plus("\\ln x", a), I: R, J: dd(0, true), faux: [plus("\\ln x", -a), `\\ln(${moinsDans(a)})`, `\\ln(${moinsDans(-a)})`, `e^{${moinsDans(-a)}}`] },
    { f: `\\ln(${moinsDans(a)})`, g: plus("e^{x}", a), I: dd(a, true), J: R, faux: [plus("e^{x}", -a), `e^{${moinsDans(a)}}`, `e^{${moinsDans(-a)}}`, plus("\\ln x", a)] },
    { f: plus("\\ln x", c), g: `e^{${moinsDans(c)}}`, I: dd(0, true), J: R, faux: [`e^{${moinsDans(-c)}}`, plus("e^{x}", -c), plus("e^{x}", c), plus("\\ln x", -c)] },
    { f: plus("x^3", c), g: `\\sqrt[3]{${moinsDans(c)}}`, I: dd(0), J: dd(c), faux: [`\\sqrt[3]{${moinsDans(-c)}}`, plus("\\sqrt[3]{x}", -c), plus("x^3", -c), `\\sqrt{${moinsDans(c)}}`] },
    { f: `e^{${k}x}`, g: `\\dfrac{\\ln x}{${k}}`, I: R, J: dd(0, true), faux: [`${k}\\ln x`, `\\ln(${k}x)`, `\\ln\\left(\\dfrac{x}{${k}}\\right)`, `e^{\\dfrac{x}{${k}}}`] },
    { f: `${k}x^2`, g: `\\sqrt{\\dfrac{x}{${k}}}`, I: dd(0), J: dd(0), faux: [`\\dfrac{\\sqrt{x}}{${k}}`, `\\sqrt{${k}x}`, `${k}\\sqrt{x}`, `\\dfrac{x^2}{${k}}`] },
  ];
  return un(fams);
}
function familleHomographique(): Fam {
  for (;;) {
    const [a, b, c, d] = [nz(-4, 4), nz(-6, 6), un([1, 1, 2]), nz(-6, 6)];
    if (a * d - b * c === 0) continue;
    if (d % c !== 0 || a % c !== 0) continue;
    const haut = affine(a, b);
    const bas = affine(c, d);
    const interdit = -d / c;
    const image = a / c;
    const hautG = somme([T(-d, 1, "x"), T(b, 1)]);
    const basG = somme([T(c, 1, "x"), T(-a, 1)]);
    return {
      f: `\\dfrac{${haut}}{${bas}}`,
      g: `\\dfrac{${hautG}}{${basG}}`,
      I: `${R}\\setminus\\{${interdit}\\}`,
      J: `${R}\\setminus\\{${image}\\}`,
      faux: [`\\dfrac{${bas}}{${haut}}`, `\\dfrac{${somme([T(d, 1, "x"), T(b, 1)])}}{${basG}}`, `\\dfrac{${hautG}}{${somme([T(c, 1, "x"), T(a, 1)])}}`, `\\dfrac{${somme([T(-d, 1, "x"), T(-b, 1)])}}{${basG}}`],
    };
  }
}
const explExpression = (n: string, F: Fam) =>
  expl(
    `$${n}^{-1}$ associe à chaque $y$ de l'intervalle d'arrivée l'unique $x$ de l'intervalle de départ tel que $${n}(x) = y$.`,
    `on résout $${n}(x) = y$ en isolant $x$, puis on écrit le résultat avec la lettre $x$.`,
    `Résoudre $${F.f} = y$ avec $x$ dans $${F.I}$ donne $x = ${F.g.replace(/x/g, "y").replace(/e\^\{y/g, "e^{y")}$.`,
    `$${n}^{-1}(x) = ${F.g}$ sur $${F.J}$.`,
  );

/* ───────────────── fonctions monotones à valeurs exactes aux bornes ───────────────── */

type Mono = { f: string; v: (x: number) => number; a: number; b: number };
function fonctionMono(): Mono {
  const c = nz(-6, 6);
  const m = nz(-5, 5);
  const p = nz(-9, 9);
  const a = entre(-4, 1);
  const b = a + entre(2, 5);
  const a0 = entre(0, 2);
  const b0 = a0 + entre(1, 3);
  const carres = [0, 1, 4, 9, 16, 25];
  const r = entre(0, 3);
  const s = r + entre(1, 2);
  return un<Mono>([
    { f: affine(m, p), v: (x) => m * x + p, a, b },
    { f: plus("x^2", c), v: (x) => x * x + c, a: a0, b: b0 },
    { f: plus("-x^2", c), v: (x) => -x * x + c, a: a0, b: b0 },
    { f: plus("x^3", c), v: (x) => x ** 3 + c, a, b },
    { f: plus("-x^3", c), v: (x) => -(x ** 3) + c, a, b },
    { f: plus("\\sqrt{x}", c), v: (x) => Math.sqrt(x) + c, a: carres[r], b: carres[s] },
    { f: plus("-\\sqrt{x}", c), v: (x) => -Math.sqrt(x) + c, a: carres[r], b: carres[s] },
    { f: plus("\\dfrac{12}{x}", c), v: (x) => 12 / x + c, a: un([1, 2, 3]), b: un([4, 6, 12]) },
  ]);
}

/* ───────────────── questions à choix fixes ───────────────── */

const REP_CROIT = "Oui : elle est continue et strictement croissante";
const REP_DECROIT = "Oui : elle est continue et strictement décroissante";
const REP_NON = "Non : un même réel a deux antécédents";
const REP_RUPTURE = "Non : elle n'est pas définie sur tout l'intervalle";
type Cas = { f: string; I: string; r: string };
function casBijection(): Cas {
  const c = nz(-6, 6);
  const m = nz(-5, 5);
  const k = entre(1, 5);
  const q = un([2, 3, 4, 5, 6, 8]);
  const piS2 = "\\left[-\\dfrac{\\pi}{2}\\,;\\dfrac{\\pi}{2}\\right]";
  return un<Cas>([
    { f: affine(m, c), I: R, r: m > 0 ? REP_CROIT : REP_DECROIT },
    { f: plus("x^2", c), I: dd(0), r: REP_CROIT },
    { f: plus("x^2", c), I: gg(0), r: REP_DECROIT },
    { f: plus("x^2", c), I: R, r: REP_NON },
    { f: plus("x^2", c), I: seg(-k, k), r: REP_NON },
    { f: plus("-x^2", c), I: dd(0), r: REP_DECROIT },
    { f: plus("-x^2", c), I: R, r: REP_NON },
    { f: plus("x^3", c), I: R, r: REP_CROIT },
    { f: plus("-x^3", c), I: R, r: REP_DECROIT },
    { f: plus("\\sqrt{x}", c), I: dd(0), r: REP_CROIT },
    { f: `\\dfrac{${q}}{x}`, I: dd(0, true), r: REP_DECROIT },
    { f: plus("e^{x}", c), I: R, r: REP_CROIT },
    { f: plus("e^{-x}", c), I: R, r: REP_DECROIT },
    { f: plus("\\ln x", c), I: dd(0, true), r: REP_CROIT },
    { f: "\\cos x", I: "[0\\,;\\pi]", r: REP_DECROIT },
    { f: "\\cos x", I: "[-\\pi\\,;\\pi]", r: REP_NON },
    { f: "\\sin x", I: piS2, r: REP_CROIT },
    { f: "\\sin x", I: "[0\\,;\\pi]", r: REP_NON },
  ]);
}

/* Restriction : sur quel intervalle la fonction devient-elle bijective ? */
type Restr = { f: string; juste: string; faux: string[]; note: string };
function restriction(): Restr {
  const a = nz(-4, 4);
  const c = nz(-6, 6);
  const piS2 = "\\left[-\\dfrac{\\pi}{2}\\,;\\dfrac{\\pi}{2}\\right]";
  const haut = Math.random() < 0.5;
  const fauxCarre = [R, seg(a - 1, a + 1), dd(a - 2), gg(a + 3), seg(a - 3, a + 2)];
  return un<Restr>([
    { f: plus(`(${moinsDans(a)})^2`, c), juste: haut ? dd(a) : gg(a), faux: fauxCarre, note: `le sommet de la parabole a pour abscisse $${a}$` },
    { f: plus(`-(${moinsDans(a)})^2`, c), juste: haut ? dd(a) : gg(a), faux: fauxCarre, note: `le sommet de la parabole a pour abscisse $${a}$` },
    { f: plus("x^3 - 3x", c), juste: un([dd(1), gg(-1), seg(-1, 1)]), faux: [R, dd(0), seg(-2, 2), gg(0), dd(-1)], note: "la dérivée $3x^2 - 3$ s'annule en $-1$ et en $1$" },
    { f: plus("x^3 - 12x", c), juste: un([dd(2), gg(-2), seg(-2, 2)]), faux: [R, dd(0), seg(-3, 3), gg(0), dd(-2)], note: "la dérivée $3x^2 - 12$ s'annule en $-2$ et en $2$" },
    { f: "\\cos x", juste: un(["[0\\,;\\pi]", "[-\\pi\\,;0]"]), faux: ["[-\\pi\\,;\\pi]", piS2, "[0\\,;2\\pi]", R], note: "le cosinus change de sens en $0$ et en $\\pi$" },
    { f: "\\sin x", juste: piS2, faux: ["[0\\,;\\pi]", "[-\\pi\\,;\\pi]", "[0\\,;2\\pi]", R], note: "le sinus change de sens en $-\\dfrac{\\pi}{2}$ et en $\\dfrac{\\pi}{2}$" },
  ]);
}

const CTX_MODELE = [
  "Une ingénieure règle un capteur :",
  "Dans un modèle de refroidissement,",
  "Un technicien étalonne une balance :",
  "Une biologiste suit une culture de bactéries :",
  "Pour un réglage de ventilation,",
  "Un économiste modélise un coût :",
  "Une architecte dimensionne une rampe :",
  "Dans un logiciel de jeu vidéo,",
  "Un médecin suit une dose de médicament :",
  "Un pilote de drone calcule une altitude :",
  "Une chimiste trace une courbe d'étalonnage :",
  "Pour un panneau solaire,",
];

/* Contextes d'une réciproque : on connaît le résultat, on cherche l'entrée. */
type CtxInv = { t: (n: string, F: string, y: number) => string; m: () => number; p: () => number };
const CTX_INV: CtxInv[] = [
  { m: () => entre(2, 5), p: () => entre(2, 9), t: (n, F, y) => `Un taxi facture $${n}(x) = ${F}$ euros pour $x$ kilomètres. Une course a coûté ${y} euros. Combien de kilomètres, soit $${n}^{-1}(${y})$ ?` },
  { m: () => entre(2, 9), p: () => entre(5, 30), t: (n, F, y) => `Une citerne contient $${n}(x) = ${F}$ litres après $x$ minutes de remplissage. Après combien de minutes, soit $${n}^{-1}(${y})$, contient-elle ${y} litres ?` },
  { m: () => entre(2, 6), p: () => entre(10, 40), t: (n, F, y) => `Un abonnement à une salle de sport coûte $${n}(x) = ${F}$ euros pour $x$ séances. Un adhérent a payé ${y} euros. Combien a-t-il fait de séances, soit $${n}^{-1}(${y})$ ?` },
  { m: () => entre(3, 8), p: () => entre(5, 25), t: (n, F, y) => `Une plante mesure $${n}(x) = ${F}$ centimètres après $x$ semaines. Après combien de semaines, soit $${n}^{-1}(${y})$, atteint-elle ${y} centimètres ?` },
  { m: () => entre(4, 9), p: () => entre(20, 90), t: (n, F, y) => `Un four atteint $${n}(x) = ${F}$ degrés après $x$ minutes. Calcule $${n}^{-1}(${y})$ : au bout de combien de minutes est-il à ${y} degrés ?` },
  { m: () => entre(2, 7), p: () => entre(3, 15), t: (n, F, y) => `Une imprimante 3D a déposé $${n}(x) = ${F}$ grammes de matière après $x$ minutes. Quand en a-t-elle déposé ${y} grammes ? Calcule $${n}^{-1}(${y})$.` },
  { m: () => entre(5, 15), p: () => entre(10, 60), t: (n, F, y) => `Un vélo à assistance consomme $${n}(x) = ${F}$ wattheures pour $x$ kilomètres. Quelle distance, soit $${n}^{-1}(${y})$, correspond à ${y} wattheures ?` },
  { m: () => entre(3, 9), p: () => entre(2, 12), t: (n, F, y) => `Une tireuse a rempli $${n}(x) = ${F}$ bouteilles après $x$ minutes. Quand en a-t-elle rempli ${y} ? Calcule $${n}^{-1}(${y})$.` },
  { m: () => entre(2, 8), p: () => entre(6, 30), t: (n, F, y) => `Une librairie en ligne facture $${n}(x) = ${F}$ euros pour $x$ livres. Une commande coûte ${y} euros. Que vaut $${n}^{-1}(${y})$ ?` },
  { m: () => entre(2, 6), p: () => entre(4, 20), t: (n, F, y) => `Une éolienne a produit $${n}(x) = ${F}$ kilowattheures après $x$ heures. Quand atteint-elle ${y} kilowattheures ? Calcule $${n}^{-1}(${y})$.` },
];

const courbeDe = (v: (x: number) => number, a: number, b: number) => {
  const pts: { x: number; y: number }[] = [];
  for (let i = 0; i <= 80; i++) {
    const x = a + ((b - a) * i) / 80;
    pts.push({ x, y: v(x) });
  }
  return pts;
};
/** La courbe de f et la droite y = x, sur un quadrillage. */
function figureCourbe(v: (x: number) => number, a: number, b: number, points: FonctionGraphiqueCanvasData["points"] = []): FonctionGraphiqueCanvasData {
  return {
    kind: "fonctionGraphique",
    xmin: -1,
    xmax: 9,
    ymin: -1,
    ymax: 9,
    grille: true,
    courbes: [
      { id: "cf", type: "points", couleur: "#2563eb", points: courbeDe(v, a, b) },
      { id: "yx", type: "lineaire", a: 1, couleur: "#94a3b8" },
    ],
    points,
  };
}

/* Une fonction dont la courbe tient dans la fenêtre : valeurs entières, lisibles sur le quadrillage. */
type Lisible = { v: (x: number) => number; a: number; b: number; xs: number[] };
function lisible(): Lisible {
  return un<Lisible>([
    { v: (x) => x + 2, a: 0, b: 6, xs: [1, 2, 3, 4, 5] },
    { v: (x) => 2 * x + 1, a: 0, b: 3.5, xs: [1, 2, 3] },
    { v: (x) => 2 * x - 1, a: 0.5, b: 4.5, xs: [1, 2, 3, 4] },
    { v: (x) => 8 - x, a: 0, b: 8, xs: [1, 2, 3, 5, 6] },
    { v: (x) => 8 - 2 * x, a: 0, b: 4, xs: [1, 2, 3] },
    { v: (x) => x * x, a: 0, b: 2.9, xs: [1, 2] },
    { v: (x) => x * x + 1, a: 0, b: 2.8, xs: [1, 2] },
    { v: (x) => 3 * Math.sqrt(x), a: 0, b: 8.5, xs: [1, 4] },
    { v: (x) => 12 / x, a: 1.4, b: 8.5, xs: [2, 3, 4, 6] },
  ]);
}

/* Fractions pour la dérivée de la réciproque. */
function inverseL(m: number) {
  const s = m < 0 ? "-" : "";
  return `${s}\\dfrac{1}{${Math.abs(m)}}`;
}

export const fonctionReciproqueBank: TutorBankItemV4[] = [
  /* ===== reciproque_bijection ===== */
  tpl("reciproque_bijection", 1, 1, "Injective : pas deux flèches vers la même image. Surjective : chaque élément d'arrivée est atteint.", () => {
    const nE = entre(3, 5);
    const nF = Math.max(2, nE + un([-1, 0, 0, 1]));
    const debutE = entre(0, 4);
    const debutF = entre(5, 9);
    const E = Array.from({ length: nE }, (_, i) => debutE + i);
    const F = Array.from({ length: nF }, (_, i) => debutF + i);
    const bij = melange(F);
    const images = E.map((_, i) => (nE <= nF && Math.random() < 0.6 ? bij[i] : un(F)));
    // Quand |E| > |F|, on assure parfois la surjectivité.
    if (nE > nF && Math.random() < 0.6) melange(F).forEach((y, i) => (images[i] = y));
    const inj = new Set(images).size === nE;
    const surj = new Set(images).size === nF;
    const juste = inj && surj ? "Bijective" : inj ? "Injective mais pas surjective" : surj ? "Surjective mais pas injective" : "Ni injective ni surjective";
    const def = E.map((x, i) => `$${"f"}(${x}) = ${images[i]}$`).join(", ");
    const ens = (l: number[]) => `\\{${l.join("\\,;")}\\}`;
    return qcm(
      phrase([`L'application $f$ de $E = ${ens(E)}$ dans $F = ${ens(F)}$ est définie par ${def}. Comment est-elle ?`, `On définit $f : E \\to F$ avec $E = ${ens(E)}$, $F = ${ens(F)}$, et ${def}. Quelle est sa nature ?`, `De $E = ${ens(E)}$ vers $F = ${ens(F)}$, on a ${def}. Que dire de l'application $f$ ?`, `Soit $E = ${ens(E)}$ et $F = ${ens(F)}$. Avec ${def}, l'application $f$ est :`], ["", "Regarde les images, une par une."]),
      juste,
      ["Bijective", "Injective mais pas surjective", "Surjective mais pas injective", "Ni injective ni surjective"],
      expl("une application est injective si deux éléments différents ont deux images différentes, surjective si tout élément de l'arrivée a un antécédent, bijective si elle est les deux.", "on regarde si une image revient deux fois, puis si un élément de $F$ n'est jamais atteint.", `Images obtenues : $${images.join("\\,;")}$. ${inj ? "Aucune ne revient." : "Une image revient."} ${surj ? "Tout $F$ est atteint." : "Un élément de $F$ n'est pas atteint."}`, `elle est : ${juste.toLowerCase()}.`),
    );
  }),
  tpl("reciproque_bijection", 2, 1, "Une fonction continue et strictement monotone sur un intervalle y est une bijection.", () => {
    const c = casBijection();
    const n = nomF();
    return qcm(
      phrase([`$${n}(x) = ${c.f}$ sur $${c.I}$ est-elle une bijection sur son image ?`, `Sur $${c.I}$, la fonction $${n}(x) = ${c.f}$ réalise-t-elle une bijection sur son image ?`, `On étudie $${n}(x) = ${c.f}$ sur $${c.I}$. Est-ce une bijection de cet intervalle sur son image ?`, `La fonction $${n}(x) = ${c.f}$, restreinte à $${c.I}$, est-elle bijective sur son image ?`], ["", "Pense au sens de variation."]),
      c.r,
      [REP_CROIT, REP_DECROIT, REP_NON, REP_RUPTURE],
      expl("si $f$ est continue et strictement monotone sur un intervalle $I$, alors c'est une bijection de $I$ sur $f(I)$.", "on cherche le sens de variation sur l'intervalle. Si le sens change, un même réel a deux antécédents.", `Sur $${c.I}$ : ${c.r.toLowerCase()}.`, c.r + "."),
    );
  }),
  tpl("reciproque_bijection", 3, 2, "Une fonction monotone envoie les bornes sur les bornes : calcule f(a) et f(b).", () => {
    const m = fonctionMono();
    const n = nomF();
    const [p, q] = [m.v(m.a), m.v(m.b)];
    const [lo, hi] = [Math.min(p, q), Math.max(p, q)];
    return qcm(
      phrase([`$${n}(x) = ${m.f}$ est continue et strictement monotone sur $${seg(m.a, m.b)}$. Quelle est l'image de cet intervalle ?`, `Quel est l'intervalle image de $${seg(m.a, m.b)}$ par $${n}(x) = ${m.f}$ ?`, `$${n}(x) = ${m.f}$ réalise une bijection de $${seg(m.a, m.b)}$ sur quel intervalle ?`, `Détermine $${n}(${seg(m.a, m.b)})$ pour $${n}(x) = ${m.f}$.`], ["", "Calcule les images des bornes."]),
      `$${seg(lo, hi)}$`,
      [`$${seg(m.a, m.b)}$`, `$${seg(lo - 1, hi)}$`, `$${seg(lo, hi + 1)}$`, `$${seg(lo - 1, hi + 1)}$`, `$${seg(lo + 1, hi + 2)}$`],
      expl("l'image d'un segment par une fonction continue strictement monotone est le segment d'extrémités les images des bornes.", "on calcule les images des bornes, puis on les range dans l'ordre.", `$${n}(${m.a}) = ${p}$ et $${n}(${m.b}) = ${q}$.`, `l'image est $${seg(lo, hi)}$.`),
    );
  }),
  tpl("reciproque_bijection", 4, 2, "Bijection : un seul antécédent pour chaque réel de l'image, aucun en dehors.", () => {
    const a = entre(-5, 2);
    const b = a + entre(2, 6);
    const croit = Math.random() < 0.5;
    const lo = entre(-8, 3);
    const hi = lo + entre(3, 9);
    const [p, q] = croit ? [lo, hi] : [hi, lo];
    const dedans = Math.random() < 0.6;
    const k = dedans ? entre(lo + 1, hi - 1) : un([lo - entre(1, 4), hi + entre(1, 4)]);
    const n = nomF();
    const eq = `$${n}(x) = ${k}$`;
    return court(
      phrase([`$${n}$ est continue et strictement ${croit ? "croissante" : "décroissante"} sur $${seg(a, b)}$, avec $${n}(${a}) = ${p}$ et $${n}(${b}) = ${q}$. Combien de solutions a ${eq} sur cet intervalle ?`, `On a $${n}(${a}) = ${p}$ et $${n}(${b}) = ${q}$, et $${n}$ est continue, strictement ${croit ? "croissante" : "décroissante"} sur $${seg(a, b)}$. Combien de réels vérifient ${eq} ?`, `Sur $${seg(a, b)}$, $${n}$ est continue et strictement ${croit ? "croissante" : "décroissante"}, de $${n}(${a}) = ${p}$ à $${n}(${b}) = ${q}$. Combien l'équation ${eq} a-t-elle de solutions ?`], ["", "Réponds par un nombre."]),
      dedans ? 1 : 0,
      expl("une bijection de $I$ sur $J$ donne à chaque réel de $J$ exactement un antécédent, et aucun aux réels hors de $J$.", "on calcule l'image de l'intervalle, puis on regarde si $k$ y est.", `L'image est $${seg(lo, hi)}$ ; $${k}$ ${dedans ? "y appartient" : "n'y appartient pas"}.`, `il y a ${dedans ? "1 solution" : "0 solution"}.`),
    );
  }),
  tpl("reciproque_bijection", 5, 3, "Choisis un intervalle où le sens de variation ne change pas.", () => {
    const r = restriction();
    const n = nomF();
    return qcm(
      phrase([`$${n}(x) = ${r.f}$ n'est pas bijective sur $${R}$. Sur lequel de ces intervalles réalise-t-elle une bijection ?`, `Pour définir une réciproque de $${n}(x) = ${r.f}$, on restreint $${n}$. Quel intervalle convient ?`, `Sur quel intervalle $${n}(x) = ${r.f}$ est-elle strictement monotone ?`, `Une calculatrice doit inverser $${n}(x) = ${r.f}$. Sur quel intervalle est-ce possible ?`, `Parmi ces intervalles, sur lequel $${n}(x) = ${r.f}$ admet-elle une fonction réciproque ?`], ["", "Cherche où le sens de variation change.", "Étudie le sens de variation."]),
      `$${r.juste}$`,
      r.faux.map((i) => `$${i}$`),
      expl("une fonction continue admet une réciproque sur un intervalle si elle y est strictement monotone.", "on repère les valeurs où le sens de variation change : elles ne doivent pas être à l'intérieur de l'intervalle.", `Ici, ${r.note}.`, `$${r.juste}$ convient.`),
    );
  }),
  tpl("reciproque_bijection", 6, 3, "La dérivée est strictement positive : f est bijective, il y a une seule solution. Essaie de petits entiers.", () => {
    const p = entre(1, 9);
    const c = nz(-9, 9);
    const x0 = nz(-3, 3);
    const n = nomF();
    const F = plus(`x^3 + ${p === 1 ? "" : p}x`, c);
    const k = x0 ** 3 + p * x0 + c;
    return court(
      `${un(CTX_MODELE)} ${phrase([`la grandeur vaut $${n}(x) = ${F}$. Elle est bijective de $${R}$ sur $${R}$. Résous $${n}(x) = ${k}$.`, `on utilise $${n}(x) = ${F}$, bijective sur $${R}$. Quelle est l'unique solution de $${n}(x) = ${k}$ ?`, `la réponse suit $${n}(x) = ${F}$, strictement croissante sur $${R}$. Pour quel réel a-t-on $${n}(x) = ${k}$ ?`, `$${n}(x) = ${F}$ et sa dérivée est strictement positive. Quel réel vérifie $${n}(x) = ${k}$ ?`], ["", "La solution est un entier."])}`,
      x0,
      expl("une fonction dérivable de dérivée strictement positive est strictement croissante : c'est une bijection de son domaine sur son image.", "on vérifie la dérivée, on sait alors qu'il y a une seule solution, et on la trouve en testant de petits entiers.", `$${n}'(x) = 3x^2 + ${p} > 0$ et $${n}(${x0}) = ${k}$.`, `la solution est $${x0}$.`),
    );
  }),

  /* ===== reciproque_expression ===== */
  tpl("reciproque_expression", 1, 1, "Résous f(x) = k : c'est le réel cherché.", () => {
    const m = un([-5, -4, -3, -2, -1, 2, 3, 4, 5]);
    const p = nz(-9, 9);
    const x0 = entre(-6, 6);
    const k = m * x0 + p;
    const n = nomF();
    return court(
      phrase([`$${n}(x) = ${affine(m, p)}$ est une bijection de $${R}$ sur $${R}$. Que vaut $${n}^{-1}(${k})$ ?`, `Pour la bijection $${n}(x) = ${affine(m, p)}$ de $${R}$ sur $${R}$, calcule $${n}^{-1}(${k})$.`, `Soit $${n}(x) = ${affine(m, p)}$ sur $${R}$. Quelle est la valeur de $${n}^{-1}(${k})$ ?`, `On a $${n}(x) = ${affine(m, p)}$, bijective sur $${R}$. Quel réel a pour image $${k}$, c'est-à-dire $${n}^{-1}(${k})$ ?`], ["", "Résous une équation."]),
      x0,
      expl(`$${n}^{-1}(y)$ est l'unique $x$ tel que $${n}(x) = y$.`, `on résout $${n}(x) = ${k}$.`, `$${affine(m, p)} = ${k}$ donne $x = ${x0}$.`, `$${n}^{-1}(${k}) = ${x0}$.`),
    );
  }),
  tpl("reciproque_expression", 2, 1, "y = f(x) et x = f⁻¹(y) disent la même chose.", () => {
    const n = nomF();
    const x = melange([-4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6]).slice(0, 4);
    const y = melange([-7, -5, -2, 0, 1, 3, 4, 6, 8, 9, 11, 12]).slice(0, 4);
    const i = entre(0, 3);
    const data = x.map((a, k) => `$${n}(${a}) = ${y[k]}$`).join(", ");
    const forme = entre(0, 2);
    const fin = ["", "Lis les égalités données."];
    const debut = `La bijection $${n}$ vérifie ${data}.`;
    if (forme === 0)
      return court(phrase([`${debut} Que vaut $${n}^{-1}(${y[i]})$ ?`, `${debut} Calcule $${n}^{-1}(${y[i]})$.`, `Sachant que ${data}, avec $${n}$ bijective, quelle est la valeur de $${n}^{-1}(${y[i]})$ ?`], fin), x[i], expl(`$${n}^{-1}(y) = x$ équivaut à $${n}(x) = y$.`, `on cherche la valeur dont l'image est $${y[i]}$.`, `$${n}(${x[i]}) = ${y[i]}$.`, `$${n}^{-1}(${y[i]}) = ${x[i]}$.`));
    if (forme === 1)
      return court(phrase([`${debut} Que vaut $${n}^{-1}(${n}(${x[i]}))$ ?`, `${debut} Calcule $${n}^{-1}(${n}(${x[i]}))$.`], fin), x[i], expl(`$${n}^{-1}(${n}(x)) = x$ pour tout $x$ du départ.`, "la réciproque défait ce que fait la fonction.", `On revient à $${x[i]}$.`, `le résultat est $${x[i]}$.`));
    return court(phrase([`${debut} Que vaut $${n}(${n}^{-1}(${y[i]}))$ ?`, `${debut} Calcule $${n}(${n}^{-1}(${y[i]}))$.`], fin), y[i], expl(`$${n}(${n}^{-1}(y)) = y$ pour tout $y$ de l'arrivée.`, "la fonction défait ce que fait la réciproque.", `On revient à $${y[i]}$.`, `le résultat est $${y[i]}$.`));
  }),
  tpl("reciproque_expression", 3, 2, "Pars de y = f(x) et isole x.", () => {
    const F = familleAffine();
    const n = nomF();
    return qcm(
      phrase([`$${n}(x) = ${F.f}$ est une bijection de $${R}$ sur $${R}$. Quelle est sa réciproque ?`, `Quelle est l'expression de $${n}^{-1}$ pour $${n}(x) = ${F.f}$ sur $${R}$ ?`, `Soit $${n}(x) = ${F.f}$ sur $${R}$. Détermine $${n}^{-1}(x)$ pour tout réel $x$.`, `On cherche la réciproque de $${n}(x) = ${F.f}$, définie sur $${R}$. Laquelle est-ce ?`], ["", "Isole $x$.", "Vérifie sur un nombre."]),
      `$${n}^{-1}(x) = ${F.g}$`,
      F.faux.map((g) => `$${n}^{-1}(x) = ${g}$`),
      explExpression(n, F),
    );
  }),
  tpl("reciproque_expression", 4, 2, "Isole x dans y = f(x), en tenant compte de l'intervalle de départ.", () => {
    const F = familleUsuelle();
    const n = nomF();
    return qcm(
      phrase([`$${n}(x) = ${F.f}$ est une bijection de $${F.I}$ sur $${F.J}$. Quelle est sa réciproque ?`, `Sur $${F.I}$, $${n}(x) = ${F.f}$ est bijective, d'image $${F.J}$. Que vaut $${n}^{-1}(x)$ ?`, `Soit $${n}$ définie sur $${F.I}$ par $${n}(x) = ${F.f}$, à valeurs dans $${F.J}$. Quelle est l'expression de $${n}^{-1}$ ?`, `Quelle est la réciproque de $${n}(x) = ${F.f}$, bijective de $${F.I}$ sur $${F.J}$ ?`], ["", "Isole $x$.", "Vérifie sur une valeur."]),
      `$${n}^{-1}(x) = ${F.g}$`,
      F.faux.map((g) => `$${n}^{-1}(x) = ${g}$`),
      explExpression(n, F),
    );
  }),
  tpl("reciproque_expression", 5, 3, "Multiplie par le dénominateur, regroupe les x, puis factorise.", () => {
    const F = familleHomographique();
    const n = nomF();
    return qcm(
      phrase([`$${n}(x) = ${F.f}$ est une bijection de $${F.I}$ sur $${F.J}$. Quelle est sa réciproque ?`, `Quelle est l'expression de $${n}^{-1}$ pour $${n}(x) = ${F.f}$, bijective de $${F.I}$ sur $${F.J}$ ?`, `Un filtre électronique suit $${n}(x) = ${F.f}$, bijective de $${F.I}$ sur $${F.J}$. Pour retrouver l'entrée, que vaut $${n}^{-1}(x)$ ?`, `Dans un calcul d'optique, $${n}(x) = ${F.f}$ est bijective de $${F.I}$ sur $${F.J}$. Que vaut $${n}^{-1}(x)$ ?`, `Un modèle de pharmacologie utilise $${n}(x) = ${F.f}$, bijective de $${F.I}$ sur $${F.J}$. Quelle est sa réciproque ?`], ["", `Résous $y = ${n}(x)$.`, "Vérifie avec une valeur."]),
      `$${n}^{-1}(x) = ${F.g}$`,
      F.faux.map((g) => `$${n}^{-1}(x) = ${g}$`),
      expl(`$${n}^{-1}$ s'obtient en résolvant $${n}(x) = y$.`, "on multiplie par le dénominateur, on regroupe les termes en $x$, on factorise, on divise.", `On trouve $x = ${F.g.replace(/x/g, "y")}$.`, `$${n}^{-1}(x) = ${F.g}$.`),
    );
  }),
  tpl("reciproque_expression", 6, 3, "Connaître le résultat et chercher l'entrée, c'est appliquer la réciproque.", () => {
    const c = un(CTX_INV);
    const m = c.m();
    const p = c.p();
    const x0 = entre(2, 12);
    const y = m * x0 + p;
    const n = nomF();
    return court(
      c.t(n, affine(m, p), y),
      x0,
      expl(`$${n}^{-1}(y)$ est la valeur de $x$ dont l'image est $y$.`, `on résout $${affine(m, p)} = ${y}$.`, `$${m}x = ${y - p}$, donc $x = ${x0}$.`, `$${n}^{-1}(${y}) = ${x0}$.`),
    );
  }),

  /* ===== reciproque_courbe ===== */
  tpl("reciproque_courbe", 1, 1, "Les courbes sont symétriques par rapport à y = x : on échange les coordonnées.", () => {
    let [a, b] = [nz(-7, 7), nz(-7, 7)];
    while (a === b || a === -b) [a, b] = [nz(-7, 7), nz(-7, 7)];
    const n = nomF();
    const P = un(["A", "B", "M", "N", "P", "R"]);
    return qcm(
      phrase([`Le point $${P}(${a}\\,;${b})$ est sur la courbe de $${n}$. Quel point est sur la courbe de $${n}^{-1}$ ?`, `La courbe de la bijection $${n}$ passe par $${P}(${a}\\,;${b})$. Par quel point passe celle de $${n}^{-1}$ ?`, `On sait que $${P}(${a}\\,;${b})$ appartient à la courbe de $${n}$. Lequel de ces points appartient à la courbe de $${n}^{-1}$ ?`, `$${n}$ est bijective et sa courbe contient $${P}(${a}\\,;${b})$. Quel point contient la courbe de $${n}^{-1}$ ?`], ["", "Pense à la droite d'équation $y = x$.", "Échange ce qu'il faut."]),
      `$(${b}\\,;${a})$`,
      [`$(${a}\\,;${-b})$`, `$(${-a}\\,;${b})$`, `$(${-a}\\,;${-b})$`, `$(${-b}\\,;${-a})$`],
      expl("dans un repère orthonormé, les courbes de $f$ et de $f^{-1}$ sont symétriques par rapport à la droite d'équation $y = x$.", "la symétrie par rapport à $y = x$ échange abscisse et ordonnée.", `$(${a}\\,;${b})$ devient $(${b}\\,;${a})$.`, `le point cherché est $(${b}\\,;${a})$.`),
    );
  }),
  tpl("reciproque_courbe", 2, 1, "Calcule d'abord f(a) : le point de la courbe de f, puis échange ses coordonnées.", () => {
    const c = nz(-5, 5);
    const m = un([2, 3, 4, -2, -3]);
    const a = nz(1, 3);
    const fam = un<{ f: string; v: (x: number) => number }>([
      { f: affine(m, c), v: (x) => m * x + c },
      { f: plus("x^2", c), v: (x) => x * x + c },
      { f: plus("x^3", c), v: (x) => x ** 3 + c },
      { f: plus("-x^2", c), v: (x) => -x * x + c },
    ]);
    let y = fam.v(a);
    if (y === 0 || y === a || y === -a) y = fam.v(a + 5);
    const x = y === fam.v(a) ? a : a + 5;
    const n = nomF();
    return qcm(
      phrase([`Soit $${n}(x) = ${fam.f}$, bijective de $[0\\,;+\\infty[$ sur son image. Quel point d'ordonnée $${x}$ est sur la courbe de $${n}^{-1}$ ?`, `Pour $${n}(x) = ${fam.f}$ sur $[0\\,;+\\infty[$, quel point de la courbe de $${n}^{-1}$ a pour ordonnée $${x}$ ?`, `La courbe de $${n}^{-1}$, réciproque de $${n}(x) = ${fam.f}$ sur $[0\\,;+\\infty[$, contient un point d'ordonnée $${x}$. Lequel ?`], ["", "Calcule d'abord une image."]),
      `$(${y}\\,;${x})$`,
      [`$(${x}\\,;${y})$`, `$(${-y}\\,;${x})$`, `$(${y}\\,;${-x})$`, `$(${-x}\\,;${-y})$`],
      expl("$(a\\,;b)$ est sur la courbe de $f$ si et seulement si $(b\\,;a)$ est sur celle de $f^{-1}$.", "on calcule l'image de l'ordonnée demandée, puis on échange les coordonnées.", `$${n}(${x}) = ${y}$, donc $(${x}\\,;${y})$ est sur la courbe de $${n}$.`, `$(${y}\\,;${x})$ est sur la courbe de $${n}^{-1}$.`),
    );
  }),
  tpl("reciproque_courbe", 3, 2, "Sur la courbe de f, cherche le point d'ordonnée k : son abscisse est f⁻¹(k).", () => {
    const L = lisible();
    const x0 = un(L.xs);
    const k = L.v(x0);
    const n = nomF();
    return court(
      phrase([`On a tracé la courbe de la bijection $${n}$ et la droite $y = x$. Lis $${n}^{-1}(${k})$.`, `La courbe bleue est celle de $${n}$, bijective. Que vaut $${n}^{-1}(${k})$ ?`, `D'après la courbe de $${n}$, quelle est la valeur de $${n}^{-1}(${k})$ ?`, `Sur le graphique, quel réel a pour image $${k}$ par $${n}$, c'est-à-dire $${n}^{-1}(${k})$ ?`, `Grâce à la courbe bleue de $${n}$, détermine $${n}^{-1}(${k})$.`, `Avec le quadrillage et la courbe de $${n}$, donne $${n}^{-1}(${k})$.`], ["", "Lis sur le quadrillage.", "Part de l'axe des ordonnées.", "Cherche l'ordonnée sur la courbe.", "La réponse est un entier."]),
      x0,
      expl(`$${n}^{-1}(k)$ est l'abscisse du point de la courbe de $${n}$ d'ordonnée $k$.`, `on part de $${k}$ sur l'axe des ordonnées, on rejoint la courbe, puis on descend sur l'axe des abscisses.`, `Le point de la courbe d'ordonnée $${k}$ a pour abscisse $${x0}$.`, `$${n}^{-1}(${k}) = ${x0}$.`),
      figureCourbe(L.v, L.a, L.b),
    );
  }),
  tpl("reciproque_courbe", 4, 2, "Un point commun à la courbe et à la droite y = x vérifie f(x) = x.", () => {
    const n = nomF();
    const r = entre(2, 7);
    const m = un([2, 3, 4, 5, -1, -2, -3]);
    const fam = un<{ f: string; I: string; s: number }>([
      { f: affine(m, r * (1 - m)), I: R, s: r },
      { f: plus("x^2", r - r * r), I: "[1\\,;+\\infty[", s: r },
      { f: `\\sqrt{${plus("x", r * r - r)}}`, I: "[1\\,;+\\infty[", s: r },
    ]);
    return court(
      phrase([`Soit $${n}(x) = ${fam.f}$ sur $${fam.I}$. Les courbes de $${n}$ et de $${n}^{-1}$ se coupent sur la droite $y = x$. Quelle est l'abscisse de ce point ?`, `La courbe de $${n}(x) = ${fam.f}$, sur $${fam.I}$, coupe la droite $y = x$ en un point commun avec celle de $${n}^{-1}$. Donne son abscisse.`, `Avec $${n}(x) = ${fam.f}$ sur $${fam.I}$, en quelle abscisse la courbe rencontre-t-elle la droite d'équation $y = x$ ?`, `Soit $${n}(x) = ${fam.f}$. Sur $${fam.I}$, résous $${n}(x) = x$ : ce point est aussi sur la courbe de $${n}^{-1}$.`], ["", `Résous $${n}(x) = x$.`]),
      fam.s,
      expl("un point de la droite $y = x$ est sa propre image par la symétrie : s'il est sur la courbe de $f$, il est sur celle de $f^{-1}$.", "on résout $f(x) = x$ sur l'intervalle.", `$${n}(${fam.s}) = ${fam.s}$.`, `l'abscisse est $${fam.s}$.`),
    );
  }),
  tpl("reciproque_courbe", 5, 3, "La réciproque garde le même sens de variation, sur l'intervalle image.", () => {
    const m = fonctionMono();
    const n = nomF();
    const [p, q] = [m.v(m.a), m.v(m.b)];
    const croit = q > p;
    const J = seg(Math.min(p, q), Math.max(p, q));
    const I = seg(m.a, m.b);
    const sens = croit ? "croissante" : "décroissante";
    const autre = croit ? "décroissante" : "croissante";
    // Si I et J coïncident, les propositions se confondraient : on décale l'intervalle cité.
    const Jb = J === I ? seg(m.a + 1, m.b + 1) : I;
    return qcm(
      `${un(CTX_MODELE)} ${phrase([`on utilise $${n}(x) = ${m.f}$, continue et strictement monotone sur $${I}$. Comment varie $${n}^{-1}$ ?`, `la relation est $${n}(x) = ${m.f}$ sur $${I}$, continue et strictement monotone. Quelle est la variation de sa réciproque ?`, `le calcul inverse de $${n}(x) = ${m.f}$, continue et strictement monotone sur $${I}$, se fait par $${n}^{-1}$. Quel est son sens de variation ?`], ["", "Calcule les images des bornes."])}`,
      `Strictement ${sens} sur $${J}$`,
      [`Strictement ${autre} sur $${J}$`, `Strictement ${sens} sur $${Jb}$`, `Strictement ${autre} sur $${Jb}$`],
      expl("la réciproque d'une fonction continue strictement monotone a le même sens de variation, et elle est définie sur l'image.", "on calcule $f(I)$ avec les images des bornes, puis on garde le sens de variation.", `$${n}(${m.a}) = ${p}$ et $${n}(${m.b}) = ${q}$ : $${n}$ est strictement ${sens}, d'image $${J}$.`, `$${n}^{-1}$ est strictement ${sens} sur $${J}$.`),
    );
  }),
  tpl("reciproque_courbe", 6, 3, "La réciproque est définie sur l'image de f, pas sur son ensemble de départ.", () => {
    let F = familleUsuelle();
    while (F.J === F.I) F = familleUsuelle();
    const n = nomF();
    const borne = F.J.match(/-?\d+/)?.[0] ?? "0";
    const v = Number(borne);
    const pieges = [F.I, F.J.startsWith("]") ? dd(v) : dd(v, true), R, gg(v), gg(v, true), dd(v + 1), dd(-v - 1)].filter((j) => j !== F.J);
    return qcm(
      `${un(CTX_MODELE)} ${phrase([`on utilise $${n}(x) = ${F.f}$ sur $${F.I}$, strictement monotone. Sur quel intervalle $${n}^{-1}$ est-elle définie ?`, `la relation $${n}(x) = ${F.f}$, sur $${F.I}$, est bijective sur son image. Quel est l'ensemble de définition de $${n}^{-1}$ ?`, `on veut inverser $${n}(x) = ${F.f}$, strictement monotone sur $${F.I}$. Quelles valeurs peut recevoir $${n}^{-1}$ ?`], ["", "Cherche les limites aux bornes."])}`,
      `$${F.J}$`,
      pieges.map((j) => `$${j}$`),
      expl("$f^{-1}$ est définie sur $f(I)$.", "on calcule l'image de l'intervalle par le sens de variation, avec les valeurs ou les limites aux bornes.", `L'image de $${F.I}$ par $${n}$ est $${F.J}$.`, `$${n}^{-1}$ est définie sur $${F.J}$.`),
    );
  }),

  /* ===== reciproque_derivee ===== */
  tpl("reciproque_derivee", 1, 1, "Le nombre dérivé de la réciproque est l'inverse du nombre dérivé de f.", () => {
    const a = entre(-5, 5);
    const b = entre(-9, 9);
    const n = nomF();
    const num = entre(1, 4);
    const m = un([2, 3, 4, 5, 6, 7, 8, 9, -2, -3, -4, -5]);
    const frac = Math.random() < 0.3 && Math.abs(m) !== num && Math.abs(m) % num !== 0;
    const fpL = frac ? somme([T(num * (m < 0 ? -1 : 1), Math.abs(m))]) : String(m);
    const jusL = frac ? somme([T(Math.abs(m) * (m < 0 ? -1 : 1), num)]) : inverseL(m);
    const oppose = frac ? somme([T(-Math.abs(m) * (m < 0 ? -1 : 1), num)]) : inverseL(-m);
    const vers = `(${n}^{-1})'(${b})`;
    return qcm(
      phrase([`$${n}$ est bijective et dérivable, avec $${n}(${a}) = ${b}$ et $${n}'(${a}) = ${fpL}$. Que vaut $${vers}$ ?`, `On sait que $${n}(${a}) = ${b}$ et $${n}'(${a}) = ${fpL}$, pour une bijection dérivable $${n}$. Calcule $${vers}$.`, `Pour la bijection dérivable $${n}$, on a $${n}'(${a}) = ${fpL}$ et $${n}(${a}) = ${b}$. Quelle est la valeur de $${vers}$ ?`, `Soit $${n}$ dérivable et bijective, telle que $${n}(${a}) = ${b}$ et $${n}'(${a}) = ${fpL}$. Détermine $${vers}$.`], ["", "Utilise la formule du cours."]),
      `$${jusL}$`,
      [`$${fpL}$`, `$${oppose}$`, `$${frac ? inverseL(m + 1 || 3) : `${-m}`}$`, `$${inverseL(m + (m > 0 ? 2 : -2))}$`],
      expl("si $f$ est dérivable en $a$ avec $f'(a) \\neq 0$, alors $(f^{-1})'(f(a)) = \\dfrac{1}{f'(a)}$.", `on repère que $${b}$ est l'image de $${a}$, puis on prend l'inverse de $${n}'(${a})$.`, `$${vers} = \\dfrac{1}{${n}'(${a})}$.`, `$${vers} = ${jusL}$.`),
    );
  }),
  tpl("reciproque_derivee", 2, 1, "Calcule 1 divisé par le nombre dérivé. Écris le résultat en décimal.", () => {
    const a = entre(-5, 5);
    const b = entre(-9, 9);
    const n = nomF();
    const m = un([1, 2, 4, 5, 8, 10, 20, -1, -2, -4, -5, -8, -10]);
    const vers = `(${n}^{-1})'(${b})`;
    return court(
      phrase([`$${n}$ est bijective et dérivable, $${n}(${a}) = ${b}$ et $${n}'(${a}) = ${m}$. Donne $${vers}$ en écriture décimale.`, `On a $${n}(${a}) = ${b}$ et $${n}'(${a}) = ${m}$ pour une bijection dérivable. Calcule $${vers}$, en décimal.`, `La tangente à la courbe de $${n}$ au point d'abscisse $${a}$ a pour coefficient directeur $${m}$, et $${n}(${a}) = ${b}$. Que vaut $${vers}$, en décimal ?`, `Avec $${n}'(${a}) = ${m}$ et $${n}(${a}) = ${b}$, quelle est la valeur décimale de $${vers}$ ?`], ["", "Divise $1$ par le nombre dérivé."]),
      fr(1 / m),
      expl("$(f^{-1})'(f(a)) = \\dfrac{1}{f'(a)}$.", `on divise $1$ par $${n}'(${a})$.`, `$1 \\div (${m}) = ${fr(1 / m).replace(",", "{,}")}$.`, `$${vers} = ${fr(1 / m).replace(",", "{,}")}$.`),
    );
  }),
  tpl("reciproque_derivee", 3, 2, "Trouve d'abord le a tel que f(a) = y₀, puis calcule 1/f'(a).", () => {
    const p = entre(1, 9);
    const c = nz(-9, 9);
    const x0 = nz(-3, 3);
    const n = nomF();
    const y = x0 ** 3 + p * x0 + c;
    const d = 3 * x0 * x0 + p;
    const F = plus(`x^3 + ${p === 1 ? "" : p}x`, c);
    const vers = `(${n}^{-1})'(${y})`;
    return qcm(
      phrase([`$${n}(x) = ${F}$ est une bijection de $${R}$ sur $${R}$, et $${n}(${x0}) = ${y}$. Que vaut $${vers}$ ?`, `On pose $${n}(x) = ${F}$, bijective sur $${R}$. Sachant que $${n}(${x0}) = ${y}$, calcule $${vers}$.`, `Pour $${n}(x) = ${F}$ (bijective sur $${R}$), on a $${n}(${x0}) = ${y}$. Détermine $${vers}$.`, `Avec $${n}(${x0}) = ${y}$ et $${n}(x) = ${F}$, bijective sur $${R}$, quelle est la valeur de $${vers}$ ?`], ["", "Dérive d'abord $f$."]),
      `$\\dfrac{1}{${d}}$`,
      [`$${d}$`, `$-\\dfrac{1}{${d}}$`, `$\\dfrac{1}{${d + 1}}$`, `$\\dfrac{1}{${Math.abs(y) + 2 === d ? d + 2 : Math.abs(y) + 2}}$`, `$\\dfrac{1}{${d + 3}}$`],
      expl("$(f^{-1})'(f(a)) = \\dfrac{1}{f'(a)}$.", `on dérive $${n}$, puis on calcule $${n}'(${x0})$.`, `$${n}'(x) = 3x^2 + ${p}$, donc $${n}'(${x0}) = ${d}$.`, `$${vers} = \\dfrac{1}{${d}}$.`),
    );
  }),
  tpl("reciproque_derivee", 4, 2, "Écris y₀ = f(a), avec a dans l'intervalle de départ, puis prends l'inverse de f'(a).", () => {
    const n = nomF();
    const a = entre(1, 6);
    const c = nz(-5, 5);
    const k = entre(2, 5);
    const fam = un<{ f: string; I: string; y: number; d: number; dL: string }>([
      { f: "x^2", I: dd(0), y: a * a, d: 2 * a, dL: "2x" },
      { f: plus("x^2", c), I: dd(0), y: a * a + c, d: 2 * a, dL: "2x" },
      { f: "x^3", I: dd(0), y: a ** 3, d: 3 * a * a, dL: "3x^2" },
      { f: plus("x^3", c), I: dd(0), y: a ** 3 + c, d: 3 * a * a, dL: "3x^2" },
      { f: `${k}x^2`, I: dd(0), y: k * a * a, d: 2 * k * a, dL: `${2 * k}x` },
      { f: `${k}x^2 + ${Math.abs(c)}`, I: dd(0), y: k * a * a + Math.abs(c), d: 2 * k * a, dL: `${2 * k}x` },
    ]);
    const vers = `(${n}^{-1})'(${fam.y})`;
    return qcm(
      phrase([`$${n}(x) = ${fam.f}$ est bijective sur $${fam.I}$. Calcule $${vers}$.`, `Sur $${fam.I}$, $${n}(x) = ${fam.f}$ admet une réciproque. Que vaut $${vers}$ ?`, `Soit $${n}(x) = ${fam.f}$, restreinte à $${fam.I}$. Détermine $${vers}$.`, `Quelle est la valeur de $${vers}$, pour la réciproque de $${n}(x) = ${fam.f}$ sur $${fam.I}$ ?`], ["", "Trouve d'abord l'antécédent."]),
      `$\\dfrac{1}{${fam.d}}$`,
      [`$${fam.d}$`, `$\\dfrac{1}{${Math.abs(fam.y) + 1 === fam.d ? Math.abs(fam.y) + 2 : Math.abs(fam.y) + 1}}$`, `$\\dfrac{1}{${fam.d + 2}}$`, `$-\\dfrac{1}{${fam.d}}$`],
      expl("$(f^{-1})'(f(a)) = \\dfrac{1}{f'(a)}$.", `on cherche $a$ tel que $${n}(a) = ${fam.y}$ dans l'intervalle, puis on calcule $${n}'(a)$.`, `$${n}(${a}) = ${fam.y}$ et $${n}'(x) = ${fam.dL}$, donc $${n}'(${a}) = ${fam.d}$.`, `$${vers} = \\dfrac{1}{${fam.d}}$.`),
    );
  }),
  tpl("reciproque_derivee", 5, 3, "La tangente à la courbe de f⁻¹ passe par (b ; a), avec le coefficient 1/f'(a).", () => {
    const n = nomF();
    const a = entre(-4, 4);
    let b = nz(-6, 6);
    while (b === a) b = nz(-6, 6);
    const m = un([2, 3, 4, 5, -2, -3, -4]);
    const ord = `y = ${m > 0 ? "" : "-"}\\dfrac{1}{${Math.abs(m)}}(${moinsDans(b)})`;
    const eq = plus(ord, a);
    const eqOpp = plus(`y = ${m > 0 ? "-" : ""}\\dfrac{1}{${Math.abs(m)}}(${moinsDans(b)})`, a);
    return qcm(
      `${un(CTX_MODELE)} ${phrase([`la courbe de la bijection $${n}$ passe par $(${a}\\,;${b})$, et $${n}'(${a}) = ${m}$. Quelle est la tangente à la courbe de $${n}^{-1}$ au point d'abscisse $${b}$ ?`, `on a $${n}(${a}) = ${b}$ et $${n}'(${a}) = ${m}$. Quelle est l'équation de la tangente à la courbe de $${n}^{-1}$ en $${b}$ ?`, `$${n}$ est bijective, $${n}(${a}) = ${b}$, $${n}'(${a}) = ${m}$. Donne la tangente en $${b}$ à la courbe de $${n}^{-1}$.`], ["", "Le coefficient directeur est le nombre dérivé de la réciproque."])}`,
      `$${eq}$`,
      [`$${eqOpp}$`, `$${plus(`y = ${m}(${moinsDans(b)})`, a)}$`, `$${plus(ord.replace(moinsDans(b), moinsDans(a)), b)}$`, `$${plus(`y = ${m}(${moinsDans(a)})`, b)}$`],
      expl("la tangente à la courbe de $r$ en $b$ a pour équation $y = r'(b)(x - b) + r(b)$.", `avec $r = ${n}^{-1}$ : $r(${b}) = ${a}$ et $r'(${b}) = \\dfrac{1}{${n}'(${a})}$.`, `$r'(${b}) = ${inverseL(m)}$.`, `$${eq}$.`),
    );
  }),
  tpl("reciproque_derivee", 6, 3, "La sensibilité du calcul inverse est l'inverse de celle du calcul direct.", () => {
    const n = nomF();
    const a = entre(1, 40);
    const b = entre(10, 90);
    const m = un([2, 4, 5, 8, 10, 20]);
    const C = un<(a: number, b: number, m: number) => string>([
      (a, b, m) => `Un capteur de température donne $${n}(${a}) = ${b}$ millivolts à ${a} degrés, avec $${n}'(${a}) = ${m}$.`,
      (a, b, m) => `Un réservoir contient $${n}(${a}) = ${b}$ litres après ${a} minutes, avec un débit $${n}'(${a}) = ${m}$.`,
      (a, b, m) => `Une pièce parcourt $${n}(${a}) = ${b}$ mètres après ${a} secondes, à la vitesse $${n}'(${a}) = ${m}$.`,
      (a, b, m) => `Une balance donne $${n}(${a}) = ${b}$ unités pour ${a} grammes, avec une sensibilité $${n}'(${a}) = ${m}$.`,
      (a, b, m) => `Une culture de levures atteint $${n}(${a}) = ${b}$ grammes après ${a} heures, avec une vitesse $${n}'(${a}) = ${m}$.`,
      (a, b, m) => `Un avion monte à $${n}(${a}) = ${b}$ hectomètres après ${a} minutes, à la vitesse $${n}'(${a}) = ${m}$.`,
      (a, b, m) => `Une batterie reçoit $${n}(${a}) = ${b}$ unités d'énergie après ${a} minutes, avec une puissance $${n}'(${a}) = ${m}$.`,
      (a, b, m) => `Un lac gagne $${n}(${a}) = ${b}$ centimètres après ${a} heures de pluie, avec une vitesse $${n}'(${a}) = ${m}$.`,
      (a, b, m) => `Une caméra de vitesse mesure $${n}(${a}) = ${b}$ impulsions pour ${a} mètres par seconde, avec $${n}'(${a}) = ${m}$.`,
      (a, b, m) => `Un four atteint $${n}(${a}) = ${b}$ degrés après ${a} minutes, avec une vitesse de chauffe $${n}'(${a}) = ${m}$.`,
    ]);
    return court(
      `${C(a, b, m)} ${un([`Le calcul inverse se fait par $${n}^{-1}$. Que vaut $(${n}^{-1})'(${b})$, en décimal ?`, `Calcule $(${n}^{-1})'(${b})$ en écriture décimale.`, `On retrouve l'entrée avec $${n}^{-1}$. Donne $(${n}^{-1})'(${b})$ en décimal.`, `À quelle vitesse varie l'entrée ? Donne $(${n}^{-1})'(${b})$ en décimal.`, `Quelle est la valeur décimale de $(${n}^{-1})'(${b})$ ?`])}`,
      fr(1 / m),
      expl("$(f^{-1})'(f(a)) = \\dfrac{1}{f'(a)}$.", `$${b}$ est l'image de $${a}$ : on prend l'inverse de $${n}'(${a})$.`, `$1 \\div ${m} = ${fr(1 / m).replace(",", "{,}")}$.`, `$(${n}^{-1})'(${b}) = ${fr(1 / m).replace(",", "{,}")}$.`),
    );
  }),
];
