// Correcteurs des équations et inéquations avec valeur absolue : ils relisent la formule écrite, tirent les
// parties affines par évaluation, résolvent et comparent les ensembles.
import type { CorrecteursMaths } from "@/lib/tutor-v4/questionBank/4e/maths/correcteurs/types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { accepte } from "../../../lycee-correcteurs-stats";
import { compiler, seulChoix } from "../../../lycee-correcteurs-commun";
import { affineDe, evaluer, lireEnsemble, memeEnsemble, nombres, proche, segments, type Inter } from "./themes-3-pays-lecture";

type Q = TutorGeneratedQuestionV4;
const E = "2de_va_equation_affine_tpl_";
const I = "2de_va_inequation_affine_tpl_";

const nette = (s: string) => s.replace(/\\nobreak/g, "").replace(/\s+/g, " ").trim();
/** La formule posée : celle qui contient une valeur absolue. */
const formule = (t: string) => {
  const s = segments(t).find((x) => x.includes("\\left|"));
  if (!s) throw new Error(`formule illisible : ${t}`);
  return nette(s);
};
const inconnue = (s: string) => {
  const l = s.replace(/\\[a-zA-Z]+/g, " ").match(/[a-z]/);
  if (!l) throw new Error(`inconnue illisible : ${s}`);
  return l[0];
};
/** Sépare une formule à un signe de relation. */
function coupe(s: string) {
  const m = s.match(/^(.*?)\s*(=|\\leq|\\geq|<|>)\s*(.*)$/);
  if (!m) throw new Error(`relation illisible : ${s}`);
  return { g: m[1], rel: m[2], d: m[3] };
}
/** Résout G(x) = D(x) ou G(x) rel D(x) par balayage exact : g et d sont affines par morceaux. */
function fonctions(s: string) {
  const { g, rel, d } = coupe(s);
  const v = inconnue(s);
  return { rel, F: (x: number) => evaluer(g, { [v]: x }) - evaluer(d, { [v]: x }), v };
}
/** Les racines d'une fonction affine par morceaux, sur une grille assez fine (tout est entier ou demi-entier ici). */
function racines(F: (x: number) => number) {
  const out: number[] = [];
  for (let k = -400; k <= 400; k++) {
    const x = k / 4;
    if (Math.abs(F(x)) < 1e-7) out.push(x);
  }
  return out;
}
/** L'ensemble des solutions : racines sur la grille, puis test du signe entre les racines. */
function ensemble(s: string): Inter[] {
  const { rel, F } = fonctions(s);
  const zs = racines(F);
  const test = (x: number) => (rel === "\\leq" ? F(x) <= 1e-9 : rel === "\\geq" ? F(x) >= -1e-9 : rel === "<" ? F(x) < -1e-9 : rel === ">" ? F(x) > 1e-9 : Math.abs(F(x)) < 1e-9);
  const points = [-Infinity, ...zs, Infinity];
  const out: Inter[] = [];
  const dernier = () => out[out.length - 1];
  // Un morceau qui touche le précédent à une borne fermée s'y soude.
  const pousse = (a: number, b: number, fa: boolean, fb: boolean) => {
    const d = dernier();
    if (d && d.b === a && (d.fb || fa)) {
      d.b = b;
      d.fb = fb;
    } else out.push({ a, b, fa, fb });
  };
  for (let i = 0; i + 1 < points.length; i++) {
    const [p, q] = [points[i], points[i + 1]];
    if (i > 0 && test(p) && !(dernier() && dernier().b === p)) pousse(p, p, true, true);
    const m = p === -Infinity ? q - 1 : q === Infinity ? p + 1 : (p + q) / 2;
    if (Number.isFinite(m) ? test(m) : test(0)) pousse(p, q, i > 0 && test(p), i + 2 < points.length && test(q));
  }
  return out;
}
const ensembleChoix = (c: string) => lireEnsemble(c.replace(/^\$S\s*=\s*/, "$"));
/** Une proposition : ensemble lu = ensemble recalculé. */
function parEnsemble(q: Q) {
  const juste = ensemble(formule(q.text));
  return seulChoix(q, (c) => (c.includes("\\setminus") ? complementPoint(c, juste) : memeEnsemble(ensembleChoix(c), juste)));
}
/** ℝ privé d'un point. */
function complementPoint(c: string, juste: Inter[]) {
  const m = c.match(/\\setminus \\\{(-?\d+)\\\}/);
  if (!m) return false;
  const x = Number(m[1]);
  return juste.length === 2 && juste[0].a === -Infinity && juste[0].b === x && !juste[0].fb && juste[1].a === x && juste[1].b === Infinity && !juste[1].fa;
}
/** Plus grande ou plus petite solution, selon le texte. */
function extreme(q: Q) {
  const zs = racines(fonctions(formule(q.text)).F);
  if (zs.length !== 2) throw new Error(`${zs.length} solutions : ${q.text}`);
  return accepte(q, /grande|tardif|dernier|dernière/.test(q.text) ? Math.max(...zs) : Math.min(...zs));
}

export const CORRECTEURS: CorrecteursMaths = {
  [`${E}1`]: extreme,
  [`${E}2`]: parEnsemble,
  [`${E}3`]: (q) => {
    const c = Number(coupe(formule(q.text)).d);
    const j = c < 0 ? "Aucune solution" : c === 0 ? "Une seule solution" : "Exactement deux solutions";
    return q.expected[0] === j ? [] : [`attendu ${q.expected[0]}, recalculé ${j}`];
  },
  [`${E}4`]: (q) => {
    const juste = racines(fonctions(formule(q.text)).F).sort((p, r) => p - r);
    return seulChoix(q, (c) => {
      if (!/ ou /.test(c)) return false;
      const zs: number[] = [];
      for (const s of segments(c)) {
        const { g, d } = coupe(s);
        const v = inconnue(g);
        const { a, b } = affineDe(g, v);
        zs.push((Number(d) - b) / a);
      }
      zs.sort((p, r) => p - r);
      return zs.length === juste.length && zs.every((z, i) => proche(z, juste[i]));
    });
  },
  [`${E}5`]: extreme,
  [`${E}6`]: parEnsemble,
  [`${E}7`]: extreme,
  [`${E}8`]: (q) => {
    // Le récit : a objets, écart e, cible T, dans cet ordre variable ; on repère chaque nombre par sa place.
    const [a, ...reste] = nombres(q.text);
    const T = Math.max(...reste);
    const e = Math.min(...reste);
    const haut = /grande|au-dessus|élevée/.test(q.text);
    return accepte(q, (haut ? T + e : T - e) / a);
  },
  [`${E}9`]: (q) => {
    const seg = segments(q.text).map(nette).filter((s) => /[a-z]/.test(s) && s !== "t");
    const [A, B] = seg;
    const src = `\\left|${A}\\right| = \\left|${B}\\right|`;
    const zs = racines(fonctions(src).F);
    if (zs.length !== 2) throw new Error(`${zs.length} solutions : ${q.text}`);
    return accepte(q, /tardif|dernière|dernier/.test(q.text) ? Math.max(...zs) : Math.min(...zs));
  },
  [`${E}10`]: (q) => {
    const seg = segments(q.text).map(nette);
    const x0 = Number(coupe(seg[0]).d);
    const v = inconnue(coupe(seg[0]).g);
    const { g, d } = coupe(seg.find((s) => s.includes("\\left|"))!);
    const c = Number(d);
    const interieur = g.replace("\\left|", "").replace("\\right|", "");
    const f = compiler(interieur);
    const a0 = f({ [v]: x0, b: 0 });
    const vals = [c - a0, -c - a0].sort((p, r) => p - r);
    return seulChoix(q, (ch) => {
      const l = lireEnsemble(ch);
      return l.length === 2 && proche(l[0].a, vals[0]) && proche(l[1].a, vals[1]);
    });
  },

  [`${I}1`]: (q) => {
    const j = ensemble(formule(q.text));
    return seulChoix(q, (c) => {
      const s = segments(c);
      if (s.length !== 1) return false;
      const m = s[0].match(/^(-?\d+) (\\leq|<) (.+) (\\leq|<) (-?\d+)$/);
      if (!m) return false;
      const v = inconnue(m[3]);
      const { a, b } = affineDe(m[3], v);
      const [p, r] = [(Number(m[1]) - b) / a, (Number(m[5]) - b) / a].sort((u, w) => u - w);
      if (Number(m[1]) > Number(m[5])) return false;
      return j.length === 1 && proche(j[0].a, p) && proche(j[0].b, r) && j[0].fa === (m[2] === "\\leq");
    });
  },
  [`${I}2`]: parEnsemble,
  [`${I}3`]: (q) => {
    const j = ensemble(formule(q.text));
    const [a, b] = [j[0].a, j[0].b];
    if (/Combien|nombre de solutions/.test(q.text)) return accepte(q, Math.floor(b) - Math.ceil(a) + 1);
    return accepte(q, /grand|supérieure/.test(q.text) ? b : a);
  },
  [`${I}4`]: parEnsemble,
  [`${I}5`]: parEnsemble,
  [`${I}6`]: (q) => {
    const j = ensemble(formule(q.text));
    return accepte(q, /Quel est son centre|au milieu|son milieu/.test(q.text) ? (j[0].a + j[0].b) / 2 : (j[0].b - j[0].a) / 2);
  },
  [`${I}7`]: (q) => {
    const [a, ...reste] = nombres(q.text);
    const T = Math.max(...reste);
    const e = Math.min(...reste);
    const J: Inter[] = [{ a: (T - e) / a, b: (T + e) / a, fa: true, fb: true }];
    return seulChoix(q, (c) => memeEnsemble(lireEnsemble(c), J));
  },
  [`${I}8`]: (q) => {
    const intervalle = segments(q.text).find((s) => /^[\[\]]/.test(s))!;
    const J = lireEnsemble(intervalle);
    return seulChoix(q, (c) => memeEnsemble(ensemble(nette(c.replace(/\$/g, ""))), J));
  },
  [`${I}9`]: parEnsemble,
};
