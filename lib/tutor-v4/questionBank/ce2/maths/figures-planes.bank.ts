// lib/tutor-v4/questionBank/ce2/maths/figures-planes.bank.ts
//
// Les figures planes du CE2, écrites à la main. Sept micro-compétences qui
// passaient par le constructeur commun — celui qui servait « Combien de côtés
// a un triangle ? » à vingt micro-compétences de géométrie.
//
// PÉRIMÈTRE BO (n° 41 du 31 octobre 2024, cycle 2) : reconnaître, nommer et
// décrire le carré, le rectangle, le triangle, le triangle rectangle, le
// losange et le cercle ; utiliser les propriétés d'angle droit et d'égalité de
// longueur ; construire à la règle, à l'équerre et au compas.
// ⛔ Pas de relation d'inclusion au cycle 2 : on ne demande PAS « un carré
// est-il un rectangle ? ». Cette question arrive au cycle 3. Ici on décrit une
// figure par ses côtés et ses angles, rien de plus.
//
// LE PIÈGE DE LA NOTION : la figure penchée. Un rectangle posé de travers
// cesse d'être un rectangle pour l'élève, et un carré posé sur la pointe
// devient un losange. Ce qui fait la figure, ce sont ses côtés et ses angles,
// pas la façon dont elle est posée sur la feuille. Toutes les figures de cette
// banque ne sont donc pas alignées sur le bord de la page.
// Le second : le compas. On l'ouvre du RAYON, pas du diamètre, et sa pointe se
// plante sur le centre.
//
// ⚠️ PAS DE QUESTION À RÉDIGER. `applyMathsKeyboardFree` retire les items
// `format: "open"` (cf. ce2/maths/index.ts) : un CE2 clique, il ne tape pas.

import type {
  CanvasFigure,
  CercleCanvasData,
  QuadrilatereCanvasData,
  TriangleCanvasData,
  TutorBankItemV4,
} from "@/lib/tutor-v4/types";
import { atelier, cap, entre, melange, qcm, qcmN, un } from "../../cm1/maths/trous-outils";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffle<T>(items: readonly T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

// La bonne réponse est mise de côté, trois pièges distincts sont tirés ensuite,
// puis on mélange. L'écrire autrement a rendu des questions impossibles à
// réussir dans 79 banques : voir scripts/verifier-generateurs.mjs.
function makeChoices(correct: string, wrongs: readonly string[]) {
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct),
  ).slice(0, 3);
  return shuffle([correct, ...distracteurs]);
}

function quadrilatere(data: Omit<QuadrilatereCanvasData, "kind">): QuadrilatereCanvasData {
  return { kind: "quadrilatere", ...data };
}

function triangle(data: Omit<TriangleCanvasData, "kind">): TriangleCanvasData {
  return { kind: "triangle", ...data };
}

function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return `Définition : ${definition}

Méthode : ${methode}

Calcul : ${calcul}

Conclusion : ${conclusion}`;
}

/* ─── Les figures, posées droit ET de travers ────────────────────────────────
   Les coordonnées penchées sont calculées sur la direction (4, 3) : les côtés
   tombent alors sur des longueurs entières (160 et 90) et l'angle est droit au
   pixel près. Une figure « presque » rectangle apprendrait le contraire de ce
   qu'on veut. */

function rectangleDroit(): QuadrilatereCanvasData {
  return quadrilatere({
    points: {
      A: { x: 55, y: 60 },
      B: { x: 245, y: 60 },
      C: { x: 245, y: 170 },
      D: { x: 55, y: 170 },
    },
    display: { showPoints: true, showLabels: true, showSides: false },
    marks: {
      rightAnglesAt: ["A", "B", "C", "D"],
    },
  });
}

function rectanglePenche(): QuadrilatereCanvasData {
  return quadrilatere({
    points: {
      A: { x: 103, y: 31 },
      B: { x: 231, y: 127 },
      C: { x: 177, y: 199 },
      D: { x: 49, y: 103 },
    },
    display: { showPoints: true, showLabels: true, showSides: false },
    marks: {
      rightAnglesAt: ["A", "B", "C", "D"],
    },
  });
}

function carreDroit(): QuadrilatereCanvasData {
  return quadrilatere({
    points: {
      A: { x: 90, y: 55 },
      B: { x: 210, y: 55 },
      C: { x: 210, y: 175 },
      D: { x: 90, y: 175 },
    },
    display: { showPoints: true, showLabels: true, showSides: false },
    marks: {
      rightAnglesAt: ["A", "B", "C", "D"],
      equalSides: [["AB", "BC"], ["BC", "CD"], ["CD", "DA"]],
    },
  });
}

/** Un carré posé sur la pointe : quatre côtés égaux, quatre angles droits. */
function carreSurPointe(): QuadrilatereCanvasData {
  return quadrilatere({
    points: {
      A: { x: 150, y: 45 },
      B: { x: 225, y: 120 },
      C: { x: 150, y: 195 },
      D: { x: 75, y: 120 },
    },
    display: { showPoints: true, showLabels: true, showSides: false },
    marks: {
      rightAnglesAt: ["A", "B", "C", "D"],
      equalSides: [["AB", "BC"], ["BC", "CD"], ["CD", "DA"]],
    },
  });
}

/** Un vrai losange : quatre côtés égaux, AUCUN angle droit. */
function losange(): QuadrilatereCanvasData {
  return quadrilatere({
    points: {
      A: { x: 150, y: 45 },
      B: { x: 250, y: 120 },
      C: { x: 150, y: 195 },
      D: { x: 50, y: 120 },
    },
    display: { showPoints: true, showLabels: true, showSides: false },
    marks: {
      equalSides: [["AB", "BC"], ["BC", "CD"], ["CD", "DA"]],
    },
  });
}

/* ═══════════════════════════════════════════════════════════════════════════
   LES GABARITS (10/11/2026) — robustesse et dessins.
   Mesuré avant : 6 à 11 squelettes par micro, 9 à 19 répétitions sur 20 ; 29 %
   des énoncés avec un dessin. Chaque gabarit tire maintenant une SITUATION
   (enfants de la troupe, mondes d'enfant, métiers), une TOURNURE et une figure
   DESSINÉE au hasard (taille, inclinaison, lettres). ★1-★2 : une phrase et le
   dessin. ★3+ : une petite histoire.
   ⛔ Le dessin ne porte JAMAIS le nom de la figure, et quand on demande de
   trouver l'angle droit, il n'est pas marqué : c'est l'équerre qui le trouve.
   ═══════════════════════════════════════════════════════════════════════════ */

type Pt = { x: number; y: number };
type Lettres = [string, string, string, string];

const rad = (d: number) => (d * Math.PI) / 180;

function tourner(p: Pt[], deg: number): Pt[] {
  const c = Math.cos(rad(deg));
  const s = Math.sin(rad(deg));
  return p.map(({ x, y }) => ({ x: x * c - y * s, y: x * s + y * c }));
}

/** Pose la figure au milieu du cadre, à la plus grande taille qui laisse la place aux lettres. */
function cadrer(p: Pt[], W: number, H: number, marge: number, reduction = 1): Pt[] {
  const xs = p.map((q) => q.x);
  const ys = p.map((q) => q.y);
  const bw = Math.max(...xs) - Math.min(...xs) || 1;
  const bh = Math.max(...ys) - Math.min(...ys) || 1;
  const k = Math.min((W - 2 * marge) / bw, (H - 2 * marge) / bh) * reduction;
  const cx = (Math.max(...xs) + Math.min(...xs)) / 2;
  const cy = (Math.max(...ys) + Math.min(...ys)) / 2;
  return p.map((q) => ({ x: Math.round(W / 2 + (q.x - cx) * k), y: Math.round(H / 2 + (q.y - cy) * k) }));
}

const JEUX_DE_LETTRES: Lettres[] = [
  ["A", "B", "C", "D"],
  ["E", "F", "G", "H"],
  ["K", "L", "M", "N"],
  ["R", "S", "T", "U"],
  ["M", "N", "O", "P"],
];

type FormeQuad = "carre" | "rectangle" | "losange" | "quelconque";

function sommetsQuad(forme: FormeQuad): Pt[] {
  switch (forme) {
    case "carre":
      return [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 1 }];
    case "rectangle": {
      const r = un([1.5, 1.7, 1.9, 2.1]);
      return [{ x: 0, y: 0 }, { x: r, y: 0 }, { x: r, y: 1 }, { x: 0, y: 1 }];
    }
    case "losange": {
      // Diagonales inégales : aucun angle droit (angles de 58° à 74° et de 106° à 122°).
      const h = un([0.55, 0.62, 0.7]);
      return [{ x: 0, y: -h }, { x: 1, y: 0 }, { x: 0, y: h }, { x: -1, y: 0 }];
    }
    default:
      return melange([
        [{ x: 0, y: 0 }, { x: 1.6, y: 0.2 }, { x: 1.3, y: 1.1 }, { x: 0.2, y: 0.85 }],
        [{ x: 0, y: 0.3 }, { x: 1.4, y: 0 }, { x: 1.7, y: 1 }, { x: 0.4, y: 1.2 }],
        [{ x: 0.2, y: 0 }, { x: 1.2, y: 0.1 }, { x: 1.6, y: 0.9 }, { x: 0, y: 1.1 }],
      ])[0];
  }
}

/**
 * ⛔ 10/11/2026 — LE RECTANGLE NE PORTE PAS DE TRAITS D'ÉGALITÉ. Le canvas
 * dessine le « double trait » du second groupe en décalant les deux traits le
 * long de la NORMALE au côté (getTickSegment) : ils se recouvrent et se lisent
 * comme un trait simple. Les quatre côtés d'un rectangle paraissaient donc
 * codés égaux. Ses quatre angles droits suffisent à le reconnaître ; quand on
 * parle de ses longueurs, elles sont écrites.
 *
 * Un quadrilatère dessiné. `codage` : petits carrés des angles droits et traits
 * des côtés égaux — la figure se reconnaît à eux. Sans codage, l'élève regarde
 * (ou vérifie à l'équerre).
 */
function dessinQuad(
  forme: FormeQuad,
  opts: { inclinaison?: number; codage?: boolean; lettres?: Lettres; cotes?: Partial<Record<"AB" | "BC" | "CD" | "DA", string>> } = {},
): QuadrilatereCanvasData {
  const [A, B, C, D] = cadrer(tourner(sommetsQuad(forme), opts.inclinaison ?? 0), 300, 240, 42, un([0.85, 0.95, 1]));
  const codage = opts.codage ?? true;
  const l = opts.lettres ?? JEUX_DE_LETTRES[0];
  const droits = forme === "carre" || forme === "rectangle";
  // Un côté qui porte sa longueur ne porte pas de trait : le trait passait sur le nombre.
  type Cote = "AB" | "BC" | "CD" | "DA";
  const codes = (["AB", "BC", "CD", "DA"] as Cote[]).filter((c) => !opts.cotes?.[c]);
  const tous: Array<[Cote, Cote]> = codes.slice(1).map((c, i) => [codes[i], c]);
  return quadrilatere({
    points: { A, B, C, D },
    labels: { A: l[0], B: l[1], C: l[2], D: l[3] },
    display: { showPoints: true, showLabels: true, showSides: Boolean(opts.cotes) },
    sideLabels: opts.cotes,
    marks: codage
      ? {
          rightAnglesAt: droits ? ["A", "B", "C", "D"] : [],
          equalSides:
            forme === "rectangle" || forme === "quelconque" ? [] : tous,
        }
      : {},
  });
}

/** Un triangle à partir de ses trois angles (en degrés), posé et tourné au hasard. */
function sommetsTriangle(a: number, b: number): Pt[] {
  const c = 180 - a - b;
  const AC = Math.sin(rad(b)) / Math.sin(rad(c));
  return [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: AC * Math.cos(rad(a)), y: -AC * Math.sin(rad(a)) }];
}

/** Triangles SANS angle droit : aucun angle entre 75° et 105°, l'œil ne peut pas hésiter. */
const TRIANGLES_SANS_DROIT: Array<[number, number]> = [
  [50, 60], [60, 60], [40, 30], [65, 55], [30, 35], [45, 25], [70, 60], [35, 120],
];

type Sommet = "A" | "B" | "C";

function dessinTriangle(opts: {
  droitEn?: Sommet | null;
  marquer?: boolean;
  inclinaison?: number;
  lettres?: [string, string, string];
  egaux?: boolean;
  cote?: string;
}): TriangleCanvasData {
  let pts: Pt[];
  if (opts.egaux) pts = sommetsTriangle(60, 60);
  else if (opts.droitEn) {
    const [a, b] = un([[1, 1.4], [1, 1.7], [1.3, 1], [1.6, 1], [1, 1]] as const);
    // L'angle droit est au premier point ; on le range au sommet demandé.
    const droit = { x: 0, y: 0 };
    const p1 = { x: a, y: 0 };
    const p2 = { x: 0, y: -b };
    pts = opts.droitEn === "A" ? [droit, p1, p2] : opts.droitEn === "B" ? [p2, droit, p1] : [p1, p2, droit];
  } else {
    const [a, b] = un(TRIANGLES_SANS_DROIT);
    pts = melange(sommetsTriangle(a, b));
  }
  const [A, B, C] = cadrer(tourner(pts, opts.inclinaison ?? 0), 280, 240, 42, un([0.85, 0.95, 1]));
  const l = opts.lettres ?? ["A", "B", "C"];
  return triangle({
    points: { A, B, C },
    labels: { A: l[0], B: l[1], C: l[2] },
    display: { showPoints: true, showLabels: true, showSides: Boolean(opts.cote), showAngles: false, legendesDehors: true },
    sideLabels: opts.cote ? { AB: opts.cote } : undefined,
    marks: {
      ...(opts.droitEn && opts.marquer ? { rightAngleAt: opts.droitEn } : {}),
      ...(opts.egaux
        ? { equalSides: (opts.cote ? [["BC", "CA"]] : [["AB", "BC"], ["BC", "CA"]]) as Array<["AB" | "BC" | "CA", "AB" | "BC" | "CA"]> }
        : {}),
    },
  });
}

const LETTRES_TRI: Array<[string, string, string]> = [["A", "B", "C"], ["E", "F", "G"], ["K", "L", "M"], ["R", "S", "T"], ["D", "E", "F"]];

/**
 * Un cercle de centre O, avec un rayon [OA] ou un diamètre [AB] tracé.
 * `etiquette` : la longueur écrite sur le segment (la donnée, jamais la réponse).
 */
function dessinCercle(opts: {
  segment?: "rayon" | "diametre" | "deux_rayons" | null;
  noms?: [string, string];
  etiquette?: string;
}): CercleCanvasData {
  const r = un([70, 80, 90]);
  const cx = 170;
  const cy = opts.etiquette ? 118 : 130;
  // Le nom du centre s'écrit en haut à droite de O : aucun segment ne part par là.
  const t = rad(
    opts.segment === "diametre" ? un([10, 20, 35, 50, 65]) : opts.segment === "deux_rayons" ? un([20, 45, 70]) : un([20, 45, 70, 200, 225, 250]),
  );
  const [n1, n2] = opts.noms ?? ["A", "B"];
  const P1 = { x: Math.round(cx + r * Math.cos(t)), y: Math.round(cy + r * Math.sin(t)) };
  const P2 = { x: Math.round(cx - r * Math.cos(t)), y: Math.round(cy - r * Math.sin(t)) };
  // Le nom d'un point s'écrit en haut à droite : un rayon vers le bas à gauche le barrait.
  const t2 = rad(un([200, 225, 250]));
  const P3 = { x: Math.round(cx + r * Math.cos(t2)), y: Math.round(cy + r * Math.sin(t2)) };
  const points: CercleCanvasData["points"] = [{ id: "O", x: cx, y: cy, label: "O" }];
  const segments: CercleCanvasData["segments"] = [];
  if (opts.segment === "rayon") {
    points.push({ id: "P1", x: P1.x, y: P1.y, label: n1 });
    segments.push({ id: "s1", kind: "rayon", from: "O", to: "P1" });
  } else if (opts.segment === "diametre") {
    points.push({ id: "P1", x: P1.x, y: P1.y, label: n1 }, { id: "P2", x: P2.x, y: P2.y, label: n2 });
    segments.push({ id: "s1", kind: "diametre", from: "P1", to: "P2" });
  } else if (opts.segment === "deux_rayons") {
    points.push({ id: "P1", x: P1.x, y: P1.y, label: n1 }, { id: "P3", x: P3.x, y: P3.y, label: n2 });
    segments.push(
      { id: "s1", kind: "rayon", from: "O", to: "P1" },
      { id: "s2", kind: "rayon", from: "O", to: "P3" },
    );
  }
  return {
    kind: "cercle",
    size: { width: 340, height: 260 },
    // ⛔ La longueur ne s'écrit pas sur le segment : au milieu d'un diamètre, elle
    // tombait sur le « O » du centre. Elle s'écrit sous le cercle.
    circle: {
      cx,
      cy,
      r,
      label: opts.etiquette
        ? `[${opts.segment === "diametre" ? `${n1}${n2}` : `O${n1}`}] = ${opts.etiquette}`
        : undefined,
    },
    points,
    segments,
    display: { showLabels: true, showPoints: true },
  };
}

/* ─── Les mots des énoncés ─────────────────────────────────────────────── */

/** ★1-★2 : une amorce courte, ou rien. */
const AMORCE = [
  "",
  "Regarde le dessin.",
  "Observe bien.",
  "Voici une figure.",
  "Regarde bien la figure.",
  "Observe ce dessin.",
  "Voici un dessin.",
  "Regarde attentivement.",
  "La maîtresse a tracé cette figure.",
  "Pic le paille-en-queue montre cette figure.",
];
const amorce = () => un(AMORCE);
const phrase = (...morceaux: string[]) => morceaux.filter(Boolean).join(" ");

/** ★3+ : une petite histoire autour d'une forme DESSINÉE. */
const HISTOIRE_FORME = [
  "Nina a découpé cette forme dans du carton pour la kermesse.",
  "Téo a tracé cette forme sur le sable avec un bâton.",
  "Pic le paille-en-queue a trouvé cette forme dans un livre.",
  "Zoé a dessiné cette forme sur son cahier.",
  "Ravi a posé cette forme sur la table du goûter.",
  "La maîtresse affiche cette forme au tableau.",
  "Le jardinier a dessiné ce massif de fleurs, vu d'en haut.",
  "La boulangère a découpé ce biscuit.",
  "Lou a peint cette forme sur la porte de sa cabane.",
  "Malo a trouvé cette forme sur la carte au trésor des pirates.",
  "Sacha a vu cette forme sur la fusée de son livre.",
  "Amir a tracé cette forme à la craie dans la cour.",
  "Jade a collé cette gommette sur sa feuille.",
  "Naïa a dessiné cette forme sur la voile de son bateau.",
  "Tom a repéré cette forme sur le mur du zoo.",
  "Lina a dessiné cette forme pour décorer un gâteau d'anniversaire.",
  "Yanis a vu cette forme sur le chapiteau du cirque.",
  "L'architecte a dessiné cette forme sur son plan.",
  "Le chef cuisinier a découpé cette pâte à tarte.",
  "Ti Margo a tracé cette forme dans la forêt.",
  "Inès a dessiné cette forme sur le dos d'un dragon en papier.",
  "La pompière a peint cette forme sur son camion.",
];
const histoire = () => un(HISTOIRE_FORME);

type Enfant = { nom: string; il: "il" | "elle" };
const ENFANTS: Enfant[] = [
  { nom: "Nina", il: "elle" }, { nom: "Téo", il: "il" }, { nom: "Zoé", il: "elle" }, { nom: "Ravi", il: "il" },
  { nom: "Lou", il: "elle" }, { nom: "Malo", il: "il" }, { nom: "Inès", il: "elle" }, { nom: "Sacha", il: "il" },
  { nom: "Amir", il: "il" }, { nom: "Jade", il: "elle" }, { nom: "Naïa", il: "elle" }, { nom: "Tom", il: "il" },
  { nom: "Lina", il: "elle" }, { nom: "Yanis", il: "il" }, { nom: "Léo", il: "il" }, { nom: "Maya", il: "elle" },
];
const enfant = () => un(ENFANTS);
const aRaison = (e: Enfant) => un([`A-t-${e.il} raison ?`, `${cap(e.il)} a raison ?`, `Qu'en penses-tu ? A-t-${e.il} raison ?`]);

const OUI_VRAI = "oui, c'est vrai";
const NON_FAUX = "non, c'est faux";

const NOM_FIGURE: Record<string, string> = {
  carre: "un carré",
  rectangle: "un rectangle",
  losange: "un losange",
  triangle: "un triangle",
  cercle: "un cercle",
};
const NOMS = ["un carré", "un rectangle", "un losange", "un triangle", "un cercle"];

const QUELLE_FIGURE = [
  "Quelle est cette figure ?",
  "Comment s'appelle cette figure ?",
  "Quel est le nom de cette figure ?",
  "Quelle figure vois-tu ?",
  "Comment appelle-t-on cette figure ?",
  "Quel nom donner à cette figure ?",
  "Retrouve le nom de cette figure.",
  "Cette figure est…",
];

const G = (micro: string) => atelier("ce2", "figures_planes", micro);

/* ═════════════ ce2_figure_reconnaitre ═════════════ */
const REC = G("ce2_figure_reconnaitre");

const DESCRIPTIONS: Array<{ nom: string; d: string }> = [
  { nom: "un carré", d: "quatre côtés de la même longueur et quatre angles droits" },
  { nom: "un carré", d: "quatre angles droits et quatre côtés égaux" },
  { nom: "un rectangle", d: "quatre angles droits, et ses côtés opposés de même longueur" },
  { nom: "un rectangle", d: "quatre angles droits, deux grands côtés et deux petits côtés" },
  { nom: "un losange", d: "quatre côtés de la même longueur, mais aucun angle droit" },
  { nom: "un losange", d: "quatre côtés égaux et des angles pointus ou larges, jamais droits" },
  { nom: "un triangle", d: "trois côtés et trois sommets" },
  { nom: "un triangle", d: "seulement trois côtés droits" },
  { nom: "un cercle", d: "une seule ligne courbe et aucun côté" },
  { nom: "un cercle", d: "un centre, et tous ses points à la même distance du centre" },
];

function dessinNomme(nom: string, inclinaison: number, codage = true): CanvasFigure {
  if (nom === "un cercle") return dessinCercle({ segment: null });
  if (nom === "un triangle") return dessinTriangle({ droitEn: null, inclinaison });
  const forme = nom === "un carré" ? "carre" : nom === "un rectangle" ? "rectangle" : "losange";
  return dessinQuad(forme, { inclinaison, codage, lettres: un(JEUX_DE_LETTRES) });
}

const EXPLI_FIGURE: Record<string, string> = {
  "un carré": "Quatre angles droits et quatre côtés égaux : c'est un carré, qu'il soit posé à plat ou penché.",
  "un rectangle": "Quatre angles droits, et les côtés opposés égaux deux par deux : c'est un rectangle, même penché.",
  "un losange": "Quatre côtés égaux, mais aucun angle droit : c'est un losange.",
  "un triangle": "Trois côtés et trois sommets : c'est un triangle.",
  "un cercle": "Une ligne courbe fermée, sans côté, autour d'un centre : c'est un cercle.",
};

const reconnaitreItems: TutorBankItemV4[] = [
  // ★2 — la description, sans dessin (le dessin donnerait la réponse).
  REC(1, 2, "Compte les côtés, puis regarde les angles.", () => {
    const f = un(DESCRIPTIONS);
    const t = un([
      `Quelle figure a ${f.d} ?`,
      `Je suis une figure. J'ai ${f.d}. Qui suis-je ?`,
      `Une figure a ${f.d}. Comment s'appelle-t-elle ?`,
      `Quel est le nom d'une figure qui a ${f.d} ?`,
      `Trouve la figure qui a ${f.d}.`,
      `Pic cherche une figure qui a ${f.d}. Laquelle ?`,
    ]);
    return {
      text: t,
      ...qcm(f.nom, NOMS),
      explanation: exp(
        "On décrit une figure par le nombre de ses côtés, leurs longueurs et ses angles.",
        "On lit la description morceau par morceau et on élimine les figures qui ne vont pas.",
        `${cap(f.nom)} est la figure qui a ${f.d}.`,
        `C'est ${f.nom}.`,
      ),
    };
  }),
  // ★3 — une figure souvent PENCHÉE, dans une histoire.
  REC(2, 3, "Regarde les codages : les petits carrés marquent les angles droits, les traits marquent les côtés égaux.", () => {
    const nom = un(["un carré", "un rectangle", "un losange", "un triangle"]);
    const incl = un([15, 25, 35, -20, -30, 45]);
    return {
      text: phrase(histoire(), un(QUELLE_FIGURE)),
      ...qcm(nom, ["un carré", "un rectangle", "un losange", "un triangle"]),
      canvas: dessinNomme(nom, incl),
      explanation: exp(
        "On reconnaît une figure à ses codages : les petits carrés marquent les angles droits, les traits marquent les côtés égaux.",
        "On compte les côtés, puis les angles droits et les côtés égaux, sans se laisser troubler par l'inclinaison.",
        EXPLI_FIGURE[nom],
        `C'est ${nom}.`,
      ),
    };
  }),
  // ★1 — la figure posée droit, une seule question.
  REC(3, 1, "Compte les côtés. Regarde les petits carrés : ce sont des angles droits.", () => {
    const nom = un(NOMS);
    return {
      text: phrase(amorce(), un(QUELLE_FIGURE)),
      ...qcm(nom, NOMS),
      canvas: dessinNomme(nom, 0),
      explanation: exp(
        "Chaque figure a un nom : carré, rectangle, losange, triangle, cercle.",
        "On compte les côtés, puis on regarde les angles droits et les côtés égaux.",
        EXPLI_FIGURE[nom],
        `C'est ${nom}.`,
      ),
    };
  }),
  // ★4 — le piège de la figure penchée : un enfant se trompe (ou pas).
  REC(4, 4, "Une figure ne change pas de nom quand on la tourne. Regarde ses côtés et ses angles.", () => {
    const e = enfant();
    const cas = un([
      { forme: "carre" as const, dit: "Ce n'est plus un carré, car il est penché.", juste: "non : quatre côtés égaux et quatre angles droits, c'est un carré", faux: ["oui : penché, c'est un losange", "oui : penché, c'est un rectangle", "oui : une figure penchée change de nom"] },
      { forme: "carre" as const, dit: "C'est toujours un carré, même penché.", juste: "oui : quatre côtés égaux et quatre angles droits", faux: ["non : penché, c'est un losange", "non : penché, c'est un rectangle", "non : une figure penchée change de nom"] },
      { forme: "rectangle" as const, dit: "Ce n'est pas un rectangle, car il est penché.", juste: "non : quatre angles droits, côtés opposés égaux, c'est un rectangle", faux: ["oui : penché, c'est un losange", "oui : penché, c'est un carré", "oui : une figure penchée change de nom"] },
      { forme: "rectangle" as const, dit: "C'est un rectangle, même s'il est penché.", juste: "oui : quatre angles droits, côtés opposés égaux", faux: ["non : penché, c'est un losange", "non : penché, c'est un carré", "non : une figure penchée change de nom"] },
      { forme: "losange" as const, dit: "C'est un carré qu'on a tourné.", juste: "non : il n'a aucun angle droit, c'est un losange", faux: ["oui : c'est un carré tourné", "oui : c'est un rectangle tourné", "non : c'est un triangle"] },
      { forme: "losange" as const, dit: "C'est un losange : quatre côtés égaux, pas d'angle droit.", juste: "oui : c'est bien un losange", faux: ["non : c'est un carré tourné", "non : c'est un rectangle", "non : un losange a quatre angles droits"] },
    ]);
    return {
      text: phrase(histoire(), `${e.nom} dit : « ${cas.dit} »`, aRaison(e)),
      ...qcm(cas.juste, cas.faux),
      canvas: dessinQuad(cas.forme, { inclinaison: un([30, 35, 40, 45, -30, -40]), lettres: un(JEUX_DE_LETTRES) }),
      explanation: exp(
        "Ce qui fait une figure, ce sont ses côtés et ses angles, pas la façon dont elle est posée.",
        "On lit les codages : petits carrés pour les angles droits, traits pour les côtés égaux.",
        cas.forme === "losange" ? EXPLI_FIGURE["un losange"] : EXPLI_FIGURE[cas.forme === "carre" ? "un carré" : "un rectangle"],
        cap(cas.juste) + ".",
      ),
    };
  }),
];

/* ═════════════ ce2_figure_triangle_rectangle ═════════════ */
const TRI = G("ce2_figure_triangle_rectangle");
const SOMMETS: Sommet[] = ["A", "B", "C"];
const nomDe = (l: [string, string, string], s: Sommet) => l[SOMMETS.indexOf(s)];

const triangleRectangleItems: TutorBankItemV4[] = [
  // ★3 — où est l'angle droit ? Non marqué : on le trouve à l'équerre.
  TRI(1, 3, "Pose le coin de ton équerre sur chaque sommet.", () => {
    const l = un(LETTRES_TRI);
    const s = un(SOMMETS);
    const juste = `en ${nomDe(l, s)}`;
    return {
      text: phrase(
        histoire(),
        "C'est un triangle rectangle.",
        un(["À quel sommet est l'angle droit ?", "Où se trouve son angle droit ?", "Quel sommet a l'angle droit ?", "Trouve son angle droit."]),
      ),
      ...qcm(juste, l.map((x) => `en ${x}`)),
      canvas: dessinTriangle({ droitEn: s, marquer: false, inclinaison: un([0, 15, 30, 50, -25, -45, 90, 160]), lettres: l }),
      explanation: exp(
        "Un triangle rectangle a un angle droit, et un seul.",
        "On pose le coin de l'équerre sur chaque sommet : l'angle droit est celui qui colle exactement au coin.",
        `Le coin de l'équerre colle en ${nomDe(l, s)}. Les deux autres angles sont plus pointus.`,
        `L'angle droit est ${juste}.`,
      ),
    };
  }),
  // ★3 — est-il rectangle ? À vérifier à l'équerre.
  TRI(2, 3, "Pose le coin de ton équerre sur chaque sommet : un seul angle droit suffit.", () => {
    const l = un(LETTRES_TRI);
    const droit = Math.random() < 0.5 ? un(SOMMETS) : null;
    const juste = droit ? `oui, l'angle en ${nomDe(l, droit)} est droit` : "non, aucun angle n'est droit";
    const faux = [...l.map((x) => `oui, l'angle en ${x} est droit`), "non, aucun angle n'est droit"];
    return {
      text: phrase(
        histoire(),
        un(["Est-ce un triangle rectangle ?", "Ce triangle est-il rectangle ?", "Ce triangle a-t-il un angle droit ?"]),
        un(["Vérifie avec ton équerre.", "Prends ton équerre.", ""]),
      ),
      ...qcm(juste, faux),
      canvas: dessinTriangle({ droitEn: droit, marquer: false, inclinaison: un([0, 20, 40, -30, 70, 120]), lettres: l }),
      explanation: exp(
        "Un triangle est rectangle s'il a un angle droit.",
        "On pose le coin de l'équerre sur chacun des trois sommets.",
        droit
          ? `En ${nomDe(l, droit)}, le coin de l'équerre colle exactement : c'est un angle droit.`
          : "Aucun sommet ne colle au coin de l'équerre : les angles sont plus pointus ou plus ouverts.",
        cap(juste) + ".",
      ),
    };
  }),
  // ★1 — le petit carré : rectangle ou pas ?
  TRI(3, 1, "Le petit carré dans un coin marque un angle droit.", () => {
    const l = un(LETTRES_TRI);
    const droit = Math.random() < 0.5 ? un(SOMMETS) : null;
    const juste = droit ? "oui, il a un angle droit" : "non, il n'a pas d'angle droit";
    return {
      text: phrase(
        amorce(),
        un([
          "Ce triangle est-il un triangle rectangle ?",
          "Ce triangle a-t-il un angle droit ?",
          "Le petit carré marque un angle droit. Ce triangle est-il rectangle ?",
          "Est-ce un triangle rectangle ?",
        ]),
      ),
      ...qcm(juste, ["oui, il a un angle droit", "non, il n'a pas d'angle droit", "oui, il a deux angles droits"]),
      canvas: dessinTriangle({ droitEn: droit, marquer: true, inclinaison: un([0, 0, 10, -10]), lettres: l }),
      explanation: exp(
        "Un triangle rectangle est un triangle qui a un angle droit.",
        "On cherche le petit carré dans un coin : il marque l'angle droit.",
        droit ? `Le petit carré est en ${nomDe(l, droit)} : il y a un angle droit.` : "Il n'y a aucun petit carré, et aucun coin n'est droit.",
        cap(juste) + ".",
      ),
    };
  }),
  // ★4 — penché, l'angle droit en haut : toujours rectangle.
  TRI(4, 4, "La place de l'angle droit ne change rien : un angle droit, c'est un triangle rectangle.", () => {
    const e = enfant();
    const l = un(LETTRES_TRI);
    const s = un(SOMMETS);
    const cas = un([
      { dit: "Ce triangle n'est pas rectangle, car l'angle droit n'est pas en bas.", juste: "non : il a un angle droit, c'est un triangle rectangle", faux: ["oui : l'angle droit doit être en bas", "oui : un triangle penché n'a pas d'angle droit", "oui : il faudrait deux angles droits"] },
      { dit: "Ce triangle est rectangle, même penché.", juste: "oui : le petit carré marque un angle droit", faux: ["non : l'angle droit doit être en bas", "non : un triangle penché n'a pas d'angle droit", "non : il faudrait deux angles droits"] },
      { dit: "Si on le tourne, il ne sera plus rectangle.", juste: "non : en le tournant, l'angle droit reste droit", faux: ["oui : tourner change les angles", "oui : il deviendra un carré", "oui : il perdra un côté"] },
      { dit: `Ce triangle a un angle droit en ${nomDe(l, s)}.`, juste: "oui : le petit carré est sur ce sommet", faux: ["non : il n'a pas d'angle droit", "non : l'angle droit est toujours en bas", "non : il a trois angles droits"] },
    ]);
    return {
      text: phrase(histoire(), `${e.nom} dit : « ${cas.dit} »`, aRaison(e)),
      ...qcm(cas.juste, cas.faux),
      canvas: dessinTriangle({ droitEn: s, marquer: true, inclinaison: un([35, 60, 135, 160, -50, 200]), lettres: l }),
      explanation: exp(
        "Un triangle rectangle a un angle droit, où qu'il soit sur le dessin.",
        "On cherche le petit carré : c'est l'angle droit. Tourner la figure ne change pas ses angles.",
        `Le petit carré est en ${nomDe(l, s)} : ce triangle est rectangle, qu'il soit posé à plat ou penché.`,
        cap(cas.juste) + ".",
      ),
    };
  }),
];

/* ═════════════ ce2_figure_losange ═════════════ */
const LOS = G("ce2_figure_losange");

const OBJETS_LOSANGE: Array<{ o: string; u: "cm" | "m"; min: number; max: number }> = [
  { o: "Le cerf-volant de Téo", u: "cm", min: 30, max: 60 },
  { o: "Le panneau du chantier", u: "cm", min: 40, max: 80 },
  { o: "Un carreau du vitrail du château", u: "cm", min: 8, max: 20 },
  { o: "Le biscuit de Lina", u: "cm", min: 4, max: 9 },
  { o: "Un motif du pull de Ravi", u: "cm", min: 3, max: 8 },
  { o: "La gommette de Jade", u: "cm", min: 2, max: 6 },
  { o: "Le badge de la pompière", u: "cm", min: 4, max: 9 },
  { o: "La fenêtre de la cabane", u: "cm", min: 30, max: 70 },
  { o: "Le tapis du chat", u: "cm", min: 40, max: 90 },
  { o: "Le drapeau de la kermesse", u: "cm", min: 20, max: 50 },
  { o: "La tuile du toit du château", u: "cm", min: 15, max: 30 },
  { o: "Le massif de fleurs du jardinier", u: "m", min: 2, max: 9 },
  { o: "La voile du bateau pirate", u: "m", min: 2, max: 6 },
  { o: "Le coussin de Zoé", u: "cm", min: 25, max: 45 },
  { o: "La carte de la boulangère", u: "cm", min: 6, max: 15 },
  { o: "L'étiquette du pot de miel", u: "cm", min: 4, max: 9 },
];

const losangeItems: TutorBankItemV4[] = [
  // ★3 — un objet en forme de losange (ou pas), penché.
  LOS(1, 3, "Un losange : quatre côtés de même longueur, et pas d'angle droit.", () => {
    const ob = un(OBJETS_LOSANGE);
    const forme = un(["losange", "losange", "carre", "rectangle"] as const);
    const nom = NOM_FIGURE[forme];
    const typeQ = Math.random() < 0.6 ? "forme" : "angles";
    if (typeQ === "angles") {
      return {
        text: phrase(`${ob.o} a la forme d'un losange.`, un(["Combien a-t-il d'angles droits ?", "Combien d'angles droits vois-tu ?", "Combien d'angles droits a ce losange ?"])),
        ...qcm("aucun", ["aucun", "un seul", "deux", "quatre"]),
        canvas: dessinQuad("losange", { inclinaison: un([0, 20, -25, 90, 70]), lettres: un(JEUX_DE_LETTRES) }),
        explanation: exp(
          "Un losange a quatre côtés de même longueur. Ses angles sont pointus ou larges.",
          "On pose le coin de l'équerre sur chaque sommet.",
          "Aucun coin ne colle à l'équerre : deux angles sont pointus, deux sont larges.",
          "Il n'a aucun angle droit.",
        ),
      };
    }
    return {
      text: phrase(`Voici ${ob.o.charAt(0).toLowerCase()}${ob.o.slice(1)}.`, un(["Quelle est cette forme ?", "Comment s'appelle cette forme ?", "Quelle figure est-ce ?", "Quel est le nom de cette figure ?"])),
      ...qcm(nom, ["un losange", "un carré", "un rectangle", "un triangle"]),
      canvas: dessinQuad(forme, { inclinaison: un([20, -25, 35, 70, 110]), lettres: un(JEUX_DE_LETTRES) }),
      explanation: exp(
        "Le losange a quatre côtés égaux, sans angle droit ; le carré a quatre côtés égaux ET quatre angles droits.",
        "On regarde les codages : traits des côtés égaux, petits carrés des angles droits.",
        EXPLI_FIGURE[nom],
        `C'est ${nom}.`,
      ),
    };
  }),
  // ★3 — un côté connu : les trois autres ont la même longueur.
  LOS(2, 3, "Dans un losange, les quatre côtés ont la même longueur.", () => {
    const ob = un(OBJETS_LOSANGE);
    const c = entre(ob.min, ob.max);
    const l = un(JEUX_DE_LETTRES);
    const q = un([
      ["Combien mesure chacun des trois autres côtés ?", 0],
      [`Combien mesure le côté [${l[2]}${l[3]}] ?`, 0],
      [`Combien mesure le côté [${l[1]}${l[2]}] ?`, 0],
      ["Quelle est la longueur des autres côtés ?", 0],
    ] as const)[0];
    return {
      text: phrase(`${ob.o} est un losange.`, `Le côté [${l[0]}${l[1]}] mesure ${c} ${ob.u}.`, q),
      ...qcmN(c, [2 * c, 4 * c, c + 1, c - 1, c + 2], ob.u),
      canvas: dessinQuad("losange", { inclinaison: un([0, 15, -20, 30]), lettres: l, cotes: { AB: `${c} ${ob.u}` } }),
      explanation: exp(
        "Un losange a quatre côtés de même longueur : les petits traits le rappellent sur le dessin.",
        "Un côté suffit pour connaître les trois autres.",
        `[${l[0]}${l[1]}] mesure ${c} ${ob.u}, donc chaque côté mesure ${c} ${ob.u}.`,
        `Chaque côté mesure ${c} ${ob.u}.`,
      ),
    };
  }),
  // ★2 — est-ce un losange ?
  LOS(3, 2, "Regarde les petits traits : ils marquent les côtés de même longueur.", () => {
    const forme = un(["losange", "losange", "rectangle", "quelconque"] as const);
    const juste = forme === "losange" ? "oui, ses quatre côtés sont égaux" : "non, ses quatre côtés ne sont pas égaux";
    return {
      text: phrase(amorce(), un(["Ce dessin est-il un losange ?", "Est-ce un losange ?", "Peut-on dire que c'est un losange ?", "Ce dessin montre-t-il un losange ?"])),
      ...qcm(juste, ["oui, ses quatre côtés sont égaux", "non, ses quatre côtés ne sont pas égaux", "oui, il a quatre angles droits", "non, il n'a que trois côtés"]),
      canvas: dessinQuad(forme, { inclinaison: un([0, 0, 90, 10]), lettres: un(JEUX_DE_LETTRES) }),
      explanation: exp(
        "Un losange est un quadrilatère qui a quatre côtés de même longueur.",
        "On regarde si les quatre côtés portent le même codage (ou on les mesure).",
        forme === "losange"
          ? "Les quatre côtés portent le même petit trait : ils sont égaux."
          : forme === "rectangle"
            ? "Deux côtés sont longs et deux sont courts : ils ne sont pas tous égaux."
            : "Les côtés n'ont pas tous la même longueur.",
        cap(juste) + ".",
      ),
    };
  }),
  // ★4 — vrai ou faux sur le losange.
  LOS(4, 4, "Un losange : quatre côtés égaux, mais ses angles ne sont pas droits.", () => {
    const e = enfant();
    const [dit, vrai] = un([
      ["Ses quatre côtés ont la même longueur.", true],
      ["Il a quatre côtés et quatre sommets.", true],
      ["Il n'a aucun angle droit.", true],
      ["Il a quatre angles droits.", false],
      ["Seulement deux de ses côtés sont égaux.", false],
      ["C'est un carré posé de travers.", false],
      ["Il a trois sommets.", false],
    ] as const);
    const juste = vrai ? OUI_VRAI : NON_FAUX;
    return {
      text: phrase(`${e.nom} regarde ce losange.`, `${cap(e.il)} dit : « ${dit} »`, aRaison(e)),
      ...qcm(juste, [OUI_VRAI, NON_FAUX, "on ne peut pas savoir"]),
      canvas: dessinQuad("losange", { inclinaison: un([25, -30, 60, 110]), lettres: un(JEUX_DE_LETTRES) }),
      explanation: exp(
        "Un losange a quatre côtés de même longueur et quatre sommets. Il n'a pas d'angle droit : ce n'est pas un carré.",
        "On compare la phrase au dessin et à ses codages.",
        `« ${dit} » : ${vrai ? "c'est bien ce que montre le dessin" : "le dessin montre le contraire"}.`,
        cap(juste) + ".",
      ),
    };
  }),
];

/* ═════════════ ce2_figure_proprietes ═════════════ */
const PRO = G("ce2_figure_proprietes");

const OBJETS_RECTANGLE: Array<{ o: string; u: "cm" | "m"; L: [number, number]; l: [number, number] }> = [
  { o: "La porte de la cabane", u: "cm", L: [150, 200], l: [60, 90] },
  { o: "Le tapis de la chambre", u: "cm", L: [120, 200], l: [60, 100] },
  { o: "La carte au trésor", u: "cm", L: [30, 50], l: [15, 25] },
  { o: "Le terrain de foot de l'école", u: "m", L: [40, 90], l: [20, 35] },
  { o: "L'étiquette du pot de confiture", u: "cm", L: [8, 12], l: [3, 6] },
  { o: "La fenêtre du château", u: "cm", L: [80, 120], l: [40, 60] },
  { o: "La nappe du goûter", u: "cm", L: [150, 250], l: [80, 120] },
  { o: "Le livre de la bibliothèque", u: "cm", L: [25, 32], l: [15, 21] },
  { o: "Le panneau du zoo", u: "cm", L: [80, 120], l: [30, 60] },
  { o: "Le cadre photo de Zoé", u: "cm", L: [20, 30], l: [10, 18] },
  { o: "Le bac à sable", u: "m", L: [4, 8], l: [2, 3] },
  { o: "La piscine de Malo", u: "m", L: [6, 12], l: [3, 5] },
  { o: "Le potager du jardinier", u: "m", L: [8, 15], l: [3, 6] },
  { o: "L'aquarium de Ravi, vu de face", u: "cm", L: [50, 90], l: [25, 40] },
  { o: "Le tableau de la classe", u: "cm", L: [200, 300], l: [100, 120] },
  { o: "La boîte de crayons", u: "cm", L: [15, 22], l: [8, 12] },
];

const proprietesItems: TutorBankItemV4[] = [
  // ★3 — rectangle coté : le côté d'en face a la même longueur.
  PRO(1, 3, "Dans un rectangle, les côtés opposés (face à face) ont la même longueur.", () => {
    const ob = un(OBJETS_RECTANGLE);
    const L = entre(...ob.L);
    const la = entre(...ob.l);
    const l = un(JEUX_DE_LETTRES);
    const cherche = un(["CD", "DA"] as const);
    const rep = cherche === "CD" ? L : la;
    const nomCherche = cherche === "CD" ? `${l[2]}${l[3]}` : `${l[3]}${l[0]}`;
    return {
      text: phrase(
        `${ob.o} est un rectangle.`,
        `[${l[0]}${l[1]}] mesure ${L} ${ob.u} et [${l[1]}${l[2]}] mesure ${la} ${ob.u}.`,
        un([`Combien mesure [${nomCherche}] ?`, `Quelle est la longueur de [${nomCherche}] ?`, `Trouve la longueur du côté [${nomCherche}].`]),
      ),
      ...qcmN(rep, [cherche === "CD" ? la : L, L + la, rep + 1, rep * 2], ob.u),
      canvas: dessinQuad("rectangle", { inclinaison: un([0, 0, 10, -10]), lettres: l, cotes: { AB: `${L} ${ob.u}`, BC: `${la} ${ob.u}` } }),
      explanation: exp(
        "Dans un rectangle, les côtés opposés ont la même longueur.",
        `On cherche le côté qui est en face de [${nomCherche}].`,
        `[${nomCherche}] est en face de ${cherche === "CD" ? `[${l[0]}${l[1]}]` : `[${l[1]}${l[2]}]`}, qui mesure ${rep} ${ob.u}.`,
        `[${nomCherche}] mesure ${rep} ${ob.u}.`,
      ),
    };
  }),
  // ★3 — combien d'angles droits ? À l'équerre, sur une forme non codée.
  PRO(2, 3, "Pose le coin de ton équerre sur chaque sommet.", () => {
    const forme = un(["carre", "rectangle", "losange", "triangle_rectangle", "triangle"] as const);
    const rep = { carre: "quatre", rectangle: "quatre", losange: "aucun", triangle_rectangle: "un seul", triangle: "aucun" }[forme];
    const canvas: CanvasFigure =
      forme === "triangle_rectangle"
        ? dessinTriangle({ droitEn: un(SOMMETS), marquer: false, inclinaison: un([0, 25, -30, 60]), lettres: un(LETTRES_TRI) })
        : forme === "triangle"
          ? dessinTriangle({ droitEn: null, inclinaison: un([0, 25, -30]) })
          : dessinQuad(forme, { inclinaison: un([0, 20, -25, 40]), codage: false, lettres: un(JEUX_DE_LETTRES) });
    return {
      text: phrase(histoire(), un(["Combien d'angles droits a-t-elle ?", "Combien d'angles droits compte cette forme ?", "Combien vois-tu d'angles droits ?"]), un(["Vérifie avec ton équerre.", "Prends ton équerre.", ""])),
      ...qcm(rep, ["aucun", "un seul", "deux", "quatre"]),
      canvas,
      explanation: exp(
        "Un angle droit, c'est le coin de l'équerre.",
        "On pose le coin de l'équerre sur chaque sommet, l'un après l'autre.",
        forme === "carre" || forme === "rectangle"
          ? "Le coin colle aux quatre sommets : quatre angles droits."
          : forme === "triangle_rectangle"
            ? "Le coin colle à un seul sommet : un seul angle droit."
            : "Le coin ne colle à aucun sommet : aucun angle droit.",
        `Elle a ${rep === "un seul" ? "un seul angle droit" : rep === "aucun" ? "aucun angle droit" : "quatre angles droits"}.`,
      ),
    };
  }),
  // ★2 — lire un carré ou un rectangle codé.
  PRO(3, 2, "Les petits carrés marquent les angles droits, les petits traits les côtés égaux.", () => {
    const forme = un(["carre", "rectangle"] as const);
    const l = un(JEUX_DE_LETTRES);
    const typeQ = un(["angles", "cotes", "face"] as const);
    const L = entre(5, 9);
    const la = entre(2, 4);
    const avecLongueurs = forme === "rectangle" && typeQ === "cotes";
    const canvas = dessinQuad(forme, {
      inclinaison: un([0, 0, 15, -15]),
      lettres: l,
      cotes: avecLongueurs ? { AB: `${L} cm`, BC: `${la} cm`, CD: `${L} cm`, DA: `${la} cm` } : undefined,
    });
    const nom = NOM_FIGURE[forme];
    if (typeQ === "face" && forme === "rectangle") {
      const paire = un([[0, 1, 2, 3], [1, 2, 3, 0], [2, 3, 0, 1], [3, 0, 1, 2]]);
      const cote = `[${l[paire[0]]}${l[paire[1]]}]`;
      const juste = `[${l[paire[2]]}${l[paire[3]]}]`;
      const autres = [`[${l[paire[1]]}${l[paire[2]]}]`, `[${l[paire[3]]}${l[paire[0]]}]`, `[${l[paire[0]]}${l[paire[2]]}]`];
      return {
        text: phrase(amorce(), "Ce rectangle a quatre angles droits.", un([`Quel côté a la même longueur que ${cote} ?`, `Quel côté est aussi long que ${cote} ?`, `${cote} a la même longueur qu'un autre côté. Lequel ?`])),
        ...qcm(juste, autres),
        canvas,
        explanation: exp(
          "Dans un rectangle, les côtés opposés ont la même longueur.",
          "On cherche le côté qui est en face, avec le même codage.",
          `${juste} est en face de ${cote} : dans un rectangle, ils ont la même longueur.`,
          `C'est ${juste}.`,
        ),
      };
    }
    if (typeQ === "angles") {
      return {
        text: phrase(amorce(), un([`Combien d'angles droits a ${nom.replace("un ", "ce ")} ?`, "Combien de petits carrés vois-tu sur la figure ?", "Combien cette figure a-t-elle d'angles droits ?"])),
        ...qcm("quatre", ["quatre", "deux", "un seul", "aucun"]),
        canvas,
        explanation: exp(
          "Un petit carré dans un coin marque un angle droit.",
          "On compte les petits carrés, sommet par sommet.",
          `Il y a un petit carré à chacun des quatre sommets.`,
          "Elle a quatre angles droits.",
        ),
      };
    }
    const juste = forme === "carre" ? "les quatre côtés sont égaux" : "les côtés opposés, deux par deux";
    return {
      text: phrase(
        amorce(),
        avecLongueurs
          ? un(["Quels côtés de ce rectangle ont la même longueur ?", "Lis les longueurs. Quels côtés sont égaux ?", "Que remarques-tu sur les longueurs des côtés ?"])
          : un(["Quels côtés de ce carré ont la même longueur ?", "Regarde les petits traits. Quels côtés sont égaux ?", "Que disent les petits traits sur les côtés ?"]),
      ),
      ...qcm(juste, ["les quatre côtés sont égaux", "les côtés opposés, deux par deux", "aucun côté n'est égal à un autre", "seulement deux côtés voisins"]),
      canvas,
      explanation: exp(
        avecLongueurs ? "Deux côtés de même longueur sont des côtés égaux." : "Les petits traits identiques marquent des côtés de même longueur.",
        avecLongueurs ? "On compare les longueurs écrites." : "On regarde quels côtés portent le même petit trait.",
        forme === "carre" ? "Les quatre côtés portent le même trait : ils sont tous égaux." : `Les côtés face à face mesurent ${L} cm et ${la} cm : ils sont égaux deux par deux.`,
        cap(juste) + ".",
      ),
    };
  }),
  // ★4 — vrai ou faux sur le carré et le rectangle.
  PRO(4, 4, "Carré : quatre côtés égaux et quatre angles droits. Rectangle : quatre angles droits et côtés opposés égaux.", () => {
    const e = enfant();
    const [forme, dit, vrai] = un([
      ["carre", "Dans un carré, les quatre côtés ont la même longueur.", true],
      ["carre", "Un carré a quatre angles droits.", true],
      ["carre", "Un carré n'a que deux angles droits.", false],
      ["carre", "Dans un carré, seulement deux côtés sont égaux.", false],
      ["rectangle", "Dans un rectangle, les côtés opposés ont la même longueur.", true],
      ["rectangle", "Un rectangle a quatre angles droits.", true],
      ["rectangle", "Dans un rectangle, les quatre côtés sont toujours égaux.", false],
      ["rectangle", "Un rectangle n'a que deux angles droits.", false],
      ["rectangle", "Dans un rectangle, deux côtés voisins ont toujours la même longueur.", false],
    ] as const);
    const juste = vrai ? OUI_VRAI : NON_FAUX;
    return {
      text: phrase(`${e.nom} dit : « ${dit} »`, aRaison(e)),
      ...qcm(juste, [OUI_VRAI, NON_FAUX, "on ne peut pas savoir"]),
      canvas: dessinQuad(forme, { inclinaison: un([0, 20, -25, 35]), lettres: un(JEUX_DE_LETTRES) }),
      explanation: exp(
        forme === "carre" ? "Un carré a quatre côtés égaux et quatre angles droits." : "Un rectangle a quatre angles droits, et ses côtés opposés sont égaux deux par deux.",
        "On compare la phrase à la figure et à ses codages.",
        `« ${dit} » : ${vrai ? "c'est bien ce que montre la figure" : "la figure montre le contraire"}.`,
        cap(juste) + ".",
      ),
    };
  }),
];

/* ═════════════ ce2_figure_construire ═════════════ */
const CON = G("ce2_figure_construire");
const INSTRUMENTS = ["la règle", "l'équerre", "le compas", "la gomme"];
const ACTIONS: Array<{ a: string; i: string }> = [
  { a: "tracer un trait bien droit", i: "la règle" },
  { a: "mesurer la longueur d'un segment", i: "la règle" },
  { a: "vérifier qu'un angle est droit", i: "l'équerre" },
  { a: "tracer un angle droit", i: "l'équerre" },
  { a: "tracer un cercle", i: "le compas" },
  { a: "reporter une longueur sans la mesurer", i: "le compas" },
];

const SITUATIONS_OUTIL: Array<{ s: (q: string) => string; i: string }> = [
  { s: (q) => `veut vérifier que le coin de la table est droit. ${q}`, i: "l'équerre" },
  { s: (q) => `veut tracer la piste ronde du cirque sur son dessin. ${q}`, i: "le compas" },
  { s: (q) => `veut tracer le mât bien droit de son bateau pirate. ${q}`, i: "la règle" },
  { s: (q) => `veut dessiner le hublot rond de sa fusée. ${q}`, i: "le compas" },
  { s: (q) => `veut vérifier que le coin de la porte est un angle droit. ${q}`, i: "l'équerre" },
  { s: (q) => `veut mesurer la longueur de son crayon. ${q}`, i: "la règle" },
  { s: (q) => `veut dessiner une roue de vélo bien ronde. ${q}`, i: "le compas" },
  { s: (q) => `veut vérifier que le coin de son cahier est droit. ${q}`, i: "l'équerre" },
  { s: (q) => `veut tracer un trait droit entre deux points. ${q}`, i: "la règle" },
  { s: (q) => `veut dessiner une pizza toute ronde. ${q}`, i: "le compas" },
  { s: (q) => `veut tracer le coin carré d'une cabane. ${q}`, i: "l'équerre" },
  { s: (q) => `veut tracer le soleil bien rond de son dessin. ${q}`, i: "le compas" },
];
const QUI_OUTIL: Array<{ n: string; il: "il" | "elle" }> = [
  ...ENFANTS.slice(0, 10).map((e) => ({ n: e.nom, il: e.il })),
  { n: "Le menuisier", il: "il" },
  { n: "L'architecte", il: "elle" },
  { n: "La maîtresse", il: "elle" },
  { n: "Le maçon", il: "il" },
];

const construireItems: TutorBankItemV4[] = [
  // ★2 — la figure dessinée : quel instrument en plus de la règle ?
  CON(1, 2, "Un cercle se trace au compas ; un angle droit, à l'équerre.", () => {
    const fig = un(["cercle", "carre", "rectangle", "triangle_rectangle"] as const);
    const juste = fig === "cercle" ? "le compas" : "l'équerre";
    const canvas: CanvasFigure =
      fig === "cercle"
        ? dessinCercle({ segment: un(["rayon", null] as const) })
        : fig === "triangle_rectangle"
          ? dessinTriangle({ droitEn: un(SOMMETS), marquer: true, lettres: un(LETTRES_TRI) })
          : dessinQuad(fig, { lettres: un(JEUX_DE_LETTRES) });
    return {
      text: phrase(
        amorce(),
        un([
          "Pour reproduire cette figure, quel instrument faut-il en plus de la règle ?",
          "Tu veux tracer la même figure. Que prends-tu en plus de la règle ?",
          "En plus de la règle, quel instrument sert à tracer cette figure ?",
          "Quel instrument t'aide à tracer cette figure, avec la règle ?",
        ]),
      ),
      ...qcm(juste, INSTRUMENTS.filter((x) => x !== "la règle").concat(["le crayon de couleur"])),
      canvas,
      explanation: exp(
        "La règle trace les traits droits. L'équerre trace les angles droits. Le compas trace les cercles.",
        "On regarde ce que la figure contient : des angles droits, ou une ligne courbe ?",
        fig === "cercle" ? "La figure est un cercle : il faut le compas." : "La figure a des angles droits (les petits carrés) : il faut l'équerre.",
        `Il faut ${juste}.`,
      ),
    };
  }),
  // ★4 — les étapes d'une construction.
  CON(2, 4, "Après le premier côté, il faut un angle droit : c'est le travail de l'équerre.", () => {
    const e = enfant();
    const l = un(JEUX_DE_LETTRES);
    const fam = un(["rectangle", "carre", "cercle", "instruments"] as const);
    if (fam === "cercle") {
      const r = entre(2, 9);
      const juste = `${cap(e.il)} écarte le compas de ${r} cm.`;
      return {
        text: phrase(`${e.nom} veut tracer un cercle de centre O et de rayon ${r} cm.`, un([`Que fait-${e.il} d'abord ?`, "Quelle est la première chose à faire ?"])),
        ...qcm(juste, [`${cap(e.il)} écarte le compas de ${2 * r} cm.`, `${cap(e.il)} trace un angle droit avec l'équerre.`, `${cap(e.il)} plante la pointe du compas n'importe où.`]),
        explanation: exp(
          "Pour tracer un cercle, on ouvre le compas du RAYON, puis on plante la pointe sur le centre.",
          "L'écart entre la pointe et la mine est le rayon.",
          `Le rayon vaut ${r} cm : on écarte le compas de ${r} cm, puis on pique en O.`,
          juste,
        ),
      };
    }
    if (fam === "instruments") {
      const [fig, juste] = un([
        [`un carré de ${entre(3, 9)} cm de côté`, "la règle graduée et l'équerre"],
        [`un rectangle de ${entre(6, 10)} cm sur ${entre(2, 5)} cm`, "la règle graduée et l'équerre"],
        [`un cercle de rayon ${entre(2, 8)} cm`, "le compas et la règle graduée"],
        [`un triangle rectangle de côtés ${entre(3, 6)} cm et ${entre(4, 8)} cm autour de l'angle droit`, "la règle graduée et l'équerre"],
      ] as const);
      return {
        text: phrase(`${e.nom} veut construire ${fig}.`, un(["Quels instruments lui faut-il ?", "De quels instruments a-t-" + e.il + " besoin ?", "Que doit-" + e.il + " sortir de sa trousse ?"])),
        ...qcm(juste, ["la règle graduée et l'équerre", "le compas et la règle graduée", "la règle graduée seule", "l'équerre seule"]),
        explanation: exp(
          "La règle graduée mesure et trace les côtés ; l'équerre trace les angles droits ; le compas trace les cercles.",
          "On se demande ce que la figure demande : des longueurs, des angles droits, un cercle ?",
          juste === "le compas et la règle graduée" ? "Un cercle se trace au compas, et la règle graduée sert à l'ouvrir du bon rayon." : "Il faut mesurer les côtés (règle graduée) et faire des angles droits (équerre).",
          `Il faut ${juste}.`,
        ),
      };
    }
    const L = fam === "carre" ? entre(3, 9) : entre(6, 10);
    const la = fam === "carre" ? L : entre(2, 5);
    const juste = `un angle droit en ${l[1]} à l'équerre, puis [${l[1]}${l[2]}] de ${la} cm`;
    const faux = [
      fam === "carre" ? `un angle droit en ${l[1]} à l'équerre, puis [${l[1]}${l[2]}] de ${la + 2} cm` : `un angle droit en ${l[1]} à l'équerre, puis [${l[1]}${l[2]}] de ${L} cm`,
      `[${l[1]}${l[2]}] de ${la} cm, penché, sans équerre`,
      `un cercle de rayon ${la} cm au compas`,
    ];
    return {
      text: phrase(
        `${e.nom} construit ${fam === "carre" ? `un carré de ${L} cm de côté` : `un rectangle de ${L} cm sur ${la} cm`}.`,
        `${cap(e.il)} a déjà tracé [${l[0]}${l[1]}] de ${L} cm.`,
        un(["Que trace-t-" + e.il + " ensuite ?", "Que doit-" + e.il + " tracer maintenant ?"]),
      ),
      ...qcm(juste, faux),
      explanation: exp(
        fam === "carre" ? "Un carré a quatre angles droits et quatre côtés égaux." : "Un rectangle a quatre angles droits ; ses côtés opposés sont égaux.",
        "Après le premier côté, on trace un angle droit à l'équerre, puis le deuxième côté à la bonne longueur.",
        `En ${l[1]}, l'équerre donne l'angle droit, et [${l[1]}${l[2]}] doit mesurer ${la} cm.`,
        `${cap(e.il)} trace ${juste}.`,
      ),
    };
  }),
  // ★1 — à quoi sert chaque instrument.
  CON(3, 1, "La règle : traits droits. L'équerre : angles droits. Le compas : cercles.", () => {
    const x = un(ACTIONS);
    return {
      text: phrase(
        un(["", "Ouvre ta trousse.", "Regarde ta trousse.", "Petite question.", "Réfléchis."]),
        un([`Quel instrument sert à ${x.a} ?`, `Avec quel instrument peut-on ${x.a} ?`, `Quel outil de la trousse sert à ${x.a} ?`, `Pour ${x.a}, quel instrument prends-tu ?`]),
      ),
      ...qcm(x.i, INSTRUMENTS),
      explanation: exp(
        "Chaque instrument a son travail : la règle pour les traits droits et les mesures, l'équerre pour les angles droits, le compas pour les cercles et les reports de longueur.",
        "On se demande ce qu'on veut obtenir.",
        `Pour ${x.a}, on prend ${x.i}.`,
        `C'est ${x.i}.`,
      ),
    };
  }),
  // ★3 — un métier ou un enfant a besoin d'un instrument.
  CON(4, 3, "Un coin droit se vérifie à l'équerre ; un rond se trace au compas.", () => {
    const qui = un(QUI_OUTIL);
    const s = un(SITUATIONS_OUTIL);
    const q = un([`Quel instrument prend-${qui.il} ?`, "Quel instrument faut-il ?", `De quel instrument a-t-${qui.il} besoin ?`]);
    return {
      text: `${qui.n} ${s.s(q)}`,
      ...qcm(s.i, INSTRUMENTS),
      explanation: exp(
        "La règle trace et mesure les traits droits, l'équerre vérifie et trace les angles droits, le compas trace les ronds.",
        "On se demande ce qu'il faut obtenir : un trait droit, un angle droit ou un cercle ?",
        `Ici, il faut ${s.i}.`,
        `C'est ${s.i}.`,
      ),
    };
  }),
];

/* ═════════════ ce2_figure_cercle ═════════════ */
const CER = G("ce2_figure_cercle");
const NOMS_POINTS: Array<[string, string]> = [["A", "B"], ["M", "N"], ["E", "F"], ["R", "S"], ["P", "Q"], ["K", "L"]];

const OBJETS_RONDS: Array<{ o: string; u: "cm" | "m"; r: [number, number] }> = [
  { o: "La roue du vélo de Téo", u: "cm", r: [20, 35] },
  { o: "La pizza du chef cuisinier", u: "cm", r: [12, 20] },
  { o: "Le tapis rond de la classe", u: "cm", r: [60, 90] },
  { o: "La piste du cirque", u: "m", r: [5, 9] },
  { o: "Le bassin du jardin", u: "m", r: [2, 6] },
  { o: "Le trampoline de Lou", u: "m", r: [1, 3] },
  { o: "L'horloge de l'école", u: "cm", r: [15, 25] },
  { o: "Le gâteau d'anniversaire de Lina", u: "cm", r: [10, 15] },
  { o: "La bouée de Malo", u: "cm", r: [25, 40] },
  { o: "Le hublot de la fusée", u: "cm", r: [20, 30] },
  { o: "Le tambour de Ravi", u: "cm", r: [15, 25] },
  { o: "L'assiette du goûter", u: "cm", r: [9, 13] },
  { o: "Le manège de la kermesse", u: "m", r: [3, 7] },
  { o: "La table ronde de la bibliothèque", u: "cm", r: [50, 70] },
  { o: "Le nid de Pic, vu d'en haut", u: "cm", r: [8, 14] },
  { o: "La galette des rois", u: "cm", r: [11, 16] },
];

const OBJETS_A_TRACER = ["le soleil", "une roue", "une pizza", "un ballon", "une pièce de monnaie", "la lune", "une planète", "un hublot", "une bulle", "une assiette", "un gâteau", "un tambour"];

const cercleItems: TutorBankItemV4[] = [
  // ★3 — rayon et diamètre d'un objet rond.
  CER(1, 3, "Le diamètre fait deux rayons : il traverse le cercle en passant par le centre.", () => {
    const ob = un(OBJETS_RONDS);
    const r = entre(...ob.r);
    const sens = Math.random() < 0.5 ? "r2d" : "d2r";
    const [n1, n2] = un(NOMS_POINTS);
    if (sens === "r2d") {
      return {
        text: phrase(`${ob.o} est un cercle.`, `Son rayon mesure ${r} ${ob.u}.`, un(["Combien mesure son diamètre ?", "Quelle est la longueur du diamètre ?", "Trouve son diamètre."])),
        ...qcmN(2 * r, [r, r + 2, 4 * r, r + 1], ob.u),
        canvas: dessinCercle({ segment: "rayon", noms: [n1, n2], etiquette: `${r} ${ob.u}` }),
        explanation: exp(
          "Le rayon va du centre au bord. Le diamètre traverse le cercle en passant par le centre : il vaut deux rayons.",
          "On double le rayon.",
          `${r} + ${r} = ${2 * r}.`,
          `Le diamètre mesure ${2 * r} ${ob.u}.`,
        ),
      };
    }
    return {
      text: phrase(`${ob.o} est un cercle.`, `Son diamètre mesure ${2 * r} ${ob.u}.`, un(["Combien mesure son rayon ?", "Quelle est la longueur du rayon ?", "Trouve son rayon."])),
      ...qcmN(r, [2 * r, 4 * r, r + 1, r - 1], ob.u),
      canvas: dessinCercle({ segment: "diametre", noms: [n1, n2], etiquette: `${2 * r} ${ob.u}` }),
      explanation: exp(
        "Le diamètre vaut deux rayons : le rayon est la moitié du diamètre.",
        "On cherche le nombre qui, ajouté à lui-même, donne le diamètre.",
        `${r} + ${r} = ${2 * r}.`,
        `Le rayon mesure ${r} ${ob.u}.`,
      ),
    };
  }),
  // ★3 — de combien ouvrir le compas ?
  CER(2, 3, "On ouvre le compas du RAYON, pas du diamètre.", () => {
    const e = enfant();
    const d = 2 * entre(2, 9);
    const quoi = un(OBJETS_A_TRACER);
    return {
      text: phrase(
        `${e.nom} veut tracer ${quoi} de ${d} cm de diamètre sur sa feuille.`,
        un([`De combien écarte-t-${e.il} son compas ?`, "De combien faut-il ouvrir le compas ?", "Quel écart faut-il entre la pointe et la mine ?"]),
      ),
      ...qcmN(d / 2, [d, 2 * d, d / 2 + 1, d - 1], "cm"),
      canvas: dessinCercle({ segment: "diametre", noms: un(NOMS_POINTS), etiquette: `${d} cm` }),
      explanation: exp(
        "L'écart du compas, entre la pointe et la mine, est le RAYON du cercle.",
        "Le rayon est la moitié du diamètre.",
        `${d / 2} + ${d / 2} = ${d}, donc le rayon vaut ${d / 2} cm.`,
        `On écarte le compas de ${d / 2} cm.`,
      ),
    };
  }),
  // ★1 — centre, rayon, diamètre : les mots.
  CER(3, 1, "Le rayon part du centre. Le diamètre traverse tout le cercle en passant par le centre.", () => {
    const [n1, n2] = un(NOMS_POINTS);
    const quoi = un(["rayon", "diametre", "centre"] as const);
    const canvas = dessinCercle({ segment: quoi === "centre" ? un(["rayon", null] as const) : quoi, noms: [n1, n2] });
    const seg = quoi === "rayon" ? `[O${n1}]` : `[${n1}${n2}]`;
    const juste = quoi === "rayon" ? "un rayon" : quoi === "diametre" ? "un diamètre" : "le centre";
    const text =
      quoi === "centre"
        ? phrase(amorce(), un(["Comment s'appelle le point O ?", "Que représente le point O pour ce cercle ?", "Le point O est au milieu. Comment l'appelle-t-on ?"]))
        : phrase(amorce(), un([`Comment s'appelle le segment ${seg} ?`, `Comment appelle-t-on le segment ${seg} ?`, `Que représente le segment ${seg} pour ce cercle ?`, `Le segment ${seg} est…`]));
    return {
      text,
      ...qcm(juste, ["un rayon", "un diamètre", "le centre", "un côté"]),
      canvas,
      explanation: exp(
        "Le centre est le point du milieu. Un rayon va du centre au cercle. Un diamètre va d'un bord à l'autre en passant par le centre.",
        "On regarde où commence et où finit le segment.",
        quoi === "rayon" ? `${seg} part du centre O et s'arrête sur le cercle.` : quoi === "diametre" ? `${seg} va d'un bord à l'autre en passant par O.` : "O est le point où l'on plante la pointe du compas.",
        `C'est ${juste}.`,
      ),
    };
  }),
  // ★2 — rayon ↔ diamètre, sans histoire.
  CER(4, 2, "Le diamètre vaut deux rayons.", () => {
    const r = entre(2, 10);
    const [n1, n2] = un(NOMS_POINTS);
    if (Math.random() < 0.5) {
      return {
        text: phrase(amorce(), `Le rayon [O${n1}] mesure ${r} cm.`, un(["Combien mesure le diamètre ?", "Quelle est la longueur du diamètre ?", "Le diamètre mesure…"])),
        ...qcmN(2 * r, [r, r + 2, r + 1, 3 * r], "cm"),
        canvas: dessinCercle({ segment: "rayon", noms: [n1, n2], etiquette: `${r} cm` }),
        explanation: exp("Le diamètre vaut deux rayons.", "On double le rayon.", `${r} + ${r} = ${2 * r}.`, `Le diamètre mesure ${2 * r} cm.`),
      };
    }
    return {
      text: phrase(amorce(), `Le diamètre [${n1}${n2}] mesure ${2 * r} cm.`, un(["Combien mesure le rayon ?", "Quelle est la longueur du rayon ?", "Le rayon mesure…"])),
      ...qcmN(r, [2 * r, r + 1, r - 1, 4 * r], "cm"),
      canvas: dessinCercle({ segment: "diametre", noms: [n1, n2], etiquette: `${2 * r} cm` }),
      explanation: exp("Le rayon est la moitié du diamètre.", "On partage le diamètre en deux.", `${r} + ${r} = ${2 * r}.`, `Le rayon mesure ${r} cm.`),
    };
  }),
  // ★4 — tous les rayons sont égaux ; dedans, dessus, dehors.
  CER(5, 4, "Tous les points du cercle sont à la même distance du centre : le rayon.", () => {
    if (Math.random() < 0.5) {
      const r = entre(2, 9);
      const [n1, n2] = un(NOMS_POINTS);
      return {
        text: phrase(
          un(["", "Zoé trace un cercle au compas.", "Pic regarde ce cercle.", "Téo a tracé ce cercle sur son cahier.", "La maîtresse dessine un cercle au tableau.", "Le jardinier trace un massif rond.", "Lina dessine une roue de vélo.", "Ravi dessine une horloge ronde.", "Le chef cuisinier découpe une pizza."]),
          `Les points ${n1} et ${n2} sont sur le cercle de centre O.`,
          `[O${n1}] mesure ${r} cm.`,
          un([`Combien mesure [O${n2}] ?`, `Quelle est la longueur de [O${n2}] ?`, `Et [O${n2}], combien mesure-t-il ?`]),
        ),
        ...qcmN(r, [2 * r, r + 1, r - 1, r + 2], "cm"),
        canvas: dessinCercle({ segment: "deux_rayons", noms: [n1, n2], etiquette: `${r} cm` }),
        explanation: exp(
          "Tous les points du cercle sont à la même distance du centre : cette distance est le rayon.",
          `[O${n1}] et [O${n2}] sont deux rayons du même cercle.`,
          `Ils ont donc la même longueur : ${r} cm.`,
          `[O${n2}] mesure ${r} cm.`,
        ),
      };
    }
    const cas = un([
      { ctx: (r: number, m: number) => `Le bassin rond du jardin a un rayon de ${r} m. Pic se pose à ${m} m du centre.`, u: "m", qui: "Pic" },
      { ctx: (r: number, m: number) => `La piste du cirque a un rayon de ${r} m. Le clown est à ${m} m du centre.`, u: "m", qui: "le clown" },
      { ctx: (r: number, m: number) => `Zoé trace un cercle de rayon ${r} cm. Elle pose un point M à ${m} cm du centre.`, u: "cm", qui: "M" },
      { ctx: (r: number, m: number) => `Le manège a un rayon de ${r} m. Téo attend à ${m} m du centre.`, u: "m", qui: "Téo" },
      { ctx: (r: number, m: number) => `Le tapis rond a un rayon de ${r} m. Le chat dort à ${m} m du centre.`, u: "m", qui: "le chat" },
      { ctx: (r: number, m: number) => `Ravi trace un cercle de rayon ${r} cm. Il pique un point N à ${m} cm du centre.`, u: "cm", qui: "N" },
    ]);
    const r = entre(3, 9);
    const m = un([r, r, r - entre(1, 2), r + entre(1, 3)]);
    const juste = m === r ? "sur le cercle" : m < r ? "à l'intérieur du cercle" : "à l'extérieur du cercle";
    return {
      text: phrase(cas.ctx(r, m), un([`Où est ${cas.qui} ?`, `Où se trouve ${cas.qui} ?`, `${cap(cas.qui)} est-il sur le cercle, dedans ou dehors ?`, "Sur le cercle, dedans ou dehors ?"])),
      ...qcm(juste, ["sur le cercle", "à l'intérieur du cercle", "à l'extérieur du cercle", "au centre"]),
      explanation: exp(
        "Les points du cercle sont exactement à un rayon du centre. Plus près, on est dedans ; plus loin, dehors.",
        "On compare la distance au centre et le rayon.",
        m === r ? `${m} = ${r} : c'est exactement le rayon.` : m < r ? `${m} est plus petit que ${r} : c'est plus près que le bord.` : `${m} est plus grand que ${r} : c'est plus loin que le bord.`,
        `Il est ${juste}.`,
      ),
    };
  }),
];

/* ═════════════ ce2_figure_defi ═════════════ */
const DEF = G("ce2_figure_defi");

const DEVINETTES: Array<{ nom: string; indices: string }> = [
  { nom: "un carré", indices: "J'ai quatre angles droits. Tous mes côtés ont la même longueur." },
  { nom: "un carré", indices: "J'ai quatre côtés égaux. Le coin de l'équerre colle à chacun de mes sommets." },
  { nom: "un carré", indices: "Posé sur la pointe, je garde mes quatre angles droits et mes quatre côtés égaux." },
  { nom: "un rectangle", indices: "J'ai quatre angles droits. Deux de mes côtés sont longs, deux sont courts." },
  { nom: "un rectangle", indices: "Mes côtés face à face sont égaux. Mes quatre coins sont droits, mais je ne suis pas un carré." },
  { nom: "un rectangle", indices: "Je suis la forme d'une porte ou d'un livre. J'ai quatre angles droits." },
  { nom: "un losange", indices: "J'ai quatre côtés égaux. Aucun de mes angles n'est droit." },
  { nom: "un losange", indices: "Je ressemble à un carré écrasé : quatre côtés égaux, des angles pointus et larges." },
  { nom: "un losange", indices: "Je suis la forme du carreau, au jeu de cartes. Mes quatre côtés sont égaux." },
  { nom: "un triangle rectangle", indices: "J'ai trois côtés. Un de mes angles est droit." },
  { nom: "un triangle rectangle", indices: "On m'obtient en coupant un rectangle par une diagonale." },
  { nom: "un triangle rectangle", indices: "J'ai trois sommets, et le coin de l'équerre colle à l'un d'eux." },
  { nom: "un cercle", indices: "Je n'ai aucun côté. Tous mes points sont à la même distance de mon centre." },
  { nom: "un cercle", indices: "On me trace au compas. Je n'ai ni sommet ni angle." },
  { nom: "un cercle", indices: "Mon diamètre vaut deux fois mon rayon." },
];
const QUI_DEVINE = ["Pic le paille-en-queue", "Nina", "Téo", "Zoé", "Ravi", "Ti Margo", "La maîtresse", "Le magicien du cirque", "Le pirate Barbe-Rousse", "Le dragon du château"];

const OBJETS_TOUR: Array<{ o: string; forme: "carre" | "losange" | "rectangle" | "triangle"; c: [number, number]; l?: [number, number] }> = [
  { o: "Le napperon de Zoé est un carré.", forme: "carre", c: [10, 25] },
  { o: "La boîte à bijoux de Lina est un carré.", forme: "carre", c: [6, 15] },
  { o: "Le coussin du chat est un carré.", forme: "carre", c: [18, 25] },
  { o: "Le cadre de la photo de classe est un carré.", forme: "carre", c: [12, 24] },
  { o: "Le cerf-volant de Téo est un losange.", forme: "losange", c: [15, 25] },
  { o: "Le panneau du chantier est un losange.", forme: "losange", c: [15, 25] },
  { o: "Le biscuit de la boulangère est un losange.", forme: "losange", c: [3, 8] },
  { o: "La gommette de Jade est un losange.", forme: "losange", c: [2, 6] },
  { o: "La carte au trésor est un rectangle.", forme: "rectangle", c: [15, 30], l: [8, 14] },
  { o: "La couverture du cahier de Ravi est un rectangle.", forme: "rectangle", c: [22, 30], l: [15, 20] },
  { o: "L'étiquette du pot de confiture est un rectangle.", forme: "rectangle", c: [8, 12], l: [3, 6] },
  { o: "La boîte du gâteau est un rectangle.", forme: "rectangle", c: [20, 30], l: [10, 18] },
  { o: "Le fanion de la kermesse est un triangle aux trois côtés égaux.", forme: "triangle", c: [10, 25] },
  { o: "La part de tarte du chef a trois côtés égaux.", forme: "triangle", c: [8, 15] },
  { o: "La voile du petit bateau de Naïa a trois côtés égaux.", forme: "triangle", c: [6, 20] },
];

const defiItems: TutorBankItemV4[] = [
  // ★5 — la devinette : retrouver la figure à partir de deux indices.
  DEF(1, 5, "Lis chaque indice et élimine les figures qui ne vont pas.", () => {
    const d = un(DEVINETTES);
    const qui = un(QUI_DEVINE);
    return {
      text: phrase(`${qui} pose une devinette :`, `« ${d.indices} Qui suis-je ? »`),
      ...qcm(d.nom, ["un carré", "un rectangle", "un losange", "un triangle rectangle", "un cercle"]),
      explanation: exp(
        "Une figure se reconnaît à ses côtés, à ses angles droits, ou à son centre.",
        "On lit les indices l'un après l'autre et on élimine les figures qui ne vont pas.",
        `${cap(d.nom)} est la seule figure qui va avec tous les indices.`,
        `C'est ${d.nom}.`,
      ),
    };
  }),
  // ★5 — le codage dit les longueurs cachées : faire le tour.
  DEF(2, 5, "Les petits traits identiques disent quels côtés ont la même longueur.", () => {
    const ob = un(OBJETS_TOUR);
    let total: number;
    let faux: number[];
    let canvas: CanvasFigure;
    let calcul: string;
    let donnee: string;
    const l = un(JEUX_DE_LETTRES);
    if (ob.forme === "rectangle") {
      const L = entre(...ob.c);
      const la = entre(...(ob.l ?? [3, 6]));
      total = 2 * L + 2 * la;
      faux = [L + la, 2 * L + la, total - 2, total + 2];
      canvas = dessinQuad("rectangle", { lettres: l, inclinaison: un([0, 10, -10]), cotes: { AB: `${L} cm`, BC: `${la} cm` } });
      calcul = `${L} + ${la} + ${L} + ${la} = ${total}.`;
      donnee = `[${l[0]}${l[1]}] mesure ${L} cm et [${l[1]}${l[2]}] mesure ${la} cm.`;
    } else if (ob.forme === "triangle") {
      const c = entre(...ob.c);
      total = 3 * c;
      donnee = `Un côté mesure ${c} cm.`;
      faux = [c, 2 * c, 4 * c, 3 * c + 1];
      canvas = dessinTriangle({ egaux: true, cote: `${c} cm`, inclinaison: un([0, 0, 180]) });
      calcul = `${c} + ${c} + ${c} = ${total}.`;
    } else {
      const c = entre(...ob.c);
      total = 4 * c;
      donnee = `Le côté [${l[0]}${l[1]}] mesure ${c} cm.`;
      faux = [c, 2 * c, 3 * c, 4 * c + 4];
      canvas = dessinQuad(ob.forme, { lettres: l, inclinaison: un([0, 15, -20]), cotes: { AB: `${c} cm` } });
      calcul = `${c} + ${c} + ${c} + ${c} = ${total}.`;
    }
    return {
      text: phrase(ob.o, donnee, un(["Quelle longueur de ruban faut-il pour en faire tout le tour ?", "Combien mesure son tour complet ?", "On colle un galon tout autour. Combien mesure ce galon ?", "Quelle est la longueur de son contour ?"])),
      ...qcmN(total, faux, "cm"),
      canvas,
      explanation: exp(
        "Faire le tour d'une figure, c'est additionner tous ses côtés. Les petits traits disent quels côtés ont la même longueur.",
        "On trouve la longueur de chaque côté grâce au codage, puis on additionne tous les côtés.",
        calcul,
        `Il faut ${total} cm.`,
      ),
    };
  }),
];

const GABARITS: TutorBankItemV4[] = [
  ...reconnaitreItems,
  ...triangleRectangleItems,
  ...losangeItems,
  ...proprietesItems,
  ...construireItems,
  ...cercleItems,
  ...defiItems,
];

/* Les items figés d'origine : chacun est servi une fois par séance. */
const FIGES: TutorBankItemV4[] = [
  {
    kind: "fixed",
    id: "ce2_figure_reconnaitre_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "figures_planes",
    microId: "ce2_figure_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle figure a quatre côtés de la même longueur ET quatre angles droits ?",
    format: "qcm",
    choices: ["le carré", "le rectangle", "le triangle", "le cercle"],
    expected: ["le carré"],
    comparator: "mcq_exact",
    hint: "Il faut les deux conditions à la fois : les côtés ET les angles.",
    explanation: exp(
      "Le carré a quatre côtés égaux et quatre angles droits.",
      "On vérifie les deux conditions l'une après l'autre.",
      "Le rectangle a bien quatre angles droits, mais ses côtés ne sont pas tous égaux. Le carré, lui, a les deux.",
      "C'est le carré.",
    ),
    tags: ["ce2", "figures_planes", "reconnaitre", "definition", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_figure_reconnaitre_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "figures_planes",
    microId: "ce2_figure_reconnaitre",
    difficulty: 4,
    theme: "neutral",
    text: "Cette figure est posée de travers. Ses quatre angles sont droits et ses côtés opposés sont de même longueur. Est-ce un rectangle ?",
    format: "qcm",
    choices: [
      "oui, c'est un rectangle",
      "non, il est penché",
      "non, c'est un losange",
      "on ne peut pas savoir",
    ],
    expected: ["oui, c'est un rectangle"],
    comparator: "mcq_exact",
    hint: "Tourne la feuille : la figure change-t-elle ?",
    explanation: exp(
      "Ce qui fait une figure, ce sont ses côtés et ses angles — jamais la façon dont elle est posée.",
      "On regarde les angles et les longueurs, on ignore l'inclinaison.",
      "Ses quatre angles sont droits et ses côtés opposés sont égaux : c'est un rectangle. En tournant la feuille, il se retrouverait bien droit sans avoir changé.",
      "Oui, c'est un rectangle.",
    ),
    tags: ["ce2", "figures_planes", "reconnaitre", "piege", "qcm", "canvas"],
    canvas: rectanglePenche(),
  },
  {
    kind: "fixed",
    id: "ce2_figure_reconnaitre_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "figures_planes",
    microId: "ce2_figure_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Combien de côtés a un cercle ?",
    format: "qcm",
    choices: [
      "aucun, c'est une ligne courbe",
      "un seul",
      "quatre",
      "une infinité de tout petits côtés",
    ],
    expected: ["aucun, c'est une ligne courbe"],
    comparator: "mcq_exact",
    hint: "Un côté est un segment, c'est-à-dire un trait droit.",
    explanation: exp(
      "Un côté est un segment : un trait droit entre deux sommets.",
      "On cherche les traits droits et les coins de la figure.",
      "Le cercle n'a ni trait droit ni coin : c'est une ligne courbe fermée. Il n'a donc aucun côté, et aucun sommet non plus.",
      "Le cercle n'a aucun côté.",
    ),
    tags: ["ce2", "figures_planes", "reconnaitre", "remarquable", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_figure_triangle_rectangle_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "figures_planes",
    microId: "ce2_figure_triangle_rectangle",
    difficulty: 1,
    theme: "neutral",
    text: "Qu'est-ce qui fait qu'un triangle est un triangle RECTANGLE ?",
    format: "qcm",
    choices: [
      "il a un angle droit",
      "il a trois angles droits",
      "il a la forme d'un rectangle",
      "ses trois côtés sont égaux",
    ],
    expected: ["il a un angle droit"],
    comparator: "mcq_exact",
    hint: "Le mot « rectangle » vient de « angle droit ».",
    explanation: exp(
      "Un triangle rectangle est un triangle qui possède un angle droit.",
      "On cherche le coin qui rentre exactement dans l'équerre.",
      "Il suffit d'UN angle droit sur les trois. Le mot « rectangle » ne veut pas dire qu'il ressemble à un rectangle, il annonce l'angle droit.",
      "Il a un angle droit.",
    ),
    tags: ["ce2", "figures_planes", "triangle_rectangle", "definition", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_figure_triangle_rectangle_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "figures_planes",
    microId: "ce2_figure_triangle_rectangle",
    difficulty: 4,
    theme: "neutral",
    text: "Sur ce triangle, l'angle droit est marqué en haut, au sommet A. Est-ce quand même un triangle rectangle ?",
    format: "qcm",
    choices: [
      "oui, la place de l'angle droit ne change rien",
      "non, l'angle droit doit être en bas",
      "non, il est trop penché",
      "on ne peut pas savoir",
    ],
    expected: ["oui, la place de l'angle droit ne change rien"],
    comparator: "mcq_exact",
    hint: "Ce qui compte, c'est qu'il y AIT un angle droit, pas où il se trouve.",
    explanation: exp(
      "Un triangle rectangle est un triangle qui possède un angle droit, où qu'il se trouve.",
      "On cherche le petit carré du codage, sans se demander s'il est en haut ou en bas.",
      "L'angle droit est au sommet A : le triangle est rectangle. En tournant la feuille, cet angle se retrouverait en bas sans que la figure ait changé.",
      "Oui, c'est bien un triangle rectangle.",
    ),
    tags: ["ce2", "figures_planes", "triangle_rectangle", "piege", "qcm", "canvas"],
    canvas: triangle({
      points: { A: { x: 90, y: 45 }, B: { x: 240, y: 105 }, C: { x: 66, y: 105 } },
      display: { showPoints: true, showLabels: true, showSides: false },
      marks: { rightAngleAt: "A" },
    }),
  },
  {
    kind: "fixed",
    id: "ce2_figure_triangle_rectangle_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "figures_planes",
    microId: "ce2_figure_triangle_rectangle",
    difficulty: 3,
    theme: "neutral",
    text: "Au maximum, combien un triangle peut-il avoir d'angles droits ?",
    format: "short",
    expected: ["1"],
    comparator: "number_equal",
    hint: "Essaie d'en dessiner deux : les deux côtés partiraient tout droit sans jamais se rejoindre.",
    explanation: exp(
      "Un triangle a trois angles, et un seul peut être droit.",
      "On essaie de tracer deux angles droits sur la même base et on regarde ce qui se passe.",
      "Avec deux angles droits, les deux côtés montent tout droit, parallèles : ils ne se rejoignent jamais et la figure ne se referme pas. Un triangle rectangle a donc exactement un angle droit.",
      "Au maximum 1.",
    ),
    tags: ["ce2", "figures_planes", "triangle_rectangle", "remarquable"],
  },
  {
    kind: "fixed",
    id: "ce2_figure_losange_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "figures_planes",
    microId: "ce2_figure_losange",
    difficulty: 2,
    theme: "neutral",
    text: "Qu'est-ce qui caractérise un losange ?",
    format: "qcm",
    choices: [
      "ses quatre côtés sont de la même longueur",
      "ses quatre angles sont droits",
      "il a trois côtés",
      "il n'a aucun côté droit",
    ],
    expected: ["ses quatre côtés sont de la même longueur"],
    comparator: "mcq_exact",
    hint: "Pense au carreau des cartes à jouer.",
    explanation: exp(
      "Un losange est un quadrilatère dont les quatre côtés ont la même longueur.",
      "On mesure les quatre côtés, ou on lit les codages qui les marquent égaux.",
      "C'est la seule condition. Un losange peut être bien pointu ou presque carré : ce qui compte, c'est que ses quatre côtés soient égaux.",
      "Ses quatre côtés sont de la même longueur.",
    ),
    tags: ["ce2", "figures_planes", "losange", "definition", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_figure_losange_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "figures_planes",
    microId: "ce2_figure_losange",
    difficulty: 4,
    theme: "neutral",
    text: "Un losange a-t-il forcément des angles droits ?",
    format: "qcm",
    choices: [
      "non, ses angles peuvent être pointus ou larges",
      "oui, les quatre",
      "oui, deux seulement",
      "on ne peut pas savoir",
    ],
    expected: ["non, ses angles peuvent être pointus ou larges"],
    comparator: "mcq_exact",
    hint: "Prends un losange en carton et écrase-le un peu : les côtés changent-ils de longueur ?",
    explanation: exp(
      "Le losange n'impose rien à ses angles : il impose seulement que ses quatre côtés soient égaux.",
      "On regarde les côtés d'abord, les angles ensuite.",
      "En écrasant un losange, ses angles s'aplatissent mais ses côtés gardent la même longueur : c'est toujours un losange. Deux angles deviennent pointus, deux autres larges.",
      "Non, un losange n'a pas forcément d'angles droits.",
    ),
    tags: ["ce2", "figures_planes", "losange", "piege", "qcm", "canvas"],
    canvas: losange(),
  },
  {
    kind: "fixed",
    id: "ce2_figure_losange_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "figures_planes",
    microId: "ce2_figure_losange",
    difficulty: 2,
    theme: "neutral",
    text: "Sur un jeu de cartes, quelle enseigne a la forme d'un losange ?",
    format: "qcm",
    choices: ["le carreau", "le cœur", "le pique", "le trèfle"],
    expected: ["le carreau"],
    comparator: "mcq_exact",
    hint: "C'est la rouge qui a quatre coins.",
    explanation: exp(
      "Le losange est un quadrilatère à quatre côtés égaux.",
      "On cherche l'enseigne qui a quatre côtés droits de même longueur.",
      "Le carreau est un losange posé sur la pointe. Le cœur, le pique et le trèfle ont des bords courbes.",
      "C'est le carreau.",
    ),
    tags: ["ce2", "figures_planes", "losange", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_figure_proprietes_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "figures_planes",
    microId: "ce2_figure_proprietes",
    difficulty: 2,
    theme: "neutral",
    text: "Dans un rectangle, que peut-on dire des côtés opposés ?",
    format: "qcm",
    choices: [
      "ils ont la même longueur",
      "ils sont tous les quatre égaux",
      "ils sont de longueurs différentes",
      "on ne peut rien en dire",
    ],
    expected: ["ils ont la même longueur"],
    comparator: "mcq_exact",
    hint: "Regarde la porte de la classe : le haut et le bas.",
    explanation: exp(
      "Dans un rectangle, les côtés opposés — ceux qui se font face — ont la même longueur.",
      "On regarde les côtés deux par deux : ceux d'en face vont ensemble.",
      "La longueur du haut est égale à celle du bas, et la hauteur de gauche à celle de droite. En revanche la longueur et la hauteur, elles, sont différentes.",
      "Les côtés opposés ont la même longueur.",
    ),
    tags: ["ce2", "figures_planes", "proprietes", "definition", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_figure_proprietes_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "figures_planes",
    microId: "ce2_figure_proprietes",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève dit : « dans un rectangle, les quatre côtés sont égaux ». A-t-il raison ?",
    format: "qcm",
    choices: [
      "non, seulement les côtés opposés",
      "oui",
      "non, aucun côté n'est égal",
      "oui, quand il est penché",
    ],
    expected: ["non, seulement les côtés opposés"],
    comparator: "mcq_exact",
    hint: "Une porte est-elle aussi large que haute ?",
    explanation: exp(
      "Dans un rectangle, ce sont les côtés OPPOSÉS qui sont égaux, deux par deux.",
      "On compare le haut au bas, puis la gauche à la droite — jamais le haut à la gauche.",
      "Une porte est bien plus haute que large : c'est pourtant un rectangle. Quand les quatre côtés sont égaux, la figure porte un autre nom : c'est un carré.",
      "Non : seulement les côtés opposés.",
    ),
    tags: ["ce2", "figures_planes", "proprietes", "piege", "qcm", "canvas"],
    canvas: rectangleDroit(),
  },
  {
    kind: "fixed",
    id: "ce2_figure_proprietes_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "figures_planes",
    microId: "ce2_figure_proprietes",
    difficulty: 3,
    theme: "neutral",
    text: "Un carré a un côté de 7 cm. Combien mesure le côté d'en face ?",
    format: "short",
    expected: ["7 cm"],
    comparator: "number_equal",
    hint: "Dans un carré, les quatre côtés sont égaux.",
    explanation: exp(
      "Dans un carré, les quatre côtés ont la même longueur.",
      "On lit la longueur d'un côté : elle vaut pour tous les autres.",
      "Un côté mesure 7 cm, donc les quatre mesurent 7 cm — celui d'en face comme les deux autres.",
      "Il mesure 7 cm.",
    ),
    tags: ["ce2", "figures_planes", "proprietes"],
  },
  {
    kind: "fixed",
    id: "ce2_figure_construire_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "figures_planes",
    microId: "ce2_figure_construire",
    difficulty: 1,
    theme: "neutral",
    text: "Quel instrument sert à vérifier qu'un angle est droit ?",
    format: "qcm",
    choices: ["l'équerre", "le compas", "la gomme", "le crayon"],
    expected: ["l'équerre"],
    comparator: "mcq_exact",
    hint: "C'est l'instrument qui a lui-même un coin bien carré.",
    explanation: exp(
      "L'équerre porte un angle droit : elle sert à en tracer et à en vérifier.",
      "On pose le coin de l'équerre dans l'angle à vérifier.",
      "Si l'angle remplit exactement le coin de l'équerre, sans laisser de jour ni dépasser, c'est un angle droit. La règle mesure, le compas trace des cercles.",
      "C'est l'équerre.",
    ),
    tags: ["ce2", "figures_planes", "construire", "definition", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_figure_construire_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "figures_planes",
    microId: "ce2_figure_construire",
    difficulty: 3,
    theme: "neutral",
    text: "Pour construire un carré de 5 cm de côté, de quels instruments a-t-on besoin ?",
    format: "qcm",
    choices: [
      "la règle graduée et l'équerre",
      "le compas seulement",
      "la règle graduée seulement",
      "l'équerre seulement",
    ],
    expected: ["la règle graduée et l'équerre"],
    comparator: "mcq_exact",
    hint: "Il faut deux choses : la bonne longueur, et les angles droits.",
    explanation: exp(
      "Un carré demande deux vérifications : des côtés de même longueur et des angles droits.",
      "On liste ce que la figure impose, puis on choisit l'instrument de chaque contrainte.",
      "La règle graduée donne les 5 cm de chaque côté ; l'équerre garantit les quatre angles droits. Sans équerre, on obtiendrait un losange.",
      "Il faut la règle graduée et l'équerre.",
    ),
    tags: ["ce2", "figures_planes", "construire", "methode", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_figure_construire_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "figures_planes",
    microId: "ce2_figure_construire",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève trace un quadrilatère avec quatre côtés de 5 cm, mais sans utiliser l'équerre. Qu'obtient-il à coup sûr ?",
    format: "qcm",
    choices: [
      "un quadrilatère à quatre côtés égaux, mais peut-être pas un carré",
      "toujours un carré",
      "toujours un rectangle",
      "un triangle",
    ],
    expected: ["un quadrilatère à quatre côtés égaux, mais peut-être pas un carré"],
    comparator: "mcq_exact",
    hint: "Les côtés sont bons. Et les angles ?",
    explanation: exp(
      "Des côtés égaux ne suffisent pas à faire un carré : il faut aussi les angles droits.",
      "On vérifie séparément ce que garantit chaque instrument.",
      "Sans équerre, rien ne force les angles : la figure peut pencher et devenir un losange. Les quatre côtés font bien 5 cm, mais ce n'est un carré que si les angles sont droits.",
      "Il obtient un quadrilatère à quatre côtés égaux, pas forcément un carré.",
    ),
    tags: ["ce2", "figures_planes", "construire", "piege", "qcm", "canvas"],
    canvas: losange(),
  },
  {
    kind: "fixed",
    id: "ce2_figure_cercle_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "figures_planes",
    microId: "ce2_figure_cercle",
    difficulty: 1,
    theme: "neutral",
    text: "Où plante-t-on la pointe du compas pour tracer un cercle ?",
    format: "qcm",
    choices: ["sur le centre", "sur le bord du cercle", "n'importe où", "sur le crayon"],
    expected: ["sur le centre"],
    comparator: "mcq_exact",
    hint: "C'est le point qui ne bouge pas pendant tout le tracé.",
    explanation: exp(
      "Le cercle est l'ensemble des points situés à la même distance d'un point appelé centre.",
      "On plante la pointe sur le centre, puis on fait tourner le crayon sans changer l'écartement.",
      "La pointe reste immobile sur le centre : c'est ce qui garantit que tous les points du tracé sont à la même distance de lui.",
      "On la plante sur le centre.",
    ),
    tags: ["ce2", "figures_planes", "cercle", "methode", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_figure_cercle_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "figures_planes",
    microId: "ce2_figure_cercle",
    difficulty: 4,
    theme: "neutral",
    text: "Pour tracer un cercle de 8 cm de diamètre, de combien faut-il écarter le compas ?",
    format: "short",
    expected: ["4 cm"],
    comparator: "number_equal",
    hint: "L'écartement du compas, c'est le rayon — la moitié du diamètre.",
    explanation: exp(
      "L'écartement du compas donne le RAYON, c'est-à-dire la distance du centre au bord.",
      "On partage le diamètre en deux pour obtenir le rayon.",
      "Le diamètre traverse tout le cercle en passant par le centre : il vaut deux rayons. Donc 8 ÷ 2 = 4. On écarte le compas de 4 cm. En l'écartant de 8 cm, on obtiendrait un cercle deux fois trop grand.",
      "Il faut l'écarter de 4 cm.",
    ),
    tags: ["ce2", "figures_planes", "cercle", "piege"],
  },
  {
    kind: "fixed",
    id: "ce2_figure_cercle_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "figures_planes",
    microId: "ce2_figure_cercle",
    difficulty: 2,
    theme: "neutral",
    text: "Le diamètre d'un cercle vaut combien de fois son rayon ?",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    hint: "Le diamètre traverse le cercle en passant par le centre.",
    explanation: exp(
      "Le rayon va du centre au bord ; le diamètre traverse tout le cercle en passant par le centre.",
      "On suit le diamètre du bord au centre, puis du centre à l'autre bord.",
      "Le diamètre est fait de deux rayons mis bout à bout : il vaut donc 2 fois le rayon.",
      "Il vaut 2 fois le rayon.",
    ),
    tags: ["ce2", "figures_planes", "cercle", "remarquable"],
  },
  {
    kind: "fixed",
    id: "ce2_figure_defi_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "figures_planes",
    microId: "ce2_figure_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Trois élèves regardent la même figure, posée sur la pointe. Elle a quatre côtés égaux et quatre angles droits. Léa dit « c'est un carré », Kevin dit « c'est un losange », Malia dit « c'est un rectangle ». Qui décrit le mieux cette figure au CE2 ?",
    format: "qcm",
    choices: [
      "Léa : quatre côtés égaux ET quatre angles droits, c'est un carré",
      "Kevin : elle est posée sur la pointe, donc c'est un losange",
      "Malia : elle a quatre angles droits, donc c'est un rectangle",
      "aucun des trois",
    ],
    expected: ["Léa : quatre côtés égaux ET quatre angles droits, c'est un carré"],
    comparator: "mcq_exact",
    hint: "La position sur la feuille ne donne aucun nom à une figure.",
    explanation: exp(
      "On nomme une figure d'après ses côtés et ses angles, jamais d'après sa position.",
      "On vérifie les deux conditions du carré : côtés égaux, angles droits.",
      "Les quatre côtés sont égaux et les quatre angles sont droits : c'est un carré, même posé sur la pointe. Kevin s'est laissé tromper par l'inclinaison, et Malia n'a regardé que les angles.",
      "C'est Léa qui a raison.",
    ),
    tags: ["ce2", "figures_planes", "defi", "piege", "qcm", "canvas"],
    canvas: carreSurPointe(),
  },
  {
    kind: "fixed",
    id: "ce2_figure_defi_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "figures_planes",
    microId: "ce2_figure_defi",
    difficulty: 5,
    theme: "neutral",
    text: "On coupe un carré en deux, en suivant une diagonale. Quelles figures obtient-on ?",
    format: "qcm",
    choices: [
      "deux triangles rectangles",
      "deux carrés plus petits",
      "deux rectangles",
      "deux losanges",
    ],
    expected: ["deux triangles rectangles"],
    comparator: "mcq_exact",
    hint: "Trace la diagonale sur un carré de papier, et compte les côtés de chaque morceau.",
    explanation: exp(
      "Une diagonale relie deux sommets opposés d'un quadrilatère.",
      "On regarde combien de côtés a chaque morceau, et si l'angle droit du carré y est encore.",
      "Chaque morceau a trois côtés : ce sont des triangles. Et chacun garde un angle droit du carré : ce sont donc deux triangles rectangles, exactement pareils.",
      "On obtient deux triangles rectangles.",
    ),
    tags: ["ce2", "figures_planes", "defi", "qcm", "canvas"],
    canvas: quadrilatere({
      points: {
        A: { x: 90, y: 55 },
        B: { x: 210, y: 55 },
        C: { x: 210, y: 175 },
        D: { x: 90, y: 175 },
      },
      display: { showPoints: true, showLabels: true, showDiagonals: true },
      marks: { rightAnglesAt: ["A", "B", "C", "D"] },
    }),
  },
];

export const figuresPlanesBank: TutorBankItemV4[] = [...FIGES, ...GABARITS];
