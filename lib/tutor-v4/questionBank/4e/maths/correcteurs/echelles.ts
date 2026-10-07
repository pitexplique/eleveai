import type { CorrecteursMaths } from "./types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { avecRegleMotsCles, egal, qcmUnique, uniteAttendue } from "@/lib/tutor-v4/questionBank/6e/maths/correcteurs/pourcentages";

// LES CORRECTEURS DE echelles.bank.ts (notion prop_echelle, 07/10/2026).
// Ils relisent dans le TEXTE l'échelle « 1/n » (et EXIGENT son explication :
// « 1 cm sur le plan représente n cm en vrai », Frédéric le 06/10), les mesures
// (« 12 cm », « 900 m », « 6 km », « 15 cm² », « 6 L »), le rapport k, et la
// figure quand il y en a une ; puis ils refont le calcul (× n ou ÷ n avec
// conversion, longueurs × k, aires × k², volumes × k³). Vide = juste.

type Q = TutorGeneratedQuestionV4;

/** « 10 000 », « 2,5 », « 12 » : comme les gabarits écrivent les nombres. */
const NB = "(\\d{1,3}(?: \\d{3})+(?:,\\d+)?|\\d+(?:,\\d+)?)";
const num = (s: string) => Number(s.replace(/ /g, "").replace(",", "."));
const entier = (x: number) => Math.abs(x - Math.round(x)) < 1e-9;
const EN_CM: Record<string, number> = { cm: 1, m: 100, km: 100000 };

/** « 5 m » → { v: 5, u: "m" } ; « 1 250 km » → { v: 1250, u: "km" }. */
function lireMesure(s: string): { v: number; u: string } | null {
  const m = String(s).trim().match(new RegExp(`^${NB}(?: (.+))?$`));
  return m ? { v: num(m[1]), u: (m[2] ?? "").trim() } : null;
}
const enCm = (s: string) => {
  const m = lireMesure(s);
  return m && m.u in EN_CM ? m.v * EN_CM[m.u] : null;
};

/** Les échelles « 1/n » du texte ; chacune doit être expliquée en centimètres. */
function echelles(t: string): { ns: number[]; pb: string[] } {
  const ns = [...t.matchAll(new RegExp(`1/${NB}`, "g"))].map((m) => num(m[1]));
  const expliquees = [...t.matchAll(new RegExp(`1 cm (?:sur (?:le plan|la carte|la maquette) )?représente ${NB} cm en vrai`, "g"))].map((m) => num(m[1]));
  const pb = ns
    .filter((n) => !expliquees.includes(n))
    .map((n) => `l'échelle 1/${n} n'est pas expliquée (« 1 cm sur le plan représente ${n} cm en vrai »)`);
  return { ns, pb };
}

/** Les espaces insécables des milliers (« 10 000 ») deviennent des espaces simples, pour la lecture. */
const ESP = /[  ]/g;
function normaliser(q: Q): Q {
  const n = (s: string) => String(s).replace(ESP, " ");
  const c = q.canvas as Record<string, unknown> | undefined;
  return {
    ...q,
    text: n(q.text),
    expected: q.expected.map(n),
    choices: q.choices?.map(n),
    canvas: c ? (Object.fromEntries(Object.entries(c).map(([k, v]) => [k, typeof v === "string" ? n(v) : v])) as Q["canvas"]) : undefined,
  };
}

/** Le texte sans les échelles ni leurs explications : il ne reste que les mesures de la situation. */
const sansEchelle = (t: string) =>
  t
    .replace(new RegExp(`1 cm (?:sur (?:le plan|la carte|la maquette) )?représente ${NB} cm en vrai`, "g"), " ")
    .replace(new RegExp(`1/${NB}`, "g"), " ")
    .replace(/« [^»]* »/g, " ");

/** Les mesures « 12 cm », « 900 m », « 6 km » d'un texte. */
const mesures = (t: string, u: string) =>
  [...t.matchAll(new RegExp(`${NB} ${u}(?![\\p{L}²³])`, "gu"))].map((m) => num(m[1]));

/** Une réponse courte : la valeur et l'unité. */
function verifierReponse(q: Q, juste: number, u: string): string[] {
  const p: string[] = [];
  const e = lireMesure(String(q.expected[0]));
  if (!e || !egal(e.v, juste)) p.push(`attendu « ${q.expected[0]} », le texte donne ${juste} ${u}`);
  if (uniteAttendue(q).replace(/^[\d ,]+/, "") !== u) p.push(`unité de la réponse « ${uniteAttendue(q)} » au lieu de « ${u} »`);
  if (!entier(juste * 100)) p.push(`${juste} : plus de deux décimales`);
  return p;
}

/** La figure doit porter les mêmes nombres que le texte. */
function verifierFigure(q: Q, attendus: string[]): string[] {
  const c = q.canvas as Record<string, unknown> | undefined;
  if (!c) return [];
  const labels = Object.values(c).filter((v) => typeof v === "string").join(" | ");
  return attendus.filter((a) => !labels.includes(a)).map((a) => `la figure ne montre pas « ${a} » (elle montre : ${labels})`);
}

const frN = (n: number) => (Number.isInteger(n) ? n.toLocaleString("fr-FR").replace(ESP, " ") : String(n).replace(".", ","));

// ─── echelle_comprendre ─────────────────────────────────────────────────────

/** 1/n : ce que vaut 1 cm en vrai, converti. */
function corrigerLire(q: Q): string[] {
  const { ns, pb } = echelles(q.text);
  if (ns.length !== 1) return [`une échelle attendue, lues : ${ns.join(", ")}`];
  const juste = ns[0];
  return [
    ...pb,
    ...(egal(enCm(q.expected[0]), juste) ? [] : [`attendu « ${q.expected[0]} » ≠ ${juste} cm`]),
    ...qcmUnique(q, (c) => egal(enCm(c), juste)),
    ...verifierFigure(q, [`1/${frN(juste)}`]),
  ];
}

/** Deux échelles : laquelle détaille / réduit le plus. */
function corrigerComparer(q: Q): string[] {
  const { ns, pb } = echelles(q.text);
  if (ns.length !== 2 || ns[0] === ns[1]) return [`deux échelles distinctes attendues, lues : ${ns.join(", ")}`];
  const petit = Math.min(...ns);
  const grand = Math.max(...ns);
  const fin = q.text.slice(q.text.lastIndexOf(". ") + 2);
  const juste = /DÉTAILS|LONGUE/.test(fin) ? petit : /RÉGION|RÉDUIT/.test(fin) ? grand : null;
  if (juste == null) return [`question illisible : ${fin}`];
  const lire = (c: string) => num(c.replace(/^1\//, ""));
  return [...pb, ...(lire(q.expected[0]) === juste ? [] : [`attendu « ${q.expected[0]} », la bonne carte est au 1/${juste}`]), ...qcmUnique(q, (c) => lire(c) === juste)];
}

// ─── echelle_distance_reelle ────────────────────────────────────────────────

/** 1/n et une mesure sur le plan en cm : la longueur réelle, en m. */
function corrigerVersReel(q: Q): string[] {
  const { ns, pb } = echelles(q.text);
  if (ns.length !== 1) return ["une échelle attendue"];
  const cms = mesures(sansEchelle(q.text), "cm");
  if (cms.length !== 1) return [...pb, `une mesure en cm attendue, lues : ${cms.join(", ")}`];
  const juste = (cms[0] * ns[0]) / 100;
  const p = [...pb, ...verifierReponse(q, juste, "m"), ...verifierFigure(q, [`1/${frN(ns[0])}`, `${cms[0]} cm`])];
  if (!/en mètres|en m\b/.test(q.text)) p.push("l'énoncé ne dit pas l'unité de la réponse (m)");
  if (juste > 2000) p.push(`${juste} m : peu plausible pour un plan`);
  return p;
}

/** 1/n et une mesure sur la carte : la distance réelle, en km (QCM). */
function corrigerVersReelKm(q: Q): string[] {
  const { ns, pb } = echelles(q.text);
  if (ns.length !== 1) return ["une échelle attendue"];
  const cms = mesures(sansEchelle(q.text), "cm");
  if (cms.length !== 1) return [...pb, `une mesure en cm attendue, lues : ${cms.join(", ")}`];
  const juste = cms[0] * ns[0];
  const p = [...pb, ...qcmUnique(q, (c) => egal(enCm(c), juste))];
  if (lireMesure(q.expected[0])?.u !== "km") p.push(`la réponse attendue « ${q.expected[0]} » n'est pas en km`);
  return p;
}

// ─── echelle_distance_plan ──────────────────────────────────────────────────

/** 1/n et une longueur réelle en m : la longueur à tracer, en cm. */
function corrigerVersPlan(q: Q): string[] {
  const { ns, pb } = echelles(q.text);
  if (ns.length !== 1) return ["une échelle attendue"];
  const ms = mesures(sansEchelle(q.text), "m");
  if (ms.length !== 1) return [...pb, `une longueur en m attendue, lues : ${ms.join(", ")}`];
  const juste = (ms[0] * 100) / ns[0];
  const p = [...pb, ...verifierReponse(q, juste, "cm"), ...verifierFigure(q, [`1/${frN(ns[0])}`, `${frN(ms[0])} m`])];
  if (juste > 30) p.push(`${juste} cm : ne tient pas sur une feuille`);
  if (!/en cm|en centimètres/.test(q.text)) p.push("l'énoncé ne dit pas l'unité de la réponse (cm)");
  return p;
}

/** Une longueur réelle en m, sa longueur sur le papier en cm : l'échelle. */
function corrigerChoisir(q: Q): string[] {
  const ms = mesures(q.text, "m");
  const cms = mesures(q.text, "cm");
  if (ms.length !== 1 || cms.length !== 1) return [`une mesure en m et une en cm attendues (lues : ${ms}, ${cms})`];
  const juste = (ms[0] * 100) / cms[0];
  if (!entier(juste)) return [`échelle non entière : ${juste}`];
  const lire = (c: string) => (/^1\//.test(c) ? num(c.slice(2)) : NaN);
  return [...(lire(q.expected[0]) === juste ? [] : [`attendu « ${q.expected[0]} », le texte donne 1/${juste}`]), ...qcmUnique(q, (c) => lire(c) === juste)];
}

// ─── agrandissement_rapport ─────────────────────────────────────────────────

/** Le rapport k écrit dans le texte : « rapport 3 », « multiplie par 3 », « 3 fois plus ». */
function rapport(t: string): number | null {
  const m = t.match(/rapport(?: d'agrandissement)?(?: :)? (\d+)(?![\d/])|multiplie(?:nt|r)? par (\d+)|multipliée?s? par (\d+)|(\d+) fois plus (?:grand|long|petit)/i);
  return m ? Number(m[1] ?? m[2] ?? m[3] ?? m[4]) : null;
}

/** Un rectangle l × L agrandi de rapport k : la nouvelle largeur ou longueur. */
function corrigerLongueurs(q: Q): string[] {
  const k = rapport(q.text);
  const cms = mesures(q.text, "cm");
  if (!k || cms.length !== 2) return [`rapport ou dimensions illisibles (k = ${k}, ${cms})`];
  const fin = q.text.slice(q.text.lastIndexOf(". ") + 2);
  const dim = /largeur/.test(fin) ? Math.min(...cms) : /longueur/.test(fin) ? Math.max(...cms) : null;
  if (dim == null || cms[0] === cms[1]) return [`dimension demandée illisible : ${fin}`];
  return verifierReponse(q, dim * k, "cm");
}

/** Deux longueurs correspondantes : le rapport d'agrandissement. */
function corrigerTrouverK(q: Q): string[] {
  const cms = mesures(q.text, "cm");
  if (cms.length !== 2) return [`deux longueurs attendues, lues : ${cms.join(", ")}`];
  const juste = Math.max(...cms) / Math.min(...cms);
  if (!entier(juste) || juste < 2) return [`rapport ${juste} : pas un agrandissement entier`];
  return [...(Number(q.expected[0]) === juste ? [] : [`attendu « ${q.expected[0]} », le texte donne ${juste}`]), ...qcmUnique(q, (c) => Number(c) === juste)];
}

/** Une réduction de rapport 1/k (ou « k fois plus petite ») : la longueur réduite. */
function corrigerReduction(q: Q): string[] {
  const k = Number(q.text.match(/rapport(?: de réduction)?(?: :)? 1\/(\d+)|(\d+) fois plus petite/i)?.slice(1).find(Boolean));
  const cms = mesures(q.text, "cm");
  if (!k || cms.length !== 1) return [`rapport ou longueur illisibles (k = ${k}, ${cms})`];
  const juste = cms[0] / k;
  return [...verifierReponse(q, juste, "cm"), ...(entier(juste) ? [] : [`${cms[0]} ÷ ${k} n'est pas entier`])];
}

// ─── agrandissement_aire ────────────────────────────────────────────────────

/** Longueurs × k : l'aire × k² (QCM). */
function corrigerFacteurAire(q: Q): string[] {
  const k = rapport(q.text) ?? Number(q.text.match(/(\d+) fois plus long/)?.[1]);
  if (!k) return ["rapport illisible"];
  const juste = k * k;
  return [...(num(q.expected[0]) === juste ? [] : [`attendu « ${q.expected[0]} », le texte donne ${juste}`]), ...qcmUnique(q, (c) => num(c) === juste)];
}

/** Une aire et un rapport k : la nouvelle aire. */
function corrigerAire(q: Q): string[] {
  const k = rapport(q.text);
  const u = q.text.match(/\d (cm²|m²)/)?.[1];
  if (!k || !u) return ["rapport ou unité d'aire illisibles"];
  const aires = mesures(q.text, u);
  if (aires.length !== 1) return [`une aire attendue, lues : ${aires.join(", ")}`];
  return verifierReponse(q, aires[0] * k * k, u);
}

/** L'aire multipliée par K : le rapport des longueurs, racine de K (QCM). */
function corrigerRetrouverK(q: Q): string[] {
  let K = Number(q.text.match(/multipliée par (\d+)|multiplié par (\d+)|(\d+) fois plus de surface/)?.slice(1).find(Boolean));
  if (!K) {
    const u = q.text.match(/\d (cm²|m²)/)?.[1];
    const aires = u ? mesures(q.text, u) : [];
    if (aires.length !== 2) return ["facteur des aires illisible"];
    K = aires[1] / aires[0];
  }
  const juste = Math.sqrt(K);
  if (!entier(juste)) return [`${K} n'est pas un carré parfait`];
  return [...(Number(q.expected[0]) === juste ? [] : [`attendu « ${q.expected[0]} », le texte donne ${juste}`]), ...qcmUnique(q, (c) => Number(c) === juste)];
}

// ─── agrandissement_volume ──────────────────────────────────────────────────

/** Un volume en cm³ et un rapport k : le nouveau volume. */
function corrigerVolume(q: Q): string[] {
  const k = rapport(q.text);
  const vs = mesures(q.text, "cm³");
  if (!k || vs.length !== 1) return [`rapport ou volume illisibles (k = ${k}, ${vs})`];
  const p = verifierReponse(q, vs[0] * k ** 3, "cm³");
  const rows = (q.canvas as { rows?: { values: string[] }[] } | undefined)?.rows;
  if (rows && rows.map((r) => r.values[1]).join("|") !== `× ${k}|× ${k * k}|× ${k ** 3}`) p.push("le tableau ne montre pas k, k², k³");
  return p;
}

/** Une maquette et le vrai réservoir : contenances × k³ ou ÷ k³ (QCM). */
function corrigerMaquette(q: Q): string[] {
  const vs = mesures(q.text, "L");
  const inverse = /maquette est (\d+) fois plus petite/.exec(q.text);
  const k = inverse ? Number(inverse[1]) : Number(q.text.match(/(\d+) fois plus grande?|au 1\/(\d+)/)?.slice(1).find(Boolean));
  if (!k || vs.length !== 1) return [`rapport ou contenance illisibles (k = ${k}, ${vs})`];
  const { pb } = echelles(q.text);
  const juste = inverse ? vs[0] / k ** 3 : vs[0] * k ** 3;
  const lire = (c: string) => {
    const m = lireMesure(c);
    return m && m.u === "L" ? m.v : NaN;
  };
  return [...pb, ...(egal(lire(q.expected[0]), juste) ? [] : [`attendu « ${q.expected[0]} », le texte donne ${juste} L`]), ...qcmUnique(q, (c) => egal(lire(c), juste))];
}

// ─── echelle_defi ───────────────────────────────────────────────────────────

/** Une distance réelle en km et sa mesure en cm : le dénominateur de l'échelle. */
function corrigerDenominateur(q: Q): string[] {
  const kms = mesures(q.text, "km");
  const cms = mesures(q.text, "cm");
  if (kms.length !== 1 || cms.length !== 1) return [`une distance en km et une en cm attendues (lues : ${kms}, ${cms})`];
  const juste = (kms[0] * 100000) / cms[0];
  const p: string[] = [];
  if (!entier(juste)) p.push(`dénominateur non entier : ${juste}`);
  if (!q.expected.some((e) => num(e) === juste) || num(q.expected[0]) !== juste) p.push(`attendu « ${q.expected[0]} », le texte donne ${juste}`);
  if (q.comparator !== "number_equal") p.push("comparateur");
  return p;
}

/** Une aire annoncée × k au lieu de × k² : le verdict juste (QCM). */
function corrigerVraisemblance(q: Q): string[] {
  const k = rapport(q.text);
  const u = q.text.match(/\d (cm²|m²)/)?.[1];
  if (!k || !u) return ["rapport ou unité illisibles"];
  // « … de 30 à 120 cm² » : la première aire est celle de départ, la seconde l'annonce.
  const nbs = [...q.text.matchAll(new RegExp(`${NB}(?: ${u})?(?=[ ,.)?]| ?$)`, "g"))].map((m) => num(m[1])).filter((x) => x !== k);
  if (nbs.length !== 2) return [`deux aires attendues, lues : ${nbs.join(", ")}`];
  const [depart, annonce] = nbs;
  const vrai = depart * k * k;
  const p: string[] = [];
  if (annonce === vrai) p.push("l'aire annoncée est juste : le verdict « non » serait faux");
  const juste = (c: string) => {
    if (/^oui/.test(c)) return annonce === vrai;
    const m = c.match(new RegExp(`^non : l'aire vaut ${NB} ${u}$`));
    return !!m && num(m[1]) === vrai;
  };
  p.push(...qcmUnique(q, juste));
  return p;
}

/** Une quantité pour couvrir une surface, longueurs × k : la quantité × k². */
function corrigerCouvrir(q: Q): string[] {
  const k = rapport(q.text);
  const n = Number(q.text.match(/^(?:Il faut|On a utilisé|Pour [^,]+,) (\d+)|demande (\d+)/)?.slice(1).find(Boolean));
  if (!k || !n) return [`rapport ou quantité illisibles (k = ${k}, n = ${n})`];
  const u = /\d+ litres/.test(q.text) ? "L" : /\d+ kilos/.test(q.text) ? "kg" : "";
  const p: string[] = [];
  const e = lireMesure(q.expected[0]);
  if (!e || e.v !== n * k * k) p.push(`attendu « ${q.expected[0]} », le texte donne ${n * k * k}`);
  if ((e?.u ?? "") !== u) p.push(`unité « ${e?.u} » au lieu de « ${u} »`);
  return p;
}

const CORRIGER: CorrecteursMaths = {
  "4e_echelle_comprendre_tpl_1_lire": corrigerLire,
  "4e_echelle_comprendre_tpl_2_comparer": corrigerComparer,
  "4e_echelle_distance_reelle_tpl_1": corrigerVersReel,
  "4e_echelle_distance_reelle_tpl_2_km": corrigerVersReelKm,
  "4e_echelle_distance_plan_tpl_1": corrigerVersPlan,
  "4e_echelle_distance_plan_tpl_2_choisir": corrigerChoisir,
  "4e_agrandissement_rapport_tpl_1_longueurs": corrigerLongueurs,
  "4e_agrandissement_rapport_tpl_2_trouver_k": corrigerTrouverK,
  "4e_agrandissement_rapport_tpl_3_reduction": corrigerReduction,
  "4e_agrandissement_aire_tpl_3_facteur": corrigerFacteurAire,
  "4e_agrandissement_aire_tpl_1_calculer": corrigerAire,
  "4e_agrandissement_aire_tpl_2_retrouver_k": corrigerRetrouverK,
  "4e_agrandissement_volume_tpl_1": corrigerVolume,
  "4e_agrandissement_volume_tpl_2_maquette": corrigerMaquette,
  "4e_echelle_defi_tpl_1_carte_reunion": corrigerDenominateur,
  "4e_echelle_defi_tpl_2_vraisemblance": corrigerVraisemblance,
  "4e_echelle_defi_tpl_3_peinture": corrigerCouvrir,
};

export const CORRECTEURS: CorrecteursMaths = avecRegleMotsCles(
  Object.fromEntries(Object.entries(CORRIGER).map(([id, f]) => [id, (q: Q) => f(normaliser(q))])),
);
