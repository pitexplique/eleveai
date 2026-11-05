// Correcteurs des systèmes (déterminant, Cramer) : ils relisent les équations écrites (quelle que
// soit leur forme), en tirent les coefficients par évaluation et recalculent tout.
import type { CorrecteursMaths } from "@/lib/tutor-v4/questionBank/4e/maths/correcteurs/types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { accepte } from "../../../lycee-correcteurs-stats";
import { compiler, nombres, proche, seulChoix } from "../../../lycee-correcteurs-commun";

type Q = TutorGeneratedQuestionV4;
type Co = [number, number, number];
const D = "2de_systeme_determinant_tpl_";
const K = "2de_systeme_cramer_tpl_";

const segments = (t: string) => t.split("$").filter((_, i) => i % 2 === 1);
function equations(t: string): string[] {
  const c = t.match(/\\begin\{cases\}(.*?)\\end\{cases\}/);
  if (c) return c[1].split("\\\\").map((s) => s.trim());
  const e = segments(t).filter((s) => s.includes("="));
  if (e.length < 2) throw new Error(`équations illisibles : ${t}`);
  return e.slice(0, 2);
}
/** Coefficients [a, b, c] de ax + by = c, pour une valeur de m. */
function lireSysteme(t: string, m = 0): { L1: Co; L2: Co; X: string; Y: string } {
  const eqs = equations(t);
  const lettres = [...new Set(eqs.join(" ").match(/[a-z]/g) ?? [])].filter((l) => l !== "m").sort();
  if (lettres.length !== 2) throw new Error(`inconnues illisibles : ${eqs.join(" ; ")}`);
  const [X, Y] = lettres;
  const lire = (s: string): Co => {
    const [g, d] = s.split("=");
    const fg = compiler(g);
    const fd = compiler(d);
    const G = (x: number, y: number) => fg({ [X]: x, [Y]: y, m }) - fd({ [X]: x, [Y]: y, m });
    const c0 = G(0, 0);
    return [G(1, 0) - c0, G(0, 1) - c0, -c0];
  };
  return { L1: lire(eqs[0]), L2: lire(eqs[1]), X, Y };
}
const det = (A: Co, B: Co) => A[0] * B[1] - A[1] * B[0];
const dx = (A: Co, B: Co) => A[2] * B[1] - A[1] * B[2];
const dy = (A: Co, B: Co) => A[0] * B[2] - A[2] * B[0];
type Genre = "une" | "aucune" | "infinie";
function genre(A: Co, B: Co): Genre {
  if (Math.abs(det(A, B)) > 1e-9) return "une";
  return Math.abs(A[0] * B[2] - A[2] * B[0]) < 1e-9 && Math.abs(A[1] * B[2] - A[2] * B[1]) < 1e-9 ? "infinie" : "aucune";
}
/** Dernière inconnue citée seule : c'est la question. */
const demandee = (t: string) => {
  const l = segments(t).filter((s) => /^[a-z]$/.test(s));
  if (!l.length) throw new Error(`inconnue demandée illisible : ${t}`);
  return l[l.length - 1];
};
const lireVm = (s: string) => {
  const m = s.match(/vmatrix\} (-?\d+) & (-?\d+) \\\\ (-?\d+) & (-?\d+) \\end/);
  if (!m) throw new Error(`déterminant illisible : ${s}`);
  return m.slice(1, 5).map(Number);
};
/** La racine de det(m) = 0 : le déterminant est affine en m. */
function racineM(t: string) {
  const d0 = (() => {
    const s = lireSysteme(t, 0);
    return det(s.L1, s.L2);
  })();
  const s1 = lireSysteme(t, 1);
  const pente = det(s1.L1, s1.L2) - d0;
  if (!pente) throw new Error(`m absent du déterminant : ${t}`);
  return -d0 / pente;
}
/** Les six nombres du récit, dans l'ordre des deux mesures. */
const recit = (t: string): [Co, Co] => {
  const n = nombres(t);
  return [[n[0], n[1], n[2]], [n[3], n[4], n[5]]];
};
const memes = (a: number[], b: number[]) => a.length === b.length && a.every((v, i) => proche(v, b[i]));

const NOM_SOL: Record<Genre, string> = { une: "Une seule solution", aucune: "Aucune solution", infinie: "Une infinité de solutions" };
const NOM_POS: Record<Genre, string> = { une: "Sécantes", aucune: "Strictement parallèles", infinie: "Confondues" };
const NOM_CTX: Record<Genre, string> = { une: "Oui : une seule réponse possible", aucune: "Non : ces mesures se contredisent", infinie: "Non : une infinité de réponses possibles" };
const texteExact = (q: Q, j: string) => (q.expected[0] === j ? [] : [`attendu ${q.expected[0]}, recalculé ${j}`]);

/** La valeur de l'inconnue demandée, par Cramer sur le système écrit. */
function solution(q: Q) {
  const { L1, L2, X } = lireSysteme(q.text);
  const d = det(L1, L2);
  if (!d) throw new Error(`déterminant nul : ${q.text}`);
  return (demandee(q.text) === X ? dx(L1, L2) : dy(L1, L2)) / d;
}

export const CORRECTEURS: CorrecteursMaths = {
  [`${D}1`]: (q) => {
    const { L1, L2 } = lireSysteme(q.text);
    return accepte(q, det(L1, L2));
  },
  [`${D}2`]: (q) => {
    const [a, b, c, d] = lireVm(q.text);
    return accepte(q, a * d - b * c);
  },
  [`${D}3`]: (q) => {
    const { L1, L2 } = lireSysteme(q.text);
    const v = det(L1, L2);
    return seulChoix(q, (c) => proche(compiler(c.replace(/\$/g, ""))({}), v));
  },
  [`${D}4`]: (q) => {
    const { L1, L2 } = lireSysteme(q.text);
    return texteExact(q, NOM_SOL[genre(L1, L2)]);
  },
  [`${D}5`]: (q) => {
    const { L1, L2 } = lireSysteme(q.text);
    return texteExact(q, NOM_POS[genre(L1, L2)]);
  },
  [`${D}6`]: (q) => accepte(q, racineM(q.text)),
  [`${D}7`]: (q) => {
    const { L1, L2 } = lireSysteme(q.text);
    return texteExact(q, NOM_SOL[genre(L1, L2)]);
  },
  [`${D}8`]: (q) => {
    const [A, B] = recit(q.text);
    return texteExact(q, NOM_CTX[genre(A, B)]);
  },
  [`${D}9`]: (q) => {
    const m = racineM(q.text);
    const { L1, L2 } = lireSysteme(q.text, m);
    return genre(L1, L2) === "aucune" ? accepte(q, m) : [`droites confondues pour m = ${m}`];
  },

  [`${K}1`]: (q) => {
    const { L1, L2, X } = lireSysteme(q.text);
    const L = q.text.match(/\\Delta_\{([a-z])\}/)![1];
    const juste = L === X ? [L1[2], L1[1], L2[2], L2[1]] : [L1[0], L1[2], L2[0], L2[2]];
    return seulChoix(q, (c) => memes(lireVm(c), juste));
  },
  [`${K}2`]: (q) => {
    const a = demandee(q.text);
    const d = Number(q.text.match(/\\Delta = (-?\d+)/)![1]);
    const n = Number(q.text.match(new RegExp(`\\\\Delta_\\{${a}\\} = (-?\\d+)`))![1]);
    return accepte(q, n / d);
  },
  [`${K}3`]: (q) => {
    const { L1, L2, X } = lireSysteme(q.text);
    const L = q.text.match(/\\Delta_\{([a-z])\}/)![1];
    return accepte(q, L === X ? dx(L1, L2) : dy(L1, L2));
  },
  [`${K}4`]: (q) => accepte(q, solution(q)),
  [`${K}5`]: (q) => {
    const { L1, L2 } = lireSysteme(q.text);
    const d = det(L1, L2);
    return seulChoix(q, (c) => {
      const m = c.match(/\((-?\d+)\\,;(-?\d+)\)/)!;
      return proche(Number(m[1]), dx(L1, L2) / d) && proche(Number(m[2]), dy(L1, L2) / d);
    });
  },
  [`${K}6`]: (q) => {
    const { L1, L2, X } = lireSysteme(q.text);
    const a = demandee(q.text);
    const n = a === X ? dx(L1, L2) : dy(L1, L2);
    const d = det(L1, L2);
    return seulChoix(q, (c) => {
      const m = c.match(/\\dfrac\{(-?\d+)\}\{(-?\d+)\}/)!;
      return Number(m[1]) === n && Number(m[2]) === d;
    });
  },
  [`${K}7`]: (q) => {
    const [A, B] = recit(q.text);
    const d = det(A, B);
    return accepte(q, (demandee(q.text) === "x" ? dx(A, B) : dy(A, B)) / d);
  },
  [`${K}8`]: (q) => {
    const [A, B] = recit(q.text);
    return seulChoix(q, (c) => {
      const s = lireSysteme(c);
      return memes(s.L1, A) && memes(s.L2, B);
    });
  },
  [`${K}9`]: (q) => accepte(q, solution(q)),
};
