// Correcteurs du barycentre : ils relisent les poids, les points, la figure, recalculent G dans un repère
// d'essai ou avec les coordonnées écrites, et n'utilisent aucune valeur du gabarit.
import type { CorrecteursMaths } from "@/lib/tutor-v4/questionBank/4e/maths/correcteurs/types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { proche, seulChoix } from "../../../lycee-correcteurs-commun";
import { bary, blocs, droite, expr, nulVec, poids, positions, valeur, vecteur, type Pt } from "./lecture-trigo";

type Q = TutorGeneratedQuestionV4;
const D = "1s_barycentre_deux_points_tpl_";
const C = "1s_barycentre_coordonnees_tpl_";
const exact = (q: Q, v: number) => (proche(Number(String(q.expected[0]).replace(",", ".")), v, 1e-6) ? [] : [`attendu ${q.expected[0]}, recalculé ${v}`]);

/** Une égalité de vecteurs « gauche = droite » est vraie dans ces positions. */
const egaliteVraie = (c: string, pos: Record<string, Pt>) => {
  const [g, d] = c.replace(/\$/g, "").split("=");
  const [a, b] = [vecteur(g, pos), vecteur(d, pos)];
  return nulVec({ x: a.x - b.x, y: a.y - b.y });
};
/** Les poids du texte, dans un repère d'essai, avec G recalculé. */
function essai(q: Q) {
  const l = poids(q.text);
  const pos = positions(l.map((c) => c.nom));
  pos.G = bary(pos, l);
  return pos;
}
/** Le rapport k de « \overrightarrow{AG} = k\overrightarrow{AB} », relu dans le bloc. */
function rapport(b: string) {
  const m = b.match(/\\overrightarrow\{([A-Z])G\} = (-?(?:\\dfrac\{\d+\}\{\d+\}|\d*))\\overrightarrow\{[A-Z]([A-Z])\}/);
  if (!m) throw new Error(`égalité illisible : ${b}`);
  const s = m[2] === "" ? "1" : m[2] === "-" ? "-1" : m[2];
  return { A: m[1], B: m[3], k: valeur(s) };
}
const memeG = (a: Pt, b: Pt) => proche(a.x, b.x, 1e-7) && proche(a.y, b.y, 1e-7);
/** « $G(2{,}5\,;1)$ ». */
const lireG = (c: string): Pt => {
  const m = c.match(/G\((.+?)\\,;(.+?)\)/);
  if (!m) throw new Error(`point illisible : ${c}`);
  return { x: valeur(m[1]), y: valeur(m[2]) };
};
/** Les « $A(1\,;3)$ » écrits dans un texte. */
function points(t: string): Record<string, Pt> {
  const pos: Record<string, Pt> = {};
  for (const m of t.matchAll(/\$([A-Z])\((-?\d+)\\,;(-?\d+)\)\$/g)) pos[m[1]] = { x: Number(m[2]), y: Number(m[3]) };
  return pos;
}
/** Les poids écrits, ou des poids égaux s'il n'y en a pas (isobarycentre). */
function baryDuTexte(q: Q) {
  const pos = points(q.text);
  const p = poids(q.text);
  const l = p.length ? p : Object.keys(pos).map((nom) => ({ nom, w: 1 }));
  return { pos, G: bary(pos, l) };
}
const coordonneesJustes = (q: Q) => {
  const { G } = baryDuTexte(q);
  return seulChoix(q, (c) => memeG(lireG(c), G));
};
const coordonneeDemandee = (q: Q, G: Pt) => exact(q, /abscisse/.test(q.text) ? G.x : G.y);

/** Réduction : la somme écrite et chaque proposition, comparées pour deux positions de M. */
function reduction(q: Q) {
  const b = blocs(q.text)[0];
  const l = [...b.matchAll(/([+-]?)\s*(\d*)\\overrightarrow\{M([A-Z])\}/g)].map((m) => ({ nom: m[3], w: (m[1] === "-" ? -1 : 1) * (m[2] ? Number(m[2]) : 1) }));
  const pos = positions(["A", ...l.map((c) => c.nom)]);
  const S = l.reduce((s, c) => s + c.w, 0);
  if (S !== 0) pos.G = bary(pos, l);
  return seulChoix(q, (c) =>
    [{ x: 3.7, y: -1.3 }, { x: -2.1, y: 5.9 }].every((M) => {
      const P = { ...pos, M };
      const [u, v] = [vecteur(b, P), vecteur(c, P)];
      return nulVec({ x: u.x - v.x, y: u.y - v.y });
    }),
  );
}

export const CORRECTEURS: CorrecteursMaths = {
  [`${D}1`]: (q) => {
    const pos = essai(q);
    return seulChoix(q, (c) => egaliteVraie(c, pos));
  },
  [`${D}2`]: (q) => seulChoix(q, (c) => poids(c).reduce((s, x) => s + x.w, 0) === 0),
  [`${D}3`]: (q) => {
    const pos = essai(q);
    return seulChoix(q, (c) => egaliteVraie(c, pos));
  },
  [`${D}4`]: (q) => {
    const f = q.canvas as any;
    const pos = Object.fromEntries(f.points.map((p: any) => [p.id, p])) as Record<string, Pt>;
    const G = bary(pos, poids(q.text));
    return seulChoix(q, (c) => {
      const m = c.match(/\$([A-Z])\$/);
      if (!m || !pos[m[1]]) throw new Error(`point inconnu : ${c}`);
      return memeG(pos[m[1]], G);
    });
  },
  [`${D}5`]: (q) => {
    const l = poids(q.text);
    const L = q.text.match(/\$([A-Z])([A-Z]) = (\d+)\$/);
    const X = q.text.match(/\$([A-Z])G\$/);
    if (!L || !X) throw new Error(`mesures illisibles : ${q.text}`);
    const pos: Record<string, Pt> = { [L[1]]: { x: 0, y: 0 }, [L[2]]: { x: Number(L[3]), y: 0 } };
    return exact(q, Math.abs(bary(pos, l).x - pos[X[1]].x));
  },
  [`${D}6`]: (q) => {
    const { k } = rapport(blocs(q.text)[0]);
    return seulChoix(q, (c) => {
      const [a, b] = poids(c);
      return a.w + b.w !== 0 && proche(b.w / (a.w + b.w), k);
    });
  },
  [`${D}7`]: (q) => {
    const m = [...q.text.matchAll(/\$(\d+)\$\u00a0kg en \$([A-Z])\$/g)];
    const L = q.text.match(/\$([A-Z])([A-Z]) = (\d+)\$/);
    const X = q.text.match(/(?:distance (?:de|à)|séparent de) \$([A-Z])\$|sa distance à \$([A-Z])\$/);
    if (m.length !== 2 || !L || !X) throw new Error(`mesures illisibles : ${q.text}`);
    const pos: Record<string, Pt> = { [L[1]]: { x: 0, y: 0 }, [L[2]]: { x: Number(L[3]), y: 0 } };
    const G = bary(pos, m.map((x) => ({ nom: x[2], w: Number(x[1]) })));
    return exact(q, Math.abs(G.x - pos[X[1] ?? X[2]].x));
  },
  [`${D}8`]: reduction,
  [`${D}9`]: (q) => {
    const { B, k } = rapport(blocs(q.text)[0]);
    const b = poids(q.text).find((c) => c.nom === B);
    if (!b) throw new Error(`poids de ${B} illisible : ${q.text}`);
    return exact(q, b.w / k - b.w);
  },

  [`${C}1`]: coordonneesJustes,
  [`${C}2`]: coordonneesJustes,
  [`${C}3`]: (q) => {
    const l = poids(q.text);
    const S = l.reduce((s, c) => s + c.w, 0);
    const essais: Record<string, number> = {};
    l.forEach((c, i) => (essais[c.nom] = 10 ** i));
    const v = l.reduce((s, c) => s + c.w * essais[c.nom], 0) / S;
    return seulChoix(q, (c) => {
      const f = droite(c.replace(/\$/g, "")).replace(/[xy]_([A-Z])/g, (_, X) => `(${essais[X]})`);
      return proche(expr(f)({}), v, 1e-9);
    });
  },
  [`${C}4`]: coordonneesJustes,
  [`${C}5`]: (q) => coordonneeDemandee(q, baryDuTexte(q).G),
  [`${C}6`]: (q) => {
    const l = poids(q.text);
    const trio = l.slice(0, 3);
    const pos = positions(trio.map((c) => c.nom));
    const G = bary(pos, trio);
    pos.H = bary(pos, l.slice(3, 5));
    return seulChoix(q, (c) => {
      const p = poids(c);
      return p[0].w + p[1].w !== 0 && memeG(bary(pos, p), G);
    });
  },
  [`${C}7`]: reduction,
  [`${C}8`]: (q) => {
    const R = blocs(q.text).map((b) => {
      const m = b.match(/(\d+) \\leqslant x \\leqslant (\d+) \\text\{ et \} (\d+) \\leqslant y \\leqslant (\d+)/);
      if (!m) throw new Error(`rectangle illisible : ${b}`);
      return m.slice(1).map(Number);
    });
    const aire = R.map((r) => (r[1] - r[0]) * (r[3] - r[2]));
    const S = aire[0] + aire[1];
    const G = { x: R.reduce((s, r, i) => s + (aire[i] * (r[0] + r[1])) / 2, 0) / S, y: R.reduce((s, r, i) => s + (aire[i] * (r[2] + r[3])) / 2, 0) / S };
    return seulChoix(q, (c) => memeG(lireG(c), G));
  },
  [`${C}9`]: (q) => {
    const m = [...q.text.matchAll(/\$(\d+)\$\u00a0kg en \$([A-Z])\((-?\d+)\\,;(-?\d+)\)\$/g)];
    if (m.length < 3) throw new Error(`masses illisibles : ${q.text}`);
    const pos: Record<string, Pt> = {};
    for (const x of m) pos[x[2]] = { x: Number(x[3]), y: Number(x[4]) };
    return coordonneeDemandee(q, bary(pos, m.map((x) => ({ nom: x[2], w: Number(x[1]) }))));
  },
};
