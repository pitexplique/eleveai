// Correcteurs des polynômes (racine, division, Horner) : ils relisent le polynôme écrit, l'évaluent,
// vérifient l'égalité de division en plusieurs points, et refont le tableau de Horner depuis la figure.
import type { CorrecteursMaths } from "@/lib/tutor-v4/questionBank/4e/maths/correcteurs/types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { accepte } from "../../../lycee-correcteurs-stats";
import { compiler, proche, seulChoix } from "../../../lycee-correcteurs-commun";

type Q = TutorGeneratedQuestionV4;
const R = "2de_poly_racine_factoriser_tpl_";
const V = "2de_poly_division_tpl_";
const H = "2de_poly_horner_tpl_";

const segments = (t: string) => t.split("$").filter((_, i) => i % 2 === 1);
/** Le polynôme de l'énoncé : « P(x) = … », en gardant m comme paramètre éventuel. */
function lireP(t: string) {
  const m = t.match(/\$[A-Za-z]\(([a-z])\) = ([^$]+)\$/);
  if (!m) throw new Error(`polynôme illisible : ${t}`);
  const c = compiler(m[2]);
  const v = m[1];
  return { f: (x: number, mm = 0) => c({ [v]: x, m: mm }), source: m[2], v };
}
/** P(a) = 0 écrit dans le texte. */
const lireRacine = (t: string) => {
  const m = t.match(/\$[A-Za-z]\((-?\d+)\) = 0\$/);
  if (!m) throw new Error(`racine illisible : ${t}`);
  return Number(m[1]);
};
/** P(a) demandé dans le texte. */
const lireAppel = (t: string) => {
  const m = t.match(/[A-Z]\((-?\d+)\)/);
  if (!m) throw new Error(`appel illisible : ${t}`);
  return Number(m[1]);
};
/** Le diviseur : « x - 2 » ou « 2x + 1 » seul entre dollars. */
function lireD(t: string) {
  const s = segments(t).find((x) => /^\d*x [+-] \d+$/.test(x));
  if (!s) throw new Error(`diviseur illisible : ${t}`);
  const c = compiler(s);
  const d = (x: number) => c({ x });
  return { d, racine: -d(0) / (d(1) - d(0)), source: s };
}
const lireExp = (c: string) => {
  const f = compiler(c);
  return (x: number) => f({ x });
};
const nu = (c: string) => c.replace(/\$/g, "");
const ESSAIS = [-3.5, -1.25, 0.5, 1.75, 2.5, 4.25];
/** P - D × Q est constant : Q est le quotient, cette constante le reste. */
function resteDe(P: (x: number) => number, D: (x: number) => number, Qf: (x: number) => number) {
  const rs = ESSAIS.map((x) => P(x) - D(x) * Qf(x));
  return rs.every((r) => proche(r, rs[0], 1e-7)) ? rs[0] : null;
}
const racineM = (f: (x: number, m: number) => number, x: number, cible = 0) => {
  const f0 = f(x, 0);
  const pente = f(x, 1) - f0;
  if (!pente) throw new Error("m sans effet");
  return (cible - f0) / pente;
};
/** Coefficients par ordre décroissant, retrouvés par évaluation (degré au plus 4). */
function coefsDe(f: (x: number) => number, d: number) {
  const n = d + 1;
  const M = Array.from({ length: n }, (_, i) => {
    const l = Array.from({ length: n }, (_, j) => i ** (d - j));
    l.push(f(i));
    return l;
  });
  for (let i = 0; i < n; i++) {
    let p = i;
    for (let k = i + 1; k < n; k++) if (Math.abs(M[k][i]) > Math.abs(M[p][i])) p = k;
    [M[i], M[p]] = [M[p], M[i]];
    for (let k = 0; k < n; k++) {
      if (k === i) continue;
      const q = M[k][i] / M[i][i];
      for (let j = i; j <= n; j++) M[k][j] -= q * M[i][j];
    }
  }
  return M.map((l, i) => Math.round((l[n] / l[i]) * 1e6) / 1e6);
}
const degre = (s: string) => {
  const e = [...s.matchAll(/\^(\d)/g)].map((m) => Number(m[1]));
  return e.length ? Math.max(...e) : /x/.test(s) ? 1 : 0;
};
/** Refait le tableau depuis la figure et vérifie qu'il ne montre pas ce qu'on demande. */
function lireTableau(q: Q) {
  const c = q.canvas as any;
  if (c?.kind !== "tableau_donnees") throw new Error("pas de tableau");
  const co: (number | string)[] = c.rows[0].values;
  const a = Number(String(c.rows[1].label).match(/a = (-?\d+)/)![1]);
  const bas: (number | string)[] = c.rows[2].values;
  const milieu: (number | string)[] = c.rows[1].values;
  return { co, a, bas, milieu, entete: c.headers as string[] };
}
const refait = (co: number[], a: number) => {
  const b: number[] = [];
  co.forEach((c, i) => b.push(i === 0 ? c : c + a * b[i - 1]));
  return b;
};
/** Les coefficients du tableau sont bien ceux du polynôme, et a est bien celui du diviseur. */
function coherent(q: Q): string[] {
  const { co, a } = lireTableau(q);
  const P = lireP(q.text);
  const c = coefsDe((x) => P.f(x), degre(P.source));
  if (c.join() !== co.join()) return [`coefficients du tableau ${co} ≠ polynôme ${c}`];
  const s = segments(q.text).find((x) => /^x [+-] \d+$/.test(x));
  if (s && lireD(q.text).racine !== a) return [`a = ${a} ne correspond pas à ${s}`];
  return [];
}
/** Aucune case ne montre la valeur demandée à la place du « ? ». */
function sansReponse(q: Q, v: number): string[] {
  const { bas } = lireTableau(q);
  const i = bas.length - 1;
  return bas[i] === v && !bas.includes("?") ? ["le tableau montre la réponse"] : [];
}
const lireQR = (c: string) => {
  const m = c.match(/Q\(x\) = ([^$]+)\$ et \$R = (-?\d+)/)!;
  return { Q: lireExp(m[1]), R: Number(m[2]) };
};

export const CORRECTEURS: CorrecteursMaths = {
  [`${R}1`]: (q) => accepte(q, lireP(q.text).f(lireAppel(q.text))),
  [`${R}2`]: (q) => {
    const P = lireP(q.text);
    return seulChoix(q, (c) => proche(P.f(Number(nu(c))), 0));
  },
  [`${R}3`]: (q) => {
    const a = lireRacine(q.text);
    return seulChoix(q, (c) => nu(c) === `x ${a < 0 ? "+" : "-"} ${Math.abs(a)}`);
  },
  [`${R}4`]: (q) => {
    const P = lireP(q.text);
    const racines: number[] = [];
    for (let x = -8; x <= 8; x++) if (proche(P.f(x), 0)) racines.push(x);
    const att = q.expected.map((e) => Number(String(e).replace(",", ".")));
    const ok = att.every((v) => racines.includes(v)) && racines.every((v) => att.includes(v));
    return ok ? [] : [`attendu ${att}, racines entières ${racines}`];
  },
  [`${R}5`]: (q) => {
    const P = lireP(q.text);
    const a = lireRacine(q.text);
    const d = degre(P.source);
    const l = segments(q.text).filter((s) => /^[bc]$/.test(s)).pop()!;
    // Quotient par évaluation, hors de la racine.
    const pts = [a + 1, a + 2, a + 3];
    const y = pts.map((x) => P.f(x) / (x - a));
    if (d === 2) return accepte(q, y[0] - pts[0]);
    // y = x² + bx + c : deux différences suffisent.
    const b = y[1] - y[0] - (pts[1] ** 2 - pts[0] ** 2);
    const c = y[0] - pts[0] ** 2 - b * pts[0];
    return accepte(q, l === "b" ? b : c);
  },
  [`${R}6`]: (q) => {
    const P = lireP(q.text);
    return accepte(q, racineM(P.f, lireRacine(q.text)));
  },
  [`${R}7`]: (q) => {
    const P = lireP(q.text);
    return seulChoix(q, (c) => {
      const f = lireExp(nu(c));
      return ESSAIS.every((x) => proche(f(x), P.f(x), 1e-6));
    });
  },
  [`${R}8`]: (q) => {
    const P = lireP(q.text);
    const a = q.text.match(/\$[a-zA-Z] = (\d+)\$/) ? Number(q.text.match(/\$[a-zA-Z] = (\d+)\$/)![1]) : q.text.match(/\$[A-Za-z]\((\d+)\) = 0\$/) ? Number(q.text.match(/\$[A-Za-z]\((\d+)\) = 0\$/)![1]) : Number(q.text.match(/\$(\d+)\$ est une racine/)![1]);
    if (!proche(P.f(a), 0)) return [`${a} n'annule pas le polynôme`];
    const [A, B] = coefsDe((x) => P.f(x), 2);
    return accepte(q, -B / A - a);
  },
  [`${R}9`]: (q) => {
    const P = lireP(q.text);
    return accepte(q, racineM(P.f, lireD(q.text).racine));
  },

  [`${V}1`]: (q) => {
    const P = lireP(q.text);
    const { d } = lireD(q.text);
    return seulChoix(q, (c) => resteDe((x) => P.f(x), d, lireExp(nu(c))) !== null);
  },
  [`${V}2`]: (q) => accepte(q, lireP(q.text).f(lireD(q.text).racine)),
  [`${V}3`]: (q) => {
    const P = lireP(q.text);
    return seulChoix(q, (c) => {
      const f = lireExp(nu(c));
      return ESSAIS.every((x) => proche(f(x), P.f(x), 1e-6));
    });
  },
  [`${V}4`]: (q) => {
    const P = lireP(q.text);
    const { d } = lireD(q.text);
    return seulChoix(q, (c) => resteDe((x) => P.f(x), d, lireExp(nu(c))) !== null);
  },
  [`${V}5`]: (q) => accepte(q, lireP(q.text).f(lireD(q.text).racine)),
  [`${V}6`]: (q) => {
    const P = lireP(q.text);
    const { racine: a } = lireD(q.text);
    const r = P.f(a);
    const qu = (x: number) => (P.f(x) - r) / (x - a);
    const pts = [a + 1, a + 2];
    const y = pts.map(qu);
    const b = y[1] - y[0] - (pts[1] ** 2 - pts[0] ** 2);
    const c = y[0] - pts[0] ** 2 - b * pts[0];
    const l = segments(q.text).filter((s) => /^[bc]$/.test(s)).pop();
    return accepte(q, l === "b" ? b : c);
  },
  [`${V}7`]: (q) => {
    const P = lireP(q.text);
    const { d } = lireD(q.text);
    return seulChoix(q, (c) => resteDe((x) => P.f(x), d, lireExp(nu(c))) !== null);
  },
  [`${V}8`]: (q) => {
    const P = lireP(q.text);
    const { d } = lireD(q.text);
    return seulChoix(q, (c) => {
      const { Q: f, R: r } = lireQR(c);
      const rr = resteDe((x) => P.f(x), d, f);
      return rr !== null && proche(rr, r);
    });
  },
  [`${V}9`]: (q) => {
    const P = lireP(q.text);
    const r = Number(q.text.match(/égal à \$(-?\d+)\$/)![1]);
    return accepte(q, racineM(P.f, lireD(q.text).racine, r));
  },
  [`${V}10`]: (q) => {
    const P = lireP(q.text);
    const { d } = lireD(q.text);
    return seulChoix(q, (c) => {
      const r = resteDe((x) => P.f(x), d, lireExp(nu(c)));
      return r !== null && proche(r, 0);
    });
  },

  [`${H}1`]: (q) => {
    const P = lireP(q.text);
    const c = coefsDe((x) => P.f(x), degre(P.source));
    return seulChoix(q, (x) => nu(x).split("\\,;").map(Number).join() === c.join());
  },
  [`${H}2`]: (q) => accepte(q, lireD(q.text).racine),
  [`${H}3`]: (q) => {
    const { co, a, bas } = lireTableau(q);
    const i = bas.indexOf("?");
    if (i !== 1) return [`« ? » en case ${i}`];
    return [...coherent(q), ...accepte(q, (co[1] as number) + a * (bas[0] as number))];
  },
  [`${H}4`]: (q) => {
    const P = lireP(q.text);
    const { co, a } = lireTableau(q);
    const r = refait(co as number[], a).pop()!;
    return [...coherent(q), ...(proche(r, P.f(a)) ? [] : ["le reste de Horner n'est pas P(a)"]), ...sansReponse(q, r), ...accepte(q, r)];
  },
  [`${H}5`]: (q) => {
    const { co, a, bas } = lireTableau(q);
    const b = refait(co as number[], a);
    if (b.join() !== bas.join()) return [`dernière ligne ${bas} ≠ ${b}`];
    const P = lireP(q.text);
    const { d } = lireD(q.text);
    return [...coherent(q), ...seulChoix(q, (c) => {
      const { Q: f, R: r } = lireQR(c);
      const rr = resteDe((x) => P.f(x), d, f);
      return rr !== null && proche(rr, r);
    })];
  },
  [`${H}6`]: (q) => {
    const P = lireP(q.text);
    const { d } = lireD(q.text);
    return [...coherent(q), ...seulChoix(q, (c) => resteDe((x) => P.f(x), d, lireExp(nu(c))) !== null)];
  },
  [`${H}7`]: (q) => {
    const { co, a, bas } = lireTableau(q);
    const i = bas.indexOf("?");
    if (i < 2) return [`« ? » en case ${i}`];
    return [...coherent(q), ...accepte(q, (co[i] as number) + a * (bas[i - 1] as number))];
  },
  [`${H}8`]: (q) => {
    const P = lireP(q.text);
    const { co, a } = lireTableau(q);
    const r = refait(co as number[], a).pop()!;
    return [...coherent(q), ...(proche(r, P.f(a)) ? [] : ["le reste de Horner n'est pas P(a)"]), ...sansReponse(q, r), ...accepte(q, r)];
  },
  [`${H}9`]: (q) => {
    const P = lireP(q.text);
    return [...coherent(q), ...seulChoix(q, (c) => {
      const f = lireExp(nu(c));
      return ESSAIS.every((x) => proche(f(x), P.f(x), 1e-6));
    })];
  },
  [`${H}10`]: (q) => {
    const { co, a, bas } = lireTableau(q);
    const i = co.indexOf("?");
    if (i < 1) return [`« ? » en case ${i}`];
    return accepte(q, (bas[i] as number) - a * (bas[i - 1] as number));
  },
  [`${H}11`]: (q) => {
    const P = lireP(q.text);
    const { a } = lireTableau(q);
    const x = lireAppel(q.text);
    if (x !== a) return [`a = ${a} au lieu de ${x}`];
    return [...coherent(q), ...accepte(q, P.f(x))];
  },
};
