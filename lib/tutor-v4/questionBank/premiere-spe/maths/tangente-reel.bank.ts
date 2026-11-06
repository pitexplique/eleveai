// TANGENTE D'UN RÉEL (06/11/2026) : tan x = sin x ÷ cos x, valeurs remarquables, signe, ensemble de
// définition ; 1 + tan² x = 1/cos² x, retrouver cos à partir de tan, dérivée, variations.
// Hors programme français de première (registre `hors_france`). Lignes visées : Maroc TC V-3 et 3AC S1-6,
// Sénégal 2nde AG 5 et 1re AN 6, Côte d'Ivoire 2nde C3-L4 et 1re (dérivées usuelles).
// ⚠️ Valeurs exactes partout, fractions de π : rien ne repose sur la calculatrice.

import type { CanvasFigure, TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { court, entre, expl, fabrique, fr, melange, phrase, qcm, un } from "../../lycee-commun";
import { F, ajoute, argL, enonce, frL, ligneDe, oppose, piL, type Fr } from "./trigo-pi-commun";

const tpl = fabrique("premiere-spe", "tangente_reel", "1s_");
const M1 = "tan_reel";
const M2 = "tan_identite_derivee";

const CERCLE: CanvasFigure = { kind: "cercle_trigo", reperes: "tous" } as CanvasFigure;
const R3S3 = "\\dfrac{\\sqrt{3}}{3}";
/** Ramène dans ]−π/2 ; π/2] et lit la table. `null` si la tangente n'existe pas. */
function tanL(a: Fr): string | null {
  const k = Math.ceil(a.n / a.d - 0.5 - 1e-9);
  const r = ajoute(a, F(-k));
  if (r.n === 1 && r.d === 2) return null;
  const v = Math.abs(r.n / r.d);
  const s = r.n < 0 ? "-" : "";
  if (v === 0) return "0";
  if (Math.abs(v - 1 / 6) < 1e-9) return s + R3S3;
  if (Math.abs(v - 1 / 4) < 1e-9) return `${s}1`;
  if (Math.abs(v - 1 / 3) < 1e-9) return `${s}\\sqrt{3}`;
  throw new Error(`tangente hors de la table : ${a.n}/${a.d}`);
}
const TABLE = ["0", "1", "-1", "\\sqrt{3}", "-\\sqrt{3}", R3S3, `-${R3S3}`, "\\dfrac{1}{2}", "\\dfrac{\\sqrt{2}}{2}", "\\dfrac{\\sqrt{3}}{2}", "-\\dfrac{\\sqrt{3}}{2}", "-\\dfrac{1}{2}", "2"];
const d$ = (s: string) => `$${s}$`;
const DEF = "pour $x$ tel que $\\cos x \\neq 0$, $\\tan x = \\dfrac{\\sin x}{\\cos x}$.";
const TRIPLETS: [number, number, number][] = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [20, 21, 29], [9, 40, 41]];
const FINS_V = ["Quelle est sa valeur exacte ?", "Donne sa valeur exacte.", "Que vaut ce nombre ?", "Quelle valeur exacte trouve-t-on ?", "Quelle est la bonne valeur ?"];
const DEB_V = ["Sans calculatrice, on cherche :", "On veut la valeur exacte de :", "Voici une tangente à calculer :", "On s'intéresse à ce nombre :", "Calcule de tête :", "On lit sur le cercle trigonométrique :"];

/** Une fraction de deux entiers, en choix de QCM. */
const fracC = (p: number, q: number) => d$(frL(p, q));

/* Quadrants : bornes en quarts de tour (fractions de π), signe de sin et de cos. */
const QUADRANTS: { a: Fr; b: Fr; s: number; c: number }[] = [
  { a: F(0), b: F(1, 2), s: 1, c: 1 },
  { a: F(1, 2), b: F(1), s: 1, c: -1 },
  { a: F(1), b: F(3, 2), s: -1, c: -1 },
  { a: F(3, 2), b: F(2), s: -1, c: 1 },
  { a: F(-1, 2), b: F(0), s: -1, c: 1 },
  { a: F(-1), b: F(-1, 2), s: -1, c: -1 },
  { a: F(2), b: F(5, 2), s: 1, c: 1 },
  { a: F(-3, 2), b: F(-1), s: 1, c: -1 },
];
const intL = (q: { a: Fr; b: Fr }) => `\\left]${piL(q.a)}\\,;${piL(q.b)}\\right[`;
const CHOIX_SIGNE = ["$\\tan x > 0$", "$\\tan x < 0$", "$\\tan x = 0$", "$\\tan x$ n'existe pas"];

/* Comment une tangente varie selon la forme de son argument. */
const COEFS_TAN = (k: number) => (k === 0 ? "0" : k === 1 ? "\\tan x" : k === -1 ? "-\\tan x" : `${k}\\tan x`);
const ASSOCIES: { l: string; c: number }[] = [
  { l: "\\tan\\left(\\pi + x\\right)", c: 1 },
  { l: "\\tan\\left(\\pi - x\\right)", c: -1 },
  { l: "\\tan\\left(-x\\right)", c: -1 },
  { l: "\\tan\\left(2\\pi + x\\right)", c: 1 },
  { l: "\\tan\\left(x - \\pi\\right)", c: 1 },
  { l: "\\tan\\left(2\\pi - x\\right)", c: -1 },
];
function terme(i: number, co: number, l: string) {
  const a = Math.abs(co);
  const c = a === 1 ? "" : String(a);
  return i === 0 ? `${co < 0 ? "-" : ""}${c}${l}` : ` ${co < 0 ? "-" : "+"} ${c}${l}`;
}

/* ─────────── seconde micro ─────────── */

const IDENT: { src: string; juste: string }[] = [
  { src: "1 + \\tan^2 x", juste: "\\dfrac{1}{\\cos^2 x}" },
  { src: "\\dfrac{1}{\\cos^2 x} - 1", juste: "\\tan^2 x" },
  { src: "\\dfrac{1}{\\cos^2 x} - \\tan^2 x", juste: "1" },
  { src: "\\cos^2 x \\left(1 + \\tan^2 x\\right)", juste: "1" },
  { src: "\\cos^2 x \\tan^2 x", juste: "\\sin^2 x" },
  { src: "\\dfrac{\\sin^2 x}{\\cos^2 x}", juste: "\\tan^2 x" },
  { src: "\\dfrac{1}{1 + \\tan^2 x}", juste: "\\cos^2 x" },
  { src: "\\dfrac{\\tan x}{\\sin x}", juste: "\\dfrac{1}{\\cos x}" },
  { src: "\\tan x \\cos x", juste: "\\sin x" },
];
const FAUX_ID = ["\\dfrac{1}{\\cos^2 x}", "\\dfrac{1}{\\sin^2 x}", "\\tan^2 x", "\\cos^2 x", "\\sin^2 x", "1", "\\sin x", "\\dfrac{1}{\\cos x}", "2", "\\tan x"];
const EMPLOI = "$1 + \\tan^2 x = \\dfrac{1}{\\cos^2 x}$ : on divise $\\cos^2 x + \\sin^2 x = 1$ par $\\cos^2 x$.";
const DERIVEE = "$\\tan$ est dérivable sur son ensemble de définition, et $\\tan' x = 1 + \\tan^2 x = \\dfrac{1}{\\cos^2 x}$.";
/** a tan x + b x, écrit proprement. */
function fTan(a: number, b: number, c = 0) {
  const A = a === 1 ? "\\tan x" : a === -1 ? "-\\tan x" : `${a}\\tan x`;
  const B = b === 0 ? "" : ` ${b < 0 ? "-" : "+"} ${Math.abs(b) === 1 ? "" : Math.abs(b)}x`;
  const C = c === 0 ? "" : ` ${c < 0 ? "-" : "+"} ${Math.abs(c)}`;
  return `${A}${B}${C}`;
}
/** k(1 + tan² x) + b écrit proprement. */
function dTan(k: number, b: number) {
  const coef = k === 1 ? "" : k === -1 ? "-" : String(k);
  const base = `${coef}\\left(1 + \\tan^2 x\\right)`;
  return b === 0 ? base : `${base} ${b < 0 ? "-" : "+"} ${Math.abs(b)}`;
}
const PROJETS: ((d: number) => string)[] = [
  (d) => `Un projecteur tourne au sol, à $${d}$ m d'un mur. La tache de lumière est à la hauteur :`,
  (d) => `Un phare suit une falaise droite située à $${d}$ m. Son faisceau atteint le point d'abscisse :`,
  (d) => `Une caméra suit un coureur sur une ligne droite, à $${d}$ m d'elle. Le coureur est à la position :`,
  (d) => `Un radar à $${d}$ m d'une rampe suit une fusée qui décolle. La fusée est à l'altitude :`,
  (d) => `Un gyrophare éclaire un mur à $${d}$ m. Le point éclairé est à la position :`,
  (d) => `Un laser de concert vise un écran à $${d}$ m. Le point lumineux est à la hauteur :`,
  (d) => `Une lampe de spéléologue éclaire une paroi à $${d}$ m. Le point éclairé est à la hauteur :`,
  (d) => `Sur un plateau de tournage, un suiveur vise un décor à $${d}$ m. Le point visé est à la position :`,
  (d) => `Une lunette suit un oiseau qui longe une falaise à $${d}$ m. L'oiseau est à la hauteur :`,
  (d) => `Un phare du littoral balaie une digue droite à $${d}$ m. Le faisceau touche la digue à la position :`,
];
/** Les pentes exactes : [angle, tan comme coefficient de √3 ou entier]. */
const PENTES: ((L: number, a: string) => string)[] = [
  (L, a) => `Une rampe d'accès s'étend sur $${L}$ m à l'horizontale et fait un angle de $${a}$ avec le sol.`,
  (L, a) => `Le pan d'un toit couvre $${L}$ m à l'horizontale et s'élève avec un angle de $${a}$.`,
  (L, a) => `Un mât porte une ombre de $${L}$ m au sol quand le soleil est à un angle de $${a}$ au-dessus de l'horizon.`,
  (L, a) => `Une piste de ski descend sur $${L}$ m à l'horizontale, avec un angle de $${a}$.`,
  (L, a) => `Depuis le pied d'une falaise distant de $${L}$ m, une alpiniste voit le sommet sous un angle de $${a}$.`,
  (L, a) => `Un funiculaire avance de $${L}$ m à l'horizontale sur une voie inclinée d'un angle de $${a}$.`,
  (L, a) => `À $${L}$ m d'un arbre, un forestier voit la cime sous un angle de $${a}$.`,
  (L, a) => `Un escalator couvre $${L}$ m à l'horizontale, incliné d'un angle de $${a}$.`,
  (L, a) => `Un tremplin de skate couvre $${L}$ m au sol et fait un angle de $${a}$ avec lui.`,
  (L, a) => `Un pont-levis ouvert couvre $${L}$ m à l'horizontale avec un angle de $${a}$.`,
  (L, a) => `À $${L}$ m d'une éolienne, un technicien voit le moyeu sous un angle de $${a}$.`,
  (L, a) => `Un panneau solaire couvre $${L}$ m au sol et s'incline d'un angle de $${a}$.`,
];

export const tangenteReelBank: TutorBankItemV4[] = [
  /* ═══════════ tan_reel ═══════════ */
  tpl(M1, 1, 1, "Sur le cercle : tan x = sin x ÷ cos x. Retiens 0, √3/3, 1, √3 pour 0, π/6, π/4, π/3.", () => {
    const a = un([F(0), F(1, 6), F(1, 4), F(1, 3), F(-1, 6), F(-1, 4), F(-1, 3)]);
    const v = tanL(a)!;
    return qcm(enonce(un(DEB_V), ligneDe("tan", a), un(FINS_V)), d$(v), TABLE.map(d$), expl(DEF, "on divise le sinus par le cosinus, ou on lit la table des valeurs remarquables.", `$\\tan\\left(${piL(a)}\\right) = ${v}$.`, `la valeur exacte est $${v}$.`), CERCLE);
  }),
  tpl(M1, 2, 1, "Divise le sinus par le cosinus, en gardant les signes.", () => {
    const [p, q, h] = un(TRIPLETS);
    const [sP, cP] = Math.random() < 0.5 ? [p, q] : [q, p];
    const sS = un([1, -1]);
    const sC = un([1, -1]);
    const s = sS * sP;
    const c = sC * cP;
    return qcm(
      `${un(["Pour un réel $x$, on a :", "On sait que :", "Sur le cercle trigonométrique, un point associé à $x$ vérifie :", "Un réel $x$ vérifie :", "On a mesuré, pour un réel $x$ :"])}\n\n$\\cos x = ${frL(c, h)}$\n\n$\\sin x = ${frL(s, h)}$\n\n${un(["Que vaut $\\tan x$ ?", "Quelle est la valeur de $\\tan x$ ?", "Calcule $\\tan x$.", "Déduis-en $\\tan x$.", "Quelle tangente obtient-on ?"])}`,
      fracC(s, c),
      [fracC(c, s), fracC(-s, c), fracC(-c, s), fracC(s * c, h * h), fracC(s + h, c + h)],
      expl(DEF, "on divise les deux fractions : le dénominateur commun disparaît.", `$\\tan x = ${frL(s, h)} \\div ${c < 0 ? `\\left(${frL(c, h)}\\right)` : frL(c, h)} = ${frL(s, c)}$.`, `$\\tan x = ${frL(s, c)}$.`),
    );
  }),
  tpl(M1, 3, 1, "tan x n'existe pas quand cos x = 0, c'est-à-dire en π/2 + kπ.", () => {
    const juste = un([F(1, 2), F(-1, 2), F(3, 2), F(-3, 2), F(5, 2), F(-5, 2), F(7, 2)]);
    return qcm(
      phrase(["La tangente se définit par un quotient dont le dénominateur est $\\cos x$.", "On rappelle que $\\tan x = \\dfrac{\\sin x}{\\cos x}$.", "Un quotient n'existe pas si son dénominateur est nul.", "La fonction tangente n'est pas définie partout.", "Le nombre $\\tan x$ peut ne pas exister."], ["Pour lequel de ces réels $\\tan x$ n'existe-t-il pas ?", "Laquelle de ces valeurs de $x$ n'a pas de tangente ?", "En quel réel la tangente n'est-elle pas définie ?", "Lequel de ces réels n'appartient pas à l'ensemble de définition de la tangente ?"]),
      d$(piL(juste)),
      [F(0), F(1), F(1, 4), F(-1, 4), F(1, 3), F(2), F(-1), F(3, 4), F(1, 6), F(-2, 3)].map((a) => d$(piL(a))),
      expl(DEF, "on cherche le réel dont le cosinus est nul.", `$\\cos\\left(${piL(juste)}\\right) = 0$.`, `c'est $${piL(juste)}$.`),
    );
  }),
  tpl(M1, 4, 2, "La tangente a pour période π : retire des multiples de π pour revenir dans ]−π/2 ; π/2[.", () => {
    for (;;) {
      const d = un([3, 4, 6]);
      const a = F(un([-1, 1]) * entre(1, 40), d);
      const v = tanL(a);
      if (v === null || a.d === 1) continue;
      return qcm(enonce(un(DEB_V), ligneDe("tan", a), un(FINS_V)), d$(v), TABLE.map(d$), expl(`${DEF} Elle a pour période $\\pi$ : $\\tan(x + k\\pi) = \\tan x$.`, "on retire un multiple de $\\pi$ pour se ramener à une valeur remarquable.", `On obtient $${v}$.`, `la valeur exacte est $${v}$.`), CERCLE);
    }
  }),
  tpl(M1, 5, 2, "Le signe de tan x est celui du quotient : regarde sin x et cos x dans le quadrant.", () => {
    const Q = un(QUADRANTS);
    const parSignes = Math.random() < 0.4;
    const pos = Q.s * Q.c > 0;
    const texte = parSignes
      ? enonce(un(["Pour un réel $x$, on sait que :", "Un réel $x$ vérifie :", "Sur le cercle, le point associé à $x$ vérifie :", "On connaît les signes pour un réel $x$ :"]), `\\cos x ${Q.c > 0 ? ">" : "<"} 0 \\text{ et } \\sin x ${Q.s > 0 ? ">" : "<"} 0`, un(["Que dire de $\\tan x$ ?", "Quel est le signe de $\\tan x$ ?", "Quelle affirmation est juste ?"]))
      : enonce(un(["Le réel $x$ appartient à l'intervalle :", "On prend $x$ dans :", "On choisit un réel $x$ de :", "Le réel $x$ est dans :"]), intL(Q), un(["Que dire de $\\tan x$ ?", "Quel est le signe de $\\tan x$ ?", "Quelle affirmation est juste ?", "Laquelle de ces affirmations est vraie ?"]));
    return qcm(texte, pos ? CHOIX_SIGNE[0] : CHOIX_SIGNE[1], CHOIX_SIGNE, expl(DEF, "on cherche les signes de $\\sin x$ et de $\\cos x$, puis le signe du quotient.", `Ici, $\\sin x$ est ${Q.s > 0 ? "positif" : "négatif"} et $\\cos x$ est ${Q.c > 0 ? "positif" : "négatif"}.`, `$\\tan x$ est ${pos ? "positif" : "négatif"}.`));
  }),
  tpl(M1, 6, 2, "tan(mx + φ) n'existe pas quand mx + φ = π/2 + kπ : résous en x, en divisant tout par m.", () => {
    for (;;) {
      const m = un([1, 2, 2, 3, 4]);
      const phi = un([F(0), F(1, 3), F(-1, 3), F(1, 4), F(-1, 4), F(1, 6), F(-1, 6)]);
      if (m === 1 && phi.n === 0) continue;
      const a = (m_: number, p: Fr) => F(p.d - 2 * p.n, 2 * p.d * m_); // (π/2 − φ) ÷ m
      const per = (x: number, fois = 1) => {
        const f = F(fois, x);
        const c = f.n === 1 ? "" : f.n;
        return f.d === 1 ? `${c}k\\pi` : `\\dfrac{${c}k\\pi}{${f.d}}`;
      };
      const ecr = (b: Fr, p: string) => `$x \\neq ${b.n === 0 ? p : `${piL(b)} + ${p}`}$, avec $k \\in \\mathbb{Z}$`;
      const b = a(m, phi);
      const juste = ecr(b, per(m));
      const fx = `f(x) = \\tan\\left(${argL(m, phi)}\\right)`;
      return qcm(
        enonce(un(["On considère la fonction :", "Une fonction est définie par :", "Soit la fonction :", "On étudie la fonction :"]), fx, un(["Quel est son ensemble de définition ?", "Pour quels réels est-elle définie ?", "Quelle condition sur $x$ assure que $f(x)$ existe ?", "Quels réels $x$ conviennent ?"])),
        juste,
        [ecr(b, per(m, 2)), ecr(a(m, oppose(phi)), per(m)), ecr(a(1, phi), per(1)), ecr(a(m, phi), per(1)), ecr(ajoute(b, F(1, 6)), per(m)), ...(Number.isInteger((2 * b.n * m) / b.d) ? [] : [ecr(oppose(b), per(m))])],
        expl(DEF, "on écrit que l'argument ne doit pas valoir $\\dfrac{\\pi}{2} + k\\pi$, puis on isole $x$.", `$${argL(m, phi)} \\neq \\dfrac{\\pi}{2} + k\\pi$.`, `${juste}.`),
      );
    }
  }),
  tpl(M1, 7, 3, "La hauteur vaut la longueur horizontale multipliée par la tangente de l'angle.", () => {
    const a = un([F(1, 6), F(1, 4), F(1, 3)]);
    const L = 6 * entre(1, 15);
    const co = a.d === 6 ? L / 3 : L;
    const racine = a.d !== 4;
    const ecr = (c: number, r: boolean) => `$${r ? `${c === 1 ? "" : c}\\sqrt{3}` : c}$ m`;
    const juste = ecr(co, racine);
    return qcm(
      `${un(PENTES)(L, piL(a))} ${un(["Quelle hauteur cela représente-t-il ?", "Quelle est la hauteur atteinte ?", "Combien mesure la hauteur correspondante ?", "Quelle est la valeur exacte de cette hauteur ?"])}`,
      juste,
      [ecr(L, false), ecr(L, true), ecr(L / 3, true), ecr(L / 2, false), ecr(2 * L, false), ecr(L / 3, false), ecr(2 * L, true)],
      expl("dans un triangle rectangle, la tangente d'un angle aigu est le quotient du côté opposé par le côté adjacent.", "on multiplie la longueur horizontale par la tangente de l'angle.", `$${L} \\times \\tan\\left(${piL(a)}\\right)$ donne la hauteur.`, `elle vaut ${juste}.`),
    );
  }),
  tpl(M1, 8, 3, "Trouve d'abord l'autre ligne par cos² x + sin² x = 1 ; son signe vient du quadrant.", () => {
    const Q = un(QUADRANTS);
    const [p, q, h] = un(TRIPLETS);
    const [sP, cP] = Math.random() < 0.5 ? [p, q] : [q, p];
    const s = Q.s * sP;
    const c = Q.c * cP;
    const donneSin = Math.random() < 0.5;
    return qcm(
      `${un(["Un réel $x$ vérifie :", "On sait que :", "Pour un réel $x$, on a :", "Un angle $x$ vérifie :"])}\n\n$${donneSin ? `\\sin x = ${frL(s, h)}` : `\\cos x = ${frL(c, h)}`}$\n\n${un(["et $x$ appartient à :", "avec $x$ dans :", "de plus, $x$ est dans :"])}\n\n$${intL(Q)}$\n\n${un(["Que vaut $\\tan x$ ?", "Quelle est la valeur exacte de $\\tan x$ ?", "Déduis-en $\\tan x$.", "Calcule $\\tan x$."])}`,
      fracC(s, c),
      [fracC(-s, c), fracC(c, s), fracC(-c, s), fracC(s, h), fracC(c, h)],
      expl(DEF, "on utilise $\\cos^2 x + \\sin^2 x = 1$, le signe vient de l'intervalle, puis on divise.", `$\\sin x = ${frL(s, h)}$ et $\\cos x = ${frL(c, h)}$.`, `$\\tan x = ${frL(s, c)}$.`),
    );
  }),
  tpl(M1, 9, 3, "tan(π + x) = tan x et tan(−x) = −tan x : réduis chaque terme à ± tan x.", () => {
    const n = un([2, 3]);
    const t = melange(ASSOCIES).slice(0, n);
    const cos = t.map(() => un([1, 1, 2, 3, -1, -2]));
    const src = t.map((x, i) => terme(i, cos[i], x.l)).join("");
    const k = t.reduce((s, x, i) => s + x.c * cos[i], 0);
    return qcm(
      enonce(un(["On simplifie, pour $x$ tel que tout existe :", "Pour tout réel $x$ où ces nombres existent, on considère :", "Réduis cette expression :", "On veut réduire l'expression :"]), src, un(["À quoi cette expression est-elle égale ?", "Quelle est la forme réduite de cette expression ?", "Que vaut cette expression ?", "Quelle écriture simple obtient-on ?"])),
      d$(COEFS_TAN(k)),
      [COEFS_TAN(-k), COEFS_TAN(k + 1), COEFS_TAN(k - 1), COEFS_TAN(k + 2), "\\dfrac{1}{\\tan x}"].map(d$),
      expl("$\\tan$ est impaire et de période $\\pi$ : $\\tan(-x) = -\\tan x$, $\\tan(\\pi + x) = \\tan x$, $\\tan(\\pi - x) = -\\tan x$.", "on réduit chaque terme, puis on additionne les coefficients.", `La somme des coefficients vaut $${k}$.`, `l'expression vaut $${COEFS_TAN(k)}$.`),
    );
  }),

  /* ═══════════ tan_identite_derivee ═══════════ */
  tpl(M2, 1, 1, "Remplace tan x par sin x ÷ cos x, ou souviens-toi de 1 + tan² x = 1/cos² x.", () => {
    const I = un(IDENT);
    return qcm(
      enonce(un(["Pour tout réel $x$ où tout existe, on considère :", "On simplifie, là où elle existe, l'expression :", "Là où elle a un sens, voici une expression :", "Pour $\\cos x \\neq 0$, on regarde :", "Réduis, pour $\\cos x \\neq 0$ :"]), I.src, un(["À quoi cette expression est-elle égale ?", "Quelle écriture plus simple correspond à cette expression ?", "Laquelle de ces écritures est égale à cette expression ?", "Que vaut cette expression ?", "Quelle est la forme simple de cette expression ?"])),
      d$(I.juste),
      FAUX_ID.map(d$),
      expl(EMPLOI, "on remplace $\\tan x$ par $\\dfrac{\\sin x}{\\cos x}$ si besoin, puis on simplifie.", `On trouve $${I.juste}$.`, `elle vaut $${I.juste}$.`),
    );
  }),
  tpl(M2, 2, 1, "1 + tan² x = 1/cos² x : le carré efface le signe de tan x.", () => {
    const [t, tL] = un<[number, string]>([[1, "1"], [2, "2"], [3, "3"], [7, "7"], [-1, "-1"], [-2, "-2"], [-3, "-3"], [-7, "-7"]]);
    const [t2, tL2] = un<[number, string]>([[1, "1"], [2, "2"], [3, "3"], [4, "4"], [5, "5"], [0.5, "\\dfrac{1}{2}"], [1.5, "\\dfrac{3}{2}"], [2.5, "\\dfrac{5}{2}"], [-2, "-2"], [-4, "-4"], [-0.5, "-\\dfrac{1}{2}"]]);
    const cas = un(["inv", "somme", "cos2"]);
    const debut = un(["On sait que :", "Pour un réel $x$, on a :", "Un réel $x$ vérifie :", "On a calculé :", "On connaît la tangente d'un réel $x$ :"]);
    const v = cas === "cos2" ? 1 / (1 + t * t) : 1 + t2 * t2;
    const f = cas === "cos2" ? "\\cos^2 x" : cas === "inv" ? "\\dfrac{1}{\\cos^2 x}" : "1 + \\tan^2 x";
    return court(
      enonce(debut, `\\tan x = ${cas === "cos2" ? tL : tL2}`, `${un(["Calcule :", "Que vaut :", "Quelle est la valeur de :", "Donne la valeur de :"])}\n\n$${f}$`),
      v,
      expl(EMPLOI, "on élève la tangente au carré, on ajoute $1$, puis on prend l'inverse si on veut $\\cos^2 x$.", `On trouve $${f} = ${fr(v).replace(",", "{,}")}$.`, `la valeur est $${fr(v).replace(",", "{,}")}$.`),
    );
  }),
  tpl(M2, 3, 1, "(tan x)' = 1 + tan² x = 1/cos² x ; les constantes et les coefficients se traitent comme d'habitude.", () => {
    const a = un([1, 1, 1, 2, 3, 4, 5, -2, -3]);
    const b = a === 1 ? un([0, 0, -1, 1, 2]) : 0;
    const c = un([0, 0, 1, 2, 3, 5, 7, -1, -4]);
    const fx = fTan(a, b, c);
    const juste = b === -1 ? "\\tan^2 x" : b === 0 && a === 1 ? un(["1 + \\tan^2 x", "\\dfrac{1}{\\cos^2 x}"]) : a === 1 ? `${1 + b} + \\tan^2 x` : dTan(a, b);
    return qcm(
      enonce(un(["La fonction $f$ est définie, sur $\\left]-\\dfrac{\\pi}{2}\\,;\\dfrac{\\pi}{2}\\right[$, par :", "On dérive la fonction :", "Sur $\\left]-\\dfrac{\\pi}{2}\\,;\\dfrac{\\pi}{2}\\right[$, on pose :", "Soit $f$ la fonction :", "On étudie sur $\\left]-\\dfrac{\\pi}{2}\\,;\\dfrac{\\pi}{2}\\right[$ :"]), `f(x) = ${fx}`, un(["Que vaut $f'(x)$ ?", "Quelle est sa dérivée ?", "Laquelle de ces expressions est $f'(x)$ ?", "Quelle écriture de $f'(x)$ est juste ?"])),
      d$(juste),
      [`-${juste.startsWith("\\dfrac") || juste.startsWith("1 +") ? "\\dfrac{1}{\\cos^2 x}" : `\\left(${juste}\\right)`}`, "\\dfrac{1}{\\sin^2 x}", "\\dfrac{1}{\\cos x}", `${a === 1 ? "" : a}\\tan^2 x + ${Math.abs(a) + 7}`, dTan(a + 1, b), dTan(a, b + 2), "\\dfrac{\\cos x}{\\sin x}"].map(d$),
      expl(DERIVEE, "on dérive terme à terme : le coefficient reste, une constante disparaît, $x$ donne $1$.", `On obtient $${juste}$.`, `$f'(x) = ${juste}$.`),
    );
  }),
  tpl(M2, 4, 2, "cos² x = 1 ÷ (1 + tan² x). Le signe de cos x vient de l'intervalle.", () => {
    const [p, q, h] = un(TRIPLETS);
    const cas = un(["triplet", "triplet", "rac"]);
    const droite = Math.random() < 0.5;
    const I = droite ? "\\left]-\\dfrac{\\pi}{2}\\,;\\dfrac{\\pi}{2}\\right[" : "\\left]\\dfrac{\\pi}{2}\\,;\\dfrac{3\\pi}{2}\\right[";
    const s = droite ? 1 : -1;
    const sg = s < 0 ? "-" : "";
    const fin = un(["Que vaut $\\cos x$ ?", "Quelle est la valeur exacte de $\\cos x$ ?", "Déduis-en $\\cos x$.", "Calcule $\\cos x$."]);
    const deb = un(["Un réel $x$ vérifie :", "On sait que :", "Pour un réel $x$, on a :", "On connaît la tangente de $x$ :"]);
    const mil = un(["et $x$ appartient à :", "avec $x$ dans :", "de plus, $x$ est dans :"]);
    if (cas === "triplet") {
      const [tn, tz] = Math.random() < 0.5 ? [p, q] : [q, p];
      const t = un([1, -1]) * tn;
      return qcm(
        `${deb}\n\n$\\tan x = ${frL(t, tz)}$\n\n${mil}\n\n$${I}$\n\n${fin}`,
        fracC(s * tz, h),
        [fracC(-s * tz, h), fracC(s * tn, h), fracC(tz, tn), fracC(-s * tn, h), fracC(tz * tz, h * h)],
        expl(EMPLOI, "on calcule $\\cos^2 x = \\dfrac{1}{1 + \\tan^2 x}$, puis on choisit le signe selon l'intervalle.", `$\\cos^2 x = ${frL(tz * tz, h * h)}$ et $\\cos x$ est ${s > 0 ? "positif" : "négatif"}.`, `$\\cos x = ${frL(s * tz, h)}$.`),
      );
    }
    const [tL, c2, juste, autres] = un<[string, string, string, string[]]>([
      ["1", "\\dfrac{1}{2}", "\\dfrac{\\sqrt{2}}{2}", ["\\dfrac{1}{2}", "\\sqrt{2}", "\\dfrac{\\sqrt{3}}{2}"]],
      ["2", "\\dfrac{1}{5}", "\\dfrac{\\sqrt{5}}{5}", ["\\dfrac{1}{5}", "\\sqrt{5}", "\\dfrac{2\\sqrt{5}}{5}"]],
      ["3", "\\dfrac{1}{10}", "\\dfrac{\\sqrt{10}}{10}", ["\\dfrac{1}{10}", "\\sqrt{10}", "\\dfrac{3\\sqrt{10}}{10}"]],
      ["\\sqrt{3}", "\\dfrac{1}{4}", "\\dfrac{1}{2}", ["\\dfrac{1}{4}", "\\dfrac{\\sqrt{3}}{2}", "\\dfrac{\\sqrt{2}}{2}"]],
    ]);
    return qcm(
      `${deb}\n\n$\\tan x = ${un(["", "-"])}${tL}$\n\n${mil}\n\n$${I}$\n\n${fin}`,
      d$(`${sg}${juste}`),
      [`${s > 0 ? "-" : ""}${juste}`, ...autres.map((a) => `${sg}${a}`)].map(d$),
      expl(EMPLOI, "on calcule $\\cos^2 x = \\dfrac{1}{1 + \\tan^2 x}$, puis on choisit le signe selon l'intervalle.", `$\\cos^2 x = ${c2}$ et $\\cos x$ est ${s > 0 ? "positif" : "négatif"}.`, `$\\cos x = ${sg}${juste}$.`),
    );
  }),
  tpl(M2, 5, 2, "sin x = tan x × cos x. Trouve d'abord cos x, puis multiplie.", () => {
    const Q = un(QUADRANTS);
    const [p, q, h] = un(TRIPLETS);
    const [sP, cP] = Math.random() < 0.5 ? [p, q] : [q, p];
    const s = Q.s * sP;
    const c = Q.c * cP;
    return qcm(
      `${un(["Un réel $x$ vérifie :", "On sait que :", "Pour un réel $x$, on a :", "On connaît la tangente de $x$ :"])}\n\n$\\tan x = ${frL(s, c)}$\n\n${un(["et $x$ appartient à :", "avec $x$ dans :", "de plus, $x$ est dans :"])}\n\n$${intL(Q)}$\n\n${un(["Que vaut $\\sin x$ ?", "Quelle est la valeur exacte de $\\sin x$ ?", "Déduis-en $\\sin x$.", "Calcule $\\sin x$."])}`,
      fracC(s, h),
      [fracC(-s, h), fracC(c, h), fracC(-c, h), fracC(s, c), fracC(s * s, h * h)],
      expl(EMPLOI, "on trouve $\\cos x$ par $\\cos^2 x = \\dfrac{1}{1 + \\tan^2 x}$ et le signe de l'intervalle, puis $\\sin x = \\tan x \\times \\cos x$.", `$\\cos x = ${frL(c, h)}$.`, `$\\sin x = ${frL(s, h)}$.`),
    );
  }),
  tpl(M2, 6, 2, "Dérive, puis remplace x : 1 + tan²(π/4) = 2, 1 + tan²(π/3) = 4, 1 + tan² 0 = 1.", () => {
    const [xL, v] = un<[string, number]>([["0", 1], ["\\dfrac{\\pi}{4}", 2], ["-\\dfrac{\\pi}{4}", 2], ["\\dfrac{\\pi}{3}", 4], ["-\\dfrac{\\pi}{3}", 4]]);
    const a = un([1, 2, 3, 4, 5, -1, -2, -3]);
    const b = un([0, 1, 2, 3, -1, -2, -3, -5]);
    const r = a * v + b;
    return court(
      enonce(un(["Sur $\\left]-\\dfrac{\\pi}{2}\\,;\\dfrac{\\pi}{2}\\right[$, on pose :", "Une fonction $f$ est définie, sur $\\left]-\\dfrac{\\pi}{2}\\,;\\dfrac{\\pi}{2}\\right[$, par :", "On dérive la fonction :", "Soit $f$ la fonction :"]), `f(x) = ${fTan(a, b)}`, `${un(["Calcule le nombre dérivé :", "Que vaut le nombre dérivé :", "Donne la valeur du nombre dérivé :", "Quelle est la valeur exacte de :"])}\n\n$f'\\left(${xL}\\right)$`),
      r,
      expl(DERIVEE, "on dérive, puis on remplace $x$ par sa valeur.", `$f'(x) = ${dTan(a, b)}$.`, `le nombre dérivé vaut $${r}$.`),
    );
  }),
  tpl(M2, 7, 3, "tan est croissante sur chaque intervalle ]−π/2 + kπ ; π/2 + kπ[ : attention à ne pas changer d'intervalle.", () => {
    for (;;) {
      const d = un([5, 7, 8, 9, 10, 12]);
      const cas = un(["meme", "meme", "negatif", "saut", "periode"]);
      const n1 = entre(1, d - 1);
      const n2 = entre(1, d - 1);
      let a: Fr;
      let b: Fr;
      if (cas === "meme") {
        if (n1 === n2 || 2 * n1 >= d || 2 * n2 >= d) continue;
        [a, b] = [F(n1, d), F(n2, d)];
      } else if (cas === "negatif") {
        if (n1 === n2 || 2 * n1 >= d || 2 * n2 >= d) continue;
        [a, b] = [F(-n1, d), F(-n2, d)];
      } else if (cas === "saut") {
        if (2 * n1 >= d || 2 * n2 <= d) continue;
        [a, b] = [F(n1, d), F(n2, d)];
      } else {
        if (2 * n1 >= d) continue;
        [a, b] = [F(n1, d), ajoute(F(n1, d), F(1))];
      }
      const [A, B] = [ligneDe("tan", a), ligneDe("tan", b)];
      const per = cas === "periode";
      const plusPetit = cas === "saut" ? false : a.n / a.d < b.n / b.d;
      const juste = per ? `$\\footnotesize ${A} = ${B}$` : plusPetit ? `$\\footnotesize ${A} < ${B}$` : `$\\footnotesize ${A} > ${B}$`;
      return qcm(
        phrase(["Sans calculatrice, on compare deux tangentes.", "On veut comparer ces deux nombres sans les calculer.", "La fonction tangente est croissante sur chaque intervalle où elle est définie sans interruption.", "On regarde le sens de variation de la tangente."], ["Quelle comparaison est juste ?", "Laquelle de ces écritures est vraie ?", "Laquelle de ces affirmations est exacte ?", "Que peut-on écrire ?"]),
        juste,
        [`$\\footnotesize ${A} < ${B}$`, `$\\footnotesize ${A} > ${B}$`, `$\\footnotesize ${A} = ${B}$`, "On ne peut pas les comparer sans calculatrice."],
        expl("$\\tan' x = 1 + \\tan^2 x > 0$ : la tangente est strictement croissante sur chaque intervalle $\\left]-\\dfrac{\\pi}{2} + k\\pi\\,;\\dfrac{\\pi}{2} + k\\pi\\right[$. Elle a pour période $\\pi$.", "on regarde si les deux réels sont dans le même intervalle ; sinon, on se ramène au signe ou à la période.", cas === "saut" ? "Le premier réel est dans $\\left]0\\,;\\dfrac{\\pi}{2}\\right[$, où la tangente est positive ; le second dans $\\left]\\dfrac{\\pi}{2}\\,;\\pi\\right[$, où elle est négative." : per ? "Les deux réels diffèrent de $\\pi$." : "Les deux réels sont dans le même intervalle, où la tangente croît.", `on écrit ${juste}.`),
      );
    }
  }),
  tpl(M2, 8, 3, "Calcule f'(x) = a(1 + tan² x) + b, puis cherche son signe : tan² x prend toutes les valeurs positives.", () => {
    const a = un([1, 2, 3, -1, -2, -3]);
    const b = un([-5, -4, -3, -2, -1, 1, 2, 3, 4, 5].filter((v) => v !== 0));
    const fx = fTan(a, b);
    // f' = a + b + a tan² x : de signe constant ssi a + b et a ont même signe (ou a + b = 0).
    const som = a + b;
    const monotone = som === 0 || Math.sign(som) === Math.sign(a);
    const C = "$f$ est strictement croissante sur cet intervalle.";
    const D = "$f$ est strictement décroissante sur cet intervalle.";
    const N = "$f$ change de sens de variation sur cet intervalle.";
    const K = "$f$ est constante sur cet intervalle.";
    const juste = monotone ? (a > 0 ? C : D) : N;
    return qcm(
      enonce(un(["Sur $\\left]-\\dfrac{\\pi}{2}\\,;\\dfrac{\\pi}{2}\\right[$, on étudie :", "On considère, sur $\\left]-\\dfrac{\\pi}{2}\\,;\\dfrac{\\pi}{2}\\right[$, la fonction :", "Sur $\\left]-\\dfrac{\\pi}{2}\\,;\\dfrac{\\pi}{2}\\right[$, un modèle s'écrit :", "Une ingénieure modélise un phénomène, sur $\\left]-\\dfrac{\\pi}{2}\\,;\\dfrac{\\pi}{2}\\right[$, par :"]), `f(x) = ${fx}`, un(["Que dire de ses variations ?", "Quel est son sens de variation ?", "Quelle affirmation est juste ?", "Laquelle de ces conclusions est vraie ?"])),
      juste,
      [C, D, N, K],
      expl(DERIVEE, "on calcule $f'(x)$, on l'écrit avec $\\tan^2 x$, qui prend toutes les valeurs de $[0\\,;+\\infty[$, puis on étudie son signe.", `$f'(x) = ${dTan(a, b)}$.`, juste),
    );
  }),
  tpl(M2, 9, 3, "La tangente en a : y = tan'(a) (x − a) + tan a.", () => {
    const [aL, tA, d] = un<[string, string, number]>([["\\dfrac{\\pi}{4}", "1", 2], ["-\\dfrac{\\pi}{4}", "-1", 2], ["\\dfrac{\\pi}{3}", "\\sqrt{3}", 4], ["-\\dfrac{\\pi}{3}", "-\\sqrt{3}", 4], ["\\dfrac{\\pi}{6}", "\\dfrac{\\sqrt{3}}{3}", 4 / 3], ["-\\dfrac{\\pi}{6}", "-\\dfrac{\\sqrt{3}}{3}", 4 / 3]]);
    const moins = aL.startsWith("-") ? `x + ${aL.slice(1)}` : `x - ${aL}`;
    const co = d === 2 ? "2" : d === 4 ? "4" : "\\dfrac{4}{3}";
    const eq = (c: string, m: string, t: string) => `$y = ${c}\\left(${m}\\right) ${t.startsWith("-") ? `- ${t.slice(1)}` : `+ ${t}`}$`;
    const autre = aL.startsWith("-") ? `x - ${aL.slice(1)}` : `x + ${aL}`;
    const opp = tA.startsWith("-") ? tA.slice(1) : `-${tA}`;
    return qcm(
      enonce(un(["La courbe de la fonction tangente admet une tangente au point d'abscisse :", "On trace la courbe de $\\tan$ et sa tangente au point d'abscisse :", "On cherche la droite tangente à la courbe de $\\tan$ en :", "Sur un logiciel, on demande la tangente à la courbe de $\\tan$ en :"]), `a = ${aL}`, un(["Quelle est son équation ?", "Quelle équation lui correspond ?", "Laquelle de ces droites convient ?", "Quelle est l'équation de cette tangente ?"])),
      eq(co, moins, tA),
      [eq(co, autre, tA), eq(co, moins, opp), eq(d === 2 ? "3" : "2", moins, tA), eq("5", moins, tA), eq(co, autre, opp)],
      expl(DERIVEE, "on calcule $\\tan a$ et $\\tan' a$, puis on écrit $y = \\tan'(a)(x - a) + \\tan a$.", `$\\tan a = ${tA}$ et $\\tan' a = ${co}$.`, `l'équation est ${eq(co, moins, tA)}.`),
    );
  }),
  tpl(M2, 10, 3, "Dérive d tan x : la vitesse de la tache vaut d (1 + tan² x).", () => {
    const [xL, v] = un<[string, number]>([["0", 1], ["\\dfrac{\\pi}{4}", 2], ["\\dfrac{\\pi}{3}", 4], ["\\dfrac{\\pi}{6}", 4 / 3], ["-\\dfrac{\\pi}{4}", 2]]);
    const d = 3 * entre(1, 20);
    const r = d * v;
    return court(
      `${un(PROJETS)(d)}\n\n$h(x) = ${d}\\tan x$\n\nIci, $x$ est l'angle du faisceau ou de la visée, en radians. ${un(["Calcule la vitesse de variation de $h$ par rapport à l'angle, c'est-à-dire :", "Quelle est la valeur du taux de variation instantané :", "Que vaut le nombre dérivé :", "Donne le taux de variation, soit :"])}\n\n$h'\\left(${xL}\\right)$`,
      r,
      expl(DERIVEE, "on dérive $h$, puis on remplace $x$ par sa valeur.", `$h'(x) = ${d}\\left(1 + \\tan^2 x\\right)$.`, `le nombre dérivé vaut $${r}$.`),
    );
  }),
];
