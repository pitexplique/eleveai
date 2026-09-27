// lib/canvas/cercle-trigo-valeurs.ts
//
// Les valeurs exactes du cercle trigonométrique, CALCULÉES et non recopiées.
// Le canvas `cercle_trigo`, la banque de 1re spé et le script de recalcul
// lisent tous ce fichier : une valeur fausse ne peut pas s'y glisser à un seul
// endroit.
//
// Un réel est une fraction de π, { n, d } = nπ/d, d > 0.

import type { AngleTrigo } from "@/lib/tutor-v4/types_canvas";

export type ValeurExacte =
  | "0"
  | "1"
  | "-1"
  | "1/2"
  | "-1/2"
  | "r2/2"
  | "-r2/2"
  | "r3/2"
  | "-r3/2";

function pgcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) [a, b] = [b, a % b];
  return a || 1;
}

/** La fraction simplifiée : 28π/2 → 14π, 10π/6 → 5π/3. */
export function simplifier(a: AngleTrigo): AngleTrigo {
  const g = pgcd(a.n, a.d);
  return { n: a.n / g, d: a.d / g };
}

/** Le même point du cercle, ramené dans ]−π ; π]. */
export function reduirePrincipal(a: AngleTrigo): AngleTrigo {
  const s = simplifier(a);
  const tour = 2 * s.d;
  let n = ((s.n % tour) + tour) % tour; // [0 ; 2π[
  if (n > s.d) n -= tour; // ]−π ; π]
  return simplifier({ n, d: s.d });
}

/** Le même point du cercle, ramené dans [0 ; 2π[. */
export function reduirePositif(a: AngleTrigo): AngleTrigo {
  const s = simplifier(a);
  const tour = 2 * s.d;
  return simplifier({ n: ((s.n % tour) + tour) % tour, d: s.d });
}

/** Le nombre de tours complets retirés pour tomber dans [0 ; 2π[ (négatif si on en ajoute). */
export function toursRetires(a: AngleTrigo): number {
  return Math.floor(a.n / (2 * a.d));
}

export function enDegres(a: AngleTrigo): number {
  return (180 * a.n) / a.d;
}

const COS_PAR_DEGRE: Record<number, ValeurExacte> = {
  0: "1", 30: "r3/2", 45: "r2/2", 60: "1/2", 90: "0",
  120: "-1/2", 135: "-r2/2", 150: "-r3/2", 180: "-1",
  210: "-r3/2", 225: "-r2/2", 240: "-1/2", 270: "0",
  300: "1/2", 315: "r2/2", 330: "r3/2",
};

function degreNormalise(a: AngleTrigo): number | null {
  const deg = enDegres(a);
  if (Math.abs(deg - Math.round(deg)) > 1e-9) return null;
  return ((Math.round(deg) % 360) + 360) % 360;
}

/** null si le réel n'est pas une valeur remarquable (multiple de π/6 ou π/4). */
export function cosExact(a: AngleTrigo): ValeurExacte | null {
  const d = degreNormalise(a);
  return d === null ? null : (COS_PAR_DEGRE[d] ?? null);
}

export function sinExact(a: AngleTrigo): ValeurExacte | null {
  const d = degreNormalise(a);
  return d === null ? null : (COS_PAR_DEGRE[(((90 - d) % 360) + 360) % 360] ?? null);
}

export function opposee(v: ValeurExacte): ValeurExacte {
  if (v === "0") return "0";
  return (v.startsWith("-") ? v.slice(1) : `-${v}`) as ValeurExacte;
}

export function valeurNumerique(v: ValeurExacte): number {
  const signe = v.startsWith("-") ? -1 : 1;
  const abs = v.replace("-", "");
  const m: Record<string, number> = {
    "0": 0, "1": 1, "1/2": 0.5, "r2/2": Math.SQRT2 / 2, "r3/2": Math.sqrt(3) / 2,
  };
  return signe * m[abs];
}

export function valeurLatex(v: ValeurExacte): string {
  const signe = v.startsWith("-") ? "-" : "";
  const abs = v.replace("-", "");
  const m: Record<string, string> = {
    "0": "0", "1": "1", "1/2": "\\dfrac{1}{2}",
    "r2/2": "\\dfrac{\\sqrt{2}}{2}", "r3/2": "\\dfrac{\\sqrt{3}}{2}",
  };
  return signe + m[abs];
}

/** Numérateur et dénominateur à écrire dans le dessin (le signe à part). */
export function valeurFraction(v: ValeurExacte): { signe: string; num: string; den?: string } {
  const signe = v.startsWith("-") ? "−" : "";
  const abs = v.replace("-", "");
  if (abs === "0" || abs === "1") return { signe: abs === "0" ? "" : signe, num: abs };
  return { signe, num: abs === "1/2" ? "1" : abs === "r2/2" ? "√2" : "√3", den: "2" };
}

/** nπ/d en LaTeX, SANS simplifier (l'énoncé écrit ce qu'il veut). */
export function angleLatex(a: AngleTrigo): string {
  const signe = a.n < 0 ? "-" : "";
  const n = Math.abs(a.n);
  if (n === 0) return "0";
  const num = n === 1 ? "\\pi" : `${n}\\pi`;
  return a.d === 1 ? `${signe}${num}` : `${signe}\\dfrac{${num}}{${a.d}}`;
}

/** nπ/d pour le dessin, SANS simplifier : { signe, num, den }. */
export function angleFraction(a: AngleTrigo): { signe: string; num: string; den?: string } {
  const signe = a.n < 0 ? "−" : "";
  const n = Math.abs(a.n);
  if (n === 0) return { signe: "", num: "0" };
  const num = n === 1 ? "π" : `${n}π`;
  return a.d === 1 ? { signe, num } : { signe, num, den: String(a.d) };
}

/** nπ/d en texte d'une ligne : « −5π/6 ». */
export function angleTexte(a: AngleTrigo): string {
  const f = angleFraction(a);
  return f.den ? `${f.signe}${f.num}/${f.den}` : `${f.signe}${f.num}`;
}

/** Les 16 valeurs remarquables, dans ]−π ; π]. */
export const REPERES_TOUS: AngleTrigo[] = [
  { n: 0, d: 1 }, { n: 1, d: 6 }, { n: 1, d: 4 }, { n: 1, d: 3 }, { n: 1, d: 2 },
  { n: 2, d: 3 }, { n: 3, d: 4 }, { n: 5, d: 6 }, { n: 1, d: 1 },
  { n: -5, d: 6 }, { n: -3, d: 4 }, { n: -2, d: 3 }, { n: -1, d: 2 },
  { n: -1, d: 3 }, { n: -1, d: 4 }, { n: -1, d: 6 },
];

export const REPERES_QUARTS: AngleTrigo[] = [
  { n: 0, d: 1 }, { n: 1, d: 2 }, { n: 1, d: 1 }, { n: -1, d: 2 },
];

export const REPERES_PREMIER_QUADRANT: AngleTrigo[] = [
  ...REPERES_QUARTS, { n: 1, d: 6 }, { n: 1, d: 4 }, { n: 1, d: 3 },
];
