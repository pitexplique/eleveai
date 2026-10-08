import type { CorrecteursMaths } from "./types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { compareAnswer } from "@/lib/tutor/evaluation/comparators";
import { evaluer, egalRel } from "./puissances";

// LES CORRECTEURS DE fractions.bank.ts (notions fraction_nombre et fraction_calcul, 08/10/2026).
// Ils relisent les fractions écrites en LaTeX dans le TEXTE ($\frac{3}{4}$,
// $-\frac{1}{2} + \left(-\frac{1}{4}\right)$…), les entiers, les décimaux et les
// fractions en mots (« les deux tiers de 27 km »), refont le calcul avec leur propre
// lecteur d'expressions, et vérifient : la valeur attendue ; en QCM, une SEULE
// proposition de cette valeur (« 2/4 » face à « 1/2 » serait une deuxième bonne
// réponse) ; la forme irréductible quand la consigne l'exige, et que la fraction
// non simplifiée n'est alors PAS acceptée par le comparateur ; la figure (canvas)
// conforme au texte. Vide = juste.

type Q = TutorGeneratedQuestionV4;

/** LaTeX → écriture lisible par `evaluer` : « -\frac{1}{2} » → « -(1/2) ». */
export function plain(s: string): string {
  return String(s)
    .replace(/\$/g, "")
    .replace(/\\left\(/g, "(")
    .replace(/\\right\)/g, ")")
    .replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, "($1/$2)")
    .replace(/\\times/g, "×")
    .replace(/\\div/g, "÷")
    .replace(/\{,\}/g, ",")
    .replace(/\\ldots/g, "…")
    .replace(/\s+/g, " ")
    .trim();
}
export const val = (s: string): number | null => evaluer(plain(s));
const pgcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : pgcd(b, a % b));
const ILLISIBLE = (t: string) => [`énoncé illisible pour le correcteur : ${t}`];

/** Les fractions du texte, dans l'ordre : [n, d]. */
export function fractionsDe(t: string): [number, number][] {
  return [...t.matchAll(/(-?)\\frac\{(-?\d+)\}\{(-?\d+)\}/g)].map((m) => [
    (m[1] ? -1 : 1) * Number(m[2]),
    Number(m[3]),
  ]);
}
const valeurF = ([n, d]: [number, number]) => n / d;

/** Une réponse écrite « a/b » (ou LaTeX) : [n, d], ou null si ce n'est pas une fraction. */
function lireFraction(s: string): [number, number] | null {
  const p = plain(s).replace(/[−]/g, "-").replace(/\s/g, "");
  let m = p.match(/^(-?)\(?(-?\d+)\/(-?\d+)\)?$/);
  if (m) return [(m[1] ? -1 : 1) * Number(m[2]), Number(m[3])];
  m = p.match(/^-?\(?(-?\d+)\)?$/);
  return m ? [Number(p.replace(/[()]/g, "")), 1] : null;
}
const irreductible = (s: string) => {
  const f = lireFraction(s);
  return f != null && pgcd(f[0], f[1]) === 1;
};

const EXIGE_SIMPLE = /simplifi|la plus simple|irréductible|au maximum/;

/** La réponse numérique : valeur, unicité en QCM, forme simplifiée si exigée. */
function verifierValeur(q: Q, v: number | null, quoi = ""): string[] {
  if (v == null || !Number.isFinite(v)) return ILLISIBLE(q.text);
  const p: string[] = [];
  const memeV = (c: string) => {
    const w = val(c);
    return w != null && egalRel(w, v);
  };
  if (q.format === "qcm") {
    if (!memeV(String(q.expected[0]))) p.push(`attendu « ${q.expected[0]} », le texte donne ${v}${quoi}`);
    const bons = (q.choices ?? []).filter(memeV);
    if (bons.length !== 1) p.push(`${bons.length} propositions valent ${v} : ${bons.join(" | ")}`);
  } else {
    for (const e of q.expected) if (!memeV(String(e))) p.push(`attendu « ${e} », le texte donne ${v}${quoi}`);
  }
  if (EXIGE_SIMPLE.test(q.text)) {
    if (!irreductible(String(q.expected[0])) && lireFraction(String(q.expected[0]))) p.push(`« ${q.expected[0]} » n'est pas irréductible`);
    if (q.format !== "qcm") {
      for (const e of q.expected) if (lireFraction(String(e)) && !irreductible(String(e))) p.push(`variante non simplifiée acceptée : « ${e} »`);
      const f = lireFraction(String(q.expected[0]));
      if (f && f[1] !== 1) {
        const double = `${f[0] * 2}/${f[1] * 2}`;
        if (compareAnswer({ comparator: q.comparator, answer: double, expected: q.expected }))
          p.push(`« ${double} » (non simplifiée) est acceptée alors que la consigne exige la forme simplifiée`);
      }
    }
  }
  return p;
}

/* ── Le calcul demandé ─────────────────────────────────────────────────────── */
const MOTS: [RegExp, number][] = [
  [/la moitié/, 1 / 2], [/le tiers/, 1 / 3], [/les deux tiers/, 2 / 3], [/le quart/, 1 / 4],
  [/les trois quarts/, 3 / 4], [/le cinquième/, 1 / 5], [/les deux cinquièmes/, 2 / 5],
  [/les trois cinquièmes/, 3 / 5], [/les quatre cinquièmes/, 4 / 5], [/le dixième/, 1 / 10],
  [/les trois dixièmes/, 3 / 10],
];
function fractionEnMots(t: string): number | null {
  for (const [re, v] of MOTS) if (re.test(t)) return v;
  const fois = t.match(/(?:le|la) (double|triple|quadruple|quintuple) de/);
  if (fois) return { double: 2, triple: 3, quadruple: 4, quintuple: 5 }[fois[1] as "double"];
  return null;
}

/** Les entiers écrits hors formule (« 30 bouteilles », « 21 L »). */
function entiersHorsFormule(t: string): number[] {
  const sans = t.replace(/\$[^$]*\$/g, " ");
  return [...sans.matchAll(/(?<![\d,])(\d+(?: \d{3})*)(?!\d|,\d|e\b)/g)].map((m) => Number(m[1].replace(/ /g, "")));
}

/** Une expression entre dollars avec une opération : sa valeur (« On pose K = … » : le membre de droite). */
function formuleCalculee(t: string): number | null {
  const fs = [...t.matchAll(/\$([^$]+)\$/g)].map((m) => m[1]).filter((f) => /\\times|\\div|[+]|\s-\s|\\frac.*\\frac|\d\s*-/.test(f));
  const avecOp = fs.filter((f) => /\\times|\\div|\+|\s-\s/.test(f));
  if (!avecOp.length) return null;
  let f = avecOp[avecOp.length - 1];
  if (f.includes("=")) f = f.split("=").pop()!;
  return val(f);
}

/** Les deux fractions d'une situation « a … et b … » : somme, reste ou produit. */
const PARMI_APRES = /^\$\s*(?:d'entre eux|de cette|de ces|des |du jardin|de la forêt|de la partie|de la piste)/;
function situationDeuxFractions(t: string): number | null {
  const fs = fractionsDe(t);
  if (fs.length !== 2 || /\\times|\\div|\+/.test(t)) return null;
  const [a, b] = fs.map(valeurF);
  const apresB = t.slice(t.lastIndexOf("\\frac")).replace(/^\\frac\{\d+\}\{\d+\}/, "");
  if (PARMI_APRES.test(apresB)) return a * b;
  if (/reste|ni |aucun|d'autres|libre|à faire en/.test(t.split(/[.]\s/).pop() ?? "")) return 1 - a - b;
  return a + b;
}

export function valeurCalcul(t: string): number | null {
  const f = formuleCalculee(t);
  if (f != null) return f;
  // « le quotient de A par B », « Divise A par B »
  const quo = t.match(/(?:quotient de|Divise) \$([^$]+)\$ par \$([^$]+)\$/);
  if (quo) {
    const [a, b] = [val(quo[1]), val(quo[2])];
    return a == null || b == null ? null : a / b;
  }
  const fs = fractionsDe(t);
  const ents = entiersHorsFormule(t);
  // « Que vaut 1/4 de 20 ? », « 2/5 de 4/9 », « la moitié de 3/7 »
  const enMots = fractionEnMots(t);
  if (enMots != null && fs.length === 1 && !ents.length) return enMots * valeurF(fs[0]);
  if (/\\frac\{\d+\}\{\d+\}\$ de \$\\frac/.test(t) && fs.length === 2) return valeurF(fs[0]) * valeurF(fs[1]);
  const deux = situationDeuxFractions(t);
  if (deux != null) return deux;
  // une fraction et un entier : produit, ou quotient (« coupé en tronçons de 2/3 m »)
  if (fs.length === 1 && ents.length === 1) {
    // « Quelle fraction … chacun reçoit-il ? » : la fraction partagée en k
    if (/chacun (?:reçoit|cultive|court|prépare|peint)|chaque (?:verre|parcelle|club)/.test(t)) return valeurF(fs[0]) / ents[0];
    // « Combien de tronçons obtient-on ? », « Combien de fois 2/3 y a-t-il dans 4 ? » : n ÷ f
    if (/Combien de fois|Combien d(?:e |')\p{L}+ (?:obtient|peut|y a-t-il|remplit|faut)/u.test(t)) return ents[0] / valeurF(fs[0]);
    return ents[0] * valeurF(fs[0]);
  }
  // une seule fraction écrite : ce qui reste (« Quelle part … reste-t-il ? »), ou sa valeur
  if (fs.length === 1 && !ents.length) return /reste/.test(t) ? 1 - valeurF(fs[0]) : valeurF(fs[0]);
  return null;
}

function corrigerCalcul(q: Q): string[] {
  return verifierValeur(q, valeurCalcul(q.text));
}

/* ── Quantités ─────────────────────────────────────────────────────────────── */
function corrigerQuantite(q: Q): string[] {
  const t = q.text;
  // « Trouve y tel que $\frac{1}{3} \times y = 12$ » : y = 12 ÷ (1/3)
  const eq = t.match(/\$([^$]*\\times\s*[a-z][^$]*)=\s*(\d+)\s*\$/);
  if (eq) {
    const k = val(eq[1].replace(/(?<![a-z\\])[a-z](?![a-z])/, "1"));
    return k ? verifierValeur(q, Number(eq[2]) / k) : ILLISIBLE(t);
  }
  const ecrit = formuleCalculee(t); // « Calcule $\frac{1}{4} \times 24$. »
  if (ecrit != null) return verifierValeur(q, ecrit);
  const fs = fractionsDe(t);
  const ents = entiersHorsFormule(t);
  const f = fs.length === 1 ? valeurF(fs[0]) : fractionEnMots(t);
  if (f == null || ents.length !== 1) return ILLISIBLE(t);
  const N = ents[0];
  let v: number;
  if (/soit \d+|soit \$|est égal à \d+|on obtient \d+|d'un nombre vaut \d+|\$ vaut \d+|de … = \d+|ce qui représente/.test(t)) v = N / f; // « 10 fruits…, soit 1/2 des fruits » : le tout
  else if (/reste|ne (?:sont|font) pas|n'ont pas|n'atteignent pas|sur le banc|ne sont pas/.test(t)) v = N * (1 - f);
  else v = N * f;
  const p = verifierValeur(q, v);
  if (!Number.isInteger(Math.round(v * 1e9) / 1e9)) p.push(`résultat non entier : ${v}`);
  return p;
}

/* ── Fractions égales, simplification ──────────────────────────────────────── */
function corrigerEgaleQcm(q: Q): string[] {
  const fs = fractionsDe(q.text);
  if (fs.length !== 1) return ILLISIBLE(q.text);
  return verifierValeur(q, valeurF(fs[0]));
}

function corrigerManquant(q: Q): string[] {
  const t = plain(q.text);
  // « n/6 = 1/2 », « 2/3 = ?/18 », « 12/y = 6/21 »
  const eg = t.match(/\(([\d?…a-z]+)\/([\d?…a-z]+)\) = \(([\d?…a-z]+)\/([\d?…a-z]+)\)/);
  let v: number | null = null;
  if (eg) {
    const [a, b, c, d] = eg.slice(1);
    const N = (s: string) => (/^\d+$/.test(s) ? Number(s) : null);
    if (N(a) == null) v = (N(c)! * N(b)!) / N(d)!;
    else if (N(b) == null) v = (N(a)! * N(d)!) / N(c)!;
    else if (N(c) == null) v = (N(a)! * N(d)!) / N(b)!;
    else v = (N(b)! * N(c)!) / N(a)!;
  } else {
    const fs = fractionsDe(q.text);
    const den = q.text.match(/avec le dénominateur (\d+)/);
    const num = q.text.match(/avec le numérateur (\d+)/);
    if (fs.length === 1 && den) v = (fs[0][0] * Number(den[1])) / fs[0][1];
    if (fs.length === 1 && num) v = (fs[0][1] * Number(num[1])) / fs[0][0];
  }
  const p = verifierValeur(q, v);
  if (v != null && !Number.isInteger(v)) p.push(`terme manquant non entier : ${v}`);
  return p;
}

function corrigerOuiNonEgales(q: Q): string[] {
  const fs = fractionsDe(q.text);
  if (fs.length !== 2) return ILLISIBLE(q.text);
  const egales = fs[0][0] * fs[1][1] === fs[1][0] * fs[0][1];
  const p: string[] = [];
  if (q.expected[0] !== (egales ? "oui" : "non")) p.push(`attendu « ${q.expected[0]} » : ${fs.map((f) => f.join("/")).join(" et ")}`);
  const cv = (q.canvas as { fractions?: { numerator: number; denominator: number }[] } | undefined)?.fractions;
  if (cv && cv.some((c, i) => c.numerator !== fs[i]?.[0] || c.denominator !== fs[i]?.[1])) p.push("la figure ne montre pas les fractions du texte");
  return p;
}

function corrigerSimplifier(q: Q): string[] {
  const fs = fractionsDe(q.text);
  if (fs.length !== 1) return ILLISIBLE(q.text);
  const [n, d] = fs[0];
  const g = pgcd(n, d);
  const juste = `${n / g}/${d / g}`;
  const p: string[] = [];
  const ok = (c: string) => {
    const f = lireFraction(c);
    return f != null && f[0] * d === n * f[1] && pgcd(f[0], f[1]) === 1;
  };
  if (!ok(String(q.expected[0]))) p.push(`attendu « ${q.expected[0]} », la forme irréductible est ${juste}`);
  if (q.format === "qcm") {
    const bons = (q.choices ?? []).filter(ok);
    if (bons.length !== 1) p.push(`${bons.length} propositions justes`);
  } else if (compareAnswer({ comparator: q.comparator, answer: `${n}/${d}`, expected: q.expected }) && g > 1)
    p.push(`la fraction de l'énoncé « ${n}/${d} », non simplifiée, est acceptée`);
  else if (g > 1 && compareAnswer({ comparator: q.comparator, answer: `${(2 * n) / g}/${(2 * d) / g}`, expected: q.expected }))
    p.push("une fraction non irréductible est acceptée");
  if (g === 1) p.push(`${n}/${d} est déjà irréductible`);
  const cv = (q.canvas as { fraction?: { numerator: number; denominator: number } } | undefined)?.fraction;
  if (cv && (cv.numerator !== n || cv.denominator !== d)) p.push("la figure ne montre pas la fraction du texte");
  return p;
}

function corrigerDiviseurCommun(q: Q): string[] {
  const fs = fractionsDe(q.text);
  const ab = fs.length === 1 ? fs[0] : (q.text.match(/(\d+) et (\d+)/)?.slice(1).map(Number) as [number, number] | undefined);
  if (!ab) return ILLISIBLE(q.text);
  return verifierValeur(q, pgcd(ab[0], ab[1]));
}

function corrigerIrreductibleOuiNon(q: Q): string[] {
  const fs = fractionsDe(q.text);
  const paire = /diviseur commun|divise à la fois/.test(q.text) ? q.text.match(/(\d+) et (\d+)/) : null;
  const ab = fs.length === 1 ? fs[0] : paire ? [Number(paire[1]), Number(paire[2])] : null;
  if (!ab) return ILLISIBLE(q.text);
  const simplifiable = pgcd(ab[0], ab[1]) > 1;
  const t = q.text;
  let oui: boolean;
  if (/irréductible|la plus simple|impossible à simplifier/.test(t)) oui = !simplifiable;
  else if (/simplifier|diviseur commun|divise à la fois/.test(t)) oui = simplifiable;
  else return ILLISIBLE(t);
  return q.expected[0] === (oui ? "oui" : "non") ? [] : [`attendu « ${q.expected[0]} » pour ${ab.join(" et ")}`];
}

/* ── Comparer ──────────────────────────────────────────────────────────────── */
function corrigerPlusGrande(q: Q): string[] {
  const t = q.text;
  const fs = fractionsDe(t);
  const dec = [...t.replace(/\$[^$]*\$/g, " ").matchAll(/(\d+,\d+)/g)].map((m) => m[1]);
  const objets = [...fs.map((f) => ({ v: valeurF(f), s: `\\frac{${f[0]}}{${f[1]}}` })), ...dec.map((d) => ({ v: Number(d.replace(",", ".")), s: d }))];
  if (objets.length !== 2) return ILLISIBLE(t);
  const grand = /plus grand|en dernier|plus à droite/.test(t)
    ? true
    : /plus petit|en premier|plus à gauche/.test(t)
      ? false
      : null;
  if (grand == null) return ILLISIBLE(t);
  // « ordre décroissant… en premier » : le plus grand
  const sens = /décroissant/.test(t) ? !grand : grand;
  const [x, y] = objets;
  const p: string[] = [];
  if (egalRel(x.v, y.v)) {
    if (!/égal|égaux/.test(String(q.expected[0]))) p.push("les deux nombres sont égaux");
    return p;
  }
  const bon = (x.v > y.v) === sens ? x : y;
  const e = String(q.expected[0]);
  const w = /égal|égaux/.test(e) ? null : val(e);
  if (w == null || !egalRel(w, bon.v)) p.push(`attendu « ${e} », le bon est ${bon.s}`);
  const deValeur = (q.choices ?? []).filter((c) => !/égal|égaux/.test(c) && egalRel(val(c) ?? NaN, bon.v));
  if (deValeur.length !== 1) p.push(`${deValeur.length} propositions valent la bonne réponse`);
  return p;
}

function corrigerSigne(q: Q): string[] {
  const fs = fractionsDe(q.text);
  if (fs.length < 2) return ILLISIBLE(q.text);
  const [a, b] = [valeurF(fs[0]), valeurF(fs[1])];
  const s = egalRel(a, b) ? "=" : a > b ? ">" : "<";
  const p: string[] = [];
  if (q.expected[0] !== s) p.push(`attendu « ${q.expected[0]} », il faut « ${s} »`);
  if (q.format !== "qcm" || q.comparator === "contains_keyword") p.push("le choix du signe doit être un QCM (pas de mot-clé)");
  const cv = (q.canvas as { fractions?: { numerator: number; denominator: number }[] } | undefined)?.fractions;
  if (cv && cv.some((c, i) => c.numerator !== fs[i]?.[0] || c.denominator !== fs[i]?.[1])) p.push("la figure ne montre pas les fractions du texte");
  return p;
}

/* ── Décimaux et rationnels ────────────────────────────────────────────────── */
function corrigerVersDecimal(q: Q): string[] {
  const fs = fractionsDe(q.text);
  const calc = q.text.match(/(\d+) ÷ (\d+)|quotient de (\d+) par (\d+)/);
  const v = fs.length === 1 ? valeurF(fs[0]) : calc ? Number(calc[1] ?? calc[3]) / Number(calc[2] ?? calc[4]) : null;
  return verifierValeur(q, v);
}

function corrigerVersFraction(q: Q): string[] {
  const t = plain(q.text);
  const m = t.match(/(-?\d+,\d+|(?<![\d/(])-?\d+(?![\d/,)]))/);
  if (!m) return ILLISIBLE(q.text);
  const v = Number(m[1].replace(",", "."));
  const p = verifierValeur(q, v);
  if (/irréductible/.test(q.text) && !irreductible(String(q.expected[0]))) p.push("réponse non irréductible");
  return p;
}

function corrigerRationnelOuiNon(q: Q): string[] {
  const zero = /\\frac\{-?\d+\}\{0\}/.test(q.text);
  const juste = /rationnel|quotient de deux entiers/.test(q.text) ? (zero ? "non" : "oui") : null;
  if (!juste) return ILLISIBLE(q.text);
  return q.expected[0] === juste ? [] : [`attendu « ${q.expected[0]} », il faut « ${juste} »`];
}

function corrigerGrille(q: Q): string[] {
  const g = (q.canvas as { grid?: { rows: number; cols: number; shaded: number } } | undefined)?.grid;
  const m = q.text.match(/(\d+) cases sur (\d+)/);
  const [s, tot] = g ? [g.shaded, g.rows * g.cols] : m ? [Number(m[1]), Number(m[2])] : [NaN, NaN];
  if (!Number.isFinite(s)) return ILLISIBLE(q.text);
  if (g && m && (Number(m[1]) !== g.shaded || Number(m[2]) !== g.rows * g.cols)) return ["le texte et la grille ne disent pas la même chose"];
  const p = verifierValeur(q, /blanche|non color|pas color/.test(q.text) ? 1 - s / tot : s / tot);
  if (!irreductible(String(q.expected[0]))) p.push("réponse non irréductible");
  if (compareAnswer({ comparator: q.comparator, answer: `${s * 2}/${tot * 2}`, expected: q.expected }) && pgcd(s, tot) === 1)
    p.push("une fraction non simplifiée est acceptée");
  return p;
}

/* ── Inverse, opposé ───────────────────────────────────────────────────────── */
/** Le nombre dont on cherche l'inverse ou l'opposé : la première fraction, sinon le premier nombre écrit. */
function nombreDuTexte(t: string): number | null {
  const fs = fractionsDe(t);
  if (fs.length) return valeurF(fs[0]);
  const m = t.match(/\$\s*(-?\d+(?:\{,\}\d+)?)/);
  return m ? val(m[1]) : null;
}
function corrigerInverse(q: Q): string[] {
  const div = q.text.match(/\\div\s*(-?\\frac\{[^}]+\}\{[^}]+\}|-?\d+)/);
  const x = div ? val(div[1]) : nombreDuTexte(q.text);
  if (x == null || x === 0) return ILLISIBLE(q.text);
  return verifierValeur(q, 1 / x);
}
function corrigerOppose(q: Q): string[] {
  // « Que vaut $-\left(\frac{4}{5}\right)$ ? » : l'opposé de 4/5
  const x = nombreDuTexte(q.text.replace(/-\\left\(/, "\\left("));
  if (x == null) return ILLISIBLE(q.text);
  return verifierValeur(q, -x);
}

/* ── Défis ─────────────────────────────────────────────────────────────────── */
function corrigerMethode(q: Q): string[] {
  const t = q.text;
  let ok: boolean | null = null;
  if (/\\times/.test(t)) ok = /multiplie les numérateurs entre eux et les dénominateurs entre eux/.test(t);
  else if (/\\div/.test(t)) ok = /par l'inverse/.test(t) ? true : /par l'opposé/.test(t) ? false : null;
  else if (/[+-] \\frac|\+/.test(t))
    ok = /écrit les deux fractions avec le dénominateur (\d+)/.test(t)
      ? (() => {
          const D = Number(t.match(/dénominateur (\d+)/)![1]);
          return fractionsDe(t).every(([, d]) => D % d === 0);
        })()
      : /additionne les numérateurs entre eux et les dénominateurs entre eux/.test(t)
        ? false
        : null;
  if (ok == null) return ILLISIBLE(t);
  return q.expected[0] === (ok ? "oui" : "non") ? [] : [`attendu « ${q.expected[0]} », la méthode est ${ok ? "juste" : "fausse"}`];
}

/** Erreur d'élève : le calcul annoncé est faux, et la règle choisie parle de son opération. */
function corrigerRegleOubliee(q: Q): string[] {
  const t = q.text;
  const p: string[] = [];
  const op = /l'inverse de/.test(t) ? "inverse" : /\\div/.test(t) ? "division" : /\\times/.test(t) ? "produit" : /\+/.test(t) ? "somme" : null;
  if (!op) return ILLISIBLE(t);
  if (op !== "inverse") {
    const f = t.match(/\$([^$]+)\$/)![1].split("=");
    const g = val(f[0]);
    const d = val(f[f.length - 1]);
    if (g == null || d == null) return ILLISIBLE(t);
    if (egalRel(g, d)) p.push("le calcul de l'élève est juste : pas d'erreur à corriger");
  }
  const parle: Record<string, RegExp> = { somme: /^on n'additionne/i, produit: /^pour multiplier/i, division: /^diviser par/i, inverse: /^l'opposé change/i };
  const e = String(q.expected[0]);
  if (!parle[op].test(e)) p.push(`la règle attendue ne parle pas de l'opération (${op})`);
  for (const c of q.choices ?? []) if (c !== e && parle[op].test(c)) p.push(`le leurre « ${c} » parle aussi de cette opération`);
  if (q.format !== "qcm") p.push("question ouverte : à convertir en QCM");
  return p;
}

export const CORRECTEURS: CorrecteursMaths = {
  // égalité, simplification
  fraction_egale_tpl_1: corrigerEgaleQcm,
  fraction_egale_tpl_2: corrigerEgaleQcm,
  fraction_egale_tpl_3: corrigerManquant,
  fraction_egale_tpl_4: corrigerOuiNonEgales,
  "4e_fraction_egale_canvas_compare_tpl_1": corrigerOuiNonEgales,
  fraction_simplifier_tpl_1: corrigerSimplifier,
  fraction_simplifier_tpl_2: corrigerSimplifier,
  fraction_simplifier_tpl_5: corrigerSimplifier,
  "4e_fraction_simplifier_canvas_bar_tpl_1": corrigerSimplifier,
  fraction_simplifier_tpl_3: corrigerDiviseurCommun,
  fraction_simplifier_tpl_4: corrigerIrreductibleOuiNon,
  // décimaux, rationnels
  fraction_decimal_tpl_1: corrigerVersDecimal,
  fraction_decimal_tpl_2: corrigerVersDecimal,
  fraction_decimal_tpl_3: corrigerVersDecimal,
  fraction_decimal_tpl_4: corrigerVersDecimal,
  fraction_decimal_tpl_6: corrigerVersDecimal,
  fraction_decimal_tpl_5: corrigerVersFraction,
  fraction_rationnel_tpl_3: corrigerVersFraction,
  fraction_rationnel_tpl_4: corrigerVersFraction,
  fraction_rationnel_tpl_2: corrigerRationnelOuiNon,
  "4e_fraction_rationnel_canvas_grid_tpl_1": corrigerGrille,
  // comparer
  fraction_comparer_tpl_1: corrigerPlusGrande,
  fraction_comparer_tpl_2: corrigerPlusGrande,
  fraction_comparer_tpl_4: corrigerPlusGrande,
  fraction_comparer_tpl_3: corrigerSigne,
  "4e_fraction_comparer_canvas_compare_tpl_1": corrigerSigne,
  // calculs
  fraction_additionner_tpl_1: corrigerCalcul,
  fraction_additionner_tpl_2: corrigerCalcul,
  fraction_additionner_tpl_3: corrigerCalcul,
  fraction_additionner_tpl_4: corrigerCalcul,
  "4e_fraction_additionner_canvas_bar_tpl_1": corrigerCalcul,
  fraction_multiplier_tpl_1: corrigerCalcul,
  fraction_multiplier_tpl_2: corrigerCalcul,
  fraction_multiplier_tpl_3: corrigerCalcul,
  fraction_multiplier_tpl_4: corrigerCalcul,
  fraction_diviser_tpl_1: corrigerCalcul,
  fraction_diviser_tpl_2: corrigerCalcul,
  fraction_diviser_tpl_3: corrigerCalcul,
  fraction_defi_tpl_4: corrigerCalcul,
  // inverse, opposé
  fraction_inverse_tpl_1: corrigerInverse,
  fraction_inverse_tpl_2: corrigerInverse,
  fraction_inverse_tpl_3: corrigerInverse,
  fraction_diviser_tpl_4: corrigerInverse,
  fraction_oppose_tpl_1: corrigerOppose,
  fraction_oppose_tpl_2: corrigerOppose,
  fraction_oppose_tpl_3: corrigerOppose,
  // quantités
  fraction_quantite_tpl_1: corrigerQuantite,
  fraction_quantite_tpl_2: corrigerQuantite,
  fraction_quantite_tpl_3: corrigerQuantite,
  fraction_quantite_tpl_4: corrigerQuantite,
  fraction_quantite_tpl_5: corrigerQuantite,
  "4e_fraction_quantite_canvas_circle_tpl_1": corrigerQuantite,
  fraction_defi_tpl_3: corrigerQuantite,
  // défis
  fraction_defi_tpl_2: corrigerMethode,
  fraction_defi_open_1: corrigerRegleOubliee,
};
