// lib/tutor-v4/questionBank/cm2/maths/contenance-outils.ts
//
// ⭐ 15/11/2026 — LES GABARITS DES CONTENANCES DU CM2 (notion `contenance`).
// Avant : 15 à 28 squelettes par micro, 5 à 18 répétitions sur 20.
// Modèle : le jumeau CM1 (`cm1/maths/contenance-outils.ts`, 14/11), monté au
// niveau CM2 : écritures DÉCIMALES (1,5 L = 1 500 mL ; 250 mL = 0,25 L ;
// 0,75 L = 75 cL), l'hectolitre (1 hL = 100 L) et le décilitre, problèmes à
// plusieurs étapes à ★4-★5.
// Vocabulaire de la vidéo CM2 (`manim/scripts/cm2/contenance.py`) :
//   « la contenance, c'est ce qu'un récipient peut contenir » ; « même unité
//   d'abord : 1 L = 1 000 mL » ; 1 L est plus grand que 500 mL ; 1,5 L → × 1 000
//   → 1 500 mL ; « estimer = choisir une contenance raisonnable (pas exacte) »
//   avec les repères verre 250 mL, bouteille 1,5 L, seau 10 L ; défi : une
//   brique de jus de 1 L et une bouteille de sirop de 750 mL → 1 750 mL.
// Chaque gabarit tire une SITUATION (métiers, cuisine, sport, ferme, zoo…) ×
// une TOURNURE × des nombres.
// ⛔ CM2 = zéro clavier (`applyMathsKeyboardFree`) : que des QCM. Leurres =
// vraies erreurs d'élève : 1 L = 100 mL, comparer les NOMBRES sans convertir
// (« 1,25 L > 1,5 L car 125 > 15 »), lire 1,5 L comme « 1 L 5 mL », ajouter des
// L et des mL tels quels, estimer une baignoire à 2 L.
// ⛔ Unité OBLIGATOIRE dans l'énoncé ET dans les choix ; jamais deux choix de
// même valeur (« 50 mL » et « 5 cL » ne sont jamais proposés ensemble).
// Dessins : `contenance` (récipients étiquetés, récipient à estimer,
// conversion L ↔ mL SEULEMENT : la variante imprime « 1 L = 1000 mL »),
// `tableau_donnees` (tableau de conversion hL L dL cL mL), `number_line` (la
// graduation du verre doseur, le niveau en « ? »).
// ⚠️ La variante `comparaison` du canvas remplit davantage la bouteille la plus
// grande et écrit « gauche contient plus » : elle DONNE la réponse. Jamais ici.

import type { CanvasFigure, DifficultyLevel, TutorBankItemV4, TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import type { ContenanceCanvasData, NumberLineCanvasData, TableauDonneesCanvasData } from "@/lib/tutor-v4/types_canvas";
import { cap, entre, etapes, fr, melange, qcm, un, type Qcm } from "../../cm1/maths/trous-outils";

type G = Omit<TutorGeneratedQuestionV4, "canvas"> & { canvas?: CanvasFigure };

const tpl = (microId: string, n: string, difficulty: DifficultyLevel, hint: string, generate: () => G): TutorBankItemV4 =>
  ({
    kind: "template",
    id: `cm2_${microId}_tpl_${n}`,
    niveau: "cm2",
    matiere: "maths",
    notionId: "contenance",
    microId,
    difficulty,
    theme: "neutral",
    hint,
    tags: ["cm2", "contenance", microId, "template", "canvas"],
    generate: () => {
      const q = generate();
      return { ...q, text: elision(q.text), explanation: q.explanation ? elision(q.explanation) : q.explanation };
    },
  }) as TutorBankItemV4;

/** « de Enzo » → « d'Enzo », « que Inès » → « qu'Inès » (prénoms tirés au hasard). */
const elision = (t: string) =>
  t
    .replace(/\b(de|que) (?=[AEIOUÉÈ][a-zàâéèêëîïôûü])/g, (_m, w: string) => (w === "de" ? "d'" : "qu'"))
    .replace(/\bque (?=(un|une|il|elle)\b)/g, "qu'")
    .replace(/\bde (?=[éè])/g, "d'")
    // « combien de arrosoirs » → « combien d'arrosoirs »
    .replace(/\b([Cc]ombien) de (?=[aeiouyâ]|h[a-zé])/g, "$1 d'");

/* ───────────────────────── Les écritures (tout est en mL) ───────────────────────── */

const PAR = { hL: 100000, L: 1000, dL: 100, cL: 10, mL: 1 } as const;
type U = keyof typeof PAR;
const NOM_U: Record<U, string> = { hL: "hectolitres", L: "litres", dL: "décilitres", cL: "centilitres", mL: "millilitres" };
const ecr = (x: number, u: U) => `${fr(x / PAR[u])} ${u}`;
const L = (x: number) => ecr(x, "L");
const cL = (x: number) => ecr(x, "cL");
const mL = (x: number) => ecr(x, "mL");
/** « 2 L 35 cL » (x en mL, multiple de 10). */
const Lcl = (x: number) => {
  const l = Math.floor(x / 1000);
  const r = (x % 1000) / 10;
  if (l && r) return `${fr(l)} L ${fr(r)} cL`;
  return l ? `${fr(l)} L` : `${fr(r)} cL`;
};
/** « 1 L 500 mL » (x en mL). */
const Lml = (x: number) => {
  const l = Math.floor(x / 1000);
  const r = x % 1000;
  if (l && r) return `${fr(l)} L ${fr(r)} mL`;
  return l ? `${fr(l)} L` : `${fr(r)} mL`;
};
/** Une écriture simple « 75 cL », « 1,5 L », « 2 hL » → millilitres (null sinon). */
function lire(s: string): number | null {
  const m = s.match(/(^|\()\s*([\d\s,]+)\s(hL|L|dL|cL|mL)\)?$/);
  if (!m) return null;
  const v = Number(m[2].replace(/\s/g, "").replace(",", "."));
  return Number.isFinite(v) ? Math.round(v * PAR[m[3] as U] * 1000) / 1000 : null;
}
/** QCM de contenances : jamais deux choix de même VALEUR (« 50 mL » et « 5 cL »). */
function qcmC(juste: string, faux: string[]): Qcm {
  const vus = new Set<number | string>([lire(juste) ?? juste]);
  const out: string[] = [];
  for (const f of melange([...faux])) {
    const v = lire(f) ?? f;
    if (vus.has(v)) continue;
    vus.add(v);
    out.push(f);
  }
  return qcm(juste, out.slice(0, 3));
}
/** QCM de valeurs (en mL) écrites par `f` : leurres distincts, complétés par des voisins. */
function qcmV(juste: number, faux: number[], f: (v: number) => string, pas: number): Qcm {
  const r = (x: number) => Math.round(x * 1000) / 1000;
  const vals: number[] = [];
  for (const v of melange(faux.map(r))) if (v > 0 && v !== r(juste) && !vals.includes(v) && f(v) !== f(juste)) vals.push(v);
  for (let k = 1; vals.length < 3 && k < 30; k++) {
    for (const v of [r(juste + k * pas), r(juste - k * pas)]) if (v > 0 && !vals.includes(v) && vals.length < 3) vals.push(v);
  }
  return qcm(f(juste), vals.slice(0, 3).map(f));
}
/** QCM d'un nombre de récipients (« 8 pots »). */
function qcmN(juste: number, faux: number[], plur: string): Qcm {
  const e = (n: number) => `${fr(n)} ${n > 1 ? plur : plur.replace(/[sx]$/, "").replace(/s /, " ")}`;
  const vals: number[] = [];
  for (const v of melange([...faux])) if (Number.isInteger(v) && v > 0 && v !== juste && !vals.includes(v)) vals.push(v);
  for (let k = 1; vals.length < 3 && k < 30; k++) {
    for (const v of [juste + k, juste - k]) if (v > 0 && !vals.includes(v) && vals.length < 3) vals.push(v);
  }
  return qcm(e(juste), vals.slice(0, 3).map(e));
}

/** Un multiple de `m` entre min et max. */
const tire = (min: number, max: number, m = 1) => entre(Math.ceil(min / m), Math.floor(max / m)) * m;
function distincts(min: number, max: number, pas: number, n: number): number[] {
  const s = new Set<number>();
  for (let k = 0; s.size < n && k < 300; k++) s.add(tire(min, max, pas));
  return [...s];
}
/** Un multiple de `pas` qui n'est PAS un nombre entier de litres (pour forcer l'écriture décimale). */
function decimal(min: number, max: number, pas: number): number {
  for (let k = 0; k < 50; k++) {
    const x = tire(min, max, pas);
    if (x % 1000 !== 0) return x;
  }
  return tire(min, max, pas);
}
const entiers = (l: number[]) => l.filter((x) => Number.isInteger(Math.round(x * 1000) / 1000) && x > 0);
const liste = (l: string[]) => (l.length < 2 ? l.join("") : `${l.slice(0, -1).join(", ")} et ${l[l.length - 1]}`);
const NB: Record<number, string> = { 2: "deux", 3: "trois", 4: "quatre" };

/* ───────────────────────── Les personnes ───────────────────────── */

const NOMS_F = ["Nina", "Zoé", "Lou", "Inès", "Jade", "Maya", "Lina", "Emma", "Léa", "Sarah", "Chloé", "Aya", "Rose", "Nora", "Sofia", "Manon", "Yasmine"];
const NOMS_M = ["Téo", "Ravi", "Malo", "Sacha", "Amir", "Tom", "Yanis", "Noé", "Lucas", "Karim", "Hugo", "Enzo", "Malik", "Jules", "Bilal", "Arthur"];
type Perso = { nom: string; il: "il" | "elle"; txt: string };
function perso(metier?: readonly [string, string]): Perso {
  const f = Math.random() < 0.5;
  const nom = un(f ? NOMS_F : NOMS_M);
  const m = metier ? (f ? metier[0] : metier[1]) : "";
  return { nom, il: f ? "elle" : "il", txt: m && Math.random() < 0.75 ? `${nom}, ${m},` : nom };
}

/* ───────────────────────── Les dessins ───────────────────────── */

type Carte = { label: string; icon: string; contenance: string };
const cartes = (l: Carte[], questionLabel?: string): ContenanceCanvasData => ({
  kind: "contenance",
  variant: "objets",
  objets: l,
  ...(questionLabel ? { questionLabel } : {}),
  display: { showContenances: true, showLabels: true, showComparison: false },
});
const estimation = (label: string, icon: string, questionLabel: string): ContenanceCanvasData => ({
  kind: "contenance",
  variant: "estimation",
  objet: { label, icon },
  questionLabel,
  display: { showLabels: true },
});
/** ⚠️ La variante `conversion` imprime « 1 L = 1000 mL » : L ↔ mL SEULEMENT. */
const conversionLmL = (from: string, questionLabel: string): ContenanceCanvasData => ({
  kind: "contenance",
  variant: "conversion",
  from,
  to: "?",
  questionLabel,
});
const COLS: U[] = ["hL", "L", "dL", "cL", "mL"];
/**
 * Le tableau de conversion hL | L | dL | cL | mL : la quantité donnée x (mL)
 * écrite avec sa virgule après la colonne de son unité `de` (1,5 L → « 1, » en L
 * et « 5 » en dL), les colonnes suivantes vides ; la colonne `cible` en couleur.
 */
function tableau(x: number, de: U, cible: U): TableauDonneesCanvasData {
  const cols = de === "hL" || cible === "hL" || x >= 100000 ? COLS : COLS.slice(1);
  const ch = cols.map((u, i) => (i === 0 ? Math.floor(x / PAR[u]) : Math.floor(x / PAR[u]) % 10));
  const iDe = cols.indexOf(de);
  let dernier = iDe;
  ch.forEach((c, i) => {
    if (c !== 0 && i > dernier) dernier = i;
  });
  let premier = ch.findIndex((c) => c !== 0);
  if (premier < 0 || premier > iDe) premier = iDe;
  const cells = ch.map((c, i) => (i < premier || i > dernier ? "" : fr(c) + (i === iDe && dernier > iDe ? "," : "")));
  return {
    kind: "tableau_donnees",
    title: "Tableau de conversion",
    headers: cols,
    rows: [{ values: cells }],
    highlight: { col: cols.indexOf(cible) },
    display: { compact: true },
  };
}
/** Le rappel des égalités : 1 hL = 100 L ; 1 L = 100 cL = 1 000 mL. */
const RAPPEL: TableauDonneesCanvasData = {
  kind: "tableau_donnees",
  title: "Les égalités à retenir",
  headers: ["hL", "L", "cL", "mL"],
  rows: [{ values: ["1 hL", "100 L", "", ""] }, { values: ["", "1 L", "100 cL", "1 000 mL"] }, { values: ["", "", "1 cL", "10 mL"] }],
  display: { compact: true },
};
/** Un tableau de correspondance : 100 cL → 1 L ; 650 cL → ? */
function tableauCorresp(u1: string, u2: string, a: string, b: string, c: string, d: string): TableauDonneesCanvasData {
  return {
    kind: "tableau_donnees",
    title: "Tableau de conversion",
    headers: [u1, u2],
    rows: [{ values: [a, b] }, { values: [c, d] }],
    highlight: { cell: { row: 1, col: d === "?" ? 1 : 0 } },
    display: { compact: true },
  };
}
/** La graduation du verre doseur, le niveau du liquide marqué « ? ». */
function graduation(max: number, ecrit: number, pas: number, v: number): NumberLineCanvasData {
  const ecrites: number[] = [];
  for (let x = 0; x <= max; x += ecrit) ecrites.push(x);
  return {
    kind: "number_line",
    size: { width: 360, height: 100 },
    min: 0,
    max,
    step: ecrit,
    minorStep: pas,
    valeursEcrites: ecrites,
    points: [{ value: v, label: "?", color: "#2563eb" }],
    display: { showTicks: true, showValues: true, showPoints: true, showPointLabels: true, showZero: true },
  };
}

/* ───────────────────────── Les situations à comparer ───────────────────────── */

/** nom avec article, étiquette du dessin, icône. */
type O = readonly [string, string, string];
type Lot = {
  m?: readonly [string, string];
  intro: (p: Perso, nb: string) => string;
  obj: readonly O[];
  liq: string;
  /** Bornes et pas en mL ; `u` : l'unité des énoncés à une seule unité (le litre donne des décimaux). */
  min: number;
  max: number;
  pas: number;
  u: U;
};
const col = (n: string, c: string, i: string): O => [`${n} ${c}`, cap(c), i];

const LOTS: Lot[] = [
  { m: ["vendeuse de jus", "vendeur de jus"], intro: (p, nb) => `Au marché, ${p.txt} remplit ${nb} bouteilles de jus`, liq: "de jus", obj: [["la bouteille de jus d'orange", "Orange", "🍊"], ["la bouteille de jus de pomme", "Pomme", "🍏"], ["la bouteille de jus de mangue", "Mangue", "🥭"], ["la bouteille de jus de fraise", "Fraise", "🍓"]], min: 250, max: 2000, pas: 250, u: "L" },
  { m: ["pâtissière", "pâtissier"], intro: (p, nb) => `${p.txt} sort ${nb} récipients pour sa crème`, liq: "de crème", obj: [["la jatte", "Jatte", "🥣"], ["le pichet", "Pichet", "🫗"], ["la casserole", "Casserole", "🍲"], ["le saladier", "Saladier", "🥗"]], min: 500, max: 3000, pas: 100, u: "cL" },
  { m: ["pompière", "pompier"], intro: (p, nb) => `Au centre de secours, ${p.txt} vérifie ${nb} jerricans d'eau`, liq: "d'eau", obj: [col("le jerrican", "rouge", "🛢️"), col("le jerrican", "bleu", "🛢️"), col("le jerrican", "vert", "🛢️"), col("le jerrican", "jaune", "🛢️")], min: 5000, max: 25000, pas: 500, u: "L" },
  { m: ["jardinière", "jardinier"], intro: (p, nb) => `${p.txt} remplit ${nb} arrosoirs`, liq: "d'eau", obj: [col("l'arrosoir", "vert", "🪴"), col("l'arrosoir", "bleu", "🪴"), col("l'arrosoir", "rouge", "🪴"), col("l'arrosoir", "jaune", "🪴")], min: 2000, max: 12000, pas: 500, u: "L" },
  { m: ["fermière", "fermier"], intro: (p, nb) => `À la ferme, ${p.txt} remplit ${nb} bidons de lait`, liq: "de lait", obj: [col("le bidon", "A", "🥛"), col("le bidon", "B", "🥛"), col("le bidon", "C", "🥛"), col("le bidon", "D", "🥛")], min: 5000, max: 30000, pas: 500, u: "L" },
  { m: ["infirmière", "infirmier"], intro: (p, nb) => `À l'infirmerie, ${p.txt} range ${nb} flacons`, liq: "de savon", obj: [["le flacon de sirop", "Sirop", "🧴"], ["le flacon de désinfectant", "Désinfectant", "🧴"], ["le flacon de savon", "Savon", "🧼"], ["le flacon de crème solaire", "Crème solaire", "🧴"]], min: 50, max: 500, pas: 10, u: "mL" },
  { m: ["parfumeuse", "parfumeur"], intro: (p, nb) => `${p.txt} remplit ${nb} flacons de parfum`, liq: "de parfum", obj: [["le parfum à la rose", "Rose", "🌹"], ["le parfum au jasmin", "Jasmin", "🌼"], ["le parfum à la vanille", "Vanille", "🌸"], ["le parfum à la lavande", "Lavande", "💜"]], min: 30, max: 250, pas: 5, u: "mL" },
  { m: ["serveuse", "serveur"], intro: (p, nb) => `Au café, ${p.txt} remplit ${nb} carafes`, liq: "de citronnade", obj: [["la carafe d'eau", "Eau", "🫗"], ["la carafe de citronnade", "Citronnade", "🍋"], ["la carafe de sirop de menthe", "Menthe", "🌿"], ["la carafe de jus de pomme", "Pomme", "🍏"]], min: 500, max: 1500, pas: 50, u: "cL" },
  { m: ["entraîneuse de foot", "entraîneur de foot"], intro: (p, nb) => `Au stade, ${p.txt} remplit ${nb} gourdes`, liq: "d'eau", obj: [["la gourde de Lou", "Lou", "🚰"], ["la gourde de Malo", "Malo", "🚰"], ["la gourde d'Inès", "Inès", "🚰"], ["la gourde de Tom", "Tom", "🚰"]], min: 250, max: 1500, pas: 50, u: "L" },
  { m: ["cuisinière", "cuisinier"], intro: (p, nb) => `À la cantine, ${p.txt} remplit ${nb} marmites`, liq: "de soupe", obj: [["la marmite de soupe", "Soupe", "🍲"], ["la marmite de sauce tomate", "Sauce tomate", "🍅"], ["la marmite de compote", "Compote", "🍎"], ["la marmite de lait chaud", "Lait chaud", "🥛"]], min: 5000, max: 30000, pas: 500, u: "L" },
  { m: ["peintre", "peintre"], intro: (p, nb) => `${p.txt} ouvre ${nb} pots de peinture`, liq: "de peinture", obj: [col("le pot", "blanc", "🎨"), col("le pot", "bleu", "🎨"), col("le pot", "vert", "🎨"), col("le pot", "jaune", "🎨")], min: 250, max: 5000, pas: 250, u: "L" },
  { m: ["garagiste", "garagiste"], intro: (p, nb) => `Au garage, ${p.txt} range ${nb} bidons d'huile`, liq: "d'huile", obj: [col("le bidon", "A", "🛢️"), col("le bidon", "B", "🛢️"), col("le bidon", "C", "🛢️"), col("le bidon", "D", "🛢️")], min: 1000, max: 5000, pas: 500, u: "cL" },
  { m: ["soigneuse", "soigneur"], intro: (p, nb) => `Au zoo, ${p.txt} remplit ${nb} abreuvoirs`, liq: "d'eau", obj: [["l'abreuvoir des zèbres", "Zèbres", "🦓"], ["l'abreuvoir des girafes", "Girafes", "🦒"], ["l'abreuvoir des chèvres", "Chèvres", "🐐"], ["l'abreuvoir des lamas", "Lamas", "🦙"]], min: 20000, max: 90000, pas: 5000, u: "L" },
  { intro: (p, nb) => `Pour l'anniversaire de ${p.nom}, on achète ${nb} bouteilles`, liq: "de limonade", obj: [["la bouteille de limonade", "Limonade", "🥤"], ["la bouteille de jus de raisin", "Raisin", "🍇"], ["la bouteille de sirop de grenadine", "Grenadine", "🍒"], ["la bouteille d'eau pétillante", "Eau pétillante", "💧"]], min: 500, max: 2000, pas: 250, u: "L" },
  { m: ["laborantine", "laborantin"], intro: (p, nb) => `Au laboratoire, ${p.txt} remplit ${nb} éprouvettes`, liq: "d'eau", obj: [col("l'éprouvette", "A", "🧪"), col("l'éprouvette", "B", "🧪"), col("l'éprouvette", "C", "🧪"), col("l'éprouvette", "D", "🧪")], min: 20, max: 250, pas: 5, u: "mL" },
  { m: ["vendeuse d'animalerie", "vendeur d'animalerie"], intro: (p, nb) => `À l'animalerie, ${p.txt} remplit ${nb} aquariums`, liq: "d'eau", obj: [["l'aquarium des poissons rouges", "Poissons rouges", "🐠"], ["l'aquarium des guppys", "Guppys", "🐟"], ["l'aquarium des tortues", "Tortues", "🐢"], ["l'aquarium des néons", "Néons", "🐡"]], min: 20000, max: 200000, pas: 5000, u: "L" },
  { m: ["marchande de glaces", "marchand de glaces"], intro: (p, nb) => `${p.txt} prépare ${nb} bacs de sorbet`, liq: "de sirop de fraise", obj: [["le bac au citron", "Citron", "🍋"], ["le bac à la fraise", "Fraise", "🍓"], ["le bac à la mangue", "Mangue", "🥭"], ["le bac à la noix de coco", "Coco", "🥥"]], min: 1000, max: 5000, pas: 250, u: "L" },
  { m: ["barista", "barista"], intro: (p, nb) => `Au salon de thé, ${p.txt} remplit ${nb} théières`, liq: "de thé", obj: [["la théière rouge", "Rouge", "🫖"], ["la théière blanche", "Blanche", "🫖"], ["la théière verte", "Verte", "🫖"], ["la théière noire", "Noire", "🫖"]], min: 300, max: 1500, pas: 50, u: "cL" },
  { m: ["maître-nageuse", "maître-nageur"], intro: (p, nb) => `Au centre aquatique, ${p.txt} surveille ${nb} bassins`, liq: "d'eau", obj: [["le bassin des bébés nageurs", "Bébés nageurs", "🏊"], ["la pataugeoire", "Pataugeoire", "🌊"], ["le bassin à vagues", "Vagues", "🌊"], ["le bassin ludique", "Ludique", "🏊"]], min: 500000, max: 5000000, pas: 50000, u: "hL" },
  { m: ["maraîchère", "maraîcher"], intro: (p, nb) => `${p.txt} remplit ${nb} cuves d'arrosage`, liq: "d'eau", obj: [col("la cuve", "A", "🛢️"), col("la cuve", "B", "🛢️"), col("la cuve", "C", "🛢️"), col("la cuve", "D", "🛢️")], min: 100000, max: 1500000, pas: 50000, u: "hL" },
];
/** Les lots où mêler litres, centilitres et millilitres a du sens (de 25 cL à 5 L). */
const LOTS_MIX = LOTS.filter((l) => l.min <= 1000 && l.max >= 1500 && l.max <= 5000);
/** Les grands récipients, où l'hectolitre a du sens. */
const LOTS_H = LOTS.filter((l) => l.u === "hL");

/** Des récipients sans contenu imposé (avec article indéfini). */
const CONTENANTS: readonly O[] = [
  ["une bouteille", "Bouteille", "🧴"],
  ["une carafe", "Carafe", "🫗"],
  ["un pichet", "Pichet", "🫗"],
  ["une gourde", "Gourde", "🚰"],
  ["un bidon", "Bidon", "🛢️"],
  ["une jatte", "Jatte", "🥣"],
  ["un saladier", "Saladier", "🥗"],
  ["une casserole", "Casserole", "🍲"],
  ["un bocal", "Bocal", "🫙"],
  ["une théière", "Théière", "🫖"],
  ["un thermos", "Thermos", "🧴"],
];
const defini = (o: O) => o[0].replace(/^une /, "la ").replace(/^un /, "le ");
const fem = (n: string) => /^la /.test(n);
const lequel = (a: string, b: string) => (fem(a) && fem(b) ? "Laquelle" : "Lequel");
const premier = (o: O, x: string) => `${o[0]} contient ${x}`;

/* ───────────────────────── CONTENANCE_COMPARER ───────────────────────── */

const Q_PLUS = ["Quelle contenance est la plus grande ?", "Quel récipient contient le plus ? Choisis sa contenance.", "Choisis la plus grande contenance."];
const Q_MOINS = ["Quelle contenance est la plus petite ?", "Quel récipient contient le moins ? Choisis sa contenance.", "Choisis la plus petite contenance."];
const Q_SIGNE = ["Quelle écriture est juste ?", "Quel signe faut-il écrire entre les deux contenances ?", "Choisis la bonne comparaison.", "Quelle comparaison est vraie ?"];
const signe = (x: string, vx: number, y: string, vy: number) => (vx === vy ? `${x} = ${y}` : vx > vy ? `${x} > ${y}` : `${x} < ${y}`);

export const contenanceComparerGabarits: TutorBankItemV4[] = [
  // ★1 — 3 ou 4 récipients dans la MÊME unité (litres décimaux compris) : le plus grand ou le plus petit.
  tpl("contenance_comparer", "g01_le_plus_meme_unite", 1, "Les contenances ont la même unité : compare les nombres.", () => {
    const lot = un(LOTS);
    const p = perso(lot.m);
    const n = un([3, 3, 4]);
    const objs = melange([...lot.obj]).slice(0, n);
    const vals = distincts(lot.min, lot.max, lot.pas, n);
    const plus = Math.random() < 0.6;
    const cible = plus ? Math.max(...vals) : Math.min(...vals);
    const e = (x: number) => ecr(x, lot.u);
    const phr = liste(objs.map((o, i) => (i === 0 ? premier(o, e(vals[i])) : `${o[0]} ${e(vals[i])}`)));
    return {
      text: `${cap(lot.intro(p, NB[n]))} : ${phr}. ${un(plus ? Q_PLUS : Q_MOINS)}`,
      ...qcm(e(cible), vals.filter((v) => v !== cible).map(e)),
      explanation: etapes(
        "Avec la même unité, on compare directement les nombres (avec une virgule : d'abord la partie entière, puis les dixièmes).",
        `On range : ${[...vals].sort((a, b) => a - b).map(e).join(" < ")}.`,
        `La contenance la plus ${plus ? "grande" : "petite"} est ${e(cible)}.`,
      ),
      canvas: cartes(objs.map((o, i) => ({ label: o[1], icon: o[2], contenance: e(vals[i]) })), plus ? "Lequel contient le plus ?" : "Lequel contient le moins ?"),
    };
  }),

  // ★1 — deux contenances dans la même unité : le bon signe (piège : 1,25 L et 1,5 L).
  tpl("contenance_comparer", "g02_signe_meme_unite", 1, "Même unité : compare les nombres, la partie entière puis les dixièmes.", () => {
    const lot = un(LOTS);
    const p = perso(lot.m);
    const [o1, o2] = melange([...lot.obj]);
    let [a, b] = distincts(lot.min, lot.max, lot.pas, 2);
    if (Math.random() < 0.35) b = a + un([-1, 1]) * lot.pas;
    if (b <= 0 || b === a) b = a + lot.pas;
    const e = (x: number) => ecr(x, lot.u);
    const juste = signe(e(a), a, e(b), b);
    return {
      text: `${cap(lot.intro(p, "deux"))} : ${premier(o1, e(a))} et ${o2[0]} ${e(b)}. ${un(Q_SIGNE)}`,
      ...qcm(juste, [`${e(a)} > ${e(b)}`, `${e(a)} < ${e(b)}`, `${e(a)} = ${e(b)}`]),
      explanation: etapes(
        "Les deux contenances ont la même unité : on compare les nombres. Attention : 1,5 est plus grand que 1,25 (5 dixièmes contre 2 dixièmes).",
        `${fr(Math.max(a, b) / PAR[lot.u])} est plus grand que ${fr(Math.min(a, b) / PAR[lot.u])}.`,
        `On écrit ${juste}.`,
      ),
      canvas: cartes([{ label: o1[1], icon: o1[2], contenance: e(a) }, { label: o2[1], icon: o2[2], contenance: e(b) }], "Compare les deux contenances."),
    };
  }),

  // ★1 — ranger 3 contenances de la même unité (piège : ranger comme des mots).
  tpl("contenance_comparer", "g03_ranger_meme_unite", 1, "Même unité : range les nombres, du plus petit au plus grand.", () => {
    const lot = un(LOTS);
    const p = perso(lot.m);
    const objs = melange([...lot.obj]).slice(0, 3);
    const vals = distincts(lot.min, lot.max, lot.pas, 3);
    const e = (x: number) => ecr(x, lot.u);
    const croissant = Math.random() < 0.6;
    const sep = croissant ? " < " : " > ";
    const tri = [...vals].sort((a, b) => (croissant ? a - b : b - a));
    const motTri = [...vals].sort((a, b) => (croissant ? 1 : -1) * e(a).localeCompare(e(b)));
    const ch = (l: number[]) => l.map(e).join(sep);
    return {
      text: `${cap(lot.intro(p, "trois"))} : ${premier(objs[0], e(vals[0]))}, ${objs[1][0]} ${e(vals[1])} et ${objs[2][0]} ${e(vals[2])}. ${croissant ? un(["Range ces contenances de la plus petite à la plus grande.", "Quel rangement, du plus petit au plus grand, est juste ?"]) : un(["Range ces contenances de la plus grande à la plus petite.", "Quel rangement, du plus grand au plus petit, est juste ?"])}`,
      ...qcm(ch(tri), [ch(motTri), ch([...tri].reverse()), ch([tri[1], tri[0], tri[2]]), ch([tri[0], tri[2], tri[1]])]),
      explanation: etapes("Même unité : on range les nombres.", `${ch(tri)}.`, `Le rangement juste est ${ch(tri)}.`),
      canvas: cartes(objs.map((o, i) => ({ label: o[1], icon: o[2], contenance: e(vals[i]) })), "Range les contenances."),
    };
  }),

  // ★1 — l'exercice de la vidéo : 1 L ou 500 mL ? Un nombre entier de litres contre des millilitres.
  tpl("contenance_comparer", "g04_litres_ou_ml", 1, "Même unité d'abord : 1 L = 1 000 mL.", () => {
    const [o1, o2] = melange([...CONTENANTS]);
    const k = un([1, 1, 2, 2, 3, 4, 5]);
    const A = k * 1000;
    const B = Math.random() < 0.6 ? tire(100, A - 100, 50) : tire(A + 100, A + 1500, 50);
    const plus = Math.random() < 0.65;
    const cA = `${defini(o1)} (${L(A)})`;
    const cB = `${defini(o2)} (${mL(B)})`;
    const juste = (A > B) === plus ? cA : cB;
    const p = perso();
    const intro = un([
      `${p.nom} a ${o1[0]} de ${L(A)} et ${o2[0]} de ${mL(B)}.`,
      `Sur la table, il y a ${o1[0]} de ${L(A)} et ${o2[0]} de ${mL(B)}.`,
      `Pour le goûter, ${p.nom} prend ${o1[0]} de ${L(A)} et ${o2[0]} de ${mL(B)}.`,
      `${cap(o1[0])} contient ${L(A)} ; ${o2[0]} contient ${mL(B)}.`,
    ]);
    return {
      text: `${intro} ${plus ? un(["Lequel contient le plus ?", "Quel récipient a la plus grande contenance ?"]) : un(["Lequel contient le moins ?", "Quel récipient a la plus petite contenance ?"])}`,
      ...qcm(juste, [cA, cB, "les deux ont la même contenance"]),
      explanation: etapes(
        `Même unité d'abord : 1 L = 1 000 mL, donc ${L(A)} = ${mL(A)}.`,
        `On ne compare pas ${fr(k)} et ${fr(B)} : on compare ${mL(A)} et ${mL(B)}.`,
        `La réponse est : ${juste}.`,
      ),
      canvas: cartes([{ label: o1[1], icon: o1[2], contenance: L(A) }, { label: o2[1], icon: o2[2], contenance: mL(B) }], "Mets la même unité d'abord."),
    };
  }),

  // ★2 — un récipient en litres DÉCIMAUX, l'autre en cL ou mL : lequel contient le plus ?
  tpl("contenance_comparer", "g05_l_decimal_ou_cl", 2, "On met d'abord la même unité : 1 L = 100 cL = 1 000 mL.", () => {
    const lot = un(LOTS_MIX);
    const p = perso(lot.m);
    const [o1, o2] = melange([...lot.obj]);
    const A = decimal(Math.max(lot.min, 250), Math.min(lot.max, 4000), 250);
    const egal = Math.random() < 0.2;
    let B = egal ? A : A + (Math.random() < 0.6 ? -1 : 1) * tire(50, 600, 50);
    if (B <= 0) B = A + 250;
    const uB: U = Math.random() < 0.6 ? "cL" : "mL";
    const cA = `${o1[0]} (${L(A)})`;
    const cB = `${o2[0]} (${ecr(B, uB)})`;
    const meme = "les deux ont la même contenance";
    const plus = Math.random() < 0.7;
    const juste = A === B ? meme : (A > B) === plus ? cA : cB;
    const lq = lequel(o1[0], o2[0]);
    const q = plus
      ? un([`${lq} contient le plus ?`, "Un client veut le plus grand récipient : lequel lui donner ?", "Quel est le plus grand récipient ?"])
      : un([`${lq} contient le moins ?`, "Quel est le plus petit récipient ?"]);
    return {
      text: `${cap(lot.intro(p, "deux"))} : ${premier(o1, L(A))} et ${o2[0]} ${ecr(B, uB)}. ${q}`,
      ...qcm(juste, [cA, cB, meme]),
      explanation: etapes(
        "Avec deux unités différentes, on met d'abord la même unité. 120 est plus grand que 1,5, mais 120 cL ce n'est pas plus que 1,5 L !",
        `${L(A)} = ${ecr(A, uB)}. On compare ${ecr(A, uB)} et ${ecr(B, uB)}.`,
        A === B ? "Les deux contenances sont égales." : `La réponse est : ${juste}.`,
      ),
      canvas: cartes([{ label: o1[1], icon: o1[2], contenance: L(A) }, { label: o2[1], icon: o2[2], contenance: ecr(B, uB) }], "Mets les deux contenances dans la même unité."),
    };
  }),

  // ★2 — le bon signe entre des litres décimaux et des cL ou mL (piège : 0,75 L et 70 cL).
  tpl("contenance_comparer", "g06_signe_l_decimal", 2, "Convertis d'abord les litres : 1 L = 100 cL = 1 000 mL.", () => {
    const A = decimal(250, 5000, 250);
    const egal = Math.random() < 0.25;
    const u: U = Math.random() < 0.6 ? "cL" : "mL";
    const d = u === "cL" ? un([10, 50, 100, 150, 200, 250, 500]) : un([50, 100, 200, 300, 500]);
    const B = egal ? A : Math.max(10, A + (Math.random() < 0.6 ? -1 : 1) * d);
    const avant = Math.random() < 0.5;
    const x = avant ? L(A) : ecr(B, u);
    const y = avant ? ecr(B, u) : L(A);
    const vx = avant ? A : B;
    const vy = avant ? B : A;
    const juste = signe(x, vx, y, vy);
    const p = perso();
    const intro = un([
      `${p.nom} compare ${x} et ${y}.`,
      `Sur son cahier, ${p.nom} doit comparer ${x} et ${y}.`,
      `Compare ces deux contenances : ${x} et ${y}.`,
      `Au supermarché, deux bouteilles contiennent ${x} et ${y}.`,
      `Dans la cuisine, un pichet contient ${x} et une carafe ${y}.`,
      `Au club de sport, deux gourdes contiennent ${x} et ${y}.`,
    ]);
    return {
      text: `${intro} ${un(Q_SIGNE)}`,
      ...qcm(juste, [`${x} > ${y}`, `${x} < ${y}`, `${x} = ${y}`]),
      explanation: etapes(
        "On ne compare pas les nombres tels qu'ils sont écrits : on met d'abord la même unité.",
        `${L(A)} = ${ecr(A, u)}. On compare ${ecr(vx, u)} et ${ecr(vy, u)}.`,
        `On écrit ${juste}.`,
      ),
      canvas: u === "mL" && Math.random() < 0.5 ? conversionLmL(L(A), "Combien de millilitres ?") : tableau(A, "L", u),
    };
  }),

  // ★2 — trois bouteilles : 1,5 L, 140 cL et 1 600 mL.
  tpl("contenance_comparer", "g07_trois_unites_simples", 2, "Écris tout dans la même unité : 1 L = 100 cL = 1 000 mL.", () => {
    const lot = un(LOTS_MIX);
    const p = perso(lot.m);
    const objs = melange([...lot.obj]).slice(0, 3);
    const A = decimal(Math.max(lot.min, 500), Math.min(lot.max, 3000), 250);
    const haut = A + tire(50, 400, 50);
    const bas = Math.max(100, A - tire(50, 400, 50));
    const vals = melange([A, haut, bas]);
    const uh: U = un(["cL", "mL"] as U[]);
    const e = (x: number) => (x === A ? L(x) : x === haut ? ecr(x, uh) : ecr(x, uh === "cL" ? "mL" : "cL"));
    const plus = Math.random() < 0.6;
    const cible = plus ? haut : bas;
    const phr = liste(objs.map((o, i) => (i === 0 ? premier(o, e(vals[i])) : `${o[0]} ${e(vals[i])}`)));
    return {
      text: `${cap(lot.intro(p, "trois"))} : ${phr}. ${un(plus ? Q_PLUS : Q_MOINS)}`,
      ...qcm(e(cible), vals.filter((v) => v !== cible).map(e)),
      explanation: etapes(
        "On met d'abord la même unité, le millilitre : 1 L = 1 000 mL et 1 cL = 10 mL.",
        `On compare ${[...vals].sort((a, b) => a - b).map(mL).join(" < ")}.`,
        `La contenance la plus ${plus ? "grande" : "petite"} est ${e(cible)}.`,
      ),
      canvas: cartes(objs.map((o, i) => ({ label: o[1], icon: o[2], contenance: e(vals[i]) })), plus ? "Lequel contient le plus ?" : "Lequel contient le moins ?"),
    };
  }),

  // ★3 — ranger 4 récipients écrits en L (décimaux), dL, cL et mL.
  tpl("contenance_comparer", "g08_ranger_quatre_unites", 3, "Mets tout en millilitres : 1 L = 1 000 mL, 1 dL = 100 mL, 1 cL = 10 mL.", () => {
    const lot = un(LOTS_MIX);
    const p = perso(lot.m);
    const objs = melange([...lot.obj]).slice(0, 4);
    const vals = distincts(Math.max(lot.min, 200), Math.min(lot.max, 3000), 50, 12).slice(0, 4);
    while (vals.length < 4) vals.push(vals[vals.length - 1] + 350);
    const unites = new Map<number, U>();
    const choixU: U[] = melange<U>(["L", "cL", "mL", un<U>(["dL", "cL", "mL"])]);
    vals.forEach((v, i) => {
      let u = choixU[i];
      if (u === "L" && v % 50 !== 0) u = "cL";
      if (u === "dL" && v % 100 !== 0) u = "cL";
      if (u === "cL" && v % 10 !== 0) u = "mL";
      unites.set(v, u);
    });
    const e = (x: number) => ecr(x, unites.get(x) ?? "mL");
    const nom = (x: number) => objs[vals.indexOf(x)][1];
    const croissant = Math.random() < 0.65;
    const sep = croissant ? " < " : " > ";
    const tri = [...vals].sort((a, b) => (croissant ? a - b : b - a));
    const brut = (x: number) => x / PAR[unites.get(x) ?? "mL"];
    const triBrut = [...vals].sort((a, b) => (croissant ? brut(a) - brut(b) : brut(b) - brut(a)));
    const ch = (l: number[]) => l.map(nom).join(sep);
    const phr = liste(objs.map((o, i) => (i === 0 ? premier(o, e(vals[i])) : `${o[0]} ${e(vals[i])}`)));
    return {
      text: `${cap(lot.intro(p, "quatre"))} : ${phr}. ${croissant ? un(["Range les récipients du plus petit au plus grand.", "Dans quel ordre, du plus petit au plus grand ?"]) : un(["Range les récipients du plus grand au plus petit.", "Dans quel ordre, du plus grand au plus petit ?"])}`,
      ...qcm(ch(tri), [ch(triBrut), ch([...tri].reverse()), ch([tri[1], tri[0], tri[2], tri[3]]), ch([tri[0], tri[1], tri[3], tri[2]])]),
      explanation: etapes(
        "On met tout en millilitres : 1 L = 1 000 mL, 1 dL = 100 mL et 1 cL = 10 mL.",
        `${[...vals].sort((a, b) => a - b).map((v) => `${nom(v)} : ${mL(v)}`).join(" ; ")}.`,
        `L'ordre juste est ${ch(tri)}.`,
      ),
      canvas: cartes(objs.map((o, i) => ({ label: o[1], icon: o[2], contenance: e(vals[i]) })), "Range les récipients."),
    };
  }),

  // ★3 — quel récipient est assez grand ? (piège : le plus grand NOMBRE est en mL)
  tpl("contenance_comparer", "g09_assez_grand", 3, "Mets la quantité et les récipients dans la même unité.", () => {
    const lot = un(LOTS_MIX);
    const p = perso(lot.m);
    const objs = melange([...CONTENANTS]).slice(0, 3);
    const V = tire(600, 2800, 50);
    const S = Math.floor(V / 500) * 500 + 500;
    const i1 = V - tire(50, 200, 50);
    const i2 = Math.max(100, V - tire(250, 500, 50));
    const vals = melange([S, i1, i2]);
    const e = (x: number) => (x === S ? L(x) : x === i1 ? mL(x) : cL(x));
    const ch = (x: number) => `${defini(objs[vals.indexOf(x)])} (${e(x)})`;
    const qV = Math.random() < 0.5 ? cL(V) : L(V);
    return {
      text: `${p.txt} veut verser ${qV} ${lot.liq} dans un seul récipient. ${un([`${cap(p.il)} a`, "Il y a", "Sur la table, il y a"])} ${liste(objs.map((o, i) => `${o[0]} de ${e(vals[i])}`))}. ${un(["Lequel est assez grand ?", "Quel récipient peut tout contenir sans déborder ?", "Dans lequel peut-on tout verser ?"])}`,
      ...qcm(ch(S), [ch(i1), ch(i2)]),
      explanation: etapes(
        "On met tout dans la même unité avant de comparer : 1 L = 100 cL et 10 mL = 1 cL.",
        `${qV} = ${cL(V)} ; ${mL(i1)} = ${cL(i1)} ; ${L(S)} = ${cL(S)}. Seul ${cL(S)} est plus que ${cL(V)}.`,
        `Le récipient assez grand est ${ch(S)}.`,
      ),
      canvas: cartes(objs.map((o, i) => ({ label: o[1], icon: o[2], contenance: e(vals[i]) })), `Il faut verser ${qV}.`),
    };
  }),

  // ★3 — une seule comparaison est vraie (dont le piège « 75 cL > 1,5 L »).
  tpl("contenance_comparer", "g10_phrase_vraie", 3, "Pour chaque phrase, mets les deux contenances dans la même unité.", () => {
    const paire = () => {
      const A = tire(250, 5000, 250);
      const u: U = un(["cL", "cL", "mL", "dL"] as U[]);
      const B = u === "cL" ? tire(Math.max(50, A / 10), A * 2 + 500, 50) : u === "dL" ? tire(100, A * 2, 100) : tire(Math.max(50, A / 4), A * 2 + 500, 50);
      return { x: L(A), vx: A, y: ecr(B, u), vy: B };
    };
    const ecrire = (g: string, d: string) => (Math.random() < 0.5 ? `${g} > ${d}` : `${d} < ${g}`);
    const vraie = (() => {
      const q = paire();
      if (q.vx === q.vy) return Math.random() < 0.5 ? `${q.x} = ${q.y}` : `${q.y} = ${q.x}`;
      return q.vx > q.vy ? ecrire(q.x, q.y) : ecrire(q.y, q.x);
    })();
    const fausses = new Set<string>();
    for (let t = 0; fausses.size < 3 && t < 40; t++) {
      const q = paire();
      if (q.vx === q.vy) continue;
      fausses.add(q.vx > q.vy ? ecrire(q.y, q.x) : ecrire(q.x, q.y));
    }
    const p = perso(un([["maîtresse", "maître"], ["professeure", "professeur"]] as const));
    const intro = un([
      `${p.txt} écrit quatre comparaisons au tableau.`,
      `${p.nom} a écrit quatre comparaisons dans son cahier.`,
      "Voici quatre comparaisons de contenances.",
      `Au supermarché, ${p.nom} lit quatre étiquettes de bouteilles.`,
    ]);
    return {
      text: `${intro} ${un(["Une seule est vraie : laquelle ?", "Laquelle est juste ?", "Quelle comparaison est vraie ?"])}`,
      ...qcm(vraie, [...fausses]),
      explanation: etapes(
        "Regarde toujours les unités : 75 est plus grand que 1,5, mais 75 cL n'est pas plus que 1,5 L.",
        "1 L = 10 dL = 100 cL = 1 000 mL : on convertit, puis on compare les nombres.",
        `La comparaison vraie est ${vraie}.`,
      ),
      canvas: RAPPEL,
    };
  }),

  // ★3 — combien de récipients contiennent plus de 1,5 L (ou 1 L, 2 L) ?
  tpl("contenance_comparer", "g11_plus_que_le_seuil", 3, "Mets le seuil et chaque contenance en millilitres, puis compare.", () => {
    const lot = un(LOTS_MIX);
    const p = perso(lot.m);
    const objs = melange([...lot.obj]);
    const seuil = un([1000, 1500, 1500, 2000]);
    const vals = distincts(200, 3000, 50, 10).filter((v) => v !== seuil).slice(0, 4);
    const unites = vals.map((v): U => (v % 250 === 0 && Math.random() < 0.5 ? "L" : v % 10 === 0 ? un(["cL", "mL"] as U[]) : "mL"));
    const e = (i: number) => ecr(vals[i], unites[i]);
    const n = vals.filter((v) => v > seuil).length;
    const ecrN = (k: number) => (k === 0 ? "aucun récipient" : `${k} récipient${k > 1 ? "s" : ""}`);
    const brut = vals.filter((v, i) => v / PAR[unites[i]] > seuil / 1000).length;
    const phr = liste(objs.map((o, i) => (i === 0 ? premier(o, e(i)) : `${o[0]} ${e(i)}`)));
    return {
      text: `${cap(lot.intro(p, "quatre"))} : ${phr}. ${un([`Combien de récipients contiennent plus de ${L(seuil)} ?`, `Combien de ces récipients contiennent plus de ${L(seuil)} ?`])}`,
      ...qcm(ecrN(n), [ecrN(brut), ...[0, 1, 2, 3, 4].map(ecrN)]),
      explanation: etapes(
        `On compare chaque contenance à ${L(seuil)} = ${mL(seuil)}.`,
        vals.map((v, i) => (unites[i] === "mL" ? e(i) : `${e(i)} = ${mL(v)}`)).join(" ; ") + ".",
        `${cap(ecrN(n))} ${n > 1 ? "contiennent" : "contient"} plus de ${L(seuil)}.`,
      ),
      canvas: cartes(objs.map((o, i) => ({ label: o[1], icon: o[2], contenance: e(i) })), `Lesquels contiennent plus de ${L(seuil)} ?`),
    };
  }),

  // ★3 — les grands récipients : des hectolitres contre des litres (2,5 hL et 230 L).
  tpl("contenance_comparer", "g12_hectolitres", 3, "1 hL = 100 L : mets tout en litres avant de comparer.", () => {
    const lot = un(LOTS_H);
    const p = perso(lot.m);
    const [o1, o2] = melange([...lot.obj]);
    const A = tire(lot.min, lot.max, lot.pas);
    const egal = Math.random() < 0.15;
    let B = egal ? A : A + (Math.random() < 0.5 ? -1 : 1) * tire(10000, 80000, 10000);
    if (B <= 0) B = A + 30000;
    const cA = `${o1[0]} (${ecr(A, "hL")})`;
    const cB = `${o2[0]} (${L(B)})`;
    const meme = "les deux ont la même contenance";
    const plus = Math.random() < 0.6;
    const juste = A === B ? meme : (A > B) === plus ? cA : cB;
    return {
      text: `${cap(lot.intro(p, "deux"))} : ${premier(o1, ecr(A, "hL"))} et ${o2[0]} ${L(B)}. ${plus ? un([`${lequel(o1[0], o2[0])} contient le plus ?`, fem(o1[0]) && fem(o2[0]) ? "Laquelle est la plus grande ?" : "Lequel est le plus grand ?"]) : un([`${lequel(o1[0], o2[0])} contient le moins ?`, fem(o1[0]) && fem(o2[0]) ? "Laquelle est la plus petite ?" : "Lequel est le plus petit ?"])}`,
      ...qcm(juste, [cA, cB, meme]),
      explanation: etapes(
        "Même unité d'abord : 1 hL = 100 L (un hectolitre, c'est 10 seaux de 10 L).",
        `${ecr(A, "hL")} = ${L(A)}. On compare ${L(A)} et ${L(B)}.`,
        A === B ? "Les deux contenances sont égales." : `La réponse est : ${juste}.`,
      ),
      canvas: tableau(A, "hL", "L"),
    };
  }),
];

/* ───────────────────────── CONTENANCE_CONVERTIR ───────────────────────── */

/** `doseur` : en cuisine, on mesure au verre doseur gradué. */
type Ctx = { m?: readonly [string, string]; f: (p: Perso, x: string) => string; min: number; max: number; doseur?: boolean };
const CTX: Ctx[] = [
  { m: ["pâtissière", "pâtissier"], f: (p, x) => `La recette de crème de ${p.txt} demande ${x} de lait.`, min: 50, max: 5000, doseur: true },
  { m: ["vendeuse de jus", "vendeur de jus"], f: (p, x) => `Au marché, ${p.txt} presse ${x} de jus d'orange.`, min: 200, max: 20000 },
  { m: ["pompière", "pompier"], f: (p, x) => `${p.txt} remplit un seau avec ${x} d'eau.`, min: 1000, max: 15000 },
  { m: ["infirmière", "infirmier"], f: (p, x) => `${p.txt} prépare un flacon de ${x} d'eau salée.`, min: 20, max: 1000 },
  { m: ["jardinière", "jardinier"], f: (p, x) => `L'arrosoir de ${p.txt} contient ${x} d'eau.`, min: 1000, max: 12000 },
  { m: ["fermière", "fermier"], f: (p, x) => `Ce matin, ${p.txt} a trait ${x} de lait.`, min: 2000, max: 500000 },
  { m: ["cuisinière", "cuisinier"], f: (p, x) => `À la cantine, ${p.txt} verse ${x} de bouillon dans la soupe.`, min: 200, max: 30000, doseur: true },
  { m: ["serveuse", "serveur"], f: (p, x) => `${p.txt} remplit une carafe de ${x} de citronnade.`, min: 250, max: 2500 },
  { m: ["peintre", "peintre"], f: (p, x) => `${p.txt} ouvre un pot de ${x} de peinture.`, min: 250, max: 15000 },
  { m: ["garagiste", "garagiste"], f: (p, x) => `${p.txt} verse ${x} d'huile dans le moteur.`, min: 500, max: 6000 },
  { m: ["soigneuse", "soigneur"], f: (p, x) => `Au zoo, ${p.txt} verse ${x} d'eau dans l'abreuvoir des éléphants.`, min: 10000, max: 1000000 },
  { f: (p, x) => `La gourde de ${p.nom} contient ${x} d'eau.`, min: 250, max: 1500 },
  { m: ["marchande de glaces", "marchand de glaces"], f: (p, x) => `${p.txt} prépare ${x} de sirop de fraise pour ses sorbets.`, min: 50, max: 10000 },
  { m: ["barista", "barista"], f: (p, x) => `${p.txt} fait chauffer ${x} de lait pour les chocolats chauds.`, min: 200, max: 5000, doseur: true },
  { m: ["laborantine", "laborantin"], f: (p, x) => `Au laboratoire, ${p.txt} verse ${x} d'eau dans une éprouvette.`, min: 5, max: 500 },
  { f: (p, x) => `Pour le goûter, ${p.nom} achète ${x} de jus de pomme.`, min: 200, max: 6000 },
  { f: (p, x) => `${p.nom} prépare un biberon de ${x} de lait pour sa petite sœur.`, min: 100, max: 300 },
  { m: ["apicultrice", "apiculteur"], f: (p, x) => `${p.txt} a récolté ${x} de miel.`, min: 250, max: 50000 },
  { m: ["maître-nageuse", "maître-nageur"], f: (p, x) => `Au centre aquatique, ${p.txt} ajoute ${x} d'eau dans la pataugeoire.`, min: 50000, max: 5000000 },
  { m: ["maraîchère", "maraîcher"], f: (p, x) => `${p.txt} remplit sa cuve d'arrosage avec ${x} d'eau.`, min: 50000, max: 3000000 },
  { m: ["chauffeuse de camion-citerne", "chauffeur de camion-citerne"], f: (p, x) => `Le camion de ${p.txt} livre ${x} de lait à la laiterie.`, min: 100000, max: 5000000 },
  { m: ["aquariophile", "aquariophile"], f: (p, x) => `${p.txt} verse ${x} d'eau dans un grand aquarium.`, min: 20000, max: 500000 },
];
const ctx = (x: number) => {
  const l = CTX.filter((c) => x >= c.min && x <= c.max);
  return un(l.length ? l : CTX);
};
const enonce = (x: number) => {
  const c = ctx(x);
  return { c, p: perso(c.m) };
};
const QVERS = (u: U) => [
  `Combien de ${NOM_U[u]} cela fait-il ?`,
  `Écris cette quantité en ${NOM_U[u]}.`,
  `Quelle est cette quantité en ${u} ?`,
  `Convertis cette quantité en ${NOM_U[u]}.`,
];

export const contenanceConvertirGabarits: TutorBankItemV4[] = [
  // ★1 — l'égalité de la vidéo : des litres vers les millilitres, × 1 000 (piège : 3 L = 300 mL).
  tpl("contenance_convertir", "g01_l_vers_ml", 1, "1 L = 1 000 mL : on multiplie par 1 000.", () => {
    const n = un([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20]);
    const x = n * 1000;
    const { c, p } = enonce(x);
    return {
      text: `${c.f(p, L(x))} ${un(QVERS("mL"))}`,
      ...qcmV(x, [n * 100, n * 10, n * 10000], mL, 1000),
      explanation: etapes("Des litres vers les millilitres, on multiplie par 1 000 (1 L = 1 000 mL). Avec 100, ce seraient des centilitres !", `${fr(n)} × 1 000 = ${fr(x)}.`, `${L(x)} = ${mL(x)}.`),
      canvas: Math.random() < 0.6 ? conversionLmL(L(x), "Combien de millilitres ?") : tableau(x, "L", "mL"),
    };
  }),

  // ★1 — des millilitres vers les litres, ÷ 1 000 (4 000 mL → 4 L).
  tpl("contenance_convertir", "g02_ml_vers_l", 1, "1 000 mL = 1 L : on divise par 1 000.", () => {
    const n = un([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 20]);
    const x = n * 1000;
    const { c, p } = enonce(x);
    return {
      text: `${c.f(p, mL(x))} ${un(QVERS("L"))}`,
      ...qcmV(x, [n * 10000, n * 100000, x * 1000], L, 1000),
      explanation: etapes("Pour revenir aux litres, on divise par 1 000 (1 000 mL = 1 L).", `${fr(x)} ÷ 1 000 = ${fr(n)}.`, `${mL(x)} = ${L(x)}.`),
      canvas: conversionLmL(mL(x), "Combien de litres ?"),
    };
  }),

  // ★1 — les égalités à retenir, hectolitre et décilitre compris.
  tpl("contenance_convertir", "g03_egalites", 1, "Retiens : 1 hL = 100 L ; 1 L = 10 dL = 100 cL = 1 000 mL ; 1 cL = 10 mL.", () => {
    const R = un([
      { g: "1 L", de: "L" as U, u: "cL" as U, v: 1000, faux: [100, 10000, 10], mot: "1 litre" },
      { g: "1 L", de: "L" as U, u: "mL" as U, v: 1000, faux: [100, 10, 10000], mot: "1 litre" },
      { g: "1 cL", de: "cL" as U, u: "mL" as U, v: 10, faux: [100, 1000, 1], mot: "1 centilitre" },
      { g: "1 L", de: "L" as U, u: "dL" as U, v: 1000, faux: [10000, 100000, 100], mot: "1 litre" },
      { g: "1 dL", de: "dL" as U, u: "cL" as U, v: 100, faux: [1000, 10000, 10], mot: "1 décilitre" },
      { g: "1 hL", de: "hL" as U, u: "L" as U, v: 100000, faux: [10000, 1000000, 1000], mot: "1 hectolitre" },
      { g: "1 dL", de: "dL" as U, u: "mL" as U, v: 100, faux: [10, 1000, 1], mot: "1 décilitre" },
    ]);
    const p = perso(un([["pâtissière", "pâtissier"], ["cuisinière", "cuisinier"], ["vendeuse de jus", "vendeur de jus"], ["laborantine", "laborantin"]] as const));
    const e = (x: number) => ecr(x, R.u);
    const forme = entre(0, 3);
    const text =
      forme === 0
        ? `Complète : ${R.g} = … ${R.u}.`
        : forme === 1
          ? `Combien de ${NOM_U[R.u]} y a-t-il dans ${R.mot} ?`
          : forme === 2
            ? `${p.txt} vérifie son tableau de conversion. ${R.g} = combien de ${R.u} ?`
            : `Quelle égalité est juste ?`;
    const juste = forme === 3 ? `${R.g} = ${e(R.v)}` : e(R.v);
    const faux = R.faux.map((f) => (forme === 3 ? `${R.g} = ${e(f)}` : e(f)));
    return {
      text,
      ...qcm(juste, faux),
      explanation: etapes("Dans le tableau hL | L | dL | cL | mL, chaque unité vaut 10 fois la suivante, sauf de hL à L (1 hL = 100 L).", `${R.g} = ${e(R.v)}.`, `La réponse est ${juste}.`),
      canvas: tableau(R.v, R.de, R.u),
    };
  }),

  // ★1 — des litres vers les centilitres, × 100.
  tpl("contenance_convertir", "g04_l_vers_cl", 1, "1 L = 100 cL : on multiplie par 100.", () => {
    const n = un([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15]);
    const x = n * 1000;
    const { c, p } = enonce(x);
    const doseur = !!c.doseur && Math.random() < 0.6;
    const q = doseur
      ? `Son verre doseur est gradué en centilitres : combien de cL ${p.il === "elle" ? "doit-elle" : "doit-il"} compter ?`
      : un(QVERS("cL"));
    return {
      text: `${c.f(p, L(x))} ${q}`,
      ...qcmV(x, [n * 10, n * 10000, x * 10], cL, 1000),
      explanation: etapes("Des litres vers les centilitres, on multiplie par 100 (1 L = 100 cL).", `${fr(n)} × 100 = ${fr(n * 100)}.`, `${L(x)} = ${cL(x)}.`),
      canvas: tableau(x, "L", "cL"),
    };
  }),

  // ★2 — l'exemple de la vidéo : 1,5 L → × 1 000 → 1 500 mL (piège : 150 mL, ou « 1 L 5 mL »).
  tpl("contenance_convertir", "g05_l_decimal_vers_ml", 2, "1 L = 1 000 mL : multiplie le nombre décimal par 1 000.", () => {
    const x = decimal(250, 9750, 250);
    const l = Math.floor(x / 1000);
    const { c, p } = enonce(x);
    return {
      text: `${c.f(p, L(x))} ${un(QVERS("mL"))}`,
      ...qcmV(x, entiers([x / 10, x / 100, l * 1000 + (x % 1000) / 100, x * 10]), mL, 250),
      explanation: etapes(
        `Des litres vers les millilitres, on multiplie par 1 000 : 1 L = 1 000 mL${x % 1000 === 500 ? " et 0,5 L = 500 mL" : ""}.`,
        `${fr(x / 1000)} × 1 000 = ${fr(x)}.`,
        `${L(x)} = ${mL(x)}.`,
      ),
      canvas: Math.random() < 0.5 ? conversionLmL(L(x), "Combien de millilitres ?") : tableau(x, "L", "mL"),
    };
  }),

  // ★2 — des millilitres vers les litres décimaux : 250 mL = 0,25 L ; 1 500 mL = 1,5 L.
  tpl("contenance_convertir", "g06_ml_vers_l_decimal", 2, "1 000 mL = 1 L : divise par 1 000 (la virgule recule de trois rangs).", () => {
    const x = decimal(50, 4950, 50);
    const { c, p } = enonce(x);
    return {
      text: `${c.f(p, mL(x))} ${un(QVERS("L"))}`,
      ...qcmV(x, [x * 10, x * 100, x / 10], L, 100),
      explanation: etapes("Pour revenir aux litres, on divise par 1 000 : 1 000 mL = 1 L.", `${fr(x)} ÷ 1 000 = ${fr(x / 1000)}.`, `${mL(x)} = ${L(x)}.`),
      canvas: tableau(x, "mL", "L"),
    };
  }),

  // ★2 — centilitres ↔ millilitres : × 10 ou ÷ 10.
  tpl("contenance_convertir", "g07_cl_ml", 2, "1 cL = 10 mL : vers les mL on multiplie par 10, vers les cL on divise par 10.", () => {
    const n = un([5, 10, 15, 20, 25, 30, 33, 40, 45, 50, 60, 75, 80, 2, 3, 4, 8, 125, 150]);
    const x = n * 10;
    const { c, p } = enonce(x);
    if (Math.random() < 0.55) {
      return {
        text: `${c.f(p, cL(x))} ${un(QVERS("mL"))}`,
        ...qcmV(x, [n * 100, n, n * 1000], mL, 10),
        explanation: etapes("Des centilitres vers les millilitres, on multiplie par 10 (1 cL = 10 mL).", `${fr(n)} × 10 = ${fr(x)}.`, `${cL(x)} = ${mL(x)}.`),
        canvas: tableau(x, "cL", "mL"),
      };
    }
    return {
      text: `${c.f(p, mL(x))} ${un(QVERS("cL"))}`,
      ...qcmV(x, [x * 10, x / 10, x * 100], cL, 10),
      explanation: etapes("Des millilitres vers les centilitres, on divise par 10 (10 mL = 1 cL).", `${fr(x)} ÷ 10 = ${fr(n)}.`, `${mL(x)} = ${cL(x)}.`),
      canvas: tableau(x, "mL", "cL"),
    };
  }),

  // ★2 — des litres décimaux vers les centilitres : 0,75 L = 75 cL ; 1,5 L = 150 cL.
  tpl("contenance_convertir", "g08_l_decimal_vers_cl", 2, "1 L = 100 cL : multiplie le nombre décimal par 100.", () => {
    const x = decimal(50, 5000, 50);
    const { c, p } = enonce(x);
    return {
      text: `${c.f(p, L(x))} ${un(QVERS("cL"))}`,
      ...qcmV(x, [x * 10, x / 10, x * 100], cL, 100),
      explanation: etapes("Des litres vers les centilitres, on multiplie par 100 (1 L = 100 cL).", `${fr(x / 1000)} × 100 = ${fr(x / 10)}.`, `${L(x)} = ${cL(x)}.`),
      canvas: tableau(x, "L", "cL"),
    };
  }),

  // ★2 — le verre doseur : lire la graduation, puis convertir.
  tpl("contenance_convertir", "g09_verre_doseur", 2, "Lis d'abord la graduation, puis convertis.", () => {
    const p = perso(un([["pâtissière", "pâtissier"], ["cuisinière", "cuisinier"], ["barista", "barista"], ["laborantine", "laborantin"]] as const));
    const liq = un(["du lait", "de l'eau", "de la crème", "du jus d'orange", "du sirop"]);
    const cas = entre(0, 2);
    if (cas === 0) {
      const v = tire(5, 95, 5);
      const x = v * 10;
      return {
        text: `${p.txt} verse ${liq} dans un verre doseur gradué en centilitres. Le niveau arrive au repère « ? ». ${un(["Combien de millilitres a-t-on versé ?", "Quelle quantité est-ce, en millilitres ?"])}`,
        ...qcmV(x, [v, v * 100, (v + 5) * 10, (v - 5) * 10], mL, 50),
        explanation: etapes("On lit la graduation en centilitres (un petit trait = 5 cL), puis on multiplie par 10 : 1 cL = 10 mL.", `Le niveau est à ${fr(v)} cL ; ${fr(v)} × 10 = ${fr(x)}.`, `On a versé ${mL(x)}.`),
        canvas: graduation(100, 10, 5, v),
      };
    }
    if (cas === 1) {
      const v = tire(50, 950, 50);
      return {
        text: `${p.txt} verse ${liq} dans un verre doseur gradué en millilitres. Le niveau arrive au repère « ? ». ${un(["Combien de centilitres a-t-on versé ?", "Quelle quantité est-ce, en centilitres ?"])}`,
        ...qcmV(v, [v * 10, v / 10, v + 50, v - 50], cL, 50),
        explanation: etapes("On lit la graduation en millilitres (un petit trait = 50 mL), puis on divise par 10 : 10 mL = 1 cL.", `Le niveau est à ${fr(v)} mL ; ${fr(v)} ÷ 10 = ${fr(v / 10)}.`, `On a versé ${cL(v)}.`),
        canvas: graduation(1000, 100, 50, v),
      };
    }
    // gradué en mL jusqu'à 1 000 → combien de LITRES (décimal) ?
    const v = tire(50, 950, 50);
    return {
      text: `${p.txt} verse ${liq} dans un verre doseur gradué en millilitres. Le niveau arrive au repère « ? ». ${un(["Combien de litres a-t-on versé ?", "Écris cette quantité en litres."])}`,
      ...qcmV(v, [v * 10, v * 100, v / 10], L, 100),
      explanation: etapes("On lit la graduation en millilitres (un petit trait = 50 mL), puis on divise par 1 000 : 1 000 mL = 1 L.", `Le niveau est à ${fr(v)} mL ; ${fr(v)} ÷ 1 000 = ${fr(v / 1000)}.`, `On a versé ${L(v)}.`),
      canvas: graduation(1000, 100, 50, v),
    };
  }),

  // ★3 — l'hectolitre : 2,5 hL = 250 L ; 350 L = 3,5 hL.
  tpl("contenance_convertir", "g10_hectolitres", 3, "1 hL = 100 L : vers les litres on multiplie par 100, vers les hectolitres on divise par 100.", () => {
    const x = tire(50000, 3000000, 10000);
    const { c, p } = enonce(x);
    if (Math.random() < 0.5 && x % 50000 === 0) {
      return {
        text: `${c.f(p, ecr(x, "hL"))} ${un(QVERS("L"))}`,
        ...qcmV(x, [x / 10, x * 10, x / 100], L, 10000),
        explanation: etapes("Des hectolitres vers les litres, on multiplie par 100 (1 hL = 100 L).", `${fr(x / 100000)} × 100 = ${fr(x / 1000)}.`, `${ecr(x, "hL")} = ${L(x)}.`),
        canvas: tableau(x, "hL", "L"),
      };
    }
    return {
      text: `${c.f(p, L(x))} ${un(QVERS("hL"))}`,
      ...qcmV(x, [x * 10, x / 10, x * 100], (v) => ecr(v, "hL"), 50000),
      explanation: etapes("Des litres vers les hectolitres, on divise par 100 (100 L = 1 hL).", `${fr(x / 1000)} ÷ 100 = ${fr(x / 100000)}.`, `${L(x)} = ${ecr(x, "hL")}.`),
      canvas: tableauCorresp("litres (L)", "hectolitres (hL)", "100", "1", fr(x / 1000), "?"),
    };
  }),

  // ★3 — le décilitre, avec des décimaux : 1,5 L → 15 dL ; 2,5 dL → 25 cL ; 25 dL → 2,5 L ; 45 cL → 4,5 dL.
  tpl("contenance_convertir", "g11_decilitre", 3, "Dans le tableau, chaque colonne vaut 10 fois la suivante : 1 L = 10 dL, 1 dL = 10 cL.", () => {
    const S = un([
      { de: "L" as U, vers: "dL" as U, x: decimal(500, 9500, 500) },
      { de: "dL" as U, vers: "cL" as U, x: tire(150, 2950, 50) },
      { de: "dL" as U, vers: "L" as U, x: decimal(500, 9500, 100) },
      { de: "cL" as U, vers: "dL" as U, x: tire(150, 2950, 50) },
      { de: "dL" as U, vers: "mL" as U, x: tire(150, 2950, 50) },
    ]);
    const { c, p } = enonce(S.x);
    const k = PAR[S.de] / PAR[S.vers];
    const e = (v: number) => ecr(v, S.vers);
    return {
      text: `${c.f(p, ecr(S.x, S.de))} ${un(QVERS(S.vers))}`,
      ...qcmV(S.x, [S.x * 10, S.x / 10, S.x * 100, S.x / 100], e, PAR[S.vers]),
      explanation: etapes(
        k > 1 ? `Vers une unité plus petite, on multiplie : 1 ${S.de} = ${fr(k)} ${S.vers}.` : `Vers une unité plus grande, on divise : ${fr(1 / k)} ${S.de} = 1 ${S.vers}.`,
        k > 1 ? `${fr(S.x / PAR[S.de])} × ${fr(k)} = ${fr(S.x / PAR[S.vers])}.` : `${fr(S.x / PAR[S.de])} ÷ ${fr(1 / k)} = ${fr(S.x / PAR[S.vers])}.`,
        `${ecr(S.x, S.de)} = ${e(S.x)}.`,
      ),
      canvas: tableau(S.x, S.de, S.vers),
    };
  }),

  // ★3 — une écriture en deux unités : 2 L 35 cL → cL ; 1 L 500 mL → L décimal ; 1 L 250 mL → mL.
  tpl("contenance_convertir", "g12_deux_unites", 3, "Convertis d'abord les litres, puis ajoute le reste.", () => {
    const l = entre(1, 6);
    const cas = entre(0, 2);
    if (cas === 0) {
      const r = tire(5, 95, 5);
      const x = l * 1000 + r * 10;
      const { c, p } = enonce(x);
      return {
        text: `${c.f(p, Lcl(x))} ${un(QVERS("cL"))}`,
        ...qcmV(x, [(l + r) * 10, (l * 1000 + r) * 10, (l * 10 + r) * 10], cL, 100),
        explanation: etapes("On convertit les litres en centilitres (× 100), puis on ajoute les centilitres.", `${fr(l)} L = ${fr(l * 100)} cL ; ${fr(l * 100)} + ${fr(r)} = ${fr(l * 100 + r)}.`, `${Lcl(x)} = ${cL(x)}.`),
        canvas: tableau(x, "cL", "cL"),
      };
    }
    if (cas === 1) {
      const r = tire(50, 950, 50);
      const x = l * 1000 + r;
      const { c, p } = enonce(x);
      return {
        text: `${c.f(p, Lml(x))} ${un(QVERS("L"))}`,
        ...qcmV(x, entiers([l * 1000 + r / 10, l * 1000 + r / 100, l * 1000 + r * 10]), L, 100),
        explanation: etapes("On écrit les millilitres en litres (÷ 1 000), puis on les ajoute aux litres.", `${fr(r)} mL = ${fr(r / 1000)} L ; ${fr(l)} + ${fr(r / 1000)} = ${fr(x / 1000)}.`, `${Lml(x)} = ${L(x)}.`),
        canvas: tableau(x, "mL", "L"),
      };
    }
    const r = tire(50, 950, 50);
    const x = l * 1000 + r;
    const { c, p } = enonce(x);
    return {
      text: `${c.f(p, Lml(x))} ${un(QVERS("mL"))}`,
      ...qcmV(x, [l + r, l * 100 + r, l * 10000 + r], mL, 1000),
      explanation: etapes("On convertit les litres en millilitres (× 1 000), puis on ajoute les millilitres.", `${fr(l)} L = ${fr(l * 1000)} mL ; ${fr(l * 1000)} + ${fr(r)} = ${fr(x)}.`, `${Lml(x)} = ${mL(x)}.`),
      canvas: tableau(x, "mL", "mL"),
    };
  }),

  // ★3 — convertir pour enlever : une bouteille de 1,5 L, on en verse 25 cL, combien reste-t-il ?
  tpl("contenance_convertir", "g13_reste_apres_conversion", 3, "D'abord la même unité : 1 L = 100 cL. Puis on enlève.", () => {
    const N = un([1000, 1500, 2000, 2500, 1500, 750]);
    const b = tire(5, Math.min(N / 10 - 5, 50), 5);
    const r = N / 10 - b;
    const p = perso(un([["pâtissière", "pâtissier"], ["serveuse", "serveur"], ["cuisinière", "cuisinier"], ["vendeuse de jus", "vendeur de jus"], ["barista", "barista"], ["infirmière", "infirmier"]] as const));
    const liq = un(["de crème", "de lait", "de jus de pomme", "de sirop", "de citronnade", "d'eau"]);
    const rec = un(["un bol", "une casserole", "un verre", "un saladier", "une tasse", "une gourde"]);
    return {
      text: `${p.txt} a une bouteille de ${L(N)} ${liq}. ${cap(p.il)} en verse ${fr(b)} cL dans ${rec}. ${un(["Combien de centilitres reste-t-il dans la bouteille ?", "Quelle quantité reste-t-il, en cL ?"])}`,
      ...qcmV(r * 10, entiers([Math.abs(b - N / 1000) * 10, (N - b) * 10, (N / 10 + b) * 10, (N / 100 - b) * 10]), cL, 50),
      explanation: etapes("D'abord la même unité : 1 L = 100 cL. Puis on enlève.", `${L(N)} = ${fr(N / 10)} cL ; ${fr(N / 10)} − ${fr(b)} = ${fr(r)}.`, `Il reste ${fr(r)} cL.`),
      canvas: cartes([{ label: "Bouteille", icon: "🧴", contenance: L(N) }, { label: "Versé", icon: "🥣", contenance: `${fr(b)} cL` }], "Combien reste-t-il ?"),
    };
  }),

  // ★3 — conversion en situation, dans tous les sens, avec des décimaux.
  tpl("contenance_convertir", "g14_situation_tous_sens", 3, "Vers une unité plus petite, on multiplie ; vers une unité plus grande, on divise.", () => {
    const sens = un([
      { de: "L" as U, vers: "cL" as U, x: decimal(250, 9750, 250) },
      { de: "cL" as U, vers: "L" as U, x: decimal(250, 9750, 50) },
      { de: "mL" as U, vers: "cL" as U, x: tire(10, 300, 5) * 10 },
      { de: "cL" as U, vers: "mL" as U, x: tire(10, 300, 5) * 10 },
      { de: "mL" as U, vers: "L" as U, x: decimal(100, 9900, 100) },
      { de: "hL" as U, vers: "L" as U, x: tire(1, 40, 1) * 50000 },
    ]);
    const { c, p } = enonce(sens.x);
    const k = PAR[sens.de] / PAR[sens.vers];
    const e = (v: number) => ecr(v, sens.vers);
    const faux = [sens.x * 10, sens.x / 10, k > 1 ? sens.x / 100 : sens.x * 100];
    return {
      text: `${c.f(p, ecr(sens.x, sens.de))} ${un(QVERS(sens.vers))}`,
      ...qcmV(sens.x, faux, e, PAR[sens.vers] * 10),
      explanation: etapes(
        k > 1 ? `Vers une unité plus petite, on multiplie : 1 ${sens.de} = ${fr(k)} ${sens.vers}.` : `Vers une unité plus grande, on divise : ${fr(1 / k)} ${sens.de} = 1 ${sens.vers}.`,
        k > 1 ? `${fr(sens.x / PAR[sens.de])} × ${fr(k)} = ${fr(sens.x / PAR[sens.vers])}.` : `${fr(sens.x / PAR[sens.de])} ÷ ${fr(1 / k)} = ${fr(sens.x / PAR[sens.vers])}.`,
        `${ecr(sens.x, sens.de)} = ${e(sens.x)}.`,
      ),
      canvas: tableau(sens.x, sens.de, sens.vers),
    };
  }),
];

/* ───────────────────────── CONTENANCE_ESTIMER ───────────────────────── */

type Ob = {
  def: string;
  indef: string;
  label: string;
  icon: string;
  /** La contenance juste (environ), puis des leurres très loin (★1) et proches (×10, ÷10) (★3). */
  juste: string;
  loin: string[];
  proche: string[];
  /** L'unité adaptée : petit récipient → mL ou cL ; grand → L ; très grand → L ou hL. */
  u: U;
  qui?: readonly [string, string];
};
const ob = (def: string, indef: string, label: string, icon: string, juste: string, loin: string[], proche: string[], u: U, qui?: readonly [string, string]): Ob => ({ def, indef, label, icon, juste, loin, proche, u, qui });
const OBJETS: Ob[] = [
  ob("la petite cuillère", "une petite cuillère", "Petite cuillère", "🥄", "5 mL", ["5 L", "10 L", "50 L"], ["50 mL", "1 L", "50 cL"], "mL", ["cuisinière", "cuisinier"]),
  ob("la cuillère à soupe", "une cuillère à soupe", "Cuillère à soupe", "🥄", "15 mL", ["15 L", "150 L", "50 L"], ["150 mL", "1,5 L", "1 mL"], "mL", ["cuisinière", "cuisinier"]),
  ob("le verre", "un verre", "Verre", "🥛", "250 mL", ["25 L", "250 L", "2 mL"], ["2,5 L", "25 mL", "2 L"], "mL", ["serveuse", "serveur"]),
  ob("la tasse", "une tasse", "Tasse", "☕", "20 cL", ["20 L", "200 L", "2 mL"], ["2 L", "2 cL", "20 mL"], "cL", ["barista", "barista"]),
  ob("le bol", "un bol", "Bol", "🥣", "50 cL", ["50 L", "500 L", "5 mL"], ["5 L", "5 cL", "3 L"], "cL", ["cuisinière", "cuisinier"]),
  ob("la canette", "une canette", "Canette", "🥫", "33 cL", ["33 L", "330 L", "3 mL"], ["3,3 L", "33 mL", "3 L"], "cL"),
  ob("la gourde d'élève", "une gourde d'élève", "Gourde", "🚰", "0,5 L", ["50 L", "5 mL", "20 L"], ["5 L", "50 mL", "10 L"], "L", ["entraîneuse de foot", "entraîneur de foot"]),
  ob("la bouteille d'eau", "une bouteille d'eau", "Bouteille d'eau", "🧴", "1,5 L", ["1,5 mL", "150 L", "15 mL"], ["15 L", "15 cL", "5 L"], "L", ["vendeuse de jus", "vendeur de jus"]),
  ob("la brique de lait", "une brique de lait", "Brique de lait", "🥛", "1 L", ["1 mL", "100 L", "10 mL"], ["10 L", "10 cL", "50 L"], "L", ["fermière", "fermier"]),
  ob("le biberon", "un biberon", "Biberon", "🍼", "250 mL", ["25 L", "250 L", "2 mL"], ["2,5 L", "25 mL", "5 L"], "mL", ["puéricultrice", "puériculteur"]),
  ob("le flacon de parfum", "un flacon de parfum", "Flacon de parfum", "🌸", "50 mL", ["50 L", "500 L", "5 L"], ["500 mL", "5 mL", "2 L"], "mL", ["parfumeuse", "parfumeur"]),
  ob("le flacon de sirop", "un flacon de sirop", "Flacon de sirop", "🧴", "150 mL", ["150 L", "15 L", "1 mL"], ["15 mL", "1,5 L", "15 L"], "mL", ["infirmière", "infirmier"]),
  ob("la louche", "une louche", "Louche", "🥄", "10 cL", ["10 L", "100 L", "1 mL"], ["1 L", "1 cL", "5 L"], "cL", ["cuisinière", "cuisinier"]),
  ob("la casserole", "une casserole", "Casserole", "🍲", "2 L", ["2 mL", "200 L", "20 mL"], ["20 L", "20 cL", "2 cL"], "L", ["cuisinière", "cuisinier"]),
  ob("le seau", "un seau", "Seau", "🪣", "10 L", ["10 mL", "10 cL", "1 000 L"], ["100 L", "1 L", "50 L"], "L", ["pompière", "pompier"]),
  ob("l'arrosoir", "un arrosoir", "Arrosoir", "🪴", "10 L", ["10 mL", "10 cL", "1 000 L"], ["100 L", "1 L", "50 cL"], "L", ["jardinière", "jardinier"]),
  ob("le jerrican", "un jerrican", "Jerrican", "🛢️", "20 L", ["20 mL", "20 cL", "2 000 L"], ["200 L", "2 L", "5 L"], "L", ["garagiste", "garagiste"]),
  ob("l'aquarium du salon", "un aquarium de salon", "Aquarium", "🐠", "60 L", ["60 mL", "60 cL", "6 000 L"], ["6 L", "600 L", "60 hL"], "L", ["vendeuse d'animalerie", "vendeur d'animalerie"]),
  ob("le réservoir de la voiture", "un réservoir de voiture", "Réservoir", "🚗", "50 L", ["50 mL", "50 cL", "5 000 L"], ["5 L", "500 L", "50 hL"], "L", ["garagiste", "garagiste"]),
  ob("la baignoire", "une baignoire", "Baignoire", "🛁", "150 L", ["15 cL", "15 mL", "2 L"], ["15 L", "1 500 L", "2 L"], "L", ["plombière", "plombier"]),
  ob("le ballon d'eau chaude", "un ballon d'eau chaude", "Ballon d'eau chaude", "🔥", "2 hL", ["200 mL", "2 cL", "2 L"], ["20 L", "20 hL", "2 L"], "hL", ["plombière", "plombier"]),
  ob("la cuve à eau de pluie", "une cuve à eau de pluie", "Cuve", "🌧️", "300 L", ["300 mL", "3 cL", "3 L"], ["30 L", "30 hL", "3 L"], "L", ["jardinière", "jardinier"]),
  ob("la piscine gonflable", "une piscine gonflable", "Piscine gonflable", "🏊", "20 hL", ["2 L", "20 cL", "5 L"], ["20 L", "200 L", "200 hL"], "hL"),
  ob("la citerne du camion de pompier", "une citerne de camion de pompier", "Citerne", "🚒", "3 000 L", ["3 L", "30 cL", "30 L"], ["30 L", "300 L", "300 hL"], "L", ["pompière", "pompier"]),
  ob("la machine à laver", "une machine à laver", "Machine à laver", "🧺", "50 L", ["50 mL", "5 cL", "5 000 L"], ["5 L", "500 L", "50 hL"], "L", ["plombière", "plombier"]),
  ob("le thermos", "un thermos", "Thermos", "🧴", "75 cL", ["75 L", "750 L", "7 mL"], ["7,5 L", "75 mL", "7 L"], "cL", ["randonneuse", "randonneur"]),
];
const v = (o: Ob) => lire(o.juste) ?? 0;
const REPERES = "petite cuillère 5 mL, verre 250 mL, bouteille 1,5 L, seau 10 L, baignoire 150 L";
const QUI_ESTIME = (o: Ob) => {
  const p = perso(o.qui);
  return un([
    `${p.txt} remplit ${o.indef} à ras bord.`,
    `${p.txt} se demande combien contient ${o.def}.`,
    `${p.txt} veut remplir ${o.indef}.`,
    `${p.txt} regarde ${o.indef}.`,
    `${p.txt} doit noter la contenance d'${o.indef}.`,
  ]);
};
const Q_EST = ["Quelle est sa contenance, environ ?", "Quelle contenance est la plus raisonnable ?", "Estime sa contenance.", "Combien contient-il ou elle, à peu près ?"];
const qEst = (o: Ob) => un(Q_EST).replace("il ou elle", /^(la |une )/.test(o.def) ? "elle" : "il");
/** Des objets aux contenances bien différentes (au moins × 4 l'une de l'autre). */
function eloignes(n: number, premier?: Ob): Ob[] {
  const out: Ob[] = premier ? [premier] : [];
  for (const o of melange([...OBJETS])) {
    if (out.length >= n) break;
    if (out.every((x) => Math.max(v(x), v(o)) / Math.min(v(x), v(o)) >= 4)) out.push(o);
  }
  return out;
}
const UNITE_NOM: Record<U, string> = { hL: "l'hectolitre (hL)", L: "le litre (L)", dL: "le décilitre (dL)", cL: "le centilitre (cL)", mL: "le millilitre (mL)" };

export const contenanceEstimerGabarits: TutorBankItemV4[] = [
  // ★1 — quelle contenance pour cet objet ? (leurres très loin : l'unité ne va pas)
  tpl("contenance_estimer", "g01_contenance_loin", 1, "Pense à la taille du récipient et aux repères : un verre 250 mL, un seau 10 L.", () => {
    const o = un(OBJETS);
    return {
      text: `${QUI_ESTIME(o)} ${qEst(o)}`,
      ...qcmC(o.juste, o.loin),
      explanation: etapes(`Estimer, c'est choisir une contenance raisonnable (pas exacte). Repères : ${REPERES}.`, `${cap(o.def)} contient environ ${o.juste}.`, `La contenance raisonnable est ${o.juste}.`),
      canvas: estimation(o.label, o.icon, "Quelle contenance est raisonnable ?"),
    };
  }),

  // ★1 — quelle unité choisir ? Petit récipient : mL ou cL ; grand : L ; très grand : L ou hL.
  tpl("contenance_estimer", "g02_quelle_unite", 1, "Petit récipient : millilitres ou centilitres. Grand récipient : litres.", () => {
    // Seulement les récipients nettement petits ou nettement grands (une gourde de 0,5 L se dit aussi 500 mL).
    const o = un(OBJETS.filter((x) => x.u !== "hL" && (v(x) <= 250 || v(x) >= 1000)));
    const juste = UNITE_NOM[o.u];
    const faux = o.u === "L" ? [UNITE_NOM.mL, "le kilogramme (kg)", "le mètre (m)", "le gramme (g)"] : [UNITE_NOM.L, UNITE_NOM.hL, "le kilogramme (kg)", "le mètre (m)"];
    return {
      text: `${un(["Pour mesurer la contenance", "Pour dire combien contient", "Pour écrire la contenance"])} ${o.def.replace(/^le /, "du ").replace(/^la /, "de la ").replace(/^l'/, "de l'")}, ${un(["quelle unité est la mieux adaptée ?", "quelle unité choisir ?", "quelle unité utiliser ?"])}`.replace("combien contient du ", "combien contient le ").replace("combien contient de la ", "combien contient la ").replace("combien contient de l'", "combien contient l'"),
      ...qcm(juste, faux),
      explanation: etapes("Pour un petit récipient, on parle en millilitres ou en centilitres ; pour un grand récipient, en litres. Le kilogramme et le gramme mesurent une masse, le mètre une longueur.", `${cap(o.def)} contient environ ${o.juste}.`, `On choisit ${juste}.`),
      canvas: estimation(o.label, o.icon, "Petit ou grand récipient ?"),
    };
  }),

  // ★2 — l'inverse : quel récipient contient environ… ?
  tpl("contenance_estimer", "g03_quel_recipient", 2, "Compare aux repères : cuillère, verre, bouteille, seau, baignoire.", () => {
    const objs = eloignes(4);
    const o = objs[0];
    const p = perso(o.qui);
    return {
      text: `${un([`${p.nom} lit une étiquette : « contenance ${o.juste} ».`, `${p.txt} cherche un récipient d'environ ${o.juste}.`, `Un récipient contient environ ${o.juste}.`])} ${un(["Quel récipient est-ce, sans doute ?", "De quel récipient s'agit-il ?", "Quel récipient peut-il être ?"])}`,
      ...qcm(cap(o.indef), objs.slice(1).map((x) => cap(x.indef))),
      explanation: etapes(`On compare à des repères : ${REPERES}.`, objs.map((x) => `${x.label} : environ ${x.juste}`).join(" ; ") + ".", `C'est ${o.indef}.`),
      canvas: cartes(objs.map((x) => ({ label: x.label, icon: x.icon, contenance: "?" })), `Lequel contient environ ${o.juste} ?`),
    };
  }),

  // ★2 — le piège : « 10 L pour une petite cuillère, c'est impossible ».
  tpl("contenance_estimer", "g04_phrase_possible", 2, "Le nombre seul ne suffit pas : regarde l'unité.", () => {
    const objs = eloignes(4);
    const impossible = Math.random() < 0.4;
    const vraie = (o: Ob) => `${cap(o.def)} contient environ ${o.juste}.`;
    const fausse = (o: Ob) => `${cap(o.def)} contient environ ${un(o.loin)}.`;
    const juste = impossible ? fausse(objs[0]) : vraie(objs[0]);
    const faux = objs.slice(1).map((o) => (impossible ? vraie(o) : fausse(o)));
    return {
      text: impossible
        ? un(["Une seule phrase est impossible : laquelle ?", "Quelle phrase est fausse ?", "Laquelle de ces estimations est impossible ?"])
        : un(["Une seule phrase est possible : laquelle ?", "Quelle phrase est vraisemblable ?", "Laquelle de ces estimations est raisonnable ?"]),
      ...qcm(juste, faux),
      explanation: etapes("Le nombre seul ne suffit pas : on regarde l'unité, et on compare aux repères.", `Repères : ${REPERES}.`, `La réponse est : « ${juste} »`),
      canvas: cartes(objs.map((x) => ({ label: x.label, icon: x.icon, contenance: "?" })), impossible ? "Quelle phrase est impossible ?" : "Quelle phrase est possible ?"),
    };
  }),

  // ★2 — ordre de grandeur, même unité : 30 L, 300 L ou 3 000 L ?
  tpl("contenance_estimer", "g05_ordre_de_grandeur", 2, "Compare aux repères : un seau contient 10 L, une baignoire environ 150 L.", () => {
    const o = un(OBJETS.filter((x) => !/,/.test(x.juste) && x.u !== "hL"));
    const j = lire(o.juste) ?? 1;
    const u: U = o.juste.endsWith(" L") ? "L" : o.juste.endsWith("cL") ? "cL" : "mL";
    const p = perso(o.qui);
    const vals = [j / 100, j / 10, j, j * 10, j * 100].filter((x) => x / PAR[u] >= 1 && Number.isInteger(x / PAR[u]));
    const faux = vals.filter((x) => x !== j).map((x) => ecr(x, u));
    return {
      text: `${p.txt} ${un(["se demande combien contient", "veut estimer la contenance de", "regarde"])} ${o.def}. ${un([`Combien de ${NOM_U[u]} dedans, environ ?`, "Quelle estimation choisir ?", "Quelle est la bonne estimation ?"])}`.replace("contenance de le ", "contenance du ").replace("contenance de les ", "contenance des "),
      ...qcmC(o.juste, faux),
      explanation: etapes(`Pour estimer, il faut des repères : ${REPERES}.`, `${cap(o.def)} contient environ ${o.juste}.`, `La bonne estimation est ${o.juste}.`),
      canvas: estimation(o.label, o.icon, "Combien, environ ?"),
    };
  }),

  // ★3 — avec un repère : « autant que N seaux de 10 L » → environ N × 10 L.
  tpl("contenance_estimer", "g06_avec_un_repere", 3, "Multiplie la contenance du repère par le nombre de fois.", () => {
    const REP = [
      { nom: "seaux de 10 L", x: 10000, e: "10 L", u: "L" as U },
      { nom: "bouteilles de 1 L", x: 1000, e: "1 L", u: "L" as U },
      { nom: "verres de 250 mL", x: 250, e: "250 mL", u: "mL" as U },
      { nom: "petites cuillères de 5 mL", x: 5, e: "5 mL", u: "mL" as U },
      { nom: "bouteilles de 1,5 L", x: 1500, e: "1,5 L", u: "L" as U },
    ];
    const paires: { o: Ob; r: (typeof REP)[number]; n: number }[] = [];
    for (const o of OBJETS) for (const r of REP) {
      const n = v(o) / r.x;
      if (Number.isInteger(n) && n >= 2 && n <= 300) paires.push({ o, r, n });
    }
    const { o, r, n } = un(paires);
    const u = o.u;
    const j = v(o);
    const faux = [ecr(n * PAR[u], u), ecr(j * 10, u), ecr(j / 10, u), ecr(n * r.x * 100, u)].filter((s) => !/\d,\d/.test(s) || /,5 /.test(s));
    return {
      text: `${cap(o.def)} contient à peu près autant que ${fr(n)} ${r.nom}. ${un(["Quelle est sa contenance, environ ?", "Combien contient-elle ou il, environ ?", "Quelle estimation est juste ?"]).replace("elle ou il", /^(la |une )/.test(o.def) ? "elle" : "il")}`,
      ...qcmC(o.juste, faux),
      explanation: etapes("On utilise un repère connu, puis on multiplie.", `${fr(n)} × ${r.e} = ${ecr(j, r.u)}${ecr(j, r.u) !== o.juste ? ` = ${o.juste}` : ""}.`, `${cap(o.def)} contient environ ${o.juste}.`),
      canvas: estimation(o.label, o.icon, `Autant que ${fr(n)} ${r.nom}`),
    };
  }),

  // ★3 — trois récipients, trois contenances : qui va avec quoi ?
  tpl("contenance_estimer", "g07_qui_va_avec_quoi", 3, "Range les récipients du plus petit au plus grand, et les contenances aussi.", () => {
    const objs = eloignes(3);
    const vals = objs.map((o) => o.juste);
    const assoc = (perm: number[]) => objs.map((o, i) => `${o.label} → ${vals[perm[i]]}`).join(" ; ");
    const perms = [[0, 1, 2], [0, 2, 1], [1, 0, 2], [1, 2, 0], [2, 0, 1], [2, 1, 0]];
    const p = perso(un([["vendeuse", "vendeur"], ["maîtresse", "maître"], ["cuisinière", "cuisinier"]] as const));
    return {
      text: `${un([`${p.txt} a trois récipients`, "Voici trois récipients", "Sur une étagère, il y a trois récipients"])} : ${liste(objs.map((o) => o.indef))}. ${un(["Trois contenances", "Trois étiquettes"])} : ${liste(melange([...vals]))}. ${un(["Qui va avec quoi ?", "Quelle association est juste ?", "Associe chaque récipient à sa contenance."])}`,
      ...qcm(assoc(perms[0]), perms.slice(1).map(assoc)),
      explanation: etapes(`On compare chaque récipient à des repères : ${REPERES}.`, objs.map((o) => `${o.label} : ${o.juste}`).join(" ; ") + ".", `L'association juste est ${assoc(perms[0])}.`),
      canvas: cartes(objs.map((o) => ({ label: o.label, icon: o.icon, contenance: "?" })), "Qui va avec quoi ?"),
    };
  }),

  // ★3 — leurres PROCHES (× 10, ÷ 10, même nombre dans une autre unité) : la baignoire n'a pas 2 L.
  tpl("contenance_estimer", "g08_contenance_proche", 3, "Le nombre seul ne suffit pas : regarde l'unité, et compare aux repères.", () => {
    const o = un(OBJETS);
    return {
      text: `${QUI_ESTIME(o)} ${qEst(o)}`,
      ...qcmC(o.juste, o.proche),
      explanation: etapes(`On compare à des repères : ${REPERES}.`, `${cap(o.def)} contient environ ${o.juste} ; ${o.proche.slice(0, 2).join(" ou ")}, ce serait beaucoup trop ou beaucoup trop peu.`, `La contenance raisonnable est ${o.juste}.`),
      canvas: estimation(o.label, o.icon, "Quelle contenance est raisonnable ?"),
    };
  }),
];

/* ───────────────────────── CONTENANCE_DEFI ───────────────────────── */

type DLot = {
  m?: readonly [string, string];
  verbe: string;
  encore: string;
  liq: string;
  /** « tout le miel », « toute la crème », « toute l'eau ». */
  tout: string;
  pot: readonly [string, string, string];
  /** Tailles des petits récipients, en mL. */
  tailles: number[];
};
const DLOTS: DLot[] = [
  { m: ["apicultrice", "apiculteur"], verbe: "a récolté", encore: "en récolte", liq: "de miel", tout: "tout le miel", pot: ["pot", "pots", "🍯"], tailles: [250, 500, 200] },
  { m: ["vendeuse de jus", "vendeur de jus"], verbe: "a pressé", encore: "en presse", liq: "de jus d'orange", tout: "tout le jus", pot: ["verre", "verres", "🥤"], tailles: [200, 250, 500] },
  { m: ["pâtissière", "pâtissier"], verbe: "a préparé", encore: "en prépare", liq: "de crème", tout: "toute la crème", pot: ["ramequin", "ramequins", "🍮"], tailles: [100, 200, 125] },
  { m: ["fermière", "fermier"], verbe: "a trait", encore: "en trait", liq: "de lait", tout: "tout le lait", pot: ["bouteille", "bouteilles", "🥛"], tailles: [500, 250, 750] },
  { m: ["cuisinière", "cuisinier"], verbe: "a préparé", encore: "en prépare", liq: "de soupe", tout: "toute la soupe", pot: ["bol", "bols", "🥣"], tailles: [250, 200, 500] },
  { m: ["serveuse", "serveur"], verbe: "a préparé", encore: "en prépare", liq: "de citronnade", tout: "toute la citronnade", pot: ["verre", "verres", "🍋"], tailles: [250, 200, 150] },
  { m: ["parfumeuse", "parfumeur"], verbe: "a fabriqué", encore: "en fabrique", liq: "de parfum", tout: "tout le parfum", pot: ["flacon", "flacons", "🌸"], tailles: [50, 100, 250] },
  { m: ["soigneuse", "soigneur"], verbe: "a préparé", encore: "en prépare", liq: "de lait pour les agneaux", tout: "tout le lait", pot: ["biberon", "biberons", "🍼"], tailles: [250, 500, 200] },
  { m: ["peintre", "peintre"], verbe: "a mélangé", encore: "en mélange", liq: "de peinture verte", tout: "toute la peinture", pot: ["petit pot", "petits pots", "🎨"], tailles: [250, 500, 200, 750] },
  { m: ["entraîneuse de foot", "entraîneur de foot"], verbe: "a apporté", encore: "en apporte", liq: "d'eau", tout: "toute l'eau", pot: ["gourde", "gourdes", "🚰"], tailles: [500, 250, 750] },
  { verbe: "a acheté", encore: "en achète", liq: "de jus de pomme", tout: "tout le jus", pot: ["gobelet", "gobelets", "🥤"], tailles: [200, 250, 150] },
  { m: ["barista", "barista"], verbe: "a préparé", encore: "en prépare", liq: "de chocolat chaud", tout: "tout le chocolat chaud", pot: ["tasse", "tasses", "☕"], tailles: [200, 250, 150] },
  { m: ["laborantine", "laborantin"], verbe: "a préparé", encore: "en prépare", liq: "d'eau colorée", tout: "toute l'eau colorée", pot: ["éprouvette", "éprouvettes", "🧪"], tailles: [50, 100, 20, 25] },
  { m: ["savonnière", "savonnier"], verbe: "a fabriqué", encore: "en fabrique", liq: "de savon liquide", tout: "tout le savon", pot: ["flacon", "flacons", "🧼"], tailles: [250, 500, 200, 750] },
  { m: ["marchande de glaces", "marchand de glaces"], verbe: "a préparé", encore: "en prépare", liq: "de sirop de fraise", tout: "tout le sirop", pot: ["bouteille", "bouteilles", "🍓"], tailles: [250, 500, 750] },
  { m: ["animatrice de centre aéré", "animateur de centre aéré"], verbe: "a préparé", encore: "en prépare", liq: "de sirop de menthe", tout: "tout le sirop", pot: ["gobelet", "gobelets", "🥤"], tailles: [200, 250, 150] },
  { m: ["vétérinaire", "vétérinaire"], verbe: "a préparé", encore: "en prépare", liq: "de solution vitaminée", tout: "toute la solution", pot: ["flacon", "flacons", "🧴"], tailles: [50, 100, 250] },
];
const QUAND = ["Le matin", "Lundi", "Hier", "Au début de la journée", "Ce matin", "Samedi"];
const QUAND2 = ["L'après-midi", "Le lendemain", "Un peu plus tard", "Le soir", "Ensuite"];
/** « 25 cL » ou « 250 mL » pour un petit récipient de t mL. */
const taille = (t: number, cl = Math.random() < 0.6) => (t % 10 === 0 && cl ? cL(t) : mL(t));
const elle = (p: Perso) => p.il;
const peut = (p: Perso) => (p.il === "elle" ? "peut-elle" : "peut-il");
const at = (p: Perso) => (p.il === "elle" ? "a-t-elle" : "a-t-il");
const doit = (p: Perso) => (p.il === "elle" ? "doit-elle" : "doit-il");
/** Une quantité « a » en mL écrite en litres décimaux ou entiers (« 1,25 L », « 2 L »). */
const qteL = (min: number, max: number) => (Math.random() < 0.7 ? decimal(min, max, 250) : tire(min, max, 1000));

export const contenanceDefiGabarits: TutorBankItemV4[] = [
  // ★4 — le défi de la vidéo : 1 L de jus + 750 mL de sirop = 1 750 mL (piège : 751, ou 1,25 + 750).
  tpl("contenance_defi", "g01_ajouter", 4, "Mets tout en millilitres d'abord, puis ajoute.", () => {
    const d = un(DLOTS);
    const p = perso(d.m);
    const a = qteL(1000, 4500);
    const enCl = Math.random() < 0.35;
    const b = enCl ? tire(5, 95, 5) * 10 : tire(50, 950, 50);
    const tot = a + b;
    const ecrB = enCl ? cL(b) : mL(b);
    const versL = Math.random() < 0.35;
    const f = versL ? L : mL;
    const q = versL ? un([`Combien de litres ${at(p)} en tout ?`, "Quelle quantité en tout, en litres ?"]) : un([`Combien de millilitres ${at(p)} en tout ?`, `Quelle quantité ${at(p)} en tout, en mL ?`]);
    return {
      text: `${un(QUAND)}, ${p.txt} ${d.verbe} ${L(a)} ${d.liq}. ${un(QUAND2)}, ${elle(p)} ${d.encore} encore ${ecrB}. ${q}`,
      ...qcmV(tot, entiers([a / 10 + b, Math.floor(a / 1000) * 1000 + b, a + (enCl ? b / 10 : b * 10), a / 1000 + (enCl ? b / 10 : b)]), f, 250),
      explanation: etapes(
        `Attention : ${L(a)} + ${ecrB}, on n'ajoute pas les nombres tels qu'ils sont écrits ! Même unité d'abord : 1 L = 1 000 mL${enCl ? ", 1 cL = 10 mL" : ""}.`,
        `${L(a)} = ${mL(a)}${enCl ? ` ; ${ecrB} = ${mL(b)}` : ""} ; ${fr(a)} + ${fr(b)} = ${fr(tot)}.`,
        `${cap(elle(p))} a ${mL(tot)}${versL ? `, soit ${L(tot)}` : ""} en tout.`,
      ),
      canvas: cartes([{ label: "D'abord", icon: d.pot[2], contenance: L(a) }, { label: "Encore", icon: d.pot[2], contenance: ecrB }], "Combien en tout ?"),
    };
  }),

  // ★4 — enlever : 1,5 L − 500 mL (piège : 1,5 − 500 impossible, ou 150 − 500).
  tpl("contenance_defi", "g02_enlever", 4, "D'abord la même unité, puis on enlève.", () => {
    const d = un(DLOTS);
    const p = perso(d.m);
    const a = qteL(1000, 5000);
    const enCl = Math.random() < 0.4;
    const b = tire(100, Math.min(a - 100, 2500), 50);
    const bb = b;
    const ecrB = enCl ? cL(bb) : mL(bb);
    const r = a - bb;
    const versL = Math.random() < 0.3;
    const f = versL ? L : enCl ? cL : mL;
    const u: U = versL ? "L" : enCl ? "cL" : "mL";
    return {
      text: `${p.txt} ${d.verbe} ${L(a)} ${d.liq}. ${cap(elle(p))} en ${un(["verse", "utilise", "donne", "vend"])} ${ecrB}. ${un([`Combien de ${NOM_U[u]} reste-t-il ?`, `Quelle quantité reste-t-il, en ${u} ?`])}`,
      ...qcmV(r, entiers([a + bb, a / 10 - bb, Math.floor(a / 1000) * 1000 - bb, a - bb * 10, a - bb / 10]), f, 250),
      explanation: etapes(
        `D'abord la même unité : ${L(a)} = ${ecr(a, enCl ? "cL" : "mL")}. Puis on enlève.`,
        `${fr(a / PAR[enCl ? "cL" : "mL"])} − ${fr(bb / PAR[enCl ? "cL" : "mL"])} = ${fr(r / PAR[enCl ? "cL" : "mL"])}.`,
        `Il reste ${ecr(r, enCl ? "cL" : "mL")}${versL ? `, soit ${L(r)}` : ""}.`,
      ),
      canvas: cartes([{ label: "Au départ", icon: d.pot[2], contenance: L(a) }, { label: "Enlevé", icon: d.pot[2], contenance: ecrB }], "Combien reste-t-il ?"),
    };
  }),

  // ★4 — combien de récipients : 1,5 L en verres de 25 cL → combien de fois 25 dans 150.
  tpl("contenance_defi", "g03_combien_de_recipients", 4, "D'abord la même unité, puis cherche combien de fois le petit récipient tient dans le grand.", () => {
    const d = un(DLOTS);
    const p = perso(d.m);
    const paires: [number, number][] = [];
    for (const t of d.tailles) for (let k = 2; k <= 30; k++) if ((k * t) % 250 === 0 && k * t >= 500 && k * t <= 6000) paires.push([t, k]);
    const [t, n] = paires.length ? un(paires) : ([250, 6] as [number, number]);
    const T = n * t;
    const tt = taille(t);
    const parL = Math.floor(T / 1000) * 1000;
    return {
      text: `${p.txt} ${d.verbe} ${L(T)} ${d.liq}. ${cap(elle(p))} ${un(["verse tout dans des", "remplit des", "répartit tout dans des"])} ${d.pot[1]} de ${tt}. Combien de ${d.pot[1]} ${peut(p)} remplir ?`,
      ...qcmN(n, [parL / t, Math.round(T / 1000 / (t / 10)), n * 10, Math.round(T / 100)], d.pot[1]),
      explanation: etapes(
        `D'abord la même unité : ${L(T)} = ${mL(T)}${tt.endsWith("cL") ? ` et ${tt} = ${mL(t)}` : ""}. Puis on cherche combien de fois le petit récipient tient dans le grand.`,
        `${fr(t)} × ${fr(n)} = ${fr(T)}, donc ${fr(T)} ÷ ${fr(t)} = ${fr(n)}.`,
        `${cap(elle(p))} remplit ${fr(n)} ${d.pot[1]}.`,
      ),
      canvas: cartes([{ label: "Tout", icon: d.pot[2], contenance: L(T) }, { label: cap(d.pot[0]), icon: d.pot[2], contenance: tt }], `Combien de ${d.pot[1]} ?`),
    };
  }),

  // ★4 — combien faut-il ajouter pour avoir 1,5 L (ou 2 L) ?
  tpl("contenance_defi", "g04_complement", 4, "Mets l'objectif dans la même unité, puis cherche ce qui manque.", () => {
    const d = un(DLOTS);
    const p = perso(d.m);
    const N = un([1000, 1500, 2000, 2500, 3000]);
    const x = tire(100, N - 50, 50);
    const r = N - x;
    const rec = un(["Sa bouteille", "Son pichet", "Sa carafe", "Son récipient", "Son bidon"]);
    const ecrX = Math.random() < 0.5 ? cL(x) : L(x);
    return {
      text: `${p.txt} veut ${L(N)} ${d.liq}. ${rec} en contient déjà ${ecrX}. ${un([`Combien de centilitres ${doit(p)} encore ajouter ?`, "Combien de cL manque-t-il ?"])}`,
      ...qcmV(r, entiers([N * 10 - x, x, Math.abs(N / 10 - x), N + x]), cL, 50),
      explanation: etapes(`D'abord la même unité : ${L(N)} = ${cL(N)}${ecrX.endsWith(" L") ? ` et ${ecrX} = ${cL(x)}` : ""}.`, `${fr(N / 10)} − ${fr(x / 10)} = ${fr(r / 10)}.`, `Il manque ${cL(r)}.`),
      canvas: cartes([{ label: "Objectif", icon: d.pot[2], contenance: L(N) }, { label: "Déjà", icon: d.pot[2], contenance: ecrX }], "Combien manque-t-il ?"),
    };
  }),

  // ★4 — une recette en trois unités : 1,5 L + 25 cL + 300 mL = ? mL (piège : 326,5 ou 1 825).
  tpl("contenance_defi", "g05_melange_trois_unites", 4, "Mets les trois quantités en millilitres, puis ajoute.", () => {
    const R = un([
      { m: ["pâtissière", "pâtissier"] as const, l: ["de lait", "de crème", "de sirop de vanille"], quoi: "de pâte à crêpes" },
      { m: ["vendeuse de jus", "vendeur de jus"] as const, l: ["de jus d'orange", "de jus d'ananas", "de sirop de grenadine"], quoi: "de cocktail de fruits" },
      { m: ["peintre", "peintre"] as const, l: ["de peinture blanche", "de peinture bleue", "de peinture jaune"], quoi: "de peinture" },
      { m: ["barista", "barista"] as const, l: ["de lait", "de chocolat fondu", "de crème"], quoi: "de chocolat chaud" },
      { m: ["laborantine", "laborantin"] as const, l: ["d'eau", "d'eau salée", "d'eau colorée"], quoi: "de mélange" },
      { m: ["cuisinière", "cuisinier"] as const, l: ["de bouillon", "de lait", "de crème"], quoi: "de soupe" },
      { m: ["serveuse", "serveur"] as const, l: ["d'eau pétillante", "de jus de citron", "de sirop de menthe"], quoi: "de boisson" },
      { m: ["jardinière", "jardinier"] as const, l: ["d'eau", "d'engrais liquide", "d'eau de pluie"], quoi: "d'arrosage" },
    ]);
    const p = perso(R.m);
    const a = qteL(500, 3000);
    const b = tire(10, 90, 5);
    const c = tire(50, 900, 50);
    const tot = a + b * 10 + c;
    return {
      text: `${p.txt} mélange ${L(a)} ${R.l[0]}, ${fr(b)} cL ${R.l[1]} et ${fr(c)} mL ${R.l[2]}. ${un([`Combien de millilitres ${R.quoi} obtient-${elle(p)} ?`, "Quelle quantité obtient-on en tout, en mL ?"])}`,
      ...qcmV(tot, entiers([a + b + c, a + b * 100 + c, a / 10 + b * 10 + c, a + b * 10 + c * 10]), mL, 100),
      explanation: etapes("On met tout dans la même unité, le millilitre : 1 L = 1 000 mL et 1 cL = 10 mL.", `${L(a)} = ${mL(a)} ; ${fr(b)} cL = ${mL(b * 10)} ; ${fr(a)} + ${fr(b * 10)} + ${fr(c)} = ${fr(tot)}.`, `On obtient ${mL(tot)}.`),
      canvas: cartes([{ label: cap(R.l[0].replace(/^de |^d'/, "")), icon: "🫗", contenance: L(a) }, { label: cap(R.l[1].replace(/^de |^d'/, "")), icon: "🫗", contenance: `${fr(b)} cL` }, { label: cap(R.l[2].replace(/^de |^d'/, "")), icon: "🫗", contenance: `${fr(c)} mL` }], "Combien de mL en tout ?"),
    };
  }),

  // ★4 — plusieurs récipients identiques : 6 bouteilles de 75 cL → 4,5 L.
  tpl("contenance_defi", "g06_plusieurs_identiques", 4, "Multiplie, puis convertis le résultat en litres : 100 cL = 1 L.", () => {
    const d = un(DLOTS);
    const p = perso(d.m);
    const t = un(d.tailles.filter((x) => x % 10 === 0 && x >= 100));
    const k = entre(3, 12);
    const T = k * t;
    return {
      text: `${p.txt} remplit ${fr(k)} ${d.pot[1]} de ${cL(t)} ${d.liq}. ${un(["Combien de litres cela fait-il en tout ?", "Quelle quantité en tout, en litres ?", `Combien de litres ${at(p)} utilisé ?`])}`,
      ...qcmV(T, entiers([T * 100, T * 10, T / 10]), L, 250),
      explanation: etapes("On multiplie d'abord, puis on convertit en litres : 100 cL = 1 L.", `${fr(k)} × ${fr(t / 10)} = ${fr(T / 10)} cL ; ${fr(T / 10)} ÷ 100 = ${fr(T / 1000)}.`, `En tout : ${L(T)}.`),
      canvas: cartes([{ label: `${fr(k)} ${d.pot[1]}`, icon: d.pot[2], contenance: `${cL(t)} chacun` }], "Combien de litres en tout ?"),
    };
  }),

  // ★5 — assez de récipients ? 2,5 L et 8 pots de 25 cL.
  tpl("contenance_defi", "g07_assez_de_pots", 5, "Mets tout en centilitres : la quantité à verser, puis ce que contiennent tous les pots.", () => {
    const d = un(DLOTS);
    const p = perso(d.m);
    const t = un(d.tailles.filter((x) => x % 10 === 0 && x >= 100));
    const need = tire(1000, 5000, 250);
    const exact = need / t;
    const base = Math.round(exact);
    const k = Number.isInteger(exact) && Math.random() < 0.2 ? exact : Math.max(2, base + un([-3, -2, -1, 1, 2, 3]));
    const cap2 = k * t;
    const diff = Math.abs(need - cap2);
    const manque = (x: number) => `non : il manque ${cL(x)}`;
    const reste = (x: number) => `oui : il reste de la place pour ${cL(x)}`;
    const juste = "oui : c'est tout juste assez";
    const bonne = cap2 < need ? manque(diff) : cap2 > need ? reste(diff) : juste;
    const faux = cap2 === need ? [manque(t), reste(t), manque(need / 10)] : [cap2 < need ? reste(diff) : manque(diff), juste, cap2 < need ? manque(diff + t) : reste(diff + t)];
    return {
      text: `${p.txt} ${d.verbe} ${L(need)} ${d.liq}. ${cap(elle(p))} a ${fr(k)} ${d.pot[1]} de ${cL(t)}. ${un([`${at(p).replace(/^a/, "A")} assez de ${d.pot[1]} pour ${d.tout} ?`, `${peut(p).replace(/^p/, "P")} tout verser dans ses ${d.pot[1]} ?`])}`,
      ...qcm(bonne, faux),
      explanation: etapes(
        "On met tout en centilitres, puis on compare.",
        `${L(need)} = ${cL(need)} ; ${fr(k)} ${d.pot[1]} de ${cL(t)} : ${fr(t / 10)} × ${fr(k)} = ${fr(cap2 / 10)} cL.`,
        cap2 === need ? "C'est tout juste assez." : cap2 < need ? `${fr(cap2 / 10)} cL < ${fr(need / 10)} cL : il manque ${cL(diff)}.` : `${fr(cap2 / 10)} cL > ${fr(need / 10)} cL : il reste de la place pour ${cL(diff)}.`,
      ),
      canvas: cartes([{ label: "À verser", icon: d.pot[2], contenance: L(need) }, { label: `${fr(k)} ${d.pot[1]}`, icon: d.pot[2], contenance: `${cL(t)} chacun` }], "Assez de place ?"),
    };
  }),

  // ★5 — plusieurs versements : un bidon de 2,5 L, 7 verres de 20 cL, combien reste-t-il ?
  tpl("contenance_defi", "g08_plusieurs_versements", 5, "Calcule d'abord ce qu'on a versé en tout, puis enlève-le, dans la même unité.", () => {
    const d = un(DLOTS);
    const p = perso(d.m);
    const t = un(d.tailles.filter((x) => x % 10 === 0 && x >= 100));
    const N = Math.max(qteL(1000, 5000), 3 * t + 250);
    const kmax = Math.floor(N / t) - 1;
    const k = entre(2, Math.max(2, Math.min(kmax, 12)));
    const r = N - k * t;
    const rec = un(["une grande bouteille", "un grand récipient", "sa réserve", "un bidon", "une marmite"]);
    return {
      text: `${p.txt} a ${L(N)} ${d.liq} dans ${rec}. ${cap(elle(p))} remplit ${fr(k)} ${d.pot[1]} de ${cL(t)}. ${un(["Combien de centilitres reste-t-il ?", "Quelle quantité reste-t-il, en cL ?"])}`,
      ...qcmV(r, entiers([k * t, N - t, N * 10 - k * t, N / 10 - k * t]), cL, 50),
      explanation: etapes(`D'abord la même unité : ${L(N)} = ${cL(N)}. Puis on calcule ce qu'on a versé.`, `${fr(k)} × ${fr(t / 10)} = ${fr((k * t) / 10)} cL ; ${fr(N / 10)} − ${fr((k * t) / 10)} = ${fr(r / 10)}.`, `Il reste ${cL(r)}.`),
      canvas: cartes([{ label: "Au départ", icon: d.pot[2], contenance: L(N) }, { label: `${fr(k)} ${d.pot[1]}`, icon: d.pot[2], contenance: `${cL(t)} chacun` }], "Combien reste-t-il ?"),
    };
  }),

  // ★5 — qui en a le plus : k bouteilles de t cL, ou N,5 L ?
  tpl("contenance_defi", "g09_qui_en_a_le_plus", 5, "Calcule chaque quantité dans la même unité, puis compare.", () => {
    const d = un(DLOTS);
    const p1 = perso(d.m);
    let p2 = perso(d.m);
    for (let i = 0; i < 10 && p2.nom === p1.nom; i++) p2 = perso(d.m);
    const t = un(d.tailles.filter((x) => x % 10 === 0 && x >= 100));
    const k = entre(3, 12);
    const A = k * t;
    const egal = Math.random() < 0.2 && A % 250 === 0;
    const B = egal ? A : Math.max(500, Math.round(A / 250) * 250 + un([-500, -250, 250, 500]));
    const autant = "les deux en ont autant";
    const juste = A === B ? autant : A > B ? p1.nom : p2.nom;
    return {
      text: `${p1.nom} a ${fr(k)} ${d.pot[1]} de ${cL(t)} ${d.liq}. ${p2.nom} a ${L(B)} ${d.liq}. ${un(["Qui en a le plus ?", "Qui a la plus grande quantité ?"])}`,
      ...qcm(juste, [p1.nom, p2.nom, autant]),
      explanation: etapes("On calcule chaque quantité dans la même unité, le centilitre.", `${p1.nom} : ${fr(t / 10)} × ${fr(k)} = ${fr(A / 10)} cL. ${p2.nom} : ${L(B)} = ${cL(B)}.`, A === B ? "Les deux en ont autant." : `${juste} en a le plus.`),
      canvas: cartes([{ label: p1.nom, icon: d.pot[2], contenance: `${fr(k)} × ${cL(t)}` }, { label: p2.nom, icon: d.pot[2], contenance: L(B) }], "Qui en a le plus ?"),
    };
  }),

  // ★5 — remplir une grande cuve en hectolitres avec des seaux (déjà en partie pleine).
  tpl("contenance_defi", "g10_cuve_hectolitres", 5, "Convertis les hectolitres en litres (1 hL = 100 L), enlève ce qu'il y a déjà, puis divise.", () => {
    const S = un([
      { m: ["maraîchère", "maraîcher"] as const, cuve: "sa cuve d'arrosage", rec: ["arrosoir", "arrosoirs", "🪴"] as const },
      { m: ["pompière", "pompier"] as const, cuve: "la réserve d'eau de la caserne", rec: ["seau", "seaux", "🪣"] as const },
      { m: ["soigneuse", "soigneur"] as const, cuve: "le bassin des canards", rec: ["bidon", "bidons", "🛢️"] as const },
      { m: ["fermière", "fermier"] as const, cuve: "l'abreuvoir des vaches", rec: ["seau", "seaux", "🪣"] as const },
      { m: ["maître-nageuse", "maître-nageur"] as const, cuve: "la pataugeoire", rec: ["tonneau", "tonneaux", "🛢️"] as const },
      { m: ["jardinière", "jardinier"] as const, cuve: "la cuve à eau de pluie", rec: ["seau", "seaux", "🪣"] as const },
    ]);
    const p = perso(S.m);
    const s = un([10, 10, 20, 25, 50]);
    const H = tire(1, 8, 1) * 50;
    const deja = tire(1, Math.floor((H - s) / s), 1) * s * (Math.random() < 0.6 ? 1 : 0);
    const n = (H - deja) / s;
    const hl = `${fr(H / 100)} hL`;
    return {
      text: `${p.txt} veut remplir ${S.cuve}, qui contient ${hl}. ${deja ? `Il y a déjà ${fr(deja)} L dedans. ` : ""}${cap(elle(p))} ${/^(le |l'abreuvoir)/.test(S.cuve) ? "le" : "la"} remplit avec des ${S.rec[1]} de ${fr(s)} L. ${un([`Combien de ${S.rec[1]} faut-il ${deja ? "encore " : ""}verser ?`, `Combien de ${S.rec[1]} ${doit(p)} verser ?`])}`,
      ...qcmN(n, [H / s, Math.round((H / 10 - deja) / s), (H * 10 - deja) / s, n + 1], S.rec[1]),
      explanation: etapes(
        `D'abord la même unité : 1 hL = 100 L, donc ${hl} = ${fr(H)} L.`,
        deja ? `${fr(H)} − ${fr(deja)} = ${fr(H - deja)} L ; ${fr(H - deja)} ÷ ${fr(s)} = ${fr(n)}.` : `${fr(H)} ÷ ${fr(s)} = ${fr(n)}.`,
        `Il faut ${fr(n)} ${n > 1 ? S.rec[1] : S.rec[0]}.`,
      ),
      canvas: cartes([{ label: "Cuve", icon: "🛢️", contenance: hl }, ...(deja ? [{ label: "Déjà", icon: "💧", contenance: `${fr(deja)} L` }] : []), { label: cap(S.rec[0]), icon: S.rec[2], contenance: `${fr(s)} L` }], `Combien de ${S.rec[1]} ?`),
    };
  }),

  // ★5 — sur plusieurs jours : 1,5 L par jour pendant 7 jours, en bouteilles de 2 L (on arrondit au-dessus).
  tpl("contenance_defi", "g11_plusieurs_jours", 5, "Calcule la quantité totale, puis le nombre de bouteilles : une bouteille entamée compte.", () => {
    const S = un([
      { qui: (n: string) => `${n} boit`, liq: "d'eau", max: 2000 },
      { qui: (n: string) => `La famille de ${n} utilise`, liq: "de lait", max: 2500 },
      { qui: (n: string) => `Le chien de ${n} boit`, liq: "d'eau", max: 1000 },
      { qui: (n: string) => `Au centre aéré, l'équipe de ${n} boit`, liq: "de jus de fruits", max: 2500 },
      { qui: (n: string) => `Pour ses plantes, ${n} utilise`, liq: "d'eau", max: 2500 },
    ]);
    const p = perso();
    const q = un([500, 750, 1250, 1500, 1500, 2500, 250].filter((x) => x <= S.max));
    const j = un([3, 4, 5, 6, 7, 10, 14]);
    const b = un([1000, 1500, 2000, 5000].filter((x) => x >= q || x === 5000));
    const T = q * j;
    const n = Math.ceil(T / b);
    const periode = j === 7 ? "une semaine" : j === 14 ? "deux semaines" : `${fr(j)} jours`;
    return {
      text: `${S.qui(p.nom)} ${L(q)} ${S.liq} par jour. ${un(["Il faut acheter", "On achète"])} des bouteilles de ${L(b)} pour ${periode}. ${un(["Combien de bouteilles faut-il au minimum ?", "Combien de bouteilles acheter, au moins ?"])}`,
      ...qcmN(n, [Math.floor(T / b), j, Math.round(T / 1000), n + 1, Math.ceil(q / b) * j], "bouteilles"),
      explanation: etapes(
        `On calcule la quantité totale : ${L(q)} × ${fr(j)}.`,
        `${fr(q / 1000)} × ${fr(j)} = ${fr(T / 1000)} L ; ${fr(T / 1000)} ÷ ${fr(b / 1000)} = ${fr(Math.round((T / b) * 100) / 100)}.`,
        T % b === 0 ? `Il faut ${fr(n)} bouteilles.` : `Une bouteille entamée doit être achetée : il faut ${fr(n)} bouteilles.`,
      ),
      canvas: cartes([{ label: "Par jour", icon: "💧", contenance: L(q) }, { label: "Bouteille", icon: "🧴", contenance: L(b) }], `Pendant ${periode}`),
    };
  }),

  // ★5 — une recette pour plus de personnes : 75 cL pour 4 → pour 12 ? (en litres)
  tpl("contenance_defi", "g12_recette_agrandie", 5, "Cherche par combien on multiplie le nombre de personnes, puis convertis en litres.", () => {
    const R = un([
      { m: ["cuisinière", "cuisinier"] as const, plat: "la soupe", liq: "de bouillon" },
      { m: ["pâtissière", "pâtissier"] as const, plat: "la pâte à crêpes", liq: "de lait" },
      { m: ["vendeuse de jus", "vendeur de jus"] as const, plat: "le cocktail de fruits", liq: "de jus d'orange" },
      { m: ["barista", "barista"] as const, plat: "le chocolat chaud", liq: "de lait" },
      { m: ["animatrice de centre aéré", "animateur de centre aéré"] as const, plat: "la citronnade", liq: "d'eau" },
      { m: ["chef de cantine", "chef de cantine"] as const, plat: "la compote", liq: "de jus de pomme" },
    ]);
    const p = perso(R.m);
    const pers = un([2, 4, 5, 6]);
    const f = un([2, 3, 4, 5]);
    const q = tire(20, 95, 5) * 10;
    const T = q * f;
    const P2 = pers * f;
    return {
      text: `Pour ${R.plat}, ${p.txt} utilise ${cL(q)} ${R.liq} pour ${fr(pers)} personnes. ${cap(elle(p))} en prépare pour ${fr(P2)} personnes. ${un(["Combien de litres lui faut-il ?", `Combien de litres ${R.liq} ${doit(p)} prévoir ?`])}`,
      ...qcmV(T, entiers([q * P2, T * 10, T / 10]), L, 250),
      explanation: etapes(
        `${fr(P2)} personnes, c'est ${fr(f)} fois ${fr(pers)} personnes : on multiplie la quantité par ${fr(f)}.`,
        `${fr(q / 10)} × ${fr(f)} = ${fr(T / 10)} cL ; ${fr(T / 10)} cL = ${L(T)} (100 cL = 1 L).`,
        `Il faut ${L(T)}.`,
      ),
      canvas: tableauCorresp("personnes", "quantité", fr(pers), cL(q), fr(P2), "?"),
    };
  }),
];
