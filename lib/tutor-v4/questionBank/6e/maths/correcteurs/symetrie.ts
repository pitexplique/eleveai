import type { CorrecteurMaths, CorrecteursMaths } from "./types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";

// LES CORRECTEURS DE symetrie.bank.ts (06/10/2026, voir types.ts).
// Ils relisent le CANVAS (sommets bleus, sommets rouges, axe) et recalculent
// l'image de chaque sommet avec leur propre formule de réflexion ; ou ils
// relisent les NOMBRES du texte et refont le calcul. Rien n'est emprunté au
// gabarit.

type Q = TutorGeneratedQuestionV4;
type Pt = { x: number; y: number };

// ─── Outils ─────────────────────────────────────────────────────────────────
const egal = (a: number, b: number) => Math.abs(a - b) < 1e-6;
const val = (s: string) => Number(s.replace(",", "."));
/** La réflexion par rapport à l'axe du canvas (vertical, horizontal, ou droite (from, to)). */
function reflechir(p: Pt, axe: any): Pt {
  if (axe.type === "vertical") return { x: 2 * axe.x - p.x, y: p.y };
  if (axe.type === "horizontal") return { x: p.x, y: 2 * axe.y - p.y };
  const { from: a, to: b } = axe;
  const d = { x: b.x - a.x, y: b.y - a.y };
  const t = ((p.x - a.x) * d.x + (p.y - a.y) * d.y) / (d.x * d.x + d.y * d.y);
  const h = { x: a.x + t * d.x, y: a.y + t * d.y };
  return { x: 2 * h.x - p.x, y: 2 * h.y - p.y };
}
/** Position d'un point par rapport à l'axe (signe) et distance (en carreaux). */
function cote(p: Pt, axe: any): number {
  if (axe.type === "vertical") return p.x - axe.x;
  if (axe.type === "horizontal") return p.y - axe.y;
  const { from: a, to: b } = axe;
  return ((b.x - a.x) * (p.y - a.y) - (b.y - a.y) * (p.x - a.x)) / Math.hypot(b.x - a.x, b.y - a.y);
}
const memePoint = (a: Pt, b: Pt) => egal(a.x, b.x) && egal(a.y, b.y);
const cle = (pts: Pt[]) => pts.map((p) => `${Math.round(p.x * 1e6)},${Math.round(p.y * 1e6)}`).sort().join(" ");
/** QCM : une seule proposition juste, et c'est l'attendue. */
function uneSeule(q: Q, juste: (x: string) => boolean, quoi: string): string[] {
  const ch = (q.choices ?? []).map((x) => x.trim());
  const bons = ch.filter(juste);
  if (bons.length !== 1) return [`${bons.length} proposition(s) justes pour ${quoi} : ${ch.join(" | ")}`];
  if (bons[0] !== q.expected[0].trim()) return [`la proposition juste « ${bons[0]} » n'est pas l'attendue « ${q.expected[0]} »`];
  return [];
}
/** Réponse numérique « 7 cm », « 4,5 cm », « 35° », « 12 cm² », « 3 carreaux ». */
function reponse(q: Q, v: number, u: string): string[] {
  const p: string[] = [];
  const m = String(q.expected[0]).match(/^(\d+(?:,\d+)?) ?(cm²|cm|°|carreaux?)$/);
  if (!m) return [`réponse sans unité ou mal écrite : « ${q.expected[0]} »`];
  if (!egal(val(m[1]), v)) p.push(`réponse attendue « ${q.expected[0]} », recalculée ${v} ${u}`);
  const uu = m[2].startsWith("carreau") ? "carreau" : m[2];
  if (uu !== u) p.push(`unité « ${m[2]} », il faut « ${u} »`);
  if (u === "carreau" && (v > 1) !== (m[2] === "carreaux") && v !== 0) p.push(`accord : « ${q.expected[0]} »`);
  if (!egal(Math.round(v * 100) / 100, v)) p.push(`plus de deux chiffres après la virgule : ${v}`);
  if (/\d\.\d/.test(q.expected[0])) p.push(`point décimal anglais : ${q.expected[0]}`);
  return p;
}

// ─── La figure rouge est-elle l'image de la bleue ? ─────────────────────────
type Defaut = "aucun" | "glisse" | "distance" | "sommet" | "autre";
function defautDuDessin(src: Pt[], img: Pt[], axe: any): { defaut: Defaut; faux: number } {
  const juste = src.map((p) => reflechir(p, axe));
  const faux = img.filter((p, i) => !memePoint(p, juste[i])).length;
  if (faux === 0) return { defaut: "aucun", faux };
  const v = { x: img[0].x - src[0].x, y: img[0].y - src[0].y };
  if (img.every((p, i) => memePoint(p, { x: src[i].x + v.x, y: src[i].y + v.y }))) return { defaut: "glisse", faux };
  const w = { x: img[0].x - juste[0].x, y: img[0].y - juste[0].y };
  const dir = axe.type === "vertical" ? { x: 0, y: 1 } : axe.type === "horizontal" ? { x: 1, y: 0 } : { x: axe.to.x - axe.from.x, y: axe.to.y - axe.from.y };
  if (img.every((p, i) => memePoint(p, { x: juste[i].x + w.x, y: juste[i].y + w.y })) && egal(w.x * dir.x + w.y * dir.y, 0)) return { defaut: "distance", faux };
  if (faux === 1) return { defaut: "sommet", faux };
  return { defaut: "autre", faux };
}
function lireVerdict(x: string): Defaut | null {
  if (/^Oui/.test(x)) return "aucun";
  if (/glissé/.test(x)) return "glisse";
  if (/pas à la même distance/.test(x)) return "distance";
  if (/un des sommets est mal placé/.test(x)) return "sommet";
  return null;
}
/** Le canvas : figure et image sur le quadrillage, la figure d'un seul côté de l'axe. */
function lireCanvas(q: Q): { src: Pt[]; img?: Pt[]; axe: any; problemes: string[] } | null {
  const cv = q.canvas as any;
  if (!cv || cv.kind !== "transformation" || cv.transformation !== "symetrie_axiale") return null;
  const p: string[] = [];
  const { rows, cols } = cv.grid ?? { rows: 8, cols: 8 };
  const dans = (pts: Pt[]) => pts.every((a) => a.x >= 0 && a.x <= cols && a.y >= 0 && a.y <= rows);
  if (!dans(cv.source.points)) p.push("figure bleue hors du quadrillage");
  if (cv.image && !dans(cv.image.points)) p.push("figure rouge hors du quadrillage");
  return { src: cv.source.points, img: cv.image?.points, axe: cv.axis, problemes: p };
}
const corrImage: CorrecteurMaths = (q) => {
  const c = lireCanvas(q);
  if (!c || !c.img || !c.axe) return ["il faut un canvas avec la figure, son image et l'axe"];
  const p = [...c.problemes];
  const cotes = new Set(c.src.map((s) => Math.sign(Math.round(cote(s, c.axe) * 1e6))).filter((s) => s !== 0));
  if (cotes.size !== 1) p.push("la figure bleue est des deux côtés de l'axe");
  if (c.img.length !== c.src.length) return [...p, "la figure rouge n'a pas autant de sommets que la bleue"];
  const { defaut, faux } = defautDuDessin(c.src, c.img, c.axe);
  if (/Combien de sommets|Combien sont faux|combien de sommets faut-il déplacer/.test(q.text)) {
    const dire = (k: number) => (k === 0 ? "aucun" : `${k} sommet${k > 1 ? "s" : ""}`);
    return [...p, ...uneSeule(q, (x) => x === dire(faux), `le nombre de sommets faux (${faux})`)];
  }
  if (defaut === "autre") return [...p, `image fausse de façon imprévue (${faux} sommets faux)`];
  // Un dessin juste ne doit pas pouvoir se lire aussi comme un « glissé » (figure elle-même symétrique).
  const v = { x: c.img[0].x - c.src[0].x, y: c.img[0].y - c.src[0].y };
  if (cle(c.src.map((s) => ({ x: s.x + v.x, y: s.y + v.y }))) === cle(c.src.map((s) => reflechir(s, c.axe))) && defaut !== "glisse")
    p.push("la figure est symétrique : glissée ou retournée, on ne voit pas la différence");
  for (const x of q.choices ?? []) if (!lireVerdict(x)) p.push(`proposition non reconnue : ${x}`);
  return [...p, ...uneSeule(q, (x) => lireVerdict(x) === defaut, `le verdict (${defaut})`)];
};

// ─── SYM_FIGURE ★2 : construire l'image d'un polygone ──────────────────────
const SOMMETS: Record<string, number> = { triangle: 3, quadrilatère: 4, pentagone: 5 };
const corrFigure: CorrecteurMaths = (q) => {
  if (q.canvas) return corrImage(q);
  const m = q.text.match(/du (triangle|quadrilatère|pentagone) ([A-Z]+)/);
  if (!m) return [`polygone introuvable : ${q.text}`];
  const L = m[2].split("");
  if (L.length !== SOMMETS[m[1]]) return [`un ${m[1]} n'a pas ${L.length} sommets`];
  const s = q.text.match(/\[([A-Z])([A-Z])\]/);
  if (s) {
    const [X, Y] = [s[1], s[2]];
    const i = L.indexOf(X), j = L.indexOf(Y);
    if (i < 0 || j < 0 || !(Math.abs(i - j) === 1 || Math.abs(i - j) === L.length - 1)) return [`[${X}${Y}] n'est pas un côté de ${m[2]}`];
    return uneSeule(q, (x) => x === `[${X}'${Y}']`, `l’image de [${X}${Y}]`);
  }
  return uneSeule(q, (x) => L.every((l) => x.includes(`${l}'`)) && !/seulement|aucun/.test(x), "les points à construire");
};

// ─── SYM_POINT ──────────────────────────────────────────────────────────────
const corrPoint: CorrecteurMaths = (q) => {
  const t = q.text;
  const c = lireCanvas(q);
  if (!c) {
    // En centimètres : « à 3,5 cm du pli ».
    const m = t.match(/à (\d+(?:,\d+)?) cm (?:du pli|de son corps|d’une droite \(d\))/);
    if (!m) return [`distance de départ introuvable : ${t}`];
    const d = val(m[1]);
    const entre = /sépare|y a-t-il entre/.test(t);
    return reponse(q, entre ? 2 * d : d, "cm");
  }
  const p = [...c.problemes];
  if (c.src.length !== 1 || !c.axe) return [...p, "il faut un seul point et un axe"];
  const M = (q.canvas as any).source.label;
  if (!new RegExp(`point ${M}\\b|en ${M}\\b|au point ${M}\\b|arbre ${M}\\b`).test(t)) p.push(`le point du canvas (${M}) n'est pas celui du texte`);
  const k = cote(c.src[0], c.axe);
  const d = Math.abs(k);
  if (!Number.isInteger(d)) return [...p, "le point n'est pas sur un nœud du quadrillage"];
  const img = reflechir(c.src[0], c.axe);
  const { rows, cols } = (q.canvas as any).grid;
  if (img.x < 0 || img.x > cols || img.y < 0 || img.y > rows) p.push("le symétrique sort du quadrillage");
  if (q.format !== "qcm") {
    if (/séparent|entre/.test(t)) return [...p, ...reponse(q, 2 * d, "carreau")];
    return [...p, ...reponse(q, d, "carreau")];
  }
  if (d === 0) return [...p, ...uneSeule(q, (x) => /confondu avec/.test(x), "un point de l’axe")];
  // Le côté de l'image : à gauche/à droite (axe vertical), au-dessus/au-dessous (horizontal ; y vers le bas).
  const ou = c.axe.type === "vertical" ? (img.x < c.axe.x ? "à gauche" : "à droite") : img.y < c.axe.y ? "au-dessus" : "au-dessous";
  const car = `${d} carreau${d > 1 ? "x" : ""}`;
  return [...p, ...uneSeule(q, (x) => x === `${car} ${ou} de (d)`, `la place de ${M}'`)];
};

// ─── SYM_AXE ────────────────────────────────────────────────────────────────
/** Le nombre d'axes de figures connues (table du correcteur). */
const AXES: [RegExp, number][] = [
  [/(?<!pas )un carré(?![\wé])/, 4], [/rectangle qui n’est pas un carré/, 2], [/losange qui n’est pas un carré/, 2],
  [/triangle équilatéral/, 3], [/triangle isocèle qui n’est pas équilatéral/, 1], [/trois côtés sont de longueurs différentes/, 0],
  [/lettre [HXI]\b/, 2], [/lettre [AMTVBED]\b/, 1], [/lettre [FLPR]\b/, 0],
];
const direAxes = (k: number) => (k === 0 ? "aucun axe" : `${k} axe${k > 1 ? "s" : ""}`);
/** Tous les axes d'un ensemble de sommets : verticaux, horizontaux, diagonaux. */
function compterAxes(pts: Pt[], n: number, m: number): number {
  const k0 = cle(pts);
  let k = 0;
  const essais: any[] = [];
  for (let i = 0; i <= 2 * Math.max(n, m); i++) {
    essais.push({ type: "vertical", x: i / 2 }, { type: "horizontal", y: i / 2 });
  }
  for (let i = -2 * Math.max(n, m); i <= 4 * Math.max(n, m); i++) {
    essais.push({ type: "line", from: { x: 0, y: i / 2 }, to: { x: 1, y: i / 2 + 1 } });
    essais.push({ type: "line", from: { x: 0, y: i / 2 }, to: { x: 1, y: i / 2 - 1 } });
  }
  for (const a of essais) if (cle(pts.map((p) => reflechir(p, a))) === k0) k++;
  return k;
}
const corrAxe: CorrecteurMaths = (q) => {
  const c = lireCanvas(q);
  if (!c) {
    const a = AXES.find(([re]) => re.test(q.text));
    if (!a) return [`figure inconnue : ${q.text}`];
    return uneSeule(q, (x) => x === direAxes(a[1]), `le nombre d’axes (${a[1]})`);
  }
  const p = [...c.problemes];
  if (c.img) return [...p, "pas de figure rouge ici : on cherche les axes de la figure bleue"];
  if (!c.axe) {
    const { rows, cols } = (q.canvas as any).grid;
    const k = compterAxes(c.src, cols, rows);
    return [...p, ...uneSeule(q, (x) => x === direAxes(k), `le nombre d’axes (${k})`)];
  }
  const estAxe = cle(c.src.map((s) => reflechir(s, c.axe))) === cle(c.src);
  return [...p, ...uneSeule(q, (x) => (estAxe ? /^Oui/.test(x) : /^Non/.test(x)), estAxe ? "un vrai axe" : "un faux axe")];
};

// ─── SYM_PROPRIETE ──────────────────────────────────────────────────────────
const CONSERVES = /longueurs|angles|aire|périmètre|alignement/;
const CHANGENT = /position|sens de la figure/;
function corrigerMesure(q: Q): string[] | null {
  const t = q.text;
  let m: RegExpMatchArray | null;
  if ((m = t.match(/rectangle de (\d+) cm sur (\d+) cm[^.]*?son côté de (\d+) cm posé sur l’axe/))) {
    const [a, b, s] = [Number(m[1]), Number(m[2]), Number(m[3])];
    if (s !== a && s !== b) return [`le côté posé (${s} cm) n'est pas un côté du rectangle`];
    const t2 = s === a ? b : a;
    return /aire/.test(t.slice(m.index! + m[0].length)) ? reponse(q, 2 * s * t2, "cm²") : reponse(q, 2 * (s + 2 * t2), "cm");
  }
  if ((m = t.match(/côtés de (\d+) cm, (\d+) cm et (\d+) cm/))) {
    const c = [m[1], m[2], m[3]].map(Number).sort((x, y) => x - y);
    if (c[0] + c[1] <= c[2]) return ["ce triangle ne peut pas exister"];
    return reponse(q, c[0] + c[1] + c[2], "cm");
  }
  if ((m = t.match(/rectangle mesure (\d+) cm sur (\d+) cm/))) return reponse(q, Number(m[1]) * Number(m[2]), "cm²");
  if ((m = t.match(/segment \[[A-Z]{2}\] mesure (\d+(?:,\d+)?) cm/))) return reponse(q, val(m[1]), "cm");
  if ((m = t.match(/angle [A-Z]{3} mesure (\d+)°/))) {
    if (Number(m[1]) <= 0 || Number(m[1]) >= 180) return ["angle impossible"];
    return reponse(q, Number(m[1]), "°");
  }
  if ((m = t.match(/périmètre de (\d+) cm/))) return reponse(q, Number(m[1]), "cm");
  if ((m = t.match(/aire de (\d+) cm²/))) return reponse(q, Number(m[1]), "cm²");
  return null;
}
const corrPropriete: CorrecteurMaths = (q) => {
  if (q.format === "qcm") {
    const conserve = /conservé|ne change pas/.test(q.text);
    if (!conserve && !/peut changer|peut modifier/.test(q.text)) return [`question non reconnue : ${q.text}`];
    return uneSeule(q, (x) => (conserve ? CONSERVES.test(x) && !CHANGENT.test(x) : CHANGENT.test(x)), conserve ? "ce qui est conservé" : "ce qui change");
  }
  return corrigerMesure(q) ?? [`mesure non reconnue : ${q.text}`];
};

// ─── SYM_DEFI ───────────────────────────────────────────────────────────────
const corrDefi: CorrecteurMaths = (q) => {
  const t = q.text;
  if (q.canvas) return corrImage(q);
  let m: RegExpMatchArray | null;
  if ((m = t.match(/point ([A-Z]) est exactement sur \(d\)/))) return uneSeule(q, (x) => x === `${m![1]}' est confondu avec ${m![1]}`, "un point de l’axe");
  if (/au milieu d/.test(t)) return uneSeule(q, (x) => /se superposent quand on plie/.test(x), "la vérification par pliage");
  if ((m = t.match(/l’un à (\d+) cm du pli, l’autre à (\d+) cm/))) {
    const [a, b] = [Number(m[1]), Number(m[2])];
    return reponse(q, /plus éloignés/.test(t) ? 2 * Math.max(a, b) : 2 * Math.min(a, b), "cm");
  }
  if ((m = t.match(/trou à (\d+(?:,\d+)?) cm du pli/))) return reponse(q, 2 * val(m[1]), "cm");
  if ((m = t.match(/\[([A-Z])\1'\](?: mesure|) ?:? (\d+) cm/))) return reponse(q, Number(m[2]) / 2, "cm");
  return corrigerMesure(q) ?? [`question non reconnue : ${t}`];
};

export const CORRECTEURS: CorrecteursMaths = {
  "6e_sym_reconnaitre_tpl_1_axe_vertical": corrImage,
  "6e_sym_reconnaitre_tpl_2_axe_horizontal": corrImage,
  "6e_sym_reconnaitre_tpl_3_piege_non": corrImage,
  "6e_sym_reconnaitre_tpl_4_axe_oblique": corrImage,
  "6e_sym_reconnaitre_tpl_miroir": corrImage,

  "6e_sym_point_tpl_1_distance": corrPoint,
  "6e_sym_point_tpl_2_position_droite": corrPoint,
  "6e_sym_point_tpl_3_axe_horizontal": corrPoint,
  "6e_sym_point_tpl_centimetres": corrPoint,

  "6e_sym_figure_tpl_1_triangle_canvas_oui": corrFigure,
  "6e_sym_figure_tpl_2_piege_canvas_non": corrFigure,
  "6e_sym_figure_tpl_3_axe_horizontal_canvas": corrFigure,
  "6e_sym_figure_tpl_sommets": corrFigure,
  "6e_sym_figure_tpl_compter_faux": corrFigure,

  "6e_sym_propriete_tpl_1_longueur": corrPropriete,
  "6e_sym_propriete_tpl_2_angle": corrPropriete,
  "6e_sym_propriete_tpl_mesures": corrPropriete,
  "6e_sym_propriete_tpl_calculs": corrPropriete,
  "6e_sym_propriete_tpl_grand_rectangle": corrPropriete,

  "6e_sym_axe_tpl_1_figures_classiques": corrAxe,
  "6e_sym_axe_tpl_2_erreur_rectangle_diagonale": corrAxe,
  "6e_sym_axe_tpl_pliage_simple": corrAxe,
  "6e_sym_axe_tpl_compter_connus": corrAxe,
  "6e_sym_axe_tpl_compter_dessin": corrAxe,

  "6e_sym_defi_tpl_1_canvas_verification": corrDefi,
  "6e_sym_defi_tpl_2_erreur_canvas": corrDefi,
  "6e_sym_defi_tpl_3_margouillat": corrDefi,
  "6e_sym_defi_tpl_point_axe_trou": corrDefi,
  "6e_sym_defi_tpl_trous_rectangle": corrDefi,
};
