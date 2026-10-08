import type { CorrecteursMaths } from "./types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { avecRegleMotsCles, egal, qcmUnique } from "@/lib/tutor-v4/questionBank/6e/maths/correcteurs/pourcentages";

// LES CORRECTEURS DE grandeurs.bank.ts (notion grandeur_composee, 08/10/2026).
// Ils relisent dans le TEXTE les mesures et leurs unités (« 135 km », « 3 heures »,
// « 2,5 kW », « 1 200 L/h », « 7,8 g/cm³ »), puis REFONT le calcul sans passer
// par le gabarit : l'unité d'un produit ou d'un quotient se calcule (m × m = m²,
// kW × h = kWh, km ÷ h = km/h), les conversions se refont par facteurs
// (km/h ↔ m/s par 3,6 ; g/cm³ ↔ kg/m³ par 1 000 ; m² → cm² par 100 × 100), les
// contrôles de cohérence se jugent avec une table de bon sens propre au
// correcteur. Vide = juste.

type Q = TutorGeneratedQuestionV4;

/* ───────────────────────── lecture des nombres et des unités ───────────────────────── */

/** « 10 000 », « 2,5 », « 12 » : comme les gabarits écrivent les nombres. */
export const NB = "(\\d{1,3}(?:[ \\u00a0\\u202f]\\d{3})+(?:,\\d+)?|\\d+(?:,\\d+)?)";
export const num = (s: string) => Number(String(s).replace(/[   ]/g, "").replace(",", "."));
export const entier = (x: number) => Math.abs(x - Math.round(x)) < 1e-9;
/** Arrondi qui efface les poussières du calcul flottant. */
export const net = (x: number) => Math.round(x * 1e6) / 1e6;
/** 10000 → « 10 000 », 2.5 → « 2,5 ». */
export const frN = (n: number) => {
  const x = net(n);
  return Number.isInteger(x) ? x.toLocaleString("fr-FR").replace(/[  ]/g, " ") : String(x).replace(".", ",");
};

/** Les unités écrites après un nombre ; les mots deviennent des symboles. */
const ALIAS: Record<string, string> = {
  heures: "h", heure: "h", minutes: "min", minute: "min", secondes: "s", seconde: "s",
  jours: "j", jour: "j", semaines: "semaine", fois: "battements", habitants: "hab",
};
const UNITES = [
  "battements/min", "pages/min", "hab/km²", "kWh/100 km", "L/100 km", "kWh/j", "m²/min", "cm/min",
  "kg/semaine", "baguettes/h", "cm³/g", "km²/hab", "kW/h", "kg/€", "s/m", "h/€", "h/km", "min/L", "g/cm³", "kg/m³", "km/h", "m/s", "L/min", "L/h", "m³/h", "€/kg", "€/L",
  "€/m²", "€/m", "€/h", "t/ha", "cm/j", "Mo/s", "kWh", "kW", "km²", "km", "m²", "m³", "cm²", "cm³", "cm",
  "dm²", "dm³", "dm", "mm²", "mm³", "mm", "mg", "kg", "g", "t", "ha", "mL", "cL", "L", "min", "h", "s",
  "j", "Mo", "€", "m", "heures", "heure", "minutes", "minute", "secondes", "seconde", "jours", "jour",
  "semaines", "fois", "habitants", "hab", "pages", "baguettes", "battements",
].sort((a, b) => b.length - a.length);
const echap = (s: string) => s.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&");
export const RE_UNITE = `(${UNITES.map(echap).join("|")})(?![\\p{L}\\d²³/])`;

export type Mesure = { v: number; u: string; i: number };

/** Les « nombre unité » d'un texte, dans l'ordre. */
export function mesures(t: string): Mesure[] {
  return [...t.matchAll(new RegExp(`(?<![\\d,])${NB} ?${RE_UNITE}`, "gu"))].map((m) => ({
    v: num(m[1]),
    u: ALIAS[m[2]] ?? m[2],
    i: m.index!,
  }));
}

/** Tous les nombres d'un texte, dans l'ordre. */
export const nombres = (t: string) => [...t.matchAll(new RegExp(`(?<![\\d,])${NB}`, "g"))].map((m) => num(m[1]));

/** « 2,7 g/cm³ » → { v: 2.7, u: "g/cm³" } ; « 160 » → { v: 160, u: "" }. */
export function lireReponse(s: string): { v: number; u: string } | null {
  const m = String(s).trim().match(new RegExp(`^${NB}(?: (.+))?$`));
  return m ? { v: num(m[1]), u: (m[2] ?? "").trim() } : null;
}

/** La réponse attendue : la bonne valeur, la bonne unité, deux décimales au plus,
 *  et toutes les écritures admises disent le même nombre. */
export function verifierReponse(q: Q, juste: number, u: string): string[] {
  const p: string[] = [];
  const e = lireReponse(String(q.expected[0]));
  if (!e || !egal(net(e.v), net(juste))) p.push(`attendu « ${q.expected[0]} », le texte donne ${frN(juste)} ${u}`);
  else if (e.u !== u) p.push(`unité de la réponse « ${e.u} » au lieu de « ${u} »`);
  if (!entier(net(juste) * 100)) p.push(`${juste} : plus de deux décimales`);
  for (const x of q.expected) {
    const r = lireReponse(String(x));
    if (!r || !egal(net(r.v), net(juste))) p.push(`écriture admise « ${x} » ≠ ${frN(juste)}`);
  }
  return p;
}

/** Une proposition « 15 m² » vaut-elle (v, u) ? */
export const memeMesure = (c: string, v: number, u: string) => {
  const r = lireReponse(c);
  return !!r && egal(net(r.v), net(v)) && r.u === u;
};

/* ───────────────────────── l'algèbre des unités ───────────────────────── */

const LONGUEURS = ["km", "m", "dm", "cm", "mm"];
/** L'unité d'un PRODUIT : m × m = m², m² × m = m³, kW × h = kWh, km/h × h = km, €/kg × kg = €. */
export function produitUnites(a: string, b: string): string | null {
  for (const [x, y] of [[a, b], [b, a]]) {
    if (LONGUEURS.includes(x) && y === x) return `${x}²`;
    if (LONGUEURS.includes(y) && x === `${y}²`) return `${y}³`;
    if (x === "kW" && y === "h") return "kWh";
    if (x.includes("/") && x.split("/")[1] === y) return x.split("/")[0];
  }
  return null;
}

/** Les mots d'une unité : « km » → kilomètre(s). */
const NOMS: Record<string, [string, string]> = {
  km: ["kilomètre", "kilomètres"], h: ["heure", "heures"], m: ["mètre", "mètres"], s: ["seconde", "secondes"],
  L: ["litre", "litres"], min: ["minute", "minutes"], "m³": ["mètre cube", "mètres cubes"], "€": ["euro", "euros"],
  kg: ["kilogramme", "kilogrammes"], "100 km": ["centaine de kilomètres", "centaines de kilomètres"],
  g: ["gramme", "grammes"], "cm³": ["centimètre cube", "centimètres cubes"], t: ["tonne", "tonnes"],
  ha: ["hectare", "hectares"], hab: ["habitant", "habitants"], "km²": ["kilomètre carré", "kilomètres carrés"],
  pages: ["page", "pages"], battements: ["battement", "battements"], cm: ["centimètre", "centimètres"],
  j: ["jour", "jours"], Mo: ["mégaoctet", "mégaoctets"], "m²": ["mètre carré", "mètres carrés"],
  kW: ["kilowatt", "kilowatts"], "km/h": ["km/h", "km/h"],
};
/** « des kilomètres » → « km ». */
function symboleDe(gn: string): string | null {
  const nom = gn.replace(/^des /, "").trim();
  for (const [sym, [, p]] of Object.entries(NOMS)) if (p === nom) return sym;
  return null;
}

/* ───────────────────────── grandeur_produit ───────────────────────── */

/** « 2,5 € le kilo » → « 2,5 €/kg » : le prix unitaire devient une mesure à unité composée. */
const prixUnitaires = (t: string) =>
  t
    .replace(/€ le mètre carré/g, "€/m²")
    .replace(/€ le kilo/g, "€/kg")
    .replace(/€ le litre/g, "€/L")
    .replace(/€ le mètre/g, "€/m");

/** L'unité DEMANDÉE par l'énoncé (« en kWh », « en euros »), s'il en demande une. */
function uniteDemandee(t: string): string | null {
  const m = [...t.matchAll(new RegExp(`\\ben (euros|${UNITES.map(echap).join("|")})(?![\\p{L}\\d²³/])`, "gu"))];
  if (!m.length) return null;
  const u = m[m.length - 1][1];
  return u === "euros" ? "€" : ALIAS[u] ?? u;
}

/** Les deux mesures d'un produit, leur produit, son unité. */
function lireProduit(t: string): { v: number; u: string; pb: string[] } | null {
  const ms = mesures(prixUnitaires(t));
  if (ms.length !== 2) return null;
  const u = produitUnites(ms[0].u, ms[1].u);
  return u ? { v: net(ms[0].v * ms[1].v), u, pb: [] } : null;
}

function corrigerProduitCalculer(q: Q): string[] {
  const r = lireProduit(q.text);
  if (!r) return [`deux mesures qui se multiplient attendues, lues : ${JSON.stringify(mesures(prixUnitaires(q.text)))}`];
  const dem = uniteDemandee(q.text);
  return [
    ...verifierReponse(q, r.v, r.u),
    ...(dem && dem !== r.u ? [`l'énoncé demande des ${dem}, le produit est en ${r.u}`] : []),
  ];
}

function corrigerProduitUnite(q: Q): string[] {
  // Le calcul est POSÉ dans le texte : « 12 €/m × 2 m », « on multiplie 5 m par 3 m ».
  const m = q.text.match(new RegExp(`${NB} ${RE_UNITE} (?:×|par) ${NB} ${RE_UNITE}`, "u"));
  const u = m ? produitUnites(m[2], m[4]) : null;
  if (!m || !u) return ["le produit posé est illisible"];
  const r = { v: net(num(m[1]) * num(m[3])), u };
  return [
    ...(memeMesure(q.expected[0], r.v, r.u) ? [] : [`attendu « ${q.expected[0]} » au lieu de ${frN(r.v)} ${r.u}`]),
    ...qcmUnique(q, (c) => memeMesure(c, r.v, r.u)),
  ];
}

/** Produit ou quotient : la barre de l'unité trahit la division. */
function corrigerReconnaitre(q: Q): string[] {
  const u = uniteDemandee(q.text);
  if (!u) return ["aucune unité lue dans le texte"];
  const famille = u.includes("/") ? "quotient" : "produit";
  const p = q.expected[0] === `une grandeur ${famille}` ? [] : [`${u} : grandeur ${famille}, attendu « ${q.expected[0]} »`];
  p.push(...qcmUnique(q, (c) => c === `une grandeur ${famille}`));
  const rows = ((q.canvas as any)?.rows ?? []) as { values: string[] }[];
  if (rows.length !== 2) p.push("le tableau doit avoir deux lignes");
  else {
    if (rows[0].values[1] !== u) p.push(`le tableau montre ${rows[0].values[1]} au lieu de ${u}`);
    for (const r of rows) {
      const op = r.values[2];
      if (op !== (r.values[1].includes("/") ? "on divise" : "on multiplie")) p.push(`tableau : ${r.values[1]} avec « ${op} »`);
    }
    if (rows[0].values[1].includes("/") === rows[1].values[1].includes("/")) p.push("le tableau oppose deux grandeurs de la même famille");
  }
  return p;
}

/** « on multiplie l'aire du fond (en m²) par la profondeur (en m) » : le produit des unités doit donner l'unité cherchée. */
function corrigerOperation(q: Q): string[] {
  const u = uniteDemandee(q.text);
  if (!u) return ["aucune unité cherchée lue"];
  const juste = (c: string) => {
    const m = c.match(/^on multiplie .*\(en ([^)]+)\) par .*\(en ([^)]+)\)$/);
    return !!m && produitUnites(m[1], m[2]) === u;
  };
  return [...(juste(q.expected[0]) ? [] : [`« ${q.expected[0]} » ne fabrique pas des ${u}`]), ...qcmUnique(q, juste)];
}

/* ───────────────────────── grandeur_quotient ───────────────────────── */

/** Les unités qui se mettent « en bas » d'un quotient de la vie courante. */
const DENOMINATEURS = ["h", "min", "s", "j", "km²", "cm³", "ha", "semaine"];

/** Le quotient décrit par le texte : numérateur et dénominateur, repérés par leurs unités. */
function lireQuotient(t: string, uCherchee?: string | null): { n: Mesure | number; d: Mesure; u: string } | null {
  const ms = mesures(t);
  if (uCherchee && uCherchee.includes("/")) {
    const [a, b] = uCherchee.split("/");
    const d = ms.filter((m) => m.u === b);
    if (d.length !== 1) return null;
    const n = ms.filter((m) => m.u === a);
    if (n.length === 1) return { n: n[0], d: d[0], u: uCherchee };
    // « pages imprimées : 150 », « nombre de battements : 150 » : le numérateur n'a pas d'unité écrite.
    const autres = nombres(t).filter((x) => x !== d[0].v);
    return autres.length === 1 ? { n: autres[0], d: d[0], u: uCherchee } : null;
  }
  if (ms.length < 2) return null;
  const [m1, m2] = ms;
  const d = DENOMINATEURS.includes(m2.u) ? m2 : DENOMINATEURS.includes(m1.u) ? m1 : null;
  if (!d) return null;
  const n = d === m1 ? m2 : m1;
  return { n, d, u: `${n.u}/${d.u}` };
}
const valeur = (x: Mesure | number) => (typeof x === "number" ? x : x.v);

function corrigerQuotientCalculer(q: Q): string[] {
  const u = uniteDemandee(q.text);
  if (!u || !u.includes("/")) return [`unité cherchée illisible : ${u}`];
  const r = lireQuotient(q.text, u);
  if (!r) return [`numérateur et dénominateur de ${u} introuvables dans le texte`];
  return verifierReponse(q, valeur(r.n) / r.d.v, u);
}

/** « des euros ÷ des litres » pour €/L. */
function corrigerQuotientReconnaitre(q: Q): string[] {
  const u = q.text.match(new RegExp(`(?<![\\p{L}])(${UNITES.filter((x) => x.includes("/")).map(echap).join("|")})`, "u"))?.[1];
  if (!u) return ["aucune unité composée dans le texte"];
  const [a, b] = u.split("/");
  if (!NOMS[a] || !NOMS[b]) return [`unité inconnue du correcteur : ${u}`];
  const juste = `des ${NOMS[a][1]} ÷ des ${NOMS[b][1]}`;
  const p = q.expected[0] === juste ? [] : [`${u} : attendu « ${juste} », pas « ${q.expected[0]} »`];
  p.push(...qcmUnique(q, (c) => c === juste));
  const row = ((q.canvas as any)?.rows ?? [])[0]?.values ?? [];
  if (row[0] !== u || row[2] !== juste || row[1] !== `${NOMS[a][1]} par ${NOMS[b][0]}`)
    p.push(`le tableau ne dit pas ${u} = ${NOMS[a][1]} par ${NOMS[b][0]} : ${row.join(" | ")}`);
  return p;
}

/** « 24 € pour 3 kg » : le prix d'une unité. */
function corrigerPrix(q: Q): string[] {
  const ms = mesures(q.text);
  const eur = ms.filter((m) => m.u === "€");
  const qte = ms.filter((m) => m.u !== "€");
  if (eur.length !== 1 || qte.length !== 1) return [`un prix et une quantité attendus, lus : ${JSON.stringify(ms)}`];
  const dem = uniteDemandee(q.text);
  const u = dem === "€" ? "€" : `€/${qte[0].u}`;
  const p = dem && dem !== u ? [`l'énoncé demande des ${dem}, la quantité est en ${qte[0].u}`] : [];
  return [...p, ...verifierReponse(q, eur[0].v / qte[0].v, u)];
}

/* ───────────────────────── grandeur_unite_composee ───────────────────────── */

/** « on divise des litres par des minutes » → L/min ; « des mètres × des mètres » → m². */
function corrigerTrouverUnite(q: Q): string[] {
  const t = q.text;
  const m =
    t.match(/(divise|divisant|multiplie|multipliant) (des .+?) par (des .+?)(?: pour obtenir|\.)/) ??
    t.match(/= (des .+?) ([÷×]) (des .+?)\./);
  if (!m) return ["opération illisible"];
  const [op, A, B] = m[1].startsWith("des") ? [m[2], m[1], m[3]] : [m[1], m[2], m[3]];
  const a = symboleDe(A);
  const b = symboleDe(B);
  if (!a || !b) return [`unités inconnues : ${A} / ${B}`];
  const juste = /divis|÷/.test(op) ? `${a}/${b}` : produitUnites(a, b);
  if (!juste) return [`produit d'unités inconnu : ${a} × ${b}`];
  return [...(q.expected[0] === juste ? [] : [`attendu « ${q.expected[0]} » au lieu de ${juste}`]), ...qcmUnique(q, (c) => c === juste)];
}

/** « 25 km/h » se dit « 25 kilomètres pour 1 heure ». */
function corrigerInterpreter(q: Q): string[] {
  const m = q.text.match(new RegExp(`${NB} (${UNITES.filter((x) => x.includes("/")).map(echap).join("|")})`));
  if (!m) return ["mesure à unité composée introuvable"];
  const v = num(m[1]);
  const [a, b] = m[2].split("/");
  if (!NOMS[a] || !NOMS[b]) return [`unité inconnue : ${m[2]}`];
  const juste = `${frN(v)} ${v >= 2 ? NOMS[a][1] : NOMS[a][0]} pour 1 ${NOMS[b][0]}`;
  return [...(q.expected[0] === juste ? [] : [`attendu « ${q.expected[0]} » au lieu de « ${juste} »`]), ...qcmUnique(q, (c) => c === juste)];
}

/** « 28 km en 2 h » → 14 km/h : le nombre ET l'unité. */
function corrigerCalculerAvecUnite(q: Q): string[] {
  const r = lireQuotient(q.text);
  if (!r || typeof r.n === "number") return ["les deux mesures du quotient sont introuvables"];
  const v = r.n.v / r.d.v;
  const p: string[] = [];
  const pose = q.text.match(new RegExp(`calcule ${NB} ÷ ${NB}`));
  if (pose && (num(pose[1]) !== r.n.v || num(pose[2]) !== r.d.v)) p.push(`le calcul posé ${pose[1]} ÷ ${pose[2]} ne divise pas ${r.n.v} par ${r.d.v}`);
  if (!memeMesure(q.expected[0], v, r.u)) p.push(`attendu « ${q.expected[0]} » au lieu de ${frN(v)} ${r.u}`);
  p.push(...qcmUnique(q, (c) => memeMesure(c, v, r.u)));
  if (!entier(net(v) * 100)) p.push(`${v} : plus de deux décimales`);
  return p;
}

/* ───────────────────────── grandeur_convertir ───────────────────────── */

/** Chaque unité dans la plus petite de sa famille. */
const FACTEURS: Record<string, [string, number]> = {
  km: ["L", 1e6], m: ["L", 1e3], dm: ["L", 100], cm: ["L", 10], mm: ["L", 1],
  kg: ["M", 1e6], g: ["M", 1e3], mg: ["M", 1],
  L: ["V", 1000], cL: ["V", 10], mL: ["V", 1],
  h: ["T", 3600], min: ["T", 60], s: ["T", 1],
};
const EN_SYMBOLE: Record<string, string> = {
  centimètres: "cm", mètres: "m", millimètres: "mm", grammes: "g", milligrammes: "mg",
  centilitres: "cL", millilitres: "mL", minutes: "min", secondes: "s",
};

function corrigerConvertirSimple(q: Q): string[] {
  const ms = mesures(q.text).map((m) => ({ ...m, u: m.u === "min" && /\bmin\b/.test(q.text) ? "min" : m.u }));
  if (ms.length !== 1) return [`une mesure attendue, lues : ${JSON.stringify(ms)}`];
  const vers = uniteDemandee(q.text.replace(new RegExp(`${NB} ${echap(ms[0].u)}`), "")) ?? EN_SYMBOLE[q.text.match(/de (\p{L}+) \?/u)?.[1] ?? ""];
  if (!vers) return ["unité d'arrivée illisible"];
  const de = ms[0].u;
  if (!FACTEURS[de] || !FACTEURS[vers] || FACTEURS[de][0] !== FACTEURS[vers][0]) return [`conversion impossible : ${de} → ${vers}`];
  return verifierReponse(q, (ms[0].v * FACTEURS[de][1]) / FACTEURS[vers][1], vers);
}

/** L/min ↔ L/h : une heure, c'est 60 minutes. */
function corrigerDebit(q: Q): string[] {
  const t = q.text;
  const parMin = t.match(new RegExp(`${NB} (?:L/min|litres par minute)`));
  const parH = t.match(new RegExp(`${NB} L/h`)) ?? t.match(new RegExp(`En une heure, .*? ${NB} L\\.`));
  if (!!parMin === !!parH) return ["débit de départ illisible"];
  if (parMin) {
    if (!/L\/h|litres par heure|en une heure/.test(t)) return ["la conversion demandée n'est pas en litres par heure"];
    return verifierReponse(q, num(parMin[1]) * 60, "L/h");
  }
  if (!/L\/min|litres par minute|en une minute/.test(t)) return ["la conversion demandée n'est pas en litres par minute"];
  return verifierReponse(q, num(parH![1]) / 60, "L/min");
}

/** km/h ↔ m/s : 1 000 m en 3 600 s, donc un facteur 3,6. */
function corrigerVitesse(q: Q): string[] {
  const t = q.text;
  const kmh = t.match(new RegExp(`${NB} km/h`));
  const ms = t.match(new RegExp(`${NB} (?:m/s|mètres chaque seconde)`));
  if (!!kmh === !!ms) return ["vitesse de départ illisible"];
  if (kmh) {
    if (!/en m\/s|mètres par seconde|en une seconde/.test(t)) return ["la conversion demandée n'est pas en m/s"];
    return verifierReponse(q, (num(kmh[1]) * 1000) / 3600, "m/s");
  }
  if (!/en km\/h|kilomètres par heure/.test(t)) return ["la conversion demandée n'est pas en km/h"];
  return verifierReponse(q, (num(ms![1]) * 3600) / 1000, "km/h");
}

/** m² → cm² : le facteur des longueurs, deux fois (trois pour les volumes). */
function corrigerAire(q: Q): string[] {
  const m = q.text.match(new RegExp(`${NB} (km|m|dm|cm|mm)([²³])`));
  const v = q.text.replace(m?.[0] ?? "", "").match(/(?:en|de) (km|m|dm|cm|mm)([²³])/);
  if (!m || !v) return ["mesure ou unité d'arrivée illisible"];
  if (m[3] !== v[2]) return [`${m[2]}${m[3]} → ${v[1]}${v[2]} : pas la même dimension`];
  const dim = m[3] === "²" ? 2 : 3;
  const f = (FACTEURS[m[2]][1] / FACTEURS[v[1]][1]) ** dim;
  const juste = net(num(m[1]) * f);
  const u = `${v[1]}${v[2]}`;
  return [
    ...(memeMesure(q.expected[0], juste, u) ? [] : [`attendu « ${q.expected[0]} » au lieu de ${frN(juste)} ${u}`]),
    ...qcmUnique(q, (c) => memeMesure(c, juste, u)),
  ];
}

/** g/cm³ ↔ kg/m³ : 1 g/cm³ = 1 000 kg/m³ ; la masse volumique au DIXIÈME (Frédéric). */
function corrigerMasseVolumique(q: Q): string[] {
  const t = q.text;
  const g = t.match(new RegExp(`${NB} g/cm³`)) ?? t.match(new RegExp(`Un centimètre cube .* pèse ${NB} g\\.`));
  const kg = t.match(new RegExp(`${NB} kg/m³`)) ?? t.match(new RegExp(`Un mètre cube .* pèse ${NB} kg\\.`));
  if (!!g === !!kg) return ["masse volumique de départ illisible"];
  const enG = g ? num(g[1]) : num(kg![1]) / 1000;
  const p = entier(net(enG * 10)) ? [] : [`masse volumique ${frN(enG)} g/cm³ : pas au dixième`];
  if (g) {
    if (!/en kg\/m³/.test(t)) return ["la conversion demandée n'est pas en kg/m³"];
    return [...p, ...verifierReponse(q, enG * 1000, "kg/m³")];
  }
  if (!/en g\/cm³/.test(t)) return ["la conversion demandée n'est pas en g/cm³"];
  return [...p, ...verifierReponse(q, enG, "g/cm³")];
}

/* ───────────────────────── grandeur_coherence ───────────────────────── */

/** Ce qu'on mesure (d'après les mots du texte) et les unités qui lui conviennent. */
const FAMILLES: [RegExp, string[]][] = [
  [/masse volumique/, ["g/cm³", "kg/m³"]],
  [/densité/, ["hab/km²"]],
  [/salaire horaire/, ["€/h"]],
  [/prix .*au kilo/, ["€/kg"]],
  [/vitesse/, ["km/h", "m/s"]],
  [/débit/, ["L/min", "L/h", "m³/h"]],
  [/énergie/, ["kWh"]],
  [/\baire\b/, ["mm²", "cm²", "dm²", "m²", "km²", "ha"]],
  [/volume|contenance/, ["mm³", "cm³", "dm³", "m³", "L", "cL", "mL"]],
  [/durée/, ["h", "min", "s"]],
  [/périmètre|longueur|hauteur|taille|distance/, ["mm", "cm", "dm", "m", "km"]],
  [/\bmasse\b/, ["g", "kg", "t"]],
];
const unitesConvenables = (t: string) => FAMILLES.find(([re]) => re.test(t))?.[1] ?? null;

function corrigerUniteImpossible(q: Q): string[] {
  const ok = unitesConvenables(q.text);
  const ms = mesures(q.text);
  if (!ok || ms.length !== 1) return [`grandeur ou résultat illisible (${JSON.stringify(ms)})`];
  const juste = "non : ce n'est pas la bonne unité";
  if (ok.includes(ms[0].u)) return [`${ms[0].u} convient pourtant à cette grandeur`];
  return [...(q.expected[0] === juste ? [] : [`attendu « ${q.expected[0]} »`]), ...qcmUnique(q, (c) => c === juste)];
}

function corrigerChoisirUnite(q: Q): string[] {
  const ok = unitesConvenables(q.text);
  if (!ok) return ["grandeur illisible"];
  return [...(ok.includes(q.expected[0]) ? [] : [`« ${q.expected[0]} » ne convient pas`]), ...qcmUnique(q, (c) => ok.includes(c))];
}

/** Ce qui est PLAUSIBLE, dans l'unité de base de chaque famille (m, kg, m², L, min, €…). */
const BASE: Record<string, number> = {
  mm: 0.001, cm: 0.01, m: 1, km: 1000, g: 0.001, kg: 1, t: 1000, "cm²": 1e-4, "m²": 1, L: 1, cL: 0.01, "m³": 1000,
  min: 1, h: 60, "km/h": 1, "€": 1, "L/100 km": 1, "L/min": 1, "g/cm³": 1, kWh: 1,
};
const PLAUSIBLE: [RegExp, number, number][] = [
  [/vitesse d'un cycliste/, 10, 50], [/masse d'une pomme/, 0.08, 0.4], [/aire d'une salle de classe/, 30, 120],
  [/bouteille d'eau/, 0.25, 2], [/hauteur d'une porte/, 1.8, 3], [/vitesse d'un piéton/, 3, 7],
  [/éléphant/, 2000, 8000], [/match de football/, 80, 120], [/baguette/, 0.8, 2], [/consommation d'une voiture/, 3, 12],
  [/robinet de cuisine/, 5, 20], [/masse volumique de l'eau/, 0.99, 1.01], [/taille d'un élève/, 1.3, 1.9],
  [/aire d'un timbre/, 2e-4, 2e-3], [/vitesse d'un TGV/, 200, 350], [/piscine municipale/, 2e5, 3e6],
  [/Paris et Marseille/, 650e3, 900e3], [/bouilloire/, 0.02, 0.2],
];
function enBase(s: string): number | null {
  const r = lireReponse(s.replace(/[  ]/g, " "));
  if (!r || BASE[r.u] == null) return null;
  return r.v * BASE[r.u];
}

function corrigerOrdre(q: Q): string[] {
  const borne = PLAUSIBLE.find(([re]) => re.test(q.text));
  if (!borne) return ["objet inconnu de la table de bon sens"];
  const [, mini, maxi] = borne;
  const faux = q.text.match(new RegExp(`(?:: |c'est |trouve |= )(${NB} ${RE_UNITE.replace("(?![\\p{L}\\d²³/])", "")})`, "u"));
  const vrai = String(q.expected[0]).match(/^non : (.+) serait plausible$/)?.[1];
  if (!faux || !vrai) return ["valeur annoncée ou valeur plausible illisible"];
  const f = enBase(faux[1]);
  const v = enBase(vrai);
  if (f == null || v == null) return [`unités inconnues : ${faux[1]} / ${vrai}`];
  const p: string[] = [];
  if (f >= mini && f <= maxi) p.push(`${faux[1]} est pourtant plausible`);
  if (v < mini || v > maxi) p.push(`${vrai} n'est pas plausible`);
  const sens = f > maxi ? "grand" : "petit";
  p.push(...qcmUnique(q, (c) => c === q.expected[0] || c === `non : ${faux[1]} est trop ${sens}`));
  return p;
}

/** d ÷ n au lieu de n ÷ d : l'unité est celle du dividende sur celle du diviseur. */
function corrigerDivisionInversee(q: Q): string[] {
  const t = q.text;
  const ms = mesures(t);
  const pose = t.match(new RegExp(`${NB} ÷ ${NB}`));
  const dit = t.match(new RegExp(`divise ${NB} ${RE_UNITE} par ${NB} ${RE_UNITE}`, "u"));
  let ua: string | undefined;
  let ub: string | undefined;
  if (dit) [ua, ub] = [ALIAS[dit[2]] ?? dit[2], ALIAS[dit[4]] ?? dit[4]];
  else if (pose) {
    ua = ms.find((m) => m.v === num(pose[1]))?.u;
    ub = ms.find((m) => m.v === num(pose[2]))?.u;
  }
  if (!ua || !ub) return ["calcul de l'élève illisible"];
  // « min/page » : le dénominateur au singulier.
  const sing = (u: string) => u.replace(/^(pages|battements)$/, (x) => x.slice(0, -1));
  const juste = `${ua}/${sing(ub)}`;
  const egaux = (c: string) => c === juste || c === `${ua}/${ub}`;
  const p = egaux(q.expected[0]) ? [] : [`${ua} ÷ ${ub} donne ${juste}, pas « ${q.expected[0]} »`];
  if (!DENOMINATEURS.includes(ua)) p.push(`${ua} ÷ ${ub} n'est pas une division retournée`);
  return [...p, ...qcmUnique(q, egaux)];
}

/* ───────────────────────── grandeur_defi ───────────────────────── */

/** n1 pour d1, donc pour d2 : n1 × d2 ÷ d1 (le quotient, puis le produit). */
function corrigerDeuxTemps(q: Q): string[] {
  const xs = nombres(q.text);
  const ms = mesures(q.text);
  if (xs.length !== 3 || !ms.length) return [`trois nombres attendus, lus : ${xs.join(", ")}`];
  const [n1, d1, d2] = xs;
  if (ms[0].v !== n1) return ["la première donnée n'a pas d'unité"];
  return verifierReponse(q, (n1 * d2) / d1, ms[0].u);
}

/** Deux offres : le prix d'une unité, le plus bas gagne. */
function corrigerComparerPrix(q: Q): string[] {
  const t = q.text;
  const lab = [...t.matchAll(/(l'étal|le magasin|la boutique|le site|la coopérative) ([AB])\b/gi)];
  const posB = lab.find((m) => m[2] === "B")?.index;
  if (posB == null) return ["offre B introuvable"];
  const offre = (s: string) => {
    const ms = mesures(s);
    const e = ms.filter((m) => m.u === "€");
    const k = ms.filter((m) => m.u !== "€");
    return e.length === 1 && k.length === 1 ? { t: e[0].v, k: k[0].v, u: k[0].u, pu: e[0].v / k[0].v } : null;
  };
  const A = offre(t.slice(0, posB));
  const B = offre(t.slice(posB));
  if (!A || !B) return ["prix ou quantité d'une offre illisible"];
  if (A.u !== B.u) return [`unités différentes : ${A.u} / ${B.u}`];
  if (egal(A.pu, B.pu)) return ["les deux offres ont le même prix unitaire"];
  const lettre = A.pu < B.pu ? "A" : "B";
  const p = new RegExp(` ${lettre}$`).test(q.expected[0]) ? [] : [`offre ${lettre} moins chère, attendu « ${q.expected[0]} »`];
  p.push(...qcmUnique(q, (c) => new RegExp(` ${lettre}$`).test(c)));
  const rows = ((q.canvas as any)?.rows ?? []) as { values: string[] }[];
  const vus = rows.map((r) => r.values.slice(1).join(" | "));
  const voulus = [A, B].map((o) => `${frN(o.t)} € | ${frN(o.k)} ${o.u} | ${frN(o.pu)}`);
  if (vus.join(" ; ") !== voulus.join(" ; ")) p.push(`tableau : ${vus.join(" ; ")} au lieu de ${voulus.join(" ; ")}`);
  return p;
}

/** Des carreaux de c cm sur une surface de L m sur l m : rangée par rangée. */
function corrigerCarrelage(q: Q): string[] {
  const ms = mesures(q.text);
  const m = ms.filter((x) => x.u === "m");
  const c = ms.filter((x) => x.u === "cm");
  if (m.length !== 2 || c.length !== 1) return [`deux longueurs en m et un côté en cm attendus : ${JSON.stringify(ms)}`];
  const a = (m[0].v * 100) / c[0].v;
  const b = (m[1].v * 100) / c[0].v;
  if (!entier(a) || !entier(b)) return [`le carreau de ${c[0].v} cm ne tombe pas juste sur ${m[0].v} m × ${m[1].v} m`];
  return verifierReponse(q, Math.round(a) * Math.round(b), "");
}

/** Durée = distance ÷ vitesse, en minutes. */
function corrigerDuree(q: Q): string[] {
  const ms = mesures(q.text);
  const d = ms.filter((m) => m.u === "km");
  const v = ms.filter((m) => m.u === "km/h");
  if (d.length !== 1 || v.length !== 1) return ["une distance et une vitesse attendues"];
  const mn = (d[0].v / v[0].v) * 60;
  return [...(entier(mn) ? [] : [`${mn} min : pas un nombre entier de minutes`]), ...verifierReponse(q, mn, "min")];
}

export const CORRECTEURS: CorrecteursMaths = avecRegleMotsCles({
  "4e_grandeur_produit_tpl_1_reconnaitre": corrigerReconnaitre,
  "4e_grandeur_produit_tpl_3_operation": corrigerOperation,
  "4e_grandeur_produit_tpl_2_calculer": corrigerProduitCalculer,
  "4e_grandeur_produit_tpl_4_unite_resultat": corrigerProduitUnite,
  "4e_grandeur_quotient_tpl_1_calculer": corrigerQuotientCalculer,
  "4e_grandeur_quotient_tpl_2_reconnaitre": corrigerQuotientReconnaitre,
  "4e_grandeur_quotient_tpl_3_prix": corrigerPrix,
  "4e_grandeur_unite_composee_tpl_1_trouver": corrigerTrouverUnite,
  "4e_grandeur_unite_composee_tpl_2_interpreter": corrigerInterpreter,
  "4e_grandeur_unite_composee_tpl_3_calculer_avec_unite": corrigerCalculerAvecUnite,
  "4e_grandeur_convertir_tpl_1_longueur": corrigerConvertirSimple,
  "4e_grandeur_convertir_tpl_3_debit": corrigerDebit,
  "4e_grandeur_convertir_tpl_4_vitesse": corrigerVitesse,
  "4e_grandeur_convertir_tpl_2_aire": corrigerAire,
  "4e_grandeur_convertir_tpl_5_masse_volumique": corrigerMasseVolumique,
  "4e_grandeur_coherence_tpl_1_unite_impossible": corrigerUniteImpossible,
  "4e_grandeur_coherence_tpl_3_choisir_unite": corrigerChoisirUnite,
  "4e_grandeur_coherence_tpl_2_ordre": corrigerOrdre,
  "4e_grandeur_coherence_tpl_4_division_inversee": corrigerDivisionInversee,
  "4e_grandeur_defi_tpl_1_debit": corrigerDeuxTemps,
  "4e_grandeur_defi_tpl_2_comparer_prix": corrigerComparerPrix,
  "4e_grandeur_defi_tpl_3_carrelage": corrigerCarrelage,
  "4e_grandeur_defi_tpl_4_duree": corrigerDuree,
});
