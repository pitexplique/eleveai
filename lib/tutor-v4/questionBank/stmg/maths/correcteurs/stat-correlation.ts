// Correcteurs de la covariance, du coefficient de corrélation et des droites de régression : ils relisent
// le tableau, le nuage ou les valeurs écrites, recalculent et n'utilisent aucune valeur du gabarit.
import type { CorrecteursMaths } from "@/lib/tutor-v4/questionBank/4e/maths/correcteurs/types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { compiler, proche, seulChoix } from "../../../lycee-correcteurs-commun";

type Q = TutorGeneratedQuestionV4;
const nu = (s: string) => Number(String(s).replace(/\s/g, "").replace("{,}", ".").replace(",", "."));
const moy = (l: number[]) => l.reduce((s, x) => s + x, 0) / l.length;
const vr = (l: number[]) => moy(l.map((x) => x * x)) - moy(l) ** 2;

/** La série lue dans le tableau (les deux lignes) ou dans le nuage. */
function serie(q: Q) {
  const c = q.canvas as any;
  if (c?.kind === "tableau_donnees") return { xs: c.rows[0].values as number[], ys: c.rows[1].values as number[] };
  if (c?.kind === "fonctionGraphique") return { xs: c.points.map((p: any) => p.x) as number[], ys: c.points.map((p: any) => p.y) as number[] };
  throw new Error("ni tableau ni nuage");
}
const covar = (s: { xs: number[]; ys: number[] }) => moy(s.xs.map((x, i) => x * s.ys[i])) - moy(s.xs) * moy(s.ys);
const coefR = (s: { xs: number[]; ys: number[] }) => covar(s) / Math.sqrt(vr(s.xs) * vr(s.ys));
const pente = (s: { xs: number[]; ys: number[] }) => covar(s) / vr(s.xs);
const accepte = (q: Q, v: number, tol = 1e-5) => (proche(nu(q.expected[0]), v, tol) ? [] : [`attendu ${q.expected[0]}, recalculé ${v}`]);
/** Une valeur écrite dans le texte, repérée par ce qui la précède. */
function lu(t: string, nom: string) {
  const i = t.indexOf(`${nom} = `);
  if (i < 0) throw new Error(`${nom} illisible : ${t}`);
  const m = t.slice(i + nom.length + 3).match(/^-?[\d{},]+/);
  if (!m) throw new Error(`${nom} illisible : ${t}`);
  return nu(m[0]);
}
const COV = "\\mathrm{cov}(x,y)";
const SX = "\\sigma_{x}";
const SY = "\\sigma_{y}";
const VX = "V(x)";
const VY = "V(y)";
const MX = "\\overline{x}";
const MY = "\\overline{y}";
const PROD = "\\dfrac{1}{n}\\sum x_{i}y_{i}";

/** L'arrondi au centième, avec ses seuls voisins immédiats en plus. */
function arrondi(q: Q, v: number): string[] {
  if (!/centième/.test(q.text)) return ["précision non annoncée"];
  const r = Math.round(v * 100) / 100;
  if (!proche(nu(q.expected[0]), r, 1e-6)) return [`attendu ${q.expected[0]}, recalculé ${v}`];
  if (q.expected.slice(1).some((e) => Math.abs(nu(e) - r) > 0.01 + 1e-9)) return [`tolérance fausse : ${q.expected.join(" / ")}`];
  return [];
}
const juste = (q: Q, j: string) => (q.expected[0] === j ? [] : [`attendu ${q.expected[0]}, recalculé ${j}`]);

/** Une formule proposée : on y met de vraies valeurs de série, et on compare au résultat de référence. */
const VRAIES = { xs: [2, 4, 6, 8, 11], ys: [30, 28, 37, 41, 40] };
function formule(q: Q, cible: number): string[] {
  const n = VRAIES.xs.length;
  const somme = VRAIES.xs.reduce((s, x, i) => s + x * VRAIES.ys[i], 0);
  const remplace = (c: string) =>
    c
      .replace(/\$/g, "")
      .replaceAll(PROD, `(${somme / n})`)
      .replaceAll("\\sum x_{i}y_{i}", `(${somme})`)
      .replaceAll(COV, `(${covar(VRAIES)})`)
      .replaceAll(SX, `(${Math.sqrt(vr(VRAIES.xs))})`)
      .replaceAll(SY, `(${Math.sqrt(vr(VRAIES.ys))})`)
      .replaceAll(VX, `(${vr(VRAIES.xs)})`)
      .replaceAll(VY, `(${vr(VRAIES.ys)})`)
      .replaceAll(MX, `(${moy(VRAIES.xs)})`)
      .replaceAll(MY, `(${moy(VRAIES.ys)})`);
  return seulChoix(q, (c) => proche(compiler(remplace(c))({}), cible, 1e-6));
}

/* ───────────── covariance ───────────── */

const moyenneProduits = (q: Q) => accepte(q, moy(serie(q).xs.map((x, i) => x * serie(q).ys[i])));
const covDepuisValeurs = (q: Q) => accepte(q, lu(q.text, PROD) - lu(q.text, MX) * lu(q.text, MY));
const formuleCov = (q: Q) => formule(q, covar(VRAIES));
function signeCov(q: Q): string[] {
  const c = lu(q.text, COV);
  return juste(q, c > 0 ? "$y$ a tendance à augmenter quand $x$ augmente" : "$y$ a tendance à diminuer quand $x$ augmente");
}
function covTableau(q: Q): string[] {
  const s = serie(q);
  if (/\\overline\{x\} = /.test(q.text) && !(proche(lu(q.text, MX), moy(s.xs)) && proche(lu(q.text, MY), moy(s.ys)))) return ["les moyennes données sont fausses"];
  return accepte(q, covar(s));
}
const signeNuage = (q: Q) => juste(q, covar(serie(q)) > 0 ? "Positive" : "Négative");
const varianceX = (q: Q) => accepte(q, vr(serie(q).xs));
function sensContexte(q: Q): string[] {
  const c = q.canvas as any;
  const [nx, ny] = [c.rows[0].label, c.rows[1].label];
  return juste(q, `Quand « ${nx} » augmente, « ${ny} » a tendance à ${covar(serie(q)) > 0 ? "augmenter" : "diminuer"}`);
}
function changementX(q: Q): string[] {
  const c = lu(q.text, COV);
  const n = [...q.text.matchAll(/\$(\d+)\$/g)];
  if (!n.length) throw new Error(`transformation illisible : ${q.text}`);
  return accepte(q, /multipli/.test(q.text) ? c * Number(n[n.length - 1][1]) : c);
}

/* ───────────── coefficient de corrélation ───────────── */

const formuleR = (q: Q) => formule(q, coefR(VRAIES));
const rDepuisEcarts = (q: Q) => accepte(q, lu(q.text, COV) / (lu(q.text, SX) * lu(q.text, SY)));
function lectureR(q: Q): string[] {
  const r = lu(q.text, "r");
  return juste(q, Math.abs(r) < 0.5 ? "Liaison linéaire très faible" : r > 0 ? "Forte liaison linéaire croissante" : "Forte liaison linéaire décroissante");
}
const impossible = (q: Q) => seulChoix(q, (c) => Math.abs(nu(c.replace(/\$/g, ""))) > 1);
const rTableau = (q: Q) => arrondi(q, coefR(serie(q)));
const rVariances = (q: Q) => arrondi(q, lu(q.text, COV) / Math.sqrt(lu(q.text, VX) * lu(q.text, VY)));
function plusForte(q: Q): string[] {
  const v = (q.choices ?? []).map((c) => Math.abs(nu(c.replace(/\$|r = /g, ""))));
  const max = Math.max(...v);
  return seulChoix(q, (c) => proche(Math.abs(nu(c.replace(/\$|r = /g, ""))), max));
}
const signeR = (q: Q) => juste(q, lu(q.text, COV) > 0 ? "Positif" : "Négatif");
/** Une corrélation seule ne prouve jamais une cause : la réponse doit être un « non » qui le dit. */
const pasDeCause = (q: Q) => seulChoix(q, (c) => /^Non : un troisième facteur/.test(c));
function aligne(q: Q): string[] {
  const s = serie(q);
  const r = coefR(s);
  if (!proche(Math.abs(r), 1, 1e-9)) return [`points non alignés : r = ${r}`];
  return accepte(q, Math.round(r));
}

/* ───────────── droites de régression ───────────── */

const formuleA = (q: Q) => formule(q, pente(VRAIES));
const aDepuisValeurs = (q: Q) => accepte(q, lu(q.text, COV) / lu(q.text, VX));
const bDepuisValeurs = (q: Q) => accepte(q, lu(q.text, MY) - lu(q.text, "a") * lu(q.text, MX));
/** Une droite proposée « y = 2x + 3 » : on l'évalue. */
const droite = (c: string) => {
  const f = compiler(c.replace(/\$/g, "").replace(/^y = /, ""));
  return (x: number) => f({ x });
};
function parPointMoyen(q: Q): string[] {
  const m = q.text.match(/G\((\d+)\\,;(\d+)\)/);
  let g: [number, number];
  if (m) g = [Number(m[1]), Number(m[2])];
  else g = [lu(q.text, MX), lu(q.text, MY)];
  return seulChoix(q, (c) => proche(droite(c)(g[0]), g[1], 1e-6));
}
const aTableau = (q: Q) => accepte(q, pente(serie(q)));
const bTableau = (q: Q) => {
  const s = serie(q);
  return accepte(q, moy(s.ys) - pente(s) * moy(s.xs));
};
function droiteTableau(q: Q): string[] {
  const s = serie(q);
  const a = pente(s);
  const b = moy(s.ys) - a * moy(s.xs);
  return seulChoix(q, (c) => {
    const d = droite(c);
    return proche(d(0), b, 1e-5) && proche(d(1) - d(0), a, 1e-5);
  });
}
const aPrime = (q: Q) => accepte(q, lu(q.text, COV) / lu(q.text, VY));
function prevision(q: Q): string[] {
  const s = serie(q);
  const a = pente(s);
  const b = moy(s.ys) - a * moy(s.xs);
  return accepte(q, a * lu(q.text, "x") + b);
}
function previsionValeurs(q: Q): string[] {
  const a = lu(q.text, COV) / lu(q.text, VX);
  const b = lu(q.text, MY) - a * lu(q.text, MX);
  return accepte(q, a * lu(q.text, "x") + b);
}
function rParPentes(q: Q): string[] {
  const a = lu(q.text, "a");
  const b = lu(q.text, "a'");
  if (a * b <= 0) return ["pentes de signes contraires"];
  return arrondi(q, Math.sign(a) * Math.sqrt(a * b));
}

const avec = (micro: string, l: Record<number, (q: Q) => string[]>) => Object.fromEntries(Object.entries(l).map(([n, c]) => [`stmg_${micro}_tpl_${n}`, c]));

export const CORRECTEURS: CorrecteursMaths = {
  ...avec("stat_covariance", { 1: moyenneProduits, 2: covDepuisValeurs, 3: formuleCov, 4: signeCov, 5: covTableau, 6: covTableau, 7: signeNuage, 8: varianceX, 9: covTableau, 10: sensContexte, 11: changementX }),
  ...avec("stat_correlation_r", { 1: formuleR, 2: rDepuisEcarts, 3: lectureR, 4: impossible, 5: rTableau, 6: rVariances, 7: plusForte, 8: signeR, 9: rTableau, 10: pasDeCause, 11: aligne }),
  ...avec("stat_regression_formules", { 1: formuleA, 2: aDepuisValeurs, 3: bDepuisValeurs, 4: parPointMoyen, 5: aTableau, 6: bTableau, 7: droiteTableau, 8: aPrime, 9: prevision, 10: previsionValeurs, 11: rParPentes }),
};
