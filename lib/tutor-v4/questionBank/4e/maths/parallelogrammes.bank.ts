/**
 * Banque de questions Tutor V4 - Mathématiques 4e
 * Notion : Parallélogrammes
 *
 * Objectifs :
 * - reconnaître un parallélogramme ;
 * - utiliser ses propriétés : côtés opposés, angles, diagonales ;
 * - montrer qu’un quadrilatère est un parallélogramme ;
 * - calculer l’aire d’un parallélogramme ;
 * - résoudre des problèmes de géométrie plane ;
 * - éviter les confusions : rectangle/parallélogramme, diagonales égales, hauteur/côté incliné.
 *
 * Organisation :
 * - fixed : définitions et propriétés essentielles ;
 * - templates : variations de longueurs, angles, figures et situations ;
 * - canvas : figures codées avec côtés parallèles, côtés égaux, diagonales ;
 * - open : justification et rédaction courte.
 *
 * ⛔⛔ 03/10/2026 — « DES QUESTIONS REVIENNENT SOUVENT ». Mesuré avant : 8 à 22
 * squelettes d'énoncé par micro, 8 à 18 répétitions sur une série de 20. Chaque
 * gabarit compose désormais un NOM de quadrilatère (ABCD, EFGH, KLMN, RSTU…)
 * × une SITUATION (tuile de mosaïque, pantographe, place de parking en épi,
 * porte de garage, cerf-volant en losange, tissu à motifs, parcelle…) × une
 * TOURNURE (3 ou 4 façons de poser la même question), et la propriété
 * interrogée varie (côtés, angles, diagonales, cas particuliers).
 * Mesure : scripts/mesurer-squelettes-coach.ts 4e quadrilatere_parallelogramme.
 *
 * ⚠️ LES FIGURES. Le canvas place A en bas à gauche, B en bas à droite, C en
 * haut à droite, D en haut à gauche : les étiquettes affichées sont les lettres
 * du NOM tiré (E, F, G, H…), dans le même ordre. Une figure ne porte jamais un
 * nombre que l'énoncé ne dit pas.
 */
import type {
  TutorBankItemV4,
  QuadrilatereCanvasData,
} from "@/lib/tutor-v4/types";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle<T>(arr: readonly T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** 1500 → « 1 500 », 4.5 → « 4,5 ». L'élève lit des nombres français. */
function fr(n: number): string {
  return Number.isInteger(n)
    ? n.toLocaleString("fr-FR").replace(/[  ]/g, " ")
    : String(n).replace(".", ",");
}

/** Première lettre en minuscule (« L'écran » → « l'écran »). */
const minus = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);

/**
 * ⭐ LES NOMMAGES DU QUADRILATÈRE, ajoutés le 31/08/2026, élargis le 03/10.
 *
 * Nommer le quadrilatère n'est pas cosmétique — c'est ce qui oblige l'élève à
 * LIRE la figure au lieu de reconnaître une image.
 *
 * ⚠️ L'ORDRE DES LETTRES COMPTE : dans un quadrilatère ABCD, les côtés opposés
 * sont [AB] et [CD], [BC] et [DA]. Les quatre lettres se suivent donc dans le
 * sens du tracé, jamais au hasard.
 */
type Sommet = "A" | "B" | "C" | "D";
type Cote = "AB" | "BC" | "CD" | "DA" | "AC" | "BD";
type Nom = Record<Sommet, string> & { nom: string; O: string; H: string };

const NOMS = ["ABCD", "EFGH", "KLMN", "RSTU", "PQRS", "MNPQ", "UVWX", "DEFG", "WXYZ"];

function tirerNom(): Nom {
  const nom = randomChoice(NOMS);
  const [A, B, C, D] = nom.split("");
  // O : le centre (intersection des diagonales) ; H : le pied d'une hauteur.
  const O = randomChoice(["O", "I"]);
  const H = ["H", "K", "J", "L"].find((l) => !nom.includes(l)) as string;
  return { A, B, C, D, nom, O, H };
}

/** Deux noms différents (pour comparer deux parallélogrammes). */
function deuxNoms(): [Nom, Nom] {
  const n1 = tirerNom();
  let n2 = tirerNom();
  // ⚠️ 08/10 : aucune lettre commune (« EFGH » et « DEFG » se confondaient).
  while ([...n2.nom].some((l) => n1.nom.includes(l))) n2 = tirerNom();
  return [n1, n2];
}

/** « AB » écrit avec les lettres du nom tiré : sg(n, "AB") → « EF ». */
function sg(n: Nom, gabarit: string): string {
  return gabarit
    .split("")
    .map((l) => (l in n && l.length === 1 ? (n as unknown as Record<string, string>)[l] : l))
    .join("");
}

const VOISINS: Record<Sommet, [Sommet, Sommet]> = {
  A: ["D", "B"],
  B: ["A", "C"],
  C: ["B", "D"],
  D: ["C", "A"],
};

/** Trois façons de nommer un angle : « l'angle DAB », « l'angle de sommet A », « l'angle en A ». */
function angleDe(n: Nom, v: Sommet, style: number): string {
  if (style === 0) return `l'angle ${n[VOISINS[v][0]]}${n[v]}${n[VOISINS[v][1]]}`;
  if (style === 1) return `l'angle de sommet ${n[v]}`;
  return `l'angle en ${n[v]}`;
}

const opposeDe: Record<Sommet, Sommet> = { A: "C", B: "D", C: "A", D: "B" };

const PRENOMS = ["Inès", "Hugo", "Lina", "Malik", "Chloé", "Noah", "Jade", "Yanis", "Emma", "Sacha", "Léo", "Maëlys"];
/** Un prénom avec son pronom, pour accorder « A-t-elle raison ? ». */
const ELEVES: { p: string; il: "il" | "elle" }[] = [
  { p: "Inès", il: "elle" },
  { p: "Hugo", il: "il" },
  { p: "Lina", il: "elle" },
  { p: "Malik", il: "il" },
  { p: "Chloé", il: "elle" },
  { p: "Noah", il: "il" },
  { p: "Jade", il: "elle" },
  { p: "Yanis", il: "il" },
  { p: "Emma", il: "elle" },
  { p: "Léo", il: "il" },
];

/* ---------------------------------------------------------------------------
   LES FIGURES
--------------------------------------------------------------------------- */
type Forme = "para" | "paraG" | "rect" | "losange" | "carre" | "trapeze" | "quelconque" | "cerfvolant";

const POINTS: Record<Forme, QuadrilatereCanvasData["points"]> = {
  // angle aigu en A et en C
  para: { A: { x: 60, y: 165 }, B: { x: 215, y: 165 }, C: { x: 255, y: 75 }, D: { x: 100, y: 75 } },
  // angle obtus en A et en C
  paraG: { A: { x: 95, y: 165 }, B: { x: 250, y: 165 }, C: { x: 205, y: 75 }, D: { x: 50, y: 75 } },
  rect: { A: { x: 55, y: 170 }, B: { x: 235, y: 170 }, C: { x: 235, y: 65 }, D: { x: 55, y: 65 } },
  losange: { A: { x: 50, y: 175 }, B: { x: 170, y: 175 }, C: { x: 242, y: 79 }, D: { x: 122, y: 79 } },
  carre: { A: { x: 85, y: 185 }, B: { x: 210, y: 185 }, C: { x: 210, y: 60 }, D: { x: 85, y: 60 } },
  trapeze: { A: { x: 45, y: 170 }, B: { x: 255, y: 170 }, C: { x: 200, y: 75 }, D: { x: 110, y: 75 } },
  quelconque: { A: { x: 55, y: 170 }, B: { x: 235, y: 185 }, C: { x: 255, y: 70 }, D: { x: 90, y: 50 } },
  // AB = AD et CB = CD
  cerfvolant: { A: { x: 150, y: 200 }, B: { x: 225, y: 105 }, C: { x: 150, y: 40 }, D: { x: 75, y: 105 } },
};

/* ⭐ 08/10/2026 — LA FIGURE RESPECTE SES MESURES. Un parallélogramme étiqueté
   « 49 » et « 58 » se dessinait avec le côté de 49 plus long que celui de 58,
   un angle de 140° avec un angle aigu de 66°. `formeMesuree` recalcule les
   points d'un parallélogramme à partir des étiquettes chiffrées (côtés,
   angle, hauteur, diagonales) ; sans mesure, la forme par défaut reste. */
const nombreDe = (s?: string) => {
  const m = String(s ?? "").match(/^(\d+(?:,\d+)?)/);
  return m ? Number(m[1].replace(",", ".")) : null;
};
type Pt = { x: number; y: number };
/** Met A et B en bas, C et D au-dessus, dans le cadre 300 × 230 (marges pour les étiquettes). */
function caser(P: Record<Sommet, Pt>): QuadrilatereCanvasData["points"] {
  const ks: Sommet[] = ["A", "B", "C", "D"];
  // AB horizontal, D au-dessus.
  const ang = Math.atan2(P.B.y - P.A.y, P.B.x - P.A.x);
  const R = (p: Pt): Pt => {
    const x = p.x - P.A.x, y = p.y - P.A.y;
    return { x: x * Math.cos(-ang) - y * Math.sin(-ang), y: x * Math.sin(-ang) + y * Math.cos(-ang) };
  };
  let Q = Object.fromEntries(ks.map((k) => [k, R(P[k])])) as Record<Sommet, Pt>;
  if (Q.D.y < 0) Q = Object.fromEntries(ks.map((k) => [k, { x: Q[k].x, y: -Q[k].y }])) as Record<Sommet, Pt>;
  const xs = ks.map((k) => Q[k].x), ys = ks.map((k) => Q[k].y);
  const [x0, x1, y0, y1] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
  const s = Math.min(200 / (x1 - x0), 110 / (y1 - y0));
  const ox = 150 - (s * (x0 + x1)) / 2;
  const arr = (v: number) => Math.round(v * 10) / 10;
  return Object.fromEntries(ks.map((k) => [k, { x: arr(ox + s * Q[k].x), y: arr(175 - s * (Q[k].y - y0)) }])) as QuadrilatereCanvasData["points"];
}
function formeMesuree(
  forme: Forme,
  o: { cotes?: Partial<Record<Cote, string>>; angles?: Partial<Record<Sommet, string>>; hauteur?: string }
): QuadrilatereCanvasData["points"] | null {
  if (forme !== "para" && forme !== "paraG") return null;
  const c = o.cotes ?? {};
  const ab = nombreDe(c.AB) ?? nombreDe(c.CD);
  const ad = nombreDe(c.BC) ?? nombreDe(c.DA);
  const p = nombreDe(c.AC);
  const q = nombreDe(c.BD);
  const h = nombreDe(o.hauteur);
  let angA: number | null = null;
  for (const k of ["A", "B", "C", "D"] as Sommet[]) {
    const v = nombreDe(o.angles?.[k]);
    if (v != null) angA = k === "A" || k === "C" ? v : 180 - v;
  }
  const RAD = Math.PI / 180;
  // Diagonales et un côté : le triangle OAB (OA = p ÷ 2, OB = q ÷ 2) fixe tout.
  if (p != null && q != null) {
    const oa = p / 2, ob = q / 2;
    const cote = ab ?? Math.sqrt(oa * oa + ob * ob - 2 * oa * ob * Math.cos(70 * RAD));
    const t = Math.acos((oa * oa + ob * ob - cote * cote) / (2 * oa * ob));
    const A = { x: -oa, y: 0 }, C = { x: oa, y: 0 };
    const B = { x: -ob * Math.cos(t), y: -ob * Math.sin(t) };
    const D = { x: -B.x, y: -B.y };
    return caser({ A, B, C, D });
  }
  if (ab == null && ad == null && angA == null && h == null) return null;
  const AB = ab ?? (ad != null ? ad * 1.5 : h != null ? h * 1.6 : 1.5);
  let a = angA ?? (forme === "paraG" ? 116 : 66);
  let AD = ad ?? (h != null ? h / Math.sin(a * RAD) : AB * 0.64);
  // La hauteur et le côté incliné fixent l'angle : sin A = h ÷ AD.
  if (h != null && ad != null && h < ad) a = Math.asin(h / ad) / RAD;
  if (h != null && ad == null) AD = h / Math.sin(a * RAD);
  const A = { x: 0, y: 0 }, B = { x: AB, y: 0 };
  const D = { x: AD * Math.cos(a * RAD), y: AD * Math.sin(a * RAD) };
  const C = { x: B.x + D.x, y: D.y };
  return caser({ A, B, C, D });
}

function figure(
  n: Nom,
  forme: Forme,
  o: {
    cotes?: Partial<Record<Cote, string>>;
    diagonales?: boolean;
    angles?: Partial<Record<Sommet, string>>;
    hauteur?: string;
    codage?: boolean;
  } = {}
): QuadrilatereCanvasData {
  const codage = o.codage ?? true;
  const marks: NonNullable<QuadrilatereCanvasData["marks"]> = {};
  if (codage) {
    if (forme === "para" || forme === "paraG" || forme === "losange")
      marks.parallelSides = [
        ["AB", "CD"],
        ["BC", "DA"],
      ];
    if (forme === "rect" || forme === "carre") marks.rightAnglesAt = ["A", "B", "C", "D"];
    if (forme === "trapeze") marks.parallelSides = [["AB", "CD"]];
    if (forme === "cerfvolant")
      marks.equalSides = [
        ["AB", "DA"],
        ["BC", "CD"],
      ];
  }
  const canvas: QuadrilatereCanvasData = {
    kind: "quadrilatere",
    points: formeMesuree(forme, o) ?? POINTS[forme],
    labels: { A: n.A, B: n.B, C: n.C, D: n.D },
    display: {
      showPoints: true,
      showLabels: true,
      showSides: !!o.cotes,
      showAngles: !!o.angles,
      showDiagonals: !!o.diagonales,
    },
    marks,
    size: { width: 300, height: 230 },
  };
  if (o.cotes) canvas.sideLabels = o.cotes;
  if (o.angles) canvas.angleLabels = o.angles;
  if (o.hauteur) canvas.height = { fromVertex: "D", onSide: "AB", label: o.hauteur };
  return canvas;
}

/* ---------------------------------------------------------------------------
   LES SITUATIONS
--------------------------------------------------------------------------- */

/** Des objets en forme de parallélogramme quelconque, avec une unité et des longueurs plausibles. */
type Ctx = { intro: (N: string) => string; u: "cm" | "m"; min: number; max: number };
const CTX_PARA: Ctx[] = [
  { intro: (N) => `Le motif d'un tissu est un parallélogramme ${N}.`, u: "cm", min: 3, max: 12 },
  { intro: (N) => `Une tuile de mosaïque a la forme d'un parallélogramme ${N}.`, u: "cm", min: 4, max: 15 },
  { intro: (N) => `Sur le plan d'un parking, une place en épi est un parallélogramme ${N}.`, u: "m", min: 3, max: 6 },
  { intro: (N) => `Les quatre barres articulées d'un pantographe forment un parallélogramme ${N}.`, u: "cm", min: 12, max: 40 },
  { intro: (N) => `Les bras d'une lampe d'architecte dessinent un parallélogramme ${N}.`, u: "cm", min: 15, max: 45 },
  { intro: (N) => `Une étagère mal fixée s'est penchée : son cadre forme un parallélogramme ${N}.`, u: "cm", min: 30, max: 90 },
  { intro: (N) => `Sur un plan cadastral, une parcelle a la forme d'un parallélogramme ${N}.`, u: "m", min: 15, max: 60 },
  { intro: (N) => `Un carreau de carrelage posé en biais dessine un parallélogramme ${N}.`, u: "cm", min: 10, max: 30 },
  { intro: (N) => `Le logo d'un club de sport est un parallélogramme ${N}.`, u: "cm", min: 3, max: 12 },
  { intro: (N) => `Dans un vitrail, une pièce de verre a la forme d'un parallélogramme ${N}.`, u: "cm", min: 5, max: 20 },
  { intro: (N) => `Sur un papier peint, chaque motif est un parallélogramme ${N}.`, u: "cm", min: 4, max: 15 },
  { intro: (N) => `Un champ de cannes à sucre a la forme d'un parallélogramme ${N}.`, u: "m", min: 40, max: 120 },
  { intro: (N) => `Dans son cahier, une élève trace un parallélogramme ${N}.`, u: "cm", min: 3, max: 12 },
  { intro: (N) => `Un logiciel de géométrie affiche un parallélogramme ${N}.`, u: "cm", min: 3, max: 15 },
  { intro: (N) => `La grille d'un portail extensible est faite de parallélogrammes ; l'un d'eux s'appelle ${N}.`, u: "cm", min: 8, max: 20 },
  { intro: (N) => `Sur un drapeau, une bande oblique a la forme d'un parallélogramme ${N}.`, u: "cm", min: 10, max: 40 },
  { intro: (N) => `Vu du ciel, le tablier d'une passerelle est un parallélogramme ${N}.`, u: "m", min: 4, max: 20 },
];

/** Des terrains (en mètres) pour les problèmes d'aire et de périmètre. */
type Terrain = { intro: (N: string) => string; bmin: number; bmax: number; hmin: number; hmax: number; cloture?: false };
const TERRAINS: Terrain[] = [
  { intro: (N) => `Un jardin partagé a la forme d'un parallélogramme ${N}.`, bmin: 12, bmax: 40, hmin: 6, hmax: 25 },
  { intro: (N) => `Une parcelle de vigne dessine un parallélogramme ${N}.`, bmin: 30, bmax: 90, hmin: 15, hmax: 50 },
  { intro: (N) => `Un champ de blé a la forme d'un parallélogramme ${N}.`, bmin: 50, bmax: 150, hmin: 30, hmax: 90 },
  { intro: (N) => `Le parking d'un supermarché est un parallélogramme ${N}.`, bmin: 40, bmax: 100, hmin: 20, hmax: 60 },
  { intro: (N) => `Dans un parc, une pelouse a la forme d'un parallélogramme ${N}.`, bmin: 15, bmax: 50, hmin: 8, hmax: 30 },
  { intro: (N) => `Un terrain de pétanque a la forme d'un parallélogramme ${N}.`, bmin: 12, bmax: 20, hmin: 4, hmax: 8 },
  { intro: (N) => `La cour d'une école a la forme d'un parallélogramme ${N}.`, bmin: 25, bmax: 60, hmin: 15, hmax: 40 },
  { intro: (N) => `Un potager familial est un parallélogramme ${N}.`, bmin: 6, bmax: 15, hmin: 3, hmax: 10 },
  { intro: (N) => `Un champ de cannes à sucre a la forme d'un parallélogramme ${N}.`, bmin: 50, bmax: 150, hmin: 30, hmax: 80 },
  { intro: (N) => `La place d'un village a la forme d'un parallélogramme ${N}.`, bmin: 20, bmax: 60, hmin: 15, hmax: 40 },
  { intro: (N) => `Un massif de fleurs a la forme d'un parallélogramme ${N}.`, bmin: 3, bmax: 8, hmin: 2, hmax: 5 },
  { intro: (N) => `Une terrasse en bois a la forme d'un parallélogramme ${N}.`, bmin: 4, bmax: 12, hmin: 3, hmax: 8 },
  { intro: (N) => `Une prairie où paissent des chèvres a la forme d'un parallélogramme ${N}.`, bmin: 30, bmax: 80, hmin: 20, hmax: 50 },
  { intro: (N) => `Le fond d'un bassin de baignade est un parallélogramme ${N}.`, bmin: 10, bmax: 25, hmin: 5, hmax: 15, cloture: false },
  { intro: (N) => `Un square a la forme d'un parallélogramme ${N}.`, bmin: 20, bmax: 50, hmin: 10, hmax: 30 },
];

/** Des objets « quelconques » dont on donne seulement la forme. */
const OBJETS_FORME = [
  "Une dalle de terrasse",
  "Un motif de tissu",
  "Une pièce de puzzle",
  "Une planche de bois découpée",
  "Une parcelle de jardin",
  "Un autocollant",
  "Une tuile de mosaïque",
  "Une pièce de vitrail",
  "Une étiquette de bouteille",
  "Un tapis de bain",
  "Une plaque de métal",
  "Un badge brodé",
];

/**
 * Des objets pour les calculs d'aire, chacun avec SON unité et des dimensions
 * réelles (base et hauteur, tirées par pas de `pas`).
 */
const OBJETS_AIRE: { gn: string; u: "cm" | "m"; bmin: number; bmax: number; hmin: number; hmax: number; pas: number }[] = [
  { gn: "Une dalle de terrasse", u: "cm", bmin: 30, bmax: 60, hmin: 20, hmax: 50, pas: 5 },
  { gn: "Un motif de tissu", u: "cm", bmin: 3, bmax: 12, hmin: 2, hmax: 8, pas: 1 },
  { gn: "Un autocollant", u: "cm", bmin: 3, bmax: 10, hmin: 2, hmax: 7, pas: 1 },
  { gn: "Une planche de bois découpée", u: "cm", bmin: 20, bmax: 80, hmin: 10, hmax: 40, pas: 5 },
  { gn: "Une parcelle de jardin", u: "m", bmin: 8, bmax: 30, hmin: 5, hmax: 20, pas: 1 },
  { gn: "Une tuile de mosaïque", u: "cm", bmin: 2, bmax: 8, hmin: 2, hmax: 6, pas: 1 },
  { gn: "Une pièce de vitrail", u: "cm", bmin: 5, bmax: 20, hmin: 4, hmax: 15, pas: 1 },
  { gn: "Une étiquette de bouteille", u: "cm", bmin: 6, bmax: 12, hmin: 4, hmax: 9, pas: 1 },
  { gn: "Un tapis de bain", u: "cm", bmin: 60, bmax: 90, hmin: 40, hmax: 60, pas: 10 },
  { gn: "Une plaque de métal", u: "cm", bmin: 10, bmax: 40, hmin: 5, hmax: 30, pas: 5 },
  { gn: "Un badge brodé", u: "cm", bmin: 3, bmax: 8, hmin: 2, hmax: 6, pas: 1 },
  { gn: "Un timbre", u: "cm", bmin: 3, bmax: 5, hmin: 2, hmax: 4, pas: 1 },
  { gn: "Un carreau de carrelage posé en biais", u: "cm", bmin: 10, bmax: 30, hmin: 10, hmax: 25, pas: 5 },
  { gn: "Une place de parking en épi", u: "m", bmin: 3, bmax: 6, hmin: 2, hmax: 5, pas: 1 },
  { gn: "Une parcelle de vigne", u: "m", bmin: 30, bmax: 90, hmin: 15, hmax: 50, pas: 1 },
];

/** Des objets réels dont la forme est un cas particulier (ou un trapèze). */
type Famille = "rectangle" | "losange" | "carré" | "trapèze";
const OBJETS_SPECIAUX: { gn: string; f: Famille }[] = [
  { gn: "Une porte de garage", f: "rectangle" },
  { gn: "L'écran d'un téléphone", f: "rectangle" },
  { gn: "Une feuille A4", f: "rectangle" },
  { gn: "Un terrain de basket", f: "rectangle" },
  { gn: "Un tableau de classe", f: "rectangle" },
  { gn: "Une tablette de chocolat", f: "rectangle" },
  { gn: "Un cerf-volant en losange", f: "losange" },
  { gn: "Un panneau « route prioritaire »", f: "losange" },
  { gn: "La maille d'un grillage", f: "losange" },
  { gn: "Une case de portail extensible", f: "losange" },
  { gn: "Le symbole « carreau » d'un jeu de cartes", f: "losange" },
  { gn: "Une case d'échiquier", f: "carré" },
  { gn: "Un carreau de faïence", f: "carré" },
  { gn: "Un post-it", f: "carré" },
  { gn: "Une serviette en papier dépliée", f: "carré" },
  { gn: "Le flanc d'un abat-jour", f: "trapèze" },
  { gn: "La coupe d'un canal d'irrigation", f: "trapèze" },
  { gn: "Le pan avant d'un toit", f: "trapèze" },
  { gn: "Le profil d'un seau", f: "trapèze" },
];
const FORME_DE: Record<Famille, Forme> = { rectangle: "rect", losange: "losange", "carré": "carre", "trapèze": "trapeze" };

/* ---------------------------------------------------------------------------
   Textes d'explication communs
--------------------------------------------------------------------------- */
const DEF = "Définition : un parallélogramme est un quadrilatère dont les côtés opposés sont parallèles deux à deux.\n\n";

export const parallelogrammesBank: TutorBankItemV4[] = [
  // =========================
  // PARA_RECONNAITRE
  // =========================
  {
    kind: "fixed",
    id: "quadrilatere_parallelogramme_reconnaitre_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    text: "Un quadrilatère dont les côtés opposés sont parallèles deux à deux est…",
    format: "qcm",
    choices: ["un triangle", "un parallélogramme", "un cercle", "un pentagone"],
    expected: ["un parallélogramme"],
    comparator: "mcq_exact",
    hint: "C’est la définition du parallélogramme.",
    explanation:
      "Définition : un parallélogramme est un quadrilatère dont les côtés opposés sont parallèles deux à deux.\n\n" +
          "Méthode : on utilise la propriété du parallélogramme qui correspond aux données de l’énoncé.\n\nCalcul : " +
          ("Un parallélogramme est un quadrilatère dont les côtés opposés sont parallèles deux à deux.") +
          "\n\nConclusion : la propriété choisie permet de conclure sur la figure.",
    tags: ["parallelogramme", "definition"],
  },
  {
    kind: "fixed",
    id: "quadrilatere_parallelogramme_reconnaitre_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    text: "Un rectangle est-il un parallélogramme ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Un rectangle a aussi ses côtés opposés parallèles.",
    explanation: "Définition : un parallélogramme est un quadrilatère dont les côtés opposés sont parallèles deux à deux.\n\n" +
          "Méthode : on utilise la propriété du parallélogramme qui correspond aux données de l’énoncé.\n\nCalcul : " +
          ("Oui. Un rectangle est un parallélogramme particulier.") +
          "\n\nConclusion : la propriété choisie permet de conclure sur la figure.",
    tags: ["parallelogramme", "rectangle"],
  },
  {
    kind: "template",
    id: "quadrilatere_parallelogramme_reconnaitre_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    hint: "Observe le codage : côtés parallèles, angles droits, longueurs égales.",
    tags: ["parallelogramme", "canvas", "template"],
    // ⛔ RÉPARÉ LE 31/08/2026 puis le 03/10 : la figure est nommée, et sa forme
    // varie (parallélogramme, rectangle, losange, carré, trapèze, cerf-volant,
    // quadrilatère quelconque). Ce que dit le codage suffit toujours à trancher.
    generate: () => {
      const n = tirerNom();
      const N = n.nom;
      const forme = randomChoice(["para", "rect", "losange", "carre", "trapeze", "quelconque", "cerfvolant"] as const);
      const oui = forme === "para" || forme === "rect" || forme === "losange" || forme === "carre";
      let canvas: QuadrilatereCanvasData;
      let raison: string;
      if (forme === "para") {
        canvas = figure(n, "para");
        raison = `Les côtés [${sg(n, "AB")}] et [${sg(n, "CD")}] sont codés parallèles, ainsi que [${sg(n, "BC")}] et [${sg(n, "DA")}] : c'est la définition du parallélogramme.`;
      } else if (forme === "rect") {
        canvas = figure(n, "rect");
        raison = `Les quatre angles sont codés droits : ${N} est un rectangle, et un rectangle est un parallélogramme particulier.`;
      } else if (forme === "losange") {
        const L = randomInt(3, 9);
        canvas = figure(n, "losange", { codage: false, cotes: { AB: `${L} cm`, BC: `${L} cm`, CD: `${L} cm`, DA: `${L} cm` } });
        raison = `Les quatre côtés mesurent ${L} cm : ${N} est un losange, et un losange est un parallélogramme particulier.`;
      } else if (forme === "carre") {
        const L = randomInt(3, 9);
        canvas = figure(n, "carre", { cotes: { AB: `${L} cm`, BC: `${L} cm`, CD: `${L} cm`, DA: `${L} cm` } });
        raison = `Quatre angles droits et quatre côtés de ${L} cm : ${N} est un carré, donc un parallélogramme particulier.`;
      } else if (forme === "trapeze") {
        const [x, y] = shuffle([4, 5, 6, 7, 8, 9]).slice(0, 2);
        canvas = figure(n, "trapeze", { cotes: { DA: `${x} cm`, BC: `${y} cm` } });
        raison = `Seuls [${sg(n, "AB")}] et [${sg(n, "CD")}] sont codés parallèles, et les côtés opposés [${sg(n, "DA")}] et [${sg(n, "BC")}] mesurent ${x} cm et ${y} cm : ils ne sont pas égaux, donc ${N} n'est pas un parallélogramme (c'est un trapèze).`;
      } else if (forme === "quelconque") {
        const [a, b, c, d] = shuffle([3, 4, 5, 6, 7, 8, 9, 10]).slice(0, 4);
        canvas = figure(n, "quelconque", { cotes: { AB: `${a} cm`, BC: `${b} cm`, CD: `${c} cm`, DA: `${d} cm` } });
        raison = `Les côtés opposés [${sg(n, "AB")}] et [${sg(n, "CD")}] mesurent ${a} cm et ${c} cm : ils ne sont pas égaux. Or dans un parallélogramme, les côtés opposés ont la même longueur.`;
      } else {
        // Le dessin a [AB] et [DA] plus longs que [BC] et [CD] : a > b.
        const [a, b] = shuffle([4, 5, 6, 7, 8, 9]).slice(0, 2).sort((x, y) => y - x);
        canvas = figure(n, "cerfvolant", { cotes: { AB: `${a} cm`, DA: `${a} cm`, BC: `${b} cm`, CD: `${b} cm` } });
        raison = `Ce sont des côtés CONSÉCUTIFS qui sont égaux ([${sg(n, "AB")}] et [${sg(n, "DA")}] mesurent ${a} cm). Les côtés opposés [${sg(n, "AB")}] et [${sg(n, "CD")}] mesurent ${a} cm et ${b} cm : ${N} est un cerf-volant, pas un parallélogramme.`;
      }
      const prenom = randomChoice(PRENOMS);
      const text = randomChoice([
        `Le quadrilatère ${N}, tel qu'il est codé, est-il un parallélogramme ?`,
        `Observe les codages de la figure ${N}. Peut-on affirmer que ${N} est un parallélogramme ?`,
        `Sur son cahier, ${prenom} a tracé et codé le quadrilatère ${N}. Ce quadrilatère est-il un parallélogramme ?`,
        `D'après la figure codée, ${N} est-il un parallélogramme ?`,
      ]);
      return {
        text,
        format: "qcm",
        choices: ["oui", "non"],
        expected: [oui ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation:
          DEF +
          "Méthode : on lit le codage de la figure, sans se fier à l'œil.\n\n" +
          `Ici : ${minus(raison)}\n\n` +
          `Conclusion : ${oui ? `oui, ${N} est un parallélogramme.` : `non, ${N} n'est pas un parallélogramme.`}`,
        canvas,
      };
    },
  },
    {
    kind: "fixed",
    id: "quadrilatere_parallelogramme_reconnaitre_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    // ⛔ 08/10/2026 : question ouverte à mots-clés (« rectangle » suffisait) → QCM sur les mêmes pièges.
    text: "Pourquoi un rectangle est-il un parallélogramme particulier ?",
    format: "qcm",
    choices: [
      "parce que ses côtés opposés sont parallèles deux à deux",
      "parce qu'il a quatre côtés",
      "parce que ses diagonales sont perpendiculaires",
      "parce que ses quatre côtés ont la même longueur",
    ],
    expected: ["parce que ses côtés opposés sont parallèles deux à deux"],
    comparator: "mcq_exact",
    hint: "Observe les côtés opposés d’un rectangle.",
    explanation:
      "Définition : un parallélogramme est un quadrilatère dont les côtés opposés sont parallèles deux à deux.\n\n" +
          "Méthode : on utilise la propriété du parallélogramme qui correspond aux données de l’énoncé.\n\nCalcul : " +
          ("Un rectangle a ses côtés opposés parallèles deux à deux. Il vérifie donc la définition d’un parallélogramme.") +
          "\n\nConclusion : la propriété choisie permet de conclure sur la figure.",
    tags: ["parallelogramme", "rectangle", "open"],
  },

  // =========================
  // PARA_PROPRIETES
  // =========================
  {
    kind: "fixed",
    id: "quadrilatere_parallelogramme_propriete_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_propriete",
    difficulty: 2,
    theme: "neutral",
    text: "Dans un parallélogramme, les côtés opposés sont…",
    format: "qcm",
    choices: [
      "égaux et parallèles",
      "perpendiculaires",
      "de longueurs quelconques",
      "toujours verticaux",
    ],
    expected: ["égaux et parallèles"],
    comparator: "mcq_exact",
    hint: "C’est une propriété fondamentale du parallélogramme.",
    explanation:
      "Définition : un parallélogramme est un quadrilatère dont les côtés opposés sont parallèles deux à deux.\n\n" +
          "Méthode : on utilise la propriété du parallélogramme qui correspond aux données de l’énoncé.\n\nCalcul : " +
          ("Dans un parallélogramme, les côtés opposés sont parallèles et de même longueur.") +
          "\n\nConclusion : la propriété choisie permet de conclure sur la figure.",
    tags: ["parallelogramme", "propriete"],
  },
  {
    kind: "template",
    id: "quadrilatere_parallelogramme_propriete_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_propriete",
    difficulty: 2,
    theme: "neutral",
    hint: "Dans un parallélogramme, les côtés opposés ont même longueur.",
    tags: ["parallelogramme", "longueur", "template"],
    generate: () => {
      const n = tirerNom();
      const N = n.nom;
      const ctx = randomChoice(CTX_PARA);
      const a = randomInt(ctx.min, ctx.max);
      let b = randomInt(ctx.min, ctx.max);
      if (b === a) b = a + 1;
      // Un côté de chaque paire est donné ; on demande un des deux autres.
      const c1 = randomChoice(["AB", "CD"] as const);
      const c2 = randomChoice(["BC", "DA"] as const);
      const opp: Record<string, "AB" | "BC" | "CD" | "DA"> = { AB: "CD", CD: "AB", BC: "DA", DA: "BC" };
      const demande = randomChoice([opp[c1], opp[c2]]);
      const rep = demande === opp[c1] ? a : b;
      const connu = demande === opp[c1] ? c1 : c2;
      const [X, Y, Z] = [sg(n, c1), sg(n, c2), sg(n, demande)];
      const t = randomInt(0, 3);
      const text =
        t === 0
          ? `${ctx.intro(N)} On sait que ${X} = ${a} ${ctx.u} et ${Y} = ${b} ${ctx.u}. Quelle est la longueur de [${Z}], en ${ctx.u} ?`
          : t === 1
            ? `${ctx.intro(N)} Le côté [${Y}] mesure ${b} ${ctx.u} et le côté [${X}] mesure ${a} ${ctx.u}. Combien mesure le côté [${Z}] ?`
            : t === 2
              ? `${N} est un parallélogramme tel que ${X} = ${a} ${ctx.u} et ${Y} = ${b} ${ctx.u}. Donne la longueur ${Z}, en ${ctx.u}.`
              : `Dans le parallélogramme ${N}, deux côtés mesurent ${X} = ${a} ${ctx.u} et ${Y} = ${b} ${ctx.u}. Quelle longueur mesure [${Z}] ?`;
      return {
        text,
        format: "short",
        expected: [`${rep} ${ctx.u}`],
        comparator: "number_equal",
        explanation:
          DEF +
          "Méthode : dans un parallélogramme, les côtés opposés ont la même longueur.\n\n" +
          `Calcul : [${Z}] est opposé à [${sg(n, connu)}], donc ${Z} = ${sg(n, connu)} = ${rep} ${ctx.u}.\n\n` +
          `Conclusion : ${Z} = ${rep} ${ctx.u}.`,
        canvas: figure(n, "para", { cotes: { [c1]: `${a} ${ctx.u}`, [c2]: `${b} ${ctx.u}`, [demande]: "?" } }),
      };
    },
  },
  {
    kind: "template",
    id: "quadrilatere_parallelogramme_propriete_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_propriete",
    difficulty: 3,
    theme: "neutral",
    hint: "Dans un parallélogramme, les angles opposés sont égaux et deux angles consécutifs ont pour somme 180°.",
    tags: ["parallelogramme", "angles", "template"],
    generate: () => {
      const n = tirerNom();
      const N = n.nom;
      const a = randomChoice([35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 100, 105, 110, 115, 120, 125, 130, 135, 140]);
      const X = randomChoice(["A", "B", "C", "D"] as const);
      const Y = randomChoice((["A", "B", "C", "D"] as const).filter((v) => v !== X));
      const oppose = opposeDe[X] === Y;
      const rep = oppose ? a : 180 - a;
      const st = randomInt(0, 2);
      const aX = angleDe(n, X, st);
      const aY = angleDe(n, Y, st);
      const t = randomInt(0, 3);
      const text =
        t === 0
          ? `Dans le parallélogramme ${N}, ${aX} mesure ${a}°. Quelle est la mesure de ${aY} ?`
          : t === 1
            ? `${N} est un parallélogramme dans lequel ${aX} vaut ${a}°. Calcule la mesure de ${aY}, en degrés.`
            : t === 2
              ? `On sait que ${N} est un parallélogramme et que ${aX} fait ${a}°. Que vaut ${aY} ?`
              : `${N} est un parallélogramme. Si ${aX} mesure ${a}°, combien de degrés mesure ${aY} ?`;
      // Le dessin a ses angles aigus là où l'énoncé les met.
      const aiguEnA = (X === "A" || X === "C") === a < 90;
      return {
        text,
        format: "short",
        expected: [`${rep}°`],
        comparator: "number_equal",
        explanation:
          DEF +
          "Méthode : dans un parallélogramme, deux angles opposés sont égaux et deux angles consécutifs ont pour somme 180°.\n\n" +
          (oppose
            ? `Calcul : les sommets ${n[X]} et ${n[Y]} sont opposés, donc les deux angles sont égaux : ${a}°.\n\n`
            : `Calcul : les sommets ${n[X]} et ${n[Y]} sont consécutifs, donc 180 − ${a} = ${rep}.\n\n`) +
          `Conclusion : ${aY} mesure ${rep}°.`,
        canvas: figure(n, aiguEnA ? "para" : "paraG", { angles: { [X]: `${a}°`, [Y]: "?" } }),
      };
    },
  },
    {
    kind: "fixed",
    id: "quadrilatere_parallelogramme_propriete_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_propriete",
    difficulty: 3,
    theme: "neutral",
    // ⛔ 08/10/2026 : question ouverte à mots-clés → QCM sur les mêmes pièges.
    text: "Quelles propriétés possèdent les côtés opposés d’un parallélogramme ?",
    format: "qcm",
    choices: [
      "ils sont parallèles et de même longueur",
      "ils sont parallèles, mais de longueurs différentes",
      "ils sont de même longueur, mais pas forcément parallèles",
      "ils sont perpendiculaires",
    ],
    expected: ["ils sont parallèles et de même longueur"],
    comparator: "mcq_exact",
    hint: "Il y a deux propriétés importantes : direction et longueur.",
    explanation:
      "Définition : un parallélogramme est un quadrilatère dont les côtés opposés sont parallèles deux à deux.\n\n" +
          "Méthode : on utilise la propriété du parallélogramme qui correspond aux données de l’énoncé.\n\nCalcul : " +
          ("Dans un parallélogramme, les côtés opposés sont parallèles et de même longueur.") +
          "\n\nConclusion : la propriété choisie permet de conclure sur la figure.",
    tags: ["parallelogramme", "propriete", "open"],
  },

  // =========================
  // PARA_DIAGONALES
  // =========================
  {
    kind: "fixed",
    id: "quadrilatere_parallelogramme_diagonale_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_diagonale",
    difficulty: 2,
    theme: "neutral",
    text: "Dans un parallélogramme, les diagonales…",
    format: "qcm",
    choices: [
      "se coupent en leur milieu",
      "sont toujours perpendiculaires",
      "sont toujours égales",
      "n’existent pas",
    ],
    expected: ["se coupent en leur milieu"],
    comparator: "mcq_exact",
    hint: "C’est une propriété centrale du parallélogramme.",
    explanation:
      "Définition : un parallélogramme est un quadrilatère dont les côtés opposés sont parallèles deux à deux.\n\n" +
          "Méthode : on utilise la propriété du parallélogramme qui correspond aux données de l’énoncé.\n\nCalcul : " +
          ("Dans un parallélogramme, les diagonales se coupent en leur milieu.") +
          "\n\nConclusion : la propriété choisie permet de conclure sur la figure.",
    tags: ["parallelogramme", "diagonale"],
  },
  {
    kind: "template",
    id: "quadrilatere_parallelogramme_diagonale_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_diagonale",
    difficulty: 3,
    theme: "neutral",
    hint: "Les diagonales se coupent en leur milieu : chacune est partagée en deux moitiés égales.",
    tags: ["parallelogramme", "diagonale", "perimetre", "template"],
    // Le périmètre du triangle formé par le centre et deux sommets consécutifs :
    // il faut prendre la MOITIÉ de chaque diagonale.
    generate: () => {
      const n = tirerNom();
      const N = n.nom;
      const O = n.O;
      const ctx = randomChoice(CTX_PARA.filter((c) => c.u === "cm"));
      const p = 2 * randomInt(3, 12);
      let q = 2 * randomInt(3, 12);
      if (q === p) q += 2;
      const [oa, ob] = [p / 2, q / 2];
      const cote = randomInt(Math.abs(oa - ob) + 1, oa + ob - 1);
      const tri = randomChoice([
        { s: "AB", t: `${O}${n.A}${n.B}` },
        { s: "CD", t: `${O}${n.C}${n.D}` },
      ]);
      const rep = oa + ob + cote;
      const tt = randomInt(0, 2);
      const text =
        tt === 0
          ? `${ctx.intro(N)} Ses diagonales se coupent en ${O}, avec ${sg(n, "AC")} = ${p} cm et ${sg(n, "BD")} = ${q} cm. Sachant que ${sg(n, tri.s)} = ${cote} cm, calcule le périmètre du triangle ${tri.t}.`
          : tt === 1
            ? `Dans le parallélogramme ${N} de centre ${O}, on a ${sg(n, "AC")} = ${p} cm, ${sg(n, "BD")} = ${q} cm et ${sg(n, tri.s)} = ${cote} cm. Quel est le périmètre du triangle ${tri.t} ?`
            : `Les diagonales [${sg(n, "AC")}] et [${sg(n, "BD")}] du parallélogramme ${N} mesurent ${p} cm et ${q} cm et se coupent en ${O}. Le côté [${sg(n, tri.s)}] mesure ${cote} cm. Combien mesure le tour du triangle ${tri.t} ?`;
      return {
        text,
        format: "short",
        expected: [`${rep} cm`],
        comparator: "number_equal",
        explanation:
          DEF +
          `Méthode : les diagonales se coupent en leur milieu ${O}, donc chaque côté du triangle issu de ${O} est la moitié d'une diagonale.\n\n` +
          `Calcul : ${p} ÷ 2 = ${oa} et ${q} ÷ 2 = ${ob}, puis ${oa} + ${ob} + ${cote} = ${rep}.\n\n` +
          `Conclusion : le périmètre du triangle ${tri.t} est ${rep} cm.`,
        canvas: figure(n, "para", { diagonales: true, cotes: { AC: `${p} cm`, BD: `${q} cm`, [tri.s]: `${cote} cm` } }),
      };
    },
  },
  {
    kind: "template",
    id: "quadrilatere_parallelogramme_diagonale_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_diagonale",
    difficulty: 4,
    theme: "neutral",
    hint: "Diagonales de même longueur : rectangle. Diagonales perpendiculaires : losange. Les deux : carré.",
    tags: ["parallelogramme", "diagonale", "cas_particuliers", "template"],
    generate: () => {
      const n = tirerNom();
      const N = n.nom;
      const O = n.O;
      const egales = randomChoice([true, false]);
      const perp = randomChoice([true, false]);
      const rep = egales && perp ? "un carré" : egales ? "un rectangle" : perp ? "un losange" : "un parallélogramme, sans plus de précision";
      const x = randomInt(3, 12);
      let y = egales ? x : randomInt(3, 12);
      if (!egales && y === x) y = x + 2;
      const prenom = randomChoice(PRENOMS);
      const t = randomInt(0, 3);
      let text: string;
      if (t === 0) {
        const props = ["se coupent en leur milieu"];
        if (egales) props.push("ont la même longueur");
        if (perp) props.push("sont perpendiculaires");
        const liste = props.length === 1 ? props[0] : props.slice(0, -1).join(", ") + " et " + props[props.length - 1];
        text = `Les diagonales [${sg(n, "AC")}] et [${sg(n, "BD")}] du quadrilatère ${N} ${liste}. Quelle est la nature la plus précise de ${N} ?`;
      } else if (t === 1) {
        text = `Dans le quadrilatère ${N}, les diagonales se coupent en ${O} avec ${O}${n.A} = ${O}${n.C} = ${x} cm et ${O}${n.B} = ${O}${n.D} = ${y} cm${perp ? ` ; de plus, (${sg(n, "AC")}) et (${sg(n, "BD")}) sont perpendiculaires` : ""}. Quelle est la nature la plus précise de ${N} ?`;
      } else if (t === 2) {
        const baguettes = egales ? `deux baguettes de ${2 * x} cm` : `une baguette de ${2 * x} cm et une baguette de ${2 * y} cm`;
        text = `Pour fabriquer un cerf-volant, ${prenom} croise ${baguettes} en leur milieu${perp ? ", à angle droit" : ""}, puis tend une ficelle entre leurs extrémités : on obtient le quadrilatère ${N}. Quelle est sa nature la plus précise ?`;
      } else {
        text = `${N} est un quadrilatère dont les diagonales mesurent ${sg(n, "AC")} = ${2 * x} cm et ${sg(n, "BD")} = ${2 * y} cm et ont le même milieu ${O}${perp ? " ; elles sont perpendiculaires" : ""}. Que peut-on dire de ${N}, le plus précisément possible ?`;
      }
      return {
        text,
        format: "qcm",
        choices: ["un parallélogramme, sans plus de précision", "un rectangle", "un losange", "un carré"],
        expected: [rep],
        comparator: "mcq_exact",
        explanation:
          "Définition : un quadrilatère dont les diagonales se coupent en leur milieu est un parallélogramme.\n\n" +
          "Méthode : si, en plus, les diagonales ont la même longueur, c'est un rectangle ; si elles sont perpendiculaires, c'est un losange ; les deux à la fois, c'est un carré.\n\n" +
          `Ici : diagonales de même milieu, ${egales ? "de même longueur" : "de longueurs différentes"}, ${perp ? "perpendiculaires" : "non codées perpendiculaires"}.\n\n` +
          `Conclusion : ${N} est ${rep}.`,
      };
    },
  },
    {
    kind: "fixed",
    id: "quadrilatere_parallelogramme_diagonale_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_diagonale",
    difficulty: 3,
    theme: "neutral",
    // ⛔ 08/10/2026 : question ouverte à mots-clés → QCM sur les mêmes pièges.
    text: "Que signifie : « les diagonales d’un parallélogramme se coupent en leur milieu » ?",
    format: "qcm",
    choices: [
      "leur point commun partage chacune des deux diagonales en deux moitiés égales",
      "le point commun est le milieu d’une seule des deux diagonales",
      "les deux diagonales ont la même longueur",
      "les deux diagonales sont perpendiculaires",
    ],
    expected: ["leur point commun partage chacune des deux diagonales en deux moitiés égales"],
    comparator: "mcq_exact",
    hint: "Chaque diagonale est partagée en deux morceaux égaux.",
    explanation:
      "Définition : un parallélogramme est un quadrilatère dont les côtés opposés sont parallèles deux à deux.\n\n" +
          "Méthode : on utilise la propriété du parallélogramme qui correspond aux données de l’énoncé.\n\nCalcul : " +
          ("Cela signifie que le point d’intersection partage chaque diagonale en deux segments de même longueur.") +
          "\n\nConclusion : la propriété choisie permet de conclure sur la figure.",
    tags: ["parallelogramme", "diagonale", "open"],
  },

  // =========================
  // PARA_MONTRER
  // =========================
  {
    kind: "fixed",
    id: "quadrilatere_parallelogramme_montrer_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_montrer",
    difficulty: 3,
    theme: "neutral",
    text: "Si les diagonales d’un quadrilatère se coupent en leur milieu, alors ce quadrilatère est…",
    format: "qcm",
    choices: ["un triangle", "un cercle", "un parallélogramme", "un hexagone"],
    expected: ["un parallélogramme"],
    comparator: "mcq_exact",
    hint: "C’est une condition caractéristique du parallélogramme.",
    explanation:
      "Définition : un parallélogramme est un quadrilatère dont les côtés opposés sont parallèles deux à deux.\n\n" +
          "Méthode : on utilise la propriété du parallélogramme qui correspond aux données de l’énoncé.\n\nCalcul : " +
          ("Si les diagonales d’un quadrilatère se coupent en leur milieu, alors ce quadrilatère est un parallélogramme.") +
          "\n\nConclusion : la propriété choisie permet de conclure sur la figure.",
    tags: ["parallelogramme", "demonstration"],
  },
  {
    kind: "template",
    id: "quadrilatere_parallelogramme_montrer_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_montrer",
    difficulty: 4,
    theme: "neutral",
    hint: "Attention : un couple de côtés égaux ET parallèles suffit, mais il faut que ce soit le MÊME couple.",
    tags: ["parallelogramme", "demonstration", "piege", "template"],
    // Des données chiffrées, dont certaines ressemblent à une preuve sans en être une.
    generate: () => {
      const n = tirerNom();
      const N = n.nom;
      const O = n.O;
      const a = randomInt(4, 15);
      let b = randomInt(4, 15);
      if (b === a) b = a + 1;
      const x = randomInt(3, 9);
      let y = randomInt(3, 9);
      if (y === x) y = x + 1;
      const cas = randomChoice([
        {
          d: `${sg(n, "AB")} = ${sg(n, "CD")} = ${a} cm et (${sg(n, "AB")}) // (${sg(n, "CD")})`,
          oui: true,
          r: `le même couple de côtés opposés [${sg(n, "AB")}] et [${sg(n, "CD")}] est à la fois parallèle et de même longueur : c'est suffisant.`,
          f: figure(n, "para", { codage: false, cotes: { AB: `${a} cm`, CD: `${a} cm` } }),
        },
        {
          d: `${sg(n, "AB")} = ${sg(n, "CD")} = ${a} cm et (${sg(n, "AD")}) // (${sg(n, "BC")})`,
          oui: false,
          r: `les côtés égaux ([${sg(n, "AB")}] et [${sg(n, "CD")}]) ne sont pas ceux qui sont parallèles. Un trapèze isocèle vérifie ces deux informations sans être un parallélogramme.`,
          f: undefined,
        },
        {
          d: `${sg(n, "AB")} = ${sg(n, "CD")} = ${a} cm et ${sg(n, "BC")} = ${sg(n, "DA")} = ${b} cm`,
          oui: true,
          r: "les côtés opposés sont égaux deux à deux : c'est suffisant (pour un quadrilatère non croisé).",
          f: figure(n, "para", { codage: false, cotes: { AB: `${a} cm`, CD: `${a} cm`, BC: `${b} cm`, DA: `${b} cm` } }),
        },
        {
          d: `${sg(n, "AB")} = ${sg(n, "BC")} = ${a} cm et ${sg(n, "CD")} = ${sg(n, "DA")} = ${b} cm`,
          oui: false,
          r: `ce sont des côtés consécutifs qui sont égaux, pas des côtés opposés : ${N} peut être un cerf-volant.`,
          f: undefined,
        },
        {
          d: `${O}${n.A} = ${O}${n.C} = ${x} cm et ${O}${n.B} = ${O}${n.D} = ${y} cm, où ${O} est le point commun aux diagonales`,
          oui: true,
          r: `${O} est le milieu de [${sg(n, "AC")}] et de [${sg(n, "BD")}] : les diagonales se coupent en leur milieu, c'est suffisant.`,
          f: figure(n, "para", { codage: false, diagonales: true }),
        },
        {
          d: `les diagonales mesurent toutes les deux ${2 * x} cm`,
          oui: false,
          r: "des diagonales de même longueur ne suffisent pas : il faut qu'elles se coupent en leur milieu (un trapèze isocèle a aussi des diagonales égales).",
          f: undefined,
        },
        {
          d: `${O}${n.A} = ${O}${n.C} = ${x} cm, mais ${O}${n.B} = ${x + y} cm et ${O}${n.D} = ${y} cm, où ${O} est le point commun aux diagonales`,
          oui: false,
          r: `${O} est le milieu de [${sg(n, "AC")}] mais pas de [${sg(n, "BD")}] (${x + y} ≠ ${y}) : les diagonales ne se coupent pas en leur milieu.`,
          f: undefined,
        },
      ]);
      const qui = randomChoice([
        "Pour vérifier un pantographe",
        "Pour contrôler un cadre de fenêtre",
        "Pour vérifier la grille d'un portail",
        "En construisant une étagère",
        "Sur un plan d'architecte",
        "En traçant une figure au compas",
      ]);
      const t = randomInt(0, 3);
      const text =
        t === 0
          ? `Dans le quadrilatère ${N}, on sait que ${cas.d}. Peut-on conclure que ${N} est un parallélogramme ?`
          : t === 1
            ? `${qui}, on relève dans le quadrilatère ${N} : ${cas.d}. Ces informations prouvent-elles que ${N} est un parallélogramme ?`
            : t === 2
              ? `Les informations « ${cas.d} » suffisent-elles à prouver que ${N} est un parallélogramme ?`
              : (() => {
                  const e = randomChoice(ELEVES);
                  return `${e.p} affirme : « Dans ${N}, ${cas.d}, donc ${N} est un parallélogramme. » A-t-${e.il} raison ?`;
                })();
      return {
        text,
        format: "qcm",
        choices: ["oui", "non"],
        expected: [cas.oui ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation:
          DEF +
          "Méthode : on cherche une propriété réciproque qui s'applique exactement aux données (côtés opposés parallèles, côtés opposés égaux, diagonales de même milieu, un couple de côtés parallèles et égaux).\n\n" +
          `Ici : ${cas.r}\n\n` +
          `Conclusion : ${cas.oui ? "oui, on peut conclure." : "non, on ne peut pas conclure."}`,
        ...(cas.f ? { canvas: cas.f } : {}),
      };
    },
  },
    {
    kind: "fixed",
    id: "quadrilatere_parallelogramme_montrer_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_montrer",
    difficulty: 4,
    theme: "neutral",
    // ⛔ 08/10/2026 : question ouverte à mots-clés → QCM sur les mêmes pièges.
    text: "Pour montrer qu’un quadrilatère est un parallélogramme à partir de ses diagonales, que faut-il prouver ?",
    format: "qcm",
    choices: [
      "que ses diagonales ont le même milieu",
      "que ses diagonales ont la même longueur",
      "que ses diagonales sont perpendiculaires",
      "que leur point commun est le milieu de l’une d’elles",
    ],
    expected: ["que ses diagonales ont le même milieu"],
    comparator: "mcq_exact",
    hint: "Cherche la propriété réciproque avec les diagonales.",
    explanation:
      "Définition : un parallélogramme est un quadrilatère dont les côtés opposés sont parallèles deux à deux.\n\n" +
          "Méthode : on utilise la propriété du parallélogramme qui correspond aux données de l’énoncé.\n\nCalcul : " +
          ("Si les diagonales d’un quadrilatère se coupent en leur milieu, alors ce quadrilatère est un parallélogramme.") +
          "\n\nConclusion : la propriété choisie permet de conclure sur la figure.",
    tags: ["parallelogramme", "demonstration", "open"],
  },

  // =========================
  // PARA_AIRE
  // =========================
  {
    kind: "fixed",
    id: "quadrilatere_parallelogramme_aire_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_aire",
    difficulty: 2,
    theme: "neutral",
    text: "Un parallélogramme a une aire de 42 cm² et une base de 7 cm. Quelle est sa hauteur, en cm ?",
    format: "short",
    expected: ["6 cm"],
    comparator: "number_equal",
    hint: "Si base × hauteur = aire, alors hauteur = aire ÷ base.",
    explanation: "Définition : un parallélogramme est un quadrilatère dont les côtés opposés sont parallèles deux à deux.\n\n" +
          "Méthode : on utilise la propriété du parallélogramme qui correspond aux données de l’énoncé.\n\nCalcul : " +
          ("L’aire vaut base × hauteur. On remonte donc par la division : 42 ÷ 7 = 6. La hauteur mesure 6 cm.") +
          "\n\nConclusion : la propriété choisie permet de conclure sur la figure.",
    tags: ["parallelogramme", "aire"],
  },
  {
    kind: "template",
    id: "quadrilatere_parallelogramme_aire_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_aire",
    difficulty: 3,
    theme: "neutral",
    hint: "On utilise la base et la hauteur, pas le côté incliné.",
    tags: ["parallelogramme", "aire", "template"],
    generate: () => {
      const n = tirerNom();
      const N = n.nom;
      const ctx = randomChoice(CTX_PARA);
      const base = randomInt(ctx.min, ctx.max);
      const height = randomInt(Math.max(2, Math.floor(ctx.min / 2)), Math.max(3, Math.floor(ctx.max * 0.7)));
      const area = base * height;
      const uu = `${ctx.u}²`;
      const t = randomInt(0, 3);
      const text =
        t === 0
          ? `${ctx.intro(N)} Sa base [${sg(n, "AB")}] mesure ${fr(base)} ${ctx.u} et la hauteur associée ${fr(height)} ${ctx.u}. Quelle est son aire, en ${uu} ?`
          : t === 1
            ? `${ctx.intro(N)} Calcule son aire, sachant que ${sg(n, "AB")} = ${fr(base)} ${ctx.u} et que la hauteur relative à [${sg(n, "AB")}] mesure ${fr(height)} ${ctx.u}.`
            : t === 2
              ? `${ctx.intro(N)} La distance entre les droites (${sg(n, "AB")}) et (${sg(n, "CD")}) est de ${fr(height)} ${ctx.u}, et ${sg(n, "AB")} = ${fr(base)} ${ctx.u}. Quelle surface occupe ${N} ?`
              : `${ctx.intro(N)} Avec une base de ${fr(base)} ${ctx.u} et une hauteur de ${fr(height)} ${ctx.u}, quelle est l'aire de ${N}, en ${uu} ?`;
      return {
        text,
        format: "short",
        expected: [`${area} ${uu}`],
        comparator: "number_equal",
        explanation:
          "Définition : l'aire d'un parallélogramme est base × hauteur, la hauteur étant perpendiculaire à la base.\n\n" +
          "Méthode : on multiplie la base par la hauteur qui lui est associée.\n\n" +
          `Calcul : ${fr(base)} × ${fr(height)} = ${fr(area)}.\n\n` +
          `Conclusion : l'aire de ${N} est ${fr(area)} ${uu}.`,
        canvas: figure(n, "para", { cotes: { AB: `${base} ${ctx.u}` }, hauteur: `${height} ${ctx.u}` }),
      };
    },
  },
  {
    kind: "template",
    id: "quadrilatere_parallelogramme_aire_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_aire",
    difficulty: 4,
    theme: "neutral",
    hint: "Le côté incliné n’est pas la hauteur.",
    tags: ["parallelogramme", "aire", "piege", "template"],
    generate: () => {
      const n = tirerNom();
      const N = n.nom;
      const base = randomInt(6, 15);
      const height = randomInt(3, 8);
      const side = height + randomInt(1, 4);
      const juste = Math.random() < 0.35;
      const annonce = juste ? base * height : base * side;
      const e = randomChoice(ELEVES);
      const t = randomInt(0, 3);
      const donnees = `${sg(n, "AB")} = ${base} cm, ${sg(n, "AD")} = ${side} cm et la hauteur ${n.D}${n.H} relative à [${sg(n, "AB")}] mesure ${height} cm`;
      const text =
        t === 0
          ? `Dans le parallélogramme ${N}, ${donnees}. ${e.p} affirme que l'aire de ${N} vaut ${annonce} cm². A-t-${e.il} raison ?`
          : t === 1
            ? `${e.p} doit calculer l'aire du parallélogramme ${N}, où ${donnees}. ${e.il === "il" ? "Il" : "Elle"} trouve ${annonce} cm². Ce résultat est-il juste ?`
            : t === 2
              ? `Vrai ou faux : si ${donnees}, alors l'aire du parallélogramme ${N} est ${annonce} cm².`
              : `On découpe dans du tissu un parallélogramme ${N} tel que ${donnees}. Le patron indique ${annonce} cm² de tissu. Est-ce exact ?`;
      const vf = t === 2;
      return {
        text,
        format: "qcm",
        choices: vf ? ["vrai", "faux"] : ["oui", "non"],
        expected: [vf ? (juste ? "vrai" : "faux") : juste ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation:
          "Définition : l'aire d'un parallélogramme est base × hauteur, la hauteur étant perpendiculaire à la base.\n\n" +
          `Méthode : on prend la base [${sg(n, "AB")}] et la hauteur ${n.D}${n.H}, pas le côté incliné [${sg(n, "AD")}].\n\n` +
          `Calcul : ${base} × ${height} = ${base * height}.${juste ? "" : ` Le résultat ${annonce} vient de ${base} × ${side} : on a pris le côté incliné.`}\n\n` +
          `Conclusion : l'aire est ${base * height} cm², donc ${juste ? "le résultat annoncé est juste" : "le résultat annoncé est faux"}.`,
        canvas: figure(n, "para", { cotes: { AB: `${base} cm`, DA: `${side} cm` }, hauteur: `${height} cm` }),
      };
    },
  },
    {
    kind: "fixed",
    id: "quadrilatere_parallelogramme_aire_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_aire",
    difficulty: 3,
    theme: "neutral",
    // ⛔ 08/10/2026 : question ouverte à mots-clés (« oui » ou « non » passaient : « non » contient… « même ») → QCM.
    text: "Deux parallélogrammes ont la même base et la même hauteur, mais l’un est beaucoup plus penché que l’autre. Ont-ils la même aire ?",
    format: "qcm",
    choices: [
      "oui : l’aire ne dépend que de la base et de la hauteur",
      "non : le plus penché a la plus grande aire, car son côté incliné est plus long",
      "non : le plus penché a la plus petite aire",
      "on ne peut pas savoir sans la longueur des côtés inclinés",
    ],
    expected: ["oui : l’aire ne dépend que de la base et de la hauteur"],
    comparator: "mcq_exact",
    hint: "Quels sont les deux nombres qui entrent dans le calcul de l’aire ?",
    explanation:
      "Définition : un parallélogramme est un quadrilatère dont les côtés opposés sont parallèles deux à deux.\n\n" +
          "Méthode : on utilise la propriété du parallélogramme qui correspond aux données de l’énoncé.\n\nCalcul : " +
          ("Oui, ils ont la même aire. Seules la base et la hauteur entrent dans le calcul : l’inclinaison n’y figure pas. Pencher un parallélogramme allonge son côté incliné, mais ne change ni sa base ni sa hauteur — donc ni son aire.") +
          "\n\nConclusion : la propriété choisie permet de conclure sur la figure.",
    tags: ["parallelogramme", "aire", "open", "erreur"],
  },

  // =========================
  // PARA_PROBLEME
  // =========================
  {
    kind: "template",
    id: "quadrilatere_parallelogramme_probleme_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_probleme",
    difficulty: 4,
    theme: "neutral",
    hint: "Calcule d'abord la surface (base × hauteur), puis le coût ou le nombre de sacs.",
    tags: ["parallelogramme", "probleme", "aire", "template"],
    generate: () => {
      const n = tirerNom();
      const N = n.nom;
      const ter = randomChoice(TERRAINS.filter((x) => x.bmax <= 60));
      const base = randomInt(ter.bmin, ter.bmax);
      const height = randomInt(ter.hmin, ter.hmax);
      const area = base * height;
      const achat = randomChoice([
        { avec: "du gazon en rouleaux", de: "gazon en rouleaux vendu", prix: randomChoice([3, 4, 5, 6]) },
        { avec: "des dalles", de: "dalles vendues", prix: randomChoice([15, 20, 25, 30]) },
        { avec: "du paillage", de: "paillage vendu", prix: randomChoice([2, 4, 5]) },
        { avec: "du gravier", de: "gravier vendu", prix: randomChoice([6, 8, 10]) },
        { avec: "des copeaux de bois", de: "copeaux de bois vendus", prix: randomChoice([3, 4, 7]) },
      ]);
      const cout = area * achat.prix;
      const t = randomInt(0, 2);
      const text =
        t === 0
          ? `${ter.intro(N)} Sa base mesure ${base} m et la hauteur associée ${height} m. On veut couvrir entièrement ${N} avec ${achat.avec} à ${achat.prix} € le m². Combien cela coûtera-t-il, en euros ?`
          : t === 1
            ? `${ter.intro(N)} On a ${sg(n, "AB")} = ${base} m et une hauteur relative à [${sg(n, "AB")}] de ${height} m. Quel est le prix, en euros, pour couvrir ${N} de ${achat.de} ${achat.prix} € le m² ?`
            : `${ter.intro(N)} Avec ${achat.avec} à ${achat.prix} € le m², quelle somme faut-il prévoir pour tout couvrir, sachant que sa base mesure ${base} m et sa hauteur ${height} m ?`;
      return {
        text,
        format: "short",
        expected: [`${cout} €`],
        comparator: "number_equal",
        explanation:
          "Définition : la surface d'un parallélogramme est base × hauteur.\n\n" +
          "Méthode : on calcule la surface, puis on la multiplie par le prix d'un mètre carré.\n\n" +
          `Calcul : ${base} × ${height} = ${fr(area)} m², puis ${fr(area)} × ${achat.prix} = ${fr(cout)} €.\n\n` +
          `Conclusion : cela coûtera ${fr(cout)} €.`,
      };
    },
  },

  // =========================
  // PARA_DEFIS
  // =========================
  {
    kind: "template",
    id: "quadrilatere_parallelogramme_defi_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Un cas particulier a TOUTES les propriétés de la famille plus large, pas l'inverse.",
    tags: ["parallelogramme", "defi", "hpi", "template"],
    generate: () => {
      // Paires (petit, grand) : tout « petit » est un « grand », pas l'inverse ;
      // rectangle / losange : aucune inclusion.
      const paire = randomChoice([
        { p: "rectangle", g: "parallélogramme", inc: true },
        { p: "losange", g: "parallélogramme", inc: true },
        { p: "carré", g: "rectangle", inc: true },
        { p: "carré", g: "losange", inc: true },
        { p: "carré", g: "parallélogramme", inc: true },
        { p: "rectangle", g: "losange", inc: false },
      ]);
      const inverse = Math.random() < 0.5;
      const [X, Y] = inverse ? [paire.g, paire.p] : [paire.p, paire.g];
      // Réponse à « un X est-il toujours un Y ? » puis « un Y est-il toujours un X ? »
      const r1 = paire.inc ? !inverse : false;
      const r2 = paire.inc ? inverse : false;
      const rep = `${r1 ? "oui" : "non"} / ${r2 ? "oui" : "non"}`;
      const n = tirerNom();
      const t = randomInt(0, 2);
      const text =
        t === 0
          ? `Un ${X} est-il toujours un ${Y} ? Et un ${Y} est-il toujours un ${X} ?`
          : t === 1
            ? `Première question : si ${n.nom} est un ${X}, est-ce forcément un ${Y} ? Deuxième question : si ${n.nom} est un ${Y}, est-ce forcément un ${X} ?`
            : `Réponds dans l'ordre. « Tout ${X} est un ${Y} » : oui ou non ? « Tout ${Y} est un ${X} » : oui ou non ?`;
      const raisons: Record<string, string> = {
        "rectangle/parallélogramme": "un rectangle a ses côtés opposés parallèles, mais un parallélogramme n'a pas forcément d'angle droit",
        "losange/parallélogramme": "un losange a ses côtés opposés parallèles, mais un parallélogramme n'a pas forcément quatre côtés égaux",
        "carré/rectangle": "un carré a quatre angles droits, mais un rectangle n'a pas forcément quatre côtés égaux",
        "carré/losange": "un carré a quatre côtés égaux, mais un losange n'a pas forcément d'angle droit",
        "carré/parallélogramme": "un carré a ses côtés opposés parallèles, mais un parallélogramme n'a ni forcément d'angle droit ni forcément quatre côtés égaux",
        "rectangle/losange": "un rectangle n'a pas forcément quatre côtés égaux, et un losange n'a pas forcément d'angle droit",
      };
      return {
        text,
        format: "qcm",
        choices: ["oui / oui", "oui / non", "non / oui", "non / non"],
        expected: [rep],
        comparator: "mcq_exact",
        explanation:
          DEF +
          "Méthode : un cas particulier possède toutes les propriétés de la famille plus large ; l'inverse est faux en général.\n\n" +
          `Ici : ${raisons[`${paire.p}/${paire.g}`]}.\n\n` +
          `Conclusion : la réponse est « ${rep} ».`,
      };
    },
  },
  {
    kind: "template",
    id: "quadrilatere_parallelogramme_defi_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Plusieurs propriétés peuvent permettre de conclure.",
    tags: ["parallelogramme", "defi", "raisonnement", "template"],
    generate: () => {
      const n = tirerNom();
      const N = n.nom;
      const O = n.O;
      const property = randomChoice(["cotes_paralleles", "cotes_egaux", "diagonales"] as const);
      const qui = randomChoice([
        "Un menuisier assemble un cadre",
        "Une élève construit au compas un quadrilatère",
        "Un ingénieur conçoit les barres d'un pantographe",
        "Une architecte dessine une fenêtre",
        "Un serrurier fabrique un élément de portail",
        "Une couturière découpe une pièce de tissu",
      ]);
      const data =
        property === "cotes_paralleles"
          ? { d: `(${sg(n, "AB")}) // (${sg(n, "CD")}) et (${sg(n, "AD")}) // (${sg(n, "BC")})`, k: ["parallèles", "parallélogramme"], e: `Ses côtés opposés sont parallèles deux à deux : c'est exactement la définition du parallélogramme.` }
          : property === "cotes_egaux"
            ? { d: `${sg(n, "AB")} = ${sg(n, "CD")} et ${sg(n, "AD")} = ${sg(n, "BC")}`, k: ["opposés", "parallélogramme"], e: `Un quadrilatère (non croisé) dont les côtés opposés sont égaux deux à deux est un parallélogramme.` }
            : { d: `${O} est à la fois le milieu de [${sg(n, "AC")}] et de [${sg(n, "BD")}]`, k: ["milieu", "parallélogramme"], e: `Les diagonales [${sg(n, "AC")}] et [${sg(n, "BD")}] se coupent en leur milieu ${O} : ${N} est donc un parallélogramme.` };
      // ⛔ 08/10/2026 : c'était une question OUVERTE validée par un mot-clé
      // (« parallélogramme » suffisait) → QCM : la bonne propriété contre les
      // réciproques fausses qu'on cite à sa place.
      const DEFI = "un quadrilatère dont les côtés opposés sont parallèles deux à deux est un parallélogramme (définition)";
      const LONG = "un quadrilatère non croisé dont les côtés opposés ont la même longueur deux à deux est un parallélogramme";
      const DIAG = "un quadrilatère dont les diagonales se coupent en leur milieu est un parallélogramme";
      const juste = property === "cotes_paralleles" ? DEFI : property === "cotes_egaux" ? LONG : DIAG;
      const t = randomInt(0, 2);
      const text =
        t === 0
          ? `${qui} ${N}, et l'on sait que ${data.d}. Quelle propriété justifie que ${N} est un parallélogramme ?`
          : t === 1
            ? `On sait que, dans le quadrilatère ${N}, ${data.d}. Pour justifier que ${N} est un parallélogramme, quelle phrase faut-il écrire ?`
            : `${N} est un quadrilatère où ${data.d}. Quelle propriété permet d'affirmer que c'est un parallélogramme ?`;
      return {
        text,
        format: "qcm",
        choices: [
          DEFI,
          LONG,
          DIAG,
          "un quadrilatère dont les diagonales ont la même longueur est un parallélogramme",
          "un quadrilatère qui a deux côtés parallèles est un parallélogramme",
        ].filter((c, i) => c === juste || i >= 3 || Math.random() < 0.5).slice(0, 4),
        expected: [juste],
        comparator: "mcq_exact",
        explanation:
          DEF +
          "Méthode : on cite la propriété (définition ou réciproque) qui correspond exactement aux données.\n\n" +
          `Ici : ${minus(data.e)}\n\n` +
          `Conclusion : ${N} est un parallélogramme.`,
      };
    },
  },
  {
    kind: "template",
    id: "quadrilatere_parallelogramme_defi_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Même aire : calcule l'aire du premier, puis divise par la base du second.",
    tags: ["parallelogramme", "defi", "aire", "template"],
    generate: () => {
      const [n1, n2] = deuxNoms();
      // b1 × h1 = b2 × h2 avec des entiers : b1 = h2 × k, b2 = h1 × k.
      let h1 = 0, h2 = 0, k = 0, b1 = 0, b2 = 0;
      do {
        h1 = randomInt(3, 9);
        h2 = randomInt(3, 9);
        k = randomInt(2, 3);
        b1 = h2 * k;
        b2 = h1 * k;
      } while (h1 === h2);
      const area = b1 * h1;
      const ctx = randomChoice([
        "deux motifs de tissu",
        "deux tuiles de mosaïque",
        "deux pièces de vitrail",
        "deux autocollants",
        "deux plaques de bois",
        "deux logos",
      ]);
      const t = randomInt(0, 2);
      const text =
        t === 0
          ? `Les parallélogrammes ${n1.nom} et ${n2.nom} ont la même aire. ${n1.nom} a une base de ${b1} cm et une hauteur de ${h1} cm ; ${n2.nom} a une base de ${b2} cm. Quelle est la hauteur de ${n2.nom}, en cm ?`
          : t === 1
            ? `Un fabricant veut ${ctx} de même aire, en forme de parallélogrammes ${n1.nom} et ${n2.nom}. ${n1.nom} : base ${b1} cm, hauteur ${h1} cm. ${n2.nom} : base ${b2} cm. Quelle hauteur doit avoir ${n2.nom} ?`
            : `On veut construire un parallélogramme ${n2.nom} de base ${b2} cm ayant exactement la même aire que le parallélogramme ${n1.nom}, de base ${b1} cm et de hauteur ${h1} cm. Combien doit mesurer la hauteur de ${n2.nom} ?`;
      return {
        text,
        format: "short",
        expected: [`${h2} cm`],
        comparator: "number_equal",
        explanation:
          "Définition : l'aire d'un parallélogramme est base × hauteur.\n\n" +
          `Méthode : on calcule l'aire de ${n1.nom}, puis on divise par la base de ${n2.nom}.\n\n` +
          `Calcul : ${b1} × ${h1} = ${area}, puis ${area} ÷ ${b2} = ${h2}.\n\n` +
          `Conclusion : la hauteur de ${n2.nom} mesure ${h2} cm. Deux parallélogrammes différents peuvent donc avoir la même aire.`,
      };
    },
  },

  /* =========================================================
     COMPLÉMENTS (top-up ~10 items / microSkill)
  ========================================================= */

  // ---------- PARA_RECONNAITRE ----------
  {
    kind: "fixed",
    id: "quadrilatere_parallelogramme_reconnaitre_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    text: "Un parallélogramme possède…",
    format: "qcm",
    choices: [
      "deux paires de côtés parallèles",
      "une seule paire de côtés parallèles",
      "aucun côté parallèle",
      "quatre angles droits",
    ],
    expected: ["deux paires de côtés parallèles"],
    comparator: "mcq_exact",
    hint: "Pense au nombre de couples de côtés parallèles.",
    explanation:
      "Définition : un parallélogramme est un quadrilatère dont les côtés opposés sont parallèles deux à deux.\n\n" +
      "Méthode : on compte les couples de côtés parallèles.\n\n" +
      "Calcul : il y a deux paires de côtés opposés, chacune parallèle.\n\n" +
      "Conclusion : un parallélogramme possède deux paires de côtés parallèles.",
    tags: ["parallelogramme", "definition", "qcm"],
  },
  {
    kind: "fixed",
    id: "quadrilatere_parallelogramme_reconnaitre_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Parmi ces quadrilatères, lequel n’est PAS toujours un parallélogramme ?",
    format: "qcm",
    choices: ["un trapèze quelconque", "un rectangle", "un losange", "un carré"],
    expected: ["un trapèze quelconque"],
    comparator: "mcq_exact",
    hint: "Un parallélogramme a deux paires de côtés parallèles.",
    explanation:
      "Définition : un parallélogramme est un quadrilatère dont les côtés opposés sont parallèles deux à deux.\n\n" +
      "Méthode : on vérifie si chaque figure a bien deux paires de côtés parallèles.\n\n" +
      "Calcul : rectangle, losange et carré sont des parallélogrammes particuliers ; un trapèze quelconque n’a qu’une seule paire de côtés parallèles.\n\n" +
      "Conclusion : le trapèze quelconque n’est pas toujours un parallélogramme.",
    tags: ["parallelogramme", "definition", "qcm"],
  },
  {
    kind: "fixed",
    id: "quadrilatere_parallelogramme_reconnaitre_fixed_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Un losange a ses quatre côtés de même longueur. Est-il un parallélogramme ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Regarde si ses côtés opposés sont parallèles.",
    explanation:
      "Définition : un parallélogramme est un quadrilatère dont les côtés opposés sont parallèles deux à deux.\n\n" +
      "Méthode : on vérifie que le losange a ses côtés opposés parallèles.\n\n" +
      "Calcul : un losange a ses côtés opposés parallèles deux à deux.\n\n" +
      "Conclusion : oui, un losange est un parallélogramme particulier.",
    tags: ["parallelogramme", "losange", "qcm"],
  },
  {
    kind: "fixed",
    id: "quadrilatere_parallelogramme_reconnaitre_fixed_6",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle est la définition d’un parallélogramme ?",
    format: "qcm",
    choices: [
      "un quadrilatère dont les côtés opposés sont parallèles deux à deux",
      "un quadrilatère dont les quatre côtés sont égaux",
      "un quadrilatère qui a quatre angles droits",
      "un quadrilatère avec une seule paire de côtés parallèles",
    ],
    expected: [
      "un quadrilatère dont les côtés opposés sont parallèles deux à deux",
    ],
    comparator: "mcq_exact",
    hint: "C’est la définition, pas une propriété particulière.",
    explanation:
      "Définition : un parallélogramme est un quadrilatère dont les côtés opposés sont parallèles deux à deux.\n\n" +
      "Méthode : on distingue la définition des propriétés des cas particuliers.\n\n" +
      "Calcul : avoir quatre côtés égaux ou quatre angles droits décrit des cas particuliers, pas la définition.\n\n" +
      "Conclusion : la définition est : côtés opposés parallèles deux à deux.",
    tags: ["parallelogramme", "definition", "qcm"],
  },
  {
    kind: "template",
    id: "quadrilatere_parallelogramme_reconnaitre_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    hint: "Rectangle, losange et carré sont des parallélogrammes particuliers ; un trapèze n'a qu'une paire de côtés parallèles.",
    tags: ["parallelogramme", "cas_particuliers", "canvas", "template"],
    // Des objets de tous les jours : porte de garage, cerf-volant en losange,
    // case d'échiquier, abat-jour…
    generate: () => {
      const n = tirerNom();
      const N = n.nom;
      const o = randomChoice(OBJETS_SPECIAUX);
      const oui = o.f !== "trapèze";
      const precision = o.f === "trapèze" ? ` dont seuls les côtés [${sg(n, "AB")}] et [${sg(n, "CD")}] sont parallèles` : "";
      const t = randomInt(0, 3);
      const text =
        t === 0
          ? `${o.gn} a la forme d'un ${o.f} ${N}${precision}. Ce ${o.f} est-il aussi un parallélogramme ?`
          : t === 1
            ? `On modélise ${minus(o.gn)} par un ${o.f} ${N}${precision}. ${N} est-il un parallélogramme ?`
            : t === 2
              ? `Vrai ou faux ? « ${o.gn} a la forme d'un ${o.f} ${N}${precision} ; donc ${N} est un parallélogramme. »`
              : `${N} est un ${o.f}${precision}, comme ${minus(o.gn)}. Peut-on affirmer que ${N} est un parallélogramme ?`;
      const vf = t === 2;
      const raison: Record<Famille, string> = {
        rectangle: "un rectangle a ses côtés opposés parallèles deux à deux : c'est un parallélogramme particulier (avec quatre angles droits).",
        losange: "un losange a ses côtés opposés parallèles deux à deux : c'est un parallélogramme particulier (avec quatre côtés égaux).",
        "carré": "un carré a ses côtés opposés parallèles deux à deux : c'est un parallélogramme particulier (à la fois rectangle et losange).",
        "trapèze": `seuls [${sg(n, "AB")}] et [${sg(n, "CD")}] sont parallèles : il manque la deuxième paire de côtés parallèles.`,
      };
      return {
        text,
        format: "qcm",
        choices: vf ? ["vrai", "faux"] : ["oui", "non"],
        expected: [vf ? (oui ? "vrai" : "faux") : oui ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation:
          DEF +
          "Méthode : on vérifie si la figure a ses deux paires de côtés opposés parallèles.\n\n" +
          `Ici : ${raison[o.f]}\n\n` +
          `Conclusion : ${oui ? `${N} est un parallélogramme.` : `${N} n'est pas un parallélogramme.`}`,
        canvas: figure(n, FORME_DE[o.f]),
      };
    },
  },
  {
    kind: "template",
    id: "quadrilatere_parallelogramme_reconnaitre_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche si la propriété est vraie pour absolument tous les parallélogrammes.",
    tags: ["parallelogramme", "propriete", "template"],
    generate: () => {
      const n = tirerNom();
      const N = n.nom;
      const vraies = [
        `les côtés [${sg(n, "AB")}] et [${sg(n, "CD")}] ont la même longueur`,
        `les côtés [${sg(n, "BC")}] et [${sg(n, "DA")}] ont la même longueur`,
        `les droites (${sg(n, "AD")}) et (${sg(n, "BC")}) sont parallèles`,
        `les diagonales [${sg(n, "AC")}] et [${sg(n, "BD")}] se coupent en leur milieu`,
        `les angles en ${n.A} et en ${n.C} ont la même mesure`,
        `les angles en ${n.B} et en ${n.D} ont la même mesure`,
        `les angles en ${n.A} et en ${n.B} ont pour somme 180°`,
      ];
      const fausses = [
        { p: `les diagonales [${sg(n, "AC")}] et [${sg(n, "BD")}] sont perpendiculaires`, cas: "un losange" },
        { p: `les diagonales [${sg(n, "AC")}] et [${sg(n, "BD")}] ont la même longueur`, cas: "un rectangle" },
        { p: `l'angle en ${n.A} est droit`, cas: "un rectangle" },
        { p: `les côtés [${sg(n, "AB")}] et [${sg(n, "BC")}] ont la même longueur`, cas: "un losange" },
        { p: `les angles en ${n.A} et en ${n.B} ont la même mesure`, cas: "un rectangle" },
        { p: `la diagonale [${sg(n, "AC")}] partage l'angle en ${n.A} en deux angles égaux`, cas: "un losange" },
      ];
      const vraie = Math.random() < 0.5;
      const f = randomChoice(fausses);
      const prop = vraie ? randomChoice(vraies) : f.p;
      const ctx = randomChoice(CTX_PARA);
      const t = randomInt(0, 3);
      const vf = t === 1;
      const text =
        t === 0
          ? `${N} est un parallélogramme. Est-on sûr que ${prop} ?`
          : t === 1
            ? `Vrai ou faux : dans n'importe quel parallélogramme ${N}, ${prop}.`
            : t === 2
              ? `On ne sait rien d'autre sur le parallélogramme ${N}. Peut-on affirmer que ${prop} ?`
              : `${ctx.intro(N)} Sans autre information, est-il forcément vrai que ${prop} ?`;
      return {
        text,
        format: "qcm",
        choices: vf ? ["vrai", "faux"] : ["oui", "non"],
        expected: [vf ? (vraie ? "vrai" : "faux") : vraie ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation:
          "Définition : un parallélogramme a ses côtés opposés parallèles et de même longueur, ses angles opposés égaux, ses angles consécutifs de somme 180°, et ses diagonales se coupent en leur milieu.\n\n" +
          "Méthode : on distingue les propriétés de TOUS les parallélogrammes de celles des cas particuliers.\n\n" +
          (vraie
            ? `Ici : « ${prop} » est une propriété de tout parallélogramme.\n\n`
            : `Ici : « ${prop} » n'est vrai que dans certains cas particuliers, par exemple si ${N} est ${f.cas}.\n\n`) +
          `Conclusion : ${vraie ? "c'est toujours vrai." : "ce n'est pas toujours vrai."}`,
        canvas: figure(n, "para", { diagonales: prop.includes("diagonale") }),
      };
    },
  },
  {
    kind: "template",
    id: "quadrilatere_parallelogramme_reconnaitre_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    hint: "Compte les paires de côtés opposés parallèles : il en faut deux.",
    tags: ["parallelogramme", "definition", "template"],
    generate: () => {
      const n = tirerNom();
      const N = n.nom;
      const deux = Math.random() < 0.6;
      const d = (a: string, b: string) => `(${randomChoice([sg(n, a), sg(n, b)])})`;
      const d1 = d("AB", "BA");
      const d2 = d("CD", "DC");
      const d3 = d("AD", "DA");
      const d4 = d("BC", "CB");
      // Sans les deux paires, c'est (AB) // (CD) qui tient : la figure est un trapèze.
      const [pA, pB] = deux && Math.random() < 0.5 ? [[d3, d4], [d1, d2]] : [[d1, d2], [d3, d4]];
      const t = randomInt(0, 3);
      const text =
        t === 0
          ? `Dans le quadrilatère ${N}, les droites ${pA[0]} et ${pA[1]} sont parallèles${deux ? `, ainsi que les droites ${pB[0]} et ${pB[1]}` : `, mais les droites ${pB[0]} et ${pB[1]} ne le sont pas`}. Quelle est la nature de ${N} ?`
          : t === 1
            ? `${N} est un quadrilatère. On sait que ${pA[0]} // ${pA[1]}${deux ? ` et que ${pB[0]} // ${pB[1]}` : ` et que ${pB[0]} et ${pB[1]} se coupent`}. Que peut-on dire de ${N} ?`
            : t === 2
              ? `${randomChoice(OBJETS_FORME)} a la forme d'un quadrilatère ${N} : ${deux ? "ses côtés opposés sont parallèles deux à deux" : `seuls ses côtés [${sg(n, "AB")}] et [${sg(n, "CD")}] sont parallèles`}. Ce quadrilatère est…`
              : `Complète : un quadrilatère ${N} dans lequel ${pA[0]} // ${pA[1]}${deux ? ` et ${pB[0]} // ${pB[1]}` : `, sans autre paire de côtés parallèles,`} est…`;
      const rep = deux ? "un parallélogramme" : "un trapèze qui n'est pas un parallélogramme";
      return {
        text,
        format: "qcm",
        choices: ["un parallélogramme", "un trapèze qui n'est pas un parallélogramme", "un triangle", "un quadrilatère sans côtés parallèles"],
        expected: [rep],
        comparator: "mcq_exact",
        explanation:
          DEF +
          "Méthode : on compte les paires de côtés opposés parallèles.\n\n" +
          (deux
            ? `Ici : (${sg(n, "AB")}) // (${sg(n, "CD")}) et (${sg(n, "AD")}) // (${sg(n, "BC")}) : les deux paires sont parallèles.\n\n`
            : `Ici : seule la paire (${sg(n, "AB")}) // (${sg(n, "CD")}) est parallèle : c'est un trapèze.\n\n`) +
          `Conclusion : ${N} est ${rep}.`,
        canvas: figure(n, deux ? "para" : "trapeze"),
      };
    },
  },

  // ---------- PARA_PROPRIETES ----------
  {
    kind: "fixed",
    id: "quadrilatere_parallelogramme_propriete_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_propriete",
    difficulty: 2,
    theme: "neutral",
    text: "Dans un parallélogramme, deux angles consécutifs sont…",
    format: "qcm",
    choices: [
      "supplémentaires (de somme 180°)",
      "égaux",
      "complémentaires (de somme 90°)",
      "tous droits",
    ],
    expected: ["supplémentaires (de somme 180°)"],
    comparator: "mcq_exact",
    hint: "Deux angles qui se suivent ont une somme particulière.",
    explanation:
      "Définition : dans un parallélogramme, les côtés opposés sont parallèles.\n\n" +
      "Méthode : deux angles consécutifs sont entre deux côtés parallèles.\n\n" +
      "Calcul : leur somme vaut 180°, ils sont donc supplémentaires.\n\n" +
      "Conclusion : deux angles consécutifs sont supplémentaires.",
    tags: ["parallelogramme", "angles", "qcm"],
  },
  {
    kind: "fixed",
    id: "quadrilatere_parallelogramme_propriete_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_propriete",
    difficulty: 2,
    theme: "neutral",
    text: "Dans un parallélogramme, les angles opposés sont…",
    format: "qcm",
    choices: ["égaux", "supplémentaires", "tous droits", "de somme 360°"],
    expected: ["égaux"],
    comparator: "mcq_exact",
    hint: "Les angles « en face » l’un de l’autre.",
    explanation:
      "Définition : dans un parallélogramme, les côtés opposés sont parallèles.\n\n" +
      "Méthode : on compare deux angles opposés.\n\n" +
      "Calcul : les angles opposés ont la même mesure.\n\n" +
      "Conclusion : les angles opposés sont égaux.",
    tags: ["parallelogramme", "angles", "qcm"],
  },
  {
    kind: "fixed",
    id: "quadrilatere_parallelogramme_propriete_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_propriete",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève affirme : « dans tout parallélogramme, les côtés opposés sont perpendiculaires ». A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Les côtés opposés sont parallèles, pas perpendiculaires.",
    explanation:
      "Définition : dans un parallélogramme, les côtés opposés sont parallèles et égaux.\n\n" +
      "Méthode : on confronte l’affirmation à la propriété.\n\n" +
      "Calcul : des côtés parallèles ne sont jamais perpendiculaires entre eux.\n\n" +
      "Conclusion : l’élève a tort, les côtés opposés sont parallèles.",
    tags: ["parallelogramme", "propriete", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "quadrilatere_parallelogramme_propriete_fixed_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_propriete",
    difficulty: 1,
    theme: "neutral",
    text: "Dans un parallélogramme, les côtés opposés ont…",
    format: "qcm",
    choices: [
      "la même longueur",
      "des longueurs toujours différentes",
      "une longueur nulle",
      "des longueurs aléatoires",
    ],
    expected: ["la même longueur"],
    comparator: "mcq_exact",
    hint: "Côtés opposés : pense à la propriété sur les longueurs.",
    explanation:
      "Définition : dans un parallélogramme, les côtés opposés sont parallèles deux à deux.\n\n" +
      "Méthode : on rappelle la propriété sur les longueurs.\n\n" +
      "Calcul : les côtés opposés sont égaux deux à deux.\n\n" +
      "Conclusion : les côtés opposés ont la même longueur.",
    tags: ["parallelogramme", "longueur", "qcm"],
  },
  {
    kind: "template",
    id: "quadrilatere_parallelogramme_propriete_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_propriete",
    difficulty: 2,
    theme: "neutral",
    hint: "Le périmètre vaut 2 × (somme de deux côtés consécutifs).",
    tags: ["parallelogramme", "perimetre", "template"],
    generate: () => {
      const n = tirerNom();
      const N = n.nom;
      const ctx = randomChoice(CTX_PARA);
      const a = randomInt(ctx.min, ctx.max);
      let b = randomInt(ctx.min, ctx.max);
      if (b === a) b = a + 1;
      const perimetre = 2 * (a + b);
      const [c1, c2] = randomChoice([
        ["AB", "BC"],
        ["BC", "CD"],
        ["CD", "DA"],
        ["DA", "AB"],
      ] as const);
      const [X, Y] = [sg(n, c1), sg(n, c2)];
      const t = randomInt(0, 3);
      const text =
        t === 0
          ? `${ctx.intro(N)} Ses côtés [${X}] et [${Y}] mesurent ${a} ${ctx.u} et ${b} ${ctx.u}. Quel est son périmètre, en ${ctx.u} ?`
          : t === 1
            ? `${ctx.intro(N)} Calcule son périmètre, sachant que ${X} = ${a} ${ctx.u} et ${Y} = ${b} ${ctx.u}.`
            : t === 2
              ? `${ctx.intro(N)} Avec ${X} = ${a} ${ctx.u} et ${Y} = ${b} ${ctx.u}, combien mesure le tour complet de ${N} ?`
              : `Le parallélogramme ${N} a deux côtés consécutifs [${X}] et [${Y}] de ${a} ${ctx.u} et ${b} ${ctx.u}. Quel est le périmètre de ${N} ?`;
      return {
        text,
        format: "short",
        expected: [`${perimetre} ${ctx.u}`],
        comparator: "number_equal",
        explanation:
          "Définition : dans un parallélogramme, les côtés opposés sont égaux deux à deux.\n\n" +
          "Méthode : le périmètre vaut deux fois la somme de deux côtés consécutifs.\n\n" +
          `Calcul : 2 × (${a} + ${b}) = 2 × ${a + b} = ${perimetre}.\n\n` +
          `Conclusion : le périmètre de ${N} est ${perimetre} ${ctx.u}.`,
        canvas: figure(n, "para", { cotes: { [c1]: `${a} ${ctx.u}`, [c2]: `${b} ${ctx.u}` } }),
      };
    },
  },
  {
    kind: "template",
    id: "quadrilatere_parallelogramme_propriete_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_propriete",
    difficulty: 3,
    theme: "neutral",
    hint: "Deux angles consécutifs ont une somme de 180° ; deux angles opposés sont égaux.",
    tags: ["parallelogramme", "angles", "template"],
    // Les angles d'objets articulés ou penchés.
    generate: () => {
      const n = tirerNom();
      const N = n.nom;
      const a = randomChoice([30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85]);
      const objet = randomChoice([
        { intro: `Les barres articulées d'un pantographe forment un parallélogramme ${N}.`, verbe: "En le dépliant, on fait en sorte que" },
        { intro: `Les bras d'une lampe d'architecte dessinent un parallélogramme ${N}.`, verbe: "On incline la lampe pour que" },
        { intro: `Sur un parking, une place en épi est un parallélogramme ${N}.`, verbe: "Le marquage au sol est tracé pour que" },
        { intro: `Une étagère penchée forme un parallélogramme ${N}.`, verbe: "On constate que" },
        { intro: `La grille d'un portail extensible contient un parallélogramme ${N}.`, verbe: "Portail entrouvert," },
        { intro: `Un motif de tissu est un parallélogramme ${N}.`, verbe: "Sur le patron," },
        { intro: `Un carreau de mosaïque a la forme d'un parallélogramme ${N}.`, verbe: "Le fabricant indique que" },
        { intro: `Une passerelle oblique dessine, vue du ciel, un parallélogramme ${N}.`, verbe: "L'architecte a prévu que" },
      ]);
      const X = randomChoice(["A", "B", "C", "D"] as const);
      const aigu = randomChoice([true, false]);
      const valX = aigu ? a : 180 - a;
      const demande = randomChoice(["oppose", "consecutif", "somme"] as const);
      const Y = demande === "oppose" ? opposeDe[X] : VOISINS[X][randomInt(0, 1)];
      const rep = demande === "oppose" ? valX : demande === "consecutif" ? 180 - valX : 360 - 2 * valX;
      const st = randomInt(0, 2);
      const question =
        demande === "oppose"
          ? `Quelle est la mesure de ${angleDe(n, Y, st)}, opposé à ${angleDe(n, X, st)} ?`
          : demande === "consecutif"
            ? `Quelle est la mesure de ${angleDe(n, Y, st)} ?`
            : `Quelle est la somme des mesures des deux angles en ${n[VOISINS[X][0]]} et en ${n[VOISINS[X][1]]} ?`;
      const text = `${objet.intro} ${objet.verbe} ${angleDe(n, X, st)} mesure ${valX}°. ${question}`;
      const aiguEnA = (X === "A" || X === "C") === valX < 90;
      return {
        text,
        format: "short",
        expected: [`${rep}°`],
        comparator: "number_equal",
        explanation:
          "Définition : dans un parallélogramme, deux angles opposés sont égaux et deux angles consécutifs ont pour somme 180°.\n\n" +
          "Méthode : on repère si l'angle cherché est opposé ou consécutif à l'angle connu.\n\n" +
          (demande === "oppose"
            ? `Calcul : les angles en ${n[X]} et en ${n[Y]} sont opposés, donc égaux : ${valX}°.\n\n`
            : demande === "consecutif"
              ? `Calcul : les angles en ${n[X]} et en ${n[Y]} sont consécutifs : 180 − ${valX} = ${rep}.\n\n`
              : `Calcul : les angles en ${n[VOISINS[X][0]]} et en ${n[VOISINS[X][1]]} sont tous deux consécutifs à l'angle en ${n[X]} : chacun mesure 180 − ${valX} = ${180 - valX}°, et ${180 - valX} + ${180 - valX} = ${rep}.\n\n`) +
          `Conclusion : la réponse est ${rep}°.`,
        canvas: figure(n, aiguEnA ? "para" : "paraG", { angles: { [X]: `${valX}°` } }),
      };
    },
  },
  {
    kind: "template",
    id: "quadrilatere_parallelogramme_propriete_tpl_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_propriete",
    difficulty: 1,
    theme: "neutral",
    hint: "Dans un parallélogramme, un côté et le côté opposé ont la même longueur.",
    tags: ["parallelogramme", "longueur", "template"],
    generate: () => {
      const n = tirerNom();
      const N = n.nom;
      const ctx = randomChoice(CTX_PARA);
      const L = randomInt(ctx.min, ctx.max);
      const [c, o] = randomChoice([
        ["AB", "CD"],
        ["CD", "AB"],
        ["BC", "DA"],
        ["DA", "BC"],
      ] as const);
      const [X, Z] = [sg(n, c), sg(n, o)];
      const t = randomInt(0, 3);
      const text =
        t === 0
          ? `${ctx.intro(N)} On mesure ${X} = ${L} ${ctx.u}. Quelle est la longueur du côté [${Z}], en ${ctx.u} ?`
          : t === 1
            ? `${ctx.intro(N)} Le côté [${X}] mesure ${L} ${ctx.u}. Combien mesure le côté opposé [${Z}] ?`
            : t === 2
              ? `${ctx.intro(N)} Sachant que ${X} = ${L} ${ctx.u}, donne la longueur ${Z}.`
              : `${ctx.intro(N)} Quelle est la longueur de [${Z}], si [${X}] mesure ${L} ${ctx.u} ?`;
      return {
        text,
        format: "short",
        expected: [`${L} ${ctx.u}`],
        comparator: "number_equal",
        explanation:
          DEF +
          "Méthode : dans un parallélogramme, les côtés opposés ont la même longueur.\n\n" +
          `Calcul : [${Z}] est opposé à [${X}], donc ${Z} = ${X} = ${L} ${ctx.u}.\n\n` +
          `Conclusion : ${Z} = ${L} ${ctx.u}.`,
        canvas: figure(n, "para", { cotes: { [c]: `${L} ${ctx.u}`, [o]: "?" } }),
      };
    },
  },

  // ---------- PARA_DIAGONALES ----------
  {
    kind: "fixed",
    id: "quadrilatere_parallelogramme_diagonale_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_diagonale",
    difficulty: 2,
    theme: "neutral",
    text: "Le point d’intersection des diagonales d’un parallélogramme est…",
    format: "qcm",
    choices: [
      "le milieu de chacune des diagonales",
      "un sommet du parallélogramme",
      "situé sur un côté",
      "à l’extérieur de la figure",
    ],
    expected: ["le milieu de chacune des diagonales"],
    comparator: "mcq_exact",
    hint: "Les diagonales se coupent en leur milieu.",
    explanation:
      "Définition : dans un parallélogramme, les diagonales se coupent en leur milieu.\n\n" +
      "Méthode : on localise le point d’intersection des diagonales.\n\n" +
      "Calcul : ce point partage chaque diagonale en deux parts égales.\n\n" +
      "Conclusion : c’est le milieu de chacune des diagonales.",
    tags: ["parallelogramme", "diagonale", "qcm"],
  },
  {
    kind: "fixed",
    id: "quadrilatere_parallelogramme_diagonale_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_diagonale",
    difficulty: 2,
    theme: "neutral",
    text: "Dans un parallélogramme quelconque, les deux diagonales ont-elles toujours la même longueur ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Les diagonales égales caractérisent plutôt le rectangle.",
    explanation:
      "Définition : dans un parallélogramme, les diagonales se coupent en leur milieu.\n\n" +
      "Méthode : on distingue le parallélogramme quelconque du rectangle.\n\n" +
      "Calcul : les diagonales d’un parallélogramme quelconque n’ont pas la même longueur ; c’est le rectangle qui a des diagonales égales.\n\n" +
      "Conclusion : non, les diagonales ne sont pas toujours égales.",
    tags: ["parallelogramme", "diagonale", "qcm"],
  },
  {
    kind: "fixed",
    id: "quadrilatere_parallelogramme_diagonale_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_diagonale",
    difficulty: 3,
    theme: "neutral",
    text: "Dans quel quadrilatère les diagonales se coupent en leur milieu ET sont de même longueur ?",
    format: "qcm",
    choices: [
      "le rectangle",
      "le parallélogramme quelconque",
      "le trapèze quelconque",
      "le losange quelconque",
    ],
    expected: ["le rectangle"],
    comparator: "mcq_exact",
    hint: "Cherche la figure dont les diagonales sont égales.",
    explanation:
      "Définition : dans un parallélogramme, les diagonales se coupent en leur milieu.\n\n" +
      "Méthode : on ajoute la condition « diagonales égales ».\n\n" +
      "Calcul : seul le rectangle (parallélogramme à angles droits) a ses diagonales égales.\n\n" +
      "Conclusion : c’est le rectangle.",
    tags: ["parallelogramme", "diagonale", "rectangle", "qcm"],
  },
  {
    kind: "template",
    id: "quadrilatere_parallelogramme_diagonale_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_diagonale",
    difficulty: 3,
    theme: "neutral",
    hint: "Le point d’intersection est le milieu : la diagonale entière vaut le double d'une moitié, et une moitié vaut la diagonale divisée par 2.",
    tags: ["parallelogramme", "diagonale", "template"],
    generate: () => {
      const n = tirerNom();
      const N = n.nom;
      const O = n.O;
      const ctx = randomChoice(CTX_PARA);
      const sommet = randomChoice(["A", "B", "C", "D"] as const);
      const diag = sommet === "A" || sommet === "C" ? "AC" : "BD";
      const versEntier = Math.random() < 0.5;
      // Une moitié tirée entière ou « et demie » quand on part de la diagonale entière.
      const entier = randomInt(Math.max(4, ctx.min), Math.max(8, ctx.max));
      const moitie = versEntier ? randomInt(Math.max(2, Math.floor(ctx.min / 2)), Math.max(4, Math.floor(ctx.max / 2))) : entier / 2;
      const tout = versEntier ? 2 * moitie : entier;
      const demi = `${O}${n[sommet]}`;
      const D = sg(n, diag);
      const t = randomInt(0, 2);
      const text = versEntier
        ? t === 0
          ? `${ctx.intro(N)} Ses diagonales se coupent en ${O}, et ${demi} = ${fr(moitie)} ${ctx.u}. Quelle est la longueur de la diagonale [${D}] ?`
          : t === 1
            ? `Dans le parallélogramme ${N}, les diagonales se croisent en ${O}. On mesure ${demi} = ${fr(moitie)} ${ctx.u}. Combien mesure ${D} ?`
            : `${ctx.intro(N)} On sait que ${O}, point commun des diagonales, est à ${fr(moitie)} ${ctx.u} du sommet ${n[sommet]}. Calcule la longueur ${D}.`
        : t === 0
          ? `${ctx.intro(N)} Sa diagonale [${D}] mesure ${fr(tout)} ${ctx.u} et coupe l'autre diagonale en ${O}. Quelle est la longueur ${demi} ?`
          : t === 1
            ? `Dans le parallélogramme ${N} de centre ${O}, la diagonale [${D}] mesure ${fr(tout)} ${ctx.u}. Combien mesure ${demi} ?`
            : `${ctx.intro(N)} On sait que ${D} = ${fr(tout)} ${ctx.u}. Les diagonales se coupent en ${O} : quelle est la distance ${demi} ?`;
      const rep = versEntier ? tout : moitie;
      return {
        text,
        format: "short",
        expected: [`${fr(rep)} ${ctx.u}`],
        comparator: "number_equal",
        explanation:
          "Définition : dans un parallélogramme, les diagonales se coupent en leur milieu.\n\n" +
          `Méthode : ${O} est le milieu de [${D}], donc ${D} = 2 × ${demi}.\n\n` +
          (versEntier ? `Calcul : 2 × ${fr(moitie)} = ${fr(tout)}.\n\n` : `Calcul : ${fr(tout)} ÷ 2 = ${fr(moitie)}.\n\n`) +
          `Conclusion : ${versEntier ? D : demi} = ${fr(rep)} ${ctx.u}.`,
        canvas: figure(n, "para", { diagonales: true, ...(versEntier ? {} : { cotes: { [diag]: `${fr(tout)} ${ctx.u}` } }) }),
      };
    },
  },
  {
    kind: "template",
    id: "quadrilatere_parallelogramme_diagonale_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_diagonale",
    difficulty: 3,
    theme: "neutral",
    hint: "Chaque diagonale est coupée en deux moitiés égales ; repère sur quelle diagonale se trouve le segment demandé.",
    tags: ["parallelogramme", "diagonale", "template"],
    generate: () => {
      const n = tirerNom();
      const N = n.nom;
      const O = n.O;
      const p = 2 * randomInt(3, 15);
      let q = 2 * randomInt(3, 15);
      if (q === p) q += 2;
      const sommet = randomChoice(["A", "B", "C", "D"] as const);
      const rep = sommet === "A" || sommet === "C" ? p / 2 : q / 2;
      const diag = sommet === "A" || sommet === "C" ? sg(n, "AC") : sg(n, "BD");
      const ctx = randomChoice(CTX_PARA.filter((c) => c.u === "cm"));
      const t = randomInt(0, 3);
      const text =
        t === 0
          ? `Les diagonales du parallélogramme ${N} se coupent en ${O}. On sait que ${sg(n, "AC")} = ${p} cm et ${sg(n, "BD")} = ${q} cm. Quelle est la longueur ${O}${n[sommet]} ?`
          : t === 1
            ? `${ctx.intro(N)} Ses diagonales mesurent ${sg(n, "BD")} = ${q} cm et ${sg(n, "AC")} = ${p} cm, et se croisent en ${O}. Combien mesure [${O}${n[sommet]}] ?`
            : t === 2
              ? `${N} est un parallélogramme de centre ${O} dont les diagonales mesurent ${p} cm ([${sg(n, "AC")}]) et ${q} cm ([${sg(n, "BD")}]). Calcule ${n[sommet]}${O}.`
              : `${ctx.intro(N)} On connaît ses diagonales : ${sg(n, "AC")} = ${p} cm, ${sg(n, "BD")} = ${q} cm. À quelle distance du sommet ${n[sommet]} se trouve le point ${O} où elles se coupent ?`;
      return {
        text,
        format: "short",
        expected: [`${rep} cm`],
        comparator: "number_equal",
        explanation:
          "Définition : dans un parallélogramme, les diagonales se coupent en leur milieu.\n\n" +
          `Méthode : le segment [${O}${n[sommet]}] est la moitié de la diagonale [${diag}].\n\n` +
          `Calcul : ${diag} ÷ 2 = ${rep * 2} ÷ 2 = ${rep}.\n\n` +
          `Conclusion : ${O}${n[sommet]} = ${rep} cm.`,
        canvas: figure(n, "para", { diagonales: true, cotes: { AC: `${p} cm`, BD: `${q} cm` } }),
      };
    },
  },
  {
    kind: "template",
    id: "quadrilatere_parallelogramme_diagonale_tpl_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_diagonale",
    difficulty: 2,
    theme: "neutral",
    hint: "Le point d'intersection des diagonales est le milieu de chacune d'elles.",
    tags: ["parallelogramme", "diagonale", "template"],
    generate: () => {
      const n = tirerNom();
      const N = n.nom;
      const O = n.O;
      const ctx = randomChoice(CTX_PARA);
      const v = randomInt(Math.max(2, Math.floor(ctx.min / 2)), Math.max(5, Math.floor(ctx.max / 2)));
      const sommet = randomChoice(["A", "B", "C", "D"] as const);
      const X = `${n[sommet]}${O}`;
      const Y = `${O}${n[opposeDe[sommet]]}`;
      const t = randomInt(0, 3);
      const text =
        t === 0
          ? `Les diagonales du parallélogramme ${N} se coupent en ${O}. On sait que ${X} = ${v} ${ctx.u}. Combien mesure ${Y} ?`
          : t === 1
            ? `${N} est un parallélogramme de centre ${O}. Si ${X} = ${v} ${ctx.u}, quelle est la longueur ${Y} ?`
            : t === 2
              ? `${ctx.intro(N)} Ses diagonales se croisent en ${O}, et ${X} = ${v} ${ctx.u}. Quelle est la longueur ${Y} ?`
              : `${ctx.intro(N)} Le point ${O} est l'intersection de ses diagonales. Sachant que ${X} mesure ${v} ${ctx.u}, trouve ${Y}.`;
      return {
        text,
        format: "short",
        expected: [`${v} ${ctx.u}`],
        comparator: "number_equal",
        explanation:
          "Définition : dans un parallélogramme, les diagonales se coupent en leur milieu.\n\n" +
          `Méthode : ${O} est le milieu de [${n[sommet]}${n[opposeDe[sommet]]}], donc ${Y} = ${X}.\n\n` +
          `Calcul : ${Y} = ${X} = ${v}.\n\n` +
          `Conclusion : ${Y} = ${v} ${ctx.u}.`,
        canvas: figure(n, "para", { diagonales: true }),
      };
    },
  },
  {
    kind: "fixed",
    id: "quadrilatere_parallelogramme_diagonale_open_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_diagonale",
    difficulty: 4,
    theme: "neutral",
    // ⛔ 08/10/2026 : question ouverte à mots-clés → QCM sur les mêmes pièges.
    text: "Quelle différence y a-t-il entre les diagonales d’un parallélogramme quelconque et celles d’un rectangle ?",
    format: "qcm",
    choices: [
      "les deux se coupent en leur milieu, mais seules celles du rectangle ont toujours la même longueur",
      "seules celles du rectangle se coupent en leur milieu",
      "seules celles du rectangle sont perpendiculaires",
      "il n’y a aucune différence",
    ],
    expected: ["les deux se coupent en leur milieu, mais seules celles du rectangle ont toujours la même longueur"],
    comparator: "mcq_exact",
    hint: "Les deux types se coupent en leur milieu, mais une seule famille a des diagonales égales.",
    explanation:
      "Définition : dans un parallélogramme, les diagonales se coupent en leur milieu.\n\n" +
      "Méthode : on compare la longueur des diagonales selon la figure.\n\n" +
      "Calcul : dans tout parallélogramme elles se coupent en leur milieu, mais seules celles d’un rectangle sont aussi égales.\n\n" +
      "Conclusion : le rectangle ajoute la propriété « diagonales égales ».",
    tags: ["parallelogramme", "diagonale", "open"],
  },
  {
    kind: "template",
    id: "quadrilatere_parallelogramme_diagonale_tpl_6",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_diagonale",
    difficulty: 4,
    theme: "neutral",
    hint: "Rectangle : diagonales de même longueur. Losange : diagonales perpendiculaires. Toujours : elles se coupent en leur milieu.",
    tags: ["parallelogramme", "diagonale", "cas_particuliers", "template"],
    // Les diagonales des cas particuliers, avec des objets : porte de garage,
    // cerf-volant en losange, écran, carreau…
    generate: () => {
      const n = tirerNom();
      const N = n.nom;
      const O = n.O;
      // Diagonales plausibles : d = 2 × (une moitié tirée entre lo et hi), dans l'unité u.
      const objet = randomChoice([
        { intro: `Une porte de garage est un rectangle ${N}.`, f: "rect" as const, u: "cm", lo: 140, hi: 170 },
        { intro: `L'écran d'une tablette est un rectangle ${N}.`, f: "rect" as const, u: "cm", lo: 10, hi: 16 },
        { intro: `Un terrain de handball est un rectangle ${N}.`, f: "rect" as const, u: "m", lo: 22, hi: 23 },
        { intro: `Le cadre d'un tableau est un rectangle ${N}.`, f: "rect" as const, u: "cm", lo: 25, hi: 60 },
        { intro: `Une feuille de papier est un rectangle ${N}.`, f: "rect" as const, u: "cm", lo: 12, hi: 18 },
        { intro: `Un cerf-volant en losange a pour contour le losange ${N}.`, f: "losange" as const, u: "cm", lo: 0, hi: 0 },
        { intro: `Un panneau « route prioritaire » est un losange ${N}.`, f: "losange" as const, u: "cm", lo: 0, hi: 0 },
        { intro: `Une maille de grillage est un losange ${N}.`, f: "losange" as const, u: "cm", lo: 0, hi: 0 },
        { intro: `Un carreau de faïence est un carré ${N}.`, f: "carre" as const, u: "cm", lo: 7, hi: 22 },
        { intro: `Une case d'échiquier est un carré ${N}.`, f: "carre" as const, u: "cm", lo: 3, hi: 5 },
      ]);
      const u = objet.u;
      const d = 2 * randomInt(objet.lo, objet.hi);
      const sommet = randomChoice(["A", "B", "C", "D"] as const);
      const autre = sommet === "A" || sommet === "C" ? "BD" : "AC";
      const memeDiag = sommet === "A" || sommet === "C" ? "AC" : "BD";
      let text: string;
      let expected: string;
      let explication: string;
      if (objet.f === "rect" || objet.f === "carre") {
        // Diagonales égales : on donne une diagonale, on demande la moitié de l'AUTRE.
        const t = randomInt(0, 2);
        text =
          t === 0
            ? `${objet.intro} Sa diagonale [${sg(n, autre)}] mesure ${d} ${u} et ses diagonales se coupent en ${O}. Quelle est la longueur ${O}${n[sommet]} ?`
            : t === 1
              ? `${objet.intro} On sait que ${sg(n, autre)} = ${d} ${u}. Les diagonales se croisent en ${O} : combien mesure [${O}${n[sommet]}] ?`
              : `${objet.intro} Ses diagonales se coupent en ${O}, et ${sg(n, autre)} = ${d} ${u}. Calcule ${n[sommet]}${O}.`;
        expected = `${d / 2} ${u}`;
        explication =
          `Méthode : dans un ${objet.f === "rect" ? "rectangle" : "carré"}, les diagonales ont la même longueur et se coupent en leur milieu. Attention : [${O}${n[sommet]}] est sur l'AUTRE diagonale, [${sg(n, memeDiag)}].\n\n` +
          `Calcul : ${sg(n, memeDiag)} = ${sg(n, autre)} = ${d}, donc ${O}${n[sommet]} = ${d} ÷ 2 = ${d / 2}.\n\n` +
          `Conclusion : ${O}${n[sommet]} = ${d / 2} ${u}.`;
      } else {
        // Losange : diagonales perpendiculaires, mais PAS forcément de même longueur.
        const t = randomInt(0, 2);
        text =
          t === 0
            ? `${objet.intro} Quel est l'angle formé par ses diagonales [${sg(n, "AC")}] et [${sg(n, "BD")}], en degrés ?`
            : t === 1 || !objet.intro.includes("cerf-volant")
              ? `${objet.intro} Ses diagonales se coupent en ${O}. Quelle est la mesure de l'angle ${n.A}${O}${n.B} ?`
              : `${objet.intro} Les deux baguettes du cerf-volant suivent ses diagonales. Quel angle font-elles entre elles ?`;
        expected = "90°";
        explication =
          "Méthode : les diagonales d'un losange sont perpendiculaires (et se coupent en leur milieu).\n\n" +
          "Calcul : deux droites perpendiculaires forment un angle droit, soit 90°.\n\n" +
          "Conclusion : l'angle mesure 90°.";
      }
      return {
        text,
        format: "short",
        expected: [expected],
        comparator: "number_equal",
        explanation: "Définition : rectangle, losange et carré sont des parallélogrammes particuliers.\n\n" + explication,
        canvas: figure(n, objet.f, { diagonales: true }),
      };
    },
  },

  // ---------- PARA_MONTRER ----------
  {
    kind: "fixed",
    id: "quadrilatere_parallelogramme_montrer_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_montrer",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle condition suffit à montrer qu’un quadrilatère est un parallélogramme ?",
    format: "qcm",
    choices: [
      "les côtés opposés sont parallèles deux à deux",
      "une seule paire de côtés est parallèle",
      "les diagonales sont de même longueur",
      "il possède un angle droit",
    ],
    expected: ["les côtés opposés sont parallèles deux à deux"],
    comparator: "mcq_exact",
    hint: "Cherche une condition caractéristique.",
    explanation:
      "Définition : un parallélogramme a ses côtés opposés parallèles deux à deux.\n\n" +
      "Méthode : on cherche la condition qui caractérise le parallélogramme.\n\n" +
      "Calcul : deux paires de côtés parallèles suffisent ; une seule paire ou des diagonales égales ne suffisent pas.\n\n" +
      "Conclusion : « côtés opposés parallèles deux à deux » suffit.",
    tags: ["parallelogramme", "demonstration", "qcm"],
  },
  {
    kind: "fixed",
    id: "quadrilatere_parallelogramme_montrer_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_montrer",
    difficulty: 3,
    theme: "neutral",
    text: "Dans ABCD, les côtés opposés sont égaux deux à deux. Alors ABCD est…",
    format: "qcm",
    choices: ["un parallélogramme", "un trapèze", "un triangle", "indéterminé"],
    expected: ["un parallélogramme"],
    comparator: "mcq_exact",
    hint: "Côtés opposés égaux deux à deux : c’est une condition suffisante.",
    explanation:
      "Définition : un parallélogramme a ses côtés opposés parallèles deux à deux.\n\n" +
      "Méthode : on utilise la réciproque sur les longueurs.\n\n" +
      "Calcul : si les côtés opposés d’un quadrilatère sont égaux deux à deux, alors c’est un parallélogramme.\n\n" +
      "Conclusion : ABCD est un parallélogramme.",
    tags: ["parallelogramme", "demonstration", "qcm"],
  },
  {
    kind: "fixed",
    id: "quadrilatere_parallelogramme_montrer_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_montrer",
    difficulty: 3,
    theme: "neutral",
    text: "Dans ABCD, on a AB // CD et AB = CD (un même couple de côtés à la fois parallèle et égal). Alors ABCD est…",
    format: "qcm",
    choices: ["un parallélogramme", "un trapèze quelconque", "un losange", "indéterminé"],
    expected: ["un parallélogramme"],
    comparator: "mcq_exact",
    hint: "Un couple de côtés à la fois parallèles et égaux suffit.",
    explanation:
      "Définition : un parallélogramme a ses côtés opposés parallèles deux à deux.\n\n" +
      "Méthode : on utilise la condition « un couple de côtés parallèles et de même longueur ».\n\n" +
      "Calcul : si AB // CD et AB = CD, alors ABCD est un parallélogramme.\n\n" +
      "Conclusion : ABCD est un parallélogramme.",
    tags: ["parallelogramme", "demonstration", "qcm"],
  },
  {
    kind: "fixed",
    id: "quadrilatere_parallelogramme_montrer_fixed_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_montrer",
    difficulty: 2,
    theme: "neutral",
    text: "Le fait que les diagonales d’un quadrilatère se coupent en leur milieu permet-il de conclure que c’est un parallélogramme ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "C’est une condition réciproque caractéristique.",
    explanation:
      "Définition : un parallélogramme a ses côtés opposés parallèles deux à deux.\n\n" +
      "Méthode : on utilise la réciproque sur les diagonales.\n\n" +
      "Calcul : si les diagonales se coupent en leur milieu, le quadrilatère est un parallélogramme.\n\n" +
      "Conclusion : oui, on peut conclure.",
    tags: ["parallelogramme", "demonstration", "diagonale", "qcm"],
  },
  {
    kind: "template",
    id: "quadrilatere_parallelogramme_montrer_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_montrer",
    difficulty: 4,
    theme: "neutral",
    hint: "Une seule paire de côtés parallèles ou des diagonales seulement égales ne suffisent pas.",
    tags: ["parallelogramme", "demonstration", "template"],
    generate: () => {
      const n = tirerNom();
      const N = n.nom;
      const O = n.O;
      const suffisantes = [
        `(${sg(n, "AB")}) // (${sg(n, "CD")}) et (${sg(n, "AD")}) // (${sg(n, "BC")})`,
        `${sg(n, "AB")} = ${sg(n, "CD")} et ${sg(n, "AD")} = ${sg(n, "BC")}`,
        `les diagonales [${sg(n, "AC")}] et [${sg(n, "BD")}] se coupent en leur milieu`,
        `(${sg(n, "AD")}) // (${sg(n, "BC")}) et ${sg(n, "AD")} = ${sg(n, "BC")}`,
        `${O} est à la fois le milieu de [${sg(n, "AC")}] et celui de [${sg(n, "BD")}]`,
      ];
      const insuffisantes = [
        { c: `(${sg(n, "AB")}) // (${sg(n, "CD")})`, r: "une seule paire de côtés parallèles décrit un trapèze" },
        { c: `${sg(n, "AC")} = ${sg(n, "BD")}`, r: "des diagonales de même longueur ne disent pas qu'elles se coupent en leur milieu (trapèze isocèle)" },
        { c: `l'angle en ${n.A} est droit`, r: "un angle droit ne dit rien sur le parallélisme des côtés opposés" },
        { c: `${sg(n, "AB")} = ${sg(n, "BC")} et ${sg(n, "CD")} = ${sg(n, "DA")}`, r: "ce sont des côtés consécutifs égaux : c'est un cerf-volant" },
        { c: `(${sg(n, "AB")}) // (${sg(n, "CD")}) et ${sg(n, "AD")} = ${sg(n, "BC")}`, r: "les côtés égaux ne sont pas ceux qui sont parallèles : un trapèze isocèle convient aussi" },
        { c: `${O} est le milieu de [${sg(n, "AC")}]`, r: `il faudrait aussi que ${O} soit le milieu de [${sg(n, "BD")}]` },
      ];
      const suffit = Math.random() < 0.5;
      const ins = randomChoice(insuffisantes);
      const cond = suffit ? randomChoice(suffisantes) : ins.c;
      const t = randomInt(0, 2);
      const text =
        t === 0
          ? `Pour le quadrilatère ${N}, cette condition suffit-elle pour conclure que c'est un parallélogramme : « ${cond} » ?`
          : t === 1
            ? `On veut prouver que ${N} est un parallélogramme. Savoir seulement que ${cond}, est-ce suffisant ?`
            : (() => {
                const e = randomChoice(ELEVES);
                return `${e.p} n'a qu'une information sur le quadrilatère ${N} : ${cond}. Peut-${e.il} en déduire que ${N} est un parallélogramme ?`;
              })();
      return {
        text,
        format: "qcm",
        choices: ["oui", "non"],
        expected: [suffit ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation:
          "Définition : un parallélogramme a ses côtés opposés parallèles deux à deux.\n\n" +
          "Méthode : on vérifie si la condition est une propriété caractéristique (une réciproque connue).\n\n" +
          (suffit ? `Ici : « ${cond} » est une condition suffisante.\n\n` : `Ici : « ${cond} » ne suffit pas : ${ins.r}.\n\n`) +
          `Conclusion : ${suffit ? "oui" : "non"}.`,
      };
    },
  },
  {
    kind: "template",
    id: "quadrilatere_parallelogramme_montrer_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_montrer",
    difficulty: 3,
    theme: "neutral",
    hint: "Associe la donnée à la bonne propriété réciproque.",
    tags: ["parallelogramme", "demonstration", "template"],
    generate: () => {
      const n = tirerNom();
      const N = n.nom;
      const O = n.O;
      const a = randomInt(4, 15);
      let b = randomInt(4, 15);
      if (b === a) b = a + 1;
      const x = randomInt(3, 10);
      let y = randomInt(3, 10);
      if (y === x) y = x + 1;
      const P1 = "côtés opposés parallèles deux à deux";
      const P2 = "côtés opposés de même longueur deux à deux";
      const P3 = "diagonales qui se coupent en leur milieu";
      const P4 = "un couple de côtés opposés parallèles et de même longueur";
      const cas = randomChoice([
        { d: `(${sg(n, "AB")}) // (${sg(n, "CD")}) et (${sg(n, "AD")}) // (${sg(n, "BC")})`, r: P1 },
        { d: `(${sg(n, "BC")}) // (${sg(n, "AD")}) et (${sg(n, "DC")}) // (${sg(n, "AB")})`, r: P1 },
        { d: `${sg(n, "AB")} = ${sg(n, "CD")} = ${a} cm et ${sg(n, "AD")} = ${sg(n, "BC")} = ${b} cm`, r: P2 },
        { d: `${sg(n, "BC")} = ${sg(n, "AD")} = ${b} cm et ${sg(n, "CD")} = ${sg(n, "AB")} = ${a} cm`, r: P2 },
        { d: `les diagonales [${sg(n, "AC")}] et [${sg(n, "BD")}] ont le même milieu ${O}`, r: P3 },
        { d: `${O}${n.A} = ${O}${n.C} = ${x} cm et ${O}${n.B} = ${O}${n.D} = ${y} cm, ${O} étant sur les deux diagonales`, r: P3 },
        { d: `(${sg(n, "AB")}) // (${sg(n, "CD")}) et ${sg(n, "AB")} = ${sg(n, "CD")} = ${a} cm`, r: P4 },
        { d: `(${sg(n, "AD")}) // (${sg(n, "BC")}) et ${sg(n, "AD")} = ${sg(n, "BC")} = ${b} cm`, r: P4 },
      ]);
      const qui = randomChoice([
        "Un menuisier vérifie son cadre",
        "Une élève étudie la figure",
        "Un technicien contrôle le pantographe",
        "Une architecte relit son plan de la fenêtre",
        "Un carreleur vérifie un carreau taillé",
        "Une couturière vérifie la pièce de tissu",
      ]);
      const t = randomInt(0, 2);
      const text =
        t === 0
          ? `On sait que dans ${N} : ${cas.d}. Quelle propriété permet de conclure que ${N} est un parallélogramme ?`
          : t === 1
            ? `${qui} ${N} et constate que ${cas.d}. Sur quelle propriété s'appuyer pour affirmer que ${N} est un parallélogramme ?`
            : `Dans le quadrilatère ${N}, ${cas.d}. Pour démontrer que ${N} est un parallélogramme, on utilise la propriété des…`;
      return {
        text,
        format: "qcm",
        choices: [P1, P2, P3, P4],
        expected: [cas.r],
        comparator: "mcq_exact",
        explanation:
          "Définition : un parallélogramme a ses côtés opposés parallèles deux à deux.\n\n" +
          "Méthode : on choisit la propriété réciproque qui correspond EXACTEMENT à la donnée.\n\n" +
          `Ici : à partir de « ${cas.d} », on utilise : « ${cas.r} ».\n\n` +
          `Conclusion : cette propriété permet de conclure que ${N} est un parallélogramme.`,
      };
    },
  },
  {
    kind: "template",
    id: "quadrilatere_parallelogramme_montrer_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_montrer",
    difficulty: 2,
    theme: "neutral",
    hint: "Ce sont les côtés OPPOSÉS qui doivent être parallèles ou égaux, ou les diagonales qui doivent avoir le même milieu.",
    tags: ["parallelogramme", "demonstration", "template"],
    generate: () => {
      const n = tirerNom();
      const N = n.nom;
      const O = n.O;
      const a = randomInt(3, 12);
      let b = randomInt(3, 12);
      if (b === a) b = a + 2;
      const x = randomInt(2, 8);
      let y = randomInt(2, 8);
      if (y === x) y = x + 1;
      const cas = randomChoice([
        {
          d: `${sg(n, "AB")} = ${sg(n, "CD")} = ${a} cm et ${sg(n, "BC")} = ${sg(n, "DA")} = ${b} cm`,
          oui: true,
          r: "les côtés opposés sont égaux deux à deux",
          f: figure(n, "para", { codage: false, cotes: { AB: `${a} cm`, CD: `${a} cm`, BC: `${b} cm`, DA: `${b} cm` } }),
        },
        {
          // Le cerf-volant dessiné a [AB] et [DA] plus longs : le plus grand des deux nombres y va.
          d: `${sg(n, "AB")} = ${sg(n, "DA")} = ${Math.max(a, b)} cm et ${sg(n, "BC")} = ${sg(n, "CD")} = ${Math.min(a, b)} cm`,
          oui: false,
          r: `ce sont des côtés consécutifs qui sont égaux ; les côtés opposés [${sg(n, "AB")}] et [${sg(n, "CD")}] mesurent ${Math.max(a, b)} cm et ${Math.min(a, b)} cm : c'est un cerf-volant`,
          f: figure(n, "cerfvolant", { cotes: { AB: `${Math.max(a, b)} cm`, DA: `${Math.max(a, b)} cm`, BC: `${Math.min(a, b)} cm`, CD: `${Math.min(a, b)} cm` } }),
        },
        {
          d: `(${sg(n, "AB")}) // (${sg(n, "CD")}) et (${sg(n, "AD")}) // (${sg(n, "BC")})`,
          oui: true,
          r: "les côtés opposés sont parallèles deux à deux : c'est la définition",
          f: figure(n, "para"),
        },
        {
          d: `(${sg(n, "AB")}) // (${sg(n, "CD")}), ${sg(n, "AD")} = ${a} cm et ${sg(n, "BC")} = ${b} cm`,
          oui: false,
          r: `les côtés opposés [${sg(n, "AD")}] et [${sg(n, "BC")}] n'ont pas la même longueur (${a} cm et ${b} cm), ce qui est impossible dans un parallélogramme`,
          f: figure(n, "trapeze", { cotes: { DA: `${a} cm`, BC: `${b} cm` } }),
        },
        {
          d: `${O} est le milieu de [${sg(n, "AC")}] et de [${sg(n, "BD")}]`,
          oui: true,
          r: "les diagonales se coupent en leur milieu",
          f: figure(n, "para", { codage: false, diagonales: true }),
        },
        {
          d: `les diagonales se coupent en ${O}, avec ${O}${n.A} = ${O}${n.C} = ${x} cm, mais ${O}${n.B} = ${x + y} cm et ${O}${n.D} = ${y} cm`,
          oui: false,
          r: `${O} n'est pas le milieu de [${sg(n, "BD")}] (${x + y} cm d'un côté, ${y} cm de l'autre)`,
          f: figure(n, "quelconque", { codage: false, diagonales: true }),
        },
      ]);
      const qui = randomChoice(["Un menuisier", "Une élève", "Un serrurier", "Une architecte", "Un ébéniste", "Une ingénieure"]);
      const t = randomInt(0, 3);
      const text =
        t === 0
          ? `Dans le quadrilatère ${N}, ${cas.d}. ${N} est-il un parallélogramme ?`
          : t === 1
            ? `On sait que, dans le quadrilatère ${N}, ${cas.d}. Peut-on conclure que ${N} est un parallélogramme ?`
            : t === 2
              ? `${qui} construit le quadrilatère ${N} : ${cas.d}. Obtient-on forcément un parallélogramme ?`
              : `Les informations « ${cas.d} » permettent-elles d'affirmer que ${N} est un parallélogramme ?`;
      return {
        text,
        format: "qcm",
        choices: ["oui", "non"],
        expected: [cas.oui ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation:
          DEF +
          "Méthode : on cherche une propriété réciproque qui s'applique aux données.\n\n" +
          `Ici : ${cas.r}.\n\n` +
          `Conclusion : ${cas.oui ? `oui, ${N} est un parallélogramme.` : `non, ${N} n'est pas un parallélogramme.`}`,
        canvas: cas.f,
      };
    },
  },
  {
    kind: "fixed",
    id: "quadrilatere_parallelogramme_montrer_open_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_montrer",
    difficulty: 4,
    theme: "neutral",
    // ⛔ 08/10/2026 : question ouverte à mots-clés → QCM sur les mêmes pièges.
    text: "Pour montrer qu’un quadrilatère (non croisé) est un parallélogramme à partir des longueurs de ses côtés, que faut-il prouver ?",
    format: "qcm",
    choices: [
      "que ses côtés opposés sont égaux deux à deux",
      "que deux de ses côtés consécutifs sont égaux",
      "que deux de ses côtés ont la même longueur",
      "que la somme de ses côtés est paire",
    ],
    expected: ["que ses côtés opposés sont égaux deux à deux"],
    comparator: "mcq_exact",
    hint: "Pense à la propriété réciproque sur les longueurs.",
    explanation:
      "Définition : un parallélogramme a ses côtés opposés parallèles deux à deux.\n\n" +
      "Méthode : on utilise la réciproque sur les longueurs.\n\n" +
      "Calcul : si les côtés opposés sont égaux deux à deux, alors le quadrilatère est un parallélogramme.\n\n" +
      "Conclusion : il suffit de prouver que les côtés opposés sont égaux deux à deux.",
    tags: ["parallelogramme", "demonstration", "open"],
  },

  // ---------- PARA_AIRE ----------
  {
    kind: "fixed",
    id: "quadrilatere_parallelogramme_aire_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_aire",
    difficulty: 1,
    theme: "neutral",
    text: "L’aire d’un parallélogramme se calcule par…",
    format: "qcm",
    choices: [
      "base × hauteur",
      "base × côté incliné",
      "base + hauteur",
      "côté × côté",
    ],
    expected: ["base × hauteur"],
    comparator: "mcq_exact",
    hint: "On multiplie la base par la hauteur relative à cette base.",
    explanation:
      "Définition : l’aire d’un parallélogramme est le produit d’une base par la hauteur associée.\n\n" +
      "Méthode : on identifie la base et la hauteur perpendiculaire à cette base.\n\n" +
      "Calcul : aire = base × hauteur.\n\n" +
      "Conclusion : la formule est base × hauteur.",
    tags: ["parallelogramme", "aire", "formule", "qcm"],
  },
  {
    kind: "fixed",
    id: "quadrilatere_parallelogramme_aire_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_aire",
    difficulty: 2,
    theme: "neutral",
    text: "Calculer l’aire d’un parallélogramme de base 12 cm et de hauteur 6 cm.",
    format: "short",
    expected: ["72 cm²"],
    comparator: "number_equal",
    hint: "Aire = base × hauteur.",
    explanation:
      "Définition : l’aire d’un parallélogramme est base × hauteur.\n\n" +
      "Méthode : on multiplie la base par la hauteur.\n\n" +
      "Calcul : $12 \\times 6 = 72$.\n\n" +
      "Conclusion : l’aire est 72 cm².",
    canvas: {
      kind: "quadrilatere",
      labels: { A: "A", B: "B", C: "C", D: "D" },
      // 08/10 : points recalculés pour que la base (12 cm) et la hauteur (6 cm) gardent leur rapport.
      points: { A: { x: 50, y: 175 }, B: { x: 226.6, y: 175 }, C: { x: 250, y: 86.7 }, D: { x: 73.4, y: 86.7 } },
      sideLabels: { AB: "12 cm" },
      display: { showPoints: true, showLabels: true, showSides: true, showAngles: false, showDiagonals: false },
      marks: { parallelSides: [["AB", "CD"], ["BC", "DA"]] },
      height: { fromVertex: "D", onSide: "AB", label: "6 cm" },
      size: { width: 300, height: 230 },
    },
    tags: ["parallelogramme", "aire"],
  },
  {
    kind: "template",
    id: "quadrilatere_parallelogramme_aire_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_aire",
    difficulty: 2,
    theme: "neutral",
    hint: "Aire = base × hauteur. Le côté incliné ne sert pas.",
    tags: ["parallelogramme", "aire", "template"],
    generate: () => {
      const n = tirerNom();
      const N = n.nom;
      const ctx = randomChoice(CTX_PARA.filter((c) => c.max <= 45));
      const u = ctx.u;
      const base = randomInt(Math.max(3, ctx.min), ctx.max);
      const height = randomInt(Math.max(2, Math.floor(ctx.min / 2)), Math.max(3, Math.floor(ctx.max * 0.6)));
      const side = height + randomInt(1, Math.max(2, Math.floor(ctx.max / 4)));
      const area = base * height;
      const H = `${n.D}${n.H}`;
      const t = randomInt(0, 3);
      const text =
        t === 0
          ? `${ctx.intro(N)} On a ${sg(n, "AB")} = ${base} ${u}, ${sg(n, "AD")} = ${side} ${u}, et la hauteur ${H} relative à [${sg(n, "AB")}] mesure ${height} ${u}. Quelle est l'aire de ${N}, en ${u}² ?`
          : t === 1
            ? `${ctx.intro(N)} On connaît trois longueurs : la base ${sg(n, "AB")} = ${base} ${u}, le côté ${sg(n, "AD")} = ${side} ${u} et la hauteur ${H} = ${height} ${u}. Calcule son aire.`
            : t === 2
              ? `${ctx.intro(N)} Ses côtés [${sg(n, "AB")}] et [${sg(n, "AD")}] mesurent ${base} ${u} et ${side} ${u}. La hauteur issue de ${n.D}, perpendiculaire à [${sg(n, "AB")}], mesure ${height} ${u}. Quelle est son aire ?`
              : `${ctx.intro(N)} Quelle est son aire, sachant que [${sg(n, "AB")}] mesure ${base} ${u}, [${sg(n, "AD")}] ${side} ${u}, et que ${H} = ${height} ${u} est la hauteur sur [${sg(n, "AB")}] ?`;
      return {
        text,
        format: "short",
        expected: [`${area} ${u}²`],
        comparator: "number_equal",
        explanation:
          "Définition : l'aire d'un parallélogramme est base × hauteur.\n\n" +
          `Méthode : on multiplie la base [${sg(n, "AB")}] par la hauteur ${H} qui lui est perpendiculaire ; le côté [${sg(n, "AD")}] = ${side} ${u} ne sert pas.\n\n` +
          `Calcul : ${base} × ${height} = ${fr(area)}.\n\n` +
          `Conclusion : l'aire de ${N} est ${fr(area)} ${u}².`,
        canvas: figure(n, "para", { cotes: { AB: `${base} ${u}`, DA: `${side} ${u}` }, hauteur: `${height} ${u}` }),
      };
    },
  },
  {
    kind: "template",
    id: "quadrilatere_parallelogramme_aire_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_aire",
    difficulty: 3,
    theme: "neutral",
    hint: "Pour retrouver la hauteur, divise l’aire par la base.",
    tags: ["parallelogramme", "aire", "inverse", "template"],
    generate: () => {
      const n = tirerNom();
      const N = n.nom;
      const ctx = randomChoice(CTX_PARA);
      const base = randomInt(Math.max(3, ctx.min), Math.max(6, ctx.max));
      const height = randomInt(Math.max(2, Math.floor(ctx.min / 2)), Math.max(4, Math.floor(ctx.max * 0.7)));
      const area = base * height;
      const uu = `${ctx.u}²`;
      const t = randomInt(0, 3);
      const text =
        t === 0
          ? `${ctx.intro(N)} Son aire est de ${fr(area)} ${uu} et sa base [${sg(n, "AB")}] mesure ${base} ${ctx.u}. Quelle est la hauteur relative à cette base, en ${ctx.u} ?`
          : t === 1
            ? `${ctx.intro(N)} ${N} couvre ${fr(area)} ${uu}, avec ${sg(n, "AB")} = ${base} ${ctx.u}. Quelle est la distance entre les droites (${sg(n, "AB")}) et (${sg(n, "CD")}) ?`
            : t === 2
              ? `${ctx.intro(N)} Sachant que sa base mesure ${base} ${ctx.u} et son aire ${fr(area)} ${uu}, calcule sa hauteur.`
              : `${ctx.intro(N)} Combien mesure la hauteur ${n.D}${n.H} de ${N}, si son aire vaut ${fr(area)} ${uu} et sa base [${sg(n, "AB")}] ${base} ${ctx.u} ?`;
      return {
        text,
        format: "short",
        expected: [`${height} ${ctx.u}`],
        comparator: "number_equal",
        explanation:
          "Définition : aire = base × hauteur, donc hauteur = aire ÷ base.\n\n" +
          "Méthode : on divise l'aire par la base.\n\n" +
          `Calcul : ${fr(area)} ÷ ${base} = ${height}.\n\n` +
          `Conclusion : la hauteur mesure ${height} ${ctx.u}.`,
        canvas: figure(n, "para", { cotes: { AB: `${base} ${ctx.u}` }, hauteur: "?" }),
      };
    },
  },
  {
    kind: "template",
    id: "quadrilatere_parallelogramme_aire_tpl_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_aire",
    difficulty: 3,
    theme: "neutral",
    hint: "Pour retrouver la base, divise l’aire par la hauteur.",
    tags: ["parallelogramme", "aire", "inverse", "template"],
    generate: () => {
      const n = tirerNom();
      const N = n.nom;
      const ctx = randomChoice(CTX_PARA);
      const base = randomInt(Math.max(3, ctx.min), Math.max(6, ctx.max));
      const height = randomInt(Math.max(2, Math.floor(ctx.min / 2)), Math.max(4, Math.floor(ctx.max * 0.7)));
      const area = base * height;
      const uu = `${ctx.u}²`;
      const t = randomInt(0, 3);
      const text =
        t === 0
          ? `${ctx.intro(N)} Son aire est de ${fr(area)} ${uu} et sa hauteur relative à [${sg(n, "AB")}] mesure ${height} ${ctx.u}. Quelle est la longueur ${sg(n, "AB")}, en ${ctx.u} ?`
          : t === 1
            ? `${ctx.intro(N)} ${N} a une aire de ${fr(area)} ${uu} ; la distance entre (${sg(n, "AB")}) et (${sg(n, "CD")}) est de ${height} ${ctx.u}. Combien mesure la base [${sg(n, "AB")}] ?`
            : t === 2
              ? `${ctx.intro(N)} Sachant que son aire vaut ${fr(area)} ${uu} et sa hauteur ${height} ${ctx.u}, calcule la longueur de sa base.`
              : `${ctx.intro(N)} Quelle est la longueur de sa base [${sg(n, "AB")}], si son aire est ${fr(area)} ${uu} et la hauteur ${n.D}${n.H} = ${height} ${ctx.u} ?`;
      return {
        text,
        format: "short",
        expected: [`${base} ${ctx.u}`],
        comparator: "number_equal",
        explanation:
          "Définition : aire = base × hauteur, donc base = aire ÷ hauteur.\n\n" +
          "Méthode : on divise l'aire par la hauteur.\n\n" +
          `Calcul : ${fr(area)} ÷ ${height} = ${base}.\n\n` +
          `Conclusion : la base mesure ${base} ${ctx.u}.`,
        canvas: figure(n, "para", { cotes: { AB: "?" }, hauteur: `${height} ${ctx.u}` }),
      };
    },
  },
  {
    kind: "template",
    id: "quadrilatere_parallelogramme_aire_tpl_6",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_aire",
    difficulty: 4,
    theme: "neutral",
    hint: "Un parallélogramme a deux couples base/hauteur, et les deux donnent la même aire.",
    tags: ["parallelogramme", "aire", "deux_hauteurs", "template"],
    // Les deux hauteurs : base [AB] avec sa hauteur, base [AD] avec la sienne.
    generate: () => {
      const n = tirerNom();
      const N = n.nom;
      let h1 = 0, h2 = 0, k = 0, b1 = 0, b2 = 0;
      do {
        h1 = randomInt(3, 9);
        h2 = randomInt(3, 9);
        k = randomInt(2, 3);
        b1 = h2 * k; // [AB]
        b2 = h1 * k; // [AD]
      } while (h1 === h2 || h1 >= b2 || h2 >= b1);
      const area = b1 * h1;
      const demandeAire = Math.random() < 0.3;
      const t = randomInt(0, 2);
      let text: string;
      let rep: number;
      if (demandeAire) {
        rep = area;
        text =
          t === 0
            ? `Dans le parallélogramme ${N}, ${sg(n, "AB")} = ${b1} cm et ${sg(n, "AD")} = ${b2} cm. La hauteur relative à [${sg(n, "AB")}] mesure ${h1} cm. Quelle est l'aire de ${N} ?`
            : t === 1
              ? `Le parallélogramme ${N} a des côtés [${sg(n, "AB")}] de ${b1} cm et [${sg(n, "AD")}] de ${b2} cm. La distance entre (${sg(n, "AB")}) et (${sg(n, "CD")}) est ${h1} cm. Calcule son aire.`
              : `Quelle est l'aire du parallélogramme ${N}, si ${sg(n, "AB")} = ${b1} cm, ${sg(n, "AD")} = ${b2} cm et si la hauteur sur [${sg(n, "AB")}] vaut ${h1} cm ?`;
      } else {
        rep = h2;
        text =
          t === 0
            ? `Dans le parallélogramme ${N}, ${sg(n, "AB")} = ${b1} cm, ${sg(n, "AD")} = ${b2} cm et la hauteur relative à [${sg(n, "AB")}] mesure ${h1} cm. Quelle est la hauteur relative à [${sg(n, "AD")}] ?`
            : t === 1
              ? `Le parallélogramme ${N} a pour côtés ${sg(n, "AB")} = ${b1} cm et ${sg(n, "AD")} = ${b2} cm. La distance entre (${sg(n, "AB")}) et (${sg(n, "CD")}) vaut ${h1} cm. Quelle est la distance entre (${sg(n, "AD")}) et (${sg(n, "BC")}) ?`
              : `${N} est un parallélogramme : sur la base [${sg(n, "AB")}] de ${b1} cm, la hauteur mesure ${h1} cm. Combien mesure la hauteur sur la base [${sg(n, "AD")}], longue de ${b2} cm ?`;
      }
      return {
        text,
        format: "short",
        expected: [demandeAire ? `${rep} cm²` : `${rep} cm`],
        comparator: "number_equal",
        explanation:
          "Définition : l'aire d'un parallélogramme est base × hauteur, avec n'importe quel côté comme base, pourvu qu'on prenne LA hauteur qui lui est perpendiculaire.\n\n" +
          `Méthode : on calcule l'aire avec [${sg(n, "AB")}] et sa hauteur${demandeAire ? "" : `, puis on divise par ${sg(n, "AD")}`}.\n\n` +
          `Calcul : ${b1} × ${h1} = ${area}${demandeAire ? "" : `, puis ${area} ÷ ${b2} = ${h2}`}.\n\n` +
          `Conclusion : ${demandeAire ? `l'aire de ${N} est ${area} cm²` : `la hauteur relative à [${sg(n, "AD")}] mesure ${h2} cm`}.`,
        canvas: figure(n, "para", { cotes: { AB: `${b1} cm`, DA: `${b2} cm` }, hauteur: `${h1} cm` }),
      };
    },
  },
  {
    kind: "template",
    id: "quadrilatere_parallelogramme_aire_tpl_7",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_aire",
    difficulty: 1,
    theme: "neutral",
    hint: "Aire = base × hauteur.",
    tags: ["parallelogramme", "aire", "template"],
    generate: () => {
      const n = tirerNom();
      const N = n.nom;
      // ⛔ 03/10 : l'unité et la plage suivent l'objet (un tapis de bain ne mesure pas 9 cm).
      const o = randomChoice(OBJETS_AIRE);
      const u = o.u;
      const tire = (lo: number, hi: number) => o.pas * randomInt(Math.ceil(lo / o.pas), Math.floor(hi / o.pas));
      const base = tire(o.bmin, o.bmax);
      const height = tire(o.hmin, o.hmax);
      const area = base * height;
      const H = `${n.D}${n.H}`;
      const intro = `${o.gn} a la forme d'un parallélogramme ${N}.`;
      const t = randomInt(0, 3);
      const text =
        t === 0
          ? `${intro} Sa base ${sg(n, "AB")} mesure ${base} ${u} et sa hauteur ${H} mesure ${height} ${u}. Quelle est son aire, en ${u}² ?`
          : t === 1
            ? `${intro} Calcule son aire : la base [${sg(n, "AB")}] mesure ${base} ${u} et la hauteur ${H} mesure ${height} ${u}.`
            : t === 2
              ? `${intro} Sa base mesure ${base} ${u} et sa hauteur ${height} ${u}. Quelle est son aire ?`
              : `${intro} Quelle est son aire, avec une base de ${base} ${u} et une hauteur de ${height} ${u} ?`;
      return {
        text,
        format: "short",
        expected: [`${area} ${u}²`],
        comparator: "number_equal",
        explanation:
          "Définition : l'aire d'un parallélogramme est base × hauteur.\n\n" +
          "Méthode : on multiplie la base par la hauteur.\n\n" +
          `Calcul : ${base} × ${height} = ${fr(area)}.\n\n` +
          `Conclusion : l'aire est ${fr(area)} ${u}².`,
        canvas: figure(n, "para", { cotes: { AB: `${base} ${u}` }, hauteur: `${height} ${u}` }),
      };
    },
  },

  // ---------- PARA_PROBLEME ----------
  {
    kind: "fixed",
    id: "quadrilatere_parallelogramme_probleme_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_probleme",
    difficulty: 2,
    theme: "neutral",
    text: "Un jardin a la forme d’un parallélogramme de base 15 m et de hauteur 8 m. Quelle est sa surface ?",
    format: "short",
    expected: ["120 m²"],
    comparator: "number_equal",
    hint: "Surface = base × hauteur.",
    explanation:
      "Définition : la surface d’un parallélogramme est base × hauteur.\n\n" +
      "Méthode : on multiplie la base par la hauteur.\n\n" +
      "Calcul : $15 \\times 8 = 120$.\n\n" +
      "Conclusion : la surface est 120 m².",
    tags: ["parallelogramme", "probleme", "aire"],
  },
  {
    kind: "fixed",
    id: "quadrilatere_parallelogramme_probleme_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_probleme",
    difficulty: 3,
    theme: "neutral",
    text: "Une parcelle en forme de parallélogramme a deux côtés consécutifs de 20 m et 12 m. Quel est son périmètre ?",
    format: "short",
    expected: ["64 m"],
    comparator: "number_equal",
    hint: "Périmètre = 2 × (somme de deux côtés consécutifs).",
    explanation:
      "Définition : dans un parallélogramme, les côtés opposés sont égaux.\n\n" +
      "Méthode : le périmètre vaut deux fois la somme de deux côtés consécutifs.\n\n" +
      "Calcul : $2 \\times (20 + 12) = 64$.\n\n" +
      "Conclusion : le périmètre est 64 m.",
    tags: ["parallelogramme", "probleme", "perimetre"],
  },
  {
    kind: "fixed",
    id: "quadrilatere_parallelogramme_probleme_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_probleme",
    difficulty: 3,
    theme: "neutral",
    text: "Pour calculer la surface d’un terrain en forme de parallélogramme, de quelles mesures a-t-on besoin ?",
    format: "qcm",
    choices: [
      "une base et la hauteur associée",
      "les deux diagonales",
      "un seul côté",
      "les quatre angles",
    ],
    expected: ["une base et la hauteur associée"],
    comparator: "mcq_exact",
    hint: "La formule de l’aire fait intervenir une base et une hauteur.",
    explanation:
      "Définition : l’aire d’un parallélogramme est base × hauteur.\n\n" +
      "Méthode : on repère les grandeurs utiles à la formule.\n\n" +
      "Calcul : il faut une base et la hauteur perpendiculaire à cette base.\n\n" +
      "Conclusion : on a besoin d’une base et de la hauteur associée.",
    tags: ["parallelogramme", "probleme", "aire", "qcm"],
  },
  {
    kind: "template",
    id: "quadrilatere_parallelogramme_probleme_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_probleme",
    difficulty: 3,
    theme: "neutral",
    hint: "Surface = base × hauteur ; la longueur du côté incliné ne sert pas.",
    tags: ["parallelogramme", "probleme", "aire", "template"],
    generate: () => {
      const n = tirerNom();
      const N = n.nom;
      const ter = randomChoice(TERRAINS);
      const base = randomInt(ter.bmin, ter.bmax);
      const height = randomInt(ter.hmin, ter.hmax);
      const side = height + randomInt(2, 8);
      const area = base * height;
      const t = randomInt(0, 3);
      const text =
        t === 0
          ? `${ter.intro(N)} Ses côtés mesurent ${base} m et ${side} m, et la distance entre ses deux côtés de ${base} m est de ${height} m. Quelle est sa surface, en m² ?`
          : t === 1
            ? `${ter.intro(N)} On a mesuré ${sg(n, "AB")} = ${base} m, ${sg(n, "AD")} = ${side} m, et la hauteur relative à [${sg(n, "AB")}] : ${height} m. Combien de mètres carrés couvre ${N} ?`
            : t === 2
              ? `${ter.intro(N)} Sa base [${sg(n, "AB")}] mesure ${base} m, son côté [${sg(n, "AD")}] ${side} m et sa hauteur ${height} m. Calcule sa surface.`
              : `${ter.intro(N)} Quelle est sa surface, sachant que ${sg(n, "AB")} = ${base} m, que ${sg(n, "BC")} = ${side} m et que la hauteur sur [${sg(n, "AB")}] mesure ${height} m ?`;
      return {
        text,
        format: "short",
        expected: [`${area} m²`],
        comparator: "number_equal",
        explanation:
          "Définition : la surface d'un parallélogramme est base × hauteur.\n\n" +
          `Méthode : on multiplie la base par la hauteur ; le côté incliné de ${side} m ne sert pas.\n\n` +
          `Calcul : ${base} × ${height} = ${fr(area)}.\n\n` +
          `Conclusion : la surface est ${fr(area)} m².`,
      };
    },
  },
  {
    kind: "template",
    id: "quadrilatere_parallelogramme_probleme_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_probleme",
    difficulty: 3,
    theme: "neutral",
    hint: "Périmètre = 2 × (somme de deux côtés consécutifs) ; retire l'ouverture s'il y en a une.",
    tags: ["parallelogramme", "probleme", "perimetre", "template"],
    generate: () => {
      const n = tirerNom();
      const N = n.nom;
      const ter = randomChoice(TERRAINS.filter((x) => x.bmin >= 6 && x.cloture !== false));
      const a = randomInt(ter.bmin, ter.bmax);
      let b = randomInt(ter.hmin + 1, ter.bmax);
      if (b === a) b = a + 1;
      const perimetre = 2 * (a + b);
      const ouverture = Math.random() < 0.5 ? randomChoice([2, 3, 4, 5]) : 0;
      const rep = perimetre - ouverture;
      const ferme = randomChoice(["une clôture", "un grillage", "une haie", "une bordure", "un muret"]);
      const t = randomInt(0, 2);
      const finOuv = ouverture ? `, en laissant une ouverture de ${ouverture} m pour le portail` : "";
      const text =
        t === 0
          ? `${ter.intro(N)} Deux de ses côtés consécutifs mesurent ${a} m et ${b} m. On veut l'entourer d'${ferme}${finOuv}. Quelle longueur faut-il, en m ?`
          : t === 1
            ? `${ter.intro(N)} On a ${sg(n, "AB")} = ${a} m et ${sg(n, "BC")} = ${b} m. Quelle longueur de ${ferme.replace(/^une? /, "")} faut-il pour en faire le tour${finOuv} ?`
            : `${ter.intro(N)} Ses côtés [${sg(n, "AB")}] et [${sg(n, "AD")}] mesurent ${a} m et ${b} m. Combien de mètres de ${ferme.replace(/^une? /, "")} faut-il pour l'entourer${finOuv} ?`;
      return {
        text,
        format: "short",
        expected: [`${rep} m`],
        comparator: "number_equal",
        explanation:
          "Définition : faire le tour, c'est le périmètre ; dans un parallélogramme, les côtés opposés sont égaux.\n\n" +
          `Méthode : périmètre = 2 × (somme de deux côtés consécutifs)${ouverture ? ", puis on retire l'ouverture" : ""}.\n\n` +
          `Calcul : 2 × (${a} + ${b}) = ${perimetre}${ouverture ? `, puis ${perimetre} − ${ouverture} = ${rep}` : ""}.\n\n` +
          `Conclusion : il faut ${rep} m.`,
      };
    },
  },
  {
    kind: "template",
    id: "quadrilatere_parallelogramme_probleme_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_probleme",
    difficulty: 4,
    theme: "neutral",
    hint: "Connaissant le périmètre et un côté, retrouve l’autre côté : divise par 2, puis retire le côté connu.",
    tags: ["parallelogramme", "probleme", "perimetre", "inverse", "template"],
    generate: () => {
      const n = tirerNom();
      const N = n.nom;
      const ctx = randomChoice(CTX_PARA);
      const a = randomInt(ctx.min, ctx.max);
      let b = randomInt(ctx.min, ctx.max);
      if (b === a) b = a + 1;
      const perimetre = 2 * (a + b);
      const t = randomInt(0, 3);
      const text =
        t === 0
          ? `${ctx.intro(N)} Son périmètre est de ${perimetre} ${ctx.u} et ${sg(n, "AB")} = ${a} ${ctx.u}. Quelle est la longueur ${sg(n, "BC")} ?`
          : t === 1
            ? `${ctx.intro(N)} Il faut ${perimetre} ${ctx.u} de baguette pour en faire le tour, et le côté [${sg(n, "AB")}] mesure ${a} ${ctx.u}. Combien mesure le côté [${sg(n, "AD")}] ?`
            : t === 2
              ? `${ctx.intro(N)} Sachant que son périmètre vaut ${perimetre} ${ctx.u} et que ${sg(n, "CD")} = ${a} ${ctx.u}, calcule ${sg(n, "DA")}.`
              : `${ctx.intro(N)} Quelle est la longueur du côté [${sg(n, "BC")}], si le tour de ${N} mesure ${perimetre} ${ctx.u} et [${sg(n, "AB")}] ${a} ${ctx.u} ?`;
      return {
        text,
        format: "short",
        expected: [`${b} ${ctx.u}`],
        comparator: "number_equal",
        explanation:
          "Définition : périmètre = 2 × (somme de deux côtés consécutifs).\n\n" +
          "Méthode : on divise le périmètre par 2, puis on retire le côté connu.\n\n" +
          `Calcul : ${perimetre} ÷ 2 = ${a + b}, puis ${a + b} − ${a} = ${b}.\n\n` +
          `Conclusion : le côté cherché mesure ${b} ${ctx.u}.`,
      };
    },
  },
  {
    kind: "template",
    id: "quadrilatere_parallelogramme_probleme_tpl_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_probleme",
    difficulty: 4,
    theme: "neutral",
    hint: "Connaissant la surface et la base, retrouve la hauteur.",
    tags: ["parallelogramme", "probleme", "aire", "inverse", "template"],
    generate: () => {
      const n = tirerNom();
      const N = n.nom;
      const ter = randomChoice(TERRAINS);
      const base = randomInt(ter.bmin, ter.bmax);
      const height = randomInt(ter.hmin, ter.hmax);
      const area = base * height;
      const inconnue = Math.random() < 0.5 ? "hauteur" : "base";
      const t = randomInt(0, 2);
      let text: string;
      if (inconnue === "hauteur") {
        text =
          t === 0
            ? `${ter.intro(N)} Sa surface est de ${fr(area)} m² et sa base [${sg(n, "AB")}] mesure ${base} m. Quelle est sa hauteur, en m ?`
            : t === 1
              ? `${ter.intro(N)} ${N} couvre ${fr(area)} m² ; le côté [${sg(n, "AB")}] mesure ${base} m. Quelle est la distance entre les côtés [${sg(n, "AB")}] et [${sg(n, "CD")}] ?`
              : `${ter.intro(N)} Pour une surface de ${fr(area)} m² et une base de ${base} m, combien mesure sa hauteur ?`;
      } else {
        text =
          t === 0
            ? `${ter.intro(N)} Sa surface est de ${fr(area)} m² et sa hauteur relative à [${sg(n, "AB")}] mesure ${height} m. Quelle est la longueur ${sg(n, "AB")}, en m ?`
            : t === 1
              ? `${ter.intro(N)} ${N} couvre ${fr(area)} m², et les côtés [${sg(n, "AB")}] et [${sg(n, "CD")}] sont distants de ${height} m. Combien mesure [${sg(n, "AB")}] ?`
              : `${ter.intro(N)} Pour une surface de ${fr(area)} m² et une hauteur de ${height} m, combien mesure sa base ?`;
      }
      const rep = inconnue === "hauteur" ? height : base;
      const div = inconnue === "hauteur" ? base : height;
      return {
        text,
        format: "short",
        expected: [`${rep} m`],
        comparator: "number_equal",
        explanation:
          "Définition : surface = base × hauteur.\n\n" +
          `Méthode : on retrouve la ${inconnue} en divisant la surface par ${inconnue === "hauteur" ? "la base" : "la hauteur"}.\n\n` +
          `Calcul : ${fr(area)} ÷ ${div} = ${rep}.\n\n` +
          `Conclusion : la ${inconnue} mesure ${rep} m.`,
      };
    },
  },
  {
    kind: "template",
    id: "quadrilatere_parallelogramme_probleme_tpl_6",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_probleme",
    difficulty: 4,
    theme: "neutral",
    hint: "Deux angles consécutifs sont supplémentaires ; deux angles opposés sont égaux.",
    tags: ["parallelogramme", "probleme", "angles", "template"],
    generate: () => {
      const n = tirerNom();
      const N = n.nom;
      const angle = randomChoice([35, 40, 45, 50, 55, 58, 60, 64, 65, 70, 72, 75, 80, 105, 110, 115, 118, 120, 124, 125, 130, 135, 140]);
      const situation = randomChoice([
        `Dans une mosaïque, une tuile a la forme d'un parallélogramme ${N}.`,
        `Sur un parking, les places en épi sont des parallélogrammes ; l'une d'elles s'appelle ${N}.`,
        `Un pantographe articulé forme un parallélogramme ${N}.`,
        `Une lampe d'architecte a ses bras disposés en parallélogramme ${N}.`,
        `Un tissu à motifs est couvert de parallélogrammes ; l'un d'eux est ${N}.`,
        `Dans un vitrail, une pièce de verre a la forme d'un parallélogramme ${N}.`,
        `Une étagère qui penche forme un parallélogramme ${N}.`,
        `Un menuisier assemble un cadre de porte qui a pris la forme d'un parallélogramme ${N}.`,
      ]);
      const X = randomChoice(["A", "B", "C", "D"] as const);
      const total = Math.random() < 0.3;
      const Y = total ? X : randomChoice((["A", "B", "C", "D"] as const).filter((v) => v !== X));
      const oppose = !total && opposeDe[X] === Y;
      const rep = total ? 360 : oppose ? angle : 180 - angle;
      const text = total
        ? `${situation} L'angle en ${n[X]} mesure ${angle}°. Quelle est la somme des quatre angles de ${N}, en degrés ?`
        : randomChoice([
            `${situation} L'angle en ${n[X]} mesure ${angle}°. Quelle est la mesure de l'angle en ${n[Y]} ?`,
            `${situation} On mesure ${angle}° pour ${angleDe(n, X, 0)}. Combien mesure ${angleDe(n, Y, 0)} ?`,
          ]);
      const aiguEnA = (X === "A" || X === "C") === angle < 90;
      return {
        text,
        format: "short",
        expected: [`${rep}°`],
        comparator: "number_equal",
        explanation:
          "Définition : dans un parallélogramme, deux angles consécutifs sont supplémentaires et deux angles opposés sont égaux.\n\n" +
          "Méthode : on repère la position de l'angle cherché par rapport à l'angle connu.\n\n" +
          (total
            ? `Calcul : deux angles valent ${angle}° et les deux autres 180 − ${angle} = ${180 - angle}° ; ${angle} + ${180 - angle} + ${angle} + ${180 - angle} = 360.\n\n`
            : oppose
              ? `Calcul : les angles en ${n[X]} et en ${n[Y]} sont opposés : ils mesurent tous deux ${angle}°.\n\n`
              : `Calcul : les angles en ${n[X]} et en ${n[Y]} sont consécutifs : 180 − ${angle} = ${rep}.\n\n`) +
          `Conclusion : la réponse est ${rep}°.`,
        canvas: figure(n, aiguEnA ? "para" : "paraG", { angles: { [X]: `${angle}°` } }),
      };
    },
  },
  {
    kind: "template",
    id: "quadrilatere_parallelogramme_probleme_tpl_7",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_probleme",
    difficulty: 2,
    theme: "neutral",
    hint: "Surface : base × hauteur. Tour : 2 × (somme de deux côtés consécutifs).",
    tags: ["parallelogramme", "probleme", "template"],
    generate: () => {
      const n = tirerNom();
      const N = n.nom;
      const ter = randomChoice(TERRAINS);
      const aire = Math.random() < 0.5;
      if (aire) {
        const base = randomInt(ter.bmin, ter.bmax);
        const height = randomInt(ter.hmin, ter.hmax);
        const area = base * height;
        const t = randomInt(0, 2);
        const text =
          t === 0
            ? `${ter.intro(N)} Sa base mesure ${base} m et sa hauteur ${height} m. Quelle est sa surface, en m² ?`
            : t === 1
              ? `${ter.intro(N)} Calcule sa surface : base ${base} m, hauteur ${height} m.`
              : `${ter.intro(N)} Combien de mètres carrés mesure ${N}, avec une base de ${base} m et une hauteur de ${height} m ?`;
        return {
          text,
          format: "short",
          expected: [`${area} m²`],
          comparator: "number_equal",
          explanation:
            "Définition : la surface d'un parallélogramme est base × hauteur.\n\n" +
            "Méthode : on multiplie la base par la hauteur.\n\n" +
            `Calcul : ${base} × ${height} = ${fr(area)}.\n\n` +
            `Conclusion : la surface est ${fr(area)} m².`,
        };
      }
      const a = randomInt(ter.bmin, ter.bmax);
      let b = randomInt(ter.hmin + 1, ter.bmax);
      if (b === a) b = a + 1;
      const p = 2 * (a + b);
      const t = randomInt(0, 2);
      const text =
        t === 0
          ? `${ter.intro(N)} Deux côtés consécutifs mesurent ${a} m et ${b} m. Quel est son périmètre, en m ?`
          : t === 1
            ? `${ter.intro(N)} Combien de mètres parcourt-on en en faisant le tour, si ${sg(n, "AB")} = ${a} m et ${sg(n, "BC")} = ${b} m ?`
            : `${ter.intro(N)} Avec des côtés [${sg(n, "AB")}] et [${sg(n, "AD")}] de ${a} m et ${b} m, quelle est la longueur de son tour ?`;
      return {
        text,
        format: "short",
        expected: [`${p} m`],
        comparator: "number_equal",
        explanation:
          "Définition : dans un parallélogramme, les côtés opposés sont égaux.\n\n" +
          "Méthode : périmètre = 2 × (somme de deux côtés consécutifs).\n\n" +
          `Calcul : 2 × (${a} + ${b}) = ${p}.\n\n` +
          `Conclusion : le périmètre est ${p} m.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "quadrilatere_parallelogramme_probleme_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_probleme",
    difficulty: 4,
    theme: "neutral",
    // ⛔ 08/10/2026 : question ouverte à mots-clés → QCM sur les mêmes pièges.
    text: "Un terrain en forme de parallélogramme doit être à la fois clôturé et engazonné. Quelles grandeurs faut-il calculer ?",
    format: "qcm",
    choices: [
      "le périmètre pour la clôture, l’aire pour le gazon",
      "l’aire pour la clôture, le périmètre pour le gazon",
      "seulement l’aire, qui sert aux deux",
      "seulement le périmètre, qui sert aux deux",
    ],
    expected: ["le périmètre pour la clôture, l’aire pour le gazon"],
    comparator: "mcq_exact",
    hint: "Clôturer fait penser au tour, engazonner à la surface.",
    explanation:
      "Définition : le périmètre mesure le tour, l’aire mesure la surface.\n\n" +
      "Méthode : on relie chaque besoin à une grandeur.\n\n" +
      "Calcul : la clôture correspond au périmètre, le gazon à l’aire (base × hauteur).\n\n" +
      "Conclusion : il faut calculer le périmètre (clôture) et l’aire (gazon).",
    tags: ["parallelogramme", "probleme", "open"],
  },

  // ---------- PARA_DEFIS ----------
  {
    kind: "fixed",
    id: "quadrilatere_parallelogramme_defi_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle affirmation est correcte ?",
    format: "qcm",
    choices: [
      "Tout carré est un parallélogramme.",
      "Tout parallélogramme est un carré.",
      "Tout trapèze est un parallélogramme.",
      "Aucun losange n’est un parallélogramme.",
    ],
    expected: ["Tout carré est un parallélogramme."],
    comparator: "mcq_exact",
    hint: "Le carré est un cas très particulier de parallélogramme.",
    explanation:
      "Définition : un parallélogramme a ses côtés opposés parallèles deux à deux.\n\n" +
      "Méthode : on teste l’inclusion entre familles de quadrilatères.\n\n" +
      "Calcul : un carré a ses côtés opposés parallèles, donc c’est un parallélogramme ; l’inverse est faux.\n\n" +
      "Conclusion : « tout carré est un parallélogramme » est correcte.",
    tags: ["parallelogramme", "defi", "hierarchie", "qcm"],
  },
  {
    kind: "fixed",
    id: "quadrilatere_parallelogramme_defi_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un losange est-il toujours un parallélogramme ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Un losange a ses côtés opposés parallèles.",
    explanation:
      "Définition : un parallélogramme a ses côtés opposés parallèles deux à deux.\n\n" +
      "Méthode : on vérifie la définition pour le losange.\n\n" +
      "Calcul : un losange a ses côtés opposés parallèles, c’est donc un parallélogramme particulier.\n\n" +
      "Conclusion : oui, tout losange est un parallélogramme.",
    tags: ["parallelogramme", "defi", "losange", "qcm"],
  },
  {
    kind: "template",
    id: "quadrilatere_parallelogramme_defi_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Calcule chaque aire avec base × hauteur avant de comparer.",
    tags: ["parallelogramme", "defi", "comparaison", "template"],
    generate: () => {
      const [n1, n2] = deuxNoms();
      // ⛔ 03/10 : chaque situation a son unité ET sa plage (b : base, h : hauteur).
      const ctx = randomChoice([
        { avant: "Deux tuiles de mosaïque ont la forme de parallélogrammes.", u: "cm", b: [2, 9], h: [2, 7] },
        { avant: "Deux motifs de tissu sont des parallélogrammes.", u: "cm", b: [3, 12], h: [2, 9] },
        { avant: "Deux places de parking en épi sont dessinées sur un plan.", u: "m", b: [3, 7], h: [2, 5] },
        { avant: "Deux pièces de vitrail sont des parallélogrammes.", u: "cm", b: [5, 20], h: [4, 15] },
        { avant: "Deux parcelles de jardin ont la forme de parallélogrammes.", u: "m", b: [8, 30], h: [5, 20] },
        { avant: "Deux autocollants sont des parallélogrammes.", u: "cm", b: [3, 10], h: [2, 8] },
        { avant: "On trace deux parallélogrammes au tableau.", u: "dm", b: [3, 12], h: [2, 8] },
        { avant: "Deux champs ont la forme de parallélogrammes.", u: "m", b: [40, 120], h: [30, 90] },
      ]);
      const u = ctx.u;
      const bA = randomInt(ctx.b[0], ctx.b[1]);
      const hA = randomInt(ctx.h[0], ctx.h[1]);
      const bB = randomInt(ctx.b[0], ctx.b[1]);
      const hB = randomInt(ctx.h[0], ctx.h[1]);
      const aireA = bA * hA;
      const aireB = bB * hB;
      const cA = `le parallélogramme ${n1.nom}`;
      const cB = `le parallélogramme ${n2.nom}`;
      const egal = "les deux ont la même aire";
      const correct = aireA > aireB ? cA : aireB > aireA ? cB : egal;
      const t = randomInt(0, 2);
      const text =
        t === 0
          ? `${ctx.avant} ${n1.nom} : base ${bA} ${u}, hauteur ${hA} ${u}. ${n2.nom} : base ${bB} ${u}, hauteur ${hB} ${u}. Lequel a la plus grande aire ?`
          : t === 1
            ? `${ctx.avant} ${n1.nom} a une base de ${bA} ${u} pour une hauteur de ${hA} ${u}, et ${n2.nom} une base de ${bB} ${u} pour une hauteur de ${hB} ${u}. Lequel occupe le plus de place ?`
            : `${ctx.avant} Compare leurs aires : ${n1.nom} (base ${bA} ${u}, hauteur ${hA} ${u}) et ${n2.nom} (base ${bB} ${u}, hauteur ${hB} ${u}). Quelle est la bonne réponse ?`;
      return {
        text,
        format: "qcm",
        choices: [cA, cB, egal],
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : l’aire d’un parallélogramme est base × hauteur.\n\n" +
          "Méthode : on calcule chaque aire puis on compare.\n\n" +
          `Calcul : ${n1.nom} : ${bA} × ${hA} = ${aireA} ; ${n2.nom} : ${bB} × ${hB} = ${aireB}.\n\n` +
          `Conclusion : ${correct}.`,
      };
    },
  },
  {
    kind: "template",
    id: "quadrilatere_parallelogramme_defi_tpl_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Calcule l'aire du rectangle : c'est aussi celle du parallélogramme. Puis divise par la hauteur.",
    tags: ["parallelogramme", "defi", "inverse", "template"],
    generate: () => {
      const n = tirerNom();
      const N = n.nom;
      let base = 0, height = 0, L = 0, l = 0;
      do {
        base = randomInt(4, 15);
        height = randomInt(3, 10);
        const area = base * height;
        const diviseurs = [];
        for (let d = 2; d * d <= area; d++) if (area % d === 0) diviseurs.push(d);
        l = diviseurs.length ? randomChoice(diviseurs) : 0;
        L = l ? area / l : 0;
      } while (!l || L > 4 * l || (L === base && l === height) || (l === base && L === height));
      const area = base * height;
      // ⛔ 03/10 : des objets dont les dimensions réelles tiennent entre 2 et 30 cm.
      const objets = randomChoice([
        ["Une étiquette rectangulaire", "un autocollant en forme de parallélogramme"],
        ["Une plaque de verre rectangulaire", "une pièce de vitrail en forme de parallélogramme"],
        ["Un carton d'invitation rectangulaire", "un badge en forme de parallélogramme"],
        ["Un carreau de faïence rectangulaire", "un carreau de mosaïque en forme de parallélogramme"],
        ["Une carte postale", "un marque-page en forme de parallélogramme"],
      ]);
      const t = randomInt(0, 2);
      const text =
        t === 0
          ? `Un rectangle de ${L} cm sur ${l} cm et un parallélogramme ${N} ont la même aire. La hauteur de ${N} relative à [${sg(n, "AB")}] mesure ${height} cm. Quelle est la longueur ${sg(n, "AB")} ?`
          : t === 1
            ? `${objets[0]} de ${L} cm sur ${l} cm a la même aire qu'${objets[1]} ${N}. Si la hauteur de ${N} vaut ${height} cm, combien mesure sa base ?`
            : `On découpe un rectangle de ${L} cm par ${l} cm, puis on recompose ses morceaux en un parallélogramme ${N} de hauteur ${height} cm. Quelle est la base de ${N}, en cm ?`;
      return {
        text,
        format: "short",
        expected: [`${base} cm`],
        comparator: "number_equal",
        explanation:
          "Définition : aire du rectangle = longueur × largeur ; aire du parallélogramme = base × hauteur.\n\n" +
          "Méthode : les deux aires sont égales, donc base = aire ÷ hauteur.\n\n" +
          `Calcul : ${L} × ${l} = ${area}, puis ${area} ÷ ${height} = ${base}.\n\n` +
          `Conclusion : la base mesure ${base} cm.`,
      };
    },
  },
  {
    kind: "template",
    id: "quadrilatere_parallelogramme_defi_tpl_6",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Si la base est multipliée par k et la hauteur par m, l'aire est multipliée par k × m.",
    tags: ["parallelogramme", "defi", "raisonnement", "template"],
    generate: () => {
      const n = tirerNom();
      const N = n.nom;
      const mots: Record<number, string> = { 1: "", 2: "double", 3: "triple", 4: "quadruple" };
      let k = 1, m = 1;
      do {
        k = randomInt(1, 4);
        m = randomInt(1, 4);
      } while (k * m === 1);
      const base = randomInt(3, 10);
      const height = randomInt(2, 8);
      const aire = base * height;
      const nouvelle = aire * k * m;
      const action = [
        k > 1 ? `on ${mots[k]} sa base` : "",
        m > 1 ? `on ${mots[m]} sa hauteur` : "",
      ].filter(Boolean).join(" et ") + (k === 1 ? " sans changer sa base" : m === 1 ? " sans changer sa hauteur" : "");
      const avecNombres = Math.random() < 0.5;
      const t = randomInt(0, 1);
      const text = avecNombres
        ? t === 0
          ? `Le parallélogramme ${N} a une base de ${base} cm et une hauteur de ${height} cm. Si ${action}, quelle sera sa nouvelle aire, en cm² ?`
          : `Le parallélogramme ${N} a une aire de ${aire} cm². Si ${action}, quelle est sa nouvelle aire ?`
        : t === 0
          ? `On transforme le parallélogramme ${N} : ${action}. Par combien son aire est-elle multipliée ?`
          : `Un graphiste agrandit un logo en forme de parallélogramme ${N} : ${action}. Par quel nombre l'aire du logo est-elle multipliée ?`;
      const rep = avecNombres ? nouvelle : k * m;
      return {
        text,
        format: "short",
        expected: [avecNombres ? `${rep} cm²` : String(rep)],
        comparator: "number_equal",
        explanation:
          "Définition : l'aire d'un parallélogramme est base × hauteur.\n\n" +
          `Méthode : la base est multipliée par ${k} et la hauteur par ${m}, donc l'aire est multipliée par ${k} × ${m} = ${k * m}.\n\n` +
          (avecNombres ? `Calcul : aire de départ ${base} × ${height} = ${aire}, puis ${aire} × ${k * m} = ${nouvelle}.\n\n` : `Calcul : ${k} × ${m} = ${k * m}.\n\n`) +
          `Conclusion : ${avecNombres ? `la nouvelle aire est ${nouvelle} cm²` : `l'aire est multipliée par ${k * m}`}.`,
      };
    },
  },
  {
    kind: "template",
    id: "quadrilatere_parallelogramme_defi_tpl_7",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Un carré est à la fois un rectangle et un losange ; tous trois sont des parallélogrammes.",
    tags: ["parallelogramme", "defi", "hierarchie", "template"],
    generate: () => {
      const familles = ["carré", "rectangle", "losange", "parallélogramme"];
      const X = randomChoice(familles);
      const Y = randomChoice(familles.filter((f) => f !== X));
      // Tout X est un Y si X est le carré, ou si Y est le parallélogramme.
      const vrai = X === "carré" || Y === "parallélogramme";
      const n = tirerNom();
      const N = n.nom;
      const objetsDe: Record<string, string[]> = {
        "carré": ["une case d'échiquier", "un carreau de faïence", "un post-it"],
        rectangle: ["une porte de garage", "un écran de télévision", "une feuille A4"],
        losange: ["un cerf-volant en losange", "un panneau « route prioritaire »", "une maille de grillage"],
        "parallélogramme": ["une place de parking en épi", "une tuile de mosaïque", "le cadre d'un pantographe"],
      };
      const obj = randomChoice(objetsDe[X]);
      const t = randomInt(0, 3);
      const vf = t === 1;
      const text =
        t === 0
          ? `Le quadrilatère ${N} est un ${X}. Est-il forcément un ${Y} ?`
          : t === 1
            ? `Vrai ou faux : « tout ${X} est un ${Y} ».`
            : t === 2
              ? `On modélise ${obj} par un ${X} ${N}. Peut-on affirmer que ${N} est aussi un ${Y} ?`
              : (() => {
                  const e = randomChoice(ELEVES);
                  return `${e.p} affirme : « ${N} est un ${X}, donc c'est un ${Y}. » A-t-${e.il} raison à coup sûr ?`;
                })();
      const raison: Record<string, string> = {
        "carré": "un carré a quatre angles droits et quatre côtés égaux : c'est à la fois un rectangle, un losange et un parallélogramme",
        rectangle: "un rectangle a ses côtés opposés parallèles (c'est un parallélogramme), mais pas forcément quatre côtés égaux",
        losange: "un losange a ses côtés opposés parallèles (c'est un parallélogramme), mais pas forcément d'angle droit",
        "parallélogramme": "un parallélogramme n'a ni forcément d'angle droit ni forcément quatre côtés égaux",
      };
      return {
        text,
        format: "qcm",
        choices: vf ? ["vrai", "faux"] : ["oui", "non"],
        expected: [vf ? (vrai ? "vrai" : "faux") : vrai ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation:
          "Définition : rectangle, losange et carré sont des parallélogrammes particuliers ; le carré est à la fois rectangle et losange.\n\n" +
          "Méthode : un cas particulier hérite de toutes les propriétés de la famille plus large, pas l'inverse.\n\n" +
          `Ici : ${raison[X]}.\n\n` +
          `Conclusion : ${vrai ? `tout ${X} est un ${Y}.` : `un ${X} n'est pas toujours un ${Y}.`}`,
      };
    },
  },
  {
    kind: "fixed",
    id: "quadrilatere_parallelogramme_defi_open_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_defi",
    difficulty: 5,
    theme: "neutral",
    // ⛔ 08/10/2026 : question ouverte à mots-clés → QCM sur les mêmes pièges.
    text: "Pourquoi un rectangle est-il un parallélogramme, alors qu’un parallélogramme n’est pas toujours un rectangle ?",
    format: "qcm",
    choices: [
      "le rectangle a ses côtés opposés parallèles, et en plus quatre angles droits qu’un parallélogramme n’a pas forcément",
      "le rectangle a quatre côtés égaux, le parallélogramme non",
      "le parallélogramme a toujours des angles droits, le rectangle non",
      "les diagonales d’un parallélogramme sont toujours égales, pas celles d’un rectangle",
    ],
    expected: ["le rectangle a ses côtés opposés parallèles, et en plus quatre angles droits qu’un parallélogramme n’a pas forcément"],
    comparator: "mcq_exact",
    hint: "Pense à ce qui distingue le rectangle : ses angles.",
    explanation:
      "Définition : un parallélogramme a ses côtés opposés parallèles deux à deux.\n\n" +
      "Méthode : on compare les propriétés des deux figures.\n\n" +
      "Calcul : un rectangle a en plus quatre angles droits, ce qui n’est pas exigé pour un parallélogramme.\n\n" +
      "Conclusion : tout rectangle est un parallélogramme, mais un parallélogramme sans angles droits n’est pas un rectangle.",
    tags: ["parallelogramme", "defi", "open"],
  },
  {
    kind: "fixed",
    id: "quadrilatere_parallelogramme_defi_open_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_defi",
    difficulty: 5,
    theme: "neutral",
    // ⛔ 08/10/2026 : question ouverte à mots-clés → QCM sur les mêmes pièges.
    text: "Pourquoi peut-on transformer un parallélogramme en rectangle de même aire pour calculer son aire ?",
    format: "qcm",
    choices: [
      "on découpe un triangle d’un côté et on le recolle de l’autre : on obtient un rectangle de même base et de même hauteur",
      "on redresse le parallélogramme : son côté incliné devient la hauteur du rectangle",
      "un rectangle de même périmètre a toujours la même aire",
      "on multiplie les deux côtés du parallélogramme, comme pour un rectangle",
    ],
    expected: ["on découpe un triangle d’un côté et on le recolle de l’autre : on obtient un rectangle de même base et de même hauteur"],
    comparator: "mcq_exact",
    hint: "On découpe un triangle d’un côté pour le recoller de l’autre.",
    explanation:
      "Définition : l’aire d’un parallélogramme est base × hauteur.\n\n" +
      "Méthode : on découpe un triangle d’un côté du parallélogramme et on le déplace de l’autre côté.\n\n" +
      "Calcul : on obtient un rectangle de mêmes base et hauteur, donc de même aire base × hauteur.\n\n" +
      "Conclusion : c’est pourquoi l’aire vaut base × hauteur, comme pour le rectangle obtenu.",
    tags: ["parallelogramme", "defi", "open", "aire"],
  },
];
