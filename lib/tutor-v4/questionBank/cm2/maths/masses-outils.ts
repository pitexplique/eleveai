// lib/tutor-v4/questionBank/cm2/maths/masses-outils.ts
//
// ⭐ 15/11/2026 — LES GABARITS DES MASSES DU CM2 (notion `masse`). Avant : 15 à
// 31 squelettes par micro, 9 à 18 répétitions sur 20. Jumeau du CM1
// (`cm1/maths/masse-outils.ts`), monté au niveau CM2 : DÉCIMAUX (2,5 kg =
// 2 500 g ; 750 g = 0,75 kg), tonne et quintal, milligramme, hectogramme et
// décagramme dans le tableau, problèmes à plusieurs étapes à ★5.
// Vocabulaire de la vidéo `manim/scripts/cm2/masse.py` : « la balance penche »,
// « 1 kg = 1 000 g », « × 1 000 », « la même unité » ; exercice type du défi :
// une mangue de 350 g et un ananas de 1,2 kg → 1 550 g (masse_defi g01).
// Chaque gabarit tire une SITUATION (métiers, marché, cuisine, poste, zoo,
// port, chantier…) × une TOURNURE × des nombres.
// ⛔ CM2 = zéro clavier : que des QCM. Leurres = vraies erreurs d'élève :
// « 1 kg = 100 g », comparer les nombres sans convertir (950 g « plus lourd »
// que 1,2 kg), 2,45 kg « plus lourd » que 2,5 kg (45 > 5), 2 kg 45 g lu
// 2,45 kg, la virgule effacée (2,5 kg → 25 g), additionner au lieu de
// soustraire, oublier la masse marquée, 1 t = 100 kg.
// ⛔ Unité OBLIGATOIRE dans l'énoncé ET dans les choix. Jamais deux choix de
// même valeur (« 2,5 kg » et « 2 500 g » ne sont jamais proposés ensemble).
// Dessins : `masse` (balance, objets pesés, objet à estimer, conversion kg/g),
// `tableau_donnees` (tableau de conversion kg hg dag g, t → kg, q → kg, g → mg).

import type { CanvasFigure, DifficultyLevel, TutorBankItemV4, TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import type { MasseCanvasData, MasseCanvasObject, TableauDonneesCanvasData } from "@/lib/tutor-v4/types_canvas";
import { cap, entre, eur, fr, melange, typo, un } from "./trous-outils";

type G = Omit<TutorGeneratedQuestionV4, "canvas"> & { canvas?: CanvasFigure };
type Qcm = Pick<TutorGeneratedQuestionV4, "format" | "choices" | "expected" | "comparator">;

/** « de Enzo » → « d'Enzo », « que Inès » → « qu'Inès » (prénoms tirés au hasard). */
const elision = (t: string) =>
  t
    .replace(/\b(de|que) (?=[AEIOUÉÈ][a-zàâéèêëîïôûü])/g, (_m, w: string) => (w === "de" ? "d'" : "qu'"))
    .replace(/\bque (?=(un|une|il|elle)\b)/g, "qu'");
const propre = (t: string) => typo(elision(t));

const tpl = (microId: string, n: string, difficulty: DifficultyLevel, hint: string, generate: () => G): TutorBankItemV4 =>
  ({
    kind: "template",
    id: `cm2_${microId}_tpl_${n}`,
    niveau: "cm2",
    matiere: "maths",
    notionId: "masse",
    microId,
    difficulty,
    theme: "neutral",
    hint: typo(hint),
    tags: ["cm2", "masse", microId, "template", "canvas"],
    generate: () => {
      const q = generate();
      return {
        ...q,
        text: propre(q.text),
        explanation: q.explanation ? propre(q.explanation) : q.explanation,
        choices: q.choices?.map(propre),
        expected: q.expected.map(propre),
      };
    },
  }) as TutorBankItemV4;

const etapes = (methode: string, calcul: string, conclusion: string) =>
  `Méthode : ${methode}\n\nCalcul : ${calcul}\n\nConclusion : ${conclusion}`;

/** QCM à propositions écrites : jamais deux fois la même, 4 au plus. */
function qcm(juste: string, faux: readonly string[]): Qcm {
  const d = melange([...new Set(faux)].filter((x) => x !== juste)).slice(0, 3);
  return { format: "qcm", choices: melange([juste, ...d]), expected: [juste], comparator: "mcq_exact" };
}

const arr = (x: number) => Math.round(x * 1e6) / 1e6;
/** QCM de masses : leurres distincts en VALEUR, complétés par des voisins. */
function qcmV(juste: number, faux: readonly number[], f: (v: number) => string, pas: number): Qcm {
  const j = arr(juste);
  const vals: number[] = [];
  for (const v of melange(faux.map(arr))) if (v > 0 && v !== j && !vals.includes(v)) vals.push(v);
  for (let k = 1; vals.length < 3 && k < 30; k++) {
    for (const v of [arr(j + k * pas), arr(j - k * pas)]) if (v > 0 && !vals.includes(v) && vals.length < 3) vals.push(v);
  }
  return qcm(f(j), vals.slice(0, 3).map(f));
}

/* ───────────────────────── Les écritures ───────────────────────── */

/** Un multiple de `m` entre min et max. */
const tire = (min: number, max: number, m = 1) => entre(Math.ceil(min / m), Math.floor(max / m)) * m;
function distincts(min: number, max: number, pas: number, n: number): number[] {
  const s = new Set<number>();
  for (let k = 0; s.size < n && k < 300; k++) s.add(tire(min, max, pas));
  return [...s];
}

/** x en grammes. */
const g = (x: number) => `${fr(x)} g`;
/** x en grammes, écrit en kilogrammes (décimal si besoin). */
const kg = (x: number) => `${fr(x / 1000)} kg`;
/** « 2 kg 350 g », « 3 kg », « 750 g » (x en grammes). */
const kgg = (x: number) => {
  const k = Math.floor(x / 1000);
  const r = Math.round(x - k * 1000);
  if (k && r) return `${fr(k)} kg ${r} g`;
  return k ? `${fr(k)} kg` : `${r} g`;
};
/** x en kilogrammes. */
const tk = (x: number) => `${fr(x)} kg`;
/** x en kilogrammes, écrit en tonnes. */
const tt = (x: number) => `${fr(x / 1000)} t`;
/** « 2 t 450 kg » (x en kilogrammes). */
const tkg = (x: number) => {
  const t = Math.floor(x / 1000);
  const r = Math.round(x - t * 1000);
  if (t && r) return `${t} t ${r} kg`;
  return t ? `${t} t` : `${r} kg`;
};
/** Les grammes d'une masse en kg écrits sur trois chiffres : 2 450 → « 2,450 ». */
const kg3 = (x: number) => `${Math.floor(x / 1000)},${String(x % 1000).padStart(3, "0")}`;

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

/* ───────────────────────── Les personnes ───────────────────────── */

const NOMS_F = ["Nina", "Zoé", "Lou", "Inès", "Jade", "Maya", "Lina", "Emma", "Léa", "Sarah", "Chloé", "Aya", "Rose", "Alma", "Mila", "Anaïs"];
const NOMS_M = ["Téo", "Ravi", "Malo", "Sacha", "Amir", "Tom", "Yanis", "Noé", "Lucas", "Karim", "Hugo", "Enzo", "Bilal", "Jules", "Adam", "Nolan"];
type Perso = { nom: string; il: "il" | "elle"; txt: string };
type Metier = readonly [string, string];
function perso(metier?: Metier): Perso {
  const f = Math.random() < 0.5;
  const nom = un(f ? NOMS_F : NOMS_M);
  const m = metier ? (f ? metier[0] : metier[1]) : "";
  return { nom, il: f ? "elle" : "il", txt: m && Math.random() < 0.75 ? `${nom}, ${m},` : nom };
}
/** Le prénom suivi d'une virgule, une seule fois (« Emma, » ou « Emma, jardinière, »). */
const virg = (p: Perso) => (p.txt.endsWith(",") ? p.txt : `${p.txt},`);

/* ───────────────────────── Les dessins ───────────────────────── */

type Carte = { label: string; icon: string; masse: string; grammes?: number };
const cartes = (l: Carte[], questionLabel?: string): MasseCanvasData => ({
  kind: "masse",
  variant: "objets",
  objets: l,
  ...(questionLabel ? { questionLabel } : {}),
  display: { showMasses: true, showLabels: true, showComparison: false },
});
/** `penche` : la balance montre de quel côté elle descend (sinon elle reste droite). */
const balance = (gauche: MasseCanvasObject, droite: MasseCanvasObject, questionLabel?: string, penche = true): MasseCanvasData => ({
  kind: "masse",
  variant: "balance",
  gauche,
  droite,
  ...(questionLabel ? { questionLabel } : {}),
  display: { showMasses: true, showLabels: true, showComparison: penche },
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
function tableauKgG(x: number, cible: "kg" | "hg" | "dag" | "g"): TableauDonneesCanvasData {
  const kgs = Math.floor(x / 1000);
  const cells = [kgs ? fr(kgs) : "0", x >= 100 ? String(Math.floor(x / 100) % 10) : "0", x >= 10 ? String(Math.floor(x / 10) % 10) : "0", String(x % 10)];
  return {
    kind: "tableau_donnees",
    title: "Tableau de conversion",
    headers: ["kg", "hg", "dag", "g"],
    rows: [{ values: cells }],
    highlight: { col: ["kg", "hg", "dag", "g"].indexOf(cible) },
    display: { compact: true },
  };
}
/** Un tableau de correspondance : 1 t → 1 000 kg ; 3,2 t → ? */
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
const T_KG = ["tonnes (t)", "kilogrammes (kg)"] as const;
const KG_G = ["kilogrammes (kg)", "grammes (g)"] as const;
const G_MG = ["grammes (g)", "milligrammes (mg)"] as const;
const Q_KG = ["quintaux (q)", "kilogrammes (kg)"] as const;

/* ───────────────────────── Les situations à comparer ───────────────────────── */

/** nom avec article, étiquette du dessin, icône. */
type O = readonly [string, string, string];
type Lot = {
  m?: Metier;
  intro: (p: Perso, nb: string) => string;
  obj: readonly O[];
  /** Bornes en grammes, pas en grammes ; `kg` : les masses s'écrivent en kg (décimaux). */
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
  { m: ["agente d'escale", "agent d'escale"], intro: (p, nb) => `À l'aéroport, ${p.txt} pèse ${nb} valises`, obj: [col("la valise", "rouge", "🧳"), col("la valise", "bleue", "🧳"), col("la valise", "verte", "🧳"), col("la valise", "noire", "🧳")], min: 8000, max: 25000, pas: 100, kg: true },
  { m: ["coach sportive", "coach sportif"], intro: (p, nb) => `À la salle de sport, ${p.txt} range ${nb} haltères`, obj: [col("l'haltère", "rouge", "🏋️"), col("l'haltère", "bleu", "🏋️"), col("l'haltère", "noir", "🏋️"), col("l'haltère", "gris", "🏋️")], min: 1000, max: 15000, pas: 500, kg: true },
  { m: ["fromagère", "fromager"], intro: (p, nb) => `${p.txt} pèse ${nb} fromages`, obj: [["le camembert", "Camembert", "🧀"], ["le morceau de comté", "Comté", "🧀"], ["la tomme", "Tomme", "🧀"], ["le brie", "Brie", "🧀"]], min: 200, max: 1500, pas: 25 },
  { intro: (_p, nb) => `Dans la classe, on pèse ${nb} cartables`, obj: [["le cartable de Lou", "Lou", "🎒"], ["le cartable de Malo", "Malo", "🎒"], ["le cartable d'Inès", "Inès", "🎒"], ["le cartable de Tom", "Tom", "🎒"]], min: 1500, max: 6500, pas: 100, kg: true },
  { m: ["jardinière", "jardinier"], intro: (p, nb) => `${p.txt} a acheté ${nb} sacs de terreau`, obj: [col("le sac", "vert", "🪴"), col("le sac", "marron", "🪴"), col("le sac", "jaune", "🪴"), col("le sac", "orange", "🪴")], min: 5000, max: 40000, pas: 500, kg: true },
  { m: ["pâtissière", "pâtissier"], intro: (p, nb) => `${p.txt} pèse ${nb} gâteaux`, obj: [["le fraisier", "Fraisier", "🍰"], ["le gâteau au chocolat", "Gâteau au chocolat", "🎂"], ["la tarte aux pommes", "Tarte aux pommes", "🥧"], ["le cake", "Cake", "🍰"]], min: 400, max: 2200, pas: 50 },
  { m: ["pêcheuse", "pêcheur"], intro: (p, nb) => `Au retour du bateau, ${p.txt} pèse ${nb} poissons`, obj: [["la dorade", "Dorade", "🐟"], ["le maquereau", "Maquereau", "🐟"], ["le bar", "Bar", "🐠"], ["le merlu", "Merlu", "🐟"]], min: 300, max: 2600, pas: 50 },
  { m: ["épicière", "épicier"], intro: (p, nb) => `${p.txt} range ${nb} paquets`, obj: [["le paquet de riz", "Riz", "🍚"], ["le paquet de farine", "Farine", "🌾"], ["le paquet de sucre", "Sucre", "🍬"], ["le paquet de pâtes", "Pâtes", "🍝"]], min: 250, max: 2000, pas: 50 },
  { m: ["déménageuse", "déménageur"], intro: (p, nb) => `${p.txt} porte ${nb} cartons`, obj: [col("le carton", "A", "📦"), col("le carton", "B", "📦"), col("le carton", "C", "📦"), col("le carton", "D", "📦")], min: 5000, max: 30000, pas: 100, kg: true },
  { m: ["maraîchère", "maraîcher"], intro: (p, nb) => `${p.txt} pèse ${nb} cagettes`, obj: [["la cagette de tomates", "Tomates", "🍅"], ["la cagette de carottes", "Carottes", "🥕"], ["la cagette de poivrons", "Poivrons", "🫑"], ["la cagette de courgettes", "Courgettes", "🥒"]], min: 3000, max: 12000, pas: 100, kg: true },
  { m: ["bibliothécaire", "bibliothécaire"], intro: (p, nb) => `${p.txt} pèse ${nb} piles de livres`, obj: [col("la pile", "rouge", "📚"), col("la pile", "bleue", "📚"), col("la pile", "verte", "📚"), col("la pile", "jaune", "📚")], min: 500, max: 4000, pas: 100 },
  { m: ["sage-femme", "sage-femme"], intro: (p, nb) => `À la maternité, ${p.txt} pèse ${nb} bébés nés le même jour`, obj: [["Léo", "Léo", "👶"], ["Anna", "Anna", "👶"], ["Noah", "Noah", "👶"], ["Elsa", "Elsa", "👶"]], min: 2500, max: 4200, pas: 50, kg: true },
  { m: ["cuisinière", "cuisinier"], intro: (p, nb) => `À la cantine, ${p.txt} reçoit ${nb} sacs de pommes de terre`, obj: [col("le sac", "A", "🥔"), col("le sac", "B", "🥔"), col("le sac", "C", "🥔"), col("le sac", "D", "🥔")], min: 2000, max: 12000, pas: 500, kg: true },
  { m: ["soigneuse", "soigneur"], intro: (p, nb) => `Au zoo, ${p.txt} pèse ${nb} jeunes tortues`, obj: [["Caramel", "Caramel", "🐢"], ["Pistache", "Pistache", "🐢"], ["Galette", "Galette", "🐢"], ["Biscotte", "Biscotte", "🐢"]], min: 200, max: 1500, pas: 10 },
  { m: ["livreuse", "livreur"], intro: (p, nb) => `${p.txt} charge ${nb} paquets dans sa camionnette`, obj: [col("le paquet", "rond", "📦"), col("le paquet", "long", "📦"), col("le paquet", "carré", "📦"), col("le paquet", "plat", "📦")], min: 500, max: 9000, pas: 50 },
  { m: ["apicultrice", "apiculteur"], intro: (p, nb) => `${p.txt} pèse ${nb} pots de miel`, obj: [["le pot de miel de fleurs", "Fleurs", "🍯"], ["le pot de miel d'acacia", "Acacia", "🍯"], ["le pot de miel de lavande", "Lavande", "🍯"], ["le pot de miel de châtaignier", "Châtaignier", "🍯"]], min: 250, max: 1000, pas: 25 },
];
/** Les lots où l'on peut mêler kilogrammes et grammes sans nombres trop longs. */
const LOTS_MIX = LOTS.filter((l) => l.max >= 2400 && l.max <= 15000);

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

  // ★1 — deux masses dans la même unité : choisir le bon signe (masses voisines).
  tpl("masse_comparer", "g02_signe_meme_unite", 1, "Même unité : compare les nombres chiffre par chiffre.", () => {
    const lot = un(LOTS);
    const p = perso(lot.m);
    const [o1, o2] = melange([...lot.obj]);
    let [a, b] = distincts(lot.min, lot.max, lot.pas, 2);
    if (Math.random() < 0.35) b = a + un([-1, 1]) * lot.pas;
    if (b <= 0 || b === a) b = a + lot.pas;
    const e = (x: number) => ecr1(lot, x);
    const juste = a > b ? `${e(a)} > ${e(b)}` : `${e(a)} < ${e(b)}`;
    return {
      text: `${cap(lot.intro(p, "deux"))} : ${premier(o1, e(a))} et ${o2[0]} ${e(b)}. ${un(Q_SIGNE)}`,
      ...qcm(juste, [`${e(a)} > ${e(b)}`, `${e(a)} < ${e(b)}`, `${e(a)} = ${e(b)}`]),
      explanation: etapes(
        "Les deux masses ont la même unité : on compare les nombres.",
        `${e(Math.max(a, b))} est plus lourd que ${e(Math.min(a, b))}.`,
        `On écrit ${juste}.`,
      ),
      canvas: cartes([{ label: o1[1], icon: o1[2], masse: e(a) }, { label: o2[1], icon: o2[2], masse: e(b) }], "Compare les deux masses."),
    };
  }),

  // ★1 — deux objets sur la balance : quel plateau descend ?
  tpl("masse_comparer", "g03_quel_plateau", 1, "Le plateau le plus lourd descend.", () => {
    const lot = un(LOTS);
    const p = perso(lot.m);
    const [o1, o2] = melange([...lot.obj]);
    let [a, b] = distincts(lot.min, lot.max, lot.pas, 2);
    if (Math.random() < 0.15) b = a;
    if (b <= 0) b = a + lot.pas;
    const e = (x: number) => ecr1(lot, x);
    const G0 = "le plateau de gauche";
    const D0 = "le plateau de droite";
    const EQ = "aucun : la balance reste équilibrée";
    const juste = a === b ? EQ : a > b ? G0 : D0;
    return {
      text: `${un([
        `${p.txt} pose ${o1[0]} (${e(a)}) à gauche de la balance et ${o2[0]} (${e(b)}) à droite.`,
        `Sur la balance de ${virg(p)} il y a ${o1[0]} à gauche (${e(a)}) et ${o2[0]} à droite (${e(b)}).`,
        `${p.txt} met ${o1[0]} (${e(a)}) sur le plateau de gauche et ${o2[0]} (${e(b)}) sur celui de droite.`,
      ])} ${un(["Quel plateau descend ?", "De quel côté la balance penche-t-elle ?", "Quel plateau va descendre ?"])}`,
      ...qcm(juste, [G0, D0, EQ]),
      explanation: etapes(
        "La balance penche du côté le plus lourd : ce plateau descend.",
        a === b ? `${e(a)} = ${e(b)}.` : `${e(Math.max(a, b))} > ${e(Math.min(a, b))}.`,
        a === b ? "Les masses sont égales : la balance reste équilibrée." : `C'est ${juste} qui descend.`,
      ),
      canvas: balance({ label: o1[1], icon: o1[2], masse: e(a), grammes: a }, { label: o2[1], icon: o2[2], masse: e(b), grammes: b }, "Quel plateau descend ?", false),
    };
  }),

  // ★2 — un objet en kg (décimal), l'autre en g : lequel est le plus lourd ? (piège : 950 > 1,2)
  tpl("masse_comparer", "g04_kg_decimal_ou_g", 2, "Écris les deux masses en grammes : 1,2 kg = 1 200 g.", () => {
    const lot = un(LOTS_MIX);
    const p = perso(lot.m);
    const [o1, o2] = melange([...lot.obj]);
    const A = tire(Math.max(lot.min, 600), Math.min(lot.max, 9900), 100);
    const egal = Math.random() < 0.2;
    let B = egal ? A : A + un([-1, 1]) * tire(50, 450, 50);
    if (B <= 0) B = A + 250;
    const lourd = Math.random() < 0.6;
    const cA = `${o1[0]} (${kg(A)})`;
    const cB = `${o2[0]} (${g(B)})`;
    const meme = "ils ont la même masse";
    const juste = A === B ? meme : (A > B) === lourd ? cA : cB;
    const lequel = o1[0].startsWith("la ") && o2[0].startsWith("la ") ? "Laquelle" : "Lequel";
    const q = lourd
      ? un([`${lequel} est le plus lourd ?`, `${lequel} pèse le plus ?`, `${lequel} fait pencher la balance de son côté ?`])
      : un([`${lequel} est le plus léger ?`, `${lequel} pèse le moins ?`]);
    return {
      text: `${cap(lot.intro(p, "deux"))} : ${premier(o1, kg(A))} et ${o2[0]} ${g(B)}. ${q}`,
      ...qcm(juste, [cA, cB, meme]),
      explanation: etapes(
        "Pour comparer, on écrit les deux masses dans la même unité : 1 kg = 1 000 g, donc on multiplie les kilogrammes par 1 000.",
        `${kg(A)} = ${g(A)}. On compare ${g(A)} et ${g(B)}.`,
        A === B ? "Les deux masses sont égales." : `La réponse est : ${juste}.`,
      ),
      canvas: cartes([{ label: o1[1], icon: o1[2], masse: kg(A) }, { label: o2[1], icon: o2[2], masse: g(B) }], "Mets les deux masses en grammes."),
    };
  }),

  // ★2 — signe entre une masse en kg (décimale) et une masse en g (égalité possible : 0,75 kg = 750 g).
  tpl("masse_comparer", "g05_signe_kg_g", 2, "Convertis d'abord les kilogrammes en grammes.", () => {
    const A = un([tire(100, 950, 50), tire(1100, 9900, 100), tire(1050, 4950, 50)]);
    const egal = Math.random() < 0.25;
    const ecart = un([50, 100, 200, 250, 500].filter((d) => d < A));
    const B = egal ? A : A + un([-1, 1]) * ecart;
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
      `À la poste, deux colis pèsent ${x} et ${y}.`,
    ]);
    return {
      text: `${intro} ${un(Q_SIGNE)}`,
      ...qcm(juste, [`${x} > ${y}`, `${x} < ${y}`, `${x} = ${y}`]),
      explanation: etapes(
        "On ne compare pas les nombres tels qu'ils sont écrits : on met d'abord les deux masses dans la même unité.",
        `${kg(A)} = ${fr(A / 1000)} × 1 000 g = ${g(A)}. On compare ${g(vx)} et ${g(vy)}.`,
        `On écrit ${juste}.`,
      ),
      canvas: conversion(kg(A), "Combien de grammes ?"),
    };
  }),

  // ★2 — 3 masses mêlées (kg décimal et g) : la plus légère ou la plus lourde.
  tpl("masse_comparer", "g06_le_plus_kg_g", 2, "Écris toutes les masses en grammes avant de comparer.", () => {
    const lot = un(LOTS_MIX);
    const p = perso(lot.m);
    const objs = melange([...lot.obj]).slice(0, 3);
    const lo = Math.max(lot.min, 800);
    const k = tire(lo, lot.max, 100);
    let autres = distincts(lo, lot.max, 50, 6).filter((v) => v !== k).slice(0, 2);
    if (autres.length < 2) autres = [k + 350, k > 600 ? k - 250 : k + 650];
    const vals = melange([k, ...autres]);
    const e = (x: number) => (x === k ? kg(x) : g(x));
    const lourd = Math.random() < 0.5;
    const cible = lourd ? Math.max(...vals) : Math.min(...vals);
    const phr = liste(objs.map((o, i) => (i === 0 ? premier(o, e(vals[i])) : `${o[0]} ${e(vals[i])}`)));
    return {
      text: `${cap(lot.intro(p, "trois"))} : ${phr}. ${un(lourd ? Q_LOURD : Q_LEGER)}`,
      ...qcm(e(cible), vals.filter((v) => v !== cible).map(e)),
      explanation: etapes(
        "Les unités sont différentes : on écrit tout en grammes (1 kg = 1 000 g).",
        `${kg(k)} = ${g(k)} ; puis ${vals.filter((v) => v !== k).map(g).join(" et ")}.`,
        `La masse la plus ${lourd ? "lourde" : "légère"} est ${e(cible)}.`,
      ),
      canvas: cartes(objs.map((o, i) => ({ label: o[1], icon: o[2], masse: e(vals[i]) })), lourd ? "Lequel est le plus lourd ?" : "Lequel est le plus léger ?"),
    };
  }),

  // ★3 — ranger 3 masses écrites de trois façons (kg décimal, g, kg et g).
  tpl("masse_comparer", "g07_ranger", 3, "Écris les trois masses en grammes, puis range-les.", () => {
    const lot = un(LOTS_MIX);
    const p = perso(lot.m);
    const objs = melange([...lot.obj]).slice(0, 3);
    const lo = Math.max(lot.min, 1000);
    const reste = distincts(lo, lot.max, 50, 12).filter((v) => v % 1000 !== 0);
    const v1 = reste[0] ?? lo + 300;
    const v2 = reste[1] ?? v1 + 450;
    const v3 = reste[2] ?? v1 + 750;
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

  // ★3 — la balance penche : quelle masse est POSSIBLE ? (masses marquées en kg décimal)
  tpl("masse_comparer", "g08_balance_penche", 3, "Le plateau qui descend porte la masse la plus lourde.", () => {
    const lot = un(LOTS_MIX);
    const p = perso(lot.m);
    const o = un(lot.obj);
    const M = tire(Math.max(lot.min, 1000), Math.min(lot.max, 9500), 500);
    const d = un([50, 100, 150, 200, 250, 300]);
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

  // ★3 — tonnes et kilogrammes : le plus lourd ou le plus léger (piège 2 t 45 kg / 2,45 t).
  tpl("masse_comparer", "g09_tonnes_kg", 3, "Écris les trois masses en kilogrammes : 1 t = 1 000 kg.", () => {
    const cas = un([
      { m: ["grutière", "grutier"] as Metier, intro: (p: Perso) => `Au port, ${p.txt} soulève trois conteneurs`, obj: [col("le conteneur", "rouge", "📦"), col("le conteneur", "bleu", "📦"), col("le conteneur", "vert", "📦")] as O[], lo: 2, hi: 25 },
      { m: ["soigneuse", "soigneur"] as Metier, intro: (p: Perso) => `Au zoo, ${p.txt} fait peser trois éléphants`, obj: [["Tango", "Tango", "🐘"], ["Bimba", "Bimba", "🐘"], ["Ozzy", "Ozzy", "🐘"]] as O[], lo: 2, hi: 5 },
      { m: ["camionneuse", "camionneur"] as Metier, intro: (p: Perso) => `Sur la bascule, ${p.txt} pèse trois camions`, obj: [col("le camion", "jaune", "🚚"), col("le camion", "blanc", "🚚"), col("le camion", "rouge", "🚚")] as O[], lo: 3, hi: 19 },
      { m: ["agricultrice", "agriculteur"] as Metier, intro: (p: Perso) => `À la ferme, ${p.txt} pèse trois remorques de blé`, obj: [col("la remorque", "A", "🚜"), col("la remorque", "B", "🚜"), col("la remorque", "C", "🚜")] as O[], lo: 2, hi: 12 },
      { m: ["maçonne", "maçon"] as Metier, intro: (p: Perso) => `Sur le chantier, ${p.txt} fait livrer trois tas de sable`, obj: [col("le tas", "A", "🏖️"), col("le tas", "B", "🏖️"), col("le tas", "C", "🏖️")] as O[], lo: 2, hi: 9 },
      { m: ["capitaine", "capitaine"] as Metier, intro: (p: Perso) => `${p.txt} compare trois bateaux de pêche`, obj: [["la Mouette", "Mouette", "⛵"], ["le Goéland", "Goéland", "⛵"], ["l'Albatros", "Albatros", "⛵"]] as O[], lo: 3, hi: 15 },
      { m: ["scientifique", "scientifique"] as Metier, intro: (p: Perso) => `${p.txt} note la masse de trois jeunes baleines`, obj: [["Perle", "Perle", "🐋"], ["Azur", "Azur", "🐋"], ["Nacre", "Nacre", "🐋"]] as O[], lo: 2, hi: 9 },
    ]);
    const p = perso(cas.m);
    const T = entre(cas.lo, cas.hi) * 1000;
    const r2 = tire(10, 95, 5);
    // Trois écritures : « 2,4 t », « 2 350 kg », « 2 t 45 kg » (piège : 2,45 t).
    const vals = [...new Set([T + tire(100, 900, 100), T + tire(50, 950, 50), T + r2])];
    for (let s = 1; vals.length < 3; s++) if (!vals.includes(T + 100 * s + 30)) vals.push(T + 100 * s + 30);
    const fmt = new Map<number, string>([[vals[0], tt(vals[0])], [vals[1], tk(vals[1])], [vals[2], tkg(vals[2])]]);
    const e = (x: number) => fmt.get(x) ?? tk(x);
    const ordre = melange([...vals]);
    const lourd = Math.random() < 0.5;
    const cible = lourd ? Math.max(...vals) : Math.min(...vals);
    const phr = liste(ordre.map((v, i) => (i === 0 ? premier(cas.obj[i], e(v)) : `${cas.obj[i][0]} ${e(v)}`)));
    return {
      text: `${cap(cas.intro(p))} : ${phr}. ${un(lourd ? Q_LOURD : Q_LEGER)}`,
      ...qcm(e(cible), ordre.filter((v) => v !== cible).map(e)),
      explanation: etapes(
        `On écrit tout en kilogrammes (1 t = 1 000 kg).${vals[2] - T < 100 ? ` Attention : ${tkg(vals[2])} = ${tk(vals[2])}, ce n'est pas ${fr(T / 1000)},${vals[2] - T} t.` : ""}`,
        ordre.map((v) => `${e(v)} = ${tk(v)}`).join(" ; ") + ".",
        `La masse la plus ${lourd ? "lourde" : "légère"} est ${e(cible)}.`,
      ),
      canvas: cartes(ordre.map((v, i) => ({ label: cas.obj[i][1], icon: cas.obj[i][2], masse: e(v) })), lourd ? "Lequel est le plus lourd ?" : "Lequel est le plus léger ?"),
    };
  }),

  // ★3 — décimaux en kg (piège : 2,45 kg « plus lourd » que 2,5 kg car 45 > 5).
  tpl("masse_comparer", "g10_decimaux_piege", 3, "Écris les masses avec trois chiffres après la virgule : 2,5 kg = 2,500 kg.", () => {
    const lot = un(LOTS_MIX.filter((l) => l.max >= 3000));
    const p = perso(lot.m);
    const k0 = Math.max(1, Math.floor(lot.min / 1000));
    const k = entre(k0, Math.max(k0, Math.min(9, Math.floor(lot.max / 1000) - 1)));
    const d = entre(2, 8);
    // 2,5 kg ; 2,45 kg (piège : 45 > 5) ; 2,05 kg ; 2,55 kg ; 2,005 kg.
    const pool = melange([k * 1000 + d * 100, k * 1000 + (d - 1) * 100 + tire(15, 95, 5), k * 1000 + d * 10, k * 1000 + d * 100 + tire(5, 95, 5), k * 1000 + d]);
    const uniq = [...new Set(pool)].slice(0, entre(3, 4));
    const objs = melange([...lot.obj]);
    const lourd = Math.random() < 0.5;
    const cible = lourd ? Math.max(...uniq) : Math.min(...uniq);
    const ordre = melange(uniq);
    const phr = liste(ordre.map((v, i) => (i === 0 ? premier(objs[i], kg(v)) : `${objs[i][0]} ${kg(v)}`)));
    return {
      text: `${cap(lot.intro(p, NB[ordre.length]))} : ${phr}. ${un(lourd ? Q_LOURD : Q_LEGER)}`,
      ...qcm(kg(cible), ordre.filter((v) => v !== cible).map(kg)),
      explanation: etapes(
        "Les unités sont les mêmes, mais les parties décimales n'ont pas le même nombre de chiffres. On complète avec des zéros pour comparer chiffre par chiffre (ou on convertit en grammes).",
        ordre.map((v) => `${kg(v)} = ${kg3(v)} kg = ${g(v)}`).join(" ; ") + ".",
        `La masse la plus ${lourd ? "lourde" : "légère"} est ${kg(cible)}.`,
      ),
      canvas: cartes(ordre.map((v, i) => ({ label: objs[i][1], icon: objs[i][2], masse: kg(v) })), lourd ? "Lequel est le plus lourd ?" : "Lequel est le plus léger ?"),
    };
  }),
];

/* ───────────────────────── MASSE_ESTIMER ───────────────────────── */

type U = "mg" | "g" | "kg" | "t";
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
  ["un yaourt", "Yaourt", "🥛", 125, "g", "yaourts"],
  ["un cahier", "Cahier", "📓", 250, "g", "cahiers"],
  ["un chat", "Chat", "🐱", 4, "kg", "chats"],
  ["un chien de taille moyenne", "Chien", "🐕", 15, "kg", "chiens"],
  ["un enfant de CM2", "Enfant", "🧒", 35, "kg", "enfants"],
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
  ["une trottinette", "Trottinette", "🛴", 4, "kg", "trottinettes"],
  ["un éléphant", "Éléphant", "🐘", 5, "t", "éléphants"],
  ["un camion chargé", "Camion", "🚚", 20, "t", "camions"],
  ["un bus", "Bus", "🚌", 12, "t", "bus"],
  ["un tracteur", "Tracteur", "🚜", 4, "t", "tracteurs"],
  ["un avion de ligne", "Avion", "✈️", 50, "t", "avions"],
  ["une baleine bleue", "Baleine", "🐋", 100, "t", "baleines"],
];
/** Les très petites masses, en milligrammes (CM2). */
const OBJETS_MG: Ob[] = [
  ["un grain de riz", "Grain de riz", "🍚", 20, "mg", "grains de riz"],
  ["une fourmi", "Fourmi", "🐜", 5, "mg", "fourmis"],
  ["un moustique", "Moustique", "🦟", 2, "mg", "moustiques"],
  ["une abeille", "Abeille", "🐝", 100, "mg", "abeilles"],
  ["un grain de sable", "Grain de sable", "🏖️", 1, "mg", "grains de sable"],
  ["une graine de tomate", "Graine", "🌱", 3, "mg", "graines de tomate"],
  ["une coccinelle", "Coccinelle", "🐞", 20, "mg", "coccinelles"],
];
const TOUS = [...OBJETS, ...OBJETS_MG];
const ORDRE_U: U[] = ["mg", "g", "kg", "t"];
const UNITES: Record<U, string> = { mg: "le milligramme (mg)", g: "le gramme (g)", kg: "le kilogramme (kg)", t: "la tonne (t)" };
const AUTRES_GRANDEURS = ["le litre (L)", "le mètre (m)", "le centimètre (cm)", "le kilomètre (km)"];
const autresU = (u: U, avecMg = false) => (avecMg ? ORDRE_U : (["g", "kg", "t"] as U[])).filter((x) => x !== u);
/** La masse en grammes d'un objet (pour comparer des objets entre eux). */
const enG = (o: Ob) => o[3] * { mg: 0.001, g: 1, kg: 1000, t: 1e6 }[o[4]];
/** Trois objets dont les masses sont au moins `ecart` fois différentes. */
function trio(l: readonly Ob[], ecart: number): Ob[] {
  const tri: Ob[] = [];
  for (const o of melange(l)) {
    if (tri.every((x) => enG(x) >= enG(o) * ecart || enG(o) >= enG(x) * ecart)) tri.push(o);
    if (tri.length === 3) return tri;
  }
  return [OBJETS[0], OBJETS[17], OBJETS[33]];
}
const QUI_ESTIME: readonly Metier[] = [
  ["vétérinaire", "vétérinaire"], ["professeure", "professeur"], ["cuisinière", "cuisinier"], ["vendeuse", "vendeur"],
  ["factrice", "facteur"], ["journaliste", "journaliste"], ["scientifique", "scientifique"], ["infirmière", "infirmier"],
  ["biologiste", "biologiste"], ["déménageuse", "déménageur"],
];
/** Des objets dont la masse s'écrit naturellement avec une virgule (en grammes). */
type ObD = readonly [string, string, string, number];
const OBJETS_DEC: ObD[] = [
  ["une bouteille d'eau pleine", "Bouteille", "🍼", 1500],
  ["un ordinateur portable", "Ordinateur", "💻", 1500],
  ["un ananas", "Ananas", "🍍", 1200],
  ["un melon", "Melon", "🍈", 1200],
  ["un poulet", "Poulet", "🍗", 1500],
  ["un dictionnaire", "Dictionnaire", "📕", 1200],
  ["une pastèque", "Pastèque", "🍉", 4500],
  ["un bébé qui vient de naître", "Bébé", "👶", 3200],
  ["un chat", "Chat", "🐱", 4500],
  ["une brique de lait", "Lait", "🥛", 1000],
  ["un sac de farine", "Farine", "🌾", 2500],
  ["une citrouille", "Citrouille", "🎃", 3500],
  ["un lapin", "Lapin", "🐇", 2500],
  ["un casque de vélo", "Casque", "⛑️", 300],
  ["une paire de chaussures", "Chaussures", "👟", 800],
  ["un pot de confiture", "Confiture", "🍯", 400],
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

  // ★1 — parmi trois objets très différents : le plus lourd ou le plus léger.
  tpl("masse_estimer", "g03_le_plus_lourd", 1, "Imagine chaque objet sur une balance.", () => {
    const tri = trio(OBJETS, 6);
    const lourd = Math.random() < 0.55;
    const cible = [...tri].sort((a, b) => (lourd ? enG(b) - enG(a) : enG(a) - enG(b)))[0];
    const p = perso(un(QUI_ESTIME));
    const noms = liste(tri.map((o) => o[0]));
    return {
      text: lourd
        ? un([`Lequel est le plus lourd : ${noms} ?`, `${p.txt} compare ${noms}. Lequel pèse le plus ?`, `Qui ferait le plus pencher la balance : ${noms} ?`])
        : un([`Lequel est le plus léger : ${noms} ?`, `${p.txt} compare ${noms}. Lequel pèse le moins ?`]),
      ...qcm(cible[0], tri.filter((o) => o !== cible).map((o) => o[0])),
      explanation: etapes(
        "On estime la masse de chaque objet.",
        tri.map((o) => `${o[0]} : environ ${fr(o[3])} ${o[4]}`).join(" ; ") + ".",
        `Le plus ${lourd ? "lourd" : "léger"} est ${cible[0]}.`,
      ),
      canvas: cartes(tri.map((o) => ({ label: o[1], icon: o[2], masse: "?" })), lourd ? "Lequel est le plus lourd ?" : "Lequel est le plus léger ?"),
    };
  }),

  // ★2 — lequel de ces objets pèse environ … ? (milligrammes compris)
  tpl("masse_estimer", "g04_quel_objet", 2, "Imagine chaque objet dans ta main, ou sur une balance.", () => {
    const o = un(TOUS);
    const memeU = TOUS.filter((x) => x[4] === o[4] && (x[3] >= o[3] * 8 || x[3] * 8 <= o[3]));
    const autres = autresU(o[4], true).map((u) => un(TOUS.filter((x) => x[4] === u)));
    const faux = melange([...autres, ...(memeU.length ? [un(memeU)] : [])]).map((x) => x[0]);
    const p = perso(un(QUI_ESTIME));
    const m = `${fr(o[3])} ${o[4]}`;
    return {
      text: un([
        `Lequel de ces objets pèse environ ${m} ?`,
        `${p.txt} a pesé quelque chose : environ ${m}. Qu'a-t-${p.il} pu peser ?`,
        `Quel objet a une masse proche de ${m} ?`,
      ]),
      ...qcm(o[0], faux),
      explanation: etapes(
        `On cherche un objet de l'ordre de ${m}. Rappel : 1 g = 1 000 mg, 1 kg = 1 000 g, 1 t = 1 000 kg.`,
        `${cap(o[0])} pèse environ ${m} ; les autres sont bien plus légers ou bien plus lourds.`,
        `La réponse est ${o[0]}.`,
      ),
      canvas: estimation("?", "⚖️", `Un objet d'environ ${m}`),
    };
  }),

  // ★2 — corriger une unité impossible (« mon chat pèse 4 g », « une fourmi pèse 5 g »).
  tpl("masse_estimer", "g05_unite_fausse", 2, "Imagine l'objet : la masse écrite est-elle possible ?", () => {
    const o = un(TOUS);
    const avecMg = o[4] === "mg" || o[4] === "g";
    const [faux1, faux2] = melange(autresU(o[4], avecMg));
    const p = perso();
    const ecrit = `${fr(o[3])} ${faux1}`;
    const grand = ORDRE_U.indexOf(faux1) > ORDRE_U.indexOf(o[4]);
    return {
      text: un([
        `${p.nom} a écrit : « ${cap(o[0])} pèse ${ecrit}. » C'est impossible ! Quelle masse voulait-${p.il} sûrement écrire ?`,
        `Dans son exposé, ${p.nom} a noté que ${o[0]} pèse ${ecrit}. L'unité est fausse. Quelle est la bonne masse ?`,
        `« ${cap(o[0])} : ${ecrit} ». Cette étiquette se trompe d'unité. Que faut-il écrire ?`,
      ]),
      ...qcm(`${fr(o[3])} ${o[4]}`, [`${fr(o[3])} ${faux2}`, `${fr(o[3] * 10)} ${faux1}`, `${fr(o[3] * (o[4] === "g" || o[4] === "mg" ? 100 : 10))} ${o[4]}`]),
      explanation: etapes(
        `${ecrit}, c'est beaucoup trop ${grand ? "lourd" : "léger"} pour ${o[0]}.`,
        `${cap(o[0])} pèse environ ${fr(o[3])} ${o[4]}.`,
        `Il fallait écrire ${fr(o[3])} ${o[4]}.`,
      ),
      canvas: estimation(o[1], o[2], `${ecrit} : est-ce possible ?`),
    };
  }),

  // ★2 — une masse raisonnable écrite avec une virgule (1,5 kg) ; pièges : 1,5 g, 15 kg, 0,15 kg.
  tpl("masse_estimer", "g06_masse_decimale", 2, "1,5 kg, c'est 1 kg et demi : un peu plus qu'un paquet de sucre.", () => {
    const o = un(OBJETS_DEC);
    const x = o[3];
    const p = perso();
    const e = x < 1000 ? (v: number) => g(v) : kg;
    const juste = e(x);
    const faux = x < 1000 ? [g(x / 100), kg(x * 10), `${fr(x)} kg`] : [`${fr(x / 1000)} g`, kg(x * 10), kg(x / 10), kg(x * 100)];
    return {
      text: un([
        `Quelle est la masse la plus raisonnable pour ${o[0]} ?`,
        `${p.txt} pèse ${o[0]}. Quelle masse peut-${p.il} lire sur la balance ?`,
        `Environ combien pèse ${o[0]} ?`,
        `Quelle masse convient le mieux pour ${o[0]} ?`,
      ]),
      ...qcm(juste, faux),
      explanation: etapes(
        "On compare avec une masse connue : un paquet de sucre pèse 1 kg, une pomme environ 150 g.",
        `${cap(o[0])} pèse environ ${juste}${x >= 1000 ? `, soit ${g(x)}` : ""}.`,
        `La masse raisonnable est ${juste}.`,
      ),
      canvas: estimation(o[1], o[2], "Quelle masse est raisonnable ?"),
    };
  }),

  // ★3 — plusieurs objets identiques : la masse totale, en kilogrammes.
  tpl("masse_estimer", "g07_plusieurs_en_kg", 3, "Multiplie la masse d'un objet, puis convertis : 1 000 g = 1 kg.", () => {
    const o = un(OBJETS.filter((x) => x[4] === "g" && x[3] >= 60));
    const n = un([4, 5, 6, 8, 10, 12, 15, 20].filter((k) => k * o[3] >= 500));
    const tot = n * o[3];
    const p = perso(un(QUI_ESTIME));
    const seul = o[0].startsWith("une ") ? "Une seule" : "Un seul";
    return {
      text: un([
        `${cap(o[0])} pèse environ ${g(o[3])}. Environ combien pèsent ${n} ${o[5]}, en kilogrammes ?`,
        `${p.txt} met ${n} ${o[5]} dans un sac. ${seul} pèse environ ${g(o[3])}. Environ combien de kilogrammes pèse le sac ?`,
        `${p.txt} doit transporter ${n} ${o[5]} d'environ ${g(o[3])} chacun${o[0].startsWith("une ") ? "e" : ""}. Quelle masse, en kg, va-t-${p.il} porter, à peu près ?`,
      ]),
      ...qcmV(tot, [tot * 10, tot / 10, tot * 100, n + o[3]], kg, 100),
      explanation: etapes(
        "Les objets sont identiques : on multiplie, puis on convertit en kilogrammes (on divise par 1 000).",
        `${n} × ${o[3]} g = ${g(tot)} = ${kg(tot)}.`,
        `Cela fait environ ${kg(tot)}.`,
      ),
      canvas: cartes([{ label: "Un seul", icon: o[2], masse: `≈ ${g(o[3])}` }, { label: `${n} en tout`, icon: o[2], masse: "? kg" }]),
    };
  }),

  // ★3 — combien d'objets pour équilibrer quelques kilogrammes ?
  tpl("masse_estimer", "g08_combien_pour_un_kg", 3, "Combien de fois la masse d'un objet entre-t-elle dans 1 000 g ?", () => {
    const o = un(OBJETS.filter((x) => x[4] === "g" && [20, 50, 100, 125, 200, 250].includes(x[3])));
    const k = un([1, 1, 2, 3]);
    const n = (k * 1000) / o[3];
    const p = perso(un(QUI_ESTIME));
    const f = (v: number) => `environ ${fr(v)} ${o[5]}`;
    return {
      text: un([
        `${cap(o[0])} pèse environ ${g(o[3])}. Combien en faut-il pour faire ${k} kg ?`,
        `${p.txt} veut équilibrer la balance avec ${k} kg de masses marquées. ${cap(o[0])} pèse environ ${g(o[3])}. Combien de ${o[5]} faut-il poser ?`,
        `Combien de ${o[5]} d'environ ${g(o[3])} faut-il pour atteindre ${k} kg ?`,
      ]),
      ...qcmV(n, [n * 10, Math.round(n / 10) > 1 ? Math.round(n / 10) : n * 100, k * o[3]], f, Math.max(1, Math.round(n / 4))),
      explanation: etapes(
        `${k} kg = ${g(k * 1000)}. On cherche combien de fois ${g(o[3])} entre dans ${g(k * 1000)}.`,
        `${fr(k * 1000)} ÷ ${o[3]} = ${fr(n)}.`,
        `Il faut ${f(n)}.`,
      ),
      canvas: balance({ label: `? ${o[5]}`, icon: o[2], masse: "?", grammes: k * 1000 }, { label: "Masses marquées", icon: "⚖️", masse: `${k} kg`, grammes: k * 1000 }, "La balance est équilibrée."),
    };
  }),

  // ★3 — ranger trois objets, du plus léger au plus lourd (estimation).
  tpl("masse_estimer", "g09_ranger", 3, "Estime d'abord la masse de chaque objet, avec la bonne unité.", () => {
    const tri = trio(TOUS, 5);
    const croissant = Math.random() < 0.6;
    const s = [...tri].sort((a, b) => (croissant ? enG(a) - enG(b) : enG(b) - enG(a)));
    const ch = (l: Ob[]) => l.map((o) => o[1]).join(croissant ? " < " : " > ");
    const p = perso(un(QUI_ESTIME));
    const sens = croissant ? "du plus léger au plus lourd" : "du plus lourd au plus léger";
    const objs = liste(melange(tri).map((o) => o[0]));
    return {
      text: un([
        `${p.txt} doit ranger ces objets ${sens} : ${objs}. Quel rangement est juste ?`,
        `Range ces objets ${sens} : ${objs}.`,
        `Quel rangement ${sens} est juste pour ${objs} ?`,
      ]),
      ...qcm(ch(s), [ch([...s].reverse()), ch([s[1], s[0], s[2]]), ch([s[0], s[2], s[1]])]),
      explanation: etapes(
        "On estime chaque masse, puis on compare (1 g = 1 000 mg, 1 kg = 1 000 g, 1 t = 1 000 kg).",
        s.map((o) => `${o[0]} : environ ${fr(o[3])} ${o[4]}`).join(" ; ") + ".",
        `Le rangement juste est ${ch(s)}.`,
      ),
      canvas: cartes(tri.map((o) => ({ label: o[1], icon: o[2], masse: "?" })), "Range les objets."),
    };
  }),
];

/* ───────────────────────── MASSE_CONVERTIR ───────────────────────── */

/** Une phrase avec un métier (ou non) et la masse à convertir. */
type Situ = readonly [Metier | undefined, (p: Perso, m: string) => string];
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
  [["fromagère", "fromager"], (p, m) => `${p.txt} pèse une meule de tomme : ${m}.`],
  [["poissonnière", "poissonnier"], (p, m) => `${p.txt} pèse un thon : ${m}.`],
];
const QG = ["Combien de grammes cela fait-il ?", "Quelle est cette masse en grammes ?", "Écris cette masse en grammes.", "Convertis cette masse en grammes."];
const QK = ["Combien de kilogrammes cela fait-il ?", "Quelle est cette masse en kilogrammes ?", "Écris cette masse en kilogrammes.", "Convertis cette masse en kilogrammes."];
const situ = (l: readonly Situ[], m: string) => {
  const [metier, f] = un(l);
  return f(perso(metier), m);
};
/** Ce qu'on pèse quand la masse fait moins de 1 kg. */
const EN_PETIT: readonly Situ[] = [
  [["boulangère", "boulanger"], (p, m) => `${p.txt} pèse ${m} de levain.`],
  [["pâtissière", "pâtissier"], (p, m) => `${p.txt} verse ${m} de sucre dans la pâte.`],
  [["fromagère", "fromager"], (p, m) => `${p.txt} coupe un morceau de comté de ${m}.`],
  [["primeuse", "primeur"], (p, m) => `Au marché, ${p.txt} pèse ${m} de cerises.`],
  [["factrice", "facteur"], (p, m) => `Le paquet que ${p.txt} doit distribuer pèse ${m}.`],
  [["chocolatière", "chocolatier"], (p, m) => `${p.txt} fait fondre ${m} de chocolat.`],
  [undefined, (p, m) => `La trousse de ${p.nom} pèse ${m}.`],
  [["vétérinaire", "vétérinaire"], (p, m) => `${p.txt} pèse un chaton : ${m}.`],
  [["cuisinière", "cuisinier"], (p, m) => `${p.txt} prépare ${m} de beurre pour la sauce.`],
  [undefined, (p, m) => `Le livre de bibliothèque de ${p.nom} pèse ${m}.`],
  [["épicière", "épicier"], (p, m) => `${p.txt} remplit un sachet de ${m} de lentilles.`],
  [["apicultrice", "apiculteur"], (p, m) => `Le pot de miel de ${p.txt} pèse ${m}.`],
];
/** `x` (en grammes) : sous 1 kg, on pèse de petites choses. */
const situKg = (m: string, x = 1000) => situ(x < 1000 ? EN_PETIT : EN_KG, m);

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
const QT = ["Combien de tonnes cela fait-il ?", "Quelle est cette masse en tonnes ?", "Écris cette masse en tonnes."];
const situT = (m: string) => situ(EN_T, m);

/** Ce qu'on compte en quintaux (1 q = 100 kg) : les récoltes. */
const EN_Q: readonly Situ[] = [
  [["agricultrice", "agriculteur"], (p, m) => `${p.txt} a récolté ${m} de blé.`],
  [["maraîchère", "maraîcher"], (p, m) => `${p.txt} a ramassé ${m} de pommes de terre.`],
  [["arboricultrice", "arboriculteur"], (p, m) => `Le verger de ${p.txt} a donné ${m} de pommes.`],
  [["éleveuse", "éleveur"], (p, m) => `${p.txt} a stocké ${m} de foin pour l'hiver.`],
  [["agricultrice", "agriculteur"], (p, m) => `Le champ de ${p.txt} a produit ${m} de maïs.`],
  [["viticultrice", "viticulteur"], (p, m) => `${p.txt} a vendangé ${m} de raisin.`],
  [["meunière", "meunier"], (p, m) => `Le moulin de ${p.txt} a moulu ${m} de grain.`],
  [["agricultrice", "agriculteur"], (p, m) => `${p.txt} a vendu ${m} de betteraves.`],
];
const situQ = (m: string) => situ(EN_Q, m);

/** Les très petites masses, en milligrammes. */
const EN_MG: readonly Situ[] = [
  [["pharmacienne", "pharmacien"], (p, m) => `${p.txt} prépare un comprimé de ${m}.`],
  [["scientifique", "scientifique"], (p, m) => `Au laboratoire, ${p.txt} pèse ${m} de sel.`],
  [["biologiste", "biologiste"], (p, m) => `${p.txt} pèse un scarabée : ${m}.`],
  [["bijoutière", "bijoutier"], (p, m) => `${p.txt} pèse une petite perle : ${m}.`],
  [["infirmière", "infirmier"], (p, m) => `${p.txt} donne un sachet de vitamine C de ${m}.`],
  [["pâtissière", "pâtissier"], (p, m) => `${p.txt} ajoute ${m} de vanille en poudre dans la crème.`],
  [["apicultrice", "apiculteur"], (p, m) => `${p.txt} pèse une reine des abeilles : ${m}.`],
  [["chimiste", "chimiste"], (p, m) => `${p.txt} verse ${m} de poudre dans un tube.`],
];
const situMg = (m: string) => situ(EN_MG, m);

export const masseConvertirGabarits: TutorBankItemV4[] = [
  // ★1 — kg → g, nombres entiers (piège : 1 kg = 100 g).
  tpl("masse_convertir", "g01_kg_vers_g", 1, "1 kg = 1 000 g : on multiplie par 1 000.", () => {
    const k = un([entre(2, 9), entre(2, 9), entre(10, 25)]);
    const m = `${k} kg`;
    return {
      text: `${situKg(m)} ${un(QG)}`,
      ...qcmV(k * 1000, [k * 100, k * 10, k * 10000], g, 1000),
      explanation: etapes("1 kg = 1 000 g (et pas 100 g) : on multiplie par 1 000.", `${k} × 1 000 = ${fr(k * 1000)}.`, `${m} = ${g(k * 1000)}.`),
      canvas: Math.random() < 0.5 ? tableauKgG(k * 1000, "g") : conversion(m, "Combien de grammes ?"),
    };
  }),

  // ★1 — g → kg, nombres ronds.
  tpl("masse_convertir", "g02_g_vers_kg", 1, "1 000 g = 1 kg : on divise par 1 000.", () => {
    const k = un([entre(2, 9), entre(2, 9), entre(10, 20)]);
    const m = g(k * 1000);
    return {
      text: `${situKg(m)} ${un(QK)}`,
      ...qcmV(k, [k * 10, k * 100, k * 1000], (v) => `${fr(v)} kg`, 1),
      explanation: etapes("1 000 g = 1 kg : on divise par 1 000.", `${fr(k * 1000)} ÷ 1 000 = ${k}.`, `${m} = ${k} kg.`),
      canvas: Math.random() < 0.6 ? tableauKgG(k * 1000, "kg") : conversion(m, "Combien de kilogrammes ?"),
    };
  }),

  // ★1 — t ↔ kg, nombres entiers (piège : 1 t = 100 kg).
  tpl("masse_convertir", "g03_tonnes_entieres", 1, "1 t = 1 000 kg.", () => {
    const t = un([entre(2, 9), entre(2, 9), entre(10, 30)]);
    if (Math.random() < 0.6) {
      const m = `${t} t`;
      return {
        text: `${situT(m)} ${un(QK)}`,
        ...qcmV(t * 1000, [t * 100, t * 10, t * 10000], tk, 1000),
        explanation: etapes("1 t = 1 000 kg (et pas 100 kg).", `${t} × 1 000 = ${fr(t * 1000)}.`, `${m} = ${tk(t * 1000)}.`),
        canvas: tableauCorresp(T_KG[0], T_KG[1], "1", "1 000", String(t), "?"),
      };
    }
    const m = tk(t * 1000);
    return {
      text: `${situT(m)} ${un(QT)}`,
      ...qcmV(t, [t * 10, t * 100, t * 1000], (v) => `${fr(v)} t`, 1),
      explanation: etapes("1 000 kg = 1 t : on divise par 1 000.", `${fr(t * 1000)} ÷ 1 000 = ${t}.`, `${m} = ${t} t.`),
      canvas: tableauCorresp(T_KG[0], T_KG[1], "1", "1 000", "?", fr(t * 1000)),
    };
  }),

  // ★2 — kg décimal → g (2,5 kg = 2 500 g) ; pièges : virgule effacée, × 100, 2 kg 5 g.
  tpl("masse_convertir", "g04_kg_decimal_vers_g", 2, "Multiplie par 1 000 : la virgule avance de trois rangs.", () => {
    const x0 = un([tire(100, 900, 100), tire(1100, 9900, 100), tire(1050, 4950, 50), tire(250, 950, 50)]);
    const x = x0 % 1000 === 0 ? x0 + 500 : x0;
    const m = kg(x);
    const dec = fr(x / 1000).split(",")[1] ?? "";
    const k = Math.floor(x / 1000);
    const colle = Number(`${k}${dec}`);
    return {
      text: `${situKg(m, x)} ${un(QG)}`,
      ...qcmV(x, [colle, x / 10, k * 1000 + Number(dec), x * 10], g, 100),
      explanation: etapes(
        "1 kg = 1 000 g : on multiplie par 1 000, la virgule avance de trois rangs (on complète avec des zéros).",
        `${fr(x / 1000)} × 1 000 = ${fr(x)}.`,
        `${m} = ${g(x)}.`,
      ),
      canvas: Math.random() < 0.5 ? tableauKgG(x, "g") : conversion(m, "Combien de grammes ?"),
    };
  }),

  // ★2 — g → kg décimal (750 g = 0,75 kg ; 1 250 g = 1,25 kg).
  tpl("masse_convertir", "g05_g_vers_kg_decimal", 2, "Divise par 1 000 : la virgule recule de trois rangs.", () => {
    const x0 = un([tire(100, 900, 50), tire(1100, 9900, 100), tire(1050, 4950, 50)]);
    const x = x0 % 1000 === 0 ? x0 + 500 : x0;
    const m = g(x);
    return {
      text: `${situKg(m, x)} ${un(QK)}`,
      ...qcmV(x, [x * 10, x * 100, x / 10], kg, 100),
      explanation: etapes(
        "1 000 g = 1 kg : on divise par 1 000, la virgule recule de trois rangs.",
        `${fr(x)} ÷ 1 000 = ${fr(x / 1000)}.`,
        `${m} = ${kg(x)}.`,
      ),
      canvas: Math.random() < 0.6 ? tableauKgG(x, "kg") : conversion(m, "Combien de kilogrammes ?"),
    };
  }),

  // ★2 — quelle égalité est juste ? (kg/g, t/kg, g/mg, avec des décimaux)
  tpl("masse_convertir", "g06_egalite_juste", 2, "Retiens : 1 t = 1 000 kg ; 1 kg = 1 000 g ; 1 g = 1 000 mg.", () => {
    const a = un([entre(2, 9), entre(1, 9) + un([0.5, 0.25, 0.75, 0.2, 0.4]), un([0.5, 0.25, 0.75, 0.8, 0.3])]);
    const [u1, u2, h] = un([["kg", "g", KG_G], ["kg", "g", KG_G], ["t", "kg", T_KG], ["g", "mg", G_MG]] as const);
    const juste = `${fr(a)} ${u1} = ${fr(a * 1000)} ${u2}`;
    const p = perso();
    return {
      text: un([
        "Quelle égalité est juste ?",
        `${p.nom} a écrit quatre égalités. Laquelle est juste ?`,
        "Une seule de ces conversions est vraie. Laquelle ?",
        "Choisis la conversion exacte.",
      ]),
      ...qcm(juste, [`${fr(a)} ${u1} = ${fr(a * 100)} ${u2}`, `${fr(a)} ${u1} = ${fr(a * 10)} ${u2}`, `${fr(a)} ${u1} = ${fr(a / 1000)} ${u2}`]),
      explanation: etapes(`1 ${u1} = 1 000 ${u2} : on multiplie par 1 000.`, `${fr(a)} × 1 000 = ${fr(a * 1000)}.`, `L'égalité juste est ${juste}.`),
      canvas: tableauCorresp(h[0], h[1], "1", "1 000", fr(a), "?"),
    };
  }),

  // ★2 — « 2 kg 45 g » → g (piège : 2 450 g, 245 g).
  tpl("masse_convertir", "g07_kg_et_g_vers_g", 2, "Écris 3 chiffres pour les grammes : 2 kg 45 g = 2 045 g.", () => {
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

  // ★3 — « kg et g » → kg décimal (2 kg 45 g = 2,045 kg ; piège : 2,45 kg).
  tpl("masse_convertir", "g08_kg_et_g_vers_kg", 3, "Les grammes prennent TROIS chiffres après la virgule : 45 g = 0,045 kg.", () => {
    const k = entre(1, 12);
    const h = un([tire(11, 99, 1), tire(5, 95, 5), entre(1, 9), tire(105, 995, 5)]);
    const tot = k * 1000 + h;
    const m = `${k} kg ${h} g`;
    const faux = h < 100 ? [k * 1000 + h * 10, k * 1000 + (h < 10 ? h * 100 : h * 10), tot * 10] : [k * 1000 + Math.floor(h / 10), tot * 10, k * 100 + h];
    return {
      text: `${situKg(m)} ${un(["Écris cette masse en kilogrammes, avec une virgule.", ...QK])}`,
      ...qcmV(tot, faux, kg, 1),
      explanation: etapes(
        "1 g = 0,001 kg : les grammes s'écrivent sur trois chiffres après la virgule. On complète avec des zéros.",
        `${h} g = ${fr(h / 1000)} kg ; ${k} + ${fr(h / 1000)} = ${fr(tot / 1000)}.`,
        `${m} = ${kg(tot)}.`,
      ),
      canvas: tableauKgG(tot, "kg"),
    };
  }),

  // ★3 — t décimal ↔ kg (3,2 t = 3 200 kg ; 1 500 kg = 1,5 t).
  tpl("masse_convertir", "g09_tonnes_decimales", 3, "1 t = 1 000 kg : multiplie ou divise par 1 000.", () => {
    const x = un([tire(1100, 9900, 100), tire(10500, 29500, 500), tire(1050, 4950, 50), tire(100, 900, 100)]);
    if (Math.random() < 0.55) {
      const m = tt(x);
      return {
        text: `${situT(m)} ${un(QK)}`,
        ...qcmV(x, [x / 10, x * 10, Number(fr(x / 1000).replace(/\s|,/g, ""))], tk, 100),
        explanation: etapes("1 t = 1 000 kg : on multiplie par 1 000.", `${fr(x / 1000)} × 1 000 = ${fr(x)}.`, `${m} = ${tk(x)}.`),
        canvas: tableauCorresp(T_KG[0], T_KG[1], "1", "1 000", fr(x / 1000), "?"),
      };
    }
    const m = tk(x);
    return {
      text: `${situT(m)} ${un(QT)}`,
      ...qcmV(x, [x * 10, x * 100, x / 10], tt, 100),
      explanation: etapes("1 000 kg = 1 t : on divise par 1 000.", `${fr(x)} ÷ 1 000 = ${fr(x / 1000)}.`, `${m} = ${tt(x)}.`),
      canvas: tableauCorresp(T_KG[0], T_KG[1], "1", "1 000", "?", fr(x)),
    };
  }),

  // ★3 — le quintal : 1 q = 100 kg (piège : 1 q = 1 000 kg).
  tpl("masse_convertir", "g10_quintal", 3, "1 quintal (q) = 100 kg, et 1 t = 10 q.", () => {
    const sens = un(["q_kg", "q_kg", "kg_q", "t_q"] as const);
    if (sens === "q_kg") {
      const q = un([entre(2, 30), entre(1, 9) + 0.5, entre(10, 60)]);
      const m = `${fr(q)} q`;
      return {
        text: `${situQ(m)} ${un(QK)}`,
        ...qcmV(q * 100, [q * 1000, q * 10, q * 10000], tk, 100),
        explanation: etapes("1 q = 100 kg (et pas 1 000 kg, c'est la tonne) : on multiplie par 100.", `${fr(q)} × 100 = ${fr(q * 100)}.`, `${m} = ${tk(q * 100)}.`),
        canvas: tableauCorresp(Q_KG[0], Q_KG[1], "1", "100", fr(q), "?"),
      };
    }
    if (sens === "kg_q") {
      const x = un([tire(200, 3000, 100), tire(150, 950, 50)]);
      const m = tk(x);
      return {
        text: `${situQ(m)} ${un(["Combien de quintaux cela fait-il ?", "Quelle est cette masse en quintaux ?", "Écris cette masse en quintaux."])}`,
        ...qcmV(x / 100, [x / 1000, x / 10, x], (v) => `${fr(v)} q`, 1),
        explanation: etapes("100 kg = 1 q : on divise par 100.", `${fr(x)} ÷ 100 = ${fr(x / 100)}.`, `${m} = ${fr(x / 100)} q.`),
        canvas: tableauCorresp(Q_KG[0], Q_KG[1], "1", "100", "?", fr(x)),
      };
    }
    const t = un([entre(2, 9), entre(1, 9) + 0.5]);
    const m = `${fr(t)} t`;
    return {
      text: `${situQ(m)} ${un(["Combien de quintaux cela fait-il ?", "Quelle est cette masse en quintaux ?"])}`,
      ...qcmV(t * 10, [t * 100, t * 1000, t], (v) => `${fr(v)} q`, 1),
      explanation: etapes("1 t = 1 000 kg et 1 q = 100 kg : dans 1 t, il y a 10 quintaux.", `${fr(t)} × 10 = ${fr(t * 10)}.`, `${m} = ${fr(t * 10)} q.`),
      canvas: tableauCorresp("tonnes (t)", "quintaux (q)", "1", "10", fr(t), "?"),
    };
  }),

  // ★3 — g ↔ mg (1 g = 1 000 mg ; 250 mg = 0,25 g).
  tpl("masse_convertir", "g11_milligrammes", 3, "1 g = 1 000 mg.", () => {
    const x = un([tire(50, 950, 50), tire(1100, 4900, 100), tire(100, 900, 100), entre(2, 9) * 1000]);
    if (Math.random() < 0.5) {
      const m = `${fr(x / 1000)} g`;
      return {
        text: `${situMg(m)} ${un(["Combien de milligrammes cela fait-il ?", "Quelle est cette masse en milligrammes ?", "Écris cette masse en milligrammes."])}`,
        ...qcmV(x, [x / 10, x * 10, Number(fr(x / 1000).replace(/\s|,/g, ""))], (v) => `${fr(v)} mg`, 100),
        explanation: etapes("1 g = 1 000 mg : on multiplie par 1 000.", `${fr(x / 1000)} × 1 000 = ${fr(x)}.`, `${m} = ${fr(x)} mg.`),
        canvas: tableauCorresp(G_MG[0], G_MG[1], "1", "1 000", fr(x / 1000), "?"),
      };
    }
    const m = `${fr(x)} mg`;
    return {
      text: `${situMg(m)} ${un(["Combien de grammes cela fait-il ?", "Quelle est cette masse en grammes ?", "Écris cette masse en grammes."])}`,
      ...qcmV(x, [x * 10, x * 100, x / 10], (v) => `${fr(v / 1000)} g`, 100),
      explanation: etapes("1 000 mg = 1 g : on divise par 1 000.", `${fr(x)} ÷ 1 000 = ${fr(x / 1000)}.`, `${m} = ${fr(x / 1000)} g.`),
      canvas: tableauCorresp(G_MG[0], G_MG[1], "1", "1 000", "?", fr(x)),
    };
  }),

  // ★3 — le tableau kg | hg | dag | g (3 hg 5 dag = 350 g ; 450 g = 45 dag).
  tpl("masse_convertir", "g12_hg_dag", 3, "Dans le tableau, chaque colonne vaut 10 fois la suivante : 1 hg = 100 g, 1 dag = 10 g.", () => {
    const cas = un(["hg_dag_g", "g_dag", "kg_hg_g", "hg_g"] as const);
    if (cas === "hg_dag_g") {
      const h = entre(1, 9);
      const d = entre(1, 9);
      const tot = h * 100 + d * 10;
      const m = `${h} hg ${d} dag`;
      return {
        text: `${situKg(m, tot)} ${un(QG)}`,
        ...qcmV(tot, [h * 10 + d, h * 1000 + d * 100, h + d, h * 100 + d], g, 10),
        explanation: etapes("1 hg = 100 g et 1 dag = 10 g.", `${h} × 100 + ${d} × 10 = ${fr(tot)}.`, `${m} = ${g(tot)}.`),
        canvas: tableauKgG(tot, "g"),
      };
    }
    if (cas === "g_dag") {
      const dag = entre(12, 95);
      const x = dag * 10;
      const m = g(x);
      return {
        text: `${situKg(m, x)} ${un(["Combien de décagrammes cela fait-il ?", "Quelle est cette masse en décagrammes (dag) ?", "Écris cette masse en dag."])}`,
        ...qcmV(dag, [x * 10, x / 100, x], (v) => `${fr(v)} dag`, 1),
        explanation: etapes("1 dag = 10 g : on divise par 10.", `${fr(x)} ÷ 10 = ${fr(dag)}.`, `${m} = ${fr(dag)} dag.`),
        canvas: tableauKgG(x, "dag"),
      };
    }
    if (cas === "kg_hg_g") {
      const k = entre(1, 9);
      const h = entre(1, 9);
      const tot = k * 1000 + h * 100;
      const m = `${k} kg ${h} hg`;
      return {
        text: `${situKg(m)} ${un(QG)}`,
        ...qcmV(tot, [k * 1000 + h * 10, k * 1000 + h, k * 100 + h * 10, k * 10 + h], g, 100),
        explanation: etapes("1 kg = 1 000 g et 1 hg = 100 g.", `${k} × 1 000 + ${h} × 100 = ${fr(tot)}.`, `${m} = ${g(tot)}.`),
        canvas: tableauKgG(tot, "g"),
      };
    }
    const h = un([entre(2, 9), entre(11, 35)]);
    const m = `${h} hg`;
    return {
      text: `${situKg(m, h * 100)} ${un(QG)}`,
      ...qcmV(h * 100, [h * 10, h * 1000, h], g, 100),
      explanation: etapes("1 hg = 100 g : on multiplie par 100.", `${h} × 100 = ${fr(h * 100)}.`, `${m} = ${g(h * 100)}.`),
      canvas: tableauKgG(h * 100, "g"),
    };
  }),
];

/* ───────────────────────── MASSE_DEFI ───────────────────────── */

/** Deux ingrédients : le premier en kg (décimal), le second en g. Bornes en grammes. */
type Duo = { m: Metier; dit: (p: Perso, a: string, b: string) => string; ia: string; ib: string; la: string; lb: string; a: readonly [number, number]; b: readonly [number, number] };
const DUOS: Duo[] = [
  { m: ["primeuse", "primeur"], dit: (p, a, b) => `${p.txt} vend un ananas de ${a} et une mangue de ${b}.`, ia: "🍍", ib: "🥭", la: "Ananas", lb: "Mangue", a: [1100, 2200], b: [250, 500] },
  { m: ["pâtissière", "pâtissier"], dit: (p, a, b) => `${p.txt} mélange ${a} de farine et ${b} de sucre.`, ia: "🌾", ib: "🍬", la: "Farine", lb: "Sucre", a: [1100, 3500], b: [150, 900] },
  { m: ["maraîchère", "maraîcher"], dit: (p, a, b) => `${p.txt} remplit une cagette avec ${a} de tomates et ${b} de poivrons.`, ia: "🍅", ib: "🫑", la: "Tomates", lb: "Poivrons", a: [1500, 6500], b: [200, 950] },
  { m: ["épicière", "épicier"], dit: (p, a, b) => `${p.txt} range ${a} de riz et ${b} de lentilles.`, ia: "🍚", ib: "🫘", la: "Riz", lb: "Lentilles", a: [1100, 5500], b: [250, 950] },
  { m: ["maçonne", "maçon"], dit: (p, a, b) => `${p.txt} verse ${a} de sable et ${b} de ciment dans le seau.`, ia: "🏖️", ib: "🧱", la: "Sable", lb: "Ciment", a: [2500, 9500], b: [300, 950] },
  { m: ["jardinière", "jardinier"], dit: (p, a, b) => `${p.txt} achète ${a} de terreau et ${b} de graines.`, ia: "🪴", ib: "🌱", la: "Terreau", lb: "Graines", a: [2500, 9500], b: [100, 600] },
  { m: ["cuisinière", "cuisinier"], dit: (p, a, b) => `Pour la cantine, ${p.txt} épluche ${a} de pommes de terre et ${b} de carottes.`, ia: "🥔", ib: "🥕", la: "Pommes de terre", lb: "Carottes", a: [2500, 9500], b: [300, 950] },
  { m: ["vétérinaire", "vétérinaire"], dit: (p, a, b) => `${p.txt} commande ${a} de croquettes et ${b} de pâtée.`, ia: "🦴", ib: "🥫", la: "Croquettes", lb: "Pâtée", a: [1500, 7500], b: [200, 950] },
  { m: ["fromagère", "fromager"], dit: (p, a, b) => `${p.txt} vend ${a} de comté et ${b} de beurre.`, ia: "🧀", ib: "🧈", la: "Comté", lb: "Beurre", a: [1100, 2500], b: [125, 500] },
  { m: ["confiturière", "confiturier"], dit: (p, a, b) => `${p.txt} met ${a} de fruits et ${b} de sucre dans la bassine.`, ia: "🍑", ib: "🍬", la: "Fruits", lb: "Sucre", a: [1500, 4500], b: [300, 950] },
  { m: ["chocolatière", "chocolatier"], dit: (p, a, b) => `${p.txt} fait fondre ${a} de chocolat et ${b} de beurre.`, ia: "🍫", ib: "🧈", la: "Chocolat", lb: "Beurre", a: [1100, 3500], b: [150, 750] },
  { m: ["livreuse", "livreur"], dit: (p, a, b) => `${p.txt} livre un colis de ${a} et une enveloppe de ${b}.`, ia: "📦", ib: "✉️", la: "Colis", lb: "Enveloppe", a: [1100, 8500], b: [50, 350] },
  { m: ["randonneuse", "randonneur"], dit: (p, a, b) => `${p.txt} met dans son sac à dos ${a} d'eau et ${b} de pique-nique.`, ia: "💧", ib: "🥪", la: "Eau", lb: "Pique-nique", a: [1100, 2500], b: [200, 800] },
  { m: ["boulangère", "boulanger"], dit: (p, a, b) => `${p.txt} prépare ${a} de pâte à pain et ${b} de pâte à brioche.`, ia: "🍞", ib: "🥐", la: "Pâte à pain", lb: "Pâte à brioche", a: [1500, 8500], b: [250, 950] },
  { m: ["poissonnière", "poissonnier"], dit: (p, a, b) => `${p.txt} vend un saumon de ${a} et ${b} de crevettes.`, ia: "🐟", ib: "🦐", la: "Saumon", lb: "Crevettes", a: [1500, 4500], b: [150, 750] },
];
const tireDuo = (d: Duo) => {
  const a = tire(d.a[0], d.a[1], 100);
  const A = a % 1000 === 0 ? a + 100 : a;
  return { A, B: tire(d.b[0], d.b[1], d.b[0] % 50 === 0 ? 50 : 25) };
};

/** Un stock en kg (décimal) dont on retire des grammes. */
type Stock = readonly [Metier | undefined, (p: Perso, a: string, b: string) => string];
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
  [["fromagère", "fromager"], (p, a, b) => `${p.txt} a une meule de ${a} de tomme et en coupe ${b}.`],
];
/** Des objets identiques à multiplier (masse d'un objet en grammes). */
type Lot2 = { m: Metier; dit: (p: Perso, n: number, v: string) => string; icon: string; label: string; f: boolean; v: readonly number[] };
const LOTS_IDENTIQUES: Lot2[] = [
  { m: ["confiturière", "confiturier"], dit: (p, n, v) => `${p.txt} remplit ${n} pots de confiture de ${v} chacun.`, icon: "🍯", label: "Pot", f: false, v: [250, 350, 375, 450] },
  { m: ["épicière", "épicier"], dit: (p, n, v) => `${p.txt} range ${n} boîtes de conserve de ${v}.`, icon: "🥫", label: "Boîte", f: true, v: [400, 425, 800, 850] },
  { m: ["fromagère", "fromager"], dit: (p, n, v) => `${p.txt} vend ${n} plaquettes de beurre de ${v}.`, icon: "🧈", label: "Plaquette", f: true, v: [125, 250] },
  { m: ["libraire", "libraire"], dit: (p, n, v) => `${p.txt} met dans un carton ${n} livres de ${v} chacun.`, icon: "📕", label: "Livre", f: false, v: [300, 350, 450, 600] },
  { m: ["professeure", "professeur"], dit: (p, n, v) => `${p.txt} porte ${n} cahiers de ${v} chacun.`, icon: "📒", label: "Cahier", f: false, v: [120, 150, 180, 240] },
  { m: ["entraîneuse", "entraîneur"], dit: (p, n, v) => `${p.txt} met ${n} ballons de ${v} dans un filet.`, icon: "⚽", label: "Ballon", f: false, v: [410, 420, 450] },
  { m: ["semencière", "semencier"], dit: (p, n, v) => `${p.txt} prépare ${n} sachets de graines de ${v}.`, icon: "🌱", label: "Sachet", f: false, v: [125, 150, 250] },
  { m: ["savonnière", "savonnier"], dit: (p, n, v) => `${p.txt} emballe ${n} savons de ${v} chacun.`, icon: "🧼", label: "Savon", f: false, v: [100, 125, 150] },
  { m: ["primeuse", "primeur"], dit: (p, n, v) => `${p.txt} prépare ${n} barquettes de fraises de ${v}.`, icon: "🍓", label: "Barquette", f: true, v: [250, 500] },
  { m: ["chocolatière", "chocolatier"], dit: (p, n, v) => `${p.txt} prépare ${n} ballotins de chocolats de ${v}.`, icon: "🍫", label: "Ballotin", f: false, v: [250, 375, 500] },
  { m: ["laitière", "laitier"], dit: (p, n, v) => `${p.txt} livre ${n} fromages blancs de ${v}.`, icon: "🥛", label: "Fromage blanc", f: false, v: [500, 750] },
];
/** Un résultat en grammes, ou en kilogrammes une fois sur deux s'il dépasse 1 kg. */
const unite = (x: number) => (x >= 1000 && Math.random() < 0.5 ? "kg" : "g");

export const masseDefiGabarits: TutorBankItemV4[] = [
  // ★4 — L'EXERCICE DE LA VIDÉO : une masse en kg (décimal) + une masse en g (mangue 350 g + ananas 1,2 kg = 1 550 g).
  tpl("masse_defi", "g01_total_kg_g", 4, "Mets les deux masses dans la même unité, puis additionne.", () => {
    const d = un(DUOS);
    const p = perso(d.m);
    const { A, B } = tireDuo(d);
    const tot = A + B;
    const u = unite(tot);
    const f = u === "kg" ? kg : g;
    return {
      text: `${d.dit(p, kg(A), g(B))} ${u === "kg" ? un(["Quelle est la masse totale, en kilogrammes ?", "Combien de kilogrammes cela fait-il en tout ?"]) : un(["Quelle est la masse totale, en grammes ?", "Combien de grammes cela fait-il en tout ?", "Quelle masse cela fait-il en tout, en grammes ?"])}`,
      ...qcmV(tot, u === "kg" ? [A + B * 10, A + B / 10, A - B, tot + 1000] : [A / 1000 + B, A / 10 + B, A + B * 10, A - B], f, 100),
      explanation: etapes(
        "On ne peut pas additionner des kg et des g : on met tout en grammes (× 1 000), puis on additionne.",
        `${kg(A)} = ${g(A)} ; ${fr(A)} + ${fr(B)} = ${fr(tot)}${u === "kg" ? ` ; ${g(tot)} = ${kg(tot)}` : ""}.`,
        `La masse totale est ${f(tot)}.`,
      ),
      canvas: cartes([{ label: d.la, icon: d.ia, masse: kg(A) }, { label: d.lb, icon: d.ib, masse: g(B) }], "Masse totale ?"),
    };
  }),

  // ★4 — ce qui reste (2,5 kg − 750 g) ; pièges : additionner, soustraire sans convertir.
  tpl("masse_defi", "g02_reste", 4, "Convertis, puis soustrais ce qu'on a enlevé.", () => {
    const [metier, phrase] = un(STOCKS);
    const p = perso(metier);
    const A = un([tire(1500, 9500, 500), tire(1200, 4800, 100)]);
    const B = tire(150, 950, 50);
    const r = A - B;
    const u = unite(r);
    const f = u === "kg" ? kg : g;
    return {
      text: `${phrase(p, kg(A), g(B))} ${u === "kg" ? un(["Combien de kilogrammes en reste-t-il ?", "Quelle masse reste-t-il, en kg ?"]) : un(["Combien de grammes en reste-t-il ?", "Quelle masse reste-t-il, en grammes ?"])}`,
      ...qcmV(r, [A + B, A - B / 10, A - B + 1000, A - B * 10 > 0 ? A - B * 10 : A - B - 100], f, 100),
      explanation: etapes(
        "On convertit en grammes, puis on enlève : c'est une soustraction.",
        `${kg(A)} = ${g(A)} ; ${fr(A)} − ${fr(B)} = ${fr(r)}${u === "kg" ? ` ; ${g(r)} = ${kg(r)}` : ""}.`,
        `Il reste ${f(r)}.`,
      ),
      canvas: cartes([{ label: "Au départ", icon: "📦", masse: kg(A) }, { label: "Enlevé", icon: "➖", masse: g(B) }], "Combien reste-t-il ?"),
    };
  }),

  // ★4 — plusieurs objets identiques, réponse en kg (piège : n + masse, × 10).
  tpl("masse_defi", "g03_identiques_en_kg", 4, "Des objets identiques : multiplie, puis convertis en kilogrammes.", () => {
    const l = un(LOTS_IDENTIQUES);
    const p = perso(l.m);
    const v = un(l.v);
    const n = entre(Math.max(3, Math.ceil(1100 / v)), Math.max(5, Math.ceil(1100 / v) + 8));
    const tot = n * v;
    const ils = l.f ? "elles" : "ils";
    return {
      text: `${l.dit(p, n, g(v))} ${un([`Combien pèsent-${ils} en tout, en kilogrammes ?`, "Quelle est la masse totale, en kg ?", "Quelle masse cela fait-il en tout, en kilogrammes ?"])}`,
      ...qcmV(tot, [n + v, tot * 10, tot / 10, (n - 1) * v], kg, 100),
      explanation: etapes(
        "Les objets ont tous la même masse : on multiplie, puis on divise par 1 000 pour passer en kilogrammes.",
        `${n} × ${v} = ${fr(tot)} ; ${g(tot)} = ${kg(tot)}.`,
        `La masse totale est ${kg(tot)}.`,
      ),
      canvas: cartes([{ label: `1 ${l.label.toLowerCase()}`, icon: l.icon, masse: g(v) }, { label: `${n} en tout`, icon: l.icon, masse: "? kg" }]),
    };
  }),

  // ★4 — masse maximale : combien peut-on encore ajouter ? (23 kg − 18,6 kg)
  tpl("masse_defi", "g04_limite", 4, "Écris tout en grammes (ou avec trois chiffres après la virgule) avant de soustraire.", () => {
    const cas = un([
      { L: [20, 23] as const, txt: (p: Perso, L: string, x: string) => `À l'aéroport, une valise ne doit pas dépasser ${L}. Celle de ${p.nom} pèse déjà ${x}.` },
      { m: ["randonneuse", "randonneur"] as Metier, L: [10, 12] as const, txt: (p: Perso, L: string, x: string) => `Le sac à dos de ${p.txt} ne doit pas dépasser ${L} pour la randonnée. Il pèse déjà ${x}.` },
      { m: ["postière", "postier"] as Metier, L: [30, 30] as const, txt: (p: Perso, L: string, x: string) => `Le colis que prépare ${p.txt} ne doit pas dépasser ${L}. Il pèse déjà ${x}.` },
      { m: ["blanchisseuse", "blanchisseur"] as Metier, L: [7, 8] as const, txt: (p: Perso, L: string, x: string) => `Le lave-linge de ${p.txt} accepte ${L} de linge au plus. ${cap(p.il)} y a déjà mis ${x}.` },
      { m: ["jardinière", "jardinier"] as Metier, L: [15, 25] as const, txt: (p: Perso, L: string, x: string) => `La brouette de ${p.txt} peut porter ${L} au plus. Elle contient déjà ${x} de terre.` },
      { L: [5, 6] as const, txt: (p: Perso, L: string, x: string) => `Le panier du vélo de ${p.nom} supporte ${L} au plus. Il contient déjà ${x} de courses.` },
      { m: ["magasinière", "magasinier"] as Metier, L: [12, 18] as const, txt: (p: Perso, L: string, x: string) => `Le chariot de ${p.txt} supporte ${L} au plus. Il porte déjà ${x} de cartons.` },
      { m: ["pilote", "pilote"] as Metier, L: [15, 20] as const, txt: (p: Perso, L: string, x: string) => `Dans le petit avion de ${p.txt}, la soute accepte ${L} au plus. Elle contient déjà ${x} de bagages.` },
    ]);
    const p = perso("m" in cas ? cas.m : undefined);
    const L = entre(cas.L[0], cas.L[1]);
    const k = entre(Math.max(1, L - 6), L - 1);
    const h = un([tire(100, 900, 100), tire(50, 950, 50)]);
    const x = k * 1000 + h;
    const r = L * 1000 - x;
    const piege = (L - k) * 1000 + h;
    return {
      text: `${cas.txt(p, `${L} kg`, kg(x))} ${un(["Quelle masse peut-on encore ajouter, au plus ?", "Combien peut-on encore ajouter au maximum ?", "Quelle masse manque-t-il pour atteindre la limite ?"])}`,
      ...qcmV(r, [piege, L * 1000 + x, (L - k) * 1000, r + 1000], kg, 100),
      explanation: etapes(
        `On soustrait la masse déjà chargée de la limite. Piège : ${L} − ${fr(x / 1000)}, ce n'est pas ${fr(piege / 1000)} ; on écrit ${L} kg = ${kg3(L * 1000)} kg.`,
        `${fr(L * 1000)} g − ${fr(x)} g = ${fr(r)} g.`,
        `On peut encore ajouter ${kg(r)}.`,
      ),
      canvas: cartes([{ label: "Limite", icon: "🚫", masse: `${L} kg` }, { label: "Déjà", icon: "🧳", masse: kg(x) }], "Combien peut-on ajouter ?"),
    };
  }),

  // ★5 — deux étapes : camion vide (t) + chargement (kg), peut-il passer sur le pont ?
  tpl("masse_defi", "g05_pont_deux_etapes", 5, "Calcule la masse du camion chargé en kilogrammes, puis compare à la limite.", () => {
    const p = perso(un([["camionneuse", "camionneur"], ["livreuse", "livreur"], ["conductrice", "conducteur"], ["déménageuse", "déménageur"]] as Metier[]));
    const V = tire(2500, 9500, 500);
    const L = (Math.floor(V / 1000) + entre(2, 5)) * 1000;
    const passe = Math.random() < 0.5;
    let C = passe ? L - V - tire(100, 900, 100) : L - V + tire(100, 900, 100);
    if (C <= 0) C = 300;
    const tot = V + C;
    const ok = tot <= L;
    const ou = un([
      `Un panneau interdit le pont aux véhicules de plus de ${tt(L)}.`,
      `Le vieux pont du village supporte ${tt(L)} au plus.`,
      `Le bac pour traverser la rivière transporte ${tt(L)} au plus.`,
      `La rampe du parking accepte ${tt(L)} au plus.`,
    ]);
    const oui = `oui : ${tk(tot)} < ${tk(L)}`;
    const non = `non : ${tk(tot)} > ${tk(L)}`;
    // Leurres : la comparaison retournée ; 1 t = 100 kg (camion trop léger) ;
    // comparer 4 700 et 5 sans convertir (seulement quand la réponse est « oui »).
    const piege = ok ? `non : ${tk(tot)} > ${tt(L)}` : `oui : ${tk(V / 10 + C)} < ${tk(L)}`;
    return {
      text: `${ou} ${p.txt} conduit un camion qui pèse ${tt(V)} à vide. ${cap(p.il)} charge ${tk(C)} de marchandises. ${un(["Le camion peut-il passer ?", "Le camion chargé a-t-il le droit de passer ?", `Peut-${p.il} y aller avec son chargement ?`])}`,
      ...qcm(ok ? oui : non, [ok ? non : oui, piege, "on ne peut pas comparer des kg et des t"]),
      explanation: etapes(
        "Deux étapes : on convertit les tonnes en kilogrammes (× 1 000) et on additionne, puis on compare à la limite.",
        `${tt(V)} = ${tk(V)} ; ${fr(V)} + ${fr(C)} = ${fr(tot)} kg ; la limite est ${tt(L)} = ${tk(L)}.`,
        ok ? "Le camion chargé peut passer." : "Le camion chargé est trop lourd : il ne peut pas passer.",
      ),
      canvas: tableauCorresp(T_KG[0], T_KG[1], fr(V / 1000), "?", fr(L / 1000), "?"),
    };
  }),

  // ★5 — recette : passer de P à Q personnes (proportionnalité), réponse en kg ou en g.
  tpl("masse_defi", "g06_recette", 5, "Cherche par combien on multiplie le nombre de personnes.", () => {
    const cas = un([
      { m: ["cuisinière", "cuisinier"] as Metier, ou: "à la cantine", ing: "de pâtes", v: [100, 125, 150] },
      { m: ["pâtissière", "pâtissier"] as Metier, ou: "pour un goûter", ing: "de farine", v: [50, 60, 75] },
      { m: ["animatrice", "animateur"] as Metier, ou: "en colonie", ing: "de riz", v: [70, 80, 90] },
      { m: ["cheffe", "chef"] as Metier, ou: "au restaurant", ing: "de pommes de terre", v: [200, 250, 300] },
      { m: ["traiteuse", "traiteur"] as Metier, ou: "pour un mariage", ing: "de poisson", v: [150, 180, 200] },
      { m: ["cuisinière", "cuisinier"] as Metier, ou: "à l'hôpital", ing: "de légumes", v: [200, 250] },
      { m: ["boulangère", "boulanger"] as Metier, ou: "pour la fête de l'école", ing: "de pâte à crêpes", v: [100, 120, 150] },
    ]);
    const p = perso(cas.m);
    const P = un([4, 5, 6, 8, 10]);
    const mult = un([3, 4, 5, 6, 10]);
    const Q = P * mult;
    const a = un(cas.v) * P;
    const tot = a * mult;
    const u = tot >= 1000 ? (Math.random() < 0.6 ? "kg" : "g") : "g";
    const f = u === "kg" ? kg : g;
    return {
      text: `${cap(cas.ou)}, ${p.txt} prévoit ${g(a)} ${cas.ing} pour ${P} personnes. ${un([`Quelle masse ${cas.ing} faut-il pour ${Q} personnes${u === "kg" ? ", en kilogrammes" : ""} ?`, `Combien ${u === "kg" ? "de kilogrammes" : "de grammes"} ${cas.ing} faut-il pour ${Q} personnes ?`])}`,
      ...qcmV(tot, [a + (Q - P), a * Q, tot * 10, a * (mult - 1)], f, 100),
      explanation: etapes(
        `${Q} personnes, c'est ${mult} fois ${P} personnes : il faut ${mult} fois plus ${cas.ing}.`,
        `${fr(a)} × ${mult} = ${fr(tot)}${u === "kg" ? ` ; ${g(tot)} = ${kg(tot)}` : ""}.`,
        `Il faut ${f(tot)} ${cas.ing}.`,
      ),
      canvas: tableauCorresp("personnes", "masse", String(P), g(a), String(Q), "?"),
    };
  }),

  // ★5 — combien de paquets ? (kg décimal partagé en sachets de g)
  tpl("masse_defi", "g07_combien_paquets", 5, "Convertis en grammes, puis cherche combien de fois le sachet entre dans le total.", () => {
    const cas = un([
      { m: ["confiturière", "confiturier"] as Metier, quoi: "de confiture", unite: "pots", v: [250, 500] },
      { m: ["épicière", "épicier"] as Metier, quoi: "de lentilles", unite: "sachets", v: [250, 500, 200] },
      { m: ["primeuse", "primeur"] as Metier, quoi: "de fraises", unite: "barquettes", v: [250, 500] },
      { m: ["chocolatière", "chocolatier"] as Metier, quoi: "de chocolats", unite: "ballotins", v: [250, 125, 200] },
      { m: ["semencière", "semencier"] as Metier, quoi: "de graines", unite: "sachets", v: [100, 125, 250] },
      { m: ["fromagère", "fromager"] as Metier, quoi: "de fromage râpé", unite: "sachets", v: [200, 250, 125] },
      { m: ["boulangère", "boulanger"] as Metier, quoi: "de pâte", unite: "boules", v: [200, 250, 125] },
      { m: ["cuisinière", "cuisinier"] as Metier, quoi: "de pâtes", unite: "portions", v: [100, 125, 250] },
      { m: ["confiseuse", "confiseur"] as Metier, quoi: "de bonbons", unite: "sachets", v: [125, 200, 250] },
    ]);
    const p = perso(cas.m);
    const v = un(cas.v);
    let n = entre(6, 40);
    if ((n * v) % 1000 === 0) n += 1;
    const T = n * v;
    return {
      text: `${p.txt} a ${kg(T)} ${cas.quoi}. ${cap(p.il)} prépare des ${cas.unite} de ${g(v)}. ${un([`Combien de ${cas.unite} peut-${p.il} remplir ?`, `Combien de ${cas.unite} obtient-${p.il} ?`, `Combien de ${cas.unite} de ${g(v)} cela fait-il ?`])}`,
      // Leurres : × 10 au lieu de ÷, 1 kg = 100 g (n ÷ 10), une unité de trop ou de moins.
      ...qcmV(n, [n * 10, Math.round(n / 10) > 1 ? Math.round(n / 10) : n + 2, n - 1, n + 1], (x) => `${fr(x)} ${cas.unite}`, 1),
      explanation: etapes(
        `${kg(T)} = ${g(T)}. On cherche combien de fois ${g(v)} entre dans ${g(T)} : c'est une division.`,
        `${fr(T)} ÷ ${v} = ${fr(n)}.`,
        `${cap(p.il)} remplit ${fr(n)} ${cas.unite}.`,
      ),
      canvas: cartes([{ label: "En tout", icon: "⚖️", masse: kg(T) }, { label: `1 ${cas.unite.replace(/s$/, "")}`, icon: "📦", masse: g(v) }], `Combien de ${cas.unite} ?`),
    };
  }),

  // ★5 — le prix au kilogramme (1 500 g de pommes à 3 € le kg) ; piège : 3 × 1 500 = 4 500 €.
  tpl("masse_defi", "g08_prix_au_kg", 5, "Convertis la masse en kilogrammes, puis multiplie par le prix d'un kilogramme.", () => {
    const cas = un([
      { m: ["primeuse", "primeur"] as Metier, quoi: "les pommes coûtent", pk: [2, 3, 4] },
      { m: ["primeuse", "primeur"] as Metier, quoi: "les tomates coûtent", pk: [3, 4, 5] },
      { m: ["fromagère", "fromager"] as Metier, quoi: "le comté coûte", pk: [16, 18, 20, 24] },
      { m: ["bouchère", "boucher"] as Metier, quoi: "la viande hachée coûte", pk: [12, 14, 16] },
      { m: ["poissonnière", "poissonnier"] as Metier, quoi: "les crevettes coûtent", pk: [14, 18, 20] },
      { m: ["épicière", "épicier"] as Metier, quoi: "les lentilles coûtent", pk: [4, 6] },
      { m: ["confiseuse", "confiseur"] as Metier, quoi: "les bonbons coûtent", pk: [12, 16, 20] },
      { m: ["maraîchère", "maraîcher"] as Metier, quoi: "les carottes coûtent", pk: [2, 3] },
      { m: ["fleuriste", "fleuriste"] as Metier, quoi: "le terreau coûte", pk: [2, 3, 4] },
    ]);
    const p = perso(cas.m);
    const pk = un(cas.pk);
    const x = un([tire(500, 3500, 500), tire(200, 800, 100), tire(1250, 2750, 250)]);
    const prix = Math.round((pk * x) / 10) / 100;
    const f = (v: number) => `${eur(v)} €`;
    const client = un(["Une cliente", "Un client", "Un restaurateur", "Une maman"]);
    return {
      text: `Chez ${virg(p)} ${cas.quoi} ${pk} € le kilogramme. ${client} en achète ${g(x)}. ${un(["Combien va-t-on payer ?", "Quel est le prix à payer ?", "Combien cela coûte-t-il ?"])}`,
      ...qcmV(prix, [pk * x, pk * x / 100, pk + x / 1000, prix * 10], f, pk / 2),
      explanation: etapes(
        "Le prix est donné pour 1 kg : on écrit d'abord la masse en kilogrammes.",
        `${g(x)} = ${kg(x)} ; ${fr(x / 1000)} × ${pk} = ${eur(prix)}.`,
        `Le prix à payer est ${f(prix)}.`,
      ),
      canvas: tableauCorresp("masse", "prix", "1 kg", `${pk} €`, kg(x), "?"),
    };
  }),

  // ★5 — balance : n objets identiques + une masse marquée = des kg (décimal).
  tpl("masse_defi", "g09_balance_identiques", 5, "Enlève d'abord la masse marquée, puis partage en parts égales.", () => {
    const objs = un([
      ["pots de miel", "pot", "🍯"], ["savons", "savon", "🧼"], ["boîtes de thé", "boîte", "🍵"], ["livres identiques", "livre", "📕"],
      ["cubes de bois", "cube", "🧊"], ["sachets de graines", "sachet", "🌱"], ["briques de lait", "brique", "🥛"], ["ballons", "ballon", "⚽"],
      ["melons", "melon", "🍈"], ["boîtes de crayons", "boîte", "✏️"],
    ] as const);
    const fem = ["boîte", "brique"].includes(objs[1]);
    const p = perso();
    const n = entre(2, 5);
    const v = tire(150, 600, 50);
    const m = un([100, 200, 250, 500]);
    const M = n * v + m;
    return {
      text: `${p.txt} pose ${n} ${objs[0]} et une masse marquée de ${g(m)} sur un plateau. Pour équilibrer, il faut ${kg(M)} sur l'autre plateau. ${un([`Combien pèse ${fem ? "une seule" : "un seul"} ${objs[1]} ?`, `Quelle est la masse ${fem ? "d'une" : "d'un"} ${objs[1]} ?`, `Combien pèse chaque ${objs[1]} ?`])}`,
      ...qcmV(v, [Math.round(M / n), Math.round((M + m) / n), M - m, (M - m) * n], g, 50),
      explanation: etapes(
        `${kg(M)} = ${g(M)}. On enlève la masse marquée : ${fr(M)} − ${m} = ${fr(M - m)}. Ces ${fr(M - m)} g sont partagés entre ${n} objets identiques.`,
        `${fr(M - m)} ÷ ${n} = ${fr(v)}.`,
        `${fem ? "Une" : "Un"} ${objs[1]} pèse ${g(v)}.`,
      ),
      canvas: balance({ label: `${n} ${objs[0]} + ${g(m)}`, icon: objs[2], masse: "?", grammes: M }, { label: "Masses marquées", icon: "⚖️", masse: kg(M), grammes: M }),
    };
  }),

  // ★5 — deux sacs : lequel est le plus lourd, et de combien ? (deux étapes)
  tpl("masse_defi", "g10_deux_sacs", 5, "Calcule la masse de chaque sac en grammes, puis la différence.", () => {
    const d = un(DUOS);
    const p = perso(d.m);
    const { A, B } = tireDuo(d);
    const S1 = A + B;
    let S2 = S1 + un([-1, 1]) * tire(100, 700, 50);
    if (S2 % 1000 === 0) S2 += 50;
    const diff = Math.abs(S1 - S2);
    const n1 = "le premier lot";
    const n2 = "le second lot";
    const lourd = S1 > S2 ? n1 : n2;
    const autre = S1 > S2 ? n2 : n1;
    return {
      text: `${d.dit(p, kg(A), g(B))} ${un(["Cela forme un premier lot.", "C'est le premier lot."])} ${un([`Un second lot pèse ${kg(S2)}.`, `Le second lot, lui, pèse ${kg(S2)}.`])} ${un(["Quel lot est le plus lourd, et de combien ?", "Lequel pèse le plus, et de combien ?"])}`,
      ...qcm(`${lourd}, de ${g(diff)}`, [`${autre}, de ${g(diff)}`, `${lourd}, de ${g(diff * 10)}`, `${lourd}, de ${g(diff + 1000)}`]),
      explanation: etapes(
        "Deux étapes : la masse du premier lot (on met tout en grammes), puis la différence avec le second.",
        `${kg(A)} = ${g(A)} ; ${fr(A)} + ${fr(B)} = ${fr(S1)} g ; ${kg(S2)} = ${g(S2)} ; ${fr(Math.max(S1, S2))} − ${fr(Math.min(S1, S2))} = ${fr(diff)}.`,
        `C'est ${lourd}, de ${g(diff)}.`,
      ),
      canvas: cartes([{ label: "Premier lot", icon: d.ia, masse: `${kg(A)} + ${g(B)}` }, { label: "Second lot", icon: "🛍️", masse: kg(S2) }], "Lequel est le plus lourd ?"),
    };
  }),
];
