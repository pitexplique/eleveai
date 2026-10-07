import type { CorrecteursMaths } from "./types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { PRENOMS } from "../entiers.bank";
import { accordPronom, lireReponse, mesures, val, verifierQcm, verifierReponse, LONGUEUR } from "./aires";

// LES CORRECTEURS DE volumes.bank.ts (06/10/2026, voir types.ts).
// Chacun relit les nombres et les unités du texte que voit l'élève, refait le
// calcul (compter, additionner, multiplier les trois dimensions…) avec ses
// propres tables, et rend la liste des problèmes (vide = juste).

type Q = TutorGeneratedQuestionV4;
const VOLUME = "dm³|cm³|mm³|m³";
const NB = String.raw`\d{1,3}(?:[  ]\d{3})+(?:,\d+)?|\d+(?:,\d+)?`;

// ─── volume_unite ───────────────────────────────────────────────────────────

const PETITS = ["dé à jouer", "gomme", "sucre", "allumettes", "yaourt", "balle de tennis", "verre", "craies", "bijoux"];
const GRANDS = ["piscine", "chambre", "camion", "conteneur", "citerne", "abri de jardin", "salle de sport"];

function corrigerUnite(q: Q): string[] {
  const t = q.text;
  const petit = PETITS.some((o) => t.includes(o));
  const grand = GRANDS.some((o) => t.includes(o));
  if (petit === grand) return ["objet introuvable ou ambigu"];
  const classe = petit ? "cm" : "m";
  const p: string[] = [];
  const cubes = (q.choices ?? []).filter((c) => /³/.test(c));
  if (cubes.length !== 1) p.push(`il faut une seule unité cube : ${(q.choices ?? []).join(" | ")}`);
  if (q.expected[0] !== cubes[0]) p.push(`l'attendue « ${q.expected[0]} » n'est pas la mesure de volume`);
  const u = lireReponse(q.expected[0]).u || q.expected[0];
  if (u !== `${classe}³`) p.push(`unité « ${u} » peu adaptée : il faut ${classe}³`);
  if (/\d/.test(q.expected[0])) {
    const v = lireReponse(q.expected[0]).v;
    const [lo, hi] = petit ? [1, 500] : [1, 3000];
    if (!(v >= lo && v <= hi)) p.push(`volume peu plausible : ${q.expected[0]}`);
    if (new Set((q.choices ?? []).map((c) => lireReponse(c).v)).size !== 1) p.push("les propositions n'ont pas toutes le même nombre");
  }
  return [...p, ...accordPronom(t)];
}

const REMPLIR = ["remplir", "contient", "tiennent", "place prend", "combien d’air"];
const COUVRIR = ["recouvrir", "peindre", "coller du tissu"];
const TOUR = ["tout autour"];

function corrigerGrandeur(q: Q): string[] {
  const t = q.text;
  const n = [REMPLIR, COUVRIR, TOUR].map((l) => l.some((m) => t.includes(m)));
  if (n.filter(Boolean).length !== 1) return ["action ambiguë"];
  const juste = n[0] ? "le volume" : n[1] ? "l’aire" : "le périmètre";
  const p: string[] = [];
  if (q.expected[0] !== juste) p.push(`attendu « ${q.expected[0]} », il faut « ${juste} »`);
  return [...p, ...accordPronom(t)];
}

const corrigerUniteOuGrandeur = (q: Q) => (/unité|mesures|écritures/.test(q.text) ? corrigerUnite(q) : corrigerGrandeur(q));

// ─── volume_compter, volume_assemblage ──────────────────────────────────────

/**
 * Relit une construction de cubes unités : « 3 couches de 4 rangées de 2
 * cubes » (produit), « 3 étages de 5 cubes » (produit), « retire 2 cubes »
 * (soustrait), tout autre nombre (ajouté). Rend l'unité du cube unité.
 */
export function lireCubes(t: string): { total: number; u: string; nombres: number[] } | string {
  const unites = [...t.matchAll(new RegExp(`\\b1 (${VOLUME})`, "g"))].map((m) => m[1]);
  if (unites.length !== 1) return "le cube unité (« 1 cm³ ») est absent ou en double";
  let reste = t.replace(new RegExp(`\\b1 (${VOLUME})`), " ");
  let total = 0;
  const nombres: number[] = [];
  for (const m of reste.matchAll(/(\d+) couches de (\d+) rangées de (\d+) cubes/g)) {
    total += Number(m[1]) * Number(m[2]) * Number(m[3]);
    nombres.push(Number(m[1]), Number(m[2]), Number(m[3]));
  }
  reste = reste.replace(/(\d+) couches de (\d+) rangées de (\d+) cubes/g, " ");
  for (const m of reste.matchAll(/(\d+) (?:étages|couches|rangées) de (\d+) cubes/g)) {
    total += Number(m[1]) * Number(m[2]);
    nombres.push(Number(m[1]), Number(m[2]));
  }
  reste = reste.replace(/(\d+) (?:étages|couches|rangées) de (\d+) cubes/g, " ");
  for (const m of reste.matchAll(/retire (\d+) cubes?/g)) {
    total -= Number(m[1]);
    nombres.push(Number(m[1]));
  }
  reste = reste.replace(/retire (\d+) cubes?/g, " ");
  for (const m of reste.matchAll(/\d+(?:,\d+)?/g)) {
    total += val(m[0]);
    nombres.push(val(m[0]));
  }
  return { total, u: unites[0], nombres };
}

function corrigerCubes(q: Q): string[] {
  const l = lireCubes(q.text);
  if (typeof l === "string") return [l];
  const p: string[] = [];
  if (l.total <= 0) p.push("le solide n'a plus de cube");
  if (l.nombres.some((x) => !Number.isInteger(x) || x < 1 || x > 15)) p.push(`compte peu plausible : ${l.nombres.join(", ")}`);
  p.push(...verifierReponse(q, l.total, l.u));
  if (q.format === "qcm") p.push(...verifierQcm(q, l.total, l.u));
  return [...p, ...accordPronom(q.text)];
}

// ─── volume_comparer ────────────────────────────────────────────────────────

const derniere = (t: string) => t.split(/(?<=[.?!])\s+/).pop() ?? "";
function sens(t: string): "grand" | "petit" | null {
  const f = derniere(t);
  const g = /plus grand/.test(f);
  const p = /plus petit/.test(f);
  return g === p ? null : g ? "grand" : "petit";
}
function prenomsDansLOrdre(t: string): string[] {
  return PRENOMS.map((x) => ({ n: x.nom, i: t.search(new RegExp(`(^|[^\\p{L}])${x.nom}(?![\\p{L}])`, "u")) }))
    .filter((o) => o.i >= 0)
    .sort((a, b) => a.i - b.i)
    .map((o) => o.n);
}
/** En QCM « celui de X / celui de Y / même volume » : la proposition juste d'après deux valeurs. */
function verifierQuiGagne(q: Q, v1: number, v2: number, s: "grand" | "petit"): string[] {
  const noms = prenomsDansLOrdre(q.text);
  if (noms.length !== 2) return [`il faut deux prénoms, lu : ${noms.join(", ")}`];
  const choix = q.choices ?? [];
  const deQui = (n: string) => choix.filter((c) => new RegExp(`(^|[^\\p{L}])${n}$`, "u").test(c));
  const egal = choix.filter((c) => /même/.test(c));
  if (deQui(noms[0]).length !== 1 || deQui(noms[1]).length !== 1 || egal.length !== 1) return [`propositions mal formées : ${choix.join(" | ")}`];
  const juste = v1 === v2 ? egal[0] : (v1 > v2) === (s === "grand") ? deQui(noms[0])[0] : deQui(noms[1])[0];
  return q.expected[0] === juste ? [] : [`attendu « ${q.expected[0]} », recalculé « ${juste} » (${v1} et ${v2})`];
}

function corrigerComparerDeux(q: Q): string[] {
  const v = mesures(q.text, VOLUME);
  if (v.length !== 2) return [`il faut deux volumes, lu : ${v.length}`];
  if (v[0].u !== v[1].u) return ["les deux volumes ne sont pas dans la même unité"];
  if (v[0].v === v[1].v) return ["les deux volumes sont égaux"];
  const s = sens(q.text);
  if (!s) return ["la question ne dit pas « plus grand » ou « plus petit »"];
  return verifierReponse(q, s === "grand" ? Math.max(v[0].v, v[1].v) : Math.min(v[0].v, v[1].v), v[0].u);
}

function corrigerComparerPiles(q: Q): string[] {
  const m = [...q.text.matchAll(/(\d+) (?:étages|couches) de (\d+) cubes/g)];
  if (m.length !== 2) return [`il faut deux constructions, lu : ${m.length}`];
  const s = sens(q.text);
  if (!s) return ["sens de la question illisible"];
  const v1 = Number(m[0][1]) * Number(m[0][2]);
  const v2 = Number(m[1][1]) * Number(m[1][2]);
  const p = verifierQuiGagne(q, v1, v2, s);
  if (!/cubes sont pareils/.test(q.text)) p.push("rien ne dit que les cubes sont identiques");
  return p;
}

// ─── volume_lire ────────────────────────────────────────────────────────────

function corrigerLireMesures(q: Q): string[] {
  const v = mesures(q.text, VOLUME);
  if (v.length !== 1) return [`il faut une seule mesure de volume dans le texte, lu : ${v.length}`];
  const toutes = mesures(q.text, `${VOLUME}|dm²|cm²|m²|kg|g|${LONGUEUR}`);
  const annonce = /deux mesures/.test(q.text) ? 2 : /quatre mesures/.test(q.text) ? 4 : 0;
  const p: string[] = [];
  if (toutes.length !== annonce) p.push(`le texte annonce ${annonce} mesures, il y en a ${toutes.length}`);
  p.push(...verifierReponse(q, v[0].v, v[0].u));
  return [...p, ...accordPronom(q.text)];
}

// Table propre au correcteur : les mots des nombres.
const UNITES: Record<string, number> = {
  zéro: 0, un: 1, deux: 2, trois: 3, quatre: 4, cinq: 5, six: 6, sept: 7, huit: 8, neuf: 9, dix: 10,
  onze: 11, douze: 12, treize: 13, quatorze: 14, quinze: 15, seize: 16, vingt: 20, trente: 30,
  quarante: 40, cinquante: 50, soixante: 60, cent: 100, cents: 100,
};
/** « deux cent quarante-trois » → 243 ; null si un mot est inconnu. */
export function lettresVersNombre(s: string): number | null {
  const mots = s.replace(/-/g, " ").replace(/\bet\b/g, " ").split(/\s+/).filter(Boolean);
  let total = 0;
  let courant = 0;
  for (let i = 0; i < mots.length; i++) {
    const m = mots[i];
    if (m === "quatre" && /^vingts?$/.test(mots[i + 1] ?? "")) {
      courant += 80;
      i++;
      continue;
    }
    if (!(m in UNITES)) return null;
    const v = UNITES[m];
    if (v === 100) {
      courant = (courant || 1) * 100;
      total += courant;
      courant = 0;
    } else courant += v;
  }
  return total + courant;
}
const UNITE_MOTS: Record<string, string> = { "centimètres cubes": "cm³", "décimètres cubes": "dm³", "mètres cubes": "m³" };
function lireEnLettres(s: string): { v: number; u: string } | null {
  const m = s.match(/^(.*) (centimètres|décimètres|mètres) (cubes|carrés)$/);
  if (!m) return null;
  const v = lettresVersNombre(m[1]);
  if (v == null) return null;
  return { v, u: m[3] === "cubes" ? UNITE_MOTS[`${m[2]} cubes`] : `${UNITE_MOTS[`${m[2]} cubes`].replace("³", "²")}` };
}

function corrigerLireLettres(q: Q): string[] {
  const p: string[] = [];
  const cite = q.text.match(/« ([^»]+) »/);
  if (cite) {
    // Des lettres vers les chiffres.
    const l = lireEnLettres(cite[1].trim());
    if (!l) return [`lecture des lettres impossible : « ${cite[1]} »`];
    p.push(...verifierReponse(q, l.v, l.u), ...verifierQcm(q, l.v, l.u));
  } else {
    // Des chiffres vers les lettres.
    const v = mesures(q.text, VOLUME);
    if (v.length !== 1) return [`il faut un seul volume chiffré, lu : ${v.length}`];
    const justes = (q.choices ?? []).filter((c) => {
      const l = lireEnLettres(c);
      if (!l) p.push(`proposition illisible : « ${c} »`);
      return l && l.v === v[0].v && l.u === v[0].u;
    });
    if (justes.length !== 1 || justes[0] !== q.expected[0]) p.push(`propositions justes : ${justes.join(" | ") || "aucune"} ; attendue « ${q.expected[0]} »`);
  }
  return [...p, ...accordPronom(q.text)];
}

// ─── volume_defi ────────────────────────────────────────────────────────────

function corrigerPave(q: Q): string[] {
  const ls = mesures(q.text, LONGUEUR);
  if (ls.length !== 3 || new Set(ls.map((x) => x.u)).size !== 1) return [`il faut trois dimensions dans la même unité, lu : ${ls.length}`];
  const V = ls[0].v * ls[1].v * ls[2].v;
  const u = /Combien de cubes de 1/.test(q.text) ? "cubes" : `${ls[0].u}³`;
  if (u === "cubes" && !new RegExp(`cubes de 1 ${ls[0].u}³`).test(q.text)) return ["le cube unité n'est pas dans l'unité des dimensions"];
  return [...verifierReponse(q, V, u), ...accordPronom(q.text)];
}

function corrigerDefiQcm(q: Q): string[] {
  const ls = mesures(q.text, LONGUEUR);
  if (/d’arête/.test(q.text)) {
    if (ls.length !== 1) return [`il faut une seule arête, lu : ${ls.length}`];
    const V = ls[0].v ** 3;
    return [...verifierQcm(q, V, `${ls[0].u}³`), ...verifierReponse(q, V, `${ls[0].u}³`), ...accordPronom(q.text)];
  }
  if (ls.length !== 6) return [`il faut deux boîtes de trois dimensions, lu : ${ls.length}`];
  const v1 = ls[0].v * ls[1].v * ls[2].v;
  const v2 = ls[3].v * ls[4].v * ls[5].v;
  const s = sens(q.text);
  if (!s) return ["sens illisible"];
  return verifierQuiGagne(q, v1, v2, s);
}

function corrigerDefiInverse(q: Q): string[] {
  const v = mesures(q.text, VOLUME);
  const ls = mesures(q.text, LONGUEUR);
  if (v.length !== 1) return [`il faut un seul volume, lu : ${v.length}`];
  const u = v[0].u.replace("³", "");
  if (ls.length === 0) {
    const a = Math.round(Math.cbrt(v[0].v));
    if (a ** 3 !== v[0].v) return [`${v[0].v} n'est pas le cube d'un entier`];
    return verifierReponse(q, a, u);
  }
  if (ls.length !== 2 || ls.some((x) => x.u !== u)) return ["il faut les deux côtés du fond, dans l'unité du volume"];
  const h = v[0].v / (ls[0].v * ls[1].v);
  const p = verifierReponse(q, h, u);
  if (!Number.isInteger(h)) p.push("la hauteur ne tombe pas juste");
  return [...p, ...accordPronom(q.text)];
}

export const CORRECTEURS: CorrecteursMaths = {
  volume_comparer_tpl_1: corrigerComparerDeux,
  volume_comparer_qcm_tpl_1: corrigerComparerPiles,
  volume_lire_tpl_e1: corrigerLireMesures,
  volume_lire_tpl_1: corrigerLireMesures,
  volume_lire_qcm_tpl_1: corrigerLireLettres,
  volume_defi_tpl_e3: corrigerPave,
  volume_defi_tpl_1: corrigerDefiQcm,
  volume_defi_tpl_2: corrigerDefiInverse,
  volume_compter_tpl_1: corrigerCubes,
  volume_compter_tpl_2: corrigerCubes,
  volume_compter_qcm_tpl_1: corrigerCubes,
  volume_assemblage_tpl_e2: corrigerCubes,
  volume_assemblage_tpl_1: corrigerCubes,
  volume_assemblage_qcm_tpl_1: corrigerCubes,
  volume_unite_tpl_1: corrigerUniteOuGrandeur,
  volume_unite_tpl_2: corrigerUniteOuGrandeur,
};
