import type { TutorBankItemV4, TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { expressionsEquivalentes } from "@/lib/tutor/evaluation/expressionAlgebrique";

// ⭐ ÉQUATIONS DE 4e — réécrit le 03/10/2026 (squelettes du coach).
//
// Les élèves reconnaissaient la PHRASE : chaque gabarit ne changeait que les
// nombres (« Résoudre : ax + b = c »). Chaque générateur compose désormais une
// FORME d'équation (inconnue des deux côtés, parenthèses, coefficients négatifs
// ou décimaux, lettre x, y, t, n, a, m, z) × une CONSIGNE (« Résous », « Que
// vaut… ? », « Pour quelle valeur… ? »…), et les problèmes une SITUATION (âges,
// périmètres, prix, forfaits, partages, cuves, bougies, bambous…) × une TOURNURE.
// Convention du fichier : les formules entre $…$ (rendues par KaTeX), virgule
// décimale écrite {,} dans les formules ; « x » et jamais « 1x ».

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// =========================================================
// OUTILS D'ÉCRITURE
// =========================================================

type Q = TutorGeneratedQuestionV4;

const LETTRES = ["x", "x", "y", "t", "n", "a", "m", "z"];
const lettre = () => randomChoice(LETTRES);

const arr = (v: number) => Math.round(v * 100) / 100;

/** Un nombre écrit en LaTeX (à mettre entre $…$), virgule décimale française. */
function nb(v: number): string {
  const r = arr(v);
  return (r < 0 ? "-" : "") + String(Math.abs(r)).replace(".", "{,}");
}

/** Un nombre entre parenthèses s'il est négatif (après ×, +, −). */
const p = (v: number) => (arr(v) < 0 ? `(${nb(v)})` : nb(v));

/** Un prix écrit dans le texte : 3, 2,50. */
const euros = (v: number) => {
  const r = arr(v);
  return Number.isInteger(r) ? String(r) : r.toFixed(2).replace(".", ",");
};

/** Les réponses acceptées pour un nombre (virgule ou point, signe − ou -). */
function attendu(v: number): string[] {
  const r = arr(v);
  const base = String(Math.abs(r));
  const out = new Set<string>();
  for (const s of [base.replace(".", ","), base]) {
    if (r < 0) {
      out.add("-" + s);
      out.add("−" + s);
    } else out.add(s);
  }
  if (!Number.isInteger(r)) out.add((r < 0 ? "-" : "") + Math.abs(r).toFixed(2).replace(".", ","));
  return [...out];
}

type Terme = [number, string];

/** Une somme de termes : ex([3, "x"], [-5, ""]) → « 3x - 5 » ; ex([1, "t"]) → « t ». */
function ex(...ts: Terme[]): string {
  let s = "";
  for (const [c, l] of ts) {
    const v = arr(c);
    if (v === 0) continue;
    const abs = Math.abs(v);
    const corps = l ? (abs === 1 ? l : nb(abs) + l) : nb(abs);
    if (!s) s = (v < 0 ? "-" : "") + corps;
    else s += (v < 0 ? " - " : " + ") + corps;
  }
  return s || "0";
}

/** Une formule LaTeX du fichier → écriture tapée au clavier (pour `expected`). */
const brut = (s: string) =>
  s.replace(/\\frac\{([^}]*)\}\{([^}]*)\}/g, "$1/$2").replace(/\{,\}/g, ",");

function melanger<T>(a: T[]): T[] {
  const b = [...a];
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [b[i], b[j]] = [b[j], b[i]];
  }
  return b;
}

/** La bonne réponse et jusqu'à trois distracteurs DISTINCTS, mélangés. */
function qcm(bonne: string, fausses: string[]): string[] {
  const vus = new Set([bonne]);
  const out = [bonne];
  for (const f of fausses) {
    if (out.length >= 4) break;
    if (!vus.has(f)) {
      vus.add(f);
      out.push(f);
    }
  }
  return melanger(out);
}

type Prenom = { nom: string; f: boolean };
const PRENOMS: Prenom[] = [
  { nom: "Léa", f: true },
  { nom: "Sami", f: false },
  { nom: "Inès", f: true },
  { nom: "Hugo", f: false },
  { nom: "Nora", f: true },
  { nom: "Malik", f: false },
  { nom: "Chloé", f: true },
  { nom: "Théo", f: false },
  { nom: "Yasmine", f: true },
  { nom: "Lucas", f: false },
  { nom: "Maëlle", f: true },
  { nom: "Enzo", f: false },
];
const il = (q: Prenom) => (q.f ? "elle" : "il");
const Il = (q: Prenom) => (q.f ? "Elle" : "Il");
function deuxPrenoms(): [Prenom, Prenom] {
  const a = randomChoice(PRENOMS);
  let b = randomChoice(PRENOMS);
  while (b.nom === a.nom) b = randomChoice(PRENOMS);
  return [a, b];
}
const ilsDe = (a: Prenom, b: Prenom) => (a.f && b.f ? "elles" : "ils");

const MULT: Record<number, string> = { 2: "le double", 3: "le triple", 4: "le quadruple" };

// =========================================================
// RÉSOUDRE : consignes, formes, explications
// =========================================================

const RESOUDRE: ((eq: string, L: string) => string)[] = [
  (eq) => `Résoudre : $${eq}$`,
  (eq) => `Résous l’équation $${eq}$.`,
  (eq) => `Quelle est la solution de l’équation $${eq}$ ?`,
  (eq, L) => `Trouve la valeur de $${L}$ telle que $${eq}$.`,
  (eq, L) => `Pour quelle valeur de $${L}$ a-t-on $${eq}$ ?`,
  (eq, L) => `Détermine $${L}$ sachant que $${eq}$.`,
  (eq, L) => `Que vaut $${L}$ si $${eq}$ ?`,
  (eq, L) => `Donne la solution de l’équation d’inconnue $${L}$ : $${eq}$.`,
];

type FormeR = { eq: string; sol: number; methode: string; calcul: string };

function explRes(L: string, f: FormeR) {
  return (
    `Définition : résoudre $${f.eq}$, c’est trouver la valeur de $${L}$ qui rend l’égalité vraie.\n\n` +
    `Méthode : ${f.methode}\n\n` +
    `Calcul : ${f.calcul}\n\n` +
    `Conclusion : $${L} = ${nb(f.sol)}$.`
  );
}

/** Fin de résolution de kL + m = c : « 3x + 4 = 19, donc 3x = 15, puis x = 15 ÷ 3 = 5. » */
function finir(k: number, m: number, c: number, s: number, L: string): string {
  const parts: string[] = [];
  if (arr(m) !== 0) parts.push(`$${ex([k, L], [m, ""])} = ${nb(c)}$, donc $${ex([k, L])} = ${nb(c - m)}$`);
  else parts.push(`$${ex([k, L])} = ${nb(c)}$`);
  if (arr(k) !== 1) parts.push(`$${L} = ${nb(c - m)} \\div ${p(k)} = ${nb(s)}$`);
  return parts.join(", puis ") + ".";
}

/** « On soustrait 2x des deux côtés » / « On ajoute 3x des deux côtés ». */
const retirer = (c: number, L: string) =>
  c > 0 ? `on soustrait $${ex([c, L])}$ des deux côtés` : `on ajoute $${ex([-c, L])}$ aux deux côtés`;

function resolutionDeuxMembres(a: number, b: number, c: number, d: number, s: number, L: string): string {
  return `${retirer(c, L)} : ` + finir(a - c, b, d, s, L);
}

/** Un entier non nul entre −m et m. */
const nonNul = (m: number) => {
  let v = 0;
  while (v === 0) v = randomInt(-m, m);
  return v;
};

// ---------- équations en une ou deux étapes ----------

const SIMPLE_1: ((L: string) => FormeR)[] = [
  (L) => {
    const s = randomInt(1, 15), b = randomInt(2, 15), c = s + b;
    return { eq: `${L} + ${b} = ${c}`, sol: s, methode: `on soustrait ${b} des deux côtés.`, calcul: `$${L} = ${c} - ${b} = ${s}$.` };
  },
  (L) => {
    const b = randomInt(2, 12), s = b + randomInt(1, 12), c = s - b;
    return { eq: `${L} - ${b} = ${c}`, sol: s, methode: `on ajoute ${b} aux deux côtés.`, calcul: `$${L} = ${c} + ${b} = ${s}$.` };
  },
  (L) => {
    const s = randomInt(1, 15), b = randomInt(2, 15), c = s + b;
    return { eq: `${b} + ${L} = ${c}`, sol: s, methode: `on soustrait ${b} des deux côtés.`, calcul: `$${L} = ${c} - ${b} = ${s}$.` };
  },
  (L) => {
    const s = randomInt(1, 15), b = randomInt(2, 15), c = s + b;
    return { eq: `${c} = ${L} + ${b}`, sol: s, methode: `on soustrait ${b} des deux côtés.`, calcul: `$${L} = ${c} - ${b} = ${s}$.` };
  },
  (L) => {
    const a = randomInt(2, 9), s = randomInt(2, 12), c = a * s;
    return { eq: `${a}${L} = ${c}`, sol: s, methode: `on divise les deux côtés par ${a}.`, calcul: `$${L} = ${c} \\div ${a} = ${s}$.` };
  },
  (L) => {
    const a = randomInt(2, 9), s = randomInt(2, 12), c = a * s;
    return { eq: `${c} = ${a}${L}`, sol: s, methode: `on divise les deux côtés par ${a}.`, calcul: `$${L} = ${c} \\div ${a} = ${s}$.` };
  },
  (L) => {
    const b = randomInt(2, 12), s = b + randomInt(1, 12), c = s - b;
    return { eq: `${c} = ${L} - ${b}`, sol: s, methode: `on ajoute ${b} aux deux côtés.`, calcul: `$${L} = ${c} + ${b} = ${s}$.` };
  },
];

const SIMPLE_2: ((L: string) => FormeR)[] = [
  // coefficient négatif
  (L) => {
    const a = -randomInt(2, 9), s = nonNul(10), c = a * s;
    return { eq: `${ex([a, L])} = ${nb(c)}`, sol: s, methode: `on divise les deux côtés par $${nb(a)}$.`, calcul: `$${L} = ${nb(c)} \\div ${p(a)} = ${nb(s)}$.` };
  },
  // solution négative
  (L) => {
    const b = randomInt(6, 15), c = randomInt(1, b - 1), s = c - b;
    return { eq: `${L} + ${b} = ${c}`, sol: s, methode: `on soustrait ${b} des deux côtés.`, calcul: `$${L} = ${c} - ${b} = ${nb(s)}$.` };
  },
  // quotient
  (L) => {
    const a = randomInt(2, 6), b = randomInt(2, 9);
    return { eq: `\\frac{${L}}{${a}} = ${b}`, sol: a * b, methode: `on multiplie les deux côtés par ${a}.`, calcul: `$${L} = ${b} \\times ${a} = ${a * b}$.` };
  },
  // décimaux
  (L) => {
    let bt = randomInt(11, 59);
    if (bt % 10 === 0) bt++;
    let st = randomInt(11, 79);
    if (st % 10 === 0) st++;
    const b = bt / 10, s = st / 10, c = (bt + st) / 10;
    return { eq: `${L} + ${nb(b)} = ${nb(c)}`, sol: s, methode: `on soustrait $${nb(b)}$ des deux côtés.`, calcul: `$${L} = ${nb(c)} - ${nb(b)} = ${nb(s)}$.` };
  },
  (L) => {
    const d = randomChoice([0.5, 1.5, 2.5]), s = 2 * randomInt(1, 10), c = arr(d * s);
    return { eq: `${nb(d)}${L} = ${nb(c)}`, sol: s, methode: `on divise les deux côtés par $${nb(d)}$.`, calcul: `$${L} = ${nb(c)} \\div ${nb(d)} = ${s}$.` };
  },
  // b − L = c
  (L) => {
    const b = randomInt(8, 20), c = randomInt(1, b - 1), s = b - c;
    return {
      eq: `${b} - ${L} = ${c}`, sol: s,
      methode: `on soustrait ${b} des deux côtés, puis on prend l’opposé.`,
      calcul: `$-${L} = ${c} - ${b} = ${nb(c - b)}$, donc $${L} = ${s}$.`,
    };
  },
  // −L = c
  (L) => {
    const c = nonNul(15), s = -c;
    return { eq: `-${L} = ${nb(c)}`, sol: s, methode: `on prend l’opposé des deux membres.`, calcul: `$${L} = ${nb(s)}$.` };
  },
  // deux étapes
  (L) => {
    const a = randomInt(2, 9), b = randomInt(1, 12), s = randomInt(1, 10), c = a * s + b;
    return { eq: `${a}${L} + ${b} = ${c}`, sol: s, methode: `on soustrait ${b} des deux côtés, puis on divise par ${a}.`, calcul: finir(a, b, c, s, L) };
  },
  (L) => {
    const a = randomInt(2, 9), b = randomInt(1, 12), s = randomInt(1, 10), c = a * s - b;
    return { eq: `${a}${L} - ${b} = ${nb(c)}`, sol: s, methode: `on ajoute ${b} aux deux côtés, puis on divise par ${a}.`, calcul: finir(a, -b, c, s, L) };
  },
  (L) => {
    const a = randomInt(2, 9), b = randomInt(1, 12), s = randomInt(1, 10), c = a * s + b;
    return { eq: `${b} + ${a}${L} = ${c}`, sol: s, methode: `on soustrait ${b} des deux côtés, puis on divise par ${a}.`, calcul: finir(a, b, c, s, L) };
  },
  (L) => {
    const a = randomInt(2, 9), b = randomInt(1, 12), s = randomInt(1, 10), c = a * s - b;
    return { eq: `${nb(c)} = ${a}${L} - ${b}`, sol: s, methode: `on ajoute ${b} aux deux côtés, puis on divise par ${a}.`, calcul: finir(a, -b, c, s, L) };
  },
];

// ---------- réduire avant de résoudre ----------

const REDUCTION_2: ((L: string) => FormeR)[] = [
  (L) => {
    const a = randomInt(2, 7), b = randomInt(2, 6), k = a + b, s = randomInt(1, 9), c = k * s;
    return { eq: `${a}${L} + ${b}${L} = ${c}`, sol: s, methode: `on réduit : $${a}${L} + ${b}${L} = ${k}${L}$.`, calcul: finir(k, 0, c, s, L) };
  },
  (L) => {
    const b = randomInt(2, 6), a = b + randomInt(2, 6), k = a - b, s = randomInt(1, 9), c = k * s;
    return { eq: `${a}${L} - ${b}${L} = ${c}`, sol: s, methode: `on réduit : $${a}${L} - ${b}${L} = ${k}${L}$.`, calcul: finir(k, 0, c, s, L) };
  },
  (L) => {
    const a = randomInt(2, 8), k = a + 1, s = randomInt(1, 9), c = k * s;
    return { eq: `${L} + ${a}${L} = ${c}`, sol: s, methode: `on réduit : $${L} + ${a}${L} = ${k}${L}$ (car $${L} = 1${L}$).`, calcul: finir(k, 0, c, s, L) };
  },
  (L) => {
    const a = randomInt(3, 9), k = a - 1, s = randomInt(1, 9), c = k * s;
    return { eq: `${a}${L} - ${L} = ${c}`, sol: s, methode: `on réduit : $${a}${L} - ${L} = ${k}${L}$ (car $${L} = 1${L}$).`, calcul: finir(k, 0, c, s, L) };
  },
  (L) => {
    const a = randomInt(2, 5), b = randomInt(2, 4), c0 = randomInt(1, 3), k = a + b + c0, s = randomInt(1, 8), c = k * s;
    return { eq: `${ex([a, L], [b, L], [c0, L])} = ${c}`, sol: s, methode: `on réduit : $${ex([a, L], [b, L], [c0, L])} = ${k}${L}$.`, calcul: finir(k, 0, c, s, L) };
  },
  (L) => {
    const a = randomInt(2, 6), b = randomInt(2, 5), k = a + b, s = randomInt(1, 9), tot = k * s, d1 = randomInt(1, tot - 1), d2 = tot - d1;
    return {
      eq: `${a}${L} + ${b}${L} = ${d1} + ${d2}`, sol: s,
      methode: `on réduit chaque membre : $${a}${L} + ${b}${L} = ${k}${L}$ et $${d1} + ${d2} = ${tot}$.`,
      calcul: finir(k, 0, tot, s, L),
    };
  },
];

const REDUCTION_3: ((L: string) => FormeR)[] = [
  (L) => {
    const a = randomInt(2, 5), c0 = randomInt(1, 4), b = randomInt(1, 9), k = a + c0, s = randomInt(1, 8), d = k * s + b;
    return { eq: `${a}${L} + ${b} + ${ex([c0, L])} = ${d}`, sol: s, methode: `on regroupe les termes en $${L}$ : $${a}${L} + ${ex([c0, L])} = ${k}${L}$.`, calcul: finir(k, b, d, s, L) };
  },
  (L) => {
    const a = randomInt(2, 6), b = randomInt(2, 5), c = randomInt(1, 9), k = a + b, s = randomInt(1, 8), d = k * s - c;
    return { eq: `${a}${L} + ${b}${L} - ${c} = ${nb(d)}`, sol: s, methode: `on réduit : $${a}${L} + ${b}${L} = ${k}${L}$.`, calcul: finir(k, -c, d, s, L) };
  },
  (L) => {
    const c0 = randomInt(1, 4), a = c0 + randomInt(1, 5), b = randomInt(1, 9), k = a - c0, s = randomInt(1, 8), d = k * s - b;
    return { eq: `${a}${L} - ${b} - ${ex([c0, L])} = ${nb(d)}`, sol: s, methode: `on regroupe les termes en $${L}$ : $${a}${L} - ${ex([c0, L])} = ${ex([k, L])}$.`, calcul: finir(k, -b, d, s, L) };
  },
  (L) => {
    const a = randomInt(2, 6), b = randomInt(2, 9);
    let k = b - a;
    if (k === 0) k = 1;
    const bb = a + k, s = nonNul(8), c = k * s;
    return { eq: `${ex([-a, L], [bb, L])} = ${nb(c)}`, sol: s, methode: `on réduit : $${ex([-a, L], [bb, L])} = ${ex([k, L])}$.`, calcul: finir(k, 0, c, s, L) };
  },
  (L) => {
    const a = randomInt(3, 8), c0 = randomInt(1, a - 1), b = randomInt(2, 12), k = a - c0, s = randomInt(1, 9), d = k * s + b;
    return { eq: `${b} + ${a}${L} - ${ex([c0, L])} = ${d}`, sol: s, methode: `on regroupe les termes en $${L}$ : $${a}${L} - ${ex([c0, L])} = ${ex([k, L])}$.`, calcul: finir(k, b, d, s, L) };
  },
  (L) => {
    const a = randomInt(2, 5), c0 = randomInt(1, 4), b = randomInt(5, 15), e = randomInt(1, 4), k = a + c0, s = randomInt(1, 8), d = k * s + b - e;
    return {
      eq: `${a}${L} + ${b} + ${ex([c0, L])} - ${e} = ${d}`, sol: s,
      methode: `on réduit : $${a}${L} + ${ex([c0, L])} = ${k}${L}$ et $${b} - ${e} = ${b - e}$.`,
      calcul: finir(k, b - e, d, s, L),
    };
  },
  (L) => {
    const paires: [number, number][] = [[0.5, 1.5], [1.5, 2.5], [0.5, 2.5], [2.5, 3.5], [1.5, 3.5], [0.5, 3.5]];
    const [d1, d2] = randomChoice(paires), k = d1 + d2, s = randomInt(1, 9), c = k * s;
    return { eq: `${nb(d1)}${L} + ${nb(d2)}${L} = ${c}`, sol: s, methode: `on réduit : $${nb(d1)}${L} + ${nb(d2)}${L} = ${k}${L}$.`, calcul: finir(k, 0, c, s, L) };
  },
];

// ---------- parenthèses ----------

const dev = (a: number, b: number, L: string) => `$${a}(${ex([1, L], [b, ""])}) = ${ex([a, L], [a * b, ""])}$`;

const DISTRIB_3: ((L: string) => FormeR)[] = [
  (L) => {
    const a = randomInt(2, 6), b = randomInt(1, 8), s = randomInt(1, 10), c = a * (s + b);
    return { eq: `${a}(${L} + ${b}) = ${c}`, sol: s, methode: `on divise les deux côtés par ${a} : $${L} + ${b} = ${c / a}$.`, calcul: `$${L} = ${c / a} - ${b} = ${s}$.` };
  },
  (L) => {
    const a = randomInt(2, 6), b = randomInt(1, 8), s = b + randomInt(1, 9), c = a * (s - b);
    return { eq: `${a}(${L} - ${b}) = ${c}`, sol: s, methode: `on divise les deux côtés par ${a} : $${L} - ${b} = ${c / a}$.`, calcul: `$${L} = ${c / a} + ${b} = ${s}$.` };
  },
  (L) => {
    const a = randomInt(2, 6), b = randomInt(1, 8), s = randomInt(1, 10), c = a * (s + b);
    return { eq: `${c} = ${a}(${L} + ${b})`, sol: s, methode: `on développe : ${dev(a, b, L)}.`, calcul: finir(a, a * b, c, s, L) };
  },
  (L) => {
    const a = randomInt(2, 6), b = randomInt(1, 8), s = randomInt(1, 10), c = a * (s + b);
    return { eq: `${a}(${b} + ${L}) = ${c}`, sol: s, methode: `on développe : $${a}(${b} + ${L}) = ${a * b} + ${a}${L}$.`, calcul: finir(a, a * b, c, s, L) };
  },
  (L) => {
    const a = randomInt(2, 6), b = randomInt(3, 9), s = -randomInt(1, b - 1), c = a * (s + b);
    return { eq: `${a}(${L} + ${b}) = ${c}`, sol: s, methode: `on développe : ${dev(a, b, L)}.`, calcul: finir(a, a * b, c, s, L) };
  },
  (L) => {
    const a = randomInt(2, 6), b = randomInt(1, 8), s = b + randomInt(1, 9), c = a * (s - b);
    return { eq: `${a}(${L} - ${b}) = ${c}`, sol: s, methode: `on développe : ${dev(a, -b, L)}.`, calcul: finir(a, -a * b, c, s, L) };
  },
];

const DISTRIB_4: ((L: string) => FormeR)[] = [
  (L) => {
    const a = randomInt(2, 5), b = randomInt(1, 6), d = randomInt(1, 9), s = randomInt(1, 8), c = a * (s + b) + d;
    return { eq: `${a}(${L} + ${b}) + ${d} = ${c}`, sol: s, methode: `on développe : ${dev(a, b, L)}, puis on réduit.`, calcul: finir(a, a * b + d, c, s, L) };
  },
  (L) => {
    const a = randomInt(2, 5), b = randomInt(1, 6), d = randomInt(1, 9), s = b + randomInt(1, 8), c = a * (s - b) - d;
    return { eq: `${a}(${L} - ${b}) - ${d} = ${nb(c)}`, sol: s, methode: `on développe : ${dev(a, -b, L)}, puis on réduit.`, calcul: finir(a, -a * b - d, c, s, L) };
  },
  (L) => {
    const a = randomInt(2, 4), b = randomInt(2, 5), c0 = randomInt(1, 6), s = randomInt(1, 8), d = a * (b * s + c0);
    return {
      eq: `${a}(${b}${L} + ${c0}) = ${d}`, sol: s,
      methode: `on développe : $${a}(${b}${L} + ${c0}) = ${a * b}${L} + ${a * c0}$.`,
      calcul: finir(a * b, a * c0, d, s, L),
    };
  },
  (L) => {
    const a = randomInt(2, 5), b = randomInt(1, 6), s = nonNul(9), c = -a * (s - b);
    return {
      eq: `-${a}(${L} - ${b}) = ${nb(c)}`, sol: s,
      methode: `on développe : $-${a}(${L} - ${b}) = ${ex([-a, L], [a * b, ""])}$ (attention aux signes).`,
      calcul: finir(-a, a * b, c, s, L),
    };
  },
  (L) => {
    const a = randomInt(2, 4), b = randomInt(1, 5), c0 = randomInt(2, 4), d = randomInt(1, 5), s = randomInt(1, 8);
    const k = a + c0, m = a * b - c0 * d, e = k * s + m;
    return {
      eq: `${a}(${L} + ${b}) + ${c0}(${L} - ${d}) = ${nb(e)}`, sol: s,
      methode: `on développe les deux produits : $${ex([a, L], [a * b, ""])} + ${ex([c0, L], [-c0 * d, ""])}$, puis on réduit : $${ex([k, L], [m, ""])}$.`,
      calcul: finir(k, m, e, s, L),
    };
  },
  (L) => {
    const a = randomInt(3, 6), c0 = randomInt(1, a - 1), b = randomInt(1, 6), k = a - c0, s = randomInt(1, 8), d = k * s + a * b;
    return {
      eq: `${a}(${L} + ${b}) - ${ex([c0, L])} = ${d}`, sol: s,
      methode: `on développe : ${dev(a, b, L)}, puis on réduit : $${a}${L} - ${ex([c0, L])} = ${ex([k, L])}$.`,
      calcul: finir(k, a * b, d, s, L),
    };
  },
  (L) => {
    const b = 2 * randomInt(1, 5), c = randomInt(b / 2 + 1, b / 2 + 10), s = 2 * c - b;
    return {
      eq: `0{,}5(${L} + ${b}) = ${c}`, sol: s,
      methode: `on multiplie les deux côtés par 2 : $${L} + ${b} = ${2 * c}$.`,
      calcul: `$${L} = ${2 * c} - ${b} = ${s}$.`,
    };
  },
];

// ---------- l'inconnue des deux côtés ----------

/** Les formes à inconnue des deux côtés ; `s` imposé (QCM) ou tiré. */
const DEUX_MEMBRES: ((L: string, s: number) => FormeR | null)[] = [
  (L, s) => {
    const a = randomInt(2, 9);
    let c = randomInt(1, 8);
    if (c === a) c = a + 1;
    const b = randomInt(1, 12), d = (a - c) * s + b;
    return { eq: `${ex([a, L], [b, ""])} = ${ex([c, L], [d, ""])}`, sol: s, methode: `on regroupe les termes en $${L}$ d’un côté et les nombres de l’autre.`, calcul: resolutionDeuxMembres(a, b, c, d, s, L) };
  },
  (L, s) => {
    const a = randomInt(2, 9);
    let c = randomInt(1, 8);
    if (c === a) c = a + 1;
    const b = -randomInt(1, 12), d = (a - c) * s + b;
    return { eq: `${ex([a, L], [b, ""])} = ${ex([c, L], [d, ""])}`, sol: s, methode: `on regroupe les termes en $${L}$ d’un côté et les nombres de l’autre.`, calcul: resolutionDeuxMembres(a, b, c, d, s, L) };
  },
  (L, s) => {
    const a = randomInt(2, 5), b = randomInt(1, 6);
    let c = randomInt(1, 7);
    if (c === a) c = a + 2;
    const d = (a - c) * s + a * b;
    return {
      eq: `${a}(${ex([1, L], [b, ""])}) = ${ex([c, L], [d, ""])}`, sol: s,
      methode: `on développe : ${dev(a, b, L)}, puis on regroupe les termes en $${L}$.`,
      calcul: resolutionDeuxMembres(a, a * b, c, d, s, L),
    };
  },
  (L, s) => {
    for (let essai = 0; essai < 60; essai++) {
      const a = randomInt(2, 6), c = randomInt(2, 6);
      if (a === c) continue;
      const b = nonNul(6);
      const num = (a - c) * s + a * b;
      if (num % c !== 0) continue;
      const d = num / c;
      if (d === 0 || Math.abs(d) > 12) continue;
      return {
        eq: `${a}(${ex([1, L], [b, ""])}) = ${c}(${ex([1, L], [d, ""])})`, sol: s,
        methode: `on développe les deux membres : $${ex([a, L], [a * b, ""])} = ${ex([c, L], [c * d, ""])}$, puis on regroupe.`,
        calcul: resolutionDeuxMembres(a, a * b, c, c * d, s, L),
      };
    }
    return null;
  },
  (L, s) => {
    const a = randomInt(2, 6), c = randomInt(1, 5), b = randomInt(5, 20), d = b - (a + c) * s;
    return {
      eq: `${ex([b, ""], [-a, L])} = ${ex([c, L], [d, ""])}`, sol: s,
      methode: `on regroupe les termes en $${L}$ d’un côté et les nombres de l’autre.`,
      calcul: resolutionDeuxMembres(-a, b, c, d, s, L),
    };
  },
  (L, s) => {
    const a = randomInt(2, 6), c = randomInt(1, 5), b = randomInt(1, 10), d = (a + c) * s + b;
    return {
      eq: `${ex([a, L], [b, ""])} = ${ex([d, ""], [-c, L])}`, sol: s,
      methode: `on regroupe les termes en $${L}$ d’un côté et les nombres de l’autre.`,
      calcul: resolutionDeuxMembres(a, b, -c, d, s, L),
    };
  },
  (L, s) => {
    const paires: [number, number][] = [[2.5, 0.5], [3.5, 1.5], [1.5, 0.5], [3.5, 0.5], [2.5, 1.5], [0.5, 2.5], [1.5, 3.5]];
    const [a, c] = randomChoice(paires), b = randomInt(1, 9), d = (a - c) * s + b;
    return { eq: `${ex([a, L], [b, ""])} = ${ex([c, L], [d, ""])}`, sol: s, methode: `on regroupe les termes en $${L}$ d’un côté et les nombres de l’autre.`, calcul: resolutionDeuxMembres(a, b, c, d, s, L) };
  },
  (L, s) => {
    const a = randomInt(2, 5), c0 = randomInt(1, 4), b = randomInt(1, 9);
    let e = randomInt(1, 8);
    if (e === a + c0) e++;
    const k = a + c0, d = (k - e) * s + b;
    return {
      eq: `${a}${L} + ${b} + ${ex([c0, L])} = ${ex([e, L], [d, ""])}`, sol: s,
      methode: `on réduit le membre de gauche : $${ex([k, L], [b, ""])}$, puis on regroupe les termes en $${L}$.`,
      calcul: resolutionDeuxMembres(k, b, e, d, s, L),
    };
  },
];

function deuxMembres(L: string, s: number): FormeR {
  for (;;) {
    const f = randomChoice(DEUX_MEMBRES)(L, s);
    if (f) return f;
  }
}

/** Une question « résoudre » à partir d'une table de formes. */
function questionResoudre(formes: ((L: string) => FormeR)[]): Q {
  const L = lettre();
  const f = randomChoice(formes)(L);
  return {
    text: randomChoice(RESOUDRE)(f.eq, L),
    format: "short",
    expected: attendu(f.sol),
    comparator: "number_equal",
    explanation: explRes(L, f),
  };
}

// ---------- résoudre_simple : quelques situations courtes ----------

function situationSimple(): Q {
  const L = lettre();
  const q = randomChoice(PRENOMS);
  const cas: (() => { text: string; f: FormeR })[] = [
    () => {
      const s = randomInt(-8, 12), b = randomInt(2, 12), c = s + b;
      const eq = `${L} + ${b} = ${nb(c)}`;
      return {
        text: `Le matin, il faisait $${L}$ °C. Dans la journée, la température a monté de ${b} °C pour atteindre $${nb(c)}$ °C. On a donc $${eq}$. Que vaut $${L}$ ?`,
        f: { eq, sol: s, methode: `on soustrait ${b} des deux côtés.`, calcul: `$${L} = ${nb(c)} - ${b} = ${nb(s)}$.` },
      };
    },
    () => {
      const s = randomInt(20, 150), b = randomInt(10, 180), c = s - b;
      const eq = `${L} - ${b} = ${nb(c)}`;
      return {
        text: `Le compte de ${q.nom} affichait $${L}$ €. Après un achat de ${b} €, il affiche $${nb(c)}$ €. On a donc $${eq}$. Combien y avait-il sur le compte avant l’achat ?`,
        f: { eq, sol: s, methode: `on ajoute ${b} aux deux côtés.`, calcul: `$${L} = ${nb(c)} + ${b} = ${s}$.` },
      };
    },
    () => {
      const a = randomInt(3, 9), s = randomInt(6, 24), c = a * s;
      const eq = `${a}${L} = ${c}`;
      return {
        text: `Chaque boîte contient $${L}$ crayons. ${a} boîtes en contiennent ${c} au total, donc $${eq}$. Combien de crayons y a-t-il dans une boîte ?`,
        f: { eq, sol: s, methode: `on divise les deux côtés par ${a}.`, calcul: `$${L} = ${c} \\div ${a} = ${s}$.` },
      };
    },
    () => {
      const s = randomInt(5, 40), b = randomInt(6, 50), c = s - b;
      const eq = `${L} - ${b} = ${nb(c)}`;
      return {
        text: `Dans un jeu, ${q.nom} avait $${L}$ points. ${Il(q)} en perd ${b} et termine avec $${nb(c)}$ points : $${eq}$. Combien de points avait-${il(q)} au départ ?`,
        f: { eq, sol: s, methode: `on ajoute ${b} aux deux côtés.`, calcul: `$${L} = ${nb(c)} + ${b} = ${s}$.` },
      };
    },
    () => {
      const s = 10 * randomInt(5, 60), b = 10 * randomInt(2, 50), c = s + b;
      const eq = `${L} + ${b} = ${c}`;
      return {
        text: `Une balance est en équilibre : d’un côté, un paquet de $${L}$ g et une masse de ${b} g ; de l’autre, ${c} g. On a donc $${eq}$. Quelle est la masse du paquet ?`,
        f: { eq, sol: s, methode: `on soustrait ${b} des deux côtés.`, calcul: `$${L} = ${c} - ${b} = ${s}$.` },
      };
    },
    () => {
      const s = randomInt(-3, 4), b = randomInt(2, 9), c = s + b;
      const eq = `${L} + ${b} = ${c}`;
      return {
        text: `Un ascenseur part de l’étage $${L}$ et monte de ${b} étages : il arrive à l’étage ${c}. On a donc $${eq}$. De quel étage est-il parti ?`,
        f: { eq, sol: s, methode: `on soustrait ${b} des deux côtés.`, calcul: `$${L} = ${c} - ${b} = ${nb(s)}$.` },
      };
    },
    () => {
      const a = randomInt(3, 8), s = randomInt(8, 25), c = a * s;
      const eq = `${a}${L} = ${c}`;
      return {
        text: `${a} amis se partagent équitablement une addition de ${c} €. Chacun paie $${L}$ €, donc $${eq}$. Combien paie chacun ?`,
        f: { eq, sol: s, methode: `on divise les deux côtés par ${a}.`, calcul: `$${L} = ${c} \\div ${a} = ${s}$.` },
      };
    },
  ];
  const { text, f } = randomChoice(cas)();
  return { text, format: "short", expected: attendu(f.sol), comparator: "number_equal", explanation: explRes(L, f) };
}

function genSimple(etoile: 1 | 2): Q {
  if (etoile === 1) return questionResoudre(SIMPLE_1);
  if (Math.random() < 0.3) return situationSimple();
  return questionResoudre([...SIMPLE_1, ...SIMPLE_2, ...SIMPLE_2]);
}

// =========================================================
// RECONNAÎTRE UNE ÉQUATION
// =========================================================

function uneEquation(L: string): string {
  return randomChoice([...SIMPLE_1, ...SIMPLE_2, ...REDUCTION_2, ...DISTRIB_3])(L).eq;
}

function genReconnaitre(etoile: 1 | 2): Q {
  const L = lettre();
  const q = randomChoice(PRENOMS);
  const genre = etoile === 1 ? randomChoice(["laquelle", "inconnue"]) : randomChoice(["oui_non", "oui_non", "membre", "coefficient"]);

  if (genre === "laquelle") {
    const a = randomInt(2, 9), b = randomInt(1, 9), c = a * randomInt(2, 6) + b;
    const formes = [
      { eq: `${a}${L} + ${b} = ${c}`, expr: `${a}${L} + ${b}` },
      { eq: `${a}${L} - ${b} = ${c}`, expr: `${a}${L} - ${b}` },
      { eq: `${c} = ${a}${L} + ${b}`, expr: `${b} + ${a}${L}` },
      { eq: `${a}(${L} + ${b}) = ${c}`, expr: `${a}(${L} + ${b})` },
      { eq: `${ex([a, L], [b, ""])} = ${ex([1, L], [c, ""])}`, expr: `${ex([a, L], [b, ""], [1, L])}` },
    ];
    const { eq, expr } = randomChoice(formes);
    const num = randomChoice([`${a} + ${b} = ${a + b}`, `${a} \\times ${b} = ${a * b}`, `${c} - ${b} = ${c - b}`]);
    const num2 = randomChoice([`${c} - ${b}`, `${a} \\times ${c}`, `${a} + ${b} + ${c}`]);
    const tours = [
      `Laquelle de ces écritures est une équation d’inconnue $${L}$ ?`,
      `Parmi ces écritures, laquelle est une équation d’inconnue $${L}$ ?`,
      `Une seule de ces écritures est une équation d’inconnue $${L}$. Laquelle ?`,
      `Quelle écriture contient à la fois l’inconnue $${L}$ et un signe = ?`,
      `Laquelle de ces écritures est une équation ?`,
      `Repère l’équation parmi ces quatre écritures.`,
    ];
    return {
      text: randomChoice(tours),
      format: "qcm",
      choices: qcm(`$${eq}$`, [`$${expr}$`, `$${num}$`, `$${num2}$`]),
      expected: [`$${eq}$`],
      comparator: "mcq_exact",
      explanation:
        "Définition : une équation est une égalité (un signe =) qui contient une inconnue.\n\n" +
        "Méthode : on cherche l’écriture qui a à la fois une lettre et un signe =.\n\n" +
        `Calcul : $${expr}$ n’a pas de signe = ; $${num}$ est une égalité sans inconnue ; $${eq}$ contient l’inconnue $${L}$ et un signe =.\n\n` +
        `Conclusion : l’équation est $${eq}$.`,
    };
  }

  if (genre === "inconnue") {
    const eq = uneEquation(L);
    const nombres = [...new Set(eq.match(/\d+(?:\{,\}\d+)?/g) ?? [])];
    while (nombres.length < 3) {
      const n = String(randomInt(2, 20));
      if (!nombres.includes(n)) nombres.push(n);
    }
    const tours = [
      `Dans l’équation $${eq}$, quelle est l’inconnue ?`,
      `Quelle est l’inconnue de l’équation $${eq}$ ?`,
      `On veut résoudre $${eq}$. Quelle lettre désigne l’inconnue ?`,
      `${q.nom} doit résoudre $${eq}$. Quelle est l’inconnue ?`,
    ];
    return {
      text: randomChoice(tours),
      format: "qcm",
      choices: qcm(`$${L}$`, melanger(nombres).slice(0, 3).map((n) => `$${n}$`)),
      expected: [`$${L}$`],
      comparator: "mcq_exact",
      explanation:
        "Définition : l’inconnue est la lettre dont on cherche la valeur.\n\n" +
        "Méthode : on repère la lettre dans l’équation ; les nombres sont connus.\n\n" +
        `Calcul : dans $${eq}$, la seule lettre est $${L}$.\n\n` +
        `Conclusion : l’inconnue est $${L}$.`,
    };
  }

  if (genre === "oui_non") {
    const eq = uneEquation(L);
    const [g] = eq.split(" = ");
    const a = randomInt(2, 9), b = randomInt(2, 9);
    const sorte = randomChoice(["equation", "equation", "expression", "expression", "numerique"]);
    const ecriture = sorte === "equation" ? eq : sorte === "expression" ? g : `${a} \\times ${b} = ${a * b}`;
    const oui = sorte === "equation";
    const tours = [
      { t: `L’écriture $${ecriture}$ est-elle une équation ?`, rep: oui },
      { t: `$${ecriture}$ : est-ce une équation ?`, rep: oui },
      { t: `Peut-on dire que $${ecriture}$ est une équation ?`, rep: oui },
      { t: `${q.nom} affirme que $${ecriture}$ est une équation. A-t-${il(q)} raison ?`, rep: oui },
    ];
    const tr = randomChoice(tours);
    const raison =
      sorte === "equation"
        ? `$${ecriture}$ contient l’inconnue $${L}$ et un signe =`
        : sorte === "expression"
          ? `$${ecriture}$ ne contient pas de signe = : c’est seulement une expression`
          : `$${ecriture}$ est une égalité, mais sans inconnue : c’est une égalité entre nombres`;
    return {
      text: tr.t,
      format: "qcm",
      choices: ["oui", "non"],
      expected: [tr.rep ? "oui" : "non"],
      comparator: "mcq_exact",
      explanation:
        "Définition : une équation est une égalité qui contient une inconnue.\n\n" +
        "Méthode : on vérifie qu’il y a un signe = ET une lettre.\n\n" +
        `Calcul : ${raison}.\n\n` +
        `Conclusion : ${tr.rep ? "oui, c’est une équation" : "non, ce n’est pas une équation"}.`,
    };
  }

  if (genre === "membre") {
    const eq = uneEquation(L);
    const [g, d] = eq.split(" = ");
    const premier = Math.random() < 0.5;
    const nom = premier ? "premier" : "second";
    const tours = [
      `Dans l’équation $${eq}$, quel est le ${nom} membre ?`,
      `Quel est le ${nom} membre de l’équation $${eq}$ ?`,
      `Repère le ${nom} membre de l’équation $${eq}$.`,
    ];
    const bonne = premier ? g : d;
    return {
      text: randomChoice(tours),
      format: "qcm",
      choices: qcm(`$${bonne}$`, [`$${premier ? d : g}$`, `$${L}$`, `$${eq}$`]),
      expected: [`$${bonne}$`],
      comparator: "mcq_exact",
      explanation:
        "Définition : le premier membre est à gauche du signe =, le second membre à droite.\n\n" +
        "Méthode : on coupe l’équation au signe =.\n\n" +
        `Calcul : à gauche, $${g}$ ; à droite, $${d}$.\n\n` +
        `Conclusion : le ${nom} membre est $${bonne}$.`,
    };
  }

  // coefficient
  const a = randomInt(2, 9);
  let b = randomInt(1, 12);
  if (b === a) b++;
  let c = a * randomInt(2, 8) + b;
  if (c === a || c === b) c += a;
  const eq = randomChoice([`${a}${L} + ${b} = ${c}`, `${b} + ${a}${L} = ${c}`, `${c} = ${a}${L} + ${b}`]);
  const tours = [
    `Dans l’équation $${eq}$, quel est le coefficient de $${L}$ ?`,
    `Quel nombre multiplie l’inconnue $${L}$ dans $${eq}$ ?`,
    `Dans $${eq}$, par quel nombre l’inconnue est-elle multipliée ?`,
  ];
  return {
    text: randomChoice(tours),
    format: "qcm",
    choices: qcm(`$${a}$`, [`$${b}$`, `$${c}$`, `$${a + b}$`]),
    expected: [`$${a}$`],
    comparator: "mcq_exact",
    explanation:
      "Définition : le coefficient de l’inconnue est le nombre qui la multiplie.\n\n" +
      `Méthode : $${a}${L}$ signifie $${a} \\times ${L}$.\n\n` +
      `Calcul : dans $${eq}$, $${L}$ est multiplié par ${a}.\n\n` +
      `Conclusion : le coefficient de $${L}$ est ${a}.`,
  };
}

// =========================================================
// TRADUIRE EN ÉQUATION
// =========================================================

type Traduction = { phrase: string; eq: string; faux: string[]; contexte?: boolean };

const VERBES = ["vaut", "est égal à", "donne", "fait"];

function multDe(a: number, L: string): string {
  return MULT[a] ? `${MULT[a]} de $${L}$` : `le produit de ${a} par $${L}$`;
}

/** « est égal au triple de x », « est égal à 5 ». */
const au = (s: string) => (s.startsWith("le ") ? "au " + s.slice(3) : "à " + s);

function traduction(etoile: 2 | 3, L: string): Traduction {
  // Le verbe s'accorde avec le sujet : « la somme … est égale à », « le double … est égal à ».
  const verbe = (f: boolean) => {
    const v0 = randomChoice(VERBES);
    return f && v0 === "est égal à" ? "est égale à" : v0;
  };
  const v = verbe(false), vf = verbe(true);
  // a ≤ 4 : « le double / triple / quadruple de x augmenté de 3 » se lit sans ambiguïté
  // (« le produit de 5 par y augmenté de 3 » pourrait se lire 5(y + 3)).
  const a = randomInt(2, 4), a6 = randomInt(2, 6), b = randomInt(2, 9), s = randomInt(1, 10);
  const q = randomChoice(PRENOMS);
  const k2: (() => Traduction)[] = [
    () => {
      const c = a * s + b;
      return { phrase: `${multDe(a, L)} ${randomChoice(["augmenté de", "plus"])} ${b} ${v} ${c}`, eq: `${a}${L} + ${b} = ${c}`, faux: [`${a} + ${L} + ${b} = ${c}`, `${a}${L} - ${b} = ${c}`, `${a}(${L} + ${b}) = ${c}`, `${L} + ${a * b} = ${c}`] };
    },
    () => {
      const c = a * (s + b) - b;
      return { phrase: `${multDe(a, L)} ${randomChoice(["diminué de", "moins"])} ${b} ${v} ${c}`, eq: `${a}${L} - ${b} = ${c}`, faux: [`${a}${L} + ${b} = ${c}`, `${a}(${L} - ${b}) = ${c}`, `${b} - ${a}${L} = ${c}`] };
    },
    () => {
      const c = s + b;
      return { phrase: `la somme de $${L}$ et de ${b} ${vf} ${c}`, eq: `${L} + ${b} = ${c}`, faux: [`${b}${L} = ${c}`, `${L} - ${b} = ${c}`, `${L} = ${b} + ${c}`] };
    },
    () => {
      const c = s + 1;
      return { phrase: `la différence entre $${L}$ et ${b} ${vf} ${c}`, eq: `${L} - ${b} = ${c}`, faux: [`${L} + ${b} = ${c}`, `${b} - ${L} = ${c}`, `${b}${L} = ${c}`] };
    },
    () => {
      const c = a6 * s;
      return { phrase: `${multDe(a6, L)} ${v} ${c}`, eq: `${a6}${L} = ${c}`, faux: [`${L} + ${a6} = ${c}`, `\\frac{${L}}{${a6}} = ${c}`, `${L} = ${a6 * c}`] };
    },
    () => {
      const c = s + 2;
      return { phrase: `la moitié de $${L}$ ${vf} ${c}`, eq: `\\frac{${L}}{2} = ${c}`, faux: [`2${L} = ${c}`, `${L} - 2 = ${c}`, `\\frac{2}{${L}} = ${c}`] };
    },
    () => {
      const c = s + 3;
      return { phrase: `$${L}$ ${randomChoice(["augmenté de", "plus"])} ${b} ${v} ${c}`, eq: `${L} + ${b} = ${c}`, faux: [`${b}${L} = ${c}`, `${L} - ${b} = ${c}`, `${L} + ${c} = ${b}`] };
    },
    () => {
      const bb = b + 10, c = randomInt(1, bb - 1);
      return { phrase: `${bb} moins $${L}$ ${v} ${c}`, eq: `${bb} - ${L} = ${c}`, faux: [`${L} - ${bb} = ${c}`, `${bb} + ${L} = ${c}`, `${bb}${L} = ${c}`] };
    },
    () => {
      const c = s + b + 2;
      return {
        phrase: `un sac contient $${L}$ billes ; on en ajoute ${b} et on en compte alors ${c}`,
        eq: `${L} + ${b} = ${c}`, faux: [`${b}${L} = ${c}`, `${L} - ${b} = ${c}`, `${L} + ${c} = ${b}`], contexte: true,
      };
    },
    () => {
      const c = 3 * s;
      return {
        phrase: `un triangle équilatéral de côté $${L}$ cm a un périmètre de ${c} cm`,
        eq: `3${L} = ${c}`, faux: [`${L} + 3 = ${c}`, `${L}^2 = ${c}`, `\\frac{${L}}{3} = ${c}`], contexte: true,
      };
    },
    () => {
      const c = s + b + 10;
      return {
        phrase: `${q.nom} a $${L}$ ans ; dans ${b} ans, ${il(q)} aura ${c} ans`,
        eq: `${L} + ${b} = ${c}`, faux: [`${L} - ${b} = ${c}`, `${b}${L} = ${c}`, `${L} = ${b} + ${c}`], contexte: true,
      };
    },
  ];
  const k3: (() => Traduction)[] = [
    () => {
      const c = a * (s + b);
      const w = MULT[a] ? `${MULT[a]} de la somme de $${L}$ et de ${b}` : `${a} fois la somme de $${L}$ et de ${b}`;
      return { phrase: `${w} ${v} ${c}`, eq: `${a}(${L} + ${b}) = ${c}`, faux: [`${a}${L} + ${b} = ${c}`, `${a} + ${L} + ${b} = ${c}`, `${L} + ${a * b} = ${c}`] };
    },
    () => {
      const c = a * (s + 1);
      const w = MULT[a] ? `${MULT[a]} de la différence entre $${L}$ et ${b}` : `${a} fois la différence entre $${L}$ et ${b}`;
      return { phrase: `${w} ${v} ${c}`, eq: `${a}(${L} - ${b}) = ${c}`, faux: [`${a}${L} - ${b} = ${c}`, `${a}(${L} + ${b}) = ${c}`, `${L} - ${a * b} = ${c}`] };
    },
    () => ({
      phrase: `$${L}$ augmenté de ${b} est égal ${au(multDe(a6, L))}`,
      eq: `${L} + ${b} = ${a6}${L}`, faux: [`${a6}${L} + ${b} = ${L}`, `${L} + ${a6}${L} = ${b}`, `${L} + ${b} = ${a6}`],
    }),
    () => {
      let c = randomInt(2, 4);
      if (c === a) c = a === 2 ? 3 : 2;
      let d = randomInt(1, 12);
      if (d === b) d++;
      return {
        phrase: `${multDe(a, L)} augmenté de ${b} est égal ${au(multDe(c, L))} augmenté de ${d}`,
        eq: `${a}${L} + ${b} = ${c}${L} + ${d}`, faux: [`${a}${L} + ${d} = ${c}${L} + ${b}`, `${a}(${L} + ${b}) = ${c}(${L} + ${d})`, `${a}${L} - ${b} = ${c}${L} - ${d}`],
      };
    },
    () => {
      const c = (a + 1) * s;
      const son = MULT[a] ? MULT[a].replace("le ", "son ") : `${a} fois ce nombre`;
      return { phrase: `la somme de $${L}$ et de ${son} ${vf} ${c}`, eq: `${L} + ${a}${L} = ${c}`, faux: [`${a}${L} = ${c}`, `${L} + ${a} = ${c}`, `${L} + ${a}${L} = ${c + a}`] };
    },
    () => {
      const c = 3 * s + 3;
      return {
        phrase: `la somme de trois nombres entiers consécutifs, dont le plus petit est $${L}$, ${vf} ${c}`,
        eq: `${L} + (${L} + 1) + (${L} + 2) = ${c}`, faux: [`3${L} = ${c}`, `${L} + 3 = ${c}`, `${L} + 1 + ${L} + 2 = ${c}`],
      };
    },
    () => {
      const d = randomInt(1, 9), m = b + 1, c = m * (s + 2) - d;
      return { phrase: `le produit de $${L}$ par ${m}, diminué de ${d}, ${v} ${c}`, eq: `${m}${L} - ${d} = ${c}`, faux: [`${m}(${L} - ${d}) = ${c}`, `${m}${L} + ${d} = ${c}`, `${L} - ${m * d} = ${c}`] };
    },
    () => {
      const pr = randomChoice([2, 3, 4, 5]), st = randomInt(1, 4), c = a * pr + st;
      return {
        phrase: `${q.nom} achète ${a} cahiers à $${L}$ € l’un et un stylo à ${st} € ; ${il(q)} paie ${c} €`,
        eq: `${a}${L} + ${st} = ${c}`, faux: [`${a} + ${L} + ${st} = ${c}`, `${a}(${L} + ${st}) = ${c}`, `${L} + ${st} = ${c}`], contexte: true,
      };
    },
    () => {
      const lg = s + randomInt(3, 10), c = 2 * (s + lg);
      return {
        phrase: `un rectangle de largeur $${L}$ cm et de longueur ${lg} cm a un périmètre de ${c} cm`,
        eq: `2(${L} + ${lg}) = ${c}`, faux: [`${L} + ${lg} = ${c}`, `${lg}${L} = ${c}`, `2${L} + ${lg} = ${c}`], contexte: true,
      };
    },
    () => {
      const F = randomInt(10, 40), pr = randomInt(3, 9), T = F + pr * (s + 3);
      return {
        phrase: `un club demande ${F} € d’inscription puis ${pr} € par séance ; pour $${L}$ séances, on paie ${T} €`,
        eq: `${pr}${L} + ${F} = ${T}`, faux: [`${F}${L} + ${pr} = ${T}`, `${pr}(${L} + ${F}) = ${T}`, `${pr} + ${F} + ${L} = ${T}`], contexte: true,
      };
    },
  ];
  return randomChoice(etoile === 2 ? k2 : k3)();
}

function genTraduire(etoile: 2 | 3, enQcm: boolean): Q {
  const L = lettre();
  const t = traduction(etoile, L);
  const P = t.phrase;
  const Pmaj = P.charAt(0).toUpperCase() + P.slice(1);
  const explication =
    "Définition : traduire, c’est écrire la phrase avec des symboles : l’inconnue, les opérations et le signe =.\n\n" +
    "Méthode : on traduit morceau par morceau (« le double » : × 2, « augmenté de » : +, « vaut » : =) ; une somme multipliée se met entre parenthèses.\n\n" +
    `Calcul : « ${P} » donne $${t.eq}$.\n\n` +
    `Conclusion : l’équation est $${t.eq}$.`;
  if (enQcm) {
    const tours = t.contexte
      ? [`${Pmaj}. Quelle équation traduit cette situation ?`, `${Pmaj}. Laquelle de ces équations correspond à la situation ?`, `${Pmaj}. Choisis l’équation d’inconnue $${L}$ qui convient.`]
      : [`Quelle équation traduit « ${P} » ?`, `Laquelle de ces équations correspond à la phrase « ${P} » ?`, `Choisis l’équation qui traduit : « ${P} ».`];
    return {
      text: randomChoice(tours),
      format: "qcm",
      // ⛔ Un distracteur de même solution que la bonne équation (« 2t = 4 » pour
      // « t + 2 = 4 ») serait juste au fond : on l'écarte.
      choices: qcm(`$${t.eq}$`, t.faux.filter((f) => !expressionsEquivalentes(brut(f), brut(t.eq))).map((f) => `$${f}$`)),
      expected: [`$${t.eq}$`],
      comparator: "mcq_exact",
      explanation: explication,
    };
  }
  const tours = t.contexte
    ? [`${Pmaj}. Écris l’équation qui traduit cette situation.`, `${Pmaj}. Mets cette situation en équation, avec l’inconnue $${L}$.`, `${Pmaj}. Quelle équation d’inconnue $${L}$ peut-on écrire ?`]
    : [`Traduis par une équation : « ${P} ».`, `Écris l’équation qui traduit la phrase « ${P} ».`, `Mets en équation : « ${P} ».`, `Traduire en équation : « ${P} »`];
  return {
    text: randomChoice(tours),
    format: "short",
    expected: [brut(t.eq)],
    comparator: "expression_equivalente",
    explanation: explication,
  };
}

// =========================================================
// VÉRIFIER UNE SOLUTION
// =========================================================

type FormeV = { eq: string; sol: number; G: (k: number) => number; Gt: (k: number) => string; D: (k: number) => number; Dt: ((k: number) => string) | null };

function formeVerif(etoile: 2 | 3 | 4, L: string): FormeV {
  const a = randomInt(2, 7), b = randomInt(1, 12);
  const f2: (() => FormeV)[] = [
    () => { const s = randomInt(1, 12), c = s + b; return { eq: `${L} + ${b} = ${c}`, sol: s, G: (k) => k + b, Gt: (k) => `${p(k)} + ${b}`, D: () => c, Dt: null }; },
    () => { const s = randomInt(1, 12), c = a * s; return { eq: `${a}${L} = ${c}`, sol: s, G: (k) => a * k, Gt: (k) => `${a} \\times ${p(k)}`, D: () => c, Dt: null }; },
    () => { const s = randomInt(1, 10), c = a * s + b; return { eq: `${a}${L} + ${b} = ${c}`, sol: s, G: (k) => a * k + b, Gt: (k) => `${a} \\times ${p(k)} + ${b}`, D: () => c, Dt: null }; },
    () => { const s = randomInt(2, 10), c = a * s - b; return { eq: `${a}${L} - ${b} = ${nb(c)}`, sol: s, G: (k) => a * k - b, Gt: (k) => `${a} \\times ${p(k)} - ${b}`, D: () => c, Dt: null }; },
    () => { const s = b + randomInt(1, 10), c = s - b; return { eq: `${L} - ${b} = ${c}`, sol: s, G: (k) => k - b, Gt: (k) => `${p(k)} - ${b}`, D: () => c, Dt: null }; },
    () => { const s = randomInt(1, 10), c = a * s + b; return { eq: `${c} = ${b} + ${a}${L}`, sol: s, G: () => c, Gt: () => `${c}`, D: (k) => b + a * k, Dt: (k) => `${b} + ${a} \\times ${p(k)}` }; },
  ];
  const f3: (() => FormeV)[] = [
    () => { const s = randomInt(-4, 9), c = a * (s + b); return { eq: `${a}(${L} + ${b}) = ${nb(c)}`, sol: s, G: (k) => a * (k + b), Gt: (k) => `${a} \\times (${nb(k)} + ${b})`, D: () => c, Dt: null }; },
    () => {
      let c = randomInt(1, 6);
      if (c === a) c = a + 1;
      const s = randomInt(-3, 9), d = (a - c) * s + b;
      return { eq: `${ex([a, L], [b, ""])} = ${ex([c, L], [d, ""])}`, sol: s, G: (k) => a * k + b, Gt: (k) => `${a} \\times ${p(k)} + ${b}`, D: (k) => c * k + d, Dt: (k) => (c === 1 ? `${nb(k)}` : `${c} \\times ${p(k)}`) + (d === 0 ? "" : d > 0 ? ` + ${d}` : ` - ${-d}`) };
    },
    () => { const bb = b + 10, s = randomInt(-3, 8), c = bb - a * s; return { eq: `${bb} - ${a}${L} = ${nb(c)}`, sol: s, G: (k) => bb - a * k, Gt: (k) => `${bb} - ${a} \\times ${p(k)}`, D: () => c, Dt: null }; },
    () => { const s = randomInt(-3, 9), c = -a * s + b; return { eq: `-${a}${L} + ${b} = ${nb(c)}`, sol: s, G: (k) => -a * k + b, Gt: (k) => `-${a} \\times ${p(k)} + ${b}`, D: () => c, Dt: null }; },
    () => {
      const c = randomInt(1, a - 1 || 1), s = randomInt(1, 9), d = a * (s - 1) - c * s;
      return { eq: `${a}(${L} - 1) = ${ex([c, L], [d, ""])}`, sol: s, G: (k) => a * (k - 1), Gt: (k) => `${a} \\times (${nb(k)} - 1)`, D: (k) => c * k + d, Dt: (k) => (c === 1 ? `${nb(k)}` : `${c} \\times ${p(k)}`) + (d === 0 ? "" : d > 0 ? ` + ${d}` : ` - ${-d}`) };
    },
  ];
  if (etoile === 2) return randomChoice(f2)();
  if (etoile === 3) return randomChoice(f3)();
  return randomChoice([...f3, ...f3, ...f2])();
}

/** Le calcul « on remplace L par k » d'une forme. */
function remplacer(f: FormeV, k: number, L: string): { txt: string; vrai: boolean } {
  const g = arr(f.G(k)), d = arr(f.D(k));
  const gTxt = f.Gt(k) === nb(g) ? `$${nb(g)}$` : `$${f.Gt(k)} = ${nb(g)}$`;
  const dTxt = f.Dt ? ` et, à droite, $${f.Dt(k)} = ${nb(d)}$` : "";
  const vrai = g === d;
  return {
    txt: `on remplace $${L}$ par $${nb(k)}$ : à gauche, ${gTxt}${dTxt}. ${vrai ? `Les deux membres valent $${nb(g)}$ : l’égalité est vraie.` : `On trouve $${nb(g)}$ d’un côté et $${nb(d)}$ de l’autre : ce n’est pas égal.`}`,
    vrai,
  };
}

function genVerifier(etoile: 2 | 3): Q {
  const L = lettre();
  const f = formeVerif(etoile, L);
  const q = randomChoice(PRENOMS);

  if (Math.random() < 0.25) {
    // QCM : lequel de ces nombres est solution ?
    const s = f.sol;
    const choix = qcm(`$${nb(s)}$`, melanger([s + 1, s - 1, s + 2, s - 2]).map((v) => `$${nb(v)}$`));
    const r = remplacer(f, s, L);
    const tours = [
      `Parmi ces nombres, lequel est solution de $${f.eq}$ ?`,
      `Quel nombre vérifie l’égalité $${f.eq}$ ?`,
      `Lequel de ces nombres est solution de l’équation d’inconnue $${L}$ : $${f.eq}$ ?`,
    ];
    return {
      text: randomChoice(tours),
      format: "qcm",
      choices: choix,
      expected: [`$${nb(s)}$`],
      comparator: "mcq_exact",
      explanation:
        "Définition : une solution est une valeur qui rend l’égalité vraie.\n\n" +
        "Méthode : on teste chaque nombre en remplaçant l’inconnue.\n\n" +
        `Calcul : ${r.txt}\n\n` +
        `Conclusion : $${nb(s)}$ est la solution.`,
    };
  }

  const estSol = Math.random() < 0.5;
  const k = estSol ? f.sol : f.sol + randomChoice([-2, -1, 1, 2]);
  const r = remplacer(f, k, L);
  const tours = [
    `Le nombre $${nb(k)}$ est-il solution de l’équation $${f.eq}$ ?`,
    `$${L} = ${nb(k)}$ est-il solution de $${f.eq}$ ?`,
    `L’égalité $${f.eq}$ est-elle vraie pour $${L} = ${nb(k)}$ ?`,
    `On remplace $${L}$ par $${nb(k)}$ dans $${f.eq}$. L’égalité est-elle vérifiée ?`,
    `${q.nom} affirme que $${nb(k)}$ est solution de $${f.eq}$. A-t-${il(q)} raison ?`,
    `Vérifie si $${nb(k)}$ est une solution de l’équation $${f.eq}$.`,
  ];
  return {
    text: randomChoice(tours),
    format: "qcm",
    choices: ["oui", "non"],
    expected: [r.vrai ? "oui" : "non"],
    comparator: "mcq_exact",
    explanation:
      "Définition : une solution est une valeur qui rend l’égalité vraie.\n\n" +
      "Méthode : on remplace l’inconnue par le nombre proposé et on calcule chaque membre.\n\n" +
      `Calcul : ${r.txt}\n\n` +
      `Conclusion : ${r.vrai ? `oui, $${nb(k)}$ est solution` : `non, $${nb(k)}$ n’est pas solution (la solution est $${nb(f.sol)}$)`}.`,
  };
}

// =========================================================
// PROBLÈMES MIS EN ÉQUATION
// =========================================================

type Probleme = { text: string; sol: number; eq: string; inconnue: string; calcul: string; conclusion: string; prix?: boolean };

function problemes(etoile: 3 | 4 | 5): Probleme {
  const [q, r] = deuxPrenoms();
  const P3: (() => Probleme)[] = [
    () => {
      const a = randomInt(2, 6), b = randomInt(2, 15), s = randomInt(2, 15), c = a * s + b;
      const t = randomChoice([
        `${q.nom} pense à un nombre. ${Il(q)} le multiplie par ${a}, puis ajoute ${b} : ${il(q)} obtient ${c}. Quel est ce nombre ?`,
        `Si l’on ajoute ${b} au produit d’un nombre par ${a}, on obtient ${c}. Quel est ce nombre ?`,
        `${q.nom} choisit un nombre, le multiplie par ${a} et ajoute ${b} au résultat. ${Il(q)} trouve ${c}. Quel nombre ${q.nom} a-t-${il(q)} choisi ?`,
      ]);
      return { text: t, sol: s, eq: `${a}x + ${b} = ${c}`, inconnue: "x le nombre cherché", calcul: finir(a, b, c, s, "x"), conclusion: `le nombre est ${s}` };
    },
    () => {
      const a = randomInt(3, 6), b = randomInt(2, 10), s = randomInt(b, 15), c = a * s - b;
      const t = randomChoice([
        `${q.nom} pense à un nombre. ${Il(q)} le multiplie par ${a}, puis retire ${b} : ${il(q)} obtient ${c}. Quel est ce nombre ?`,
        `Si l’on retranche ${b} au produit d’un nombre par ${a}, on trouve ${c}. Quel est ce nombre ?`,
      ]);
      return { text: t, sol: s, eq: `${a}x - ${b} = ${c}`, inconnue: "x le nombre cherché", calcul: finir(a, -b, c, s, "x"), conclusion: `le nombre est ${s}` };
    },
    () => {
      const b = randomInt(2, 7), a = randomInt(2, 4), s = randomInt(2, 20), c = a * s + b;
      const t = randomChoice([
        `Un taxi facture ${b} € de prise en charge, puis ${a} € par kilomètre. Une course a coûté ${c} €. Combien de kilomètres a-t-on parcourus ?`,
        `Une course en taxi a coûté ${c} €. Le chauffeur compte ${b} € de prise en charge et ${a} € par kilomètre. Quelle distance, en km, a-t-on parcourue ?`,
      ]);
      return { text: t, sol: s, eq: `${a}x + ${b} = ${c}`, inconnue: "x le nombre de kilomètres", calcul: finir(a, b, c, s, "x"), conclusion: `la course fait ${s} km` };
    },
    () => {
      const lieu = randomChoice([
        ["Une salle d’escalade", "séance", "séances"],
        ["Une piscine", "entrée", "entrées"],
        ["Un club de tennis", "heure de court", "heures de court"],
        ["Une patinoire", "entrée", "entrées"],
        ["Un cinéma", "place", "places"],
      ]);
      const F = randomInt(10, 30), pu = randomInt(3, 8), s = randomInt(4, 20), T = F + pu * s;
      const t = randomChoice([
        `${lieu[0]} propose une carte annuelle à ${F} €, puis ${pu} € par ${lieu[1]}. ${q.nom} a dépensé ${T} € cette année. Combien de ${lieu[2]} cela représente-t-il ?`,
        `${q.nom} a payé ${T} € en tout : ${F} € pour la carte annuelle, puis ${pu} € par ${lieu[1]}. Combien de ${lieu[2]} a-t-${il(q)} payées ?`,
      ]);
      return { text: t, sol: s, eq: `${pu}x + ${F} = ${T}`, inconnue: `x le nombre de ${lieu[2]}`, calcul: finir(pu, F, T, s, "x"), conclusion: `cela fait ${s} ${lieu[2]}` };
    },
    () => {
      const E = randomInt(5, 40), e = randomInt(3, 12), s = randomInt(3, 15), T = E + e * s;
      const t = randomChoice([
        `${q.nom} a déjà ${E} € dans sa tirelire. Chaque semaine, ${il(q)} y ajoute ${e} €. Au bout de combien de semaines aura-t-${il(q)} ${T} € ?`,
        `Pour s’offrir un objet à ${T} €, ${q.nom} part de ${E} € d’économies et met ${e} € de côté chaque semaine. Combien de semaines devra-t-${il(q)} attendre ?`,
      ]);
      return { text: t, sol: s, eq: `${e}x + ${E} = ${T}`, inconnue: "x le nombre de semaines", calcul: finir(e, E, T, s, "x"), conclusion: `il faut ${s} semaines` };
    },
    () => {
      const d = randomInt(20, 90), rr = randomInt(2, 9), s = randomInt(5, 30), T = d + rr * s;
      const t = randomChoice([
        `Un récupérateur d’eau de pluie contient déjà ${d} L. Pendant un orage, il se remplit de ${rr} L par minute. Au bout de combien de minutes contiendra-t-il ${T} L ?`,
        `Pendant une averse, une cuve qui contenait ${d} L reçoit ${rr} L d’eau par minute. Elle contient maintenant ${T} L. Combien de minutes l’averse a-t-elle duré ?`,
      ]);
      return { text: t, sol: s, eq: `${rr}x + ${d} = ${T}`, inconnue: "x le nombre de minutes", calcul: finir(rr, d, T, s, "x"), conclusion: `il faut ${s} minutes` };
    },
    () => {
      const a = randomInt(2, 4), s = randomInt(5, 30), T = (a + 1) * s;
      const t = randomChoice([
        `${q.nom} a des billes. ${r.nom} en a ${MULT[a]}. ${ilsDe(q, r) === "elles" ? "Elles" : "Ils"} en ont ${T} à ${ilsDe(q, r) === "elles" ? "elles" : "eux"} deux. Combien de billes a ${q.nom} ?`,
        `${r.nom} possède ${MULT[a]} du nombre de cartes de ${q.nom}. Ensemble, ${ilsDe(q, r)} ont ${T} cartes. Combien de cartes a ${q.nom} ?`,
      ]);
      return { text: t, sol: s, eq: `x + ${a}x = ${T}`, inconnue: `x le nombre d’objets de ${q.nom}`, calcul: `on réduit : $${a + 1}x = ${T}$, donc $x = ${T} \\div ${a + 1} = ${s}$.`, conclusion: `${q.nom} en a ${s}` };
    },
    () => {
      const d = randomInt(2, 8), v = randomInt(3, 5), s = randomInt(2, 6), T = d + v * s;
      const t = randomChoice([
        `Un randonneur a déjà parcouru ${d} km. Il marche ensuite à ${v} km/h. Au bout de combien d’heures aura-t-il parcouru ${T} km en tout ?`,
        `Sur un sentier de ${T} km, une randonneuse a déjà fait ${d} km. Elle avance à ${v} km/h. Combien d’heures lui faut-il encore ?`,
      ]);
      return { text: t, sol: s, eq: `${v}x + ${d} = ${T}`, inconnue: "x le nombre d’heures", calcul: finir(v, d, T, s, "x"), conclusion: `il faut ${s} heures` };
    },
    () => {
      const L0 = randomInt(8, 15), a = randomInt(2, 4), s = randomInt(2, 8), T = L0 + a * s;
      const t = randomChoice([
        `Un ressort mesure ${L0} cm au repos. Chaque masse de 50 g accrochée l’allonge de ${a} cm. Avec plusieurs masses, il mesure ${T} cm. Combien de masses a-t-on accrochées ?`,
        `En cours de physique, un ressort de ${L0} cm s’allonge de ${a} cm par masse de 50 g. Il mesure maintenant ${T} cm. Combien de masses porte-t-il ?`,
      ]);
      return { text: t, sol: s, eq: `${a}x + ${L0} = ${T}`, inconnue: "x le nombre de masses", calcul: finir(a, L0, T, s, "x"), conclusion: `on a accroché ${s} masses` };
    },
    () => {
      const h = randomInt(10, 30), g = randomInt(3, 8), s = randomInt(2, 8), T = h + g * s;
      const t = randomChoice([
        `Un plant de tomate mesure ${h} cm. Il grandit de ${g} cm par semaine. Dans combien de semaines mesurera-t-il ${T} cm ?`,
        `Au jardin, un tournesol de ${h} cm pousse de ${g} cm chaque semaine. Au bout de combien de semaines atteindra-t-il ${T} cm ?`,
      ]);
      return { text: t, sol: s, eq: `${g}x + ${h} = ${T}`, inconnue: "x le nombre de semaines", calcul: finir(g, h, T, s, "x"), conclusion: `il faut ${s} semaines` };
    },
    () => {
      const F = randomInt(5, 15), pu = randomInt(8, 20), s = randomInt(2, 6), T = F + pu * s;
      const t = randomChoice([
        `Un groupe de musique loue un studio de répétition : ${F} € de frais de réservation, puis ${pu} € par heure. La note s’élève à ${T} €. Combien d’heures ont-ils répété ?`,
        `Un studio d’enregistrement compte ${F} € de réservation et ${pu} € de l’heure. Une chorale a payé ${T} €. Combien d’heures a duré la séance ?`,
      ]);
      return { text: t, sol: s, eq: `${pu}x + ${F} = ${T}`, inconnue: "x le nombre d’heures", calcul: finir(pu, F, T, s, "x"), conclusion: `cela fait ${s} heures` };
    },
    () => {
      const F = randomInt(8, 20), pu = randomInt(2, 5), s = randomInt(2, 10), T = F + pu * s;
      const t = randomChoice([
        `Un forfait mobile coûte ${F} € par mois, plus ${pu} € par Go supplémentaire. Ce mois-ci, la facture est de ${T} €. Combien de Go supplémentaires ont été consommés ?`,
        `La facture de téléphone de ${q.nom} s’élève à ${T} € : ${F} € d’abonnement et ${pu} € par Go en plus du forfait. Combien de Go en plus a-t-${il(q)} utilisés ?`,
      ]);
      return { text: t, sol: s, eq: `${pu}x + ${F} = ${T}`, inconnue: "x le nombre de Go supplémentaires", calcul: finir(pu, F, T, s, "x"), conclusion: `${s} Go supplémentaires` };
    },
    () => {
      const pu = randomInt(1, 3), an = randomInt(2, 4), s = randomInt(3, 12), T = pu * s + an;
      return {
        text: `Au marché de Saint-Pierre, ${q.nom} achète des mangues à ${pu} € pièce et un ananas à ${an} €. ${Il(q)} paie ${T} €. Combien de mangues a-t-${il(q)} achetées ?`,
        sol: s, eq: `${ex([pu, "x"])} + ${an} = ${T}`, inconnue: "x le nombre de mangues", calcul: finir(pu, an, T, s, "x"), conclusion: `${s} mangues`,
      };
    },
  ];
  const P4: (() => Probleme)[] = [
    () => {
      const lien = randomChoice([
        { son: "son frère", le: "du frère", f: false },
        { son: "sa sœur", le: "de la sœur", f: true },
        { son: "son cousin", le: "du cousin", f: false },
        { son: "sa cousine", le: "de la cousine", f: true },
      ]);
      const a = randomInt(2, 6), s = randomInt(5, 14), S = 2 * s + a;
      const eux = q.f && lien.f ? "elles" : "eux";
      const ils = q.f && lien.f ? "elles" : "ils";
      const t = randomChoice([
        `${q.nom} a ${a} ans de plus que ${lien.son}. À ${eux} deux, ${ils} ont ${S} ans. Quel âge a ${lien.son} ?`,
        `La somme des âges de ${q.nom} et de ${lien.son} est ${S} ans. ${q.nom} est l’aîné${q.f ? "e" : ""}, de ${a} ans. Quel est l’âge ${lien.le} ?`,
      ]);
      return { text: t, sol: s, eq: `x + (x + ${a}) = ${S}`, inconnue: `x l’âge ${lien.le}`, calcul: `on réduit : $2x + ${a} = ${S}$, donc $2x = ${S - a}$, puis $x = ${s}$.`, conclusion: `${lien.son} a ${s} ans` };
    },
    () => {
      const duo = randomChoice([
        ["Une mère", "de la mère", "son fils", "du fils"],
        ["Un grand-père", "du grand-père", "sa petite-fille", "de la petite-fille"],
        ["Une tante", "de la tante", "son neveu", "du neveu"],
        ["Un père", "du père", "sa fille", "de la fille"],
      ]);
      const k = randomInt(3, 5), s = randomInt(6, 14), S = (k + 1) * s;
      const mot = k === 3 ? "le triple" : k === 4 ? "le quadruple" : "cinq fois";
      const t = randomChoice([
        `${duo[0]} a ${mot} de l’âge de ${duo[2]}. À eux deux, ils ont ${S} ans. Quel est l’âge ${duo[3]} ?`,
        `La somme des âges ${duo[1]} et ${duo[3]} vaut ${S} ans ; l’âge de l’adulte est ${mot} de celui de l’enfant. Quel est l’âge ${duo[3]} ?`,
      ]);
      return { text: t, sol: s, eq: `x + ${k}x = ${S}`, inconnue: `x l’âge ${duo[3]}`, calcul: `on réduit : $${k + 1}x = ${S}$, donc $x = ${S} \\div ${k + 1} = ${s}$.`, conclusion: `l’âge ${duo[3]} est ${s} ans` };
    },
    () => {
      const obj = randomChoice([["d’un jardin", "m", 4, 20], ["d’un cadre photo", "cm", 10, 30], ["d’un tapis", "cm", 60, 120], ["d’un potager", "m", 2, 8], ["d’une piscine", "m", 4, 10], ["d’un terrain de jeu", "m", 10, 30]] as [string, string, number, number][]);
      const a = randomInt(2, 12), s = randomInt(obj[2], obj[3]), P = 4 * s + 2 * a;
      const t = randomChoice([
        `La longueur ${obj[0]} rectangulaire dépasse sa largeur de ${a} ${obj[1]}. Son périmètre est de ${P} ${obj[1]}. Quelle est sa largeur ?`,
        `Le périmètre ${obj[0]} rectangulaire mesure ${P} ${obj[1]}, et sa longueur mesure ${a} ${obj[1]} de plus que sa largeur. Calcule sa largeur.`,
      ]);
      return { text: t, sol: s, eq: `2(x + x + ${a}) = ${P}`, inconnue: `x la largeur en ${obj[1]}`, calcul: `on développe et on réduit : $4x + ${2 * a} = ${P}$, donc $4x = ${P - 2 * a}$, puis $x = ${P - 2 * a} \\div 4 = ${s}$.`, conclusion: `la largeur est ${s} ${obj[1]}` };
    },
    () => {
      const b = randomInt(4, 12), s = randomInt(Math.floor(b / 2) + 1, 15), P = 2 * s + b;
      const t = randomChoice([
        `Un triangle isocèle a une base de ${b} cm et un périmètre de ${P} cm. Quelle est la longueur de chacun des deux côtés égaux ?`,
        `Un panneau triangulaire isocèle a un périmètre de ${P} dm ; sa base mesure ${b} dm. Combien mesure chacun des deux autres côtés ?`,
      ]);
      const u = t.includes(" dm") ? "dm" : "cm";
      return { text: t, sol: s, eq: `2x + ${b} = ${P}`, inconnue: `x la longueur d’un côté égal, en ${u}`, calcul: finir(2, b, P, s, "x"), conclusion: `chaque côté égal mesure ${s} ${u}` };
    },
    () => {
      const d = randomInt(2, 20), s = randomInt(10, 60), S = 2 * s + d;
      const quoi = randomChoice(["une cagnotte de", "un gain de", "une prime de"]);
      const t = randomChoice([
        `${q.nom} et ${r.nom} se partagent ${quoi} ${S} €. ${r.nom} reçoit ${d} € de plus que ${q.nom}. Combien reçoit ${q.nom} ?`,
        `On partage ${S} € entre ${q.nom} et ${r.nom}, de sorte que ${r.nom} ait ${d} € de plus. Quelle est la part de ${q.nom} ?`,
      ]);
      return { text: t, sol: s, eq: `x + (x + ${d}) = ${S}`, inconnue: `x la part de ${q.nom}`, calcul: `on réduit : $2x + ${d} = ${S}$, donc $2x = ${S - d}$, puis $x = ${s}$.`, conclusion: `${q.nom} reçoit ${s} €` };
    },
    () => {
      const s = randomInt(5, 40), S = 3 * s + 3;
      const grand = Math.random() < 0.5;
      const t = randomChoice([
        `La somme de trois nombres entiers consécutifs est ${S}. Quel est le ${grand ? "plus grand" : "plus petit"} de ces nombres ?`,
        `Trois entiers qui se suivent ont pour somme ${S}. Quel est le ${grand ? "plus grand" : "plus petit"} des trois ?`,
      ]);
      return { text: t, sol: grand ? s + 2 : s, eq: `x + (x + 1) + (x + 2) = ${S}`, inconnue: "x le plus petit des trois nombres", calcul: `on réduit : $3x + 3 = ${S}$, donc $3x = ${S - 3}$, puis $x = ${s}$.`, conclusion: grand ? `les nombres sont ${s}, ${s + 1} et ${s + 2} : le plus grand est ${s + 2}` : `le plus petit est ${s}` };
    },
    () => {
      const objet = randomChoice([
        ["cahiers identiques", "une trousse", "d’un cahier", "un cahier"],
        ["croissants", "une baguette", "d’un croissant", "un croissant"],
        ["tickets de bus", "une carte de transport", "d’un ticket", "un ticket"],
        ["places de cinéma", "un paquet de pop-corn", "d’une place", "une place"],
      ]);
      const n = randomInt(3, 6), pu = randomChoice([1.5, 2, 2.5, 3, 3.5, 4, 1.2, 0.9]), t0 = randomChoice([1.5, 2, 3, 4.5, 1.2]), T = arr(n * pu + t0);
      const t = randomChoice([
        `${q.nom} achète ${n} ${objet[0]} et ${objet[1]} à ${euros(t0)} €. ${Il(q)} paie ${euros(T)} €. Quel est le prix ${objet[2]}, en € ?`,
        `Pour ${n} ${objet[0]} et ${objet[1]} à ${euros(t0)} €, ${q.nom} a payé ${euros(T)} €. Combien coûte ${objet[3]} ?`,
      ]);
      return { text: t, sol: pu, eq: `${n}x + ${nb(t0)} = ${nb(T)}`, inconnue: `x le prix ${objet[2]}, en €`, calcul: finir(n, t0, T, pu, "x"), conclusion: `le prix ${objet[2]} est ${euros(pu)} €`, prix: true };
    },
    () => {
      const a = randomInt(2, 8), s = randomInt(12, 25), T = 2 * s - a;
      const t = randomChoice([
        `Une chorale compte ${T} choristes. Il y a ${a} garçons de moins que de filles. Combien y a-t-il de filles ?`,
        `Dans un orchestre de ${T} musiciens, les filles sont ${a} de plus que les garçons. Combien y a-t-il de filles ?`,
      ]);
      return { text: t, sol: s, eq: `x + (x - ${a}) = ${T}`, inconnue: "x le nombre de filles", calcul: `on réduit : $2x - ${a} = ${T}$, donc $2x = ${T + a}$, puis $x = ${s}$.`, conclusion: `il y a ${s} filles` };
    },
    () => {
      const a = randomInt(2, 5), b = randomInt(2, 9), s = randomInt(2, 12), c = a * (s + b);
      const t = randomChoice([
        `${q.nom} ajoute ${b} à un nombre, puis multiplie le résultat par ${a}. ${Il(q)} obtient ${c}. Quel était le nombre de départ ?`,
        `Si l’on multiplie par ${a} la somme d’un nombre et de ${b}, on obtient ${c}. Quel est ce nombre ?`,
      ]);
      return { text: t, sol: s, eq: `${a}(x + ${b}) = ${c}`, inconnue: "x le nombre de départ", calcul: `on divise par ${a} : $x + ${b} = ${c / a}$, donc $x = ${s}$.`, conclusion: `le nombre est ${s}` };
    },
    () => {
      const d = randomInt(1, 9), s = randomInt(5, 20), S = 4 * s + d;
      const quoi = randomChoice(["bonbons", "billes", "images", "timbres"]);
      return {
        text: `On partage ${S} ${quoi} entre trois enfants. Le deuxième en reçoit le double du premier, et le troisième ${d} de plus que le premier. Combien en reçoit le premier ?`,
        sol: s, eq: `x + 2x + (x + ${d}) = ${S}`, inconnue: "x la part du premier enfant", calcul: `on réduit : $4x + ${d} = ${S}$, donc $4x = ${S - d}$, puis $x = ${s}$.`, conclusion: `le premier reçoit ${s} ${quoi}`,
      };
    },
    () => {
      const d = randomInt(10, 60), s = randomInt(80, 200), T = 4 * s - d;
      return {
        text: `Une classe collecte des bouchons pour le recyclage. La deuxième semaine, elle en récolte le double de la première ; la troisième, ${d} de moins que la première. En tout : ${T} bouchons. Combien en a-t-elle récolté la première semaine ?`,
        sol: s, eq: `x + 2x + (x - ${d}) = ${T}`, inconnue: "x le nombre de bouchons de la première semaine", calcul: `on réduit : $4x - ${d} = ${T}$, donc $4x = ${T + d}$, puis $x = ${s}$.`, conclusion: `${s} bouchons la première semaine`,
      };
    },
    () => {
      const d = randomInt(1, 4), s = randomInt(3, 8), T = 4 * s + d;
      return {
        text: `${q.nom} s’entraîne pour une course. Mardi, ${il(q)} court ${d} km de plus que lundi ; mercredi, le double de lundi. En trois jours, ${il(q)} a couru ${T} km. Combien de kilomètres a-t-${il(q)} courus lundi ?`,
        sol: s, eq: `x + (x + ${d}) + 2x = ${T}`, inconnue: "x la distance de lundi, en km", calcul: `on réduit : $4x + ${d} = ${T}$, donc $4x = ${T - d}$, puis $x = ${s}$.`, conclusion: `${s} km lundi`,
      };
    },
  ];
  const P5: (() => Probleme)[] = [
    () => {
      const lieu = randomChoice(["à la piscine", "au cinéma", "à la patinoire", "au musée", "à la salle d’escalade"]);
      const q2 = randomInt(2, 6), dlt = randomInt(1, 4), pu = q2 + dlt, s = randomInt(5, 15), F = dlt * s;
      const t = randomChoice([
        `Deux tarifs ${lieu} : sans carte, ${pu} € l’entrée ; avec une carte à ${F} €, ${q2} € l’entrée. Pour combien d’entrées les deux tarifs coûtent-ils le même prix ?`,
        `${lieu.charAt(0).toUpperCase() + lieu.slice(1)}, on paie ${pu} € l’entrée, ou bien ${q2} € l’entrée après avoir acheté une carte à ${F} €. À partir de combien d’entrées les deux formules reviennent-elles au même prix ?`,
      ]);
      return { text: t, sol: s, eq: `${pu}x = ${F} + ${q2}x`, inconnue: "x le nombre d’entrées", calcul: `on soustrait $${q2}x$ des deux côtés : $${ex([dlt, "x"])} = ${F}$` + (dlt === 1 ? "." : `, puis $x = ${F} \\div ${dlt} = ${s}$.`), conclusion: `les deux tarifs sont égaux pour ${s} entrées` };
    },
    () => {
      const objet = randomChoice([["un kayak", "heure", "heures"], ["un vélo électrique", "heure", "heures"], ["un paddle", "heure", "heures"], ["une voiture", "jour", "jours"], ["une trottinette", "heure", "heures"]]);
      const p2 = randomInt(2, 8), dlt = randomInt(1, 5), p1 = p2 + dlt, s = randomInt(2, 10), F1 = randomInt(2, 10), F2 = F1 + dlt * s;
      const t = randomChoice([
        `Pour louer ${objet[0]}, le loueur A demande ${F1} € puis ${p1} € par ${objet[1]} ; le loueur B demande ${F2} € puis ${p2} € par ${objet[1]}. Pour combien d’${objet[2]} les deux loueurs demandent-ils le même prix ?`.replace("d’jours", "de jours"),
        `Location ${objet[0].replace(/^un /, "d’un ").replace(/^une /, "d’une ")} : formule A à ${F1} € plus ${p1} € par ${objet[1]}, formule B à ${F2} € plus ${p2} € par ${objet[1]}. Pour quelle durée les deux formules coûtent-elles autant ?`,
      ]);
      return { text: t, sol: s, eq: `${F1} + ${p1}x = ${F2} + ${p2}x`, inconnue: `x le nombre d’${objet[2]}`.replace("d’jours", "de jours"), calcul: `on soustrait $${p2}x$ et ${F1} des deux côtés : $${ex([dlt, "x"])} = ${F2 - F1}$` + (dlt === 1 ? "." : `, puis $x = ${F2 - F1} \\div ${dlt} = ${s}$.`), conclusion: `les prix sont égaux pour ${s} ${objet[2]}` };
    },
    () => {
      const parent = randomChoice([["son père", "il"], ["sa mère", "elle"], ["son oncle", "il"], ["sa tante", "elle"]]);
      for (;;) {
        const k = randomChoice([2, 3]), f = randomInt(4, 14), s = randomInt(1, 12), A = k * (f + s) - s;
        if (A - f < 20 || A > 60) continue;
        const mot = k === 2 ? "le double" : "le triple";
        const t = randomChoice([
          `${q.nom} a ${f} ans et ${parent[0]} a ${A} ans. Dans combien d’années ${parent[0]} aura-t-${parent[1]} ${mot} de l’âge de ${q.nom} ?`,
          `Aujourd’hui, ${q.nom} a ${f} ans et ${parent[0]} ${A} ans. Dans combien d’années l’âge de ${parent[0]} sera-t-il ${mot} de celui de ${q.nom} ?`,
        ]);
        return { text: t, sol: s, eq: `${A} + x = ${k}(${f} + x)`, inconnue: "x le nombre d’années", calcul: `on développe : $${A} + x = ${k * f} + ${k}x$, puis on soustrait $x$ et ${k * f} : $${A - k * f} = ${ex([k - 1, "x"])}$` + (k === 2 ? `, donc $x = ${s}$.` : `, donc $x = ${A - k * f} \\div ${k - 1} = ${s}$.`), conclusion: `dans ${s} ans` };
      }
    },
    () => {
      const e2 = randomInt(2, 8), dlt = randomInt(1, 6), e1 = e2 + dlt, s = randomInt(3, 15), E1 = randomInt(5, 40), E2 = E1 + dlt * s;
      const t = randomChoice([
        `${q.nom} a ${E1} € et économise ${e1} € par semaine. ${r.nom} a ${E2} € et économise ${e2} € par semaine. Dans combien de semaines auront-${ilsDe(q, r)} la même somme ?`,
        `${r.nom} part de ${E2} € et ajoute ${e2} € chaque semaine ; ${q.nom} part de ${E1} € et ajoute ${e1} € chaque semaine. Au bout de combien de semaines auront-${ilsDe(q, r)} autant d’argent ?`,
      ]);
      return { text: t, sol: s, eq: `${E1} + ${e1}x = ${E2} + ${e2}x`, inconnue: "x le nombre de semaines", calcul: `on soustrait $${e2}x$ et ${E1} des deux côtés : $${ex([dlt, "x"])} = ${E2 - E1}$` + (dlt === 1 ? "." : `, puis $x = ${E2 - E1} \\div ${dlt} = ${s}$.`), conclusion: `dans ${s} semaines` };
    },
    () => {
      const r1 = randomInt(2, 8), r2 = randomInt(2, 8), s = randomInt(3, 15), V1 = randomInt(10, 60), V2 = V1 + (r1 + r2) * s;
      const t = randomChoice([
        `Une cuve contient ${V1} L et se remplit de ${r1} L par minute. Une autre contient ${V2} L et se vide de ${r2} L par minute. Au bout de combien de minutes contiendront-elles la même quantité d’eau ?`,
        `Un bassin de ${V2} L se vide de ${r2} L par minute pendant qu’un autre, qui contient ${V1} L, se remplit de ${r1} L par minute. Quand contiendront-ils autant d’eau ? Réponds en minutes.`,
      ]);
      return { text: t, sol: s, eq: `${V1} + ${r1}x = ${V2} - ${r2}x`, inconnue: "x le nombre de minutes", calcul: `on ajoute $${r2}x$ et on soustrait ${V1} : $${r1 + r2}x = ${V2 - V1}$, donc $x = ${V2 - V1} \\div ${r1 + r2} = ${s}$.`, conclusion: `au bout de ${s} minutes` };
    },
    () => {
      const b = randomInt(1, 3), a = b + randomInt(1, 3), s = randomInt(2, 6), h2 = randomInt(b * s + 3, b * s + 15), h1 = h2 + (a - b) * s;
      const t = randomChoice([
        `Une bougie mesure ${h1} cm et raccourcit de ${a} cm par heure. Une autre mesure ${h2} cm et raccourcit de ${b} cm par heure. Au bout de combien d’heures auront-elles la même hauteur ?`,
        `On allume en même temps deux bougies : l’une de ${h1} cm, qui perd ${a} cm par heure, l’autre de ${h2} cm, qui perd ${b} cm par heure. Quand auront-elles la même taille ? Réponds en heures.`,
      ]);
      return { text: t, sol: s, eq: `${h1} - ${a}x = ${h2} - ${ex([b, "x"])}`, inconnue: "x le nombre d’heures", calcul: `on ajoute $${a}x$ et on soustrait ${h2} : $${h1 - h2} = ${ex([a - b, "x"])}$` + (a - b === 1 ? "." : `, donc $x = ${h1 - h2} \\div ${a - b} = ${s}$.`), conclusion: `au bout de ${s} heures` };
    },
    () => {
      const b = randomInt(3, 15), a = b + randomInt(2, 10), s = randomInt(2, 10), h1 = randomInt(10, 50), h2 = h1 + (a - b) * s;
      const plante = randomChoice([{ nom: "bambous", f: false }, { nom: "tiges de maïs", f: true }, { nom: "tournesols", f: false }, { nom: "lianes", f: true }]);
      const t = randomChoice([
        `Deux ${plante.nom} : ${plante.f ? "l’une" : "l’un"} mesure ${h1} cm et pousse de ${a} cm par jour, l’autre mesure ${h2} cm et pousse de ${b} cm par jour. Au bout de combien de jours auront-${plante.f ? "elles" : "ils"} la même hauteur ?`,
        `Au jardin, ${q.nom} observe deux ${plante.nom}. ${plante.f ? "La première" : "Le premier"} fait ${h1} cm et grandit de ${a} cm par jour ; ${plante.f ? "la seconde" : "le second"} fait ${h2} cm et grandit de ${b} cm par jour. Dans combien de jours ${plante.f ? "seront-elles" : "seront-ils"} aussi ${plante.f ? "hautes" : "hauts"} l’${plante.f ? "une" : "un"} que l’autre ?`,
      ]);
      return { text: t, sol: s, eq: `${h1} + ${a}x = ${h2} + ${b}x`, inconnue: "x le nombre de jours", calcul: `on soustrait $${b}x$ et ${h1} : $${a - b}x = ${h2 - h1}$, donc $x = ${h2 - h1} \\div ${a - b} = ${s}$.`, conclusion: `au bout de ${s} jours` };
    },
    () => {
      const a = randomInt(3, 9), c = randomInt(2, a - 1);
      const s = randomInt(1, 12), b = randomInt(1, 15), d = (a - c) * s + b;
      const t = randomChoice([
        `Si je multiplie un nombre par ${a} et que j’ajoute ${b}, j’obtiens le même résultat qu’en le multipliant par ${c} et en ajoutant ${d}. Quel est ce nombre ?`,
        `${q.nom} remarque que ${a} fois un nombre plus ${b} donne autant que ${c} fois ce nombre plus ${d}. Quel est ce nombre ?`,
      ]);
      return { text: t, sol: s, eq: `${a}x + ${b} = ${ex([c, "x"])} + ${d}`, inconnue: "x le nombre", calcul: resolutionDeuxMembres(a, b, c, d, s, "x"), conclusion: `le nombre est ${s}` };
    },
    () => {
      const F2 = randomInt(5, 15), p2 = randomInt(1, 3), dlt = randomInt(1, 3), p1 = p2 + dlt, s = randomInt(3, 12), F1 = F2 - dlt * s;
      const G = F1 >= 3 ? F1 : F2 + dlt * s;
      const [fa, pa, fb, pb] = F1 >= 3 ? [F1, p1, F2, p2] : [G, p2, F2, p1];
      const t = randomChoice([
        `Forfait A : ${fa} € par mois et ${pa} € par Go consommé. Forfait B : ${fb} € par mois et ${pb} € par Go. Pour combien de Go les deux forfaits coûtent-ils autant ?`,
        `${q.nom} hésite entre deux abonnements mobiles : ${fa} € par mois plus ${pa} € par Go, ou ${fb} € par mois plus ${pb} € par Go. Pour quelle consommation, en Go, paierait-${il(q)} la même somme ?`,
      ]);
      return { text: t, sol: s, eq: `${fa} + ${ex([pa, "x"])} = ${fb} + ${ex([pb, "x"])}`, inconnue: "x le nombre de Go", calcul: resolutionDeuxMembres(pa, fa, pb, fb, s, "x"), conclusion: `pour ${s} Go` };
    },
    () => {
      const q2 = randomInt(1, 2), pu = q2 + 1, s = randomInt(4, 12), F = s;
      const t = randomChoice([
        `Au marché de Saint-Pierre, un marchand vend les mangues ${pu} € pièce. Son voisin propose un panier à ${F} €, puis ${q2} € par mangue. Pour combien de mangues les deux offres coûtent-elles le même prix ?`,
        `${q.nom} compare deux étals du marché de Saint-Pierre : mangues à ${pu} € pièce, ou panier à ${F} € puis ${q2} € la mangue. Pour combien de mangues le prix est-il le même ?`,
      ]);
      return {
        text: t,
        sol: s, eq: `${pu}x = ${F} + ${ex([q2, "x"])}`, inconnue: "x le nombre de mangues", calcul: `on soustrait $${ex([q2, "x"])}$ des deux côtés : $x = ${F}$.`, conclusion: `pour ${s} mangues`,
      };
    },
    () => {
      const v1 = randomInt(12, 20), dv = randomInt(2, 6), v2 = v1 + dv, s = randomInt(1, 5), d = dv * s;
      const t = randomChoice([
        `Un cycliste part avec ${d} km d’avance et roule à ${v1} km/h. ${q.nom} part derrière lui à ${v2} km/h. Au bout de combien d’heures ${q.nom} le rattrape-t-${il(q)} ?`,
        `Lors d’une course, ${q.nom} a ${d} km de retard sur ${r.nom}. ${r.nom} roule à ${v1} km/h et ${q.nom} à ${v2} km/h. Combien d’heures faut-il à ${q.nom} pour rejoindre ${r.nom} ?`,
      ]);
      return { text: t, sol: s, eq: `${d} + ${v1}x = ${v2}x`, inconnue: "x le nombre d’heures", calcul: `on soustrait $${v1}x$ des deux côtés : $${d} = ${ex([dv, "x"])}$` + (dv === 1 ? "." : `, donc $x = ${d} \\div ${dv} = ${s}$.`), conclusion: `au bout de ${s} heure${s > 1 ? "s" : ""}` };
    },
    () => {
      for (;;) {
        const b = randomInt(4, 12), a = randomInt(1, 8), s = 3 * b - 4 * a;
        if (s < 1 || s > 20) continue;
        const t = randomChoice([
          `Un carré a pour côté $x + ${a}$ cm et un triangle équilatéral a pour côté $x + ${b}$ cm. Pour quelle valeur de $x$ ont-ils le même périmètre ?`,
          `Le côté d’un carré mesure $x + ${a}$ cm ; celui d’un triangle équilatéral, $x + ${b}$ cm. Trouve $x$ pour que les deux figures aient le même périmètre.`,
        ]);
        return { text: t, sol: s, eq: `4(x + ${a}) = 3(x + ${b})`, inconnue: "x le nombre cherché", calcul: `on développe : $4x + ${4 * a} = 3x + ${3 * b}$, puis ` + resolutionDeuxMembres(4, 4 * a, 3, 3 * b, s, "x"), conclusion: `$x = ${s}$` };
      }
    },
    () => {
      const g = randomInt(20, 60), pe = randomInt(10, 40), s = randomInt(3, 12), P1 = randomInt(800, 2000), P2 = P1 + (g + pe) * s;
      const t = randomChoice([
        `Un village compte ${P1} habitants et en gagne ${g} par an. Un autre compte ${P2} habitants et en perd ${pe} par an. Dans combien d’années auront-ils le même nombre d’habitants ?`,
        `Deux communes : la première a ${P1} habitants et grandit de ${g} habitants par an ; la seconde a ${P2} habitants et en perd ${pe} chaque année. Au bout de combien d’années auront-elles autant d’habitants ?`,
      ]);
      return { text: t, sol: s, eq: `${P1} + ${g}x = ${P2} - ${pe}x`, inconnue: "x le nombre d’années", calcul: `on ajoute $${pe}x$ et on soustrait ${P1} : $${g + pe}x = ${P2 - P1}$, donc $x = ${P2 - P1} \\div ${g + pe} = ${s}$.`, conclusion: `dans ${s} ans` };
    },
  ];
  return randomChoice(etoile === 3 ? P3 : etoile === 4 ? P4 : P5)();
}

function genProbleme(etoile: 3 | 4 | 5): Q {
  const pb = problemes(etoile);
  const expected = attendu(pb.sol);
  if (pb.prix) expected.push(euros(pb.sol));
  return {
    text: pb.text,
    format: "short",
    expected: [...new Set(expected)],
    comparator: "number_equal",
    explanation:
      `Définition : on choisit l’inconnue, ici ${pb.inconnue}, puis on traduit l’énoncé par une équation.\n\n` +
      `Méthode : on pose $${pb.eq}$.\n\n` +
      `Calcul : ${pb.calcul}\n\n` +
      `Conclusion : ${pb.conclusion}.`,
  };
}

// =========================================================
// DÉFIS
// =========================================================

/** ★4 : un élève propose une solution ; a-t-il raison ? */
function genVerdict(): Q {
  const L = lettre();
  const q = randomChoice(PRENOMS);
  if (Math.random() < 0.5) {
    const f = formeVerif(4, L);
    const juste = Math.random() < 0.5;
    const k = juste ? f.sol : f.sol + randomChoice([-2, -1, 1, 2]);
    const r = remplacer(f, k, L);
    const tours = [
      `${q.nom} résout $${f.eq}$ et trouve $${L} = ${nb(k)}$. A-t-${il(q)} raison ?`,
      `Selon ${q.nom}, la solution de $${f.eq}$ est $${nb(k)}$. Est-ce exact ?`,
      `${q.nom} affirme : « $${L} = ${nb(k)}$ est la solution de $${f.eq}$ ». A-t-${il(q)} raison ?`,
    ];
    return {
      text: randomChoice(tours),
      format: "qcm",
      choices: ["oui", "non"],
      expected: [r.vrai ? "oui" : "non"],
      comparator: "mcq_exact",
      explanation:
        "Définition : une solution rend l’égalité vraie.\n\n" +
        "Méthode : pas besoin de refaire toute la résolution : on remplace l’inconnue par la valeur proposée.\n\n" +
        `Calcul : ${r.txt}\n\n` +
        `Conclusion : ${r.vrai ? `oui, ${q.nom} a raison` : `non, la solution est $${nb(f.sol)}$`}.`,
    };
  }
  const f = randomChoice([...DISTRIB_4, ...REDUCTION_3])(L);
  const juste = Math.random() < 0.5;
  const k = juste ? f.sol : f.sol + randomChoice([-2, -1, 1, 2]);
  const tours = [
    `${q.nom} résout $${f.eq}$ et trouve $${L} = ${nb(k)}$. A-t-${il(q)} raison ?`,
    `Selon ${q.nom}, l’équation $${f.eq}$ a pour solution $${nb(k)}$. Est-ce exact ?`,
  ];
  return {
    text: randomChoice(tours),
    format: "qcm",
    choices: ["oui", "non"],
    expected: [juste ? "oui" : "non"],
    comparator: "mcq_exact",
    explanation:
      "Définition : une solution rend l’égalité vraie.\n\n" +
      `Méthode : ${f.methode}\n\n` +
      `Calcul : ${f.calcul}\n\n` +
      `Conclusion : la solution est $${nb(f.sol)}$, donc ${juste ? `${q.nom} a raison` : `${q.nom} se trompe`}.`,
  };
}

/** ★4 (réponse rédigée) : justifier qu'un nombre est solution. */
function genJustifier(): Q {
  const L = lettre();
  const q = randomChoice(PRENOMS);
  const f = formeVerif(randomChoice([2, 3]) as 2 | 3, L);
  const r = remplacer(f, f.sol, L);
  const k = nb(f.sol);
  const tours = [
    `Explique pourquoi $${L} = ${k}$ est solution de $${f.eq}$.`,
    `Montre que $${k}$ est solution de l’équation $${f.eq}$.`,
    `Justifie que l’équation $${f.eq}$ admet $${k}$ pour solution.`,
    `${q.nom} affirme que $${L} = ${k}$ vérifie $${f.eq}$. Justifie qu’${il(q)} a raison.`,
  ];
  return {
    text: randomChoice(tours),
    format: "open",
    expected: ["remplace", "égal", "vérifi", String(arr(f.G(f.sol)))],
    comparator: "contains_keyword",
    explanation:
      "Définition : un nombre est solution s’il rend l’égalité vraie.\n\n" +
      "Méthode : on remplace l’inconnue par ce nombre et on compare les deux membres.\n\n" +
      `Calcul : ${r.txt}\n\n` +
      `Conclusion : l’égalité est vraie pour $${L} = ${k}$, donc $${k}$ est solution.`,
  };
}

/** ★4 (réponse rédigée) : trouver l'erreur d'un élève. */
function genErreur(): Q {
  const L = lettre();
  const q = randomChoice(PRENOMS);
  const a = randomInt(2, 6), b = randomInt(2, 9), s = randomInt(1, 9);
  const erreurs: (() => { calcul: string; mots: string[]; correction: string })[] = [
    () => ({
      calcul: `$${a}${L} = ${a * s}$, donc $${L} = ${a * s} - ${a} = ${a * s - a}$`,
      mots: ["divis", "multipli", "soustra"],
      correction: `$${a}${L}$ signifie $${a} \\times ${L}$ : il faut diviser par ${a}, pas soustraire ${a}. On obtient $${L} = ${a * s} \\div ${a} = ${s}$.`,
    }),
    () => ({
      calcul: `$${L} + ${b} = ${s + b}$, donc $${L} = ${s + b} + ${b} = ${s + 2 * b}$`,
      mots: ["soustra", "enlev", "retir"],
      correction: `pour annuler « + ${b} », il faut soustraire ${b} des deux côtés : $${L} = ${s + b} - ${b} = ${s}$.`,
    }),
    () => ({
      calcul: `$${a}(${L} + ${b}) = ${a * (s + b)}$, donc $${a}${L} + ${b} = ${a * (s + b)}$`,
      mots: ["développ", "distribu", String(a * b), "parenth"],
      correction: `${a} multiplie toute la parenthèse : $${a}(${L} + ${b}) = ${a}${L} + ${a * b}$. On obtient $${a}${L} = ${a * s}$, puis $${L} = ${s}$.`,
    }),
    () => {
      const c = randomInt(1, a - 1 || 1), d = (a - c) * s + b;
      return {
        calcul: `$${a}${L} + ${b} = ${ex([c, L])} + ${d}$, donc $${a + c}${L} = ${d - b}$`,
        mots: ["soustra", "signe", String(a - c)],
        correction: `pour enlever $${ex([c, L])}$ du membre de droite, on le soustrait des deux côtés : $${ex([a - c, L])} = ${d - b}$, donc $${L} = ${s}$.`,
      };
    },
    () => ({
      calcul: `$\\frac{${L}}{${a}} = ${b}$, donc $${L} = ${b} \\div ${a}$`,
      mots: ["multipli", String(a * b)],
      correction: `pour annuler la division par ${a}, on multiplie les deux côtés par ${a} : $${L} = ${b} \\times ${a} = ${a * b}$.`,
    }),
    () => ({
      calcul: `$${b} - ${L} = ${nb(b - s)}$, donc $${L} = ${nb(b - s)} - ${b} = ${nb(-s)}$`,
      mots: ["opposé", "signe", String(s)],
      correction: `on obtient $-${L} = ${nb(-s)}$, donc $${L} = ${s}$ : il ne faut pas oublier le signe « − » devant $${L}$.`,
    }),
  ];
  const e = randomChoice(erreurs)();
  const tours = [
    `${q.nom} écrit : « ${e.calcul} ». Explique son erreur.`,
    `Où est l’erreur dans ce calcul de ${q.nom} : « ${e.calcul} » ?`,
    `${q.nom} affirme : « ${e.calcul} ». Explique pourquoi c’est faux.`,
    `Corrige le raisonnement suivant et explique l’erreur : « ${e.calcul} ».`,
  ];
  return {
    text: randomChoice(tours),
    format: "open",
    expected: [...e.mots, "erreur"],
    comparator: "contains_keyword",
    explanation:
      "Définition : on transforme une équation en faisant la MÊME opération sur ses deux membres, l’opération qui annule celle qu’on veut supprimer.\n\n" +
      "Méthode : on repère l’étape fautive et on la refait.\n\n" +
      `Calcul : ${e.correction}\n\n` +
      "Conclusion : on vérifie toujours la solution en la remplaçant dans l’équation de départ.",
  };
}

/** ★5 : l'inconnue des deux côtés (résoudre, ou QCM « laquelle a pour solution… »). */
function genDeuxMembres(): Q {
  const L = lettre();
  const s = nonNul(9);
  if (Math.random() < 0.25) {
    const bonne = deuxMembres(L, s);
    const fausses = [s + 1, s - 1, s + 2].map((v) => deuxMembres(L, v).eq);
    const tours = [
      `Laquelle de ces équations a pour solution $${L} = ${nb(s)}$ ?`,
      `Pour quelle équation le nombre $${nb(s)}$ est-il solution ?`,
      `Une seule de ces équations est vérifiée par $${L} = ${nb(s)}$. Laquelle ?`,
    ];
    return {
      text: randomChoice(tours),
      format: "qcm",
      choices: qcm(`$${bonne.eq}$`, fausses.map((f) => `$${f}$`)),
      expected: [`$${bonne.eq}$`],
      comparator: "mcq_exact",
      explanation:
        "Définition : une solution rend l’égalité vraie.\n\n" +
        `Méthode : on résout chaque équation, ou on remplace $${L}$ par $${nb(s)}$.\n\n` +
        `Calcul : pour $${bonne.eq}$, ${bonne.calcul}\n\n` +
        `Conclusion : c’est $${bonne.eq}$.`,
    };
  }
  const f = deuxMembres(L, s);
  return {
    text: randomChoice(RESOUDRE)(f.eq, L),
    format: "short",
    expected: attendu(f.sol),
    comparator: "number_equal",
    explanation: explRes(L, f),
  };
}

// =========================================================
// LA BANQUE
// =========================================================

export const equationsBank: TutorBankItemV4[] = [
  // =========================
  // EQUATION_RECONNAITRE
  // =========================
  {
    kind: "fixed",
    id: "equation_reconnaitre_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    text: "Laquelle de ces écritures est une équation ?",
    format: "qcm",
    choices: ["$3x + 5$", "$2 + 7 = 9$", "$3x + 2 = 11$", "$5 - 2$"],
    expected: ["$3x + 2 = 11$"],
    comparator: "mcq_exact",
    hint: "Une équation contient un signe = et une inconnue.",
    explanation:
      "Définition : une équation est une égalité qui contient une inconnue.\n\n" +
      "Méthode : on cherche une écriture avec une lettre ET un signe =.\n\n" +
      "Calcul : $3x + 5$ n’a pas de signe = ; $2 + 7 = 9$ n’a pas d’inconnue ; $3x + 2 = 11$ a les deux.\n\n" +
      "Conclusion : l’équation est $3x + 2 = 11$.",
    tags: ["equation", "reconnaitre"],
  },
  {
    kind: "fixed",
    id: "equation_reconnaitre_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    text: "L’écriture $x + 4 = 9$ est-elle une équation ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Vérifie s’il y a une inconnue et un signe =.",
    explanation:
      "Définition : une équation est une égalité qui contient une inconnue.\n\n" +
      "Méthode : on cherche une lettre et un signe =.\n\n" +
      "Calcul : $x + 4 = 9$ contient l’inconnue $x$ et un signe =.\n\n" +
      "Conclusion : oui, c’est une équation.",
    tags: ["equation", "vocabulaire"],
  },
  {
    kind: "template",
    id: "equation_reconnaitre_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    hint: "Cherche l’écriture avec une inconnue et un signe =.",
    tags: ["equation", "template"],
    generate: () => genReconnaitre(1),
  },

  // =========================
  // EQUATION_TRADUIRE
  // =========================
  {
    kind: "fixed",
    id: "equation_traduire_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_traduire",
    difficulty: 2,
    theme: "neutral",
    text: "Traduire en équation : « un nombre $x$ augmenté de 3 vaut 11 »",
    format: "short",
    expected: ["x + 3 = 11"],
    comparator: "expression_equivalente",
    hint: "« augmenté de 3 » puis « vaut 11 ».",
    explanation:
      "Définition : traduire, c’est écrire la phrase avec des symboles.\n\n" +
      "Méthode : « augmenté de 3 » donne $+ 3$, « vaut 11 » donne $= 11$.\n\n" +
      "Calcul : on obtient $x + 3 = 11$.\n\n" +
      "Conclusion : l’équation est $x + 3 = 11$.",
    tags: ["equation", "traduction"],
  },
  {
    kind: "fixed",
    id: "equation_traduire_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_traduire",
    difficulty: 2,
    theme: "neutral",
    text: "Traduire en équation : « le double de $x$ est égal à 14 »",
    format: "short",
    expected: ["2x = 14"],
    comparator: "expression_equivalente",
    hint: "Le double de x s’écrit 2x.",
    explanation:
      "Définition : traduire, c’est écrire la phrase avec des symboles.\n\n" +
      "Méthode : « le double de $x$ » donne $2x$, « est égal à 14 » donne $= 14$.\n\n" +
      "Calcul : on obtient $2x = 14$.\n\n" +
      "Conclusion : l’équation est $2x = 14$.",
    tags: ["equation", "traduction"],
  },
  {
    kind: "template",
    id: "equation_traduire_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_traduire",
    difficulty: 2,
    theme: "neutral",
    hint: "Transforme la phrase en égalité avec l’inconnue.",
    tags: ["equation", "traduction", "template"],
    generate: () => genTraduire(2, false),
  },

  // =========================
  // EQUATION_RESOUDRE_SIMPLE
  // =========================
  {
    kind: "fixed",
    id: "equation_resoudre_simple_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_resoudre_simple",
    difficulty: 1,
    theme: "neutral",
    text: "Résoudre : $x + 4 = 9$",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "Quel nombre plus 4 donne 9 ?",
    explanation:
      "Définition : on isole x en faisant la même opération des deux côtés.\n\n" +
      "Méthode : on soustrait 4 des deux côtés.\n\n" +
      "Calcul : $x = 9 - 4 = 5$.\n\n" +
      "Conclusion : $x = 5$.",
    tags: ["equation", "resolution"],
  },
  {
    kind: "fixed",
    id: "equation_resoudre_simple_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_resoudre_simple",
    difficulty: 1,
    theme: "neutral",
    text: "Résoudre : $3x = 15$",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "Divise 15 par 3.",
    explanation:
      "Définition : on isole x en faisant la même opération des deux côtés.\n\n" +
      "Méthode : on divise les deux côtés par 3.\n\n" +
      "Calcul : $x = 15 \\div 3 = 5$.\n\n" +
      "Conclusion : $x = 5$.",
    tags: ["equation", "resolution"],
  },
  {
    kind: "template",
    id: "equation_resoudre_simple_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_resoudre_simple",
    difficulty: 2,
    theme: "neutral",
    hint: "Isole l’inconnue en faisant la même opération des deux côtés.",
    tags: ["equation", "resolution", "template"],
    generate: () => genSimple(2),
  },

  // =========================
  // EQUATION_RESOUDRE_REDUCTION
  // =========================
  {
    kind: "fixed",
    id: "equation_resoudre_reduction_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_resoudre_reduction",
    difficulty: 2,
    theme: "neutral",
    text: "Résoudre : $2x + 3x = 15$",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "Réduis d’abord 2x + 3x.",
    explanation:
      "Définition : on réduit les termes en x avant de résoudre.\n\n" +
      "Méthode : $2x + 3x = 5x$.\n\n" +
      "Calcul : $5x = 15$ donc $x = 15 \\div 5 = 3$.\n\n" +
      "Conclusion : $x = 3$.",
    tags: ["equation", "reduction"],
  },
  {
    kind: "fixed",
    id: "equation_resoudre_reduction_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_resoudre_reduction",
    difficulty: 2,
    theme: "neutral",
    text: "Résoudre : $4x - x = 12$",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "Réduis 4x − x (x, c’est 1x).",
    explanation:
      "Définition : on réduit les termes en x avant de résoudre.\n\n" +
      "Méthode : $4x - x = 3x$.\n\n" +
      "Calcul : $3x = 12$ donc $x = 4$.\n\n" +
      "Conclusion : $x = 4$.",
    tags: ["equation", "reduction"],
  },
  {
    kind: "template",
    id: "equation_resoudre_reduction_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_resoudre_reduction",
    difficulty: 3,
    theme: "neutral",
    hint: "Réduis les termes en x avant de résoudre.",
    tags: ["equation", "reduction", "template"],
    generate: () => questionResoudre(REDUCTION_3),
  },

  // =========================
  // EQUATION_RESOUDRE_DISTRIBUTIVITE
  // =========================
  {
    kind: "fixed",
    id: "equation_resoudre_litteral_distributivite_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_resoudre_distributivite",
    difficulty: 3,
    theme: "neutral",
    text: "Résoudre : $2(x + 3) = 14$",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "Développe ou divise d’abord par 2.",
    explanation:
      "Définition : on supprime la parenthèse en divisant ou en développant.\n\n" +
      "Méthode : on divise les deux côtés par 2.\n\n" +
      "Calcul : $x + 3 = 7$ donc $x = 4$.\n\n" +
      "Conclusion : $x = 4$.",
    tags: ["equation", "litteral_distributivite"],
  },
  {
    kind: "fixed",
    id: "equation_resoudre_litteral_distributivite_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_resoudre_distributivite",
    difficulty: 3,
    theme: "neutral",
    text: "Résoudre : $3(x - 1) = 12$",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "Commence par diviser par 3.",
    explanation:
      "Définition : on supprime la parenthèse en divisant ou en développant.\n\n" +
      "Méthode : on divise les deux côtés par 3.\n\n" +
      "Calcul : $x - 1 = 4$ donc $x = 5$.\n\n" +
      "Conclusion : $x = 5$.",
    tags: ["equation", "litteral_distributivite"],
  },
  {
    kind: "template",
    id: "equation_resoudre_litteral_distributivite_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_resoudre_distributivite",
    difficulty: 4,
    theme: "neutral",
    hint: "Développe d’abord, ou isole la parenthèse.",
    tags: ["equation", "litteral_distributivite", "template"],
    generate: () => questionResoudre(DISTRIB_4),
  },

  // =========================
  // EQUATION_VERIFIER
  // =========================
  {
    kind: "fixed",
    id: "equation_verifier_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_verifier",
    difficulty: 2,
    theme: "neutral",
    text: "Le nombre 4 est-il solution de l’équation $x + 3 = 7$ ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Remplace x par 4.",
    explanation:
      "Définition : une solution rend l’égalité vraie.\n\n" +
      "Méthode : on remplace x par 4.\n\n" +
      "Calcul : $4 + 3 = 7$.\n\n" +
      "Conclusion : oui, 4 est solution.",
    tags: ["equation", "verification"],
  },
  {
    kind: "fixed",
    id: "equation_verifier_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_verifier",
    difficulty: 2,
    theme: "neutral",
    text: "Le nombre 2 est-il solution de l’équation $3x = 9$ ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Calcule 3 × 2.",
    explanation:
      "Définition : une solution rend l’égalité vraie.\n\n" +
      "Méthode : on remplace x par 2.\n\n" +
      "Calcul : $3 \\times 2 = 6$, pas 9.\n\n" +
      "Conclusion : non, 2 n’est pas solution (la solution est 3).",
    tags: ["equation", "verification"],
  },
  {
    kind: "template",
    id: "equation_verifier_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_verifier",
    difficulty: 2,
    theme: "neutral",
    hint: "Teste la valeur proposée dans l’équation.",
    tags: ["equation", "verification", "template"],
    generate: () => genVerifier(2),
  },

  // =========================
  // EQUATION_PROBLEME
  // =========================
  {
    kind: "fixed",
    id: "equation_probleme_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_probleme",
    difficulty: 3,
    theme: "neutral",
    text: "J’ai pensé à un nombre. Si j’ajoute 5, j’obtiens 17. Quel est ce nombre ?",
    format: "short",
    expected: ["12"],
    comparator: "number_equal",
    hint: "Pose x + 5 = 17.",
    explanation:
      "Définition : on traduit l’énoncé par une équation.\n\n" +
      "Méthode : on pose $x + 5 = 17$.\n\n" +
      "Calcul : $x = 17 - 5 = 12$.\n\n" +
      "Conclusion : le nombre est 12.",
    tags: ["equation", "probleme"],
  },
  {
    kind: "fixed",
    id: "equation_probleme_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_probleme",
    difficulty: 3,
    theme: "neutral",
    text: "Le double d’un nombre diminué de 3 vaut 11. Quel est ce nombre ?",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "Pose 2x − 3 = 11.",
    explanation:
      "Définition : on traduit l’énoncé par une équation.\n\n" +
      "Méthode : on pose $2x - 3 = 11$.\n\n" +
      "Calcul : $2x = 14$ donc $x = 7$.\n\n" +
      "Conclusion : le nombre est 7.",
    tags: ["equation", "probleme"],
  },
  {
    kind: "template",
    id: "equation_probleme_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_probleme",
    difficulty: 4,
    theme: "neutral",
    hint: "Choisis l’inconnue, traduis l’énoncé par une équation, puis résous-la.",
    tags: ["equation", "probleme", "template"],
    generate: () => genProbleme(4),
  },
  {
    kind: "template",
    id: "equation_probleme_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_probleme",
    difficulty: 5,
    theme: "neutral",
    hint: "L’inconnue apparaît des deux côtés : écris les deux quantités en fonction de x, puis égale-les.",
    tags: ["equation", "probleme", "deux_membres"],
    generate: () => genProbleme(5),
  },

  // =========================
  // EQUATION_DEFIS
  // =========================
  {
    kind: "fixed",
    id: "equation_defi_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Explique pourquoi $x = 3$ est solution de $2x + 1 = 7$.",
    format: "open",
    expected: ["remplace", "6 + 1", "vérifi", "égal"],
    comparator: "contains_keyword",
    hint: "Remplace x par 3 dans l’équation.",
    explanation:
      "Définition : un nombre est solution s’il rend l’égalité vraie.\n\n" +
      "Méthode : on remplace x par 3.\n\n" +
      "Calcul : $2 \\times 3 + 1 = 6 + 1 = 7$.\n\n" +
      "Conclusion : l’égalité est vraie, donc 3 est solution.",
    tags: ["equation", "defi", "justification"],
  },
  {
    kind: "fixed",
    id: "equation_defi_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Léo dit : « dans $2x + 3 = 11$, $x = 4$ car $2 + 3 + 4 = 9$ ». A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Teste vraiment x = 4 dans l’équation.",
    explanation:
      "Définition : pour vérifier une solution, on remplace l’inconnue dans l’équation.\n\n" +
      "Méthode : on calcule $2 \\times 4 + 3$.\n\n" +
      "Calcul : $2 \\times 4 + 3 = 11$ : 4 est bien solution, mais le raisonnement de Léo est faux ($2 + 3 + 4$ n’a aucun sens ici, et vaut 9, pas 11).\n\n" +
      "Conclusion : non, son raisonnement est faux.",
    tags: ["equation", "defi", "erreur"],
  },
  {
    kind: "fixed",
    id: "equation_defi_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Résoudre : $2(x + 3) = 3x + 1$",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "Développe puis regroupe les termes.",
    explanation:
      "Définition : on développe, puis on regroupe les x d’un côté.\n\n" +
      "Méthode : $2(x + 3) = 2x + 6$.\n\n" +
      "Calcul : $2x + 6 = 3x + 1$ donc $6 - 1 = 3x - 2x$, soit $x = 5$.\n\n" +
      "Conclusion : $x = 5$.",
    tags: ["equation", "defi", "avance"],
  },
  {
    kind: "template",
    id: "equation_open_justifier_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Remplace l’inconnue par le nombre et calcule chaque membre.",
    tags: ["equation", "open", "justification"],
    generate: () => genJustifier(),
  },
  {
    kind: "template",
    id: "equation_open_erreur_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Regarde quelle opération a été faite, et laquelle il fallait faire.",
    tags: ["equation", "open", "erreur"],
    generate: () => genErreur(),
  },

  /* =========================================================
     COMPLÉMENTS (top-up ~10 items / microSkill)
  ========================================================= */

  // ---------- EQUATION_RECONNAITRE ----------
  {
    kind: "fixed",
    id: "equation_reconnaitre_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    text: "Parmi ces quatre écritures, laquelle est une équation ?",
    format: "qcm",
    choices: ["$5x - 2 = 8$", "$5x - 2$", "$7 + 1 = 8$", "$2x$"],
    expected: ["$5x - 2 = 8$"],
    comparator: "mcq_exact",
    hint: "Une équation a une inconnue ET un signe =.",
    explanation:
      "Définition : une équation est une égalité contenant une inconnue.\n\n" +
      "Méthode : on cherche une écriture avec x et un signe =.\n\n" +
      "Calcul : $5x - 2 = 8$ a une inconnue et une égalité.\n\n" +
      "Conclusion : c’est $5x - 2 = 8$.",
    tags: ["equation", "reconnaitre", "qcm"],
  },
  {
    kind: "fixed",
    id: "equation_reconnaitre_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    text: "Dans l’équation $3x + 2 = 11$, quelle est l’inconnue ?",
    format: "qcm",
    choices: ["$x$", "$3$", "$2$", "$11$"],
    expected: ["$x$"],
    comparator: "mcq_exact",
    hint: "L’inconnue est la lettre dont on cherche la valeur.",
    explanation:
      "Définition : l’inconnue est la lettre dont on cherche la valeur.\n\n" +
      "Méthode : on repère la lettre dans l’équation.\n\n" +
      "Calcul : ici la lettre est $x$.\n\n" +
      "Conclusion : l’inconnue est $x$.",
    tags: ["equation", "reconnaitre", "vocabulaire", "qcm"],
  },
  {
    kind: "fixed",
    id: "equation_reconnaitre_fixed_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Que signifie « résoudre une équation » ?",
    format: "qcm",
    choices: [
      "trouver la valeur de l’inconnue qui rend l’égalité vraie",
      "trouver toutes les valeurs qui rendent l’égalité fausse",
      "calculer la valeur de l’expression pour x égal à zéro",
      "réduire chaque membre de l’égalité le plus possible",
    ],
    expected: ["trouver la valeur de l’inconnue qui rend l’égalité vraie"],
    comparator: "mcq_exact",
    hint: "On cherche la valeur de x.",
    explanation:
      "Définition : résoudre une équation, c’est trouver la valeur de l’inconnue qui rend l’égalité vraie.\n\n" +
      "Méthode : on isole l’inconnue.\n\n" +
      "Calcul : la solution vérifie l’égalité.\n\n" +
      "Conclusion : résoudre, c’est trouver la valeur de l’inconnue.",
    tags: ["equation", "reconnaitre", "qcm"],
  },
  {
    kind: "template",
    id: "equation_reconnaitre_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    hint: "Une équation : une lettre (l’inconnue) et un signe =.",
    tags: ["equation", "reconnaitre", "template"],
    generate: () => genReconnaitre(1),
  },
  {
    kind: "template",
    id: "equation_reconnaitre_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    hint: "Une équation contient un signe = et une inconnue ; une expression n’a pas de signe =.",
    tags: ["equation", "reconnaitre", "template"],
    generate: () => genReconnaitre(2),
  },
  {
    kind: "template",
    id: "equation_reconnaitre_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    hint: "Premier membre : à gauche du signe = ; second membre : à droite.",
    tags: ["equation", "reconnaitre", "vocabulaire", "template"],
    generate: () => genReconnaitre(2),
  },
  {
    kind: "fixed",
    id: "equation_reconnaitre_fixed_6",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Dans $4x + 1 = 13$, comment appelle-t-on le nombre 13 ?",
    format: "qcm",
    choices: ["le second membre", "l’inconnue", "le coefficient", "la solution"],
    expected: ["le second membre"],
    comparator: "mcq_exact",
    hint: "C’est ce qui se trouve à droite du signe =.",
    explanation:
      "Définition : une équation a un premier membre (à gauche du =) et un second membre (à droite).\n\n" +
      "Méthode : on repère ce qui est à droite du signe =.\n\n" +
      "Calcul : ici 13 est à droite du signe =.\n\n" +
      "Conclusion : 13 est le second membre.",
    tags: ["equation", "reconnaitre", "vocabulaire", "qcm"],
  },
  {
    kind: "fixed",
    id: "equation_reconnaitre_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Explique ce qu’est une équation et ce que signifie la résoudre.",
    format: "open",
    expected: ["égalité", "inconnue", "valeur"],
    comparator: "contains_keyword",
    hint: "Pense au signe = et à l’inconnue.",
    explanation:
      "Définition : une équation est une égalité contenant une inconnue.\n\n" +
      "Méthode : résoudre, c’est chercher la valeur de l’inconnue.\n\n" +
      "Calcul : cette valeur rend l’égalité vraie.\n\n" +
      "Conclusion : résoudre une équation, c’est trouver la valeur de l’inconnue qui vérifie l’égalité.",
    tags: ["equation", "reconnaitre", "open"],
  },

  // ---------- EQUATION_TRADUIRE ----------
  {
    kind: "fixed",
    id: "equation_traduire_qcm_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_traduire",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle équation traduit « un nombre $x$ diminué de 5 vaut 8 » ?",
    format: "qcm",
    choices: ["$x - 5 = 8$", "$x + 5 = 8$", "$5 - x = 8$", "$5x = 8$"],
    expected: ["$x - 5 = 8$"],
    comparator: "mcq_exact",
    hint: "« diminué de 5 » signifie qu’on enlève 5.",
    explanation:
      "Définition : on traduit chaque mot en symbole.\n\n" +
      "Méthode : « diminué de 5 » donne $x - 5$, « vaut 8 » donne $= 8$.\n\n" +
      "Calcul : on obtient $x - 5 = 8$.\n\n" +
      "Conclusion : l’équation est $x - 5 = 8$.",
    tags: ["equation", "traduction", "qcm"],
  },
  {
    kind: "fixed",
    id: "equation_traduire_qcm_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_traduire",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle équation traduit « le triple de $x$ vaut 21 » ?",
    format: "qcm",
    choices: ["$3x = 21$", "$x + 3 = 21$", "$x - 3 = 21$", "$\\frac{x}{3} = 21$"],
    expected: ["$3x = 21$"],
    comparator: "mcq_exact",
    hint: "Le triple de x est 3x.",
    explanation:
      "Définition : « le triple » signifie multiplier par 3.\n\n" +
      "Méthode : on écrit $3x$, puis « vaut 21 » donne $= 21$.\n\n" +
      "Calcul : on obtient $3x = 21$.\n\n" +
      "Conclusion : l’équation est $3x = 21$.",
    tags: ["equation", "traduction", "qcm"],
  },
  {
    kind: "fixed",
    id: "equation_traduire_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_traduire",
    difficulty: 2,
    theme: "neutral",
    text: "Traduire en équation : « la somme de $x$ et 7 vaut 20 »",
    format: "short",
    expected: ["x + 7 = 20"],
    comparator: "expression_equivalente",
    hint: "« somme » signifie addition.",
    explanation:
      "Définition : on traduit chaque mot en symbole.\n\n" +
      "Méthode : « la somme de $x$ et 7 » donne $x + 7$, « vaut 20 » donne $= 20$.\n\n" +
      "Calcul : on obtient $x + 7 = 20$.\n\n" +
      "Conclusion : l’équation est $x + 7 = 20$.",
    tags: ["equation", "traduction"],
  },
  {
    kind: "fixed",
    id: "equation_traduire_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_traduire",
    difficulty: 2,
    theme: "neutral",
    text: "Traduire en équation : « le double de $x$ diminué de 4 vaut 10 »",
    format: "short",
    expected: ["2x - 4 = 10"],
    comparator: "expression_equivalente",
    hint: "Le double de x, puis on enlève 4.",
    explanation:
      "Définition : on traduit mot à mot.\n\n" +
      "Méthode : « le double de $x$ » donne $2x$, « diminué de 4 » donne $- 4$, « vaut 10 » donne $= 10$.\n\n" +
      "Calcul : on obtient $2x - 4 = 10$.\n\n" +
      "Conclusion : l’équation est $2x - 4 = 10$.",
    tags: ["equation", "traduction"],
  },
  {
    kind: "template",
    id: "equation_traduire_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_traduire",
    difficulty: 2,
    theme: "neutral",
    hint: "Traduis chaque morceau : « fois » ×, « augmenté de » +, « vaut » =.",
    tags: ["equation", "traduction", "qcm", "template"],
    generate: () => genTraduire(2, true),
  },
  {
    kind: "template",
    id: "equation_traduire_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_traduire",
    difficulty: 3,
    theme: "neutral",
    hint: "« le double de (… plus …) » demande des parenthèses.",
    tags: ["equation", "traduction", "parentheses", "qcm", "template"],
    generate: () => genTraduire(3, true),
  },
  {
    kind: "template",
    id: "equation_traduire_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_traduire",
    difficulty: 3,
    theme: "neutral",
    hint: "Écris chaque quantité avec l’inconnue, puis relie-les par le signe =.",
    tags: ["equation", "traduction", "parentheses", "template"],
    generate: () => genTraduire(3, false),
  },
  {
    kind: "fixed",
    id: "equation_traduire_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_traduire",
    difficulty: 2,
    theme: "neutral",
    text: "Explique comment traduire « le double de $x$ augmenté de 1 vaut 9 » en équation.",
    format: "open",
    expected: ["2x", "1", "9"],
    comparator: "contains_keyword",
    hint: "Traduis chaque morceau séparément.",
    explanation:
      "Définition : on traduit la phrase morceau par morceau.\n\n" +
      "Méthode : « le double de $x$ » donne $2x$, « augmenté de 1 » donne $+ 1$, « vaut 9 » donne $= 9$.\n\n" +
      "Calcul : on obtient $2x + 1 = 9$.\n\n" +
      "Conclusion : l’équation est $2x + 1 = 9$.",
    tags: ["equation", "traduction", "open"],
  },

  // ---------- EQUATION_RESOUDRE_SIMPLE ----------
  {
    kind: "fixed",
    id: "equation_resoudre_simple_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_resoudre_simple",
    difficulty: 1,
    theme: "neutral",
    text: "Résoudre : $x - 3 = 8$",
    format: "short",
    expected: ["11"],
    comparator: "number_equal",
    hint: "On ajoute 3 des deux côtés.",
    explanation:
      "Définition : on isole x en faisant la même opération des deux côtés.\n\n" +
      "Méthode : on ajoute 3 aux deux côtés.\n\n" +
      "Calcul : $x = 8 + 3 = 11$.\n\n" +
      "Conclusion : $x = 11$.",
    tags: ["equation", "resolution"],
  },
  {
    kind: "fixed",
    id: "equation_resoudre_simple_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_resoudre_simple",
    difficulty: 2,
    theme: "neutral",
    text: "Résoudre : $4x = 20$",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "On divise par 4.",
    explanation:
      "Définition : on isole x en divisant des deux côtés.\n\n" +
      "Méthode : on divise par 4.\n\n" +
      "Calcul : $x = 20 \\div 4 = 5$.\n\n" +
      "Conclusion : $x = 5$.",
    tags: ["equation", "resolution"],
  },
  {
    kind: "fixed",
    id: "equation_resoudre_simple_fixed_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_resoudre_simple",
    difficulty: 2,
    theme: "neutral",
    text: "Pour résoudre $x + 5 = 12$, quelle opération fait-on des deux côtés ?",
    format: "qcm",
    choices: ["soustraire 5", "ajouter 5", "diviser par 5", "multiplier par 5"],
    expected: ["soustraire 5"],
    comparator: "mcq_exact",
    hint: "On veut isoler x en supprimant le + 5.",
    explanation:
      "Définition : on isole x en annulant ce qui l’entoure.\n\n" +
      "Méthode : pour annuler « + 5 », on soustrait 5 des deux côtés.\n\n" +
      "Calcul : $x = 12 - 5 = 7$.\n\n" +
      "Conclusion : on soustrait 5.",
    tags: ["equation", "resolution", "qcm"],
  },
  {
    kind: "template",
    id: "equation_resoudre_simple_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_resoudre_simple",
    difficulty: 2,
    theme: "neutral",
    hint: "Fais l’opération inverse des deux côtés.",
    tags: ["equation", "resolution", "template"],
    generate: () => genSimple(2),
  },
  {
    kind: "template",
    id: "equation_resoudre_simple_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_resoudre_simple",
    difficulty: 1,
    theme: "neutral",
    hint: "On ajoute, soustrait ou divise des deux côtés pour isoler la lettre.",
    tags: ["equation", "resolution", "template"],
    generate: () => genSimple(1),
  },
  {
    kind: "template",
    id: "equation_resoudre_simple_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_resoudre_simple",
    difficulty: 2,
    theme: "neutral",
    hint: "Un coefficient : on divise ; un nombre ajouté : on le soustrait.",
    tags: ["equation", "resolution", "template"],
    generate: () => genSimple(2),
  },
  {
    kind: "template",
    id: "equation_resoudre_simple_tpl_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_resoudre_simple",
    difficulty: 1,
    theme: "neutral",
    hint: "Fais l’opération inverse des deux côtés.",
    tags: ["equation", "resolution", "template"],
    generate: () => genSimple(1),
  },
  {
    kind: "fixed",
    id: "equation_resoudre_simple_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_resoudre_simple",
    difficulty: 2,
    theme: "neutral",
    text: "Explique comment résoudre $x + 4 = 9$.",
    format: "open",
    expected: ["soustraire", "4", "5"],
    comparator: "contains_keyword",
    hint: "On annule le + 4.",
    explanation:
      "Définition : on isole x en gardant l’égalité équilibrée.\n\n" +
      "Méthode : on soustrait 4 des deux côtés.\n\n" +
      "Calcul : $x = 9 - 4 = 5$.\n\n" +
      "Conclusion : $x = 5$.",
    tags: ["equation", "resolution", "open"],
  },

  // ---------- EQUATION_RESOUDRE_REDUCTION ----------
  {
    kind: "fixed",
    id: "equation_resoudre_reduction_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_resoudre_reduction",
    difficulty: 2,
    theme: "neutral",
    text: "Résoudre : $5x - 2x = 9$",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "Réduis 5x − 2x d’abord.",
    explanation:
      "Définition : on réduit les termes en x avant de résoudre.\n\n" +
      "Méthode : $5x - 2x = 3x$.\n\n" +
      "Calcul : $3x = 9$ donc $x = 3$.\n\n" +
      "Conclusion : $x = 3$.",
    tags: ["equation", "reduction"],
  },
  {
    kind: "fixed",
    id: "equation_resoudre_reduction_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_resoudre_reduction",
    difficulty: 2,
    theme: "neutral",
    text: "Réduire l’expression $4x + 2x$ donne…",
    format: "qcm",
    choices: ["$6x$", "$8x$", "$6$", "$2x$"],
    expected: ["$6x$"],
    comparator: "mcq_exact",
    hint: "On additionne les coefficients.",
    explanation:
      "Définition : on additionne les coefficients des termes semblables.\n\n" +
      "Méthode : $4 + 2 = 6$.\n\n" +
      "Calcul : $4x + 2x = 6x$.\n\n" +
      "Conclusion : la forme réduite est $6x$.",
    tags: ["equation", "reduction", "qcm"],
  },
  {
    kind: "template",
    id: "equation_resoudre_reduction_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_resoudre_reduction",
    difficulty: 2,
    theme: "neutral",
    hint: "Additionne ou soustrais les termes en x, puis divise.",
    tags: ["equation", "reduction", "template"],
    generate: () => questionResoudre(REDUCTION_2),
  },
  {
    kind: "template",
    id: "equation_resoudre_reduction_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_resoudre_reduction",
    difficulty: 3,
    theme: "neutral",
    hint: "Regroupe les termes en x, puis les nombres.",
    tags: ["equation", "reduction", "soustraction", "template"],
    generate: () => questionResoudre(REDUCTION_3),
  },
  {
    kind: "template",
    id: "equation_resoudre_reduction_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_resoudre_reduction",
    difficulty: 3,
    theme: "neutral",
    hint: "Réduis les termes en x, puis isole x avec la constante.",
    tags: ["equation", "reduction", "constante", "template"],
    generate: () => questionResoudre(REDUCTION_3),
  },
  {
    kind: "template",
    id: "equation_resoudre_reduction_tpl_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_resoudre_reduction",
    difficulty: 2,
    theme: "neutral",
    hint: "Réduis : x, c’est 1x.",
    tags: ["equation", "reduction", "template"],
    generate: () => questionResoudre(REDUCTION_2),
  },
  {
    kind: "fixed",
    id: "equation_resoudre_reduction_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_resoudre_reduction",
    difficulty: 3,
    theme: "neutral",
    text: "Explique pourquoi il faut réduire avant de résoudre $2x + 4x = 18$.",
    format: "open",
    expected: ["6x", "réduire", "3"],
    comparator: "contains_keyword",
    hint: "Regroupe les termes en x.",
    explanation:
      "Définition : on regroupe les termes semblables avant de résoudre.\n\n" +
      "Méthode : $2x + 4x = 6x$.\n\n" +
      "Calcul : $6x = 18$ donc $x = 3$.\n\n" +
      "Conclusion : réduire simplifie l’équation pour isoler x.",
    tags: ["equation", "reduction", "open"],
  },

  // ---------- EQUATION_RESOUDRE_DISTRIBUTIVITE ----------
  {
    kind: "fixed",
    id: "equation_resoudre_litteral_distributivite_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_resoudre_distributivite",
    difficulty: 3,
    theme: "neutral",
    text: "Résoudre : $2(x + 5) = 16$",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "Divise par 2, puis isole x.",
    explanation:
      "Définition : on supprime la parenthèse en divisant ou en développant.\n\n" +
      "Méthode : on divise par 2.\n\n" +
      "Calcul : $x + 5 = 8$ donc $x = 3$.\n\n" +
      "Conclusion : $x = 3$.",
    tags: ["equation", "litteral_distributivite"],
  },
  {
    kind: "fixed",
    id: "equation_resoudre_litteral_distributivite_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_resoudre_distributivite",
    difficulty: 3,
    theme: "neutral",
    text: "Résoudre : $4(x - 2) = 12$",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "Divise par 4 d’abord.",
    explanation:
      "Définition : on isole la parenthèse en divisant.\n\n" +
      "Méthode : on divise par 4.\n\n" +
      "Calcul : $x - 2 = 3$ donc $x = 5$.\n\n" +
      "Conclusion : $x = 5$.",
    tags: ["equation", "litteral_distributivite"],
  },
  {
    kind: "fixed",
    id: "equation_resoudre_litteral_distributivite_fixed_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_resoudre_distributivite",
    difficulty: 3,
    theme: "neutral",
    text: "Pour résoudre $3(x + 2) = 15$, quelle première étape est la plus simple ?",
    format: "qcm",
    choices: ["diviser les deux côtés par 3", "ajouter 3", "multiplier par 2", "soustraire x"],
    expected: ["diviser les deux côtés par 3"],
    comparator: "mcq_exact",
    hint: "Le 3 multiplie toute la parenthèse.",
    explanation:
      "Définition : on peut isoler la parenthèse en divisant.\n\n" +
      "Méthode : on divise les deux côtés par 3.\n\n" +
      "Calcul : $x + 2 = 5$ donc $x = 3$.\n\n" +
      "Conclusion : la première étape est de diviser par 3.",
    tags: ["equation", "litteral_distributivite", "qcm"],
  },
  {
    kind: "template",
    id: "equation_resoudre_litteral_distributivite_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_resoudre_distributivite",
    difficulty: 4,
    theme: "neutral",
    hint: "Développe, réduis, puis isole l’inconnue.",
    tags: ["equation", "litteral_distributivite", "template"],
    generate: () => questionResoudre(DISTRIB_4),
  },
  {
    kind: "template",
    id: "equation_resoudre_litteral_distributivite_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_resoudre_distributivite",
    difficulty: 3,
    theme: "neutral",
    hint: "Divise par le nombre devant la parenthèse, ou développe.",
    tags: ["equation", "litteral_distributivite", "template"],
    generate: () => questionResoudre(DISTRIB_3),
  },
  {
    kind: "template",
    id: "equation_resoudre_litteral_distributivite_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_resoudre_distributivite",
    difficulty: 4,
    theme: "neutral",
    hint: "Développe d’abord, puis résous.",
    tags: ["equation", "litteral_distributivite", "developper", "template"],
    generate: () => questionResoudre(DISTRIB_4),
  },
  {
    kind: "template",
    id: "equation_resoudre_litteral_distributivite_tpl_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_resoudre_distributivite",
    difficulty: 3,
    theme: "neutral",
    hint: "Le nombre devant la parenthèse multiplie chacun de ses termes.",
    tags: ["equation", "litteral_distributivite", "template"],
    generate: () => questionResoudre(DISTRIB_3),
  },
  {
    kind: "fixed",
    id: "equation_resoudre_litteral_distributivite_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_resoudre_distributivite",
    difficulty: 3,
    theme: "neutral",
    text: "Explique deux façons de commencer la résolution de $2(x + 3) = 14$.",
    format: "open",
    expected: ["diviser", "développer", "4"],
    comparator: "contains_keyword",
    hint: "On peut diviser par 2 ou développer.",
    explanation:
      "Définition : on peut isoler la parenthèse ou la développer.\n\n" +
      "Méthode : soit on divise par 2 ($x + 3 = 7$), soit on développe ($2x + 6 = 14$).\n\n" +
      "Calcul : dans les deux cas, $x = 4$.\n\n" +
      "Conclusion : diviser par 2 ou développer mènent à la même solution.",
    tags: ["equation", "litteral_distributivite", "open"],
  },

  // ---------- EQUATION_VERIFIER ----------
  {
    kind: "fixed",
    id: "equation_verifier_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_verifier",
    difficulty: 2,
    theme: "neutral",
    text: "Le nombre 5 est-il solution de l’équation $2x = 10$ ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Calcule $2 \\times 5$.",
    explanation:
      "Définition : une solution rend l’égalité vraie.\n\n" +
      "Méthode : on remplace x par 5.\n\n" +
      "Calcul : $2 \\times 5 = 10$.\n\n" +
      "Conclusion : oui, 5 est solution.",
    tags: ["equation", "verification", "qcm"],
  },
  {
    kind: "fixed",
    id: "equation_verifier_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_verifier",
    difficulty: 2,
    theme: "neutral",
    text: "Le nombre 3 est-il solution de l’équation $x + 4 = 8$ ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Calcule $3 + 4$.",
    explanation:
      "Définition : une solution rend l’égalité vraie.\n\n" +
      "Méthode : on remplace x par 3.\n\n" +
      "Calcul : $3 + 4 = 7$, pas 8.\n\n" +
      "Conclusion : non, 3 n’est pas solution (la solution est 4).",
    tags: ["equation", "verification", "qcm"],
  },
  {
    kind: "fixed",
    id: "equation_verifier_fixed_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_verifier",
    difficulty: 2,
    theme: "neutral",
    text: "Le nombre 0 est-il solution de l’équation $3x = 0$ ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Calcule $3 \\times 0$.",
    explanation:
      "Définition : une solution rend l’égalité vraie.\n\n" +
      "Méthode : on remplace x par 0.\n\n" +
      "Calcul : $3 \\times 0 = 0$.\n\n" +
      "Conclusion : oui, 0 est solution.",
    tags: ["equation", "verification", "qcm"],
  },
  {
    kind: "template",
    id: "equation_verifier_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_verifier",
    difficulty: 2,
    theme: "neutral",
    hint: "Remplace l’inconnue par la valeur proposée.",
    tags: ["equation", "verification", "template"],
    generate: () => genVerifier(2),
  },
  {
    kind: "template",
    id: "equation_verifier_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_verifier",
    difficulty: 3,
    theme: "neutral",
    hint: "Remplace l’inconnue, puis calcule chaque membre séparément.",
    tags: ["equation", "verification", "template"],
    generate: () => genVerifier(3),
  },
  {
    kind: "template",
    id: "equation_verifier_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_verifier",
    difficulty: 3,
    theme: "neutral",
    hint: "Attention aux parenthèses et aux nombres négatifs en remplaçant.",
    tags: ["equation", "verification", "litteral_distributivite", "template"],
    generate: () => genVerifier(3),
  },
  {
    kind: "fixed",
    id: "equation_verifier_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_verifier",
    difficulty: 2,
    theme: "neutral",
    text: "Explique comment vérifier que 4 est solution de $2x + 1 = 9$.",
    format: "open",
    expected: ["remplace", "4", "9"],
    comparator: "contains_keyword",
    hint: "Remplace x par 4 dans le premier membre.",
    explanation:
      "Définition : une solution rend l’égalité vraie.\n\n" +
      "Méthode : on remplace x par 4.\n\n" +
      "Calcul : $2 \\times 4 + 1 = 9$.\n\n" +
      "Conclusion : l’égalité est vérifiée, donc 4 est solution.",
    tags: ["equation", "verification", "open"],
  },

  // ---------- EQUATION_PROBLEME ----------
  {
    kind: "fixed",
    id: "equation_probleme_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_probleme",
    difficulty: 3,
    theme: "neutral",
    text: "Le triple d’un nombre augmenté de 2 vaut 17. Quel est ce nombre ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "Pose $3x + 2 = 17$.",
    explanation:
      "Définition : on traduit l’énoncé par une équation.\n\n" +
      "Méthode : on pose $3x + 2 = 17$.\n\n" +
      "Calcul : $3x = 15$ donc $x = 5$.\n\n" +
      "Conclusion : le nombre est 5.",
    tags: ["equation", "probleme"],
  },
  {
    kind: "fixed",
    id: "equation_probleme_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_probleme",
    difficulty: 3,
    theme: "neutral",
    text: "Un rectangle a une longueur double de sa largeur. Son périmètre est 30 cm. Quelle est sa largeur (en cm) ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "Largeur x, longueur 2x : périmètre $2(x + 2x) = 30$.",
    explanation:
      "Définition : on modélise le périmètre par une équation.\n\n" +
      "Méthode : largeur x, longueur 2x, périmètre $2(x + 2x) = 6x$.\n\n" +
      "Calcul : $6x = 30$ donc $x = 5$.\n\n" +
      "Conclusion : la largeur est 5 cm.",
    tags: ["equation", "probleme", "geometrie"],
  },
  {
    kind: "template",
    id: "equation_probleme_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_probleme",
    difficulty: 3,
    theme: "neutral",
    hint: "Appelle x la quantité cherchée, puis écris l’égalité que donne l’énoncé.",
    tags: ["equation", "probleme", "template"],
    generate: () => genProbleme(3),
  },
  {
    kind: "template",
    id: "equation_probleme_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_probleme",
    difficulty: 4,
    theme: "neutral",
    hint: "Exprime chaque quantité en fonction de x, puis additionne-les.",
    tags: ["equation", "probleme", "template"],
    generate: () => genProbleme(4),
  },
  {
    kind: "template",
    id: "equation_probleme_tpl_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_probleme",
    difficulty: 3,
    theme: "neutral",
    hint: "Pose une équation du type ax + b = c.",
    tags: ["equation", "probleme", "template"],
    generate: () => genProbleme(3),
  },
  {
    kind: "template",
    id: "equation_probleme_tpl_6",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_probleme",
    difficulty: 5,
    theme: "neutral",
    hint: "Écris les deux quantités en fonction de x, puis égale-les.",
    tags: ["equation", "probleme", "deux_membres", "template"],
    generate: () => genProbleme(5),
  },
  {
    kind: "fixed",
    id: "equation_probleme_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_probleme",
    difficulty: 4,
    theme: "neutral",
    text: "Explique comment mettre en équation : « le double d’un nombre augmenté de 5 vaut 17 ».",
    format: "open",
    expected: ["2x", "5", "17"],
    comparator: "contains_keyword",
    hint: "Choisis x pour le nombre inconnu.",
    explanation:
      "Définition : on choisit une inconnue et on traduit la phrase.\n\n" +
      "Méthode : x est le nombre ; « le double » donne $2x$, « augmenté de 5 » donne $+ 5$, « vaut 17 » donne $= 17$.\n\n" +
      "Calcul : on obtient $2x + 5 = 17$, donc $x = 6$.\n\n" +
      "Conclusion : l’équation est $2x + 5 = 17$.",
    tags: ["equation", "probleme", "open"],
  },

  // ---------- EQUATION_DEFIS ----------
  {
    kind: "fixed",
    id: "equation_defi_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Résoudre : $4x - 3 = 2x + 7$",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "Regroupe les x d’un côté.",
    explanation:
      "Définition : on regroupe les x d’un côté et les nombres de l’autre.\n\n" +
      "Méthode : on soustrait $2x$ des deux côtés.\n\n" +
      "Calcul : $2x - 3 = 7$ donc $2x = 10$ et $x = 5$.\n\n" +
      "Conclusion : $x = 5$.",
    tags: ["equation", "defi", "avance"],
  },
  {
    kind: "fixed",
    id: "equation_defi_fixed_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Résoudre : $3(x - 1) = 2x + 4$",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "Développe d’abord le membre de gauche.",
    explanation:
      "Définition : on développe puis on regroupe.\n\n" +
      "Méthode : $3(x - 1) = 3x - 3$.\n\n" +
      "Calcul : $3x - 3 = 2x + 4$ donc $x = 7$.\n\n" +
      "Conclusion : $x = 7$.",
    tags: ["equation", "defi", "avance"],
  },
  {
    kind: "template",
    id: "equation_defi_tpl_deux_membres_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Mets les termes en x d’un côté, les nombres de l’autre.",
    tags: ["equation", "defi", "deux_membres", "template"],
    generate: () => genDeuxMembres(),
  },
  {
    kind: "template",
    id: "equation_defi_tpl_deux_membres_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Développe s’il y a des parenthèses, puis regroupe les termes en x.",
    tags: ["equation", "defi", "deux_membres", "template"],
    generate: () => genDeuxMembres(),
  },
  {
    kind: "template",
    id: "equation_defi_tpl_verdict_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Remplace l’inconnue par la valeur proposée : l’égalité est-elle vraie ?",
    tags: ["equation", "defi", "verification", "template"],
    generate: () => genVerdict(),
  },
  {
    kind: "fixed",
    id: "equation_defi_open_balance_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi on fait la même opération des deux côtés d’une équation.",
    format: "open",
    expected: ["égalité", "deux côtés", "équilibre"],
    comparator: "contains_keyword",
    hint: "Pense à une balance.",
    explanation:
      "Définition : une équation est une égalité, comme une balance équilibrée.\n\n" +
      "Méthode : pour garder l’égalité vraie, on fait la même opération des deux côtés.\n\n" +
      "Calcul : ajouter ou retirer la même chose des deux côtés conserve l’équilibre.\n\n" +
      "Conclusion : on agit identiquement des deux côtés pour préserver l’égalité.",
    tags: ["equation", "defi", "open"],
  },
  {
    kind: "fixed",
    id: "equation_defi_fixed_6",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Pour quelle équation $x = 0$ est-il solution ?",
    format: "qcm",
    choices: ["$5x = 0$", "$x + 1 = 0$", "$2x = 4$", "$x - 3 = 0$"],
    expected: ["$5x = 0$"],
    comparator: "mcq_exact",
    hint: "Teste x = 0 dans chaque équation.",
    explanation:
      "Définition : une solution rend l’égalité vraie.\n\n" +
      "Méthode : on remplace x par 0 dans chaque équation.\n\n" +
      "Calcul : $5 \\times 0 = 0$ : vrai ; les autres ne sont pas vérifiées.\n\n" +
      "Conclusion : $x = 0$ est solution de $5x = 0$.",
    tags: ["equation", "defi", "qcm"],
  },
];
