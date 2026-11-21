// Outils de géométrie pour les énigmes de 3e (21/11/2026) : des figures AU
// BON RAPPORT, calculées à partir des longueurs. S'ajoute à dessins-ecole.ts.
import { COULEURS as C } from "./types";

export type P = [number, number];
const r1 = (v: number) => Math.round(v * 10) / 10;

/** Le troisième sommet A d'un triangle de base [B C] posée à l'horizontale,
 *  connaissant AB et AC dans la même unité que BC (en px). A est au-dessus. */
export const sommet = (B: P, Cc: P, ab: number, ac: number): P => {
  const bc = Math.hypot(Cc[0] - B[0], Cc[1] - B[1]);
  const x = (ab * ab - ac * ac + bc * bc) / (2 * bc);
  const y = Math.sqrt(Math.max(0, ab * ab - x * x));
  const ux = (Cc[0] - B[0]) / bc, uy = (Cc[1] - B[1]) / bc;
  return [r1(B[0] + x * ux + y * uy), r1(B[1] + x * uy - y * ux)];
};

/** Le point à la fraction t du chemin de a vers b. */
export const sur = (a: P, b: P, t: number): P => [r1(a[0] + t * (b[0] - a[0])), r1(a[1] + t * (b[1] - a[1]))];

/** Un segment. */
export const seg = (a: P, b: P, c: string = C.craie, ep = 4, tirets = "") =>
  `<path d="M${a[0]} ${a[1]} L${b[0]} ${b[1]}" stroke="${c}" stroke-width="${ep}" stroke-linecap="round"${tirets ? ` stroke-dasharray="${tirets}"` : ""}/>`;

/** Un polygone fermé (op > 0 : teinté). */
export const poly = (pts: P[], c: string = C.craie, ep = 4, op = 0) =>
  `<path d="M${pts.map((q) => `${q[0]} ${q[1]}`).join(" L")} Z" fill="${op ? c : "none"}" fill-opacity="${op}" stroke="${c}" stroke-width="${ep}" stroke-linejoin="round"/>`;

/** Un point nommé : la lettre est décalée de (dx, dy). */
export const pt = (q: P, nom: string, dx: number, dy: number, c: string = C.craie, taille = 24) =>
  `<circle cx="${q[0]}" cy="${q[1]}" r="4.5" fill="${c}"/>` +
  (nom ? `<text x="${r1(q[0] + dx)}" y="${r1(q[1] + dy)}" fill="${c}" font-size="${taille}" text-anchor="middle">${nom}</text>` : "");

/** Le petit carré de l'angle droit en S, entre les directions S→U et S→V. */
export const angleDroit = (S: P, U: P, V: P, k = 18, c: string = C.craie) => {
  const n = (a: P) => { const d = Math.hypot(a[0] - S[0], a[1] - S[1]); return [(a[0] - S[0]) / d, (a[1] - S[1]) / d]; };
  const [ux, uy] = n(U), [vx, vy] = n(V);
  const a: P = [r1(S[0] + k * ux), r1(S[1] + k * uy)], b: P = [r1(S[0] + k * (ux + vx)), r1(S[1] + k * (uy + vy))], d: P = [r1(S[0] + k * vx), r1(S[1] + k * vy)];
  return `<path d="M${a[0]} ${a[1]} L${b[0]} ${b[1]} L${d[0]} ${d[1]}" fill="none" stroke="${c}" stroke-width="2.5"/>`;
};

/** Un arc d'angle en S, de la direction S→U à la direction S→V (sens le plus court). */
export const arcAngle = (S: P, U: P, V: P, rayon = 34, c: string = C.rose, ep = 3) => {
  const a1 = Math.atan2(U[1] - S[1], U[0] - S[0]), a2 = Math.atan2(V[1] - S[1], V[0] - S[0]);
  let d = a2 - a1;
  while (d > Math.PI) d -= 2 * Math.PI;
  while (d < -Math.PI) d += 2 * Math.PI;
  const p1: P = [r1(S[0] + rayon * Math.cos(a1)), r1(S[1] + rayon * Math.sin(a1))], p2: P = [r1(S[0] + rayon * Math.cos(a2)), r1(S[1] + rayon * Math.sin(a2))];
  return `<path d="M${p1[0]} ${p1[1]} A${rayon} ${rayon} 0 0 ${d > 0 ? 1 : 0} ${p2[0]} ${p2[1]}" fill="none" stroke="${c}" stroke-width="${ep}"/>`;
};

/** Le milieu de [a b], décalé de (dx, dy) : pour poser une longueur. */
export const milieu = (a: P, b: P, dx = 0, dy = 0): P => [r1((a[0] + b[0]) / 2 + dx), r1((a[1] + b[1]) / 2 + dy)];
