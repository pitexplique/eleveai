// Correcteurs de « rendre rationnel un dénominateur » : ils relisent le nombre écrit, le calculent et
// comparent chaque proposition par sa valeur ; un radical au dénominateur d'une proposition juste est refusé.
import type { CorrecteursMaths } from "@/lib/tutor-v4/questionBank/4e/maths/correcteurs/types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { accepte } from "../../../lycee-correcteurs-stats";
import { seulChoix } from "../../../lycee-correcteurs-commun";
import { proche, segments, val } from "./themes-3-pays-lecture";

type Q = TutorGeneratedQuestionV4;
const P = "2de_racine_denominateur_rationnel_tpl_";

/** Le premier nombre posé à part (fraction ou racine de fraction). */
const nombrePose = (t: string) => {
  const s = segments(t).find((x) => /\\dfrac|\\sqrt/.test(x));
  if (!s) throw new Error(`nombre illisible : ${t}`);
  return s;
};
/** Le dénominateur écrit, sans radical ? */
function denominateurSansRadical(c: string) {
  const s = c.replace(/\$/g, "");
  if (!s.includes("\\dfrac")) return true;
  const i = s.lastIndexOf("}{");
  return !s.slice(i + 2).includes("\\sqrt");
}
const nue = (c: string) => c.split("$")[1];
/** L'unique proposition égale au nombre, à dénominateur sans radical. */
function egale(q: Q) {
  const v = val(nombrePose(q.text));
  return seulChoix(q, (c) => proche(val(nue(c)), v) && denominateurSansRadical(c));
}
const lireDenom = (s: string) => {
  const m = s.match(/^\\dfrac\{-?\d+\}\{(.+)\}$/);
  if (!m) throw new Error(`fraction illisible : ${s}`);
  return m[1];
};

export const CORRECTEURS: CorrecteursMaths = {
  [`${P}1`]: egale,
  [`${P}2`]: (q) => {
    const d = lireDenom(nombrePose(q.text));
    const n = d.match(/\\sqrt\{(\d+)\}/)![1];
    return seulChoix(q, (c) => c === `$\\sqrt{${n}}$`);
  },
  [`${P}3`]: (q) => {
    const seg = segments(q.text);
    const v = val(nombrePose(q.text));
    const rad = seg.find((s) => /^b\\sqrt/.test(s))!.slice(1);
    return accepte(q, v / val(rad));
  },
  [`${P}4`]: (q) => {
    const v = val(nombrePose(q.text));
    return seulChoix(q, (c) => proche(val(nue(c)), v));
  },
  [`${P}5`]: egale,
  [`${P}6`]: egale,
  [`${P}7`]: (q) => {
    const m = segments(q.text)[0].match(/^\\sqrt\{(\d+)\} ([+-]) (\d+)$/);
    if (!m) throw new Error(`expression illisible : ${q.text}`);
    const c0 = `$\\sqrt{${m[1]}} ${m[2] === "-" ? "+" : "-"} ${m[3]}$`;
    return seulChoix(q, (c) => c === c0);
  },
  [`${P}8`]: (q) => accepte(q, val(segments(q.text)[0])),
  [`${P}9`]: egale,
  [`${P}10`]: (q) => {
    const num = nombrePose(q.text);
    const m = num.match(/^\\dfrac\{(\d+)\}\{\\sqrt\{(\d+)\} ([+-]) (\d+)\}$/);
    if (!m) throw new Error(`nombre illisible : ${num}`);
    const [a, n, k] = [Number(m[1]), Number(m[2]), Number(m[4])];
    const s = m[3] === "-" ? -1 : 1;
    // a / (√n + s k) = a (√n − s k) / (n − k²)
    const d = n - k * k;
    const q0 = a / d;
    const p0 = (-s * k * a) / d;
    const vp = segments(q.text).filter((x) => x === "p" || x === "q").pop();
    return accepte(q, vp === "p" ? p0 : q0);
  },
  [`${P}11`]: (q) => {
    const seg = segments(q.text);
    const v = val(seg[0]) / val(seg[1]);
    return seulChoix(q, (c) => proche(val(nue(c)), v) && denominateurSansRadical(c));
  },
};
