// Correcteurs de la projection sur une droite : ils relisent les longueurs et les abscisses écrites
// dans l'énoncé, et les coordonnées de la figure, puis recalculent.
import type { CorrecteursMaths } from "@/lib/tutor-v4/questionBank/4e/maths/correcteurs/types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { accepte } from "../../../lycee-correcteurs-stats";

type Q = TutorGeneratedQuestionV4;
const P = "2de_projection_parallele_tpl_";

const net = (t: string) => t.replace(/ /g, " ").replace(/−/g, "-");
const num = (s: string) => Number(s.replace(",", "."));
const derniere = (q: Q) => net(q.text).split("\n\n").pop() ?? "";

/** { "AB": 6, "A'B'": 3 } : les longueurs posées dans l'énoncé. */
function longueurs(q: Q) {
  const o: Record<string, number> = {};
  for (const m of net(q.text).matchAll(/([A-Z]'?[A-Z]'?) = (\d+(?:,\d+)?) (?:cm|dm|mm|m)\b/g)) o[m[1]] = num(m[2]);
  return o;
}
/** Le segment image demandé, dans le dernier paragraphe. */
const demande = (q: Q) => derniere(q).match(/([A-Z]'[A-Z]')/)?.[1] ?? "";
const abscisses = (q: Q) => {
  const o: Record<string, number> = {};
  for (const m of net(q.text).matchAll(/([A-Z])' a pour abscisse (-?\d+)/g)) o[m[1]] = Number(m[2]);
  return o;
};
const lireK = (t: string) => {
  const m = t.match(/\\overrightarrow\{[A-Z]+\} = (-?)(?:\\dfrac\{(\d+)\}\{(\d+)\}|(\d+))\\,\\overrightarrow/);
  if (!m) throw new Error(`coefficient illisible : ${t}`);
  return (m[1] ? -1 : 1) * (m[2] ? Number(m[2]) / Number(m[3]) : Number(m[4]));
};

/** Sur la figure : chaque image est sur (d), et le lien X X' est parallèle à (δ). */
function figureJuste(q: Q): string[] {
  const c = q.canvas as { points: { id: string; x: number; y: number }[]; segments: { a: string; b: string; texte?: string }[] } | undefined;
  if (!c) return ["pas de figure"];
  const F = new Map(c.points.map((p) => [p.id, p]));
  const [d0, d1, a, b] = ["d_0", "d_1", "dir_0", "dir_1"].map((i) => F.get(i)!);
  const ud = { x: d1.x - d0.x, y: d1.y - d0.y };
  const ua = { x: b.x - a.x, y: b.y - a.y };
  const ang = (u: { x: number; y: number }, v: { x: number; y: number }) => Math.abs(u.x * v.y - u.y * v.x) / (Math.hypot(u.x, u.y) * Math.hypot(v.x, v.y));
  for (const p of c.points) {
    if (!p.id.endsWith("'")) continue;
    const o = F.get(p.id.slice(0, -1))!;
    if (ang(ud, { x: p.x - d0.x, y: p.y - d0.y }) > 0.02) return [`${p.id} n'est pas sur (d)`];
    if (ang(ua, { x: p.x - o.x, y: p.y - o.y }) > 0.02) return [`le lien de ${p.id} n'est pas parallèle à (δ)`];
  }
  return [];
}

export const CORRECTEURS: CorrecteursMaths = {
  [`${P}1`]: (q) => {
    const c = q.canvas as { points: { id: string; x: number; y: number; cache?: boolean }[] };
    const F = new Map(c.points.map((p) => [p.id, p]));
    const [d0, d1, a, b] = ["d_0", "d_1", "dir_0", "dir_1"].map((i) => F.get(i)!);
    const nom = derniere(q).match(/\b([A-Z])\b(?! ?')/g)?.filter((x) => F.has(x) && !(q.choices ?? []).includes(x))[0];
    if (!nom) return ["point illisible"];
    const M = F.get(nom)!;
    const u = { x: d1.x - d0.x, y: d1.y - d0.y };
    const v = { x: b.x - a.x, y: b.y - a.y };
    const D = u.x * v.y - u.y * v.x;
    const t = ((M.x - d0.x) * v.y - (M.y - d0.y) * v.x) / D;
    const H = { x: d0.x + t * u.x, y: d0.y + t * u.y };
    const dist = (q.choices ?? []).map((n) => [n, Math.hypot(F.get(n)!.x - H.x, F.get(n)!.y - H.y)] as const).sort((x, y) => x[1] - y[1]);
    if (dist[0][1] > 0.05) return [`aucun candidat sur l'image : ${dist[0][1]}`];
    if (dist[1][1] < 0.6) return ["deux candidats trop proches"];
    return q.expected[0] === dist[0][0] ? [] : [`attendu ${q.expected[0]}, recalculé ${dist[0][0]}`];
  },
  [`${P}2`]: (q) => {
    const v = Object.values(abscisses(q));
    return accepte(q, (v[0] + v[1]) / 2);
  },
  [`${P}3`]: (q) => {
    const L = longueurs(q);
    const d = demande(q);
    const [k, v] = Object.entries(L)[0];
    const r = k.includes("I") ? 2 * v : d.includes("I") ? v / 2 : NaN;
    return [...figureJuste(q), ...accepte(q, r)];
  },
  [`${P}4`]: (q) => {
    const t = net(q.text);
    const fixe = t.match(/Le point ([A-Z]) est sur la droite \(d\)/);
    const mil = t.match(/le milieu de \[([A-Z])([A-Z])\]/);
    const seg = t.match(/Le segment \[([A-Z])([A-Z])\] est parallèle à \(d\)/);
    const j = fixe ? `${fixe[1]} lui-même`
      : /est parallèle à \(δ\)/.test(t) ? "Elles sont confondues"
      : mil ? `Au milieu de [${mil[1]}'${mil[2]}']`
      : /tous les points du plan/.test(t) ? "Sur la droite (d)"
      : /perpendiculaire à \(d\)/.test(t) ? "La projection orthogonale sur (d)"
      : seg ? `${seg[1]}'${seg[2]}' = ${seg[1]}${seg[2]}`
      : "?";
    return net(q.expected[0]) === j ? [] : [`attendu ${q.expected[0]}, recalculé ${j}`];
  },
  [`${P}5`]: (q) => {
    const L = longueurs(q);
    const d = demande(q);
    const e = Object.keys(L);
    const image = e.find((k) => k.includes("'"))!;
    const source = image.replace(/'/g, "");
    return [...figureJuste(q), ...accepte(q, (L[d.replace(/'/g, "")] * L[image]) / L[source])];
  },
  [`${P}6`]: (q) => {
    const t = net(q.text);
    const k = lireK(t);
    const L = longueurs(q);
    const e = Object.keys(L);
    return accepte(q, e.length ? L[e[0]] * Math.abs(k) : k);
  },
  [`${P}7`]: (q) => {
    const L = longueurs(q);
    const d = demande(q);
    const image = Object.keys(L).find((k) => k.includes("'"))!;
    return accepte(q, (L[d.replace(/'/g, "")] * L[image]) / L[image.replace(/'/g, "")]);
  },
  [`${P}8`]: (q) => {
    const t = net(q.text);
    const ok = /sont parallèles\. A-t-on/.test(t) || /sont alignés\. A-t-on/.test(t);
    const j = ok ? "Oui, toujours" : "Non, pas en général";
    return q.expected[0] === j ? [] : [`attendu ${q.expected[0]}, recalculé ${j}`];
  },
  [`${P}9`]: (q) => {
    const t = net(q.text);
    const m = [...t.matchAll(/([A-Z])' a pour abscisse (-?\d+)/g)];
    const [x, y] = [Number(m[0][2]), Number(m[1][2])];
    return accepte(q, x + lireK(t) * (y - x));
  },
  [`${P}10`]: (q) => {
    const L = longueurs(q);
    const d = demande(q);
    const image = Object.keys(L).find((k) => k.includes("'"))!;
    return [...figureJuste(q), ...accepte(q, (L[d.replace(/'/g, "")] * L[image]) / L[image.replace(/'/g, "")])];
  },
  [`${P}11`]: (q) => {
    const t = net(q.text);
    const L = t.match(/de (\d+(?:,\d+)?) cm en parts égales/);
    const n = t.match(/et (\d+) intervalles/);
    if (!L || !n) return ["énoncé illisible"];
    return accepte(q, num(L[1]) / Number(n[1]));
  },
  [`${P}12`]: (q) => {
    const t = net(q.text);
    const c = t.match(/mesure (\d+) m entre/);
    const h = t.match(/est (\d+) m plus haut/);
    if (!c || !h) return ["énoncé illisible"];
    return accepte(q, Math.sqrt(Number(c[1]) ** 2 - Number(h[1]) ** 2));
  },
  [`${P}13`]: (q) => {
    const t = net(q.text);
    const u = t.match(/\\vec\{u\}\\,\((-?\d+)\\,;\\,(-?\d+)\)/);
    const M = t.match(/\$[A-Z]\((-?\d+)\\,;\\,(-?\d+)\)\$/);
    if (!u || !M) return ["énoncé illisible"];
    const [a, b, x, y] = [u[1], u[2], M[1], M[2]].map(Number);
    return accepte(q, /axe des abscisses/.test(t) ? x - (y * a) / b : y - (x * b) / a);
  },
};
