// Banque de questions Tutor V4 - Mathématiques 3e
// Notion : le théorème de Pythagore et sa réciproque — l'année du BREVET.
//
// Micros : pythagore_reconnaitre, pythagore_calculer_hypotenuse,
// pythagore_calculer_cote, pythagore_reciproque, pythagore_rediger, pythagore_defi.

import type {
  DifficultyLevel,
  TutorBankItemV4,
  TutorGeneratedQuestionV4,
  TriangleCanvasData,
} from "@/lib/tutor-v4/types";

/* =========================================================================
   ⛔⛔ 13/10/2026 — « DES QUESTIONS REVIENNENT », LA 3e À SON TOUR. Mesuré
   avant (scripts/mesurer-squelettes-coach.ts) : 15 à 55 squelettes par micro,
   et jusqu'à 18 répétitions sur une série de 20 à la même étoile. Huit noms de
   triangles, l'angle droit TOUJOURS en A, huit triplets dont 3-4-5 : l'élève
   reconnaissait la phrase.
   Même méthode que la 4e (réparée le 03/10, voir son grand commentaire) : les
   gabarits composent
     · un TRIANGLE NOMMÉ (dix-huit noms, sans I ni O ; l'angle droit sur
       n'importe quel sommet) et, quand il y a une figure, une figure À
       L'ÉCHELLE des longueurs de l'énoncé ;
     · une SITUATION réelle (vingt contextes, La Réunion de temps en temps) ;
     · une TOURNURE (deux à quatre façons de poser la même question) ;
     · des TRIPLETS variés (vingt-deux, plus des versions décimales) et, pour
       une partie des tirages, une longueur à ARRONDIR AU DIXIÈME, annoncée
       dans l'énoncé.
   Le cran de 3e : la valeur exacte (√41 cm) face à la valeur arrondie, les
   unités à convertir avant la réciproque, les problèmes en deux étapes (deux
   triangles accolés, l'aire après Pythagore, la hauteur d'un triangle
   isocèle), la rédaction complète choisie parmi des rédactions fautives.
   Mesure : npx --yes tsx@4 scripts/mesurer-squelettes-coach.ts 3e pythagore_theoreme
   Outils copiés de la 4e (pas d'import croisé entre banques).
========================================================================= */

type Q = TutorGeneratedQuestionV4;

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

/** 13.69 → « 13,69 » ; 14400 → « 14 400 ». L'élève lit des nombres français. */
function fr(n: number): string {
  const r = Math.round(n * 10000) / 10000;
  const [ent, dec] = String(Math.abs(r)).split(".");
  const entier = ent.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return (r < 0 ? "−" : "") + entier + (dec ? "," + dec : "");
}
const sq = (x: number) => Math.round(x * x * 10000) / 10000;
const egal = (x: number, y: number) => Math.round(x * 10000) === Math.round(y * 10000);
const arrondi1 = (x: number) => Math.round(x * 10) / 10;
/** La racine est-elle « tombée juste » au dixième près ? */
const racineExacte = (s: number) => {
  const r = Math.sqrt(s);
  return Math.abs(r * 10 - Math.round(r * 10)) < 1e-7;
};

/** Une valeur ARRONDIE au dixième s'écrit avec son dixième : « 4,0 » et pas « 4 ». */
const frA = (x: number, exact: boolean) => (exact || fr(x).includes(",") ? fr(x) : `${fr(x)},0`);

/** Les réponses acceptées : « 10 cm », « 10 » (et « 1225 » pour « 1 225 »). */
function attendu(x: number, u: string, exact = true): string[] {
  const n = frA(x, exact);
  return [...new Set([`${n} ${u}`, n, n.replace(/ /g, "")])];
}
/** Une aire : « 30 cm² », « 30 ». */
function attenduAire(x: number, u: string): string[] {
  const n = fr(x);
  return [...new Set([`${n} ${u}²`, n, n.replace(/ /g, "")])];
}
/** Un nombre sans unité (un carré) : « 1 225 », « 1225 ». */
function attenduNombre(x: number): string[] {
  const n = fr(x);
  return [...new Set([n, n.replace(/ /g, "")])];
}

/** Bonne réponse + trois leurres DISTINCTS : il faut en fournir plus de trois. */
function qcm(correct: string, leurres: string[]): string[] {
  const d = shuffle([...new Set(leurres)].filter((w) => w !== correct)).slice(0, 3);
  return shuffle([correct, ...d]);
}

// ---------- Les triplets ----------
// Les dix premiers ont une hypoténuse ≤ 29 : ce sont ceux des étoiles basses.
const TRIPLETS: [number, number, number][] = [
  [3, 4, 5], [6, 8, 10], [9, 12, 15], [12, 16, 20], [15, 20, 25],
  [5, 12, 13], [10, 24, 26], [8, 15, 17], [7, 24, 25], [20, 21, 29],
  [9, 40, 41], [12, 35, 37], [16, 30, 34], [18, 24, 30], [21, 28, 35],
  [24, 32, 40], [15, 36, 39], [28, 45, 53], [33, 56, 65], [11, 60, 61],
  [24, 45, 51], [14, 48, 50],
];
type SorteTriplet = "simple" | "varie" | "decimal";
/** Un triplet (côtés de l'angle droit dans un ordre au hasard, hypoténuse en dernier). */
function tirerTriplet(sorte: SorteTriplet): [number, number, number] {
  if (sorte === "decimal") {
    let t: number[] = [];
    // Pas de « 0,3 cm » : le plus petit côté fait au moins 0,6.
    do {
      const [a, b, c] = randomChoice(TRIPLETS.slice(0, 10));
      const k = randomChoice([0.1, 0.2, 0.5]);
      t = [a, b, c].map((x) => Math.round(x * k * 10) / 10);
    } while (Math.min(t[0], t[1]) < 0.6);
    return randomChoice([true, false]) ? [t[0], t[1], t[2]] : [t[1], t[0], t[2]];
  }
  const [a, b, c] = randomChoice(sorte === "simple" ? TRIPLETS.slice(0, 10) : TRIPLETS);
  return randomChoice([true, false]) ? [a, b, c] : [b, a, c];
}

const falseTriples = [
  { a: 4, b: 5, c: 6 },
  { a: 6, b: 7, c: 9 },
  { a: 8, b: 9, c: 12 },
  { a: 5, b: 6, c: 8 },
  { a: 9, b: 10, c: 14 },
  { a: 10, b: 11, c: 15 },
];
/** Trois longueurs (le plus grand côté en dernier), rectangle ou non. */
function longueursReciproque(rectangle: boolean, sorte: SorteTriplet): [number, number, number] {
  const t = tirerTriplet(sorte);
  if (rectangle) return t;
  if (sorte === "simple" && Math.random() < 0.4) {
    const f = randomChoice(falseTriples);
    return randomChoice([true, false]) ? [f.a, f.b, f.c] : [f.b, f.a, f.c];
  }
  // « Presque » rectangle : l'hypoténuse décalée d'un cran. C'est le piège réel.
  const pas = sorte === "decimal" ? 0.1 : 1;
  const [a, b, c] = t;
  const delta = Math.random() < 0.5 && c - pas > Math.max(a, b) ? -pas : pas;
  return [a, b, Math.round((c + delta) * 10) / 10];
}

// ---------- Les triangles nommés ----------
type TriangleName = { A: string; B: string; C: string };
// ⚠️ Pas de I ni de O, qui se confondent avec 1 et 0.
const NOMS_TRIANGLES = [
  "ABC", "RST", "KLM", "EFG", "MNP", "DEF", "UVW", "PQR", "XYZ",
  "BCD", "LMN", "STU", "FGH", "TUV", "JKL", "CDE", "QRS", "EFK",
];
type TriangleNomme = {
  nom: string;
  /** Le sommet de l'angle droit (ou, pour la réciproque, celui opposé au plus grand côté). */
  droit: string;
  p: string;
  q: string;
  /** L'hypoténuse, puis les deux côtés de l'angle droit, lettres dans l'ordre du nom. */
  hyp: string;
  c1: string;
  c2: string;
  /** Pour la figure : la clé A porte l'angle droit, AB = c1, CA = c2, BC = hyp. */
  labels: TriangleName;
};
function tirerTriangle(): TriangleNomme {
  const nom = randomChoice(NOMS_TRIANGLES);
  const L = nom.split("");
  const k = randomInt(0, 2);
  const droit = L[k];
  const [p, q] = shuffle(L.filter((_, i) => i !== k));
  const seg = (x: string, y: string) => (nom.indexOf(x) < nom.indexOf(y) ? x + y : y + x);
  return {
    nom,
    droit,
    p,
    q,
    hyp: seg(p, q),
    c1: seg(droit, p),
    c2: seg(droit, q),
    labels: { A: droit, B: p, C: q },
  };
}

/** La figure À L'ÉCHELLE : AB est posé en bas, C au-dessus. */
function figureALEchelle(params: {
  labels: TriangleName;
  AB: number;
  BC: number;
  CA: number;
  sideLabels?: Partial<Record<"AB" | "BC" | "CA", string>>;
  angleDroitEnA?: boolean;
}): TriangleCanvasData {
  const c = params.AB;
  const a = params.BC;
  const b = params.CA;
  const x = (b * b + c * c - a * a) / (2 * c);
  const y = Math.sqrt(Math.max(b * b - x * x, 0));
  const minX = Math.min(0, x);
  const maxX = Math.max(c, x);
  const W = 280;
  const H = 230;
  const m = 42;
  const s = Math.min((W - 2 * m) / (maxX - minX), (H - 2 * m) / Math.max(y, 1e-9));
  const ox = (W - (maxX - minX) * s) / 2 - minX * s;
  const oy = H - (H - y * s) / 2;
  const P = (px: number, py: number) => ({ x: Math.round(ox + px * s), y: Math.round(oy - py * s) });
  return {
    kind: "triangle",
    points: { A: P(0, 0), B: P(c, 0), C: P(x, y) },
    labels: params.labels,
    sideLabels: params.sideLabels,
    display: { showPoints: true, showLabels: true, showSides: true, showAngles: false },
    marks: params.angleDroitEnA ? { rightAngleAt: "A" } : undefined,
    size: { width: W, height: H },
  };
}

/** Une figure de triangle rectangle à l'échelle d'un triplet, sans longueurs. */
function figureRectangleNue(t: TriangleNomme): TriangleCanvasData {
  const [a, b, c] = tirerTriplet("simple");
  return figureALEchelle({ labels: t.labels, AB: a, CA: b, BC: c, angleDroitEnA: true });
}

/** Les trois côtés d'un triangle nommé, dans un ordre au hasard. */
function listeCotes(t: TriangleNomme, a: number, b: number, c: number, u: string): string {
  const l = shuffle([`${t.c1} = ${fr(a)} ${u}`, `${t.c2} = ${fr(b)} ${u}`, `${t.hyp} = ${fr(c)} ${u}`]);
  return `${l[0]}, ${l[1]} et ${l[2]}`;
}

/** Les deux calculs séparés de la réciproque : « D'une part… D'autre part… ». */
function deuxCalculs(t: TriangleNomme, a: number, b: number, c: number): string {
  return (
    `le plus grand côté est [${t.hyp}]. D’une part, ${t.hyp}² = ${fr(c)}² = ${fr(sq(c))}. ` +
    `D’autre part, ${t.c1}² + ${t.c2}² = ${fr(a)}² + ${fr(b)}² = ${fr(sq(a))} + ${fr(sq(b))} = ${fr(sq(a) + sq(b))}.`
  );
}
function redactionReciproque(t: TriangleNomme, a: number, b: number, c: number): string {
  const G = sq(c);
  const S = sq(a) + sq(b);
  const debut = deuxCalculs(t, a, b, c);
  return egal(G, S)
    ? `${debut} Les deux résultats sont égaux : d’après la réciproque du théorème de Pythagore, le triangle ${t.nom} est rectangle en ${t.droit}.`
    : `${debut} ${fr(G)} ≠ ${fr(S)} : si le triangle ${t.nom} était rectangle, ces deux nombres seraient égaux. Il n’est donc pas rectangle.`;
}

const UNITES = ["cm", "cm", "mm", "dm", "m"];
/** L'unité d'un triangle : pas de « 1,6 mm » — les longueurs décimales vont en cm, dm ou m. */
const uniteDe = (...xs: number[]) => randomChoice(xs.some((x) => !Number.isInteger(x)) ? ["cm", "cm", "dm", "m"] : UNITES);
const SUFFIXES_ARRONDI = [" Donne l’arrondi au dixième.", " Arrondis au dixième.", " Arrondis le résultat au dixième."];

/* =========================================================================
   LES SITUATIONS RÉELLES
   a et b : côtés de l'angle droit ; c : l'hypoténuse. `cote` demande b, a connu.
========================================================================= */
type Situation = {
  unite: string;
  noms: { a: string; b: string; c: string };
  triplets: [number, number, number][];
  hyp: ((a: string, b: string) => string)[];
  cote: ((c: string, a: string) => string)[];
};
const SITUATIONS: Situation[] = [
  {
    unite: "m",
    noms: { a: "l’écart entre le pied de l’échelle et le mur", b: "la hauteur atteinte sur le mur", c: "la longueur de l’échelle" },
    triplets: [[0.7, 2.4, 2.5], [1, 2.4, 2.6], [1.2, 3.5, 3.7], [1.5, 3.6, 3.9], [1.6, 6.3, 6.5], [1.8, 8, 8.2], [0.9, 4, 4.1]],
    hyp: [
      (a, b) => `Une échelle est posée contre un mur vertical. Son pied est à ${a} du mur et son sommet touche le mur à ${b} de hauteur. Quelle est la longueur de l’échelle ?`,
      (a, b) => `Pour atteindre une gouttière située à ${b} du sol, Léa pose le pied de son échelle à ${a} du mur. Quelle doit être la longueur de l’échelle ?`,
    ],
    cote: [
      (c, a) => `Une échelle de ${c} est appuyée contre un mur vertical, son pied à ${a} du mur. À quelle hauteur son sommet touche-t-il le mur ?`,
      (c, a) => `Un peintre appuie une échelle de ${c} contre une façade verticale. Le pied de l’échelle est à ${a} de la façade. Jusqu’à quelle hauteur l’échelle monte-t-elle ?`,
    ],
  },
  {
    unite: "m",
    noms: { a: "la longueur couverte au sol", b: "la hauteur à franchir", c: "la longueur de la rampe" },
    triplets: [[2.4, 0.7, 2.5], [3.5, 1.2, 3.7], [4.8, 1.4, 5], [4, 0.9, 4.1], [6, 1.1, 6.1]],
    hyp: [
      (a, b) => `Une rampe d’accès pour fauteuil roulant permet de franchir une hauteur de ${b}. Au sol, elle s’étend sur ${a}. Quelle est la longueur de la rampe ?`,
      (a, b) => `Une rampe de skate monte de ${b} sur une distance au sol de ${a}. Combien mesure la planche inclinée ?`,
    ],
    cote: [
      (c, a) => `Une rampe de chargement de ${c} relie le sol au plateau d’un camion ; au sol, elle s’étend sur ${a}. À quelle hauteur se trouve le plateau ?`,
      (c, a) => `Une rampe d’accès de ${c} de long couvre ${a} au sol. Quelle hauteur permet-elle de franchir ?`,
    ],
  },
  {
    unite: "m",
    noms: { a: "la demi-largeur du bâtiment", b: "la hauteur du faîtage au-dessus des murs", c: "la longueur d’un pan du toit" },
    triplets: [[4, 3, 5], [6, 2.5, 6.5], [4.8, 2, 5.2], [3.6, 1.5, 3.9], [6, 4.5, 7.5], [2.4, 1, 2.6]],
    hyp: [
      (a, b) => `Le toit d’un abri de jardin a deux pans identiques. La demi-largeur de l’abri est de ${a} et le faîtage s’élève de ${b} au-dessus des murs. Quelle est la longueur d’un pan du toit ?`,
      (a, b) => `Une maison a un toit à deux pans. Du milieu de la maison jusqu’au mur, il y a ${a}, et le faîtage est ${b} plus haut que le haut des murs. Combien mesure un chevron, du faîtage au mur ?`,
    ],
    cote: [
      (c, a) => `Un chevron de toit mesure ${c} du faîtage au mur ; il couvre horizontalement ${a}. De quelle hauteur le faîtage s’élève-t-il au-dessus des murs ?`,
      (c, a) => `Un pan de toit mesure ${c} du faîtage au bord, pour une demi-largeur de maison de ${a}. Quelle est la hauteur du toit au-dessus des murs ?`,
    ],
  },
  {
    unite: "m",
    noms: { a: "la demi-largeur de la case", b: "la hauteur du faîtage au-dessus des murs", c: "la longueur d’un pan de tôle" },
    triplets: [[4, 3, 5], [3.6, 1.5, 3.9], [4.8, 1.4, 5], [2.4, 1, 2.6]],
    hyp: [
      (a, b) => `À La Réunion, une case créole a un toit de tôle à deux pans. Du milieu de la case jusqu’au mur, il y a ${a}, et le faîtage est ${b} plus haut que les murs. Quelle longueur de tôle faut-il pour un pan, du faîtage au mur ?`,
      (a, b) => `Pour refaire le toit de sa case à Saint-Leu, Jimmy mesure : ${a} du milieu de la case au mur, et ${b} entre le haut des murs et le faîtage. Combien mesure un pan du toit ?`,
    ],
    cote: [
      (c, a) => `À La Réunion, le toit à deux pans d’une case créole a des pans de ${c}, du faîtage au mur. Du milieu de la case au mur, il y a ${a}. De quelle hauteur le faîtage dépasse-t-il les murs ?`,
      (c, a) => `Un pan de tôle de ${c} va du faîtage d’une case au haut du mur ; horizontalement, il couvre ${a}. Quelle est la hauteur du faîtage au-dessus des murs ?`,
    ],
  },
  {
    unite: "pouces",
    noms: { a: "la largeur de l’écran", b: "sa hauteur", c: "sa diagonale" },
    triplets: [[16, 12, 20], [24, 18, 30], [32, 24, 40], [8, 6, 10], [12, 9, 15], [20, 15, 25], [36, 27, 45]],
    hyp: [
      (a, b) => `Un écran de télévision mesure ${a} de large et ${b} de haut. La taille d’un écran, c’est la longueur de sa diagonale. Quelle est cette taille ?`,
      (a, b) => `Une tablette a un écran de ${a} sur ${b}. Combien mesure la diagonale de l’écran ?`,
    ],
    cote: [
      (c, a) => `Un écran de ${c} de diagonale mesure ${a} de large. Quelle est sa hauteur ?`,
      (c, a) => `On annonce un moniteur de ${c}, mesurés en diagonale. Il est large de ${a}. Combien mesure-t-il en hauteur ?`,
    ],
  },
  {
    unite: "m",
    noms: { a: "le bord le long du mât", b: "le bord le long de la bôme", c: "le bord libre de la voile" },
    triplets: [[8, 6, 10], [12, 5, 13], [7.2, 3, 7.8], [4, 3, 5], [6, 2.5, 6.5], [4.8, 3.6, 6], [2.4, 1.8, 3]],
    hyp: [
      (a, b) => `La voile d’un dériveur est un triangle : elle longe le mât sur ${a} et la bôme, perpendiculaire au mât, sur ${b}. Quelle est la longueur du troisième bord de la voile ?`,
      (a, b) => `Sur un voilier, la grand-voile est tendue le long du mât sur ${a} et le long de la bôme sur ${b} ; le mât et la bôme forment un angle droit. Combien mesure le bord libre de la voile ?`,
    ],
    cote: [
      (c, a) => `Une voile triangulaire a un bord libre de ${c} et longe le mât sur ${a}. La bôme est perpendiculaire au mât. Sur quelle longueur la voile longe-t-elle la bôme ?`,
      (c, a) => `La grand-voile d’un voilier longe le mât sur ${a} ; son bord libre mesure ${c}. Le mât et la bôme sont perpendiculaires. Combien mesure le bord de la voile le long de la bôme ?`,
    ],
  },
  {
    unite: "m",
    noms: { a: "la distance au sol entre le piquet et le point situé sous le cerf-volant", b: "la hauteur du cerf-volant", c: "la longueur du fil" },
    triplets: [[24, 32, 40], [30, 40, 50], [36, 15, 39], [21, 20, 29], [18, 24, 30], [45, 24, 51]],
    hyp: [
      (a, b) => `Le fil d’un cerf-volant est attaché à un piquet planté dans le sol. Le cerf-volant vole à ${b} de hauteur, juste au-dessus d’un point situé à ${a} du piquet. Le fil est tendu. Quelle est sa longueur ?`,
      (a, b) => `Un cerf-volant plane à ${b} au-dessus d’une plage. Son fil, bien tendu, est fixé au sol à ${a} du point situé juste sous lui. Quelle est la longueur du fil ?`,
    ],
    cote: [
      (c, a) => `Le fil tendu d’un cerf-volant mesure ${c}. Il est fixé au sol à ${a} du point situé juste sous le cerf-volant. À quelle hauteur vole le cerf-volant ?`,
      (c, a) => `Avec ${c} de fil tendu, fixé à un piquet, un cerf-volant vole à la verticale d’un point situé à ${a} du piquet. À quelle hauteur se trouve-t-il ?`,
    ],
  },
  {
    unite: "m",
    noms: { a: "la longueur du terrain", b: "sa largeur", c: "sa diagonale" },
    triplets: [[100, 75, 125], [96, 72, 120], [80, 60, 100], [90, 48, 102], [60, 45, 75]],
    hyp: [
      (a, b) => `Un terrain de football rectangulaire mesure ${a} de long et ${b} de large. Un joueur court en ligne droite d’un coin au coin opposé. Quelle distance parcourt-il ?`,
      (a, b) => `Pour tracer un terrain de foot de ${a} sur ${b}, l’entraîneur vérifie la diagonale. Combien doit-elle mesurer ?`,
    ],
    cote: [
      (c, a) => `Un terrain de football rectangulaire a une diagonale de ${c} et une longueur de ${a}. Quelle est sa largeur ?`,
      (c, a) => `Un joueur traverse en diagonale un terrain de foot de ${a} de long : il parcourt ${c}. Quelle est la largeur du terrain ?`,
    ],
  },
  {
    unite: "cm",
    noms: { a: "la hauteur de la porte", b: "sa largeur", c: "sa diagonale" },
    triplets: [[210, 72, 222], [192, 80, 208], [120, 50, 130], [216, 63, 225]],
    hyp: [
      (a, b) => `Une porte mesure ${a} de haut et ${b} de large. Quelle est la longueur de sa diagonale ?`,
      (a, b) => `Un menuisier fabrique une porte de ${a} de haut sur ${b} de large et la renforce par une barre en diagonale. Quelle est la longueur de cette barre ?`,
    ],
    cote: [
      (c, a) => `La diagonale d’une porte mesure ${c} et sa hauteur ${a}. Quelle est sa largeur ?`,
      (c, a) => `Une barre de renfort de ${c} est fixée en diagonale sur une porte haute de ${a}. Quelle est la largeur de la porte ?`,
    ],
  },
  {
    unite: "m",
    noms: { a: "la longueur du bassin", b: "sa largeur", c: "sa diagonale" },
    triplets: [[20, 15, 25], [16, 12, 20], [24, 10, 26], [21, 20, 29], [12, 9, 15], [24, 7, 25]],
    hyp: [
      (a, b) => `Une piscine rectangulaire mesure ${a} sur ${b}. Un nageur la traverse en diagonale, d’un coin au coin opposé. Quelle distance nage-t-il ?`,
      (a, b) => `Dans un bassin de ${a} de long et ${b} de large, on tend une ligne d’eau d’un coin au coin opposé. Quelle est sa longueur ?`,
    ],
    cote: [
      (c, a) => `Un nageur traverse en diagonale une piscine rectangulaire de ${a} de long ; il nage ${c}. Quelle est la largeur de la piscine ?`,
      (c, a) => `La diagonale d’un bassin rectangulaire mesure ${c} et sa longueur ${a}. Combien mesure sa largeur ?`,
    ],
  },
  {
    unite: "m",
    noms: { a: "la longueur du jardin", b: "sa largeur", c: "l’allée en diagonale" },
    triplets: [[12, 9, 15], [24, 10, 26], [15, 8, 17], [16, 12, 20], [24, 7, 25], [20, 21, 29]],
    hyp: [
      (a, b) => `Un jardin rectangulaire mesure ${a} sur ${b}. On veut y tracer une allée droite d’un coin au coin opposé. Quelle sera sa longueur ?`,
      (a, b) => `Pour arroser un potager rectangulaire de ${a} sur ${b}, Inès tend un tuyau d’un coin au coin opposé. Quelle longueur de tuyau lui faut-il ?`,
    ],
    cote: [
      (c, a) => `Une allée droite de ${c} traverse en diagonale un jardin rectangulaire de ${a} de long. Quelle est la largeur du jardin ?`,
      (c, a) => `Un potager rectangulaire a une diagonale de ${c}. Un de ses côtés mesure ${a}. Combien mesure l’autre ?`,
    ],
  },
  {
    unite: "km",
    noms: { a: "le premier trajet", b: "le second trajet", c: "la distance à vol d’oiseau" },
    triplets: [[3, 4, 5], [6, 8, 10], [5, 12, 13], [9, 12, 15], [8, 15, 17], [1.2, 1.6, 2], [2.4, 1, 2.6], [0.9, 1.2, 1.5]],
    hyp: [
      (a, b) => `Une cycliste roule ${a} vers l’est, puis ${b} vers le nord, sur des routes droites. À quelle distance, à vol d’oiseau, est-elle de son point de départ ?`,
      (a, b) => `Un randonneur marche ${a} plein ouest, puis tourne à angle droit et marche ${b} plein sud. À quelle distance en ligne droite se trouve-t-il de son départ ?`,
    ],
    cote: [
      (c, a) => `Un bateau quitte le port, navigue ${a} vers l’est, puis vire vers le nord. Il se trouve alors à ${c} du port à vol d’oiseau. Quelle distance a-t-il parcourue vers le nord ?`,
      (c, a) => `Une randonneuse marche ${a} vers l’ouest, puis tourne à angle droit vers le sud. Elle se trouve alors à ${c} de son départ en ligne droite. Quelle distance a-t-elle parcourue vers le sud ?`,
    ],
  },
  {
    unite: "m",
    noms: { a: "la distance entre le pied du mât et le point d’ancrage", b: "la hauteur de fixation", c: "la longueur du câble" },
    triplets: [[5, 12, 13], [6, 8, 10], [8, 15, 17], [7, 24, 25], [9, 12, 15], [2.5, 6, 6.5]],
    hyp: [
      (a, b) => `Une antenne verticale est tenue par un câble fixé à ${b} de hauteur et ancré au sol à ${a} du pied de l’antenne. Quelle est la longueur du câble ?`,
      (a, b) => `Pour tenir le mât vertical d’un chapiteau, on tend une corde depuis un point situé à ${b} de haut jusqu’à un piquet planté à ${a} du pied du mât. Combien mesure la corde ?`,
    ],
    cote: [
      (c, a) => `Un câble de ${c} relie le sommet d’un poteau vertical à un point du sol situé à ${a} du pied du poteau. Quelle est la hauteur du poteau ?`,
      (c, a) => `Une corde tendue de ${c} part du haut d’un mât vertical et arrive au sol à ${a} du pied du mât. Quelle est la hauteur du mât ?`,
    ],
  },
  {
    unite: "m",
    noms: { a: "le déplacement horizontal", b: "l’altitude", c: "la distance en ligne droite" },
    triplets: [[40, 30, 50], [45, 60, 75], [20, 21, 29], [36, 48, 60], [24, 10, 26]],
    hyp: [
      (a, b) => `Un drone décolle, monte verticalement à ${b}, puis avance horizontalement de ${a}. À quelle distance en ligne droite est-il de son point de décollage ?`,
      (a, b) => `Un drone vole à ${b} d’altitude, à la verticale d’un point du sol situé à ${a} de son pilote. On néglige la taille du pilote. À quelle distance du pilote se trouve le drone ?`,
    ],
    cote: [
      (c, a) => `Un drone est à ${c} de son pilote, en ligne droite. Il vole à la verticale d’un point du sol situé à ${a} du pilote. On néglige la taille du pilote. À quelle altitude vole-t-il ?`,
      (c, a) => `Après avoir avancé horizontalement de ${a}, un drone se trouve à ${c} de son point de décollage, en ligne droite. À quelle hauteur vole-t-il ?`,
    ],
  },
  {
    unite: "cm",
    noms: { a: "la branche fixée au mur", b: "la branche sous la tablette", c: "la barre de renfort" },
    triplets: [[30, 40, 50], [24, 18, 30], [15, 20, 25], [21, 20, 29], [12, 16, 20]],
    hyp: [
      (a, b) => `Une équerre d’étagère a deux branches perpendiculaires de ${a} et ${b}. On la renforce par une barre qui relie leurs extrémités. Quelle est la longueur de cette barre ?`,
      (a, b) => `Sous une tablette fixée à angle droit sur un mur, Malik pose un renfort en biais : il part du mur à ${a} sous la tablette et arrive sous la tablette à ${b} du mur. Combien mesure le renfort ?`,
    ],
    cote: [
      (c, a) => `Une barre de renfort de ${c} relie un mur à une tablette perpendiculaire au mur. Elle part du mur à ${a} sous la tablette. À quelle distance du mur arrive-t-elle sous la tablette ?`,
      (c, a) => `Une équerre d’étagère a une branche de ${a} ; la barre qui relie les extrémités de ses deux branches perpendiculaires mesure ${c}. Combien mesure l’autre branche ?`,
    ],
  },
  {
    unite: "m",
    noms: { a: "la distance au sol", b: "la hauteur de départ", c: "la longueur de la glissière" },
    triplets: [[2.4, 1.8, 3], [4, 3, 5], [3.2, 2.4, 4], [2, 1.5, 2.5], [2.4, 1, 2.6]],
    hyp: [
      (a, b) => `La glissière droite d’un toboggan part d’une plateforme à ${b} de haut et arrive au sol à ${a} du pied de la plateforme. Quelle est la longueur de la glissière ?`,
      (a, b) => `Dans un parc, un toboggan descend de ${b} de hauteur sur ${a} mesurés au sol. Combien mesure sa glissière, supposée droite ?`,
    ],
    cote: [
      (c, a) => `La glissière droite d’un toboggan mesure ${c} et s’étend sur ${a} au sol. De quelle hauteur part-elle ?`,
      (c, a) => `Un toboggan a une glissière droite de ${c}. Son pied est à ${a} de la plateforme verticale. À quelle hauteur est la plateforme ?`,
    ],
  },
  {
    unite: "m",
    noms: { a: "la largeur du portail", b: "sa hauteur", c: "la barre en diagonale" },
    triplets: [[3, 1.6, 3.4], [2.4, 1, 2.6], [3.6, 1.5, 3.9], [4.5, 2.4, 5.1]],
    hyp: [
      (a, b) => `Un portail rectangulaire mesure ${a} de large et ${b} de haut. On fixe une barre en diagonale pour le rigidifier. Quelle est la longueur de la barre ?`,
      (a, b) => `Un forgeron soude une barre en diagonale sur un portail rectangulaire large de ${a} et haut de ${b}. Quelle longueur de barre doit-il couper ?`,
    ],
    cote: [
      (c, a) => `La barre diagonale d’un portail rectangulaire mesure ${c} ; le portail est large de ${a}. Quelle est sa hauteur ?`,
      (c, a) => `Un portail rectangulaire de ${a} de large est renforcé par une barre diagonale de ${c}. Quelle est la hauteur du portail ?`,
    ],
  },
  {
    unite: "cm",
    noms: { a: "la longueur du fond de la boîte", b: "sa largeur", c: "sa diagonale" },
    triplets: [[30, 16, 34], [24, 10, 26], [32, 24, 40], [36, 15, 39]],
    hyp: [
      (a, b) => `Le fond d’une boîte à chaussures est un rectangle de ${a} sur ${b}. Quelle est la longueur du plus long crayon qu’on peut y poser à plat ?`,
      (a, b) => `Un tiroir a un fond rectangulaire de ${a} sur ${b}. Quelle est la longueur de sa diagonale ?`,
    ],
    cote: [
      (c, a) => `Une règle de ${c} tient tout juste à plat, en diagonale, au fond d’une boîte rectangulaire de ${a} de long. Quelle est la largeur de la boîte ?`,
      (c, a) => `La diagonale du fond rectangulaire d’un tiroir mesure ${c}, et sa longueur ${a}. Quelle est sa largeur ?`,
    ],
  },
  {
    unite: "m",
    noms: { a: "la longueur couverte au sol", b: "la hauteur du quai", c: "la longueur de la cale" },
    triplets: [[2.4, 0.7, 2.5], [4.8, 1.4, 5], [3.5, 1.2, 3.7], [6, 1.1, 6.1]],
    hyp: [
      (a, b) => `Au port de Saint-Pierre, une cale inclinée permet de mettre les bateaux à l’eau. Elle descend de ${b} et s’étend sur ${a} à l’horizontale. Quelle est la longueur de la cale ?`,
      (a, b) => `Une passerelle droite relie un quai à un ponton situé ${b} plus bas ; à l’horizontale, elle couvre ${a}. Combien mesure la passerelle ?`,
    ],
    cote: [
      (c, a) => `Au port de Saint-Pierre, une cale de mise à l’eau de ${c} s’étend sur ${a} à l’horizontale. De quelle hauteur descend-elle ?`,
      (c, a) => `Une passerelle droite de ${c} relie un quai à un ponton plus bas ; à l’horizontale, elle couvre ${a}. Quelle est la différence de hauteur entre le quai et le ponton ?`,
    ],
  },
  {
    unite: "m",
    noms: { a: "la demi-largeur de la tente", b: "sa hauteur", c: "la longueur d’un pan de toile" },
    triplets: [[0.9, 1.2, 1.5], [1.2, 1.6, 2], [1.5, 0.8, 1.7], [1, 2.4, 2.6]],
    hyp: [
      (a, b) => `Une tente canadienne a la forme d’un toit à deux pans. Sa hauteur au milieu est de ${b} et sa demi-largeur au sol de ${a}. Quelle est la longueur d’un pan de toile, du sommet au sol ?`,
      (a, b) => `Pour un bivouac, Noé monte une tente à deux pans : le mât central mesure ${b}, et chaque pan touche le sol à ${a} du pied du mât. Combien mesure un pan ?`,
    ],
    cote: [
      (c, a) => `Les pans d’une tente canadienne mesurent ${c} du sommet au sol, et touchent le sol à ${a} du milieu de la tente. Quelle est la hauteur de la tente ?`,
      (c, a) => `Une tente à deux pans a des pans de ${c}. Chaque pan touche le sol à ${a} du pied du mât central. Combien mesure le mât ?`,
    ],
  },
];

/** Un problème concret : demande l'hypoténuse (avec arrondi au dixième pour une partie des tirages). */
function situationHypotenuse(arrondir: boolean) {
  const s = randomChoice(SITUATIONS);
  let [a, b] = randomChoice(s.triplets);
  const pas = s.triplets.some((t) => t.some((x) => !Number.isInteger(x))) ? 0.1 : 1;
  if (arrondir) {
    // Jamais deux côtés égaux (une piscine « 21 m sur 21 m » est un carré).
    const bougerA = randomChoice([true, false]) ? Math.round((a + pas) * 10) / 10 !== b : Math.round((b + pas) * 10) / 10 === a;
    if (bougerA) a = Math.round((a + pas) * 10) / 10;
    else b = Math.round((b + pas) * 10) / 10;
  }
  const S = sq(a) + sq(b);
  const exact = racineExacte(S);
  const c = arrondi1(Math.sqrt(S));
  const L = (x: number) => `${fr(x)} ${s.unite}`;
  const text = randomChoice(s.hyp)(L(a), L(b)) + (exact ? "" : randomChoice(SUFFIXES_ARRONDI));
  const explanation =
    `Définition : on modélise par un triangle rectangle : ${s.noms.a} et ${s.noms.b} sont les côtés de l’angle droit, ${s.noms.c} est l’hypoténuse.\n\n` +
    "Méthode : d’après le théorème de Pythagore, le carré de l’hypoténuse est la somme des carrés des côtés de l’angle droit.\n\n" +
    `Calcul : en notant c la longueur cherchée, c² = ${fr(a)}² + ${fr(b)}² = ${fr(sq(a))} + ${fr(sq(b))} = ${fr(S)}, donc c = √${fr(S)} ${exact ? "=" : "≈"} ${frA(c, exact)}${exact ? "" : " (arrondi au dixième)"}.\n\n` +
    `Conclusion : ${s.noms.c} mesure ${exact ? "" : "environ "}${frA(c, exact)} ${s.unite}.`;
  return { s, a, b, c, S, exact, pas, L, text, explanation };
}

/** Un problème concret : demande un côté de l'angle droit. */
function situationCote(arrondir: boolean) {
  const s = randomChoice(SITUATIONS);
  const [a, , c0] = randomChoice(s.triplets);
  const pas = s.triplets.some((t) => t.some((x) => !Number.isInteger(x))) ? 0.1 : 1;
  const c = arrondir ? Math.round((c0 + pas) * 10) / 10 : c0;
  const D = Math.round((sq(c) - sq(a)) * 10000) / 10000;
  const exact = racineExacte(D);
  const b = arrondi1(Math.sqrt(D));
  const L = (x: number) => `${fr(x)} ${s.unite}`;
  const text = randomChoice(s.cote)(L(c), L(a)) + (exact ? "" : randomChoice(SUFFIXES_ARRONDI));
  const explanation =
    `Définition : on modélise par un triangle rectangle : ${s.noms.c} est l’hypoténuse ; ${s.noms.a} et ${s.noms.b} sont les côtés de l’angle droit.\n\n` +
    "Méthode : on cherche un côté de l’angle droit, donc on SOUSTRAIT : son carré est le carré de l’hypoténuse moins le carré de l’autre côté.\n\n" +
    `Calcul : en notant b la longueur cherchée, b² = ${fr(c)}² − ${fr(a)}² = ${fr(sq(c))} − ${fr(sq(a))} = ${fr(D)}, donc b = √${fr(D)} ${exact ? "=" : "≈"} ${frA(b, exact)}${exact ? "" : " (arrondi au dixième)"}.\n\n` +
    `Conclusion : ${s.noms.b} mesure ${exact ? "" : "environ "}${frA(b, exact)} ${s.unite}.`;
  return { s, a, b, c, D, exact, pas, L, text, explanation };
}

/* =========================================================================
   RECONNAÎTRE
========================================================================= */

function explHypotenuse(t: TriangleNomme): string {
  return (
    "Définition : dans un triangle rectangle, l’hypoténuse est le côté opposé à l’angle droit ; c’est aussi le plus grand côté.\n\n" +
    `Méthode : on repère l’angle droit, en ${t.droit}, puis le côté qui ne passe pas par ${t.droit}.\n\n` +
    `Calcul : les côtés [${t.c1}] et [${t.c2}] partent de ${t.droit} : ce sont les côtés de l’angle droit. Le côté en face est [${t.hyp}].\n\n` +
    `Conclusion : l’hypoténuse du triangle ${t.nom} est [${t.hyp}].`
  );
}

/** ★1 — sans figure : hypoténuse, sommet de l'angle droit, nature d'un côté, côtés de l'angle droit. */
function genReconnaitreTexte(): Q {
  const t = tirerTriangle();
  const mode = randomInt(0, 3);
  if (mode === 0) {
    return {
      text: randomChoice([
        `Le triangle ${t.nom} est rectangle en ${t.droit}. Quelle est son hypoténuse ?`,
        `${t.nom} est un triangle rectangle en ${t.droit}. Quel côté est l’hypoténuse ?`,
        `Dans le triangle ${t.nom} rectangle en ${t.droit}, quel est le côté opposé à l’angle droit ?`,
        `On sait que le triangle ${t.nom} a un angle droit en ${t.droit}. Quel est son plus grand côté ?`,
      ]),
      format: "qcm",
      choices: shuffle([t.hyp, t.c1, t.c2]),
      expected: [t.hyp],
      comparator: "mcq_exact",
      explanation: explHypotenuse(t),
    };
  }
  if (mode === 1) {
    return {
      text: randomChoice([
        `Dans le triangle rectangle ${t.nom}, l’hypoténuse est [${t.hyp}]. En quel sommet est l’angle droit ?`,
        `Le côté [${t.hyp}] est l’hypoténuse du triangle rectangle ${t.nom}. Où se trouve l’angle droit ?`,
        `Le triangle ${t.nom} est rectangle et son plus grand côté est [${t.hyp}]. Quel est le sommet de l’angle droit ?`,
      ]),
      format: "qcm",
      choices: shuffle([`en ${t.droit}`, `en ${t.p}`, `en ${t.q}`]),
      expected: [`en ${t.droit}`],
      comparator: "mcq_exact",
      explanation:
        "Définition : l’hypoténuse est le côté opposé à l’angle droit.\n\n" +
        "Méthode : l’angle droit est au sommet que l’hypoténuse ne touche pas.\n\n" +
        `Calcul : [${t.hyp}] relie ${t.p} et ${t.q} ; le seul sommet qu’il ne touche pas est ${t.droit}.\n\n` +
        `Conclusion : le triangle ${t.nom} est rectangle en ${t.droit}.`,
    };
  }
  if (mode === 2) {
    const estHyp = randomChoice([true, false]);
    const cote = estHyp ? t.hyp : randomChoice([t.c1, t.c2]);
    return {
      text: randomChoice([
        `Le triangle ${t.nom} est rectangle en ${t.droit}. Le côté [${cote}] est-il l’hypoténuse ou un côté de l’angle droit ?`,
        `Dans le triangle ${t.nom} rectangle en ${t.droit}, que représente le côté [${cote}] ?`,
      ]),
      format: "qcm",
      choices: ["l’hypoténuse", "un côté de l’angle droit", "on ne peut pas savoir"],
      expected: [estHyp ? "l’hypoténuse" : "un côté de l’angle droit"],
      comparator: "mcq_exact",
      explanation:
        "Définition : l’hypoténuse est le côté opposé à l’angle droit ; les deux autres côtés forment l’angle droit.\n\n" +
        `Méthode : on regarde si le côté [${cote}] passe par le sommet ${t.droit} de l’angle droit.\n\n` +
        (estHyp
          ? `Calcul : [${cote}] ne passe pas par ${t.droit} : il est en face de l’angle droit.\n\n`
          : `Calcul : [${cote}] passe par ${t.droit} : il forme l’angle droit.\n\n`) +
        `Conclusion : [${cote}] est ${estHyp ? "l’hypoténuse" : "un côté de l’angle droit"}.`,
    };
  }
  const bon = `${t.c1} et ${t.c2}`;
  return {
    text: randomChoice([
      `Le triangle ${t.nom} est rectangle en ${t.droit}. Quels sont les côtés de l’angle droit ?`,
      `Dans le triangle ${t.nom} rectangle en ${t.droit}, quels côtés forment l’angle droit ?`,
    ]),
    format: "qcm",
    choices: shuffle([bon, `${t.c1} et ${t.hyp}`, `${t.c2} et ${t.hyp}`]),
    expected: [bon],
    comparator: "mcq_exact",
    explanation:
      "Définition : les côtés de l’angle droit sont les deux côtés qui partent du sommet de l’angle droit.\n\n" +
      `Méthode : on cherche les côtés qui passent par ${t.droit}.\n\n` +
      `Calcul : [${t.c1}] et [${t.c2}] passent par ${t.droit} ; [${t.hyp}] est en face.\n\n` +
      `Conclusion : les côtés de l’angle droit sont [${t.c1}] et [${t.c2}].`,
  };
}

/** ★2 — avec la figure codée : l'hypoténuse se lit sur le codage. */
function genReconnaitreFigure(): Q {
  const t = tirerTriangle();
  return {
    text: randomChoice([
      `Dans le triangle ${t.nom} représenté, quel côté est l’hypoténuse ?`,
      `Sur la figure, le triangle ${t.nom} est codé rectangle. Quelle est son hypoténuse ?`,
      `Quel côté du triangle ${t.nom} est opposé à l’angle droit codé sur la figure ?`,
      `Le petit carré code l’angle droit du triangle ${t.nom}. Lequel de ses côtés est l’hypoténuse ?`,
      `Sur la figure, quel est le plus long côté du triangle rectangle ${t.nom} ?`,
    ]),
    format: "qcm",
    choices: shuffle([t.hyp, t.c1, t.c2]),
    expected: [t.hyp],
    comparator: "mcq_exact",
    explanation: explHypotenuse(t),
    canvas: figureRectangleNue(t),
  };
}

/** ★2 — avec la figure : sommet de l'angle droit ou côtés de l'angle droit. */
function genReconnaitreFigureSommet(): Q {
  const t = tirerTriangle();
  const canvas = figureRectangleNue(t);
  if (randomChoice([true, false])) {
    return {
      text: randomChoice([
        `En quel sommet le triangle ${t.nom} représenté est-il rectangle ?`,
        `Sur la figure, où est l’angle droit du triangle ${t.nom} ?`,
        `Lis le codage de la figure : le triangle ${t.nom} est rectangle en…`,
      ]),
      format: "qcm",
      choices: shuffle([t.droit, t.p, t.q]),
      expected: [t.droit],
      comparator: "mcq_exact",
      explanation:
        "Définition : l’angle droit est codé par un petit carré.\n\n" +
        "Méthode : on cherche le sommet qui porte ce petit carré.\n\n" +
        `Calcul : le petit carré est en ${t.droit}.\n\n` +
        `Conclusion : le triangle ${t.nom} est rectangle en ${t.droit} ; son hypoténuse est [${t.hyp}].`,
      canvas,
    };
  }
  const bon = `${t.c1} et ${t.c2}`;
  return {
    text: randomChoice([
      `Quels sont les côtés de l’angle droit du triangle ${t.nom} représenté ?`,
      `Sur la figure, quels côtés du triangle ${t.nom} forment l’angle droit ?`,
    ]),
    format: "qcm",
    choices: shuffle([bon, `${t.c1} et ${t.hyp}`, `${t.c2} et ${t.hyp}`]),
    expected: [bon],
    comparator: "mcq_exact",
    explanation:
      "Définition : les côtés de l’angle droit partent du sommet codé.\n\n" +
      `Méthode : le petit carré est en ${t.droit} ; on prend les deux côtés qui passent par ${t.droit}.\n\n` +
      `Calcul : [${t.c1}] et [${t.c2}] passent par ${t.droit}.\n\n` +
      `Conclusion : les côtés de l’angle droit sont [${t.c1}] et [${t.c2}] ; l’hypoténuse est [${t.hyp}].`,
    canvas,
  };
}

/** ★2 — peut-on appliquer Pythagore ? Seul le codage le dit. */
function genPeutOnAppliquer(): Q {
  const isRight = randomChoice([true, false]);
  const t = tirerTriangle();
  let canvas: TriangleCanvasData;
  if (isRight) {
    canvas = figureRectangleNue(t);
  } else {
    let a = 0;
    let b = 0;
    let c = 0;
    do {
      a = randomInt(5, 12);
      b = randomInt(5, 12);
      c = randomInt(Math.max(a, b), a + b - 2);
    } while (Math.abs(a * a + b * b - c * c) < 15);
    canvas = figureALEchelle({ labels: t.labels, AB: a, CA: b, BC: c });
  }
  return {
    text: randomChoice([
      `Peut-on utiliser directement le théorème de Pythagore dans le triangle ${t.nom} ?`,
      `Le théorème de Pythagore s’applique-t-il directement au triangle ${t.nom} de la figure ?`,
      `Avec cette figure, a-t-on le droit d’écrire l’égalité de Pythagore dans le triangle ${t.nom} ?`,
      `Sur la figure, le triangle ${t.nom} permet-il d’appliquer directement le théorème de Pythagore ?`,
    ]),
    format: "qcm",
    choices: ["oui", "non"],
    expected: [isRight ? "oui" : "non"],
    comparator: "mcq_exact",
    explanation:
      "Définition : le théorème de Pythagore ne s’applique QUE dans un triangle rectangle.\n\n" +
      "Méthode : avant tout calcul, on cherche l’angle droit CODÉ sur la figure (le petit carré).\n\n" +
      (isRight
        ? `Calcul : le triangle ${t.nom} porte un angle droit codé, en ${t.droit}.\n\nConclusion : oui, on peut appliquer Pythagore, avec [${t.hyp}] pour hypoténuse.`
        : `Calcul : aucun angle droit n’est codé sur ${t.nom}.\n\nConclusion : non. Un triangle qui « a l’air » rectangle ne l’est pas forcément : seul le codage (ou l’énoncé) le prouve.`),
    canvas,
  };
}

/** ★2 — l'angle droit n'est pas toujours au même endroit : où est l'hypoténuse dans les données ? */
function genHypotenuseReperee(): Q {
  const t = tirerTriangle();
  const [x1, x2, h] = tirerTriplet("simple");
  const u = randomChoice(UNITES);
  if (randomChoice([true, false])) {
    return {
      text: randomChoice([
        `Le triangle ${t.nom} est rectangle en ${t.droit}. ${t.c1} = ${fr(x1)} ${u} et ${t.c2} = ${fr(x2)} ${u}.\nCombien mesure ${t.hyp} ?`,
        `${t.nom} est rectangle en ${t.droit}, avec ${t.c2} = ${fr(x2)} ${u} et ${t.c1} = ${fr(x1)} ${u}. Quelle est la longueur ${t.hyp} ?`,
        `Dans le triangle ${t.nom}, l’angle droit est en ${t.droit} ; ${t.c1} = ${fr(x1)} ${u} et ${t.c2} = ${fr(x2)} ${u}. Calcule ${t.hyp}.`,
      ]),
      format: "short",
      expected: attendu(h, u),
      comparator: "number_equal",
      explanation: explHypNomme(t, x1, x2, u),
    };
  }
  return {
    text: randomChoice([
      `Le triangle ${t.nom} est rectangle en ${t.droit}. ${t.hyp} = ${fr(h)} ${u} et ${t.c1} = ${fr(x1)} ${u}.\nCombien mesure ${t.c2} ?`,
      `${t.nom} est rectangle en ${t.droit}, avec ${t.c1} = ${fr(x1)} ${u} et ${t.hyp} = ${fr(h)} ${u}. Quelle est la longueur ${t.c2} ?`,
      `Dans le triangle ${t.nom}, l’angle droit est en ${t.droit} ; ${t.hyp} = ${fr(h)} ${u} et ${t.c1} = ${fr(x1)} ${u}. Calcule ${t.c2}.`,
    ]),
    format: "short",
    expected: attendu(x2, u),
    comparator: "number_equal",
    explanation: explCoteNomme(t, h, x1, u),
  };
}

/** ★3 — quelle égalité de Pythagore écrire dans ce triangle ? */
function genEgaliteNommee(): Q {
  const t = tirerTriangle();
  const bon = `${t.hyp}² = ${t.c1}² + ${t.c2}²`;
  const avecFigure = Math.random() < 0.4;
  return {
    text: avecFigure
      ? randomChoice([
          `Le triangle ${t.nom} de la figure est codé rectangle. Quelle égalité est juste ?`,
          `D’après le codage de la figure, quelle égalité de Pythagore peut-on écrire dans le triangle ${t.nom} ?`,
        ])
      : randomChoice([
          `Le triangle ${t.nom} est rectangle en ${t.droit}. Quelle égalité de Pythagore est juste ?`,
          `Dans le triangle ${t.nom} rectangle en ${t.droit}, laquelle de ces égalités est vraie ?`,
          `${t.nom} est rectangle en ${t.droit}. Quelle égalité peut-on écrire d’après le théorème de Pythagore ?`,
        ]),
    format: "qcm",
    choices: qcm(bon, [
      `${t.c1}² = ${t.hyp}² + ${t.c2}²`,
      `${t.c2}² = ${t.c1}² + ${t.hyp}²`,
      `${t.hyp} = ${t.c1} + ${t.c2}`,
      `${t.hyp}² = ${t.c1}² − ${t.c2}²`,
    ]),
    expected: [bon],
    comparator: "mcq_exact",
    explanation:
      "Définition : dans un triangle rectangle, le carré de l’hypoténuse est égal à la somme des carrés des deux côtés de l’angle droit.\n\n" +
      `Méthode : l’angle droit est en ${t.droit} ; l’hypoténuse est le côté qui ne passe pas par ${t.droit}, c’est [${t.hyp}]. Elle est SEULE dans un membre de l’égalité.\n\n` +
      `Calcul : ${t.hyp}² = ${t.c1}² + ${t.c2}².\n\n` +
      `Conclusion : l’égalité juste est ${bon}.`,
    canvas: avecFigure ? figureRectangleNue(t) : undefined,
  };
}

/** ★3 — additionner ou soustraire les carrés ? Tout dépend du côté cherché. */
function genQuelleOperation(): Q {
  const t = tirerTriangle();
  if (randomChoice([true, false])) {
    const bon = `additionner les carrés : ${t.hyp}² = ${t.c1}² + ${t.c2}²`;
    return {
      text: randomChoice([
        `Le triangle ${t.nom} est rectangle en ${t.droit}. On connaît ${t.c1} et ${t.c2}. Pour calculer ${t.hyp}, on doit…`,
        `Dans le triangle ${t.nom} rectangle en ${t.droit}, on cherche ${t.hyp} à partir de ${t.c1} et ${t.c2}. Que faut-il faire ?`,
        `${t.nom} est rectangle en ${t.droit}. On veut ${t.hyp}, et on connaît les deux autres côtés. Quelle est la bonne méthode ?`,
      ]),
      format: "qcm",
      choices: qcm(bon, [
        `soustraire les carrés : ${t.hyp}² = ${t.c1}² − ${t.c2}²`,
        `additionner les longueurs : ${t.hyp} = ${t.c1} + ${t.c2}`,
        `multiplier les longueurs : ${t.hyp} = ${t.c1} × ${t.c2}`,
      ]),
      expected: [bon],
      comparator: "mcq_exact",
      explanation:
        "Définition : dans un triangle rectangle, le carré de l’hypoténuse est la somme des carrés des deux autres côtés.\n\n" +
        `Méthode : l’angle droit est en ${t.droit}, donc [${t.hyp}] est l’hypoténuse : c’est elle qu’on cherche.\n\n` +
        `Calcul : ${t.hyp}² = ${t.c1}² + ${t.c2}², puis on prend la racine carrée.\n\n` +
        "Conclusion : on additionne les carrés.",
    };
  }
  const bon = `soustraire les carrés : ${t.c2}² = ${t.hyp}² − ${t.c1}²`;
  return {
    text: randomChoice([
      `Le triangle ${t.nom} est rectangle en ${t.droit}. On connaît ${t.hyp} et ${t.c1}. Pour calculer ${t.c2}, on doit…`,
      `Dans le triangle ${t.nom} rectangle en ${t.droit}, on cherche ${t.c2} à partir de ${t.hyp} et ${t.c1}. Que faut-il faire ?`,
      `${t.nom} est rectangle en ${t.droit}. On veut ${t.c2}, et on connaît ${t.hyp} et ${t.c1}. Quelle est la bonne méthode ?`,
    ]),
    format: "qcm",
    choices: qcm(bon, [
      `additionner les carrés : ${t.c2}² = ${t.hyp}² + ${t.c1}²`,
      `soustraire les longueurs : ${t.c2} = ${t.hyp} − ${t.c1}`,
      `soustraire les carrés : ${t.c2}² = ${t.c1}² − ${t.hyp}²`,
    ]),
    expected: [bon],
    comparator: "mcq_exact",
    explanation:
      `Définition : dans le triangle ${t.nom} rectangle en ${t.droit}, ${t.hyp}² = ${t.c1}² + ${t.c2}².\n\n` +
      `Méthode : [${t.c2}] passe par ${t.droit} : c’est un côté de l’angle droit, pas l’hypoténuse. On isole ${t.c2}² en retirant ${t.c1}².\n\n` +
      `Calcul : ${t.c2}² = ${t.hyp}² − ${t.c1}² (le plus grand carré moins le plus petit).\n\n` +
      "Conclusion : on soustrait les carrés.",
  };
}

/* =========================================================================
   CALCULER L'HYPOTÉNUSE ET UN CÔTÉ — triangles nommés
========================================================================= */

function explHypNomme(t: TriangleNomme, x1: number, x2: number, u: string): string {
  const S = sq(x1) + sq(x2);
  const exact = racineExacte(S);
  const h = arrondi1(Math.sqrt(S));
  return (
    `Définition : le triangle ${t.nom} est rectangle en ${t.droit}, donc son hypoténuse est [${t.hyp}], le côté opposé à l’angle droit.\n\n` +
    `Méthode : d’après le théorème de Pythagore, ${t.hyp}² = ${t.c1}² + ${t.c2}².\n\n` +
    `Calcul : ${t.hyp}² = ${fr(x1)}² + ${fr(x2)}² = ${fr(sq(x1))} + ${fr(sq(x2))} = ${fr(S)}, donc ${t.hyp} = √${fr(S)} ${exact ? "=" : "≈"} ${frA(h, exact)}.\n\n` +
    `Conclusion : ${t.hyp} ${exact ? "=" : "≈"} ${frA(h, exact)} ${u}.`
  );
}
function explCoteNomme(t: TriangleNomme, h: number, x1: number, u: string): string {
  const D = Math.round((sq(h) - sq(x1)) * 10000) / 10000;
  const exact = racineExacte(D);
  const r = arrondi1(Math.sqrt(D));
  return (
    `Définition : le triangle ${t.nom} est rectangle en ${t.droit} ; son hypoténuse est [${t.hyp}] et [${t.c2}] est un côté de l’angle droit.\n\n` +
    `Méthode : d’après le théorème de Pythagore, ${t.hyp}² = ${t.c1}² + ${t.c2}², donc ${t.c2}² = ${t.hyp}² − ${t.c1}² : on SOUSTRAIT.\n\n` +
    `Calcul : ${t.c2}² = ${fr(h)}² − ${fr(x1)}² = ${fr(sq(h))} − ${fr(sq(x1))} = ${fr(D)}, donc ${t.c2} = √${fr(D)} ${exact ? "=" : "≈"} ${frA(r, exact)}.\n\n` +
    `Conclusion : ${t.c2} ${exact ? "=" : "≈"} ${frA(r, exact)} ${u}.`
  );
}

/** L'hypoténuse d'un triangle nommé, avec la figure à l'échelle. */
function genHypNomme(sorte: SorteTriplet): Q {
  const t = tirerTriangle();
  const [x1, x2, h] = tirerTriplet(sorte);
  const u = uniteDe(x1, x2);
  const A = `${fr(x1)} ${u}`;
  const B = `${fr(x2)} ${u}`;
  return {
    text: randomChoice([
      `Le triangle ${t.nom} est rectangle en ${t.droit}, avec ${t.c1} = ${A} et ${t.c2} = ${B}. Calcule ${t.hyp}.`,
      `${t.nom} est un triangle rectangle en ${t.droit} tel que ${t.c2} = ${B} et ${t.c1} = ${A}. Quelle est la longueur de l’hypoténuse [${t.hyp}] ?`,
      `Dans le triangle ${t.nom} rectangle en ${t.droit}, on donne ${t.c1} = ${A} et ${t.c2} = ${B}. Combien mesure ${t.hyp} ?`,
      `On sait que ${t.nom} est rectangle en ${t.droit}, que ${t.c1} = ${A} et que ${t.c2} = ${B}. Détermine la longueur ${t.hyp}.`,
      `Le triangle ${t.nom} de la figure est rectangle en ${t.droit}. Ses côtés [${t.c1}] et [${t.c2}] mesurent ${A} et ${B}. Quelle est la longueur de son hypoténuse ?`,
    ]),
    format: "short",
    expected: attendu(h, u),
    comparator: "number_equal",
    explanation: explHypNomme(t, x1, x2, u),
    canvas: figureALEchelle({
      labels: t.labels, AB: x1, CA: x2, BC: h, angleDroitEnA: true,
      sideLabels: { AB: fr(x1), CA: fr(x2), BC: "?" },
    }),
  };
}

/** Le carré de l'hypoténuse, première étape du calcul. */
function genHypCarre(sorte: SorteTriplet): Q {
  const t = tirerTriangle();
  const [x1, x2, h] = tirerTriplet(sorte);
  const u = uniteDe(x1, x2);
  const A = `${fr(x1)} ${u}`;
  const B = `${fr(x2)} ${u}`;
  const S = sq(x1) + sq(x2);
  return {
    text: randomChoice([
      `Le triangle ${t.nom} est rectangle en ${t.droit}, avec ${t.c1} = ${A} et ${t.c2} = ${B}. Combien vaut ${t.hyp}² ?`,
      `Dans le triangle ${t.nom} rectangle en ${t.droit}, ${t.c1} = ${A} et ${t.c2} = ${B}. Calcule ${t.hyp}².`,
      `${t.nom} est rectangle en ${t.droit} ; ses côtés de l’angle droit mesurent ${A} et ${B}. Quelle est la valeur de ${t.hyp}² ?`,
      `On veut calculer l’hypoténuse [${t.hyp}] du triangle ${t.nom}, rectangle en ${t.droit}, sachant que ${t.c2} = ${B} et ${t.c1} = ${A}. Première étape : que vaut ${t.hyp}² ?`,
    ]),
    format: "short",
    expected: attenduNombre(S),
    comparator: "number_equal",
    explanation:
      `Définition : le triangle ${t.nom} est rectangle en ${t.droit}, son hypoténuse est [${t.hyp}].\n\n` +
      `Méthode : d’après le théorème de Pythagore, ${t.hyp}² = ${t.c1}² + ${t.c2}².\n\n` +
      `Calcul : ${t.hyp}² = ${fr(x1)}² + ${fr(x2)}² = ${fr(sq(x1))} + ${fr(sq(x2))} = ${fr(S)}.\n\n` +
      `Conclusion : ${t.hyp}² = ${fr(S)} (et donc ${t.hyp} = √${fr(S)} = ${fr(h)} ${u}).`,
    canvas: figureALEchelle({
      labels: t.labels, AB: x1, CA: x2, BC: h, angleDroitEnA: true,
      sideLabels: { AB: fr(x1), CA: fr(x2), BC: "?" },
    }),
  };
}

/** Côté de l'angle droit d'un triangle nommé. `sorte` règle la difficulté. */
function coteNomme(sorte: SorteTriplet, arrondir: boolean): Q {
  const t = tirerTriangle();
  const [x1, , h0] = tirerTriplet(sorte);
  const h = arrondir ? Math.round((h0 + (sorte === "decimal" ? 0.1 : 1)) * 10) / 10 : h0;
  const D = Math.round((sq(h) - sq(x1)) * 10000) / 10000;
  const exact = racineExacte(D);
  const x2 = arrondi1(Math.sqrt(D));
  const u = uniteDe(x1, h);
  const A = `${fr(x1)} ${u}`;
  const H = `${fr(h)} ${u}`;
  const text =
    randomChoice([
      `Le triangle ${t.nom} est rectangle en ${t.droit}, avec ${t.hyp} = ${H} et ${t.c1} = ${A}. Calcule ${t.c2}.`,
      `${t.nom} est un triangle rectangle en ${t.droit} ; son hypoténuse [${t.hyp}] mesure ${H} et ${t.c1} = ${A}. Quelle est la longueur ${t.c2} ?`,
      `Dans le triangle ${t.nom} rectangle en ${t.droit}, on donne ${t.c1} = ${A} et ${t.hyp} = ${H}. Combien mesure ${t.c2} ?`,
      `On sait que ${t.nom} est rectangle en ${t.droit}, que ${t.hyp} = ${H} et que ${t.c1} = ${A}. Détermine ${t.c2}.`,
    ]) + (exact ? "" : randomChoice(SUFFIXES_ARRONDI));
  return {
    text,
    format: "short",
    expected: attendu(x2, u, exact),
    comparator: "number_equal",
    explanation: explCoteNomme(t, h, x1, u),
    canvas: figureALEchelle({
      labels: t.labels, AB: x1, CA: Math.sqrt(D), BC: h, angleDroitEnA: true,
      sideLabels: { AB: fr(x1), CA: "?", BC: fr(h) },
    }),
  };
}

/** ★3 — le carré d'un côté de l'angle droit. */
function genCoteCarre(): Q {
  const t = tirerTriangle();
  const [x1, x2, h] = tirerTriplet("varie");
  const u = randomChoice(UNITES);
  const D = sq(h) - sq(x1);
  return {
    text: randomChoice([
      `Le triangle ${t.nom} est rectangle en ${t.droit}, avec ${t.hyp} = ${fr(h)} ${u} et ${t.c1} = ${fr(x1)} ${u}. Combien vaut ${t.c2}² ?`,
      `Dans le triangle ${t.nom} rectangle en ${t.droit}, l’hypoténuse mesure ${fr(h)} ${u} et ${t.c1} = ${fr(x1)} ${u}. Calcule ${t.c2}².`,
      `On cherche ${t.c2} dans le triangle ${t.nom} rectangle en ${t.droit}, sachant que ${t.c1} = ${fr(x1)} ${u} et ${t.hyp} = ${fr(h)} ${u}. Première étape : que vaut ${t.c2}² ?`,
    ]),
    format: "short",
    expected: attenduNombre(D),
    comparator: "number_equal",
    explanation:
      `Définition : le triangle ${t.nom} est rectangle en ${t.droit} ; [${t.hyp}] est l’hypoténuse.\n\n` +
      `Méthode : ${t.c2}² = ${t.hyp}² − ${t.c1}² (on cherche un côté de l’angle droit : on soustrait).\n\n` +
      `Calcul : ${t.c2}² = ${fr(h)}² − ${fr(x1)}² = ${fr(sq(h))} − ${fr(sq(x1))} = ${fr(D)}.\n\n` +
      `Conclusion : ${t.c2}² = ${fr(D)} (et donc ${t.c2} = √${fr(D)} = ${fr(x2)} ${u}).`,
  };
}

/* =========================================================================
   CALCULER — situations réelles
========================================================================= */

/** ★3 — QCM : l'hypoténuse dans une situation, leurres = erreurs réelles. */
function genHypQcmSituation(): Q {
  const r = situationHypotenuse(false);
  const { a, b, c, pas, L } = r;
  const leurres = [a + b, sq(a) + sq(b), c + pas, c - pas, c + 2 * pas].map((x) => L(Math.round(x * 100) / 100));
  return { text: r.text, format: "qcm", choices: qcm(L(c), leurres), expected: [L(c)], comparator: "mcq_exact", explanation: r.explanation };
}

/** Réponse tapée ; `arrondir` : une longueur qui ne tombe pas juste. */
function genHypSituation(arrondir: boolean): Q {
  const r = situationHypotenuse(arrondir);
  return { text: r.text, format: "short", expected: attendu(r.c, r.s.unite, r.exact), comparator: "number_equal", explanation: r.explanation };
}

/** ★3 — QCM : un côté de l'angle droit dans une situation. */
function genCoteQcmSituation(): Q {
  const r = situationCote(false);
  const { a, b, c, pas, L } = r;
  const leurres = [c - a, sq(c) - sq(a), arrondi1(Math.sqrt(sq(c) + sq(a))), b + pas, b - pas, b + 2 * pas]
    .filter((x) => x > 0)
    .map((x) => L(Math.round(x * 100) / 100));
  return { text: r.text, format: "qcm", choices: qcm(L(b), leurres), expected: [L(b)], comparator: "mcq_exact", explanation: r.explanation };
}

/** Réponse tapée ; `arrondir` : une longueur qui ne tombe pas juste. */
function genCoteSituation(arrondir: boolean): Q {
  const r = situationCote(arrondir);
  return { text: r.text, format: "short", expected: attendu(r.b, r.s.unite, r.exact), comparator: "number_equal", explanation: r.explanation };
}

/** Le calcul complet « a² + b² = S, donc c = √S = r » (ou « ≈ r »). */
function chaineCalcul(x: number, op: "+" | "−", y: number, u: string): string {
  const S = op === "+" ? sq(x) + sq(y) : Math.round((sq(x) - sq(y)) * 10000) / 10000;
  const r = arrondi1(Math.sqrt(Math.abs(S)));
  return `${fr(x)}² ${op} ${fr(y)}² = ${fr(S)}, donc la longueur vaut √${fr(S)} ${racineExacte(S) ? "=" : "≈"} ${fr(r)} ${u}`;
}

/** Les leurres d'un calcul de Pythagore : mauvaise opération, longueurs additionnées, racine oubliée. */
function leurresCalcul(x: number, op: "+" | "−", y: number, u: string): string[] {
  const S = op === "+" ? sq(x) + sq(y) : Math.round((sq(x) - sq(y)) * 10000) / 10000;
  const [g, p] = x >= y ? [x, y] : [y, x];
  const brut = Math.round((op === "+" ? x + y : x - y) * 100) / 100;
  return [
    op === "+" ? chaineCalcul(g, "−", p, u) : chaineCalcul(x, "+", y, u),
    `${fr(x)} ${op} ${fr(y)} = ${fr(brut)}, donc la longueur vaut ${fr(brut)} ${u}`,
    `${fr(x)}² ${op} ${fr(y)}² = ${fr(S)}, donc la longueur vaut ${fr(S)} ${u}`,
  ];
}

/** ★3 (hypoténuse) — quel calcul justifie le résultat ? */
function genHypExplique(): Q {
  if (randomChoice([true, false])) {
    const t = tirerTriangle();
    const [x1, x2, h] = tirerTriplet("varie");
    const u = randomChoice(UNITES);
    const bon = chaineCalcul(x1, "+", x2, u);
    return {
      text: randomChoice([
        `Le triangle ${t.nom} est rectangle en ${t.droit}, avec ${t.c1} = ${fr(x1)} ${u} et ${t.c2} = ${fr(x2)} ${u}. Quel calcul prouve que ${t.hyp} = ${fr(h)} ${u} ?`,
        `Dans le triangle ${t.nom} rectangle en ${t.droit}, ${t.c1} = ${fr(x1)} ${u} et ${t.c2} = ${fr(x2)} ${u}. Quel calcul justifie que l’hypoténuse mesure ${fr(h)} ${u} ?`,
        `Un camarade affirme : « Dans le triangle ${t.nom} rectangle en ${t.droit}, avec ${t.c1} = ${fr(x1)} ${u} et ${t.c2} = ${fr(x2)} ${u}, on a ${t.hyp} = ${fr(h)} ${u}. » Quel calcul a-t-il fait ?`,
      ]),
      format: "qcm",
      choices: qcm(bon, leurresCalcul(x1, "+", x2, u)),
      expected: [bon],
      comparator: "mcq_exact",
      explanation: explHypNomme(t, x1, x2, u),
    };
  }
  const r = situationHypotenuse(false);
  const bon = chaineCalcul(r.a, "+", r.b, r.s.unite);
  return {
    text: `${r.text} Quel calcul donne la réponse ?`,
    format: "qcm",
    choices: qcm(bon, leurresCalcul(r.a, "+", r.b, r.s.unite)),
    expected: [bon],
    comparator: "mcq_exact",
    explanation: r.explanation,
  };
}

/** ★3 (côté) — quel calcul, ou quelle longueur après une erreur ? */
function genCoteExplique(): Q {
  if (randomChoice([true, false])) {
    const t = tirerTriangle();
    const [x1, x2, h] = tirerTriplet("varie");
    const u = randomChoice(UNITES);
    const L = (x: number) => `${fr(x)} ${u}`;
    if (Math.random() < 0.4) {
      const faux = arrondi1(Math.sqrt(sq(h) + sq(x1)));
      return {
        text: `Une élève trouve ${t.c2} ≈ ${L(faux)} dans le triangle ${t.nom} rectangle en ${t.droit}, avec ${t.hyp} = ${L(h)} et ${t.c1} = ${L(x1)}. Elle s’est trompée. Quelle est la bonne longueur ${t.c2} ?`,
        format: "qcm",
        choices: qcm(L(x2), [L(faux), L(h - x1), L(h + x1), L(sq(h) - sq(x1))]),
        expected: [L(x2)],
        comparator: "mcq_exact",
        explanation: explCoteNomme(t, h, x1, u),
      };
    }
    const bon = chaineCalcul(h, "−", x1, u);
    return {
      text: randomChoice([
        `Le triangle ${t.nom} est rectangle en ${t.droit}, avec ${t.hyp} = ${fr(h)} ${u} et ${t.c1} = ${fr(x1)} ${u}. Quel calcul prouve que ${t.c2} = ${fr(x2)} ${u} ?`,
        `Dans le triangle ${t.nom} rectangle en ${t.droit}, ${t.hyp} = ${fr(h)} ${u} et ${t.c1} = ${fr(x1)} ${u}. Quel calcul justifie que ${t.c2} = ${fr(x2)} ${u} ?`,
      ]),
      format: "qcm",
      choices: qcm(bon, leurresCalcul(h, "−", x1, u)),
      expected: [bon],
      comparator: "mcq_exact",
      explanation: explCoteNomme(t, h, x1, u),
    };
  }
  const r = situationCote(false);
  const bon = chaineCalcul(r.c, "−", r.a, r.s.unite);
  return {
    text: `${r.text} Quel calcul donne la réponse ?`,
    format: "qcm",
    choices: qcm(bon, leurresCalcul(r.c, "−", r.a, r.s.unite)),
    expected: [bon],
    comparator: "mcq_exact",
    explanation: r.explanation,
  };
}

/** ★4 (3e) — valeur EXACTE (√41 cm) ou valeur ARRONDIE au dixième. */
function genHypValeurExacte(): Q {
  const t = tirerTriangle();
  let a = 0;
  let b = 0;
  let S = 0;
  do {
    a = randomInt(2, 9);
    b = randomInt(2, 12);
    S = a * a + b * b;
  } while (a === b || Number.isInteger(Math.sqrt(S)));
  const u = randomChoice(["cm", "cm", "dm", "m"]);
  const racine = Math.sqrt(S);
  const r1 = arrondi1(racine);
  const debut = randomChoice([
    `Le triangle ${t.nom} est rectangle en ${t.droit}, avec ${t.c1} = ${a} ${u} et ${t.c2} = ${b} ${u}.`,
    `Dans le triangle ${t.nom} rectangle en ${t.droit}, ${t.c2} = ${b} ${u} et ${t.c1} = ${a} ${u}.`,
    `On sait que ${t.nom} est rectangle en ${t.droit}, que ${t.c1} = ${a} ${u} et que ${t.c2} = ${b} ${u}.`,
  ]);
  const calcul = `Calcul : ${t.hyp}² = ${a}² + ${b}² = ${a * a} + ${b * b} = ${S}, donc ${t.hyp} = √${S} (valeur exacte) ≈ ${frA(r1, false)} (arrondi au dixième, à la calculatrice).\n\n`;
  const def =
    `Définition : ${t.nom} est rectangle en ${t.droit}, son hypoténuse est [${t.hyp}] et ${t.hyp}² = ${t.c1}² + ${t.c2}².\n\n` +
    `Méthode : ${S} n’est pas un carré parfait : la valeur exacte s’écrit avec le symbole √ ; la calculatrice donne ensuite une valeur approchée, qu’on arrondit.\n\n`;
  if (randomChoice([true, false])) {
    const bon = `${t.hyp} = √${S} ${u}`;
    return {
      text: `${debut} Quelle est la valeur exacte de ${t.hyp} ?`,
      format: "qcm",
      choices: qcm(bon, [`${t.hyp} = ${S} ${u}`, `${t.hyp} = √${a + b} ${u}`, `${t.hyp} = ${a + b} ${u}`, `${t.hyp} = √${Math.abs(b * b - a * a)} ${u}`]),
      expected: [bon],
      comparator: "mcq_exact",
      explanation: def + calcul + `Conclusion : la valeur exacte est ${t.hyp} = √${S} ${u} ; ${frA(r1, false)} ${u} n’en est qu’un arrondi.`,
    };
  }
  const bon = `${t.hyp} ≈ ${frA(r1, false)} ${u}`;
  return {
    text: `${debut} Donne ${t.hyp} arrondie au dixième.`,
    format: "qcm",
    choices: qcm(bon, [
      `${t.hyp} ≈ ${frA(Math.floor(racine * 10) / 10, false)} ${u}`,
      `${t.hyp} ≈ ${frA(arrondi1(Math.sqrt(Math.abs(b * b - a * a))), false)} ${u}`,
      `${t.hyp} = ${S} ${u}`,
      `${t.hyp} = ${a + b} ${u}`,
    ]),
    expected: [bon],
    comparator: "mcq_exact",
    explanation: def + calcul + `Conclusion : ${t.hyp} ≈ ${frA(r1, false)} ${u} (au dixième près).`,
  };
}

/** ★4 — la diagonale d'un rectangle (ou d'un carré) nommé, dans un objet. */
const NOMS_RECTANGLES = ["ABCD", "EFGH", "MNPQ", "RSTU", "JKLM", "WXYZ", "KLMN", "PQRS"];
const OBJETS_RECTANGLES: { gn: string; unite: string; triplets: [number, number, number][] }[] = [
  { gn: "Un écran", unite: "cm", triplets: [[48, 36, 60], [32, 24, 40], [80, 60, 100]] },
  { gn: "Une table", unite: "cm", triplets: [[160, 120, 200], [120, 50, 130], [150, 80, 170]] },
  { gn: "Un tapis", unite: "m", triplets: [[2.4, 1.8, 3], [2, 1.5, 2.5], [2.4, 1, 2.6]] },
  { gn: "Une fenêtre", unite: "cm", triplets: [[120, 90, 150], [80, 60, 100], [105, 100, 145]] },
  { gn: "Un panneau solaire", unite: "cm", triplets: [[160, 120, 200], [168, 70, 182]] },
  { gn: "Une feuille de dessin", unite: "cm", triplets: [[40, 30, 50], [24, 18, 30], [32, 24, 40]] },
  { gn: "Un champ de canne", unite: "m", triplets: [[120, 50, 130], [150, 80, 170], [240, 70, 250]] },
  { gn: "Une plaque de chocolat", unite: "cm", triplets: [[16, 12, 20], [24, 7, 25], [15, 8, 17]] },
  { gn: "Un tableau de classe", unite: "cm", triplets: [[240, 100, 260], [300, 160, 340], [200, 150, 250]] },
];
function genDiagonaleRectangle(): Q {
  const R = randomChoice(NOMS_RECTANGLES);
  const [P1, P2, P3] = R.split("");
  const o = randomChoice(OBJETS_RECTANGLES);
  const L = (x: number) => `${fr(x)} ${o.unite}`;
  if (Math.random() < 0.25) {
    // Le carré : la diagonale ne tombe jamais juste.
    const cote = randomChoice(o.triplets)[1];
    const S = 2 * sq(cote);
    const d = arrondi1(Math.sqrt(S));
    return {
      text: randomChoice([
        `${o.gn} a la forme d’un carré ${R} de ${L(cote)} de côté. Quelle est la longueur de sa diagonale [${P1}${P3}] ?` + randomChoice(SUFFIXES_ARRONDI),
        `Le carré ${R} mesure ${L(cote)} de côté. Calcule la longueur de la diagonale [${P1}${P3}], arrondie au dixième.`,
      ]),
      format: "short",
      expected: attendu(d, o.unite, false),
      comparator: "number_equal",
      explanation:
        `Définition : un carré a quatre angles droits ; le triangle ${P1}${P2}${P3} est rectangle en ${P2}, d’hypoténuse [${P1}${P3}].\n\n` +
        `Méthode : d’après le théorème de Pythagore, ${P1}${P3}² = ${P1}${P2}² + ${P2}${P3}².\n\n` +
        `Calcul : ${P1}${P3}² = ${fr(cote)}² + ${fr(cote)}² = ${fr(sq(cote))} + ${fr(sq(cote))} = ${fr(S)}, donc ${P1}${P3} = √${fr(S)} ≈ ${frA(d, false)}.\n\n` +
        `Conclusion : la diagonale mesure environ ${frA(d, false)} ${o.unite}.`,
    };
  }
  let [a, b] = randomChoice(o.triplets);
  if (Math.random() < 0.4) a = a + (o.unite === "m" ? 0.1 : 1);
  a = Math.round(a * 10) / 10;
  const S = sq(a) + sq(b);
  const exact = racineExacte(S);
  const d = arrondi1(Math.sqrt(S));
  return {
    text:
      randomChoice([
        `${o.gn} a la forme d’un rectangle ${R} avec ${P1}${P2} = ${L(a)} et ${P2}${P3} = ${L(b)}. Combien mesure la diagonale [${P1}${P3}] ?`,
        `Le rectangle ${R} représente ${o.gn.toLowerCase()} de ${L(a)} sur ${L(b)}. Calcule la longueur ${P1}${P3}.`,
        `${o.gn} rectangulaire mesure ${L(a)} de long et ${L(b)} de large. Quelle est la longueur de sa diagonale ?`,
      ]) + (exact ? "" : randomChoice(SUFFIXES_ARRONDI)),
    format: "short",
    expected: attendu(d, o.unite, exact),
    comparator: "number_equal",
    explanation:
      "Définition : un rectangle a quatre angles droits ; la diagonale est l’hypoténuse d’un triangle rectangle dont les côtés de l’angle droit sont la longueur et la largeur.\n\n" +
      "Méthode : diagonale² = longueur² + largeur².\n\n" +
      `Calcul : d² = ${fr(a)}² + ${fr(b)}² = ${fr(sq(a))} + ${fr(sq(b))} = ${fr(S)}, donc d = √${fr(S)} ${exact ? "=" : "≈"} ${frA(d, exact)}.\n\n` +
      `Conclusion : la diagonale mesure ${exact ? "" : "environ "}${frA(d, exact)} ${o.unite}.`,
  };
}

/* =========================================================================
   RÉCIPROQUE
========================================================================= */

function explEgalite(a: string, b: string, c: string, A: number, B: number, C: number): string {
  const S = A + B;
  return (
    "Définition : une égalité est vraie quand ses deux membres donnent le même nombre.\n\n" +
    "Méthode : on ne l’écrit pas d’avance : on calcule SÉPARÉMENT le carré du plus grand côté, puis la somme des carrés des deux autres.\n\n" +
    `Calcul : d’une part, ${c}² = ${fr(C)}. D’autre part, ${a}² + ${b}² = ${fr(A)} + ${fr(B)} = ${fr(S)}.\n\n` +
    (egal(C, S)
      ? `Conclusion : ${fr(C)} = ${fr(S)}, l’égalité est vraie.`
      : `Conclusion : ${fr(C)} ≠ ${fr(S)}, l’égalité est fausse — même si les nombres sont proches.`)
  );
}

/** ★2 — l'égalité de Pythagore est-elle vraie ? Vrais triplets et « presque ». */
function genEgaliteVraie(): Q {
  const vrai = randomChoice([true, false]);
  const [a, b, c] = longueursReciproque(vrai, "simple");
  const t = tirerTriangle();
  const u = randomChoice(UNITES);
  const liste = listeCotes(t, a, b, c, u);
  const mode = Math.random() < 0.75 ? randomInt(0, 3) : randomInt(4, 6);
  const ouiNon = mode === 2 || mode === 6 ? ["vrai", "faux"] : ["oui", "non"];
  const text = [
    `Dans le triangle ${t.nom}, ${t.c1} = ${fr(a)} ${u}, ${t.c2} = ${fr(b)} ${u} et ${t.hyp} = ${fr(c)} ${u}. A-t-on ${t.hyp}² = ${t.c1}² + ${t.c2}² ?`,
    `Le triangle ${t.nom} a pour côtés ${liste}. L’égalité ${t.hyp}² = ${t.c1}² + ${t.c2}² est-elle vraie ?`,
    `Vrai ou faux : dans le triangle ${t.nom} où ${liste}, on a ${t.hyp}² = ${t.c1}² + ${t.c2}².`,
    `On mesure le triangle ${t.nom} : ${liste}. ${t.hyp}² est-il égal à ${t.c1}² + ${t.c2}² ?`,
    `Calcule ${fr(a)}² + ${fr(b)}², puis ${fr(c)}². Les deux résultats sont-ils égaux ?`,
    `Si l’on compare ${fr(c)}² et ${fr(a)}² + ${fr(b)}², trouve-t-on deux nombres égaux ?`,
    `Vrai ou faux : ${fr(a)}² + ${fr(b)}² = ${fr(c)}².`,
  ][mode];
  const [na, nb, nc] = mode <= 3 ? [t.c1, t.c2, t.hyp] : [fr(a), fr(b), fr(c)];
  return {
    text,
    format: "qcm",
    choices: ouiNon,
    expected: [vrai ? ouiNon[0] : ouiNon[1]],
    comparator: "mcq_exact",
    explanation: explEgalite(na, nb, nc, sq(a), sq(b), sq(c)),
  };
}

/** ★3 — repérer le plus grand côté, celui qu'on met seul au carré. */
function genPlusGrandCote(): Q {
  const [a, b, c] = longueursReciproque(randomChoice([true, false]), randomChoice(["simple", "varie", "decimal"] as SorteTriplet[]));
  const t = tirerTriangle();
  const u = uniteDe(a, b, c);
  const liste = listeCotes(t, a, b, c, u);
  return {
    text: randomChoice([
      `Dans le triangle ${t.nom}, ${liste}. Pour appliquer la réciproque du théorème de Pythagore, quelle longueur met-on seule au carré ?`,
      `Le triangle ${t.nom} a pour côtés ${liste}. Quelle est la longueur du seul côté qui pourrait être l’hypoténuse ?`,
      `On veut savoir si ${t.nom} est rectangle ; ${liste}. Quelle est la longueur du plus grand côté, celui qu’on compare aux deux autres ?`,
    ]),
    format: "short",
    expected: attendu(c, u),
    comparator: "number_equal",
    explanation:
      "Définition : si le triangle est rectangle, son hypoténuse est forcément son plus grand côté.\n\n" +
      "Méthode : on repère la plus grande des trois longueurs, quel que soit l’ordre de l’énoncé.\n\n" +
      `Calcul : la plus grande longueur est ${t.hyp} = ${fr(c)} ${u}.\n\n` +
      `Conclusion : le plus grand côté mesure ${fr(c)} ${u} ; c’est ${t.hyp}² qu’on compare à ${t.c1}² + ${t.c2}².`,
  };
}

/** ★3 — le triangle nommé est-il rectangle ? Avec sa figure à l'échelle. */
function genEstRectangleFigure(): Q {
  const vrai = randomChoice([true, false]);
  const [a, b, c] = longueursReciproque(vrai, randomChoice(["simple", "varie", "decimal"] as SorteTriplet[]));
  const t = tirerTriangle();
  const u = uniteDe(a, b, c);
  const liste = listeCotes(t, a, b, c, u);
  return {
    text: randomChoice([
      `Le triangle ${t.nom} a pour côtés ${liste}. Est-il rectangle ?`,
      `On donne ${liste}. Le triangle ${t.nom} est-il rectangle ?`,
      `Le triangle ${t.nom} ci-contre est-il rectangle ? On a mesuré ${liste}.`,
      `${t.nom} est un triangle tel que ${liste}. Peut-on affirmer qu’il est rectangle ?`,
    ]),
    format: "qcm",
    choices: ["oui", "non"],
    expected: [vrai ? "oui" : "non"],
    comparator: "mcq_exact",
    explanation:
      "Définition : réciproque du théorème de Pythagore : si le carré du plus grand côté est égal à la somme des carrés des deux autres, le triangle est rectangle.\n\n" +
      "Méthode : on ne sait pas encore s’il est rectangle : on calcule séparément, « d’une part », « d’autre part ».\n\n" +
      `Calcul : ${redactionReciproque(t, a, b, c)}\n\n` +
      `Conclusion : ${vrai ? `oui, ${t.nom} est rectangle en ${t.droit}` : `non, ${t.nom} n’est pas rectangle`}.`,
    canvas: figureALEchelle({ labels: t.labels, AB: a, CA: b, BC: c, sideLabels: { AB: fr(a), CA: fr(b), BC: fr(c) } }),
  };
}

// Situations où la réciproque CONTRÔLE un angle droit. a, b : les deux côtés
// qui partent du coin à contrôler ; c : la longueur en face.
const SITUATIONS_RECIPROQUE: { unite: string; objet: string; triplets: [number, number, number][]; t: (a: string, b: string, c: string) => string }[] = [
  { unite: "cm", objet: "le coin du cadre", triplets: [[60, 80, 100], [45, 60, 75], [72, 96, 120], [40, 42, 58]],
    t: (a, b, c) => `Un menuisier assemble un cadre : deux montants de ${a} et ${b} partent d’un même coin, et la diagonale qui relie leurs extrémités mesure ${c}. Le coin forme-t-il un angle droit ?` },
  { unite: "m", objet: "le coin de la terrasse", triplets: [[3, 4, 5], [6, 8, 10], [2.4, 3.2, 4], [4.5, 6, 7.5]],
    t: (a, b, c) => `Pour vérifier le coffrage d’une terrasse, Sami mesure deux bords de ${a} et ${b} qui partent d’un même coin, puis la diagonale : ${c}. L’angle de ce coin est-il droit ?` },
  { unite: "m", objet: "le coin de la dalle", triplets: [[3, 4, 5], [4.5, 6, 7.5], [2.4, 3.2, 4], [3.6, 4.8, 6]],
    t: (a, b, c) => `À Saint-Paul, avant de couler la dalle d’une case, Teddy mesure deux bords de ${a} et ${b} partant d’un même coin, puis la diagonale : ${c}. Le coin est-il un angle droit ?` },
  { unite: "m", objet: "le triangle de corde", triplets: [[3, 4, 5], [5, 12, 13], [6, 8, 10]],
    t: (a, b, c) => `Un jardinier tend une corde autour de trois piquets : les côtés du triangle obtenu mesurent ${a}, ${b} et ${c}. Ce triangle a-t-il un angle droit ?` },
  { unite: "m", objet: "l’angle entre le mât et la bôme", triplets: [[2.4, 3.2, 4], [3, 7.2, 7.8], [1.6, 6.3, 6.5]],
    t: (a, b, c) => `Sur la voile d’un dériveur, le bord le long de la bôme mesure ${a}, le bord le long du mât ${b} et le bord libre ${c}. Le mât et la bôme sont-ils perpendiculaires ?` },
  { unite: "m", objet: "l’angle au premier piquet", triplets: [[1.2, 1.6, 2], [2.1, 2, 2.9], [1.5, 3.6, 3.9]],
    t: (a, b, c) => `Pour un potager, Nora plante trois piquets : deux côtés de ${a} et ${b} partent du premier piquet, et le troisième côté mesure ${c}. L’angle au premier piquet est-il droit ?` },
  { unite: "cm", objet: "l’angle de l’équerre", triplets: [[15, 20, 25], [18, 24, 30], [21, 20, 29]],
    t: (a, b, c) => `Une équerre d’étagère a deux branches de ${a} et ${b} ; la barre qui relie leurs extrémités mesure ${c}. Les deux branches sont-elles perpendiculaires ?` },
  { unite: "m", objet: "le coin du terrain", triplets: [[80, 60, 100], [36, 48, 60], [90, 48, 102]],
    t: (a, b, c) => `Un terrain de sport est tracé avec une longueur de ${a} et une largeur de ${b} ; d’un coin au coin opposé, on mesure ${c}. Le coin du terrain est-il un angle droit ?` },
  { unite: "m", objet: "l’angle entre le poteau et le sol", triplets: [[1.5, 2, 2.5], [0.9, 1.2, 1.5], [1, 2.4, 2.6]],
    t: (a, b, c) => `Pour vérifier qu’un poteau est vertical, on marque au sol un point à ${a} de son pied. Le poteau mesure ${b} et la distance de son sommet au point marqué est de ${c}. Le poteau est-il perpendiculaire au sol ?` },
  { unite: "cm", objet: "le morceau de carreau", triplets: [[12, 16, 20], [9, 12, 15], [15, 20, 25], [10, 24, 26]],
    t: (a, b, c) => `Un carreleur découpe un morceau de carreau en forme de triangle ; ses côtés mesurent ${a}, ${b} et ${c}. Ce morceau a-t-il un angle droit ?` },
  { unite: "m", objet: "l’angle entre le mur et le sol", triplets: [[0.6, 0.8, 1], [1.2, 1.6, 2], [0.9, 1.2, 1.5]],
    t: (a, b, c) => `Un maçon vérifie un mur : il marque un point au sol à ${a} du pied du mur et un point sur le mur à ${b} du sol. Entre ces deux points, il mesure ${c}. Le mur est-il perpendiculaire au sol ?` },
  { unite: "cm", objet: "le triangle de papier", triplets: [[6, 8, 10], [5, 12, 13], [8, 15, 17], [7, 24, 25]],
    t: (a, b, c) => `Lina découpe un triangle de papier dont les côtés mesurent ${a}, ${b} et ${c}. Est-ce un triangle rectangle ?` },
];

/** ★3 — la réciproque contrôle un angle droit dans la vie réelle. */
function genEstRectangleSituation(): Q {
  const s = randomChoice(SITUATIONS_RECIPROQUE);
  const vrai = randomChoice([true, false]);
  const [a, b, c0] = randomChoice(s.triplets);
  const pas = s.triplets.some((x) => x.some((y) => !Number.isInteger(y))) ? 0.1 : 1;
  // « Presque » : la longueur en face décalée d'un cran, en restant la plus grande.
  const c = vrai ? c0 : Math.round((c0 + (Math.random() < 0.5 && c0 - pas > Math.max(a, b) ? -pas : pas)) * 10) / 10;
  const L = (x: number) => `${fr(x)} ${s.unite}`;
  const C = sq(c);
  const S = sq(a) + sq(b);
  return {
    text: s.t(L(a), L(b), L(c)),
    format: "qcm",
    choices: ["oui", "non"],
    expected: [vrai ? "oui" : "non"],
    comparator: "mcq_exact",
    explanation:
      `Définition : on modélise ${s.objet} par un triangle de côtés ${L(a)}, ${L(b)} et ${L(c)} ; l’angle à contrôler est en face du plus grand côté.\n\n` +
      "Méthode : réciproque du théorème de Pythagore : on compare le carré du plus grand côté à la somme des carrés des deux autres, par deux calculs séparés.\n\n" +
      `Calcul : d’une part, ${fr(c)}² = ${fr(C)}. D’autre part, ${fr(a)}² + ${fr(b)}² = ${fr(sq(a))} + ${fr(sq(b))} = ${fr(S)}.\n\n` +
      (egal(C, S)
        ? "Conclusion : les deux résultats sont égaux : d’après la réciproque du théorème de Pythagore, le triangle est rectangle. Oui, l’angle est droit."
        : `Conclusion : ${fr(C)} ≠ ${fr(S)} : si le triangle était rectangle, ces deux nombres seraient égaux. Non, l’angle n’est pas droit${Math.abs(C - S) / S < 0.05 ? " — même si l’écart est petit" : ""}.`),
  };
}

/** ★4 — le triangle est rectangle : en quel sommet ? (figure à l'échelle) */
function genSommetFigure(): Q {
  const [a, b, c] = tirerTriplet(randomChoice(["varie", "decimal"] as SorteTriplet[]));
  const t = tirerTriangle();
  const u = uniteDe(a, b, c);
  const liste = listeCotes(t, a, b, c, u);
  return {
    text: randomChoice([
      `Le triangle ${t.nom} ci-contre a pour côtés ${liste}. Il est rectangle : en quel sommet ?`,
      `On a vérifié que le triangle ${t.nom}, où ${liste}, est rectangle. Quel est le sommet de l’angle droit ?`,
      `Montre que le triangle ${t.nom} est rectangle, sachant que ${liste}, puis indique en quel sommet.`,
    ]),
    format: "qcm",
    choices: shuffle([`en ${t.droit}`, `en ${t.p}`, `en ${t.q}`]),
    expected: [`en ${t.droit}`],
    comparator: "mcq_exact",
    explanation:
      "Définition : dans un triangle rectangle, l’angle droit est en face de l’hypoténuse, le plus grand côté.\n\n" +
      `Méthode : on vérifie l’égalité avec le plus grand côté [${t.hyp}], puis on prend le sommet qu’il ne touche pas.\n\n` +
      `Calcul : ${redactionReciproque(t, a, b, c)}\n\n` +
      `Conclusion : le triangle ${t.nom} est rectangle en ${t.droit}.`,
    canvas: figureALEchelle({ labels: t.labels, AB: a, CA: b, BC: c, sideLabels: { AB: fr(a), CA: fr(b), BC: fr(c) } }),
  };
}

/** ★4 — rectangle, et en quel sommet ? Ou pas rectangle du tout. */
function genSommetOuNon(): Q {
  const vrai = Math.random() < 0.6;
  const [a, b, c] = longueursReciproque(vrai, randomChoice(["simple", "varie", "decimal"] as SorteTriplet[]));
  const t = tirerTriangle();
  const u = uniteDe(a, b, c);
  const liste = listeCotes(t, a, b, c, u);
  const non = "il n’est pas rectangle";
  return {
    text: randomChoice([
      `Le triangle ${t.nom} a pour côtés ${liste}. Est-il rectangle, et si oui en quel sommet ?`,
      `Dans le triangle ${t.nom}, ${liste}. Que peut-on conclure ?`,
      `On mesure les côtés du triangle ${t.nom} : ${liste}. Quelle conclusion est juste ?`,
    ]),
    format: "qcm",
    choices: shuffle([`rectangle en ${t.droit}`, `rectangle en ${t.p}`, `rectangle en ${t.q}`, non]),
    expected: [vrai ? `rectangle en ${t.droit}` : non],
    comparator: "mcq_exact",
    explanation:
      "Définition : réciproque du théorème de Pythagore ; l’angle droit, s’il existe, est en face du plus grand côté.\n\n" +
      "Méthode : on calcule séparément le carré du plus grand côté et la somme des carrés des deux autres.\n\n" +
      `Calcul : ${redactionReciproque(t, a, b, c)}\n\n` +
      `Conclusion : ${vrai ? `${t.nom} est rectangle en ${t.droit}` : `${t.nom} n’est pas rectangle`}.`,
  };
}

/** ★4 (3e) — des longueurs dans des unités différentes : convertir AVANT de comparer. */
function genReciproqueUnites(): Q {
  const vrai = Math.random() < 0.6;
  const [a, b, c] = longueursReciproque(vrai, randomChoice(["simple", "varie", "decimal"] as SorteTriplet[]));
  const t = tirerTriangle();
  // Toutes les longueurs sont en cm ; une ou deux sont réécrites en mm ou en dm.
  const conv = [
    { u: "mm", k: 10 },
    { u: "dm", k: 0.1 },
  ];
  const cotes = [
    { nom: t.c1, v: a },
    { nom: t.c2, v: b },
    { nom: t.hyp, v: c },
  ];
  const nbConvertis = randomChoice([1, 1, 2]);
  const aConvertir = shuffle([0, 1, 2]).slice(0, nbConvertis);
  const ecrits = cotes.map((x, i) => {
    if (!aConvertir.includes(i)) return { ...x, texte: `${x.nom} = ${fr(x.v)} cm`, u: "cm" };
    const k = randomChoice(conv);
    return { ...x, texte: `${x.nom} = ${fr(Math.round(x.v * k.k * 10000) / 10000)} ${k.u}`, u: k.u };
  });
  const l = shuffle(ecrits.map((x) => x.texte));
  const liste = `${l[0]}, ${l[1]} et ${l[2]}`;
  const non = "il n’est pas rectangle";
  const conversions = ecrits
    .filter((x) => x.u !== "cm")
    .map((x) => `${x.texte.split(" = ")[1]} = ${fr(x.v)} cm`)
    .join(" ; ");
  return {
    text: randomChoice([
      `Le triangle ${t.nom} a pour côtés ${liste}. Est-il rectangle ? Si oui, en quel sommet ?`,
      `Attention aux unités : dans le triangle ${t.nom}, ${liste}. Quelle conclusion est juste ?`,
      `On a mesuré le triangle ${t.nom} : ${liste}. Est-il rectangle, et si oui en quel sommet ?`,
    ]),
    format: "qcm",
    choices: shuffle([`rectangle en ${t.droit}`, `rectangle en ${t.p}`, `rectangle en ${t.q}`, non]),
    expected: [vrai ? `rectangle en ${t.droit}` : non],
    comparator: "mcq_exact",
    explanation:
      "Définition : on ne compare que des longueurs exprimées dans la MÊME unité ; ensuite, réciproque du théorème de Pythagore.\n\n" +
      `Méthode : on convertit tout en cm (${conversions}), puis on repère le plus grand côté.\n\n` +
      `Calcul : ${redactionReciproque(t, a, b, c)}\n\n` +
      `Conclusion : ${vrai ? `${t.nom} est rectangle en ${t.droit}` : `${t.nom} n’est pas rectangle`}.`,
  };
}

/* =========================================================================
   RÉDIGER
========================================================================= */

/** ★3 — choisir la bonne phrase : début du théorème, conclusion de la réciproque, égalité d'un côté. */
function genPhraseRedaction(): Q {
  const t = tirerTriangle();
  const mode = randomInt(0, 3);
  const [x1, x2, h] = tirerTriplet("varie");
  const question = randomChoice(["Quelle phrase convient ?", "Quelle rédaction est correcte ?", "Laquelle de ces phrases écrire ?"]);
  if (mode === 0) {
    const bon = `Dans le triangle ${t.nom} rectangle en ${t.droit}, d’après le théorème de Pythagore : ${t.hyp}² = ${t.c1}² + ${t.c2}².`;
    return {
      text: randomChoice([
        `Le triangle ${t.nom} est rectangle en ${t.droit}. On veut calculer ${t.hyp}. ${question}`,
        `On connaît ${t.c1} et ${t.c2} dans le triangle ${t.nom} rectangle en ${t.droit}, et on cherche ${t.hyp}. Comment commencer la rédaction ?`,
      ]),
      format: "qcm",
      choices: qcm(bon, [
        `Dans le triangle ${t.nom} rectangle en ${t.droit}, d’après la réciproque du théorème de Pythagore : ${t.hyp}² = ${t.c1}² + ${t.c2}².`,
        `Dans le triangle ${t.nom} rectangle en ${t.droit}, d’après le théorème de Pythagore : ${t.c1}² = ${t.hyp}² + ${t.c2}².`,
        `Dans le triangle ${t.nom}, d’après le théorème de Pythagore : ${t.hyp} = ${t.c1} + ${t.c2}.`,
        `Dans le triangle ${t.nom} isocèle en ${t.droit}, d’après le théorème de Pythagore : ${t.hyp}² = ${t.c1}² + ${t.c2}².`,
      ]),
      expected: [bon],
      comparator: "mcq_exact",
      explanation:
        "Définition : le théorème de Pythagore s’applique dans un triangle qu’on SAIT rectangle.\n\n" +
        "Méthode : on annonce le triangle et son angle droit, on cite le théorème, puis on écrit l’égalité avec l’hypoténuse seule dans un membre.\n\n" +
        `Calcul : l’angle droit est en ${t.droit}, donc l’hypoténuse est [${t.hyp}] : ${t.hyp}² = ${t.c1}² + ${t.c2}².\n\n` +
        `Conclusion : ${bon}`,
    };
  }
  if (mode === 1) {
    const bon = `D’après la réciproque du théorème de Pythagore, le triangle ${t.nom} est rectangle en ${t.droit}.`;
    return {
      text: `Dans le triangle ${t.nom}, le plus grand côté est [${t.hyp}]. D’une part ${t.hyp}² = ${fr(sq(h))}, d’autre part ${t.c1}² + ${t.c2}² = ${fr(sq(x1) + sq(x2))}. ${question}`,
      format: "qcm",
      choices: qcm(bon, [
        `D’après le théorème de Pythagore, le triangle ${t.nom} est rectangle en ${t.droit}.`,
        `D’après la réciproque du théorème de Pythagore, le triangle ${t.nom} est rectangle en ${t.p}.`,
        `D’après la réciproque du théorème de Thalès, le triangle ${t.nom} est rectangle en ${t.droit}.`,
        `Le triangle ${t.nom} n’est pas rectangle.`,
      ]),
      expected: [bon],
      comparator: "mcq_exact",
      explanation:
        "Définition : quand l’égalité est vraie, c’est la RÉCIPROQUE qui permet de conclure que le triangle est rectangle.\n\n" +
        "Méthode : l’angle droit est au sommet opposé au plus grand côté.\n\n" +
        `Calcul : ${fr(sq(h))} = ${fr(sq(x1) + sq(x2))} ; le plus grand côté est [${t.hyp}], le sommet opposé est ${t.droit}.\n\n` +
        `Conclusion : ${bon}`,
    };
  }
  if (mode === 2) {
    const [a, b, c] = longueursReciproque(false, "varie");
    const bon = `Le triangle ${t.nom} n’est pas rectangle : s’il l’était, ces deux nombres seraient égaux.`;
    return {
      text: `Dans le triangle ${t.nom}, le plus grand côté est [${t.hyp}]. D’une part ${t.hyp}² = ${fr(sq(c))}, d’autre part ${t.c1}² + ${t.c2}² = ${fr(sq(a) + sq(b))}. ${question}`,
      format: "qcm",
      choices: qcm(bon, [
        `D’après la réciproque du théorème de Pythagore, le triangle ${t.nom} est rectangle en ${t.droit}.`,
        `Le triangle ${t.nom} est presque rectangle en ${t.droit}.`,
        `D’après le théorème de Pythagore, le triangle ${t.nom} est rectangle en ${t.droit}.`,
        `On ne peut rien conclure sur le triangle ${t.nom}.`,
      ]),
      expected: [bon],
      comparator: "mcq_exact",
      explanation:
        "Définition : si le triangle était rectangle, le théorème de Pythagore donnerait l’égalité.\n\n" +
        "Méthode : on compare les deux nombres : une égalité est vraie ou fausse, il n’y a pas de « presque ».\n\n" +
        `Calcul : ${fr(sq(c))} ≠ ${fr(sq(a) + sq(b))}.\n\n` +
        `Conclusion : ${bon}`,
    };
  }
  const bon = `${t.c2}² = ${t.hyp}² − ${t.c1}²`;
  return {
    text: randomChoice([
      `Le triangle ${t.nom} est rectangle en ${t.droit}. On connaît ${t.hyp} et ${t.c1}, on cherche ${t.c2}. Quelle égalité écrire ?`,
      `Dans le triangle ${t.nom} rectangle en ${t.droit}, on cherche ${t.c2} à partir de l’hypoténuse et de ${t.c1}. Quelle égalité convient ?`,
    ]),
    format: "qcm",
    choices: qcm(bon, [`${t.c2}² = ${t.hyp}² + ${t.c1}²`, `${t.hyp}² = ${t.c2}² − ${t.c1}²`, `${t.c2} = ${t.hyp} − ${t.c1}`, `${t.c2}² = ${t.c1}² − ${t.hyp}²`]),
    expected: [bon],
    comparator: "mcq_exact",
    explanation:
      `Définition : d’après le théorème de Pythagore, ${t.hyp}² = ${t.c1}² + ${t.c2}².\n\n` +
      `Méthode : on isole ${t.c2}² : on retire ${t.c1}² des deux côtés.\n\n` +
      `Calcul : ${t.c2}² = ${t.hyp}² − ${t.c1}².\n\n` +
      `Conclusion : on soustrait, car [${t.c2}] n’est pas l’hypoténuse.`,
  };
}

/** ★3 — le calcul à écrire après l'égalité : hypoténuse² ou côté². */
function genEgaliteCalcul(): Q {
  const t = tirerTriangle();
  const [x1, x2, h] = tirerTriplet("varie");
  const u = randomChoice(UNITES);
  const A = fr(x1);
  if (randomChoice([true, false])) {
    const B = fr(x2);
    const [g, p] = x1 > x2 ? [A, B] : [B, A];
    const bon = `${A}² + ${B}²`;
    return {
      text: randomChoice([
        `Le triangle ${t.nom} est rectangle en ${t.droit}, avec ${t.c1} = ${A} ${u} et ${t.c2} = ${B} ${u}. Quel calcul donne ${t.hyp}² ?`,
        `Complète la rédaction : « Dans le triangle ${t.nom} rectangle en ${t.droit}, d’après le théorème de Pythagore, ${t.hyp}² = … » sachant que ${t.c1} = ${A} ${u} et ${t.c2} = ${B} ${u}.`,
        `Dans le triangle ${t.nom} rectangle en ${t.droit}, ${t.c2} = ${B} ${u} et ${t.c1} = ${A} ${u}. Par quel calcul commence-t-on pour trouver ${t.hyp} ?`,
      ]),
      format: "qcm",
      choices: qcm(bon, [`${A} + ${B}`, `(${A} + ${B})²`, `${g}² − ${p}²`, `${A} × ${B}`, `2 × ${A} + 2 × ${B}`]),
      expected: [bon],
      comparator: "mcq_exact",
      explanation:
        `Définition : ${t.nom} est rectangle en ${t.droit}, son hypoténuse est [${t.hyp}].\n\n` +
        `Méthode : ${t.hyp}² = ${t.c1}² + ${t.c2}² : on additionne les CARRÉS, pas les longueurs.\n\n` +
        `Calcul : ${t.hyp}² = ${A}² + ${B}² = ${fr(sq(x1) + sq(x2))}, donc ${t.hyp} = ${fr(h)} ${u}.\n\n` +
        `Conclusion : le bon calcul est ${bon}.`,
    };
  }
  const H = fr(h);
  const bon = `${H}² − ${A}²`;
  return {
    text: randomChoice([
      `Le triangle ${t.nom} est rectangle en ${t.droit} ; ${t.hyp} = ${H} ${u} et ${t.c1} = ${A} ${u}. Quel calcul donne ${t.c2}² ?`,
      `Complète : « Dans le triangle ${t.nom} rectangle en ${t.droit}, ${t.c2}² = … », sachant que ${t.hyp} = ${H} ${u} et ${t.c1} = ${A} ${u}.`,
      `Dans le triangle ${t.nom} rectangle en ${t.droit}, ${t.c1} = ${A} ${u} et l’hypoténuse mesure ${H} ${u}. Quel calcul permet de trouver ${t.c2} ?`,
    ]),
    format: "qcm",
    choices: qcm(bon, [`${H}² + ${A}²`, `${A}² − ${H}²`, `${H} − ${A}`, `(${H} − ${A})²`, `${H} + ${A}`]),
    expected: [bon],
    comparator: "mcq_exact",
    explanation:
      `Définition : ${t.hyp}² = ${t.c1}² + ${t.c2}², donc ${t.c2}² = ${t.hyp}² − ${t.c1}².\n\n` +
      "Méthode : on cherche un côté de l’angle droit : on soustrait le carré du côté connu au carré de l’hypoténuse.\n\n" +
      `Calcul : ${t.c2}² = ${H}² − ${A}² = ${fr(sq(h) - sq(x1))}, donc ${t.c2} = ${fr(x2)} ${u}.\n\n` +
      `Conclusion : le bon calcul est ${bon}.`,
  };
}

/** ★4 — repérer ce qui cloche dans la rédaction d'un autre (le geste du brevet). */
function genErreurRedaction(): Q {
  const t = tirerTriangle();
  const cas = randomChoice([
    {
      redaction: `Dans le triangle ${t.nom} rectangle en ${t.droit}, d’après le théorème de Pythagore : ${t.c1}² = ${t.hyp}² + ${t.c2}²`,
      faute: "l’hypoténuse n’est pas au bon endroit",
      pourquoi: `l’angle droit est en ${t.droit}, donc l’hypoténuse est [${t.hyp}] : c’est ${t.hyp}² qui doit être seul dans un membre, pas ${t.c1}²`,
    },
    {
      redaction: `Dans le triangle ${t.nom}, d’après le théorème de Pythagore : ${t.hyp}² = ${t.c1}² + ${t.c2}²`,
      faute: "l’angle droit n’est pas précisé",
      pourquoi: `sans « rectangle en ${t.droit} », rien ne justifie d’appliquer le théorème : c’est sa seule condition d’emploi`,
    },
    {
      redaction: `D’après le théorème de Pythagore : ${t.hyp}² = ${t.c1}² + ${t.c2}²`,
      faute: "le triangle n’est pas nommé",
      pourquoi: "une démonstration doit dire de quel triangle elle parle, et où est son angle droit",
    },
    {
      redaction: `Dans le triangle ${t.nom} rectangle en ${t.droit}, d’après le théorème de Pythagore : ${t.hyp} = ${t.c1} + ${t.c2}`,
      faute: "les carrés ont disparu",
      pourquoi: "le théorème relie les CARRÉS des longueurs ; sans eux, l’égalité est fausse",
    },
    {
      redaction: `Dans le triangle ${t.nom} rectangle en ${t.droit}, d’après le théorème de Pythagore : ${t.hyp}² = ${t.c1}² + ${t.c2}²`,
      faute: "rien : la rédaction est correcte",
      pourquoi: "le triangle est nommé, l’angle droit précisé, et l’hypoténuse est seule dans un membre",
    },
  ]);
  return {
    text: randomChoice([
      `Un élève écrit : « ${cas.redaction} ». Qu’est-ce qui cloche ?`,
      `Voici la rédaction d’une élève : « ${cas.redaction} ». Quelle est son erreur ?`,
      `Au brevet, un candidat écrit : « ${cas.redaction} ». Que lui reprocherait le correcteur ?`,
    ]),
    format: "qcm",
    choices: shuffle([
      "l’hypoténuse n’est pas au bon endroit",
      "l’angle droit n’est pas précisé",
      "le triangle n’est pas nommé",
      "les carrés ont disparu",
      "rien : la rédaction est correcte",
    ]),
    expected: [cas.faute],
    comparator: "mcq_exact",
    explanation:
      "Définition : une rédaction de Pythagore tient en trois points : le triangle NOMMÉ, l’angle droit PRÉCISÉ, l’hypoténuse SEULE dans un membre de l’égalité des carrés.\n\n" +
      "Méthode : on relit la phrase en vérifiant les trois points, puis les carrés.\n\n" +
      `Calcul : ici, ${cas.pourquoi}.\n\n` +
      `Conclusion : ${cas.faute}.`,
  };
}

/** ★4 — choisir la rédaction complète, sans faute. */
function genRedigeComplet(): Q {
  const t = tirerTriangle();
  const [x1, x2, h] = tirerTriplet("varie");
  const u = randomChoice(UNITES);
  const question = randomChoice(["Quelle rédaction est juste ?", "Laquelle de ces rédactions est correcte ?", "Quelle rédaction recopier sur sa copie ?"]);
  const debut = (prop: string) => `${t.nom} est rectangle en ${t.droit}, donc d’après ${prop}`;
  const TH = "le théorème de Pythagore";
  const RE = "la réciproque du théorème de Pythagore";
  if (randomChoice([true, false])) {
    const S = sq(x1) + sq(x2);
    const ligne = (prop: string, op: string, v: number, r: string) =>
      `${debut(prop)}, ${t.hyp}² = ${t.c1}² ${op} ${t.c2}² = ${fr(x1)}² ${op} ${fr(x2)}² = ${fr(v)}, donc ${t.hyp} = ${r}.`;
    const bon = ligne(TH, "+", S, `√${fr(S)} = ${fr(h)} ${u}`);
    return {
      text: randomChoice([
        `Le triangle ${t.nom} est rectangle en ${t.droit}, avec ${t.c1} = ${fr(x1)} ${u} et ${t.c2} = ${fr(x2)} ${u}. On calcule ${t.hyp}. ${question}`,
        `On rédige le calcul de l’hypoténuse du triangle ${t.nom} rectangle en ${t.droit}, sachant que ${t.c1} = ${fr(x1)} ${u} et ${t.c2} = ${fr(x2)} ${u}. ${question}`,
      ]),
      format: "qcm",
      choices: qcm(bon, [
        ligne(RE, "+", S, `√${fr(S)} = ${fr(h)} ${u}`),
        ligne(TH, "+", S, `${fr(S)} ${u}`),
        `${debut(TH)}, ${t.hyp} = ${t.c1} + ${t.c2} = ${fr(x1)} + ${fr(x2)} = ${fr(x1 + x2)} ${u}.`,
      ]),
      expected: [bon],
      comparator: "mcq_exact",
      explanation: explHypNomme(t, x1, x2, u),
    };
  }
  const D = sq(h) - sq(x1);
  const ligne = (prop: string, op: string, v: number, r: string) =>
    `${debut(prop)}, ${t.hyp}² = ${t.c1}² + ${t.c2}², donc ${t.c2}² = ${t.hyp}² ${op} ${t.c1}² = ${fr(h)}² ${op} ${fr(x1)}² = ${fr(v)}, donc ${t.c2} = ${r}.`;
  const bon = ligne(TH, "−", D, `√${fr(D)} = ${fr(x2)} ${u}`);
  const Sf = sq(h) + sq(x1);
  return {
    text: randomChoice([
      `Le triangle ${t.nom} est rectangle en ${t.droit}, avec ${t.hyp} = ${fr(h)} ${u} et ${t.c1} = ${fr(x1)} ${u}. On calcule ${t.c2}. ${question}`,
      `On rédige le calcul de ${t.c2} dans le triangle ${t.nom} rectangle en ${t.droit}, où l’hypoténuse mesure ${fr(h)} ${u} et ${t.c1} = ${fr(x1)} ${u}. ${question}`,
    ]),
    format: "qcm",
    choices: qcm(bon, [
      ligne(RE, "−", D, `√${fr(D)} = ${fr(x2)} ${u}`),
      ligne(TH, "+", Sf, `√${fr(Sf)} ${racineExacte(Sf) ? "=" : "≈"} ${frA(arrondi1(Math.sqrt(Sf)), racineExacte(Sf))} ${u}`),
      ligne(TH, "−", D, `${fr(D)} ${u}`),
    ]),
    expected: [bon],
    comparator: "mcq_exact",
    explanation: explCoteNomme(t, h, x1, u),
  };
}

/** ★4 — rédiger la conclusion de la réciproque. */
function genConclureReciproque(): Q {
  const vrai = randomChoice([true, false]);
  const [a, b, c] = longueursReciproque(vrai, randomChoice(["simple", "varie", "decimal"] as SorteTriplet[]));
  const t = tirerTriangle();
  const u = uniteDe(a, b, c);
  const liste = listeCotes(t, a, b, c, u);
  const conclusions = {
    reciproque: `D’après la réciproque du théorème de Pythagore, ${t.nom} est rectangle en ${t.droit}.`,
    theoreme: `D’après le théorème de Pythagore, ${t.nom} est rectangle en ${t.droit}.`,
    sommet: `D’après la réciproque du théorème de Pythagore, ${t.nom} est rectangle en ${t.p}.`,
    non: `${t.nom} n’est pas rectangle : s’il l’était, ${t.hyp}² serait égal à ${t.c1}² + ${t.c2}².`,
    presque: `${t.nom} est presque rectangle en ${t.droit}.`,
  };
  const bon = vrai ? conclusions.reciproque : conclusions.non;
  return {
    text: randomChoice([
      `Le triangle ${t.nom} a pour côtés ${liste}. Est-il rectangle ? Choisis la conclusion correctement rédigée.`,
      `Dans le triangle ${t.nom}, ${liste}. Après les deux calculs séparés, quelle conclusion faut-il écrire ?`,
      `Le triangle ${t.nom}, où ${liste}, est-il rectangle ou non ? Quelle phrase conclut correctement ?`,
    ]),
    format: "qcm",
    choices: qcm(bon, vrai ? [conclusions.theoreme, conclusions.sommet, conclusions.non] : [conclusions.reciproque, conclusions.presque, conclusions.theoreme]),
    expected: [bon],
    comparator: "mcq_exact",
    explanation:
      "Définition : la réciproque du théorème de Pythagore permet de prouver qu’un triangle est rectangle ; si l’égalité est fausse, le théorème lui-même prouve qu’il ne l’est pas.\n\n" +
      "Méthode : plus grand côté, puis « d’une part », « d’autre part », puis la phrase de conclusion.\n\n" +
      `Calcul : ${redactionReciproque(t, a, b, c)}\n\n` +
      `Conclusion : ${bon}`,
  };
}

/* =========================================================================
   DÉFIS — problèmes de brevet
========================================================================= */

const DENIVELES: { lieu: string; trajet: string }[] = [
  { lieu: "Dans les Alpes", trajet: "un téléphérique" },
  { lieu: "Dans les Pyrénées", trajet: "un télésiège" },
  { lieu: "À Montmartre", trajet: "un funiculaire" },
  { lieu: "Dans une station de ski", trajet: "un téléski" },
  { lieu: "Dans un parc d’aventure", trajet: "une tyrolienne" },
  { lieu: "À La Réunion, au-dessus d’une ravine", trajet: "un câble de tyrolienne" },
  { lieu: "À La Réunion, dans le cirque de Salazie", trajet: "un sentier rectiligne" },
  { lieu: "Dans le Jura", trajet: "un remonte-pente rectiligne" },
];
/** ★5 — un dénivelé : distance en ligne droite, ou hauteur gagnée, parfois à arrondir. */
function genDenivele(): Q {
  const d = randomChoice(DENIVELES);
  const [h0, l, c0] = randomChoice([[30, 40, 50], [50, 120, 130], [80, 150, 170], [70, 240, 250], [200, 210, 290], [90, 120, 150], [60, 80, 100]] as [number, number, number][]);
  const cherche = randomChoice(["hyp", "hauteur", "horizontal"]);
  // Une fois sur trois, une donnée décalée : la réponse est à arrondir au dixième.
  const decale = Math.random() < 0.35;
  const h = cherche === "hyp" && decale ? h0 + 5 : h0;
  const c = cherche !== "hyp" && decale ? c0 + 5 : c0;
  const base = `${d.lieu}, ${d.trajet} relie deux points`;
  const S2 = cherche === "hyp" ? h * h + l * l : c * c - (cherche === "hauteur" ? l : h) ** 2;
  const exact = racineExacte(S2);
  const rep = arrondi1(Math.sqrt(S2));
  let calcul: string;
  if (cherche === "hyp") {
    calcul = `Méthode : on cherche l’hypoténuse : on additionne les carrés.\n\nCalcul : ${h}² + ${l}² = ${fr(h * h)} + ${fr(l * l)} = ${fr(S2)}, donc la longueur vaut √${fr(S2)} ${exact ? "=" : "≈"} ${frA(rep, exact)} m.\n\n`;
  } else {
    const autre = cherche === "hauteur" ? l : h;
    calcul = `Méthode : on cherche un côté de l’angle droit : on soustrait les carrés.\n\nCalcul : ${c}² − ${autre}² = ${fr(c * c)} − ${fr(autre * autre)} = ${fr(S2)}, donc la longueur vaut √${fr(S2)} ${exact ? "=" : "≈"} ${frA(rep, exact)} m.\n\n`;
  }
  const texte =
    (cherche === "hyp"
      ? `${base} : l’un est ${h} m plus haut que l’autre, et ils sont écartés de ${l} m à l’horizontale. Quelle est la longueur du trajet en ligne droite ?`
      : cherche === "hauteur"
        ? `${base} distants de ${c} m en ligne droite. À l’horizontale, ils sont écartés de ${l} m. Quel est le dénivelé entre les deux points ?`
        : `${base} distants de ${c} m en ligne droite, avec un dénivelé de ${h} m. Quelle est la distance horizontale entre les deux points ?`) +
    (exact ? "" : randomChoice(SUFFIXES_ARRONDI));
  return {
    text: texte,
    format: "short",
    expected: attendu(rep, "m", exact),
    comparator: "number_equal",
    explanation:
      "Définition : le trajet en ligne droite, la distance horizontale et le dénivelé forment un triangle rectangle ; le trajet est l’hypoténuse.\n\n" +
      calcul +
      `Conclusion : la réponse est ${exact ? "" : "environ "}${frA(rep, exact)} m.`,
  };
}

/** ★5 — deux triangles nommés : lequel est rectangle (un, les deux, aucun). */
function genLequelRectangle(): Q {
  const t1 = tirerTriangle();
  let t2 = tirerTriangle();
  while (t2.nom === t1.nom) t2 = tirerTriangle();
  const cas = randomInt(0, 3);
  const r1 = cas === 0 || cas === 2;
  const r2 = cas === 1 || cas === 2;
  const sorte = randomChoice(["simple", "varie", "decimal"] as SorteTriplet[]);
  const [a1, b1, c1] = longueursReciproque(r1, sorte);
  const [a2, b2, c2] = longueursReciproque(r2, sorte);
  const u = uniteDe(a1, b1, c1, a2, b2, c2);
  const l1 = listeCotes(t1, a1, b1, c1, u);
  const l2 = listeCotes(t2, a2, b2, c2, u);
  const choix = [`le triangle ${t1.nom}`, `le triangle ${t2.nom}`, "les deux", "aucun"];
  return {
    text: randomChoice([
      `Triangle ${t1.nom} : ${l1}. Triangle ${t2.nom} : ${l2}. Lequel est rectangle ?`,
      `On a mesuré deux triangles. Dans ${t1.nom}, ${l1}. Dans ${t2.nom}, ${l2}. Lequel est rectangle ?`,
      `Voici deux triangles : ${t1.nom}, où ${l1}, et ${t2.nom}, où ${l2}. Lequel a un angle droit ?`,
    ]),
    format: "qcm",
    choices: choix,
    expected: [choix[cas]],
    comparator: "mcq_exact",
    explanation:
      "Définition : la réciproque du théorème de Pythagore se teste triangle par triangle.\n\n" +
      "Méthode : pour chacun, on compare le carré du plus grand côté à la somme des carrés des deux autres.\n\n" +
      `Calcul : pour ${t1.nom}, ${redactionReciproque(t1, a1, b1, c1)}\nPour ${t2.nom}, ${redactionReciproque(t2, a2, b2, c2)}\n\n` +
      `Conclusion : ${["seul " + t1.nom + " est rectangle", "seul " + t2.nom + " est rectangle", "les deux sont rectangles", "aucun n’est rectangle"][cas]}.`,
  };
}

/** ★5 — problèmes en deux étapes : périmètre, raccourci, aller-retour. */
const DEUX_ETAPES: { mode: 0 | 1 | 2; u: string; k: number; t: (a: number, b: number) => string }[] = [
  { mode: 0, u: "m", k: 1, t: (a, b) => `Un jardin a la forme d’un triangle rectangle dont les côtés de l’angle droit mesurent ${a} m et ${b} m. Quelle longueur de clôture faut-il pour en faire le tour ?` },
  { mode: 0, u: "dm", k: 1, t: (a, b) => `Une voile triangulaire, rectangle au pied du mât, a deux bords perpendiculaires de ${a} dm et ${b} dm. On coud un ourlet tout autour. Quelle est la longueur de l’ourlet, en dm ?` },
  { mode: 0, u: "cm", k: 10, t: (a, b) => `Un panneau de signalisation est un triangle rectangle dont les côtés de l’angle droit mesurent ${a} cm et ${b} cm. Quel est son périmètre, en cm ?` },
  { mode: 0, u: "km", k: 1, t: (a, b) => `Un randonneur fait une boucle : ${a} km vers le nord, ${b} km vers l’est, puis il revient en ligne droite au départ. Quelle distance totale parcourt-il, en km ?` },
  { mode: 1, u: "m", k: 10, t: (a, b) => `Pour traverser un parc rectangulaire de ${a} m sur ${b} m, Paul longe deux côtés. Combien de mètres économiserait-il en coupant tout droit en diagonale ?` },
  { mode: 1, u: "m", k: 10, t: (a, b) => `Un champ rectangulaire mesure ${a} m sur ${b} m. Un chien va d’un coin au coin opposé en ligne droite, son maître en longeant les bords. Combien de mètres le maître fait-il de plus ?` },
  { mode: 1, u: "m", k: 5, t: (a, b) => `Pour aller d’un coin à l’autre d’une place rectangulaire de ${a} m sur ${b} m, on peut longer deux côtés ou traverser en diagonale. Quelle distance gagne-t-on en traversant ?` },
  { mode: 2, u: "m", k: 1, t: (a, b) => `Un drone monte verticalement de ${a} m, avance horizontalement de ${b} m, puis revient en ligne droite à son point de départ. Quelle distance totale a-t-il parcourue ?` },
  { mode: 2, u: "m", k: 1, t: (a, b) => `Une nageuse traverse une piscine de ${a} m sur ${b} m en diagonale, puis revient au départ en longeant les deux bords. Quelle distance a-t-elle nagée en tout ?` },
  { mode: 2, u: "km", k: 1, t: (a, b) => `Un bateau part de Saint-Gilles, fait ${a} km vers l’ouest puis ${b} km vers le sud, et rentre au port en ligne droite. Combien de kilomètres a-t-il parcourus en tout ?` },
];
function genProblemeDeuxEtapes(): Q {
  const ctx = randomChoice(DEUX_ETAPES);
  let [a, b, c] = tirerTriplet("simple").map((x) => x * ctx.k);
  if (ctx.t(1, 2).includes("piscine")) while (Math.min(a, b) < 5) [a, b, c] = tirerTriplet("simple");
  if (ctx.t(1, 2).includes("voile")) while (Math.min(a, b) < 10) [a, b, c] = tirerTriplet("simple");
  const u = ctx.u;
  if (ctx.mode === 1) {
    return {
      text: ctx.t(a, b),
      format: "short",
      expected: attendu(a + b - c, u),
      comparator: "number_equal",
      explanation:
        "Définition : la diagonale est l’hypoténuse du triangle rectangle formé par deux côtés du rectangle.\n\n" +
        "Méthode : on calcule la diagonale avec Pythagore, puis on la retire au trajet qui longe les bords.\n\n" +
        `Calcul : diagonale² = ${a}² + ${b}² = ${fr(a * a)} + ${fr(b * b)} = ${fr(c * c)}, donc diagonale = ${c} m. En longeant : ${a} + ${b} = ${a + b} m. Écart : ${a + b} − ${c} = ${a + b - c} m.\n\n` +
        `Conclusion : la différence est de ${a + b - c} m.`,
    };
  }
  return {
    text: ctx.t(a, b),
    format: "short",
    expected: attendu(a + b + c, u),
    comparator: "number_equal",
    explanation:
      `Définition : il faut les TROIS longueurs ; la troisième est l’hypoténuse d’un triangle rectangle dont les côtés de l’angle droit mesurent ${a} ${u} et ${b} ${u}.\n\n` +
      "Méthode : on calcule d’abord l’hypoténuse avec Pythagore, puis on additionne les trois longueurs.\n\n" +
      `Calcul : ${a}² + ${b}² = ${fr(a * a)} + ${fr(b * b)} = ${fr(c * c)}, donc la troisième longueur mesure √${fr(c * c)} = ${c} ${u}. Puis ${a} + ${b} + ${c} = ${a + b + c}.\n\n` +
      `Conclusion : la réponse est ${a + b + c} ${u}.`,
  };
}

/** ★5 — déplacements à angle droit (bateau, avion, cycliste…). */
function genDeplacement(): Q {
  const mobile = randomChoice<{ qui: string; verbe: string; u: string; sortes: SorteTriplet[] }>([
    { qui: "Un bateau", verbe: "navigue", u: "km", sortes: ["simple", "varie"] },
    { qui: "Un avion de tourisme", verbe: "vole", u: "km", sortes: ["simple", "varie"] },
    { qui: "Une cycliste", verbe: "roule", u: "km", sortes: ["simple", "decimal"] },
    { qui: "Un randonneur", verbe: "marche", u: "km", sortes: ["simple", "decimal"] },
    { qui: "Un robot aspirateur", verbe: "avance", u: "m", sortes: ["decimal"] },
    { qui: "Une fourmi", verbe: "avance", u: "cm", sortes: ["simple"] },
    { qui: "Un kayakiste", verbe: "pagaie", u: "km", sortes: ["simple", "decimal"] },
  ]);
  const [d1, d2] = randomChoice([["vers l’est", "vers le nord"], ["vers l’ouest", "vers le sud"], ["vers le nord", "vers l’ouest"], ["vers le sud", "vers l’est"]]);
  let [a, b] = tirerTriplet(randomChoice(mobile.sortes));
  if (Math.random() < 0.35) a = Math.round((a + 1) * 10) / 10;
  const S = sq(a) + sq(b);
  const exact = racineExacte(S);
  const c = arrondi1(Math.sqrt(S));
  const L = (x: number) => `${fr(x)} ${mobile.u}`;
  const fem = mobile.qui.startsWith("Une");
  return {
    text:
      randomChoice([
        `${mobile.qui} ${mobile.verbe} ${L(a)} ${d1}, puis ${L(b)} ${d2}. À quelle distance en ligne droite se trouve-t-${fem ? "elle" : "il"} de son point de départ ?`,
        `${mobile.qui} part d’un point O, ${mobile.verbe} ${L(a)} ${d1}, puis tourne à angle droit et parcourt ${L(b)} ${d2}. Quelle distance ${fem ? "la" : "le"} sépare alors de O ?`,
      ]) + (exact ? "" : randomChoice(SUFFIXES_ARRONDI)),
    format: "short",
    expected: attendu(c, mobile.u, exact),
    comparator: "number_equal",
    explanation:
      "Définition : les deux trajets sont perpendiculaires : ils forment les côtés de l’angle droit ; la distance directe est l’hypoténuse.\n\n" +
      "Méthode : distance² = premier trajet² + second trajet².\n\n" +
      `Calcul : ${fr(a)}² + ${fr(b)}² = ${fr(sq(a))} + ${fr(sq(b))} = ${fr(S)}, donc distance = √${fr(S)} ${exact ? "=" : "≈"} ${frA(c, exact)}.\n\n` +
      `Conclusion : la distance est ${exact ? "de " : "d’environ "}${frA(c, exact)} ${mobile.u}.`,
  };
}

/** ★5 — le choix de la propriété : théorème, réciproque (ou Thalès en leurre). */
function genDefiExplique(): Q {
  const t = tirerTriangle();
  const [a, b, c] = tirerTriplet("varie");
  const u = randomChoice(UNITES);
  const liste = listeCotes(t, a, b, c, u);
  const mode = randomInt(0, 2);
  const text = [
    `Un élève connaît les trois longueurs du triangle ${t.nom} : ${liste}. Il veut savoir si ${t.nom} est rectangle. Quelle propriété doit-il utiliser ?`,
    `On sait que le triangle ${t.nom} est rectangle en ${t.droit}, et on connaît ${t.c1} = ${fr(a)} ${u} et ${t.c2} = ${fr(b)} ${u}. Quelle propriété permet de calculer ${t.hyp} ?`,
    `Une élève écrit : « Dans le triangle ${t.nom}, ${liste}, donc d’après le théorème de Pythagore ${t.nom} est rectangle. » Quelle propriété aurait-elle dû citer ?`,
  ][mode];
  const PROPRIETES = ["la réciproque du théorème de Pythagore", "le théorème de Pythagore", "le théorème de Thalès", "la réciproque du théorème de Thalès"];
  const bon = mode === 1 ? PROPRIETES[1] : PROPRIETES[0];
  return {
    text,
    format: "qcm",
    choices: shuffle(PROPRIETES),
    expected: [bon],
    comparator: "mcq_exact",
    explanation:
      "Définition : le théorème de Pythagore part d’un triangle qu’on SAIT rectangle et sert à calculer une longueur ; la réciproque part de trois longueurs et sert à PROUVER que le triangle est rectangle. Thalès demande des droites parallèles.\n\n" +
      "Méthode : on se demande ce qu’on sait déjà (l’angle droit ?) et ce qu’on cherche (une longueur ? un angle droit ?).\n\n" +
      (mode === 1
        ? `Calcul : l’angle droit est connu, en ${t.droit} ; on cherche ${t.hyp} : ${t.hyp}² = ${fr(a)}² + ${fr(b)}² = ${fr(sq(a) + sq(b))}, donc ${t.hyp} = ${fr(c)} ${u}.\n\n`
        : `Calcul : ${redactionReciproque(t, a, b, c)}\n\n`) +
      (mode === 1
        ? "Conclusion : on sait déjà que le triangle est rectangle, on cherche une longueur : c’est le théorème de Pythagore."
        : "Conclusion : on ne sait pas d’avance que le triangle est rectangle : seule la réciproque permet de le prouver."),
  };
}

/** ★4 — deux étapes : Pythagore, puis l'aire ou le périmètre. */
function genAireApresPythagore(): Q {
  const t = tirerTriangle();
  const [x1, x2, h] = tirerTriplet(randomChoice(["simple", "varie"] as SorteTriplet[]));
  const u = randomChoice(["cm", "cm", "m", "dm"]);
  const L = (x: number) => `${fr(x)} ${u}`;
  const perimetre = Math.random() < 0.4;
  const debut = randomChoice([
    `Le triangle ${t.nom} est rectangle en ${t.droit}, avec ${t.hyp} = ${L(h)} et ${t.c1} = ${L(x1)}.`,
    `${t.nom} est un triangle rectangle en ${t.droit} ; son hypoténuse mesure ${L(h)} et ${t.c1} = ${L(x1)}.`,
    `Dans le triangle ${t.nom} rectangle en ${t.droit}, on donne ${t.c1} = ${L(x1)} et ${t.hyp} = ${L(h)}.`,
  ]);
  const etape1 = `Calcul : ${t.c2}² = ${t.hyp}² − ${t.c1}² = ${fr(h)}² − ${fr(x1)}² = ${fr(sq(h))} − ${fr(sq(x1))} = ${fr(sq(h) - sq(x1))}, donc ${t.c2} = ${L(x2)}. `;
  if (perimetre) {
    const P = x1 + x2 + h;
    return {
      text: debut + randomChoice([" Calcule son périmètre.", " Quel est le périmètre du triangle ?"]),
      format: "short",
      expected: attendu(P, u),
      comparator: "number_equal",
      explanation:
        "Définition : le périmètre est la somme des trois côtés ; il manque [" + t.c2 + "], un côté de l’angle droit.\n\n" +
        "Méthode : on calcule d’abord ce côté avec le théorème de Pythagore (on soustrait), puis on additionne les trois longueurs.\n\n" +
        etape1 + `Puis ${fr(x1)} + ${fr(x2)} + ${fr(h)} = ${fr(P)}.\n\n` +
        `Conclusion : le périmètre est ${L(P)}.`,
    };
  }
  const A = (x1 * x2) / 2;
  return {
    text: debut + randomChoice([" Calcule son aire.", " Quelle est l’aire du triangle ?"]),
    format: "short",
    expected: attenduAire(A, u),
    comparator: "number_equal",
    explanation:
      `Définition : l’aire d’un triangle rectangle est (côté de l’angle droit × autre côté de l’angle droit) ÷ 2 ; il manque [${t.c2}].\n\n` +
      "Méthode : on calcule d’abord ce côté avec le théorème de Pythagore (on soustrait), puis l’aire.\n\n" +
      etape1 + `Puis (${fr(x1)} × ${fr(x2)}) ÷ 2 = ${fr(x1 * x2)} ÷ 2 = ${fr(A)}.\n\n` +
      `Conclusion : l’aire est ${fr(A)} ${u}².`,
  };
}

/** ★5 — la hauteur d'un triangle isocèle, puis son aire (classique du brevet). */
const NOMS_ISOCELES = ["ABC", "RST", "EFG", "KLM", "MNP", "DEF", "UVW", "PQR", "XYZ", "JKL", "STU", "BCD", "LMN", "QRS", "TUV", "CDE"];
function genIsoceleHauteur(): Q {
  const nom = randomChoice(NOMS_ISOCELES);
  const L3 = nom.split("");
  const k = randomInt(0, 2);
  const S = L3[k];
  const [P, R] = L3.filter((_, i) => i !== k);
  const base = nom.indexOf(P) < nom.indexOf(R) ? P + R : R + P;
  const SP = nom.indexOf(S) < nom.indexOf(P) ? S + P : P + S;
  const SR = nom.indexOf(S) < nom.indexOf(R) ? S + R : R + S;
  const [m, hh, c] = tirerTriplet(randomChoice(["simple", "varie"] as SorteTriplet[]));
  const u = randomChoice(["cm", "cm", "m", "dm"]);
  const L = (x: number) => `${fr(x)} ${u}`;
  const debut = randomChoice([
    `Le triangle ${nom} est isocèle en ${S} : ${SP} = ${SR} = ${L(c)} et ${base} = ${L(2 * m)}. H est le milieu de [${base}].`,
    `${nom} est un triangle isocèle en ${S}, de base [${base}] = ${L(2 * m)} et de côtés égaux ${SP} = ${SR} = ${L(c)}. On appelle H le pied de la hauteur issue de ${S}.`,
  ]);
  const calculH = `${S}H² = ${SP}² − ${P}H² = ${fr(c)}² − ${fr(m)}² = ${fr(sq(c))} − ${fr(sq(m))} = ${fr(sq(c) - sq(m))}, donc ${S}H = ${L(hh)}`;
  const def = `Définition : dans un triangle isocèle en ${S}, la hauteur issue de ${S} coupe la base en son milieu H, à angle droit : le triangle ${S}H${P} est rectangle en H, d’hypoténuse [${SP}].\n\n`;
  if (randomChoice([true, false])) {
    return {
      text: debut + randomChoice([` Calcule la hauteur ${S}H.`, ` Quelle est la longueur ${S}H ?`]),
      format: "short",
      expected: attendu(hh, u),
      comparator: "number_equal",
      explanation:
        def +
        `Méthode : ${P}H = ${base} ÷ 2 = ${fr(2 * m)} ÷ 2 = ${L(m)} ; on cherche un côté de l’angle droit : on soustrait les carrés.\n\n` +
        `Calcul : ${calculH}.\n\n` +
        `Conclusion : la hauteur ${S}H mesure ${L(hh)}.`,
    };
  }
  const A = m * hh;
  return {
    text: debut + randomChoice([` Calcule l’aire du triangle ${nom}.`, ` Quelle est l’aire du triangle ${nom} ?`]),
    format: "short",
    expected: attenduAire(A, u),
    comparator: "number_equal",
    explanation:
      def +
      `Méthode : on calcule la hauteur ${S}H avec Pythagore (${P}H = ${base} ÷ 2 = ${L(m)}), puis l’aire = (base × hauteur) ÷ 2.\n\n` +
      `Calcul : ${calculH}. Aire = (${fr(2 * m)} × ${fr(hh)}) ÷ 2 = ${fr(2 * m * hh)} ÷ 2 = ${fr(A)}.\n\n` +
      `Conclusion : l’aire du triangle ${nom} est ${fr(A)} ${u}².`,
  };
}

/** ★5 — deux triangles rectangles accolés : Pythagore deux fois (classique du brevet). */
const NOMS_QUADRUPLETS = ["ABCD", "EFGK", "KLMN", "RSTU", "MNPQ", "DEFG", "JKLM", "UVWX", "PQRS", "BCDE"];
function genBrevetDeuxTriangles(): Q {
  const [A, B, C, D] = randomChoice(NOMS_QUADRUPLETS).split("");
  const [a, b, c] = tirerTriplet(randomChoice(["simple", "varie"] as SorteTriplet[]));
  const u = randomChoice(["cm", "cm", "m"]);
  const L = (x: number) => `${fr(x)} ${u}`;
  const enC = Math.random() < 0.6;
  let d: number;
  let S: number;
  if (enC) {
    do d = randomInt(2, Math.max(4, Math.round(c * 1.5))); while (d === c);
    S = c * c + d * d;
  } else {
    d = randomInt(Math.max(1, Math.ceil(c * 0.3)), c - 1);
    S = c * c - d * d;
  }
  const exact = racineExacte(S);
  const r = arrondi1(Math.sqrt(S));
  const cherche = enC ? `${A}${D}` : `${C}${D}`;
  const second = enC
    ? `le triangle ${A}${C}${D} est rectangle en ${C}, avec ${C}${D} = ${L(d)}`
    : `le triangle ${A}${C}${D} est rectangle en ${D}, avec ${A}${D} = ${L(d)}`;
  const text =
    randomChoice([
      `Le triangle ${A}${B}${C} est rectangle en ${B}, avec ${A}${B} = ${L(a)} et ${B}${C} = ${L(b)}. De plus, ${second}. Calcule ${cherche}.`,
      `Deux triangles rectangles ont le côté [${A}${C}] en commun : ${A}${B}${C} est rectangle en ${B}, avec ${A}${B} = ${L(a)} et ${B}${C} = ${L(b)} ; et ${second}. Quelle est la longueur ${cherche} ?`,
      `On accole deux triangles le long de [${A}${C}]. Le triangle ${A}${B}${C} est rectangle en ${B} (${A}${B} = ${L(a)}, ${B}${C} = ${L(b)}), et ${second}. Détermine ${cherche}.`,
    ]) + (exact ? "" : randomChoice(SUFFIXES_ARRONDI));
  const etape2 = enC
    ? `Dans ${A}${C}${D} rectangle en ${C}, l’hypoténuse est [${A}${D}] : ${A}${D}² = ${A}${C}² + ${C}${D}² = ${fr(c)}² + ${fr(d)}² = ${fr(c * c)} + ${fr(d * d)} = ${fr(S)}, donc ${A}${D} = √${fr(S)} ${exact ? "=" : "≈"} ${frA(r, exact)}.`
    : `Dans ${A}${C}${D} rectangle en ${D}, l’hypoténuse est [${A}${C}] : ${C}${D}² = ${A}${C}² − ${A}${D}² = ${fr(c)}² − ${fr(d)}² = ${fr(c * c)} − ${fr(d * d)} = ${fr(S)}, donc ${C}${D} = √${fr(S)} ${exact ? "=" : "≈"} ${frA(r, exact)}.`;
  return {
    text,
    format: "short",
    expected: attendu(r, u, exact),
    comparator: "number_equal",
    explanation:
      `Définition : [${A}${C}] est l’hypoténuse du triangle ${A}${B}${C} et un côté du triangle ${A}${C}${D} : on applique deux fois le théorème de Pythagore.\n\n` +
      `Méthode : on calcule d’abord ${A}${C} dans ${A}${B}${C}, puis ${cherche} dans ${A}${C}${D}.\n\n` +
      `Calcul : dans ${A}${B}${C} rectangle en ${B}, ${A}${C}² = ${fr(a)}² + ${fr(b)}² = ${fr(a * a)} + ${fr(b * b)} = ${fr(c * c)}, donc ${A}${C} = ${L(c)}. ${etape2}\n\n` +
      `Conclusion : ${cherche} ${exact ? "=" : "≈"} ${frA(r, exact)} ${u}.`,
  };
}

/* =========================================================================
   LA BANQUE
========================================================================= */

function gabarit(
  id: string,
  microId: string,
  difficulty: DifficultyLevel,
  hint: string,
  tags: string[],
  generate: () => Q,
): TutorBankItemV4 {
  return { kind: "template", id, niveau: "3e", matiere: "maths", notionId: "pythagore_theoreme", microId, difficulty, theme: "neutral", hint, tags, generate };
}

export const pythagore3eBank: TutorBankItemV4[] = [
  // =========================
  // RECONNAÎTRE
  // =========================
  {
    kind: "fixed",
    id: "pythagore_theoreme_reconnaitre_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    text: "Dans quel type de triangle peut-on utiliser directement le théorème de Pythagore ?",
    format: "qcm",
    choices: ["un triangle rectangle", "un triangle quelconque", "un triangle isocèle", "un quadrilatère"],
    expected: ["un triangle rectangle"],
    comparator: "mcq_exact",
    hint: "Le théorème de Pythagore nécessite une condition précise sur le triangle.",
    explanation:
      "Définition : le théorème de Pythagore est une propriété des triangles RECTANGLES.\n\n" +
      "Méthode : avant de l’utiliser, on vérifie que le triangle a un angle droit, codé sur la figure ou donné dans l’énoncé.\n\n" +
      "Calcul : un triangle quelconque ou isocèle n’a pas forcément d’angle droit, et un quadrilatère n’est pas un triangle.\n\n" +
      "Conclusion : on l’utilise directement dans un triangle rectangle.",
    tags: ["pythagore_theoreme", "reconnaitre", "qcm"],
  },
  {
    kind: "fixed",
    id: "pythagore_theoreme_reconnaitre_fixed_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    text: "Dans un triangle rectangle, l’hypoténuse est…",
    format: "qcm",
    choices: ["le côté opposé à l’angle droit", "le plus petit côté", "un côté de l’angle droit", "toujours le côté horizontal"],
    expected: ["le côté opposé à l’angle droit"],
    comparator: "mcq_exact",
    hint: "Regarde le côté qui est en face de l’angle droit.",
    explanation:
      "Définition : dans un triangle rectangle, l’hypoténuse est le côté opposé à l’angle droit.\n\n" +
      "Méthode : on repère le sommet de l’angle droit, puis le côté qui ne passe pas par ce sommet.\n\n" +
      "Calcul : les deux autres côtés forment l’angle droit ; l’hypoténuse, en face, est le plus long des trois. Sa position sur la feuille (horizontale ou non) ne compte pas.\n\n" +
      "Conclusion : l’hypoténuse est le côté opposé à l’angle droit.",
    tags: ["pythagore_theoreme", "hypotenuse", "qcm"],
  },
  {
    kind: "fixed",
    id: "pythagore_theoreme_reconnaitre_fixed_3",
    niveau: "3e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    text: "Dans un triangle rectangle, comment est l’hypoténuse par rapport aux deux autres côtés ?",
    format: "qcm",
    choices: ["plus longue que chacun d’eux", "plus courte que chacun d’eux", "de la même longueur que l’un d’eux", "on ne peut pas savoir"],
    expected: ["plus longue que chacun d’eux"],
    comparator: "mcq_exact",
    hint: "Elle est en face de l’angle droit, le plus grand angle du triangle.",
    explanation:
      "Définition : l’hypoténuse est le côté opposé à l’angle droit.\n\n" +
      "Méthode : d’après le théorème de Pythagore, son carré est la somme des carrés des deux autres côtés.\n\n" +
      "Calcul : par exemple 3² + 4² = 25 = 5² : 5 est plus grand que 3 et que 4. Une somme de deux carrés positifs dépasse toujours chacun des deux.\n\n" +
      "Conclusion : l’hypoténuse est plus longue que chacun des deux autres côtés.",
    tags: ["pythagore_theoreme", "reconnaitre", "qcm"],
  },
  gabarit(
    "pythagore_theoreme_reconnaitre_tpl_3_texte",
    "pythagore_reconnaitre",
    1,
    "L’hypoténuse est le côté qui ne passe pas par le sommet de l’angle droit.",
    ["pythagore_theoreme", "reconnaitre", "hypotenuse", "template"],
    genReconnaitreTexte,
  ),
  gabarit(
    "pythagore_theoreme_reconnaitre_tpl_1",
    "pythagore_reconnaitre",
    2,
    "L’hypoténuse est toujours le côté opposé à l’angle droit.",
    ["pythagore_theoreme", "hypotenuse", "canvas", "template"],
    genReconnaitreFigure,
  ),
  gabarit(
    "pythagore_theoreme_reconnaitre_tpl_2",
    "pythagore_reconnaitre",
    2,
    "Le petit carré code l’angle droit.",
    ["pythagore_theoreme", "reconnaitre", "canvas", "template"],
    genReconnaitreFigureSommet,
  ),
  gabarit(
    "pythagore_theoreme_reconnaitre_open_1",
    "pythagore_reconnaitre",
    2,
    "Repère l’angle droit : l’hypoténuse est le côté en face. Est-elle donnée, ou cherchée ?",
    ["pythagore_theoreme", "reconnaitre", "hypotenuse", "template"],
    genHypotenuseReperee,
  ),
  gabarit(
    "pythagore_theoreme_reconnaitre_tpl_4_appliquer",
    "pythagore_reconnaitre",
    2,
    "Sans angle droit codé, pas de Pythagore.",
    ["pythagore_theoreme", "reconnaitre", "canvas", "template"],
    genPeutOnAppliquer,
  ),
  {
    kind: "fixed",
    id: "pythagore_theoreme_reconnaitre_fixed_4",
    niveau: "3e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Le théorème de Pythagore relie…",
    format: "qcm",
    choices: ["les carrés des longueurs des trois côtés", "les angles du triangle", "le périmètre et l’aire", "les diagonales"],
    expected: ["les carrés des longueurs des trois côtés"],
    comparator: "mcq_exact",
    hint: "On parle de carrés de longueurs.",
    explanation:
      "Définition : dans un triangle rectangle, hypoténuse² = côté₁² + côté₂².\n\n" +
      "Méthode : on regarde ce qui apparaît dans l’égalité.\n\n" +
      "Calcul : on y trouve les carrés des trois longueurs, et rien d’autre (ni angle, ni aire).\n\n" +
      "Conclusion : le théorème relie les carrés des longueurs des trois côtés.",
    tags: ["pythagore_theoreme", "reconnaitre", "qcm"],
  },
  {
    kind: "fixed",
    id: "pythagore_theoreme_reconnaitre_fixed_6",
    niveau: "3e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Dans un triangle rectangle, les deux côtés de l’angle droit s’appellent aussi…",
    format: "qcm",
    choices: ["les côtés adjacents à l’angle droit", "les hypoténuses", "les diagonales", "les médianes"],
    expected: ["les côtés adjacents à l’angle droit"],
    comparator: "mcq_exact",
    hint: "Ils forment l’angle droit.",
    explanation:
      "Définition : les deux côtés qui forment l’angle droit sont les côtés de l’angle droit.\n\n" +
      "Méthode : on repère les deux côtés qui se rejoignent au sommet de l’angle droit.\n\n" +
      "Calcul : ils touchent l’angle droit : on dit qu’ils lui sont adjacents. Un triangle n’a qu’une hypoténuse.\n\n" +
      "Conclusion : ce sont les côtés adjacents à l’angle droit.",
    tags: ["pythagore_theoreme", "reconnaitre", "vocabulaire", "qcm"],
  },
  gabarit(
    "pythagore_theoreme_reconnaitre_fixed_5",
    "pythagore_reconnaitre",
    3,
    "Le carré de l’hypoténuse est égal à la somme des carrés des deux autres côtés.",
    ["pythagore_theoreme", "reconnaitre", "egalite", "qcm", "template"],
    genEgaliteNommee,
  ),
  gabarit(
    "pythagore_theoreme_reconnaitre_tpl_5_operation",
    "pythagore_reconnaitre",
    3,
    "Le côté cherché est-il l’hypoténuse ? Si oui, on additionne ; sinon, on soustrait.",
    ["pythagore_theoreme", "reconnaitre", "methode", "qcm", "template"],
    genQuelleOperation,
  ),

  // =========================
  // CALCULER L’HYPOTÉNUSE
  // =========================
  {
    kind: "fixed",
    id: "pythagore_theoreme_calculer_hypotenuse_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_calculer_hypotenuse",
    difficulty: 2,
    theme: "neutral",
    text: "Un triangle rectangle a pour côtés de l’angle droit 3 cm et 4 cm. Quelle est la longueur de son hypoténuse, en cm ?",
    format: "qcm",
    choices: ["5", "7", "12", "25"],
    expected: ["5"],
    comparator: "mcq_exact",
    hint: "Pour calculer l’hypoténuse, on additionne les carrés des deux côtés de l’angle droit.",
    explanation:
      "Définition : dans un triangle rectangle, le carré de l’hypoténuse est égal à la somme des carrés des deux côtés de l’angle droit.\n\n" +
      "Méthode : on additionne les carrés, puis on prend la racine carrée.\n\n" +
      "Calcul : 3² + 4² = 9 + 16 = 25, donc l’hypoténuse vaut √25 = 5. (7 = 3 + 4 additionne les longueurs ; 25 oublie la racine.)\n\n" +
      "Conclusion : l’hypoténuse mesure 5 cm.",
    tags: ["pythagore_theoreme", "hypotenuse", "triplet"],
  },
  {
    kind: "fixed",
    id: "pythagore_theoreme_calculer_hypotenuse_fixed_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_calculer_hypotenuse",
    difficulty: 2,
    theme: "neutral",
    text: "Un triangle rectangle a des côtés de l’angle droit de 6 cm et 8 cm. Quelle est la longueur de l’hypoténuse ?",
    format: "short",
    expected: ["10 cm", "10"],
    comparator: "number_equal",
    hint: "6² + 8² = 36 + 64.",
    explanation:
      "Définition : hypoténuse² = 6² + 8².\n\n" +
      "Méthode : on additionne les carrés, puis on prend la racine carrée.\n\n" +
      "Calcul : 6² + 8² = 36 + 64 = 100, donc l’hypoténuse vaut √100 = 10.\n\n" +
      "Conclusion : l’hypoténuse mesure 10 cm.",
    tags: ["pythagore_theoreme", "hypotenuse", "short"],
  },
  gabarit(
    "pythagore_theoreme_calculer_hypotenuse_tpl_1",
    "pythagore_calculer_hypotenuse",
    2,
    "On cherche l’hypoténuse : on additionne les carrés.",
    ["pythagore_theoreme", "hypotenuse", "template", "canvas"],
    () => genHypNomme("simple"),
  ),
  gabarit(
    "pythagore_theoreme_calculer_hypotenuse_tpl_3",
    "pythagore_calculer_hypotenuse",
    2,
    "Première étape : le carré de l’hypoténuse est la somme des carrés des deux autres côtés.",
    ["pythagore_theoreme", "hypotenuse", "short", "template"],
    () => genHypCarre("simple"),
  ),
  gabarit(
    "pythagore_theoreme_calculer_hypotenuse_tpl_2",
    "pythagore_calculer_hypotenuse",
    3,
    "Repère les deux côtés de l’angle droit dans la situation, puis additionne leurs carrés.",
    ["pythagore_theoreme", "hypotenuse", "qcm", "template"],
    genHypQcmSituation,
  ),
  gabarit(
    "pythagore_theoreme_calculer_hypotenuse_open_1",
    "pythagore_calculer_hypotenuse",
    3,
    "Pour l’hypoténuse, on additionne les carrés des deux autres côtés, puis on prend la racine.",
    ["pythagore_theoreme", "hypotenuse", "redaction", "template"],
    () => genHypNomme(randomChoice(["varie", "decimal"] as SorteTriplet[])),
  ),
  gabarit(
    "pythagore_theoreme_calculer_hypotenuse_tpl_4_qcm",
    "pythagore_calculer_hypotenuse",
    3,
    "Additionner les carrés, puis prendre la racine : ni les longueurs, ni l’oubli de la racine.",
    ["pythagore_theoreme", "hypotenuse", "qcm", "template"],
    genHypExplique,
  ),
  {
    kind: "fixed",
    id: "pythagore_theoreme_calculer_hypotenuse_fixed_3_piege",
    niveau: "3e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_calculer_hypotenuse",
    difficulty: 3,
    theme: "neutral",
    text: "Pour calculer l’hypoténuse à partir des deux côtés de l’angle droit, on doit…",
    format: "qcm",
    choices: [
      "additionner les carrés puis prendre la racine carrée",
      "soustraire les carrés",
      "additionner les longueurs",
      "multiplier les longueurs",
    ],
    expected: ["additionner les carrés puis prendre la racine carrée"],
    comparator: "mcq_exact",
    hint: "L’hypoténuse est plus grande que chaque côté de l’angle droit.",
    explanation:
      "Définition : hypoténuse² = côté₁² + côté₂².\n\n" +
      "Méthode : on additionne les carrés des deux côtés de l’angle droit, puis on prend la racine carrée du résultat.\n\n" +
      "Calcul : avec 6 et 8 : 6² + 8² = 100 et √100 = 10. Additionner les longueurs donnerait 14, faux.\n\n" +
      "Conclusion : on additionne les carrés, puis on prend la racine carrée.",
    tags: ["pythagore_theoreme", "hypotenuse", "methode", "qcm"],
  },
  gabarit(
    "pythagore_theoreme_calculer_hypotenuse_tpl_5_diagonale",
    "pythagore_calculer_hypotenuse",
    4,
    "La diagonale d’un rectangle est l’hypoténuse d’un triangle rectangle.",
    ["pythagore_theoreme", "hypotenuse", "diagonale", "template"],
    genDiagonaleRectangle,
  ),
  gabarit(
    "pythagore_theoreme_calculer_hypotenuse_tpl_6_situation",
    "pythagore_calculer_hypotenuse",
    4,
    "Modélise par un triangle rectangle ; si la racine ne tombe pas juste, arrondis au dixième.",
    ["pythagore_theoreme", "hypotenuse", "probleme", "arrondi", "template"],
    () => genHypSituation(Math.random() < 0.6),
  ),
  gabarit(
    "pythagore_theoreme_calculer_hypotenuse_tpl_7_valeur_exacte",
    "pythagore_calculer_hypotenuse",
    4,
    "La valeur exacte garde le symbole √ ; la calculatrice donne ensuite un arrondi.",
    ["pythagore_theoreme", "hypotenuse", "valeur_exacte", "arrondi", "qcm", "template"],
    genHypValeurExacte,
  ),

  // =========================
  // CALCULER UN CÔTÉ DE L’ANGLE DROIT
  // =========================
  {
    kind: "fixed",
    id: "pythagore_theoreme_calculer_cote_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_calculer_cote",
    difficulty: 2,
    theme: "neutral",
    text: "Un triangle rectangle a une hypoténuse de 5 cm et un côté de l’angle droit de 3 cm. Quelle est la longueur de l’autre côté de l’angle droit, en cm ?",
    format: "qcm",
    choices: ["2", "4", "16", "34"],
    expected: ["4"],
    comparator: "mcq_exact",
    hint: "Quand on cherche un côté de l’angle droit, on soustrait les carrés.",
    explanation:
      "Définition : dans un triangle rectangle, hypoténuse² = côté₁² + côté₂², donc côté₂² = hypoténuse² − côté₁².\n\n" +
      "Méthode : on cherche un côté de l’angle droit : on soustrait les carrés, puis on prend la racine.\n\n" +
      "Calcul : 5² − 3² = 25 − 9 = 16, donc le côté vaut √16 = 4. (2 = 5 − 3 soustrait les longueurs ; 16 oublie la racine ; 34 = 25 + 9 additionne.)\n\n" +
      "Conclusion : l’autre côté de l’angle droit mesure 4 cm.",
    tags: ["pythagore_theoreme", "cote", "triplet"],
  },
  {
    kind: "fixed",
    id: "pythagore_theoreme_calculer_cote_fixed_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_calculer_cote",
    difficulty: 2,
    theme: "neutral",
    text: "Un triangle rectangle a une hypoténuse de 13 cm et un côté de l’angle droit de 5 cm. Quelle est la longueur de l’autre côté de l’angle droit ?",
    format: "short",
    expected: ["12 cm", "12"],
    comparator: "number_equal",
    hint: "13² − 5² = 169 − 25.",
    explanation:
      "Définition : côté² = hypoténuse² − autre côté².\n\n" +
      "Méthode : on soustrait les carrés, puis on prend la racine carrée.\n\n" +
      "Calcul : 13² − 5² = 169 − 25 = 144, donc le côté vaut √144 = 12.\n\n" +
      "Conclusion : l’autre côté mesure 12 cm.",
    tags: ["pythagore_theoreme", "cote", "short"],
  },
  gabarit(
    "pythagore_theoreme_calculer_cote_tpl_6_nomme",
    "pythagore_calculer_cote",
    2,
    "Repère l’hypoténuse : le côté cherché n’en est pas une, on soustrait les carrés.",
    ["pythagore_theoreme", "cote", "template", "canvas"],
    () => coteNomme("simple", false),
  ),
  gabarit(
    "pythagore_theoreme_calculer_cote_tpl_1",
    "pythagore_calculer_cote",
    3,
    "Repère d’abord l’hypoténuse, puis soustrais les carrés.",
    ["pythagore_theoreme", "cote", "template", "canvas"],
    () => coteNomme(randomChoice(["varie", "decimal"] as SorteTriplet[]), false),
  ),
  gabarit(
    "pythagore_theoreme_calculer_cote_tpl_2",
    "pythagore_calculer_cote",
    3,
    "Attention : pour un côté de l’angle droit, on ne fait pas une addition.",
    ["pythagore_theoreme", "cote", "piege", "qcm", "template"],
    genCoteQcmSituation,
  ),
  gabarit(
    "pythagore_theoreme_calculer_cote_tpl_3",
    "pythagore_calculer_cote",
    3,
    "Première étape : côté² = hypoténuse² − autre côté².",
    ["pythagore_theoreme", "cote", "short", "template"],
    genCoteCarre,
  ),
  gabarit(
    "pythagore_theoreme_calculer_cote_tpl_4_qcm",
    "pythagore_calculer_cote",
    3,
    "On soustrait les carrés, puis on prend la racine.",
    ["pythagore_theoreme", "cote", "qcm", "template"],
    genCoteExplique,
  ),
  gabarit(
    "pythagore_theoreme_calculer_cote_open_1",
    "pythagore_calculer_cote",
    4,
    "Pour un côté de l’angle droit, on soustrait les carrés ; arrondis au dixième si la racine ne tombe pas juste.",
    ["pythagore_theoreme", "cote", "redaction", "arrondi", "template"],
    () => coteNomme(randomChoice(["varie", "decimal"] as SorteTriplet[]), Math.random() < 0.6),
  ),
  gabarit(
    "pythagore_theoreme_calculer_cote_tpl_5_echelle",
    "pythagore_calculer_cote",
    4,
    "Modélise par un triangle rectangle : quelle longueur est l’hypoténuse ?",
    ["pythagore_theoreme", "cote", "probleme", "template"],
    () => genCoteSituation(Math.random() < 0.5),
  ),

  // =========================
  // RÉCIPROQUE
  // =========================
  {
    kind: "fixed",
    id: "pythagore_theoreme_reciproque_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_reciproque",
    difficulty: 2,
    theme: "neutral",
    text: "On connaît les trois longueurs d’un triangle et on veut savoir s’il est rectangle. On utilise plutôt…",
    format: "qcm",
    choices: ["la réciproque du théorème de Pythagore", "le théorème de Pythagore direct", "la formule du périmètre", "la proportionnalité"],
    expected: ["la réciproque du théorème de Pythagore"],
    comparator: "mcq_exact",
    hint: "On ne sait pas encore si le triangle est rectangle.",
    explanation:
      "Définition : la réciproque du théorème de Pythagore prouve qu’un triangle est rectangle à partir de ses trois longueurs.\n\n" +
      "Méthode : le théorème direct, lui, suppose le triangle déjà rectangle et sert à calculer une longueur.\n\n" +
      "Calcul : ici, on compare le carré du plus grand côté à la somme des carrés des deux autres.\n\n" +
      "Conclusion : on utilise la réciproque du théorème de Pythagore.",
    tags: ["pythagore_theoreme", "reciproque", "qcm"],
  },
  {
    kind: "fixed",
    id: "pythagore_theoreme_reciproque_fixed_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_reciproque",
    difficulty: 2,
    theme: "neutral",
    text: "Pour utiliser la réciproque de Pythagore, on compare…",
    format: "qcm",
    choices: [
      "le carré du plus grand côté à la somme des carrés des deux autres",
      "les trois angles",
      "les périmètres",
      "le plus grand côté à la somme des deux autres",
    ],
    expected: ["le carré du plus grand côté à la somme des carrés des deux autres"],
    comparator: "mcq_exact",
    hint: "On travaille avec des carrés de longueurs.",
    explanation:
      "Définition : la réciproque compare le carré du plus grand côté à la somme des carrés des deux autres.\n\n" +
      "Méthode : on repère le plus grand côté, puis on fait deux calculs séparés.\n\n" +
      "Calcul : par exemple pour 6, 8 et 10 : 10² = 100 et 6² + 8² = 36 + 64 = 100. Comparer 10 à 6 + 8 = 14 ne prouve rien.\n\n" +
      "Conclusion : on compare le carré du plus grand côté à la somme des carrés des deux autres.",
    tags: ["pythagore_theoreme", "reciproque", "qcm"],
  },
  gabarit(
    "pythagore_theoreme_reciproque_tpl_4_egalite",
    "pythagore_reciproque",
    2,
    "Calcule séparément les deux membres, puis compare.",
    ["pythagore_theoreme", "reciproque", "egalite", "template"],
    genEgaliteVraie,
  ),
  gabarit(
    "pythagore_theoreme_reciproque_tpl_1",
    "pythagore_reciproque",
    3,
    "Repère le plus grand côté, puis compare son carré à la somme des carrés des deux autres.",
    ["pythagore_theoreme", "reciproque", "canvas", "template"],
    genEstRectangleFigure,
  ),
  gabarit(
    "pythagore_theoreme_reciproque_tpl_3",
    "pythagore_reciproque",
    3,
    "L’angle à contrôler est en face de la plus grande longueur.",
    ["pythagore_theoreme", "reciproque", "probleme", "template"],
    genEstRectangleSituation,
  ),
  gabarit(
    "pythagore_theoreme_reciproque_tpl_6_plus_grand",
    "pythagore_reciproque",
    3,
    "Le seul côté qui peut être l’hypoténuse est le plus grand.",
    ["pythagore_theoreme", "reciproque", "template"],
    genPlusGrandCote,
  ),
  {
    kind: "fixed",
    id: "pythagore_theoreme_reciproque_fixed_3",
    niveau: "3e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_reciproque",
    difficulty: 3,
    theme: "neutral",
    text: "Un triangle a pour côtés 9 cm, 12 cm et 15 cm. Est-il rectangle ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Compare 9² + 12² et 15².",
    explanation:
      "Définition : on applique la réciproque du théorème de Pythagore.\n\n" +
      "Méthode : le plus grand côté mesure 15 cm ; on compare 15² et 9² + 12².\n\n" +
      "Calcul : d’une part 15² = 225 ; d’autre part 9² + 12² = 81 + 144 = 225.\n\n" +
      "Conclusion : les deux résultats sont égaux : d’après la réciproque du théorème de Pythagore, le triangle est rectangle.",
    tags: ["pythagore_theoreme", "reciproque", "qcm"],
  },
  {
    kind: "fixed",
    id: "pythagore_theoreme_reciproque_fixed_4_nonrectangle",
    niveau: "3e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_reciproque",
    difficulty: 3,
    theme: "neutral",
    text: "Un triangle a pour côtés 4 cm, 5 cm et 6 cm. Est-il rectangle ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Compare 4² + 5² et 6².",
    explanation:
      "Définition : on applique la réciproque du théorème de Pythagore.\n\n" +
      "Méthode : le plus grand côté mesure 6 cm ; on compare 6² et 4² + 5².\n\n" +
      "Calcul : d’une part 6² = 36 ; d’autre part 4² + 5² = 16 + 25 = 41.\n\n" +
      "Conclusion : 36 ≠ 41 : si le triangle était rectangle, ces deux nombres seraient égaux. Il n’est pas rectangle.",
    tags: ["pythagore_theoreme", "reciproque", "qcm"],
  },
  gabarit(
    "pythagore_theoreme_reciproque_tpl_2",
    "pythagore_reciproque",
    4,
    "L’angle droit est situé en face du plus grand côté.",
    ["pythagore_theoreme", "reciproque", "canvas", "template"],
    genSommetFigure,
  ),
  gabarit(
    "pythagore_theoreme_reciproque_open_1",
    "pythagore_reciproque",
    4,
    "Repère d’abord le plus grand côté : il n’entre pas dans la somme.",
    ["pythagore_theoreme", "reciproque", "redaction", "template"],
    genSommetOuNon,
  ),
  {
    kind: "fixed",
    id: "pythagore_theoreme_reciproque_fixed_5_angle_droit",
    niveau: "3e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_reciproque",
    difficulty: 4,
    theme: "neutral",
    text: "Le triangle ABC a pour côtés AB = 6 cm, AC = 8 cm et BC = 10 cm. Il est rectangle. En quel sommet se trouve l’angle droit ?",
    format: "qcm",
    choices: ["en A", "en B", "en C", "il n’y a pas d’angle droit"],
    expected: ["en A"],
    comparator: "mcq_exact",
    hint: "L’angle droit est opposé au plus grand côté (l’hypoténuse).",
    explanation:
      "Définition : l’hypoténuse est le plus grand côté ; l’angle droit est au sommet opposé.\n\n" +
      "Méthode : le plus grand côté est [BC] ; on vérifie BC² = AB² + AC².\n\n" +
      "Calcul : BC² = 100 et AB² + AC² = 36 + 64 = 100. Le sommet que [BC] ne touche pas est A.\n\n" +
      "Conclusion : le triangle ABC est rectangle en A.",
    tags: ["pythagore_theoreme", "reciproque", "angle_droit", "qcm"],
  },
  gabarit(
    "pythagore_theoreme_reciproque_tpl_5_unites",
    "pythagore_reciproque",
    4,
    "Convertis toutes les longueurs dans la même unité avant de chercher le plus grand côté.",
    ["pythagore_theoreme", "reciproque", "unites", "brevet", "template"],
    genReciproqueUnites,
  ),

  // =========================
  // RÉDIGER
  // =========================
  {
    kind: "fixed",
    id: "pythagore_theoreme_rediger_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_rediger",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle phrase convient pour commencer une rédaction avec le théorème de Pythagore direct ?",
    format: "qcm",
    choices: [
      "Dans le triangle ABC rectangle en A, d’après le théorème de Pythagore…",
      "On sait que ABC a trois côtés, donc d’après Pythagore…",
      "Comme les côtés sont parallèles…",
      "On additionne les longueurs.",
    ],
    expected: ["Dans le triangle ABC rectangle en A, d’après le théorème de Pythagore…"],
    comparator: "mcq_exact",
    hint: "Le théorème direct commence par un triangle déjà rectangle.",
    explanation:
      "Définition : le théorème de Pythagore s’applique à un triangle dont on SAIT qu’il est rectangle.\n\n" +
      "Méthode : la première phrase nomme le triangle, dit où est l’angle droit, puis cite le théorème.\n\n" +
      "Calcul : « Dans le triangle ABC rectangle en A » donne les deux informations ; « trois côtés » ne dit rien de l’angle droit, et les parallèles relèvent de Thalès.\n\n" +
      "Conclusion : on commence par « Dans le triangle ABC rectangle en A, d’après le théorème de Pythagore… ».",
    tags: ["pythagore_theoreme", "redaction", "qcm"],
  },
  {
    kind: "fixed",
    id: "pythagore_theoreme_rediger_fixed_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_rediger",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle phrase convient pour utiliser la réciproque du théorème de Pythagore ?",
    format: "qcm",
    choices: [
      "On compare la somme des carrés des deux plus petits côtés avec le carré du plus grand côté.",
      "On suppose que le triangle est rectangle.",
      "On additionne les trois côtés.",
      "On calcule seulement le périmètre.",
    ],
    expected: ["On compare la somme des carrés des deux plus petits côtés avec le carré du plus grand côté."],
    comparator: "mcq_exact",
    hint: "La réciproque sert à vérifier si le triangle est rectangle.",
    explanation:
      "Définition : la réciproque prouve qu’un triangle est rectangle ; on ne le suppose donc pas au départ.\n\n" +
      "Méthode : on calcule séparément le carré du plus grand côté et la somme des carrés des deux autres.\n\n" +
      "Calcul : si les deux résultats sont égaux, le triangle est rectangle ; sinon, il ne l’est pas.\n\n" +
      "Conclusion : on compare la somme des carrés des deux plus petits côtés avec le carré du plus grand côté.",
    tags: ["pythagore_theoreme", "redaction", "reciproque"],
  },
  {
    kind: "fixed",
    id: "pythagore_theoreme_rediger_fixed_3",
    niveau: "3e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_rediger",
    difficulty: 3,
    theme: "neutral",
    text: "Dans une rédaction avec Pythagore direct, quelle est la première chose à écrire ?",
    format: "qcm",
    choices: ["que le triangle est rectangle et où", "le résultat final", "le périmètre", "la liste des angles"],
    expected: ["que le triangle est rectangle et où"],
    comparator: "mcq_exact",
    hint: "Pythagore direct suppose le triangle déjà rectangle.",
    explanation:
      "Définition : le théorème direct s’applique à un triangle dont on sait qu’il est rectangle.\n\n" +
      "Méthode : on commence par préciser que le triangle est rectangle et en quel sommet.\n\n" +
      "Calcul : ensuite seulement, on écrit l’égalité de Pythagore, on calcule, puis on conclut.\n\n" +
      "Conclusion : on indique d’abord que le triangle est rectangle et où.",
    tags: ["pythagore_theoreme", "rediger", "qcm"],
  },
  {
    kind: "fixed",
    id: "pythagore_theoreme_rediger_fixed_4_ordre",
    niveau: "3e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_rediger",
    difficulty: 3,
    theme: "neutral",
    text: "Quel est le bon ordre pour rédiger un calcul de longueur avec Pythagore ?",
    format: "qcm",
    choices: [
      "phrase de départ → égalité de Pythagore → calcul → conclusion",
      "calcul → conclusion → phrase de départ",
      "conclusion → calcul → égalité",
      "égalité → conclusion → phrase de départ",
    ],
    expected: ["phrase de départ → égalité de Pythagore → calcul → conclusion"],
    comparator: "mcq_exact",
    hint: "On part de l’hypothèse, on applique le théorème, on calcule, on conclut.",
    explanation:
      "Définition : une démonstration va de ce qu’on sait vers ce qu’on cherche.\n\n" +
      "Méthode : on annonce le triangle rectangle, on écrit l’égalité, on calcule, on conclut.\n\n" +
      "Calcul : par exemple « ABC est rectangle en A, donc d’après le théorème de Pythagore BC² = AB² + AC² = 6² + 8² = 100, donc BC = 10 cm ».\n\n" +
      "Conclusion : phrase de départ → égalité de Pythagore → calcul → conclusion.",
    tags: ["pythagore_theoreme", "rediger", "ordre", "qcm"],
  },
  gabarit(
    "pythagore_theoreme_rediger_tpl_1",
    "pythagore_rediger",
    3,
    "Théorème pour calculer, réciproque pour prouver l’angle droit ; l’hypoténuse seule dans un membre.",
    ["pythagore_theoreme", "rediger", "qcm", "template"],
    genPhraseRedaction,
  ),
  gabarit(
    "pythagore_theoreme_rediger_tpl_3_egalite",
    "pythagore_rediger",
    3,
    "On additionne les carrés pour l’hypoténuse, on les soustrait pour un côté de l’angle droit.",
    ["pythagore_theoreme", "rediger", "egalite", "qcm", "template"],
    genEgaliteCalcul,
  ),
  {
    kind: "fixed",
    id: "pythagore_theoreme_rediger_open_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_rediger",
    difficulty: 4,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric) — garde l’idée : le théorème calcule, la réciproque prouve.
    text: "Le triangle ABC est rectangle en A. AB = 6 cm et AC = 8 cm. On cherche BC.\nQue faut-il utiliser ?",
    format: "qcm",
    choices: ["le théorème de Pythagore", "la réciproque de Pythagore", "le théorème de Thalès"],
    expected: ["le théorème de Pythagore"],
    comparator: "mcq_exact",
    hint: "On sait déjà que le triangle est rectangle, et on cherche une longueur.",
    explanation:
      "Définition : le théorème de Pythagore calcule une longueur dans un triangle rectangle. La réciproque prouve qu’un triangle est rectangle.\n\n" +
      "Méthode : ici, on sait déjà que ABC est rectangle en A, et on cherche BC.\n\n" +
      "Calcul : BC² = 6² + 8² = 36 + 64 = 100, donc BC = 10 cm.\n\n" +
      "Conclusion : on utilise le théorème de Pythagore. Il n’y a pas de droites parallèles, donc pas de Thalès.",
    tags: ["pythagore_theoreme", "redaction", "qcm"],
  },
  {
    kind: "fixed",
    id: "pythagore_theoreme_rediger_fixed_5_reciproque_phrase",
    niveau: "3e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_rediger",
    difficulty: 4,
    theme: "neutral",
    text: "Pour conclure avec la réciproque, quelle phrase convient ?",
    format: "qcm",
    choices: [
      "« les carrés sont égaux, donc d’après la réciproque de Pythagore, le triangle est rectangle »",
      "« le triangle est rectangle, donc je calcule l’hypoténuse »",
      "« les côtés sont parallèles »",
      "« le périmètre est égal à l’aire »",
    ],
    expected: ["« les carrés sont égaux, donc d’après la réciproque de Pythagore, le triangle est rectangle »"],
    comparator: "mcq_exact",
    hint: "On conclut sur la nature du triangle, pas sur une longueur.",
    explanation:
      "Définition : la réciproque permet de conclure qu’un triangle est rectangle.\n\n" +
      "Méthode : après avoir comparé les deux résultats, on conclut sur la nature du triangle, en citant la réciproque.\n\n" +
      "Calcul : par exemple 10² = 100 et 6² + 8² = 100 : les deux résultats sont égaux.\n\n" +
      "Conclusion : on écrit « les carrés sont égaux, donc d’après la réciproque de Pythagore, le triangle est rectangle ».",
    tags: ["pythagore_theoreme", "rediger", "reciproque", "qcm"],
  },
  {
    kind: "fixed",
    id: "pythagore_theoreme_rediger_fixed_6_erreur",
    niveau: "3e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_rediger",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève écrit directement « d’après Pythagore, BC² = AB² + AC² » sans préciser que le triangle ABC est rectangle en A. Sa rédaction est-elle complète ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Le théorème direct exige de dire que le triangle est rectangle.",
    explanation:
      "Définition : le théorème direct s’applique seulement à un triangle rectangle.\n\n" +
      "Méthode : on doit préciser que le triangle est rectangle et en quel sommet.\n\n" +
      "Calcul : sans « ABC rectangle en A », l’égalité BC² = AB² + AC² n’est pas justifiée.\n\n" +
      "Conclusion : non, la rédaction n’est pas complète.",
    tags: ["pythagore_theoreme", "rediger", "erreur", "qcm"],
  },
  gabarit(
    "pythagore_theoreme_rediger_tpl_2_erreur",
    "pythagore_rediger",
    4,
    "Trois choses à vérifier : le triangle nommé, l’angle droit précisé, et l’hypoténuse seule dans un membre.",
    ["pythagore_theoreme", "rediger", "erreur", "qcm", "template"],
    genErreurRedaction,
  ),
  gabarit(
    "pythagore_theoreme_rediger_tpl_4_complet",
    "pythagore_rediger",
    4,
    "Théorème (pas réciproque), bonne opération, et la racine carrée à la fin.",
    ["pythagore_theoreme", "rediger", "brevet", "qcm", "template"],
    genRedigeComplet,
  ),
  gabarit(
    "pythagore_theoreme_rediger_tpl_5_conclure",
    "pythagore_rediger",
    4,
    "Égalité vraie : « d’après la réciproque » ; égalité fausse : « s’il l’était, ces nombres seraient égaux ».",
    ["pythagore_theoreme", "rediger", "reciproque", "qcm", "template"],
    genConclureReciproque,
  ),

  // =========================
  // DÉFIS
  // =========================
  {
    kind: "fixed",
    id: "pythagore_theoreme_defi_fixed_3_choix",
    niveau: "3e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_defi",
    difficulty: 4,
    theme: "neutral",
    text: "On connaît les trois longueurs d’un triangle et on veut savoir s’il est rectangle. On utilise…",
    format: "qcm",
    choices: ["la réciproque du théorème de Pythagore", "le théorème de Pythagore direct", "la trigonométrie", "la proportionnalité"],
    expected: ["la réciproque du théorème de Pythagore"],
    comparator: "mcq_exact",
    hint: "On veut prouver un angle droit à partir des longueurs.",
    explanation:
      "Définition : la réciproque sert à prouver qu’un triangle est rectangle ; le théorème direct et la trigonométrie supposent l’angle droit déjà connu.\n\n" +
      "Méthode : on compare le carré du plus grand côté à la somme des carrés des deux autres.\n\n" +
      "Calcul : par exemple 13² = 169 et 5² + 12² = 25 + 144 = 169 : le triangle 5-12-13 est rectangle.\n\n" +
      "Conclusion : on utilise la réciproque.",
    tags: ["pythagore_theoreme", "defi", "choix", "qcm"],
  },
  gabarit(
    "pythagore_theoreme_defi_tpl_7_aire",
    "pythagore_defi",
    4,
    "Il manque un côté de l’angle droit : calcule-le d’abord avec Pythagore.",
    ["pythagore_theoreme", "defi", "deux_etapes", "aire", "template"],
    genAireApresPythagore,
  ),
  gabarit(
    "pythagore_theoreme_defi_tpl_1",
    "pythagore_defi",
    5,
    "Modélise la situation par un triangle rectangle : le trajet en ligne droite est l’hypoténuse.",
    ["pythagore_theoreme", "defi", "probleme"],
    genDenivele,
  ),
  gabarit(
    "pythagore_theoreme_defi_tpl_2",
    "pythagore_defi",
    5,
    "Teste chaque triangle séparément avec la réciproque.",
    ["pythagore_theoreme", "defi", "reciproque", "template"],
    genLequelRectangle,
  ),
  gabarit(
    "pythagore_theoreme_defi_open_1",
    "pythagore_defi",
    5,
    "Le côté commun aux deux triangles se calcule d’abord, dans le premier triangle.",
    ["pythagore_theoreme", "defi", "brevet", "deux_etapes", "template"],
    genBrevetDeuxTriangles,
  ),
  gabarit(
    "pythagore_theoreme_defi_tpl_3_diagonale_carre",
    "pythagore_defi",
    5,
    "Trouve d’abord la longueur manquante avec Pythagore, puis termine le problème.",
    ["pythagore_theoreme", "defi", "probleme", "deux_etapes", "template"],
    genProblemeDeuxEtapes,
  ),
  gabarit(
    "pythagore_theoreme_defi_tpl_4_choix_methode",
    "pythagore_defi",
    5,
    "Que sait-on déjà (l’angle droit ?) et que cherche-t-on (une longueur ? un angle droit ?)",
    ["pythagore_theoreme", "defi", "choix_methode", "qcm", "template"],
    genDefiExplique,
  ),
  gabarit(
    "pythagore_theoreme_defi_tpl_5_ecran",
    "pythagore_defi",
    5,
    "Deux trajets perpendiculaires : la distance directe est l’hypoténuse.",
    ["pythagore_theoreme", "defi", "probleme", "template"],
    genDeplacement,
  ),
  gabarit(
    "pythagore_theoreme_defi_tpl_6_isocele",
    "pythagore_defi",
    5,
    "La hauteur d’un triangle isocèle coupe la base en son milieu, à angle droit.",
    ["pythagore_theoreme", "defi", "brevet", "isocele", "template"],
    genIsoceleHauteur,
  ),
  {
    kind: "fixed",
    id: "pythagore_theoreme_defi_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Une porte rectangulaire mesure 2 m de haut et 1,5 m de large. Quelle est la longueur de sa diagonale ?",
    format: "short",
    expected: ["2,5 m", "2,5", "2.5"],
    comparator: "number_equal",
    hint: "2² + 1,5² = 4 + 2,25.",
    explanation:
      "Définition : la diagonale est l’hypoténuse d’un triangle rectangle dont les côtés de l’angle droit sont la hauteur et la largeur.\n\n" +
      "Méthode : on applique le théorème de Pythagore.\n\n" +
      "Calcul : d² = 2² + 1,5² = 4 + 2,25 = 6,25, donc d = √6,25 = 2,5.\n\n" +
      "Conclusion : la diagonale mesure 2,5 m.",
    tags: ["pythagore_theoreme", "defi", "diagonale", "short"],
  },
  {
    kind: "fixed",
    id: "pythagore_theoreme_defi_fixed_2_brevet",
    niveau: "3e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Un mât vertical est maintenu par un câble de 13 m fixé au sol à 5 m du pied du mât. À quelle hauteur le câble est-il attaché sur le mât ?",
    format: "short",
    expected: ["12 m", "12"],
    comparator: "number_equal",
    hint: "Le câble est l’hypoténuse : 13² − 5².",
    explanation:
      "Définition : le mât, le sol et le câble forment un triangle rectangle ; le câble est l’hypoténuse.\n\n" +
      "Méthode : la hauteur est un côté de l’angle droit : hauteur² = 13² − 5².\n\n" +
      "Calcul : 169 − 25 = 144, donc la hauteur vaut √144 = 12.\n\n" +
      "Conclusion : le câble est attaché à 12 m de hauteur.",
    tags: ["pythagore_theoreme", "defi", "brevet", "short"],
  },
  {
    kind: "fixed",
    id: "pythagore_theoreme_defi_fixed_4_brevet",
    niveau: "3e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Un triangle a pour côtés 9 cm, 40 cm et 41 cm. Est-il rectangle ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Compare 9² + 40² et 41².",
    explanation:
      "Définition : on applique la réciproque du théorème de Pythagore.\n\n" +
      "Méthode : le plus grand côté mesure 41 cm ; on compare 41² et 9² + 40².\n\n" +
      "Calcul : d’une part 41² = 1 681 ; d’autre part 9² + 40² = 81 + 1 600 = 1 681.\n\n" +
      "Conclusion : les deux résultats sont égaux : d’après la réciproque du théorème de Pythagore, le triangle est rectangle.",
    tags: ["pythagore_theoreme", "defi", "brevet", "qcm"],
  },
];
