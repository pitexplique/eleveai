// Correcteurs : asymptote oblique, branches infinies, symétries d'une courbe. Ils relisent
// la fonction écrite, en calculent le comportement très loin ou l'image symétrique, et
// n'utilisent aucune valeur du gabarit.
import type { CorrecteursMaths } from "@/lib/tutor-v4/questionBank/4e/maths/correcteurs/types";
import { compiler, nue, seulChoix } from "../../../lycee-correcteurs-commun";
import { aff } from "../courbes-commun";
import { comp, corrige, courtJuste, droiteLue, egal, finale, fonctionTexte, lu, mqFabrique, segments, valeurLim, type Q } from "./courbes-lire";

const mq = mqFabrique("tle_");
const sensFin = (t: string) => (finale(t).includes("-\\infty") ? -1 : 1);

/* ─────────── asymptote oblique ─────────── */
const LOIN = 1e6;
const estAsymptote = (f: (x: number) => number, L: (x: number) => number, s: number) => Math.abs(f(s * LOIN) - L(s * LOIN)) < 0.05 && Math.abs(f(s * 3 * LOIN) - L(s * 3 * LOIN)) < 0.05;

/** L'unique droite proposée qui colle à la courbe, à la bonne infinité. */
function asymptoteChoix(q: Q): string[] {
  const f = fonctionTexte(q.text);
  const s = sensFin(q.text);
  return seulChoix(q, (c) => {
    const L = droiteLue(c);
    return !!L && estAsymptote(f, L, s);
  });
}
const pente = (f: (x: number) => number, s = 1) => Math.round((f(s * 1e9) / (s * 1e9)) * 1000) / 1000;
const ordonnee = (f: (x: number) => number, s = 1) => {
  const m = pente(f, s);
  return Math.round((f(s * 1e7) - m * s * 1e7) * 1000) / 1000;
};
function coefLu(q: Q): string[] {
  const f = fonctionTexte(q.text);
  const coef = /coefficient directeur|pente|\$a\$/.test(finale(q.text));
  return courtJuste(q, coef ? pente(f) : ordonnee(f), 1e-2);
}
function differenceSimplifiee(q: Q): string[] {
  const f = fonctionTexte(q.text);
  const m = finale(q.text).match(/f\(x\) - \\left\((.+?)\\right\)/);
  if (!m) throw new Error(`différence illisible : ${q.text}`);
  const L = comp(m[1]);
  return seulChoix(q, (c) => {
    const g = compiler(nue(c));
    return [7.3, 11.1, 23.7, -9.2].every((x) => egal(g({ x }), f(x) - L({ x }), 1e-6));
  });
}
/** La limite écrite désigne la droite ; on la compare à chaque proposition. */
function limiteDonneDroite(q: Q): string[] {
  const seg = segments(q.text).find((s) => s.includes("\\lim"));
  const m = seg?.match(/f\(x\) - \((.+)\)\\right\]/);
  if (!m) throw new Error(`limite illisible : ${q.text}`);
  const D = comp(m[1]);
  return seulChoix(q, (c) => {
    const L = droiteLue(c);
    return !!L && [1, 2, 5].every((x) => egal(L(x), D({ x })));
  });
}
function deuxLimites(q: Q): string[] {
  const seg = segments(q.text).filter((s) => s.includes("\\lim"));
  const a = valeurLim(seg[0]);
  const b = valeurLim(seg[1]);
  return seulChoix(q, (c) => {
    const L = droiteLue(c);
    return !!L && egal(L(0), b) && egal(L(1) - L(0), a);
  });
}
function positionCourbe(q: Q): string[] {
  const f = fonctionTexte(q.text);
  const D = segments(q.text).map((s) => s.match(/^y = (.+)$/)).find(Boolean);
  if (!D) throw new Error(`droite illisible : ${q.text}`);
  const L = comp(D[1]);
  const I = q.text.match(/\$\](-?\d+)\\,;\+\\infty\[\$/);
  const J = q.text.match(/\$\]-\\infty\\,;(-?\d+)\[\$/);
  const xs = I ? [1, 4, 30].map((h) => Number(I[1]) + h) : J ? [1, 4, 30].map((h) => Number(J[1]) - h) : null;
  if (!xs) throw new Error(`intervalle illisible : ${q.text}`);
  const signes = xs.map((x) => Math.sign(f(x) - L({ x })));
  if (new Set(signes).size !== 1) return ["signe non constant"];
  return corrige(q, signes[0] > 0 ? "Au-dessus de $D$" : "En dessous de $D$");
}
/** La droite orange de la figure, lue dans la figure. */
function droiteFigure(q: Q): string[] {
  const fig = q.canvas as { courbes?: { id: string; a?: number; b?: number; points?: { x: number; y: number }[] }[] };
  const d = fig.courbes?.find((c) => c.id === "asymptote");
  if (!d) throw new Error("pas de droite sur la figure");
  // La courbe bleue doit bien se rapprocher de cette droite.
  const pts = fig.courbes?.find((c) => c.id === "branche1")?.points ?? [];
  const dernier = pts[pts.length - 1];
  if (!dernier || Math.abs(dernier.y - (d.a! * dernier.x + d.b!)) > 1.1) return ["la courbe est loin de la droite"];
  return seulChoix(q, (c) => {
    const L = droiteLue(c);
    return !!L && egal(L(0), d.b!) && egal(L(1) - L(0), d.a!);
  });
}
function estimation(q: Q): string[] {
  const m = segments(q.text).map((s) => s.match(/^([A-Z])\(x\) = (.+)$/)).find(Boolean);
  const x = finale(q.text).match(/[A-Z]\((\d+)\)/);
  if (!m || !x) throw new Error(`illisible : ${q.text}`);
  const c = comp(m[2]);
  const f = (v: number) => c({ x: v });
  return courtJuste(q, pente(f) * Number(x[1]) + ordonnee(f), 1e-1);
}
function croisement(q: Q): string[] {
  const f = fonctionTexte(q.text);
  const s = 1;
  const m = pente(f, s);
  const p = ordonnee(f, s);
  const L = (x: number) => m * x + p;
  const r = lu(String(q.expected[0]));
  if (!egal(f(r), L(r), 1e-2)) return [`f(${r}) ≠ droite`];
  let changements = 0;
  for (let x = -40; x < 40; x += 0.37) if (Math.sign(f(x) - L(x)) !== Math.sign(f(x + 0.37) - L(x + 0.37))) changements++;
  return changements === 1 ? [] : [`${changements} croisements`];
}
function constanteC(q: Q): string[] {
  const c = lu(String(q.expected[0]));
  const seg = segments(q.text).map((s) => s.match(/^f\(x\) = (.+)$/)).find(Boolean);
  if (!seg) throw new Error(`illisible : ${q.text}`);
  const pt = q.text.match(/\((-?\d+)\\,;(-?\d+)\)/) ?? q.text.match(/f\((-?\d+)\) = (-?\d+)/);
  if (!pt) throw new Error(`point illisible : ${q.text}`);
  return egal(comp(seg[1])({ c, x: Number(pt[1]) }), Number(pt[2]), 1e-6) ? [] : [`c = ${c} ne redonne pas ${pt[2]}`];
}

/* ─────────── branches infinies ─────────── */
const fm = (x: number) => String(Math.round(x * 1e6) / 1e6).replace(".", "{,}");
function nature(f: (x: number) => number, s: number): string {
  const [X1, X2] = [s * 1e6, s * 1e9];
  const [v1, v2] = [f(X1), f(X2)];
  if (Number.isFinite(v2) && Math.abs(v2) < 1e4 && Math.abs(v2 - v1) < 0.1) return `Une asymptote horizontale d'équation $y = ${fm(Math.round(v2 * 100) / 100)}$`;
  const r = v2 / X2;
  if (!Number.isFinite(r) || Math.abs(r) > 1e3) return "Une branche parabolique de direction $(Oy)$";
  if (Math.abs(r) < 1e-3) return "Une branche parabolique de direction $(Ox)$";
  const m = Math.round(r * 100) / 100;
  const [d1, d2] = [v1 - m * X1, v2 - m * X2];
  if (Math.abs(d2 - d1) > 0.5) return `Une branche parabolique de direction la droite $y = ${aff(m, 0)}$`;
  return `Une asymptote oblique d'équation $y = ${aff(m, Math.round(d2 * 100) / 100)}$`;
}
const natureEcrite = (q: Q) => corrige(q, nature(fonctionTexte(q.text), sensFin(q.text)));
function limitesVersDirection(q: Q): string[] {
  const seg = segments(q.text).filter((s) => s.includes("\\lim"));
  const quotient = seg.find((s) => s.includes("\\dfrac{f(x)}{x}"));
  if (!quotient) throw new Error(`illisible : ${q.text}`);
  const v = valeurLim(quotient);
  return corrige(q, `Une branche parabolique de direction ${v === 0 ? "$(Ox)$" : "$(Oy)$"}`);
}
function limitesVersBranche(q: Q): string[] {
  const seg = segments(q.text).filter((s) => s.includes("\\lim"));
  const a = valeurLim(seg[0]);
  const b = valeurLim(seg[1]);
  return corrige(q, Number.isFinite(b) ? `Une asymptote oblique d'équation $y = ${aff(a, b)}$` : `Une branche parabolique de direction la droite $y = ${aff(a, 0)}$`);
}
const quotientLim = (q: Q) => courtJuste(q, pente(fonctionTexte(q.text)), 1e-2);
function ecartLim(q: Q): string[] {
  const f = fonctionTexte(q.text);
  const s = segments(finale(q.text)).concat(segments(q.text));
  const m = s.map((x) => x.match(/f\(x\) ([-+]) (\d*)x/)).find(Boolean);
  if (!m) throw new Error(`écart illisible : ${q.text}`);
  const a = (m[1] === "-" ? 1 : -1) * (m[2] === "" ? 1 : Number(m[2]));
  return courtJuste(q, f(1e7) - a * 1e7, 1e-2);
}
function fonctionDeCategorie(q: Q): string[] {
  const t = q.text;
  const voulu = /\(Ox\)/.test(t) ? /\(Ox\)/ : /\(Oy\)/.test(t) ? /\(Oy\)/ : /asymptote oblique/.test(t) ? /asymptote oblique/ : /direction la droite/;
  const dirE = t.match(/direction \$y = ([^$]+)\$/);
  return seulChoix(q, (c) => {
    const e = comp(nue(c).replace(/^x \\mapsto /, "").replace(/^.*\\mapsto /, ""));
    const n = nature((x) => e({ x }), 1);
    if (!voulu.test(n)) return false;
    return !dirE || n.includes(`$y = ${dirE[1]}$`);
  });
}

/* ─────────── symétries ─────────── */
const XS = [0.3, 0.7, 1.3, 2.1, 3.6];
const axeOK = (f: (x: number) => number, a: number) => XS.every((h) => egal(f(a - h), f(a + h), 1e-6));
const centreOK = (f: (x: number) => number, a: number, b: number) => XS.every((h) => egal(f(a - h) + f(a + h), 2 * b, 1e-6));
const lireOm = (c: string) => {
  const m = c.match(/\\Omega\((-?[\d{},]+)\\,;(-?[\d{},]+)\)/);
  return m ? [lu(m[1]), lu(m[2])] : null;
};
const lireV = (c: string) => {
  const m = c.match(/\$x = (-?[\d{},]+)\$/);
  return m ? lu(m[1]) : null;
};
/** Une égalité sur f : f est remplacée par une fonction témoin qui a la symétrie, puis par une qui ne l'a pas. */
function egaliteSymetrie(q: Q): string[] {
  const A = q.text.match(/\$x = (-?\d+)\$/);
  const O = lireOm(q.text);
  const tem = (u: string) => (O ? `((${u} - (${O[0]}))^{3} + (${O[1]}))` : `((${u} - (${A ? A[1] : 0}))^{2} + 1)`);
  if (!O && !A) throw new Error(`illisible : ${q.text}`);
  return seulChoix(q, (c) => {
    const [g, d] = c.replace(/\$/g, "").split(" = ");
    const remp = (s: string) => s.replace(/f\(([^()]*)\)/g, (_, u) => tem(u));
    const G = compiler(remp(g));
    const D = compiler(remp(d));
    return [0.4, 1.7, 3.3, -2.2].every((x) => egal(G({ x }), D({ x }), 1e-6));
  });
}
function axeChoix(q: Q): string[] {
  const f = fonctionTexte(q.text);
  return seulChoix(q, (c) => {
    const a = lireV(c);
    return a !== null && axeOK(f, a);
  });
}
function centreChoix(q: Q): string[] {
  const f = fonctionTexte(q.text);
  return seulChoix(q, (c) => {
    const o = lireOm(c);
    return !!o && centreOK(f, o[0], o[1]);
  });
}
function elementChoix(q: Q): string[] {
  const f = fonctionTexte(q.text);
  return seulChoix(q, (c) => {
    const o = lireOm(c);
    if (o) return centreOK(f, o[0], o[1]);
    const a = lireV(c);
    return a !== null && axeOK(f, a);
  });
}
function valeurSymetrique(q: Q): string[] {
  const m = q.text.match(/f\((-?\d+)\) = (-?\d+)/);
  const cible = finale(q.text).match(/f\((-?\d+)\)/);
  if (!m || !cible) throw new Error(`illisible : ${q.text}`);
  const [x0, v, t] = [Number(m[1]), Number(m[2]), Number(cible[1])];
  const O = lireOm(q.text);
  const A = q.text.match(/\$x = (-?\d+)\$/);
  if (O) {
    if (2 * O[0] - x0 !== t) return ["le point visé n'est pas le symétrique"];
    return courtJuste(q, 2 * O[1] - v);
  }
  if (!A) throw new Error(`illisible : ${q.text}`);
  if (2 * Number(A[1]) - x0 !== t) return ["le point visé n'est pas le symétrique"];
  return courtJuste(q, v);
}
function sommeConstante(q: Q): string[] {
  const f = fonctionTexte(q.text);
  const s = segments(finale(q.text)).find((x) => x.includes(" + f("));
  const m = s?.match(/f\((.+?) \+ x\) \+ f\((.+?) - x\)/);
  if (!m) throw new Error(`somme illisible : ${q.text}`);
  const u = lu(m[1]);
  return [0.5, 1.3, 2.9].flatMap((h) => courtJuste(q, f(u + h) + f(u - h), 1e-6));
}
function parametreM(q: Q): string[] {
  const m = lu(String(q.expected[0]));
  const f = fonctionTexte(q.text, { m });
  const O = lireOm(q.text);
  if (O) return centreOK(f, O[0], O[1]) ? [] : [`m = ${m} ne donne pas le centre`];
  const A = q.text.match(/\$x = (-?\d+)\$/);
  if (!A) throw new Error(`illisible : ${q.text}`);
  return axeOK(f, Number(A[1])) ? [] : [`m = ${m} ne donne pas l'axe`];
}
function memeHauteur(q: Q): string[] {
  const f = fonctionTexte(q.text);
  const p = finale(q.text).match(/\$(\d+)\$/);
  if (!p) throw new Error(`abscisse illisible : ${q.text}`);
  const [x0, r] = [Number(p[1]), lu(String(q.expected[0]))];
  return r !== x0 && egal(f(r), f(x0), 1e-6) ? [] : [`hauteurs ${f(r)} et ${f(x0)}`];
}

export const CORRECTEURS: CorrecteursMaths = {
  ...mq("asymptote_oblique", {
    1: asymptoteChoix, 2: coefLu, 3: differenceSimplifiee, 4: limiteDonneDroite,
    5: asymptoteChoix, 6: asymptoteChoix, 7: positionCourbe, 8: deuxLimites, 9: droiteFigure,
    10: estimation, 11: croisement, 12: asymptoteChoix, 13: constanteC,
  }),
  ...mq("branches_infinies", {
    1: limitesVersDirection, 2: natureEcrite, 3: quotientLim, 4: ecartLim,
    5: natureEcrite, 6: natureEcrite, 7: natureEcrite, 8: limitesVersBranche,
    9: natureEcrite, 10: fonctionDeCategorie, 11: natureEcrite, 12: ecartLim,
  }),
  ...mq("symetrie_courbe", {
    1: egaliteSymetrie, 2: egaliteSymetrie, 3: axeChoix, 4: centreChoix,
    5: axeChoix, 6: centreChoix, 7: centreChoix, 8: centreChoix, 9: valeurSymetrique,
    10: sommeConstante, 11: parametreM, 12: memeHauteur, 13: elementChoix,
  }),
};
