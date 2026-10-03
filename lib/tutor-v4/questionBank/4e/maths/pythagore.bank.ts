// lib/tutor-v4/question-banks/maths/4e/pythagore.bank.ts
// lib/tutor-v4/question-banks/maths/4e/pythagore.bank.ts
//
// Banque de questions Tutor V4 - Mathématiques 4e
// Notion : Pythagore et sa réciproque
//
// Objectifs pédagogiques :
// - réactiver les carrés et racines carrées utiles à Pythagore ;
// - reconnaître un triangle rectangle et identifier l’hypoténuse ;
// - calculer une hypoténuse avec le théorème de Pythagore ;
// - calculer un côté de l’angle droit ;
// - vérifier une égalité de Pythagore avec trois longueurs ;
// - utiliser la réciproque pour conclure qu’un triangle est rectangle ou non ;
// - travailler la rédaction et la justification mathématique.
//
// Organisation de la bank :
// - questions fixed : QCM ciblés pour stabiliser les notions essentielles ;
// - questions template : génération aléatoire de calculs variés ;
// - questions open : rédaction courte, justification, raisonnement.
//
// Choix pédagogiques :
// - utilisation de triplets pythagoriciens pour obtenir des longueurs exactes ;
// - figures triangulaires variées via TriangleCanvasData ;
// - codage de l’angle droit seulement quand il est mathématiquement donné ;
// - distinction explicite entre théorème direct et réciproque.

import type {
  TutorBankItemV4,
  TutorGeneratedQuestionV4,
  TriangleCanvasData,
} from "@/lib/tutor-v4/types";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

// ⭐ « LES CARRÉS PARFAITS DE 1 À 144 » EST UNE CONNAISSANCE DU BO (cycle 4,
// p. 130) : ce sont les carrés de 1 à 12, et LE 1 EN FAIT PARTIE. Il manquait
// ici — la table commençait à 2² — jusqu'au 27/08/2026. Ce n'est pas un détail
// de complétude : 1² = 1 et √1 = 1 sont un point d'achoppement réel (beaucoup
// d'élèves cherchent un nombre « plus petit »), et c'est le seul carré parfait
// qu'aucun autre item du dépôt ne fait rencontrer.
//
// ⚠️ Au-delà de 144, la table ne sert plus la connaissance mais le THÉORÈME :
// 13² = 169 est indispensable au triplet 5-12-13, et 14² et 15² accompagnent
// les longueurs des figures. On les garde pour cette raison-là, pas au titre
// des carrés parfaits du programme.
const knownSquares = [
  { n: 1, square: 1 },
  { n: 2, square: 4 },
  { n: 3, square: 9 },
  { n: 4, square: 16 },
  { n: 5, square: 25 },
  { n: 6, square: 36 },
  { n: 7, square: 49 },
  { n: 8, square: 64 },
  { n: 9, square: 81 },
  { n: 10, square: 100 },
  { n: 11, square: 121 },
  { n: 12, square: 144 },
  { n: 13, square: 169 },
  { n: 14, square: 196 },
  { n: 15, square: 225 },
];

// Les triplets pythagoriciens sont plus bas (TRIPLETS), avec les générateurs.
const falseTriples = [
  { a: 4, b: 5, c: 6 },
  { a: 6, b: 7, c: 9 },
  { a: 8, b: 9, c: 12 },
  { a: 5, b: 6, c: 8 },
  { a: 9, b: 10, c: 14 },
  { a: 10, b: 11, c: 15 },
];

type TriangleName = {
  A: string;
  B: string;
  C: string;
};

// ⚠️ 03/10/2026 : les anciens dessins à points FIXES (rightTriangleFigure,
// nonRightTriangleFigure) et les cinq noms de triangles ont été remplacés par
// `tirerTriangle()` (vingt noms, angle droit sur n'importe quel sommet) et
// `figureALEchelle()` (la figure suit les longueurs de l'énoncé). L'ancien
// dessin « non rectangle » mettait parfois le plus grand nombre sur le plus
// petit côté.


/* =========================================================================
   ⛔⛔ 03/10/2026 — « DES QUESTIONS REVIENNENT ». Mesuré avant : 5 à 18
   squelettes d'énoncé par micro, 9 à 19 répétitions sur une série de 20 à la
   même étoile. L'hypoténuse n'avait que 7 phrases, dont « 3 cm et 4 cm » qui
   revenait. Les gabarits composent désormais :
     · un TRIANGLE NOMMÉ (vingt noms, l'angle droit sur n'importe quel
       sommet), et sa figure dessinée À L'ÉCHELLE des longueurs de l'énoncé ;
     · une SITUATION réelle (échelle, rampe, toit, écran, voile, cerf-volant,
       terrain de foot, porte, piscine, jardin, randonnée, hauban, drone,
       étagère, toboggan, portail, boîte) ;
     · une TOURNURE (3 à 6 façons de poser la même question) ;
     · des TRIPLETS variés (3-4-5 n'est plus qu'un parmi vingt-deux, avec des
       versions décimales) et, pour une partie des tirages, une longueur à
       ARRONDIR AU DIXIÈME.
   Réciproque : la rédaction de la fiche d'exercices de 4e (« D'une part…
   D'autre part… », « d'après la réciproque du théorème de Pythagore » ; si
   l'égalité est fausse : « s'il était rectangle, ces deux nombres seraient
   égaux »), sans le mot « contraposée ».
   Mesure : npx --yes tsx@4 scripts/mesurer-squelettes-coach.ts 4e pythagore_theoreme
========================================================================= */

type Q = TutorGeneratedQuestionV4;

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
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
/** La racine est-elle « tombée juste » au dixième près ? */
const racineExacte = (s: number) => {
  const r = Math.sqrt(s);
  return Math.abs(r * 10 - Math.round(r * 10)) < 1e-7;
};

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
    const [a, b, c] = randomChoice(TRIPLETS.slice(0, 10));
    const k = randomChoice([0.1, 0.2, 0.5]);
    const t = [a, b, c].map((x) => Math.round(x * k * 10) / 10);
    return randomChoice([true, false]) ? [t[0], t[1], t[2]] : [t[1], t[0], t[2]];
  }
  const [a, b, c] = randomChoice(sorte === "simple" ? TRIPLETS.slice(0, 10) : TRIPLETS);
  return randomChoice([true, false]) ? [a, b, c] : [b, a, c];
}
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
const NOMS_TRIANGLES = [
  "ABC", "RST", "KLM", "EFG", "MNP", "IJK", "DEF", "UVW", "PQR", "XYZ",
  "GHI", "BCD", "LMN", "STU", "HIJ", "FGH", "TUV", "JKL", "CDE", "QRS",
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

/**
 * La figure À L'ÉCHELLE : AB est posé en bas, C au-dessus. Les longueurs
 * dessinées sont celles de l'énoncé — un élève qui mesure à la règle retrouve
 * les proportions, et la réciproque « presque rectangle » a l'air rectangle,
 * comme dans la vraie vie.
 */
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

/** Les trois côtés d'un triangle nommé, dans un ordre au hasard : « KL = 5 cm, LM = 12 cm et KM = 13 cm ». */
function listeCotes(t: TriangleNomme, a: number, b: number, c: number, u: string): string {
  const l = shuffle([
    `${t.c1} = ${fr(a)} ${u}`,
    `${t.c2} = ${fr(b)} ${u}`,
    `${t.hyp} = ${fr(c)} ${u}`,
  ]);
  return `${l[0]}, ${l[1]} et ${l[2]}`;
}

/** La rédaction de la réciproque, celle de la fiche (le plus grand côté est t.hyp). */
/** Les deux calculs séparés : « D'une part… D'autre part… ». */
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
const uniteDe = (...xs: number[]) =>
  randomChoice(xs.some((x) => !Number.isInteger(x)) ? ["cm", "cm", "dm", "m"] : UNITES);
const SUFFIXES_ARRONDI = [" Donne l’arrondi au dixième.", " Arrondis au dixième.", " Arrondis le résultat au dixième."];

// ---------- Les situations réelles ----------
// a et b : côtés de l'angle droit ; c : l'hypoténuse. `cote` demande b, a connu.
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
];

/** Un problème concret : demande l'hypoténuse (avec arrondi au dixième pour une partie des tirages). */
function situationHypotenuse(arrondir: boolean) {
  const s = randomChoice(SITUATIONS);
  let [a, b] = randomChoice(s.triplets);
  const pas = s.triplets.some((t) => t.some((x) => !Number.isInteger(x))) ? 0.1 : 1;
  if (arrondir) {
    if (randomChoice([true, false])) a = Math.round((a + pas) * 10) / 10;
    else b = Math.round((b + pas) * 10) / 10;
  }
  const S = sq(a) + sq(b);
  const exact = racineExacte(S);
  const c = exact ? Math.round(Math.sqrt(S) * 10) / 10 : arrondi1(Math.sqrt(S));
  const L = (x: number) => `${fr(x)} ${s.unite}`;
  const text = randomChoice(s.hyp)(L(a), L(b)) + (exact ? "" : randomChoice(SUFFIXES_ARRONDI));
  const explanation =
    `Définition : on modélise par un triangle rectangle : ${s.noms.a} et ${s.noms.b} sont les côtés de l’angle droit, ${s.noms.c} est l’hypoténuse.\n\n` +
    "Méthode : d’après le théorème de Pythagore, le carré de l’hypoténuse est la somme des carrés des côtés de l’angle droit.\n\n" +
    `Calcul : en notant c la longueur cherchée, c² = ${fr(a)}² + ${fr(b)}² = ${fr(sq(a))} + ${fr(sq(b))} = ${fr(S)}, donc c = √${fr(S)} ${exact ? "=" : "≈"} ${fr(c)}${exact ? "" : " (arrondi au dixième)"}.\n\n` +
    `Conclusion : ${s.noms.c} mesure ${exact ? "" : "environ "}${L(c)}.`;
  return { s, a, b, c, S, exact, pas, L, text, explanation };
}

/** Un problème concret : demande un côté de l'angle droit. */
function situationCote(arrondir: boolean) {
  const s = randomChoice(SITUATIONS);
  let [a, b, c] = randomChoice(s.triplets);
  const pas = s.triplets.some((t) => t.some((x) => !Number.isInteger(x))) ? 0.1 : 1;
  if (arrondir) c = Math.round((c + pas) * 10) / 10;
  const D = Math.round((sq(c) - sq(a)) * 10000) / 10000;
  const exact = racineExacte(D);
  b = exact ? Math.round(Math.sqrt(D) * 10) / 10 : arrondi1(Math.sqrt(D));
  const L = (x: number) => `${fr(x)} ${s.unite}`;
  const text = randomChoice(s.cote)(L(c), L(a)) + (exact ? "" : randomChoice(SUFFIXES_ARRONDI));
  const explanation =
    `Définition : on modélise par un triangle rectangle : ${s.noms.c} est l’hypoténuse ; ${s.noms.a} et ${s.noms.b} sont les côtés de l’angle droit.\n\n` +
    "Méthode : on cherche un côté de l’angle droit, donc on SOUSTRAIT : son carré est le carré de l’hypoténuse moins le carré de l’autre côté.\n\n" +
    `Calcul : en notant b la longueur cherchée, b² = ${fr(c)}² - ${fr(a)}² = ${fr(sq(c))} - ${fr(sq(a))} = ${fr(D)}, donc b = √${fr(D)} ${exact ? "=" : "≈"} ${fr(b)}${exact ? "" : " (arrondi au dixième)"}.\n\n` +
    `Conclusion : ${s.noms.b} mesure ${exact ? "" : "environ "}${L(b)}.`;
  return { s, a, b, c, D, exact, pas, L, text, explanation };
}

/* =========================================================================
   CARRÉS ET RACINES
========================================================================= */

// Contextes du carré : `max` borne n pour rester plausible (un tapis de 15 m…).
const CTX_CARRE: { min: number; max: number; t: (n: number, u: string) => string }[] = [
  { min: 1, max: 15, t: (n, u) => `Un carré mesure ${n} ${u} de côté. Quelle est son aire, en ${u}² ?` },
  { min: 1, max: 15, t: (n, u) => `Quelle est l’aire d’un carré de ${n} ${u} de côté ?` },
  { min: 1, max: 15, t: (n, u) => `Calcule l’aire, en ${u}², d’un carré dont le côté mesure ${n} ${u}.` },
  { min: 1, max: 15, t: (n, u) => `Un carré a des côtés de ${n} ${u}. Combien de ${u}² couvre-t-il ?` },
  { min: 2, max: 15, t: (n) => `Un carreau carré mesure ${n} cm de côté. Quelle est son aire, en cm² ?` },
  { min: 2, max: 12, t: (n) => `Un potager carré a des côtés de ${n} m. Quelle est son aire, en m² ?` },
  { min: 2, max: 15, t: (n) => `Dans une salle, on range les chaises en ${n} rangées de ${n} chaises. Combien y a-t-il de chaises ?` },
  { min: 3, max: 15, t: (n) => `Un damier compte ${n} cases sur chaque côté. Combien a-t-il de cases en tout ?` },
  { min: 2, max: 6, t: (n) => `Une boîte contient ${n} rangées de ${n} chocolats. Combien y a-t-il de chocolats ?` },
  { min: 3, max: 12, t: (n) => `Une fanfare défile en carré : ${n} rangs de ${n} musiciens. Combien de musiciens défilent ?` },
  { min: 2, max: 6, t: (n) => `Une dalle carrée de terrasse mesure ${n} dm de côté. Quelle est son aire, en dm² ?` },
  { min: 1, max: 4, t: (n) => `Un tapis carré mesure ${n} m de côté. Quelle surface couvre-t-il, en m² ?` },
];
// ⚠️ « Combien vaut n² ? » et « Combien vaut √N ? » sont les phrases des items
// figés de la même étoile : les gabarits ne les reprennent pas.
const PUR_CARRE = [
  (n: number) => `Calcule ${n}².`,
  (n: number) => `Que vaut ${n} au carré ?`,
  (n: number) => `Quel est le carré de ${n} ?`,
  (n: number) => `Donne la valeur de ${n} × ${n}.`,
  (n: number) => `Élève ${n} au carré.`,
  (n: number) => `Écris ${n}² sans exposant : quel nombre obtiens-tu ?`,
];
const CTX_RACINE: { min: number; max: number; t: (S: number, u: string) => string }[] = [
  { min: 1, max: 15, t: (S, u) => `Un carré a une aire de ${S} ${u}². Combien mesure son côté, en ${u} ?` },
  { min: 1, max: 15, t: (S, u) => `Quelle est la longueur du côté d’un carré d’aire ${S} ${u}² ?` },
  { min: 1, max: 15, t: (S, u) => `L’aire d’un carré est de ${S} ${u}². Calcule la longueur de son côté.` },
  { min: 1, max: 15, t: (S, u) => `Un carré couvre ${S} ${u}². Combien mesurent ses côtés, en ${u} ?` },
  { min: 3, max: 15, t: (S) => `Une pelouse carrée a une aire de ${S} m². Quelle est la longueur de chacun de ses côtés, en m ?` },
  { min: 2, max: 15, t: (S) => `${S} chaises sont rangées en carré : autant de rangées que de chaises par rangée. Combien y a-t-il de chaises par rangée ?` },
  { min: 2, max: 15, t: (S) => `Un carrelage carré compte ${S} carreaux identiques. Combien y a-t-il de carreaux le long d’un côté ?` },
  { min: 3, max: 15, t: (S) => `Une mosaïque carrée est faite de ${S} petites tuiles carrées. Combien de tuiles compte une ligne de la mosaïque ?` },
  { min: 2, max: 15, t: (S) => `Une photo carrée a une aire de ${S} cm². Quelle est la longueur de son côté, en cm ?` },
  { min: 3, max: 12, t: (S) => `Un enclos carré pour des poules a une aire de ${S} m². Combien mesure chacun de ses côtés, en m ?` },
  { min: 3, max: 15, t: (S) => `Un plateau de jeu carré compte ${S} cases, autant sur chaque ligne. Combien de cases y a-t-il par ligne ?` },
];
const PUR_RACINE = [
  (S: number) => `Calcule √${S}.`,
  (S: number) => `Quelle est la racine carrée de ${S} ?`,
  (S: number) => `Quel nombre positif a pour carré ${S} ?`,
  (S: number) => `Trouve le nombre positif x tel que x² = ${S}.`,
  (S: number) => `Donne la valeur de √${S}.`,
  (S: number) => `Quel nombre positif, multiplié par lui-même, donne ${S} ?`,
];
const UNITES_AIRE = ["mm", "cm", "dm", "m"];

function explCarre(n: number): string {
  return (
    "Définition : le carré d’un nombre, c’est ce nombre multiplié par lui-même.\n\n" +
    `Méthode : ${n}² = ${n} × ${n} (et non ${n} × 2).\n\n` +
    `Calcul : ${n} × ${n} = ${n * n}.\n\n` +
    `Conclusion : la réponse est ${n * n}.`
  );
}
function explRacine(n: number): string {
  const S = n * n;
  return (
    `Définition : la racine carrée de ${S} est le nombre POSITIF dont le carré vaut ${S}.\n\n` +
    `Méthode : on cherche dans la table des carrés le nombre qui, multiplié par lui-même, donne ${S}.\n\n` +
    `Calcul : ${n} × ${n} = ${S}, donc √${S} = ${n}.\n\n` +
    `Conclusion : la réponse est ${n}.`
  );
}

/** ★1 — carré ou racine d'un carré parfait, réponse tapée. */
function genCarreRacineCourt(): Q {
  const { n, square: S } = randomChoice(knownSquares);
  const u = randomChoice(UNITES_AIRE);
  const modeCarre = randomChoice([true, false]);
  // Toutes les formes à égalité : les phrases pures et les situations plausibles pour ce n.
  const formes = modeCarre
    ? [...PUR_CARRE.map((f) => () => f(n)), ...CTX_CARRE.filter((c) => n >= c.min && n <= c.max).map((c) => () => c.t(n, u))]
    : [...PUR_RACINE.map((f) => () => f(S)), ...CTX_RACINE.filter((c) => n >= c.min && n <= c.max).map((c) => () => c.t(S, u))];
  const text = randomChoice(formes)();
  return {
    text,
    format: "short",
    expected: [String(modeCarre ? S : n)],
    comparator: "number_equal",
    explanation: modeCarre ? explCarre(n) : explRacine(n),
  };
}

/** ★1 — le même savoir en QCM, avec les erreurs réelles en leurres (2n, n + 2…). */
function genCarreRacineQcm1(): Q {
  const { n, square: S } = randomChoice(knownSquares);
  const u = randomChoice(UNITES_AIRE);
  if (randomChoice([true, false])) {
    const forme = randomInt(0, 7);
    const avecUnite = forme >= 4 && forme <= 6;
    const v = (x: number) => (avecUnite ? `${x} ${u}²` : String(x));
    const text = [
      `Le carré de ${n} est égal à…`,
      `${n}² est égal à…`,
      `Complète : ${n} × ${n} = …`,
      `Quel est le résultat de ${n}² ?`,
      `L’aire d’un carré de ${n} ${u} de côté est…`,
      `Un carré de côté ${n} ${u} a pour aire…`,
      `Quelle est l’aire d’un carré dont les côtés mesurent ${n} ${u} ?`,
      `Parmi ces nombres, lequel est le carré de ${n} ?`,
    ][forme];
    const leurres = [2 * n, n + 2, (n + 1) * (n + 1), (n - 1) * (n - 1), 10 * n].filter((x) => x > 0);
    return {
      text,
      format: "qcm",
      choices: qcm(v(S), leurres.map(v)),
      expected: [v(S)],
      comparator: "mcq_exact",
      explanation: explCarre(n),
    };
  }
  const forme = randomInt(0, 7);
  const avecUnite = forme >= 4 && forme <= 6;
  const v = (x: number) => (avecUnite ? `${x} ${u}` : String(x));
  const text = [
    `√${S} est égal à…`,
    `La racine carrée de ${S} est…`,
    `Quel nombre positif a pour carré ${S} ?`,
    `Complète : …² = ${S}`,
    `Le côté d’un carré d’aire ${S} ${u}² mesure…`,
    `Un carré d’aire ${S} ${u}² a des côtés de…`,
    `Quelle est la longueur du côté d’un carré qui couvre ${S} ${u}² ?`,
    `Parmi ces nombres, lequel est √${S} ?`,
  ][forme];
  const leurres = [S / 2, n + 1, n - 1, 2 * n, n + 2, S, n + 3].filter((x) => x > 0 && Number.isInteger(x));
  return {
    text,
    format: "qcm",
    choices: qcm(v(n), leurres.map(v)),
    expected: [v(n)],
    comparator: "mcq_exact",
    explanation: explRacine(n),
  };
}

/** ★2 — la somme de deux carrés (le cœur du calcul de l'hypoténuse). */
function genSommeCarres(): Q {
  const a = randomInt(2, 12);
  let b = randomInt(2, 12);
  if (b === a) b = a === 12 ? 11 : a + 1;
  const u = randomChoice(UNITES_AIRE);
  const r = a * a + b * b;
  const formes = [
    `Combien vaut ${a}² + ${b}² ?`,
    `Calcule ${a}² + ${b}².`,
    `Que vaut la somme des carrés de ${a} et de ${b} ?`,
    `Donne la valeur de ${a}² + ${b}².`,
    `Effectue : ${a} × ${a} + ${b} × ${b}.`,
    `Ajoute le carré de ${a} au carré de ${b}. Quel résultat obtiens-tu ?`,
    `Deux carrés ont pour côtés ${a} ${u} et ${b} ${u}. Quelle est la somme de leurs aires, en ${u}² ?`,
    `On colle deux carrés, l’un de ${a} ${u} de côté, l’autre de ${b} ${u}. Quelle aire totale couvrent-ils ?`,
    `Calcule, en ${u}², l’aire totale d’un carré de côté ${a} ${u} et d’un carré de côté ${b} ${u}.`,
    `Deux potagers carrés mesurent ${a} m et ${b} m de côté. Quelle surface cultive-t-on en tout, en m² ?`,
    `Deux photos carrées ont des côtés de ${a} cm et ${b} cm. Quelle est leur aire totale, en cm² ?`,
    `Une fanfare forme deux carrés : l’un de ${a} rangs de ${a} musiciens, l’autre de ${b} rangs de ${b}. Combien de musiciens y a-t-il en tout ?`,
    `Pour un carrelage, on pose un carré de ${a} carreaux sur ${a} et un autre de ${b} carreaux sur ${b}. Combien de carreaux faut-il ?`,
    `Deux bassins carrés ont pour côtés ${a} m et ${b} m. Quelle est leur surface totale, en m² ?`,
  ];
  return {
    text: randomChoice(formes),
    format: "short",
    expected: [String(r)],
    comparator: "number_equal",
    explanation:
      "Définition : le carré d’un nombre est ce nombre multiplié par lui-même.\n\n" +
      "Méthode : on calcule CHAQUE carré, puis on additionne (on n’additionne pas d’abord les nombres).\n\n" +
      `Calcul : ${a}² + ${b}² = ${a * a} + ${b * b} = ${r}.\n\n` +
      `Conclusion : la réponse est ${r} (et non (${a} + ${b})² = ${(a + b) * (a + b)}).`,
  };
}

/** ★2 — la différence de deux carrés (le cœur du calcul d'un côté de l'angle droit). */
function genDiffCarres(): Q {
  const a = randomInt(5, 14);
  const b = randomInt(2, a - 1);
  const u = randomChoice(UNITES_AIRE);
  const r = a * a - b * b;
  const formes = [
    `Combien vaut ${a}² - ${b}² ?`,
    `Calcule ${a}² - ${b}².`,
    `Que vaut la différence entre le carré de ${a} et celui de ${b} ?`,
    `Donne la valeur de ${a}² - ${b}².`,
    `Effectue : ${a} × ${a} - ${b} × ${b}.`,
    `Retire le carré de ${b} au carré de ${a}. Quel résultat obtiens-tu ?`,
    `Dans un carré de ${a} ${u} de côté, on découpe un carré de ${b} ${u} de côté. Quelle aire reste-t-il, en ${u}² ?`,
    `De combien de ${u}² l’aire d’un carré de côté ${a} ${u} dépasse-t-elle celle d’un carré de côté ${b} ${u} ?`,
    `Un carré de ${b} ${u} de côté est posé sur un carré de ${a} ${u} de côté. Quelle aire du grand carré reste visible ?`,
    `Une pelouse carrée de ${a} m de côté entoure un bassin carré de ${b} m de côté. Quelle est l’aire de la pelouse, en m² ?`,
    `Un cadre photo carré de ${a} cm de côté a une ouverture carrée de ${b} cm de côté. Quelle est l’aire du cadre, en cm² ?`,
    `Un carré de ${a} carreaux sur ${a} contient un motif carré de ${b} carreaux sur ${b}. Combien de carreaux sont hors du motif ?`,
    `Une place carrée de ${a} m de côté a en son centre une fontaine carrée de ${b} m de côté. Quelle surface reste pour les promeneurs, en m² ?`,
  ];
  return {
    text: randomChoice(formes),
    format: "short",
    expected: [String(r)],
    comparator: "number_equal",
    explanation:
      "Définition : on calcule chaque carré séparément.\n\n" +
      "Méthode : on soustrait le second carré du premier (et non les nombres eux-mêmes).\n\n" +
      `Calcul : ${a}² - ${b}² = ${a * a} - ${b * b} = ${r}.\n\n` +
      `Conclusion : la réponse est ${r} (et non (${a} - ${b})² = ${(a - b) * (a - b)}).`,
  };
}

/** ★2 — QCM : carré, racine, encadrement d'une racine, arrondi à la calculatrice. */
function genCarreRacineQcm2(): Q {
  const mode = randomInt(0, 3);
  const u = randomChoice(UNITES_AIRE);
  if (mode === 0 || mode === 1) {
    // Encadrement (mode 0) ou arrondi au dixième à la calculatrice (mode 1) d'une racine non entière.
    let N = randomInt(3, 150);
    while (Number.isInteger(Math.sqrt(N))) N++;
    const n = Math.floor(Math.sqrt(N));
    if (mode === 0) {
      const text = randomChoice([
        `Entre quels entiers consécutifs se trouve √${N} ?`,
        `√${N} est compris entre…`,
        `Sans calculatrice, encadre √${N} par deux entiers consécutifs.`,
        `Un carré a une aire de ${N} ${u}². Entre quels entiers consécutifs se trouve la longueur de son côté, en ${u} ?`,
      ]);
      const e = (k: number) => `${k} et ${k + 1}`;
      return {
        text,
        format: "qcm",
        choices: qcm(e(n), [n - 1, n + 1, n + 2, n - 2, n + 3].filter((k) => k >= 1).map(e)),
        expected: [e(n)],
        comparator: "mcq_exact",
        explanation:
          "Définition : √N est le nombre positif dont le carré vaut N.\n\n" +
          "Méthode : on encadre N entre deux carrés parfaits consécutifs.\n\n" +
          `Calcul : ${n}² = ${n * n} < ${N} < ${(n + 1) * (n + 1)} = ${n + 1}², donc ${n} < √${N} < ${n + 1}.\n\n` +
          `Conclusion : √${N} est compris entre ${n} et ${n + 1}.`,
      };
    }
    const r = arrondi1(Math.sqrt(N));
    const tr = Math.floor(Math.sqrt(N) * 10) / 10;
    const text = randomChoice([
      `Avec la calculatrice, donne l’arrondi au dixième de √${N}.`,
      `Quel est l’arrondi au dixième de √${N} ?`,
      `Un carré a une aire de ${N} ${u}². Quelle est la longueur de son côté, arrondie au dixième, en ${u} ?`,
      `À la calculatrice, √${N} ≈ … (arrondi au dixième)`,
    ]);
    return {
      text,
      format: "qcm",
      choices: qcm(fr(r), [fr(arrondi1(r + 0.1)), fr(arrondi1(r - 0.1)), fr(tr), fr(N / 2), fr(arrondi1(r + 1))]),
      expected: [fr(r)],
      comparator: "mcq_exact",
      explanation:
        "Définition : √N est le nombre positif dont le carré vaut N ; ici il ne « tombe pas juste ».\n\n" +
        "Méthode : on tape √ à la calculatrice, puis on arrondit au dixième (on regarde le chiffre des centièmes).\n\n" +
        `Calcul : √${N} ≈ ${fr(Math.round(Math.sqrt(N) * 1000) / 1000)}…, donc √${N} ≈ ${fr(r)}.\n\n` +
        `Conclusion : l’arrondi au dixième est ${fr(r)}.`,
    };
  }
  const { n, square: S } = randomChoice(knownSquares.filter((k) => k.n >= 4));
  if (mode === 2) {
    const text = randomChoice([`Combien vaut ${n}² ?`, `Le carré de ${n} vaut…`, `Quelle est la valeur de ${n} × ${n} ?`, `L’aire d’un carré de côté ${n} ${u} est, en ${u}²…`]);
    return {
      text,
      format: "qcm",
      choices: qcm(String(S), [2 * n, n + 2, (n + 1) * (n + 1), (n - 1) * (n - 1), 10 * n].map(String)),
      expected: [String(S)],
      comparator: "mcq_exact",
      explanation: explCarre(n),
    };
  }
  const text = randomChoice([`Combien vaut √${S} ?`, `La racine carrée de ${S} vaut…`, `Quel nombre positif, élevé au carré, donne ${S} ?`, `Un carré d’aire ${S} ${u}² a un côté de longueur, en ${u}…`]);
  return {
    text,
    format: "qcm",
    choices: qcm(String(n), [S / 2, n + 1, n - 1, 2 * n, n + 2].filter((x) => Number.isInteger(x) && x > 0).map(String)),
    expected: [String(n)],
    comparator: "mcq_exact",
    explanation: explRacine(n),
  };
}

/* =========================================================================
   RECONNAÎTRE
========================================================================= */

/** Une figure de triangle rectangle à l'échelle d'un triplet, sans longueurs. */
function figureRectangleNue(t: TriangleNomme): TriangleCanvasData {
  const [a, b, c] = tirerTriplet("simple");
  return figureALEchelle({ labels: t.labels, AB: a, CA: b, BC: c, angleDroitEnA: true });
}

function explHypotenuse(t: TriangleNomme): string {
  return (
    "Définition : dans un triangle rectangle, l’hypoténuse est le côté opposé à l’angle droit ; c’est aussi le plus grand côté.\n\n" +
    `Méthode : on repère l’angle droit, en ${t.droit}, puis le côté qui ne passe pas par ${t.droit}.\n\n` +
    `Calcul : les côtés [${t.c1}] et [${t.c2}] partent de ${t.droit} : ce sont les côtés de l’angle droit. Le côté en face est [${t.hyp}].\n\n` +
    `Conclusion : l’hypoténuse du triangle ${t.nom} est [${t.hyp}].`
  );
}

/** ★1 — sans figure : hypoténuse, sommet de l'angle droit, nature d'un côté. */
function genReconnaitreTexte(): Q {
  const t = tirerTriangle();
  const mode = randomInt(0, 3);
  if (mode === 0) {
    const text = randomChoice([
      `Le triangle ${t.nom} est rectangle en ${t.droit}. Quelle est son hypoténuse ?`,
      `${t.nom} est un triangle rectangle en ${t.droit}. Quel côté est l’hypoténuse ?`,
      `Dans le triangle ${t.nom} rectangle en ${t.droit}, quel est le côté opposé à l’angle droit ?`,
      `On sait que le triangle ${t.nom} a un angle droit en ${t.droit}. Quel est son plus grand côté ?`,
    ]);
    return {
      text,
      format: "qcm",
      choices: shuffle([t.hyp, t.c1, t.c2]),
      expected: [t.hyp],
      comparator: "mcq_exact",
      explanation: explHypotenuse(t),
    };
  }
  if (mode === 1) {
    const text = randomChoice([
      `Dans le triangle rectangle ${t.nom}, l’hypoténuse est [${t.hyp}]. En quel sommet est l’angle droit ?`,
      `Le côté [${t.hyp}] est l’hypoténuse du triangle rectangle ${t.nom}. Où se trouve l’angle droit ?`,
      `Le triangle ${t.nom} est rectangle et son plus grand côté est [${t.hyp}]. Quel est le sommet de l’angle droit ?`,
    ]);
    return {
      text,
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
    const text = randomChoice([
      `Le triangle ${t.nom} est rectangle en ${t.droit}. Le côté [${cote}] est-il l’hypoténuse ou un côté de l’angle droit ?`,
      `Dans le triangle ${t.nom} rectangle en ${t.droit}, que représente le côté [${cote}] ?`,
    ]);
    return {
      text,
      format: "qcm",
      // Trois lignes, comme les autres tournures du gabarit (pas d'effondrement à deux).
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
  const text = randomChoice([
    `Le triangle ${t.nom} est rectangle en ${t.droit}. Quels sont les côtés de l’angle droit ?`,
    `Dans le triangle ${t.nom} rectangle en ${t.droit}, quels côtés forment l’angle droit ?`,
  ]);
  return {
    text,
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
  const text = randomChoice([
    `Dans le triangle ${t.nom} représenté, quel côté est l’hypoténuse ?`,
    `Sur la figure, le triangle ${t.nom} est codé rectangle. Quelle est son hypoténuse ?`,
    `Quel côté du triangle ${t.nom} est opposé à l’angle droit codé sur la figure ?`,
    `Le petit carré code l’angle droit du triangle ${t.nom}. Lequel de ses côtés est l’hypoténuse ?`,
    `Sur la figure, quel est le plus long côté du triangle rectangle ${t.nom} ?`,
  ]);
  return {
    text,
    format: "qcm",
    choices: shuffle([t.hyp, t.c1, t.c2]),
    expected: [t.hyp],
    comparator: "mcq_exact",
    explanation: explHypotenuse(t),
    canvas: figureRectangleNue(t),
  };
}

/** ★2 — avec la figure : sommet de l'angle droit, côtés de l'angle droit, ou hypoténuse annoncée. */
function genReconnaitreFigureSommet(): Q {
  const t = tirerTriangle();
  const canvas = figureRectangleNue(t);
  const mode = randomInt(0, 2);
  if (mode === 0) {
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
  if (mode === 1) {
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
  return {
    text: randomChoice([
      `Le triangle ${t.nom} est rectangle en ${t.droit}. Quel côté est l’hypoténuse ?`,
      `${t.nom} est rectangle en ${t.droit}, comme le montre la figure. Quelle est son hypoténuse ?`,
    ]),
    format: "qcm",
    choices: shuffle([t.hyp, t.c1, t.c2]),
    expected: [t.hyp],
    comparator: "mcq_exact",
    explanation: explHypotenuse(t),
    canvas,
  };
}

/** ★2 — peut-on appliquer Pythagore ? Seul le codage le dit. */
function genPeutOnAppliquer(): Q {
  const isRight = randomChoice([true, false]);
  const t = tirerTriangle();
  const nom = t.nom;
  let canvas: TriangleCanvasData;
  if (isRight) {
    canvas = figureRectangleNue(t);
  } else {
    // Un triangle quelconque, à l'échelle, sans codage.
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
  const text = randomChoice([
    `Peut-on utiliser directement le théorème de Pythagore dans le triangle ${nom} ?`,
    `Le théorème de Pythagore s’applique-t-il directement au triangle ${nom} de la figure ?`,
    `Avec cette figure, a-t-on le droit d’écrire l’égalité de Pythagore dans le triangle ${nom} ?`,
    `Sur la figure, le triangle ${nom} permet-il d’appliquer directement le théorème de Pythagore ?`,
  ]);
  return {
    text,
    format: "qcm",
    choices: ["oui", "non"],
    expected: [isRight ? "oui" : "non"],
    comparator: "mcq_exact",
    explanation:
      "Définition : le théorème de Pythagore ne s’applique QUE dans un triangle rectangle. C’est sa condition d’emploi, pas un détail.\n\n" +
      "Méthode : avant tout calcul, on cherche l’angle droit CODÉ sur la figure — le petit carré. Puis on repère l’hypoténuse, en face de lui.\n\n" +
      (isRight
        ? `Calcul : le triangle ${nom} porte bien un angle droit codé, en ${t.droit}.\n\nConclusion : oui, on peut appliquer Pythagore, avec [${t.hyp}] pour hypoténuse.`
        : `Calcul : aucun angle droit n’est codé sur ${nom}.\n\nConclusion : non. Un triangle qui « a l’air » rectangle ne l’est pas forcément : seul le codage le prouve. Sans lui, Pythagore ne s’applique pas — et la réciproque servirait justement à le démontrer.`),
    canvas,
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
    `Calcul : ${t.hyp}² = ${fr(x1)}² + ${fr(x2)}² = ${fr(sq(x1))} + ${fr(sq(x2))} = ${fr(S)}, donc ${t.hyp} = √${fr(S)} ${exact ? "=" : "≈"} ${fr(h)}.\n\n` +
    `Conclusion : ${t.hyp} ${exact ? "=" : "≈"} ${fr(h)} ${u}.`
  );
}
function explCoteNomme(t: TriangleNomme, h: number, x1: number, u: string): string {
  const D = Math.round((sq(h) - sq(x1)) * 10000) / 10000;
  const exact = racineExacte(D);
  const r = arrondi1(Math.sqrt(D));
  return (
    `Définition : le triangle ${t.nom} est rectangle en ${t.droit} ; son hypoténuse est [${t.hyp}] et [${t.c2}] est un côté de l’angle droit.\n\n` +
    `Méthode : d’après le théorème de Pythagore, ${t.hyp}² = ${t.c1}² + ${t.c2}², donc ${t.c2}² = ${t.hyp}² - ${t.c1}² : on SOUSTRAIT.\n\n` +
    `Calcul : ${t.c2}² = ${fr(h)}² - ${fr(x1)}² = ${fr(sq(h))} - ${fr(sq(x1))} = ${fr(D)}, donc ${t.c2} = √${fr(D)} ${exact ? "=" : "≈"} ${fr(r)}.\n\n` +
    `Conclusion : ${t.c2} ${exact ? "=" : "≈"} ${fr(r)} ${u}.`
  );
}

/** ★2 — l'hypoténuse d'un triangle nommé (triplets simples), avec la figure. */
function genHypNomme(): Q {
  const t = tirerTriangle();
  const [x1, x2, h] = tirerTriplet("simple");
  const u = randomChoice(UNITES);
  const A = `${fr(x1)} ${u}`;
  const B = `${fr(x2)} ${u}`;
  const text = randomChoice([
    `Le triangle ${t.nom} est rectangle en ${t.droit}, avec ${t.c1} = ${A} et ${t.c2} = ${B}. Calcule ${t.hyp}.`,
    `${t.nom} est un triangle rectangle en ${t.droit} tel que ${t.c2} = ${B} et ${t.c1} = ${A}. Quelle est la longueur de l’hypoténuse [${t.hyp}] ?`,
    `Dans le triangle ${t.nom} rectangle en ${t.droit}, on donne ${t.c1} = ${A} et ${t.c2} = ${B}. Combien mesure ${t.hyp} ?`,
    `On sait que ${t.nom} est rectangle en ${t.droit}, que ${t.c1} = ${A} et que ${t.c2} = ${B}. Détermine la longueur ${t.hyp}.`,
    `Le triangle ${t.nom} de la figure est rectangle en ${t.droit}. Ses côtés [${t.c1}] et [${t.c2}] mesurent ${A} et ${B}. Quelle est la longueur de son hypoténuse ?`,
  ]);
  return {
    text,
    format: "short",
    expected: [String(h)],
    comparator: "number_equal",
    explanation: explHypNomme(t, x1, x2, u),
    canvas: figureALEchelle({
      labels: t.labels, AB: x1, CA: x2, BC: h, angleDroitEnA: true,
      sideLabels: { AB: fr(x1), CA: fr(x2), BC: "?" },
    }),
  };
}

/** ★2 — le carré de l'hypoténuse, première étape du calcul. */
function genHypCarre(): Q {
  const t = tirerTriangle();
  const [x1, x2, h] = tirerTriplet("simple");
  const u = randomChoice(UNITES);
  const A = `${fr(x1)} ${u}`;
  const B = `${fr(x2)} ${u}`;
  const S = sq(x1) + sq(x2);
  const text = randomChoice([
    `Le triangle ${t.nom} est rectangle en ${t.droit}, avec ${t.c1} = ${A} et ${t.c2} = ${B}. Combien vaut ${t.hyp}² ?`,
    `Dans le triangle ${t.nom} rectangle en ${t.droit}, ${t.c1} = ${A} et ${t.c2} = ${B}. Calcule ${t.hyp}².`,
    `${t.nom} est rectangle en ${t.droit} ; ses côtés de l’angle droit mesurent ${A} et ${B}. Quelle est la valeur de ${t.hyp}² ?`,
    `On veut calculer l’hypoténuse [${t.hyp}] du triangle ${t.nom}, rectangle en ${t.droit}, sachant que ${t.c2} = ${B} et ${t.c1} = ${A}. Première étape : que vaut ${t.hyp}² ?`,
  ]);
  return {
    text,
    format: "short",
    expected: [String(S), fr(S)],
    comparator: "number_equal",
    explanation:
      `Définition : le triangle ${t.nom} est rectangle en ${t.droit}, son hypoténuse est [${t.hyp}].\n\n` +
      `Méthode : d’après le théorème de Pythagore, ${t.hyp}² = ${t.c1}² + ${t.c2}².\n\n` +
      `Calcul : ${t.hyp}² = ${fr(x1)}² + ${fr(x2)}² = ${fr(sq(x1))} + ${fr(sq(x2))} = ${fr(S)}.\n\n` +
      `Conclusion : ${t.hyp}² = ${fr(S)} (et donc ${t.hyp} = ${fr(h)} ${u}).`,
    canvas: figureALEchelle({
      labels: t.labels, AB: x1, CA: x2, BC: h, angleDroitEnA: true,
      sideLabels: { AB: fr(x1), CA: fr(x2), BC: "?" },
    }),
  };
}

/** Côté de l'angle droit d'un triangle nommé. `sorte` règle la difficulté. */
function coteNomme(sorte: SorteTriplet, arrondir: boolean): Q {
  const t = tirerTriangle();
  let [x1, , h] = tirerTriplet(sorte);
  if (arrondir) h = Math.round((h + (sorte === "decimal" ? 0.1 : 1)) * 10) / 10;
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
    expected: [fr(x2)],
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
  const text = randomChoice([
    `Le triangle ${t.nom} est rectangle en ${t.droit}, avec ${t.hyp} = ${fr(h)} ${u} et ${t.c1} = ${fr(x1)} ${u}. Combien vaut ${t.c2}² ?`,
    `Dans le triangle ${t.nom} rectangle en ${t.droit}, l’hypoténuse mesure ${fr(h)} ${u} et ${t.c1} = ${fr(x1)} ${u}. Calcule ${t.c2}².`,
    `On cherche ${t.c2} dans le triangle ${t.nom} rectangle en ${t.droit}, sachant que ${t.c1} = ${fr(x1)} ${u} et ${t.hyp} = ${fr(h)} ${u}. Première étape : que vaut ${t.c2}² ?`,
  ]);
  return {
    text,
    format: "short",
    expected: [String(D), fr(D)],
    comparator: "number_equal",
    explanation:
      `Définition : le triangle ${t.nom} est rectangle en ${t.droit} ; [${t.hyp}] est l’hypoténuse.\n\n` +
      `Méthode : ${t.c2}² = ${t.hyp}² - ${t.c1}² (on cherche un côté de l’angle droit : on soustrait).\n\n` +
      `Calcul : ${t.c2}² = ${fr(h)}² - ${fr(x1)}² = ${fr(sq(h))} - ${fr(sq(x1))} = ${fr(D)}.\n\n` +
      `Conclusion : ${t.c2}² = ${fr(D)} (et donc ${t.c2} = ${fr(x2)} ${u}).`,
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
  return {
    text: r.text,
    format: "qcm",
    choices: qcm(L(c), leurres),
    expected: [L(c)],
    comparator: "mcq_exact",
    explanation: r.explanation,
  };
}

/** ★3 — réponse tapée, la moitié des tirages à arrondir au dixième. */
function genHypSituation(): Q {
  const r = situationHypotenuse(randomChoice([true, false]));
  return { text: r.text, format: "short", expected: [fr(r.c)], comparator: "number_equal", explanation: r.explanation };
}

/** ★3 — QCM : un côté de l'angle droit dans une situation. */
function genCoteQcmSituation(): Q {
  const r = situationCote(false);
  const { a, b, c, pas, L } = r;
  const leurres = [c - a, sq(c) - sq(a), arrondi1(Math.sqrt(sq(c) + sq(a))), b + pas, b - pas, b + 2 * pas]
    .filter((x) => x > 0)
    .map((x) => L(Math.round(x * 100) / 100));
  return {
    text: r.text,
    format: "qcm",
    choices: qcm(L(b), leurres),
    expected: [L(b)],
    comparator: "mcq_exact",
    explanation: r.explanation,
  };
}

/** ★3 — réponse tapée, la moitié des tirages à arrondir au dixième. */
function genCoteSituation(): Q {
  const r = situationCote(randomChoice([true, false]));
  return { text: r.text, format: "short", expected: [fr(r.b)], comparator: "number_equal", explanation: r.explanation };
}

/** ★3 (hypoténuse) — justifier un résultat donné. */
function genHypExplique(): Q {
  if (randomChoice([true, false])) {
    const t = tirerTriangle();
    const [x1, x2, h] = tirerTriplet("varie");
    const u = randomChoice(UNITES);
    const text = randomChoice([
      `Le triangle ${t.nom} est rectangle en ${t.droit}, avec ${t.c1} = ${fr(x1)} ${u} et ${t.c2} = ${fr(x2)} ${u}. Explique pourquoi ${t.hyp} = ${fr(h)} ${u}.`,
      `Justifie que, dans le triangle ${t.nom} rectangle en ${t.droit} où ${t.c1} = ${fr(x1)} ${u} et ${t.c2} = ${fr(x2)} ${u}, l’hypoténuse mesure ${fr(h)} ${u}.`,
      `Un camarade affirme : « Dans le triangle ${t.nom} rectangle en ${t.droit}, avec ${t.c1} = ${fr(x1)} ${u} et ${t.c2} = ${fr(x2)} ${u}, on a ${t.hyp} = ${fr(h)} ${u}. » Explique son calcul.`,
    ]);
    return {
      text,
      format: "open",
      expected: [fr(x1), fr(x2), fr(h), "carré"],
      comparator: "contains_keyword",
      explanation: explHypNomme(t, x1, x2, u),
    };
  }
  const r = situationHypotenuse(false);
  return {
    text: `${r.text} Explique ton raisonnement : quel est le triangle rectangle, quelle est son hypoténuse, quel calcul fais-tu ?`,
    format: "open",
    expected: [fr(r.a), fr(r.b), fr(r.c), "carré"],
    comparator: "contains_keyword",
    explanation: r.explanation,
  };
}

/** ★4 (côté) — justifier un côté de l'angle droit. */
function genCoteExplique(): Q {
  if (randomChoice([true, false])) {
    const t = tirerTriangle();
    const [x1, x2, h] = tirerTriplet("varie");
    const u = randomChoice(UNITES);
    const text = randomChoice([
      `Le triangle ${t.nom} est rectangle en ${t.droit}, avec ${t.hyp} = ${fr(h)} ${u} et ${t.c1} = ${fr(x1)} ${u}. Explique pourquoi ${t.c2} = ${fr(x2)} ${u}.`,
      `Justifie que ${t.c2} = ${fr(x2)} ${u} dans le triangle ${t.nom} rectangle en ${t.droit}, où ${t.hyp} = ${fr(h)} ${u} et ${t.c1} = ${fr(x1)} ${u}.`,
      `Une élève trouve ${t.c2} = ${fr(Math.round(Math.sqrt(sq(h) + sq(x1)) * 10) / 10)} ${u} dans le triangle ${t.nom} rectangle en ${t.droit}, avec ${t.hyp} = ${fr(h)} ${u} et ${t.c1} = ${fr(x1)} ${u}. Explique son erreur et donne la bonne longueur.`,
    ]);
    return {
      text,
      format: "open",
      expected: [fr(h), fr(x1), fr(x2), "soustrait"],
      comparator: "contains_keyword",
      explanation: explCoteNomme(t, h, x1, u),
    };
  }
  const r = situationCote(false);
  return {
    text: `${r.text} Explique ton raisonnement : quelle longueur est l’hypoténuse, et pourquoi soustrais-tu ?`,
    format: "open",
    expected: [fr(r.a), fr(r.b), fr(r.c), "soustrait"],
    comparator: "contains_keyword",
    explanation: r.explanation,
  };
}

/* =========================================================================
   RÉCIPROQUE — vérifier l'égalité
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
  // Les quatre premières tournures nomment le triangle (le plus souvent tirées),
  // les quatre dernières ne parlent que des nombres.
  const mode = Math.random() < 0.75 ? randomInt(0, 3) : randomInt(4, 7);
  const ouiNon = mode === 2 || mode === 6 ? ["vrai", "faux"] : ["oui", "non"];
  const text = [
    `Dans le triangle ${t.nom}, ${t.c1} = ${a} ${u}, ${t.c2} = ${b} ${u} et ${t.hyp} = ${c} ${u}. A-t-on ${t.hyp}² = ${t.c1}² + ${t.c2}² ?`,
    `Le triangle ${t.nom} a pour côtés ${liste}. L’égalité ${t.hyp}² = ${t.c1}² + ${t.c2}² est-elle vraie ?`,
    `Vrai ou faux : dans le triangle ${t.nom} où ${liste}, on a ${t.hyp}² = ${t.c1}² + ${t.c2}².`,
    `On mesure le triangle ${t.nom} : ${liste}. ${t.hyp}² est-il égal à ${t.c1}² + ${t.c2}² ?`,
    `Calcule ${a}² + ${b}², puis ${c}². Les deux résultats sont-ils égaux ?`,
    `Si l’on compare ${c}² et ${a}² + ${b}², trouve-t-on deux nombres égaux ?`,
    `Vrai ou faux : ${a}² + ${b}² = ${c}².`,
    `On calcule ${c}² d’une part, et ${a}² + ${b}² d’autre part. Trouve-t-on le même résultat ?`,
  ][mode];
  const [na, nb, nc] = mode <= 3 ? [t.c1, t.c2, t.hyp] : [String(a), String(b), String(c)];
  return {
    text,
    format: "qcm",
    choices: ouiNon,
    expected: [vrai ? ouiNon[0] : ouiNon[1]],
    comparator: "mcq_exact",
    explanation: explEgalite(na, nb, nc, sq(a), sq(b), sq(c)),
  };
}

/** ★3 — l'égalité dans un triangle nommé, côtés donnés dans le désordre. */
function genEgaliteTriangle(): Q {
  const vrai = randomChoice([true, false]);
  const [a, b, c] = longueursReciproque(vrai, randomChoice(["varie", "decimal"] as SorteTriplet[]));
  const t = tirerTriangle();
  const u = uniteDe(a, b, c);
  const liste = listeCotes(t, a, b, c, u);
  const text = randomChoice([
    `Dans le triangle ${t.nom}, ${liste}. L’égalité de Pythagore est-elle vérifiée ?`,
    `On donne le triangle ${t.nom} tel que ${liste}. A-t-on ${t.hyp}² = ${t.c1}² + ${t.c2}² ?`,
    `Le triangle ${t.nom} a pour côtés ${liste}. Le carré du plus grand côté est-il égal à la somme des carrés des deux autres ?`,
  ]);
  return {
    text,
    format: "qcm",
    choices: ["oui", "non"],
    expected: [vrai ? "oui" : "non"],
    comparator: "mcq_exact",
    explanation:
      "Définition : l’égalité de Pythagore compare le carré du plus grand côté à la somme des carrés des deux autres.\n\n" +
      "Méthode : on repère le plus grand côté, puis on fait deux calculs séparés.\n\n" +
      `Calcul : ${deuxCalculs(t, a, b, c)}\n\n` +
      `Conclusion : ${vrai ? "oui, l’égalité est vérifiée" : "non, l’égalité n’est pas vérifiée"}.`,
  };
}

/** ★3 — les deux calculs de la réciproque, un par un. */
function genSommeCarresTriangle(): Q {
  const [a, b, c] = longueursReciproque(randomChoice([true, false]), randomChoice(["varie", "decimal"] as SorteTriplet[]));
  const t = tirerTriangle();
  const u = uniteDe(a, b, c);
  const liste = listeCotes(t, a, b, c, u);
  const somme = randomChoice([true, false]);
  const v = somme ? sq(a) + sq(b) : sq(c);
  const text = somme
    ? randomChoice([
        `Dans le triangle ${t.nom}, ${liste}. Calcule ${t.c1}² + ${t.c2}².`,
        `Le triangle ${t.nom} a pour côtés ${liste}. Combien vaut la somme des carrés des deux plus petits côtés ?`,
      ])
    : randomChoice([
        `Dans le triangle ${t.nom}, ${liste}. Calcule le carré du plus grand côté.`,
        `Pour tester l’égalité de Pythagore dans le triangle ${t.nom}, où ${liste}, on calcule d’abord ${t.hyp}². Combien vaut-il ?`,
      ]);
  return {
    text,
    format: "short",
    expected: [fr(v), String(v)],
    comparator: "number_equal",
    explanation:
      "Définition : la réciproque se prépare par deux calculs séparés.\n\n" +
      `Méthode : le plus grand côté est [${t.hyp}] ; ${somme ? `on additionne les carrés des deux autres, [${t.c1}] et [${t.c2}]` : "on le met seul au carré"}.\n\n` +
      (somme
        ? `Calcul : ${t.c1}² + ${t.c2}² = ${fr(a)}² + ${fr(b)}² = ${fr(sq(a))} + ${fr(sq(b))} = ${fr(v)}.\n\n`
        : `Calcul : ${t.hyp}² = ${fr(c)}² = ${fr(v)}.\n\n`) +
      `Conclusion : la réponse est ${fr(v)}.`,
  };
}

/** ★3 — repérer le plus grand côté, celui qu'on met seul au carré. */
function genPlusGrandCote(): Q {
  const [a, b, c] = longueursReciproque(randomChoice([true, false]), randomChoice(["simple", "varie", "decimal"] as SorteTriplet[]));
  const t = tirerTriangle();
  const u = uniteDe(a, b, c);
  const liste = listeCotes(t, a, b, c, u);
  const text = randomChoice([
    `Dans le triangle ${t.nom}, ${liste}. Pour tester l’égalité de Pythagore, quelle longueur met-on seule au carré ?`,
    `Le triangle ${t.nom} a pour côtés ${liste}. Quelle est la longueur du seul côté qui pourrait être l’hypoténuse ?`,
    `On veut savoir si ${t.nom} est rectangle ; ${liste}. Quelle est la longueur du plus grand côté, celui qu’on compare aux deux autres ?`,
  ]);
  return {
    text,
    format: "short",
    expected: [fr(c)],
    comparator: "number_equal",
    explanation:
      "Définition : si le triangle est rectangle, son hypoténuse est forcément son plus grand côté.\n\n" +
      "Méthode : on repère la plus grande des trois longueurs, quel que soit l’ordre de l’énoncé.\n\n" +
      `Calcul : la plus grande longueur est ${t.hyp} = ${fr(c)} ${u}.\n\n` +
      `Conclusion : on compare ${t.hyp}² à ${t.c1}² + ${t.c2}².`,
  };
}

/** ★3 — expliquer la vérification. */
function genVerifierExplique(): Q {
  const vrai = randomChoice([true, false]);
  const [a, b, c] = longueursReciproque(vrai, randomChoice(["simple", "varie"] as SorteTriplet[]));
  const t = tirerTriangle();
  const u = randomChoice(UNITES);
  const liste = listeCotes(t, a, b, c, u);
  const text = randomChoice([
    `Dans le triangle ${t.nom}, ${liste}. Explique comment vérifier si l’égalité de Pythagore est vraie, puis conclus.`,
    `Le triangle ${t.nom} a pour côtés ${liste}. Ces longueurs vérifient-elles l’égalité de Pythagore ? Justifie par deux calculs.`,
    `Un élève affirme que les longueurs ${liste} du triangle ${t.nom} vérifient l’égalité de Pythagore. A-t-il raison ? Explique.`,
  ]);
  return {
    text,
    format: "open",
    expected: [fr(sq(c)), fr(sq(a) + sq(b)), "carré", vrai ? "égal" : "pas"],
    comparator: "contains_keyword",
    explanation:
      "Définition : l’égalité de Pythagore compare le carré du plus grand côté à la somme des carrés des deux autres.\n\n" +
      "Méthode : on repère le plus grand côté et on fait deux calculs séparés.\n\n" +
      `Calcul : ${deuxCalculs(t, a, b, c)}\n\n` +
      `Conclusion : ${vrai ? "les deux résultats sont égaux : l’égalité est vérifiée" : "les deux résultats sont différents : l’égalité n’est pas vérifiée"}.`,
  };
}

/* =========================================================================
   RÉCIPROQUE — conclure
========================================================================= */

/** ★3 — le triangle nommé est-il rectangle ? Avec sa figure à l'échelle. */
function genEstRectangleFigure(): Q {
  const vrai = randomChoice([true, false]);
  const [a, b, c] = longueursReciproque(vrai, randomChoice(["simple", "varie", "decimal"] as SorteTriplet[]));
  const t = tirerTriangle();
  const u = uniteDe(a, b, c);
  const liste = listeCotes(t, a, b, c, u);
  const text = randomChoice([
    `Le triangle ${t.nom} a pour côtés ${liste}. Est-il rectangle ?`,
    `On donne ${liste}. Le triangle ${t.nom} est-il rectangle ?`,
    `Le triangle ${t.nom} ci-contre est-il rectangle ? On a mesuré ${liste}.`,
    `${t.nom} est un triangle tel que ${liste}. Peut-on affirmer qu’il est rectangle ?`,
  ]);
  return {
    text,
    format: "qcm",
    choices: ["oui", "non"],
    expected: [vrai ? "oui" : "non"],
    comparator: "mcq_exact",
    explanation:
      "Définition : la réciproque du théorème de Pythagore : si le carré du plus grand côté est égal à la somme des carrés des deux autres, le triangle est rectangle.\n\n" +
      "Méthode : on ne sait pas encore s’il est rectangle : on calcule séparément, « d’une part », « d’autre part ».\n\n" +
      `Calcul : ${redactionReciproque(t, a, b, c)}\n\n` +
      `Conclusion : ${vrai ? `oui, ${t.nom} est rectangle en ${t.droit}` : `non, ${t.nom} n’est pas rectangle`}.`,
    canvas: figureALEchelle({
      labels: t.labels, AB: a, CA: b, BC: c,
      sideLabels: { AB: fr(a), CA: fr(b), BC: fr(c) },
    }),
  };
}

// Situations où la réciproque CONTRÔLE un angle droit. a, b : les deux côtés
// qui partent du coin à contrôler ; c : la longueur en face.
const SITUATIONS_RECIPROQUE: {
  unite: string;
  objet: string;
  triplets: [number, number, number][];
  t: (a: string, b: string, c: string) => string;
}[] = [
  { unite: "cm", objet: "le coin du cadre", triplets: [[60, 80, 100], [45, 60, 75], [72, 96, 120], [40, 42, 58]],
    t: (a, b, c) => `Un menuisier assemble un cadre : deux montants de ${a} et ${b} partent d’un même coin, et la diagonale qui relie leurs extrémités mesure ${c}. Le coin forme-t-il un angle droit ?` },
  { unite: "m", objet: "le coin de la terrasse", triplets: [[3, 4, 5], [6, 8, 10], [2.4, 3.2, 4], [4.5, 6, 7.5]],
    t: (a, b, c) => `Pour vérifier le coffrage d’une terrasse, Sami mesure deux bords de ${a} et ${b} qui partent d’un même coin, puis la diagonale : ${c}. L’angle de ce coin est-il droit ?` },
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
  { unite: "m", objet: "le coin du portail", triplets: [[3, 1.6, 3.4], [2.4, 1, 2.6], [3.6, 1.5, 3.9]],
    t: (a, b, c) => `Un portail mesure ${a} de large et ${b} de haut, et sa diagonale mesure ${c}. Ses bords forment-ils un angle droit ?` },
  { unite: "m", objet: "l’angle entre le mur et le sol", triplets: [[0.6, 0.8, 1], [1.2, 1.6, 2], [0.9, 1.2, 1.5]],
    t: (a, b, c) => `Un maçon vérifie un mur : il marque un point au sol à ${a} du pied du mur et un point sur le mur à ${b} du sol. Entre ces deux points, il mesure ${c}. Le mur est-il perpendiculaire au sol ?` },
  { unite: "cm", objet: "le triangle de papier", triplets: [[6, 8, 10], [5, 12, 13], [8, 15, 17], [7, 24, 25]],
    t: (a, b, c) => `Lina découpe un triangle de papier dont les côtés mesurent ${a}, ${b} et ${c}. Est-ce un triangle rectangle ?` },
];

/** ★3 — la réciproque contrôle un angle droit dans la vie réelle. */
function genEstRectangleSituation(): Q {
  const s = randomChoice(SITUATIONS_RECIPROQUE);
  const vrai = randomChoice([true, false]);
  let [a, b, c] = randomChoice(s.triplets);
  const pas = s.triplets.some((x) => x.some((y) => !Number.isInteger(y))) ? 0.1 : 1;
  // « Presque » : la longueur en face décalée d'un cran, en restant la plus grande.
  if (!vrai) c = Math.round((c + (Math.random() < 0.5 && c - pas > Math.max(a, b) ? -pas : pas)) * 10) / 10;
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
  const text = randomChoice([
    `Le triangle ${t.nom} ci-contre a pour côtés ${liste}. Il est rectangle : en quel sommet ?`,
    `On a vérifié que le triangle ${t.nom}, où ${liste}, est rectangle. Quel est le sommet de l’angle droit ?`,
    `Montre que le triangle ${t.nom} est rectangle, sachant que ${liste}, puis indique en quel sommet.`,
  ]);
  return {
    text,
    format: "qcm",
    choices: shuffle([`en ${t.droit}`, `en ${t.p}`, `en ${t.q}`]),
    expected: [`en ${t.droit}`],
    comparator: "mcq_exact",
    explanation:
      "Définition : dans un triangle rectangle, l’angle droit est en face de l’hypoténuse, le plus grand côté.\n\n" +
      `Méthode : on vérifie l’égalité avec le plus grand côté [${t.hyp}], puis on prend le sommet qu’il ne touche pas.\n\n` +
      `Calcul : ${redactionReciproque(t, a, b, c)}\n\n` +
      `Conclusion : le triangle ${t.nom} est rectangle en ${t.droit}.`,
    canvas: figureALEchelle({
      labels: t.labels, AB: a, CA: b, BC: c,
      sideLabels: { AB: fr(a), CA: fr(b), BC: fr(c) },
    }),
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
  const text = randomChoice([
    `Le triangle ${t.nom} a pour côtés ${liste}. Est-il rectangle, et si oui en quel sommet ?`,
    `Dans le triangle ${t.nom}, ${liste}. Que peut-on conclure ?`,
    `On mesure les côtés du triangle ${t.nom} : ${liste}. Quelle conclusion est juste ?`,
  ]);
  return {
    text,
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

/** ★4 — rédiger la conclusion de la réciproque. */
function genConclureExplique(): Q {
  const vrai = randomChoice([true, false]);
  const [a, b, c] = longueursReciproque(vrai, randomChoice(["simple", "varie", "decimal"] as SorteTriplet[]));
  const t = tirerTriangle();
  const u = uniteDe(a, b, c);
  const liste = listeCotes(t, a, b, c, u);
  const text = randomChoice([
    `Le triangle ${t.nom} a pour côtés ${liste}. Est-il rectangle ? Rédige ta réponse en citant la propriété utilisée.`,
    `Dans le triangle ${t.nom}, ${liste}. Explique, avec deux calculs séparés, si ce triangle est rectangle.`,
    `Justifie si le triangle ${t.nom}, où ${liste}, est rectangle ou non.`,
  ]);
  return {
    text,
    format: "open",
    expected: vrai ? ["réciproque", "rectangle", fr(sq(c))] : ["pas rectangle", "n’est pas", fr(sq(c))],
    comparator: "contains_keyword",
    explanation:
      "Définition : la réciproque du théorème de Pythagore permet de prouver qu’un triangle est rectangle.\n\n" +
      "Méthode : plus grand côté, puis « d’une part », « d’autre part », puis la phrase de conclusion.\n\n" +
      `Calcul : ${redactionReciproque(t, a, b, c)}\n\n` +
      `Conclusion : ${vrai ? `${t.nom} est rectangle en ${t.droit}` : `${t.nom} n’est pas rectangle`}.`,
  };
}

/* =========================================================================
   RÉDIGER
========================================================================= */

/** ★3 — choisir la bonne phrase : début du théorème, conclusion de la réciproque. */
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
      text: `Dans le triangle ${t.nom}, d’une part ${t.hyp}² = ${fr(sq(h))}, d’autre part ${t.c1}² + ${t.c2}² = ${fr(sq(x1) + sq(x2))}. ${question}`,
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
  const bon = `${t.c2}² = ${t.hyp}² - ${t.c1}²`;
  return {
    text: randomChoice([
      `Le triangle ${t.nom} est rectangle en ${t.droit}. On connaît ${t.hyp} et ${t.c1}, on cherche ${t.c2}. Quelle égalité écrire ?`,
      `Dans le triangle ${t.nom} rectangle en ${t.droit}, on cherche ${t.c2} à partir de l’hypoténuse et de ${t.c1}. Quelle égalité convient ?`,
    ]),
    format: "qcm",
    choices: qcm(bon, [
      `${t.c2}² = ${t.hyp}² + ${t.c1}²`,
      `${t.hyp}² = ${t.c2}² - ${t.c1}²`,
      `${t.c2} = ${t.hyp} - ${t.c1}`,
      `${t.c2}² = ${t.c1}² - ${t.hyp}²`,
    ]),
    expected: [bon],
    comparator: "mcq_exact",
    explanation:
      `Définition : d’après le théorème de Pythagore, ${t.hyp}² = ${t.c1}² + ${t.c2}².\n\n` +
      `Méthode : on isole ${t.c2}² : on retire ${t.c1}² des deux côtés.\n\n` +
      `Calcul : ${t.c2}² = ${t.hyp}² - ${t.c1}².\n\n` +
      `Conclusion : on soustrait, car [${t.c2}] n’est pas l’hypoténuse.`,
  };
}

/** ★4 — le calcul qui donne l'hypoténuse au carré. */
function genEgaliteHyp(): Q {
  const t = tirerTriangle();
  const [x1, x2] = tirerTriplet("varie");
  const u = randomChoice(UNITES);
  const A = fr(x1);
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
    choices: qcm(bon, [`${A} + ${B}`, `(${A} + ${B})²`, `${g}² - ${p}²`, `${A} × ${B}`, `2 × ${A} + 2 × ${B}`]),
    expected: [bon],
    comparator: "mcq_exact",
    explanation:
      `Définition : ${t.nom} est rectangle en ${t.droit}, son hypoténuse est [${t.hyp}].\n\n` +
      `Méthode : ${t.hyp}² = ${t.c1}² + ${t.c2}² : on additionne les CARRÉS, pas les longueurs.\n\n` +
      `Calcul : ${t.hyp}² = ${A}² + ${B}² = ${fr(sq(x1) + sq(x2))}.\n\n` +
      `Conclusion : le bon calcul est ${bon}.`,
  };
}

/** ★4 — ce qu'on compare pour la réciproque. */
function genComparaison(): Q {
  const [a, b, c] = longueursReciproque(randomChoice([true, false]), randomChoice(["simple", "varie", "decimal"] as SorteTriplet[]));
  const t = tirerTriangle();
  const u = uniteDe(a, b, c);
  const liste = listeCotes(t, a, b, c, u);
  const A = fr(a);
  const B = fr(b);
  const C = fr(c);
  const bon = `${C}² et ${A}² + ${B}²`;
  return {
    text: randomChoice([
      `Pour savoir si le triangle ${t.nom} est rectangle, avec ${liste}, quelle comparaison faut-il faire ?`,
      `Le triangle ${t.nom} a pour côtés ${liste}. Pour appliquer la réciproque du théorème de Pythagore, que compare-t-on ?`,
      `On veut prouver, ou refuser, un angle droit dans le triangle ${t.nom} : ${liste}. Quels nombres compare-t-on ?`,
    ]),
    format: "qcm",
    choices: qcm(bon, [`${A}² et ${B}² + ${C}²`, `${C} et ${A} + ${B}`, `${C}² et ${A} × ${B}`, `${B}² et ${A}² + ${C}²`, `${C}² et (${A} + ${B})²`]),
    expected: [bon],
    comparator: "mcq_exact",
    explanation:
      "Définition : la réciproque compare le carré du PLUS GRAND côté à la somme des carrés des deux autres.\n\n" +
      "Méthode : on repère le plus grand côté, quel que soit l’ordre de l’énoncé.\n\n" +
      `Calcul : le plus grand côté est ${t.hyp} = ${C} ${u} ; on compare ${C}² et ${A}² + ${B}².\n\n` +
      `Conclusion : on compare ${bon}.`,
  };
}

/** ★4 — le calcul qui donne un côté de l'angle droit au carré. */
function genEgaliteCote(): Q {
  const t = tirerTriangle();
  const [x1, , h] = tirerTriplet("varie");
  const u = randomChoice(UNITES);
  const A = fr(x1);
  const H = fr(h);
  const bon = `${H}² - ${A}²`;
  return {
    text: randomChoice([
      `Le triangle ${t.nom} est rectangle en ${t.droit} ; ${t.hyp} = ${H} ${u} et ${t.c1} = ${A} ${u}. Quel calcul donne ${t.c2}² ?`,
      `Complète : « Dans le triangle ${t.nom} rectangle en ${t.droit}, ${t.c2}² = … », sachant que ${t.hyp} = ${H} ${u} et ${t.c1} = ${A} ${u}.`,
      `Dans le triangle ${t.nom} rectangle en ${t.droit}, ${t.c1} = ${A} ${u} et l’hypoténuse mesure ${H} ${u}. Quel calcul permet de trouver ${t.c2} ?`,
    ]),
    format: "qcm",
    choices: qcm(bon, [`${H}² + ${A}²`, `${A}² - ${H}²`, `${H} - ${A}`, `(${H} - ${A})²`, `${H} + ${A}`]),
    expected: [bon],
    comparator: "mcq_exact",
    explanation:
      `Définition : ${t.hyp}² = ${t.c1}² + ${t.c2}², donc ${t.c2}² = ${t.hyp}² - ${t.c1}².\n\n` +
      "Méthode : on cherche un côté de l’angle droit : on soustrait le carré du côté connu au carré de l’hypoténuse.\n\n" +
      `Calcul : ${t.c2}² = ${H}² - ${A}² = ${fr(sq(h) - sq(x1))}.\n\n` +
      `Conclusion : le bon calcul est ${bon}.`,
  };
}

/** ★4 — rédiger le calcul complet. */
function genRedigeOpen(): Q {
  const t = tirerTriangle();
  const [x1, x2, h] = tirerTriplet("varie");
  const u = randomChoice(UNITES);
  if (randomChoice([true, false])) {
    return {
      text: randomChoice([
        `Le triangle ${t.nom} est rectangle en ${t.droit}, avec ${t.c1} = ${fr(x1)} ${u} et ${t.c2} = ${fr(x2)} ${u}. Rédige le calcul de ${t.hyp}.`,
        `Rédige en trois lignes le calcul de l’hypoténuse du triangle ${t.nom} rectangle en ${t.droit}, sachant que ${t.c1} = ${fr(x1)} ${u} et ${t.c2} = ${fr(x2)} ${u}.`,
      ]),
      format: "open",
      expected: ["rectangle", "Pythagore", `${t.hyp}²`],
      comparator: "contains_keyword",
      explanation: explHypNomme(t, x1, x2, u),
    };
  }
  return {
    text: randomChoice([
      `Le triangle ${t.nom} est rectangle en ${t.droit}, avec ${t.hyp} = ${fr(h)} ${u} et ${t.c1} = ${fr(x1)} ${u}. Rédige le calcul de ${t.c2}.`,
      `Rédige en trois lignes le calcul de ${t.c2} dans le triangle ${t.nom} rectangle en ${t.droit}, où l’hypoténuse mesure ${fr(h)} ${u} et ${t.c1} = ${fr(x1)} ${u}.`,
    ]),
    format: "open",
    expected: ["rectangle", "Pythagore", `${t.c2}²`],
    comparator: "contains_keyword",
    explanation: explCoteNomme(t, h, x1, u),
  };
}

/* =========================================================================
   DÉFIS
========================================================================= */

const NOMS_RECTANGLES = ["ABCD", "EFGH", "MNPQ", "RSTU", "IJKL", "WXYZ", "KLMN", "PQRS"];
const OBJETS_RECTANGLES: { gn: string; unite: string; triplets: [number, number, number][] }[] = [
  { gn: "Un écran", unite: "cm", triplets: [[48, 36, 60], [32, 24, 40], [80, 60, 100]] },
  { gn: "Une table", unite: "cm", triplets: [[160, 120, 200], [120, 50, 130], [150, 80, 170]] },
  { gn: "Un tapis", unite: "m", triplets: [[2.4, 1.8, 3], [2, 1.5, 2.5], [2.4, 1, 2.6]] },
  { gn: "Une fenêtre", unite: "cm", triplets: [[120, 90, 150], [80, 60, 100], [105, 100, 145]] },
  { gn: "Un panneau solaire", unite: "cm", triplets: [[160, 120, 200], [168, 70, 182]] },
  { gn: "Une feuille de dessin", unite: "cm", triplets: [[40, 30, 50], [24, 18, 30], [32, 24, 40]] },
  { gn: "Un champ", unite: "m", triplets: [[120, 50, 130], [150, 80, 170], [240, 70, 250]] },
  { gn: "Une plaque de chocolat", unite: "cm", triplets: [[16, 12, 20], [24, 7, 25], [15, 8, 17]] },
  { gn: "Un tableau de classe", unite: "cm", triplets: [[240, 100, 260], [300, 160, 340], [200, 150, 250]] },
];

/** ★4 — la diagonale d'un rectangle (ou d'un carré) nommé, dans un objet. */
function genDiagonaleRectangle(): Q {
  const R = randomChoice(NOMS_RECTANGLES);
  const [P1, P2, P3] = R.split("");
  const o = randomChoice(OBJETS_RECTANGLES);
  const L = (x: number) => `${fr(x)} ${o.unite}`;
  if (Math.random() < 0.25) {
    // Le carré : la diagonale ne tombe jamais juste.
    // Le côté du carré : la largeur d'un des formats de l'objet, plausible.
    const cote = randomChoice(o.triplets)[1];
    const S = 2 * sq(cote);
    const d = arrondi1(Math.sqrt(S));
    return {
      text: randomChoice([
        `${o.gn} a la forme d’un carré ${R} de ${L(cote)} de côté. Quelle est la longueur de sa diagonale [${P1}${P3}] ?` + randomChoice(SUFFIXES_ARRONDI),
        `Le carré ${R} mesure ${L(cote)} de côté. Calcule la longueur de la diagonale [${P1}${P3}], arrondie au dixième.`,
      ]),
      format: "short",
      expected: [fr(d)],
      comparator: "number_equal",
      explanation:
        `Définition : un carré a quatre angles droits ; le triangle ${P1}${P2}${P3} est rectangle en ${P2}, d’hypoténuse [${P1}${P3}].\n\n` +
        `Méthode : d’après le théorème de Pythagore, ${P1}${P3}² = ${P1}${P2}² + ${P2}${P3}².\n\n` +
        `Calcul : ${P1}${P3}² = ${fr(cote)}² + ${fr(cote)}² = ${fr(sq(cote))} + ${fr(sq(cote))} = ${fr(S)}, donc ${P1}${P3} = √${fr(S)} ≈ ${fr(d)}.\n\n` +
        `Conclusion : la diagonale mesure environ ${L(d)}.`,
    };
  }
  let [a, b] = randomChoice(o.triplets);
  if (Math.random() < 0.4) a = a + (o.unite === "m" ? 0.1 : 1);
  a = Math.round(a * 10) / 10;
  const S = sq(a) + sq(b);
  const exact = racineExacte(S);
  const d = arrondi1(Math.sqrt(S));
  const text =
    randomChoice([
      `${o.gn} a la forme d’un rectangle ${R} avec ${P1}${P2} = ${L(a)} et ${P2}${P3} = ${L(b)}. Combien mesure la diagonale [${P1}${P3}] ?`,
      `Le rectangle ${R} représente ${o.gn.toLowerCase()} de ${L(a)} sur ${L(b)}. Calcule la longueur ${P1}${P3}.`,
      `${o.gn} rectangulaire mesure ${L(a)} de long et ${L(b)} de large. Quelle est la longueur de sa diagonale ?`,
    ]) + (exact ? "" : randomChoice(SUFFIXES_ARRONDI));
  return {
    text,
    format: "short",
    expected: [fr(d)],
    comparator: "number_equal",
    explanation:
      `Définition : un rectangle a quatre angles droits ; la diagonale est l’hypoténuse d’un triangle rectangle dont les côtés de l’angle droit sont la longueur et la largeur.\n\n` +
      "Méthode : diagonale² = longueur² + largeur².\n\n" +
      `Calcul : d² = ${fr(a)}² + ${fr(b)}² = ${fr(sq(a))} + ${fr(sq(b))} = ${fr(S)}, donc d = √${fr(S)} ${exact ? "=" : "≈"} ${fr(d)}.\n\n` +
      `Conclusion : la diagonale mesure ${exact ? "" : "environ "}${L(d)}.`,
  };
}

/** ★5 — un dénivelé : distance en ligne droite, ou hauteur gagnée. */
const DENIVELES: { lieu: string; trajet: string }[] = [
  { lieu: "Dans les Alpes", trajet: "un téléphérique" },
  { lieu: "Dans les Pyrénées", trajet: "un télésiège" },
  { lieu: "À Montmartre", trajet: "un funiculaire" },
  { lieu: "Dans une station de ski", trajet: "un téléski" },
  { lieu: "Dans un parc d’aventure", trajet: "une tyrolienne" },
  { lieu: "Dans le Jura", trajet: "une piste de luge rectiligne" },
  { lieu: "À La Réunion, au-dessus d’une ravine", trajet: "un câble de tyrolienne" },
  { lieu: "À La Réunion, dans le cirque de Salazie", trajet: "un sentier rectiligne" },
];
function genDenivele(): Q {
  const d = randomChoice(DENIVELES);
  const [h, l, c] = randomChoice([[30, 40, 50], [50, 120, 130], [80, 150, 170], [70, 240, 250], [200, 210, 290], [90, 120, 150], [60, 80, 100]] as [number, number, number][]);
  const cherche = randomChoice(["hyp", "hauteur", "horizontal"]);
  const base = `${d.lieu}, ${d.trajet} relie deux points`;
  const texte =
    cherche === "hyp"
      ? `${base} : le point d’arrivée est ${h} m plus haut que le départ, et ${l} m plus loin à l’horizontale. Quelle est la longueur du trajet en ligne droite ?`
      : cherche === "hauteur"
        ? `${base} distants de ${c} m en ligne droite. À l’horizontale, ils sont écartés de ${l} m. Quel est le dénivelé entre les deux points ?`
        : `${base} distants de ${c} m en ligne droite, avec un dénivelé de ${h} m. Quelle est la distance horizontale entre les deux points ?`;
  const rep = cherche === "hyp" ? c : cherche === "hauteur" ? h : l;
  return {
    text: texte,
    format: "short",
    expected: [String(rep)],
    comparator: "number_equal",
    explanation:
      "Définition : le trajet en ligne droite, la distance horizontale et le dénivelé forment un triangle rectangle ; le trajet est l’hypoténuse.\n\n" +
      (cherche === "hyp"
        ? "Méthode : on cherche l’hypoténuse : on additionne les carrés.\n\n" +
          `Calcul : ${h}² + ${l}² = ${fr(h * h)} + ${fr(l * l)} = ${fr(c * c)}, donc la longueur vaut √${fr(c * c)} = ${c} m.\n\n`
        : "Méthode : on cherche un côté de l’angle droit : on soustrait les carrés.\n\n" +
          `Calcul : ${c}² - ${cherche === "hauteur" ? l : h}² = ${fr(c * c)} - ${fr((cherche === "hauteur" ? l : h) ** 2)} = ${fr(rep * rep)}, donc la longueur vaut √${fr(rep * rep)} = ${rep} m.\n\n`) +
      `Conclusion : la réponse est ${rep} m.`,
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
  const text = randomChoice([
    `Triangle ${t1.nom} : ${l1}. Triangle ${t2.nom} : ${l2}. Lequel est rectangle ?`,
    `On a mesuré deux triangles. Dans ${t1.nom}, ${l1}. Dans ${t2.nom}, ${l2}. Lequel est rectangle ?`,
    `Voici deux triangles : ${t1.nom}, où ${l1}, et ${t2.nom}, où ${l2}. Lequel a un angle droit ?`,
  ]);
  return {
    text,
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
function genProblemeDeuxEtapes(): Q {
  const mode = randomInt(0, 2);
  const [a, b, c] = tirerTriplet("simple");
  if (mode === 0) {
    const ctx = randomChoice([
      `Un jardin a la forme d’un triangle rectangle dont les côtés de l’angle droit mesurent ${a} m et ${b} m. Quelle longueur de clôture faut-il pour en faire le tour ?`,
      `Une voile triangulaire, rectangle au pied du mât, a deux bords perpendiculaires de ${a} dm et ${b} dm. On coud un ourlet tout autour. Quelle est la longueur de l’ourlet, en dm ?`,
      `Un panneau de signalisation est un triangle rectangle dont les côtés de l’angle droit mesurent ${a} cm et ${b} cm. Quel est son périmètre, en cm ?`,
      `Un randonneur fait une boucle : ${a} km vers le nord, ${b} km vers l’est, puis il revient en ligne droite au départ. Quelle distance totale parcourt-il, en km ?`,
    ]);
    return {
      text: ctx,
      format: "short",
      expected: [String(a + b + c)],
      comparator: "number_equal",
      explanation:
        "Définition : il faut les TROIS côtés ; le troisième est l’hypoténuse d’un triangle rectangle.\n\n" +
        "Méthode : on calcule d’abord l’hypoténuse avec Pythagore, puis on additionne les trois longueurs.\n\n" +
        `Calcul : ${a}² + ${b}² = ${a * a} + ${b * b} = ${c * c}, donc le troisième côté mesure √${c * c} = ${c}. Puis ${a} + ${b} + ${c} = ${a + b + c}.\n\n` +
        `Conclusion : la réponse est ${a + b + c}.`,
    };
  }
  if (mode === 1) {
    const ctx = randomChoice([
      `Pour traverser un parc rectangulaire de ${a} m sur ${b} m, Paul longe deux côtés. Combien de mètres économiserait-il en coupant tout droit en diagonale ?`,
      `Un champ rectangulaire mesure ${a} m sur ${b} m. Un chien va d’un coin au coin opposé en ligne droite, son maître en longeant les bords. Combien de mètres le maître fait-il de plus ?`,
      `Pour aller d’un coin à l’autre d’une place rectangulaire de ${a} m sur ${b} m, on peut longer deux côtés ou traverser en diagonale. Quelle distance gagne-t-on en traversant ?`,
    ]);
    return {
      text: ctx,
      format: "short",
      expected: [String(a + b - c)],
      comparator: "number_equal",
      explanation:
        "Définition : la diagonale est l’hypoténuse du triangle rectangle formé par deux côtés du rectangle.\n\n" +
        "Méthode : on calcule la diagonale, puis on la retire au trajet qui longe les bords.\n\n" +
        `Calcul : diagonale² = ${a}² + ${b}² = ${c * c}, donc diagonale = ${c} m. En longeant : ${a} + ${b} = ${a + b} m. Gain : ${a + b} - ${c} = ${a + b - c} m.\n\n` +
        `Conclusion : on gagne ${a + b - c} m.`,
    };
  }
  const ctx = randomChoice([
    `Un drone monte verticalement de ${a} m, avance horizontalement de ${b} m, puis revient en ligne droite à son point de départ. Quelle distance totale a-t-il parcourue ?`,
    `Une nageuse traverse une piscine de ${a} m sur ${b} m en diagonale, puis revient au départ en longeant les deux bords. Quelle distance a-t-elle nagée en tout ?`,
    `Un bateau fait ${a} km vers l’est puis ${b} km vers le sud, et rentre au port en ligne droite. Combien de kilomètres a-t-il parcourus en tout ?`,
  ]);
  return {
    text: ctx,
    format: "short",
    expected: [String(a + b + c)],
    comparator: "number_equal",
    explanation:
      "Définition : le retour en ligne droite est l’hypoténuse d’un triangle rectangle.\n\n" +
      "Méthode : on calcule cette hypoténuse, puis on additionne les trois trajets.\n\n" +
      `Calcul : ${a}² + ${b}² = ${a * a} + ${b * b} = ${c * c}, donc le trajet direct mesure ${c}. Total : ${a} + ${b} + ${c} = ${a + b + c}.\n\n` +
      `Conclusion : la distance totale est ${a + b + c}.`,
  };
}

/** ★5 — déplacements à angle droit (bateau, avion, cycliste…). */
function genDeplacement(): Q {
  // `sortes` : des distances plausibles pour chacun (pas de robot aspirateur sur 45 m).
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
  const text =
    randomChoice([
      `${mobile.qui} ${mobile.verbe} ${L(a)} ${d1}, puis ${L(b)} ${d2}. À quelle distance en ligne droite se trouve-t-${fem ? "elle" : "il"} de son point de départ ?`,
      `${mobile.qui} part d’un point O, ${mobile.verbe} ${L(a)} ${d1}, puis tourne à angle droit et parcourt ${L(b)} ${d2}. Quelle distance ${fem ? "la" : "le"} sépare alors de O ?`,
    ]) + (exact ? "" : randomChoice(SUFFIXES_ARRONDI));
  return {
    text,
    format: "short",
    expected: [fr(c)],
    comparator: "number_equal",
    explanation:
      "Définition : les deux trajets sont perpendiculaires : ils forment les côtés de l’angle droit ; la distance directe est l’hypoténuse.\n\n" +
      "Méthode : distance² = premier trajet² + second trajet².\n\n" +
      `Calcul : ${fr(a)}² + ${fr(b)}² = ${fr(sq(a))} + ${fr(sq(b))} = ${fr(S)}, donc distance = √${fr(S)} ${exact ? "=" : "≈"} ${fr(c)}.\n\n` +
      `Conclusion : la distance est ${exact ? "" : "d’environ "}${L(c)}.`,
  };
}

/** ★5 — justifier le choix théorème / réciproque. */
function genDefiExplique(): Q {
  const t = tirerTriangle();
  const [a, b, c] = tirerTriplet("varie");
  const u = randomChoice(UNITES);
  const liste = listeCotes(t, a, b, c, u);
  const mode = randomInt(0, 2);
  const text = [
    `Un élève connaît les trois longueurs du triangle ${t.nom} : ${liste}. Explique pourquoi il doit utiliser la réciproque et non le théorème direct pour savoir si ${t.nom} est rectangle.`,
    `On sait que le triangle ${t.nom} est rectangle en ${t.droit}, et on connaît ${t.c1} = ${fr(a)} ${u} et ${t.c2} = ${fr(b)} ${u}. Explique quelle propriété utiliser pour calculer ${t.hyp}, et pourquoi pas la réciproque.`,
    `Une élève écrit : « Dans le triangle ${t.nom}, ${liste}, donc d’après le théorème de Pythagore ${t.nom} est rectangle. » Explique ce qui ne va pas dans sa rédaction.`,
  ][mode];
  return {
    text,
    format: "open",
    expected: mode === 1 ? ["théorème", "rectangle", "calculer"] : ["réciproque", "rectangle", "longueurs"],
    comparator: "contains_keyword",
    explanation:
      "Définition : le théorème de Pythagore part d’un triangle qu’on SAIT rectangle et sert à calculer une longueur ; la réciproque part de trois longueurs et sert à PROUVER que le triangle est rectangle.\n\n" +
      "Méthode : on se demande ce qu’on sait déjà (l’angle droit ?) et ce qu’on cherche (une longueur ? un angle droit ?).\n\n" +
      (mode === 1
        ? `Calcul : l’angle droit est connu, en ${t.droit} ; on cherche ${t.hyp} : théorème de Pythagore, ${t.hyp}² = ${fr(a)}² + ${fr(b)}² = ${fr(sq(a) + sq(b))}, donc ${t.hyp} = ${fr(c)} ${u}.\n\n`
        : `Calcul : ${redactionReciproque(t, a, b, c)}\n\n`) +
      (mode === 1
        ? "Conclusion : on sait déjà que le triangle est rectangle, on cherche une longueur : c’est le théorème direct."
        : "Conclusion : on ne sait pas d’avance que le triangle est rectangle : seule la réciproque permet de le prouver."),
  };
}

export const pythagoreBank: TutorBankItemV4[] = [
  // =========================
  // CARRÉS ET RACINES
  // =========================
  {
    kind: "fixed",
    id: "pythagore_theoreme_carre_racine_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_carre_racine",
    difficulty: 1,
    theme: "neutral",
    text: "Combien vaut 5² ?",
    format: "qcm",
    choices: ["10", "25", "7", "15"],
    expected: ["25"],
    comparator: "mcq_exact",
    hint: "5² signifie 5 × 5.",
    explanation: "Définition : dans un triangle rectangle, le théorème de Pythagore relie les longueurs des trois côtés.\n\n" +
          "Méthode : on commence par vérifier que le triangle est rectangle et par repérer l’hypoténuse.\n\nCalcul : " +
          ("5² = 5 × 5 = 25.") +
          "\n\nConclusion : la longueur ou l’affirmation obtenue respecte le triangle rectangle.",
    tags: ["pythagore_theoreme_theoreme", "carre", "qcm"],
  },
  {
    kind: "fixed",
    id: "pythagore_theoreme_carre_racine_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_carre_racine",
    difficulty: 1,
    theme: "neutral",
    text: "Combien vaut √49 ?",
    format: "qcm",
    choices: ["6", "7", "8", "14"],
    expected: ["7"],
    comparator: "mcq_exact",
    hint: "Cherche le nombre qui multiplié par lui-même donne 49.",
    explanation: "Définition : dans un triangle rectangle, le théorème de Pythagore relie les longueurs des trois côtés.\n\n" +
          "Méthode : on commence par vérifier que le triangle est rectangle et par repérer l’hypoténuse.\n\nCalcul : " +
          ("Comme 7² = 49, alors √49 = 7.") +
          "\n\nConclusion : la longueur ou l’affirmation obtenue respecte le triangle rectangle.",
    tags: ["pythagore_theoreme_theoreme", "racine", "qcm"],
  },
  {
    kind: "fixed",
    id: "pythagore_theoreme_carre_racine_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_carre_racine",
    difficulty: 1,
    theme: "neutral",
    text: "Un élève écrit : « 3² = 6 ». Combien vaut vraiment 3² ?",
    format: "qcm",
    choices: ["6", "9", "5", "12"],
    expected: ["9"],
    comparator: "mcq_exact",
    hint: "Attention : 3² ne veut pas dire 3 × 2.",
    explanation: "Définition : dans un triangle rectangle, le théorème de Pythagore relie les longueurs des trois côtés.\n\n" +
          "Méthode : on commence par vérifier que le triangle est rectangle et par repérer l’hypoténuse.\n\nCalcul : " +
          ("3² = 3 × 3 = 9.") +
          "\n\nConclusion : la longueur ou l’affirmation obtenue respecte le triangle rectangle.",
    tags: ["pythagore_theoreme_theoreme", "carre", "piege"],
  },
  {
    kind: "fixed",
    id: "pythagore_theoreme_carre_racine_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_carre_racine",
    difficulty: 1,
    theme: "neutral",
    text: "Sans calculatrice, donne √36.",
    format: "qcm",
    choices: ["5", "6", "18", "9"],
    expected: ["6"],
    comparator: "mcq_exact",
    hint: "6 × 6 = 36.",
    explanation: "Définition : dans un triangle rectangle, le théorème de Pythagore relie les longueurs des trois côtés.\n\n" +
          "Méthode : on commence par vérifier que le triangle est rectangle et par repérer l’hypoténuse.\n\nCalcul : " +
          ("Comme 6² = 36, alors √36 = 6.") +
          "\n\nConclusion : la longueur ou l’affirmation obtenue respecte le triangle rectangle.",
    tags: ["pythagore_theoreme_theoreme", "racine"],
  },

 {
  kind: "template",
  id: "pythagore_theoreme_carre_racine_tpl_2",
  niveau: "4e",
  matiere: "maths",
  notionId: "pythagore_theoreme",
  microId: "pythagore_carre_racine",
  difficulty: 1,
  theme: "neutral",
  hint: "Cherche le nombre positif dont le carré donne ce résultat.",
  tags: ["pythagore_theoreme_theoreme", "racine", "template"],
  generate: () => genCarreRacineCourt(),
},
  {
    kind: "template",
    id: "pythagore_theoreme_carre_racine_tpl_6",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_carre_racine",
    difficulty: 1,
    theme: "neutral",
    hint: "Le carré de n, c’est n × n ; la racine carrée de N, c’est le nombre positif dont le carré vaut N.",
    tags: ["pythagore_theoreme_theoreme", "carre", "racine", "qcm", "template"],
    generate: () => genCarreRacineQcm1(),
  },
  {
    kind: "template",
    id: "pythagore_theoreme_carre_racine_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_carre_racine",
    difficulty: 2,
    theme: "neutral",
    hint: "Calcule chaque carré, puis additionne.",
    tags: ["pythagore_theoreme_theoreme", "carre", "somme", "template"],
    generate: () => genSommeCarres(),
  },
  {
    kind: "template",
    id: "pythagore_theoreme_carre_racine_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_carre_racine",
    difficulty: 2,
    theme: "neutral",
    hint: "Distingue bien carré et racine carrée.",
    tags: ["pythagore_theoreme_theoreme", "carre", "racine", "qcm", "template"],
    generate: () => genCarreRacineQcm2(),
  },
    {
    kind: "fixed",
    id: "pythagore_theoreme_carre_racine_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_carre_racine",
    difficulty: 2,
    theme: "neutral",
    text: "Explique pourquoi 3² ne vaut pas 6.",
    format: "open",
    expected: ["3", "3", "9"],
    comparator: "contains_keyword",
    hint: "Un carré signifie multiplier le nombre par lui-même.",
    explanation: "Définition : dans un triangle rectangle, le théorème de Pythagore relie les longueurs des trois côtés.\n\n" +
          "Méthode : on commence par vérifier que le triangle est rectangle et par repérer l’hypoténuse.\n\nCalcul : " +
          ("3² signifie 3 × 3, donc 3² = 9. Ce n’est pas 3 × 2.") +
          "\n\nConclusion : la longueur ou l’affirmation obtenue respecte le triangle rectangle.",
    tags: ["pythagore_theoreme_theoreme", "carre", "open", "piege"],
  },

  // =========================
  // RECONNAÎTRE
  // =========================
  {
    kind: "fixed",
    id: "pythagore_theoreme_reconnaitre_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    text: "Le théorème de Pythagore s’utilise directement dans…",
    format: "qcm",
    choices: [
      "un triangle rectangle",
      "un carré",
      "un triangle quelconque",
      "un parallélogramme",
    ],
    expected: ["un triangle rectangle"],
    comparator: "mcq_exact",
    hint: "Pythagore concerne les triangles rectangles.",
    explanation:
      "Définition : dans un triangle rectangle, le théorème de Pythagore relie les longueurs des trois côtés.\n\n" +
          "Méthode : on commence par vérifier que le triangle est rectangle et par repérer l’hypoténuse.\n\nCalcul : " +
          ("Le théorème de Pythagore s’applique dans un triangle rectangle.") +
          "\n\nConclusion : la longueur ou l’affirmation obtenue respecte le triangle rectangle.",
    tags: ["pythagore_theoreme_theoreme", "reconnaitre"],
  },
  {
    kind: "fixed",
    id: "pythagore_theoreme_reconnaitre_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    text: "Dans un triangle rectangle, l’hypoténuse est…",
    format: "qcm",
    choices: [
      "le côté opposé à l’angle droit",
      "le plus petit côté",
      "un côté de l’angle droit",
      "toujours le côté horizontal",
    ],
    expected: ["le côté opposé à l’angle droit"],
    comparator: "mcq_exact",
    hint: "L’hypoténuse est en face de l’angle droit.",
    explanation:
      "Définition : dans un triangle rectangle, le théorème de Pythagore relie les longueurs des trois côtés.\n\n" +
          "Méthode : on commence par vérifier que le triangle est rectangle et par repérer l’hypoténuse.\n\nCalcul : " +
          ("Dans un triangle rectangle, l’hypoténuse est le côté opposé à l’angle droit.") +
          "\n\nConclusion : la longueur ou l’affirmation obtenue respecte le triangle rectangle.",
    tags: ["pythagore_theoreme_theoreme", "hypotenuse"],
  },
  {
    kind: "fixed",
    id: "pythagore_theoreme_reconnaitre_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Le plus grand côté d’un triangle est-il toujours appelé hypoténuse ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Le mot hypoténuse est réservé aux triangles rectangles.",
    explanation:
      "Définition : dans un triangle rectangle, le théorème de Pythagore relie les longueurs des trois côtés.\n\n" +
          "Méthode : on commence par vérifier que le triangle est rectangle et par repérer l’hypoténuse.\n\nCalcul : " +
          ("Non. On parle d’hypoténuse seulement dans un triangle rectangle.") +
          "\n\nConclusion : la longueur ou l’affirmation obtenue respecte le triangle rectangle.",
    tags: ["pythagore_theoreme_theoreme", "hypotenuse", "piege"],
  },
  {
    kind: "template",
    id: "pythagore_theoreme_reconnaitre_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    hint: "L’hypoténuse est le côté opposé à l’angle droit.",
    tags: ["pythagore_theoreme_theoreme", "hypotenuse", "canvas", "template"],
    generate: () => genReconnaitreFigure(),
  },
  {
    kind: "template",
    id: "pythagore_theoreme_reconnaitre_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche si le triangle est codé rectangle.",
    tags: ["pythagore_theoreme_theoreme", "triangle_rectangle", "canvas", "template"],
    // ⛔ RÉPARÉ LE 31/08/2026 (le nom servait au dessin, jamais à la question),
    // puis le 03/10/2026 : vingt noms, l'angle droit sur n'importe quel sommet,
    // quatre tournures, la figure à l'échelle.
    generate: () => genPeutOnAppliquer(),
  },
    {
    kind: "fixed",
    id: "pythagore_theoreme_reconnaitre_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Explique pourquoi on ne peut pas toujours utiliser le théorème de Pythagore dans n’importe quel triangle.",
    format: "open",
    expected: ["triangle", "rectangle"],
    comparator: "contains_keyword",
    hint: "Le théorème de Pythagore demande une condition sur le triangle.",
    explanation:
      "Définition : dans un triangle rectangle, le théorème de Pythagore relie les longueurs des trois côtés.\n\n" +
          "Méthode : on commence par vérifier que le triangle est rectangle et par repérer l’hypoténuse.\n\nCalcul : " +
          ("On utilise directement le théorème de Pythagore seulement dans un triangle rectangle.") +
          "\n\nConclusion : la longueur ou l’affirmation obtenue respecte le triangle rectangle.",
    tags: ["pythagore_theoreme_theoreme", "reconnaitre", "open"],
  },

  // =========================
  // CALCULER L’HYPOTÉNUSE
  // =========================
  {
    kind: "fixed",
    id: "pythagore_theoreme_calculer_hypotenuse_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_calculer_hypotenuse",
    difficulty: 2,
    theme: "neutral",
    text: "Le triangle DEF est rectangle en E, avec DE = 3 cm et EF = 4 cm. Combien mesure DF ?",
    format: "qcm",
    choices: ["5", "6", "7", "12"],
    expected: ["5"],
    comparator: "mcq_exact",
    hint: "3² + 4² = 9 + 16 = 25.",
    explanation: "Définition : dans un triangle rectangle, le théorème de Pythagore relie les longueurs des trois côtés.\n\n" +
          "Méthode : on commence par vérifier que le triangle est rectangle et par repérer l’hypoténuse.\n\nCalcul : " +
          ("c² = 3² + 4² = 25, donc c = √25 = 5.") +
          "\n\nConclusion : la longueur ou l’affirmation obtenue respecte le triangle rectangle.",
    tags: ["pythagore_theoreme_theoreme", "hypotenuse", "triplet"],
  },
  {
    kind: "fixed",
    id: "pythagore_theoreme_calculer_hypotenuse_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_calculer_hypotenuse",
    difficulty: 2,
    theme: "neutral",
    text: "Un triangle rectangle a pour côtés de l’angle droit 6 cm et 8 cm. Quelle est son hypoténuse ?",
    format: "qcm",
    choices: ["10", "12", "14", "48"],
    expected: ["10"],
    comparator: "mcq_exact",
    hint: "6² + 8² = 36 + 64 = 100.",
    explanation: "Définition : dans un triangle rectangle, le théorème de Pythagore relie les longueurs des trois côtés.\n\n" +
          "Méthode : on commence par vérifier que le triangle est rectangle et par repérer l’hypoténuse.\n\nCalcul : " +
          ("c² = 6² + 8² = 100, donc c = √100 = 10.") +
          "\n\nConclusion : la longueur ou l’affirmation obtenue respecte le triangle rectangle.",
    tags: ["pythagore_theoreme_theoreme", "hypotenuse", "triplet"],
  },
  {
    kind: "template",
    id: "pythagore_theoreme_calculer_hypotenuse_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_calculer_hypotenuse",
    difficulty: 2,
    theme: "neutral",
    hint: "Additionne les carrés des deux côtés de l’angle droit.",
    tags: ["pythagore_theoreme_theoreme", "hypotenuse", "triplet", "template"],
    generate: () => genHypNomme(),
  },
  {
    kind: "template",
    id: "pythagore_theoreme_calculer_hypotenuse_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_calculer_hypotenuse",
    difficulty: 3,
    theme: "neutral",
    hint: "On cherche l’hypoténuse : on additionne les carrés.",
    tags: ["pythagore_theoreme_theoreme", "hypotenuse", "qcm", "template"],
    generate: () => genHypQcmSituation(),
  },
    {
    kind: "template",
    id: "pythagore_theoreme_calculer_hypotenuse_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_calculer_hypotenuse",
    difficulty: 3,
    theme: "neutral",
    hint: "Quand on cherche l’hypoténuse, on additionne les carrés des deux côtés de l’angle droit.",
    tags: ["pythagore_theoreme_theoreme", "hypotenuse", "open", "template"],
    generate: () => genHypExplique(),
  },

  // =========================
  // CALCULER UN CÔTÉ
  // =========================
  {
    kind: "fixed",
    id: "pythagore_theoreme_calculer_cote_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_calculer_cote",
    difficulty: 2,
    theme: "neutral",
    text: "Un triangle rectangle a une hypoténuse de 5 cm et un côté de l’angle droit de 3 cm. Quel est l’autre côté ?",
    format: "qcm",
    choices: ["2", "4", "8", "16"],
    expected: ["4"],
    comparator: "mcq_exact",
    hint: "On calcule 5² - 3².",
    explanation: "Définition : dans un triangle rectangle, le théorème de Pythagore relie les longueurs des trois côtés.\n\n" +
          "Méthode : on commence par vérifier que le triangle est rectangle et par repérer l’hypoténuse.\n\nCalcul : " +
          ("L’autre côté vérifie b² = 5² - 3² = 25 - 9 = 16, donc b = 4.") +
          "\n\nConclusion : la longueur ou l’affirmation obtenue respecte le triangle rectangle.",
    tags: ["pythagore_theoreme_theoreme", "cote", "triplet"],
  },
  {
    kind: "fixed",
    id: "pythagore_theoreme_calculer_cote_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_calculer_cote",
    difficulty: 2,
    theme: "neutral",
    text: "Dans un triangle rectangle, l’hypoténuse mesure 10 cm et un côté de l’angle droit 6 cm. Combien mesure le troisième côté ?",
    format: "qcm",
    choices: ["4", "8", "12", "16"],
    expected: ["8"],
    comparator: "mcq_exact",
    hint: "On calcule 10² - 6².",
    explanation: "Définition : dans un triangle rectangle, le théorème de Pythagore relie les longueurs des trois côtés.\n\n" +
          "Méthode : on commence par vérifier que le triangle est rectangle et par repérer l’hypoténuse.\n\nCalcul : " +
          ("L’autre côté vérifie b² = 10² - 6² = 100 - 36 = 64, donc b = 8.") +
          "\n\nConclusion : la longueur ou l’affirmation obtenue respecte le triangle rectangle.",
    tags: ["pythagore_theoreme_theoreme", "cote", "triplet"],
  },
  {
    kind: "template",
    id: "pythagore_theoreme_calculer_cote_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_calculer_cote",
    difficulty: 3,
    theme: "neutral",
    hint: "On cherche un côté de l’angle droit : on soustrait les carrés.",
    tags: ["pythagore_theoreme_theoreme", "cote", "triplet", "template"],
    // Triplets variés ou décimaux ; un tirage sur trois à arrondir au dixième.
    generate: () => coteNomme(randomChoice(["varie", "decimal"] as SorteTriplet[]), Math.random() < 0.35),
  },
  {
    kind: "template",
    id: "pythagore_theoreme_calculer_cote_tpl_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_calculer_cote",
    difficulty: 2,
    theme: "neutral",
    hint: "On cherche un côté de l’angle droit : carré de l’hypoténuse MOINS carré de l’autre côté.",
    tags: ["pythagore_theoreme_theoreme", "cote", "triplet", "canvas", "template"],
    generate: () => coteNomme("simple", false),
  },
  {
    kind: "template",
    id: "pythagore_theoreme_calculer_cote_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_calculer_cote",
    difficulty: 3,
    theme: "neutral",
    hint: "Attention : pour un côté de l’angle droit, on ne fait pas une addition.",
    tags: ["pythagore_theoreme_theoreme", "cote", "piege", "qcm", "template"],
    generate: () => genCoteQcmSituation(),
  },
    {
    kind: "template",
    id: "pythagore_theoreme_calculer_cote_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_calculer_cote",
    difficulty: 4,
    theme: "neutral",
    hint: "Quand on cherche un côté de l’angle droit, on soustrait les carrés.",
    tags: ["pythagore_theoreme_theoreme", "cote", "open", "template"],
    generate: () => genCoteExplique(),
  },

  // =========================
  // RÉCIPROQUE : VÉRIFIER
  // =========================
  {
    kind: "fixed",
    id: "pythagore_theoreme_reciproque_verifier_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_reciproque_verifier",
    difficulty: 2,
    theme: "neutral",
    text: "L’égalité 3² + 4² = 5² est-elle vraie ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Compare 3² + 4² avec 5².",
    explanation: "Définition : dans un triangle rectangle, le théorème de Pythagore relie les longueurs des trois côtés.\n\n" +
          "Méthode : on commence par vérifier que le triangle est rectangle et par repérer l’hypoténuse.\n\nCalcul : " +
          ("3² + 4² = 9 + 16 = 25 et 5² = 25. L’égalité est vraie.") +
          "\n\nConclusion : la longueur ou l’affirmation obtenue respecte le triangle rectangle.",
    tags: ["pythagore_theoreme_theoreme", "reciproque", "verifier"],
  },
  {
    kind: "fixed",
    id: "pythagore_theoreme_reciproque_verifier_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_reciproque_verifier",
    difficulty: 2,
    theme: "neutral",
    text: "A-t-on 5² + 12² = 13² ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "25 + 144 = ?",
    explanation: "Définition : dans un triangle rectangle, le théorème de Pythagore relie les longueurs des trois côtés.\n\n" +
          "Méthode : on commence par vérifier que le triangle est rectangle et par repérer l’hypoténuse.\n\nCalcul : " +
          ("5² + 12² = 25 + 144 = 169 et 13² = 169. L’égalité est vraie.") +
          "\n\nConclusion : la longueur ou l’affirmation obtenue respecte le triangle rectangle.",
    tags: ["pythagore_theoreme_theoreme", "reciproque", "verifier"],
  },
  {
    kind: "fixed",
    id: "pythagore_theoreme_reciproque_verifier_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_reciproque_verifier",
    difficulty: 2,
    theme: "neutral",
    text: "Les nombres 4, 5 et 6 vérifient-ils l’égalité 6² = 4² + 5² ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Compare 16 + 25 avec 36.",
    explanation: "Définition : dans un triangle rectangle, le théorème de Pythagore relie les longueurs des trois côtés.\n\n" +
          "Méthode : on commence par vérifier que le triangle est rectangle et par repérer l’hypoténuse.\n\nCalcul : " +
          ("4² + 5² = 16 + 25 = 41 alors que 6² = 36. L’égalité est fausse.") +
          "\n\nConclusion : la longueur ou l’affirmation obtenue respecte le triangle rectangle.",
    tags: ["pythagore_theoreme_theoreme", "reciproque", "faux_triplet"],
  },
  {
    kind: "template",
    id: "pythagore_theoreme_reciproque_verifier_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_reciproque_verifier",
    difficulty: 3,
    theme: "neutral",
    hint: "Compare la somme des carrés des deux plus petits côtés avec le carré du plus grand.",
    tags: ["pythagore_theoreme_theoreme", "reciproque", "template"],
    generate: () => genEgaliteTriangle(),
  },
  {
    kind: "template",
    id: "pythagore_theoreme_reciproque_verifier_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_reciproque_verifier",
    difficulty: 2,
    theme: "neutral",
    hint: "Calcule séparément le carré du plus grand nombre et la somme des carrés des deux autres.",
    tags: ["pythagore_theoreme_theoreme", "reciproque", "verifier", "template"],
    generate: () => genEgaliteVraie(),
  },
    {
    kind: "template",
    id: "pythagore_theoreme_reciproque_verifier_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_reciproque_verifier",
    difficulty: 3,
    theme: "neutral",
    hint: "Compare la somme des carrés des deux plus petits côtés avec le carré du plus grand.",
    tags: ["pythagore_theoreme_theoreme", "reciproque", "verifier", "open", "template"],
    generate: () => genVerifierExplique(),
  },

  // =========================
  // RÉCIPROQUE : CONCLURE
  // =========================
  {
    kind: "fixed",
    id: "pythagore_theoreme_reciproque_conclure_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_reciproque_conclure",
    difficulty: 3,
    theme: "neutral",
    text: "Si AB² + AC² = BC², alors le triangle ABC est rectangle…",
    format: "qcm",
    choices: ["en A", "en B", "en C", "on ne peut pas conclure"],
    expected: ["en A"],
    comparator: "mcq_exact",
    hint: "Le plus grand côté est BC, donc l’angle droit est au point opposé.",
    explanation: "Définition : dans un triangle rectangle, le théorème de Pythagore relie les longueurs des trois côtés.\n\n" +
          "Méthode : on commence par vérifier que le triangle est rectangle et par repérer l’hypoténuse.\n\nCalcul : " +
          ("Si AB² + AC² = BC², alors BC est l’hypoténuse et le triangle est rectangle en A.") +
          "\n\nConclusion : la longueur ou l’affirmation obtenue respecte le triangle rectangle.",
    tags: ["pythagore_theoreme_theoreme", "reciproque", "conclure"],
  },
  {
    kind: "fixed",
    id: "pythagore_theoreme_reciproque_conclure_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_reciproque_conclure",
    difficulty: 3,
    theme: "neutral",
    text: "Si la somme des carrés des deux plus petits côtés n’est pas égale au carré du plus grand côté, alors le triangle est…",
    format: "qcm",
    choices: ["rectangle", "non rectangle", "toujours isocèle", "toujours équilatéral"],
    expected: ["non rectangle"],
    comparator: "mcq_exact",
    hint: "La réciproque ne fonctionne que si l’égalité est vraie.",
    explanation: "Définition : dans un triangle rectangle, le théorème de Pythagore relie les longueurs des trois côtés.\n\n" +
          "Méthode : on commence par vérifier que le triangle est rectangle et par repérer l’hypoténuse.\n\nCalcul : " +
          ("Si l’égalité de Pythagore n’est pas vraie, alors le triangle n’est pas rectangle.") +
          "\n\nConclusion : la longueur ou l’affirmation obtenue respecte le triangle rectangle.",
    tags: ["pythagore_theoreme_theoreme", "reciproque", "conclure"],
  },
  {
    kind: "template",
    id: "pythagore_theoreme_reciproque_conclure_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_reciproque_conclure",
    difficulty: 3,
    theme: "neutral",
    hint: "Teste l’égalité avec le plus grand côté.",
    tags: ["pythagore_theoreme_theoreme", "reciproque", "conclure", "template"],
    generate: () => genEstRectangleFigure(),
  },
  {
    kind: "template",
    id: "pythagore_theoreme_reciproque_conclure_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_reciproque_conclure",
    difficulty: 4,
    theme: "neutral",
    hint: "Le sommet de l’angle droit est opposé au plus grand côté.",
    tags: ["pythagore_theoreme_theoreme", "reciproque", "sommet", "template"],
    generate: () => genSommetFigure(),
  },
  {
    kind: "template",
    id: "pythagore_theoreme_reciproque_conclure_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_reciproque_conclure",
    difficulty: 4,
    theme: "neutral",
    hint: "Le triangle est rectangle si l’égalité de Pythagore est vraie.",
    tags: ["pythagore_theoreme_theoreme", "reciproque", "conclure", "open", "template"],
    generate: () => genConclureExplique(),
  },
  // =========================
  // RÉDIGER
  // =========================
  {
    kind: "fixed",
    id: "pythagore_theoreme_rediger_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_rediger",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle phrase convient pour commencer une rédaction avec le théorème de Pythagore ?",
    format: "qcm",
    choices: [
      "Dans le triangle ABC rectangle en A, d’après le théorème de Pythagore…",
      "Dans le triangle ABC rectangle en A, d’après la réciproque de Pythagore…",
      "Dans le triangle ABC isocèle en A, d’après le théorème de Pythagore…",
      "Dans le triangle ABC, d’après le théorème de Pythagore appliqué en A…",
    ],
    expected: [
      "Dans le triangle ABC rectangle en A, d’après le théorème de Pythagore…",
    ],
    comparator: "mcq_exact",
    hint: "Le théorème direct part d’un triangle déjà rectangle.",
    explanation:
      "Définition : dans un triangle rectangle, le théorème de Pythagore relie les longueurs des trois côtés.\n\n" +
          "Méthode : on commence par vérifier que le triangle est rectangle et par repérer l’hypoténuse.\n\nCalcul : " +
          ("Pour utiliser le théorème de Pythagore, on commence par indiquer que le triangle est rectangle.") +
          "\n\nConclusion : la longueur ou l’affirmation obtenue respecte le triangle rectangle.",
    tags: ["pythagore_theoreme_theoreme", "redaction"],
  },
  {
    kind: "fixed",
    id: "pythagore_theoreme_rediger_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_rediger",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle phrase convient pour utiliser la réciproque de Pythagore ?",
    format: "qcm",
    choices: [
      "On compare la somme des carrés des deux plus petits côtés avec le carré du plus grand côté.",
      "On compare la somme des carrés des trois côtés avec le carré du plus grand côté.",
      "On compare le produit des deux plus petits côtés avec le carré du plus grand côté.",
      "On compare la somme des deux plus petits côtés avec la longueur du plus grand côté.",
    ],
    expected: [
      "On compare la somme des carrés des deux plus petits côtés avec le carré du plus grand côté.",
    ],
    comparator: "mcq_exact",
    hint: "La réciproque sert à vérifier si un triangle est rectangle.",
    explanation:
      "Définition : dans un triangle rectangle, le théorème de Pythagore relie les longueurs des trois côtés.\n\n" +
          "Méthode : on commence par vérifier que le triangle est rectangle et par repérer l’hypoténuse.\n\nCalcul : " +
          ("Pour la réciproque, on compare la somme des carrés des deux plus petits côtés avec le carré du plus grand côté.") +
          "\n\nConclusion : la longueur ou l’affirmation obtenue respecte le triangle rectangle.",
    tags: ["pythagore_theoreme_theoreme", "reciproque", "redaction"],
  },
  {
    kind: "template",
    id: "pythagore_theoreme_rediger_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_rediger",
    difficulty: 4,
    theme: "neutral",
    hint: "On cherche l’hypoténuse, donc on additionne les carrés.",
    tags: ["pythagore_theoreme_theoreme", "redaction", "template"],
    generate: () => genEgaliteHyp(),
  },
  {
    kind: "template",
    id: "pythagore_theoreme_rediger_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_rediger",
    difficulty: 4,
    theme: "neutral",
    hint: "Pour la réciproque, on ne suppose pas que le triangle est rectangle : on vérifie.",
    tags: ["pythagore_theoreme_theoreme", "reciproque", "redaction", "template"],
    generate: () => genComparaison(),
  },
  {
    kind: "fixed",
    id: "pythagore_theoreme_rediger_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_rediger",
    difficulty: 4,
    theme: "neutral",
    text: "Explique la différence entre utiliser le théorème de Pythagore et utiliser sa réciproque.",
    format: "open",
    expected: ["théorème", "réciproque", "rectangle"],
    comparator: "contains_keyword",
    hint: "Dans un cas, on sait déjà que le triangle est rectangle. Dans l’autre, on veut le vérifier.",
    explanation:
      "Définition : dans un triangle rectangle, le théorème de Pythagore relie les longueurs des trois côtés.\n\n" +
          "Méthode : on commence par vérifier que le triangle est rectangle et par repérer l’hypoténuse.\n\nCalcul : " +
          ("Le théorème de Pythagore sert à calculer une longueur dans un triangle déjà rectangle. La réciproque sert à vérifier si un triangle est rectangle à partir de ses trois longueurs.") +
          "\n\nConclusion : la longueur ou l’affirmation obtenue respecte le triangle rectangle.",
    tags: ["pythagore_theoreme_theoreme", "redaction", "reciproque", "open"],
  },
  // =========================
  // DÉFIS
  // =========================
  {
    kind: "fixed",
    id: "pythagore_theoreme_defi_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_defi",
    difficulty: 5,
    theme: "neutral",
    text: "On connaît trois longueurs d’un triangle et on veut savoir s’il est rectangle. On utilise plutôt…",
    format: "qcm",
    choices: [
      "la réciproque du théorème de Pythagore",
      "le théorème de Pythagore direct",
      "la distributivité",
      "le périmètre",
    ],
    expected: ["la réciproque du théorème de Pythagore"],
    comparator: "mcq_exact",
    hint: "On ne sait pas encore si le triangle est rectangle.",
    explanation:
      "Définition : dans un triangle rectangle, le théorème de Pythagore relie les longueurs des trois côtés.\n\n" +
          "Méthode : on commence par vérifier que le triangle est rectangle et par repérer l’hypoténuse.\n\nCalcul : " +
          ("Quand on connaît trois longueurs et qu’on veut savoir si le triangle est rectangle, on utilise la réciproque.") +
          "\n\nConclusion : la longueur ou l’affirmation obtenue respecte le triangle rectangle.",
    tags: ["pythagore_theoreme_theoreme", "defi", "reciproque"],
  },
  {
    kind: "fixed",
    id: "pythagore_theoreme_defi_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Un élève dit : « J’ai trois longueurs, donc j’utilise directement le théorème de Pythagore. » A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Le théorème direct nécessite déjà un triangle rectangle.",
    explanation:
      "Définition : dans un triangle rectangle, le théorème de Pythagore relie les longueurs des trois côtés.\n\n" +
          "Méthode : on commence par vérifier que le triangle est rectangle et par repérer l’hypoténuse.\n\nCalcul : " +
          ("Non. Avec trois longueurs, on utilise la réciproque pour vérifier si le triangle est rectangle.") +
          "\n\nConclusion : la longueur ou l’affirmation obtenue respecte le triangle rectangle.",
    tags: ["pythagore_theoreme_theoreme", "defi", "piege"],
  },
  {
    kind: "template",
    id: "pythagore_theoreme_defi_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_defi",
    difficulty: 5,
    // 03/10/2026 : La Réunion n'est plus le décor unique, mais deux lieux sur huit.
    theme: "neutral",
    hint: "Modélise la situation par un triangle rectangle : le trajet en ligne droite est l’hypoténuse.",
    tags: ["pythagore_theoreme_theoreme", "defi", "probleme", "template"],
    generate: () => genDenivele(),
  },
  {
    kind: "template",
    id: "pythagore_theoreme_defi_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Teste les deux triangles avec la réciproque.",
    tags: ["pythagore_theoreme_theoreme", "defi", "hpi", "template"],
    generate: () => genLequelRectangle(),
  },
    {
    kind: "template",
    id: "pythagore_theoreme_defi_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Commence par repérer si on calcule une longueur ou si on vérifie que le triangle est rectangle.",
    tags: ["pythagore_theoreme_theoreme", "defi", "open", "raisonnement", "template"],
    generate: () => genDefiExplique(),
  },

  /* =========================================================
     COMPLÉMENTS (top-up ~10 items / microSkill)
  ========================================================= */

  // ---------- CARRÉS ET RACINES ----------
  {
    kind: "fixed",
    id: "pythagore_theoreme_carre_racine_fixed_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_carre_racine",
    difficulty: 1,
    theme: "neutral",
    text: "Quel est le résultat de 8 × 8, c’est-à-dire de 8² ?",
    format: "qcm",
    choices: ["16", "64", "32", "81"],
    expected: ["64"],
    comparator: "mcq_exact",
    hint: "8² = 8 × 8.",
    explanation:
      "Définition : élever au carré, c’est multiplier le nombre par lui-même.\n\n" +
      "Méthode : 8² = 8 × 8.\n\n" +
      "Calcul : 8 × 8 = 64.\n\n" +
      "Conclusion : 8² = 64.",
    tags: ["pythagore_theoreme_theoreme", "carre", "qcm"],
  },
  {
    kind: "template",
    id: "pythagore_theoreme_carre_racine_tpl_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_carre_racine",
    difficulty: 2,
    theme: "neutral",
    hint: "Calcule chaque carré, puis soustrais.",
    tags: ["pythagore_theoreme_theoreme", "carre", "difference", "template"],
    generate: () => genDiffCarres(),
  },

  // ---------- RECONNAÎTRE ----------
  {
    kind: "fixed",
    id: "pythagore_theoreme_reconnaitre_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    text: "Combien d’angles droits possède un triangle rectangle ?",
    format: "qcm",
    choices: ["un", "deux", "trois", "aucun"],
    expected: ["un"],
    comparator: "mcq_exact",
    hint: "« Rectangle » indique un angle droit.",
    explanation:
      "Définition : un triangle rectangle a un angle droit.\n\n" +
      "Méthode : on compte les angles droits possibles.\n\n" +
      "Calcul : un triangle ne peut avoir qu’un seul angle droit.\n\n" +
      "Conclusion : un triangle rectangle a un angle droit.",
    tags: ["pythagore_theoreme_theoreme", "reconnaitre", "qcm"],
  },
  {
    kind: "fixed",
    id: "pythagore_theoreme_reconnaitre_fixed_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Le triangle MNP est rectangle en M. Quelle est son hypoténuse ?",
    format: "qcm",
    choices: ["NP", "MN", "MP", "M"],
    expected: ["NP"],
    comparator: "mcq_exact",
    hint: "L’hypoténuse est opposée à l’angle droit (en M).",
    explanation:
      "Définition : l’hypoténuse est le côté opposé à l’angle droit.\n\n" +
      "Méthode : l’angle droit est en M, son côté opposé est NP.\n\n" +
      "Calcul : le côté opposé à M est [NP].\n\n" +
      "Conclusion : l’hypoténuse est NP.",
    tags: ["pythagore_theoreme_theoreme", "hypotenuse", "qcm"],
  },
  {
    kind: "template",
    id: "pythagore_theoreme_reconnaitre_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    hint: "L’hypoténuse est opposée à l’angle droit.",
    tags: ["pythagore_theoreme_theoreme", "hypotenuse", "canvas", "template"],
    generate: () => genReconnaitreFigureSommet(),
  },
  {
    kind: "template",
    id: "pythagore_theoreme_reconnaitre_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    hint: "L’hypoténuse est le côté en face de l’angle droit : elle ne passe pas par son sommet.",
    tags: ["pythagore_theoreme_theoreme", "hypotenuse", "reconnaitre", "template"],
    generate: () => genReconnaitreTexte(),
  },
  {
    kind: "fixed",
    id: "pythagore_theoreme_reconnaitre_open_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Explique comment repérer l’hypoténuse dans un triangle rectangle.",
    format: "open",
    expected: ["opposé", "angle droit", "grand"],
    comparator: "contains_keyword",
    hint: "Pense à la position par rapport à l’angle droit.",
    explanation:
      "Définition : l’hypoténuse est le côté opposé à l’angle droit.\n\n" +
      "Méthode : on repère l’angle droit, puis le côté en face.\n\n" +
      "Calcul : c’est aussi le plus grand côté du triangle.\n\n" +
      "Conclusion : l’hypoténuse est le côté opposé à l’angle droit (le plus grand).",
    tags: ["pythagore_theoreme_theoreme", "reconnaitre", "open"],
  },

  // ---------- CALCULER L’HYPOTÉNUSE ----------
  {
    kind: "fixed",
    id: "pythagore_theoreme_calculer_hypotenuse_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_calculer_hypotenuse",
    difficulty: 2,
    theme: "neutral",
    text: "Les côtés de l’angle droit d’un triangle rectangle mesurent 9 cm et 12 cm. Combien mesure l’hypoténuse ?",
    format: "qcm",
    choices: ["15", "21", "13", "18"],
    expected: ["15"],
    comparator: "mcq_exact",
    hint: "9² + 12² = 81 + 144 = 225.",
    explanation:
      "Définition : c² = a² + b² pour l’hypoténuse.\n\n" +
      "Méthode : on additionne les carrés.\n\n" +
      "Calcul : 9² + 12² = 225, donc c = √225 = 15.\n\n" +
      "Conclusion : l’hypoténuse mesure 15 cm.",
    tags: ["pythagore_theoreme_theoreme", "hypotenuse", "qcm"],
  },
  {
    kind: "fixed",
    id: "pythagore_theoreme_calculer_hypotenuse_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_calculer_hypotenuse",
    difficulty: 3,
    theme: "neutral",
    text: "Un triangle rectangle a pour côtés de l’angle droit 8 cm et 15 cm. Quelle est son hypoténuse ?",
    format: "qcm",
    choices: ["17", "23", "19", "20"],
    expected: ["17"],
    comparator: "mcq_exact",
    hint: "8² + 15² = 64 + 225 = 289.",
    explanation:
      "Définition : c² = a² + b².\n\n" +
      "Méthode : on additionne les carrés.\n\n" +
      "Calcul : 64 + 225 = 289, donc c = √289 = 17.\n\n" +
      "Conclusion : l’hypoténuse mesure 17 cm.",
    tags: ["pythagore_theoreme_theoreme", "hypotenuse", "qcm"],
  },
  {
    kind: "template",
    id: "pythagore_theoreme_calculer_hypotenuse_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_calculer_hypotenuse",
    difficulty: 3,
    theme: "neutral",
    hint: "Repère l’angle droit dans la situation : la longueur cherchée est en face, c’est l’hypoténuse.",
    tags: ["pythagore_theoreme_theoreme", "hypotenuse", "probleme", "template"],
    generate: () => genHypSituation(),
  },
  {
    kind: "template",
    id: "pythagore_theoreme_calculer_hypotenuse_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_calculer_hypotenuse",
    difficulty: 2,
    theme: "neutral",
    hint: "On cherche d’abord le carré de l’hypoténuse.",
    tags: ["pythagore_theoreme_theoreme", "hypotenuse", "template"],
    generate: () => genHypCarre(),
  },
  {
    kind: "fixed",
    id: "pythagore_theoreme_calculer_hypotenuse_open_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_calculer_hypotenuse",
    difficulty: 3,
    theme: "neutral",
    text: "Explique pourquoi, pour trouver l’hypoténuse, on additionne les carrés des côtés de l’angle droit.",
    format: "open",
    expected: ["additionne", "carrés", "hypoténuse"],
    comparator: "contains_keyword",
    hint: "Pense à la formule c² = a² + b².",
    explanation:
      "Définition : le théorème de Pythagore donne c² = a² + b².\n\n" +
      "Méthode : l’hypoténuse au carré est la somme des carrés des deux autres côtés.\n\n" +
      "Calcul : on additionne a² et b², puis on prend la racine.\n\n" +
      "Conclusion : on additionne les carrés car c² = a² + b².",
    tags: ["pythagore_theoreme_theoreme", "hypotenuse", "open"],
  },

  // ---------- CALCULER UN CÔTÉ ----------
  {
    kind: "fixed",
    id: "pythagore_theoreme_calculer_cote_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_calculer_cote",
    difficulty: 2,
    theme: "neutral",
    text: "Le triangle RST est rectangle en S, avec RT = 13 cm et RS = 5 cm. Combien mesure ST ?",
    format: "qcm",
    choices: ["12", "8", "18", "10"],
    expected: ["12"],
    comparator: "mcq_exact",
    hint: "13² - 5² = 169 - 25.",
    explanation:
      "Définition : pour un côté de l’angle droit, b² = c² - a².\n\n" +
      "Méthode : on soustrait les carrés.\n\n" +
      "Calcul : 169 - 25 = 144, donc b = √144 = 12.\n\n" +
      "Conclusion : l’autre côté mesure 12 cm.",
    tags: ["pythagore_theoreme_theoreme", "cote", "qcm"],
  },
  {
    kind: "fixed",
    id: "pythagore_theoreme_calculer_cote_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_calculer_cote",
    difficulty: 3,
    theme: "neutral",
    text: "Un triangle rectangle a une hypoténuse de 17 cm et un côté de l’angle droit de 8 cm. Quel est l’autre côté ?",
    format: "qcm",
    choices: ["15", "9", "13", "25"],
    expected: ["15"],
    comparator: "mcq_exact",
    hint: "17² - 8² = 289 - 64.",
    explanation:
      "Définition : b² = c² - a².\n\n" +
      "Méthode : on soustrait les carrés.\n\n" +
      "Calcul : 289 - 64 = 225, donc b = √225 = 15.\n\n" +
      "Conclusion : l’autre côté mesure 15 cm.",
    tags: ["pythagore_theoreme_theoreme", "cote", "qcm"],
  },
  {
    kind: "template",
    id: "pythagore_theoreme_calculer_cote_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_calculer_cote",
    difficulty: 3,
    theme: "neutral",
    hint: "On cherche un côté de l’angle droit : on soustrait les carrés.",
    tags: ["pythagore_theoreme_theoreme", "cote", "probleme", "template"],
    generate: () => genCoteSituation(),
  },
  {
    kind: "template",
    id: "pythagore_theoreme_calculer_cote_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_calculer_cote",
    difficulty: 3,
    theme: "neutral",
    hint: "Combien vaut le carré du côté cherché ?",
    tags: ["pythagore_theoreme_theoreme", "cote", "template"],
    generate: () => genCoteCarre(),
  },
  {
    kind: "fixed",
    id: "pythagore_theoreme_calculer_cote_open_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_calculer_cote",
    difficulty: 3,
    theme: "neutral",
    text: "Explique pourquoi, pour trouver un côté de l’angle droit, on soustrait au lieu d’additionner.",
    format: "open",
    expected: ["soustrait", "hypoténuse", "carré"],
    comparator: "contains_keyword",
    hint: "Compare la formule à celle de l’hypoténuse.",
    explanation:
      "Définition : c² = a² + b², donc b² = c² - a².\n\n" +
      "Méthode : on isole le côté cherché.\n\n" +
      "Calcul : on retire le carré du côté connu au carré de l’hypoténuse.\n\n" +
      "Conclusion : on soustrait car le côté cherché n’est pas l’hypoténuse.",
    tags: ["pythagore_theoreme_theoreme", "cote", "open"],
  },

  // ---------- RÉCIPROQUE : VÉRIFIER ----------
  {
    kind: "fixed",
    id: "pythagore_theoreme_reciproque_verifier_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_reciproque_verifier",
    difficulty: 2,
    theme: "neutral",
    text: "Est-il vrai que 8² + 15² = 17² ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "64 + 225 = ?",
    explanation:
      "Définition : on compare la somme des carrés au carré du plus grand côté.\n\n" +
      "Méthode : on calcule chaque membre.\n\n" +
      "Calcul : 8² + 15² = 64 + 225 = 289 et 17² = 289.\n\n" +
      "Conclusion : oui, l’égalité est vraie.",
    tags: ["pythagore_theoreme_theoreme", "reciproque", "verifier", "qcm"],
  },
  {
    kind: "fixed",
    id: "pythagore_theoreme_reciproque_verifier_fixed_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_reciproque_verifier",
    difficulty: 2,
    theme: "neutral",
    text: "Le calcul 6² + 7² donne-t-il le même résultat que 9² ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "36 + 49 = 85, et 9² = 81.",
    explanation:
      "Définition : on compare la somme des carrés au carré du plus grand côté.\n\n" +
      "Méthode : on calcule chaque membre.\n\n" +
      "Calcul : 6² + 7² = 85 alors que 9² = 81.\n\n" +
      "Conclusion : non, l’égalité est fausse.",
    tags: ["pythagore_theoreme_theoreme", "reciproque", "verifier", "qcm"],
  },
  {
    kind: "template",
    id: "pythagore_theoreme_reciproque_verifier_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_reciproque_verifier",
    difficulty: 3,
    theme: "neutral",
    hint: "Additionne les carrés des deux plus petits côtés.",
    tags: ["pythagore_theoreme_theoreme", "reciproque", "verifier", "template"],
    generate: () => genSommeCarresTriangle(),
  },
  {
    kind: "template",
    id: "pythagore_theoreme_reciproque_verifier_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_reciproque_verifier",
    difficulty: 3,
    theme: "neutral",
    hint: "L’hypoténuse potentielle est le plus grand côté.",
    tags: ["pythagore_theoreme_theoreme", "reciproque", "verifier", "template"],
    generate: () => genPlusGrandCote(),
  },
  {
    kind: "fixed",
    id: "pythagore_theoreme_reciproque_verifier_open_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_reciproque_verifier",
    difficulty: 3,
    theme: "neutral",
    text: "Explique quels carrés on compare pour vérifier l’égalité de Pythagore.",
    format: "open",
    expected: ["plus grand", "carrés", "somme"],
    comparator: "contains_keyword",
    hint: "Deux petits côtés contre le plus grand.",
    explanation:
      "Définition : on compare la somme des carrés des deux plus petits côtés au carré du plus grand.\n\n" +
      "Méthode : on identifie le plus grand côté (hypoténuse potentielle).\n\n" +
      "Calcul : on calcule a² + b² et c².\n\n" +
      "Conclusion : on compare la somme des deux carrés au carré du plus grand côté.",
    tags: ["pythagore_theoreme_theoreme", "reciproque", "verifier", "open"],
  },

  // ---------- RÉCIPROQUE : CONCLURE ----------
  {
    kind: "fixed",
    id: "pythagore_theoreme_reciproque_conclure_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_reciproque_conclure",
    difficulty: 3,
    theme: "neutral",
    text: "Un triangle a pour côtés 8 cm, 15 cm et 17 cm. Est-il rectangle ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Compare 8² + 15² avec 17².",
    explanation:
      "Définition : la réciproque conclut au triangle rectangle si l’égalité est vraie.\n\n" +
      "Méthode : on compare 8² + 15² et 17².\n\n" +
      "Calcul : 64 + 225 = 289 = 17².\n\n" +
      "Conclusion : oui, le triangle est rectangle.",
    tags: ["pythagore_theoreme_theoreme", "reciproque", "conclure", "qcm"],
  },
  {
    kind: "fixed",
    id: "pythagore_theoreme_reciproque_conclure_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_reciproque_conclure",
    difficulty: 3,
    theme: "neutral",
    text: "Les côtés d’un triangle mesurent 4 cm, 5 cm et 6 cm. Ce triangle est-il rectangle ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Compare 4² + 5² avec 6².",
    explanation:
      "Définition : si l’égalité de Pythagore est fausse, le triangle n’est pas rectangle.\n\n" +
      "Méthode : on compare 4² + 5² et 6².\n\n" +
      "Calcul : 16 + 25 = 41 ≠ 36.\n\n" +
      "Conclusion : non, le triangle n’est pas rectangle.",
    tags: ["pythagore_theoreme_theoreme", "reciproque", "conclure", "qcm"],
  },
  {
    kind: "template",
    id: "pythagore_theoreme_reciproque_conclure_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_reciproque_conclure",
    difficulty: 3,
    theme: "neutral",
    hint: "Compare la somme des carrés des deux petits côtés au carré du plus grand.",
    tags: ["pythagore_theoreme_theoreme", "reciproque", "conclure", "template"],
    generate: () => genEstRectangleSituation(),
  },
  {
    kind: "template",
    id: "pythagore_theoreme_reciproque_conclure_tpl_3b",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_reciproque_conclure",
    difficulty: 4,
    theme: "neutral",
    hint: "L’angle droit est opposé au plus grand côté.",
    tags: ["pythagore_theoreme_theoreme", "reciproque", "sommet", "template"],
    generate: () => genSommetOuNon(),
  },
  {
    kind: "fixed",
    id: "pythagore_theoreme_reciproque_conclure_open_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_reciproque_conclure",
    difficulty: 4,
    theme: "neutral",
    text: "Explique comment conclure qu’un triangle n’est PAS rectangle avec la réciproque.",
    format: "open",
    expected: ["égalité", "fausse", "rectangle"],
    comparator: "contains_keyword",
    hint: "Que se passe-t-il si l’égalité de Pythagore est fausse ?",
    explanation:
      "Définition : la réciproque conclut selon l’égalité de Pythagore.\n\n" +
      "Méthode : on compare a² + b² et c².\n\n" +
      "Calcul : si les deux ne sont pas égaux, l’égalité est fausse.\n\n" +
      "Conclusion : si l’égalité est fausse, le triangle n’est pas rectangle.",
    tags: ["pythagore_theoreme_theoreme", "reciproque", "conclure", "open"],
  },

  // ---------- RÉDIGER ----------
  {
    kind: "fixed",
    id: "pythagore_theoreme_rediger_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_rediger",
    difficulty: 3,
    theme: "neutral",
    text: "Après avoir vérifié que 9² + 12² = 15², quelle conclusion écrit-on ?",
    format: "qcm",
    choices: [
      "donc, d’après la réciproque de Pythagore, le triangle est rectangle",
      "donc, d’après le théorème de Pythagore, le triangle est rectangle",
      "donc, d’après la réciproque de Pythagore, le triangle est isocèle",
      "donc, d’après la réciproque de Thalès, le triangle est rectangle",
    ],
    expected: ["donc, d’après la réciproque de Pythagore, le triangle est rectangle"],
    comparator: "mcq_exact",
    hint: "L’égalité vérifiée mène à la réciproque.",
    explanation:
      "Définition : si l’égalité de Pythagore est vraie, la réciproque conclut au triangle rectangle.\n\n" +
      "Méthode : on cite la réciproque.\n\n" +
      "Calcul : l’égalité 9² + 12² = 15² est vraie.\n\n" +
      "Conclusion : d’après la réciproque de Pythagore, le triangle est rectangle.",
    tags: ["pythagore_theoreme_theoreme", "redaction", "qcm"],
  },
  {
    kind: "fixed",
    id: "pythagore_theoreme_rediger_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_rediger",
    difficulty: 3,
    theme: "neutral",
    text: "Pour calculer une longueur avec Pythagore, quelle est la bonne suite d’étapes ?",
    format: "qcm",
    choices: [
      "annoncer le triangle rectangle, écrire l’égalité de Pythagore, calculer",
      "écrire l’égalité de Pythagore, calculer, vérifier que l’angle est droit",
      "annoncer le triangle rectangle, mesurer les côtés, comparer les carrés",
      "calculer la longueur cherchée, annoncer le triangle rectangle, conclure",
    ],
    expected: ["annoncer le triangle rectangle, écrire l’égalité de Pythagore, calculer"],
    comparator: "mcq_exact",
    hint: "On part de l’hypothèse, puis on calcule.",
    explanation:
      "Définition : la rédaction suit un ordre logique.\n\n" +
      "Méthode : 1) triangle rectangle ; 2) égalité de Pythagore ; 3) calcul.\n\n" +
      "Calcul : on isole la longueur cherchée à la fin.\n\n" +
      "Conclusion : triangle rectangle → égalité → calcul.",
    tags: ["pythagore_theoreme_theoreme", "redaction", "qcm"],
  },
  {
    kind: "template",
    id: "pythagore_theoreme_rediger_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_rediger",
    difficulty: 4,
    theme: "neutral",
    hint: "On cherche un côté de l’angle droit : on soustrait.",
    tags: ["pythagore_theoreme_theoreme", "redaction", "template"],
    generate: () => genEgaliteCote(),
  },
  {
    kind: "template",
    id: "pythagore_theoreme_rediger_tpl_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_rediger",
    difficulty: 3,
    theme: "neutral",
    hint: "Théorème : on SAIT que le triangle est rectangle. Réciproque : on le PROUVE. Égalité fausse : il ne l’est pas.",
    tags: ["pythagore_theoreme_theoreme", "redaction", "reciproque", "template"],
    generate: () => genPhraseRedaction(),
  },
  {
    kind: "template",
    id: "pythagore_theoreme_rediger_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_rediger",
    difficulty: 4,
    theme: "neutral",
    hint: "Annonce le triangle rectangle puis l’égalité de Pythagore.",
    tags: ["pythagore_theoreme_theoreme", "redaction", "open", "template"],
    generate: () => genRedigeOpen(),
  },
  {
    kind: "fixed",
    id: "pythagore_theoreme_rediger_open_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_rediger",
    difficulty: 4,
    theme: "neutral",
    text: "Pourquoi doit-on préciser « rectangle en A » dans une rédaction avec le théorème direct de Pythagore ?",
    format: "open",
    expected: ["rectangle", "hypothèse", "appliquer"],
    comparator: "contains_keyword",
    hint: "C’est l’hypothèse qui autorise le théorème.",
    explanation:
      "Définition : le théorème direct s’applique seulement si le triangle est rectangle.\n\n" +
      "Méthode : on justifie l’application en précisant le sommet de l’angle droit.\n\n" +
      "Calcul : « rectangle en A » indique que [BC] est l’hypoténuse.\n\n" +
      "Conclusion : on le précise car c’est l’hypothèse nécessaire pour appliquer Pythagore.",
    tags: ["pythagore_theoreme_theoreme", "redaction", "open"],
  },

  // ---------- DÉFIS ----------
  {
    kind: "fixed",
    id: "pythagore_theoreme_defi_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Parmi ces triplets, lequel correspond à un triangle rectangle ?",
    format: "qcm",
    choices: ["(5, 12, 13)", "(4, 5, 6)", "(6, 7, 9)", "(8, 9, 12)"],
    expected: ["(5, 12, 13)"],
    comparator: "mcq_exact",
    hint: "Teste a² + b² = c² pour chaque triplet.",
    explanation:
      "Définition : un triplet pythagoricien vérifie a² + b² = c².\n\n" +
      "Méthode : on teste l’égalité.\n\n" +
      "Calcul : 5² + 12² = 25 + 144 = 169 = 13².\n\n" +
      "Conclusion : (5, 12, 13) est un triangle rectangle.",
    tags: ["pythagore_theoreme_theoreme", "defi", "qcm"],
  },
  {
    kind: "fixed",
    id: "pythagore_theoreme_defi_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un rectangle a pour dimensions 3 cm et 4 cm. Quelle est la longueur de sa diagonale ?",
    format: "qcm",
    choices: ["5 cm", "7 cm", "6 cm", "12 cm"],
    expected: ["5 cm"],
    comparator: "mcq_exact",
    hint: "La diagonale est l’hypoténuse d’un triangle rectangle de côtés 3 et 4.",
    explanation:
      "Définition : la diagonale d’un rectangle est l’hypoténuse d’un triangle rectangle.\n\n" +
      "Méthode : diagonale² = 3² + 4².\n\n" +
      "Calcul : 9 + 16 = 25, donc diagonale = √25 = 5 cm.\n\n" +
      "Conclusion : la diagonale mesure 5 cm.",
    tags: ["pythagore_theoreme_theoreme", "defi", "diagonale", "qcm"],
  },
  {
    kind: "template",
    id: "pythagore_theoreme_defi_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Calcule d’abord le côté qui manque avec Pythagore, puis termine le problème.",
    tags: ["pythagore_theoreme_theoreme", "defi", "probleme", "deux_etapes", "template"],
    generate: () => genProblemeDeuxEtapes(),
  },
  {
    kind: "template",
    id: "pythagore_theoreme_defi_tpl_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "La diagonale d’un rectangle est l’hypoténuse d’un triangle rectangle formé par la longueur et la largeur.",
    tags: ["pythagore_theoreme_theoreme", "defi", "diagonale", "template"],
    generate: () => genDiagonaleRectangle(),
  },
  {
    kind: "template",
    id: "pythagore_theoreme_defi_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Modélise le déplacement par un triangle rectangle.",
    tags: ["pythagore_theoreme_theoreme", "defi", "probleme", "template"],
    generate: () => genDeplacement(),
  },
  {
    kind: "fixed",
    id: "pythagore_theoreme_defi_open_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "pythagore_theoreme",
    microId: "pythagore_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Explique comment Pythagore permet de calculer une distance qu’on ne peut pas mesurer directement.",
    format: "open",
    expected: ["triangle rectangle", "hypoténuse", "carrés"],
    comparator: "contains_keyword",
    hint: "On forme un triangle rectangle avec des distances connues.",
    explanation:
      "Définition : Pythagore relie les côtés d’un triangle rectangle.\n\n" +
      "Méthode : on modélise la distance cherchée par l’hypoténuse d’un triangle rectangle dont les côtés sont connus.\n\n" +
      "Calcul : distance² = a² + b², puis on prend la racine.\n\n" +
      "Conclusion : on calcule l’hypoténuse à partir des carrés des deux côtés connus.",
    tags: ["pythagore_theoreme_theoreme", "defi", "open"],
  },
];