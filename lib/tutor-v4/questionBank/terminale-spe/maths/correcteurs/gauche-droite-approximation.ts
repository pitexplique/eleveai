// Correcteurs : limites et nombres dérivés d'un seul côté, approximation affine. Ils relisent
// la fonction écrite (morceaux compris), évaluent très près du point et n'utilisent aucune
// valeur du gabarit.
import type { CorrecteursMaths } from "@/lib/tutor-v4/questionBank/4e/maths/correcteurs/types";
import { compiler, deriveeNum, seulChoix } from "../../../lycee-correcteurs-commun";
import { comp, corrige, courtJuste, egal, finale, fonctionTexte, lireMorceaux, lu, mqFabrique, segments, valeurLim, type Q } from "./courbes-lire";

const mq = mqFabrique("tle_");
const H = 1e-6;
type F = (x: number) => number;
const cote = (t: string) => (/gauche|\^\{-\}|f'_\{g\}/.test(t) ? -1 : 1);
/** Le point et le côté demandés par la question. */
function demande(q: Q) {
  const f = finale(q.text);
  const m = f.match(/x \\to (-?\d+)\^/) ?? f.match(/\$x = (-?\d+)\$/) ?? f.match(/\$(-?\d+)\$/);
  if (!m) throw new Error(`point illisible : ${f}`);
  return { a: Number(m[1]), s: cote(f) };
}
const limite = (f: F, a: number, s: number) => f(a + s * H);
const taux = (f: F, a: number, s: number) => (f(a + s * H) - f(a)) / (s * H);
const rond = (x: number) => Math.round(x * 1000) / 1000;
/** Le point de raccord : la borne de la première condition. */
function raccord(t: string) {
  const m = t.match(/x (?:<|\\leqslant) (-?\d+)/);
  if (!m) throw new Error(`raccord illisible : ${t}`);
  return Number(m[1]);
}

/* ─────────── limites et continuité ─────────── */
function limiteLue(q: Q): string[] {
  const { a, s } = demande(q);
  return courtJuste(q, rond(limite(fonctionTexte(q.text), a, s)), 1e-2);
}
const VERDICT = (a: number, g: number, d: number, v: number) => {
  if (!egal(g, d, 1e-2)) return "Non : les limites à gauche et à droite sont différentes";
  return egal(g, v, 1e-2) ? `Oui : $f$ est continue en $${a}$` : `Non : les deux limites sont égales, mais différentes de $f(${a})$`;
};
function continuite(q: Q): string[] {
  const f = fonctionTexte(q.text);
  const { a } = demande(q);
  return corrige(q, VERDICT(a, limite(f, a, -1), limite(f, a, 1), f(a)));
}
function continuiteLue(q: Q): string[] {
  const lims = segments(q.text).filter((s) => s.includes("\\lim"));
  const g = lims.find((s) => s.includes("^{-}"));
  const d = lims.find((s) => s.includes("^{+}"));
  const v = q.text.match(/\$f\((-?\d+)\) = (-?\d+)\$/);
  if (!g || !d || !v) throw new Error(`illisible : ${q.text}`);
  return corrige(q, VERDICT(Number(v[1]), valeurLim(g), valeurLim(d), Number(v[2])));
}
function limiteFigure(q: Q): string[] {
  const { s } = demande(q);
  const c = (q.canvas as { courbes: { points: { x: number; y: number }[] }[] }).courbes;
  return courtJuste(q, s < 0 ? c[0].points[1].y : c[1].points[0].y);
}
/** La réponse k, remise dans l'énoncé : plus de saut au raccord. */
function parametreContinu(q: Q): string[] {
  const k = lu(String(q.expected[0]));
  const f = fonctionTexte(q.text, { k });
  const a = raccord(q.text);
  return egal(limite(f, a, -1), limite(f, a, 1), 1e-2) ? [] : [`k = ${k} laisse un saut`];
}
function prolongement(q: Q): string[] {
  const p = q.text.match(/x \\neq (-?\d+)/);
  if (!p) throw new Error(`point illisible : ${q.text}`);
  const a = Number(p[1]);
  const f = fonctionTexte(q.text);
  const [g, d] = [limite(f, a, -1), limite(f, a, 1)];
  if (!egal(g, d, 1e-3)) return ["limites différentes"];
  return courtJuste(q, rond(g), 2e-3);
}
function limiteInfinie(q: Q): string[] {
  const { a, s } = demande(q);
  const v = limite(fonctionTexte(q.text), a, s);
  if (Math.abs(v) < 1e4) return [`pas infinie : ${v}`];
  return corrige(q, v > 0 ? "$+\\infty$" : "$-\\infty$");
}
function discontinuites(q: Q): string[] {
  const f = fonctionTexte(q.text);
  const m = q.text.match(/(-?\d+) \\leqslant x < (-?\d+)/);
  if (!m) throw new Error(`illisible : ${q.text}`);
  const [a, b] = [Number(m[1]), Number(m[2])];
  const sa = !egal(limite(f, a, -1), limite(f, a, 1), 1e-2);
  const sb = !egal(limite(f, b, -1), limite(f, b, 1), 1e-2);
  return corrige(q, sa && sb ? `En $${a}$ et en $${b}$` : sa ? `En $${a}$ seulement` : sb ? `En $${b}$ seulement` : "Nulle part");
}
function partieEntiere(q: Q): string[] {
  const { a, s } = demande(q);
  const seg = segments(q.text).map((x) => x.match(/^f\(x\) = (.+)$/)).find(Boolean);
  if (!seg) throw new Error(`illisible : ${q.text}`);
  const E = Math.floor(a + s * H);
  const g = compiler(seg[1].replace(/E\(x\)/g, `(${E})`));
  return courtJuste(q, g({ x: a }));
}

/* ─────────── dérivabilité ─────────── */
const VU = (a: number, g: number, d: number) => (egal(g, d, 1e-2) ? `$f$ est dérivable en $${a}$` : `$f$ n'est pas dérivable en $${a}$ : la courbe a un point anguleux`);
function nombreDerive(q: Q): string[] {
  const { a, s } = demande(q);
  return courtJuste(q, rond(taux(fonctionTexte(q.text), a, s)), 1e-2);
}
function derivabiliteLue(q: Q): string[] {
  const g = q.text.match(/f'_\{g\}\((-?\d+)\) = (-?\d+)/);
  const d = q.text.match(/f'_\{d\}\((-?\d+)\) = (-?\d+)/);
  if (!g || !d) throw new Error(`illisible : ${q.text}`);
  return corrige(q, VU(Number(g[1]), Number(g[2]), Number(d[2])));
}
function tauxDonne(q: Q): string[] {
  const seg = segments(q.text).find((s) => s.includes("\\lim"));
  if (!seg) throw new Error(`illisible : ${q.text}`);
  if (cote(seg) !== cote(finale(q.text))) return ["côté différent de la limite donnée"];
  return courtJuste(q, valeurLim(seg));
}
function derivabilite(q: Q): string[] {
  const f = fonctionTexte(q.text);
  const { a } = demande(q);
  if (!egal(limite(f, a, -1), limite(f, a, 1), 1e-2)) return ["fonction non continue"];
  return corrige(q, VU(a, taux(f, a, -1), taux(f, a, 1)));
}
function demiTangente(q: Q): string[] {
  const f = fonctionTexte(q.text);
  const { a, s } = demande(q);
  const m = taux(f, a, s);
  const v = f(a);
  return seulChoix(q, (c) => {
    const e = c.match(/^\$y = (.+)\$$/);
    if (!e) return false;
    const L = comp(e[1]);
    return egal(L({ x: a }), v, 1e-3) && egal(L({ x: a + 1 }) - L({ x: a }), m, 1e-2);
  });
}
function natureDemiTangente(q: Q): string[] {
  const f = fonctionTexte(q.text);
  const { a, s } = demande(q);
  const t = Math.abs(taux(f, a, s));
  return corrige(q, t > 100 ? "Une demi-tangente verticale" : t < 0.05 ? "Une demi-tangente horizontale" : "Une demi-tangente ni verticale ni horizontale");
}
function penteFigure(q: Q): string[] {
  const s = cote(finale(q.text));
  const c = (q.canvas as { courbes: { points: { x: number; y: number }[] }[] }).courbes[s < 0 ? 0 : 1].points;
  return courtJuste(q, (c[1].y - c[0].y) / (c[1].x - c[0].x));
}
function parametreDerivable(q: Q): string[] {
  const k = lu(String(q.expected[0]));
  const f = fonctionTexte(q.text, { k });
  const a = raccord(q.text);
  if (!egal(limite(f, a, -1), limite(f, a, 1), 1e-2)) return [`k = ${k} laisse un saut`];
  return egal(taux(f, a, -1), taux(f, a, 1), 1e-2) ? [] : [`k = ${k} laisse un angle`];
}
function deuxInconnues(q: Q): string[] {
  const p = lireMorceaux(q.text);
  if (!p) throw new Error(`morceaux illisibles : ${q.text}`);
  const a = raccord(q.text);
  const g = (x: number) => p[0].f({ x });
  const m = deriveeNum(g, a);
  const v = /\$m\$/.test(finale(q.text)) ? m : g(a) - m * a;
  return courtJuste(q, rond(v), 1e-2);
}
function raccordLisse(q: Q): string[] {
  const f = fonctionTexte(q.text);
  const m = finale(q.text).match(/\$x = (-?\d+)\$/);
  if (!m) throw new Error(`illisible : ${q.text}`);
  const a = Number(m[1]);
  if (!egal(limite(f, a, -1), limite(f, a, 1), 1e-2)) return ["saut au raccord"];
  return corrige(q, egal(taux(f, a, -1), taux(f, a, 1), 1e-2) ? "Le raccord est lisse : mêmes valeur et pente" : "Il y a un angle : les pentes diffèrent");
}

/* ─────────── approximation affine ─────────── */
const NB = String.raw`-?\d[\d{},]*`;
const cibleX = (t: string) => {
  const m = t.match(new RegExp(`[fA-Z]\\((${NB})\\)`));
  if (!m) throw new Error(`cible illisible : ${t}`);
  return lu(m[1]);
};
function formule(q: Q): string[] {
  const v = q.text.match(/\bf\((-?\d+)\) = (-?\d+)/);
  const d = q.text.match(/f'\((-?\d+)\) = (-?\d+)/);
  if (!v || !d) throw new Error(`illisible : ${q.text}`);
  const [a, y, m] = [Number(v[1]), Number(v[2]), Number(d[2])];
  return courtJuste(q, y + (cibleX(finale(q.text)) - a) * m, 1e-5);
}
function formeEnH(q: Q): string[] {
  const f = fonctionTexte(q.text);
  const a = Number(finale(q.text).match(/f\((-?\d+) \+ h\)/)?.[1]);
  const [v, d] = [f(a), deriveeNum(f, a)];
  return seulChoix(q, (c) => {
    const e = compiler(c.replace(/\$/g, ""));
    const v0 = e({ h: 0 });
    return egal(v0, v, 1e-5) && egal(e({ h: 1 }) - v0, d, 1e-4);
  });
}
function petitNombre(q: Q): string[] {
  const seg = segments(q.text)[0];
  const m = seg.match(/-?\d+\{,\}\d+|\b\d+(?=\))/);
  if (!m) throw new Error(`nombre illisible : ${seg}`);
  const u = lu(m[0]);
  const base = u < 0.5 ? 0 : 1;
  const g = compiler(seg.replace(m[0], "x"));
  const G = (x: number) => g({ x });
  return courtJuste(q, G(base) + (u - base) * deriveeNum(G, base), 1e-5);
}
function tangenteEnA(q: Q): string[] {
  const f = fonctionTexte(q.text);
  const a = Number(q.text.match(/\$a = (-?\d+)\$/)?.[1]);
  return courtJuste(q, f(a) + (cibleX(finale(q.text)) - a) * deriveeNum(f, a), 1e-4);
}
const pointEn = (t: string) => {
  const m = t.match(/en \$(-?\d+)\$/) ?? t.match(/f\((-?\d+) \+ h\)/);
  if (!m) throw new Error(`point illisible : ${t}`);
  return Number(m[1]);
};
function erreur(q: Q): string[] {
  const f = fonctionTexte(q.text);
  const fin = finale(q.text);
  const a = pointEn(fin);
  const x = cibleX(fin);
  return courtJuste(q, Math.abs(f(x) - (f(a) + (x - a) * deriveeNum(f, a))), 1e-4);
}
function tangenteFigure(q: Q): string[] {
  const c = (q.canvas as { courbes: { id: string; a: number; b: number }[]; points: { x: number; y: number }[] }).courbes.find((k) => k.id === "tangente");
  const A = (q.canvas as { points: { x: number; y: number }[] }).points[0];
  if (!c) throw new Error("pas de tangente");
  if (!egal(c.a * A.x + c.b, A.y)) return ["A n'est pas sur la tangente"];
  return courtJuste(q, c.a * cibleX(finale(q.text)) + c.b, 1e-5);
}
function surOuSous(q: Q): string[] {
  const f = fonctionTexte(q.text);
  const fin = finale(q.text);
  const a = pointEn(fin);
  const x = cibleX(fin);
  return corrige(q, f(x) > f(a) + (x - a) * deriveeNum(f, a) ? "Elle est un peu trop petite" : "Elle est un peu trop grande");
}
function contexteApprox(q: Q): string[] {
  const seg = segments(q.text).map((s) => s.match(/^([A-Z])\(x\) = (.+)$/)).find(Boolean);
  if (!seg) throw new Error(`formule illisible : ${q.text}`);
  const c = comp(seg[2]);
  const f = (x: number) => c({ x });
  const fin = finale(q.text);
  const a = pointEn(fin);
  const x = cibleX(fin);
  return courtJuste(q, f(a) + (x - a) * deriveeNum(f, a), 1e-4);
}
function pourcentage(q: Q): string[] {
  const p = q.text.match(/augmente de \$([\d{},]+)\$/);
  if (!p) throw new Error(`pourcentage illisible : ${q.text}`);
  const n = q.text.includes("\\sqrt") ? 0.5 : Number(q.text.match(/\^\{(\d)\}/)?.[1]);
  const P = lu(p[1]);
  const vrai = ((1 + P / 100) ** n - 1) * 100;
  const r = lu(String(q.expected[0]));
  if (Math.abs(r - n * P) > 1e-6) return [`attendu ${r}, recalculé ${n * P}`];
  return Math.abs(r - vrai) < Math.max(0.2, 0.05 * r) ? [] : [`approximation trop loin : ${r} au lieu de ${vrai}`];
}
function deriveeEstimee(q: Q): string[] {
  const v = q.text.match(/f\((-?\d+)\) = (-?\d+)/);
  const w = q.text.match(new RegExp(`f\\((${NB})\\) \\\\approx (${NB})`));
  if (!v || !w) throw new Error(`illisible : ${q.text}`);
  return courtJuste(q, (lu(w[2]) - Number(v[2])) / (lu(w[1]) - Number(v[1])), 1e-4);
}
function hCherche(q: Q): string[] {
  const f = fonctionTexte(q.text);
  const fin = finale(q.text);
  const a = pointEn(fin);
  const c = fin.match(new RegExp(`\\\\approx (${NB})\\$`)) ?? fin.match(new RegExp(`(?:vaille|valeur) \\$(${NB})\\$`));
  if (!c) throw new Error(`valeur visée illisible : ${fin}`);
  return courtJuste(q, (lu(c[1]) - f(a)) / deriveeNum(f, a), 1e-4);
}

export const CORRECTEURS: CorrecteursMaths = {
  ...mq("limite_gauche_droite", {
    1: limiteLue, 2: continuite, 3: continuiteLue, 4: limiteFigure,
    5: parametreContinu, 6: limiteLue, 7: prolongement, 8: limiteInfinie,
    9: parametreContinu, 10: discontinuites, 11: partieEntiere,
  }),
  ...mq("derivabilite_gauche_droite", {
    1: nombreDerive, 2: derivabiliteLue, 3: nombreDerive, 4: tauxDonne,
    5: derivabilite, 6: demiTangente, 7: natureDemiTangente, 8: penteFigure,
    9: parametreDerivable, 10: deuxInconnues, 11: raccordLisse, 12: nombreDerive,
  }),
  ...mq("approximation_affine", {
    1: formule, 2: formeEnH, 3: petitNombre,
    4: tangenteEnA, 5: erreur, 6: tangenteFigure, 7: surOuSous,
    8: contexteApprox, 9: pourcentage, 10: deriveeEstimee, 11: hCherche,
  }),
};
