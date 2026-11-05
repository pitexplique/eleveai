import type { CorrecteursMaths } from "@/lib/tutor-v4/questionBank/4e/maths/correcteurs/types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { avecRegleMotsCles, qcmUnique } from "@/lib/tutor-v4/questionBank/6e/maths/correcteurs/pourcentages";

// LES CORRECTEURS DE stat-classes.bank.ts (05/11/2026). Bornes, effectifs et cumuls se
// relisent DANS LA FIGURE (tableau, histogramme, polygone), la classe ou le seuil DANS
// LE TEXTE, et le calcul est refait. Vide = juste.

type Q = TutorGeneratedQuestionV4;
const NB = "\\d+(?:,\\d+)?";
const n = (s: string) => Number(String(s).replace(",", "."));
const egal = (a: number, b: number) => Math.abs(a - b) < 1e-7;
const somme = (l: number[]) => l.reduce((s, x) => s + x, 0);
const RE_CL = new RegExp(`de (${NB}) à moins de (${NB})`, "g");
const classes = (t: string) => [...t.matchAll(RE_CL)].map((m) => [n(m[1]), n(m[2])] as const);
const rep = (q: Q, juste: number) => {
  const r = q.expected.filter((e) => !egal(n(String(e)), juste)).map((e) => `attendu « ${e} », juste ${juste}`);
  return r;
};
const texte = (q: Q, juste: string) => (q.expected[0] === juste ? [] : [`attendu « ${q.expected[0]} », juste « ${juste} »`]);
/** Une figure lue : bornes, effectifs (NaN si « ? » ou absents), cumuls (NaN si « ? » ou absents). */
function lire(q: Q): { p: string[]; B: number[]; E: number[]; K: number[] } {
  const f = q.canvas as any;
  const p: string[] = [];
  if (f?.kind === "tableau_donnees") {
    const lignes = f.rows.map((r: any) => r.values);
    const c = lignes.map((v: any[]) => classes(String(v[0]))[0]);
    if (c.some((x: any) => !x)) return { p: ["classe illisible dans le tableau"], B: [], E: [], K: [] };
    const B = [c[0][0], ...c.map((x: any) => x[1])];
    if (c.some((x: any, i: number) => i > 0 && x[0] !== c[i - 1][1])) p.push("classes non jointives");
    const a = B[1] - B[0];
    if (B.some((b, i) => i > 0 && !egal(b - B[i - 1], a))) p.push("classes inégales");
    const iCum = f.headers.indexOf("Effectif cumulé");
    const iEff = f.headers.length >= 2 && iCum !== 1 ? 1 : -1;
    const E = lignes.map((v: any[]) => (iEff >= 0 && typeof v[iEff] === "number" ? v[iEff] : NaN));
    const K = lignes.map((v: any[]) => (iCum >= 0 && typeof v[iCum] === "number" ? v[iCum] : NaN));
    if (iEff >= 0 && iCum >= 0) {
      let t = 0;
      lignes.forEach((_: any, i: number) => {
        if (!Number.isNaN(E[i])) t += E[i];
        if (!Number.isNaN(K[i]) && !E.some(Number.isNaN) && K[i] !== t) p.push(`cumul faux ligne ${i + 1}`);
      });
    }
    return { p, B, E, K };
  }
  if (f?.kind === "stat_graph" && f.graphType === "histogramme") {
    const B: number[] = f.bornes;
    const E: number[] = f.data.map((d: any) => d.value);
    if (B.length !== E.length + 1) p.push("bornes et barres incohérentes");
    if (E.some((e) => e % f.display.step !== 0)) p.push("une barre tombe entre deux graduations");
    if (f.data.some((d: any, i: number) => d.label !== `de ${B[i]} à ${B[i + 1]}`)) p.push("étiquette de classe fausse");
    return { p, B, E, K: E.map((_, i) => somme(E.slice(0, i + 1))) };
  }
  if (f?.kind === "stat_graph" && f.graphType === "courbe") {
    const B: number[] = f.data.map((d: any) => n(d.label));
    const v: number[] = f.data.map((d: any) => d.value);
    if (v[0] !== 0) p.push("le polygone ne part pas de 0");
    if (v.some((x, i) => i > 0 && x < v[i - 1])) p.push("polygone décroissant");
    if (v.some((x) => x % f.display.step !== 0)) p.push("un point tombe entre deux graduations");
    return { p, B, E: v.slice(1).map((x, i) => x - v[i]), K: v.slice(1) };
  }
  return { p: ["pas de figure lisible"], B: [], E: [], K: [] };
}
const indice = (B: number[], c: readonly [number, number]) => B.findIndex((b, i) => egal(b, c[0]) && egal(B[i + 1], c[1]));
const estClasse = (c: string, a: number, b: number) => {
  const k = classes(c);
  return k.length === 1 && egal(k[0][0], a) && egal(k[0][1], b);
};
const centres = (B: number[], E: number[]) => E.map((_, i) => (B[i] + B[i + 1]) / 2);
const moyenne = (B: number[], E: number[]) => somme(centres(B, E).map((c, i) => c * E[i])) / somme(E);
const iMax = (E: number[]) => {
  const m = Math.max(...E);
  return E.filter((x) => x === m).length === 1 ? E.indexOf(m) : -1;
};
/** Une liste « a ; b ; c » dans l'énoncé. */
const serie = (t: string) => {
  const m = t.match(/(?:Série|Valeurs) : ([\d ;,]+)\./);
  return m ? m[1].split(" ; ").map(n) : null;
};
const compteDans = (l: number[], a: number, b: number) => l.filter((x) => x >= a && x < b).length;

/* ───── regrouper ───── */
function amplitudeTexte(q: Q) {
  const [c] = classes(q.text);
  return c ? rep(q, c[1] - c[0]) : ["classe illisible"];
}
function rangerValeur(q: Q) {
  const { p, B } = lire(q);
  const v = q.text.match(/(?:valeur|contient exactement) (\d+)/);
  if (!v) return [...p, "valeur illisible"];
  const x = n(v[1]);
  const i = B.findIndex((b, j) => j < B.length - 1 && b <= x && x < B[j + 1]);
  if (i < 0) return [...p, "valeur hors du tableau"];
  return [...p, ...qcmUnique(q, (c) => estClasse(c, B[i], B[i + 1]))];
}
function effectifDeClasse(q: Q) {
  const { p, B, E } = lire(q);
  const [c] = classes(q.text);
  if (!c) return [...p, "classe illisible"];
  const i = indice(B, c);
  if (i < 0) return [...p, "classe absente de la figure"];
  return [...p, ...rep(q, E[i])];
}
function nombreClasses(q: Q) {
  const { p, E } = lire(q);
  return [...p, ...rep(q, E.length)];
}
function appartient(q: Q) {
  const [c] = classes(q.text);
  const t = q.text.replace(RE_CL, "");
  const v = t.match(new RegExp(NB));
  if (!c || !v) return ["énoncé illisible"];
  const x = n(v[0]);
  return texte(q, x >= c[0] && x < c[1] ? "Oui" : "Non");
}
function borneTexte(q: Q) {
  const [c] = classes(q.text);
  const inf = /inférieure/.test(q.text);
  if (!c || inf === /supérieure/.test(q.text)) return ["énoncé illisible"];
  return rep(q, inf ? c[0] : c[1]);
}
function compterSerie(q: Q) {
  const l = serie(q.text);
  const [c] = classes(q.text);
  if (!l || !c) return ["série ou classe illisibles"];
  return rep(q, compteDans(l, c[0], c[1]));
}
function nbClassesDecoupe(q: Q) {
  const a = q.text.match(/(?:amplitude|pas de) (\d+)/);
  const d = q.text.match(/(?:de|entre) (\d+) (?:à|et) (\d+)/i);
  if (!a || !d) return ["énoncé illisible"];
  const r = (n(d[2]) - n(d[1])) / n(a[1]);
  return Number.isInteger(r) ? rep(q, r) : [`${r} classes`];
}
function total(q: Q) {
  const { p, E } = lire(q);
  return [...p, ...rep(q, somme(E))];
}
function repartition(q: Q) {
  const l = serie(q.text);
  const c = classes(q.text);
  if (!l || c.length !== 3) return ["série ou classes illisibles"];
  const juste = c.map(([a, b]) => compteDans(l, a, b)).join(" ; ");
  return qcmUnique(q, (x) => x === juste);
}
function frequenceClasse(q: Q) {
  const { p, B, E } = lire(q);
  const [c] = classes(q.text);
  if (!c) return [...p, "classe illisible"];
  const i = indice(B, c);
  if (i < 0) return [...p, "classe absente"];
  const j = (E[i] * 100) / somme(E);
  if (!Number.isInteger(j)) return [...p, `${j} % n’est pas entier`];
  return [...p, ...rep(q, j)];
}
function seuil(q: Q) {
  const { p, B, E } = lire(q);
  const t = q.text.replace(RE_CL, "");
  const m = t.match(/au moins (\d+)/);
  const s = t.match(/moins de (\d+)/);
  if (!m && !s) return [...p, "seuil illisible"];
  const k = B.indexOf(n((m ?? s)![1]));
  if (k < 0) return [...p, "le seuil n’est pas une borne"];
  return [...p, ...rep(q, m ? somme(E.slice(k)) : somme(E.slice(0, k)))];
}
function nbClassesFaut(q: Q) {
  const g = q.text.match(/la plus grande (\d+)/);
  const a = q.text.match(/classes de (\d+)/);
  const d = q.text.match(/en partant de (\d+)/);
  if (!g || !a || !d) return ["énoncé illisible"];
  return rep(q, Math.floor((n(g[1]) - n(d[1])) / n(a[1])) + 1);
}
function effectifManquant(q: Q) {
  const { p, B, E } = lire(q);
  const T = q.text.match(/(?:Il y a|Effectif total :|Le total vaut) (\d+)/);
  const [c] = classes(q.text);
  if (!T || !c) return [...p, "total ou classe illisibles"];
  const i = indice(B, c);
  if (i < 0 || !Number.isNaN(E[i])) return [...p, "la classe demandée n’est pas le « ? »"];
  return [...p, ...rep(q, n(T[1]) - somme(E.filter((e) => !Number.isNaN(e))))];
}
function fusion(q: Q) {
  const { p, B, E } = lire(q);
  const c = classes(q.text);
  if (c.length !== 2) return [...p, "deux classes attendues"];
  const [i, j] = [indice(B, c[0]), indice(B, c[1])];
  if (i < 0 || j !== i + 1) return [...p, "classes non voisines"];
  return [...p, ...rep(q, /amplitude/.test(q.text) ? c[1][1] - c[0][0] : E[i] + E[j])];
}

/* ───── modale et centre ───── */
function centreTexte(q: Q) {
  const [c] = classes(q.text);
  return c ? rep(q, (c[0] + c[1]) / 2) : ["classe illisible"];
}
function modale(q: Q) {
  const { p, B, E } = lire(q);
  const i = iMax(E);
  if (i < 0) return [...p, "deux classes à égalité"];
  return [...p, ...qcmUnique(q, (c) => estClasse(c, B[i], B[i + 1]))];
}
function definition(juste: string) {
  return (q: Q) => qcmUnique(q, (c) => c === juste);
}
function calculCentre(q: Q) {
  const [c] = classes(q.text);
  if (!c) return ["classe illisible"];
  return qcmUnique(q, (x) => x === `(${c[0]} + ${c[1]}) ÷ 2`);
}
function centreModale(q: Q) {
  const { p, B, E } = lire(q);
  const i = iMax(E);
  if (i < 0) return [...p, "deux classes à égalité"];
  return [...p, ...rep(q, (B[i] + B[i + 1]) / 2)];
}
function classeDeCentre(q: Q) {
  const nb = q.text.match(new RegExp(`[Cc]entre (${NB})`));
  const a = q.text.match(new RegExp(`[Aa]mplitude (${NB})`));
  if (!nb || !a) return ["centre ou amplitude illisibles"];
  const [m, w] = [n(nb[1]), n(a[1])];
  return qcmUnique(q, (c) => estClasse(c, m - w / 2, m + w / 2));
}
function effectifModale(q: Q) {
  const { p, E } = lire(q);
  const i = iMax(E);
  if (i < 0) return [...p, "deux classes à égalité"];
  return [...p, ...rep(q, E[i])];
}
function listeCentres(q: Q) {
  const { p, B, E } = lire(q);
  const juste = centres(B, E).map((x) => String(x).replace(".", ",")).join(" ; ");
  return [...p, ...qcmUnique(q, (c) => c === juste)];
}
function pctModale(q: Q) {
  const { p, E } = lire(q);
  const i = iMax(E);
  if (i < 0) return [...p, "deux classes à égalité"];
  const j = (E[i] * 100) / somme(E);
  if (!Number.isInteger(j)) return [...p, `${j} % n’est pas entier`];
  return [...p, ...rep(q, j)];
}
function classeDeuxCentres(q: Q) {
  const m = q.text.match(new RegExp(`centres (${NB}) et (${NB})`));
  if (!m) return ["centres illisibles"];
  const [a, b] = [n(m[1]), n(m[2])];
  const w = b - a;
  return qcmUnique(q, (c) => estClasse(c, b - w / 2, b + w / 2));
}
function modaleApresAjout(q: Q) {
  const { p, B, E } = lire(q);
  const k = q.text.match(/(\d+) valeurs? dans/);
  const [c] = classes(q.text);
  if (!k || !c) return [...p, "ajout illisible"];
  const j = indice(B, c);
  if (j < 0) return [...p, "classe absente"];
  const N = E.map((e, x) => (x === j ? e + n(k[1]) : e));
  const i = iMax(N);
  if (i < 0) return [...p, "deux classes à égalité"];
  return [...p, ...qcmUnique(q, (x) => estClasse(x, B[i], B[i + 1]))];
}
function modaleSerie(q: Q) {
  const l = serie(q.text);
  const fin = q.text.split("Classes :")[1] ?? "";
  const c = classes(fin);
  if (!l || c.length < 2) return ["série ou classes illisibles"];
  const E = c.map(([a, b]) => compteDans(l, a, b));
  if (somme(E) !== l.length) return ["une valeur hors des classes"];
  const i = iMax(E);
  if (i < 0) return ["deux classes à égalité"];
  return qcmUnique(q, (x) => estClasse(x, c[i][0], c[i][1]));
}

/* ───── moyenne ───── */
function produit(q: Q) {
  const [c] = classes(q.text);
  const e = q.text.replace(RE_CL, "").match(/(?:[Ee]ffectif |: )(\d+)/);
  if (!c || !e) return ["classe ou effectif illisibles"];
  return rep(q, ((c[0] + c[1]) / 2) * n(e[1]));
}
function sommeSurTotal(q: Q) {
  const s = q.text.match(new RegExp(`(?:produits(?: vaut| :)? |Avec )(${NB})`));
  const T = q.text.match(/(?:[Ee]ffectif total(?: est| :)? |et |Pour )(\d+)(?! ÷)/);
  if (!s || !T) return ["somme ou total illisibles"];
  return rep(q, n(s[1]) / n(T[1]));
}
function calculMoyenne(q: Q) {
  const { p, B, E } = lire(q);
  const juste = `(${centres(B, E).map((c, i) => `${String(c).replace(".", ",")} × ${E[i]}`).join(" + ")}) ÷ ${somme(E)}`;
  return [...p, ...qcmUnique(q, (c) => c === juste)];
}
function moyenneFig(q: Q) {
  const { p, B, E } = lire(q);
  const m = moyenne(B, E);
  if (!egal(m * 100, Math.round(m * 100))) return [...p, `moyenne ${m} : plus de deux décimales`];
  return [...p, ...rep(q, m)];
}
function sommeProduits(q: Q) {
  const { p, B, E } = lire(q);
  return [...p, ...rep(q, somme(centres(B, E).map((c, i) => c * E[i])))];
}
function moyenneArrondie(q: Q) {
  const { p, B, E } = lire(q);
  return [...p, ...rep(q, Math.floor(moyenne(B, E) * 10 + 0.5 + 1e-9) / 10)];
}
function moyenneManquant(q: Q) {
  const { p, B, E } = lire(q);
  const M = q.text.match(new RegExp(`moyenne (?:vaut|est) (${NB})`));
  const i = E.findIndex(Number.isNaN);
  if (!M || i < 0) return [...p, "moyenne ou « ? » illisibles"];
  const K = centres(B, E);
  const S = somme(K.map((c, j) => (j === i ? 0 : c * E[j])));
  const N = somme(E.filter((e) => !Number.isNaN(e)));
  const m = n(M[1]);
  // S + c x = m (N + x)
  const x = (m * N - S) / (K[i] - m);
  if (!egal(x, Math.round(x)) || x <= 0) return [...p, `effectif manquant ${x}`];
  return [...p, ...rep(q, Math.round(x))];
}
function groupes(q: Q) {
  const f = q.canvas as any;
  if (f?.kind !== "tableau_donnees" || f.headers.length !== 3) return ["tableau à deux groupes attendu"];
  const c = f.rows.map((r: any) => classes(String(r.values[0]))[0]);
  const K = c.map((x: any) => (x[0] + x[1]) / 2);
  const moy = (j: number) => somme(f.rows.map((r: any, i: number) => K[i] * r.values[j])) / somme(f.rows.map((r: any) => r.values[j]));
  const [a, b] = [moy(1), moy(2)];
  if (egal(a, b)) return ["moyennes égales"];
  return texte(q, a > b ? "Groupe A" : "Groupe B");
}
function deuxGroupes(q: Q) {
  const m = q.text.match(/de (\d+) personnes a pour moyenne (\d+).*de (\d+) personnes a pour moyenne (\d+)/);
  if (!m) return ["énoncé illisible"];
  const [a, b, c, d] = m.slice(1).map(n);
  return rep(q, (a * b + c * d) / (a + c));
}

/* ───── cumulés ───── */
function cumulClasse(q: Q) {
  const { p, B, E } = lire(q);
  const [c] = classes(q.text);
  if (!c) return [...p, "classe illisible"];
  const i = indice(B, c);
  if (i < 0) return [...p, "classe absente"];
  return [...p, ...rep(q, somme(E.slice(0, i + 1)))];
}
function cumulCache(q: Q) {
  const { p, E, K } = lire(q);
  const i = K.findIndex(Number.isNaN);
  if (i < 0) return [...p, "pas de « ? »"];
  return [...p, ...rep(q, somme(E.slice(0, i + 1)))];
}
function sensCumul(q: Q) {
  const [c] = classes(q.text);
  if (!c) return ["classe illisible"];
  return qcmUnique(q, (x) => x === `Les valeurs inférieures à ${c[1]}`);
}
function sousSeuilCumul(q: Q) {
  const { p, B, K } = lire(q);
  const m = q.text.match(/(?:inférieures à|moins de|sous) (\d+)/);
  if (!m) return [...p, "seuil illisible"];
  const i = B.indexOf(n(m[1]));
  if (i < 1) return [...p, "le seuil n’est pas une borne"];
  return [...p, ...rep(q, K[i - 1])];
}
function effectifDepuisCumul(q: Q) {
  const { p, B, K } = lire(q);
  const [c] = classes(q.text);
  if (!c) return [...p, "classe illisible"];
  const i = indice(B, c);
  if (i < 1) return [...p, "classe absente"];
  return [...p, ...rep(q, K[i] - K[i - 1])];
}
function freqCumul(q: Q) {
  const { p, B, E } = lire(q);
  const m = q.text.match(/(?:moins de|sous) (\d+)/);
  if (!m) return [...p, "seuil illisible"];
  const i = B.indexOf(n(m[1]));
  if (i < 1) return [...p, "le seuil n’est pas une borne"];
  const j = (somme(E.slice(0, i)) * 100) / somme(E);
  if (!Number.isInteger(j)) return [...p, `${j} % n’est pas entier`];
  return [...p, ...rep(q, j)];
}
function listeCumuls(q: Q) {
  const { p, E } = lire(q);
  const juste = E.map((_, i) => somme(E.slice(0, i + 1))).join(" ; ");
  return [...p, ...qcmUnique(q, (c) => c === juste)];
}
function auMoinsCumul(q: Q) {
  const { p, B, E } = lire(q);
  const m = q.text.match(/au moins (\d+)/);
  if (!m) return [...p, "seuil illisible"];
  const k = B.indexOf(n(m[1]));
  if (k < 0) return [...p, "le seuil n’est pas une borne"];
  return [...p, ...rep(q, somme(E.slice(k)))];
}
function classeMediane(q: Q) {
  const { p, B, E } = lire(q);
  const T = somme(E);
  let t = 0;
  const i = E.findIndex((e) => (t += e) > T / 2);
  if (E.some((_, j) => somme(E.slice(0, j + 1)) === T / 2)) return [...p, "la médiane tombe sur une borne"];
  return [...p, ...qcmUnique(q, (c) => estClasse(c, B[i], B[i + 1]))];
}
function medianePolygone(q: Q) {
  const { p, B, K } = lire(q);
  const T = K[K.length - 1];
  const i = K.indexOf(T / 2);
  if (i < 0) return [...p, "aucun point à la moitié du total"];
  return [...p, ...rep(q, B[i + 1])];
}
function decroissant(q: Q) {
  const { p, B, E } = lire(q);
  const m = q.text.match(/à partir de (\d+)/);
  if (!m) return [...p, "borne illisible"];
  const k = B.indexOf(n(m[1]));
  if (k < 0) return [...p, "le seuil n’est pas une borne"];
  return [...p, ...rep(q, somme(E.slice(k)))];
}
function entreDeuxBornes(q: Q) {
  const { p, B, K } = lire(q);
  const m = q.text.match(/entre (\d+) et (\d+)/);
  if (!m) return [...p, "bornes illisibles"];
  const [i, j] = [B.indexOf(n(m[1])), B.indexOf(n(m[2]))];
  if (i < 1 || j <= i) return [...p, "bornes absentes"];
  return [...p, ...rep(q, K[j - 1] - K[i - 1])];
}

export const CORRECTEURS: CorrecteursMaths = avecRegleMotsCles({
  stat_classes_regrouper_tpl_1: amplitudeTexte,
  stat_classes_regrouper_tpl_2: rangerValeur,
  stat_classes_regrouper_tpl_3: effectifDeClasse,
  stat_classes_regrouper_tpl_4: nombreClasses,
  stat_classes_regrouper_tpl_5: appartient,
  stat_classes_regrouper_tpl_6: borneTexte,
  stat_classes_regrouper_tpl_7: compterSerie,
  stat_classes_regrouper_tpl_8: rangerValeur,
  stat_classes_regrouper_tpl_9: nbClassesDecoupe,
  stat_classes_regrouper_tpl_10: total,
  stat_classes_regrouper_tpl_11: repartition,
  stat_classes_regrouper_tpl_12: compterSerie,
  stat_classes_regrouper_tpl_13: frequenceClasse,
  stat_classes_regrouper_tpl_14: seuil,
  stat_classes_regrouper_tpl_15: nbClassesFaut,
  stat_classes_regrouper_tpl_16: effectifManquant,
  stat_classes_regrouper_tpl_17: fusion,

  stat_classe_modale_centre_tpl_1: centreTexte,
  stat_classe_modale_centre_tpl_2: modale,
  stat_classe_modale_centre_tpl_3: modale,
  stat_classe_modale_centre_tpl_4: definition("La classe de plus grand effectif"),
  stat_classe_modale_centre_tpl_5: calculCentre,
  stat_classe_modale_centre_tpl_6: centreTexte,
  stat_classe_modale_centre_tpl_7: centreModale,
  stat_classe_modale_centre_tpl_8: classeDeCentre,
  stat_classe_modale_centre_tpl_9: effectifModale,
  stat_classe_modale_centre_tpl_10: listeCentres,
  stat_classe_modale_centre_tpl_11: modale,
  stat_classe_modale_centre_tpl_12: centreModale,
  stat_classe_modale_centre_tpl_13: pctModale,
  stat_classe_modale_centre_tpl_14: classeDeuxCentres,
  stat_classe_modale_centre_tpl_15: modaleApresAjout,
  stat_classe_modale_centre_tpl_16: modaleSerie,

  stat_moyenne_classes_tpl_1: produit,
  stat_moyenne_classes_tpl_2: sommeSurTotal,
  stat_moyenne_classes_tpl_3: calculMoyenne,
  stat_moyenne_classes_tpl_4: definition("Son centre"),
  stat_moyenne_classes_tpl_5: moyenneFig,
  stat_moyenne_classes_tpl_6: sommeProduits,
  stat_moyenne_classes_tpl_7: moyenneFig,
  stat_moyenne_classes_tpl_8: definition("C’est une valeur approchée de la vraie moyenne"),
  stat_moyenne_classes_tpl_9: moyenneFig,
  stat_moyenne_classes_tpl_10: moyenneArrondie,
  stat_moyenne_classes_tpl_11: moyenneFig,
  stat_moyenne_classes_tpl_12: moyenneManquant,
  stat_moyenne_classes_tpl_13: groupes,
  stat_moyenne_classes_tpl_14: deuxGroupes,

  stat_effectifs_cumules_tpl_1: cumulClasse,
  stat_effectifs_cumules_tpl_2: cumulCache,
  stat_effectifs_cumules_tpl_3: total,
  stat_effectifs_cumules_tpl_4: sensCumul,
  stat_effectifs_cumules_tpl_5: sousSeuilCumul,
  stat_effectifs_cumules_tpl_6: effectifDepuisCumul,
  stat_effectifs_cumules_tpl_7: freqCumul,
  stat_effectifs_cumules_tpl_8: sousSeuilCumul,
  stat_effectifs_cumules_tpl_9: listeCumuls,
  stat_effectifs_cumules_tpl_10: auMoinsCumul,
  stat_effectifs_cumules_tpl_11: freqCumul,
  stat_effectifs_cumules_tpl_12: sousSeuilCumul,
  stat_effectifs_cumules_tpl_13: classeMediane,
  stat_effectifs_cumules_tpl_14: medianePolygone,
  stat_effectifs_cumules_tpl_15: decroissant,
  stat_effectifs_cumules_tpl_16: entreDeuxBornes,
});
