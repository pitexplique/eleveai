import type { CorrecteursMaths } from "./types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { avecRegleMotsCles, qcmUnique } from "@/lib/tutor-v4/questionBank/6e/maths/correcteurs/pourcentages";

// LES CORRECTEURS DE nombres-relatifs.bank.ts (notion relatif_nombre, 5e, 09/10/2026).
// Ils relisent le TEXTE que voit l'élève : le signe d'une situation se lit dans
// les mots (« au-dessous de zéro », « sous le niveau de la mer », « découvert »,
// « recule »…), celui d'un nombre affiché dans son écriture (« −7 »), et la
// droite graduée dans le canvas. Ils refont la comparaison, l'opposé, la distance
// à zéro ou la devinette (recherche de tous les entiers qui conviennent) et
// jugent chaque proposition d'un QCM. Ils vérifient aussi l'écriture : le signe
// « − » (jamais le tiret), un négatif entre parenthèses après une opération.
// Vide = juste.

type Q = TutorGeneratedQuestionV4;

/** Les relatifs écrits du texte, signe compris (« −7 », « +3 », « 5 », « 2,5 »). */
export function relatifs(t: string): number[] {
  return [...String(t).matchAll(/([−+-]?)(\d+(?:,\d+)?)/g)].map((m) => (m[1] === "−" || m[1] === "-" ? -1 : 1) * Number(m[2].replace(",", ".")));
}
/** Le relatif d'une réponse (« −7 °C » → −7). */
export const valeur = (s: string) => {
  const r = relatifs(s);
  return r.length ? r[0] : null;
};
const attendu = (q: Q) => valeur(String(q.expected[0]));

const NEG = /dessous|sous|découvert|de moins|perd|dépens|recul|avant J|plonge/;
const POS = /dessus|étage|d’avance|de plus|gagn|avanc|après J|grimpe|vole/;
/** La valeur d'une situation dite en MOTS : le nombre, signé par le vocabulaire. */
export function valeurMots(s: string): number | null {
  const n = String(s).match(/\d+/);
  if (!n) return null;
  const neg = NEG.test(s);
  const pos = POS.test(s);
  if (neg === pos) return null;
  return (neg ? -1 : 1) * Number(n[0]);
}
/** L'unité qu'impose la situation. */
function uniteDuTexte(t: string): string {
  if (/degré|°C/.test(t)) return "°C";
  if (/\d+ cm/.test(t)) return "cm";
  if (/\d+ m\b/.test(t)) return "m";
  if (/€/.test(t)) return "€";
  return "";
}

/** ⛔ L'écriture des relatifs : « − » et pas « - » ; pas de « + −3 » sans parenthèses. */
export function ecriture(q: Q): string[] {
  const p: string[] = [];
  for (const s of [q.text, ...(q.choices ?? []), ...q.expected.slice(0, 1).map(String), q.explanation ?? ""]) {
    if (/(?<![\p{L}\d])-(?=\s?[\d(])/u.test(s)) p.push(`tiret « - » au lieu du signe « − » : « ${s.slice(0, 80)} »`);
    const m = s.match(/[\d)…]\s[+−×÷]\s*[−+]\s?\d/);
    if (m) p.push(`relatif sans parenthèses après une opération : « ${m[0]} »`);
  }
  return p;
}

// ─── relatif_lire ─────────────────────────────────────────────────────────

function corrigerLire(q: Q): string[] {
  const phrase = q.text.split(/(?<=\.)\s/)[0];
  const v = valeurMots(phrase);
  if (v == null) return [`situation illisible : « ${phrase} »`];
  const p: string[] = [];
  if (attendu(q) !== v) p.push(`attendu ${q.expected[0]}, la situation dit ${v}`);
  const u = uniteDuTexte(q.text);
  if (u && !String(q.expected[0]).endsWith(u)) p.push(`l'unité « ${u} » manque dans la réponse`);
  if (!u && /°C|€| m$/.test(String(q.expected[0]))) p.push("unité dans la réponse, absente de l'énoncé");
  return p;
}

function corrigerLireInverse(q: Q): string[] {
  const rs = relatifs(q.text);
  if (rs.length !== 1) return [`un seul nombre attendu dans le texte, lus : ${rs.join(", ")}`];
  const p: string[] = [];
  for (const c of q.choices ?? []) if (valeurMots(c) == null) p.push(`proposition illisible : « ${c} »`);
  return [...p, ...qcmUnique(q, (c) => valeurMots(c) === rs[0])];
}

// ─── relatif_signe ────────────────────────────────────────────────────────

function corrigerSigne(q: Q): string[] {
  const rs = relatifs(q.text);
  if (rs.length !== 1) return [`un seul nombre attendu dans le texte, lus : ${rs.join(", ")}`];
  if (rs[0] === 0) return ["0 n'est ni positif ni négatif"];
  return qcmUnique(q, (c) => c === (rs[0] > 0 ? "positif" : "négatif"));
}

function corrigerSigneListe(q: Q): string[] {
  const veut = /positi/.test(q.text) ? 1 : /négati/.test(q.text) ? -1 : 0;
  if (!veut) return ["on ne sait pas quel signe est cherché"];
  return qcmUnique(q, (c) => Math.sign(valeur(c) ?? 0) === veut);
}

// ─── relatif_comparer ─────────────────────────────────────────────────────

const GRAND = /plus élevé|plus haut|meilleur|plus grand|plus récente|plus à droite/;
const PETIT = /plus bas|moins bon|plus petit|plus ancienne|plus à gauche/;

/** Deux relatifs, « le plus grand » (ou « le plus petit ») sous ses noms de situation. */
function corrigerComparer(q: Q): string[] {
  const vs = relatifs(q.text);
  if (vs.length !== 2 || vs[0] === vs[1]) return [`deux nombres différents attendus, lus : ${vs.join(", ")}`];
  const g = GRAND.test(q.text);
  const pt = PETIT.test(q.text);
  if (g === pt) return ["on ne sait pas si l'on cherche le plus grand ou le plus petit"];
  const juste = g ? Math.max(...vs) : Math.min(...vs);
  const p: string[] = [];
  if (q.format === "qcm") p.push(...qcmUnique(q, (c) => valeur(c) === juste));
  else if (attendu(q) !== juste) p.push(`attendu ${q.expected[0]}, la réponse est ${juste}`);
  const u = uniteDuTexte(q.text);
  if (u && !String(q.expected[0]).endsWith(u)) p.push(`l'unité « ${u} » manque dans la réponse`);
  return p;
}

/** « a … b » : le signe < ou >, recalculé ; les nombres de la situation sont bien a et b. */
function corrigerSigneComparaison(q: Q): string[] {
  const m = q.text.match(/([−+]?\d+(?:,\d+)?) … ([−+]?\d+(?:,\d+)?)$/);
  if (!m) return ["paire « a … b » introuvable en fin d'énoncé"];
  const [a, b] = [valeur(m[1])!, valeur(m[2])!];
  const p: string[] = [];
  if (a === b) p.push("deux nombres égaux");
  for (const x of relatifs(q.text)) if (x !== a && x !== b) p.push(`le texte cite ${x}, absent de la paire`);
  return [...p, ...qcmUnique(q, (c) => c === (a < b ? "<" : ">"))];
}

/** Quatre relatifs à ranger : chaque proposition est vérifiée (mêmes nombres, ordre strict demandé). */
function corrigerRanger(q: Q): string[] {
  const enonce = q.text.split(/(?<=\.)\s/)[0];
  const vs = relatifs(enonce).sort((x, y) => x - y);
  const dec = /décroissant|plus haute à la plus basse|plus grand au plus petit/.test(q.text);
  const cro = !dec && /croissant|plus basse à la plus haute|plus petit au plus grand/.test(q.text);
  if (dec === cro) return ["sens du rangement introuvable"];
  const juste = (c: string) => {
    const xs = relatifs(c);
    if ([...xs].sort((x, y) => x - y).join() !== vs.join()) return false;
    if (!c.includes(dec ? ">" : "<") || c.includes(dec ? "<" : ">")) return false;
    return xs.every((x, i) => i === 0 || (dec ? xs[i - 1] > x : xs[i - 1] < x));
  };
  return qcmUnique(q, juste);
}

// ─── relatif_placer : la droite graduée du canvas ─────────────────────────

type Droite = { min: number; max: number; step: number; points: { value: number; label: string }[] };
/** Le canvas relu : graduations régulières, 0 visible, chaque point sur une graduation, lettres distinctes. */
function lireDroite(q: Q): { d: Droite | null; p: string[] } {
  const c = q.canvas as any;
  if (!c || c.kind !== "number_line") return { d: null, p: ["droite graduée absente"] };
  const d: Droite = { min: c.min, max: c.max, step: c.step ?? 1, points: c.points ?? [] };
  const p: string[] = [];
  if (!(d.min < 0 && d.max > 0)) p.push(`0 n'est pas sur la droite (${d.min} à ${d.max})`);
  for (const pt of d.points) {
    if (pt.value < d.min || pt.value > d.max) p.push(`le point ${pt.label} (${pt.value}) sort de la droite`);
    if (!Number.isInteger((pt.value - d.min) / d.step)) p.push(`le point ${pt.label} n'est pas sur une graduation`);
  }
  if (new Set(d.points.map((x) => x.label)).size !== d.points.length) p.push("deux points portent la même lettre");
  if (new Set(d.points.map((x) => x.value)).size !== d.points.length) p.push("deux points au même endroit");
  const pas = q.text.match(/de (\d+) en \1/);
  if (pas && Number(pas[1]) !== d.step) p.push(`le texte dit « de ${pas[1]} en ${pas[1]} », la droite va de ${d.step} en ${d.step}`);
  return { d, p };
}

function corrigerAbscisse(q: Q): string[] {
  const { d, p } = lireDroite(q);
  if (!d) return p;
  const L = q.text.match(/point ([A-Z])\b/)?.[1];
  const pt = d.points.find((x) => x.label === L);
  if (!pt) return [...p, `point ${L} absent de la droite`];
  if (attendu(q) !== pt.value) p.push(`attendu ${q.expected[0]}, le point ${L} est en ${pt.value}`);
  return p;
}

function corrigerPointExtreme(q: Q): string[] {
  const { d, p } = lireDroite(q);
  if (!d) return p;
  const regles: [RegExp, (x: number) => number][] = [
    [/plus à droite|plus grande abscisse/, (x) => x],
    [/plus à gauche|plus petite abscisse/, (x) => -x],
    [/plus proche de 0/, (x) => -Math.abs(x)],
    [/plus loin de 0/, (x) => Math.abs(x)],
  ];
  const r = regles.find(([re]) => re.test(q.text));
  if (!r) return [...p, "critère introuvable"];
  const scores = d.points.map((x) => r[1](x.value));
  const top = Math.max(...scores);
  if (scores.filter((s) => s === top).length !== 1) p.push("plusieurs points remplissent le critère");
  const best = d.points[scores.indexOf(top)].label;
  if ([...(q.choices ?? [])].sort().join() !== d.points.map((x) => x.label).sort().join()) p.push("les propositions ne sont pas les lettres de la droite");
  return [...p, ...qcmUnique(q, (c) => c === best)];
}

function corrigerQuelPoint(q: Q): string[] {
  const { d, p } = lireDroite(q);
  if (!d) return p;
  const rs = relatifs(q.text);
  if (rs.length !== 1) return [...p, `un seul nombre attendu dans le texte, lus : ${rs.join(", ")}`];
  const pts = d.points.filter((x) => x.value === rs[0]);
  if (pts.length !== 1) return [...p, `${pts.length} point(s) en ${rs[0]}`];
  return [...p, ...qcmUnique(q, (c) => c === pts[0].label)];
}

// ─── relatif_oppose ───────────────────────────────────────────────────────

/** Le seul relatif non nul du texte (« de 1 en 1 » mis à part). */
function leNombre(t: string): { x: number | null; p: string[] } {
  const xs = [...new Set(relatifs(t.replace(/de 1 en 1/g, " ")).filter((x) => x !== 0))];
  return xs.length === 1 ? { x: xs[0], p: [] } : { x: null, p: [`un seul nombre non nul attendu, lus : ${xs.join(", ")}`] };
}

function corrigerOppose(q: Q): string[] {
  const { x, p } = leNombre(q.text);
  if (x == null) return p;
  if (!/opposé|symétrique|change le signe|autre côté|revenir à 0|= 0/.test(q.text)) return ["la question ne parle pas d'opposé"];
  return attendu(q) === -x ? [] : [`attendu ${q.expected[0]}, l'opposé de ${x} est ${-x}`];
}

function corrigerOpposeQcm(q: Q): string[] {
  const { x, p } = leNombre(q.text);
  if (x == null) return p;
  return qcmUnique(q, (c) => valeur(c) === -x);
}

/** Les affirmations du « Vrai ou faux » sur les opposés, évaluées. */
function verite(t: string): boolean | null {
  const R = String.raw`([−+]?\d+)`;
  let m = t.match(new RegExp(`« ${R} et ${R} sont opposés`));
  if (m) return valeur(m[1])! === -valeur(m[2])!;
  m = t.match(new RegExp(`L’opposé de ${R} est ${R}`));
  if (m) return valeur(m[2])! === -valeur(m[1])!;
  m = t.match(new RegExp(`La somme de ${R} et de son opposé vaut ${R}`));
  if (m) return valeur(m[2]) === 0;
  m = t.match(new RegExp(`${R} est plus (grand|petit) que son opposé`));
  if (m) return m[2] === "grand" ? valeur(m[1])! > 0 : valeur(m[1])! < 0;
  return null;
}
function corrigerVraiFauxOppose(q: Q): string[] {
  const v = verite(q.text);
  if (v == null) return ["affirmation illisible"];
  if (!/Vrai ou faux/.test(q.text)) return ["« Vrai ou faux » attendu dans la question"];
  return qcmUnique(q, (c) => c === (v ? "vrai" : "faux"));
}

// ─── relatif_valeur_absolue ───────────────────────────────────────────────

function corrigerDistanceZero(q: Q): string[] {
  const { x, p } = leNombre(q.text);
  if (x == null) return p;
  const r: string[] = [];
  if (attendu(q) !== Math.abs(x)) r.push(`attendu ${q.expected[0]}, la distance à 0 de ${x} vaut ${Math.abs(x)}`);
  const u = uniteDuTexte(q.text);
  if (u && !String(q.expected[0]).endsWith(u)) r.push(`l'unité « ${u} » manque dans la réponse`);
  return r;
}

function corrigerPlusLoin(q: Q): string[] {
  const loin = /plus loin|plus éloigné|plus grande distance/.test(q.text);
  const pres = /plus près|plus proche|plus petite distance/.test(q.text);
  if (loin === pres) return ["critère (plus loin / plus près) introuvable"];
  const abs = (q.choices ?? []).map((c) => Math.abs(valeur(c) ?? NaN));
  const cible = loin ? Math.max(...abs) : Math.min(...abs);
  return qcmUnique(q, (c) => Math.abs(valeur(c) ?? NaN) === cible);
}

function corrigerDeuxNombres(q: Q): string[] {
  const { x, p } = leNombre(q.text);
  if (x == null) return p;
  if (x < 0) return [`une distance négative dans l'énoncé : ${x}`];
  return qcmUnique(q, (c) => relatifs(c).sort((a, b) => a - b).join() === `${-x},${x}`);
}

// ─── relatif_defi : les devinettes, résolues par essais de −2 000 à 2 000 ───

const R = String.raw`([−+]?\d+)`;
/** Toutes les conditions lues dans les indices ; null si aucun indice reconnu. */
function conditions(t: string): ((x: number) => boolean)[] {
  const cs: ((x: number) => boolean)[] = [];
  let m: RegExpMatchArray | null;
  if ((m = t.match(/à (\d+) unités de 0/))) {
    const d = Number(m[1]);
    cs.push((x) => Math.abs(x) === d);
  }
  if (/à gauche de 0|Je suis négatif|Mon opposé est plus grand que moi/.test(t)) cs.push((x) => x < 0);
  if (/à droite de 0|Je suis positif|Mon opposé est plus petit que moi/.test(t)) cs.push((x) => x > 0);
  for (const k of t.matchAll(new RegExp(`plus petit que ${R}`, "g"))) cs.push((x) => x < valeur(k[1])!);
  for (const k of t.matchAll(new RegExp(`plus grand que ${R}`, "g"))) cs.push((x) => x > valeur(k[1])!);
  if ((m = t.match(new RegExp(`compris entre ${R} et ${R}`)))) {
    const [a, b] = [valeur(m[1])!, valeur(m[2])!].sort((u, v) => u - v);
    cs.push((x) => a < x && x < b);
  }
  if (/Je suis pair/.test(t)) cs.push((x) => x % 2 === 0);
  if (/Je suis impair/.test(t)) cs.push((x) => Math.abs(x % 2) === 1);
  if ((m = t.match(new RegExp(`même distance de 0 que ${R}`)))) {
    const c = Math.abs(valeur(m[1])!);
    cs.push((x) => Math.abs(x) === c);
  }
  if ((m = t.match(new RegExp(`Quand on m’ajoute ${R}, on obtient ${R}`)))) {
    const [a, b] = [valeur(m[1])!, valeur(m[2])!];
    cs.push((x) => x + a === b);
  }
  if ((m = t.match(new RegExp(`Si on m’enlève ${R}, on obtient ${R}`)))) {
    const [a, b] = [valeur(m[1])!, valeur(m[2])!];
    cs.push((x) => x - a === b);
  }
  return cs;
}
function corrigerDevinette(q: Q): string[] {
  const cs = conditions(q.text);
  if (!cs.length) return ["aucun indice reconnu"];
  const sols: number[] = [];
  for (let x = -2000; x <= 2000; x++) if (cs.every((c) => c(x))) sols.push(x);
  if (sols.length !== 1) return [`${sols.length} solutions (${sols.slice(0, 6).join(", ")}) au lieu d'une`];
  return attendu(q) === sols[0] ? [] : [`attendu ${q.expected[0]}, la devinette donne ${sols[0]}`];
}

function corrigerEcart(q: Q): string[] {
  const vs = relatifs(q.text.replace(/de 1 en 1/g, " "));
  if (vs.length !== 2) return [`deux nombres attendus, lus : ${vs.join(", ")}`];
  const juste = Math.abs(vs[0] - vs[1]);
  const p: string[] = [];
  if (attendu(q) !== juste) p.push(`attendu ${q.expected[0]}, l'écart vaut ${juste}`);
  const u = uniteDuTexte(q.text);
  if (u && !String(q.expected[0]).endsWith(u)) p.push(`l'unité « ${u} » manque dans la réponse`);
  return p;
}

export const CORRECTEURS: CorrecteursMaths = Object.fromEntries(
  Object.entries(
    avecRegleMotsCles({
      relatif_lire_tpl_1: corrigerLire,
      relatif_lire_tpl_2: corrigerLireInverse,
      relatif_signe_tpl_1: corrigerSigne,
      relatif_signe_tpl_2: corrigerSigneListe,
      relatif_comparer_tpl_1: corrigerComparer,
      relatif_comparer_tpl_2: corrigerSigneComparaison,
      relatif_comparer_tpl_3_signes: corrigerComparer,
      relatif_comparer_tpl_4_ranger: corrigerRanger,
      relatif_placer_tpl_1: corrigerAbscisse,
      relatif_placer_tpl_2: corrigerPointExtreme,
      relatif_placer_tpl_3_quel_point: corrigerQuelPoint,
      relatif_oppose_tpl_1: corrigerOppose,
      relatif_oppose_tpl_3_simple: corrigerOppose,
      relatif_oppose_tpl_x1: corrigerOpposeQcm,
      relatif_oppose_tpl_4_vrai_faux: corrigerVraiFauxOppose,
      relatif_valeur_absolue_tpl_1: corrigerPlusLoin,
      relatif_valeur_absolue_tpl_2: corrigerDeuxNombres,
      relatif_valeur_absolue_tpl_3_graduations: corrigerDistanceZero,
      relatif_valeur_absolue_tpl_x1: corrigerDistanceZero,
      relatif_defi_tpl_1: corrigerDevinette,
      relatif_defi_tpl_2: corrigerEcart,
      relatif_defi_tpl_3: corrigerDevinette,
      relatif_defi_tpl_4: corrigerDevinette,
      relatif_defi_tpl_5: corrigerDevinette,
    }),
  ).map(([id, f]) => [id, (q: Q) => [...ecriture(q), ...f(q)]]),
);
