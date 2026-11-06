// Correcteurs des encadrements d'opérations : ils relisent les encadrements écrits, évaluent l'expression
// demandée aux quatre coins (exact pour une somme, une différence, un produit ou un quotient de positifs).
import type { CorrecteursMaths } from "@/lib/tutor-v4/questionBank/4e/maths/correcteurs/types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { accepte } from "../../../lycee-correcteurs-stats";
import { compiler, seulChoix } from "../../../lycee-correcteurs-commun";
import { nombres, proche, segments, val } from "./themes-3-pays-lecture";

type Q = TutorGeneratedQuestionV4;
const P = "2de_encadrer_somme_produit_tpl_";
const ENC = /^(?:\\(?:scriptsize|footnotesize) )?(-?[\d{},]+) (?:<|\\leq) (.+?) (?:<|\\leq) (-?[\d{},]+)$/;

/** Les deux encadrements donnés et l'expression demandée ; renvoie les bornes recalculées. */
function bornes(t: string, tete: string) {
  const segs = segments(tete);
  const encs = segs.map((s) => s.match(ENC)).filter(Boolean) as RegExpMatchArray[];
  if (encs.length < 2) throw new Error(`encadrements illisibles : ${t}`);
  const [A, B] = encs;
  // Les commandes (\times, \dfrac) ne sont pas des lettres de l'énoncé ; une racine se cherche telle quelle.
  const sansCmd = (s: string, m: string) => (m.length > 1 ? s : s.replace(/\\[a-zA-Z]+/g, " "));
  const E = segments(t).filter((s) => !ENC.test(s)).find((s) => sansCmd(s, A[2]).includes(A[2]) && sansCmd(s, B[2]).includes(B[2]));
  if (!E) throw new Error(`expression illisible : ${t}`);
  const src = A[2].length > 1
    ? E.split(A[2]).join("(A)").split(B[2]).join("(B)")
    : E.replace(/\\[a-zA-Z]+|[a-zA-Z]/g, (k) => (k === A[2] ? "(A)" : k === B[2] ? "(B)" : k));
  const f = compiler(src);
  const vals: number[] = [];
  for (const a of [val(A[1]), val(A[3])]) for (const b of [val(B[1]), val(B[3])]) vals.push(f({ A: a, B: b }));
  return { min: Math.min(...vals), max: Math.max(...vals), E };
}
const tete = (t: string) => t.split("\n\n").slice(0, 2).join(" ");
function borne(q: Q) {
  const { min, max } = bornes(q.text, tete(q.text));
  if (/inférieure|gauche/.test(q.text)) return accepte(q, min);
  if (/supérieure|droite/.test(q.text)) return accepte(q, max);
  throw new Error(`borne non dite : ${q.text}`);
}
const lignesJustes = (c: string, min: number, max: number) => {
  const m = c.replace(/\$/g, "").match(ENC);
  return !!m && proche(val(m[1]), min) && proche(val(m[3]), max);
};
function encadrement(q: Q) {
  const { min, max } = bornes(q.text, tete(q.text));
  return seulChoix(q, (c) => lignesJustes(c, min, max));
}

export const CORRECTEURS: CorrecteursMaths = {
  [`${P}1`]: borne,
  [`${P}2`]: encadrement,
  [`${P}3`]: borne,
  [`${P}4`]: encadrement,
  [`${P}5`]: borne,
  [`${P}6`]: encadrement,
  [`${P}7`]: (q) => {
    const [a, b, c, d] = nombres(q.text);
    const aire = /son aire/.test(q.text);
    const bas = /inférieure|minimale/.test(q.text);
    return accepte(q, aire ? (bas ? a * c : b * d) : 2 * (bas ? a + c : b + d));
  },
  [`${P}8`]: (q) => {
    const [a, b, c, d] = nombres(q.text);
    return seulChoix(q, (ch) => lignesJustes(ch, a / d, b / c));
  },
  [`${P}9`]: borne,
  [`${P}10`]: encadrement,
  [`${P}11`]: (q) => {
    const { min, max } = bornes(q.text, tete(q.text));
    return accepte(q, max - min);
  },
};
