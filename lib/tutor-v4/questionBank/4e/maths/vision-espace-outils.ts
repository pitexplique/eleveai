// lib/tutor-v4/questionBank/4e/maths/vision-espace-outils.ts
//
// ⭐ 15/11/2026 — LES OUTILS DES GABARITS NEUFS DE `vision_espace` (4e).
// Trois dessins que la notion n'avait pas :
//   1. la PERSPECTIVE CAVALIÈRE avec ses arêtes cachées en pointillés
//      (canvas `repere3d`, sans axes) : les pointillés sont CALCULÉS — une arête
//      est cachée quand ses deux faces tournent le dos à l'observateur ;
//   2. les PATRONS DU CUBE (canvas `patrons_cube`) : les 11 patrons et des
//      assemblages de 6 carrés qui ne se referment pas (repris de la CM2,
//      `cm2/maths/aiguilles-patrons-probas.bank.ts`, sans toucher ce fichier) ;
//   3. les ASSEMBLAGES DE CUBES (canvas `solide_3d`, `cubes`) et leurs vues
//      (repris de la 6e, `6e/maths/vision-espace.bank.ts`).
// ⛔ Rien ici n'est partagé avec la 6e : `patrons-outils.ts` et
// `lib/canvas/patron-solide.ts` restent intacts.

import type { CanvasFigure, Solide3DCanvasData } from "@/lib/tutor-v4/types_canvas";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { entre, un } from "@/lib/tutor-v4/questionBank/outils-geometrie";

/* ───────────────────────── la saisie ───────────────────────── */

/** Une fois sur deux, le pavé numérique (réponse numérique « 24 », « 12 cm », « 6 carreaux »). */
export const auPave = <T extends TutorGeneratedQuestionV4>(q: T, proba = 0.5): T =>
  (Math.random() < proba ? { ...q, saisie: "pave" } : q) as T;

/* ───────────────────────── 1. la perspective cavalière ───────────────────────── */

type P3 = [number, number, number];
export type Polyedre = { sommets: P3[]; faces: number[][] };

/** La direction qu'écrase la projection de `Repere3dCanvas` (y fuit à 30°, réduit de moitié). */
const VERS_OBSERVATEUR: P3 = [0.5 * Math.cos(Math.PI / 6), -1, 0.5 * Math.sin(Math.PI / 6)];

const moins = (a: P3, b: P3): P3 => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const vect = (a: P3, b: P3): P3 => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const scal = (a: P3, b: P3) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];

/** Les faces vues : normale sortante tournée vers l'observateur. */
export function facesVues(p: Polyedre): boolean[] {
  const g: P3 = [0, 1, 2].map((k) => p.sommets.reduce((s, v) => s + v[k], 0) / p.sommets.length) as P3;
  return p.faces.map((f) => {
    const [a, b, c] = f.map((i) => p.sommets[i]);
    let n = vect(moins(b, a), moins(c, a));
    const cf: P3 = [0, 1, 2].map((k) => f.reduce((s, i) => s + p.sommets[i][k], 0) / f.length) as P3;
    if (scal(n, moins(cf, g)) < 0) n = [-n[0], -n[1], -n[2]];
    return scal(n, VERS_OBSERVATEUR) > 1e-9;
  });
}

/** Les arêtes (une fois chacune), et si elles sont cachées. */
export function aretes(p: Polyedre): { de: number; a: number; cachee: boolean }[] {
  const vues = facesVues(p);
  const m = new Map<string, { de: number; a: number; faces: number[] }>();
  p.faces.forEach((f, k) =>
    f.forEach((i, j) => {
      const s = f[(j + 1) % f.length];
      const cle = i < s ? `${i}-${s}` : `${s}-${i}`;
      if (!m.has(cle)) m.set(cle, { de: Math.min(i, s), a: Math.max(i, s), faces: [] });
      m.get(cle)!.faces.push(k);
    })
  );
  return [...m.values()].map((e) => ({ de: e.de, a: e.a, cachee: e.faces.every((k) => !vues[k]) }));
}

export function pavePoly(L: number, l: number, h: number): Polyedre {
  return {
    sommets: [[0, 0, 0], [L, 0, 0], [L, l, 0], [0, l, 0], [0, 0, h], [L, 0, h], [L, l, h], [0, l, h]],
    faces: [[0, 1, 2, 3], [4, 5, 6, 7], [0, 1, 5, 4], [1, 2, 6, 5], [2, 3, 7, 6], [3, 0, 4, 7]],
  };
}
/** Le prisme couché (une tente) : triangle ABC devant, DEF derrière. */
export function prismePoly(L: number, l: number, H: number): Polyedre {
  return {
    sommets: [[0, 0, 0], [L, 0, 0], [L / 2, 0, H], [0, l, 0], [L, l, 0], [L / 2, l, H]],
    faces: [[0, 1, 2], [3, 4, 5], [0, 1, 4, 3], [1, 2, 5, 4], [2, 0, 3, 5]],
  };
}
/** La pyramide à base carrée ABCD, de sommet S au-dessus du centre. */
export function pyramidePoly(c: number, h: number): Polyedre {
  return {
    sommets: [[0, 0, 0], [c, 0, 0], [c, c, 0], [0, c, 0], [c / 2, c / 2, h]],
    faces: [[0, 1, 2, 3], [0, 1, 4], [1, 2, 4], [2, 3, 4], [3, 0, 4]],
  };
}

/** Des jeux de lettres pour nommer les sommets (la base d'abord, puis le haut ou le sommet). */
export const LETTRES = {
  pave: [["A", "B", "C", "D", "E", "F", "G", "H"], ["R", "S", "T", "U", "V", "W", "X", "Y"], ["I", "J", "K", "L", "M", "N", "P", "Q"]],
  prisme: [["A", "B", "C", "D", "E", "F"], ["R", "S", "T", "U", "V", "W"], ["I", "J", "K", "L", "M", "N"]],
  pyramide: [["A", "B", "C", "D", "S"], ["M", "N", "P", "Q", "S"], ["E", "F", "G", "H", "K"]],
} as Record<"pave" | "prisme" | "pyramide", readonly (readonly string[])[]>;

export type SolidePersp = "cube" | "pave" | "prisme" | "pyramide";
export type Perspective = {
  quoi: SolidePersp;
  /** « un cube », « un pavé droit »… */
  nom: string;
  poly: Polyedre;
  noms: readonly string[];
  segs: { de: number; a: number; cachee: boolean }[];
  canvas: CanvasFigure;
};

/** Un solide tiré, dessiné en perspective cavalière, arêtes cachées en pointillés. */
export function perspective(quoi: SolidePersp = un(["cube", "pave", "prisme", "pyramide"] as const)): Perspective {
  const poly =
    quoi === "cube" ? (() => { const a = entre(3, 4); return pavePoly(a, a, a); })()
    : quoi === "pave" ? pavePoly(entre(4, 6), entre(2, 3) * 1.5, entre(2, 3))
    : quoi === "prisme" ? prismePoly(entre(4, 5), entre(4, 6), entre(2, 3) + 0.5)
    : pyramidePoly(4, entre(3, 4) + 0.5);
  const noms = un(quoi === "cube" || quoi === "pave" ? LETTRES.pave : quoi === "prisme" ? LETTRES.prisme : LETTRES.pyramide);
  const segs = aretes(poly);
  const nom = { cube: "un cube", pave: "un pavé droit", prisme: "un prisme droit", pyramide: "une pyramide" }[quoi];
  return {
    quoi,
    nom,
    poly,
    noms,
    segs,
    canvas: {
      kind: "repere3d",
      afficherAxes: false,
      points: poly.sommets.map(([x, y, z], i) => ({ x, y, z, label: noms[i], couleur: "#1e3a8a" })),
      segments: segs.map((s) => ({ de: s.de, a: s.a, couleur: "#1e3a8a", ...(s.cachee ? { pointille: true } : {}) })),
      size: { width: 320, height: 260 },
    } as CanvasFigure,
  };
}
export const nomArete = (p: Perspective, s: { de: number; a: number }) => `[${p.noms[s.de]}${p.noms[s.a]}]`;

/* ───────────────────────── 2. les patrons du cube ───────────────────────── */

export type Cases = [number, number][];
/** Les 11 patrons du cube. */
export const PATRONS_CUBE: Cases[] = [
  ...[[0, 0], [0, 1], [0, 2], [0, 3], [1, 1], [1, 2]].map(([a, b]) => [[1, 0], [1, 1], [1, 2], [1, 3], [0, a], [2, b]] as Cases),
  ...[1, 2, 3].map((c) => [[0, 0], [0, 1], [1, 1], [1, 2], [1, 3], [2, c]] as Cases),
  [[0, 0], [0, 1], [1, 1], [1, 2], [2, 2], [2, 3]],
  [[0, 0], [0, 1], [0, 2], [1, 2], [1, 3], [1, 4]],
];
/** Six carrés bien attachés qui ne se referment pas en cube. */
export const NON_PATRONS_CUBE: Cases[] = [
  [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5]],
  [[1, 0], [1, 1], [1, 2], [1, 3], [1, 4], [0, 1]],
  [[0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2]],
  [[1, 0], [1, 1], [1, 2], [1, 3], [0, 0], [0, 3]],
  [[1, 0], [1, 1], [1, 2], [1, 3], [0, 0], [0, 1]],
  [[1, 0], [1, 1], [1, 2], [1, 3], [0, 1], [0, 2]],
  [[0, 0], [0, 1], [0, 2], [1, 2], [1, 3], [2, 3]],
  [[0, 0], [0, 1], [0, 2], [1, 1], [2, 1], [2, 2]],
  [[0, 0], [0, 1], [0, 2], [1, 2], [1, 3], [2, 2]],
  [[0, 0], [1, 0], [2, 0], [2, 1], [2, 2], [1, 2]],
  [[0, 1], [1, 0], [1, 1], [1, 2], [0, 2], [2, 1]],
];
/** Tourner, retourner, recaler en haut à gauche : la forme change d'allure, pas de nature. */
export function tourne(c: Cases): Cases {
  const k = entre(0, 3);
  const miroir = Math.random() < 0.5;
  let l: Cases = c.map(([r, x]) => [r, miroir ? -x : x]);
  for (let i = 0; i < k; i++) l = l.map(([r, x]) => [x, -r]);
  const rm = Math.min(...l.map(([r]) => r));
  const cm = Math.min(...l.map(([, x]) => x));
  return l.map(([r, x]) => [r - rm, x - cm]);
}

/**
 * On ROULE un cube sur le patron, case par case : chaque case reçoit la face du
 * cube qui la touche. Six faces différentes = le patron se referme.
 * (h, b = haut, bas ; n, s = nord, sud ; e, o = est, ouest)
 */
export function plier(c: Cases): Map<string, string> {
  const res = new Map<string, string>();
  type D = { h: string; b: string; n: string; s: string; e: string; o: string };
  const a = (r: number, x: number) => c.some(([p, q]) => p === r && q === x);
  const rec = (r: number, x: number, d: D) => {
    const k = `${r},${x}`;
    if (res.has(k)) return;
    res.set(k, d.b);
    if (a(r, x + 1)) rec(r, x + 1, { h: d.o, b: d.e, n: d.n, s: d.s, e: d.h, o: d.b });
    if (a(r, x - 1)) rec(r, x - 1, { h: d.e, b: d.o, n: d.n, s: d.s, e: d.b, o: d.h });
    if (a(r + 1, x)) rec(r + 1, x, { h: d.n, b: d.s, n: d.b, s: d.h, e: d.e, o: d.o });
    if (a(r - 1, x)) rec(r - 1, x, { h: d.s, b: d.n, n: d.h, s: d.b, e: d.e, o: d.o });
  };
  rec(c[0][0], c[0][1], { h: "h", b: "b", n: "n", s: "s", e: "e", o: "o" });
  return res;
}
export const OPPOSEE: Record<string, string> = { h: "b", b: "h", n: "s", s: "n", e: "o", o: "e" };
export const sePlieEnCube = (c: Cases) => c.length === 6 && new Set(plier(c).values()).size === 6;
/** La case qui sera EN FACE d'une case donnée, une fois le patron plié. */
export function enFace(c: Cases, cle: [number, number]): [number, number] {
  const m = plier(c);
  const f = m.get(`${cle[0]},${cle[1]}`)!;
  for (const [k, v] of m) if (v === OPPOSEE[f]) { const [r, x] = k.split(",").map(Number); return [r, x]; }
  throw new Error("patron de cube invalide");
}
export const unPatronCube = () => tourne(un(PATRONS_CUBE));
export const unNonPatronCube = () => tourne(un(NON_PATRONS_CUBE));

/* ───────────────────────── 3. les assemblages de cubes ───────────────────────── */

export type Cube = { x: number; y: number; z: number };
/** ⚠️ `showLabels` à faux : sinon le canvas écrit le nombre de cubes sous la figure. */
export const assemblage = (cubes: Cube[]): Solide3DCanvasData => ({
  kind: "solide_3d",
  solide: "assemblage_cubes",
  cubes,
  display: { showLabels: false, showUnitCubes: true },
});
export function paveDeCubes(L: number, l: number, h: number): Cube[] {
  const c: Cube[] = [];
  for (let x = 0; x < L; x++) for (let y = 0; y < l; y++) for (let z = 0; z < h; z++) c.push({ x, y, z });
  return c;
}
/** Des colonnes sur une grille `L × l`, de hauteurs données (0 = case vide). */
export function colonnes(h: number[][]): Cube[] {
  const c: Cube[] = [];
  h.forEach((rang, y) => rang.forEach((k, x) => { for (let z = 0; z < k; z++) c.push({ x, y, z }); }));
  return c;
}
/** Les vues d'un assemblage, en carreaux : dessus (x, y), face (x, z), côté (y, z). */
export function vuesCubes(c: Cube[]) {
  const n = (f: (q: Cube) => string) => new Set(c.map(f)).size;
  return { dessus: n((q) => `${q.x},${q.y}`), face: n((q) => `${q.x},${q.z}`), cote: n((q) => `${q.y},${q.z}`), total: c.length };
}
