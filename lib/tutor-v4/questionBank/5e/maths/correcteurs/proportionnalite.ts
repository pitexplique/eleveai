import type { CorrecteursMaths } from "./types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import {
  avecRegleMotsCles,
  lireNombre,
  qcmUnique as qcmUniqueBrut,
  uniteAttendue,
} from "@/lib/tutor-v4/questionBank/6e/maths/correcteurs/pourcentages";

// LES CORRECTEURS DE proportionnalite.bank.ts — 5e, notions prop_proportionnalite
// et prop_ratio_pourcentage (09/10/2026, voir 6e/maths/correcteurs/types.ts).
// Chacun relit ce que voit l'élève — les nombres DU TEXTE avec le mot qui les
// suit (« 3 kg », « 12 € »), le TABLEAU s'il y en a un — refait le calcul sans
// passer par le gabarit, et rend la liste des problèmes (vide = juste) : bonne
// réponse, une seule proposition juste, unité de la réponse, nombres plausibles
// (deux décimales au plus, rien de négatif).

type Q = TutorGeneratedQuestionV4;

const qcmUnique = (q: Q, juste: (c: string) => boolean) => qcmUniqueBrut(q, (c) => juste(c.trim()));

// ─── Lecture ───────────────────────────────────────────────────────────────

const num = (s: string) => Number(s.replace(",", "."));
const egal = (a: number | null | undefined, b: number | null | undefined) =>
  a != null && b != null && Number.isFinite(a) && Number.isFinite(b) && Math.abs(a - b) < 1e-6;
const deuxDecimales = (x: number) => Math.abs(x * 100 - Math.round(x * 100)) < 1e-6;
const entier = (x: number) => Math.abs(x - Math.round(x)) < 1e-6;

/** Tous les nombres du texte, dans l'ordre. */
function nombres(t: string): number[] {
  return (t.match(/\d+(?:,\d+)?/g) ?? []).map(num);
}

/** Chaque nombre avec le mot qui le suit : « 7 kg » → { 7, kg } ; « 30, » → { 30, "" }. */
function grandeurs(t: string): { v: number; u: string; i: number }[] {
  const out: { v: number; u: string; i: number }[] = [];
  for (const m of t.matchAll(/(\d+(?:,\d+)?)(?:\s+([^\s,.;:?!()«»]+))?/g)) out.push({ v: num(m[1]), u: m[2] ?? "", i: m.index! });
  return out;
}
const voir = (gs: { v: number; u: string }[]) => gs.map((x) => `${x.v} ${x.u}`).join(", ");

/** Les unités de MESURE qu'on écrit dans la réponse ; un dénombrement n'en a pas. */
const MESURES = new Set(["€", "kg", "g", "km", "m", "cm", "L", "mL", "h", "min", "m²", "%"]);

function verifierUnite(q: Q, u: string): string[] {
  const voulu = MESURES.has(u) ? u : "";
  const lu = uniteAttendue(q);
  return lu === voulu ? [] : [`unité de la réponse « ${lu} » au lieu de « ${voulu} »`];
}

/** Un prix écrit dans le texte ou la réponse : entier, ou deux décimales (« 7,50 € », pas « 7,5 € »). */
function prixBienEcrits(q: Q): string[] {
  const p: string[] = [];
  for (const s of [q.text, ...(q.choices ?? []), ...(q.expected ?? [])].map(String))
    for (const m of s.matchAll(/(\d+),(\d+) €/g)) if (m[2].length !== 2) p.push(`prix mal écrit : « ${m[0]} » (deux décimales)`);
  return p;
}

/** Réponse courte : la bonne valeur, deux décimales au plus, positive, la bonne unité. */
function verifierReponse(q: Q, juste: number | null, unite: string | null, quoi: string): string[] {
  if (juste == null || !Number.isFinite(juste)) return [`calcul impossible à refaire (${quoi})`];
  const p: string[] = [];
  if (!deuxDecimales(juste)) p.push(`réponse ${juste} : plus de deux décimales (${quoi})`);
  if (juste <= 0) p.push(`réponse ${juste} : pas plausible (${quoi})`);
  if (!egal(lireNombre(String(q.expected[0])), juste)) p.push(`attendu « ${q.expected[0]} », le texte donne ${juste} (${quoi})`);
  if (q.format === "qcm") {
    p.push(...qcmUnique(q, (c) => egal(lireNombre(c), juste)));
  }
  return [...p, ...(unite == null ? [] : verifierUnite(q, unite)), ...prixBienEcrits(q)];
}

/** Deux réponses possibles : oui/non ou vrai/faux ; « Vrai ou faux » se répond par vrai / faux. */
function ouiNon(q: Q, vrai: boolean): string[] {
  const vf = /Vrai ou faux/.test(q.text);
  const c = (q.choices ?? []).join("|");
  const p: string[] = [];
  if (vf && c !== "vrai|faux") p.push(`« Vrai ou faux » avec les choix ${c}`);
  if (!vf && c !== "oui|non") p.push(`question oui / non avec les choix ${c}`);
  return [...p, ...qcmUnique(q, (x) => (vrai ? x === "oui" || x === "vrai" : x === "non" || x === "faux"))];
}

/** Le tableau du canvas, en nombres (null pour « ? »). */
function grilleCanvas(q: Q): (number | null)[][] | null {
  const c = q.canvas as { kind?: string; values?: string[][]; missing?: { row: number; col: number }[] } | undefined;
  if (c?.kind !== "tableau_proportionnalite" || !c.values) return null;
  return c.values.map((r) => r.map((v) => (v === "?" ? null : num(v))));
}

/** Les relevés (A, B) lus dans le texte : grandeurs consécutives deux à deux, deux unités différentes. */
function releves(t: string): { A: number[]; B: number[]; uA: string; uB: string } | null {
  const gs = grandeurs(t);
  if (gs.length < 4 || gs.length % 2) return null;
  const units = [...new Set(gs.map((g) => g.u))];
  if (units.length !== 2) return null;
  const [uA, uB] = units;
  const A: number[] = [];
  const B: number[] = [];
  for (let i = 0; i < gs.length; i += 2) {
    const pair = [gs[i], gs[i + 1]];
    const a = pair.find((g) => g.u === uA);
    const b = pair.find((g) => g.u === uB);
    if (!a || !b) return null;
    A.push(a.v);
    B.push(b.v);
  }
  return { A, B, uA, uB };
}

// ─── Proportionnalité ──────────────────────────────────────────────────────

/** Reconnaître : les relevés (texte ou tableau) ont-ils tous le même quotient ? */
function cReconnaitre(q: Q): string[] {
  let A: number[];
  let B: number[];
  const g = grilleCanvas(q);
  if (g) {
    if (g.length !== 2 || g.flat().some((x) => x == null)) return ["tableau à compléter dans une question « reconnaître »"];
    [A, B] = g as number[][];
  } else {
    const r = releves(q.text);
    if (!r) return [`relevés illisibles : ${voir(grandeurs(q.text))}`];
    ({ A, B } = r);
  }
  const p: string[] = [];
  if (new Set(A).size !== A.length) p.push("deux relevés pour la même quantité");
  if ([...A, ...B].some((x) => x <= 0 || !deuxDecimales(x))) p.push("valeur négative, nulle ou à plus de deux décimales");
  const prop = A.every((a, i) => egal(B[i] * A[0], B[0] * a));
  return [...p, ...ouiNon(q, prop), ...prixBienEcrits(q)];
}

/** Case manquante d'un tableau de proportionnalité (canvas) : le coefficient vient des colonnes complètes. */
function cTableau(q: Q): string[] {
  const g = grilleCanvas(q);
  if (!g || g.length !== 2) return ["tableau illisible"];
  const [h, b] = g;
  const vides = g.flat().filter((x) => x == null).length;
  if (vides !== 1) return [`${vides} case(s) vide(s) au lieu d'une`];
  const pleines = h.map((_, j) => j).filter((j) => h[j] != null && b[j] != null);
  if (!pleines.length) return ["aucune colonne complète"];
  const k = b[pleines[0]]! / h[pleines[0]]!;
  const p: string[] = [];
  if (pleines.some((j) => !egal(b[j]! / h[j]!, k))) p.push("les colonnes complètes n'ont pas le même quotient : ce n'est pas un tableau de proportionnalité");
  const j = h.findIndex((x, i) => x == null || b[i] == null);
  const juste = h[j] == null ? b[j]! / k : h[j]! * k;
  const c = q.canvas as { missing?: { row: number; col: number }[]; values?: string[][] };
  if (!c.missing?.length || c.values?.[c.missing[0].row]?.[c.missing[0].col] !== "?") p.push("la case surlignée n'est pas la case vide");
  if (!/tableau/.test(q.text)) p.push("le texte ne parle pas du tableau");
  // La case d'un tableau est un nombre : pas d'unité dans la réponse.
  return [...p, ...verifierReponse(q, juste, "", "case du tableau")];
}

type G = { v: number; u: string };

/** Un couple (a, b) de deux grandeurs, puis une quantité t de l'une : la valeur de l'autre. */
function convertir(a: G, b: G, t: G): G | null {
  if (a.u === b.u) return null;
  if (t.u === a.u) return { v: (t.v * b.v) / a.v, u: b.u };
  if (t.u === b.u) return { v: (t.v * a.v) / b.v, u: a.u };
  return null;
}

/** Quatrième proportionnelle : un relevé (deux grandeurs), une quantité ; on cherche l'autre. */
function cQuatrieme(q: Q): string[] {
  const gs = grandeurs(q.text);
  if (gs.length !== 3) return [`trois données attendues, lues : ${voir(gs)}`];
  const r = convertir(gs[0], gs[1], gs[2]);
  if (!r) return [`unités illisibles : ${voir(gs)}`];
  if (gs[2].v === (gs[2].u === gs[0].u ? gs[0].v : gs[1].v)) return ["la question redemande la valeur déjà donnée"];
  return verifierReponse(q, r.v, r.u, "quatrième proportionnelle");
}

/** Le coefficient (valeur pour une unité), ou son application. Toutes les situations ont B > A (k > 1). */
function cCoeff(q: Q): string[] {
  const g = grilleCanvas(q);
  if (g) {
    if (g.length !== 2 || g[0].length !== 1 || g.flat().some((x) => x == null)) return ["tableau du coefficient illisible"];
    const k = g[1][0]! / g[0][0]!;
    return [...(/Par quel nombre multiplie-t-on la première ligne/.test(q.text) ? [] : ["consigne du tableau absente"]), ...verifierReponse(q, k, "", "coefficient du tableau")];
  }
  const gs = grandeurs(q.text);
  if (gs.length !== 2 || gs[0].u === gs[1].u) return [`deux grandeurs attendues, lues : ${voir(gs)}`];
  // « … sait que le prix d’un cahier est de 3 €. Combien coûtent 7 cahiers ? » : on l'applique.
  if (/ est de \d/.test(q.text)) return verifierReponse(q, gs[0].v * gs[1].v, gs[0].u, "coefficient appliqué");
  const [petit, grand] = gs[0].v < gs[1].v ? [gs[0], gs[1]] : [gs[1], gs[0]];
  const k = grand.v / petit.v;
  return verifierReponse(q, k, /coefficient/.test(q.text) ? "" : grand.u, "valeur pour une unité");
}

/** Problèmes : quatrième proportionnelle, ou différence / somme de deux valeurs. */
function cProbleme(q: Q): string[] {
  const gs = grandeurs(q.text);
  const deux = /la différence entre|la somme des deux/.test(q.text);
  if (!deux) return cQuatrieme(q);
  if (gs.length !== 4) return [`quatre données attendues, lues : ${voir(gs)}`];
  const r1 = convertir(gs[0], gs[1], gs[2]);
  const r2 = convertir(gs[0], gs[1], gs[3]);
  if (!r1 || !r2 || r1.u !== r2.u) return ["unités illisibles"];
  const diff = /la différence entre/.test(q.text);
  return verifierReponse(q, diff ? r1.v - r2.v : r1.v + r2.v, r1.u, diff ? "différence" : "somme");
}

/** Un camarade affirme une valeur : a-t-il raison ? (on ne lit que ce qui précède « , car »). */
function cAffirmation(q: Q): string[] {
  const gs = grandeurs(q.text.split(", car")[0]);
  if (gs.length !== 4) return [`quatre données attendues, lues : ${voir(gs)}`];
  const r = convertir(gs[0], gs[1], gs[2]);
  if (!r) return ["unités illisibles"];
  const p = r.u === gs[3].u ? [] : [`la valeur affirmée est en « ${gs[3].u} », on attend « ${r.u} »`];
  return [...p, ...ouiNon(q, egal(r.v, gs[3].v)), ...prixBienEcrits(q)];
}

/** Deux relevés, deux prénoms : pour qui la valeur pour une unité est-elle la plus grande / petite ? */
function cComparer(q: Q): string[] {
  const gs = grandeurs(q.text);
  if (gs.length !== 4) return [`quatre données attendues, lues : ${voir(gs)}`];
  const uB = gs[0].v > gs[1].v ? gs[0].u : gs[1].u;
  const k = (a: G, b: G) => (a.u === uB ? a.v / b.v : b.v / a.v);
  if (gs[2].u === gs[3].u || ![gs[2].u, gs[3].u].includes(uB)) return ["les deux relevés n'ont pas les mêmes unités"];
  const kA = k(gs[0], gs[1]);
  const kB = k(gs[2], gs[3]);
  const noms = (q.choices ?? []).slice(0, 2);
  if (noms.length !== 2 || noms.some((n) => q.text.indexOf(n) < 0)) return ["prénoms des propositions absents du texte"];
  const [premier, second] = q.text.indexOf(noms[0]) < q.text.indexOf(noms[1]) ? noms : [noms[1], noms[0]];
  const plusGrand = /(le|la) plus grande? \?/.test(q.text);
  const juste = egal(kA, kB) ? "c’est pareil pour les deux" : (plusGrand ? kA > kB : kA < kB) ? premier : second;
  return [...qcmUnique(q, (c) => c === juste), ...prixBienEcrits(q)];
}

// ─── Ratios ────────────────────────────────────────────────────────────────

const echapper = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** Ratio « a:b » : un côté connu (« 6 doses de sirop »), ou un total ; ou le QCM des ratios égaux. */
function cRapport(q: Q): string[] {
  const m = q.text.match(/ratio (\S+?):(\S+) (?:est|qui vaut|vaut) (\d+):(\d+)/);
  if (!m) return ["ratio illisible"];
  const L = [m[1], m[2]];
  const r = [Number(m[3]), Number(m[4])];
  const p: string[] = [];
  if (r[0] === r[1] || r.some((x) => x <= 0)) p.push(`ratio ${r[0]}:${r[1]} pas plausible`);
  if (q.format === "qcm") {
    const egalAuRatio = (c: string) => {
      const x = c.match(/^(\d+):(\d+)$/);
      return !!x && Number(x[1]) * r[1] === Number(x[2]) * r[0];
    };
    return [...p, ...qcmUnique(q, egalAuRatio)];
  }
  const question = q.text.slice(q.text.lastIndexOf(". ", q.text.length - 3) + 1);
  const tout = q.text.match(/(\d+) \S+ en tout/);
  const qte = (i: number) => [...q.text.matchAll(new RegExp(`(\\d+) (?:\\S+ )?(?:de |d’)?${echapper(L[i])}(?![\\wéèêàç])`, "g"))].map((x) => Number(x[1]));
  if (tout) {
    const demande = [0, 1].filter((i) => new RegExp(`${echapper(L[i])}(?![\\wéèêàç])`).test(question));
    if (demande.length !== 1) return [...p, "on ne sait pas quel côté du ratio est demandé"];
    const tot = Number(tout[1]);
    if (tot % (r[0] + r[1])) p.push(`le total ${tot} ne se partage pas en ${r[0] + r[1]} parts`);
    return [...p, ...verifierReponse(q, (tot * r[demande[0]]) / (r[0] + r[1]), "", "partage")];
  }
  const q0 = qte(0);
  const q1 = qte(1);
  if (q0.length + q1.length !== 1) return [...p, `une seule quantité connue attendue, lues : ${L[0]} ${q0.join(",")} ; ${L[1]} ${q1.join(",")}`];
  const i = q0.length ? 0 : 1;
  const j = 1 - i;
  const connu = (i === 0 ? q0 : q1)[0];
  if (!new RegExp(`${echapper(L[j])}(?![\\wéèêàç])`).test(question)) p.push("la question ne demande pas l'autre côté du ratio");
  if (connu % r[i]) p.push(`${connu} n'est pas un multiple de ${r[i]}`);
  return [...p, ...verifierReponse(q, (connu * r[j]) / r[i], "", "ratio")];
}

// ─── Pourcentages ──────────────────────────────────────────────────────────

/** Les nombres suivis de « % » et les autres, avec le mot qui suit. */
function donnees(t: string) {
  const pcts: number[] = [];
  const autres: G[] = [];
  for (const g of grandeurs(t)) {
    if (g.u === "%") pcts.push(g.v);
    else autres.push(g);
  }
  return { pcts, autres };
}

/** t % de N (la part), ou le pourcentage d'une part (pas de % dans le texte). */
function cPourcentage(q: Q): string[] {
  const { pcts, autres } = donnees(q.text);
  // Plausibilité : une barre de céréales n'a pas plus de 40 % de sucre.
  if (/de sucre/.test(q.text)) {
    const taux = pcts[0] ?? (autres.length === 2 ? (Math.min(autres[0].v, autres[1].v) / Math.max(autres[0].v, autres[1].v)) * 100 : 0);
    if (taux > 40) return [`${taux} % de sucre : pas plausible`];
  }
  if (pcts.length === 1 && autres.length === 1) {
    const [t] = pcts;
    const N = autres[0];
    if (t <= 0 || t >= 100) return [`taux ${t} % pas plausible`];
    const part = (t * N.v) / 100;
    return [...(entier(part) ? [] : [`la part ${part} n'est pas entière`]), ...verifierReponse(q, part, N.u, `${t} % de ${N.v}`)];
  }
  if (pcts.length === 0 && autres.length === 2) {
    const [x, N] = autres[0].v < autres[1].v ? [autres[0], autres[1]] : [autres[1], autres[0]];
    return verifierReponse(q, (x.v / N.v) * 100, "%", `${x.v} sur ${N.v}`);
  }
  return [`données illisibles : ${voir(grandeurs(q.text))}`];
}

// ─── Coefficient multiplicateur et évolutions ──────────────────────────────

/** Le sens écrit dans un texte : hausse, baisse, ou rien / les deux. */
function sensLu(t: string): "hausse" | "baisse" | null {
  const h = /augmente|en hausse|hausse de/.test(t);
  const b = /baisse|diminue|réduction|remise/.test(t);
  return h === b ? null : h ? "hausse" : "baisse";
}

function cCoeffMult(q: Q): string[] {
  const t = q.text;
  const cLu = t.match(/par (\d+(?:,\d+)?)/);
  const { pcts, autres } = donnees(t);
  if (cLu) {
    // coefficient donné : on retrouve l'évolution
    const c = num(cLu[1]);
    if (c === 1 || c <= 0) return [`coefficient ${c} pas plausible`];
    const hausse = c > 1;
    const taux = Math.round(Math.abs(c - 1) * 10000) / 100;
    if (q.format === "qcm") return qcmUnique(q, (x) => x === `une ${hausse ? "hausse" : "baisse"} de ${String(taux).replace(".", ",")} %`);
    const s = sensLu(t.slice(t.indexOf(cLu[0])));
    const p = s && s !== (hausse ? "hausse" : "baisse") ? [`la question parle de ${s}, le coefficient ${c} donne une ${hausse ? "hausse" : "baisse"}`] : [];
    return [...p, ...verifierReponse(q, taux, "%", "taux d'évolution")];
  }
  const s = sensLu(t);
  if (pcts.length !== 1 || !s) return [`taux ou sens illisible : ${voir(grandeurs(t))}`];
  const c = s === "hausse" ? 1 + pcts[0] / 100 : 1 - pcts[0] / 100;
  if (autres.length === 1) {
    // on applique le coefficient à une valeur
    const V = autres[0];
    const nv = V.v * c;
    const p = V.u !== "€" && !entier(nv) ? [`nouvelle valeur ${nv} pas entière`] : [];
    return [...p, ...verifierReponse(q, nv, V.u, "coefficient appliqué")];
  }
  if (autres.length) return [`données en trop : ${voir(autres)}`];
  return verifierReponse(q, c, "", "coefficient multiplicateur");
}

/** Défis : nouveau prix, évolutions successives, prix avant la remise. */
function cEvolutionPrix(q: Q): string[] {
  const t = q.text;
  const prix = grandeurs(t).filter((g) => g.u === "€");
  const { pcts } = donnees(t);
  if (prix.length !== 1) return [`un prix attendu, lus : ${voir(prix)}`];
  const V = prix[0].v;
  const succ = t.match(/augmente de (\d+) %, puis baisse de (\d+) %/);
  if (succ) return verifierReponse(q, V * (1 + Number(succ[1]) / 100) * (1 - Number(succ[2]) / 100), "€", "évolutions successives");
  if (pcts.length !== 1) return ["un taux attendu"];
  if (/avant/.test(t)) {
    if (sensLu(t) !== "baisse") return ["prix de départ : remise attendue"];
    return verifierReponse(q, V / (1 - pcts[0] / 100), "€", "prix avant la remise");
  }
  const s = sensLu(t);
  if (!s) return ["sens de l'évolution illisible"];
  return verifierReponse(q, V * (s === "hausse" ? 1 + pcts[0] / 100 : 1 - pcts[0] / 100), "€", "nouveau prix");
}

export const CORRECTEURS: CorrecteursMaths = avecRegleMotsCles({
  prop_rapport_tpl_1: cRapport,
  prop_rapport_tpl_x1: cRapport,
  prop_rapport_tpl_e2: cRapport,
  prop_pourcentage_tpl_1: cPourcentage,
  prop_pourcentage_qcm_tpl_1: cPourcentage,
  prop_pourcentage_tpl_x1: cPourcentage,
  prop_pourcentage_tpl_e2: cPourcentage,
  prop_coeff_multiplicateur_tpl_1: cCoeffMult,
  prop_coeff_multiplicateur_tpl_x1: cCoeffMult,
  prop_defi_tpl_1: cEvolutionPrix,
  prop_defi_tpl_x1: cEvolutionPrix,
  prop_ratio_defi_tpl_2: cPourcentage,
  prop_quatrieme_tpl_1: cQuatrieme,
  prop_quatrieme_tpl_x1: cQuatrieme,
  prop_quatrieme_tpl_e2: cQuatrieme,
  prop_coeff_tpl_1: cCoeff,
  prop_coeff_tpl_x1: cCoeff,
  prop_coeff_tpl_e1: cCoeff,
  prop_probleme_tpl_1: cProbleme,
  prop_probleme_tpl_x1: cProbleme,
  prop_probleme_tpl_e3: cProbleme,
  prop_defi_tpl_2: cComparer,
  prop_defi_tpl_3: (q) => (/ affirme que /.test(q.text) ? cAffirmation(q) : cReconnaitre(q)),
  prop_defi_tpl_e4: cAffirmation,
  prop_table_tpl_1: cTableau,
  prop_table_qcm_tpl_1: cTableau,
  prop_table_tpl_x1: cTableau,
  prop_reconnaitre_tpl_1: cReconnaitre,
  prop_reconnaitre_tpl_e1: cReconnaitre,
  prop_reconnaitre_tpl_e3: cReconnaitre,
});
