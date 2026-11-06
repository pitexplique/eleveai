// Fractions de π et écritures exactes, communes aux banques des angles orientés, de la tangente et des
// équations trigonométriques (06/11/2026). Rien de numérique dans les énoncés : aucune calculatrice.

import { pgcd } from "../../lycee-commun";

export type Fr = { n: number; d: number };
export const F = (n: number, d = 1): Fr => {
  const g = pgcd(Math.abs(n), Math.abs(d)) || 1;
  const s = d < 0 ? -1 : 1;
  return { n: ((s * n) / g) || 0, d: (s * d) / g };
};
export const ajoute = (a: Fr, b: Fr) => F(a.n * b.d + b.n * a.d, a.d * b.d);
export const oppose = (a: Fr) => F(-a.n, a.d);
export const retire = (a: Fr, b: Fr) => ajoute(a, oppose(b));
export const fois = (a: Fr, m: number) => F(a.n * m, a.d);
export const divise = (a: Fr, m: number) => F(a.n, a.d * m);
export const egal = (a: Fr, b: Fr) => a.n * b.d === b.n * a.d;
export const inf = (a: Fr, b: Fr) => a.n * b.d < b.n * a.d;
export const reel = (a: Fr) => (a.n / a.d) * Math.PI;

/** Ramène dans ]−π ; π]. */
export function principal(a: Fr): Fr {
  const k = Math.ceil((a.n / a.d - 1) / 2 - 1e-9);
  return ajoute(a, F(-2 * k));
}
/** nπ/d en LaTeX. */
export function piL(a: Fr) {
  if (a.n === 0) return "0";
  const N = Math.abs(a.n);
  const s = a.n < 0 ? "-" : "";
  if (a.d === 1) return N === 1 ? `${s}\\pi` : `${s}${N}\\pi`;
  return N === 1 ? `${s}\\dfrac{\\pi}{${a.d}}` : `${s}\\dfrac{${N}\\pi}{${a.d}}`;
}
/** Une fraction ordinaire en LaTeX. */
export function frL(p: number, q: number) {
  const f = F(p, q);
  if (f.d === 1) return String(f.n);
  return `${f.n < 0 ? "-" : ""}\\dfrac{${Math.abs(f.n)}}{${f.d}}`;
}
/** La formule seule dans son paragraphe : ni « ? » ni « . » orphelin à 375 px. */
export const enonce = (debut: string, formule: string, fin = "") => `${debut}\n\n$${formule}$${fin ? `\n\n${fin}` : ""}`;

/** L'argument affine mx + φ écrit proprement (φ en fraction de π). */
export function argL(m: number, phi: Fr, x = "x") {
  const mx = m === 1 ? x : m === -1 ? `-${x}` : `${m}${x}`;
  if (phi.n === 0) return mx;
  return `${mx} ${phi.n < 0 ? "-" : "+"} ${piL(F(Math.abs(phi.n), phi.d))}`;
}
export const ligneL = (fn: string, m: number, phi: Fr) => {
  const a = argL(m, phi);
  return a === "x" ? `\\${fn} x` : `\\${fn}\\left(${a}\\right)`;
};
export const ligneDe = (fn: string, a: Fr) => `\\${fn}\\left(${piL(a)}\\right)`;
