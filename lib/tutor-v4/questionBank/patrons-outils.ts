// LES OUTILS DES BANQUES DE PATRONS (06/11/2026) : l'écriture des gabarits, les quatre
// dépliages à comparer, et, pour les correcteurs, la lecture d'une figure `patron_solide`.
//
// ⚠️ Les vérifications (`estPatron…`) relisent les pièces dessinées : elles ne regardent ni
// le `defaut` demandé, ni les fonctions de `lib/canvas/patron-solide.ts`.

import type { TutorBankItemV4, TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import type { CanvasFigure, PatronSolideCanvasData } from "@/lib/tutor-v4/types_canvas";
import { melange, mesure, qcm } from "@/lib/tutor-v4/questionBank/outils-geometrie";

type Panneau = PatronSolideCanvasData["panneaux"][number];

export const fabriquePatrons = (niveau: string, notionId: string, microId: string) => {
  let n = 0;
  return (difficulty: number, hint: string, generate: () => TutorGeneratedQuestionV4): TutorBankItemV4 =>
    ({
      kind: "template",
      id: `${microId}_tpl_${++n}`,
      niveau,
      matiere: "maths",
      notionId,
      microId,
      difficulty,
      theme: "neutral",
      hint,
      tags: ["patron", "espace", "template"],
      generate,
    }) as unknown as TutorBankItemV4;
};

/** Les unités collées à leur nombre, « = » et « ≈ » insécables : rien d'orphelin à 375 px. */
export const insec = (t: string) =>
  t
    .replace(/(\d) (?=(?:mm|cm|dm|m|km)(?:[²³]|\b))/g, "$1 ")
    .replace(/ ([=≈×]) /g, " $1 ");

export const figure = (panneaux: Panneau[], description: string): CanvasFigure => ({ kind: "patron_solide", panneaux, description }) as CanvasFigure;

export const court = (text: string, x: number, u: string, explanation: string, canvas?: CanvasFigure): TutorGeneratedQuestionV4 =>
  ({ text: insec(text), format: "short", expected: u ? mesure(x, u) : mesure(x, "").map((e) => e.trim()), comparator: "number_equal", explanation, ...(canvas ? { canvas } : {}) }) as TutorGeneratedQuestionV4;

export const choix = (text: string, juste: string, faux: string[], explanation: string, canvas?: CanvasFigure): TutorGeneratedQuestionV4 =>
  ({ text: insec(text), format: "qcm", choices: qcm(juste, faux), expected: [juste], comparator: "mcq_exact", explanation, ...(canvas ? { canvas } : {}) }) as TutorGeneratedQuestionV4;

/** Le vrai dépliage et les faux, mélangés et nommés A, B, C, D : le QCM qui va avec. */
export function comparer(text: string, vrai: Panneau, faux: Panneau[], explanation: string, description: string): TutorGeneratedQuestionV4 {
  const noms = ["A", "B", "C", "D"];
  const tous = melange([{ p: vrai, ok: true }, ...melange(faux).slice(0, 3).map((p) => ({ p, ok: false }))]);
  const panneaux = tous.map((x, i) => ({ ...x.p, nom: noms[i] }));
  const juste = noms[tous.findIndex((x) => x.ok)];
  const etiquette = (n: string) => `Le dépliage ${n}`;
  return {
    text: insec(text),
    format: "qcm",
    choices: panneaux.map((p) => etiquette(p.nom as string)),
    expected: [etiquette(juste)],
    comparator: "mcq_exact",
    explanation,
    canvas: figure(panneaux, description),
  } as TutorGeneratedQuestionV4;
}

/* ───────────────────────── la lecture, pour les correcteurs ───────────────────────── */

const PRES = 1e-6;
const proche = (a: number, b: number, eps = PRES) => Math.abs(a - b) < eps;
const egauxTries = (a: number[], b: number[]) => {
  const [x, y] = [[...a].sort((m, n) => m - n), [...b].sort((m, n) => m - n)];
  return x.length === y.length && x.every((v, i) => proche(v, y[i], 1e-3));
};
const cotes = (pts: [number, number][]) => pts.map((p, i) => Math.hypot(p[0] - pts[(i + 1) % pts.length][0], p[1] - pts[(i + 1) % pts.length][1]));
const boite = (pts: [number, number][]) => {
  const xs = pts.map((p) => p[0]);
  const ys = pts.map((p) => p[1]);
  return { x0: Math.min(...xs), x1: Math.max(...xs), y0: Math.min(...ys), y1: Math.max(...ys) };
};

/** Quatre rectangles en bande alternée, un couvercle au-dessus, un au-dessous, de la bonne largeur. */
export function estPatronPave(p: Panneau, L: number, l: number, h: number): boolean {
  if (p.pieces.length !== 6) return false;
  const b = p.pieces.map((x) => boite(x.points));
  const bande = b.filter((r) => proche(r.y0, 0) && proche(r.y1, h)).sort((u, v) => u.x0 - v.x0);
  const lids = b.filter((r) => !(proche(r.y0, 0) && proche(r.y1, h)));
  if (bande.length !== 4 || lids.length !== 2) return false;
  const larg = bande.map((r) => r.x1 - r.x0);
  if (!(proche(larg[0], larg[2]) && proche(larg[1], larg[3]))) return false;
  if (!egauxTries(larg, [L, L, l, l]) || !proche(larg[0] + larg[1], L + l)) return false;
  for (let i = 0; i < 3; i++) if (!proche(bande[i].x1, bande[i + 1].x0)) return false;
  const haut = lids.filter((r) => proche(r.y1, 0));
  const bas = lids.filter((r) => proche(r.y0, h));
  if (haut.length !== 1 || bas.length !== 1) return false;
  return [haut[0], bas[0]].every((r) => proche(r.x1 - r.x0, L) && proche(r.y1 - r.y0, l) && bande.some((f) => proche(f.x0, r.x0) && proche(f.x1, r.x1)));
}

/** Trois rectangles (a, b, c) × h, un triangle (a, b, c) au-dessus, un au-dessous. */
export function estPatronPrisme(p: Panneau, a: number, b: number, c: number, h: number): boolean {
  const rects = p.pieces.filter((x) => x.points.length === 4).map((x) => boite(x.points)).sort((u, v) => u.x0 - v.x0);
  const tri = p.pieces.filter((x) => x.points.length === 3);
  if (rects.length !== 3 || tri.length !== 2) return false;
  if (!rects.every((r) => proche(r.y0, 0) && proche(r.y1, h))) return false;
  if (!egauxTries(rects.map((r) => r.x1 - r.x0), [a, b, c])) return false;
  if (!tri.every((t) => egauxTries(cotes(t.points), [a, b, c]))) return false;
  const yMilieu = tri.map((t) => t.points.reduce((s, q) => s + q[1], 0) / 3);
  return yMilieu.some((y) => y < 0) && yMilieu.some((y) => y > h);
}

/** Un rectangle (périmètre du disque) × h, un disque de rayon r tangent de chaque côté. */
export function estPatronCylindre(p: Panneau, r: number, h: number): boolean {
  if (p.pieces.length !== 1 || (p.disques ?? []).length !== 2) return false;
  const R = boite(p.pieces[0].points);
  if (!proche(R.x1 - R.x0, 2 * Math.PI * r, 1e-3) || !proche(R.y1 - R.y0, h)) return false;
  const [d1, d2] = p.disques!;
  if (!proche(d1.r, r) || !proche(d2.r, r)) return false;
  const dessus = [d1, d2].filter((d) => proche(d.y, -r));
  const dessous = [d1, d2].filter((d) => proche(d.y, h + r));
  return dessus.length === 1 && dessous.length === 1;
}

/** Une base à n côtés égaux à c, n triangles (c, s, s) qui ne se referment que si leur hauteur dépasse l'apothème. */
export function estPatronPyramide(p: Panneau, n: number, c: number, s: number): boolean {
  if (p.pieces.length !== n + 1) return false;
  const [base, ...tri] = p.pieces;
  if (base.points.length !== n || !cotes(base.points).every((x) => proche(x, c, 1e-3))) return false;
  return tri.every((t) => t.points.length === 3 && egauxTries(cotes(t.points), [c, s, s]));
}

export const panneauxDe = (q: TutorGeneratedQuestionV4): Panneau[] => ((q.canvas as PatronSolideCanvasData | undefined)?.panneaux ?? []);

/** Exactement un dépliage juste, et c'est l'attendu. */
export function unSeulVrai(q: TutorGeneratedQuestionV4, vrai: (p: Panneau) => boolean): string[] {
  const justes = panneauxDe(q).filter(vrai);
  if (justes.length !== 1) return [`${justes.length} dépliage(s) juste(s) sur ${panneauxDe(q).length}`];
  return String(q.expected[0]) === `Le dépliage ${justes[0].nom}` ? [] : [`attendu « ${q.expected[0]} », juste : ${justes[0].nom}`];
}

/** La longueur écrite sur chaque cote est la vraie (la figure ne ment pas). */
export function cotesVraies(q: TutorGeneratedQuestionV4): string[] {
  const p: string[] = [];
  for (const pan of panneauxDe(q))
    for (const c of pan.cotes ?? []) {
      const m = c.texte.match(/^(\d+(?:,\d+)?)/);
      if (!m) continue;
      const lg = Math.hypot(c.a[0] - c.b[0], c.a[1] - c.b[1]);
      if (!proche(lg, Number(m[1].replace(",", ".")), 1e-3)) p.push(`cote « ${c.texte} » sur un segment de ${lg}`);
    }
  return p;
}

/** La longueur du segment marqué « ? ». */
export function longueurInconnue(q: TutorGeneratedQuestionV4): number | null {
  for (const pan of panneauxDe(q)) for (const c of pan.cotes ?? []) if (c.inconnue) return Math.hypot(c.a[0] - c.b[0], c.a[1] - c.b[1]);
  return null;
}

export const texteNet = (q: TutorGeneratedQuestionV4) => q.text.replace(/[  ]/g, " ");
