// ÉQUATIONS DIFFÉRENTIELLES DU SECOND ORDRE (06/11/2026). Hors programme français
// (registre `hors_france`) : la France s'arrête au premier ordre. Lignes visées : Maroc 1re bac
// AA-4g, 2e bac A2-11 ; Sénégal Tle AN 8 ; Côte d'Ivoire Tle C1-L9.
// Les coefficients sont tirés depuis les racines : tout tombe juste.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { court, entre, expl, fabrique, nL, pgcd, qcm, un } from "../../lycee-commun";
import { aff, enonce, nonNul, poly } from "./courbes-commun";

const tpl = fabrique("terminale-spe", "equations_differentielles_second_ordre", "tle_");

const M1 = "equadiff_second_ordre";
const M2 = "equadiff_second_ordre_conditions";

/* ───────────────── écritures ───────────────── */

const eqn = (a: number, b: number) => `${poly([1, "y''"], [a, "y'"], [b, "y"])} = 0`;
const fois = (r: number, x: string) => (r === 1 ? x : r === -1 ? `-${x}` : `${r}${x}`);
const ex = (r: number, x = "x") => `\\mathrm{e}^{${fois(r, x)}}`;
const cosi = (w: number, x = "x") => `\\cos(${fois(w, x)})`;
const sinu = (w: number, x = "x") => `\\sin(${fois(w, x)})`;
const solReel = (r1: number, r2: number, x = "x") => `A${ex(r1, x)} + B${ex(r2, x)}`;
const solDouble = (r: number, x = "x") => `(A${x} + B)${ex(r, x)}`;
const solOsc = (al: number, be: number, x = "x") => {
  const c = `A${cosi(be, x)} + B${sinu(be, x)}`;
  return al === 0 ? c : `${ex(al, x)}(${c})`;
};
// Vu à 375 px : « y = e^(-2x)(A cos(8x) + B sin(8x)) » poussait la page à 490 px. Deux lignes, un cran plus petit.
const y = (s: string) => {
  const m = s.match(/^(\\mathrm\{e\}\^\{[^}]*\})(\(.*\))$/);
  return m ? `$\\footnotesize y = ${m[1]}$ $\\footnotesize ${m[2]}$` : `$y = ${s}$`;
};

/** Deux racines entières, non nulles, ni égales ni opposées. */
function reelles() {
  for (;;) {
    const r1 = nonNul(-5, 5);
    const r2 = nonNul(-5, 5);
    if (r1 === r2 || r1 === -r2 || Math.abs(r1 * r2) > 20) continue;
    return { r1, r2, a: -(r1 + r2), b: r1 * r2 };
  }
}
function double() {
  const r = nonNul(-5, 5);
  return { r, a: -2 * r, b: r * r };
}
function complexes() {
  const al = un([0, 1, -1, 2, -2, 3, -3]);
  const be = entre(1, 5);
  return { al, be, a: -2 * al, b: al * al + be * be };
}
const piegesReels = (r1: number, r2: number) => [solReel(-r1, -r2), solReel(r1, -r2), solReel(-r1, r2), solDouble(r1), solOsc(r1, Math.abs(r2)), solReel(r1 + r2, r1 * r2)];
const piegesDouble = (r: number) => [solDouble(-r), solDouble(2 * r), solReel(r, -r), `A${ex(r)}`, solOsc(r, Math.abs(r)), `(A + B)${ex(r)}`];
const piegesOsc = (al: number, be: number) => [
  ...(al !== 0 ? [solOsc(-al, be), solOsc(be, Math.abs(al))] : [solOsc(1, be), solOsc(-1, be)]),
  solOsc(al, be + 1),
  solOsc(al, 2 * be),
  `A${ex(be)} + B${ex(-be)}`,
  `A${cosi(be)}`,
];

const INTRO = [
  "On considère l'équation différentielle :",
  "Une fonction $y$, deux fois dérivable sur $\\mathbb{R}$, vérifie :",
  "Soit l'équation différentielle du second ordre :",
  "On étudie sur $\\mathbb{R}$ l'équation :",
  "Un phénomène est modélisé par l'équation différentielle :",
  "Sur $\\mathbb{R}$, on cherche les fonctions $y$ telles que :",
];
const Q_SOL = [
  "Quelles sont ses solutions ?",
  "Quelle est sa solution générale ?",
  "Quelle forme ont toutes ses solutions ($A$ et $B$ réels) ?",
  "Parmi ces familles, laquelle donne toutes ses solutions ?",
  "Avec $A$ et $B$ réels quelconques, quelles fonctions sont solutions ?",
  "Résous cette équation : quelle famille de fonctions obtiens-tu ?",
];
const dfn = "pour $y'' + ay' + by = 0$, on résout l'équation caractéristique $r^2 + ar + b = 0$. Discriminant positif, racines $r_1$ et $r_2$ : $y = A\\mathrm{e}^{r_1 x} + B\\mathrm{e}^{r_2 x}$. Discriminant nul, racine $r$ : $y = (Ax + B)\\mathrm{e}^{rx}$. Discriminant négatif, racines $\\alpha \\pm \\mathrm{i}\\beta$ : $y = \\mathrm{e}^{\\alpha x}\\left(A\\cos(\\beta x) + B\\sin(\\beta x)\\right)$.";
const exS = (calcul: string, conclusion: string) => expl(dfn, "on écrit l'équation caractéristique, on calcule son discriminant, puis on choisit la forme des solutions.", calcul, conclusion);
const exC = (calcul: string, conclusion: string) =>
  expl(
    `${dfn} Les constantes $A$ et $B$ se trouvent avec les deux conditions.`,
    "on écrit $y$ et $y'$, on remplace par les valeurs données, puis on résout le système en $A$ et $B$.",
    calcul,
    conclusion,
  );

const CTX_OSC = [
  "L'écart à l'équilibre $y(t)$ d'une masse accrochée à un ressort vérifie :",
  "La charge $y(t)$ d'un condensateur dans un circuit oscillant vérifie :",
  "L'angle $y(t)$ d'une balançoire, pour de petites oscillations, vérifie :",
  "L'écart $y(t)$ du milieu d'une corde de guitare vérifie :",
  "L'écart $y(t)$ de la branche d'un diapason vérifie :",
  "L'écart à l'équilibre $y(t)$ d'une bouée posée sur l'eau vérifie :",
  "L'écart $y(t)$ du tablier d'une passerelle vérifie :",
  "L'angle $y(t)$ du balancier d'une horloge vérifie :",
];
const CTX_AMORTI = [
  "L'écart $y(t)$ de la suspension d'une voiture après une bosse vérifie :",
  "L'angle $y(t)$ d'une porte à fermeture automatique vérifie :",
  "L'écart $y(t)$ du plateau d'une balance de cuisine vérifie :",
  "Le signal $y(t)$ d'un sismographe après une secousse vérifie :",
  "L'angle $y(t)$ de l'aiguille d'un appareil de mesure vérifie :",
  "L'écart $y(t)$ d'un plongeoir après un saut vérifie :",
  "L'écart $y(t)$ d'une raquette après la frappe vérifie :",
  "L'écart $y(t)$ d'une prothèse de course après un appui vérifie :",
];
const R_OSC = "Des oscillations qui s'amortissent";
const R_CONST = "Des oscillations d'amplitude constante";
const R_CRIT = "Un retour sans oscillation, avec une racine double";
const R_APER = "Un retour sans oscillation, avec deux racines distinctes";

/** La période 2π/ω écrite réduite. */
const periode = (n: number, w: number) => {
  const g = pgcd(n, w);
  const [p, q] = [n / g, w / g];
  const haut = `${p === 1 ? "" : p}\\pi`;
  return q === 1 ? haut : `\\dfrac{${haut}}{${q}}`;
};
/** Les conditions écrites dans une phrase. */
const conds = (p: number, q: number, x = "0") => `$y(${x}) = ${p}$ et $y'(${x}) = ${q}$`;
const CHERCHE = (c: string) => un([`On cherche la solution telle que ${c}.`, `On veut la solution qui vérifie ${c}.`, `Une solution vérifie ${c}.`, `Les conditions initiales sont ${c}.`, `On impose ${c}.`]);
const QC = (L: string) => un([`Que vaut $${L}$ ?`, `Calcule $${L}$.`, `Trouve la valeur de $${L}$.`, `Détermine $${L}$.`, `Quelle valeur de $${L}$ convient ?`]);
const QP = () => un(["Quelle est cette solution ?", "Quelle fonction convient ?", "Laquelle de ces fonctions est la solution cherchée ?", "Quelle est la seule fonction qui convient ?", "Repère la solution cherchée.", "Trouve cette solution parmi les propositions."]);
const FORME = (s: string, v = "x") => un([`Ses solutions sont les fonctions $y(${v}) = ${s}$.`, `Toute solution s'écrit $y(${v}) = ${s}$.`, `Sa solution générale est $y(${v}) = ${s}$.`, `On admet que ses solutions sont $y(${v}) = ${s}$.`]);
const sA = (A: number, u: string, B: number, v: string) => poly([A, u], [B, v]);

export const equadiffSecondOrdreBank: TutorBankItemV4[] = [
  /* ===== equadiff_second_ordre ===== */
  tpl(M1, 1, 1, "y'' devient r², y' devient r et y devient 1.", () => {
    const a = nonNul(-8, 8);
    const b = nonNul(-9, 9);
    const q = un(["Quelle est son équation caractéristique ?", "Quelle équation caractéristique lui associe-t-on ?", "Laquelle de ces équations est son équation caractéristique ?", "Écris son équation caractéristique.", "Quelle équation en $r$ faut-il résoudre pour la traiter ?", "Par quelle équation en $r$ commence sa résolution ?"]);
    const c = (u: number, v: number) => `$${poly([1, "r^2"], [u, "r"], [v, ""])} = 0$`;
    return qcm(enonce(un(INTRO), eqn(a, b), q), c(a, b), [c(-a, b), c(a, -b), c(b, a), c(-a, -b), `$${poly([a, "r"], [b, ""])} = 0$`], exS(`$y''$ devient $r^2$, $y'$ devient $r$, $y$ devient $1$.`, `L'équation caractéristique est ${c(a, b)}.`));
  }),
  tpl(M1, 2, 1, "Discriminant de r² + ar + b = 0 : a² − 4b.", () => {
    const a = nonNul(-8, 8);
    const b = nonNul(-9, 9);
    const q = un(["Quel est le discriminant de son équation caractéristique ?", "Calcule le discriminant de son équation caractéristique.", "Que vaut $\\Delta$ pour son équation caractéristique ?", "Écris son équation caractéristique et donne son discriminant.", "Combien vaut le discriminant de l'équation en $r$ associée ?", "Calcule $\\Delta$ pour l'équation en $r$ associée."]);
    const d = a * a - 4 * b;
    return court(enonce(un(INTRO), eqn(a, b), q), d, exS(`$r^2 ${a < 0 ? "-" : "+"} ${Math.abs(a) === 1 ? "" : Math.abs(a)}r ${b < 0 ? "-" : "+"} ${Math.abs(b)} = 0$ a pour discriminant $(${a})^2 - 4 \\times (${b})$.`, `$\\Delta = ${d}$.`));
  }),
  tpl(M1, 3, 1, "y'' = −ω²y donne des sinus et cosinus ; y'' = ω²y donne des exponentielles.", () => {
    const w = entre(2, 7);
    const kind = un([0, 0, 1, 1, 2]);
    const q = un(Q_SOL);
    if (kind === 0)
      return qcm(enonce(un(INTRO), eqn(0, w * w), q), y(solOsc(0, w)), [y(solOsc(0, w * w)), y(solReel(w, -w)), y(`A${cosi(w)}`), y(solOsc(0, 1)), y(`A${cosi(w)} + B`)], exS(`Les racines sont $\\pm ${w}\\mathrm{i}$.`, `Les solutions sont ${y(solOsc(0, w))}.`));
    if (kind === 1)
      return qcm(enonce(un(INTRO), eqn(0, -w * w), q), y(solReel(w, -w)), [y(solOsc(0, w)), y(solReel(w * w, -w * w)), y(`A${ex(w)}`), y(solDouble(w)), y(`(A + B)${ex(-w)}`)], exS(`Les racines sont $${w}$ et $${-w}$.`, `Les solutions sont ${y(solReel(w, -w))}.`));
    return qcm(enonce(un(INTRO), "y'' = 0", q), y("Ax + B"), [y("Ax^2 + B"), y("A\\mathrm{e}^{x} + B"), y(solOsc(0, 1)), y("A + B")], exS("Deux primitives successives de $0$ : une constante, puis une fonction affine.", `Les solutions sont ${y("Ax + B")}.`));
  }),
  tpl(M1, 4, 1, "Les racines donnent directement la forme des solutions.", () => {
    const type = un([0, 0, 1, 2]);
    const q = un(Q_SOL);
    if (type === 0) {
      const { r1, r2, a, b } = reelles();
      return qcm(`${enonce(un(INTRO), eqn(a, b), `Son équation caractéristique a pour racines $${r1}$ et $${r2}$.`)} ${q}`, y(solReel(r1, r2)), piegesReels(r1, r2).map(y), exS(`Deux racines réelles : $${r1}$ et $${r2}$.`, `Les solutions sont ${y(solReel(r1, r2))}.`));
    }
    if (type === 1) {
      const { r, a, b } = double();
      return qcm(`${enonce(un(INTRO), eqn(a, b), `Son équation caractéristique a une racine double, $${r}$.`)} ${q}`, y(solDouble(r)), piegesDouble(r).map(y), exS(`Une racine double : $${r}$.`, `Les solutions sont ${y(solDouble(r))}.`));
    }
    const { al, be, a, b } = complexes();
    const z = (s: string) => `${al === 0 ? "" : `${al} ${s} `}${al === 0 && s === "-" ? "-" : ""}${be === 1 ? "" : be}\\mathrm{i}`;
    return qcm(`${enonce(un(INTRO), eqn(a, b), `Son équation caractéristique a pour racines $${z("+")}$ et $${z("-")}$.`)} ${q}`, y(solOsc(al, be)), piegesOsc(al, be).map(y), exS(`Racines complexes : partie réelle $${al}$, partie imaginaire $\\pm ${be}$.`, `Les solutions sont ${y(solOsc(al, be))}.`));
  }),

  tpl(M1, 5, 2, "Résous r² + ar + b = 0 : deux racines réelles donnent deux exponentielles.", () => {
    const { r1, r2, a, b } = reelles();
    return qcm(enonce(un(INTRO), eqn(a, b), un(Q_SOL)), y(solReel(r1, r2)), piegesReels(r1, r2).map(y), exS(`$\\Delta = ${a * a - 4 * b}$, racines $${r1}$ et $${r2}$.`, `Les solutions sont ${y(solReel(r1, r2))}.`));
  }),
  tpl(M1, 6, 2, "Discriminant nul : une racine double, et la forme (Ax + B)e^(rx).", () => {
    const { r, a, b } = double();
    return qcm(enonce(un(INTRO), eqn(a, b), un(Q_SOL)), y(solDouble(r)), piegesDouble(r).map(y), exS(`$\\Delta = 0$, racine double $${r}$.`, `Les solutions sont ${y(solDouble(r))}.`));
  }),
  tpl(M1, 7, 2, "Discriminant négatif : racines α ± iβ, et la forme e^(αx)(A cos βx + B sin βx).", () => {
    const { al, be, a, b } = complexes();
    return qcm(enonce(un(INTRO), eqn(a, b), un(Q_SOL)), y(solOsc(al, be)), piegesOsc(al, be).map(y), exS(`$\\Delta = ${a * a - 4 * b}$, partie réelle $${al}$, partie imaginaire $\\pm ${be}$.`, `Les solutions sont ${y(solOsc(al, be))}.`));
  }),
  tpl(M1, 8, 2, "y'' + ω²y = 0 : la pulsation est ω et la période 2π/ω.", () => {
    const w = entre(2, 9);
    const fin = un(["Quelle est la période de ses solutions ?", "Avec quelle période ses solutions oscillent-elles ?", "Au bout de quelle durée ses solutions reprennent-elles la même valeur ?", "Quelle est la plus petite période commune de ses solutions ?", "Les solutions sont périodiques : quelle est leur période ?", "Quelle période lis-tu sur ses solutions ?"]);
    return qcm(enonce(un(INTRO), eqn(0, w * w), fin), `$${periode(2, w)}$`, [`$${periode(1, w)}$`, `$${periode(2, w * w)}$`, `$${w}\\pi$`, `$${2 * w}\\pi$`, `$${periode(4, w)}$`], exS(`Les solutions s'écrivent ${y(solOsc(0, w))}, de pulsation $${w}$.`, `La période est $${periode(2, w)}$.`));
  }),

  tpl(M1, 9, 3, "Divise par le coefficient de y'' : il reste y'' + ω²y = 0.", () => {
    const m = un([1, 2, 3, 4, 5]);
    const w = entre(2, 9);
    const q = un(["Quelle est la pulsation $\\omega$ de ces oscillations ?", "Que vaut la pulsation $\\omega$ de ce mouvement ?", "Écris l'équation sous la forme $y'' + \\omega^2 y = 0$, avec $\\omega > 0$. Que vaut $\\omega$ ?", "Calcule la pulsation $\\omega > 0$ des oscillations.", "Quelle pulsation $\\omega > 0$ obtient-on ?"]);
    return court(enonce(un(CTX_OSC), `${m === 1 ? "" : m}y'' + ${m * w * w}y = 0`, q), w, exS(`On divise par $${m}$ : $y'' + ${w * w}y = 0$.`, `$\\omega = ${w}$.`));
  }),
  tpl(M1, 10, 3, "Le signe du discriminant décide : négatif, ça oscille ; positif ou nul, non.", () => {
    const k = un([0, 1, 1, 2, 3]);
    let a: number;
    let b: number;
    let juste: string;
    if (k === 0) [a, b, juste] = [0, entre(2, 9) ** 2, R_CONST];
    else if (k === 1) {
      const c = { al: -entre(1, 4), be: entre(1, 6) };
      [a, b, juste] = [-2 * c.al, c.al ** 2 + c.be ** 2, R_OSC];
    } else if (k === 2) {
      const r = -entre(1, 6);
      [a, b, juste] = [-2 * r, r * r, R_CRIT];
    } else {
      const r1 = -entre(1, 4);
      const r2 = r1 - entre(1, 4);
      [a, b, juste] = [-(r1 + r2), r1 * r2, R_APER];
    }
    const q = un(["Quel comportement ce système a-t-il ?", "Comment ce système revient-il à l'équilibre ?", "Que fait ce système après la perturbation ?", "Quel régime décrit cette équation ?", "Quelle est l'allure des solutions de cette équation ?"]);
    return qcm(enonce(un(k === 0 ? CTX_OSC : CTX_AMORTI), eqn(a, b), q), juste, [R_OSC, R_CONST, R_CRIT, R_APER], exS(`$\\Delta = ${a * a - 4 * b}$ pour $${poly([1, "r^2"], [a, "r"], [b, ""])} = 0$.`, `Le système présente : ${juste.charAt(0).toLowerCase()}${juste.slice(1)}.`));
  }),
  tpl(M1, 11, 3, "Ramène d'abord l'équation à la forme y'' + ay' + by = 0.", () => {
    const type = un([0, 0, 1, 2]);
    const [a, b, juste, faux] =
      type === 0
        ? (() => {
            const r = reelles();
            return [r.a, r.b, solReel(r.r1, r.r2), piegesReels(r.r1, r.r2)] as const;
          })()
        : type === 1
          ? (() => {
              const r = double();
              return [r.a, r.b, solDouble(r.r), piegesDouble(r.r)] as const;
            })()
          : (() => {
              const r = complexes();
              return [r.a, r.b, solOsc(r.al, r.be), piegesOsc(r.al, r.be)] as const;
            })();
    const k = un([2, 3, 4, 5, -2, -1]);
    const ecrit = un([
      `${poly([k, "y''"], [k * a, "y'"], [k * b, "y"])} = 0`,
      `y'' = ${poly([-a, "y'"], [-b, "y"])}`,
      `${poly([1, "y''"], [a, "y'"])} = ${poly([-b, "y"])}`,
    ]);
    return qcm(enonce(un(INTRO), ecrit, un(Q_SOL)), y(juste), faux.map(y), exS(`L'équation s'écrit $${eqn(a, b)}$.`, `Les solutions sont ${y(juste)}.`));
  }),
  tpl(M1, 12, 3, "Si y = e^(kx) est solution, alors k est racine de l'équation caractéristique.", () => {
    const k = un([1, 2, 3, -1, -2, -3]);
    const m = nonNul(-5, 5);
    const surA = Math.random() < 0.5;
    const eq = surA ? `${poly([1, "y''"], [m, "y'"])} + my = 0` : `y'' + my' ${-k * k - m * k < 0 ? "-" : "+"} ${Math.abs(-k * k - m * k) === 1 ? "" : Math.abs(-k * k - m * k)}y = 0`;
    const val = surA ? -k * k - m * k : m;
    const ok = surA || -k * k - m * k !== 0;
    const eqF = ok ? eq : "y'' + my' = 0";
    const dit = un([`La fonction $y = ${ex(k)}$ est solution de l'équation :`, `On vérifie que $y = ${ex(k)}$ est solution de l'équation :`, `Une solution de l'équation suivante est $y = ${ex(k)}$ :`, `L'équation suivante admet pour solution $y = ${ex(k)}$ :`]);
    const q = un(["Que vaut le réel $m$ ?", "Trouve le réel $m$.", "Détermine la valeur de $m$.", "Calcule $m$.", "Quelle valeur de $m$ convient ?"]);
    return court(enonce(dit, eqF, q), val, exS(`On remplace $r$ par $${k}$ dans l'équation caractéristique.`, `$m = ${val}$.`));
  }),

  /* ===== equadiff_second_ordre_conditions ===== */
  tpl(M2, 1, 1, "y(0) donne A ; y'(0) donne ωB.", () => {
    const w = entre(2, 7);
    const A = nonNul(-6, 6);
    const B = nonNul(-6, 6);
    const L = un(["A", "B"]);
    return court(`${enonce(un(INTRO), eqn(0, w * w), `${FORME(solOsc(0, w))} ${CHERCHE(conds(A, B * w))}`)}\n\n${QC(L)}`, L === "A" ? A : B, exC(`$y(0) = A$ et $y'(0) = ${w}B$.`, `$A = ${A}$ et $B = ${B}$.`));
  }),
  tpl(M2, 2, 1, "y(0) = A + B et y'(0) = r₁A + r₂B : résous ce système.", () => {
    const { r1, r2, a, b } = reelles();
    const A = nonNul(-5, 5);
    const B = nonNul(-5, 5);
    const L = un(["A", "B"]);
    return court(`${enonce(un(INTRO), eqn(a, b), `${FORME(solReel(r1, r2))} ${CHERCHE(conds(A + B, r1 * A + r2 * B))}`)}\n\n${QC(L)}`, L === "A" ? A : B, exC(`$A + B = ${A + B}$ et $${r1}A ${r2 < 0 ? "-" : "+"} ${Math.abs(r2)}B = ${r1 * A + r2 * B}$.`, `$A = ${A}$ et $B = ${B}$.`));
  }),
  tpl(M2, 3, 1, "y(0) = B, puis y'(0) = A + rB.", () => {
    const { r, a, b } = double();
    const A = nonNul(-6, 6);
    const B = nonNul(-6, 6);
    const L = un(["A", "B"]);
    return court(`${enonce(un(INTRO), eqn(a, b), `${FORME(solDouble(r))} ${CHERCHE(conds(B, A + r * B))}`)}\n\n${QC(L)}`, L === "A" ? A : B, exC(`$y(0) = B$ et $y'(0) = A + ${r < 0 ? `(${r})` : r}B$.`, `$A = ${A}$ et $B = ${B}$.`));
  }),
  tpl(M2, 4, 1, "Le cosinus reçoit y(0), le sinus reçoit y'(0) ÷ ω.", () => {
    const w = entre(2, 7);
    const A = nonNul(-6, 6);
    const B = nonNul(-6, 6);
    const s = (u: number, v: number, om = w) => y(sA(u, cosi(om), v, sinu(om)));
    return qcm(`${enonce(un(INTRO), eqn(0, w * w), CHERCHE(conds(A, B * w)))} ${QP()}`, s(A, B), [s(B, A), s(A, B * w), s(A * w, B), s(A, -B), s(-A, B), s(A, B, w + 1)], exC(`$y = A${cosi(w)} + B${sinu(w)}$ avec $A = ${A}$ et $${w}B = ${B * w}$.`, `La solution est ${s(A, B)}.`));
  }),

  tpl(M2, 5, 2, "Trouve les racines, puis résous le système donné par les deux conditions.", () => {
    const { r1, r2, a, b } = reelles();
    const A = nonNul(-5, 5);
    const B = nonNul(-5, 5);
    const s = (u: number, v: number, p = r1, q = r2) => y(sA(u, ex(p), v, ex(q)));
    return qcm(`${enonce(un(INTRO), eqn(a, b), CHERCHE(conds(A + B, r1 * A + r2 * B)))} ${QP()}`, s(A, B), [s(B, A), s(-A, B), s(A, -B), s(A, B, -r1, -r2), s(A + 1, B - 1), s(A - 1, B + 1)], exC(`Racines $${r1}$ et $${r2}$. On résout $A + B = ${A + B}$ et $${r1}A ${r2 < 0 ? "-" : "+"} ${Math.abs(r2)}B = ${r1 * A + r2 * B}$.`, `La solution est ${s(A, B)}.`));
  }),
  tpl(M2, 6, 2, "Racine double : y = (Ax + B)e^(rx), donc y(0) = B et y'(0) = A + rB.", () => {
    const { r, a, b } = double();
    const A = nonNul(-6, 6);
    const B = nonNul(-6, 6);
    const s = (u: number, v: number, p = r) => y(`(${aff(u, v)})${ex(p)}`);
    return qcm(`${enonce(un(INTRO), eqn(a, b), CHERCHE(conds(B, A + r * B)))} ${QP()}`, s(A, B), [s(B, A), s(-A, B), s(A, -B), s(A, B, -r), s(A + r * B, B), s(A + 1, B)], exC(`Racine double $${r}$ : $B = ${B}$, puis $A = ${A + r * B} - (${r * B})$.`, `La solution est ${s(A, B)}.`));
  }),
  tpl(M2, 7, 2, "Racines α ± iβ : y(0) = A et y'(0) = αA + βB.", () => {
    const al = un([1, -1, 2, -2, 3, -3]);
    const be = entre(1, 5);
    const A = nonNul(-5, 5);
    const B = nonNul(-5, 5);
    const a = -2 * al;
    const b = al * al + be * be;
    const s = (u: number, v: number, p = al) => y(`${ex(p)}(${sA(u, cosi(be), v, sinu(be))})`);
    return qcm(`${enonce(un(INTRO), eqn(a, b), CHERCHE(conds(A, al * A + be * B)))} ${QP()}`, s(A, B), [s(B, A), s(-A, B), s(A, -B), s(A, B, -al), s(A, B + 1), s(A, B - 1)], exC(`Racines $${al} \\pm ${be === 1 ? "" : be}\\mathrm{i}$. $A = ${A}$, puis $${poly([al, "A"], [be, "B"])} = ${al * A + be * B}$.`, `La solution est ${s(A, B)}.`));
  }),
  tpl(M2, 8, 2, "y'' = ω²y : y = Ae^(ωx) + Be^(−ωx), donc y(0) = A + B et y'(0) = ω(A − B).", () => {
    const w = entre(2, 6);
    const A = nonNul(-5, 5);
    const B = nonNul(-5, 5);
    const L = un(["A", "B"]);
    return court(`${enonce(un(INTRO), eqn(0, -w * w), `${FORME(solReel(w, -w))} ${CHERCHE(conds(A + B, w * (A - B)))}`)}\n\n${QC(L)}`, L === "A" ? A : B, exC(`$A + B = ${A + B}$ et $${w}(A - B) = ${w * (A - B)}$.`, `$A = ${A}$ et $B = ${B}$.`));
  }),

  tpl(M2, 9, 3, "Départ à l'écart p sans vitesse : y(t) = p cos(ωt). Remplace ensuite t.", () => {
    const w = un([2, 3, 4, 5, 6]);
    const p = nonNul(-9, 9);
    const [num, den, f] = un<[string, string, number]>([
      ["\\pi", `${w}`, -1],
      ["2\\pi", `${w}`, 1],
      ["\\pi", `${2 * w}`, 0],
      ["\\pi", `${3 * w}`, 0.5],
      ["4\\pi", `${w}`, 1],
    ]);
    const T = `\\dfrac{${num}}{${den}}`;
    const v = p * f;
    const q = un([`Que vaut $y\\left(${T}\\right)$ ?`, `Calcule l'écart à l'instant $t = ${T}$ : que vaut $y\\left(${T}\\right)$ ?`, `Quelle est la valeur de $y\\left(${T}\\right)$ ?`, `Trouve $y\\left(${T}\\right)$.`, `Donne la valeur de $y$ à l'instant $t = ${T}$, écrite $y\\left(${T}\\right)$.`]);
    const c = un([`Au départ, $y(0) = ${p}$ et $y'(0) = 0$.`, `On lâche sans vitesse : $y(0) = ${p}$ et $y'(0) = 0$.`, `À l'instant initial, $y(0) = ${p}$, sans vitesse : $y'(0) = 0$.`]);
    return court(`${enonce(un(CTX_OSC), eqn(0, w * w), c)}\n\n${q}`, v, exC(`La solution est $y(t) = ${poly([p, cosi(w, "t")])}$.`, `La valeur est $${nL(v)}$.`));
  }),
  tpl(M2, 10, 3, "Remplace x par chaque valeur : l'un des deux termes s'annule à chaque fois.", () => {
    const w = entre(2, 6);
    const A = nonNul(-7, 7);
    const B = nonNul(-7, 7);
    const X = `\\dfrac{\\pi}{${2 * w}}`;
    const L = un(["A", "B"]);
    const c = `$y(0) = ${A}$ et $y\\left(${X}\\right) = ${B}$`;
    return court(`${enonce(un(INTRO), eqn(0, w * w), `${FORME(solOsc(0, w))} ${un([`On cherche la solution telle que ${c}.`, `On veut la solution qui vérifie ${c}.`, `Une solution vérifie ${c}.`, `Sa courbe vérifie ${c}.`])}`)}\n\n${QC(L)}`, L === "A" ? A : B, exC(`En $0$ : $y = A$. En $${X}$ : le cosinus s'annule et le sinus vaut $1$, donc $y = B$.`, `$A = ${A}$ et $B = ${B}$.`));
  }),
  tpl(M2, 11, 3, "L'exponentielle vaut 1 en 0 : y(0) = A et y'(0) = αA + βB.", () => {
    const al = -entre(1, 3);
    const be = entre(1, 5);
    const A = un([0, 0, 1, 2, -1, 3]);
    const B = nonNul(-5, 5);
    const a = -2 * al;
    const b = al * al + be * be;
    const L = A === 0 ? "B" : un(["A", "B"]);
    return court(`${enonce(un(CTX_AMORTI), eqn(a, b), `${FORME(solOsc(al, be, "t"), "t")} ${CHERCHE(conds(A, al * A + be * B))}`)}\n\n${QC(L)}`, L === "A" ? A : B, exC(`$y(0) = A$ et $y'(0) = ${poly([al, "A"], [be, "B"])}$.`, `$A = ${A}$ et $B = ${B}$.`));
  }),
  tpl(M2, 12, 3, "Amplitude de A cos(ωt) + B sin(ωt) : √(A² + B²).", () => {
    const w = entre(2, 6);
    const [m, n, R] = un<[number, number, number]>([[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 15, 17], [9, 12, 15]]);
    const A = un([1, -1]) * (Math.random() < 0.5 ? m : n);
    const B = un([1, -1]) * (Math.abs(A) === m ? n : m);
    const q = un(["Quelle est l'amplitude de ces oscillations ?", "Quel écart maximal le système atteint-il ?", "Quelle est la valeur maximale de $y(t)$ ?", "Calcule l'amplitude $\\sqrt{A^2 + B^2}$ du mouvement.", "Jusqu'à quelle valeur $y(t)$ monte-t-il ?"]);
    return court(`${enonce(un(CTX_OSC), eqn(0, w * w), `${FORME(solOsc(0, w, "t"), "t")} ${CHERCHE(conds(A, B * w))}`)}\n\n${q}`, R, exC(`$A = ${A}$ et $B = ${B}$, donc l'amplitude vaut $\\sqrt{${A * A} + ${B * B}}$.`, `L'amplitude vaut $${R}$.`));
  }),
];
