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

/** ★1-★2 nus (03/11/2026) : pas d'objet ; l'unité vient des côtés écrits, sinon une seule unité carrée. */
function corrigerComprendreUniteNue(q: Q): string[] {
  const p: string[] = [];
  const carrees = (q.choices ?? []).filter((c) => /²/.test(c));
  if (carrees.length !== 1) p.push(`il faut une seule unité carrée parmi : ${(q.choices ?? []).join(" | ")}`);
  if (q.expected[0] !== carrees[0]) p.push(`l'attendue « ${q.expected[0]} » n'est pas la mesure d'aire`);
  const cotes = new Set(mesures(q.text, LONGUEUR).map((x) => x.u));
  if (cotes.size > 1) p.push("côtés dans deux unités différentes");
  const u = lireReponse(q.expected[0]).u || q.expected[0];
  if (cotes.size === 1 && u !== `${[...cotes][0]}²`) p.push(`côtés en ${[...cotes][0]}, aire attendue en « ${u} »`);
  if (/\d/.test(q.expected[0]) && new Set((q.choices ?? []).map((c) => lireReponse(c).v)).size !== 1)
    p.push(`les propositions n'ont pas toutes le même nombre : ${(q.choices ?? []).join(" | ")}`);
  if (PRENOMS.some((x) => new RegExp(`(^|[^\\p{L}])${x.nom}(?![\\p{L}])`, "u").test(q.text))) p.push("prénom dans un énoncé nu");
  return p;
}

function corrigerComprendreUnite(q: Q): string[] {
  const p: string[] = [];
  const classe = classeObjet(q.text);
  if (!classe) return corrigerComprendreUniteNue(q);
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

// Les énoncés nus (03/11/2026) : « l’intérieur d’un carré », « le tour d’un losange », « l’espace d’un cube ».
const COUVRIR = ["l’intérieur", "la surface", "gazon", "peindre", "toute la table", "carreler", "moquette", "place son tapis", "tissu", "semer", "recouvrir"];
const TOUR = ["clôture", "autour", "galon", "le tour", "le contour", "le bord"];
const REMPLIR = ["remplir", "l’espace"];

function corrigerComprendreGrandeur(q: Q): string[] {
  const t = q.text;
  const b = t.toLowerCase(); // « Le bord d’un carré : … » en tête de phrase
  const n = [COUVRIR.some((m) => b.includes(m)), TOUR.some((m) => b.includes(m)), REMPLIR.some((m) => b.includes(m))];
  if (n.filter(Boolean).length !== 1) return ["action ambiguë : couvrir, faire le tour ou remplir ?"];
  const juste = n[0] ? "l’aire" : n[1] ? "le périmètre" : "le volume";
  const p: string[] = [];
  if (q.expected[0] !== juste) p.push(`attendu « ${q.expected[0]} », il faut « ${juste} »`);
  if (!(q.choices ?? []).includes(juste)) p.push("la bonne grandeur n'est pas proposée");
  return [...p, ...accordPronom(t)];
}

function corrigerComprendre(q: Q): string[] {
  // Les propositions disent le type de question : « l’aire, le périmètre… » ou des unités.
  return (q.choices ?? []).includes("l’aire") ? corrigerComprendreGrandeur(q) : corrigerComprendreUnite(q);
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
  // ★2 dessiné (03/11/2026) : on compte les cases coloriées de la figure.
  const cv = q.canvas as { kind?: string; grid?: { filledCells?: [number, number][] } } | undefined;
  if (cv?.kind === "figure_libre") {
    if (n.length) return [`figure dessinée ET nombres dans le texte : ${n.join(", ")}`];
    const cases = cv.grid?.filledCells ?? [];
    if (new Set(cases.map((c) => c.join(","))).size !== cases.length) return ["deux cases coloriées au même endroit"];
    return verifierReponse(q, cases.length, u);
  }
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

/** Le texte, plus les côtés écrits sur la figure quand il y en a une (03/11/2026). */
function texteEtCotes(q: Q): string {
  const lab = (q.canvas as { sideLabels?: Record<string, string> } | undefined)?.sideLabels;
  return lab ? `${q.text} ${Object.values(lab).join(" et ")}` : q.text;
}

function corrigerRectangle(q: Q): string[] {
  const ls = mesures(texteEtCotes(q), LONGUEUR);
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
  const ls = mesures(texteEtCotes(q), LONGUEUR);
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

// ═══════════════════════════════════════════════════════════════════════════
// ⭐ 07/11/2026 — CORRECTEURS DES GABARITS « À PLUSIEURS FAÇONS » (bank : même
// section). Même contrat : ils relisent le texte, les propositions et la figure
// (quadrillage ou côtés écrits), recalculent, et une tournure inconnue est un
// DÉFAUT, jamais une réponse devinée. Le nombre seul ou l'unité : lireReponse.
// ═══════════════════════════════════════════════════════════════════════════
const AL = "dm|cm|m"; // les trois unités de longueur des énoncés nus
const NBA = NB;
const inconnue = (q: Q) => [`tournure non reconnue : « ${q.text} »`];

/** La proposition attendue est bien `juste`, et elle est proposée. */
function estLaJuste(q: Q, juste: string | undefined): string[] {
  if (juste === undefined) return ["bonne proposition introuvable"];
  const p: string[] = [];
  if (q.expected[0] !== juste) p.push(`attendu « ${q.expected[0]} », recalculé « ${juste} »`);
  if (q.format === "qcm" && !(q.choices ?? []).includes(juste)) p.push(`« ${juste} » n'est pas proposé : ${(q.choices ?? []).join(" | ")}`);
  return p;
}
/** Un nombre sans unité attendu (nombre de carreaux, de rangées, de fois). */
function verifierNombre(q: Q, v: number): string[] {
  const r = lireReponse(q.expected[0]);
  return egal(r.v, v) ? [] : [`attendu « ${q.expected[0]} », recalculé ${v}`];
}
/** Vrai/faux ou oui/non, selon les propositions. */
function verifierVrai(q: Q, vrai: boolean): string[] {
  const c = q.choices ?? [];
  const mots = c.includes("oui") ? ["oui", "non"] : ["vrai", "faux"];
  if (!mots.every((m) => c.includes(m))) return [`propositions inattendues : ${c.join(" | ")}`];
  return estLaJuste(q, vrai ? mots[0] : mots[1]);
}
function sansPrenom(t: string): string[] {
  return PRENOMS.some((x) => new RegExp(`(^|[^\\p{L}])${x.nom}(?![\\p{L}])`, "u").test(t)) ? ["prénom dans un énoncé nu"] : [];
}
/** Pour une proposition du type « 6 × 4 » : sa valeur (× et + seulement, avec une parenthèse). */
function valeurCalcul(s: string): number | null {
  const m = s.match(/^(\d+) × \((\d+) \+ (\d+)\)$/);
  if (m) return Number(m[1]) * (Number(m[2]) + Number(m[3]));
  const f = s.match(/^(\d+) ([×+]) (\d+)$/);
  if (f) return f[2] === "×" ? Number(f[1]) * Number(f[3]) : Number(f[1]) + Number(f[3]);
  return null;
}
/** Le QCM de calcul : un seul vaut l'aire, c'est l'attendu, et aucune valeur n'est en double. */
function verifierCalculs(q: Q, a: number, b: number): string[] {
  const c = q.choices ?? [];
  const vals = c.map(valeurCalcul);
  if (vals.some((v) => v === null)) return [`calcul illisible parmi : ${c.join(" | ")}`];
  if (new Set(vals).size !== vals.length) return [`deux calculs de même valeur : ${c.join(" | ")}`];
  const juste = c.find((x) => {
    const f = x.match(/^(\d+) × (\d+)$/);
    return f && ((Number(f[1]) === a && Number(f[2]) === b) || (Number(f[1]) === b && Number(f[2]) === a));
  });
  return estLaJuste(q, juste);
}

// ----- Le quadrillage
type Cel = [number, number];
const casesFig = (q: Q): Cel[] | null => {
  const c = q.canvas as { kind?: string; grid?: { filledCells?: Cel[] } } | undefined;
  return c?.kind === "figure_libre" ? (c.grid?.filledCells ?? []) : null;
};
/** Les morceaux d'un seul tenant, de gauche à droite. */
function morceaux(cs: Cel[]): Cel[][] {
  const reste = new Map(cs.map((c) => [c.join(","), c] as const));
  const out: Cel[][] = [];
  while (reste.size) {
    const [cle, dep] = [...reste.entries()][0];
    reste.delete(cle);
    const bloc: Cel[] = [dep];
    for (let i = 0; i < bloc.length; i++) {
      const [r, c] = bloc[i];
      for (const k of [`${r + 1},${c}`, `${r - 1},${c}`, `${r},${c + 1}`, `${r},${c - 1}`]) {
        const v = reste.get(k);
        if (v) {
          reste.delete(k);
          bloc.push(v);
        }
      }
    }
    out.push(bloc);
  }
  return out.sort((x, y) => Math.min(...x.map((c) => c[1])) - Math.min(...y.map((c) => c[1])));
}
function cadre(cs: Cel[]) {
  const rs = cs.map((c) => c[0]);
  const ks = cs.map((c) => c[1]);
  return { rangees: Math.max(...rs) - Math.min(...rs) + 1, colonnes: Math.max(...ks) - Math.min(...ks) + 1 };
}
const estPlein = (cs: Cel[]) => {
  const { rangees, colonnes } = cadre(cs);
  return cs.length === rangees * colonnes;
};
const unCarreau = (t: string) => t.match(new RegExp(`\\b1 (${AIRE})`))?.[1] ?? null;

// ----- aire_comprendre ★1
const LIT: Record<string, string> = { cm: "centimètre", dm: "décimètre", m: "mètre" };
function corrigerComprendreSens(q: Q): string[] {
  const t = q.text;
  const p = sansPrenom(t);
  let m: RegExpMatchArray | null;
  // Une unité de…
  if ((m = t.match(/unité (d’aire|de longueur|de volume)/))) {
    const ok = (c: string) => (m![1] === "d’aire" ? /²$/.test(c) : m![1] === "de volume" ? /³$/.test(c) : /^(dm|cm|m)$/.test(c));
    return [...p, ...estLaJuste(q, (q.choices ?? []).filter(ok).length === 1 ? (q.choices ?? []).find(ok) : undefined)];
  }
  // Une mesure écrite : quelle grandeur ?
  if ((m = t.match(new RegExp(`(${NBA}) (${AL})([²³]?)`))) && /Que mesure|mesure quoi|Quelle grandeur|Choisis ce que mesure/.test(t)) {
    return [...p, ...estLaJuste(q, m[3] === "²" ? "une aire" : m[3] === "³" ? "un volume" : "une longueur")];
  }
  if (m && /est-il une aire|Est-ce une aire|est-ce une aire/.test(t)) return [...p, ...verifierVrai(q, m[3] === "²")];
  // Ce que mesure l'aire ou le périmètre d'une figure.
  if ((m = t.match(/(aire|périmètre) d’un (carré|rectangle|triangle|losange|hexagone)/i)) && /mesure/.test(t))
    return [...p, ...estLaJuste(q, /aire/i.test(m[1]) ? "son intérieur" : "son contour")];
  // « On mesure un volume en cm². Vrai ou faux ? »
  if (/Vrai ou faux/.test(t)) {
    const g = t.match(/(une aire|un périmètre|un volume)/i)?.[1].toLowerCase();
    const u = t.match(new RegExp(`\\b(${AL})([²³]?)(?![a-zà-ÿ])`, "i"));
    if (!g || !u) return inconnue(q);
    const juste = g === "une aire" ? "²" : g === "un volume" ? "³" : "";
    return [...p, ...verifierVrai(q, u[2] === juste)];
  }
  // Lire et écrire une unité.
  if ((m = t.match(new RegExp(`(?:se lit|lit-on|cette unité :) «? ?(${AL})²`)))) return [...p, ...estLaJuste(q, `${LIT[m[1]]} carré`)];
  if ((m = t.match(/(centimètre|décimètre|mètre) carré/))) {
    const u = Object.keys(LIT).find((k) => LIT[k] === m![1]);
    return [...p, ...estLaJuste(q, `${u}²`)];
  }
  // 1 cm², le carré de 1 cm de côté.
  if ((m = t.match(new RegExp(`carré de 1 (${AL}) de côté|Côté 1 (${AL})`)))) return [...p, ...estLaJuste(q, `1 ${m[1] ?? m[2]}²`)];
  if ((m = t.match(new RegExp(`\\b1 (${AL})²`))) && /côté/.test(t) && !/carreaux/.test(t)) return [...p, ...estLaJuste(q, `1 ${m[1]}`)];
  // Combien de carreaux de 1 cm² pour couvrir une aire.
  if (/carreaux/.test(t)) {
    const a = mesures(t, AIRE).filter((x) => x.v !== 1);
    if (a.length !== 1 || !unCarreau(t) || unCarreau(t) !== a[0].u) return ["il faut une aire et un carreau de 1 dans la même unité"];
    return [...p, ...verifierNombre(q, a[0].v)];
  }
  return inconnue(q);
}

// ----- aire_compter
function corrigerDeuxFigures(q: Q): string[] {
  const t = q.text;
  const cs = casesFig(q);
  if (!cs) return ["il faut un quadrillage"];
  if (new Set(cs.map((c) => c.join(","))).size !== cs.length) return ["deux cases coloriées au même endroit"];
  const ms = morceaux(cs);
  if (ms.length !== 2) return [`il faut deux figures, lu : ${ms.length}`];
  const [g, d] = [ms[0].length, ms[1].length];
  const p = sansPrenom(t);
  if (/[Mm]ême aire/.test(t)) return [...p, ...verifierVrai(q, g === d)];
  const u = unCarreau(t);
  if (/aire totale/.test(t)) return u ? [...p, ...verifierReponse(q, g + d, u)] : ["unité du carreau absente"];
  if (/en tout/.test(t)) return [...p, ...verifierNombre(q, g + d)];
  const cote = t.match(/figure de (gauche|droite)/)?.[1];
  if (cote) return u ? [...p, ...verifierReponse(q, cote === "gauche" ? g : d, u)] : ["unité du carreau absente"];
  if (/écart|différence/.test(t)) return [...p, ...verifierNombre(q, Math.abs(g - d))];
  const grand = /plus grande|le plus/.test(t);
  if (!grand && !/plus petite|le moins/.test(t)) return inconnue(q);
  const c = q.choices ?? [];
  const juste = g === d ? c.find((x) => /même aire/.test(x)) : (g > d) === grand ? c.find((x) => /gauche/.test(x)) : c.find((x) => /droite/.test(x));
  return [...p, ...estLaJuste(q, juste)];
}
function corrigerCompterFigure(q: Q): string[] {
  const t = q.text;
  const cs = casesFig(q);
  if (!cs) return ["il faut un quadrillage"];
  if (new Set(cs.map((c) => c.join(","))).size !== cs.length) return ["deux cases coloriées au même endroit"];
  if (morceaux(cs).length !== 1) return ["la figure n'est pas d'un seul tenant"];
  const n = cs.length;
  const p = sansPrenom(t);
  const u = unCarreau(t);
  if (u && q.format === "qcm") return [...p, ...verifierQcm(q, n, u), ...verifierReponse(q, n, u)];
  if (u) return [...p, ...verifierReponse(q, n, u)];
  if (/carreau|carreaux/.test(t)) return [...p, ...verifierNombre(q, n)];
  return inconnue(q);
}
function corrigerCompterTexte(q: Q): string[] {
  const t = q.text;
  const p = sansPrenom(t);
  const u = unCarreau(t);
  if (!u) return ["carreau de 1 absent"];
  const a = mesures(t, AIRE).filter((x) => !(x.v === 1 && x.u === u));
  const n = comptes(t);
  if (a.length === 1) {
    if (a[0].u !== u) return ["l'aire et le carreau n'ont pas la même unité"];
    return [...p, ...verifierNombre(q, a[0].v)];
  }
  if (a.length) return ["deux aires à couvrir"];
  if (n.length === 1) return [...p, ...verifierReponse(q, n[0], u)];
  if (n.length !== 2) return [`il faut un ou deux comptes, lu : ${n.join(", ")}`];
  let m: RegExpMatchArray | null;
  if ((m = t.match(/enlève (\d+) carreaux à (\d+) carreaux/))) return [...p, ...verifierReponse(q, Number(m[2]) - Number(m[1]), u)];
  if (/moins/.test(t)) return [...p, ...verifierReponse(q, n[0] - n[1], u)];
  if (/plus|ajoute/.test(t)) return [...p, ...verifierReponse(q, n[0] + n[1], u)];
  return inconnue(q);
}
function corrigerCompterRectangle(q: Q): string[] {
  const t = q.text;
  const cs = casesFig(q);
  if (!cs || !estPlein(cs)) return ["il faut un rectangle plein sur quadrillage"];
  const { rangees, colonnes } = cadre(cs);
  const p = sansPrenom(t);
  if (rangees === colonnes) p.push("rangées et colonnes égales : c'est un carré");
  const u = unCarreau(t);
  if (u) return [...p, ...verifierReponse(q, cs.length, u)];
  if (/\bcalcul\b/.test(t)) return [...p, ...verifierCalculs(q, rangees, colonnes)];
  if (/rangées/.test(t)) return [...p, ...verifierNombre(q, rangees)];
  if (/rangée/.test(t)) return [...p, ...verifierNombre(q, colonnes)];
  if (/carreaux/.test(t)) return [...p, ...verifierNombre(q, cs.length)];
  return inconnue(q);
}
function corrigerCompterRangees(q: Q): string[] {
  const t = q.text;
  const p = sansPrenom(t);
  const cs = casesFig(q);
  if (cs) {
    if (!estPlein(cs)) return ["le rectangle du quadrillage n'est pas plein"];
    const { rangees: r, colonnes: c } = cadre(cs);
    if (/ajoute une rangée|rangée de plus/.test(t)) return [...p, ...verifierNombre(q, (r + 1) * c)];
    if (/enlève une rangée|rangée de moins/.test(t)) return [...p, ...verifierNombre(q, (r - 1) * c)];
    const u = unCarreau(t);
    return u ? [...p, ...verifierReponse(q, r * c, u)] : inconnue(q);
  }
  // « 4 rangées de 5 carreaux » ou « Chaque rangée a 5 carreaux … Il y a 4 rangées ».
  let m = t.match(/(\d+) rangées de (\d+) carreaux/);
  if (!m) {
    const x = t.match(/Chaque rangée a (\d+) carreaux.*Il y a (\d+) rangées/);
    if (x) m = [x[0], x[2], x[1]] as unknown as RegExpMatchArray;
  }
  if (!m) return inconnue(q);
  const [a, b] = [Number(m[1]), Number(m[2])];
  if (/\bcalcul\b/.test(t)) return [...p, ...verifierCalculs(q, a, b)];
  const u = unCarreau(t);
  if (!u) return ["carreau de 1 absent"];
  return [...p, ...(q.format === "qcm" ? verifierQcm(q, a * b, u) : []), ...verifierReponse(q, a * b, u)];
}
function corrigerCompterValeur(q: Q): string[] {
  const t = q.text;
  const p = sansPrenom(t);
  let m: RegExpMatchArray | null;
  const cs = casesFig(q);
  if (cs) {
    if ((m = t.match(new RegExp(`carreau vaut (\\d+) (${AIRE})`)))) return [...p, ...verifierReponse(q, cs.length * Number(m[1]), m[2])];
    return inconnue(q);
  }
  if (/demi/.test(t)) {
    const u = unCarreau(t);
    if (!u) return ["carreau de 1 absent"];
    const h = t.match(/(\d+) (?:demis|demi-carreaux)/);
    if (!h) return inconnue(q);
    if (Number(h[1]) % 2) return ["un nombre impair de demi-carreaux ne fait pas un compte entier"];
    const e = t.match(/(\d+) (?:entiers|carreaux entiers|carreaux et)/);
    return [...p, ...verifierReponse(q, (e ? Number(e[1]) : 0) + Number(h[1]) / 2, u)];
  }
  // n carreaux égaux couvrent X : l'aire d'un carreau.
  const a = mesures(t, AIRE);
  const n = t.match(/(\d+) carreaux/);
  if (a.length !== 1 || !n) return inconnue(q);
  const v = a[0].v / Number(n[1]);
  if (!Number.isInteger(v)) return [`${a[0].v} ÷ ${n[1]} ne tombe pas juste`];
  return [...p, ...verifierReponse(q, v, a[0].u)];
}
function corrigerCompterManque(q: Q): string[] {
  const t = q.text;
  const cs = casesFig(q);
  if (!cs) return ["il faut un quadrillage"];
  const p = sansPrenom(t);
  const n = cs.length;
  const u = unCarreau(t);
  let m: RegExpMatchArray | null;
  if (/rectangle/.test(t)) {
    const { rangees, colonnes } = cadre(cs);
    const k = rangees * colonnes - n;
    if (k < 1) return ["le rectangle est déjà complet"];
    return u ? [...p, ...verifierReponse(q, k, u)] : [...p, ...verifierNombre(q, k)];
  }
  if ((m = t.match(/(ajoute|enlève) (\d+) carreaux/))) {
    const v = m[1] === "ajoute" ? n + Number(m[2]) : n - Number(m[2]);
    return u ? [...p, ...verifierReponse(q, v, u)] : [...p, ...verifierNombre(q, v)];
  }
  // « pour faire 20 cm² », « Il faut 20 cm² ».
  const a = mesures(t, AIRE).filter((x) => x.v !== 1);
  if (a.length === 1 && /manque|ajouter/.test(t)) {
    if (a[0].v <= n) return ["l'aire visée est déjà atteinte"];
    return [...p, ...verifierNombre(q, a[0].v - n)];
  }
  return inconnue(q);
}

// ----- aire_rectangle et aire_carre
/** Les deux côtés d'une figure à côtés écrits (un seul pour un carré). */
function cotesQuad(q: Q): { L: number; l: number; u: string; carre: boolean } | null {
  const lab = (q.canvas as { kind?: string; sideLabels?: Record<string, string>; points?: Record<string, { x: number; y: number }> } | undefined);
  if (lab?.kind !== "quadrilatere" || !lab.sideLabels) return null;
  const ls = Object.values(lab.sideLabels).flatMap((s) => mesures(s, LONGUEUR));
  if (!ls.length || ls.length > 2 || new Set(ls.map((x) => x.u)).size !== 1) return null;
  return { L: ls[0].v, l: ls[1]?.v ?? ls[0].v, u: ls[0].u, carre: ls.length === 1 };
}
/** La figure dessinée a la forme annoncée (un carré est carré, un rectangle plus large que haut). */
function formeDessinee(q: Q, carre: boolean): string[] {
  const pts = (q.canvas as { points?: Record<string, { x: number; y: number }> } | undefined)?.points;
  if (!pts) return [];
  const w = Math.abs(pts.B.x - pts.A.x);
  const h = Math.abs(pts.C.y - pts.B.y);
  if (carre && w !== h) return ["carré dessiné non carré"];
  if (!carre && w <= h) return ["rectangle dessiné plus haut que large"];
  return [];
}
function corrigerQuad(q: Q, carre: boolean): string[] {
  const t = q.text;
  const p = sansPrenom(t);
  const dit = carre ? /carré/ : /rectangle/;
  // Le quadrillage.
  const cs = casesFig(q);
  if (cs) {
    if (!estPlein(cs)) return ["figure non pleine"];
    const { rangees: a, colonnes: b } = cadre(cs);
    if (carre !== (a === b)) return [`figure de ${a} sur ${b} pour un ${carre ? "carré" : "rectangle"}`];
    if (/\bcalcul\b/.test(t)) return [...p, ...verifierCalculs(q, a, b)];
    const u2 = unCarreau(t);
    if (u2) return [...p, ...verifierReponse(q, a * b, u2)];
    const u = t.match(new RegExp(`1 (${AL}) de côté`))?.[1];
    if (!u) return inconnue(q);
    if (/longueur/.test(t)) return [...p, ...verifierReponse(q, Math.max(a, b), u)];
    if (/largeur/.test(t)) return [...p, ...verifierReponse(q, Math.min(a, b), u)];
    if (/le côté/.test(t)) return [...p, ...verifierReponse(q, a, u)];
    return dit.test(t) ? [...p, ...verifierReponse(q, a * b, `${u}²`)] : inconnue(q);
  }
  // Les côtés écrits sur la figure.
  const f = cotesQuad(q);
  if (q.canvas && !f) return ["figure illisible"];
  if (f) {
    if (f.carre !== carre) return ["la figure et le texte ne parlent pas de la même forme"];
    p.push(...formeDessinee(q, carre));
    const A = f.L * f.l;
    const u2 = `${f.u}²`;
    if (/\bcalcul\b/.test(t)) return [...p, ...verifierCalculs(q, f.L, f.l)];
    const a = mesures(t, AIRE);
    if (/Vrai ou faux|Est-ce juste/.test(t)) return a.length === 1 ? [...p, ...(a[0].u === u2 ? [] : ["unité annoncée fausse"]), ...verifierVrai(q, egal(a[0].v, A))] : inconnue(q);
    if (q.format === "qcm") return [...p, ...verifierQcm(q, A, u2), ...verifierReponse(q, A, u2)];
    return [...p, ...verifierReponse(q, A, u2)];
  }
  // Le texte seul.
  const ls = mesures(t, LONGUEUR);
  if (/formule|× …|multiplié par/.test(t)) {
    if (/formule/.test(t)) return [...p, ...estLaJuste(q, carre ? "côté × côté" : "longueur × largeur")];
    return [...p, ...estLaJuste(q, carre ? "côté" : "largeur")];
  }
  if (/= …/.test(t)) {
    if (ls.length !== 2 || ls[0].u !== ls[1].u) return ["il faut deux longueurs de même unité"];
    if (!t.includes(`… ${ls[0].u}²`)) return ["l'unité du résultat n'est pas celle des côtés"];
    return [...p, ...verifierReponse(q, ls[0].v * ls[1].v, `${ls[0].u}²`)];
  }
  if (!ls.length && !mesures(t, AIRE).length) return inconnue(q);
  if (/\bcalcul\b/.test(t)) {
    if (ls.length !== (carre ? 1 : 2)) return ["côtés illisibles"];
    return [...p, ...verifierCalculs(q, ls[0].v, ls[ls.length - 1].v)];
  }
  if (/Vrai/.test(t)) {
    const a = mesures(t, AIRE);
    if (a.length !== 1 || ls.length !== (carre ? 1 : 2)) return inconnue(q);
    if (a[0].u !== `${ls[0].u}²`) return ["unité annoncée fausse"];
    return [...p, ...verifierVrai(q, egal(a[0].v, ls[0].v * ls[ls.length - 1].v))];
  }
  return inconnue(q);
}
function corrigerRectangleDeuxPas(q: Q): string[] {
  const t = q.text;
  const p = sansPrenom(t);
  const ls = mesures(t, LONGUEUR);
  const a = mesures(t, AIRE);
  let m: RegExpMatchArray | null;
  const aireDe = (L: number, l: number, u: string) => {
    const r = [...p, ...verifierReponse(q, L * l, `${u}²`)];
    if (L === l) r.push("longueur et largeur égales");
    if (l > L) r.push("la largeur dépasse la longueur");
    return r;
  };
  if (/double|fois plus grande/.test(t)) {
    if (ls.length !== 1) return inconnue(q);
    const k = /double/.test(t) ? 2 : Number(t.match(/(\d+) fois plus grande/)?.[1]);
    return aireDe(ls[0].v * k, ls[0].v, ls[0].u);
  }
  if (/de plus/.test(t)) return ls.length === 2 ? aireDe(ls[0].v + ls[1].v, ls[0].v, ls[0].u) : inconnue(q);
  if (/de moins/.test(t)) return ls.length === 2 ? aireDe(ls[0].v, ls[0].v - ls[1].v, ls[0].u) : inconnue(q);
  if (/Périmètre|de tour/.test(t)) {
    if (ls.length !== 2) return inconnue(q);
    const l = ls[0].v / 2 - ls[1].v;
    if (l <= 0) return ["le périmètre est trop court pour cette longueur"];
    return aireDe(ls[1].v, l, ls[0].u);
  }
  if (a.length === 1 && ls.length === 1) {
    const r = a[0].v / ls[0].v;
    if (!Number.isInteger(r)) return [`${a[0].v} ÷ ${ls[0].v} ne tombe pas juste`];
    if (a[0].u !== `${ls[0].u}²`) return ["unités non assorties"];
    const chercheLargeur = /largeur\.$|Largeur \?$/.test(t);
    if (chercheLargeur === r > ls[0].v) return ["longueur plus petite que la largeur"];
    return [...p, ...verifierReponse(q, r, ls[0].u)];
  }
  if ((m = t.match(/(\d+) rectangles/)) && ls.length === 2) return [...p, ...verifierReponse(q, Number(m[1]) * ls[0].v * ls[1].v, `${ls[0].u}²`)];
  return inconnue(q);
}
function corrigerCarreDeuxPas(q: Q): string[] {
  const t = q.text;
  const p = sansPrenom(t);
  if (!/carré/i.test(t)) return ["le texte ne dit pas carré"];
  const ls = mesures(t, LONGUEUR);
  const a = mesures(t, AIRE);
  let m: RegExpMatchArray | null;
  if (a.length === 1 && !ls.length) {
    const c = Math.sqrt(a[0].v);
    if (!Number.isInteger(c)) return [`${a[0].v} n'est pas le carré d'un entier`];
    const u = a[0].u.replace("²", "");
    return [...p, ...verifierReponse(q, /périmètre|tour/.test(t) ? 4 * c : c, u)];
  }
  if (a.length || !ls.length) return inconnue(q);
  const u2 = `${ls[0].u}²`;
  if (/périmètre|Périmètre|de tour/.test(t)) {
    if (ls[0].v % 4) return ["le périmètre n'est pas un multiple de 4"];
    const c = ls[0].v / 4;
    return [...p, ...verifierReponse(q, c * c, u2)];
  }
  if ((m = t.match(/(\d+) carrés/))) return [...p, ...verifierReponse(q, Number(m[1]) * ls[0].v * ls[0].v, u2)];
  if (/double/.test(t)) return [...p, ...verifierReponse(q, 4 * ls[0].v * ls[0].v, u2)];
  if (/gagne/.test(t)) return [...p, ...verifierReponse(q, (ls[0].v + ls[1].v) ** 2, u2)];
  if (ls.length !== 2) return inconnue(q);
  const [x, y] = [ls[0].v ** 2, ls[1].v ** 2];
  if (x === y) return ["deux carrés identiques"];
  if (/[Éé]cart/.test(t)) return [...p, ...verifierReponse(q, Math.abs(x - y), u2)];
  if (/totale/.test(t)) return [...p, ...verifierReponse(q, x + y, u2)];
  return inconnue(q);
}

// ----- aire_comparer
const EN_CM2: Record<string, number> = { "cm²": 1, "dm²": 100, "m²": 10000 };
const SIGNES = ["<", ">", "="];
function verifierSigne(q: Q): string[] {
  const a = mesures(q.text, AIRE);
  if (a.length !== 2) return [`il faut deux aires, lu : ${a.length}`];
  const [x, y] = [a[0].v * EN_CM2[a[0].u], a[1].v * EN_CM2[a[1].u]];
  if (!SIGNES.every((s) => (q.choices ?? []).includes(s))) return ["il manque un signe"];
  return estLaJuste(q, egal(x, y) ? "=" : x < y ? "<" : ">");
}
function corrigerComparerSigne(q: Q): string[] {
  const t = q.text;
  const p = sansPrenom(t);
  const a = mesures(t, AIRE);
  if (a.length !== 2) return [`il faut deux aires, lu : ${a.length}`];
  if (a[0].u !== a[1].u) return ["unités différentes à cette étoile"];
  if ((q.choices ?? []).includes("<")) return [...p, ...verifierSigne(q)];
  if (/Vrai ou faux/.test(t)) {
    let vrai: boolean;
    if (/plus grand que|dépasse| > /.test(t)) vrai = a[0].v > a[1].v;
    else if (/plus petit que| < /.test(t)) vrai = a[0].v < a[1].v;
    else return inconnue(q);
    if (a[0].v === a[1].v) return ["deux aires égales dans un vrai/faux"];
    return [...p, ...verifierVrai(q, vrai)];
  }
  if (/écart|différence|dépasse/.test(t)) return [...p, ...verifierReponse(q, Math.abs(a[0].v - a[1].v), a[0].u)];
  return inconnue(q);
}
function corrigerComparerListe(q: Q): string[] {
  const t = q.text;
  const p = sansPrenom(t);
  if (/Range ces aires|Classe ces aires/.test(t)) {
    const c = q.choices ?? [];
    const croissant = /de la plus petite à la plus grande/.test(t);
    if (!croissant && !/de la plus grande à la plus petite/.test(t)) return inconnue(q);
    const lit = (s: string) => mesures(s, AIRE).map((x) => x.v);
    const u = new Set(c.flatMap((s) => mesures(s, AIRE).map((x) => x.u)));
    if (u.size !== 1) return ["unités différentes dans le rangement"];
    const justes = c.filter((s) => lit(s).every((v, i, l) => i === 0 || (croissant ? l[i - 1] < v : l[i - 1] > v)));
    if (new Set(c.map((s) => [...lit(s)].sort((x, y) => x - y).join())).size !== 1) return ["les propositions ne rangent pas les mêmes aires"];
    return [...p, ...estLaJuste(q, justes.length === 1 ? justes[0] : undefined)];
  }
  const src = q.format === "qcm" ? (q.choices ?? []).join(" ; ") : t;
  const a = mesures(src, AIRE);
  if (a.length < 3 && q.format !== "qcm") return [`il faut au moins trois aires, lu : ${a.length}`];
  if (new Set(a.map((x) => x.u)).size !== 1) return ["unités différentes"];
  if (new Set(a.map((x) => x.v)).size !== a.length) return ["deux aires égales dans la liste"];
  const asc = a.map((x) => x.v).sort((x, y) => x - y);
  let r: number;
  if (/au milieu/.test(t)) r = asc[1];
  else if (/plus grande/.test(t)) r = asc[asc.length - 1];
  else if (/plus petite/.test(t)) r = asc[0];
  else return inconnue(q);
  return [...p, ...(q.format === "qcm" ? verifierQcm(q, r, a[0].u) : []), ...verifierReponse(q, r, a[0].u)];
}
function corrigerComparerFigures(q: Q): string[] {
  return corrigerDeuxFigures(q);
}
function corrigerComparerSimple(q: Q): string[] {
  const t = q.text;
  const p = sansPrenom(t);
  const grand = /[Pp]lus grand/.test(t);
  if (!grand && !/[Pp]lus petit/.test(t)) return inconnue(q);
  const c = q.choices ?? [];
  let m: RegExpMatchArray | null;
  if ((m = t.match(/A : (\d+) carreaux\. (?:Figure )?B : (\d+) carreaux/))) {
    const [a, b] = [Number(m[1]), Number(m[2])];
    if (a === b) return ["deux comptes égaux"];
    return [...p, ...estLaJuste(q, (a > b) === grand ? "la figure A" : "la figure B")];
  }
  if (/largeur|Largeurs/.test(t)) {
    const ls = mesures(t, LONGUEUR);
    if (ls.length !== 2 || !/Même longueur/.test(t)) return inconnue(q);
    return [...p, ...estLaJuste(q, `largeur ${grand ? Math.max(ls[0].v, ls[1].v) : Math.min(ls[0].v, ls[1].v)} ${ls[0].u}`)];
  }
  // Des carrés : leurs côtés, dans le texte (« côté 3 cm ou 5 cm ») ou dans les propositions.
  if (/carré/.test(t)) {
    const vals = c.map((x) => mesures(x, LONGUEUR)[0]);
    if (vals.some((x) => !x) || new Set(vals.map((x) => x.u)).size !== 1) return [`propositions illisibles : ${c.join(" | ")}`];
    const lus = mesures(t, LONGUEUR);
    if (lus.length && lus.length !== vals.length) return ["texte et propositions ne citent pas les mêmes carrés"];
    if (new Set(vals.map((x) => x.v)).size !== vals.length) return ["deux carrés identiques"];
    const v = vals.map((x) => x.v);
    return [...p, ...estLaJuste(q, `côté ${grand ? Math.max(...v) : Math.min(...v)} ${vals[0].u}`)];
  }
  return inconnue(q);
}
function corrigerComparerCalcule(q: Q): string[] {
  const t = q.text;
  const p = sansPrenom(t);
  const c = q.choices ?? [];
  const NBU = `(${NBA}) (${AL})`;
  const carre = t.match(new RegExp(`[Cc]arré de côté ${NBU}`));
  const rect = t.match(new RegExp(`[Rr]ectangle de ${NBU} sur ${NBU}`));
  const grand = /Plus grande/.test(t);
  if (carre && rect) {
    const Ac = val(carre[1]) ** 2;
    const Ar = val(rect[1]) * val(rect[3]);
    if (carre[2] !== rect[2] || rect[2] !== rect[4]) return ["unités différentes"];
    if (/Même aire/.test(t)) return [...p, ...verifierVrai(q, Ac === Ar)];
    if (!grand && !/Plus petite/.test(t)) return inconnue(q);
    return [...p, ...estLaJuste(q, Ac === Ar ? "la même aire" : (Ac > Ar) === grand ? "le carré" : "le rectangle")];
  }
  const A = t.match(new RegExp(`A : ${NBU} sur ${NBU}`));
  const B = t.match(new RegExp(`B : ${NBU} sur ${NBU}`));
  if (!A || !B) return inconnue(q);
  const [x, y] = [val(A[1]) * val(A[3]), val(B[1]) * val(B[3])];
  if (val(A[1]) === val(B[1]) && val(A[3]) === val(B[3])) return ["deux rectangles identiques"];
  if (/Même aire/.test(t)) return [...p, ...verifierVrai(q, x === y)];
  if (/Compare\./.test(t)) return [...p, ...estLaJuste(q, x === y ? "aires égales" : x > y ? "aire de A > aire de B" : "aire de A < aire de B")];
  if (!grand && !/Plus petite/.test(t)) return inconnue(q);
  return [...p, ...estLaJuste(q, x === y ? "la même aire" : (x > y) === grand ? "le rectangle A" : "le rectangle B"), ...(c.length === 3 ? [] : ["il faut trois propositions"])];
}
function corrigerComparerUnites(q: Q): string[] {
  const t = q.text;
  const p = sansPrenom(t);
  const a = mesures(t, AIRE);
  if (a.length !== 2) return [`il faut deux aires, lu : ${a.length}`];
  if ((q.choices ?? []).includes("<")) return [...p, ...verifierSigne(q)];
  const [x, y] = [a[0].v * EN_CM2[a[0].u], a[1].v * EN_CM2[a[1].u]];
  if (egal(x, y)) return ["les deux aires sont égales"];
  const grand = /plus grande/.test(t);
  if (!grand && !/plus petite/.test(t)) return inconnue(q);
  const r = (x > y) === grand ? a[0] : a[1];
  return [...p, ...verifierReponse(q, r.v, r.u)];
}
function corrigerComparerEcart(q: Q): string[] {
  const t = q.text;
  const p = sansPrenom(t);
  if (/Range ces aires|Classe ces aires|plus grande aire|plus petite aire|plus grande de|plus petite de|plus grande :|plus petite :/.test(t)) return corrigerComparerListe(q);
  const a = mesures(t, AIRE);
  let m: RegExpMatchArray | null;
  if ((m = t.match(/A : (\S+) (cm²|dm²|m²)\. B : (\d+) fois plus (grande|petite)/))) {
    const r = m[4] === "grande" ? val(m[1]) * Number(m[3]) : val(m[1]) / Number(m[3]);
    if (!Number.isInteger(r)) return ["le partage ne tombe pas juste"];
    return [...p, ...verifierReponse(q, r, m[2])];
  }
  if (a.length !== 2) return [`il faut deux aires, lu : ${a.length}`];
  if (a[0].u !== a[1].u) return ["unités différentes"];
  if (/fois/.test(t)) {
    const [G, P] = [Math.max(a[0].v, a[1].v), Math.min(a[0].v, a[1].v)];
    if (!Number.isInteger(G / P)) return [`${G} ÷ ${P} ne tombe pas juste`];
    return [...p, ...verifierNombre(q, G / P)];
  }
  if (/manque|dépasse|différence|Écart/.test(t)) return [...p, ...verifierReponse(q, Math.abs(a[0].v - a[1].v), a[0].u)];
  return inconnue(q);
}

// ----- aire_probleme ★2
function corrigerProblemeNeuf(q: Q): string[] {
  const t = q.text;
  const p = sansPrenom(t);
  const NBU = `(${NBA}) (${AL})`;
  const a = mesures(t, AIRE);
  const ls = mesures(t, LONGUEUR);
  const unites = new Set([...ls.map((x) => x.u), ...a.map((x) => x.u.replace("²", ""))]);
  if (unites.size > 1) return [`plusieurs unités dans le problème : ${[...unites].join(", ")}`];
  const u = [...unites][0];
  if (!u) return inconnue(q);
  const u2 = `${u}²`;
  const rect = t.match(new RegExp(`rectangles? de ${NBU} sur ${NBU}`, "i"));
  const carres = [...t.matchAll(new RegExp(`carrés? de (?:côté )?${NBU}|carrés? de ${NBU} de côté`, "gi"))].map((m) => val(m[1] ?? m[3]));
  let m: RegExpMatchArray | null;
  const R = rect ? { L: val(rect[1]), l: val(rect[3]) } : null;
  if (R && R.L <= R.l) return ["longueur et largeur à l'envers ou égales"];
  const verifie = (v: number, un = u2) => [...p, ...verifierReponse(q, v, un)];

  // Les carreaux.
  if (/Combien de carrés de 1|carrés de 1/.test(t)) {
    if (R) return [...p, ...verifierNombre(q, R.L * R.l)];
    const c = t.match(new RegExp(`carré de (?:côté )?${NBU}`));
    return c ? [...p, ...verifierNombre(q, val(c[1]) ** 2)] : inconnue(q);
  }
  if (/carreaux?/.test(t)) {
    if (R) {
      const k = a[0]?.v;
      if (a.length !== 1 || (R.L * R.l) % k) return ["le partage en carreaux ne tombe pas juste"];
      return [...p, ...verifierNombre(q, (R.L * R.l) / k)];
    }
    if (a.length !== 2) return inconnue(q);
    const [G, P] = [Math.max(a[0].v, a[1].v), Math.min(a[0].v, a[1].v)];
    if (G % P) return ["le partage en carreaux ne tombe pas juste"];
    return [...p, ...verifierNombre(q, G / P)];
  }
  // Modifier un côté.
  if (R && (m = t.match(/La (longueur|largeur) (double|triple)/))) return verifie((m[2] === "double" ? 2 : 3) * R.L * R.l);
  if (R && (m = t.match(new RegExp(`ajoute ${NBU} à la (longueur|largeur)`)))) return verifie(m[3] === "longueur" ? (R.L + val(m[1])) * R.l : R.L * (R.l + val(m[1])));
  if (R && (m = t.match(new RegExp(`(longueur|largeur) gagne ${NBU}`)))) {
    const k = val(m[2]);
    if (/gagnée/.test(t)) return verifie(m[1] === "longueur" ? k * R.l : k * R.L);
    return verifie(m[1] === "longueur" ? (R.L + k) * R.l : R.L * (R.l + k));
  }
  if (/Son côté double/.test(t) && carres.length === 1) return verifie(4 * carres[0] ** 2);
  if ((m = t.match(new RegExp(`gagne ${NBU} de côté`))) && carres.length === 1) return verifie((carres[0] + val(m[1])) ** 2);
  // Partager.
  if ((m = t.match(/coupé en (\d+) parts/))) {
    const tout = R ? R.L * R.l : carres.length === 1 ? carres[0] ** 2 : NaN;
    const r = tout / Number(m[1]);
    if (!Number.isInteger(r)) return ["le partage ne tombe pas juste"];
    return verifie(r);
  }
  // Enlever une figure.
  if (/moins/.test(t)) {
    if (R && carres.length === 1) {
      if (carres[0] >= R.l) return ["le carré retiré ne tient pas"];
      return verifie(R.L * R.l - carres[0] ** 2);
    }
    if (carres.length === 2) {
      if (carres[1] >= carres[0]) return ["le carré retiré ne tient pas"];
      return verifie(carres[0] ** 2 - carres[1] ** 2);
    }
    return inconnue(q);
  }
  // Colorier, couvrir : ce qui reste.
  if (/reste/.test(t)) {
    if (R && a.length === 1) return a[0].v < R.L * R.l ? verifie(R.L * R.l - a[0].v) : ["la part coloriée dépasse le rectangle"];
    if (a.length === 2) return a[0].v > a[1].v ? verifie(a[0].v - a[1].v) : ["la part faite dépasse le total"];
    return inconnue(q);
  }
  // Retrouver un côté, un périmètre, une aire.
  if (/[Pp]érimètre|de tour|son tour/.test(t) && a.length === 1 && /carré/i.test(t)) {
    const c = Math.sqrt(a[0].v);
    return Number.isInteger(c) ? verifie(4 * c, u) : [`${a[0].v} n'est pas le carré d'un entier`];
  }
  if (/[Pp]érimètre|de tour/.test(t)) {
    if (/carré/i.test(t) && ls.length === 1) {
      if (ls[0].v % 4) return ["périmètre non multiple de 4"];
      return verifie((ls[0].v / 4) ** 2);
    }
    if (ls.length === 2) {
      const autre = ls[0].v / 2 - ls[1].v;
      if (autre <= 0) return ["périmètre trop court"];
      return verifie(ls[1].v * autre);
    }
    return inconnue(q);
  }
  if (a.length === 1 && ls.length === 1) {
    const r = a[0].v / ls[0].v;
    return Number.isInteger(r) ? verifie(r, u) : [`${a[0].v} ÷ ${ls[0].v} ne tombe pas juste`];
  }
  if (a.length === 1 && /carré/i.test(t) && /côté/.test(t)) {
    const c = Math.sqrt(a[0].v);
    return Number.isInteger(c) ? verifie(c, u) : [`${a[0].v} n'est pas le carré d'un entier`];
  }
  // Assembler.
  if (/total|des deux|réunit/i.test(t)) {
    if (a.length === 2) return verifie(a[0].v + a[1].v);
    const n = Number(t.match(/\b(\d+) (?:carrés|rectangles)\b/)?.[1] ?? 1);
    if (R && carres.length === 1) return verifie(R.L * R.l + carres[0] ** 2);
    if (R) return verifie(n * R.L * R.l);
    if (carres.length === 1) return verifie(n * carres[0] ** 2);
    return inconnue(q);
  }
  if ((m = t.match(/l’aire de (\d+) (carrés|rectangles)/))) {
    if (R) return verifie(Number(m[1]) * R.L * R.l);
    if (carres.length === 1) return verifie(Number(m[1]) * carres[0] ** 2);
  }
  return inconnue(q);
}

export const CORRECTEURS: CorrecteursMaths = {
  // ⭐ 07/11/2026
  aire_comprendre_tpl_e1_mesure: corrigerComprendreSens,
  aire_comprendre_tpl_e1_vrai: corrigerComprendreSens,
  aire_comprendre_tpl_e1_unite: corrigerComprendreSens,
  aire_compter_tpl_e1_figure: corrigerCompterFigure,
  aire_compter_tpl_e1_texte: corrigerCompterTexte,
  aire_compter_tpl_e1_deux: corrigerDeuxFigures,
  aire_compter_tpl_e1_rect: corrigerCompterRectangle,
  aire_compter_tpl_e2_rangees: corrigerCompterRangees,
  aire_compter_tpl_e2_valeur: corrigerCompterValeur,
  aire_compter_tpl_e2_manque: corrigerCompterManque,
  aire_rectangle_tpl_e1_calcul: (q) => corrigerQuad(q, false),
  aire_rectangle_tpl_e1_lire: (q) => corrigerQuad(q, false),
  aire_rectangle_tpl_e1_grille: (q) => corrigerQuad(q, false),
  aire_rectangle_tpl_e2_calcul: (q) => corrigerQuad(q, false),
  aire_rectangle_tpl_e2_lire: (q) => corrigerQuad(q, false),
  aire_rectangle_tpl_e2_grille: (q) => corrigerQuad(q, false),
  aire_rectangle_tpl_e2_deuxpas: corrigerRectangleDeuxPas,
  aire_carre_tpl_e1_calcul: (q) => corrigerQuad(q, true),
  aire_carre_tpl_e1_lire: (q) => corrigerQuad(q, true),
  aire_carre_tpl_e1_grille: (q) => corrigerQuad(q, true),
  aire_carre_tpl_e2_calcul: (q) => corrigerQuad(q, true),
  aire_carre_tpl_e2_lire: (q) => corrigerQuad(q, true),
  aire_carre_tpl_e2_grille: (q) => corrigerQuad(q, true),
  aire_carre_tpl_e2_deuxpas: corrigerCarreDeuxPas,
  aire_comparer_tpl_e1_signe: corrigerComparerSigne,
  aire_comparer_tpl_e1_liste: corrigerComparerListe,
  aire_comparer_tpl_e1_figures: corrigerComparerFigures,
  aire_comparer_tpl_e1_simple: corrigerComparerSimple,
  aire_comparer_tpl_e2_figures: corrigerComparerFigures,
  aire_comparer_tpl_e2_calcule: corrigerComparerCalcule,
  aire_comparer_tpl_e2_unites: corrigerComparerUnites,
  aire_comparer_tpl_e2_ecart: corrigerComparerEcart,
  aire_probleme_tpl_e2_assembler: corrigerProblemeNeuf,
  aire_probleme_tpl_e2_reste: corrigerProblemeNeuf,
  aire_probleme_tpl_e2_retrouver: corrigerProblemeNeuf,
  aire_probleme_tpl_e2_carreaux: corrigerProblemeNeuf,
  aire_probleme_tpl_e2_modifier: corrigerProblemeNeuf,
  aire_defi_tpl_e4: corrigerDefiPieges,
  aire_defi_tpl_1: corrigerCoteManquant,
  aire_defi_tpl_2: corrigerCarreInverse,
  aire_probleme_tpl_e2: corrigerProbleme,
  aire_probleme_tpl_ctx3: corrigerProbleme,
  aire_comparer_tpl_ctx3: corrigerComparerDeux,
  aire_compter_tpl_ctx3: corrigerCompter,
  aire_comprendre_tpl_ctx3: corrigerComprendre,
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
