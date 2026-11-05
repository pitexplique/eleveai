// INTÉGRATION PAR PARTIES (05/11/2026). Trou du programme de Terminale spé :
// « Intégration par parties », capacité et démonstration (BO 2019). Aucune
// question jusqu'ici. Choisir u et v', calculer, primitiver.
// ⚠️ Les correcteurs relisent l'intégrale écrite et la calculent par Simpson.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { T, entre, expl, fabrique, fauxExacts, fauxPrimitives, lin, phrase, qcm, somme, un, type Terme } from "../../lycee-commun";

const tpl = fabrique("terminale-spe", "primitive_integrale", "tle_");

const E = (a: number) => (a === 1 ? "e^{x}" : a === -1 ? "e^{-x}" : `e^{${a}x}`);
const SIN = (a: number) => (a === 1 ? "\\sin x" : `\\sin(${a}x)`);
const COS = (a: number) => (a === 1 ? "\\cos x" : `\\cos(${a}x)`);
const par = (m: number, p: number) => (p === 0 ? (m === 1 ? "x" : `${m}x`) : `(${lin(m, p)})`);
const FORMULE = "$\\int_a^b u(x)v'(x)\\,\\mathrm{d}x = [u(x)v(x)]_a^b - \\int_a^b u'(x)v(x)\\,\\mathrm{d}x$";
const DEF = `pour $u$ et $v$ dérivables à dérivées continues, ${FORMULE}.`;

type Fam = { f: string; u: string; vp: string; up: string; v: string; F: Terme[]; ln: boolean };

/** Les familles du programme : polynôme × exp, polynôme × sin/cos, ln. */
function famille(id = entre(1, 9)): Fam {
  switch (id) {
    case 1: {
      const a = un([1, 1, 2, 3, -1, -2, 4]);
      return { f: `x${E(a)}`, u: "x", vp: E(a), up: "1", v: somme([T(1, a, E(a))]), F: [T(1, a, `x${E(a)}`), T(-1, a * a, E(a))], ln: false };
    }
    case 2: {
      const m = entre(1, 4);
      const p = un([-3, -2, -1, 1, 2, 3, 5]);
      return { f: `${par(m, p)}e^{x}`, u: lin(m, p), vp: "e^{x}", up: String(m), v: "e^{x}", F: [T(1, 1, `${par(m, p - m)}e^{x}`)], ln: false };
    }
    case 3: {
      const m = entre(1, 3);
      const p = un([0, 0, 1, 2, -1]);
      return { f: `${par(m, p)}\\sin x`, u: lin(m, p), vp: "\\sin x", up: String(m), v: "-\\cos x", F: [T(-1, 1, `${par(m, p)}\\cos x`), T(m, 1, "\\sin x")], ln: false };
    }
    case 4: {
      const m = entre(1, 3);
      const p = un([0, 0, 1, 2, -1]);
      return { f: `${par(m, p)}\\cos x`, u: lin(m, p), vp: "\\cos x", up: String(m), v: "\\sin x", F: [T(1, 1, `${par(m, p)}\\sin x`), T(m, 1, "\\cos x")], ln: false };
    }
    case 5: {
      const k = un([1, 1, 2, 3, 5]);
      return { f: somme([T(k, 1, "\\ln x")]), u: somme([T(k, 1, "\\ln x")]), vp: "1", up: somme([T(k, 1, "\\dfrac{1}{x}")]).replace(/(\d+)\\dfrac\{1\}\{x\}/, "\\dfrac{$1}{x}"), v: "x", F: [T(k, 1, "x\\ln x"), T(-k, 1, "x")], ln: true };
    }
    case 6:
      return { f: "x\\ln x", u: "\\ln x", vp: "x", up: "\\dfrac{1}{x}", v: "\\dfrac{x^{2}}{2}", F: [T(1, 2, "x^{2}\\ln x"), T(-1, 4, "x^{2}")], ln: true };
    case 7:
      return { f: "x^{2}\\ln x", u: "\\ln x", vp: "x^{2}", up: "\\dfrac{1}{x}", v: "\\dfrac{x^{3}}{3}", F: [T(1, 3, "x^{3}\\ln x"), T(-1, 9, "x^{3}")], ln: true };
    case 8: {
      const a = un([2, 3, 4]);
      return { f: `x${SIN(a)}`, u: "x", vp: SIN(a), up: "1", v: somme([T(-1, a, COS(a))]), F: [T(-1, a, `x${COS(a)}`), T(1, a * a, SIN(a))], ln: false };
    }
    default: {
      const a = un([2, 3, 4]);
      return { f: `x${COS(a)}`, u: "x", vp: COS(a), up: "1", v: somme([T(1, a, SIN(a))]), F: [T(1, a, `x${SIN(a)}`), T(1, a * a, COS(a))], ln: false };
    }
  }
}

/** Une intégrale à valeur exacte, écrite famille par famille (le correcteur la recalcule). */
type Calc = { f: string; a: string; b: string; v: Terme[]; u: string; vp: string; up: string; vv: string; F: string };
function integrale(): Calc {
  const t = entre(1, 12);
  if (t <= 2) {
    const a = un([1, 1, 2, 3, -1, -2]);
    const v = a === 1 ? [T(1, 1)] : [T(a - 1, a * a, `e^{${a}}`), T(1, a * a)];
    return { f: `x${E(a)}`, a: "0", b: "1", v, u: "x", vp: E(a), up: "1", vv: somme([T(1, a, E(a))]), F: somme([T(1, a, `x${E(a)}`), T(-1, a * a, E(a))]) };
  }
  if (t <= 4) {
    const m = entre(1, 4);
    const p = un([1, 2, 3, 5, -1, -2]);
    const b = un([1, 1, 2]);
    const eb = b === 1 ? "e" : "e^{2}";
    return { f: `${par(m, p)}e^{x}`, a: "0", b: String(b), v: [T(m * b + p - m, 1, eb), T(m - p, 1)], u: lin(m, p), vp: "e^{x}", up: String(m), vv: "e^{x}", F: `${par(m, p - m)}e^{x}` };
  }
  if (t === 5) {
    const m = entre(1, 3);
    const p = entre(1, 4);
    return { f: `${par(m, p)}\\sin x`, a: "0", b: "\\pi", v: [T(m, 1, "\\pi"), T(2 * p, 1)], u: lin(m, p), vp: "\\sin x", up: String(m), vv: "-\\cos x", F: somme([T(-1, 1, `${par(m, p)}\\cos x`), T(m, 1, "\\sin x")]) };
  }
  if (t === 6) {
    const m = entre(1, 3);
    const p = entre(1, 4);
    return { f: `${par(m, p)}\\cos x`, a: "0", b: "\\pi", v: [T(-2 * m, 1)], u: lin(m, p), vp: "\\cos x", up: String(m), vv: "\\sin x", F: somme([T(1, 1, `${par(m, p)}\\sin x`), T(m, 1, "\\cos x")]) };
  }
  if (t === 7) {
    const m = entre(1, 3);
    const p = entre(1, 4);
    return { f: `${par(m, p)}\\sin x`, a: "0", b: "\\dfrac{\\pi}{2}", v: [T(m + p, 1)], u: lin(m, p), vp: "\\sin x", up: String(m), vv: "-\\cos x", F: somme([T(-1, 1, `${par(m, p)}\\cos x`), T(m, 1, "\\sin x")]) };
  }
  if (t === 8) {
    const m = un([2, 4, 6]);
    const p = un([1, 3, 5, 7]);
    return { f: `${par(m, p)}\\cos x`, a: "0", b: "\\dfrac{\\pi}{2}", v: [T(m, 2, "\\pi"), T(p - m, 1)], u: lin(m, p), vp: "\\cos x", up: String(m), vv: "\\sin x", F: somme([T(1, 1, `${par(m, p)}\\sin x`), T(m, 1, "\\cos x")]) };
  }
  if (t === 9) {
    const k = un([1, 1, 2, 3, 4]);
    const b = un(["e", "e^{2}", "2", "3", "5"]);
    const v: Terme[] = b === "e" ? [T(k, 1)] : b === "e^{2}" ? [T(k, 1, "e^{2}"), T(k, 1)] : [T(k * Number(b), 1, `\\ln ${b}`), T(k * (1 - Number(b)), 1)];
    const kln = somme([T(k, 1, "\\ln x")]);
    return { f: kln, a: "1", b, v, u: kln, vp: "1", up: k === 1 ? "\\dfrac{1}{x}" : `\\dfrac{${k}}{x}`, vv: "x", F: somme([T(k, 1, "x\\ln x"), T(-k, 1, "x")]) };
  }
  if (t === 10) {
    const b = un(["e", "2", "3", "4"]);
    const v: Terme[] = b === "e" ? [T(1, 4, "e^{2}"), T(1, 4)] : [T(Number(b) ** 2, 2, `\\ln ${b}`), T(1 - Number(b) ** 2, 4)];
    return { f: "x\\ln x", a: "1", b, v, u: "\\ln x", vp: "x", up: "\\dfrac{1}{x}", vv: "\\dfrac{x^{2}}{2}", F: somme([T(1, 2, "x^{2}\\ln x"), T(-1, 4, "x^{2}")]) };
  }
  if (t === 11) {
    return { f: "x^{2}\\ln x", a: "1", b: "e", v: [T(2, 9, "e^{3}"), T(1, 9)], u: "\\ln x", vp: "x^{2}", up: "\\dfrac{1}{x}", vv: "\\dfrac{x^{3}}{3}", F: somme([T(1, 3, "x^{3}\\ln x"), T(-1, 9, "x^{3}")]) };
  }
  const q = un([
    { f: "x\\sin(2x)", b: "\\pi", v: [T(-1, 2, "\\pi")], vp: "\\sin(2x)", vv: "-\\dfrac{1}{2}\\cos(2x)", F: somme([T(-1, 2, "x\\cos(2x)"), T(1, 4, "\\sin(2x)")]) },
    { f: "x\\sin(2x)", b: "\\dfrac{\\pi}{2}", v: [T(1, 4, "\\pi")], vp: "\\sin(2x)", vv: "-\\dfrac{1}{2}\\cos(2x)", F: somme([T(-1, 2, "x\\cos(2x)"), T(1, 4, "\\sin(2x)")]) },
    { f: "x\\cos(2x)", b: "\\dfrac{\\pi}{2}", v: [T(-1, 2)], vp: "\\cos(2x)", vv: "\\dfrac{1}{2}\\sin(2x)", F: somme([T(1, 2, "x\\sin(2x)"), T(1, 4, "\\cos(2x)")]) },
  ]);
  return { f: q.f, a: "0", b: q.b, v: q.v, u: "x", vp: q.vp, up: "1", vv: q.vv, F: q.F };
}
const integ = (c: { f: string; a: string; b: string }) => `\\int_{${c.a}}^{${c.b}} ${c.f}\\,\\mathrm{d}x`;
const m$ = (s: string) => `$${s}$`;
const explCalc = (c: Calc) =>
  expl(
    DEF,
    `on dérive le facteur qui se simplifie et on primitive l'autre : $u(x) = ${c.u}$, $v'(x) = ${c.vp}$.`,
    `$u'(x) = ${c.up}$, $v(x) = ${c.vv}$. Une primitive de la fonction intégrée est donc $F(x) = ${c.F}$ ; on calcule $F(${c.b}) - F(${c.a})$.`,
    `l'intégrale vaut $${somme(c.v)}$.`,
  );

/* Intégrales qui demandent deux intégrations par parties (★3). */
function doubleIPP() {
  const k = un([1, 1, 2, 3, 4]);
  const kk = k === 1 ? "" : String(k);
  return un([
    { f: `${kk}x^{2}e^{x}`, a: "0", b: "1", v: [T(k, 1, "e"), T(-2 * k, 1)], etape: "on pose d'abord $u = x^{2}$, $v' = e^{x}$, puis $u = x$, $v' = e^{x}$" },
    { f: `${kk}x^{2}e^{-x}`, a: "0", b: "1", v: [T(2 * k, 1), T(-5 * k, 1, "e^{-1}")], etape: "on pose d'abord $u = x^{2}$, $v' = e^{-x}$, puis $u = x$, $v' = e^{-x}$" },
    { f: `${kk}x^{2}\\sin x`, a: "0", b: "\\pi", v: [T(k, 1, "\\pi^{2}"), T(-4 * k, 1)], etape: "on pose d'abord $u = x^{2}$, $v' = \\sin x$, puis $u = x$, $v' = \\cos x$" },
    { f: `${kk}x^{2}\\cos x`, a: "0", b: "\\pi", v: [T(-2 * k, 1, "\\pi")], etape: "on pose d'abord $u = x^{2}$, $v' = \\cos x$, puis $u = x$, $v' = \\sin x$" },
    { f: `${kk}x^{2}\\sin x`, a: "0", b: "\\dfrac{\\pi}{2}", v: [T(k, 1, "\\pi"), T(-2 * k, 1)], etape: "on pose d'abord $u = x^{2}$, $v' = \\sin x$, puis $u = x$, $v' = \\cos x$" },
    { f: `${kk}x^{2}\\cos x`, a: "0", b: "\\dfrac{\\pi}{2}", v: [T(k, 4, "\\pi^{2}"), T(-2 * k, 1)], etape: "on pose d'abord $u = x^{2}$, $v' = \\cos x$, puis $u = x$, $v' = \\sin x$" },
    { f: k === 1 ? "(\\ln x)^{2}" : `${k}(\\ln x)^{2}`, a: "1", b: "e", v: [T(k, 1, "e"), T(-2 * k, 1)], etape: "on pose d'abord $u = (\\ln x)^{2}$, $v' = 1$, puis $u = \\ln x$, $v' = 1$" },
  ]);
}

const QUESTIONS_I: Array<(i: string) => string> = [
  (i) => `Calcule $${i}$.`,
  (i) => `Détermine la valeur exacte de $${i}$.`,
  (i) => `À l'aide d'une intégration par parties, calcule $${i}$.`,
  (i) => `Par parties, trouve la valeur de $${i}$.`,
  (i) => `Quelle est la valeur exacte de $${i}$ ?`,
  (i) => `Que vaut $${i}$ ?`,
  (i) => `Une intégration par parties donne $${i}$ égal à :`,
  (i) => `On intègre par parties. Quel résultat obtient-on pour $${i}$ ?`,
];

const CONTEXTES: Array<(i: string) => string> = [
  (i) => `Un laboratoire modélise l'effet d'un médicament. L'exposition totale sur la période vaut $${i}$, dans l'unité du protocole. Quelle est sa valeur exacte ?`,
  (i) => `Une ingénieure calcule l'énergie reçue par un capteur : elle vaut $${i}$, en joules. Quelle est sa valeur exacte ?`,
  (i) => `Une économiste évalue un gain cumulé par $${i}$, en milliers d'euros. Quelle est sa valeur exacte ?`,
  (i) => `En biologie, la quantité totale produite par une culture sur la durée étudiée vaut $${i}$, en grammes. Quelle est sa valeur exacte ?`,
  (i) => `Une climatologue estime un cumul de chaleur par $${i}$, dans son unité de travail. Quelle est sa valeur exacte ?`,
  (i) => `Un architecte obtient l'aire d'une façade courbe, en m², par $${i}$. Quelle est sa valeur exacte ?`,
  (i) => `La distance parcourue par un mobile est donnée par $${i}$, en mètres. Quelle est sa valeur exacte ?`,
  (i) => `Une acousticienne mesure une intensité cumulée égale à $${i}$. Quelle est sa valeur exacte ?`,
];

/** Un produit lisible : pas de « × 1 », parenthèses dès qu'il y a un signe ou un ln. */
function produit(a: string, b: string) {
  const pr = (s: string) => (/[+\-]|\\ln/.test(s) ? `(${s})` : s);
  if (a === "1") return pr(b);
  if (b === "1") return pr(a);
  return `${pr(a)}${pr(b)}`;
}

export const integrationPartiesBank: TutorBankItemV4[] = [
  /* ===== integrale_ipp_choisir ===== */
  tpl("integrale_ipp_choisir", 1, 1, "On dérive le facteur que la dérivée simplifie (un polynôme, ou ln x qu'on ne sait pas primitiver).", () => {
    const f = famille();
    const texte = phrase(
      [`Pour calculer une primitive de $x \\mapsto ${f.f}$ par parties,`, `On veut intégrer $${f.f}$ par parties :`, `Fonction à intégrer par parties : $${f.f}$.`, `Dans une intégration par parties de $${f.f}$,`],
      ["quel est le choix efficace ?", "que prendre pour $u$ et $v'$ ?", "quel choix de $u$ et de $v'$ mène au calcul ?", "quel découpage faut-il retenir ?", "comment poser le calcul ?", "quelle ligne choisir ?"],
    );
    const ch = (u: string, v: string) => `$u(x) = ${u}$ et $v'(x) = ${v}$`;
    return qcm(
      texte,
      ch(f.u, f.vp),
      [ch(f.vp, f.u), ch(f.f, "1"), ch("1", f.f), ch(f.up, f.v), ch(f.v, f.up)],
      expl(DEF, f.ln ? "on ne sait pas primitiver $\\ln x$ : c'est lui qu'on dérive." : "on dérive le polynôme : il se simplifie, et on sait primitiver l'autre facteur.", `$u(x) = ${f.u}$ donne $u'(x) = ${f.up}$ ; $v'(x) = ${f.vp}$ donne $v(x) = ${f.v}$.`, `on pose $u(x) = ${f.u}$ et $v'(x) = ${f.vp}$.`),
    );
  }),
  tpl("integrale_ipp_choisir", 2, 2, "u' se trouve en dérivant, v en primitivant.", () => {
    const f = famille();
    const texte = phrase(
      [`On pose $u(x) = ${f.u}$ et $v'(x) = ${f.vp}$.`, `Dans une intégration par parties, $u(x) = ${f.u}$ et $v'(x) = ${f.vp}$.`, `Choix retenu : $u(x) = ${f.u}$ ; $v'(x) = ${f.vp}$.`],
      ["Que valent $u'(x)$ et $v(x)$ ?", "Quelles sont alors $u'(x)$ et $v(x)$ ?", "Complète : $u'(x)$ et une primitive $v(x)$ de $v'$ sont :", "Quelle ligne donne $u'$ et $v$ ?", "Quels objets entrent dans la formule ?", "Dérive $u$ et primitive $v'$ : on obtient"],
    );
    const ch = (a: string, b: string) => `$u'(x) = ${a}$ et $v(x) = ${b}$`;
    const vNeg = f.v.startsWith("-") ? f.v.slice(1) : `-${f.v}`;
    return qcm(
      texte,
      ch(f.up, f.v),
      [ch(f.up, vNeg), ch(f.u, f.v), ch(f.up, f.vp), ch(f.vp, f.up), ch(f.v, f.up)],
      expl("$u'$ est la dérivée de $u$ ; $v$ est une primitive de $v'$.", "on dérive $u$ puis on primitive $v'$ en surveillant les signes et les coefficients.", `$u'(x) = ${f.up}$ et $v(x) = ${f.v}$.`, `on a $u'(x) = ${f.up}$ et $v(x) = ${f.v}$.`),
    );
  }),
  tpl("integrale_ipp_choisir", 3, 3, "Écris la formule : le crochet contient u×v, l'intégrale restante contient u'×v.", () => {
    let c = integrale();
    // Sur une période, l intégrale restante est nulle : « + » et « - » vaudraient pareil. On évite ces cas.
    while (c.b === "\\pi" && /sin|cos/.test(c.vp) || /2x/.test(c.vp)) c = integrale();
    const texte = phrase(
      [`Par parties, avec $u(x) = ${c.u}$ et $v'(x) = ${c.vp}$, l'intégrale $${integ(c)}$ devient`, `On intègre $${integ(c)}$ par parties, $u(x) = ${c.u}$, $v'(x) = ${c.vp}$. On obtient`, `Pour $${integ(c)}$, on pose $u(x) = ${c.u}$ et $v'(x) = ${c.vp}$. La formule donne`],
      ["laquelle de ces écritures ?", "quelle égalité ?", "quelle ligne de calcul ?", "quelle expression, sans erreur de signe ?"],
    );
    const croch = (a: string, b: string) => `\\left[${produit(a, b)}\\right]_{${c.a}}^{${c.b}}`;
    const I = (a: string, b: string) => `\\int_{${c.a}}^{${c.b}} ${produit(a, b)}\\,\\mathrm{d}x`;
    const juste = `$${croch(c.u, c.vv)} - ${I(c.up, c.vv)}$`;
    return qcm(
      texte,
      juste,
      [`$${croch(c.u, c.vv)} + ${I(c.up, c.vv)}$`, `$${croch(c.up, c.vv)} - ${I(c.u, c.vv)}$`, `$${croch(c.u, c.vp)} - ${I(c.up, c.vp)}$`, `$${croch(c.u, c.vv)} - ${I(c.u, c.vv)}$`],
      expl(DEF, "on applique la formule sans changer ses signes.", `$u'(x) = ${c.up}$ et $v(x) = ${c.vv}$.`, `on obtient ${juste}.`),
    );
  }),

  /* ===== integrale_ipp_calculer ===== */
  tpl("integrale_ipp_calculer", 1, 1, "Une primitive est donnée : il reste F(b) − F(a).", () => {
    const c = integrale();
    const I = integ(c);
    const debut = un([`Par parties, on trouve que $F(x) = ${c.F}$ est une primitive de $${c.f}$.`, `Une intégration par parties montre qu'une primitive de $${c.f}$ est $F(x) = ${c.F}$.`, `On admet le résultat de l'intégration par parties : $F(x) = ${c.F}$ est une primitive de $${c.f}$.`]);
    const fin = un([`Que vaut $${I}$ ?`, `Quelle est la valeur de $${I}$ ?`, `Calcule alors $${I}$.`, `En déduire la valeur de $${I}$.`]);
    return qcm(`${debut} ${fin}`, m$(somme(c.v)), fauxExacts(c.v).map(m$), explCalc(c));
  }),
  tpl("integrale_ipp_calculer", 2, 1, "Le crochet [uv] puis l'intégrale de u'v.", () => {
    const c = integrale();
    return qcm(
      `On pose $u(x) = ${c.u}$ et $v'(x) = ${c.vp}$ pour calculer $I = ${integ(c)}$. ${un(["Quelle est la valeur de $I$ ?", "Que vaut $I$ ?", "Donne $I$.", "On obtient :", "Le calcul donne :"])}`,
      m$(somme(c.v)),
      fauxExacts(c.v).map(m$),
      explCalc(c),
    );
  }),
  tpl("integrale_ipp_calculer", 3, 2, "Choisis u et v', écris la formule, calcule le crochet puis l'intégrale restante.", () => {
    const c = integrale();
    return qcm(un(QUESTIONS_I)(integ(c)), m$(somme(c.v)), fauxExacts(c.v).map(m$), explCalc(c));
  }),
  tpl("integrale_ipp_calculer", 4, 2, "Commence par l'intégration par parties.", () => {
    const c = integrale();
    return qcm(
      `${un(["On note", "Soit", "On pose"])} $J = ${integ(c)}$. ${un(["Que vaut $J$ ?", "Quelle est la valeur de $J$ ?", "Le calcul par parties donne $J$ égal à :", "En intégrant par parties, on trouve $J$ égal à :"])}`,
      m$(somme(c.v)),
      fauxExacts(c.v).map(m$),
      explCalc(c),
    );
  }),
  tpl("integrale_ipp_calculer", 5, 3, "Deux intégrations par parties de suite : le degré du polynôme baisse à chaque fois.", () => {
    const c = doubleIPP();
    const I = integ(c);
    return qcm(
      un([`Il faut deux intégrations par parties pour $${I}$. Que vaut cette intégrale ?`, `En intégrant deux fois par parties, calcule $${I}$.`, `Quelle est la valeur exacte de $${I}$ ? (deux intégrations par parties)`, `Une seule intégration par parties ne suffit pas pour $${I}$. Quelle est sa valeur exacte ?`]),
      m$(somme(c.v)),
      fauxExacts(c.v).map(m$),
      expl(DEF, `${c.etape}.`, "à chaque passage, la partie dérivée perd un degré, jusqu'à une intégrale immédiate.", `l'intégrale vaut $${somme(c.v)}$.`),
    );
  }),
  tpl("integrale_ipp_calculer", 6, 3, "Reconnais l'intégrale, puis fais l'intégration par parties.", () => {
    const c = integrale();
    return qcm(un(CONTEXTES)(integ(c)), m$(somme(c.v)), fauxExacts(c.v).map(m$), explCalc(c));
  }),

  /* ===== integrale_ipp_primitive ===== */
  tpl("integrale_ipp_primitive", 1, 1, "Vérifie en dérivant : F' doit redonner la fonction.", () => {
    const f = famille();
    const juste = somme(f.F);
    return qcm(
      phrase([`Une primitive de $x \\mapsto ${f.f}$ est :`, `Par parties, on obtient comme primitive de $${f.f}$ :`, `Laquelle de ces fonctions est une primitive de $${f.f}$ ?`, `On cherche $F$ telle que $F'(x) = ${f.f}$. On trouve :`], ["", "(Tu peux vérifier en dérivant.)", "(Une seule proposition convient.)"]),
      `$F(x) = ${juste}$`,
      fauxPrimitives(f.F).map((x) => `$F(x) = ${x}$`),
      expl(DEF, `on pose $u(x) = ${f.u}$ et $v'(x) = ${f.vp}$.`, `$u'(x) = ${f.up}$, $v(x) = ${f.v}$, et on primitive $u'v$.`, `$F(x) = ${juste}$ convient : sa dérivée redonne $${f.f}$.`),
    );
  }),
  tpl("integrale_ipp_primitive", 2, 2, "On choisit u et v', puis uv moins une primitive de u'v.", () => {
    const f = famille(un([5, 6, 7, 5, 1, 3, 4]));
    const juste = somme(f.F);
    return qcm(
      phrase([`En posant $u(x) = ${f.u}$ et $v'(x) = ${f.vp}$,`, `Par une intégration par parties avec $u(x) = ${f.u}$,`, `Avec le choix $v'(x) = ${f.vp}$,`], [`une primitive de $${f.f}$ est :`, `on trouve une primitive de $${f.f}$ égale à :`, `quelle est la primitive de $${f.f}$ obtenue ?`, `on arrive à quelle primitive de $${f.f}$ ?`, `$${f.f}$ a pour primitive :`]),
      m$(juste),
      fauxPrimitives(f.F).map(m$),
      expl(DEF, `$u'(x) = ${f.up}$ et $v(x) = ${f.v}$.`, "on écrit $uv$ puis on retranche une primitive de $u'v$.", `une primitive est $${juste}$.`),
    );
  }),
  tpl("integrale_ipp_primitive", 3, 3, "Trouve d'abord F, puis ajuste la constante avec la condition.", () => {
    const k = un([1, 2, 3, 5]);
    const c = un([-3, -2, -1, 1, 2, 4]);
    const f = somme([T(k, 1, "\\ln x")]);
    // F(x) = k(x ln x − x) + C avec F(1) = c, donc C = c + k.
    const nom = un(["F", "G", "H"]);
    const base = [T(k, 1, "x\\ln x"), T(-k, 1, "x")];
    const juste = somme([...base, T(c + k, 1)]);
    const faux = [somme([...base, T(c, 1)]), somme([...base, T(c - k, 1)]), somme([T(k, 1, "x\\ln x"), T(k, 1, "x"), T(c - k, 1)]), somme([...base, T(c + k + 1, 1)])];
    return qcm(
      `${un(["Sur $]0\\,;+\\infty[$, on cherche", "On veut", "Détermine"])} la primitive $${nom}$ de $x \\mapsto ${f}$ telle que $${nom}(1) = ${c}$. ${un(["Quelle est-elle ?", "On trouve :", "Quelle expression convient ?", "Laquelle choisir ?", "Elle s'écrit :"])}`,
      `$${nom}(x) = ${juste}$`,
      faux.map((x) => `$${nom}(x) = ${x}$`),
      expl(DEF, `par parties avec $u(x) = ${f}$, $v'(x) = 1$ ; toutes les primitives s'écrivent $${somme(base)} + C$.`, `$${nom}(1) = ${-k} + C = ${c}$ donc $C = ${c + k}$.`, `$${nom}(x) = ${juste}$.`),
    );
  }),
  tpl("integrale_ipp_primitive", 4, 3, "Calcule F par parties, puis remplace x par la valeur demandée.", () => {
    // Primitive s'annulant en 0 de (mx+p)e^x : F(1) = p·e − p + m.
    const m = entre(1, 4);
    const p = un([1, 2, 3, 5, -1, -2]);
    const v = [T(p, 1, "e"), T(m - p, 1)];
    const nom = un(["F", "G", "H"]);
    return qcm(
      `${un(["On appelle", "On note", "Soit"])} $${nom}$ ${un(["la primitive", "l'unique primitive"])} de $x \\mapsto ${par(m, p)}e^{x}$ ${un(["qui s'annule en $0$", `telle que $${nom}(0) = 0$`])}. ${un([`Que vaut $${nom}(1)$ ?`, `Calcule $${nom}(1)$.`, `Quelle est la valeur de $${nom}(1)$ ?`, `Donne $${nom}(1)$.`])}`,
      m$(somme(v)),
      fauxExacts(v).map(m$),
      expl(DEF, `$${nom}(1) = \\int_0^1 ${par(m, p)}e^{x}\\,\\mathrm{d}x$ : on intègre par parties.`, `$u(x) = ${lin(m, p)}$, $v'(x) = e^{x}$, d'où la primitive $${par(m, p - m)}e^{x}$, à laquelle on ajoute la constante qui l'annule en $0$.`, `$${nom}(1) = ${somme(v)}$.`),
    );
  }),
];
