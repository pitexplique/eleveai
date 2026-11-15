// GABARITS « FIGURES PLANES » CM2 (15/11/2026) : reconnaître, triangles,
// quadrilatères, cercle, propriétés, construire, défis.
//
// Jumeau du CM1 (cm1/maths/figures-planes-outils.ts), monté au niveau CM2 :
// diagonales (même longueur, perpendiculaires, se coupent en leur milieu),
// côtés parallèles, triangle rectangle isocèle, rayon / diamètre décimaux,
// programmes de construction, périmètres à deux étapes à ★3+.
//
// ⛔ CM2 = zéro clavier : que des QCM (3 ou 4 choix), leurres = vraies erreurs
// d'élève (rayon et diamètre confondus, carré « pas un rectangle », losange =
// carré penché, diagonales du losange « égales », compas ouvert au diamètre…).
// ⭐ Chaque gabarit tire une SITUATION (objet, métier) × une TOURNURE × des
// nombres : le squelette change même quand les noms de points sont neutralisés
// (`mesurer-squelettes-coach.ts … --lettres`).
// ⭐ Les dessins passent par le canvas `construction` (coordonnées de maths,
// cadre ajusté seul) : polygone, petits carrés des angles droits, petits traits
// des longueurs égales, diagonales codées, longueurs écrites sur les côtés.

import type { CanvasFigure, TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { figureConstruction, point, polygoneRegulier, surCercle, type P } from "@/lib/canvas/construction";
import { LETTRES, atelier, entre, etapes, fr, melange, qcm, qcmN as qcmNBrut, tournure, un } from "@/lib/tutor-v4/questionBank/cm1/maths/trous-outils";

/* ═════════════════ nombres ═════════════════ */

/** Les longueurs vont au demi près : un leurre arrondi (38 ÷ 3 ≈ 12,7) se repère
 *  tout de suite comme faux. On ne garde que les leurres exacts au demi. */
const qcmN = (juste: number, faux: number[], u = "", pas = 1) =>
  qcmNBrut(juste, faux.filter((v) => Math.abs(v * 2 - Math.round(v * 2)) < 1e-6), u, pas);

/** Une longueur au demi près (3 ; 3,5 ; 4…), entre a et b. */
const demi = (a: number, b: number) => entre(2 * a, 2 * b) / 2;
/** Arrondi au dixième, pour que 2 × 3,5 reste 7 et pas 7,000000001. */
const r1 = (v: number) => Math.round(v * 10) / 10;

/* ═════════════════ dessins ═════════════════ */

const lettres = (n: number) => melange([...LETTRES]).slice(0, n);

type Forme =
  | "carre" | "rectangle" | "losange" | "parallelogramme" | "trapeze" | "quadri"
  | "triRect" | "triRectIso" | "isocele" | "equilateral" | "triQuelconque"
  | "pentagone" | "hexagone" | "octogone";

const SOMMETS: Record<Forme, () => P[]> = {
  carre: () => [point(0, 0), point(4, 0), point(4, 4), point(0, 4)],
  rectangle: () => { const l = un([2.2, 2.6, 3]); return [point(0, 0), point(6, 0), point(6, l), point(0, l)]; },
  losange: () => { const h = un([1.7, 2.1, 2.4]); return [point(0, -h), point(3.3, 0), point(0, h), point(-3.3, 0)]; },
  parallelogramme: () => [point(0, 0), point(5, 0), point(6.5, 3), point(1.5, 3)],
  trapeze: () => [point(0, 0), point(6, 0), point(4.5, 3), point(1.5, 3)],
  quadri: () => [point(0, 0), point(5.5, 0.4), point(4.6, 3.4), point(0.8, 2.6)],
  triRect: () => { const h = un([3, 3.5, 4]); return [point(0, 0), point(5, 0), point(0, h)]; },
  triRectIso: () => [point(0, 0), point(4.2, 0), point(0, 4.2)],
  isocele: () => { const h = un([4, 4.6, 5.2]); return [point(-2.4, 0), point(2.4, 0), point(0, h)]; },
  equilateral: () => polygoneRegulier(3, 3, 90),
  triQuelconque: () => [point(0, 0), point(6, 0), point(1.6, 3.4)],
  pentagone: () => polygoneRegulier(5, 3, 90),
  hexagone: () => polygoneRegulier(6, 3, 90),
  octogone: () => polygoneRegulier(8, 3, 112.5),
};

const tourner = (ps: P[], deg: number): P[] => {
  const c = { x: ps.reduce((s, p) => s + p.x, 0) / ps.length, y: ps.reduce((s, p) => s + p.y, 0) / ps.length };
  const a = (deg * Math.PI) / 180;
  return ps.map((p) => ({ x: c.x + (p.x - c.x) * Math.cos(a) - (p.y - c.y) * Math.sin(a), y: c.y + (p.x - c.x) * Math.sin(a) + (p.y - c.y) * Math.cos(a) }));
};

type OptsPoly = {
  /** Noms des sommets ; absents = sommets sans nom (dessin d'objet). */
  noms?: string[];
  /** Indices des sommets qui portent un petit carré. */
  droits?: number[];
  /** [indice du côté, nombre de petits traits] ; le côté i va du sommet i au sommet i + 1. */
  codes?: Array<[number, number]>;
  /** Longueurs écrites sur les côtés. */
  textes?: Record<number, string>;
  /** Segments en plus (diagonales, plis), par indices de sommets. */
  traits?: Array<[number, number]>;
  rot?: number;
  description?: string;
};

type Seg = { a: string; b: string; code?: number; texte?: string; couleur?: string; epais?: boolean; pointille?: boolean; sansTrait?: boolean };
type Ang = { sommet: string; de: string; vers: string; droit?: boolean };

/** Le codage complet d'une figure usuelle (ce que l'élève doit lire). */
const CODAGE: Partial<Record<Forme, Pick<OptsPoly, "droits" | "codes">>> = {
  carre: { droits: [0, 1, 2, 3], codes: [[0, 1], [1, 1], [2, 1], [3, 1]] },
  rectangle: { droits: [0, 1, 2, 3] },
  losange: { codes: [[0, 1], [1, 1], [2, 1], [3, 1]] },
  triRect: { droits: [0] },
  triRectIso: { droits: [0], codes: [[0, 1], [2, 1]] },
  isocele: { codes: [[1, 1], [2, 1]] },
  equilateral: { codes: [[0, 1], [1, 1], [2, 1]] },
};

/** Les morceaux d'un polygone (points, côtés codés, angles droits), décalé de dx. */
function morceaux(forme: Forme, o: OptsPoly, pre = "", dx?: number) {
  let ps = SOMMETS[forme]();
  const rot = o.rot ?? un([0, 0, 0, -12, 10, 18, -20]);
  if (rot) ps = tourner(ps, rot);
  if (dx !== undefined) { const m = Math.min(...ps.map((p) => p.x)); ps = ps.map((p) => ({ x: p.x - m + dx, y: p.y })); }
  const n = ps.length;
  const ids = ps.map((_, i) => o.noms?.[i] ?? `${pre}S${i}`);
  const pts: Record<string, P> = Object.fromEntries(ids.map((id, i) => [id, ps[i]]));
  const segments: Seg[] = [];
  for (let i = 0; i < n; i++) {
    const code = o.codes?.find((c) => c[0] === i)?.[1];
    const texte = o.textes?.[i];
    if (code || texte) segments.push({ a: ids[i], b: ids[(i + 1) % n], ...(code ? { code } : {}), ...(texte ? { texte } : {}) });
  }
  for (const [a, b] of o.traits ?? []) segments.push({ a: ids[a], b: ids[b] });
  const angles: Ang[] = (o.droits ?? []).map((i) => ({ sommet: ids[i], de: ids[(i + n - 1) % n], vers: ids[(i + 1) % n], droit: true }));
  return { ps, ids, pts, segments, angles };
}

/** Un polygone tracé : sommets, codage, longueurs écrites. */
function poly(forme: Forme, o: OptsPoly = {}): CanvasFigure {
  const m = morceaux(forme, o);
  return figureConstruction(m.pts, { polygones: [{ sommets: m.ids }], segments: m.segments, angles: m.angles, ...(o.description ? { description: o.description } : {}) }, o.noms ? [] : m.ids) as CanvasFigure;
}

/** La figure usuelle avec son codage complet. */
const code = (forme: Forme, o: OptsPoly = {}) => poly(forme, { ...CODAGE[forme], ...o });

/** Deux figures codées côte à côte (comparer deux familles). */
function duo(f1: Forme, f2: Forme): CanvasFigure {
  const m1 = morceaux(f1, { ...CODAGE[f1], rot: 0 }, "a", 0);
  const m2 = morceaux(f2, { ...CODAGE[f2], rot: 0 }, "b", Math.max(...m1.ps.map((p) => p.x)) + 2);
  const ids = [...m1.ids, ...m2.ids];
  return figureConstruction({ ...m1.pts, ...m2.pts }, { polygones: [{ sommets: m1.ids }, { sommets: m2.ids }], segments: [...m1.segments, ...m2.segments], angles: [...m1.angles, ...m2.angles] }, ids) as CanvasFigure;
}

/** Point d'intersection des droites (ab) et (cd). */
function inter(a: P, b: P, c: P, d: P): P {
  const den = (a.x - b.x) * (c.y - d.y) - (a.y - b.y) * (c.x - d.x);
  const t = ((a.x - c.x) * (c.y - d.y) - (a.y - c.y) * (c.x - d.x)) / den;
  return { x: a.x + t * (b.x - a.x), y: a.y + t * (b.y - a.y) };
}

type FormeDiag = "carre" | "rectangle" | "losange" | "parallelogramme";
type OptsDiag = { noms?: string[]; centre?: string; codage?: boolean; texteDiag?: string; texteDemi?: string; rot?: number };

/** Un quadrilatère et ses deux diagonales, codées (moitiés égales, angle droit au centre). */
function diagonales(forme: FormeDiag, o: OptsDiag = {}): CanvasFigure {
  const m = morceaux(forme, { ...(o.codage === false ? {} : CODAGE[forme]), noms: o.noms, rot: o.rot ?? un([0, 0, -10, 12]) });
  const c = o.centre ?? "O";
  const [A, B, C, D] = m.ids;
  const O = inter(m.ps[0], m.ps[2], m.ps[1], m.ps[3]);
  const pts: Record<string, P> = { ...m.pts, [c]: O };
  const egales = forme === "carre" || forme === "rectangle";
  const c1 = 1, c2 = egales ? 1 : 2;
  const segments: Seg[] = [
    ...m.segments,
    { a: A, b: c, code: c1, couleur: "#2563eb", ...(o.texteDemi ? { texte: o.texteDemi } : {}) }, { a: c, b: C, code: c1, couleur: "#2563eb" },
    { a: B, b: c, code: c2, couleur: "#2563eb" }, { a: c, b: D, code: c2, couleur: "#2563eb" },
    ...(o.texteDiag ? [{ a: B, b: D, texte: o.texteDiag, sansTrait: true }] : []),
  ];
  const angles: Ang[] = [...m.angles, ...(forme === "carre" || forme === "losange" ? [{ sommet: c, de: A, vers: B, droit: true }] : [])];
  return figureConstruction(pts, { polygones: [{ sommets: m.ids }], segments, angles }, o.noms ? [] : [...m.ids, c]) as CanvasFigure;
}

type OptsRond = {
  montrer?: "rayon" | "diametre" | "corde" | "centre" | "cercle" | "disque" | "aucun";
  texte?: string;
  centre?: string;
  noms?: [string, string];
  deg?: number;
};

const ROUGE = "#dc2626";

/** Un cercle de centre nommé, avec un élément mis en couleur. */
function rond(o: OptsRond = {}): CanvasFigure {
  const c = o.centre ?? "O";
  const [a, b] = o.noms ?? ["A", "B"];
  const deg = o.deg ?? un([0, 20, 35, -25, 160, 200]);
  const m = o.montrer ?? "aucun";
  const pts: Record<string, P> = { [c]: point(0, 0) };
  const segments: Seg[] = [];
  if (m === "rayon") { pts[a] = surCercle(point(0, 0), 1, deg); segments.push({ a: c, b: a, couleur: ROUGE, epais: true, ...(o.texte ? { texte: o.texte } : {}) }); }
  if (m === "diametre") { pts[a] = surCercle(point(0, 0), 1, deg); pts[b] = surCercle(point(0, 0), 1, deg + 180); segments.push({ a, b, couleur: ROUGE, epais: true, ...(o.texte ? { texte: o.texte } : {}) }); }
  if (m === "corde") { pts[a] = surCercle(point(0, 0), 1, deg); pts[b] = surCercle(point(0, 0), 1, deg + 110); segments.push({ a, b, couleur: ROUGE, epais: true }); }
  return {
    kind: "construction",
    points: Object.entries(pts).map(([id, p]) => ({ id, x: p.x, y: p.y, ...(id === c && m === "centre" ? { couleur: ROUGE } : {}) })),
    cercles: [{ centre: c, rayon: 1, ...(m === "cercle" ? { couleur: ROUGE } : {}), ...(m === "disque" ? { fond: "rgba(220, 38, 38, 0.22)" } : {}) }],
    segments,
  } as CanvasFigure;
}

/** Un cercle (rayon écrit) et un point M dedans, dessus ou dehors. */
function rondPoint(ou: "dedans" | "sur" | "dehors", c: string, m: string, texteR: string, texteM: string): CanvasFigure {
  const k = ou === "dedans" ? 0.55 : ou === "sur" ? 1 : 1.55;
  return {
    kind: "construction",
    points: [{ id: c, x: 0, y: 0 }, { id: "R", x: surCercle(point(0, 0), 1, 200).x, y: surCercle(point(0, 0), 1, 200).y, cache: true }, { id: m, ...surCercle(point(0, 0), k, 30) }],
    cercles: [{ centre: c, rayon: 1 }],
    segments: [{ a: c, b: "R", couleur: ROUGE, epais: true, texte: texteR }, { a: c, b: m, pointille: true, texte: texteM }],
  } as CanvasFigure;
}

/** n cercles de même rayon alignés dans une boîte, un rayon écrit. */
function rangee(n: number, texte: string, boite = true): CanvasFigure {
  const pts: { id: string; x: number; y: number; cache?: boolean }[] = [];
  const cercles: { centre: string; rayon: number }[] = [];
  for (let i = 0; i < n; i++) { pts.push({ id: `O${i}`, x: 1 + 2 * i, y: 1, cache: true }); cercles.push({ centre: `O${i}`, rayon: 1 }); }
  pts.push({ id: "R", x: 2, y: 1, cache: true });
  const coins = [point(0, 0), point(2 * n, 0), point(2 * n, 2), point(0, 2)].map((p, i) => ({ id: `K${i}`, x: p.x, y: p.y, cache: true }));
  return {
    kind: "construction",
    points: [...pts, ...(boite ? coins : [])],
    cercles,
    polygones: boite ? [{ sommets: ["K0", "K1", "K2", "K3"], fond: "rgba(0,0,0,0)" }] : [],
    segments: [{ a: "O0", b: "R", couleur: ROUGE, epais: true, texte }],
  } as CanvasFigure;
}

/** Un cercle juste dans un carré (galette dans sa boîte). */
function rondDansCarre(texte: string, diametre: boolean): CanvasFigure {
  return {
    kind: "construction",
    points: [
      { id: "O", x: 0, y: 0 }, { id: "A", x: diametre ? -1 : 1, y: 0, cache: true }, { id: "B", x: 1, y: 0, cache: true },
      ...[[-1, -1], [1, -1], [1, 1], [-1, 1]].map(([x, y], i) => ({ id: `K${i}`, x, y, cache: true })),
    ],
    cercles: [{ centre: "O", rayon: 1 }],
    polygones: [{ sommets: ["K0", "K1", "K2", "K3"], fond: "rgba(0,0,0,0)" }],
    angles: [{ sommet: "K0", de: "K3", vers: "K1", droit: true }],
    segments: [{ a: diametre ? "A" : "O", b: "B", couleur: ROUGE, epais: true, texte }],
  } as CanvasFigure;
}

/* ═════════════════ situations ═════════════════ */

/** [qui fait quoi, objet au démonstratif, unité vraisemblable] : la figure dessinée est l'objet. */
const SITU: [string, string, string][] = [
  ["Une couturière découpe", "ce fanion", "cm"], ["Un menuisier scie", "cette planchette", "cm"], ["Une architecte dessine", "ce toit", "m"],
  ["Un marin hisse", "cette voile", "m"], ["Une graphiste dessine", "ce logo", "cm"], ["Un pâtissier découpe", "ce biscuit", "cm"],
  ["Une élève découpe", "cette pièce de puzzle", "cm"], ["Un jardinier trace", "ce massif de fleurs", "m"], ["Une carreleuse pose", "ce carreau", "cm"],
  ["Un vitrier coupe", "cette vitre", "dm"], ["Une ingénieure dessine", "cette pièce de pont", "m"], ["Une modéliste découpe", "ce patron", "cm"],
  ["Un paysagiste trace", "cette pelouse", "m"], ["Une décoratrice colle", "cet autocollant", "cm"], ["Un forgeron soude", "cette plaque", "dm"],
  ["Une géomètre relève", "ce terrain", "m"], ["Un ébéniste ponce", "ce plateau de table", "cm"], ["Une styliste coud", "cette pièce de tissu", "cm"],
  ["Un encadreur prépare", "ce cadre", "cm"], ["Un maçon coule", "cette dalle", "m"], ["Une photographe recadre", "cette photo", "cm"],
  ["Un cuisinier découpe", "cette part de lasagnes", "cm"], ["Une urbaniste dessine", "cette place", "m"], ["Un plombier découpe", "cette plaque de métal", "cm"],
];
export const intro = () => { const [q, o, u] = un(SITU); return { phrase: `${q} ${o}.`, objet: o, u }; };

/** Objets ronds, au démonstratif, avec une unité et un rayon vraisemblables. */
const RONDS: [string, string, string, number, number][] = [
  ["Un mécanicien répare", "cette roue de vélo", "cm", 20, 35], ["Une horlogère règle", "cette horloge", "cm", 10, 25], ["Un pâtissier décore", "cette tarte", "cm", 10, 16],
  ["Une architecte dessine", "ce rond-point", "m", 10, 30], ["Un archer vise", "cette cible", "cm", 10, 30], ["Une musicienne frappe", "ce tambour", "cm", 10, 30],
  ["Un jardinier creuse", "ce bassin", "m", 2, 6], ["Une gymnaste saute sur", "ce trampoline", "dm", 10, 20], ["Un forain repeint", "ce manège", "m", 4, 9],
  ["Un cuisinier pose", "cette assiette", "cm", 10, 14], ["Un marin regarde par", "ce hublot", "cm", 15, 30], ["Un serveur essuie", "cette table ronde", "cm", 40, 70],
  ["Une clown entre sur", "cette piste de cirque", "m", 5, 7], ["Un boulanger cuit", "cette galette", "cm", 10, 20], ["Une potière tourne", "ce vase vu de dessus", "cm", 5, 12],
  ["Une astronome observe", "ce cadran solaire", "cm", 20, 50], ["Un pizzaïolo étale", "cette pizza", "cm", 12, 20], ["Une fleuriste tresse", "cette couronne de fleurs", "cm", 15, 30],
  ["Un éleveur clôture", "cet enclos rond", "m", 5, 15], ["Une ingénieure dessine", "cette éolienne vue de face", "m", 20, 45],
];
export const introRond = () => { const [q, o, u, a, b] = un(RONDS); return { phrase: `${q} ${o}.`, objet: o, u, r: () => entre(a, b) }; };

const PRENOMS = ["Léo", "Inès", "Noah", "Jade", "Sami", "Lina", "Hugo", "Maya", "Adam", "Zoé", "Nina", "Tom", "Yanis", "Chloé", "Ilyes", "Rose", "Malo", "Aya"];
export const METIERS: string[] = ["Une architecte", "Un menuisier", "Une couturière", "Un carreleur", "Une élève", "Un dessinateur", "Une ingénieure", "Un jardinier", "Une graphiste", "Un maçon", "Une paysagiste", "Un charpentier", "Une peintre", "Un géomètre", "Une styliste", "Un ébéniste"];

/* ═════════════════ noms ═════════════════ */

const NOM_TRI = { triRect: "Un triangle rectangle", isocele: "Un triangle isocèle", equilateral: "Un triangle équilatéral", triQuelconque: "Un triangle quelconque" } as const;
type FormeTri = keyof typeof NOM_TRI;
const NOM_QUAD = { carre: "Un carré", rectangle: "Un rectangle", losange: "Un losange", quadri: "Un quadrilatère quelconque" } as const;
type FormeQuad = keyof typeof NOM_QUAD;
const NOM_COTES: Record<number, string> = { 3: "Un triangle", 4: "Un quadrilatère", 5: "Un pentagone", 6: "Un hexagone", 8: "Un octogone" };
const FORME_COTES: Record<number, Forme[]> = { 3: ["triRect", "isocele", "equilateral", "triQuelconque"], 4: ["carre", "rectangle", "losange", "trapeze", "parallelogramme", "quadri"], 5: ["pentagone"], 6: ["hexagone"], 8: ["octogone"] };
/** « de » ou « d' » devant le mot. */
const de = (mot: string) => (/^[aeiouéèh]/i.test(mot) ? "d'" : "de ");
const bas = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);
const sansPoint = (s: string) => s.replace(/\.$/, "");
const PRECIS = ["Quel est son nom le plus précis ?", "Donne son nom le plus précis.", "Quel nom précis lui donner ?", "Nomme cette figure le plus précisément possible."];

/** Un objet de la vie et sa forme : [objet, forme dessinée, nom général, nom le plus précis]. */
const OBJETS_FORMES: [string, Forme | "rond", string, string][] = [
  ["Un panneau « stop »", "octogone", "Un octogone", "Un octogone"], ["Un panneau « danger »", "equilateral", "Un triangle", "Un triangle équilatéral"],
  ["Un écrou", "hexagone", "Un hexagone", "Un hexagone"], ["Une alvéole d'abeille", "hexagone", "Un hexagone", "Un hexagone"],
  ["Un cerf-volant", "losange", "Un quadrilatère", "Un losange"], ["Un carreau de chocolat", "carre", "Un quadrilatère", "Un carré"],
  ["Un terrain de basket", "rectangle", "Un quadrilatère", "Un rectangle"], ["Une porte", "rectangle", "Un quadrilatère", "Un rectangle"],
  ["Un carreau de carrelage", "carre", "Un quadrilatère", "Un carré"], ["Le cadran d'une horloge", "rond", "Un cercle", "Un cercle"],
  ["Une équerre", "triRect", "Un triangle", "Un triangle rectangle"], ["Un échiquier", "carre", "Un quadrilatère", "Un carré"],
  ["Une feuille de cahier", "rectangle", "Un quadrilatère", "Un rectangle"], ["Un panneau « cédez le passage »", "equilateral", "Un triangle", "Un triangle équilatéral"],
  ["Le logo d'un club", "pentagone", "Un pentagone", "Un pentagone"], ["Une roue", "rond", "Un cercle", "Un cercle"],
  ["Une pièce de tangram", "triRectIso", "Un triangle", "Un triangle rectangle isocèle"], ["Une part de sandwich coupée en diagonale", "triRectIso", "Un triangle", "Un triangle rectangle isocèle"],
  ["Un écran de téléphone", "rectangle", "Un quadrilatère", "Un rectangle"], ["Un kiosque vu de dessus", "octogone", "Un octogone", "Un octogone"],
];

const dessinObjet = (f: Forme | "rond") => (f === "rond" ? rond({ montrer: "aucun" }) : code(f, { rot: f === "losange" ? 90 : 0 }));

/* ═════════════════ figure_reconnaitre ═════════════════ */

const R = atelier("cm2", "figure_plane", "figure_reconnaitre", "cm2_");
const HINT_R = "Compte les côtés, puis lis le codage : petits carrés et petits traits.";

export const reconnaitreGabarits: TutorBankItemV4[] = [
  R(10, 1, "3 côtés : triangle ; 4 : quadrilatère ; 5 : pentagone ; 6 : hexagone ; 8 : octogone.", () => {
    const n = un([3, 4, 5, 6, 8]);
    const s = intro();
    return {
      text: tournure([s.phrase], ["Compte ses côtés.", "Regarde bien ses côtés.", "Compte ses sommets.", ""], ["Comment s'appelle cette figure ?", "Quel est le nom de cette forme ?", "Quelle figure reconnais-tu ?", "Quel polygone est-ce ?"]),
      ...qcm(NOM_COTES[n], Object.values(NOM_COTES)),
      canvas: poly(un(FORME_COTES[n])),
      explanation: etapes("on compte les côtés de la figure.", `elle a ${n} côtés.`, `c'est ${bas(NOM_COTES[n])}.`),
    };
  }),
  R(11, 1, "Un sommet est un coin de la figure : un polygone a autant de sommets que de côtés.", () => {
    const n = un([3, 4, 5, 6, 8]);
    const quoi = un(["côtés", "sommets"]);
    const s = intro();
    return {
      text: tournure([s.phrase], [`Combien de ${quoi} a cette figure ?`, `Compte ses ${quoi}. Combien y en a-t-il ?`, `Combien de ${quoi} vois-tu ?`, `Combien de ${quoi} possède ce polygone ?`]),
      ...qcmN(n, [n - 1, n + 1, n + 2, 2 * n]),
      canvas: poly(un(FORME_COTES[n]), { noms: lettres(n) }),
      explanation: etapes(`on compte les ${quoi} un par un.`, `il y en a ${n}.`, `la figure a ${n} ${quoi}.`),
    };
  }),
  R(12, 1, "Regarde la forme de l'objet : compte ses côtés, ou cherche un bord rond.", () => {
    const [obj, f, juste] = un(OBJETS_FORMES);
    return {
      text: tournure([`Regarde ce dessin : ${bas(obj)}.`, `Voici ${bas(obj)}, vu de face.`, `On a dessiné ${bas(obj)}.`, `${obj} est dessiné${/^Une /.test(obj) ? "e" : ""} ici.`], ["Quelle figure reconnais-tu ?", "Quelle est sa forme ?", "À quelle figure ressemble-t-il ?".replace("il ?", /^Une /.test(obj) ? "elle ?" : "il ?")]),
      ...qcm(juste, ["Un triangle", "Un quadrilatère", "Un pentagone", "Un hexagone", "Un octogone", "Un cercle"]),
      canvas: dessinObjet(f),
      explanation: etapes("on compte les côtés de la forme.", juste === "Un cercle" ? "le bord est rond, sans côté droit." : `on reconnaît ${bas(juste)}.`, `c'est ${bas(juste)}.`),
    };
  }),
  R(13, 2, HINT_R, () => {
    const tri = Math.random() < 0.45;
    const f = tri ? un<FormeTri>(["triRect", "isocele", "equilateral", "triQuelconque"]) : un<FormeQuad>(["carre", "rectangle", "losange", "quadri"]);
    const nom = tri ? NOM_TRI[f as FormeTri] : NOM_QUAD[f as FormeQuad];
    const s = intro();
    return {
      text: tournure([s.phrase], ["Lis le codage.", "Regarde les petits traits et les petits carrés.", "Observe les marques.", ""], PRECIS),
      ...qcm(nom, tri ? Object.values(NOM_TRI) : Object.values(NOM_QUAD)),
      canvas: code(f),
      explanation: etapes("on lit le codage : petits carrés = angles droits, petits traits = côtés égaux.", `le codage correspond à ${bas(nom)}.`, `c'est ${bas(nom)}.`),
    };
  }),
  R(14, 2, "Lis chaque propriété et cherche la figure qui les a toutes.", () => {
    const [desc, juste, f] = un<[string, string, Forme | "rond"]>([
      ["Elle a 4 côtés égaux et 4 angles droits.", "Un carré", "carre"],
      ["Elle a 4 angles droits et des côtés opposés égaux, mais pas tous égaux.", "Un rectangle", "rectangle"],
      ["Elle a 4 côtés égaux et aucun angle droit.", "Un losange", "losange"],
      ["Elle a 3 côtés et un angle droit.", "Un triangle rectangle", "triRect"],
      ["Elle a 3 côtés de même longueur.", "Un triangle équilatéral", "equilateral"],
      ["Elle a 3 côtés, dont 2 seulement de même longueur.", "Un triangle isocèle", "isocele"],
      ["Elle a 6 côtés.", "Un hexagone", "hexagone"],
      ["Elle a 5 côtés.", "Un pentagone", "pentagone"],
      ["Elle a 8 côtés.", "Un octogone", "octogone"],
      ["Elle n'a pas de côté droit : tous ses points sont à la même distance du centre.", "Un cercle", "rond"],
    ]);
    const s = f === "rond" ? introRond() : intro();
    return {
      text: tournure([`${sansPoint(s.phrase)}, une figure plane.`, s.phrase], [desc], ["De quelle figure s'agit-il ?", "Quel est son nom ?", "Quelle figure est-ce ?", "Comment s'appelle cette figure ?"]),
      // Les leurres viennent de la MÊME famille (sinon « un hexagone » trahit le rectangle).
      ...qcm(juste, juste.includes("triangle") ? ["Un triangle rectangle", "Un triangle équilatéral", "Un triangle isocèle", "Un triangle quelconque"]
        : ["Un carré", "Un rectangle", "Un losange"].includes(juste) ? ["Un carré", "Un rectangle", "Un losange", "Un quadrilatère quelconque"]
        : ["Un pentagone", "Un hexagone", "Un octogone", "Un quadrilatère", "Un cercle"]),
      canvas: dessinObjet(f),
      explanation: etapes("on lit les propriétés une par une.", desc, `c'est ${bas(juste)}.`),
    };
  }),
  R(15, 2, "Compare les longueurs écrites, puis regarde les angles droits.", () => {
    const f = un<"carre" | "rectangle" | "losange">(["carre", "rectangle", "losange"]);
    const s = intro(), u = s.u;
    const a = demi(3, 12);
    let b = demi(2, 9); while (b === a) b = demi(2, 9);
    const L = f === "rectangle" ? [a, b, a, b] : [a, a, a, a];
    const droits = f === "losange" ? "Il n'a aucun angle droit." : "Ses 4 angles sont droits.";
    return {
      text: tournure([s.phrase], [`Ses côtés mesurent ${L.map(fr).join(` ${u}, `)} ${u}.`, `Ses quatre côtés mesurent ${L.map(fr).join(` ${u}, `)} ${u}.`], [droits], PRECIS),
      ...qcm(NOM_QUAD[f], [NOM_QUAD.carre, NOM_QUAD.rectangle, NOM_QUAD.losange, "Un triangle"]),
      canvas: poly(f, { droits: f === "losange" ? [] : [0, 1, 2, 3], textes: { 0: `${fr(L[0])} ${u}`, 1: `${fr(L[1])} ${u}` } }),
      explanation: etapes("on compare les longueurs et on regarde les angles.", f === "carre" ? "4 côtés égaux et 4 angles droits." : f === "rectangle" ? `4 angles droits, côtés de ${fr(a)} ${u} et ${fr(b)} ${u}.` : "4 côtés égaux, pas d'angle droit.", `c'est ${bas(NOM_QUAD[f])}.`),
    };
  }),
  R(16, 3, "Un polygone est fermé et n'a que des côtés droits.", () => {
    const f = un<Forme | "rond">(["rond", "rond", "triQuelconque", "hexagone", "pentagone", "octogone", "rectangle", "losange"]);
    const n = f === "rond" ? 0 : SOMMETS[f]().length;
    const juste = f === "rond" ? "Non : son bord est courbe." : `Oui : c'est un polygone à ${n} côtés.`;
    const faux = f === "rond"
      ? ["Oui : c'est un polygone sans côté.", "Oui : c'est un polygone à 1 côté.", "Non : il lui faut au moins 5 côtés."]
      : [`Oui : c'est un polygone à ${n + 1} côtés.`, "Non : son bord est courbe.", `Non : il faut au moins ${n + 2} côtés.`, `Oui : c'est un polygone à ${n - 1} côtés.`];
    const s = f === "rond" ? introRond() : intro();
    const p = un(PRENOMS);
    return {
      text: tournure([s.phrase], [`${p} se demande si c'est un polygone.`, `${p} demande : « Est-ce un polygone ? »`, "Cette figure est-elle un polygone ?"], ["Que réponds-tu ?", "Quelle est la bonne réponse ?", ""]),
      ...qcm(juste, faux),
      canvas: dessinObjet(f),
      explanation: etapes("un polygone est une figure fermée faite de segments.", f === "rond" ? "le cercle n'a aucun côté droit." : `on compte ${n} côtés droits.`, juste),
    };
  }),
  R(17, 3, "Le nom d'une figure dépend de ses propriétés, pas de sa position.", () => {
    const [f, rot, juste, quoi] = un<[Forme, number, string, string]>([
      ["carre", 45, "Un carré", "ses 4 côtés sont égaux et ses 4 angles sont droits"],
      ["carre", 30, "Un carré", "ses 4 côtés sont égaux et ses 4 angles sont droits"],
      ["rectangle", 35, "Un rectangle", "ses 4 angles sont droits"],
      ["rectangle", 70, "Un rectangle", "ses 4 angles sont droits"],
      ["losange", 0, "Un losange", "ses 4 côtés sont égaux, sans angle droit"],
      ["triRect", 135, "Un triangle rectangle", "il a un angle droit"],
      ["triRectIso", 45, "Un triangle rectangle isocèle", "il a un angle droit et 2 côtés égaux"],
    ]);
    const s = intro();
    return {
      text: tournure([s.phrase], ["Le dessin est penché.", "On l'a dessiné de travers.", "Le dessin est tourné."], ["Lis le codage."], PRECIS),
      ...qcm(juste, ["Un carré", "Un losange", "Un rectangle", "Un triangle rectangle", "Un triangle rectangle isocèle", "Un quadrilatère quelconque"].filter((x) => (juste.includes("triangle") ? x !== "Un quadrilatère quelconque" : !x.includes("isocèle")))),
      canvas: code(f, { rot }),
      explanation: etapes("on oublie la position et on lit le codage.", `${quoi}.`, `c'est ${bas(juste)}.`),
    };
  }),
  R(18, 3, "Le nom le plus précis dit TOUTES les propriétés de la forme.", () => {
    const [obj, f, , juste] = un(OBJETS_FORMES.filter((x) => x[2] !== x[3]));
    return {
      text: tournure([`Regarde ce dessin : ${bas(obj)}.`, `Voici ${bas(obj)}, vu de face.`, `On a dessiné ${bas(obj)}.`], ["Lis le codage.", ""], ["Quel est le nom le plus précis de sa forme ?", "Quelle est sa forme exacte ?", "Donne le nom le plus précis de sa forme."]),
      ...qcm(juste, juste.includes("triangle") ? ["Un triangle quelconque", "Un triangle rectangle", "Un triangle isocèle", "Un triangle équilatéral", "Un triangle rectangle isocèle"] : ["Un quadrilatère quelconque", "Un carré", "Un rectangle", "Un losange"]),
      canvas: dessinObjet(f),
      explanation: etapes("on lit le codage du dessin.", `on reconnaît ${bas(juste)}.`, `le nom le plus précis est ${bas(juste)}.`),
    };
  }),
];

/* ═════════════════ figure_triangle ═════════════════ */

const T = atelier("cm2", "figure_plane", "figure_triangle", "cm2_");
const HINT_T = "Petit carré : un angle droit. Mêmes petits traits : mêmes longueurs.";

export const triangleGabarits: TutorBankItemV4[] = [
  T(10, 1, HINT_T, () => {
    const f = un<FormeTri>(["triRect", "isocele", "equilateral", "triQuelconque"]);
    const s = intro();
    return {
      text: tournure([s.phrase], ["Lis le codage.", "Regarde les petits traits et les petits carrés.", "Observe les marques.", ""], ["Quel est le nom le plus précis de ce triangle ?", "Donne le nom le plus précis de ce triangle.", "Nomme ce triangle le plus précisément possible."]),
      ...qcm(NOM_TRI[f], Object.values(NOM_TRI)),
      canvas: code(f),
      explanation: etapes("on lit le codage.", f === "triRect" ? "un petit carré : un angle droit." : f === "isocele" ? "deux côtés portent le même trait : 2 côtés égaux." : f === "equilateral" ? "les trois côtés portent le même trait." : "aucun angle droit, aucun côté codé égal.", `c'est ${bas(NOM_TRI[f])}.`),
    };
  }),
  T(11, 1, "Le petit carré est dessiné dans le coin de l'angle droit.", () => {
    const ls = lettres(3);
    const s = intro();
    return {
      text: tournure([`${sansPoint(s.phrase)}, un triangle ${ls.join("")}.`], ["Il a un angle droit.", "Regarde le petit carré.", ""], ["En quel sommet est l'angle droit ?", "Quel sommet porte l'angle droit ?", "Où se trouve l'angle droit ?"]),
      ...qcm(`En ${ls[0]}`, [`En ${ls[1]}`, `En ${ls[2]}`, "Il n'y en a pas"]),
      canvas: poly("triRect", { noms: ls, droits: [0] }),
      explanation: etapes("on cherche le petit carré.", `il est au sommet ${ls[0]}.`, `l'angle droit est en ${ls[0]}.`),
    };
  }),
  T(12, 1, "Compte les côtés qui portent le même petit trait.", () => {
    const f = un<FormeTri>(["isocele", "equilateral", "triQuelconque", "triRect"]);
    const n = f === "equilateral" ? 3 : f === "isocele" ? 2 : 0;
    const s = intro();
    return {
      text: tournure([`${sansPoint(s.phrase)}, un triangle.`], ["Lis le codage.", "Regarde les petits traits.", ""], ["Combien de côtés de même longueur a-t-il ?", "Combien de ses côtés sont codés égaux ?", "Combien a-t-il de côtés égaux ?"]),
      ...qcm(n === 0 ? "Aucun" : String(n), ["Aucun", "1", "2", "3"]),
      canvas: code(f),
      explanation: etapes("on compte les côtés qui portent le même petit trait.", n === 0 ? "aucun côté n'est codé." : `${n} côtés portent le même trait.`, n === 0 ? "aucun côté égal codé." : `${n} côtés égaux.`),
    };
  }),
  T(13, 2, "Compare les trois longueurs : 2 égales, 3 égales ou toutes différentes ?", () => {
    const f = un<FormeTri>(["isocele", "isocele", "equilateral", "equilateral", "triQuelconque"]);
    const s = intro(), u = s.u;
    const a = demi(4, 12);
    let b = demi(3, 9); while (b === a || b >= 2 * a) b = demi(3, 9);
    const L = f === "equilateral" ? [a, a, a] : f === "isocele" ? [b, a, a] : [r1(a + 2.5), r1(a + 1), a];
    return {
      text: tournure([s.phrase], [`Ses côtés mesurent ${melange(L.map(fr)).join(` ${u}, `)} ${u}.`, `Ses trois côtés mesurent ${melange(L.map(fr)).join(` ${u}, `)} ${u}.`, `Les longueurs des côtés sont ${melange(L.map(fr)).join(` ${u}, `)} ${u}.`], PRECIS),
      ...qcm(NOM_TRI[f], [NOM_TRI.isocele, NOM_TRI.equilateral, NOM_TRI.triQuelconque, NOM_TRI.triRect]),
      canvas: poly(f, { textes: { 0: `${fr(L[0])} ${u}`, 1: `${fr(L[1])} ${u}`, 2: `${fr(L[2])} ${u}` } }),
      explanation: etapes("on compare les longueurs des trois côtés.", f === "equilateral" ? "les 3 côtés ont la même longueur." : f === "isocele" ? "2 côtés seulement ont la même longueur." : "les 3 longueurs sont différentes.", `c'est ${bas(NOM_TRI[f])}.`),
    };
  }),
  T(14, 2, "Les côtés qui portent le même petit trait ont la même longueur.", () => {
    const f = un<"isocele" | "equilateral">(["isocele", "equilateral"]);
    const ls = lettres(3);
    const s = intro(), u = s.u;
    const a = demi(4, 15);
    let b = demi(3, 12); while (b === a || b >= 2 * a) b = demi(3, 12);
    const connu = `[${ls[1]}${ls[2]}]`, cherche = `[${ls[2]}${ls[0]}]`;
    return {
      text: tournure([s.phrase], f === "isocele" ? [`${connu} mesure ${fr(a)} ${u} et [${ls[0]}${ls[1]}] mesure ${fr(b)} ${u}.`, `Le côté ${connu} mesure ${fr(a)} ${u}, la base [${ls[0]}${ls[1]}] ${fr(b)} ${u}.`] : [`${connu} mesure ${fr(a)} ${u}.`, `Le côté ${connu} mesure ${fr(a)} ${u}.`], [`Combien mesure ${cherche} ?`, `Quelle est la longueur de ${cherche} ?`, `Lis le codage : combien mesure ${cherche} ?`]),
      ...qcmN(a, f === "isocele" ? [b, r1(a + b), 2 * a, r1(a + 1)] : [2 * a, 3 * a, r1(a + 1), r1(a / 2)], u, 0.5),
      canvas: code(f, { noms: ls, textes: (f === "isocele" ? { 0: `${fr(b)} ${u}`, 1: `${fr(a)} ${u}` } : { 1: `${fr(a)} ${u}` }) as Record<number, string> }),
      explanation: etapes(`${cherche} porte le même petit trait que ${connu}.`, `ils ont la même longueur : ${fr(a)} ${u}.`, `${cherche} mesure ${fr(a)} ${u}.`),
    };
  }),
  T(15, 2, "Le côté opposé à un sommet est celui qui ne passe pas par ce sommet.", () => {
    const ls = lettres(3);
    const k = entre(0, 2);
    const S = ls[k], X = ls[(k + 1) % 3], Y = ls[(k + 2) % 3];
    const s = intro();
    return {
      text: tournure([`${sansPoint(s.phrase)}, un triangle ${ls.join("")}.`], [`Quel côté est opposé au sommet ${S} ?`, `Quel côté est en face du sommet ${S} ?`, `Quel côté ne touche pas le sommet ${S} ?`]),
      ...qcm(`[${X}${Y}]`, [`[${S}${X}]`, `[${S}${Y}]`]),
      canvas: poly(un<Forme>(["triQuelconque", "isocele", "triRect"]), { noms: ls }),
      explanation: etapes("le côté opposé ne passe pas par le sommet.", `[${X}${Y}] relie les deux autres sommets.`, `le côté opposé à ${S} est [${X}${Y}].`),
    };
  }),
  T(16, 2, HINT_T, () => {
    const f = un<"triRect" | "isocele" | "equilateral" | "triRectIso">(["triRect", "isocele", "equilateral", "triRectIso"]);
    const VRAI = { triRect: "Il a un angle droit.", isocele: "Il a deux côtés de même longueur.", equilateral: "Ses trois côtés ont la même longueur.", triRectIso: "Il a un angle droit et deux côtés égaux." };
    const FAUX = {
      triRect: ["Il a trois côtés égaux.", "Il a deux angles droits.", "Il a quatre sommets.", "Il n'a aucun angle droit."],
      isocele: ["Il a un angle droit.", "Ses trois côtés ont la même longueur.", "Il a quatre côtés.", "Tous ses côtés sont différents."],
      equilateral: ["Il a un angle droit.", "Ses trois côtés sont différents.", "Il a quatre sommets.", "Un seul côté est codé."],
      triRectIso: ["Il a deux angles droits.", "Ses trois côtés sont égaux.", "Il n'a aucun angle droit.", "Il a un angle droit et trois côtés égaux."],
    };
    const s = intro();
    return {
      text: tournure([s.phrase], ["Quelle phrase est vraie pour ce triangle ?", "Quelle phrase décrit bien ce triangle ?", "Que montre le codage de ce triangle ?", "Quelle affirmation est juste ?"]),
      ...qcm(VRAI[f], FAUX[f]),
      canvas: code(f),
      explanation: etapes("on lit les petits carrés et les petits traits.", VRAI[f], bas(VRAI[f])),
    };
  }),
  T(17, 3, "Le tour d'un triangle : on additionne ses 3 côtés. Les côtés codés égaux sont égaux.", () => {
    const f = un<"isocele" | "equilateral">(["isocele", "equilateral", "equilateral"]);
    const s = intro(), u = s.u;
    const a = demi(3, 15);
    let b = demi(2, 12); while (b === a || b >= 2 * a) b = demi(2, 12);
    const p = f === "equilateral" ? r1(3 * a) : r1(2 * a + b);
    return {
      text: tournure([`${sansPoint(s.phrase)} : un triangle ${f === "equilateral" ? "équilatéral" : "isocèle"}.`], f === "equilateral" ? [`Un côté mesure ${fr(a)} ${u}.`, `Son côté mesure ${fr(a)} ${u}.`] : [`Ses deux côtés égaux mesurent ${fr(a)} ${u} ; sa base ${fr(b)} ${u}.`, `Les côtés codés mesurent ${fr(a)} ${u}, le troisième ${fr(b)} ${u}.`], ["Quel est son périmètre ?", "Combien mesure son tour ?", "Quelle longueur de ruban faut-il pour en faire le tour ?"]),
      ...qcmN(p, f === "equilateral" ? [r1(2 * a), r1(a + 3), r1(4 * a), a] : [r1(a + b), r1(2 * b + a), r1(3 * a), r1(2 * a)], u, 0.5),
      canvas: code(f, { textes: f === "equilateral" ? { 0: `${fr(a)} ${u}` } : { 0: `${fr(b)} ${u}`, 1: `${fr(a)} ${u}` } }),
      explanation: etapes("on additionne les 3 côtés.", f === "equilateral" ? `3 × ${fr(a)} = ${fr(p)}.` : `${fr(a)} + ${fr(a)} + ${fr(b)} = ${fr(p)}.`, `le périmètre mesure ${fr(p)} ${u}.`),
    };
  }),
  T(18, 3, "Un triangle équilatéral a 3 côtés égaux : il a donc AUSSI 2 côtés égaux.", () => {
    const [qst, juste, faux, f] = un<[string, string, string[], Forme]>([
      ["Un triangle équilatéral est-il isocèle ?", "Oui : il a au moins 2 côtés égaux.", ["Non : il a 3 côtés égaux, pas 2.", "Non : un isocèle a un angle droit.", "On ne peut pas savoir."], "equilateral"],
      ["Un triangle peut-il avoir deux angles droits ?", "Non : les deux côtés ne se rejoindraient jamais.", ["Oui : s'il est rectangle.", "Oui : s'il est isocèle.", "Oui : s'il est très grand."], "triRect"],
      ["Un triangle rectangle peut-il être isocèle ?", "Oui : ses deux côtés de l'angle droit peuvent être égaux.", ["Non : un rectangle n'a pas de côtés égaux.", "Non : il faudrait 2 angles droits.", "Oui : à condition d'avoir 3 côtés égaux."], "triRectIso"],
      ["Un triangle isocèle est-il toujours équilatéral ?", "Non : son troisième côté peut être différent.", ["Oui : il a des côtés égaux.", "Oui : il a 3 côtés.", "Non : il n'a aucun côté égal."], "isocele"],
      ["Un triangle rectangle est-il un rectangle ?", "Non : c'est un triangle qui a un angle droit.", ["Oui : il a des angles droits.", "Oui : il a 4 côtés.", "Non : il n'a aucun angle droit."], "triRect"],
    ]);
    const p = un(PRENOMS);
    return {
      text: tournure([`${p} se demande :`, `${p} pose la question :`, `${p} hésite :`, `Au tableau, ${p} demande :`], [`« ${qst} »`], ["Que réponds-tu ?", "Quelle est la bonne réponse ?", "Que faut-il répondre ?", ""]),
      ...qcm(juste, faux),
      canvas: code(f),
      explanation: etapes("on vérifie les propriétés une par une.", juste, "le nom suit les propriétés du triangle."),
    };
  }),
  T(19, 4, "Retire du tour ce qui est connu, puis partage entre les côtés égaux.", () => {
    const cas = un(["equi", "iso", "iso", "base"]);
    const s = intro(), u = s.u;
    if (cas === "equi") {
      const a = demi(3, 20);
      const p = r1(3 * a);
      return {
        text: tournure([`${sansPoint(s.phrase)} : un triangle équilatéral.`], [`Son périmètre est de ${fr(p)} ${u}.`, `Il faut ${fr(p)} ${u} de ruban pour en faire le tour.`, `Son tour mesure ${fr(p)} ${u}.`], ["Combien mesure un côté ?", "Quelle est la longueur d'un côté ?"]),
        ...qcmN(a, [r1(p / 2), r1(p / 4), r1(p - 3)], u, 0.5),
        canvas: code("equilateral"),
        explanation: etapes("les 3 côtés sont égaux.", `${fr(p)} ÷ 3 = ${fr(a)}.`, `un côté mesure ${fr(a)} ${u}.`),
      };
    }
    const a = entre(4, 20);
    const b = cas === "base" ? demi(2, Math.min(15, 2 * a - 2)) : entre(2, Math.min(15, 2 * a - 2));
    const p = r1(2 * a + b);
    if (cas === "base") {
      return {
        text: tournure([`${sansPoint(s.phrase)} : un triangle isocèle.`], [`Son périmètre est de ${fr(p)} ${u} ; ses deux côtés égaux mesurent ${a} ${u}.`, `Son tour mesure ${fr(p)} ${u} et chaque côté codé ${a} ${u}.`], ["Combien mesure la base ?", "Quelle est la longueur du troisième côté ?"]),
        ...qcmN(b, [r1(p - a), r1(p / 3), r1(p - 2 * a + 1), r1(2 * a)], u, 0.5),
        canvas: code("isocele", { textes: { 1: `${a} ${u}` } }),
        explanation: etapes("on retire les deux côtés égaux du tour.", `${fr(p)} − ${a} − ${a} = ${fr(b)}.`, `la base mesure ${fr(b)} ${u}.`),
      };
    }
    return {
      text: tournure([`${sansPoint(s.phrase)} : un triangle isocèle.`], [`Son tour mesure ${fr(p)} ${u} et sa base ${fr(b)} ${u}.`, `Son périmètre est ${fr(p)} ${u} ; le côté différent mesure ${fr(b)} ${u}.`], ["Combien mesure chacun des deux côtés égaux ?", "Quelle est la longueur d'un côté égal ?"]),
      ...qcmN(a, [r1(p - b), r1((p - b) / 2 + b), r1(p / 3), r1(a + b)], u, 0.5),
      canvas: code("isocele", { textes: { 0: `${fr(b)} ${u}` } }),
      explanation: etapes(`on retire la base : ${fr(p)} − ${fr(b)} = ${fr(r1(p - b))}.`, `on partage en 2 : ${fr(r1(p - b))} ÷ 2 = ${a}.`, `chaque côté égal mesure ${a} ${u}.`),
    };
  }),
  T(20, 4, "Un angle droit ET deux côtés égaux : on dit les deux propriétés.", () => {
    const f = un<"triRectIso" | "triRect" | "isocele" | "equilateral">(["triRectIso", "triRectIso", "triRect", "isocele", "equilateral"]);
    const NOM = { triRectIso: "Un triangle rectangle isocèle", triRect: "Un triangle rectangle", isocele: "Un triangle isocèle", equilateral: "Un triangle équilatéral" };
    const ls = lettres(3);
    const s = intro(), u = s.u;
    const a = demi(3, 12);
    const desc = {
      triRectIso: [`L'angle en ${ls[0]} est droit et [${ls[0]}${ls[1]}] = [${ls[0]}${ls[2]}] = ${fr(a)} ${u}.`, `Il a un angle droit en ${ls[0]}, et ses côtés [${ls[0]}${ls[1]}] et [${ls[0]}${ls[2]}] mesurent ${fr(a)} ${u}.`],
      triRect: [`L'angle en ${ls[0]} est droit, [${ls[0]}${ls[1]}] mesure ${fr(r1(a + 1.5))} ${u} et [${ls[0]}${ls[2]}] ${fr(a)} ${u}.`],
      isocele: [`[${ls[1]}${ls[2]}] et [${ls[2]}${ls[0]}] mesurent ${fr(a)} ${u} ; il n'a pas d'angle droit.`],
      equilateral: [`Ses trois côtés mesurent ${fr(a)} ${u}.`],
    }[f];
    return {
      text: tournure([`${sansPoint(s.phrase)}, un triangle ${ls.join("")}.`], desc, PRECIS),
      ...qcm(NOM[f], Object.values(NOM)),
      canvas: code(f, { noms: ls }),
      explanation: etapes("on liste toutes les propriétés : angle droit ? côtés égaux ?", f === "triRectIso" ? "un angle droit et 2 côtés égaux." : f === "triRect" ? "un angle droit, côtés différents." : f === "isocele" ? "2 côtés égaux, pas d'angle droit." : "3 côtés égaux.", `c'est ${bas(NOM[f])}.`),
    };
  }),
];

/* ═════════════════ figure_quadrilatere ═════════════════ */

const Q = atelier("cm2", "figure_plane", "figure_quadrilatere", "cm2_");
const HINT_Q = "Carré : 4 angles droits ET 4 côtés égaux. Rectangle : 4 angles droits. Losange : 4 côtés égaux.";

export const quadrilatereGabarits: TutorBankItemV4[] = [
  Q(10, 1, HINT_Q, () => {
    const f = un<FormeQuad>(["carre", "carre", "rectangle", "rectangle", "losange", "losange", "quadri"]);
    const s = intro();
    const pointe = f === "carre" && Math.random() < 0.4;
    return {
      text: tournure([s.phrase], ["Lis le codage.", "Regarde les petits carrés et les petits traits.", "Observe les marques.", ""], ["Quel est le nom le plus précis de ce quadrilatère ?", "Donne le nom le plus précis de cette figure.", "Nomme ce quadrilatère le plus précisément possible."]),
      ...qcm(NOM_QUAD[f], Object.values(NOM_QUAD)),
      canvas: code(f, pointe ? { rot: 45 } : {}),
      explanation: etapes("on lit le codage, même si la figure est penchée.", f === "carre" ? "4 angles droits et 4 côtés égaux." : f === "rectangle" ? "4 angles droits, côtés pas tous égaux." : f === "losange" ? "4 côtés égaux, pas d'angle droit." : "ni angle droit, ni côtés égaux codés.", `c'est ${bas(NOM_QUAD[f])}.`),
    };
  }),
  Q(11, 1, "Regarde les coins : un petit carré = un angle droit.", () => {
    const [f, quoi, n] = un<[FormeQuad, string, number]>([["carre", "angles droits", 4], ["carre", "côtés égaux", 4], ["rectangle", "angles droits", 4], ["losange", "côtés égaux", 4], ["losange", "angles droits", 0], ["rectangle", "sommets", 4], ["losange", "sommets", 4], ["carre", "diagonales", 2]]);
    const nom = bas(NOM_QUAD[f]).replace(/^un /, "");
    const s = intro();
    return {
      text: tournure([`${sansPoint(s.phrase)}, en forme de ${nom}.`], [`Combien ${de(quoi)}${quoi} a ce ${nom} ?`, `Combien ${de(quoi)}${quoi} compte ce ${nom} ?`, `Ce ${nom} a combien ${de(quoi)}${quoi} ?`]),
      ...qcmN(n, n === 0 ? [1, 2, 4] : [2, 3, 1, 8]),
      canvas: code(f),
      explanation: etapes(`on lit le dessin du ${nom}.`, n === 0 ? "aucun coin ne porte de petit carré." : `on en compte ${n}.`, `ce ${nom} a ${n} ${quoi}.`),
    };
  }),
  Q(12, 1, "Une diagonale relie deux sommets opposés (qui ne se suivent pas).", () => {
    const ls = lettres(4);
    const s = intro();
    const k = entre(0, 1);
    return {
      text: tournure([`${sansPoint(s.phrase)}, un quadrilatère ${ls.join("")}.`], ["Quel segment est une diagonale ?", "Lequel de ces segments est une diagonale ?", "Quelle est l'une de ses diagonales ?"]),
      ...qcm(`[${ls[k]}${ls[k + 2]}]`, [`[${ls[0]}${ls[1]}]`, `[${ls[1]}${ls[2]}]`, `[${ls[2]}${ls[3]}]`, `[${ls[3]}${ls[0]}]`]),
      canvas: poly(un<Forme>(["carre", "rectangle", "losange", "quadri", "parallelogramme"]), { noms: ls }),
      explanation: etapes("une diagonale ne suit pas un côté : elle traverse la figure.", `${ls[k]} et ${ls[k + 2]} sont des sommets opposés.`, `[${ls[k]}${ls[k + 2]}] est une diagonale.`),
    };
  }),
  Q(13, 2, HINT_Q, () => {
    const [f, ind] = un<[FormeQuad, string[]]>([
      ["rectangle", ["Il a 4 angles droits, mais ses côtés ne sont pas tous égaux.", "Ses 4 angles sont droits ; ses côtés ne sont pas tous égaux."]],
      ["carre", ["Il a 4 angles droits et 4 côtés égaux.", "Ses 4 côtés sont égaux et ses 4 angles sont droits."]],
      ["losange", ["Il a 4 côtés égaux et aucun angle droit.", "Ses 4 côtés sont égaux, mais il n'a pas d'angle droit."]],
      ["quadri", ["Il n'a ni angle droit, ni côtés égaux.", "Ses 4 côtés sont différents et il n'a pas d'angle droit."]],
    ]);
    const s = intro();
    return {
      text: tournure([`${sansPoint(s.phrase)}, un quadrilatère.`], ind, PRECIS),
      ...qcm(NOM_QUAD[f], [NOM_QUAD.carre, NOM_QUAD.rectangle, NOM_QUAD.losange, NOM_QUAD.quadri, NOM_COTES[3]]),
      canvas: code(f),
      explanation: etapes("on lit les propriétés : angles droits, côtés égaux.", ind[0], `c'est ${bas(NOM_QUAD[f])}.`),
    };
  }),
  Q(14, 2, "Dans un rectangle, les côtés opposés ont la même longueur.", () => {
    const f = un<"rectangle" | "carre" | "losange">(["rectangle", "rectangle", "carre", "losange"]);
    const ls = lettres(4);
    const s = intro(), u = s.u;
    const L = demi(5, 18);
    let l = demi(2, 9); while (l >= L) l = demi(2, 9);
    const nom = bas(NOM_QUAD[f]).replace(/^un /, "");
    const cherche = un([2, 3]);
    const cote = (i: number) => `[${ls[i]}${ls[(i + 1) % 4]}]`;
    const rep = f === "rectangle" ? (cherche === 2 ? L : l) : L;
    const donne = f === "rectangle" ? `${cote(0)} mesure ${fr(L)} ${u} et ${cote(1)} mesure ${fr(l)} ${u}.` : `${cote(0)} mesure ${fr(L)} ${u}.`;
    return {
      text: tournure([`${sansPoint(s.phrase)}, un ${nom} ${ls.join("")}.`], [donne], [`Combien mesure ${cote(cherche)} ?`, `Quelle est la longueur de ${cote(cherche)} ?`, `Trouve la longueur de ${cote(cherche)}.`]),
      ...qcmN(rep, f === "rectangle" ? [rep === L ? l : L, r1(L + l), r1(2 * rep)] : [r1(L * 2), r1(L * 4), r1(L / 2)], u, 0.5),
      canvas: code(f, { noms: ls, textes: f === "rectangle" ? { 0: `${fr(L)} ${u}`, 1: `${fr(l)} ${u}` } : { 0: `${fr(L)} ${u}` } }),
      explanation: etapes(f === "rectangle" ? "dans un rectangle, les côtés opposés sont égaux." : `les 4 côtés d'un ${nom} sont égaux.`, f === "rectangle" ? `${cote(cherche)} est en face de ${cote(cherche - 2)}.` : `${cote(cherche)} mesure comme ${cote(0)}.`, `${cote(cherche)} mesure ${fr(rep)} ${u}.`),
    };
  }),
  Q(15, 2, "Deux côtés parallèles ne se croisent jamais, même prolongés.", () => {
    const [f, n] = un<[Forme, number]>([["rectangle", 2], ["carre", 2], ["losange", 2], ["parallelogramme", 2], ["trapeze", 1], ["trapeze", 1], ["quadri", 0]]);
    const s = intro();
    return {
      text: tournure([`${sansPoint(s.phrase)}, un quadrilatère.`], ["Regarde ses côtés opposés.", ""], ["Combien de paires de côtés parallèles a-t-il ?", "Combien compte-t-il de paires de côtés parallèles ?", "Combien de fois deux côtés opposés sont-ils parallèles ?"]),
      ...qcm(String(n), ["0", "1", "2", "4"]),
      canvas: poly(f, { rot: 0, ...(CODAGE[f] ?? {}) }),
      explanation: etapes("on regarde les côtés opposés, deux par deux.", n === 2 ? "les deux paires de côtés opposés sont parallèles." : n === 1 ? "seuls le côté du haut et celui du bas sont parallèles." : "aucune paire de côtés n'est parallèle.", `${n} paire${n > 1 ? "s" : ""} de côtés parallèles.`),
    };
  }),
  Q(16, 3, "Rectangle : diagonales de même longueur. Losange : diagonales perpendiculaires. Carré : les deux.", () => {
    const f = un<FormeDiag>(["rectangle", "losange", "carre", "parallelogramme"]);
    const VRAI: Record<FormeDiag, string> = {
      rectangle: "Ses diagonales ont la même longueur.",
      losange: "Ses diagonales sont perpendiculaires.",
      carre: "Ses diagonales ont la même longueur et sont perpendiculaires.",
      parallelogramme: "Ses diagonales se coupent en leur milieu.",
    };
    const FAUX: Record<FormeDiag, string[]> = {
      rectangle: ["Ses diagonales sont toujours perpendiculaires.", "Ses diagonales ne se coupent pas.", "Une diagonale est deux fois plus longue que l'autre."],
      losange: ["Ses diagonales ont toujours la même longueur.", "Ses diagonales ne se coupent pas.", "Il n'a qu'une seule diagonale."],
      carre: ["Ses diagonales sont perpendiculaires, mais de longueurs différentes.", "Ses diagonales ont la même longueur, mais ne sont pas perpendiculaires.", "Ses diagonales ne se coupent pas."],
      parallelogramme: ["Ses diagonales sont toujours perpendiculaires.", "Ses diagonales ont toujours la même longueur.", "Ses diagonales ne se coupent pas."],
    };
    const nom = { rectangle: "rectangle", losange: "losange", carre: "carré", parallelogramme: "parallélogramme" }[f];
    const s = intro();
    return {
      text: tournure([`${sansPoint(s.phrase)} : c'est un ${nom}.`], ["On a tracé ses diagonales.", "Ses deux diagonales sont tracées en bleu.", ""], ["Quelle phrase est vraie ?", "Que peut-on dire de ses diagonales ?", "Quelle propriété ont ses diagonales ?"]),
      ...qcm(VRAI[f], FAUX[f]),
      canvas: diagonales(f),
      explanation: etapes(`on lit le codage des diagonales du ${nom}.`, VRAI[f], `c'est une propriété du ${nom}.`),
    };
  }),
  Q(17, 3, "Les diagonales d'un rectangle ont la même longueur et se coupent en leur milieu.", () => {
    const ls = lettres(4);
    const o = un(LETTRES.filter((x) => !ls.includes(x)));
    const s = intro(), u = s.u;
    const d = un([entre(6, 30), demi(6, 30)]);
    const cas = un(["autre", "moitie", "moitie"]);
    const [A, B, C, D] = ls;
    const rep = cas === "autre" ? d : r1(d / 2);
    const q = cas === "autre" ? `Combien mesure [${B}${D}] ?` : un([`Combien mesure [${o}${A}] ?`, `Combien mesure [${o}${B}] ?`]);
    return {
      text: tournure([`${sansPoint(s.phrase)}, un rectangle ${ls.join("")}.`], [`Ses diagonales se coupent en ${o}. La diagonale [${A}${C}] mesure ${fr(d)} ${u}.`, `[${A}${C}] mesure ${fr(d)} ${u} ; les diagonales se croisent en ${o}.`], [q]),
      ...qcmN(rep, cas === "autre" ? [r1(d / 2), r1(2 * d), r1(d + 1)] : [d, r1(2 * d), r1(d / 4)], u, 0.5),
      canvas: diagonales("rectangle", { noms: ls, centre: o }),
      explanation: etapes("dans un rectangle, les diagonales ont la même longueur et se coupent en leur milieu.", cas === "autre" ? `[${B}${D}] mesure comme [${A}${C}].` : `${fr(d)} ÷ 2 = ${fr(rep)}.`, `la réponse est ${fr(rep)} ${u}.`),
    };
  }),
  Q(18, 3, "Un carré a 4 angles droits (comme un rectangle) et 4 côtés égaux (comme un losange).", () => {
    const [qst, juste, faux, f] = un<[string, string, string[], Forme]>([
      ["Un carré est-il un rectangle ?", "Oui : il a 4 angles droits.", ["Non : ses côtés sont tous égaux.", "Non : un rectangle est plus long que large.", "On ne peut pas savoir."], "carre"],
      ["Un carré est-il un losange ?", "Oui : ses 4 côtés sont égaux.", ["Non : il a des angles droits.", "Non : un losange est penché.", "On ne peut pas savoir."], "carre"],
      ["Un rectangle est-il toujours un carré ?", "Non : ses 4 côtés ne sont pas forcément égaux.", ["Oui : il a 4 angles droits.", "Oui : il a 4 côtés.", "On ne peut pas savoir."], "rectangle"],
      ["Un losange est-il toujours un carré ?", "Non : il n'a pas forcément d'angle droit.", ["Oui : ses 4 côtés sont égaux.", "Oui : il a 4 sommets.", "On ne peut pas savoir."], "losange"],
      ["Un losange qui a un angle droit est-il un carré ?", "Oui : ses 4 côtés sont égaux et ses angles deviennent droits.", ["Non : un losange n'a jamais d'angle droit.", "Non : il devient un rectangle.", "On ne peut pas savoir."], "carre"],
      ["Un rectangle a-t-il des côtés parallèles ?", "Oui : ses côtés opposés sont parallèles.", ["Non : ses côtés se coupent tous.", "Oui : ses côtés voisins sont parallèles.", "Non : seuls les carrés en ont."], "rectangle"],
    ]);
    const p = un(PRENOMS);
    return {
      text: tournure([`${p} se demande :`, `${p} pose la question :`, `${p} hésite :`, `Au tableau, ${p} demande :`], [`« ${qst} »`], ["Que réponds-tu ?", "Quelle est la bonne réponse ?", "Que faut-il répondre ?", ""]),
      ...qcm(juste, faux),
      canvas: code(f),
      explanation: etapes("on vérifie les propriétés une par une.", juste, "le nom dépend des propriétés, pas de la position."),
    };
  }),
  Q(19, 4, "Le périmètre d'un rectangle = 2 × (longueur + largeur). On retire ce qu'on connaît.", () => {
    const cas = un(["rect", "rect", "carre", "losange"]);
    const s = intro(), u = s.u;
    if (cas === "rect") {
      const L = entre(8, 30);
      const l = demi(3, L - 1);
      const p = r1(2 * (L + l));
      return {
        text: tournure([`${sansPoint(s.phrase)} : un rectangle.`], [`Son périmètre est de ${fr(p)} ${u} et sa longueur de ${L} ${u}.`, `Son tour mesure ${fr(p)} ${u} ; sa longueur ${L} ${u}.`], ["Combien mesure sa largeur ?", "Quelle est sa largeur ?", "Trouve sa largeur."]),
        ...qcmN(l, [r1(p - L), r1(p - 2 * L), r1(p / 4), r1(p / 2)], u, 0.5),
        canvas: code("rectangle", { textes: { 0: `${L} ${u}`, 1: `? ${u}` } }),
        explanation: etapes(`le demi-tour vaut longueur + largeur : ${fr(p)} ÷ 2 = ${fr(r1(p / 2))}.`, `${fr(r1(p / 2))} − ${L} = ${fr(l)}.`, `la largeur mesure ${fr(l)} ${u}.`),
      };
    }
    const a = demi(3, 20);
    const p = r1(4 * a);
    const nom = cas === "carre" ? "carré" : "losange";
    return {
      text: tournure([`${sansPoint(s.phrase)} : un ${nom}.`], [`Son périmètre est de ${fr(p)} ${u}.`, `Il faut ${fr(p)} ${u} de galon pour en faire le tour.`, `Son tour mesure ${fr(p)} ${u}.`], ["Combien mesure un côté ?", "Quelle est la longueur d'un côté ?"]),
      ...qcmN(a, [r1(p / 2), r1(p / 3), r1(p - 4)], u, 0.5),
      canvas: code(cas === "carre" ? "carre" : "losange"),
      explanation: etapes(`les 4 côtés du ${nom} sont égaux.`, `${fr(p)} ÷ 4 = ${fr(a)}.`, `un côté mesure ${fr(a)} ${u}.`),
    };
  }),
  Q(20, 4, "Lis les deux propriétés des diagonales : même longueur ? perpendiculaires ?", () => {
    const [ind, juste, f] = un<[string, string, FormeDiag]>([
      ["Ses diagonales ont la même longueur et sont perpendiculaires.", "Un carré", "carre"],
      ["Ses diagonales ont la même longueur, mais ne sont pas perpendiculaires.", "Un rectangle", "rectangle"],
      ["Ses diagonales sont perpendiculaires, mais n'ont pas la même longueur.", "Un losange", "losange"],
      ["Ses diagonales se coupent en leur milieu, sans être ni égales ni perpendiculaires.", "Un parallélogramme", "parallelogramme"],
    ]);
    const s = intro();
    return {
      text: tournure([`${sansPoint(s.phrase)}, un quadrilatère.`], [ind], PRECIS),
      ...qcm(juste, ["Un carré", "Un rectangle", "Un losange", "Un parallélogramme"]),
      canvas: diagonales(f, { codage: false }),
      explanation: etapes("on lit les propriétés des diagonales.", ind, `c'est ${bas(juste)}.`),
    };
  }),
  Q(21, 4, "Les diagonales d'un rectangle se coupent en leur milieu ET ont la même longueur.", () => {
    const ls = lettres(4);
    const o = un(LETTRES.filter((x) => !ls.includes(x)));
    const s = intro(), u = s.u;
    const x = demi(3, 15);
    const [A, B, , D] = ls;
    return {
      text: tournure([`${sansPoint(s.phrase)}, un rectangle ${ls.join("")}.`], [`Ses diagonales se coupent en ${o}, et [${o}${A}] mesure ${fr(x)} ${u}.`, `Le point ${o} est le milieu des diagonales ; [${o}${A}] mesure ${fr(x)} ${u}.`], [`Combien mesure la diagonale [${B}${D}] ?`, `Quelle est la longueur de [${B}${D}] ?`]),
      ...qcmN(r1(2 * x), [x, r1(4 * x), r1(x + 2)], u, 0.5),
      canvas: diagonales("rectangle", { noms: ls, centre: o, texteDemi: `${fr(x)} ${u}` }),
      explanation: etapes(`${o} est le milieu : [${A}${ls[2]}] = 2 × ${fr(x)} = ${fr(r1(2 * x))}.`, `les diagonales du rectangle ont la même longueur.`, `[${B}${D}] mesure ${fr(r1(2 * x))} ${u}.`),
    };
  }),
];

/* ═════════════════ figure_cercle ═════════════════ */

const C = atelier("cm2", "figure_plane", "figure_cercle", "cm2_");
const HINT_C = "Rayon : du centre au cercle. Diamètre : d'un bord à l'autre en passant par le centre.";

export const cercleGabarits: TutorBankItemV4[] = [
  C(10, 1, HINT_C, () => {
    const m = un<"rayon" | "diametre" | "centre" | "cercle" | "disque">(["rayon", "diametre", "centre", "cercle", "disque"]);
    const J = { rayon: "Un rayon", diametre: "Un diamètre", centre: "Le centre", cercle: "Le cercle", disque: "Le disque" };
    const s = introRond();
    return {
      text: tournure([`${s.phrase} Regarde le dessin.`, `${s.phrase} Voici son dessin.`, s.phrase], ["Comment s'appelle ce qui est en rouge ?", "Quel est le nom de l'élément en rouge ?", "Ce qui est tracé en rouge s'appelle…", "Nomme l'élément en rouge."]),
      ...qcm(J[m], Object.values(J)),
      canvas: rond({ montrer: m }),
      explanation: etapes(HINT_C, m === "centre" ? "le point rouge est au milieu, à la même distance de tous les points du cercle." : m === "cercle" ? "le trait rouge est la ligne qui fait le tour." : m === "disque" ? "toute la surface à l'intérieur est coloriée." : m === "rayon" ? "le segment rouge va du centre au cercle." : "le segment rouge traverse en passant par le centre.", `c'est ${bas(J[m])}.`),
    };
  }),
  C(11, 1, "Le diamètre, c'est deux rayons bout à bout : 2 × rayon.", () => {
    const s = introRond();
    const r = s.r(), u = s.u;
    return {
      text: tournure([s.phrase], [`Son rayon mesure ${r} ${u}.`, `Le rayon de ${s.objet} est de ${r} ${u}.`], ["Combien mesure son diamètre ?", "Quel est son diamètre ?", "Trouve son diamètre."]),
      ...qcmN(2 * r, [r, r + 2, 4 * r, r % 2 === 0 ? r / 2 : r + 1], u),
      canvas: rond({ montrer: "rayon", texte: `${r} ${u}` }),
      explanation: etapes("le diamètre vaut deux rayons.", `2 × ${r} = ${2 * r}.`, `le diamètre mesure ${2 * r} ${u}.`),
    };
  }),
  C(12, 1, "Le cercle est la ligne qui fait le tour ; le disque est toute la surface.", () => {
    const tour = Math.random() < 0.5;
    const s = introRond();
    const action = tour
      ? un(["colle un ruban tout autour de", "pose une bordure sur le tour de", "plante des fleurs tout le long du bord de", "peint une ligne sur le bord de", "coud un galon autour de"])
      : un(["peint toute la surface de", "recouvre entièrement", "sème du gazon sur toute la surface de", "met une nappe sur toute la surface de", "colorie tout l'intérieur de"]);
    const juste = tour ? "Le cercle" : "Le disque";
    return {
      text: tournure([`${s.phrase} Ensuite, on ${action} ${s.objet}.`, `On ${action} ${s.objet}.`], ["Quelle partie est concernée ?", "Cela concerne quelle partie de la figure ?", "Quel mot de géométrie convient ?", "Sur quoi travaille-t-on ?"]),
      ...qcm(juste, ["Le cercle", "Le disque", "Le rayon", "Le diamètre", "Le centre"]),
      canvas: rond({ montrer: tour ? "cercle" : "disque" }),
      explanation: etapes("le cercle est le bord ; le disque est l'intérieur avec le bord.", tour ? "on travaille seulement sur le tour." : "on travaille sur toute la surface.", `c'est ${bas(juste)}.`),
    };
  }),
  C(13, 2, "Le rayon, c'est la moitié du diamètre : diamètre ÷ 2.", () => {
    const s = introRond();
    const d = entre(2 * s.r() - 1, 2 * s.r() + 1), u = s.u;
    const r = r1(d / 2);
    return {
      text: tournure([s.phrase], [`Son diamètre mesure ${d} ${u}.`, `Le diamètre de ${s.objet} est de ${d} ${u}.`, `D'un bord à l'autre, en passant par le centre, il y a ${d} ${u}.`], ["Combien mesure son rayon ?", "Quel est son rayon ?", "Trouve son rayon."]),
      ...qcmN(r, [d, 2 * d, d - 2, r1(r + 1)], u, 0.5),
      canvas: rond({ montrer: "diametre", texte: `${d} ${u}` }),
      explanation: etapes("le rayon est la moitié du diamètre.", `${d} ÷ 2 = ${fr(r)}.`, `le rayon mesure ${fr(r)} ${u}.`),
    };
  }),
  C(14, 2, "Le diamètre = 2 × rayon, même avec une virgule.", () => {
    const s = introRond();
    const r = r1(s.r() + 0.5), u = s.u;
    return {
      text: tournure([s.phrase], [`Son rayon mesure ${fr(r)} ${u}.`, `Le rayon de ${s.objet} est de ${fr(r)} ${u}.`], ["Combien mesure son diamètre ?", "Quel est son diamètre ?", "Trouve son diamètre."]),
      ...qcmN(r1(2 * r), [r, r1(r + 2), r1(4 * r), r1(r / 2)], u, 0.5),
      canvas: rond({ montrer: "rayon", texte: `${fr(r)} ${u}` }),
      explanation: etapes("le diamètre vaut deux rayons.", `2 × ${fr(r)} = ${fr(r1(2 * r))}.`, `le diamètre mesure ${fr(r1(2 * r))} ${u}.`),
    };
  }),
  C(15, 2, "Tous les points du cercle sont à la même distance du centre : le rayon.", () => {
    const [c, m] = lettres(2);
    const s = introRond();
    const r = s.r(), u = s.u;
    const parD = Math.random() < 0.4;
    return {
      text: tournure([s.phrase], [`Son centre est ${c} et ${parD ? `son diamètre mesure ${2 * r} ${u}` : `son rayon mesure ${r} ${u}`}.`], [`Le point ${m} est sur le cercle.`, `Une fourmi s'arrête au point ${m}, sur le bord.`, `On place le point ${m} sur le cercle.`], [`Combien mesure [${c}${m}] ?`, `Quelle est la distance de ${c} à ${m} ?`, `À quelle distance du centre est ${m} ?`]),
      ...qcmN(r, [2 * r, r + 1, parD ? 4 * r : r + 2, r - 1], u),
      canvas: rond({ montrer: parD ? "diametre" : "rayon", centre: c, noms: [m, "B"], texte: parD ? `${2 * r} ${u}` : `${r} ${u}` }),
      explanation: etapes(`${m} est sur le cercle : [${c}${m}] est un rayon.`, parD ? `${2 * r} ÷ 2 = ${r}.` : `le rayon mesure ${r} ${u}.`, `[${c}${m}] mesure ${r} ${u}.`),
    };
  }),
  C(16, 2, "Une corde relie deux points du cercle ; si elle passe par le centre, c'est un diamètre.", () => {
    const m = un<"rayon" | "diametre" | "corde">(["corde", "corde", "diametre", "rayon"]);
    const J = { rayon: "Un rayon", diametre: "Un diamètre", corde: "Une corde" };
    const [c, a, b] = lettres(3);
    const s = introRond();
    const seg = m === "rayon" ? `[${c}${a}]` : `[${a}${b}]`;
    return {
      text: tournure([s.phrase], [`Sur son dessin, le segment ${seg} est en rouge.`, `Le segment rouge s'appelle ${seg}.`, ""], [`Que représente ${seg} ?`, `Quel est le nom du segment ${seg} ?`, `${seg} est…`]),
      ...qcm(J[m], [...Object.values(J), "Un côté"]),
      canvas: rond({ montrer: m, centre: c, noms: [a, b] }),
      explanation: etapes(HINT_C, m === "corde" ? `${seg} relie deux points du cercle sans passer par le centre.` : m === "diametre" ? `${seg} relie deux points du cercle en passant par le centre.` : `${seg} va du centre au cercle.`, `c'est ${bas(J[m])}.`),
    };
  }),
  C(17, 3, "Chaque rond prend 2 rayons de long : son diamètre.", () => {
    const n = entre(2, 6);
    const [obj, sg, boite, a, b] = un<[string, string, string, number, number]>([["balles de tennis", "balle", "un tube", 3, 4], ["pièces de monnaie", "pièce", "une rangée", 1, 2], ["cookies", "cookie", "une boîte", 3, 5], ["boules de pétanque", "boule", "une boîte", 4, 5], ["billes", "bille", "une réglette", 1, 2], ["oranges", "orange", "une cagette", 3, 5], ["macarons", "macaron", "une boîte", 2, 3], ["galettes", "galette", "un plateau", 5, 9], ["pots de fleurs ronds", "pot", "une jardinière", 5, 8], ["balles de ping-pong", "balle", "une boîte", 2, 2], ["tomates", "tomate", "une barquette", 3, 4], ["bouchons", "bouchon", "une rangée", 1, 2], ["roues de vélo", "roue", "un local à vélos", 30, 35], ["assiettes", "assiette", "une étagère", 10, 13]]);
    const r = Math.random() < 0.5 ? entre(a, b) : r1(entre(a, b) + 0.5);
    const u = "cm";
    const L = r1(2 * r * n);
    return {
      text: tournure([`On aligne ${n} ${obj} dans ${boite}, sans laisser d'espace.`, `On range ${n} ${obj} côte à côte dans ${boite}.`], [`Chaque ${sg} a un rayon de ${fr(r)} ${u}.`, `Le rayon de chaque ${sg} mesure ${fr(r)} ${u}.`], ["Quelle longueur occupe la rangée ?", "Quelle est la longueur de la rangée ?", "Combien mesure la rangée en tout ?"]),
      ...qcmN(L, [r1(r * n), r1(2 * r), r1(n + 2 * r), r1(2 * r * (n + 1))], u, 0.5),
      canvas: rangee(n, `${fr(r)} ${u}`),
      explanation: etapes(`un diamètre = 2 × ${fr(r)} = ${fr(r1(2 * r))} ${u}.`, `${n} diamètres : ${n} × ${fr(r1(2 * r))} = ${fr(L)}.`, `la rangée mesure ${fr(L)} ${u}.`),
    };
  }),
  C(18, 3, "Le rond touche les deux bords : le côté de la boîte = le diamètre.", () => {
    const r = un([entre(4, 20), demi(4, 20)]);
    const donneD = Math.random() < 0.4;
    const u = "cm";
    const [obj, boite, il] = un<[string, string, string]>([["une galette", "une boîte carrée", "elle"], ["une pizza", "un carton carré", "elle"], ["un gâteau rond", "une boîte carrée", "il"], ["un fromage rond", "une boîte carrée", "il"], ["une horloge", "un cadre carré", "elle"], ["un miroir rond", "un cadre carré", "il"], ["une assiette", "un set de table carré", "elle"], ["un tambourin", "un étui carré", "il"], ["un bassin rond", "un enclos carré", "il"], ["une tarte", "un plateau carré", "elle"]]);
    return {
      text: tournure([`${obj.charAt(0).toUpperCase() + obj.slice(1)} entre juste dans ${boite}.`, `On pose ${obj} dans ${boite} : ${il} touche les 4 bords.`], [donneD ? `Son diamètre mesure ${fr(r1(2 * r))} ${u}.` : `Son rayon mesure ${fr(r)} ${u}.`], ["Combien mesure le côté du carré ?", "Quelle est la longueur d'un côté ?", "Combien mesure un côté de la boîte ?"]),
      ...qcmN(r1(2 * r), donneD ? [r, r1(4 * r), r1(2 * r + 2)] : [r, r1(4 * r), r1(r + 2)], u, 0.5),
      canvas: rondDansCarre(donneD ? `${fr(r1(2 * r))} ${u}` : `${fr(r)} ${u}`, donneD),
      explanation: etapes("le rond touche deux côtés opposés : le côté vaut le diamètre.", donneD ? `le diamètre mesure ${fr(r1(2 * r))} ${u}.` : `2 × ${fr(r)} = ${fr(r1(2 * r))}.`, `le côté mesure ${fr(r1(2 * r))} ${u}.`),
    };
  }),
  C(19, 3, "Compare la distance au centre avec le rayon : plus petite, égale ou plus grande ?", () => {
    const ou = un<"dedans" | "sur" | "dehors">(["dedans", "sur", "dehors"]);
    const [c, m] = lettres(2);
    const s = introRond();
    const r = s.r(), u = s.u;
    const dist = ou === "sur" ? r : ou === "dedans" ? entre(1, r - 1) : entre(r + 1, 2 * r);
    const J = { dedans: "À l'intérieur du cercle", sur: "Sur le cercle", dehors: "À l'extérieur du cercle" };
    return {
      text: tournure([s.phrase], [`Son centre est ${c} et son rayon mesure ${r} ${u}.`, `Le cercle a pour centre ${c} et pour rayon ${r} ${u}.`], [`Le point ${m} est à ${dist} ${u} de ${c}.`, `On mesure [${c}${m}] : ${dist} ${u}.`], [`Où se trouve ${m} ?`, `Où est placé le point ${m} ?`]),
      ...qcm(J[ou], [...Object.values(J), "Au centre du cercle"]),
      canvas: rondPoint(ou, c, m, `${r} ${u}`, `${dist} ${u}`),
      explanation: etapes("on compare la distance au centre et le rayon.", ou === "sur" ? `${dist} = ${r}.` : ou === "dedans" ? `${dist} est plus petit que ${r}.` : `${dist} est plus grand que ${r}.`, `${m} est ${bas(J[ou])}.`),
    };
  }),
  C(20, 3, "Le plus long segment qui relie deux points du cercle est un diamètre.", () => {
    const s = introRond();
    const r = s.r(), u = s.u;
    const [a, b] = lettres(2);
    return {
      text: tournure([s.phrase], [`Son rayon mesure ${r} ${u}.`, `Le rayon de ${s.objet} vaut ${r} ${u}.`], [`On place deux points ${a} et ${b} sur le cercle, le plus loin possible l'un de l'autre.`, `Une fourmi va du point ${a} au point ${b} du bord, en ligne droite, le plus loin possible.`], [`Combien mesure alors [${a}${b}] ?`, `Quelle est la plus grande longueur possible de [${a}${b}] ?`]),
      ...qcmN(2 * r, [r, 4 * r, r + 2, 3 * r], u),
      canvas: rond({ montrer: "diametre", noms: [a, b] }),
      explanation: etapes("le segment le plus long passe par le centre : c'est un diamètre.", `2 × ${r} = ${2 * r}.`, `[${a}${b}] mesure ${2 * r} ${u}.`),
    };
  }),
];

/* ═════════════════ figure_propriete ═════════════════ */

const PR = atelier("cm2", "figure_plane", "figure_propriete", "cm2_");
const HINT_P = "Récite la carte d'identité de la figure : côtés égaux ? angles droits ? côtés parallèles ? diagonales ?";

type FigP = "carre" | "rectangle" | "losange" | "triRect" | "isocele" | "equilateral";
const NOM_P: Record<FigP, string> = { carre: "carré", rectangle: "rectangle", losange: "losange", triRect: "triangle rectangle", isocele: "triangle isocèle", equilateral: "triangle équilatéral" };

export const proprieteGabarits: TutorBankItemV4[] = [
  PR(10, 1, HINT_P, () => {
    const [f, quoi, n] = un<[FigP, string, number]>([["carre", "angles droits", 4], ["carre", "côtés égaux", 4], ["rectangle", "angles droits", 4], ["losange", "côtés égaux", 4], ["equilateral", "côtés égaux", 3], ["isocele", "côtés égaux", 2], ["triRect", "angles droits", 1], ["triRect", "sommets", 3], ["losange", "sommets", 4], ["rectangle", "diagonales", 2]]);
    const s = intro();
    return {
      text: tournure([`${sansPoint(s.phrase)} : c'est un ${NOM_P[f]}.`], [`Combien ${de(quoi)}${quoi} a ce ${NOM_P[f]} ?`, `Ce ${NOM_P[f]} a combien ${de(quoi)}${quoi} ?`, `Combien ${de(quoi)}${quoi} compte ce ${NOM_P[f]} ?`]),
      ...qcmN(n, [1, 2, 3, 4].filter((v) => v !== n).concat([n + 2])),
      canvas: code(f),
      explanation: etapes(`on lit le codage du ${NOM_P[f]}.`, `on compte ${n} ${quoi}.`, `un ${NOM_P[f]} a ${n} ${quoi}.`),
    };
  }),
  PR(11, 1, "Petit carré : angle droit. Mêmes petits traits : même longueur.", () => {
    const marque = un(["traits", "carre"]);
    const f = marque === "traits" ? un<FigP>(["carre", "losange", "isocele", "equilateral"]) : un<FigP>(["carre", "rectangle", "triRect"]);
    const s = intro();
    const juste = marque === "traits" ? "Ces côtés ont la même longueur." : "Cet angle est droit.";
    return {
      text: tournure([`${sansPoint(s.phrase)} : c'est un ${NOM_P[f]}.`], marque === "traits" ? ["Que signifient les petits traits sur ses côtés ?", "Que veulent dire les petits traits du dessin ?", "Les côtés portent un petit trait. Que cela veut-il dire ?"] : ["Que signifie le petit carré dans un coin ?", "Que veut dire le petit carré du dessin ?", "Un coin porte un petit carré. Que cela veut-il dire ?"]),
      ...qcm(juste, ["Ces côtés ont la même longueur.", "Cet angle est droit.", "Ces côtés sont parallèles.", "Ces côtés sont les plus longs.", "Le point est au centre."]),
      canvas: code(f),
      explanation: etapes("on lit le codage de la figure.", marque === "traits" ? "des petits traits identiques = des longueurs égales." : "un petit carré = un angle droit.", juste),
    };
  }),
  PR(12, 2, HINT_P, () => {
    const f = un<FigP | "cercle">(["carre", "rectangle", "losange", "triRect", "isocele", "equilateral", "cercle"]);
    const VRAI: Record<FigP | "cercle", string[]> = {
      carre: ["Ses 4 côtés sont égaux et ses 4 angles sont droits.", "Ses diagonales ont la même longueur et sont perpendiculaires."],
      rectangle: ["Ses côtés opposés ont la même longueur.", "Il a 4 angles droits.", "Ses diagonales ont la même longueur.", "Ses côtés opposés sont parallèles."],
      losange: ["Ses 4 côtés ont la même longueur.", "Ses diagonales sont perpendiculaires."],
      triRect: ["Il a un angle droit."],
      isocele: ["Il a deux côtés de même longueur."],
      equilateral: ["Ses 3 côtés ont la même longueur."],
      cercle: ["Le diamètre mesure 2 fois le rayon.", "Tous ses points sont à la même distance du centre."],
    };
    const FAUX: Record<FigP | "cercle", string[]> = {
      carre: ["Il n'a que 2 angles droits.", "Ses diagonales ont des longueurs différentes.", "Il a 3 sommets."],
      rectangle: ["Ses 4 côtés sont toujours égaux.", "Ses diagonales sont toujours perpendiculaires.", "Il a 3 côtés."],
      losange: ["Il a toujours 4 angles droits.", "Ses diagonales ont toujours la même longueur.", "Ses côtés sont tous différents."],
      triRect: ["Il a 2 angles droits.", "Il a 4 côtés.", "Ses 3 côtés sont égaux."],
      isocele: ["Il a 4 côtés.", "Ses 3 côtés sont différents.", "Il a 2 angles droits."],
      equilateral: ["Il a un angle droit.", "Il a 4 côtés égaux.", "Il a 2 angles droits."],
      cercle: ["Le rayon mesure 2 fois le diamètre.", "Il a 4 sommets.", "Le diamètre ne passe pas par le centre."],
    };
    const nom = f === "cercle" ? "cercle" : NOM_P[f];
    const s = f === "cercle" ? introRond() : intro();
    return {
      text: tournure([`${sansPoint(s.phrase)} : c'est un ${nom}.`], [`Quelle phrase est vraie pour ce ${nom} ?`, "Quelle phrase est juste ?", `Quelle propriété a ce ${nom} ?`, "Laquelle de ces phrases est vraie ?"]),
      ...qcm(un(VRAI[f]), FAUX[f]),
      canvas: f === "cercle" ? rond({ montrer: "diametre" }) : f === "carre" || f === "rectangle" || f === "losange" ? (Math.random() < 0.5 ? diagonales(f) : code(f)) : code(f),
      explanation: etapes(`on récite les propriétés du ${nom}.`, `les autres phrases sont fausses pour un ${nom}.`, `la phrase vraie est celle qui décrit le ${nom}.`),
    };
  }),
  PR(13, 2, "Les côtés égaux (ou opposés dans un rectangle) ont la même longueur.", () => {
    const f = un<"carre" | "losange" | "equilateral" | "isocele">(["carre", "losange", "equilateral", "isocele"]);
    const n = f === "carre" || f === "losange" ? 4 : 3;
    const ls = lettres(n);
    const a = demi(3, 14);
    const s = intro(), u = s.u;
    const cote = (i: number) => `[${ls[i]}${ls[(i + 1) % n]}]`;
    const connu = f === "isocele" ? 1 : 0;
    const cherche = f === "isocele" ? 2 : un(n === 4 ? [1, 2, 3] : [1, 2]);
    return {
      text: tournure([`${sansPoint(s.phrase)} : c'est un ${NOM_P[f]} ${ls.join("")}.`], [`${cote(connu)} mesure ${fr(a)} ${u}.`, `Le côté ${cote(connu)} mesure ${fr(a)} ${u}.`], [`Combien mesure ${cote(cherche)} ?`, `Quelle est la longueur de ${cote(cherche)} ?`]),
      ...qcmN(a, [r1(2 * a), r1(a + 1), r1(a * n), r1(a / 2)], u, 0.5),
      canvas: code(f, { noms: ls, textes: { [connu]: `${fr(a)} ${u}` } }),
      explanation: etapes(`dans un ${NOM_P[f]}, ${f === "isocele" ? "les deux côtés codés" : "tous les côtés"} ont la même longueur.`, `${cote(cherche)} mesure comme ${cote(connu)}.`, `${cote(cherche)} mesure ${fr(a)} ${u}.`),
    };
  }),
  PR(14, 2, "Dans un rectangle (et un losange), les côtés opposés sont parallèles.", () => {
    const f = un<Forme>(["rectangle", "carre", "losange", "parallelogramme"]);
    const nom = { rectangle: "rectangle", carre: "carré", losange: "losange", parallelogramme: "parallélogramme" }[f as "rectangle" | "carre" | "losange" | "parallelogramme"];
    const ls = lettres(4);
    const k = entre(0, 3);
    const cote = (i: number) => `[${ls[i % 4]}${ls[(i + 1) % 4]}]`;
    const s = intro();
    return {
      text: tournure([`${sansPoint(s.phrase)} : c'est un ${nom} ${ls.join("")}.`], [`Quel côté est parallèle à ${cote(k)} ?`, `Quel côté ne croisera jamais ${cote(k)}, même prolongé ?`, `Trouve le côté parallèle à ${cote(k)}.`]),
      ...qcm(cote(k + 2), [cote(k + 1), cote(k + 3), `[${ls[k]}${ls[(k + 2) % 4]}]`]),
      canvas: poly(f, { ...(CODAGE[f] ?? {}), noms: ls, rot: 0 }),
      explanation: etapes(`dans un ${nom}, les côtés opposés sont parallèles.`, `${cote(k + 2)} est en face de ${cote(k)}.`, `${cote(k + 2)} est parallèle à ${cote(k)}.`),
    };
  }),
  PR(15, 2, "Compare avec la carte d'identité de la figure.", () => {
    const [aff, juste, faux, f] = un<[string, string, string[], FigP | "cercle"]>([
      ["un carré est aussi un rectangle", "Oui, car il a 4 angles droits.", ["Non, car ses côtés sont tous égaux.", "Non, car un rectangle est plus long que large.", "Oui, car il a 4 côtés égaux."], "carre"],
      ["un losange a toujours 4 angles droits", "Non, il n'en a pas forcément.", ["Oui, comme le carré.", "Oui, car ses côtés sont égaux.", "Non, il en a toujours 2."], "losange"],
      ["un triangle rectangle a deux angles droits", "Non, il en a un seul.", ["Oui, un à chaque bout.", "Oui, comme le rectangle.", "Non, il n'en a aucun."], "triRect"],
      ["le diamètre est la moitié du rayon", "Non, c'est le double du rayon.", ["Oui, il est plus court.", "Non, ils sont égaux.", "Oui, il fait un demi-tour."], "cercle"],
      ["les diagonales d'un rectangle ont la même longueur", "Oui, toujours.", ["Non, l'une est plus longue.", "Oui, et elles sont perpendiculaires.", "Non, seulement dans un losange."], "rectangle"],
      ["les diagonales d'un losange ont la même longueur", "Non, elles sont perpendiculaires mais pas égales.", ["Oui, toujours.", "Oui, comme dans le rectangle.", "Non, elles ne se coupent pas."], "losange"],
      ["un triangle équilatéral a 3 côtés égaux", "Oui, c'est sa définition.", ["Non, il en a 2.", "Non, il a un angle droit.", "Oui, et un angle droit."], "equilateral"],
      ["un triangle isocèle a forcément 3 côtés égaux", "Non, il en a au moins 2.", ["Oui, toujours.", "Non, il n'en a aucun.", "Oui, comme le carré."], "isocele"],
      ["tous les rayons d'un cercle ont la même longueur", "Oui, ils vont tous du centre au cercle.", ["Non, ils changent de longueur.", "Oui, et ils valent le diamètre.", "Non, seul le premier compte."], "cercle"],
      ["les côtés opposés d'un rectangle sont parallèles", "Oui, deux à deux.", ["Non, ils se coupent.", "Oui, mais seulement 2 d'entre eux.", "Non, seuls ses côtés voisins le sont."], "rectangle"],
    ]);
    const p = un(PRENOMS);
    return {
      text: tournure([`${p} affirme :`, `${p} dit :`, `${p} écrit :`, `Au tableau, ${p} écrit :`], [`« ${aff.charAt(0).toUpperCase() + aff.slice(1)}. »`], ["Est-ce vrai ?", "Est-ce juste ?", "Que penses-tu de cette phrase ?"]),
      ...qcm(juste, faux),
      canvas: f === "cercle" ? rond({ montrer: "diametre" }) : aff.includes("diagonales") ? diagonales(f as FormeDiag) : code(f),
      explanation: etapes("on compare avec la carte d'identité de la figure.", juste, "les autres réponses se trompent de propriété."),
    };
  }),
  PR(16, 3, "Un tour fait de côtés tous égaux : on divise par le nombre de côtés.", () => {
    const f = un<"carre" | "losange" | "equilateral">(["carre", "losange", "equilateral"]);
    const n = f === "equilateral" ? 3 : 4;
    const a = demi(3, 18);
    const s = intro(), u = s.u;
    const p = r1(n * a);
    return {
      text: tournure([`${sansPoint(s.phrase)} : c'est un ${NOM_P[f]}.`], [`Son tour mesure ${fr(p)} ${u}.`, `Son périmètre est de ${fr(p)} ${u}.`, `Une ficelle de ${fr(p)} ${u} fait juste son tour.`], ["Combien mesure un côté ?", "Quelle est la longueur d'un côté ?", "Trouve la longueur d'un côté."]),
      ...qcmN(a, [r1(p / 2), r1(n === 4 ? p / 3 : p / 4), r1(p - n)], u, 0.5),
      canvas: code(f),
      explanation: etapes(`les ${n} côtés du ${NOM_P[f]} sont égaux.`, `${fr(p)} ÷ ${n} = ${fr(a)}.`, `un côté mesure ${fr(a)} ${u}.`),
    };
  }),
  PR(17, 3, "Dans un carré ou un rectangle, les diagonales ont la même longueur et se coupent en leur milieu.", () => {
    const f = un<"carre" | "rectangle">(["carre", "rectangle"]);
    const ls = lettres(4);
    const o = un(LETTRES.filter((x) => !ls.includes(x)));
    const s = intro(), u = s.u;
    const d = demi(5, 25);
    const [A, B, C, D] = ls;
    const autre = Math.random() < 0.5;
    const rep = autre ? d : r1(d / 2);
    return {
      text: tournure([`${sansPoint(s.phrase)} : c'est un ${NOM_P[f]} ${ls.join("")}.`], [`Ses diagonales se coupent en ${o} ; [${A}${C}] mesure ${fr(d)} ${u}.`, `La diagonale [${A}${C}] mesure ${fr(d)} ${u} et croise l'autre en ${o}.`], [autre ? `Combien mesure [${B}${D}] ?` : `Combien mesure [${o}${D}] ?`, autre ? `Quelle est la longueur de l'autre diagonale [${B}${D}] ?` : `Quelle est la longueur de [${o}${D}] ?`]),
      ...qcmN(rep, autre ? [r1(d / 2), r1(2 * d), r1(d + 2)] : [d, r1(2 * d), r1(d / 4)], u, 0.5),
      canvas: diagonales(f, { noms: ls, centre: o }),
      explanation: etapes(`les diagonales du ${NOM_P[f]} ont la même longueur et se coupent en leur milieu.`, autre ? `[${B}${D}] = [${A}${C}].` : `${fr(d)} ÷ 2 = ${fr(rep)}.`, `la réponse est ${fr(rep)} ${u}.`),
    };
  }),
  PR(18, 3, "Cherche la propriété que les DEUX figures possèdent.", () => {
    const [f1, f2, juste, faux] = un<[Forme, Forme, string, string[]]>([
      ["carre", "rectangle", "4 angles droits", ["4 côtés égaux", "des diagonales perpendiculaires", "3 sommets"]],
      ["carre", "losange", "4 côtés égaux", ["4 angles droits", "des diagonales de même longueur", "3 côtés"]],
      ["rectangle", "losange", "des côtés opposés parallèles", ["4 angles droits", "4 côtés égaux", "des diagonales perpendiculaires"]],
      ["losange", "carre", "des diagonales perpendiculaires", ["4 angles droits", "des diagonales de même longueur", "aucun côté parallèle"]],
      ["rectangle", "carre", "des diagonales de même longueur", ["4 côtés égaux", "des diagonales perpendiculaires", "un seul angle droit"]],
      ["equilateral", "isocele", "au moins 2 côtés égaux", ["3 côtés égaux", "un angle droit", "4 sommets"]],
      ["triRect", "rectangle", "au moins un angle droit", ["4 côtés", "3 sommets", "des côtés tous égaux"]],
    ]);
    const nom = (f: Forme) => ({ carre: "le carré", rectangle: "le rectangle", losange: "le losange", equilateral: "le triangle équilatéral", isocele: "le triangle isocèle", triRect: "le triangle rectangle" } as Record<string, string>)[f];
    const qui = un(METIERS);
    return {
      text: tournure([`${qui} compare ${nom(f1)} et ${nom(f2)}.`, `On compare ${nom(f1)} et ${nom(f2)}.`, `Au tableau : ${nom(f1)} et ${nom(f2)}.`], ["Quelle propriété ont-ils en commun ?", "Qu'ont-ils tous les deux ?", "Quelle propriété partagent-ils ?"]),
      ...qcm(juste, faux),
      canvas: duo(f1, f2),
      explanation: etapes("on vérifie chaque propriété pour les deux figures.", `${nom(f1)} et ${nom(f2)} ont ${juste}.`, `la propriété commune : ${juste}.`),
    };
  }),
];

/* ═════════════════ figure_construire ═════════════════ */

const K = atelier("cm2", "figure_plane", "figure_construire", "cm2_");

export const construireGabarits: TutorBankItemV4[] = [
  K(10, 1, "Compas : cercles et reports de longueur. Équerre : angles droits. Règle graduée : longueurs.", () => {
    const [tache, juste, fig] = un<[string, string, () => CanvasFigure]>([
      ["tracer un cercle", "Un compas", () => rond({ montrer: "rayon" })],
      ["tracer un rond parfait", "Un compas", () => rond({ montrer: "cercle" })],
      ["reporter une longueur sans la mesurer", "Un compas", () => poly("losange", { codes: [[0, 1], [1, 1]] })],
      ["tracer un angle droit", "Une équerre", () => poly("triRect", { droits: [0] })],
      ["vérifier qu'un coin est bien droit", "Une équerre", () => poly("rectangle", { droits: [0] })],
      ["tracer une droite perpendiculaire à un côté", "Une équerre", () => poly("carre", { droits: [0, 1] })],
      [`tracer un segment de ${fr(demi(3, 12))} cm`, "Une règle graduée", () => poly("triQuelconque", { textes: { 0: "? cm" } })],
      ["mesurer la longueur d'un côté", "Une règle graduée", () => poly("rectangle", { textes: { 0: "? cm" } })],
    ]);
    const qui = un(METIERS);
    return {
      text: tournure([`${qui} veut ${tache}.`, `${qui} doit ${tache}.`, `Pour son plan, ${bas(qui)} va ${tache}.`], ["Quel instrument choisir ?", "Quel outil utiliser ?", "Avec quel instrument ?", "Que faut-il prendre ?"]),
      ...qcm(juste, ["Un compas", "Une équerre", "Une règle graduée"]),
      canvas: fig(),
      explanation: etapes("on associe l'instrument à ce qu'on trace.", juste === "Un compas" ? "le compas trace les cercles et reporte les longueurs." : juste === "Une équerre" ? "l'équerre a un coin en angle droit." : "la règle graduée mesure les longueurs.", `on prend ${bas(juste)}.`),
    };
  }),
  K(11, 1, "On commence par un côté dont on connaît la longueur.", () => {
    const a = demi(3, 9);
    const [fig, f] = un<[string, Forme]>([[`un carré de ${fr(a)} cm de côté`, "carre"], [`un triangle équilatéral de ${fr(a)} cm de côté`, "equilateral"], [`un losange de ${fr(a)} cm de côté`, "losange"], [`un rectangle de ${fr(a + 2)} cm sur ${fr(a)} cm`, "rectangle"]]);
    const premier = f === "rectangle" ? `On trace un segment de ${fr(a + 2)} cm.` : `On trace un segment de ${fr(a)} cm.`;
    const qui = un(METIERS);
    return {
      text: tournure([`${qui} veut construire ${fig}.`, `${qui} doit tracer ${fig}.`, `Sur son cahier, ${un(PRENOMS)} construit ${fig}.`], ["Par quoi commence-t-on ?", "Quelle est la première étape ?", "Que fait-on d'abord ?"]),
      ...qcm(premier, [`On trace un cercle de ${fr(a)} cm de rayon.`, "On trace les deux diagonales.", "On colorie l'intérieur de la figure.", `On trace un segment de ${fr(2 * a)} cm.`]),
      canvas: poly(f, { rot: 0, textes: { 0: `${fr(f === "rectangle" ? a + 2 : a)} cm` } }),
      explanation: etapes("on commence toujours par un côté de longueur connue.", premier, "ensuite on construit les autres côtés à partir de lui."),
    };
  }),
  K(12, 2, "L'écartement du compas = le rayon. Si on donne le diamètre, on prend la moitié.", () => {
    const r = un([entre(2, 9), demi(2, 9)]);
    const parD = Math.random() < 0.5;
    const [quoi, ou] = un<[string, string]>([["une horloge", "sur son affiche"], ["une roue", "sur son dessin"], ["un bassin", "sur le plan"], ["un rond-point", "sur le plan"], ["une cible", "sur une feuille"], ["un soleil", "sur son cahier"], ["un logo rond", "sur une carte"], ["une pizza", "sur un menu"], ["un tambour", "sur l'affiche du concert"], ["une piste ronde", "sur le plan du parc"], ["une assiette", "sur un set de table"], ["un hublot", "sur le plan du bateau"]]);
    return {
      text: tournure([`On dessine ${quoi} ${ou}.`, `${un(METIERS)} trace ${quoi} ${ou}.`], [parD ? `Le cercle doit avoir un diamètre de ${fr(r1(2 * r))} cm.` : `Le cercle doit avoir un rayon de ${fr(r)} cm.`], ["Quel écartement donner au compas ?", "De combien ouvrir le compas ?", "Quel écartement faut-il ?"]),
      ...qcmN(r, parD ? [r1(2 * r), r1(4 * r), r1(r + 1)] : [r1(2 * r), r1(r + 1), r1(r / 2)], "cm", 0.5),
      canvas: rond({ montrer: parD ? "diametre" : "rayon", texte: parD ? `${fr(r1(2 * r))} cm` : `${fr(r)} cm` }),
      explanation: etapes("l'écartement du compas est le rayon.", parD ? `${fr(r1(2 * r))} ÷ 2 = ${fr(r)}.` : `le rayon est ${fr(r)} cm.`, `on ouvre le compas de ${fr(r)} cm.`),
    };
  }),
  K(13, 2, "Suis le programme pas à pas, puis lis ce que tu obtiens.", () => {
    const a = demi(3, 8);
    let b = demi(2, 6); while (b === a) b = demi(2, 6);
    const [prog, juste, f] = un<[string, string, Forme]>([
      [`Trace un segment de ${fr(a)} cm. À chaque bout, trace un angle droit et un côté de ${fr(a)} cm. Relie les deux bouts.`, "Un carré", "carre"],
      [`Trace un segment de ${fr(r1(a + b))} cm. À chaque bout, trace un angle droit et un côté de ${fr(b)} cm. Relie les deux bouts.`, "Un rectangle", "rectangle"],
      [`Trace un angle droit. Sur ses côtés, place un point à ${fr(a)} cm et un point à ${fr(b)} cm. Relie ces deux points.`, "Un triangle rectangle", "triRect"],
      [`Trace un angle droit. Sur ses côtés, place un point à ${fr(a)} cm du sommet, de chaque côté. Relie ces deux points.`, "Un triangle rectangle isocèle", "triRectIso"],
      [`Trace un segment de ${fr(b)} cm. Avec le compas ouvert de ${fr(Math.max(a, b) + 2)} cm, pique à chaque bout et croise les arcs. Relie.`, "Un triangle isocèle", "isocele"],
      [`Trace un segment de ${fr(a)} cm. Avec le compas ouvert de ${fr(a)} cm, pique à chaque bout et croise les arcs. Relie.`, "Un triangle équilatéral", "equilateral"],
      [`Trace deux segments de même milieu, perpendiculaires, de ${fr(r1(2 * a))} cm et ${fr(r1(2 * b))} cm. Relie leurs bouts.`, "Un losange", "losange"],
    ]);
    const tri = juste.includes("triangle");
    return {
      text: tournure(["Suis ce programme.", "Voici un programme de construction.", "Lis ce programme.", `${un(PRENOMS)} suit ce programme.`], [prog], ["Quelle figure obtiens-tu ?", "Quelle figure est construite ?", "Que trace-t-on ?"]),
      ...qcm(juste, tri ? ["Un triangle rectangle", "Un triangle isocèle", "Un triangle équilatéral", "Un triangle rectangle isocèle", "Un carré"] : ["Un carré", "Un rectangle", "Un losange", "Un triangle rectangle"]),
      canvas: poly(f, { rot: 0, ...(f === "carre" || f === "rectangle" ? { droits: [0, 1] } : f === "triRect" || f === "triRectIso" ? { droits: [0] } : {}) }),
      explanation: etapes("on suit les étapes dans l'ordre.", f === "carre" ? "4 côtés égaux et des angles droits." : f === "rectangle" ? "des angles droits, longueur et largeur différentes." : f === "triRect" ? "3 côtés et un angle droit." : f === "triRectIso" ? "un angle droit et 2 côtés égaux." : f === "isocele" ? "les deux arcs ont le même rayon : 2 côtés égaux." : f === "losange" ? "des diagonales perpendiculaires de même milieu : 4 côtés égaux." : "les 3 côtés mesurent pareil.", `on obtient ${bas(juste)}.`),
    };
  }),
  K(14, 2, "Chaque figure a son instrument : équerre pour les angles droits, compas pour les longueurs égales.", () => {
    const a = demi(3, 9);
    const ls = lettres(4);
    const [A, B] = ls;
    const t3 = ls.slice(0, 3).join("");
    const [fig, juste, faux, f] = un<[string, string, string[], Forme]>([
      [`un carré ${ls.join("")}`, `On trace un angle droit en ${B} avec l'équerre.`, [`On trace un cercle de centre ${A}.`, `On trace un segment de ${fr(2 * a)} cm depuis ${B}.`, "On trace une diagonale tout de suite."], "carre"],
      [`un rectangle ${ls.join("")}`, `On trace un angle droit en ${B} avec l'équerre.`, [`On reporte ${fr(a)} cm au compas depuis ${A}.`, "On trace une diagonale tout de suite.", `On trace un cercle de centre ${B}.`], "rectangle"],
      [`un triangle équilatéral ${t3}`, `On trace deux arcs de rayon ${fr(a)} cm, centrés en ${A} et en ${B}.`, [`On trace un angle droit en ${A}.`, `On trace deux arcs de rayon ${fr(r1(a / 2))} cm, centrés en ${A} et en ${B}.`, `On trace un cercle de centre le milieu de [${A}${B}].`], "equilateral"],
      [`un triangle ${t3} rectangle en ${A}`, `On trace un angle droit en ${A} avec l'équerre.`, [`On trace un angle droit en ${B} avec l'équerre.`, `On trace deux arcs de rayon ${fr(a)} cm.`, `On trace un cercle de centre ${A}.`], "triRect"],
    ]);
    const qui = un(METIERS);
    return {
      text: tournure([`${qui} construit ${fig}.`, `On construit ${fig}.`], [`Le côté [${A}${B}] de ${fr(a)} cm est déjà tracé.`, `[${A}${B}] mesure ${fr(a)} cm et il est tracé.`], ["Quelle est l'étape suivante ?", "Que fait-on ensuite ?", "Quelle étape vient après ?"]),
      ...qcm(juste, faux),
      canvas: poly(f, { rot: 0, noms: f === "carre" || f === "rectangle" ? ls : ls.slice(0, 3), textes: { 0: `${fr(a)} cm` } }),
      explanation: etapes("on choisit l'instrument qui donne la propriété voulue.", juste, "puis on continue le programme."),
    };
  }),
  K(15, 3, "Pour finir une figure, utilise ses propriétés : côtés opposés, côtés égaux.", () => {
    const ls = lettres(4);
    const u = "cm";
    const L = demi(5, 12);
    let l = demi(2, 8); while (l >= L) l = demi(2, 8);
    const cas = un(["rect", "rect", "equi", "losange"]);
    const qui = un(METIERS);
    if (cas === "rect") {
      return {
        text: tournure([`${qui} construit un rectangle ${ls.join("")}.`, `On construit le rectangle ${ls.join("")}.`], [`[${ls[0]}${ls[1]}] mesure ${fr(L)} ${u} et [${ls[1]}${ls[2]}] mesure ${fr(l)} ${u}.`], [`Quelle longueur donner à [${ls[2]}${ls[3]}] ?`, `Combien doit mesurer [${ls[2]}${ls[3]}] ?`]),
        ...qcmN(L, [l, r1(L + l), r1(2 * L)], u, 0.5),
        canvas: poly("rectangle", { noms: ls, droits: [0, 1, 2, 3], textes: { 0: `${fr(L)} ${u}`, 1: `${fr(l)} ${u}` } }),
        explanation: etapes("dans un rectangle, les côtés opposés sont égaux.", `[${ls[2]}${ls[3]}] est en face de [${ls[0]}${ls[1]}].`, `il mesure ${fr(L)} ${u}.`),
      };
    }
    if (cas === "equi") {
      return {
        text: tournure([`${qui} construit un triangle équilatéral de côté ${fr(L)} ${u}.`, `On veut un triangle équilatéral de ${fr(L)} ${u} de côté.`], [`[${ls[0]}${ls[1]}] est tracé. On place le 3e sommet au compas.`], ["Quel écartement donner au compas ?", "De combien ouvrir le compas ?"]),
        ...qcmN(L, [r1(L / 2), r1(2 * L), r1(3 * L)], u, 0.5),
        canvas: poly("equilateral", { noms: [ls[2], ls[0], ls[1]], textes: { 1: `${fr(L)} ${u}` }, rot: 0 }),
        explanation: etapes("les 3 côtés d'un triangle équilatéral sont égaux.", `les deux côtés à tracer mesurent ${fr(L)} ${u}.`, `on ouvre le compas de ${fr(L)} ${u}.`),
      };
    }
    return {
      text: tournure([`${qui} construit un losange ${ls.join("")}.`, `On construit le losange ${ls.join("")}.`], [`[${ls[0]}${ls[1]}] mesure ${fr(L)} ${u}.`], [`Quelle longueur donner à [${ls[2]}${ls[3]}] ?`, `Combien doit mesurer [${ls[1]}${ls[2]}] ?`]),
      ...qcmN(L, [r1(2 * L), r1(4 * L), r1(L / 2)], u, 0.5),
      canvas: poly("losange", { noms: ls, codes: [[0, 1], [1, 1], [2, 1], [3, 1]], textes: { 0: `${fr(L)} ${u}` } }),
      explanation: etapes("les 4 côtés d'un losange sont égaux.", `tous mesurent comme [${ls[0]}${ls[1]}].`, `il faut ${fr(L)} ${u}.`),
    };
  }),
  K(16, 3, "Vérifie TOUTES les propriétés : côtés ET angles.", () => {
    const a = demi(3, 9);
    const p = un(PRENOMS);
    const [desc, juste, faux, f, o] = un<[string, string, string[], Forme, OptsPoly]>([
      [`Ses 4 côtés mesurent ${fr(a)} cm, mais ses angles ne sont pas droits.`, "Un losange", ["Un carré", "Un rectangle", "Un triangle"], "losange", { codes: [[0, 1], [1, 1], [2, 1], [3, 1]] }],
      [`Ses 4 angles sont droits, ses côtés mesurent ${fr(a + 2)} cm et ${fr(a)} cm.`, "Un rectangle", ["Un carré", "Un losange", "Un triangle"], "rectangle", { droits: [0, 1, 2, 3] }],
      [`Ses 4 côtés mesurent ${fr(a)} cm et ses 4 angles sont droits.`, "Un carré", ["Un losange sans angle droit", "Un rectangle allongé", "Un triangle"], "carre", CODAGE.carre ?? {}],
      [`Ses diagonales ont la même longueur, mais ne sont pas perpendiculaires.`, "Un rectangle", ["Un carré", "Un losange", "Un triangle"], "rectangle", { droits: [0, 1, 2, 3] }],
      [`Ses diagonales sont perpendiculaires, mais pas de même longueur.`, "Un losange", ["Un carré", "Un rectangle", "Un triangle"], "losange", { codes: [[0, 1], [1, 1], [2, 1], [3, 1]] }],
    ]);
    return {
      text: tournure([`${p} voulait tracer un carré.`, `${p} croit avoir tracé un carré.`, `${p} montre sa figure : « Voici mon carré ! »`], [desc], ["Quelle figure a été tracée en vrai ?", "Quel est le nom exact de cette figure ?", "Quelle figure est-ce vraiment ?"]),
      ...qcm(juste, faux),
      canvas: poly(f, o),
      explanation: etapes("un carré a 4 côtés égaux ET 4 angles droits (et des diagonales égales et perpendiculaires).", desc, `sa figure est ${bas(juste)}.`),
    };
  }),
  K(17, 3, "Le centre d'un cercle de diamètre [AB] est le milieu de [AB] ; le rayon vaut AB ÷ 2.", () => {
    const [A, B] = lettres(2);
    const d = un([entre(4, 16), demi(4, 16)]);
    const r = r1(d / 2);
    const qui = un(METIERS);
    return {
      text: tournure([`${qui} veut tracer le cercle de diamètre [${A}${B}].`, `On doit tracer le cercle de diamètre [${A}${B}].`], [`[${A}${B}] mesure ${fr(d)} cm.`, `Le segment [${A}${B}] mesure ${fr(d)} cm.`], ["Où pique-t-on le compas, et de combien l'ouvre-t-on ?", "Comment placer le compas ?", "Que faut-il faire avec le compas ?"]),
      ...qcm(`Au milieu de [${A}${B}], ouvert de ${fr(r)} cm.`, [`En ${A}, ouvert de ${fr(d)} cm.`, `Au milieu de [${A}${B}], ouvert de ${fr(d)} cm.`, `En ${B}, ouvert de ${fr(r)} cm.`]),
      canvas: rond({ montrer: "diametre", noms: [A, B], texte: `${fr(d)} cm` }),
      explanation: etapes("le centre est le milieu du diamètre.", `le rayon vaut ${fr(d)} ÷ 2 = ${fr(r)} cm.`, `on pique au milieu de [${A}${B}] et on ouvre de ${fr(r)} cm.`),
    };
  }),
];

/* ═════════════════ figure_defi ═════════════════ */

const D = atelier("cm2", "figure_plane", "figure_defi", "cm2_");

export const defiGabarits: TutorBankItemV4[] = [
  D(10, 4, "Lis chaque indice et élimine les figures qui ne vont pas.", () => {
    const [ind, juste, faux] = un<[string, string, string[]]>([
      ["J'ai 4 côtés égaux et un angle droit.", "Un carré", ["Un losange sans angle droit", "Un rectangle allongé", "Un triangle"]],
      ["J'ai 4 angles droits et deux côtés voisins égaux.", "Un carré", ["Un rectangle allongé", "Un losange sans angle droit", "Un triangle rectangle"]],
      ["Mes diagonales sont perpendiculaires et de même longueur.", "Un carré", ["Un losange sans angle droit", "Un rectangle allongé", "Un parallélogramme"]],
      ["Mes diagonales ont la même longueur et je n'ai pas 4 côtés égaux.", "Un rectangle", ["Un carré", "Un losange", "Un triangle isocèle"]],
      ["Mes diagonales sont perpendiculaires et je n'ai aucun angle droit.", "Un losange", ["Un carré", "Un rectangle", "Un trapèze"]],
      ["J'ai 3 côtés, un angle droit et deux côtés égaux.", "Un triangle rectangle isocèle", ["Un triangle équilatéral", "Un triangle rectangle quelconque", "Un carré"]],
      ["J'ai 3 côtés, dont 2 seulement de même longueur, et pas d'angle droit.", "Un triangle isocèle", ["Un triangle équilatéral", "Un triangle rectangle", "Un losange"]],
      ["J'ai 4 côtés et une seule paire de côtés parallèles.", "Un trapèze", ["Un rectangle", "Un losange", "Un parallélogramme"]],
      ["Je relie deux points du cercle sans passer par le centre.", "Une corde", ["Un diamètre", "Un rayon", "Un disque"]],
      ["J'ai 6 côtés égaux.", "Un hexagone", ["Un pentagone", "Un octogone", "Un losange"]],
    ]);
    const qui = un(["La maîtresse", "Le maître", "Un magicien", "Le robot du club", "Une énigme du jeu vidéo", "La mascotte de la classe", "Le livre de jeux", "Une carte au trésor"]);
    // Pas de dessin : il donnerait la réponse de la devinette.
    return {
      text: tournure([`${qui} pose une devinette.`, `${qui} propose une énigme.`], [`« ${ind} Qui suis-je ? »`, `« ${ind} Quelle figure suis-je ? »`, `« Indice : ${bas(ind)} Qui suis-je ? »`]),
      ...qcm(juste, faux),
      explanation: etapes("on lit les indices un par un.", ind, `c'est ${bas(juste)}.`),
    };
  }),
  D(11, 4, "Le tour d'un losange : 4 côtés égaux.", () => {
    const a = un([entre(20, 60), demi(20, 60)]);
    const n = entre(2, 4);
    const p = r1(4 * a);
    const [obj, du, mat] = un<[string, string, string]>([["un cerf-volant en losange", "de la", "baguette"], ["un panneau en losange", "du", "ruban adhésif"], ["un carreau en losange", "du", "joint"], ["un fanion en losange", "du", "galon"], ["un massif en losange", "de la", "bordure"], ["un vitrail en losange", "du", "plomb"]]);
    const total = Math.random() < 0.5;
    return {
      text: tournure([`${un(METIERS)} fabrique ${total ? `${n} exemplaires d'` : ""}${obj} de ${fr(a)} cm de côté.`, `On prépare ${total ? `${n} fois ` : ""}${obj} ; chaque côté mesure ${fr(a)} cm.`], [`Il faut ${du} ${mat} sur tout le tour.`, `On pose ${du} ${mat} tout autour.`], [total ? `Quelle longueur de ${mat} faut-il pour les ${n} ?` : `Quelle longueur de ${mat} faut-il ?`, total ? "Combien de centimètres faut-il en tout ?" : "Combien de centimètres faut-il ?"]),
      ...qcmN(total ? r1(n * p) : p, total ? [p, r1(n * a), r1(n * 3 * a), r1(n * p + 4 * a)] : [r1(2 * a), r1(3 * a), r1(a + 4)], "cm", 0.5),
      canvas: code("losange", { rot: 90, textes: { 0: `${fr(a)} cm` } }),
      explanation: etapes("un losange a 4 côtés égaux.", total ? `4 × ${fr(a)} = ${fr(p)} ; ${n} × ${fr(p)} = ${fr(r1(n * p))}.` : `4 × ${fr(a)} = ${fr(p)}.`, `il faut ${fr(total ? r1(n * p) : p)} cm.`),
    };
  }),
  D(12, 4, "Le nom d'une figure dépend de ses propriétés, pas de sa position.", () => {
    const [f, rot, juste, quoi] = un<[Forme, number, string, string]>([
      ["carre", 45, "Un carré", "4 côtés égaux et 4 angles droits"],
      ["rectangle", 35, "Un rectangle", "4 angles droits, côtés pas tous égaux"],
      ["losange", 20, "Un losange", "4 côtés égaux, sans angle droit"],
      ["triRectIso", 135, "Un triangle rectangle isocèle", "un angle droit et 2 côtés égaux"],
      ["triRect", 160, "Un triangle rectangle", "un angle droit, côtés différents"],
      ["equilateral", 30, "Un triangle équilatéral", "3 côtés égaux"],
    ]);
    const s = intro();
    const tri = juste.includes("triangle");
    return {
      text: tournure([s.phrase], ["Le dessin est à l'envers.", "On l'a dessiné de travers.", "Le dessin a tourné."], ["Lis tout le codage."], PRECIS),
      ...qcm(juste, tri ? ["Un triangle rectangle", "Un triangle rectangle isocèle", "Un triangle isocèle", "Un triangle équilatéral"] : ["Un carré", "Un losange", "Un rectangle", "Un parallélogramme"]),
      canvas: code(f, { rot }),
      explanation: etapes("on oublie la position et on lit tout le codage.", `${quoi}.`, `c'est ${bas(juste)}.`),
    };
  }),
  D(13, 4, "Retire du tour ce qui est connu, puis partage entre les côtés égaux.", () => {
    const s = intro(), u = s.u;
    const a = demi(4, 20);
    const b = entre(2, Math.min(15, Math.floor(2 * a) - 1));
    const p = r1(2 * a + b);
    return {
      text: tournure([`${sansPoint(s.phrase)} : un triangle isocèle.`], [`Son tour mesure ${fr(p)} ${u} et sa base ${b} ${u}.`, `Son périmètre est ${fr(p)} ${u} ; le côté différent mesure ${b} ${u}.`], ["Combien mesure chacun des deux côtés égaux ?", "Quelle est la longueur d'un côté égal ?"]),
      ...qcmN(a, [r1(p - b), r1((p - b) / 2 + b), r1(p / 3), r1(a + b)], u, 0.5),
      canvas: code("isocele", { textes: { 0: `${b} ${u}` } }),
      explanation: etapes(`on retire la base : ${fr(p)} − ${b} = ${fr(r1(p - b))}.`, `on partage en 2 : ${fr(r1(p - b))} ÷ 2 = ${fr(a)}.`, `chaque côté égal mesure ${fr(a)} ${u}.`),
    };
  }),
  D(14, 5, "Combien de diamètres tiennent dans la longueur ?", () => {
    const n = entre(3, 9);
    const r = un([1, 1.5, 2, 2.5, 3, 4, 5]);
    const L = r1(2 * r * n);
    const [obj, ou] = un<[string, string]>([["cookies", "une plaque de"], ["pièces", "une réglette de"], ["balles", "un tube de"], ["galets ronds", "une étagère de"], ["boutons", "un ruban de"], ["perles", "un fil de"], ["jetons", "une boîte de"], ["pots ronds", "un rebord de fenêtre de"], ["macarons", "une boîte de"], ["bouchons", "une règle de"]]);
    return {
      text: tournure([`Sur ${ou} ${fr(L)} cm de long, on aligne des ${obj} de ${fr(r)} cm de rayon.`, `On range des ${obj} de rayon ${fr(r)} cm, côte à côte, sur ${ou} ${fr(L)} cm.`], ["Combien peut-on en aligner ?", "Combien en tient-il sur la longueur ?", "Combien en faut-il pour remplir la longueur ?"]),
      ...qcmN(n, [r1(L / r), n + 1, n - 1, 2 * n].filter((v) => Number.isInteger(v) && v !== n)),
      canvas: rangee(2, `${fr(r)} cm`, false),
      explanation: etapes(`chaque objet prend un diamètre : 2 × ${fr(r)} = ${fr(r1(2 * r))} cm.`, `${fr(L)} ÷ ${fr(r1(2 * r))} = ${n}.`, `on peut en aligner ${n}.`),
    };
  }),
  D(15, 5, "Plier selon les diagonales d'un carré donne des triangles rectangles isocèles.", () => {
    const [plis, n, traits] = un<[string, number, Array<[number, number]>]>([["selon une diagonale", 2, [[0, 2]]], ["selon ses deux diagonales", 4, [[0, 2], [1, 3]]]]);
    const objet = un(["Une nappe carrée", "Une serviette carrée", "Une feuille carrée", "Un mouchoir carré", "Un foulard carré", "Une galette carrée", "Un sandwich carré", "Une plaque de pâte carrée", "Un tapis carré", "Un carreau de tissu"]);
    const qForme = Math.random() < 0.6;
    const coupe = /^Une /.test(objet) ? "coupée" : "coupé";
    return {
      text: tournure([`${objet} est ${coupe} ${plis}.`, `On découpe ${bas(objet)} ${plis}.`], [qForme ? "Quel est le nom le plus précis de chaque morceau ?" : "Combien de morceaux obtient-on ?", qForme ? "Quelle est la forme exacte des morceaux ?" : "Combien de morceaux y a-t-il ?"]),
      ...(qForme ? qcm("Des triangles rectangles isocèles", ["Des triangles équilatéraux", "Des triangles rectangles quelconques", "Des carrés", "Des losanges"]) : qcmN(n, [n + 1, n * 2, n - 1].filter((v) => v > 0))),
      canvas: poly("carre", { rot: 0, traits, droits: [0, 1, 2, 3], codes: [[0, 1], [1, 1], [2, 1], [3, 1]] }),
      explanation: etapes("on suit les coupes sur le dessin.", n === 2 ? "une diagonale coupe le carré en 2 morceaux, chacun avec un angle droit du carré et 2 côtés égaux." : "les diagonales du carré sont égales, perpendiculaires, et se coupent en leur milieu : 4 morceaux, chacun avec un angle droit et 2 côtés égaux.", qForme ? "ce sont des triangles rectangles isocèles." : `${n} morceaux.`),
    };
  }),
  D(16, 5, "Le rond touche les 4 bords : le côté du carré = le diamètre. Puis le tour = 4 côtés.", () => {
    const r = un([entre(3, 15), demi(3, 15)]);
    const c = r1(2 * r);
    const p = r1(4 * c);
    const [obj, boite, il] = un<[string, string, string]>([["une galette", "une boîte carrée", "elle"], ["une pizza", "un carton carré", "elle"], ["un gâteau rond", "une boîte carrée", "il"], ["une horloge", "un cadre carré", "elle"], ["un miroir rond", "un cadre carré", "il"], ["une assiette", "un set de table carré", "elle"], ["un bassin rond", "un enclos carré", "il"], ["une tarte", "un plateau carré", "elle"]]);
    return {
      text: tournure([`${obj.charAt(0).toUpperCase() + obj.slice(1)} de ${fr(r)} cm de rayon entre juste dans ${boite}.`, `On pose ${obj} de rayon ${fr(r)} cm dans ${boite} : ${il} touche les 4 bords.`], ["Quel est le périmètre de la boîte ?", "Combien mesure le tour de la boîte ?", "Quelle longueur de ruban faut-il pour faire le tour de la boîte ?"]),
      ...qcmN(p, [r1(4 * r), c, r1(2 * c), r1(8 * c)], "cm", 0.5),
      canvas: rondDansCarre(`${fr(r)} cm`, false),
      explanation: etapes(`le côté vaut le diamètre : 2 × ${fr(r)} = ${fr(c)} cm.`, `4 × ${fr(c)} = ${fr(p)}.`, `le périmètre de la boîte mesure ${fr(p)} cm.`),
    };
  }),
  D(17, 5, "Le milieu des diagonales : [OA] est la moitié de [AC], et dans un rectangle [AC] = [BD].", () => {
    const ls = lettres(4);
    const o = un(LETTRES.filter((x) => !ls.includes(x)));
    const s = intro(), u = s.u;
    const x = demi(3, 15);
    const f = un<"rectangle" | "carre">(["rectangle", "rectangle", "carre"]);
    const nom = f === "carre" ? "carré" : "rectangle";
    const cas = un(["somme", "diag"]);
    const rep = cas === "somme" ? r1(4 * x) : r1(2 * x);
    const [A, B, , D2] = ls;
    return {
      text: tournure([`${sansPoint(s.phrase)}, un ${nom} ${ls.join("")}.`], [`Ses diagonales se coupent en ${o} et [${o}${B}] mesure ${fr(x)} ${u}.`, `Le point ${o} est le milieu des diagonales ; [${o}${B}] mesure ${fr(x)} ${u}.`], [cas === "somme" ? "Quelle longueur font ses deux diagonales mises bout à bout ?" : `Combien mesure la diagonale [${A}${ls[2]}] ?`, cas === "somme" ? "Combien mesurent ses deux diagonales en tout ?" : `Quelle est la longueur de [${A}${ls[2]}] ?`]),
      ...qcmN(rep, cas === "somme" ? [r1(2 * x), r1(3 * x), r1(8 * x)] : [x, r1(4 * x), r1(x + 2)], u, 0.5),
      canvas: diagonales(f, { noms: ls, centre: o }),
      explanation: etapes(`${o} est le milieu : [${B}${D2}] = 2 × ${fr(x)} = ${fr(r1(2 * x))}.`, `dans un ${nom}, les diagonales ont la même longueur${cas === "somme" ? ` : ${fr(r1(2 * x))} + ${fr(r1(2 * x))} = ${fr(rep)}` : ""}.`, `la réponse est ${fr(rep)} ${u}.`),
    };
  }),
  D(18, 5, "Pour chaque figure, vérifie la propriété demandée.", () => {
    const [prop, juste, autres, f1, f2] = un<[string, string, string[], Forme, Forme]>([
      ["n'a PAS de diagonales de même longueur", "Le losange aplati", ["Le carré", "Le rectangle", "Le carré penché"], "losange", "rectangle"],
      ["n'a PAS de diagonales perpendiculaires", "Le rectangle allongé", ["Le carré", "Le losange", "Le carré penché"], "rectangle", "losange"],
      ["n'a PAS 4 angles droits", "Le losange aplati", ["Le carré", "Le rectangle", "Le carré penché"], "losange", "carre"],
      ["n'a PAS 4 côtés égaux", "Le rectangle allongé", ["Le carré", "Le losange", "Le carré penché"], "rectangle", "carre"],
      ["n'a PAS deux paires de côtés parallèles", "Le trapèze", ["Le carré", "Le losange", "Le rectangle"], "trapeze", "rectangle"],
      ["n'a PAS d'angle droit", "Le triangle équilatéral", ["Le triangle rectangle", "Le triangle rectangle isocèle", "Le carré"], "equilateral", "triRect"],
    ]);
    const qui = un(["Un jeu de l'intrus.", "Défi de l'intrus.", `${un(PRENOMS)} cherche l'intrus.`, "Trouve l'intrus."]);
    return {
      text: tournure([qui], [`Quelle figure ${prop} ?`, `Laquelle de ces figures ${prop} ?`]),
      ...qcm(juste, autres),
      canvas: duo(f1, f2),
      explanation: etapes("on vérifie la propriété pour chaque figure.", `seul${juste.startsWith("La") ? "e" : ""} ${bas(juste)} ${prop.replace("PAS", "pas")}.`, `l'intrus est ${bas(juste)}.`),
    };
  }),
];
