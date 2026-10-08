import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { PRENOMS, pick, de, type Prenom } from "./entiers.bank";

// Les propositions d'un gabarit sont écrites à la main, et deux d'entre elles
// finissent par coïncider dès qu'un paramètre tombe sur une valeur particulière
// (a = b, un coefficient nul, une fraction qui se simplifie…). L'élève voyait
// alors deux fois la même ligne. On met la bonne réponse de côté, on tire trois
// pièges réellement distincts, puis on mélange l'ensemble.
function makeChoices(correct: string, wrongs: readonly string[]) {
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct),
  ).slice(0, 3);
  return shuffle([correct, ...distracteurs]);
}


function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * LE CARRÉ DÉCOUPÉ EN 100 — la figure qui remplace le tableau de conversion.
 *
 * ⛔ Le BO 6e : « le recours à un tableau de conversion est déconseillé à ce
 * stade ». Ce qu'il fait verbaliser à la place, c'est justement ce dessin :
 * 1 dm² = 1 dm × 1 dm = 10 cm × 10 cm = 100 cm². Ici la figure EST la méthode,
 * pas une décoration.
 *
 * Sans case colorée, on compte les cent carrés ; avec une seule, on lit
 * « 1 cm² est le centième de 1 dm² ».
 */
function carreDecoupe(casesColorees: [number, number][]) {
  return {
    kind: "figure_libre" as const,
    grid: { rows: 10, cols: 10, filledCells: casesColorees },
    display: {
      showGrid: true,
      showFilled: casesColorees.length > 0,
      showPerimeter: true,
    },
    size: { cellSize: 22, padding: 14 },
  };
}

function expl(calcul: string) {
  return (
    "Définition : une aire mesure la surface occupée par une figure.\n\n" +
    "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
    "Calcul : " +
    calcul +
    "\n\nConclusion : on garde la réponse obtenue."
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// ⭐ 06/10/2026 — DES SITUATIONS, PAS UNE PHRASE. Mesuré le 05/10 : 5 à 12
// squelettes par micro, 13 à 18 répétitions sur 20. Chaque gabarit compose
// maintenant une situation × une tournure × des prénoms. Décisions de
// Frédéric : unité OBLIGATOIRE dans l'énoncé ET dans la réponse (« 24 cm² » ;
// « 24 » seul accepterait « 24 m² »), division écrite « ÷ », jamais de barre,
// mesures à deux chiffres après la virgule au plus. Les correcteurs :
// correcteurs/aires.ts. Ces outils servent aussi à volumes.bank.ts.
// ═══════════════════════════════════════════════════════════════════════════

/** Virgule décimale, deux chiffres après la virgule au plus, espaces des milliers. */
export function nf(x: number): string {
  const r = Math.round(x * 100) / 100;
  const [e, d] = String(r).split(".");
  return e.replace(/\B(?=(\d{3})+(?!\d))/g, " ") + (d ? "," + d : "");
}
/** La réponse AVEC son unité (« 24 cm² ») ; sans espace des milliers en second. */
export function avecUnite(x: number, u: string): string[] {
  const a = `${nf(x)} ${u}`;
  const b = `${nf(x).replace(/ /g, "")} ${u}`;
  return a === b ? [a] : [a, b];
}
/** Deux prénoms différents. */
export function deuxPrenoms(): [Prenom, Prenom] {
  const p = pick(PRENOMS);
  let q = pick(PRENOMS);
  while (q.nom === p.nom) q = pick(PRENOMS);
  return [p, q];
}
export const il = (p: Prenom) => (p.f ? "elle" : "il");
export const Il = (p: Prenom) => (p.f ? "Elle" : "Il");
export { pick, de, PRENOMS };
export type { Prenom };

// ─── aire_comprendre ────────────────────────────────────────────────────────
// Petites surfaces (cm²) et grandes (m²) : l'unité doit coller à l'objet.
const SURFACES_PETITES: { de: string; min: number; max: number }[] = [
  { de: "d’un timbre", min: 4, max: 9 },
  { de: "d’une feuille de cahier", min: 500, max: 630 },
  { de: "de l’écran d’un téléphone", min: 70, max: 110 },
  { de: "d’une carte à jouer", min: 50, max: 60 },
  { de: "d’un ticket de bus", min: 20, max: 30 },
  { de: "d’une étiquette de pot de confiture", min: 30, max: 60 },
  { de: "d’une photo de vacances", min: 90, max: 150 },
  { de: "d’un post-it", min: 50, max: 76 },
  { de: "d’un carreau de chocolat", min: 4, max: 8 },
  { de: "de la couverture d’un livre", min: 300, max: 450 },
];
const SURFACES_GRANDES: { de: string; min: number; max: number }[] = [
  { de: "du sol d’une chambre", min: 9, max: 16 },
  { de: "d’un terrain de basket", min: 400, max: 450 },
  { de: "de la pelouse d’un parc", min: 600, max: 900 },
  { de: "d’un tapis de judo", min: 30, max: 60 },
  { de: "d’un mur du salon", min: 10, max: 20 },
  { de: "d’un potager", min: 20, max: 60 },
  { de: "de la cour de l’école", min: 500, max: 900 },
  { de: "du toit d’une cabane", min: 4, max: 9 },
  { de: "d’une salle de classe", min: 50, max: 70 },
];
const AUTRES_UNITES = ["kg", "g", "L"];

function genAireComprendreUnite() {
  const grande = Math.random() < 0.5;
  const o = pick(grande ? SURFACES_GRANDES : SURFACES_PETITES);
  const u = grande ? "m" : "cm";
  const p = pick(PRENOMS);
  const autre = pick(AUTRES_UNITES);
  if (Math.random() < 0.5) {
    const text = pick([
      `${p.nom} veut connaître l’aire ${o.de}. Quelle unité doit-${il(p)} choisir ?`,
      `Quelle unité convient pour mesurer l’aire ${o.de} ?`,
      `Pour mesurer la surface ${o.de}, ${p.nom} hésite entre quatre unités. Laquelle convient ?`,
      `${p.nom} calcule l’aire ${o.de}. Dans quelle unité peut-${il(p)} écrire son résultat ?`,
    ]);
    return {
      text,
      format: "qcm" as const,
      choices: shuffle([`${u}²`, u, `${u}³`, autre]),
      expected: [`${u}²`],
      comparator: "mcq_exact" as const,
      explanation: expl(
        `Une aire mesure une surface : elle s’écrit avec une unité CARRÉE. ${u} mesure une longueur, ${u}³ un volume, ${autre} ${autre === "L" ? "une contenance" : "une masse"}. Ici on choisit ${u}².`
      ),
    };
  }
  const n = randomInt(o.min, o.max);
  const N = nf(n);
  const text = pick([
    `${p.nom} a noté quatre mesures. Laquelle peut être l’aire ${o.de} ?`,
    `Laquelle de ces mesures peut être l’aire ${o.de} ?`,
    `Voici quatre écritures. Laquelle donne l’aire ${o.de} ?`,
  ]);
  return {
    text,
    format: "qcm" as const,
    choices: shuffle([`${N} ${u}²`, `${N} ${u}`, `${N} ${u}³`, `${N} ${autre}`]),
    expected: [`${N} ${u}²`],
    comparator: "mcq_exact" as const,
    explanation: expl(
      `Une aire s’écrit avec une unité carrée. ${N} ${u} est une longueur, ${N} ${u}³ un volume. L’aire est donc ${N} ${u}².`
    ),
  };
}

// Ce que l'on veut faire dit ce qu'il faut mesurer : couvrir → aire,
// faire le tour → périmètre, remplir → volume.
const ACTIONS_GRANDEUR: { phrase: string; rep: "l’aire" | "le périmètre" | "le volume" }[] = [
  { phrase: "veut poser du gazon sur tout son jardin", rep: "l’aire" },
  { phrase: "veut peindre tout un mur de sa chambre", rep: "l’aire" },
  { phrase: "veut couvrir toute la table avec une nappe", rep: "l’aire" },
  { phrase: "veut carreler tout le sol de la salle de bain", rep: "l’aire" },
  { phrase: "veut poser de la moquette dans toute sa chambre", rep: "l’aire" },
  { phrase: "veut savoir quelle place son tapis occupe sur le sol", rep: "l’aire" },
  { phrase: "veut acheter le tissu d’un drapeau entier", rep: "l’aire" },
  { phrase: "veut semer des fleurs sur toute la plate-bande", rep: "l’aire" },
  { phrase: "veut recouvrir son cahier de papier", rep: "l’aire" },
  { phrase: "veut poser une clôture autour du potager", rep: "le périmètre" },
  { phrase: "veut coller un ruban tout autour d’un cadre photo", rep: "le périmètre" },
  { phrase: "veut mettre une guirlande tout autour de la fenêtre", rep: "le périmètre" },
  { phrase: "veut coudre un galon sur tout le bord d’une nappe", rep: "le périmètre" },
  { phrase: "veut planter une haie tout autour du jardin", rep: "le périmètre" },
  { phrase: "veut remplir un aquarium d’eau", rep: "le volume" },
  { phrase: "veut remplir un bac de sable", rep: "le volume" },
];

function genAireComprendreGrandeur() {
  const a = pick(ACTIONS_GRANDEUR);
  const p = pick(PRENOMS);
  const text = pick([
    `${p.nom} ${a.phrase}. Que doit-${il(p)} mesurer ?`,
    `${p.nom} ${a.phrase}. Quelle grandeur doit-${il(p)} calculer ?`,
    `${p.nom} ${a.phrase}. Avant de commencer, que doit-${il(p)} connaître ?`,
    `Ce week-end, ${p.nom} ${a.phrase}. Quelle mesure lui faut-il ?`,
  ]);
  const pourquoi =
    a.rep === "l’aire"
      ? "Il faut couvrir toute une surface : on mesure l’aire."
      : a.rep === "le périmètre"
        ? "On ne s’occupe que du bord, tout autour : on mesure le périmètre."
        : "Il faut remplir un espace : on mesure le volume.";
  return {
    text,
    format: "qcm" as const,
    choices: shuffle(["l’aire", "le périmètre", "le volume", "la masse"]),
    expected: [a.rep],
    comparator: "mcq_exact" as const,
    explanation: expl(pourquoi),
  };
}

// ─── aire_compter ───────────────────────────────────────────────────────────
// Une surface pavée de carrés UNITÉS : l'aire est le nombre de carrés, suivi
// de l'unité du carré (1 cm², 1 dm² ou 1 m²).
const PAVAGES: { intro: (p: Prenom) => string; carre: string; u: string }[] = [
  { intro: (p) => `Sur du papier à carreaux de 1 cm², ${p.nom} colorie une figure.`, carre: "carreaux", u: "cm²" },
  { intro: (p) => `${p.nom} fait une mosaïque avec des carreaux de 1 cm².`, carre: "carreaux", u: "cm²" },
  { intro: (p) => `${p.nom} dessine un robot en pixel art, avec des cases de 1 cm².`, carre: "cases", u: "cm²" },
  { intro: (p) => `${p.nom} décore une boîte avec des gommettes carrées de 1 cm².`, carre: "gommettes", u: "cm²" },
  { intro: (p) => `${p.nom} coud un patchwork avec des carrés de tissu de 1 dm².`, carre: "carrés", u: "dm²" },
  { intro: (p) => `${p.nom} colle des post-it carrés de 1 dm² sur la porte de sa chambre.`, carre: "post-it", u: "dm²" },
  { intro: (p) => `Le mur de la cuisine ${de(p.nom)} est couvert de carreaux de 1 dm².`, carre: "carreaux", u: "dm²" },
  { intro: (p) => `Pour le cours de gym, ${p.nom} pose des dalles de mousse de 1 m².`, carre: "dalles", u: "m²" },
  { intro: (p) => `${p.nom} partage son potager en parcelles carrées de 1 m².`, carre: "parcelles", u: "m²" },
  { intro: (p) => `Sur la terrasse ${de(p.nom)}, on pose des dalles de 1 m².`, carre: "dalles", u: "m²" },
  { intro: (p) => `Au club de judo, ${p.nom} aide à poser des tapis carrés de 1 m².`, carre: "tapis", u: "m²" },
  { intro: (p) => `Pour la kermesse, ${p.nom} trace un jeu de marelle avec des cases de 1 m².`, carre: "cases", u: "m²" },
];
const RANGS_LIGNES = ["la première ligne", "la deuxième", "la troisième", "la quatrième"];
const QUESTIONS_AIRE_COUVERTE = [
  "Quelle aire est couverte ?",
  "Quelle est l’aire de la surface couverte ?",
  "Calcule l’aire totale.",
  "Combien mesure l’aire de cette surface ?",
];

function genAireCompterLignes() {
  const ctx = pick(PAVAGES);
  const p = pick(PRENOMS);
  const n = randomInt(2, 4);
  const lignes = Array.from({ length: n }, () => randomInt(2, 9));
  const morceaux = lignes.map((k, i) => (i === 0 ? `${k} ${ctx.carre} sur ${RANGS_LIGNES[i]}` : `${k} sur ${RANGS_LIGNES[i]}`));
  const liste = morceaux.slice(0, -1).join(", ") + " et " + morceaux[morceaux.length - 1];
  const total = lignes.reduce((a, b) => a + b, 0);
  return {
    text: `${ctx.intro(p)} Il y a ${liste}. ${pick(QUESTIONS_AIRE_COUVERTE)}`,
    format: "short" as const,
    expected: avecUnite(total, ctx.u),
    comparator: "number_equal" as const,
    explanation: expl(
      `Chaque carré a une aire de 1 ${ctx.u}. On compte tous les carrés : ${lignes.join(" + ")} = ${total}. L’aire est donc ${total} ${ctx.u}.`
    ),
  };
}

function genAireCompterRangees() {
  const ctx = pick(PAVAGES);
  const p = pick(PRENOMS);
  const a = randomInt(3, 9);
  const b = randomInt(3, 12);
  const good = a * b;
  const forme = pick([
    `Il y a ${a} rangées de ${b} ${ctx.carre}.`,
    `Il y a ${b} ${ctx.carre} dans chaque rangée, et ${a} rangées.`,
    `Les ${ctx.carre} forment ${a} rangées. Chaque rangée compte ${b} ${ctx.carre}.`,
  ]);
  return {
    text: `${ctx.intro(p)} ${forme} ${pick(QUESTIONS_AIRE_COUVERTE)}`,
    format: "qcm" as const,
    choices: makeChoices(`${good} ${ctx.u}`, [
      `${a + b} ${ctx.u}`,
      `${good + 1} ${ctx.u}`,
      `${good - 1} ${ctx.u}`,
      `${2 * (a + b)} ${ctx.u}`,
      `${good + a} ${ctx.u}`,
    ]),
    expected: [`${good} ${ctx.u}`],
    comparator: "mcq_exact" as const,
    explanation: expl(
      `Chaque carré a une aire de 1 ${ctx.u}. ${a} rangées de ${b}, c’est ${a} × ${b} = ${good} carrés. L’aire est donc ${good} ${ctx.u}. Additionner ${a} + ${b} ne compte pas les carrés.`
    ),
  };
}

// ─── aire_convertir ─────────────────────────────────────────────────────────
// ⛔ SEULEMENT m² ↔ dm² ET dm² ↔ cm² (BO de 6e), sans tableau de conversion :
// « 1 dm² = 10 cm × 10 cm = 100 cm² ». Facteur 100, jamais 10.
const OBJETS_M2 = [
  "le plateau de son bureau",
  "le tableau blanc de sa classe",
  "la fenêtre de sa chambre",
  "son tapis de yoga",
  "la porte du placard",
  "une grande affiche de cinéma",
  "la bâche de sa tente",
];
const OBJETS_DM2 = [
  "une feuille de cahier",
  "un set de table",
  "son ardoise",
  "la couverture d’une BD",
  "un carreau de faïence",
  "une serviette en papier",
  "son tapis de souris",
];
type Conversion = { v: number; de: string; vers: string; r: number };
/** Une conversion entre unités voisines ; `grande` = l'objet se mesure en m²/dm². */
function tirerConversion(): Conversion & { objet: string } {
  const grande = Math.random() < 0.5;
  const [haut, bas] = grande ? ["m²", "dm²"] : ["dm²", "cm²"];
  const objet = pick(grande ? OBJETS_M2 : OBJETS_DM2);
  // Une aire plausible pour l'objet, dans l'unité du haut, deux décimales au plus.
  const enHaut = grande ? randomInt(60, 300) / 100 : randomInt(200, 1400) / 100;
  return Math.random() < 0.5
    ? { v: enHaut, de: haut, vers: bas, r: Math.round(enHaut * 100), objet }
    : { v: Math.round(enHaut * 100), de: bas, vers: haut, r: enHaut, objet };
}
function explConversion(c: Conversion) {
  const versPetite = c.r > c.v;
  return versPetite
    ? `1 ${c.de} = 100 ${c.vers} : un carré de 1 ${c.de.replace("²", "")} de côté se découpe en 10 × 10 = 100 carrés de 1 ${c.vers.replace("²", "")} de côté. On va vers une unité plus PETITE, donc le nombre grandit : ${nf(c.v)} × 100 = ${nf(c.r)}. Donc ${nf(c.v)} ${c.de} = ${nf(c.r)} ${c.vers}.`
    : `Il faut 100 ${c.de} pour faire 1 ${c.vers} (10 × 10 = 100). On va vers une unité plus GRANDE, donc le nombre diminue : ${nf(c.v)} ÷ 100 = ${nf(c.r)}. Donc ${nf(c.v)} ${c.de} = ${nf(c.r)} ${c.vers}.`;
}

function genAireConvertir() {
  const c = tirerConversion();
  const p = pick(PRENOMS);
  const V = nf(c.v);
  const text = pick([
    `Convertis ${V} ${c.de} en ${c.vers}.`,
    `Complète : ${V} ${c.de} = … ${c.vers}.`,
    `Combien de ${c.vers} y a-t-il dans ${V} ${c.de} ?`,
    `Écris ${V} ${c.de} en ${c.vers}.`,
    `${p.nom} mesure ${c.objet} : ${V} ${c.de}. Écris cette aire en ${c.vers}.`,
    `Pour un bricolage, ${p.nom} note l’aire ${/^une? /.test(c.objet) ? "d’" : "de "}${c.objet} : ${V} ${c.de}. Combien cela fait-il en ${c.vers} ?`,
  ]);
  return {
    text,
    format: "short" as const,
    expected: avecUnite(c.r, c.vers),
    comparator: "number_equal" as const,
    explanation: expl(explConversion(c)),
  };
}

function genAireConvertirPiege() {
  // Des nombres entiers au départ : les pièges (× 10, × 1 000, ÷ 100 au lieu
  // de × 100) gardent deux chiffres après la virgule au plus.
  const grande = Math.random() < 0.5;
  const [haut, bas] = grande ? ["m²", "dm²"] : ["dm²", "cm²"];
  const versPetite = Math.random() < 0.5;
  const k = randomInt(2, 60);
  const c: Conversion = versPetite
    ? { v: k, de: haut, vers: bas, r: k * 100 }
    : { v: k * 100, de: bas, vers: haut, r: k };
  const pieges = versPetite ? [c.v * 10, c.v * 1000, c.v / 100] : [c.v / 10, c.v / 1000, c.v * 100];
  const faux = pieges[0];
  const [p] = deuxPrenoms();
  const e = p.f ? "e" : "";
  const V = nf(c.v);
  const text = pick([
    `${p.nom} a écrit : « ${V} ${c.de} = ${nf(faux)} ${c.vers} ». ${p.f ? "Elle" : "Il"} s’est trompé${e}. Quel est le bon résultat ?`,
    `${p.nom} convertit ${V} ${c.de} en ${c.vers}. Quel résultat doit-${il(p)} trouver ?`,
    `Complète : ${V} ${c.de} = … ${c.vers}. Choisis le bon résultat.`,
    `${p.nom} hésite : combien font ${V} ${c.de} en ${c.vers} ?`,
  ]);
  return {
    text,
    format: "qcm" as const,
    choices: makeChoices(`${nf(c.r)} ${c.vers}`, pieges.map((x) => `${nf(x)} ${c.vers}`)),
    expected: [`${nf(c.r)} ${c.vers}`],
    comparator: "mcq_exact" as const,
    explanation: expl(
      `${explConversion(c)} Le piège : multiplier ou diviser par 10, comme pour les longueurs. Une aire est un produit de DEUX longueurs : 10 × 10 = 100.`
    ),
  };
}

// ─── Objets rectangulaires et carrés (aire_rectangle, aire_carre, problèmes) ─
type Objet = { nom: string; f: boolean; u: "cm" | "m"; L: [number, number]; l: [number, number] };
const elide = (nom: string) => /^[aeiouéèêh]/i.test(nom);
/** « la chambre », « le potager », « l’étiquette ». */
export const leNom = (o: { nom: string; f: boolean }) => (elide(o.nom) ? `l’${o.nom}` : `${o.f ? "la" : "le"} ${o.nom}`);
/** « de la chambre », « du potager », « de l’étiquette ». */
export const duNom = (o: { nom: string; f: boolean }) => (elide(o.nom) ? `de l’${o.nom}` : o.f ? `de la ${o.nom}` : `du ${o.nom}`);
const maj = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const RECTANGLES: Objet[] = [
  { nom: "étiquette", f: true, u: "cm", L: [6, 10], l: [3, 5] },
  { nom: "ticket de cinéma", f: false, u: "cm", L: [7, 9], l: [3, 5] },
  { nom: "carte postale", f: true, u: "cm", L: [14, 16], l: [9, 11] },
  { nom: "tablette de chocolat", f: true, u: "cm", L: [15, 18], l: [7, 9] },
  { nom: "photo de classe", f: true, u: "cm", L: [15, 20], l: [10, 13] },
  { nom: "set de table", f: false, u: "cm", L: [40, 45], l: [28, 32] },
  { nom: "écran de la tablette", f: false, u: "cm", L: [20, 25], l: [14, 17] },
  { nom: "couvercle du jeu de société", f: false, u: "cm", L: [25, 30], l: [15, 20] },
  { nom: "chambre", f: true, u: "m", L: [3, 6], l: [2, 3] },
  { nom: "potager", f: false, u: "m", L: [5, 12], l: [2, 4] },
  { nom: "terrasse", f: true, u: "m", L: [4, 8], l: [3, 4] },
  { nom: "place de parking", f: true, u: "m", L: [5, 5], l: [2, 3] },
  { nom: "enclos des poules", f: false, u: "m", L: [4, 8], l: [2, 3] },
  { nom: "salle de classe", f: true, u: "m", L: [8, 10], l: [6, 7] },
  { nom: "terrain de mini-foot", f: false, u: "m", L: [30, 40], l: [15, 25] },
  { nom: "bâche de la piscine", f: true, u: "m", L: [4, 6], l: [2, 3] },
];
const CARRES: Objet[] = [
  { nom: "timbre", f: false, u: "cm", L: [2, 3], l: [0, 0] },
  { nom: "post-it", f: false, u: "cm", L: [7, 8], l: [0, 0] },
  { nom: "carreau de faïence", f: false, u: "cm", L: [10, 20], l: [0, 0] },
  { nom: "coussin", f: false, u: "cm", L: [30, 45], l: [0, 0] },
  { nom: "plateau d’échecs", f: false, u: "cm", L: [30, 50], l: [0, 0] },
  { nom: "boîte à pizza", f: true, u: "cm", L: [28, 34], l: [0, 0] },
  { nom: "serviette en papier", f: true, u: "cm", L: [20, 33], l: [0, 0] },
  { nom: "bac à sable", f: false, u: "m", L: [2, 4], l: [0, 0] },
  { nom: "ring de boxe", f: false, u: "m", L: [5, 7], l: [0, 0] },
  { nom: "parcelle de fraises", f: true, u: "m", L: [2, 6], l: [0, 0] },
  { nom: "piscine", f: true, u: "m", L: [4, 8], l: [0, 0] },
  { nom: "salle de danse", f: true, u: "m", L: [8, 12], l: [0, 0] },
];
/** À une étoile : des côtés de 10 au plus. */
const petitsCotes = (o: Objet) => o.L[0] <= 10;

/** Un rectangle : longueur et largeur entières, ou (★3) une demi-unité. */
function tirerRectangle(etoile: 1 | 2 | 3) {
  const p = pick(PRENOMS);
  const geometrie = Math.random() < (etoile === 1 ? 0.35 : 0.15);
  if (geometrie) {
    // Sur un cahier ou dans du carton : des cm (des dm pour un grand carton).
    const u = pick(["cm", "cm", "cm", "dm"]);
    const L = randomInt(4, etoile === 1 ? 10 : 15);
    const l = randomInt(2, L - 1);
    return { p, o: null as Objet | null, u, L, l };
  }
  const o = pick(RECTANGLES.filter((x) => etoile > 1 || petitsCotes(x)));
  let L = randomInt(o.L[0], o.L[1]);
  let l = randomInt(o.l[0], o.l[1]);
  // Une chambre de 3 m sur 3 m serait un carré : la largeur reste plus petite.
  while (l >= L) l = randomInt(o.l[0], o.l[1]);
  if (etoile === 3 && o.u === "m" && Math.random() < 0.5 && L < 20) L += 0.5;
  return { p, o, u: o.u as string, L, l };
}

function genAireRectangle(etoile: 1 | 2 | 3) {
  const { p, o, u, L, l } = tirerRectangle(etoile);
  const A = L * l;
  const Ls = `${nf(L)} ${u}`;
  const ls = `${nf(l)} ${u}`;
  const sujet = o ? `${maj(leNom(o))} ${de(p.nom)}` : `Le rectangle ${de(p.nom)}`;
  const intro = o
    ? pick([
        `${sujet} mesure ${Ls} de long et ${ls} de large.`,
        `${sujet} mesure ${Ls} sur ${ls}.`,
        `${sujet} a une longueur de ${Ls} et une largeur de ${ls}.`,
        `${sujet} fait ${ls} de large et ${Ls} de long.`,
      ])
    : pick([
        `Sur son cahier, ${p.nom} trace un rectangle de ${Ls} sur ${ls}.`,
        `${p.nom} dessine un rectangle. Sa longueur est ${Ls}, sa largeur ${ls}.`,
        `${p.nom} découpe dans du carton un rectangle de ${ls} sur ${Ls}.`,
      ]);
  const question = o
    ? pick([`Quelle est l’aire ${duNom(o)} ?`, `Calcule l’aire ${duNom(o)}.`, `Combien mesure son aire ?`, `Quelle surface couvre-t-${o.f ? "elle" : "il"} ?`])
    : pick(["Quelle est l’aire de ce rectangle ?", "Calcule l’aire du rectangle.", "Combien mesure l’aire de ce rectangle ?"]);
  const base = {
    text: `${intro} ${question}`,
    explanation: expl(
      `L’aire d’un rectangle est longueur × largeur : ${nf(L)} × ${nf(l)} = ${nf(A)}. Des ${u} fois des ${u} donnent des ${u}² : l’aire est ${nf(A)} ${u}².`
    ),
  };
  if (etoile < 3)
    return { ...base, format: "short" as const, expected: avecUnite(A, `${u}²`), comparator: "number_equal" as const };
  return {
    ...base,
    format: "qcm" as const,
    choices: makeChoices(`${nf(A)} ${u}²`, [
      `${nf(2 * (L + l))} ${u}²`,
      `${nf(L + l)} ${u}²`,
      `${nf(A)} ${u}`,
      `${nf(A + L)} ${u}²`,
    ]),
    expected: [`${nf(A)} ${u}²`],
    comparator: "mcq_exact" as const,
  };
}

function genAireCarre(etoile: 1 | 2 | 3) {
  const p = pick(PRENOMS);
  const geometrie = Math.random() < (etoile === 1 ? 0.35 : 0.15);
  const o = geometrie ? null : pick(CARRES.filter((x) => etoile > 1 || petitsCotes(x)));
  const u: string = o ? o.u : pick(["cm", "cm", "cm", "dm"]);
  const c = o ? randomInt(o.L[0], o.L[1]) : randomInt(2, etoile === 1 ? 10 : 15);
  const A = c * c;
  const cs = `${c} ${u}`;
  const intro = o
    ? pick([
        `${maj(leNom(o))} ${de(p.nom)} est un carré de ${cs} de côté.`,
        `${maj(leNom(o))} ${de(p.nom)} est carré${o.f ? "e" : ""} : chaque côté mesure ${cs}.`,
        `${p.nom} mesure ${leNom(o)} : c’est un carré de côté ${cs}.`,
      ])
    : pick([
        `${p.nom} trace un carré de ${cs} de côté.`,
        `Sur son cahier, ${p.nom} dessine un carré. Ses quatre côtés mesurent ${cs}.`,
        `${p.nom} découpe un carré de côté ${cs} dans du papier.`,
      ]);
  const question = o
    ? pick([`Quelle est l’aire ${duNom(o)} ?`, `Calcule l’aire ${duNom(o)}.`, `Combien mesure son aire ?`])
    : pick(["Quelle est l’aire de ce carré ?", "Calcule l’aire du carré.", "Combien mesure l’aire de ce carré ?"]);
  const base = {
    text: `${intro} ${question}`,
    explanation: expl(`L’aire d’un carré est côté × côté : ${c} × ${c} = ${nf(A)}. L’aire est ${nf(A)} ${u}².`),
  };
  if (etoile < 3)
    return { ...base, format: "short" as const, expected: avecUnite(A, `${u}²`), comparator: "number_equal" as const };
  return {
    ...base,
    format: "qcm" as const,
    // À 4 de côté, 4 × 4 et le périmètre valent tous deux 16 : makeChoices
    // écarte le piège qui tombe sur la réponse.
    choices: makeChoices(`${nf(A)} ${u}²`, [`${4 * c} ${u}²`, `${2 * c} ${u}²`, `${nf(A + c)} ${u}²`, `${nf(A)} ${u}`]),
    expected: [`${nf(A)} ${u}²`],
    comparator: "mcq_exact" as const,
  };
}

// ─── aire_comparer ──────────────────────────────────────────────────────────
type CtxDeuxAires = { u: string; min: number; max: number; phrase: (p: Prenom, q: Prenom, a: string, b: string) => string };
const CTX_DEUX_AIRES: CtxDeuxAires[] = [
  { u: "m²", min: 8, max: 20, phrase: (p, q, a, b) => `La chambre ${de(p.nom)} mesure ${a}. Celle ${de(q.nom)} mesure ${b}.` },
  { u: "m²", min: 10, max: 60, phrase: (p, q, a, b) => `Le potager ${de(p.nom)} couvre ${a}. Celui ${de(q.nom)} couvre ${b}.` },
  { u: "m²", min: 2, max: 15, phrase: (p, q, a, b) => `Pour la fête de l’école, ${p.nom} peint une fresque de ${a}. ${q.nom} en peint une de ${b}.` },
  { u: "cm²", min: 40, max: 300, phrase: (p, q, a, b) => `Sur la feuille, le dessin ${de(p.nom)} occupe ${a}. Celui ${de(q.nom)} occupe ${b}.` },
  { u: "m²", min: 2, max: 8, phrase: (p, q, a, b) => `Le tapis ${de(p.nom)} a une aire de ${a}. Celui ${de(q.nom)} a une aire de ${b}.` },
  { u: "dm²", min: 20, max: 90, phrase: (p, q, a, b) => `L’affiche de concert ${de(p.nom)} mesure ${a}. Celle ${de(q.nom)} mesure ${b}.` },
  { u: "m²", min: 3, max: 12, phrase: (p, q, a, b) => `Au camping, la tente ${de(p.nom)} couvre ${a} au sol. Celle ${de(q.nom)} couvre ${b}.` },
  { u: "dm²", min: 10, max: 40, phrase: (p, q, a, b) => `Le fond de l’aquarium ${de(p.nom)} mesure ${a}. Celui de l’aquarium ${de(q.nom)} mesure ${b}.` },
  { u: "dm²", min: 20, max: 80, phrase: (p, q, a, b) => `La voile du cerf-volant ${de(p.nom)} mesure ${a}. Celle du cerf-volant ${de(q.nom)} mesure ${b}.` },
  { u: "cm²", min: 40, max: 120, phrase: (p, q, a, b) => `La part de pizza ${de(p.nom)} couvre ${a}. Celle ${de(q.nom)} couvre ${b}.` },
  { u: "m²", min: 60, max: 150, phrase: (p, q, a, b) => `L’emplacement de camping ${de(p.nom)} fait ${a}. Celui ${de(q.nom)} fait ${b}.` },
  { u: "cm²", min: 90, max: 300, phrase: (p, q, a, b) => `La photo ${de(p.nom)} a une aire de ${a}. Celle ${de(q.nom)} a une aire de ${b}.` },
  { u: "m²", min: 20, max: 45, phrase: (_p, _q, a, b) => `Au gymnase, le tapis de judo couvre ${a}. Le tapis de lutte couvre ${b}.` },
  { u: "m²", min: 15, max: 40, phrase: (_p, _q, a, b) => `À la ferme, l’enclos des chèvres mesure ${a}. L’enclos des moutons mesure ${b}.` },
];
const QUESTIONS_DEUX_AIRES: { q: string; grand: boolean }[] = [
  { q: "Quelle est la plus grande des deux aires ?", grand: true },
  { q: "Écris la plus petite des deux aires.", grand: false },
  { q: "Donne la plus grande aire.", grand: true },
  { q: "Quelle aire est la plus petite ?", grand: false },
];

function genAireComparerDeux() {
  const ctx = pick(CTX_DEUX_AIRES);
  const [p, q] = deuxPrenoms();
  const a = randomInt(ctx.min, ctx.max);
  let b = randomInt(ctx.min, ctx.max);
  while (b === a) b = randomInt(ctx.min, ctx.max);
  const t = pick(QUESTIONS_DEUX_AIRES);
  const r = t.grand ? Math.max(a, b) : Math.min(a, b);
  return {
    text: `${ctx.phrase(p, q, `${a} ${ctx.u}`, `${b} ${ctx.u}`)} ${t.q}`,
    format: "short" as const,
    expected: avecUnite(r, ctx.u),
    comparator: "number_equal" as const,
    explanation: expl(
      `Les deux aires sont dans la même unité (${ctx.u}) : on compare les nombres. ${Math.min(a, b)} < ${Math.max(a, b)}. La plus ${t.grand ? "grande" : "petite"} est ${r} ${ctx.u}.`
    ),
  };
}

// Deux rectangles : il faut CALCULER les aires avant de comparer. Une fois sur
// quatre, les deux aires sont égales avec des formes différentes (4 × 6 et 3 × 8).
const OBJETS_COMPARES: { nom: string; f: boolean; u: string; lo: number; hi: number }[] = [
  { nom: "tapis", f: false, u: "m", lo: 1, hi: 4 },
  { nom: "potager", f: false, u: "m", lo: 2, hi: 10 },
  { nom: "affiche", f: true, u: "dm", lo: 3, hi: 9 },
  { nom: "serviette de plage", f: true, u: "dm", lo: 8, hi: 18 },
  { nom: "photo", f: true, u: "cm", lo: 9, hi: 20 },
  { nom: "nappe", f: true, u: "dm", lo: 10, hi: 20 },
  { nom: "bâche", f: true, u: "m", lo: 2, hi: 8 },
  { nom: "tableau", f: false, u: "dm", lo: 4, hi: 12 },
  { nom: "drapeau", f: false, u: "dm", lo: 4, hi: 12 },
  { nom: "terrain de pétanque", f: false, u: "m", lo: 3, hi: 15 },
];

function genAireComparerRectangles() {
  const o = pick(OBJETS_COMPARES);
  const [p, q] = deuxPrenoms();
  const tir = () => {
    const x = randomInt(o.lo, o.hi);
    let y = randomInt(o.lo, o.hi);
    while (y === x) y = randomInt(o.lo, o.hi);
    return [Math.max(x, y), Math.min(x, y)];
  };
  let [a, b] = tir();
  let [c, d] = tir();
  if (Math.random() < 0.25) {
    for (let k = 0; k < 300; k++) {
      [c, d] = tir();
      if (c * d === a * b && c !== a) break;
      [a, b] = tir();
    }
  }
  while (c === a && d === b) [c, d] = tir();
  // Le plus souvent, l'un est plus long et l'autre plus large : impossible de
  // conclure sans calculer.
  if ((a - c) * (b - d) > 0 && Math.random() < 0.75) {
    [b, d] = [d, b];
    if (a === b || c === d) [b, d] = [d, b];
  }
  while (c === a && d === b) [c, d] = tir();
  const grand = Math.random() < 0.6;
  const A1 = a * b;
  const A2 = c * d;
  const celui = (x: Prenom) => `${o.f ? "celle" : "celui"} ${de(x.nom)}`;
  const egales = "les deux ont la même aire";
  const juste = A1 === A2 ? egales : (A1 > A2) === grand ? celui(p) : celui(q);
  const un = o.f ? "une" : "un";
  const text = pick([
    `${p.nom} a ${un} ${o.nom} de ${a} ${o.u} sur ${b} ${o.u}. ${q.nom} a ${un} ${o.nom} de ${c} ${o.u} sur ${d} ${o.u}. ${o.f ? "Laquelle" : "Lequel"} a la plus ${grand ? "grande" : "petite"} aire ?`,
    `${maj(o.f ? "la" : "le")} ${o.nom} ${de(p.nom)} mesure ${a} ${o.u} sur ${b} ${o.u}. ${maj(o.f ? "celle" : "celui")} ${de(q.nom)} mesure ${c} ${o.u} sur ${d} ${o.u}. ${o.f ? "Laquelle" : "Lequel"} couvre la plus ${grand ? "grande" : "petite"} surface ?`,
  ]);
  return {
    text: text.replace(/^Le affiche|^La affiche/, "L’affiche"),
    format: "qcm" as const,
    choices: shuffle([celui(p), celui(q), egales]),
    expected: [juste],
    comparator: "mcq_exact" as const,
    explanation: expl(
      `On calcule chaque aire : ${a} × ${b} = ${A1} ${o.u}² et ${c} × ${d} = ${A2} ${o.u}². ${A1 === A2 ? "Les deux aires sont égales, même si les formes sont différentes." : `La plus ${grand ? "grande" : "petite"} aire est ${grand ? Math.max(A1, A2) : Math.min(A1, A2)} ${o.u}² : c’est ${juste}.`} Comparer les côtés un par un ne suffit pas.`
    ),
  };
}

// ─── aire_decomposer ────────────────────────────────────────────────────────
// Une surface faite de morceaux : on ajoute leurs aires (ou on retrouve le
// morceau qui manque quand l'aire totale est donnée).
type Assemblage = { u: string; tout: string; parties: [string, number, number][]; intro: (p: Prenom) => string };
const ASSEMBLAGES: Assemblage[] = [
  { u: "m²", tout: "le jardin", intro: (p) => `Le jardin ${de(p.nom)} a trois parties.`, parties: [["une pelouse", 20, 80], ["un potager", 6, 25], ["une terrasse", 8, 20]] },
  { u: "m²", tout: "l’appartement", intro: (p) => `L’appartement ${de(p.nom)} a trois pièces.`, parties: [["un salon", 18, 30], ["une cuisine", 7, 12], ["une chambre", 9, 14]] },
  { u: "cm²", tout: "le drapeau", intro: (p) => `${p.nom} dessine un drapeau en trois bandes.`, parties: [["une bande bleue", 20, 60], ["une bande blanche", 20, 60], ["une bande rouge", 20, 60]] },
  { u: "cm²", tout: "la figure", intro: (p) => `${p.nom} assemble trois pièces de tangram pour faire une figure.`, parties: [["un grand triangle", 30, 50], ["un carré", 8, 16], ["un parallélogramme", 8, 16]] },
  { u: "dm²", tout: "le patchwork", intro: (p) => `${p.nom} coud un patchwork avec trois morceaux de tissu.`, parties: [["un morceau vert", 4, 15], ["un morceau jaune", 4, 15], ["un morceau orange", 4, 15]] },
  { u: "m²", tout: "le parc", intro: () => `Un petit parc a trois zones.`, parties: [["une aire de jeux", 40, 90], ["un bassin", 15, 40], ["une pelouse", 100, 250]] },
  { u: "dm²", tout: "le vitrail", intro: (p) => `${p.nom} fabrique un vitrail avec trois morceaux de verre.`, parties: [["un morceau bleu", 3, 12], ["un morceau rouge", 3, 12], ["un morceau jaune", 3, 12]] },
  { u: "m²", tout: "la cour", intro: () => `La cour de l’école a trois zones.`, parties: [["un terrain de basket", 150, 250], ["un préau", 60, 120], ["un coin potager", 10, 30]] },
  { u: "cm²", tout: "la carte", intro: (p) => `${p.nom} colle trois photos sur une carte, sans les superposer ni laisser de vide.`, parties: [["une photo de plage", 30, 80], ["une photo de montagne", 30, 80], ["une photo de forêt", 30, 80]] },
  { u: "m²", tout: "le stand", intro: (p) => `Pour la kermesse, ${p.nom} installe un stand en trois coins.`, parties: [["un coin jeux", 4, 10], ["un coin gâteaux", 3, 8], ["un coin boissons", 2, 6]] },
];

function genAireDecomposerParties() {
  const a = pick(ASSEMBLAGES);
  const p = pick(PRENOMS);
  const aires = a.parties.map(([, lo, hi]) => randomInt(lo, hi));
  const total = aires.reduce((x, y) => x + y, 0);
  const desc = a.parties.map(([nom], i) => `${nom} de ${aires[i]} ${a.u}`);
  if (Math.random() < 0.6) {
    const text = `${a.intro(p)} Il y a ${desc[0]}, ${desc[1]} et ${desc[2]}. ${pick([
      `Quelle est l’aire de ${a.tout.startsWith("la ") ? "toute" : "tout"} ${a.tout} ?`,
      `Calcule l’aire totale.`,
      `Quelle est l’aire totale ?`,
    ])}`;
    return {
      text,
      format: "short" as const,
      expected: avecUnite(total, a.u),
      comparator: "number_equal" as const,
      explanation: expl(`Les trois parties couvrent toute la surface sans se chevaucher : on additionne leurs aires. ${aires.join(" + ")} = ${nf(total)} ${a.u}.`),
    };
  }
  // L'aire totale est donnée : on retrouve la partie qui manque.
  const k = randomInt(0, 2);
  const autres = desc.filter((_, i) => i !== k);
  const [article, ...reste] = a.parties[k][0].split(" ");
  const nom = reste.join(" ");
  const duCherche = /^[aeiouéèh]/i.test(nom) ? `de l’${nom}` : article === "une" ? `de la ${nom}` : `du ${nom}`;
  const text = `${a.intro(p)} En tout, ${a.tout} mesure ${nf(total)} ${a.u}. Il y a ${autres[0]}, ${autres[1]} et ${a.parties[k][0]}. ${pick([
    `Quelle est l’aire ${duCherche} ?`,
    `Combien mesure l’aire ${duCherche} ?`,
  ])}`;
  return {
    text,
    format: "short" as const,
    expected: avecUnite(aires[k], a.u),
    comparator: "number_equal" as const,
    explanation: expl(
      `On enlève à l’aire totale les parties connues : ${nf(total)} − ${aires.filter((_, j) => j !== k).join(" − ")} = ${aires[k]} ${a.u}.`
    ),
  };
}

// Deux rectangles accolés (forme en L), ou un rectangle dont on retire un carré.
const FORMES_EN_L: { u: string; lo: number; hi: number; phrase: (p: Prenom) => string; quoi: string; la: string }[] = [
  { u: "m", lo: 2, hi: 6, phrase: (p) => `La chambre ${de(p.nom)} a la forme d’un L.`, quoi: "de la chambre", la: "la" },
  { u: "m", lo: 2, hi: 8, phrase: (p) => `La terrasse ${de(p.nom)} a la forme d’un L.`, quoi: "de la terrasse", la: "la" },
  { u: "cm", lo: 2, hi: 9, phrase: (p) => `Sur son cahier, ${p.nom} dessine une figure en forme de L.`, quoi: "de la figure", la: "la" },
  { u: "m", lo: 3, hi: 9, phrase: () => `La salle de jeux du centre de loisirs a la forme d’un L.`, quoi: "de la salle", la: "la" },
  { u: "cm", lo: 3, hi: 12, phrase: (p) => `${p.nom} découpe dans du carton une pièce en forme de L.`, quoi: "de la pièce", la: "la" },
  { u: "m", lo: 2, hi: 5, phrase: (p) => `Le potager ${de(p.nom)} a la forme d’un L.`, quoi: "du potager", la: "le" },
];
const TROUS: { u: string; L: [number, number]; l: [number, number]; c: [number, number]; phrase: (p: Prenom, L: string, l: string, c: string) => string; question: string }[] = [
  { u: "m", L: [8, 15], l: [5, 9], c: [2, 4], phrase: (p, L, l, c) => `Le jardin ${de(p.nom)} est un rectangle de ${L} sur ${l}. Au milieu, il y a un bassin carré de ${c} de côté.`, question: "Quelle est l’aire du jardin sans le bassin ?" },
  { u: "m", L: [4, 7], l: [3, 4], c: [1, 2], phrase: (p, L, l, c) => `${p.nom} repeint un mur rectangulaire de ${L} sur ${l}. Il y a une fenêtre carrée de ${c} de côté.`, question: "Quelle aire faut-il peindre ?" },
  { u: "m", L: [20, 40], l: [15, 25], c: [3, 6], phrase: (_p, L, l, c) => `La cour de l’école est un rectangle de ${L} sur ${l}. On y installe un bac à sable carré de ${c} de côté.`, question: "Quelle aire de cour reste-t-il autour du bac ?" },
  { u: "cm", L: [21, 30], l: [15, 20], c: [5, 9], phrase: (p, L, l, c) => `${p.nom} colle une photo carrée de ${c} de côté sur une feuille de ${L} sur ${l}.`, question: "Quelle aire de la feuille reste visible ?" },
  { u: "m", L: [10, 16], l: [6, 9], c: [3, 5], phrase: (p, L, l, c) => `Le terrain ${de(p.nom)} mesure ${L} sur ${l}. Une cabane carrée de ${c} de côté y est posée.`, question: "Quelle aire de terrain reste libre ?" },
  { u: "cm", L: [30, 45], l: [20, 30], c: [8, 12], phrase: (p, L, l, c) => `${p.nom} découpe un carré de ${c} de côté dans un carton de ${L} sur ${l}.`, question: "Quelle est l’aire du carton qui reste ?" },
];

function tirerDecomposition() {
  const p = pick(PRENOMS);
  if (Math.random() < 0.55) {
    const f = pick(FORMES_EN_L);
    const r = () => {
      const x = randomInt(f.lo, f.hi);
      let y = randomInt(f.lo, f.hi);
      while (y === x) y = randomInt(f.lo, f.hi);
      return [x, y];
    };
    const [a, b] = r();
    let [c, d] = r();
    // Deux rectangles identiques (4 sur 5 et 5 sur 4) feraient un faux L.
    while ((c === a && d === b) || (c === b && d === a)) [c, d] = r();
    const u = f.u;
    return {
      text: `${f.phrase(p)} On ${f.la} découpe en deux rectangles : l’un de ${a} ${u} sur ${b} ${u}, l’autre de ${c} ${u} sur ${d} ${u}. ${pick([`Quelle est l’aire ${f.quoi} ?`, `Calcule l’aire ${f.quoi}.`, `Combien mesure l’aire ${f.quoi} ?`])}`,
      u,
      r: a * b + c * d,
      pieges: [a * b, c * d, a + b + c + d, a * b + c + d, a * b + c * d + 1],
      calc: `On ajoute les aires des deux rectangles : ${a} × ${b} + ${c} × ${d} = ${a * b} + ${c * d} = ${a * b + c * d} ${u}².`,
    };
  }
  const t = pick(TROUS);
  const L = randomInt(t.L[0], t.L[1]);
  const l = randomInt(t.l[0], t.l[1]);
  const c = randomInt(t.c[0], t.c[1]);
  const u = t.u;
  return {
    text: `${t.phrase(p, `${L} ${u}`, `${l} ${u}`, `${c} ${u}`)} ${t.question}`,
    u,
    r: L * l - c * c,
    pieges: [L * l, L * l + c * c, L * l - c, L * l - 4 * c],
    calc: `On part du grand rectangle et on retire le carré : ${L} × ${l} − ${c} × ${c} = ${L * l} − ${c * c} = ${L * l - c * c} ${u}².`,
  };
}

function genAireDecomposer(qcm: boolean) {
  const d = tirerDecomposition();
  const u2 = `${d.u}²`;
  if (!qcm)
    return { text: d.text, format: "short" as const, expected: avecUnite(d.r, u2), comparator: "number_equal" as const, explanation: expl(d.calc) };
  return {
    text: d.text,
    format: "qcm" as const,
    choices: makeChoices(`${nf(d.r)} ${u2}`, d.pieges.map((x) => `${nf(x)} ${u2}`)),
    expected: [`${nf(d.r)} ${u2}`],
    comparator: "mcq_exact" as const,
    explanation: expl(d.calc),
  };
}

// ─── aire_probleme ──────────────────────────────────────────────────────────
// L'aire n'est plus la réponse : elle sert à acheter, à payer, à compter des pots.
const LIEUX: { nom: string; f: boolean; L: [number, number]; l: [number, number] }[] = [
  { nom: "chambre", f: true, L: [3, 5], l: [2, 3] },
  { nom: "salon", f: false, L: [5, 8], l: [3, 5] },
  { nom: "terrasse", f: true, L: [4, 8], l: [2, 4] },
  { nom: "cabane", f: true, L: [2, 4], l: [2, 3] },
  { nom: "bureau", f: false, L: [3, 4], l: [2, 3] },
  { nom: "garage", f: false, L: [5, 7], l: [3, 4] },
  { nom: "atelier", f: false, L: [4, 6], l: [3, 4] },
  { nom: "salle de jeux", f: true, L: [4, 7], l: [3, 5] },
];
const MATERIAUX: { quoi: string; Quoi: string; pl?: boolean; prix: [number, number] }[] = [
  { quoi: "du carrelage", Quoi: "Le carrelage", prix: [15, 30] },
  { quoi: "de la moquette", Quoi: "La moquette", prix: [8, 20] },
  { quoi: "du parquet", Quoi: "Le parquet", prix: [20, 40] },
  { quoi: "du lino", Quoi: "Le lino", prix: [6, 15] },
  { quoi: "des dalles en caoutchouc", Quoi: "Les dalles en caoutchouc", pl: true, prix: [10, 25] },
  { quoi: "des dalles de liège", Quoi: "Les dalles de liège", pl: true, prix: [9, 18] },
];
type Lieu = { nom: string; f: boolean };
const POTS: { action: (o: Lieu) => string; objet: string; objets: string; couvre: number[] }[] = [
  { action: (o) => `veut repeindre le sol ${duLieu(o)}`, objet: "Un pot de peinture", objets: "pots", couvre: [2, 3, 4, 5] },
  { action: (o) => `veut vernir le sol ${duLieu(o)}`, objet: "Un bidon de vernis", objets: "bidons", couvre: [3, 4, 5, 6] },
  { action: (o) => `veut poser du parquet dans ${leLieu(o)}`, objet: "Un paquet de lames", objets: "paquets", couvre: [2, 3] },
  { action: (o) => `veut carreler le sol ${duLieu(o)}`, objet: "Un carton de carreaux", objets: "cartons", couvre: [1, 2] },
  { action: (o) => `veut couvrir de dalles le sol ${duLieu(o)}`, objet: "Un lot de dalles", objets: "lots", couvre: [2, 4] },
];
const duLieu = (o: { nom: string; f: boolean }) => (/^[aeiou]/.test(o.nom) ? `de l’${o.nom}` : o.f ? `de la ${o.nom}` : `du ${o.nom}`);
const leLieu = (o: { nom: string; f: boolean }) => (/^[aeiou]/.test(o.nom) ? `l’${o.nom}` : o.f ? `la ${o.nom}` : `le ${o.nom}`);

function genAireProblemeSimple() {
  const p = pick(PRENOMS);
  const o = pick(LIEUX);
  const m = pick(MATERIAUX);
  let L = randomInt(o.L[0], o.L[1]);
  let l = randomInt(o.l[0], o.l[1]);
  while (l >= L) [L, l] = [randomInt(o.L[0], o.L[1]), randomInt(o.l[0], o.l[1])];
  const A = L * l;
  const text = pick([
    `${p.nom} veut poser ${m.quoi} dans ${leLieu(o)}. ${maj(leLieu(o))} mesure ${L} m sur ${l} m. ${m.Quoi} se ${m.pl ? "vendent" : "vend"} au m². Combien de m² doit-${il(p)} acheter ?`,
    `${maj(leLieu(o))} ${de(p.nom)} mesure ${L} m de long et ${l} m de large. ${Il(p)} veut couvrir tout le sol avec ${m.quoi}. Quelle aire doit-${il(p)} couvrir ?`,
    `Pour couvrir le sol ${duLieu(o)}, ${p.nom} mesure : ${l} m de large, ${L} m de long. Combien de m² ${m.quoi.replace(/^(du|de la|des) /, "de ")} lui faut-il ?`,
  ]);
  return {
    text,
    format: "short" as const,
    expected: avecUnite(A, "m²"),
    comparator: "number_equal" as const,
    explanation: expl(`Le sol est un rectangle : ${L} × ${l} = ${A}. Il faut couvrir ${A} m².`),
  };
}

function tirerLieu(decimal: boolean) {
  const o = pick(LIEUX);
  let L = randomInt(o.L[0], o.L[1]);
  let l = randomInt(o.l[0], o.l[1]);
  while (l >= L) [L, l] = [randomInt(o.L[0], o.L[1]), randomInt(o.l[0], o.l[1])];
  if (decimal) L += pick([0.5, 0.25, 0.75]);
  return { o, L, l, A: L * l };
}

function genAireProblemeDeuxEtapes(qcm: boolean) {
  const p = pick(PRENOMS);
  const prix = Math.random() < (qcm ? 1 : 0.55);
  if (prix) {
    const { o, L, l, A } = tirerLieu(qcm && Math.random() < 0.7);
    const m = pick(MATERIAUX);
    const pu = randomInt(m.prix[0], m.prix[1]);
    const cout = A * pu;
    const text = pick([
      `${p.nom} veut poser ${m.quoi} dans ${leLieu(o)}, qui mesure ${nf(L)} m sur ${l} m. ${m.Quoi} ${m.pl ? "coûtent" : "coûte"} ${pu} € le m². Combien va-t-${il(p)} payer ?`,
      `${maj(leLieu(o))} ${de(p.nom)} mesure ${nf(L)} m de long et ${l} m de large. ${m.Quoi} ${m.pl ? "coûtent" : "coûte"} ${pu} € le m². Quel est le prix pour couvrir tout le sol ?`,
      `${m.Quoi} ${m.pl ? "coûtent" : "coûte"} ${pu} € le m². ${p.nom} en veut pour tout le sol ${duLieu(o)} : ${nf(L)} m sur ${l} m. Calcule le prix à payer.`,
    ]);
    const calc = `D’abord l’aire du sol : ${nf(L)} × ${l} = ${nf(A)} m². Puis le prix : ${nf(A)} × ${pu} = ${nf(cout)} €.`;
    if (!qcm) return { text, format: "short" as const, expected: avecUnite(cout, "€"), comparator: "number_equal" as const, explanation: expl(calc) };
    return {
      text,
      format: "qcm" as const,
      choices: makeChoices(`${nf(cout)} €`, [
        `${nf(2 * (L + l) * pu)} €`,
        `${nf((L + l) * pu)} €`,
        `${nf(A + pu)} €`,
        `${nf(cout + pu)} €`,
      ]),
      expected: [`${nf(cout)} €`],
      comparator: "mcq_exact" as const,
      explanation: expl(`${calc} Le piège : multiplier le prix par le périmètre, ou par la somme des côtés.`),
    };
  }
  // Combien de pots, de paquets… : l'aire divisée par ce que couvre un pot.
  for (;;) {
    const { o, L, l, A } = tirerLieu(false);
    const c = pick(POTS);
    const k = pick(c.couvre.filter((x) => A % x === 0 && A / x >= 2));
    if (!k) continue;
    const n = A / k;
    const text = `${p.nom} ${c.action(o)}. ${maj(leLieu(o))} mesure ${L} m sur ${l} m. ${c.objet} couvre ${k} m². Combien de ${c.objets} lui faut-il ?`;
    return {
      text,
      format: "short" as const,
      expected: avecUnite(n, c.objets),
      comparator: "number_equal" as const,
      explanation: expl(`D’abord l’aire : ${L} × ${l} = ${A} m². Chacun couvre ${k} m², donc ${A} ÷ ${k} = ${n}. Il faut ${n} ${c.objets}.`),
    };
  }
}

// ─── aire_defi ──────────────────────────────────────────────────────────────
const FOIS_MOTS: Record<number, string> = { 2: "deux", 3: "trois" };

/** ★4 : un côté deux fois plus long ne donne pas une aire deux fois plus grande ; même périmètre, aires différentes. */
function genAireDefiPieges() {
  const [p, q] = deuxPrenoms();
  if (Math.random() < 0.5) {
    const u = pick(["cm", "m", "dm"]);
    const c = randomInt(2, 8);
    const k = pick([2, 3]);
    const A = c * c;
    const B = k * c * k * c;
    const text = pick([
      `${p.nom} trace un carré de ${c} ${u} de côté. Puis ${il(p)} trace un carré dont le côté est ${FOIS_MOTS[k]} fois plus long. Quelle est l’aire du grand carré ?`,
      `Un carré a des côtés de ${c} ${u}. ${p.nom} rend chaque côté ${FOIS_MOTS[k]} fois plus long. Quelle est l’aire du nouveau carré ?`,
      `${p.nom} agrandit un carré de côté ${c} ${u} : chaque côté devient ${FOIS_MOTS[k]} fois plus long. Que vaut l’aire du carré agrandi ?`,
    ]);
    return {
      text,
      format: "qcm" as const,
      choices: makeChoices(`${B} ${u}²`, [`${k * A} ${u}²`, `${A + k} ${u}²`, `${4 * k * c} ${u}²`, `${B + A} ${u}²`]),
      expected: [`${B} ${u}²`],
      comparator: "mcq_exact" as const,
      explanation: expl(
        `Le nouveau côté mesure ${k} × ${c} = ${k * c} ${u}. L’aire est ${k * c} × ${k * c} = ${B} ${u}². Elle n’est pas ${k} fois plus grande (${k * A} ${u}²) mais ${k} × ${k} = ${k * k} fois plus grande.`
      ),
    };
  }
  // Même périmètre, aires différentes : le carré gagne toujours.
  const u = pick(["cm", "m"]);
  const c = randomInt(4, 12);
  const d = randomInt(1, c - 1);
  const [a, b] = [c + d, c - d];
  const carre = `le carré ${de(p.nom)}`;
  const rect = `le rectangle ${de(q.nom)}`;
  const text = pick([
    `${p.nom} dessine un carré de ${c} ${u} de côté. ${q.nom} dessine un rectangle de ${a} ${u} sur ${b} ${u}. Les deux figures ont le même périmètre. Laquelle a la plus grande aire ?`,
    `Le carré ${de(p.nom)} a des côtés de ${c} ${u}. Le rectangle ${de(q.nom)} mesure ${a} ${u} sur ${b} ${u}. Ils ont le même périmètre. Lequel a la plus grande aire ?`,
  ]);
  return {
    text,
    format: "qcm" as const,
    choices: shuffle([carre, rect, "ils ont la même aire"]),
    expected: [carre],
    comparator: "mcq_exact" as const,
    explanation: expl(
      `Les périmètres sont égaux : 4 × ${c} = ${4 * c} et 2 × (${a} + ${b}) = ${2 * (a + b)}. Mais les aires non : ${c} × ${c} = ${c * c} ${u}² pour le carré, ${a} × ${b} = ${a * b} ${u}² pour le rectangle. Même périmètre ne veut pas dire même aire.`
    ),
  };
}

/** ★5 : retrouver un côté à partir de l'aire (division écrite « ÷ »). */
function genAireDefiCoteManquant() {
  const p = pick(PRENOMS);
  const o = pick(RECTANGLES.filter((x) => x.L[1] <= 45));
  let L = randomInt(o.L[0], o.L[1]);
  let l = randomInt(o.l[0], o.l[1]);
  while (l >= L) [L, l] = [randomInt(o.L[0], o.L[1]), randomInt(o.l[0], o.l[1])];
  const A = L * l;
  const u = o.u;
  const chercheLargeur = Math.random() < 0.6;
  const connu = chercheLargeur ? L : l;
  const r = chercheLargeur ? l : L;
  const text = pick([
    `${maj(leNom(o))} ${de(p.nom)} a une aire de ${A} ${u}². ${o.f ? "Elle" : "Il"} mesure ${connu} ${u} de ${chercheLargeur ? "long" : "large"}. Quelle est sa ${chercheLargeur ? "largeur" : "longueur"} ?`,
    `${p.nom} sait que ${leNom(o)} a une aire de ${A} ${u}² et une ${chercheLargeur ? "longueur" : "largeur"} de ${connu} ${u}. Combien mesure sa ${chercheLargeur ? "largeur" : "longueur"} ?`,
    `Aire ${duNom(o)} : ${A} ${u}². ${chercheLargeur ? "Longueur" : "Largeur"} : ${connu} ${u}. Trouve sa ${chercheLargeur ? "largeur" : "longueur"}.`,
  ]);
  return {
    text,
    format: "short" as const,
    expected: avecUnite(r, u),
    comparator: "number_equal" as const,
    explanation: expl(
      `L’aire est longueur × largeur. On cherche le nombre qui, multiplié par ${connu}, donne ${A} : ${A} ÷ ${connu} = ${r}. Vérification : ${connu} × ${r} = ${A}. La ${chercheLargeur ? "largeur" : "longueur"} est ${r} ${u}.`
    ),
  };
}

/** ★5 : le côté d'un carré dont on connaît l'aire, parfois puis son périmètre. */
function genAireDefiCarreInverse() {
  const p = pick(PRENOMS);
  const o = pick(CARRES);
  const c = randomInt(Math.max(2, o.L[0]), Math.min(o.L[1], 15));
  const A = c * c;
  const u = o.u;
  const perimetre = Math.random() < 0.35;
  const intro = pick([
    `${maj(leNom(o))} ${de(p.nom)} est carré${o.f ? "e" : ""}. Son aire est ${A} ${u}².`,
    `${p.nom} a ${o.f ? "une" : "un"} ${o.nom} carré${o.f ? "e" : ""} de ${A} ${u}².`,
  ]);
  const question = perimetre
    ? pick(["Quel est son périmètre ?", "Combien mesure son tour ?"])
    : pick(["Combien mesure son côté ?", "Quelle est la longueur d’un côté ?"]);
  const r = perimetre ? 4 * c : c;
  return {
    text: `${intro} ${question}`,
    format: "short" as const,
    expected: avecUnite(r, u),
    comparator: "number_equal" as const,
    explanation: expl(
      `On cherche le nombre qui, multiplié par lui-même, donne ${A} : ${c} × ${c} = ${A}. Le côté mesure ${c} ${u}.${perimetre ? ` Le périmètre est 4 × ${c} = ${4 * c} ${u}.` : ""}`
    ),
  };
}

export const airesBank: TutorBankItemV4[] = [
  // =========================
  // AREA_COMPRENDRE
  // =========================
  {
    kind: "fixed",
    id: "aire_comprendre_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_unite",
    microId: "aire_comprendre",
    difficulty: 1,
    theme: "neutral",
    text: "L’aire d’une figure mesure…",
    format: "qcm",
    choices: ["son contour", "sa surface", "sa longueur", "son angle"],
    expected: ["sa surface"],
    comparator: "mcq_exact",
    hint: "L’aire mesure la place occupée à l’intérieur.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("L’aire mesure la surface occupée par une figure, c’est-à-dire tout l’intérieur de la figure.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_unite", "comprendre", "qcm"],
  },
  {
    kind: "fixed",
    id: "aire_comprendre_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_unite",
    microId: "aire_comprendre",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle unité convient pour mesurer une aire ?",
    format: "qcm",
    choices: ["cm", "cm²", "cm³", "g"],
    expected: ["cm²"],
    comparator: "mcq_exact",
    hint: "Une aire se mesure en unités carrées.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("Une aire se mesure avec des unités carrées. Par exemple, on utilise cm² pour mesurer une surface.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_unite", "comprendre", "qcm"],
  },
  {
    kind: "fixed",
    id: "aire_comprendre_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_unite",
    microId: "aire_comprendre",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle écriture correspond à une aire ?",
    format: "qcm",
    choices: ["15 cm", "15 cm²", "15 cm³", "15 kg"],
    expected: ["15 cm²"],
    comparator: "mcq_exact",
    hint: "Cherche l’unité carrée.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("15 cm est une longueur, 15 cm³ un volume, 15 kg une masse. Une aire s’écrit ici 15 cm².") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_unite", "comprendre", "qcm"],
  },
  {
    kind: "fixed",
    id: "aire_comprendre_reunion_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_unite",
    microId: "aire_comprendre",
    difficulty: 2,
    theme: "reunion",
    text: "Pour mesurer la surface d’un jardin à La Réunion, on peut utiliser…",
    format: "qcm",
    choices: ["m", "m²", "m³", "L"],
    expected: ["m²"],
    comparator: "mcq_exact",
    hint: "Une surface se mesure en unités carrées.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("La surface d’un jardin est une aire. On la mesure donc en mètres carrés, notés m².") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_unite", "comprendre", "reunion", "qcm"],
  },
  {
    kind: "fixed",
    id: "aire_comprendre_confusion_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_unite",
    microId: "aire_comprendre",
    difficulty: 3,
    theme: "neutral",
    text: "Un rectangle mesure 5 cm sur 4 cm. Quelle grandeur vaut 20 ?",
    format: "qcm",
    choices: ["son périmètre en cm", "son aire en cm²", "son contour en cm²", "son volume en cm³"],
    expected: ["son aire en cm²"],
    comparator: "mcq_exact",
    hint: "Pour l’aire du rectangle, on multiplie longueur et largeur.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("Pour un rectangle de 5 cm sur 4 cm, l’aire vaut 5 × 4 = 20 cm². Le périmètre vaudrait 18 cm.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_unite", "comprendre", "confusion", "qcm"],
  },

  // =========================
  // AREA_COMPTER
  // =========================
  {
    kind: "fixed",
    id: "aire_compter_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_unite",
    microId: "aire_compter",
    difficulty: 1,
    theme: "neutral",
    text: "Une surface recouvre 6 carreaux unités. Quelle est son aire ?",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "On compte les carreaux unités.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("Quand on mesure une aire par comptage, on compte les carreaux unités. Ici, 6 carreaux donnent une aire de 6 unités d’aire.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_unite", "compter"],
  },
  {
    kind: "fixed",
    id: "aire_compter_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_unite",
    microId: "aire_compter",
    difficulty: 2,
    theme: "neutral",
    text: "Une figure occupe 12 carreaux unités. Quelle est son aire ?",
    format: "short",
    expected: ["12"],
    comparator: "number_equal",
    hint: "L’aire est égale au nombre de carreaux unités.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("L’aire d’une figure mesurée sur quadrillage est le nombre de carreaux unités qu’elle recouvre. Ici, cela fait 12.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_unite", "compter"],
  },
  {
    kind: "fixed",
    id: "aire_compter_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_unite",
    microId: "aire_compter",
    difficulty: 2,
    theme: "neutral",
    text: "Une figure recouvre 9 carreaux unités. Son aire vaut…",
    format: "qcm",
    choices: ["6", "8", "9", "18"],
    expected: ["9"],
    comparator: "mcq_exact",
    hint: "On compte les carreaux.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("Chaque carreau unité compte pour 1 unité d’aire. Avec 9 carreaux, l’aire est donc 9.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_unite", "compter", "qcm"],
  },
  {
    kind: "fixed",
    id: "aire_compter_qcm_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_unite",
    microId: "aire_compter",
    difficulty: 3,
    theme: "neutral",
    text: "Une surface couvre 3 rangées de 4 carreaux unités. Quelle est son aire ?",
    format: "qcm",
    choices: ["7", "10", "12", "14"],
    expected: ["12"],
    comparator: "mcq_exact",
    hint: "3 × 4 carreaux.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("Il y a 3 rangées de 4 carreaux, donc 3 × 4 = 12 carreaux unités. L’aire est 12.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_unite", "compter", "qcm"],
  },
  {
    kind: "fixed",
    id: "aire_compter_canvas_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_unite",
    microId: "aire_compter",
    difficulty: 3,
    theme: "neutral",
    text: "Observe la figure sur quadrillage. Quelle est son aire en unités d’aire ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "Compte les carreaux remplis.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("La figure recouvre 5 carreaux unités. Son aire vaut donc 5 unités d’aire.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_unite", "compter", "canvas"],
    canvas: {
      kind: "figure_libre",
      grid: {
        rows: 5,
        cols: 5,
        filledCells: [
          [1, 1],
          [1, 2],
          [2, 1],
          [2, 2],
          [3, 1],
        ],
      },
      display: {
        showGrid: true,
        showFilled: true,
      },
    },
  },
  {
    kind: "fixed",
    id: "aire_compter_canvas_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_unite",
    microId: "aire_compter",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle est l’aire de cette figure sur quadrillage ?",
    format: "qcm",
    choices: ["4", "5", "6", "8"],
    expected: ["6"],
    comparator: "mcq_exact",
    hint: "Compte uniquement les carreaux remplis.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("La figure recouvre 6 carreaux unités. Son aire vaut donc 6 unités d’aire.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_unite", "compter", "canvas", "qcm"],
    canvas: {
      kind: "figure_libre",
      grid: {
        rows: 5,
        cols: 5,
        filledCells: [
          [1, 1],
          [1, 2],
          [1, 3],
          [2, 1],
          [2, 2],
          [3, 1],
        ],
      },
      display: {
        showGrid: true,
        showFilled: true,
      },
    },
  },

  // =========================
  // AREA_RECTANGLE
  // =========================
  {
    kind: "fixed",
    id: "aire_rectangle_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_rectangle",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle est l’aire d’un rectangle de 4 cm sur 3 cm ?",
    format: "short",
    expected: ["12 cm²"],
    comparator: "number_equal",
    hint: "Aire du rectangle = longueur × largeur.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("L’aire d’un rectangle se calcule en multipliant la longueur par la largeur : 4 × 3 = 12. L’aire est donc 12 cm².") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_surface", "rectangle"],
  },
  {
    kind: "fixed",
    id: "aire_rectangle_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_rectangle",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est l’aire d’un rectangle de 6 cm sur 4 cm ?",
    format: "qcm",
    choices: ["10 cm²", "20 cm²", "24 cm²", "28 cm²"],
    expected: ["24 cm²"],
    comparator: "mcq_exact",
    hint: "Pour l’aire, on multiplie longueur et largeur.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("On applique la formule de l’aire du rectangle : 6 × 4 = 24. L’aire est donc 24 cm².") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_surface", "rectangle", "qcm"],
  },
  {
    kind: "fixed",
    id: "aire_rectangle_confusion_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_rectangle",
    difficulty: 3,
    theme: "neutral",
    text: "Un rectangle mesure 8 cm de longueur et 5 cm de largeur. Quelle est son aire ?",
    format: "qcm",
    choices: ["13 cm²", "26 cm²", "40 cm²", "16 cm²"],
    expected: ["40 cm²"],
    comparator: "mcq_exact",
    hint: "Attention à ne pas confondre aire et périmètre.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("L’aire d’un rectangle est longueur × largeur. Ici, 8 × 5 = 40. L’aire est donc 40 cm².") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_surface", "rectangle", "confusion", "qcm"],
  },
  {
    kind: "fixed",
    id: "aire_rectangle_canvas_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_rectangle",
    difficulty: 3,
    theme: "neutral",
    text: "Observe la figure. Quelle est l’aire du rectangle ABCD ?",
    format: "short",
    expected: ["18 cm²"],
    comparator: "number_equal",
    hint: "Multiplie la longueur par la largeur.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("Le rectangle a une longueur de 6 cm et une largeur de 3 cm. Son aire vaut 6 × 3 = 18 cm².") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_surface", "rectangle", "canvas"],
    canvas: {
      kind: "quadrilatere",
      points: {
        A: { x: 60, y: 80 },
        B: { x: 240, y: 80 },
        C: { x: 240, y: 170 },
        D: { x: 60, y: 170 },
      },
      sideLabels: {
        AB: "6 cm",
        BC: "3 cm",
      },
      display: {
        showPoints: true,
        showLabels: true,
        showSides: true,
        showAngles: false,
      },
      marks: {
        rightAnglesAt: ["A", "B", "C", "D"],
        equalSides: [["AB", "CD"], ["BC", "DA"]],
      },
    },
  },

  // =========================
  // AREA_SQUARE
  // =========================
  {
    kind: "fixed",
    id: "aire_carre_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_carre",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle est l’aire d’un carré de côté 5 cm ?",
    format: "short",
    expected: ["25 cm²"],
    comparator: "number_equal",
    hint: "Aire du carré = côté × côté.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("Dans un carré, les côtés sont égaux. On calcule donc 5 × 5 = 25. L’aire est 25 cm².") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_surface", "carre"],
  },
  {
    kind: "fixed",
    id: "aire_carre_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_carre",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est l’aire d’un carré de côté 7 cm ?",
    format: "qcm",
    choices: ["14 cm²", "28 cm²", "49 cm²", "21 cm²"],
    expected: ["49 cm²"],
    comparator: "mcq_exact",
    hint: "Il faut multiplier le côté par lui-même.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("L’aire d’un carré de côté 7 cm vaut 7 × 7 = 49. La bonne réponse est 49 cm².") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_surface", "carre", "qcm"],
  },
  {
    kind: "fixed",
    id: "aire_carre_confusion_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_carre",
    difficulty: 3,
    theme: "neutral",
    text: "Choisis la bonne réponse : l’aire d’un carré de côté 9 cm est...",
    format: "qcm",
    choices: ["18 cm²", "36 cm²", "81 cm²", "27 cm²"],
    expected: ["81 cm²"],
    comparator: "mcq_exact",
    hint: "Un carré de côté 9 a une aire de 9 × 9.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("Pour un carré, on calcule côté × côté. Ici 9 × 9 = 81. L’aire est donc 81 cm².") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_surface", "carre", "confusion", "qcm"],
  },
  {
    kind: "fixed",
    id: "aire_carre_canvas_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_carre",
    difficulty: 3,
    theme: "neutral",
    text: "Observe la figure. Quelle est l’aire du carré ABCD ?",
    format: "short",
    expected: ["16 cm²"],
    comparator: "number_equal",
    hint: "Dans un carré, on fait côté × côté.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("Le côté du carré mesure 4 cm. Son aire vaut donc 4 × 4 = 16 cm².") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_surface", "carre", "canvas"],
    canvas: {
      kind: "quadrilatere",
      points: {
        A: { x: 80, y: 70 },
        B: { x: 180, y: 70 },
        C: { x: 180, y: 170 },
        D: { x: 80, y: 170 },
      },
      sideLabels: {
        AB: "4 cm",
      },
      display: {
        showPoints: true,
        showLabels: true,
        showSides: true,
        showAngles: false,
      },
      marks: {
        rightAnglesAt: ["A", "B", "C", "D"],
        equalSides: [["AB", "BC"], ["BC", "CD"], ["CD", "DA"]],
      },
    },
  },

  // =========================
  // AREA_COMPARER
  // =========================
  {
    kind: "fixed",
    id: "aire_comparer_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle aire est la plus grande : 12 cm² ou 15 cm² ?",
    format: "short",
    // ⛔ 06/10/2026 : contains_keyword « 15 » acceptait « 150 » → numérique, unité comprise.
    expected: ["15 cm²"],
    comparator: "number_equal",
    hint: "Compare les nombres 12 et 15.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("Les deux aires sont dans la même unité. On compare donc 12 et 15. Comme 15 est plus grand, 15 cm² est la plus grande aire.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_surface", "comparer"],
  },
  {
    kind: "fixed",
    id: "aire_comparer_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle aire est la plus petite : 20 cm² ou 9 cm² ?",
    format: "short",
    expected: ["9 cm²"],
    comparator: "number_equal",
    hint: "Compare les nombres.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("Comme les unités sont identiques, il suffit de comparer 20 et 9. La plus petite aire est 9 cm².") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_surface", "comparer"],
  },
  {
    kind: "fixed",
    id: "aire_comparer_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_comparer",
    difficulty: 3,
    theme: "neutral",
    text: "Quel rectangle a la plus grande aire ?",
    format: "qcm",
    choices: ["8 cm²", "14 cm²", "11 cm²", "13 cm²"],
    expected: ["14 cm²"],
    comparator: "mcq_exact",
    hint: "Choisis la plus grande valeur.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("La plus grande des quatre aires proposées est 14 cm². C’est donc la bonne réponse.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_surface", "comparer", "qcm"],
  },
  {
    kind: "fixed",
    id: "aire_comparer_reunion_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_comparer",
    difficulty: 3,
    theme: "reunion",
    text: "À La Réunion, quel potager est le plus grand : 18 m² ou 21 m² ?",
    format: "short",
    expected: ["21 m²"],
    comparator: "number_equal",
    hint: "Le plus grand nombre donne la plus grande aire.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("18 m² et 21 m² sont deux aires. Comme 21 est plus grand que 18, le potager de 21 m² est le plus grand.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_surface", "comparer", "reunion"],
  },
  {
    kind: "fixed",
    id: "aire_comparer_qcm_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_comparer",
    difficulty: 4,
    theme: "neutral",
    text: "Quel carré a la plus grande aire ?",
    format: "qcm",
    choices: ["côté 3 cm", "côté 4 cm", "côté 5 cm", "côté 6 cm"],
    expected: ["côté 6 cm"],
    comparator: "mcq_exact",
    hint: "L’aire du carré vaut côté × côté.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("Les aires valent 9 cm², 16 cm², 25 cm² et 36 cm². La plus grande aire est celle du carré de côté 6 cm.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_surface", "comparer", "qcm", "carre"],
  },

  // =========================
  // AREA_DECOMPOSER
  // =========================
  {
    kind: "fixed",
    id: "aire_decomposer_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_decomposer",
    difficulty: 3,
    theme: "neutral",
    text: "Une figure est formée de deux rectangles de 8 cm² et 5 cm². Quelle est son aire totale ?",
    format: "short",
    expected: ["13 cm²"],
    comparator: "number_equal",
    hint: "On additionne les aires des deux rectangles.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("Quand une figure est décomposée en deux rectangles sans chevauchement, on additionne les aires : 8 + 5 = 13 cm².") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_surface", "decomposer"],
  },
  {
    kind: "fixed",
    id: "aire_decomposer_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_decomposer",
    difficulty: 3,
    theme: "neutral",
    text: "Une figure est composée d’un rectangle de 12 cm² et d’un carré de 9 cm². Quelle est son aire ?",
    format: "short",
    expected: ["21 cm²"],
    comparator: "number_equal",
    hint: "Additionne les aires des deux parties.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("On décompose la figure en deux parties simples : 12 cm² et 9 cm². Leur somme vaut 21 cm².") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_surface", "decomposer"],
  },
  {
    kind: "fixed",
    id: "aire_decomposer_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_decomposer",
    difficulty: 4,
    theme: "neutral",
    text: "Une figure en L est décomposée en deux rectangles d’aires 10 cm² et 6 cm². Quelle est l’aire totale ?",
    format: "qcm",
    choices: ["14 cm²", "16 cm²", "20 cm²", "60 cm²"],
    expected: ["16 cm²"],
    comparator: "mcq_exact",
    hint: "On additionne les aires des deux rectangles.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("La figure en L est découpée en deux rectangles. L’aire totale vaut 10 + 6 = 16 cm².") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_surface", "decomposer", "qcm"],
  },
  {
    kind: "fixed",
    id: "aire_decomposer_qcm_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_decomposer",
    difficulty: 4,
    theme: "neutral",
    text: "Pour calculer l’aire d’une figure composée, que peut-on faire ?",
    format: "qcm",
    choices: [
      "multiplier toutes les longueurs",
      "la découper en figures simples",
      "additionner tous les périmètres",
      "chercher seulement le contour",
    ],
    expected: ["la découper en figures simples"],
    comparator: "mcq_exact",
    hint: "On cherche une méthode pour transformer une figure complexe en figures connues.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("Pour calculer l’aire d’une figure composée, on peut la décomposer en rectangles ou carrés plus simples, puis additionner leurs aires.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_surface", "decomposer", "qcm", "methode"],
  },
  {
    kind: "fixed",
    id: "aire_decomposer_canvas_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_decomposer",
    difficulty: 4,
    theme: "neutral",
    text: "La figure sur quadrillage est décomposée en deux rectangles d’aires 4 et 2. Quelle est son aire totale ?",
    format: "short",
    // ⛔ 06/10/2026 : contains_keyword « 6 » acceptait « 16 » → numérique.
    expected: ["6 unités", "6"],
    comparator: "number_equal",
    hint: "Additionne les aires des deux parties.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("La figure peut être vue comme un rectangle de 4 unités d’aire et un autre de 2 unités d’aire. L’aire totale vaut 6.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_surface", "decomposer", "canvas"],
    canvas: {
      kind: "figure_libre",
      grid: {
        rows: 5,
        cols: 5,
        filledCells: [
          [1, 1],
          [1, 2],
          [1, 3],
          [2, 1],
          [2, 2],
          [3, 1],
        ],
      },
      display: {
        showGrid: true,
        showFilled: true,
      },
    },
  },

  // =========================
  // AREA_PROBLEMES
  // =========================
  {
    kind: "fixed",
    id: "aire_probleme_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_probleme",
    difficulty: 4,
    theme: "neutral",
    text: "Un jardin rectangulaire mesure 7 m de long et 3 m de large. Quelle est son aire ?",
    format: "short",
    expected: ["21 m²"],
    comparator: "number_equal",
    hint: "Aire du rectangle = longueur × largeur.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("Le jardin est un rectangle. Son aire vaut 7 × 3 = 21 m².") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_surface", "probleme"],
  },
  {
    kind: "fixed",
    id: "aire_probleme_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_probleme",
    difficulty: 4,
    theme: "reunion",
    text: "À La Réunion, une parcelle rectangulaire mesure 8 m sur 5 m. Quelle est son aire ?",
    format: "short",
    expected: ["40 m²"],
    comparator: "number_equal",
    hint: "Multiplie la longueur par la largeur.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("Comme la parcelle est rectangulaire, on calcule son aire en faisant 8 × 5 = 40 m².") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_surface", "probleme", "reunion"],
  },
  {
    kind: "fixed",
    id: "aire_probleme_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_probleme",
    difficulty: 5,
    theme: "neutral",
    text: "Une pièce rectangulaire mesure 4,5 m sur 2 m. Quelle est son aire ?",
    format: "qcm",
    choices: ["6,5 m²", "9 m²", "13 m²", "4,5 m²"],
    expected: ["9 m²"],
    comparator: "mcq_exact",
    hint: "On multiplie 4,5 par 2.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("L’aire d’un rectangle se calcule par longueur × largeur. Ici, 4,5 × 2 = 9. L’aire est donc 9 m².") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_surface", "probleme", "qcm", "decimal_nombre"],
  },
  {
    kind: "fixed",
    id: "aire_probleme_qcm_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_probleme",
    difficulty: 5,
    theme: "neutral",
    text: "Un rectangle a une largeur de 3 m. Si sa longueur double, que devient son aire ?",
    format: "qcm",
    choices: ["elle diminue", "elle reste la même", "elle double", "elle triple"],
    expected: ["elle double"],
    comparator: "mcq_exact",
    hint: "L’aire = longueur × largeur.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("Si la largeur reste la même et que la longueur est multipliée par 2, alors l’aire est aussi multipliée par 2. Elle double.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_surface", "probleme", "qcm", "prop_proportionnalite"],
  },
  {
    kind: "fixed",
    id: "aire_probleme_qcm_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_probleme",
    difficulty: 5,
    theme: "neutral",
    text: "Une terrasse rectangulaire mesure 2,5 m sur 4 m. Quelle est son aire ?",
    format: "qcm",
    choices: ["6,5 m²", "10 m²", "12 m²", "20 m²"],
    expected: ["10 m²"],
    comparator: "mcq_exact",
    hint: "Multiplie 2,5 par 4.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("L’aire de la terrasse vaut 2,5 × 4 = 10 m².") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_surface", "probleme", "qcm", "decimal_nombre"],
  },

  // =========================
  // AREA_DEFIS
  // =========================
  {
    kind: "fixed",
    id: "aire_defi_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_defi",
    difficulty: 4,
    theme: "neutral",
    // 08/10/2026 : question rendue précise (Frédéric).
    text: "Un rectangle mesure 5 cm sur 3 cm.\nQuelle est son aire ?",
    format: "qcm",
    choices: ["15 cm²", "15 cm³", "15 cm", "16 cm"],
    expected: ["15 cm²"],
    comparator: "mcq_exact",
    hint: "Une aire mesure une surface : elle s’écrit en cm².",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : aire du rectangle = longueur × largeur. L’unité est le cm².\n\n" +
      "Calcul : " +
      ("5 × 3 = 15, donc 15 cm². Le cm³ sert pour un volume. 16 cm est le périmètre.") +
      "\n\nConclusion : l’aire est 15 cm².",
    tags: ["aire_surface", "defi", "raisonnement"],
  },
  {
    kind: "fixed",
    id: "aire_defi_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_defi",
    difficulty: 4,
    theme: "neutral",
    // ⛔ 06/10/2026 : question ouverte dont les mots-clés étaient « 6 », « 5 »…
    // (n'importe quelle réponse avec un 5 passait). QCM sur les mêmes pièges.
    text: "Pourquoi un carré de côté 6 cm a-t-il une aire plus grande qu’un carré de côté 5 cm ? Choisis la bonne explication.",
    format: "qcm",
    choices: [
      "6 × 6 = 36 cm² et 5 × 5 = 25 cm², et 36 est plus grand que 25",
      "6 + 6 = 12 cm² et 5 + 5 = 10 cm², et 12 est plus grand que 10",
      "6 cm est plus long que 5 cm, donc l’aire a seulement 1 cm² de plus",
      "4 × 6 = 24 cm² et 4 × 5 = 20 cm², et 24 est plus grand que 20",
    ],
    expected: ["6 × 6 = 36 cm² et 5 × 5 = 25 cm², et 36 est plus grand que 25"],
    comparator: "mcq_exact",
    hint: "Compare 6 × 6 et 5 × 5.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("Un carré de côté 6 cm a une aire de 6 × 6 = 36 cm². Un carré de côté 5 cm a une aire de 5 × 5 = 25 cm². Comme 36 est plus grand que 25, son aire est plus grande.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_surface", "defi", "raisonnement"],
  },
  {
    kind: "fixed",
    id: "aire_defi_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Deux rectangles peuvent-ils avoir la même aire mais des périmètres différents ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Compare par exemple 3 × 4 et 2 × 6.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("Oui. Deux rectangles peuvent avoir la même aire mais des périmètres différents. Par exemple, 3 × 4 et 2 × 6 ont tous deux une aire de 12 cm², mais pas le même périmètre.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_surface", "defi", "qcm", "raisonnement"],
  },
  {
    kind: "fixed",
    id: "aire_defi_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Si on double la longueur d’un rectangle sans changer sa largeur, que devient son aire ?",
    format: "qcm",
    choices: ["elle reste la même", "elle double", "elle triple", "elle diminue"],
    expected: ["elle double"],
    comparator: "mcq_exact",
    hint: "L’aire vaut longueur × largeur.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("Si la largeur reste la même et que la longueur est multipliée par 2, alors l’aire est aussi multipliée par 2. Elle double.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_surface", "defi", "qcm", "prop_proportionnalite"],
  },
  {
    kind: "fixed",
    id: "aire_defi_fixed_5",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Donne un exemple d’aire comprise entre 10 cm² et 15 cm².",
    format: "short",
    expected: ["11", "12", "13", "14"],
    comparator: "exact_text",
    hint: "Choisis un nombre strictement entre 10 et 15.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("Une aire strictement comprise entre 10 cm² et 15 cm² peut être 11 cm², 12 cm², 13 cm² ou 14 cm².") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_surface", "defi", "raisonnement"],
  },
  {
    kind: "fixed",
    id: "aire_defi_fixed_6",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Un carré a une aire de 36 cm². Combien mesure un côté ?",
    format: "short",
    expected: ["6 cm"],
    comparator: "number_equal",
    hint: "Cherche le nombre qui multiplié par lui-même donne 36.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("Comme 6 × 6 = 36, un carré d’aire 36 cm² a un côté de 6 cm.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_surface", "defi", "inverse"],
  },
  {
    kind: "fixed",
    id: "aire_defi_fixed_7",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Un rectangle a une aire de 24 cm² et une largeur de 4 cm. Quelle est sa longueur ?",
    format: "short",
    expected: ["6 cm"],
    comparator: "number_equal",
    hint: "Aire = longueur × largeur.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("Si l’aire vaut 24 cm² et la largeur 4 cm, alors la longueur vaut 24 ÷ 4 = 6 cm.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_surface", "defi", "inverse"],
  },
  {
    kind: "fixed",
    id: "aire_defi_canvas_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Observe la figure sur quadrillage. Cette figure a-t-elle la même aire qu’un rectangle de 3 unités sur 2 unités ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Le rectangle de 3 sur 2 a une aire de 6.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("Le rectangle de 3 unités sur 2 unités a une aire de 6. La figure sur quadrillage recouvre aussi 6 carreaux unités. Les deux aires sont donc égales.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_surface", "defi", "canvas", "qcm", "comparaison"],
    canvas: {
      kind: "figure_libre",
      grid: {
        rows: 5,
        cols: 5,
        filledCells: [
          [1, 1],
          [1, 2],
          [1, 3],
          [2, 1],
          [2, 2],
          [3, 1],
        ],
      },
      display: {
        showGrid: true,
        showFilled: true,
      },
    },
  },
  {
    kind: "fixed",
    id: "aire_defi_reunion_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_defi",
    difficulty: 5,
    theme: "reunion",
    text: "À La Réunion, deux parcelles de 12 m² et 9 m² sont réunies. Quelle aire totale obtient-on ?",
    format: "short",
    expected: ["21 m²"],
    comparator: "number_equal",
    hint: "Additionne les deux aires.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("Quand on réunit deux parcelles sans chevauchement, on additionne leurs aires : 12 + 9 = 21 m².") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_surface", "defi", "reunion"],
  },

  // =========================
  // TEMPLATES - AREA_COMPRENDRE
  // =========================
  {
    kind: "template",
    id: "aire_comprendre_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_unite",
    microId: "aire_comprendre",
    difficulty: 1,
    theme: "neutral",
    hint: "Une aire se mesure en unités carrées.",
    tags: ["aire_unite", "comprendre", "template"],
    generate: () => genAireComprendreUnite(),
  },
  {
    kind: "template",
    id: "aire_comprendre_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_unite",
    microId: "aire_comprendre",
    difficulty: 2,
    theme: "neutral",
    hint: "Couvrir une surface, c’est l’aire ; faire le tour, c’est le périmètre.",
    tags: ["aire_unite", "comprendre", "template"],
    generate: () => (Math.random() < 0.7 ? genAireComprendreGrandeur() : genAireComprendreUnite()),
  },

  // =========================
  // TEMPLATES - AREA_COMPTER
  // =========================
  {
    kind: "template",
    id: "aire_compter_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_unite",
    microId: "aire_compter",
    difficulty: 2,
    theme: "neutral",
    hint: "Compte les carreaux unités.",
    tags: ["aire_unite", "compter", "template"],
    generate: () => genAireCompterLignes(),
  },
  {
    kind: "template",
    id: "aire_compter_qcm_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_unite",
    microId: "aire_compter",
    difficulty: 3,
    theme: "neutral",
    hint: "Multiplie les rangées par les carreaux de chaque rangée.",
    tags: ["aire_unite", "compter", "qcm", "template"],
    // makeChoices écarte les pièges qui tomberaient sur la bonne réponse
    // (à 3 rangées de 3, a + b + … pourrait coïncider) : cinq en réserve.
    generate: () => genAireCompterRangees(),
  },

  // =========================
  // TEMPLATES - AREA_RECTANGLE
  // =========================
  {
    kind: "template",
    id: "aire_rectangle_tpl_e1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_rectangle",
    difficulty: 1,
    theme: "neutral",
    hint: "Aire = longueur × largeur.",
    tags: ["aire_surface", "rectangle", "template"],
    generate: () => genAireRectangle(1),
  },
  {
    kind: "template",
    id: "aire_rectangle_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_rectangle",
    difficulty: 2,
    theme: "neutral",
    hint: "Aire = longueur × largeur.",
    tags: ["aire_surface", "rectangle", "template"],
    generate: () => genAireRectangle(2),
  },
  {
    kind: "template",
    id: "aire_rectangle_qcm_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_rectangle",
    difficulty: 3,
    theme: "neutral",
    hint: "Ne confonds pas aire et périmètre.",
    tags: ["aire_surface", "rectangle", "qcm", "template"],
    // Pièges : le périmètre, la somme, l'unité de longueur au lieu de l'unité carrée.
    generate: () => genAireRectangle(3),
  },

  // =========================
  // TEMPLATES - AREA_SQUARE
  // =========================
  {
    kind: "template",
    id: "aire_carre_tpl_e1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_carre",
    difficulty: 1,
    theme: "neutral",
    hint: "Aire du carré = côté × côté.",
    tags: ["aire_surface", "carre", "template"],
    generate: () => genAireCarre(1),
  },
  {
    kind: "template",
    id: "aire_carre_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_carre",
    difficulty: 2,
    theme: "neutral",
    hint: "Aire du carré = côté × côté.",
    tags: ["aire_surface", "carre", "template"],
    generate: () => genAireCarre(2),
  },
  {
    kind: "template",
    id: "aire_carre_qcm_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_carre",
    difficulty: 3,
    theme: "neutral",
    hint: "Pour un carré, on fait côté × côté.",
    tags: ["aire_surface", "carre", "qcm", "template"],
    generate: () => genAireCarre(3),
  },

  // =========================
  // TEMPLATES - AREA_COMPARER
  // =========================
  {
    kind: "template",
    id: "aire_comparer_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_comparer",
    difficulty: 2,
    theme: "neutral",
    hint: "Compare les deux nombres.",
    tags: ["aire_surface", "comparer", "template"],
    // ⛔ 06/10/2026 — était en contains_keyword avec « 15 » comme mot-clé :
    // « 15 » acceptait « 150 ». Comparateur numérique, unité comprise.
    generate: () => genAireComparerDeux(),
  },
  {
    kind: "template",
    id: "aire_comparer_tpl_e3",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_comparer",
    difficulty: 3,
    theme: "neutral",
    hint: "Calcule d’abord les deux aires, puis compare-les.",
    tags: ["aire_surface", "comparer", "qcm", "template"],
    generate: () => genAireComparerRectangles(),
  },

  // =========================
  // TEMPLATES - AREA_DECOMPOSER
  // =========================
  {
    kind: "template",
    id: "aire_decomposer_tpl_e3",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_decomposer",
    difficulty: 3,
    theme: "neutral",
    hint: "Les morceaux couvrent tout, sans se chevaucher : additionne leurs aires.",
    tags: ["aire_surface", "decomposer", "template"],
    generate: () => genAireDecomposerParties(),
  },
  {
    kind: "template",
    id: "aire_decomposer_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_decomposer",
    difficulty: 4,
    theme: "neutral",
    hint: "Découpe la figure en rectangles plus simples, ou retire ce qui manque.",
    tags: ["aire_surface", "decomposer", "template"],
    generate: () => genAireDecomposer(false),
  },
  {
    kind: "template",
    id: "aire_decomposer_qcm_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_decomposer",
    difficulty: 4,
    theme: "neutral",
    hint: "On additionne les aires des parties.",
    tags: ["aire_surface", "decomposer", "qcm", "template"],
    // Pièges : un seul des deux rectangles, la somme des côtés, le carré
    // ajouté au lieu d'être retiré. makeChoices écarte les pièges en double.
    generate: () => genAireDecomposer(true),
  },

  // =========================
  // TEMPLATES - AREA_PROBLEMES
  // =========================
  {
    kind: "template",
    id: "aire_probleme_tpl_e2",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_probleme",
    difficulty: 2,
    theme: "neutral",
    hint: "Le sol est un rectangle : longueur × largeur.",
    tags: ["aire_surface", "probleme", "template"],
    generate: () => genAireProblemeSimple(),
  },
  {
    kind: "template",
    id: "aire_probleme_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_probleme",
    difficulty: 4,
    theme: "neutral",
    hint: "Calcule d’abord l’aire, puis sers-t’en.",
    tags: ["aire_surface", "probleme", "template"],
    generate: () => genAireProblemeDeuxEtapes(false),
  },
  {
    kind: "template",
    id: "aire_probleme_qcm_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_probleme",
    difficulty: 5,
    theme: "neutral",
    hint: "L’aire = longueur × largeur.",
    tags: ["aire_surface", "probleme", "qcm", "template"],
    // Le prix d'un sol, souvent avec une longueur décimale (4,5 m ; 3,25 m).
    // Pièges : prix × périmètre, prix × (longueur + largeur), aire + prix.
    generate: () => genAireProblemeDeuxEtapes(true),
  },

  // =========================
  // TEMPLATES - AREA_DEFIS
  // =========================
  {
    kind: "template",
    id: "aire_defi_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Aire = longueur × largeur : quel nombre manque dans la multiplication ?",
    tags: ["aire_surface", "defi", "template"],
    // 06/10/2026 — était « donne une aire entre 9 et 14 cm² » : une phrase,
    // aucune aire à calculer. Remplacé par le côté manquant d'un rectangle.
    generate: () => genAireDefiCoteManquant(),
  },
  {
    kind: "template",
    id: "aire_defi_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Cherche le nombre qui multiplié par lui-même donne l’aire.",
    tags: ["aire_surface", "defi", "template", "inverse"],
    generate: () => genAireDefiCarreInverse(),
  },
  {
    kind: "template",
    id: "aire_defi_tpl_e4",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Calcule les aires au lieu de deviner.",
    tags: ["aire_surface", "defi", "qcm", "template"],
    generate: () => genAireDefiPieges(),
  },

  // ========== TOP-UP — AIRE_COMPRENDRE ==========
  {
    kind: "fixed", id: "aire_comprendre_topup_1", niveau: "6e", matiere: "maths",
    notionId: "aire_unite", microId: "aire_comprendre", difficulty: 1, theme: "neutral",
    text: "Le périmètre mesure le contour d’une figure. Que mesure l’aire ?",
    format: "qcm", choices: ["la surface", "le contour", "la hauteur", "le nombre de sommets"],
    expected: ["la surface"], comparator: "mcq_exact",
    hint: "L’aire concerne l’intérieur de la figure.",
    explanation: expl("L’aire mesure la surface, c’est-à-dire la place occupée à l’intérieur de la figure, contrairement au périmètre qui mesure le contour."),
    tags: ["aire_unite", "comprendre", "qcm"],
  },
  {
    kind: "fixed", id: "aire_comprendre_topup_2", niveau: "6e", matiere: "maths",
    notionId: "aire_unite", microId: "aire_comprendre", difficulty: 1, theme: "neutral",
    text: "Quelle unité convient pour mesurer l’aire d’un terrain de football ?",
    format: "qcm", choices: ["m²", "m", "m³", "kg"], expected: ["m²"], comparator: "mcq_exact",
    hint: "Une aire se mesure en unités carrées.",
    explanation: expl("Une aire se mesure en unités carrées. Pour une grande surface comme un terrain, on utilise le mètre carré (m²)."),
    tags: ["aire_unite", "comprendre", "qcm"],
  },
  {
    kind: "fixed", id: "aire_comprendre_topup_3", niveau: "6e", matiere: "maths",
    notionId: "aire_unite", microId: "aire_comprendre", difficulty: 2, theme: "neutral",
    text: "« 15 cm² » est une mesure de…",
    format: "qcm", choices: ["aire", "longueur", "masse", "durée"], expected: ["aire"], comparator: "mcq_exact",
    hint: "Le « ² » indique une unité carrée.",
    explanation: expl("L’unité cm² (centimètre carré) est une unité d’aire. « 15 cm² » est donc une mesure d’aire."),
    tags: ["aire_unite", "comprendre", "qcm"],
  },
  {
    kind: "fixed", id: "aire_comprendre_topup_4", niveau: "6e", matiere: "maths",
    notionId: "aire_unite", microId: "aire_comprendre", difficulty: 2, theme: "neutral",
    text: "Un carreau mesure 1 cm². Une figure recouvre exactement 12 carreaux. Quelle est son aire ?",
    format: "short", expected: ["12 cm²"], comparator: "number_equal",
    hint: "Chaque carreau vaut 1 cm².",
    explanation: expl("On compte les carreaux : 12 carreaux de 1 cm² donnent une aire de 12 cm²."),
    tags: ["aire_unite", "comprendre", "carreaux"],
  },

  // ========== TOP-UP — AIRE_CARRE ==========
  {
    kind: "fixed", id: "aire_carre_topup_1", niveau: "6e", matiere: "maths",
    notionId: "aire_surface", microId: "aire_carre", difficulty: 1, theme: "neutral",
    text: "Quelle est l’aire d’un carré de côté 9 cm ?",
    format: "short", expected: ["81 cm²"], comparator: "number_equal",
    hint: "Aire d’un carré = côté × côté.",
    explanation: expl("L’aire d’un carré est côté × côté. Ici, 9 × 9 = 81, donc l’aire est 81 cm²."),
    tags: ["aire_surface", "carre"],
  },
  {
    kind: "fixed", id: "aire_carre_topup_2", niveau: "6e", matiere: "maths",
    notionId: "aire_surface", microId: "aire_carre", difficulty: 2, theme: "neutral",
    text: "Quelle est l’aire d’un carré de côté 7 cm ?",
    format: "short", expected: ["49 cm²"], comparator: "number_equal",
    hint: "7 × 7.",
    explanation: expl("L’aire d’un carré est côté × côté. Ici, 7 × 7 = 49, donc l’aire est 49 cm²."),
    tags: ["aire_surface", "carre"],
  },
  {
    kind: "fixed", id: "aire_carre_topup_3", niveau: "6e", matiere: "maths",
    notionId: "aire_surface", microId: "aire_carre", difficulty: 2, theme: "neutral",
    text: "Quelle est l’aire d’un carré de côté 10 cm ?",
    format: "short", expected: ["100 cm²"], comparator: "number_equal",
    hint: "10 × 10.",
    explanation: expl("L’aire d’un carré est côté × côté. Ici, 10 × 10 = 100, donc l’aire est 100 cm²."),
    tags: ["aire_surface", "carre"],
  },
  {
    kind: "fixed", id: "aire_carre_topup_4", niveau: "6e", matiere: "maths",
    notionId: "aire_surface", microId: "aire_carre", difficulty: 1, theme: "neutral",
    text: "Quelle est la formule de l’aire d’un carré ?",
    format: "qcm", choices: ["côté × côté", "côté × 4", "côté + côté", "longueur × largeur"],
    expected: ["côté × côté"], comparator: "mcq_exact",
    hint: "Les quatre côtés d’un carré sont égaux.",
    explanation: expl("L’aire d’un carré se calcule en multipliant son côté par lui-même : côté × côté."),
    tags: ["aire_surface", "carre", "qcm"],
  },

  // ========== TOP-UP — AIRE_RECTANGLE ==========
  {
    kind: "fixed", id: "aire_rectangle_topup_1", niveau: "6e", matiere: "maths",
    notionId: "aire_surface", microId: "aire_rectangle", difficulty: 1, theme: "neutral",
    text: "Quelle est l’aire d’un rectangle de longueur 6 cm et de largeur 4 cm ?",
    format: "short", expected: ["24 cm²"], comparator: "number_equal",
    hint: "Aire = Longueur × largeur.",
    explanation: expl("L’aire d’un rectangle est Longueur × largeur. Ici, 6 × 4 = 24, donc l’aire est 24 cm²."),
    tags: ["aire_surface", "rectangle"],
  },
  {
    kind: "fixed", id: "aire_rectangle_topup_2", niveau: "6e", matiere: "maths",
    notionId: "aire_surface", microId: "aire_rectangle", difficulty: 2, theme: "neutral",
    text: "Quelle est l’aire d’un rectangle de longueur 8 cm et de largeur 3 cm ?",
    format: "short", expected: ["24 cm²"], comparator: "number_equal",
    hint: "8 × 3.",
    explanation: expl("L’aire d’un rectangle est Longueur × largeur. Ici, 8 × 3 = 24, donc l’aire est 24 cm²."),
    tags: ["aire_surface", "rectangle"],
  },
  {
    kind: "fixed", id: "aire_rectangle_topup_3", niveau: "6e", matiere: "maths",
    notionId: "aire_surface", microId: "aire_rectangle", difficulty: 2, theme: "neutral",
    text: "Quelle est l’aire d’un rectangle de longueur 10 cm et de largeur 5 cm ?",
    format: "short", expected: ["50 cm²"], comparator: "number_equal",
    hint: "10 × 5.",
    explanation: expl("L’aire d’un rectangle est Longueur × largeur. Ici, 10 × 5 = 50, donc l’aire est 50 cm²."),
    tags: ["aire_surface", "rectangle"],
  },
  {
    kind: "fixed", id: "aire_rectangle_topup_4", niveau: "6e", matiere: "maths",
    notionId: "aire_surface", microId: "aire_rectangle", difficulty: 1, theme: "neutral",
    text: "Quelle est la formule de l’aire d’un rectangle ?",
    format: "qcm", choices: ["Longueur × largeur", "Longueur + largeur", "côté × côté", "2 × (L + l)"],
    expected: ["Longueur × largeur"], comparator: "mcq_exact",
    hint: "On multiplie les deux dimensions.",
    explanation: expl("L’aire d’un rectangle se calcule en multipliant sa longueur par sa largeur : Longueur × largeur. (2 × (L + l) est le périmètre.)"),
    tags: ["aire_surface", "rectangle", "qcm"],
  },

  // ========== TOP-UP — AIRE_COMPARER ==========
  {
    kind: "fixed", id: "aire_comparer_topup_1", niveau: "6e", matiere: "maths",
    notionId: "aire_surface", microId: "aire_comparer", difficulty: 2, theme: "neutral",
    text: "Un carré de côté 4 cm et un rectangle de 5 cm sur 3 cm : quelle figure a la plus grande aire ?",
    format: "qcm", choices: ["le carré", "le rectangle", "elles ont la même aire"], expected: ["le carré"], comparator: "mcq_exact",
    hint: "Calcule les deux aires puis compare.",
    explanation: expl("Aire du carré : 4 × 4 = 16 cm². Aire du rectangle : 5 × 3 = 15 cm². 16 > 15, donc le carré a la plus grande aire."),
    tags: ["aire_surface", "comparer", "qcm"],
  },
  {
    kind: "fixed", id: "aire_comparer_topup_2", niveau: "6e", matiere: "maths",
    notionId: "aire_surface", microId: "aire_comparer", difficulty: 3, theme: "neutral",
    text: "Deux rectangles mesurent 6 cm sur 2 cm et 4 cm sur 3 cm. Ont-ils la même aire ?",
    format: "qcm", choices: ["oui", "non"], expected: ["oui"], comparator: "mcq_exact",
    hint: "Calcule les deux aires.",
    explanation: expl("Premier rectangle : 6 × 2 = 12 cm². Deuxième rectangle : 4 × 3 = 12 cm². Les deux aires sont égales : 12 cm²."),
    tags: ["aire_surface", "comparer", "qcm"],
  },
  {
    kind: "fixed", id: "aire_comparer_topup_3", niveau: "6e", matiere: "maths",
    notionId: "aire_surface", microId: "aire_comparer", difficulty: 1, theme: "neutral",
    text: "Une figure A a une aire de 20 cm², une figure B une aire de 15 cm². Laquelle a la plus grande aire ?",
    format: "qcm", choices: ["la figure A", "la figure B", "elles sont égales"], expected: ["la figure A"], comparator: "mcq_exact",
    hint: "Compare 20 et 15.",
    explanation: expl("On compare les deux aires : 20 cm² est plus grand que 15 cm². La figure A a la plus grande aire."),
    tags: ["aire_surface", "comparer", "qcm"],
  },
  {
    kind: "fixed", id: "aire_comparer_topup_4", niveau: "6e", matiere: "maths",
    notionId: "aire_surface", microId: "aire_comparer", difficulty: 2, theme: "neutral",
    text: "Une figure mesure 30 cm² et une autre 18 cm². Combien de cm² d’aire en plus a la première ?",
    format: "short", expected: ["12 cm²"], comparator: "number_equal",
    hint: "Calcule 30 − 18.",
    explanation: expl("On calcule l’écart des deux aires : 30 - 18 = 12, donc 12 cm² de plus."),
    tags: ["aire_surface", "comparer"],
  },

  // ========== TOP-UP — AIRE_DECOMPOSER ==========
  {
    kind: "fixed", id: "aire_decomposer_topup_1", niveau: "6e", matiere: "maths",
    notionId: "aire_surface", microId: "aire_decomposer", difficulty: 3, theme: "neutral",
    text: "Une figure en L est formée d’un rectangle de 6 cm sur 2 cm et d’un carré de 2 cm de côté. Quelle est son aire totale ?",
    format: "short", expected: ["16 cm²"], comparator: "number_equal",
    hint: "Additionne l’aire du rectangle et celle du carré.",
    explanation: expl("Aire du rectangle : 6 × 2 = 12 cm². Aire du carré : 2 × 2 = 4 cm². Aire totale : 12 + 4 = 16 cm²."),
    tags: ["aire_surface", "decomposer"],
  },
  {
    kind: "fixed", id: "aire_decomposer_topup_2", niveau: "6e", matiere: "maths",
    notionId: "aire_surface", microId: "aire_decomposer", difficulty: 3, theme: "neutral",
    text: "Une figure est composée de deux rectangles : un de 5 cm sur 2 cm et un de 3 cm sur 2 cm. Quelle est son aire totale ?",
    format: "short", expected: ["16 cm²"], comparator: "number_equal",
    hint: "Calcule chaque aire, puis additionne.",
    explanation: expl("Premier rectangle : 5 × 2 = 10 cm². Deuxième rectangle : 3 × 2 = 6 cm². Aire totale : 10 + 6 = 16 cm²."),
    tags: ["aire_surface", "decomposer"],
  },
  {
    kind: "fixed", id: "aire_decomposer_topup_3", niveau: "6e", matiere: "maths",
    notionId: "aire_surface", microId: "aire_decomposer", difficulty: 2, theme: "neutral",
    text: "Pour calculer l’aire d’une figure compliquée, on peut...",
    format: "qcm", choices: ["la découper en figures simples", "mesurer seulement son contour", "compter ses sommets", "mesurer un seul côté"],
    expected: ["la découper en figures simples"], comparator: "mcq_exact",
    hint: "Pense aux rectangles et carrés.",
    explanation: expl("Pour une figure compliquée, on la découpe en figures simples (rectangles, carrés), on calcule l’aire de chacune, puis on additionne."),
    tags: ["aire_surface", "decomposer", "qcm"],
  },

  // ========== TOP-UP — AIRE_PROBLEME ==========
  {
    kind: "fixed", id: "aire_probleme_topup_1", niveau: "6e", matiere: "maths",
    notionId: "aire_surface", microId: "aire_probleme", difficulty: 2, theme: "neutral",
    text: "Un terrain rectangulaire mesure 20 m de long et 15 m de large. Quelle est son aire ?",
    format: "short", expected: ["300 m²"], comparator: "number_equal",
    hint: "Aire = Longueur × largeur.",
    explanation: expl("L’aire du terrain est Longueur × largeur : 20 × 15 = 300, donc 300 m²."),
    tags: ["aire_surface", "probleme"],
  },
  {
    kind: "fixed", id: "aire_probleme_topup_2", niveau: "6e", matiere: "maths",
    notionId: "aire_surface", microId: "aire_probleme", difficulty: 2, theme: "neutral",
    text: "Une pièce carrée mesure 4 m de côté. Quelle est son aire ?",
    format: "short", expected: ["16 m²"], comparator: "number_equal",
    hint: "Aire d’un carré = côté × côté.",
    explanation: expl("L’aire de la pièce est côté × côté : 4 × 4 = 16, donc 16 m²."),
    tags: ["aire_surface", "probleme"],
  },
  {
    kind: "fixed", id: "aire_probleme_topup_3", niveau: "6e", matiere: "maths",
    notionId: "aire_surface", microId: "aire_probleme", difficulty: 3, theme: "neutral",
    text: "On veut recouvrir un sol de 5 m sur 3 m avec des dalles de 1 m². Combien de dalles faut-il ?",
    format: "short", expected: ["15 dalles"], comparator: "number_equal",
    hint: "Calcule d’abord l’aire du sol.",
    explanation: expl("L’aire du sol est 5 × 3 = 15 m². Chaque dalle couvre 1 m², il faut donc 15 dalles."),
    tags: ["aire_surface", "probleme"],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // AIRE_CONVERTIR — les conversions d'aire
  //
  // ⛔ OUVERTE LE 23/08/2026 — TROU DU PROGRAMME (6e-GM-aires-1, « effectuer des
  // conversions d'aire »). C'est l'un des trois SEULS objectifs d'apprentissage
  // du chapitre « Les aires » en 6e, avec la formule et le calcul.
  //
  // ⛔⛔ DEUX BORNES DU BO, ET ELLES SONT STRICTES :
  //   1. UNIQUEMENT m² ↔ dm² et dm² ↔ cm². « Les autres conversions d'aire ne
  //      figurent pas au programme » — donc pas de cm² ↔ m², pas de km², pas de
  //      mm² en conversion. Aucun item de cette micro n'en propose.
  //   2. « Le recours à un tableau de conversion est DÉCONSEILLÉ à ce stade. »
  //      La figure remplace donc le tableau : un carré de 1 dm de côté découpé
  //      en 100 carrés de 1 cm de côté. C'est la méthode, pas une illustration.
  //
  // ⭐ LA DÉMONSTRATION EST DANS LE BO, mot pour mot, et elle tient en une ligne :
  //   1 dm² = 1 dm × 1 dm = 10 cm × 10 cm = 10 × 10 cm² = 100 cm².
  // Le côté est multiplié par 10, donc l'aire par 10 × 10 = 100. Un élève qui a
  // vu ce calcul n'a plus besoin de retenir un tableau — il le refabrique.
  //
  // ⚠️ L'ERREUR ATTENDUE EST ×10, importée des longueurs, où elle est juste.
  // Elle a son item, et le carré découpé la réfute d'un regard.
  //
  // ⚠️ mm² ET km² SE CONNAISSENT SANS SE CONVERTIR : le BO demande que l'élève
  // sache que 1 mm² est l'aire d'un carré de 1 mm de côté et 1 km² celle d'un
  // carré de 1 km de côté. Un item le pose, et il ne demande aucune conversion.
  // ═══════════════════════════════════════════════════════════════════════════
  {
    kind: "fixed",
    id: "aire_convertir_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_unite",
    microId: "aire_convertir",
    difficulty: 2,
    theme: "neutral",
    text: "Un carré de 1 dm de côté est découpé en carrés de 1 cm de côté. Combien en obtient-on ?",
    format: "short",
    expected: ["100"],
    comparator: "number_equal",
    hint: "1 dm = 10 cm : compte les rangées, puis les carrés par rangée.",
    explanation: expl(
      "1 dm vaut 10 cm, donc le carré mesure 10 cm sur 10 cm : il contient 10 rangées de 10 carrés, soit 10 × 10 = 100 carrés de 1 cm². On écrit 1 dm² = 1 dm × 1 dm = 10 cm × 10 cm = 100 cm². Le côté a été multiplié par 10, mais l'aire par 100 — parce qu'on multiplie DEUX longueurs."
    ),
    tags: ["aire_unite", "convertir", "canvas", "short"],
    canvas: carreDecoupe([]),
  },
  {
    kind: "fixed",
    id: "aire_convertir_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_unite",
    microId: "aire_convertir",
    difficulty: 3,
    theme: "neutral",
    text: "Le carré ci-dessous mesure 1 dm de côté, et la case colorée 1 cm de côté. Quelle fraction du grand carré la case colorée représente-t-elle ?",
    format: "qcm",
    choices: ["un centième", "un dixième", "un millième", "un quart"],
    expected: ["un centième"],
    comparator: "mcq_exact",
    hint: "Compte les cases du grand carré.",
    explanation: expl(
      "Le grand carré contient 100 cases identiques : chacune en est donc UN CENTIÈME. On écrit 1 cm² = 0,01 dm² (un centième de dm²). De la même façon, 1 dm² = 0,01 m². C'est cette image — et non un tableau — qu'il faut garder en tête pour convertir."
    ),
    tags: ["aire_unite", "convertir", "canvas", "qcm"],
    canvas: carreDecoupe([[1, 1]]),
  },
  {
    kind: "fixed",
    id: "aire_convertir_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_unite",
    microId: "aire_convertir",
    difficulty: 3,
    theme: "neutral",
    text: "Convertis 3,7 m² en dm².",
    format: "short",
    expected: ["370 dm²"],
    comparator: "number_equal",
    hint: "1 m² = 100 dm².",
    explanation: expl(
      "1 m² vaut 100 dm², puisqu'un carré de 1 m de côté se découpe en 10 × 10 = 100 carrés de 1 dm de côté. Il y a donc 100 fois plus de dm² que de m² : 3,7 × 100 = 370 dm². On va vers une unité plus PETITE, donc le nombre grandit."
    ),
    tags: ["aire_unite", "convertir", "short"],
  },
  {
    kind: "fixed",
    id: "aire_convertir_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_unite",
    microId: "aire_convertir",
    difficulty: 3,
    theme: "neutral",
    text: "Convertis 370 cm² en dm².",
    format: "short",
    expected: ["3,7 dm²"],
    comparator: "number_equal",
    hint: "1 dm² = 100 cm² : ici on va vers une unité plus grande.",
    explanation: expl(
      "Il faut 100 cm² pour faire 1 dm². On cherche donc combien de fois 100 tient dans 370 : 370 ÷ 100 = 3,7 dm². On va vers une unité plus GRANDE, donc le nombre diminue — et il n'a aucune raison d'être entier."
    ),
    tags: ["aire_unite", "convertir", "short"],
  },
  {
    kind: "fixed",
    id: "aire_convertir_fixed_5",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_unite",
    microId: "aire_convertir",
    difficulty: 4,
    theme: "neutral",
    text: "Pour passer des dm² aux cm², par combien multiplie-t-on ?",
    format: "qcm",
    choices: ["par 100", "par 10", "par 1 000", "par 2"],
    expected: ["par 100"],
    comparator: "mcq_exact",
    hint: "C'est le côté qui est multiplié par 10, pas l'aire.",
    explanation: expl(
      "On multiplie par 100. L'erreur naturelle est de répondre 10, parce que c'est vrai pour les LONGUEURS : 1 dm = 10 cm. Mais une aire est un produit de deux longueurs : si chacune est multipliée par 10, l'aire l'est par 10 × 10 = 100. Le carré découpé en 100 cases le montre d'un regard."
    ),
    tags: ["aire_unite", "convertir", "piege", "canvas", "qcm"],
    canvas: carreDecoupe([]),
  },
  {
    kind: "fixed",
    id: "aire_convertir_fixed_6",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_unite",
    microId: "aire_convertir",
    difficulty: 3,
    theme: "reunion",
    text: "Le Piton de la Fournaise est parfois décrit par sa superficie en km². Que représente 1 km² ?",
    format: "qcm",
    choices: [
      "l'aire d'un carré de 1 km de côté",
      "un carré de 1 km de périmètre",
      "une longueur de 1 km",
      "l'aire d'un carré de 100 m de côté",
    ],
    expected: ["l'aire d'un carré de 1 km de côté"],
    comparator: "mcq_exact",
    hint: "Une unité d'aire se nomme toujours d'après le côté d'un carré.",
    explanation: expl(
      "Toutes les unités d'aire se lisent de la même façon : 1 km² est l'aire d'un carré de 1 km de côté, comme 1 cm² est l'aire d'un carré de 1 cm de côté et 1 mm² celle d'un carré de 1 mm de côté. Il faut le SAVOIR ; convertir des km² ou des mm², en revanche, n'est pas au programme de 6e."
    ),
    tags: ["aire_unite", "convertir", "974", "qcm"],
  },
  {
    kind: "template",
    id: "aire_convertir_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_unite",
    microId: "aire_convertir",
    difficulty: 3,
    theme: "neutral",
    hint: "Cent d'une unité font l'unité juste au-dessus.",
    tags: ["aire_unite", "convertir", "template"],
    // ⛔ SEULEMENT m² ↔ dm² ET dm² ↔ cm² : voir tirerConversion().
    generate: () => genAireConvertir(),
  },
  {
    kind: "template",
    id: "aire_convertir_tpl_ouverte",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_unite",
    microId: "aire_convertir",
    difficulty: 4,
    theme: "neutral",
    hint: "Une aire est un produit de DEUX longueurs — pars de là.",
    tags: ["aire_unite", "convertir", "template", "qcm"],
    // ⛔ 06/10/2026 — c'était une question ouverte dont les mots-clés étaient
    // des nombres seuls (« 100 », « 10 », « 500 ») : « 10 » validait une
    // réponse fausse. Remplacée par un QCM sur les MÊMES pièges (× 10 au lieu
    // de × 100, mauvais sens), avec l'explication « 10 × 10 = 100 ».
    generate: () => genAireConvertirPiege(),
  },
];

