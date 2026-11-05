// Correcteurs des demi-plans : ils relisent l'inéquation écrite (ou la figure) et
// la testent sur une grille de points. Aucune valeur ne vient du gabarit.
import type { CorrecteursMaths } from "@/lib/tutor-v4/questionBank/4e/maths/correcteurs/types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import type { DemiPlanCanvasData } from "@/lib/tutor-v4/types_canvas";
import { compiler, nombres, seulChoix } from "../../../lycee-correcteurs-commun";

type Q = TutorGeneratedQuestionV4;
type Test = (x: number, y: number) => boolean;
const P = "2de_demi_plan_";

/** « 2x + y \leq 4 » → un test. */
function lireIneq(src: string): Test {
  const m = src.match(/^(.*?)(\\leq|\\geq|<|>)(.*)$/);
  if (!m) throw new Error(`inégalité illisible : ${src}`);
  const [g, d] = [compiler(m[1]), compiler(m[3])];
  const op = m[2];
  return (x, y) => {
    const v = g({ x, y }) - d({ x, y });
    if (Math.abs(v) < 1e-9) return op === "\\leq" || op === "\\geq";
    return op === "\\leq" || op === "<" ? v < 0 : v > 0;
  };
}
const dansDollars = (t: string) => t.split("$").filter((_, i) => i % 2 === 1);
/** La première inégalité (hors système) écrite dans le texte. */
function ineqTexte(t: string) {
  const s = dansDollars(t).find((x) => /\\leq|\\geq|<|>/.test(x) && !x.includes("begin"));
  if (!s) throw new Error(`pas d'inégalité : ${t}`);
  return { src: s, test: lireIneq(s) };
}
/** Un système écrit : toutes ses lignes doivent être vraies. */
function lignesSysteme(t: string) {
  const m = t.match(/\\begin\{cases\}(.*?)\\end\{cases\}/);
  if (!m) throw new Error(`pas de système : ${t}`);
  return m[1].split("\\\\").map((l) => lireIneq(l.trim()));
}
const systeme = (t: string): Test => {
  const l = lignesSysteme(t);
  return (x, y) => l.every((f) => f(x, y));
};
function couples(t: string): [number, number][] {
  return [...t.matchAll(/\((-?\d+)\\,;(-?\d+)\)/g)].map((m) => [Number(m[1]), Number(m[2])]);
}
const figure = (q: Q) => {
  if (q.canvas?.kind !== "demi_plan") throw new Error("pas de figure demi_plan");
  return q.canvas as DemiPlanCanvasData;
};
/** Ce que la FIGURE dit d'un point : du côté hachuré de chaque droite. */
const zoneFigure = (f: DemiPlanCanvasData): Test => (x, y) =>
  f.droites.every((d) => {
    if (!d.sens) return true;
    const v = d.a * x + d.b * y + d.c;
    if (Math.abs(v) < 1e-9) return d.sens === "<=" || d.sens === ">=";
    return d.sens === "<=" || d.sens === "<" ? v < 0 : v > 0;
  });
function memeEnsemble(a: Test, b: Test) {
  for (let x = -7; x <= 7; x += 0.5) for (let y = -7; y <= 7; y += 0.5) if (a(x, y) !== b(x, y)) return false;
  return true;
}
const egal = (q: Q, v: number): string[] => (String(v) === String(q.expected[0]).replace(",", ".") ? [] : [`attendu ${q.expected[0]}, recalculé ${v}`]);
function pointJuste(q: Q, test: Test) {
  const f = figure(q);
  return seulChoix(q, (c) => {
    const nom = c.match(/\$(.)\$/)![1];
    const p = (f.points ?? []).find((pt) => pt.nom === nom);
    if (!p) throw new Error(`point ${nom} absent de la figure`);
    return test(p.x, p.y);
  });
}
/** Le sommet maximum d'un programme : intersections de frontières qui vérifient tout. */
function maximum(q: Q) {
  const m = q.text.match(/\\begin\{cases\}(.*?)\\end\{cases\}/)!;
  const test = systeme(q.text);
  const bords = m[1].split("\\\\").map((l) => {
    const [g, d] = l.split(/\\leq|\\geq/).map((s) => compiler(s));
    const v = (x: number, y: number) => g({ x, y }) - d({ x, y });
    const [c0, a, b] = [v(0, 0), v(1, 0) - v(0, 0), v(0, 1) - v(0, 0)];
    return { a, b, c: c0 };
  });
  const obj = q.text.match(/P = ([^$]+)\$/)![1];
  const p = compiler(obj);
  let best = -Infinity;
  let en: [number, number] = [0, 0];
  let exaequo = 0;
  for (let i = 0; i < bords.length; i++)
    for (let j = i + 1; j < bords.length; j++) {
      const [u, w] = [bords[i], bords[j]];
      const det = u.a * w.b - u.b * w.a;
      if (Math.abs(det) < 1e-9) continue;
      const x = (u.b * w.c - w.b * u.c) / det;
      const y = (w.a * u.c - u.a * w.c) / det;
      if (!test(x, y)) continue;
      const v = p({ x, y });
      if (v > best + 1e-9) {
        best = v;
        en = [x, y];
        exaequo = 0;
      } else if (Math.abs(v - best) < 1e-9 && (Math.abs(x - en[0]) > 1e-9 || Math.abs(y - en[1]) > 1e-9)) exaequo++;
    }
  return { best, en, exaequo };
}

export const CORRECTEURS: CorrecteursMaths = {
  [`${P}couple_solution_tpl_1`]: (q) => {
    const { test } = ineqTexte(q.text);
    return seulChoix(q, (c) => {
      const [x, y] = couples(c)[0];
      return test(x, y);
    });
  },
  [`${P}couple_solution_tpl_2`]: (q) => {
    const E = q.text.match(/\$[A-Z] = ([^$]+)\$/)![1];
    const c = couples(q.text)[0] ?? [Number(q.text.match(/x = (-?\d+)/)![1]), Number(q.text.match(/y = (-?\d+)/)![1])];
    return egal(q, compiler(E)({ x: c[0], y: c[1] }));
  },
  [`${P}couple_solution_tpl_3`]: (q) => {
    const { test } = ineqTexte(q.text);
    const l = couples(q.text);
    if (l.length !== 4) return [`${l.length} couples lus`];
    return egal(q, l.filter(([x, y]) => test(x, y)).length);
  },
  [`${P}couple_solution_tpl_4`]: (q) => {
    const { test } = ineqTexte(q.text);
    const k = Number((q.text.match(/x = (-?\d+)/) ?? q.text.match(/\((-?\d+)\\,;y\)/))![1]);
    const c: number[] = [];
    for (let y = -200; y <= 200; y++) if (test(k, y)) c.push(y);
    const grand = /plus (grand|grande) /.test(q.text);
    // La borne opposée doit être infinie : sinon la question n'a pas de sens.
    if (grand ? c[0] !== -200 : c[c.length - 1] !== 200) return ["l'autre côté n'est pas libre"];
    return egal(q, grand ? Math.max(...c) : Math.min(...c));
  },
  [`${P}couple_solution_tpl_5`]: (q) => {
    const [p, r, B] = nombres(q.text);
    const s = /au moins/.test(q.text);
    const vrai: Test = (x, y) => (s ? p * x + r * y >= B : p * x + r * y <= B);
    // La grille passe par les points de la frontière sur les axes, là où les pièges se séparent.
    const pas = Math.max(1, Math.ceil(B / 30));
    const pts: [number, number][] = [[B / p, 0], [0, B / r], [B / p - 1, 0], [0, B / r - 1], [B / p + 1, 0], [0, B / r + 1]];
    for (let x = 0; x <= B; x += pas) for (let y = 0; y <= B; y += pas) pts.push([x, y]);
    return seulChoix(q, (c) => {
      const t = lireIneq(c.replace(/\$/g, ""));
      return pts.every(([x, y]) => t(x, y) === vrai(x, y));
    });
  },
  [`${P}couple_solution_tpl_6`]: (q) => {
    const [p, r, B, k] = nombres(q.text);
    const moins = /au moins/.test(q.text);
    let y = 0;
    if (moins) while (p * k + r * y < B) y++;
    else {
      while (p * k + r * (y + 1) <= B) y++;
      if (p * k > B) return ["contrainte impossible"];
    }
    return egal(q, y);
  },
  [`${P}representer_tpl_1`]: (q) => {
    const { src } = ineqTexte(q.text);
    const large = /\\leq|\\geq/.test(src);
    return seulChoix(q, (c) => (large ? c.startsWith("En trait plein : elle fait") : c.startsWith("En pointillés : elle ne fait")));
  },
  [`${P}representer_tpl_2`]: (q) => {
    const { test } = ineqTexte(q.text);
    const [x, y] = couples(q.text)[0];
    const f = figure(q);
    const pt = f.points?.find((p) => p.test);
    if (!pt || pt.x !== x || pt.y !== y) return ["le point de la figure n'est pas celui du texte"];
    const d = f.droites[0];
    if (Math.abs(d.a * x + d.b * y + d.c) < 1e-9) return ["point test sur la frontière"];
    return seulChoix(q, (c) => (test(x, y) ? /qui contient/.test(c) && !/ne contient/.test(c) : /ne contient pas/.test(c)));
  },
  [`${P}representer_tpl_3`]: (q) => {
    const z = zoneFigure(figure(q));
    return seulChoix(q, (c) => memeEnsemble(lireIneq(c.replace(/\$/g, "")), z));
  },
  [`${P}representer_tpl_4`]: (q) => pointJuste(q, ineqTexte(q.text).test),
  [`${P}representer_tpl_5`]: (q) => {
    const { test, src } = ineqTexte(q.text);
    const [g, d] = src.split(/\\leq|\\geq|<|>/).map((s) => compiler(s));
    const v = (x: number, y: number) => g({ x, y }) - d({ x, y });
    const a = v(1, 0) - v(0, 0);
    const b = v(0, 1) - v(0, 0);
    // On part d'un point de la droite et on s'en écarte.
    const [x0, y0] = b !== 0 ? [0, -v(0, 0) / b] : [-v(0, 0) / a, 0];
    const haut = test(x0, y0 + 1);
    const droite = test(x0 + 1, y0);
    return seulChoix(q, (c) => (b !== 0 ? (haut ? c === "Au-dessus de la droite" : c === "Au-dessous de la droite") : droite ? c === "À droite de la droite" : c === "À gauche de la droite"));
  },
  [`${P}representer_tpl_6`]: (q) => {
    const [p, r, B] = nombres(q.text);
    return seulChoix(q, (c) => couples(c).length === 2 && couples(c).every(([x, y]) => p * x + r * y === B) && couples(c).some(([, y]) => y === 0) && couples(c).some(([x]) => x === 0));
  },
  [`${P}systeme_tpl_1`]: (q) => {
    const t = systeme(q.text);
    return seulChoix(q, (c) => {
      const [x, y] = couples(c)[0];
      return t(x, y);
    });
  },
  [`${P}systeme_tpl_2`]: (q) => {
    const l = lignesSysteme(q.text);
    const [x, y] = couples(q.text)[0] ?? [Number(q.text.match(/x = (-?\d+)/)![1]), Number(q.text.match(/y = (-?\d+)/)![1])];
    return egal(q, l.filter((f) => f(x, y)).length);
  },
  [`${P}systeme_tpl_3`]: (q) => {
    const f = figure(q);
    const z = zoneFigure(f);
    return seulChoix(q, (c) => memeEnsemble(systeme(c), z));
  },
  [`${P}systeme_tpl_4`]: (q) => pointJuste(q, systeme(q.text)),
  [`${P}systeme_tpl_5`]: (q) => {
    const m = maximum(q);
    return egal(q, m.best);
  },
  [`${P}systeme_tpl_6`]: (q) => {
    const m = maximum(q);
    if (m.exaequo) return ["maximum atteint en deux sommets"];
    return seulChoix(q, (c) => {
      const [x, y] = couples(c)[0];
      return Math.abs(x - m.en[0]) < 1e-9 && Math.abs(y - m.en[1]) < 1e-9;
    });
  },
};
