// Correcteurs des renforts SUITES et LIMITES DE SUITES de Terminale spé (10/11/2026).
// Même contrat que la 6e (voir lib/tutor-v4/questionBank/6e/maths/correcteurs/types.ts).
//
// Ils relisent la suite ÉCRITE dans l'énoncé (`$u_0 = …$ et $u_{n+1} = …$`, ou
// `$u_n = …$`), recalculent les termes, la nature, le sens de variation, les
// bornes ou la limite, et vérifient que la bonne réponse est la SEULE juste.
// Aucune valeur ne vient du gabarit ; seule la clé du générateur, inscrite dans
// l'id (`…__<clé>__<micro>_<étoile>`), dit QUEL contrôle lancer.

import type { CorrecteursMaths } from "@/lib/tutor-v4/questionBank/4e/maths/correcteurs/types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { compiler, nombres, nue, proche, seuleJuste, seulChoix, val } from "../../../lycee-correcteurs-commun";
import { renfortSuites } from "../suites-renfort";
import { renfortLimitesSuites } from "../limites-suites-renfort";

type Q = TutorGeneratedQuestionV4;
type Pb = string[];

/* ───────────── lecture des suites ───────────── */

/** LaTeX → source du compilateur : u_n → U, v_n → V. */
const prep = (s: string) => s.replace(/u_\{n\}/g, "U").replace(/u_n/g, "U").replace(/v_n/g, "V");
const fn = (src: string) => {
  const c = compiler(prep(src));
  return (n: number, U = 0) => c({ n, U });
};

/** La récurrence écrite : `$u_0 = a$` (ou u_1) et `$u_{n+1} = F$`. */
export function lireRec(t: string) {
  const m0 = t.match(/\$u_([01]) = (-?[\d{},]+)\$/);
  const mF = t.match(/u_\{n\+1\} = ([^$]+)\$/);
  if (!m0 || !mF) return null;
  const F = fn(mF[1]);
  return { depart: Number(m0[1]), u0: val(m0[2]), f: (u: number, n: number) => F(n, u), source: mF[1] };
}

/** La forme explicite écrite : le premier `$u_n = F$`. */
export function lireExpl(t: string) {
  const m = t.match(/(?<![a-z_{])u_n = ([^$]+)\$/);
  if (!m) return null;
  const F = fn(m[1]);
  return { f: (n: number) => F(n), source: m[1] };
}

/** Termes u_d, …, u_{d+nb-1} (récurrence prioritaire). */
export function termes(t: string, nb: number): { d: number; t: number[] } {
  const r = lireRec(t);
  if (r) {
    const out = [r.u0];
    for (let k = r.depart; out.length < nb; k++) out.push(r.f(out[out.length - 1], k));
    return { d: r.depart, t: out };
  }
  const e = lireExpl(t);
  if (!e) throw new Error(`suite illisible : ${t.slice(0, 90)}`);
  return { d: 0, t: Array.from({ length: nb }, (_, k) => e.f(k)) };
}

const ARI = "arithmétique";
const GEO = "géométrique";
const NI = "ni arithmétique ni géométrique";

function nature(t: number[]): { nat: string; raison: number } {
  const d = t.slice(1).map((v, i) => v - t[i]);
  const tol = (x: number) => 1e-9 * Math.max(1, Math.abs(x));
  if (d.every((x) => Math.abs(x) < 1e-12)) return { nat: "constante", raison: 0 };
  if (d.every((x) => Math.abs(x - d[0]) < tol(d[0]))) return { nat: ARI, raison: d[0] };
  if (t.every((x) => x !== 0)) {
    const q = t.slice(1).map((v, i) => v / t[i]);
    if (q.every((x) => Math.abs(x - q[0]) < tol(q[0]))) return { nat: GEO, raison: q[0] };
  }
  return { nat: NI, raison: NaN };
}

const CR = "croissante", DE = "décroissante", CST = "constante", NIM = "ni croissante ni décroissante";
function sensDe(diffs: number[]): string {
  const eps = 1e-12;
  if (diffs.every((x) => Math.abs(x) < eps)) return CST;
  if (diffs.every((x) => x >= -eps)) return CR;
  if (diffs.every((x) => x <= eps)) return DE;
  return NIM;
}
const sensTermes = (t: number[]) => sensDe(t.slice(1).map((v, i) => v - t[i]));

/** Le nombre d'un choix « … $x$ » (dernier nombre en LaTeX). */
const nbChoix = (c: string) => {
  const m = c.match(/\$([^$]+)\$\s*$/);
  return m ? val(m[1]) : NaN;
};
/** L'index demandé : le dernier `u_{K}` (entre accolades) de l'énoncé. */
const rangDemande = (t: string) => {
  const m = [...t.matchAll(/u_\{(\d+)\}/g)];
  if (!m.length) throw new Error("rang demandé illisible");
  return Number(m[m.length - 1][1]);
};
const terme = (t: string, K: number) => {
  const s = termes(t, K + 2);
  return s.t[K - s.d];
};

/** Évalue une propriété « a \le b \le c » (ou \ge, <, >) une fois u_n, u_{n+1} remplacés. */
function propVraie(P: string, t: number[], k: number): boolean {
  const src = P.replace(/u_\{[nk]\+1\}/g, `(${t[k + 1]})`).replace(/u_[nk]/g, `(${t[k]})`);
  const parts = src.split(/(\\le|\\ge|<|>)/).map((s) => s.trim());
  for (let i = 1; i < parts.length; i += 2) {
    const a = val(parts[i - 1]), b = val(parts[i + 1]), op = parts[i];
    const ok = op === "\\le" ? a <= b + 1e-12 : op === "\\ge" ? a >= b - 1e-12 : op === "<" ? a < b : a > b;
    if (!ok) return false;
  }
  return true;
}

/** La phrase entre « … ». */
const citation = (t: string) => {
  const m = t.match(/« (.*) »/);
  if (!m) throw new Error("citation illisible");
  return m[1];
};

/* ───────────── suite_numerique ───────────── */

function natureSuite(q: Q): Pb {
  const s = termes(q.text, 8);
  const { nat } = nature(s.t);
  if (nat === "constante") return ["suite constante : deux réponses justes"];
  return seulChoix(q, (c) => c === nat);
}

function natureListe(q: Q): Pb {
  const m = [...q.text.matchAll(/\$u_(\d) = (-?[\d{},]+)\$/g)].map((x) => val(x[2]));
  if (m.length !== 4) return ["termes illisibles"];
  const pts = ((q.canvas as any)?.points ?? []).map((p: any) => p.y);
  if (pts.join() !== m.map((x) => Math.round(x * 1e4) / 1e4).join()) return ["le dessin ne montre pas les termes de l'énoncé"];
  const { nat } = nature(m);
  return seulChoix(q, (c) => c === nat);
}

function raisonSituation(q: Q): Pb {
  const t = q.text.replace(/(semaine|jour|rang|mois) 0/g, "$1 zéro");
  const nb = nombres(t.split("On note")[0]);
  const pct = /%/.test(t);
  const [kind, r] = pct
    ? [GEO, /augmente|hausse|gagne/.test(t) ? 1 + nb[1] / 100 : 1 - nb[1] / 100]
    : [ARI, nb[1]];
  return seulChoix(q, (c) => c.startsWith(`${kind} de raison`) && proche(nbChoix(c), r, 1e-9));
}

function auxiliaire(q: Q): Pb {
  const m = q.text.match(/v_n = u_n ([+-]) ([\d{},]+)\$/);
  if (!m) return ["v_n illisible"];
  const c = (m[1] === "-" ? 1 : -1) * val(m[2]);
  const v = termes(q.text, 8).t.map((x) => x - c);
  const { nat, raison } = nature(v);
  if (nat === NI) return seulChoix(q, (ch) => ch === NI);
  return seulChoix(q, (ch) => ch.startsWith(`${nat} de raison`) && proche(nbChoix(ch), raison, 1e-9));
}

const valeurTerme = (q: Q): Pb => seuleJuste(q, terme(q.text, rangDemande(q.text)), {}, 1e-6);

function suivant(q: Q): Pb {
  const e = lireExpl(q.text)!;
  return seulChoix(q, (c) => {
    const g = compiler(nue(c));
    return [0, 1, 2, 3, 5, 8].every((k) => proche(g({ n: k }), e.f(k + 1), 1e-9));
  });
}

function rang(q: Q): Pb {
  const m = [...q.text.matchAll(/u_n = ([^$]+)\$/g)];
  const e = lireExpl(q.text)!;
  const V = val(m[m.length - 1][1]);
  const r = Array.from({ length: 400 }, (_, k) => k).filter((k) => proche(e.f(k), V, 1e-9));
  if (r.length !== 1) return [`${r.length} rangs donnent ${V}`];
  return seuleJuste(q, r[0]);
}

function forme(q: Q): Pb {
  const rec = /u_\{n\+1\} =/.test(q.text);
  return seulChoix(q, (c) => (rec ? /précédent/.test(c) : /directement|explicite/.test(c)));
}

/** Choix « $u_0 = a$ et $u_{n+1} = G$ » comparés à la forme explicite de l'énoncé. */
function recPourExpl(q: Q): Pb {
  const e = lireExpl(q.text)!;
  return seulChoix(q, (c) => {
    const r = lireRec(c);
    if (!r) return false;
    let u = r.u0;
    for (let k = 0; k < 8; k++) {
      if (!proche(u, e.f(k), 1e-9)) return false;
      u = r.f(u, k);
    }
    return true;
  });
}

/** Choix « $u_n = G$ » comparés à la récurrence de l'énoncé. */
function explPourRec(q: Q): Pb {
  const s = termes(q.text, 9);
  return seulChoix(q, (c) => {
    const g = compiler(nue(c));
    return s.t.every((v, i) => proche(g({ n: s.d + i }), v, 1e-7 * Math.max(1, Math.abs(v))));
  });
}

function etapeNom(q: Q): Pb {
  const p = citation(q.text);
  const lab = /^Supposons/.test(p) ? "l'hérédité" : /héréditaire, donc/.test(p) ? "la conclusion" : /^\$u_0 = .*P\(0\)\$? est vraie\.$/.test(p) ? "l'initialisation" : "?";
  return seulChoix(q, (c) => c === lab);
}

function etapeManque(q: Q): Pb {
  const p = citation(q.text);
  const init = /^\$u_0 = [^»]*?P\(0\)\$? est vraie\./.test(p);
  const her = /Supposons/.test(p);
  const con = /héréditaire, donc/.test(p);
  const lab = !init ? "l'initialisation" : !her ? "l'hérédité" : !con ? "la conclusion" : "aucune : la démonstration est complète";
  if ([init, her, con].filter((x) => !x).length > 1) return ["deux étapes manquent"];
  return seulChoix(q, (c) => c === lab);
}

/** P(n) écrite après « pour tout entier naturel $n$, ». */
const propriete = (t: string) => {
  // La récurrence s'écrit aussi « pour tout entier naturel $n$, $u_{n+1} = …$ » : on prend l'inégalité.
  const m = [...t.matchAll(/pour tout entier naturel \$n\$, \$([^$]+)\$/g)].map((x) => x[1]).filter((P) => /\\le|\\ge|<|>/.test(P));
  if (m.length !== 1) throw new Error("propriété illisible");
  return m[0];
};

function etapeFausse(q: Q): Pb {
  const P = propriete(q.text);
  const r = lireRec(q.text)!;
  const mM = P.match(/u_n (\\le|\\ge) (-?[\d{},]+)/)!;
  const M = val(mM[2]);
  const le = mM[1] === "\\le";
  if (!(r.f(M + 1, 0) > r.f(M, 0))) return ["fonction non croissante"];
  const initOk = le ? r.u0 <= M : r.u0 >= M;
  const herOk = le ? r.f(M, 0) <= M + 1e-12 : r.f(M, 0) >= M - 1e-12;
  if (!initOk && !herOk) return ["deux erreurs"];
  const lab = !initOk ? "l'initialisation est fausse" : !herOk ? "l'hérédité est fausse" : "la démonstration est correcte";
  // Si tout est juste, la propriété doit être vraie sur les premiers rangs.
  if (initOk && herOk) {
    const t = termes(q.text, 40).t;
    if (!t.every((_, k) => k >= t.length - 1 || propVraie(P, t, k))) return ["propriété fausse alors que la preuve est dite correcte"];
  }
  return seulChoix(q, (c) => c === lab);
}

function hypothese(q: Q): Pb {
  const P = propriete(q.text);
  const t = termes(q.text, 41).t;
  if (!t.slice(0, 40).every((_, k) => propVraie(P, t, k))) return [`propriété fausse : ${P}`];
  const Pk = P.replace(/u_\{n\+1\}/g, "u_{k+1}").replace(/u_n/g, "u_k");
  return seulChoix(q, (c) => c === `on suppose que $${Pk}$ pour un entier naturel $k$ fixé`);
}

function heredCalcul(q: Q): Pb {
  const r = lireRec(q.text)!;
  const mf = q.text.match(/Que vaut \$f\((\d)\)\$/);
  if (mf) return seuleJuste(q, r.f(Number(mf[1]), 0));
  const m = q.text.match(/on suppose \$u_k (\\le|\\ge) (-?[\d{},]+)\$/);
  if (!m) return ["hypothèse illisible"];
  return seuleJuste(q, r.f(val(m[2]), 0));
}

function valeurInit(q: Q): Pb {
  const m = q.text.match(/que, pour tout entier \$n \\ge (\d)\$, \$u_n = ([^$]+)\$/);
  if (!m) return ["propriété illisible"];
  const d = Number(m[1]);
  const g = compiler(m[2]);
  const s = termes(q.text, 9);
  if (s.d !== d) return ["rang initial incohérent"];
  if (!s.t.every((v, i) => proche(g({ n: d + i }), v, 1e-7 * Math.max(1, Math.abs(v))))) return ["la propriété est fausse"];
  return seuleJuste(q, g({ n: d }));
}

function conclRang(q: Q): Pb {
  const m = q.text.match(/l'inégalité \$(.+?) (\\ge|>) (.+?)\$/);
  const r = q.text.match(/Initialisation au rang \$(\d+)\$/);
  if (!m || !r) return ["énoncé illisible"];
  const A = compiler(m[1]), B = compiler(m[3]);
  const P = (k: number) => (m[2] === ">" ? A({ n: k }) > B({ n: k }) : A({ n: k }) >= B({ n: k }));
  const n0 = Number(r[1]);
  if (!Array.from({ length: 30 }, (_, i) => n0 + i).every(P)) return ["inégalité fausse après le rang initial"];
  if (P(n0 - 1)) return ["l'inégalité est déjà vraie au rang précédent"];
  return seulChoix(q, (c) => c === `pour tout entier $n \\ge ${n0}$`);
}

/* variations */

function sensSuite(nb: number) {
  return (q: Q): Pb => seulChoix(q, (c) => c === sensTermes(termes(q.text, nb).t));
}

function sensDiff(q: Q): Pb {
  const m = q.text.match(/u_\{n\+1\} - u_n = ([^$]+)\$/);
  if (!m) return ["écart illisible"];
  const D = compiler(m[1]);
  return seulChoix(q, (c) => c === sensDe(Array.from({ length: 61 }, (_, k) => D({ n: k }))));
}

function sensQuotient(q: Q): Pb {
  const m = q.text.match(/\\dfrac\{u_\{n\+1\}\}\{u_n\} = ([^$]+)\$/);
  if (!m) return ["quotient illisible"];
  const R = compiler(m[1]);
  return seulChoix(q, (c) => c === sensDe(Array.from({ length: 61 }, (_, k) => R({ n: k }) - 1)));
}

function sensNuage(q: Q): Pb {
  const y = ((q.canvas as any)?.points ?? []).map((p: any) => p.y as number);
  if (y.length < 5) return ["nuage absent"];
  return seulChoix(q, (c) => c === sensTermes(y));
}

function sensRang(q: Q): Pb {
  const e = lireExpl(q.text)!;
  const monte = /est-elle croissante|est croissante à partir|u_\{n\+1\} \\ge u_n/.test(q.text);
  const ok = (k: number) => (monte ? e.f(k + 1) >= e.f(k) - 1e-12 : e.f(k + 1) <= e.f(k) + 1e-12);
  let n0 = 0;
  while (n0 < 150 && !Array.from({ length: 200 }, (_, i) => n0 + i).every(ok)) n0++;
  if (n0 >= 150) return ["jamais monotone"];
  return seuleJuste(q, n0);
}

/* bornes */

function borneDef(q: Q): Pb {
  const P = [...q.text.matchAll(/\$([^$]*)\$/g)].map((m) => m[1]).find((s) => /u_n/.test(s) && /\\le|\\ge/.test(s));
  if (!P) return ["inégalité illisible"];
  const bas = P.match(/^(-?[\d{},]+) \\le u_n/) ?? P.match(/u_n \\ge (-?[\d{},]+)/);
  const haut = P.match(/u_n \\le (-?[\d{},]+)$/);
  const lab = bas && haut ? "bornée" : bas ? `minorée par $${bas[1]}$` : haut ? `majorée par $${haut[1]}$` : "?";
  return seulChoix(q, (c) => c === lab);
}

/** Bornes numériques : sup et inf sur beaucoup de rangs, et croissance des extrêmes. */
function bornes(f: (k: number) => number) {
  let M1 = -Infinity, m1 = Infinity, M2 = -Infinity, m2 = Infinity;
  for (let k = 0; k <= 4000; k++) {
    const v = f(k);
    if (k <= 1000) { M1 = Math.max(M1, v); m1 = Math.min(m1, v); }
    M2 = Math.max(M2, v); m2 = Math.min(m2, v);
  }
  for (const k of [1e5, 1e6, 1e9]) { const v = f(k); if (Number.isFinite(v)) { M2 = Math.max(M2, v); m2 = Math.min(m2, v); } }
  const majoree = Number.isFinite(M2) && M2 < M1 + 1;
  const minoree = Number.isFinite(m2) && m2 > m1 - 1;
  return { sup: M2, inf: m2, majoree, minoree };
}

function classeBornes(f: (k: number) => number) {
  const b = bornes(f);
  return b.majoree && b.minoree ? "bornée" : b.minoree ? "minorée mais pas majorée" : b.majoree ? "majorée mais pas minorée" : "ni majorée ni minorée";
}

function majorant(q: Q): Pb {
  const e = lireExpl(q.text)!;
  const b = bornes(e.f);
  const maj = /majorant|u_n \\le M/.test(q.text);
  return seulChoix(q, (c) => (maj ? val(nue(c)) >= b.sup - 1e-9 : val(nue(c)) <= b.inf + 1e-9));
}

const borneGeo = (q: Q): Pb => seulChoix(q, (c) => c === classeBornes(lireExpl(q.text)!.f));

function encadrement(q: Q): Pb {
  const e = lireExpl(q.text)!;
  const t = Array.from({ length: 3001 }, (_, k) => e.f(k));
  return seulChoix(q, (c) => {
    const m = c.match(/^\$(-?[\d{},]+) \\le u_n \\le (-?[\d{},]+)\$$/);
    if (!m) return false;
    const lo = val(m[1]), hi = val(m[2]);
    return t.every((v) => v >= lo - 1e-12 && v <= hi + 1e-12);
  });
}

function borneRec(q: Q): Pb {
  const t = termes(q.text, 3000).t;
  const sup = Math.max(...t), inf = Math.min(...t);
  const maj = /majorant|majorée/.test(q.text);
  return seulChoix(q, (c) => (maj ? val(nue(c)) >= sup - 1e-9 : val(nue(c)) <= inf + 1e-9));
}

function borneQuelle(q: Q): Pb {
  const cherche = /PAS bornée|n'est pas bornée/.test(q.text) ? false : true;
  return seulChoix(q, (c) => {
    const g = compiler(nue(c));
    return (classeBornes((k) => g({ n: k })) === "bornée") === cherche;
  });
}

/* exercice type bac */

/** Limite numérique d'une suite (récurrence itérée ou explicite évaluée loin). */
export function limiteSuite(t: string): number {
  const r = lireRec(t);
  if (r) {
    let u = r.u0;
    for (let k = r.depart; k < 5000; k++) u = r.f(u, k);
    const v = r.f(u, 5000);
    if (!proche(u, v, 1e-9 * Math.max(1, Math.abs(u)))) throw new Error("la suite ne converge pas");
    return u;
  }
  const e = lireExpl(t)!;
  return e.f(1e6);
}

function premierRang(t: string): number {
  const m = t.match(/\$u_n (>|<) (-?[\d{},]+)\$/);
  if (!m) throw new Error("seuil illisible");
  const S = val(m[2]);
  const s = termes(t, 2000);
  const k = s.t.findIndex((v) => (m[1] === ">" ? v > S : v < S));
  if (k < 0) throw new Error("seuil jamais franchi");
  return s.d + k;
}

function chaine(q: Q): Pb {
  if (q.format === "qcm") return explPourRec(q);
  const t = q.text;
  const mv = t.match(/v_n = u_n - (\d+)\$/);
  const c = mv ? Number(mv[1]) : NaN;
  if (/\$v_0\$/.test(t)) return seuleJuste(q, termes(t, 1).t[0] - c);
  if (/raison|coefficient multiplicateur/.test(t)) {
    const v = termes(t, 6).t.map((x) => x - c);
    const n = nature(v);
    if (n.nat !== GEO) return ["v_n n'est pas géométrique"];
    return seuleJuste(q, n.raison);
  }
  if (/\$u_n [<>] /.test(t)) return seuleJuste(q, premierRang(t));
  // la forme explicite admise doit coller à la récurrence, puis on passe à la limite
  const e = t.match(/On admet que \$u_n = ([^$]+)\$/);
  if (e) {
    const g = compiler(e[1]);
    const s = termes(t, 8);
    if (!s.t.every((v, i) => proche(g({ n: i }), v, 1e-7 * Math.max(1, Math.abs(v))))) return ["forme explicite admise fausse"];
  }
  return seuleJuste(q, limiteSuite(t), {}, 1e-6);
}

function seuil(q: Q): Pb {
  return seuleJuste(q, premierRang(q.text));
}

function somme(q: Q): Pb {
  const N = rangDemande(q.text);
  const s = termes(q.text, N + 1);
  return seuleJuste(q, s.t.reduce((a, b) => a + b, 0));
}

const pointFixe = (q: Q): Pb => seuleJuste(q, limiteSuite(q.text), {}, 1e-6);

/* ───────────── limite_suite ───────────── */

type LimV = number | "+" | "-" | "aucune" | "FI" | "NC";

/** Limite numérique de n ↦ f(n) : on évalue de décade en décade (10² … 10⁷). */
function limNum(f: (n: number) => number): LimV {
  const pts: Array<[number, number]> = [];
  for (const N of [10, 30, 100, 300, 1000, 3000, 1e4, 3e4, 1e5, 3e5, 1e6, 3e6, 1e7]) {
    const a = f(N), b = f(N + 1);
    if (Number.isNaN(a) || Number.isNaN(b)) break;
    pts.push([a, b]);
  }
  if (pts.length < 2) throw new Error("limite numérique impossible");
  const [a0] = pts[pts.length - 2];
  const [a, b] = pts[pts.length - 1];
  const echelle = Math.max(1, Math.abs(a));
  if (Number.isFinite(a) && Number.isFinite(b) && Math.abs(a - b) < 1e-4 * echelle && Math.abs(a - a0) < 5e-2 * echelle) {
    // Extrapolation (écart en C·n^-p) sur trois points de rapport 10 : 1/√n converge lentement.
    if (pts.length >= 5) {
      const [x1, x2, x3] = [pts[pts.length - 5][0], pts[pts.length - 3][0], a];
      const e1 = x2 - x1, e2 = x3 - x2, r = e2 / e1;
      if (Math.abs(e1) > 1e-9 * echelle && r > 0 && r < 0.9) return x3 + (e2 * r) / (1 - r);
    }
    return a;
  }
  if (a > 1000 && b > 1000 && (a > a0 || a === Infinity)) return "+";
  if (a < -1000 && b < -1000 && (a < a0 || a === -Infinity)) return "-";
  if (Math.sign(a) !== Math.sign(b) || Math.abs(a - b) > 0.1 * echelle) return "aucune";
  throw new Error(`limite indécise : ${a0}, ${a}, ${b}`);
}

/** Ce que dit un choix : +∞, −∞, un nombre, pas de limite, forme indéterminée, on ne peut pas conclure. */
function lireLim(c: string): LimV | null {
  if (/forme indéterminée/.test(c)) return "FI";
  if (/on ne peut pas conclure/.test(c)) return "NC";
  if (/aucune limite|pas de limite/.test(c)) return "aucune";
  if (/\+\\infty/.test(c)) return "+";
  if (/-\\infty/.test(c)) return "-";
  const m = c.match(/\$([^$]+)\$\s*$/);
  if (!m) return null;
  try {
    return val(m[1]);
  } catch {
    return null;
  }
}
const memeLim = (x: LimV | null, y: LimV, tol = 1e-5) =>
  x !== null && (typeof x === "number" && typeof y === "number" ? proche(x, y, tol * Math.max(1, Math.abs(y))) : x === y);
const choixLim = (q: Q, L: LimV, tol = 1e-5): Pb => seulChoix(q, (c) => memeLim(lireLim(c), L, tol));
const courtLim = (q: Q, L: LimV): Pb => (typeof L === "number" ? seuleJuste(q, L, {}, 1e-6 * Math.max(1, Math.abs(L))) : [`limite ${L} pour une réponse courte`]);

/** La limite de la forme explicite écrite dans l'énoncé. */
const limExpl = (t: string) => limNum(lireExpl(t)!.f);
const limiteExplicite = (q: Q): Pb => choixLim(q, limExpl(q.text));
const limiteExpliciteCourt = (q: Q): Pb => courtLim(q, limExpl(q.text));

/** Le nuage : on lit les points. */
function limiteNuage(q: Q): Pb {
  const y = ((q.canvas as any)?.points ?? []).map((p: any) => p.y as number);
  if (y.length < 8) return ["nuage absent"];
  const d = y.slice(1).map((v: number, i: number) => v - y[i]);
  const premier = Math.abs(d[0]), dernier = Math.abs(d[d.length - 1]);
  let L: LimV;
  if (dernier < 0.25 * premier) {
    const fin = y[y.length - 1];
    const vers = (q.choices ?? []).map((c) => lireLim(c)).filter((x): x is number => typeof x === "number");
    const proches = vers.filter((x) => Math.abs(x - fin) < 0.6);
    if (proches.length !== 1) return [`limite du nuage ambiguë (dernier point ${fin})`];
    L = proches[0];
  } else if (d.every((x: number, i: number) => i === 0 || Math.sign(x) !== Math.sign(d[i - 1]))) L = "aucune";
  else if (d.every((x: number) => x > 0)) L = "+";
  else if (d.every((x: number) => x < 0)) L = "-";
  else return ["nuage illisible"];
  return choixLim(q, L);
}

/** Le tableau de valeurs doit coller à la formule, puis on prend la limite. */
function limiteTableau(q: Q): Pb {
  const e = lireExpl(q.text)!;
  for (const m of q.text.matchAll(/\$u_\{(\d+)\} \\approx (-?[\d{},]+)\$/g)) {
    if (!proche(e.f(Number(m[1])), val(m[2]), 1e-3)) return [`valeur fausse : u_${m[1]}`];
  }
  return limiteExplicite(q);
}

function limiteDef(q: Q): Pb {
  if (/tend vers \$\+\\infty\$|diverge vers \$\+\\infty\$/.test(q.text))
    return seulChoix(q, (c) => /^tout intervalle \$\]A\\,;\+\\infty\[\$ contient tous les termes \$u_n\$ à partir d'un certain rang$/.test(c));
  const L = q.text.match(/(?:converge vers|a pour limite) \$(-?\d+)\$/)![1];
  return seulChoix(q, (c) => c === `tout intervalle ouvert contenant $${L}$ contient tous les termes $u_n$ à partir d'un certain rang`);
}

/** Premier rang N tel que la condition est vraie pour tout n ≥ N. */
function limiteRang(q: Q): Pb {
  const e = lireExpl(q.text)!;
  const ma = q.text.match(/\$\|u_n ([+-]) (\d+)\| < ([\d{},]+)\$/);
  const ms = q.text.match(/\$u_n > (\d+)\$/);
  let ok: (k: number) => boolean;
  if (ma) {
    const c = (ma[1] === "+" ? 1 : -1) * Number(ma[2]), eps = val(ma[3]);
    ok = (k) => Math.abs(e.f(k) + c) < eps - 1e-12; // 5 + 5/50 - 5 vaut 0,0999… en machine
  } else if (ms) {
    const A = Number(ms[1]);
    ok = (k) => e.f(k) > A;
  } else return ["condition illisible"];
  let dernierFaux = 0;
  for (let k = 1; k <= 200000; k++) if (!ok(k)) dernierFaux = k;
  return seuleJuste(q, dernierFaux + 1);
}

/* opérations sur les limites */

const LIM_TXT = /\\lim\\limits_\{n \\to \+\\infty\} ([uv])_n = ([^$]+)\$/g;

/** Réalisations concrètes d'une limite : plusieurs suites qui ont cette limite. */
function realisations(L: string, positive: boolean): Array<(n: number) => number> {
  if (L === "+\\infty") return [(n) => n, (n) => n * n, (n) => Math.sqrt(n), (n) => 2 * n];
  if (L === "-\\infty") return [(n) => -n, (n) => -n * n, (n) => -Math.sqrt(n), (n) => -2 * n];
  const a = val(L);
  if (a === 0) return positive ? [(n) => 1 / n, (n) => 1 / (n * n), (n) => 3 / n] : [(n) => 1 / n, (n) => -1 / n, (n) => 1 / (n * n), (n) => 0];
  return [() => a, (n) => a + 1 / n, (n) => a - 1 / (n * n)];
}

function operations(q: Q): Pb {
  const t = q.text;
  const lims: Record<string, string> = {};
  for (const m of t.matchAll(LIM_TXT)) lims[m[1]] = m[2];
  const E = t.match(/\\left\((.+?)\\right\)\$/);
  if (!lims.u || !lims.v || !E) return ["énoncé illisible"];
  const g = compiler(prep(E[1]));
  const vPos = /v_n > 0/.test(t);
  const res: LimV[] = [];
  for (const u of realisations(lims.u, false))
    for (const v of realisations(lims.v, vPos)) {
      try {
        res.push(limNum((n) => g({ U: u(n), V: v(n) })));
      } catch {
        res.push("aucune");
      }
    }
  const tous = res.every((r) => memeLim(r, res[0] as LimV, 1e-4));
  const L: LimV = tous ? res[0] : "FI";
  if (q.format !== "qcm") return courtLim(q, L);
  return choixLim(q, L);
}

/* comparaison */

function comparaison(q: Q): Pb {
  const m = q.text.match(/\$u_n (\\ge|\\le) ([^$]+)\$/)!;
  const Lg = limNum(fn(m[2]) as (n: number) => number);
  const L: LimV = m[1] === "\\ge" && Lg === "+" ? "+" : m[1] === "\\le" && Lg === "-" ? "-" : "NC";
  return seulChoix(q, (c) => {
    const x = lireLim(c);
    return x === L || (L === "NC" && x === "NC");
  });
}

function encadrementBornes(t: string) {
  const m = t.match(/\$([^$]+?) \\le u_n \\le ([^$]+)\$/)!;
  return [limNum(fn(m[1]) as (n: number) => number), limNum(fn(m[2]) as (n: number) => number)] as const;
}

function gendarmes(q: Q): Pb {
  const [a, b] = encadrementBornes(q.text);
  if (!memeLim(a, b, 1e-4)) return ["bornes de limites différentes"];
  return courtLim(q, a);
}

function gendarmesPiege(q: Q): Pb {
  const [a, b] = encadrementBornes(q.text);
  const L: LimV = memeLim(a, b, 1e-4) ? a : "NC";
  return seulChoix(q, (c) => memeLim(lireLim(c), L, 1e-4));
}

/** Inégalité vraie pour tout n ≥ 1 ET qui conclut. */
function comparaisonUtile(q: Q): Pb {
  const u = lireExpl(q.text)!;
  const Lu = limNum(u.f);
  return seulChoix(q, (c) => {
    const m = c.match(/^\$u_n (\\ge|\\le) ([^$]+)\$$/);
    if (!m) return false;
    const g = fn(m[2]) as (n: number) => number;
    for (let k = 1; k <= 3000; k++) {
      const d = u.f(k) - g(k);
      if (m[1] === "\\ge" ? d < -1e-9 : d > 1e-9) return false;
    }
    const Lg = limNum(g);
    return (m[1] === "\\ge" && Lg === "+" && Lu === "+") || (m[1] === "\\le" && Lg === "-" && Lu === "-");
  });
}

/* convergence monotone */

const CONV_INC = "elle converge, mais on ne connaît pas encore sa limite";

function tcm(q: Q): Pb {
  const t = q.text;
  const croiss = / est croissante/.test(t);
  let L: string;
  if (/n'est pas majorée/.test(t)) L = "elle tend vers $+\\infty$";
  else if (/n'est pas minorée/.test(t)) L = "elle tend vers $-\\infty$";
  else if ((croiss && /majorée par/.test(t)) || (!croiss && /minorée par/.test(t))) L = CONV_INC;
  else L = "on ne peut pas conclure";
  return seulChoix(q, (c) => c === L);
}

function tcmHypo(q: Q): Pb {
  const t = q.text;
  if (/Que faut-il encore démontrer|Quelle propriété manque|Que reste-t-il à prouver/.test(t))
    return seulChoix(q, (c) => c === (/qu'elle est croissante/.test(t) ? "qu'elle est majorée" : "qu'elle est minorée"));
  if (/FAUSSE|fausse/.test(t)) {
    const M = t.match(/majorée par \$(\d+)\$/)![1];
    return seulChoix(q, (c) => c === `sa limite est forcément $${M}$`);
  }
  return seulChoix(q, (c) => c === "être croissante et majorée" || c === "être décroissante et minorée");
}

function tcmLimite(q: Q): Pb {
  const t = q.text;
  const u0 = Number(t.match(/\$u_0 = (-?\d+)\$/)![1]);
  const B = Number(t.match(/\$u_n \\[lg]e (-?\d+)\$/)![1]);
  const [lo, hi] = [Math.min(u0, B), Math.max(u0, B)];
  if (/est croissante/.test(t) ? B < u0 : B > u0) return ["borne du mauvais côté"];
  return seulChoix(q, (c) => c === `$${lo} \\le \\ell \\le ${hi}$`);
}

/** Exemple : on vérifie le sens et la borne annoncés, puis on calcule la limite. */
function tcmExemple(q: Q): Pb {
  const e = lireExpl(q.text)!;
  const B = val(q.text.match(/(?:majorée|minorée) par \$([^$]+)\$/)![1]);
  const croiss = /est croissante/.test(q.text);
  for (let k = 0; k < 500; k++) {
    const d = e.f(k + 1) - e.f(k);
    if (croiss ? d < 0 || e.f(k) > B : d > 0 || e.f(k) < B) return ["sens ou borne annoncés faux"];
  }
  return limiteExplicite(q);
}

function tcmPointFixe(q: Q): Pb {
  const s = termes(q.text, 400).t;
  const croiss = /est croissante|croissante et majorée/.test(q.text);
  const B = val(q.text.match(/(?:majorée|minorée) par \$([^$]+)\$/)![1]);
  for (let k = 0; k < 399; k++) {
    const d = s[k + 1] - s[k];
    if (croiss ? d < -1e-12 || s[k] > B : d > 1e-12 || s[k] < B) return ["sens ou borne annoncés faux"];
  }
  return seuleJuste(q, limiteSuite(q.text), {}, 1e-6);
}

function tcmSituation(q: Q): Pb {
  const s = termes(q.text, 400).t;
  const croiss = /est croissante/.test(q.text);
  const B = val(q.text.match(/\$u_n \\[lg]e ([^$]+)\$ pour tout/)![1]);
  for (let k = 0; k < 399; k++) {
    const d = s[k + 1] - s[k];
    if (croiss ? d < -1e-12 || s[k] > B : d > 1e-12 || s[k] < B) return ["sens ou borne annoncés faux"];
  }
  const L = limiteSuite(q.text);
  return seulChoix(q, (c) => {
    const m = c.match(/converge vers un réel \$\\ell \\([lg]e) ([^$]+)\$/);
    if (m) return m[1] === "le" ? L <= val(m[2]) + 1e-9 : L >= val(m[2]) - 1e-9;
    const x = lireLim(c);
    return typeof x === "number" ? proche(x, L, 1e-6) : false;
  });
}

/* défi */

/** Équation vérifiée par la limite : identité avec ℓ − f(ℓ). */
function defiEq(q: Q): Pb {
  const r = lireRec(q.text)!;
  const xs = [0.7, 1.3, 2.9, 4.1, 7.5];
  return seulChoix(q, (c) => {
    const m = c.replace(/\$/g, "").replace(/\\ell/g, "x").split(" = ");
    if (m.length !== 2) return false;
    try {
      const A = compiler(m[0]), Bc = compiler(m[1]);
      const ecart = xs.map((x) => A({ x }) - Bc({ x }));
      const ref = xs.map((x) => x - r.f(x, 0));
      return ecart.every((v, i) => proche(v, ref[i], 1e-9)) || ecart.every((v, i) => proche(v, -ref[i], 1e-9));
    } catch {
      return false;
    }
  });
}

function defiLim(q: Q): Pb {
  const mv = q.text.match(/\$v_n = u_n - ([\d{},]+)\$ : \$\(v_n\)\$ est géométrique de raison \$([\d{},]+)\$/);
  if (mv) {
    const s = termes(q.text, 6).t.map((x) => x - val(mv[1]));
    const nt = nature(s);
    if (nt.nat !== GEO || !proche(nt.raison, val(mv[2]), 1e-9)) return ["v_n annoncée fausse"];
  }
  return seuleJuste(q, limiteSuite(q.text), {}, 1e-6);
}

function defiSeuilLim(q: Q): Pb {
  const e = lireExpl(q.text)!;
  const Lv = limNum(e.f);
  if (typeof Lv !== "number") return ["pas de limite finie"];
  const m1 = q.text.match(/- u_n < ([\d{},]+)\$/);
  const m2 = q.text.match(/\$u_n > ([\d{},]+)\$/);
  const ok = m1 ? (k: number) => Lv - e.f(k) < val(m1[1]) : m2 ? (k: number) => e.f(k) > val(m2[1]) : null;
  if (!ok) return ["condition illisible"];
  let N = 0;
  while (!ok(N) && N < 10000) N++;
  return seuleJuste(q, N);
}

function defiSommeGeo(q: Q): Pb {
  const m = q.text.match(/\\sum_\{k=0\}\^\{n\} ([^$]+)\$/)!;
  const g = compiler(m[1]);
  let S = 0;
  for (let k = 0; k <= 5000; k++) S += g({ k });
  return seuleJuste(q, S, {}, 1e-6 * Math.max(1, Math.abs(S)));
}

function defiConclure(q: Q): Pb {
  const r = lireRec(q.text)!;
  let u = r.u0;
  for (let k = 0; k < 300 && Math.abs(u) < 1e12; k++) u = r.f(u, k);
  const L: LimV = u > 1e12 ? "+" : u < -1e12 ? "-" : u;
  return choixLim(q, L, 1e-6);
}

/* ───────────── la table : clé du générateur → contrôle ───────────── */

const PAR_CLE: Record<string, (q: Q) => Pb> = {
  // suite_numerique
  natRec1: natureSuite, natRec2: natureSuite, natExpl2: natureSuite, natExpl3: natureSuite,
  liste: natureListe, raisonSit: raisonSituation, auxiliaire,
  termeExpl1: valeurTerme, termeExpl2: valeurTerme, termeRec1: valeurTerme, termeRec2: valeurTerme, termeRec3: valeurTerme, termeSit: valeurTerme, loin: valeurTerme,
  suivant, rang, forme,
  explVersRec: recPourExpl, recVersExpl0: explPourRec, recVersExpl1: explPourRec, affineExpl: explPourRec, sommeRec: explPourRec,
  etapeNom, manque: etapeManque, fausse: etapeFausse, hypothese, heredCalcul4: heredCalcul, heredCalcul5: heredCalcul, valeurInit, conclRang,
  varExpl: sensSuite(61), varGeo: sensSuite(61), varRec: sensSuite(8), varAffine: sensSuite(61), varDiff: sensDiff, varQuotient: sensQuotient, varNuage: sensNuage, varRang: sensRang,
  borneDef, majorant, borneGeo, borneTrig: encadrement, borneRec, borneQuelle,
  chaine4: chaine, chaine5: chaine, seuilGeo: seuil, somme, pointFixe,
  // limite_suite
  limNuage: limiteNuage, limPhrase: limiteExplicite, limTableau: limiteTableau, limDef: limiteDef, limRang: limiteRang,
  limRef1: limiteExplicite, limRef2: limiteExplicite, limGeo: limiteExplicite, limPoly: limiteExplicite, limRat: limiteExplicite, limRatCourt: limiteExpliciteCourt, limExpo: limiteExplicite,
  opsFinies: operations, opsInfini: operations, opsExpr: limiteExpliciteCourt, opsExprInf: limiteExplicite, opsFI: limiteExplicite,
  compMinore: comparaison, gendarmes, gendarmesPiege, encTrig: limiteExplicite, compConcret: comparaisonUtile,
  tcm, tcmHypo, tcmLimite, tcmExemple, tcmPointFixe, tcmSituation,
  defiEq, defiLim, defiSeuilLim, defiSommeGeo, defiConclure,
};

export const CORRECTEURS: CorrecteursMaths = Object.fromEntries(
  [...renfortSuites, ...renfortLimitesSuites].map((it) => {
    const cle = it.id.split("__")[1];
    const f = PAR_CLE[cle];
    if (!f) throw new Error(`pas de correcteur pour la clé ${cle} (${it.id})`);
    return [it.id, f];
  })
);
