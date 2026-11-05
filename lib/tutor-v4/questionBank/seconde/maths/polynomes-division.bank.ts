// POLYNÔMES : RACINE ET FACTEUR x - a, DIVISION EUCLIDIENNE, HORNER (05/11/2026). Hors programme français
// (registre `hors_france`). Lignes visées : Maroc TC I-4, Belgique S6 3.2.1c, Sénégal 2nde AN 7,
// Côte d'Ivoire 2nde C1-L2. Racines, quotients et restes sont tirés d'abord : tout tombe juste.
// Canvas `tableau_donnees` pour Horner : les cases à trouver portent « ? », jamais leur valeur.

import type { CanvasFigure, TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { court, entre, expl, fabrique, qcm, un } from "../../lycee-commun";

const tpl = fabrique("seconde", "polynomes_division", "2de_");
const M1 = "poly_racine_factoriser";
const M2 = "poly_division";
const M3 = "poly_horner";

/* ───────────────── polynômes : coefficients du plus haut degré au plus bas ───────────────── */

const nz = (a: number, b: number) => {
  for (;;) {
    const v = entre(a, b);
    if (v) return v;
  }
};
const fois = (p: number[], q: number[]) => {
  const r = Array(p.length + q.length - 1).fill(0);
  p.forEach((a, i) => q.forEach((b, j) => (r[i + j] += a * b)));
  return r as number[];
};
const plusC = (p: number[], c: number) => p.map((v, i) => (i === p.length - 1 ? v + c : v));
const val = (p: number[], x: number) => p.reduce((s, c) => s * x + c, 0);
const puis = (d: number, v: string) => (d === 0 ? "" : d === 1 ? v : `${v}^${d}`);
/** Écrit le polynôme : « 2x^3 - x + 4 ». Un coefficient texte (« m ») reste tel quel. */
function P(co: (number | string)[], v = "x") {
  const d = co.length - 1;
  let s = "";
  co.forEach((c, i) => {
    if (c === 0) return;
    const e = d - i;
    const m = puis(e, v);
    if (typeof c === "string") {
      s += `${s ? " + " : ""}${c}${m}`;
      return;
    }
    const abs = Math.abs(c);
    const corps = `${abs === 1 && m ? "" : abs}${m}`;
    s += s ? ` ${c < 0 ? "-" : "+"} ${corps}` : `${c < 0 ? "-" : ""}${corps}`;
  });
  return s || "0";
}
/** x - a écrit proprement. */
const D1 = (a: number, v = "x") => `${v} ${a < 0 ? "+" : "-"} ${Math.abs(a)}`;
const pm = (x: number) => (x < 0 ? `(${x})` : String(x));
const signe = (k: number) => (k < 0 ? `- ${-k}` : `+ ${k}`);
const NOM = () => un(["P", "A", "B", "T"]);
/** Division par x - a : quotient, reste. */
function horner(co: number[], a: number) {
  const b: number[] = [];
  co.forEach((c, i) => b.push(i === 0 ? c : c + a * b[i - 1]));
  return { q: b.slice(0, -1), r: b[b.length - 1], b };
}
/** Un polynôme unitaire (ou de coefficient dominant dom) dont a est racine. */
function avecRacine(a: number, deg: 2 | 3, dom = 1) {
  const q = deg === 2 ? [dom, nz(-6, 6)] : [dom, entre(-5, 5), nz(-6, 6)];
  return fois([1, -a], q);
}
const racines = (l: number[]) => l.reduce((p, r) => fois(p, [1, -r]), [1]);
const produit = (l: number[]) => l.map((r) => `(${D1(r)})`).join("");

const DEF_R = "$a$ est une racine de $P$ si $P(a) = 0$. Alors, et seulement alors, $x - a$ est un facteur de $P$ : $P(x) = (x - a)Q(x)$.";
const DEF_V = "diviser $P$ par $D$, c'est écrire $P(x) = D(x)Q(x) + R(x)$, le degré de $R$ étant plus petit que celui de $D$. Pour $D(x) = x - a$, le reste est un nombre, et il vaut $P(a)$.";
const DEF_H = "le tableau de Horner divise par $x - a$ : on écrit tous les coefficients (un $0$ pour un terme absent), on abaisse le premier, puis chaque case vaut le coefficient au-dessus plus $a$ fois la case précédente. La dernière case est le reste, les autres sont les coefficients du quotient.";

/* ───────────────── tableau de Horner ───────────────── */

const ENT = (d: number) => Array.from({ length: d + 1 }, (_, i) => { const e = d - i; return e === 0 ? "1" : e === 1 ? "x" : e === 2 ? "x²" : e === 3 ? "x³" : "x⁴"; });
/** montres = combien de cases du résultat sont écrites ; la suivante porte « ? ». */
function tableau(co: (number | string)[], a: number, b: number[], montres: number, opt: { tout?: boolean; rien?: boolean } = {}): CanvasFigure {
  const bas = b.map((v, i) => (opt.tout || i < montres ? v : i === montres && !opt.rien ? "?" : ""));
  const milieu = b.map((_, i) => (i === 0 ? "" : opt.tout || i < montres ? a * b[i - 1] : ""));
  return {
    kind: "tableau_donnees",
    headers: ENT(co.length - 1),
    rows: [
      { label: "Coefficients", values: co },
      { label: `a = ${a}`, values: milieu },
      { label: "Résultat", values: bas },
    ],
    display: { compact: true, striped: false },
  } as CanvasFigure;
}
const QCMQ = (q: number[], r: number) => `$Q(x) = ${P(q)}$ et $R = ${r}$`;

/* ───────────────── tournures ───────────────── */

const Q_RESTE = (n: string, d: string) => [
  `Quel est le reste de la division de $${n}$ par $${d}$ ?`,
  `On divise $${n}$ par $${d}$. Que vaut le reste ?`,
  `Calcule le reste de la division de $${n}$ par $${d}$.`,
  `Dans la division de $${n}$ par $${d}$, combien vaut le reste ?`,
  `Donne le reste de la division de $${n}$ par $${d}$.`,
  `Sans poser la division de $${n}$ par $${d}$, trouve le reste.`,
];
const Q_QUOT = (n: string, d: string) => [
  `Quel est le quotient de la division de $${n}$ par $${d}$ ?`,
  `On divise $${n}$ par $${d}$. Quel est le quotient ?`,
  `Pose la division de $${n}$ par $${d}$ : quel quotient obtiens-tu ?`,
  `Dans la division de $${n}$ par $${d}$, quel polynôme est le quotient ?`,
  `Choisis le quotient de la division de $${n}$ par $${d}$.`,
  `Divise $${n}$ par $${d}$ : que vaut le quotient ?`,
];
const AIRES = [
  { s: "Une parcelle rectangulaire a pour aire", n: "A", a: "sa largeur", b: "sa longueur" },
  { s: "Un panneau solaire rectangulaire a pour aire", n: "A", a: "sa largeur", b: "sa longueur" },
  { s: "Le terrain de handball d'un gymnase, rectangulaire, a pour aire", n: "A", a: "sa largeur", b: "sa longueur" },
  { s: "Le bassin rectangulaire d'une piscine a pour surface", n: "S", a: "sa largeur", b: "sa longueur" },
  { s: "Un écran rectangulaire a pour aire", n: "A", a: "sa hauteur", b: "sa largeur" },
  { s: "Une fresque rectangulaire sur un mur a pour aire", n: "A", a: "sa hauteur", b: "sa largeur" },
  { s: "Le tapis rectangulaire d'un dojo a pour aire", n: "A", a: "sa largeur", b: "sa longueur" },
  { s: "Une voile rectangulaire de bateau a pour aire", n: "A", a: "sa hauteur", b: "sa largeur" },
  { s: "Une serre rectangulaire a pour surface au sol", n: "S", a: "sa largeur", b: "sa longueur" },
  { s: "Un plateau de jeu rectangulaire a pour aire", n: "A", a: "sa largeur", b: "sa longueur" },
];
type Vol = { d: string; n: string; v: string; q: string };
const VOLS: Vol[] = [
  { d: "Un dauphin saute hors de l'eau : son altitude au-dessus de la surface, en m, vaut", n: "h", v: "t", q: "il sort de l'eau" },
  { d: "Une sauterelle bondit : sa hauteur au-dessus du sol, en cm, vaut", n: "h", v: "t", q: "elle décolle" },
  { d: "Une balle rebondit puis retombe : sa hauteur, en dm, vaut", n: "h", v: "t", q: "elle quitte le sol" },
  { d: "Un jet de fontaine sort du bassin : la hauteur de l'eau, en dm, à la distance $x$, vaut", n: "h", v: "x", q: "il sort du bassin" },
  { d: "Une arche de pont repose sur deux points : sa hauteur, en m, à l'abscisse $x$, vaut", n: "h", v: "x", q: "elle quitte le sol" },
  { d: "Une biologiste suit une population : son écart à la normale vaut, au jour $t$,", n: "E", v: "t", q: "l'écart s'annule" },
  { d: "Une entreprise modélise son résultat, en milliers, pour $x$ centaines de pièces :", n: "R", v: "x", q: "le résultat s'annule" },
  { d: "Un plongeur saute d'un rocher vers le large : son altitude par rapport au bord, en m, vaut", n: "h", v: "t", q: "il quitte le bord" },
  { d: "Une ingénieure règle un capteur : l'écart à la consigne, au temps $t$, vaut", n: "E", v: "t", q: "l'écart s'annule" },
  { d: "Une baleine à bosse saute au large de La Réunion : son altitude au-dessus de la mer, en m, vaut", n: "h", v: "t", q: "elle sort de l'eau" },
  { d: "Un ballon lancé par une basketteuse quitte le sol, puis y revient : sa hauteur, en dm, vaut", n: "h", v: "t", q: "il quitte le sol" },
];
const CALCS = [
  "Une ingénieure programme le calcul d'une trajectoire.",
  "Un tableur doit calculer une formule de météo.",
  "Une calculatrice évalue un polynôme avec le moins de multiplications possible.",
  "Un robot de chantier calcule la position de son bras.",
  "Un logiciel de musique calcule une courbe de volume.",
  "Un jeu vidéo calcule la trajectoire d'un projectile.",
  "Une biologiste évalue un modèle de croissance.",
  "Un satellite calcule une correction de cap.",
];

/* ───────────────── banque ───────────────── */

export const polynomesDivisionBank: TutorBankItemV4[] = [
  /* ─────────────── poly_racine_factoriser ─────────────── */
  tpl(M1, 1, 1, "Remplace chaque x par le nombre, en commençant par les puissances.", () => {
    const n = NOM();
    const co = un([[1, nz(-6, 6), nz(-9, 9)], [1, entre(-4, 4), nz(-6, 6), nz(-9, 9)], [nz(2, 3), nz(-5, 5), nz(-9, 9)]]);
    const a = nz(-3, 3);
    const v = val(co, a);
    return court(
      `${un(["Soit", "On donne", "On considère", "Voici"])} $${n}(x) = ${P(co)}$. ${un([`Calcule $${n}(${a})$.`, `Que vaut $${n}(${a})$ ?`, `Donne la valeur de $${n}(${a})$.`, `Quelle est la valeur de $${n}(${a})$ ?`, `Combien vaut $${n}(${a})$ ?`, `Remplace $x$ par $${a}$ : que vaut $${n}(${a})$ ?`])}`,
      v,
      expl(DEF_R, "on remplace $x$ par le nombre.", `$${n}(${a}) = ${v}$.`, `$${n}(${a}) = ${v}$.`),
    );
  }),
  tpl(M1, 2, 1, "Teste chaque nombre : seule une racine donne 0.", () => {
    for (;;) {
      const n = NOM();
      const r = nz(-5, 5);
      const co = avecRacine(r, un([2, 3] as const));
      const faux = [-6, -5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6].filter((t) => val(co, t) !== 0);
      if (faux.length < 3) continue;
      return qcm(
        `${un(["Soit", "On donne", "On considère", "Voici"])} $${n}(x) = ${P(co)}$. ${un([`Parmi ces nombres, lequel est une racine de $${n}$ ?`, `Lequel de ces nombres annule $${n}$ ?`, `Quel nombre est une racine de $${n}$ ?`, `Pour quel nombre a-t-on $${n}(x) = 0$ ?`, `Choisis la racine de $${n}$.`, `Quelle valeur de $x$ annule $${n}(x)$ ?`])}`,
        `$${r}$`,
        faux.map((f) => `$${f}$`),
        expl(DEF_R, "on calcule $P$ en chaque nombre proposé.", `$${n}(${r}) = 0$.`, `$${r}$ est une racine.`),
      );
    }
  }),
  tpl(M1, 3, 1, "P(a) = 0 donne le facteur x - a : attention au signe.", () => {
    const n = NOM();
    const a = nz(-9, 9);
    return qcm(
      `${un([`Un polynôme $${n}$ vérifie $${n}(${a}) = 0$.`, `On sait que $${n}(${a}) = 0$.`, `Le polynôme $${n}$ est tel que $${n}(${a}) = 0$.`, `Pour un polynôme $${n}$, on a calculé $${n}(${a}) = 0$.`, `Le calcul donne $${n}(${a}) = 0$.`])} ${un([`Quel facteur $${n}(x)$ contient-il à coup sûr ?`, `Par quoi peut-on factoriser $${n}(x)$ ?`, `Quel facteur peut-on mettre en évidence dans $${n}(x)$ ?`, `Par quel binôme $${n}(x)$ est-il divisible ?`, `Quel est donc un facteur de $${n}(x)$ ?`, `Quel facteur apparaît dans $${n}(x)$ ?`])}`,
      `$${D1(a)}$`,
      [`$${D1(-a)}$`, `$${P([a, 0])}$`, `$${D1(a === -1 ? 1 : a + 1)}$`, `$x^2 ${signe(-a)}$`, `$${P([Math.abs(a) + 1, -a])}$`],
      expl(DEF_R, "si $P(a) = 0$, le facteur est $x - a$.", `ici $a = ${a}$.`, `$x - a$ s'écrit $${D1(a)}$.`),
    );
  }),
  tpl(M1, 4, 2, "Essaie d'abord 1, -1, 2, -2 : c'est une racine évidente si P donne 0.", () => {
    const n = NOM();
    const r = nz(-3, 3);
    const s = nz(-4, 4);
    const t = nz(-5, 5);
    const co = racines([r, s, t]);
    const toutes = [...new Set([r, s, t])];
    return court(
      `${un(["Soit", "On donne", "On considère", "Voici"])} $${n}(x) = ${P(co)}$. ${un([`Trouve une racine évidente de $${n}$.`, `Donne une racine entière de $${n}$.`, `Quel nombre entier annule $${n}$ ?`, `Cherche un entier $a$ tel que $${n}(a) = 0$ et donne-le.`, `Écris une racine évidente de $${n}$.`, `Essaie de petits entiers : lequel annule $${n}$ ?`])}`,
      r,
      expl(DEF_R, "on essaie $1$, $-1$, $2$, $-2$…", `$${n}(${r}) = 0$.`, `les racines entières sont : $${toutes.join("$, $")}$.`),
      undefined,
      toutes.filter((v) => v !== r).map(String),
    );
  }),
  tpl(M1, 5, 2, "Développe de tête : compare les coefficients avec ceux de P.", () => {
    const n = NOM();
    const a = nz(-5, 5);
    const deg = un([2, 3] as const);
    const c = nz(-6, 6);
    const b = nz(-5, 5);
    const lettre = deg === 2 ? "c" : un(["b", "c"]);
    const co = deg === 2 ? fois([1, -a], [1, c]) : fois([1, -a], [1, b, c]);
    const forme = deg === 2 ? `(${D1(a)})(x + c)` : `(${D1(a)})(x^2 + bx + c)`;
    const v = lettre === "c" ? c : b;
    return court(
      `${un(["Soit", "On donne", "On considère"])} $${n}(x) = ${P(co)}$. ${un([`Comme $${n}(${a}) = 0$, on peut écrire`, `Sachant que $${n}(${a}) = 0$, on écrit`, `On a $${n}(${a}) = 0$, donc on factorise :`, `$${n}(${a}) = 0$ permet d'écrire`])} $${n}(x) = ${forme}$. ${un([`Que vaut $${lettre}$ ?`, `Trouve $${lettre}$.`, `Détermine $${lettre}$.`, `Quelle est la valeur de $${lettre}$ ?`, `Donne $${lettre}$.`])}`,
      v,
      expl(DEF_R, "on identifie les coefficients, ou on pose la division.", deg === 2 ? `$${n}(x) = (${D1(a)})(${P([1, c])})$.` : `$${n}(x) = (${D1(a)})(${P([1, b, c])})$.`, `$${lettre} = ${v}$.`),
    );
  }),
  tpl(M1, 6, 2, "Remplace x par la racine : il reste une équation en m.", () => {
    const n = NOM();
    const a = nz(-4, 4);
    const s = nz(-6, 6);
    const co = fois([1, -a], [1, -s]);
    const cas = un([0, 1]);
    const ecrit = cas === 0 && co[1] !== 0 ? P([1, "m", co[2]]) : P([1, co[1], "m"]);
    const v = cas === 0 && co[1] !== 0 ? co[1] : co[2];
    return court(
      `${un(["Soit", "On donne", "On considère"])} $${n}(x) = ${ecrit}$, ${un(["et on sait que", "avec", "où"])} $${n}(${a}) = 0$. ${un(["Que vaut $m$ ?", "Trouve $m$.", "Détermine $m$.", "Quelle est la valeur de $m$ ?", "Calcule $m$.", "Pour quel nombre $m$ est-ce possible ?"])}`,
      v,
      expl(DEF_R, "on remplace $x$ par la racine, puis on résout.", `$${n}(${a}) = 0$ donne $m = ${v}$.`, `$m = ${v}$.`),
    );
  }),
  tpl(M1, 7, 3, "Mets le facteur connu de côté, puis factorise le trinôme qui reste.", () => {
    for (;;) {
      const n = NOM();
      const r = [nz(-4, 4), nz(-4, 4), nz(-5, 5)];
      const cle = (l: number[]) => [...l].sort((x, y) => x - y).join();
      const faux = [[-r[0], r[1], r[2]], [r[0], -r[1], r[2]], [r[0], r[1], -r[2]], [-r[0], -r[1], r[2]], [r[0], -r[1], -r[2]], [-r[0], r[1], -r[2]], [-r[0], -r[1], -r[2]]].filter((l) => cle(l) !== cle(r));
      const vus = new Map(faux.map((l) => [cle(l), l]));
      if (vus.size < 3) continue;
      return qcm(
        `${un(["Soit", "On donne", "On considère"])} $${n}(x) = ${P(racines(r))}$, ${un(["et on sait que", "avec", "où"])} $${n}(${r[0]}) = 0$. ${un([`Quelle est la factorisation complète de $${n}(x)$ ?`, `Factorise complètement $${n}(x)$.`, `Quelle écriture factorisée de $${n}(x)$ est juste ?`, `Écris $${n}(x)$ comme un produit de trois facteurs.`, `Choisis la bonne factorisation de $${n}(x)$.`])}`,
        `$${produit(r)}$`,
        [...vus.values()].map((l) => `$${produit(l)}$`),
        expl(DEF_R, "on divise par le facteur connu, puis on factorise le trinôme obtenu.", `$${n}(x) = (${D1(r[0])})(${P(racines(r.slice(1)))})$.`, `$${n}(x) = ${produit(r)}$.`),
      );
    }
  }),
  tpl(M1, 8, 3, "Un trinôme a deux racines : factorise avec celle qui est donnée.", () => {
    const c = un(VOLS);
    const a = entre(1, 4);
    const b = a + entre(1, 6);
    const k = un([-1, -1, -2, -3]);
    const co = fois([k], racines([a, b]));
    return court(
      `${c.d} $${c.n}(${c.v}) = ${P(co, c.v)}$. ${un([`Sachant que ${c.q} pour $${c.v} = ${a}$, pour quelle autre valeur de $${c.v}$ cette expression s'annule-t-elle ?`, `On a $${c.n}(${a}) = 0$ : quelle est l'autre valeur de $${c.v}$ qui annule $${c.n}$ ?`, `Comme $${c.n}(${a}) = 0$, factorise et donne l'autre racine.`, `$${a}$ est une racine de $${c.n}$ : quelle est l'autre ?`, `Sachant que $${c.n}(${a}) = 0$, trouve la seconde valeur de $${c.v}$ qui donne $0$.`])}`,
      b,
      expl(DEF_R, "on factorise par le facteur connu.", `$${c.n}(${c.v}) = ${k === -1 ? "-" : k}(${D1(a, c.v)})(${D1(b, c.v)})$.`, `l'autre valeur est $${b}$.`),
    );
  }),
  tpl(M1, 9, 3, "x - a est un facteur exactement quand P(a) = 0.", () => {
    for (;;) {
      const n = NOM();
      const a = nz(-3, 3);
      const co: (number | string)[] = avecRacine(a, 3);
      const k = un([1, 2, 3]);
      const v = co[k] as number;
      if (!v) continue;
      co[k] = "m";
      return court(
        `${un(["Soit", "On donne", "On considère"])} $${n}(x) = ${P(co)}$. ${un([`Pour quelle valeur de $m$ le binôme $${D1(a)}$ est-il un facteur de $${n}(x)$ ?`, `Quelle valeur de $m$ rend $${n}(x)$ factorisable par $${D1(a)}$ ?`, `Trouve $m$ pour que $${D1(a)}$ soit un facteur de $${n}(x)$.`, `Détermine $m$ pour que $${n}(x)$ soit divisible par $${D1(a)}$.`, `Pour quel nombre $m$ peut-on mettre $${D1(a)}$ en facteur dans $${n}(x)$ ?`])}`,
        v,
        expl(DEF_R, "le facteur $x - a$ existe si et seulement si $P(a) = 0$ : on résout cette équation en $m$.", `$${n}(${a}) = 0$ donne $m = ${v}$.`, `$m = ${v}$.`),
      );
    }
  }),

  /* ─────────────── poly_division ─────────────── */
  tpl(M2, 1, 1, "Le premier terme du quotient est x ; le second se trouve avec le coefficient de x.", () => {
    const n = NOM();
    const a = nz(-6, 6);
    const q = nz(-6, 6);
    const r = entre(-6, 6);
    const co = plusC(fois([1, -a], [1, q]), r);
    return qcm(
      `${un(["Soit", "On donne"])} $${n}(x) = ${P(co)}$. ${un(Q_QUOT(`${n}(x)`, D1(a)))}`,
      `$${P([1, q])}$`,
      [`$${P([1, -q])}$`, `$${P([1, q + 1])}$`, `$${P([1, q - 1])}$`, `$${P([2, q])}$`, `$${P([1, co[1]])}$`, `$${P([1, a])}$`].filter((c) => c !== `$${P([1, q])}$`),
      expl(DEF_V, "on écrit $P(x) = (x - a)(x + q) + r$ et on identifie.", `$${n}(x) = (${D1(a)})(${P([1, q])}) ${signe(r)}$.`, `le quotient est $${P([1, q])}$.`),
    );
  }),
  tpl(M2, 2, 1, "Le reste de la division par x - a vaut P(a).", () => {
    const n = NOM();
    const a = nz(-5, 5);
    const co = [1, nz(-7, 7), nz(-9, 9)];
    const v = val(co, a);
    return court(
      `${un(["Soit", "On donne", "On considère"])} $${n}(x) = ${P(co)}$. ${un(Q_RESTE(`${n}(x)`, D1(a)))}`,
      v,
      expl(DEF_V, "le reste vaut $P(a)$.", `$${n}(${a}) = ${v}$.`, `le reste est $${v}$.`),
    );
  }),
  tpl(M2, 3, 1, "Vérifie le reste par x = a, puis le signe dans le facteur.", () => {
    const n = NOM();
    const a = nz(-5, 5);
    const q = nz(-5, 5);
    const r = nz(-6, 6);
    const co = plusC(fois([1, -a], [1, q]), r);
    const E = (u: number, w: number, s: number) => `$(${D1(u)})(${P([1, w])}) ${signe(s)}$`;
    return qcm(
      `${un(["Soit", "On donne", "On considère"])} $${n}(x) = ${P(co)}$. ${un([`Quelle égalité traduit la division de $${n}(x)$ par $${D1(a)}$ ?`, `Comment s'écrit la division de $${n}(x)$ par $${D1(a)}$ ?`, `Quelle écriture de $${n}(x)$ montre le quotient et le reste de sa division par $${D1(a)}$ ?`, `Laquelle de ces écritures est égale à $${n}(x)$ ?`, `Choisis l'écriture juste de la division de $${n}(x)$ par $${D1(a)}$.`, `Quelle égalité, sans la développer, peut-on vérifier pour $${n}(x)$ et $${D1(a)}$ ?`])}`,
      E(a, q, r),
      [E(a, q, -r), E(-a, q, r), E(a, -q, r), E(a, q + 1, r), E(a, q, r + 1), E(a, q - 1, r)].filter((c) => !c.includes("(x)") && !c.endsWith("+ 0$")),
      expl(DEF_V, "on identifie le quotient, puis le reste.", `le reste vaut $${n}(${a}) = ${r}$.`, `$${n}(x) = (${D1(a)})(${P([1, q])}) ${signe(r)}$.`),
    );
  }),
  tpl(M2, 4, 2, "Pose la division, ou utilise le tableau : abaisse, multiplie par a, ajoute.", () => {
    const n = NOM();
    const a = nz(-4, 4);
    const q = [un([1, 1, 2]), nz(-5, 5), nz(-6, 6)];
    const r = entre(-6, 6);
    const co = plusC(fois([1, -a], q), r);
    const J = `$${P(q)}$`;
    return qcm(
      `${un(["Soit", "On donne"])} $${n}(x) = ${P(co)}$. ${un(Q_QUOT(`${n}(x)`, D1(a)))}`,
      J,
      [`$${P([q[0], -q[1], q[2]])}$`, `$${P([q[0], q[1], -q[2]])}$`, `$${P([q[0], q[1] + 1, q[2]])}$`, `$${P([q[0], q[1], q[2] + 1])}$`, `$${P([q[0], co[1], co[2]])}$`, `$${P([q[0], q[1], q[2] - 1])}$`].filter((c) => c !== J),
      expl(DEF_V, "on pose la division : à chaque étape, on abaisse, on multiplie, on soustrait.", `$${n}(x) = (${D1(a)})(${P(q)}) ${signe(r)}$.`, `le quotient est ${J}.`),
    );
  }),
  tpl(M2, 5, 2, "Le reste de la division par x - a vaut P(a) : pas besoin de poser.", () => {
    const n = NOM();
    const a = nz(-4, 4);
    const co = un([[1, entre(-5, 5), entre(-5, 5), nz(-9, 9)], [2, nz(-5, 5), entre(-5, 5), nz(-9, 9)], [1, 0, nz(-6, 6), nz(-9, 9)]]);
    const v = val(co, a);
    return court(
      `${un(["Soit", "On donne", "On considère"])} $${n}(x) = ${P(co)}$. ${un(Q_RESTE(`${n}(x)`, D1(a)))}`,
      v,
      expl(DEF_V, "le reste vaut $P(a)$.", `$${n}(${a}) = ${v}$.`, `le reste est $${v}$.`),
    );
  }),
  tpl(M2, 6, 2, "Écris l'égalité, développe et identifie le coefficient cherché.", () => {
    const n = NOM();
    const a = nz(-4, 4);
    const b = nz(-5, 5);
    const c = nz(-6, 6);
    const r = entre(-6, 6);
    const co = plusC(fois([1, -a], [1, b, c]), r);
    const l = un(["b", "c"]);
    const v = l === "b" ? b : c;
    return court(
      `${un(["Soit", "On donne", "On considère"])} $${n}(x) = ${P(co)}$. ${un(["Le quotient de sa division par", "En le divisant par", "Si on le divise par"])} $${D1(a)}$${un([", on obtient le quotient", ", le quotient s'écrit", ", on trouve comme quotient"])} $x^2 + bx + c$. ${un([`Que vaut $${l}$ ?`, `Trouve $${l}$.`, `Détermine $${l}$.`, `Quelle est la valeur de $${l}$ ?`, `Donne $${l}$.`])}`,
      v,
      expl(DEF_V, "on pose la division, ou on identifie les coefficients.", `le quotient est $${P([1, b, c])}$, le reste $${r}$.`, `$${l} = ${v}$.`),
    );
  }),
  tpl(M2, 7, 2, "Pour que le premier terme donne le bon coefficient de x², divise par celui de x.", () => {
    const n = NOM();
    const d = un([2, 3]);
    const b = nz(-5, 5);
    const q = nz(-6, 6);
    const r = entre(-5, 5);
    const co = plusC(fois([d, b], [1, q]), r);
    const J = `$${P([1, q])}$`;
    return qcm(
      `${un(["Soit", "On donne"])} $${n}(x) = ${P(co)}$. ${un(Q_QUOT(`${n}(x)`, P([d, b])))}`,
      J,
      [`$${P([d, q])}$`, `$${P([1, -q])}$`, `$${P([1, q + 1])}$`, `$${P([1, b])}$`, `$${P([d, b])}$`, `$${P([1, q - 1])}$`].filter((c) => c !== J),
      expl(DEF_V, "on écrit $P(x) = (dx + b)(x + q) + r$ et on identifie les coefficients.", `$${n}(x) = (${P([d, b])})(${P([1, q])}) ${signe(r)}$.`, `le quotient est ${J}.`),
    );
  }),
  tpl(M2, 8, 3, "Pose la division : premier terme x², puis on descend d'un degré à chaque étape.", () => {
    const n = NOM();
    const d = un([2, 3]);
    const b = nz(-5, 5);
    const q = [1, nz(-4, 4), nz(-5, 5)];
    const r = entre(-6, 6);
    const co = plusC(fois([d, b], q), r);
    const D = P([d, b]);
    return qcm(
      `${un(["Soit", "On donne", "On considère"])} $${n}(x) = ${P(co)}$. ${un([`On divise $${n}(x)$ par $${D}$. Quels sont le quotient $Q$ et le reste $R$ ?`, `Quels sont le quotient $Q$ et le reste $R$ de la division de $${n}(x)$ par $${D}$ ?`, `Pose la division de $${n}(x)$ par $${D}$ : que valent le quotient $Q$ et le reste $R$ ?`, `Dans la division de $${n}(x)$ par $${D}$, que valent le quotient $Q$ et le reste $R$ ?`, `Choisis le quotient $Q$ et le reste $R$ de la division de $${n}(x)$ par $${D}$.`])}`,
      QCMQ(q, r),
      [QCMQ([1, -q[1], q[2]], r), QCMQ([1, q[1], -q[2]], r), QCMQ(q, r + 1), QCMQ(q, -r - 1), QCMQ([1, q[1] + 1, q[2]], r), QCMQ([d, q[1], q[2]], r)],
      expl(DEF_V, "on pose la division étape par étape.", `$${n}(x) = (${D})(${P(q)}) ${signe(r)}$.`, `$Q(x) = ${P(q)}$ et $R = ${r}$.`),
    );
  }),
  tpl(M2, 9, 3, "Le reste vaut P(a) : écris P(a) en gardant m, puis résous.", () => {
    {
      const n = NOM();
      const a = nz(-3, 3);
      const co: (number | string)[] = [1, entre(-4, 4), entre(-5, 5), nz(-9, 9)];
      const k = un([1, 2, 3]);
      const m = nz(-6, 6);
      co[k] = m;
      const r = val(co as number[], a);
      co[k] = "m";
      return court(
        `${un(["Soit", "On donne", "On considère"])} $${n}(x) = ${P(co)}$. ${un([`Pour quelle valeur de $m$ le reste de sa division par $${D1(a)}$ est-il égal à $${r}$ ?`, `Trouve $m$ pour que le reste de sa division par $${D1(a)}$ soit égal à $${r}$.`, `Sa division par $${D1(a)}$ a un reste égal à $${r}$ : que vaut $m$ ?`, `Le reste de sa division par $${D1(a)}$ est égal à $${r}$. Détermine $m$.`, `Quelle valeur de $m$ rend le reste de sa division par $${D1(a)}$ égal à $${r}$ ?`])}`,
        m,
        expl(DEF_V, "le reste vaut $P(a)$ : on écrit $P(a) = r$ et on résout en $m$.", `$${n}(${a}) = ${r}$ donne $m = ${m}$.`, `$m = ${m}$.`),
      );
    }
  }),
  tpl(M2, 10, 3, "L'aire est le produit des deux côtés : divise l'aire par le côté connu.", () => {
    const c = un(AIRES);
    const s = entre(1, 6);
    const d = un([1, 2, 3]);
    const t = entre(1, 7);
    const co = fois([1, s], [d, t]);
    const J = `$${P([d, t])}$`;
    return qcm(
      `${c.s} $${c.n}(x) = ${P(co)}$, pour $x > 0$, et ${c.a} vaut $${P([1, s])}$. ${un([`Quelle expression donne ${c.b} ?`, `Que vaut ${c.b} ?`, `Exprime ${c.b} en fonction de $x$.`, `Par une division de polynômes, trouve ${c.b}.`, `Quelle est l'expression de ${c.b} ?`])}`,
      J,
      [`$${P([d, -t])}$`, `$${P([d, t + 1])}$`, `$${P([d + 1, t])}$`, `$${P([d, t + s])}$`, `$${P([1, s + t + 1])}$`, `$${P([d, s])}$`].filter((x) => x !== J),
      expl(DEF_V, "on divise l'aire par le côté connu ; le reste est nul.", `$${c.n}(x) = (${P([1, s])})(${P([d, t])})$.`, `${c.b} vaut ${J}.`),
    );
  }),

  /* ─────────────── poly_horner ─────────────── */
  tpl(M3, 1, 1, "Écris tous les coefficients, du plus haut degré au plus bas : 0 pour un terme absent.", () => {
    const n = NOM();
    const co = un([[1, 0, nz(-6, 6), nz(-9, 9)], [nz(1, 4), nz(-6, 6), 0, nz(-9, 9)], [1, 0, 0, nz(-9, 9)], [nz(1, 3), 0, nz(-6, 6), 0, nz(-9, 9)], [1, nz(-5, 5), 0, 0, nz(-9, 9)]]);
    const L = (l: number[]) => `$${l.join("\\,;")}$`;
    const sans = co.filter((c) => c !== 0);
    return qcm(
      `${un(["Soit", "On donne", "On considère"])} $${n}(x) = ${P(co)}$. ${un(["Pour le tableau de Horner, quelle ligne de coefficients écrit-on ?", "Quelle est la première ligne de son tableau de Horner ?", "Quels coefficients écrit-on en haut du tableau de Horner ?", "Quelle liste de coefficients place-t-on dans le tableau de Horner ?", "Choisis la ligne de coefficients de son tableau de Horner.", "Dans le tableau de Horner, quelle ligne du haut est juste ?", "Comment commence le tableau de Horner de ce polynôme ?"])}`,
      L(co),
      [L(sans), L([...co].reverse()), L(co.map((c, i) => (i === co.length - 1 ? -c : c))), L(co.map((c) => Math.abs(c))), L(co.map((c, i) => (i === 1 ? c + 1 : c)))],
      expl(DEF_H, "on suit les puissances une à une, sans en sauter.", `coefficients : ${L(co)}.`, `la ligne est ${L(co)}.`),
    );
  }),
  tpl(M3, 2, 1, "Pour diviser par x - a, on écrit a : le signe change.", () => {
    const n = NOM();
    const a = nz(-9, 9);
    const co = [1, nz(-6, 6), entre(-6, 6), nz(-9, 9)];
    return court(
      `${un(["Soit", "On donne", "On considère"])} $${n}(x) = ${P(co)}$. ${un([`On le divise par $${D1(a)}$ avec un tableau de Horner. Quel nombre $a$ met-on dans le tableau ?`, `Dans le tableau de Horner de sa division par $${D1(a)}$, quelle est la valeur de $a$ ?`, `Pour le diviser par $${D1(a)}$ par la méthode de Horner, par quel nombre multiplie-t-on à chaque étape ?`, `Quel nombre $a$ utilise-t-on pour le diviser par $${D1(a)}$ avec un tableau de Horner ?`, `On veut le diviser par $${D1(a)}$ : quel nombre $a$ écrit-on dans le tableau de Horner ?`, `Le tableau de Horner sert à le diviser par $${D1(a)}$. Que vaut $a$ ?`])}`,
      a,
      expl(DEF_H, "on écrit le diviseur sous la forme $x - a$.", `$${D1(a)} = x - (${a})$.`, `$a = ${a}$.`),
    );
  }),
  tpl(M3, 3, 1, "Multiplie la case précédente par a, ajoute le coefficient du dessus.", () => {
    const n = NOM();
    const a = nz(-4, 4);
    const co = un([[1, nz(-5, 5), entre(-5, 5), nz(-9, 9)], [nz(2, 3), nz(-5, 5), nz(-9, 9)], [1, nz(-6, 6), nz(-9, 9)]]);
    const { b } = horner(co, a);
    return court(
      `${un(["Soit", "On donne", "On considère"])} $${n}(x) = ${P(co)}$. ${un(["On a commencé son tableau de Horner.", "Voici le début de son tableau de Horner.", "Le tableau de Horner est commencé.", "On le divise avec ce tableau de Horner."])} ${un(["Quel nombre remplace le « ? » ?", "Que vaut la case marquée « ? » ?", "Quelle valeur va dans la case « ? » ?", "Par quel nombre remplacer le « ? » ?", "Complète : que vaut le « ? » ?"])}`,
      b[1],
      expl(DEF_H, "chaque case vaut le coefficient au-dessus plus $a$ fois la case précédente.", `$${co[1]} + ${pm(a)} \\times ${pm(b[0])} = ${b[1]}$.`, `la case vaut $${b[1]}$.`),
      tableau(co, a, b, 1),
    );
  }),
  tpl(M3, 4, 2, "Avance case par case jusqu'à la dernière : c'est le reste.", () => {
    const n = NOM();
    const a = nz(-3, 3);
    const co = [1, nz(-5, 5), entre(-5, 5), nz(-9, 9)];
    const { b, r } = horner(co, a);
    return court(
      `${un(["Soit", "On donne", "On considère"])} $${n}(x) = ${P(co)}$. ${un([`Avec ce tableau de Horner, on le divise par $${D1(a)}$.`, `On le divise par $${D1(a)}$ dans le tableau de Horner.`, `Le tableau de Horner sert à le diviser par $${D1(a)}$.`])} ${un(["Complète-le : quel est le reste ?", "Que vaut le reste, dans la dernière case ?", "Termine le tableau : combien vaut le reste ?", "Quelle valeur trouve-t-on dans la dernière case ?", "Donne le reste de cette division.", "Quel nombre obtient-on en bout de ligne ?"])}`,
      r,
      expl(DEF_H, "on remplit toute la ligne ; la dernière case est le reste.", `résultat : $${b.join("\\,;")}$.`, `le reste est $${r}$.`),
      tableau(co, a, b, 1, { rien: true }),
    );
  }),
  tpl(M3, 5, 2, "Les nombres de la dernière ligne sont les coefficients du quotient, sauf le dernier : le reste.", () => {
    const n = NOM();
    const a = nz(-3, 3);
    const co = un([[1, nz(-5, 5), entre(-5, 5), nz(-9, 9)], [2, nz(-5, 5), entre(-5, 5), nz(-9, 9)]]);
    const { q, r, b } = horner(co, a);
    return qcm(
      `${un(["Voici le tableau de Horner de la division de", "Ce tableau de Horner donne la division de", "Le tableau suivant divise"])} $${n}(x) = ${P(co)}$ par $${D1(a)}$. ${un(["Lis le quotient $Q$ et le reste $R$.", "Que valent le quotient $Q$ et le reste $R$ ?", "Quels sont le quotient $Q$ et le reste $R$ ?", "Quelle lecture de la dernière ligne est juste ?", "Traduis la dernière ligne : que valent $Q$ et $R$ ?"])}`,
      QCMQ(q, r),
      [QCMQ(b.slice(1), b[0]), QCMQ([q[0], -q[1], q[2]], r), QCMQ(q, -r - 1), QCMQ([0, ...q].slice(1).concat(r), 0), QCMQ([q[0], q[1], q[2] + 1], r), QCMQ(q, r + 1)],
      expl(DEF_H, "le quotient a un degré de moins que le polynôme ; la dernière case est le reste.", `dernière ligne : $${b.join("\\,;")}$.`, `$Q(x) = ${P(q)}$ et $R = ${r}$.`),
      tableau(co, a, b, 0, { tout: true }),
    );
  }),
  tpl(M3, 6, 2, "Remplis la ligne du résultat, puis écris le quotient avec un degré de moins.", () => {
    const n = NOM();
    const a = nz(-3, 3);
    const co = [1, nz(-5, 5), entre(-5, 5), nz(-9, 9)];
    const { q, r, b } = horner(co, a);
    const J = `$${P(q)}$`;
    return qcm(
      `${un(["Soit", "On donne", "On considère"])} $${n}(x) = ${P(co)}$. ${un([`Complète ce tableau de Horner pour le diviser par $${D1(a)}$ : quel est le quotient ?`, `Avec ce tableau de Horner, on le divise par $${D1(a)}$. Quel est le quotient ?`, `Termine le tableau de Horner de sa division par $${D1(a)}$. Quel quotient obtiens-tu ?`, `Par la méthode de Horner, quel est son quotient par $${D1(a)}$ ?`, `Le tableau sert à le diviser par $${D1(a)}$ : quel polynôme est le quotient ?`])}`,
      J,
      [`$${P([q[0], -q[1], q[2]])}$`, `$${P([q[0], q[1], -q[2]])}$`, `$${P([q[0], q[1] + 1, q[2]])}$`, `$${P([q[0], co[1], co[2]])}$`, `$${P([q[0], q[1], q[2] + 1])}$`, `$${P([1, 0, q[1], q[2]])}$`].filter((c) => c !== J),
      expl(DEF_H, "on remplit la ligne du résultat ; le quotient a un degré de moins.", `dernière ligne : $${b.join("\\,;")}$ ; le reste est $${r}$.`, `le quotient est ${J}.`),
      tableau(co, a, b, 1, { rien: true }),
    );
  }),
  tpl(M3, 7, 2, "Toujours le même geste : multiplie par a, ajoute le coefficient au-dessus.", () => {
    const n = NOM();
    const a = nz(-3, 3);
    const co = [nz(1, 3), nz(-5, 5), entre(-5, 5), nz(-9, 9)];
    const { b } = horner(co, a);
    const m = un([2, 3]);
    return court(
      `${un(["Soit", "On donne", "On considère"])} $${n}(x) = ${P(co)}$. ${un(["On a avancé dans son tableau de Horner.", "Son tableau de Horner est déjà bien rempli.", "Voici où en est son tableau de Horner.", "Son tableau de Horner est presque terminé."])} ${un(["Quel nombre remplace le « ? » ?", "Que vaut la case marquée « ? » ?", "Quelle valeur va dans la case « ? » ?", "Par quel nombre remplacer le « ? » ?", "Complète : que vaut le « ? » ?"])}`,
      b[m],
      expl(DEF_H, "chaque case vaut le coefficient au-dessus plus $a$ fois la case précédente.", `$${co[m]} + ${pm(a)} \\times ${pm(b[m - 1])} = ${b[m]}$.`, `la case vaut $${b[m]}$.`),
      tableau(co, a, b, m),
    );
  }),
  tpl(M3, 8, 3, "Degré 4 : cinq coefficients, quatre étapes, et la dernière case est le reste.", () => {
    const n = NOM();
    const a = un([-2, -1, 1, 2]);
    const co = [1, nz(-4, 4), entre(-4, 4), entre(-4, 4), nz(-9, 9)];
    const { b, r } = horner(co, a);
    return court(
      `${un(["Soit", "On donne", "On considère"])} $${n}(x) = ${P(co)}$. ${un([`Avec ce tableau de Horner, on le divise par $${D1(a)}$.`, `On le divise par $${D1(a)}$ dans le tableau de Horner.`, `Le tableau de Horner sert à le diviser par $${D1(a)}$.`])} ${un(["Complète-le : quel est le reste ?", "Que vaut le reste, dans la dernière case ?", "Termine le tableau : combien vaut le reste ?", "Quelle valeur trouve-t-on dans la dernière case ?", "Donne le reste de cette division.", "Quel nombre obtient-on en bout de ligne ?"])}`,
      r,
      expl(DEF_H, "on remplit toute la ligne ; la dernière case est le reste.", `résultat : $${b.join("\\,;")}$.`, `le reste est $${r}$.`),
      tableau(co, a, b, 1, { rien: true }),
    );
  }),
  tpl(M3, 9, 3, "Le reste nul confirme le facteur ; la ligne du résultat donne l'autre facteur.", () => {
    const n = NOM();
    const a = nz(-4, 4);
    const co = avecRacine(a, 3);
    const { q, b } = horner(co, a);
    const J = `$(${D1(a)})(${P(q)})$`;
    return qcm(
      `${un(["Soit", "On donne", "On considère"])} $${n}(x) = ${P(co)}$, ${un(["et on sait que", "avec", "où"])} $${n}(${a}) = 0$. ${un([`À l'aide de ce tableau de Horner, factorise $${n}(x)$.`, `Quelle factorisation de $${n}(x)$ ce tableau de Horner donne-t-il ?`, `Termine ce tableau de Horner : quelle écriture de $${n}(x)$ obtiens-tu ?`, `Avec la méthode de Horner, écris $${n}(x)$ comme un produit.`, `Choisis la factorisation de $${n}(x)$ que donne ce tableau.`])}`,
      J,
      [`$(${D1(-a)})(${P(q)})$`, `$(${D1(a)})(${P([q[0], -q[1], q[2]])})$`, `$(${D1(a)})(${P([q[0], q[1], -q[2]])})$`, `$(${D1(a)})(${P([q[0], q[1] + 1, q[2]])})$`, `$(${D1(-a)})(${P([q[0], -q[1], q[2]])})$`].filter((c) => c !== J),
      expl(DEF_H, "le reste est nul : le polynôme vaut $(x - a)$ fois le quotient.", `dernière ligne : $${b.join("\\,;")}$.`, `$${n}(x) = (${D1(a)})(${P(q)})$.`),
      tableau(co, a, b, 1, { rien: true }),
    );
  }),
  tpl(M3, 10, 3, "Remonte le tableau : coefficient = case du résultat − a × case précédente.", () => {
    const a = nz(-3, 3);
    const co = [1, nz(-5, 5), nz(-5, 5), nz(-9, 9)];
    const { b } = horner(co, a);
    const k = un([1, 2, 3]);
    const haut: (number | string)[] = [...co];
    haut[k] = "?";
    return court(
      `${un(["Dans ce tableau de Horner, un coefficient du polynôme a été effacé.", "Ce tableau de Horner est complet, sauf un coefficient de la première ligne.", "Une tache cache un coefficient de ce tableau de Horner.", "On a perdu un coefficient dans ce tableau de Horner."])} ${un(["Quel nombre remplace le « ? » ?", "Retrouve le coefficient caché par le « ? ».", "Que vaut le « ? » ?", "En remontant le calcul, que vaut le « ? » ?", "Quel coefficient faut-il écrire à la place du « ? » ?"])}`,
      co[k],
      expl(DEF_H, "le résultat vaut le coefficient plus $a$ fois la case précédente : on retire ce produit.", `$${b[k]} - ${pm(a)} \\times ${pm(b[k - 1])} = ${co[k]}$.`, `le coefficient est $${co[k]}$.`),
      tableau(haut, a, b, 0, { tout: true }),
    );
  }),
  tpl(M3, 11, 3, "Le reste de Horner vaut P(a) : c'est le calcul le plus rapide de P(a).", () => {
    const n = NOM();
    const a = un([-3, -2, -1, 2, 3]);
    const co = [nz(1, 2), nz(-4, 4), entre(-4, 4), entre(-4, 4), nz(-9, 9)];
    const { b, r } = horner(co, a);
    return court(
      `${un(CALCS)} Il faut $${n}(${a})$, avec $${n}(x) = ${P(co)}$. ${un([`Par la méthode de Horner, que vaut $${n}(${a})$ ?`, `Avec ce tableau, calcule $${n}(${a})$.`, `Complète le tableau : que vaut $${n}(${a})$ ?`, `Quelle valeur de $${n}(${a})$ donne la dernière case ?`, `Combien vaut $${n}(${a})$ ?`])}`,
      r,
      expl(DEF_H, "le reste de la division par $x - a$ est $P(a)$.", `résultat : $${b.join("\\,;")}$.`, `$${n}(${a}) = ${r}$.`),
      tableau(co, a, b, 1, { rien: true }),
    );
  }),
];
