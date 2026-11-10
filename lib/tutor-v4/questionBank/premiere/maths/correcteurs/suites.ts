// Correcteurs des suites arithmétiques et géométriques de 1re (renfort du 10/11/2026).
// Ils RELISENT l'énoncé (liste de termes, relation, formule, raison, situation en
// mots, étapes d'un motif, points du graphique ou du tableau) et recalculent la
// réponse : aucune valeur ne vient du générateur. Un correcteur par générateur,
// retrouvé grâce au tag « g:… » de chaque gabarit.

import type { CorrecteursMaths } from "@/lib/tutor-v4/questionBank/4e/maths/correcteurs/types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { seulChoix, val } from "../../../lycee-correcteurs-commun";
import { renfortSuitesArithmetiques } from "../suites-arithmetiques-renfort";
import { renfortSuitesGeometriques } from "../suites-geometriques-renfort";

type Q = TutorGeneratedQuestionV4;
type C = (q: Q) => string[];
type Pas = { A: number } | { G: number };
type Nat = { A?: number; G?: number };

/* ---------- Lecture ---------- */

/** Les morceaux de LaTeX (entre $…$) d'un texte. */
const maths = (t: string) => t.split("$").filter((_, i) => i % 2 === 1);
const estNombre = (s: string) => /^-?\d+(?:\\,\d{3})*(?:\{,\}\d+)?$/.test(s.trim());
const lu = (s: string) => val(s.trim());
/** Égalité à 1e-9 près, relative pour les grands nombres. */
const egal = (a: number, b: number) => Number.isFinite(a) && Number.isFinite(b) && Math.abs(a - b) <= 1e-9 * Math.max(1, Math.abs(a), Math.abs(b));

function court(q: Q, v: number): string[] {
  if (q.format === "qcm") return ["réponse courte attendue"];
  const r = Number(String(q.expected[0]).replace(",", "."));
  return egal(r, v) ? [] : [`réponse ${q.expected[0]}, recalculé ${v}`];
}

/** Les termes donnés « u_5 = 12 » (indice sans accolades). */
function donnees(t: string): Array<[number, number]> {
  const r: Array<[number, number]> = [];
  for (const s of maths(t)) {
    const m = s.match(/^[a-z]_(\d) = (.+)$/);
    if (m && estNombre(m[2])) r.push([Number(m[1]), lu(m[2])]);
  }
  return r;
}

/** L'indice du terme demandé : le dernier « u_{k} » du texte. */
function cible(t: string): number {
  const m = [...t.matchAll(/[a-z]_\{(\d+)\}/g)];
  if (!m.length) throw new Error(`terme demandé illisible : ${t}`);
  return Number(m[m.length - 1][1]);
}

/** « r = 3 » ou « q = 1{,}05 » écrit dans le texte. */
function raisonDonnee(t: string, x: "r" | "q"): number | null {
  for (const s of maths(t)) {
    const m = s.match(new RegExp(`^${x} = (.+)$`));
    if (m && estNombre(m[1])) return lu(m[1]);
  }
  return null;
}

/** Une relation de récurrence affine : « u_{n+1} = u_n + r », « u_{n+1} - u_n = r », « u_{n+1} = q × u_n ». */
function relation(t: string): Pas | null {
  for (const s of maths(t)) {
    if (/^([a-z])_\{n\+1\} = \1_n$/.test(s)) return { A: 0 };
    let m = s.match(/^([a-z])_\{n\+1\} = \1_n ([+-]) (.+)$/);
    if (m && estNombre(m[3])) return { A: (m[2] === "-" ? -1 : 1) * lu(m[3]) };
    m = s.match(/^([a-z])_\{n\+1\} - \1_n = (.+)$/);
    if (m && estNombre(m[2])) return { A: lu(m[2]) };
    m = s.match(/^([a-z])_\{n\+1\} = (.+?)(?: \\times )?\1_n$/);
    if (m && estNombre(m[2])) return { G: lu(m[2]) };
  }
  return null;
}

/** La liste « a \; ; \; b \; ; \; c » et l'indice de son premier terme. */
function listeLue(t: string): { ts: number[]; i: number } | null {
  const s = maths(t).find((x) => x.includes("\\;"));
  if (!s) return null;
  const ts = s.split(/\\; ; \\;/).map(lu);
  const m = t.match(/à partir de \$[a-z]_(\d)\$/) ?? t.match(/Les termes \$[a-z]_(\d)\$ à/);
  return { ts, i: m ? Number(m[1]) : 0 };
}

/** Écarts constants : arithmétique ; quotients constants : géométrique. */
function natureDe(ts: number[]): Nat {
  const n: Nat = {};
  const d = ts.slice(1).map((x, k) => x - ts[k]);
  if (d.every((x) => egal(x, d[0]))) n.A = d[0];
  if (ts.every((x) => x !== 0)) {
    const r = ts.slice(1).map((x, k) => x / ts[k]);
    if (r.every((x) => egal(x, r[0]))) n.G = r[0];
  }
  return n;
}
const pasDe = (n: Nat): Pas | null => (n.A !== undefined && n.G === undefined ? { A: n.A } : n.G !== undefined && n.A === undefined ? { G: n.G } : null);

/** L'évolution décrite en mots : quantité fixe, pourcentage, « double », « est divisé par 2 »… */
function evolution(t: string): { A: number } | { G: number } | { N: true } | null {
  if (/mais pas de la même quantité/.test(t)) return { N: true };
  const m = t.match(/(augmente|progresse|s’accroît|diminue|baisse|recule) de \$([^$]+)\$/);
  if (m) {
    const signe = /augmente|progresse|accroît/.test(m[1]) ? 1 : -1;
    const p = m[2].match(/^(.+)\\,\\%$/);
    return p ? { G: 1 + (signe * lu(p[1])) / 100 } : { A: signe * lu(m[2]) };
  }
  const mots: Array<[RegExp, number]> = [[/\sdouble[ .]/, 2], [/\striple[ .]/, 3], [/perd la moitié/, 0.5], [/augmente de moitié/, 1.5], [/perd les trois quarts/, 0.25], [/perd un quart/, 0.75]];
  for (const [re, q] of mots) if (re.test(t)) return { G: q };
  const d = t.match(/est divisée? par \$(\d+)\$/);
  if (d) return { G: 1 / Number(d[1]) };
  const x = t.match(/est multipliée? par \$(\d+)\$/);
  if (x) return { G: Number(x[1]) };
  return null;
}

/** Valeur de départ d'une situation (premier nombre écrit), rang de départ, année de départ. */
function situation(t: string) {
  const s = maths(t).find(estNombre);
  const i0 = /\(\$[a-z](?:_|\()1\)?\$ correspond/.test(t) ? 1 : 0;
  const an = t.match(/correspond à (\d{4})/);
  return { u0: s === undefined ? NaN : lu(s), i0, an0: an ? Number(an[1]) : null };
}

/** La formule explicite écrite : « u_n = … » ou « u(n) = … ». */
function explicite(t: string): ((n: number) => number) | null {
  for (const s of maths(t)) {
    const m = s.match(/^[a-z](?:_n|\(n\)) = (.+)$/);
    if (m && !m[1].includes("_")) {
      const src = m[1];
      return (n: number) => val(src, { n });
    }
  }
  return null;
}

type Modele = { f: (n: number) => number; i0: number; pas: Pas | null };

/** La suite que décrit l'énoncé, quelle que soit la façon dont elle est donnée. */
function modele(t: string): Modele {
  const e = explicite(t);
  if (e) return { f: e, i0: /n \\ge 1/.test(t) ? 1 : 0, pas: null };
  const d = donnees(t);
  const l = listeLue(t);
  const rr = raisonDonnee(t, "r");
  const rq = raisonDonnee(t, "q");
  let pas: Pas | null = relation(t) ?? (rr !== null ? { A: rr } : rq !== null ? { G: rq } : null);
  if (!pas && l) pas = pasDe(natureDe(l.ts));
  if (!pas && d.length >= 3) pas = pasDe(natureDe(d.map((x) => x[1])));
  let ancre: [number, number] | null = d[0] ?? (l ? [l.i, l.ts[0]] : null);
  if (!pas || !ancre) {
    const ev = evolution(t);
    if (!pas && ev && !("N" in ev)) pas = ev;
    if (!ancre) {
      const s = situation(t);
      ancre = [s.i0, s.u0];
    }
  }
  if (!pas || !ancre || Number.isNaN(ancre[1])) throw new Error(`suite illisible : ${t}`);
  const [i, x] = ancre;
  const p = pas;
  const f = "A" in p ? (n: number) => x + p.A * (n - i) : (n: number) => x * p.G ** (n - i);
  return { f, i0: i, pas };
}

const sensDe = (m: Modele) => {
  const a = m.f(m.i0);
  const b = m.f(m.i0 + 1);
  return egal(a, b) ? "constante" : b > a ? "croissante" : "décroissante";
};

/* ---------- Propositions ---------- */

/** « arithmétique de raison $3$ », « géométrique », « ni arithmétique ni géométrique »… */
function natureJuste(c: string, n: Nat): boolean {
  const m = c.match(/^(arithmétique|géométrique) de raison \$(.+)\$$/);
  if (m) {
    const v = lu(m[2]);
    return m[1] === "arithmétique" ? n.A !== undefined && egal(n.A, v) : n.G !== undefined && egal(n.G, v);
  }
  if (c === "arithmétique") return n.A !== undefined && n.G === undefined;
  if (c === "géométrique") return n.G !== undefined && n.A === undefined;
  if (c === "ni arithmétique ni géométrique") return n.A === undefined && n.G === undefined;
  if (c === "à la fois arithmétique et géométrique") return n.A !== undefined && n.G !== undefined;
  throw new Error(`nature illisible : ${c}`);
}
const qcmNature = (q: Q, n: Nat) => seulChoix(q, (c) => natureJuste(c, n));

function natureEvolution(t: string): Nat {
  const ev = evolution(t);
  if (!ev) throw new Error(`évolution illisible : ${t}`);
  return "N" in ev ? {} : "A" in ev ? { A: ev.A } : { G: ev.G };
}

/** La relation proposée est-elle celle de la suite ? */
function relationJuste(c: string, p: Pas): boolean {
  const r = relation(c);
  if (!r) return false;
  return "A" in p ? "A" in r && egal(r.A, p.A) : "G" in r && egal(r.G, p.G);
}

/** La formule proposée coïncide-t-elle avec la suite sur six rangs (décalée de `dec` rangs) ? */
function formuleJuste(c: string, m: Modele, dec = 0, v = "n"): boolean {
  const src = c.replace(/\$/g, "").replace(/^[a-z]_n = |^y = /, "").trim();
  return [0, 1, 2, 3, 4, 5].every((j) => egal(val(src, { [v]: m.i0 + j }), m.f(m.i0 + j + dec)));
}

/** Un point « $(x\,;\,y)$ ». */
function point(c: string): [number, number] {
  const m = c.replace(/\$/g, "").match(/^\((.+)\\,;\\,(.+)\)$/);
  if (!m) throw new Error(`point illisible : ${c}`);
  return [lu(m[1]), lu(m[2])];
}

type Pt = { x: number; y: number; couleur?: string };
/** Les ordonnées des points du graphique, par abscisse croissante (une couleur au choix). */
function pointsCanvas(q: Q, couleur?: string): number[] {
  const c = q.canvas as unknown as { kind?: string; points?: Pt[] } | undefined;
  if (!c || c.kind !== "fonctionGraphique" || !c.points) throw new Error("graphique absent");
  return c.points.filter((p) => !couleur || p.couleur === couleur).sort((a, b) => a.x - b.x).map((p) => p.y);
}
function ordonnee(q: Q, k: number): number {
  const p = ((q.canvas as unknown as { points: Pt[] }).points ?? []).find((x) => x.x === k);
  if (!p) throw new Error(`pas de point d’abscisse ${k}`);
  return p.y;
}

/** « une hausse de $5\,\%$ » → 5 ; « diminue de $20\,\%$ » → −20 ; sans % → null. */
function tauxLu(c: string): number | null {
  const m = c.match(/(hausse|baisse|augmente|diminue) de \$(.+?)\$/);
  const p = m?.[2].match(/^(.+)\\,\\%$/);
  if (!m || !p) return null;
  return (/hausse|augmente/.test(m[1]) ? 1 : -1) * lu(p[1]);
}

/** Le moment du rang k : « en 2031 », « après 5 semaines », « semaine numéro 5 ». */
function moments(t: string) {
  const { i0, an0 } = situation(t);
  if (an0 !== null) return (k: number) => `en ${an0 + k - i0}`;
  if (i0 === 0) {
    const m = t.match(/après \$n\$ (.+?) \(\$/);
    if (!m) throw new Error(`période illisible : ${t}`);
    const plur = m[1];
    // Singulier : « 1 semaine », « 1 période de 30 ans », mais « 1 mois ».
    const un = plur === "mois" ? plur : plur.replace(/^(\S+)s(?= |$)/, "$1");
    return (k: number) => (k === 0 ? "au départ" : `après ${k} ${k === 1 ? un : plur}`);
  }
  const m = t.match(/(\S+) numéro \$n\$/);
  if (!m) throw new Error(`période illisible : ${t}`);
  const mot = m[1];
  return (k: number) => `${mot} numéro ${k}`;
}

/** Les trois étapes chiffrées d'un motif. */
function etapes(t: string): [number, number, number] {
  const m = t.match(/Étape \$1\$ : \$(\d+)\$.*?étape \$2\$ : \$(\d+)\$.*?étape \$3\$ : \$(\d+)\$/);
  if (!m) throw new Error(`étapes illisibles : ${t}`);
  return [Number(m[1]), Number(m[2]), Number(m[3])];
}
function motifLineaire(t: string) {
  const [a, b, c] = etapes(t);
  if (b - a !== c - b) throw new Error("motif non linéaire");
  return { a, r: b - a, f: (k: number) => a + (b - a) * (k - 1) };
}

/** Termes d'une définition explicite, ou par récurrence (u_0 = a et u_{n+1} = …). */
function termesDefinition(t: string, N = 6): number[] {
  const e = explicite(t);
  if (e) return Array.from({ length: N }, (_, n) => e(n));
  const d = donnees(t).find(([i]) => i === 0);
  const s = maths(t).map((x) => x.match(/^([a-z])_\{n\+1\} = (.+)$/)).find(Boolean);
  if (!d || !s) throw new Error(`définition illisible : ${t}`);
  const src = s[2].replace(new RegExp(`${s[1]}_n`, "g"), "X");
  const ts = [d[1]];
  for (let n = 0; n < N - 1; n++) ts.push(val(src, { X: ts[n], n }));
  return ts;
}

/** Premier rang n ≥ 0 où la suite dépasse (ou passe sous) le seuil écrit. */
function seuil(t: string, m: Modele): number {
  let dir: string;
  let S: number;
  const e = t.match(/[a-z]_n ([<>]) ([^$]+)\$/);
  if (e) {
    dir = e[1];
    S = lu(e[2]);
  } else {
    const v = t.match(/valeur \$([^$]+)\$/);
    if (!v) throw new Error(`seuil illisible : ${t}`);
    S = lu(v[1]);
    dir = /dépassée/.test(t) ? ">" : "<";
  }
  for (let n = 0; n < 500; n++) if (dir === ">" ? m.f(n) > S : m.f(n) < S) return n;
  throw new Error("seuil jamais atteint");
}

/* ---------- Un correcteur par générateur ---------- */

/** Le terme demandé, recalculé avec la suite que décrit l'énoncé. */
const terme: C = (q) => court(q, modele(q.text).f(cible(q.text)));
const sens: C = (q) => seulChoix(q, (c) => c === sensDe(modele(q.text)));
const formule: C = (q) => {
  const m = modele(q.text);
  return seulChoix(q, (c) => formuleJuste(c, m));
};
const relationQ: C = (q) => {
  const p = modele(q.text).pas;
  return p ? seulChoix(q, (c) => relationJuste(c, p)) : ["raison illisible"];
};
const raisonListe: C = (q) => {
  const l = listeLue(q.text);
  if (!l) return ["liste absente"];
  const n = natureDe(l.ts);
  const v = /géométrique/.test(q.text) ? n.G : n.A;
  return v === undefined ? ["la liste n’a pas la nature annoncée"] : court(q, v);
};
const deuxTermes = (geo: boolean): C => (q) => {
  const d = donnees(q.text);
  if (d.length !== 2) return ["il faut deux termes"];
  const [[i, a], [j, b]] = d;
  return court(q, geo ? (b / a) ** (1 / (j - i)) : (b - a) / (j - i));
};
const natureListe: C = (q) => qcmNature(q, natureDe(listeLue(q.text)!.ts));
const natureSituation: C = (q) => qcmNature(q, natureEvolution(q.text));
const motifRaison: C = (q) => court(q, motifLineaire(q.text).r);
const motifNature: C = (q) => qcmNature(q, natureDe(etapes(q.text)));
const formeNature: C = (q) => qcmNature(q, natureDe(termesDefinition(q.text)));

const notaEcrire: C = (q) => {
  const i = q.text.match(/\$([a-z])\(([^)]+)\)((?: \+ \d+)?)\$ en notation indicielle/);
  const f = q.text.match(/\$([a-z])_\{(\d+)\}\$ en notation fonctionnelle/);
  const bon = i ? `$${i[1]}${i[2] === "n" ? "_n" : `_{${i[2]}}`}${i[3]}$` : f ? `$${f[1]}(${f[2]})$` : null;
  return bon ? seulChoix(q, (c) => c === bon) : ["écriture demandée illisible"];
};
const notaAnnee: C = (q) => {
  const t = q.text;
  const { i0, an0 } = situation(t);
  const y = t.match(/en (\d{4}) \?$/);
  const a = t.match(/après (\d+) \S+ \?$/);
  const n = t.match(/numéro (\d+) \?$/);
  const k = y && an0 !== null ? Number(y[1]) - an0 + i0 : a ? Number(a[1]) : n ? Number(n[1]) : null;
  const L = t.match(/\(\$([a-z])\(/);
  return k === null || !L ? ["moment illisible"] : seulChoix(q, (c) => c === `$${L[1]}_{${k}}$`);
};
const notaSuivant: C = (q) => {
  const m = modele(q.text);
  return seulChoix(q, (c) => formuleJuste(c, m, 1));
};
const rang: C = (q) => {
  const t = q.text;
  const i0 = Number(t.match(/à partir de \$[a-z]_(\d)\$/)![1]);
  const a = t.match(/indice du (\d+)(?:er|e) terme/);
  if (a) return court(q, Number(a[1]) - 1 + i0);
  const b = t.match(/termes de \$[a-z]_(\d)\$ à \$[a-z]_\{(\d+)\}\$/);
  if (b) return court(q, Number(b[2]) - Number(b[1]) + 1);
  if (/position/.test(t)) return court(q, cible(t) - i0 + 1);
  return ["question illisible"];
};
const notaTableau: C = (q) => {
  const c = q.canvas as unknown as { kind?: string; xValues: number[]; yValues: number[] } | undefined;
  if (c?.kind !== "fonction_tableau") return ["tableau absent"];
  const debut = q.text.match(/à partir de \$n = (\d)\$/);
  if (!debut || Number(debut[1]) !== c.xValues[0]) return ["rang de départ du tableau mal annoncé"];
  const k = cible(q.text);
  const j = c.xValues.indexOf(k);
  if (j >= 0) return court(q, c.yValues[j]);
  const n = natureDe(c.yValues);
  if (!/arithmétique/.test(q.text) || n.A === undefined) return ["prolongement sans suite arithmétique"];
  return court(q, c.yValues[0] + n.A * (k - c.xValues[0]));
};
const calcul: C = (q) => {
  const v = modele(q.text).f(cible(q.text));
  return seulChoix(q, (c) => egal(val(c.replace(/\$/g, "")), v));
};
const motifTerme: C = (q) => {
  const ks = [...q.text.matchAll(/étape \$(\d+)\$/g)];
  return court(q, motifLineaire(q.text).f(Number(ks[ks.length - 1][1])));
};
const explLire: C = (q) => {
  const f = explicite(q.text);
  if (!f) return ["formule absente"];
  return seulChoix(q, (c) => {
    const m = c.match(/^\$[a-z]_0 = (.+?)\$ et \$([rq]) = (.+?)\$$/);
    if (!m || !egal(lu(m[1]), f(0))) return false;
    if (m[2] === "r") return egal(f(2) - f(1), f(1) - f(0)) && egal(lu(m[3]), f(1) - f(0));
    return egal(f(2) / f(1), f(1) / f(0)) && egal(lu(m[3]), f(1) / f(0));
  });
};
const varPiegeA: C = (q) => {
  const r = raisonDonnee(q.text, "r");
  if (r === null || r === 0) return ["raison illisible"];
  return seulChoix(q, (c) => {
    const m = c.match(/^(\S+), car \$r = (.+?) ([<>]) 0\$$/);
    return !!m && m[1] === (r > 0 ? "croissante" : "décroissante") && egal(lu(m[2]), r) && (m[3] === ">") === r > 0;
  });
};
const varPiegeG: C = (q) => {
  const g = raisonDonnee(q.text, "q");
  if (g === null || g <= 0 || g === 1) return ["raison illisible"];
  const bon = g > 1 ? "croissante, car $q > 1$" : "décroissante, car $0 < q < 1$";
  return seulChoix(q, (c) => c === bon);
};
const graphLire: C = (q) => {
  const n = natureDe(pointsCanvas(q));
  if (n.A === undefined) return ["nuage non aligné"];
  if (/raison|varie/.test(q.text)) return court(q, n.A);
  const a = q.text.match(/abscisse \$(\d+)\$/);
  return court(q, ordonnee(q, a ? Number(a[1]) : cible(q.text)));
};
const graphRaison: C = (q) => {
  const p = [...q.text.matchAll(/\$\((\d+)\\,;\\,([^$]+)\)\$/g)].map((m) => [Number(m[1]), lu(m[2])]);
  return p.length === 2 ? court(q, (p[1][1] - p[0][1]) / (p[1][0] - p[0][0])) : ["il faut deux points"];
};
const graphSens: C = (q) => {
  const n = natureDe(pointsCanvas(q));
  if (n.A === undefined) return ["nuage non aligné"];
  return seulChoix(q, (c) => c === (n.A! > 0 ? "croissante" : n.A! < 0 ? "décroissante" : "constante"));
};
const graphNature: C = (q) => {
  const n = natureDe(pointsCanvas(q));
  const geo = n.A === undefined && n.G !== undefined;
  return seulChoix(q, (c) => {
    if (c === "arithmétique de raison positive") return n.A !== undefined && n.A > 0;
    if (c === "arithmétique de raison négative") return n.A !== undefined && n.A < 0;
    if (c === "géométrique de raison supérieure à $1$") return geo && n.G! > 1;
    if (c === "géométrique de raison comprise entre $0$ et $1$") return geo && n.G! > 0 && n.G! < 1;
    throw new Error(`nature illisible : ${c}`);
  });
};
const graphPoint: C = (q) => {
  const m = modele(q.text);
  return seulChoix(q, (c) => {
    const [x, y] = point(c);
    return Number.isInteger(x) && x >= 0 && egal(m.f(x), y);
  });
};
const graphDroite: C = (q) => {
  const m = modele(q.text);
  return seulChoix(q, (c) => formuleJuste(c, m, 0, "x"));
};
const graphLireQ: C = (q) => {
  const n = natureDe(pointsCanvas(q));
  return n.G !== undefined && n.A === undefined ? court(q, n.G) : ["nuage non géométrique"];
};
const graphConjecture: C = (q) => {
  const n = natureDe(pointsCanvas(q));
  if (n.G === undefined || n.A !== undefined || n.G <= 0 || n.G === 1) return ["nuage non géométrique"];
  const bon = n.G > 1 ? "les termes deviennent aussi grands que l’on veut" : "les termes se rapprochent de $0$";
  return seulChoix(q, (c) => c === bon);
};
const graphDeux: C = (q) => {
  const A = natureDe(pointsCanvas(q, "#2563eb"));
  const B = natureDe(pointsCanvas(q, "#dc2626"));
  const test = /Laquelle est géométrique/.test(q.text) ? (n: Nat) => n.G !== undefined && n.A === undefined : (n: Nat) => n.A !== undefined && n.G === undefined;
  const bon = test(A) && !test(B) ? "la suite A" : test(B) && !test(A) ? "la suite B" : null;
  return bon ? seulChoix(q, (c) => c === bon) : ["nuages ambigus"];
};
const interpTerme: C = (q) => {
  const t = q.text;
  const k = cible(t);
  const brut = modele(t).f(k);
  const V = /\\approx/.test(t) ? Math.round(brut) : brut;
  const vt = t.match(/[a-z]_\{\d+\} (?:=|\\approx) ([^$]+)\$/);
  if (!vt || !egal(lu(vt[1]), V)) return [`valeur écrite ${vt?.[1]}, recalculée ${V}`];
  const mo = moments(t)(k);
  return seulChoix(q, (c) => {
    const m = c.match(/ vaut (?:environ )?\$(.+)\$$/);
    return !!m && c.includes(` ${mo} vaut`) && egal(lu(m[1]), V);
  });
};
const interpRang: C = (q) => {
  const t = q.text;
  const { i0, an0 } = situation(t);
  if (an0 === null) return ["année de départ illisible"];
  if (/quelle année/.test(t)) return court(q, an0 + cible(t) - i0);
  const ys = [...t.matchAll(/(\d{4})/g)];
  return court(q, Number(ys[ys.length - 1][1]) - an0 + i0);
};
const interpRaison: C = (q) => {
  const t = q.text;
  const f = explicite(t);
  const X = t.match(/nombre \$([^$]+)\$/);
  if (!f || !X) return ["formule ou nombre illisible"];
  const x = lu(X[1]);
  const u = f(0);
  const r = f(1) - f(0);
  if (egal(x, Math.abs(r)) && !egal(x, u)) return seulChoix(q, (c) => c.startsWith(r > 0 ? "l’augmentation" : "la diminution"));
  const { an0 } = situation(t);
  if (egal(x, u) && !egal(x, Math.abs(r))) return seulChoix(q, (c) => c.endsWith(` ${an0 !== null ? `en ${an0}` : "au départ"}`));
  return ["nombre ambigu"];
};
const interpSeuil: C = (q) => {
  const t = q.text;
  const n = seuil(t, modele(t));
  if (!/En quelle année/.test(t)) return court(q, n);
  const { an0 } = situation(t);
  return an0 === null ? ["année de départ illisible"] : court(q, an0 + n);
};
const interpMotif: C = (q) => {
  const { a, r } = motifLineaire(q.text);
  const ex = q.text.match(/(?:exactement|utilise) \$(\d+)\$/);
  if (ex) {
    const k = (Number(ex[1]) - a) / r + 1;
    return Number.isInteger(k) ? court(q, k) : ["aucune étape n’a exactement ce nombre"];
  }
  const N = q.text.match(/(?:dispose de|Avec) \$(\d+)\$/);
  return N ? court(q, Math.floor((Number(N[1]) - a) / r) + 1) : ["question illisible"];
};
const coefEvolution: C = (q) => {
  const ev = evolution(q.text);
  return ev && "G" in ev ? court(q, ev.G) : ["évolution illisible"];
};
const qVersTaux: C = (q) => {
  const g = raisonDonnee(q.text, "q");
  if (g === null) return ["raison illisible"];
  return seulChoix(q, (c) => {
    const v = tauxLu(c);
    return v !== null && / à chaque étape$/.test(c) && egal(v, (g - 1) * 100);
  });
};
const tauxDeuxTermes: C = (q) => {
  const m = q.text.match(/passe de \$([^$]+)\$ .*? à \$([^$]+)\$/);
  if (!m) return ["valeurs illisibles"];
  const g = lu(m[2]) / lu(m[1]);
  if (!/pourcents/.test(q.text)) return court(q, g);
  if (/augmente-t-on/.test(q.text) !== g > 1) return ["sens de l’évolution mal annoncé"];
  return court(q, Math.abs(g - 1) * 100);
};
const tauxGlobal: C = (q) => {
  const g = raisonDonnee(q.text, "q");
  const k = q.text.match(/\$[a-z]_0\$ (?:et|à) \$[a-z]_(\d)\$/);
  if (g === null || !k) return ["raison ou rangs illisibles"];
  const G = (g ** Number(k[1]) - 1) * 100;
  return seulChoix(q, (c) => {
    const v = tauxLu(c);
    return v !== null && egal(v, G);
  });
};
const interpQ: C = (q) => {
  const f = explicite(q.text);
  if (!f) return ["formule absente"];
  const t = (f(1) / f(0) - 1) * 100;
  return seulChoix(q, (c) => {
    const v = tauxLu(c);
    return v !== null && egal(v, t);
  });
};
const interpGlobal: C = (q) => {
  const ev = evolution(q.text);
  if (!ev || !("G" in ev)) return ["évolution illisible"];
  const ys = q.text.match(/Entre (\d{4}) et (\d{4})/);
  const k = ys ? Number(ys[2]) - Number(ys[1]) : cible(q.text);
  return court(q, (ev.G ** k - 1) * 100);
};

const PAR_GEN: Record<string, C> = {
  // arithmétiques
  aRaisonListe: raisonListe, aNatureListe: natureListe, aNatureSituation: natureSituation, aMotifRaison: motifRaison, aMotifNature: motifNature,
  aFormeNature: formeNature, aRaisonDeuxTermes: deuxTermes(false),
  aRelationSituation: relationQ, aRelationListe: relationQ, aSuivant: terme, aDerouler: terme, aPrecedent: terme, aRecContexte: terme,
  aNotaEcrire: notaEcrire, aNotaAnnee: notaAnnee, aNotaCalcul: terme, aNotaSuivant: notaSuivant, aRang: rang, aNotaTableau: notaTableau,
  aTerme0: terme, aTerme1: terme, aTermeAutre: terme, aTermeCalcul: calcul, aTermeContexte: terme, aMotifTerme: motifTerme,
  aExpl0: formule, aExpl1: formule, aExplContexte: formule, aExplLire: explLire, aExplCalcul: terme,
  aVarRaison: sens, aVarExpl: sens, aVarRec: sens, aVarSituation: sens, aVarPiege: varPiegeA,
  aGraphLire: graphLire, aGraphRaison: graphRaison, aGraphNature: graphNature, aGraphSens: graphSens, aGraphPoint: graphPoint, aGraphDroite: graphDroite,
  aInterpTerme: interpTerme, aInterpRang: interpRang, aInterpRaison: interpRaison, aInterpSeuil: interpSeuil, aInterpMotif: interpMotif,
  // géométriques
  gRaisonListe: raisonListe, gNatureListe: natureListe, gNatureSituation: natureSituation, gQuotient: deuxTermes(true),
  gRelationSituation: relationQ, gRelationListe: relationQ, gSuivant: terme, gDerouler: terme, gPrecedent: terme, gRecContexte: terme,
  gTauxVersQ: coefEvolution, gQVersTaux: qVersTaux, gTauxMots: coefEvolution, gTauxDeuxTermes: tauxDeuxTermes, gTauxGlobal: tauxGlobal,
  gTerme0: terme, gTerme1: terme, gTermeAutre: terme, gTermeCalcul: calcul, gTermeContexte: terme,
  gExpl0: formule, gExpl1: formule, gExplContexte: formule, gExplCalcul: terme, gExplLire: explLire,
  gVarQ: sens, gVarExpl: sens, gVarSituation: sens, gVarPiege: varPiegeG,
  gGraphLireQ: graphLireQ, gGraphConjecture: graphConjecture, gGraphPoint: graphPoint, gGraphDeux: graphDeux,
  gInterpTerme: interpTerme, gInterpRang: interpRang, gInterpQ: interpQ, gInterpSeuil: interpSeuil, gInterpGlobal: interpGlobal,
};

/** Chaque gabarit du renfort reçoit le correcteur de son générateur (tag « g:… »). */
function construire(): CorrecteursMaths {
  const out: CorrecteursMaths = {};
  for (const it of [...renfortSuitesArithmetiques, ...renfortSuitesGeometriques]) {
    const g = (it.tags ?? []).find((x) => x.startsWith("g:"))?.slice(2);
    const c = g ? PAR_GEN[g] : undefined;
    if (!c) throw new Error(`pas de correcteur pour ${it.id} (${g})`);
    out[it.id] = c;
  }
  return out;
}

export const CORRECTEURS: CorrecteursMaths = construire();
