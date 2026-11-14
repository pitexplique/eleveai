// lib/tutor-v4/questionBank/cm1/maths/masse-outils.ts
//
// ⭐ 14/11/2026 — LES GABARITS DES MASSES DU CM1 (notion `masse`). Avant : 7 à
// 17 squelettes par micro, 9 à 18 répétitions sur 20. Les micros n'ont pas de
// vidéo : vocabulaire du cycle 3 (« masse », « peser », « balance », « plateau »,
// « masses marquées », « graduation », « gramme », « kilogramme », « tonne »,
// « convertir », « tableau de conversion »).
// Chaque gabarit tire une SITUATION (métiers, marché, cuisine, poste, zoo,
// sport…) × une TOURNURE × des nombres.
// ⛔ CM1 = zéro clavier : que des QCM. Leurres = vraies erreurs d'élève :
// « 1 kg = 100 g », comparer les NOMBRES sans convertir (1 500 g « plus lourd »
// que 2 kg), lire la graduation voisine ou se tromper de pas, oublier une masse
// marquée, additionner au lieu de soustraire, estimer un chat à 4 g.
// ⛔ Unité OBLIGATOIRE dans l'énoncé ET dans les choix. Jamais deux choix de
// même valeur (« 2 kg 500 g » et « 2 500 g » ne sont jamais proposés ensemble).
// Dessins : `masse` (balance, objets pesés, objet à estimer, conversion kg/g),
// `number_line` (la graduation de la balance, l'aiguille en « ? »),
// `tableau_donnees` (tableau de conversion kg hg dag g, tableau t → kg).

import type { CanvasFigure, DifficultyLevel, TutorBankItemV4, TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import type {
  MasseCanvasData,
  MasseCanvasObject,
  NumberLineCanvasData,
  TableauDonneesCanvasData,
} from "@/lib/tutor-v4/types_canvas";
import { cap, entre, etapes, fr, melange, qcm, un, type Qcm } from "./trous-outils";

type G = Omit<TutorGeneratedQuestionV4, "canvas"> & { canvas?: CanvasFigure };

const tpl = (microId: string, n: string, difficulty: DifficultyLevel, hint: string, generate: () => G): TutorBankItemV4 =>
  ({
    kind: "template",
    id: `cm1_${microId}_tpl_${n}`,
    niveau: "cm1",
    matiere: "maths",
    notionId: "masse",
    microId,
    difficulty,
    theme: "neutral",
    hint,
    tags: ["cm1", "masse", microId, "template", "canvas"],
    generate: () => {
      const q = generate();
      return { ...q, text: elision(q.text), explanation: q.explanation ? elision(q.explanation) : q.explanation };
    },
  }) as TutorBankItemV4;

/** « de Enzo » → « d'Enzo », « que Inès » → « qu'Inès » (prénoms tirés au hasard). */
const elision = (t: string) =>
  t
    .replace(/\b(de|que) (?=[AEIOUÉÈ][a-zàâéèêëîïôûü])/g, (_m, w: string) => (w === "de" ? "d'" : "qu'"))
    .replace(/\bque (?=(un|une|il|elle)\b)/g, "qu'");

/* ───────────────────────── Les écritures ───────────────────────── */

/** Un multiple de `m` entre min et max. */
const tire = (min: number, max: number, m = 1) => entre(Math.ceil(min / m), Math.floor(max / m)) * m;
function distincts(min: number, max: number, pas: number, n: number): number[] {
  const s = new Set<number>();
  for (let k = 0; s.size < n && k < 300; k++) s.add(tire(min, max, pas));
  return [...s];
}

const g = (x: number) => `${fr(x)} g`;
const kg = (x: number) => `${fr(x / 1000)} kg`;
/** « 2 kg 350 g », « 3 kg », « 750 g » (x en grammes). */
const kgg = (x: number) => {
  const k = Math.floor(x / 1000);
  const r = x % 1000;
  if (k && r) return `${fr(k)} kg ${r} g`;
  return k ? `${fr(k)} kg` : `${r} g`;
};
const tk = (x: number) => `${fr(x)} kg`;

const liste = (l: string[]) => (l.length < 2 ? l.join("") : `${l.slice(0, -1).join(", ")} et ${l[l.length - 1]}`);
const NB: Record<number, string> = { 2: "deux", 3: "trois", 4: "quatre", 5: "cinq", 6: "six" };

/** « du melon », « de la valise », « de l'ananas », « d'Anna », « des tomates ». */
function de(n: string): string {
  if (n.startsWith("le ")) return `du ${n.slice(3)}`;
  if (n.startsWith("les ")) return `des ${n.slice(4)}`;
  if (n.startsWith("des ")) return n;
  if (n.startsWith("l'")) return `de ${n}`;
  if (/^[aeiouyhâéèêîôAEIOUÉÈÎ]/.test(n)) return `d'${n}`;
  return `de ${n}`;
}

/** QCM de masses : leurres distincts en VALEUR, complétés par des voisins. */
function qcmV(juste: number, faux: number[], f: (v: number) => string, pas: number): Qcm {
  const vals: number[] = [];
  for (const v of melange([...faux])) if (v > 0 && v !== juste && !vals.includes(v)) vals.push(v);
  for (let k = 1; vals.length < 3 && k < 30; k++) {
    for (const v of [juste + k * pas, juste - k * pas]) if (v > 0 && !vals.includes(v) && vals.length < 3) vals.push(v);
  }
  return qcm(f(juste), vals.slice(0, 3).map(f));
}

/* ───────────────────────── Les personnes ───────────────────────── */

const NOMS_F = ["Nina", "Zoé", "Lou", "Inès", "Jade", "Maya", "Lina", "Emma", "Léa", "Sarah", "Chloé", "Aya", "Rose", "Alma"];
const NOMS_M = ["Téo", "Ravi", "Malo", "Sacha", "Amir", "Tom", "Yanis", "Noé", "Lucas", "Karim", "Hugo", "Enzo", "Bilal", "Jules"];
type Perso = { nom: string; il: "il" | "elle"; txt: string };
function perso(metier?: readonly [string, string]): Perso {
  const f = Math.random() < 0.5;
  const nom = un(f ? NOMS_F : NOMS_M);
  const m = metier ? (f ? metier[0] : metier[1]) : "";
  return { nom, il: f ? "elle" : "il", txt: m && Math.random() < 0.75 ? `${nom}, ${m},` : nom };
}

/* ───────────────────────── Les dessins ───────────────────────── */

type Carte = { label: string; icon: string; masse: string; grammes?: number };
const cartes = (l: Carte[], questionLabel?: string): MasseCanvasData => ({
  kind: "masse",
  variant: "objets",
  objets: l,
  ...(questionLabel ? { questionLabel } : {}),
  display: { showMasses: true, showLabels: true, showComparison: false },
});
const balance = (gauche: MasseCanvasObject, droite: MasseCanvasObject, questionLabel?: string): MasseCanvasData => ({
  kind: "masse",
  variant: "balance",
  gauche,
  droite,
  ...(questionLabel ? { questionLabel } : {}),
  display: { showMasses: true, showLabels: true, showComparison: true },
});
const estimation = (label: string, icon: string, questionLabel: string): MasseCanvasData => ({
  kind: "masse",
  variant: "estimation",
  objet: { label, icon },
  questionLabel,
  display: { showLabels: true },
});
/** ⚠️ La variante `conversion` imprime « 1 kg = 1000 g » : kg ↔ g SEULEMENT. */
const conversion = (from: string, questionLabel: string): MasseCanvasData => ({
  kind: "masse",
  variant: "conversion",
  from,
  to: "?",
  questionLabel,
});

/** Le tableau de conversion kg | hg | dag | g, rempli avec les chiffres de x grammes. */
function tableauKgG(x: number, cible: "kg" | "g", seulementKg = false): TableauDonneesCanvasData {
  const kgs = Math.floor(x / 1000);
  const cells = seulementKg
    ? [fr(kgs), "", "", ""]
    : [kgs ? fr(kgs) : "", x >= 100 ? String(Math.floor(x / 100) % 10) : "", x >= 10 ? String(Math.floor(x / 10) % 10) : "", String(x % 10)];
  return {
    kind: "tableau_donnees",
    title: "Tableau de conversion",
    headers: ["kg", "hg", "dag", "g"],
    rows: [{ values: cells }],
    highlight: { col: cible === "kg" ? 0 : 3 },
    display: { compact: true },
  };
}
/** Un tableau de correspondance : 1 t → 1 000 kg ; 3 t → ? */
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
/** La graduation de la balance, l'aiguille marquée « ? ». */
function graduation(min: number, max: number, pas: number, ecrit: number, v: number): NumberLineCanvasData {
  const ecrites: number[] = [];
  for (let x = min; x <= max; x += ecrit) ecrites.push(x);
  return {
    kind: "number_line",
    size: { width: 360, height: 100 },
    min,
    max,
    step: ecrit,
    minorStep: pas,
    valeursEcrites: ecrites,
    points: [{ value: v, label: "?", color: "#dc2626" }],
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
  /** Bornes en grammes, pas en grammes ; `kg` : les masses s'écrivent en kg à ★1. */
  min: number;
  max: number;
  pas: number;
  kg?: boolean;
};
const col = (n: string, c: string, i: string): O => [`${n} ${c}`, cap(`${n.replace(/^(le|la|l') ?/, "")} ${c}`), i];

const LOTS: Lot[] = [
  { m: ["primeuse", "primeur"], intro: (p, nb) => `Au marché, ${p.txt} pèse ${nb} fruits et légumes`, obj: [["le melon", "Melon", "🍈"], ["l'ananas", "Ananas", "🍍"], ["le chou", "Chou", "🥬"], ["le potiron", "Potiron", "🎃"]], min: 400, max: 2400, pas: 50 },
  { m: ["factrice", "facteur"], intro: (p, nb) => `À la poste, ${p.txt} pèse ${nb} colis`, obj: [col("le colis", "bleu", "📦"), col("le colis", "rouge", "📦"), col("le colis", "vert", "📦"), col("le colis", "jaune", "📦")], min: 300, max: 3000, pas: 50 },
  { m: ["boulangère", "boulanger"], intro: (p, nb) => `${p.txt} pèse ${nb} pains`, obj: [["la baguette", "Baguette", "🥖"], ["le pain de campagne", "Pain de campagne", "🍞"], ["la brioche", "Brioche", "🥐"], ["la couronne", "Couronne", "🥯"]], min: 200, max: 1200, pas: 25 },
  { m: ["vétérinaire", "vétérinaire"], intro: (p, nb) => `${p.txt} pèse ${nb} chiots de la même portée`, obj: [["Rex", "Rex", "🐶"], ["Pirate", "Pirate", "🐶"], ["Lola", "Lola", "🐶"], ["Filou", "Filou", "🐶"]], min: 600, max: 2600, pas: 50 },
  { m: ["agente d'escale", "agent d'escale"], intro: (p, nb) => `À l'aéroport, ${p.txt} pèse ${nb} valises`, obj: [col("la valise", "rouge", "🧳"), col("la valise", "bleue", "🧳"), col("la valise", "verte", "🧳"), col("la valise", "noire", "🧳")], min: 8000, max: 25000, pas: 1000, kg: true },
  { m: ["coach sportive", "coach sportif"], intro: (p, nb) => `À la salle de sport, ${p.txt} range ${nb} haltères`, obj: [col("l'haltère", "rouge", "🏋️"), col("l'haltère", "bleu", "🏋️"), col("l'haltère", "noir", "🏋️"), col("l'haltère", "gris", "🏋️")], min: 1000, max: 15000, pas: 1000, kg: true },
  { m: ["fromagère", "fromager"], intro: (p, nb) => `${p.txt} pèse ${nb} fromages`, obj: [["le camembert", "Camembert", "🧀"], ["le morceau de comté", "Comté", "🧀"], ["la tomme", "Tomme", "🧀"], ["le brie", "Brie", "🧀"]], min: 200, max: 1500, pas: 25 },
  { intro: (_p, nb) => `Dans la classe, on pèse ${nb} cartables`, obj: [["le cartable de Lou", "Lou", "🎒"], ["le cartable de Malo", "Malo", "🎒"], ["le cartable d'Inès", "Inès", "🎒"], ["le cartable de Tom", "Tom", "🎒"]], min: 1500, max: 6500, pas: 100 },
  { m: ["jardinière", "jardinier"], intro: (p, nb) => `${p.txt} a acheté ${nb} sacs de terreau`, obj: [col("le sac", "vert", "🪴"), col("le sac", "marron", "🪴"), col("le sac", "jaune", "🪴"), col("le sac", "orange", "🪴")], min: 5000, max: 40000, pas: 1000, kg: true },
  { m: ["pâtissière", "pâtissier"], intro: (p, nb) => `${p.txt} pèse ${nb} gâteaux`, obj: [["le fraisier", "Fraisier", "🍰"], ["le gâteau au chocolat", "Gâteau au chocolat", "🎂"], ["la tarte aux pommes", "Tarte aux pommes", "🥧"], ["le cake", "Cake", "🍰"]], min: 400, max: 2200, pas: 50 },
  { m: ["pêcheuse", "pêcheur"], intro: (p, nb) => `Au retour du bateau, ${p.txt} pèse ${nb} poissons`, obj: [["la dorade", "Dorade", "🐟"], ["le maquereau", "Maquereau", "🐟"], ["le bar", "Bar", "🐠"], ["le merlu", "Merlu", "🐟"]], min: 300, max: 2600, pas: 50 },
  { m: ["épicière", "épicier"], intro: (p, nb) => `${p.txt} range ${nb} paquets`, obj: [["le paquet de riz", "Riz", "🍚"], ["le paquet de farine", "Farine", "🌾"], ["le paquet de sucre", "Sucre", "🍬"], ["le paquet de pâtes", "Pâtes", "🍝"]], min: 250, max: 2000, pas: 50 },
  { m: ["déménageuse", "déménageur"], intro: (p, nb) => `${p.txt} porte ${nb} cartons`, obj: [col("le carton", "A", "📦"), col("le carton", "B", "📦"), col("le carton", "C", "📦"), col("le carton", "D", "📦")], min: 5000, max: 30000, pas: 1000, kg: true },
  { m: ["maraîchère", "maraîcher"], intro: (p, nb) => `${p.txt} pèse ${nb} cagettes`, obj: [["la cagette de tomates", "Tomates", "🍅"], ["la cagette de carottes", "Carottes", "🥕"], ["la cagette de poivrons", "Poivrons", "🫑"], ["la cagette de courgettes", "Courgettes", "🥒"]], min: 3000, max: 12000, pas: 1000, kg: true },
  { m: ["bibliothécaire", "bibliothécaire"], intro: (p, nb) => `${p.txt} pèse ${nb} piles de livres`, obj: [col("la pile", "rouge", "📚"), col("la pile", "bleue", "📚"), col("la pile", "verte", "📚"), col("la pile", "jaune", "📚")], min: 500, max: 4000, pas: 100 },
  { m: ["sage-femme", "sage-femme"], intro: (p, nb) => `À la maternité, ${p.txt} pèse ${nb} bébés nés le même jour`, obj: [["Léo", "Léo", "👶"], ["Anna", "Anna", "👶"], ["Noah", "Noah", "👶"], ["Elsa", "Elsa", "👶"]], min: 2500, max: 4200, pas: 10 },
  { m: ["cuisinière", "cuisinier"], intro: (p, nb) => `À la cantine, ${p.txt} reçoit ${nb} sacs de pommes de terre`, obj: [col("le sac", "A", "🥔"), col("le sac", "B", "🥔"), col("le sac", "C", "🥔"), col("le sac", "D", "🥔")], min: 2000, max: 12000, pas: 1000, kg: true },
  { m: ["soigneuse", "soigneur"], intro: (p, nb) => `Au zoo, ${p.txt} pèse ${nb} jeunes tortues`, obj: [["Caramel", "Caramel", "🐢"], ["Pistache", "Pistache", "🐢"], ["Galette", "Galette", "🐢"], ["Biscotte", "Biscotte", "🐢"]], min: 200, max: 1500, pas: 10 },
];
/** Les lots où l'on peut mêler kilogrammes et grammes. */
const LOTS_KG = LOTS.filter((l) => l.max >= 2400);

const ecr1 = (lot: Lot, x: number) => (lot.kg ? kg(x) : g(x));
const premier = (o: O, x: string) => `${o[0]} pèse ${x}`;

/* ───────────────────────── MASSE_COMPARER ───────────────────────── */

const Q_LOURD = ["Quelle masse est la plus grande ?", "Choisis la masse la plus lourde.", "Quelle est la masse du plus lourd ?"];
const Q_LEGER = ["Quelle masse est la plus petite ?", "Choisis la masse la plus légère.", "Quelle est la masse du plus léger ?"];
const Q_SIGNE = ["Quelle écriture est juste ?", "Quel signe faut-il écrire entre les deux masses ?", "Choisis la bonne comparaison.", "Quelle comparaison est vraie ?"];

export const masseComparerGabarits: TutorBankItemV4[] = [
  // ★1 — 3 ou 4 masses dans la MÊME unité : la plus lourde ou la plus légère.
  tpl("masse_comparer", "g01_le_plus_meme_unite", 1, "Les masses sont dans la même unité : compare les nombres.", () => {
    const lot = un(LOTS);
    const p = perso(lot.m);
    const n = un([3, 3, 4]);
    const objs = melange([...lot.obj]).slice(0, n);
    const vals = distincts(lot.min, lot.max, lot.pas, n);
    const lourd = Math.random() < 0.6;
    const cible = lourd ? Math.max(...vals) : Math.min(...vals);
    const e = (x: number) => ecr1(lot, x);
    const phr = liste(objs.map((o, i) => (i === 0 ? premier(o, e(vals[i])) : `${o[0]} ${e(vals[i])}`)));
    return {
      text: `${cap(lot.intro(p, NB[n]))} : ${phr}. ${un(lourd ? Q_LOURD : Q_LEGER)}`,
      ...qcm(e(cible), vals.filter((v) => v !== cible).map(e)),
      explanation: etapes(
        "Les masses sont écrites dans la même unité : on compare directement les nombres.",
        `On range : ${[...vals].sort((a, b) => a - b).map(e).join(" < ")}.`,
        `La masse la plus ${lourd ? "lourde" : "légère"} est ${e(cible)}.`,
      ),
      canvas: cartes(objs.map((o, i) => ({ label: o[1], icon: o[2], masse: e(vals[i]) })), lourd ? "Lequel est le plus lourd ?" : "Lequel est le plus léger ?"),
    };
  }),

  // ★1 — deux masses dans la même unité : choisir le bon signe (pièges 850 / 805 / 580).
  tpl("masse_comparer", "g02_signe_meme_unite", 1, "Même unité : compare les nombres chiffre par chiffre.", () => {
    const lot = un(LOTS);
    const p = perso(lot.m);
    const [o1, o2] = melange([...lot.obj]);
    let [a, b] = distincts(lot.min, lot.max, lot.pas, 2);
    // Une fois sur trois, deux masses aux mêmes chiffres (850 g et 805 g) ou voisines.
    if (Math.random() < 0.35) b = a + un([-1, 1]) * lot.pas;
    if (b <= 0 || b === a) b = a + lot.pas;
    const e = (x: number) => ecr1(lot, x);
    const juste = a > b ? `${e(a)} > ${e(b)}` : `${e(a)} < ${e(b)}`;
    return {
      text: `${cap(lot.intro(p, "deux"))} : ${premier(o1, e(a))} et ${o2[0]} ${e(b)}. ${un(Q_SIGNE)}`,
      ...qcm(juste, [`${e(a)} > ${e(b)}`, `${e(a)} < ${e(b)}`, `${e(a)} = ${e(b)}`]),
      explanation: etapes(
        "Les deux masses ont la même unité : on compare les nombres.",
        `${fr(Math.max(a, b) / (lot.kg ? 1000 : 1))} est plus grand que ${fr(Math.min(a, b) / (lot.kg ? 1000 : 1))}.`,
        `On écrit ${juste}.`,
      ),
      canvas: cartes([{ label: o1[1], icon: o1[2], masse: e(a) }, { label: o2[1], icon: o2[2], masse: e(b) }], "Compare les deux masses."),
    };
  }),

  // ★2 — un objet en kg, l'autre en g : lequel est le plus lourd ? (piège : 1 500 > 2)
  tpl("masse_comparer", "g03_kg_ou_g_lequel", 2, "Écris les deux masses en grammes : 1 kg = 1 000 g.", () => {
    const lot = un(LOTS_KG);
    const p = perso(lot.m);
    const [o1, o2] = melange([...lot.obj]);
    const A = tire(Math.max(lot.min, 1000), lot.max, 1000);
    const egal = Math.random() < 0.2;
    let B = egal ? A : A + un([-1, 1]) * tire(100, 900, 100);
    if (B <= 0) B = A + 300;
    const lourd = Math.random() < 0.6;
    const cA = `${o1[0]} (${kg(A)})`;
    const cB = `${o2[0]} (${g(B)})`;
    const meme = "ils ont la même masse";
    const juste = A === B ? meme : (A > B) === lourd ? cA : cB;
    const lequel = o1[0].startsWith("la ") && o2[0].startsWith("la ") ? "Laquelle" : "Lequel";
    const q = lourd
      ? un([`${lequel} est le plus lourd ?`, `${lequel} pèse le plus ?`, `${lequel} fait le plus pencher la balance ?`])
      : un([`${lequel} est le plus léger ?`, `${lequel} pèse le moins ?`]);
    return {
      text: `${cap(lot.intro(p, "deux"))} : ${premier(o1, kg(A))} et ${o2[0]} ${g(B)}. ${q}`,
      ...qcm(juste, [cA, cB, meme]),
      explanation: etapes(
        "Pour comparer, on écrit les deux masses dans la même unité. Attention : 1 kg = 1 000 g, pas 100 g.",
        `${kg(A)} = ${g(A)}. On compare ${g(A)} et ${g(B)}.`,
        A === B ? "Les deux masses sont égales." : `La réponse est : ${juste}.`,
      ),
      canvas: cartes([{ label: o1[1], icon: o1[2], masse: kg(A) }, { label: o2[1], icon: o2[2], masse: g(B) }], "Mets les deux masses en grammes."),
    };
  }),

  // ★2 — signe entre une masse en kg et une masse en g (égalité possible).
  tpl("masse_comparer", "g04_signe_kg_g", 2, "Convertis d'abord les kilogrammes en grammes.", () => {
    const k = entre(1, 9);
    const A = k * 1000;
    const egal = Math.random() < 0.25;
    const B = egal ? A : A + un([-1, 1]) * un([100, 200, 300, 500, 700, 900, 50]);
    const avant = Math.random() < 0.5;
    const x = avant ? kg(A) : g(B);
    const y = avant ? g(B) : kg(A);
    const vx = avant ? A : B;
    const vy = avant ? B : A;
    const juste = vx === vy ? `${x} = ${y}` : vx > vy ? `${x} > ${y}` : `${x} < ${y}`;
    const p = perso();
    const intro = un([
      `${p.nom} compare ${x} et ${y}.`,
      `Sur son cahier, ${p.nom} doit comparer ${x} et ${y}.`,
      `Compare ces deux masses : ${x} et ${y}.`,
      `Au marché, deux sacs pèsent ${x} et ${y}.`,
    ]);
    return {
      text: `${intro} ${un(Q_SIGNE)}`,
      ...qcm(juste, [`${x} > ${y}`, `${x} < ${y}`, `${x} = ${y}`]),
      explanation: etapes(
        "On ne compare pas 3 et 2 800 : on écrit d'abord les deux masses dans la même unité.",
        `${kg(A)} = ${g(A)}. On compare ${g(vx)} et ${g(vy)}.`,
        `On écrit ${juste}.`,
      ),
      canvas: conversion(kg(A), "Combien de grammes ?"),
    };
  }),

  // ★2 — 3 masses mêlées (kg et g) : la plus légère ou la plus lourde.
  tpl("masse_comparer", "g05_le_plus_kg_g", 2, "Écris toutes les masses en grammes avant de comparer.", () => {
    const lot = un(LOTS_KG);
    const p = perso(lot.m);
    const objs = melange([...lot.obj]).slice(0, 3);
    const lo = Math.max(lot.min, 1000);
    const k = tire(lo, lot.max, 1000);
    let autres = distincts(lo, lot.max, 100, 4).filter((v) => v !== k && v % 1000 !== 0).slice(0, 2);
    if (autres.length < 2) autres = [k + 300, k - 200 > 0 ? k - 200 : k + 700];
    const vals = melange([k, ...autres]);
    const e = (x: number) => (x % 1000 === 0 ? kg(x) : g(x));
    const lourd = Math.random() < 0.5;
    const cible = lourd ? Math.max(...vals) : Math.min(...vals);
    const phr = liste(objs.map((o, i) => (i === 0 ? premier(o, e(vals[i])) : `${o[0]} ${e(vals[i])}`)));
    return {
      text: `${cap(lot.intro(p, "trois"))} : ${phr}. ${un(lourd ? Q_LOURD : Q_LEGER)}`,
      ...qcm(e(cible), vals.filter((v) => v !== cible).map(e)),
      explanation: etapes(
        "Les unités sont différentes : on écrit tout en grammes (1 kg = 1 000 g).",
        `${vals.map((v) => (v % 1000 === 0 ? `${kg(v)} = ${g(v)}` : g(v))).join(" ; ")}.`,
        `La masse la plus ${lourd ? "lourde" : "légère"} est ${e(cible)}.`,
      ),
      canvas: cartes(objs.map((o, i) => ({ label: o[1], icon: o[2], masse: e(vals[i]) })), lourd ? "Lequel est le plus lourd ?" : "Lequel est le plus léger ?"),
    };
  }),

  // ★3 — ranger 3 masses écrites de trois façons (kg, kg et g, g).
  tpl("masse_comparer", "g06_ranger", 3, "Écris les trois masses en grammes, puis range-les.", () => {
    const lot = un(LOTS_KG);
    const p = perso(lot.m);
    const objs = melange([...lot.obj]).slice(0, 3);
    const lo = Math.max(lot.min, 1000);
    const v1 = tire(lo, lot.max, 1000);
    const pasFin = lot.pas >= 100 ? 100 : 50;
    const reste = distincts(lo, lot.max, pasFin, 8).filter((v) => v % 1000 !== 0 && v !== v1);
    const v2 = reste[0] ?? v1 + 400;
    const v3 = reste[1] ?? v1 + 700;
    const fmt = new Map<number, string>([[v1, kg(v1)], [v2, g(v2)], [v3, kgg(v3)]]);
    const vals = melange([v1, v2, v3]);
    const e = (x: number) => fmt.get(x) ?? g(x);
    const croissant = Math.random() < 0.6;
    const sep = croissant ? " < " : " > ";
    const tri = [...vals].sort((a, b) => (croissant ? a - b : b - a));
    const brut = (x: number) => Number(e(x).split(" kg")[0].replace(/\s|g/g, "").replace(",", "."));
    const triBrut = [...vals].sort((a, b) => (croissant ? brut(a) - brut(b) : brut(b) - brut(a)));
    const chaine = (l: number[]) => l.map(e).join(sep);
    const juste = chaine(tri);
    const faux = [chaine(triBrut), chaine([...tri].reverse()), chaine([tri[1], tri[0], tri[2]]), chaine([tri[0], tri[2], tri[1]])];
    const phr = liste(objs.map((o, i) => (i === 0 ? premier(o, e(vals[i])) : `${o[0]} ${e(vals[i])}`)));
    return {
      text: `${cap(lot.intro(p, "trois"))} : ${phr}. ${croissant ? un(["Range ces masses de la plus légère à la plus lourde.", "Quel rangement, du plus léger au plus lourd, est juste ?"]) : un(["Range ces masses de la plus lourde à la plus légère.", "Quel rangement, du plus lourd au plus léger, est juste ?"])}`,
      ...qcm(juste, faux),
      explanation: etapes(
        "On ne range pas les nombres tels qu'ils sont écrits : on met d'abord les trois masses en grammes.",
        `${e(v1)} = ${g(v1)} ; ${e(v3)} = ${g(v3)} ; ${g(v2)}.`,
        `Le rangement juste est ${juste}.`,
      ),
      canvas: cartes(objs.map((o, i) => ({ label: o[1], icon: o[2], masse: e(vals[i]) })), "Range les masses."),
    };
  }),

  // ★3 — la balance penche : quelle masse est POSSIBLE ?
  tpl("masse_comparer", "g07_balance_penche", 3, "Le plateau qui descend porte la masse la plus lourde.", () => {
    const lot = un(LOTS_KG);
    const p = perso(lot.m);
    const o = un(lot.obj);
    const M = tire(Math.max(lot.min, 1000), Math.min(lot.max, 9000), 1000);
    const d = un([50, 100, 200, 300, 500]);
    const plusLourd = Math.random() < 0.6;
    const juste = plusLourd ? M + d : M - d;
    const faux = plusLourd ? [M - d, M, M - un([100, 200, 400]) - d] : [M + d, M, M + un([100, 200, 400]) + d];
    const situation = plusLourd
      ? un([`La balance penche du côté ${de(o[0])}.`, `Le plateau ${de(o[0])} descend.`, `C'est le plateau ${de(o[0])} qui est le plus bas.`])
      : un([`La balance penche du côté des masses marquées.`, `Le plateau ${de(o[0])} monte.`, `C'est le plateau ${de(o[0])} qui est le plus haut.`]);
    return {
      text: `${p.txt} pose ${o[0]} sur un plateau de la balance et ${kg(M)} de masses marquées sur l'autre. ${situation} ${un([`Quelle peut être la masse ${de(o[0])} ?`, `Quelle masse est possible pour ${o[0]} ?`, `Laquelle de ces masses peut être celle ${de(o[0])} ?`])}`,
      ...qcmV(juste, faux, g, 100),
      explanation: etapes(
        `${kg(M)} = ${g(M)}. ${plusLourd ? "Le plateau qui descend est le plus lourd" : "Le plateau qui monte est le plus léger"} : il faut une masse ${plusLourd ? "plus grande" : "plus petite"} que ${g(M)}. Avec ${g(M)} pile, la balance serait équilibrée.`,
        `${g(juste)} ${plusLourd ? ">" : "<"} ${g(M)}.`,
        `La masse possible est ${g(juste)}.`,
      ),
      canvas: balance({ label: o[1], icon: o[2], masse: "?", grammes: juste }, { label: "Masses marquées", icon: "⚖️", masse: kg(M), grammes: M }),
    };
  }),

  // ★3 — masses en « kg et g » et en « g » : la plus lourde (piège 2 kg 45 g / 2 450 g).
  tpl("masse_comparer", "g08_kg_et_g", 3, "Écris chaque masse en grammes : 2 kg 45 g = 2 045 g.", () => {
    const lot = un(LOTS_KG);
    const p = perso(lot.m);
    const objs = melange([...lot.obj]);
    const k = entre(1, Math.max(1, Math.min(9, Math.floor(lot.max / 1000) - 1)));
    const h1 = tire(10, 95, 5);
    const pool = [k * 1000 + h1, k * 1000 + h1 * 10, k * 1000 + tire(100, 950, 50), (k + 1) * 1000 - tire(20, 300, 10)];
    const vals = [...new Set([...pool, k * 1000 + tire(100, 950, 50), k * 1000 + tire(100, 950, 50), (k + 1) * 1000 - tire(20, 300, 10)])].slice(0, 4);
    const fmt = new Map<number, string>([[vals[0], kgg(vals[0])], [vals[1], g(vals[1])], [vals[2], kgg(vals[2])], [vals[3], g(vals[3])]]);
    const e = (x: number) => fmt.get(x) ?? g(x);
    const ordre = melange([...vals]);
    const lourd = Math.random() < 0.5;
    const cible = lourd ? Math.max(...vals) : Math.min(...vals);
    const phr = liste(ordre.map((v, i) => (i === 0 ? premier(objs[i], e(v)) : `${objs[i][0]} ${e(v)}`)));
    return {
      text: `${cap(lot.intro(p, NB[ordre.length]))} : ${phr}. ${un(lourd ? Q_LOURD : Q_LEGER)}`,
      ...qcm(e(cible), ordre.filter((v) => v !== cible).map(e)),
      explanation: etapes(
        "On écrit tout en grammes. Attention au zéro : 2 kg 45 g = 2 045 g, ce n'est pas 2 450 g.",
        ordre.map((v) => `${e(v)} = ${g(v)}`).join(" ; ") + ".",
        `La masse la plus ${lourd ? "lourde" : "légère"} est ${e(cible)}.`,
      ),
      canvas: cartes(ordre.map((v, i) => ({ label: objs[i][1], icon: objs[i][2], masse: e(v) })), lourd ? "Lequel est le plus lourd ?" : "Lequel est le plus léger ?"),
    };
  }),
];

/* ───────────────────────── MASSE_ESTIMER ───────────────────────── */

type U = "g" | "kg" | "t";
/** nom, étiquette, icône, masse habituelle, unité, pluriel. */
type Ob = readonly [string, string, string, number, U, string];
const OBJETS: Ob[] = [
  ["une fraise", "Fraise", "🍓", 20, "g", "fraises"],
  ["un œuf", "Œuf", "🥚", 60, "g", "œufs"],
  ["une pomme", "Pomme", "🍎", 150, "g", "pommes"],
  ["une banane", "Banane", "🍌", 120, "g", "bananes"],
  ["une tablette de chocolat", "Chocolat", "🍫", 100, "g", "tablettes de chocolat"],
  ["un téléphone portable", "Téléphone", "📱", 200, "g", "téléphones portables"],
  ["une feuille de papier", "Feuille", "📄", 5, "g", "feuilles de papier"],
  ["un crayon", "Crayon", "✏️", 5, "g", "crayons"],
  ["une souris", "Souris", "🐭", 20, "g", "souris"],
  ["un ballon de football", "Ballon", "⚽", 400, "g", "ballons de football"],
  ["une baguette de pain", "Baguette", "🥖", 250, "g", "baguettes"],
  ["une carotte", "Carotte", "🥕", 100, "g", "carottes"],
  ["une cuillère", "Cuillère", "🥄", 30, "g", "cuillères"],
  ["un hamster", "Hamster", "🐹", 100, "g", "hamsters"],
  ["une lettre dans son enveloppe", "Lettre", "✉️", 20, "g", "lettres"],
  ["un chat", "Chat", "🐱", 4, "kg", "chats"],
  ["un chien de taille moyenne", "Chien", "🐕", 15, "kg", "chiens"],
  ["un enfant de CM1", "Enfant", "🧒", 30, "kg", "enfants"],
  ["un vélo", "Vélo", "🚲", 12, "kg", "vélos"],
  ["une pastèque", "Pastèque", "🍉", 5, "kg", "pastèques"],
  ["un cartable rempli", "Cartable", "🎒", 4, "kg", "cartables"],
  ["une valise pleine", "Valise", "🧳", 18, "kg", "valises"],
  ["un sac de pommes de terre", "Pommes de terre", "🥔", 5, "kg", "sacs de pommes de terre"],
  ["un adulte", "Adulte", "🧑", 70, "kg", "adultes"],
  ["une chaise", "Chaise", "🪑", 5, "kg", "chaises"],
  ["une dinde", "Dinde", "🦃", 6, "kg", "dindes"],
  ["un bébé qui vient de naître", "Bébé", "👶", 3, "kg", "bébés"],
  ["un mouton", "Mouton", "🐑", 60, "kg", "moutons"],
  ["un éléphant", "Éléphant", "🐘", 5, "t", "éléphants"],
  ["un camion chargé", "Camion", "🚚", 20, "t", "camions"],
  ["un bus", "Bus", "🚌", 12, "t", "bus"],
  ["un tracteur", "Tracteur", "🚜", 4, "t", "tracteurs"],
  ["un avion de ligne", "Avion", "✈️", 50, "t", "avions"],
];
const UNITES: Record<U, string> = { g: "le gramme (g)", kg: "le kilogramme (kg)", t: "la tonne (t)" };
const AUTRES_GRANDEURS = ["le litre (L)", "le mètre (m)", "le centimètre (cm)", "le kilomètre (km)"];
const autresU = (u: U) => (["g", "kg", "t"] as U[]).filter((x) => x !== u);
const QUI_ESTIME: readonly [string, string][] = [
  ["vétérinaire", "vétérinaire"], ["professeure", "professeur"], ["cuisinière", "cuisinier"], ["vendeuse", "vendeur"],
  ["factrice", "facteur"], ["journaliste", "journaliste"], ["scientifique", "scientifique"], ["infirmière", "infirmier"],
];

export const masseEstimerGabarits: TutorBankItemV4[] = [
  // ★1 — l'unité adaptée (g, kg ou t), piège : une unité de longueur ou de contenance.
  tpl("masse_estimer", "g01_unite", 1, "Petit et léger : le gramme ; un enfant, un sac : le kilogramme ; un camion : la tonne.", () => {
    const o = un(OBJETS);
    const p = perso(un(QUI_ESTIME));
    const q = un([
      `Quelle unité choisir pour donner la masse ${de(o[0])} ?`,
      `${p.txt} veut peser ${o[0]}. Quelle unité est la mieux adaptée ?`,
      `Dans quelle unité exprime-t-on le plus souvent la masse ${de(o[0])} ?`,
      `Pour écrire la masse ${de(o[0])}, quelle unité est la plus pratique ?`,
    ]);
    return {
      text: q,
      ...qcm(UNITES[o[4]], [...autresU(o[4]).map((u) => UNITES[u]), un(AUTRES_GRANDEURS)]),
      explanation: etapes(
        "Le gramme pour les objets légers, le kilogramme pour les objets qu'on porte, la tonne pour les très lourds. Le litre et le mètre ne mesurent pas des masses.",
        `${cap(o[0])} pèse environ ${fr(o[3])} ${o[4]}.`,
        `L'unité adaptée est ${UNITES[o[4]]}.`,
      ),
      canvas: estimation(o[1], o[2], "Quelle unité pour sa masse ?"),
    };
  }),

  // ★1 — la masse raisonnable (piège : le bon nombre avec la mauvaise unité).
  tpl("masse_estimer", "g02_masse_raisonnable", 1, "Compare avec un objet que tu connais : 1 kg, c'est un paquet de sucre.", () => {
    const o = un(OBJETS);
    const p = perso(un(QUI_ESTIME));
    const juste = `${fr(o[3])} ${o[4]}`;
    const gros = `${fr(o[3] * (o[4] === "g" ? 100 : 10))} ${o[4]}`;
    const q = un([
      `Quelle est la masse la plus raisonnable pour ${o[0]} ?`,
      `Environ combien pèse ${o[0]} ?`,
      `${p.txt} doit noter la masse ${de(o[0])}. Quelle masse est la plus plausible ?`,
      `Quelle masse correspond le mieux à ${o[0]} ?`,
    ]);
    return {
      text: q,
      ...qcm(juste, [...autresU(o[4]).map((u) => `${fr(o[3])} ${u}`), gros]),
      explanation: etapes(
        "On pense à des objets connus : une pièce pèse quelques grammes, un paquet de sucre 1 kg, une voiture environ 1 t.",
        `${cap(o[0])} pèse environ ${juste}. ${autresU(o[4]).map((u) => `${fr(o[3])} ${u}`).join(" ou ")}, c'est impossible.`,
        `La masse raisonnable est ${juste}.`,
      ),
      canvas: estimation(o[1], o[2], "Quelle masse est raisonnable ?"),
    };
  }),

  // ★2 — lequel de ces objets pèse environ … ?
  tpl("masse_estimer", "g03_quel_objet", 2, "Imagine chaque objet dans ta main, ou sur une balance.", () => {
    const o = un(OBJETS);
    const memeU = OBJETS.filter((x) => x[4] === o[4] && (x[3] >= o[3] * 8 || x[3] * 8 <= o[3]));
    const autres = autresU(o[4]).map((u) => un(OBJETS.filter((x) => x[4] === u)));
    const faux = [...autres, ...(memeU.length ? [un(memeU)] : [])].map((x) => x[0]);
    const p = perso(un(QUI_ESTIME));
    const m = `${fr(o[3])} ${o[4]}`;
    return {
      text: un([
        `Lequel de ces objets pèse environ ${m} ?`,
        `${p.txt} a pesé un objet : environ ${m}. Quel objet a-t-${p.il} pu peser ?`,
        `Quel objet a une masse proche de ${m} ?`,
      ]),
      ...qcm(o[0], faux),
      explanation: etapes(
        `On cherche un objet de l'ordre de ${m}.`,
        `${cap(o[0])} pèse environ ${m} ; les autres sont bien plus légers ou bien plus lourds.`,
        `La réponse est ${o[0]}.`,
      ),
      canvas: estimation("?", "⚖️", `Un objet d'environ ${m}`),
    };
  }),

  // ★2 — corriger une unité impossible (« mon chat pèse 4 g »).
  tpl("masse_estimer", "g04_unite_fausse", 2, "Imagine l'objet : la masse écrite est-elle possible ?", () => {
    const o = un(OBJETS);
    const [faux1, faux2] = melange(autresU(o[4]));
    const p = perso();
    const ecrit = `${fr(o[3])} ${faux1}`;
    return {
      text: un([
        `${p.nom} a écrit : « ${cap(o[0])} pèse ${ecrit}. » C'est impossible ! Quelle masse voulait-${p.il} sûrement écrire ?`,
        `Dans son exposé, ${p.nom} a noté que ${o[0]} pèse ${ecrit}. L'unité est fausse. Quelle est la bonne masse ?`,
        `« ${cap(o[0])} : ${ecrit} ». Cette étiquette se trompe d'unité. Que faut-il écrire ?`,
      ]),
      ...qcm(`${fr(o[3])} ${o[4]}`, [`${fr(o[3])} ${faux2}`, `${fr(o[3] * 10)} ${faux1}`, `${fr(o[3] * (o[4] === "g" ? 100 : 10))} ${o[4]}`]),
      explanation: etapes(
        `${ecrit}, c'est beaucoup trop ${(["g", "kg", "t"] as U[]).indexOf(faux1) < (["g", "kg", "t"] as U[]).indexOf(o[4]) ? "léger" : "lourd"} pour ${o[0]}.`,
        `${cap(o[0])} pèse environ ${fr(o[3])} ${o[4]}.`,
        `Il fallait écrire ${fr(o[3])} ${o[4]}.`,
      ),
      canvas: estimation(o[1], o[2], `${ecrit} : est-ce possible ?`),
    };
  }),

  // ★2 — estimer la masse de plusieurs objets identiques.
  tpl("masse_estimer", "g05_plusieurs", 2, "Plusieurs objets identiques : multiplie la masse d'un objet.", () => {
    const o = un(OBJETS.filter((x) => (x[4] === "g" && x[3] >= 20) || (x[4] === "kg" && x[3] <= 20)));
    const n = entre(2, o[4] === "g" ? 10 : 5);
    const p = perso(un(QUI_ESTIME));
    const tot = n * o[3];
    const ecr = (v: number) => `${fr(v)} ${o[4]}`;
    const seul = o[0].startsWith("une ") ? "Une seule" : "Un seul";
    return {
      text: un([
        `${cap(o[0])} pèse environ ${ecr(o[3])}. Environ combien pèsent ${n} ${o[5]} ?`,
        `${p.txt} met ${n} ${o[5]} sur la balance. ${seul} pèse environ ${ecr(o[3])}. Quelle masse la balance va-t-elle indiquer, à peu près ?`,
        `Environ combien pèsent ${n} ${o[5]}, si ${seul.toLowerCase()} pèse environ ${ecr(o[3])} ?`,
        `${p.txt} doit transporter ${n} ${o[5]}. Chacun${o[0].startsWith("une ") ? "e" : ""} pèse environ ${ecr(o[3])}. Quelle masse va-t-${p.il} porter, à peu près ?`,
      ]),
      ...qcmV(tot, [n + o[3], tot * 10, o[3]], ecr, o[3]),
      explanation: etapes(
        "Les objets sont identiques : on multiplie la masse d'un objet par le nombre d'objets.",
        `${n} × ${ecr(o[3])} = ${ecr(tot)}.`,
        `Cela fait environ ${ecr(tot)}.`,
      ),
      canvas: cartes([{ label: "Un seul", icon: o[2], masse: `≈ ${ecr(o[3])}` }, { label: `${n} en tout`, icon: o[2], masse: "?" }]),
    };
  }),
];

/* ───────────────────────── MASSE_CONVERTIR ───────────────────────── */

/** Ce qu'on pèse en kg : le métier qui va avec, puis la phrase. */
type Situ = readonly [readonly [string, string] | undefined, (p: Perso, m: string) => string];
const EN_KG: readonly Situ[] = [
  [undefined, (p, m) => `Le sac de pommes de terre de ${p.nom} pèse ${m}.`],
  [["boulangère", "boulanger"], (p, m) => `${p.txt} achète ${m} de farine pour la boulangerie.`],
  [undefined, (p, m) => `La valise de ${p.nom} pèse ${m}.`],
  [["déménageuse", "déménageur"], (p, m) => `${p.txt} porte un carton de ${m}.`],
  [["primeuse", "primeur"], (p, m) => `Au marché, ${p.txt} vend une pastèque de ${m}.`],
  [undefined, (p, m) => `Chez la vétérinaire, le chien de ${p.nom} pèse ${m}.`],
  [["coach sportive", "coach sportif"], (p, m) => `${p.txt} soulève un haltère de ${m}.`],
  [["cuisinière", "cuisinier"], (p, m) => `Pour la cantine, ${p.txt} reçoit ${m} de carottes.`],
  [["livreuse", "livreur"], (p, m) => `Le colis que ${p.txt} doit livrer pèse ${m}.`],
  [["maraîchère", "maraîcher"], (p, m) => `${p.txt} remplit une cagette de ${m} de tomates.`],
  [["jardinière", "jardinier"], (p, m) => `Le sac de terreau de ${p.txt} pèse ${m}.`],
  [["boulangère", "boulanger"], (p, m) => `${p.txt} prépare ${m} de pâte à pain.`],
  [undefined, (p, m) => `Le cartable de ${p.nom} pèse ${m}.`],
  [["maçonne", "maçon"], (p, m) => `${p.txt} met ${m} de sable dans la brouette.`],
  [["confiturière", "confiturier"], (p, m) => `Pour ses confitures, ${p.txt} achète ${m} de fraises.`],
  [undefined, (p, m) => `Le panier de linge de ${p.nom} pèse ${m}.`],
  [["épicière", "épicier"], (p, m) => `${p.txt} range un sac de riz de ${m}.`],
  [["vétérinaire", "vétérinaire"], (p, m) => `${p.txt} pèse un agneau : ${m}.`],
];
const QG = ["Combien de grammes cela fait-il ?", "Quelle est cette masse en grammes ?", "Écris cette masse en grammes.", "Convertis cette masse en grammes."];
const QK = ["Combien de kilogrammes cela fait-il ?", "Quelle est cette masse en kilogrammes ?", "Écris cette masse en kilogrammes.", "Convertis cette masse en kilogrammes."];
const situ = (l: readonly Situ[], m: string) => {
  const [metier, f] = un(l);
  return f(perso(metier), m);
};
const situKg = (m: string) => situ(EN_KG, m);

/** Ce qu'on pèse en tonnes. */
const EN_T: readonly Situ[] = [
  [["camionneuse", "camionneur"], (p, m) => `Le camion de ${p.txt} transporte ${m} de sable.`],
  [["soigneuse", "soigneur"], (p, m) => `Au zoo, ${p.txt} fait peser l'éléphante Rosa : ${m}.`],
  [["grutière", "grutier"], (p, m) => `La grue de ${p.txt} soulève une poutre de ${m}.`],
  [["arboricultrice", "arboriculteur"], (p, m) => `${p.txt} a récolté ${m} de pommes cette année.`],
  [["pêcheuse", "pêcheur"], (p, m) => `Le bateau de ${p.txt} rapporte ${m} de poissons.`],
  [["éboueuse", "éboueur"], (p, m) => `La benne de ${p.txt} contient ${m} de déchets.`],
  [["agricultrice", "agriculteur"], (p, m) => `Le tracteur de ${p.txt} tire une remorque de ${m} de blé.`],
  [["cheminote", "cheminot"], (p, m) => `Un wagon que surveille ${p.txt} contient ${m} de charbon.`],
  [["conductrice de bus", "conducteur de bus"], (p, m) => `Le bus de ${p.txt} pèse ${m}.`],
  [["camionneuse", "camionneur"], (p, m) => `${p.txt} a livré ${m} de gravier sur le chantier.`],
  [["mécanicienne", "mécanicien"], (p, m) => `Dans le garage de ${virg(p)} un camion pèse ${m}.`],
  [["capitaine", "capitaine"], (p, m) => `Le bateau de ${p.txt} charge ${m} de conteneurs.`],
];
const METIERS_T: readonly [string, string][] = [["camionneuse", "camionneur"], ["livreuse", "livreur"], ["conductrice", "conducteur"]];
const situT = (m: string) => situ(EN_T, m);

export const masseConvertirGabarits: TutorBankItemV4[] = [
  // ★2 — kg → g (piège : 1 kg = 100 g).
  tpl("masse_convertir", "g01_kg_vers_g", 2, "1 kg = 1 000 g : on ajoute trois zéros.", () => {
    const k = un([entre(2, 9), entre(2, 9), entre(10, 25)]);
    const m = `${k} kg`;
    const tab = Math.random() < 0.5;
    return {
      text: `${situKg(m)} ${un(QG)}`,
      ...qcmV(k * 1000, [k * 100, k * 10, k * 10000], g, 1000),
      explanation: etapes(
        "1 kg = 1 000 g (et pas 100 g). Dans le tableau, on écrit le chiffre des kg puis des zéros jusqu'à la colonne des g.",
        `${k} × 1 000 = ${fr(k * 1000)}.`,
        `${m} = ${g(k * 1000)}.`,
      ),
      canvas: tab ? tableauKgG(k * 1000, "g", true) : conversion(m, "Combien de grammes ?"),
    };
  }),

  // ★2 — g → kg (nombres ronds).
  tpl("masse_convertir", "g02_g_vers_kg", 2, "1 000 g = 1 kg : on enlève trois zéros.", () => {
    const k = un([entre(2, 9), entre(2, 9), entre(10, 20)]);
    const m = g(k * 1000);
    const tab = Math.random() < 0.6;
    return {
      text: `${situKg(m)} ${un(QK)}`,
      ...qcmV(k, [k * 10, k * 100, k * 1000], (v) => `${fr(v)} kg`, 1),
      explanation: etapes(
        "1 000 g = 1 kg : on cherche combien de fois 1 000 g il y a.",
        `${fr(k * 1000)} ÷ 1 000 = ${k}.`,
        `${m} = ${k} kg.`,
      ),
      canvas: tab ? tableauKgG(k * 1000, "kg") : conversion(m, "Combien de kilogrammes ?"),
    };
  }),

  // ★2 — quelle égalité est juste ?
  tpl("masse_convertir", "g03_egalite_juste", 2, "Retiens : 1 kg = 1 000 g et 1 t = 1 000 kg.", () => {
    const k = entre(2, 9);
    const tonnes = Math.random() < 0.3;
    const [u1, u2] = tonnes ? ["t", "kg"] : ["kg", "g"];
    const juste = `${k} ${u1} = ${fr(k * 1000)} ${u2}`;
    const p = perso();
    return {
      text: un([
        "Quelle égalité est juste ?",
        `${p.nom} a écrit quatre égalités. Laquelle est juste ?`,
        "Une seule de ces conversions est vraie. Laquelle ?",
        "Choisis la conversion exacte.",
      ]),
      ...qcm(juste, [`${k} ${u1} = ${fr(k * 100)} ${u2}`, `${k} ${u1} = ${fr(k * 10)} ${u2}`, `${fr(k * 1000)} ${u1} = ${k} ${u2}`]),
      explanation: etapes(
        `1 ${u1} = 1 000 ${u2}.`,
        `${k} × 1 000 = ${fr(k * 1000)}.`,
        `L'égalité juste est ${juste}.`,
      ),
      canvas: tonnes ? tableauCorresp("tonnes (t)", "kilogrammes (kg)", "1", "1 000", String(k), "?") : tableauCorresp("kilogrammes (kg)", "grammes (g)", "1", "1 000", String(k), "?"),
    };
  }),

  // ★2 — « 2 kg 500 g » → g (centaines rondes).
  tpl("masse_convertir", "g04_kg_et_g_ronds", 2, "Convertis les kg en g, puis ajoute les g.", () => {
    const k = entre(1, 9);
    const h = tire(100, 900, 100);
    const m = `${k} kg ${h} g`;
    const tot = k * 1000 + h;
    return {
      text: `${situKg(m)} ${un(QG)}`,
      ...qcmV(tot, [k * 100 + h, k + h, k * 1000], g, 100),
      explanation: etapes(
        "On convertit les kilogrammes en grammes (1 kg = 1 000 g), puis on ajoute les grammes.",
        `${k} kg = ${g(k * 1000)} ; ${fr(k * 1000)} + ${h} = ${fr(tot)}.`,
        `${m} = ${g(tot)}.`,
      ),
      canvas: tableauKgG(tot, "g"),
    };
  }),

  // ★3 — t ↔ kg.
  tpl("masse_convertir", "g05_tonnes", 3, "1 t = 1 000 kg.", () => {
    const t = un([entre(2, 9), entre(2, 9), entre(10, 30)]);
    const versKg = Math.random() < 0.6;
    if (versKg) {
      const m = `${t} t`;
      return {
        text: `${situT(m)} ${un(QK)}`,
        ...qcmV(t * 1000, [t * 100, t * 10, t * 10000], tk, 1000),
        explanation: etapes("1 t = 1 000 kg (et pas 100 kg).", `${t} × 1 000 = ${fr(t * 1000)}.`, `${m} = ${tk(t * 1000)}.`),
        canvas: tableauCorresp("tonnes (t)", "kilogrammes (kg)", "1", "1 000", String(t), "?"),
      };
    }
    const m = tk(t * 1000);
    return {
      text: `${situT(m)} ${un(["Combien de tonnes cela fait-il ?", "Quelle est cette masse en tonnes ?", "Écris cette masse en tonnes."])}`,
      ...qcmV(t, [t * 10, t * 100, t * 1000], (v) => `${fr(v)} t`, 1),
      explanation: etapes("1 000 kg = 1 t.", `${fr(t * 1000)} ÷ 1 000 = ${t}.`, `${m} = ${t} t.`),
      canvas: tableauCorresp("tonnes (t)", "kilogrammes (kg)", "1", "1 000", "?", fr(t * 1000)),
    };
  }),

  // ★3 — « 2 kg 45 g » → g (piège : 2 450 g, 245 g).
  tpl("masse_convertir", "g06_kg_et_g_vers_g", 3, "Écris 3 chiffres pour les grammes : 2 kg 45 g = 2 045 g.", () => {
    const k = entre(1, 9);
    const h = un([tire(5, 95, 5), tire(10, 95, 1), tire(105, 995, 5)]);
    const m = `${k} kg ${h} g`;
    const tot = k * 1000 + h;
    const colle = Number(`${k}${h}`);
    return {
      text: `${situKg(m)} ${un(QG)}`,
      ...qcmV(tot, [colle !== tot ? colle : k * 100 + h, h < 100 ? k * 1000 + h * 10 : k * 100 + h, k + h, k * 100 + h], g, 10),
      explanation: etapes(
        "1 kg = 1 000 g. Les grammes s'écrivent sur trois chiffres après les kilogrammes : on complète avec des zéros.",
        `${k} kg = ${g(k * 1000)} ; ${fr(k * 1000)} + ${h} = ${fr(tot)}.`,
        `${m} = ${g(tot)}.`,
      ),
      canvas: tableauKgG(tot, "g"),
    };
  }),

  // ★3 — g → « kg et g ».
  tpl("masse_convertir", "g07_g_vers_kg_et_g", 3, "Les trois derniers chiffres sont les grammes, le reste les kilogrammes.", () => {
    const k = entre(1, 9);
    const h = un([tire(105, 995, 5), tire(10, 95, 5)]);
    const tot = k * 1000 + h;
    const m = g(tot);
    // Leurres écrits en « kg et g » : 1 kg = 100 g, chiffres mal coupés.
    const juste = `${k} kg ${h} g`;
    const f1 = tot % 100 ? `${Math.floor(tot / 100)} kg ${tot % 100} g` : `${tot / 100} kg`;
    const f2 = h >= 100 ? `${k} kg ${Math.floor(h / 10)} g` : `${k} kg ${h * 10} g`;
    const f3 = `${h} kg ${k} g`;
    return {
      text: `${situKg(m)} ${un(["Écris cette masse en kilogrammes et grammes.", "Combien de kilogrammes et de grammes cela fait-il ?", "Quelle écriture en kg et g est juste ?"])}`,
      ...qcm(juste, [f1, f2, f3]),
      explanation: etapes(
        "1 000 g = 1 kg : les trois derniers chiffres donnent les grammes.",
        `${fr(tot)} g = ${fr(k * 1000)} g + ${h} g.`,
        `${m} = ${juste}.`,
      ),
      canvas: tableauKgG(tot, "kg"),
    };
  }),

  // ★3 — kg décimaux ↔ g (1,5 kg = 1 500 g).
  tpl("masse_convertir", "g08_kg_decimal", 3, "1,5 kg, c'est 1 kg et la moitié d'un kg : 1 500 g.", () => {
    const k = entre(1, 9);
    const d = un([5, 5, 2, 25, 75]);
    const tot = k * 1000 + (d < 10 ? d * 100 : d * 10);
    const dec = `${k},${d}`;
    const versG = Math.random() < 0.6;
    if (versG) {
      const m = `${dec} kg`;
      return {
        text: `${situKg(m)} ${un(QG)}`,
        ...qcmV(tot, [Math.round(Number(`${k}.${d}`) * 100), k * 1000 + d, k * 1000 + d * 10 === tot ? k * 1000 + d * 100 : k * 1000 + d * 10], g, 100),
        explanation: etapes("1 kg = 1 000 g : on multiplie par 1 000 (la virgule avance de trois rangs).", `${dec} × 1 000 = ${fr(tot)}.`, `${m} = ${g(tot)}.`),
        canvas: tableauKgG(tot, "g"),
      };
    }
    const m = g(tot);
    const fk = (v: number) => `${fr(v)} kg`;
    return {
      text: `${situKg(m)} ${un(["Écris cette masse en kilogrammes, avec une virgule.", "Quelle est cette masse en kilogrammes ?", "Combien de kilogrammes cela fait-il ?"])}`,
      ...qcmV(tot / 1000, [tot / 100, tot / 10, k + (d < 10 ? d : d) / 100], fk, 1),
      explanation: etapes("1 000 g = 1 kg : on divise par 1 000.", `${fr(tot)} ÷ 1 000 = ${fr(tot / 1000)}.`, `${m} = ${fk(tot / 1000)}.`),
      canvas: tableauKgG(tot, "kg"),
    };
  }),
];

/* ───────────────────────── MASSE_MESURER ───────────────────────── */

/** Qui pèse quoi, sur quelle balance (objets avec article). */
type Pesee = { m?: readonly [string, string]; ou: string; obj: readonly string[] };
const PESEES: Pesee[] = [
  { m: ["cuisinière", "cuisinier"], ou: "la balance de la cuisine", obj: ["la farine", "le beurre", "le sucre", "le chocolat"] },
  { m: ["factrice", "facteur"], ou: "la balance de la poste", obj: ["une enveloppe épaisse", "un petit colis", "un paquet de cartes postales"] },
  { m: ["primeuse", "primeur"], ou: "la balance du marché", obj: ["des tomates", "des cerises", "des haricots verts", "des abricots"] },
  { m: ["pâtissière", "pâtissier"], ou: "sa balance", obj: ["la pâte à tarte", "les amandes", "le sucre glace"] },
  { m: ["fromagère", "fromager"], ou: "sa balance", obj: ["un morceau de comté", "une part de tomme", "un morceau de brie"] },
  { m: ["boulangère", "boulanger"], ou: "sa balance", obj: ["la pâte à pain", "la pâte à brioche", "les graines de sésame"] },
  { m: ["professeure", "professeur"], ou: "la balance de la classe", obj: ["une trousse", "un dictionnaire", "une boîte de craies"] },
  { m: ["fleuriste", "fleuriste"], ou: "sa balance", obj: ["un bouquet de roses", "un sac de terreau", "des bulbes de tulipes"] },
  { m: ["épicière", "épicier"], ou: "la balance du magasin", obj: ["des lentilles", "du riz", "des noix"] },
  { m: ["bouchère", "boucher"], ou: "sa balance", obj: ["un rôti", "de la viande hachée", "des saucisses"] },
  { m: ["chocolatière", "chocolatier"], ou: "sa balance", obj: ["des bonbons", "des truffes", "une plaque de chocolat"] },
  { m: ["pharmacienne", "pharmacien"], ou: "la balance de la pharmacie", obj: ["un sachet de tisane", "une boîte de pansements"] },
  { ou: "la balance de la cuisine", obj: ["les pommes de la recette", "la pâte à crêpes", "les champignons"] },
  { m: ["scientifique", "scientifique"], ou: "la balance du laboratoire", obj: ["un caillou", "un morceau de bois", "une poignée de sable"] },
];
const LIRE = ["Quelle masse indique la balance ?", "Quelle masse lit-on ?", "Combien indique l'aiguille ?", "Quelle est la masse lue sur la graduation ?"];
const intrPesee = () => {
  const s = un(PESEES);
  const p = perso(s.m);
  const o = un(s.obj);
  return { p, o, txt: `${p.txt} pose ${o} sur ${s.ou}.`, plateau: `${p.txt} pose ${o} sur le plateau de gauche d'une balance.` };
};
/** Le prénom suivi d'une virgule, une seule fois (« Emma, » ou « Emma, jardinière, »). */
const virg = (p: Perso) => (p.txt.endsWith(",") ? p.txt : `${p.txt},`);
const sansArticle = (o: string) => cap(o.replace(/^(le |la |l'|les |des |du |de la |un |une )/, ""));

/** Pèse-personne : qui se pèse, où. */
const PESE_PERSONNE: readonly ((p: Perso) => string)[] = [
  (p) => `À l'infirmerie du collège, ${p.nom} monte sur le pèse-personne.`,
  (p) => `Chez le médecin, ${p.nom} se pèse.`,
  (p) => `Avant le tournoi de judo, ${p.nom} se pèse.`,
  (p) => `Dans la salle de bains, ${p.nom} monte sur le pèse-personne.`,
  (p) => `À la pharmacie, ${p.nom} essaie le pèse-personne.`,
  (p) => `Avant la course de poneys, ${p.nom} se pèse.`,
  (p) => `Au club de gymnastique, ${p.nom} se pèse.`,
];

/** Les masses marquées qu'on pose sur l'autre plateau. */
const MARQUEES = [500, 200, 100, 50, 20, 10];

export const masseMesurerGabarits: TutorBankItemV4[] = [
  // ★1 — lire une graduation de 100 g en 100 g (pièges : graduation voisine, compter les traits).
  tpl("masse_mesurer", "g01_lire_100", 1, "Entre deux traits, il y a 100 g : compte les traits depuis 0.", () => {
    const { o, txt } = intrPesee();
    const max = un([1000, 1000, 2000]);
    const ecrit = max === 1000 ? 500 : 1000;
    let v = tire(200, max - 100, 100);
    if (v % ecrit === 0) v += 100;
    return {
      text: `${txt} La graduation est en grammes, de 100 g en 100 g. ${un(LIRE)}`,
      ...qcm(g(v), [g(v + 100), g(v - 100), g(v / 100), `${fr(v)} kg`]),
      explanation: etapes(
        `Chaque trait compte 100 g. On part du nombre écrit le plus proche et on compte les traits.`,
        `L'aiguille est sur le ${v / 100}e trait après 0 : ${v / 100} × 100 g = ${g(v)}.`,
        `La masse ${de(o)} est ${g(v)}.`,
      ),
      canvas: graduation(0, max, 100, ecrit, v),
    };
  }),

  // ★1 — balance équilibrée avec des masses marquées en g (piège : oublier une masse).
  tpl("masse_mesurer", "g02_marquees_g", 1, "Balance équilibrée : l'objet pèse autant que toutes les masses marquées.", () => {
    const { o, plateau } = intrPesee();
    const n = entre(2, 3);
    const grosse = un([500, 500, 200]);
    const ms = [grosse, ...melange(MARQUEES.filter((x) => x < grosse)).slice(0, n - 1)].sort((a, b) => b - a);
    const tot = ms.reduce((a, b) => a + b, 0);
    const posees = liste(ms.map(g));
    return {
      text: `${plateau} Sur l'autre plateau, ${un(["on pose", "il faut", "on met"])} ${posees} pour que la balance soit équilibrée. ${un([`Quelle est la masse ${de(o)} ?`, `Quelle masse faut-il noter pour ${o} ?`, `Quelle est donc la masse ${de(o)} ?`])}`,
      ...qcmV(tot, [tot - ms[ms.length - 1], ms[0], tot + 100, tot - ms[0]], g, 10),
      explanation: etapes(
        "La balance est équilibrée : les deux plateaux portent la même masse. On additionne toutes les masses marquées.",
        `${ms.map(String).join(" + ")} = ${fr(tot)}.`,
        `La masse ${de(o)} est ${g(tot)}.`,
      ),
      canvas: balance({ label: sansArticle(o), icon: "🧺", masse: "?", grammes: tot }, { label: "Masses marquées", icon: "⚖️", masse: ms.map(g).join(" + "), grammes: tot }),
    };
  }),

  // ★2 — lire une graduation dont le pas n'est pas 100 g (50 g, 20 g, 200 g, 25 g).
  tpl("masse_mesurer", "g03_lire_pas", 2, "Cherche d'abord combien vaut un petit trait.", () => {
    const { o, txt } = intrPesee();
    const [max, pas, ecrit] = un([[1000, 50, 500], [500, 50, 250], [200, 20, 100], [2000, 200, 1000], [400, 20, 200], [100, 10, 50]] as const);
    let v = tire(pas, max - pas, pas);
    if (v % ecrit === 0) v += pas;
    const traits = v / pas;
    const fauxPas = [100, 10, 50].filter((x) => x !== pas);
    return {
      text: `${txt} ${un(["La graduation est en grammes.", "Les nombres de la graduation sont des grammes.", "L'aiguille se déplace sur une graduation en grammes."])} ${un(LIRE)}`,
      ...qcmV(v, [traits * fauxPas[0], traits * fauxPas[1], v + pas, v - pas], g, pas),
      explanation: etapes(
        `Entre 0 et ${fr(ecrit)}, il y a ${ecrit / pas} intervalles : chaque trait compte ${fr(ecrit)} ÷ ${ecrit / pas} = ${pas} g.`,
        `L'aiguille est ${traits} traits après 0 : ${traits} × ${pas} = ${fr(v)}.`,
        `La masse ${de(o)} est ${g(v)}.`,
      ),
      canvas: graduation(0, max, pas, ecrit, v),
    };
  }),

  // ★2 — le pèse-personne, gradué de 1 kg en 1 kg (piège : pas de 2, unité g).
  tpl("masse_mesurer", "g04_pese_personne", 2, "Chaque petit trait vaut 1 kg : pars du nombre écrit juste avant.", () => {
    const p = perso();
    const min = un([20, 25, 30]);
    const max = min + 20;
    let v = entre(min + 1, max - 1);
    if (v % 5 === 0) v += 1;
    const avant = Math.floor(v / 5) * 5;
    return {
      text: `${un(PESE_PERSONNE)(p)} L'aiguille montre sa masse, en kilogrammes. ${un([`Combien pèse ${p.nom} ?`, `Quelle masse indique le pèse-personne ?`, `Quelle masse lit-on ?`])}`,
      ...qcm(`${v} kg`, [`${v + 1} kg`, `${v - 1} kg`, `${avant + 2 * (v - avant)} kg`, `${v} g`]),
      explanation: etapes(
        "Les nombres sont écrits de 5 kg en 5 kg, et il y a 5 intervalles entre deux nombres : chaque trait vaut 1 kg.",
        `L'aiguille est ${v - avant} trait${v - avant > 1 ? "s" : ""} après ${avant} : ${avant} + ${v - avant} = ${v}.`,
        `${p.nom} pèse ${v} kg.`,
      ),
      canvas: graduation(min, max, 1, 5, v),
    };
  }),

  // ★2 — masses marquées en kg et g (piège : 1 kg compté comme 1 g ou 100 g).
  tpl("masse_mesurer", "g05_marquees_kg_g", 2, "Convertis le kilogramme en grammes avant d'additionner.", () => {
    const { o, plateau } = intrPesee();
    const k = un([1, 1, 2]);
    const gs = melange([500, 200, 100, 50, 20]).slice(0, entre(1, 2)).sort((a, b) => b - a);
    const sg = gs.reduce((a, b) => a + b, 0);
    const tot = k * 1000 + sg;
    const posees = liste([`${k} kg`, ...gs.map(g)]);
    return {
      text: `${plateau} Pour l'équilibrer, ${un(["on met", "on pose", "il faut"])} ${posees} sur le plateau de droite. ${un([`Quelle est la masse ${de(o)}, en grammes ?`, "Quelle masse, en grammes, est sur le plateau de gauche ?", `Combien de grammes faut-il noter pour ${o} ?`])}`,
      ...qcmV(tot, [k + sg, k * 100 + sg, k * 1000 + sg - gs[gs.length - 1]], g, 50),
      explanation: etapes(
        "Balance équilibrée : même masse des deux côtés. On écrit tout en grammes : 1 kg = 1 000 g.",
        `${fr(k * 1000)} + ${gs.map(String).join(" + ")} = ${fr(tot)}.`,
        `La masse ${de(o)} est ${g(tot)}.`,
      ),
      canvas: balance({ label: sansArticle(o), icon: "🧺", masse: "?", grammes: tot }, { label: "Masses marquées", icon: "⚖️", masse: [`${k} kg`, ...gs.map(g)].join(" + "), grammes: tot }),
    };
  }),

  // ★3 — la tare : peser avec le récipient, puis enlever le récipient.
  tpl("masse_mesurer", "g06_tare", 3, "Enlève la masse du récipient vide.", () => {
    const cas = un([
      { m: ["pâtissière", "pâtissier"] as const, rec: "le saladier", cont: "la pâte" },
      { m: ["cuisinière", "cuisinier"] as const, rec: "la casserole", cont: "la soupe" },
      { m: ["primeuse", "primeur"] as const, rec: "le panier", cont: "les pommes" },
      { m: ["maraîchère", "maraîcher"] as const, rec: "la cagette", cont: "les tomates" },
      { m: ["jardinière", "jardinier"] as const, rec: "le seau", cont: "les fraises" },
      { m: ["boulangère", "boulanger"] as const, rec: "le bol", cont: "la farine" },
      { m: ["confiturière", "confiturier"] as const, rec: "la bassine", cont: "les abricots" },
      { m: ["poissonnière", "poissonnier"] as const, rec: "le bac", cont: "les crevettes" },
      { m: ["fleuriste", "fleuriste"] as const, rec: "le pot", cont: "la terre" },
      { m: ["éleveuse", "éleveur"] as const, rec: "la caisse", cont: "les œufs" },
    ]);
    const p = perso(cas.m);
    const c = tire(150, 900, 50);
    const x = tire(300, 2500, 50);
    const T = c + x;
    const pluriel = cas.cont.startsWith("les ");
    const pese = pluriel ? "pèsent" : "pèse";
    return {
      text: un([
        `${p.txt} pèse ${cas.cont} dans ${cas.rec} : la balance indique ${g(T)}. ${cap(cas.rec)} vide pèse ${g(c)}. Combien ${pese} ${cas.cont} ?`,
        `${cap(cas.rec)} vide pèse ${g(c)}. ${p.txt} y met ${cas.cont}, et la balance indique ${g(T)}. Quelle est la masse ${de(cas.cont)} ?`,
        `Sur la balance de ${virg(p)} ${cas.rec} et ${cas.cont} pèsent ensemble ${g(T)}. ${cap(cas.rec)} seul${cas.rec.startsWith("la ") ? "e" : ""} pèse ${g(c)}. Combien ${pese} ${cas.cont} ?`,
      ]),
      ...qcmV(x, [T + c, T, c], g, 50),
      explanation: etapes(
        "La balance pèse le récipient ET son contenu. On enlève la masse du récipient vide : c'est une soustraction.",
        `${fr(T)} − ${fr(c)} = ${fr(x)}.`,
        `${cap(cas.cont)} ${pluriel ? "pèsent" : "pèse"} ${g(x)}.`,
      ),
      canvas: cartes([{ label: `${cap(cas.rec.replace(/^(le |la |l')/, ""))} plein`, icon: "⚖️", masse: g(T) }, { label: `${cap(cas.rec.replace(/^(le |la |l')/, ""))} vide`, icon: "🥣", masse: g(c) }], "Que pèse le contenu ?"),
    };
  }),

  // ★3 — une masse marquée sur chaque plateau : objet + m = M.
  tpl("masse_mesurer", "g07_balance_deux_cotes", 3, "Enlève la masse marquée qui est avec l'objet.", () => {
    const lot = un(LOTS.filter((l) => !l.kg));
    const o = un(lot.obj);
    const p = perso(lot.m);
    const m = un([100, 200, 250, 300, 500]);
    const possibles = [1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500].filter((v) => v - m >= lot.min && v - m <= lot.max);
    const M = possibles.length ? un(possibles) : lot.max + m;
    const x = M - m;
    const eM = M % 1000 === 0 ? kg(M) : g(M);
    return {
      text: `${un([
        `${p.txt} pose ${o[0]} et une masse de ${g(m)} sur le plateau de gauche, et ${eM} sur le plateau de droite.`,
        `Sur un plateau de la balance, ${p.txt} met ${o[0]} avec une masse marquée de ${g(m)}. Sur l'autre plateau, ${p.il} met ${eM}.`,
        `${p.txt} pèse ${o[0]} : d'un côté ${o[0]} et ${g(m)}, de l'autre ${eM}.`,
      ])} ${un(["La balance est équilibrée.", "Les deux plateaux sont à la même hauteur."])} ${un([`Combien pèse ${o[0]} ?`, `Quelle est la masse ${de(o[0])} ?`])}`,
      ...qcmV(x, [M + m, M, m], g, 50),
      explanation: etapes(
        `Les deux plateaux portent la même masse : ${o[0]} + ${g(m)} = ${eM}.`,
        `${eM} = ${g(M)} ; ${fr(M)} − ${m} = ${fr(x)}.`,
        `${cap(o[0])} pèse ${g(x)}.`,
      ),
      canvas: balance({ label: `${o[1]} + ${g(m)}`, icon: o[2], masse: "?", grammes: M }, { label: "Masses marquées", icon: "⚖️", masse: eM, grammes: M }),
    };
  }),

  // ★3 — graduation de 250 g en 250 g, nombres écrits tous les kilogrammes.
  tpl("masse_mesurer", "g08_lire_250", 3, "Combien d'intervalles entre 0 et 1 000 ? Divise 1 000 par ce nombre.", () => {
    const { o, txt } = intrPesee();
    const [pas, max] = un([[250, 3000], [250, 2000], [500, 5000], [200, 2000]] as const);
    let v = tire(pas, max - pas, pas);
    if (v % 1000 === 0) v += pas;
    const traits = v / pas;
    return {
      text: `${txt} ${un(["La graduation est en grammes ; les nombres sont écrits tous les 1 000 g.", "Les nombres écrits sont des grammes, de 1 000 en 1 000."])} ${un(LIRE)}`,
      ...qcmV(v, [traits * 100, traits * (pas === 250 ? 200 : 250), v + pas, v - pas], g, pas),
      explanation: etapes(
        `Entre 0 et 1 000, il y a ${1000 / pas} intervalles : chaque trait vaut 1 000 ÷ ${1000 / pas} = ${pas} g.`,
        `L'aiguille est ${traits} traits après 0 : ${traits} × ${pas} = ${fr(v)}.`,
        `La masse ${de(o)} est ${g(v)}.`,
      ),
      canvas: graduation(0, max, pas, 1000, v),
    };
  }),
];

/* ───────────────────────── MASSE_DEFI ───────────────────────── */

/** Deux ingrédients : le premier en kg, le second en g. */
type Duo = { m: readonly [string, string]; dit: (p: Perso, a: string, b: string) => string; ia: string; ib: string; la: string; lb: string };
const DUOS: Duo[] = [
  { m: ["pâtissière", "pâtissier"], dit: (p, a, b) => `${p.txt} mélange ${a} de farine et ${b} de sucre.`, ia: "🌾", ib: "🍬", la: "Farine", lb: "Sucre" },
  { m: ["maraîchère", "maraîcher"], dit: (p, a, b) => `${p.txt} remplit une cagette avec ${a} de tomates et ${b} de poivrons.`, ia: "🍅", ib: "🫑", la: "Tomates", lb: "Poivrons" },
  { m: ["épicière", "épicier"], dit: (p, a, b) => `${p.txt} range ${a} de riz et ${b} de lentilles.`, ia: "🍚", ib: "🫘", la: "Riz", lb: "Lentilles" },
  { m: ["maçonne", "maçon"], dit: (p, a, b) => `${p.txt} verse ${a} de sable et ${b} de ciment dans la bétonnière.`, ia: "🏖️", ib: "🧱", la: "Sable", lb: "Ciment" },
  { m: ["jardinière", "jardinier"], dit: (p, a, b) => `${p.txt} achète ${a} de terreau et ${b} de graines.`, ia: "🪴", ib: "🌱", la: "Terreau", lb: "Graines" },
  { m: ["cuisinière", "cuisinier"], dit: (p, a, b) => `Pour la cantine, ${p.txt} épluche ${a} de pommes de terre et ${b} de carottes.`, ia: "🥔", ib: "🥕", la: "Pommes de terre", lb: "Carottes" },
  { m: ["vétérinaire", "vétérinaire"], dit: (p, a, b) => `${p.txt} commande ${a} de croquettes et ${b} de pâtée.`, ia: "🦴", ib: "🥫", la: "Croquettes", lb: "Pâtée" },
  { m: ["fromagère", "fromager"], dit: (p, a, b) => `${p.txt} vend ${a} de comté et ${b} de beurre.`, ia: "🧀", ib: "🧈", la: "Comté", lb: "Beurre" },
  { m: ["confiturière", "confiturier"], dit: (p, a, b) => `${p.txt} met ${a} de fruits et ${b} de sucre dans la bassine.`, ia: "🍑", ib: "🍬", la: "Fruits", lb: "Sucre" },
  { m: ["chocolatière", "chocolatier"], dit: (p, a, b) => `${p.txt} fait fondre ${a} de chocolat et ${b} de beurre.`, ia: "🍫", ib: "🧈", la: "Chocolat", lb: "Beurre" },
  { m: ["livreuse", "livreur"], dit: (p, a, b) => `${p.txt} livre un colis de ${a} et une enveloppe de ${b}.`, ia: "📦", ib: "✉️", la: "Colis", lb: "Enveloppe" },
  { m: ["randonneuse", "randonneur"], dit: (p, a, b) => `${p.txt} met dans son sac à dos ${a} d'eau et ${b} de pique-nique.`, ia: "💧", ib: "🥪", la: "Eau", lb: "Pique-nique" },
  { m: ["boulangère", "boulanger"], dit: (p, a, b) => `${p.txt} prépare ${a} de pâte à pain et ${b} de pâte à brioche.`, ia: "🍞", ib: "🥐", la: "Pâte à pain", lb: "Pâte à brioche" },
  { m: ["primeuse", "primeur"], dit: (p, a, b) => `${p.txt} pèse ${a} de pommes et ${b} de raisin pour une cliente.`, ia: "🍎", ib: "🍇", la: "Pommes", lb: "Raisin" },
];
/** Un stock en kg dont on retire des grammes. */
type Stock = readonly [readonly [string, string] | undefined, (p: Perso, a: string, b: string) => string];
const STOCKS: readonly Stock[] = [
  [["boulangère", "boulanger"], (p, a, b) => `${p.txt} a un sac de ${a} de farine. ${cap(p.il)} en utilise ${b} pour ses pains.`],
  [["cuisinière", "cuisinier"], (p, a, b) => `${p.txt} ouvre un sac de ${a} de riz et en cuit ${b}.`],
  [["vétérinaire", "vétérinaire"], (p, a, b) => `${p.txt} a ${a} de croquettes. ${cap(p.il)} en donne ${b} aux chiens.`],
  [["jardinière", "jardinier"], (p, a, b) => `${p.txt} a un sac de ${a} de terreau et en met ${b} dans une jardinière.`],
  [["épicière", "épicier"], (p, a, b) => `${p.txt} vend ${b} de lentilles, prises dans un sac de ${a}.`],
  [["pâtissière", "pâtissier"], (p, a, b) => `${p.txt} a ${a} de sucre et en verse ${b} dans la pâte.`],
  [["éleveuse", "éleveur"], (p, a, b) => `${p.txt} a ${a} de graines pour les poules. ${cap(p.il)} en distribue ${b}.`],
  [["confiseuse", "confiseur"], (p, a, b) => `${p.txt} prend ${b} de bonbons dans un bocal de ${a}.`],
  [["animatrice", "animateur"], (p, a, b) => `${p.txt} a ${a} de pâte à modeler et en donne ${b} à un groupe.`],
  [["potière", "potier"], (p, a, b) => `${p.txt} a un bloc de ${a} d'argile et en coupe ${b}.`],
  [["maçonne", "maçon"], (p, a, b) => `${p.txt} a un sac de ${a} de ciment et en utilise ${b} pour un petit mur.`],
  [undefined, (p, a, b) => `${p.txt} a acheté ${a} de pommes de terre et en épluche ${b} pour le dîner.`],
];
/** Des objets identiques à multiplier. */
type Lot2 = { m: readonly [string, string]; dit: (p: Perso, n: number, v: string) => string; icon: string; label: string; v: readonly number[] };
const LOTS_IDENTIQUES: Lot2[] = [
  { m: ["confiturière", "confiturier"], dit: (p, n, v) => `${p.txt} remplit ${n} pots de confiture de ${v} chacun.`, icon: "🍯", label: "Pot", v: [250, 350, 375, 450] },
  { m: ["épicière", "épicier"], dit: (p, n, v) => `${p.txt} range ${n} boîtes de conserve de ${v}.`, icon: "🥫", label: "Boîte", v: [400, 425, 800, 850] },
  { m: ["fromagère", "fromager"], dit: (p, n, v) => `${p.txt} vend ${n} plaquettes de beurre de ${v}.`, icon: "🧈", label: "Beurre", v: [125, 250] },
  { m: ["libraire", "libraire"], dit: (p, n, v) => `${p.txt} met dans un carton ${n} livres de ${v} chacun.`, icon: "📕", label: "Livre", v: [300, 350, 450, 600] },
  { m: ["professeure", "professeur"], dit: (p, n, v) => `${p.txt} porte ${n} cahiers de ${v} chacun.`, icon: "📒", label: "Cahier", v: [120, 150, 180, 240] },
  { m: ["entraîneuse", "entraîneur"], dit: (p, n, v) => `${p.txt} met ${n} ballons de ${v} dans un filet.`, icon: "⚽", label: "Ballon", v: [410, 420, 450] },
  { m: ["semencière", "semencier"], dit: (p, n, v) => `${p.txt} prépare ${n} sachets de graines de ${v}.`, icon: "🌱", label: "Sachet", v: [125, 150, 250] },
  { m: ["savonnière", "savonnier"], dit: (p, n, v) => `${p.txt} emballe ${n} savons de ${v} chacun.`, icon: "🧼", label: "Savon", v: [100, 125, 150] },
  { m: ["primeuse", "primeur"], dit: (p, n, v) => `${p.txt} prépare ${n} barquettes de fraises de ${v}.`, icon: "🍓", label: "Barquette", v: [250, 500] },
  { m: ["chocolatière", "chocolatier"], dit: (p, n, v) => `${p.txt} prépare ${n} ballotins de chocolats de ${v}.`, icon: "🍫", label: "Ballotin", v: [250, 375, 500] },
];

export const masseDefiGabarits: TutorBankItemV4[] = [
  // ★3 — total d'une masse en kg et d'une masse en g (piège : 2 + 750 = 752 g).
  tpl("masse_defi", "g01_total_kg_g", 3, "Convertis les kg en g avant d'additionner.", () => {
    const d = un(DUOS);
    const p = perso(d.m);
    const k = entre(1, 9);
    const b = tire(100, 950, 50);
    const tot = k * 1000 + b;
    return {
      text: `${d.dit(p, `${k} kg`, g(b))} ${un(["Quelle est la masse totale, en grammes ?", "Combien de grammes cela fait-il en tout ?", "Quelle masse cela fait-il en tout, en grammes ?"])}`,
      ...qcmV(tot, [k + b, k * 100 + b, k * 1000 - b], g, 100),
      explanation: etapes("On met tout en grammes (1 kg = 1 000 g), puis on additionne.", `${k} kg = ${g(k * 1000)} ; ${fr(k * 1000)} + ${b} = ${fr(tot)}.`, `La masse totale est ${g(tot)}.`),
      canvas: cartes([{ label: d.la, icon: d.ia, masse: `${k} kg` }, { label: d.lb, icon: d.ib, masse: g(b) }], "Masse totale ?"),
    };
  }),

  // ★3 — ce qui reste (piège : additionner, ou soustraire sans convertir).
  tpl("masse_defi", "g02_reste", 3, "Convertis, puis soustrais ce qu'on a enlevé.", () => {
    const [metier, phrase] = un(STOCKS);
    const p = perso(metier);
    const k = entre(2, 9);
    const b = tire(150, 950, 50);
    const r = k * 1000 - b;
    return {
      text: `${phrase(p, `${k} kg`, g(b))} ${un(["Combien en reste-t-il ?", "Quelle masse reste-t-il ?", "Combien de grammes reste-t-il ?"])}`,
      ...qcmV(r, [k * 1000 + b, b - k, k * 100 - b > 0 ? k * 100 - b : (k - 1) * 1000 - b], g, 100),
      explanation: etapes("On convertit en grammes, puis on enlève : c'est une soustraction.", `${k} kg = ${g(k * 1000)} ; ${fr(k * 1000)} − ${b} = ${fr(r)}.`, `Il reste ${g(r)}.`),
      canvas: cartes([{ label: "Au départ", icon: "📦", masse: `${k} kg` }, { label: "Enlevé", icon: "➖", masse: g(b) }], "Combien reste-t-il ?"),
    };
  }),

  // ★3 — plusieurs objets identiques (piège : additionner n et la masse).
  tpl("masse_defi", "g03_identiques", 3, "Des objets identiques : multiplie.", () => {
    const l = un(LOTS_IDENTIQUES);
    const p = perso(l.m);
    const n = entre(3, 8);
    const v = un(l.v);
    const tot = n * v;
    return {
      text: `${l.dit(p, n, g(v))} ${un(["Quelle est la masse totale ?", "Combien pèsent-ils en tout ?", "Quelle masse cela fait-il en tout ?"]).replace("pèsent-ils", ["Barquette", "Boîte", "Beurre"].includes(l.label) ? "pèsent-elles" : "pèsent-ils")}`,
      ...qcmV(tot, [n + v, (n - 1) * v, n * Math.floor(v / 100) * 100, n * v + 100], g, 50),
      explanation: etapes("Les objets ont tous la même masse : on multiplie.", `${n} × ${v} = ${fr(tot)}.`, `La masse totale est ${g(tot)}${tot >= 1000 ? `, soit ${kgg(tot)}` : ""}.`),
      canvas: cartes([{ label: `1 ${l.label.toLowerCase()}`, icon: l.icon, masse: g(v) }, { label: `${n} en tout`, icon: l.icon, masse: "?" }]),
    };
  }),

  // ★4 — masse maximale : combien peut-on encore ajouter ? (piège : 23 − 18 kg 500 g = 5 kg 500 g)
  tpl("masse_defi", "g04_limite", 4, "Écris tout en grammes avant de soustraire.", () => {
    const cas = un([
      { L: [20, 23], txt: (p: Perso, L: string, x: string) => `À l'aéroport, une valise ne doit pas dépasser ${L}. Celle de ${p.nom} pèse déjà ${x}.` },
      { m: ["randonneuse", "randonneur"] as const, L: [10, 12], txt: (p: Perso, L: string, x: string) => `Le sac à dos de ${p.txt} ne doit pas dépasser ${L} pour la randonnée. Il pèse déjà ${x}.` },
      { m: ["postière", "postier"] as const, L: [30, 30], txt: (p: Perso, L: string, x: string) => `Le colis que prépare ${p.txt} ne doit pas dépasser ${L}. Il pèse déjà ${x}.` },
      { m: ["blanchisseuse", "blanchisseur"] as const, L: [7, 8], txt: (p: Perso, L: string, x: string) => `Le lave-linge de ${p.txt} accepte ${L} de linge au plus. ${cap(p.il)} y a déjà mis ${x}.` },
      { m: ["jardinière", "jardinier"] as const, L: [15, 25], txt: (p: Perso, L: string, x: string) => `La brouette de ${p.txt} peut porter ${L} au plus. Elle contient déjà ${x} de terre.` },
      { L: [5, 6], txt: (p: Perso, L: string, x: string) => `Le panier du vélo de ${p.nom} supporte ${L} au plus. Il contient déjà ${x} de courses.` },
      { m: ["magasinière", "magasinier"] as const, L: [12, 18], txt: (p: Perso, L: string, x: string) => `Le chariot de ${p.txt} supporte ${L} au plus. Il porte déjà ${x} de cartons.` },
    ]);
    const p = perso("m" in cas ? cas.m : undefined);
    const L = entre(cas.L[0], cas.L[1]);
    const k = entre(Math.max(1, L - 6), L - 1);
    const h = tire(100, 900, 50);
    const x = k * 1000 + h;
    const r = L * 1000 - x;
    const piege = (L - k) * 1000 + h;
    return {
      text: `${cas.txt(p, `${L} kg`, kgg(x))} ${un(["Quelle masse peut-on encore ajouter, au plus ?", "Combien peut-on encore ajouter au maximum ?", "Quelle masse manque-t-il pour atteindre la limite ?"])}`,
      ...qcmV(r, [piege, (L + k) * 1000 + h, (L - k) * 1000], kgg, 100),
      explanation: etapes(
        "On écrit tout en grammes, puis on soustrait. Piège : on ne garde pas les grammes tels quels, il faut casser un kilogramme en 1 000 g.",
        `${L} kg = ${g(L * 1000)} ; ${kgg(x)} = ${g(x)} ; ${fr(L * 1000)} − ${fr(x)} = ${fr(r)}.`,
        `On peut encore ajouter ${kgg(r)}.`,
      ),
      canvas: cartes([{ label: "Limite", icon: "🚫", masse: `${L} kg` }, { label: "Déjà", icon: "🧳", masse: kgg(x) }], "Combien peut-on ajouter ?"),
    };
  }),

  // ★4 — des objets identiques équilibrent la balance : combien pèse un objet ?
  tpl("masse_defi", "g05_balance_identiques", 4, "Partage la masse en parts égales : c'est une division.", () => {
    const objs = un([
      ["pots de miel", "pot", "🍯", false], ["savons", "savon", "🧼", false], ["boîtes de thé", "boîte", "🍵", true], ["livres identiques", "livre", "📕", false],
      ["cubes de bois", "cube", "🧊", false], ["sachets de graines", "sachet", "🌱", false], ["briques de lait", "brique", "🥛", true], ["ballons", "ballon", "⚽", false],
      ["pommes de pin", "pomme de pin", "🌲", true], ["boîtes de crayons", "boîte", "✏️", true],
    ] as const);
    const [un1, seul] = objs[3] ? ["une", "une seule"] : ["un", "un seul"];
    const p = perso();
    const n = entre(2, 6);
    const v = tire(150, 600, 50);
    const M = n * v;
    const eM = kgg(M);
    const ent = (x: number) => Math.round(x / 10) * 10;
    return {
      text: `${p.txt} pose ${n} ${objs[0]} sur un plateau de la balance. Pour l'équilibrer, il faut ${eM} sur l'autre plateau. ${un([`Combien pèse ${seul} ${objs[1]} ?`, `Quelle est la masse d'${un1 === "un" ? "un" : "une"} ${objs[1]} ?`, `Combien pèse chaque ${objs[1]} ?`])}`,
      ...qcmV(v, [M * n, M - n, ent(M / (n + 1)), ent(M / (n - 1 || 2))], g, 50),
      explanation: etapes(
        `Les ${n} objets sont identiques et pèsent ensemble ${eM} = ${g(M)}. On partage en ${n} parts égales.`,
        `${fr(M)} ÷ ${n} = ${fr(v)}.`,
        `${cap(un1)} ${objs[1]} pèse ${g(v)}.`,
      ),
      canvas: balance({ label: `${n} ${objs[0]}`, icon: objs[2], masse: "?", grammes: M }, { label: "Masses marquées", icon: "⚖️", masse: eM, grammes: M }),
    };
  }),

  // ★4 — combien de paquets ? (kg partagés en paquets de g)
  tpl("masse_defi", "g06_combien_paquets", 4, "Convertis en grammes, puis cherche combien de fois le paquet entre dans le total.", () => {
    const cas = un([
      { m: ["confiturière", "confiturier"] as const, quoi: "de confiture", unite: "pots", v: [250, 500] },
      { m: ["épicière", "épicier"] as const, quoi: "de lentilles", unite: "sachets", v: [250, 500, 200] },
      { m: ["primeuse", "primeur"] as const, quoi: "de fraises", unite: "barquettes", v: [250, 500] },
      { m: ["chocolatière", "chocolatier"] as const, quoi: "de chocolats", unite: "ballotins", v: [250, 500, 200] },
      { m: ["semencière", "semencier"] as const, quoi: "de graines", unite: "sachets", v: [100, 200, 250] },
      { m: ["fromagère", "fromager"] as const, quoi: "de fromage râpé", unite: "sachets", v: [200, 250, 500] },
      { m: ["boulangère", "boulanger"] as const, quoi: "de pâte", unite: "boules", v: [200, 250, 500] },
      { m: ["cuisinière", "cuisinier"] as const, quoi: "de pâtes", unite: "portions", v: [100, 125, 250] },
    ]);
    const p = perso(cas.m);
    const v = un(cas.v);
    const k = entre(1, 6);
    const n = (k * 1000) / v;
    const ecr = (x: number) => `${fr(x)} ${x === 1 ? cas.unite.replace(/s$/, "") : cas.unite}`;
    return {
      text: `${p.txt} a ${k} kg ${cas.quoi}. ${cap(p.il)} prépare des ${cas.unite} de ${g(v)}. ${un([`Combien de ${cas.unite} peut-${p.il} préparer ?`, `Combien de ${cas.unite} obtient-${p.il} ?`, `Combien de ${cas.unite} de ${g(v)} cela fait-il ?`])}`,
      ...qcmV(n, [n * 10, (k * 100) / v === Math.floor((k * 100) / v) && k * 100 >= v ? (k * 100) / v : n + 2, n / 2 === Math.floor(n / 2) ? n / 2 : n - 1, k * v], ecr, 1),
      explanation: etapes(
        `${k} kg = ${g(k * 1000)}. On cherche combien de fois ${g(v)} entre dans ${g(k * 1000)}.`,
        `${fr(k * 1000)} ÷ ${v} = ${fr(n)}.`,
        `${cap(p.il)} remplit ${ecr(n)}.`,
      ),
      canvas: cartes([{ label: "En tout", icon: "⚖️", masse: `${k} kg` }, { label: `1 ${cas.unite.replace(/s$/, "")}`, icon: "📦", masse: g(v) }], `Combien de ${cas.unite} ?`),
    };
  }),

  // ★4 — tonnes et kilogrammes : peut-il passer ? (piège : 8 500 > 10)
  tpl("masse_defi", "g07_pont_tonnes", 4, "Écris les deux masses en kilogrammes : 1 t = 1 000 kg.", () => {
    const p = perso(un(METIERS_T));
    const L = entre(3, 19);
    const passe = Math.random() < 0.5;
    const x = passe ? L * 1000 - tire(100, 900, 100) : L * 1000 + tire(100, 900, 100);
    const ou = un([
      `Un panneau interdit le pont aux véhicules de plus de ${L} t.`,
      `Le parking du port n'accepte pas les véhicules de plus de ${L} t.`,
      `Le vieux pont du village supporte ${L} t au plus.`,
      `Le bac pour traverser la rivière transporte ${L} t au plus.`,
    ]);
    const oui = `oui, car ${tk(x)} < ${L} t`;
    const non = `non, car ${tk(x)} > ${L} t`;
    return {
      text: `${ou} Le camion de ${p.txt} pèse ${tk(x)}. ${un(["Peut-il passer ?", "A-t-il le droit de passer ?", "Peut-il y aller ?"])}`,
      ...qcm(passe ? oui : non, [oui, non, `on ne peut pas comparer des kg et des t`]),
      explanation: etapes("On convertit les tonnes en kilogrammes pour comparer.", `${L} t = ${tk(L * 1000)} ; ${tk(x)} ${passe ? "<" : ">"} ${tk(L * 1000)}.`, passe ? "Le camion peut passer." : "Le camion est trop lourd : il ne peut pas passer."),
      canvas: tableauCorresp("tonnes (t)", "kilogrammes (kg)", "1", "1 000", String(L), "?"),
    };
  }),

  // ★4 — de combien un panier est-il plus lourd que l'autre ?
  tpl("masse_defi", "g08_difference", 4, "Écris les deux masses en grammes, puis soustrais la plus petite.", () => {
    const d = un(DUOS.filter((x) => x.la !== "Colis"));
    const p = perso(d.m);
    const k = entre(1, 4);
    const h = tire(100, 900, 50);
    const A = k * 1000 + h;
    let B = tire(300, A - 100, 50);
    if (B % 1000 === 0) B += 50;
    const r = A - B;
    const sa = `le sac « ${d.la} »`;
    const sb = `le sac « ${d.lb} »`;
    return {
      text: `${p.txt} pèse deux sacs : ${sa} pèse ${kgg(A)} et ${sb} pèse ${g(B)}. ${un([`De combien ${sa} est-il plus lourd que ${sb} ?`, "Quelle est la différence de masse entre les deux sacs ?", "Combien de grammes de plus pèse le sac le plus lourd ?"])}`,
      ...qcmV(r, [A + B, h > B ? h - B : B - h, k * 100 + h > B ? k * 100 + h - B : A, A], g, 50),
      explanation: etapes("On met les deux masses en grammes, puis on calcule l'écart : une soustraction.", `${kgg(A)} = ${g(A)} ; ${fr(A)} − ${fr(B)} = ${fr(r)}.`, `La différence est ${g(r)}.`),
      canvas: cartes([{ label: d.la, icon: d.ia, masse: kgg(A) }, { label: d.lb, icon: d.ib, masse: g(B) }], "Quelle différence ?"),
    };
  }),
];
