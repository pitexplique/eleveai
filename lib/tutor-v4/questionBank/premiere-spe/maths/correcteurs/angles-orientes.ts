// Correcteurs des angles orientés : ils relisent la mesure écrite, les vecteurs et la figure, recalculent la
// mesure principale et n'utilisent aucune valeur du gabarit.
import type { CorrecteursMaths } from "@/lib/tutor-v4/questionBank/4e/maths/correcteurs/types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { proche, seulChoix } from "../../../lycee-correcteurs-commun";
import { blocs, congru, droite, principale, valeur } from "./lecture-trigo";

type Q = TutorGeneratedQuestionV4;
const P = "1s_angle_oriente_mesure_principale_tpl_";
const C = "1s_angle_oriente_chasles_tpl_";
const exact = (q: Q, v: number) => (proche(Number(String(q.expected[0]).replace(",", ".")), v, 1e-6) ? [] : [`attendu ${q.expected[0]}, recalculé ${v}`]);
const choixVaut = (q: Q, v: number) => seulChoix(q, (c) => proche(valeur(c), v, 1e-7));

const principaleDuBloc = (q: Q) => choixVaut(q, principale(valeur(droite(blocs(q.text)[0]))));
const dansIntervalle = (v: number) => v > -Math.PI + 1e-9 && v < Math.PI + 1e-9;

const FRAC: Record<string, number> = { "un quart": 1 / 4, "un tiers": 1 / 3, "un sixième": 1 / 6, "un huitième": 1 / 8, "trois quarts": 3 / 4, "deux tiers": 2 / 3, "cinq sixièmes": 5 / 6 };

/** Un angle écrit « \left(u, v\right) ». */
const couple = (s: string) => {
  const m = s.match(/\\left\((.+?), (.+?)\\right\)/);
  if (!m) throw new Error(`angle illisible : ${s}`);
  return [m[1], m[2]] as const;
};
/** Résout le réseau des angles connus : la direction de chaque vecteur, le premier à 0. */
function reseau(eqs: { u: string; v: string; a: number }[]) {
  const dir: Record<string, number> = { [eqs[0].u]: 0 };
  for (let tour = 0; tour < 4; tour++)
    for (const e of eqs) {
      if (e.u in dir && !(e.v in dir)) dir[e.v] = dir[e.u] + e.a;
      if (e.v in dir && !(e.u in dir)) dir[e.u] = dir[e.v] - e.a;
    }
  return dir;
}
/** Des angles donnés, et l'angle cherché dans le dernier paragraphe. */
function angleCherche(q: Q) {
  const b = blocs(q.text);
  const eqs = b.slice(0, -1).map((s) => {
    const [u, v] = couple(s);
    return { u, v, a: valeur(droite(s)) };
  });
  const dir = reseau(eqs);
  const [u, v] = couple(b[b.length - 1]);
  return choixVaut(q, principale(dir[v] - dir[u]));
}
/** La figure : l'angle de deux vecteurs, depuis les points dessinés. */
function angleFigure(q: Q) {
  const f = q.canvas as any;
  const pos = Object.fromEntries(f.points.map((p: any) => [p.id, p])) as Record<string, { x: number; y: number }>;
  const m = blocs(q.text)[0].match(/\\overrightarrow\{([A-Z])([A-Z])\}, \\overrightarrow\{([A-Z])([A-Z])\}/);
  if (!m) throw new Error(`angle illisible : ${q.text}`);
  const d = (a: string, b: string) => Math.atan2(pos[b].y - pos[a].y, pos[b].x - pos[a].x);
  return choixVaut(q, principale(d(m[3], m[4]) - d(m[1], m[2])));
}

export const CORRECTEURS: CorrecteursMaths = {
  [`${P}1`]: principaleDuBloc,
  [`${P}2`]: (q) => {
    const r = valeur(blocs(q.text)[0]);
    return seulChoix(q, (c) => congru(valeur(c), r));
  },
  [`${P}3`]: (q) => seulChoix(q, (c) => dansIntervalle(valeur(c))),
  [`${P}4`]: principaleDuBloc,
  [`${P}5`]: (q) =>
    seulChoix(q, (c) => {
      const m = c.match(/^\$(.+?) \\equiv (.+?) \\ \[2\\pi\]\$$/);
      if (!m) throw new Error(`congruence illisible : ${c}`);
      return congru(valeur(m[1]), valeur(m[2]));
    }),
  [`${P}6`]: (q) => {
    const d = Number(blocs(q.text)[0].replace("°", ""));
    let r = d % 360;
    if (r > 180) r -= 360;
    if (r <= -180) r += 360;
    return exact(q, r);
  },
  [`${P}7`]: (q) => {
    const m = q.text.match(/(\d+) tours et (.+?) dans le sens (direct|indirect)/);
    if (!m) throw new Error(`rotation illisible : ${q.text}`);
    const t = (Number(m[1]) + FRAC[m[2]]) * 2 * Math.PI * (m[3] === "direct" ? 1 : -1);
    return choixVaut(q, principale(t));
  },
  [`${P}8`]: (q) => {
    const v = valeur(droite(blocs(q.text)[0]));
    return exact(q, (principale(v) - v) / (2 * Math.PI));
  },
  [`${P}9`]: (q) => {
    const a = valeur(droite(blocs(q.text)[0]));
    const m = q.text.match(/\$(-?\d+)\\alpha\$/);
    if (!m) throw new Error(`multiple illisible : ${q.text}`);
    return choixVaut(q, principale(Number(m[1]) * a));
  },

  [`${C}1`]: (q) => {
    // Une direction quelconque pour chaque vecteur : l'égalité doit tenir pour toutes.
    const dir = new Map<string, number>();
    const d = (s: string) => {
      if (!dir.has(s)) dir.set(s, 0.37 + 1.13 * dir.size * dir.size);
      return dir.get(s)!;
    };
    const b = blocs(q.text)[0];
    let total = 0;
    for (const m of b.matchAll(/([+-]?)\s*\\left\((.+?), (.+?)\\right\)/g)) total += (m[1] === "-" ? -1 : 1) * (d(m[3]) - d(m[2]));
    return seulChoix(q, (c) => {
      const [u, v] = couple(c);
      return congru(d(v) - d(u), total);
    });
  },
  [`${C}2`]: (q) => {
    const [s0, s1] = blocs(q.text);
    const [u, v] = couple(s0);
    const a = valeur(droite(s0));
    const [x, y] = couple(s1);
    const nu = (w: string) => w.replace(/^-/, "");
    let r: number;
    if (nu(x) === v && nu(y) === u) r = -a;
    else if (nu(x) === u && nu(y) === v) r = a;
    else throw new Error(`vecteurs différents : ${q.text}`);
    if (x.startsWith("-")) r += Math.PI;
    if (y.startsWith("-")) r += Math.PI;
    return choixVaut(q, principale(r));
  },
  [`${C}3`]: angleCherche,
  [`${C}4`]: angleFigure,
  [`${C}5`]: angleFigure,
  [`${C}6`]: angleCherche,
  [`${C}7`]: (q) => {
    const [e1, e2] = blocs(q.text);
    const t = principale(valeur(droite(e1)) + valeur(droite(e2)));
    const [a, b] = [couple(e1)[0], couple(e2)[1]];
    const O = a.match(/\{([A-Z])/)![1];
    const [P_, S] = [a.match(/\{[A-Z]([A-Z])/)![1], b.match(/\{[A-Z]([A-Z])/)![1]];
    return seulChoix(q, (c) => {
      if (/entre/.test(c)) return proche(Math.abs(t), Math.PI) && c.includes(`$${O}$ est entre $${P_}$ et $${S}$`);
      if (/même côté/.test(c)) return proche(t, 0);
      if (/ne sont ni/.test(c)) return !proche(t, 0) && !proche(Math.abs(t), Math.PI) && !proche(Math.abs(t), Math.PI / 2);
      return proche(Math.abs(t), Math.PI / 2);
    });
  },
  [`${C}8`]: (q) => {
    let t = 0;
    let n = 0;
    for (const m of q.text.matchAll(/\$([^$]+)\$ vers la (gauche|droite)/g)) {
      t += (m[2] === "gauche" ? 1 : -1) * valeur(m[1]);
      n++;
    }
    if (n < 2) throw new Error(`virages illisibles : ${q.text}`);
    return choixVaut(q, principale(t));
  },
  [`${C}9`]: angleFigure,
};
