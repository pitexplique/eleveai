import type { CorrecteursMaths } from "./types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { avecRegleMotsCles, egal, qcmUnique } from "@/lib/tutor-v4/questionBank/6e/maths/correcteurs/pourcentages";

// LES CORRECTEURS DE aires.bank.ts (notion aire_surface, 13/10/2026).
// Ils relisent le TEXTE (base, hauteur, côtés, rangées, unité du carré unité,
// prix au m²) et la FIGURE (cases d'un quadrillage COMPTÉES une à une ;
// triangle et parallélogramme : étiquettes ET proportions du dessin — la
// hauteur dessinée doit valoir la hauteur écrite à l'échelle de la base), puis
// refont le calcul : rectangle L × l, triangle b × h ÷ 2, parallélogramme b × h,
// figures composées par somme ou différence. Vide = juste.

type Q = TutorGeneratedQuestionV4;
const num = (s: string) => Number(String(s).replace(/ /g, "").replace(",", "."));
// Un nombre écrit à la française : 3 330 ; 12,5.
const NB = "(\\d{1,3}(?: \\d{3})+(?:,\\d+)?|\\d+(?:,\\d+)?)";
const U = "(mm|cm|dm|m|km)";

/** La réponse attendue « 24 cm² » : la valeur juste et l'unité. */
function reponse(q: Q, juste: number, unite: string): string[] {
  const m = String(q.expected[0]).match(/^(\d{1,3}(?: \d{3})*(?:,\d+)?)\s*(.*)$/);
  const p: string[] = [];
  if (!m || !egal(num(m[1]), Math.round(juste * 100) / 100)) p.push(`attendu « ${q.expected[0]} », le calcul donne ${fr(juste)}`);
  else if (m[1] !== fr(juste)) p.push(`écriture « ${m[1]} » au lieu de « ${fr(juste)} » (espace des milliers)`);
  else if (m[2].trim() !== unite) p.push(`unité « ${m[2]} » au lieu de « ${unite} »`);
  if (q.comparator !== "number_equal") p.push(`comparateur ${q.comparator} pour un nombre`);
  if (Math.abs(juste * 100 - Math.round(juste * 100)) > 1e-6) p.push("plus de deux décimales");
  return p;
}

/** Les cases colorées d'un quadrillage (comptées sur la figure, sans doublon). */
function cases(q: Q): number | null {
  const cv = q.canvas as any;
  if (!cv || cv.kind !== "figure_libre") return null;
  const c = cv.grid.filledCells as [number, number][];
  if (new Set(c.map((x) => `${x[0]};${x[1]}`)).size !== c.length) return -1;
  if (c.some(([r, k]) => r < 0 || k < 0 || r >= cv.grid.rows || k >= cv.grid.cols)) return -1;
  return c.length;
}

/** Compter les carrés unités : l'aire du carré unité est lue dans le texte (« de 1 cm² »). */
function compterCases(q: Q): string[] {
  const n = cases(q);
  const m = q.text.match(/de 1 (cm|dm|m)²/);
  if (n == null || n < 0) return ["quadrillage absent ou mal formé"];
  if (!m) return ["aire du carré unité non lue"];
  const p = reponse(q, n, `${m[1]}²`);
  const r = q.text.match(/(\d+) rangées de (\d+)/);
  if (r && Number(r[1]) * Number(r[2]) !== n) p.push(`le texte dit ${r[1]} × ${r[2]}, la figure a ${n} cases`);
  return p;
}

/** L'unité d'aire : celle des longueurs, au carré. */
function uniteAire(q: Q): string[] {
  const mots: Record<string, string> = { millimètres: "mm", centimètres: "cm", décimètres: "dm", mètres: "m", kilomètres: "km" };
  const m = q.text.match(/en (millimètres|centimètres|décimètres|mètres|kilomètres)/);
  if (!m) return ["unité des longueurs non lue"];
  return qcmUnique(q, (c) => c === `${mots[m[1]]}²`);
}

/** Aire ou périmètre d'un rectangle « de L u sur l u ». */
function aireOuPerimetre(q: Q): string[] {
  const m = q.text.match(new RegExp(`${NB} ${U} sur ${NB} ${U}`));
  if (!m || m[2] !== m[4]) return ["dimensions non lues"];
  const L = num(m[1]), l = num(m[3]), u = m[2];
  const veutAire = /aire|surface/.test(q.text.split(/(?<=\.) /).pop() ?? "");
  const juste = veutAire ? `${fr(L * l)} ${u}²` : `${fr(2 * (L + l))} ${u}`;
  const p = qcmUnique(q, (c) => c === juste);
  if (egal(L * l, 2 * (L + l))) p.push("aire et périmètre ont la même valeur : leurres ambigus");
  return p;
}
const fr = (x: number) => {
  const [e, d] = String(Math.round(x * 100) / 100).split(".");
  return e.replace(/\B(?=(\d{3})+(?!\d))/g, " ") + (d ? `,${d}` : "");
};

/* ─── TRIANGLES ET PARALLÉLOGRAMMES : le texte ET le dessin ─────────────── */

type Pt = { x: number; y: number };
const d = (a: Pt, b: Pt) => Math.hypot(a.x - b.x, a.y - b.y);
const proche = (a: number, b: number) => Math.abs(a - b) <= 0.02 * Math.max(a, b);

/** La base, la hauteur, le côté oblique et l'aire écrits dans le texte. */
function donnees(t: string) {
  const base = t.match(new RegExp(`base \\[([A-Z])([A-Z])\\] mesure ${NB} ${U}`));
  const haut =
    t.match(new RegExp(`hauteur issue de ([A-Z]) mesure ${NB} ${U}`)) ??
    t.match(new RegExp(`hauteur relative à cette base mesure ()${NB} ${U}`));
  const cote = t.match(new RegExp(`côté \\[([A-Z])([A-Z])\\] mesure ${NB} ${U}`));
  const aire = t.match(new RegExp(`aire du (?:triangle|parallélogramme) [A-Z]{3,4} est ${NB} ${U}²`));
  return {
    b: base ? num(base[3]) : null,
    bNom: base ? base[1] + base[2] : null,
    h: haut ? num(haut[2]) : null,
    hDe: haut ? haut[1] : null,
    c: cote ? num(cote[3]) : null,
    cNom: cote ? cote[1] + cote[2] : null,
    aire: aire ? num(aire[1]) : null,
    u: (base?.[4] ?? haut?.[3] ?? aire?.[2]) as string | undefined,
    unites: [base?.[4], haut?.[3], cote?.[4], aire?.[2]].filter(Boolean) as string[],
  };
}

/** Le dessin d'un triangle : noms, étiquettes, et proportions (base / hauteur / côté). */
function dessinTriangle(q: Q, b: number, h: number, u: string, c?: number | null): string[] {
  const cv = q.canvas as any;
  if (!cv || cv.kind !== "triangle") return ["pas de triangle dessiné"];
  const p: string[] = [];
  const nom = q.text.match(/triangle ([A-Z]{3})(?![A-Za-z])/)?.[1];
  if (!nom || [cv.labels.A, cv.labels.B, cv.labels.C].join("") !== nom) p.push(`sommets du dessin ${JSON.stringify(cv.labels)} ≠ triangle ${nom}`);
  const P = cv.points;
  const ab = d(P.A, P.B);
  if (Math.abs(P.A.y - P.B.y) > 1e-6) p.push("la base n'est pas horizontale");
  const hp = Math.abs(P.A.y - P.C.y);
  if (!proche(ab / hp, b / h)) p.push(`dessin : base / hauteur = ${(ab / hp).toFixed(2)} au lieu de ${(b / h).toFixed(2)}`);
  const lab = (s: unknown, v: number) => s === "?" || s === `${fr(v)} ${u}`;
  if (cv.sideLabels?.AB !== undefined && !lab(cv.sideLabels.AB, b)) p.push(`étiquette de la base « ${cv.sideLabels.AB} »`);
  if (cv.marks?.rightAngleAt === "A") {
    if (Math.abs(P.A.x - P.C.x) > 1e-6) p.push("angle droit codé mais pas droit");
    if (cv.sideLabels?.CA !== undefined && !lab(cv.sideLabels.CA, h)) p.push(`étiquette du côté de l'angle droit « ${cv.sideLabels.CA} »`);
  } else if (!cv.height || cv.height.fromVertex !== "C" || !lab(cv.height.label, h)) p.push(`hauteur dessinée « ${cv.height?.label} » au lieu de ${fr(h)} ${u}`);
  if (c != null) {
    if (!proche(d(P.B, P.C) / ab, c / b)) p.push(`dessin : côté oblique / base = ${(d(P.B, P.C) / ab).toFixed(2)} au lieu de ${(c / b).toFixed(2)}`);
    if (!lab(cv.sideLabels?.BC, c)) p.push(`étiquette du côté oblique « ${cv.sideLabels?.BC} »`);
  }
  return p;
}

const memeUnite = (x: ReturnType<typeof donnees>) => (new Set(x.unites).size > 1 ? ["unités mélangées dans le texte"] : []);

function aireTriangle(q: Q): string[] {
  const x = donnees(q.text);
  if (x.b == null || x.h == null || !x.u) return ["base ou hauteur non lues"];
  return [...memeUnite(x), ...reponse(q, (x.b * x.h) / 2, `${x.u}²`), ...dessinTriangle(q, x.b, x.h, x.u, x.c)];
}
function aireTriangleRectangle(q: Q): string[] {
  const r = q.text.match(/rectangle en ([A-Z])/);
  if (!r) return ["sommet de l'angle droit non lu"];
  const X = r[1];
  const cotes = [...q.text.matchAll(new RegExp(`\\[${X}([A-Z])\\] (?:qui )?mesure ${NB} ${U}`, "g"))];
  if (cotes.length !== 2) return [`deux côtés issus de ${X} attendus, lu ${cotes.length}`];
  const u = cotes[0][3];
  const [b, h] = [num(cotes[0][2]), num(cotes[1][2])];
  const p = reponse(q, (b * h) / 2, `${u}²`);
  // Le dessin : [AB] (premier côté de la base) et [AC].
  const cv = q.canvas as any;
  const lAB = cotes.find((c) => c[1] === cv?.labels?.B);
  const lAC = cotes.find((c) => c[1] === cv?.labels?.C);
  if (!lAB || !lAC || cv.labels.A !== X) return [...p, "le dessin ne place pas l'angle droit au bon sommet"];
  return [...p, ...dessinTriangle(q, num(lAB[2]), num(lAC[2]), u)];
}
function qcmTriangle(q: Q): string[] {
  const x = donnees(q.text);
  if (x.b == null || x.h == null || !x.u) return ["base ou hauteur non lues"];
  return [...qcmUnique(q, (c) => c === `${fr((x.b! * x.h!) / 2)} ${x.u}²`), ...dessinTriangle(q, x.b, x.h, x.u)];
}
function hauteurTriangle(q: Q): string[] {
  const x = donnees(q.text);
  if (x.aire == null || x.b == null || !x.u) return ["aire ou base non lues"];
  const h = (2 * x.aire) / x.b;
  return [...memeUnite(x), ...reponse(q, h, x.u), ...dessinTriangle(q, x.b, h, x.u)];
}
function baseTriangle(q: Q): string[] {
  const x = donnees(q.text);
  if (x.aire == null || x.h == null || !x.u) return ["aire ou hauteur non lues"];
  const b = (2 * x.aire) / x.h;
  return [...memeUnite(x), ...reponse(q, b, x.u), ...dessinTriangle(q, b, x.h, x.u)];
}

/** Le dessin d'un parallélogramme : noms, parallélisme, étiquettes, proportions. */
function dessinPara(q: Q, b: number, h: number, u: string, c?: number | null): string[] {
  const cv = q.canvas as any;
  if (!cv || cv.kind !== "quadrilatere") return ["pas de parallélogramme dessiné"];
  const p: string[] = [];
  const nom = q.text.match(/parallélogramme ([A-Z]{4})(?![A-Za-z])/)?.[1];
  if (!nom || ["A", "B", "C", "D"].map((k) => cv.labels[k]).join("") !== nom) p.push(`sommets du dessin ≠ parallélogramme ${nom}`);
  const P = cv.points;
  if (Math.abs(P.B.x - P.A.x - (P.C.x - P.D.x)) > 1e-6 || Math.abs(P.B.y - P.A.y - (P.C.y - P.D.y)) > 1e-6) p.push("le dessin n'est pas un parallélogramme");
  if (Math.abs(P.A.y - P.B.y) > 1e-6) p.push("la base n'est pas horizontale");
  const ab = d(P.A, P.B), hp = Math.abs(P.A.y - P.D.y);
  if (!proche(ab / hp, b / h)) p.push(`dessin : base / hauteur = ${(ab / hp).toFixed(2)} au lieu de ${(b / h).toFixed(2)}`);
  const lab = (s: unknown, v: number) => s === "?" || s === `${fr(v)} ${u}`;
  if (!lab(cv.sideLabels?.AB, b)) p.push(`étiquette de la base « ${cv.sideLabels?.AB} »`);
  if (!cv.height || cv.height.fromVertex !== "D" || cv.height.onSide !== "AB" || !lab(cv.height.label, h)) p.push(`hauteur dessinée « ${cv.height?.label} »`);
  if (c != null) {
    if (!proche(d(P.A, P.D) / ab, c / b)) p.push(`dessin : côté oblique / base = ${(d(P.A, P.D) / ab).toFixed(2)} au lieu de ${(c / b).toFixed(2)}`);
    if (!lab(cv.sideLabels?.DA, c)) p.push(`étiquette du côté oblique « ${cv.sideLabels?.DA} »`);
  } else if (cv.sideLabels?.DA || cv.sideLabels?.AD) p.push("le côté oblique porte une étiquette non écrite dans le texte");
  return p;
}
function airePara(q: Q): string[] {
  const x = donnees(q.text);
  if (x.b == null || x.h == null || !x.u) return ["base ou hauteur non lues"];
  const juste = `${fr(x.b * x.h)} ${x.u}²`;
  const r = q.format === "qcm" ? qcmUnique(q, (c) => c === juste) : reponse(q, x.b * x.h, `${x.u}²`);
  return [...memeUnite(x), ...r, ...dessinPara(q, x.b, x.h, x.u, x.c)];
}
function hauteurPara(q: Q): string[] {
  const x = donnees(q.text);
  if (x.aire == null || x.b == null || !x.u) return ["aire ou base non lues"];
  const h = x.aire / x.b;
  return [...memeUnite(x), ...reponse(q, h, x.u), ...dessinPara(q, x.b, h, x.u)];
}
function basePara(q: Q): string[] {
  const x = donnees(q.text);
  if (x.aire == null || x.h == null || !x.u) return ["aire ou hauteur non lues"];
  const b = x.aire / x.h;
  return [...memeUnite(x), ...reponse(q, b, x.u), ...dessinPara(q, b, x.h, x.u)];
}

/* ─── FIGURES COMPOSÉES ET DÉFIS ───────────────────────────────────────── */

/** Les rectangles « de L u sur l u » du texte, dans l'ordre. */
const rectangles = (t: string) =>
  [...t.matchAll(new RegExp(`${NB} ${U} sur ${NB} ${U}`, "g"))].map((m) => ({ L: num(m[1]), l: num(m[3]), u: m[2], u2: m[4] }));

function figureEnL(q: Q): string[] {
  const R = rectangles(q.text);
  if (R.length !== 2 || R.some((r) => r.u !== r.u2 || r.u !== R[0].u)) return ["deux rectangles attendus"];
  const total = R[0].L * R[0].l + R[1].L * R[1].l;
  const p = reponse(q, total, `${R[0].u}²`);
  const n = cases(q);
  if (n !== total) p.push(`la figure a ${n} carreaux, les rectangles en font ${total}`);
  return p;
}
function maisonTriangle(q: Q): string[] {
  const r = q.text.match(new RegExp(`rectangle de ${NB} ${U} sur ${NB} ${U}`));
  const t = q.text.match(new RegExp(`triangle de base ${NB} ${U} et de hauteur ${NB} ${U}`));
  if (!r || !t) return ["rectangle ou triangle non lus"];
  const p = reponse(q, num(r[1]) * num(r[3]) + (num(t[1]) * num(t[3])) / 2, `${r[2]}²`);
  if (!egal(num(t[1]), num(r[1]))) p.push("la base du triangle n'est pas le côté du rectangle sur lequel il est posé");
  return p;
}
function sommeDeuxAires(q: Q): string[] {
  const A = [...q.text.matchAll(new RegExp(`${NB} ${U}²`, "g"))];
  if (A.length !== 2 || A[0][2] !== A[1][2]) return ["deux aires attendues"];
  return qcmUnique(q, (c) => c === `${fr(num(A[0][1]) + num(A[1][1]))} ${A[0][2]}²`);
}
function carreauxDeCote(q: Q): string[] {
  const n = cases(q);
  const k = q.text.match(new RegExp(`carrés? de ${NB} ${U} de côté`));
  if (n == null || n < 0 || !k) return ["carreaux ou côté non lus"];
  return reponse(q, n * num(k[1]) ** 2, `${k[2]}²`);
}
function aireRestante(q: Q): string[] {
  const R = rectangles(q.text);
  if (R.length !== 2) return ["deux rectangles attendus"];
  const [g, pt] = R;
  const p = reponse(q, g.L * g.l - pt.L * pt.l, `${g.u}²`);
  if (!(Math.max(pt.L, pt.l) <= Math.max(g.L, g.l) && Math.min(pt.L, pt.l) <= Math.min(g.L, g.l))) p.push("la partie enlevée ne tient pas dans le grand rectangle");
  return p;
}
function comparaison(q: Q): string[] {
  const m = q.text.match(
    new RegExp(`^(\\S+) a (?:un|une) .*? rectangulaire de ${NB} ${U} sur ${NB} ${U}\\. (\\S+) a (?:un|une) .*? triangulaire de base ${NB} ${U} et de hauteur ${NB} ${U}`),
  );
  if (!m) return ["les deux surfaces non lues"];
  const aR = num(m[2]) * num(m[4]);
  const aT = (num(m[7]) * num(m[9])) / 2;
  const juste = egal(aR, aT) ? "les deux ont la même aire" : aR > aT ? m[1] : m[6];
  return qcmUnique(q, (c) => c === juste);
}
function dimensionManquante(q: Q): string[] {
  const a = q.text.match(new RegExp(`aire (?:est|de) ${NB} ${U}²`));
  const dn = q.text.match(new RegExp(`(longueur|largeur) (?:est|de) ${NB} ${U}`));
  const ch = q.text.match(/sa (longueur|largeur)(?: \?|\.)$/);
  if (!a || !dn || !ch) return ["aire, dimension donnée ou demandée non lues"];
  if (ch[1] === dn[1]) return ["on demande la dimension déjà donnée"];
  const v = num(a[1]) / num(dn[2]);
  const p = reponse(q, v, dn[3]);
  if (ch[1] === "longueur" ? v < num(dn[2]) : v > num(dn[2])) p.push("la longueur est plus petite que la largeur");
  return p;
}
function triangleObtus(q: Q): string[] {
  const x = donnees(q.text);
  if (x.b == null || x.h == null || x.c == null || !x.u) return ["base, hauteur ou côté non lus"];
  const p = [...qcmUnique(q, (c) => c === `${fr((x.b! * x.h!) / 2)} ${x.u}²`), ...dessinTriangle(q, x.b, x.h, x.u, x.c)];
  const P = (q.canvas as any).points;
  if (!(P.C.x > P.B.x || P.C.x < P.A.x)) p.push("le texte dit obtus, mais le pied de la hauteur tombe sur la base");
  if (x.c <= x.h) p.push("le côté oblique doit être plus long que la hauteur");
  return p;
}
function aireDUnCarreau(q: Q): string[] {
  const n = cases(q);
  const t = q.text.match(new RegExp(`${NB} ${U}²`));
  if (n == null || n < 0 || !t) return ["carreaux ou aire totale non lus"];
  return reponse(q, num(t[1]) / n, `${t[2]}²`);
}
function prixSurface(q: Q): string[] {
  const R = rectangles(q.text);
  const pr = q.text.match(/(\d+,\d{2}) € le m²/);
  if (R.length !== 1 || R[0].u !== "m" || !pr) return ["dimensions en m ou prix au m² non lus"];
  const c = Math.round(R[0].L * R[0].l * num(pr[1]) * 100);
  const juste = `${fr(Math.floor(c / 100))},${String(c % 100).padStart(2, "0")} €`;
  const p: string[] = [];
  if (q.expected[0] !== juste) p.push(`attendu « ${q.expected[0]} », le calcul donne ${juste}`);
  if (q.comparator !== "number_equal") p.push("comparateur");
  return p;
}

export const CORRECTEURS: CorrecteursMaths = avecRegleMotsCles({
  "5e_aire_composer_tpl_1_deux_rectangles": figureEnL,
  "5e_aire_composer_tpl_2_rectangle_triangle": maisonTriangle,
  "5e_aire_composer_tpl_3_qcm_piege": sommeDeuxAires,
  "5e_aire_composer_tpl_4_quadrillage": carreauxDeCote,
  "5e_aire_composer_tpl_5_reunion_jardin": aireRestante,
  "5e_aire_defi_tpl_1_comparaison_figures": comparaison,
  "5e_aire_defi_tpl_2_rectangle_manquant": dimensionManquante,
  "5e_aire_defi_tpl_3_triangle_piege": triangleObtus,
  "5e_aire_defi_tpl_4_quadrillage_complexe": aireDUnCarreau,
  "5e_aire_defi_tpl_5_reunion_champ_canne": prixSurface,
  "5e_aire_parallelogramme_tpl_1_calcul_direct": airePara,
  "5e_aire_parallelogramme_tpl_2_qcm": airePara,
  "5e_aire_parallelogramme_tpl_3_retrouver_hauteur": hauteurPara,
  "5e_aire_parallelogramme_tpl_4_retrouver_base": basePara,
  "5e_aire_parallelogramme_tpl_x1": airePara,
  "5e_aire_parallelogramme_tpl_5_cote_oblique": airePara,
  "5e_aire_triangle_tpl_1_calcul_direct": aireTriangle,
  "5e_aire_triangle_tpl_2_triangle_rectangle": aireTriangleRectangle,
  "5e_aire_triangle_tpl_3_qcm_calcul": qcmTriangle,
  "5e_aire_triangle_tpl_4_retrouver_hauteur": hauteurTriangle,
  "5e_aire_triangle_tpl_5_retrouver_base": baseTriangle,
  "5e_aire_triangle_tpl_6_cote_oblique": aireTriangle,
  "5e_aire_comprendre_tpl_1_compter_cases": compterCases,
  "5e_aire_comprendre_tpl_2_rectangle_grille": compterCases,
  "5e_aire_comprendre_tpl_3_figure_non_rectangle": compterCases,
  "5e_aire_comprendre_tpl_4_unite_aire": uniteAire,
  "5e_aire_comprendre_tpl_5_aire_ou_perimetre": aireOuPerimetre,
});
