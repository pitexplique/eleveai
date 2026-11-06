// OUTILS DES THÈMES D'ANALYSE HORS FRANCE (06/11/2026) : écritures, énoncés à formule
// isolée (elle tient alors à 375 px sans « ? » orphelin), figures de `fonctionGraphique`.

import type { CanvasFigure } from "@/lib/tutor-v4/types";
import { entre, nL, un } from "../../lycee-commun";

export const nonNul = (a: number, b: number) => {
  for (;;) {
    const v = entre(a, b);
    if (v !== 0) return v;
  }
};

/** Une somme dans l'ordre donné : « 2x^2 - x + 3 », termes nuls retirés. `c` = "" pour la constante. */
export function poly(...t: readonly (readonly [number, string])[]) {
  const v = t.filter(([k]) => k !== 0);
  if (!v.length) return "0";
  return v
    .map(([k, c], i) => {
      const abs = Math.abs(k);
      const coef = abs === 1 && c ? "" : nL(abs);
      const signe = i === 0 ? (k < 0 ? "-" : "") : k < 0 ? " - " : " + ";
      return `${signe}${coef}${c}`;
    })
    .join("");
}
export const aff = (m: number, p: number, x = "x") => poly([m, x], [p, ""]);
/** x − d écrit proprement : « x - 1 », « x + 2 », « x ». */
export const decale = (d: number, x = "x") => aff(1, -d, x);
/** La fin « + 5/(x − 1) », le signe devant la fraction. */
export const queue = (c: number, den: string) => `${c < 0 ? "-" : "+"} \\dfrac{${Math.abs(c)}}{${den}}`;
/** La fraction seule, signe compris. */
export const fracS = (c: number, den: string) => `${c < 0 ? "-" : ""}\\dfrac{${Math.abs(c)}}{${den}}`;

/** Un énoncé : l'annonce, la formule seule dans son paragraphe, la question. */
export const enonce = (intro: string, formule: string, question: string) => `${intro}\n\n$${formule}$\n\n${question}`;

export const INTROS = (dom: string, f = "f") => [
  `Soit $${f}$ la fonction définie sur $${dom}$ par :`,
  `On considère la fonction $${f}$ définie sur $${dom}$ par :`,
  `Une fonction $${f}$ est définie sur $${dom}$ par :`,
  `On étudie sur $${dom}$ la fonction $${f}$ donnée par :`,
  `Sur $${dom}$, on pose :`,
  `Sur $${dom}$, on modélise une courbe par :`,
];
export const intro = (dom: string, f = "f") => un(INTROS(dom, f));

export const lim = (a: string) => `\\lim\\limits_{x \\to ${a}}`;
export const PLUS = "+\\infty";
export const MOINS = "-\\infty";
export const R = "\\mathbb{R}";
export const Rsauf = (d: number) => `\\mathbb{R} \\setminus \\nobreak \\{${d}\\}`;

/** Une fonction définie par morceaux : `[expression, condition]`. */
export const cas = (l: readonly (readonly [string, string])[]) =>
  `\\begin{cases} ${l.map(([e, c]) => `${e} & \\text{si } ${c}`).join(" \\\\ ")} \\end{cases}`;

/* ───────────────── figures ───────────────── */

export type Pt = { x: number; y: number };
/** Les points d'une branche, gardés seulement dans le cadre : la courbe s'arrête au bord. */
export function branche(f: (x: number) => number, x0: number, x1: number, ymin: number, ymax: number, n = 90): Pt[] {
  const l: Pt[] = [];
  for (let k = 0; k <= n; k++) {
    const x = x0 + ((x1 - x0) * k) / n;
    const y = f(x);
    if (Number.isFinite(y) && y >= ymin && y <= ymax) l.push({ x: Math.round(x * 1000) / 1000, y: Math.round(y * 1000) / 1000 });
  }
  return l;
}

export const ORANGE = "#f97316";
export const VERT = "#16a34a";
export const BLEU = "#2563eb";

/** Un cadre entier qui contient toujours l'origine (les deux axes restent visibles). */
export function figure(o: {
  xmin: number;
  xmax: number;
  ymin: number;
  ymax: number;
  branches?: Pt[][];
  droites?: { a: number; b: number; couleur?: string; id?: string }[];
  points?: { x: number; y: number; label?: string }[];
}): CanvasFigure {
  return {
    kind: "fonctionGraphique",
    xmin: Math.min(Math.floor(o.xmin), -1),
    xmax: Math.max(Math.ceil(o.xmax), 1),
    ymin: Math.min(Math.floor(o.ymin), -1),
    ymax: Math.max(Math.ceil(o.ymax), 1),
    courbes: [
      ...(o.branches ?? []).map((points, i) => ({ id: `branche${i}`, type: "points" as const, points })),
      ...(o.droites ?? []).map((d, i) => ({ id: d.id ?? `droite${i}`, type: "affine" as const, a: d.a, b: d.b, couleur: d.couleur ?? ORANGE })),
    ],
    points: o.points,
  } as CanvasFigure;
}
