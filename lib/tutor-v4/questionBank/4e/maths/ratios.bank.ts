// lib/tutor-v4/questionBank/4e/maths/ratios.bank.ts
//
// ⭐ 02/10/2026 — la notion est coupée en deux : ce fichier porte `prop_ratio`
// (ses quatre micros et son défi) ; les deux défis-ponts ratio → pourcentage
// sont partis au défi de `prop_pourcentages`.
//
// ⭐ LES CINQ MICROS NEUVES DE `prop_ratio_pourcentage` (28/08/2026). Les
// trois micros de pourcentage de la notion — `prop_pourcentage`,
// `prop_coeff_multiplicateur`, `prop_evolution` — gardent leurs items dans
// `proportionnalite.bank.ts`, où ils ont été écrits : seul leur `notionId` a
// changé. Déplacer trente items d'un fichier à l'autre n'apporterait rien et
// risquerait des erreurs de transcription.
//
// ⛔ LE TROU QUE CE FICHIER FERME : le mot « ratio » avait ZÉRO occurrence dans
// les vingt banques de 4e. Le BO du cycle 4 (p. 134) en fait pourtant une
// connaissance, et lui donne sa notation standardisée :
//   · a et b sont dans le ratio 2 : 3 si a/2 = b/3 ;
//   · a, b, c sont dans le ratio 2 : 3 : 7 si a/2 = b/3 = c/7.
// Il lui consacre en plus une compétence : « Partager une quantité (par exemple
// une somme d'argent) en deux ou trois parts selon un ratio donné ».
//
// ⭐ CE QUE LA 4e AJOUTE À LA 5e, et il a fallu le mesurer pour le savoir : la
// 5e a dix items de ratio, tous descriptifs (« 2 doses de sirop pour 3 d'eau »).
// Elle n'a AUCUN ratio à trois termes — zéro occurrence de la notation à trois
// nombres, comptée. Et elle n'énonce jamais l'égalité de quotients. Or c'est
// elle qui rend le ratio CALCULABLE : sans a/2 = b/3, on ne sait pas partager
// 120 € selon 2 : 3 : 7.
//
// ⭐ DES GÉNÉRATEURS, PAS DU FIGÉ. Le figé ne sert qu'aux deux VALEURS
// PARTICULIÈRES : la définition de la notation, et le ratio 1 : 1 (le partage
// en parts égales, que les élèves ne reconnaissent pas comme un ratio).
//
// ⛔⛔ 30/09/2026 — « DES QUESTIONS REVIENNENT ». Les élèves de 4e l'ont dit, et
// scripts/mesurer-squelettes-coach.ts l'a mesuré : 2 à 15 squelettes d'énoncé
// par micro, 17 à 18 répétitions sur une série de 20. Un gabarit changeait les
// NOMBRES, jamais la PHRASE. Chaque gabarit compose donc maintenant une
// SITUATION (tables DUOS, LIQUIDES, TRIOS, PARTAGES2, PARTAGES3 : classe,
// mortier, laiton, vinaigrette, chorale, relais, héritage, colocation…) × une
// TOURNURE (ordre des données, question directe ou indirecte, lettres ou
// grandeurs). ⚠️ Pas La Réunion par défaut : deux contextes sur une soixantaine
// (le verger de Saint-Pierre, les letchis de Saint-Denis).
//
// ⭐ ET LE CANVAS PORTE LA NOTION. `schema_barre` est fait pour ça : un total,
// des parts, et l'une d'elles inconnue. C'est exactement le geste du partage
// selon un ratio, et l'élève VOIT pourquoi on divise d'abord par la somme des
// parts. ⚠️ Hauteur 200 au minimum : ses étiquettes de parts sont posées à
// 144 px du haut et sa phrase à 18 px du bas, deux distances qui NE DÉPENDENT
// PAS de la `size` demandée. ⚠️ Étiquettes COURTES dans la barre (champ `etiq`) :
// « l'association pour les animaux » déborde d'une part de 100 px.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import type {
  SchemaBarreCanvasData,
  StatGraphCanvasData,
  TableauProportionnaliteCanvasData,
} from "@/lib/tutor-v4/types_canvas";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/** Un entier entre min et max, par pas de `pas` (min doit être un multiple du pas). */
function randomStep(min: number, max: number, pas: number) {
  return min + pas * randomInt(0, Math.floor((max - min) / pas));
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

// ⚠️ On écarte les doublons ET la bonne réponse, puis on coupe à trois : il faut
// donc fournir PLUS de quatre leurres, sinon le QCM tombe à trois lignes.
function makeChoices(correct: string, wrongs: readonly string[]) {
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct)
  ).slice(0, 3);
  return shuffle([correct, ...distracteurs]);
}

function pgcd(a: number, b: number): number {
  return b === 0 ? a : pgcd(b, a % b);
}

/** Virgule décimale française. */
function dec(x: number) {
  return String(x).replace(".", ",");
}

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** « de » devant un groupe nominal : du, des, de la, d'. */
function de(x: string): string {
  if (x.startsWith("le ")) return "du " + x.slice(3);
  if (x.startsWith("les ")) return "des " + x.slice(4);
  if (x.startsWith("la ") || x.startsWith("l'")) return "de " + x;
  // ⚠️ Pas de « y » ici : « de Yanis », pas « d'Yanis ».
  if (/^[aeiouhéèêàâîôûAEIOUHÉÈ]/.test(x)) return "d'" + x;
  return "de " + x;
}

/** « à » devant un groupe nominal : au, aux, à la, à l'. */
function a_(x: string): string {
  if (x.startsWith("le ")) return "au " + x.slice(3);
  if (x.startsWith("les ")) return "aux " + x.slice(4);
  return "à " + x;
}

const accordRepresente = (x: string) => (x.startsWith("les ") ? "représentent" : "représente");

function barre(params: {
  total?: string;
  parts: { label: string; value?: string; unknown?: boolean }[];
  question?: string;
}): SchemaBarreCanvasData {
  return {
    kind: "schema_barre",
    total: params.total,
    parts: params.parts,
    questionLabel: params.question,
    display: {
      showTotal: true,
      showPartLabels: true,
      showValues: true,
      showQuestion: Boolean(params.question),
    },
    // ⚠️ 200 de haut : voir l'en-tête. En dessous, la phrase du bas chevauche
    // les étiquettes de parts, et ça ne se voit qu'en grande largeur.
    size: { width: 300, height: 200 },
  };
}

// ⭐ LE CAMEMBERT EST LE PONT ENTRE LES DEUX MOITIÉS DE LA NOTION. Un ratio dit
// « tant contre tant » ; un pourcentage dit « tant sur cent ». Le camembert, lui,
// montre les DEUX d'un coup : chaque secteur est une part du ratio, et sa taille
// EST le pourcentage. C'est le dessin qui empêche l'erreur la plus tenace du
// chapitre — rapporter le ciment au sable au lieu du mélange entier.
function camembert(
  data: { label: string; value: number; color?: string }[]
): StatGraphCanvasData {
  return {
    kind: "stat_graph",
    graphType: "camembert",
    data,
    display: { showValues: true, showLabels: true },
    size: { width: 300, height: 220 },
  };
}

function tableauRatio(params: {
  rowLabels: string[];
  values: string[][];
  missing: Array<{ row: number; col: number }>;
  colLabels?: string[];
}): TableauProportionnaliteCanvasData {
  return {
    kind: "tableau_proportionnalite",
    rows: params.values.length,
    cols: params.values[0]?.length ?? 0,
    rowLabels: params.rowLabels,
    colLabels: params.colLabels,
    values: params.values,
    missing: params.missing,
    highlightedCells: params.missing,
    display: {
      showRowLabels: true,
      showColLabels: true,
      showMissing: true,
      showGrid: true,
    },
  };
}

/* ===========================================================================
   LES SITUATIONS À DEUX QUANTITÉS
   `unite: ""` = on COMPTE (filles, chats…) ; sinon on MESURE (kg, mL…).
   `pas` : les quantités sont des multiples de ce pas, pour rester plausibles
   (on ne met pas 6 g de farine dans une pâte à tarte).
=========================================================================== */
type Duo = {
  cadre: string;
  a: string;
  b: string;
  deA: string;
  deB: string;
  leA: string;
  leB: string;
  unite: string;
  pas: readonly number[];
};

const DUOS: readonly Duo[] = [
  { cadre: "Dans une classe", a: "filles", b: "garçons", deA: "de filles", deB: "de garçons", leA: "les filles", leB: "les garçons", unite: "", pas: [1] },
  { cadre: "Dans un refuge", a: "chats", b: "chiens", deA: "de chats", deB: "de chiens", leA: "les chats", leB: "les chiens", unite: "", pas: [1] },
  { cadre: "Dans un club de randonnée", a: "adultes", b: "enfants", deA: "d'adultes", deB: "d'enfants", leA: "les adultes", leB: "les enfants", unite: "", pas: [1] },
  { cadre: "Dans un potager", a: "pieds de tomates", b: "pieds de salade", deA: "de pieds de tomates", deB: "de pieds de salade", leA: "les pieds de tomates", leB: "les pieds de salade", unite: "", pas: [1] },
  { cadre: "Dans une chorale", a: "chanteuses", b: "chanteurs", deA: "de chanteuses", deB: "de chanteurs", leA: "les chanteuses", leB: "les chanteurs", unite: "", pas: [1] },
  { cadre: "Dans une médiathèque", a: "romans", b: "bandes dessinées", deA: "de romans", deB: "de bandes dessinées", leA: "les romans", leB: "les bandes dessinées", unite: "", pas: [10] },
  { cadre: "Sur un parking", a: "voitures électriques", b: "voitures thermiques", deA: "de voitures électriques", deB: "de voitures thermiques", leA: "les voitures électriques", leB: "les voitures thermiques", unite: "", pas: [1] },
  { cadre: "Dans une école de musique", a: "guitaristes", b: "pianistes", deA: "de guitaristes", deB: "de pianistes", leA: "les guitaristes", leB: "les pianistes", unite: "", pas: [1] },
  { cadre: "Dans un verger de Saint-Pierre", a: "pieds de letchis", b: "manguiers", deA: "de pieds de letchis", deB: "de manguiers", leA: "les pieds de letchis", leB: "les manguiers", unite: "", pas: [1] },
  { cadre: "Dans un collège", a: "demi-pensionnaires", b: "externes", deA: "de demi-pensionnaires", deB: "d'externes", leA: "les demi-pensionnaires", leB: "les externes", unite: "", pas: [5, 10] },
  { cadre: "Pour un mortier", a: "ciment", b: "sable", deA: "de ciment", deB: "de sable", leA: "le ciment", leB: "le sable", unite: "kg", pas: [5, 10] },
  { cadre: "Pour une boisson", a: "sirop", b: "eau", deA: "de sirop", deB: "d'eau", leA: "le sirop", leB: "l'eau", unite: "mL", pas: [10, 20, 50] },
  { cadre: "Pour une pâte à tarte", a: "farine", b: "beurre", deA: "de farine", deB: "de beurre", leA: "la farine", leB: "le beurre", unite: "g", pas: [25, 50] },
  { cadre: "Pour une vinaigrette", a: "huile", b: "vinaigre", deA: "d'huile", deB: "de vinaigre", leA: "l'huile", leB: "le vinaigre", unite: "cL", pas: [1, 2] },
  { cadre: "Pour obtenir un vert pomme", a: "peinture jaune", b: "peinture bleue", deA: "de peinture jaune", deB: "de peinture bleue", leA: "la peinture jaune", leB: "la peinture bleue", unite: "L", pas: [1] },
  { cadre: "Pour fabriquer du laiton", a: "cuivre", b: "zinc", deA: "de cuivre", deB: "de zinc", leA: "le cuivre", leB: "le zinc", unite: "g", pas: [10, 50] },
  { cadre: "Pour un engrais de jardin", a: "azote", b: "potassium", deA: "d'azote", deB: "de potassium", leA: "l'azote", leB: "le potassium", unite: "g", pas: [5, 10] },
  { cadre: "Pour un terreau de semis", a: "terre", b: "compost", deA: "de terre", deB: "de compost", leA: "la terre", leB: "le compost", unite: "L", pas: [1, 2, 5] },
  { cadre: "Pour une compote", a: "pommes", b: "poires", deA: "de pommes", deB: "de poires", leA: "les pommes", leB: "les poires", unite: "kg", pas: [1] },
];

type Cote = "a" | "b";
const autre = (c: Cote): Cote => (c === "a" ? "b" : "a");
const estCompte = (d: Duo) => d.unite === "";
const nomDe = (d: Duo, c: Cote) => (c === "a" ? d.a : d.b);
const deDe = (d: Duo, c: Cote) => (c === "a" ? d.deA : d.deB);
const leDe = (d: Duo, c: Cote) => (c === "a" ? d.leA : d.leB);
const cadreMin = (d: { cadre: string }) => d.cadre.charAt(0).toLowerCase() + d.cadre.slice(1);

/** « 12 filles » ou « 40 kg de ciment ». */
function qte(d: Duo, c: Cote, n: number) {
  return estCompte(d) ? `${n} ${nomDe(d, c)}` : `${n} ${d.unite} ${deDe(d, c)}`;
}
function combien(d: Duo, c: Cote) {
  return estCompte(d)
    ? `Combien y a-t-il ${deDe(d, c)} ?`
    : `Combien faut-il ${deDe(d, c)}, en ${d.unite} ?`;
}
const ilYa = (d: { unite: string }) => (d.unite === "" ? "il y a" : "on utilise");
const onCompte = (d: Duo) => (estCompte(d) ? "on compte" : "on prévoit");
function grandeur(d: Duo, c: Cote) {
  return estCompte(d) ? `le nombre ${deDe(d, c)}` : `la quantité ${deDe(d, c)} (en ${d.unite})`;
}
function situation(d: Duo, X: number, Y: number, inverse = false) {
  const s = inverse ? `${qte(d, "b", Y)} et ${qte(d, "a", X)}` : `${qte(d, "a", X)} et ${qte(d, "b", Y)}`;
  return estCompte(d) ? `${d.cadre}, il y a ${s}.` : `${d.cadre}, on mélange ${s}.`;
}
const uniteDe = (d: Duo, c: Cote) => (estCompte(d) ? nomDe(d, c) : `${d.unite} ${deDe(d, c)}`);

/** Couples PREMIERS ENTRE EUX : la forme simplifiée est bien celle-là. */
const BASES: readonly (readonly [number, number])[] = [
  [1, 2], [1, 3], [2, 3], [1, 4], [3, 4], [2, 5], [1, 5],
  [3, 5], [4, 5], [2, 7], [3, 7], [5, 6], [4, 7], [5, 8],
];
/** Deux entiers distincts, premiers entre eux : un ratio donné sous forme simplifiée. */
function ratioSimple(minA: number, maxA: number, minB: number, maxB: number): [number, number] {
  for (;;) {
    const x = randomInt(minA, maxA);
    const y = randomInt(minB, maxB);
    if (x !== y && pgcd(x, y) === 1) return [x, y];
  }
}
function baseAuHasard(): [number, number] {
  const [x, y] = randomChoice(BASES);
  return Math.random() < 0.5 ? [x, y] : [y, x];
}

/* ===========================================================================
   LES LIQUIDES — pour le verseur gradué (`contenance`)
=========================================================================== */
const LIQUIDES = [
  { cadre: "Pour une boisson", a: "sirop", b: "eau", deA: "de sirop", deB: "d'eau", la: "Sirop", lb: "Eau", ia: "🧃", ib: "🚰" },
  { cadre: "Pour une vinaigrette", a: "huile", b: "vinaigre", deA: "d'huile", deB: "de vinaigre", la: "Huile", lb: "Vinaigre", ia: "🫒", ib: "🍶" },
  { cadre: "Pour un cocktail sans alcool", a: "jus d'orange", b: "eau pétillante", deA: "de jus d'orange", deB: "d'eau pétillante", la: "Jus d'orange", lb: "Eau pétillante", ia: "🍊", ib: "🫧" },
  { cadre: "Pour un café au lait", a: "café", b: "lait", deA: "de café", deB: "de lait", la: "Café", lb: "Lait", ia: "☕", ib: "🥛" },
  { cadre: "Pour obtenir un rose pâle", a: "peinture rouge", b: "peinture blanche", deA: "de peinture rouge", deB: "de peinture blanche", la: "Rouge", lb: "Blanc", ia: "🔴", ib: "⚪" },
  { cadre: "Pour arroser des tomates", a: "engrais liquide", b: "eau", deA: "d'engrais liquide", deB: "d'eau", la: "Engrais", lb: "Eau", ia: "🧪", ib: "🚰" },
  { cadre: "Pour une sauce", a: "lait de coco", b: "bouillon", deA: "de lait de coco", deB: "de bouillon", la: "Lait de coco", lb: "Bouillon", ia: "🥥", ib: "🍲" },
  { cadre: "Pour une citronnade", a: "jus de citron", b: "eau", deA: "de jus de citron", deB: "d'eau", la: "Citron", lb: "Eau", ia: "🍋", ib: "🚰" },
  { cadre: "Pour un diabolo", a: "grenadine", b: "limonade", deA: "de grenadine", deB: "de limonade", la: "Grenadine", lb: "Limonade", ia: "🍒", ib: "🫧" },
] as const;

/* ===========================================================================
   LES SITUATIONS À TROIS QUANTITÉS
=========================================================================== */
type Trio = {
  cadre: string;
  noms: readonly [string, string, string];
  de: readonly [string, string, string];
  etiq: readonly [string, string, string];
  unite: string;
  pas: readonly number[];
};

const TRIOS: readonly Trio[] = [
  { cadre: "Pour un béton", noms: ["ciment", "sable", "gravier"], de: ["de ciment", "de sable", "de gravier"], etiq: ["ciment", "sable", "gravier"], unite: "kg", pas: [5, 10] },
  { cadre: "Pour une salade de fruits", noms: ["mangue", "ananas", "banane"], de: ["de mangue", "d'ananas", "de banane"], etiq: ["mangue", "ananas", "banane"], unite: "g", pas: [50, 100] },
  { cadre: "Pour un engrais complet", noms: ["azote", "phosphore", "potassium"], de: ["d'azote", "de phosphore", "de potassium"], etiq: ["azote", "phosph.", "potass."], unite: "g", pas: [2, 5] },
  { cadre: "Pour un bronze d'art", noms: ["cuivre", "étain", "zinc"], de: ["de cuivre", "d'étain", "de zinc"], etiq: ["cuivre", "étain", "zinc"], unite: "g", pas: [10, 20] },
  { cadre: "Pour un punch sans alcool", noms: ["jus d'orange", "jus d'ananas", "grenadine"], de: ["de jus d'orange", "de jus d'ananas", "de grenadine"], etiq: ["orange", "ananas", "grenad."], unite: "cL", pas: [1, 2, 5] },
  { cadre: "Pour un terreau", noms: ["terre", "compost", "sable"], de: ["de terre", "de compost", "de sable"], etiq: ["terre", "compost", "sable"], unite: "L", pas: [1, 2, 5] },
  { cadre: "Pour un granola", noms: ["flocons d'avoine", "noix", "raisins secs"], de: ["de flocons d'avoine", "de noix", "de raisins secs"], etiq: ["flocons", "noix", "raisins"], unite: "g", pas: [10, 20] },
  { cadre: "Pour une teinte orangée", noms: ["peinture jaune", "peinture rouge", "peinture blanche"], de: ["de peinture jaune", "de peinture rouge", "de peinture blanche"], etiq: ["jaune", "rouge", "blanc"], unite: "L", pas: [1] },
  { cadre: "Dans une chorale", noms: ["sopranos", "altos", "ténors"], de: ["de sopranos", "d'altos", "de ténors"], etiq: ["sopranos", "altos", "ténors"], unite: "", pas: [1] },
  { cadre: "Dans une médiathèque", noms: ["romans", "BD", "documentaires"], de: ["de romans", "de BD", "de documentaires"], etiq: ["romans", "BD", "docs"], unite: "", pas: [10] },
  { cadre: "Dans un potager", noms: ["pieds de tomates", "courgettes", "salades"], de: ["de pieds de tomates", "de courgettes", "de salades"], etiq: ["tomates", "courg.", "salades"], unite: "", pas: [1] },
  { cadre: "Dans un club omnisports", noms: ["footballeurs", "nageurs", "cyclistes"], de: ["de footballeurs", "de nageurs", "de cyclistes"], etiq: ["foot", "natation", "vélo"], unite: "", pas: [1, 5] },
  { cadre: "Lors d'une élection de délégués", noms: ["voix pour Inès", "voix pour Hugo", "voix pour Nour"], de: ["de voix pour Inès", "de voix pour Hugo", "de voix pour Nour"], etiq: ["Inès", "Hugo", "Nour"], unite: "", pas: [1] },
  { cadre: "Sur un parking", noms: ["voitures", "motos", "vélos"], de: ["de voitures", "de motos", "de vélos"], etiq: ["voitures", "motos", "vélos"], unite: "", pas: [1] },
  { cadre: "Dans une volière", noms: ["perruches", "canaris", "pinsons"], de: ["de perruches", "de canaris", "de pinsons"], etiq: ["perruches", "canaris", "pinsons"], unite: "", pas: [1] },
  { cadre: "Dans un sachet de bonbons", noms: ["bonbons rouges", "bonbons verts", "bonbons jaunes"], de: ["de bonbons rouges", "de bonbons verts", "de bonbons jaunes"], etiq: ["rouges", "verts", "jaunes"], unite: "", pas: [1] },
];

const qte3 = (t: Trio, i: number, n: number) =>
  t.unite === "" ? `${n} ${t.noms[i]}` : `${n} ${t.unite} ${t.de[i]}`;
const combien3 = (t: Trio, i: number) =>
  t.unite === "" ? `Combien y a-t-il ${t.de[i]} ?` : `Combien faut-il ${t.de[i]}, en ${t.unite} ?`;
const grandeur3 = (t: Trio, i: number) =>
  t.unite === "" ? `le nombre ${t.de[i]}` : `la quantité ${t.de[i]} (en ${t.unite})`;
const ratioNoms3 = (t: Trio) => `${t.noms[0]} : ${t.noms[1]} : ${t.noms[2]}`;

const LETTRES2 = [["x", "y"], ["a", "b"], ["m", "n"], ["p", "q"], ["u", "v"], ["s", "t"]] as const;
const LETTRES3 = [["a", "b", "c"], ["x", "y", "z"], ["p", "q", "r"], ["u", "v", "w"]] as const;

const TRIPLETS: readonly (readonly [number, number, number])[] = [
  [2, 3, 7], [1, 2, 4], [2, 3, 5], [3, 4, 6], [1, 3, 5], [2, 5, 8],
  [1, 2, 3], [3, 4, 5], [1, 3, 4], [2, 5, 6], [4, 3, 1], [5, 2, 3],
];

/* ===========================================================================
   LES PARTAGES — deux parts, puis trois
=========================================================================== */
const PRENOMS = [
  "Léa", "Malik", "Inès", "Hugo", "Nour", "Sacha", "Emma", "Yanis",
  "Chloé", "Kenzo", "Jade", "Noah", "Lina", "Tom",
] as const;
function prenoms(n: number): string[] {
  return shuffle([...PRENOMS]).slice(0, n);
}

type Partage2 = {
  u: string;
  v: readonly [number, number, number];
  roles: () => [string, string];
  etiq?: readonly [string, string];
  sit: (t: string, r: string, A: string, B: string) => string;
  sitSans: (r: string, A: string, B: string) => string;
  q: (X: string) => string;
  /** SANS majuscule : l'appelant met `cap()` en début de phrase. */
  connu: (X: string, val: string) => string;
  qTotal: string;
};

const deuxNoms = () => prenoms(2) as [string, string];

const PARTAGES2: readonly Partage2[] = [
  {
    u: "€", v: [4, 15, 1], roles: deuxNoms,
    sit: (t, r, A, B) => `${A} et ${B} ont acheté un billet de tombola ensemble et gagnent ${t}. Ils se partagent le gain selon le ratio ${r}, celui de leurs mises.`,
    sitSans: (r, A, B) => `${A} et ${B} se partagent le gain d'une tombola selon le ratio ${r}, celui de leurs mises.`,
    q: (X) => `Combien reçoit ${X} ?`, connu: (X, v) => `${X} reçoit ${v}.`, qTotal: "Quel était le gain total ?",
  },
  {
    u: "€", v: [200, 700, 100], roles: deuxNoms,
    sit: (t, r, A, B) => `Un héritage de ${t} est partagé entre deux cousins, ${A} et ${B}, selon le ratio ${r}.`,
    sitSans: (r, A, B) => `Un héritage est partagé entre deux cousins, ${A} et ${B}, selon le ratio ${r}.`,
    q: (X) => `Combien reçoit ${X} ?`, connu: (X, v) => `${X} reçoit ${v}.`, qTotal: "Quel était le montant de l'héritage ?",
  },
  {
    u: "€", v: [10, 40, 1], roles: () => ["la 4e A", "la 4e B"], etiq: ["4e A", "4e B"],
    sit: (t, r) => `Une vente de gâteaux a rapporté ${t}. La 4e A et la 4e B se partagent cette somme selon le ratio ${r}.`,
    sitSans: (r) => `La 4e A et la 4e B se partagent la recette d'une vente de gâteaux selon le ratio ${r}.`,
    q: (X) => `Combien reçoit ${X} ?`, connu: (X, v) => `${X} reçoit ${v}.`, qTotal: "Combien la vente de gâteaux a-t-elle rapporté ?",
  },
  {
    u: "km", v: [1, 4, 1], roles: deuxNoms,
    sit: (t, r, A, B) => `${A} et ${B} courent un relais de ${t} et se partagent la distance selon le ratio ${r}.`,
    sitSans: (r, A, B) => `${A} et ${B} se partagent la distance d'un relais selon le ratio ${r}.`,
    q: (X) => `Quelle distance court ${X}, en km ?`, connu: (X, v) => `${X} court ${v}.`, qTotal: "Quelle est la longueur totale du relais ?",
  },
  {
    u: "m", v: [2, 8, 1], roles: () => ["le premier morceau", "le second morceau"], etiq: ["morceau 1", "morceau 2"],
    sit: (t, r) => `On coupe une corde de ${t} en deux morceaux, selon le ratio ${r}.`,
    sitSans: (r) => `On coupe une corde en deux morceaux, selon le ratio ${r}.`,
    q: (X) => `Quelle est la longueur ${de(X)}, en m ?`, connu: (X, v) => `${X} mesure ${v}.`, qTotal: "Quelle était la longueur de la corde ?",
  },
  {
    u: "m²", v: [5, 30, 5], roles: () => ["le potager", "la pelouse"], etiq: ["potager", "pelouse"],
    sit: (t, r) => `Un jardin de ${t} est partagé entre un potager et une pelouse, selon le ratio potager : pelouse = ${r}.`,
    sitSans: (r) => `Un jardin est partagé entre un potager et une pelouse, selon le ratio potager : pelouse = ${r}.`,
    q: (X) => `Quelle est l'aire ${de(X)}, en m² ?`, connu: (X, v) => `${X} occupe ${v}.`, qTotal: "Quelle est l'aire du jardin ?",
  },
  {
    u: "kg", v: [4, 20, 1], roles: () => ["la première épicerie", "la seconde épicerie"], etiq: ["épicerie 1", "épicerie 2"],
    sit: (t, r) => `Un producteur partage ${t} de mangues entre deux épiceries, selon le ratio ${r}.`,
    sitSans: (r) => `Un producteur partage sa récolte de mangues entre deux épiceries, selon le ratio ${r}.`,
    q: (X) => `Combien de kilogrammes reçoit ${X} ?`, connu: (X, v) => `${X} reçoit ${v}.`, qTotal: "Quelle masse de mangues le producteur a-t-il partagée ?",
  },
  {
    u: "€", v: [50, 500, 50], roles: deuxNoms,
    sit: (t, r, A, B) => `Deux associés, ${A} et ${B}, se partagent un bénéfice de ${t} selon le ratio ${r}.`,
    sitSans: (r, A, B) => `Deux associés, ${A} et ${B}, se partagent un bénéfice selon le ratio ${r}.`,
    q: (X) => `Combien reçoit ${X} ?`, connu: (X, v) => `${X} reçoit ${v}.`, qTotal: "Quel était le bénéfice total ?",
  },
  {
    u: "min", v: [30, 90, 10], roles: deuxNoms,
    sit: (t, r, A, B) => `Deux gardiens de but, ${A} et ${B}, se partagent ${t} de jeu sur la saison, selon le ratio ${r}.`,
    sitSans: (r, A, B) => `Deux gardiens de but, ${A} et ${B}, se partagent le temps de jeu de la saison, selon le ratio ${r}.`,
    q: (X) => `Combien de minutes joue ${X} ?`, connu: (X, v) => `${X} joue ${v}.`, qTotal: "Combien de minutes de jeu y avait-il en tout ?",
  },
  {
    u: "L", v: [2, 8, 1], roles: () => ["le premier stand", "le second stand"], etiq: ["stand 1", "stand 2"],
    sit: (t, r) => `Pour une fête, ${t} de jus de pomme sont répartis entre deux stands, selon le ratio ${r}.`,
    sitSans: (r) => `Pour une fête, le jus de pomme est réparti entre deux stands, selon le ratio ${r}.`,
    q: (X) => `Combien de litres reçoit ${X} ?`, connu: (X, v) => `${X} reçoit ${v}.`, qTotal: "Combien de litres de jus y avait-il en tout ?",
  },
  {
    u: "cm", v: [8, 25, 1], roles: () => ["le premier morceau", "le second morceau"], etiq: ["morceau 1", "morceau 2"],
    sit: (t, r) => `Un menuisier scie une planche de ${t} en deux morceaux, selon le ratio ${r}.`,
    sitSans: (r) => `Un menuisier scie une planche en deux morceaux, selon le ratio ${r}.`,
    q: (X) => `Quelle est la longueur ${de(X)}, en cm ?`, connu: (X, v) => `${X} mesure ${v}.`, qTotal: "Quelle était la longueur de la planche ?",
  },
  {
    u: "€", v: [20, 80, 5], roles: () => ["l'association pour les animaux", "l'association pour la forêt"], etiq: ["animaux", "forêt"],
    sit: (t, r) => `Une cagnotte de ${t} est partagée entre deux associations, l'une pour les animaux, l'autre pour la forêt, selon le ratio ${r}.`,
    sitSans: (r) => `Une cagnotte est partagée entre deux associations, l'une pour les animaux, l'autre pour la forêt, selon le ratio ${r}.`,
    q: (X) => `Combien reçoit ${X} ?`, connu: (X, v) => `${X} reçoit ${v}.`, qTotal: "Quel était le montant de la cagnotte ?",
  },
  {
    u: "élèves", v: [4, 9, 1], roles: () => ["le premier bus", "le second bus"], etiq: ["bus 1", "bus 2"],
    sit: (t, r) => `Pour une sortie, ${t} sont répartis dans deux bus, selon le ratio ${r}.`,
    sitSans: (r) => `Pour une sortie, les élèves sont répartis dans deux bus, selon le ratio ${r}.`,
    q: (X) => `Combien d'élèves montent dans ${X} ?`, connu: (X, v) => `${X} transporte ${v}.`, qTotal: "Combien d'élèves partent en sortie ?",
  },
  {
    u: "g", v: [10, 50, 10], roles: () => ["le massif de tomates", "le massif de rosiers"], etiq: ["tomates", "rosiers"],
    sit: (t, r) => `Un jardinier répartit ${t} d'engrais entre deux massifs, selon le ratio tomates : rosiers = ${r}.`,
    sitSans: (r) => `Un jardinier répartit un sac d'engrais entre deux massifs, selon le ratio tomates : rosiers = ${r}.`,
    q: (X) => `Combien de grammes reçoit ${X} ?`, connu: (X, v) => `${X} reçoit ${v}.`, qTotal: "Quelle masse d'engrais le jardinier a-t-il répartie ?",
  },
  {
    u: "km", v: [2, 6, 1], roles: () => ["la première étape", "la seconde étape"], etiq: ["étape 1", "étape 2"],
    sit: (t, r) => `Une randonnée de ${t} est découpée en deux étapes, selon le ratio ${r}.`,
    sitSans: (r) => `Une randonnée est découpée en deux étapes, selon le ratio ${r}.`,
    q: (X) => `Quelle est la longueur ${de(X)}, en km ?`, connu: (X, v) => `${X} fait ${v}.`, qTotal: "Quelle est la longueur totale de la randonnée ?",
  },
];

type Partage3 = {
  u: string;
  /** « en € », « en nombre d'élèves »… pour les questions qui combinent deux parts. */
  en: string;
  v: readonly [number, number, number];
  roles: () => [string, string, string];
  etiq?: readonly [string, string, string];
  sit: (t: string, r: string, R: string[]) => string;
  q: (X: string) => string;
};

const troisNoms = () => prenoms(3) as [string, string, string];
/** « la parcelle » → la première / la deuxième / la troisième parcelle. */
const ordinaux3 = (feminin: boolean, nom: string): [string, string, string] => [
  `${feminin ? "la première" : "le premier"} ${nom}`,
  `${feminin ? "la" : "le"} deuxième ${nom}`,
  `${feminin ? "la" : "le"} troisième ${nom}`,
];

const PARTAGES3: readonly Partage3[] = [
  {
    u: "€", en: "en €", v: [5, 20, 1], roles: troisNoms,
    sit: (t, r, R) => `${R[0]}, ${R[1]} et ${R[2]} gagnent ${t} à un concours et se partagent le prix selon le ratio ${r}.`,
    q: (X) => `Combien reçoit ${X} ?`,
  },
  {
    u: "€", en: "en €", v: [200, 700, 100], roles: troisNoms,
    sit: (t, r, R) => `Un héritage de ${t} est partagé entre trois frères et sœurs, ${R[0]}, ${R[1]} et ${R[2]}, selon le ratio ${r}.`,
    q: (X) => `Combien reçoit ${X} ?`,
  },
  {
    u: "m²", en: "en m²", v: [10, 60, 10], roles: () => ordinaux3(true, "parcelle"), etiq: ["parcelle 1", "parcelle 2", "parcelle 3"],
    sit: (t, r) => `Un terrain de ${t} est divisé en trois parcelles, selon le ratio ${r}.`,
    q: (X) => `Quelle est l'aire ${de(X)}, en m² ?`,
  },
  {
    u: "€", en: "en €", v: [20, 80, 5], roles: () => ["le transport", "les repas", "les activités"], etiq: ["transport", "repas", "activités"],
    sit: (t, r) => `Le budget de ${t} d'une sortie scolaire est réparti selon le ratio transport : repas : activités = ${r}.`,
    q: (X) => `Quel montant est prévu pour ${X} ?`,
  },
  {
    u: "cm", en: "en cm", v: [5, 15, 1], roles: () => ordinaux3(false, "morceau"), etiq: ["morceau 1", "morceau 2", "morceau 3"],
    sit: (t, r) => `On coupe un ruban de ${t} en trois morceaux, selon le ratio ${r}.`,
    q: (X) => `Quelle est la longueur ${de(X)}, en cm ?`,
  },
  {
    u: "élèves", en: "en nombre d'élèves", v: [3, 8, 1], roles: () => ["l'atelier théâtre", "l'atelier robotique", "l'atelier chorale"], etiq: ["théâtre", "robotique", "chorale"],
    sit: (t, r) => `Au collège, ${t} sont répartis entre trois ateliers, théâtre, robotique et chorale, selon le ratio ${r}.`,
    q: (X) => `Combien d'élèves vont dans ${X} ?`,
  },
  {
    u: "kg", en: "en kg", v: [5, 25, 1], roles: () => ordinaux3(true, "association"), etiq: ["asso 1", "asso 2", "asso 3"],
    sit: (t, r) => `Une banque alimentaire distribue ${t} de riz à trois associations, selon le ratio ${r}.`,
    q: (X) => `Combien de kilogrammes reçoit ${X} ?`,
  },
  {
    u: "€", en: "en €", v: [30, 90, 10], roles: troisNoms,
    sit: (t, r, R) => `Trois colocataires, ${R[0]}, ${R[1]} et ${R[2]}, se partagent un loyer de ${t} selon le ratio des surfaces de leurs chambres, ${r}.`,
    q: (X) => `Combien paie ${X} ?`,
  },
  {
    u: "kWh", en: "en kWh", v: [2, 8, 1], roles: () => ordinaux3(true, "maison"), etiq: ["maison 1", "maison 2", "maison 3"],
    sit: (t, r) => `Une petite centrale solaire produit ${t} dans la journée, partagés entre trois maisons selon le ratio ${r}.`,
    q: (X) => `Combien de kilowattheures reçoit ${X} ?`,
  },
  {
    u: "min", en: "en minutes", v: [3, 10, 1], roles: () => ordinaux3(true, "équipe"), etiq: ["équipe 1", "équipe 2", "équipe 3"],
    sit: (t, r) => `Un débat de ${t} est partagé entre trois équipes, selon le ratio ${r}.`,
    q: (X) => `Combien de minutes de parole a ${X} ?`,
  },
  {
    u: "kg", en: "en kg", v: [8, 25, 1], roles: () => ordinaux3(true, "école"), etiq: ["école 1", "école 2", "école 3"],
    sit: (t, r) => `Une association de Saint-Denis partage ${t} de letchis entre trois écoles, selon le ratio ${r}.`,
    q: (X) => `Combien de kilogrammes reçoit ${X} ?`,
  },
  {
    u: "L", en: "en L", v: [5, 20, 5], roles: () => ordinaux3(false, "jardin"), etiq: ["jardin 1", "jardin 2", "jardin 3"],
    sit: (t, r) => `${t} de compost sont répartis entre trois jardins partagés, selon le ratio ${r}.`,
    q: (X) => `Combien de litres reçoit ${X} ?`,
  },
  {
    u: "€", en: "en €", v: [10, 50, 5], roles: troisNoms,
    sit: (t, r, R) => `Trois cyclistes d'une échappée, ${R[0]}, ${R[1]} et ${R[2]}, se partagent une prime de ${t} selon le ratio ${r}.`,
    q: (X) => `Combien reçoit ${X} ?`,
  },
];

const valeurPart = (v: readonly [number, number, number]) => randomStep(v[0], v[1], v[2]);

export const ratiosBank: TutorBankItemV4[] = [
  /* =========================================================================
     PROP_RAPPORT — exprimer un ratio, et le simplifier
  ========================================================================= */
  {
    kind: "template",
    id: "4e_prop_rapport_tpl_1_exprimer",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_ratio",
    microId: "prop_rapport",
    difficulty: 2,
    theme: "neutral",
    hint: "Simplifie les deux nombres par leur plus grand diviseur commun.",
    tags: ["ratio", "exprimer", "qcm", "template"],
    generate: () => {
      const d = randomChoice(DUOS);
      const [ra, rb] = baseAuHasard();
      const f = randomInt(2, 6) * randomChoice(d.pas);
      const X = ra * f;
      const Y = rb * f;
      const lab = `${d.a} : ${d.b}`;
      const correct = `${ra} : ${rb}`;
      const t = randomInt(0, 3);
      const text =
        t === 0
          ? `${situation(d, X, Y)} Quel est le ratio ${lab}, sous forme simplifiée ?`
          : t === 1
            ? `${situation(d, X, Y, true)} Quel est le ratio ${lab}, simplifié ?`
            : t === 2
              ? `${situation(d, X, Y)} Quelle est l'écriture la plus simple du ratio ${lab} ?`
              : `${d.cadre}, ${onCompte(d)} ${qte(d, "b", Y)} pour ${qte(d, "a", X)}. Parmi ces réponses, quel est le ratio ${lab} simplifié ?`;
      return {
        text,
        format: "qcm",
        choices: makeChoices(correct, [
          `${rb} : ${ra}`,
          `${X} : ${Y}`,
          `${ra} : ${rb + 1}`,
          `${ra + 1} : ${rb}`,
          `${ra} : ${ra + rb}`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : un ratio compare deux quantités par leur rapport, et il s'écrit avec deux points.\n\n" +
          "Méthode : on simplifie les deux nombres par leur plus grand diviseur commun, comme une fraction.\n\n" +
          `Calcul : ${X} et ${Y} se divisent tous deux par ${f}, donc ${X} : ${Y} = ${correct}.\n\n` +
          `Conclusion : ⚠️ l'ordre compte — ${rb} : ${ra} désignerait le ratio ${d.b} : ${d.a}.`,
        canvas: camembert([
          { label: d.a, value: X, color: "#2563eb" },
          { label: d.b, value: Y, color: "#f59e0b" },
        ]),
      };
    },
  },
  {
    kind: "template",
    id: "4e_prop_rapport_tpl_2_utiliser",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_ratio",
    microId: "prop_rapport",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche par combien la part connue a été multipliée.",
    tags: ["ratio", "utiliser", "template", "canvas"],
    generate: () => {
      const d = randomChoice(DUOS);
      const [ra, rb] = ratioSimple(1, 6, 2, 8);
      const f = randomInt(2, 9) * randomChoice(d.pas);
      const val = { a: ra * f, b: rb * f };
      const part = { a: ra, b: rb };
      const c: Cote = Math.random() < 0.5 ? "a" : "b";
      const o = autre(c);
      const r = `${ra} : ${rb}`;
      const lab = `${d.a} : ${d.b}`;
      const t = randomInt(0, 2);
      const text =
        t === 0
          ? `${d.cadre}, le ratio ${lab} est ${r}. ${cap(ilYa(d))} ${qte(d, c, val[c])}. ${combien(d, o)}`
          : t === 1
            ? `Le ratio ${lab} vaut ${r} ${cadreMin(d)}. Sachant qu'${ilYa(d)} ${qte(d, c, val[c])}, ${combien(d, o).charAt(0).toLowerCase()}${combien(d, o).slice(1)}`
            : `${d.cadre}, ${ilYa(d)} ${qte(d, c, val[c])}. On sait que le ratio ${lab} est ${r}. ${combien(d, o)}`;
      return {
        text,
        format: "short",
        expected: [String(val[o])],
        comparator: "number_equal",
        explanation:
          "Définition : dans un ratio, les deux parts se multiplient par le même nombre.\n\n" +
          "Méthode : on cherche ce multiplicateur à partir de la quantité connue.\n\n" +
          `Calcul : ${val[c]} ÷ ${part[c]} = ${f}, donc l'autre quantité vaut ${part[o]} × ${f} = ${val[o]}.\n\n` +
          `Conclusion : ${val[o]} ${uniteDe(d, o)}.`,
        canvas: tableauRatio({
          rowLabels: ["part du ratio", "quantité"],
          colLabels: [d.a, d.b],
          values: [
            [String(ra), String(rb)],
            c === "a" ? [String(val.a), ""] : ["", String(val.b)],
          ],
          missing: [{ row: 1, col: c === "a" ? 1 : 0 }],
        }),
      };
    },
  },
  {
    // ⭐ LE VERSEUR GRADUÉ EXISTAIT DÉJÀ, il n'y avait rien à écrire. `contenance`
    // en variante « comparaison » dessine deux récipients remplis à leur niveau,
    // et le CM1 s'en sert dans sa propre banque. C'est le dessin le plus concret
    // du chapitre : un ratio sirop : eau, ce sont deux hauteurs de liquide qu'on
    // voit, et le rapport se lit sans calcul.
    kind: "template",
    id: "4e_prop_rapport_tpl_4_melange",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_ratio",
    microId: "prop_rapport",
    difficulty: 3,
    theme: "neutral",
    hint: "Ramène-toi à une part, puis multiplie.",
    tags: ["ratio", "melange", "contenance", "template", "canvas"],
    generate: () => {
      const L = randomChoice(LIQUIDES);
      const [ra, rb] = ratioSimple(1, 3, 3, 5);
      const dose = randomChoice([20, 50, 100]) * randomInt(2, 4);
      const ml = { a: ra * dose, b: rb * dose };
      const part = { a: ra, b: rb };
      const c: Cote = Math.random() < 0.5 ? "a" : "b";
      const o = autre(c);
      const nom = { a: L.a, b: L.b };
      const deN = { a: L.deA, b: L.deB };
      const lab = { a: L.la, b: L.lb };
      const icon = { a: L.ia, b: L.ib };
      const r = `${ra} : ${rb}`;
      const t = randomInt(0, 2);
      const text =
        t === 0
          ? `${L.cadre}, le ratio ${L.a} : ${L.b} est ${r}. On verse ${ml[c]} mL ${deN[c]}. Combien faut-il ${deN[o]}, en mL ?`
          : t === 1
            ? `${L.cadre}, on respecte le ratio ${L.a} : ${L.b} = ${r}. Quel volume ${deN[o]} faut-il ajouter à ${ml[c]} mL ${deN[c]}, en mL ?`
            : `On a versé ${ml[c]} mL ${deN[c]}. ${L.cadre}, le ratio ${L.a} : ${L.b} doit être ${r}. Combien de mL ${deN[o]} faut-il ?`;
      return {
        text,
        format: "short",
        expected: [String(ml[o])],
        comparator: "number_equal",
        explanation:
          "Définition : dans un ratio, les deux quantités se multiplient par le même nombre.\n\n" +
          `Méthode : on ramène d'abord à UNE part, puis on multiplie par la part ${deN[o]}.\n\n` +
          `Calcul : une part vaut ${ml[c]} ÷ ${part[c]} = ${dose} mL. Il faut ${part[o]} parts ${deN[o]}, soit ${part[o]} × ${dose} = ${ml[o]} mL.\n\n` +
          `Conclusion : ⚠️ le mélange fera ${ml.a + ml.b} mL en tout — le ratio ne dit PAS le volume final, seulement le rapport ${nom.a} : ${nom.b}.`,
        canvas: {
          kind: "contenance",
          variant: "comparaison",
          gauche: {
            label: lab[c],
            icon: icon[c],
            contenance: `${ml[c]} mL`,
            millilitres: ml[c],
          },
          // ⛔ PAS de `millilitres` ICI, ET C'EST VOLONTAIRE. Le canvas remplit
          // le récipient à la hauteur du volume : dessiner le second liquide à
          // son niveau donnerait la réponse à lire. Le récipient reste donc
          // vide, avec son « ? » — ce qui est exactement la question posée.
          droite: {
            label: lab[o],
            icon: icon[o],
            contenance: "?",
          },
          questionLabel: `ratio ${L.a} : ${L.b} = ${r}`,
          display: {
            showContenances: true,
            showLabels: true,
            showComparison: false,
          },
          size: { width: 300, height: 200 },
        },
      };
    },
  },
  {
    kind: "template",
    id: "4e_prop_rapport_tpl_3_egaux",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_ratio",
    microId: "prop_rapport",
    difficulty: 2,
    theme: "neutral",
    hint: "Deux ratios sont égaux s'ils se simplifient en le même.",
    tags: ["ratio", "egalite", "qcm", "template"],
    generate: () => {
      const [ra, rb] = baseAuHasard();
      const k = randomInt(2, 5);
      const r = `${ra} : ${rb}`;
      const correct = `${ra * k} : ${rb * k}`;
      const d = randomChoice(DUOS);
      const lab = `${d.a} : ${d.b}`;
      // ⚠️ Les tournures SANS contexte n'ont qu'un squelette chacune : on les
      // tire rarement (2 fois sur 10), sinon elles reviennent dans la série.
      const t = randomInt(0, 9);
      const text =
        t === 0
          ? `Quel ratio est égal à ${r} ?`
          : t === 1
            ? `Parmi ces ratios, lequel est égal à ${r} ?`
            : t <= 3
              ? `${d.cadre}, le ratio ${lab} est ${r}. Quel ratio exprime la même proportion ?`
              : t <= 5
                ? `${d.cadre}, on respecte le ratio ${lab} = ${r}, mais avec de plus grandes quantités. Lequel de ces ratios convient encore ?`
                : t <= 7
                  ? `${d.cadre}, le ratio ${lab} vaut ${r}. Quelle autre écriture de ce ratio est juste ?`
                  : `${d.cadre}, on double, triple… toutes les quantités sans changer le ratio ${lab}, qui est ${r}. Lequel de ces ratios peut-on obtenir ?`;
      return {
        text,
        format: "qcm",
        choices: makeChoices(correct, [
          `${ra * k} : ${rb * k + 1}`,
          `${ra + k} : ${rb + k}`,
          `${rb * k} : ${ra * k}`,
          `${ra * k + 1} : ${rb * k}`,
          `${ra} : ${rb * k}`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : deux ratios sont égaux quand ils se simplifient en le même ratio.\n\n" +
          "Méthode : on multiplie LES DEUX parts par le même nombre — comme pour une fraction.\n\n" +
          `Calcul : ${ra} × ${k} = ${ra * k} et ${rb} × ${k} = ${rb * k}.\n\n` +
          `Conclusion : ⚠️ AJOUTER ${k} aux deux parts ne marche pas : ${ra + k} : ${rb + k} n'est pas égal à ${r}.`,
      };
    },
  },
  {
    // ⭐ VALEUR PARTICULIÈRE — donc figée. Le ratio 1 : 1 n'est pas reconnu
    // comme un ratio par les élèves : ils y voient « pas de ratio ».
    kind: "fixed",
    id: "4e_prop_rapport_fixed_un_pour_un",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_ratio",
    microId: "prop_rapport",
    difficulty: 1,
    theme: "neutral",
    text: "Dans un mélange, il y a autant de sirop que d'eau. Quel est le ratio sirop : eau ?",
    format: "qcm",
    choices: ["1 : 1", "0 : 0", "2 : 1", "il n'y a pas de ratio"],
    expected: ["1 : 1"],
    comparator: "mcq_exact",
    hint: "« Autant que » se dit aussi avec un ratio.",
    explanation:
      "Définition : un ratio compare deux quantités, y compris quand elles sont égales.\n\n" +
      "Méthode : autant de l'un que de l'autre, c'est une part contre une part.\n\n" +
      "Calcul : ratio 1 : 1.\n\n" +
      "Conclusion : le ratio 1 : 1 existe bel et bien — c'est le partage en parts égales.",
    tags: ["ratio", "valeur_particuliere", "qcm"],
  },

  /* =========================================================================
     PROP_RATIO_QUOTIENTS — ⭐ le saut de la 4e : le ratio devient calculable
  ========================================================================= */
  {
    // ⭐ VALEUR PARTICULIÈRE : la définition du BO, mot pour mot.
    kind: "fixed",
    id: "4e_prop_ratio_quotients_fixed_definition",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_ratio",
    microId: "prop_ratio_quotients",
    difficulty: 2,
    theme: "neutral",
    text: "Deux nombres a et b sont dans le ratio 2 : 3. Quelle égalité traduit cela ?",
    format: "qcm",
    choices: ["a/2 = b/3", "a/3 = b/2", "a × 2 = b × 3", "a + 2 = b + 3"],
    expected: ["a/2 = b/3"],
    comparator: "mcq_exact",
    hint: "Chaque nombre se divise par SA part.",
    explanation:
      "Définition : a et b sont dans le ratio 2 : 3 lorsque a/2 = b/3. Chaque nombre est divisé par la part qui lui correspond.\n\n" +
      "Méthode : on garde l'ordre — a va avec 2, b va avec 3.\n\n" +
      "Calcul : si a = 10, alors a/2 = 5, donc b/3 = 5 et b = 15.\n\n" +
      "Conclusion : cette égalité est ce qui rend le ratio calculable. ⚠️ a × 2 = b × 3 croise les parts et donne un autre ratio.",
    tags: ["ratio", "quotients", "valeur_particuliere", "qcm"],
  },
  {
    kind: "template",
    id: "4e_prop_ratio_quotients_tpl_1_trouver",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_ratio",
    microId: "prop_ratio_quotients",
    difficulty: 3,
    theme: "neutral",
    hint: "Calcule d'abord la valeur commune des deux quotients.",
    tags: ["ratio", "quotients", "template"],
    generate: () => {
      const [L1, L2] = randomChoice(LETTRES2);
      const [ra, rb] = ratioSimple(2, 7, 2, 9);
      const t = randomInt(0, 3);
      const d = randomChoice(DUOS);
      const q = randomInt(3, 12) * (t === 3 ? randomChoice(d.pas) : 1);
      const premier = Math.random() < 0.5;
      const K = premier ? L1 : L2;
      const U = premier ? L2 : L1;
      const pK = premier ? ra : rb;
      const pU = premier ? rb : ra;
      const vK = pK * q;
      const vU = pU * q;
      const text =
        t === 0
          ? `Deux nombres ${L1} et ${L2} sont dans le ratio ${ra} : ${rb}, et ${K} = ${vK}. Combien vaut ${U} ?`
          : t === 1
            ? `On sait que ${L1}/${ra} = ${L2}/${rb} et que ${K} = ${vK}. Calcule ${U}.`
            : t === 2
              ? `Les nombres ${L1} et ${L2} vérifient ${L1}/${ra} = ${L2}/${rb}. Si ${K} = ${vK}, que vaut ${U} ?`
              : `${d.cadre}, on note ${L1} ${grandeur(d, "a")} et ${L2} ${grandeur(d, "b")}. On sait que ${L1}/${ra} = ${L2}/${rb} et que ${K} = ${vK}. Combien vaut ${U} ?`;
      return {
        text,
        format: "short",
        expected: [String(vU)],
        comparator: "number_equal",
        explanation:
          `Définition : ${L1} et ${L2} dans le ratio ${ra} : ${rb} signifie ${L1}/${ra} = ${L2}/${rb}.\n\n` +
          "Méthode : on calcule la valeur commune des deux quotients, puis on remonte.\n\n" +
          `Calcul : ${K}/${pK} = ${vK}/${pK} = ${q}. Donc ${U}/${pU} = ${q}, et ${U} = ${pU} × ${q} = ${vU}.\n\n` +
          `Conclusion : ${U} = ${vU}.`,
      };
    },
  },
  {
    kind: "template",
    id: "4e_prop_ratio_quotients_tpl_2_reconnaitre",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_ratio",
    microId: "prop_ratio_quotients",
    difficulty: 3,
    theme: "neutral",
    hint: "Le dénominateur de chaque quotient donne sa part.",
    tags: ["ratio", "quotients", "qcm", "template"],
    generate: () => {
      const [L1, L2] = randomChoice(LETTRES2);
      const [a, b] = ratioSimple(2, 8, 2, 9);
      const correct = `${a} : ${b}`;
      const d = randomChoice(DUOS);
      const t = randomInt(0, 3);
      const text =
        t === 0
          ? `On sait que ${L1}/${a} = ${L2}/${b}. Dans quel ratio sont ${L1} et ${L2} ?`
          : t === 1
            ? `Deux nombres ${L1} et ${L2} vérifient ${L2}/${b} = ${L1}/${a}. Quel est le ratio ${L1} : ${L2} ?`
            : t === 2
              ? `L'égalité ${L1}/${a} = ${L2}/${b} est vraie. Quel ratio ${L1} : ${L2} traduit-elle ?`
              : `${d.cadre}, on note ${L1} ${grandeur(d, "a")} et ${L2} ${grandeur(d, "b")}. On a ${L1}/${a} = ${L2}/${b}. Quel est le ratio ${d.a} : ${d.b} ?`;
      return {
        text,
        format: "qcm",
        choices: makeChoices(correct, [
          `${b} : ${a}`,
          `${a} : ${b + 1}`,
          `${a + b} : ${b}`,
          `${a} : ${a + b}`,
          `${b} : ${a + b}`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : dans l'égalité de quotients, chaque dénominateur EST la part du nombre écrit au-dessus.\n\n" +
          `Méthode : ${L1} est divisé par ${a}, ${L2} est divisé par ${b}.\n\n` +
          `Calcul : ${L1} et ${L2} sont donc dans le ratio ${correct}.\n\n` +
          "Conclusion : ⚠️ l'ordre suit celui des nombres, pas celui dans lequel les quotients sont écrits.",
      };
    },
  },
  {
    // ⭐ LE LIEN RATIO / FRACTION DU TOTAL. Dans le ratio 2 : 3, la première
    // quantité fait 2/5 du tout, PAS 2/3 : c'est l'erreur que ce gabarit vise.
    kind: "template",
    id: "4e_prop_ratio_quotients_tpl_3_fraction_du_total",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_ratio",
    microId: "prop_ratio_quotients",
    difficulty: 3,
    theme: "neutral",
    hint: "Additionne les parts du ratio : c'est le dénominateur.",
    tags: ["ratio", "fraction", "quotients", "qcm", "template", "canvas"],
    generate: () => {
      const [ra, rb] = baseAuHasard();
      const s = ra + rb;
      const d = randomChoice(DUOS);
      const c: Cote = Math.random() < 0.5 ? "a" : "b";
      const pX = c === "a" ? ra : rb;
      const pO = c === "a" ? rb : ra;
      const correct = `${pX}/${s}`;
      const leX = leDe(d, c);
      const [L1, L2] = randomChoice(LETTRES2);
      const LX = c === "a" ? L1 : L2;
      const t = randomInt(0, 2);
      const text =
        t === 0
          ? `${d.cadre}, le ratio ${d.a} : ${d.b} est ${ra} : ${rb}. Quelle fraction du total ${accordRepresente(leX)} ${leX} ?`
          : t === 1
            ? `${d.cadre}, le ratio ${d.a} : ${d.b} vaut ${ra} : ${rb}. Quelle part du total, écrite en fraction, revient ${a_(leX)} ?`
            : `Deux nombres ${L1} et ${L2} sont dans le ratio ${ra} : ${rb}. Quelle fraction de ${L1} + ${L2} représente ${LX} ?`;
      return {
        text,
        format: "qcm",
        choices: makeChoices(correct, [
          `${pX}/${pO}`,
          `${pO}/${s}`,
          `${pO}/${pX}`,
          `1/${s}`,
          `${pX}/${s + 1}`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : dans un ratio, chaque nombre compte des parts égales ; le total en compte la SOMME.\n\n" +
          "Méthode : on additionne les parts, puis on met la part cherchée sur ce total.\n\n" +
          `Calcul : ${ra} + ${rb} = ${s} parts en tout, dont ${pX} : la fraction est ${correct}.\n\n` +
          `Conclusion : ⚠️ ${pX}/${pO} compare à l'AUTRE quantité, pas au total.`,
        canvas: camembert([
          { label: t === 2 ? L1 : d.a, value: ra, color: "#2563eb" },
          { label: t === 2 ? L2 : d.b, value: rb, color: "#f59e0b" },
        ]),
      };
    },
  },

  /* =========================================================================
     PROP_RATIO_TROIS — le ratio à trois termes, absent de toute la 5e
  ========================================================================= */
  {
    kind: "template",
    id: "4e_prop_ratio_trois_tpl_1_calculer",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_ratio",
    microId: "prop_ratio_trois",
    difficulty: 4,
    theme: "neutral",
    hint: "Les trois quotients valent la même chose.",
    tags: ["ratio", "trois_termes", "template", "canvas"],
    generate: () => {
      const T = randomChoice(TRIOS);
      const p = randomChoice(TRIPLETS);
      const t = randomInt(0, 3);
      const q = randomInt(2, 9) * (t === 3 ? 1 : randomChoice(T.pas));
      const i = randomInt(0, 2);
      const j = (i + randomInt(1, 2)) % 3;
      const k = 3 - i - j;
      const v = [p[0] * q, p[1] * q, p[2] * q];
      const r = `${p[0]} : ${p[1]} : ${p[2]}`;
      const L = randomChoice(LETTRES3);
      const noms = ratioNoms3(T);
      const text =
        t === 0
          ? `${T.cadre}, le ratio ${noms} est ${r}. ${cap(ilYa(T))} ${qte3(T, i, v[i])}. ${combien3(T, j)}`
          : t === 1
            ? `${T.cadre}, on respecte le ratio ${noms} = ${r}. Sachant qu'${ilYa(T)} ${qte3(T, i, v[i])}, ${combien3(T, j).charAt(0).toLowerCase()}${combien3(T, j).slice(1)}`
            : t === 2
              ? `${T.cadre}, ${ilYa(T)} ${qte3(T, i, v[i])}. On sait que le ratio ${noms} est ${r}. ${combien3(T, j)}`
              : `Trois nombres ${L[0]}, ${L[1]} et ${L[2]} sont dans le ratio ${r}, et ${L[i]} = ${v[i]}. Combien vaut ${L[j]} ?`;
      const nomsX = t === 3 ? [L[0], L[1], L[2]] : [T.noms[0], T.noms[1], T.noms[2]];
      return {
        text,
        format: "short",
        expected: [String(v[j])],
        comparator: "number_equal",
        explanation:
          `Définition : un ratio ${r} entre trois quantités signifie que leurs trois quotients par ${p[0]}, ${p[1]} et ${p[2]} sont ÉGAUX.\n\n` +
          "Méthode : on calcule la valeur commune avec la quantité connue, puis on remonte à celle qu'on cherche.\n\n" +
          `Calcul : ${v[i]} ÷ ${p[i]} = ${q}. Donc la quantité cherchée vaut ${p[j]} × ${q} = ${v[j]}.\n\n` +
          `Conclusion : ${v[j]}. On n'a pas eu besoin de la troisième quantité (${nomsX[k]}).`,
        canvas: barre({
          total: "?",
          parts: [0, 1, 2].map((n) => ({
            label: t === 3 ? L[n] : T.etiq[n],
            ...(n === i ? { value: String(v[i]) } : { unknown: true }),
          })),
          question: `ratio ${r}`,
        }),
      };
    },
  },
  {
    kind: "template",
    id: "4e_prop_ratio_trois_tpl_2_egalite",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_ratio",
    microId: "prop_ratio_trois",
    difficulty: 3,
    theme: "neutral",
    hint: "Chaque lettre se divise par SA part, dans l'ordre.",
    tags: ["ratio", "trois_termes", "qcm", "template"],
    generate: () => {
      const p = randomChoice([
        [2, 3, 7],
        [1, 4, 5],
        [3, 5, 6],
        [2, 4, 9],
        [1, 2, 3],
        [3, 2, 5],
        [4, 1, 6],
        [5, 3, 2],
      ]);
      const [A, B, C] = randomChoice(LETTRES3);
      const T = randomChoice(TRIOS);
      const r = `${p[0]} : ${p[1]} : ${p[2]}`;
      const correct = `${A}/${p[0]} = ${B}/${p[1]} = ${C}/${p[2]}`;
      const t = randomInt(0, 3);
      const text =
        t === 0
          ? `Les nombres ${A}, ${B} et ${C} sont dans le ratio ${r}. Quelle égalité traduit cela ?`
          : t === 1
            ? `Trois nombres ${A}, ${B} et ${C} sont dans le ratio ${r}. Quelle égalité de quotients est juste ?`
            : t === 2
              ? `${T.cadre}, on note ${A} ${grandeur3(T, 0)}, ${B} ${grandeur3(T, 1)} et ${C} ${grandeur3(T, 2)}. Le ratio ${ratioNoms3(T)} est ${r}. Quelle égalité est vraie ?`
              : `${T.cadre}, le ratio ${ratioNoms3(T)} est ${r}. En notant ${A}, ${B} et ${C} ces trois quantités, dans cet ordre, quelle égalité traduit ce ratio ?`;
      return {
        text,
        format: "qcm",
        choices: makeChoices(correct, [
          `${A}/${p[2]} = ${B}/${p[1]} = ${C}/${p[0]}`,
          `${A} × ${p[0]} = ${B} × ${p[1]} = ${C} × ${p[2]}`,
          `${A} + ${p[0]} = ${B} + ${p[1]} = ${C} + ${p[2]}`,
          `${A}/${p[1]} = ${B}/${p[0]} = ${C}/${p[2]}`,
          `${p[0]}/${A} = ${p[1]}/${B} = ${p[2]}/${C}`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : un ratio à trois termes se lit exactement comme celui à deux, une part par nombre.\n\n" +
          "Méthode : chaque lettre passe au-dessus, sa part au-dessous, dans l'ordre où elles sont écrites.\n\n" +
          `Calcul : ${A} va avec ${p[0]}, ${B} avec ${p[1]}, ${C} avec ${p[2]}.\n\n` +
          "Conclusion : les trois quotients sont égaux entre eux — c'est ce qui permet de tout calculer à partir d'un seul nombre connu.",
      };
    },
  },

  /* =========================================================================
     PROP_RATIO_PARTAGER — la compétence du BO, et le canvas qui la montre
  ========================================================================= */
  {
    kind: "template",
    id: "4e_prop_ratio_partager_tpl_1_deux_parts",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_ratio",
    microId: "prop_ratio_partager",
    difficulty: 4,
    theme: "neutral",
    hint: "Commence par compter le nombre total de parts.",
    tags: ["ratio", "partage", "template", "canvas"],
    generate: () => {
      const P = randomChoice(PARTAGES2);
      const [a, b] = ratioSimple(2, 5, 3, 7);
      const v = valeurPart(P.v);
      const total = (a + b) * v;
      const [A, B] = P.roles();
      const r = `${a} : ${b}`;
      const premier = Math.random() < 0.5;
      const X = premier ? A : B;
      const n = premier ? a : b;
      const rep = n * v;
      const et = P.etiq ?? [A, B];
      return {
        text: `${P.sit(`${total} ${P.u}`, r, A, B)} ${P.q(X)}`,
        format: "short",
        expected: [String(rep)],
        comparator: "number_equal",
        explanation:
          "Définition : partager selon un ratio, c'est découper la quantité en parts toutes égales, puis en donner un certain nombre à chacun.\n\n" +
          "Méthode : on compte d'abord le nombre TOTAL de parts, puis on calcule ce que vaut une part.\n\n" +
          `Calcul : ${a} + ${b} = ${a + b} parts. Une part vaut ${total} ÷ ${a + b} = ${v} ${P.u}. Pour ${X}, ${n} parts, soit ${n} × ${v} = ${rep} ${P.u}.\n\n` +
          `Conclusion : ${rep} ${P.u}. Contrôle : ${a * v} + ${b * v} = ${total} ${P.u}.`,
        canvas: barre({
          total: `${total} ${P.u}`,
          parts: [
            { label: et[0], unknown: true },
            { label: et[1], unknown: true },
          ],
          question: `${a} parts contre ${b} parts`,
        }),
      };
    },
  },
  {
    kind: "template",
    id: "4e_prop_ratio_partager_tpl_2_trois_parts",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_ratio",
    microId: "prop_ratio_partager",
    difficulty: 5,
    theme: "neutral",
    hint: "Somme des trois parts, puis valeur d'une part.",
    tags: ["ratio", "partage", "trois_termes", "template", "canvas"],
    generate: () => {
      const P = randomChoice(PARTAGES3);
      const p = randomChoice([
        [2, 3, 7],
        [1, 2, 3],
        [2, 3, 5],
        [3, 4, 5],
        [1, 3, 4],
        [4, 2, 3],
        [5, 3, 1],
      ]);
      const somme = p[0] + p[1] + p[2];
      const v = valeurPart(P.v);
      const total = somme * v;
      const R = P.roles();
      const i = randomInt(0, 2);
      const rep = p[i] * v;
      const r = `${p[0]} : ${p[1]} : ${p[2]}`;
      const et = P.etiq ?? R;
      return {
        text: `${P.sit(`${total} ${P.u}`, r, R)} ${P.q(R[i])}`,
        format: "short",
        expected: [String(rep)],
        comparator: "number_equal",
        explanation:
          "Définition : chaque nombre du ratio dit combien de parts revient à chacun.\n\n" +
          "Méthode : on additionne les trois nombres pour connaître le nombre total de parts.\n\n" +
          `Calcul : ${p[0]} + ${p[1]} + ${p[2]} = ${somme} parts. Une part vaut ${total} ÷ ${somme} = ${v} ${P.u}. Pour ${R[i]}, ${p[i]} parts, soit ${p[i]} × ${v} = ${rep} ${P.u}.\n\n` +
          `Conclusion : ${rep} ${P.u}. ⚠️ L'erreur classique est de diviser par 3 — il y a ${somme} parts, pas 3.`,
        canvas: barre({
          total: `${total} ${P.u}`,
          parts: [0, 1, 2].map((n) => ({ label: et[n], unknown: true })),
          question: `ratio ${r} : ${somme} parts`,
        }),
      };
    },
  },
  {
    kind: "template",
    id: "4e_prop_ratio_partager_tpl_3_remonter",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_ratio",
    microId: "prop_ratio_partager",
    difficulty: 5,
    theme: "neutral",
    hint: "La part connue permet de trouver ce que vaut UNE part.",
    tags: ["ratio", "partage", "inverse", "qcm", "template"],
    generate: () => {
      const P = randomChoice(PARTAGES2);
      const [a, b] = ratioSimple(2, 5, 3, 8);
      const v = valeurPart(P.v);
      const [A, B] = P.roles();
      const premier = Math.random() < 0.5;
      const X = premier ? A : B;
      const n = premier ? a : b;
      const m = premier ? b : a;
      const partX = n * v;
      const total = (a + b) * v;
      const u = P.u;
      const r = `${a} : ${b}`;
      const connu = P.connu(X, `${partX} ${u}`);
      const t = randomInt(0, 1);
      const text =
        t === 0
          ? `${P.sitSans(r, A, B)} ${cap(connu)} ${P.qTotal}`
          : `${P.sitSans(r, A, B)} On sait que ${connu} ${P.qTotal}`;
      return {
        text,
        format: "qcm",
        choices: makeChoices(`${total} ${u}`, [
          `${partX * (a + b)} ${u}`,
          `${m * v} ${u}`,
          `${partX + m} ${u}`,
          `${partX * 2} ${u}`,
          `${total + v} ${u}`,
          `${(a + b) * n} ${u}`,
        ]),
        expected: [`${total} ${u}`],
        comparator: "mcq_exact",
        explanation:
          `Définition : la part connue compte ${n} parts égales sur ${a + b}.\n\n` +
          "Méthode : on redescend à UNE part, puis on remonte au total.\n\n" +
          `Calcul : une part vaut ${partX} ÷ ${n} = ${v} ${u}. Le total compte ${a} + ${b} = ${a + b} parts, soit ${a + b} × ${v} = ${total} ${u}.\n\n` +
          `Conclusion : le total était ${total} ${u}.`,
      };
    },
  },

  /* =========================================================================
     PROP_RATIO_DEFI — ratios ET pourcentages, comme le veut la notion
  ========================================================================= */
  {
    kind: "template",
    id: "4e_prop_ratio_defi_tpl_1_recette",
    niveau: "4e",
    matiere: "maths",
    // Un pont ratio → pourcentage : il va au défi des POURCENTAGES (02/10), où
    // l'élève a déjà vu les ratios. Son `id` ne change pas.
    notionId: "prop_pourcentages",
    microId: "prop_pourcentage_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Compte le total des parts, puis ramène la part cherchée à 100.",
    tags: ["ratio", "pourcentage", "defi", "template"],
    generate: () => {
      // ⚠️ Des couples dont la SOMME divise 100 : le pourcentage tombe juste.
      const [ra, rb] = randomChoice([
        [1, 3], [3, 1], [1, 4], [4, 1], [2, 3], [3, 2], [1, 9], [3, 7],
        [7, 3], [9, 11], [7, 13], [3, 17], [1, 19], [11, 14], [6, 19],
      ] as const);
      const somme = ra + rb;
      const d = randomChoice(DUOS);
      const c: Cote = Math.random() < 0.5 ? "a" : "b";
      const pX = c === "a" ? ra : rb;
      const pO = c === "a" ? rb : ra;
      const pct = (pX * 100) / somme;
      const leX = leDe(d, c);
      const lab = `${d.a} : ${d.b}`;
      const t = randomInt(0, 2);
      const text =
        t === 0
          ? `${d.cadre}, le ratio ${lab} est ${ra} : ${rb}. Quel pourcentage du total ${accordRepresente(leX)} ${leX} ?`
          : t === 1
            ? `${d.cadre}, on a ${lab} = ${ra} : ${rb}. Quelle part du total, en pourcentage, revient ${a_(leX)} ?`
            : `Le ratio ${lab} vaut ${ra} : ${rb} ${cadreMin(d)}. Exprime en pourcentage la part ${deDe(d, c)} dans le total.`;
      return {
        text,
        format: "short",
        expected: [String(pct), `${pct} %`, `${pct}%`],
        comparator: "number_equal",
        explanation:
          "Définition : un pourcentage est une part rapportée à 100.\n\n" +
          "Méthode : on compte le total des parts, puis on rapporte la part cherchée à ce total.\n\n" +
          `Calcul : ${ra} + ${rb} = ${somme} parts. ${cap(leX)} en ${leX.startsWith("les ") ? "occupent" : "occupe"} ${pX}, soit ${pX}/${somme} = ${pct}/100 = ${pct} %.\n\n` +
          `Conclusion : ⚠️ le piège est de rapporter à l'AUTRE quantité (${pX}/${pO}) au lieu du total.`,
        // ⭐ Le camembert dit tout : le secteur cherché est visiblement une part
        // DU DISQUE ENTIER, pas une part du secteur voisin.
        canvas: camembert([
          { label: d.a, value: ra, color: "#64748b" },
          { label: d.b, value: rb, color: "#f59e0b" },
        ]),
      };
    },
  },
  {
    kind: "template",
    id: "4e_prop_ratio_defi_tpl_2_reunion",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_ratio",
    microId: "prop_ratio_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Compte le nombre total de parts avant de partager.",
    tags: ["ratio", "partage", "defi", "reunion", "template", "canvas"],
    generate: () => {
      const P = randomChoice(PARTAGES3);
      const p = randomChoice([
        [2, 3, 5],
        [1, 2, 4],
        [3, 4, 5],
        [2, 3, 7],
        [1, 3, 4],
        [2, 5, 6],
        [5, 2, 3],
      ]);
      const somme = p[0] + p[1] + p[2];
      const v = valeurPart(P.v);
      const total = somme * v;
      const R = P.roles();
      let i = randomInt(0, 2);
      let j = (i + randomInt(1, 2)) % 3;
      if (p[i] < p[j]) [i, j] = [j, i];
      const vi = p[i] * v;
      const vj = p[j] * v;
      const r = `${p[0]} : ${p[1]} : ${p[2]}`;
      const diff = Math.random() < 0.5;
      const rep = diff ? vi - vj : vi + vj;
      const et = P.etiq ?? R;
      return {
        text: diff
          ? `${P.sit(`${total} ${P.u}`, r, R)} Quelle est la différence entre la part ${de(R[i])} et celle ${de(R[j])}, ${P.en} ?`
          : `${P.sit(`${total} ${P.u}`, r, R)} Que valent ensemble la part ${de(R[i])} et celle ${de(R[j])}, ${P.en} ?`,
        format: "short",
        expected: [String(rep)],
        comparator: "number_equal",
        explanation:
          "Définition : partager selon un ratio, c'est faire des parts toutes égales et en distribuer un nombre donné.\n\n" +
          "Méthode : total des parts, puis valeur d'une part, puis les deux parts utiles.\n\n" +
          `Calcul : ${p[0]} + ${p[1]} + ${p[2]} = ${somme} parts. Une part vaut ${total} ÷ ${somme} = ${v} ${P.u}. Part ${de(R[i])} : ${p[i]} × ${v} = ${vi} ; part ${de(R[j])} : ${p[j]} × ${v} = ${vj}. ${diff ? `Différence : ${vi} − ${vj} = ${rep}` : `Ensemble : ${vi} + ${vj} = ${rep}`}.\n\n` +
          `Conclusion : ${rep} ${P.u}. ${diff ? `Plus court : ${p[i]} − ${p[j]} = ${p[i] - p[j]} parts, soit ${p[i] - p[j]} × ${v} = ${rep}.` : `Plus court : ${p[i]} + ${p[j]} = ${p[i] + p[j]} parts, soit ${p[i] + p[j]} × ${v} = ${rep}.`}`,
        canvas: barre({
          total: `${total} ${P.u}`,
          parts: [0, 1, 2].map((n) => ({ label: et[n], unknown: true })),
          question: `ratio ${r}`,
        }),
      };
    },
  },
  {
    kind: "template",
    id: "4e_prop_ratio_defi_tpl_3_evolution",
    niveau: "4e",
    matiere: "maths",
    // Une évolution en pourcentage appliquée à un ratio : défi des POURCENTAGES.
    notionId: "prop_pourcentages",
    microId: "prop_pourcentage_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Applique l'évolution, puis simplifie le nouveau ratio.",
    tags: ["ratio", "pourcentage", "evolution", "defi", "qcm", "template"],
    generate: () => {
      const d = randomChoice(DUOS);
      const pas = randomChoice(d.pas);
      const c: Cote = Math.random() < 0.5 ? "a" : "b";
      const hausse = Math.random() < 0.6;
      const pctEv = hausse ? randomChoice([10, 20, 50, 100]) : randomChoice([10, 20, 50]);
      // La quantité qui change est un multiple de 10 : l'évolution tombe juste.
      const change = randomChoice([10, 20, 30, 40, 50, 60]) * pas;
      const fixe = randomChoice([15, 25, 35, 45, 12, 18]) * pas;
      const avant = { a: c === "a" ? change : fixe, b: c === "a" ? fixe : change };
      const coef = hausse ? 1 + pctEv / 100 : 1 - pctEv / 100;
      const nouv = Math.round(change * coef);
      const apres = { a: c === "a" ? nouv : fixe, b: c === "a" ? fixe : nouv };
      const g = pgcd(apres.a, apres.b);
      const correct = `${apres.a / g} : ${apres.b / g}`;
      const g0 = pgcd(avant.a, avant.b);
      const lab = `${d.a} : ${d.b}`;
      const evol = estCompte(d)
        ? `Le nombre ${deDe(d, c)} ${hausse ? "augmente" : "diminue"} de ${pctEv} %.`
        : `On ${hausse ? "augmente" : "diminue"} la quantité ${deDe(d, c)} de ${pctEv} %.`;
      const t = randomInt(0, 1);
      const text =
        t === 0
          ? `${situation(d, avant.a, avant.b)} ${evol} Quel est le nouveau ratio ${lab}, simplifié ?`
          : `${situation(d, avant.a, avant.b)} ${evol} Parmi ces réponses, quel est le ratio ${lab} après ce changement, sous forme simplifiée ?`;
      return {
        text,
        format: "qcm",
        choices: makeChoices(correct, [
          `${avant.a / g0} : ${avant.b / g0}`,
          `${apres.b / g} : ${apres.a / g}`,
          `${apres.a} : ${apres.b}`,
          `${apres.a / g} : ${apres.b / g + 1}`,
          `${apres.a / g + 1} : ${apres.b / g}`,
          `${pctEv} : 100`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          `Définition : ${hausse ? "augmenter" : "diminuer"} de ${pctEv} %, c'est multiplier par ${dec(coef)}.\n\n` +
          "Méthode : on applique l'évolution à la seule quantité concernée, puis on simplifie le ratio obtenu.\n\n" +
          `Calcul : ${change} × ${dec(coef)} = ${nouv}. Le ratio ${lab} devient ${apres.a} : ${apres.b}` +
          (g === 1
            ? ", déjà sous forme simplifiée.\n\n"
            : ` ; en divisant les deux nombres par ${g}, on obtient ${correct}.\n\n`) +
          "Conclusion : ⚠️ l'autre quantité n'a pas bougé — l'évolution ne porte que sur une part, et c'est ce qui change le ratio.",
      };
    },
  },

  /* =========================================================================
     PROP_RATIO_DEFI — 02/10/2026 : le défi des RATIOS SEULS, depuis que la
     notion est coupée. Trois raisonnements qui ne se font pas en un geste :
     retrouver les parts à partir d'un ÉCART, enchaîner deux ratios en un ratio
     à trois termes, et AJOUTER une quantité pour atteindre un nouveau ratio.
  ========================================================================= */
  {
    kind: "template",
    id: "4e_prop_ratio_defi_tpl_4_ecart",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_ratio",
    microId: "prop_ratio_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "L'écart correspond à la différence des deux nombres du ratio : c'est un nombre de parts.",
    tags: ["ratio", "defi", "template"],
    generate: () => {
      const d = randomChoice(DUOS);
      const pas = randomChoice(d.pas);
      const [p, q] = ratioSimple(1, 7, 2, 9);
      const v = randomInt(2, 8) * pas;
      const A = p * v;
      const B = q * v;
      const plus: Cote = B > A ? "b" : "a";
      const moins = autre(plus);
      const ecartParts = Math.abs(q - p);
      const ecart = ecartParts * v;
      const lab = `${d.a} : ${d.b}`;
      const ratio = `${d.cadre}, le ratio ${lab} est ${p} : ${q}.`;
      const dit = estCompte(d)
        ? `Il y a ${ecart} ${nomDe(d, plus)} de plus que ${deDe(d, moins)}.`
        : `On utilise ${ecart} ${d.unite} ${deDe(d, plus)} de plus que ${deDe(d, moins)}.`;
      const cible = randomInt(0, 2);
      const question =
        cible === 0
          ? estCompte(d)
            ? `Combien y a-t-il ${d.deA} et ${d.deB} en tout ?`
            : `Quelle quantité totale obtient-on, en ${d.unite} ?`
          : combien(d, cible === 1 ? "a" : "b");
      const rep = cible === 0 ? A + B : cible === 1 ? A : B;
      const ordre = Math.random() < 0.5;
      const text = ordre ? `${ratio} ${dit} ${question}` : `${dit.replace(/\.$/, "")}, et le ratio ${lab} est ${p} : ${q} ${cadreMin(d)}. ${question}`;
      return {
        text,
        format: "short",
        expected: [String(rep)],
        comparator: "number_equal",
        explanation:
          "Définition : un ratio p : q découpe les quantités en parts toutes égales.\n\n" +
          "Méthode : l'écart entre les deux quantités vaut l'écart entre les deux nombres du ratio, en parts. On en déduit la valeur d'une part.\n\n" +
          `Calcul : ${Math.max(p, q)} − ${Math.min(p, q)} = ${ecartParts} part${ecartParts > 1 ? "s" : ""} valent ${ecart}, donc une part vaut ${ecart} ÷ ${ecartParts} = ${v}. ` +
          `${cap(leDe(d, "a"))} : ${p} × ${v} = ${A} ; ${leDe(d, "b")} : ${q} × ${v} = ${B}.` +
          (cible === 0 ? ` En tout : ${A} + ${B} = ${A + B}.` : "") +
          `\n\nConclusion : la réponse est ${rep}. ⚠️ L'écart n'est PAS une des deux quantités : c'est ${ecartParts} part${ecartParts > 1 ? "s" : ""}.`,
        canvas: barre({
          parts: [
            { label: `${d.a} (${p})`, unknown: true },
            { label: `${d.b} (${q})`, unknown: true },
          ],
          question: `écart : ${ecart}`,
        }),
      };
    },
  },
  {
    kind: "template",
    id: "4e_prop_ratio_defi_tpl_5_enchainer",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_ratio",
    microId: "prop_ratio_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Fais coïncider les deux nombres qui parlent de la quantité commune.",
    tags: ["ratio", "ratio_trois", "defi", "qcm", "template"],
    generate: () => {
      let p = 2, q = 3, r = 4, s = 5;
      for (let essai = 0; essai < 200; essai++) {
        [p, q] = ratioSimple(1, 6, 2, 6);
        [r, s] = ratioSimple(2, 6, 1, 7);
        if (q !== r && (q * r) / pgcd(q, r) <= 30) break;
      }
      const L = (q * r) / pgcd(q, r);
      let a = (p * L) / q;
      let b = L;
      let c = (s * L) / r;
      const g = pgcd(pgcd(a, b), c);
      a /= g; b /= g; c /= g;
      const correct = `${a} : ${b} : ${c}`;
      const lettres = Math.random() < 0.35;
      let text: string;
      if (lettres) {
        const [x, y, z] = randomChoice(LETTRES3);
        text = Math.random() < 0.5
          ? `On sait que ${x} : ${y} = ${p} : ${q} et que ${y} : ${z} = ${r} : ${s}. Quel est le ratio ${x} : ${y} : ${z}, avec les plus petits entiers possibles ?`
          : `Les nombres ${x}, ${y} et ${z} vérifient ${x} : ${y} = ${p} : ${q} et ${y} : ${z} = ${r} : ${s}. Écris le ratio ${x} : ${y} : ${z} sous forme simplifiée.`;
      } else {
        const t = randomChoice(TRIOS);
        const [n0, n1, n2] = t.noms;
        text = Math.random() < 0.5
          ? `${t.cadre}, le ratio ${n0} : ${n1} est ${p} : ${q}, et le ratio ${n1} : ${n2} est ${r} : ${s}. Quel est le ratio ${ratioNoms3(t)}, avec les plus petits entiers possibles ?`
          : `${t.cadre}, on sait que ${n0} : ${n1} = ${p} : ${q} et ${n1} : ${n2} = ${r} : ${s}. Parmi ces réponses, quel est le ratio ${ratioNoms3(t)} simplifié ?`;
      }
      return {
        text,
        format: "qcm",
        choices: makeChoices(correct, [
          `${p} : ${q} : ${s}`,
          `${p} : ${r} : ${s}`,
          `${p} : ${q + r} : ${s}`,
          `${c} : ${b} : ${a}`,
          `${a} : ${c} : ${b}`,
          `${p * r} : ${q * r} : ${s}`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : un ratio ne change pas quand on multiplie tous ses nombres par un même nombre.\n\n" +
          `Méthode : la quantité du milieu vaut ${q} parts dans le premier ratio et ${r} dans le second. On les ramène au même nombre, ${L}, le plus petit multiple commun de ${q} et ${r}.\n\n` +
          `Calcul : ${p} : ${q} = ${(p * L) / q} : ${L} (× ${L / q}) et ${r} : ${s} = ${L} : ${(s * L) / r} (× ${L / r}). On assemble : ${(p * L) / q} : ${L} : ${(s * L) / r}` +
          (g > 1 ? `, puis on divise par ${g}.\n\n` : ".\n\n") +
          `Conclusion : le ratio est ${correct}. ⚠️ Recoller « ${p} : ${q} » et « ${s} » sans égaliser la quantité du milieu est le piège.`,
      };
    },
  },
  {
    kind: "template",
    id: "4e_prop_ratio_defi_tpl_6_ajouter",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_ratio",
    microId: "prop_ratio_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "L'autre quantité ne bouge pas : c'est elle qui fixe la nouvelle valeur d'une part.",
    tags: ["ratio", "defi", "template"],
    generate: () => {
      const CIBLES: readonly [number, number][] = [[1, 1], [2, 1], [3, 2], [4, 3], [5, 4], [3, 1], [5, 3], [5, 2]];
      for (let essai = 0; essai < 300; essai++) {
        const d = randomChoice(DUOS);
        const pas = randomChoice(d.pas);
        const [pa, pb] = ratioSimple(1, 6, 2, 8);
        const v = randomInt(2, 6) * pas;
        const A = pa * v;
        const B = pb * v;
        const c: Cote = Math.random() < 0.5 ? "a" : "b";
        const o = autre(c);
        const C = c === "a" ? A : B;
        const O = c === "a" ? B : A;
        const [rc, ro] = randomChoice(CIBLES);
        if ((O * rc) % ro !== 0) continue;
        const nouveau = (O * rc) / ro;
        if (nouveau <= C) continue;
        const ajout = nouveau - C;
        const lab = `${d.a} : ${d.b}`;
        const cibleTxt = c === "a" ? `${rc} : ${ro}` : `${ro} : ${rc}`;
        const k = randomInt(0, 2);
        const debut =
          k === 0
            ? situation(d, A, B)
            : k === 1
              ? `${d.cadre}, le ratio ${lab} est ${pa} : ${pb}, et ${ilYa(d)} ${qte(d, o, O)}.`
              : `${d.cadre}, ${ilYa(d)} ${qte(d, c, C)} ; le ratio ${lab} est ${pa} : ${pb}.`;
        const question = estCompte(d)
          ? `Combien ${deDe(d, c)} faut-il ajouter pour que le ratio ${lab} devienne ${cibleTxt} ?`
          : `Quelle quantité ${deDe(d, c)} faut-il ajouter, en ${d.unite}, pour que le ratio ${lab} devienne ${cibleTxt} ?`;
        const etape0 =
          k === 2
            ? `${cap(leDe(d, c))} : ${C} pour ${c === "a" ? pa : pb} parts, donc une part vaut ${v} ; ${leDe(d, o)} : ${c === "a" ? pb : pa} × ${v} = ${O}. `
            : "";
        return {
          text: `${debut} ${question}`,
          format: "short",
          expected: [String(ajout)],
          comparator: "number_equal",
          explanation:
            "Définition : deux quantités sont dans le ratio r : s quand elles valent r parts et s parts de même taille.\n\n" +
            `Méthode : on n'ajoute rien ${a_(leDe(d, o))} : cette quantité fixe la taille d'une part dans le NOUVEAU ratio.\n\n` +
            `Calcul : ${etape0}Dans le ratio ${cibleTxt}, ${leDe(d, o)} = ${ro} part${ro > 1 ? "s" : ""}, donc une part vaut ${O} ÷ ${ro} = ${O / ro}. ` +
            `Il faut alors ${rc} × ${O / ro} = ${nouveau} pour ${leDe(d, c)}. On en a ${C} : il faut en ajouter ${nouveau} − ${C} = ${ajout}.\n\n` +
            `Conclusion : il faut ajouter ${ajout}${estCompte(d) ? "" : ` ${d.unite}`}.`,
        };
      }
      // Repli sûr : 9 filles, 15 garçons → 1 : 1.
      return {
        text: "Dans une classe, il y a 9 filles et 15 garçons. Combien de filles faut-il ajouter pour que le ratio filles : garçons devienne 1 : 1 ?",
        format: "short",
        expected: ["6"],
        comparator: "number_equal",
        explanation:
          "Définition : le ratio 1 : 1 veut dire autant de filles que de garçons.\n\nMéthode : les garçons ne changent pas.\n\nCalcul : 15 − 9 = 6.\n\nConclusion : il faut ajouter 6 filles.",
      };
    },
  },
];
