// COMBINAISON LINÉAIRE DE DEUX VECTEURS, PROGRAMME 2026 DE SECONDE (05/11/2026) :
// calculer les coordonnées de au + bv, retrouver a et b, décomposer dans un parallélogramme.

import type { CanvasFigure, TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { court, entre, expl, fabrique, nL, qcm, un } from "../../lycee-commun";

const tpl = fabrique("seconde", "vecteurs_plan", "2de_");

const nz = (a: number, b: number) => {
  for (;;) {
    const v = entre(a, b);
    if (v) return v;
  }
};
const co = (x: number, y: number) => `(${x}\\,;${y})`;
const V = (n: string, v: number[]) => `$\\vec{${n}}\\,${co(v[0], v[1])}$`;
/** « 2\vec{u} - \vec{v} » : on garde l'ordre u, v. */
export const comb = (l: number, m: number, a = "\\vec{u}", b = "\\vec{v}") => `${l === 1 ? "" : l === -1 ? "-" : l}${a} ${m < 0 ? "-" : "+"} ${Math.abs(m) === 1 ? "" : Math.abs(m)}${b}`;
const DEF = "si $\\vec{u}\\,(a\\,;b)$ et $\\vec{v}\\,(c\\,;d)$, alors $\\lambda\\vec{u} + \\mu\\vec{v}$ a pour coordonnées $(\\lambda a + \\mu c\\,;\\lambda b + \\mu d)$.";
const DONNE = () => un(["Dans un repère, on donne", "On considère", "Soient", "Dans un repère du plan, on a"]);

/** Deux vecteurs non colinéaires à coordonnées simples. */
function base() {
  for (;;) {
    const u = [nz(-5, 5), nz(-5, 5)];
    const v = [nz(-5, 5), nz(-5, 5)];
    if (u[0] * v[1] - u[1] * v[0]) return { u, v };
  }
}
const pm = (x: number) => (x < 0 ? `(${x})` : String(x));

type Cas = { t: (n: string[]) => string; l: number[]; p: string };
const NOMS = [["A", "B", "C", "D"], ["E", "F", "G", "H"], ["M", "N", "P", "Q"], ["R", "S", "T", "U"]];
const figPara = (n: string[]): CanvasFigure =>
  ({
    kind: "quadrilatere",
    size: { width: 320, height: 200 },
    points: { A: { x: 90, y: 50 }, B: { x: 270, y: 50 }, C: { x: 210, y: 150 }, D: { x: 30, y: 150 } },
    labels: { A: n[0], B: n[1], C: n[2], D: n[3] },
    display: { showPoints: true, showLabels: true, showSides: true },
  }) as CanvasFigure;
const vv = (a: string, b: string) => `\\overrightarrow{${a}${b}}`;
/** Décompositions sur (côté 1, côté 2) dans un parallélogramme : coefficients en demis. */
const CAS: Cas[] = [
  { t: (n) => vv(n[0], n[2]), l: [2, 2], p: "la diagonale partant du même sommet est la somme des deux côtés" },
  { t: (n) => vv(n[1], n[3]), l: [-2, 2], p: "on passe par le premier sommet : relation de Chasles" },
  { t: (n) => vv(n[3], n[1]), l: [2, -2], p: "on passe par le premier sommet : relation de Chasles" },
  { t: (n) => vv(n[2], n[0]), l: [-2, -2], p: "c'est l'opposé de la grande diagonale" },
  { t: (n) => vv(n[1], n[2]), l: [0, 2], p: "deux côtés opposés d'un parallélogramme donnent le même vecteur" },
  { t: (n) => vv(n[2], n[3]), l: [-2, 0], p: "deux côtés opposés, parcourus en sens contraires, donnent des vecteurs opposés" },
];
const moitie = (d: number) => (d === 1 ? "\\dfrac{1}{2}" : d === -1 ? "-\\dfrac{1}{2}" : String(d / 2));
const ecrit = (a: number, b: number, x: string, y: string) => {
  const t = (d: number, s: string) => (d === 2 ? s : d === -2 ? `-${s}` : `${moitie(d)}${s}`);
  if (!a) return `$${t(b, y)}$`;
  if (!b) return `$${t(a, x)}$`;
  const sb = b < 0 ? "-" : "+";
  return `$${t(a, x)} ${sb} ${t(Math.abs(b), y)}$`;
};

export const vecteurCombinaisonBank: TutorBankItemV4[] = [
  tpl("vecteur_combinaison_lineaire", 1, 1, "Multiplie chaque coordonnée, puis additionne.", () => {
    const { u, v } = base();
    const l = nz(-4, 4);
    const m = nz(-4, 4);
    const i = entre(0, 1);
    const r = l * u[i] + m * v[i];
    return court(`${DONNE()} ${V("u", u)} et ${V("v", v)}. On pose $\\vec{w} = ${comb(l, m)}$. ${un([`Quelle est ${i ? "l'ordonnée" : "l'abscisse"} de $\\vec{w}$ ?`, `Calcule ${i ? "l'ordonnée" : "l'abscisse"} de $\\vec{w}$.`, `Que vaut ${i ? "l'ordonnée" : "l'abscisse"} de $\\vec{w}$ ?`])}`, r, expl(DEF, `on applique la formule ${i ? "à l'ordonnée" : "à l'abscisse"}.`, `$${l} \\times ${pm(u[i])} + ${pm(m)} \\times ${pm(v[i])} = ${r}$.`, `${i ? "l'ordonnée" : "l'abscisse"} vaut $${r}$.`));
  }),
  tpl("vecteur_combinaison_lineaire", 2, 1, "Calcule séparément l'abscisse et l'ordonnée.", () => {
    const { u, v } = base();
    const l = nz(-4, 4);
    const m = nz(-4, 4);
    const x = l * u[0] + m * v[0];
    const y = l * u[1] + m * v[1];
    return qcm(`${DONNE()} ${V("u", u)} et ${V("v", v)}. ${un([`Quelles sont les coordonnées de $${comb(l, m)}$ ?`, `Que valent les coordonnées de $\\vec{w} = ${comb(l, m)}$ ?`, `Calcule les coordonnées de $\\vec{w} = ${comb(l, m)}$.`])}`, `$${co(x, y)}$`, [`$${co(y, x)}$`, `$${co(l * u[0] - m * v[0], l * u[1] - m * v[1])}$`, `$${co(u[0] + v[0], u[1] + v[1])}$`, `$${co(-x, -y)}$`, `$${co(x + 1, y)}$`, `$${co(x, y - 1)}$`], expl(DEF, "on calcule séparément les deux coordonnées.", `$${l} \\times ${pm(u[0])} + ${pm(m)} \\times ${pm(v[0])} = ${x}$ et $${l} \\times ${pm(u[1])} + ${pm(m)} \\times ${pm(v[1])} = ${y}$.`, `$\\vec{w}\\,${co(x, y)}$.`));
  }),
  tpl("vecteur_combinaison_lineaire", 3, 2, "Écris l'égalité sur une coordonnée : il ne reste qu'une inconnue.", () => {
    const { u, v } = base();
    const l = nz(-4, 4);
    const m = nz(-4, 4);
    const w = [l * u[0] + m * v[0], l * u[1] + m * v[1]];
    const inconnue = un(["a", "b"] as const);
    const ecr = inconnue === "a" ? `a\\vec{u} ${m < 0 ? "-" : "+"} ${Math.abs(m) === 1 ? "" : Math.abs(m)}\\vec{v}` : `${l === 1 ? "" : l === -1 ? "-" : l}\\vec{u} + b\\vec{v}`;
    const q = un([`Quelle est la valeur de $${inconnue}$ ?`, `Trouve le nombre $${inconnue}$.`, `Détermine $${inconnue}$.`]);
    return court(`${DONNE()} ${V("u", u)}, ${V("v", v)} et ${V("w", w)}. On sait que $\\vec{w} = ${ecr}$. ${q}`, inconnue === "a" ? l : m, expl(DEF, "on écrit l'égalité des abscisses, puis on résout.", inconnue === "a" ? `$a \\times ${pm(u[0])} + ${pm(m)} \\times ${pm(v[0])} = ${w[0]}$, donc $a = ${l}$.` : `$${l} \\times ${pm(u[0])} + b \\times ${pm(v[0])} = ${w[0]}$, donc $b = ${m}$.`, `$${inconnue} = ${inconnue === "a" ? l : m}$.`));
  }),
  tpl("vecteur_combinaison_lineaire", 4, 2, "Fais le chemin sur les côtés du parallélogramme, avec la relation de Chasles.", () => {
    const n = un(NOMS);
    const c = un(CAS);
    const x = vv(n[0], n[1]);
    const y = vv(n[0], n[3]);
    const j = ecrit(c.l[0], c.l[1], x, y);
    const faux = [ecrit(2, 2, x, y), ecrit(-2, 2, x, y), ecrit(2, -2, x, y), ecrit(-2, -2, x, y), ecrit(0, 2, x, y), ecrit(2, 0, x, y), ecrit(-2, 0, x, y), ecrit(0, -2, x, y)];
    return qcm(`$${n.join("")}$ est un parallélogramme. ${un(["Exprime", "Écris", "Décompose"])} $${c.t(n)}$ ${un(["en fonction de", "à l'aide de"])} $${x}$ et $${y}$.`, j, faux, expl("relation de Chasles : on peut décomposer un vecteur en passant par un point intermédiaire. Dans un parallélogramme, deux côtés opposés et de même sens donnent le même vecteur.", `${c.p}.`, `$${c.t(n)} = $ ${j}.`, `on obtient ${j}.`), figPara(n));
  }),
  tpl("vecteur_combinaison_lineaire", 5, 3, "Le milieu donne un coefficient un demi ; passe par le sommet qui permet de suivre les côtés.", () => {
    const n = un(NOMS);
    const x = vv(n[0], n[1]);
    const y = vv(n[0], n[3]);
    const c = un([
      { d: `$I$ est le milieu de $[${n[1]}${n[2]}]$`, v: vv(n[0], "I"), l: [2, 1], p: `$${vv(n[0], n[1])} + ${vv(n[1], "I")}$, avec $${vv(n[1], "I")} = \\dfrac{1}{2}${y}$` },
      { d: `$I$ est le milieu de $[${n[2]}${n[3]}]$`, v: vv(n[0], "I"), l: [1, 2], p: `$${vv(n[0], n[3])} + ${vv(n[3], "I")}$, avec $${vv(n[3], "I")} = \\dfrac{1}{2}${x}$` },
      { d: `$O$ est le centre du parallélogramme`, v: vv(n[0], "O"), l: [1, 1], p: `$\\dfrac{1}{2}${vv(n[0], n[2])}$` },
      { d: `$I$ est le milieu de $[${n[0]}${n[1]}]$`, v: vv("I", n[2]), l: [1, 2], p: `$${vv("I", n[1])} + ${vv(n[1], n[2])}$, avec $${vv("I", n[1])} = \\dfrac{1}{2}${x}$` },
      { d: `$I$ est le milieu de $[${n[0]}${n[3]}]$`, v: vv("I", n[2]), l: [2, 1], p: `$${vv("I", n[3])} + ${vv(n[3], n[2])}$, avec $${vv("I", n[3])} = \\dfrac{1}{2}${y}$` },
      { d: `$I$ est le milieu de $[${n[1]}${n[2]}]$`, v: vv(n[3], "I"), l: [2, -1], p: `$${vv(n[3], n[2])} + ${vv(n[2], "I")}$, avec $${vv(n[2], "I")} = -\\dfrac{1}{2}${y}$` },
      { d: `$I$ est le milieu de $[${n[2]}${n[3]}]$`, v: vv(n[1], "I"), l: [-1, 2], p: `$${vv(n[1], n[2])} + ${vv(n[2], "I")}$, avec $${vv(n[2], "I")} = -\\dfrac{1}{2}${x}$` },
    ]);
    const j = ecrit(c.l[0], c.l[1], x, y);
    const faux = [ecrit(2, 1, x, y), ecrit(1, 2, x, y), ecrit(1, 1, x, y), ecrit(2, -1, x, y), ecrit(-1, 2, x, y), ecrit(2, 2, x, y)];
    return qcm(`$${n.join("")}$ est un parallélogramme et ${c.d}. ${un(["Exprime", "Écris", "Décompose"])} $${c.v}$ ${un(["en fonction de", "à l'aide de"])} $${x}$ et $${y}$.`, j, faux, expl("relation de Chasles ; le milieu d'un segment partage son vecteur en deux moitiés.", "on suit un chemin le long des côtés.", `$${c.v} = $ ${c.p}.`, `on obtient ${j}.`), figPara(n));
  }),
  tpl("vecteur_combinaison_lineaire", 6, 3, "Deux équations, deux inconnues : élimine a ou b.", () => {
    for (;;) {
      const { u, v } = base();
      const a = nz(-4, 4);
      const b = nz(-4, 4);
      const w = [a * u[0] + b * v[0], a * u[1] + b * v[1]];
      const det = u[0] * v[1] - u[1] * v[0];
      if (Math.abs(det) > 12) continue;
      const q = un(["a", "b"] as const);
      return court(`${DONNE()} ${V("u", u)}, ${V("v", v)} et ${V("w", w)}. ${un(["On cherche les nombres $a$ et $b$ tels que", "Deux nombres $a$ et $b$ vérifient", "On veut écrire"])} $\\vec{w} = a\\vec{u} + b\\vec{v}$. ${un([`Quelle est la valeur de $${q}$ ?`, `Détermine $${q}$.`, `Que vaut $${q}$ ?`])}`, q === "a" ? a : b, expl(DEF, "on écrit le système donné par les abscisses et les ordonnées, puis on le résout.", `$${pm(u[0])}a + ${pm(v[0])}b = ${w[0]}$ et $${pm(u[1])}a + ${pm(v[1])}b = ${w[1]}$ donnent $a = ${nL(a)}$ et $b = ${nL(b)}$.`, `$${q} = ${q === "a" ? a : b}$.`));
    }
  }),
];
