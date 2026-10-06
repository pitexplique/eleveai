import type { CorrecteursMaths } from "./types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { attendu, avecRegleMotsCles, egal, lireNombre, nombres, qcmUnique, uniteAttendue } from "./pourcentages";

// LES CORRECTEURS DE proportionnalite.bank.ts (06/10/2026, voir types.ts).
// Les énoncés écrivent toujours la QUANTITÉ avant la VALEUR, sans autre nombre :
// le correcteur relit les nombres dans l'ordre (n1, x1, [n2, x2,] m), refait le
// raisonnement (passage à l'unité : x1 ÷ n1) et compare. Jamais le gabarit.

/** Deux relevés (n1 → x1, n2 → x2) sont-ils proportionnels ? */
const proportionnels = (n1: number, x1: number, n2: number, x2: number) => egal(x1 * n2, x2 * n1);

function corrigerReleves(q: TutorGeneratedQuestionV4): string[] {
  const ns = nombres(q.text);
  if (ns.length !== 4) return [`quatre nombres attendus dans le texte, lus : ${ns.join(", ")}`];
  const juste = proportionnels(ns[0], ns[1], ns[2], ns[3]) ? "oui" : "non";
  if (q.format === "qcm") return qcmUnique(q, (c) => c === juste);
  return q.expected[0] === juste ? [] : [`attendu « ${q.expected[0]} » au lieu de « ${juste} »`];
}

function corrigerListe(q: TutorGeneratedQuestionV4): string[] {
  const p: string[] = [];
  for (const c of q.choices ?? []) if (nombres(c).length !== 4) p.push(`relevé illisible : « ${c} »`);
  return [...p, ...qcmUnique(q, (c) => {
    const [a, b, d, e] = nombres(c);
    return proportionnels(a, b, d, e);
  })];
}

/**
 * Les nombres du texte, lus comme n1, x1, [n2, x2, …,] m : la valeur pour UNE
 * unité est x1 ÷ n1 ; chaque autre relevé doit la respecter ; on demande m.
 */
function lirePaires(t: string) {
  const ns = nombres(t);
  if (ns.length < 3 || ns.length % 2 === 0) return null;
  const taux = ns[1] / ns[0];
  const incoherents: string[] = [];
  for (let i = 2; i + 1 < ns.length; i += 2)
    if (!egal(ns[i + 1], ns[i] * taux)) incoherents.push(`le relevé ${ns[i]} → ${ns[i + 1]} n'est pas proportionnel au premier`);
  return { taux, m: ns[ns.length - 1], incoherents, n1: ns[0], x1: ns[1] };
}

/** L'unité de la réponse doit être celle des valeurs du texte. */
function verifierUnite(q: TutorGeneratedQuestionV4, attenduU: string): string[] {
  if (!attenduU) return [];
  // Le texte peut écrire l'unité en toutes lettres (« 12 minutes » pour « min »).
  const formes = attenduU === "min" ? "min|minutes" : attenduU.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(`\\d (?:${formes})(?![a-zà-ü²])`);
  return re.test(q.text) ? [] : [`unité « ${attenduU} » absente des données du texte`];
}

/** Deux chiffres après la virgule au plus. */
const deuxDecimales = (x: number) => Math.abs(x * 100 - Math.round(x * 100)) < 1e-9;

function corrigerValeur(q: TutorGeneratedQuestionV4): string[] {
  const l = lirePaires(q.text);
  if (!l) return [`nombres du texte illisibles : ${nombres(q.text).join(", ")}`];
  const juste = l.m * l.taux;
  const p = [...l.incoherents];
  if (!deuxDecimales(juste)) p.push(`réponse ${juste} : trop de décimales`);
  if (q.format === "qcm") return [...p, ...qcmUnique(q, (c) => egal(lireNombre(c), juste))];
  if (!egal(attendu(q), juste)) p.push(`attendu « ${q.expected[0]} », le texte donne ${juste}`);
  return [...p, ...verifierUnite(q, uniteAttendue(q))];
}

/** Le coefficient : n1 → x1 (et d'autres relevés éventuels), coefficient x1 ÷ n1. */
function corrigerCoefficient(q: TutorGeneratedQuestionV4): string[] {
  const ns = nombres(q.text);
  if (ns.length < 2 || ns.length % 2) return [`nombres du texte illisibles : ${ns.join(", ")}`];
  const k = ns[1] / ns[0];
  const p: string[] = [];
  for (let i = 2; i + 1 < ns.length; i += 2) if (!egal(ns[i + 1], ns[i] * k)) p.push(`le relevé ${ns[i]} → ${ns[i + 1]} contredit le coefficient`);
  if (!deuxDecimales(k)) p.push(`coefficient ${k} : trop de décimales`);
  if (q.format === "qcm") return [...p, ...qcmUnique(q, (c) => egal(lireNombre(c), k))];
  if (!egal(attendu(q), k)) p.push(`attendu « ${q.expected[0]} », le coefficient est ${k}`);
  return p;
}

/** L'unité que demande la dernière phrase (« Combien de kilomètres… » → km). */
function uniteDeLaQuestion(t: string): string | null {
  const q = t.slice(t.lastIndexOf(".", t.length - 2) + 1);
  const table: [RegExp, string][] = [
    [/kilomètres/, "km"],
    [/mètres carrés/, "m²"],
    [/centimètres/, "cm"],
    [/mètres/, "m"],
    [/grammes|pèsent|pèse/, "g"],
    [/litres/, "L"],
    [/minutes de|Combien de minutes/, "min"],
    [/coûte|prix/, "€"],
    [/pièces|œufs|salades/, ""],
  ];
  for (const [re, u] of table) if (re.test(q)) return u;
  return null;
}

/** Coefficient donné, puis une quantité m : valeur = m × coefficient. */
function corrigerUtiliser(q: TutorGeneratedQuestionV4): string[] {
  const ns = nombres(q.text);
  if (ns.length !== 2) return [`deux nombres attendus, lus : ${ns.join(", ")}`];
  const juste = ns[0] * ns[1];
  const p: string[] = [];
  if (!egal(attendu(q), juste)) p.push(`attendu « ${q.expected[0]} », ${ns[1]} × ${ns[0]} = ${juste}`);
  const u = uniteDeLaQuestion(q.text);
  if (u == null) p.push("la question ne dit pas ce qu'on cherche");
  else if (u !== uniteAttendue(q)) p.push(`unité « ${uniteAttendue(q)} » au lieu de « ${u} »`);
  return p;
}

/** Deux offres (n1 pour x1 €, n2 pour x2 €) : la moins chère à l'unité. */
function corrigerOffres(q: TutorGeneratedQuestionV4): string[] {
  const ns = nombres(q.text);
  if (ns.length !== 4) return [`quatre nombres attendus, lus : ${ns.join(", ")}`];
  const [a, b] = [ns[1] / ns[0], ns[3] / ns[2]];
  const juste = egal(a, b) ? "elles se valent" : a < b ? "l’offre A" : "l’offre B";
  return qcmUnique(q, (c) => c === juste);
}

export const CORRECTEURS: CorrecteursMaths = avecRegleMotsCles({
  prop_defi_tpl_1: corrigerValeur,
  prop_defi_tpl_unite3: corrigerValeur,
  prop_defi_qcm_tpl_1: corrigerValeur,
  prop_defi_qcm_tpl_offres: corrigerOffres,
  prop_direct_tpl_1: corrigerValeur,
  prop_direct_tpl_2: corrigerValeur,
  prop_direct_qcm_tpl_1: corrigerValeur,
  prop_unite_tpl_1: corrigerValeur,
  prop_unite_tpl_2: corrigerValeur,
  prop_unite_qcm_tpl_1: corrigerValeur,
  prop_coeff_tpl_utiliser: corrigerUtiliser,
  prop_coeff_tpl_1: corrigerCoefficient,
  prop_coeff_tpl_decimal: corrigerCoefficient,
  prop_coeff_qcm_tpl_1: corrigerCoefficient,
  prop_table_tpl_1: corrigerValeur,
  prop_table_tpl_2: corrigerValeur,
  prop_table_qcm_tpl_1: corrigerValeur,
  prop_reconnaitre_tpl_1: corrigerReleves,
  prop_reconnaitre_qcm_tpl_double: corrigerReleves,
  prop_reconnaitre_qcm_tpl_1: corrigerListe,
});
