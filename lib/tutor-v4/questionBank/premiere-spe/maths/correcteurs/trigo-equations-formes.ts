// Correcteurs des équations trigonométriques générales : ils relisent l'équation écrite et l'intervalle,
// cherchent les zéros par balayage numérique ou testent chaque réel, et n'utilisent aucune valeur du gabarit.
import type { CorrecteursMaths } from "@/lib/tutor-v4/questionBank/4e/maths/correcteurs/types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { seulChoix } from "../../../lycee-correcteurs-commun";
import { blocs, dans, ensemble, equation, expr, familleJuste, intervalles, memeEnsemble, racinesDans, valeur, inline } from "./lecture-trigo";

type Q = TutorGeneratedQuestionV4;
const P = "1s_trig_equation_formes_tpl_";

/** Les solutions sur ℝ de l'équation du premier paragraphe en formule. */
const familles = (q: Q) => {
  const g = equation(blocs(q.text)[0]);
  return seulChoix(q, (c) => familleJuste(c, g));
};
/** L'équation, l'intervalle : l'ensemble exact des solutions de la plage. */
const surIntervalle = (q: Q) => {
  const [e, I] = blocs(q.text);
  const g = equation(e);
  const J = intervalles(I)[0];
  const vrai = racinesDans(g, J);
  return seulChoix(q, (c) => memeEnsemble(ensemble(c), vrai));
};
/** Inéquation : compare proposition et vérité sur une grille et sur toutes les bornes écrites. */
const inequation = (q: Q) => {
  const [e, I] = blocs(q.text);
  const m = e.match(/^(.+?) (\\geqslant|\\leqslant|>|<) (.+)$/);
  if (!m) throw new Error(`inéquation illisible : ${e}`);
  const L = expr(m[1]);
  const v = valeur(m[3]);
  const op = m[2];
  const J = intervalles(I)[0];
  const test = (x: number) => {
    const y = L({ x });
    if (Math.abs(y) > 1e8) return false; // la tangente n'existe pas
    if (op === "\\geqslant") return y >= v - 1e-9;
    if (op === "\\leqslant") return y <= v + 1e-9;
    return op === ">" ? y > v + 1e-9 : y < v - 1e-9;
  };
  return seulChoix(q, (c) => {
    const P_ = intervalles(c);
    const essais: number[] = [];
    for (let k = 0; k <= 400; k++) essais.push(J.a + ((J.b - J.a) * k) / 400 + 1e-4 * (k % 2 ? 1 : -1));
    for (const K of P_) essais.push(K.a, K.b);
    return essais.filter((x) => dans(x, J)).every((x) => test(x) === P_.some((K) => dans(x, K)));
  });
};

export const CORRECTEURS: CorrecteursMaths = {
  [`${P}1`]: (q) => {
    const m = blocs(q.text)[0].match(/^\\(cos|sin|tan) ([a-zA-Z]) = \\(?:cos|sin|tan) ([a-zA-Z])$/);
    if (!m) throw new Error(`égalité illisible : ${q.text}`);
    const f = m[1] === "cos" ? Math.cos : m[1] === "sin" ? Math.sin : Math.tan;
    const b0 = 0.7;
    const g = (u: number) => f(u) - f(b0);
    return seulChoix(q, (c) => {
      const fam = inline(c).filter((s) => /^[a-zA-Z] = /.test(s));
      if (!fam.every((s) => s[0] === m[2])) return false;
      return familleJuste(c, g, 3.3, { [m[3]]: b0 });
    });
  },
  [`${P}2`]: (q) => {
    const g = equation(blocs(q.text)[0]);
    return seulChoix(q, (c) => Math.abs(g(valeur(c))) < 1e-9);
  },
  [`${P}3`]: surIntervalle,
  [`${P}4`]: familles,
  [`${P}5`]: familles,
  [`${P}6`]: familles,
  [`${P}7`]: surIntervalle,
  [`${P}8`]: inequation,
  [`${P}9`]: inequation,
};
