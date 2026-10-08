import type { CorrecteursMaths } from "./types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { avecRegleMotsCles, qcmUnique } from "@/lib/tutor-v4/questionBank/6e/maths/correcteurs/pourcentages";
import { plat, NB, num, egal, mesures, lireReponse, EN_M } from "./perimetres";

// LES CORRECTEURS DE aires.bank.ts (notion aire_surface, 08/10/2026).
// Ils relisent les MESURES et les UNITÉS du texte (LaTeX compris) et de la figure
// (côtés, hauteur, quadrillage, rayon — et la figure doit être À L'ÉCHELLE),
// puis refont le calcul : rectangle, carré, triangle (½ base × hauteur, jamais
// le côté oblique), parallélogramme, disque (π), figures composées, conversions
// d'unités d'aire (cm², m², ares, ha, km²), problèmes de coût et de quantités.
// L'unité imposée par l'énoncé (« en cm² ») doit être dans `expected`. Vide = juste.

type Q = TutorGeneratedQuestionV4;

const AIRE = "mm²|cm²|dm²|m²|km²|ha|ares|unités²";
const LONG = "km|dm|cm|mm|m";
/** Une aire en m² pour chaque unité. */
const EN_M2: Record<string, number> = { "mm²": 1e-6, "cm²": 1e-4, "dm²": 1e-2, "m²": 1, ares: 100, are: 100, ha: 1e4, "km²": 1e6 };

/** L'unité imposée par l'énoncé (« en cm² », « Combien d’ares », « … m² »), ou null. */
function uniteImposee(t: string): string | null {
  const ms = [...t.matchAll(/(?:(?:\ben|\(en|[Cc]ombien de|nombre de|…) |[Cc]ombien d’|nombre d’)(mm²|cm²|dm²|m²|km²|ha|ares|unités²|unités|mm|cm|dm|m|km|€|euros|grammes|litres|kWh)(?![\p{L}²³])/gu)];
  return ms.length ? SYMBOLE[ms[ms.length - 1][1]] ?? ms[ms.length - 1][1] : null;
}
const SYMBOLE: Record<string, string> = { euros: "€", grammes: "g", litres: "L" };
const MOT: Record<string, string> = { "€": "euros", g: "grammes", L: "litres" };

const deuxDecimales = (x: number) => egal(Math.round(x * 100) / 100, x);

/**
 * La réponse attendue vaut `v`, exprimée dans l'unité `u` du calcul. Si l'énoncé
 * impose une unité, elle doit être `u` et figurer dans `expected` ; sinon la
 * réponse est un nombre nu (ou porte `u`).
 */
function verifier(q: Q, v: number, u: string, autres: number[] = []): string[] {
  const p: string[] = [];
  const t = plat(q.text);
  const imp = uniteImposee(t);
  const r = lireReponse(q.expected[0]);
  if (!egal(r.v, v)) p.push(`attendu « ${q.expected[0]} », recalculé ${v} ${u}`);
  if (imp && u && imp !== u) p.push(`l'énoncé demande des ${imp}, le calcul donne des ${u}`);
  if (imp && r.u !== imp) p.push(`l'énoncé impose « ${imp} » : il manque dans la réponse « ${q.expected[0]} »`);
  if (!imp && r.u && r.u !== u) p.push(`unité « ${r.u} » au lieu de « ${u} »`);
  if (!deuxDecimales(v)) p.push(`${v} : plus de deux chiffres après la virgule`);
  for (const e of q.expected) {
    const x = lireReponse(e);
    if (![v, ...autres].some((w) => egal(x.v, w)) || (x.u !== r.u && x.u !== MOT[r.u])) p.push(`écriture acceptée « ${e} » ≠ ${v} ${r.u}`);
    if (/\d\.\d/.test(e)) p.push(`point décimal anglais dans « ${e} »`);
  }
  return p;
}

/** Valeur d'une aire convertie : `v` (unité `de`) dans l'unité `vers`. */
const convertir = (v: number, de: string, vers: string) => (v * EN_M2[de]) / EN_M2[vers];

/** L'unité d'aire de la réponse : celle imposée, sinon le carré de l'unité de longueur. */
const uAire = (t: string, uLong: string) => uniteImposee(t) ?? `${uLong}²`;

/** Aire calculée en (uLong)², rendue dans l'unité imposée. */
function verifierAire(q: Q, aire: number, uLong: string): string[] {
  const t = plat(q.text);
  const u = uAire(t, uLong);
  if (!(u in EN_M2)) return [`unité d'aire demandée illisible : ${u}`];
  return verifier(q, convertir(aire, `${uLong}²`, u), u);
}

// ─── Figures (canvas) ──────────────────────────────────────────────────────

type Pt = { x: number; y: number };
const dist = (a: Pt, b: Pt) => Math.hypot(a.x - b.x, a.y - b.y);
const mesureDe = (s?: string) => (s ? mesures(plat(s), LONG)[0] : undefined);

/** Une longueur dessinée correspond-elle à sa mesure, à l'échelle d'une autre ? (5 % près) */
function aLEchelle(px1: number, v1: number, px2: number, v2: number, quoi: string): string[] {
  return Math.abs(px1 / v1 - px2 / v2) <= 0.05 * (px1 / v1) ? [] : [`la figure n'est pas à l'échelle (${quoi})`];
}

/** Un rectangle ou carré dessiné : ses mesures (AB, BC) et la vérification de l'échelle. */
function lireRectFigure(q: Q): { L: number; l: number; u: string; pb: string[] } | null {
  const c = q.canvas as { kind?: string; points?: Record<string, Pt>; sideLabels?: Record<string, string> } | undefined;
  if (c?.kind !== "quadrilatere" || !c.points || !c.sideLabels?.AB) return null;
  const ab = mesureDe(c.sideLabels.AB)!;
  const bc = mesureDe(c.sideLabels.BC) ?? ab;
  const { A, B, C } = c.points;
  const pb: string[] = [];
  // Au-delà d'un rapport 3, le dessin est volontairement tassé (lisible à 375 px).
  const r = Math.max(ab.v, bc.v) / Math.min(ab.v, bc.v);
  if (r <= 3) pb.push(...aLEchelle(dist(A, B), ab.v, dist(B, C), bc.v, "rectangle"));
  return { L: ab.v, l: bc.v, u: ab.u, pb };
}

// ─── aire_comprendre ────────────────────────────────────────────────────────

/** Quadrillage : l'AIRE (cases) ou le PÉRIMÈTRE (côtés de case du bord). */
function corrigerGrille(q: Q): string[] {
  const cells = (q.canvas as { grid?: { filledCells?: [number, number][] } } | undefined)?.grid?.filledCells;
  if (!cells?.length) return ["pas de quadrillage"];
  const t = plat(q.text);
  const plein = new Set(cells.map(([r, c]) => `${r},${c}`));
  let bord = 0;
  for (const [r, c] of cells) for (const [dr, dc] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) if (!plein.has(`${r + dr},${c + dc}`)) bord++;
  const peri = /PÉRIMÈTRE|périmètre|le tour|exactement le tour/.test(t);
  return peri ? verifier(q, bord, "unités") : verifier(q, cells.length, "unités²");
}

// Table propre au correcteur : ce qu'on suit le long du bord, ce qu'on recouvre.
const BORD = /autour|tour d|bord|clôture|plinthes|frise|entourer/;
const SURFACE = /semer|moquette|peindre|carreler|couvrir|recouvrir|panneaux|toile|vernir|paillis|papier peint|bâcher/;

function corrigerSituation(q: Q): string[] {
  const t = plat(q.text).toLowerCase();
  const juste = BORD.test(t) ? "le périmètre" : SURFACE.test(t) ? "l’aire" : null;
  if (!juste) return [`situation non reconnue : ${q.text}`];
  return [...(q.expected[0] === juste ? [] : [`attendu « ${q.expected[0]} », il faut ${juste}`]), ...qcmUnique(q, (c) => c === juste)];
}

// Table propre au correcteur : l'unité d'aire qui donne un nombre raisonnable.
const UNITE_SURFACE: [RegExp, string][] = [
  [/puce électronique|capteur/, "mm²"],
  [/écran d’un téléphone|feuille de cahier|timbre|carte bancaire|touche de clavier/, "cm²"],
  [/salle de classe|terrain de football|pelouse|appartement|mur à peindre/, "m²"],
  [/forêt|champ de blé|vigne/, "ha"],
  [/pays|Corse|grand lac|parc national|grande ville/, "km²"],
];

function corrigerUniteAdaptee(q: Q): string[] {
  const t = plat(q.text);
  const u = UNITE_SURFACE.find(([re]) => re.test(t))?.[1];
  if (!u) return [`objet non reconnu : ${t}`];
  return [...(q.expected[0] === u ? [] : [`attendu « ${q.expected[0]} », il faut ${u}`]), ...qcmUnique(q, (c) => c === u)];
}

/** Conversion d'unités d'aire : la valeur de départ et l'unité d'arrivée lues dans le texte. */
function corrigerConversion(q: Q): string[] {
  const t = plat(q.text);
  const ms = mesures(t, AIRE.replace("|unités²", ""));
  const vers = uniteImposee(t);
  if (ms.length !== 1 || !vers) return [`une aire et une unité d'arrivée attendues (lues : ${ms.map((m) => m.v + " " + m.u).join(", ")} ; ${vers})`];
  if (ms[0].u === vers) return ["conversion vers la même unité"];
  return verifier(q, convertir(ms[0].v, ms[0].u, vers), vers);
}

/** Deux rectangles de même périmètre : lequel a la plus grande aire (QCM). */
function corrigerMemePerimetre(q: Q): string[] {
  const t = plat(q.text);
  const ms = mesures(t, LONG);
  let dims = ms;
  let P: number | null = null;
  if (ms.length === 5) {
    const i = /MÊME périmètre, \d/.test(t) ? 0 : 4;
    P = ms[i].v;
    dims = ms.filter((_, j) => j !== i);
  }
  if (dims.length !== 4) return [`quatre dimensions attendues, lues : ${ms.map((m) => m.v).join(", ")}`];
  const [x1, y1, x2, y2] = dims.map((m) => m.v);
  const p: string[] = [];
  if (!egal(x1 + y1, x2 + y2)) p.push("les deux rectangles n'ont pas le même périmètre");
  if (P != null && !egal(P, 2 * (x1 + y1))) p.push(`périmètre annoncé ${P}, il vaut ${2 * (x1 + y1)}`);
  const a1 = x1 * y1, a2 = x2 * y2;
  const juste = (c: string) => (egal(a1, a2) ? /même aire/.test(c) : a1 > a2 ? /^(le premier|la première)/.test(c) : /^(le second|la seconde)/.test(c));
  if (!juste(q.expected[0])) p.push(`attendu « ${q.expected[0]} », aires ${a1} et ${a2}`);
  p.push(...qcmUnique(q, juste));
  const rows = (q.canvas as { rows?: { values: string[] }[] } | undefined)?.rows;
  if (rows && (!egal(num(rows[0].values[2]), a1) || !egal(num(rows[1].values[2]), a2))) p.push("le tableau ne donne pas les bonnes aires");
  return p;
}

/** Longueurs × k : aire × k² (QCM). */
function corrigerAgrandissement(q: Q): string[] {
  const t = plat(q.text);
  const k = Number(t.match(/par (\d+)|(\d+) fois plus grand/)?.slice(1).find(Boolean));
  if (!k) return ["coefficient illisible"];
  const juste = (c: string) => num(plat(c)) === k * k;
  return [...(juste(q.expected[0]) ? [] : [`attendu « ${q.expected[0]} », l'aire est multipliée par ${k * k}`]), ...qcmUnique(q, juste)];
}

// ─── aire_rectangle ─────────────────────────────────────────────────────────

/** Rectangle : dimensions dans le texte (même unité) ou sur la figure. */
function corrigerRectangle(q: Q): string[] {
  const t = plat(q.text);
  const ms = mesures(t, LONG);
  const fig = lireRectFigure(q);
  if (ms.length === 2) {
    if (ms[0].u !== ms[1].u) return ["unités mêlées : voir le gabarit à conversion"];
    return verifierAire(q, ms[0].v * ms[1].v, ms[0].u);
  }
  if (ms.length === 0 && fig) return [...fig.pb, ...verifierAire(q, fig.L * fig.l, fig.u)];
  return [`deux dimensions attendues, lues : ${ms.map((m) => m.v + " " + m.u).join(", ")}`];
}

/** Rectangle en m et cm mêlés, ou décimal : on convertit avant de multiplier. */
function corrigerRectMixte(q: Q): string[] {
  const t = plat(q.text);
  const ms = mesures(t, LONG);
  if (ms.length !== 2) return ["deux dimensions attendues"];
  const aireM2 = ms[0].v * EN_M[ms[0].u] * ms[1].v * EN_M[ms[1].u];
  const u = uniteImposee(t);
  if (!u || !(u in EN_M2)) return ["unité d'aire demandée illisible"];
  return verifier(q, aireM2 / EN_M2[u], u);
}

/** Aire et une dimension : l'autre dimension. */
function corrigerRectInverse(q: Q): string[] {
  const t = plat(q.text);
  const a = mesures(t, AIRE)[0];
  const l = mesures(t, LONG);
  if (!a || l.length !== 1 || a.u !== `${l[0].u}²`) return ["aire et dimension illisibles"];
  const res = a.v / l[0].v;
  const p: string[] = [];
  const cherche = t.match(/(largeur|longueur)(?: en| ,|,| \?|\.)/g)?.pop() ?? "";
  if (/largeur/.test(cherche) && res > l[0].v) p.push("la largeur trouvée dépasse la longueur");
  if (/longueur/.test(cherche) && res < l[0].v) p.push("la longueur trouvée est plus petite que la largeur");
  return [...p, ...verifier(q, res, l[0].u)];
}

// ─── aire_carre ─────────────────────────────────────────────────────────────

/** Carré : côté dans le texte, sur la figure, ou déduit du périmètre. */
function corrigerCarre(q: Q): string[] {
  const t = plat(q.text);
  const ms = mesures(t, LONG);
  const fig = lireRectFigure(q);
  if (fig && !egal(fig.L, fig.l)) return ["la figure n'est pas un carré"];
  let c: number, u: string;
  if (ms.length === 1) {
    [c, u] = /périmètre|tour/.test(t) ? [ms[0].v / 4, ms[0].u] : [ms[0].v, ms[0].u];
    if (fig && !egal(fig.L, c)) return ["la figure ne porte pas le côté du texte"];
  } else if (ms.length === 0 && fig) [c, u] = [fig.L, fig.u];
  else return [`un côté attendu, lus : ${ms.map((m) => m.v + " " + m.u).join(", ")}`];
  return [...(fig?.pb ?? []), ...verifierAire(q, c * c, u)];
}

/** Aire d'un carré : son côté, ou son périmètre. */
function corrigerCarreInverse(q: Q): string[] {
  const t = plat(q.text);
  const a = mesures(t, AIRE)[0];
  if (!a) return ["aire illisible"];
  const u = a.u.replace("²", "");
  const c = Math.sqrt(a.v);
  if (!Number.isInteger(Math.round(c * 1000) / 1000) && !deuxDecimales(c)) return [`${a.v} n'est pas un carré simple`];
  return verifier(q, /périmètre|bordure/.test(t) ? 4 * c : c, u);
}

/** Problèmes de carré : coût au m², nombre de dalles, côté décimal. */
function corrigerCarreProbleme(q: Q): string[] {
  const t = plat(q.text);
  const ms = mesures(t, LONG);
  const prix = t.match(new RegExp(`${NB} € (?:le|par) m²`));
  if (prix) {
    if (ms.length !== 1 || ms[0].u !== "m") return ["côté illisible"];
    return verifier(q, ms[0].v * ms[0].v * num(prix[1]), uniteImposee(t) ?? "€");
  }
  if (/dalles/.test(t)) {
    const piece = ms.find((m) => m.u === "m");
    const dalle = ms.find((m) => m.u === "cm");
    if (!piece || !dalle) return ["côtés illisibles"];
    const parCote = (piece.v * 100) / dalle.v;
    if (!Number.isInteger(parCote)) return [`${piece.v} m ne se découpe pas en dalles de ${dalle.v} cm`];
    return verifier(q, parCote * parCote, "");
  }
  return corrigerCarre(q);
}

// ─── aire_triangle ──────────────────────────────────────────────────────────

type TriFig = { kind?: string; points?: Record<"A" | "B" | "C", Pt>; sideLabels?: Record<string, string>; height?: { label: string }; marks?: { rightAngleAt?: "A" | "B" } };

/** Triangle dessiné : base AB et hauteur (tracée, ou côté de l'angle droit), avec contrôle de l'échelle. */
function lireTriFigure(q: Q): { b: number; h: number; u: string; pb: string[] } | null {
  const c = q.canvas as TriFig | undefined;
  if (c?.kind !== "triangle" || !c.points || !c.sideLabels?.AB) return null;
  const { A, B, C } = c.points;
  const base = mesureDe(c.sideLabels.AB)!;
  const pb: string[] = [];
  let h: number;
  if (c.marks?.rightAngleAt) {
    const droit = c.marks.rightAngleAt;
    const jambe = mesureDe(droit === "A" ? c.sideLabels.CA : c.sideLabels.BC);
    if (!jambe) return null;
    h = jambe.v;
    const hyp = mesureDe(droit === "A" ? c.sideLabels.BC : c.sideLabels.CA);
    if (hyp && !egal(hyp.v * hyp.v, base.v * base.v + h * h)) pb.push(`hypoténuse ${hyp.v} fausse pour ${base.v} et ${h}`);
    pb.push(...aLEchelle(dist(A, B), base.v, dist(droit === "A" ? A : B, C), h, "triangle rectangle"));
  } else {
    const hm = mesureDe(c.height?.label);
    if (!hm) return null;
    h = hm.v;
    pb.push(...aLEchelle(dist(A, B), base.v, Math.abs(C.y - A.y), h, "hauteur"));
    const ob = mesureDe(c.sideLabels.CA);
    if (ob) pb.push(...aLEchelle(dist(A, B), base.v, dist(C, A), ob.v, "côté oblique"));
    if (ob && ob.v <= h) pb.push("le côté oblique n'est pas plus long que la hauteur");
  }
  return { b: base.v, h, u: base.u, pb };
}

/** Triangle : ½ × base × hauteur, données du texte ou de la figure. */
function corrigerTriangle(q: Q): string[] {
  const t = plat(q.text);
  const fig = lireTriFigure(q);
  const ms = mesures(t, LONG);
  if (fig) {
    if (ms.length === 2 && (!egal(ms[0].v, fig.b) || !egal(ms[1].v, fig.h))) return ["le texte et la figure ne donnent pas les mêmes mesures"];
    return [...fig.pb, ...verifierAire(q, (fig.b * fig.h) / 2, fig.u)];
  }
  // « 9 m de base » d'abord ; sinon le premier nombre après le mot, dans la même phrase.
  const lire = (mot: string) =>
    t.match(new RegExp(`${NB} (${LONG}) de ${mot}`, "u")) ?? t.match(new RegExp(`${mot}[^\\d.]*?${NB} (${LONG})(?![\\p{L}²])`, "u"));
  const b = lire("base");
  const h = lire("hauteur");
  if (!b || !h || b[2] !== h[2]) return ["base ou hauteur illisibles"];
  return verifierAire(q, (num(b[1]) * num(h[1])) / 2, b[2]);
}

/** Triangle rectangle décrit : les côtés de l'angle droit (pas l'hypoténuse). */
function corrigerTriRectangle(q: Q): string[] {
  const fig = lireTriFigure(q);
  if (fig) return [...fig.pb, ...verifierAire(q, (fig.b * fig.h) / 2, fig.u)];
  const ms = mesures(plat(q.text), LONG);
  if (ms.length !== 3) return ["trois côtés attendus"];
  const v = ms.map((m) => m.v).sort((x, y) => x - y);
  if (!egal(v[0] * v[0] + v[1] * v[1], v[2] * v[2])) return [`${v.join(", ")} : pas un triangle rectangle`];
  return verifierAire(q, (v[0] * v[1]) / 2, ms[0].u);
}

/** Hauteur extérieure : le pied de la hauteur hors de [AB] (figure). */
function corrigerHauteurExterieure(q: Q): string[] {
  const fig = lireTriFigure(q);
  if (!fig) return ["figure illisible"];
  const C = (q.canvas as TriFig).points!.C;
  const A = (q.canvas as TriFig).points!.A;
  const B = (q.canvas as TriFig).points!.B;
  const p = C.x < Math.min(A.x, B.x) || C.x > Math.max(A.x, B.x) ? [] : ["le pied de la hauteur tombe sur [AB]"];
  return [...p, ...fig.pb, ...verifierAire(q, (fig.b * fig.h) / 2, fig.u)];
}

/** L'aire annoncée par un élève est-elle juste ? (QCM oui / non) */
function corrigerTriErreur(q: Q): string[] {
  const t = plat(q.text);
  const lire = (re: string) => t.match(new RegExp(`${re} ${NB} (${LONG})(?![\\p{L}²])`));
  const b = lire("(?:base de|[Bb]ase)");
  const h = lire("(?:hauteur de|hauteur)");
  const s = lire("(?:oblique mesure|oblique de|oblique)");
  const a = mesures(t, AIRE)[0];
  if (!b || !h || !s || !a) return ["base, hauteur, côté oblique ou aire annoncée illisibles"];
  const [bv, hv, sv] = [num(b[1]), num(h[1]), num(s[1])];
  if (sv <= hv) return ["le côté oblique devrait être plus long que la hauteur"];
  if (/Vrai/.test(t)) return ["« Vrai ? » appelle vrai / faux, pas oui / non"];
  const juste = egal(a.v, (bv * hv) / 2) && a.u === `${b[2]}²` ? "oui" : "non";
  return [...(q.expected[0] === juste ? [] : [`attendu « ${q.expected[0]} », l'aire vaut ${(bv * hv) / 2}`]), ...qcmUnique(q, (c) => c === juste)];
}

/** Aire et base (ou hauteur) : l'autre, 2 × aire ÷ connue. */
function corrigerTriInverse(q: Q): string[] {
  const t = plat(q.text);
  const a = mesures(t, AIRE)[0];
  const l = mesures(t, LONG);
  if (!a || l.length !== 1 || a.u !== `${l[0].u}²`) return ["aire et longueur illisibles"];
  return verifier(q, (2 * a.v) / l[0].v, l[0].u);
}

// ─── aire_parallelogramme ───────────────────────────────────────────────────

/** « 9 m de base » ou « base … 9 m » (premier nombre après le mot, dans la phrase). */
function lireMot(t: string, mot: string): { v: number; u: string } | null {
  const m = t.match(new RegExp(`${NB} (${LONG}) de ${mot}`, "u")) ?? t.match(new RegExp(`${mot}[^\\d.;]*?${NB} (${LONG})(?![\\p{L}²])`, "u"));
  return m ? { v: num(m[1]), u: m[2] } : null;
}

/** Parallélogramme dessiné : base AB, hauteur tracée, côté oblique DA (à l'échelle). */
function lireParaFigure(q: Q): { b: number; h: number; u: string; pb: string[] } | null {
  const c = q.canvas as { kind?: string; points?: Record<string, Pt>; sideLabels?: Record<string, string>; height?: { label: string } } | undefined;
  if (c?.kind !== "quadrilatere" || !c.height || !c.points) return null;
  const b = mesureDe(c.sideLabels?.AB);
  const h = mesureDe(c.height.label);
  if (!b || !h) return null;
  const { A, B, D } = c.points;
  const pb = aLEchelle(dist(A, B), b.v, Math.abs(D.y - A.y), h.v, "hauteur");
  const ob = mesureDe(c.sideLabels?.DA);
  if (ob) {
    pb.push(...aLEchelle(dist(A, B), b.v, dist(A, D), ob.v, "côté oblique"));
    if (ob.v <= h.v) pb.push("le côté oblique n'est pas plus long que la hauteur");
  }
  return { b: b.v, h: h.v, u: b.u, pb };
}

/** Parallélogramme : un côté × la hauteur RELATIVE À CE CÔTÉ (jamais le côté penché). */
function corrigerPara(q: Q): string[] {
  const t = plat(q.text);
  const rel = t.match(new RegExp(`(?:relative au|tombant sur le) côté de ${NB} (${LONG})[^\\d]*?${NB} (${LONG})`, "u"));
  if (rel) {
    const cote = num(rel[1]);
    const h = num(rel[3]);
    const cotes = mesures(t.slice(0, rel.index), LONG).map((m) => m.v);
    const autre = cotes.find((x) => !egal(x, cote));
    const p: string[] = [];
    if (!cotes.some((x) => egal(x, cote))) p.push("la hauteur est relative à un côté qui n'existe pas");
    if (autre != null && h >= autre) p.push(`hauteur ${h} ≥ autre côté ${autre} : impossible`);
    return [...p, ...verifierAire(q, cote * h, rel[2])];
  }
  const fig = lireParaFigure(q);
  const b = lireMot(t, "base");
  const h = lireMot(t, "hauteur");
  if (b && h) {
    const ob = lireMot(t, "(?:côté penché|côté oblique|côtés obliques)");
    const p = ob && ob.v <= h.v ? ["le côté penché n'est pas plus long que la hauteur"] : [];
    if (fig && (!egal(fig.b, b.v) || !egal(fig.h, h.v))) p.push("le texte et la figure diffèrent");
    return [...p, ...(fig?.pb ?? []), ...verifierAire(q, b.v * h.v, b.u)];
  }
  if (fig) return [...fig.pb, ...verifierAire(q, fig.b * fig.h, fig.u)];
  return ["base et hauteur illisibles"];
}

/** Aire et base (ou hauteur) : l'autre, aire ÷ connue. */
function corrigerParaInverse(q: Q): string[] {
  const t = plat(q.text);
  const a = mesures(t, AIRE)[0];
  const l = mesures(t, LONG);
  if (!a || l.length !== 1 || a.u !== `${l[0].u}²`) return ["aire et longueur illisibles"];
  return verifier(q, a.v / l[0].v, l[0].u);
}

// ─── aire_figure ────────────────────────────────────────────────────────────

/** Les cases coloriées de la figure sur quadrillage. */
const cases = (q: Q) => (q.canvas as { grid?: { filledCells?: [number, number][] } } | undefined)?.grid?.filledCells ?? [];

/** Quadrillage à carreaux unité (1 unité², 1 cm de côté, ou 1 m²) : le nombre de carreaux. */
function corrigerGrilleSimple(q: Q): string[] {
  const n = cases(q).length;
  if (!n) return ["pas de quadrillage"];
  const t = plat(q.text);
  const u = /1 cm de côté/.test(t) ? "cm²" : /représente 1 m²/.test(t) ? "m²" : /1 unité²/.test(t) ? "unités²" : null;
  if (!u) return ["taille d'un carreau illisible"];
  return verifier(q, n, u);
}

/** Quadrillage à l'échelle : n carreaux × c². */
function corrigerGrilleEchelle(q: Q): string[] {
  const n = cases(q).length;
  const t = plat(q.text);
  const c = t.match(new RegExp(`(?:carré de|mesurent|mesure) ${NB} (${LONG})(?: de côté| sur)`));
  if (!n || !c) return ["quadrillage ou côté d'un carreau illisibles"];
  return verifierAire(q, n * num(c[1]) ** 2, c[2]);
}

/** Deux rectangles (ou un rectangle et un carré) accolés : somme des aires. */
function corrigerDeuxRectangles(q: Q): string[] {
  const t = plat(q.text);
  const rects = [...t.matchAll(new RegExp(`${NB} (${LONG}) (?:sur|×) ${NB} (${LONG})`, "g"))].map((m) => num(m[1]) * num(m[3]));
  const carre = t.match(new RegExp(`carré de ${NB} (${LONG}) de côté`));
  const u = mesures(t, LONG)[0]?.u;
  const morceaux = [...rects, ...(carre ? [num(carre[1]) ** 2] : [])];
  if (morceaux.length !== 2 || !u) return [`deux morceaux attendus, lus : ${morceaux.join(", ")}`];
  return verifierAire(q, morceaux[0] + morceaux[1], u);
}

/** Grand rectangle moins un trou (carré, rectangle, triangle) qui doit tenir dedans. */
function corrigerDifference(q: Q): string[] {
  const t = plat(q.text);
  const paires = [...t.matchAll(new RegExp(`${NB} (${LONG}) sur ${NB} (${LONG})`, "g"))].map((m) => [num(m[1]), num(m[3])]);
  const u = mesures(t, LONG)[0]?.u;
  if (!paires.length || !u) return ["grand rectangle illisible"];
  const [L, l] = paires[0];
  let trou: number, dims: number[];
  const tri = t.match(new RegExp(`triangulaire de base ${NB} (?:${LONG}) et de hauteur ${NB}`));
  const car = t.match(new RegExp(`(?:carré|carrée) de ${NB} (?:${LONG}) de côté`));
  if (tri) [trou, dims] = [(num(tri[1]) * num(tri[2])) / 2, [num(tri[1]), num(tri[2])]];
  else if (car) [trou, dims] = [num(car[1]) ** 2, [num(car[1]), num(car[1])]];
  else if (paires.length === 2) [trou, dims] = [paires[1][0] * paires[1][1], paires[1]];
  else return ["trou illisible"];
  const tient = (dims[0] < L && dims[1] < l) || (dims[0] < l && dims[1] < L);
  return [...(tient ? [] : [`le trou ${dims.join(" × ")} ne tient pas dans ${L} × ${l}`]), ...verifierAire(q, L * l - trou, u)];
}

/** Rectangle + triangle (pignon), trapèze rectangle, ou rectangle + demi-disque (π, arrondi à l'unité). */
function corrigerComposee(q: Q): string[] {
  const t = plat(q.text);
  const ms = mesures(t, LONG);
  if (/demi-disque/.test(t)) {
    const rayon = t.match(new RegExp(`rayon ${NB}`));
    const diam = t.match(new RegExp(`${NB} (?:${LONG}) de diamètre`));
    const [L, D] = [ms[0].v, ms[1].v];
    const r = rayon ? num(rayon[1]) : diam ? num(diam[1]) / 2 : NaN;
    if (!egal(2 * r, D)) return [`le demi-disque (rayon ${r}) n'a pas pour diamètre la largeur ${D}`];
    if (L <= D) return ["le demi-disque n'est pas sur le petit côté"];
    if (!/arrondie? à l’unité|Arrondis à l’unité/.test(t)) return ["l'énoncé ne dit pas l'arrondi"];
    const exact = L * D + (Math.PI * r * r) / 2;
    const a314 = L * D + (3.14 * r * r) / 2;
    return verifier(q, Math.round(exact), uAire(t, ms[0].u), [Math.round(a314)]);
  }
  if (/trapèze/.test(t)) {
    const c = q.canvas as { points?: Record<string, Pt>; sideLabels?: Record<string, string> } | undefined;
    const bases = t.match(new RegExp(`bases ${NB} (${LONG}) et ${NB} (?:${LONG}), hauteur ${NB}`));
    let B: number, b: number, h: number, u: string;
    if (bases) [B, b, h, u] = [num(bases[1]), num(bases[3]), num(bases[4]), bases[2]];
    else {
      const [AB, CD, DA] = ["AB", "CD", "DA"].map((k) => mesureDe(c?.sideLabels?.[k]));
      if (!AB || !CD || !DA) return ["trapèze illisible"];
      [B, b, h, u] = [AB.v, CD.v, DA.v, AB.u];
    }
    const p: string[] = [];
    if (c?.points && c.sideLabels) {
      const { A, B: PB, C, D } = c.points;
      p.push(...aLEchelle(dist(A, PB), B, dist(D, A), h, "trapèze"), ...aLEchelle(dist(A, PB), B, dist(D, C), b, "petite base"));
    }
    return [...p, ...verifierAire(q, ((B + b) * h) / 2, u)];
  }
  // Rectangle (L × hr) surmonté d'un triangle de même base (hauteur ht).
  if (ms.length < 3) return ["dimensions illisibles"];
  const ht = lireMot(t.slice(t.indexOf("triangle")), "hauteur");
  if (!ht) return ["hauteur du triangle illisible"];
  const [L, hr] = [ms[0].v, ms[1].v];
  const baseTri = t.slice(t.indexOf("triangle")).match(new RegExp(`base (?:de )?${NB}`));
  if (baseTri && !egal(num(baseTri[1]), L)) return ["la base du triangle n'est pas la largeur du rectangle"];
  return verifierAire(q, L * hr + (L * ht.v) / 2, ms[0].u);
}

// ─── aire_probleme ──────────────────────────────────────────────────────────

/** La surface décrite (en m²) : rectangle, carré, triangle, parallélogramme. */
function lireSurface(t: string): number | null {
  let m: RegExpMatchArray | null;
  if ((m = t.match(new RegExp(`triangulaire de ${NB} m de base et ${NB} m de hauteur`)))) return (num(m[1]) * num(m[2])) / 2;
  if ((m = t.match(new RegExp(`parallélogramme, de base ${NB} m et de hauteur ${NB} m`)))) return num(m[1]) * num(m[2]);
  if ((m = t.match(new RegExp(`rectangulaire de ${NB} m sur ${NB} m`)))) return num(m[1]) * num(m[2]);
  if ((m = t.match(new RegExp(`carrée? de ${NB} m de côté`)))) return num(m[1]) ** 2;
  return null;
}

/** Surface à peindre : murs, plafond, faces de porte, volets, pignon triangulaire. */
function corrigerPeinture(q: Q): string[] {
  const t = plat(q.text);
  const v = mesures(t, LONG).map((m) => m.v);
  let A: number;
  if (/quatre murs/.test(t) && v.length === 3) A = 2 * (v[0] + v[1]) * v[2];
  else if (v.length !== 2) return [`deux dimensions attendues, lues : ${v.join(", ")}`];
  else if (/triangle/.test(t)) A = (v[0] * v[1]) / 2;
  else A = v[0] * v[1] * (/deux faces|deux volets/.test(t) ? 2 : 1);
  return verifierAire(q, A, "m");
}

function corrigerTriReel(q: Q): string[] {
  return /triangle rectangle/.test(plat(q.text)) ? corrigerTriRectangle(q) : corrigerTriangle(q);
}

/** Quantité par m² × aire. */
function corrigerQuantite(q: Q): string[] {
  const t = plat(q.text);
  const A = lireSurface(t);
  const qt = t.match(new RegExp(`${NB} (?:g|L|kWh|salades|dalles)[^.]*? par m²`));
  if (A == null || !qt) return ["surface ou quantité par m² illisibles"];
  return verifier(q, A * num(qt[1]), uniteImposee(t) ?? "");
}

/** Prix au m² × aire. */
function corrigerPrix(q: Q): string[] {
  const t = plat(q.text);
  const A = lireSurface(t);
  const prix = t.match(new RegExp(`${NB} € (?:le|par) m²`));
  if (A == null || !prix) return ["surface ou prix illisibles"];
  return verifier(q, A * num(prix[1]), uniteImposee(t) ?? "€");
}

/** Combien d'objets : dalles, panneaux, cartes, pots, sacs, carreaux (pavage exact ou arrondi au-dessus). */
function corrigerNombreObjets(q: Q): string[] {
  const t = plat(q.text);
  const ms = mesures(t, LONG);
  const entier = (x: number) => Math.abs(x - Math.round(x)) < 1e-9;
  const paver = (L: number, l: number, a: number, b: number): number | string => {
    const n1 = L / a, n2 = l / b;
    return entier(n1) && entier(n2) ? n1 * n2 : `${L} × ${l} ne se pave pas exactement par ${a} × ${b}`;
  };
  let n: number | string;
  if (/pot de peinture/.test(t)) {
    const couvre = mesures(t, AIRE)[0];
    if (ms.length !== 2 || !couvre) return ["murs ou pot illisibles"];
    n = Math.ceil((2 * ms[0].v * ms[1].v) / couvre.v - 1e-9);
  } else if (/sac de graines/.test(t)) {
    const couvre = mesures(t, AIRE)[0];
    const A = lireSurface(t);
    if (!couvre || A == null) return ["surface ou sac illisibles"];
    n = Math.ceil(A / couvre.v - 1e-9);
  } else if (ms.length === 4) {
    // Surface L × l, objets a × b (tout converti en cm).
    const [L, l, a, b] = ms.map((m) => m.v * EN_M[m.u] * 100);
    n = /panneaux solaires/.test(t) ? ((L * l) / (a * b)) : paver(L, l, a, b);
    if (/panneaux solaires/.test(t) && !(entier(L / a) || entier(l / a))) n = "les panneaux ne se posent pas sans perte";
  } else if (ms.length === 3) {
    const [L, l, c] = ms.map((m) => m.v * EN_M[m.u] * 100);
    n = paver(L, l, c, c);
  } else return [`mesures illisibles : ${ms.map((m) => m.v + " " + m.u).join(", ")}`];
  if (typeof n === "string") return [n];
  return verifier(q, n, "");
}

// ─── aire_defi ──────────────────────────────────────────────────────────────

const CHOIX_AP = ["même aire et même périmètre", "même aire, mais pas le même périmètre", "même périmètre, mais pas la même aire", "ni la même aire, ni le même périmètre"];

/** Deux rectangles : même aire ? même périmètre ? (QCM) */
function corrigerMemeAireOuPerimetre(q: Q): string[] {
  const v = mesures(plat(q.text), LONG).map((m) => m.v);
  if (v.length !== 4) return ["quatre dimensions attendues"];
  const A = v[0] * v[1] === v[2] * v[3];
  const P = v[0] + v[1] === v[2] + v[3];
  const juste = CHOIX_AP[A ? (P ? 0 : 1) : P ? 2 : 3];
  const p = v.includes(1) ? ["un côté de 1 : peu plausible"] : [];
  return [...p, ...(q.expected[0] === juste ? [] : [`attendu « ${q.expected[0]} », il faut « ${juste} »`]), ...qcmUnique(q, (c) => c === juste)];
}

/** Une aire annoncée pour un parallélogramme : juste (base × hauteur) ou non (côté penché). */
function corrigerAffirmationPara(q: Q): string[] {
  const t = plat(q.text);
  const b = lireMot(t, "base");
  const h = lireMot(t, "hauteur");
  const s = lireMot(t, "(?:côté penché|côtés obliques de|de côté|côté)");
  const a = mesures(t, AIRE)[0];
  if (!b || !h || !s || !a) return ["base, hauteur, côté ou aire annoncée illisibles"];
  if (s.v <= h.v) return ["le côté penché devrait être plus long que la hauteur"];
  const vrai = egal(a.v, b.v * h.v) && a.u === `${b.u}²`;
  // « Vrai ou faux ? » se répond par vrai / faux ; les autres tournures par oui / non.
  const vf = /Vrai ou faux/.test(t);
  const juste = vf ? (vrai ? "vrai" : "faux") : vrai ? "oui" : "non";
  const p = JSON.stringify([...(q.choices ?? [])].sort()) === JSON.stringify(vf ? ["faux", "vrai"] : ["non", "oui"]) ? [] : ["les propositions ne répondent pas à la question posée"];
  return [...p, ...(q.expected[0] === juste ? [] : [`attendu « ${q.expected[0]} », l'aire vaut ${b.v * h.v}`]), ...qcmUnique(q, (c) => c === juste)];
}

const PRENOMS = ["Léa", "Hugo", "Inès", "Nathan", "Chloé", "Yanis", "Manon", "Lucas", "Sarah", "Tom", "Jade", "Adam"];

/** Le rectangle de l'un, le carré de l'autre : qui a la plus grande aire ? (QCM) */
function corrigerRectCarre(q: Q): string[] {
  const t = plat(q.text);
  const iR = t.search(/rectangle|rectangulaire/);
  const iC = t.search(/carré(?!\p{L})|carrée/u);
  const avant = (i: number) =>
    PRENOMS.map((p) => ({ p, i: t.lastIndexOf(p, i) })).filter((x) => x.i >= 0).sort((x, y) => y.i - x.i)[0]?.p;
  const pR = avant(iR), pC = avant(iC);
  const r = t.match(new RegExp(`${NB} (?:${LONG}) (?:sur|×) ${NB}`));
  const c = t.match(new RegExp(`carrée? de (?:côté )?${NB}|carré de ${NB}`));
  if (!pR || !pC || pR === pC || !r || !c) return ["propriétaires ou dimensions illisibles"];
  const R = num(r[1]) * num(r[2]);
  const C = num(c[1] ?? c[2]) ** 2;
  const juste = (ch: string) => (R === C ? /même aire/.test(ch) : ch.endsWith(R > C ? pR : pC));
  return [...(juste(q.expected[0]) ? [] : [`attendu « ${q.expected[0]} », rectangle ${R} contre carré ${C}`]), ...qcmUnique(q, juste)];
}

/** Même aire, formes différentes (QCM) : l'exemple chiffré doit tenir. */
function corrigerExplique(q: Q): string[] {
  const t = plat(q.text);
  const juste = "l’aire mesure la surface occupée : deux formes différentes peuvent couvrir la même surface";
  const p: string[] = [];
  const ex = t.match(/rectangle de (\d+) sur (\d+) et à? ?un carré de côté (\d+)/);
  if (ex) {
    const [a, b, c] = ex.slice(1).map(Number);
    if (a * b !== c * c) p.push(`${a} × ${b} ≠ ${c} × ${c}`);
    if (a + b === 2 * c) p.push("même périmètre aussi : l'exemple ne départage pas");
  }
  return [...p, ...(q.expected[0] === juste ? [] : ["mauvaise réponse attendue"]), ...qcmUnique(q, (c) => c === juste)];
}

/** Longueurs × k : aire × k² ; longueurs ÷ 2 : aire ÷ 4. */
function corrigerAgrandissementAire(q: Q): string[] {
  const t = plat(q.text);
  const a = mesures(t, AIRE)[0];
  if (!a) return ["aire illisible"];
  const k = /divis[a-zé]* (?:toutes ses longueurs )?par 2/.test(t) ? 0.5 : Number(t.match(/(?:multipliées?|longueurs) par (\d+)|(\d+) fois plus longue/)?.slice(1).find(Boolean));
  if (!k) return ["coefficient illisible"];
  // Plausibilité : un timbre ne mesure pas des dm², une affiche pas des mm².
  const grand = /drapeau|affiche|vitrail|panneau|tapis|plan d/.test(t);
  const p = grand !== (a.u === "dm²") ? [`${a.v} ${a.u} : peu plausible pour cet objet`] : [];
  return [...p, ...verifier(q, a.v * k * k, a.u)];
}

/** Comparer : pizzas (π r²), carré contre disque, rectangle contre triangle ou parallélogramme (QCM). */
function corrigerCompareFigures(q: Q): string[] {
  const t = plat(q.text);
  let juste: string;
  const p: string[] = [];
  if (/pizza/.test(t)) {
    const ms = mesures(t, LONG).map((m) => m.v);
    if (ms.length !== 2) return ["diamètres illisibles"];
    const g = Math.PI * (ms[0] / 2) ** 2, pp = 2 * Math.PI * (ms[1] / 2) ** 2;
    if (Math.abs(g - pp) / g < 0.02) p.push("les deux offres sont presque égales : verdict fragile");
    juste = g > pp ? "la grande pizza" : "les deux petites pizzas";
    const lab = mesureDe(((q.canvas as any)?.segments ?? [])[0]?.label);
    if (lab && lab.v !== ms[0]) p.push("la figure ne montre pas le diamètre de la grande pizza");
  } else if (/disque|rond/.test(t)) {
    const c = t.match(new RegExp(`(?:carré de |de côté |carré de côté )${NB}|${NB} (?:${LONG}) de côté`));
    const r = t.match(new RegExp(`${NB} (?:${LONG}) de rayon|rayon ${NB}`));
    if (!c || !r) return ["côté ou rayon illisibles"];
    const C = num(c[1] ?? c[2]) ** 2, D = Math.PI * num(r[1] ?? r[2]) ** 2;
    if (Math.abs(C - D) / C < 0.02) p.push("aires presque égales");
    juste = C > D ? "le carré" : "le disque";
  } else {
    const rect = t.match(new RegExp(`[Rr]ectangle de ${NB} (?:${LONG}) (?:sur|×) ${NB}`));
    const b = lireMot(t, "base");
    const h = lireMot(t, "hauteur");
    if (!rect || !b || !h) return ["dimensions illisibles"];
    const R = num(rect[1]) * num(rect[2]);
    const tri = /triangle/.test(t);
    const F = tri ? (b.v * h.v) / 2 : b.v * h.v;
    juste = R === F ? "ils ont la même aire" : R > F ? "le rectangle" : tri ? "le triangle" : "le parallélogramme";
  }
  return [...p, ...(q.expected[0] === juste ? [] : [`attendu « ${q.expected[0]} », il faut « ${juste} »`]), ...qcmUnique(q, (c) => c === juste)];
}

/** Une dimension « x », « x + 3 », « 2x » évaluée pour x = v. */
function evaluer(e: string, x: number): number {
  const m = e.trim().match(/^(\d*)([a-z])(?: \+ (\d+))?$/);
  return m ? (m[1] ? Number(m[1]) : 1) * x + (m[3] ? Number(m[3]) : 0) : NaN;
}

/** Aire d'une figure décrite avec une lettre, pour une valeur donnée. */
function corrigerLitterale(q: Q): string[] {
  const t = plat(q.text);
  const val = t.match(/([a-z]) = (\d+)/);
  if (!val) return ["valeur de la lettre illisible"];
  const x = Number(val[2]);
  const E = `(\\d*${val[1]}(?: \\+ \\d+)?)`;
  let A: number;
  let m: RegExpMatchArray | null;
  if ((m = t.match(new RegExp(`rectangle de largeur ${E} et de longueur ${E}`)))) A = evaluer(m[1], x) * evaluer(m[2], x);
  else if ((m = t.match(new RegExp(`carré de côté ${E}`)))) A = evaluer(m[1], x) ** 2;
  else if ((m = t.match(new RegExp(`triangle de base ${E} et de hauteur ${E}`)))) A = (evaluer(m[1], x) * evaluer(m[2], x)) / 2;
  else if ((m = t.match(new RegExp(`parallélogramme de base ${E} et de hauteur ${E}`)))) A = evaluer(m[1], x) * evaluer(m[2], x);
  else return [`figure illisible : ${t}`];
  if (!/en cm/.test(t)) return ["unité des longueurs absente"];
  return verifier(q, A, "cm²");
}

const CORRIGER: CorrecteursMaths = {
  aire_probleme_tpl_1: corrigerPeinture,
  aire_probleme_tpl_2: corrigerTriReel,
  "4e_aire_probleme_x1_peinture": corrigerQuantite,
  "4e_aire_probleme_x2_terrasse": corrigerRectangle,
  "4e_aire_probleme_x3_carrelage": corrigerNombreObjets,
  "4e_aire_probleme_x5_cout": corrigerPrix,
  aire_defi_tpl_1: corrigerMemeAireOuPerimetre,
  aire_defi_tpl_2: corrigerAffirmationPara,
  aire_defi_tpl_3: corrigerRectCarre,
  aire_defi_open_1: corrigerExplique,
  "4e_aire_defi_x2_agrandissement": corrigerAgrandissementAire,
  "4e_aire_defi_x4_compare": corrigerCompareFigures,
  "4e_aire_defi_x6_param": corrigerLitterale,
  "4e_aire_comprendre_x4_compte": corrigerGrille,
  "4e_aire_comprendre_x7_meme_perimetre": corrigerMemePerimetre,
  "4e_aire_comprendre_x8_aire_ou_perimetre": corrigerSituation,
  "4e_aire_comprendre_x9_unite": corrigerUniteAdaptee,
  "4e_aire_comprendre_x10_conversion": corrigerConversion,
  "4e_aire_comprendre_x11_agrandissement": corrigerAgrandissement,
  aire_rectangle_tpl_1: corrigerRectangle,
  aire_rectangle_tpl_2: corrigerRectangle,
  aire_rectangle_tpl_canvas_1: corrigerRectangle,
  "4e_aire_rectangle_x1": corrigerRectangle,
  "4e_aire_rectangle_x3_canvas": corrigerRectangle,
  "4e_aire_rectangle_x2_inverse": corrigerRectInverse,
  "4e_aire_rectangle_x5_carrelage": corrigerRectMixte,
  aire_carre_tpl_1: corrigerCarre,
  "4e_aire_carre_x1": corrigerCarre,
  "4e_aire_carre_x8": corrigerCarre,
  "4e_aire_carre_x4_inverse": corrigerCarreInverse,
  "4e_aire_carre_x6_probleme": corrigerCarreProbleme,
  aire_triangle_tpl_1: corrigerTriangle,
  "4e_aire_triangle_x1": corrigerTriangle,
  aire_triangle_tpl_2: corrigerTriRectangle,
  "4e_aire_triangle_x3_rect": corrigerTriRectangle,
  "4e_aire_triangle_x7_hauteur_exterieure": corrigerHauteurExterieure,
  "4e_aire_triangle_x8_erreur": corrigerTriErreur,
  "4e_aire_triangle_x5_hauteur_inverse": corrigerTriInverse,
  aire_parallelogramme_tpl_1: corrigerPara,
  "4e_aire_parallelogramme_x1": corrigerPara,
  "4e_aire_parallelogramme_x6_probleme": corrigerPara,
  "4e_aire_parallelogramme_x4_inverse": corrigerParaInverse,
  aire_figure_tpl_1: corrigerGrilleSimple,
  "4e_aire_figure_x1": corrigerGrilleSimple,
  aire_figure_tpl_2: corrigerGrilleEchelle,
  "4e_aire_figure_x2_L": corrigerGrilleEchelle,
  "4e_aire_figure_x5_difference": corrigerDifference,
  "4e_aire_figure_x6": corrigerDeuxRectangles,
  "4e_aire_figure_x7_triangle_trapeze_disque": corrigerComposee,
};

export const CORRECTEURS: CorrecteursMaths = avecRegleMotsCles(CORRIGER);
