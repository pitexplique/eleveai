// Correcteurs du triangle quelconque : ils relisent les mesures écrites et la figure, recalculent par
// la loi des sinus, ½ ab sin C ou Héron, et n'utilisent aucune valeur du gabarit.
import type { CorrecteursMaths } from "@/lib/tutor-v4/questionBank/4e/maths/correcteurs/types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { compiler, proche, seulChoix } from "../../../lycee-correcteurs-commun";

type Q = TutorGeneratedQuestionV4;
const rad = (d: number) => (d * Math.PI) / 180;
const deg = (r: number) => (r * 180) / Math.PI;
const nb = (s: string) => Number(s.replace("{,}", ".").replace(",", "."));
const val = (s: string) => Number(s.replace(",", "."));

function lire(t: string) {
  const cotes: Record<string, number> = {};
  const angles: Record<string, number> = {};
  for (const m of t.matchAll(/\$([A-Z])([A-Z]) = ([\d{},]+)\$/g)) cotes[[m[1], m[2]].sort().join("")] = nb(m[3]);
  for (const m of t.matchAll(/\\widehat\{([A-Z])\} = (\d+)°/g)) angles[m[1]] = Number(m[2]);
  return { cotes, angles };
}
/** Le dernier segment « XY » seul (sans « = ») de la question : le côté cherché. */
function coteCherche(t: string) {
  const l = [...t.matchAll(/\$([A-Z])([A-Z])\$/g)];
  if (!l.length) throw new Error(`côté cherché illisible : ${t}`);
  return [l[l.length - 1][1], l[l.length - 1][2]].sort().join("");
}
/** La précision annoncée par le texte. */
function precision(t: string) {
  if (/dixième/.test(t)) return 0.1;
  if (/au degré|à l'unité/.test(t)) return 1;
  throw new Error(`arrondi illisible : ${t}`);
}
/** L'arrondi juste est la première réponse ; seuls ses deux voisins immédiats sont admis en plus. */
function arrondiJuste(q: Q, v: number): string[] {
  const p = precision(q.text);
  const r = Math.round(v / p) * p;
  if (!proche(val(q.expected[0]), r, 1e-6)) return [`attendu ${q.expected[0]}, recalculé ${v}`];
  if (q.expected.length !== 3 || q.expected.slice(1).some((e) => Math.abs(val(e) - r) > p + 1e-9)) return [`tolérance fausse : ${q.expected.join(" / ")}`];
  return [];
}
const exact = (q: Q, v: number) => (proche(val(q.expected[0]), v, 1e-6) ? [] : [`attendu ${q.expected[0]}, recalculé ${v}`]);

/** La figure respecte les mesures écrites : mêmes angles, côtés proportionnels. */
function figureFidele(q: Q, reponse?: string): string[] {
  const f = q.canvas as any;
  if (!f) return [];
  if (f.kind !== "triangle") return ["figure d'un autre type"];
  const nom: Record<string, any> = { [f.labels.A]: f.points.A, [f.labels.B]: f.points.B, [f.labels.C]: f.points.C };
  const { cotes, angles } = lire(q.text);
  const d = (a: string, b: string) => Math.hypot(nom[a].x - nom[b].x, nom[a].y - nom[b].y);
  const ratios = Object.entries(cotes).map(([k, v]) => d(k[0], k[1]) / v);
  if (ratios.length > 1 && Math.max(...ratios) / Math.min(...ratios) > 1.02) return ["figure pas à l'échelle"];
  for (const [X, a] of Object.entries(angles)) {
    const [Y, Z] = Object.keys(nom).filter((k) => k !== X);
    const v = deg(Math.acos((d(X, Y) ** 2 + d(X, Z) ** 2 - d(Y, Z) ** 2) / (2 * d(X, Y) * d(X, Z))));
    if (Math.abs(v - a) > 1) return [`angle ${X} dessiné à ${v} pour ${a}`];
  }
  const ecrit = [...Object.values(f.sideLabels ?? {}), ...Object.values(f.angleLabels ?? {})].map(String);
  if (reponse && ecrit.some((e) => e.replace("°", "") === reponse)) return ["la figure donne la réponse"];
  return [];
}

/** Un vrai triangle (5, 6, 7) sur lequel on évalue les écritures des propositions. */
function essai(t: string) {
  const m = t.match(/\$([A-Z])([A-Z])([A-Z])\$/);
  if (!m) throw new Error(`triangle illisible : ${t}`);
  const [P, Q, R] = [m[1], m[2], m[3]];
  const [a, b, c] = [5, 6, 7];
  const A = Math.acos((b * b + c * c - a * a) / (2 * b * c));
  const B = Math.acos((a * a + c * c - b * b) / (2 * a * c));
  const ang: Record<string, number> = { [P]: A, [Q]: B, [R]: Math.PI - A - B };
  const cote: Record<string, number> = { [Q + R]: a, [R + Q]: a, [P + R]: b, [R + P]: b, [P + Q]: c, [Q + P]: c };
  const ev = (src: string) =>
    compiler(
      src
        .replace(/\$/g, "")
        .replace(/\\(sin|cos) \\widehat\{([A-Z])\}/g, (_, f, X) => `(${String(f === "sin" ? Math.sin(ang[X]) : Math.cos(ang[X]))})`)
        .replace(/[A-Z]{2}/g, (k) => `(${cote[k]})`),
    )({});
  return { ev, aire: 0.5 * b * c * Math.sin(A) };
}
const sommets = (t: string) => {
  const m = t.match(/\$([A-Z])([A-Z])([A-Z])\$/);
  if (!m) throw new Error(`triangle illisible : ${t}`);
  return [m[1], m[2], m[3]];
};

/* ───────────── loi des sinus ───────────── */

function egaliteLoi(q: Q): string[] {
  const { ev } = essai(q.text);
  return seulChoix(q, (c) => {
    const [g, d] = c.split(" = ");
    return proche(ev(g), ev(d), 1e-9);
  });
}
function quotient(q: Q): string[] {
  const { cotes, angles } = lire(q.text);
  return exact(q, Object.values(cotes)[0] / Math.sin(rad(Object.values(angles)[0])));
}
function egaliteChiffree(q: Q): string[] {
  const { cotes, angles } = lire(q.text);
  const ls = sommets(q.text);
  const opp = (s: string) => ls.find((l) => !s.includes(l)) as string;
  const [k, v] = Object.entries(cotes)[0];
  const cible = coteCherche(q.text);
  const cherche = (v * Math.sin(rad(angles[opp(cible)]))) / Math.sin(rad(angles[opp(k)]));
  const lit = (c: string) =>
    compiler(
      c
        .replace(/\$/g, "")
        .replace(/\\(sin|cos) (\d+)°/g, (_, f, d) => `(${String(f === "sin" ? Math.sin(rad(+d)) : Math.cos(rad(+d)))})`)
        .replace(/[A-Z]{2}/g, () => `(${cherche})`),
    )({});
  return [
    ...seulChoix(q, (c) => {
      const [g, d] = c.split(" = ");
      return proche(lit(g), lit(d), 1e-9);
    }),
    ...figureFidele(q),
  ];
}
function quotientVersCote(q: Q): string[] {
  const k = q.text.match(/\\dfrac\{([A-Z]{2})\}\{\\sin \\widehat\{([A-Z])\}\} = (\d+)\$/);
  const s = q.text.match(/\\sin \\widehat\{([A-Z])\} = ([\d{},]+)\$/);
  if (!k || !s) throw new Error(`illisible : ${q.text}`);
  if (coteCherche(q.text).includes(s[1])) return ["le côté cherché ne fait pas face à l'angle donné"];
  return exact(q, Number(k[3]) * nb(s[2]));
}
/** Complète le 3e angle, puis la loi des sinus à partir du côté connu. */
function coteParLoi(q: Q): string[] {
  const { cotes, angles } = lire(q.text);
  const cible = coteCherche(q.text);
  const ls = [...new Set([...Object.keys(angles), ...Object.keys(cotes).join(""), ...cible])];
  if (ls.length !== 3) throw new Error(`sommets illisibles : ${q.text}`);
  const tous = { ...angles };
  const manque = ls.find((l) => !(l in angles));
  if (manque) tous[manque] = 180 - Object.values(angles).reduce((s, x) => s + x, 0);
  const opp = (s: string) => ls.find((l) => !s.includes(l)) as string;
  const [k, v] = Object.entries(cotes)[0];
  const juste = (v * Math.sin(rad(tous[opp(cible)]))) / Math.sin(rad(tous[opp(k)]));
  return [...arrondiJuste(q, juste), ...figureFidele(q, q.expected[0])];
}
function angleAigu(q: Q): string[] {
  const { cotes, angles } = lire(q.text);
  const cherche = [...q.text.matchAll(/\\widehat\{([A-Z])\}\$/g)].map((m) => m[1]).find((l) => !(l in angles));
  if (!cherche) throw new Error(`angle cherché illisible : ${q.text}`);
  const [P, al] = Object.entries(angles)[0];
  const faceP = Object.entries(cotes).find(([k]) => !k.includes(P))?.[1];
  const faceCherche = Object.entries(cotes).find(([k]) => !k.includes(cherche))?.[1];
  if (faceP === undefined || faceCherche === undefined) throw new Error(`côtés illisibles : ${q.text}`);
  if (faceCherche >= faceP) return ["l'angle pourrait ne pas être unique"];
  const v = deg(Math.asin((faceCherche * Math.sin(rad(al))) / faceP));
  return [...arrondiJuste(q, v), ...figureFidele(q, String(Math.round(v)))];
}
function rayon(q: Q): string[] {
  const { cotes, angles } = lire(q.text);
  const [k, a] = Object.entries(cotes)[0];
  const [X, al] = Object.entries(angles)[0];
  if (k.includes(X)) return ["le côté ne fait pas face à l'angle"];
  return arrondiJuste(q, a / (2 * Math.sin(rad(al))));
}
function nombreDeTriangles(q: Q): string[] {
  const { cotes, angles } = lire(q.text);
  const [X, al] = Object.entries(angles)[0];
  const face = Object.entries(cotes).find(([k]) => !k.includes(X))?.[1] as number;
  const autre = Object.entries(cotes).find(([k]) => k.includes(X))?.[1] as number;
  const h = autre * Math.sin(rad(al));
  const juste = face < h ? "Aucun triangle" : face < autre ? "Deux triangles" : "Un seul triangle";
  return q.expected[0] === juste ? [] : [`attendu ${q.expected[0]}, recalculé ${juste}`];
}

/* ───────────── aire et Héron ───────────── */

function aireDeuxCotes(q: Q): string[] {
  const { cotes, angles } = lire(q.text);
  const [X, g] = Object.entries(angles)[0];
  const l = Object.entries(cotes);
  if (l.length !== 2 || !l.every(([k]) => k.includes(X))) return ["l'angle n'est pas formé par les deux côtés"];
  const v = 0.5 * l[0][1] * l[1][1] * Math.sin(rad(g));
  return /dixième|unité/.test(q.text) ? arrondiJuste(q, v) : exact(q, v);
}
function formuleAire(q: Q): string[] {
  const { ev, aire } = essai(q.text);
  return seulChoix(q, (c) => proche(ev(c), aire, 1e-9));
}
function heron(t: string) {
  const v = Object.values(lire(t).cotes);
  if (v.length !== 3) throw new Error(`trois côtés attendus : ${t}`);
  const [a, b, c] = v;
  if (a + b <= c || a + c <= b || b + c <= a) throw new Error(`pas un triangle : ${t}`);
  const p = (a + b + c) / 2;
  return { p, s: Math.sqrt(p * (p - a) * (p - b) * (p - c)) };
}
const demiPerimetre = (q: Q) => exact(q, heron(q.text).p);
const heronExact = (q: Q) => [...exact(q, heron(q.text).s), ...figureFidele(q)];
const heronArrondi = (q: Q) => arrondiJuste(q, heron(q.text).s);
function coteDepuisAire(q: Q): string[] {
  const s = q.text.match(/l'aire vaut \$([\d{},]+)\$/);
  const { cotes, angles } = lire(q.text);
  if (!s) throw new Error(`aire illisible : ${q.text}`);
  return exact(q, (2 * nb(s[1])) / (Object.values(cotes)[0] * Math.sin(rad(Object.values(angles)[0]))));
}
const rayonInscrit = (q: Q) => {
  const { p, s } = heron(q.text);
  return arrondiJuste(q, s / p);
};
function hauteur(q: Q): string[] {
  const m = q.text.match(/issue de \$([A-Z])\$/);
  if (!m) throw new Error(`hauteur illisible : ${q.text}`);
  const base = Object.entries(lire(q.text).cotes).find(([k]) => !k.includes(m[1]))?.[1] as number;
  return arrondiJuste(q, (2 * heron(q.text).s) / base);
}

const avec = (micro: string, l: Record<number, (q: Q) => string[]>) => Object.fromEntries(Object.entries(l).map(([n, c]) => [`1s_${micro}_tpl_${n}`, c]));

const PAR_GABARIT: CorrecteursMaths = {
  ...avec("trig_loi_sinus", { 1: egaliteLoi, 2: quotient, 3: egaliteChiffree, 4: quotientVersCote, 5: coteParLoi, 6: coteParLoi, 7: angleAigu, 8: rayon, 9: coteParLoi, 10: nombreDeTriangles, 11: rayon, 12: angleAigu }),
  ...avec("trig_aire_heron", { 1: aireDeuxCotes, 2: formuleAire, 3: demiPerimetre, 4: aireDeuxCotes, 5: heronExact, 6: heronArrondi, 7: coteDepuisAire, 8: heronArrondi, 9: aireDeuxCotes, 10: rayonInscrit, 11: hauteur }),
};

/** La banque écrit l'unité dans la formule (`15\text{ cm}`), pour qu'elle ne passe pas seule à la ligne : on relit sans. */
export const CORRECTEURS: CorrecteursMaths = Object.fromEntries(
  Object.entries(PAR_GABARIT).map(([id, c]) => [id, (q: Q) => c({ ...q, text: q.text.replace(/\\text\{ ([a-z]+)\}\$/g, "$ $1") })]),
);
