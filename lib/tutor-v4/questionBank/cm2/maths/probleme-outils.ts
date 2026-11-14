// lib/tutor-v4/questionBank/cm2/maths/probleme-outils.ts
//
// Les OUTILS des problèmes du CM2 (14/11/2026) : les mots, les situations, les
// nombres, les dessins, et les fabricants de problèmes à une ou plusieurs
// étapes. Même architecture que `cm1/maths/problemes.bank.ts`, au niveau CM2 :
//   - de grands nombres (jusqu'aux centaines de milliers) ;
//   - des décimaux : prix (12,35 €), longueurs (4,75 m), distances (12,5 km),
//     masses (2,5 kg), contenances (1,5 L) ;
//   - la division à quotient décimal (7 ÷ 4 = 1,75), le diviseur à deux chiffres ;
//   - les durées (heure de fin, durée entre deux instants, enchaînements).
// ⛔ Le dessin porte les DONNÉES, jamais la réponse (« ? » à la place).
// ⛔ `schema_barre` lit un nombre dans `value` : une expression va dans `label`.
// ⛔ CM2 = zéro clavier : QCM de 3-4 choix, leurres = vraies erreurs d'élève
//    (mauvaise opération, virgules mal alignées, retenue des centimes oubliée,
//    reste écrit après la virgule, minutes non converties, étape oubliée).
// ⛔ Division : « ÷ ». Soustraction : « − ». La Réunion ≈ 3 % des tirages.

import type { CalculPoseCanvasData, DureeCanvasData, MonnaieCanvasData, SchemaBarreCanvasData } from "@/lib/tutor-v4/types_canvas";
import { cap, entre, fr, qcm, un } from "../../cm1/maths/trous-outils";

export { cap, entre, fr, melange, qcm, un } from "../../cm1/maths/trous-outils";

export function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return `Définition : ${definition}\n\nMéthode : ${methode}\n\nCalcul : ${calcul}\n\nConclusion : ${conclusion}`;
}

/* ───────────────────────── Les mots ───────────────────────── */

const VOY = /^[aeiouàâéèêëîïôûœh]/i;
/** « de baguettes », « d'œufs ». */
export const de = (m: string) => (VOY.test(m) ? `d'${m}` : `de ${m}`);
/** « que Tom », « qu'Inès ». */
export const que = (nom: string) => (/^[AEIOUÉ]/.test(nom) ? `qu'${nom}` : `que ${nom}`);
/** « vend-elle », « accueille-t-il », « fait-il imprimer ». */
export function inv(verbe: string, il: string) {
  const [w, ...r] = verbe.split(" ");
  return [`${w}${/[ae]$/.test(w) ? "-t-" : "-"}${il}`, ...r].join(" ");
}
/** « au marché », « à la papeterie », « à l'épicerie ». */
export const au = (lieu: string) => (lieu.startsWith("le ") ? `au ${lieu.slice(3)}` : `à ${lieu}`);
export const peut = (p: number) => Math.random() < p;

export type Il = "il" | "elle";
export type Qui = { s: string; il: Il };
const NOMS_F = ["Nina", "Zoé", "Lou", "Inès", "Jade", "Maya", "Lina", "Emma", "Léa", "Sarah", "Chloé", "Aya", "Rose", "Mila", "Sofia", "Nora"];
const NOMS_M = ["Téo", "Ravi", "Malo", "Sacha", "Amir", "Tom", "Yanis", "Noé", "Lucas", "Karim", "Hugo", "Enzo", "Bilal", "Jules", "Malik", "Adam"];
export function prenom(sauf?: string): Qui {
  const f = peut(0.5);
  const s = un((f ? NOMS_F : NOMS_M).filter((n) => n !== sauf));
  return { s, il: f ? "elle" : "il" };
}

/** La Réunion à part : environ 3 % des tirages, jamais par défaut. */
export function tirer<T extends { reu?: boolean }>(l: readonly T[]): T {
  const r = l.filter((x) => x.reu);
  const n = l.filter((x) => !x.reu);
  return r.length && peut(0.03) ? un(r) : un(n);
}

/* ───────────────────────── Les nombres ───────────────────────── */

export const r2 = (x: number) => Math.round(x * 100) / 100;
/** Un prix : « 12,50 », « 7 », « 1 250,05 ». */
export const eu = (n: number) => {
  const c = Math.round(n * 100);
  const e = Math.floor(c / 100);
  const k = c % 100;
  return k === 0 ? fr(e) : `${fr(e)},${String(k).padStart(2, "0")}`;
};
/** Une heure (minutes depuis minuit) : « 14 h 05 ». */
export const heure = (m: number) => `${Math.floor(m / 60) % 24} h ${String(m % 60).padStart(2, "0")}`;
/** Une durée (en minutes) : « 45 min », « 2 h », « 1 h 35 min ». */
export const duree = (m: number) => (m < 60 ? `${m} min` : m % 60 === 0 ? `${m / 60} h` : `${Math.floor(m / 60)} h ${m % 60} min`);
/** Un prix tiré au pas de 5 centimes. */
export const prix = ([a, b]: readonly [number, number]) => (entre(Math.ceil(Math.round(a * 100) / 5), Math.floor(Math.round(b * 100) / 5)) * 5) / 100;

const MESURES = new Set(["€", "km", "m", "kg", "L"]);
const TEMPS = new Set(["h", "durée"]);
/** Le nombre écrit, sans unité. */
export const F = (v: number, u: string) => (u === "€" ? eu(v) : u === "h" ? heure(v) : u === "durée" ? duree(v) : fr(r2(v)));
/** Le nombre écrit, avec son unité. */
export const Q = (v: number, u: string) => (TEMPS.has(u) ? F(v, u) : `${F(v, u)} ${u}`);
export const ec = (x: number, s: string, y: number, u = "") => `${F(x, u)} ${s} ${F(y, u)}`;
/** L'unité qu'un élève écrit à la place de la bonne. */
export const AUTRE_UNITE: Record<string, string> = { "€": "centimes", km: "m", m: "cm", kg: "g", L: "mL" };

/**
 * QCM de nombres avec l'unité. Leurres distincts en VALEUR ; jamais « 1 baguettes » ;
 * complétés par des voisins s'il en manque. `extra` : un leurre écrit (« 15 h 85 »).
 */
export function choixN(juste: number, faux: number[], u: string, extra: string[] = []) {
  const j = r2(juste);
  const temps = TEMPS.has(u);
  const entier = temps || (!MESURES.has(u) && Number.isInteger(j));
  const ok: number[] = [];
  const bon = (v: number) => {
    const w = r2(v);
    return Number.isFinite(w) && w > 0 && w !== j && !ok.includes(w) && (!entier || (Number.isInteger(w) && (temps || w >= 2)));
  };
  const ecrits = extra.filter((e) => e !== Q(j, u)).slice(0, 1);
  const place = () => ok.length + ecrits.length < 3;
  for (const v of faux) if (bon(v) && place()) ok.push(r2(v));
  const pas = temps ? 10 : !Number.isInteger(j) ? (j >= 20 ? 1 : 0.1) : j >= 10000 ? 1000 : j >= 1000 ? 100 : j >= 100 ? 10 : 1;
  for (let k = 1; place() && k < 40; k++) for (const v of [j + k * pas, j - k * pas]) if (bon(v) && place()) ok.push(r2(v));
  return qcm(Q(j, u), [...ecrits, ...ok.map((v) => Q(v, u))]);
}

const chiffres = (n: number) => String(n).split("").reverse().map(Number);
/** L'addition posée sans les retenues : 4 763 + 2 548 → 6 201. */
export function sansRetenue(a: number, b: number) {
  const A = chiffres(a);
  const B = chiffres(b);
  return Number(Array.from({ length: Math.max(A.length, B.length) }, (_, i) => ((A[i] ?? 0) + (B[i] ?? 0)) % 10).reverse().join(""));
}
/** La soustraction « le petit chiffre ôté du grand » : 5 213 − 3 846 → 2 633. */
export function ecartChiffres(a: number, b: number) {
  const A = chiffres(a);
  const B = chiffres(b);
  return Number(A.map((x, i) => Math.abs(x - (B[i] ?? 0))).reverse().join(""));
}
const nbDec = (v: number) => {
  const s = String(r2(v));
  const i = s.indexOf(".");
  return i < 0 ? 0 : s.length - i - 1;
};
/** Les virgules mal alignées : 12,5 + 8,75 calculé comme 125 + 875 → 10. */
export function virguleMal(a: number, b: number, op: "+" | "−") {
  const da = nbDec(a);
  const db = nbDec(b);
  if (da === db) return NaN;
  const A = Math.round(a * 10 ** da);
  const B = Math.round(b * 10 ** db);
  return r2((op === "+" ? A + B : Math.abs(A - B)) / 10 ** Math.max(da, db));
}
const cents = (p: number) => Math.round(p * 100) % 100;
/** La retenue des centimes oubliée : 3,75 + 2,50 → 5,25. */
export const centimesSansRetenue = (a: number, b: number) => r2(Math.floor(a) + Math.floor(b) + ((cents(a) + cents(b)) % 100) / 100);
/** Le rendu « euros d'un côté, centimes gardés » : 20 − 13,45 → 7,45. */
export const renduNaif = (B: number, p: number) => r2(B - Math.floor(p) + cents(p) / 100);

/* ───────────────────────── Les dessins ───────────────────────── */

export type Canvas = SchemaBarreCanvasData | CalculPoseCanvasData | MonnaieCanvasData | DureeCanvasData;
type Part = SchemaBarreCanvasData["parts"][number];
export const barre = (parts: Part[], total?: string, title?: string, questionLabel?: string): SchemaBarreCanvasData => ({
  kind: "schema_barre",
  parts,
  ...(total ? { total } : {}),
  ...(title ? { title } : {}),
  ...(questionLabel ? { questionLabel } : {}),
});
export const egales = (n: number, part: Part): Part[] => Array.from({ length: n }, () => ({ ...part }));
/** n groupes égaux : dessinés un par un jusqu'à 8, sinon « … » au milieu. */
export function groupes(n: number, cont: string, k: string | null, total: string, title: string): SchemaBarreCanvasData {
  const part: Part = k === null ? { label: n <= 8 ? "" : cont, unknown: true } : { label: n <= 8 ? "" : cont, value: k };
  if (n <= 8) return barre(egales(n, part), total, title);
  return barre([{ ...part }, { ...part }, { label: `… ${n} en tout` }, { ...part }], total, title);
}
const OPERATION = { "+": "addition", "−": "soustraction", "×": "multiplication", "÷": "division" } as const;
const posF = (v: number, u: string) => (u === "€" && !Number.isInteger(r2(v)) ? eu(v).replace(/\s/g, "") : String(r2(v)).replace(".", ","));
export function pose(x: number, s: "+" | "−" | "×" | "÷", y: number, u = ""): CalculPoseCanvasData {
  if (s === "÷")
    return { kind: "calcul_pose", operation: "division", numbers: [posF(x, u), posF(y, u)], division: { dividende: posF(x, u), diviseur: posF(y, u) }, display: { showResult: false } };
  return { kind: "calcul_pose", operation: OPERATION[s], numbers: [posF(x, u), posF(y, u)], display: { showResult: false, showRetenues: false } };
}
/** Les billets d'une somme ronde. */
export function argent(B: number): MonnaieCanvasData {
  const elements: { valeur: "100e" | "50e" | "20e" | "10e" | "5e" | "2e" | "1e"; nombre?: number }[] = [];
  let r = Math.floor(B);
  for (const v of [100, 50, 20, 10, 5, 2, 1] as const) {
    const n = Math.floor(r / v);
    if (n) elements.push({ valeur: `${v}e`, ...(n > 1 ? { nombre: Math.min(n, 10) } : {}) });
    r -= n * v;
  }
  return { kind: "monnaie", elements };
}
export const frise = (debut: string, fin: string, steps: { label: string; minutes: number }[], title?: string): DureeCanvasData => ({
  kind: "duree",
  variant: "frise",
  ...(title ? { title } : {}),
  frise: { startLabel: debut, endLabel: fin, steps },
});
const COULEURS = ["#38bdf8", "#f97316", "#a78bfa", "#34d399"];
export const etapesFrise = (l: { label: string; minutes: number }[]) => l.map((x, i) => ({ ...x, color: COULEURS[i % COULEURS.length] }));
export const horloge = (t: number, label: string): DureeCanvasData => ({
  kind: "duree",
  variant: "horloge",
  title: label,
  time: { hour: Math.floor(t / 60) % 24, minute: t % 60, label },
  display: { showDigital: true },
});
export const horloges = (t0: number, t1: number): DureeCanvasData => ({
  kind: "duree",
  variant: "double_horloge",
  title: "Début et fin",
  start: { hour: Math.floor(t0 / 60) % 24, minute: t0 % 60, label: "Début" },
  end: { hour: Math.floor(t1 / 60) % 24, minute: t1 % 60, label: "Fin" },
  display: { showDigital: true },
});
export const dessin = (c: Canvas | undefined, p = 0.75) => (c && peut(p) ? { canvas: c } : {});

/* ───────────────────────── Les situations ───────────────────────── */

const metier = (s: string, il: Il) => (): Qui => ({ s, il });
const enfant = (): Qui => prenom();

/** Ce qu'on compte, ce qu'on ajoute, ce qu'on enlève. `max` = le plus grand nombre réaliste. */
export type Stock = {
  qui: () => Qui;
  obj: string;
  jour: string;
  pp: string;
  inf: string;
  moins: string;
  gagne: string;
  m: readonly [string, string];
  stock: boolean;
  max: number;
  reu?: boolean;
};
export const STOCKS: Stock[] = [
  { qui: metier("la boulangère", "elle"), obj: "baguettes", jour: "vend", pp: "vendu", inf: "vendre", moins: "vend", gagne: "cuit", m: ["en janvier", "en février"], stock: true, max: 12000 },
  { qui: metier("le libraire", "il"), obj: "livres", jour: "vend", pp: "vendu", inf: "vendre", moins: "vend", gagne: "reçoit", m: ["en novembre", "en décembre"], stock: true, max: 9000 },
  { qui: metier("le stade", "il"), obj: "spectateurs", jour: "accueille", pp: "accueilli", inf: "accueillir", moins: "", gagne: "", m: ["au premier match", "au deuxième match"], stock: false, max: 60000 },
  { qui: metier("le musée", "il"), obj: "visiteurs", jour: "accueille", pp: "accueilli", inf: "accueillir", moins: "", gagne: "", m: ["en juillet", "en août"], stock: false, max: 90000 },
  { qui: metier("l'aéroport", "il"), obj: "passagers", jour: "accueille", pp: "accueilli", inf: "accueillir", moins: "", gagne: "", m: ["lundi", "mardi"], stock: false, max: 95000 },
  { qui: metier("l'usine de jouets", "elle"), obj: "jouets", jour: "fabrique", pp: "fabriqué", inf: "fabriquer", moins: "expédie", gagne: "fabrique", m: ["en mars", "en avril"], stock: true, max: 800000 },
  { qui: metier("la youtubeuse", "elle"), obj: "vues", jour: "obtient", pp: "obtenu", inf: "obtenir", moins: "", gagne: "", m: ["en mai", "en juin"], stock: false, max: 900000 },
  { qui: metier("la fermière", "elle"), obj: "œufs", jour: "ramasse", pp: "ramassé", inf: "ramasser", moins: "vend", gagne: "ramasse", m: ["en mai", "en juin"], stock: true, max: 9000 },
  { qui: metier("le club de basket", "il"), obj: "billets", jour: "vend", pp: "vendu", inf: "vendre", moins: "vend", gagne: "fait imprimer", m: ["en septembre", "en octobre"], stock: true, max: 6000 },
  { qui: enfant, obj: "cartes", jour: "gagne", pp: "gagné", inf: "gagner", moins: "donne", gagne: "gagne", m: ["lundi", "mardi"], stock: true, max: 900 },
  { qui: metier("le pharmacien", "il"), obj: "boîtes de médicaments", jour: "vend", pp: "vendu", inf: "vendre", moins: "vend", gagne: "reçoit", m: ["en janvier", "en février"], stock: true, max: 8000 },
  { qui: metier("la cheffe de la cantine", "elle"), obj: "repas", jour: "sert", pp: "servi", inf: "servir", moins: "sert", gagne: "prépare", m: ["en septembre", "en octobre"], stock: true, max: 15000 },
  { qui: metier("le jardinier de la ville", "il"), obj: "fleurs", jour: "plante", pp: "planté", inf: "planter", moins: "plante", gagne: "achète", m: ["au printemps", "en été"], stock: true, max: 9000 },
  { qui: metier("la bibliothécaire", "elle"), obj: "livres", jour: "prête", pp: "prêté", inf: "prêter", moins: "prête", gagne: "reçoit", m: ["en mars", "en avril"], stock: true, max: 12000 },
  { qui: metier("la factrice", "elle"), obj: "lettres", jour: "distribue", pp: "distribué", inf: "distribuer", moins: "distribue", gagne: "reçoit", m: ["en novembre", "en décembre"], stock: true, max: 25000 },
  { qui: metier("le maraîcher", "il"), obj: "salades", jour: "vend", pp: "vendu", inf: "vendre", moins: "vend", gagne: "cueille", m: ["en mai", "en juin"], stock: true, max: 6000 },
  { qui: enfant, obj: "points", jour: "gagne", pp: "gagné", inf: "gagner", moins: "perd", gagne: "gagne", m: ["à la première partie", "à la deuxième partie"], stock: true, max: 950000 },
  { qui: metier("l'apicultrice", "elle"), obj: "pots de miel", jour: "remplit", pp: "rempli", inf: "remplir", moins: "vend", gagne: "remplit", m: ["en mai", "en juin"], stock: true, max: 3000 },
  { qui: metier("le cinéma", "il"), obj: "tickets", jour: "vend", pp: "vendu", inf: "vendre", moins: "vend", gagne: "fait imprimer", m: ["en juillet", "en août"], stock: true, max: 40000 },
  { qui: metier("l'éleveuse", "elle"), obj: "litres de lait", jour: "trait", pp: "trait", inf: "traire", moins: "vend", gagne: "trait", m: ["en avril", "en mai"], stock: true, max: 30000 },
  { qui: metier("la cycliste", "elle"), obj: "kilomètres", jour: "parcourt", pp: "parcouru", inf: "parcourir", moins: "", gagne: "", m: ["en juin", "en juillet"], stock: false, max: 3000 },
  { qui: metier("le camionneur", "il"), obj: "kilomètres", jour: "parcourt", pp: "parcouru", inf: "parcourir", moins: "", gagne: "", m: ["en janvier", "en février"], stock: false, max: 18000 },
  { qui: metier("la compagnie de bus", "elle"), obj: "voyageurs", jour: "transporte", pp: "transporté", inf: "transporter", moins: "", gagne: "", m: ["en mars", "en avril"], stock: false, max: 250000 },
  { qui: metier("le parc d'attractions", "il"), obj: "visiteurs", jour: "accueille", pp: "accueilli", inf: "accueillir", moins: "", gagne: "", m: ["samedi", "dimanche"], stock: false, max: 45000 },
  { qui: metier("l'imprimeur", "il"), obj: "journaux", jour: "imprime", pp: "imprimé", inf: "imprimer", moins: "livre", gagne: "imprime", m: ["lundi", "mardi"], stock: true, max: 500000 },
  { qui: metier("le planteur", "il"), obj: "ananas", jour: "récolte", pp: "récolté", inf: "récolter", moins: "vend", gagne: "récolte", m: ["en novembre", "en décembre"], stock: true, max: 9000, reu: true },
  { qui: metier("le parc du volcan", "il"), obj: "visiteurs", jour: "accueille", pp: "accueilli", inf: "accueillir", moins: "", gagne: "", m: ["en juillet", "en août"], stock: false, max: 60000, reu: true },
];
/** Le plus grand nombre réaliste exigé à chaque étoile (pour avoir de grands nombres). */
const MAX_MIN: Record<number, number> = { 1: 0, 2: 2000, 3: 9000, 4: 30000, 5: 30000 };
export const stockA = (d: number, stock = false) => tirer(STOCKS.filter((x) => x.max >= MAX_MIN[d] && (!stock || x.stock)));

/** Un grand et un petit nombre, selon l'étoile, ramenés au maximum réaliste. */
export function paire(d: number, max: number): [number, number] {
  const R: Record<number, [number, number, number, number]> = {
    1: [520, 980, 115, 480],
    2: [2400, 8900, 250, 1990],
    3: [24000, 89000, 2500, 19900],
    4: [240000, 890000, 25000, 199000],
  };
  let [ga, gb, pa, pb] = R[Math.min(4, Math.max(1, d))];
  if (max < gb) {
    const f = max / gb;
    [ga, gb, pa, pb] = [Math.max(40, Math.round(ga * f)), max, Math.max(12, Math.round(pa * f)), Math.max(15, Math.round(pb * f))];
  }
  let g: number;
  let p: number;
  do {
    g = entre(ga, gb);
    p = entre(pa, pb);
  } while (p >= g - 5);
  return [g, p];
}

/** Des groupes égaux : « 24 cartons de 36 livres ». */
export type Grp = { qui: () => Qui; cont: string; contPl: string; obj: string; fait: string; ks: number[]; rangement: boolean; reu?: boolean };
export const GROUPES: Grp[] = [
  { qui: metier("le fleuriste", "il"), cont: "bouquet", contPl: "bouquets", obj: "roses", fait: "compose", ks: [12, 15, 20, 24], rangement: false },
  { qui: metier("la pâtissière", "elle"), cont: "plateau", contPl: "plateaux", obj: "éclairs", fait: "remplit", ks: [12, 16, 24], rangement: true },
  { qui: metier("l'entraîneur", "il"), cont: "filet", contPl: "filets", obj: "ballons", fait: "remplit", ks: [8, 10, 12, 15], rangement: true },
  { qui: metier("la libraire", "elle"), cont: "carton", contPl: "cartons", obj: "livres", fait: "remplit", ks: [24, 25, 30, 36, 48], rangement: true },
  { qui: metier("le maraîcher", "il"), cont: "cagette", contPl: "cagettes", obj: "tomates", fait: "remplit", ks: [15, 18, 24, 36], rangement: true },
  { qui: metier("l'apiculteur", "il"), cont: "carton", contPl: "cartons", obj: "pots de miel", fait: "prépare", ks: [12, 18, 24], rangement: true },
  { qui: metier("le boulanger", "il"), cont: "sachet", contPl: "sachets", obj: "croissants", fait: "prépare", ks: [6, 8, 12], rangement: true },
  { qui: metier("l'infirmière", "elle"), cont: "boîte", contPl: "boîtes", obj: "pansements", fait: "prépare", ks: [20, 25, 50], rangement: true },
  { qui: metier("le facteur", "il"), cont: "paquet", contPl: "paquets", obj: "lettres", fait: "prépare", ks: [25, 40, 50], rangement: true },
  { qui: metier("l'éleveur", "il"), cont: "plateau", contPl: "plateaux", obj: "œufs", fait: "remplit", ks: [12, 20, 30], rangement: true },
  { qui: metier("le professeur de sport", "il"), cont: "équipe", contPl: "équipes", obj: "élèves", fait: "forme", ks: [5, 6, 8, 11], rangement: false },
  { qui: metier("la cheffe de chantier", "elle"), cont: "palette", contPl: "palettes", obj: "briques", fait: "charge", ks: [40, 48, 60, 75], rangement: true },
  { qui: metier("la poissonnière", "elle"), cont: "barquette", contPl: "barquettes", obj: "sardines", fait: "prépare", ks: [6, 8, 12], rangement: true },
  { qui: metier("le pâtissier", "il"), cont: "boîte", contPl: "boîtes", obj: "macarons", fait: "remplit", ks: [12, 18, 24], rangement: true },
  { qui: metier("la laborantine", "elle"), cont: "boîte", contPl: "boîtes", obj: "tubes", fait: "remplit", ks: [24, 48, 96], rangement: true },
  { qui: metier("le jardinier", "il"), cont: "bac", contPl: "bacs", obj: "plants de fraisiers", fait: "prépare", ks: [12, 15, 24], rangement: true },
  { qui: metier("l'informaticien", "il"), cont: "carton", contPl: "cartons", obj: "claviers", fait: "remplit", ks: [8, 12, 16], rangement: true },
  { qui: metier("le responsable de l'usine", "il"), cont: "carton", contPl: "cartons", obj: "jouets", fait: "remplit", ks: [24, 36, 48], rangement: true },
  { qui: metier("la bénévole du marathon", "elle"), cont: "pack", contPl: "packs", obj: "bouteilles d'eau", fait: "prépare", ks: [6, 12, 24], rangement: true },
  { qui: metier("la directrice de la colonie", "elle"), cont: "groupe", contPl: "groupes", obj: "enfants", fait: "forme", ks: [8, 10, 12, 15], rangement: false },
  { qui: metier("le planteur", "il"), cont: "caisse", contPl: "caisses", obj: "ananas", fait: "remplit", ks: [8, 10, 12], rangement: true, reu: true },
];

/** Ce qu'un enfant collectionne. */
export const COLLECTIONS = ["billes", "cartes", "timbres", "autocollants", "coquillages", "perles", "figurines", "images", "pin's", "porte-clés"];

/** « La seconde en fabrique 3 fois plus. » */
export const MACHINES = [
  { a: "le premier camion", b: "le second", il: "il" as Il, v: "transporte", obj: "colis" },
  { a: "la petite usine", b: "la grande", il: "elle" as Il, v: "fabrique", obj: "jouets" },
  { a: "le petit train", b: "le grand", il: "il" as Il, v: "transporte", obj: "voyageurs" },
  { a: "la première imprimante", b: "la seconde", il: "elle" as Il, v: "imprime", obj: "pages" },
  { a: "le petit verger", b: "le grand", il: "il" as Il, v: "donne", obj: "kilos de pommes" },
  { a: "la première chaîne", b: "la seconde", il: "elle" as Il, v: "obtient", obj: "vues" },
  { a: "le petit stade", b: "le grand", il: "il" as Il, v: "accueille", obj: "spectateurs" },
  { a: "la petite ferme", b: "la grande", il: "elle" as Il, v: "produit", obj: "litres de lait" },
];

/** Ce qu'on achète : prix en euros, du plus petit au plus grand. */
export type Art = { un: string; le: string; nom: string; pl: string; f: boolean; p: [number, number] };
export const ARTICLES: Art[] = [
  { un: "un cahier", le: "le cahier", nom: "cahier", pl: "cahiers", f: false, p: [1.8, 4.5] },
  { un: "un livre", le: "le livre", nom: "livre", pl: "livres", f: false, p: [6.9, 18.9] },
  { un: "un ballon", le: "le ballon", nom: "ballon", pl: "ballons", f: false, p: [9.9, 24.9] },
  { un: "un classeur", le: "le classeur", nom: "classeur", pl: "classeurs", f: false, p: [2.5, 6.9] },
  { un: "une place de cinéma", le: "la place", nom: "place", pl: "places de cinéma", f: true, p: [6.5, 10.5] },
  { un: "un jeu de cartes", le: "le jeu", nom: "jeu", pl: "jeux de cartes", f: false, p: [3.9, 8.9] },
  { un: "un t-shirt", le: "le t-shirt", nom: "t-shirt", pl: "t-shirts", f: false, p: [8.9, 19.9] },
  { un: "une plante verte", le: "la plante", nom: "plante", pl: "plantes vertes", f: true, p: [5.9, 14.9] },
  { un: "un pot de peinture", le: "le pot", nom: "pot", pl: "pots de peinture", f: false, p: [7.9, 24.9] },
  { un: "une boîte de feutres", le: "la boîte", nom: "boîte", pl: "boîtes de feutres", f: true, p: [3.5, 9.9] },
  { un: "un puzzle", le: "le puzzle", nom: "puzzle", pl: "puzzles", f: false, p: [7.9, 16.9] },
  { un: "une gourde", le: "la gourde", nom: "gourde", pl: "gourdes", f: true, p: [4.9, 12.9] },
  { un: "un paquet de graines", le: "le paquet", nom: "paquet", pl: "paquets de graines", f: false, p: [1.5, 3.9] },
  { un: "une raquette", le: "la raquette", nom: "raquette", pl: "raquettes", f: true, p: [12.9, 34.9] },
  { un: "une bande dessinée", le: "la bande dessinée", nom: "bande dessinée", pl: "bandes dessinées", f: true, p: [9.9, 15.9] },
  { un: "une trousse", le: "la trousse", nom: "trousse", pl: "trousses", f: true, p: [4.5, 9.9] },
  { un: "un kilo de cerises", le: "le kilo", nom: "kilo", pl: "kilos de cerises", f: false, p: [4.5, 9.5] },
  { un: "une entrée à la piscine", le: "l'entrée", nom: "entrée", pl: "entrées à la piscine", f: true, p: [2.6, 5.4] },
];
export const deuxArticles = () => {
  const a = un(ARTICLES);
  return [a, un(ARTICLES.filter((x) => x.nom !== a.nom))] as const;
};
export const LIEUX = ["le marché", "la papeterie", "le supermarché", "la boutique du coin", "le grand magasin", "l'épicerie", "la librairie", "le magasin de sport", "le site de vente en ligne"];

/** Des mesures décimales deux jours de suite : « 12,5 km samedi et 8,75 km dimanche ». */
type Mes = { qui: () => Qui; v: string; pp: string; grand: string; u: "km" | "m" | "kg" | "L"; lo: number; hi: number; m: readonly [string, string]; reu?: boolean };
export const MES: Mes[] = [
  { qui: metier("la randonneuse", "elle"), v: "marche", pp: "marché", grand: "Quelle distance", u: "km", lo: 8, hi: 24, m: ["samedi", "dimanche"] },
  { qui: metier("le cycliste", "il"), v: "parcourt", pp: "parcouru", grand: "Quelle distance", u: "km", lo: 25, hi: 90, m: ["le matin", "l'après-midi"] },
  { qui: metier("la nageuse", "elle"), v: "nage", pp: "nagé", grand: "Quelle distance", u: "km", lo: 1, hi: 5, m: ["lundi", "jeudi"] },
  { qui: metier("le coureur", "il"), v: "court", pp: "couru", grand: "Quelle distance", u: "km", lo: 5, hi: 21, m: ["mardi", "vendredi"] },
  { qui: metier("la couturière", "elle"), v: "utilise", pp: "utilisé", grand: "Quelle longueur de tissu", u: "m", lo: 1, hi: 6, m: ["pour la robe", "pour la veste"] },
  { qui: metier("l'électricien", "il"), v: "pose", pp: "posé", grand: "Quelle longueur de câble", u: "m", lo: 8, hi: 45, m: ["dans la cuisine", "dans le salon"] },
  { qui: metier("le boulanger", "il"), v: "utilise", pp: "utilisé", grand: "Quelle masse de farine", u: "kg", lo: 6, hi: 35, m: ["le matin", "l'après-midi"] },
  { qui: metier("la jardinière", "elle"), v: "étale", pp: "étalé", grand: "Quelle masse de terreau", u: "kg", lo: 5, hi: 40, m: ["dans le potager", "dans les bacs"] },
  { qui: metier("l'éleveuse", "elle"), v: "récolte", pp: "récolté", grand: "Quelle quantité de lait", u: "L", lo: 20, hi: 95, m: ["le matin", "le soir"] },
  { qui: metier("le peintre", "il"), v: "utilise", pp: "utilisé", grand: "Quelle quantité de peinture", u: "L", lo: 2, hi: 12, m: ["pour les murs", "pour le plafond"] },
  { qui: metier("la livreuse", "elle"), v: "parcourt", pp: "parcouru", grand: "Quelle distance", u: "km", lo: 30, hi: 120, m: ["lundi", "mardi"] },
  { qui: metier("le menuisier", "il"), v: "scie", pp: "scié", grand: "Quelle longueur de planches", u: "m", lo: 2, hi: 9, m: ["le matin", "l'après-midi"] },
  { qui: metier("le pêcheur", "il"), v: "pêche", pp: "pêché", grand: "Quelle masse de poisson", u: "kg", lo: 12, hi: 60, m: ["lundi", "mardi"] },
  { qui: metier("la cuisinière", "elle"), v: "prépare", pp: "préparé", grand: "Quelle quantité de soupe", u: "L", lo: 4, hi: 18, m: ["à midi", "le soir"] },
  { qui: metier("le surfeur", "il"), v: "pagaie", pp: "pagayé", grand: "Quelle distance", u: "km", lo: 1, hi: 6, m: ["samedi", "dimanche"], reu: true },
];
/** Un décimal à 1 ou 2 chiffres après la virgule, jamais entier. */
export function decimal(lo: number, hi: number, deux = peut(0.5)): number {
  let v: number;
  do v = deux ? entre(lo * 100, hi * 100) / 100 : entre(lo * 10, hi * 10) / 10;
  while (Number.isInteger(v) || (deux && Math.round(v * 100) % 10 === 0));
  return r2(v);
}

/** Les activités qui ont un début et une fin. */
type Act = { s: string; il: Il; deb: [number, number]; d: [number, number]; reu?: boolean };
export const ACTIVITES: Act[] = [
  { s: "Le film", il: "il", deb: [13, 20], d: [85, 160] },
  { s: "Le match de handball", il: "il", deb: [14, 19], d: [70, 110] },
  { s: "Le trajet en train", il: "il", deb: [6, 18], d: [95, 280] },
  { s: "Le vol pour Montréal", il: "il", deb: [7, 15], d: [400, 480] },
  { s: "Le cours de natation", il: "il", deb: [9, 17], d: [45, 90] },
  { s: "La randonnée", il: "elle", deb: [7, 10], d: [150, 330] },
  { s: "La cuisson du pain", il: "elle", deb: [5, 7], d: [35, 75] },
  { s: "La répétition de la chorale", il: "elle", deb: [14, 18], d: [75, 135] },
  { s: "La visite du musée", il: "elle", deb: [9, 15], d: [80, 150] },
  { s: "Le concert", il: "il", deb: [18, 20], d: [95, 165] },
  { s: "L'atelier de poterie", il: "il", deb: [9, 15], d: [70, 140] },
  { s: "Le tournoi d'échecs", il: "il", deb: [8, 13], d: [190, 320] },
  { s: "Le voyage en car", il: "il", deb: [6, 9], d: [210, 400] },
  { s: "La séance de kayak", il: "elle", deb: [9, 15], d: [65, 125] },
  { s: "La réunion de chantier", il: "elle", deb: [8, 16], d: [50, 105] },
  { s: "La garde de l'infirmière", il: "elle", deb: [6, 8], d: [420, 600] },
  { s: "La traversée en bateau", il: "elle", deb: [7, 14], d: [100, 230] },
  { s: "La montée au Piton des Neiges", il: "elle", deb: [5, 7], d: [240, 330], reu: true },
];
/** Une heure de début, au pas de 5 minutes. */
export const debut = (a: Act) => entre(a.deb[0], a.deb[1]) * 60 + 5 * entre(0, 11);
/** Une durée qui dépasse l'heure, au pas de 5 minutes, sans tomber pile. */
export function dureeDe(a: Act) {
  let d: number;
  do d = 5 * entre(Math.ceil(a.d[0] / 5), Math.floor(a.d[1] / 5));
  while (d % 60 === 0);
  return d;
}

/* ───────────────────────── Les problèmes à une étape ───────────────────────── */

export type Signe = "+" | "−" | "×" | "÷";
export type Pb = {
  enonce: string;
  question: string;
  rep: number;
  u: string;
  x: number;
  s: Signe;
  y: number;
  calc: string;
  faux: number[];
  extra?: string[];
  calcFaux: string[];
  /** La phrase-réponse, à partir de la quantité écrite (avec ou sans unité). */
  phrase: (q: string) => string;
  methode: string;
  canvas?: Canvas;
};
export const OP_NOM: Record<Signe, string> = { "+": "une addition", "−": "une soustraction", "×": "une multiplication", "÷": "une division" };
const plus10 = (v: number) => v + (v >= 100000 ? 10000 : v >= 10000 ? 1000 : v >= 1000 ? 100 : 10);

export function pbTotal(d: number): Pb {
  const c = stockA(d);
  const { s, il } = c.qui();
  const [g, p] = paire(d, c.max);
  const [a, b] = peut(0.5) ? [g, p] : [p, g];
  const [m1, m2] = c.m;
  const base = {
    rep: a + b, u: c.obj, x: a, s: "+" as Signe, y: b, calc: ec(a, "+", b),
    faux: [g - p, sansRetenue(a, b), plus10(a + b), g],
    calcFaux: [ec(g, "−", p), ec(a, "×", b), ec(g, "÷", p)],
    methode: "On réunit deux quantités : on les additionne.",
  };
  if (c.stock && peut(0.4))
    return {
      ...base,
      enonce: un([
        `${cap(s)} a ${fr(a)} ${c.obj}. ${cap(il)} en ${c.gagne} ${fr(b)} de plus.`,
        `Au début, ${s} a ${fr(a)} ${c.obj}. Puis ${il} en ${c.gagne} ${fr(b)} autres.`,
        `${cap(s)} a déjà ${fr(a)} ${c.obj}. ${cap(m1)}, ${il} en ${c.gagne} encore ${fr(b)}.`,
      ]),
      question: un([`Combien ${de(c.obj)} ${s} a-t-${il} maintenant ?`, `Combien ${de(c.obj)} a-t-${il} maintenant ?`, `Combien ${de(c.obj)} cela fait-il en tout ?`]),
      phrase: (q) => `${cap(s)} a maintenant ${q}.`,
      canvas: barre([{ label: "au début", value: fr(a) }, { label: "en plus", value: fr(b) }], "?", cap(c.obj)),
    };
  return {
    ...base,
    enonce: un([
      `${cap(m1)}, ${s} ${c.jour} ${fr(a)} ${c.obj}. ${cap(m2)}, ${il} en ${c.jour} ${fr(b)}.`,
      `${cap(s)} ${c.jour} ${fr(a)} ${c.obj} ${m1} et ${fr(b)} ${m2}.`,
      `${cap(s)} fait ses comptes. ${cap(m1)} : ${fr(a)} ${c.obj}. ${cap(m2)} : ${fr(b)} ${c.obj}.`,
      `${cap(m1)}, ${s} ${c.jour} ${fr(a)} ${c.obj}, et ${m2}, ${fr(b)}.`,
    ]),
    question: un([`Combien ${de(c.obj)} ${inv(c.jour, il)} en tout ?`, `Combien ${de(c.obj)} cela fait-il en tout ?`, `Quel est le nombre total ${de(c.obj)} ?`]),
    phrase: (q) => `${cap(s)} a ${c.pp} ${q} en tout.`,
    canvas: barre([{ label: cap(m1), value: fr(a) }, { label: cap(m2), value: fr(b) }], "?", cap(c.obj)),
  };
}

export function pbReste(d: number): Pb {
  const c = stockA(d, true);
  const { s, il } = c.qui();
  const [a, b] = paire(d, c.max);
  return {
    enonce: un([
      `${cap(s)} a ${fr(a)} ${c.obj}. ${cap(il)} en ${c.moins} ${fr(b)}.`,
      `Au début, ${s} a ${fr(a)} ${c.obj}. ${cap(c.m[0])}, ${il} en ${c.moins} ${fr(b)}.`,
      `${cap(s)} commence avec ${fr(a)} ${c.obj}. ${cap(il)} en ${c.moins} ${fr(b)}.`,
    ]),
    question: un([`Combien ${de(c.obj)} reste-t-il ?`, `Combien ${de(c.obj)} lui reste-t-il ?`, `Combien ${de(c.obj)} ${s} a-t-${il} encore ?`, `Combien ${de(c.obj)} reste-t-il à la fin ?`]),
    rep: a - b, u: c.obj, x: a, s: "−", y: b, calc: ec(a, "−", b),
    faux: [a + b, ecartChiffres(a, b), plus10(a - b), b],
    calcFaux: [ec(a, "+", b), ec(a, "×", b), ec(a, "÷", b)],
    phrase: (q) => `Il reste ${q}.`,
    methode: "On enlève une quantité à ce qu'on avait : on soustrait.",
    canvas: barre([{ label: "en moins", value: fr(b) }, { label: "il reste", unknown: true }], fr(a), cap(c.obj)),
  };
}

export function pbEcart(d: number): Pb {
  const c = stockA(d);
  const { s, il } = c.qui();
  const [g, p] = paire(d, c.max);
  const grandDAbord = peut(0.6);
  const [a, b] = grandDAbord ? [g, p] : [p, g];
  const [m1, m2] = c.m;
  const [mg, mp] = grandDAbord ? [m1, m2] : [m2, m1];
  const plus = peut(0.6);
  return {
    enonce: un([
      `${cap(m1)}, ${s} ${c.jour} ${fr(a)} ${c.obj}. ${cap(m2)}, ${il} en ${c.jour} ${fr(b)}.`,
      `${cap(s)} ${c.jour} ${fr(a)} ${c.obj} ${m1} et ${fr(b)} ${m2}.`,
      `${cap(s)} fait ses comptes. ${cap(m1)} : ${fr(a)} ${c.obj}. ${cap(m2)} : ${fr(b)} ${c.obj}.`,
    ]),
    question: plus ? `Combien ${de(c.obj)} ${inv(c.jour, il)} de plus ${mg} ?` : `Combien ${de(c.obj)} ${inv(c.jour, il)} de moins ${mp} ?`,
    rep: g - p, u: c.obj, x: g, s: "−", y: p, calc: ec(g, "−", p),
    faux: [g + p, ecartChiffres(g, p), g, p],
    calcFaux: [ec(g, "+", p), ec(g, "×", p), ec(g, "÷", p)],
    phrase: (q) => (plus ? `${cap(s)} a ${c.pp} ${q} de plus ${mg}.` : `${cap(s)} a ${c.pp} ${q} de moins ${mp}.`),
    methode: "On compare deux quantités : l'écart se trouve par une soustraction, même si la question dit « de plus ».",
    canvas: barre([{ label: cap(mp), value: fr(p) }, { label: "écart", unknown: true }], fr(g), cap(mg)),
  };
}

export function pbComplement(d: number): Pb {
  const c = stockA(d);
  const { s, il } = c.qui();
  const N = paire(d, c.max)[0];
  const a = entre(Math.ceil(N * 0.35), Math.floor(N * 0.9));
  return {
    enonce: un([
      `${cap(s)} veut ${c.inf} ${fr(N)} ${c.obj}. ${cap(il)} en a déjà ${c.pp} ${fr(a)}.`,
      `${cap(s)} s'est fixé un objectif : ${c.inf} ${fr(N)} ${c.obj}. Pour l'instant, ${il} en a ${c.pp} ${fr(a)}.`,
      `${cap(s)} a déjà ${c.pp} ${fr(a)} ${c.obj}. ${cap(il)} veut arriver à ${fr(N)}.`,
    ]),
    question: un([`Combien ${de(c.obj)} doit-${il} encore ${c.inf} ?`, `Combien ${de(c.obj)} lui manque-t-il ?`, `Combien ${de(c.obj)} reste-t-il à ${c.inf} ?`]),
    rep: N - a, u: c.obj, x: N, s: "−", y: a, calc: ec(N, "−", a),
    faux: [N + a, ecartChiffres(N, a), plus10(N - a), a],
    calcFaux: [ec(N, "+", a), ec(N, "×", a), ec(N, "÷", a)],
    phrase: (q) => `${cap(s)} doit encore ${c.inf} ${q}.`,
    methode: "On cherche ce qui manque pour arriver à l'objectif : on soustrait ce qui est déjà fait.",
    canvas: barre([{ label: "déjà", value: fr(a) }, { label: "manque", unknown: true }], fr(N), cap(c.obj)),
  };
}

/** n groupes de k : n grandit avec l'étoile (2 × 2 chiffres à ★3). */
export function nk(d: number, c: Grp, diviseur = false): [number, number] {
  let n: number;
  let k: number;
  do {
    n = d <= 1 ? entre(3, 9) : d === 2 ? (diviseur ? entre(4, 9) : entre(12, 48)) : d === 3 ? entre(12, 48) : diviseur ? entre(15, 75) : entre(25, 98);
    k = un(c.ks);
  } while (n === k);
  return [n, k];
}

export function pbFois(d: number): Pb {
  const c = tirer(GROUPES);
  const { s } = c.qui();
  const [n, k] = nk(d, c);
  const P = n * k;
  return {
    enonce: un([
      `${cap(s)} ${c.fait} ${n} ${c.contPl} de ${k} ${c.obj}.`,
      `${cap(s)} ${c.fait} ${n} ${c.contPl}. Dans chaque ${c.cont}, il y a ${k} ${c.obj}.`,
      `Il y a ${n} ${c.contPl} de ${k} ${c.obj}.`,
      `${cap(s)} ${c.fait} ${n} ${c.contPl} : ${k} ${c.obj} par ${c.cont}.`,
    ]),
    question: un([`Combien ${de(c.obj)} y a-t-il en tout ?`, `Combien ${de(c.obj)} cela fait-il ?`, `Quel est le nombre total ${de(c.obj)} ?`]),
    rep: P, u: c.obj, x: n, s: "×", y: k, calc: ec(n, "×", k),
    faux: [n + k, (n - 1) * k, (n + 1) * k, plus10(P)],
    calcFaux: [ec(n, "+", k), ec(Math.max(n, k), "−", Math.min(n, k)), ec(Math.max(n, k), "÷", Math.min(n, k))],
    phrase: (q) => `Il y a ${q} en tout.`,
    methode: "Des groupes égaux : le même nombre répété plusieurs fois, c'est une multiplication.",
    canvas: groupes(n, c.cont, fr(k), "?", `${cap(c.obj)} : ${n} ${c.contPl}`),
  };
}

export function pbPartage(d: number): Pb {
  const c = tirer(GROUPES);
  const { s, il } = c.qui();
  const [n, k] = nk(d, c, true);
  const T = n * k;
  return {
    enonce: un([
      `${cap(s)} a ${fr(T)} ${c.obj}. ${cap(il)} les répartit dans ${n} ${c.contPl}, autant dans chaque ${c.cont}.`,
      `${cap(s)} répartit ${fr(T)} ${c.obj} dans ${n} ${c.contPl} identiques.`,
      `${cap(s)} partage ${fr(T)} ${c.obj} entre ${n} ${c.contPl}. Chaque ${c.cont} en reçoit autant.`,
    ]),
    question: un([`Combien ${de(c.obj)} y a-t-il dans chaque ${c.cont} ?`, `Combien ${de(c.obj)} met-${il} dans chaque ${c.cont} ?`, `Combien ${de(c.obj)} par ${c.cont} ?`]),
    rep: k, u: c.obj, x: T, s: "÷", y: n, calc: ec(T, "÷", n),
    faux: [T - n, T + n, n, k + 10],
    calcFaux: [ec(T, "−", n), ec(T, "×", n), ec(T, "+", n)],
    phrase: (q) => `Il y a ${q} dans chaque ${c.cont}.`,
    methode: "On partage en parts égales et on cherche UNE part : c'est une division.",
    canvas: groupes(n, c.cont, null, fr(T), `${cap(c.obj)} : ${n} ${c.contPl}`),
  };
}

export function pbGroupement(d: number): Pb {
  const c = tirer(GROUPES);
  const { s, il } = c.qui();
  const [n, k] = nk(d, c);
  const T = n * k;
  const [question, verbe] = un([
    [`Combien ${de(c.contPl)} ${inv(c.fait, il)} ?`, c.fait],
    [`Combien ${de(c.contPl)} peut-${il} faire ?`, "peut faire"],
    [`Combien ${de(c.contPl)} obtient-${il} ?`, "obtient"],
  ] as const);
  return {
    enonce: un([
      `${cap(s)} a ${fr(T)} ${c.obj}. ${cap(il)} veut faire des ${c.contPl} de ${k} ${c.obj}.`,
      `${cap(s)} a ${fr(T)} ${c.obj}. ${cap(il)} en met ${k} dans chaque ${c.cont}.`,
      `${cap(s)} a ${fr(T)} ${c.obj}. Chaque ${c.cont} en contient ${k}.`,
    ]),
    question,
    rep: n, u: c.contPl, x: T, s: "÷", y: k, calc: ec(T, "÷", k),
    faux: [T - k, k, n + 10, T + k],
    calcFaux: [ec(T, "−", k), ec(T, "×", k), ec(T, "+", k)],
    phrase: (q) => `${cap(il)} ${verbe} ${q}.`,
    methode: "On cherche combien de groupes de même taille on peut faire : c'est une division.",
    canvas: barre([{ label: c.cont, value: fr(k) }, { label: c.cont, value: fr(k) }, { label: "…", unknown: true }], fr(T), cap(c.obj)),
  };
}

export function pbFoisPlus(d: number): Pb {
  const n = entre(2, 9);
  const k = d <= 1 ? entre(12, 95) : d === 2 ? entre(125, 980) : entre(1250, 9800);
  const P = n * k;
  const commun = {
    rep: P, x: k, s: "×" as Signe, y: n, calc: ec(k, "×", n),
    faux: [k + n, (n - 1) * k, P + k, n],
    calcFaux: [ec(k, "+", n), ec(k, "−", n), ec(k, "÷", n)],
    methode: "« fois plus » : on multiplie.",
  };
  if (d >= 2 || peut(0.35)) {
    const ma = un(MACHINES);
    return {
      ...commun,
      u: ma.obj,
      enonce: un([
        `${cap(ma.a)} ${ma.v} ${fr(k)} ${ma.obj}. ${cap(ma.b)} en ${ma.v} ${n} fois plus.`,
        `${cap(ma.b)} ${ma.v} ${n} fois plus ${de(ma.obj)} ${que(ma.a)}. ${cap(ma.a)} en ${ma.v} ${fr(k)}.`,
      ]),
      question: un([`Combien ${de(ma.obj)} ${ma.b} ${inv(ma.v, ma.il)} ?`, `Combien ${de(ma.obj)} pour ${ma.b} ?`]),
      phrase: (q) => `${cap(ma.b)} ${ma.v} ${q}.`,
      canvas: groupes(n, "", fr(k), "?", cap(ma.b)),
    };
  }
  const A = prenom();
  const B = prenom(A.s);
  const obj = un(COLLECTIONS);
  return {
    ...commun,
    u: obj,
    enonce: un([
      `${A.s} a ${fr(k)} ${obj}. ${B.s} en a ${n} fois plus.`,
      `${B.s} a ${n} fois plus ${de(obj)} ${que(A.s)}. ${A.s} en a ${fr(k)}.`,
      `${A.s} possède ${fr(k)} ${obj}, et ${B.s} en possède ${n} fois plus.`,
    ]),
    question: un([`Combien ${de(obj)} ${B.s} a-t-${B.il} ?`, `Combien ${de(obj)} possède ${B.s} ?`]),
    phrase: (q) => `${B.s} a ${q}.`,
    canvas: groupes(n, "", fr(k), "?", B.s),
  };
}

export function pbPlusQue(d: number): Pb {
  const A = prenom();
  const B = prenom(A.s);
  const obj = un(COLLECTIONS);
  const a = d >= 3 ? entre(1200, 4800) : entre(120, 980);
  const e = d >= 3 ? entre(150, 990) : entre(25, 95);
  const plus = peut(0.5);
  const rep = plus ? a - e : a + e;
  return {
    enonce: plus
      ? un([`${A.s} a ${fr(a)} ${obj}. ${cap(A.il)} en a ${fr(e)} de plus ${que(B.s)}.`, `${A.s} a ${fr(a)} ${obj}, soit ${fr(e)} de plus ${que(B.s)}.`])
      : un([`${A.s} a ${fr(a)} ${obj}. ${cap(A.il)} en a ${fr(e)} de moins ${que(B.s)}.`, `${A.s} a ${fr(a)} ${obj}, soit ${fr(e)} de moins ${que(B.s)}.`]),
    question: un([`Combien ${de(obj)} ${B.s} a-t-${B.il} ?`, `Combien ${de(obj)} possède ${B.s} ?`]),
    rep, u: obj, x: a, s: plus ? "−" : "+", y: e, calc: plus ? ec(a, "−", e) : ec(a, "+", e),
    faux: plus ? [a + e, ecartChiffres(a, e), a] : [a - e, sansRetenue(a, e), a],
    calcFaux: plus ? [ec(a, "+", e), ec(a, "×", e), ec(a, "÷", e)] : [ec(a, "−", e), ec(a, "×", e), ec(a, "÷", e)],
    phrase: (q) => `${B.s} a ${q}.`,
    methode: plus
      ? `${A.s} en a plus que ${B.s} : ${B.s} en a donc MOINS. On soustrait, même si on lit « de plus ».`
      : `${A.s} en a moins que ${B.s} : ${B.s} en a donc PLUS. On additionne, même si on lit « de moins ».`,
    canvas: plus
      ? barre([{ label: B.s, unknown: true }, { label: "de plus", value: fr(e) }], fr(a), A.s)
      : barre([{ label: A.s, value: fr(a) }, { label: "de plus", value: fr(e) }], "?", B.s),
  };
}

/* ── Les décimaux : prix et mesures ── */

const Q_PAYE = (il: string) => [`Combien paie-t-${il} en tout ?`, `Quel est le prix total ?`, `Combien dépense-t-${il} ?`, `Quelle somme paie-t-${il} ?`];

export function pbPrixTotal(): Pb {
  const { s, il } = prenom();
  const [A, B] = deuxArticles();
  const a = prix(A.p);
  const b = prix(B.p);
  const [g, p] = a >= b ? [a, b] : [b, a];
  const L = un(LIEUX);
  return {
    enonce: un([
      `${s} achète ${A.un} à ${eu(a)} € et ${B.un} à ${eu(b)} €.`,
      `${cap(au(L))}, ${s} prend ${A.un} à ${eu(a)} €, puis ${B.un} à ${eu(b)} €.`,
      `Sur le ticket de caisse de ${s} : ${A.un} à ${eu(a)} € et ${B.un} à ${eu(b)} €.`,
    ]),
    question: un(Q_PAYE(il)),
    rep: r2(a + b), u: "€", x: a, s: "+", y: b, calc: ec(a, "+", b, "€"),
    faux: [centimesSansRetenue(a, b), r2(g - p), r2(a + b + 1), r2(a + b + 0.1)],
    calcFaux: [ec(g, "−", p, "€"), ec(a, "×", b, "€"), ec(g, "÷", p, "€")],
    phrase: (q) => `${s} paie ${q} en tout.`,
    methode: "On réunit deux prix : on les additionne, virgule sous virgule (les euros avec les euros, les centimes avec les centimes).",
    canvas: barre([{ label: A.nom, value: eu(a) }, { label: B.nom, value: eu(b) }], "?", "Les achats (€)"),
  };
}

export function pbRendu(): Pb {
  const { s, il } = prenom();
  const A = un(ARTICLES);
  const p = prix(A.p);
  const B = [5, 10, 20, 50].find((b) => b >= p + 1) ?? 50;
  return {
    enonce: un([
      `${s} achète ${A.un} à ${eu(p)} €. ${cap(il)} paie avec un billet de ${B} €.`,
      `${s} veut ${A.un}. ${cap(A.le)} coûte ${eu(p)} €. ${cap(il)} donne un billet de ${B} €.`,
      `${s} a un billet de ${B} €. ${cap(il)} achète ${A.un} à ${eu(p)} €.`,
    ]),
    question: un([`Combien d'argent lui rend-on ?`, `Quelle somme lui rend-on ?`, `Combien le vendeur lui rend-il ?`, `Combien d'argent lui reste-t-il ?`]),
    rep: r2(B - p), u: "€", x: B, s: "−", y: p, calc: ec(B, "−", p, "€"),
    faux: [renduNaif(B, p), r2(B - p + 1), r2(B + p), p],
    calcFaux: [ec(B, "+", p, "€"), ec(B, "×", p, "€"), ec(B, "÷", p, "€")],
    phrase: (q) => `On rend ${q} à ${s}.`,
    methode: "On enlève le prix de ce qu'on a donné : on soustrait. 20 € s'écrit 20,00 € pour bien poser les centimes.",
    canvas: peut(0.5) ? argent(B) : barre([{ label: A.nom, value: eu(p) }, { label: "rendu", unknown: true }], `${B}`, "Le billet (€)"),
  };
}

/** Ce qu'on achète par lots, ou ce qu'on coupe en morceaux égaux. */
export function pbFoisDec(d: number): Pb {
  if (peut(0.65)) {
    const { s, il } = prenom();
    const A = un(ARTICLES);
    const n = d >= 3 ? entre(12, 25) : entre(3, 9);
    const p = prix(A.p);
    return {
      enonce: un([
        `${s} achète ${n} ${A.pl} à ${eu(p)} € ${A.le}.`,
        `${s} prend ${n} ${A.pl}. ${cap(A.le)} coûte ${eu(p)} €.`,
        `Pour la classe, ${s} commande ${n} ${A.pl}. ${cap(A.le)} coûte ${eu(p)} €.`,
      ]),
      question: un(Q_PAYE(il)),
      rep: r2(n * p), u: "€", x: n, s: "×", y: p, calc: `${n} × ${eu(p)}`,
      faux: [r2(n + p), r2(n * p * 10), r2((n - 1) * p), r2(n * Math.floor(p))],
      calcFaux: [`${n} + ${eu(p)}`, `${eu(p)} − ${n}`, `${eu(p)} ÷ ${n}`],
      phrase: (q) => `${s} paie ${q}.`,
      methode: "Le même prix répété plusieurs fois : on multiplie le décimal par le nombre d'objets.",
      canvas: groupes(n, A.nom, eu(p), "?", "Le prix (€)"),
    };
  }
  const M = un([
    { qui: metier("la couturière", "elle"), v: "coupe", cont: "morceaux de ruban", u: "m" as const, lo: 0.5, hi: 2.5, grand: "Quelle longueur de ruban" },
    { qui: metier("l'électricien", "il"), v: "coupe", cont: "câbles", u: "m" as const, lo: 1, hi: 4, grand: "Quelle longueur de câble" },
    { qui: metier("le cuisinier", "il"), v: "remplit", cont: "bouteilles", u: "L" as const, lo: 0.5, hi: 2, grand: "Quelle quantité de jus" },
    { qui: metier("la jardinière", "elle"), v: "achète", cont: "sacs de terreau", u: "kg" as const, lo: 2, hi: 9, grand: "Quelle masse de terreau" },
    { qui: metier("le coureur", "il"), v: "fait", cont: "tours de piste", u: "km" as const, lo: 0.4, hi: 1.6, grand: "Quelle distance" },
  ]);
  const { s, il } = M.qui();
  const n = d >= 3 ? entre(12, 25) : entre(3, 9);
  const x = decimal(M.lo, M.hi, peut(0.4));
  return {
    enonce: un([
      `${cap(s)} ${M.v} ${n} ${M.cont} de ${fr(x)} ${M.u} chacun.`,
      `${cap(s)} ${M.v} ${n} ${M.cont}. Chacun fait ${fr(x)} ${M.u}.`,
    ]),
    question: `${M.grand} cela fait-il en tout ?`,
    rep: r2(n * x), u: M.u, x: n, s: "×", y: x, calc: `${n} × ${fr(x)}`,
    faux: [r2(n + x), r2(n * x * 10), r2((n - 1) * x), r2(n * Math.floor(x) + (x - Math.floor(x)))],
    calcFaux: [`${n} + ${fr(x)}`, `${n} − ${fr(x)}`, `${n} ÷ ${fr(x)}`],
    phrase: (q) => `${cap(s)} ${M.v} ${q} en tout.`,
    methode: "La même mesure répétée plusieurs fois : on multiplie.",
    canvas: groupes(n, "", fr(x), "?", `${cap(M.cont)} (${M.u})`),
  };
}

/** Un partage dont le quotient est décimal : 7 ÷ 4 = 1,75. */
type Part2 = { txt: (S: string, n: number) => string; q: (il: string) => string; u: "€" | "m" | "L" | "kg"; phrase: (q: string) => string; part: string };
const PARTAGES: Part2[] = [
  { txt: (S, n) => `${n} amis partagent l'addition du restaurant : ${S} €, en parts égales.`, q: () => "Combien paie chacun ?", u: "€", phrase: (q) => `Chacun paie ${q}.`, part: "ami" },
  { txt: (S, n) => `${n} cousins s'offrent un cadeau à ${S} € et paient chacun la même somme.`, q: () => "Quelle somme chacun donne-t-il ?", u: "€", phrase: (q) => `Chacun donne ${q}.`, part: "cousin" },
  { txt: (S, n) => `La maîtresse partage une cagnotte de ${S} € entre ${n} équipes, autant pour chacune.`, q: () => "Combien reçoit chaque équipe ?", u: "€", phrase: (q) => `Chaque équipe reçoit ${q}.`, part: "équipe" },
  { txt: (S, n) => `Le menuisier coupe une planche de ${S} m en ${n} morceaux de même longueur.`, q: () => "Quelle est la longueur d'un morceau ?", u: "m", phrase: (q) => `Un morceau mesure ${q}.`, part: "morceau" },
  { txt: (S, n) => `La couturière découpe ${S} m de ruban en ${n} rubans égaux.`, q: () => "Combien mesure chaque ruban ?", u: "m", phrase: (q) => `Chaque ruban mesure ${q}.`, part: "ruban" },
  { txt: (S, n) => `La cuisinière verse ${S} L de soupe dans ${n} bocaux, autant dans chacun.`, q: () => "Quelle quantité de soupe y a-t-il dans chaque bocal ?", u: "L", phrase: (q) => `Il y a ${q} dans chaque bocal.`, part: "bocal" },
  { txt: (S, n) => `Le maraîcher répartit ${S} kg de pommes dans ${n} sacs de même masse.`, q: () => "Quelle est la masse d'un sac ?", u: "kg", phrase: (q) => `Un sac pèse ${q}.`, part: "sac" },
  { txt: (S, n) => `${n} randonneurs se partagent ${S} L d'eau, autant chacun.`, q: () => "Combien de litres d'eau a chaque randonneur ?", u: "L", phrase: (q) => `Chaque randonneur a ${q}.`, part: "randonneur" },
  { txt: (S, n) => `Le club achète ${n} maillots pour ${S} € en tout. Ils ont tous le même prix.`, q: () => "Combien coûte un maillot ?", u: "€", phrase: (q) => `Un maillot coûte ${q}.`, part: "maillot" },
  { txt: (S, n) => `L'électricien coupe un câble de ${S} m en ${n} morceaux égaux.`, q: () => "Combien mesure chaque morceau ?", u: "m", phrase: (q) => `Chaque morceau mesure ${q}.`, part: "morceau" },
];
export function pbPartageDec(d: number): Pb {
  const P = un(PARTAGES);
  let n: number;
  let S: number;
  do {
    n = un(d >= 3 ? [4, 5, 8, 20, 25] : [2, 4, 5, 8]);
    S = d >= 3 ? entre(21, 190) : entre(7, 59);
  } while (S % n === 0 || (S * 100) % n !== 0);
  const q = r2(S / n);
  const qe = Math.floor(S / n);
  const reste = S - qe * n;
  return {
    enonce: P.txt(F(S, P.u), n),
    question: P.q("il"),
    rep: q, u: P.u, x: S, s: "÷", y: n, calc: ec(S, "÷", n),
    faux: [qe, Number(`${qe}.${reste}`), S * n, S - n],
    calcFaux: [ec(S, "−", n), ec(S, "×", n), ec(S, "+", n)],
    phrase: P.phrase,
    methode: "On partage en parts égales : on divise. Quand il reste quelque chose, on continue la division après la virgule.",
    canvas: peut(0.5) ? pose(S, "÷", n) : groupes(n, P.part, null, F(S, P.u), `Le partage (${P.u})`),
  };
}

export function pbMesure(d: number, ecart: boolean): Pb {
  const M = tirer(MES);
  const { s, il } = M.qui();
  let a: number;
  let b: number;
  do {
    a = decimal(M.lo, M.hi, peut(0.5));
    b = d >= 3 && peut(0.4) ? entre(M.lo, M.hi) : decimal(M.lo, M.hi, peut(0.5));
  } while (a === b || Math.abs(a - b) < 0.3);
  const [m1, m2] = M.m;
  const [g, p] = a > b ? [a, b] : [b, a];
  const mg = a > b ? m1 : m2;
  const enonce = un([
    `${cap(m1)}, ${s} ${M.v} ${fr(a)} ${M.u}. ${cap(m2)}, ${il} ${M.v} ${fr(b)} ${M.u}.`,
    `${cap(s)} ${M.v} ${fr(a)} ${M.u} ${m1} et ${fr(b)} ${M.u} ${m2}.`,
    `${cap(s)} note ses mesures : ${fr(a)} ${M.u} ${m1}, ${fr(b)} ${M.u} ${m2}.`,
  ]);
  if (ecart)
    return {
      enonce,
      question: `${M.grand} ${inv(M.v, il)} de plus ${mg} ?`,
      rep: r2(g - p), u: M.u, x: g, s: "−", y: p, calc: ec(g, "−", p),
      faux: [virguleMal(g, p, "−"), r2(g + p), r2(g - p + 1), g],
      calcFaux: [ec(g, "+", p), ec(g, "×", p), ec(g, "÷", p)],
      phrase: (q) => `${cap(s)} a ${M.pp} ${q} de plus ${mg}.`,
      methode: "On compare deux mesures : on soustrait, virgule sous virgule (on peut ajouter des zéros : 8,5 = 8,50).",
      canvas: barre([{ label: cap(a > b ? m2 : m1), value: fr(p) }, { label: "écart", unknown: true }], fr(g), `${cap(mg)} (${M.u})`),
    };
  return {
    enonce,
    question: `${M.grand} ${inv(M.v, il)} en tout ?`,
    rep: r2(a + b), u: M.u, x: a, s: "+", y: b, calc: ec(a, "+", b),
    faux: [virguleMal(a, b, "+"), r2(g - p), r2(a + b + 1), r2(a + b - 0.1)],
    calcFaux: [ec(g, "−", p), ec(a, "×", b), ec(g, "÷", p)],
    phrase: (q) => `${cap(s)} a ${M.pp} ${q} en tout.`,
    methode: "On réunit deux mesures : on additionne, virgule sous virgule.",
    canvas: barre([{ label: cap(m1), value: fr(a) }, { label: cap(m2), value: fr(b) }], "?", `En tout (${M.u})`),
  };
}

/* ── Les durées ── */

export function pbDureeFin(): Pb {
  const A = tirer(ACTIVITES);
  const t0 = debut(A);
  const D = dureeDe(A);
  const t1 = t0 + D;
  const naif = `${Math.floor(t0 / 60) + Math.floor(D / 60)} h ${(t0 % 60) + (D % 60)}`;
  return {
    enonce: un([
      `${A.s} commence à ${heure(t0)} et dure ${duree(D)}.`,
      `${A.s} débute à ${heure(t0)}. ${cap(A.il)} dure ${duree(D)}.`,
      `${A.s} dure ${duree(D)}. ${cap(A.il)} commence à ${heure(t0)}.`,
    ]),
    question: un([`À quelle heure se termine-t-${A.il} ?`, `À quelle heure finit-${A.il} ?`, `Quelle heure sera-t-il à la fin ?`]),
    rep: t1, u: "h", x: t0, s: "+", y: D, calc: `${heure(t0)} + ${duree(D)}`,
    faux: [t1 + 60, t1 - 60, t0 + Math.floor(D / 60) * 60, t1 + 10],
    extra: (t0 % 60) + (D % 60) >= 60 ? [naif] : [],
    calcFaux: [],
    phrase: (q) => `${A.s} se termine à ${q}.`,
    methode: "On ajoute d'abord les heures, puis les minutes ; 60 minutes font 1 heure de plus.",
    canvas: peut(0.6) ? frise(heure(t0), "?", etapesFrise([{ label: duree(D), minutes: D }]), A.s) : horloge(t0, "Début"),
  };
}

export function pbDureeEcart(): Pb {
  const A = tirer(ACTIVITES);
  const t0 = debut(A);
  const D = dureeDe(A);
  const t1 = t0 + D;
  const h = Math.floor(t1 / 60) - Math.floor(t0 / 60);
  const m = (t1 % 60) - (t0 % 60);
  const naif = m < 0 ? `${h - 1} h ${m + 100} min` : "";
  return {
    enonce: un([
      `${A.s} commence à ${heure(t0)} et se termine à ${heure(t1)}.`,
      `${A.s} débute à ${heure(t0)}. ${cap(A.il)} finit à ${heure(t1)}.`,
      `${A.s} : début à ${heure(t0)}, fin à ${heure(t1)}.`,
    ]),
    question: un([`Combien de temps dure-t-${A.il} ?`, `Quelle est sa durée ?`, `Combien de temps cela dure-t-il ?`]),
    rep: D, u: "durée", x: t1, s: "−", y: t0, calc: `${heure(t1)} − ${heure(t0)}`,
    faux: [D + 60, D - 60, Math.abs(h) * 60 + Math.abs(m), D + 10],
    extra: naif ? [naif] : [],
    calcFaux: [],
    phrase: (q) => `${A.s} dure ${q}.`,
    methode: "On avance de l'heure de début jusqu'à l'heure pile suivante, puis heure par heure, puis jusqu'à la fin.",
    canvas: peut(0.5) ? horloges(t0, t1) : frise(heure(t0), heure(t1), etapesFrise([{ label: "?", minutes: D }]), A.s),
  };
}

export type TypeUn =
  | "total" | "reste" | "ecart" | "complement" | "fois" | "partage" | "groupement" | "foisPlus" | "plusQue"
  | "prixTotal" | "rendu" | "foisDec" | "partageDec" | "mesureTotal" | "mesureEcart" | "dureeFin" | "dureeEcart";
const FAB: Record<TypeUn, (d: number) => Pb> = {
  total: pbTotal, reste: pbReste, ecart: pbEcart, complement: pbComplement, fois: pbFois,
  partage: pbPartage, groupement: pbGroupement, foisPlus: pbFoisPlus, plusQue: pbPlusQue,
  prixTotal: pbPrixTotal, rendu: pbRendu, foisDec: pbFoisDec, partageDec: pbPartageDec,
  mesureTotal: (d) => pbMesure(d, false), mesureEcart: (d) => pbMesure(d, true),
  dureeFin: pbDureeFin, dureeEcart: pbDureeEcart,
};
export const pb = (types: TypeUn[], d: number) => FAB[un(types)](d);

/* ───────────────────────── Les problèmes à plusieurs étapes ───────────────────────── */

export type Pb2 = {
  enonce: string;
  question: string;
  rep: number;
  u: string;
  inter: number;
  /** L'unité du résultat intermédiaire (une durée avant une heure, par exemple). */
  uInter?: string;
  etapes: string;
  premier: string;
  premierFaux: string[];
  oubli: string;
  faux: number[];
  extra?: string[];
  phrase: (q: string) => string;
  canvas?: Canvas;
};

export function e1GainPerte(d: number): Pb2 {
  const c = stockA(d, true);
  const { s, il } = c.qui();
  const [a, b] = paire(d, c.max);
  let cc = entre(Math.ceil((a + b) * 0.25), Math.floor((a + b) * 0.85));
  if (cc === b) cc += 1;
  const [m1, m2] = c.m;
  const inter = a + b;
  return {
    enonce: un([
      `${cap(s)} a ${fr(a)} ${c.obj}. ${cap(m1)}, ${il} en ${c.gagne} ${fr(b)}. ${cap(m2)}, ${il} en ${c.moins} ${fr(cc)}.`,
      `Au début, ${s} a ${fr(a)} ${c.obj}. Puis ${il} en ${c.gagne} ${fr(b)}, et ${il} en ${c.moins} ${fr(cc)}.`,
    ]),
    question: un([`Combien ${de(c.obj)} ${s} a-t-${il} à la fin ?`, `Combien ${de(c.obj)} reste-t-il à la fin ?`]),
    rep: inter - cc, u: c.obj, inter,
    etapes: `${ec(a, "+", b)} = ${fr(inter)}, puis ${ec(inter, "−", cc)} = ${fr(inter - cc)}.`,
    premier: ec(a, "+", b),
    premierFaux: [ec(a, "×", b), ec(a, "+", cc), b > cc ? ec(b, "−", cc) : ec(cc, "−", b)],
    oubli: `il faut encore enlever les ${fr(cc)} ${c.obj}`,
    faux: [inter, inter + cc, a - cc, Math.abs(a - b - cc)],
    phrase: (q) => `À la fin, ${s} a ${q}.`,
    canvas: barre([{ label: "au début", value: fr(a) }, { label: "en plus", value: fr(b) }], "?", cap(c.obj), `Puis ${fr(cc)} en moins.`),
  };
}

export function e2DejaPlusGroupes(d: number): Pb2 {
  const c = tirer(GROUPES);
  const { s, il } = c.qui();
  const a = d >= 4 ? entre(1200, 9800) : entre(150, 950);
  const [n, k] = nk(d >= 4 ? 3 : 2, c);
  const inter = n * k;
  return {
    enonce: un([
      `${cap(s)} a déjà ${fr(a)} ${c.obj}. ${cap(il)} reçoit encore ${n} ${c.contPl} de ${k} ${c.obj}.`,
      `${cap(s)} a ${fr(a)} ${c.obj}. On lui livre ${n} ${c.contPl} de ${k} ${c.obj}.`,
    ]),
    question: un([`Combien ${de(c.obj)} a-t-${il} maintenant ?`, `Combien ${de(c.obj)} cela fait-il en tout ?`]),
    rep: a + inter, u: c.obj, inter,
    etapes: `${ec(n, "×", k)} = ${fr(inter)}, puis ${ec(a, "+", inter)} = ${fr(a + inter)}.`,
    premier: ec(n, "×", k),
    premierFaux: [ec(a, "+", n), ec(a, "×", n), ec(a, "+", k)],
    oubli: `il faut encore ajouter les ${fr(a)} ${c.obj} du début`,
    faux: [inter, a + n + k, (a + n) * k, a + k],
    phrase: (q) => `${cap(s)} a maintenant ${q}.`,
    canvas: barre([{ label: "déjà", value: fr(a) }, { label: `${n} × ${k}` }], "?", cap(c.obj)),
  };
}

export function e3GroupesMoins(d: number): Pb2 {
  const c = tirer(GROUPES.filter((g) => g.rangement));
  const { s, il } = c.qui();
  const [n, k] = nk(d >= 4 ? 3 : 2, c);
  const P = n * k;
  const cc = entre(Math.max(12, Math.ceil(P * 0.15)), Math.max(15, Math.floor(P * 0.6)));
  return {
    enonce: un([
      `${cap(s)} ${c.fait} ${n} ${c.contPl} de ${k} ${c.obj}. ${cap(il)} en donne ${fr(cc)}.`,
      `${cap(s)} ${c.fait} ${n} ${c.contPl} de ${k} ${c.obj}. Ensuite, ${il} en retire ${fr(cc)}.`,
    ]),
    question: un([`Combien ${de(c.obj)} reste-t-il ?`, `Combien ${de(c.obj)} lui reste-t-il ?`]),
    rep: P - cc, u: c.obj, inter: P,
    etapes: `${ec(n, "×", k)} = ${fr(P)}, puis ${ec(P, "−", cc)} = ${fr(P - cc)}.`,
    premier: ec(n, "×", k),
    premierFaux: [ec(n, "+", k), ec(k, "+", cc), ec(n, "×", cc)],
    oubli: `il faut encore enlever les ${fr(cc)} ${c.obj}`,
    faux: [P, P + cc, Math.abs(n + k - cc), P - k],
    phrase: (q) => `Il reste ${q}.`,
    canvas: barre([{ label: "en moins", value: fr(cc) }, { label: "il reste", unknown: true }], `${n} × ${k}`, cap(c.obj)),
  };
}

export function e4Achats(d: number): Pb2 {
  const { s, il } = prenom();
  const [A, B] = deuxArticles();
  const n = entre(2, d >= 4 ? 9 : 6);
  const p = prix(A.p);
  const q = prix(B.p);
  const inter = r2(n * p);
  return {
    enonce: un([
      `${s} achète ${n} ${A.pl} à ${eu(p)} € ${A.le} et ${B.un} à ${eu(q)} €.`,
      `${cap(au(un(LIEUX)))}, ${s} prend ${n} ${A.pl} à ${eu(p)} € ${A.le}, puis ${B.un} à ${eu(q)} €.`,
    ]),
    question: un(Q_PAYE(il)),
    rep: r2(inter + q), u: "€", inter,
    etapes: `${n} × ${eu(p)} = ${eu(inter)}, puis ${eu(inter)} + ${eu(q)} = ${eu(inter + q)}.`,
    premier: `${n} × ${eu(p)}`,
    premierFaux: [`${n} + ${eu(p)}`, `${eu(p)} + ${eu(q)}`, `${n} × ${eu(q)}`],
    oubli: `il faut encore ajouter les ${eu(q)} € de l'autre achat`,
    faux: [inter, r2(n + p + q), r2((p + q) * n), r2(p + q)],
    phrase: (x) => `${s} paie ${x} en tout.`,
    canvas: barre([{ label: `${n} × ${eu(p)} €` }, { label: B.nom, value: eu(q) }], "?", "Les achats (€)"),
  };
}

export function e5Rendu(d: number): Pb2 {
  const { s, il } = prenom();
  const A = un(ARTICLES);
  let n: number;
  let p: number;
  do {
    n = entre(2, d >= 4 ? 6 : 4);
    p = prix(A.p);
  } while (n * p >= 95);
  const B = [10, 20, 50, 100].find((b) => b > n * p + 1) ?? 100;
  const inter = r2(n * p);
  return {
    enonce: un([
      `${s} achète ${n} ${A.pl} à ${eu(p)} € ${A.le}. ${cap(il)} paie avec un billet de ${B} €.`,
      `${s} prend ${n} ${A.pl}. ${cap(A.le)} coûte ${eu(p)} €. ${cap(il)} donne un billet de ${B} €.`,
    ]),
    question: un([`Combien d'argent lui rend-on ?`, `Quelle somme lui rend-on ?`, `Combien la caissière lui rend-elle ?`]),
    rep: r2(B - inter), u: "€", inter,
    etapes: `${n} × ${eu(p)} = ${eu(inter)}, puis ${B} − ${eu(inter)} = ${eu(B - inter)}.`,
    premier: `${n} × ${eu(p)}`,
    premierFaux: [`${B} − ${n}`, `${n} + ${eu(p)}`, `${B} ÷ ${n}`],
    oubli: `il faut encore enlever ce prix des ${B} €`,
    faux: [inter, r2(B - p), renduNaif(B, inter), r2(B - inter + 1)],
    phrase: (x) => `On lui rend ${x}.`,
    canvas: argent(B),
  };
}

export function e6RecuPartage(d: number): Pb2 {
  const c = tirer(GROUPES);
  const { s, il } = c.qui();
  const n = entre(3, d >= 4 ? 12 : 8);
  const a = n * entre(15, 90);
  let b: number;
  do b = n * entre(12, 80); while (b === a);
  const inter = a + b;
  return {
    enonce: un([
      `${cap(s)} a ${fr(a)} ${c.obj}. ${cap(il)} en reçoit ${fr(b)} de plus. ${cap(il)} répartit tout dans ${n} ${c.contPl}, autant dans chaque ${c.cont}.`,
      `${cap(s)} a ${fr(a)} ${c.obj}, puis on lui en apporte ${fr(b)}. ${cap(il)} partage le tout entre ${n} ${c.contPl} identiques.`,
    ]),
    question: un([`Combien ${de(c.obj)} y a-t-il dans chaque ${c.cont} ?`, `Combien ${de(c.obj)} met-${il} dans chaque ${c.cont} ?`]),
    rep: inter / n, u: c.obj, inter,
    etapes: `${ec(a, "+", b)} = ${fr(inter)}, puis ${ec(inter, "÷", n)} = ${fr(inter / n)}.`,
    premier: ec(a, "+", b),
    premierFaux: [ec(a, "×", b), ec(n, "×", b), ec(a, "+", n)],
    oubli: `il faut encore partager en ${n} ${c.contPl}`,
    faux: [inter, a / n + b, b / n, inter - n],
    phrase: (q) => `Il y a ${q} dans chaque ${c.cont}.`,
    canvas: barre([{ label: "au début", value: fr(a) }, { label: "reçus", value: fr(b) }], "?", cap(c.obj), `Puis on partage en ${n} ${c.contPl}.`),
  };
}

export function e7DeuxGroupes(d: number): Pb2 {
  const c = tirer(GROUPES.filter((g) => g.ks.length > 1));
  const { s } = c.qui();
  const [n, k] = nk(d >= 4 ? 3 : 2, c);
  let m: number;
  let j: number;
  do {
    m = entre(12, 48);
    j = un(c.ks);
  } while (j === k || m === n);
  const inter = n * k;
  return {
    enonce: un([
      `${cap(s)} ${c.fait} ${n} ${c.contPl} de ${k} ${c.obj}, puis ${m} ${c.contPl} de ${j} ${c.obj}.`,
      `Il y a ${n} ${c.contPl} de ${k} ${c.obj} et ${m} ${c.contPl} de ${j} ${c.obj}.`,
    ]),
    question: un([`Combien ${de(c.obj)} y a-t-il en tout ?`, `Combien ${de(c.obj)} cela fait-il en tout ?`]),
    rep: inter + m * j, u: c.obj, inter,
    etapes: `${ec(n, "×", k)} = ${fr(inter)} et ${ec(m, "×", j)} = ${fr(m * j)}, puis ${ec(inter, "+", m * j)} = ${fr(inter + m * j)}.`,
    premier: ec(n, "×", k),
    premierFaux: [ec(n, "+", k), ec(n, "+", m), ec(k, "+", j)],
    oubli: `il faut encore ajouter les ${m} ${c.contPl} de ${j}`,
    faux: [inter, (n + m) * k, inter + m, n + k + m + j],
    phrase: (q) => `Il y a ${q} en tout.`,
    canvas: barre([{ label: `${n} × ${k}` }, { label: `${m} × ${j}` }], "?", cap(c.obj)),
  };
}

export function e8Objectif(d: number): Pb2 {
  const c = stockA(d);
  const { s, il } = c.qui();
  const N = paire(d, c.max)[0];
  const a = entre(Math.ceil(N * 0.2), Math.floor(N * 0.4));
  const b = entre(Math.ceil(N * 0.15), Math.floor(N * 0.35));
  const [m1, m2] = c.m;
  const inter = a + b;
  return {
    enonce: un([
      `${cap(s)} veut ${c.inf} ${fr(N)} ${c.obj}. ${cap(m1)}, ${il} en ${c.jour} ${fr(a)}. ${cap(m2)}, ${il} en ${c.jour} ${fr(b)}.`,
      `Objectif : ${fr(N)} ${c.obj}. ${cap(s)} en ${c.jour} ${fr(a)} ${m1} et ${fr(b)} ${m2}.`,
    ]),
    question: un([`Combien ${de(c.obj)} doit-${il} encore ${c.inf} ?`, `Combien ${de(c.obj)} lui manque-t-il ?`]),
    rep: N - inter, u: c.obj, inter,
    etapes: `${ec(a, "+", b)} = ${fr(inter)}, puis ${ec(N, "−", inter)} = ${fr(N - inter)}.`,
    premier: ec(a, "+", b),
    premierFaux: [ec(N, "+", a), ec(a, "×", b), ec(N, "+", b)],
    oubli: `il faut encore calculer ce qui manque pour arriver à ${fr(N)}`,
    faux: [inter, N - a, N - b, N - a + b],
    phrase: (q) => `${cap(s)} doit encore ${c.inf} ${q}.`,
    canvas: barre([{ label: cap(m1), value: fr(a) }, { label: cap(m2), value: fr(b) }, { label: "manque", unknown: true }], fr(N), cap(c.obj)),
  };
}

const VOYAGES = [
  { s: "Le car de la classe", il: "il" as Il, part: "part", arr: "arrive-t-il", pause: "une pause de" },
  { s: "Le camion de livraison", il: "il" as Il, part: "part", arr: "arrive-t-il", pause: "un arrêt de" },
  { s: "La famille de Lou", il: "elle" as Il, part: "part en voiture", arr: "arrive-t-elle", pause: "une pause de" },
  { s: "Le train", il: "il" as Il, part: "part", arr: "arrive-t-il", pause: "un arrêt en gare de" },
  { s: "La cycliste", il: "elle" as Il, part: "part", arr: "arrive-t-elle", pause: "une pause de" },
  { s: "Le randonneur", il: "il" as Il, part: "part", arr: "arrive-t-il au refuge", pause: "une pause pique-nique de" },
  { s: "Le bateau", il: "il" as Il, part: "quitte le port", arr: "arrive-t-il", pause: "une escale de" },
  { s: "L'équipe de foot", il: "elle" as Il, part: "part en minibus", arr: "arrive-t-elle", pause: "une pause de" },
];
export function e9Arrivee(): Pb2 {
  const V = un(VOYAGES);
  const t0 = entre(6, 14) * 60 + 5 * entre(0, 11);
  let t1: number;
  do t1 = 5 * entre(15, 60); while (t1 % 60 === 0);
  const t2 = 5 * entre(2, 9);
  const inter = t1 + t2;
  const fin = t0 + inter;
  const naif = (t0 % 60) + (inter % 60) >= 60 ? [`${Math.floor(t0 / 60) + Math.floor(inter / 60)} h ${(t0 % 60) + (inter % 60)}`] : [];
  return {
    enonce: un([
      `${V.s} ${V.part} à ${heure(t0)}. Le trajet dure ${duree(t1)}, et il faut ajouter ${V.pause} ${duree(t2)}.`,
      `${V.s} ${V.part} à ${heure(t0)}. Il y a ${duree(t1)} de route et ${V.pause} ${duree(t2)}.`,
    ]),
    question: `À quelle heure ${V.arr} ?`,
    rep: fin, u: "h", inter, uInter: "durée",
    etapes: `${duree(t1)} + ${duree(t2)} = ${duree(inter)}, puis ${heure(t0)} + ${duree(inter)} = ${heure(fin)}.`,
    premier: `${duree(t1)} + ${duree(t2)}`,
    premierFaux: [`${heure(t0)} + ${duree(t2)}`, `${duree(t1)} − ${duree(t2)}`, `${heure(t0)} − ${duree(t1)}`],
    oubli: `il faut encore ajouter la pause de ${duree(t2)}`,
    faux: [t0 + t1, fin + 60, fin - 60, fin + 10],
    extra: naif,
    phrase: (q) => `${V.s} arrive à ${q}.`,
    canvas: frise(heure(t0), "?", etapesFrise([{ label: `route ${duree(t1)}`, minutes: t1 }, { label: `pause ${duree(t2)}`, minutes: t2 }]), "Le voyage"),
  };
}

export function e10PrixUnitaire(): Pb2 {
  const A = un(ARTICLES.filter((a) => a.p[1] <= 16));
  let n1: number;
  let n2: number;
  do {
    n1 = entre(2, 6);
    n2 = entre(3, 12);
  } while (n1 === n2);
  const p = prix(A.p);
  const P = r2(n1 * p);
  const rep = r2(n2 * p);
  return {
    enonce: un([`${n1} ${A.pl} coûtent ${eu(P)} €.`, `${cap(au(un(LIEUX)))}, ${n1} ${A.pl} coûtent ${eu(P)} €. Chaque ${A.nom} a le même prix.`]),
    question: un([`Combien coûtent ${n2} ${A.pl} ?`, `Quel est le prix de ${n2} ${A.pl} ?`]),
    rep, u: "€", inter: p,
    etapes: `${eu(P)} ÷ ${n1} = ${eu(p)} (le prix d'un seul), puis ${n2} × ${eu(p)} = ${eu(rep)}.`,
    premier: `${eu(P)} ÷ ${n1}`,
    premierFaux: [`${eu(P)} × ${n2}`, `${eu(P)} + ${n2}`, `${n2} − ${n1}`],
    oubli: `${eu(p)} € est le prix d'UN seul : il faut encore multiplier par ${n2}`,
    faux: [p, r2(P * n2), r2(P + (n2 - n1)), r2(P + p)],
    phrase: (x) => `${n2} ${A.pl} coûtent ${x}.`,
    canvas: groupes(n1, A.nom, null, eu(P), `${cap(A.pl)} (€)`),
  };
}

export function e11MesureReste(): Pb2 {
  const M = un([
    { qui: "La couturière", il: "elle", rouleau: "un rouleau de tissu", morceaux: "morceaux", u: "m", lo: 1, hi: 3.5 },
    { qui: "L'électricien", il: "il", rouleau: "une bobine de câble", morceaux: "câbles", u: "m", lo: 2, hi: 6 },
    { qui: "Le jardinier", il: "il", rouleau: "un rouleau de grillage", morceaux: "morceaux", u: "m", lo: 1.5, hi: 4 },
    { qui: "La cuisinière", il: "elle", rouleau: "une marmite de soupe", morceaux: "bols", u: "L", lo: 0.25, hi: 0.5 },
    { qui: "Le décorateur", il: "il", rouleau: "un rouleau de ruban", morceaux: "rubans", u: "m", lo: 0.5, hi: 2 },
  ] as const);
  const x = M.u === "L" ? un([0.25, 0.3, 0.35, 0.4, 0.45]) : decimal(M.lo, M.hi, peut(0.5));
  const n = M.u === "L" ? entre(8, 20) : entre(3, 9);
  const inter = r2(n * x);
  const L = Math.ceil(inter) + entre(2, 15);
  const contient = M.u === "L" ? `contient ${L} L` : `mesure ${L} m`;
  const coupe = M.u === "L" ? `${M.qui} remplit ${n} ${M.morceaux} de ${fr(x)} L` : `${M.qui} coupe ${n} ${M.morceaux} de ${fr(x)} m`;
  return {
    enonce: `${un([`${M.qui} a ${M.rouleau} qui ${contient}.`, `${cap(M.rouleau)} ${contient}.`, `Au départ, ${M.rouleau} ${contient}.`])} ${coupe}.`,
    question: un([M.u === "L" ? "Quelle quantité de soupe reste-t-il ?" : "Quelle longueur reste-t-il ?", "Combien en reste-t-il ?"]),
    rep: r2(L - inter), u: M.u, inter,
    etapes: `${n} × ${fr(x)} = ${fr(inter)}, puis ${L} − ${fr(inter)} = ${fr(L - inter)}.`,
    premier: `${n} × ${fr(x)}`,
    premierFaux: [`${L} − ${fr(x)}`, `${L} ÷ ${n}`, `${n} + ${fr(x)}`],
    oubli: `il faut encore enlever ${fr(inter)} ${M.u} des ${L} ${M.u}`,
    faux: [inter, r2(L - x), r2(L - inter + 1), r2(L - n)],
    phrase: (q) => `Il reste ${q}.`,
    canvas: barre([{ label: `${n} × ${fr(x)}` }, { label: "reste", unknown: true }], `${L}`, `En tout (${M.u})`),
  };
}

export const ETAPES_3 = [e1GainPerte, e2DejaPlusGroupes, e3GroupesMoins, e4Achats, e5Rendu];
export const ETAPES_4: ((d: number) => Pb2)[] = [e6RecuPartage, e7DeuxGroupes, e8Objectif, () => e9Arrivee(), () => e10PrixUnitaire(), () => e11MesureReste()];
