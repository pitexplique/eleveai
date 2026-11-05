// lib/canvas/construction.ts
//
// LA GÉOMÉTRIE DU CANVAS `construction` (05/11/2026) : un fichier sans React, que
// les banques importent. ⛔ Les points remarquables se CALCULENT ici, jamais
// saisis : un centre de gravité posé à l'œil finirait à côté des médianes.

import type { ConstructionCanvasData } from "@/lib/tutor-v4/types_canvas";

export type P = { x: number; y: number };
export type Triangle = { A: P; B: P; C: P };

export const point = (x: number, y: number): P => ({ x, y });
const rad = (d: number) => (d * Math.PI) / 180;
export const dist = (a: P, b: P) => Math.hypot(a.x - b.x, a.y - b.y);
export const milieu = (a: P, b: P): P => ({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 });

/** Le point à la fraction t du trajet de a vers b. */
export const entrePoints = (a: P, b: P, t: number): P => ({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t });

/** Un point d'un cercle, à un angle en degrés compté depuis l'horizontale. */
export const surCercle = (o: P, r: number, d: number): P => ({ x: o.x + r * Math.cos(rad(d)), y: o.y + r * Math.sin(rad(d)) });

/** Le pied de la perpendiculaire menée de s à la droite (x y). */
export function piedPerpendiculaire(s: P, x: P, y: P): P {
  const dx = y.x - x.x;
  const dy = y.y - x.y;
  const t = ((s.x - x.x) * dx + (s.y - x.y) * dy) / (dx * dx + dy * dy);
  return { x: x.x + t * dx, y: x.y + t * dy };
}

/** Le centre de gravité : l'intersection des trois médianes. */
export const centreGravite = ({ A, B, C }: Triangle): P => ({ x: (A.x + B.x + C.x) / 3, y: (A.y + B.y + C.y) / 3 });

/** Le centre du cercle inscrit, pondéré par les côtés opposés. */
export function centreInscrit({ A, B, C }: Triangle): P {
  const a = dist(B, C);
  const b = dist(A, C);
  const c = dist(A, B);
  const p = a + b + c;
  return { x: (a * A.x + b * B.x + c * C.x) / p, y: (a * A.y + b * B.y + c * C.y) / p };
}

/** Le rayon du cercle inscrit : la distance de son centre à un côté. */
export function rayonInscrit(t: Triangle): number {
  const i = centreInscrit(t);
  return dist(i, piedPerpendiculaire(i, t.A, t.B));
}

/** Le pied de la bissectrice issue de s, sur le côté [x y]. */
export function piedBissectrice(s: P, x: P, y: P): P {
  const dx = dist(s, x);
  const dy = dist(s, y);
  return entrePoints(x, y, dx / (dx + dy));
}

export function centreCirconscrit({ A, B, C }: Triangle): P {
  const d = 2 * (A.x * (B.y - C.y) + B.x * (C.y - A.y) + C.x * (A.y - B.y));
  const a2 = A.x * A.x + A.y * A.y;
  const b2 = B.x * B.x + B.y * B.y;
  const c2 = C.x * C.x + C.y * C.y;
  return {
    x: (a2 * (B.y - C.y) + b2 * (C.y - A.y) + c2 * (A.y - B.y)) / d,
    y: (a2 * (C.x - B.x) + b2 * (A.x - C.x) + c2 * (B.x - A.x)) / d,
  };
}

/** L'orthocentre : H = A + B + C − 2 × O, où O est le centre du cercle circonscrit. */
export function orthocentre(t: Triangle): P {
  const o = centreCirconscrit(t);
  return { x: t.A.x + t.B.x + t.C.x - 2 * o.x, y: t.A.y + t.B.y + t.C.y - 2 * o.y };
}

/**
 * Un triangle de ces trois angles (en A, B, C), posé sur un cercle : le dessin dit la
 * vérité. Un angle inscrit vaut la moitié de l'arc qu'il intercepte : l'arc BC fait
 * 2a, l'arc CA fait 2b, l'arc AB fait 2c, et on place C puis B à partir de A.
 */
export function triangleParAngles(a: number, b: number, c: number, rotation = 0): Triangle {
  const o = point(0, 0);
  const dA = 90 + rotation;
  return { A: surCercle(o, 1, dA), C: surCercle(o, 1, dA + 2 * b), B: surCercle(o, 1, dA - 2 * c) };
}

/** Un triangle aux trois angles aigus (orthocentre et centres à l'intérieur), jamais trop plat. */
export function triangleAigu(): Triangle {
  for (;;) {
    const a = 45 + Math.floor(Math.random() * 35);
    const b = 45 + Math.floor(Math.random() * 35);
    const c = 180 - a - b;
    if (c < 42 || c > 82 || (a === b && b === c)) continue;
    return triangleParAngles(a, b, c);
  }
}

/** Un polygone régulier à n côtés, le premier sommet tourné de `rotation`. */
export function polygoneRegulier(n: number, r: number, rotation = 90, o: P = point(0, 0)): P[] {
  return Array.from({ length: n }, (_, k) => surCercle(o, r, rotation + (360 * k) / n));
}

/** Fabrique la donnée du canvas depuis un dictionnaire { nom: point }. */
export function figureConstruction(
  points: Record<string, P>,
  reste: Omit<ConstructionCanvasData, "kind" | "points"> = {},
  sansNom: readonly string[] = [],
): ConstructionCanvasData {
  return {
    kind: "construction",
    points: Object.entries(points).map(([id, p]) => ({ id, x: p.x, y: p.y, ...(sansNom.includes(id) ? { cache: true } : {}) })),
    ...reste,
  };
}
