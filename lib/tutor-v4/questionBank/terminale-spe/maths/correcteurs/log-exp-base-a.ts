// Correcteurs du logarithme et de l'exponentielle de base a : les écritures \log_{a}(…) sont traduites
// en ln ÷ ln, puis évaluées ; aucune valeur du gabarit n'est reprise.
import type { CorrecteursMaths } from "@/lib/tutor-v4/questionBank/4e/maths/correcteurs/types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { compiler, deriveeNum, proche, seulChoix, type Env } from "../../../lycee-correcteurs-commun";

type Q = TutorGeneratedQuestionV4;
const segments = (t: string) => t.split("$").filter((_, i) => i % 2 === 1);
const nu = (s: string) => Number(s.replace(/\s/g, "").replace(",", "."));

/** Le contenu des parenthèses qui commencent en `i`. */
function fermante(s: string, i: number) {
  let n = 0;
  for (let k = i; k < s.length; k++) {
    if (s[k] === "(") n++;
    if (s[k] === ")" && --n === 0) return k;
  }
  throw new Error(`parenthèse non fermée : ${s}`);
}
/** `\log_{a}(x)` devient `(\ln(x)/\ln(a))`, imbrications comprises. */
function sansLog(src: string): string {
  const d = src.indexOf("\\log_{");
  if (d < 0) return src;
  const f = src.indexOf("}", d);
  const base = src.slice(d + 6, f);
  if (src[f + 1] !== "(") throw new Error(`log sans parenthèse : ${src}`);
  const g = fermante(src, f + 1);
  return sansLog(`${src.slice(0, d)}(\\ln(${src.slice(f + 2, g)})/\\ln(${base}))${src.slice(g + 1)}`);
}
/** Les espaces fines de milliers et les limites ne gênent pas le compilateur. */
const ecrit = (s: string) => sansLog(s.replace(/\$/g, "").replace(/(\d)\\,(?=\d{3})/g, "$1"));
const V = (s: string, env: Env = {}) => compiler(ecrit(s))(env);
const LETTRES: Env = { x: 1.7, t: 1.7, u: 1.7, y: 2.1, v: 2.3, p: 2.9, q: 2.3, s: 2.9 };

/** Réponse courte : la première écriture de l'énoncé qui se calcule, évaluée. */
function valeur(q: Q): string[] {
  const s = segments(q.text).find((x) => x.includes("\\log_"));
  if (!s) throw new Error(`pas de log : ${q.text}`);
  const v = V(s);
  const juste = q.expected.some((e) => {
    const m = e.match(/^(-?\d+)\/(\d+)$/);
    return proche(m ? Number(m[1]) / Number(m[2]) : nu(e), v, 1e-7);
  });
  return juste ? [] : [`attendu ${q.expected.join(" / ")}, recalculé ${v}`];
}
/** La fraction attendue doit être réduite : une réponse juste ne se refuse pas à l'écriture. */
function valeurFraction(q: Q): string[] {
  const m = q.expected[0].match(/^(\d+)\/(\d+)$/);
  if (!m) return [`fraction attendue : ${q.expected[0]}`];
  const g = (a: number, b: number): number => (b ? g(b, a % b) : a);
  if (g(+m[1], +m[2]) !== 1) return [`fraction non réduite : ${q.expected[0]}`];
  return valeur(q);
}
/** Réponse arrondie : la précision est lue dans le texte. */
function arrondi(q: Q, v: number): string[] {
  const p = /centième/.test(q.text) ? 0.01 : /dixième/.test(q.text) ? 0.1 : 1;
  return proche(nu(q.expected[0]), Math.round(v / p) * p, 1e-6) ? [] : [`attendu ${q.expected[0]}, recalculé ${v}`];
}
function valeurArrondie(q: Q): string[] {
  const s = segments(q.text).find((x) => x.includes("\\log_"));
  if (!s) throw new Error(`pas de log : ${q.text}`);
  return arrondi(q, V(s));
}
/** Une proposition vaut l'écriture de l'énoncé, pour des lettres prises au hasard. */
function memeValeur(q: Q, cible: string, env: Env = LETTRES): string[] {
  const v = V(cible, env);
  return seulChoix(q, (c) => proche(V(c, env), v, 1e-7));
}
/** La dernière écriture contenant `\log_` ou une puissance : ce qu'il faut transformer. */
function aTransformer(q: Q) {
  const s = segments(q.text).filter((x) => /\\log_|\^/.test(x) && !x.includes(">"));
  if (!s.length) throw new Error(`rien à transformer : ${q.text}`);
  return s[s.length - 1];
}
const transformation = (q: Q) => memeValeur(q, aTransformer(q));
/** log_a(x) = n : on repasse à la puissance, la proposition doit le dire exactement. */
function equivalence(q: Q): string[] {
  const m = q.text.match(/\\log_\{(\d+)\}\((\d+)\) = (\d+)/);
  if (!m) throw new Error(`égalité illisible : ${q.text}`);
  return seulChoix(q, (c) => {
    const e = c.replace(/\$/g, "").match(/^(\d+)\^\{(\d+)\} = (\d+)$/);
    return !!e && e[1] === m[1] && e[2] === m[3] && e[3] === m[2];
  });
}
function encadrement(q: Q): string[] {
  const s = segments(q.text).find((x) => x.includes("\\log_"));
  if (!s) throw new Error(`pas de log : ${q.text}`);
  const v = V(s);
  return seulChoix(q, (c) => {
    const [a, b] = segments(c).map(Number);
    return a < v && v < b && b === a + 1;
  });
}
/** Le modèle : « Q = … » et « x = … » sont écrits dans l'énoncé. */
function modele(q: Q): string[] {
  const f = q.text.match(/\$Q = ([^$]+)\$/);
  const x = q.text.match(/\$x = ([^$]+)\$/);
  if (!f || !x) throw new Error(`modèle illisible : ${q.text}`);
  const X = V(x[1]);
  const v = V(f[1], { x: X });
  const arr = /dixième/.test(q.text);
  const p = arr ? 0.1 : 1;
  if (!arr && Math.abs(v - Math.round(v * 10) / 10) > 1e-9) return [`valeur non juste : ${v}`];
  return proche(nu(q.expected[0]), arr ? Math.round(v / p) * p : v, 1e-6) ? [] : [`attendu ${q.expected[0]}, recalculé ${v}`];
}
function superlatif(q: Q): string[] {
  const vals = (q.choices ?? []).map((c) => V(c));
  const cible = /plus grand|plus élevé/.test(q.text) ? Math.max(...vals) : Math.min(...vals);
  return seulChoix(q, (c) => proche(V(c), cible, 1e-9));
}
/** L'équation est écrite : on y remplace la lettre par la réponse. */
function equation(q: Q): string[] {
  const seg = segments(q.text).find((s) => /\\log_/.test(s) && s.includes("="));
  if (!seg) throw new Error(`équation illisible : ${q.text}`);
  const [g, d] = seg.split(" = ");
  const lettre = g.replace(/\\[a-zA-Z]+/g, "").replace(/\{[^}]*\}/, "").match(/[a-z]/)?.[0];
  if (!lettre) throw new Error(`lettre illisible : ${seg}`);
  const x = nu(q.expected[0]);
  return proche(V(g, { [lettre]: x }), V(d), 1e-7) ? [] : [`${seg} faux pour ${x}`];
}
/** a^x = b : relu dans le texte, solution par ln. */
function equationExpo(q: Q): string[] {
  const m = q.text.match(/\$([\d{},]+)\^\{x\} = (\d+)\$/);
  if (!m) throw new Error(`équation illisible : ${q.text}`);
  return arrondi(q, Math.log(Number(m[2])) / Math.log(Number(m[1].replace("{,}", "."))));
}
/** L'inéquation : on teste l'ensemble proposé contre des valeurs de part et d'autre de la borne. */
function inequation(q: Q): string[] {
  const m = q.text.match(/\\log_\{([\d{},]+)\}\(([a-z])\) ([<>]) (\d+)/);
  if (!m) throw new Error(`inéquation illisible : ${q.text}`);
  const base = Number(m[1].replace("{,}", "."));
  const f = (x: number) => Math.log(x) / Math.log(base);
  const n = Number(m[4]);
  const vrai = (x: number) => (m[3] === ">" ? f(x) > n : f(x) < n);
  const borne = base ** n;
  const G = vrai(borne * 1.1);
  const D = vrai(borne * 0.9);
  if (G === D) return ["ensemble illisible"];
  return seulChoix(q, (c) => (G ? /^\$\]/.test(c) && /\+\\infty\[\$$/.test(c) : /^\$\]0\\,;/.test(c)));
}
/** La dérivée numérique de l'écriture de l'énoncé, comparée à chaque proposition. */
function derivee(q: Q): string[] {
  const m = q.text.match(/\$([a-z])\(x\) = ([^$]+)\$/);
  if (!m) throw new Error(`fonction illisible : ${q.text}`);
  const f = compiler(m[2]);
  const d = deriveeNum((x) => f({ x }), 0.7);
  return seulChoix(q, (c) => proche(V(c, { x: 0.7 }) / d, 1, 1e-5));
}
function variations(q: Q): string[] {
  const m = q.text.match(/\$(?:[a-z]\(x\) = )?([^$]*\^\{x\})\$/);
  if (!m) throw new Error(`fonction illisible : ${q.text}`);
  const f = compiler(m[1]);
  const j = f({ x: 2 }) > f({ x: 1 }) ? "Strictement croissante" : "Strictement décroissante";
  return q.expected[0] === j ? [] : [`attendu ${q.expected[0]}, recalculé ${j}`];
}
function image(q: Q): string[] {
  const m = q.text.match(/\$[a-z]\(x\) = (\d+)\^\{x\}\$/);
  const x = q.text.match(/(?:[a-z]\((-?\d+)\)|l'image de \$(-?\d+)\$)/);
  if (!m || !x) throw new Error(`illisible : ${q.text}`);
  const v = Number(m[1]) ** Number(x[1] ?? x[2]);
  const r = q.expected[0].match(/^1\/(\d+)$/);
  const lu = r ? 1 / Number(r[1]) : nu(q.expected[0]);
  return proche(lu, v, 1e-9) ? [] : [`attendu ${q.expected[0]}, recalculé ${v}`];
}
function nombreDerive(q: Q): string[] {
  const m = q.text.match(/\$[a-z]\(x\) = ([^$]+)\$/);
  const x = q.text.match(/(?:'\((-?\d+)\)|en \$(-?\d+)\$)/);
  if (!m || !x) throw new Error(`illisible : ${q.text}`);
  const f = compiler(m[1]);
  return arrondi(q, deriveeNum((t) => f({ x: t }), Number(x[1] ?? x[2]), 1e-6));
}
function limite(q: Q): string[] {
  const m = q.text.match(/(?:\\left\(([\d{},]+)\\right\)|(\d+))\^\{x\}/);
  if (!m) throw new Error(`base illisible : ${q.text}`);
  const a = Number((m[1] ?? m[2]).replace("{,}", "."));
  const plus = q.text.includes("+\\infty");
  const j = (a > 1) === plus ? "$+\\infty$" : "$0$";
  return q.expected[0] === j ? [] : [`attendu ${q.expected[0]}, recalculé ${j}`];
}
function vitesse(q: Q): string[] {
  const m = q.text.match(/\$([A-Z])\(t\) = ([^$]+)\$/);
  const t = q.text.match(/'\((\d+)\)/);
  if (!m || !t) throw new Error(`illisible : ${q.text}`);
  const f = compiler(m[2]);
  return arrondi(q, deriveeNum((x) => f({ t: x }), Number(t[1]), 1e-6));
}
function tangente(q: Q): string[] {
  const m = q.text.match(/\$[a-z]\(x\) = (\d+)\^\{x\}\$/);
  if (!m) throw new Error(`illisible : ${q.text}`);
  const a = Number(m[1]);
  const droite = (c: string) => compiler(ecrit(c).replace(/^y = /, ""));
  return seulChoix(q, (c) => {
    const d = droite(c);
    const y0 = d({ x: 0 });
    return proche(y0, 1) && proche(d({ x: 1 }) - y0, Math.log(a));
  });
}
function seuil(q: Q): string[] {
  const m = q.text.match(/\$([A-Z])\(t\) = ([^$]+)\$/);
  const s = q.text.match(/\\(geqslant|leqslant) (\d+)\$/);
  if (!m || !s) throw new Error(`illisible : ${q.text}`);
  const f = compiler(m[2]);
  const ok = (t: number) => (s[1] === "geqslant" ? f({ t }) >= Number(s[2]) : f({ t }) <= Number(s[2]));
  let t = 0;
  while (!ok(t) && t < 1000) t++;
  return Number(q.expected[0]) === t ? [] : [`attendu ${q.expected[0]}, recalculé ${t}`];
}
/** Le logarithme d'un nombre tiré : la valeur de `p` est relue dans le texte. */
function exprimerP(q: Q): string[] {
  const m = q.text.match(/\$([pqr]) = (\\log_\{\d+\}\(\d+\))\$/);
  if (!m) throw new Error(`illisible : ${q.text}`);
  const p = V(m[2]);
  const cibles = segments(q.text).filter((s) => s.includes("\\log_") && !s.includes("="));
  const c = cibles[cibles.length - 1];
  const v = V(c);
  return seulChoix(q, (x) => proche(V(x, { [m[1]]: p }), v, 1e-7));
}

const avec = (micro: string, l: Record<number, (q: Q) => string[]>) => Object.fromEntries(Object.entries(l).map(([n, c]) => [`tle_${micro}_tpl_${n}`, c]));

export const CORRECTEURS: CorrecteursMaths = {
  ...avec("log_base_calcul", { 11: valeur, 1: valeur, 2: valeur, 3: transformation, 4: equivalence, 5: valeurFraction, 6: valeurArrondie, 7: valeur, 8: encadrement, 9: modele, 10: superlatif }),
  ...avec("log_base_proprietes", { 1: transformation, 2: transformation, 3: valeur, 4: valeur, 5: valeur, 6: transformation, 7: exprimerP, 8: equation, 9: equation, 10: equationExpo, 11: inequation }),
  ...avec("exp_base_a", { 1: transformation, 2: derivee, 3: variations, 4: image, 5: nombreDerive, 6: derivee, 7: limite, 8: transformation, 9: vitesse, 10: tangente, 11: seuil }),
};
