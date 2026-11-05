// EXPOSANTS FRACTIONNAIRES (05/11/2026). Hors programme français au-delà de a^(1/n)
// (registre `hors_france`). Lignes visées : Québec SNR 11f, OPR 14a, SNR 12, OPR 14b ;
// Maroc 2e bac A2-3 ; Suisse 11H MSN 32-h ; Sénégal Tle AN 5 ; Côte d'Ivoire Tle C1-L2 et C1-L6.
// Convention : a^(p/q) n'est défini que pour a positif (a > 0 si l'exposant est négatif).
// Toutes les valeurs tombent juste : la base est tirée comme une puissance parfaite.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { court, entre, expl, fabrique, fr, melange, nL, pgcd, qcm, un } from "../../lycee-commun";

const tpl = fabrique("terminale-spe", "exposants_fractionnaires", "tle_");

const M1 = "expo_ratio_racine";
const M2 = "expo_ratio_calcul";
const M3 = "expo_ratio_regles";

/* ───────────────── écritures ───────────────── */

type Fr = [number, number];
function red(p: number, q: number): Fr {
  const g = pgcd(p, q) || 1;
  const s = q < 0 ? -1 : 1;
  return [(s * p) / g, (s * q) / g];
}
const add = (a: Fr, b: Fr) => red(a[0] * b[1] + b[0] * a[1], a[1] * b[1]);
const sub = (a: Fr, b: Fr) => red(a[0] * b[1] - b[0] * a[1], a[1] * b[1]);
const mul = (a: Fr, b: Fr) => red(a[0] * b[0], a[1] * b[1]);

/** L'exposant en LaTeX : « \frac{2}{3} », « -\frac{1}{2} », « 3 ». */
function expT(p: number, q: number) {
  const [a, b] = red(p, q);
  if (b === 1) return String(a);
  return a < 0 ? `-\\frac{${-a}}{${b}}` : `\\frac{${a}}{${b}}`;
}
/** Une puissance : « x^{\frac{2}{3}} », « x », « 1 ». */
function pw(base: string, p: number, q = 1) {
  const [a, b] = red(p, q);
  if (a === 0) return "1";
  if (a === 1 && b === 1) return base;
  return `${base}^{${expT(a, b)}}`;
}
const pwF = (base: string, f: Fr) => pw(base, f[0], f[1]);
const rac = (n: number, x: string | number) => (n === 2 ? `\\sqrt{${x}}` : `\\sqrt[${n}]{${x}}`);
/** Une fraction réduite : « \dfrac{2}{3} », « -\dfrac{1}{2} », « 4 ». */
function fracL(p: number, q: number) {
  const [a, b] = red(p, q);
  if (b === 1) return String(a);
  return a < 0 ? `-\\dfrac{${-a}}{${b}}` : `\\dfrac{${a}}{${b}}`;
}
const par = (s: string) => `\\left(${s}\\right)`;

/** La réponse écrite à la française ; 1000 s'accepte aussi avec une espace. */
function rep(text: string, v: number, explication: string) {
  const r = fr(v);
  const autres = Number.isInteger(v) && Math.abs(v) >= 1000 ? [r.replace(/\B(?=(\d{3})+$)/g, " ")] : [];
  return court(text, r, explication, undefined, autres);
}

/* ───────────────── tirages à valeur juste ───────────────── */

const MAXK: Record<number, number> = { 2: 15, 3: 9, 4: 5, 5: 3 };
/** a = k^n : a^(1/n) = k. */
function parfait(ns: number[] = [2, 2, 3, 3, 3, 4, 4, 5]) {
  const n = un(ns);
  const k = entre(2, MAXK[n]);
  return { n, k, a: k ** n };
}
/** a = k^q : a^(p/q) = k^p, fraction p/q irréductible, p ≥ 2, résultat de taille humaine. */
function parfaitPQ() {
  for (;;) {
    const q = un([2, 2, 3, 3, 3, 4, 5]);
    const p = entre(2, 5);
    if (pgcd(p, q) !== 1) continue;
    const k = entre(2, MAXK[q]);
    const v = k ** p;
    if (v > 1000) continue;
    return { p, q, k, a: k ** q, v };
  }
}
const lettre = () => un(["x", "a", "t", "y", "u"]);

/** Une consigne : « @ » reçoit l'écriture mathématique. */
const dit = (formes: readonly string[], m: string) => un(formes).replace("@", () => `$${m}$`);

const F_CALC = [
  "Calcule @.",
  "Que vaut @ ?",
  "Quelle est la valeur de @ ?",
  "Sans calculatrice, calcule @.",
  "Donne la valeur exacte de @.",
  "Détermine la valeur de @.",
  "Écris @ sous la forme d'un seul nombre.",
  "Trouve la valeur de @ sans poser de calcul.",
  "Simplifie @ jusqu'à obtenir un nombre.",
  "Combien vaut @ ?",
  "À quel nombre @ est-il égal ?",
  "Réduis @ à un seul nombre.",
  "Exprime @ par un nombre, sans exposant ni racine.",
  "De tête, que donne @ ?",
];
const F_RACINE = [
  "Écris @ avec une racine.",
  "Quelle écriture avec une racine correspond à @ ?",
  "Parmi ces écritures, laquelle est égale à @ ?",
  "Comment s'écrit @ avec le symbole radical ?",
  "Réécris @ sans exposant fractionnaire.",
  "Quelle expression vaut @ ?",
  "Traduis @ en écriture avec une racine.",
  "Pour un nombre positif, à quoi est égal @ ?",
  "Remplace @ par une écriture avec une racine.",
  "Quelle autre écriture de @ est juste ?",
  "Choisis l'écriture égale à @.",
  "Quelle proposition a la même valeur que @ ?",
];
const F_PUISSANCE = [
  "Écris @ sous forme de puissance.",
  "Quelle puissance est égale à @ ?",
  "Parmi ces puissances, laquelle vaut @ ?",
  "Comment s'écrit @ avec un exposant ?",
  "Réécris @ avec un exposant fractionnaire.",
  "Quelle expression vaut @ ?",
  "Traduis @ en écriture avec un exposant.",
  "Pour un nombre positif, à quoi est égal @ ?",
  "Remplace @ par une puissance.",
  "Quelle écriture avec un exposant correspond à @ ?",
  "Choisis la puissance égale à @.",
  "Quelle proposition a la même valeur que @ ?",
];
const F_SIMPLIFIE = [
  "Simplifie @.",
  "Écris @ avec un seul exposant.",
  "Réduis @.",
  "À quoi est égal @ ?",
  "Quelle est la forme simplifiée de @ ?",
  "Donne une écriture plus simple de @.",
  "Parmi ces expressions, laquelle est égale à @ ?",
  "Pour un nombre strictement positif, que donne @ ?",
  "Applique les règles de calcul à @.",
  "Transforme @ en une seule puissance.",
  "Quelle écriture réduite correspond à @ ?",
  "Choisis la bonne simplification de @.",
];
const F_VRAI = [
  "Quelle égalité est vraie ?",
  "Parmi ces égalités, laquelle est juste ?",
  "Une seule de ces égalités est exacte. Laquelle ?",
  "Trois de ces égalités sont fausses. Quelle est la bonne ?",
  "Quelle est la seule égalité correcte ?",
  "Repère l'égalité exacte.",
  "Laquelle de ces écritures est juste ?",
  "Un élève a écrit ces égalités. Laquelle n'a pas d'erreur ?",
  "Sans calculatrice, trouve l'égalité vraie.",
  "Coche l'égalité qui est vraie.",
];
const F_SUPER = [
  "Lequel de ces nombres est @ ?",
  "Parmi ces quatre nombres, lequel est @ ?",
  "En comparant ces nombres, lequel est @ ?",
  "Calculatrice permise, quel nombre est @ ?",
  "À l'aide de valeurs approchées, repère le nombre @.",
  "Quel est @ de ces quatre nombres ?",
];
function eqForme(v: string) {
  return un([
    `Quel réel strictement positif $${v}$ vérifie @ ?`,
    `Résous @ pour $${v} > 0$.`,
    `Trouve le nombre positif $${v}$ tel que @.`,
    `Pour $${v} > 0$, on a @. Que vaut $${v}$ ?`,
    `Détermine $${v} > 0$ sachant que @.`,
    `Sachant que @ et que $${v} > 0$, donne $${v}$.`,
    `Un réel $${v} > 0$ vérifie @. Lequel ?`,
    `Résous dans $]0\\,;+\\infty[$ l'équation @.`,
    `Quelle est la solution strictement positive de @ ?`,
    `L'équation @ a une seule solution positive. Laquelle ?`,
  ]);
}
const eqTexte = (v: string, m: string) => eqForme(v).replace("@", () => `$${m}$`);
const FIN_CTX = (L: string) => un([`Calcule $${L}$.`, `Que vaut $${L}$ ?`, `Donne la valeur de $${L}$.`, `Quelle valeur obtient-on pour $${L}$ ?`]);

/* ───────────────── explications ───────────────── */

const ex1 = (calcul: string, conclusion: string) =>
  expl(
    "pour $a$ positif, $a^{\\frac{1}{n}}$ est la racine $n$-ième de $a$ : le nombre positif qui, élevé à la puissance $n$, redonne $a$.",
    "on cherche le nombre positif dont la puissance $n$-ième vaut $a$.",
    calcul,
    conclusion,
  );
const ex2 = (calcul: string, conclusion: string) =>
  expl(
    "pour $a$ positif, $a^{\\frac{p}{q}} = \\left(\\sqrt[q]{a}\\right)^{p} = \\sqrt[q]{a^{p}}$ : le dénominateur donne la racine, le numérateur la puissance.",
    "on prend d'abord la racine (les nombres restent petits), puis la puissance.",
    calcul,
    conclusion,
  );
const ex3 = (calcul: string, conclusion: string) =>
  expl(
    "pour $a > 0$ et $r$, $s$ rationnels : $a^{r} \\times a^{s} = a^{r+s}$, $\\dfrac{a^{r}}{a^{s}} = a^{r-s}$, $(a^{r})^{s} = a^{rs}$ et $a^{r} \\times b^{r} = (ab)^{r}$.",
    "on repère la règle, puis on calcule sur les exposants comme sur des fractions.",
    calcul,
    conclusion,
  );

/* ───────────────── nombres à comparer ───────────────── */

function valeursDistinctes(l: { m: string; v: number }[], n = 4) {
  const res: { m: string; v: number }[] = [];
  for (const c of melange(l)) {
    if (res.every((r) => Math.abs(r.v - c.v) > 0.03)) res.push(c);
    if (res.length === n) break;
  }
  return res;
}
function superlatif(l: { m: string; v: number }[], calcul: string, ex: (c: string, f: string) => string) {
  const pris = valeursDistinctes(l);
  const grand = Math.random() < 0.5;
  const tri = [...pris].sort((a, b) => a.v - b.v);
  const b = grand ? tri[3] : tri[0];
  const texte = un(F_SUPER).replace("@", grand ? "le plus grand" : "le plus petit");
  return qcm(
    texte,
    `$${b.m}$`,
    pris.filter((x) => x !== b).map((x) => `$${x.m}$`),
    ex(`${calcul} Valeurs approchées : ${tri.map((x) => `$${x.m} \\approx ${nL(Math.round(x.v * 100) / 100)}$`).join(", ")}.`, `Le nombre ${grand ? "le plus grand" : "le plus petit"} est $${b.m}$.`),
  );
}

/* ───────────────── contextes, formule écrite dans l'énoncé ───────────────── */

type Ctx = { L: string; t: string; f: string; sub: string; v: number };
const CTX_RACINE: (() => Ctx)[] = [
  () => {
    const k = entre(2, 9);
    return { L: "c", f: "c = V^{\\frac{1}{3}}", sub: `$V = ${k ** 3}$`, v: k, t: `Une cuve cubique a un volume $V = ${k ** 3}$ mètres cubes. Son arête mesure $c = V^{\\frac{1}{3}}$ mètres.` };
  },
  () => {
    const k = entre(1, 5);
    return { L: "T", f: "T = 2L^{\\frac{1}{2}}", sub: `$L = ${k * k}$`, v: 2 * k, t: `Un pendule de longueur $L = ${k * k}$ mètres a une période proche de $T = 2L^{\\frac{1}{2}}$ secondes.` };
  },
  () => {
    const k = entre(1, 5);
    const h = 5 * k * k;
    return { L: "v", f: "v = (20h)^{\\frac{1}{2}}", sub: `$h = ${h}$`, v: 10 * k, t: `Un objet lâché de $h = ${h}$ mètres arrive au sol à la vitesse $v = (20h)^{\\frac{1}{2}}$ mètres par seconde, sans frottement.` };
  },
  () => {
    const { n, k, a } = parfait([2, 3, 4]);
    return { L: "f", f: `f = N^{${expT(1, n)}}`, sub: `$N = ${a}$`, v: k, t: `Une culture de bactéries est multipliée par $N = ${a}$ en ${n} heures. Le facteur moyen par heure est $f = N^{${expT(1, n)}}$.` };
  },
  () => {
    const k = un([2, 5, 7, 10]);
    return { L: "d", f: "d = 3{,}6h^{\\frac{1}{2}}", sub: `$h = ${k * k}$`, v: 3.6 * k, t: `Depuis un phare de $h = ${k * k}$ mètres, on voit l'horizon à environ $d = 3{,}6h^{\\frac{1}{2}}$ kilomètres.` };
  },
  () => {
    const k = un([10, 20, 30]);
    return { L: "d", f: "d = 3{,}6h^{\\frac{1}{2}}", sub: `$h = ${k * k}$`, v: 3.6 * k, t: `Depuis un belvédère de La Réunion à $h = ${k * k}$ mètres au-dessus de l'océan, on voit l'horizon à environ $d = 3{,}6h^{\\frac{1}{2}}$ kilomètres.` };
  },
  () => {
    const k = entre(2, 5);
    return { L: "v", f: "v = 2{,}4L^{\\frac{1}{2}}", sub: `$L = ${k * k}$`, v: 2.4 * k, t: `Un voilier de $L = ${k * k}$ mètres atteint une vitesse de carène $v = 2{,}4L^{\\frac{1}{2}}$ nœuds.` };
  },
  () => {
    const [ecrit, v] = un<[string, number]>([["10", 10], ["40", 20], ["90", 30], ["160", 40], ["1\\,000", 100], ["4\\,000", 200]]);
    return { L: "v", f: "v = (10p)^{\\frac{1}{2}}", sub: `$p = ${ecrit}$`, v, t: `Au-dessus d'une profondeur de $p = ${ecrit}$ mètres, un tsunami avance à $v = (10p)^{\\frac{1}{2}}$ mètres par seconde.` };
  },
  () => {
    const k = entre(3, 15);
    return { L: "c", f: "c = A^{\\frac{1}{2}}", sub: `$A = ${k * k}$`, v: k, t: `Un potager carré a une aire $A = ${k * k}$ mètres carrés. Son côté mesure $c = A^{\\frac{1}{2}}$ mètres.` };
  },
];
const CTX_PQ: (() => Ctx)[] = [
  () => {
    const k = entre(2, 5);
    return { L: "T", f: "T = d^{\\frac{3}{2}}", sub: `$d = ${k * k}$`, v: k ** 3, t: `Selon la loi de Kepler, une planète située à $d = ${k * k}$ unités astronomiques du Soleil en fait le tour en $T = d^{\\frac{3}{2}}$ années.` };
  },
  () => {
    const k = entre(2, 5);
    return { L: "B", f: "B = 70m^{\\frac{3}{4}}", sub: `$m = ${k ** 4}$`, v: 70 * k ** 3, t: `Selon la loi de Kleiber, un animal de $m = ${k ** 4}$ kilogrammes dépense environ $B = 70m^{\\frac{3}{4}}$ kilocalories par jour.` };
  },
  () => {
    const k = entre(2, 6);
    return { L: "S", f: "S = 6V^{\\frac{2}{3}}", sub: `$V = ${k ** 3}$`, v: 6 * k * k, t: `Une boîte cubique de volume $V = ${k ** 3}$ centimètres cubes a une surface totale $S = 6V^{\\frac{2}{3}}$ centimètres carrés.` };
  },
  () => {
    const k = entre(2, 5);
    return { L: "Q", f: "Q = 2h^{\\frac{3}{2}}", sub: `$h = ${k * k}$`, v: 2 * k ** 3, t: `Le débit d'un déversoir, pour une lame d'eau de $h = ${k * k}$ décimètres, vaut $Q = 2h^{\\frac{3}{2}}$ litres par seconde.` };
  },
  () => {
    const k = entre(2, 4);
    return { L: "H", f: "H = 3D^{\\frac{2}{3}}", sub: `$D = ${k ** 3}$`, v: 3 * k * k, t: `Un modèle de forestier donne, pour un tronc de $D = ${k ** 3}$ centimètres de diamètre, une hauteur $H = 3D^{\\frac{2}{3}}$ mètres.` };
  },
  () => {
    const k = entre(2, 4);
    return { L: "P", f: "P = 10m^{\\frac{3}{4}}", sub: `$m = ${k ** 4}$`, v: 10 * k ** 3, t: `Une vétérinaire adapte un traitement à un animal de $m = ${k ** 4}$ kilogrammes : la dose est $P = 10m^{\\frac{3}{4}}$ milligrammes.` };
  },
  () => {
    const d = un([2, 4]);
    return { L: "E", f: "E = 10^{\\frac{3}{2}d}", sub: `$d = ${d}$`, v: 10 ** ((3 * d) / 2), t: `Quand la magnitude d'un séisme augmente de $d = ${d}$, l'énergie libérée est multipliée par $E = 10^{\\frac{3}{2}d}$.` };
  },
  () => {
    const k = entre(1, 3);
    return { L: "f", f: "f = 440 \\times 2^{\\frac{n}{12}}", sub: `$n = ${12 * k}$`, v: 440 * 2 ** k, t: `Sur un piano, la note située $n = ${12 * k}$ demi-tons au-dessus du la a pour fréquence $f = 440 \\times 2^{\\frac{n}{12}}$ hertz.` };
  },
  () => {
    const k = entre(1, 4);
    return { L: "M", f: "M = 80 \\times 2^{-\\frac{t}{5}}", sub: `$t = ${5 * k}$`, v: 80 / 2 ** k, t: `Une masse de $80$ grammes d'un isotope radioactif devient $M = 80 \\times 2^{-\\frac{t}{5}}$ grammes après $t = ${5 * k}$ années.` };
  },
];
function questionCtx(c: Ctx, ex: (a: string, b: string) => string) {
  const v = Math.round(c.v * 1e6) / 1e6;
  return rep(`${c.t} ${FIN_CTX(c.L)}`, v, ex(`On remplace : ${c.sub} dans $${c.f}$.`, `$${c.L} = ${nL(v)}$.`));
}

/* Contextes inverses : la formule, la grandeur mesurée, l'entrée à retrouver. */
type Inv = { t: string; L: string; v: number; f: string; mesure: string };
function inverse(): Inv {
  const cas: (() => Inv)[] = [
    () => {
      const k = un([2, 3, 4, 5]);
      return { L: "d", v: k * k, f: "T = d^{\\frac{3}{2}}", mesure: `T = ${k ** 3}`, t: `Selon la loi de Kepler, une planète à $d$ unités astronomiques du Soleil en fait le tour en $T = d^{\\frac{3}{2}}$ années. Une planète met $T = ${k ** 3}$ années.` };
    },
    () => {
      const k = un([2, 3, 4, 5, 6]);
      return { L: "V", v: k ** 3, f: "S = 6V^{\\frac{2}{3}}", mesure: `S = ${6 * k * k}`, t: `Une boîte cubique de volume $V$ a une surface totale $S = 6V^{\\frac{2}{3}}$ centimètres carrés. On mesure $S = ${6 * k * k}$.` };
    },
    () => {
      const k = un([2, 3, 4, 5]);
      return { L: "m", v: k ** 4, f: "B = 70m^{\\frac{3}{4}}", mesure: `B = ${70 * k ** 3}`, t: `Selon la loi de Kleiber, un animal de $m$ kilogrammes dépense $B = 70m^{\\frac{3}{4}}$ kilocalories par jour. On mesure $B = ${70 * k ** 3}$.` };
    },
    () => {
      const k = un([2, 3, 4, 5]);
      return { L: "h", v: k * k, f: "Q = 2h^{\\frac{3}{2}}", mesure: `Q = ${2 * k ** 3}`, t: `Le débit d'un déversoir, pour une lame d'eau de $h$ décimètres, vaut $Q = 2h^{\\frac{3}{2}}$ litres par seconde. On mesure $Q = ${2 * k ** 3}$.` };
    },
    () => {
      const k = un([2, 3, 4]);
      return { L: "D", v: k ** 3, f: "H = 3D^{\\frac{2}{3}}", mesure: `H = ${3 * k * k}`, t: `Un modèle de forestier donne, pour un tronc de $D$ centimètres de diamètre, une hauteur $H = 3D^{\\frac{2}{3}}$ mètres. Un arbre mesure $H = ${3 * k * k}$.` };
    },
    () => {
      const k = un([2, 3, 4]);
      return { L: "m", v: k ** 4, f: "P = 10m^{\\frac{3}{4}}", mesure: `P = ${10 * k ** 3}`, t: `Une vétérinaire calcule une dose $P = 10m^{\\frac{3}{4}}$ milligrammes pour un animal de $m$ kilogrammes. La dose prescrite est $P = ${10 * k ** 3}$.` };
    },
  ];
  return un(cas)();
}

const OBJETS_TAUX = [
  "le nombre d'abonnés d'une chaîne vidéo",
  "le prix d'un loyer",
  "la population d'une ville nouvelle",
  "un capital placé à la banque",
  "le nombre de voitures électriques vendues",
  "la production d'une ferme solaire",
  "le budget d'un club de handball",
  "le chiffre d'affaires d'une boulangerie",
  "le nombre de visiteurs d'un musée",
  "la surface d'une forêt replantée",
];
const TABLE_TAUX: [number, number, number][] = [
  [2, 1.21, 1.1], [2, 1.44, 1.2], [2, 1.69, 1.3], [2, 1.96, 1.4], [2, 2.25, 1.5], [2, 4, 2],
  [3, 1.331, 1.1], [3, 1.728, 1.2], [3, 2.197, 1.3], [3, 3.375, 1.5], [3, 8, 2],
  [4, 1.4641, 1.1], [4, 2.0736, 1.2], [4, 5.0625, 1.5], [4, 16, 2],
];
/* Lois d'échelle : Y proportionnel à X^r. */
type Ech = { t: (f: string, k: number) => string; r: Fr };
const ECHELLES: Ech[] = [
  { r: [2, 3], t: (f, k) => `La surface d'un animal est proportionnelle à $V^{${f}}$, où $V$ est son volume. Si le volume est multiplié par ${k}, par combien sa surface est-elle multipliée ?` },
  { r: [3, 4], t: (f, k) => `La dépense d'énergie d'un mammifère est proportionnelle à $m^{${f}}$, où $m$ est sa masse. Si la masse est multipliée par ${k}, par combien cette dépense est-elle multipliée ?` },
  { r: [3, 2], t: (f, k) => `La durée d'une orbite est proportionnelle à $d^{${f}}$, où $d$ est le rayon de l'orbite. Si le rayon est multiplié par ${k}, par combien la durée est-elle multipliée ?` },
  { r: [1, 2], t: (f, k) => `La période d'un pendule est proportionnelle à $L^{${f}}$, où $L$ est sa longueur. Si la longueur est multipliée par ${k}, par combien la période est-elle multipliée ?` },
  { r: [1, 2], t: (f, k) => `La vitesse d'une vague est proportionnelle à $p^{${f}}$, où $p$ est la profondeur. Si la profondeur est multipliée par ${k}, par combien la vitesse est-elle multipliée ?` },
  { r: [1, 3], t: (f, k) => `L'arête d'un cube est proportionnelle à $V^{${f}}$, où $V$ est son volume. Si le volume est multiplié par ${k}, par combien l'arête est-elle multipliée ?` },
  { r: [2, 3], t: (f, k) => `La quantité de carton d'un emballage cubique est proportionnelle à $V^{${f}}$, où $V$ est le volume. Si le volume est multiplié par ${k}, par combien la quantité de carton est-elle multipliée ?` },
  { r: [3, 2], t: (f, k) => `Le débit d'un déversoir est proportionnel à $h^{${f}}$, où $h$ est la hauteur d'eau. Si la hauteur est multipliée par ${k}, par combien le débit est-il multiplié ?` },
  { r: [3, 4], t: (f, k) => `La dose d'un médicament vétérinaire est proportionnelle à $m^{${f}}$, où $m$ est la masse de l'animal. Si la masse est multipliée par ${k}, par combien la dose est-elle multipliée ?` },
  { r: [1, 2], t: (f, k) => `La distance de l'horizon visible est proportionnelle à $h^{${f}}$, où $h$ est l'altitude. Si l'altitude est multipliée par ${k}, par combien la distance est-elle multipliée ?` },
  { r: [2, 3], t: (f, k) => `Le temps de cuisson d'un rôti est proportionnel à $m^{${f}}$, où $m$ est sa masse. Si la masse est multipliée par ${k}, par combien le temps de cuisson est-il multiplié ?` },
  { r: [1, 3], t: (f, k) => `La longueur d'un poisson est proportionnelle à $m^{${f}}$, où $m$ est sa masse. Si la masse est multipliée par ${k}, par combien la longueur est-elle multipliée ?` },
];

const CROISSANTE = "Strictement croissante";
const DECROISSANTE = "Strictement décroissante";
const CONSTANTE = "Constante";
const CHANGE = "Croissante puis décroissante";

const INDECIS = "On ne peut pas savoir sans calculatrice";

/* Fausses règles sur les exposants, toutes différentes de la vraie. */
function fauxExposants(juste: Fr, l: Fr[]) {
  const vus = new Set([`${juste[0]}/${juste[1]}`]);
  return l.filter((f) => {
    const k = `${f[0]}/${f[1]}`;
    if (vus.has(k) || f[0] === 0) return false;
    vus.add(k);
    return true;
  });
}
function deuxExposants(): [Fr, Fr] {
  for (;;) {
    const a = red(entre(1, 5), un([2, 3, 4, 5]));
    const b = red(entre(1, 5), un([2, 3, 4, 5, 6]));
    if (a[1] === 1 || b[1] === 1) continue;
    if (a[0] === b[0] && a[1] === b[1]) continue;
    return [a, b];
  }
}

export const exposantsFractionnairesBank: TutorBankItemV4[] = [
  /* ===== expo_ratio_racine ===== */
  tpl(M1, 1, 1, "Cherche le nombre positif qui, élevé à cette puissance, redonne la base.", () => {
    const { n, k, a } = parfait();
    return rep(dit(F_CALC, pw(String(a), 1, n)), k, ex1(`$${k}^{${n}} = ${a}$.`, `$${pw(String(a), 1, n)} = ${k}$.`));
  }),
  tpl(M1, 2, 1, "L'exposant 1/n se lit « racine n-ième ».", () => {
    const n = un([2, 3, 4, 5, 6]);
    const b = lettre();
    const m = pw(b, 1, n);
    return qcm(
      dit(F_RACINE, m),
      `$${rac(n, b)}$`,
      [`$\\dfrac{${b}}{${n}}$`, `$${n}${b}$`, `$${b}^{${n}}$`, `$\\dfrac{1}{${b}^{${n}}}$`],
      ex1(`Le dénominateur de l'exposant, ici ${n}, donne l'indice de la racine.`, `$${m} = ${rac(n, b)}$.`),
    );
  }),
  tpl(M1, 3, 1, "La racine n-ième s'écrit avec l'exposant 1/n, pas avec n.", () => {
    const n = un([2, 3, 4, 5, 6]);
    const b = lettre();
    const m = rac(n, b);
    return qcm(
      dit(F_PUISSANCE, m),
      `$${pw(b, 1, n)}$`,
      [`$${b}^{${n}}$`, `$${b}^{-${n}}$`, `$${pw(b, 1, n + 1)}$`, `$\\dfrac{${b}}{${n}}$`],
      ex1(`La racine d'indice ${n} correspond à l'exposant $${expT(1, n)}$.`, `$${m} = ${pw(b, 1, n)}$.`),
    );
  }),
  tpl(M1, 4, 1, "Essaie 2, 3, 4… à la puissance demandée, ou utilise a^(1/n).", () => {
    const { n, k, a } = parfait();
    const v = un(["x", "t", "y", "u"]);
    return rep(eqTexte(v, `${v}^{${n}} = ${a}`), k, ex1(`$${v} = ${pw(String(a), 1, n)}$ car $${k}^{${n}} = ${a}$.`, `$${v} = ${k}$.`));
  }),

  tpl(M1, 5, 2, "Calcule chaque puissance séparément, puis effectue l'opération.", () => {
    const [A, B] = [parfait([2, 2, 3]), parfait([2, 3, 3, 4])];
    const mA = pw(String(A.a), 1, A.n);
    const mB = pw(String(B.a), 1, B.n);
    const c = entre(2, 9);
    const racA = rac(A.n, A.a);
    const dA = `$${mA} = ${A.k}$`;
    const dB = `$${mB} = ${B.k}$`;
    const dAB = `${dA} et ${dB}`;
    const forme = un<[string, number, string]>([
      [`${mA} + ${mB}`, A.k + B.k, dAB],
      [`${mA} - ${mB}`, A.k - B.k, dAB],
      [`${mA} \\times ${mB}`, A.k * B.k, dAB],
      [`${c} \\times ${mA}`, c * A.k, dA],
      [`${racA} + ${mB}`, A.k + B.k, `$${racA} = ${A.k}$ et ${dB}`],
      [`${c} + ${mA}`, c + A.k, dA],
      [`${par(mB)}^{2}`, B.k ** 2, dB],
    ]);
    return rep(dit(F_CALC, forme[0]), forme[1], ex1(`${forme[2]}.`, `Le résultat est $${nL(forme[1])}$.`));
  }),
  tpl(M1, 6, 2, "Vérifie chaque égalité : la racine n-ième, élevée à la puissance n, redonne le nombre.", () => {
    const { n, k, a } = parfait();
    const m = pw(String(a), 1, n);
    const type = entre(0, 2);
    const faux = [
      `${m} = ${fracL(a, n)}`,
      `${m} = ${n * k}`,
      `${m} = ${k + 1}`,
      `${m} = ${2 * k}`,
      `${m} = ${a * n}`,
      `${m} = ${k - 1}`,
    ].filter((s) => {
      const d = s.split(" = ")[1];
      return d !== String(k);
    });
    const juste = type === 0 ? `${m} = ${k}` : type === 1 ? `${par(m)}^{${n}} = ${a}` : `${m} = ${rac(n, a)}`;
    return qcm(un(F_VRAI), `$${juste}$`, faux.map((s) => `$${s}$`), ex1(`$${k}^{${n}} = ${a}$, donc $${m} = ${k}$ et aucune division par ${n} n'intervient.`, `L'égalité vraie est $${juste}$.`));
  }),
  tpl(M1, 7, 2, "La racine d'un quotient est le quotient des racines.", () => {
    for (;;) {
      const n = un([2, 2, 3, 3, 4]);
      const c = entre(1, 5);
      const d = entre(2, 5);
      if (c === d || pgcd(c, d) !== 1) continue;
      const m = pw(par(`\\dfrac{${c ** n}}{${d ** n}}`), 1, n);
      return qcm(
        dit(F_CALC, m),
        `$${fracL(c, d)}$`,
        [fracL(d, c), fracL(c, d ** n), fracL(c ** n, d), fracL(c ** n, d ** n), fracL(2 * c, d), fracL(c, 2 * d)].map((s) => `$${s}$`),
        ex1(`$${c}^{${n}} = ${c ** n}$ et $${d}^{${n}} = ${d ** n}$ : on prend la racine en haut et en bas.`, `$${m} = ${fracL(c, d)}$.`),
      );
    }
  }),
  tpl(M1, 8, 2, "Un exposant fractionnaire s'applique à un nombre positif : une racine paire d'un négatif n'existe pas dans ℝ.", () => {
    const type = entre(0, 1);
    if (type === 0) {
      const q = un([2, 4]);
      const neg = un([4, 9, 16, 25, 36]);
      const m = pw(par(`-${neg}`), 1, q);
      return qcm(
        un([
          "Laquelle de ces écritures n'a pas de sens dans $\\mathbb{R}$ ?",
          "Une seule de ces écritures n'est pas définie dans $\\mathbb{R}$. Laquelle ?",
          "Quel nombre n'existe pas dans $\\mathbb{R}$ ?",
          "Repère l'écriture qui ne désigne aucun réel.",
          "Laquelle de ces puissances est impossible à calculer dans $\\mathbb{R}$ ?",
          "Parmi ces écritures, laquelle ne définit aucun nombre réel ?",
        ]),
        `$${m}$`,
        [`$${pw(String(neg), 1, q)}$`, `$${pw(String(entre(2, 9) ** 3), 1, 3)}$`, `$${pw("0", 1, 2)}$`, `$${pw(par("\\dfrac{1}{4}"), 1, 2)}$`, `$${pw(String(neg), -1, 2)}$`],
        ex1(`Aucun réel, élevé à la puissance ${q}, ne donne $-${neg}$ : une puissance paire est toujours positive.`, `$${m}$ n'est pas défini.`),
      );
    }
    const neg = Math.random() < 0.5;
    const n = un([2, 3, 4, 5, 6]);
    const v = lettre();
    const f = neg ? pw(v, -1, n) : pw(v, 1, n);
    const juste = neg ? "]0\\,;+\\infty[" : "[0\\,;+\\infty[";
    return qcm(
      un([
        `Quel est l'ensemble de définition de $${v} \\mapsto ${f}$ ?`,
        `Pour quelles valeurs de $${v}$ peut-on calculer $${f}$ ?`,
        `Sur quel ensemble la fonction $${v} \\mapsto ${f}$ est-elle définie ?`,
        `Donne l'ensemble de définition de la fonction $${v} \\mapsto ${f}$.`,
        `Où la fonction $${v} \\mapsto ${f}$ est-elle définie ?`,
        `Quelles valeurs de $${v}$ conviennent pour écrire $${f}$ ?`,
      ]),
      `$${juste}$`,
      ["\\mathbb{R}", "[0\\,;+\\infty[", "]0\\,;+\\infty[", "\\mathbb{R}\\setminus\\{0\\}", "]-\\infty\\,;0]"].map((s) => `$${s}$`),
      ex1(neg ? `Un exposant négatif demande de diviser : la base ne peut pas être nulle, et elle doit être positive.` : `L'exposant fractionnaire demande une base positive, et $0^{${expT(1, n)}} = 0$ existe.`, `L'ensemble de définition est $${juste}$.`),
    );
  }),

  tpl(M1, 9, 3, "Remplace la lettre par sa valeur, puis prends la racine.", () => questionCtx(un(CTX_RACINE)(), ex1)),
  tpl(M1, 10, 3, "Isole d'abord la puissance, puis prends la racine n-ième.", () => {
    const { n, k, a } = parfait([2, 3, 3, 4]);
    const v = un(["x", "t", "y", "u"]);
    const c = entre(2, 6);
    const d = entre(2, 30);
    const forme = un<string>([`${c}${v}^{${n}} = ${c * a}`, `${v}^{${n}} + ${d} = ${a + d}`, `${c}${v}^{${n}} + ${d} = ${c * a + d}`, `\\dfrac{${v}^{${n}}}{${k}} = ${a / k}`, `${c}${v}^{${n}} - ${d} = ${c * a - d}`]);
    return rep(eqTexte(v, forme), k, ex1(`On isole : $${v}^{${n}} = ${a}$, donc $${v} = ${pw(String(a), 1, n)}$.`, `$${v} = ${k}$.`));
  }),
  tpl(M1, 11, 3, "Cherche une valeur approchée de chacun, ou élève-les à une même puissance.", () => {
    const l = [2, 3, 5, 6, 7, 10, 12, 15, 20].flatMap((a) => [2, 3, 4].map((n) => ({ m: pw(String(a), 1, n), v: a ** (1 / n) })));
    return superlatif(l, "On compare les valeurs.", ex1);
  }),
  tpl(M1, 12, 3, "Si le coefficient de chaque année est c, alors c à la puissance n vaut le coefficient total.", () => {
    const [n, C, c] = un(TABLE_TAUX);
    const objet = un(OBJETS_TAUX);
    const Maj = objet.charAt(0).toUpperCase() + objet.slice(1);
    const texte = un([
      `En ${n} ans, ${objet} passe à ${fr(C)} fois sa valeur de départ. Quel est le coefficient multiplicateur moyen par an ?`,
      `${Maj} atteint ${fr(C)} fois sa valeur de départ en ${n} ans. Quel coefficient moyen par an cela représente-t-il ?`,
      `En ${n} ans, ${objet} passe à ${fr(C)} fois sa valeur de départ. Calcule le coefficient multiplicateur moyen par an.`,
    ]);
    return rep(texte, c, ex1(`Coefficient moyen : $${pw(par(nL(C)), 1, n)}$, car $${nL(c)}^{${n}} = ${nL(C)}$.`, `Le coefficient moyen est $${nL(c)}$ par an.`));
  }),

  /* ===== expo_ratio_calcul ===== */
  tpl(M2, 1, 1, "Le dénominateur donne la racine, le numérateur la puissance.", () => {
    const { p, q, k, a, v } = parfaitPQ();
    const m = pw(String(a), p, q);
    return rep(dit(F_CALC, m), v, ex2(`$${rac(q, a)} = ${k}$, puis $${k}^{${p}} = ${v}$.`, `$${m} = ${v}$.`));
  }),
  tpl(M2, 2, 1, "a^(p/q) : racine d'indice q, puissance p.", () => {
    const { p, q } = parfaitPQ();
    const b = lettre();
    const m = pw(b, p, q);
    const juste = Math.random() < 0.5 ? `${par(rac(q, b))}^{${p}}` : rac(q, `${b}^{${p}}`);
    return qcm(
      dit(F_RACINE, m),
      `$${juste}$`,
      [rac(p, `${b}^{${q}}`), `${par(rac(p, b))}^{${q}}`, `\\dfrac{${p}${b}}{${q}}`, `\\dfrac{${b}^{${p}}}{${q}}`, `${p}${rac(q, b)}`].map((s) => `$${s}$`),
      ex2(`Le dénominateur ${q} donne la racine et le numérateur ${p} la puissance.`, `$${m} = ${juste}$.`),
    );
  }),
  tpl(M2, 3, 1, "L'exposant sous la racine va en haut, l'indice de la racine en bas.", () => {
    const { p, q } = parfaitPQ();
    const b = lettre();
    const m = Math.random() < 0.5 ? rac(q, `${b}^{${p}}`) : `${par(rac(q, b))}^{${p}}`;
    return qcm(
      dit(F_PUISSANCE, m),
      `$${pw(b, p, q)}$`,
      [pw(b, q, p), `${b}^{${p * q}}`, `${b}^{${p + q}}`, `${p}${pw(b, 1, q)}`, `\\dfrac{${p}}{${q}}${b}`].map((s) => `$${s}$`),
      ex2(`Indice ${q}, puissance ${p} : l'exposant est $${expT(p, q)}$.`, `$${m} = ${pw(b, p, q)}$.`),
    );
  }),
  tpl(M2, 4, 1, "Prends la racine d'abord : les nombres restent petits.", () => {
    const { p, q, k, a, v } = parfaitPQ();
    const m = Math.random() < 0.5 ? `${par(rac(q, a))}^{${p}}` : rac(q, `${a}^{${p}}`);
    return rep(dit(F_CALC, m), v, ex2(`$${rac(q, a)} = ${k}$, et $${k}^{${p}} = ${v}$.`, `$${m} = ${v}$.`));
  }),

  tpl(M2, 5, 2, "Un exposant négatif, c'est l'inverse : calcule d'abord avec l'exposant positif.", () => {
    for (;;) {
      const k = un([2, 4, 5, 10]);
      const q = un([2, 3]);
      const p = entre(1, 3);
      if (pgcd(p, q) !== 1) continue;
      const a = k ** q;
      if (a > 1000) continue;
      const P = k ** p;
      const m = pw(String(a), -p, q);
      return court(dit(F_CALC, m), fr(1 / P), ex2(`$${pw(String(a), p, q)} = ${P}$, et l'exposant négatif donne l'inverse : $\\dfrac{1}{${P}}$.`, `$${m} = ${nL(1 / P)}$.`), undefined, [`1/${P}`]);
    }
  }),
  tpl(M2, 6, 2, "Racine en haut et en bas, puis puissance en haut et en bas.", () => {
    for (;;) {
      const q = un([2, 3]);
      const p = un([2, 3, -1, -2]);
      if (pgcd(p, q) !== 1) continue;
      const c = entre(1, 5);
      const d = entre(2, 5);
      if (c === d || pgcd(c, d) !== 1) continue;
      const m = pw(par(`\\dfrac{${c ** q}}{${d ** q}}`), p, q);
      const jp = p > 0 ? c ** p : d ** -p;
      const jq = p > 0 ? d ** p : c ** -p;
      const juste = fracL(jp, jq);
      return qcm(
        dit(F_CALC, m),
        `$${juste}$`,
        [fracL(jq, jp), fracL(c, d), fracL(d, c), fracL(2 * c, 3 * d), fracL(c ** q, d ** q), fracL(c * Math.abs(p), d * q), fracL(jp + 1, jq)].filter((s) => s !== juste).map((s) => `$${s}$`),
        ex2(`Racine : $${fracL(c, d)}$.${p < 0 ? " L'exposant négatif retourne la fraction." : ""}${Math.abs(p) > 1 ? ` Puissance ${Math.abs(p)} en haut et en bas.` : ""}`, `$${m} = ${juste}$.`),
      );
    }
  }),
  tpl(M2, 7, 2, "Écris le nombre décimal comme une puissance parfaite : 0,04 = 0,2².", () => {
    const [b, p, q] = un<[number, number, number]>([
      [0.25, 1, 2], [0.04, 3, 2], [0.09, 3, 2], [0.16, 1, 2], [0.008, 2, 3], [0.027, 2, 3], [0.0016, 3, 4], [0.01, 3, 2], [0.36, 3, 2], [1.44, 1, 2], [1.21, 3, 2], [2.25, 3, 2], [0.125, 2, 3], [0.064, 2, 3], [0.81, 3, 2], [1.69, 1, 2],
    ]);
    const m = pw(par(nL(b)), p, q);
    const v = Math.round(b ** (p / q) * 1e6) / 1e6;
    const racine = Math.round(b ** (1 / q) * 1e6) / 1e6;
    return rep(dit(F_CALC, m), v, ex2(p === 1 ? `$${rac(q, nL(b))} = ${nL(racine)}$.` : `$${rac(q, nL(b))} = ${nL(racine)}$, puis $${nL(racine)}^{${p}} = ${nL(v)}$.`, `$${m} = ${nL(v)}$.`));
  }),
  tpl(M2, 8, 2, "Calcule chaque puissance à part, puis effectue l'opération.", () => {
    const A = parfaitPQ();
    const B = parfaitPQ();
    const mA = pw(String(A.a), A.p, A.q);
    const mB = pw(String(B.a), B.p, B.q);
    const c = entre(2, 6);
    const small = parfait([2, 3]);
    const mS = pw(String(small.a), 1, small.n);
    const dA = `$${mA} = ${A.v}$`;
    const dAB = `${dA} et $${mB} = ${B.v}$`;
    const dAS = `${dA} et $${mS} = ${small.k}$`;
    const forme = un<[string, number, string]>([
      [`${mA} + ${mB}`, A.v + B.v, dAB],
      [`${mA} - ${mB}`, A.v - B.v, dAB],
      [`${c} \\times ${mA}`, c * A.v, dA],
      [`${mA} + ${mS}`, A.v + small.k, dAS],
      [`${mA} - ${c}`, A.v - c, dA],
      [`${mS} \\times ${mA}`, small.k * A.v, dAS],
      [`\\dfrac{${mA}}{2}`, A.v / 2, dA],
    ]);
    return rep(dit(F_CALC, forme[0]), forme[1], ex2(`${forme[2]}.`, `Le résultat est $${nL(forme[1])}$.`));
  }),
  tpl(M2, 9, 2, "Attention : a^(p/q) n'est pas a × p ÷ q.", () => {
    const { p, q, k, a, v } = parfaitPQ();
    const m = pw(String(a), p, q);
    const faux = [fracL(a * p, q), String(k * p), String(v + k), String(a * p), String(k + p), String(v * 2), String(a ** 2 > 2000 ? a + p : a ** 2)].filter((s) => s !== String(v));
    return qcm(un(F_VRAI), `$${m} = ${v}$`, faux.map((s) => `$${m} = ${s}$`), ex2(`$${rac(q, a)} = ${k}$, puis $${k}^{${p}} = ${v}$.`, `L'égalité vraie est $${m} = ${v}$.`));
  }),

  tpl(M2, 10, 3, "Remplace la lettre par sa valeur : racine d'abord, puissance ensuite.", () => questionCtx(un(CTX_PQ)(), ex2)),
  tpl(M2, 11, 3, "Isole la puissance, puis élève à l'exposant inverse : x^(p/q) = b donne x = b^(q/p).", () => {
    for (;;) {
      const { p, q, k, a, v } = parfaitPQ();
      if (v > 200) continue;
      const u = un(["x", "t", "y", "u"]);
      const c = entre(2, 6);
      const d = entre(2, 30);
      const mx = pw(u, p, q);
      const forme = un<string>([`${mx} = ${v}`, `${c}${mx} = ${c * v}`, `${mx} + ${d} = ${v + d}`, `${c}${mx} - ${d} = ${c * v - d}`, `${mx} - ${d} = ${v - d}`]);
      return rep(eqTexte(u, forme), a, ex2(`On isole : $${mx} = ${v}$. Comme $${v} = ${k}^{${p}}$, on a $${rac(q, u)} = ${k}$.`, `$${u} = ${k}^{${q}} = ${a}$.`));
    }
  }),
  tpl(M2, 12, 3, "Remplace la grandeur mesurée, isole la puissance, puis trouve la lettre.", () => {
    const c = inverse();
    return rep(`${c.t} ${un([`Que vaut $${c.L}$ ?`, `Calcule $${c.L}$.`, `Quelle valeur de $${c.L}$ correspond à cette mesure ?`, `Retrouve $${c.L}$.`])}`, c.v, ex2(`Dans $${c.f}$, on remplace par $${c.mesure}$, puis on isole $${c.L}$.`, `$${c.L} = ${c.v}$.`));
  }),
  tpl(M2, 13, 3, "Pour une même base supérieure à 1, le plus grand exposant donne le plus grand nombre.", () => {
    const l = [2, 3, 5, 6, 8, 10].flatMap((a) =>
      ([[2, 3], [3, 4], [3, 2], [4, 3], [5, 2], [2, 5], [5, 3], [3, 5]] as Fr[]).map(([p, q]) => ({ m: pw(String(a), p, q), v: a ** (p / q) })),
    );
    return superlatif(l, "On compare les valeurs.", ex2);
  }),

  /* ===== expo_ratio_regles ===== */
  tpl(M3, 1, 1, "Même base, produit : on additionne les exposants.", () => {
    const [a, b] = deuxExposants();
    const x = lettre();
    const j = add(a, b);
    const m = `${pwF(x, a)} \\times ${pwF(x, b)}`;
    const faux = fauxExposants(j, [mul(a, b), red(a[0] + b[0], a[1] + b[1]), sub(a, b), sub(b, a), add(j, [1, 1]), mul(j, [2, 1])]);
    return qcm(dit(F_SIMPLIFIE, m), `$${pwF(x, j)}$`, faux.map((f) => `$${pwF(x, f)}$`), ex3(`$${expT(a[0], a[1])} + ${expT(b[0], b[1])} = ${expT(j[0], j[1])}$.`, `$${m} = ${pwF(x, j)}$.`));
  }),
  tpl(M3, 2, 1, "Même base, quotient : on soustrait les exposants.", () => {
    const [a, b] = deuxExposants();
    const x = lettre();
    const j = sub(a, b);
    const m = `\\dfrac{${pwF(x, a)}}{${pwF(x, b)}}`;
    const faux = fauxExposants(j, [add(a, b), sub(b, a), red(a[0] * b[1], a[1] * b[0]), mul(a, b), red(a[0] - b[0], a[1] + b[1]), add(j, [1, 1])]);
    return qcm(dit(F_SIMPLIFIE, m), `$${pwF(x, j)}$`, faux.map((f) => `$${pwF(x, f)}$`), ex3(`$${expT(a[0], a[1])} - ${expT(b[0], b[1])} = ${expT(j[0], j[1])}$.`, `$${m} = ${pwF(x, j)}$.`));
  }),
  tpl(M3, 3, 1, "Puissance d'une puissance : on multiplie les exposants.", () => {
    const [a, b] = deuxExposants();
    const x = lettre();
    const j = mul(a, b);
    const m = `${par(pwF(x, a))}^{${expT(b[0], b[1])}}`;
    const faux = fauxExposants(j, [add(a, b), sub(a, b), red(a[0] * b[1], a[1] * b[0]), red(a[0] + b[0], a[1] + b[1]), mul(j, [2, 1]), add(j, [1, 1])]);
    return qcm(dit(F_SIMPLIFIE, m), `$${pwF(x, j)}$`, faux.map((f) => `$${pwF(x, f)}$`), ex3(`$${expT(a[0], a[1])} \\times ${expT(b[0], b[1])} = ${expT(j[0], j[1])}$.`, `$${m} = ${pwF(x, j)}$.`));
  }),
  tpl(M3, 4, 1, "Applique la règle sur les exposants : ils tombent sur un entier.", () => {
    for (;;) {
      const b = un([2, 3, 5, 6, 7, 10]);
      const q = un([2, 3, 4, 5]);
      const r = entre(1, q - 1);
      const s = q * entre(1, 2) - r;
      if (s <= 0) continue;
      const total = (r + s) / q;
      if (b ** total > 1000) continue;
      const forme = entre(0, 2);
      if (forme === 0) {
        const m = `${pw(String(b), r, q)} \\times ${pw(String(b), s, q)}`;
        return rep(dit(F_CALC, m), b ** total, ex3(`$${expT(r, q)} + ${expT(s, q)} = ${total}$.`, `$${m} = ${b ** total}$.`));
      }
      if (forme === 1) {
        const m = `\\dfrac{${pw(String(b), r + q * total, q)}}{${pw(String(b), r, q)}}`;
        return rep(dit(F_CALC, m), b ** total, ex3(`$${expT(r + q * total, q)} - ${expT(r, q)} = ${total}$.`, `$${m} = ${b ** total}$.`));
      }
      const m = `${par(pw(String(b), 1, q))}^{${q}}`;
      return rep(dit(F_CALC, m), b, ex3(`$${expT(1, q)} \\times ${q} = 1$.`, `$${m} = ${b}$.`));
    }
  }),

  tpl(M3, 5, 2, "Écris chaque racine avec un exposant, puis applique les règles.", () => {
    const x = lettre();
    const n = un([4, 5, 7]);
    const p = un([2, 3]);
    const forme = un<[string, Fr]>([
      [`\\sqrt{${x}} \\times ${rac(n, x)}`, add([1, 2], [1, n])],
      [`\\dfrac{\\sqrt{${x}}}{${rac(n, x)}}`, sub([1, 2], [1, n])],
      [`${rac(n, `${x}^{${p}}`)} \\times \\sqrt{${x}}`, add(red(p, n), [1, 2])],
      [`\\sqrt{${rac(n, x)}}`, red(1, 2 * n)],
      [`${x} \\times ${rac(n, x)}`, add([1, 1], [1, n])],
      [`\\dfrac{${x}}{${rac(n, x)}}`, sub([1, 1], [1, n])],
      [`\\dfrac{${rac(n, `${x}^{${p}}`)}}{${x}}`, sub(red(p, n), [1, 1])],
    ]);
    const j = forme[1];
    const faux = fauxExposants(j, [add(j, [1, 1]), mul(j, [2, 1]), mul(j, [-1, 1]), red(j[1], j[0]), add(j, [1, 2]), sub(j, [1, 2])]);
    return qcm(dit(F_SIMPLIFIE, forme[0]), `$${pwF(x, j)}$`, faux.map((f) => `$${pwF(x, f)}$`), ex3(`On écrit chaque racine avec un exposant fractionnaire, puis on calcule l'exposant : $${expT(j[0], j[1])}$.`, `L'expression vaut $${pwF(x, j)}$.`));
  }),
  tpl(M3, 6, 2, "Écris la base comme une puissance de l'autre : 8 = 2³.", () => {
    const [b, c, m] = un<[number, number, number]>([[4, 2, 2], [8, 2, 3], [16, 2, 4], [32, 2, 5], [9, 3, 2], [27, 3, 3], [81, 3, 4], [25, 5, 2], [125, 5, 3], [16, 4, 2], [64, 4, 3], [36, 6, 2], [100, 10, 2], [64, 8, 2]]);
    const v = un(["x", "t", "n"]);
    const [p, q] = red(entre(1, 5), un([2, 3, 4]));
    const type = entre(0, 2);
    const eg = type === 0 ? `${b}^{${v}} = ${c}^{\\square ${v}}` : type === 1 ? `${b}^{${expT(p, q)}} = ${c}^{\\square}` : `${par(`\\dfrac{1}{${b}}`)}^{${v}} = ${c}^{\\square ${v}}`;
    const r = type === 0 ? m : type === 1 ? (m * p) / q : -m;
    if (!Number.isInteger(r * 1000)) {
      // Exposant non décimal : on revient au cas entier.
      const e2 = `${b}^{${v}} = ${c}^{\\square ${v}}`;
      return rep(un([`Complète : $${e2}$.`, `Quel nombre remplace $\\square$ dans $${e2}$ ?`, `Trouve le nombre manquant : $${e2}$.`]), m, ex3(`$${b} = ${c}^{${m}}$, donc $${b}^{${v}} = (${c}^{${m}})^{${v}} = ${c}^{${m}${v}}$.`, `Le nombre manquant est $${m}$.`));
    }
    const texte = un([
      `Complète : $${eg}$.`,
      `Quel nombre remplace $\\square$ dans $${eg}$ ?`,
      `Trouve le nombre manquant : $${eg}$.`,
      `Change de base pour compléter $${eg}$.`,
      `Quel nombre faut-il écrire à la place de $\\square$ pour que l'égalité $${eg}$ soit vraie ?`,
    ]);
    return rep(texte, r, ex3(`$${b} = ${c}^{${m}}$, puis on multiplie les exposants.`, `Le nombre manquant est $${nL(r)}$.`));
  }),
  tpl(M3, 7, 2, "L'exposant s'applique à chaque facteur : au coefficient et à la lettre.", () => {
    for (;;) {
      const { p, q, k, a, v } = parfaitPQ();
      if (a > 125 || v > 125) continue;
      const m = entre(1, 3);
      const x = un(["x", "t", "y", "u"]);
      const puissance = m * p;
      const expr = `${par(`${a}${x}^{${q * m}}`)}^{${expT(p, q)}}`;
      const mono = (c: number, e: number) => `${c}${pw(x, e)}`;
      return qcm(
        dit(F_SIMPLIFIE.filter((f) => !f.includes("une seule puissance")), expr),
        `$${mono(v, puissance)}$`,
        [mono(k, puissance), mono(v, m), mono(v, q * m), mono(a, puissance), mono(v + 1, puissance), mono(2 * v, puissance)].filter((s) => s !== mono(v, puissance)).map((s) => `$${s}$`),
        ex3(`$${pw(String(a), p, q)} = ${v}$ et $(${x}^{${q * m}})^{${expT(p, q)}} = ${pw(x, puissance)}$.`, `L'expression vaut $${mono(v, puissance)}$.`),
      );
    }
  }),
  tpl(M3, 8, 2, "Même exposant : on regroupe les bases, a^r × b^r = (ab)^r.", () => {
    for (;;) {
      const n = un([2, 3, 3, 4]);
      const k = entre(2, MAXK[n]);
      const N = k ** n;
      const diviseurs: number[] = [];
      for (let d = 2; d < N; d++) if (N % d === 0) diviseurs.push(d);
      if (!diviseurs.length) continue;
      const a = un(diviseurs);
      const b = N / a;
      if (a === k && n === 2) continue;
      const p = un([1, 1, 2]);
      if (pgcd(p, n) !== 1) continue;
      const v = k ** p;
      const mA = pw(String(a), p, n);
      const mB = pw(String(b), p, n);
      const formes: [string, number, string][] = [
        [`${mA} \\times ${mB}`, v, `${a} \\times ${b} = ${N}`],
        [p === 1 ? `${rac(n, a)} \\times ${rac(n, b)}` : `${mB} \\times ${mA}`, v, `${a} \\times ${b} = ${N}`],
      ];
      if (N * a < 1000) formes.push([`\\dfrac{${pw(String(N * a), p, n)}}{${mA}}`, v, `\\dfrac{${N * a}}{${a}} = ${N}`]);
      const forme = un(formes);
      return rep(dit(F_CALC, forme[0]), forme[1], ex3(`Même exposant : on regroupe les bases, $${forme[2]}$.`, `Le résultat est $${forme[1]}$.`));
    }
  }),

  tpl(M3, 9, 3, "Écris les deux membres avec la même base, puis compare les exposants.", () => {
    for (;;) {
      const g = un([2, 2, 3, 5]);
      const m = entre(2, g === 2 ? 5 : 3);
      const n = entre(1, g === 2 ? 5 : 3);
      if (m === n || pgcd(m, n) !== 1) continue;
      const inv = Math.random() < 0.3;
      const v = un(["x", "t"]);
      const droite = inv ? `\\dfrac{1}{${g ** n}}` : String(g ** n);
      const sol: Fr = red(inv ? -n : n, m);
      const eq = `${g ** m}^{${v}} = ${droite}`;
      const juste = fracL(sol[0], sol[1]);
      const texte = un([
        `Résous $${eq}$.`,
        `Quelle est la solution de $${eq}$ ?`,
        `Trouve $${v}$ tel que $${eq}$.`,
        `Pour quelle valeur de $${v}$ a-t-on $${eq}$ ?`,
        `Détermine $${v}$ : $${eq}$.`,
        `Change de base pour résoudre $${eq}$.`,
        `Écris les deux membres avec la base ${g}, puis résous $${eq}$.`,
        `Quel exposant $${v}$ donne $${eq}$ ?`,
      ]);
      return qcm(
        texte,
        `$${juste}$`,
        [fracL(sol[1], sol[0]), fracL(-sol[0], sol[1]), fracL(sol[0] + sol[1], sol[1]), fracL(sol[0], 2 * sol[1]), String((inv ? -n : n) - m), fracL(sol[0] * 2, sol[1])].filter((s) => s !== juste).map((s) => `$${s}$`),
        ex3(`$${g ** m} = ${g}^{${m}}$ : l'équation s'écrit $${g}^{${m}${v}} = ${g}^{${inv ? "-" : ""}${n}}$, donc $${m}${v} = ${inv ? "-" : ""}${n}$.`, `$${v} = ${juste}$.`),
      );
    }
  }),
  tpl(M3, 10, 3, "Écris f(x) = x^r, puis applique (x^r)' = r × x^(r-1).", () => {
    for (;;) {
      const n = un([2, 3, 4, 5]);
      const p = un([1, 1, 2, 3]);
      const neg = Math.random() < 0.25;
      if (pgcd(p, n) !== 1 || p === n) continue;
      const nom = un(["f", "g", "h"]);
      const r: Fr = red(neg ? -p : p, n);
      const m = neg ? `\\dfrac{1}{${rac(n, p === 1 ? "x" : `x^{${p}}`)}}` : Math.random() < 0.5 ? pw("x", p, n) : rac(n, p === 1 ? "x" : `x^{${p}}`);
      const rm1 = sub(r, [1, 1]);
      const coef = (f: Fr) => (f[0] === 1 && f[1] === 1 ? "" : f[0] === -1 && f[1] === 1 ? "-" : `${fracL(f[0], f[1])}`);
      const ecr = (c: Fr, e: Fr) => `${coef(c)}${e[0] === 0 ? "" : pwF("x", e)}`;
      const juste = ecr(r, rm1);
      const rp1 = add(r, [1, 1]);
      const faux = [ecr([1, 1], rm1), ecr(r, r), ecr(r, rp1), ecr(rm1, rm1), ecr(mul(r, [-1, 1]), rm1), ecr(mul(r, [2, 1]), rm1)].filter((s) => s !== juste);
      const texte = un([
        `Sur $]0\\,;+\\infty[$, on pose $${nom}(x) = ${m}$. Quelle est sa dérivée ?`,
        `Quelle est la dérivée de $${nom}(x) = ${m}$ sur $]0\\,;+\\infty[$ ?`,
        `Dérive $${nom}(x) = ${m}$ pour $x > 0$.`,
        `On considère $${nom}(x) = ${m}$ pour $x > 0$. Donne $${nom}'(x)$.`,
        `Pour $x > 0$, $${nom}(x) = ${m}$. Que vaut $${nom}'(x)$ ?`,
        `Calcule $${nom}'(x)$ sachant que $${nom}(x) = ${m}$ sur $]0\\,;+\\infty[$.`,
        `Trouve l'expression de la dérivée de $${nom}(x) = ${m}$ pour $x > 0$.`,
        `Écris $${nom}(x) = ${m}$ avec un exposant, puis dérive-la pour $x > 0$.`,
      ]);
      return qcm(texte, `$${juste}$`, faux.map((s) => `$${s}$`), ex3(`$${nom}(x) = ${pwF("x", r)}$ et la dérivée de $x^{r}$ est $r x^{r-1}$, avec ici $r - 1 = ${expT(rm1[0], rm1[1])}$.`, `La dérivée est $${juste}$.`));
    }
  }),
  tpl(M3, 11, 3, "Regarde le signe de l'exposant : la dérivée a le même signe.", () => {
    const q = un([2, 3, 4, 5]);
    const p = un([1, 2, 3, 5, 7].filter((c) => pgcd(c, q) === 1));
    const r: Fr = Math.random() < 0.5 ? [p, q] : [-p, q];
    const c = un([1, 1, 2, 3, 5]);
    const nom = un(["f", "g", "h"]);
    const expr = `${c === 1 ? "" : c}${pwF("x", red(r[0], r[1]))}`;
    const croit = r[0] > 0;
    const juste = croit ? CROISSANTE : DECROISSANTE;
    return qcm(
      un([
        `Sur $]0\\,;+\\infty[$, quel est le sens de variation de $${nom}(x) = ${expr}$ ?`,
        `Comment varie $${nom}(x) = ${expr}$ pour $x > 0$ ?`,
        `Soit $${nom}(x) = ${expr}$ pour $x > 0$. Comment est cette fonction ?`,
        `Étudie le sens de variation de $${nom}(x) = ${expr}$ sur $]0\\,;+\\infty[$.`,
        `Sans la tracer, que peut-on dire de $${nom}(x) = ${expr}$ pour $x > 0$ ?`,
        `La fonction $${nom}(x) = ${expr}$ est étudiée pour $x > 0$. Quel est son sens de variation ?`,
        `Le signe de l'exposant décide : que fait $${nom}(x) = ${expr}$ pour $x > 0$ ?`,
        `Quand $x$ augmente, que devient $${nom}(x) = ${expr}$ pour $x > 0$ ?`,
      ]),
      juste,
      [CROISSANTE, DECROISSANTE, CONSTANTE, CHANGE],
      ex3(`La dérivée est du signe de l'exposant : ${croit ? "positif" : "négatif"} ici.`, `La fonction est ${croit ? "strictement croissante" : "strictement décroissante"} sur $]0\\,;+\\infty[$.`),
    );
  }),
  tpl(M3, 12, 3, "Une base entre 0 et 1 se comporte à l'envers d'une base supérieure à 1.", () => {
    const base = un<number>([0.25, 0.5, 0.8, 0.16, 2, 3, 5, 10, 1.5]);
    const r = un<Fr>([[1, 2], [1, 3], [2, 3], [3, 2], [5, 2], [-1, 2], [-3, 2], [4, 3], [3, 4]]);
    const b = nL(base);
    const m = pw(base < 2 && base !== Math.trunc(base) ? par(b) : b, r[0], r[1]);
    const v = base ** (r[0] / r[1]);
    const GRAND = `Plus grand que $${b}$`;
    const PETIT = `Plus petit que $${b}$`;
    return qcm(
      un([
        `Sans calculer, compare le nombre $${m}$ au nombre $${b}$.`,
        `Par rapport à $${b}$, comment est le nombre $${m}$ ?`,
        `Le nombre $${m}$ est-il plus grand ou plus petit que $${b}$ ?`,
        `Que peut-on dire du nombre $${m}$ comparé à $${b}$ ?`,
        `On élève $${b}$ à une puissance : on obtient $${m}$. Comparé à $${b}$, que dire de ce résultat ?`,
        `Sans calculatrice, situe le nombre $${m}$ par rapport à $${b}$.`,
        `Regarde la base et l'exposant de $${m}$. Que dire de ce nombre par rapport à $${b}$ ?`,
        `Compare le nombre $${m}$ au nombre $${b}$, en regardant seulement la base et l'exposant.`,
      ]),
      v > base ? GRAND : PETIT,
      [GRAND, PETIT, `Égal à $${b}$`, INDECIS],
      ex3(`La base ${base > 1 ? "dépasse 1" : "est entre 0 et 1"} et l'exposant vaut $${expT(r[0], r[1])}$ : ${r[0] / r[1] > 1 ? "il est supérieur à 1" : r[0] > 0 ? "il est entre 0 et 1" : "il est négatif"}.`, `$${m} \\approx ${nL(Math.round(v * 100) / 100)}$ : ${v > base ? "plus grand" : "plus petit"} que $${b}$.`),
    );
  }),
  tpl(M3, 13, 3, "Si Y est proportionnel à X^r, multiplier X par k multiplie Y par k^r.", () => {
    const c = un(ECHELLES);
    const [p, q] = c.r;
    const t = q === 2 ? entre(2, 10) : q === 3 ? entre(2, 5) : entre(2, 3);
    const k = t ** q;
    const v = t ** p;
    return rep(c.t(expT(p, q), k), v, ex3(`Le facteur est $${pw(String(k), p, q)}$, car $(kX)^{r} = k^{r} X^{r}$, et $${rac(q, k)} = ${t}$.`, `Le facteur vaut $${v}$.`));
  }),
];
