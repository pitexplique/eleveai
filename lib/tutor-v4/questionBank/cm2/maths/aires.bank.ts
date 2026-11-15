// lib/tutor-v4/questionBank/cm2/maths/aires.bank.ts
//
// L'AIRE au CM2 (notion `aire`) : cinq micro-compétences, chacune avec sa vidéo
// paysage (manim/scripts/cm2/aire_<micro>.py, voix dans manim/voix/cm2-aire-*.json).
// Les unités et conversions sont dans aires-unites.bank.ts (aire_unites,
// aire_convertir_unites), qui n'est pas touché ici.
//
// ⭐ 15/11/2026 — RÉÉCRITE EN GÉNÉRATEURS, sur le modèle du CM1 (73091243).
// Avant : 4 à 8 squelettes par micro, 15 à 19 répétitions sur 20 à une même
// étoile. Chaque gabarit tire une SITUATION de la vie (couturière, installatrice
// de panneaux solaires, chef traiteur, soigneuse de parc animalier, créatrice
// de skateparks, carreleur, voilière, menuisier…) × une TOURNURE × des nombres,
// et pose presque toujours sa FIGURE : `construction` pour les figures cotées
// (rectangle, triangle rectangle, L, rectangle troué), `figure_libre` pour le
// quadrillage.
//
// LA MÉTHODE ET LES MOTS SONT CEUX DES VIDÉOS :
//   - comprendre (jaune) : « l'aire, c'est la mesure d'une surface », on la
//     mesure avec un carré-unité ; « 2 demi-carrés font 1 carré » ; même aire,
//     formes différentes ; un plus grand tour ne veut pas dire une plus grande aire.
//   - carré et rectangle (verte) : « la longueur fois la largeur », « le côté fois
//     le côté », avec des nombres à virgule (2 × 1,5 = 3 m²) ; les deux côtés
//     dans la MÊME unité (1 m sur 50 cm → 1 × 0,5) ; combien de panneaux au plus.
//   - triangle rectangle (verte) : la moitié d'un rectangle ; « on multiplie les
//     deux côtés de l'angle droit, puis on divise par 2 » ; pas le grand côté
//     penché ; la tarte coupée en 4 parts.
//   - composer (verte) : DÉCOUPER en rectangles (ou triangles) puis additionner,
//     ou ENLEVER un morceau au grand rectangle ; chaque morceau compte une fois.
//   - défi (bleue) : retrouver un côté (l'aire ÷ l'autre côté ; pour un carré,
//     le nombre qui, fois lui-même, donne l'aire — pas ÷ 4) ; même aire, pas le
//     même tour ; les pots de peinture.
//
// ⛔ CM2 = ZÉRO CLAVIER (index.ts applique applyMathsKeyboardFree) : QCM seulement.
// ⛔ L'unité partout : « 12 cm² », « 40 m² », « 12 carrés », « 8 m ».
// ⛔ Les leurres sont de vraies erreurs d'élève : le périmètre, additionner au
//    lieu de multiplier, oublier ÷ 2, prendre le côté penché, oublier un morceau,
//    ajouter le trou, diviser par 4 l'aire d'un carré…
// ⛔ Division : « ÷ ».

import type { CanvasFigure, DifficultyLevel, TutorBankItemV4, TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import type { ConstructionCanvasData, FigureLibreCanvasData } from "@/lib/tutor-v4/types_canvas";
import { cap, entre, etapes, fr, melange, qcm, qcmN, un } from "../../cm1/maths/trous-outils";

type G = Omit<TutorGeneratedQuestionV4, "canvas"> & { canvas?: CanvasFigure };

/* ───────────────────────── Outils ───────────────────────── */

const arr = (v: number) => Math.round(v * 100) / 100;
const lg = (v: number, u: string) => `${fr(v)} ${u}`;
const ai = (v: number, u: string) => `${fr(v)} ${u}²`;
/** « 1 carré », « 12 carrés ». */
const nb = (v: number, p1: string, p: string) => `${fr(v)} ${v >= 2 ? p : p1}`;
/** QCM d'entiers avec leur nom accordé (« 1 pot », « 3 pots ») : leurres distincts, complétés par des voisins. */
function qcmU(juste: number, faux: number[], p1: string, p: string) {
  const vals: number[] = [];
  for (const v of melange(faux)) if (Number.isInteger(v) && v > 0 && v !== juste && !vals.includes(v)) vals.push(v);
  for (let k = 1; vals.length < 3 && k < 30; k++)
    for (const v of [juste + k, juste - k]) if (v > 0 && v !== juste && !vals.includes(v) && vals.length < 3) vals.push(v);
  return qcm(nb(juste, p1, p), vals.slice(0, 3).map((v) => nb(v, p1, p)));
}

type Personne = { n: string; il: "il" | "elle" };
const PERSONNES: Personne[] = [
  { n: "Elsa", il: "elle" }, { n: "Yasmine", il: "elle" }, { n: "Baptiste", il: "il" }, { n: "Nadia", il: "elle" },
  { n: "Romane", il: "elle" }, { n: "Téo", il: "il" }, { n: "Ravi", il: "il" }, { n: "Lou", il: "elle" },
  { n: "Malo", il: "il" }, { n: "Jade", il: "elle" }, { n: "Sacha", il: "il" }, { n: "Lina", il: "elle" },
  { n: "Yanis", il: "il" }, { n: "Maya", il: "elle" }, { n: "Noé", il: "il" }, { n: "Chloé", il: "elle" },
  { n: "Awa", il: "elle" }, { n: "Karim", il: "il" }, { n: "Emma", il: "elle" }, { n: "Hugo", il: "il" },
  { n: "Inès", il: "elle" }, { n: "Mathis", il: "il" },
];
const deN = (n: string) => (/^[AEIOUÉÈ]/.test(n) ? `d'${n}` : `de ${n}`);
const deux = (): [Personne, Personne] => {
  const a = un(PERSONNES);
  return [a, un(PERSONNES.filter((x) => x.n !== a.n))];
};
const qui = (metier: string) => (Math.random() < 0.5 ? metier : un(PERSONNES).n);

/* ───────────────────────── Les figures cotées (construction) ───────────────────────── */

type Pt = { id: string; x: number; y: number };
const cache = (l: Pt[]) => l.map((p) => ({ ...p, cache: true }));
const BLEU = "#dbeafe";
const JAUNE = "#fef3c7";
const BLANC = "#ffffff";
type Seg = NonNullable<ConstructionCanvasData["segments"]>[number];

/** Un rectangle (ou un carré) coté : longueur en bas, largeur à gauche. */
function figRect(L: number, l: number, o: { u?: string; carre?: boolean; tL?: string; tl?: string; diag?: boolean; sansCotes?: boolean } = {}): ConstructionCanvasData {
  const u = o.u ?? "cm";
  const tL = o.tL ?? lg(L, u);
  const tl = o.tl ?? lg(l, u);
  const segments: Seg[] = o.carre
    ? [{ a: "A", b: "B", texte: tL, code: 1 }, { a: "B", b: "C", code: 1 }, { a: "C", b: "D", code: 1 }, { a: "D", b: "A", code: 1 }]
    : [{ a: "A", b: "B", texte: tL }, { a: "D", b: "A", texte: tl }];
  if (o.sansCotes) segments.length = 0;
  if (o.diag) segments.push({ a: "A", b: "C", couleur: "#dc2626", epais: true });
  return {
    kind: "construction",
    points: cache([{ id: "A", x: 0, y: 0 }, { id: "B", x: L, y: 0 }, { id: "C", x: L, y: l }, { id: "D", x: 0, y: l }]),
    polygones: o.diag
      ? [{ sommets: ["A", "B", "C"], fond: BLEU }, { sommets: ["A", "C", "D"], fond: JAUNE }]
      : [{ sommets: ["A", "B", "C", "D"], fond: BLEU }],
    segments,
    angles: [{ sommet: "A", de: "D", vers: "B", droit: true }, { sommet: "C", de: "B", vers: "D", droit: true }],
    description: o.diag ? "Un rectangle coupé par sa diagonale en deux triangles rectangles" : o.carre ? "Un carré" : "Un rectangle",
  };
}

/** Un triangle rectangle : les deux côtés de l'angle droit (et parfois le côté penché),
 *  et parfois le rectangle « caché » en pointillés. */
function figTri(a: number, b: number, o: { u?: string; hyp?: number; fantome?: boolean; ta?: string; tb?: string } = {}): ConstructionCanvasData {
  const u = o.u ?? "cm";
  const segments: Seg[] = [
    { a: "A", b: "B", texte: o.ta ?? lg(a, u) },
    { a: "C", b: "A", texte: o.tb ?? lg(b, u) },
  ];
  if (o.hyp) segments.push({ a: "B", b: "C", texte: lg(o.hyp, u) });
  const points: Pt[] = [{ id: "A", x: 0, y: 0 }, { id: "B", x: a, y: 0 }, { id: "C", x: 0, y: b }];
  if (o.fantome) {
    points.push({ id: "D", x: a, y: b });
    segments.push({ a: "B", b: "D", pointille: true }, { a: "D", b: "C", pointille: true });
  }
  return {
    kind: "construction",
    points: cache(points),
    polygones: [{ sommets: ["A", "B", "C"], fond: BLEU }],
    segments,
    angles: [{ sommet: "A", de: "C", vers: "B", droit: true }],
    description: o.fantome ? "Un triangle rectangle, moitié du rectangle en pointillés" : "Un triangle rectangle",
  };
}

/** Une figure en L : en bas un rectangle W × h1, en haut à gauche un rectangle w1 × h2.
 *  « parts » : les cotes des deux rectangles ; « dehors » : les cotes du tour (h2 à déduire). */
function figL(W: number, h1: number, w1: number, h2: number, u: string, mode: "parts" | "dehors", coupe: boolean): ConstructionCanvasData {
  const m = Math.random() < 0.5;
  const X = (x: number) => (m ? W - x : x);
  const P = (id: string, x: number, y: number): Pt => ({ id, x: X(x), y });
  const points = [P("P0", 0, 0), P("P1", W, 0), P("P2", W, h1), P("P3", w1, h1), P("P4", w1, h1 + h2), P("P5", 0, h1 + h2), P("Q", 0, h1)];
  const segments: Seg[] =
    mode === "parts"
      ? [{ a: "P0", b: "P1", texte: lg(W, u) }, { a: "P1", b: "P2", texte: lg(h1, u) }, { a: "P4", b: "P5", texte: lg(w1, u) }, { a: "P3", b: "P4", texte: lg(h2, u) }]
      : [{ a: "P0", b: "P1", texte: lg(W, u) }, { a: "P5", b: "P0", texte: lg(h1 + h2, u) }, { a: "P4", b: "P5", texte: lg(w1, u) }, { a: "P1", b: "P2", texte: lg(h1, u) }];
  if (coupe) segments.push({ a: "Q", b: "P3", pointille: true, couleur: "#dc2626" });
  return {
    kind: "construction",
    points: cache(points),
    polygones: [{ sommets: ["P0", "P1", "P2", "P3", "P4", "P5"], fond: BLEU }],
    segments,
    description: "Une figure en L",
  };
}

/** Un grand rectangle L × l, avec un ou deux trous rectangulaires (blancs) cotés. */
function figTrou(L: number, l: number, trous: { a: number; b: number; x: number; y: number }[], u: string): ConstructionCanvasData {
  const points: Pt[] = [{ id: "A", x: 0, y: 0 }, { id: "B", x: L, y: 0 }, { id: "C", x: L, y: l }, { id: "D", x: 0, y: l }];
  const polygones: NonNullable<ConstructionCanvasData["polygones"]> = [{ sommets: ["A", "B", "C", "D"], fond: BLEU }];
  const segments: Seg[] = [{ a: "A", b: "B", texte: lg(L, u) }, { a: "D", b: "A", texte: lg(l, u) }];
  trous.forEach((t, k) => {
    const id = (s: string) => `${s}${k}`;
    points.push({ id: id("E"), x: t.x, y: t.y }, { id: id("F"), x: t.x + t.a, y: t.y }, { id: id("G"), x: t.x + t.a, y: t.y + t.b }, { id: id("H"), x: t.x, y: t.y + t.b });
    polygones.push({ sommets: [id("E"), id("F"), id("G"), id("H")], fond: BLANC });
    if (t.a === t.b) segments.push({ a: id("H"), b: id("G"), texte: lg(t.a, u), code: k + 1 }, { a: id("E"), b: id("F"), code: k + 1 }, { a: id("F"), b: id("G"), code: k + 1 }, { a: id("H"), b: id("E"), code: k + 1 });
    else segments.push({ a: id("H"), b: id("G"), texte: lg(t.a, u) }, { a: id("F"), b: id("G"), texte: lg(t.b, u) });
  });
  return { kind: "construction", points: cache(points), polygones, segments, description: "Un grand rectangle avec un morceau à enlever" };
}
/** Un trou a × b placé dans un rectangle L × l, sans toucher le bord. */
function placer(L: number, l: number, a: number, b: number) {
  return { a, b, x: arr((L - a) * (0.2 + 0.6 * Math.random())), y: arr((l - b) * (0.2 + 0.6 * Math.random())) };
}

/** Un rectangle L × l avec un triangle rectangle collé à droite (côtés de l'angle droit l et t). */
function figRectTri(L: number, l: number, t: number, u: string): ConstructionCanvasData {
  return {
    kind: "construction",
    points: cache([{ id: "A", x: 0, y: 0 }, { id: "B", x: L, y: 0 }, { id: "C", x: L, y: l }, { id: "D", x: 0, y: l }, { id: "E", x: L + t, y: 0 }]),
    polygones: [{ sommets: ["A", "B", "C", "D"], fond: BLEU }, { sommets: ["B", "E", "C"], fond: JAUNE }],
    segments: [{ a: "A", b: "B", texte: lg(L, u) }, { a: "D", b: "A", texte: lg(l, u) }, { a: "B", b: "E", texte: lg(t, u) }],
    angles: [{ sommet: "A", de: "D", vers: "B", droit: true }, { sommet: "B", de: "C", vers: "E", droit: true }],
    description: "Un rectangle et un triangle rectangle collés",
  };
}

/** Des carrés entiers et des demi-carrés (un carré coupé par sa diagonale). */
function figDemis(n: number, k: number): ConstructionCanvasData {
  const W = Math.min(6, Math.max(3, Math.ceil(Math.sqrt(n + k)) + 1));
  const points: Pt[] = [];
  const polygones: NonNullable<ConstructionCanvasData["polygones"]> = [];
  melange([...Array(n).fill(false), ...Array(k).fill(true)] as boolean[]).forEach((demi, i) => {
    const c = i % W;
    const r = -Math.floor(i / W);
    const ids = ["a", "b", "c", "d"].map((s) => `${s}${i}`);
    points.push({ id: ids[0], x: c, y: r - 1 }, { id: ids[1], x: c + 1, y: r - 1 }, { id: ids[2], x: c + 1, y: r }, { id: ids[3], x: c, y: r });
    if (demi) {
      polygones.push({ sommets: ids, fond: BLANC });
      polygones.push({ sommets: i % 2 ? [ids[0], ids[1], ids[3]] : [ids[1], ids[2], ids[3]], fond: BLEU });
    } else polygones.push({ sommets: ids, fond: BLEU });
  });
  return { kind: "construction", points: cache(points), polygones, description: "Des carrés entiers et des demi-carrés" };
}

/* ───────────────────────── Le quadrillage (figure_libre) ───────────────────────── */

type Case = [number, number];
type Noeud = [number, number];
const cle = ([r, c]: Case) => `${r},${c}`;
function rect(h: number, w: number, r0 = 0, c0 = 0): Case[] {
  const out: Case[] = [];
  for (let r = 0; r < h; r++) for (let c = 0; c < w; c++) out.push([r0 + r, c0 + c]);
  return out;
}
/** Le tour, en côtés de carreau. */
function contour(cases: Case[]): number {
  const s = new Set(cases.map(cle));
  let n = 0;
  for (const [r, c] of cases) for (const v of [[r - 1, c], [r + 1, c], [r, c - 1], [r, c + 1]] as Case[]) if (!s.has(cle(v))) n++;
  return n;
}
const unir = (...gs: Case[][]) => {
  const vus = new Set<string>();
  const out: Case[] = [];
  for (const g of gs) for (const k of g) if (!vus.has(cle(k))) (vus.add(cle(k)), out.push(k));
  return out;
};
const largeurCases = (cases: Case[]) => Math.max(...cases.map((k) => k[1])) + 1;
const hauteurCases = (cases: Case[]) => Math.max(...cases.map((k) => k[0])) + 1;
const cadre = (h: number, w: number, r0 = 0, c0 = 0): Noeud[] => [[r0, c0], [r0, c0 + w], [r0 + h, c0 + w], [r0 + h, c0], [r0, c0]];

/** Deux rectangles collés en L : l'un en haut (ou à gauche), l'autre en bas (ou à droite). */
type Deux = { cells: Case[]; a: { h: number; w: number }; b: { h: number; w: number }; coupe: Noeud[]; bbox: { h: number; w: number } };
function deuxRect(): Deux {
  if (Math.random() < 0.6) {
    const w1 = entre(4, 8);
    const h1 = entre(2, 3);
    const w2 = entre(2, w1 - 1);
    const h2 = entre(2, 4);
    const off = un([0, w1 - w2]);
    return { cells: [...rect(h1, w1), ...rect(h2, w2, h1, off)], a: { h: h1, w: w1 }, b: { h: h2, w: w2 }, coupe: [[h1, off], [h1, off + w2]], bbox: { h: h1 + h2, w: w1 } };
  }
  const h1 = entre(3, 6);
  const w1 = entre(2, 3);
  const h2 = entre(2, h1 - 1);
  const w2 = entre(2, 5);
  const off = un([0, h1 - h2]);
  return { cells: [...rect(h1, w1), ...rect(h2, w2, off, w1)], a: { h: h1, w: w1 }, b: { h: h2, w: w2 }, coupe: [[off, w1], [off + h2, w1]], bbox: { h: h1, w: w1 + w2 } };
}

/** Une ou plusieurs figures sur le même quadrillage, de gauche à droite. */
function grille(groupes: Case[][], o: { chemin?: Noeud[] } = {}): FigureLibreCanvasData {
  const tout: Case[] = [];
  let dec = 1;
  const debut: number[] = [];
  for (const g of groupes) {
    debut.push(dec);
    for (const [r, c] of g) tout.push([r + 1, c + dec]);
    const lc = debut.length === 1 && o.chemin ? Math.max(...o.chemin.map((p) => p[1])) : 0;
    dec += Math.max(largeurCases(g), lc) + 2;
  }
  const chemin = o.chemin?.map(([r, c]) => [r + 1, c + debut[0]] as Noeud);
  let rows = Math.max(...tout.map((k) => k[0])) + 2;
  if (chemin) rows = Math.max(rows, Math.max(...chemin.map((p) => p[0])) + 1);
  const cols = dec - 1;
  const cellSize = Math.max(14, Math.min(30, Math.floor(320 / cols), Math.floor(260 / rows)));
  return {
    kind: "figure_libre",
    size: { cellSize, padding: 8 },
    grid: { rows, cols, filledCells: tout },
    display: { showGrid: true, showFilled: true, showPerimeter: !!chemin },
    ...(chemin ? { perimeterPath: chemin } : {}),
  };
}

/** Une figure d'un seul tenant : coin retiré, bosse ou creux. */
function polyomino(maxW = 6, maxH = 4, minW = 3): Case[] {
  const w = entre(minW, maxW);
  const h = entre(2, maxH);
  let cases = rect(h, w, 1, 0);
  const v = un(["coin", "bosse", "creux", "bosse", "rien"]);
  const sans = (cs: Case[], ret: Case[]) => cs.filter((k) => !ret.some((x) => cle(x) === cle(k)));
  if (v === "coin") cases = sans(cases, [un<Case>([[1, w - 1], [1, 0], [h, 0], [h, w - 1]])]);
  if (v === "creux") cases = sans(cases, [[1, entre(1, w - 2)]]);
  if (v === "bosse") {
    const k = entre(1, w - 1);
    const d = entre(0, w - k);
    for (let c = d; c < d + k; c++) cases.push([0, c]);
  }
  const r0 = Math.min(...cases.map((k) => k[0]));
  return cases.map(([r, c]) => [r - r0, c] as Case);
}

/* ───────────────────────── Le fabricant ───────────────────────── */

const gab =
  (microId: string) =>
  (id: string, difficulty: DifficultyLevel, hint: string, generate: () => G): TutorBankItemV4 =>
    ({
      kind: "template",
      id: `cm2_${microId}_tpl_${id}`,
      niveau: "cm2",
      matiere: "maths",
      notionId: "aire",
      microId,
      difficulty,
      theme: "neutral",
      hint,
      tags: ["cm2", "aire", microId, "template"],
      generate,
    }) as TutorBankItemV4;

const fixe = (
  id: string,
  microId: string,
  difficulty: DifficultyLevel,
  text: string,
  juste: string,
  autres: string[],
  hint: string,
  explanation: string,
  canvas?: CanvasFigure,
): TutorBankItemV4 =>
  ({
    kind: "fixed",
    id,
    niveau: "cm2",
    matiere: "maths",
    notionId: "aire",
    microId,
    difficulty,
    theme: "neutral",
    text,
    format: "qcm",
    choices: [juste, ...autres],
    expected: [juste],
    comparator: "mcq_exact",
    hint,
    explanation,
    tags: ["cm2", "aire", microId, "qcm"],
    ...(canvas ? { canvas } : {}),
  }) as TutorBankItemV4;

/* ════════════════════════ AIRE_COMPRENDRE (ceinture jaune, ★1-★2) ════════════════════════
   Vidéo : Elsa la couturière, ses couvertures en patchwork. Le carré-unité ;
   3 rangées de 4 = 12 et 2 rangées de 6 = 12 : même aire, formes différentes ;
   2 demi-carrés font 1 carré (10 carrés et 4 demis = 12) ; tours de 14 et 16 :
   pas le même périmètre ; défi : 20 carrés, 4 rangées de 5, le galon fait 18. */

/** Ce qu'on COUVRE de pièces carrées (le carré-unité). */
type Couvrir = { metier: string; fait: string; le: string; de: string; p: string; p1: string };
const COUVRIR: Couvrir[] = [
  { metier: "La couturière", fait: "coud une couverture en patchwork avec des carrés de tissu", le: "la couverture", de: "de la couverture", p: "carrés de tissu", p1: "carré de tissu" },
  { metier: "Le carreleur", fait: "couvre le sol d'une cuisine avec des carreaux", le: "le sol", de: "du sol", p: "carreaux", p1: "carreau" },
  { metier: "La maraîchère", fait: "plante des salades dans une parcelle, une salade par case", le: "la parcelle", de: "de la parcelle", p: "cases", p1: "case" },
  { metier: "La créatrice de jeux vidéo", fait: "dessine une île avec des cases sur la carte de son jeu", le: "l'île", de: "de l'île", p: "cases", p1: "case" },
  { metier: "Le maçon", fait: "pave une allée avec des pavés carrés", le: "l'allée", de: "de l'allée", p: "pavés", p1: "pavé" },
  { metier: "Le jardinier du stade", fait: "pose des plaques de gazon carrées sur un terrain", le: "le terrain", de: "du terrain", p: "plaques", p1: "plaque" },
  { metier: "La chocolatière", fait: "moule une tablette de chocolat en carrés", le: "la tablette", de: "de la tablette", p: "carrés", p1: "carré" },
  { metier: "L'architecte", fait: "dessine le plan d'une chambre sur un quadrillage", le: "la chambre", de: "de la chambre", p: "carreaux", p1: "carreau" },
  { metier: "Le joueur", fait: "construit une base avec des blocs dans un jeu vidéo", le: "la base", de: "de la base", p: "blocs", p1: "bloc" },
  { metier: "La maîtresse", fait: "couvre un panneau de la classe avec des post-it carrés", le: "le panneau", de: "du panneau", p: "post-it", p1: "post-it" },
  { metier: "L'artiste", fait: "fait une mosaïque avec de petits carreaux", le: "la mosaïque", de: "de la mosaïque", p: "carreaux", p1: "carreau" },
  { metier: "Le pizzaiolo", fait: "coupe une grande pizza rectangulaire en parts carrées", le: "la pizza", de: "de la pizza", p: "parts", p1: "part" },
  { metier: "La coach de gym", fait: "couvre le sol de la salle avec des tapis carrés", le: "le sol de la salle", de: "du sol de la salle", p: "tapis", p1: "tapis" },
  { metier: "L'ingénieure", fait: "pose des panneaux solaires carrés sur un toit plat", le: "la zone de panneaux", de: "de la zone de panneaux", p: "panneaux", p1: "panneau" },
  { metier: "Le fermier", fait: "partage un champ en parcelles carrées", le: "le champ", de: "du champ", p: "parcelles", p1: "parcelle" },
  { metier: "La pâtissière", fait: "découpe un gâteau rectangulaire en parts carrées", le: "le gâteau", de: "du gâteau", p: "parts", p1: "part" },
  { metier: "L'élève", fait: "colorie une figure sur son cahier quadrillé", le: "la figure", de: "de la figure", p: "carreaux", p1: "carreau" },
  { metier: "Le décorateur", fait: "pose des dalles de moquette dans un salon", le: "le salon", de: "du salon", p: "dalles", p1: "dalle" },
  { metier: "La soigneuse du zoo", fait: "pose des dalles dans l'enclos des tortues", le: "l'enclos", de: "de l'enclos", p: "dalles", p1: "dalle" },
  { metier: "Le constructeur", fait: "assemble une plaque avec des briques de jeu carrées", le: "la plaque", de: "de la plaque", p: "briques", p1: "brique" },
  { metier: "La peintre", fait: "peint une fresque sur un mur quadrillé", le: "la fresque", de: "de la fresque", p: "carreaux", p1: "carreau" },
  { metier: "Le cuisinier", fait: "couvre le fond d'un plat avec des feuilles de lasagne carrées", le: "le fond du plat", de: "du fond du plat", p: "feuilles", p1: "feuille" },
  { metier: "Le photographe", fait: "colle des photos carrées sur un panneau d'exposition", le: "le panneau", de: "du panneau", p: "photos", p1: "photo" },
  { metier: "La quilteuse", fait: "assemble un dessus de lit avec des carrés de coton", le: "le dessus de lit", de: "du dessus de lit", p: "carrés de coton", p1: "carré de coton" },
  // Un contexte sur 25 à La Réunion (≈ 4 %).
  { metier: "Le planteur", fait: "partage son champ de cannes, à La Réunion, en parcelles carrées", le: "le champ de cannes", de: "du champ de cannes", p: "parcelles", p1: "parcelle" },
];

const ACTIONS_AIRE = [
  "peindre un mur", "carreler le sol d'une cuisine", "semer du gazon dans un jardin", "couvrir un livre avec du papier",
  "poser une nappe sur toute la table", "mettre de la moquette dans une chambre", "coller du papier peint sur un mur",
  "vernir le dessus d'une table", "étaler du glaçage sur le dessus d'un gâteau", "poser des panneaux solaires sur un toit",
  "coudre une couverture en patchwork", "recouvrir le sol d'une salle de judo avec des tapis", "colorier tout l'intérieur d'une figure",
  "pailler le sol d'une étable", "goudronner une cour de récréation",
];
const ACTIONS_TOUR = [
  "poser une clôture autour d'un jardin", "coller un ruban autour d'une carte", "poser une plinthe tout autour d'une cuisine",
  "coudre un galon tout autour d'une couverture", "accrocher une guirlande autour d'une fenêtre", "mettre une baguette autour d'un tableau",
  "tendre une corde autour d'un ring", "poser une bordure autour d'un massif de fleurs", "dessiner une frise autour d'une page",
  "poser du grillage autour d'un poulailler", "courir le long du bord d'un terrain", "coller du scotch sur le bord d'une affiche",
];

/** Ce dont on mesure l'aire, et l'unité carrée qui convient. */
const SURFACES_UNITE: { s: string; u: "cm" | "m" | "km" }[] = [
  { s: "un timbre", u: "cm" }, { s: "une carte à jouer", u: "cm" }, { s: "une page de cahier", u: "cm" }, { s: "un écran de téléphone", u: "cm" },
  { s: "une photo", u: "cm" }, { s: "un carreau de mosaïque", u: "cm" }, { s: "une étiquette", u: "cm" }, { s: "un tapis de souris", u: "cm" },
  { s: "une chambre", u: "m" }, { s: "un terrain de basket", u: "m" }, { s: "une salle de classe", u: "m" }, { s: "un jardin", u: "m" },
  { s: "un toit de maison", u: "m" }, { s: "une piscine", u: "m" }, { s: "un parking", u: "m" }, { s: "une cour de récréation", u: "m" },
  { s: "une forêt", u: "km" }, { s: "une ville", u: "km" }, { s: "un grand lac", u: "km" }, { s: "un pays", u: "km" }, { s: "une île", u: "km" },
];

const comprendre = gab("aire_comprendre");

const aireComprendre: TutorBankItemV4[] = [
  fixe("cm2_aire_comprendre_fixed_1_definition", "aire_comprendre", 1, "L'aire d'une figure mesure…", "sa surface",
    ["son contour", "le nombre de ses côtés", "sa masse"], "L'aire mesure la place occupée à l'intérieur.",
    "L'aire, c'est la mesure d'une surface : toute la place à l'intérieur. La longueur du tour, c'est le périmètre."),
  fixe("cm2_aire_comprendre_fixed_2_unite", "aire_comprendre", 1, "Quelle unité convient pour mesurer une aire ?", "cm²",
    ["cm", "cm³", "kg"], "Une aire se mesure avec une unité carrée.",
    "Une aire se mesure en unités carrées : cm². Le cm mesure une longueur, le cm³ un volume, le kg une masse."),
  fixe("cm2_aire_comprendre_fixed_3_ecriture", "aire_comprendre", 2, "Quelle écriture peut correspondre à une aire ?", "15 cm²",
    ["15 cm", "15 cm³", "15 kg"], "Une aire s'exprime en unités carrées.",
    "15 cm est une longueur, 15 cm³ un volume, 15 kg une masse. 15 cm² est une aire."),

  // ★1 — Aire ou périmètre ?
  comprendre("001_surface_ou_tour", 1, "Ce qui couvre l'intérieur, c'est l'aire. Ce qui fait le tour, c'est le périmètre.", () => {
    const estAire = Math.random() < 0.5;
    const a = estAire ? un(ACTIONS_AIRE) : un(ACTIONS_TOUR);
    const p = un(PERSONNES);
    const T = [
      `Pour ${a}, que cherche-t-on ?`,
      `${p.n} veut ${a}. Que doit-${p.il} connaître ?`,
      `${cap(a)} : cherche-t-on l'aire ou le périmètre ?`,
      `On veut ${a}. Quelle grandeur faut-il connaître ?`,
      `${p.n} doit ${a}. A-t-${p.il} besoin de l'aire ou du périmètre ?`,
    ];
    const h = entre(2, 4);
    const w = entre(3, 6);
    return {
      text: un(T),
      ...qcm(estAire ? "l'aire" : "le périmètre", ["l'aire", "le périmètre", "le volume", "la masse"]),
      explanation: estAire
        ? "On couvre toute la surface : c'est l'aire. Sur le dessin, l'aire, c'est le bleu ; le tour rouge, c'est le périmètre."
        : "On fait le tour : c'est le périmètre. Sur le dessin, le tour rouge, c'est le périmètre ; le bleu, c'est l'aire.",
      canvas: grille([rect(h, w)], { chemin: cadre(h, w) }),
    };
  }),

  // ★1 — Compter les carrés-unités.
  comprendre("002_compter_carres_unites", 1, "Compte les carrés-unités qui couvrent l'intérieur, un par un.", () => {
    const c = un(COUVRIR);
    const cells = Math.random() < 0.5 ? rect(entre(2, 4), entre(3, 5)) : polyomino(6, 3);
    const aire = cells.length;
    const Q = [
      `Chaque ${c.p1} est un carré-unité. Quelle est l'aire ${c.de} ?`,
      `Combien de ${c.p} couvrent ${c.le} ?`,
      `Quelle est l'aire ${c.de}, en ${c.p} ?`,
      `Compte les ${c.p} : quelle est l'aire ${c.de} ?`,
      `Quelle est la mesure de la surface ${c.de}, en ${c.p} ?`,
    ];
    return {
      text: `${qui(c.metier)} ${c.fait}. ${un(Q)}`,
      ...qcmN(aire, [contour(cells), aire + 1, aire - 1, aire + 2], c.p),
      explanation: etapes("l'aire se mesure avec un carré-unité : on compte ceux qui couvrent la surface, pas le bord.", `on compte les ${c.p} : ${aire}.`, `l'aire ${c.de} est de ${nb(aire, c.p1, c.p)}.`),
      canvas: grille([cells]),
    };
  }),

  // ★1 — L'unité qui convient.
  comprendre("003_unite_qui_convient", 1, "Une aire se mesure en unités CARRÉES : cm², m², km².", () => {
    const s = un(SURFACES_UNITE);
    const juste = `${s.u}²`;
    const autres = s.u === "cm" ? ["cm", "m", "L", "kg"] : s.u === "m" ? ["m", "km", "L", "kg"] : ["km", "m", "L", "kg"];
    const T = [
      `Quelle unité choisir pour mesurer l'aire d'${s.s} ?`,
      `On mesure la surface d'${s.s}. Quelle unité convient ?`,
      `${un(PERSONNES).n} veut connaître l'aire ${`d'${s.s}`}. En quelle unité l'écrire ?`,
      `Pour l'aire ${`d'${s.s}`}, quelle unité est la mieux adaptée ?`,
    ];
    return {
      text: un(T),
      ...qcm(juste, autres),
      explanation: etapes("une aire se mesure en unités carrées ; on choisit la taille qui convient.", `${s.u} mesure une longueur, L une contenance, kg une masse ; ${juste} mesure une aire.`, `on mesure l'aire ${`d'${s.s}`} en ${juste}.`),
    };
  }),

  // ★1 — Quelle mesure peut être une aire ?
  comprendre("004_quelle_mesure_est_une_aire", 1, "Cherche l'unité carrée.", () => {
    const s = un(SURFACES_UNITE.filter((x) => x.u !== "km"));
    const v = melange([entre(6, 40), entre(41, 90), entre(91, 150), entre(151, 300)]);
    const juste = `${v[0]} ${s.u}²`;
    const T = [
      `Laquelle de ces mesures peut être l'aire ${`d'${s.s}`} ?`,
      `${un(PERSONNES).n} a mesuré l'aire ${`d'${s.s}`}. Qu'a-t-${un(["il", "elle"])} pu écrire ?`,
      `Quelle écriture donne une aire, pour ${s.s} ?`,
      `On parle de l'aire ${`d'${s.s}`}. Quelle mesure convient ?`,
    ];
    return {
      text: un(T),
      ...qcm(juste, [`${v[1]} ${s.u}`, `${v[2]} L`, `${v[3]} kg`]),
      explanation: etapes("une aire s'écrit avec une unité carrée.", `${v[1]} ${s.u} est une longueur, ${v[2]} L une contenance, ${v[3]} kg une masse.`, `${juste} est une aire.`),
    };
  }),

  // ★2 — Rangées de carrés : 3 rangées de 4, 12 carrés.
  comprendre("005_rangees_de_carres", 2, "Le nombre de rangées fois le nombre de carrés dans une rangée.", () => {
    const c = un(COUVRIR);
    const r = entre(2, 6);
    const k = entre(3, 8);
    const aire = r * k;
    const deb = un([
      `${cap(c.le)} a ${r} rangées de ${nb(k, c.p1, c.p)}.`,
      `${cap(c.le)} compte ${r} rangées, et ${k} ${c.p} dans chaque rangée.`,
      `Il y a ${r} rangées de ${k} ${c.p} sur ${c.le}.`,
    ]);
    const Q = [`Quelle est l'aire ${c.de} ?`, `Combien de ${c.p} faut-il en tout ?`, `Quelle est l'aire ${c.de}, en ${c.p} ?`, `Combien de ${c.p} couvrent ${c.le} ?`];
    return {
      text: `${qui(c.metier)} ${c.fait}. ${deb} ${un(Q)}`,
      ...qcmN(aire, [r + k, 2 * (r + k), aire + k, aire - r], c.p),
      explanation: etapes("le nombre de rangées fois le nombre de carrés dans une rangée.", `${r} × ${k} = ${aire}.`, `l'aire ${c.de} est de ${nb(aire, c.p1, c.p)}.`),
      canvas: grille([rect(r, k)]),
    };
  }),

  // ★2 — Carrés entiers et demi-carrés.
  comprendre("006_demi_carres", 2, "2 demi-carrés font 1 carré entier.", () => {
    const c = un(COUVRIR.slice(0, 12));
    const n = entre(3, 10);
    const k = 2 * entre(1, 3);
    const aire = n + k / 2;
    const dit = Math.random() < 0.6;
    const deb = dit
      ? un([`On compte ${n} ${c.p} et ${k} demi-${c.p}.`, `Il y a ${n} ${c.p}, plus ${k} demi-${c.p}.`, `${cap(c.le)} : ${n} ${c.p} et ${k} demi-${c.p}.`])
      : un([`Regarde : il y a des ${c.p} et des demi-${c.p} (coupure en diagonale).`,`Compte les ${c.p} et les demi-${c.p}.`]);
    const Q = [`Quelle est l'aire ${c.de}, en ${c.p} ?`, `Combien de ${c.p} cela fait-il en tout ?`, `Quelle est l'aire ${c.de} ?`];
    return {
      text: `${qui(c.metier)} ${c.fait}. ${deb} ${un(Q)}`,
      ...qcmN(aire, [n + k, n, n + k * 2, k], c.p),
      explanation: etapes("2 demi-carrés font 1 carré entier.", `${k} demis = ${nb(k / 2, "entier", "entiers")} ;${n} + ${k / 2} = ${aire}.`, `l'aire ${c.de} est de ${nb(aire, c.p1, c.p)}.`),
      canvas: figDemis(n, k),
    };
  }),

  // ★2 — Même aire, formes différentes : laquelle demande le plus ?
  comprendre("007_meme_aire_formes_differentes", 2, "Calcule l'aire de chaque figure : la forme ne compte pas, seul le nombre de carrés compte.", () => {
    const [A, B] = deux();
    const c = un(COUVRIR.slice(0, 20));
    const PAIRES = [[[3, 4], [2, 6]], [[2, 8], [4, 4]], [[3, 6], [2, 9]], [[2, 10], [4, 5]], [[3, 8], [4, 6]], [[2, 9], [3, 6]], [[1, 12], [3, 4]], [[2, 7], [1, 14]]];
    let fa: number[];
    let fb: number[];
    if (Math.random() < 0.5) [fa, fb] = melange(un(PAIRES));
    else {
      fa = [entre(2, 4), entre(3, 7)];
      fb = [entre(2, 4), entre(3, 7)];
    }
    const sa = fa[0] * fa[1];
    const sb = fb[0] * fb[1];
    const juste = sa === sb ? "les deux autant" : sa > sb ? A.n : B.n;
    const Q = [`Qui demande le plus de ${c.p} ?`, `Qui a ${c.le} avec la plus grande aire ?`, `Qui a ${c.le} qui prend le plus de place ?`, `Qui doit poser le plus de ${c.p} ?`];
    return {
      text: `${qui(c.metier)} ${c.fait}. À gauche, ${c.le} ${deN(A.n)} : ${fa[0]} ${fa[0] > 1 ? "rangées" : "rangée"} de ${fa[1]}. À droite, ${c.le} ${deN(B.n)} : ${fb[0]} ${fb[0] > 1 ? "rangées" : "rangée"} de ${fb[1]}. ${un(Q)}`,
      ...qcm(juste, [A.n, B.n, "les deux autant"]),
      explanation: etapes("on calcule l'aire de chaque figure ; deux formes différentes peuvent avoir la même aire.", `${A.n} : ${fa[0]} × ${fa[1]} = ${sa} ; ${B.n} : ${fb[0]} × ${fb[1]} = ${sb}.`, sa === sb ? "même aire, formes différentes." : `${juste} en demande le plus.`),
      canvas: grille([rect(fa[0], fa[1]), rect(fb[0], fb[1])]),
    };
  }),

  // ★2 — Le tour ou l'intérieur ? (le galon et le tissu)
  comprendre("008_tour_ou_interieur", 2, "Le tour, c'est le périmètre. Ce qui couvre l'intérieur, c'est l'aire.", () => {
    const c = un(COUVRIR);
    let h = entre(2, 5);
    let w = entre(h + 1, 8);
    for (let e = 0; e < 10 && 2 * (h + w) === h * w; e++) (h = entre(2, 5)), (w = entre(h + 1, 8));
    if (2 * (h + w) === h * w) (h = 2), (w = 5);
    const aire = h * w;
    const tour = 2 * (h + w);
    const veutTour = Math.random() < 0.35;
    const deb = `${cap(c.le)} a ${h} rangées de ${nb(w, c.p1, c.p)}. ${un(["Un galon rouge fait tout le tour.", "On pose un ruban tout autour.", "Une bordure fait le tour."])}`;
    const Q = veutTour
      ? [`Combien de côtés de ${c.p1} mesure le tour ?`, `Le tour mesure combien de côtés de ${c.p1} ?`]
      : [`Combien de ${c.p} faut-il pour couvrir ${c.le} ?`, `Quelle est l'aire ${c.de} ?`, `Combien de ${c.p} couvrent tout l'intérieur ?`];
    return {
      text: `${qui(c.metier)} ${c.fait}. ${deb} ${un(Q)}`,
      ...(veutTour ? qcmN(tour, [aire, h + w, tour - 2], `côtés de ${c.p1}`) : qcmN(aire, [tour, h + w, aire + w], c.p)),
      explanation: etapes("le tour, c'est le périmètre ; couvrir l'intérieur, c'est l'aire.", `aire : ${h} × ${w} = ${aire} ; tour : ${w} + ${h} = ${h + w}, fois 2 : ${tour}.`, veutTour ? `le tour mesure ${tour} côtés de ${c.p1}.` : `il faut ${nb(aire, c.p1, c.p)}.`),
      canvas: grille([rect(h, w)], { chemin: cadre(h, w) }),
    };
  }),

  // ★2 — Le piège : « le plus grand tour a la plus grande aire ».
  comprendre("009_piege_plus_grand_tour", 2, "Ne te fie pas au tour : compte les carrés à l'intérieur.", () => {
    const p = un(PERSONNES);
    const PAIRES: [number, number, number, number][] = [[3, 4, 2, 6], [4, 4, 2, 8], [3, 6, 2, 9], [4, 5, 2, 10], [2, 8, 1, 16], [3, 3, 1, 9], [4, 6, 3, 8], [5, 4, 2, 10], [3, 5, 2, 8], [4, 4, 1, 12], [3, 4, 1, 10], [2, 3, 1, 8], [2, 4, 1, 10], [3, 3, 1, 11]];
    const [a, b, c2, d] = un(PAIRES);
    const sA = a * b;
    const sB = c2 * d;
    const tA = 2 * (a + b);
    const tB = 2 * (c2 + d);
    const objs = un(["couvertures", "nappes", "terrasses", "parcelles", "banderoles", "fresques", "pelouses", "mosaïques"]);
    const TOUJOURS = "Oui : le plus grand tour a toujours la plus grande aire";
    const MEME = "Non : les deux ont le même nombre de carrés";
    const juste = sA === sB ? `Non : les deux ont ${sA} carrés` : sB > sA ? `Oui : la longue a ${sB} carrés, l'autre ${sA}` : `Non : l'autre a ${sA} carrés, la longue ${sB}`;
    const autres =
      sA === sB ? ["Oui : la longue a le plus de carrés", TOUJOURS, "Non : l'autre a plus de carrés"]
      : sB > sA ? [MEME, "Non : l'autre a plus de carrés", TOUJOURS]
      : ["Oui : la longue a le plus de carrés", MEME, TOUJOURS];
    return {
      text: `${p.n} compare deux ${objs}. L'une a ${a} rangées de ${b} carrés, son tour fait ${tA}. La longue a ${c2} ${c2 > 1 ? "rangées" : "rangée"} de ${d} carrés, son tour fait ${tB}. ${cap(p.il)} dit : « La longue a le plus grand tour, donc la plus grande aire. » ${un(["Est-ce vrai ?", `${cap(p.il)} a raison ?`, "Qu'en penses-tu ?"])}`,
      ...qcm(juste, autres),
      explanation: etapes("un plus grand tour ne veut pas dire une plus grande aire : on compte les carrés à l'intérieur.", `${a} × ${b} = ${sA} carrés ; ${c2} × ${d} = ${sB} carrés.`, juste + "."),
      canvas: grille([rect(a, b), rect(c2, d)]),
    };
  }),

  // ★2 — A-t-elle assez de tissu ? (le défi de la vidéo)
  comprendre("010_assez_de_carres", 2, "Calcule l'aire (rangées × carrés), puis compare avec ce qu'il y a.", () => {
    const c = un(COUVRIR.slice(0, 22));
    const r = entre(3, 6);
    const k = entre(3, 7);
    const aire = r * k;
    const ecart = un([0, entre(1, 5), -entre(1, 5)]);
    const N = aire + ecart;
    const tour = 2 * (r + k);
    const juste = ecart === 0 ? "Oui, juste assez" : ecart > 0 ? `Oui, il en reste ${ecart}` : `Non, il en manque ${-ecart}`;
    const faux = [
      "Oui, juste assez",
      `Oui, il en reste ${Math.abs(ecart) || 2}`,
      `Non, il en manque ${Math.abs(ecart) || 2}`,
      N >= tour ? `Oui, il en reste ${N - tour}` : `Non, il en manque ${tour - N}`,
    ];
    return {
      text: `${qui(c.metier)} ${c.fait}. ${cap(c.le)} doit avoir ${r} rangées de ${nb(k, c.p1, c.p)}, et il y a ${nb(N, c.p1, c.p)}. ${un(["Y en a-t-il assez ?", "Est-ce assez ?", `A-t-on assez de ${c.p} ?`])}`,
      ...qcm(juste, faux),
      explanation: etapes("ce qu'il faut pour couvrir, c'est l'aire : rangées × carrés.", `${r} × ${k} = ${aire} ; on a ${N}.`, juste + "."),
      canvas: grille([rect(r, k)]),
    };
  }),
];

/* ════════════════════════ AIRE_CARRE_RECTANGLE (ceinture verte, ★1-★3) ════════════════════════
   Vidéo : Yasmine installe des panneaux solaires. Toit de 8 m sur 5 m : 40 m² ;
   panneau de 2 m sur 1,5 m : 3 m² ; garage carré de 6 m : 36 m² ; piège :
   1 m sur 50 cm → 1 × 0,5 = 0,5 m² ; défi : 40 m² de toit, panneaux de 3 m²,
   13 panneaux au plus, 1 m² libre. */

type Surf = { metier: string; fait: string; le: string; de: string; u: "cm" | "m"; max: number };
const SURF: Surf[] = [
  { metier: "L'installatrice de panneaux solaires", fait: "mesure un toit avant de commander", le: "le toit", de: "du toit", u: "m", max: 16 },
  { metier: "Le carreleur", fait: "doit carreler le sol d'une cuisine", le: "le sol", de: "du sol", u: "m", max: 9 },
  { metier: "La paysagiste", fait: "va semer une pelouse", le: "la pelouse", de: "de la pelouse", u: "m", max: 25 },
  { metier: "L'architecte", fait: "dessine une chambre", le: "la chambre", de: "de la chambre", u: "m", max: 8 },
  { metier: "Le peintre", fait: "doit peindre un mur", le: "le mur", de: "du mur", u: "m", max: 12 },
  { metier: "La couturière", fait: "coupe un set de table", le: "le set de table", de: "du set de table", u: "cm", max: 45 },
  { metier: "Le pâtissier", fait: "garnit une plaque de gâteau", le: "la plaque", de: "de la plaque", u: "cm", max: 40 },
  { metier: "La graphiste", fait: "imprime une affiche", le: "l'affiche", de: "de l'affiche", u: "cm", max: 60 },
  { metier: "Le menuisier", fait: "vernit une planche", le: "la planche", de: "de la planche", u: "cm", max: 80 },
  { metier: "La collectionneuse", fait: "range un timbre dans son album", le: "le timbre", de: "du timbre", u: "cm", max: 6 },
  { metier: "L'entraîneur", fait: "trace un terrain de handball", le: "le terrain", de: "du terrain", u: "m", max: 40 },
  { metier: "La soigneuse du zoo", fait: "prépare l'enclos des zèbres", le: "l'enclos", de: "de l'enclos", u: "m", max: 30 },
  { metier: "Le fermier", fait: "laboure un champ", le: "le champ", de: "du champ", u: "m", max: 50 },
  { metier: "Le maçon", fait: "coule une terrasse en béton", le: "la terrasse", de: "de la terrasse", u: "m", max: 10 },
  { metier: "La créatrice de jeux vidéo", fait: "choisit une tablette", le: "l'écran", de: "de l'écran", u: "cm", max: 25 },
  { metier: "Le jardinier", fait: "prépare un potager", le: "le potager", de: "du potager", u: "m", max: 12 },
  { metier: "La maître-nageuse", fait: "surveille un bassin", le: "le bassin", de: "du bassin", u: "m", max: 25 },
  { metier: "Le photographe", fait: "encadre une photo", le: "la photo", de: "de la photo", u: "cm", max: 30 },
  { metier: "Le libraire", fait: "recouvre un livre", le: "la couverture du livre", de: "de la couverture du livre", u: "cm", max: 30 },
  { metier: "La décoratrice", fait: "choisit un tapis", le: "le tapis", de: "du tapis", u: "m", max: 5 },
  { metier: "Le directeur de l'école", fait: "fait goudronner la cour", le: "la cour", de: "de la cour", u: "m", max: 30 },
  { metier: "La cuisinière", fait: "huile une plaque de four", le: "la plaque de four", de: "de la plaque de four", u: "cm", max: 45 },
  { metier: "Le vitrier", fait: "découpe une vitre", le: "la vitre", de: "de la vitre", u: "cm", max: 90 },
];
const surf = (max = 99) => un(SURF.filter((s) => s.max >= Math.min(max, 6)));
const QAIRE = (s: Surf) => [`Quelle est l'aire ${s.de} ?`, `Calcule l'aire ${s.de}.`, `Combien de ${s.u}² mesure ${s.le} ?`, `Quelle surface couvre ${s.le} ?`, `Trouve l'aire ${s.de}.`];

const carreRect = gab("aire_carre_rectangle");

const aireCarreRectangle: TutorBankItemV4[] = [
  fixe("cm2_aire_carre_rectangle_fixed_3_qcm_rectangle", "aire_carre_rectangle", 2, "Un rectangle mesure 7 m sur 4 m. Quelle est son aire ?", "28 m²",
    ["22 m²", "11 m²", "24 m²"], "La longueur fois la largeur.",
    etapes("pour un rectangle, la longueur fois la largeur.", "7 × 4 = 28. 22, c'est le périmètre : le tour, pas la surface.", "l'aire est de 28 m²."), figRect(7, 4, { u: "m" })),
  fixe("cm2_aire_carre_rectangle_fixed_4_piege_perimetre", "aire_carre_rectangle", 3, "Un carré a 9 cm de côté. Quelle est son aire ?", "81 cm²",
    ["36 cm²", "18 cm²", "72 cm²"], "Le côté fois le côté. Attention : 36 serait le tour.",
    etapes("pour un carré, le côté fois le côté.", "9 × 9 = 81. 36, c'est le tour du carré.", "l'aire est de 81 cm²."), figRect(9, 9, { carre: true })),

  // ★1 — Rectangle, nombres entiers.
  carreRect("001_rectangle_entiers", 1, "La longueur fois la largeur.", () => {
    const s = surf(6);
    const L = entre(3, Math.min(12, s.max));
    const l = entre(2, Math.max(2, L - 1));
    const aire = L * l;
    const deb = un([`${cap(s.le)} est un rectangle de ${L} ${s.u} sur ${l} ${s.u}.`, `${cap(s.le)} mesure ${L} ${s.u} de long et ${l} ${s.u} de large.`, `${cap(s.le)} a une longueur de ${L} ${s.u} et une largeur de ${l} ${s.u}.`]);
    return {
      text: `${qui(s.metier)} ${s.fait}. ${deb} ${un(QAIRE(s))}`,
      ...qcmN(aire, [2 * (L + l), L + l, aire + L, aire - l], `${s.u}²`),
      explanation: etapes("pour un rectangle : la longueur fois la largeur.", `${L} × ${l} = ${aire} ; ${2 * (L + l)} serait le tour.`, `l'aire ${s.de} est de ${ai(aire, s.u)}.`),
      canvas: figRect(L, l, { u: s.u }),
    };
  }),

  // ★1 — Carré, nombres entiers.
  carreRect("002_carre_entiers", 1, "Le côté fois le côté.", () => {
    const s = surf(6);
    let c = entre(3, Math.min(12, s.max));
    if (c === 4) c = un([3, 5, 6]);
    const aire = c * c;
    const deb = un([`${cap(s.le)} est un carré de ${c} ${s.u} de côté.`, `${cap(s.le)} est carré : ${c} ${s.u} sur ${c} ${s.u}.`, `${cap(s.le)} est un carré ; son côté mesure ${c} ${s.u}.`]);
    return {
      text: `${qui(s.metier)} ${s.fait}. ${deb} ${un(QAIRE(s))}`,
      ...qcmN(aire, [4 * c, 2 * c, aire + c, c * (c - 1)], `${s.u}²`),
      explanation: etapes("pour un carré : le côté fois le côté.", `${c} × ${c} = ${aire} ; ${4 * c}, c'est le tour.`, `l'aire ${s.de} est de ${ai(aire, s.u)}.`),
      canvas: figRect(c, c, { u: s.u, carre: true }),
    };
  }),

  // ★1 — Quel calcul donne l'aire ?
  carreRect("003_quel_calcul", 1, "Pour l'aire d'un rectangle, on multiplie la longueur par la largeur.", () => {
    const s = surf(6);
    const L = entre(4, Math.min(15, Math.max(5, s.max)));
    const l = entre(2, L - 1);
    const Q = [`Quel calcul donne l'aire ${s.de} ?`, `Pour trouver l'aire ${s.de}, quel calcul fait-on ?`, `Quel calcul faut-il faire pour l'aire ${s.de} ?`, `Quel calcul donne la surface ${s.de} ?`];
    return {
      text: `${qui(s.metier)} ${s.fait}. ${cap(s.le)} est un rectangle de ${L} ${s.u} sur ${l} ${s.u}. ${un(Q)}`,
      ...qcm(`${L} × ${l}`, [`${L} + ${l}`, `2 × (${L} + ${l})`, `${L} × 4`]),
      explanation: etapes("pour un rectangle : la longueur fois la largeur.", `${L} × ${l} = ${L * l} ; 2 × (${L} + ${l}), c'est le périmètre.`, `le calcul est ${L} × ${l}.`),
      canvas: figRect(L, l, { u: s.u }),
    };
  }),

  // ★2 — Rectangle avec un nombre à virgule (2 m sur 1,5 m).
  carreRect("004_rectangle_virgule", 2, "La longueur fois la largeur ; pense aux dixièmes : 2 × 1,5, c'est 2 × 1 plus 2 × 5 dixièmes.", () => {
    const s = surf(6);
    const a = entre(2, 9);
    const b = arr(entre(1, 5) + un([0.5, 0.5, 0.2, 0.4, 0.6, 0.8]));
    const aire = arr(a * b);
    const [L, l] = a >= b ? [a, b] : [b, a];
    const ent = Math.floor(b);
    const dix = Math.round((b - ent) * 10);
    return {
      text: `${qui(s.metier)} ${s.fait}. ${cap(s.le)} est un rectangle de ${fr(L)} ${s.u} sur ${fr(l)} ${s.u}. ${un(QAIRE(s))}`,
      ...qcmN(aire, [arr(a * ent + dix / 10), arr(2 * (a + b)), arr(a + b), arr(a * ent)], `${s.u}²`, 0.5),
      explanation: etapes("pour un rectangle : la longueur fois la largeur, même avec une virgule.", `${a} × ${fr(ent)} = ${a * ent} ; ${a} × ${dix} dixièmes = ${fr(arr((a * dix) / 10))} ; ${a * ent} + ${fr(arr((a * dix) / 10))} = ${fr(aire)}.`, `l'aire ${s.de} est de ${ai(aire, s.u)}.`),
      canvas: figRect(L, l, { u: s.u }),
    };
  }),

  // ★2 — Grands rectangles.
  carreRect("005_rectangle_grands_nombres", 2, "La longueur fois la largeur. Pose la multiplication si besoin.", () => {
    const s = un(SURF.filter((x) => x.max >= 20));
    const L = entre(12, s.max);
    const l = entre(5, Math.min(L - 1, 25));
    const aire = L * l;
    const deb = un([`${cap(s.le)} est un rectangle de ${L} ${s.u} sur ${l} ${s.u}.`, `${cap(s.le)} mesure ${L} ${s.u} de long et ${l} ${s.u} de large.`, `Longueur ${s.de} : ${L} ${s.u}. Largeur : ${l} ${s.u}.`]);
    return {
      text: `${qui(s.metier)} ${s.fait}. ${deb} ${un(QAIRE(s))}`,
      ...qcmN(aire, [2 * (L + l), aire + 10, aire - L, L + l], `${s.u}²`, 10),
      explanation: etapes("pour un rectangle : la longueur fois la largeur.", `${L} × ${l} = ${aire}.`, `l'aire ${s.de} est de ${ai(aire, s.u)}.`),
      canvas: figRect(L, l, { u: s.u }),
    };
  }),

  // ★2 — Grands carrés.
  carreRect("006_carre_grands_nombres", 2, "Le côté fois le côté, pas 4 fois le côté.", () => {
    const s = un(SURF.filter((x) => x.max >= 12));
    const c = un([11, 12, 13, 14, 15, 20, 25, 30, 16, 18].filter((x) => x <= Math.max(12, s.max)));
    const aire = c * c;
    return {
      text: `${qui(s.metier)} ${s.fait}. ${cap(s.le)} est un carré de ${c} ${s.u} de côté. ${un(QAIRE(s))}`,
      ...qcmN(aire, [4 * c, 2 * c, aire + c, aire - c], `${s.u}²`, 10),
      explanation: etapes("pour un carré : le côté fois le côté.", `${c} × ${c} = ${aire} ; ${4 * c}, c'est le tour.`, `l'aire ${s.de} est de ${ai(aire, s.u)}.`),
      canvas: figRect(c, c, { u: s.u, carre: true }),
    };
  }),

  // ★2 — Comparer deux surfaces.
  carreRect("007_comparer_rectangle_carre", 2, "Calcule les deux aires, puis compare.", () => {
    const [A, B] = deux();
    const obj = un(["potager", "tapis", "jardin", "parc à poneys", "terrain de jeu", "bac à sable", "panneau", "parking", "poulailler", "patio"]);
    const u = "m";
    const L = entre(5, 12);
    const l = entre(2, L - 2);
    const c = Math.random() < 0.3 && Number.isInteger(Math.sqrt(L * l)) ? Math.sqrt(L * l) : entre(3, 9);
    const sR = L * l;
    const sC = c * c;
    const juste = sR === sC ? "les deux ont la même aire" : sR > sC ? A.n : B.n;
    return {
      text: `Le ${obj} ${deN(A.n)} est un rectangle de ${L} ${u} sur ${l} ${u}. Celui ${deN(B.n)} est un carré de ${c} ${u} de côté. ${un([`Qui a le ${obj} avec la plus grande aire ?`, `Qui a le ${obj} qui prend le plus de place ?`, `Qui a le plus grand ${obj} ?`])}`,
      ...qcm(juste, [A.n, B.n, "les deux ont la même aire"]),
      explanation: etapes("on calcule l'aire de chaque figure, puis on compare.", `rectangle : ${L} × ${l} = ${sR} ${u}² ; carré : ${c} × ${c} = ${sC} ${u}².`, sR === sC ? "les deux ont la même aire." : `${juste} a le plus grand ${obj}.`),
      canvas: { ...figRect(L, l, { u }), description: "Le rectangle" },
    };
  }),

  // ★3 — Les deux côtés dans la même unité (1 m sur 50 cm).
  carreRect("008_meme_unite", 3, "Mets les deux côtés dans la même unité : 50 cm, c'est 0,5 m.", () => {
    const PIECES = [
      { metier: "L'installatrice", o: "un panneau solaire" }, { metier: "Le menuisier", o: "une planche" }, { metier: "La décoratrice", o: "un tapis de couloir" },
      { metier: "Le jardinier", o: "une bande de gazon" }, { metier: "La couturière", o: "une banderole" }, { metier: "Le peintre", o: "une bande de mur à peindre" },
      { metier: "La fleuriste", o: "une jardinière" }, { metier: "Le vitrier", o: "une vitre de vitrine" }, { metier: "L'imprimeur", o: "une affiche" },
      { metier: "Le maçon", o: "une marche" }, { metier: "La graphiste", o: "un panneau publicitaire" }, { metier: "Le cuisinier", o: "un plan de travail" },
    ];
    const P = un(PIECES);
    const L = entre(1, 6);
    const lcm = un([10, 20, 30, 40, 50, 50, 60, 70, 80, 90]);
    const l = lcm / 100;
    const aire = arr(L * l);
    return {
      text: `${qui(P.metier)} mesure ${P.o} : ${L} m sur ${lcm} cm. ${un(["Quelle est son aire, en m² ?", "Combien de m² mesure-t-elle ?".replace("-t-elle", P.o.startsWith("un ") ? "-t-il" : "-t-elle"), "Quelle surface couvre-t-elle, en m² ?".replace("-t-elle", P.o.startsWith("un ") ? "-t-il" : "-t-elle")])}`,
      ...qcmN(aire, [L * lcm, arr((L * lcm) / 10), arr(2 * (L + l)), arr(L + l)], "m²", 0.1),
      explanation: etapes("les deux côtés doivent être dans la même unité : on ne fait pas " + `${L} × ${lcm}.`, `${lcm} cm = ${fr(l)} m ; ${L} × ${fr(l)} = ${fr(aire)}.`, `l'aire est de ${fr(aire)} m².`),
      canvas: figRect(L, l, { u: "m", tL: `${L} m`, tl: `${lcm} cm` }),
    };
  }),

  // ★3 — Combien de panneaux au plus ? (le défi de la vidéo)
  carreRect("009_combien_au_plus", 3, "D'abord l'aire du toit, puis combien de fois l'aire d'un panneau tient dedans.", () => {
    const POSES = [
      { metier: "L'installatrice", sur: "un toit", le: "le toit", p: "panneaux solaires", p1: "panneau solaire" },
      { metier: "La paysagiste", sur: "une pelouse", le: "la pelouse", p: "rouleaux de gazon", p1: "rouleau de gazon" },
      { metier: "Le moquettiste", sur: "une salle", le: "la salle", p: "dalles de moquette", p1: "dalle de moquette" },
      { metier: "L'entraîneuse", sur: "un dojo", le: "le dojo", p: "tapis de judo", p1: "tapis de judo" },
      { metier: "Le maraîcher", sur: "un champ", le: "le champ", p: "bâches", p1: "bâche" },
      { metier: "La carreleuse", sur: "une terrasse", le: "la terrasse", p: "plaques de pierre", p1: "plaque de pierre" },
      { metier: "Le peintre", sur: "un mur", le: "le mur", p: "panneaux décoratifs", p1: "panneau décoratif" },
      { metier: "La fermière", sur: "un hangar", le: "le hangar", p: "plaques de tôle", p1: "plaque de tôle" },
    ];
    const P = un(POSES);
    let L = 0;
    let l = 0;
    let p = 0;
    for (let e = 0; e < 30; e++) {
      L = entre(5, 12);
      l = entre(3, L);
      p = un([2, 3, 4, 5, 6, 7]);
      if ((L * l) % p !== 0) break;
    }
    const A = L * l;
    const n = Math.floor(A / p);
    const reste = A - n * p;
    const veutReste = Math.random() < 0.35;
    return {
      text: `${qui(P.metier)} couvre ${P.sur} de ${L} m sur ${l} m avec des ${P.p}, ${p} m² par ${P.p1.split(" ")[0]}. ${veutReste ? un(["On pose le plus possible de " + P.p + ". Quelle aire reste libre ?", "Après en avoir posé le plus possible, combien de m² restent libres ?"]) : un([`Combien de ${P.p} au plus ?`, `Combien de ${P.p} peut-on poser au maximum ?`, `Combien de ${P.p} tiennent sur ${P.le} ?`])}`,
      ...(veutReste ? qcmN(reste, [p - reste, A - p, n], "m²") : qcmU(n, [n + 1, A, Math.floor(2 * (L + l) / p)], P.p1, P.p)),
      explanation: etapes("d'abord l'aire, ensuite combien de fois " + `${p} m² tient dedans.`, `${L} × ${l} = ${A} m² ; ${n} × ${p} = ${n * p}, et ${n + 1} × ${p} = ${(n + 1) * p}, c'est trop.`, veutReste ? `il reste ${A - n * p} m² libres.` : `on pose ${n} ${P.p} au plus.`),
      canvas: figRect(L, l, { u: "m" }),
    };
  }),

  // ★3 — Trouver l'erreur.
  carreRect("010_trouver_erreur", 3, "Refais le calcul : la longueur fois la largeur.", () => {
    const s = surf(6);
    const carre = Math.random() < 0.4;
    let L = entre(3, Math.min(12, s.max));
    let l = carre ? L : entre(2, Math.max(2, L - 1));
    for (let e = 0; e < 10 && (L * l === 2 * (L + l) || L * l === L + l || (carre && L === 4)); e++) (L = entre(3, Math.min(12, s.max))), (l = carre ? L : entre(2, Math.max(2, L - 1)));
    const err = un(["tour", "plus", "juste", "fois4"].filter((x) => carre || x !== "fois4"));
    const aire = L * l;
    const X = err === "tour" ? 2 * (L + l) : err === "plus" ? L + l : err === "fois4" ? 4 * L : aire;
    const p = un(PERSONNES);
    const il = cap(p.il);
    const D: Record<string, string> = {
      tour: `${il} a calculé le périmètre, pas l'aire`,
      plus: `${il} a additionné au lieu de multiplier`,
      fois4: `${il} a fait 4 fois le côté`,
      juste: `${il} a raison`,
    };
    const forme = carre ? `un carré de ${L} ${s.u} de côté` : `un rectangle de ${L} ${s.u} sur ${l} ${s.u}`;
    return {
      text: `${p.n} calcule l'aire ${s.de}, ${forme}. ${il} trouve ${X} ${s.u}². ${un(["Qu'en penses-tu ?", "Que s'est-il passé ?", "Vérifie : que dis-tu ?"])}`,
      ...qcm(D[err], carre ? Object.values(D) : [D.tour, D.plus, D.juste, `${il} a oublié l'unité`]),
      explanation: etapes(carre ? "pour un carré : le côté fois le côté." : "pour un rectangle : la longueur fois la largeur.", `${L} × ${l} = ${aire} ${s.u}².`, D[err] + "."),
      canvas: figRect(L, l, { u: s.u, carre }),
    };
  }),

  // ★3 — L'aire, puis le prix.
  carreRect("011_aire_puis_prix", 3, "D'abord l'aire en m², ensuite le prix : l'aire fois le prix d'un m².", () => {
    const ACHATS = [
      { metier: "Le carreleur", quoi: "le carrelage", ou: "le sol d'une cuisine" }, { metier: "La décoratrice", quoi: "la moquette", ou: "une chambre" },
      { metier: "Le paysagiste", quoi: "le gazon", ou: "un jardin" }, { metier: "Le menuisier", quoi: "le parquet", ou: "un salon" },
      { metier: "La peintre", quoi: "la peinture", ou: "un mur" }, { metier: "Le maçon", quoi: "le béton", ou: "une terrasse" },
      { metier: "L'installatrice", quoi: "les panneaux solaires", ou: "un toit" }, { metier: "La tapissière", quoi: "le papier peint", ou: "un mur" },
      { metier: "Le directeur", quoi: "le revêtement", ou: "une cour" }, { metier: "La gérante du gymnase", quoi: "le sol souple", ou: "une salle de sport" },
    ];
    const A = un(ACHATS);
    const L = entre(3, 9);
    const l = entre(2, L);
    const prix = un([5, 8, 10, 12, 15, 20, 25]);
    const aire = L * l;
    const total = aire * prix;
    return {
      text: `${qui(A.metier)} pose ${A.quoi} sur ${A.ou}, un rectangle de ${L} m sur ${l} m. ${cap(A.quoi)} coûte ${prix} € le m². ${un(["Combien coûte " + A.quoi + " ?", "Quel est le prix à payer ?", "Combien faut-il payer en tout ?"])}`,
      ...qcmN(total, [2 * (L + l) * prix, aire + prix, (L + l) * prix, aire], "€", 10),
      explanation: etapes("d'abord l'aire, ensuite le prix de tous les m².", `${L} × ${l} = ${aire} m² ; ${aire} × ${prix} = ${total}.`, `il faut payer ${fr(total)} €.`),
      canvas: figRect(L, l, { u: "m" }),
    };
  }),
];

/* ════════════════════════ AIRE_TRIANGLE_RECTANGLE (ceinture verte, ★2-★4) ════════════════════════
   Vidéo : Baptiste, chef traiteur, coupe des sandwichs rectangulaires en suivant
   la diagonale. 12 × 8 = 96, la moitié : 48 cm² ; « on multiplie les deux côtés
   de l'angle droit, puis on divise par 2 » ; piège : pas le grand côté penché,
   ne pas oublier ÷ 2 ; questions : 6 et 4 → 12 ; base 8 et hauteur 5 → 20 ;
   défi : tarte de 30 sur 20 → 600 → 300 → 150 cm². */

type Coupe = { metier: string; fait: string; obj: string; u: "cm" | "m"; max: number };
const COUPES: Coupe[] = [
  { metier: "Le chef traiteur", fait: "coupe un sandwich rectangulaire en deux, en suivant la diagonale", obj: "le sandwich", u: "cm", max: 16 },
  { metier: "La couturière", fait: "coupe un coupon de tissu rectangulaire le long de sa diagonale", obj: "le coupon", u: "cm", max: 80 },
  { metier: "Le menuisier", fait: "scie une planche rectangulaire en suivant sa diagonale", obj: "la planche", u: "cm", max: 90 },
  { metier: "La pâtissière", fait: "coupe un gâteau rectangulaire en deux triangles", obj: "le gâteau", u: "cm", max: 40 },
  { metier: "Le jardinier", fait: "partage une parcelle rectangulaire en deux, le long de la diagonale", obj: "la parcelle", u: "m", max: 30 },
  { metier: "La voilière", fait: "coupe une toile rectangulaire en deux voiles triangulaires", obj: "la toile", u: "m", max: 8 },
  { metier: "Le pizzaiolo", fait: "coupe une pizza rectangulaire en deux triangles", obj: "la pizza", u: "cm", max: 40 },
  { metier: "L'élève", fait: "découpe une feuille rectangulaire en suivant sa diagonale", obj: "la feuille", u: "cm", max: 30 },
  { metier: "Le vitrier", fait: "coupe une vitre rectangulaire en deux triangles", obj: "la vitre", u: "cm", max: 90 },
  { metier: "La paysagiste", fait: "sépare un jardin rectangulaire en deux massifs triangulaires", obj: "le jardin", u: "m", max: 20 },
  { metier: "Le carreleur", fait: "coupe un carreau rectangulaire le long de sa diagonale", obj: "le carreau", u: "cm", max: 30 },
  { metier: "La chocolatière", fait: "coupe une tablette de chocolat en deux triangles", obj: "la tablette", u: "cm", max: 16 },
  { metier: "L'architecte", fait: "partage un terrain rectangulaire en deux, le long de la diagonale", obj: "le terrain", u: "m", max: 40 },
  { metier: "L'artiste", fait: "coupe une toile à peindre rectangulaire en deux triangles", obj: "la toile", u: "cm", max: 60 },
  { metier: "Le fermier", fait: "partage un champ rectangulaire en deux, en suivant la diagonale", obj: "le champ", u: "m", max: 80 },
  { metier: "La boulangère", fait: "coupe une tranche de pain de mie en deux triangles", obj: "la tranche", u: "cm", max: 12 },
];
/** Des triangles rectangles de la vie. */
const TRIS: { o: string; de: string; u: "cm" | "m"; max: number }[] = [
  { o: "une équerre", de: "de l'équerre", u: "cm", max: 30 }, { o: "une voile de bateau", de: "de la voile", u: "m", max: 8 },
  { o: "une étagère d'angle", de: "de l'étagère", u: "cm", max: 40 }, { o: "une parcelle triangulaire", de: "de la parcelle", u: "m", max: 30 },
  { o: "une rampe de skate, vue de côté", de: "de la rampe", u: "m", max: 6 }, { o: "un morceau de tissu", de: "du morceau de tissu", u: "cm", max: 60 },
  { o: "une cale de porte", de: "de la cale", u: "cm", max: 12 }, { o: "une part de sandwich", de: "de la part", u: "cm", max: 16 },
  { o: "un carreau de mosaïque coupé", de: "du carreau", u: "cm", max: 20 }, { o: "un coin de jardin", de: "du coin de jardin", u: "m", max: 12 },
  { o: "une voile d'ombrage", de: "de la voile d'ombrage", u: "m", max: 6 }, { o: "un fanion", de: "du fanion", u: "cm", max: 40 },
  { o: "un panneau de bois", de: "du panneau", u: "cm", max: 80 }, { o: "une part de tarte", de: "de la part", u: "cm", max: 30 },
];
/** Deux côtés dont le produit est pair (aire entière). */
function cotesPairs(max: number, min = 2) {
  const hi = Math.max(min + 2, Math.min(max, 20));
  let a = entre(min, hi);
  let b = entre(min, hi);
  for (let e = 0; e < 20 && ((a * b) % 2 !== 0 || a === b); e++) (a = entre(min, hi)), (b = entre(min, hi));
  if ((a * b) % 2 !== 0) a += 1;
  return [a, b];
}
const TRIPLETS = [[3, 4, 5], [6, 8, 10], [5, 12, 13], [9, 12, 15], [8, 15, 17], [12, 16, 20], [15, 20, 25], [10, 24, 26]];
const QTRI = (de: string) => [`Quelle est l'aire ${de} ?`, `Calcule l'aire ${de}.`, `Quelle surface couvre ce triangle ?`, `Trouve l'aire ${de}.`];

const triangle = gab("aire_triangle_rectangle");

const aireTriangleRectangle: TutorBankItemV4[] = [
  fixe("cm2_aire_triangle_rectangle_fixed_2_qcm", "aire_triangle_rectangle", 3, "Un triangle rectangle a une base de 8 cm et une hauteur de 5 cm. Quelle est son aire ?", "20 cm²",
    ["13 cm²", "40 cm²", "26 cm²"], "N'oublie pas de diviser par 2.",
    etapes("on multiplie les deux côtés de l'angle droit, puis on divise par 2.", "8 × 5 = 40 ; 40 ÷ 2 = 20.", "l'aire est de 20 cm²."), figTri(8, 5, { ta: "8 cm", tb: "5 cm" })),

  // ★2 — La moitié du rectangle (l'aire du rectangle est donnée).
  triangle("001_moitie_du_rectangle", 2, "La diagonale coupe le rectangle en deux triangles pareils : chacun est la moitié.", () => {
    const c = un(COUPES);
    const [L, l] = cotesPairs(c.max, 3).sort((x, y) => y - x);
    const A = L * l;
    return {
      text: `${qui(c.metier)} ${c.fait}. ${cap(c.obj)} a une aire de ${A} ${c.u}². ${un(["Quelle est l'aire de chaque triangle ?", "Quelle est l'aire d'un triangle ?", "Combien de " + c.u + "² mesure chaque moitié ?", "Quelle surface a un des deux triangles ?"])}`,
      ...qcmN(A / 2, [A, 2 * A, A / 4, A - 2], `${c.u}²`),
      explanation: etapes("chaque triangle est la moitié du rectangle.", `${A} ÷ 2 = ${A / 2}.`, `chaque triangle a une aire de ${ai(A / 2, c.u)}.`),
      canvas: figRect(L, l, { u: c.u, diag: true, sansCotes: true }),
    };
  }),

  // ★2 — Le rectangle coupé : longueur × largeur, puis ÷ 2.
  triangle("002_rectangle_coupe", 2, "D'abord l'aire du rectangle, puis la moitié.", () => {
    const c = un(COUPES);
    const [L, l] = cotesPairs(c.max, 3).sort((x, y) => y - x);
    const A = L * l;
    return {
      text: `${qui(c.metier)} ${c.fait}. ${cap(c.obj)} mesure ${L} ${c.u} sur ${l} ${c.u}. ${un(["Quelle est l'aire de chaque triangle ?", "Quelle est l'aire d'un des triangles ?", "Combien mesure l'aire d'un triangle ?", "Quelle surface a chaque triangle rectangle ?"])}`,
      ...qcmN(A / 2, [A, L + l, 2 * (L + l), A / 4], `${c.u}²`),
      explanation: etapes("le triangle rectangle est la moitié du rectangle.", `${L} × ${l} = ${A} ; ${A} ÷ 2 = ${A / 2}.`, `chaque triangle a une aire de ${ai(A / 2, c.u)}.`),
      canvas: figRect(L, l, { u: c.u, diag: true }),
    };
  }),

  // ★2 — Les deux côtés de l'angle droit.
  triangle("003_cotes_angle_droit", 2, "On multiplie les deux côtés de l'angle droit, puis on divise par 2.", () => {
    const t = un(TRIS);
    const [a, b] = cotesPairs(t.max);
    const A = (a * b) / 2;
    const p = qui(un(["La menuisière", "Le géomètre", "L'élève", "Le bricoleur", "La designer", "Le chef de chantier"]));
    const deb = un([
      `${p} mesure ${t.o}. Les deux côtés de l'angle droit mesurent ${a} ${t.u} et ${b} ${t.u}.`,
      `${cap(t.o)} est un triangle rectangle : ${a} ${t.u} et ${b} ${t.u} pour les côtés de l'angle droit.`,
      `Les côtés de l'angle droit ${t.de} mesurent ${a} ${t.u} et ${b} ${t.u}.`,
    ]);
    return {
      text: `${deb} ${un(QTRI(t.de))}`,
      ...qcmN(A, [a * b, a + b, 2 * (a + b), A + a], `${t.u}²`),
      explanation: etapes("on multiplie les deux côtés de l'angle droit, puis on divise par 2.", `${a} × ${b} = ${a * b} ; ${a * b} ÷ 2 = ${A}.`, `l'aire ${t.de} est de ${ai(A, t.u)}.`),
      canvas: figTri(a, b, { u: t.u, fantome: Math.random() < 0.5 }),
    };
  }),

  // ★2 — Quel calcul ?
  triangle("004_quel_calcul", 2, "Le triangle rectangle est la moitié d'un rectangle.", () => {
    const t = un(TRIS);
    const [a, b] = cotesPairs(t.max);
    return {
      text: `Les côtés de l'angle droit ${t.de} mesurent ${a} ${t.u} et ${b} ${t.u}. ${un(["Quel calcul donne son aire ?", "Pour trouver son aire, quel calcul fait-on ?", "Quel calcul donne la surface de ce triangle ?"])}`,
      ...qcm(`${a} × ${b} ÷ 2`, [`${a} × ${b}`, `${a} + ${b}`, `(${a} + ${b}) × 2`]),
      explanation: etapes("on multiplie les deux côtés de l'angle droit, puis on divise par 2.", `${a} × ${b} = ${a * b}, c'est le rectangle entier ; le triangle en est la moitié.`, `le calcul est ${a} × ${b} ÷ 2.`),
      canvas: figTri(a, b, { u: t.u, fantome: true }),
    };
  }),

  // ★3 — Le piège du côté penché.
  triangle("005_piege_cote_penche", 3, "Prends les deux côtés de l'angle droit, pas le grand côté penché.", () => {
    const t = un(TRIS);
    const tr = un(TRIPLETS.filter((x) => x[2] <= Math.max(t.max, 15) * 1.5));
    const [a, b, h] = Math.random() < 0.5 ? tr : [tr[1], tr[0], tr[2]];
    const A = (a * b) / 2;
    return {
      text: `${cap(t.o)} est un triangle rectangle. Ses côtés mesurent ${a} ${t.u}, ${b} ${t.u} et ${h} ${t.u} (le grand côté penché). ${un(QTRI(t.de))}`,
      ...qcmN(A, [(a * h) / 2, (b * h) / 2, a * b, a + b + h], `${t.u}²`),
      explanation: etapes("on prend les deux côtés de l'angle droit, pas le côté penché ; puis on divise par 2.", `${a} × ${b} = ${a * b} ; ${a * b} ÷ 2 = ${A}.`, `l'aire ${t.de} est de ${ai(A, t.u)}.`),
      canvas: figTri(a, b, { u: t.u, hyp: h }),
    };
  }),

  // ★3 — Base et hauteur, nombres parfois impairs (résultat à virgule).
  triangle("006_base_hauteur", 3, "Base fois hauteur, puis divise par 2 (le résultat peut avoir une virgule).", () => {
    const t = un(TRIS);
    const a = entre(3, Math.min(25, Math.max(9, t.max)));
    const b = entre(3, Math.min(15, Math.max(7, t.max)));
    const A = arr((a * b) / 2);
    const deb = un([
      `${cap(t.o)} est un triangle rectangle de base ${a} ${t.u} et de hauteur ${b} ${t.u}.`,
      `Le triangle rectangle ${t.de} a une base de ${a} ${t.u} et une hauteur de ${b} ${t.u}.`,
      `Base ${t.de} : ${a} ${t.u}. Hauteur : ${b} ${t.u}. L'angle droit est entre les deux.`,
    ]);
    return {
      text: `${deb} ${un(QTRI(t.de))}`,
      ...qcmN(A, [a * b, a + b, 2 * (a + b), arr((a * b) / 4)], `${t.u}²`, 0.5),
      explanation: etapes("on multiplie la base par la hauteur (les côtés de l'angle droit), puis on divise par 2.", `${a} × ${b} = ${a * b} ; ${a * b} ÷ 2 = ${fr(A)}.`, `l'aire ${t.de} est de ${ai(A, t.u)}.`),
      canvas: figTri(a, b, { u: t.u }),
    };
  }),

  // ★3 — Trouver l'erreur.
  triangle("007_trouver_erreur", 3, "Les deux côtés de l'angle droit, multipliés, puis ÷ 2.", () => {
    const t = un(TRIS);
    const [a, b, h] = un(TRIPLETS.slice(0, 6));
    const A = (a * b) / 2;
    const err = un(["oubli", "penche", "plus", "juste"]);
    const X = err === "oubli" ? a * b : err === "penche" ? (a * h) / 2 : err === "plus" ? a + b : A;
    const p = un(PERSONNES);
    const il = cap(p.il);
    const D: Record<string, string> = {
      oubli: `${il} a oublié de diviser par 2`,
      penche: `${il} a pris le côté penché`,
      plus: `${il} a additionné au lieu de multiplier`,
      juste: `${il} a raison`,
    };
    return {
      text: `${p.n} calcule l'aire ${t.de}, un triangle rectangle de côtés ${a} ${t.u}, ${b} ${t.u} et ${h} ${t.u}. ${il} trouve ${X} ${t.u}². ${un(["Qu'en penses-tu ?", "Que s'est-il passé ?", "Vérifie : que dis-tu ?"])}`,
      ...qcm(D[err], Object.values(D)),
      explanation: etapes("on multiplie les deux côtés de l'angle droit, puis on divise par 2.", `${a} × ${b} = ${a * b} ; ${a * b} ÷ 2 = ${A} ${t.u}².`, D[err] + "."),
      canvas: figTri(a, b, { u: t.u, hyp: h }),
    };
  }),

  // ★3 — Le rectangle coupé, grands nombres.
  triangle("008_rectangle_coupe_grand", 3, "L'aire du rectangle, puis la moitié.", () => {
    const c = un(COUPES.filter((x) => x.max >= 30));
    const L = un([20, 24, 25, 30, 32, 35, 40, 45, 50, 60].filter((x) => x <= c.max));
    const l = un([10, 12, 14, 15, 16, 18, 20, 25].filter((x) => x < L));
    const A = L * l;
    return {
      text: `${qui(c.metier)} ${c.fait}. ${cap(c.obj)} mesure ${L} ${c.u} sur ${l} ${c.u}. ${un(["Quelle est l'aire de chaque triangle ?", "Quelle est l'aire d'un triangle ?", "Combien de " + c.u + "² pour un triangle ?"])}`,
      ...qcmN(A / 2, [A, L + l, A / 2 + L, 2 * (L + l)], `${c.u}²`, 10),
      explanation: etapes("le triangle rectangle est la moitié du rectangle.", `${L} × ${l} = ${A} ; ${A} ÷ 2 = ${fr(A / 2)}.`, `chaque triangle a une aire de ${ai(A / 2, c.u)}.`),
      canvas: figRect(L, l, { u: c.u, diag: true }),
    };
  }),

  // ★4 — La tarte en 4 parts (le défi de la vidéo).
  triangle("009_quatre_parts", 4, "Le rectangle, puis la moitié (un triangle), puis encore la moitié (une part).", () => {
    const c = un(COUPES.filter((x) => x.u === "cm"));
    const L = un([12, 16, 20, 24, 30, 40].filter((x) => x <= Math.max(16, c.max)));
    const l = un([4, 6, 8, 10, 12, 20].filter((x) => x < L));
    const A = L * l;
    return {
      text: `${qui(c.metier)} coupe ${c.obj} en deux triangles rectangles, en suivant la diagonale. ${cap(c.obj)} mesure ${L} ${c.u} sur ${l} ${c.u}. Puis chaque triangle est partagé en 2 parts de même aire. ${un(["Quelle est l'aire d'une petite part ?", "Combien mesure une petite part ?", "Quelle surface a chaque petite part ?"])}`,
      ...qcmN(A / 4, [A / 2, A, A / 8, L + l], `${c.u}²`),
      explanation: etapes("on calcule le rectangle, puis la moitié, puis encore la moitié.", `${L} × ${l} = ${A} ; ${A} ÷ 2 = ${A / 2} ; ${A / 2} ÷ 2 = ${fr(A / 4)}.`, `une petite part a une aire de ${ai(A / 4, c.u)}.`),
      canvas: figRect(L, l, { u: c.u, diag: true }),
    };
  }),

  // ★4 — Retrouver un côté de l'angle droit.
  triangle("010_cote_manquant", 4, "L'aire fois 2 donne le rectangle ; on divise ensuite par le côté connu.", () => {
    const t = un(TRIS);
    const [a, b] = cotesPairs(Math.min(t.max, 14), 3);
    const A = (a * b) / 2;
    return {
      text: `${cap(t.o)} est un triangle rectangle d'aire ${A} ${t.u}². Un côté de l'angle droit mesure ${a} ${t.u}. ${un(["Combien mesure l'autre côté de l'angle droit ?", "Quelle est la longueur de l'autre côté de l'angle droit ?", "Trouve l'autre côté de l'angle droit."])}`,
      ...qcmN(b, [A / a, A - a, 2 * A, b + 2], t.u, 1),
      explanation: etapes("le rectangle caché a une aire double ; son autre côté, c'est cette aire ÷ le côté connu.", `${A} × 2 = ${a * b} ; ${a * b} ÷ ${a} = ${b}. On vérifie : ${a} × ${b} ÷ 2 = ${A}.`, `l'autre côté mesure ${lg(b, t.u)}.`),
      canvas: figTri(a, b, { u: t.u, tb: `? ${t.u}` }),
    };
  }),

  // ★4 — Plusieurs triangles identiques.
  triangle("011_plusieurs_triangles", 4, "L'aire d'un triangle, puis fois le nombre de triangles.", () => {
    const FAB = [
      { metier: "La couturière", f: "coud", o: "fanions en tissu" }, { metier: "Le menuisier", f: "découpe", o: "étagères d'angle" },
      { metier: "La voilière", f: "fabrique", o: "voiles" }, { metier: "Le carreleur", f: "pose", o: "carreaux triangulaires" },
      { metier: "La pâtissière", f: "prépare", o: "parts de gâteau" }, { metier: "Le chef traiteur", f: "prépare", o: "sandwichs triangulaires" },
      { metier: "L'artiste", f: "peint", o: "triangles de couleur" }, { metier: "Le vitrier", f: "coupe", o: "vitres triangulaires" },
    ];
    const F = un(FAB);
    const u = un(["cm", "cm", "m"]);
    const [a, b] = cotesPairs(u === "cm" ? 20 : 6);
    const n = entre(3, 9);
    const A = (a * b) / 2;
    return {
      text: `${qui(F.metier)} ${F.f} ${n} ${F.o}. Chacun est un triangle rectangle : ${a} ${u} et ${b} ${u} pour les côtés de l'angle droit. ${un(["Quelle aire en tout ?", "Quelle est l'aire totale ?", "Combien de " + u + "² en tout ?"])}`,
      ...qcmN(n * A, [n * a * b, A, n + A, n * (a + b)], `${u}²`),
      explanation: etapes("l'aire d'un triangle, puis on multiplie par le nombre de triangles.", `${a} × ${b} ÷ 2 = ${A} ; ${A} × ${n} = ${n * A}.`, `en tout : ${ai(n * A, u)}.`),
      canvas: figTri(a, b, { u }),
    };
  }),

  // ★4 — Triangle ou carré : lequel est le plus grand ?
  triangle("012_triangle_ou_carre", 4, "Calcule les deux aires : le triangle, c'est la moitié du rectangle.", () => {
    const [A, B] = deux();
    const obj = un(["potager", "massif de fleurs", "panneau", "morceau de tissu", "bac à sable", "parterre", "coin pique-nique", "tapis"]);
    const u = un(["m", "cm"]);
    const [a, b] = cotesPairs(12, 3);
    const T = (a * b) / 2;
    let c = entre(2, 8);
    if (Math.random() < 0.25) for (let k = 2; k < 12; k++) if (k * k === T) c = k;
    const C = c * c;
    const juste = T === C ? "les deux ont la même aire" : T > C ? A.n : B.n;
    return {
      text: `Le ${obj} ${deN(A.n)} est un triangle rectangle : ${a} ${u} et ${b} ${u} pour les côtés de l'angle droit. Celui ${deN(B.n)} est un carré de ${c} ${u} de côté. ${un([`Qui a le ${obj} avec la plus grande aire ?`, `Qui a le plus grand ${obj} ?`, `Quel ${obj} est le plus grand : celui ${deN(A.n)} ou celui ${deN(B.n)} ?`])}`,
      ...qcm(juste, [A.n, B.n, "les deux ont la même aire"]),
      explanation: etapes("on calcule chaque aire, puis on compare.", `triangle : ${a} × ${b} ÷ 2 = ${T} ${u}² ; carré : ${c} × ${c} = ${C} ${u}².`, T === C ? "les deux ont la même aire." : `${juste} a le plus grand ${obj}.`),
      canvas: figTri(a, b, { u }),
    };
  }),
];

/* ════════════════════════ AIRE_COMPOSER (ceinture verte, ★2-★3) ════════════════════════
   Vidéo : Nadia, soigneuse dans un parc animalier. L'enclos des tortues en L
   découpé : 8 × 3 = 24 et 4 × 3 = 12, 36 m² ; enlever : 10 × 6 − 4 × 2 = 52 m² ;
   piège : chaque morceau compte une seule fois (pas de chevauchement) ;
   questions : 5 × 4 + 3 × 2 = 26 ; 9 × 5 − 3 × 3 = 36 ; défi : rectangle 6 × 4 +
   triangle 4 et 3 → 30 m². */

type Chantier = { metier: string; action: string; le: string; de: string; trou: string; troule: string };
const CHANTIERS: Chantier[] = [
  { metier: "La soigneuse du parc animalier", action: "couvre d'herbe le sol d'un enclos", le: "l'enclos", de: "de l'enclos", trou: "un bassin", troule: "le bassin" },
  { metier: "Le carreleur", action: "carrelle le sol d'une salle", le: "la salle", de: "de la salle", trou: "un placard", troule: "le placard" },
  { metier: "L'architecte", action: "dessine le plan d'un appartement", le: "l'appartement", de: "de l'appartement", trou: "une cage d'escalier", troule: "la cage d'escalier" },
  { metier: "La paysagiste", action: "sème du gazon dans un jardin", le: "le jardin", de: "du jardin", trou: "une piscine", troule: "la piscine" },
  { metier: "Le maçon", action: "coule une terrasse en béton", le: "la terrasse", de: "de la terrasse", trou: "un carré pour un arbre", troule: "le carré de l'arbre" },
  { metier: "La créatrice de skateparks", action: "peint le sol d'un skatepark", le: "le skatepark", de: "du skatepark", trou: "une rampe", troule: "la rampe" },
  { metier: "Le peintre", action: "peint le sol d'un garage", le: "le garage", de: "du garage", trou: "un établi", troule: "l'établi" },
  { metier: "Le décorateur", action: "pose de la moquette dans un salon", le: "le salon", de: "du salon", trou: "une cheminée", troule: "la cheminée" },
  { metier: "La fermière", action: "paille le sol d'une étable", le: "l'étable", de: "de l'étable", trou: "un abreuvoir", troule: "l'abreuvoir" },
  { metier: "Le jardinier", action: "prépare un potager", le: "le potager", de: "du potager", trou: "une cabane", troule: "la cabane" },
  { metier: "L'entraîneuse", action: "couvre de tapis une salle de judo", le: "la salle", de: "de la salle", trou: "un poteau carré", troule: "le poteau" },
  { metier: "La directrice de l'école", action: "fait goudronner la cour", le: "la cour", de: "de la cour", trou: "un bac à sable", troule: "le bac à sable" },
  { metier: "Le gardien du gymnase", action: "vernit le parquet du gymnase", le: "le gymnase", de: "du gymnase", trou: "une estrade", troule: "l'estrade" },
  { metier: "L'ingénieure", action: "couvre un toit plat de panneaux solaires", le: "le toit", de: "du toit", trou: "une cheminée", troule: "la cheminée" },
  { metier: "La bibliothécaire", action: "pose un tapis dans le coin lecture", le: "le coin lecture", de: "du coin lecture", trou: "une étagère", troule: "l'étagère" },
  { metier: "La gérante du camping", action: "sème une pelouse", le: "la pelouse", de: "de la pelouse", trou: "une aire de jeux", troule: "l'aire de jeux" },
  { metier: "La cheffe de chantier", action: "fait paver une place", le: "la place", de: "de la place", trou: "une fontaine", troule: "la fontaine" },
  { metier: "Le soigneur du zoo", action: "couvre de sable l'enclos des lémuriens", le: "l'enclos", de: "de l'enclos", trou: "un arbre à grimper", troule: "l'arbre à grimper" },
  { metier: "Le vigneron", action: "désherbe une parcelle", le: "la parcelle", de: "de la parcelle", trou: "une cabane à outils", troule: "la cabane" },
];
const QCOMP = (C: Chantier) => [`Quelle est l'aire ${C.de} ?`, `Combien de m² faut-il couvrir ?`, `Quelle surface faut-il couvrir ?`, `Calcule l'aire ${C.de}.`];

/** Un L (deux rectangles) en mètres : en bas W × h1, en haut w1 × h2. */
function dimsL() {
  const W = entre(5, 12);
  const h1 = entre(2, 5);
  const w1 = entre(2, W - 2);
  const h2 = entre(2, 6);
  return { W, h1, w1, h2, a: W * h1, b: w1 * h2 };
}

const composer = gab("aire_composer");

const aireComposer: TutorBankItemV4[] = [
  fixe("cm2_aire_composer_fixed_3_methode", "aire_composer", 3, "Pour calculer l'aire d'une figure qui n'est pas un rectangle, on peut…", "la découper en rectangles, puis additionner",
    ["additionner les longueurs de tous ses côtés", "multiplier toutes les longueurs", "compter seulement son tour"], "On veut une surface, pas un tour.",
    "On découpe la figure en rectangles (ou en triangles), on calcule chaque morceau, puis on additionne. Chaque morceau compte une seule fois."),

  // ★2 — Le L sur quadrillage.
  composer("001_L_quadrillage", 2, "Découpe en deux rectangles le long du trait rouge, calcule chacun, puis additionne.", () => {
    const C = un(CHANTIERS);
    const d = deuxRect();
    const a = d.a.h * d.a.w;
    const b = d.b.h * d.b.w;
    const aire = a + b;
    return {
      text: `${qui(C.metier)} ${C.action}, en forme de L. Chaque carreau représente 1 m². ${un(QCOMP(C))}`,
      ...qcmN(aire, [contour(d.cells), d.bbox.h * d.bbox.w, a, b + a + d.b.w], "m²"),
      explanation: etapes("on découpe en deux rectangles, on calcule chacun, puis on additionne.", `${d.a.h} × ${d.a.w} = ${a} ; ${d.b.h} × ${d.b.w} = ${b} ; ${a} + ${b} = ${aire}.`, `l'aire ${C.de} est de ${aire} m².`),
      canvas: grille([d.cells], { chemin: d.coupe }),
    };
  }),

  // ★2 — Deux rectangles donnés.
  composer("002_deux_rectangles", 2, "Calcule chaque rectangle, puis additionne les deux morceaux.", () => {
    const C = un(CHANTIERS);
    const { W, h1, w1, h2, a, b } = dimsL();
    const aire = a + b;
    const deb = un([
      `${cap(C.le)} est en forme de L : un rectangle de ${W} m sur ${h1} m et un rectangle de ${w1} m sur ${h2} m.`,
      `On découpe ${C.le} en deux rectangles : ${W} m sur ${h1} m, et ${w1} m sur ${h2} m.`,
      `${cap(C.le)} se compose de deux rectangles collés : ${W} m sur ${h1} m, et ${w1} m sur ${h2} m.`,
    ]);
    return {
      text: `${qui(C.metier)} ${C.action}. ${deb} ${un(QCOMP(C))}`,
      ...qcmN(aire, [W + h1 + w1 + h2, a * b > 2000 ? a + b + W : a * b, a, (W + w1) * (h1 + h2)], "m²"),
      explanation: etapes("on calcule chaque morceau, puis on additionne.", `${W} × ${h1} = ${a} ; ${w1} × ${h2} = ${b} ; ${a} + ${b} = ${aire}.`, `l'aire ${C.de} est de ${aire} m².`),
      canvas: figL(W, h1, w1, h2, "m", "parts", true),
    };
  }),

  // ★2 — Enlever un morceau (le bassin, la piscine).
  composer("003_enlever_un_morceau", 2, "Le grand rectangle moins le morceau qu'on ne couvre pas.", () => {
    const C = un(CHANTIERS);
    const L = entre(6, 14);
    const l = entre(4, Math.min(10, L));
    const carre = Math.random() < 0.4 && !/carré/.test(C.trou);
    const a = entre(1, Math.min(4, L - 2));
    const b = carre ? a : entre(1, Math.min(4, l - 2));
    const grand = L * l;
    const t = a * b;
    const aire = grand - t;
    const trouDit = carre ? `${C.trou} carré${/^une/.test(C.trou) ? "e" : ""} de ${a} m de côté` : `${C.trou} de ${a} m sur ${b} m`;
    return {
      text: `${qui(C.metier)} ${C.action}. ${cap(C.le)} est un rectangle de ${L} m sur ${l} m, avec ${trouDit}, qu'on ne couvre pas. ${un(["Quelle aire reste à couvrir ?", "Combien de m² faut-il couvrir ?", "Quelle surface faut-il couvrir, sans " + C.troule + " ?"])}`,
      ...qcmN(aire, [grand, grand + t, t, 2 * (L + l) - t], "m²"),
      explanation: etapes("on prend le grand rectangle et on enlève le morceau.", `${L} × ${l} = ${grand} ; ${a} × ${b} = ${t} ; ${grand} − ${t} = ${aire}.`, `il faut couvrir ${aire} m².`),
      canvas: figTrou(L, l, [placer(L, l, a, b)], "m"),
    };
  }),

  // ★2 — Découper ou enlever : quelle méthode ?
  composer("004_quelle_methode", 2, "Un L se découpe ; un rectangle avec un trou, on enlève le trou.", () => {
    const C = un(CHANTIERS);
    const estL = Math.random() < 0.5;
    if (estL) {
      const { W, h1, w1, h2 } = dimsL();
      return {
        text: `${qui(C.metier)} ${C.action}, en forme de L. ${un(["Comment calculer son aire ?", "Quelle méthode permet de trouver son aire ?", "Que faire pour trouver l'aire de cette figure ?"])}`,
        ...qcm("la découper en deux rectangles, puis additionner", ["additionner les longueurs de tous les côtés", "multiplier toutes les longueurs entre elles", "prendre seulement le plus grand rectangle"]),
        explanation: etapes("une figure en L n'est pas un rectangle, mais on peut la découper en deux rectangles.", `${W} × ${h1} + ${w1} × ${h2} = ${W * h1 + w1 * h2} m².`, "on découpe, puis on additionne les morceaux."),
        canvas: figL(W, h1, w1, h2, "m", "parts", false),
      };
    }
    const L = entre(6, 12);
    const l = entre(4, Math.min(9, L));
    const a = entre(1, 3);
    const b = entre(1, 3);
    return {
      text: `${qui(C.metier)} ${C.action}. ${cap(C.le)} est un rectangle, avec ${C.trou} qu'on ne couvre pas. ${un(["Comment calculer l'aire à couvrir ?", "Quelle méthode permet de trouver l'aire à couvrir ?", "Que faire pour trouver la surface à couvrir ?"])}`,
      ...qcm("calculer le grand rectangle, puis enlever le trou", ["calculer le grand rectangle, puis ajouter le trou", "calculer seulement le trou", "additionner les longueurs de tous les côtés"]),
      explanation: etapes("on peut enlever un morceau à un grand rectangle.", `${L} × ${l} − ${a} × ${b} = ${L * l - a * b} m².`, "le grand rectangle, moins le trou."),
      canvas: figTrou(L, l, [placer(L, l, a, b)], "m"),
    };
  }),

  // ★3 — Le L coté par son tour : une longueur à déduire.
  composer("005_L_cote_a_deduire", 3, "Trouve d'abord la longueur qui manque (la grande moins la petite), puis découpe en deux rectangles.", () => {
    const C = un(CHANTIERS);
    const { W, h1, w1, h2, a, b } = dimsL();
    const H = h1 + h2;
    const aire = a + b;
    return {
      text: `${qui(C.metier)} ${C.action}, en forme de L. Les mesures sont sur le plan. ${un(QCOMP(C))}`,
      ...qcmN(aire, [W * H, a + w1 * H, W * H - w1 * h1, 2 * (W + H)], "m²"),
      explanation: etapes("on découpe en deux rectangles ; la hauteur du haut, c'est la grande moins la petite.", `${H} − ${h1} = ${h2} ; ${W} × ${h1} = ${a} ; ${w1} × ${h2} = ${b} ; ${a} + ${b} = ${aire}.`, `l'aire ${C.de} est de ${aire} m².`),
      canvas: figL(W, h1, w1, h2, "m", "dehors", false),
    };
  }),

  // ★3 — Un rectangle et un triangle rectangle collés (le défi de la vidéo).
  composer("006_rectangle_plus_triangle", 3, "Le rectangle, plus le triangle (côtés de l'angle droit multipliés, ÷ 2).", () => {
    const C = un(CHANTIERS);
    let l = entre(2, 6);
    let t = entre(2, 6);
    if ((l * t) % 2) t += 1;
    if (t === l) l += 2;
    const L = entre(l + 1, l + 6);
    const R = L * l;
    const T = (l * t) / 2;
    const aire = R + T;
    return {
      text: `${qui(C.metier)} ${C.action}. ${cap(C.le)} est un rectangle de ${L} m sur ${l} m, avec un triangle rectangle collé sur le côté : ${l} m et ${t} m pour les côtés de l'angle droit. ${un(["Quelle est l'aire totale ?", "Quelle est l'aire " + C.de + " ?", "Combien de m² en tout ?"])}`,
      ...qcmN(aire, [R + l * t, R, (L + t) * l, R + T + t], "m²"),
      explanation: etapes("on calcule chaque morceau, puis on additionne ; le triangle, c'est la moitié d'un rectangle.", `${L} × ${l} = ${R} ; ${l} × ${t} = ${l * t}, ÷ 2 = ${T} ; ${R} + ${T} = ${aire}.`, `l'aire totale est de ${aire} m².`),
      canvas: figRectTri(L, l, t, "m"),
    };
  }),

  // ★3 — Le piège du chevauchement : la croix.
  composer("007_piege_chevauchement", 3, "Le carré du milieu appartient aux deux bandes : il ne compte qu'une fois.", () => {
    const C = un(CHANTIERS);
    const W = entre(5, 9);
    const h = entre(1, 2);
    const H = entre(4, 7);
    const w = entre(1, 2);
    const r0 = entre(1, H - h - 1);
    const c0 = entre(1, W - w - 1);
    const cells = unir(rect(h, W, r0, 0), rect(H, w, 0, c0));
    const aire = cells.length;
    const double = h * W + H * w;
    const p = un(PERSONNES);
    const avecErreur = Math.random() < 0.5;
    return {
      text: `${qui(C.metier)} ${C.action}, en forme de croix : une bande de ${W} m sur ${h} m et une bande de ${H} m sur ${w} m, qui se croisent. Chaque carreau fait 1 m². ${avecErreur ? `${p.n} calcule ${W} × ${h} + ${H} × ${w} = ${double} m². ` : ""}${un(["Quelle est la vraie aire ?", "Quelle est l'aire de la croix ?", "Combien de m² faut-il couvrir ?"])}`,
      ...qcmN(aire, [double, W * H, double + h * w], "m²"),
      explanation: etapes("chaque morceau ne compte qu'une fois : le carré du milieu est dans les deux bandes.", `${W} × ${h} + ${H} × ${w} = ${double} ; on enlève le milieu compté deux fois : ${double} − ${h * w} = ${aire}.`, `l'aire est de ${aire} m².`),
      canvas: grille([cells]),
    };
  }),

  // ★3 — Enlever deux morceaux.
  composer("008_enlever_deux_morceaux", 3, "Le grand rectangle, moins chaque morceau qu'on ne couvre pas.", () => {
    const C = un(CHANTIERS);
    const AUTRES = ["un poteau carré", "un regard d'égout carré", "une jardinière carrée", "un socle carré", "un massif de fleurs carré", "une bouche d'aération carrée"];
    const L = entre(9, 15);
    const l = entre(5, 9);
    const a1 = entre(2, 3);
    const b1 = entre(1, 3);
    const c2 = entre(1, 2);
    const g = L * l;
    const t1 = a1 * b1;
    const t2 = c2 * c2;
    const aire = g - t1 - t2;
    const x1 = arr(0.5 + Math.random() * (L / 2 - a1 - 0.5));
    const x2 = arr(L / 2 + 0.5 + Math.random() * (L / 2 - c2 - 1));
    return {
      text: `${qui(C.metier)} ${C.action}. ${cap(C.le)} est un rectangle de ${L} m sur ${l} m. On ne couvre pas ${C.trou} de ${a1} m sur ${b1} m, ni ${un(AUTRES)} de ${c2} m de côté. ${un(["Quelle aire faut-il couvrir ?", "Combien de m² reste-t-il à couvrir ?", "Quelle surface faut-il couvrir ?"])}`,
      ...qcmN(aire, [g - t1, g, g + t1 + t2, g - t1 + t2], "m²"),
      explanation: etapes("on prend le grand rectangle, puis on enlève chaque morceau.", `${L} × ${l} = ${g} ; ${a1} × ${b1} = ${t1} ; ${c2} × ${c2} = ${t2} ; ${g} − ${t1} − ${t2} = ${aire}.`, `il faut couvrir ${aire} m².`),
      canvas: figTrou(L, l, [{ a: a1, b: b1, x: x1, y: arr((l - b1) / 2) }, { a: c2, b: c2, x: x2, y: arr((l - c2) / 3) }], "m"),
    };
  }),

  // ★3 — Une figure en trois morceaux sur quadrillage (T ou U).
  composer("009_trois_morceaux", 3, "Découpe en rectangles, sans chevauchement et sans oublier de morceau.", () => {
    const C = un(CHANTIERS);
    const forme = un(["T", "U", "escalier"]);
    let cells: Case[];
    let calc: string;
    if (forme === "T") {
      const W = entre(5, 8);
      const h = entre(1, 2);
      const w = entre(1, 3);
      const H = entre(2, 4);
      const c0 = Math.floor((W - w) / 2);
      cells = [...rect(h, W), ...rect(H, w, h, c0)];
      calc = `${W} × ${h} = ${W * h} ; ${w} × ${H} = ${w * H} ; ${W * h} + ${w * H} = ${cells.length}`;
    } else if (forme === "U") {
      const W = entre(5, 8);
      const h = entre(1, 2);
      const H = entre(2, 4);
      const w = entre(1, 2);
      cells = [...rect(H, w), ...rect(H, w, 0, W - w), ...rect(h, W - 2 * w, H - h, w)];
      calc = `${w} × ${H} = ${w * H}, deux fois ; ${W - 2 * w} × ${h} = ${(W - 2 * w) * h} ; ${w * H} + ${w * H} + ${(W - 2 * w) * h} = ${cells.length}`;
    } else {
      const k = entre(2, 3);
      const p = entre(1, 2);
      cells = [...rect(p, 3 * k, 2 * p), ...rect(p, 2 * k, p), ...rect(p, k, 0)];
      calc = `${3 * k} × ${p} + ${2 * k} × ${p} + ${k} × ${p} = ${cells.length}`;
    }
    const aire = cells.length;
    return {
      text: `${qui(C.metier)} ${C.action}. Sur le plan, chaque carreau représente 1 m². ${un(QCOMP(C))}`,
      ...qcmN(aire, [hauteurCases(cells) * largeurCases(cells), contour(cells), aire + 2], "m²"),
      explanation: etapes("on découpe en rectangles, on calcule chacun, on additionne ; chaque morceau compte une seule fois.", calc + ".", `l'aire ${C.de} est de ${aire} m².`),
      canvas: grille([cells]),
    };
  }),

  // ★3 — Qui a le plus à couvrir ? (un L contre un rectangle troué)
  composer("010_comparer_deux_figures", 3, "Calcule chaque aire : découpe l'une, enlève le trou de l'autre.", () => {
    const [A, B] = deux();
    const TROUS = ["un bassin", "un placard", "une cabane", "un bac à sable", "une estrade", "une fontaine", "un massif"];
    let best: { L: ReturnType<typeof dimsL>; R: number; l: number; t: number; a: number; b: number } | null = null;
    for (let e = 0; e < 30; e++) {
      const Ld = dimsL();
      const R = entre(5, 10);
      const l = entre(3, 7);
      const a = entre(1, 3);
      const b = entre(1, 3);
      const t = R * l - a * b;
      if (!best || Math.abs(t - (Ld.a + Ld.b)) < Math.abs(best.t - (best.L.a + best.L.b))) best = { L: Ld, R, l, t, a, b };
      if (Math.abs(t - (Ld.a + Ld.b)) <= 4) break;
    }
    const { L: Ld, R, l, t, a, b } = best!;
    const sA = Ld.a + Ld.b;
    const juste = sA === t ? "les deux autant" : sA > t ? A.n : B.n;
    return {
      text: `${A.n} et ${B.n} doivent chacun couvrir un sol${un(["", " d'herbe", " de moquette", " de carrelage", " de sable", " de gazon"])}. ${A.n} : un L, de ${Ld.W} m sur ${Ld.h1} m plus ${Ld.w1} m sur ${Ld.h2} m. ${B.n} : un rectangle de ${R} m sur ${l} m, moins ${un(TROUS)} de ${a} m sur ${b} m. ${un(["Qui a la plus grande surface à couvrir ?", "Qui a le plus de travail ?", "Qui doit couvrir le plus de m² ?"])}`,
      ...qcm(juste, [A.n, B.n, "les deux autant"]),
      explanation: etapes("on découpe le L ; on enlève le trou au rectangle.", `${A.n} : ${Ld.W} × ${Ld.h1} + ${Ld.w1} × ${Ld.h2} = ${sA} m² ; ${B.n} : ${R} × ${l} − ${a} × ${b} = ${t} m².`, sA === t ? "les deux ont autant à couvrir." : `${juste} a la plus grande surface.`),
      canvas: figL(Ld.W, Ld.h1, Ld.w1, Ld.h2, "m", "parts", true),
    };
  }),
];

/* ════════════════════════ AIRE_DEFI (ceinture bleue, ★4-★5) ════════════════════════
   Vidéo : Romane dessine des skateparks. Terrain de 48 m² et 6 m de large :
   48 ÷ 6 = 8 m ; rampe carrée de 25 m² : 5 × 5, côté 5 m ; 9 × 4 = 36 et
   6 × 6 = 36 : même aire, tours 26 et 24 ; piège : pas ÷ 4 pour le côté d'un
   carré ; questions : 36 cm² → 6 cm ; 56 m² et 7 m → 8 m ; défi : 48 − 4 = 44 m²,
   pots de 10 m² → 5 pots. */

type Projet = { metier: string; fait: string; le: string; de: string; u: "m" | "cm" };
const PROJETS: Projet[] = [
  { metier: "La créatrice de skateparks", fait: "dessine un skatepark", le: "le terrain", de: "du terrain", u: "m" },
  { metier: "L'architecte", fait: "dessine une salle de sport", le: "la salle", de: "de la salle", u: "m" },
  { metier: "Le paysagiste", fait: "prépare une pelouse", le: "la pelouse", de: "de la pelouse", u: "m" },
  { metier: "La maraîchère", fait: "prépare une parcelle de légumes", le: "la parcelle", de: "de la parcelle", u: "m" },
  { metier: "Le maçon", fait: "coule une dalle de béton", le: "la dalle", de: "de la dalle", u: "m" },
  { metier: "La soigneuse du zoo", fait: "agrandit un enclos", le: "l'enclos", de: "de l'enclos", u: "m" },
  { metier: "Le menuisier", fait: "découpe un plateau de table", le: "le plateau", de: "du plateau", u: "cm" },
  { metier: "La graphiste", fait: "prépare une affiche", le: "l'affiche", de: "de l'affiche", u: "cm" },
  { metier: "Le carreleur", fait: "carrelle une terrasse", le: "la terrasse", de: "de la terrasse", u: "m" },
  { metier: "La couturière", fait: "coud une nappe", le: "la nappe", de: "de la nappe", u: "cm" },
  { metier: "L'entraîneur", fait: "trace un terrain de jeu", le: "le terrain", de: "du terrain", u: "m" },
  { metier: "La directrice du camping", fait: "délimite un emplacement de tente", le: "l'emplacement", de: "de l'emplacement", u: "m" },
  { metier: "Le pâtissier", fait: "prépare une plaque de gâteau", le: "la plaque", de: "de la plaque", u: "cm" },
  { metier: "L'ingénieure", fait: "prévoit une zone de panneaux solaires", le: "la zone", de: "de la zone", u: "m" },
  { metier: "Le fermier", fait: "clôture un pré", le: "le pré", de: "du pré", u: "m" },
  { metier: "La cheffe de chantier", fait: "prépare un parking", le: "le parking", de: "du parking", u: "m" },
  { metier: "L'artiste", fait: "prépare une fresque", le: "la fresque", de: "de la fresque", u: "m" },
  { metier: "La décoratrice", fait: "choisit un grand tapis", le: "le tapis", de: "du tapis", u: "m" },
];

const defi = gab("aire_defi");

const aireDefi: TutorBankItemV4[] = [
  fixe("cm2_aire_defi_fixed_1_inverse_carre", "aire_defi", 4, "Un carré a une aire de 36 cm². Combien mesure son côté ?", "6 cm",
    ["9 cm", "18 cm", "12 cm"], "Cherche le nombre qui, fois lui-même, donne 36.",
    etapes("on cherche le nombre qui, fois lui-même, donne l'aire ; on ne divise pas par 4.", "6 × 6 = 36. 36 ÷ 4 = 9, c'est quand on connaît le périmètre.", "le côté mesure 6 cm."), figRect(6, 6, { carre: true, tL: "? cm" })),
  fixe("cm2_aire_defi_fixed_4_longueur", "aire_defi", 4, "Un rectangle a une aire de 56 m² et une largeur de 7 m. Quelle est sa longueur ?", "8 m",
    ["49 m", "63 m", "21 m"], "Quel nombre fois 7 donne 56 ?",
    etapes("si on connaît l'aire et un côté, on divise l'aire par ce côté.", "56 ÷ 7 = 8. On vérifie : 8 × 7 = 56.", "la longueur mesure 8 m."), figRect(8, 7, { u: "m", tL: "? m" })),

  // ★4 — La longueur manquante : l'aire ÷ la largeur.
  defi("001_longueur_manquante", 4, "Quel nombre fois la largeur donne l'aire ? Divise l'aire par la largeur.", () => {
    const P = un(PROJETS);
    const l = entre(3, 12);
    const L = entre(l + 1, 15);
    const A = L * l;
    const cherche = Math.random() < 0.7 ? "longueur" : "largeur";
    const connu = cherche === "longueur" ? l : L;
    const rep = cherche === "longueur" ? L : l;
    return {
      text: `${qui(P.metier)} ${P.fait}. ${cap(P.le)} est un rectangle d'aire ${A} ${P.u}², de ${connu} ${P.u} de ${cherche === "longueur" ? "large" : "long"}. ${un([`Combien mesure ${cherche === "longueur" ? "sa longueur" : "sa largeur"} ?`, `Quelle est ${cherche === "longueur" ? "la longueur" : "la largeur"} ${P.de} ?`, `Trouve ${cherche === "longueur" ? "la longueur" : "la largeur"} ${P.de}.`])}`,
      ...qcmN(rep, [A - connu, A / 2 - connu, rep + 1, rep - 1], P.u),
      explanation: etapes("l'aire, c'est la longueur fois la largeur : on divise l'aire par le côté connu.", `${A} ÷ ${connu} = ${rep}. On vérifie : ${rep} × ${connu} = ${A}.`, `${cherche === "longueur" ? "la longueur" : "la largeur"} mesure ${lg(rep, P.u)}.`),
      canvas: cherche === "longueur" ? figRect(L, l, { u: P.u, tL: `? ${P.u}` }) : figRect(L, l, { u: P.u, tl: `? ${P.u}` }),
    };
  }),

  // ★4 — Le côté d'un carré à partir de son aire.
  defi("002_cote_du_carre", 4, "Quel nombre, fois lui-même, donne l'aire ? Ne divise pas par 4.", () => {
    const P = un(PROJETS);
    const c = un([3, 5, 6, 7, 8, 9, 10, 11, 12, 15, 20]);
    const A = c * c;
    const quoi = P.u === "m"
      ? un(["une rampe carrée", "un carré de pelouse", "une dalle carrée", "un bassin carré", "une scène carrée", "un bac à sable carré", "un carré de potager"])
      : un(["un carreau carré", "un carré de tissu", "une photo carrée", "un dessous-de-plat carré", "une étiquette carrée", "un coussin carré"]);
    return {
      text: `${qui(P.metier)} ${un(["prévoit", "dessine", "prépare"])} ${quoi} de ${A} ${P.u}². ${un(["Combien mesure son côté ?", "Quelle est la longueur de son côté ?", "Trouve la longueur d'un côté."])}`,
      ...qcmN(c, [A / 4, A / 2, c + 2, 2 * c], P.u, 1),
      explanation: etapes("on cherche le nombre qui, fois lui-même, donne l'aire ; diviser par 4, c'est pour le périmètre.", `${c} × ${c} = ${A}.`, `le côté mesure ${lg(c, P.u)}.`),
      canvas: figRect(c, c, { u: P.u, carre: true, tL: `? ${P.u}` }),
    };
  }),

  // ★4 — Même aire ? Même tour ?
  defi("003_meme_aire_meme_tour", 4, "Calcule les deux aires ET les deux tours : ce n'est pas pareil.", () => {
    const P = un(PROJETS);
    const MEME_AIRE: [number, number, number][] = [[9, 4, 6], [8, 2, 4], [16, 4, 8], [12, 3, 6], [18, 2, 6], [25, 4, 10], [20, 5, 10], [27, 3, 9], [32, 2, 8], [16, 1, 4], [12, 12, 12]];
    const cas = un(["aire", "tour", "rien"]);
    let L: number;
    let l: number;
    let c: number;
    if (cas === "aire") {
      [L, l, c] = un(MEME_AIRE.filter((x) => x[0] !== x[1]));
    } else if (cas === "tour") {
      c = entre(4, 10);
      const d = entre(1, c - 2);
      [L, l] = [c + d, c - d];
    } else {
      c = entre(4, 9);
      L = entre(c + 2, c + 6);
      l = entre(2, c - 1);
      if (L * l === c * c || L + l === 2 * c) l = Math.max(1, l - 1);
    }
    const aR = L * l;
    const aC = c * c;
    const tR = 2 * (L + l);
    const tC = 4 * c;
    const ea = aR === aC;
    const et = tR === tC;
    const juste = ea && et ? "Même aire et même tour" : ea ? "Même aire, mais pas le même tour" : et ? "Même tour, mais pas la même aire" : "Ni la même aire, ni le même tour";
    return {
      text: `${qui(P.metier)} ${P.fait} et hésite entre un rectangle de ${L} ${P.u} sur ${l} ${P.u} et un carré de ${c} ${P.u} de côté. ${un(["Que peut-on dire ?", "Compare leurs aires et leurs tours.", "Ont-ils la même aire ? le même tour ?"])}`,
      ...qcm(juste, ["Même aire et même tour", "Même aire, mais pas le même tour", "Même tour, mais pas la même aire", "Ni la même aire, ni le même tour"]),
      explanation: etapes("même aire ne veut pas dire même périmètre : on calcule les deux.", `aires : ${L} × ${l} = ${aR} et ${c} × ${c} = ${aC} ; tours : ${tR} et ${tC}.`, juste + "."),
      canvas: figRect(L, l, { u: P.u }),
    };
  }),

  // ★4 — Les pots de peinture (le défi de la vidéo).
  defi("004_pots_avec_trou", 4, "D'abord l'aire à couvrir (le grand moins le trou), puis les pots : s'il en manque un peu, un pot de plus.", () => {
    const PROD = [
      { metier: "La créatrice de skateparks", sol: "le sol d'un skatepark", trou: "un carré de terre", verbe: "peindre", un: "Un pot de peinture", p1: "pot", p: "pots" },
      { metier: "Le gardien du gymnase", sol: "le parquet du gymnase", trou: "une estrade carrée", verbe: "vernir", un: "Un bidon de vernis", p1: "bidon", p: "bidons" },
      { metier: "La paysagiste", sol: "un jardin", trou: "un bassin carré", verbe: "semer", un: "Un sac de graines", p1: "sac", p: "sacs" },
      { metier: "Le jardinier du stade", sol: "un terrain", trou: "un carré de sable", verbe: "couvrir de gazon", un: "Un rouleau de gazon", p1: "rouleau", p: "rouleaux" },
      { metier: "La fermière", sol: "le sol d'une étable", trou: "un abreuvoir carré", verbe: "pailler", un: "Une botte de paille", p1: "botte", p: "bottes" },
      { metier: "Le carreleur", sol: "le sol d'une salle", trou: "un poteau carré", verbe: "carreler", un: "Un paquet de carreaux", p1: "paquet", p: "paquets" },
      { metier: "La peintre", sol: "un mur", trou: "une fenêtre carrée", verbe: "peindre", un: "Un pot de peinture", p1: "pot", p: "pots" },
      { metier: "Le menuisier", sol: "le plancher d'une cabane", trou: "une trappe carrée", verbe: "vernir", un: "Un pot de vernis", p1: "pot", p: "pots" },
      { metier: "La soigneuse du zoo", sol: "le sol d'un enclos", trou: "un bassin carré", verbe: "couvrir de copeaux", un: "Un sac de copeaux", p1: "sac", p: "sacs" },
    ];
    const D = un(PROD);
    let L = 0;
    let l = 0;
    let k = 0;
    let par = 0;
    let aire = 0;
    for (let e = 0; e < 30; e++) {
      L = entre(6, 12);
      l = entre(4, 8);
      k = entre(1, 3);
      par = un([5, 6, 8, 10, 10, 12]);
      aire = L * l - k * k;
      if (aire % par !== 0 && aire > par) break;
    }
    const n = Math.ceil(aire / par);
    return {
      text: `${qui(D.metier)} doit ${D.verbe} ${D.sol}, un rectangle de ${L} m sur ${l} m, sauf ${D.trou} de ${k} m de côté. ${D.un} couvre ${par} m². ${un([`Combien de ${D.p} faut-il ?`, `Combien de ${D.p} acheter au moins ?`, `Combien de ${D.p} prévoir ?`])}`,
      ...qcmU(n, [Math.floor(aire / par), Math.ceil((L * l) / par), n + 1, Math.ceil((L * l + k * k) / par)], D.p1, D.p),
      explanation: etapes("d'abord l'aire à couvrir, ensuite les " + D.p + ".", `${L} × ${l} = ${L * l} ; ${k} × ${k} = ${k * k} ; ${L * l} − ${k * k} = ${aire} m² ; ${n - 1} ${n - 1 >= 2 ? D.p : D.p1} couvrent ${(n - 1) * par} m², pas assez ; ${n} en couvrent ${n * par}.`, `il faut ${nb(n, D.p1, D.p)}.`),
      canvas: figTrou(L, l, [placer(L, l, k, k)], "m"),
    };
  }),

  // ★4 — Combien de dalles carrées ?
  defi("005_combien_de_dalles", 4, "L'aire du terrain ÷ l'aire d'une dalle (ou : dalles par rangée × rangées).", () => {
    const SOLS = [
      { quoi: "dalles carrées", sur: "une terrasse" }, { quoi: "plaques de gazon carrées", sur: "un terrain de jeu" }, { quoi: "tapis carrés", sur: "une salle de judo" },
      { quoi: "panneaux solaires carrés", sur: "un toit plat" }, { quoi: "pavés de pierre carrés", sur: "une place" }, { quoi: "dalles de moquette carrées", sur: "un bureau" },
      { quoi: "plaques de liège carrées", sur: "un mur" }, { quoi: "bâches carrées", sur: "un potager" },
    ];
    const S = un(SOLS);
    const c = un([2, 2, 3, 4, 5]);
    const nL = entre(2, 6);
    const nl = entre(2, 5);
    const L = c * nL;
    const l = c * nl;
    const A = L * l;
    const n = nL * nl;
    const quoi = S.quoi;
    return {
      text: `${un(PERSONNES).n} couvre ${S.sur} de ${L} m sur ${l} m avec des ${quoi} de ${c} m de côté. ${un([`Combien en faut-il ?`, `Combien faut-il de ${quoi.split(" ")[0]} ?`, `Combien de ${quoi.split(" ")[0]} pour tout couvrir ?`])}`,
      ...qcmN(n, [A / c, A, nL + nl, 2 * n], quoi.split(" ")[0]),
      explanation: etapes("l'aire du terrain, divisée par l'aire d'une dalle.", `${L} × ${l} = ${A} m² ; une dalle : ${c} × ${c} = ${c * c} m² ; ${A} ÷ ${c * c} = ${n}. (Ou : ${nL} rangées de ${nl}.)`, `il en faut ${n}.`),
      canvas: figRect(L, l, { u: "m" }),
    };
  }),

  // ★4 — Un rectangle de même aire qu'un carré.
  defi("006_meme_aire_que_le_carre", 4, "L'aire du carré, puis divise-la par la largeur du rectangle.", () => {
    const P = un(PROJETS);
    const [c, l] = un([[6, 4], [6, 3], [6, 2], [8, 4], [8, 2], [10, 4], [10, 5], [12, 8], [12, 9], [9, 3], [10, 2], [4, 2], [12, 6], [12, 4]]);
    const A = c * c;
    const L = A / l;
    return {
      text: `${qui(P.metier)} ${P.fait}. On remplace un carré de ${c} ${P.u} de côté par un rectangle de même aire, large de ${l} ${P.u}. ${un(["Quelle est sa longueur ?", "Combien mesure le rectangle de long ?", "Trouve la longueur du rectangle."])}`,
      ...qcmN(L, [2 * c - l, A - l, c + l, A / 2], P.u),
      explanation: etapes("même aire : on calcule l'aire du carré, puis on la divise par la largeur.", `${c} × ${c} = ${A} ; ${A} ÷ ${l} = ${L}. On vérifie : ${L} × ${l} = ${A}.`, `la longueur mesure ${lg(L, P.u)}.`),
      canvas: figRect(c, c, { u: P.u, carre: true }),
    };
  }),

  // ★5 — Le prix, avec un morceau enlevé.
  defi("007_prix_avec_trou", 5, "L'aire à couvrir (le grand moins le trou), puis fois le prix d'un m².", () => {
    const P = un(PROJETS.filter((x) => x.u === "m"));
    const L = entre(6, 14);
    const l = entre(4, 9);
    const a = entre(1, 3);
    const b = entre(1, 3);
    const prix = un([4, 5, 8, 10, 12, 15, 20]);
    const aire = L * l - a * b;
    const quoi = un(["le revêtement", "le matériau choisi", "le produit"]);
    return {
      text: `${qui(P.metier)} ${P.fait} : un rectangle de ${L} m sur ${l} m, sauf un morceau de ${a} m sur ${b} m qu'on ne couvre pas. ${cap(quoi)} coûte ${prix} € le m². ${un(["Combien coûte " + quoi + " ?", "Quel est le prix total ?", "Combien faut-il payer ?"])}`,
      ...qcmN(aire * prix, [L * l * prix, (L * l + a * b) * prix, aire + prix, 2 * (L + l) * prix], "€", 10),
      explanation: etapes("d'abord l'aire à couvrir, ensuite le prix.", `${L} × ${l} = ${L * l} ; ${a} × ${b} = ${a * b} ; ${L * l} − ${a * b} = ${aire} m² ; ${aire} × ${prix} = ${aire * prix}.`, `il faut payer ${fr(aire * prix)} €.`),
      canvas: figTrou(L, l, [placer(L, l, a, b)], "m"),
    };
  }),

  // ★5 — Du périmètre à l'aire.
  defi("008_perimetre_puis_aire", 5, "Avec le tour, trouve d'abord le côté ; ensuite seulement, l'aire.", () => {
    const P = un(PROJETS);
    const carre = Math.random() < 0.5;
    if (carre) {
      const c = un([3, 5, 6, 7, 8, 9, 10, 12, 15]);
      const T = 4 * c;
      return {
        text: `${qui(P.metier)} ${P.fait}. Une zone carrée a un tour de ${T} ${P.u}. ${un(["Quelle est son aire ?", "Combien mesure son aire ?", "Quelle surface couvre-t-elle ?"])}`,
        ...qcmN(c * c, [c, T * T > 5000 ? T * 2 : T * T, T, (T / 2) * (T / 2)], `${P.u}²`),
        explanation: etapes("le tour d'un carré, c'est 4 côtés : on divise par 4, puis le côté fois le côté.", `${T} ÷ 4 = ${c} ; ${c} × ${c} = ${c * c}.`, `l'aire est de ${ai(c * c, P.u)}.`),
        canvas: figRect(c, c, { u: P.u, carre: true, tL: `? ${P.u}` }),
      };
    }
    const l = entre(2, 8);
    const L = entre(l + 1, 14);
    const T = 2 * (L + l);
    return {
      text: `${qui(P.metier)} ${P.fait}. ${cap(P.le)} est un rectangle de ${l} ${P.u} de large, et son tour mesure ${T} ${P.u}. ${un(["Quelle est son aire ?", `Quelle est l'aire ${P.de} ?`, "Combien mesure son aire ?"])}`,
      ...qcmN(L * l, [T * l, (T - l) * l, (T / 2) * l, L], `${P.u}²`),
      explanation: etapes("le tour, c'est 2 fois (longueur + largeur) : on trouve la longueur, puis l'aire.", `${T} ÷ 2 = ${T / 2} ; ${T / 2} − ${l} = ${L} ; ${L} × ${l} = ${L * l}.`, `l'aire est de ${ai(L * l, P.u)}.`),
      canvas: figRect(L, l, { u: P.u, tL: `? ${P.u}` }),
    };
  }),

  // ★5 — Agrandir : doubler, tripler les côtés.
  defi("009_agrandir_les_cotes", 5, "Calcule l'aire avant et après, puis compare.", () => {
    const P = un(PROJETS);
    const L = entre(3, 8);
    const l = entre(2, L);
    const cas = un(["double2", "triple2", "double1", "triple1"]);
    const k = cas.startsWith("double") ? 2 : 3;
    const deuxCotes = cas.endsWith("2");
    const L2 = L * k;
    const l2 = deuxCotes ? l * k : l;
    const A1 = L * l;
    const A2 = L2 * l2;
    const facteur = A2 / A1;
    const verbe = k === 2 ? "double" : "triple";
    const veutNombre = Math.random() < 0.5;
    const enonce = `${qui(P.metier)} ${P.fait}. ${cap(P.le)} mesurait ${L} ${P.u} sur ${l} ${P.u}. On ${verbe} ${deuxCotes ? "la longueur ET la largeur" : "seulement la longueur"}.`;
    return {
      text: `${enonce} ${veutNombre ? un(["Quelle est la nouvelle aire ?", "Combien mesure maintenant l'aire ?"]) : un(["Par combien l'aire est-elle multipliée ?", "L'aire est multipliée par combien ?"])}`,
      ...(veutNombre
        ? qcmN(A2, [A1 * k, A1 + k, deuxCotes ? A1 * k * 2 : A1 * k * k], `${P.u}²`)
        : qcm(`par ${facteur}`, ["par 2", "par 3", "par 4", "par 6", "par 9"].filter((x) => x !== `par ${facteur}`).slice(0, 4))),
      explanation: etapes("on calcule l'aire avant et après.", `avant : ${L} × ${l} = ${A1} ; après : ${L2} × ${l2} = ${A2} ; ${A2} ÷ ${A1} = ${facteur}.`, veutNombre ? `la nouvelle aire est de ${ai(A2, P.u)}.` : `l'aire est multipliée par ${facteur}.`),
      canvas: figRect(L2, l2, { u: P.u }),
    };
  }),

  // ★5 — De l'aire au tour.
  defi("010_aire_puis_perimetre", 5, "D'abord la longueur (l'aire ÷ la largeur), ensuite le tour.", () => {
    const P = un(PROJETS);
    const l = entre(3, 9);
    const L = entre(l + 1, 14);
    const A = L * l;
    const T = 2 * (L + l);
    const pour = un(["une clôture", "une bordure", "un galon", "une barrière", "un ruban", "une frise"]);
    return {
      text: `${qui(P.metier)} ${P.fait} : un rectangle de ${A} ${P.u}², large de ${l} ${P.u}. On pose ${pour} tout autour. ${un(["Quelle longueur faut-il ?", "Combien mesure le tour ?", `Quelle longueur de ${pour.replace(/^une? /, "")} faut-il ?`])}`,
      ...qcmN(T, [A, L + l, 2 * A, T + l], P.u),
      explanation: etapes("on trouve d'abord la longueur, puis on calcule le tour.", `${A} ÷ ${l} = ${L} ; ${L} + ${l} = ${L + l}, fois 2 : ${T}.`, `il faut ${lg(T, P.u)}.`),
      canvas: figRect(L, l, { u: P.u, tL: `? ${P.u}` }),
    };
  }),

  // ★5 — Lequel de ces terrains a l'aire voulue ?
  defi("011_quel_terrain_convient", 5, "Calcule l'aire de chaque proposition : seule une donne l'aire voulue.", () => {
    const P = un(PROJETS.filter((x) => x.u === "m"));
    const [L, l] = un([[8, 6], [9, 4], [12, 3], [10, 6], [12, 5], [15, 4], [16, 3], [9, 8], [14, 5], [20, 3], [18, 4], [12, 7]]);
    const A = L * l;
    const tour = L + l;
    const props = [`${L} m sur ${l} m`, `${tour - 2} m sur 2 m`, `${L + 1} m sur ${l - 1} m`, `${Math.round(A / 4)} m sur 4 m`];
    const fausses = props.slice(1).filter((s, i) => {
      const [x, y] = s.match(/\d+/g)!.map(Number);
      return x * y !== A && i >= 0;
    });
    if (fausses.length < 3) fausses.push(`${L + 2} m sur ${l} m`);
    return {
      text: `${qui(P.metier)} ${P.fait}. ${cap(P.le)} doit être un rectangle de ${A} m². ${un(["Lequel de ces rectangles convient ?", "Quelles mesures conviennent ?", "Quel rectangle a exactement cette aire ?"])}`,
      ...qcm(props[0], fausses),
      explanation: etapes("on calcule l'aire de chaque proposition.", `${L} × ${l} = ${A} ; les autres ne donnent pas ${A}.`, `le rectangle de ${L} m sur ${l} m convient.`),
    };
  }),
];

export const airesBank: TutorBankItemV4[] = [...aireComprendre, ...aireCarreRectangle, ...aireTriangleRectangle, ...aireComposer, ...aireDefi];
