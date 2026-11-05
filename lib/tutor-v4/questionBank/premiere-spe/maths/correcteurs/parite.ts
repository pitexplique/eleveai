// Correcteurs de la parité : ils relisent la fonction écrite ou la courbe tracée, testent f(−x) en
// plusieurs points et n'utilisent aucune valeur du gabarit.
import type { CorrecteursMaths } from "@/lib/tutor-v4/questionBank/4e/maths/correcteurs/types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { compiler, proche, seulChoix } from "../../../lycee-correcteurs-commun";

type Q = TutorGeneratedQuestionV4;
const P = "1s_var_parite_tpl_";
const ESSAIS = [0.3, 0.7, 1.1, 1.7, 2.3, 3.1, 4.7, 11.3, 23.9];

const NOMS = { paire: "Paire", impaire: "Impaire", ni: "Ni paire ni impaire" };
/** La parité calculée : l'ensemble de définition doit être symétrique, puis on compare. */
function genre(f: (x: number) => number) {
  let paire = true;
  let impaire = true;
  for (const x of ESSAIS) {
    const a = f(x);
    const b = f(-x);
    if (Number.isNaN(a) !== Number.isNaN(b)) return NOMS.ni;
    if (Number.isNaN(a)) continue;
    if (!proche(a, b, 1e-7)) paire = false;
    if (!proche(a, -b, 1e-7)) impaire = false;
  }
  // Une valeur interdite d'un seul côté (x = a) rend aussi l'ensemble non symétrique.
  for (let k = 1; k <= 12; k++) if (!Number.isFinite(f(k)) !== !Number.isFinite(f(-k))) return NOMS.ni;
  return paire ? NOMS.paire : impaire ? NOMS.impaire : NOMS.ni;
}
/** La première fonction écrite : « f(x) = … » ou « s(t) = … ». */
function fonctionEcrite(t: string) {
  const m = t.match(/\$([a-z])\(([a-z])\) = ([^$]+)\$/);
  if (!m) throw new Error(`fonction illisible : ${t}`);
  const c = compiler(m[3]);
  return { nom: m[1], variable: m[2], source: m[3], f: (x: number) => c({ [m[2]]: x }) };
}
const genreEcrit = (q: Q): string[] => {
  const j = genre(fonctionEcrite(q.text).f);
  return q.expected[0] === j ? [] : [`attendu ${q.expected[0]}, recalculé ${j}`];
};
function fMoinsX(q: Q): string[] {
  const { f } = fonctionEcrite(q.text);
  const v = f(-1.7);
  return seulChoix(q, (c) => proche(compiler(c.replace(/\$/g, ""))({ x: 1.7 }), v, 1e-7));
}
function imageOpposee(q: Q): string[] {
  const m = q.text.match(/([a-z])\((\d+)\) = (-?\d+)/);
  if (!m) throw new Error(`image illisible : ${q.text}`);
  const b = Number(m[3]);
  const j = /\bimpaire\b/.test(q.text) ? -b : b;
  if (!q.text.includes(`-${m[2]}`)) return ["l'image demandée n'est pas celle de l'opposé"];
  return Number(q.expected[0]) === j ? [] : [`attendu ${q.expected[0]}, recalculé ${j}`];
}
function symetrie(q: Q): string[] {
  const j = /\bimpaire\b/.test(q.text) ? "L'origine du repère" : "L'axe des ordonnées";
  return q.expected[0] === j ? [] : [`attendu ${q.expected[0]}, recalculé ${j}`];
}
/** La courbe tracée : on lit ses sommets et on interpole. */
function genreCourbe(q: Q): string[] {
  const f = q.canvas as any;
  if (f?.kind !== "fonctionGraphique") return ["pas de courbe"];
  const pts: { x: number; y: number }[] = f.courbes[0].points;
  const y = (x: number) => {
    for (let i = 1; i < pts.length; i++) if (x >= pts[i - 1].x && x <= pts[i].x) return pts[i - 1].y + ((x - pts[i - 1].x) * (pts[i].y - pts[i - 1].y)) / (pts[i].x - pts[i - 1].x);
    return NaN;
  };
  if (pts.some((p) => p.x < f.xmin || p.x > f.xmax || p.y < f.ymin || p.y > f.ymax)) return ["courbe hors du cadre"];
  let paire = true;
  let impaire = true;
  for (let x = 0.25; x <= 5; x += 0.25) {
    if (!proche(y(x), y(-x), 1e-9)) paire = false;
    if (!proche(y(x), -y(-x), 1e-9)) impaire = false;
  }
  const j = paire ? NOMS.paire : impaire ? NOMS.impaire : NOMS.ni;
  return q.expected[0] === j ? [] : [`attendu ${q.expected[0]}, recalculé ${j}`];
}
function pointSymetrique(q: Q): string[] {
  const m = q.text.match(/\$\((-?\d+)\\,;(-?\d+)\)\$/);
  if (!m) throw new Error(`point illisible : ${q.text}`);
  const [a, b] = [Number(m[1]), Number(m[2])];
  const y = /\bimpaire\b/.test(q.text) ? -b : b;
  const j = `$(${-a}\\,;${y})$`;
  return seulChoix(q, (c) => c === j);
}
/** On essaie la réponse dans l'expression : la fonction doit avoir la parité demandée. */
function parametre(q: Q): string[] {
  const m = q.text.match(/\$(?:[a-z]\(x\)|y) = ([^$]+)\$/);
  if (!m) throw new Error(`expression illisible : ${q.text}`);
  const c = compiler(m[1]);
  const a = Number(q.expected[0]);
  const voulu = /\bimpaire\b/.test(q.text) ? NOMS.impaire : NOMS.paire;
  const g = genre((x) => c({ x, a }));
  if (g !== voulu) return [`avec a = ${a}, la fonction est ${g}`];
  // L'unicité : une autre valeur de a casse la parité.
  return genre((x) => c({ x, a: a + 1 })) === voulu ? ["plusieurs valeurs de a conviennent"] : [];
}
/** Sur deux exemples non nuls de chaque genre, on regarde ce que donne l'opération. */
function operation(q: Q): string[] {
  const mots = [...q.text.matchAll(/\b(paire|impaire)\b/g)].map((m) => m[1]);
  if (mots.length < 2) throw new Error(`parités illisibles : ${q.text}`);
  const ex = (g: string, k: number) => (g === "paire" ? (x: number) => x * x + k : (x: number) => x * x * x + k * x);
  const segs = q.text.split("$").filter((_, i) => i % 2 === 1);
  const quest = segs[segs.length - 1];
  const faire = (u: (x: number) => number, v: (x: number) => number) => {
    if (quest.includes("\\times")) return (x: number) => u(x) * v(x);
    if (quest.includes("+")) return (x: number) => u(x) + v(x);
    return (x: number) => u(x) * u(x);
  };
  const res = [genre(faire(ex(mots[0], 1), ex(mots[1], 3))), genre(faire(ex(mots[0], 5), ex(mots[1], 2)))];
  if (res[0] !== res[1]) return [`deux exemples divergent : ${res.join(", ")}`];
  return q.expected[0] === res[0] ? [] : [`attendu ${q.expected[0]}, recalculé ${res[0]}`];
}
function arche(q: Q): string[] {
  const { f, nom } = fonctionEcrite(q.text);
  const m = q.text.match(new RegExp(`${nom}\\(-(\\d+)\\)`));
  if (!m) throw new Error(`image cherchée illisible : ${q.text}`);
  const donne = q.text.match(new RegExp(`\\$${nom}\\((\\d+)\\) = (-?\\d+)\\$`));
  if (!donne || !proche(f(Number(donne[1])), Number(donne[2]))) return ["la valeur donnée est fausse"];
  return proche(f(-Number(m[1])), Number(q.expected[0])) ? [] : [`attendu ${q.expected[0]}`];
}

export const CORRECTEURS: CorrecteursMaths = {
  [`${P}1`]: fMoinsX,
  [`${P}2`]: genreEcrit,
  [`${P}3`]: imageOpposee,
  [`${P}4`]: symetrie,
  [`${P}5`]: genreEcrit,
  [`${P}6`]: genreCourbe,
  [`${P}7`]: genreEcrit,
  [`${P}8`]: pointSymetrique,
  [`${P}9`]: parametre,
  [`${P}10`]: operation,
  [`${P}11`]: arche,
  [`${P}12`]: genreEcrit,
};
