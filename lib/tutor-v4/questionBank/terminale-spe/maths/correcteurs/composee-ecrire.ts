// Correcteurs de la composée : ils relisent f et g dans l'énoncé (ou le tableau), composent et comparent.
import type { CorrecteursMaths } from "@/lib/tutor-v4/questionBank/4e/maths/correcteurs/types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { compiler, proche, seulChoix } from "../../../lycee-correcteurs-commun";

type Q = TutorGeneratedQuestionV4;
type F = (x: number) => number;
const P = "tle_composee_ecrire_tpl_";
const nu = (s: string) => Number(String(s).replace(",", "."));
const ESSAIS = [0.7, 1.3, 2.9];

/** Les fonctions écrites : « f(x) = … », avec leur nom. */
function fonctions(t: string): Record<string, F> {
  const res: Record<string, F> = {};
  for (const m of t.matchAll(/\$([a-z])\(x\) = ([^$]+)\$/g)) {
    const c = compiler(m[2]);
    res[m[1]] = (x) => c({ x });
  }
  return res;
}
/** « (g ∘ f)(a) » : le dernier qui apparaît dans l'énoncé, ou « g(f(a)) ». */
function appel(t: string) {
  const l = [...t.matchAll(/\(([a-z]) \\circ ([a-z])\)\((-?\d+)\)/g)];
  if (l.length) {
    const m = l[l.length - 1];
    return { ext: m[1], int: m[2], a: Number(m[3]) };
  }
  const m = t.match(/\$([a-z])\(([a-z])\((-?\d+)\)\)\$/);
  if (m) return { ext: m[1], int: m[2], a: Number(m[3]) };
  const i = t.match(/l'image de \$(-?\d+)\$ par \$([a-z]) \\circ ([a-z])\$/);
  if (i) return { ext: i[2], int: i[3], a: Number(i[1]) };
  throw new Error(`composée illisible : ${t}`);
}
/** Vraie composition, en tolérant l'ordre d'écriture du texte. */
function image(q: Q): string[] {
  const fn = fonctions(q.text);
  const { ext, int, a } = appel(q.text);
  const v = fn[ext](fn[int](a));
  return proche(nu(q.expected[0]), v, 1e-7) ? [] : [`attendu ${q.expected[0]}, recalculé ${v}`];
}
function lectureTableau(q: Q): string[] {
  const c = q.canvas as any;
  if (c?.kind !== "tableau_donnees") return ["pas de tableau"];
  const xs = c.headers.map(Number);
  const ligne = (n: string) => c.rows.find((r: any) => r.label === `${n}(x)`).values as number[];
  const { ext, int, a } = appel(q.text);
  const y = ligne(int)[xs.indexOf(a)];
  if (y === undefined) return ["abscisse absente du tableau"];
  const i = xs.indexOf(y);
  if (i < 0) return [`${y} n'est pas sur la ligne de x`];
  const v = ligne(ext)[i];
  return Number(q.expected[0]) === v ? [] : [`attendu ${q.expected[0]}, recalculé ${v}`];
}
function lecture(q: Q): string[] {
  const m = q.text.match(/\(([a-z]) \\circ ([a-z])\)\(([a-z])\)/);
  if (!m) throw new Error(`notation illisible : ${q.text}`);
  return seulChoix(q, (c) => c === `$${m[1]}(${m[2]}(${m[3]}))$`);
}
/** L'écriture de (ext ∘ int)(x) : chaque proposition est évaluée en plusieurs points. */
function ecriture(q: Q): string[] {
  const fn = fonctions(q.text);
  const m = q.text.match(/\(([a-z]) \\circ ([a-z])\)\(x\)/) ?? q.text.match(/\$([a-z])\(([a-z])\(x\)\)\$/) ?? q.text.match(/\$([a-z]) \\circ ([a-z])\$/);
  if (!m) throw new Error(`composée illisible : ${q.text}`);
  const juste: F = (x) => fn[m[1]](fn[m[2]](x));
  return seulChoix(q, (c) => {
    const f = compiler(c.replace(/\$/g, ""));
    return ESSAIS.every((x) => proche(f({ x }), juste(x), 1e-7));
  });
}
function decomposition(q: Q): string[] {
  const h = q.text.match(/h\(x\) = ([^$]+)\$/);
  const o = q.text.match(/h = ([a-z]) \\circ ([a-z])\$/);
  if (!h || !o) throw new Error(`décomposition illisible : ${q.text}`);
  const H = compiler(h[1]);
  return seulChoix(q, (c) => {
    const fn = fonctions(c);
    const [ext, int] = [fn[o[1]], fn[o[2]]];
    return ESSAIS.every((x) => {
      const e = ext(int(x));
      const v = H({ x });
      return Number.isFinite(v) ? proche(e, v, 1e-7) : !Number.isFinite(e);
    });
  });
}
function ecart(q: Q): string[] {
  const fn = fonctions(q.text);
  const l = [...q.text.matchAll(/\(([a-z]) \\circ ([a-z])\)\((-?\d+)\) - \(([a-z]) \\circ ([a-z])\)\((-?\d+)\)/g)];
  if (!l.length) throw new Error(`écart illisible : ${q.text}`);
  const m = l[0];
  const v = fn[m[1]](fn[m[2]](Number(m[3]))) - fn[m[4]](fn[m[5]](Number(m[6])));
  return proche(nu(q.expected[0]), v, 1e-7) ? [] : [`attendu ${q.expected[0]}, recalculé ${v}`];
}
function domaine(q: Q): string[] {
  const m = q.text.match(/\)\(x\) = ((?:\\sqrt\{|\\ln\()[^$]+)\$/);
  if (!m) throw new Error(`expression illisible : ${q.text}`);
  const h = compiler(m[1]);
  const en = (x: number) => h({ x });
  // Zone définie : on balaie ; la borne se lit là où ça bascule.
  let a: number | null = null;
  for (let x = -20; x <= 20; x++) if (Number.isFinite(en(x)) && !Number.isNaN(en(x)) && a === null) a = x;
  if (a === null) return ["jamais définie"];
  const borne = Number.isFinite(en(a - 1e-9)) && !Number.isNaN(en(a - 1e-9)) ? a - 1 : a;
  const ferme = Number.isFinite(en(borne)) && !Number.isNaN(en(borne));
  const j = `$${ferme ? "[" : "]"}${borne}\\,;+\\infty[$`;
  return q.expected[0] === j ? [] : [`attendu ${q.expected[0]}, recalculé ${j}`];
}

const PAR_GABARIT: CorrecteursMaths = {
  [`${P}1`]: image,
  [`${P}2`]: lectureTableau,
  [`${P}3`]: lecture,
  [`${P}4`]: ecriture,
  [`${P}5`]: ecriture,
  [`${P}6`]: decomposition,
  [`${P}7`]: image,
  [`${P}8`]: ecart,
  [`${P}9`]: image,
  [`${P}10`]: domaine,
  [`${P}11`]: image,
};

/** La banque écrit `\circ\nobreak` pour que la formule ne se coupe pas : on relit sans. */
export const CORRECTEURS: CorrecteursMaths = Object.fromEntries(
  Object.entries(PAR_GABARIT).map(([id, c]) => [id, (q: Q) => c({ ...q, text: q.text.replace(/\\nobreak /g, " ") })]),
);
