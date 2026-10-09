import type { CorrecteursMaths } from "./types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import {
  avecRegleMotsCles,
  lireNombre,
  qcmUnique as qcmUniqueBrut,
  uniteAttendue,
} from "@/lib/tutor-v4/questionBank/6e/maths/correcteurs/pourcentages";

// LES CORRECTEURS DE conversions.bank.ts — 5e, notion grandeur_conversion
// (09/10/2026, voir 6e/maths/correcteurs/types.ts). Chacun relit les MESURES
// du texte (« 3,5 km », « 2 h 15 min »), refait la conversion avec SA table
// d'unités (pas celle du gabarit), et rend la liste des problèmes : bonne
// réponse, bonne unité dans la réponse, une seule proposition juste, deux
// décimales au plus, mesure plausible pour l'objet nommé.

type Q = TutorGeneratedQuestionV4;
const qcmUnique = (q: Q, juste: (c: string) => boolean) => qcmUniqueBrut(q, (c) => juste(c.trim()));

const num = (s: string) => Number(s.replace(",", "."));
const egal = (a: number | null | undefined, b: number | null | undefined) =>
  a != null && b != null && Number.isFinite(a) && Number.isFinite(b) && Math.abs(a - b) < 1e-6;
const deuxDecimales = (x: number) => Math.abs(x * 100 - Math.round(x * 100)) < 1e-6;

/** Valeur de chaque unité dans l'unité de base de sa grandeur (m, g, L). */
const VALEUR: Record<string, { g: "longueur" | "masse" | "contenance"; f: number }> = {
  km: { g: "longueur", f: 1000 }, hm: { g: "longueur", f: 100 }, dam: { g: "longueur", f: 10 }, m: { g: "longueur", f: 1 },
  dm: { g: "longueur", f: 0.1 }, cm: { g: "longueur", f: 0.01 }, mm: { g: "longueur", f: 0.001 },
  kg: { g: "masse", f: 1000 }, g: { g: "masse", f: 1 }, mg: { g: "masse", f: 0.001 },
  L: { g: "contenance", f: 1 }, dL: { g: "contenance", f: 0.1 }, cL: { g: "contenance", f: 0.01 }, mL: { g: "contenance", f: 0.001 },
};
const NOMS: Record<string, string> = {
  kilomètres: "km", mètres: "m", décimètres: "dm", centimètres: "cm", millimètres: "mm",
  kilogrammes: "kg", grammes: "g", milligrammes: "mg",
  litres: "L", décilitres: "dL", centilitres: "cL", millilitres: "mL",
};
const SYMBOLES = Object.keys(VALEUR).sort((a, b) => b.length - a.length).join("|");
const RE_MESURE = new RegExp(`(\\d+(?:,\\d+)?) (${SYMBOLES})(?![\\wéèêàç²])`, "g");

/** Les mesures écrites dans un texte, dans l'ordre. */
function mesures(t: string): { v: number; u: string }[] {
  return [...t.matchAll(RE_MESURE)].map((m) => ({ v: num(m[1]), u: m[2] }));
}
const versBase = (x: { v: number; u: string }) => x.v * VALEUR[x.u].f;
const conv = (v: number, de: string, vers: string) => (v * VALEUR[de].f) / VALEUR[vers].f;

/** L'unité demandée : « en centimètres », « de grammes », « = … cm », « en cm. ». */
function uniteDemandee(t: string): string | null {
  const noms = Object.keys(NOMS).sort((a, b) => b.length - a.length).join("|");
  const parNom = t.match(new RegExp(`(?:en|de) (${noms})(?![\\wé])`));
  if (parNom) return NOMS[parNom[1]];
  const parSymbole = t.match(new RegExp(`(?:= … |en )(${SYMBOLES})\\.`));
  return parSymbole ? parSymbole[1] : null;
}

function verifierReponse(q: Q, juste: number, unite: string, quoi: string): string[] {
  const p: string[] = [];
  if (!Number.isFinite(juste)) return [`calcul impossible (${quoi})`];
  if (!deuxDecimales(juste)) p.push(`réponse ${juste} : plus de deux décimales (${quoi})`);
  if (juste <= 0) p.push(`réponse ${juste} : pas plausible (${quoi})`);
  if (q.format === "qcm") {
    p.push(...qcmUnique(q, (c) => egal(lireNombre(c), juste) && c.replace(/^[\d ,]+/, "").trim() === unite));
    return p;
  }
  if (!egal(lireNombre(String(q.expected[0])), juste)) p.push(`attendu « ${q.expected[0]} », le texte donne ${juste} (${quoi})`);
  if (uniteAttendue(q) !== unite) p.push(`unité de la réponse « ${uniteAttendue(q)} » au lieu de « ${unite} »`);
  return p;
}

// ─── conversion_decimal ────────────────────────────────────────────────────

function cConvDecimal(q: Q): string[] {
  const ms = mesures(q.text);
  if (ms.length !== 1) return [`une mesure attendue, lues : ${ms.map((m) => `${m.v} ${m.u}`).join(", ")}`];
  const vers = uniteDemandee(q.text);
  if (!vers) return ["unité demandée illisible"];
  if (VALEUR[vers].g !== VALEUR[ms[0].u].g) return [`on ne convertit pas des ${ms[0].u} en ${vers}`];
  if (vers === ms[0].u) return ["unité d'arrivée = unité de départ"];
  return verifierReponse(q, conv(ms[0].v, ms[0].u, vers), vers, "conversion");
}

// ─── conversion_duree ──────────────────────────────────────────────────────

/** Les durées d'un texte, en secondes : « 2 h 15 min », « 1,5 h », « 45 min », « 3 min 20 s ». */
function durees(t: string): number[] {
  const out: number[] = [];
  for (const m of t.matchAll(/(\d+(?:,\d+)?) h(?: (\d+) min)?(?![\wé])|(\d+) min(?:utes)?(?: (\d+) s)?(?![\wé])/g)) {
    if (m[1] != null) out.push(num(m[1]) * 3600 + (m[2] ? Number(m[2]) * 60 : 0));
    else out.push(Number(m[3]) * 60 + (m[4] ? Number(m[4]) : 0));
  }
  return out;
}

function cDuree(q: Q): string[] {
  const ds = durees(q.text);
  const p: string[] = [];
  const enTout = /en tout/.test(q.text);
  if (ds.length !== (enTout ? 2 : 1)) return [`${enTout ? "deux durées" : "une durée"} attendue(s), lues : ${ds.join(", ")} s`];
  const total = ds.reduce((a, b) => a + b, 0);
  if (q.format === "qcm") {
    // « Comment écrire cette durée en heures et minutes ? » : la proposition qui vaut la même durée, minutes < 60.
    if (!/heures et (de )?minutes/.test(q.text)) p.push("QCM sans consigne « heures et minutes »");
    const ok = (c: string) => {
      const m = c.match(/^(\d+) h(?: (\d+) min)?$/);
      return !!m && Number(m[2] ?? 0) < 60 && Number(m[1]) * 3600 + Number(m[2] ?? 0) * 60 === total;
    };
    return [...p, ...qcmUnique(q, ok)];
  }
  const enSecondes = /secondes|= … s\./.test(q.text);
  // Les durées s'écrivent « min » ; le mot « minutes » n'apparaît que dans la consigne.
  const enMinutes = /minutes|= … min\./.test(q.text);
  if (enSecondes === enMinutes) return ["unité demandée illisible"];
  return verifierReponse(q, enSecondes ? total : total / 60, enSecondes ? "s" : "min", "durée");
}

// ─── conversion_avant_calcul ───────────────────────────────────────────────

function cAvantCalcul(q: Q): string[] {
  const t = q.text;
  const ms = mesures(t);
  if (q.format === "qcm") {
    // comparer trois mesures
    if (ms.length !== 3) return ["trois mesures attendues"];
    const c = q.choices ?? [];
    const lues = ms.map((m) => `${String(m.v).replace(".", ",")} ${m.u}`);
    if (c.length !== 3 || c.some((x) => !lues.includes(x))) return ["les propositions ne sont pas les trois mesures du texte"];
    if (new Set(ms.map((m) => VALEUR[m.u].g)).size !== 1) return ["mesures de grandeurs différentes"];
    const bases = ms.map(versBase);
    const grande = /plus grande/.test(t);
    const cible = grande ? Math.max(...bases) : Math.min(...bases);
    if (bases.filter((b) => egal(b, cible)).length !== 1) return ["deux mesures égales à l'extrême"];
    return qcmUnique(q, (x) => egal(versBase(mesures(x)[0]), cible));
  }
  const prix = t.match(/(\d+) € le (kilogramme|litre)/);
  if (prix) {
    const qte = ms.filter((m) => VALEUR[m.u]);
    if (qte.length !== 1) return ["une quantité attendue"];
    const enKgOuL = versBase(qte[0]) / (VALEUR[qte[0].u].g === "masse" ? 1000 : 1);
    return verifierReponse(q, Number(prix[1]) * enKgOuL, "€", "prix");
  }
  if (/on obtient/.test(t)) {
    // X L de lait → 1 kg de beurre ; pour Z g de beurre ?
    const lait = ms.filter((m) => VALEUR[m.u].g === "contenance");
    const beurre = ms.filter((m) => VALEUR[m.u].g === "masse");
    if (lait.length !== 1 || beurre.length !== 2) return ["recette illisible"];
    return verifierReponse(q, (lait[0].v * versBase(beurre[1])) / versBase(beurre[0]), lait[0].u, "recette");
  }
  const vers = uniteDemandee(t);
  if (!vers) return ["unité demandée illisible"];
  if (ms.some((m) => VALEUR[m.u].g !== VALEUR[vers].g)) return ["mesures de grandeurs différentes"];
  if (new Set(ms.map((m) => m.u)).size < 2) return ["une seule unité : rien à convertir avant de calculer"];
  if (/reste/.test(t)) {
    if (ms.length !== 2) return ["deux mesures attendues"];
    return verifierReponse(q, conv(ms[0].v, ms[0].u, vers) - conv(ms[1].v, ms[1].u, vers), vers, "reste");
  }
  if (/en tout/.test(t)) return verifierReponse(q, ms.reduce((a, m) => a + conv(m.v, m.u, vers), 0), vers, "somme");
  return ["opération illisible"];
}

// ─── conversion_coherence ──────────────────────────────────────────────────

/** Ce que mesure VRAIMENT un objet (unité de base : m, g, L) — table propre au correcteur. */
const PLAUSIBLE: Array<[RegExp, number, number]> = [
  [/porte de maison/, 1.8, 2.6], [/crayon neuf/, 0.12, 0.22], [/terrain de football/, 90, 120], [/fourmi/, 0.001, 0.02],
  [/trajet de la maison au collège/, 300, 20000], [/feuille de cahier/, 0.2, 0.35], [/bus scolaire/, 8, 15],
  [/grain de riz/, 0.003, 0.01], [/marathon/, 40000, 43000],
  [/sac de riz/, 500, 25000], [/pomme/, 80, 300], [/comprimé/, 0.1, 2], [/chat adulte/, 2000, 8000], [/trombone/, 0.3, 3],
  [/tablette de chocolat/, 50, 250],
  [/grande bouteille d’eau/, 1, 2], [/cuillère à café/, 0.003, 0.01], [/un verre/, 0.1, 0.4], [/baignoire/, 100, 300],
  [/canette/, 0.25, 0.5], [/seau/, 5, 20],
];

function cCoherence(q: Q): string[] {
  const t = q.text;
  if (/Vrai ou faux/.test(t)) {
    const m = t.match(new RegExp(`(\\d+(?:,\\d+)?) (${SYMBOLES}) = (\\d+(?:,\\d+)?) (${SYMBOLES})(?![\\w])`));
    if (!m) return ["égalité illisible"];
    if (VALEUR[m[2]].g !== VALEUR[m[4]].g) return ["égalité entre grandeurs différentes"];
    const vrai = egal(conv(num(m[1]), m[2], m[4]), num(m[3]));
    if ((q.choices ?? []).join("|") !== "vrai|faux") return ["« Vrai ou faux » sans les choix vrai / faux"];
    return qcmUnique(q, (c) => c === (vrai ? "vrai" : "faux"));
  }
  const objet = PLAUSIBLE.find(([re]) => re.test(t.toLowerCase()));
  if (!objet) return ["objet inconnu du correcteur"];
  const [, min, max] = objet;
  const dedans = (base: number) => base >= min && base <= max;
  const v = t.match(/environ (\d+(?:,\d+)?) …/);
  if (v) {
    // les propositions sont des unités seules
    return qcmUnique(q, (c) => !!VALEUR[c] && dedans(num(v[1]) * VALEUR[c].f));
  }
  return qcmUnique(q, (c) => {
    const m = mesures(c);
    return m.length === 1 && dedans(versBase(m[0]));
  });
}

export const CORRECTEURS: CorrecteursMaths = avecRegleMotsCles({
  "5e_conversion_decimal_tpl_1_longueurs": cConvDecimal,
  "5e_conversion_decimal_tpl_e3": cConvDecimal,
  "5e_conversion_duree_tpl_1_minutes_vers_heures": cDuree,
  "5e_conversion_duree_tpl_e1": cDuree,
  "5e_conversion_duree_tpl_e3": cDuree,
  "5e_conversion_avant_calcul_tpl_1_somme_deux_unites": cAvantCalcul,
  "5e_conversion_avant_calcul_tpl_e4": cAvantCalcul,
  "5e_conversion_coherence_tpl_1_choisir_unite": cCoherence,
  "5e_conversion_coherence_tpl_e1": cCoherence,
  "5e_conversion_coherence_tpl_e3": cCoherence,
});
