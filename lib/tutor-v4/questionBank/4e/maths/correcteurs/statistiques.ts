import type { CorrecteursMaths } from "./types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { avecRegleMotsCles } from "@/lib/tutor-v4/questionBank/6e/maths/correcteurs/pourcentages";

// LES CORRECTEURS DE statistiques.bank.ts — 4e, notions stat_donnee et
// stat_statistique (08/10/2026, voir 6e/maths/correcteurs/types.ts).
// Chacun relit ce que voit l'élève — le TABLEAU décrit dans le texte (quatre
// façons de l'écrire), la série de valeurs, le relevé brut, ou le DIAGRAMME
// (canvas stat_graph : barres, bâtons, camembert) — et refait le calcul :
// effectif, total, fréquence (décimal, pourcentage), moyenne simple et
// pondérée, médiane (effectif pair : moyenne des deux valeurs centrales,
// décision de Frédéric), étendue, valeur manquante… Il rend la liste des
// problèmes (vide = juste). Jamais la formule du gabarit.

type Q = TutorGeneratedQuestionV4;

// ─── Lecture ───────────────────────────────────────────────────────────────

const NB = String.raw`\d{1,3}(?: \d{3})+(?:,\d+)?|\d+(?:,\d+)?`;
const num = (s: string) => Number(s.replace(/ /g, "").replace(",", "."));
const egal = (a: number | null | undefined, b: number | null | undefined) =>
  a != null && b != null && Number.isFinite(a) && Number.isFinite(b) && Math.abs(a - b) < 1e-6;
const deuxDecimales = (x: number) => Math.abs(x * 100 - Math.round(x * 100)) < 1e-6;
const somme = (xs: number[]) => xs.reduce((a, b) => a + b, 0);
const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** « 12 », « 12,5 », « 45 % », « 14 °C » → nombre. */
function valeur(s: string): number | null {
  const m = String(s).trim().match(new RegExp(`^(${NB})(?:\\s*\\S+)?$`));
  return m ? num(m[1]) : null;
}

/** Exactement une proposition juste, et c'est l'attendue. */
function qcmUnique(q: Q, juste: (c: string) => boolean): string[] {
  if (q.format !== "qcm") return ["QCM attendu"];
  const js = (q.choices ?? []).filter((c) => juste(c.trim()));
  if (js.length !== 1) return [`${js.length} proposition(s) juste(s) au lieu d'une : ${js.join(" | ")}`];
  if (js[0] !== q.expected[0]) return [`la proposition juste « ${js[0]} » n'est pas l'attendue « ${q.expected[0]} »`];
  return [];
}

/** Réponse courte : toutes les écritures acceptées valent la bonne valeur, deux décimales au plus. */
function reponse(q: Q, juste: number | null, quoi: string, opts: { pct?: boolean } = {}): string[] {
  if (juste == null || !Number.isFinite(juste)) return [`calcul impossible à refaire (${quoi})`];
  if (q.format === "qcm") return ["QCM inattendu pour une réponse numérique"];
  const p: string[] = [];
  if (!deuxDecimales(juste)) p.push(`réponse ${juste} : plus de deux décimales (${quoi})`);
  for (const e of q.expected.map(String)) if (!egal(valeur(e), juste)) p.push(`attendu « ${e} », le texte donne ${juste} (${quoi})`);
  if (opts.pct && !q.expected.some((e) => /%$/.test(String(e)))) p.push("pourcentage demandé : aucune réponse acceptée avec « % »");
  return p;
}

type Donnees = { labels: string[]; vals: number[] };

/** Une liste de catégories écrite d'une des quatre façons du fichier ; null si le morceau n'en est pas une. */
function listeCats(seg: string): Donnees | null {
  const s = seg.trim();
  const t = s.match(/^(.+?) — effectifs : ([\d |]+)$/);
  if (t) {
    const labels = t[1].split(" | ");
    const vals = t[2].trim().split(" | ").map(Number);
    return labels.length === vals.length && labels.length >= 2 ? { labels, vals } : null;
  }
  const items = s.split(/ ; |, | et /);
  if (items.length < 2) return null;
  const out: Donnees = { labels: [], vals: [] };
  for (const it of items) {
    const m = it.match(/^(\d+) pour « ([^»]+) »$/) ?? it.match(/^([^():;«»\d][^():;«»]*) \((\d+)\)$/) ?? it.match(/^([^():;«»\d][^():;«»]*) : (\d+)$/);
    if (!m) return null;
    const [a, b] = /^\d+$/.test(m[1]) ? [m[2], m[1]] : [m[1], m[2]];
    out.labels.push(a);
    out.vals.push(Number(b));
  }
  return out;
}

/** Un caractère compté : « valeur 2 : 7 », « 7 élèves pour la valeur 2 », « valeurs : … — effectifs : … ». */
function listeDiscret(seg: string): Donnees | null {
  const s = seg.trim();
  const t = s.match(/^valeurs : ([\d |]+) — effectifs : ([\d |]+)$/);
  if (t) {
    const labels = t[1].trim().split(" | ");
    const vals = t[2].trim().split(" | ").map(Number);
    return labels.length === vals.length ? { labels, vals } : null;
  }
  const items = s.split(/ ; |, | et /);
  if (items.length < 2) return null;
  const out: Donnees = { labels: [], vals: [] };
  for (const it of items) {
    const a = it.match(/^valeur (\d+) : (\d+)$/);
    const b = it.match(/^(\d+) \S+ pour la valeur (\d+)$/);
    if (a) (out.labels.push(a[1]), out.vals.push(Number(a[2])));
    else if (b) (out.labels.push(b[2]), out.vals.push(Number(b[1])));
    else return null;
  }
  return out;
}

/** Le premier morceau « : … . » du texte qui se lit comme une liste ; et ce qui suit (la question). */
function tableauTexte(t: string, lire: (s: string) => Donnees | null): (Donnees & { apres: string }) | null {
  for (const m of t.matchAll(/ : /g)) {
    const debut = m.index! + 3;
    const fin = t.slice(debut).search(/\.(?= |$)|, mais /);
    if (fin < 0) continue;
    const d = lire(t.slice(debut, debut + fin));
    if (d) return { ...d, apres: t.slice(debut + fin + 1) };
  }
  return null;
}

/** Le diagramme dessiné (barres, bâtons ou camembert). */
function diagramme(q: Q): (Donnees & { type: string }) | null {
  const c = q.canvas as { kind?: string; graphType?: string; data?: { label: string; value: number }[] } | undefined;
  if (c?.kind !== "stat_graph" || !c.data) return null;
  return { labels: c.data.map((d) => d.label), vals: c.data.map((d) => d.value), type: c.graphType ?? "" };
}

/** La question : ce qui suit la première phrase quand les données sont dans le diagramme. */
const sansIntro = (t: string) => t.replace(/^[^.]*\.\s*/, "");

const SYNONYMES: Record<string, RegExp> = { maison: /chez elles/, BD: /bandes dessinées/, électrique: /électricité/ };

/** La catégorie visée par une question : « label », ou le label écrit en toutes lettres. */
function cible(question: string, labels: string[]): string | null {
  const g = [...question.matchAll(/« ([^»]+) »/g)].map((m) => m[1]).filter((x) => labels.includes(x));
  if (g.length === 1) return g[0];
  const ok = labels.filter((l) => SYNONYMES[l]?.test(question) || new RegExp(`(?<![\\p{L}])${esc(l)}(?![\\p{L}])`, "u").test(question));
  return ok.length === 1 ? ok[0] : null;
}

/** La valeur d'un caractère compté visée par la question (« 3 frères et sœurs », « aucun livre », « un seul œuf »). */
function valeurVisee(question: string): number | null {
  const m = question.match(/\d+/);
  if (m) return Number(m[0]);
  if (/aucun|aucune|ni frère ni sœur/.test(question)) return 0;
  if (/un seul|une seule|exactement un|au moins une? /.test(question)) return 1;
  return null;
}

// ─── stat_donnee : lire, compter, totaliser ────────────────────────────────

/** Les données : le diagramme s'il y en a un, sinon le tableau du texte (catégories puis valeurs). */
function donnees(q: Q): (Donnees & { apres: string; discret: boolean }) | null {
  const g = diagramme(q);
  if (g) return { ...g, apres: sansIntro(q.text), discret: g.type === "batons" };
  const c = tableauTexte(q.text, listeDiscret);
  if (c) return { ...c, discret: true };
  const d = tableauTexte(q.text, listeCats);
  return d ? { ...d, discret: false } : null;
}

function verifierDonnees(d: Donnees): string[] {
  const p: string[] = [];
  if (new Set(d.labels).size !== d.labels.length) p.push(`deux catégories identiques : ${d.labels.join(", ")}`);
  if (d.vals.some((v) => !(v > 0) || !Number.isInteger(v))) p.push(`effectif impossible : ${d.vals.join(", ")}`);
  return p;
}

function effectifLu(d: Donnees & { apres: string; discret: boolean }): { v: number; quoi: string } | null {
  if (d.discret) {
    const x = valeurVisee(d.apres);
    const i = x == null ? -1 : d.labels.indexOf(String(x));
    return i < 0 ? null : { v: d.vals[i], quoi: `valeur ${x}` };
  }
  const c = cible(d.apres, d.labels);
  return c == null ? null : { v: d.vals[d.labels.indexOf(c)], quoi: `« ${c} »` };
}

/** Lire l'effectif d'une catégorie ou d'une valeur (tableau ou diagramme). */
function cLire(q: Q): string[] {
  const d = donnees(q);
  if (!d) return ["données illisibles"];
  const e = effectifLu(d);
  if (!e) return [...verifierDonnees(d), `catégorie visée illisible : « ${d.apres} »`];
  return [...verifierDonnees(d), ...reponse(q, e.v, `effectif de ${e.quoi}`)];
}

/** Effectif total. */
function cTotal(q: Q): string[] {
  const d = donnees(q);
  if (!d) return ["données illisibles"];
  if (!/total|en tout/.test(d.apres)) return ["la question ne demande pas le total"];
  return [...verifierDonnees(d), ...reponse(q, somme(d.vals), "effectif total")];
}

const RELEVES: [string, string][] = [
  ["lors du premier relevé", "lors du second relevé"],
  ["en 2024", "en 2025"],
  ["dans le groupe A", "dans le groupe B"],
  ["au printemps", "à l'automne"],
];

/** Tableau à double entrée : deux lignes, trois colonnes. */
function cDouble(q: Q): string[] {
  const t = q.text;
  const R = RELEVES.find((r) => r.every((x) => t.includes(x) || t.includes(cap(x))));
  if (!R) return ["lignes du tableau illisibles"];
  const lignes = R.map((r) => {
    const m = t.match(new RegExp(`(?:${esc(r)}|${esc(cap(r))})(?: »)?(?: :|, on a obtenu|,) (.+?)(?:\\.(?= )| ; )`));
    return m ? listeCats(m[1]) : null;
  });
  if (!lignes[0] || !lignes[1]) return ["lignes du tableau illisibles"];
  if (lignes[0].labels.join() !== lignes[1].labels.join()) return ["les deux lignes n'ont pas les mêmes colonnes"];
  const question = t.slice(t.lastIndexOf(". ") + 2);
  const c = cible(question, lignes[0].labels);
  if (!c) return [`colonne visée illisible : « ${question} »`];
  const j = lignes[0].labels.indexOf(c);
  if (/réunis/.test(question)) return reponse(q, lignes[0].vals[j] + lignes[1].vals[j], "total des deux lignes");
  const r = R.findIndex((x) => question.includes(x));
  if (r < 0) return [`ligne visée illisible : « ${question} »`];
  return reponse(q, lignes[r]!.vals[j], "case lue");
}

/** Catégorie la plus (ou la moins) représentée. */
function cMaxMin(q: Q): string[] {
  const d = donnees(q);
  if (!d) return ["données illisibles"];
  const max = /plus grand|plus représentée|le plus (?!petit)|plus haute/.test(d.apres);
  const min = /plus petit|moins représentée|le moins|plus basse/.test(d.apres);
  if (max === min) return [`sens de la question illisible : « ${d.apres} »`];
  const v = max ? Math.max(...d.vals) : Math.min(...d.vals);
  const p = verifierDonnees(d);
  if (d.vals.filter((x) => x === v).length > 1) p.push("deux catégories ex aequo");
  if ((q.choices ?? []).slice().sort().join() !== d.labels.slice().sort().join()) p.push("les propositions ne sont pas les catégories");
  return [...p, ...qcmUnique(q, (c) => c === d.labels[d.vals.indexOf(v)])];
}

/** Écart entre deux barres nommées. */
function cEcartBarres(q: Q): string[] {
  const d = donnees(q);
  if (!d) return ["données illisibles"];
  const g = [...d.apres.matchAll(/« ([^»]+) »/g)].map((m) => m[1]);
  if (g.length !== 2 || !g.every((x) => d.labels.includes(x))) return ["deux catégories attendues"];
  const [a, b] = g.map((x) => d.vals[d.labels.indexOf(x)]);
  const p: string[] = [];
  if (a <= b) p.push(`« ${g[0]} » (${a}) ne dépasse pas « ${g[1]} » (${b})`);
  return [...p, ...reponse(q, Math.abs(a - b), "écart")];
}

/** Calculs sur un diagramme : deux catégories réunies, nombre de barres au-dessus d'un seuil, total. */
function cCalculGraphe(q: Q): string[] {
  const d = donnees(q);
  if (!d) return ["données illisibles"];
  const g = [...d.apres.matchAll(/« ([^»]+) »/g)].map((m) => m[1]);
  if (g.length === 2) return reponse(q, somme(g.map((x) => d.vals[d.labels.indexOf(x)])), "deux catégories réunies");
  const s = d.apres.match(/(?:supérieur à|dépasse-t-elle) (\d+)/);
  if (s) return reponse(q, d.vals.filter((v) => v > Number(s[1])).length, "barres au-dessus du seuil");
  if (/en tout|total/.test(d.apres)) return reponse(q, somme(d.vals), "total");
  return ["question illisible"];
}

/** Relevé brut : on compte les occurrences. */
function cCompter(q: Q): string[] {
  const t = q.text;
  const i = t.lastIndexOf(" : ");
  const fin = t.indexOf(". ", i);
  if (i < 0 || fin < 0) return ["relevé illisible"];
  const brut = t.slice(i + 3, fin).split(/ ; |, /).map((x) => x.trim());
  const question = t.slice(fin + 2);
  const g = question.match(/« ([^»]+) »/);
  const x = g ? g[1] : String(valeurVisee(question));
  const n = brut.filter((b) => b === x).length;
  const p: string[] = [];
  if (!brut.includes(x)) p.push(`« ${x} » n'est pas dans le relevé`);
  if (brut.length < 6) p.push(`relevé de ${brut.length} données seulement`);
  return [...p, ...reponse(q, n, `occurrences de « ${x} »`)];
}

/** Total donné, une case effacée. */
function cManquant(q: Q): string[] {
  const t = q.text;
  const T = t.match(new RegExp(`(?:total est|total vaut) (${NB})|: (${NB}) \\S+ en tout`));
  const d = diagramme(q) ?? tableauTexte(t, listeCats);
  const efface = t.match(/(?:l'effectif de|La case|barre) « ([^»]+) »/);
  if (!T || !d || !efface) return ["énoncé illisible"];
  const tot = num(T[1] ?? T[2]);
  const p = verifierDonnees(d);
  if (d.labels.includes(efface[1])) p.push(`« ${efface[1]} » figure encore dans les données`);
  const x = tot - somme(d.vals);
  if (!(x > 0)) p.push(`effectif manquant ${x} : impossible`);
  return [...p, ...reponse(q, x, "effectif manquant")];
}

/** « Au moins v », « v ou plus », « strictement inférieure à v ». */
function cAuMoins(q: Q): string[] {
  const d = tableauTexte(q.text, listeDiscret);
  if (!d) return ["tableau illisible"];
  const v = valeurVisee(d.apres);
  if (v == null) return ["valeur seuil illisible"];
  const xs = d.labels.map(Number);
  const garde = /strictement inférieure/.test(d.apres) ? (x: number) => x < v : /au moins|ou plus|supérieure ou égale/.test(d.apres) ? (x: number) => x >= v : null;
  if (!garde) return ["sens de la question illisible"];
  return [...verifierDonnees(d), ...reponse(q, somme(d.vals.filter((_, i) => garde(xs[i]))), "effectif cumulé")];
}

// ─── stat_donnee : fréquences ─────────────────────────────────────────────

/** Effectif e de la catégorie visée et total T : phrase « e … sur T », tableau ou diagramme. */
function effectifEtTotal(q: Q): { e: number; T: number; apres: string } | null {
  const t = q.text;
  const s = t.match(new RegExp(`(${NB}) \\S+ sur (${NB}) `)) ?? t.match(new RegExp(`Parmi (${NB}) \\S+, (${NB}) `));
  if (s) {
    const [e, T] = /^Parmi/.test(s[0]) ? [num(s[2]), num(s[1])] : [num(s[1]), num(s[2])];
    return { e, T, apres: t.slice(s.index! + s[0].length) };
  }
  const d = donnees(q);
  if (!d) return null;
  const e = effectifLu(d);
  return e ? { e: e.v, T: somme(d.vals), apres: d.apres } : null;
}

function cFreq(q: Q): string[] {
  const x = effectifEtTotal(q);
  if (!x) return ["énoncé illisible"];
  const f = x.e / x.T;
  const p: string[] = [];
  if (!(x.e > 0 && x.e < x.T)) p.push(`effectif ${x.e} sur ${x.T} : pas plausible`);
  if (/pourcentage/.test(x.apres)) return [...p, ...reponse(q, 100 * f, "fréquence en %", { pct: true })];
  if (/décima/.test(x.apres)) return [...p, ...reponse(q, f, "fréquence décimale")];
  return [...p, "forme demandée illisible"];
}

function cFreqQcm(q: Q): string[] {
  const x = effectifEtTotal(q);
  if (!x) return ["énoncé illisible"];
  const pct = /pourcentage/.test(x.apres);
  const f = x.e / x.T;
  // Par la VALEUR : « 0,56 » à côté de « 56 % » serait une seconde bonne réponse.
  const v = (c: string) => (valeur(c) ?? NaN) / (/%$/.test(c) ? 100 : 1);
  const p: string[] = [];
  if (pct !== /%$/.test(String(q.expected[0]))) p.push(`forme demandée non respectée : « ${q.expected[0]} »`);
  return [...p, ...qcmUnique(q, (c) => egal(v(c), f))];
}

/** Fréquence d'une catégorie, de deux catégories réunies, ou de toutes sauf une. */
function cFreqRegroupee(q: Q): string[] {
  const d = donnees(q);
  if (!d) return ["diagramme illisible"];
  const g = [...d.apres.matchAll(/« ([^»]+) »/g)].map((m) => m[1]);
  if (!g.every((x) => d.labels.includes(x))) return ["catégorie absente du diagramme"];
  const T = somme(d.vals);
  const e = /autres que/.test(d.apres) ? T - d.vals[d.labels.indexOf(g[0])] : somme(g.map((x) => d.vals[d.labels.indexOf(x)]));
  return reponse(q, (100 * e) / T, "fréquence en %", { pct: true });
}

/** Écart entre la barre la plus haute et la plus basse (QCM). */
function cEcartExtremes(q: Q): string[] {
  const d = diagramme(q);
  if (!d) return ["diagramme illisible"];
  const e = Math.max(...d.vals) - Math.min(...d.vals);
  return qcmUnique(q, (c) => egal(valeur(c), e));
}

/** Diagramme circulaire en pourcentages + effectif total : un effectif. */
function cCamembert(q: Q): string[] {
  const t = q.text;
  const pcs = new Map<string, number>();
  for (const m of t.matchAll(/(\d+) % pour « ([^»]+) »/g)) pcs.set(m[2], Number(m[1]));
  if (!pcs.size) for (const m of t.matchAll(/(?:: | ; )([^:;]+?) : (\d+) %/g)) pcs.set(m[1].trim(), Number(m[2]));
  const N = t.match(new RegExp(`porte sur (${NB}) `));
  const d = diagramme(q);
  if (!N || !d || pcs.size < 3) return ["énoncé illisible"];
  const p: string[] = [];
  if (somme([...pcs.values()]) !== 100) p.push(`les pourcentages font ${somme([...pcs.values()])} %`);
  for (const [l, v] of pcs) if (d.vals[d.labels.indexOf(l)] !== v) p.push(`camembert : « ${l} » ne vaut pas ${v} %`);
  const question = t.slice(t.lastIndexOf(". ") + 2);
  const c = cible(question, [...pcs.keys()]);
  if (!c) return [...p, `catégorie visée illisible : « ${question} »`];
  const e = (num(N[1]) * pcs.get(c)!) / 100;
  if (!Number.isInteger(e)) p.push(`effectif ${e} non entier`);
  return [...p, ...reponse(q, e, `effectif de « ${c} »`)];
}

// ─── stat_statistique : séries de mesures ─────────────────────────────────

const UNITES = "°C|s|cm|g|mm|km|points?|min|€|L|kg|m|jours?|élèves";

/** « 34 s, 39 s et 41 s », « 7 000 ; 8 300 (en g) » → les valeurs ; null si ce n'est pas une série. */
function serieValeurs(seg: string): number[] | null {
  const s = seg.trim().replace(new RegExp(` \\(en (?:${UNITES})\\)$`), "");
  const items = s.split(/ ; |, | et /);
  if (items.length < 2) return null;
  const out: number[] = [];
  for (const it of items) {
    const m = it.match(new RegExp(`^(${NB})(?: (?:${UNITES}))?$`));
    if (!m) return null;
    out.push(num(m[1]));
  }
  return out;
}

/** La première série écrite après « : » dans le texte, et ce qui la suit. */
function serieTexte(t: string): { vals: number[]; apres: string } | null {
  for (const m of t.matchAll(/ : /g)) {
    const debut = m.index! + 3;
    const fin = t.slice(debut).search(/\.(?= |$)/);
    if (fin < 0) continue;
    const vals = serieValeurs(t.slice(debut, debut + fin));
    if (vals) return { vals, apres: t.slice(debut + fin + 1) };
  }
  return null;
}

/** Le nombre de valeurs ANNONCÉ par le sujet (« les 5 notes », « pendant 6 jours »). */
function annonce(t: string): number | null {
  const m = t.match(/(?:les|des|de|pendant|lors de|dans) (\d+) (?:notes|jours|joueurs|nageuses|sorties|magasins|plants|coureurs|chatons|mois|matins)\b/i);
  return m ? Number(m[1]) : null;
}

/** Série lue + nombre de valeurs cohérent avec le sujet (décalage : valeurs non écrites). */
function serieLue(q: Q, decalage = 0): { vals: number[]; apres: string; pb: string[] } | null {
  const s = serieTexte(q.text);
  if (!s) return null;
  const n = annonce(q.text);
  const pb: string[] = [];
  if (n != null && n !== s.vals.length + decalage) pb.push(`le sujet annonce ${n} valeurs, on en lit ${s.vals.length + decalage}`);
  if (/\bd'Y/.test(q.text)) pb.push("élision fautive devant un prénom en Y (« de Yanis »)");
  return { ...s, pb };
}

const moyenne = (xs: number[]) => somme(xs) / xs.length;
function mediane(xs: number[]): number {
  const s = [...xs].sort((a, b) => a - b);
  const n = s.length;
  return n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2;
}
const etendue = (xs: number[]) => Math.max(...xs) - Math.min(...xs);

/** Un indicateur calculé sur la série du texte. */
function surSerie(calc: (xs: number[]) => number, quoi: string, opts: { rangee?: boolean; minN?: number } = {}) {
  return (q: Q): string[] => {
    const s = serieLue(q);
    if (!s) return ["série illisible"];
    const p = [...s.pb];
    if (opts.rangee && s.vals.some((v, i) => i && v < s.vals[i - 1])) p.push("série annoncée rangée mais pas dans l'ordre croissant");
    if (s.vals.length < (opts.minN ?? 2)) p.push(`série de ${s.vals.length} valeurs`);
    return [...p, ...reponse(q, calc(s.vals), quoi)];
  };
}

/** Moyenne pondérée : tableau d'un caractère compté, diagramme en bâtons, ou notes à coefficients. */
function cPonderee(q: Q): string[] {
  const coefs = [...q.text.matchAll(/(\d+) à [^()]+? \(coefficient (\d+)\)/g)].map((m) => ({ x: Number(m[1]), c: Number(m[2]) }));
  if (coefs.length) {
    const p: string[] = [];
    if (coefs.some((k) => k.x > 20)) p.push("note sur 20 supérieure à 20");
    if (new Set(coefs.map((k) => k.c)).size === 1) p.push("coefficients tous égaux : ce n'est plus une moyenne pondérée");
    return [...p, ...reponse(q, somme(coefs.map((k) => k.x * k.c)) / somme(coefs.map((k) => k.c)), "moyenne à coefficients")];
  }
  const g = diagramme(q);
  const d = g ? { labels: g.labels, vals: g.vals } : tableauTexte(q.text, listeDiscret);
  if (!d) return ["données illisibles"];
  const xs = d.labels.map(Number);
  if (xs.some((x) => !Number.isFinite(x))) return ["valeurs illisibles"];
  return [...verifierDonnees(d), ...reponse(q, somme(xs.map((x, i) => x * d.vals[i])) / somme(d.vals), "moyenne pondérée")];
}

/** Une valeur perdue (ou la dernière à obtenir) pour une moyenne donnée. */
function cValeurManquante(q: Q): string[] {
  const s = serieLue(q, 1);
  const m = q.text.match(new RegExp(`(?:moyenne des \\d+ valeurs est|moyenne soit égale à|moyenne de|atteigne exactement) (${NB})`));
  const n = annonce(q.text);
  if (!s || !m || n == null) return ["énoncé illisible"];
  const x = n * num(m[1]) - somme(s.vals);
  const p = [...s.pb];
  if (!(x > 0)) p.push(`valeur cherchée ${x} : impossible`);
  return [...p, ...reponse(q, x, "valeur manquante")];
}

/** Étendue à partir des deux extrêmes écrits. */
function cExtremes(q: Q): string[] {
  const t = q.text;
  const a = t.match(new RegExp(`(?:plus grande valeur est|valeur maximale est) (${NB})`));
  const b = t.match(new RegExp(`(?:la plus petite est|valeur minimale est) (${NB})`));
  const c = t.match(new RegExp(`vont de (${NB})(?: \\S+)? à (${NB})`));
  const [mn, mx] = c ? [num(c[1]), num(c[2])] : a && b ? [num(b[1]), num(a[1])] : [NaN, NaN];
  if (!Number.isFinite(mn)) return ["extrêmes illisibles"];
  const p: string[] = [];
  if (!(mx > mn)) p.push(`maximum ${mx} pas au-dessus du minimum ${mn}`);
  return [...p, ...reponse(q, mx - mn, "étendue")];
}

/** Étendue lue sur un diagramme en barres. */
function cEtendueGraphe(q: Q): string[] {
  const d = diagramme(q);
  if (!d) return ["diagramme illisible"];
  const n = annonce(q.text);
  const p: string[] = [];
  if (n != null && n !== d.vals.length) p.push(`le sujet annonce ${n} valeurs, le diagramme en a ${d.vals.length}`);
  return [...p, ...reponse(q, etendue(d.vals), "étendue")];
}

/** Les deux séries comparées : les noms (propositions) et leurs étendues. */
function nomsCompares(q: Q): string[] {
  return (q.choices ?? []).filter((c) => !/^On ne peut pas savoir|^Les deux séries/.test(c));
}
const coeur = (nom: string) => nom.replace(/^(?:La|Le|Les|L') ?/, "").replace(/^(la|le|les|l') ?/i, "");
const sensQuestion = (t: string) => (/dispersée|étalées/.test(t) ? "large" : /régulière|regroupées/.test(t) ? "serre" : null);

function cCompareEtendues(q: Q): string[] {
  const noms = nomsCompares(q);
  if (noms.length !== 2) return ["deux séries attendues"];
  const e = noms.map((nom) => {
    const c = esc(coeur(nom));
    const m =
      q.text.match(new RegExp(`pour (?:la |le |l'|les )?${c} : (${NB})`)) ??
      q.text.match(new RegExp(`(${NB})(?: [^\\s\\d]+)? pour (?:la |le |l'|les )?${c}(?![\\p{L}\\d])`, "u"));
    return m ? num(m[1]) : null;
  });
  if (e.some((x) => x == null)) return [`étendues illisibles : ${e}`];
  const sens = sensQuestion(q.text);
  if (!sens || e[0] === e[1]) return ["question ou étendues illisibles"];
  const i = (sens === "large") === e[0]! > e[1]! ? 0 : 1;
  return qcmUnique(q, (c) => c === noms[i]);
}

function cCompareSeries(q: Q): string[] {
  const noms = nomsCompares(q);
  if (noms.length !== 2) return ["deux séries attendues"];
  const series: { nom: string; vals: number[] }[] = [];
  for (const m of q.text.matchAll(/ : /g)) {
    const debut = m.index! + 3;
    const fin = q.text.slice(debut).search(/, et |\.(?= |$)/);
    const vals = fin < 0 ? null : serieValeurs(q.text.slice(debut, debut + fin));
    const avant = q.text.slice(0, m.index!);
    const nom = noms.find((x) => avant.endsWith(coeur(x)));
    if (vals && nom) series.push({ nom, vals });
  }
  if (series.length !== 2) return [`séries illisibles : ${series.length}`];
  const p: string[] = [];
  const mo = q.text.match(new RegExp(`moyenne(?:,| vaut) (${NB})`));
  for (const s of series) if (mo && !egal(moyenne(s.vals), num(mo[1]))) p.push(`moyenne de ${s.nom} : ${moyenne(s.vals)}, pas ${mo[1]}`);
  const [a, b] = series.map((s) => etendue(s.vals));
  const sens = sensQuestion(q.text);
  if (!sens || a === b) return [...p, "question ou étendues illisibles"];
  const gagnant = (sens === "large") === a > b ? series[0].nom : series[1].nom;
  return [...p, ...qcmUnique(q, (c) => c === gagnant)];
}

/** Ce que GARANTIT un indicateur donné. */
function cSens(q: Q): string[] {
  const m = q.text.match(new RegExp(`(La médiane|La moyenne|L'étendue) de cette série vaut (${NB})`));
  const n = annonce(q.text);
  if (!m || n == null) return ["énoncé illisible"];
  const V = num(m[2]);
  const juste = (c: string) => {
    let x: RegExpMatchArray | null;
    if (m[1] === "La médiane") return !!(x = c.match(new RegExp(`^Au moins la moitié des valeurs sont inférieures ou égales à (${NB})`))) && egal(num(x[1]), V);
    if (m[1] === "La moyenne") return !!(x = c.match(new RegExp(`^La somme des (\\d+) valeurs est (${NB})`))) && Number(x[1]) === n && egal(num(x[2]), n * V);
    return !!(x = c.match(new RegExp(`^L'écart entre la plus grande et la plus petite valeur est (${NB})`))) && egal(num(x[1]), V);
  };
  return qcmUnique(q, juste);
}

/** Quel indicateur répond au but annoncé. */
function cQuelIndicateur(q: Q): string[] {
  const t = q.text;
  const ind = /répartissait|somme des valeurs divisée/.test(t)
    ? "la moyenne"
    : /partage la série|au moins la moitié/.test(t)
      ? "la médiane"
      : /écart entre la plus grande|dispersion/.test(t)
        ? "l'étendue"
        : /combien de valeurs|nombre total de données/.test(t)
          ? "l'effectif total"
          : null;
  return ind ? qcmUnique(q, (c) => c === ind) : ["but illisible"];
}

/** Nombre de valeurs strictement au-dessus de la moyenne. */
const cAuDessus = surSerie((xs) => xs.filter((x) => x > moyenne(xs)).length, "valeurs au-dessus de la moyenne", { minN: 4 });

/** Écart entre la valeur extrême demandée et la moyenne. */
function cEcartMoyenne(q: Q): string[] {
  const s = serieLue(q);
  if (!s) return ["série illisible"];
  const m = moyenne(s.vals);
  const haut = /plus grande/.test(s.apres);
  if (haut === /plus petite/.test(s.apres)) return ["valeur extrême demandée illisible"];
  return [...s.pb, ...reponse(q, Math.abs((haut ? Math.max(...s.vals) : Math.min(...s.vals)) - m), "écart à la moyenne")];
}

/** Une valeur ajoutée à la série : nouvelle moyenne ou nouvelle étendue. */
function apresAjout(calc: (xs: number[]) => number, quoi: string) {
  return (q: Q): string[] => {
    const s = serieLue(q);
    const x = q.text.match(new RegExp(`valeur : (${NB})`));
    if (!s || !x) return ["série ou valeur ajoutée illisible"];
    return [...s.pb, ...reponse(q, calc([...s.vals, num(x[1])]), quoi)];
  };
}

/** La moyenne passe de m1 (n valeurs) à m2 (n + 1 valeurs) : la valeur ajoutée. */
function cAjout(q: Q): string[] {
  const t = q.text;
  const m1 = t.match(new RegExp(`(?:moyenne est|pour moyenne|valeurs est) (${NB})`));
  const m2 = t.match(new RegExp(`(?:passe à|passer la moyenne à|valeurs vaut) (${NB})`));
  const n = annonce(t) ?? (t.match(/moyenne de (\d+) valeurs/) ? Number(t.match(/moyenne de (\d+) valeurs/)![1]) : null);
  if (!m1 || !m2 || n == null) return ["énoncé illisible"];
  const x = (n + 1) * num(m2[1]) - n * num(m1[1]);
  const p: string[] = [];
  if (!(x > 0)) p.push(`valeur ajoutée ${x} : impossible`);
  if (/\bd'Y/.test(t)) p.push("élision fautive devant un prénom en Y");
  return [...p, ...reponse(q, x, "valeur ajoutée")];
}

const CORRECTEURS_STATISTIQUE: CorrecteursMaths = avecRegleMotsCles({
  stat_moyenne_tpl_1_liste: surSerie(moyenne, "moyenne"),
  stat_moyenne_tpl_2_effectifs: cPonderee,
  stat_moyenne_tpl_3_retrouver_valeur: cValeurManquante,
  stat_moyenne_tpl_4_liste: surSerie(moyenne, "moyenne"),
  stat_moyenne_tpl_5_contexte: surSerie(moyenne, "moyenne"),
  stat_moyenne_tpl_6_trois_valeurs: surSerie(moyenne, "moyenne"),
  stat_moyenne_tpl_7_longue: surSerie(moyenne, "moyenne"),
  stat_mediane_tpl_1_impair: surSerie(mediane, "médiane"),
  stat_mediane_tpl_2_pair: surSerie(mediane, "médiane"),
  stat_mediane_tpl_3_impair: surSerie(mediane, "médiane"),
  stat_mediane_tpl_4_pair: surSerie(mediane, "médiane"),
  stat_mediane_tpl_5_rangee: surSerie(mediane, "médiane", { rangee: true }),
  stat_etendue_tpl_1: surSerie(etendue, "étendue"),
  stat_etendue_tpl_2_graphique: cEtendueGraphe,
  stat_etendue_tpl_3: surSerie(etendue, "étendue"),
  stat_etendue_tpl_4_contexte: surSerie(etendue, "étendue"),
  stat_etendue_tpl_5_extremes: cExtremes,
  stat_etendue_tpl_6_rangee: surSerie(etendue, "étendue", { rangee: true }),
  stat_interpreter_tpl_1_moyenne_etendue: cCompareEtendues,
  stat_interpreter_tpl_2: cCompareEtendues,
  stat_interpreter_tpl_3_mieux: cCompareSeries,
  stat_interpreter_tpl_4_sens: cSens,
  stat_interpreter_tpl_5_quel_indicateur: cQuelIndicateur,
  stat_probleme_tpl_1_reunion: apresAjout(moyenne, "nouvelle moyenne"),
  stat_probleme_tpl_2_graphique: cPonderee,
  stat_probleme_tpl_3_etendue: apresAjout(etendue, "nouvelle étendue"),
  stat_probleme_tpl_4_mediane: surSerie(mediane, "médiane"),
  stat_probleme_tpl_5_total: cAuDessus,
  stat_probleme_tpl_6_ecart_moyenne: cEcartMoyenne,
  stat_defi_tpl_1_retrouver_valeur: cValeurManquante,
  stat_defi_tpl_2_moyenne_ponderee: cPonderee,
  stat_defi_tpl_3_valeur_manquante: (q) => (/ajout|de plus/.test(q.text) ? cAjout(q) : cValeurManquante(q)),
});

const CORRECTEURS_DONNEE: CorrecteursMaths = avecRegleMotsCles({
  stat_lire_tableau_tpl_1: cLire,
  stat_lire_tableau_tpl_2: cDouble,
  stat_lire_tableau_tpl_3: cLire,
  stat_lire_tableau_tpl_4: cMaxMin,
  stat_lire_graphique_tpl_1_barres: cEcartBarres,
  stat_lire_graphique_tpl_2_batons: cLire,
  stat_lire_graphique_tpl_3_max: cMaxMin,
  stat_lire_graphique_tpl_4: cLire,
  stat_lire_graphique_tpl_5_min: cMaxMin,
  stat_lire_graphique_tpl_6_lire: cLire,
  stat_lire_graphique_tpl_7_calcul: cCalculGraphe,
  stat_effectif_tpl_1: cTotal,
  stat_effectif_tpl_2_graphique: cTotal,
  stat_effectif_tpl_3: cTotal,
  stat_effectif_tpl_4_manquant: cManquant,
  stat_effectif_tpl_5_compter: cCompter,
  stat_effectif_tpl_6_au_moins: cAuMoins,
  stat_frequence_tpl_1_decimal: cFreq,
  stat_frequence_tpl_2_pourcentage: cFreq,
  stat_frequence_tpl_3_graphique: cFreq,
  stat_frequence_tpl_4_decimal: cFreq,
  stat_frequence_tpl_5_pourcentage: cFreq,
  stat_frequence_tpl_6_qcm: cFreqQcm,
  "4e_stat_donnee_defi_tpl_1_effectif_frequence": cFreqRegroupee,
  "4e_stat_donnee_defi_tpl_2_total_manquant": cManquant,
  "4e_stat_donnee_defi_tpl_3_lire_le_bon": cEcartExtremes,
  "4e_stat_donnee_defi_tpl_4_camembert": cCamembert,
});

/** Français : élision devant une voyelle (« d'Inès »), jamais devant Y (« de Yanis »). */
function francais(q: Q): string[] {
  const tout = [q.text, ...(q.choices ?? [])].join(" ");
  const m = tout.match(/\bde ([AEIOUÉÈÂ][a-zéèëï]+)/) ?? tout.match(/\bd'(Y[a-z]+)/);
  return m ? [`élision fautive : « ${m[0]} »`] : [];
}

export const CORRECTEURS: CorrecteursMaths = Object.fromEntries(
  Object.entries({ ...CORRECTEURS_DONNEE, ...CORRECTEURS_STATISTIQUE }).map(([id, f]) => [id, (q: Q) => [...francais(q), ...f(q)]]),
);
