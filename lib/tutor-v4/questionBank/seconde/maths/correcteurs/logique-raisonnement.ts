// Correcteurs de logique : parité recalculée, vérité balayée sur une grille de nombres.
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import type { CorrecteursMaths } from "@/lib/tutor-v4/questionBank/4e/maths/correcteurs/types";
import { compiler } from "../../../lycee-correcteurs-commun";
import { correcteursContraposee } from "../../../lycee-correcteurs-logique";
import { PROPS, verite } from "../logique-raisonnement.bank";

type Q = TutorGeneratedQuestionV4;
const egal = (q: Q, j: string) => (q.expected[0] === j ? [] : [`attendu ${q.expected[0]}, recalculé ${j}`]);
const typeDe = (t: string) => {
  if (/on démontre «/.test(t)) return "un raisonnement par contraposée";
  if (/on donne/.test(t)) return "un contre-exemple";
  if (/on suppose|on aboutit|contradiction/.test(t)) return "un raisonnement par l'absurde";
  return "une disjonction des cas";
};
const R = Array.from({ length: 401 }, (_, i) => (i - 200) / 4);
const premier = (m: number) => {
  if (m < 2) return false;
  for (let d = 2; d * d <= m; d++) if (m % d === 0) return false;
  return true;
};
/** Valeur citée dans un choix : $x = 3$, $n = 10$, $x = \dfrac{1}{4}$. */
const valeur = (s: string) => {
  const f = s.match(/\\dfrac\{(\d+)\}\{(\d+)\}/);
  if (f) return Number(f[1]) / Number(f[2]);
  const m = s.match(/= (-?\d+)/);
  return m ? Number(m[1]) : null;
};
function testeur(t: string): ((x: number) => boolean) | null {
  let m;
  if (t.includes("x^{2} \\geq x")) return (x) => x * x >= x;
  if (t.includes("x^{2} > 0")) return (x) => x * x > 0;
  if ((m = t.match(/\$(\d+)x > x\$/))) { const k = +m[1]; return (x) => k * x > x; }
  if (t.includes("(x+1)^{2} = x^{2} + 1")) return (x) => (x + 1) ** 2 === x * x + 1;
  if (t.includes("n^{2} + n + 11")) return (n) => premier(n * n + n + 11);
  if ((m = t.match(/x \+ (\d+) > (\d+)/))) { const k = +m[1]; return (x) => x + k > k; }
  if (t.includes("\\sqrt{x} \\leq x")) return (x) => Math.sqrt(x) <= x;
  return null;
}
/** Quantificateurs emboîtés, balayés sur une grille (l'existence se teste sur les valeurs candidates). */
const EMBOITES: Array<[string, () => boolean]> = [
  ["pour tout réel $x$, il existe un réel $y$ tel que $y > x$", () => R.slice(0, -1).every((x) => R.some((y) => y > x))],
  ["il existe un réel $y$ tel que, pour tout réel $x$, $y > x$", () => R.some((y) => R.every((x) => y > x))],
  ["pour tout réel $x$, il existe un réel $y$ tel que $x + y = 0$", () => R.every((x) => R.some((y) => x + y === 0))],
  ["il existe un réel $y$ tel que, pour tout réel $x$, $x + y = 0$", () => R.some((y) => R.every((x) => x + y === 0))],
  ["il existe un réel $y$ tel que, pour tout réel $x$, $xy = 0$", () => R.some((y) => R.every((x) => x * y === 0))],
  ["pour tout réel $x$, il existe un réel $y$ tel que $y^{2} = x$", () => R.every((x) => R.some((y) => y * y === x))],
  ["pour tout réel $x$, il existe un réel $y$ tel que $y = x^{2}$", () => true],
  ["il existe un réel $y$ tel que, pour tout réel $x$, $x + y = x$", () => R.some((y) => R.every((x) => x + y === x))],
];

export const CORRECTEURS: CorrecteursMaths = {
  ...correcteursContraposee("2de_logique_contraposee"),
  "2de_logique_raisonnement_type_tpl_1": (q) => egal(q, typeDe(q.text)),
  "2de_logique_raisonnement_type_tpl_2": (q) => egal(q, typeDe(q.text)),
  "2de_logique_raisonnement_type_tpl_3": (q) => {
    const src = q.text.match(/du nombre \$(.*?)\$ \?/)![1];
    const f = compiler(src);
    const r = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => f({ n }) % 2);
    if (new Set(r).size !== 1) return [`parité non constante pour ${src}`];
    return egal(q, r[0] === 0 ? "Il est pair, quel que soit $n$." : "Il est impair, quel que soit $n$.");
  },
  "2de_logique_raisonnement_type_tpl_4": (q) => (q.expected[0].startsWith("On suppose que") && !q.choices!.filter((c) => c !== q.expected[0]).every((c) => c.startsWith("On suppose")) ? [] : ["hypothèse mal formée"]),
  "2de_logique_raisonnement_type_tpl_5": (q) => {
    const k = Number(q.text.match(/\\sqrt\{(\d)\}/)![1]);
    return q.expected[0].includes(`p = ${k}a`) ? [] : ["étape fausse"];
  },
  "2de_logique_raisonnement_type_tpl_6": (q) => {
    const t = q.text;
    const j = /est fausse/.test(t) ? "un contre-exemple" : /« si /.test(t) ? "un raisonnement par contraposée" : /pas rationnel|pas de plus grand/.test(t) ? "un raisonnement par l'absurde" : "une disjonction des cas";
    return egal(q, j);
  },
  "2de_logique_quantificateurs_tpl_1": (q) => {
    const fr = q.text.match(/« (.*?) »/)![1];
    const tout = /^(tous|chaque|aucun)/.test(fr);
    return /^pour tout/i.test(q.expected[0]) === tout ? [] : [`quantificateur faux pour « ${fr} »`];
  },
  "2de_logique_quantificateurs_tpl_2": (q) => {
    const t = q.text.match(/« (.*?) »/)![1];
    for (let n = 0; n < 5000; n++) {
      const p = PROPS[n % PROPS.length]();
      if (p.t === t) return egal(q, verite(p) ? "Elle est vraie." : "Elle est fausse.");
    }
    return ["proposition non retrouvée"];
  },
  "2de_logique_quantificateurs_tpl_3": (q) => {
    const t = q.text.match(/« (.*?) »/)![1];
    return /^pour tout/.test(t) === /^Il existe/.test(q.expected[0]) ? [] : ["le quantificateur n'a pas changé"];
  },
  "2de_logique_quantificateurs_tpl_4": (q) => {
    const f = testeur(q.text);
    if (!f) return ["propriété non reconnue"];
    const pb: string[] = [];
    if (f(valeur(q.expected[0])!)) pb.push("le contre-exemple vérifie la propriété");
    for (const c of q.choices!) if (c !== q.expected[0] && valeur(c) !== null && !f(valeur(c)!)) pb.push(`${c} est aussi un contre-exemple`);
    return pb;
  },
  "2de_logique_quantificateurs_tpl_5": (q) => {
    const t = q.text.match(/« (.*?) »/)![1];
    const e = EMBOITES.find((x) => x[0] === t);
    return e ? egal(q, e[1]() ? "Elle est vraie." : "Elle est fausse.") : ["proposition non retrouvée"];
  },
  "2de_logique_quantificateurs_tpl_6": (q) => {
    const t = q.text.match(/« (.*?) »/)![1];
    const exi = /^(au moins|un candidat au moins|il y a un)/.test(t);
    return exi ? (/aucun/i.test(q.expected[0]) ? [] : ["« au moins un » se nie par « aucun »"]) : /^Au moins/.test(q.expected[0]) ? [] : ["« tous / aucun » se nie par « au moins un »"];
  },
};
