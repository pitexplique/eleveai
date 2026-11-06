// Correcteurs des fonctions homographiques et de la partie entière : ils relisent la formule ou le dessin
// (points de la courbe, pointillés, paliers pleins et creux) et recalculent.
import type { CorrecteursMaths } from "@/lib/tutor-v4/questionBank/4e/maths/correcteurs/types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { accepte } from "../../../lycee-correcteurs-stats";
import { compiler, seulChoix } from "../../../lycee-correcteurs-commun";
import { evaluer, lireEnsemble, memeEnsemble, nombres, pointsDessin, proche, segments, traits, val } from "./themes-3-pays-lecture";

type Q = TutorGeneratedQuestionV4;
const H = "2de_fct_homographique_tpl_";
const E = "2de_fct_partie_entiere_tpl_";

/** Les quatre coefficients de la fraction \dfrac{ax + b}{cx + d}, dans une formule. */
function fraction(s: string, v = "x") {
  const m = s.match(/\\dfrac\{([^{}]+)\}\{([^{}]+)\}/);
  if (!m) throw new Error(`fraction illisible : ${s}`);
  const [N, D] = [compiler(m[1]), compiler(m[2])];
  const b = N({ [v]: 0 });
  const d = D({ [v]: 0 });
  return { a: N({ [v]: 1 }) - b, b, c: D({ [v]: 1 }) - d, d, f: (x: number) => N({ [v]: x }) / D({ [v]: x }) };
}
const formule = (t: string) => {
  const s = segments(t).find((x) => /\\dfrac/.test(x));
  if (!s) throw new Error(`formule illisible : ${t}`);
  return s;
};
const lit = (t: string) => fraction(formule(t));
const interdite = (q: { c: number; d: number }) => -q.d / q.c;
const limite = (q: { a: number; c: number }) => q.a / q.c;
const couple = (c: string) => {
  const m = c.match(/\((-?[\d]+)\\,;(-?[\d]+)\)/);
  if (!m) throw new Error(`couple illisible : ${c}`);
  return [Number(m[1]), Number(m[2])];
};
/** Les pointillés du dessin. */
function pointilles(q: Q) {
  const c = q.canvas as { misesEnEvidence?: { verticale?: { x: number }; horizontale?: { y: number } }[] };
  const l = c.misesEnEvidence ?? [];
  const v = l.find((m) => m.verticale)?.verticale?.x;
  const h = l.find((m) => m.horizontale)?.horizontale?.y;
  if (v === undefined || h === undefined) throw new Error("pointillés absents");
  return { v, h };
}
/** Valeur lue sur des paliers : le point plein de l'abscisse, sinon le palier qui la contient. */
function palier(q: Q, x: number) {
  const pl = pointsDessin(q).filter((p) => !p.ouvert && proche(p.x, x));
  if (pl.length === 1) return pl[0].y;
  if (pl.length > 1) throw new Error(`${pl.length} points pleins en x = ${x}`);
  const t = traits(q).filter((k) => k[0].x < x - 1e-9 && x < k[k.length - 1].x - 1e-9);
  if (t.length !== 1) throw new Error(`${t.length} paliers en x = ${x}`);
  return t[0][0].y;
}

export const CORRECTEURS: CorrecteursMaths = {
  [`${H}1`]: (q) => accepte(q, interdite(lit(q.text))),
  [`${H}2`]: (q) => {
    const v = interdite(lit(q.text));
    return seulChoix(q, (c) => {
      const m = c.match(/\\setminus \\left\\\{(.+)\\right\\\}/);
      return !!m && proche(val(m[1]), v);
    });
  },
  [`${H}3`]: (q) => {
    const s = lit(q.text);
    const m = q.text.split("\n\n")[2];
    const x = m.match(/\$[a-z]\((-?\d+)\)\$/)?.[1] ?? m.match(/image de \$(-?\d+)\$/)?.[1] ?? m.match(/en \$(-?\d+)\$/)?.[1] ?? m.match(/x = (-?\d+)\$/)?.[1];
    if (x === undefined) throw new Error(`abscisse illisible : ${m}`);
    return accepte(q, s.f(Number(x)));
  },
  [`${H}4`]: (q) => {
    const s = lit(q.text);
    return seulChoix(q, (c) => {
      const [x, y] = nombres(c);
      return proche(x, interdite(s)) && proche(y, limite(s));
    });
  },
  [`${H}5`]: (q) => {
    const s = lit(q.text);
    return seulChoix(q, (c) => {
      const [x, y] = couple(c);
      return proche(x, interdite(s)) && proche(y, limite(s));
    });
  },
  [`${H}6`]: (q) => {
    const { v, h } = pointilles(q);
    // Les deux branches s'arrêtent de part et d'autre de la verticale, sans jamais la franchir.
    const t = traits(q);
    if (t.length !== 2 || !(t[0][t[0].length - 1].x < v && t[1][0].x > v)) return ["branches mal coupées"];
    if (q.format === "qcm") return seulChoix(q, (c) => {
      const [x, y] = couple(c);
      return proche(x, v) && proche(y, h);
    });
    return accepte(q, /valeur interdite|n'a pas d'image|verticale/.test(q.text) ? v : h);
  },
  [`${H}7`]: (q) => {
    const s = lit(q.text);
    // (ax + b)/(x + d) = a + (b − ad)/(x + d)
    const p = s.a / s.c;
    const k = s.b - p * s.d;
    const lettre = segments(q.text).filter((x) => x === "k" || x === "p").pop();
    return accepte(q, lettre === "k" ? k : p);
  },
  [`${H}8`]: (q) => {
    const t = traits(q).flat();
    return seulChoix(q, (c) => {
      const s = fraction(c.replace(/\$/g, ""));
      return t.every((p) => {
        const y = s.f(p.x);
        return Number.isFinite(y) && Math.abs(y - p.y) < 2e-3;
      });
    });
  },
  [`${H}9`]: (q) => {
    const s = lit(q.text);
    const d = s.a * s.d - s.b * s.c;
    const al = interdite(s);
    const crois = d > 0;
    return seulChoix(q, (c) => {
      if (/\\mathbb\{R\}|ensuite/.test(c)) return false;
      if (!c.includes(`;${al}[`)) return false;
      return c.startsWith(crois ? "Croissante" : "Décroissante");
    });
  },
  [`${H}10`]: (q) => {
    const s = formule(q.text);
    const v = (s.match(/\\dfrac\{[^{}]*?([a-z])/) as RegExpMatchArray)[1];
    const f = fraction(s, v);
    return accepte(q, f.a / f.c);
  },
  [`${H}11`]: (q) => {
    const s = lit(q.text);
    const m = q.text.split("\n\n")[2];
    const lu = m.match(/image \$(-?\d+)\$|= (-?\d+)\$|de \$(-?\d+)\$|donne \$(-?\d+)\$/);
    if (!lu) throw new Error(`valeur illisible : ${m}`);
    const k = Number(lu.slice(1).find((x) => x !== undefined));
    return accepte(q, (k * s.d - s.b) / (s.a - k * s.c));
  },

  [`${E}1`]: (q) => {
    const m = q.text.match(/\$E\((-?[\d{},]+)\)\$/);
    if (!m) throw new Error(`nombre illisible : ${q.text}`);
    return accepte(q, Math.floor(val(m[1])));
  },
  [`${E}2`]: (q) => {
    const s = segments(q.text)[0];
    return accepte(q, evaluer(s.replace("\\left(", "(").replace(/\\right\)$/, ")")));
  },
  [`${E}3`]: (q) => {
    const n = Number(q.text.match(/E\(x\) = (-?\d+)/)![1]);
    return seulChoix(q, (c) => memeEnsemble(lireEnsemble(c), [{ a: n, b: n + 1, fa: true, fb: false }]));
  },
  [`${E}4`]: (q) => {
    const seg = segments(q.text).filter((s) => s !== "f");
    const brut = seg[seg.length - 1];
    const x = val(brut.replace(/^f\(/, "").replace(/\)$/, ""));
    return accepte(q, palier(q, x));
  },
  [`${E}5`]: (q) => accepte(q, evaluer(segments(q.text)[0].replace(/\{,\}/g, ","))),
  [`${E}6`]: (q) => {
    const eq = segments(q.text).find((s) => s.includes("E("))!;
    const m = eq.match(/^E\((.+)\) = (-?\d+)$/);
    if (!m) throw new Error(`équation illisible : ${eq}`);
    const f = compiler(m[1]);
    const b = f({ x: 0 });
    const a = f({ x: 1 }) - b;
    const n = Number(m[2]);
    return seulChoix(q, (c) => memeEnsemble(lireEnsemble(c), [{ a: (n - b) / a, b: (n + 1 - b) / a, fa: true, fb: false }]));
  },
  [`${E}7`]: (q) => {
    const t = traits(q);
    return seulChoix(q, (c) => {
      const src = c.replace(/\$/g, "").replace(/^g\(x\) = /, "").replace("\\left(", "(").replace("\\right)", ")");
      return t.every((k) => [0.05, 0.45, 0.55, 0.95].every((r) => {
        const x = k[0].x + r * (k[1].x - k[0].x);
        return proche(evaluer(src, { x }), k[0].y);
      })) && pointsDessin(q).filter((p) => !p.ouvert).every((p) => proche(evaluer(src, { x: p.x }), p.y));
    });
  },
  [`${E}8`]: (q) => {
    const [a, b] = nombres(q.text);
    const [N, k] = /pots de/.test(q.text) ? [b, a] : [a, b];
    return accepte(q, Math.floor(N / k));
  },
  [`${E}9`]: (q) => {
    const x = val(segments(q.text).find((s) => /^x = /.test(s) || /^-?[\d{},]+$/.test(s) || /^x =/.test(s))!.replace(/^x = /, ""));
    return accepte(q, /x - E\(x\)/.test(q.text) ? x - Math.floor(x) : Math.floor(x));
  },
};
