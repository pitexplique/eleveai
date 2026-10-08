import type { CorrecteursMaths } from "./types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { avecRegleMotsCles, qcmUnique } from "@/lib/tutor-v4/questionBank/6e/maths/correcteurs/pourcentages";

// LES CORRECTEURS DE perimetres.bank.ts (notion aire_perimetre, 08/10/2026).
// Ils relisent les MESURES et leurs UNITÉS dans le texte (LaTeX compris) et la
// figure quand il y en a une, puis refont le calcul (rectangle, carré, triangle,
// polygone, cercle avec π, figures composées, conversions, problèmes de clôture,
// de tours, de coût, de rouleaux). ⛔ L'unité est OBLIGATOIRE dans `expected`
// (« 24 cm ») et l'énoncé la dit. Vide = juste.

type Q = TutorGeneratedQuestionV4;

// ─── Lecture (exportée : aires.ts s'en sert aussi) ─────────────────────────

/** Le texte que lit l'élève, sans LaTeX : « $12{,}5$ $\text{cm}^2$ » → « 12,5 cm² ». */
export function plat(s: string): string {
  return String(s ?? "")
    .replace(/[  ]/g, " ")
    .replace(/\\text\{([^}]*)\}\^\{?2\}?/g, "$1²")
    .replace(/\\text\{([^}]*)\}\^\{?3\}?/g, "$1³")
    .replace(/\\text\{([^}]*)\}/g, "$1")
    .replace(/\{,\}/g, ",")
    .replace(/\\[,;: ]/g, " ")
    .replace(/\\times/g, "×")
    .replace(/\\div/g, "÷")
    .replace(/\\pi/g, "π")
    .replace(/\$/g, "")
    .replace(/−/g, "-")
    .replace(/ {2,}/g, " ");
}

export const NB = "(\\d{1,3}(?: \\d{3})+(?:,\\d+)?|\\d+(?:,\\d+)?)";
export const num = (s: string) => Number(String(s).replace(/ /g, "").replace(",", "."));
export const egal = (a: number, b: number) => Math.abs(a - b) < 1e-6 * Math.max(1, Math.abs(a), Math.abs(b));
export const LONG = "km|dm|cm|mm|m";
export const EN_M: Record<string, number> = { mm: 0.001, cm: 0.01, dm: 0.1, m: 1, km: 1000 };

/** Les mesures « nombre + unité » d'un texte (déjà mis à plat), dans l'ordre. */
export function mesures(t: string, unites = LONG): { v: number; u: string; i: number }[] {
  return [...t.matchAll(new RegExp(`${NB} (${unites})(?![\\p{L}²³/])`, "gu"))].map((m) => ({ v: num(m[1]), u: m[2], i: m.index! }));
}

/** « 24,5 cm » → { v: 24.5, u: "cm" }. */
export function lireReponse(s: string): { v: number; u: string } {
  const m = plat(s).trim().match(new RegExp(`^-?${NB}\\s*(.*)$`));
  return m ? { v: num(m[1]), u: m[2].trim() } : { v: NaN, u: "" };
}

const deuxDecimales = (x: number) => egal(Math.round(x * 100) / 100, x);

/** La réponse attendue vaut `v u` (toutes les écritures acceptées aussi), avec deux décimales au plus. */
export function verifierMesure(q: Q, v: number, u: string, quoi = "réponse"): string[] {
  const p: string[] = [];
  const r = lireReponse(q.expected[0]);
  if (!egal(r.v, v)) p.push(`${quoi} attendue « ${q.expected[0]} », recalculée ${v} ${u}`);
  if (r.u !== u) p.push(`unité attendue « ${r.u || "aucune"} », il faut « ${u} »`);
  if (!deuxDecimales(v)) p.push(`${v} : plus de deux chiffres après la virgule`);
  for (const e of q.expected.slice(1)) {
    const x = lireReponse(e);
    if (!egal(x.v, v) || (x.u !== u && !(u === "€" && x.u === "euros"))) p.push(`écriture acceptée « ${e} » ≠ ${v} ${u}`);
  }
  return p;
}

const MOT_U: Record<string, string> = { mm: "millimètres", cm: "centimètres", dm: "décimètres", m: "mètres", km: "kilomètres", "€": "euros" };
/** L'énoncé dit l'unité de la réponse (« en cm », « Combien de mètres… »). */
export function ditUnite(t: string, u: string): string[] {
  const formes = [u, MOT_U[u]].filter(Boolean).map((f) => f.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  return formes.some((f) => new RegExp(`(?:\\ben|de|d’|d') ${f}(?![\\p{L}²³])`, "iu").test(t)) ? [] : [`l'énoncé ne dit pas l'unité de la réponse (${u})`];
}

/** Réponse arrondie avec π : la touche π (attendue en premier) et 3,14 sont acceptés. */
export function verifierPi(q: Q, f: (pi: number) => number, u: string): string[] {
  const t = plat(q.text);
  const d = /à l’unité|à l'unité/.test(t) ? 0 : /au dixième/.test(t) ? 1 : /au centième/.test(t) ? 2 : null;
  if (d == null) return ["l'énoncé ne dit pas l'arrondi"];
  const r = (x: number) => Math.round(x * 10 ** d) / 10 ** d;
  const a = r(f(Math.PI));
  const b = r(f(3.14));
  const p: string[] = [];
  const e0 = lireReponse(q.expected[0]);
  if (!egal(e0.v, a) || e0.u !== u) p.push(`attendu « ${q.expected[0]} », avec π on trouve ${a} ${u}`);
  for (const e of q.expected) {
    const x = lireReponse(e);
    if (!(egal(x.v, a) || egal(x.v, b)) || x.u !== u) p.push(`écriture acceptée « ${e} » : ni ${a} ni ${b} ${u}`);
  }
  if (!egal(a, b) && !q.expected.some((e) => egal(lireReponse(e).v, b))) p.push(`l'arrondi avec 3,14 (${b}) n'est pas accepté`);
  return p;
}

/** Les étiquettes de la figure. */
export function etiquettes(q: Q): string[] {
  const c = q.canvas as Record<string, any> | undefined;
  if (!c) return [];
  const out: string[] = [];
  for (const k of ["sideLabels", "labels"]) if (c[k]) out.push(...Object.values(c[k] as Record<string, string>).map(String));
  if (c.height?.label) out.push(String(c.height.label));
  for (const s of c.segments ?? []) if (s.label) out.push(String(s.label));
  return out.map(plat);
}

/** La figure porte ces mesures. */
export function figureMontre(q: Q, attendus: string[]): string[] {
  const lab = etiquettes(q);
  return attendus.filter((a) => !lab.includes(a)).map((a) => `la figure ne montre pas « ${a} » (elle montre : ${lab.join(" | ")})`);
}

const fr = (n: number) => String(Math.round(n * 1000) / 1000).replace(".", ",");

/** Toutes les mesures du texte doivent être dans une seule unité ; rend cette unité. */
function uniteUnique(ms: { u: string }[]): string | null {
  const us = [...new Set(ms.map((m) => m.u))];
  return us.length === 1 ? us[0] : null;
}

// ─── aire_perimetre_comprendre ─────────────────────────────────────────────

// Table propre au correcteur : les mots qui disent « on suit le bord » ou « on couvre ».
const BORD = /autour|tour d|le tour|bord|contour|clôturer|border|entourer|plinthes|haie|fil électrique/;
const SURFACE = /peindre|semer|carreler|moquette|recouvrir|couvrir|vernir|papier peint|engrais|panneaux solaires|goudronner/;
const MOTS_P = ["un périmètre", "le périmètre", "la longueur du contour", "de contour, donc de périmètre"];
const MOTS_A = ["une aire", "l’aire", "la surface", "de surface, donc d’aire"];

function corrigerGrandeur(q: Q): string[] {
  // On ne lit que la SITUATION : la tournure (« problème de contour ou de surface ? ») ne compte pas.
  const t = plat(q.text)
    .toLowerCase()
    .replace(/est-ce un problème de contour ou de surface/, " ")
    .replace(/un périmètre ou une aire/, " ");
  const peri = BORD.test(t) ? true : SURFACE.test(t) ? false : null;
  if (peri == null) return [`situation non reconnue : ${q.text}`];
  const bons = peri ? MOTS_P : MOTS_A;
  return [...(bons.includes(q.expected[0]) ? [] : [`attendu « ${q.expected[0]} », il faut ${peri ? "le périmètre" : "l'aire"}`]), ...qcmUnique(q, (c) => bons.includes(c))];
}

// Table propre au correcteur : l'unité de longueur qui convient à chaque objet.
const UNITE_OBJET: [RegExp, string][] = [
  [/timbre|carte à jouer|écran de téléphone/, "mm"],
  [/cadre photo|feuille de papier|table|tapis/, "cm"],
  [/chambre|terrain de football|champ|piscine|cour de récréation/, "m"],
  [/lac|île|forêt/, "km"],
];

function corrigerUnite(q: Q): string[] {
  const t = plat(q.text);
  const u = UNITE_OBJET.find(([re]) => re.test(t))?.[1];
  if (!u) return [`objet non reconnu : ${t}`];
  const peri = /périmètre|le tour/i.test(t) ? true : /aire|surface/i.test(t) ? false : null;
  if (peri == null) return ["grandeur demandée illisible"];
  const juste = peri ? u : `${u}²`;
  return [...(q.expected[0] === juste ? [] : [`attendu « ${q.expected[0]} », il faut ${juste}`]), ...qcmUnique(q, (c) => c === juste)];
}

/** Un périmètre et un facteur sur les longueurs : le nouveau périmètre (× k, pas × k²). */
function corrigerEchelle(q: Q): string[] {
  const t = plat(q.text);
  const ms = mesures(t);
  if (ms.length !== 1) return [`un périmètre attendu, lus : ${ms.map((m) => m.v + " " + m.u).join(", ")}`];
  const k = /doublées/.test(t) ? 2 : /triplées/.test(t) ? 3 : /divisées par 2/.test(t) ? 0.5 : num(t.match(new RegExp(`multipliées par ${NB}`))?.[1] ?? "NaN");
  if (!k) return ["facteur illisible"];
  return [...verifierMesure(q, ms[0].v * k, ms[0].u), ...ditUnite(t, ms[0].u)];
}

const COTES_POLY: Record<string, number> = { quadrilatère: 4, pentagone: 5, hexagone: 6 };

/** Un polygone et tous ses côtés : leur somme. */
function corrigerPolygone(q: Q): string[] {
  const t = plat(q.text);
  const nom = t.match(/quadrilatère|pentagone|hexagone/)?.[0];
  const ms = mesures(t);
  const u = uniteUnique(ms);
  if (!nom || !u) return ["polygone ou unité illisibles"];
  const p: string[] = [];
  if (ms.length !== COTES_POLY[nom]) p.push(`un ${nom} a ${COTES_POLY[nom]} côtés, le texte en donne ${ms.length}`);
  const tri = [...ms].sort((a, b) => b.v - a.v);
  if (tri[0].v >= tri.slice(1).reduce((s, m) => s + m.v, 0)) p.push("le plus grand côté est plus long que tous les autres réunis : polygone impossible");
  return [...p, ...verifierMesure(q, ms.reduce((s, m) => s + m.v, 0), u), ...ditUnite(t, u)];
}

const REGULIERS: [RegExp, number][] = [
  [/triangle équilatéral/, 3], [/octogone/, 8], [/hexagone(?!\p{L})/u, 6], [/pentagone(?!\p{L})/u, 5], [/carré(?!\p{L})/u, 4], [/losange/, 4],
];

/** Une figure à côtés égaux : n × côté. */
function corrigerRegulier(q: Q): string[] {
  const t = plat(q.text);
  const fig = REGULIERS.find(([re]) => re.test(t));
  const ms = mesures(t);
  if (!fig || ms.length !== 1) return [`figure ou côté illisibles : ${t}`];
  return [...verifierMesure(q, fig[1] * ms[0].v, ms[0].u), ...ditUnite(t, ms[0].u)];
}

// ─── rectangle ──────────────────────────────────────────────────────────────

/** L'unité que demande la question (« en cm », « Combien de mètres »), ou null. */
export function uniteDemandee(t: string): string | null {
  const ms = [...t.matchAll(/(?:\ben|[Cc]ombien de|nombre de) (km|dm|cm|mm|m|kilomètres|décimètres|centimètres|millimètres|mètres)(?![\p{L}²³])/gu)];
  if (!ms.length) return null;
  const w = ms[ms.length - 1][1];
  return Object.entries(MOT_U).find(([, mot]) => mot === w)?.[0] ?? w;
}

/** Les deux dimensions d'un rectangle : dans le texte, sinon sur la figure (côtés AB et BC). */
function dimsRectangle(q: Q): { a: number; b: number; u: string } | string {
  const t = plat(q.text);
  const ms = mesures(t);
  const c = q.canvas as { sideLabels?: Record<string, string> } | undefined;
  const fig = c?.sideLabels ? Object.values(c.sideLabels).map((s) => mesures(plat(s))[0]).filter(Boolean) : [];
  if (ms.length === 2 && ms[0].u === ms[1].u) {
    if (fig.length && (fig.length !== 2 || !fig.every((f, i) => egal(f.v, ms[i].v) && f.u === ms[i].u))) return "la figure ne porte pas les mesures du texte";
    return { a: ms[0].v, b: ms[1].v, u: ms[0].u };
  }
  if (ms.length === 0 && fig.length === 2 && fig[0].u === fig[1].u) return { a: fig[0].v, b: fig[1].v, u: fig[0].u };
  return `deux dimensions attendues, lues : ${ms.map((m) => m.v + " " + m.u).join(", ")}`;
}

/** Un rectangle : 2 × (L + l), dans l'unité des données. */
function corrigerRectangle(q: Q): string[] {
  const d = dimsRectangle(q);
  if (typeof d === "string") return [d];
  const p: string[] = [];
  if (egal(d.a, d.b)) p.push("les deux dimensions sont égales : c'est un carré");
  return [...p, ...verifierMesure(q, 2 * (d.a + d.b), d.u), ...ditUnite(plat(q.text), d.u)];
}

/** Un rectangle dont une dimension est en m, l'autre en cm : le périmètre dans l'unité demandée. */
function corrigerRectConversion(q: Q): string[] {
  const t = plat(q.text);
  const ms = mesures(t);
  const ua = uniteDemandee(t);
  if (ms.length !== 2 || !ua) return [`deux dimensions et une unité demandée attendues (lues : ${ms.map((m) => m.v + " " + m.u).join(", ")} ; ${ua})`];
  const p: string[] = [];
  if (ms[0].u === ms[1].u) p.push("les deux dimensions sont dans la même unité : pas de conversion");
  const enM = (ms[0].v * EN_M[ms[0].u] + ms[1].v * EN_M[ms[1].u]) * 2;
  return [...p, ...verifierMesure(q, enM / EN_M[ua], ua)];
}

/** Un périmètre et une dimension : l'autre dimension (demi-périmètre moins la dimension connue). */
function corrigerRectInverse(q: Q): string[] {
  const t = plat(q.text);
  const ms = mesures(t);
  if (ms.length !== 2) return [`un périmètre et une dimension attendus, lus : ${ms.map((m) => m.v + " " + m.u).join(", ")}`];
  const ua = uniteDemandee(t) ?? ms[1].u;
  const [P, connu] = [...ms].sort((x, y) => y.v * EN_M[y.u] - x.v * EN_M[x.u]);
  const res = (P.v * EN_M[P.u]) / 2 / EN_M[ua] - (connu.v * EN_M[connu.u]) / EN_M[ua];
  const p: string[] = [];
  if (res <= 0) p.push("la dimension cherchée serait nulle ou négative");
  const cherche = t.match(/(largeur|longueur)(?: \?|, en)/)?.[1];
  if (cherche === "largeur" && res >= (connu.v * EN_M[connu.u]) / EN_M[ua]) p.push("la largeur trouvée dépasse la longueur");
  if (cherche === "longueur" && res <= (connu.v * EN_M[connu.u]) / EN_M[ua]) p.push("la longueur trouvée est plus petite que la largeur");
  return [...p, ...verifierMesure(q, res, ua), ...ditUnite(t, ua)];
}

// ─── carré ──────────────────────────────────────────────────────────────────

/** Le côté d'un carré : dans le texte, sinon sur la figure. */
function coteCarre(q: Q): { v: number; u: string } | string {
  const t = plat(q.text);
  const ms = mesures(t);
  const fig = etiquettes(q).map((s) => mesures(s)[0]).filter(Boolean);
  if (ms.length === 1) {
    if (fig.length && (fig.length !== 1 || !egal(fig[0].v, ms[0].v) || fig[0].u !== ms[0].u)) return "la figure ne porte pas le côté du texte";
    return ms[0];
  }
  if (ms.length === 0 && fig.length === 1) return fig[0];
  return `un côté attendu, lus : ${ms.map((m) => m.v + " " + m.u).join(", ")}`;
}

function corrigerCarre(q: Q): string[] {
  const c = coteCarre(q);
  if (typeof c === "string") return [c];
  return [...verifierMesure(q, 4 * c.v, c.u), ...ditUnite(plat(q.text), c.u)];
}

/** Un périmètre de carré : le côté, P ÷ 4. */
function corrigerCarreInverse(q: Q): string[] {
  const t = plat(q.text);
  const ms = mesures(t);
  if (ms.length !== 1) return [`un périmètre attendu, lus : ${ms.map((m) => m.v + " " + m.u).join(", ")}`];
  return [...verifierMesure(q, ms[0].v / 4, ms[0].u), ...ditUnite(t, ms[0].u)];
}

/** Plusieurs carrés, un carré avec une ouverture, ou plusieurs tours d'un carré. */
function corrigerCarreProbleme(q: Q): string[] {
  const t = plat(q.text);
  const ms = mesures(t);
  const ouverture = t.match(new RegExp(`(?:portail|passage|entrée|portillon) de ${NB} m`));
  if (ouverture) {
    const c = ms.filter((m) => m.i !== ouverture.index! + ouverture[0].indexOf(ouverture[1]));
    if (c.length !== 1) return ["côté illisible"];
    if (num(ouverture[1]) >= c[0].v) return [`ouverture de ${ouverture[1]} m plus large que le côté`];
    return [...verifierMesure(q, 4 * c[0].v - num(ouverture[1]), "m"), ...ditUnite(t, "m")];
  }
  if (ms.length !== 1) return [`un côté attendu, lus : ${ms.map((m) => m.v + " " + m.u).join(", ")}`];
  const k = t.match(/(\d+) fois le tour/)?.[1] ?? t.match(/^(?:On veut border |\S+ a )(\d+) /)?.[1];
  if (!k) return ["nombre de carrés ou de tours illisible"];
  return [...verifierMesure(q, Number(k) * 4 * ms[0].v, ms[0].u), ...ditUnite(t, ms[0].u)];
}

/** Défis : périmètre en m → côté en cm ; carré de même périmètre qu'un rectangle ou qu'un triangle équilatéral. */
function corrigerCarreDefi(q: Q): string[] {
  const t = plat(q.text);
  const ms = mesures(t);
  const u = uniteDemandee(t) ?? ms[0]?.u;
  if (/triangle équilatéral/.test(t)) {
    if (ms.length !== 1) return ["côté du triangle illisible"];
    return [...verifierMesure(q, (3 * ms[0].v) / 4, ms[0].u), ...ditUnite(t, ms[0].u)];
  }
  if (/rectangulaire/.test(t)) {
    if (ms.length !== 2 || ms[0].u !== ms[1].u) return ["dimensions du rectangle illisibles"];
    return [...verifierMesure(q, (2 * (ms[0].v + ms[1].v)) / 4, ms[0].u), ...ditUnite(t, ms[0].u)];
  }
  if (ms.length !== 1 || !u) return ["périmètre illisible"];
  return [...verifierMesure(q, (ms[0].v * EN_M[ms[0].u]) / 4 / EN_M[u], u), ...ditUnite(t, u)];
}

// ─── triangle ───────────────────────────────────────────────────────────────

/** Trois longueurs forment-elles un vrai triangle ? */
const inegalite = (a: number, b: number, c: number) => {
  const m = Math.max(a, b, c);
  return a + b + c - m > m ? [] : [`${a}, ${b}, ${c} : ce triangle n'existe pas`];
};

/** Les côtés d'un triangle : dans le texte, sinon sur la figure. */
function cotesTriangle(q: Q): { v: number[]; u: string } | string {
  const t = plat(q.text);
  const ms = mesures(t);
  const fig = etiquettes(q).map((s) => mesures(s)[0]).filter(Boolean);
  if (ms.length === 3 && uniteUnique(ms)) {
    if (fig.length && (fig.length !== 3 || fig.some((f, i) => !egal(f.v, ms[i].v)))) return "la figure ne porte pas les côtés du texte";
    return { v: ms.map((m) => m.v), u: ms[0].u };
  }
  if (ms.length === 0 && fig.length === 3 && uniteUnique(fig)) return { v: fig.map((m) => m.v), u: fig[0].u };
  return `trois côtés attendus, lus : ${ms.map((m) => m.v + " " + m.u).join(", ")}`;
}

function corrigerTriangle(q: Q): string[] {
  const c = cotesTriangle(q);
  if (typeof c === "string") return [c];
  const [a, b, d] = c.v;
  return [...inegalite(a, b, d), ...verifierMesure(q, a + b + d, c.u), ...ditUnite(plat(q.text), c.u)];
}

function corrigerEquilateral(q: Q): string[] {
  const t = plat(q.text);
  const ms = mesures(t);
  if (ms.length !== 1 || !/équilatéral|chacun/.test(t)) return ["côté d'un triangle équilatéral illisible"];
  return [...verifierMesure(q, 3 * ms[0].v, ms[0].u), ...ditUnite(t, ms[0].u)];
}

/** Triangle isocèle en X dessiné (ou décrit) : base + 2 × côté égal. */
function corrigerIsoceleFigure(q: Q): string[] {
  const t = plat(q.text);
  const apex = t.match(/isocèle en ([A-Z])/)?.[1];
  const c = q.canvas as { labels?: Record<string, string>; sideLabels?: Record<string, string>; marks?: { equalSides?: string[][] } } | undefined;
  const p: string[] = [];
  if (apex && c?.labels && c.labels.C !== apex) p.push(`la figure place le sommet principal en ${c.labels.C}, le texte en ${apex}`);
  if (c && JSON.stringify(c.marks?.equalSides) !== JSON.stringify([["BC", "CA"]])) p.push("la figure ne code pas les deux côtés égaux");
  const seg = [...t.matchAll(new RegExp(`([A-Z]{2}) = ${NB} (${LONG})(?![\\p{L}])`, "gu"))];
  let base: number, s: number, u: string;
  if (seg.length === 2 && apex) {
    const b = seg.find((m) => !m[1].includes(apex));
    const e = seg.find((m) => m[1].includes(apex));
    if (!b || !e) return ["base ou côté égal illisibles"];
    [base, s, u] = [num(b[2]), num(e[2]), b[3]];
  } else if (c?.sideLabels?.AB && c.sideLabels.CA) {
    const b = mesures(plat(c.sideLabels.AB))[0];
    const e = mesures(plat(c.sideLabels.CA))[0];
    [base, s, u] = [b.v, e.v, b.u];
  } else return ["mesures illisibles"];
  if (egal(base, s)) p.push("base égale aux côtés : triangle équilatéral");
  return [...p, ...inegalite(base, s, s), ...verifierMesure(q, base + 2 * s, u), ...ditUnite(t, u)];
}

/** Triangle isocèle en situation : base (parfois en cm) + 2 × côté égal, dans l'unité demandée. */
function corrigerIsoceleProbleme(q: Q): string[] {
  const t = plat(q.text);
  const mb = t.match(new RegExp(`base (?:de )?${NB} (${LONG})(?![\\p{L}])`, "u")) ?? t.match(new RegExp(`la base ${NB} (${LONG})(?![\\p{L}])`, "u"));
  const ms = mesures(t);
  const ua = uniteDemandee(t);
  if (!mb || ms.length !== 2 || !ua) return ["base, côté égal ou unité demandée illisibles"];
  const base = num(mb[1]) * EN_M[mb[2]];
  const autre = ms.find((m) => m.i !== mb.index! + mb[0].indexOf(mb[1]))!;
  const s = autre.v * EN_M[autre.u];
  return [...inegalite(base, s, s), ...verifierMesure(q, (base + 2 * s) / EN_M[ua], ua)];
}

/** Retrouver un côté à partir du périmètre. */
function corrigerTriInverse(q: Q): string[] {
  const t = plat(q.text);
  const ms = mesures(t);
  const u = uniteUnique(ms);
  if (!u) return ["unités mêlées"];
  const P = Math.max(...ms.map((m) => m.v));
  const autres = ms.filter((m) => m.v !== P || ms.filter((x) => x.v === P).length > 1).map((m) => m.v);
  let res: number;
  if (/équilatéral/.test(t)) {
    if (ms.length !== 1) return ["un périmètre attendu"];
    res = P / 3;
  } else if (/isocèle/.test(t)) {
    if (ms.length !== 2) return ["un périmètre et une longueur attendus"];
    const x = autres[0];
    res = /la base|sa base/.test(t) ? P - 2 * x : (P - x) / 2;
    const [b, s] = /la base|sa base/.test(t) ? [res, x] : [x, res];
    if (2 * s <= b) return [`base ${b} et côtés ${s} : triangle impossible`];
  } else {
    if (ms.length !== 3) return ["un périmètre et deux côtés attendus"];
    res = P - autres[0] - autres[1];
    const inv = inegalite(autres[0], autres[1], res);
    if (inv.length) return inv;
  }
  return [...verifierMesure(q, res, u), ...ditUnite(t, u)];
}

// ─── figures (quadrillage, composées) ──────────────────────────────────────

/** Le contour d'une figure sur quadrillage : on compte les côtés de case du bord. */
function corrigerGrille(q: Q): string[] {
  const t = plat(q.text);
  const cells = (q.canvas as { grid?: { filledCells?: [number, number][] } } | undefined)?.grid?.filledCells;
  if (!cells?.length) return ["pas de quadrillage"];
  const plein = new Set(cells.map(([r, c]) => `${r},${c}`));
  let n = 0;
  for (const [r, c] of cells) for (const [dr, dc] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) if (!plein.has(`${r + dr},${c + dc}`)) n++;
  const cote = t.match(new RegExp(`(?:carré de|mesure) ${NB} (${LONG}) de côté`));
  const ua = uniteDemandee(t);
  if (!cote || !ua) return ["côté de case ou unité demandée illisibles"];
  return verifierMesure(q, (n * num(cote[1]) * EN_M[cote[2]]) / EN_M[ua], ua);
}

/** Maison (rectangle + toit isocèle) ou flèche (rectangle + triangle équilatéral). */
function corrigerToit(q: Q): string[] {
  const t = plat(q.text);
  const ms = mesures(t);
  const u = uniteUnique(ms);
  if (!u) return ["unités illisibles"];
  if (/équilatéral/.test(t)) {
    const [L, l] = [ms[0].v, ms[1].v];
    if (ms.slice(2).some((m) => !egal(m.v, l))) return ["le côté du triangle n'est pas la largeur"];
    return [...verifierMesure(q, 2 * L + 3 * l, u), ...ditUnite(t, u)];
  }
  const iso = t.indexOf("isocèle");
  const apres = ms.filter((m) => m.i > iso);
  const avant = ms.filter((m) => m.i < iso);
  const s = apres.find((m) => !t.slice(m.i - 14, m.i).includes("côté de "))?.v;
  const pose = t.match(new RegExp(`posé sur le côté de ${NB}`));
  let L: number, h: number;
  if (pose) {
    L = num(pose[1]);
    const autres = avant.filter((m) => !egal(m.v, L));
    h = autres.length ? autres[0].v : L;
  } else {
    if (avant.length !== 2) return ["dimensions du rectangle illisibles"];
    [L, h] = [avant[0].v, avant[1].v];
  }
  if (s == null) return ["côtés du toit illisibles"];
  if (2 * s <= L) return [`toit impossible : 2 × ${s} ≤ ${L}`];
  return [...verifierMesure(q, L + 2 * h + 2 * s, u), ...ditUnite(t, u)];
}

/** Rectangle + carré accolé, ou pièce en L décrite par ses six côtés. */
function corrigerAccole(q: Q): string[] {
  const t = plat(q.text);
  const ms = mesures(t);
  const u = uniteUnique(ms);
  if (!u) return ["unités illisibles"];
  if (ms.length === 6) {
    const v = ms.map((m) => m.v);
    if (!egal(v[0], v[2] + v[4]) || !egal(v[5], v[1] + v[3])) return [`les six côtés ${v.join(", ")} ne ferment pas un L`];
    return [...verifierMesure(q, v.reduce((s, x) => s + x, 0), u), ...ditUnite(t, u)];
  }
  const mc = t.match(new RegExp(`(?:carré de |carré de côté |accolé a )${NB} ${u}`));
  if (!mc || ms.length < 3) return ["carré accolé illisible"];
  const c = num(mc[1]);
  const [L, l] = [ms[0].v, ms[1].v];
  if (c > l) return [`le carré (${c}) déborde du côté de ${l}`];
  return [...verifierMesure(q, 2 * (L + l) + 2 * c, u), ...ditUnite(t, u)];
}

/** Rectangle avec un ou deux demi-cercles de diamètre la largeur (π). */
function corrigerDemiDisque(q: Q): string[] {
  const t = plat(q.text);
  const ms = mesures(t);
  const u = uniteUnique(ms);
  if (!u || ms.length < 2) return ["dimensions illisibles"];
  const [L, l] = [ms[0].v, ms[1].v];
  const deux = /deux demi-cercles/.test(t);
  if (!deux && !/un demi-cercle/.test(t)) return ["nombre de demi-cercles illisible"];
  return verifierPi(q, (pi) => (deux ? 2 * L + pi * l : 2 * L + l + (pi * l) / 2), u);
}

// ─── problèmes ─────────────────────────────────────────────────────────────

/** Un nombre de tours, de boucles ou d'objets écrit en chiffres devant son mot. */
const compteLu = (t: string, re: RegExp) => {
  const m = t.match(re);
  return m ? Number(m[1]) : null;
};

/** k tours d'un rectangle : distance (m ou km), ou nombre de tours pour une distance donnée. */
function corrigerTours(q: Q): string[] {
  const t = plat(q.text);
  const ms = mesures(t);
  if (ms.length === 3) {
    const [D, L, l] = [ms[0].v, ms[1].v, ms[2].v];
    const k = D / (2 * (L + l));
    if (!Number.isInteger(Math.round(k * 1e9) / 1e9)) return [`${D} ÷ ${2 * (L + l)} ne tombe pas juste`];
    return verifierMesure(q, k, "tours");
  }
  const k = Number(t.match(/fait (\d+) fois|court (\d+) tours|en fait (\d+)\./)?.slice(1).find(Boolean));
  if (ms.length !== 2 || !k) return ["dimensions ou nombre de tours illisibles"];
  const ua = uniteDemandee(t) ?? "m";
  return [...verifierMesure(q, (k * 2 * (ms[0].v + ms[1].v) * EN_M[ms[0].u]) / EN_M[ua], ua), ...ditUnite(t, ua)];
}

/** Tour d'un triangle ; n objets triangulaires ; k boucles d'un parcours. */
function corrigerProbTriangle(q: Q): string[] {
  const t = plat(q.text);
  const ms = mesures(t);
  if (ms.length !== 3 || !uniteUnique(ms)) return ["trois côtés attendus"];
  const [a, b, c] = ms.map((m) => m.v);
  const inv = inegalite(a, b, c);
  const k = Number(t.match(/fait (\d+) boucles/)?.[1] ?? t.match(/(?:fabrique|borde) (\d+) /)?.[1] ?? 1);
  const ua = uniteDemandee(t) ?? ms[0].u;
  return [...inv, ...verifierMesure(q, (k * (a + b + c) * EN_M[ms[0].u]) / EN_M[ua], ua), ...ditUnite(t, ua)];
}

/** La mesure qui suit « portail de », « passage de »… */
const ouvertureLue = (t: string) => t.match(new RegExp(`(?:portail|portillon|passage|entrée) de ${NB} m(?![\\p{L}])`, "u"));

/** Clôture d'un rectangle moins une ouverture. */
function corrigerPortail(q: Q): string[] {
  const t = plat(q.text);
  const o = ouvertureLue(t);
  const ms = mesures(t).filter((m) => !o || m.i !== o.index! + o[0].indexOf(o[1]));
  if (!o || ms.length !== 2) return ["dimensions ou ouverture illisibles"];
  const g = num(o[1]);
  const P = 2 * (ms[0].v + ms[1].v);
  if (g >= Math.min(ms[0].v, ms[1].v)) return [`ouverture de ${g} m plus large qu'un côté`];
  return [...verifierMesure(q, P - g, "m"), ...ditUnite(t, "m")];
}

/** Coût d'une bordure : périmètre (en m) × prix du mètre, au centime. */
function corrigerCout(q: Q): string[] {
  const t = plat(q.text);
  const ms = mesures(t);
  const prix = t.match(new RegExp(`${NB} €`));
  const u = uniteUnique(ms);
  if (!prix || !u) return ["prix ou mesures illisibles"];
  const v = ms.map((m) => m.v);
  const P = /triangulaire/.test(t) ? (v.length === 3 ? v[0] + v[1] + v[2] : NaN) : /rectangulaire/.test(t) ? (v.length === 2 ? 2 * (v[0] + v[1]) : NaN) : v.length === 1 ? 4 * v[0] : NaN;
  if (isNaN(P)) return ["forme illisible"];
  const exact = P * EN_M[u] * num(prix[1]);
  // Au centime, demi-centime arrondi au-dessus (millièmes d'euro entiers : pas d'erreur de virgule flottante).
  const cout = Math.round(Math.round(exact * 1000) / 10) / 100;
  const p: string[] = [];
  if (!egal(exact, cout) && !/Arrondis au centime/.test(t)) p.push("le coût ne tombe pas juste et l'énoncé ne dit pas d'arrondir");
  // Un prix s'écrit avec deux chiffres après la virgule : « 5,70 € », « 91,20 € ».
  if (/,\d$/.test(prix[1])) p.push(`prix « ${prix[1]} € » : il faut deux chiffres après la virgule`);
  if (!Number.isInteger(cout) && !/^\d+,\d\d €$/.test(plat(q.expected[0]))) p.push(`montant affiché « ${q.expected[0]} » : il faut deux chiffres après la virgule`);
  return [...p, ...verifierMesure(q, cout, "€"), ...ditUnite(t, "€")];
}

/** Rouleaux : reste après le tour ; nombre de rouleaux (arrondi au-dessus) ; piquets tous les d m. */
function corrigerRouleaux(q: Q): string[] {
  const t = plat(q.text);
  const ms = mesures(t);
  if (/piquet|poteau/.test(t)) {
    const ecart = t.match(new RegExp(`tous les ${NB} m`));
    const d = /tous les mètres/.test(t) ? 1 : num(ecart?.[1] ?? "NaN");
    const dims = ms.filter((m) => !ecart || m.i !== ecart.index! + ecart[0].indexOf(ecart[1]));
    if (dims.length !== 2) return ["dimensions illisibles"];
    const [L, l] = dims.map((m) => m.v);
    const n = (2 * (L + l)) / d;
    if (!Number.isInteger(Math.round(n * 1e9) / 1e9)) return [`${2 * (L + l)} ÷ ${d} ne tombe pas juste`];
    return verifierMesure(q, n, /piquet/.test(t) ? "piquets" : "poteaux");
  }
  const rouleau = t.match(new RegExp(`(?:rouleaux [^.]* de|rouleau [^.]* mesure) ${NB} m(?![\\p{L}])`, "u"));
  if (rouleau) {
    const R = num(rouleau[1]);
    const autres = ms.filter((m) => m.i !== rouleau.index! + rouleau[0].lastIndexOf(rouleau[1]));
    if (autres.length !== 2) return ["dimensions illisibles"];
    const n = Math.ceil((2 * (autres[0].v + autres[1].v)) / R - 1e-9);
    return verifierMesure(q, n, n === 1 ? "rouleau" : "rouleaux");
  }
  const achat = t.match(new RegExp(`(?:On a|achète) ${NB} m(?![\\p{L}])`, "u"));
  if (!achat) return ["situation illisible"];
  const autres = ms.filter((m) => m.i !== achat.index! + achat[0].indexOf(achat[1]));
  if (autres.length !== 2) return ["dimensions illisibles"];
  const reste = num(achat[1]) - 2 * (autres[0].v + autres[1].v);
  if (reste <= 0) return ["il n'y a pas assez de matériau"];
  return [...verifierMesure(q, reste, "m"), ...ditUnite(t, "m")];
}

/** Cercles : roue qui tourne, diamètre d'un tronc, longueur d'un cercle (rayon ou diamètre). */
function corrigerCercle(q: Q): string[] {
  const t = plat(q.text);
  const ms = mesures(t);
  if (/roue/i.test(t)) {
    const n = Number(t.match(/fait (\d+) tours/)?.[1]);
    if (ms.length !== 1 || ms[0].u !== "cm" || !n) return ["diamètre ou nombre de tours illisibles"];
    const D = ms[0].v;
    return [...verifierPi(q, (pi) => (pi * D * n) / 100, "m"), ...ditUnite(t, "m"), ...figureMontre(q, [`${D} cm`])];
  }
  if (/circonférence|le tour d/i.test(t) && /diamètre/.test(t) && !/de diamètre/.test(t)) {
    if (ms.length !== 1) return ["circonférence illisible"];
    const C = ms[0].v;
    return verifierPi(q, (pi) => C / pi, ms[0].u);
  }
  if (ms.length !== 1) return ["rayon ou diamètre illisible"];
  const diam = /de diamètre/.test(t);
  const R = diam ? ms[0].v / 2 : ms[0].v;
  const u = ms[0].u;
  return [
    ...verifierPi(q, (pi) => 2 * pi * R, u),
    ...figureMontre(q, [`${fr(ms[0].v)} ${u}`]),
    ...((q.canvas as any)?.segments?.[0]?.kind !== (diam ? "diametre" : "rayon") ? ["la figure ne marque pas la bonne longueur (rayon ou diamètre)"] : []),
  ];
}

// ─── défis ──────────────────────────────────────────────────────────────────

const MEME = "ils ont le même périmètre";

/** Comparer deux périmètres (carré/rectangle, triangle/carré, deux rectangles, deux personnes). */
function corrigerCompare(q: Q): string[] {
  const t = plat(q.text);
  const carre = t.match(new RegExp(`carré de (?:côté )?${NB} (${LONG})`));
  const rect = [...t.matchAll(new RegExp(`(?:rectangle (?:([A-Z]{4}) )?(?:mesure |de |\\()|\\(|[A-Z]{4} \\()${NB} (${LONG}) sur ${NB} (${LONG})`, "g"))];
  const tri = t.match(new RegExp(`triangle équilatéral de (?:côté )?${NB} (${LONG})`));
  const p: string[] = [];
  let ok: string;
  if (tri && carre) {
    const Pt = 3 * num(tri[1]);
    const Pc = 4 * num(carre[1]);
    ok = egal(Pt, Pc) ? MEME : Pt > Pc ? "le triangle" : "le carré";
  } else if (carre && rect.length === 1) {
    const Pc = 4 * num(carre[1]);
    const Pr = 2 * (num(rect[0][2]) + num(rect[0][4]));
    const qui = t.match(/(\S+) et (\S+) veulent/);
    if (qui) {
      // « Celui de X est un carré… ; celui de Y est un rectangle… »
      const proprio = (re: string) => t.match(new RegExp(`(?:Celui|Celle|celui|celle) d[e’] ?(\\S+) est un ${re}`))?.[1];
      const pc = proprio("carré");
      const pr = proprio("rectangle");
      if (!pc || !pr) return ["propriétaires illisibles"];
      ok = egal(Pc, Pr) ? "il leur faudra la même longueur" : Pc > Pr ? pc : pr;
    } else ok = egal(Pc, Pr) ? MEME : Pc > Pr ? "le carré" : "le rectangle";
  } else {
    const deux = [...t.matchAll(new RegExp(`([A-Z]{4}) (?:mesure |\\()${NB} (?:${LONG}) sur ${NB}`, "g"))];
    if (deux.length !== 2) return [`figures illisibles : ${t}`];
    const [P1, P2] = deux.map((m) => 2 * (num(m[2]) + num(m[3])));
    ok = egal(P1, P2) ? MEME : P1 > P2 ? deux[0][1] : deux[1][1];
    if (deux.some((m) => egal(num(m[2]), num(m[3])))) p.push("un « rectangle » est un carré");
  }
  return [...p, ...(q.expected[0] === ok ? [] : [`attendu « ${q.expected[0]} », la bonne réponse est « ${ok} »`]), ...qcmUnique(q, (c) => c === ok)];
}

/** Agrandir un rectangle ou un carré : augmentation du périmètre, ou nouveau périmètre. */
function corrigerAugmente(q: Q): string[] {
  const t = plat(q.text);
  const ms = mesures(t);
  const u = uniteUnique(ms);
  if (!u) return ["unités illisibles"];
  if (/carré/.test(t)) {
    if (ms.length !== 2) return ["côté et augmentation illisibles"];
    const k = /passe de/.test(t) ? ms[1].v - ms[0].v : ms[0].v;
    return [...verifierMesure(q, 4 * k, u), ...ditUnite(t, u)];
  }
  if (ms.length !== 4) return ["dimensions et allongements illisibles"];
  const [L, l, a, b] = ms.map((m) => m.v);
  const res = /De combien/.test(t) ? 2 * (a + b) : 2 * (L + a + l + b);
  return [...verifierMesure(q, res, u), ...ditUnite(t, u)];
}

/** Une longueur exprimée avec la lettre : « x », « x + 3 », « 2x », « 5 ». */
function evaluer(e: string, x: number): number {
  const m = e.trim().match(/^(\d*)([a-z])?(?: \+ (\d+))?$/);
  if (!m) return NaN;
  if (!m[2]) return Number(m[1]);
  return (m[1] ? Number(m[1]) : 1) * x + (m[3] ? Number(m[3]) : 0);
}

/** Périmètre d'une figure décrite avec une lettre : calculer pour x = v, ou trouver x. */
function corrigerLitteral(q: Q): string[] {
  const t = plat(q.text);
  const lettre = t.match(/\b([a-z]) = /)?.[1] ?? t.match(/Que vaut ([a-z]) \?|Trouve ([a-z]) |valeur de ([a-z]) /)?.slice(1).find(Boolean);
  if (!lettre) return ["lettre illisible"];
  const L = `(\\d*${lettre}(?: \\+ \\d+)?|\\d+)`;
  let perim: ((x: number) => number) | null = null;
  let m: RegExpMatchArray | null;
  if ((m = t.match(new RegExp(`rectangle de largeur ${L} et de longueur ${L}`)))) {
    const [a, b] = [m[1], m[2]];
    perim = (x) => 2 * (evaluer(a, x) + evaluer(b, x));
  } else if ((m = t.match(new RegExp(`carré de côté ${L}`)))) {
    const a = m[1];
    perim = (x) => 4 * evaluer(a, x);
  } else if ((m = t.match(new RegExp(`triangle (?:isocèle )?de côtés ${L}, ${L} et ${L}`)))) {
    const s = [m[1], m[2], m[3]];
    perim = (x) => s.reduce((acc, e) => acc + evaluer(e, x), 0);
  }
  if (!perim) return [`figure illisible : ${t}`];
  const u = t.match(/\(en (cm|m)\)/)?.[1] ?? mesures(t)[0]?.u ?? t.match(new RegExp(`${lettre} = \\d+ (cm|m)`))?.[1];
  if (!u) return ["unité illisible"];
  const val = t.match(new RegExp(`${lettre} = (\\d+)`));
  if (val && /Calcule|Quel est le périmètre|calcule-le/.test(t)) return verifierMesure(q, perim(Number(val[1])), u);
  const P = mesures(t)[0];
  if (!P) return ["périmètre illisible"];
  // Le périmètre est affine en x : on résout a·x + b = P.
  const b0 = perim(0);
  const a1 = perim(1) - b0;
  const x = (P.v - b0) / a1;
  const p: string[] = [];
  if (x <= 0 || !Number.isInteger(x)) p.push(`x = ${x} : pas un entier positif`);
  return [...p, ...verifierMesure(q, x, u)];
}

/** Corde autour d'un cercle : + 2π·δ ; diamètre + d : + π·d ; rayon × k : périmètre × k. */
function corrigerCorde(q: Q): string[] {
  const t = plat(q.text);
  const ms = mesures(t);
  if (/Par combien|par quel nombre/.test(t)) {
    const k = /double/.test(t) ? 2 : /triple/.test(t) ? 3 : Number(t.match(/multiplié par (\d+)/)?.[1]);
    if (!k) return ["coefficient illisible"];
    return q.expected[0] === String(k) && q.comparator === "number_equal" ? [] : [`attendu « ${q.expected[0]} », le périmètre est multiplié par ${k}`];
  }
  if (!ms.length) return ["longueur illisible"];
  const d = ms[0].v;
  const u = ms[0].u;
  if (/diamètre/.test(t)) return verifierPi(q, (pi) => pi * d, u);
  return verifierPi(q, (pi) => 2 * pi * d, u);
}

/** Même périmètre : carré ↔ rectangle, triangle équilatéral ↔ carré, carré ↔ triangle quelconque. */
function corrigerEgal(q: Q): string[] {
  const t = plat(q.text);
  const ms = mesures(t);
  const u = uniteUnique(ms);
  if (!u) return ["unités illisibles"];
  const v = ms.map((m) => m.v);
  let res: number;
  if (/triangle équilatéral/.test(t)) res = (4 * v[0]) / 3;
  else if (/triangle de côtés/.test(t)) res = (v[0] + v[1] + v[2]) / 4;
  else if (/Sa longueur|de long/.test(t) && v.length === 2) res = 2 * v[0] - v[1];
  else if (v.length === 2) res = (2 * (v[0] + v[1])) / 4;
  else return ["situation illisible"];
  const p: string[] = [];
  if (res <= 0) p.push("longueur négative");
  return [...p, ...verifierMesure(q, res, u), ...ditUnite(t, u)];
}

const CORRIGER: CorrecteursMaths = {
  aire_perimetre_probleme_tpl_1: corrigerTours,
  aire_perimetre_probleme_tpl_2: corrigerProbTriangle,
  "4e_aire_perimetre_probleme_x1": corrigerPortail,
  "4e_aire_perimetre_probleme_x2_cout": corrigerCout,
  "4e_aire_perimetre_probleme_x4_inverse": corrigerCercle,
  "4e_aire_perimetre_probleme_x6": corrigerRouleaux,
  aire_perimetre_defi_tpl_1: corrigerCompare,
  aire_perimetre_defi_tpl_2: corrigerAugmente,
  "4e_aire_perimetre_defi_x2_litteral": corrigerLitteral,
  "4e_aire_perimetre_defi_x4_augmentation": corrigerCorde,
  "4e_aire_perimetre_defi_perimetre_egal": corrigerEgal,
  aire_perimetre_triangle_tpl_1: corrigerTriangle,
  "4e_aire_perimetre_triangle_x1": corrigerTriangle,
  "4e_aire_perimetre_triangle_x2_equilateral": corrigerEquilateral,
  "4e_aire_perimetre_triangle_x3_isocele": corrigerIsoceleProbleme,
  "4e_aire_perimetre_triangle_x5_canvas": corrigerIsoceleFigure,
  "4e_aire_perimetre_triangle_x7_equi_inverse": corrigerTriInverse,
  aire_perimetre_figure_tpl_1: corrigerGrille,
  aire_perimetre_defi_tpl_3: corrigerGrille,
  "4e_aire_perimetre_figure_x1": corrigerGrille,
  "4e_aire_perimetre_figure_x2_L": corrigerGrille,
  "4e_aire_perimetre_figure_x4": corrigerGrille,
  aire_perimetre_figure_tpl_2: corrigerToit,
  "4e_aire_perimetre_figure_x6": corrigerAccole,
  "4e_aire_perimetre_figure_tpl_demi_disque": corrigerDemiDisque,
  "4e_aire_perimetre_rectangle_tpl_figure": corrigerRectangle,
  aire_perimetre_rectangle_tpl_1: corrigerRectangle,
  aire_perimetre_rectangle_tpl_2: corrigerRectangle,
  "4e_aire_perimetre_rectangle_x1": corrigerRectangle,
  "4e_aire_perimetre_rectangle_x6": corrigerRectangle,
  "4e_aire_perimetre_rectangle_x2_inverse": corrigerRectInverse,
  "4e_aire_perimetre_rectangle_x4_cl-ture": corrigerRectConversion,
  aire_perimetre_carre_tpl_1: corrigerCarre,
  "4e_aire_perimetre_carre_tpl_materiau": corrigerCarre,
  "4e_aire_perimetre_carre_x1": corrigerCarre,
  "4e_aire_perimetre_carre_x2_inverse": corrigerCarreInverse,
  "4e_aire_perimetre_carre_x6_probleme": corrigerCarreProbleme,
  "4e_aire_perimetre_carre_x7": corrigerCarreDefi,
  "4e_aire_perimetre_comprendre_tpl_grandeur": corrigerGrandeur,
  "4e_aire_perimetre_comprendre_tpl_unite": corrigerUnite,
  "4e_aire_perimetre_comprendre_tpl_echelle": corrigerEchelle,
  "4e_aire_perimetre_comprendre_x6_tpl": corrigerPolygone,
  "4e_aire_perimetre_comprendre_x8_tpl": corrigerRegulier,
};

export const CORRECTEURS: CorrecteursMaths = avecRegleMotsCles(CORRIGER);
void fr;
void figureMontre;
