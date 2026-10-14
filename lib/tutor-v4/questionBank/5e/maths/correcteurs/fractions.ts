import type { CorrecteursMaths } from "./types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { compareAnswer } from "@/lib/tutor/evaluation/comparators";
import { qcmUnique } from "@/lib/tutor-v4/questionBank/6e/maths/correcteurs/pourcentages";
import { poly } from "@/lib/tutor-v4/questionBank/4e/maths/correcteurs/expressions-litterales";

// LES CORRECTEURS DE fractions.bank.ts (5e : fraction_nombre et fraction_calcul, 09/10/2026).
// Voir 6e/maths/correcteurs/types.ts. Chacun relit les fractions écrites dans le
// TEXTE que voit l'élève ($\dfrac{3}{4}$, $-\dfrac{3}{4}$), les entiers et les
// quantités (« 24 km »), la figure s'il y en a une, refait le calcul avec son
// propre lecteur (les polynômes du calcul littéral de 4e, qui calculent juste
// avec les fractions), et rend la liste des problèmes (vide = juste) :
// la valeur attendue ; en QCM, UNE SEULE proposition de cette valeur (« 2/4 » et
// « 1/2 » seraient deux bonnes réponses) ; la forme irréductible quand la
// consigne l'exige, sans que la fraction non simplifiée soit acceptée ;
// « Vrai ou faux » répondu par vrai / faux ; l'unité d'une quantité.

type Q = TutorGeneratedQuestionV4;
type Fr = [number, number];

const pgcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : pgcd(b, a % b));
const memeValeur = (a: Fr, b: Fr) => a[0] * b[1] === a[1] * b[0];
const ecrire = (f: Fr) => `${f[0]}/${f[1]}`;
// 1e-6 : le lecteur de polynômes arrondit chaque coefficient à 1e-9 (1/6 → 0,166666667).
const egal = (a: number | null | undefined, b: number | null | undefined) => a != null && b != null && Math.abs(a - b) < 1e-6;

/** Les fractions écrites dans le texte, dans l'ordre ; un « ? » (nombre manquant) vaut NaN. */
export function fractionsDuTexte(t: string): Fr[] {
  return [...t.matchAll(/(\$-|\(-|\\left\(-)?\\dfrac\{(\d+|\?)\}\{(\d+|\?)\}/g)].map((m) => [
    (m[1] ? -1 : 1) * (m[2] === "?" ? NaN : Number(m[2])),
    m[3] === "?" ? NaN : Number(m[3]),
  ]);
}

/** Une réponse tapée « 3/4 », « -3/4 », « −3/4 », « 2 » → [n, d] ; null sinon. */
export function lireFr(s: string): Fr | null {
  const p = String(s).replace(/[−–]/g, "-").replace(/\s/g, "");
  let m = p.match(/^(-?\d+)\/(\d+)$/);
  if (m && Number(m[2]) !== 0) return [Number(m[1]), Number(m[2])];
  m = p.match(/^(-?\d+)$/);
  return m ? [Number(m[1]), 1] : null;
}

/** La valeur d'une formule LaTeX (« \dfrac{1}{4} + \dfrac{2}{3} \times 6 ») ; null si illisible. */
export function valeurFormule(f: string): number | null {
  const s = f
    .replace(/\$/g, "")
    .replace(/\\left\(/g, "(")
    .replace(/\\right\)/g, ")")
    .replace(/\\dfrac\{(\d+)\}\{(\d+)\}/g, "($1/$2)")
    .replace(/\\times/g, "×")
    .replace(/\\div/g, "÷");
  const P = poly(s);
  if (!P) return null;
  if ([...P.keys()].some((k) => k !== "")) return null;
  return P.get("") ?? 0;
}

const valeurFr = (f: Fr) => f[0] / f[1];

/** Le QCM a-t-il une seule proposition de la valeur juste, et est-ce l'attendue ? */
function qcmValeur(q: Q, v: number): string[] {
  if (q.format !== "qcm") return ["QCM attendu"];
  return qcmUnique(q, (c) => {
    const f = lireFr(c);
    return f != null && egal(valeurFr(f), v);
  });
}

/** Réponse courte numérique : l'attendue vaut v, et le comparateur l'accepte. */
function courteValeur(q: Q, v: number, quoi: string): string[] {
  const f = lireFr(String(q.expected[0]));
  if (!f || !egal(valeurFr(f), v)) return [`attendu « ${q.expected[0]} », le calcul refait donne ${v} (${quoi})`];
  return [];
}

/** Oui / non (ou vrai / faux) : la bonne, selon la vérité de l'énoncé. */
function ouiNon(q: Q, vrai: boolean): string[] {
  const c = q.choices ?? [];
  const vf = c.includes("vrai");
  return qcmUnique(q, (x) => x === (vrai ? (vf ? "vrai" : "oui") : vf ? "faux" : "non"));
}

/** Règles de toutes les questions : « Vrai ou faux » se répond par vrai / faux. */
function regles(q: Q): string[] {
  const p: string[] = [];
  const vf = /Vrai ou faux/.test(q.text);
  const c = q.choices ?? [];
  if (vf && !(c.includes("vrai") && c.includes("faux"))) p.push("« Vrai ou faux ? » sans les choix vrai / faux");
  if (!vf && c.includes("vrai")) p.push("choix vrai / faux sans « Vrai ou faux » dans la question");
  if (/reste-t-elle/.test(q.text)) p.push("accord : « reste-t-il » est impersonnel");
  if (q.comparator === "contains_keyword") p.push("question à mots-clés : passer en QCM ou en réponse précise");
  return p;
}
function avecRegles(c: CorrecteursMaths): CorrecteursMaths {
  return Object.fromEntries(Object.entries(c).map(([id, f]) => [id, (q: Q) => [...regles(q), ...f(q)]]));
}

/** La figure (fraction) montre-t-elle exactement ces fractions ? */
function figureConforme(q: Q, attendues: Fr[]): string[] {
  const c = q.canvas as { kind?: string; fraction?: { numerator: number; denominator: number }; fractions?: { numerator: number; denominator: number; label?: string }[]; grid?: { rows: number; cols: number; shaded: number } } | undefined;
  if (!c) return [];
  if (c.kind !== "fraction") return [`figure de type ${c.kind} inattendue`];
  const montrees: Fr[] = c.fractions ? c.fractions.map((x) => [x.numerator, x.denominator]) : c.fraction ? [[c.fraction.numerator, c.fraction.denominator]] : c.grid ? [[c.grid.shaded, c.grid.rows * c.grid.cols]] : [];
  const p: string[] = [];
  if (montrees.length !== attendues.length || montrees.some((m, i) => m[0] !== attendues[i][0] || m[1] !== attendues[i][1]))
    p.push(`la figure montre ${montrees.map(ecrire).join(", ")}, le texte ${attendues.map(ecrire).join(", ")}`);
  for (const x of c.fractions ?? []) if (x.label && x.label !== `${x.numerator}/${x.denominator}`) p.push(`étiquette « ${x.label} » pour ${x.numerator}/${x.denominator}`);
  if (montrees.some((m) => m[0] > m[1] || m[0] < 0)) p.push("la figure ne peut pas colorier plus que le tout");
  return p;
}

/* ── fraction_egale ─────────────────────────────────────────────────────── */

function cEgale(q: Q): string[] {
  const t = q.text;
  const fs = fractionsDuTexte(t);
  // Nombre manquant : $\dfrac{a}{b} = \dfrac{?}{c}$
  const trou = fs.find((f) => Number.isNaN(f[0]) || Number.isNaN(f[1]));
  if (trou) {
    const connue = fs.find((f) => !Number.isNaN(f[0]) && !Number.isNaN(f[1]));
    if (!connue) return ["égalité illisible"];
    const x = Number.isNaN(trou[0]) ? (connue[0] * trou[1]) / connue[1] : (connue[1] * trou[0]) / connue[0];
    const p: string[] = [];
    if (!Number.isInteger(x)) p.push(`le nombre manquant n'est pas entier (${x})`);
    if (q.comparator !== "number_equal") p.push(`comparateur ${q.comparator} pour un nombre`);
    if (Number(q.expected[0]) !== x) p.push(`attendu « ${q.expected[0]} », le calcul refait donne ${x}`);
    return p;
  }
  const c = q.choices ?? [];
  if (c.includes("oui") || c.includes("vrai")) {
    const colorie = t.match(/colorie (\d+) cases sur (\d+)/);
    const paire: Fr[] | null = colorie ? (fs.length ? [fs[0], [Number(colorie[1]), Number(colorie[2])]] : null) : fs.length >= 2 ? [fs[0], fs[1]] : null;
    if (!paire) return ["les deux fractions à comparer sont illisibles"];
    if (q.canvas && !colorie) return [...figureConforme(q, paire), ...ouiNon(q, memeValeur(paire[0], paire[1]))];
    return ouiNon(q, memeValeur(paire[0], paire[1]));
  }
  if (fs.length !== 1) return [`une seule fraction attendue dans le texte (${fs.length})`];
  return qcmValeur(q, valeurFr(fs[0]));
}

/* ── fraction_simplifier ────────────────────────────────────────────────── */

const EXIGE_IRREDUCTIBLE = /irréductible|simplifi|le plus possible|le plus simplement|au maximum/i;

/** Les entiers écrits hors formule (« 18 élèves sur 24 »). */
function entiersHorsFormule(t: string): number[] {
  return [...t.replace(/\$[^$]*\$/g, " ").matchAll(/(?<![\d,])\d+(?![\d,])/g)].map((m) => Number(m[0]));
}

function cSimplifier(q: Q): string[] {
  const t = q.text;
  const fs = fractionsDuTexte(t);
  let f: Fr | null = null;
  const p: string[] = [];
  const c = q.canvas as { fraction?: { numerator: number; denominator: number } } | undefined;
  if (c?.fraction) {
    f = [c.fraction.numerator, c.fraction.denominator];
    const ns = entiersHorsFormule(t);
    if (!ns.includes(f[0]) || !ns.includes(f[1])) p.push(`le texte ne dit pas ${f[0]} parts sur ${f[1]} comme la figure`);
    p.push(...figureConforme(q, [f]));
  } else if (fs.length === 1) f = fs[0];
  else if (fs.length === 0) {
    const ns = entiersHorsFormule(t);
    if (ns.length === 2) f = [Math.min(...ns), Math.max(...ns)];
  }
  if (!f) return ["fraction à simplifier introuvable"];
  const g = pgcd(f[0], f[1]);
  if (g === 1) p.push(`${ecrire(f)} est déjà irréductible`);
  if (/par quel nombre|plus grand nombre qui divise/i.test(t)) {
    if (Number(q.expected[0]) !== g) p.push(`attendu « ${q.expected[0]} », le plus grand diviseur commun est ${g}`);
    return p;
  }
  if (!EXIGE_IRREDUCTIBLE.test(t)) p.push("la consigne n'exige pas la forme irréductible");
  const juste: Fr = [f[0] / g, f[1] / g];
  if (q.format === "qcm") return [...p, ...qcmValeur(q, valeurFr(juste)), ...(String(q.expected[0]) === ecrire(juste) ? [] : [`la bonne proposition « ${q.expected[0]} » n'est pas irréductible`])];
  if (String(q.expected[0]) !== ecrire(juste)) p.push(`attendu « ${q.expected[0]} », la forme irréductible est ${ecrire(juste)}`);
  for (const nonSimplifiee of [ecrire(f), ecrire([juste[0] * 2, juste[1] * 2])])
    if (compareAnswer({ comparator: q.comparator, answer: nonSimplifiee, expected: q.expected })) p.push(`« ${nonSimplifiee} » (non simplifiée) est acceptée`);
  return p;
}

/* ── fraction_rationnel ─────────────────────────────────────────────────── */

const lireDecimal = (s: string): number | null => {
  const m = String(s).match(/^\s*(-?\d+(?:,\d+)?)/);
  return m ? Number(m[1].replace(",", ".")) : null;
};
const nbDecimales = (s: string) => (String(s).match(/,(\d+)/)?.[1].length ?? 0);

/** Fraction juste écrite telle quelle (réponse courte exacte) ou unique en QCM. */
function fractionExacte(q: Q, juste: Fr, quoi: string): string[] {
  const j = irrFr(juste);
  if (q.format === "qcm") return qcmValeur(q, valeurFr(j));
  const p: string[] = [];
  if (String(q.expected[0]) !== ecrire(j)) p.push(`attendu « ${q.expected[0]} », ${quoi} donne ${ecrire(j)}`);
  if (q.comparator !== "exact_text") p.push(`comparateur ${q.comparator} : une fraction exacte attend exact_text`);
  return p;
}
const irrFr = (f: Fr): Fr => {
  const g = pgcd(f[0], f[1]) || 1;
  return [f[0] / g, f[1] / g];
};

function cRationnel(q: Q): string[] {
  const t = q.text;
  const fs = fractionsDuTexte(t);
  const p: string[] = [];
  const grille = (q.canvas as { grid?: { rows: number; cols: number; shaded: number } } | undefined)?.grid;
  if (grille) {
    const f: Fr = [grille.shaded, grille.rows * grille.cols];
    const ns = entiersHorsFormule(t);
    if (ns.length && (!ns.includes(f[0]) || !ns.includes(f[1]))) p.push(`le texte ne dit pas ${f[0]} cases sur ${f[1]} comme la figure`);
    if (!EXIGE_IRREDUCTIBLE.test(t)) p.push("la consigne n'exige pas la forme irréductible");
    if (compareAnswer({ comparator: q.comparator, answer: ecrire(f), expected: q.expected }) && pgcd(f[0], f[1]) > 1) p.push(`« ${ecrire(f)} » (non simplifiée) est acceptée`);
    return [...p, ...fractionExacte(q, f, "la grille")];
  }
  if (/entiers? consécutifs|entiers qui se suivent|kilomètres entiers/.test(t)) {
    if (fs.length !== 1) return ["fraction à encadrer introuvable"];
    const e = Math.floor(valeurFr(fs[0]));
    if ((q.choices ?? []).some((c) => !/^entre (\d+) et (\d+)$/.test(c) || Number(c.split(" ")[3]) !== Number(c.split(" ")[1]) + 1)) p.push("une proposition n'est pas « entre k et k + 1 »");
    return [...p, ...qcmUnique(q, (c) => c === `entre ${e} et ${e + 1}`)];
  }
  // d'un nombre décimal à la fraction irréductible
  const dec = t.replace(/\$[^$]*\$/g, " ").match(/(?<![\d,])(\d+,\d+)(?![\d,])/);
  if (dec && !fs.length) {
    if (!EXIGE_IRREDUCTIBLE.test(t)) p.push("la consigne n'exige pas la forme irréductible");
    const v = Number(dec[1].replace(",", "."));
    const k = 10 ** nbDecimales(dec[1]);
    const f: Fr = [Math.round(v * k), k];
    if (compareAnswer({ comparator: q.comparator, answer: ecrire(f), expected: q.expected }) && pgcd(f[0], f[1]) > 1) p.push(`« ${ecrire(f)} » (non simplifiée) est acceptée`);
    return [...p, ...fractionExacte(q, f, dec[1])];
  }
  // écriture décimale d'une fraction
  if (/décimal|virgule|calculatrice/.test(t)) {
    const div = t.match(/(\d+) ÷ (\d+)/);
    const v = fs.length === 1 ? valeurFr(fs[0]) : div ? Number(div[1]) / Number(div[2]) : null;
    if (v == null) return ["quotient introuvable"];
    const e = String(q.expected[0]);
    if (!egal(lireDecimal(e), v)) p.push(`attendu « ${e} », le quotient vaut ${v}`);
    if (/kilomètre/.test(t)) {
      if (!/ km$/.test(e)) p.push(`unité km absente de « ${e} »`);
      if (nbDecimales(e) > 2) p.push(`mesure à plus de deux décimales : ${e}`);
    }
    if (q.comparator !== "number_equal") p.push(`comparateur ${q.comparator} pour un nombre`);
    return p;
  }
  // un quotient a ÷ b à écrire en fraction
  let m: RegExpMatchArray | null;
  let f: Fr | null = null;
  if ((m = t.match(/quotient de (\d+) par (\d+)/))) f = [Number(m[1]), Number(m[2])];
  else if ((m = t.match(/(\d+) ÷ (\d+)/))) f = [Number(m[1]), Number(m[2])];
  else if ((m = t.match(/(\d+) × … = (\d+)/))) f = [Number(m[2]), Number(m[1])];
  else if ((m = t.match(/multiplié par (\d+), donne (\d+)/))) f = [Number(m[2]), Number(m[1])];
  else if (/partage|répartit|découpée|coupe|verse/.test(t)) {
    const ns = entiersHorsFormule(t);
    if (ns.length >= 2) f = [ns[0], ns[1]];
  }
  if (!f) return ["quotient introuvable"];
  if (f[0] % f[1] === 0) p.push(`${f[0]} ÷ ${f[1]} est entier : la fraction n'a pas d'intérêt`);
  return [...p, ...fractionExacte(q, f, `${f[0]} ÷ ${f[1]}`)];
}

/* ── fraction_comparer ──────────────────────────────────────────────────── */

/** Les fractions du texte avec leur position (pour savoir à qui elles sont). */
function fractionsPlacees(t: string): { f: Fr; i: number }[] {
  return [...t.matchAll(/(\$-)?\\dfrac\{(\d+)\}\{(\d+)\}/g)].map((m) => ({ f: [(m[1] ? -1 : 1) * Number(m[2]), Number(m[3])] as Fr, i: m.index! }));
}
const signeDe = (a: Fr, b: Fr) => (memeValeur(a, b) ? "=" : valeurFr(a) > valeurFr(b) ? ">" : "<");

function cComparer(q: Q): string[] {
  const t = q.text;
  const c = q.choices ?? [];
  const fs = fractionsDuTexte(t);
  const p: string[] = [];
  if (/(?:que|à) 1\b/.test(t)) {
    if (fs.length !== 1) return ["une seule fraction attendue"];
    const plus = fs[0][0] > fs[0][1];
    if (fs[0][0] === fs[0][1]) return ["la fraction vaut 1"];
    if (c.includes("oui")) return ouiNon(q, /plus grande que 1/.test(t) === plus);
    return qcmUnique(q, (x) => x === (plus ? "plus grande que 1" : "plus petite que 1"));
  }
  if (fs.length !== 2) return [`deux fractions attendues (${fs.length})`];
  const [a, b] = fs;
  const s = signeDe(a, b);
  if (q.canvas) p.push(...figureConforme(q, [a, b]));
  if (c.includes("<")) return [...p, ...qcmUnique(q, (x) => x === s)];
  if (s === "=") return [...p, "les deux fractions sont égales : la question n'a pas de réponse"];
  if (c.includes("vrai")) {
    const m = t.match(/\$[^$]*\s([<>])\s[^$]*\$/);
    if (!m) return ["relation illisible"];
    return [...p, ...ouiNon(q, m[1] === s)];
  }
  const plusGrand = /plus grande|le plus \?/.test(t);
  const plusPetit = /plus petite|le moins \?/.test(t);
  if (plusGrand === plusPetit) return ["question illisible (la plus grande ou la plus petite ?)"];
  const bonne = (s === ">") === plusGrand ? 0 : 1;
  if (c.every((x) => lireFr(x))) return [...p, ...qcmUnique(q, (x) => memeValeur(lireFr(x)!, [a, b][bonne]))];
  // des prénoms : chacun a la fraction écrite juste après son nom
  const places = fractionsPlacees(t);
  const aQui = (nom: string) => {
    const i = t.indexOf(nom);
    return places.find((x) => x.i > i)?.f ?? null;
  };
  if (c.some((nom) => !aQui(nom))) return ["à qui sont les fractions ?"];
  const fa = aQui(c[0])!;
  const fb = aQui(c[1])!;
  if (memeValeur(fa, fb) && !(fa === fb)) return [...p, "les deux personnes ont autant"];
  if (fa === fb) return ["les deux prénoms pointent la même fraction"];
  if (fa[0] >= fa[1] || fb[0] >= fb[1]) p.push("une part plus grande que le tout");
  const gagnant = (valeurFr(fa) > valeurFr(fb)) === plusGrand ? c[0] : c[1];
  return [...p, ...qcmUnique(q, (x) => x === gagnant)];
}

/* ── fraction_oppose ────────────────────────────────────────────────────── */

function cOppose(q: Q): string[] {
  const t = q.text;
  const fs = fractionsDuTexte(t);
  if (!fs.length) return ["fraction introuvable"];
  const a = fs[0];
  const p: string[] = [];
  for (const s of [t, ...(q.choices ?? []), ...q.expected].map(String)) if (/(^|[\s(])-\d/.test(s.replace(/\$[^$]*\$/g, ""))) p.push(`tiret au lieu du signe moins « − » : « ${s} »`);
  if (/affirme|Pour .+, l’opposé/.test(t)) {
    if (fs.length !== 2) return ["affirmation illisible"];
    return [...p, ...ouiNon(q, memeValeur(fs[1], [-a[0], a[1]]))];
  }
  if (/\$[^$]*\+[^$]*\$/.test(t) && !/…/.test(t)) {
    const v = valeurFormule(t.match(/\$([^$]*\+[^$]*)\$/)![1]);
    if (v == null) return ["somme illisible"];
    return [...p, ...(egal(Number(q.expected[0]), v) ? [] : [`attendu « ${q.expected[0]} », la somme vaut ${v}`])];
  }
  const v = /l’opposé de l’opposé|puis l’opposé du résultat/.test(t) ? valeurFr(a) : -valeurFr(a);
  if (!/opposé|= 0|obtenir 0|donne 0|symétriquement/.test(t)) return ["question illisible"];
  return [...p, ...(q.format === "qcm" ? qcmValeur(q, v) : courteValeur(q, v, "l’opposé"))];
}

/* ── fraction_defi (fraction_nombre) ────────────────────────────────────── */

function cDefiNombre(q: Q): string[] {
  const t = q.text;
  const c = q.choices ?? [];
  const fs = fractionsDuTexte(t);
  const p: string[] = [];
  // deux objets identiques partagés en a et b parts égales
  const parts = [...t.matchAll(/(\d+) parts égales/g)].map((m) => ({ n: Number(m[1]), i: m.index! }));
  if (parts.length === 2) {
    const k = Number(t.match(/(?:prend|garde|reçoit) (\d+) parts/)?.[1] ?? (/(?:prend|garde|reçoit) une part/.test(t) ? 1 : NaN));
    if (!Number.isFinite(k)) return ["nombre de parts prises illisible"];
    if (parts[0].n === parts[1].n) return ["les deux partages sont identiques"];
    if (k >= Math.min(parts[0].n, parts[1].n)) p.push(`on prend ${k} parts sur ${Math.min(parts[0].n, parts[1].n)}`);
    const pour = /parts égales pour/.test(t);
    const aQui = (nom: string) => {
      const i = t.indexOf(nom);
      return pour ? [...parts].reverse().find((x) => x.i < i)?.n : parts.find((x) => x.i > i)?.n;
    };
    const plus = /le plus\b/.test(t);
    if (plus === /le moins\b/.test(t)) return ["le plus ou le moins ?"];
    const [na, nb] = c.map(aQui);
    if (!na || !nb || na === nb) return ["à qui sont les partages ?"];
    const gagnant = (na < nb) === plus ? c[0] : c[1];
    return [...p, ...qcmUnique(q, (x) => x === gagnant)];
  }
  // ranger trois fractions
  if (c.some((x) => x.includes(" ; "))) {
    if (fs.length !== 3) return ["trois fractions attendues"];
    const croissant = /de la plus petite à la plus grande/.test(t);
    if (croissant === /de la plus grande à la plus petite/.test(t)) return ["ordre demandé illisible"];
    const bon = (x: string) => {
      const l = x.split(" ; ").map(lireFr);
      if (l.length !== 3 || l.some((f) => !f)) return false;
      if (!fs.every((f) => l.some((g) => memeValeur(f, g!)))) return false;
      return l.every((f, i) => i === 0 || (croissant ? valeurFr(l[i - 1]!) < valeurFr(f!) : valeurFr(l[i - 1]!) > valeurFr(f!)));
    };
    return qcmUnique(q, bon);
  }
  // la seule fraction plus grande (plus petite) que 1
  if (/que 1\b/.test(t) && c.length && c.every((x) => lireFr(x))) {
    const plus = /plus grande que 1/.test(t);
    return qcmUnique(q, (x) => {
      const f = lireFr(x)!;
      return plus ? f[0] > f[1] : f[0] < f[1];
    });
  }
  // la moitié
  const sansDemi = fs.filter((f) => !(f[0] === 1 && f[1] === 2));
  if (sansDemi.length === 2) return cComparer(q);
  if (sansDemi.length === 1 && /moitié|\\dfrac\{1\}\{2\}/.test(t)) {
    const f = sansDemi[0];
    if (2 * f[0] === f[1]) return ["la fraction vaut la moitié"];
    const dessus = 2 * f[0] > f[1];
    if (c.includes("oui")) return ouiNon(q, /plus grande que la moitié/.test(t) === dessus);
    return qcmUnique(q, (x) => x === (dessus ? c.find((y) => /^plus/.test(y)) : c.find((y) => /^(moins|plus petite)/.test(y))));
  }
  return ["question non reconnue"];
}

/* ── fraction_calcul : additionner, multiplier ──────────────────────────── */

/** La formule à calculer (« \dfrac{1}{4} + \dfrac{2}{3} = \ldots » → la partie avant « = »). */
function formuleACalculer(t: string): string | null {
  const m = t.match(/\$([^$]*(?:\s[+-]\s|\\times)[^$]*)\$/);
  return m ? m[1].split("=")[0] : null;
}

/** Une fraction juste : la valeur, la forme irréductible si la consigne l'exige, sinon l'irréductible acceptée. */
function verifierCalcul(q: Q, v: number, quoi: string): string[] {
  const p: string[] = [];
  for (const e of q.expected) {
    const f = lireFr(String(e));
    if (!f || !egal(valeurFr(f), v)) p.push(`attendu « ${e} », ${quoi} vaut ${v}`);
  }
  const f0 = lireFr(String(q.expected[0]));
  if (!f0) return p;
  const j = irrFr(f0[1] < 0 ? [-f0[0], -f0[1]] : f0);
  if (EXIGE_IRREDUCTIBLE.test(q.text)) {
    if (q.comparator !== "exact_text") p.push(`forme irréductible exigée mais comparateur ${q.comparator}`);
    if ((j[1] === 1 ? String(j[0]) : ecrire(j)) !== String(q.expected[0]).replace(/−/g, "-")) p.push(`« ${q.expected[0]} » n'est pas irréductible`);
    if (j[1] !== 1 && compareAnswer({ comparator: q.comparator, answer: ecrire([j[0] * 2, j[1] * 2]), expected: q.expected }))
      p.push(`« ${ecrire([j[0] * 2, j[1] * 2])} » (non simplifiée) est acceptée`);
  } else {
    const ej = j[1] === 1 ? String(j[0]) : ecrire(j);
    if (!compareAnswer({ comparator: q.comparator, answer: ej, expected: q.expected })) p.push(`la forme irréductible « ${ej} » est refusée`);
  }
  return p;
}

function cAddition(q: Q): string[] {
  const t = q.text;
  const fs = fractionsDuTexte(t);
  const p: string[] = [];
  let v: number | null = null;
  const formule = formuleACalculer(t);
  if (formule) v = valeurFormule(formule);
  else if (fs.length === 2) {
    const [a, b] = fs.map(valeurFr);
    if (/Il restait/.test(t) && /reste-t-il/.test(t)) v = a - b;
    else if (/reste-t-il/.test(t)) v = 1 - a - b;
    else if (/en tout|à eux deux|à elles deux/.test(t)) v = a + b;
    if (v != null && (v <= 0 || v > 1)) p.push(`résultat ${v} impossible en situation (une part d'un tout)`);
    if (fs.some((f) => f[0] >= f[1])) p.push("une part plus grande que le tout");
  }
  if (v == null) return ["calcul illisible"];
  if (q.canvas) p.push(...figureConforme(q, fs));
  return [...p, ...verifierCalcul(q, v, formule ?? "la situation")];
}

function cMultiplication(q: Q): string[] {
  const t = q.text;
  const formule = formuleACalculer(t);
  if (formule) {
    if (!/\\times/.test(formule)) return ["produit attendu"];
    const v = valeurFormule(formule);
    return v == null ? ["calcul illisible"] : verifierCalcul(q, v, formule);
  }
  // situation : « a de … ; b de cette partie / d'entre eux / de ces … / en mange b »
  const fs = fractionsDuTexte(t);
  if (fs.length !== 2) return ["deux fractions attendues"];
  if (!/de cette|d’entre eux|de ces|des poissons rouges|en mange/.test(t)) return ["« b de a » introuvable : produit non justifié"];
  const p = fs.some((f) => f[0] >= f[1]) ? ["une part plus grande que le tout"] : [];
  return [...p, ...verifierCalcul(q, valeurFr(fs[0]) * valeurFr(fs[1]), "le produit")];
}

/* ── fraction_quantite ──────────────────────────────────────────────────── */

const UNITES: [RegExp, string][] = [
  [/\d km\b/, "km"], [/\d cL\b/, "cL"], [/\d minutes\b/, "min"], [/\d g\b/, "g"], [/\d m\b/, "m"], [/\d ares\b/, "ares"], [/\d+,\d\d €/, "€"],
];

function cQuantite(q: Q): string[] {
  const t = q.text;
  const fs = fractionsDuTexte(t);
  if (fs.length !== 1) return ["une seule fraction attendue"];
  const f = fs[0];
  const ns = [...t.replace(/\$[^$]*\$/g, " ").matchAll(/(?<![\d,])\d+(?:,\d+)?(?![\d,])/g)].map((m) => Number(m[0].replace(",", ".")));
  if (ns.length !== 1) return [`une seule quantité attendue (${ns.join(", ")})`];
  const N = ns[0];
  const p: string[] = [];
  if (f[0] >= f[1]) p.push("une part plus grande que le tout");
  const part = (N * f[0]) / f[1];
  if (!Number.isInteger(part)) p.push(`${ecrire(f)} de ${N} n'est pas entier`);
  const v = /reste|ne viennent pas|ne sont pas|sur le banc/.test(t) ? N - part : part;
  const e = String(q.expected[0]);
  if (!egal(lireDecimal(e), v)) p.push(`attendu « ${e} », le calcul refait donne ${v}`);
  const u = UNITES.find(([re]) => re.test(t))?.[1];
  if (u && !e.endsWith(` ${u}`)) p.push(`unité ${u} absente de « ${e} »`);
  if (u === "€" && !/,\d\d €$/.test(e)) p.push(`prix sans deux décimales : « ${e} »`);
  if (!u && /[a-z]/i.test(e)) p.push(`unité inattendue dans « ${e} »`);
  if (q.comparator !== "number_equal") p.push(`comparateur ${q.comparator} pour un nombre`);
  if (q.canvas) p.push(...figureConforme(q, [f]));
  return p;
}

/* ── fraction_calcul_defi ───────────────────────────────────────────────── */

function cCalculDefi(q: Q): string[] {
  const t = q.text;
  const fs = fractionsDuTexte(t);
  // l'erreur d'un élève : le membre de gauche, recalculé
  const err = t.match(/\$([^$=]+)=[^$]*\$/);
  if (err && /faux|Corrige/.test(t)) {
    const v = valeurFormule(err[1]);
    if (v == null) return ["calcul de l'élève illisible"];
    const p = fs.length === 3 && memeValeur(fs[2], [Math.round(v * fs[2][1]), fs[2][1]]) && egal(valeurFr(fs[2]), v) ? ["le calcul de l'élève est juste"] : [];
    return [...p, ...qcmValeur(q, v)];
  }
  const recette = t.match(/que (la moitié|le tiers|le quart) de la recette/);
  if (recette) {
    if (fs.length !== 1) return ["une fraction attendue"];
    const k = { "la moitié": 2, "le tiers": 3, "le quart": 4 }[recette[1]]!;
    return verifierCalcul(q, valeurFr(fs[0]) / k, `${recette[1]} de ${ecrire(fs[0])}`);
  }
  const formule = formuleACalculer(t);
  if (formule) {
    const v = valeurFormule(formule);
    return v == null ? ["calcul illisible"] : verifierCalcul(q, v, formule);
  }
  // deux parts d'une quantité N
  if (fs.length !== 2) return ["deux fractions attendues"];
  const ns = [...t.replace(/\$[^$]*\$/g, " ").matchAll(/(?<![\d,])\d+(?:,\d+)?(?![\d,])/g)].map((m) => Number(m[0].replace(",", ".")));
  if (ns.length !== 1) return [`une seule quantité attendue (${ns.join(", ")})`];
  const N = ns[0];
  const [a, b] = fs.map(valeurFr);
  const p: string[] = [];
  let v: number;
  if (/de ce qui reste/.test(t)) v = N * (1 - a) * (1 - b);
  else {
    if (a + b >= 1) p.push("les deux parts dépassent le tout");
    v = /reste/.test(t.split(/\.\s/).pop() ?? "") ? N * (1 - a - b) : N * (a + b);
  }
  if (!Number.isInteger(Math.round(v * 1e6) / 1e6)) p.push(`résultat non entier : ${v}`);
  const e = String(q.expected[0]);
  if (!egal(lireDecimal(e), v)) p.push(`attendu « ${e} », le calcul refait donne ${v}`);
  const u = [...UNITES, [/\d L\b/, "L"] as [RegExp, string]].find(([re]) => re.test(t))?.[1];
  if (u && !e.endsWith(` ${u}`)) p.push(`unité ${u} absente de « ${e} »`);
  if (u === "€" && !/,\d\d €$/.test(e)) p.push(`prix sans deux décimales : « ${e} »`);
  return p;
}

export const CORRECTEURS: CorrecteursMaths = avecRegles({
  fraction_defi_tpl_1: cCalculDefi,
  fraction_calcul_defi_tpl_s4: cCalculDefi,
  fraction_quantite_tpl_1: cQuantite,
  fraction_quantite_tpl_2: cQuantite,
  fraction_quantite_tpl_s2: cQuantite,
  "5e_fraction_quantite_canvas_circle_tpl_1": cQuantite,
  fraction_multiplier_tpl_1: cMultiplication,
  fraction_multiplier_tpl_2: cMultiplication,
  fraction_multiplier_tpl_s2: cMultiplication,
  fraction_additionner_tpl_1: cAddition,
  fraction_additionner_tpl_s4: cAddition,
  "5e_fraction_additionner_canvas_bar_tpl_1": cAddition,
  fraction_defi_tpl_2: cDefiNombre,
  fraction_defi_tpl_3: cDefiNombre,
  fraction_defi_tpl_s3: cDefiNombre,
  fraction_oppose_tpl_1: cOppose,
  fraction_oppose_tpl_2: cOppose,
  fraction_oppose_tpl_s1: cOppose,
  fraction_comparer_tpl_1: cComparer,
  fraction_comparer_tpl_2: cComparer,
  fraction_comparer_tpl_s2: cComparer,
  "5e_fraction_comparer_canvas_compare_tpl_1": cComparer,
  "5e_fraction_rationnel_canvas_grid_tpl_1": cRationnel,
  fraction_rationnel_tpl_s1: cRationnel,
  fraction_rationnel_tpl_s2: cRationnel,
  fraction_rationnel_tpl_s3: cRationnel,
  fraction_simplifier_tpl_1: cSimplifier,
  fraction_simplifier_tpl_2: cSimplifier,
  fraction_simplifier_tpl_s1: cSimplifier,
  "5e_fraction_simplifier_canvas_bar_tpl_1": cSimplifier,
  fraction_egale_tpl_1: cEgale,
  fraction_egale_tpl_2: cEgale,
  fraction_egale_tpl_s1: cEgale,
  fraction_egale_tpl_s3: cEgale,
  "5e_fraction_egale_canvas_compare_tpl_1": cEgale,
});

// Utilisés par les correcteurs suivants (fraction_simplifier, fraction_calcul…).
export const outils = { pgcd, memeValeur, ecrire, egal, valeurFr, qcmValeur, courteValeur, ouiNon, figureConforme, compareAnswer };
