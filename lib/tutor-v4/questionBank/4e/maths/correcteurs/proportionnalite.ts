import type { CorrecteursMaths } from "./types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import {
  avecRegleMotsCles,
  lireNombre,
  qcmUnique as qcmUniqueBrut,
  uniteAttendue,
} from "@/lib/tutor-v4/questionBank/6e/maths/correcteurs/pourcentages";

// LES CORRECTEURS DE proportionnalite.bank.ts — 4e, notions prop_proportionnalite
// et prop_pourcentages (07/10/2026, voir 6e/maths/correcteurs/types.ts).
// Chacun relit ce que voit l'élève — les nombres DU TEXTE avec le mot qui les
// suit (« 7 kg », « 14 € »), le TABLEAU ou les POINTS du graphique — refait le
// calcul sans passer par le gabarit, et rend la liste des problèmes (vide =
// juste) : bonne réponse, une seule proposition juste, unité de la réponse,
// nombres plausibles. Jamais la formule du gabarit.

type Q = TutorGeneratedQuestionV4;

/** Exactement une proposition juste, et c'est l'attendue ; « oui » et « oui  » sont la même proposition. */
const qcmUnique = (q: Q, juste: (c: string) => boolean) => qcmUniqueBrut(q, (c) => juste(c.trim()));

// ─── Lecture ───────────────────────────────────────────────────────────────

const num = (s: string) => Number(s.replace(",", "."));
const egal = (a: number | null | undefined, b: number | null | undefined) =>
  a != null && b != null && Number.isFinite(a) && Number.isFinite(b) && Math.abs(a - b) < 1e-6;
const deuxDecimales = (x: number) => Math.abs(x * 100 - Math.round(x * 100)) < 1e-6;
const entier = (x: number) => Math.abs(x - Math.round(x)) < 1e-6;

/** Les années (« En 2015 », « celui de 2015 ») ne sont pas des données. */
// ⚠️ Pas « de 2000 » en général : « est de 2000 km » est une donnée.
const sansAnnees = (t: string) => t.replace(/\b(En|en) (19|20)\d\d,/g, "$1 ANNÉE,").replace(/\bcelui de (19|20)\d\d\b/g, "celui de ANNÉE");

/** Tous les nombres du texte, dans l'ordre. */
function nombres(t: string): number[] {
  return (sansAnnees(t).match(/\d+(?:,\d+)?/g) ?? []).map(num);
}

/** Les nombres suivis de « % » et les autres. */
function donnees(t: string) {
  const pcts: number[] = [];
  const autres: { v: number; i: number }[] = [];
  const s = sansAnnees(t);
  for (const m of s.matchAll(/\d+(?:,\d+)?/g)) {
    if (/^\s?%/.test(s.slice(m.index! + m[0].length))) pcts.push(num(m[0]));
    else autres.push({ v: num(m[0]), i: m.index! });
  }
  return { pcts, autres };
}

const UNITES: Record<string, string> = { minutes: "min", heures: "h" };

/** Chaque nombre avec le mot qui le suit : « 7 kg » → { 7, kg } ; « 5 de ces ballons » → ballons. */
function grandeurs(t: string): { v: number; u: string; i: number }[] {
  const out: { v: number; u: string; i: number }[] = [];
  for (const m of sansAnnees(t).matchAll(/(\d+(?:,\d+)?)\s+(?:de ces\s+)?([^\s,.;:?!()]+)/g))
    out.push({ v: num(m[1]), u: UNITES[m[2]] ?? m[2], i: m.index! });
  return out;
}

/** Le mot qui suit le nombre écrit à la position i (« 30 % de 30 » : le second 30 n'a pas d'unité). */
const uniteA = (t: string, i: number) => grandeurs(t).find((g) => g.i === i)?.u ?? "";

/** Les unités de MESURE qu'on écrit dans la réponse ; un dénombrement n'en a pas. */
const MESURES = new Set(["€", "km", "m", "cm", "g", "kg", "L", "mL", "kWh", "m²", "h", "min", "%", "Go", "tonnes", "hectares"]);

function verifierUnite(q: Q, u: string): string[] {
  const voulu = MESURES.has(u) ? u : "";
  const lu = uniteAttendue(q);
  return lu === voulu ? [] : [`unité de la réponse « ${lu} » au lieu de « ${voulu} »`];
}

/** Réponse courte : la bonne valeur, deux décimales au plus, la bonne unité. */
function verifierReponse(q: Q, juste: number | null, unite: string, quoi: string): string[] {
  if (juste == null || !Number.isFinite(juste)) return [`calcul impossible à refaire (${quoi})`];
  const p: string[] = [];
  if (!deuxDecimales(juste)) p.push(`réponse ${juste} : plus de deux décimales (${quoi})`);
  if (juste <= 0) p.push(`réponse ${juste} : pas plausible (${quoi})`);
  if (!egal(lireNombre(String(q.expected[0])), juste)) p.push(`attendu « ${q.expected[0]} », le texte donne ${juste} (${quoi})`);
  if (q.format === "qcm") p.push("QCM inattendu pour une réponse numérique");
  return [...p, ...verifierUnite(q, unite)];
}

/** Deux réponses possibles : oui/non ou vrai/faux. */
const ouiNon = (q: Q, vrai: boolean) =>
  qcmUnique(q, (c) => (vrai ? c === "oui" || c === "vrai" : c === "non" || c === "faux"));

// ─── Proportionnalité : relevés, tableaux, coefficient, quatrième ──────────

/** Reconnaître : les relevés (n → m) ont-ils tous le même quotient ? */
function cReconnaitre(q: Q): string[] {
  const ns = nombres(q.text);
  if (ns.length < 4 || ns.length % 2) return [`relevés illisibles : ${ns.join(", ")}`];
  const h = ns.length / 2;
  const enTableau = /tableau :/.test(q.text);
  const A = enTableau ? ns.slice(0, h) : ns.filter((_, i) => i % 2 === 0);
  const B = enTableau ? ns.slice(h) : ns.filter((_, i) => i % 2 === 1);
  const p: string[] = [];
  if (new Set(A).size !== A.length) p.push("deux relevés pour la même quantité");
  const prop = A.every((a, i) => egal(B[i] * A[0], B[0] * a));
  return [...p, ...ouiNon(q, prop)];
}

/** Le tableau 2 × 2 (canvas ou décrit dans le texte), une case « ? ». */
function grille(q: Q): (number | null)[][] | null {
  const c = q.canvas as { kind?: string; values?: string[][] } | undefined;
  if (c?.kind === "tableau_proportionnalite" && c.values) return c.values.map((r) => r.map((v) => (v === "?" ? null : num(v))));
  const m = q.text.match(/: (\d+|\?) et (\d+|\?) ; [^:]+: (\d+|\?) et (\d+|\?)/);
  if (!m) return null;
  const v = m.slice(1).map((x) => (x === "?" ? null : num(x)));
  return [
    [v[0], v[1]],
    [v[2], v[3]],
  ];
}

/** Case manquante d'un tableau de proportionnalité (colonnes = couples) : a × d = b × c. */
function cTableau(q: Q): string[] {
  const g = grille(q);
  if (!g || g.length !== 2 || g[0].length !== 2) return ["tableau illisible"];
  const [[a, b], [c, d]] = g;
  const vides = [a, b, c, d].filter((x) => x == null).length;
  if (vides !== 1) return [`${vides} case(s) vide(s) au lieu d'une`];
  const juste = a == null ? (b! * c!) / d! : b == null ? (a * d!) / c! : c == null ? (a * d!) / b : (b * c) / a;
  const p: string[] = [];
  const cv = q.canvas as { missing?: { row: number; col: number }[]; values?: string[][] } | undefined;
  if (cv?.missing) {
    const ms = cv.missing[0];
    if (!ms || cv.values?.[ms.row]?.[ms.col] !== "?") p.push("la case surlignée n'est pas la case vide");
  }
  if (!entier(juste)) p.push(`la case vide vaut ${juste} : pas entière`);
  return [...p, ...verifierReponse(q, juste, "", "case du tableau")];
}

/** Un couple (a, b) de deux grandeurs, puis une quantité t de l'une : la valeur de l'autre. */
function convertir(a: { v: number; u: string }, b: { v: number; u: string }, t: { v: number; u: string }) {
  if (a.u === b.u) return null;
  if (t.u === a.u) return { v: (t.v * b.v) / a.v, u: b.u };
  if (t.u === b.u) return { v: (t.v * a.v) / b.v, u: a.u };
  return null;
}

/** Quatrième proportionnelle (texte ou tableau). */
function cQuatrieme(q: Q): string[] {
  if (q.canvas) return cTableau(q);
  const gs = grandeurs(q.text);
  if (gs.length !== 3) return [`trois données attendues, lues : ${gs.map((x) => `${x.v} ${x.u}`).join(", ")}`];
  const r = convertir(gs[0], gs[1], gs[2]);
  if (!r) return [`unités illisibles : ${gs.map((x) => `${x.v} ${x.u}`).join(", ")}`];
  return verifierReponse(q, r.v, r.u, "quatrième proportionnelle");
}

/** Problèmes : quatrième proportionnelle, ou différence / somme de deux valeurs. */
function cProbleme(q: Q): string[] {
  const gs = grandeurs(q.text);
  // ⚠️ « consomme » contient « somme » : on cherche la consigne entière.
  const deux = /la différence entre|la somme des deux/.test(q.text);
  if (gs.length !== (deux ? 4 : 3)) return [`données illisibles : ${gs.map((x) => `${x.v} ${x.u}`).join(", ")}`];
  if (!deux) return cQuatrieme(q);
  const r1 = convertir(gs[0], gs[1], gs[2]);
  const r2 = convertir(gs[0], gs[1], gs[3]);
  if (!r1 || !r2 || r1.u !== r2.u) return ["unités illisibles"];
  const diff = /la différence entre/.test(q.text);
  return verifierReponse(q, diff ? r1.v - r2.v : r1.v + r2.v, r1.u, diff ? "différence" : "somme");
}

/** Le coefficient (valeur pour une unité), ou son usage. */
function cCoeff(q: Q): string[] {
  const t = q.text;
  const gs = grandeurs(t);
  // « … le prix d’un kilogramme est de 3 €. Calcule le prix de 5 kg » : on l'applique.
  if (/est de \d+ [^.]*\. Calcule/.test(t)) {
    if (gs.length !== 2) return ["deux données attendues"];
    return verifierReponse(q, gs[0].v * gs[1].v, gs[0].u, "coefficient appliqué");
  }
  // « … Surface (m²) : 8 ; Graines (g) : 240. Par quel nombre multiplie-t-on la première ligne… »
  if (/première ligne/.test(t)) {
    const ns = nombres(t);
    if (ns.length !== 2) return ["deux nombres attendus"];
    const k = ns[1] / ns[0];
    return [...(entier(k) ? [] : [`coefficient ${k} pas entier`]), ...verifierReponse(q, k, "", "coefficient")];
  }
  if (gs.length !== 2 || gs[0].u === gs[1].u) return [`deux grandeurs attendues, lues : ${gs.map((x) => `${x.v} ${x.u}`).join(", ")}`];
  const [petit, grand] = gs[0].v < gs[1].v ? gs : [gs[1], gs[0]];
  const k = grand.v / petit.v;
  const p = entier(k) ? [] : [`coefficient ${k} pas entier`];
  // « Quel coefficient… » : un nombre seul ; « Quel est le prix d’un ballon ? » : une mesure.
  return [...p, ...verifierReponse(q, k, /coefficient/.test(t) ? "" : grand.u, "valeur pour une unité")];
}

/** Un élève affirme une valeur : a-t-il raison ? (on ne lit que ce qui précède « , car »). */
function cAffirmation(q: Q): string[] {
  const gs = grandeurs(q.text.split(", car")[0]);
  if (gs.length !== 4) return [`quatre données attendues, lues : ${gs.map((x) => `${x.v} ${x.u}`).join(", ")}`];
  const r = convertir(gs[0], gs[1], gs[2]);
  if (!r) return ["unités illisibles"];
  // « bat 240 fois » / « 243 battements » : même grandeur, deux mots ; seule une MESURE doit coïncider.
  const memeUnite = r.u === gs[3].u || (!MESURES.has(r.u) && !MESURES.has(gs[3].u));
  const p: string[] = memeUnite ? [] : [`la valeur affirmée est en « ${gs[3].u} », on attend « ${r.u} »`];
  return [...p, ...ouiNon(q, egal(r.v, gs[3].v))];
}

/** Deux situations : laquelle a la plus grande (petite) valeur pour une unité ? */
function cComparer(q: Q): string[] {
  const [, a, b] = q.text.split(/Situation [AB] :/);
  if (!a || !b) return ["situations illisibles"];
  const gA = grandeurs(a);
  const gB = grandeurs(b);
  if (gA.length !== 2 || gB.length !== 2) return ["deux données par situation attendues"];
  const [pA, GA] = gA[0].v < gA[1].v ? gA : [gA[1], gA[0]];
  const GB = gB.find((x) => x.u === GA.u);
  const pB = gB.find((x) => x.u === pA.u);
  if (!GB || !pB || GA.u === pA.u) return ["unités des deux situations différentes"];
  const kA = GA.v / pA.v;
  const kB = GB.v / pB.v;
  const grand = /plus grand/.test(q.text);
  const juste = egal(kA, kB) ? "c’est pareil dans les deux" : (grand ? kA > kB : kA < kB) ? "situation A" : "situation B";
  return qcmUnique(q, (c) => c === juste);
}

// ─── Graphiques ────────────────────────────────────────────────────────────

type Repere = { titre?: string; points?: { x: number; y: number }[]; misesEnEvidence?: { verticale?: { x: number }; horizontale?: { y: number } }[] };

function repere(q: Q) {
  const c = q.canvas as (Repere & { kind?: string }) | undefined;
  if (c?.kind !== "fonctionGraphique" || !c.points?.length) return null;
  const pts = [...c.points].sort((u, v) => u.x - v.x);
  const [hautT, basT] = (c.titre ?? "").split(" selon ");
  const unite = (s?: string) => s?.match(/\(([^)]+)\)/)?.[1] ?? "";
  return { pts, c, uy: unite(hautT), ux: unite(basT) };
}

/** Les points sont-ils alignés ? Passent-ils par l'origine ? */
function forme(pts: { x: number; y: number }[]) {
  const [p0, p1] = pts;
  const a = (p1.y - p0.y) / (p1.x - p0.x);
  const alignes = pts.every((p) => egal(p.y - p0.y, a * (p.x - p0.x)));
  const b = p0.y - a * p0.x;
  return { alignes, origine: alignes && egal(b, 0), a, b };
}

function cGraphReconnaitre(q: Q): string[] {
  const r = repere(q);
  if (!r) return cProbleme(q);
  const f = forme(r.pts);
  const classe = (c: string) => (/^Oui/.test(c) ? "prop" : /ne sont pas alignés/.test(c) ? "courbe" : /pas avec l'origine/.test(c) ? "affine" : "?");
  const juste = f.origine ? "prop" : f.alignes ? "affine" : "courbe";
  const p = r.pts.some((pt) => pt.y > (r.c as { ymax?: number }).ymax!) ? ["un point sort du repère"] : [];
  return [...p, ...qcmUnique(q, (c) => classe(c) === juste)];
}

function cGraphLire(q: Q, sens: "x" | "y"): string[] {
  const r = repere(q);
  if (!r) return ["graphique absent"];
  const ns = nombres(q.text);
  if (ns.length !== 1) return [`un nombre attendu dans le texte, lus : ${ns.join(", ")}`];
  const pt = r.pts.find((p) => (sens === "x" ? egal(p.x, ns[0]) : egal(p.y, ns[0])));
  if (!pt) return [`aucun point du graphique pour ${ns[0]}`];
  const trait = r.c.misesEnEvidence?.[0];
  const p: string[] = [];
  if (sens === "x" && !egal(trait?.verticale?.x, ns[0])) p.push("le trait rouge ne part pas de la valeur demandée");
  if (sens === "y" && !egal(trait?.horizontale?.y, ns[0])) p.push("le trait rouge ne part pas de la valeur demandée");
  if (!forme(r.pts).origine) p.push("le graphique n'est pas une droite par l'origine");
  return [...p, ...(sens === "x" ? verifierReponse(q, pt.y, r.uy, "lecture d'ordonnée") : verifierReponse(q, pt.x, r.ux, "lecture d'abscisse"))];
}

function cGraphCoeff(q: Q): string[] {
  const r = repere(q);
  if (!r) return ["graphique absent"];
  const pt = r.pts.find((p) => egal(p.x, 1));
  if (!pt) return ["aucun point d'abscisse 1"];
  const p = forme(r.pts).origine ? [] : ["le graphique n'est pas une droite par l'origine"];
  return [...p, ...verifierReponse(q, pt.y, r.uy, "valeur pour une unité")];
}

function cGraphVraiFaux(q: Q): string[] {
  const r = repere(q);
  if (!r) return ["graphique absent"];
  const y = (x: number) => r.pts.find((p) => egal(p.x, x))?.y;
  const phrase = q.text.match(/« (.+) »/)?.[1] ?? "";
  let vrai: boolean;
  if (/double/.test(phrase)) vrai = egal(y(2), 2 * (y(1) ?? NaN)) && egal(y(4), 2 * (y(2) ?? NaN));
  else if (/Pour 0/.test(phrase)) vrai = egal(y(0), 0);
  else if (/proportionnel/.test(phrase)) vrai = forme(r.pts).origine;
  else return [`affirmation illisible : « ${phrase} »`];
  const p: string[] = [];
  if (/^(La|L'|la) /.test(phrase) && /proportionnel /.test(phrase + " ")) p.push("accord : « proportionnelle » attendu");
  if (/^(Le) /.test(phrase) && /proportionnelle/.test(phrase)) p.push("accord : « proportionnel » attendu");
  return [...p, ...ouiNon(q, vrai)];
}

// ─── Relation y = k × x ────────────────────────────────────────────────────

/** Une formule « y = 3 × x », « y = x + 6 », « y = x ÷ 2 » appliquée à des couples (gauche ← droite). */
function formuleVraie(f: string, couples: Record<string, number>[]): boolean | null {
  let m: RegExpMatchArray | null;
  const test = (g: string, d: string, calc: (v: number) => number) => couples.every((c) => c[g] != null && c[d] != null && egal(c[g], calc(c[d])));
  if ((m = f.match(/^(\w) = (\d+) × (\w)$/))) return test(m[1], m[3], (v) => Number(m![2]) * v);
  if ((m = f.match(/^(\w) = (\w) \+ (\d+)$/))) return test(m[1], m[2], (v) => v + Number(m![3]));
  if ((m = f.match(/^(\w) = (\w) ÷ (\d+)$/))) return test(m[1], m[2], (v) => v / Number(m![3]));
  return null;
}

function couplesDuTableau(q: Q): Record<string, number>[] | null {
  const c = q.canvas as { kind?: string; rowLabels?: string[]; values?: string[][] } | undefined;
  if (c?.kind !== "tableau_proportionnalite" || !c.values || !c.rowLabels) return null;
  const [X, Y] = c.rowLabels;
  return c.values[0].map((v, j) => ({ [X]: num(v), [Y]: num(c.values![1][j]) }));
}

function cFormules(q: Q, couples: Record<string, number>[] | null): string[] {
  if (!couples?.length) return ["valeurs illisibles"];
  const p: string[] = [];
  for (const c of q.choices ?? []) if (formuleVraie(c, couples) == null) p.push(`formule illisible : « ${c} »`);
  return [...p, ...qcmUnique(q, (c) => formuleVraie(c, couples) === true)];
}

function cRelationPaire(q: Q): string[] {
  const x = q.text.match(/x = (\d+)/)?.[1];
  const y = q.text.match(/y = (\d+)/)?.[1];
  if (!x || !y) return ["x et y illisibles"];
  const k = Number(y) / Number(x);
  return [...(entier(k) ? [] : [`k = ${k} pas entier`]), ...verifierReponse(q, k, "", "coefficient y ÷ x")];
}

function cRelationTableau(q: Q): string[] {
  const c = couplesDuTableau(q);
  if (!c) return ["tableau absent"];
  const ks = c.map((col) => col.y / col.x);
  const p = ks.every((k) => egal(k, ks[0])) ? [] : ["le tableau n'est pas un tableau de proportionnalité"];
  if (q.format === "qcm") return [...p, ...cFormules(q, c)];
  return [...p, ...verifierReponse(q, ks[0], "", "coefficient du tableau")];
}

function cRelationGraphique(q: Q): string[] {
  const r = repere(q);
  if (!r) return ["graphique absent"];
  return cFormules(q, r.pts.map((pt) => ({ x: pt.x, y: pt.y })));
}

// ─── Pourcentages ──────────────────────────────────────────────────────────

/** p % d'un tout, le pourcentage d'une part, le tout retrouvé, la fraction. */
function cPourcentage(q: Q): string[] {
  let t = q.text;
  const p: string[] = [];
  // « Sachant que 20 % = 1/5, … » : l'aide doit être juste.
  const aide = t.match(/Sachant que (\d+) % = (\d+)\/(\d+)/);
  if (aide) {
    if (!egal(Number(aide[2]) / Number(aide[3]), Number(aide[1]) / 100)) p.push(`aide fausse : ${aide[0]}`);
    t = t.replace(aide[0], "");
  }
  const { pcts, autres } = donnees(t.replace(/\d+\/\d+/g, ""));
  if (q.format === "qcm") {
    if (pcts.length !== 1) return [...p, "un pourcentage attendu"];
    return [
      ...p,
      ...qcmUnique(q, (c) => {
        const m = c.match(/^(\d+)\/(\d+)$/);
        return !!m && egal(Number(m[1]) / Number(m[2]), pcts[0] / 100);
      }),
    ];
  }
  if (pcts.length === 0) {
    if (autres.length !== 2) return [...p, "un total et une part attendus"];
    const [N, x] = autres.map((a) => a.v);
    if (x >= N) p.push("la part dépasse le total");
    return [...p, ...verifierReponse(q, (100 * x) / N, "%", "part en pourcentage")];
  }
  if (pcts.length !== 1 || autres.length !== 1) return [...p, `données illisibles : ${nombres(t).join(", ")}`];
  const pc = pcts[0];
  const v = autres[0].v;
  // Le nombre AVANT le pourcentage dans la même phrase (« 320 habitants…, soit 40 % ») : c'est la part, on cherche le tout.
  const iPct = sansAnnees(t).search(/\d+(?:,\d+)? ?%/);
  const entre = sansAnnees(t).slice(autres[0].i, iPct);
  const total = autres[0].i < iPct && !/[.?!]\s/.test(entre);
  const juste = total ? (v * 100) / pc : (v * pc) / 100;
  const u = uniteA(t, autres[0].i);
  if (!MESURES.has(u) && !entier(juste)) p.push(`${juste} ${u} : pas un nombre entier`);
  return [...p, ...verifierReponse(q, juste, u, total ? "le tout retrouvé" : `${pc} % de ${v}`)];
}

/**
 * Borne de plausibilité des comparaisons « ceci vaut p % de cela » (07/10/2026) :
 * une boulangerie ne vend pas le dimanche 5 % de ses baguettes du lundi, un plant
 * de tomate ne rapetisse pas l'été, des panneaux solaires ne disparaissent pas.
 */
const BORNES_COMPARAISON: [RegExp, number, number][] = [
  [/club de judo/, 50, 150],
  [/plant de tomate/, 100, 200],
  [/plombier/, 100, 200],
  [/km à vélo/, 20, 200],
  [/vidéo de vulgarisation/, 5, 200],
  [/verger/, 50, 150],
  [/a économisé/, 10, 200],
  [/hérons/, 20, 200],
  [/une pompe/, 100, 200],
  [/chaîne de cuisine/, 100, 200],
  [/un tableau a été acheté/, 20, 200],
  [/repas végétariens/, 50, 200],
  [/boulangerie/, 20, 150],
  [/panneaux solaires/, 100, 200],
];

/** Calcul mental : p % de N (sans contexte, part d'un tout, comparaison). */
function cMental(q: Q): string[] {
  const t = q.text.replace(/En partant de 10 %, /, "");
  const { pcts, autres } = donnees(t);
  if (pcts.length !== 1 || autres.length !== 1) return [`un pourcentage et un nombre attendus : ${nombres(t).join(", ")}`];
  const borne = BORNES_COMPARAISON.find(([re]) => re.test(t));
  if (borne && (pcts[0] < borne[1] || pcts[0] > borne[2]))
    return [`${pcts[0]} % pas plausible ici (entre ${borne[1]} % et ${borne[2]} % attendu)`];
  const N = autres[0].v;
  const juste = (N * pcts[0]) / 100;
  const u = uniteA(t, autres[0].i);
  return verifierReponse(q, juste, u, `${pcts[0]} % de ${N}`);
}

/** On connaît c % ; on en déduit un autre pourcentage (ou le tout). */
function cMentalDeduire(q: Q): string[] {
  const { pcts, autres } = donnees(q.text);
  if (autres.length !== 1 || pcts.length < 1 || pcts.length > 2) return ["données illisibles"];
  const cible = pcts[1] ?? 100;
  const x = autres[0].v;
  const u = uniteA(q.text, autres[0].i);
  return verifierReponse(q, (x * cible) / pcts[0], u, `${cible} % quand ${pcts[0]} % valent ${x}`);
}

/** Ce que donne une méthode de calcul mental appliquée à N. */
function appliquer(m: string, N: number): number | null {
  let r: RegExpMatchArray | null;
  if ((r = m.match(/^diviser le nombre par (\d+)$/))) return N / Number(r[1]);
  if ((r = m.match(/^multiplier le nombre par (\d+)$/))) return N * Number(r[1]);
  if ((r = m.match(/^enlever (\d+) au nombre$/))) return N - Number(r[1]);
  if ((r = m.match(/^ajouter (\d+) au nombre$/))) return N + Number(r[1]);
  if (m === "garder le nombre tel quel") return N;
  if (m === "doubler le nombre") return 2 * N;
  if ((r = m.match(/^diviser par (\d+), puis (.+)$/))) {
    const d = N / Number(r[1]);
    const s = r[2];
    let z: RegExpMatchArray | null;
    if (s === "doubler") return 2 * d;
    if (s === "prendre la moitié") return d / 2;
    if ((z = s.match(/^multiplier par (\d+)$/))) return d * Number(z[1]);
    if ((z = s.match(/^ajouter (\d+)$/))) return d + Number(z[1]);
  }
  return null;
}

function cMethode(q: Q): string[] {
  const { pcts, autres } = donnees(q.text);
  if (pcts.length !== 1 || autres.length !== 1) return ["pourcentage et nombre illisibles"];
  const pc = pcts[0];
  const p: string[] = [];
  for (const c of q.choices ?? []) if (appliquer(c, 1) == null) p.push(`méthode illisible : « ${c} »`);
  // Une méthode est juste si elle marche pour LE nombre du texte ET pour un autre.
  const juste = (c: string) => [autres[0].v, 37].every((N) => egal(appliquer(c, N), (N * pc) / 100));
  return [...p, ...qcmUnique(q, juste)];
}

function cMentalVraiFaux(q: Q): string[] {
  const { pcts, autres } = donnees(q.text);
  if (pcts.length !== 1 || autres.length !== 2) return ["affirmation illisible"];
  const [N, annonce] = autres.map((a) => a.v);
  return ouiNon(q, egal(annonce, (N * pcts[0]) / 100));
}

// ─── Évolutions et coefficients multiplicateurs ────────────────────────────

/** Les évolutions du texte, dans l'ordre, en coefficients : « baisse de 20 % » → 0,8. */
function evolutions(t: string): number[] {
  const out: number[] = [];
  for (const m of t.matchAll(/(augment\S*|hausse|diminu\S*|baisse)\s+(?:de\s+)?(\d+(?:,\d+)?)\s*%/g))
    out.push(/augment|hausse/.test(m[1]) ? 1 + num(m[2]) / 100 : 1 - num(m[2]) / 100);
  return out;
}

/** « hausse de 3,5 % » → 3,5 ; « baisse de 22 % » → −22 ; « aucune évolution » → 0. */
function lireEvolution(c: string): number | null {
  if (/^aucune évolution/.test(c)) return 0;
  const m = c.match(/^(hausse|baisse) de (\d+(?:,\d+)?) %$/);
  return m ? (m[1] === "hausse" ? 1 : -1) * num(m[2]) : null;
}

/** Valeur de départ, une ou deux évolutions : la valeur finale. */
function cChaine(q: Q): string[] {
  const { autres } = donnees(q.text);
  const cs = evolutions(q.text);
  if (autres.length !== 1 || !cs.length) return [`valeur et évolutions illisibles : ${nombres(q.text).join(", ")}`];
  const v = autres[0].v;
  const u = uniteA(q.text, autres[0].i);
  const juste = cs.reduce((acc, c) => acc * c, v);
  const p = !MESURES.has(u) && !entier(juste) ? [`${juste} ${u} : pas un nombre entier`] : [];
  return [...p, ...verifierReponse(q, juste, u, `${v} × ${cs.join(" × ")}`)];
}

/** Pourcentage d'évolution entre deux valeurs. */
function cTauxEvolution(q: Q): string[] {
  const { autres } = donnees(q.text);
  if (autres.length !== 2) return ["deux valeurs attendues"];
  const [v, w] = autres.map((a) => a.v);
  const hausse = /augment/.test(q.text);
  const p = hausse === w > v ? [] : ["le sens de l'évolution demandé ne correspond pas aux valeurs"];
  return [...p, ...verifierReponse(q, (Math.abs(w - v) / v) * 100, "%", `de ${v} à ${w}`)];
}

/** Coefficient multiplicateur d'une évolution (réponse courte ou QCM). */
function cCoeffMult(q: Q): string[] {
  const cs = evolutions(q.text);
  if (cs.length !== 1) return ["une évolution attendue"];
  if (q.format === "qcm") return qcmUnique(q, (c) => egal(lireNombre(c), cs[0]));
  return verifierReponse(q, cs[0], "", "coefficient multiplicateur");
}

/** Du coefficient (0,95 ; 1,035…) au pourcentage d'évolution. */
function cCoeffVersTaux(q: Q): string[] {
  const ns = nombres(q.text);
  if (ns.length !== 1) return ["un coefficient attendu"];
  const c = ns[0];
  const pct = (c - 1) * 100;
  if (q.format === "qcm") return qcmUnique(q, (x) => egal(lireEvolution(x), pct));
  const hausse = /augment|hausse/.test(q.text);
  const p = hausse === c > 1 ? [] : ["le texte demande le mauvais sens d'évolution"];
  return [...p, ...verifierReponse(q, Math.abs(pct), "%", `coefficient ${c}`)];
}

/** Deux évolutions successives : l'évolution globale (QCM). */
function cTauxGlobal(q: Q): string[] {
  if (q.format !== "qcm") return cChaine(q);
  const cs = evolutions(q.text);
  if (cs.length !== 2) return ["deux évolutions attendues"];
  const g = (cs[0] * cs[1] - 1) * 100;
  const p: string[] = [];
  for (const c of q.choices ?? []) if (lireEvolution(c) == null) p.push(`proposition illisible : « ${c} »`);
  return [...p, ...qcmUnique(q, (c) => egal(lireEvolution(c), g))];
}

/** Après une évolution, l'évolution qui fait revenir au départ. */
function cRetour(q: Q): string[] {
  if (/valeur finale/.test(q.text)) return cChaine(q);
  const cs = evolutions(q.text);
  if (cs.length !== 1) return ["une évolution attendue"];
  const { autres } = donnees(q.text);
  const p: string[] = [];
  // « … et passe à 800 L » : la valeur intermédiaire doit être juste.
  if (autres.length === 3 && !egal(autres[1].v, autres[0].v * cs[0])) p.push(`valeur intermédiaire ${autres[1].v} fausse`);
  const hausseDemandee = /augmenter|d’augmentation|hausse, en/.test(q.text);
  if (hausseDemandee === cs[0] > 1) p.push("le texte demande le mauvais sens pour revenir");
  return [...p, ...verifierReponse(q, Math.abs(1 / cs[0] - 1) * 100, "%", "évolution de retour")];
}

/** Valeur finale connue après deux évolutions : la valeur de départ. */
function cDepart(q: Q): string[] {
  if (/valeur finale/.test(q.text)) return cChaine(q);
  const cs = evolutions(q.text);
  const { autres } = donnees(q.text);
  if (cs.length !== 2 || autres.length !== 1) return ["deux évolutions et une valeur finale attendues"];
  const fin = autres[0].v;
  const u = uniteA(q.text, autres[0].i);
  return verifierReponse(q, fin / (cs[0] * cs[1]), u, "valeur de départ");
}

// ─── Table : un correcteur par gabarit ─────────────────────────────────────

export const CORRECTEURS: CorrecteursMaths = avecRegleMotsCles({
  // Reconnaître
  prop_reconnaitre_tpl_1: cReconnaitre,
  prop_reconnaitre_tpl_2: cReconnaitre,
  prop_reconnaitre_tpl_3: cReconnaitre,
  prop_reconnaitre_tpl_etoile1: cReconnaitre,
  prop_reconnaitre_tpl_etoile3: cReconnaitre,
  // Tableaux
  prop_table_tpl_1: cTableau,
  prop_table_tpl_2: cTableau,
  prop_table_tpl_3: cTableau,
  prop_table_tpl_4: cTableau,
  prop_table_tpl_5: cTableau,
  prop_table_tpl_4_coeff: cTableau,
  prop_table_tpl_etoile1: cTableau,
  // Coefficient
  prop_coeff_tpl_1: cCoeff,
  prop_coeff_tpl_2: cCoeff,
  prop_coeff_tpl_3: cCoeff,
  prop_coeff_tpl_4: cCoeff,
  prop_coeff_tpl_5: cCoeff,
  prop_coeff_tpl_etoile1: cCoeff,
  // Quatrième proportionnelle
  prop_quatrieme_tpl_1: cQuatrieme,
  prop_quatrieme_tpl_2: cQuatrieme,
  prop_quatrieme_tpl_3: cQuatrieme,
  prop_quatrieme_tpl_4: cQuatrieme,
  prop_quatrieme_tpl_5: cQuatrieme,
  prop_quatrieme_tpl_6: cQuatrieme,
  // Graphique
  prop_graphique_tpl_1_reconnaitre: cGraphReconnaitre,
  prop_graphique_tpl_2_reconnaitre_bis: cGraphReconnaitre,
  prop_graphique_tpl_3_lire: (q) => cGraphLire(q, "x"),
  prop_graphique_tpl_4_inverse: (q) => cGraphLire(q, "y"),
  prop_graphique_tpl_5_coefficient: cGraphCoeff,
  prop_graphique_tpl_6_vrai_faux: cGraphVraiFaux,
  // Relation
  prop_relation_tpl_1_paire: cRelationPaire,
  prop_relation_tpl_2_tableau_qcm: cRelationTableau,
  prop_relation_tpl_3_tableau_court: cRelationTableau,
  prop_relation_tpl_4_graphique: cRelationGraphique,
  prop_relation_tpl_5_piege: (q) => cFormules(q, couplesDuTableau(q)),
  prop_relation_tpl_6_piege_bis: (q) => cFormules(q, couplesDuTableau(q)),
  // Problèmes
  prop_probleme_tpl_1: cProbleme,
  prop_probleme_tpl_2: cProbleme,
  prop_probleme_tpl_3: cProbleme,
  prop_probleme_tpl_4: cProbleme,
  prop_probleme_tpl_3_vitesse: cProbleme,
  prop_probleme_tpl_4_recette: cProbleme,
  // Défis de proportionnalité
  prop_defi_tpl_1: cAffirmation,
  prop_defi_tpl_etoile4_affirmation: cAffirmation,
  prop_defi_tpl_3: cComparer,
  prop_defi_tpl_etoile4_comparer: cComparer,
  // Pourcentages
  prop_pourcentage_tpl_1: cPourcentage,
  prop_pourcentage_tpl_2: cPourcentage,
  prop_pourcentage_tpl_3: cPourcentage,
  prop_pourcentage_tpl_4: cPourcentage,
  prop_pourcentage_tpl_5: cPourcentage,
  prop_pourcentage_tpl_4_reduction: cPourcentage,
  prop_pourcentage_tpl_etoile1: cPourcentage,
  prop_pourcentage_tpl_etoile1_fraction: cPourcentage,
  // Calcul mental
  prop_pourcentage_mental_tpl_1_dix: cMental,
  prop_pourcentage_mental_tpl_2_cent_deux_cents: cMental,
  prop_pourcentage_mental_tpl_3_vingt_trente_cinq: cMental,
  prop_pourcentage_mental_tpl_4_six_taux: cMental,
  prop_pourcentage_mental_tpl_5_deduire: cMentalDeduire,
  prop_pourcentage_mental_tpl_6_methode: cMethode,
  prop_pourcentage_mental_tpl_7_vrai_faux: cMentalVraiFaux,
  // Coefficient multiplicateur
  prop_coeff_multiplicateur_tpl_1: cCoeffMult,
  prop_coeff_multiplicateur_tpl_2: cCoeffMult,
  prop_coeff_multiplicateur_tpl_4: cCoeffMult,
  prop_coeff_multiplicateur_tpl_etoile2: cCoeffMult,
  prop_coeff_multiplicateur_tpl_3: cCoeffVersTaux,
  prop_coeff_multiplicateur_tpl_3_appliquer: cChaine,
  // Évolutions
  prop_evolution_tpl_1: cChaine,
  prop_evolution_tpl_2: cChaine,
  prop_evolution_tpl_3: cChaine,
  prop_evolution_tpl_5: cChaine,
  prop_evolution_tpl_etoile2: cChaine,
  prop_evolution_tpl_4: cTauxEvolution,
  // Défis de pourcentages
  prop_defi_tpl_2: cChaine,
  prop_defi_tpl_1_successif: cChaine,
  prop_defi_tpl_3_taux_global: cTauxGlobal,
  prop_defi_tpl_4_coeff_millieme: cCoeffVersTaux,
  prop_defi_tpl_5_retour: cRetour,
  prop_defi_tpl_6_depart: cDepart,
});
