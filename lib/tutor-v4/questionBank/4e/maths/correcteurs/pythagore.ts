import type { CorrecteursMaths } from "./types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { avecRegleMotsCles, qcmUnique } from "@/lib/tutor-v4/questionBank/6e/maths/correcteurs/pourcentages";

// LES CORRECTEURS DE pythagore.bank.ts (notion pythagore_theoreme, 08/10/2026).
//
// Ils relisent DANS LE TEXTE le nom du triangle, le sommet de l'angle droit
// (« rectangle en K »), les longueurs (« KL = 12 cm », « [KL] mesure… »,
// « l'hypoténuse mesure… ») ou, dans une situation, les mesures (« 2,4 m ») ;
// sur la FIGURE, le codage de l'angle droit (et qu'il est vraiment droit), les
// noms des sommets, les longueurs écrites sur les côtés et le « ? ». Puis ils
// REFONT le calcul : somme ou différence des carrés, racine carrée, arrondi au
// dixième quand il est annoncé (et seulement alors), réciproque (carré du PLUS
// GRAND côté contre la somme des deux autres). Ils vérifient que l'hypoténuse
// est le côté opposé à l'angle droit, plus longue que chaque autre côté, que le
// triangle existe, et l'unité de la réponse. Vide = juste.
//
// Les outils exportés servent aussi à thales.ts et cosinus.ts.

type Q = TutorGeneratedQuestionV4;

/** « 10 000 », « 2,5 », « 12 » : comme les gabarits écrivent les nombres. */
export const NB = "(\\d{1,3}(?: \\d{3})+(?:,\\d+)?|\\d+(?:,\\d+)?)";
export const UNITE = "(mm|cm|dm|km|m|pouces)";
export const num = (s: string) => Number(String(s).replace(/[\s  ]/g, "").replace(",", "."));
export const proche = (a: number | null | undefined, b: number | null | undefined, eps = 1e-6) =>
  a != null && b != null && Number.isFinite(a) && Number.isFinite(b) && Math.abs(a - b) <= eps;
export const carre = (x: number) => Math.round(x * x * 10000) / 10000;
export const dixieme = (x: number) => Math.round(x * 10) / 10;
/** La racine « tombe juste » au dixième près. */
export const racineJuste = (S: number) => {
  const r = Math.sqrt(S);
  return Math.abs(r * 10 - Math.round(r * 10)) < 1e-7;
};
const decimales = (x: number) => (String(Math.round(x * 1e6) / 1e6).split(".")[1] ?? "").length;
/** Les lettres d'un segment, dans l'ordre alphabétique : [KL] et [LK] sont le même côté. */
export const cle = (s: string) => [...s].sort().join("");

/** « 5 cm » → { v: 5, u: "cm" } ; « 1 225 » → { v: 1225, u: "" }. */
export function lireValeur(s: string): { v: number; u: string } | null {
  const m = String(s).trim().match(new RegExp(`^${NB}(?: (.+))?$`));
  return m ? { v: num(m[1]), u: (m[2] ?? "").trim() } : null;
}

/** Les mesures « 2,4 m », « 16 pouces » d'un texte, dans l'ordre. */
export function mesures(t: string): { v: number; u: string }[] {
  return [...t.matchAll(new RegExp(`${NB} ${UNITE}(?![\\p{L}²³])`, "gu"))].map((m) => ({ v: num(m[1]), u: m[2] }));
}

/** Tous les nombres d'un texte. */
export const nombres = (t: string) => [...t.matchAll(new RegExp(NB, "g"))].map((m) => num(m[1]));

/** La réponse attendue : la bonne valeur, la bonne unité, deux décimales au plus. */
export function verifierReponse(q: Q, juste: number, u: string, eps = 1e-6): string[] {
  const p: string[] = [];
  const e = lireValeur(String(q.expected[0]));
  if (!e) return [`réponse attendue illisible : « ${q.expected[0]} »`];
  if (!proche(e.v, juste, eps)) p.push(`attendu « ${q.expected[0]} », le calcul donne ${juste}`);
  if (e.u !== u) p.push(`unité de la réponse « ${e.u || "aucune"} » au lieu de « ${u || "aucune"} »`);
  if (decimales(e.v) > 2) p.push(`${e.v} : plus de deux décimales`);
  return p;
}

/** Les mesures d'une situation : deux décimales au plus, une seule unité. */
export function verifierMesures(ms: { v: number; u: string }[]): string[] {
  const p: string[] = [];
  for (const m of ms) if (decimales(m.v) > 2) p.push(`mesure ${m.v} ${m.u} : plus de deux décimales`);
  if (new Set(ms.map((m) => m.u)).size > 1) p.push(`unités mélangées : ${ms.map((m) => m.u).join(", ")}`);
  return p;
}

/** Le triangle existe : chaque côté est plus court que la somme des deux autres. */
export function triangleExiste(a: number, b: number, c: number): boolean {
  return a > 0 && b > 0 && c > 0 && a < b + c && b < a + c && c < a + b;
}

/** Vrai quand le carré du plus grand côté vaut la somme des carrés des deux autres. */
export function estRectangle(cotes: number[]): boolean {
  const s = [...cotes].sort((x, y) => x - y);
  return proche(carre(s[2]), carre(s[0]) + carre(s[1]), 1e-6);
}

/** Évalue un calcul écrit « 12,5² + 7² », « (3 + 4)² », « 2 × 3 + 2 × 4 ». */
export function evaluer(expr: string): number | null {
  const js = expr
    .replace(/\$/g, "")
    .replace(/(\d) (?=\d{3}\b)/g, "$1")
    .replace(/,/g, ".")
    .replace(/[−–]/g, "-")
    .replace(/×/g, "*")
    .replace(/÷/g, "/")
    .replace(/²/g, "**2");
  if (!/^[\d.+\-*/() ]+$/.test(js)) return null;
  try {
    const v = Function(`"use strict"; return (${js});`)() as number;
    return Number.isFinite(v) ? v : null;
  } catch {
    return null;
  }
}

// ─── Le triangle nommé ──────────────────────────────────────────────────────

export type TriangleLu = {
  nom: string | null;
  droit: string | null;
  /** Longueurs lues, par côté (clé = lettres triées). */
  L: Map<string, number>;
  unites: Set<string>;
  hyp: string | null;
  jambes: string[];
  /** « Ses côtés de l'angle droit mesurent a et b » : sans nom. */
  jambesAnonymes: number[];
};

export function lireTriangle(t: string): TriangleLu {
  const nom =
    (t.match(/triangle (?:rectangle )?([A-Z]{3})\b/) ?? t.match(/\b([A-Z]{3}) est (?:un triangle|rectangle|un triangle rectangle)/))?.[1] ?? null;
  const droit = (t.match(/rectangle en ([A-Z])\b/) ?? t.match(/angle droit en ([A-Z])\b/))?.[1] ?? null;
  const L = new Map<string, number>();
  const unites = new Set<string>();
  const poser = (s: string, v: string, u: string) => {
    L.set(cle(s), num(v));
    unites.add(u);
  };
  for (const m of t.matchAll(new RegExp(`\\b([A-Z]{2}) = ${NB} ${UNITE}(?![\\p{L}²])`, "gu"))) poser(m[1], m[2], m[3]);
  for (const m of t.matchAll(new RegExp(`\\[([A-Z]{2})\\] mesure ${NB} ${UNITE}`, "g"))) poser(m[1], m[2], m[3]);
  const deux = t.match(new RegExp(`\\[([A-Z]{2})\\] et \\[([A-Z]{2})\\] mesurent ${NB} ${UNITE} et ${NB} ${UNITE}`));
  if (deux) {
    poser(deux[1], deux[3], deux[4]);
    poser(deux[2], deux[5], deux[6]);
  }
  let hyp: string | null = null;
  let jambes: string[] = [];
  if (nom && droit && nom.includes(droit)) {
    const autres = [...nom].filter((x) => x !== droit);
    hyp = cle(autres.join(""));
    jambes = autres.map((x) => cle(droit + x));
    const h = t.match(new RegExp(`l’hypoténuse mesure ${NB} ${UNITE}`));
    if (h) poser(hyp, h[1], h[2]);
  }
  const anon = t.match(new RegExp(`côtés de l’angle droit mesurent ${NB} ${UNITE} et ${NB} ${UNITE}`));
  const jambesAnonymes = anon ? [num(anon[1]), num(anon[3])] : [];
  if (anon) unites.add(anon[2]).add(anon[4]);
  return { nom, droit, L, unites, hyp, jambes, jambesAnonymes };
}

/** Le triangle est bien nommé, rectangle en un de ses sommets, ses longueurs dans une seule unité. */
function verifierTriangle(T: TriangleLu): string[] {
  const p: string[] = [];
  if (!T.nom) return ["nom du triangle illisible"];
  if (new Set(T.nom).size !== 3) p.push(`le triangle ${T.nom} n'a pas trois sommets distincts`);
  if (T.droit && !T.nom.includes(T.droit)) p.push(`« rectangle en ${T.droit} » : ${T.droit} n'est pas un sommet de ${T.nom}`);
  for (const s of T.L.keys()) if (![...s].every((x) => T.nom!.includes(x))) p.push(`le côté [${s}] n'est pas un côté de ${T.nom}`);
  if (T.unites.size > 1) p.push(`unités mélangées : ${[...T.unites].join(", ")}`);
  for (const v of T.L.values()) if (decimales(v) > 2) p.push(`longueur ${v} : plus de deux décimales`);
  if (T.hyp && T.L.has(T.hyp))
    for (const j of T.jambes)
      if (T.L.has(j) && !(T.L.get(T.hyp)! > T.L.get(j)!)) p.push(`l'hypoténuse [${T.hyp}] (${T.L.get(T.hyp)}) n'est pas plus longue que [${j}] (${T.L.get(j)})`);
  return p;
}

// ─── La figure ──────────────────────────────────────────────────────────────

type Pt = { x: number; y: number };
type FigTri = {
  kind?: string;
  points?: Record<"A" | "B" | "C", Pt>;
  labels?: Record<"A" | "B" | "C", string>;
  sideLabels?: Partial<Record<"AB" | "BC" | "CA", string>>;
  angleLabels?: Partial<Record<"A" | "B" | "C", string>>;
  marks?: { rightAngleAt?: "A" | "B" | "C" };
};

/** Le sommet (nom de l'énoncé) qui porte le codage de l'angle droit. */
export function droitFigure(q: Q): string | null {
  const c = q.canvas as FigTri | undefined;
  const k = c?.marks?.rightAngleAt;
  return k && c?.labels ? c.labels[k] : null;
}

const dist = (a: Pt, b: Pt) => Math.hypot(a.x - b.x, a.y - b.y);

/** Le cosinus de l'angle dessiné au sommet k (clé du canvas). */
function cosDessine(c: FigTri, k: "A" | "B" | "C"): number {
  const P = c.points!;
  const [u, v] = (["A", "B", "C"] as const).filter((x) => x !== k).map((x) => ({ x: P[x].x - P[k].x, y: P[x].y - P[k].y }));
  return (u.x * v.x + u.y * v.y) / (Math.hypot(u.x, u.y) * Math.hypot(v.x, v.y));
}

/**
 * La figure du triangle : mêmes sommets que le texte, angle droit codé là où
 * le texte le dit (et seulement là), vraiment droit sur le dessin, longueurs
 * écrites sur les bons côtés, « ? » sur la longueur cherchée, à l'échelle.
 */
export function verifierFigure(
  q: Q,
  o: { nom: string | null; droit: string | null | undefined; L?: Map<string, number>; inconnu?: string | null; echelle?: boolean; requise?: boolean },
): string[] {
  const c = q.canvas as FigTri | undefined;
  if (!c) return o.requise ? ["la figure manque"] : [];
  const p: string[] = [];
  if (c.kind !== "triangle" || !c.labels || !c.points) return ["figure : un triangle attendu"];
  const noms = [c.labels.A, c.labels.B, c.labels.C];
  if (o.nom && cle(noms.join("")) !== cle(o.nom)) p.push(`figure : sommets ${noms.join("")} au lieu de ${o.nom}`);
  const k = c.marks?.rightAngleAt;
  if (o.droit === null && k) p.push(`figure : un angle droit est codé en ${c.labels[k]} alors que rien ne le donne`);
  if (o.droit && (!k || c.labels[k] !== o.droit)) p.push(`figure : l'angle droit devrait être codé en ${o.droit}${k ? `, il l'est en ${c.labels[k]}` : ""}`);
  if (k && Math.abs(cosDessine(c, k)) > 0.03) p.push(`figure : l'angle codé droit en ${c.labels[k]} n'est pas droit sur le dessin`);
  const cotes: ["AB" | "BC" | "CA", "A" | "B" | "C", "A" | "B" | "C"][] = [
    ["AB", "A", "B"],
    ["BC", "B", "C"],
    ["CA", "C", "A"],
  ];
  const sl = c.sideLabels ?? {};
  const vus = new Set<string>();
  for (const [s, x, y] of cotes) {
    const lab = String(sl[s] ?? "").trim();
    if (!lab) continue;
    const seg = cle(c.labels[x] + c.labels[y]);
    vus.add(seg);
    if (lab === "?") {
      if (o.inconnu !== undefined && o.inconnu !== seg) p.push(`figure : le « ? » est sur [${seg}] au lieu de [${o.inconnu}]`);
      continue;
    }
    const v = lireValeur(lab);
    if (!v) {
      p.push(`figure : étiquette illisible « ${lab} »`);
      continue;
    }
    if (o.L && o.L.has(seg) && !proche(o.L.get(seg), v.v)) p.push(`figure : [${seg}] porte ${lab}, le texte dit ${o.L.get(seg)}`);
    if (o.L && !o.L.has(seg)) p.push(`figure : [${seg}] porte ${lab}, le texte ne donne pas cette longueur`);
  }
  if (o.L && Object.keys(sl).length) for (const s of o.L.keys()) if (!vus.has(s)) p.push(`figure : la longueur de [${s}] n'est pas écrite`);
  if (o.inconnu && Object.keys(sl).length && !Object.values(sl).includes("?")) p.push("figure : la longueur cherchée n'est pas marquée « ? »");
  // À l'échelle : les côtés dessinés sont proportionnels aux longueurs connues.
  if (o.echelle && o.L) {
    const rapports: number[] = [];
    for (const [, x, y] of cotes) {
      const seg = cle(c.labels[x] + c.labels[y]);
      if (o.L.has(seg)) rapports.push(dist(c.points[x], c.points[y]) / o.L.get(seg)!);
    }
    if (rapports.length >= 2 && Math.max(...rapports) / Math.min(...rapports) > 1.08) p.push("figure : pas à l'échelle des longueurs de l'énoncé");
  }
  // L'hypoténuse est le plus long côté DESSINÉ.
  if (k) {
    const opp = cotes.find(([, x, y]) => x !== k && y !== k)!;
    const lh = dist(c.points[opp[1]], c.points[opp[2]]);
    for (const [, x, y] of cotes) if (x === k || y === k) if (dist(c.points[x], c.points[y]) >= lh) p.push("figure : l'hypoténuse n'est pas le plus long côté dessiné");
  }
  return p;
}

// ─── Carrés et racines ──────────────────────────────────────────────────────

const RACINE = /√|racine|pour carré|x² =|…² =|lui-même, donne|au carré, donne|aire de \d|d’aire \d|est de \d|couvre \d|rangées en carré|carreaux identiques|tuiles|cases, autant/;

/** L'unité d'une réponse : une aire se lit sur une longueur, un côté sur une aire. */
function uniteCarre(t: string, aire: boolean): string {
  const m = t.match(/\d (mm|cm|dm|m)(²?)(?![a-zà-ÿ])/);
  if (!m) return "";
  return aire ? (m[2] ? "" : `${m[1]}²`) : m[2] ? m[1] : "";
}

/** Carré d'un nombre, racine d'un carré parfait, encadrement ou arrondi d'une racine. */
function corrigerCarreRacine(q: Q): string[] {
  const t = q.text;
  const ns = [...new Set(nombres(t))];
  if (ns.length !== 1) return [`un seul nombre attendu, lus : ${ns.join(", ")}`];
  const N = ns[0];
  const r = Math.sqrt(N);
  if (/consécutifs|encadre|compris entre/.test(t)) {
    if (Number.isInteger(r)) return [`√${N} est entier : rien à encadrer`];
    const k = Math.floor(r);
    return qcmUnique(q, (c) => c === `${k} et ${k + 1}`);
  }
  if (/dixième/.test(t)) {
    if (Number.isInteger(r)) return [`√${N} est entier : l'arrondi au dixième n'a pas de sens`];
    return qcmUnique(q, (c) => proche(lireValeur(c)?.v, dixieme(r)));
  }
  const racine = RACINE.test(t);
  if (racine && !Number.isInteger(r)) return [`√${N} ne tombe pas juste`];
  const juste = racine ? r : N * N;
  const u = uniteCarre(t, !racine);
  if (q.format === "qcm") {
    const p = qcmUnique(q, (c) => proche(lireValeur(c)?.v, juste));
    const avecUnite = (q.choices ?? []).some((c) => (lireValeur(c)?.u ?? "") !== "");
    if (avecUnite && lireValeur(q.expected[0])?.u !== u) p.push(`unité « ${lireValeur(q.expected[0])?.u} » au lieu de « ${u} »`);
    return p;
  }
  return verifierReponse(q, juste, u);
}

/** La somme (ou la différence) des carrés de deux nombres. */
const corrigerDeuxCarres = (signe: 1 | -1) => (q: Q): string[] => {
  const ns = [...new Set(nombres(q.text))];
  if (ns.length !== 2) return [`deux nombres distincts attendus, lus : ${ns.join(", ")}`];
  const [p, g] = [...ns].sort((x, y) => x - y);
  const juste = signe === 1 ? g * g + p * p : g * g - p * p;
  const u = q.text.match(/\d (mm|cm|dm|m)(?![a-zà-ÿ²])/)?.[1];
  return verifierReponse(q, juste, u ? `${u}²` : "");
};

// ─── Reconnaître ────────────────────────────────────────────────────────────

const estSeg = (c: string) => /^\[?[A-Z]{2}\]?$/.test(c.trim());
const lettres = (c: string) => c.replace(/[[\]]/g, "");

/** Quel côté, quel sommet, quels côtés de l'angle droit : selon la forme des propositions. */
function corrigerReconnaitre(q: Q, droit: string | null, nom: string | null): string[] {
  if (!nom || !droit || !nom.includes(droit)) return [`triangle ou angle droit illisible (${nom}, ${droit})`];
  const hyp = cle([...nom].filter((x) => x !== droit).join(""));
  const ch = q.choices ?? [];
  if (ch.every((c) => /^en [A-Z]$/.test(c))) return qcmUnique(q, (c) => c === `en ${droit}`);
  if (ch.every((c) => /^[A-Z]$/.test(c))) return qcmUnique(q, (c) => c === droit);
  if (ch.every((c) => /^\[?[A-Z]{2}\]? et \[?[A-Z]{2}\]?$/.test(c)))
    return qcmUnique(q, (c) => c.split(" et ").every((s) => lettres(s).includes(droit)));
  if (ch.includes("l’hypoténuse")) {
    const s = q.text.match(/côté \[([A-Z]{2})\]/)?.[1];
    if (!s) return ["côté étudié illisible"];
    return qcmUnique(q, (c) => c === (cle(s) === hyp ? "l’hypoténuse" : "un côté de l’angle droit"));
  }
  if (ch.every(estSeg)) {
    if (!/hypoténuse|opposé à l’angle droit|plus (?:long|grand) côté|en face de l’angle droit/.test(q.text)) return ["question sur un côté illisible"];
    return qcmUnique(q, (c) => cle(lettres(c)) === hyp);
  }
  return [`propositions inattendues : ${ch.join(" | ")}`];
}

/** Sans figure : le texte donne l'angle droit, ou l'hypoténuse. */
function corrigerReconnaitreTexte(q: Q): string[] {
  const T = lireTriangle(q.text);
  let droit = T.droit;
  if (!droit) {
    const h = q.text.match(/(?:hypoténuse est|plus grand côté est|Le côté) \[([A-Z]{2})\]/)?.[1];
    if (h && T.nom) droit = [...T.nom].find((x) => !h.includes(x)) ?? null;
  }
  return [...(q.canvas ? ["figure inattendue"] : []), ...corrigerReconnaitre(q, droit, T.nom)];
}

/** Avec la figure : l'angle droit se lit sur le codage. */
function corrigerReconnaitreFigure(q: Q): string[] {
  const T = lireTriangle(q.text);
  const d = droitFigure(q);
  const p = verifierFigure(q, { nom: T.nom, droit: d ?? undefined, requise: true });
  if (!d) p.push("aucun angle droit codé sur la figure");
  if (T.droit && T.droit !== d) p.push(`le texte dit « rectangle en ${T.droit} », la figure code ${d}`);
  return [...p, ...corrigerReconnaitre(q, d, T.nom)];
}

/** Peut-on appliquer Pythagore ? Oui seulement si l'angle droit est codé. */
function corrigerPeutOn(q: Q): string[] {
  const T = lireTriangle(q.text);
  const d = droitFigure(q);
  return [...verifierFigure(q, { nom: T.nom, droit: d ?? undefined, requise: true }), ...qcmUnique(q, (c) => c === (d ? "oui" : "non"))];
}

// ─── Calculer : triangles nommés ────────────────────────────────────────────

/** Ce que la question demande : le dernier côté nommé de la dernière phrase. */
function demande(texte: string, T: TriangleLu): string | null {
  const t = texte.replace(/ (?:Donne l’arrondi au dixième|Arrondis au dixième|Arrondis le résultat au dixième)\.$/, "");
  const fin = t.slice(t.lastIndexOf(".", t.length - 2) + 1);
  if (/son hypoténuse \?|longueur de l’hypoténuse \?/.test(fin)) return T.hyp;
  const segs = [...fin.matchAll(/\b([A-Z]{2})\b/g)].map((m) => cle(m[1]));
  return segs.length ? segs[segs.length - 1] : null;
}

/** L'hypoténuse d'un triangle nommé : deux côtés de l'angle droit connus. */
function corrigerHypNomme(q: Q): string[] {
  const T = lireTriangle(q.text);
  const p = verifierTriangle(T);
  if (!T.hyp) return [...p, "angle droit illisible"];
  const [a, b] = T.jambes.map((j) => T.L.get(j));
  if (a == null || b == null) return [...p, "les deux côtés de l'angle droit ne sont pas donnés"];
  if (T.L.has(T.hyp)) p.push("l'hypoténuse est déjà donnée");
  if (demande(q.text, T) !== T.hyp) p.push(`la question ne porte pas sur l'hypoténuse [${T.hyp}]`);
  const S = carre(a) + carre(b);
  const arrondi = /dixième/.test(q.text);
  if (!racineJuste(S) && !arrondi) p.push(`√${S} ne tombe pas juste et aucun arrondi n'est demandé`);
  const juste = racineJuste(S) ? Math.sqrt(S) : dixieme(Math.sqrt(S));
  return [
    ...p,
    ...verifierReponse(q, juste, [...T.unites][0]),
    ...verifierFigure(q, { nom: T.nom, droit: T.droit, L: T.L, inconnu: T.hyp, echelle: true, requise: true }),
  ];
}

/** Le carré de l'hypoténuse. */
function corrigerHypCarre(q: Q): string[] {
  const T = lireTriangle(q.text);
  const p = verifierTriangle(T);
  const [a, b] = T.jambesAnonymes.length ? T.jambesAnonymes : T.jambes.map((j) => T.L.get(j));
  if (a == null || b == null || !T.hyp) return [...p, "les côtés de l'angle droit sont illisibles"];
  if (!new RegExp(`\\b${T.hyp[0]}${T.hyp[1]}²|\\b${T.hyp[1]}${T.hyp[0]}²`).test(q.text)) p.push(`la question ne demande pas le carré de l'hypoténuse [${T.hyp}]`);
  // « Ses côtés de l'angle droit mesurent a et b » : la figure dit lequel est lequel ;
  // on vérifie seulement qu'elle porte bien ces deux nombres sur les côtés de l'angle droit.
  let L = T.L;
  if (T.jambesAnonymes.length) {
    const c = q.canvas as FigTri | undefined;
    const sl = c?.sideLabels ?? {};
    L = new Map();
    for (const [s, x, y] of [["AB", "A", "B"], ["BC", "B", "C"], ["CA", "C", "A"]] as const) {
      const v = lireValeur(String(sl[s] ?? ""));
      if (v && c?.labels) L.set(cle(c.labels[x] + c.labels[y]), v.v);
    }
    const lus = T.jambes.map((j) => L.get(j)).sort();
    if (lus.join("|") !== [a, b].sort().join("|")) p.push(`figure : les côtés de l'angle droit portent ${lus.join(" et ")} au lieu de ${a} et ${b}`);
  }
  return [...p, ...verifierReponse(q, carre(a) + carre(b), ""), ...verifierFigure(q, { nom: T.nom, droit: T.droit, L, inconnu: T.hyp, echelle: true })];
}

/** Un côté de l'angle droit : l'hypoténuse et l'autre côté connus. */
function corrigerCoteNomme(q: Q): string[] {
  const T = lireTriangle(q.text);
  const p = verifierTriangle(T);
  if (!T.hyp) return [...p, "angle droit illisible"];
  const h = T.L.get(T.hyp);
  const connus = T.jambes.filter((j) => T.L.has(j));
  if (h == null || connus.length !== 1) return [...p, "il faut l'hypoténuse et un seul côté de l'angle droit"];
  const cherche = T.jambes.find((j) => !T.L.has(j))!;
  if (demande(q.text, T) !== cherche) p.push(`la question ne porte pas sur [${cherche}]`);
  const D = Math.round((carre(h) - carre(T.L.get(connus[0])!)) * 10000) / 10000;
  if (!(D > 0)) return [...p, "l'hypoténuse n'est pas plus longue que l'autre côté"];
  const arrondi = /dixième/.test(q.text);
  if (!racineJuste(D) && !arrondi) p.push(`√${D} ne tombe pas juste et aucun arrondi n'est demandé`);
  const juste = racineJuste(D) ? Math.sqrt(D) : dixieme(Math.sqrt(D));
  return [
    ...p,
    ...verifierReponse(q, juste, [...T.unites][0]),
    ...verifierFigure(q, { nom: T.nom, droit: T.droit, L: T.L, inconnu: cherche, echelle: true, requise: true }),
  ];
}

/** Le carré d'un côté de l'angle droit. */
function corrigerCoteCarre(q: Q): string[] {
  const T = lireTriangle(q.text);
  const p = verifierTriangle(T);
  if (!T.hyp) return [...p, "angle droit illisible"];
  const h = T.L.get(T.hyp);
  const connus = T.jambes.filter((j) => T.L.has(j));
  if (h == null || connus.length !== 1) return [...p, "il faut l'hypoténuse et un seul côté de l'angle droit"];
  const cherche = T.jambes.find((j) => !T.L.has(j))!;
  if (!new RegExp(`\\b(?:${cherche}|${[...cherche].reverse().join("")})²`).test(q.text)) p.push(`la question ne demande pas ${cherche}²`);
  return [...p, ...verifierReponse(q, carre(h) - carre(T.L.get(connus[0])!), "")];
}

// ─── Calculer : situations ──────────────────────────────────────────────────

/** Deux mesures d'une situation ; l'hypoténuse (ou le côté) à trouver. */
function corrigerSituation(cherche: "hyp" | "cote") {
  return (q: Q): string[] => {
    const t = q.text.replace(/ Quel calcul donne la réponse \?$/, "");
    const ms = mesures(t);
    if (ms.length !== 2) return [`deux mesures attendues, lues : ${ms.map((m) => `${m.v} ${m.u}`).join(", ")}`];
    const p = verifierMesures(ms);
    const [x, y] = ms.map((m) => m.v);
    if (cherche === "hyp" && proche(x, y) && /rectangulaire|sur \d/.test(t)) p.push(`un rectangle de ${x} sur ${y} est un carré`);
    const S = cherche === "hyp" ? carre(x) + carre(y) : Math.round(Math.abs(carre(x) - carre(y)) * 10000) / 10000;
    if (!(S > 0)) return [...p, "longueurs égales : pas de triangle"];
    const arrondi = /dixième/.test(t);
    if (!racineJuste(S) && !arrondi) p.push(`√${S} ne tombe pas juste et aucun arrondi n'est demandé`);
    const juste = racineJuste(S) ? Math.sqrt(S) : dixieme(Math.sqrt(S));
    const u = ms[0].u;
    if (q.format === "qcm" && /Quel calcul/.test(q.text)) {
      const [g, pt] = x >= y ? [x, y] : [y, x];
      return [...p, ...qcmUnique(q, (c) => chaineJuste(c, cherche === "hyp" ? [x, y] : [g, pt], cherche === "hyp" ? "+" : "-", u))];
    }
    if (q.format === "qcm") return [...p, ...qcmUnique(q, (c) => proche(lireValeur(c)?.v, juste) && lireValeur(c)?.u === u)];
    return [...p, ...verifierReponse(q, juste, u)];
  };
}

/**
 * « 24² + 7² = 625, donc la longueur vaut √625 = 25 m » : la bonne opération
 * sur les bonnes longueurs, le bon résultat, la racine, « = » ou « ≈ » selon
 * que la racine tombe juste, et l'unité.
 */
function chaineJuste(c: string, xy: [number, number], op: "+" | "-", u: string): boolean {
  const m = c.match(new RegExp(`^${NB}² ([+-]) ${NB}² = ${NB}, donc la longueur vaut √${NB} (=|≈) ${NB} ${UNITE}$`));
  if (!m) return false;
  const [x, o, y, S, S2, rel, r, uu] = [num(m[1]), m[2], num(m[3]), num(m[4]), num(m[5]), m[6], num(m[7]), m[8]];
  if (o !== op || uu !== u || !proche(S, S2)) return false;
  const bonnes =
    op === "+"
      ? (proche(x, xy[1]) && proche(y, xy[0])) || (proche(x, xy[0]) && proche(y, xy[1]))
      : proche(x, xy[0]) && proche(y, xy[1]);
  if (!bonnes) return false;
  const vrai = op === "+" ? carre(x) + carre(y) : carre(x) - carre(y);
  if (!proche(S, vrai, 1e-4)) return false;
  const exact = racineJuste(S);
  return (rel === "=") === exact && proche(r, exact ? Math.sqrt(S) : dixieme(Math.sqrt(S)));
}

/** « Quel calcul prouve que KL = 25 cm ? » : la chaîne juste, et l'affirmation de l'énoncé vraie. */
function corrigerExpliqueNomme(cherche: "hyp" | "cote") {
  return (q: Q): string[] => {
    if (!/^Le triangle|^Dans le triangle|^Un camarade|^Une élève/.test(q.text)) return corrigerSituation(cherche)(q);
    const eleve = q.text.match(new RegExp(`trouve ([A-Z]{2}) = ${NB} ${UNITE}`));
    // L'affirmation à justifier (« prouve que QR = 24 mm ») n'est pas une donnée : on la lit à part.
    const affirme = q.text.match(new RegExp(`(?:prouve|justifie) que ([A-Z]{2}) = ${NB} ${UNITE}`));
    const T = lireTriangle(q.text.replace(/trouve [A-Z]{2} = /, "trouve ").replace(/(prouve|justifie) que [A-Z]{2} = /, "$1 que "));
    const p = verifierTriangle(T);
    if (!T.hyp) return [...p, "angle droit illisible"];
    const u = [...T.unites][0];
    const verifierAffirmation = (seg: string, juste: number) => {
      if (affirme && cle(affirme[1]) !== seg) p.push(`l'énoncé affirme une valeur de [${affirme[1]}], la longueur cherchée est [${seg}]`);
      const v = affirme ? num(affirme[2]) : T.L.get(seg);
      if (v != null && !proche(v, juste)) p.push(`l'énoncé affirme ${seg} = ${v}, le calcul donne ${juste}`);
    };
    if (cherche === "hyp") {
      const [a, b] = T.jambes.map((j) => T.L.get(j));
      if (a == null || b == null) return [...p, "côtés de l'angle droit illisibles"];
      verifierAffirmation(T.hyp, Math.sqrt(carre(a) + carre(b)));
      return [...p, ...qcmUnique(q, (c) => chaineJuste(c, [a, b], "+", u))];
    }
    const h = T.L.get(T.hyp);
    const connue = T.jambes.find((j) => T.L.has(j));
    const autre = T.jambes.find((j) => j !== connue)!;
    if (h == null || !connue) return [...p, "hypoténuse ou côté connu illisible"];
    const a = T.L.get(connue)!;
    const juste = Math.sqrt(carre(h) - carre(a));
    if (eleve) {
      if (cle(eleve[1]) !== autre) p.push(`l'élève calcule [${eleve[1]}] au lieu de [${autre}]`);
      if (proche(num(eleve[2]), juste)) p.push("la longueur « fausse » de l'élève est juste");
      return [...p, ...qcmUnique(q, (c) => proche(lireValeur(c)?.v, juste) && lireValeur(c)?.u === u)];
    }
    verifierAffirmation(autre, juste);
    return [...p, ...qcmUnique(q, (c) => chaineJuste(c, [h, a], "-", u))];
  };
}

// ─── Réciproque ─────────────────────────────────────────────────────────────

/** Les trois côtés d'un triangle nommé, et le plus grand. */
function troisCotes(T: TriangleLu): { segs: string[]; vals: number[]; grand: string } | null {
  if (!T.nom) return null;
  const segs = [cle(T.nom[0] + T.nom[1]), cle(T.nom[1] + T.nom[2]), cle(T.nom[0] + T.nom[2])];
  if (!segs.every((s) => T.L.has(s))) return null;
  const vals = segs.map((s) => T.L.get(s)!);
  const grand = segs[vals.indexOf(Math.max(...vals))];
  return { segs, vals, grand };
}

function verifierTrois(T: TriangleLu): { p: string[]; R: ReturnType<typeof troisCotes> } {
  const p = verifierTriangle(T);
  const R = troisCotes(T);
  if (!R) return { p: [...p, "les trois côtés ne sont pas tous lus"], R };
  if (!triangleExiste(R.vals[0], R.vals[1], R.vals[2])) p.push(`le triangle ${R.vals.join(", ")} n'existe pas`);
  if (new Set(R.vals).size < 3 && R.vals.filter((v) => v === Math.max(...R.vals)).length > 1) p.push("deux plus grands côtés égaux : la réciproque ne désigne pas d'hypoténuse");
  return { p, R };
}

/** L'égalité « XY² = ZW² + UV² » écrite dans le texte, évaluée avec les longueurs. */
function egaliteEcrite(t: string, T: TriangleLu): { vraie: boolean; seule: string } | null {
  const m = t.match(/\b([A-Z]{2})² = ([A-Z]{2})² \+ ([A-Z]{2})²/) ?? t.match(/\b([A-Z]{2})² est-il égal à ([A-Z]{2})² \+ ([A-Z]{2})²/);
  if (!m) return null;
  const [s, a, b] = [m[1], m[2], m[3]].map(cle);
  if (![s, a, b].every((x) => T.L.has(x))) return null;
  return { vraie: proche(carre(T.L.get(s)!), carre(T.L.get(a)!) + carre(T.L.get(b)!)), seule: s };
}

/** L'égalité de Pythagore est-elle vérifiée (triangle nommé) ? */
function corrigerEgaliteTriangle(q: Q): string[] {
  const T = lireTriangle(q.text);
  const { p, R } = verifierTrois(T);
  if (!R) return p;
  const e = egaliteEcrite(q.text, T);
  if (e && e.seule !== R.grand) p.push(`l'égalité écrite isole [${e.seule}], qui n'est pas le plus grand côté [${R.grand}]`);
  const vrai = estRectangle(R.vals);
  return [...p, ...qcmUnique(q, (c) => c === (vrai ? "oui" : "non"))];
}

/** Même question, triangle nommé ou nombres seuls ; « vrai/faux » ou « oui/non ». */
function corrigerEgaliteVraie(q: Q): string[] {
  const T = lireTriangle(q.text);
  const [o, n] = (q.choices ?? []).includes("vrai") ? ["vrai", "faux"] : ["oui", "non"];
  if (T.nom) {
    const { p, R } = verifierTrois(T);
    if (!R) return p;
    const e = egaliteEcrite(q.text, T);
    if (!e) return [...p, "égalité illisible"];
    if (e.seule !== R.grand) p.push(`l'égalité écrite isole [${e.seule}], qui n'est pas le plus grand côté [${R.grand}]`);
    return [...p, ...qcmUnique(q, (c) => c === (e.vraie ? o : n))];
  }
  const s = q.text.match(new RegExp(`${NB}² \\+ ${NB}²`));
  const ns = nombres(q.text).filter((x) => s && x !== num(s[1]) && x !== num(s[2]));
  if (!s || ns.length !== 1) return [`calcul illisible : ${q.text}`];
  const [a, b, c] = [num(s[1]), num(s[2]), ns[0]];
  const p: string[] = [];
  if (!(c > a && c > b)) p.push(`${c} n'est pas le plus grand des trois nombres`);
  return [...p, ...qcmUnique(q, (x) => x === (proche(carre(a) + carre(b), carre(c)) ? o : n))];
}

/** Les deux calculs de la réciproque, un par un. */
function corrigerSommeCarresTriangle(q: Q): string[] {
  const T = lireTriangle(q.text);
  const { p, R } = verifierTrois(T);
  if (!R) return p;
  const tri = R.segs.map((s, i) => ({ s, v: R.vals[i] })).sort((x, y) => x.v - y.v);
  let juste: number;
  const somme = q.text.match(/Calcule ([A-Z]{2})² \+ ([A-Z]{2})²/);
  if (somme) {
    const [a, b] = [cle(somme[1]), cle(somme[2])];
    if ([a, b].includes(R.grand)) p.push("la somme demandée contient le plus grand côté");
    juste = carre(T.L.get(a)!) + carre(T.L.get(b)!);
  } else if (/deux plus petits/.test(q.text)) juste = carre(tri[0].v) + carre(tri[1].v);
  else if (/carré du plus grand côté/.test(q.text)) juste = carre(tri[2].v);
  else {
    const s = q.text.match(/calcule d’abord ([A-Z]{2})²/)?.[1];
    if (!s) return [...p, "calcul demandé illisible"];
    if (cle(s) !== R.grand) p.push(`[${s}] n'est pas le plus grand côté`);
    juste = carre(T.L.get(cle(s))!);
  }
  return [...p, ...verifierReponse(q, juste, "", 1e-4)];
}

/** Le plus grand côté, celui qu'on met seul au carré. */
function corrigerPlusGrand(q: Q): string[] {
  const T = lireTriangle(q.text);
  const { p, R } = verifierTrois(T);
  if (!R) return p;
  return [...p, ...verifierReponse(q, Math.max(...R.vals), [...T.unites][0])];
}

/** « XY² = P et ZW² + UV² = Q : conclusion » : seul le bon calcul, bien conclu, est juste. */
function corrigerVerifierExplique(q: Q): string[] {
  const T = lireTriangle(q.text);
  const { p, R } = verifierTrois(T);
  if (!R) return p;
  const autres = R.segs.filter((s) => s !== R.grand);
  const vrai = estRectangle(R.vals);
  const juste = (c: string) => {
    const m = c.match(new RegExp(`^([A-Z]{2})² = ${NB} et ([A-Z]{2})² \\+ ([A-Z]{2})² = ${NB} : (.+)$`));
    if (!m) return false;
    const [s, P, a, b, S, concl] = [cle(m[1]), num(m[2]), cle(m[3]), cle(m[4]), num(m[5]), m[6]];
    if (s !== R.grand || cle(a + b) !== cle(autres.join("")) || a === b) return false;
    if (!proche(P, carre(T.L.get(s)!), 1e-4) || !proche(S, carre(T.L.get(a)!) + carre(T.L.get(b)!), 1e-4)) return false;
    return vrai ? /sont égaux : l’égalité est vraie/.test(concl) : /sont différents : l’égalité est fausse/.test(concl);
  };
  return [...p, ...qcmUnique(q, juste)];
}

/** Le triangle nommé est-il rectangle ? (figure SANS codage : c'est à prouver) */
function corrigerEstRectangle(q: Q): string[] {
  const T = lireTriangle(q.text);
  const { p, R } = verifierTrois(T);
  if (!R) return p;
  return [
    ...p,
    ...qcmUnique(q, (c) => c === (estRectangle(R.vals) ? "oui" : "non")),
    ...verifierFigure(q, { nom: T.nom, droit: null, L: T.L, echelle: true }),
  ];
}

/** Le sommet de l'angle droit : en face du plus grand côté. */
function sommetOppose(nom: string, seg: string): string {
  return [...nom].find((x) => !seg.includes(x))!;
}

function corrigerSommet(q: Q): string[] {
  const T = lireTriangle(q.text);
  const { p, R } = verifierTrois(T);
  if (!R) return p;
  if (!estRectangle(R.vals)) p.push("le triangle n'est pas rectangle : la question « en quel sommet ? » n'a pas de réponse");
  return [
    ...p,
    ...qcmUnique(q, (c) => c === `en ${sommetOppose(T.nom!, R.grand)}`),
    ...verifierFigure(q, { nom: T.nom, droit: null, L: T.L, echelle: true }),
  ];
}

function corrigerSommetOuNon(q: Q): string[] {
  const T = lireTriangle(q.text);
  const { p, R } = verifierTrois(T);
  if (!R) return p;
  const bon = estRectangle(R.vals) ? `rectangle en ${sommetOppose(T.nom!, R.grand)}` : "il n’est pas rectangle";
  return [...p, ...qcmUnique(q, (c) => c === bon)];
}

/** La réciproque dans une situation : trois mesures, la dernière en face de l'angle à contrôler. */
function corrigerSituationReciproque(q: Q): string[] {
  const ms = mesures(q.text);
  if (ms.length !== 3) return [`trois mesures attendues, lues : ${ms.map((m) => m.v).join(", ")}`];
  const p = verifierMesures(ms);
  const [a, b, c] = ms.map((m) => m.v);
  if (!(c > a && c > b)) p.push(`la longueur en face de l'angle (${c}) n'est pas la plus grande`);
  if (!triangleExiste(a, b, c)) p.push(`le triangle ${a}, ${b}, ${c} n'existe pas`);
  return [...p, ...qcmUnique(q, (x) => x === (estRectangle([a, b, c]) ? "oui" : "non"))];
}

/** La conclusion rédigée : réciproque et bon sommet, ou « n'est pas rectangle : s'il l'était… ». */
function corrigerConclusion(q: Q): string[] {
  const T = lireTriangle(q.text);
  const { p, R } = verifierTrois(T);
  if (!R) return p;
  const vrai = estRectangle(R.vals);
  const V = sommetOppose(T.nom!, R.grand);
  const juste = (c: string) => {
    if (/presque/.test(c)) return false;
    const non = c.match(/^([A-Z]{3}) n’est pas rectangle : s’il l’était, ([A-Z]{2})² serait égal à ([A-Z]{2})² \+ ([A-Z]{2})²\.$/);
    if (non) return !vrai && cle(non[2]) === R.grand && cle(non[3] + non[4]) === cle(R.segs.filter((s) => s !== R.grand).join(""));
    const oui = c.match(/^D’après (la réciproque du|le) théorème de Pythagore, ([A-Z]{3}) est rectangle en ([A-Z])\.$/);
    if (oui) return vrai && oui[1] === "la réciproque du" && oui[3] === V;
    return false;
  };
  return [...p, ...qcmUnique(q, juste)];
}

// ─── Rédiger ────────────────────────────────────────────────────────────────

/** « Quel calcul donne KL² ? » : la valeur du calcul choisi. */
function corrigerCalculEcrit(cherche: "hyp" | "cote") {
  return (q: Q): string[] => {
    const T = lireTriangle(q.text);
    const p = verifierTriangle(T);
    if (!T.hyp) return [...p, "angle droit illisible"];
    let juste: number;
    if (cherche === "hyp") {
      const [a, b] = T.jambes.map((j) => T.L.get(j));
      if (a == null || b == null) return [...p, "côtés de l'angle droit illisibles"];
      if (!new RegExp(`(?:${T.hyp}|${[...T.hyp].reverse().join("")})`).test(q.text.slice(q.text.indexOf(T.droit!) + 1))) p.push("la question ne porte pas sur l'hypoténuse");
      juste = carre(a) + carre(b);
    } else {
      const h = T.L.get(T.hyp);
      const connue = T.jambes.find((j) => T.L.has(j));
      if (h == null || !connue) return [...p, "hypoténuse ou côté connu illisible"];
      juste = carre(h) - carre(T.L.get(connue)!);
    }
    return [...p, ...qcmUnique(q, (c) => /²/.test(c) && proche(evaluer(c), juste, 1e-4))];
  };
}

/** « C² et A² + B² » : le carré du plus grand côté, et la somme des carrés des deux autres. */
function corrigerComparaison(q: Q): string[] {
  const T = lireTriangle(q.text);
  const { p, R } = verifierTrois(T);
  if (!R) return p;
  const tri = [...R.vals].sort((x, y) => x - y);
  const juste = (c: string) => {
    const [g, d] = c.split(" et ");
    if (!g || !d || !/²$/.test(g.trim()) || !new RegExp(`^${NB}² \\+ ${NB}²$`).test(d.trim())) return false;
    return proche(evaluer(g), carre(tri[2]), 1e-4) && proche(evaluer(d), carre(tri[0]) + carre(tri[1]), 1e-4);
  };
  return [...p, ...qcmUnique(q, juste)];
}

/** La phrase de rédaction : théorème pour calculer, réciproque pour prouver, « s'il l'était » sinon. */
function corrigerPhrase(q: Q): string[] {
  const t = q.text;
  const T = lireTriangle(t);
  if (!T.nom) return ["triangle illisible"];
  const parts = t.match(new RegExp(`[Dd]’une part,? ([A-Z]{2})² = ${NB}, d’autre part,? ([A-Z]{2})² \\+ ([A-Z]{2})² = ${NB}`));
  if (parts) {
    const [s, P, a, b, S] = [cle(parts[1]), num(parts[2]), cle(parts[3]), cle(parts[4]), num(parts[5])];
    const p: string[] = [];
    if (cle(s + a + b) !== cle(T.nom + T.nom) || a === b || [a, b].includes(s)) p.push("les trois côtés des deux calculs ne sont pas ceux du triangle");
    const V = sommetOppose(T.nom, s);
    const bon = proche(P, S)
      ? `D’après la réciproque du théorème de Pythagore, le triangle ${T.nom} est rectangle en ${V}.`
      : `Le triangle ${T.nom} n’est pas rectangle : s’il l’était, ces deux nombres seraient égaux.`;
    return [...p, ...qcmUnique(q, (c) => c === bon)];
  }
  if (!T.hyp || !T.droit) return ["angle droit illisible"];
  const cherche = t.match(/[Oo]n (?:veut calculer|cherche) ([A-Z]{2})\b/)?.[1];
  if (!cherche) return ["longueur cherchée illisible"];
  const [j1, j2] = T.jambes;
  if (cle(cherche) === T.hyp) {
    const juste = (c: string) => {
      const m = c.match(/^Dans le triangle ([A-Z]{3}) rectangle en ([A-Z]), d’après le théorème de Pythagore : ([A-Z]{2})² = ([A-Z]{2})² \+ ([A-Z]{2})²\.$/);
      return !!m && m[1] === T.nom && m[2] === T.droit && cle(m[3]) === T.hyp && cle(m[4] + m[5]) === cle(j1 + j2) && cle(m[4]) !== cle(m[5]);
    };
    return qcmUnique(q, juste);
  }
  if (!T.jambes.includes(cle(cherche))) return [`[${cherche}] n'est pas un côté de l'angle droit`];
  const autre = T.jambes.find((j) => j !== cle(cherche))!;
  const juste = (c: string) => {
    const m = c.match(/^([A-Z]{2})² = ([A-Z]{2})² - ([A-Z]{2})²$/);
    return !!m && cle(m[1]) === cle(cherche) && cle(m[2]) === T.hyp && cle(m[3]) === autre;
  };
  return qcmUnique(q, juste);
}

/** La rédaction complète : théorème (pas la réciproque), bonne opération, racine, unité. */
function corrigerRedaction(q: Q): string[] {
  const T = lireTriangle(q.text);
  const p = verifierTriangle(T);
  if (!T.hyp || !T.droit || !T.nom) return [...p, "triangle illisible"];
  const u = [...T.unites][0];
  const hypo = T.L.get(T.hyp);
  const cherche = hypo == null ? T.hyp : T.jambes.find((j) => !T.L.has(j));
  if (!cherche) return [...p, "longueur cherchée illisible"];
  const juste = (c: string) => {
    if (/réciproque/.test(c) || !c.startsWith(`${T.nom} est rectangle en ${T.droit}, donc d’après le théorème de Pythagore, `)) return false;
    const m = c.match(new RegExp(`= ${NB}² ([+-]) ${NB}² = ${NB}, donc ([A-Z]{2}) = √${NB} = ${NB} ${UNITE}\\.$`));
    if (!m) return false;
    const [x, op, y, S, seg, S2, r, uu] = [num(m[1]), m[2], num(m[3]), num(m[4]), cle(m[5]), num(m[6]), num(m[7]), m[8]];
    if (seg !== cherche || uu !== u || !proche(S, S2)) return false;
    if (cherche === T.hyp) {
      const [a, b] = T.jambes.map((j) => T.L.get(j)!);
      if (!(op === "+" && ((proche(x, a) && proche(y, b)) || (proche(x, b) && proche(y, a))))) return false;
    } else {
      const a = T.L.get(T.jambes.find((j) => T.L.has(j))!)!;
      if (op !== "-" || !proche(x, hypo) || !proche(y, a)) return false;
    }
    const vrai = op === "+" ? carre(x) + carre(y) : carre(x) - carre(y);
    return proche(S, vrai, 1e-4) && racineJuste(S) && proche(r, Math.sqrt(S));
  };
  return [...p, ...qcmUnique(q, juste)];
}

// ─── Défis ──────────────────────────────────────────────────────────────────

/** Un dénivelé : deux des trois longueurs, la troisième par Pythagore. */
function corrigerDenivele(q: Q): string[] {
  const t = q.text;
  const h = t.match(new RegExp(`${NB} m plus haut`))?.[1] ?? t.match(new RegExp(`dénivelé de ${NB} m`))?.[1];
  const l = t.match(new RegExp(`écartés de ${NB} m`))?.[1];
  const c = t.match(new RegExp(`distants de ${NB} m en ligne droite`))?.[1];
  const [H, Lh, C] = [h, l, c].map((x) => (x == null ? null : num(x)));
  const connus = [H, Lh, C].filter((x) => x != null).length;
  if (connus !== 2) return [`deux longueurs attendues, lues : dénivelé ${H}, horizontale ${Lh}, ligne droite ${C}`];
  let juste: number;
  if (/longueur du trajet en ligne droite/.test(t)) {
    if (C != null) return ["la longueur en ligne droite est déjà donnée"];
    juste = Math.sqrt(carre(H!) + carre(Lh!));
  } else if (/Quel est le dénivelé/.test(t)) {
    if (H != null) return ["le dénivelé est déjà donné"];
    juste = Math.sqrt(carre(C!) - carre(Lh!));
  } else if (/distance horizontale/.test(t)) {
    if (Lh != null) return ["la distance horizontale est déjà donnée"];
    juste = Math.sqrt(carre(C!) - carre(H!));
  } else return ["question illisible"];
  const p: string[] = [];
  if (!racineJuste(juste * juste)) p.push(`${juste} ne tombe pas juste`);
  return [...p, ...verifierReponse(q, dixieme(juste), "m")];
}

/** Deux triangles : lequel est rectangle ? */
function corrigerLequel(q: Q): string[] {
  const t = q.text;
  const noms = [...new Set([...t.matchAll(/\b([A-Z]{3})\b/g)].map((m) => m[1]))];
  if (noms.length !== 2) return [`deux triangles attendus, lus : ${noms.join(", ")}`];
  const i2 = t.indexOf(noms[1]);
  const T1 = lireTriangle(`triangle ${noms[0]} ${t.slice(0, i2)}`);
  const T2 = lireTriangle(`triangle ${noms[1]} ${t.slice(i2)}`);
  const r: boolean[] = [];
  const p: string[] = [];
  for (const T of [T1, T2]) {
    const v = verifierTrois(T);
    p.push(...v.p.map((x) => `${T.nom} : ${x}`));
    if (!v.R) return p;
    r.push(estRectangle(v.R.vals));
  }
  const bon = r[0] && r[1] ? "les deux" : r[0] ? `le triangle ${noms[0]}` : r[1] ? `le triangle ${noms[1]}` : "aucun";
  return [...p, ...qcmUnique(q, (c) => c === bon)];
}

/** Périmètre, raccourci, aller-retour : l'hypoténuse puis une somme ou une différence. */
function corrigerDeuxEtapes(q: Q): string[] {
  const t = q.text;
  const ms = mesures(t);
  if (ms.length !== 2) return [`deux mesures attendues, lues : ${ms.map((m) => m.v).join(", ")}`];
  const p = verifierMesures(ms);
  const [a, b] = ms.map((m) => m.v);
  const u = ms[0].u;
  const c = Math.sqrt(carre(a) + carre(b));
  if (!racineJuste(c * c)) p.push(`l'hypoténuse √${carre(a) + carre(b)} ne tombe pas juste`);
  const gain = /de plus|économiser|gagne/.test(t);
  // Plausibilité : un parc ou un champ fait plus de 10 m de côté, un panneau plus de 20 cm, une piscine plus de 5 m.
  const mini = /\b(?:parc|champ|place) rectangulaire/.test(t) ? 10 : /panneau/.test(t) ? 20 : /piscine/.test(t) ? 5 : /voile/.test(t) ? 10 : 0;
  if (Math.min(a, b) < mini) p.push(`côté de ${Math.min(a, b)} ${u} : invraisemblable ici`);
  if (proche(a, b) && /rectangulaire|piscine/.test(t)) p.push(`un rectangle de ${a} sur ${b} est un carré`);
  return [...p, ...verifierReponse(q, gain ? a + b - c : a + b + c, u, 1e-4)];
}

/** La diagonale d'un rectangle ou d'un carré nommé. */
function corrigerDiagonale(q: Q): string[] {
  const t = q.text;
  const p: string[] = [];
  const ms = mesures(t);
  const R = t.match(/\b(?:rectangle|carré) ([A-Z]{4})\b/)?.[1];
  const diag = t.match(/\[([A-Z]{2})\]|longueur ([A-Z]{2})\b/);
  if (R && diag) {
    const d = diag[1] ?? diag[2];
    const [i, j] = [R.indexOf(d[0]), R.indexOf(d[1])];
    if (i < 0 || j < 0 || Math.abs(i - j) !== 2) p.push(`[${d}] n'est pas une diagonale de ${R}`);
    for (const m of t.matchAll(/\b([A-Z]{2}) = /g)) {
      const [x, y] = [R.indexOf(m[1][0]), R.indexOf(m[1][1])];
      if (x < 0 || y < 0 || ![1, 3].includes(Math.abs(x - y))) p.push(`[${m[1]}] n'est pas un côté de ${R}`);
    }
  }
  let S: number;
  if (/carré/.test(t)) {
    if (ms.length !== 1) return [`une mesure attendue pour le carré, lues : ${ms.length}`];
    S = 2 * carre(ms[0].v);
  } else {
    if (ms.length !== 2) return [`deux mesures attendues, lues : ${ms.length}`];
    if (proche(ms[0].v, ms[1].v)) p.push("un rectangle aux deux côtés égaux est un carré");
    S = carre(ms[0].v) + carre(ms[1].v);
  }
  p.push(...verifierMesures(ms));
  if (!racineJuste(S) && !/dixième/.test(t)) p.push(`√${S} ne tombe pas juste et aucun arrondi n'est demandé`);
  return [...p, ...verifierReponse(q, racineJuste(S) ? Math.sqrt(S) : dixieme(Math.sqrt(S)), ms[0].u)];
}

/** Deux trajets perpendiculaires : la distance à vol d'oiseau. */
function corrigerDeplacement(q: Q): string[] {
  const t = q.text;
  const dirs = [...t.matchAll(/vers (?:l’|le )(est|ouest|nord|sud)/g)].map((m) => m[1]);
  const p: string[] = [];
  if (dirs.length !== 2) p.push(`deux directions attendues, lues : ${dirs.join(", ")}`);
  else if (["est", "ouest"].includes(dirs[0]) === ["est", "ouest"].includes(dirs[1])) p.push(`${dirs[0]} et ${dirs[1]} ne sont pas perpendiculaires`);
  const ms = mesures(t);
  if (ms.length !== 2) return [...p, `deux mesures attendues, lues : ${ms.length}`];
  p.push(...verifierMesures(ms));
  const S = carre(ms[0].v) + carre(ms[1].v);
  if (!racineJuste(S) && !/dixième/.test(t)) p.push(`√${S} ne tombe pas juste et aucun arrondi n'est demandé`);
  return [...p, ...verifierReponse(q, racineJuste(S) ? Math.sqrt(S) : dixieme(Math.sqrt(S)), ms[0].u)];
}

/** Théorème ou réciproque ? Selon ce qu'on sait (l'angle droit) et ce qu'on cherche. */
function corrigerQuellePropriete(q: Q): string[] {
  const t = q.text;
  const T = lireTriangle(t);
  const p: string[] = [];
  const angleConnu = /On sait que le triangle [A-Z]{3} est rectangle en [A-Z]/.test(t);
  if (angleConnu) {
    if (!T.hyp || T.jambes.some((j) => !T.L.has(j))) p.push("les deux côtés de l'angle droit ne sont pas donnés");
    return [...p, ...qcmUnique(q, (c) => c === "le théorème de Pythagore")];
  }
  const { p: pp, R } = verifierTrois(T);
  p.push(...pp);
  if (R && /est rectangle\. »/.test(t) && !estRectangle(R.vals)) p.push("l'élève conclut « rectangle » sur un triangle qui ne l'est pas : sa seule faute n'est plus la propriété");
  return [...p, ...qcmUnique(q, (c) => c === "la réciproque du théorème de Pythagore")];
}

export const CORRECTEURS: CorrecteursMaths = avecRegleMotsCles({
  // Carrés et racines
  pythagore_theoreme_carre_racine_tpl_2: corrigerCarreRacine,
  pythagore_theoreme_carre_racine_tpl_6: corrigerCarreRacine,
  pythagore_theoreme_carre_racine_tpl_4: corrigerCarreRacine,
  pythagore_theoreme_carre_racine_tpl_3: corrigerDeuxCarres(1),
  pythagore_theoreme_carre_racine_tpl_5: corrigerDeuxCarres(-1),
  // Reconnaître
  pythagore_theoreme_reconnaitre_tpl_1: corrigerReconnaitreFigure,
  pythagore_theoreme_reconnaitre_tpl_2: corrigerPeutOn,
  pythagore_theoreme_reconnaitre_tpl_3: corrigerReconnaitreFigure,
  pythagore_theoreme_reconnaitre_tpl_4: corrigerReconnaitreTexte,
  // Hypoténuse
  pythagore_theoreme_calculer_hypotenuse_tpl_1: corrigerHypNomme,
  pythagore_theoreme_calculer_hypotenuse_tpl_4: corrigerHypCarre,
  pythagore_theoreme_calculer_hypotenuse_tpl_2: corrigerSituation("hyp"),
  pythagore_theoreme_calculer_hypotenuse_tpl_3: corrigerSituation("hyp"),
  pythagore_theoreme_calculer_hypotenuse_open_1: corrigerExpliqueNomme("hyp"),
  // Côté de l'angle droit
  pythagore_theoreme_calculer_cote_tpl_1: corrigerCoteNomme,
  pythagore_theoreme_calculer_cote_tpl_5: corrigerCoteNomme,
  pythagore_theoreme_calculer_cote_tpl_4: corrigerCoteCarre,
  pythagore_theoreme_calculer_cote_tpl_2: corrigerSituation("cote"),
  pythagore_theoreme_calculer_cote_tpl_3: corrigerSituation("cote"),
  pythagore_theoreme_calculer_cote_open_1: corrigerExpliqueNomme("cote"),
  // Réciproque : vérifier
  pythagore_theoreme_reciproque_verifier_tpl_1: corrigerEgaliteTriangle,
  pythagore_theoreme_reciproque_verifier_tpl_4: corrigerEgaliteVraie,
  pythagore_theoreme_reciproque_verifier_tpl_2: corrigerSommeCarresTriangle,
  pythagore_theoreme_reciproque_verifier_tpl_3: corrigerPlusGrand,
  pythagore_theoreme_reciproque_verifier_open_1: corrigerVerifierExplique,
  // Réciproque : conclure
  pythagore_theoreme_reciproque_conclure_tpl_1: corrigerEstRectangle,
  pythagore_theoreme_reciproque_conclure_tpl_2: corrigerSommet,
  pythagore_theoreme_reciproque_conclure_tpl_3: corrigerSituationReciproque,
  pythagore_theoreme_reciproque_conclure_tpl_3b: corrigerSommetOuNon,
  pythagore_theoreme_reciproque_conclure_open_1: corrigerConclusion,
  // Rédiger
  pythagore_theoreme_rediger_tpl_1: corrigerCalculEcrit("hyp"),
  pythagore_theoreme_rediger_tpl_3: corrigerCalculEcrit("cote"),
  pythagore_theoreme_rediger_tpl_2: corrigerComparaison,
  pythagore_theoreme_rediger_tpl_5: corrigerPhrase,
  pythagore_theoreme_rediger_tpl_4: corrigerRedaction,
  // Défis
  pythagore_theoreme_defi_tpl_1: corrigerDenivele,
  pythagore_theoreme_defi_tpl_2: corrigerLequel,
  pythagore_theoreme_defi_tpl_3: corrigerDeuxEtapes,
  pythagore_theoreme_defi_tpl_5: corrigerDiagonale,
  pythagore_theoreme_defi_tpl_4: corrigerDeplacement,
  pythagore_theoreme_defi_open_1: corrigerQuellePropriete,
});
