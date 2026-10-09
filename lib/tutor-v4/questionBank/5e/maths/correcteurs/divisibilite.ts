import type { CorrecteursMaths } from "./types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { avecRegleMotsCles, qcmUnique } from "@/lib/tutor-v4/questionBank/6e/maths/correcteurs/pourcentages";

// LES CORRECTEURS DE divisibilite.bank.ts (notion divisibilite, 5e, 09/10/2026).
// Ils relisent les nombres DANS LE TEXTE que voit l'élève et refont le calcul
// eux-mêmes (reste de la division, somme des chiffres, liste des diviseurs par
// essais, plus grand diviseur commun par la liste), sans rien prendre au
// gabarit ; en QCM, ils jugent CHAQUE proposition (une seule juste). Ils
// contrôlent aussi la plausibilité (on ne range pas 900 œufs) et l'écriture
// (aucune barre de division hors des fractions empilées du défi). Vide = juste.

type Q = TutorGeneratedQuestionV4;

/** Les entiers du texte, dans l'ordre (« 4 738 » est un seul nombre ; le LaTeX est lu aussi). */
export function nombres(t: string): number[] {
  return (String(t).match(/\d{1,3}(?: \d{3})+(?!\d)|\d+/g) ?? []).map((s) => Number(s.replace(/ /g, "")));
}
const distincts = (t: string) => [...new Set(nombres(t))];
const attenduNb = (q: Q) => {
  const ns = nombres(String(q.expected[0]));
  return ns.length === 1 ? ns[0] : null;
};
export function diviseursDe(n: number): number[] {
  const l: number[] = [];
  for (let d = 1; d <= n; d++) if (n % d === 0) l.push(d);
  return l;
}
const sommeDesChiffres = (n: number) => String(n).split("").reduce((s, c) => s + Number(c), 0);
function plusGrandCommun(a: number, b: number) {
  return Math.max(...diviseursDe(a).filter((d) => b % d === 0));
}

/** Plausibilité : le plus grand nombre crédible pour chaque objet. */
const PLAUSIBLE: [RegExp, number][] = [
  [/(\d+) (?:perles|photos|chaises|biscuits|vis|livres|autocollants|graines|bouteilles|letchis|crayons|bonbons)/, 200],
  [/(\d+) (?:œufs|plants)/, 150],
  [/(\d+) (?:joueurs|cartes|chanteurs)/, 120],
  [/(\d+) cyclistes/, 100],
  [/(\d+) poissons/, 60],
  [/(\d+) élèves/, 400],
];
function plausible(t: string): string[] {
  const p: string[] = [];
  for (const [re, max] of PLAUSIBLE) {
    const m = t.match(re);
    if (m && Number(m[1]) > max) p.push(`« ${m[0]} » : peu plausible (au plus ${max})`);
  }
  return p;
}

// ─── div_multiple_diviseur ────────────────────────────────────────────────

/** « n objets en groupes de d : est-ce possible sans reste ? » → oui si d divise n. */
function corrigerOuiNon(q: Q): string[] {
  const ns = distincts(q.text);
  if (ns.length !== 2) return [`deux nombres attendus dans le texte, lus : ${ns.join(", ")}`];
  const N = Math.max(...ns);
  const d = Math.min(...ns);
  const juste = N % d === 0 ? "oui" : "non";
  return [...qcmUnique(q, (c) => c === juste), ...plausible(q.text)];
}

/** « a × b = p. Complète : X est un ... de Y. » */
function corrigerMot(q: Q): string[] {
  const p: string[] = [];
  const m = q.text.match(/(\d+) est un \.\.\. de (\d+)/);
  if (!m) return ["phrase à compléter introuvable"];
  const [x, y] = [Number(m[1]), Number(m[2])];
  const juste = x > y && x % y === 0 ? "multiple" : x < y && y % x === 0 ? "diviseur" : null;
  if (!juste) p.push(`${x} et ${y} : ni multiple ni diviseur l'un de l'autre`);
  const prod = q.text.match(/(\d+) × (\d+) = (\d+)/);
  const quot = q.text.match(/(\d+) ÷ (\d+) = (\d+)/);
  if (prod && Number(prod[1]) * Number(prod[2]) !== Number(prod[3])) p.push(`égalité fausse : ${prod[0]}`);
  if (quot && Number(quot[2]) * Number(quot[3]) !== Number(quot[1])) p.push(`égalité fausse : ${quot[0]}`);
  const fait = (prod ?? quot)?.slice(1).map(Number) ?? [];
  if (!fait.includes(x) || !fait.includes(y)) p.push(`${x} et ${y} ne sont pas tous deux dans l'égalité donnée`);
  if ([...(q.choices ?? [])].sort().join("|") !== "diviseur|multiple") p.push(`propositions inattendues : ${q.choices?.join(" | ")}`);
  if (juste) p.push(...qcmUnique(q, (c) => c === juste));
  return [...p, ...plausible(q.text)];
}

/** Une suite de multiples « 12, 18, …, 30 » : le nombre qui manque, ou le suivant. */
function corrigerSuite(q: Q): string[] {
  const p: string[] = [];
  const m = q.text.match(/: ((?:\d+|…)(?:, (?:\d+|…))+)\./);
  if (!m) return ["suite de nombres introuvable"];
  const items = m[1].split(", ");
  const connus = items.map((s, i) => [i, s === "…" ? null : Number(s)] as const).filter(([, v]) => v != null) as [number, number][];
  const [i0, v0] = connus[0];
  const [i1, v1] = connus[1];
  const pas = (v1 - v0) / (i1 - i0);
  if (!(pas > 0) || !Number.isInteger(pas)) return [`pas de la suite illisible (${pas})`];
  const val = (i: number) => v0 + (i - i0) * pas;
  for (const [i, v] of connus) if (v !== val(i)) p.push(`la suite n'avance pas d'un pas constant (${m[1]})`);
  if (v0 % pas !== 0) p.push(`${v0} n'est pas un multiple de ${pas}`);
  // Les nombres hors de la suite (« de 6 en 6 », « la table de 6 », « le multiple de 6 suivant ») annoncent le pas.
  const hors = nombres(q.text.replace(m[0], " "));
  if (!hors.length) p.push("le pas n'est pas annoncé dans le texte");
  for (const h of hors) if (h !== pas) p.push(`le texte annonce ${h}, la suite avance de ${pas}`);
  const trou = items.indexOf("…");
  const juste = trou >= 0 ? val(trou) : val(items.length - 1) + pas;
  if (trou >= 0 && !/manque|remplace/.test(q.text)) p.push("un trou dans la suite, mais la question demande le suivant");
  if (attenduNb(q) !== juste) p.push(`attendu ${q.expected[0]}, le calcul donne ${juste}`);
  return p;
}

/** Choisir LE multiple de d (propositions plus grandes que d) ou LE diviseur de N (propositions plus petites). */
function corrigerChoisir(q: Q): string[] {
  const p: string[] = [];
  const ns = distincts(q.text).filter((x) => x !== 0);
  if (ns.length !== 1) return [`un seul nombre attendu dans le texte, lus : ${ns.join(", ")}`];
  const N = ns[0];
  const cs = (q.choices ?? []).map(Number);
  const typeMultiple = /multiple|table|boîte|sachets|rangées entières|avance|paquets/.test(q.text);
  const typeDiviseur = /diviseur|diviser|égales|égaux|sans chute/.test(q.text);
  if (typeMultiple === typeDiviseur) return ["impossible de savoir si l'on cherche un multiple ou un diviseur"];
  if (typeMultiple) {
    if (!cs.every((c) => c > N)) p.push("une proposition n'est pas plus grande que le nombre donné");
    p.push(...qcmUnique(q, (c) => Number(c) % N === 0));
  } else {
    if (!cs.every((c) => c > 1 && c < N)) p.push("une proposition n'est pas entre 1 et le nombre donné");
    p.push(...qcmUnique(q, (c) => N % Number(c) === 0));
  }
  return [...p, ...plausible(q.text)];
}

// ─── div_critere_2_5_10 ──────────────────────────────────────────────────

/** « par 2, 5 et 10 », « par 5 seulement », « aucun » → l'ensemble annoncé. */
const ensemble = (c: string) => (/aucun/.test(c) ? [] : nombres(c).sort((a, b) => a - b));

function corrigerTroisCriteres(q: Q): string[] {
  const ns = distincts(q.text).filter((x) => ![2, 5, 10].includes(x));
  if (ns.length !== 1) return [`un seul nombre à tester attendu, lus : ${ns.join(", ")}`];
  const n = ns[0];
  const vrais = [2, 5, 10].filter((d) => n % d === 0).join(",");
  return qcmUnique(q, (c) => ensemble(c).join(",") === vrais);
}

/** « 47… » complété par un chiffre pour être divisible par 2, 5 ou 10. */
function corrigerChiffre(q: Q): string[] {
  const pre = q.text.match(/(\d+)…/);
  const par = q.text.match(/divisible par (\d+)/);
  if (!pre || !par) return ["nombre à compléter ou diviseur introuvable"];
  const p: string[] = [];
  if (!(q.choices ?? []).every((c) => /^\d$/.test(c))) p.push("une proposition n'est pas un chiffre");
  p.push(...qcmUnique(q, (c) => (Number(pre[1]) * 10 + Number(c)) % Number(par[1]) === 0));
  return p;
}

/** « divisible par 5 mais pas par 2 », « par 2 et par 5 » : chaque proposition est testée par division. */
function corrigerCondition(q: Q): string[] {
  const m = q.text.match(/divisible par (\d+)(?: et par (\d+))?(?: mais pas par (\d+))?/);
  if (!m) return ["condition introuvable"];
  const [a, b, c] = [m[1], m[2], m[3]].map((x) => (x ? Number(x) : null));
  const juste = (s: string) => {
    const n = nombres(s)[0];
    return n % a! === 0 && (b == null || n % b === 0) && (c == null || n % c !== 0);
  };
  return qcmUnique(q, juste);
}

// ─── div_critere_3_9 ─────────────────────────────────────────────────────

/** Le nombre étudié : le plus grand du texte (les diviseurs 3 ou 9 sont plus petits). */
const nombreEtudie = (t: string) => Math.max(...nombres(t));

/** La somme des chiffres du nombre étudié. */
function corrigerSomme(q: Q): string[] {
  const ns = distincts(q.text);
  const d = ns.filter((x) => x === 3 || x === 9);
  if (d.length !== 1 || ns.length !== 2) return [`un nombre et un diviseur (3 ou 9) attendus, lus : ${ns.join(", ")}`];
  const juste = sommeDesChiffres(nombreEtudie(q.text));
  return attenduNb(q) === juste ? [] : [`attendu ${q.expected[0]}, la somme des chiffres vaut ${juste}`];
}

/** LE nombre divisible par 3 (ou 9) parmi quatre : chaque proposition est divisée pour de bon. */
function corrigerLequel(q: Q): string[] {
  const ns = distincts(q.text);
  if (ns.length !== 1) return [`un seul diviseur attendu dans le texte, lus : ${ns.join(", ")}`];
  return qcmUnique(q, (c) => nombres(c)[0] % ns[0] === 0);
}

/** « par 3 et par 9 », « par 3 seulement », « ni par 3 ni par 9 ». */
function corrigerTroisNeuf(q: Q): string[] {
  const ns = distincts(q.text).filter((x) => x !== 3 && x !== 9);
  if (ns.length !== 1) return [`un seul nombre à tester attendu, lus : ${ns.join(", ")}`];
  const vrais = [3, 9].filter((d) => ns[0] % d === 0).join(",");
  return qcmUnique(q, (c) => (/^ni /.test(c) ? "" : nombres(c).sort((a, b) => a - b).join(",")) === vrais);
}

// ─── div_lister_diviseurs ────────────────────────────────────────────────

/** Combien de diviseurs : on les compte par essais de 1 à n. */
function corrigerCompter(q: Q): string[] {
  const n = nombreEtudie(q.text);
  const juste = diviseursDe(n).length;
  return [...(attenduNb(q) === juste ? [] : [`attendu ${q.expected[0]}, ${n} a ${juste} diviseurs`]), ...plausible(q.text)];
}

/** La liste trouée : tous les nombres écrits divisent n, et il en manque exactement un. */
function corrigerManquant(q: Q): string[] {
  const m = q.text.match(/: ((?:\d+, )+\d+)/);
  if (!m) return ["liste introuvable"];
  const liste = nombres(m[1]);
  const n = nombreEtudie(q.text);
  const p: string[] = [];
  for (const x of liste) if (n % x !== 0) p.push(`${x} n'est pas un diviseur de ${n}`);
  const manquants = diviseursDe(n).filter((d) => !liste.includes(d));
  if (manquants.length !== 1) p.push(`il manque ${manquants.length} diviseurs (${manquants.join(", ")}) au lieu d'un`);
  else if (attenduNb(q) !== manquants[0]) p.push(`attendu ${q.expected[0]}, il manque ${manquants[0]}`);
  return [...p, ...plausible(q.text)];
}

/** « d × … = n » : le partenaire de d, et les paires déjà écrites donnent bien n. */
function corrigerPaire(q: Q): string[] {
  const m = q.text.match(/(\d+) × … = (\d+)/);
  if (!m) return ["égalité à trou introuvable"];
  const [d, n] = [Number(m[1]), Number(m[2])];
  const p: string[] = [];
  if (n % d !== 0) p.push(`${d} ne divise pas ${n}`);
  for (const k of q.text.matchAll(/(\d+) × (\d+)/g)) if (Number(k[1]) * Number(k[2]) !== n) p.push(`paire fausse : ${k[0]} ≠ ${n}`);
  if (attenduNb(q) !== n / d) p.push(`attendu ${q.expected[0]}, ${n} ÷ ${d} = ${n / d}`);
  return p;
}

/** Le plus grand diviseur commun, par les deux listes de diviseurs. */
function corrigerCommun(q: Q): string[] {
  const ns = distincts(q.text);
  if (ns.length !== 2) return [`deux nombres attendus, lus : ${ns.join(", ")}`];
  const juste = plusGrandCommun(ns[0], ns[1]);
  const p: string[] = [];
  if (attenduNb(q) !== juste) p.push(`attendu ${q.expected[0]}, le plus grand diviseur commun vaut ${juste}`);
  if (/ cm/.test(q.text) && !/cm$/.test(String(q.expected[0]))) p.push("l'énoncé est en cm : l'unité manque dans la réponse");
  if (juste === 1) p.push("le plus grand diviseur commun vaut 1 : la question n'a pas d'intérêt");
  return p;
}

// ─── div_defi ────────────────────────────────────────────────────────────

/** La fraction empilée du texte (« \dfrac{24}{36} »). */
function fraction(t: string): [number, number] | null {
  const m = t.match(/\\dfrac\{(\d+)\}\{(\d+)\}/);
  return m ? [Number(m[1]), Number(m[2])] : null;
}

/** Les nombres écrits en mots autour de la fraction (« 24 tirs sur 36 ») sont ceux de la fraction. */
function memesNombres(q: Q, a: number, b: number): string[] {
  const horsLatex = nombres(q.text.replace(/\$[^$]*\$/g, " "));
  return horsLatex.every((x) => x === a || x === b) ? [] : [`nombres du texte (${horsLatex.join(", ")}) ≠ fraction ${a} sur ${b}`];
}

function corrigerUnCoup(q: Q): string[] {
  const f = fraction(q.text);
  if (!f) return ["fraction introuvable"];
  const [a, b] = f;
  const juste = plusGrandCommun(a, b);
  const p = memesNombres(q, a, b);
  if (juste === 1) p.push(`${a} et ${b} n'ont aucun diviseur commun : la fraction ne se simplifie pas`);
  if (attenduNb(q) !== juste) p.push(`attendu ${q.expected[0]}, le plus grand diviseur commun de ${a} et ${b} vaut ${juste}`);
  return p;
}

function corrigerDiviseLesDeux(q: Q): string[] {
  const f = fraction(q.text);
  if (!f) return ["fraction introuvable"];
  const [a, b] = f;
  return [...memesNombres(q, a, b), ...qcmUnique(q, (c) => Number(c) > 1 && a % Number(c) === 0 && b % Number(c) === 0)];
}

/** Tailles de groupe possibles : les diviseurs d de n avec d ≥ m1 et n ÷ d ≥ m2. */
function corrigerGroupes(q: Q): string[] {
  const m = q.text.match(/au moins (\d+) par [^,]+, et au moins (\d+)/);
  if (!m) return ["conditions introuvables"];
  const n = nombreEtudie(q.text);
  const juste = diviseursDe(n).filter((d) => d >= Number(m[1]) && n / d >= Number(m[2])).length;
  const p: string[] = [];
  if (juste < 2) p.push(`seulement ${juste} taille possible : question sans intérêt`);
  if (attenduNb(q) !== juste) p.push(`attendu ${q.expected[0]}, on trouve ${juste} tailles possibles`);
  return [...p, ...plausible(q.text)];
}

/** Le chiffre caché « 4?72 » d'un nombre divisible par 9 (unique) ou par 3 (QCM). */
function corrigerChiffreCache(q: Q): string[] {
  const m = q.text.match(/(\d*)\?(\d*)/);
  const par = q.text.match(/divisible par (\d+)/);
  if (!m || !par) return ["nombre à trou ou diviseur introuvable"];
  const valides = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].filter((c) => Number(`${m[1]}${c}${m[2]}`) % Number(par[1]) === 0);
  if (q.format === "qcm") return qcmUnique(q, (c) => valides.includes(Number(c)));
  if (valides.length !== 1) return [`${valides.length} chiffres possibles (${valides.join(", ")}) : réponse non unique`];
  return attenduNb(q) === valides[0] ? [] : [`attendu ${q.expected[0]}, le seul chiffre possible est ${valides[0]}`];
}

export const CORRECTEURS: CorrecteursMaths = avecRegleMotsCles({
  div_defi_tpl_1: corrigerUnCoup,
  div_defi_tpl_2: corrigerDiviseLesDeux,
  div_defi_tpl_3_groupes: corrigerGroupes,
  div_defi_tpl_4_chiffre_cache: corrigerChiffreCache,
  div_lister_diviseurs_tpl_1: corrigerCompter,
  div_lister_diviseurs_tpl_2: corrigerManquant,
  div_lister_diviseurs_tpl_3_paire: corrigerPaire,
  div_lister_diviseurs_tpl_4_commun: corrigerCommun,
  div_critere_3_9_tpl_1: corrigerOuiNon,
  div_critere_3_9_tpl_2: corrigerSomme,
  div_critere_3_9_tpl_3_lequel: corrigerLequel,
  div_critere_3_9_tpl_4_les_deux: corrigerTroisNeuf,
  div_critere_2_5_10_tpl_1: corrigerOuiNon,
  div_critere_2_5_10_tpl_2: corrigerTroisCriteres,
  div_critere_2_5_10_tpl_3_chiffre: corrigerChiffre,
  div_critere_2_5_10_tpl_4_condition: corrigerCondition,
  div_multiple_diviseur_tpl_1: corrigerOuiNon,
  div_multiple_diviseur_tpl_2: corrigerMot,
  div_multiple_diviseur_tpl_3_suite: corrigerSuite,
  div_multiple_diviseur_tpl_4_choisir: corrigerChoisir,
});

// Utilisés plus bas par les autres micros (gardés exportés pour les essais).
export { sommeDesChiffres, plusGrandCommun, plausible, distincts, attenduNb };
