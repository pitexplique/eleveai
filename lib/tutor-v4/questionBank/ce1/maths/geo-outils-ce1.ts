// OUTILS DES GABARITS DE GÉOMÉTRIE, DE REPÉRAGE ET D'ALGORITHMIQUE DU CE1 (10/11/2026).
//
// Frédéric : « robustesse coach cp ce1 ce2, regarde s'il y a bien des images et que
// ça soit un peu fun. Fais attention à leur âge. » Des enfants de 7 ans : phrases
// courtes (≤ 20 mots), QCM seulement, un dessin qui PORTE la question et ne donne
// jamais la réponse.
//
// Les figures se dessinent avec le canvas `construction` (coordonnées de maths,
// y vers le haut, cadre ajusté tout seul). Une figure = des « pièces » (points,
// polygones, segments, angles, cercles) qu'on peut poser côte à côte, avec une
// étiquette 1, 2, 3… sous chacune.

import type { CanvasFigure, DifficultyLevel, TutorBankItemV4, TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { cap, entre, etapes, melange, qcm, qcmN, tournure, un } from "../../cm1/maths/trous-outils";

export { cap, entre, etapes, melange, qcm, qcmN, tournure, un };

type Genere = () => Omit<TutorGeneratedQuestionV4, "canvas"> & { canvas?: CanvasFigure };

/** Un gabarit dont on choisit l'id (pour garder les ids déjà servis). */
export function gab(notionId: string, microId: string, id: string, difficulty: DifficultyLevel, hint: string, generate: Genere): TutorBankItemV4 {
  return {
    kind: "template",
    id,
    niveau: "ce1",
    matiere: "maths",
    notionId,
    microId,
    difficulty,
    theme: "neutral",
    hint,
    tags: [notionId, microId, "template"],
    generate,
  } as TutorBankItemV4;
}

/** La troupe du site et des prénoms variés. */
export const PRENOMS = ["Nina", "Téo", "Zoé", "Ravi", "Lou", "Malo", "Inès", "Sacha", "Amir", "Jade", "Naïa", "Tom", "Lina", "Yanis", "Léa", "Noé"];
export const prenom = () => un(PRENOMS);
/** Deux prénoms différents. */
export function deuxPrenoms(): [string, string] {
  const [a, b] = melange([...PRENOMS]);
  return [a, b];
}

/* ═════════════════ Les figures planes ═════════════════ */

type Pt = { x: number; y: number };
export type Forme = "carre" | "rectangle" | "triangle" | "triangle_rectangle" | "cercle" | "losange" | "quadri" | "pentagone" | "hexagone" | "maison" | "trapeze_rectangle";

export const NOM_FORME: Record<Forme, string> = {
  carre: "un carré",
  rectangle: "un rectangle",
  triangle: "un triangle",
  triangle_rectangle: "un triangle rectangle",
  cercle: "un cercle",
  losange: "un losange",
  quadri: "une figure à quatre côtés",
  pentagone: "une figure à cinq côtés",
  hexagone: "une figure à six côtés",
  maison: "une figure en forme de maison",
  trapeze_rectangle: "une figure à quatre côtés",
};
export const COTES: Record<Forme, number> = { carre: 4, rectangle: 4, triangle: 3, triangle_rectangle: 3, cercle: 0, losange: 4, quadri: 4, pentagone: 5, hexagone: 6, maison: 5, trapeze_rectangle: 4 };
export const ANGLES_DROITS: Record<Forme, number> = { carre: 4, rectangle: 4, triangle: 0, triangle_rectangle: 1, cercle: 0, losange: 0, quadri: 0, pentagone: 0, hexagone: 0, maison: 2, trapeze_rectangle: 2 };
/** Les sommets (par numéro) où l'angle est droit. */
export const SOMMETS_DROITS: Record<Forme, number[]> = { carre: [0, 1, 2, 3], rectangle: [0, 1, 2, 3], triangle: [], triangle_rectangle: [0], cercle: [], losange: [], quadri: [], pentagone: [], hexagone: [], maison: [0, 1], trapeze_rectangle: [0, 3] };

const FONDS = ["rgba(37, 99, 235, 0.12)", "rgba(5, 150, 105, 0.14)", "rgba(234, 88, 12, 0.13)", "rgba(124, 58, 237, 0.12)", "rgba(219, 39, 119, 0.12)"];

const r2 = (v: number) => Math.round(v * 100) / 100;
function tourner(p: Pt, deg: number): Pt {
  const a = (deg * Math.PI) / 180;
  return { x: p.x * Math.cos(a) - p.y * Math.sin(a), y: p.x * Math.sin(a) + p.y * Math.cos(a) };
}

/** Les sommets d'une forme, centrée en 0, avant rotation. */
function sommetsDe(f: Forme): Pt[] {
  switch (f) {
    case "carre": {
      const a = un([3, 3.4, 3.8]) / 2;
      return [{ x: -a, y: -a }, { x: a, y: -a }, { x: a, y: a }, { x: -a, y: a }];
    }
    case "rectangle": {
      const L = un([4.4, 4.8, 5.2]) / 2;
      const l = un([2, 2.4, 2.6]) / 2;
      return [{ x: -L, y: -l }, { x: L, y: -l }, { x: L, y: l }, { x: -L, y: l }];
    }
    case "triangle":
      return un([
        [{ x: -2.2, y: -1.4 }, { x: 2.2, y: -1.4 }, { x: 0.6, y: 1.8 }],
        [{ x: -2.4, y: -1.2 }, { x: 1.6, y: -1.2 }, { x: 2.6, y: 1.6 }],
        [{ x: -1.8, y: -1.6 }, { x: 2.4, y: -1.0 }, { x: -0.6, y: 1.8 }],
        [{ x: -2.4, y: -1.0 }, { x: 2.4, y: -1.0 }, { x: -1.6, y: 1.6 }],
      ]);
    case "triangle_rectangle": {
      const a = un([3.6, 4, 4.4]);
      const b = un([2.4, 2.8, 3.2]);
      return [{ x: -a / 2, y: -b / 2 }, { x: a / 2, y: -b / 2 }, { x: -a / 2, y: b / 2 }];
    }
    case "losange":
      return [{ x: 0, y: -1.5 }, { x: 2.3, y: 0 }, { x: 0, y: 1.5 }, { x: -2.3, y: 0 }];
    case "quadri":
      // Aucun angle entre 75° et 105° : pas d'angle « presque droit » qui tromperait l'œil.
      return un([
        [{ x: -2.4, y: -1.2 }, { x: 2.4, y: -1.2 }, { x: 1.0, y: 1.4 }, { x: -0.8, y: 1.4 }],
        [{ x: -1.6, y: -1.4 }, { x: 2.4, y: -1.4 }, { x: 1.0, y: 1.4 }, { x: -2.6, y: 1.4 }],
        [{ x: -1.2, y: -1.4 }, { x: 1.2, y: -1.4 }, { x: 2.4, y: 1.2 }, { x: -2.4, y: 1.2 }],
      ]);
    case "pentagone":
    case "hexagone": {
      const n = f === "pentagone" ? 5 : 6;
      return Array.from({ length: n }, (_, k) => tourner({ x: 0, y: 2 }, (360 * k) / n));
    }
    case "maison":
      return [{ x: -1.8, y: -1.8 }, { x: 1.8, y: -1.8 }, { x: 1.8, y: 0.6 }, { x: 0, y: 1.7 }, { x: -1.8, y: 0.6 }];
    case "trapeze_rectangle":
      return [{ x: -2.2, y: -1.4 }, { x: 2.2, y: -1.4 }, { x: 0.9, y: 1.4 }, { x: -2.2, y: 1.4 }];
    case "cercle":
      return [];
  }
}

export type Piece = {
  points: { id: string; x: number; y: number; nom?: string; cache?: boolean; couleur?: string }[];
  polygones: { sommets: string[]; fond?: string; contour?: string }[];
  segments: { a: string; b: string; code?: number; pointille?: boolean; couleur?: string; epais?: boolean; texte?: string; sansTrait?: boolean }[];
  angles: { sommet: string; de: string; vers: string; droit?: boolean; code?: number; texte?: string; couleur?: string; rayon?: number }[];
  cercles: { centre: string; rayon: number; couleur?: string; pointille?: boolean; fond?: string }[];
  /** Le bas de la pièce, pour poser une étiquette dessous. */
  bas: number;
  haut: number;
};

export type OptionsForme = {
  /** Où poser le centre. */
  cx?: number;
  cy?: number;
  /** Rotation en degrés ; « penche » tire une rotation visible. */
  rotation?: number;
  penche?: boolean;
  /** Le code de l'angle droit sur chaque angle droit de la forme. */
  codes?: boolean;
  /** Les angles à coder, par numéro de sommet (sinon tous ceux de la forme). */
  codesSur?: number[];
  /** Le codage des côtés égaux (carré : tous, rectangle : deux à deux). */
  egalites?: boolean;
  /** Les noms des sommets (A, B, C…) ; sinon, sommets cachés. */
  noms?: string[];
  /** Une longueur écrite le long de certains côtés : [numéro du côté, texte]. */
  longueurs?: [number, string][];
  /** Le centre du cercle, montré. */
  centre?: string;
  rayonTexte?: string;
  /** Un préfixe d'ids, pour poser plusieurs pièces dans un dessin. */
  id?: string;
  fond?: string;
  /** Rectangle : longueur et largeur réelles, pour un dessin à leurs proportions. */
  dims?: [number, number];
};

export function piece(f: Forme, o: OptionsForme = {}): Piece {
  const id = o.id ?? "f";
  const cx = o.cx ?? 0;
  const cy = o.cy ?? 0;
  const rot = o.rotation ?? (o.penche ? un([25, 35, 45, -30, -20]) : un([0, 0, 0, 10, -10, 90]));
  const fond = o.fond ?? un(FONDS);
  const p: Piece = { points: [], polygones: [], segments: [], angles: [], cercles: [], bas: cy, haut: cy };
  if (f === "cercle") {
    const r = 2;
    p.points.push({ id: `${id}O`, x: cx, y: cy, nom: o.centre, cache: !o.centre });
    p.cercles.push({ centre: `${id}O`, rayon: r, fond });
    if (o.rayonTexte) {
      p.points.push({ id: `${id}R`, x: r2(cx + r), y: cy, cache: true });
      p.segments.push({ a: `${id}O`, b: `${id}R`, texte: o.rayonTexte, couleur: "#dc2626" });
    }
    p.bas = cy - r;
    p.haut = cy + r;
    // Le cadre se calcule sur les points : deux points cachés tiennent le cercle entier.
    p.points.push({ id: `${id}h`, x: cx, y: r2(cy + r), cache: true }, { id: `${id}b`, x: cx, y: r2(cy - r), cache: true });
    return p;
  }
  const base = f === "rectangle" && o.dims ? (() => {
    const [L0, l0] = o.dims;
    const k = 5 / Math.max(L0, 1);
    const L = (L0 * k) / 2;
    const l = Math.max(l0 * k, 1.2) / 2;
    return [{ x: -L, y: -l }, { x: L, y: -l }, { x: L, y: l }, { x: -L, y: l }];
  })() : sommetsDe(f);
  const s = base.map((q) => tourner(q, rot)).map((q) => ({ x: r2(q.x + cx), y: r2(q.y + cy) }));
  const ids = s.map((_, k) => `${id}${k}`);
  s.forEach((q, k) => p.points.push({ id: ids[k], x: q.x, y: q.y, nom: o.noms?.[k], cache: !o.noms?.[k] }));
  p.polygones.push({ sommets: ids, fond });
  const n = s.length;
  const droits = SOMMETS_DROITS[f];
  if (o.codes) {
    for (const k of o.codesSur ?? droits) p.angles.push({ sommet: ids[k], de: ids[(k + n - 1) % n], vers: ids[(k + 1) % n], droit: true });
  }
  if (o.egalites && (f === "carre" || f === "rectangle" || f === "losange")) {
    for (let k = 0; k < n; k++) p.segments.push({ a: ids[k], b: ids[(k + 1) % n], code: f === "rectangle" ? 1 + (k % 2) : 1 });
  }
  for (const [k, t] of o.longueurs ?? []) p.segments.push({ a: ids[k % n], b: ids[(k + 1) % n], texte: t });
  p.bas = Math.min(...s.map((q) => q.y));
  p.haut = Math.max(...s.map((q) => q.y));
  return p;
}

/** Assemble des pièces en un dessin. */
export function dessin(pieces: Piece[], description: string, largeur = 320): CanvasFigure {
  return {
    kind: "construction",
    points: pieces.flatMap((p) => p.points),
    polygones: pieces.flatMap((p) => p.polygones),
    segments: pieces.flatMap((p) => p.segments),
    angles: pieces.flatMap((p) => p.angles),
    cercles: pieces.flatMap((p) => p.cercles),
    largeur,
    description,
  } as CanvasFigure;
}

/** Une étiquette (« 1 », « 2 »…) sous une pièce, sans trait ni point. */
export function etiquette(p: Piece, texte: string, cx: number, id: string): Piece {
  const y = r2(p.bas - 0.9);
  return {
    ...p,
    points: [...p.points, { id: `${id}e1`, x: r2(cx - 0.05), y, cache: true }, { id: `${id}e2`, x: r2(cx + 0.05), y, cache: true }],
    segments: [...p.segments, { a: `${id}e1`, b: `${id}e2`, texte, sansTrait: true, couleur: "#0f172a" }],
  };
}

/** Plusieurs formes numérotées 1, 2, 3, 4 : sur une ligne (≤ 3) ou en 2 × 2. */
export function planche(formes: { f: Forme; o?: OptionsForme }[], description: string): CanvasFigure {
  const n = formes.length;
  const pieces = formes.map(({ f, o }, k) => {
    const col = n <= 3 ? k : k % 2;
    const lig = n <= 3 ? 0 : Math.floor(k / 2);
    const cx = col * 6.4;
    const cy = -lig * 6.6;
    const p = piece(f, { ...o, cx, cy, id: `p${k}` });
    return etiquette(p, String(k + 1), cx, `p${k}`);
  });
  return dessin(pieces, description, n <= 3 ? 340 : 300);
}

/* ═════════════════ Les angles ═════════════════ */

/** Un angle seul : sommet O, deux côtés ; arc coloré (sauf `code` : le petit carré). */
export function pieceAngle(deg: number, o: { cx?: number; cy?: number; rotation?: number; code?: boolean; arc?: boolean; id?: string; longueurs?: [number, number] } = {}): Piece {
  const id = o.id ?? "a";
  const cx = o.cx ?? 0;
  const cy = o.cy ?? 0;
  const rot = o.rotation ?? un([0, 10, 20, -10, 30]);
  const [l1, l2] = o.longueurs ?? [un([3, 3.4, 3.8]), un([2.8, 3.2, 3.6])];
  const A = tourner({ x: l1, y: 0 }, rot);
  const B = tourner(tourner({ x: l2, y: 0 }, deg), rot);
  const pts = [
    { id: `${id}O`, x: r2(cx), y: r2(cy), cache: true },
    { id: `${id}A`, x: r2(cx + A.x), y: r2(cy + A.y), cache: true },
    { id: `${id}B`, x: r2(cx + B.x), y: r2(cy + B.y), cache: true },
  ];
  const p: Piece = {
    points: pts,
    polygones: [],
    segments: [{ a: `${id}O`, b: `${id}A`, epais: true }, { a: `${id}O`, b: `${id}B`, epais: true }],
    angles: [],
    cercles: [],
    bas: Math.min(...pts.map((q) => q.y)),
    haut: Math.max(...pts.map((q) => q.y)),
  };
  if (o.code) p.angles.push({ sommet: `${id}O`, de: `${id}A`, vers: `${id}B`, droit: true });
  else if (o.arc !== false) p.angles.push({ sommet: `${id}O`, de: `${id}A`, vers: `${id}B`, rayon: 20 });
  return p;
}

/** Plusieurs angles numérotés côte à côte. */
export function plancheAngles(degs: number[], description: string, code = false): CanvasFigure {
  const n = degs.length;
  const pieces = degs.map((d, k) => {
    // Sur une ligne jusqu'à 3 angles, en 2 × 2 à partir de 4 : des côtés assez longs pour y poser l'équerre.
    const col = n <= 3 ? k : k % 2;
    const lig = n <= 3 ? 0 : Math.floor(k / 2);
    const cx = col * 5 + (d > 95 ? 1.6 : 0);
    const cy = -lig * 4.6;
    const p = pieceAngle(d, { cx, cy, rotation: un([0, 5, 10, -5]), code: code && d === 90, id: `g${k}`, longueurs: [3, 3] });
    return etiquette({ ...p, bas: Math.min(p.bas, cy) }, String(k + 1), cx + 1, `g${k}`);
  });
  return dessin(pieces, description, n <= 3 ? 340 : 300);
}

/* ═════════════════ Segments, droites, points ═════════════════ */

export function pointsDessin(pts: { id: string; x: number; y: number; nom?: string }[], extra: Partial<Piece> = {}, description = "Des points et des traits."): CanvasFigure {
  return {
    kind: "construction",
    points: [...pts, ...(extra.points ?? [])],
    segments: extra.segments ?? [],
    angles: extra.angles ?? [],
    cercles: extra.cercles ?? [],
    polygones: extra.polygones ?? [],
    largeur: 320,
    description,
  } as CanvasFigure;
}

/** Les lettres de points, tirées sans répétition. */
export const LETTRES_PTS = ["A", "B", "C", "D", "E", "F", "K", "M", "N", "P", "R", "S", "T", "U"];
export function lettres(n: number): string[] {
  return melange([...LETTRES_PTS]).slice(0, n);
}

/* ═════════════════ Les solides ═════════════════ */

export type Solide = "cube" | "pave_droit" | "cylindre" | "cone" | "boule" | "pyramide" | "prisme";
export const NOM_SOLIDE: Record<Solide, string> = {
  cube: "un cube",
  pave_droit: "un pavé",
  cylindre: "un cylindre",
  cone: "un cône",
  boule: "une boule",
  pyramide: "une pyramide",
  prisme: "un prisme",
};

export function solide3d(s: Solide, baseTriangulaire = false): CanvasFigure {
  return {
    kind: "solide_3d",
    solide: s,
    ...(baseTriangulaire ? { baseTriangulaire: true } : {}),
    display: { showLabels: false, showDimensions: false, showFormulaHint: false },
  } as CanvasFigure;
}

/**
 * Le cube et le pavé dessinés en perspective cavalière (face avant, dessus, côté),
 * les trois arêtes cachées en pointillés.
 * ⛔ Le canvas `solide_3d` dessine le « cube » avec une face avant de 140 × 100 :
 * il ressemble à un pavé (vu au rendu le 10/11/2026). On le trace donc ici.
 */
export function cubeOuPave(cube: boolean): CanvasFigure {
  const L = cube ? 3 : un([4.4, 5]);
  const h = cube ? 3 : un([2, 2.4]);
  const d = cube ? { x: 1.4, y: 1.1 } : { x: 1.6, y: 1.2 };
  const P = (id: string, x: number, y: number) => ({ id, x: r2(x), y: r2(y), cache: true });
  const points = [
    P("F0", 0, 0), P("F1", L, 0), P("F2", L, h), P("F3", 0, h),
    P("B0", d.x, d.y), P("B1", L + d.x, d.y), P("B2", L + d.x, h + d.y), P("B3", d.x, h + d.y),
  ];
  return {
    kind: "construction",
    points,
    polygones: [
      { sommets: ["F0", "F1", "F2", "F3"], fond: "rgba(37, 99, 235, 0.14)" },
      { sommets: ["F3", "F2", "B2", "B3"], fond: "rgba(37, 99, 235, 0.07)" },
      { sommets: ["F1", "B1", "B2", "F2"], fond: "rgba(37, 99, 235, 0.22)" },
    ],
    segments: [
      { a: "F0", b: "B0", pointille: true, couleur: "#64748b" },
      { a: "B0", b: "B1", pointille: true, couleur: "#64748b" },
      { a: "B0", b: "B3", pointille: true, couleur: "#64748b" },
    ],
    largeur: 260,
    hauteurMax: 200,
    description: cube ? "Un cube en perspective." : "Un pavé en perspective.",
  } as CanvasFigure;
}

/** Le dessin d'un solide du CE1. */
export function dessinSolide(s: Solide): CanvasFigure {
  return s === "cube" || s === "pave_droit" ? cubeOuPave(s === "cube") : solide3d(s);
}
