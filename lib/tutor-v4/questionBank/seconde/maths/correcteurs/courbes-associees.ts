// Correcteurs des courbes associées : ils relisent la formule du texte et les points de la figure,
// appliquent eux-mêmes la transformation et n'utilisent aucune valeur du gabarit.
import type { CorrecteursMaths } from "@/lib/tutor-v4/questionBank/4e/maths/correcteurs/types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { accepte } from "../../../lycee-correcteurs-stats";
import { nombres, proche, seulChoix } from "../../../lycee-correcteurs-commun";

type Q = TutorGeneratedQuestionV4;
type Pt = { x: number; y: number };
const T = "2de_courbe_translation_tpl_";
const D = "2de_courbe_dilatation_abs_tpl_";

const n = (s?: string) => (s ? Number(s.replace(/ /g, "")) : 0);
/** « g(x) = f(x + 2) - 3 » : α = 2, β = -3, soit g(x) = f(x + α) + β. */
function lireT(t: string) {
  const m = t.match(/\$?[a-z]\([xt]\) = [a-z]\([xt]( [+-] \d+)?\)( [+-] \d+)?\$/);
  if (!m) throw new Error(`formule illisible : ${t}`);
  return { a: n(m[1]), b: n(m[2]) };
}
/** « g(x) = -2f(x) » ou « ½f(x) » ou « |f(x)| » : la fonction des ordonnées. */
function lireD(t: string): (y: number) => number {
  const m = t.match(/[a-z]\(x\) = ([^$]*?)\$/);
  if (!m) throw new Error(`formule illisible : ${t}`);
  const e = m[1];
  if (/^\\left\|[a-z]\(x\)\\right\|$/.test(e)) return Math.abs;
  if (/^\\dfrac\{1\}\{2\}[a-z]\(x\)$/.test(e)) return (y) => y / 2;
  if (/^-[a-z]\(x\)$/.test(e)) return (y) => -y;
  const k = e.match(/^(-?\d+)[a-z]\(x\)$/);
  if (k) return (y) => Number(k[1]) * y;
  throw new Error(`formule illisible : ${e}`);
}
const lirePoint = (t: string) => {
  const m = t.match(/[A-Z]\((-?\d+)\\,;(-?\d+)\)/);
  if (!m) throw new Error(`point illisible : ${t}`);
  return { x: Number(m[1]), y: Number(m[2]) };
};
const pointChoix = (c: string) => {
  const m = c.match(/\((-?\d+)\\,;(-?\d+)\)/);
  if (!m) throw new Error(`choix illisible : ${c}`);
  return { x: Number(m[1]), y: Number(m[2]) };
};
const lireImage = (t: string) => {
  const m = t.match(/\$[a-z]\((-?\d+)\) = (-?\d+)\$/);
  if (!m) throw new Error(`valeur illisible : ${t}`);
  return { x: Number(m[1]), y: Number(m[2]) };
};
const courbe = (q: Q, id: string): Pt[] => {
  const c = (q.canvas as any)?.courbes?.find((k: any) => k.id === id);
  if (!c) throw new Error(`courbe ${id} absente`);
  return c.points;
};
const egales = (a: Pt[], b: Pt[]) => a.length === b.length && a.every((p, i) => proche(p.x, b[i].x) && proche(p.y, b[i].y));
/** Le texte ne doit jamais nommer la bonne lettre. */
function sansLettre(q: Q): string[] {
  const l = String(q.expected[0]).match(/courbe ([A-D])$/)?.[1];
  return l && new RegExp(`courbe ${l}\\b`).test(q.text) ? [`le texte nomme la courbe ${l}`] : [];
}
/** Vérifie que la lettre attendue porte bien la courbe transformée, et elle seule. */
function bonneLettre(q: Q, attendue: Pt[]): string[] {
  const justes = ["A", "B", "C", "D"].filter((l) => egales(courbe(q, l), attendue));
  if (justes.length !== 1) return [`${justes.length} courbe(s) justes`];
  return q.expected[0] === `La courbe ${justes[0]}` ? sansLettre(q) : [`attendu ${q.expected[0]}, juste ${justes[0]}`];
}
const bornes = (q: Q) => {
  const pts = (q.canvas as any).courbes.flatMap((c: any) => c.points);
  const c = q.canvas as any;
  return pts.every((p: Pt) => p.x >= c.xmin && p.x <= c.xmax && p.y >= c.ymin && p.y <= c.ymax) ? [] : ["une courbe sort de la figure"];
};
const avecFigure = (q: Q, p: string[]) => [...p, ...bornes(q)];

/** Maximum et minimum relus, opération appliquée. */
function extremum(q: Q): string[] {
  const M = Number(q.text.match(/maximum (?:est )?\$(-?\d+)\$/)![1]);
  const m = Number(q.text.match(/minimum (?:est )?\$(-?\d+)\$/)![1]);
  const v = lireD(q.text);
  const k = q.text.match(/(maximum|minimum) de \$/)![1];
  const vs = [v(M), v(m)];
  return accepte(q, k === "maximum" ? Math.max(...vs) : Math.min(...vs));
}
/** Sommet de (x + α)² + β ou |x + α| + β. */
function lireSommet(s: string) {
  const m = s.match(/(?:\(x ([+-] \d+)\)\^2|\\left\|x ([+-] \d+)\\right\|) ([+-] \d+)\$/);
  if (!m) throw new Error(`expression illisible : ${s}`);
  return { a: n(m[1] ?? m[2]), b: n(m[3]) };
}

export const CORRECTEURS: CorrecteursMaths = {
  [`${T}1`]: (q) => {
    const { a, b } = lireT(q.text);
    const k = Math.abs(a || b);
    const sens = a ? (a > 0 ? "vers la gauche" : "vers la droite") : b > 0 ? "vers le haut" : "vers le bas";
    return seulChoix(q, (c) => c.includes(`$${k}$`) && c.endsWith(sens));
  },
  [`${T}2`]: (q) => {
    const { a, b } = lireT(q.text);
    const A = lirePoint(q.text);
    return seulChoix(q, (c) => {
      const p = pointChoix(c);
      return p.x === A.x - a && p.y === A.y + b;
    });
  },
  [`${T}3`]: (q) => {
    const { b } = lireT(q.text);
    return accepte(q, lireImage(q.text).y + b);
  },
  [`${T}4`]: (q) => {
    const { a, b } = lireT(q.text);
    return avecFigure(q, bonneLettre(q, courbe(q, "f").map((p) => ({ x: p.x - a, y: p.y + b }))));
  },
  [`${T}5`]: (q) => {
    const { a, b } = lireT(q.text);
    const A = lirePoint(q.text);
    return seulChoix(q, (c) => {
      const p = pointChoix(c);
      return p.x === A.x - a && p.y === A.y + b;
    });
  },
  [`${T}6`]: (q) => {
    const { a } = lireT(q.text);
    const i = lireImage(q.text);
    const x = q.text.match(/\$[a-z]\((-?\d+)\)\$/) ?? q.text.match(/image de \$(-?\d+)\$ par/);
    if (x) return Number(x[1]) + a === i.x ? accepte(q, i.y) : [`g(${x[1]}) ne se déduit pas de f(${i.x})`];
    return accepte(q, i.x - a);
  },
  [`${T}7`]: (q) => {
    const f = courbe(q, "f");
    const g = courbe(q, "A");
    const dx = g[0].x - f[0].x;
    const dy = g[0].y - f[0].y;
    return avecFigure(q, seulChoix(q, (c) => {
      const { a, b } = lireT(c);
      return a === -dx && b === dy;
    }));
  },
  [`${T}8`]: (q) => {
    const f = courbe(q, "f");
    const g = courbe(q, "A");
    const dx = g[0].x - f[0].x;
    const dy = g[0].y - f[0].y;
    return avecFigure(q, seulChoix(q, (c) => {
      const { a, b } = lireT(c.replace("$", "$z(x) = "));
      return a === -dx && b === dy;
    }));
  },
  [`${T}9`]: (q) => {
    const { a, b } = lireSommet(q.text);
    return seulChoix(q, (c) => {
      const p = pointChoix(c);
      return p.x === -a && p.y === b;
    });
  },
  [`${T}10`]: (q) => {
    const m = q.text.match(/\$(\d+)\$ unités vers la (droite|gauche) et de \$(\d+)\$ unités vers le (haut|bas)/)!;
    const a = (m[2] === "droite" ? -1 : 1) * Number(m[1]);
    const b = (m[4] === "haut" ? 1 : -1) * Number(m[3]);
    const estCarre = /f\(x\) = x\^2/.test(q.text);
    return seulChoix(q, (c) => {
      const s = lireSommet(c);
      return s.a === a && s.b === b && c.includes("^2") === estCarre;
    });
  },
  [`${T}11`]: (q) => {
    const t = q.text;
    const tard = t.match(/mais (\d+) .*? plus tard/);
    const tot = t.match(/mais (\d+) .*? plus tôt/);
    const plus = t.match(/avec (\d+) .*? de plus/);
    const moins = t.match(/avec (\d+) .*? de moins/);
    const a = tard ? -Number(tard[1]) : tot ? Number(tot[1]) : 0;
    const b = plus ? Number(plus[1]) : moins ? -Number(moins[1]) : 0;
    if (!a && !b) throw new Error(`situation illisible : ${t}`);
    return seulChoix(q, (c) => {
      const f = lireT(c);
      return f.a === a && f.b === b;
    });
  },

  [`${D}1`]: (q) => {
    const e = q.text.match(/= ([^$]*)\$/)![1];
    const k = e.match(/^(\d+)[a-z]\(x\)$/)?.[1] ?? (e.startsWith("\\dfrac{1}{2}") ? "\\dfrac{1}{2}" : null);
    return seulChoix(q, (c) => {
      if (k) return c.endsWith(`ordonnées sont multipliées par $${k}$`);
      if (e.startsWith("-")) return c.endsWith("par rapport à l'axe des abscisses");
      return c.endsWith("passe au-dessus par symétrie");
    });
  },
  [`${D}2`]: (q) => {
    const v = lireD(q.text);
    const A = lirePoint(q.text);
    return seulChoix(q, (c) => {
      const p = pointChoix(c);
      return p.x === A.x && proche(p.y, v(A.y));
    });
  },
  [`${D}3`]: (q) => accepte(q, lireD(q.text)(lireImage(q.text).y)),
  [`${D}4`]: (q) => {
    const v = lireD(q.text);
    return avecFigure(q, bonneLettre(q, courbe(q, "f").map((p) => ({ x: p.x, y: v(p.y) }))));
  },
  [`${D}5`]: (q) => {
    const f = courbe(q, "f");
    const g = courbe(q, "A");
    return avecFigure(q, seulChoix(q, (c) => {
      const v = lireD(c);
      return f.every((p, i) => proche(v(p.y), g[i].y));
    }));
  },
  [`${D}6`]: extremum,
  [`${D}7`]: (q) => {
    const m = q.text.match(/\\left\|(-?\d+)x ([+-] \d+)\\right\|/)!;
    const a = Number(m[1]);
    const b = n(m[2]);
    const x = q.text.match(/\$[a-z]\((-?\d+)\)\$/) ?? q.text.match(/image de \$(-?\d+)\$ par/);
    return accepte(q, x ? Math.abs(a * Number(x[1]) + b) : -b / a);
  },
  [`${D}8`]: extremum,
  [`${D}9`]: (q) => {
    const t = q.text;
    const i = lireImage(t);
    const ask = Number(t.match(/\$g\((-?\d+)\)\$/)![1]);
    if (ask !== i.x) return [`g(${ask}) ne se déduit pas de f(${i.x})`];
    const k = t.match(/par (\d+)\b/);
    if (/valeur absolue/.test(t)) return accepte(q, Math.abs(i.y));
    if (/opposé/.test(t)) return accepte(q, -i.y);
    if (k) return accepte(q, Number(k[1]) * i.y);
    throw new Error(`situation illisible : ${t}`);
  },
  [`${D}10`]: (q) => {
    const f = courbe(q, "f");
    const k = nombres(q.text.split("|").pop() ?? "").find((v) => v % 1 !== 0);
    if (k === undefined) throw new Error(`niveau illisible : ${q.text}`);
    let c = 0;
    for (let i = 1; i < f.length; i++) {
      for (const niveau of [k, -k]) {
        const s = (f[i - 1].y - niveau) * (f[i].y - niveau);
        if (s === 0) return ["l'horizontale passe par un sommet"];
        if (s < 0) c++;
      }
    }
    return avecFigure(q, accepte(q, c));
  },
};
