import type { CorrecteursMaths } from "./types";
import { type Q, NB, egal, justeNombre, justeTexte, justeUnique, nombres, num, valeur } from "../../../cm1/maths/correcteurs/outils";

// Les correcteurs de puissance-simple.bank.ts (07/11/2026) : relisent le texte, recalculent avec
// leur propre évaluateur d'expressions (exposants Unicode, priorités, parenthèses, lettres).
// Aucun calcul du générateur n'est réutilisé. Vide = juste.

type Vars = Record<string, number>;
const SUP: Record<string, string> = { "⁰": "0", "¹": "1", "²": "2", "³": "3", "⁴": "4", "⁵": "5", "⁶": "6", "⁷": "7", "⁸": "8", "⁹": "9" };
const net = (s: string) => s.replace(/[  ]/g, " ");

/** Évalue « 2 × 3² + (1 + x)³ » ou « 3x² ». null si illisible. */
export function evaluer(source: string, vars: Vars = {}): number | null {
  const s = net(source).trim();
  let i = 0;
  const blancs = () => { while (s[i] === " ") i++; };
  function exposant(b: number): number {
    let t = "";
    while (SUP[s[i]]) t += SUP[s[i++]];
    return t ? b ** Number(t) : b;
  }
  function atome(): number | null {
    blancs();
    if (s[i] === "(") {
      i++;
      const v = somme();
      blancs();
      if (v === null || s[i] !== ")") return null;
      i++;
      return exposant(v);
    }
    const m = s.slice(i).match(/^\d{1,3}(?: \d{3})+(?!\d)|^\d+/);
    if (m) { i += m[0].length; return exposant(Number(m[0].replace(/ /g, ""))); }
    const l = s[i];
    if (l && /[a-zA-Z]/.test(l) && vars[l] !== undefined) { i++; return exposant(vars[l]); }
    return null;
  }
  function produitDe(): number | null {
    let v = atome();
    while (v !== null) {
      blancs();
      const c = s[i];
      if (c === "×" || c === "÷") {
        i++;
        const d = atome();
        if (d === null) return null;
        v = c === "×" ? v * d : v / d;
      } else if (c && (/[a-zA-Z]/.test(c) || c === "(") && s[i - 1] !== " ") {
        const d = atome();
        if (d === null) return null;
        v = v * d;
      } else break;
    }
    return v;
  }
  function somme(): number | null {
    let v = produitDe();
    while (v !== null) {
      blancs();
      const c = s[i];
      if (c !== "+" && c !== "−") break;
      i++;
      const d = produitDe();
      if (d === null) return null;
      v = c === "+" ? v + d : v - d;
    }
    return v;
  }
  const v = somme();
  blancs();
  return i === s.length ? v : null;
}

/** La plus longue expression numérique du texte, avec une opération ou un exposant. */
function exprNue(t: string): string | null {
  const m = [...net(t).matchAll(/[\d(][\d ()²³×+−÷]*[\d)²³]|\d/g)].map((x) => x[0]).filter((x) => /[²³×+−÷]/.test(x));
  return m.sort((a, b) => b.length - a.length)[0] ?? null;
}
const ATOME = "(?:\\d+[a-z]?|[xyantbc])[²³]?";
const RE_LIT = new RegExp(`(?<![\\p{L}\\d])${ATOME}(?: [×+−÷] ${ATOME})*(?!\\p{L})`, "gu");
/** La plus longue expression littérale du texte qui contient une puissance. */
function exprLit(t: string): string | null {
  const m = [...net(t).matchAll(RE_LIT)].map((x) => x[0]).filter((x) => /[²³]/.test(x));
  return m.sort((a, b) => b.length - a.length)[0] ?? null;
}
/** Les valeurs données : « x = 3 », « x vaut 3 », « Remplace x par 3 ». */
function lireVars(t: string): Vars {
  const v: Vars = {};
  for (const m of net(t).matchAll(/(?<!\p{L})([a-zA-Z]) (?:= |vaut |par )(\d+)(?![\d²³ ]*[×+−÷²³])/gu)) v[m[1]] = Number(m[2]);
  return v;
}
function court(q: Q, juste: number): string[] {
  const p: string[] = [];
  if (q.format !== "short") p.push(`format ${q.format} au lieu d'une réponse tapée`);
  const v = valeur(q.expected[0]);
  if (v === null || !egal(v, juste)) p.push(`attendu « ${q.expected[0]} », juste : ${juste}`);
  return p;
}
/** Une proposition « 7² », « 5 × 5 », « 7 au carré », « 7² m² » → sa valeur. */
function valChoix(c: string, vars: Vars = {}): number | null {
  const s = net(c);
  const m = s.match(/^(\d[\d ]*) au (carré|cube)$/);
  if (m) return num(m[1]) ** (m[2] === "carré" ? 2 : 3);
  return evaluer(s.replace(/ (?:c|d|k)?m[²³]$/, ""), vars);
}
/** Exactement une proposition vaut `v`, et c'est l'attendue. */
const uneSeuleVaut = (q: Q, v: number, vars: Vars = {}) => justeUnique(q, (c) => { const x = valChoix(c, vars); return x !== null && egal(x, v); });
const puissLue = (t: string) => {
  const m = net(t).match(/(?<![\d²³])(\d+(?: \d{3})?|[a-z])([²³])/);
  return m ? { b: /\d/.test(m[1]) ? num(m[1]) : NaN, l: m[1], x: m[2] === "²" ? 2 : 3 } : null;
};
const egalite = (t: string) => {
  const m = net(t).match(/([\d(][\d ()²³×+−÷]*?) = ([\d(][\d ()²³×+−÷]*[\d)²³]|\d)/);
  return m ? { g: evaluer(m[1]), d: evaluer(m[2]), lu: m[0] } : null;
};
function vraiFaux(q: Q) {
  const eg = egalite(q.text);
  if (!eg || eg.g === null || eg.d === null) return [`égalité illisible : ${q.text}`];
  return justeTexte(q, egal(eg.g, eg.d) ? "Vrai" : "Faux");
}
function calcul(q: Q) {
  const x = exprNue(q.text);
  const v = x ? evaluer(x) : null;
  if (v === null) return [`expression illisible : ${q.text}`];
  if (/([\d]+)[²³] × \1[²³]/.test(net(q.text))) return [`produit de puissances de même base : ${q.text}`];
  return q.format === "short" ? court(q, v) : justeNombre(q, v);
}
const carreParfait = (v: number) => Number.isInteger(Math.sqrt(v));
const cubeParfait = (v: number) => Number.isInteger(Math.round(Math.cbrt(v) * 1e6) / 1e6);
const racine = (n: number, x: number) => Math.round(n ** (1 / x));
/** Le premier nombre du texte, sans les exposants et le 10 cités dans la consigne. */
const nombreCite = (t: string) => {
  const s = net(t).replace(/(?:exposant|puissance)(?: de)? \d+/g, " ").replace(/avec 10\b/g, " ").replace(/\b10 exposant/g, " ").replace(/de 10\b/g, " ");
  return nombres(s)[0];
};

/* ───── 1. La notation ───── */
function nDevelopper(q: Q) {
  const p = puissLue(q.text);
  if (!p) return [`puissance illisible : ${q.text}`];
  const v = p.b ** p.x;
  const pb = uneSeuleVaut(q, v);
  const f = net(q.expected[0]).split(" × ");
  if (f.length !== p.x || f.some((c) => num(c) !== p.b)) pb.push(`« ${q.expected[0]} » ne répète pas ${p.b} ${p.x} fois`);
  return pb;
}
function lireProduit(t: string) {
  const m = net(t).match(/(\d+)(?: × \1)+/);
  return m ? { b: Number(m[1]), x: m[0].split(" × ").length } : null;
}
function nCondenser(q: Q) {
  const p = lireProduit(q.text);
  if (!p) return [`produit illisible : ${q.text}`];
  return [...uneSeuleVaut(q, p.b ** p.x), ...(q.expected[0] === `${p.b}${p.x === 2 ? "²" : "³"}` ? [] : [`attendu ${q.expected[0]}`])];
}
function nLire(q: Q) {
  const t = net(q.text);
  const dit = t.match(/« (\d+) au (carré|cube) »/);
  if (dit) return justeTexte(q, `${dit[1]}${dit[2] === "carré" ? "²" : "³"}`);
  const p = puissLue(t);
  if (!p) return [`puissance illisible : ${q.text}`];
  return justeTexte(q, `${p.l} au ${p.x === 2 ? "carré" : "cube"}`);
}
function nErreur(q: Q) {
  const m = net(q.text).match(/(\d+)([²³]) = (\d+)/);
  if (!m) return [`égalité illisible : ${q.text}`];
  const [b, x, v] = [Number(m[1]), m[2] === "²" ? 2 : 3, Number(m[3])];
  if (b ** x === v) return [`${m[0]} n'est pas une erreur`];
  if (v === b * x) return justeUnique(q, (c) => net(c) === `On a calculé ${b} × ${x}`);
  if (v === b + x) return justeUnique(q, (c) => net(c) === `On a calculé ${b} + ${x}`);
  return [`erreur inexplicable : ${m[0]}`];
}
function nExposant(q: Q) {
  const p = lireProduit(q.text);
  return p ? court(q, p.x) : [`produit illisible : ${q.text}`];
}
function nLettre(q: Q) {
  const t = net(q.text);
  const m3 = t.match(/(?<!\p{L})([a-z]) × \1 × \1/u);
  if (m3) return justeTexte(q, `${m3[1]}³`);
  const m2 = t.match(/(?<!\p{L})([a-z]) × \1/u);
  if (m2) return justeTexte(q, `${m2[1]}²`);
  const s = t.match(/(?<!\p{L})([a-z]) \+ \1/u);
  if (s) return justeTexte(q, `2${s[1]}`);
  const c = t.match(/(?<!\p{L})([a-z])²/u);
  if (c) return justeUnique(q, (x) => net(x) === `${c[1]} × ${c[1]}`);
  return [`écriture illisible : ${q.text}`];
}
function nIntrus(q: Q) {
  const p = puissLue(q.text);
  if (!p) return [`puissance illisible : ${q.text}`];
  const v = p.b ** p.x;
  return justeUnique(q, (c) => { const x = valChoix(c); return x !== null && !egal(x, v); });
}
function nRangs(x: number) {
  return (q: Q) => {
    const n = nombres(q.text);
    if (n.length !== x || new Set(n).size !== 1) return [`nombres inattendus : ${q.text}`];
    return uneSeuleVaut(q, n[0] ** x);
  };
}
function nMesure(q: Q) {
  const m = net(q.text).match(/ a (\d+) ((?:c|d)?m) (de côté|d'arête)/);
  if (!m) return [`mesure illisible : ${q.text}`];
  const x = m[3] === "de côté" ? 2 : 3;
  const pb = uneSeuleVaut(q, Number(m[1]) ** x);
  if (!net(q.expected[0]).endsWith(`${m[2]}${x === 2 ? "²" : "³"}`)) pb.push(`unité attendue : ${q.expected[0]}`);
  return pb;
}
function nCodes(q: Q) {
  const n = nombres(q.text);
  if (n.length !== 2) return [`nombres inattendus : ${q.text}`];
  return uneSeuleVaut(q, n[1] ** n[0]);
}

/* ───── 2. Les valeurs ───── */
function vValeur(q: Q) {
  const t = net(q.text);
  const m = t.match(/(?:le )?(carré|cube) de (\d+)/) ?? null;
  if (m) return q.format === "short" ? court(q, Number(m[2]) ** (m[1] === "carré" ? 2 : 3)) : justeNombre(q, Number(m[2]) ** (m[1] === "carré" ? 2 : 3));
  const a = t.match(/(\d+) au carré/);
  if (a) return q.format === "short" ? court(q, Number(a[1]) ** 2) : justeNombre(q, Number(a[1]) ** 2);
  return calcul(q);
}
function vTrou(q: Q) {
  const n = nombres(q.text);
  return n.length ? court(q, n[0] ** 2) : [`nombre illisible : ${q.text}`];
}
function vInverse(q: Q) {
  const n = nombres(q.text);
  if (n.length !== 1 || !carreParfait(n[0])) return [`pas un carré : ${q.text}`];
  return court(q, Math.sqrt(n[0]));
}
function duel(q: Q) {
  const c = q.choices ?? [];
  const lus = c.filter((x) => x !== "Ils sont égaux").map((x) => ({ x, v: evaluer(x) }));
  if (lus.length !== 2 || lus.some((l) => l.v === null)) return [`propositions illisibles : ${c.join(" | ")}`];
  const [a, b] = lus as { x: string; v: number }[];
  return justeTexte(q, egal(a.v, b.v) ? "Ils sont égaux" : a.v > b.v ? a.x : b.x);
}
function vSuite(q: Q) {
  const n = nombres(q.text);
  if (n.length < 3) return [`suite illisible : ${q.text}`];
  const x = n.every(carreParfait) ? 2 : n.every(cubeParfait) ? 3 : 0;
  if (!x) return [`ni carrés ni cubes : ${n.join(", ")}`];
  const b = n.map((v) => racine(v, x));
  if (b.some((v, i) => i > 0 && v !== b[i - 1] + 1)) return [`pas à la suite : ${n.join(", ")}`];
  return court(q, (b[b.length - 1] + 1) ** x);
}
function vExtreme(q: Q) {
  const c = q.choices ?? [];
  const vals = c.map((x) => evaluer(x));
  if (vals.some((v) => v === null) || new Set(vals).size !== c.length) return [`propositions à revoir : ${c.join(" | ")}`];
  const grand = /grand|le plus \?/.test(q.text);
  const cible = (grand ? Math.max : Math.min)(...(vals as number[]));
  return justeTexte(q, c[vals.indexOf(cible)]);
}
function vCote(q: Q) {
  const m = net(q.text).match(new RegExp(`${NB} ((?:c|d)?m)([²³])`));
  if (!m) return [`mesure illisible : ${q.text}`];
  const x = m[3] === "²" ? 2 : 3;
  const n = num(m[1]);
  if (!(x === 2 ? carreParfait(n) : cubeParfait(n))) return [`${n} n'est pas une puissance ${x}`];
  return justeNombre(q, racine(n, x), m[2]);
}
function vCodes(q: Q) {
  const n = nombres(q.text);
  return n.length === 2 ? court(q, n[1] ** n[0]) : [`nombres inattendus : ${q.text}`];
}
function vCompte(x: number) {
  return (q: Q) => {
    const n = nombres(q.text);
    if (n.length !== x || new Set(n).size !== 1) return [`nombres inattendus : ${q.text}`];
    return court(q, n[0] ** x);
  };
}

/* ───── 3. Écrire avec une puissance ───── */
function eForme(x: number) {
  return (q: Q) => {
    const n = nombreCite(q.text);
    if (n === undefined) return [`nombre illisible : ${q.text}`];
    const b = racine(n, x);
    if (b ** x !== n) return [`${n} n'est pas une puissance ${x}`];
    return [...uneSeuleVaut(q, n), ...(net(q.expected[0]) === `${b}${x === 2 ? "²" : "³"}` ? [] : [`attendu ${q.expected[0]}`])];
  };
}
function eDix(q: Q) {
  const n = Math.max(...nombres(net(q.text).replace(/puissance de 10|avec 10|10 exposant|de 10|à 3 molettes/g, " ")));
  if (n !== 100 && n !== 1000) return [`ni 100 ni 1 000 : ${q.text}`];
  return [...uneSeuleVaut(q, n), ...(q.expected[0] === (n === 100 ? "10²" : "10³") ? [] : [`attendu ${q.expected[0]}`])];
}
function eTrou(q: Q) {
  const m = net(q.text).match(/…([²³])/);
  const n = nombres(q.text);
  if (!m || n.length !== 1) return [`trou illisible : ${q.text}`];
  const x = m[1] === "²" ? 2 : 3;
  const b = racine(n[0], x);
  return b ** x === n[0] ? court(q, b) : [`${n[0]} n'est pas une puissance ${x}`];
}
function eLequel(test: (v: number) => boolean) {
  return (q: Q) => justeUnique(q, (c) => { const v = valeur(c); return v !== null && test(v); });
}
function eExposant(q: Q) {
  const n = nombres(net(q.text).replace(/Exposant 2 ou 3/, " "));
  if (n.length !== 2) return [`nombres inattendus : ${q.text}`];
  const [b, v] = [Math.min(...n), Math.max(...n)];
  const x = b ** 2 === v ? 2 : b ** 3 === v ? 3 : 0;
  return x ? court(q, x) : [`${v} n'est ni le carré ni le cube de ${b}`];
}
function eEncadrer(q: Q) {
  const n = nombres(q.text)[0];
  if (carreParfait(n)) return [`${n} est un carré`];
  return justeUnique(q, (c) => {
    const m = c.match(/^(\d+)² et (\d+)²$/);
    return !!m && Number(m[2]) === Number(m[1]) + 1 && Number(m[1]) ** 2 < n && n < Number(m[2]) ** 2;
  });
}
function eAire(q: Q) {
  const m = net(q.text).match(new RegExp(`${NB} (?:c|d)?m([²³])`));
  if (!m) return [`mesure illisible : ${q.text}`];
  const n = num(m[1]);
  const x = m[2] === "²" ? 2 : 3;
  const b = racine(n, x);
  if (b ** x !== n) return [`${n} n'est pas une puissance ${x}`];
  return justeTexte(q, `${b}${m[2]}`);
}
function eVivant(q: Q) {
  const n = nombres(net(q.text))[0];
  return carreParfait(n) ? court(q, Math.sqrt(n)) : [`${n} n'est pas un carré`];
}

/* ───── 4. Calculer ───── */
function cPriorite(q: Q) {
  const x = exprNue(q.text);
  const p = x ? x.match(/\d+²/) : null;
  return p ? justeTexte(q, p[0]) : [`puissance illisible : ${q.text}`];
}
function cTrou(q: Q) {
  const m = net(q.text).match(/([\d²…+− ]+?) = (\d+)/);
  if (!m) return [`trou illisible : ${q.text}`];
  const d = Number(m[2]);
  const sols: number[] = [];
  for (let y = 0; y <= 500; y++) if (evaluer(m[1].replace("…", String(y))) === d) sols.push(y);
  return sols.length === 1 ? court(q, sols[0]) : [`${sols.length} solutions : ${m[0]}`];
}
function cQuelleExpr(q: Q) {
  const n = nombres(q.text);
  return n.length === 1 ? uneSeuleVaut(q, n[0]) : [`nombres inattendus : ${q.text}`];
}
function lireTotal(t: string) {
  const n = nombres(t);
  const k = n[n.length - 1];
  const r = n.slice(0, -1);
  if ((r.length !== 2 && r.length !== 3) || new Set(r).size !== 1) return null;
  const moins = /reste|vend|déplace|en donne|éteint|retire|ne germent pas/.test(t);
  return moins ? r[0] ** r.length - k : r[0] ** r.length + k;
}
function cTotal(q: Q) {
  const v = lireTotal(q.text);
  return v === null ? [`situation illisible : ${q.text}`] : court(q, v);
}
function cTotalExpr(q: Q) {
  const v = lireTotal(q.text);
  return v === null ? [`situation illisible : ${q.text}`] : uneSeuleVaut(q, v);
}
function cLots(q: Q) {
  const n = nombres(q.text);
  return n.length === 3 && n[1] === n[2] ? court(q, n[0] * n[1] ** 2) : [`nombres inattendus : ${q.text}`];
}
function cDeuxCarres(q: Q) {
  const n = nombres(q.text);
  if (n.length !== 2) return [`nombres inattendus : ${q.text}`];
  const x = /cubes|cubiques/.test(q.text) ? 3 : 2;
  const u = net(q.text).match(/\d+ ((?:c|d)?m)\b/)?.[1];
  return justeNombre(q, n[0] ** x + n[1] ** x, `${u}${x === 2 ? "²" : "³"}`);
}
function cCour(q: Q) {
  const n = nombres(q.text);
  if (n.length !== 2 || n[0] <= n[1]) return [`nombres inattendus : ${q.text}`];
  const u = net(q.text).match(/\d+ ((?:c|d)?m)\b/)?.[1];
  return justeNombre(q, n[0] ** 2 - n[1] ** 2, `${u}²`);
}

/* ───── 5. Expression littérale ───── */
function lCalcul(q: Q) {
  const t = net(q.text);
  const x = exprLit(t);
  const vars = lireVars(t);
  const v = x ? evaluer(x, vars) : null;
  if (v === null) return [`expression illisible : ${q.text}`];
  return q.format === "short" ? court(q, v) : justeNombre(q, v);
}
function lTester(q: Q) {
  const t = net(q.text);
  const m = t.match(/([a-z])² \+ (\d+) = (\d+)/);
  const vars = lireVars(t.replace(/[a-z]² \+ \d+ = \d+/, " "));
  if (!m || vars[m[1]] === undefined) return [`égalité illisible : ${q.text}`];
  return justeTexte(q, vars[m[1]] ** 2 + Number(m[2]) === Number(m[3]) ? "Vrai" : "Faux");
}
function lInverse(q: Q) {
  const m = net(q.text).match(/[a-z]² = (\d+)/) ?? net(q.text).match(/carré de [a-z] vaut (\d+)/);
  if (!m || !carreParfait(Number(m[1]))) return [`égalité illisible : ${q.text}`];
  return justeNombre(q, Math.sqrt(Number(m[1])));
}
function lQuelleExpr(q: Q) {
  const t = net(q.text);
  const vars = lireVars(t);
  const reste = nombres(t.replace(/(?<!\p{L})[a-z] (?:= |par )\d+/gu, " "));
  if (Object.keys(vars).length !== 1 || reste.length !== 1) return [`données illisibles : ${q.text}`];
  return uneSeuleVaut(q, reste[0], vars);
}
function lFormule(q: Q) {
  const t = net(q.text);
  const m = t.match(/ = (.*?)(?: m²| dm³| mètres| watts| joules| euros| matchs| pixels| dalles| décilitres|[.]| pour)/);
  const d = t.match(/([a-zA-Z]) = (\d+) \?$/);
  if (!m || !d) return [`formule illisible : ${q.text}`];
  const v = evaluer(m[1], { [d[1]]: Number(d[2]) });
  if (v === null) return [`formule illisible : ${m[1]}`];
  return justeNombre(q, v);
}
const ETAPES: [RegExp, (k: number) => (x: number) => number][] = [
  [/mets-le au carré, puis ajoute (\d+)/, (k) => (x) => x * x + k],
  [/mets-le au carré, puis enlève (\d+)/, (k) => (x) => x * x - k],
  [/mets-le au carré, puis multiplie par (\d+)/, (k) => (x) => k * x * x],
  [/ajoute (\d+), puis mets le résultat au carré/, (k) => (x) => (x + k) ** 2],
  [/multiplie-le par (\d+), puis mets le résultat au carré/, (k) => (x) => (k * x) ** 2],
  [/mets-le au cube, puis ajoute (\d+)/, (k) => (x) => x ** 3 + k],
];
function lireProgramme(t: string) {
  for (const [re, f] of ETAPES) {
    const m = t.match(re);
    if (m) return { fn: f(Number(m[1])), reste: t.replace(re, " ") };
  }
  return null;
}
function lProgrammeValeur(q: Q) {
  const p = lireProgramme(net(q.text));
  const n = p ? nombres(p.reste) : [];
  if (!p || n.length !== 1) return [`programme illisible : ${q.text}`];
  return court(q, p.fn(n[0]));
}
function lProgrammeExpr(q: Q) {
  const t = net(q.text);
  const p = lireProgramme(t);
  const l = t.match(/un nombre ([a-z])\b/)?.[1];
  if (!p || !l) return [`programme illisible : ${q.text}`];
  return justeUnique(q, (c) => [2, 3, 7].every((x) => { const v = evaluer(c, { [l]: x }); return v !== null && egal(v, p.fn(x)); }));
}
function lComparer(q: Q) {
  const t = net(q.text);
  const vars = lireVars(t);
  const c = q.choices ?? [];
  const vals = c.map((x) => evaluer(x, vars));
  if (vals.some((v) => v === null) || new Set(vals).size !== c.length) return [`propositions à revoir : ${c.join(" | ")}`];
  const grand = /grand|le plus \?/.test(t);
  return justeTexte(q, c[vals.indexOf((grand ? Math.max : Math.min)(...(vals as number[])))]);
}
function lEquation(q: Q) {
  const m = net(q.text).match(/[a-z]² \+ (\d+) = (\d+)/);
  if (!m) return [`égalité illisible : ${q.text}`];
  const c = Number(m[2]) - Number(m[1]);
  return carreParfait(c) ? justeNombre(q, Math.sqrt(c)) : [`${c} n'est pas un carré`];
}

const N = "puissance_simple_notation_tpl_";
const V = "puissance_simple_valeurs_tpl_";
const E = "puissance_simple_ecrire_tpl_";
const C = "puissance_simple_calculer_tpl_";
const L = "puissance_simple_litteral_tpl_";
export const CORRECTEURS: CorrecteursMaths = {
  [`${N}1`]: nDevelopper,
  [`${N}2`]: nCondenser,
  [`${N}3`]: nLire,
  [`${N}4`]: vraiFaux,
  [`${N}5`]: nErreur,
  [`${N}6`]: nExposant,
  [`${N}7`]: nLettre,
  [`${N}8`]: nIntrus,
  [`${N}9`]: nRangs(2),
  [`${N}10`]: nRangs(3),
  [`${N}11`]: nMesure,
  [`${N}12`]: nCodes,

  [`${V}1`]: vValeur,
  [`${V}2`]: vValeur,
  [`${V}3`]: vValeur,
  [`${V}4`]: vTrou,
  [`${V}5`]: vInverse,
  [`${V}6`]: duel,
  [`${V}7`]: vraiFaux,
  [`${V}8`]: vSuite,
  [`${V}9`]: vExtreme,
  [`${V}10`]: vCompte(2),
  [`${V}11`]: vCompte(3),
  [`${V}12`]: vCote,
  [`${V}13`]: vCodes,

  [`${E}1`]: eForme(2),
  [`${E}2`]: eForme(3),
  [`${E}3`]: eDix,
  [`${E}4`]: eTrou,
  [`${E}5`]: eLequel(carreParfait),
  [`${E}6`]: eLequel(cubeParfait),
  [`${E}7`]: eExposant,
  [`${E}8`]: eEncadrer,
  [`${E}9`]: vraiFaux,
  [`${E}10`]: eAire,
  [`${E}11`]: eVivant,
  [`${E}12`]: eDix,

  [`${C}1`]: calcul,
  [`${C}2`]: calcul,
  [`${C}3`]: calcul,
  [`${C}4`]: cPriorite,
  [`${C}5`]: calcul,
  [`${C}6`]: calcul,
  [`${C}7`]: cTrou,
  [`${C}8`]: vraiFaux,
  [`${C}9`]: cQuelleExpr,
  [`${C}10`]: cTotal,
  [`${C}11`]: cTotalExpr,
  [`${C}12`]: cLots,
  [`${C}13`]: cDeuxCarres,
  [`${C}14`]: calcul,
  [`${C}15`]: duel,
  [`${C}16`]: vraiFaux,
  [`${C}17`]: cCour,

  [`${L}1`]: lCalcul,
  [`${L}2`]: lCalcul,
  [`${L}3`]: lCalcul,
  [`${L}4`]: lCalcul,
  [`${L}5`]: lCalcul,
  [`${L}6`]: lCalcul,
  [`${L}7`]: lTester,
  [`${L}8`]: lInverse,
  [`${L}9`]: lQuelleExpr,
  [`${L}10`]: lFormule,
  [`${L}11`]: lProgrammeValeur,
  [`${L}12`]: lProgrammeExpr,
  [`${L}13`]: lComparer,
  [`${L}14`]: lCalcul,
  [`${L}15`]: lEquation,
};
