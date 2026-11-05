// STMG, PROGRAMME 2026 (05/11/2026) : axe de symétrie de ax² + bx + c « en résolvant
// f(x) = c », sans formule ; sommet ; contraposée. La banque ne travaillait la symétrie
// que sur des paraboles factorisées.

import type { CanvasFigure, TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { court, entre, expl, fabrique, qcm, un } from "../../lycee-commun";
import { gabaritsContraposee } from "../../lycee-logique-commun";

const tplF = fabrique("stmg", "fct_degre2_symetrie", "stmg_");
const tplL = fabrique("stmg", "logique_raisonnement", "stmg_");

const coef = (a: number, x: string) => `${a === 1 ? "" : a === -1 ? "-" : a}${x}`;
const signe = (v: number, x = "") => (v < 0 ? ` - ${Math.abs(v) === 1 && x ? "" : Math.abs(v)}${x}` : ` + ${v === 1 && x ? "" : v}${x}`);
/** ax² + bx + c écrit dans l'ordre usuel. */
export const trinome = (a: number, b: number, c: number) => `${coef(a, "x^{2}")}${signe(b, "x")}${signe(c)}`;
/** Axe entier (x = s), a ≠ 0, c ≠ 0. */
function para(pos?: boolean) {
  const a = pos === undefined ? un([-3, -2, -1, 1, 2, 3]) : pos ? entre(1, 3) : -entre(1, 3);
  const s = un([-4, -3, -2, -1, 1, 2, 3, 4, 5, 6]);
  const b = -2 * a * s;
  let c = entre(-9, 9);
  if (!c) c = 5;
  return { a, b, c, s, y: a * s * s + b * s + c };
}
const f = (p: ReturnType<typeof para>, x: number) => p.a * x * x + p.b * x + p.c;
const figure = (p: ReturnType<typeof para>): CanvasFigure => {
  const xs = Array.from({ length: 41 }, (_, i) => p.s - 4 + (i * 8) / 40);
  const ys = xs.map((x) => f(p, x));
  const haut = Math.max(...ys, 1);
  const bas = Math.min(...ys, -1);
  return {
    kind: "fonctionGraphique",
    size: { width: 320, height: 240 },
    xmin: p.s - 5,
    xmax: p.s + 5,
    ymin: Math.floor(bas) - 1,
    ymax: Math.ceil(haut) + 1,
    grille: true,
    courbes: [{ id: "f", type: "points", couleur: "#2563eb", points: xs.map((x, i) => ({ x, y: ys[i] })) }],
  } as CanvasFigure;
};
const DEF_A = "une parabole a un axe de symétrie vertical : deux points de même image sont symétriques par rapport à cet axe, qui passe par le milieu de leurs abscisses.";
const DEMANDE = () => un(["Soit la fonction", "On considère la fonction", "On étudie la fonction"]);
const fx = (p: ReturnType<typeof para>) => `$f(x) = ${trinome(p.a, p.b, p.c)}$`;
const sol = (p: ReturnType<typeof para>) => 2 * p.s;

type Eco = { s: string; x: string; y: string };
const ECO: Eco[] = [
  { s: "Une entreprise de boissons", x: "centaines de bouteilles vendues", y: "bénéfice, en centaines d'euros" },
  { s: "Un atelier de couture", x: "dizaines de sacs fabriqués", y: "bénéfice, en centaines d'euros" },
  { s: "Une start-up de logiciels", x: "centaines d'abonnements", y: "résultat, en milliers d'euros" },
  { s: "Un food-truck", x: "dizaines de repas vendus", y: "bénéfice, en dizaines d'euros" },
  { s: "Une imprimerie", x: "milliers d'affiches", y: "bénéfice, en centaines d'euros" },
  { s: "Un fabricant de vélos", x: "dizaines de vélos produits", y: "bénéfice, en milliers d'euros" },
  { s: "Une coopérative de fruits", x: "tonnes vendues", y: "bénéfice, en centaines d'euros" },
  { s: "Un studio de jeux vidéo", x: "milliers de ventes", y: "résultat, en milliers d'euros" },
];
function benef() {
  for (;;) {
    const a = -entre(1, 3);
    const s = entre(3, 12);
    const y = entre(10, 200);
    const b = -2 * a * s;
    const c = y - a * s * s - b * s;
    if (c >= 0 || c === 0) continue;
    return { a, b, c, s, y, e: un(ECO) };
  }
}
const BEN = (e: ReturnType<typeof benef>) => `${e.e.s} modélise son activité par $B(x) = ${trinome(e.a, e.b, e.c)}$, où $x$ est le nombre de ${e.e.x} et $B(x)$ le ${e.e.y}.`;

export const parabolesImageEgaleBank: TutorBankItemV4[] = [
  /* ===== fct_d2_axe_par_image_egale ===== */
  tplF("fct_d2_axe_par_image_egale", 1, 1, "Remplace x par 0 : il ne reste que le nombre seul.", () => {
    const p = para();
    return court(`${DEMANDE()} ${fx(p)}. ${un(["Que vaut $f(0)$ ?", "Calcule $f(0)$.", "Quelle est l'image de $0$ ?"])}`, p.c, expl("l'image de $0$ s'obtient en remplaçant $x$ par $0$.", "les termes en $x$ s'annulent.", `$f(0) = ${p.c}$.`, `$f(0) = ${p.c}$.`));
  }),
  tplF("fct_d2_axe_par_image_egale", 2, 1, "Si on a les deux abscisses d'une même image, l'axe passe par leur milieu.", () => {
    const p = para();
    const d = entre(1, 5);
    const [g, h] = [p.s - d, p.s + d];
    return court(`${DEMANDE()} ${fx(p)}. On a $f(${g}) = f(${h})$. ${un(["Quelle est l'abscisse de l'axe de symétrie ?", "L'axe de symétrie a pour équation $x = k$. Que vaut $k$ ?", "Pour quelle valeur $k$ la droite d'équation $x = k$ est-elle l'axe de symétrie ?"])}`, p.s, expl(DEF_A, "on calcule le milieu des deux abscisses.", `$(${g} + ${h < 0 ? `(${h})` : h}) \\div 2 = ${p.s}$.`, `l'axe a pour équation $x = ${p.s}$.`), figure(p));
  }),
  tplF("fct_d2_axe_par_image_egale", 3, 2, "f(x) = c se simplifie : on enlève c des deux côtés, puis on met x en facteur.", () => {
    const p = para();
    const j = `$x = 0$ ou $x = ${sol(p)}$`;
    return qcm(`${DEMANDE()} ${fx(p)}. ${un([`Quelles sont les solutions de l'équation $f(x) = ${p.c}$ ?`, `Résous l'équation $f(x) = ${p.c}$.`, `Pour quelles valeurs de $x$ a-t-on $f(x) = ${p.c}$ ?`])}`, j, [`$x = 0$ ou $x = ${-sol(p)}$`, `$x = 0$ uniquement`, `$x = ${p.s}$ uniquement`, `$x = ${p.c}$ ou $x = ${sol(p)}$`], expl("un produit est nul si l'un de ses facteurs est nul.", `on enlève $${p.c}$ des deux côtés, puis on factorise par $x$.`, `$${coef(p.a, "x^{2}")}${signe(p.b, "x")} = 0$, soit $x(${coef(p.a, "x")}${signe(p.b)}) = 0$.`, `les solutions sont $0$ et $${sol(p)}$.`));
  }),
  tplF("fct_d2_axe_par_image_egale", 4, 2, "Résous f(x) = c : deux solutions. L'axe est au milieu.", () => {
    const p = para();
    return court(`${DEMANDE()} ${fx(p)}. ${un([`En résolvant $f(x) = ${p.c}$, trouve la valeur $k$ telle que la droite d'équation $x = k$ soit l'axe de symétrie.`, `En résolvant $f(x) = ${p.c}$, détermine l'abscisse de l'axe de symétrie de la parabole.`, `Résous $f(x) = ${p.c}$, puis donne l'abscisse de l'axe de symétrie.`])}`, p.s, expl(DEF_A, `$f(x) = ${p.c}$ a deux solutions : l'axe passe par leur milieu.`, `solutions : $0$ et $${sol(p)}$. Milieu : $${p.s}$.`, `l'axe a pour équation $x = ${p.s}$.`));
  }),
  tplF("fct_d2_axe_par_image_egale", 5, 3, "Traduis l'énoncé : à quelle hauteur retrouve-t-on la même valeur qu'au départ ?", () => {
    const e = benef();
    const d = entre(1, Math.min(e.s - 1, 4));
    const x2 = e.s + d;
    const x1 = e.s - d;
    return court(`${BEN(e)} ${un([`Le bénéfice est le même pour $x = ${x1}$ et pour une autre valeur de $x$. Laquelle ?`, `Quelle autre valeur de $x$ donne le même résultat que $x = ${x1}$ ?`])}`, x2, expl(DEF_A, "on détermine l'axe de symétrie en résolvant $B(x) = B(0)$, puis on prend le symétrique.", `axe : $x = ${e.s}$ ; symétrique de $${x1}$ : $2 \\times ${e.s} - ${x1} = ${x2}$.`, `c'est $x = ${x2}$.`));
  }),
  tplF("fct_d2_axe_par_image_egale", 6, 3, "Pour chaque fonction, résous f(x) = c : la bonne a son milieu à la bonne place.", () => {
    const p = para();
    const a = p.a;
    const j = `$f(x) = ${trinome(a, p.b, p.c)}$`;
    const av = (s: number) => `$f(x) = ${trinome(a, -2 * a * s, p.c)}$`;
    return qcm(`${un([`Laquelle de ces fonctions a pour axe de symétrie la droite d'équation $x = ${p.s}$ ?`, `Pour quelle fonction la droite d'équation $x = ${p.s}$ est-elle l'axe de symétrie ?`, `Laquelle de ces paraboles est symétrique par rapport à la droite d'équation $x = ${p.s}$ ?`])}`, j, [av(-p.s), av(p.s === 1 ? 2 : 2 * p.s), av(p.s + 1), av(p.s - 1 || 7)], expl(DEF_A, `pour chaque fonction, on résout $f(x) = ${p.c}$, et on prend le milieu des deux solutions.`, `ici : solutions $0$ et $${sol(p)}$ ; milieu $${p.s}$.`, `la bonne fonction est ${j}.`));
  }),

  /* ===== fct_d2_sommet_general ===== */
  tplF("fct_d2_sommet_general", 1, 1, "Le sommet est sur l'axe : remplace x par la valeur de l'axe.", () => {
    const p = para();
    return court(`${DEMANDE()} ${fx(p)}. L'axe de symétrie de sa courbe a pour équation $x = ${p.s}$. ${un(["Quelle est l'ordonnée du sommet ?", "Calcule l'ordonnée du sommet de la parabole.", "Que vaut l'image de l'abscisse du sommet ?"])}`, p.y, expl("le sommet d'une parabole est sur son axe de symétrie.", `on calcule $f(${p.s})$.`, `$f(${p.s}) = ${p.y}$.`, `l'ordonnée du sommet est $${p.y}$.`));
  }),
  tplF("fct_d2_sommet_general", 2, 1, "Si le nombre devant x² est positif, la parabole est tournée vers le haut : minimum.", () => {
    const pos = un([true, false]);
    const p = para(pos);
    const j = pos ? "Un minimum : la parabole est tournée vers le haut." : "Un maximum : la parabole est tournée vers le bas.";
    return qcm(`${DEMANDE()} ${fx(p)}. ${un(["Que représente son sommet ?", "Que présente cette fonction en son sommet ?", "Que peut-on dire de la fonction en son sommet ?"])}`, j, [pos ? "Un maximum : la parabole est tournée vers le bas." : "Un minimum : la parabole est tournée vers le haut.", "Ni maximum, ni minimum.", pos ? "Un maximum : la parabole est tournée vers le haut." : "Un minimum : la parabole est tournée vers le bas."], expl("le signe du nombre devant $x^{2}$ donne le sens de la parabole.", `ici, ce nombre vaut $${p.a}$.`, `il est ${pos ? "positif" : "négatif"}.`, j));
  }),
  tplF("fct_d2_sommet_general", 3, 2, "Trouve l'axe avec f(x) = c, puis calcule l'image.", () => {
    const p = para();
    const co = (x: number, y: number) => `$(${x}\\,;${y})$`;
    return qcm(`${DEMANDE()} ${fx(p)}. ${un(["Quelles sont les coordonnées du sommet de sa courbe ?", "Quel point est le sommet de la parabole ?", "Où se trouve le sommet de la parabole ?"])}`, co(p.s, p.y), [co(-p.s, f(p, -p.s)), co(p.y, p.s), co(p.s, p.c), co(sol(p), p.c)], expl(DEF_A, `on résout $f(x) = ${p.c}$ : solutions $0$ et $${sol(p)}$, donc axe $x = ${p.s}$.`, `$f(${p.s}) = ${p.y}$.`, `le sommet est ${co(p.s, p.y)}.`));
  }),
  tplF("fct_d2_sommet_general", 4, 2, "Le maximum ou le minimum est l'ordonnée du sommet.", () => {
    const pos = un([true, false]);
    const p = para(pos);
    return court(`${DEMANDE()} ${fx(p)}. ${un([`En résolvant $f(x) = ${p.c}$, calcule ${pos ? "le minimum" : "le maximum"} de $f$.`, `Quelle est la valeur ${pos ? "minimale" : "maximale"} de $f$ ?`, `Que vaut ${pos ? "le minimum" : "le maximum"} de $f$ ?`])}`, p.y, expl("l'extremum est atteint au sommet, sur l'axe de symétrie.", `$f(x) = ${p.c}$ a pour solutions $0$ et $${sol(p)}$ : l'axe est $x = ${p.s}$.`, `$f(${p.s}) = ${p.y}$.`, `${pos ? "le minimum" : "le maximum"} vaut $${p.y}$.`));
  }),
  tplF("fct_d2_sommet_general", 5, 3, "Le bénéfice est maximal au sommet : cherche son abscisse.", () => {
    const e = benef();
    return court(`${BEN(e)} ${un(["Pour quelle valeur de $x$ le bénéfice est-il maximal ?", "Quelle valeur de $x$ maximise le bénéfice ?", "Quel niveau d'activité $x$ rend le bénéfice maximal ?"])}`, e.s, expl("le coefficient de $x^{2}$ est négatif : le sommet donne un maximum.", `on résout $B(x) = ${e.c}$ : solutions $0$ et $${2 * e.s}$.`, `le milieu vaut $${e.s}$.`, `le bénéfice est maximal pour $x = ${e.s}$.`));
  }),
  tplF("fct_d2_sommet_general", 6, 3, "Trouve d'abord le sommet, puis calcule B à cet endroit.", () => {
    const e = benef();
    return court(`${BEN(e)} ${un(["Quel est le bénéfice maximal ?", "Quelle est la valeur maximale de $B(x)$ ?", "Que vaut $B(x)$ au maximum ?"])}`, e.y, expl("le maximum est atteint au sommet.", `$B(x) = ${e.c}$ a pour solutions $0$ et $${2 * e.s}$ : le sommet a pour abscisse $${e.s}$.`, `$B(${e.s}) = ${e.y}$.`, `la valeur maximale est $${e.y}$.`));
  }),

  /* ===== logique_contraposee ===== */
  ...gabaritsContraposee(tplL),
];
