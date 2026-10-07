import type { CorrecteursMaths } from "./types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { PRENOMS } from "../entiers.bank";

// LES CORRECTEURS DE aires.bank.ts (06/10/2026, voir types.ts).
// Chacun relit les NOMBRES et les UNITÉS du texte que voit l'élève, refait le
// calcul avec ses propres tables, et rend la liste des problèmes (vide = juste).
// Rien n'est emprunté au gabarit.

type Q = TutorGeneratedQuestionV4;

// ─── Lecture ────────────────────────────────────────────────────────────────

/** « 1 234,5 » → 1234.5 */
export const val = (s: string) => Number(String(s).replace(/[  ]/g, "").replace(",", "."));
const NB = String.raw`\d{1,3}(?:[  ]\d{3})+(?:,\d+)?|\d+(?:,\d+)?`;

/** Les mesures « nombre + unité » du texte, dans l'ordre (« 4,5 m », « 12 cm² »). */
export function mesures(t: string, unites: string): { v: number; u: string }[] {
  const re = new RegExp(`(${NB}) (${unites})(?![a-zA-Zàâéèêîôû²³])`, "g");
  return [...t.matchAll(re)].map((m) => ({ v: val(m[1]), u: m[2] }));
}
export const LONGUEUR = "km|dm|cm|mm|m";
export const AIRE = "dm²|cm²|mm²|km²|m²";

/** La réponse attendue : valeur et unité (« 24 cm² » → 24, « cm² »). */
export function lireReponse(s: string): { v: number; u: string } {
  const m = String(s).match(new RegExp(`^(${NB})\\s*(.*)$`));
  return m ? { v: val(m[1]), u: m[2].trim() } : { v: NaN, u: "" };
}
export const egal = (a: number, b: number) => Math.abs(a - b) < 1e-6;
/** Deux chiffres après la virgule au plus. */
export const deuxDecimales = (x: number) => egal(Math.round(x * 100) / 100, x);

/** Réponse numérique : la valeur et l'unité attendues, et l'unité écrite. */
export function verifierReponse(q: Q, v: number, u: string, quoi = "réponse"): string[] {
  const p: string[] = [];
  const r = lireReponse(q.expected[0]);
  if (!egal(r.v, v)) p.push(`${quoi} attendue « ${q.expected[0]} », recalculée ${v} ${u}`);
  if (r.u !== u) p.push(`unité attendue « ${r.u || "aucune"} », il faut « ${u} »`);
  if (!deuxDecimales(r.v)) p.push(`plus de deux chiffres après la virgule : ${q.expected[0]}`);
  return p;
}

/** QCM : une seule proposition vaut `v u`, et c'est l'attendue. */
export function verifierQcm(q: Q, v: number, u: string): string[] {
  const p: string[] = [];
  const justes = (q.choices ?? []).filter((c) => {
    const r = lireReponse(c);
    return egal(r.v, v) && r.u === u;
  });
  if (justes.length !== 1) p.push(`${justes.length} proposition(s) valent ${v} ${u} : ${(q.choices ?? []).join(" | ")}`);
  else if (justes[0] !== q.expected[0]) p.push(`la proposition juste « ${justes[0]} » n'est pas l'attendue « ${q.expected[0]} »`);
  for (const c of q.choices ?? []) if (!lireReponse(c).u) p.push(`proposition sans unité : « ${c} »`);
  return p;
}

/** « Inès … doit-elle », « Hugo … peut-il » : le pronom s'accorde au premier prénom. */
export function accordPronom(t: string): string[] {
  const premier = PRENOMS.map((x) => ({ x, i: t.search(new RegExp(`(^|[^\\p{L}])${x.nom}(?![\\p{L}])`, "u")) }))
    .filter((o) => o.i >= 0)
    .sort((a, b) => a.i - b.i)[0]?.x;
  const p: string[] = [];
  if (!premier) return p;
  for (const m of t.matchAll(/\b(doit|peut|a|va|veut|met|compte)-(il|elle)\b/g))
    if ((m[2] === "elle") !== premier.f) p.push(`accord : « ${m[0]} » pour ${premier.nom}`);
  return p;
}

// ─── aire_comprendre ────────────────────────────────────────────────────────

// Table propre au correcteur : quel objet a une petite surface (cm²), une grande (m²).
const PETITS = ["timbre", "feuille de cahier", "téléphone", "carte à jouer", "ticket", "étiquette", "photo", "post-it", "chocolat", "couverture d’un livre"];
const GRANDS = ["chambre", "terrain", "pelouse", "tapis de judo", "mur du salon", "potager", "cour", "cabane", "salle de classe"];

function classeObjet(t: string): "cm" | "m" | null {
  const petit = PETITS.some((o) => t.includes(o));
  const grand = GRANDS.some((o) => t.includes(o));
  return petit === grand ? null : petit ? "cm" : "m";
}

function corrigerComprendreUnite(q: Q): string[] {
  const p: string[] = [];
  const classe = classeObjet(q.text);
  if (!classe) return ["objet introuvable ou ambigu dans le texte"];
  const carrees = (q.choices ?? []).filter((c) => /²/.test(c));
  if (carrees.length !== 1) p.push(`il faut une seule unité carrée parmi : ${(q.choices ?? []).join(" | ")}`);
  if (q.expected[0] !== carrees[0]) p.push(`l'attendue « ${q.expected[0]} » n'est pas la mesure d'aire`);
  const u = lireReponse(q.expected[0]).u || q.expected[0];
  if (u !== `${classe}²`) p.push(`unité « ${u} » peu adaptée : il faut ${classe}² ici`);
  if (/\d/.test(q.expected[0])) {
    const v = lireReponse(q.expected[0]).v;
    const [lo, hi] = classe === "cm" ? [1, 700] : [3, 1000];
    if (!(v >= lo && v <= hi)) p.push(`aire peu plausible : ${q.expected[0]}`);
    // Les quatre écritures portent le même nombre : seule l'unité les distingue.
    if (new Set((q.choices ?? []).map((c) => lireReponse(c).v)).size !== 1)
      p.push(`les propositions n'ont pas toutes le même nombre : ${(q.choices ?? []).join(" | ")}`);
  }
  return [...p, ...accordPronom(q.text)];
}

const COUVRIR = ["gazon", "peindre", "toute la table", "carreler", "moquette", "place son tapis", "tissu", "semer", "recouvrir"];
const TOUR = ["clôture", "autour", "galon"];
const REMPLIR = ["remplir"];

function corrigerComprendreGrandeur(q: Q): string[] {
  const t = q.text;
  const n = [COUVRIR.some((m) => t.includes(m)), TOUR.some((m) => t.includes(m)), REMPLIR.some((m) => t.includes(m))];
  if (n.filter(Boolean).length !== 1) return ["action ambiguë : couvrir, faire le tour ou remplir ?"];
  const juste = n[0] ? "l’aire" : n[1] ? "le périmètre" : "le volume";
  const p: string[] = [];
  if (q.expected[0] !== juste) p.push(`attendu « ${q.expected[0]} », il faut « ${juste} »`);
  if (!(q.choices ?? []).includes(juste)) p.push("la bonne grandeur n'est pas proposée");
  return [...p, ...accordPronom(t)];
}

function corrigerComprendre(q: Q): string[] {
  return /unité|mesures|écritures/.test(q.text) && !/Que doit|Quelle grandeur|Quelle mesure lui/.test(q.text)
    ? corrigerComprendreUnite(q)
    : corrigerComprendreGrandeur(q);
}

// ─── aire_compter ───────────────────────────────────────────────────────────

/** Les comptes du texte : tous les nombres, sauf celui de l'unité « 1 cm² ». */
function comptes(t: string): number[] {
  return [...t.matchAll(new RegExp(`(${NB})(?! ?(?:${AIRE}))`, "g"))].map((m) => val(m[1]));
}
/** L'unité du carré unité : « carreaux de 1 cm² ». */
function uniteCarre(t: string): string | null {
  const u = [...t.matchAll(new RegExp(`\\b1 (${AIRE})`, "g"))].map((m) => m[1]);
  return u.length === 1 ? u[0] : null;
}

function corrigerCompter(q: Q): string[] {
  const u = uniteCarre(q.text);
  if (!u) return ["le carré unité (« 1 cm² ») est absent ou en double"];
  const n = comptes(q.text);
  const parRangees = /rangée/.test(q.text);
  if (parRangees && n.length !== 2) return [`il faut deux nombres (rangées, carrés par rangée), lu : ${n.join(", ")}`];
  if (!parRangees && (n.length < 2 || n.length > 4)) return [`il faut 2 à 4 lignes, lu : ${n.join(", ")}`];
  const total = parRangees ? n[0] * n[1] : n.reduce((a, b) => a + b, 0);
  const p = q.format === "qcm" ? verifierQcm(q, total, u) : [];
  p.push(...verifierReponse(q, total, u));
  if (n.some((k) => k < 1 || k > 15 || !Number.isInteger(k))) p.push(`compte peu plausible : ${n.join(", ")}`);
  return p;
}

// ─── aire_convertir ─────────────────────────────────────────────────────────

/** Aire en m² d'une unité (table propre au correcteur). */
const EN_M2: Record<string, number> = { "m²": 1, "dm²": 0.01, "cm²": 0.0001 };

function corrigerConvertir(q: Q): string[] {
  const t = q.text;
  const src = mesures(t, AIRE)[0];
  if (!src) return ["aucune aire chiffrée dans le texte"];
  // L'unité d'arrivée : l'autre unité d'aire nommée dans le texte.
  const nommees = [...new Set([...t.matchAll(/(dm²|cm²|m²)/g)].map((m) => m[1]))];
  const autres = nommees.filter((u) => u !== src.u);
  if (autres.length !== 1) return [`unité d'arrivée introuvable (unités lues : ${nommees.join(", ")})`];
  const vers = autres[0];
  const r = Math.round(((src.v * EN_M2[src.u]) / EN_M2[vers]) * 1e6) / 1e6;
  const p: string[] = [];
  const ecart = EN_M2[src.u] / EN_M2[vers];
  if (ecart !== 100 && ecart !== 0.01) p.push(`conversion ${src.u} → ${vers} hors du programme de 6e`);
  if (!deuxDecimales(src.v)) p.push(`la donnée a plus de deux décimales : ${src.v}`);
  // « a écrit : 5 m² = 50 dm² » : le résultat cité doit être FAUX.
  const cite = t.match(new RegExp(`« [^»]*= (${NB}) ${vers.replace("²", "²")} »`));
  if (cite && egal(val(cite[1]), r)) p.push("le résultat présenté comme une erreur est juste");
  if (q.format === "qcm") p.push(...verifierQcm(q, r, vers));
  p.push(...verifierReponse(q, r, vers));
  return [...p, ...accordPronom(t)];
}

// ─── aire_rectangle, aire_carre ─────────────────────────────────────────────

/** Bornes plausibles d'un côté, par unité (un set de table n'a pas 300 cm). */
const COTE_MAX: Record<string, number> = { cm: 60, dm: 20, m: 45 };

function plausibles(ls: { v: number; u: string }[]): string[] {
  const p: string[] = [];
  for (const l of ls) {
    if (!(l.v > 0 && l.v <= (COTE_MAX[l.u] ?? 0))) p.push(`côté peu plausible : ${l.v} ${l.u}`);
    if (!deuxDecimales(l.v)) p.push(`côté à plus de deux décimales : ${l.v}`);
  }
  return p;
}

function corrigerRectangle(q: Q): string[] {
  const ls = mesures(q.text, LONGUEUR);
  if (ls.length !== 2) return [`il faut deux longueurs dans le texte, lu : ${ls.map((x) => `${x.v} ${x.u}`).join(", ")}`];
  if (ls[0].u !== ls[1].u) return ["les deux côtés ne sont pas dans la même unité"];
  const u = `${ls[0].u}²`;
  const A = ls[0].v * ls[1].v;
  const p = [...plausibles(ls), ...verifierReponse(q, A, u)];
  if (ls[0].v === ls[1].v) p.push("longueur et largeur égales : c'est un carré");
  if (q.format === "qcm") p.push(...verifierQcm(q, A, u));
  return [...p, ...accordPronom(q.text)];
}

function corrigerCarre(q: Q): string[] {
  const ls = mesures(q.text, LONGUEUR);
  if (ls.length !== 1) return [`il faut une seule longueur (le côté), lu : ${ls.map((x) => `${x.v} ${x.u}`).join(", ")}`];
  if (!/carré/.test(q.text)) return ["le texte ne dit pas que c'est un carré"];
  const u = `${ls[0].u}²`;
  const A = ls[0].v * ls[0].v;
  const p = [...plausibles(ls), ...verifierReponse(q, A, u)];
  if (q.format === "qcm") p.push(...verifierQcm(q, A, u));
  return p;
}

// ─── aire_comparer ──────────────────────────────────────────────────────────

/** « plus grande » ou « plus petite » : le sens de la question, lu dans la DERNIÈRE phrase. */
function sens(t: string): "grand" | "petit" | null {
  const fin = t.split(/(?<=[.?!])\s+/).pop() ?? "";
  const g = /plus grand/.test(fin);
  const pe = /plus petit/.test(fin);
  return g === pe ? null : g ? "grand" : "petit";
}

function corrigerComparerDeux(q: Q): string[] {
  const a = mesures(q.text, AIRE);
  if (a.length !== 2) return [`il faut deux aires dans le texte, lu : ${a.length}`];
  if (a[0].u !== a[1].u) return ["les deux aires ne sont pas dans la même unité"];
  if (a[0].v === a[1].v) return ["les deux aires sont égales"];
  const s = sens(q.text);
  if (!s) return ["la question ne dit pas « plus grande » ou « plus petite »"];
  const r = s === "grand" ? Math.max(a[0].v, a[1].v) : Math.min(a[0].v, a[1].v);
  return verifierReponse(q, r, a[0].u);
}

/** Les prénoms du texte, dans l'ordre d'apparition. */
function prenomsDansLOrdre(t: string): string[] {
  return PRENOMS.map((x) => ({ n: x.nom, i: t.search(new RegExp(`(^|[^\\p{L}])${x.nom}(?![\\p{L}])`, "u")) }))
    .filter((o) => o.i >= 0)
    .sort((a, b) => a.i - b.i)
    .map((o) => o.n);
}

function corrigerComparerRectangles(q: Q): string[] {
  const ls = mesures(q.text, LONGUEUR);
  if (ls.length !== 4) return [`il faut quatre longueurs, lu : ${ls.length}`];
  const noms = prenomsDansLOrdre(q.text);
  if (noms.length !== 2) return [`il faut deux prénoms, lu : ${noms.join(", ")}`];
  const s = sens(q.text);
  if (!s) return ["la question ne dit pas « plus grande » ou « plus petite »"];
  const A1 = ls[0].v * ls[1].v;
  const A2 = ls[2].v * ls[3].v;
  const choix = q.choices ?? [];
  const deQui = (n: string) => choix.filter((c) => new RegExp(`(^|[^\\p{L}])${n}$`, "u").test(c));
  const egal = choix.filter((c) => /même/.test(c));
  if (deQui(noms[0]).length !== 1 || deQui(noms[1]).length !== 1 || egal.length !== 1)
    return [`propositions mal formées : ${choix.join(" | ")}`];
  const juste = A1 === A2 ? egal[0] : (A1 > A2) === (s === "grand") ? deQui(noms[0])[0] : deQui(noms[1])[0];
  const p: string[] = [];
  if (q.expected[0] !== juste) p.push(`attendu « ${q.expected[0]} », recalculé « ${juste} » (${A1} et ${A2})`);
  if (ls[0].v === ls[2].v && ls[1].v === ls[3].v) p.push("les deux rectangles sont identiques");
  return p;
}

// ─── aire_decomposer ────────────────────────────────────────────────────────

function corrigerParties(q: Q): string[] {
  const a = mesures(q.text, AIRE);
  const unites = new Set(a.map((x) => x.u));
  if (unites.size !== 1) return ["les aires ne sont pas toutes dans la même unité"];
  const u = a[0].u;
  let r: number;
  if (/En tout/.test(q.text)) {
    // « En tout, le jardin mesure 90 m². Il y a … » : la partie qui manque.
    if (a.length !== 3) return [`il faut l'aire totale et deux parties, lu : ${a.length}`];
    r = a[0].v - a[1].v - a[2].v;
    if (r <= 0) return ["la partie cherchée serait nulle ou négative"];
  } else {
    if (a.length !== 3) return [`il faut trois parties, lu : ${a.length}`];
    r = a[0].v + a[1].v + a[2].v;
  }
  return [...verifierReponse(q, r, u), ...accordPronom(q.text)];
}

function corrigerDecomposer(q: Q): string[] {
  const ls = mesures(q.text, LONGUEUR);
  if (new Set(ls.map((x) => x.u)).size !== 1) return ["les longueurs ne sont pas toutes dans la même unité"];
  const p0: string[] = [];
  let r: number;
  if (ls.length === 4) {
    if (!/deux rectangles/.test(q.text)) return ["quatre longueurs sans « deux rectangles »"];
    r = ls[0].v * ls[1].v + ls[2].v * ls[3].v;
  } else if (ls.length === 3) {
    // Un rectangle dont on retire un carré : le côté du carré est la mesure suivie de « de côté ».
    const c = q.text.match(new RegExp(`(${NB}) (?:${LONGUEUR}) de côté`));
    if (!c) return ["le carré retiré n'a pas de côté lisible"];
    const cote = val(c[1]);
    const autres = ls.map((x) => x.v);
    autres.splice(autres.indexOf(cote), 1);
    if (cote >= Math.min(...autres)) p0.push("le carré retiré ne tient pas dans le rectangle");
    r = autres[0] * autres[1] - cote * cote;
  } else return [`il faut 3 ou 4 longueurs, lu : ${ls.length}`];
  const u = `${ls[0].u}²`;
  const p = [...p0, ...plausibles(ls), ...verifierReponse(q, r, u)];
  if (q.format === "qcm") p.push(...verifierQcm(q, r, u));
  return [...p, ...accordPronom(q.text)];
}

// ─── aire_probleme ──────────────────────────────────────────────────────────

function corrigerProbleme(q: Q): string[] {
  const t = q.text;
  const ls = mesures(t, LONGUEUR);
  if (ls.length !== 2 || ls.some((x) => x.u !== "m")) return [`il faut deux longueurs en m, lu : ${ls.map((x) => `${x.v} ${x.u}`).join(", ")}`];
  const A = ls[0].v * ls[1].v;
  const p = plausibles(ls);
  const prix = t.match(new RegExp(`(${NB}) € le m²`));
  const couvre = t.match(new RegExp(`couvre (${NB}) m²`));
  if (prix && couvre) return ["un prix ET une couverture : énoncé ambigu"];
  if (prix) {
    const pu = val(prix[1]);
    if (pu < 3 || pu > 60) p.push(`prix au m² peu plausible : ${pu} €`);
    p.push(...verifierReponse(q, A * pu, "€", "prix"));
    if (q.format === "qcm") p.push(...verifierQcm(q, A * pu, "€"));
  } else if (couvre) {
    const k = val(couvre[1]);
    const n = A / k;
    if (!Number.isInteger(n)) p.push(`${A} ÷ ${k} ne tombe pas juste : il faudrait arrondir`);
    const objets = t.match(/Combien de (\p{L}+) lui faut-il/u)?.[1];
    if (!objets) return ["la question « Combien de … lui faut-il ? » est illisible"];
    p.push(...verifierReponse(q, n, objets));
  } else {
    p.push(...verifierReponse(q, A, "m²"));
  }
  if (ls[0].v === ls[1].v) p.push("pièce carrée présentée comme rectangle");
  return [...p, ...accordPronom(t)];
}

// ─── aire_defi ──────────────────────────────────────────────────────────────

const MOTS_FOIS: Record<string, number> = { deux: 2, trois: 3, quatre: 4 };

function corrigerDefiPieges(q: Q): string[] {
  const t = q.text;
  const ls = mesures(t, LONGUEUR);
  const fois = t.match(/(deux|trois|quatre) fois plus long/);
  if (fois) {
    if (ls.length !== 1) return [`il faut un seul côté, lu : ${ls.length}`];
    const c = ls[0].v * MOTS_FOIS[fois[1]];
    const u = `${ls[0].u}²`;
    return [...verifierQcm(q, c * c, u), ...verifierReponse(q, c * c, u), ...accordPronom(t)];
  }
  // Un carré et un rectangle « de même périmètre ».
  if (ls.length !== 3) return [`il faut trois longueurs (carré, rectangle), lu : ${ls.length}`];
  const [c, a, b] = ls.map((x) => x.v);
  const p: string[] = [];
  if (4 * c !== 2 * (a + b)) p.push(`les périmètres ne sont pas égaux : ${4 * c} et ${2 * (a + b)}`);
  if (a === b) p.push("le rectangle est un carré");
  const Ac = c * c;
  const Ar = a * b;
  const choix = q.choices ?? [];
  const juste = Ac === Ar ? choix.find((x) => /même/.test(x)) : Ac > Ar ? choix.find((x) => /carré/.test(x)) : choix.find((x) => /rectangle/.test(x));
  if (!juste || q.expected[0] !== juste) p.push(`attendu « ${q.expected[0]} », recalculé « ${juste} » (${Ac} et ${Ar})`);
  if (!/grande aire/.test(t)) p.push("la question ne demande pas la plus grande aire");
  return p;
}

function corrigerCoteManquant(q: Q): string[] {
  const t = q.text;
  const a = mesures(t, AIRE);
  const ls = mesures(t, LONGUEUR);
  if (a.length !== 1 || ls.length !== 1) return [`il faut une aire et une longueur, lu : ${a.length} et ${ls.length}`];
  if (a[0].u !== `${ls[0].u}²`) return ["l'aire et la longueur ne sont pas dans des unités assorties"];
  const r = a[0].v / ls[0].v;
  const p = verifierReponse(q, r, ls[0].u);
  if (!Number.isInteger(r)) p.push(`${a[0].v} ÷ ${ls[0].v} ne tombe pas juste`);
  const chercheLargeur = /(sa|Trouve sa) largeur/.test(t.split(/(?<=\.)\s/).pop() ?? t);
  if (chercheLargeur && r >= ls[0].v) p.push("la largeur trouvée dépasse la longueur");
  if (!chercheLargeur && r <= ls[0].v) p.push("la longueur trouvée est plus petite que la largeur");
  return [...p, ...accordPronom(t)];
}

function corrigerCarreInverse(q: Q): string[] {
  const t = q.text;
  const a = mesures(t, AIRE);
  if (a.length !== 1 || mesures(t, LONGUEUR).length) return ["il faut une seule aire et aucune longueur"];
  const c = Math.sqrt(a[0].v);
  if (!Number.isInteger(c)) return [`${a[0].v} n'est pas le carré d'un entier`];
  const u = a[0].u.replace("²", "");
  const r = /périmètre|tour/.test(t) ? 4 * c : c;
  return verifierReponse(q, r, u);
}

export const CORRECTEURS: CorrecteursMaths = {
  aire_defi_tpl_e4: corrigerDefiPieges,
  aire_defi_tpl_1: corrigerCoteManquant,
  aire_defi_tpl_2: corrigerCarreInverse,
  aire_probleme_tpl_e2: corrigerProbleme,
  aire_probleme_tpl_1: corrigerProbleme,
  aire_probleme_qcm_tpl_1: corrigerProbleme,
  aire_decomposer_tpl_e3: corrigerParties,
  aire_decomposer_tpl_1: corrigerDecomposer,
  aire_decomposer_qcm_tpl_1: corrigerDecomposer,
  aire_comparer_tpl_1: corrigerComparerDeux,
  aire_comparer_tpl_e3: corrigerComparerRectangles,
  aire_rectangle_tpl_e1: corrigerRectangle,
  aire_rectangle_tpl_1: corrigerRectangle,
  aire_rectangle_qcm_tpl_1: corrigerRectangle,
  aire_carre_tpl_e1: corrigerCarre,
  aire_carre_tpl_1: corrigerCarre,
  aire_carre_qcm_tpl_1: corrigerCarre,
  aire_convertir_tpl_1: corrigerConvertir,
  aire_convertir_tpl_ouverte: corrigerConvertir,
  aire_compter_tpl_1: corrigerCompter,
  aire_compter_qcm_tpl_1: corrigerCompter,
  aire_comprendre_tpl_1: corrigerComprendre,
  aire_comprendre_tpl_2: corrigerComprendre,
};
