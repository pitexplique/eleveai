import type { CorrecteursMaths } from "./types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import {
  avecRegleMotsCles,
  lireNombre,
  qcmUnique as qcmUniqueBrut,
  uniteAttendue,
} from "@/lib/tutor-v4/questionBank/6e/maths/correcteurs/pourcentages";

// LES CORRECTEURS DE statistiques.bank.ts — 5e, notion stat_statistique
// (09/10/2026, voir 6e/maths/correcteurs/types.ts). Chacun relit ce que voit
// l'élève — le TABLEAU (canvas « tableau_donnees »), le DIAGRAMME (canvas
// « stat_graph » : barres, bâtons, circulaire) ou la liste du texte — refait le
// dépouillement ou le calcul (effectif, total, fréquence, angle, moyenne), et
// rend la liste des problèmes : bonne réponse, une seule proposition juste,
// unité, deux décimales au plus, diagramme qui ne surligne pas la réponse.

type Q = TutorGeneratedQuestionV4;
const qcmUnique = (q: Q, juste: (c: string) => boolean) => qcmUniqueBrut(q, (c) => juste(c.trim()));

const num = (s: string) => Number(s.replace(",", "."));
const egal = (a: number | null | undefined, b: number | null | undefined) =>
  a != null && b != null && Number.isFinite(a) && Number.isFinite(b) && Math.abs(a - b) < 1e-6;
const deuxDecimales = (x: number) => Math.abs(x * 100 - Math.round(x * 100)) < 1e-6;
const somme = (xs: number[]) => xs.reduce((a, b) => a + b, 0);

/** Les catégories citées entre guillemets dans la question, dans l'ordre. */
const citees = (t: string) => [...t.matchAll(/« ([^»]+) »/g)].map((m) => m[1]);

/** L'unité d'une mesure, lue dans le texte (« en minutes », « 12 km »). */
function uniteDuTexte(t: string): string {
  const parMot: Array<[RegExp, string]> = [
    [/en minutes/, "min"], [/en kilomètres|\d km\b/, "km"], [/en centimètres/, "cm"], [/en degrés/, "°C"],
    [/en euros/, "€"], [/en kilogrammes/, "kg"], [/en millimètres/, "mm"],
  ];
  return parMot.find(([re]) => re.test(t))?.[1] ?? "";
}

function verifierReponse(q: Q, juste: number, unite: string, quoi: string): string[] {
  const p: string[] = [];
  if (!Number.isFinite(juste)) return [`calcul impossible (${quoi})`];
  if (!deuxDecimales(juste)) p.push(`réponse ${juste} : plus de deux décimales (${quoi})`);
  if (juste < 0) p.push(`réponse ${juste} négative (${quoi})`);
  if (!egal(lireNombre(String(q.expected[0])), juste)) p.push(`attendu « ${q.expected[0]} », le calcul donne ${juste} (${quoi})`);
  if (uniteAttendue(q) !== unite) p.push(`unité de la réponse « ${uniteAttendue(q)} » au lieu de « ${unite} »`);
  if (q.format === "qcm") p.push("QCM inattendu pour une réponse numérique");
  return p;
}

/** Les catégories et effectifs du canvas (tableau ou diagramme), « ? » → null. */
function donneesCanvas(q: Q): { cats: string[]; eff: (number | null)[]; kind: string } | null {
  const c = q.canvas as
    | { kind: "tableau_donnees"; headers: string[]; rows: { values: (string | number)[] }[] }
    | { kind: "stat_graph"; graphType: string; data: { label: string; value: number }[]; display?: { highlightIndex?: number } }
    | undefined;
  if (!c) return null;
  if (c.kind === "tableau_donnees") {
    if (c.rows.length !== 1 || c.headers.length !== c.rows[0].values.length + 1) return null;
    return { cats: c.headers.slice(1), eff: c.rows[0].values.map((v) => (v === "?" ? null : Number(v))), kind: "tableau" };
  }
  if (c.kind === "stat_graph") return { cats: c.data.map((d) => d.label), eff: c.data.map((d) => d.value), kind: c.graphType };
  return null;
}

/** Ne jamais surligner une barre : cela donnait la réponse. */
function sansSurlignage(q: Q): string[] {
  const c = q.canvas as { kind?: string; display?: { highlightIndex?: number } } | undefined;
  return c?.kind === "stat_graph" && c.display?.highlightIndex != null ? ["le diagramme surligne une barre (il donne la réponse)"] : [];
}

/** Questions sur des effectifs (tableau ou diagramme) : lire, total, écart, somme, complément, case manquante, extrême. */
function questionEffectifs(q: Q, cats: string[], eff: (number | null)[]): string[] {
  const t = q.text;
  const p: string[] = [];
  if (new Set(cats).size !== cats.length) p.push("deux catégories de même nom");
  const vides = eff.filter((x) => x == null).length;
  const idx = (c: string) => cats.indexOf(c);
  const cs = citees(t);
  if (cs.some((c) => idx(c) < 0)) return [...p, `catégorie citée absente : ${cs.join(", ")}`];
  if (/le (plus|moins) souvent/.test(t)) {
    const v = eff as number[];
    const cible = /le plus souvent/.test(t) ? Math.max(...v) : Math.min(...v);
    if (v.filter((x) => x === cible).length !== 1) return [...p, "deux catégories à égalité pour l'extrême"];
    if ((q.choices ?? []).slice().sort().join("|") !== cats.slice().sort().join("|")) p.push("les propositions ne sont pas les catégories");
    return [...p, ...qcmUnique(q, (c) => c === cats[v.indexOf(cible)])];
  }
  if (vides === 1) {
    const tot = t.match(/En tout, (\d+) /);
    if (!tot) return [...p, "case manquante sans total"];
    const juste = Number(tot[1]) - somme(eff.filter((x) => x != null) as number[]);
    if (eff[idx(cs[0])] != null) p.push("la catégorie demandée n'est pas la case vide");
    return [...p, ...(juste <= 0 ? ["case manquante négative ou nulle"] : []), ...verifierReponse(q, juste, "", "case manquante")];
  }
  if (vides) return [...p, `${vides} cases vides`];
  const v = eff as number[];
  const total = somme(v);
  let juste: number;
  if (/n’ont pas répondu/.test(t)) juste = total - v[idx(cs[0])];
  else if (/de plus ont répondu/.test(t)) {
    juste = v[idx(cs[0])] - v[idx(cs[1])];
    if (juste <= 0) p.push("« de plus » pour une catégorie qui n'a pas plus");
  } else if (cs.length === 2 && / ou « /.test(t)) juste = v[idx(cs[0])] + v[idx(cs[1])];
  else if (/en tout|effectif total/.test(t)) juste = total;
  else if (cs.length === 1) juste = v[idx(cs[0])];
  else return [...p, "question illisible"];
  return [...p, ...verifierReponse(q, juste, "", "effectifs")];
}

// ─── Organiser ─────────────────────────────────────────────────────────────

function cOrganiser(q: Q): string[] {
  const t = q.text;
  const rep = t.match(/Voici les réponses : (.+?)\. /);
  if (rep) {
    const liste = rep[1].split(", ");
    if (/en tout|effectif total/.test(t)) return verifierReponse(q, liste.length, "", "nombre de réponses");
    const [cible] = citees(t);
    if (!cible) return ["réponse demandée illisible"];
    const n = liste.filter((x) => x === cible).length;
    if (!n) return ["la réponse demandée n'est pas dans la liste"];
    return verifierReponse(q, n, "", "effectif");
  }
  const serie = t.match(/ : ([\d ;]+)\. /);
  if (!serie) return ["série illisible"];
  const xs = serie[1].split(" ; ").map(num);
  const compte = (v: number) => xs.filter((x) => x === v).length;
  const valeur = t.match(/effectif de la valeur (\d+)/);
  if (valeur) return verifierReponse(q, compte(Number(valeur[1])), "", "effectif d'une valeur");
  const seuil = t.match(/supérieures ou égales à (\d+)/);
  if (seuil) return verifierReponse(q, xs.filter((x) => x >= Number(seuil[1])).length, "", "au moins");
  if (/le plus souvent/.test(t)) {
    const max = Math.max(...xs.map(compte));
    const modes = [...new Set(xs)].filter((v) => compte(v) === max);
    if (modes.length !== 1) return ["plusieurs valeurs les plus fréquentes"];
    return verifierReponse(q, modes[0], "", "valeur la plus fréquente");
  }
  return ["question illisible"];
}

// ─── Lire un tableau / un diagramme ────────────────────────────────────────

function cLireCanvas(q: Q): string[] {
  const d = donneesCanvas(q);
  if (!d) return ["tableau ou diagramme absent"];
  return [...sansSurlignage(q), ...questionEffectifs(q, d.cats, d.eff)];
}

// ─── Fréquences ────────────────────────────────────────────────────────────

function cFrequence(q: Q): string[] {
  const t = q.text;
  const enPct = /pourcentage/.test(t);
  const [cat] = citees(t);
  const d = donneesCanvas(q);
  // L'effectif à partir de la fréquence
  const fDonnee = t.match(/La fréquence de la réponse « [^»]+ » est (\d+(?:,\d+)?)( %)?/);
  if (fDonnee) {
    const N = t.match(/ : (\d+) \S+ ont répondu/);
    if (!N) return ["effectif total illisible"];
    const f = num(fDonnee[1]) / (fDonnee[2] ? 100 : 1);
    const k = Number(N[1]) * f;
    return [...(Number.isInteger(k) ? [] : [`effectif ${k} pas entier`]), ...verifierReponse(q, k, "", "effectif")];
  }
  let k: number;
  let N: number;
  if (d) {
    const v = d.eff as number[];
    k = v[d.cats.indexOf(cat)];
    N = somme(v);
  } else {
    const m = t.match(/Sur (\d+) \S+, (\d+) ont répondu/);
    if (!m) return ["données illisibles"];
    [N, k] = [Number(m[1]), Number(m[2])];
  }
  if (k == null || !(k > 0) || k > N) return ["effectif de la réponse illisible"];
  if (/(\d)\s*\/\s*(\d)/.test(String(q.explanation))) return ["fréquence écrite en fraction"];
  return verifierReponse(q, enPct ? (k * 100) / N : k / N, enPct ? "%" : "", "fréquence");
}

// ─── Représenter ───────────────────────────────────────────────────────────

function cRepresenter(q: Q): string[] {
  const t = q.text;
  const [cat] = citees(t);
  const d = donneesCanvas(q);
  const echelle = t.match(/1 cm représente (\d+) /);
  if (echelle) {
    const s = Number(echelle[1]);
    const h = t.match(/mesure (\d+(?:,\d+)?) cm/);
    if (h) return verifierReponse(q, num(h[1]) * s, "", "effectif lu sur la barre");
    if (!d) return ["tableau absent"];
    return verifierReponse(q, (d.eff as number[])[d.cats.indexOf(cat)] / s, "cm", "hauteur de la barre");
  }
  if (/diagramme circulaire/.test(t)) {
    const angle = t.match(/mesure (\d+)°/);
    if (angle) {
      const N = t.match(/ : (\d+) \S+ ont répondu/);
      if (!N) return ["effectif total illisible"];
      return verifierReponse(q, (Number(N[1]) * Number(angle[1])) / 360, "", "effectif lu sur l'angle");
    }
    if (!d) return ["tableau absent"];
    const v = d.eff as number[];
    const a = (v[d.cats.indexOf(cat)] * 360) / somme(v);
    return [...(Number.isInteger(a) ? [] : [`angle ${a}° pas entier`]), ...verifierReponse(q, a, "°", "angle du secteur")];
  }
  return ["question illisible"];
}

// ─── Choisir une représentation ────────────────────────────────────────────

function cChoisir(q: Q): string[] {
  const t = q.text;
  const d = donneesCanvas(q);
  if (d) {
    if (d.kind !== "camembert") return ["diagramme circulaire attendu"];
    const v = d.eff as number[];
    const [cat] = citees(t);
    return verifierReponse(q, (v[d.cats.indexOf(cat)] * 100) / somme(v), "%", "pourcentage d'un secteur");
  }
  const courbe = /évolution|mois après mois|chaque (jour|année|heure|semaine)/.test(t);
  const parts = /répartition|la part de|en parts/.test(t);
  const comparer = /comparer/.test(t);
  if (Number(courbe) + Number(parts) + Number(comparer) !== 1) return ["besoin ambigu (évolution, parts ou comparaison ?)"];
  const juste = courbe ? /courbe|en ligne/ : parts ? /circulaire/ : /en barres/;
  return qcmUnique(q, (c) => juste.test(c));
}

// ─── Moyennes ──────────────────────────────────────────────────────────────

function cMoyenne(q: Q): string[] {
  const t = q.text;
  const d = donneesCanvas(q);
  if (d) {
    // moyenne pondérée : les valeurs sont les catégories (en-têtes ou abscisses)
    const vals = d.cats.map(num);
    if (vals.some((x) => !Number.isFinite(x))) return ["valeurs du tableau illisibles"];
    const eff = d.eff as number[];
    return [...sansSurlignage(q), ...verifierReponse(q, somme(vals.map((v, k) => v * eff[k])) / somme(eff), "", "moyenne pondérée")];
  }
  const u = uniteDuTexte(t);
  // Deux élèves comparés
  if (/Qui a la plus grande moyenne/.test(t)) {
    const series = [...t.matchAll(/(\S+) : ([\d ;,]+)\./g)].map((m) => ({ nom: m[1], xs: m[2].split(" ; ").map(num) }));
    if (series.length !== 2) return ["deux séries attendues"];
    const [a, b] = series.map((s) => somme(s.xs) / s.xs.length);
    const juste = egal(a, b) ? "c’est pareil pour les deux" : a > b ? series[0].nom : series[1].nom;
    return qcmUnique(q, (c) => c === juste);
  }
  // Nouvelle moyenne : n valeurs de moyenne M, puis une valeur V
  if (/nouvelle moyenne/.test(t)) {
    const ns = (t.match(/\d+(?:,\d+)?/g) ?? []).map(num);
    if (ns.length !== 3) return [`trois nombres attendus (n, moyenne, nouvelle valeur), lus : ${ns.join(", ")}`];
    const [n, M, V] = ns;
    return verifierReponse(q, (n * M + V) / (n + 1), u, "nouvelle moyenne");
  }
  const serie = t.match(/ : ([\d ;,]+)\. /);
  if (!serie) return ["série illisible"];
  const xs = serie[1].split(" ; ").map(num);
  const objectif = t.match(/une moyenne de (\d+(?:,\d+)?)/);
  if (objectif) {
    const x = num(objectif[1]) * (xs.length + 1) - somme(xs);
    const p = x < Math.min(...xs) - 10 || x > Math.max(...xs) + 10 ? [`valeur ${x} hors de portée de la série`] : [];
    return [...p, ...verifierReponse(q, x, u, "valeur manquante")];
  }
  return verifierReponse(q, somme(xs) / xs.length, u, "moyenne");
}

export const CORRECTEURS: CorrecteursMaths = avecRegleMotsCles({
  stat_donnee_organiser_tpl_1: cOrganiser,
  stat_donnee_organiser_tpl_2: cOrganiser,
  stat_donnee_organiser_tpl_e1: cOrganiser,
  stat_lire_tableau_tpl_1: cLireCanvas,
  stat_lire_tableau_tpl_2: cLireCanvas,
  stat_lire_tableau_tpl_3: cLireCanvas,
  stat_lire_tableau_tpl_e1: cLireCanvas,
  stat_lire_graphique_tpl_1: cLireCanvas,
  stat_lire_graphique_tpl_2: cLireCanvas,
  stat_lire_graphique_tpl_3: cLireCanvas,
  stat_effectif_frequence_tpl_1: cFrequence,
  stat_effectif_frequence_tpl_2: cFrequence,
  stat_effectif_frequence_tpl_3: cFrequence,
  stat_effectif_frequence_tpl_e2: cFrequence,
  stat_representer_tpl_1: cRepresenter,
  stat_representer_tpl_2: cRepresenter,
  stat_representer_tpl_3: cRepresenter,
  stat_representer_tpl_e2: cRepresenter,
  stat_representation_choisir_tpl_1: cChoisir,
  stat_representation_choisir_tpl_2: cChoisir,
  stat_representation_choisir_tpl_e2: cChoisir,
  stat_moyenne_tpl_1: cMoyenne,
  stat_moyenne_tpl_2: cMoyenne,
  stat_moyenne_tpl_3: cMoyenne,
  stat_moyenne_tpl_e2: cMoyenne,
  stat_defi_tpl_1: cMoyenne,
  stat_defi_tpl_2: cMoyenne,
  stat_defi_tpl_3: cMoyenne,
  stat_defi_tpl_e4: cMoyenne,
});
