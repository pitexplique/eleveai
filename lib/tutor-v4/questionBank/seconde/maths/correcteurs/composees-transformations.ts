// Correcteurs des composées de transformations : ils relisent les transformations écrites, dans
// l'ordre du texte, puis les appliquent vraiment à un point ou à des points d'essai.
import type { CorrecteursMaths } from "@/lib/tutor-v4/questionBank/4e/maths/correcteurs/types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { accepte } from "../../../lycee-correcteurs-stats";
import { compiler, proche, seulChoix } from "../../../lycee-correcteurs-commun";

type Q = TutorGeneratedQuestionV4;
type C = [number, number];
const S = "2de_composee_symetries_tpl_";
const H = "2de_composee_homotheties_tpl_";
const NOMBRE = "(-?\\d+(?:,\\d+)?)";

const net = (t: string) => t.replace(/ /g, " ").replace(/−/g, "-");
const num = (s: string) => Number(s.replace(",", "."));
const fin = (q: Q) => net(q.text).split("\n\n").pop() ?? "";
const exact = (q: Q, j: string) => (net(q.expected[0]) === net(j) ? [] : [`attendu ${q.expected[0]}, recalculé ${j}`]);
const coord = (q: Q): 0 | 1 => (/ordonnée/.test(fin(q)) ? 1 : 0);
const point = (t: string, n: string): C => {
  const m = t.match(new RegExp(`\\b${n}\\(${NOMBRE} ; ${NOMBRE}\\)`));
  if (!m) throw new Error(`point ${n} illisible : ${t}`);
  return [num(m[1]), num(m[2])];
};
/** Tous les couples écrits, dans l'ordre du texte : nom et coordonnées. */
const couples = (t: string) => [...t.matchAll(new RegExp(`\\b([A-Za-z])\\(${NOMBRE} ; ${NOMBRE}\\)`, "g"))].map((m) => ({ n: m[1], c: [num(m[2]), num(m[3])] as C }));
const rapports = (t: string) => [...t.matchAll(new RegExp(`rapport ${NOMBRE}`, "g"))].map((m) => num(m[1]));
const nombreApres = (t: string, r: string) => {
  const m = t.match(new RegExp(`${r} ${NOMBRE}`));
  if (!m) throw new Error(`illisible (${r}) : ${t}`);
  return num(m[1]);
};

/** La nature d'une composée, relue dans le texte. */
function nature(t: string) {
  if (/translation/.test(t)) return "Une translation";
  if (/deux fois de suite/.test(t)) return "L'identité : chaque point revient à sa place";
  if (/de centre .*de centre/.test(t)) return "Une translation";
  if (/parallèles et distinctes/.test(t)) return "Une translation";
  if (/perpendiculaires/.test(t)) return "Une symétrie centrale";
  if (/sécantes/.test(t)) return "Une rotation d'angle non plat";
  return "?";
}

/** Une formule « $x'' = …$ et $y'' = …$ » : fonctions de x et de y. */
function formule(c: string) {
  const m = c.replace(/−/g, "-").match(/\$x'' = (.+?)\$ et \$y'' = (.+?)\$/);
  if (!m) throw new Error(`formule illisible : ${c}`);
  return { fx: compiler(m[1]), fy: compiler(m[2]) };
}
/** La formule convient-elle à la transformation `T` sur quelques points d'essai ? */
const convient = (c: string, T: (p: C) => C) => {
  const { fx, fy } = formule(c);
  return ([[1, 2], [3, 7], [-4, 5]] as C[]).every((p) => {
    const r = T(p);
    return proche(fx({ x: p[0] }), r[0]) && proche(fy({ y: p[1] }), r[1]);
  });
};
const symCentre = (o: C) => (p: C): C => [2 * o[0] - p[0], 2 * o[1] - p[1]];
const homo = (o: C, k: number) => (p: C): C => [o[0] + k * (p[0] - o[0]), o[1] + k * (p[1] - o[1])];
/** Les deux axes « x = a » ou « y = b », dans l'ordre du texte. */
const axes = (t: string) => [...t.matchAll(new RegExp(`axe (x|y) = ${NOMBRE}`, "g"))].map((m) => ({ l: m[1], v: num(m[2]) }));
const symAxe = (a: { l: string; v: number }) => (p: C): C => (a.l === "x" ? [2 * a.v - p[0], p[1]] : [p[0], 2 * a.v - p[1]]);

export const CORRECTEURS: CorrecteursMaths = {
  [`${S}1`]: (q) => exact(q, nature(net(q.text))),
  [`${S}2`]: (q) => {
    const t = net(q.text);
    const m = t.match(/symétrie de centre ([A-Z]), puis celle de centre ([A-Z])/);
    if (!m) return ["centres illisibles"];
    const c = q.canvas as { points: { id: string; x: number; y: number }[] };
    const F = new Map(c.points.map((p) => [p.id, p]));
    const [A, B] = [F.get(m[1])!, F.get(m[2])!];
    const P = c.points.find((p) => /^[A-Z]$/.test(p.id) && p.id !== m[1] && p.id !== m[2])!;
    const fin2 = F.get(`${P.id}''`)!;
    if (!proche(fin2.x - P.x, 2 * (B.x - A.x)) || !proche(fin2.y - P.y, 2 * (B.y - A.y))) return ["la figure ne suit pas la composée"];
    return exact(q, `$2\\overrightarrow{${m[1]}${m[2]}}$`);
  },
  [`${S}3`]: (q) => {
    const c = couples(net(q.text));
    const i = coord(q);
    const s = c.reduce((a, x) => a + x.c[i], 0);
    return accepte(q, s);
  },
  [`${S}4`]: (q) => {
    const t = net(q.text);
    const a = t.match(/font un angle de (\d+)°/);
    const r = t.match(/rotation d'angle (\d+)°/);
    return accepte(q, a ? 2 * Number(a[1]) : Number(r?.[1]) / 2);
  },
  [`${S}5`]: (q) => {
    const t = net(q.text);
    const r = t.match(/translation de longueur (\d+)/);
    if (r) return accepte(q, Number(r[1]) / 2);
    const d = t.match(/(?:distants de|vaut) (\d+)/);
    return accepte(q, 2 * Number(d?.[1]));
  },
  [`${S}6`]: (q) => {
    const t = net(q.text);
    const c = couples(t);
    const r = c.length === 3 ? symCentre(c[1].c)(symCentre(c[0].c)(c[2].c)) : symCentre(c[0].c)(symCentre(c[0].c)(c[1].c));
    return accepte(q, r[coord(q)]);
  },
  [`${S}7`]: (q) => {
    const t = net(q.text);
    const [a, b] = axes(t);
    const c = couples(t);
    const i = a.l === "x" ? 0 : 1;
    if (!c.length) return accepte(q, 2 * (b.v - a.v));
    return accepte(q, symAxe(b)(symAxe(a)(c[0].c))[i]);
  },
  [`${S}8`]: (q) => {
    const t = net(q.text);
    const [a, b] = axes(t);
    const c = couples(t);
    const i = coord(q);
    if (!c.length) return accepte(q, (i === 0 ? [a, b].find((e) => e.l === "x") : [a, b].find((e) => e.l === "y"))!.v);
    return accepte(q, symAxe(b)(symAxe(a)(c[0].c))[i]);
  },
  [`${S}9`]: (q) => {
    const c = q.canvas as { points: { id: string; x: number; y: number }[]; angles: { texte: string }[] };
    const F = new Map(c.points.map((p) => [p.id, p]));
    const [u, v] = [F.get("u_1")!, F.get("v_1")!];
    const mesure = (Math.acos((u.x * v.x + u.y * v.y) / (Math.hypot(u.x, u.y) * Math.hypot(v.x, v.y))) * 180) / Math.PI;
    const ecrit = Number(c.angles[0].texte.replace("°", ""));
    if (Math.abs(mesure - ecrit) > 0.5) return [`angle dessiné ${mesure}, écrit ${ecrit}`];
    return accepte(q, 2 * ecrit);
  },
  [`${S}10`]: (q) => {
    const t = net(q.text);
    const a = t.match(/font un angle de (\d+)°/);
    if (a) return accepte(q, 2 * Number(a[1]));
    const d = t.match(/distants de (\d+) m/) ?? t.match(/distantes de (\d+) cm/);
    return accepte(q, 2 * Number(d?.[1]));
  },
  [`${S}11`]: (q) => {
    const t = net(q.text);
    const c = couples(t);
    const [a, b] = axes(t);
    const T = c.length === 2 ? (p: C) => symCentre(c[1].c)(symCentre(c[0].c)(p)) : (p: C) => symAxe(b)(symAxe(a)(p));
    return seulChoix(q, (ch) => convient(ch, T));
  },
  [`${S}12`]: (q) => {
    const t = net(q.text);
    const u = point(t, "u");
    const c = couples(t).find((x) => x.n !== "u")!;
    const i = coord(q);
    // On résout : le second centre J vérifie 2(J − I) = u, vérifié sur la composée.
    const J: C = [c.c[0] + u[0] / 2, c.c[1] + u[1] / 2];
    const r = symCentre(J)(symCentre(c.c)([0, 0]));
    if (!proche(r[0], u[0]) || !proche(r[1], u[1])) return ["la composée ne redonne pas u"];
    return accepte(q, J[i]);
  },
  [`${S}13`]: (q) => {
    const t = net(q.text);
    const m = [...t.matchAll(/par rapport à (l'axe des abscisses|l'axe des ordonnées|la droite d'équation y = -?x)/g)].map((x) => x[1]);
    const f = (n: string, [x, y]: C): C => (/abscisses/.test(n) ? [x, -y] : /ordonnées/.test(n) ? [-x, y] : /= -x/.test(n) ? [-y, -x] : [y, x]);
    const P = couples(t)[0].c;
    return accepte(q, f(m[1], f(m[0], P))[coord(q)]);
  },

  /* Homothéties */
  [`${H}1`]: (q) => {
    const [a, b] = rapports(net(q.text));
    return accepte(q, a * b);
  },
  [`${H}2`]: (q) => {
    const t = net(q.text);
    const [a, b] = rapports(t);
    const c = t.match(/centre ([A-Z])/)?.[1];
    const p = a * b;
    const j = proche(p, 1) ? "L'identité : chaque point reste à sa place" : proche(p, -1) ? `La symétrie de centre ${c}` : `L'homothétie de centre ${c} et de rapport ${String(p).replace(".", ",")}`;
    return exact(q, j);
  },
  [`${H}3`]: (q) => {
    const t = net(q.text);
    const [a, b] = rapports(t);
    return accepte(q, nombreApres(t, "mesure") * Math.abs(a * b));
  },
  [`${H}4`]: (q) => {
    const [a, tot] = rapports(net(q.text));
    return accepte(q, tot / a);
  },
  [`${H}5`]: (q) => {
    const t = net(q.text);
    const c = couples(t);
    const k = rapports(t)[0];
    const O = c.find((x) => x.n !== "u" && t.includes(`centre ${x.n}(`))!.c;
    const u = point(t, "u");
    const dep = c[c.length - 1].c;
    const tr = (p: C): C => [p[0] + u[0], p[1] + u[1]];
    const homoAvant = t.indexOf("homothétie") < t.indexOf("translation");
    const r = homoAvant ? tr(homo(O, k)(dep)) : homo(O, k)(tr(dep));
    return accepte(q, r[coord(q)]);
  },
  [`${H}6`]: (q) => {
    const t = net(q.text);
    const r = rapports(t);
    const p = r.length === 1 ? r[0] : r[0] * r[1];
    // Une homothétie suivie d'une translation garde le rapport ; produit 1 : translation.
    return exact(q, proche(p, 1) ? "Une translation" : `Une homothétie de rapport ${String(Math.round(p * 1e6) / 1e6).replace(".", ",")}`);
  },
  [`${H}7`]: (q) => {
    const t = net(q.text);
    const k = rapports(t)[0];
    const th = nombreApres(t, "d'angle");
    const L = t.match(/[A-Z]{2} = (\d+) /);
    if (/angle/.test(fin(q))) return accepte(q, th);
    return accepte(q, Number(L?.[1]) * k);
  },
  [`${H}8`]: (q) => {
    const t = net(q.text);
    const A = nombreApres(t, "aire de");
    const r = rapports(t);
    const p = r.reduce((a, x) => a * x, 1);
    return accepte(q, A * p * p);
  },
  [`${H}9`]: (q) => {
    const t = net(q.text);
    const k = rapports(t)[0];
    const c = couples(t);
    const O = c.find((x) => x.n !== "u")!.c;
    const u = point(t, "u");
    // Le point fixe de M ↦ h(M) + u.
    const Om: C = [O[0] + u[0] / (1 - k), O[1] + u[1] / (1 - k)];
    const im = homo(O, k)(Om);
    if (!proche(im[0] + u[0], Om[0]) || !proche(im[1] + u[1], Om[1])) return ["le point n'est pas fixe"];
    return accepte(q, Om[coord(q)]);
  },
  [`${H}10`]: (q) => {
    const t = net(q.text);
    const O = couples(t)[0].c;
    const [a, b] = rapports(t);
    return seulChoix(q, (ch) => convient(ch, (p) => homo(O, b)(homo(O, a)(p))));
  },
  [`${H}11`]: (q) => {
    const t = net(q.text);
    const k = rapports(t)[0];
    const [x, y] = couples(t)[0].c;
    const r: C = /sens direct/.test(t) ? [-y, x] : /sens indirect/.test(t) ? [y, -x] : [-x, -y];
    return accepte(q, k * r[coord(q)]);
  },
  [`${H}12`]: (q) => {
    const t = net(q.text);
    const co = [...t.matchAll(/coefficient (\d+(?:,\d+)?)/g)].map((m) => num(m[1]));
    return accepte(q, nombreApres(t, "mesure") * co[0] * co[1]);
  },
  [`${H}13`]: (q) => {
    const t = net(q.text);
    const L: Record<string, number> = {};
    for (const m of t.matchAll(/([A-Z]'?[A-Z]'?) = (\d+(?:,\d+)?) cm/g)) L[m[1]] = num(m[2]);
    const ang = t.match(/l'angle en [A-Z] mesure (\d+)°/);
    if (ang) return accepte(q, Number(ang[1]));
    const im = Object.keys(L).find((k) => k.includes("'"))!;
    const k = L[im] / L[im.replace(/'/g, "")];
    if (/rapport|multipliées/.test(fin(q))) return accepte(q, k);
    const X = fin(q).match(/([A-Z])'([A-Z])'/);
    return accepte(q, L[`${X?.[1]}${X?.[2]}`] * k);
  },
};
