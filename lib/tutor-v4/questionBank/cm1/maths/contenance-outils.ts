// lib/tutor-v4/questionBank/cm1/maths/contenance-outils.ts
//
// ⭐ 14/11/2026 — LES GABARITS DES CONTENANCES DU CM1 (notion `contenance`).
// Avant : 9 à 17 squelettes par micro, 9 à 18 répétitions sur 20.
// Les quatre micros sont FILMÉES (série Contenance CM1) : on reprend le
// vocabulaire et l'exercice type de chaque vidéo.
//   ép. 1 COMPARER (jaune, Inès vendeuse de jus) : « la contenance, c'est ce
//     qu'un récipient peut contenir quand il est plein » ; même unité → on
//     compare les nombres ; deux unités → « on met d'abord la même unité »,
//     1 L = 100 cL = 1 000 mL ; piège « 75 est plus grand que 1, mais 75 cL ce
//     n'est pas plus que 1 L » ; pichet 2 L / carafe 150 cL ; 1 L, 90 cL,
//     120 cL ; ranger 4 récipients en mL.
//   ép. 2 CONVERTIR (verte, Sofia pâtissière, verre doseur gradué en cL) :
//     « vers une unité plus petite, on multiplie ; vers le litre, on divise » ;
//     2 L → 200 cL, 5 cL → 50 mL, 3 L → 3 000 mL (piège 300 mL), 600 cL → 6 L,
//     1 L − 25 cL = 75 cL.
//   ép. 3 ESTIMER (jaune, Malik pompier) : les REPÈRES (petite cuillère 5 mL,
//     verre 20 cL, bouteille 1 L, seau 10 L, baignoire 150 L) ; petit récipient
//     → mL ou cL, grand → L ; piège « 10 L pour une petite cuillère » ; gourde
//     500 mL, baignoire 150 L, qui va avec quoi.
//   ép. 4 DÉFI (bleue, Nora apicultrice) : « d'abord la même unité, puis on
//     ajoute, on enlève, ou on cherche combien de fois » ; 2 L en pots de 25 cL,
//     1 L 500 mL en verres de 250 mL, 5 L − 150 cL, piège 2 L + 50 cL ≠ 52,
//     assez de pots ?
// Chaque gabarit tire une SITUATION (métiers, cuisine, sport, ferme, zoo…) ×
// une TOURNURE × des nombres.
// ⛔ CM1 = zéro clavier : que des QCM. Leurres = vraies erreurs d'élève :
// 1 L = 10 cL ou 1 L = 1 000 cL, comparer les NOMBRES sans convertir,
// additionner des L et des cL tels quels, estimer une baignoire à 2 L.
// ⛔ Unité OBLIGATOIRE dans l'énoncé ET dans les choix ; jamais deux choix de
// même valeur (« 50 mL » et « 5 cL » ne sont jamais proposés ensemble).
// Dessins : `contenance` (récipients étiquetés, récipient à estimer,
// conversion L ↔ mL SEULEMENT : la variante imprime « 1 L = 1000 mL »),
// `tableau_donnees` (tableau de conversion L dL cL mL), `number_line` (la
// graduation du verre doseur, le niveau en « ? »).
// ⚠️ La variante `comparaison` du canvas remplit davantage la bouteille la plus
// grande et écrit « gauche contient plus » : elle DONNE la réponse. Jamais ici.

import type { CanvasFigure, DifficultyLevel, TutorBankItemV4, TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import type { ContenanceCanvasData, NumberLineCanvasData, TableauDonneesCanvasData } from "@/lib/tutor-v4/types_canvas";
import { cap, entre, etapes, fr, melange, qcm, un, type Qcm } from "./trous-outils";

type G = Omit<TutorGeneratedQuestionV4, "canvas"> & { canvas?: CanvasFigure };

const tpl = (microId: string, n: string, difficulty: DifficultyLevel, hint: string, generate: () => G): TutorBankItemV4 =>
  ({
    kind: "template",
    id: `cm1_${microId}_tpl_${n}`,
    niveau: "cm1",
    matiere: "maths",
    notionId: "contenance",
    microId,
    difficulty,
    theme: "neutral",
    hint,
    tags: ["cm1", "contenance", microId, "template", "canvas"],
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
    // « combien de éprouvettes » → « combien d'éprouvettes »
    .replace(/\bde (?=[éè])/g, "d'");

/* ───────────────────────── Les écritures (tout est en mL) ───────────────────────── */

const PAR = { L: 1000, dL: 100, cL: 10, mL: 1 } as const;
type U = keyof typeof PAR;
const NOM_U: Record<U, string> = { L: "litres", dL: "décilitres", cL: "centilitres", mL: "millilitres" };
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
/** Une écriture simple « 75 cL », « 2 L », « 500 mL » → millilitres (null sinon). */
function lire(s: string): number | null {
  const m = s.match(/(^|\()\s*([\d\s,]+)\s(L|dL|cL|mL)\)?$/);
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
  const vals: number[] = [];
  for (const v of melange([...faux])) if (v > 0 && v !== juste && !vals.includes(v)) vals.push(v);
  for (let k = 1; vals.length < 3 && k < 30; k++) {
    for (const v of [juste + k * pas, juste - k * pas]) if (v > 0 && !vals.includes(v) && vals.length < 3) vals.push(v);
  }
  return qcm(f(juste), vals.slice(0, 3).map(f));
}
/** QCM d'un nombre de récipients (« 8 pots »). */
function qcmN(juste: number, faux: number[], plur: string): Qcm {
  const e = (n: number) => `${fr(n)} ${n > 1 ? plur : plur.replace(/s$/, "")}`;
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
const liste = (l: string[]) => (l.length < 2 ? l.join("") : `${l.slice(0, -1).join(", ")} et ${l[l.length - 1]}`);
const NB: Record<number, string> = { 2: "deux", 3: "trois", 4: "quatre" };

/* ───────────────────────── Les personnes ───────────────────────── */

const NOMS_F = ["Nina", "Zoé", "Lou", "Inès", "Jade", "Maya", "Lina", "Emma", "Léa", "Sarah", "Chloé", "Aya", "Rose", "Nora", "Sofia"];
const NOMS_M = ["Téo", "Ravi", "Malo", "Sacha", "Amir", "Tom", "Yanis", "Noé", "Lucas", "Karim", "Hugo", "Enzo", "Malik", "Jules"];
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
const COLS: U[] = ["L", "dL", "cL", "mL"];
/** Le tableau de conversion L | dL | cL | mL : x (mL) écrit jusqu'à la colonne `jusque`, la colonne `cible` en couleur. */
function tableau(x: number, jusque: U, cible: U): TableauDonneesCanvasData {
  const fin = COLS.indexOf(jusque);
  const chiffres = [Math.floor(x / 1000), Math.floor(x / 100) % 10, Math.floor(x / 10) % 10, x % 10];
  let commence = false;
  const cells = chiffres.map((c, i) => {
    if (i > fin) return "";
    if (!commence && c === 0 && i < fin) return "";
    commence = true;
    return fr(c);
  });
  return {
    kind: "tableau_donnees",
    title: "Tableau de conversion",
    headers: COLS,
    rows: [{ values: cells }],
    highlight: { col: COLS.indexOf(cible) },
    display: { compact: true },
  };
}
/** Le rappel des égalités de la vidéo : 1 L = 100 cL = 1 000 mL. */
const RAPPEL: TableauDonneesCanvasData = {
  kind: "tableau_donnees",
  title: "Les égalités à retenir",
  headers: ["L", "cL", "mL"],
  rows: [{ values: ["1 L", "100 cL", "1 000 mL"] }, { values: ["", "1 cL", "10 mL"] }],
  display: { compact: true },
};
/** Un tableau de correspondance : 100 cL → 1 L ; 600 cL → ? */
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
  /** Le liquide (« de jus »), pour « verser 80 cL de jus ». */
  liq: string;
  /** Bornes et pas en mL ; `u` : l'unité des énoncés à une seule unité. */
  min: number;
  max: number;
  pas: number;
  u: U;
};
const col = (n: string, c: string, i: string): O => [`${n} ${c}`, cap(c), i];

const LOTS: Lot[] = [
  { m: ["vendeuse de jus", "vendeur de jus"], intro: (p, nb) => `Au marché, ${p.txt} remplit ${nb} bouteilles de jus`, liq: "de jus", obj: [["la bouteille de jus d'orange", "Orange", "🍊"], ["la bouteille de jus de pomme", "Pomme", "🍏"], ["la bouteille de jus de mangue", "Mangue", "🥭"], ["la bouteille de jus de fraise", "Fraise", "🍓"]], min: 250, max: 2000, pas: 50, u: "cL" },
  { m: ["pâtissière", "pâtissier"], intro: (p, nb) => `${p.txt} sort ${nb} récipients pour sa crème`, liq: "de crème", obj: [["la jatte", "Jatte", "🥣"], ["le pichet", "Pichet", "🫗"], ["la casserole", "Casserole", "🍲"], ["le saladier", "Saladier", "🥗"]], min: 500, max: 3000, pas: 100, u: "cL" },
  { m: ["pompière", "pompier"], intro: (p, nb) => `Au centre de secours, ${p.txt} vérifie ${nb} jerricans d'eau`, liq: "d'eau", obj: [col("le jerrican", "rouge", "🛢️"), col("le jerrican", "bleu", "🛢️"), col("le jerrican", "vert", "🛢️"), col("le jerrican", "jaune", "🛢️")], min: 5000, max: 25000, pas: 1000, u: "L" },
  { m: ["jardinière", "jardinier"], intro: (p, nb) => `${p.txt} remplit ${nb} arrosoirs`, liq: "d'eau", obj: [col("l'arrosoir", "vert", "🪴"), col("l'arrosoir", "bleu", "🪴"), col("l'arrosoir", "rouge", "🪴"), col("l'arrosoir", "jaune", "🪴")], min: 2000, max: 12000, pas: 1000, u: "L" },
  { m: ["fermière", "fermier"], intro: (p, nb) => `À la ferme, ${p.txt} remplit ${nb} bidons de lait`, liq: "de lait", obj: [col("le bidon", "A", "🥛"), col("le bidon", "B", "🥛"), col("le bidon", "C", "🥛"), col("le bidon", "D", "🥛")], min: 5000, max: 30000, pas: 1000, u: "L" },
  { m: ["infirmière", "infirmier"], intro: (p, nb) => `À l'infirmerie, ${p.txt} range ${nb} flacons`, liq: "de savon", obj: [["le flacon de sirop", "Sirop", "🧴"], ["le flacon de désinfectant", "Désinfectant", "🧴"], ["le flacon de savon", "Savon", "🧼"], ["le flacon de crème solaire", "Crème solaire", "🧴"]], min: 50, max: 500, pas: 10, u: "mL" },
  { m: ["parfumeuse", "parfumeur"], intro: (p, nb) => `${p.txt} remplit ${nb} flacons de parfum`, liq: "de parfum", obj: [["le parfum à la rose", "Rose", "🌹"], ["le parfum au jasmin", "Jasmin", "🌼"], ["le parfum à la vanille", "Vanille", "🌸"], ["le parfum à la lavande", "Lavande", "💜"]], min: 30, max: 250, pas: 10, u: "mL" },
  { m: ["serveuse", "serveur"], intro: (p, nb) => `Au café, ${p.txt} remplit ${nb} carafes`, liq: "de citronnade", obj: [["la carafe d'eau", "Eau", "🫗"], ["la carafe de citronnade", "Citronnade", "🍋"], ["la carafe de sirop de menthe", "Menthe", "🌿"], ["la carafe de jus de pomme", "Pomme", "🍏"]], min: 500, max: 1500, pas: 50, u: "cL" },
  { m: ["entraîneuse de foot", "entraîneur de foot"], intro: (p, nb) => `Au stade, ${p.txt} remplit ${nb} gourdes`, liq: "d'eau", obj: [["la gourde de Lou", "Lou", "🚰"], ["la gourde de Malo", "Malo", "🚰"], ["la gourde d'Inès", "Inès", "🚰"], ["la gourde de Tom", "Tom", "🚰"]], min: 300, max: 1500, pas: 50, u: "cL" },
  { m: ["cuisinière", "cuisinier"], intro: (p, nb) => `À la cantine, ${p.txt} remplit ${nb} marmites`, liq: "de soupe", obj: [["la marmite de soupe", "Soupe", "🍲"], ["la marmite de sauce tomate", "Sauce tomate", "🍅"], ["la marmite de compote", "Compote", "🍎"], ["la marmite de lait chaud", "Lait chaud", "🥛"]], min: 5000, max: 30000, pas: 1000, u: "L" },
  { m: ["peintre", "peintre"], intro: (p, nb) => `${p.txt} ouvre ${nb} pots de peinture`, liq: "de peinture", obj: [col("le pot", "blanc", "🎨"), col("le pot", "bleu", "🎨"), col("le pot", "vert", "🎨"), col("le pot", "jaune", "🎨")], min: 250, max: 5000, pas: 250, u: "cL" },
  { m: ["garagiste", "garagiste"], intro: (p, nb) => `Au garage, ${p.txt} range ${nb} bidons d'huile`, liq: "d'huile", obj: [col("le bidon", "A", "🛢️"), col("le bidon", "B", "🛢️"), col("le bidon", "C", "🛢️"), col("le bidon", "D", "🛢️")], min: 1000, max: 5000, pas: 500, u: "cL" },
  { m: ["soigneuse", "soigneur"], intro: (p, nb) => `Au zoo, ${p.txt} remplit ${nb} abreuvoirs`, liq: "d'eau", obj: [["l'abreuvoir des zèbres", "Zèbres", "🦓"], ["l'abreuvoir des girafes", "Girafes", "🦒"], ["l'abreuvoir des chèvres", "Chèvres", "🐐"], ["l'abreuvoir des lamas", "Lamas", "🦙"]], min: 20000, max: 90000, pas: 5000, u: "L" },
  { intro: (p, nb) => `Pour l'anniversaire de ${p.nom}, on achète ${nb} bouteilles`, liq: "de limonade", obj: [["la bouteille de limonade", "Limonade", "🥤"], ["la bouteille de jus de raisin", "Raisin", "🍇"], ["la bouteille de sirop de grenadine", "Grenadine", "🍒"], ["la bouteille d'eau pétillante", "Eau pétillante", "💧"]], min: 500, max: 2000, pas: 50, u: "cL" },
  { m: ["laborantine", "laborantin"], intro: (p, nb) => `Au laboratoire, ${p.txt} remplit ${nb} éprouvettes`, liq: "d'eau", obj: [col("l'éprouvette", "A", "🧪"), col("l'éprouvette", "B", "🧪"), col("l'éprouvette", "C", "🧪"), col("l'éprouvette", "D", "🧪")], min: 20, max: 250, pas: 5, u: "mL" },
  { m: ["vendeuse d'animalerie", "vendeur d'animalerie"], intro: (p, nb) => `À l'animalerie, ${p.txt} remplit ${nb} aquariums`, liq: "d'eau", obj: [["l'aquarium des poissons rouges", "Poissons rouges", "🐠"], ["l'aquarium des guppys", "Guppys", "🐟"], ["l'aquarium des tortues", "Tortues", "🐢"], ["l'aquarium des néons", "Néons", "🐡"]], min: 20000, max: 200000, pas: 10000, u: "L" },
  { m: ["marchande de glaces", "marchand de glaces"], intro: (p, nb) => `${p.txt} prépare ${nb} bacs de sorbet`, liq: "de sirop de fraise", obj: [["le bac au citron", "Citron", "🍋"], ["le bac à la fraise", "Fraise", "🍓"], ["le bac à la mangue", "Mangue", "🥭"], ["le bac à la noix de coco", "Coco", "🥥"]], min: 1000, max: 5000, pas: 500, u: "cL" },
  { m: ["barista", "barista"], intro: (p, nb) => `Au salon de thé, ${p.txt} remplit ${nb} théières`, liq: "de thé", obj: [["la théière rouge", "Rouge", "🫖"], ["la théière blanche", "Blanche", "🫖"], ["la théière verte", "Verte", "🫖"], ["la théière noire", "Noire", "🫖"]], min: 300, max: 1500, pas: 50, u: "cL" },
];
/** Les lots où mêler litres, centilitres et millilitres a du sens (de 25 cL à 5 L). */
const LOTS_MIX = LOTS.filter((l) => l.min <= 1000 && l.max >= 1500 && l.max <= 5000);

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
];
const fem = (n: string) => /^la /.test(n);
const lequel = (a: string, b: string) => (fem(a) && fem(b) ? "Laquelle" : "Lequel");
const premier = (o: O, x: string) => `${o[0]} contient ${x}`;

/* ───────────────────────── CONTENANCE_COMPARER ───────────────────────── */

const Q_PLUS = ["Quelle contenance est la plus grande ?", "Quel récipient contient le plus ? Choisis sa contenance.", "Choisis la plus grande contenance."];
const Q_MOINS = ["Quelle contenance est la plus petite ?", "Quel récipient contient le moins ? Choisis sa contenance.", "Choisis la plus petite contenance."];
const Q_SIGNE = ["Quelle écriture est juste ?", "Quel signe faut-il écrire entre les deux contenances ?", "Choisis la bonne comparaison.", "Quelle comparaison est vraie ?"];
const signe = (x: string, vx: number, y: string, vy: number) => (vx === vy ? `${x} = ${y}` : vx > vy ? `${x} > ${y}` : `${x} < ${y}`);

export const contenanceComparerGabarits: TutorBankItemV4[] = [
  // ★1 — 3 ou 4 récipients dans la MÊME unité : le plus grand ou le plus petit.
  tpl("contenance_comparer", "g01_le_plus_meme_unite", 1, "Les contenances ont la même unité : compare les nombres.", () => {
    const lot = un(LOTS);
    const p = perso(lot.m);
    const n = un([3, 3, 4]);
    const objs = melange([...lot.obj]).slice(0, n);
    const vals = distincts(lot.min, lot.max, Math.max(lot.pas, PAR[lot.u]), n);
    const plus = Math.random() < 0.6;
    const cible = plus ? Math.max(...vals) : Math.min(...vals);
    const e = (x: number) => ecr(x, lot.u);
    const phr = liste(objs.map((o, i) => (i === 0 ? premier(o, e(vals[i])) : `${o[0]} ${e(vals[i])}`)));
    return {
      text: `${cap(lot.intro(p, NB[n]))} : ${phr}. ${un(plus ? Q_PLUS : Q_MOINS)}`,
      ...qcm(e(cible), vals.filter((v) => v !== cible).map(e)),
      explanation: etapes(
        "Avec la même unité, c'est facile : on compare directement les nombres.",
        `On range : ${[...vals].sort((a, b) => a - b).map(e).join(" < ")}.`,
        `La contenance la plus ${plus ? "grande" : "petite"} est ${e(cible)}.`,
      ),
      canvas: cartes(objs.map((o, i) => ({ label: o[1], icon: o[2], contenance: e(vals[i]) })), plus ? "Lequel contient le plus ?" : "Lequel contient le moins ?"),
    };
  }),

  // ★1 — deux contenances dans la même unité : le bon signe (75 cL et 57 cL, voisines).
  tpl("contenance_comparer", "g02_signe_meme_unite", 1, "Même unité : compare les nombres chiffre par chiffre.", () => {
    const lot = un(LOTS);
    const p = perso(lot.m);
    const [o1, o2] = melange([...lot.obj]);
    const pas = Math.max(lot.pas, PAR[lot.u]);
    let [a, b] = distincts(lot.min, lot.max, pas, 2);
    if (Math.random() < 0.35) b = a + un([-1, 1]) * pas;
    if (b <= 0 || b === a) b = a + pas;
    const e = (x: number) => ecr(x, lot.u);
    const juste = signe(e(a), a, e(b), b);
    return {
      text: `${cap(lot.intro(p, "deux"))} : ${premier(o1, e(a))} et ${o2[0]} ${e(b)}. ${un(Q_SIGNE)}`,
      ...qcm(juste, [`${e(a)} > ${e(b)}`, `${e(a)} < ${e(b)}`, `${e(a)} = ${e(b)}`]),
      explanation: etapes(
        "Les deux contenances ont la même unité : on compare les nombres.",
        `${fr(Math.max(a, b) / PAR[lot.u])} est plus grand que ${fr(Math.min(a, b) / PAR[lot.u])}.`,
        `On écrit ${juste}.`,
      ),
      canvas: cartes([{ label: o1[1], icon: o1[2], contenance: e(a) }, { label: o2[1], icon: o2[2], contenance: e(b) }], "Compare les deux contenances."),
    };
  }),

  // ★1 — ranger 3 contenances de la même unité (piège : ranger « 125 » avant « 75 » comme des mots).
  tpl("contenance_comparer", "g03_ranger_meme_unite", 1, "Même unité : range les nombres, du plus petit au plus grand.", () => {
    const lot = un(LOTS);
    const p = perso(lot.m);
    const objs = melange([...lot.obj]).slice(0, 3);
    const vals = distincts(lot.min, lot.max, Math.max(lot.pas, PAR[lot.u]), 3);
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

  // ★2 — l'exercice de la vidéo : un récipient en L, l'autre en cL (ou mL). Lequel contient le plus ?
  tpl("contenance_comparer", "g04_l_ou_cl_lequel", 2, "On met d'abord la même unité : 1 L = 100 cL = 1 000 mL.", () => {
    const lot = un(LOTS_MIX);
    const p = perso(lot.m);
    const [o1, o2] = melange([...lot.obj]);
    const A = tire(Math.max(lot.min, 1000), Math.min(lot.max, 4000), 1000);
    const egal = Math.random() < 0.2;
    let B = egal ? A : A + (Math.random() < 0.6 ? -1 : 1) * tire(50, 900, 50);
    if (B <= 0) B = A + 250;
    const uB: U = Math.random() < 0.7 ? "cL" : "mL";
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
        "Avec deux unités différentes, on met d'abord la même unité. Attention : 75 est plus grand que 1, mais 75 cL ce n'est pas plus que 1 L !",
        `${L(A)} = ${ecr(A, uB)}. On compare ${ecr(A, uB)} et ${ecr(B, uB)}.`,
        A === B ? "Les deux contenances sont égales." : `La réponse est : ${juste}.`,
      ),
      canvas: cartes([{ label: o1[1], icon: o1[2], contenance: L(A) }, { label: o2[1], icon: o2[2], contenance: ecr(B, uB) }], "Mets les deux contenances dans la même unité."),
    };
  }),

  // ★2 — le bon signe entre une contenance en L et une en cL ou mL (égalité possible).
  tpl("contenance_comparer", "g05_signe_l_cl", 2, "Convertis d'abord les litres : 1 L = 100 cL = 1 000 mL.", () => {
    const k = entre(1, 9);
    const A = k * 1000;
    const egal = Math.random() < 0.25;
    const u: U = Math.random() < 0.65 ? "cL" : "mL";
    const d = u === "cL" ? un([10, 50, 100, 200, 250, 500, 700, 900]) : un([50, 100, 200, 300, 500, 800]);
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
      `Au marché, deux bouteilles contiennent ${x} et ${y}.`,
      `Dans la cuisine, un pichet contient ${x} et une carafe ${y}.`,
    ]);
    return {
      text: `${intro} ${un(Q_SIGNE)}`,
      ...qcm(juste, [`${x} > ${y}`, `${x} < ${y}`, `${x} = ${y}`]),
      explanation: etapes(
        "On ne compare pas les nombres tels qu'ils sont écrits : on met d'abord la même unité.",
        `${L(A)} = ${ecr(A, u)}. On compare ${ecr(vx, u)} et ${ecr(vy, u)}.`,
        `On écrit ${juste}.`,
      ),
      canvas: u === "mL" ? conversionLmL(L(A), "Combien de millilitres ?") : tableau(A, "L", "cL"),
    };
  }),

  // ★2 — la question 07 de la vidéo : trois bouteilles, 1 L, 90 cL et 120 cL.
  tpl("contenance_comparer", "g06_trois_l_cl", 2, "Écris tout en centilitres : 1 L = 100 cL.", () => {
    const lot = un(LOTS_MIX);
    const p = perso(lot.m);
    const objs = melange([...lot.obj]).slice(0, 3);
    const A = tire(Math.max(lot.min, 1000), Math.min(lot.max, 3000), 1000);
    const haut = A + tire(50, 500, 50);
    const bas = Math.max(100, A - tire(50, 500, 50));
    const vals = melange([A, haut, bas]);
    const e = (x: number) => (x === A ? L(x) : cL(x));
    const plus = Math.random() < 0.6;
    const cible = plus ? haut : bas;
    const phr = liste(objs.map((o, i) => (i === 0 ? premier(o, e(vals[i])) : `${o[0]} ${e(vals[i])}`)));
    return {
      text: `${cap(lot.intro(p, "trois"))} : ${phr}. ${un(plus ? Q_PLUS : Q_MOINS)}`,
      ...qcm(e(cible), vals.filter((v) => v !== cible).map(e)),
      explanation: etapes(
        "On met d'abord la même unité : 1 L = 100 cL.",
        `${L(A)} = ${cL(A)}. On compare ${[...vals].sort((a, b) => a - b).map(cL).join(" < ")}.`,
        `La contenance la plus ${plus ? "grande" : "petite"} est ${e(cible)}.`,
      ),
      canvas: cartes(objs.map((o, i) => ({ label: o[1], icon: o[2], contenance: e(vals[i]) })), plus ? "Lequel contient le plus ?" : "Lequel contient le moins ?"),
    };
  }),

  // ★3 — le défi de la vidéo : ranger 4 récipients écrits en L, cL et mL.
  tpl("contenance_comparer", "g07_ranger_trois_unites", 3, "Mets tout en millilitres : 1 L = 1 000 mL, 1 cL = 10 mL.", () => {
    const lot = un(LOTS_MIX);
    const p = perso(lot.m);
    const objs = melange([...lot.obj]).slice(0, 4);
    const v1 = tire(Math.max(lot.min, 1000), Math.min(lot.max, 3000), 1000);
    const reste = distincts(Math.max(lot.min, 100), Math.min(lot.max, 3000), 50, 10).filter((v) => v % 1000 !== 0 && v !== v1);
    const vals = melange([v1, ...(reste.length >= 3 ? reste.slice(0, 3) : [v1 + 200, v1 + 450, Math.max(150, v1 - 300)])]);
    // Une en L, au moins une en cL, au moins une en mL.
    const unites = new Map<number, U>();
    const autres = vals.filter((v) => v !== v1);
    unites.set(v1, "L");
    autres.forEach((v, i) => unites.set(v, i === 0 ? "mL" : i === 1 ? "cL" : un(["cL", "mL"] as U[])));
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
        "On met tout en millilitres : 1 L = 1 000 mL et 1 cL = 10 mL.",
        `${[...vals].sort((a, b) => a - b).map((v) => `${nom(v)} : ${mL(v)}`).join(" ; ")}.`,
        `L'ordre juste est ${ch(tri)}.`,
      ),
      canvas: cartes(objs.map((o, i) => ({ label: o[1], icon: o[2], contenance: e(vals[i]) })), "Range les récipients."),
    };
  }),

  // ★3 — quel récipient est assez grand ? (piège : le plus grand NOMBRE est en mL)
  tpl("contenance_comparer", "g08_assez_grand", 3, "Mets la quantité et les récipients dans la même unité.", () => {
    const lot = un(LOTS_MIX);
    const p = perso(lot.m);
    const objs = melange([...CONTENANTS]).slice(0, 3);
    const V = tire(600, 2800, 50);
    const S = (Math.floor(V / 1000) + 1) * 1000;
    const i1 = V - tire(50, 200, 50);
    const i2 = Math.max(100, V - tire(250, 500, 50));
    const vals = melange([S, i1, i2]);
    const e = (x: number) => (x === S ? L(x) : x === i1 ? mL(x) : cL(x));
    const defini = (o: O) => o[0].replace(/^une /, "la ").replace(/^un /, "le ");
    const ch = (x: number) => `${defini(objs[vals.indexOf(x)])} (${e(x)})`;
    return {
      text: `${p.txt} veut verser ${cL(V)} ${lot.liq} dans un seul récipient. ${un([`${cap(p.il)} a`, "Il y a", "Sur la table, il y a"])} ${liste(objs.map((o, i) => `${o[0]} de ${e(vals[i])}`))}. ${un(["Lequel est assez grand ?", "Quel récipient peut tout contenir sans déborder ?", "Dans lequel peut-on tout verser ?"])}`,
      ...qcm(ch(S), [ch(i1), ch(i2)]),
      explanation: etapes(
        "On met tout dans la même unité avant de comparer : 1 L = 100 cL et 10 mL = 1 cL.",
        `${mL(i1)} = ${cL(i1)} ; ${L(S)} = ${cL(S)}. Seul ${cL(S)} est plus que ${cL(V)}.`,
        `Le récipient assez grand est ${ch(S)}.`,
      ),
      canvas: cartes(objs.map((o, i) => ({ label: o[1], icon: o[2], contenance: e(vals[i]) })), `Il faut verser ${cL(V)}.`),
    };
  }),

  // ★3 — une seule comparaison est vraie (dont le piège « 75 cL > 1 L »).
  tpl("contenance_comparer", "g09_phrase_vraie", 3, "Pour chaque phrase, mets les deux contenances dans la même unité.", () => {
    const paire = () => {
      const k = entre(1, 5);
      const A = k * 1000;
      const u: U = un(["cL", "cL", "mL"] as U[]);
      const n = u === "cL" ? tire(k + 5, k * 100 + 300, 5) : tire(k * 100, k * 1000 + 900, 50);
      const B = n * PAR[u];
      return { x: L(A), vx: A, y: ecr(B, u), vy: B };
    };
    // Chaque comparaison s'écrit avec « > » ou avec « < », dans un sens ou dans l'autre.
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
      // Le piège de la vidéo : le plus grand NOMBRE déclaré le plus grand (« 75 cL > 1 L »).
      fausses.add(q.vx > q.vy ? ecrire(q.y, q.x) : ecrire(q.x, q.y));
    }
    const p = perso(un([["maîtresse", "maître"], ["professeure", "professeur"]] as const));
    const intro = un([
      `${p.txt} écrit quatre comparaisons au tableau.`,
      `${p.nom} a écrit quatre comparaisons dans son cahier.`,
      "Voici quatre comparaisons de contenances.",
      `Au marché, ${p.nom} lit quatre étiquettes de bouteilles.`,
    ]);
    return {
      text: `${intro} ${un(["Une seule est vraie : laquelle ?", "Laquelle est juste ?", "Quelle comparaison est vraie ?"])}`,
      ...qcm(vraie, [...fausses]),
      explanation: etapes(
        "Regarde toujours les unités : 75 est plus grand que 1, mais 75 cL n'est pas plus que 1 L.",
        "1 L = 100 cL = 1 000 mL : on convertit, puis on compare les nombres.",
        `La comparaison vraie est ${vraie}.`,
      ),
      canvas: RAPPEL,
    };
  }),

  // ★3 — combien de récipients contiennent plus de 1 L ?
  tpl("contenance_comparer", "g10_plus_de_un_litre", 3, "1 L = 100 cL = 1 000 mL : compare chaque contenance à 1 L.", () => {
    const lot = un(LOTS_MIX);
    const p = perso(lot.m);
    const objs = melange([...lot.obj]);
    const vals = distincts(200, 2500, 50, 8).filter((v) => v !== 1000).slice(0, 4);
    const unites = vals.map((v) => (v % 1000 === 0 ? "L" : un(["cL", "mL"] as U[])));
    const e = (i: number) => ecr(vals[i], unites[i]);
    const n = vals.filter((v) => v > 1000).length;
    const ecrN = (k: number) => (k === 0 ? "aucun récipient" : `${k} récipient${k > 1 ? "s" : ""}`);
    const brut = vals.filter((v, i) => v / PAR[unites[i]] > 1).length;
    const phr = liste(objs.map((o, i) => (i === 0 ? premier(o, e(i)) : `${o[0]} ${e(i)}`)));
    return {
      text: `${cap(lot.intro(p, "quatre"))} : ${phr}. ${un(["Combien de récipients contiennent plus de 1 L ?", "Combien de ces récipients contiennent plus d'un litre ?"])}`,
      ...qcm(ecrN(n), [ecrN(brut), ...[0, 1, 2, 3, 4].map(ecrN)]),
      explanation: etapes(
        "On compare chaque contenance à 1 L = 100 cL = 1 000 mL.",
        vals.map((v, i) => (unites[i] === "mL" ? e(i) : `${e(i)} = ${mL(v)}`)).join(" ; ") + ".",
        `${cap(ecrN(n))} ${n > 1 ? "contiennent" : "contient"} plus de 1 L.`,
      ),
      canvas: cartes(objs.map((o, i) => ({ label: o[1], icon: o[2], contenance: e(i) })), "Lesquels contiennent plus de 1 L ?"),
    };
  }),
];

/* ───────────────────────── CONTENANCE_CONVERTIR ───────────────────────── */

/** `doseur` : en cuisine, on mesure au verre doseur gradué en centilitres (la vidéo de Sofia). */
type Ctx = { m?: readonly [string, string]; f: (p: Perso, x: string) => string; min: number; max: number; doseur?: boolean };
const CTX: Ctx[] = [
  { m: ["pâtissière", "pâtissier"], f: (p, x) => `La recette de crème de ${p.txt} demande ${x} de lait.`, min: 100, max: 5000, doseur: true },
  { m: ["vendeuse de jus", "vendeur de jus"], f: (p, x) => `Au marché, ${p.txt} presse ${x} de jus d'orange.`, min: 200, max: 9000 },
  { m: ["pompière", "pompier"], f: (p, x) => `${p.txt} remplit un seau avec ${x} d'eau.`, min: 1000, max: 10000 },
  { m: ["infirmière", "infirmier"], f: (p, x) => `${p.txt} prépare un flacon de ${x} d'eau salée.`, min: 20, max: 1000 },
  { m: ["jardinière", "jardinier"], f: (p, x) => `L'arrosoir de ${p.txt} contient ${x} d'eau.`, min: 1000, max: 10000 },
  { m: ["fermière", "fermier"], f: (p, x) => `Ce matin, ${p.txt} a trait ${x} de lait.`, min: 2000, max: 20000 },
  { m: ["cuisinière", "cuisinier"], f: (p, x) => `À la cantine, ${p.txt} verse ${x} de bouillon dans la soupe.`, min: 200, max: 9000, doseur: true },
  { m: ["serveuse", "serveur"], f: (p, x) => `${p.txt} remplit une carafe de ${x} de citronnade.`, min: 250, max: 2000 },
  { m: ["peintre", "peintre"], f: (p, x) => `${p.txt} ouvre un pot de ${x} de peinture.`, min: 250, max: 9000 },
  { m: ["garagiste", "garagiste"], f: (p, x) => `${p.txt} verse ${x} d'huile dans le moteur.`, min: 500, max: 6000 },
  { m: ["soigneuse", "soigneur"], f: (p, x) => `Au zoo, ${p.txt} verse ${x} d'eau dans l'abreuvoir des chèvres.`, min: 1000, max: 20000 },
  { f: (p, x) => `La gourde de ${p.nom} contient ${x} d'eau.`, min: 250, max: 1500 },
  { m: ["marchande de glaces", "marchand de glaces"], f: (p, x) => `${p.txt} prépare ${x} de sirop de fraise pour ses sorbets.`, min: 50, max: 5000 },
  { m: ["barista", "barista"], f: (p, x) => `${p.txt} fait chauffer ${x} de lait pour les chocolats chauds.`, min: 200, max: 3000, doseur: true },
  { m: ["laborantine", "laborantin"], f: (p, x) => `Au laboratoire, ${p.txt} verse ${x} d'eau dans une éprouvette.`, min: 5, max: 500 },
  { f: (p, x) => `Pour le goûter, ${p.nom} achète ${x} de jus de pomme.`, min: 200, max: 6000 },
  { f: (p, x) => `${p.nom} prépare un biberon de ${x} de lait pour sa petite sœur.`, min: 100, max: 300 },
  { m: ["apicultrice", "apiculteur"], f: (p, x) => `${p.txt} a récolté ${x} de miel.`, min: 250, max: 9000 },
];
const ctx = (x: number) => {
  const l = CTX.filter((c) => x >= c.min && x <= c.max);
  return un(l.length ? l : CTX);
};
const enonce = (x: number, s: string) => {
  const c = ctx(x);
  return { c, p: perso(c.m), s };
};
const QVERS = (u: U) => [
  `Combien de ${NOM_U[u]} cela fait-il ?`,
  `Écris cette quantité en ${NOM_U[u]}.`,
  `Quelle est cette quantité en ${u} ?`,
  `Convertis cette quantité en ${NOM_U[u]}.`,
];

export const contenanceConvertirGabarits: TutorBankItemV4[] = [
  // ★2 — l'exercice de la vidéo : des litres vers les centilitres, on multiplie par 100.
  tpl("contenance_convertir", "g01_l_vers_cl", 2, "1 L = 100 cL : on multiplie par 100.", () => {
    const n = un([1, 2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 12, 15]);
    const x = n * 1000;
    const { c, p } = enonce(x, "");
    const doseur = !!c.doseur && Math.random() < 0.6;
    const q = doseur
      ? `Son verre doseur est gradué en centilitres : combien de cL ${p.il === "elle" ? "doit-elle" : "doit-il"} compter ?`
      : un(QVERS("cL"));
    return {
      text: `${c.f(p, L(x))} ${q}`,
      ...qcmV(x, [n * 100, n * 10000, n * 10], cL, 100),
      explanation: etapes("Des litres vers les centilitres, on multiplie par 100 (1 L = 100 cL).", `${fr(n)} × 100 = ${fr(n * 100)}.`, `${L(x)} = ${cL(x)}.`),
      canvas: tableau(x, "L", "cL"),
    };
  }),

  // ★2 — des litres vers les millilitres (piège de la vidéo : 3 L, ce n'est pas 300 mL).
  tpl("contenance_convertir", "g02_l_vers_ml", 2, "1 L = 1 000 mL : on multiplie par 1 000.", () => {
    const n = un([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    const x = n * 1000;
    const { c, p } = enonce(x, "");
    return {
      text: `${c.f(p, L(x))} ${un(QVERS("mL"))}`,
      ...qcmV(x, [n * 100, n * 10, n * 10000], mL, 1000),
      explanation: etapes("Des litres vers les millilitres, on multiplie par 1 000 (1 L = 1 000 mL). 300, ce seraient des centilitres !", `${fr(n)} × 1 000 = ${fr(x)}.`, `${L(x)} = ${mL(x)}.`),
      canvas: conversionLmL(L(x), "Combien de millilitres ?"),
    };
  }),

  // ★2 — des centilitres vers les millilitres, on multiplie par 10 (5 cL de sirop → 50 mL).
  tpl("contenance_convertir", "g03_cl_vers_ml", 2, "1 cL = 10 mL : on multiplie par 10.", () => {
    const n = un([5, 10, 15, 20, 25, 30, 33, 40, 45, 50, 60, 75, 80, 2, 3, 4, 8]);
    const x = n * 10;
    const { c, p } = enonce(x, "");
    return {
      text: `${c.f(p, cL(x))} ${un(QVERS("mL"))}`,
      ...qcmV(x, [n * 100, n, n * 1000], mL, 10),
      explanation: etapes("Des centilitres vers les millilitres, on multiplie par 10 (1 cL = 10 mL).", `${fr(n)} × 10 = ${fr(x)}.`, `${cL(x)} = ${mL(x)}.`),
      canvas: tableau(x, "cL", "mL"),
    };
  }),

  // ★2 — les trois égalités à retenir (et les deux du décilitre).
  tpl("contenance_convertir", "g04_egalites", 2, "Retiens : 1 L = 100 cL, 1 L = 1 000 mL, 1 cL = 10 mL.", () => {
    const R = un([
      { g: "1 L", u: "cL" as U, v: 1000, faux: [100, 10000, 10] },
      { g: "1 L", u: "mL" as U, v: 1000, faux: [100, 10, 10000] },
      { g: "1 cL", u: "mL" as U, v: 10, faux: [100, 1000, 1] },
      { g: "1 L", u: "dL" as U, v: 1000, faux: [10000, 100000, 100] },
      { g: "1 dL", u: "cL" as U, v: 100, faux: [1000, 10000, 10] },
    ]);
    const p = perso(un([["pâtissière", "pâtissier"], ["cuisinière", "cuisinier"], ["vendeuse de jus", "vendeur de jus"]] as const));
    const e = (x: number) => ecr(x, R.u);
    const forme = entre(0, 3);
    const text =
      forme === 0
        ? `Complète : ${R.g} = … ${R.u}.`
        : forme === 1
          ? `Combien de ${NOM_U[R.u]} y a-t-il dans ${R.g === "1 L" ? "1 litre" : R.g === "1 cL" ? "1 centilitre" : "1 décilitre"} ?`
          : forme === 2
            ? `${p.txt} vérifie son verre doseur avant de cuisiner. ${R.g} = combien de ${R.u} ?`
            : `Quelle égalité est juste ?`;
    const juste = forme === 3 ? `${R.g} = ${e(R.v)}` : e(R.v);
    const faux = R.faux.map((f) => (forme === 3 ? `${R.g} = ${e(f)}` : e(f)));
    return {
      text,
      ...qcm(juste, faux),
      explanation: etapes("Trois égalités à retenir : 1 L = 100 cL, 1 L = 1 000 mL, 1 cL = 10 mL. Et 1 L = 10 dL, 1 dL = 10 cL.", `${R.g} = ${e(R.v)}.`, `La réponse est ${juste}.`),
      canvas: tableau(R.g === "1 L" ? 1000 : R.g === "1 dL" ? 100 : 10, R.g === "1 L" ? "L" : R.g === "1 dL" ? "dL" : "cL", R.u),
    };
  }),

  // ★3 — vers le litre, on divise : 600 cL → 6 L (question 07 de la vidéo).
  tpl("contenance_convertir", "g05_cl_vers_l", 3, "100 cL = 1 L : on divise par 100.", () => {
    const n = un([2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20]);
    const x = n * 1000;
    const { c, p } = enonce(x, "");
    return {
      text: `${c.f(p, cL(x))} ${un(QVERS("L"))}`,
      ...qcmV(x, [n * 10000, n * 100000, n * 1000000, n * 100], L, 1000),
      explanation: etapes("Pour revenir aux litres, on divise par 100 (100 cL = 1 L).", `${fr(n * 100)} ÷ 100 = ${fr(n)}, car ${fr(n)} × 100 = ${fr(n * 100)}.`, `${cL(x)} = ${L(x)}.`),
      canvas: tableauCorresp("centilitres (cL)", "litres (L)", "100", "1", fr(n * 100), "?"),
    };
  }),

  // ★3 — des millilitres vers les litres, on divise par 1 000 (4 000 mL → 4 L).
  tpl("contenance_convertir", "g06_ml_vers_l", 3, "1 000 mL = 1 L : on divise par 1 000.", () => {
    const n = un([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    const x = n * 1000;
    const { c, p } = enonce(x, "");
    return {
      text: `${c.f(p, mL(x))} ${un(QVERS("L"))}`,
      ...qcmV(x, [n * 10000, n * 100000, x * 1000], L, 1000),
      explanation: etapes("Pour revenir aux litres, on divise par 1 000 (1 000 mL = 1 L).", `${fr(x)} ÷ 1 000 = ${fr(n)}.`, `${mL(x)} = ${L(x)}.`),
      canvas: conversionLmL(mL(x), "Combien de litres ?"),
    };
  }),

  // ★3 — une écriture en deux unités : 2 L 35 cL → cL, 1 L 500 mL → mL.
  tpl("contenance_convertir", "g07_deux_unites", 3, "Convertis d'abord les litres, puis ajoute le reste.", () => {
    const l = entre(1, 5);
    if (Math.random() < 0.55) {
      const r = tire(5, 95, 5);
      const x = l * 1000 + r * 10;
      const { c, p } = enonce(x, "");
      return {
        text: `${c.f(p, Lcl(x))} ${un(QVERS("cL"))}`,
        ...qcmV(x, [(l + r) * 10, (l * 1000 + r) * 10, (l * 10 + r) * 10], cL, 100),
        explanation: etapes("On convertit les litres en centilitres (× 100), puis on ajoute les centilitres.", `${fr(l)} L = ${fr(l * 100)} cL ; ${fr(l * 100)} + ${fr(r)} = ${fr(l * 100 + r)}.`, `${Lcl(x)} = ${cL(x)}.`),
        canvas: tableau(x, "cL", "cL"),
      };
    }
    const r = tire(50, 950, 50);
    const x = l * 1000 + r;
    const { c, p } = enonce(x, "");
    return {
      text: `${c.f(p, Lml(x))} ${un(QVERS("mL"))}`,
      ...qcmV(x, [l + r, l * 100 + r, l * 10000 + r], mL, 1000),
      explanation: etapes("On convertit les litres en millilitres (× 1 000), puis on ajoute les millilitres.", `${fr(l)} L = ${fr(l * 1000)} mL ; ${fr(l * 1000)} + ${fr(r)} = ${fr(x)}.`, `${Lml(x)} = ${mL(x)}.`),
      canvas: tableau(x, "mL", "mL"),
    };
  }),

  // ★3 — le décilitre, au tableau de conversion : L → dL, dL → cL, dL → mL.
  tpl("contenance_convertir", "g08_decilitre", 3, "Dans le tableau, chaque colonne vaut 10 fois la suivante : 1 L = 10 dL, 1 dL = 10 cL.", () => {
    const cas = entre(0, 2);
    const n = cas === 0 ? entre(2, 9) : entre(2, 15);
    const x = cas === 0 ? n * 1000 : n * 100;
    const de: U = cas === 0 ? "L" : "dL";
    const vers: U = cas === 2 ? "mL" : cas === 0 ? "dL" : "cL";
    const { c, p } = enonce(x, "");
    const k = PAR[de] / PAR[vers];
    return {
      text: `${c.f(p, ecr(x, de))} ${un(QVERS(vers))}`,
      ...qcmV(x, [x * 10, x / 10, x * 100], (v) => ecr(v, vers), PAR[vers]),
      explanation: etapes(`Vers une unité plus petite, on multiplie : 1 ${de} = ${fr(k)} ${vers}.`, `${fr(n)} × ${fr(k)} = ${fr(n * k)}.`, `${ecr(x, de)} = ${ecr(x, vers)}.`),
      canvas: tableau(x, de, vers),
    };
  }),

  // ★3 — le verre doseur de Sofia : lire la graduation, puis convertir.
  tpl("contenance_convertir", "g09_verre_doseur", 3, "Lis d'abord la graduation, puis convertis.", () => {
    const p = perso(un([["pâtissière", "pâtissier"], ["cuisinière", "cuisinier"], ["barista", "barista"], ["laborantine", "laborantin"]] as const));
    const liq = un(["du lait", "de l'eau", "de la crème", "du jus d'orange", "du sirop"]);
    if (Math.random() < 0.5) {
      // gradué en cL (de 10 en 10, petits traits de 5 en 5) → combien de mL ?
      const v = tire(5, 95, 5);
      const x = v * 10;
      return {
        text: `${p.txt} verse ${liq} dans un verre doseur gradué en centilitres. Le niveau arrive au repère « ? ». ${un(["Combien de millilitres a-t-on versé ?", "Quelle quantité est-ce, en millilitres ?"])}`,
        ...qcmV(x, [v, v * 100, (v + 5) * 10, (v - 5) * 10], mL, 50),
        explanation: etapes("On lit la graduation en centilitres (un petit trait = 5 cL), puis on multiplie par 10 : 1 cL = 10 mL.", `Le niveau est à ${fr(v)} cL ; ${fr(v)} × 10 = ${fr(x)}.`, `On a versé ${mL(x)}.`),
        canvas: graduation(100, 10, 5, v),
      };
    }
    // gradué en mL (de 100 en 100, petits traits de 50 en 50) → combien de cL ?
    const v = tire(50, 950, 50);
    return {
      text: `${p.txt} verse ${liq} dans un verre doseur gradué en millilitres. Le niveau arrive au repère « ? ». ${un(["Combien de centilitres a-t-on versé ?", "Quelle quantité est-ce, en centilitres ?"])}`,
      ...qcmV(v, [v * 10, v / 10, v + 50, v - 50], cL, 50),
      explanation: etapes("On lit la graduation en millilitres (un petit trait = 50 mL), puis on divise par 10 : 10 mL = 1 cL.", `Le niveau est à ${fr(v)} mL ; ${fr(v)} ÷ 10 = ${fr(v / 10)}.`, `On a versé ${cL(v)}.`),
      canvas: graduation(1000, 100, 50, v),
    };
  }),

  // ★3 — le défi de la vidéo : 1 L de crème, on en verse 25 cL, combien reste-t-il ?
  tpl("contenance_convertir", "g10_reste_apres_conversion", 3, "D'abord la même unité : 1 L = 100 cL.", () => {
    const n = un([1, 1, 2, 3]);
    const b = tire(5, n * 100 - 5, 5);
    const r = n * 100 - b;
    const p = perso(un([["pâtissière", "pâtissier"], ["serveuse", "serveur"], ["cuisinière", "cuisinier"], ["vendeuse de jus", "vendeur de jus"], ["barista", "barista"]] as const));
    const liq = un(["de crème", "de lait", "de jus de pomme", "de sirop", "de citronnade"]);
    const rec = un(["un bol", "une casserole", "un verre", "un saladier", "une tasse"]);
    return {
      text: `${p.txt} a une bouteille de ${L(n * 1000)} ${liq}. ${cap(p.il)} en verse ${fr(b)} cL dans ${rec}. ${un(["Combien de centilitres reste-t-il dans la bouteille ?", "Quelle quantité reste-t-il, en cL ?"])}`,
      ...qcmV(r * 10, [Math.abs(b - n) * 10, (n * 1000 - b) * 10, (n * 100 + b) * 10], cL, 50),
      explanation: etapes("D'abord la même unité : 1 L = 100 cL. Puis on enlève.", `${L(n * 1000)} = ${fr(n * 100)} cL ; ${fr(n * 100)} − ${fr(b)} = ${fr(r)}.`, `Il reste ${fr(r)} cL.`),
      canvas: cartes([{ label: "Bouteille", icon: "🧴", contenance: L(n * 1000) }, { label: "Versé", icon: "🥣", contenance: `${fr(b)} cL` }], "Combien reste-t-il ?"),
    };
  }),

  // ★3 — conversion en situation, dans tous les sens (vers le plus petit on multiplie, vers le litre on divise).
  tpl("contenance_convertir", "g11_situation_tous_sens", 3, "Vers une unité plus petite, on multiplie ; vers le litre, on divise.", () => {
    const sens = un([
      { de: "L" as U, vers: "cL" as U, x: entre(2, 9) * 1000 },
      { de: "L" as U, vers: "mL" as U, x: entre(2, 9) * 1000 },
      { de: "cL" as U, vers: "mL" as U, x: tire(10, 90, 5) * 10 },
      { de: "mL" as U, vers: "cL" as U, x: tire(10, 90, 5) * 10 },
      { de: "cL" as U, vers: "L" as U, x: entre(2, 9) * 1000 },
    ]);
    const { c, p } = enonce(sens.x, "");
    const k = PAR[sens.de] / PAR[sens.vers];
    const e = (v: number) => ecr(v, sens.vers);
    const faux = k > 1 ? [sens.x * 10, sens.x / 10, sens.x * 100] : [sens.x * 10, sens.x * 100, sens.x / 10];
    return {
      text: `${c.f(p, ecr(sens.x, sens.de))} ${un(QVERS(sens.vers))}`,
      ...qcmV(sens.x, faux, e, PAR[sens.vers]),
      explanation: etapes(
        k > 1 ? `Vers une unité plus petite, on multiplie : 1 ${sens.de} = ${fr(k)} ${sens.vers}.` : `Vers une unité plus grande, on divise : ${fr(1 / k)} ${sens.de} = 1 ${sens.vers}.`,
        k > 1 ? `${fr(sens.x / PAR[sens.de])} × ${fr(k)} = ${fr(sens.x / PAR[sens.vers])}.` : `${fr(sens.x / PAR[sens.de])} ÷ ${fr(1 / k)} = ${fr(sens.x / PAR[sens.vers])}.`,
        `${ecr(sens.x, sens.de)} = ${e(sens.x)}.`,
      ),
      canvas: sens.de === "L" && sens.vers === "mL" ? conversionLmL(L(sens.x), "Combien de millilitres ?") : k > 1 ? tableau(sens.x, sens.de, sens.vers) : tableauCorresp(`${NOM_U[sens.de]} (${sens.de})`, `${NOM_U[sens.vers]} (${sens.vers})`, fr(1 / k), "1", fr(sens.x / PAR[sens.de]), "?"),
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
  /** L'unité adaptée : petit récipient → mL ou cL ; grand → L. */
  u: U;
  qui?: readonly [string, string];
};
const ob = (def: string, indef: string, label: string, icon: string, juste: string, loin: string[], proche: string[], u: U, qui?: readonly [string, string]): Ob => ({ def, indef, label, icon, juste, loin, proche, u, qui });
const OBJETS: Ob[] = [
  ob("la petite cuillère", "une petite cuillère", "Petite cuillère", "🥄", "5 mL", ["5 L", "10 L", "50 L"], ["50 mL", "1 L", "50 cL"], "mL", ["cuisinière", "cuisinier"]),
  ob("la cuillère à soupe", "une cuillère à soupe", "Cuillère à soupe", "🥄", "15 mL", ["15 L", "150 L", "50 L"], ["150 mL", "1,5 L", "1 mL"], "mL", ["cuisinière", "cuisinier"]),
  ob("le verre", "un verre", "Verre", "🥛", "20 cL", ["20 L", "200 L", "2 mL"], ["2 L", "2 cL", "20 L"], "cL", ["serveuse", "serveur"]),
  ob("la tasse", "une tasse", "Tasse", "☕", "25 cL", ["25 L", "250 L", "2 mL"], ["2,5 L", "25 mL", "2 L"], "cL", ["barista", "barista"]),
  ob("le bol", "un bol", "Bol", "🥣", "50 cL", ["50 L", "500 L", "5 mL"], ["5 L", "5 cL", "3 L"], "cL", ["cuisinière", "cuisinier"]),
  ob("la canette", "une canette", "Canette", "🥫", "33 cL", ["33 L", "330 L", "3 mL"], ["3,3 L", "33 mL", "3 L"], "cL"),
  ob("la gourde d'élève", "une gourde d'élève", "Gourde", "🚰", "500 mL", ["50 L", "5 mL", "20 L"], ["5 L", "50 mL", "10 L"], "mL", ["entraîneuse de foot", "entraîneur de foot"]),
  ob("la bouteille d'eau", "une bouteille d'eau", "Bouteille d'eau", "🧴", "1 L", ["1 mL", "100 L", "10 mL"], ["10 L", "10 cL", "5 L"], "L", ["vendeuse de jus", "vendeur de jus"]),
  ob("la brique de lait", "une brique de lait", "Brique de lait", "🥛", "1 L", ["1 mL", "100 L", "10 mL"], ["10 L", "10 cL", "50 L"], "L", ["fermière", "fermier"]),
  ob("le biberon", "un biberon", "Biberon", "🍼", "250 mL", ["25 L", "250 L", "2 mL"], ["2,5 L", "25 mL", "5 L"], "mL", ["puéricultrice", "puériculteur"]),
  ob("le flacon de parfum", "un flacon de parfum", "Flacon de parfum", "🌸", "50 mL", ["50 L", "500 L", "5 L"], ["500 mL", "5 mL", "2 L"], "mL", ["parfumeuse", "parfumeur"]),
  ob("le flacon de sirop", "un flacon de sirop", "Flacon de sirop", "🧴", "150 mL", ["150 L", "15 L", "1 mL"], ["15 mL", "1,5 L", "15 L"], "mL", ["infirmière", "infirmier"]),
  ob("la louche", "une louche", "Louche", "🥄", "10 cL", ["10 L", "100 L", "1 mL"], ["1 L", "1 cL", "5 L"], "cL", ["cuisinière", "cuisinier"]),
  ob("la casserole", "une casserole", "Casserole", "🍲", "2 L", ["2 mL", "200 L", "20 mL"], ["20 L", "20 cL", "2 cL"], "L", ["cuisinière", "cuisinier"]),
  ob("le seau", "un seau", "Seau", "🪣", "10 L", ["10 mL", "10 cL", "1 000 L"], ["100 L", "1 L", "50 L"], "L", ["pompière", "pompier"]),
  ob("l'arrosoir", "un arrosoir", "Arrosoir", "🪴", "10 L", ["10 mL", "10 cL", "1 000 L"], ["100 L", "1 L", "50 cL"], "L", ["jardinière", "jardinier"]),
  ob("le jerrican", "un jerrican", "Jerrican", "🛢️", "20 L", ["20 mL", "20 cL", "2 000 L"], ["200 L", "2 L", "5 L"], "L", ["garagiste", "garagiste"]),
  ob("l'aquarium du salon", "un aquarium de salon", "Aquarium", "🐠", "60 L", ["60 mL", "60 cL", "6 000 L"], ["6 L", "600 L", "6 000 L"], "L", ["vendeuse d'animalerie", "vendeur d'animalerie"]),
  ob("le réservoir de la voiture", "un réservoir de voiture", "Réservoir", "🚗", "50 L", ["50 mL", "50 cL", "5 000 L"], ["5 L", "500 L", "5 000 L"], "L", ["garagiste", "garagiste"]),
  ob("la baignoire", "une baignoire", "Baignoire", "🛁", "150 L", ["15 cL", "15 mL", "2 L"], ["15 L", "1 500 L", "2 L"], "L", ["plombière", "plombier"]),
  ob("le ballon d'eau chaude", "un ballon d'eau chaude", "Ballon d'eau chaude", "🔥", "200 L", ["200 mL", "2 cL", "2 L"], ["20 L", "2 000 L", "2 L"], "L", ["plombière", "plombier"]),
  ob("la cuve à eau de pluie", "une cuve à eau de pluie", "Cuve", "🌧️", "300 L", ["300 mL", "3 cL", "3 L"], ["30 L", "3 000 L", "3 L"], "L", ["jardinière", "jardinier"]),
  ob("la piscine gonflable", "une piscine gonflable", "Piscine gonflable", "🏊", "2 000 L", ["2 L", "20 cL", "5 L"], ["200 L", "20 L", "20 000 L"], "L"),
  ob("la citerne du camion de pompier", "une citerne de camion de pompier", "Citerne", "🚒", "3 000 L", ["3 L", "30 cL", "30 L"], ["30 L", "300 L", "30 000 L"], "L", ["pompière", "pompier"]),
];
const v = (o: Ob) => lire(o.juste) ?? 0;
const REPERES = "petite cuillère 5 mL, verre 20 cL, bouteille 1 L, seau 10 L, baignoire 150 L";
const QUI_ESTIME = (o: Ob) => {
  const p = perso(o.qui);
  return un([
    `${p.txt} remplit ${o.indef} à ras bord.`,
    `${p.txt} se demande combien contient ${o.def}.`,
    `${p.txt} veut remplir ${o.indef}.`,
    `${p.txt} regarde ${o.indef}.`,
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
const UNITE_NOM: Record<U, string> = { L: "le litre (L)", dL: "le décilitre (dL)", cL: "le centilitre (cL)", mL: "le millilitre (mL)" };

export const contenanceEstimerGabarits: TutorBankItemV4[] = [
  // ★1 — quelle contenance pour cet objet ? (leurres très loin : l'unité ne va pas)
  tpl("contenance_estimer", "g01_contenance_loin", 1, "Pense à la taille du récipient et aux repères : un verre 20 cL, un seau 10 L.", () => {
    const o = un(OBJETS);
    return {
      text: `${QUI_ESTIME(o)} ${qEst(o)}`,
      ...qcmC(o.juste, o.loin),
      explanation: etapes(`On compare à des repères : ${REPERES}.`, `${cap(o.def)} contient environ ${o.juste}.`, `La contenance raisonnable est ${o.juste}.`),
      canvas: estimation(o.label, o.icon, "Quelle contenance est raisonnable ?"),
    };
  }),

  // ★1 — quelle unité choisir ? Petit récipient : mL ou cL ; grand : L.
  tpl("contenance_estimer", "g02_quelle_unite", 1, "Petit récipient : millilitres ou centilitres. Grand récipient : litres.", () => {
    const o = un(OBJETS);
    const juste = UNITE_NOM[o.u];
    const faux = o.u === "L" ? [UNITE_NOM.mL, "le kilogramme (kg)", "le mètre (m)"] : [UNITE_NOM.L, "le kilogramme (kg)", "le mètre (m)"];
    return {
      text: `${un(["Pour mesurer la contenance", "Pour dire combien contient", "Pour écrire la contenance"])} ${o.def.replace(/^le /, "du ").replace(/^la /, "de la ").replace(/^l'/, "de l'")}, ${un(["quelle unité est la mieux adaptée ?", "quelle unité choisir ?", "quelle unité utiliser ?"])}`.replace("combien contient du ", "combien contient le ").replace("combien contient de la ", "combien contient la ").replace("combien contient de l'", "combien contient l'"),
      ...qcm(juste, faux),
      explanation: etapes("Pour un petit récipient, on parle en millilitres ou en centilitres ; pour un grand récipient, en litres. Le kilogramme mesure une masse, le mètre une longueur.", `${cap(o.def)} contient environ ${o.juste}.`, `On choisit ${juste}.`),
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

  // ★2 — le piège de la vidéo : « 10 L pour une petite cuillère, c'est impossible ».
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

  // ★2 — la citerne de Malik : 30 L, 300 L ou 3 000 L ? (ordre de grandeur, même unité)
  tpl("contenance_estimer", "g05_ordre_de_grandeur", 2, "Compare aux repères : un seau contient 10 L, une baignoire environ 150 L.", () => {
    const o = un(OBJETS.filter((x) => !/,/.test(x.juste)));
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
      { nom: "seaux de 10 L", x: 10000 },
      { nom: "bouteilles de 1 L", x: 1000 },
      { nom: "verres de 20 cL", x: 200 },
      { nom: "petites cuillères de 5 mL", x: 5 },
    ];
    const paires: { o: Ob; r: (typeof REP)[number]; n: number }[] = [];
    for (const o of OBJETS) for (const r of REP) {
      const n = v(o) / r.x;
      if (Number.isInteger(n) && n >= 2 && n <= 300) paires.push({ o, r, n });
    }
    const { o, r, n } = un(paires);
    const u: U = o.juste.endsWith(" L") ? "L" : o.juste.endsWith("cL") ? "cL" : "mL";
    const j = v(o);
    const faux = [ecr(n * PAR[u], u), ecr(j * 10, u), ecr(j / 10, u), ecr(n * r.x * 100, u)].filter((s) => !/\d,\d/.test(s) || /,5 /.test(s));
    return {
      text: `${cap(o.def)} contient à peu près autant que ${fr(n)} ${r.nom}. ${un(["Quelle est sa contenance, environ ?", "Combien contient-elle ou il, environ ?", "Quelle estimation est juste ?"]).replace("elle ou il", /^(la |une )/.test(o.def) ? "elle" : "il")}`,
      ...qcmC(o.juste, faux),
      explanation: etapes("On utilise un repère connu, puis on multiplie.", `${fr(n)} × ${ecr(r.x, r.x >= 1000 ? "L" : r.x >= 10 ? "cL" : "mL")} = ${o.juste}.`, `${cap(o.def)} contient environ ${o.juste}.`),
      canvas: estimation(o.label, o.icon, `Autant que ${fr(n)} ${r.nom}`),
    };
  }),

  // ★3 — le défi de la vidéo : trois récipients, trois contenances, qui va avec quoi ?
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
  { m: ["fermière", "fermier"], verbe: "a trait", encore: "en trait", liq: "de lait", tout: "tout le lait", pot: ["bouteille", "bouteilles", "🥛"], tailles: [500, 250, 1000] },
  { m: ["cuisinière", "cuisinier"], verbe: "a préparé", encore: "en prépare", liq: "de soupe", tout: "toute la soupe", pot: ["bol", "bols", "🥣"], tailles: [250, 200, 500] },
  { m: ["serveuse", "serveur"], verbe: "a préparé", encore: "en prépare", liq: "de citronnade", tout: "toute la citronnade", pot: ["verre", "verres", "🍋"], tailles: [250, 200] },
  { m: ["parfumeuse", "parfumeur"], verbe: "a fabriqué", encore: "en fabrique", liq: "de parfum", tout: "tout le parfum", pot: ["flacon", "flacons", "🌸"], tailles: [50, 100, 250] },
  { m: ["soigneuse", "soigneur"], verbe: "a préparé", encore: "en prépare", liq: "de lait pour les agneaux", tout: "tout le lait", pot: ["biberon", "biberons", "🍼"], tailles: [250, 500, 200] },
  { m: ["peintre", "peintre"], verbe: "a mélangé", encore: "en mélange", liq: "de peinture verte", tout: "toute la peinture", pot: ["petit pot", "petits pots", "🎨"], tailles: [250, 500, 200] },
  { m: ["entraîneuse de foot", "entraîneur de foot"], verbe: "a apporté", encore: "en apporte", liq: "d'eau", tout: "toute l'eau", pot: ["gourde", "gourdes", "🚰"], tailles: [500, 250, 1000] },
  { verbe: "a acheté", encore: "en achète", liq: "de jus de pomme", tout: "tout le jus", pot: ["gobelet", "gobelets", "🥤"], tailles: [200, 250] },
  { m: ["barista", "barista"], verbe: "a préparé", encore: "en prépare", liq: "de chocolat chaud", tout: "tout le chocolat chaud", pot: ["tasse", "tasses", "☕"], tailles: [200, 250] },
  { m: ["laborantine", "laborantin"], verbe: "a préparé", encore: "en prépare", liq: "d'eau colorée", tout: "toute l'eau colorée", pot: ["éprouvette", "éprouvettes", "🧪"], tailles: [50, 100, 20] },
  { m: ["savonnière", "savonnier"], verbe: "a fabriqué", encore: "en fabrique", liq: "de savon liquide", tout: "tout le savon", pot: ["flacon", "flacons", "🧼"], tailles: [250, 500, 200] },
  { m: ["marchande de glaces", "marchand de glaces"], verbe: "a préparé", encore: "en prépare", liq: "de sirop de fraise", tout: "tout le sirop", pot: ["bouteille", "bouteilles", "🍓"], tailles: [250, 500] },
];
const QUAND = ["Le matin", "Lundi", "Hier", "Au début de la journée", "Ce matin"];
const QUAND2 = ["L'après-midi", "Le lendemain", "Un peu plus tard", "Le soir"];
/** « 25 cL » ou « 250 mL » pour un petit récipient de t mL. */
const taille = (t: number, cl = Math.random() < 0.6) => (t % 10 === 0 && cl ? cL(t) : mL(t));
const elle = (p: Perso) => p.il;
const peut = (p: Perso) => (p.il === "elle" ? "peut-elle" : "peut-il");
const at = (p: Perso) => (p.il === "elle" ? "a-t-elle" : "a-t-il");

/** Ajouter : a L + b cL (★3, en cL) ou a L + b mL (★4, en mL) ; piège 2 L + 50 cL = 52. */
const ajouter = (niv: 3 | 4) =>
  tpl("contenance_defi", `g0${niv === 3 ? 1 : 5}_ajouter_${niv === 3 ? "cl" : "ml"}`, niv, "D'abord la même unité, puis on ajoute.", () => {
    const d = un(DLOTS);
    const p = perso(d.m);
    const a = entre(1, 6);
    const u: U = niv === 3 ? "cL" : "mL";
    const b = niv === 3 ? tire(5, 95, 5) * 10 : tire(50, 950, 50);
    const tot = a * 1000 + b;
    const k = PAR.L / PAR[u];
    const e = (x: number) => ecr(x, u);
    return {
      text: `${un(QUAND)}, ${p.txt} ${d.verbe} ${fr(a)} L ${d.liq}. ${un(QUAND2)}, ${elle(p)} ${d.encore} encore ${e(b)}. ${un([`Combien de ${NOM_U[u]} ${at(p)} en tout ?`, `Quelle quantité ${at(p)} en tout, en ${u} ?`])}`,
      ...qcmV(tot, [(a + b / PAR[u]) * PAR[u], (a * (k / 10) + b / PAR[u]) * PAR[u], (a * k * 10 + b / PAR[u]) * PAR[u]], e, 10 * PAR[u]),
      explanation: etapes(`Attention : ${fr(a)} L + ${e(b)}, ce n'est pas ${fr(a + b / PAR[u])} ! D'abord la même unité : 1 L = ${fr(k)} ${u}.`, `${fr(a)} L = ${fr(a * k)} ${u} ; ${fr(a * k)} + ${fr(b / PAR[u])} = ${fr(tot / PAR[u])}.`, `${cap(elle(p))} a ${e(tot)} en tout.`),
      canvas: cartes([{ label: "D'abord", icon: d.pot[2], contenance: `${fr(a)} L` }, { label: "Encore", icon: d.pot[2], contenance: e(b) }], "Combien en tout ?"),
    };
  });

/** Enlever : a L − b cL (★3) ou a L − b mL (★4) ; question 07 de la vidéo (5 L − 150 cL). */
const enlever = (niv: 3 | 4) =>
  tpl("contenance_defi", `g0${niv === 3 ? 2 : 6}_enlever_${niv === 3 ? "cl" : "ml"}`, niv, "D'abord la même unité, puis on enlève.", () => {
    const d = un(DLOTS);
    const p = perso(d.m);
    const a = entre(1, 6);
    const u: U = niv === 3 ? "cL" : "mL";
    const pas = niv === 3 ? 50 : 50;
    const b = tire(pas, Math.min(a * 1000 - pas, niv === 3 ? 950 * a : 4500), pas);
    const r = a * 1000 - b;
    const k = PAR.L / PAR[u];
    const e = (x: number) => ecr(x, u);
    const bb = b / PAR[u];
    return {
      text: `${p.txt} ${d.verbe} ${fr(a)} L ${d.liq}. ${cap(elle(p))} en ${un(["verse", "utilise", "donne", "vend"])} ${e(b)}. ${un([`Combien de ${NOM_U[u]} reste-t-il ?`, `Quelle quantité reste-t-il, en ${u} ?`])}`,
      ...qcmV(r, [Math.abs(bb - a) * PAR[u], (a * k + bb) * PAR[u], (a * k * 10 - bb) * PAR[u]], e, 10 * PAR[u]),
      explanation: etapes(`D'abord la même unité : 1 L = ${fr(k)} ${u}. Puis on enlève.`, `${fr(a)} L = ${fr(a * k)} ${u} ; ${fr(a * k)} − ${fr(bb)} = ${fr(r / PAR[u])}.`, `Il reste ${e(r)}.`),
      canvas: cartes([{ label: "Au départ", icon: d.pot[2], contenance: `${fr(a)} L` }, { label: "Enlevé", icon: d.pot[2], contenance: e(b) }], "Combien reste-t-il ?"),
    };
  });

export const contenanceDefiGabarits: TutorBankItemV4[] = [
  ajouter(3),
  enlever(3),

  // ★3 — l'exercice type de la vidéo : 2 L de miel en pots de 25 cL → combien de fois 25 dans 200.
  tpl("contenance_defi", "g03_combien_de_pots", 3, "D'abord la même unité, puis cherche combien de fois le petit récipient tient dans le grand.", () => {
    const d = un(DLOTS);
    const p = perso(d.m);
    const t = un(d.tailles.filter((x) => x % 10 === 0 && x < 1000 && 1000 % x === 0));
    const a = entre(1, t <= 100 ? 2 : 5);
    const n = (a * 1000) / t;
    return {
      text: `${p.txt} ${d.verbe} ${fr(a)} L ${d.liq}. ${cap(elle(p))} ${un(["verse tout dans des", "remplit des", "répartit tout dans des"])} ${d.pot[1]} de ${cL(t)}. Combien de ${d.pot[1]} ${peut(p)} remplir ?`,
      ...qcmN(n, [n * 10, n / 2, a * (t / 10), Math.round((a * 10) / (t / 10)) || n + 2], d.pot[1]),
      explanation: etapes("D'abord la même unité : 1 L = 100 cL. Puis on cherche combien de fois le petit récipient tient dans le grand.", `${fr(a)} L = ${fr(a * 100)} cL ; ${fr(t / 10)} × ${fr(n)} = ${fr(a * 100)}.`, `${cap(elle(p))} remplit ${fr(n)} ${d.pot[1]}.`),
      canvas: cartes([{ label: "Tout", icon: d.pot[2], contenance: `${fr(a)} L` }, { label: cap(d.pot[0]), icon: d.pot[2], contenance: cL(t) }], `Combien de ${d.pot[1]} ?`),
    };
  }),

  // ★3 — combien faut-il ajouter pour avoir 1 L (ou 2 L) ?
  tpl("contenance_defi", "g04_complement", 3, "1 L = 100 cL : cherche ce qui manque pour aller jusqu'à 100 cL.", () => {
    const d = un(DLOTS);
    const p = perso(d.m);
    const N = un([1, 1, 2]);
    const x = tire(10, N * 100 - 5, 5);
    const r = N * 100 - x;
    const rec = un(["Sa bouteille", "Son pichet", "Sa carafe", "Son récipient"]);
    return {
      text: `${p.txt} veut ${fr(N)} L ${d.liq}. ${rec} en contient déjà ${fr(x)} cL. ${un(["Combien de centilitres doit-" + elle(p) + " encore ajouter ?", "Combien de cL manque-t-il ?"])}`,
      ...qcmV(r * 10, [(N * 1000 - x) * 10, x * 10, (N * 10 > x ? N * 10 - x : N * 100 + x) * 10], cL, 50),
      explanation: etapes(`D'abord la même unité : ${fr(N)} L = ${fr(N * 100)} cL.`, `${fr(N * 100)} − ${fr(x)} = ${fr(r)}.`, `Il manque ${fr(r)} cL.`),
      canvas: cartes([{ label: "Objectif", icon: d.pot[2], contenance: `${fr(N)} L` }, { label: "Déjà", icon: d.pot[2], contenance: `${fr(x)} cL` }], "Combien manque-t-il ?"),
    };
  }),

  ajouter(4),
  enlever(4),

  // ★4 — question 05 de la vidéo : 1 L 500 mL de jus en verres de 250 mL → 6 verres.
  tpl("contenance_defi", "g07_combien_deux_unites", 4, "Mets tout en millilitres (ou en centilitres), puis cherche combien de fois.", () => {
    const d = un(DLOTS);
    const p = perso(d.m);
    const paires: [number, number][] = [];
    for (const x of d.tailles.filter((y) => y >= 100 && y < 1000)) for (let k = 3; k <= 30; k++) if ((k * x) % 1000 !== 0 && k * x > 1000 && k * x <= 6000) paires.push([x, k]);
    const [t, n] = paires.length ? un(paires) : ([250, 6] as [number, number]);
    const T = n * t;
    const ecrT = T % 10 === 0 && Math.random() < 0.5 ? Lcl(T) : Lml(T);
    const tt = taille(t);
    const parL = Math.floor(T / 1000) * 1000;
    return {
      text: `${p.txt} ${d.verbe} ${ecrT} ${d.liq}. ${cap(elle(p))} ${un(["remplit des", "verse tout dans des", "répartit tout dans des"])} ${d.pot[1]} de ${tt}. Combien de ${d.pot[1]} ${peut(p)} remplir ?`,
      ...qcmN(n, [parL / t, Math.round(T / 100), n * 10, n + 1], d.pot[1]),
      explanation: etapes("D'abord la même unité : on met tout en millilitres (1 L = 1 000 mL, 1 cL = 10 mL).", `${ecrT} = ${mL(T)} ; ${fr(t)} × ${fr(n)} = ${fr(T)}.`, `${cap(elle(p))} remplit ${fr(n)} ${d.pot[1]}.`),
      canvas: cartes([{ label: "Tout", icon: d.pot[2], contenance: ecrT }, { label: cap(d.pot[0]), icon: d.pot[2], contenance: tt }], `Combien de ${d.pot[1]} ?`),
    };
  }),

  // ★4 — le défi de la vidéo : 3 L de miel et 10 pots de 25 cL, assez de pots ?
  tpl("contenance_defi", "g08_assez_de_pots", 4, "Mets tout en centilitres : la quantité à verser, puis ce que contiennent tous les pots.", () => {
    const d = un(DLOTS);
    const p = perso(d.m);
    const t = un(d.tailles.filter((x) => x % 10 === 0 && x < 1000));
    const a = entre(1, t <= 100 ? 1 : 5);
    const need = a * 1000;
    const exact = need / t;
    const k = Math.random() < 0.2 ? exact : Math.max(2, exact + un([-3, -2, -1, 1, 2, 3]));
    const cap2 = k * t;
    const diff = Math.abs(need - cap2);
    const manque = (x: number) => `non : il manque ${cL(x)}`;
    const reste = (x: number) => `oui : il reste de la place pour ${cL(x)}`;
    const juste = "oui : c'est tout juste assez";
    const bonne = cap2 < need ? manque(diff) : cap2 > need ? reste(diff) : juste;
    const faux = cap2 === need ? [manque(t), reste(t), manque(need / 10)] : [cap2 < need ? reste(diff) : manque(diff), juste, cap2 < need ? manque(diff + t) : reste(diff + t)];
    return {
      text: `${p.txt} ${d.verbe} ${fr(a)} L ${d.liq}. ${cap(elle(p))} a ${fr(k)} ${d.pot[1]} de ${cL(t)}. ${un([`${at(p).replace(/^a/, "A")} assez de ${d.pot[1]} pour ${d.tout} ?`, `${peut(p).replace(/^p/, "P")} tout verser dans ses ${d.pot[1]} ?`])}`,
      ...qcm(bonne, faux),
      explanation: etapes("On met tout en centilitres, puis on compare.", `${fr(a)} L = ${fr(a * 100)} cL ; ${fr(k)} ${d.pot[1]} de ${cL(t)} : ${fr(t / 10)} × ${fr(k)} = ${fr(cap2 / 10)} cL.`, cap2 === need ? "C'est tout juste assez." : cap2 < need ? `${fr(cap2 / 10)} cL < ${fr(a * 100)} cL : il manque ${cL(diff)}.` : `${fr(cap2 / 10)} cL > ${fr(a * 100)} cL : il reste de la place pour ${cL(diff)}.`),
      canvas: cartes([{ label: "À verser", icon: d.pot[2], contenance: `${fr(a)} L` }, { label: `${fr(k)} ${d.pot[1]}`, icon: d.pot[2], contenance: `${cL(t)} chacun` }], "Assez de place ?"),
    };
  }),

  // ★4 — plusieurs versements : une carafe de 2 L, 3 verres de 25 cL, combien reste-t-il ?
  tpl("contenance_defi", "g09_plusieurs_versements", 4, "Calcule d'abord ce qu'on a versé en tout, puis enlève-le, dans la même unité.", () => {
    const d = un(DLOTS);
    const p = perso(d.m);
    const t = un(d.tailles.filter((x) => x % 10 === 0 && x < 1000));
    const N = Math.max(entre(1, 4), Math.ceil((3 * t) / 1000));
    const kmax = Math.floor((N * 1000) / t) - 1;
    const k = entre(2, Math.max(2, Math.min(kmax, 9)));
    const r = N * 1000 - k * t;
    const rec = un(["une grande bouteille", "un grand récipient", "sa réserve", "un bidon"]);
    return {
      text: `${p.txt} a ${fr(N)} L ${d.liq} dans ${rec}. ${cap(elle(p))} remplit ${fr(k)} ${d.pot[1]} de ${cL(t)}. ${un(["Combien de centilitres reste-t-il ?", "Quelle quantité reste-t-il, en cL ?"])}`,
      ...qcmV(r, [k * t, N * 1000 - t, N * 10000 - k * t], cL, 50),
      explanation: etapes(`D'abord la même unité : ${fr(N)} L = ${fr(N * 100)} cL. Puis on calcule ce qu'on a versé.`, `${fr(k)} × ${fr(t / 10)} = ${fr((k * t) / 10)} cL ; ${fr(N * 100)} − ${fr((k * t) / 10)} = ${fr(r / 10)}.`, `Il reste ${cL(r)}.`),
      canvas: cartes([{ label: "Au départ", icon: d.pot[2], contenance: `${fr(N)} L` }, { label: `${fr(k)} ${d.pot[1]}`, icon: d.pot[2], contenance: `${cL(t)} chacun` }], "Combien reste-t-il ?"),
    };
  }),

  // ★4 — une recette en trois unités : 1 L + 25 cL + 300 mL = ? mL (piège : 326 mL).
  tpl("contenance_defi", "g10_melange_trois_unites", 4, "Mets les trois quantités en millilitres, puis ajoute.", () => {
    const R = un([
      { m: ["pâtissière", "pâtissier"] as const, l: ["de lait", "de crème", "de sirop de vanille"], quoi: "de pâte à crêpes" },
      { m: ["vendeuse de jus", "vendeur de jus"] as const, l: ["de jus d'orange", "de jus d'ananas", "de sirop de grenadine"], quoi: "de cocktail de fruits" },
      { m: ["peintre", "peintre"] as const, l: ["de peinture blanche", "de peinture bleue", "de peinture jaune"], quoi: "de peinture" },
      { m: ["barista", "barista"] as const, l: ["de lait", "de chocolat fondu", "de crème"], quoi: "de chocolat chaud" },
      { m: ["laborantine", "laborantin"] as const, l: ["d'eau", "d'eau salée", "d'eau colorée"], quoi: "de mélange" },
      { m: ["cuisinière", "cuisinier"] as const, l: ["de bouillon", "de lait", "de crème"], quoi: "de soupe" },
      { m: ["serveuse", "serveur"] as const, l: ["d'eau pétillante", "de jus de citron", "de sirop de menthe"], quoi: "de boisson" },
    ]);
    const p = perso(R.m);
    const a = entre(1, 3);
    const b = tire(10, 90, 5);
    const c = tire(50, 900, 50);
    const tot = a * 1000 + b * 10 + c;
    return {
      text: `${p.txt} mélange ${fr(a)} L ${R.l[0]}, ${fr(b)} cL ${R.l[1]} et ${fr(c)} mL ${R.l[2]}. ${un([`Combien de millilitres ${R.quoi} obtient-${elle(p)} ?`, "Quelle quantité obtient-on en tout, en mL ?"])}`,
      ...qcmV(tot, [a + b + c, a * 1000 + b + c, a * 100 + b * 10 + c], mL, 100),
      explanation: etapes("On met tout dans la même unité, le millilitre : 1 L = 1 000 mL et 1 cL = 10 mL.", `${fr(a * 1000)} + ${fr(b * 10)} + ${fr(c)} = ${fr(tot)}.`, `On obtient ${mL(tot)}.`),
      canvas: cartes([{ label: cap(R.l[0].replace(/^de |^d'/, "")), icon: "🫗", contenance: `${fr(a)} L` }, { label: cap(R.l[1].replace(/^de |^d'/, "")), icon: "🫗", contenance: `${fr(b)} cL` }, { label: cap(R.l[2].replace(/^de |^d'/, "")), icon: "🫗", contenance: `${fr(c)} mL` }], "Combien de mL en tout ?"),
    };
  }),

  // ★4 — qui en a le plus : k bouteilles de t cL, ou N L ?
  tpl("contenance_defi", "g11_qui_en_a_le_plus", 4, "Calcule chaque quantité dans la même unité, puis compare.", () => {
    const d = un(DLOTS);
    const p1 = perso(d.m);
    let p2 = perso(d.m);
    for (let i = 0; i < 10 && p2.nom === p1.nom; i++) p2 = perso(d.m);
    const t = un(d.tailles.filter((x) => x % 10 === 0 && x < 1000));
    const k = entre(3, 9);
    const A = k * t;
    const egal = Math.random() < 0.2 && A % 1000 === 0;
    const N = egal ? A / 1000 : Math.max(1, Math.round(A / 1000) + un([-1, 1]));
    const B = N * 1000;
    const autant = "les deux en ont autant";
    const juste = A === B ? autant : A > B ? p1.nom : p2.nom;
    return {
      text: `${p1.nom} a ${fr(k)} ${d.pot[1]} de ${cL(t)} ${d.liq}. ${p2.nom} a ${fr(N)} L ${d.liq}. ${un(["Qui en a le plus ?", "Qui a la plus grande quantité ?"])}`,
      ...qcm(juste, [p1.nom, p2.nom, autant]),
      explanation: etapes("On calcule chaque quantité dans la même unité, le centilitre.", `${p1.nom} : ${fr(t / 10)} × ${fr(k)} = ${fr(A / 10)} cL. ${p2.nom} : ${fr(N)} L = ${fr(N * 100)} cL.`, A === B ? "Les deux en ont autant." : `${juste} en a le plus.`),
      canvas: cartes([{ label: p1.nom, icon: d.pot[2], contenance: `${fr(k)} × ${cL(t)}` }, { label: p2.nom, icon: d.pot[2], contenance: `${fr(N)} L` }], "Qui en a le plus ?"),
    };
  }),
];
