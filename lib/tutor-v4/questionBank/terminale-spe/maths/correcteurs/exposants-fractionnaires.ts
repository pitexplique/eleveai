// Correcteurs des exposants fractionnaires : ils relisent l'écriture de l'énoncé et de
// chaque proposition, l'évaluent et n'utilisent aucune valeur du gabarit.
import type { CorrecteursMaths } from "@/lib/tutor-v4/questionBank/4e/maths/correcteurs/types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { compiler, deriveeNum, nue, proche, seulChoix, type Env } from "../../../lycee-correcteurs-commun";

type Q = TutorGeneratedQuestionV4;
const P = "tle_expo_ratio_";

/** `\sqrt[n]{…}` devient `(…)^{\frac{1}{n}}`, imbrications comprises. */
function sansRacines(s: string): string {
  const d = s.indexOf("\\sqrt[");
  if (d < 0) return s;
  const fin = s.indexOf("]", d);
  const n = s.slice(d + 6, fin);
  let niveau = 0;
  let k = fin + 1;
  for (; k < s.length; k++) {
    if (s[k] === "{") niveau++;
    if (s[k] === "}" && --niveau === 0) break;
  }
  return sansRacines(`${s.slice(0, d)}(${s.slice(fin + 2, k)})^{\\frac{1}{${n}}}${s.slice(k + 1)}`);
}
/* Les lettres valent 1,7 : assez loin de 1 pour séparer les exposants. */
const LETTRES: Env = { x: 1.7, a: 1.7, t: 1.7, y: 1.7, u: 1.7, n: 1.7 };
const V = (src: string, env: Env = LETTRES) => compiler(sansRacines(src))(env);
const segments = (t: string) => t.split("$").filter((_, i) => i % 2 === 1);
const lu = (s: string) => Number(String(s).replace(/\s/g, "").replace(",", "."));
/** Ce qu'il faut évaluer : la première écriture qui n'est pas « x > 0 ». */
const cible = (q: Q) => {
  const s = segments(q.text).find((x) => !x.includes(">"));
  if (!s) throw new Error(`rien à évaluer : ${q.text}`);
  return s;
};

/** Réponse courte = la valeur ; QCM = l'unique proposition qui a cette valeur. */
function valeurJuste(q: Q): string[] {
  const v = V(cible(q));
  if (!Number.isFinite(v)) return [`valeur non définie : ${cible(q)}`];
  if (q.format !== "qcm") return proche(lu(String(q.expected[0])), v, 1e-5) ? [] : [`attendu ${q.expected[0]}, recalculé ${v}`];
  return seulChoix(q, (c) => proche(V(nue(c)), v, 1e-7));
}

/** L'équation de l'énoncé : on remplace la lettre par la réponse. */
function equationJuste(q: Q): string[] {
  const seg = segments(q.text).find((s) => s.includes("=") && !s.includes(">"));
  if (!seg) throw new Error(`pas d'équation : ${q.text}`);
  const [g, d] = seg.split("=");
  const lettre = g.replace(/\\[a-zA-Z]+/g, "").match(/[a-z]/)?.[0];
  if (!lettre) throw new Error(`pas de lettre : ${seg}`);
  const x = lu(String(q.expected[0]));
  if (x <= 0) return [`solution non positive : ${x}`];
  const env = { [lettre]: x };
  return proche(V(g, env), V(d, env), 1e-6) ? [] : [`${seg} faux pour ${lettre} = ${x}`];
}

/** Une proposition « A = B » est juste si les deux membres ont la même valeur. */
function egaliteVraie(q: Q): string[] {
  return seulChoix(q, (c) => {
    const [g, d] = nueEgalite(c);
    return proche(V(g), V(d), 1e-7);
  });
}
const nueEgalite = (c: string) => {
  const m = c.replace(/\$/g, "").split(" = ");
  if (m.length !== 2) throw new Error(`pas une égalité : ${c}`);
  return m as [string, string];
};

/** Une seule écriture n'existe pas, ou le bon ensemble de définition. */
function definition(q: Q): string[] {
  const fn = segments(q.text).find((s) => s.includes("\\mapsto"));
  const f = fn?.split("\\mapsto")[1];
  const expressionSeule = segments(q.text).find((s) => /\^\{/.test(s));
  const src = f ?? expressionSeule;
  if (src) {
    const lettre = src.replace(/\\[a-zA-Z]+/g, "").match(/[a-z]/)?.[0] ?? "x";
    const en = (x: number) => V(src, { [lettre]: x });
    if (!Number.isFinite(en(-1)) && !Number.isFinite(en(1)) ) return ["jamais définie"];
    const zeroOk = Number.isFinite(en(0));
    const negOk = Number.isFinite(en(-1));
    if (negOk) return [`définie pour un négatif : ${src}`];
    const juste = zeroOk ? "$[0\\,;+\\infty[$" : "$]0\\,;+\\infty[$";
    return q.expected[0] === juste ? [] : [`attendu ${q.expected[0]}, recalculé ${juste}`];
  }
  return seulChoix(q, (c) => !Number.isFinite(V(nue(c))));
}

/** Le plus grand ou le plus petit des quatre. */
function superlatifJuste(q: Q): string[] {
  const grand = /plus grand/.test(q.text);
  if (!grand && !/plus petit/.test(q.text)) throw new Error(`question illisible : ${q.text}`);
  const vals = (q.choices ?? []).map((c) => ({ c, v: V(nue(c)) }));
  vals.sort((a, b) => a.v - b.v);
  const b = grand ? vals[vals.length - 1] : vals[0];
  if (Math.abs(vals[1].v - vals[0].v) < 0.01 || Math.abs(vals[3].v - vals[2].v) < 0.01) return ["valeurs trop proches"];
  return b.c === q.expected[0] ? [] : [`attendu ${q.expected[0]}, recalculé ${b.c}`];
}

/** Sans espace ni virgule décimale : la valeur écrite à droite d'une égalité. */
const nombreLu = (s: string) => {
  const n = s.replace(/\\,/g, "").replace(/\{,\}/g, ".").trim();
  return /^-?\d+(\.\d+)?$/.test(n) ? Number(n) : null;
};
function lireContexte(q: Q) {
  const env: Env = {};
  const formules: [string, string][] = [];
  for (const s of segments(q.text)) {
    const m = s.match(/^([A-Za-z]) = (.+)$/);
    if (!m) continue;
    const n = nombreLu(m[2]);
    if (n !== null) env[m[1]] = n;
    else formules.push([m[1], m[2]]);
  }
  if (formules.length !== 1) throw new Error(`formule illisible : ${q.text}`);
  return { env, sortie: formules[0][0], expr: formules[0][1] };
}
/** « Y = formule » avec X donné : on recalcule Y. */
function contexteDirect(q: Q): string[] {
  const { env, expr } = lireContexte(q);
  const v = V(expr, env);
  return proche(lu(String(q.expected[0])), v, 1e-5) ? [] : [`attendu ${q.expected[0]}, recalculé ${v}`];
}
/** « Y = formule » avec Y mesuré : la réponse, remise dans la formule, redonne Y. */
function contexteInverse(q: Q): string[] {
  const { env, sortie, expr } = lireContexte(q);
  const inconnue = expr.replace(/\\[a-zA-Z]+/g, "").match(/[A-Za-z]/)?.[0];
  if (!inconnue) throw new Error(`pas d'inconnue : ${expr}`);
  const x = lu(String(q.expected[0]));
  const v = V(expr, { ...env, [inconnue]: x });
  return proche(v, env[sortie], 1e-6) ? [] : [`${sortie} = ${v}, mesuré ${env[sortie]}`];
}

/** « En n ans », « C fois sa valeur » : la réponse à la puissance n redonne C. */
function coefficientMoyen(q: Q): string[] {
  const n = q.text.match(/(\d) ans/);
  const C = q.text.match(/([\d,]+) fois/);
  if (!n || !C) throw new Error(`illisible : ${q.text}`);
  const v = lu(String(q.expected[0])) ** Number(n[1]);
  return proche(v, lu(C[1]), 1e-6) ? [] : [`${v} au lieu de ${C[1]}`];
}

/** L'égalité à trous : le carré reçoit la réponse, l'égalité doit tenir pour plusieurs valeurs. */
function changementDeBase(q: Q): string[] {
  const seg = segments(q.text).find((s) => s.includes("=") && s.includes("\\square"));
  if (!seg) throw new Error(`pas d'égalité à trou : ${q.text}`);
  const r = lu(String(q.expected[0]));
  const [g, d] = seg.replace("\\square", `(${r})`).split("=");
  for (const x of [0.7, 1.3, 2.1]) {
    const env = { x, t: x, n: x };
    if (!proche(V(g, env), V(d, env), 1e-5)) return [`${seg} faux pour ${r}`];
  }
  return [];
}

/** « 8^{x} = 4 » : la bonne proposition, mise en exposant, redonne le second membre. */
function equationExponentielle(q: Q): string[] {
  const seg = segments(q.text).find((s) => s.includes("="));
  const m = seg?.match(/^(\d+)\^\{[a-z]\} = (.+)$/);
  if (!m) throw new Error(`équation illisible : ${q.text}`);
  const base = Number(m[1]);
  const droite = V(m[2]);
  return seulChoix(q, (c) => proche(base ** V(nue(c)), droite, 1e-7));
}

const POINTS = [0.6, 1.3, 2.1, 3.7];
const fonctionDe = (q: Q) => {
  const m = segments(q.text).map((s) => s.match(/^[fgh]\(x\) = (.+)$/)).find(Boolean);
  if (!m) throw new Error(`fonction illisible : ${q.text}`);
  return (x: number) => V(m[1], { x });
};
/** La proposition dont la valeur suit la dérivée numérique en plusieurs points. */
function deriveeJuste(q: Q): string[] {
  const f = fonctionDe(q);
  return seulChoix(q, (c) => POINTS.every((x) => proche(V(nue(c), { x }), deriveeNum(f, x), 1e-5)));
}
/** Le sens de variation mesuré sur une grille de ]0 ; +∞[. */
function sensJuste(q: Q): string[] {
  const f = fonctionDe(q);
  let s = 0;
  for (let k = 1; k < 200; k++) {
    const d = f(k * 0.05 + 0.05) - f(k * 0.05);
    if (s && Math.sign(d) !== s) return ["non monotone"];
    s = Math.sign(d);
  }
  const juste = s > 0 ? "Strictement croissante" : "Strictement décroissante";
  return q.expected[0] === juste ? [] : [`attendu ${q.expected[0]}, recalculé ${juste}`];
}
/** La puissance comparée à sa base : les deux écritures sont relues dans l'énoncé. */
function comparaisonBase(q: Q): string[] {
  const seg = segments(q.text);
  const puissance = seg.find((s) => s.includes("^"));
  const base = seg.find((s) => !s.includes("^"));
  if (!puissance || !base) throw new Error(`illisible : ${q.text}`);
  const juste = `${V(puissance) > V(base) ? "Plus grand" : "Plus petit"} que $${base}$`;
  return q.expected[0] === juste ? [] : [`attendu ${q.expected[0]}, recalculé ${juste}`];
}
/** « proportionnel à X^{p/q} », « multiplié par k » : la réponse vaut k^(p/q). */
function loiEchelle(q: Q): string[] {
  const e = q.text.match(/\^\{\\frac\{(\d+)\}\{(\d+)\}\}/);
  const k = q.text.match(/multipliée? par (\d+)/);
  if (!e || !k) throw new Error(`illisible : ${q.text}`);
  const v = Number(k[1]) ** (Number(e[1]) / Number(e[2]));
  return proche(lu(String(q.expected[0])), v, 1e-6) ? [] : [`attendu ${q.expected[0]}, recalculé ${v}`];
}

const mq = (micro: string, l: Record<number, (q: Q) => string[]>) =>
  Object.fromEntries(Object.entries(l).map(([n, c]) => [`${P}${micro}_tpl_${n}`, c]));

export const CORRECTEURS: CorrecteursMaths = {
  ...mq("racine", {
    1: valeurJuste, 2: valeurJuste, 3: valeurJuste, 4: equationJuste,
    5: valeurJuste, 6: egaliteVraie, 7: valeurJuste, 8: definition,
    9: contexteDirect, 10: equationJuste, 11: superlatifJuste, 12: coefficientMoyen,
  }),
  ...mq("calcul", {
    1: valeurJuste, 2: valeurJuste, 3: valeurJuste, 4: valeurJuste,
    5: valeurJuste, 6: valeurJuste, 7: valeurJuste, 8: valeurJuste, 9: egaliteVraie,
    10: contexteDirect, 11: equationJuste, 12: contexteInverse, 13: superlatifJuste,
  }),
  ...mq("regles", {
    1: valeurJuste, 2: valeurJuste, 3: valeurJuste, 4: valeurJuste,
    5: valeurJuste, 6: changementDeBase, 7: valeurJuste, 8: valeurJuste,
    9: equationExponentielle, 10: deriveeJuste, 11: sensJuste, 12: comparaisonBase, 13: loiEchelle,
  }),
};
