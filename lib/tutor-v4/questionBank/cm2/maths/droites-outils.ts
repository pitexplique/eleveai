// GABARITS DU COACH CM2 — notion « droite » (15/11/2026).
//
// Modèle : cm1/maths/droites.bank.ts (commit 932a10db), monté au niveau CM2 :
// droites, demi-droites, segments, notations (d), [AB], (AB), [AB) ; parallèles
// et perpendiculaires ; DISTANCE d'un point à une droite ; programmes de tracé ;
// longueurs décimales.
// ⛔ CM2 = zéro clavier (applyMathsKeyboardFree) : QCM de 3 ou 4 choix, un seul
// juste. Les leurres sont de vraies erreurs d'élève :
//   - « perpendiculaire » pris pour « verticale », « se coupent » pour « perpendiculaires » ;
//   - deux droites qui ne se touchent pas sur le dessin mais dont l'écart change ;
//   - la distance mesurée EN BIAIS au lieu de perpendiculairement ;
//   - une seule parallèle à 3 cm (il y en a deux, une de chaque côté) ;
//   - 1,4 < 1,25 (on compare le nombre de chiffres) ;
//   - [AB] et (AB), [AB) et [BA) confondus.
// Dessins :
//   - `droites` (pixels, y vers le bas) : segments, demi-droites, quadrillage de 40 px ;
//   - `construction` (y vers le haut) : droites penchées, angles droits codés, mesures.
// ⚠️ Tout ce que le tableau des gabarits appelle À SA CRÉATION (atelier, listes)
// est déclaré AVANT lui (pas de zone morte temporelle).

import type { CanvasFigure, DifficultyLevel, TutorBankItemV4, TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import type { ConstructionCanvasData } from "@/lib/tutor-v4/types_canvas";
import { cap, entre, fr, melange, un } from "./trous-outils";

/* ───────── Outils ───────── */

type Pt = { x: number; y: number };
type Gen = Omit<TutorGeneratedQuestionV4, "canvas"> & { canvas?: CanvasFigure };
type Qcm = Pick<TutorGeneratedQuestionV4, "format" | "choices" | "expected" | "comparator">;

/** QCM à propositions écrites : jamais deux fois la même, 4 au plus, toujours la bonne. */
function qcm(juste: string, faux: string[]): Qcm {
  const d = melange([...new Set(faux)].filter((x) => x !== juste)).slice(0, 3);
  return { format: "qcm", choices: melange([juste, ...d]), expected: [juste], comparator: "mcq_exact" };
}

/** QCM de nombres : leurres distincts en VALEUR, complétés par des voisins s'il en manque. */
function qcmN(juste: number, faux: number[], u = "", pas = 1): Qcm {
  const arr = (v: number) => Math.round(v * 1000) / 1000;
  const ecr = (v: number) => (u ? `${fr(arr(v))} ${u}` : fr(arr(v)));
  const vals: number[] = [];
  for (const v of melange(faux.map(arr))) if (v > 0 && v !== arr(juste) && !vals.includes(v)) vals.push(v);
  for (let k = 1; vals.length < 3 && k < 30; k++) {
    for (const v of [arr(juste + k * pas), arr(juste - k * pas)]) if (v > 0 && !vals.includes(v) && vals.length < 3) vals.push(v);
  }
  return qcm(ecr(juste), vals.slice(0, 3).map(ecr));
}

const atelier =
  (microId: string) =>
  (n: number, difficulty: DifficultyLevel, hint: string, generate: () => Gen): TutorBankItemV4 =>
    ({
      kind: "template",
      id: `cm2_${microId}_tpl_${n}`,
      niveau: "cm2",
      matiere: "maths",
      notionId: "droite",
      microId,
      difficulty,
      theme: "neutral",
      hint,
      tags: ["cm2", "droite", microId, "template"],
      generate,
    }) as TutorBankItemV4;

const REC = atelier("droite_reconnaitre");
const PAR = atelier("droite_parallele");
const PERP = atelier("droite_perpendiculaire");
const TRA = atelier("droite_tracer");
const DEF = atelier("droite_defi");

const LETTRES = ["A", "B", "C", "D", "E", "F", "G", "K", "M", "N", "P", "R", "S", "T"];
const lettres = (n: number) => melange([...LETTRES]).slice(0, n);
const liste = (l: string[]) => (l.length < 2 ? l.join("") : `${l.slice(0, -1).join(", ")} et ${l[l.length - 1]}`);
/** Un nombre décimal à un chiffre après la virgule, entre a et b (en dixièmes). */
const dec = (a10: number, b10: number) => entre(a10, b10) / 10;

const NOMS = ["Nina", "Téo", "Zoé", "Ravi", "Lou", "Malo", "Inès", "Sacha", "Amir", "Jade", "Naïa", "Tom", "Lina", "Yanis", "Maya", "Noé", "Léna", "Hugo", "Elsa", "Adam"];
const deuxNoms = (hors = ""): [string, string] => {
  const [a, b] = melange(NOMS.filter((n) => !hors.includes(n)));
  return [a, b];
};
/** « de Nina », « d'Inès » : l'élision devant une voyelle. */
const deN = () => {
  const n = un(NOMS);
  return /^[AEIOUÉÈÎ]/.test(n) ? `d'${n}` : `de ${n}`;
};
const COUL = ["#2563eb", "#16a34a", "#dc2626", "#7c3aed", "#ea580c"];
const deuxCouleurs = (): [string, string] => {
  const [a, b] = melange([...COUL]);
  return Math.random() < 0.4 ? [a, a] : [a, b];
};
const NOMS_DROITES: [string, string][] = [
  ["(d)", "(e)"],
  ["(d)", "(d')"],
  ["(a)", "(b)"],
  ["(x)", "(y)"],
  ["(d₁)", "(d₂)"],
  ["(r)", "(s)"],
  ["(u)", "(v)"],
];

function droitesCanvas(data: {
  lines: {
    id: string;
    type: "droite" | "segment" | "demi_droite";
    from: Pt;
    to: Pt;
    label?: string;
    color?: string;
    strokeWidth?: number;
    dashed?: boolean;
  }[];
  points?: { x: number; y: number; label?: string; color?: string; highlight?: boolean }[];
  size?: { width?: number; height?: number };
}) {
  return {
    kind: "droites" as const,
    size: data.size ?? { width: 340, height: 240 },
    grid: { show: true, rows: 6, cols: 8 },
    lines: data.lines,
    points: data.points ?? [],
    intersections: [],
    display: {
      showGrid: true,
      showLabels: true,
      showPoints: true,
      showIntersections: true,
      showRightAngleMarkers: true,
      showParallelMarkers: true,
    },
    colors: {
      background: "#ffffff",
      grid: "#e2e8f0",
      text: "#0f172a",
      point: "#ef4444",
      intersection: "#f97316",
      rightAngle: "#ef4444",
      parallel: "#8b5cf6",
    },
  };
}
type Ligne = Parameters<typeof droitesCanvas>[0]["lines"][number];
type Point = NonNullable<Parameters<typeof droitesCanvas>[0]["points"]>[number];
/** Pixels du canvas `droites` 320 × 240 : un carreau = 40 px, y vers le haut en carreaux. */
const G = (x: number, y: number): Pt => ({ x: 40 * x, y: 240 - 40 * y });
const grille = (lines: Ligne[], points: Point[] = []) => droitesCanvas({ lines, points, size: { width: 320, height: 240 } });

const tourner = (p: Pt, deg: number): Pt => {
  const a = (deg * Math.PI) / 180;
  return { x: p.x * Math.cos(a) - p.y * Math.sin(a), y: p.x * Math.sin(a) + p.y * Math.cos(a) };
};
const dir = (deg: number): Pt => tourner({ x: 1, y: 0 }, deg);
const plus = (a: Pt, b: Pt, k = 1): Pt => ({ x: a.x + k * b.x, y: a.y + k * b.y });

type Trait = { nom?: string; a: Pt; b: Pt; couleur?: string; pointille?: boolean; segment?: boolean; lab?: [number, number] };

/** Une figure `construction` : droites (ou segments) nommées, points, angles droits codés, mesures. */
function schema(
  traits: Trait[],
  o: { angle?: number; points?: { p: Pt; nom: string }[]; droits?: [Pt, Pt, Pt][]; mesures?: { a: Pt; b: Pt; texte: string }[]; description?: string } = {},
): ConstructionCanvasData {
  const r = (p: Pt) => tourner(p, o.angle ?? 0);
  const points: ConstructionCanvasData["points"] = [];
  const segments: NonNullable<ConstructionCanvasData["segments"]> = [];
  const droites: NonNullable<ConstructionCanvasData["droites"]> = [];
  const angles: NonNullable<ConstructionCanvasData["angles"]> = [];
  const cache = (id: string, p: Pt) => points.push({ id, ...r(p), cache: true });
  traits.forEach((t, i) => {
    cache(`t${i}a`, t.a);
    cache(`t${i}b`, t.b);
    if (t.segment) segments.push({ a: `t${i}a`, b: `t${i}b`, couleur: t.couleur, pointille: t.pointille, epais: true });
    else droites.push({ a: `t${i}a`, b: `t${i}b`, couleur: t.couleur, pointille: t.pointille });
    if (t.nom) {
      const [l0, l1] = t.lab ?? [0.8, 0.95];
      cache(`t${i}m`, plus(t.a, { x: t.b.x - t.a.x, y: t.b.y - t.a.y }, l0));
      cache(`t${i}n`, plus(t.a, { x: t.b.x - t.a.x, y: t.b.y - t.a.y }, l1));
      segments.push({ a: `t${i}m`, b: `t${i}n`, texte: t.nom, sansTrait: true });
    }
  });
  (o.points ?? []).forEach((q, k) => points.push({ id: `p${k}`, ...r(q.p), nom: q.nom }));
  (o.droits ?? []).forEach(([s, d, v], k) => {
    cache(`r${k}s`, s);
    cache(`r${k}d`, d);
    cache(`r${k}v`, v);
    angles.push({ sommet: `r${k}s`, de: `r${k}d`, vers: `r${k}v`, droit: true });
  });
  (o.mesures ?? []).forEach((m, k) => {
    cache(`m${k}a`, m.a);
    cache(`m${k}b`, m.b);
    segments.push({ a: `m${k}a`, b: `m${k}b`, texte: m.texte, pointille: true, couleur: "#64748b" });
  });
  return { kind: "construction", points, segments, droites, angles, description: o.description };
}

type Rel = "par" | "perp" | "sec" | "presque";
const ANGLES = [0, 0, 12, 25, 35, -18, -30, 90, 70, -60];
const ANGLES_PENCHES = [15, 22, 30, 38, -15, -25, -35, 55, -55];

/** Deux droites : parallèles, perpendiculaires (angle droit codé), sécantes, ou « presque » parallèles. */
function paire(rel: Rel, noms: [string, string], o: { angle?: number; code?: boolean; couleurs?: [string, string]; point?: string; phi?: number } = {}) {
  const angle = o.angle ?? un(ANGLES);
  const [c1, c2] = o.couleurs ?? deuxCouleurs();
  const t1: Trait = { nom: noms[0], a: { x: 0, y: 0 }, b: { x: 10, y: 0 }, couleur: c1, lab: [0.82, 0.96] };
  let t2: Trait;
  const droits: [Pt, Pt, Pt][] = [];
  if (rel === "par") t2 = { nom: noms[1], a: { x: 1, y: 3 }, b: { x: 11, y: 3 }, couleur: c2, lab: [0.04, 0.18] };
  else if (rel === "presque") t2 = { nom: noms[1], a: { x: 1, y: 3.4 }, b: { x: 11, y: 2.1 }, couleur: c2, lab: [0.04, 0.18] };
  else {
    const phi = rel === "perp" ? 90 : o.phi ?? un([42, 50, 58, 122, 130, 138]);
    const u = dir(phi);
    t2 = { nom: noms[1], a: plus({ x: 4, y: 0 }, u, -4), b: plus({ x: 4, y: 0 }, u, 5), couleur: c2, lab: [0.82, 0.96] };
    if (rel === "perp" && o.code !== false) droits.push([{ x: 4, y: 0 }, { x: 7, y: 0 }, plus({ x: 4, y: 0 }, u, 3)]);
  }
  const points = o.point && (rel === "perp" || rel === "sec") ? [{ p: { x: 4, y: 0 }, nom: o.point }] : [];
  return schema([t1, t2], { angle, droits, points });
}

/** Quatre droites : 0 = la référence, 1 = sa parallèle, 2 = sa perpendiculaire, 3 = ni l'une ni l'autre. */
function plan4(noms: [string, string, string, string], angle: number) {
  const u = dir(un([50, 58, 125, 132]));
  const c = melange([...COUL]);
  return schema(
    [
      { nom: noms[0], a: { x: 0, y: 0 }, b: { x: 12, y: 0 }, couleur: c[0], lab: [0.78, 0.92] },
      { nom: noms[1], a: { x: 0, y: 4 }, b: { x: 12, y: 4 }, couleur: c[1], lab: [0.06, 0.2] },
      { nom: noms[2], a: { x: 3, y: -2 }, b: { x: 3, y: 6.5 }, couleur: c[2], lab: [0.82, 0.95] },
      { nom: noms[3], a: plus({ x: 8, y: 2 }, u, -5), b: plus({ x: 8, y: 2 }, u, 5), couleur: c[3], lab: [0.05, 0.18] },
    ],
    { angle },
  );
}

/** Les droites candidates autour de (d) (y = 0) et du point A (4 ; 3). */
function candidats(sortes: ("perpA" | "perpNon" | "oblA" | "parA" | "parNon" | "presqueA")[], noms: string[], A: string, angle: number) {
  const P: Record<string, [Pt, Pt]> = {
    perpA: [{ x: 4, y: -1.5 }, { x: 4, y: 5.2 }],
    perpNon: [{ x: 6.8, y: -1.5 }, { x: 6.8, y: 5.2 }],
    parA: [{ x: 0, y: 3 }, { x: 10, y: 3 }],
    parNon: [{ x: 0, y: 1.6 }, { x: 10, y: 1.6 }],
    presqueA: [{ x: 0, y: 3.56 }, { x: 10, y: 2.16 }],
  };
  const phi = un([62, 70, 112, 120]);
  P.oblA = [plus({ x: 4, y: 3 }, dir(phi), -4), plus({ x: 4, y: 3 }, dir(phi), 2.5)];
  const labs: [number, number][] = [[0.85, 0.97], [0.03, 0.15], [0.62, 0.74]];
  return schema(
    [
      { nom: noms[0], a: { x: -1, y: 0 }, b: { x: 11, y: 0 }, couleur: "#0f172a", lab: [0.86, 0.98] },
      ...sortes.map((s, i) => ({ nom: noms[i + 1], a: P[s][0], b: P[s][1], couleur: COUL[i], lab: labs[i] })),
    ],
    { angle, points: [{ p: { x: 4, y: 3 }, nom: A }] },
  );
}

/* Segments sur quadrillage (unités : carreaux, y vers le haut). */
const croix = (u: Pt, v: Pt) => u.x * v.y - u.y * v.x;
function seCoupent(p1: Pt, p2: Pt, p3: Pt, p4: Pt) {
  const d = (a: Pt, b: Pt, c: Pt) => croix({ x: b.x - a.x, y: b.y - a.y }, { x: c.x - a.x, y: c.y - a.y });
  const d1 = d(p3, p4, p1), d2 = d(p3, p4, p2), d3 = d(p1, p2, p3), d4 = d(p1, p2, p4);
  if (d1 * d2 < 0 && d3 * d4 < 0) return true;
  return d1 === 0 || d2 === 0 || d3 === 0 || d4 === 0;
}
function deuxSegmentsGrille(rel: "par" | "perp" | "ni"): [Pt, Pt, Pt, Pt] {
  for (let essai = 0; essai < 400; essai++) {
    const a = entre(1, 3);
    const b = entre(1, 3) * (Math.random() < 0.5 ? 1 : -1);
    const u = { x: a, y: b };
    let v: Pt;
    if (rel === "par") v = { ...u };
    else if (rel === "perp") v = Math.random() < 0.5 ? { x: -b, y: a } : { x: b, y: -a };
    else v = un([{ x: a + 1, y: b }, { x: a, y: b + 1 }, { x: a, y: b - 1 }, { x: a + 1, y: b - 1 }]);
    if (v.x === 0 && v.y === 0) continue;
    if (rel === "ni" && (croix(u, v) === 0 || u.x * v.x + u.y * v.y === 0)) continue;
    const A = { x: entre(1, 7), y: entre(1, 5) };
    const B = plus(A, u);
    const C = { x: entre(1, 7), y: entre(1, 5) };
    const D = plus(C, v);
    if ([B, D].some((p) => p.x < 1 || p.x > 7 || p.y < 1 || p.y > 5)) continue;
    if (seCoupent(A, B, C, D)) continue;
    if (Math.min(...[A, B].flatMap((p) => [C, D].map((q) => Math.hypot(p.x - q.x, p.y - q.y)))) < 1.5) continue;
    if (rel === "par" && croix(u, { x: C.x - A.x, y: C.y - A.y }) === 0) continue;
    return [A, B, C, D];
  }
  return rel === "par"
    ? [{ x: 1, y: 1 }, { x: 4, y: 2 }, { x: 2, y: 3 }, { x: 5, y: 4 }]
    : rel === "perp"
      ? [{ x: 1, y: 1 }, { x: 4, y: 2 }, { x: 6, y: 1 }, { x: 5, y: 4 }]
      : [{ x: 1, y: 1 }, { x: 4, y: 2 }, { x: 2, y: 3 }, { x: 5, y: 5 }];
}
function segmentsGrille([A, B, C, D]: [Pt, Pt, Pt, Pt], noms: string[]) {
  const [c1, c2] = deuxCouleurs();
  return grille(
    [
      { id: "s1", type: "segment", from: G(A.x, A.y), to: G(B.x, B.y), color: c1 },
      { id: "s2", type: "segment", from: G(C.x, C.y), to: G(D.x, D.y), color: c2 },
    ],
    [A, B, C, D].map((p, i) => ({ ...G(p.x, p.y), label: noms[i], color: "#ef4444" })),
  );
}
/** « 3 carreaux vers la droite et 1 vers le haut » */
function deplacement(v: Pt) {
  const nb = (k: number) => `${Math.abs(k)} carreau${Math.abs(k) > 1 ? "x" : ""}`;
  return `${nb(v.x)} vers la ${v.x > 0 ? "droite" : "gauche"} et ${Math.abs(v.y)} vers le ${v.y > 0 ? "haut" : "bas"}`;
}

/* ───────── Les cadres ───────── */

const CADRES: ((o: string) => string)[] = [
  (o) => `Sur son cahier, ${un(NOMS)} a tracé ${o}.`,
  (o) => `Au tableau, le maître a dessiné ${o}.`,
  (o) => `Sur son ardoise, ${un(NOMS)} a tracé ${o}.`,
  (o) => `Sur le plan d'une maison, l'architecte a tracé ${o}.`,
  (o) => `Sur une carte au trésor, ${un(NOMS)} a dessiné ${o}.`,
  (o) => `Sur le plan d'un jardin, la paysagiste a tracé ${o}.`,
  (o) => `Sur une planche, le menuisier a tracé ${o} au crayon.`,
  (o) => `Dans un jeu vidéo de construction, ${un(NOMS)} voit ${o}.`,
  (o) => `Sur le tableau numérique, ${un(NOMS)} observe ${o}.`,
  (o) => `Sur le sol de la cour, ${un(NOMS)} a tracé ${o} à la craie.`,
  (o) => `Sur le plan d'un stade, la géomètre a tracé ${o}.`,
  (o) => `Dans son carnet de croquis, la dessinatrice a tracé ${o}.`,
  (o) => `Sur une feuille blanche, ${un(NOMS)} a recopié ${o}.`,
  (o) => `Sur le plan du quartier, le cartographe a dessiné ${o}.`,
  (o) => `Sur une affiche de la classe, on voit ${o}.`,
  (o) => `Pour son exposé, ${un(NOMS)} a dessiné ${o}.`,
  (o) => `Sur le plan d'un atelier, l'ingénieure a tracé ${o}.`,
  (o) => `Sur un schéma de robotique, ${un(NOMS)} a dessiné ${o}.`,
];
const cadre = (o: string) => un(CADRES)(o);

const CADRES_GRILLE: ((o: string) => string)[] = [
  (o) => `Sur une feuille quadrillée, ${un(NOMS)} a tracé ${o}.`,
  (o) => `Sur le quadrillage du cahier, ${un(NOMS)} a tracé ${o}.`,
  (o) => `Sur le plan quadrillé d'un parc, la paysagiste a dessiné ${o}.`,
  (o) => `Sur la grille d'un jeu de bataille navale, ${un(NOMS)} a tracé ${o}.`,
  (o) => `Sur le carrelage de la cuisine, le carreleur a tracé ${o}.`,
  (o) => `Sur le papier quadrillé de l'architecte, on voit ${o}.`,
  (o) => `Au tableau quadrillé, la maîtresse a tracé ${o}.`,
  (o) => `Dans un jeu de pixels, ${un(NOMS)} a dessiné ${o}.`,
  (o) => `Sur le plan quadrillé d'un potager, le jardinier a dessiné ${o}.`,
  (o) => `Sur une feuille à petits carreaux, la dessinatrice a tracé ${o}.`,
  (o) => `Sur le plan quadrillé d'un stade, la géomètre a tracé ${o}.`,
  (o) => `Sur son ardoise quadrillée, ${un(NOMS)} a tracé ${o}.`,
];
const cadreGrille = (o: string) => un(CADRES_GRILLE)(o);

/* ───────── Les situations de vie : deux « lignes » et leur position ───────── */

type Rel3 = "par" | "perp" | "sec";
const VIE: { s: string; rel: Rel3 }[] = [
  { s: "les deux rails d'une voie ferrée", rel: "par" },
  { s: "deux lignes d'un cahier d'écolier", rel: "par" },
  { s: "les deux montants d'une échelle", rel: "par" },
  { s: "deux barreaux d'une échelle", rel: "par" },
  { s: "deux étagères d'une bibliothèque", rel: "par" },
  { s: "les deux lignes de touche d'un terrain de foot", rel: "par" },
  { s: "deux lignes de couloir, dans la ligne droite d'une piste d'athlétisme", rel: "par" },
  { s: "deux cordes d'une guitare", rel: "par" },
  { s: "deux rayures d'un maillot rayé", rel: "par" },
  { s: "les deux grands bords d'une feuille de papier", rel: "par" },
  { s: "deux rangées de salades bien alignées dans un potager", rel: "par" },
  { s: "deux lames voisines d'un parquet", rel: "par" },
  { s: "deux bandes blanches d'un passage piéton", rel: "par" },
  { s: "deux rangées de vignes", rel: "par" },
  { s: "deux lignes de la portée d'une partition de musique", rel: "par" },
  { s: "les deux bords d'une règle", rel: "par" },
  { s: "deux fils électriques tendus côte à côte", rel: "par" },
  { s: "deux lignes d'un code-barres", rel: "par" },
  { s: "la ligne de touche et la ligne de but d'un terrain de foot", rel: "perp" },
  { s: "le mât d'un drapeau et le sol bien plat", rel: "perp" },
  { s: "le dessus d'une table et l'un de ses pieds", rel: "perp" },
  { s: "le bord du haut et le bord de gauche d'une feuille de papier", rel: "perp" },
  { s: "un montant et un barreau d'une échelle", rel: "perp" },
  { s: "le poteau et la barre transversale d'un but de handball", rel: "perp" },
  { s: "deux joints qui se croisent entre quatre carreaux de carrelage", rel: "perp" },
  { s: "les deux traits du signe plus « + »", rel: "perp" },
  { s: "un montant et une étagère d'une bibliothèque", rel: "perp" },
  { s: "la ligne de fond et la ligne de côté d'un terrain de tennis", rel: "perp" },
  { s: "l'aiguille des heures et l'aiguille des minutes à 3 heures pile", rel: "perp" },
  { s: "les deux barres qui se croisent au milieu d'une fenêtre à quatre carreaux", rel: "perp" },
  { s: "un poteau bien droit et la route plate", rel: "perp" },
  { s: "deux rues qui se croisent en formant des coins carrés", rel: "perp" },
  { s: "les deux bords d'un coin de cahier", rel: "perp" },
  { s: "les deux lames d'une paire de ciseaux ouverts", rel: "sec" },
  { s: "les deux pans d'un toit en pointe", rel: "sec" },
  { s: "l'aiguille des heures et l'aiguille des minutes à 2 heures", rel: "sec" },
  { s: "les deux branches d'un compas ouvert", rel: "sec" },
  { s: "deux routes qui se croisent en biais", rel: "sec" },
  { s: "les deux côtés d'une part de pizza", rel: "sec" },
  { s: "un toboggan et le sol", rel: "sec" },
  { s: "les deux pieds d'un escabeau ouvert", rel: "sec" },
  { s: "une échelle penchée contre un mur et le mur", rel: "sec" },
  { s: "deux rayons voisins d'une roue de vélo", rel: "sec" },
  { s: "une rampe de skate et le sol", rel: "sec" },
  { s: "les deux bâtons qui se croisent en haut d'un tipi", rel: "sec" },
];
const vie = (rel: Rel3) => VIE.filter((v) => v.rel === rel);
const tirerVie = (poids: Record<Rel3, number>) => {
  const r = Math.random() * (poids.par + poids.perp + poids.sec);
  const rel: Rel3 = r < poids.par ? "par" : r < poids.par + poids.perp ? "perp" : "sec";
  return un(vie(rel));
};
const MOT_REL: Record<Rel3, string> = { par: "parallèles", perp: "perpendiculaires", sec: "ni parallèles ni perpendiculaires" };
const EXPLI_REL: Record<Rel3, string> = {
  par: "Même écart partout et aucun croisement : ce sont deux droites parallèles.",
  perp: "Elles se croisent en formant un angle droit, comme le coin d'une feuille : elles sont perpendiculaires.",
  sec: "Elles se coupent, mais pas en angle droit : elles ne sont ni parallèles, ni perpendiculaires.",
};
const TOURN_VIE: ((s: string) => string)[] = [
  (s) => `${cap(s)} représentent deux droites…`,
  (s) => `Si on les prolonge, ${s} donnent deux droites…`,
  (s) => `On imagine ${s} comme deux droites. Elles sont…`,
  (s) => `En géométrie, ${s} font penser à deux droites…`,
];

/* ───────── Segment, droite, demi-droite ───────── */

type Sorte = "droite" | "segment" | "demi_droite";
const SORTES: Sorte[] = ["droite", "segment", "demi_droite"];
const NOM_SORTE: Record<Sorte, string> = { droite: "une droite", segment: "un segment", demi_droite: "une demi-droite" };
const EXPLI_SORTE: Record<Sorte, string> = {
  droite: "Le tracé traverse tout le cadre sans s'arrêter : une droite continue sans fin des deux côtés.",
  segment: "Le tracé s'arrête en deux points, ses extrémités : c'est un segment.",
  demi_droite: "Le tracé part d'un point, son origine, et continue sans fin d'un seul côté (la flèche) : c'est une demi-droite.",
};
const PENTES: [Pt, Pt][] = [
  [{ x: 60, y: 175 }, { x: 270, y: 80 }],
  [{ x: 50, y: 125 }, { x: 285, y: 125 }],
  [{ x: 70, y: 70 }, { x: 260, y: 180 }],
  [{ x: 65, y: 195 }, { x: 250, y: 60 }],
  [{ x: 45, y: 150 }, { x: 290, y: 100 }],
  [{ x: 280, y: 170 }, { x: 60, y: 90 }],
];
const surPente = ([F, T]: [Pt, Pt], t: number): Pt => ({ x: F.x + t * (T.x - F.x), y: F.y + t * (T.y - F.y) });
function objetFig(sorte: Sorte, noms: string[] = [], pente = un(PENTES)) {
  const pts = sorte === "segment" ? [pente[0], pente[1]] : sorte === "demi_droite" ? [pente[0], surPente(pente, 0.5)] : [surPente(pente, 0.3), surPente(pente, 0.7)];
  return droitesCanvas({
    lines: [{ id: "x", type: sorte, from: pente[0], to: pente[1], color: un(COUL) }],
    points: pts.map((p, i) => ({ ...p, label: noms[i], color: "#ef4444" })),
  });
}
/** n points alignés, régulièrement espacés, sur une droite. */
function alignes(noms: string[], pente = un(PENTES)) {
  const n = noms.length;
  return droitesCanvas({
    lines: [{ id: "x", type: "droite", from: pente[0], to: pente[1], color: "#94a3b8", strokeWidth: 3 }],
    points: noms.map((nom, i) => ({ ...surPente(pente, 0.15 + (0.7 * i) / Math.max(1, n - 1)), label: nom, color: "#ef4444" })),
  });
}
const notations = (sorte: Sorte, A: string, B: string) =>
  sorte === "segment" ? [`[${A}${B}]`, `[${B}${A}]`] : sorte === "droite" ? [`(${A}${B})`, `(${B}${A})`] : [`[${A}${B})`];
const TOUTES_NOTATIONS = (A: string, B: string) => [`[${A}${B}]`, `[${B}${A}]`, `(${A}${B})`, `(${B}${A})`, `[${A}${B})`, `[${B}${A})`];

/* Trois points alignés sur un objet de la vie, avec une unité. */
const ALIGNES_VIE: { t: (a: string, b: string, c: string) => string; u: string }[] = [
  { t: (a, b, c) => `Sur une route toute droite, la boulangerie ${b} se trouve entre la maison ${a} et l'école ${c}.`, u: "km" },
  { t: (a, b, c) => `Sur une règle, ${un(NOMS)} a marqué trois points ${a}, ${b} et ${c}, dans cet ordre.`, u: "cm" },
  { t: (a, b, c) => `Sur la ligne droite d'une piste d'athlétisme, trois plots ${a}, ${b} et ${c} sont posés dans cet ordre.`, u: "m" },
  { t: (a, b, c) => `Sur une planche, le menuisier a fait trois marques alignées ${a}, ${b} et ${c}, dans cet ordre.`, u: "cm" },
  { t: (a, b, c) => `Le long d'un sentier tout droit, trois panneaux ${a}, ${b} et ${c} se suivent.`, u: "km" },
  { t: (a, b, c) => `Sur une voie ferrée droite, la gare ${b} est entre la gare ${a} et la gare ${c}.`, u: "km" },
  { t: (a, b, c) => `Sur son cahier, ${un(NOMS)} a placé trois points alignés ${a}, ${b} et ${c}, dans cet ordre.`, u: "cm" },
  { t: (a, b, c) => `Sur un fil à linge tendu, trois pinces ${a}, ${b} et ${c} se suivent.`, u: "cm" },
  { t: (a, b, c) => `Le long d'une piste cyclable droite, trois bornes ${a}, ${b} et ${c} se suivent.`, u: "km" },
  { t: (a, b, c) => `Sur la ligne de touche, l'entraîneuse a posé trois plots ${a}, ${b} et ${c}, dans cet ordre.`, u: "m" },
  { t: (a, b, c) => `Sur le plan d'une rue droite, la pharmacie ${b} est entre la poste ${a} et le stade ${c}.`, u: "km" },
  { t: (a, b, c) => `Sur une tringle à rideaux, trois anneaux ${a}, ${b} et ${c} se suivent.`, u: "cm" },
];

/* Les formes du quotidien, pour compter côtés parallèles et angles droits. */
type Forme = { nom: string; pts: Pt[]; par: number; droits: number; objets: string[]; pourquoiPar: string; pourquoiDroits: string };
const regulier = (n: number, r = 3, a0 = 90 / n): Pt[] => Array.from({ length: n }, (_, i) => tourner({ x: r, y: 0 }, a0 + (360 * i) / n));
const FORMES: Forme[] = [
  { nom: "un rectangle", pts: [{ x: 0, y: 0 }, { x: 6, y: 0 }, { x: 6, y: 3.5 }, { x: 0, y: 3.5 }], par: 2, droits: 4, objets: ["une porte", "l'écran d'une tablette", "le tableau de la classe", "un drapeau", "un tapis de yoga", "une feuille de papier", "un terrain de basket"], pourquoiPar: "Les côtés opposés sont parallèles deux à deux.", pourquoiDroits: "Ses quatre coins sont des angles droits." },
  { nom: "un carré", pts: [{ x: 0, y: 0 }, { x: 4, y: 0 }, { x: 4, y: 4 }, { x: 0, y: 4 }], par: 2, droits: 4, objets: ["un carreau de carrelage", "une case de jeu de dames", "un post-it", "un mouchoir plié"], pourquoiPar: "Les côtés opposés sont parallèles deux à deux.", pourquoiDroits: "Ses quatre coins sont des angles droits." },
  { nom: "un trapèze", pts: [{ x: 0, y: 0 }, { x: 7, y: 0 }, { x: 5, y: 3 }, { x: 2, y: 3 }], par: 1, droits: 0, objets: ["un abat-jour vu de côté", "un seau vu de côté", "un pot de fleurs vu de côté"], pourquoiPar: "Seuls le haut et le bas sont parallèles.", pourquoiDroits: "Aucun coin n'est carré." },
  { nom: "un trapèze rectangle", pts: [{ x: 0, y: 0 }, { x: 6, y: 0 }, { x: 4, y: 3.2 }, { x: 0, y: 3.2 }], par: 1, droits: 2, objets: ["le côté d'une rampe d'accès", "une étiquette découpée en biais", "le côté d'un pupitre"], pourquoiPar: "Seuls le haut et le bas sont parallèles.", pourquoiDroits: "Les deux coins du côté gauche sont des angles droits." },
  { nom: "un triangle", pts: [{ x: 0, y: 0 }, { x: 6, y: 0 }, { x: 2, y: 4 }], par: 0, droits: 0, objets: ["une part de pizza", "un panneau « attention danger »", "une part de tarte"], pourquoiPar: "Dans un triangle, deux côtés se touchent toujours : aucun n'est parallèle à un autre.", pourquoiDroits: "Aucun coin n'est carré." },
  { nom: "un triangle rectangle", pts: [{ x: 0, y: 0 }, { x: 5, y: 0 }, { x: 0, y: 3.5 }], par: 0, droits: 1, objets: ["une équerre", "une voile de bateau", "une serviette pliée en deux en biais"], pourquoiPar: "Dans un triangle, deux côtés se touchent toujours : aucun n'est parallèle à un autre.", pourquoiDroits: "Un seul coin est carré." },
  { nom: "un losange", pts: [{ x: 0, y: 2 }, { x: 3, y: 0 }, { x: 6, y: 2 }, { x: 3, y: 4 }], par: 2, droits: 0, objets: ["un panneau de route prioritaire", "un carreau de vitrail", "un cerf-volant en losange"], pourquoiPar: "Les côtés opposés sont parallèles deux à deux.", pourquoiDroits: "Ses coins ne sont pas carrés." },
  { nom: "un hexagone régulier", pts: regulier(6, 3, 0), par: 3, droits: 0, objets: ["une alvéole de ruche", "un écrou", "une case hexagonale de jeu de société"], pourquoiPar: "Chaque côté est parallèle au côté d'en face : 3 paires.", pourquoiDroits: "Ses coins sont plus ouverts qu'un angle droit." },
  { nom: "un octogone régulier", pts: regulier(8, 3, 22.5), par: 4, droits: 0, objets: ["un panneau stop", "un dessous-de-plat à huit côtés"], pourquoiPar: "Chaque côté est parallèle au côté d'en face : 4 paires.", pourquoiDroits: "Ses coins sont plus ouverts qu'un angle droit." },
  { nom: "la forme d'une maison", pts: [{ x: 0, y: 0 }, { x: 5, y: 0 }, { x: 5, y: 3 }, { x: 2.5, y: 5 }, { x: 0, y: 3 }], par: 1, droits: 2, objets: ["la façade d'une maison avec son toit pointu", "un nichoir vu de face"], pourquoiPar: "Seuls les deux murs sont parallèles.", pourquoiDroits: "Les deux coins du bas sont des angles droits." },
];
function de(o: string) {
  if (/^une? /.test(o)) return `d'${o}`;
  if (o.startsWith("le ")) return `du ${o.slice(3)}`;
  return `de ${o}`;
}
const INTROS_FORME: ((o: string) => string)[] = [
  (o) => `${un(NOMS)} dessine le contour ${de(o)}.`,
  (o) => `Voici le contour ${de(o)}.`,
  (o) => `Le maître a dessiné le contour ${de(o)}.`,
  (o) => `Dans son cahier, ${un(NOMS)} a reproduit la forme ${de(o)}.`,
];
function polygone(pts: Pt[], angle: number): ConstructionCanvasData {
  return {
    kind: "construction",
    points: pts.map((p, i) => ({ id: `s${i}`, ...tourner(p, angle), cache: true })),
    polygones: [{ sommets: pts.map((_, i) => `s${i}`) }],
  };
}
function rectangleFig(noms: [string, string, string, string], L: string, l: string, ang: number): ConstructionCanvasData {
  const W = 6;
  const H = 3.6;
  const pts: Pt[] = [{ x: 0, y: 0 }, { x: W, y: 0 }, { x: W, y: H }, { x: 0, y: H }];
  const r = (p: Pt) => tourner(p, ang);
  return {
    kind: "construction",
    points: [
      ...pts.map((p, i) => ({ id: `s${i}`, ...r(p), nom: noms[i] })),
      { id: "l1", ...r({ x: 0, y: -0.55 }), cache: true },
      { id: "l2", ...r({ x: W, y: -0.55 }), cache: true },
      { id: "h1", ...r({ x: W + 0.6, y: 0 }), cache: true },
      { id: "h2", ...r({ x: W + 0.6, y: H }), cache: true },
    ],
    polygones: [{ sommets: ["s0", "s1", "s2", "s3"] }],
    segments: [
      { a: "l1", b: "l2", texte: L, sansTrait: true },
      { a: "h1", b: "h2", texte: l, sansTrait: true },
    ],
    angles: [0, 1, 2, 3].map((i) => ({ sommet: `s${i}`, de: `s${(i + 1) % 4}`, vers: `s${(i + 3) % 4}`, droit: true })),
  };
}

/** Le point et ses trois « chemins » vers (d) : un perpendiculaire (codé), deux en biais. */
function cheminsVersDroite(A: string, pieds: [string, string, string], dx: [number, number], textes: [string, string, string] | null, angle: number) {
  const P = { x: 5, y: 3 };
  const H = { x: 5, y: 0 };
  const K = { x: 5 - dx[0], y: 0 };
  const L = { x: 5 + dx[1], y: 0 };
  return schema(
    [
      { nom: "(d)", a: { x: -0.5, y: 0 }, b: { x: 10.5, y: 0 }, couleur: "#0f172a", lab: [0.9, 1] },
      { a: P, b: H, segment: true, couleur: COUL[0] },
      { a: P, b: K, segment: true, couleur: COUL[1] },
      { a: P, b: L, segment: true, couleur: COUL[2] },
    ],
    {
      angle,
      points: [{ p: P, nom: A }, { p: H, nom: pieds[0] }, { p: K, nom: pieds[1] }, { p: L, nom: pieds[2] }],
      droits: [[H, { x: 7, y: 0 }, { x: 5, y: 2 }]],
      mesures: textes
        ? [
            { a: { x: 5.35, y: 0.2 }, b: { x: 5.35, y: 2.8 }, texte: textes[0] },
            { a: plus(K, { x: P.x - K.x, y: 3 }, 0.12), b: plus(K, { x: P.x - K.x, y: 3 }, 0.88), texte: textes[1] },
            { a: plus(L, { x: P.x - L.x, y: 3 }, 0.12), b: plus(L, { x: P.x - L.x, y: 3 }, 0.88), texte: textes[2] },
          ]
        : [],
    },
  );
}

const DISTANCE_VIE: { t: (A: string) => string; q: string; u: string; min: number; max: number }[] = [
  { t: (A) => `La maison ${A} est près d'une route toute droite, la droite (d).`, q: "le chemin le plus court de la maison à la route", u: "m", min: 30, max: 90 },
  { t: (A) => `Un nageur ${A} veut rejoindre le bord de la piscine, la droite (d), au plus vite.`, q: "le trajet le plus court du nageur au bord", u: "m", min: 3, max: 9 },
  { t: (A) => `Le chien ${A} est dans le jardin, près de la clôture droite (d).`, q: "le chemin le plus court du chien à la clôture", u: "m", min: 3, max: 12 },
  { t: (A) => `Sur le plan, l'arbre ${A} est près de la rivière, tracée par la droite (d).`, q: "la distance de l'arbre à la rivière", u: "m", min: 8, max: 40 },
  { t: (A) => `Une bouée ${A} flotte près de la plage, représentée par la droite (d).`, q: "le trajet le plus court de la bouée à la plage", u: "m", min: 20, max: 80 },
  { t: (A) => `Le pompier est au point ${A}, près d'un tuyau droit (d) posé au sol.`, q: "le chemin le plus court du pompier au tuyau", u: "m", min: 4, max: 15 },
  { t: (A) => `Sur son cahier, ${un(NOMS)} a placé un point ${A} et tracé une droite (d).`, q: "la distance du point à la droite", u: "cm", min: 2, max: 5 },
  { t: (A) => `Le village ${A} est près d'une voie ferrée toute droite (d).`, q: "la distance du village à la voie ferrée", u: "km", min: 2, max: 9 },
  { t: (A) => `La vache ${A} broute près de la clôture droite (d) du pré.`, q: "le chemin le plus court de la vache à la clôture", u: "m", min: 5, max: 25 },
  { t: (A) => `Le joueur ${A} est sur le terrain, près de la ligne de touche (d).`, q: "le chemin le plus court du joueur à la ligne", u: "m", min: 4, max: 20 },
  { t: (A) => `Le robot ${A} doit rejoindre le mur droit (d) de la salle.`, q: "le trajet le plus court du robot au mur", u: "m", min: 2, max: 8 },
  { t: (A) => `Sur la carte, le refuge ${A} est près d'un sentier tout droit (d).`, q: "la distance du refuge au sentier", u: "km", min: 1, max: 6 },
];

/* ============================================================
   LES GABARITS
   ============================================================ */

export const gabaritsDroitesCm2: TutorBankItemV4[] = [
  /* ═════════════ DROITE_RECONNAITRE ★1 ═════════════ */
  REC(101, 1, "Regarde les bouts du tracé : deux points d'arrêt, un seul, ou aucun ?", (): Gen => {
    const sorte = un(SORTES);
    const q = un(["Quel objet géométrique est représenté ?", "Comment s'appelle ce tracé en géométrie ?", "Ce tracé est…", "Quel est le bon nom de ce tracé ?", "Que représente ce tracé ?"]);
    return {
      text: `${cadre("cette figure")} ${q}`,
      ...qcm(NOM_SORTE[sorte], ["une droite", "un segment", "une demi-droite", "un angle droit"]),
      explanation: EXPLI_SORTE[sorte],
      canvas: objetFig(sorte),
    };
  }),

  REC(102, 1, "Un segment s'arrête des deux côtés, une demi-droite d'un seul, une droite jamais.", (): Gen => {
    const sorte = un(["segment", "segment", "demi_droite", "droite"] as Sorte[]);
    const d = un(
      sorte === "segment"
        ? ["un fil à linge tendu entre deux arbres", "le bord d'une règle", "un bâton de mikado", "une arête d'une boîte à chaussures", "le câble d'une tyrolienne entre deux arbres", "une allumette", "le bord d'une table", "un côté d'un carré de chocolat", "la barre transversale d'un but de foot", "un spaghetti cru", "le trait qui relie deux villes sur une carte"]
        : sorte === "demi_droite"
          ? ["le rayon d'une lampe de poche, qui part de la lampe et file sans fin", "le rayon laser d'un pointeur, qui part du pointeur et ne s'arrête jamais", "la lumière d'un phare, qui part du phare et file tout droit vers le large", "un rayon de soleil, qui part du Soleil et file tout droit", "le faisceau d'une lampe frontale, qui part de la lampe et va tout droit sans fin"]
          : ["une route imaginaire toute droite, sans début ni fin", "un fil imaginaire tendu sans fin dans les deux sens", "un rail qui ne s'arrêterait jamais, ni devant ni derrière", "une ligne d'horizon qu'on imagine continuer sans fin à gauche et à droite"],
    );
    const t = un([`En géométrie, ${d} fait penser à…`, `Quel objet géométrique ressemble le plus à ${d} ?`, `Pour dessiner ${d}, on trace…`, `${cap(d)} : en géométrie, c'est plutôt…`]);
    return {
      text: t,
      ...qcm(NOM_SORTE[sorte], ["un segment", "une demi-droite", "une droite", "un angle droit"]),
      explanation: sorte === "segment" ? "Il s'arrête des deux côtés : il a deux extrémités, comme un segment." : sorte === "demi_droite" ? "Il part d'un point (l'origine) et ne s'arrête jamais de l'autre côté : c'est une demi-droite." : "Il ne s'arrête d'aucun côté : c'est une droite.",
    };
  }),

  REC(103, 1, "Compte les points où le tracé s'arrête.", (): Gen => {
    const sorte = un(SORTES);
    const juste = sorte === "segment" ? "en 2 points" : sorte === "demi_droite" ? "en 1 seul point" : "nulle part, il ne s'arrête pas";
    const q = un(["En combien de points ce tracé s'arrête-t-il ?", "Ce tracé s'arrête en combien de points ?", "Où ce tracé s'arrête-t-il ?"]);
    return {
      text: `${cadre("cette figure")} ${q}`,
      ...qcm(juste, ["en 2 points", "en 1 seul point", "nulle part, il ne s'arrête pas", "en 3 points"]),
      explanation: `${EXPLI_SORTE[sorte]} Un segment a 2 extrémités, une demi-droite 1 origine, une droite aucune.`,
      canvas: objetFig(sorte),
    };
  }),

  REC(104, 1, "Le segment a un point à chaque bout ; la demi-droite a un point et une flèche ; la droite traverse tout.", (): Gen => {
    const ordre = melange([...SORTES]);
    const cible = un(SORTES);
    const k = ordre.indexOf(cible) + 1;
    const ys = [55, 125, 195];
    const lines: Ligne[] = ordre.map((s, i) => ({ id: `l${i}`, type: s, from: { x: 50, y: ys[i] + 8 }, to: { x: 270, y: ys[i] - 8 }, label: String(i + 1), color: COUL[i] }));
    const points: Point[] = [];
    ordre.forEach((s, i) => {
      if (s === "segment") points.push({ x: 50, y: ys[i] + 8 }, { x: 270, y: ys[i] - 8 });
      if (s === "demi_droite") points.push({ x: 50, y: ys[i] + 8 });
    });
    const q = un([(c: string) => `Lequel est ${c} ?`, (c: string) => `Quel tracé est ${c} ?`, (c: string) => `Quel numéro porte ${c} ?`, (c: string) => `Trouve ${c} parmi ces tracés.`]);
    return {
      text: `${cadre("ces trois tracés")} ${q(NOM_SORTE[cible])}`,
      ...qcm(`le tracé ${k}`, ["le tracé 1", "le tracé 2", "le tracé 3"]),
      explanation: EXPLI_SORTE[cible],
      canvas: droitesCanvas({ lines, points: points.map((p) => ({ ...p, color: "#ef4444" })) }),
    };
  }),

  /* ═════════════ DROITE_RECONNAITRE ★2 ═════════════ */
  REC(105, 2, "Crochet [ : le tracé s'arrête au point. Parenthèse ( : il continue.", (): Gen => {
    const sorte = un(SORTES);
    const [A, B] = lettres(2);
    const q = un(["Comment note-t-on ce tracé ?", "Quelle est la bonne notation de ce tracé ?", "Quelle écriture désigne ce tracé ?", "Comment écrire le nom de ce tracé ?"]);
    return {
      text: `${cadre("cette figure")} ${q}`,
      ...qcm(notations(sorte, A, B)[0], [`[${A}${B}]`, `(${A}${B})`, `[${A}${B})`, `[${B}${A})`]),
      explanation: sorte === "segment" ? `Il s'arrête en ${A} et en ${B} : deux crochets, [${A}${B}].` : sorte === "droite" ? `Il continue des deux côtés : deux parenthèses, (${A}${B}).` : `Il s'arrête en ${A} (crochet) et continue après ${B} (parenthèse) : [${A}${B}). L'origine s'écrit en premier.`,
      canvas: objetFig(sorte, [A, B]),
    };
  }),

  REC(106, 2, "Crochet [ = on s'arrête au point ; parenthèse ( = on continue sans fin.", (): Gen => {
    const sorte = un(SORTES);
    const [A, B] = lettres(2);
    const nota = notations(sorte, A, B)[0];
    const D: Record<Sorte, string> = { segment: `le segment d'extrémités ${A} et ${B}`, droite: `la droite qui passe par ${A} et ${B}`, demi_droite: `la demi-droite d'origine ${A} qui passe par ${B}` };
    const lieu = un([`Dans le cahier ${deN()}, on lit`, "Au tableau, le maître a écrit", "Sur la fiche d'exercices, on trouve l'écriture", "Dans le manuel de maths, on lit", "Sur le plan de l'architecte, il est écrit", "Dans un programme de construction, on lit", `Sur l'ardoise ${deN()}, il y a`, "Dans la consigne d'un jeu de géométrie, on lit", "Dans le carnet de la géomètre, on lit"]);
    const q = un(["Que désigne cette écriture ?", "Que veut dire cette notation ?", "De quel tracé s'agit-il ?"]);
    return {
      text: `${lieu} ${nota}. ${q}`,
      ...qcm(D[sorte], [D.segment, D.droite, D.demi_droite, `la demi-droite d'origine ${B} qui passe par ${A}`]),
      explanation: `${nota} : ${D[sorte]}. Le crochet s'arrête au point, la parenthèse continue sans fin.`,
      canvas: droitesCanvas({ lines: [], points: [surPente(PENTES[0], 0.25), surPente(PENTES[0], 0.75)].map((p, i) => ({ ...p, label: [A, B][i], color: "#ef4444" })) }),
    };
  }),

  REC(107, 2, "Le segment s'arrête à ses extrémités ; la demi-droite part de son origine et ne s'arrête plus.", (): Gen => {
    const [A, B, C] = lettres(3);
    const pente = un(PENTES);
    const ou = un(["entre", "apres", "avant"] as const);
    const tC = ou === "entre" ? 0.45 : ou === "apres" ? 0.85 : 0.08;
    const surSegment = Math.random() < 0.55;
    let juste: string, faux: string[], expl: string, q: string;
    if (surSegment) {
      q = un([`Le point ${C} est-il sur le segment [${A}${B}] ?`, `${C} appartient-il au segment [${A}${B}] ?`, `Peut-on dire que ${C} est sur [${A}${B}] ?`]);
      const oui = `oui, ${C} est entre ${A} et ${B}`;
      const non = `non : ${C} est sur la droite (${A}${B}), mais pas entre ${A} et ${B}`;
      if (ou === "entre") {
        [juste, faux, expl] = [oui, [non, "non, un segment ne contient que ses deux extrémités", `non, ${C} n'est pas sur la droite (${A}${B})`], `${C} est entre ${A} et ${B} : il est sur le segment [${A}${B}].`];
      } else {
        [juste, faux, expl] = [non, [oui, `oui, car ${C} est sur la droite (${A}${B})`, `non, ${C} n'est pas sur la droite (${A}${B})`], `Le segment [${A}${B}] s'arrête en ${A} et en ${B}. ${C} est sur la droite, mais en dehors du segment.`];
      }
    } else {
      q = un([`Le point ${C} est-il sur la demi-droite [${A}${B}) ?`, `${C} appartient-il à la demi-droite [${A}${B}) ?`, `Peut-on dire que ${C} est sur [${A}${B}) ?`]);
      const oui = `oui : ${C} est du côté de ${B}, à partir de l'origine ${A}`;
      const non = `non : ${C} est de l'autre côté de l'origine ${A}`;
      if (ou === "avant") {
        [juste, faux, expl] = [non, [oui, `oui, car ${C} est sur la droite (${A}${B})`, `non, car ${C} n'est pas entre ${A} et ${B}`], `[${A}${B}) part de ${A} vers ${B}. ${C} est de l'autre côté de ${A} : il n'est pas dessus.`];
      } else {
        [juste, faux, expl] = [oui, [non, `non, car ${C} n'est pas entre ${A} et ${B}`, `non, ${C} n'est pas sur la droite (${A}${B})`], `[${A}${B}) part de ${A}, passe par ${B} et continue sans fin : ${C} est dessus.`];
      }
    }
    return {
      text: `${cadre(`la droite (${A}${B}) et le point ${C}`)} ${q}`,
      ...qcm(juste, faux),
      explanation: expl,
      canvas: droitesCanvas({
        lines: [{ id: "x", type: "droite", from: pente[0], to: pente[1], color: "#94a3b8", strokeWidth: 3 }],
        points: [
          { ...surPente(pente, 0.25), label: A, color: "#ef4444" },
          { ...surPente(pente, 0.62), label: B, color: "#ef4444" },
          { ...surPente(pente, tC), label: C, color: "#f97316" },
        ],
      }),
    };
  }),

  REC(108, 2, "Là où deux droites se croisent, il y a un point commun aux deux.", (): Gen => {
    const I = un(LETTRES);
    const rues = melange(["la rue des Lilas", "l'avenue des Pins", "la rue de la Gare", "le boulevard du Port", "la rue du Moulin", "l'allée des Roses", "la rue de l'École", "le chemin des Vignes"]);
    const intro = un([
      cadre(`deux droites qui se croisent au point ${I}`),
      `Sur le plan de la ville, ${rues[0]} et ${rues[1]} sont deux droites qui se croisent au point ${I}.`,
      `Sur le terrain de sport, deux lignes droites se croisent au point ${I}.`,
      `Sur la carte au trésor, deux chemins tout droits se croisent au point ${I}.`,
      `Sur le plan du métro, deux lignes toutes droites se croisent à la station ${I}.`,
    ]);
    const q = un([`Comment appelle-t-on le point ${I} ?`, `Le point ${I} est…`, `Quel est le nom du point ${I} pour ces deux droites ?`]);
    return {
      text: `${intro} ${q}`,
      ...qcm("le point d'intersection des deux droites", ["le milieu des deux droites", "l'origine des deux droites", "une extrémité de chaque droite"]),
      explanation: `${I} est sur les deux droites à la fois : c'est leur point d'intersection.`,
      canvas: paire(Math.random() < 0.5 ? "sec" : "perp", un(NOMS_DROITES), { point: I, code: false }),
    };
  }),

  REC(109, 2, "Attention : [AB] et [BA] désignent le même segment, (AB) et (BA) la même droite.", (): Gen => {
    const sorte = un(SORTES);
    const [A, B] = lettres(2);
    const intro = cadre("cette figure");
    const [n1, n2] = deuxNoms(intro);
    const vrais = notations(sorte, A, B);
    const fauxN = melange(TOUTES_NOTATIONS(A, B).filter((x) => !vrais.includes(x)));
    const r = Math.random();
    let s1: string, s2: string, juste: string;
    if (r < 0.3) [s1, s2, juste] = [vrais[0], fauxN[0], n1];
    else if (r < 0.6) [s1, s2, juste] = [fauxN[0], vrais[0], n2];
    else if (r < 0.78 || vrais.length < 2) [s1, s2, juste] = [fauxN[0], fauxN[1], "aucun des deux"];
    else {
      const [v1, v2] = melange([...vrais]);
      [s1, s2, juste] = [v1, v2, "les deux"];
    }
    return {
      text: `${intro} ${n1} dit : « C'est ${s1}. » ${n2} dit : « C'est ${s2}. » Qui a raison ?`,
      ...qcm(juste, [n1, n2, "les deux", "aucun des deux"]),
      explanation: `Les bonnes écritures : ${vrais.join(" ou ")}. ${EXPLI_SORTE[sorte]}`,
      canvas: objetFig(sorte, [A, B]),
    };
  }),

  /* ═════════════ DROITE_RECONNAITRE ★3 (CM2) ═════════════ */
  REC(110, 3, "Chaque segment relie deux des points : compte-les sans en oublier et sans compter deux fois.", (): Gen => {
    const n = un([3, 3, 4, 4, 5]);
    const L = lettres(n);
    const juste = (n * (n - 1)) / 2;
    const sit = un([
      `Sur une route toute droite, ${n} arrêts de bus sont notés ${liste(L)}.`,
      `Le long d'une clôture droite, le jardinier a planté ${n} piquets notés ${liste(L)}.`,
      `Sur un fil tendu, ${un(NOMS)} a enfilé ${n} perles notées ${liste(L)}.`,
      `Sur une droite tracée au tableau, le maître a placé ${n} points ${liste(L)}.`,
      `Sur une voie ferrée toute droite, ${n} gares sont notées ${liste(L)}.`,
      `Sur le bord d'une table, la menuisière a fait ${n} marques notées ${liste(L)}.`,
      `Le long d'une piste cyclable droite, ${n} bornes sont notées ${liste(L)}.`,
      `Sur une règle, ${un(NOMS)} a marqué ${n} points ${liste(L)}.`,
      `Dans un jeu vidéo, ${n} drapeaux sont alignés aux points ${liste(L)}.`,
      `Sur la ligne de touche, l'entraîneuse a posé ${n} plots notés ${liste(L)}.`,
      `Sur le câble d'un téléphérique, ${n} cabines sont repérées par ${liste(L)}.`,
      `Sur une ligne de métro toute droite, ${n} stations sont notées ${liste(L)}.`,
    ]);
    const q = un(["Combien de segments différents peut-on nommer avec ces points ?", "Combien de segments ont leurs deux extrémités parmi ces points ?", "Combien de segments différents relient deux de ces points ?", "En prenant les points deux par deux, combien de segments obtient-on ?"]);
    const segs: string[] = [];
    for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) segs.push(`[${L[i]}${L[j]}]`);
    return {
      text: `${sit} ${q}`,
      ...qcmN(juste, [n - 1, n, n * (n - 1), juste + 1]),
      explanation: `On les range : ${segs.join(", ")}. Cela fait ${juste} segments ([${L[0]}${L[1]}] et [${L[1]}${L[0]}] sont le même).`,
      canvas: alignes(L),
    };
  }),

  REC(111, 3, "Trois points alignés sont sur UNE seule droite ; mais chaque segment et chaque demi-droite est différent.", (): Gen => {
    const [A, B, C] = lettres(3);
    const V = [
      `(${A}${B}) et (${B}${C}) désignent la même droite`,
      `(${A}${B}) et (${A}${C}) désignent la même droite`,
      `[${A}${B}) et [${A}${C}) désignent la même demi-droite`,
      `[${C}${B}) et [${C}${A}) désignent la même demi-droite`,
      `${B} est sur le segment [${A}${C}]`,
      `${C} est sur la demi-droite [${A}${B})`,
      `${A} est sur la demi-droite [${C}${B})`,
    ];
    const F = [
      `[${A}${B}] et [${A}${C}] désignent le même segment`,
      `[${B}${A}) et [${B}${C}) désignent la même demi-droite`,
      `${A} est sur le segment [${B}${C}]`,
      `[${A}${B}) et [${B}${A}) désignent la même demi-droite`,
      `${C} est sur la demi-droite [${B}${A})`,
      `${A} est sur la demi-droite [${B}${C})`,
      `[${A}${C}] est plus court que [${A}${B}]`,
    ];
    const intro = un([
      `Les points ${A}, ${B} et ${C} sont alignés dans cet ordre.`,
      `Sur une droite, ${un(NOMS)} a placé ${A}, puis ${B}, puis ${C}.`,
      `Trois villes ${A}, ${B} et ${C} sont sur une route droite, dans cet ordre.`,
      `Sur une ligne de bus droite, les arrêts ${A}, ${B} et ${C} se suivent.`,
      `Le long d'un mur droit, trois clous ${A}, ${B} et ${C} se suivent.`,
      `Sur le plan, trois bouées ${A}, ${B} et ${C} sont alignées dans cet ordre.`,
    ]);
    const q = un(["Quelle phrase est vraie ?", "Une seule affirmation est juste. Laquelle ?", "Laquelle de ces phrases est correcte ?"]);
    const juste = cap(un(V));
    return {
      text: `${intro} ${q}`,
      ...qcm(juste, melange(F).slice(0, 3).map(cap)),
      explanation: `Une seule droite passe par ${A}, ${B} et ${C}. Mais [${A}${B}] s'arrête en ${B}, et une demi-droite dépend de son origine ET de son sens.`,
      canvas: alignes([A, B, C]),
    };
  }),

  REC(112, 3, "Si B est entre A et C : AC = AB + BC. Une droite, elle, n'a pas de longueur.", (): Gen => {
    const [A, B, C] = lettres(3);
    const s = un(ALIGNES_VIE);
    const a = dec(12, 58);
    let b = dec(12, 58);
    if (b === a) b = a + 0.3;
    const c = Math.round((a + b) * 10) / 10;
    const k = un([0, 0, 1, 1, 2]);
    const xB = (10 * a) / c;
    const pos = { A: { x: 0, y: 0 }, B: { x: xB, y: 0 }, C: { x: 10, y: 0 } };
    const traits: Trait[] = [{ a: { x: -1, y: 0 }, b: { x: 11, y: 0 }, couleur: "#94a3b8" }];
    const pts = [{ p: pos.A, nom: A }, { p: pos.B, nom: B }, { p: pos.C, nom: C }];
    const ang = un([0, 0, 10, -12, 20]);
    if (k === 0 || k === 2) {
      const q = k === 0
        ? un([`Quelle est la longueur du segment [${A}${C}] ?`, `Combien mesure ${A}${C} ?`, `Quelle distance sépare ${A} de ${C} ?`])
        : un([`Quelle est la longueur de la droite (${A}${C}) ?`, `Combien mesure la droite (${A}${C}) ?`]);
      const piege = "on ne peut pas la mesurer : une droite est sans fin";
      return {
        text: `${s.t(A, B, C)} ${A}${B} = ${fr(a)} ${s.u} et ${B}${C} = ${fr(b)} ${s.u}. ${q}`,
        ...(k === 0
          ? qcm(`${fr(c)} ${s.u}`, [`${fr(Math.abs(a - b))} ${s.u}`, `${fr(a)} ${s.u}`, `${fr(Math.round((c + 1) * 10) / 10)} ${s.u}`, piege])
          : qcm(piege, [`${fr(c)} ${s.u}`, `${fr(Math.abs(a - b))} ${s.u}`, `${fr(a)} ${s.u}`])),
        explanation: k === 0 ? `${B} est entre ${A} et ${C} : ${A}${C} = ${fr(a)} + ${fr(b)} = ${fr(c)} ${s.u}.` : `Une droite continue sans fin : elle n'a pas de longueur. Seul le segment [${A}${C}] mesure ${fr(c)} ${s.u}.`,
        canvas: schema(traits, { angle: ang, points: pts, mesures: [{ a: { x: 0, y: 0.7 }, b: { x: xB, y: 0.7 }, texte: `${fr(a)} ${s.u}` }, { a: { x: xB, y: 0.7 }, b: { x: 10, y: 0.7 }, texte: `${fr(b)} ${s.u}` }] }),
      };
    }
    const q = un([`Quelle est la longueur du segment [${B}${C}] ?`, `Combien mesure ${B}${C} ?`, `Quelle distance sépare ${B} de ${C} ?`]);
    return {
      text: `${s.t(A, B, C)} ${A}${C} = ${fr(c)} ${s.u} et ${A}${B} = ${fr(a)} ${s.u}. ${q}`,
      ...qcmN(b, [c + a, a, c, Math.abs(b - 1)], s.u, 0.1),
      explanation: `${A}${C} = ${A}${B} + ${B}${C}, donc ${B}${C} = ${fr(c)} − ${fr(a)} = ${fr(b)} ${s.u}.`,
      canvas: schema(traits, { angle: ang, points: pts, mesures: [{ a: { x: 0, y: 0.7 }, b: { x: xB, y: 0.7 }, texte: `${fr(a)} ${s.u}` }, { a: { x: 0, y: -0.7 }, b: { x: 10, y: -0.7 }, texte: `${fr(c)} ${s.u}` }] }),
    };
  }),

  REC(113, 3, "Le milieu partage le segment en deux longueurs égales.", (): Gen => {
    const [A, M, B] = lettres(3);
    const sit = un([
      { t: `Le menuisier marque le milieu ${M} d'une planche [${A}${B}].`, u: "cm" },
      { t: `Sur son cahier, ${un(NOMS)} place le milieu ${M} du segment [${A}${B}].`, u: "cm" },
      { t: `La ligne médiane coupe le terrain de foot en son milieu : le point ${M} est le milieu de [${A}${B}].`, u: "m" },
      { t: `La couturière plie un ruban [${A}${B}] en deux : le pli ${M} est son milieu.`, u: "cm" },
      { t: `Sur une route droite, le relais ${M} est au milieu entre les villes ${A} et ${B}.`, u: "km" },
      { t: `La maçonne repère le milieu ${M} d'un mur [${A}${B}] pour poser une fenêtre.`, u: "m" },
      { t: `Sur une corde tendue [${A}${B}], le funambule s'arrête au milieu ${M}.`, u: "m" },
      { t: `Le point ${M} est le milieu du segment [${A}${B}] tracé au tableau.`, u: "cm" },
      { t: `Sur la piste cyclable [${A}${B}], le ravitaillement ${M} est placé au milieu.`, u: "km" },
      { t: `L'électricien veut fixer une lampe au milieu ${M} d'une poutre [${A}${B}].`, u: "m" },
    ]);
    const demi = dec(15, 65);
    const tout = Math.round(demi * 20) / 10;
    const k = Math.random() < 0.5;
    const q = k ? un([`Combien mesure [${A}${B}] ?`, `Quelle est la longueur de [${A}${B}] ?`, `Trouve ${A}${B}.`]) : un([`Combien mesure [${A}${M}] ?`, `Quelle est la longueur ${A}${M} ?`, `À quelle distance de ${A} se trouve ${M} ?`]);
    const donnee = k ? `${A}${M} = ${fr(demi)} ${sit.u}.` : `${A}${B} = ${fr(tout)} ${sit.u}.`;
    return {
      text: `${sit.t} ${donnee} ${q}`,
      ...(k ? qcmN(tout, [demi, demi / 2, demi + 2], sit.u, 0.5) : qcmN(demi, [tout, tout * 2, tout - 1], sit.u, 0.5)),
      explanation: k ? `${M} est au milieu : ${A}${B} = 2 × ${fr(demi)} = ${fr(tout)} ${sit.u}.` : `${M} est au milieu : ${A}${M} = ${fr(tout)} ÷ 2 = ${fr(demi)} ${sit.u}.`,
      canvas: schema([{ a: { x: 0, y: 0 }, b: { x: 10, y: 0 }, segment: true, couleur: COUL[0] }], {
        angle: un([0, 0, 12, -15]),
        points: [{ p: { x: 0, y: 0 }, nom: A }, { p: { x: 5, y: 0 }, nom: M }, { p: { x: 10, y: 0 }, nom: B }],
        mesures: [k ? { a: { x: 0, y: 0.7 }, b: { x: 5, y: 0.7 }, texte: `${fr(demi)} ${sit.u}` } : { a: { x: 0, y: 0.7 }, b: { x: 10, y: 0.7 }, texte: `${fr(tout)} ${sit.u}` }],
      }),
    };
  }),

  /* ═════════════ DROITE_PARALLELE ★1 ═════════════ */
  PAR(101, 1, "Deux droites parallèles ne se coupent jamais : elles gardent le même écart.", (): Gen => {
    const rel = un(["par", "par", "sec"] as const);
    const [a, b] = un(NOMS_DROITES);
    const q = un([`Les droites ${a} et ${b} sont-elles parallèles ?`, `${a} et ${b} sont-elles parallèles ?`, "Ces deux droites sont-elles parallèles ?", `Peut-on dire que ${a} et ${b} sont parallèles ?`]);
    return {
      text: `${cadre("ces deux droites")} ${q}`,
      ...qcm(rel === "par" ? "oui, elles sont parallèles" : "non, elles se coupent", ["oui, elles sont parallèles", "non, elles se coupent", "non, elles sont perpendiculaires"]),
      explanation: rel === "par" ? "L'écart reste le même partout, elles ne se coupent jamais : elles sont parallèles." : "Elles se croisent en un point : elles ne sont pas parallèles (et l'angle n'est pas droit).",
      canvas: paire(rel, [a, b]),
    };
  }),

  PAR(102, 1, "Imagine les deux lignes prolongées : se croisent-elles ? en angle droit ?", (): Gen => {
    const v = tirerVie({ par: 6, perp: 2, sec: 2 });
    return {
      text: un(TOURN_VIE)(v.s),
      ...qcm(MOT_REL[v.rel], Object.values(MOT_REL)),
      explanation: EXPLI_REL[v.rel],
    };
  }),

  PAR(103, 1, "Parallèles : jamais de croisement. Perpendiculaires : un angle droit.", (): Gen => {
    const par = Math.random() < 0.75;
    const def = un(
      par
        ? ["Deux droites qui ne se coupent jamais, même si on les prolonge, sont…", "Deux droites qui gardent toujours le même écart sont…", "Deux droites qui restent toujours à la même distance l'une de l'autre sont…", "Deux droites qui vont dans la même direction sans jamais se rencontrer sont…", "Des droites comme les rails d'un train sont…", "Des droites comme les lignes d'un cahier sont…"]
        : ["Deux droites qui se coupent en formant un angle droit sont…", "Deux droites qui se croisent comme les bords d'un coin de feuille sont…", "Des droites comme les deux traits du signe plus (+) sont…"],
    );
    const f = un(["Le maître demande : ", "Dans le manuel, on lit : ", "Question du quiz de géométrie : ", "Défi du jour : ", "Carte du jeu de l'oie : ", `Devinette ${deN()} : `]);
    return {
      text: `${f}« ${def} »`,
      ...qcm(par ? "parallèles" : "perpendiculaires", ["parallèles", "perpendiculaires", "verticales", "horizontales"]),
      explanation: par ? "Jamais de croisement, même écart partout : parallèles." : "Un angle droit au croisement : perpendiculaires. Ce n'est pas une question de verticale.",
      canvas: paire(par ? "par" : "perp", un(NOMS_DROITES)),
    };
  }),

  PAR(104, 1, "Cherche la droite qui garde toujours le même écart avec elle.", (): Gen => {
    const noms = melange(["(d)", "(e)", "(f)", "(g)"]) as [string, string, string, string];
    const q = un([(x: string) => `Quelle droite est parallèle à ${x} ?`, (x: string) => `Parmi les autres droites, laquelle est parallèle à ${x} ?`, (x: string) => `Trouve la droite parallèle à ${x}.`, (x: string) => `Quelle droite ne coupera jamais ${x}, même prolongée ?`]);
    return {
      text: `${cadre("ces quatre droites")} ${q(noms[0])}`,
      ...qcm(noms[1], [noms[2], noms[3], "aucune"]),
      explanation: `${noms[1]} garde le même écart avec ${noms[0]} : elles sont parallèles. ${noms[2]} et ${noms[3]} la coupent.`,
      canvas: plan4(noms, un(ANGLES)),
    };
  }),

  /* ═════════════ DROITE_PARALLELE ★2 ═════════════ */
  PAR(105, 2, "Compte les carreaux entre les deux droites à gauche, puis à droite.", (): Gen => {
    const presque = Math.random() < 0.55;
    const forme = un(["h", "v", "o"] as const);
    let l1: [Pt, Pt], l2: [Pt, Pt];
    if (forme === "h") {
      const y = entre(1, 2);
      l1 = [G(0, y), G(8, y)];
      l2 = presque ? [G(0, y + 3), G(8, y + (Math.random() < 0.5 ? 2 : 4))] : [G(0, y + 3), G(8, y + 3)];
    } else if (forme === "v") {
      const x = entre(1, 3);
      l1 = [G(x, 0), G(x, 6)];
      l2 = presque ? [G(x + 3, 0), G(x + (Math.random() < 0.5 ? 2 : 4), 6)] : [G(x + 3, 0), G(x + 3, 6)];
    } else {
      l1 = [G(0, 0), G(8, 2)];
      l2 = presque ? [G(0, 3), G(8, Math.random() < 0.5 ? 4 : 6)] : [G(0, 3), G(8, 5)];
    }
    const [c1, c2] = deuxCouleurs();
    const q = un(["Sont-elles parallèles ?", "Peut-on dire qu'elles sont parallèles ?", "Ces droites sont-elles vraiment parallèles ?"]);
    const juste = presque ? "non : l'écart change, elles finiraient par se couper" : "oui : l'écart reste le même partout";
    const faux = presque
      ? ["oui, car elles ne se coupent pas sur le dessin", "oui : l'écart reste le même partout", "on ne peut pas savoir sans les prolonger jusqu'au bout"]
      : ["non : l'écart change, elles finiraient par se couper", "non, car elles ne sont pas verticales", "on ne peut pas savoir sans les prolonger jusqu'au bout"];
    return {
      text: `${cadreGrille("deux droites")} Elles ne se coupent pas sur le dessin. ${q}`,
      ...qcm(juste, faux),
      explanation: presque ? "En comptant les carreaux, l'écart n'est pas le même aux deux bouts : prolongées, elles se couperaient." : "Le même nombre de carreaux sépare les droites partout : elles sont parallèles.",
      canvas: grille([
        { id: "d", type: "droite", from: l1[0], to: l1[1], color: c1 },
        { id: "e", type: "droite", from: l2[0], to: l2[1], color: c2 },
      ]),
    };
  }),

  PAR(106, 2, "Même écart aux deux endroits : parallèles. Écart différent : elles finiront par se couper.", (): Gen => {
    const sit = un([
      { s: "les deux bords d'un ruban", u: "cm", min: 20, max: 60 },
      { s: "deux traits tracés sur son cahier", u: "cm", min: 20, max: 70 },
      { s: "les deux rails de son petit train électrique", u: "cm", min: 30, max: 50 },
      { s: "deux lignes tracées à la craie dans la cour", u: "m", min: 10, max: 40 },
      { s: "deux étagères d'une bibliothèque", u: "cm", min: 280, max: 400 },
      { s: "deux rangées de poireaux du potager", u: "cm", min: 200, max: 450 },
      { s: "deux lignes peintes sur un parking", u: "m", min: 20, max: 30 },
      { s: "les deux bords d'une route", u: "m", min: 50, max: 80 },
      { s: "deux fils d'une clôture", u: "cm", min: 150, max: 300 },
      { s: "les deux bords d'une bande de tissu", u: "cm", min: 30, max: 90 },
      { s: "deux lames d'un parquet", u: "cm", min: 80, max: 140 },
      { s: "deux lignes d'un terrain de handball", u: "m", min: 30, max: 60 },
    ]);
    const a = dec(sit.min, sit.max);
    const egal = Math.random() < 0.45;
    const b = egal ? a : Math.round((a + un([0.2, 0.5, 1, -0.3, -0.5])) * 10) / 10;
    const q = un(["Ces deux lignes sont-elles parallèles ?", "Peut-on dire que ces deux lignes sont parallèles ?", "Les deux lignes sont-elles parallèles ?"]);
    const oui = "oui, l'écart est le même aux deux endroits";
    const non = "non, l'écart n'est pas le même aux deux endroits";
    const va = egal ? 2.6 : a < b ? 2.2 : 3.2;
    const vb = egal ? 2.6 : a < b ? 3.2 : 2.2;
    const y2 = (x: number) => va + ((vb - va) * (x - 1.5)) / 7;
    return {
      text: `${un(NOMS)} mesure l'écart entre ${sit.s} à deux endroits : ${fr(a)} ${sit.u}, puis ${fr(b)} ${sit.u}. ${q}`,
      ...qcm(egal ? oui : non, egal ? [non, "non, il faudrait qu'elles se coupent", "on ne peut pas savoir avec deux mesures"] : [oui, "oui, car elles ne se touchent pas", "oui, la différence est trop petite pour compter"]),
      explanation: egal ? `Le même écart (${fr(a)} ${sit.u}) aux deux endroits : les lignes sont parallèles.` : `${fr(a)} ${sit.u} d'un côté, ${fr(b)} ${sit.u} de l'autre : même un petit écart qui change suffit, elles ne sont pas parallèles.`,
      canvas: schema(
        [
          { a: { x: 0, y: 0 }, b: { x: 10, y: 0 }, couleur: COUL[0] },
          { a: { x: 0, y: y2(0) }, b: { x: 10, y: y2(10) }, couleur: COUL[1] },
        ],
        { mesures: [{ a: { x: 1.5, y: 0 }, b: { x: 1.5, y: y2(1.5) }, texte: `${fr(a)} ${sit.u}` }, { a: { x: 8.5, y: 0 }, b: { x: 8.5, y: y2(8.5) }, texte: `${fr(b)} ${sit.u}` }], angle: un([0, 0, 15, -12, 90]) },
      ),
    };
  }),

  PAR(107, 2, "Cherche deux lignes qui ne se croisent jamais, même très loin.", (): Gen => {
    const juste = un(vie("par")).s;
    const faux = [...melange(vie("perp")).slice(0, 2), ...melange(vie("sec")).slice(0, 2)].map((v) => cap(v.s));
    const intro = un([`En se promenant, ${un(NOMS)} observe plusieurs choses.`, `Pour son exposé, ${un(NOMS)} cherche des exemples.`, "Le maître pose une devinette.", ""]);
    const q = un(["Lequel de ces exemples montre deux droites parallèles ?", "Où peut-on voir deux droites parallèles ?", "Quel exemple fait penser à des droites parallèles ?", "Dans quel cas les deux lignes ne se croisent-elles jamais ?"]);
    return {
      text: `${intro} ${q}`.trim(),
      ...qcm(cap(juste), faux),
      explanation: `${cap(juste)} gardent le même écart sans jamais se croiser : ce sont des droites parallèles.`,
    };
  }),

  PAR(112, 2, "Deux parallèles gardent le MÊME écart partout : une mesure suffit à le connaître.", (): Gen => {
    const sit = un([
      { s: "les deux rails d'une voie ferrée", u: "m", v: [1.435] },
      { s: "deux lignes de couloir d'une piste d'athlétisme", u: "m", v: [1.22] },
      { s: "deux étagères parallèles", u: "cm", v: [32.5, 35, 28.5, 40] },
      { s: "deux lignes du cahier", u: "cm", v: [0.8, 1, 0.5] },
      { s: "les deux bords d'une route", u: "m", v: [6.5, 7, 5.5, 8] },
      { s: "deux rangées de vignes", u: "m", v: [1.5, 2, 2.5] },
      { s: "les deux bords d'une règle", u: "cm", v: [3, 3.5, 4] },
      { s: "deux bandes d'un passage piéton", u: "cm", v: [50, 45] },
      { s: "deux droites (d) et (e) tracées sur une feuille", u: "cm", v: [2.5, 3.5, 4.5, 6.5, 4.2] },
      { s: "les deux montants d'une échelle", u: "cm", v: [42, 45, 38.5] },
      { s: "deux fils électriques parallèles", u: "cm", v: [25, 30, 35] },
      { s: "deux lames voisines du parquet", u: "cm", v: [12, 14.5, 9] },
    ]);
    const e = un(sit.v);
    const q = un(["Combien mesure l'écart à un autre endroit ?", "Plus loin, quel est l'écart ?", "Quel écart trouvera-t-on à l'autre bout ?"]);
    const intro = un([`${cap(sit.s)} sont parallèles.`, `${un(NOMS)} sait que ${sit.s} sont parallèles.`, `On considère ${sit.s} comme deux droites parallèles.`]);
    return {
      text: `${intro} À un endroit, l'écart mesure ${fr(e)} ${sit.u}. ${q}`,
      ...qcm(`${fr(e)} ${sit.u}`, [`${fr(e * 2)} ${sit.u}`, `${fr(Math.round((e + 1) * 1000) / 1000)} ${sit.u}`, "on ne peut pas savoir sans mesurer"]),
      explanation: `Des parallèles gardent le même écart partout : ${fr(e)} ${sit.u} ici, ${fr(e)} ${sit.u} plus loin.`,
      canvas: schema(
        [
          { a: { x: 0, y: 0 }, b: { x: 10, y: 0 }, couleur: COUL[0] },
          { a: { x: 0, y: 2.6 }, b: { x: 10, y: 2.6 }, couleur: COUL[1] },
        ],
        { angle: un([0, 0, 15, -20, 90]), mesures: [{ a: { x: 1.5, y: 0 }, b: { x: 1.5, y: 2.6 }, texte: `${fr(e)} ${sit.u}` }, { a: { x: 8.5, y: 0 }, b: { x: 8.5, y: 2.6 }, texte: "?" }] },
      ),
    };
  }),

  /* ═════════════ DROITE_PARALLELE ★3 ═════════════ */
  PAR(108, 3, "Sur le plan, cherche la voie qui garde le même écart sans jamais croiser l'autre.", (): Gen => {
    const c = un([
      { t: `Sur le plan du quartier ${deN()}, on voit quatre rues.`, v: "rue", f: true },
      { t: "Sur le plan de la ville, quatre avenues sont dessinées.", v: "avenue", f: true },
      { t: "Sur le plan du camping, quatre allées sont tracées.", v: "allée", f: true },
      { t: "Sur le plan du parc, quatre chemins sont dessinés.", v: "chemin", f: false },
      { t: "Dans un jeu vidéo, quatre routes traversent la ville.", v: "route", f: true },
      { t: "Sur le plan du village, le facteur repère quatre rues.", v: "rue", f: true },
      { t: "Sur la carte de la zone commerciale, quatre voies sont dessinées.", v: "voie", f: true },
      { t: "Sur le plan de la ferme, quatre chemins relient les champs.", v: "chemin", f: false },
    ]);
    const lieux = melange([
      ["des Lilas", "Lilas"], ["des Pins", "Pins"], ["de la Gare", "Gare"], ["du Port", "Port"], ["du Moulin", "Moulin"], ["des Roses", "Roses"],
      ["du Pont", "Pont"], ["de l'École", "École"], ["de la Mer", "Mer"], ["des Fleurs", "Fleurs"], ["du Parc", "Parc"], ["de la Forge", "Forge"],
    ]).slice(0, 4);
    const le = /^[aeéiou]/.test(c.v) ? "l'" : c.f ? "la " : "le ";
    const nom = (i: number) => `${le}${c.v} ${lieux[i][0]}`;
    const a0 = le === "le " ? `au ${c.v} ${lieux[0][0]}` : `à ${nom(0)}`;
    const q = un([`Quel${c.f ? "le" : ""} ${c.v} est parallèle ${a0} ?`, `Quel${c.f ? "le" : ""} ${c.v} ne croisera jamais ${nom(0)}, même prolongé${c.f ? "e" : ""} ?`, `${cap(nom(0))} a une parallèle. Laquelle ?`]);
    return {
      text: `${c.t} ${q}`,
      ...qcm(nom(1), [nom(2), nom(3), c.f ? "aucune : elles se croisent toutes" : "aucun : ils se croisent tous"]),
      explanation: `${cap(nom(1))} garde le même écart avec ${nom(0)} : ${c.f ? "elles sont parallèles" : "ils sont parallèles"}. Les deux autres ${c.f ? "la" : "le"} croisent.`,
      canvas: plan4(lieux.map((l) => l[1]) as [string, string, string, string], un(ANGLES_PENCHES)),
    };
  }),

  PAR(109, 3, "Prolonge les segments dans ta tête (ou à la règle) : vont-ils se rencontrer ?", (): Gen => {
    const rel = un(["par", "par", "ni"] as const);
    const g = deuxSegmentsGrille(rel === "par" ? "par" : "ni");
    const [A, B, C, D] = lettres(4);
    const q = un([`Les droites (${A}${B}) et (${C}${D}) sont-elles parallèles ?`, "Si on prolonge ces segments, obtient-on deux droites parallèles ?", "Ces deux segments sont-ils portés par des droites parallèles ?"]);
    return {
      text: `${cadreGrille(`les segments [${A}${B}] et [${C}${D}]`)} Ils ne se touchent pas. ${q}`,
      ...qcm(rel === "par" ? "oui, elles sont parallèles" : "non : prolongées, elles finiraient par se couper", ["oui, elles sont parallèles", "non : prolongées, elles finiraient par se couper", "on ne peut pas savoir : les segments ne se touchent pas"]),
      explanation: rel === "par" ? "Sur le quadrillage, les deux segments avancent du même nombre de carreaux dans le même sens : leurs droites sont parallèles." : "Les deux segments n'avancent pas de la même façon sur le quadrillage : prolongés, ils se couperaient.",
      canvas: segmentsGrille(g, [A, B, C, D]),
    };
  }),

  PAR(110, 3, "La couleur, la longueur ou la position (verticale, penchée) ne comptent pas : seul l'écart compte.", (): Gen => {
    const n = un(NOMS);
    const [a, b] = un(NOMS_DROITES);
    const cas = un([
      { rel: "presque" as Rel, ang: un(ANGLES), dit: `${a} et ${b} sont parallèles, car elles ne se touchent pas sur le dessin.`, juste: `${n} a tort : l'écart change, prolongées elles se couperaient`, faux: [`${n} a raison`, `${n} a tort : des parallèles doivent être horizontales`] },
      { rel: "par" as Rel, ang: un(ANGLES_PENCHES), cl: true, dit: `${a} et ${b} ne sont pas parallèles, car elles n'ont pas la même couleur.`, juste: `${n} a tort : la couleur ne compte pas, l'écart reste le même`, faux: [`${n} a raison`, `${n} a tort : elles sont perpendiculaires`] },
      { rel: "par" as Rel, ang: 90, dit: `${a} et ${b} ne peuvent pas être parallèles, car elles sont verticales.`, juste: `${n} a tort : des droites verticales peuvent être parallèles`, faux: [`${n} a raison`, `${n} a tort : elles se coupent en angle droit`] },
      { rel: "par" as Rel, ang: un(ANGLES_PENCHES), dit: `${a} et ${b} sont parallèles, car l'écart reste le même partout.`, juste: `${n} a raison`, faux: [`${n} a tort : elles sont penchées`, `${n} a tort : il faudrait qu'elles se coupent`] },
      { rel: "sec" as Rel, ang: un(ANGLES_PENCHES), dit: `${a} et ${b} sont parallèles, car elles sont toutes les deux penchées.`, juste: `${n} a tort : elles se coupent, donc elles ne sont pas parallèles`, faux: [`${n} a raison`, `${n} a tort : elles sont perpendiculaires`] },
    ]);
    const intro = un([`${n} regarde la figure et dit :`, `En corrigeant son exercice, ${n} affirme :`, `Pendant la leçon, ${n} explique :`, `Au tableau, ${n} déclare :`]);
    const q = un(["Qu'en penses-tu ?", "Que réponds-tu ?", "Que dis-tu de son idée ?"]);
    const couleurs: [string, string] | undefined = "cl" in cas ? [COUL[0], COUL[2]] : undefined;
    return {
      text: `${intro} « ${cas.dit} » ${q}`,
      ...qcm(cas.juste, cas.faux),
      explanation: "Deux droites sont parallèles quand l'écart reste le même partout : elles ne se coupent jamais. La couleur et la position ne comptent pas.",
      canvas: paire(cas.rel, [a, b], { angle: cas.ang, couleurs }),
    };
  }),

  PAR(111, 3, "Prends les côtés deux par deux : lesquels gardent le même écart ?", (): Gen => {
    const f = un(FORMES);
    const o = un(f.objets);
    const q = un(["Combien de paires de côtés parallèles cette figure a-t-elle ?", "Combien de paires de côtés parallèles compte-t-on ?", "Combien trouve-t-on de paires de côtés parallèles ?"]);
    const p = (k: number) => (k === 0 ? "aucune paire" : `${k} paire${k > 1 ? "s" : ""}`);
    return {
      text: `${un(INTROS_FORME)(o)} ${q}`,
      ...qcm(p(f.par), [0, 1, 2, 3, 4].map(p)),
      explanation: `${cap(f.nom)} : ${p(f.par)} de côtés parallèles. ${f.pourquoiPar}`,
      canvas: polygone(f.pts, un([0, 0, 8, -10])),
    };
  }),

  /* ═════════════ DROITE_PERPENDICULAIRE ★1 ═════════════ */
  PERP(101, 1, "Perpendiculaires : elles se coupent en formant un angle droit (le petit carré).", (): Gen => {
    const rel = un(["perp", "perp", "sec", "par"] as const);
    const [a, b] = un(NOMS_DROITES);
    const q = un([`Les droites ${a} et ${b} sont-elles perpendiculaires ?`, `${a} et ${b} sont-elles perpendiculaires ?`, "Ces deux droites sont-elles perpendiculaires ?", `Peut-on dire que ${a} et ${b} sont perpendiculaires ?`]);
    const J: Record<string, string> = { perp: "oui, elles sont perpendiculaires", sec: "non, elles se coupent sans faire d'angle droit", par: "non, elles sont parallèles" };
    return {
      text: `${cadre("ces deux droites")} ${q}`,
      ...qcm(J[rel], Object.values(J)),
      explanation: rel === "perp" ? "Elles se coupent en formant un angle droit (le petit carré) : elles sont perpendiculaires." : rel === "sec" ? "Elles se coupent, mais l'angle n'est pas droit : pas perpendiculaires." : "Elles ne se coupent jamais : elles sont parallèles, pas perpendiculaires.",
      canvas: paire(rel, [a, b]),
    };
  }),

  PERP(102, 1, "Imagine les deux lignes : se croisent-elles en formant un coin carré ?", (): Gen => {
    const v = tirerVie({ par: 2, perp: 6, sec: 2 });
    return {
      text: un(TOURN_VIE)(v.s),
      ...qcm(MOT_REL[v.rel], Object.values(MOT_REL)),
      explanation: EXPLI_REL[v.rel],
    };
  }),

  PERP(103, 1, "Perpendiculaire = un angle droit au croisement, quelle que soit la position.", (): Gen => {
    const perp = Math.random() < 0.75;
    const def = un(
      perp
        ? ["Deux droites qui se coupent en formant un angle droit sont…", "Deux droites qui se croisent comme les bords d'un coin de feuille sont…", "Deux droites qui forment quatre angles droits en se coupant sont…", "Des droites comme les deux traits du signe plus (+) sont…", "Deux droites qui se coupent en faisant un coin carré, comme l'équerre, sont…"]
        : ["Deux droites qui ne se coupent jamais, même si on les prolonge, sont…", "Deux droites qui gardent toujours le même écart sont…"],
    );
    const f = un(["Le maître demande : ", "Dans le manuel, on lit : ", "Question du quiz de géométrie : ", "Défi du jour : ", "Carte du jeu de l'oie : ", `Devinette ${deN()} : `]);
    return {
      text: `${f}« ${def} »`,
      ...qcm(perp ? "perpendiculaires" : "parallèles", ["parallèles", "perpendiculaires", "verticales", "horizontales"]),
      explanation: perp ? "Un angle droit au croisement : perpendiculaires. Une droite penchée peut être perpendiculaire à une autre : ce n'est pas « verticale »." : "Jamais de croisement, même écart partout : parallèles.",
      canvas: paire(perp ? "perp" : "par", un(NOMS_DROITES), { angle: un(ANGLES_PENCHES) }),
    };
  }),

  PERP(104, 1, "Le petit carré au croisement est le codage de l'angle droit.", (): Gen => {
    const q = un(["Que veut dire le petit carré dessiné à leur croisement ?", "Que signifie le petit carré codé sur la figure ?", "Que nous apprend le petit carré dessiné au croisement ?"]);
    return {
      text: `${cadre("ces deux droites")} ${q}`,
      ...qcm("les deux droites forment un angle droit", ["les deux droites sont parallèles", "le croisement est le milieu des droites", "les deux droites sont verticales"]),
      explanation: "Le petit carré code un angle droit : les deux droites sont perpendiculaires.",
      canvas: paire("perp", un(NOMS_DROITES)),
    };
  }),

  /* ═════════════ DROITE_PERPENDICULAIRE ★2 ═════════════ */
  PERP(105, 2, "Perpendiculaire ne veut pas dire verticale : regarde l'angle au croisement.", (): Gen => {
    const [a, b] = un(NOMS_DROITES);
    const cas = un(["penche", "penche", "verticale", "hv"] as const);
    const q = un([`${a} et ${b} sont-elles perpendiculaires ?`, `Les droites ${a} et ${b} sont-elles perpendiculaires ?`, "Ces deux droites sont-elles perpendiculaires ?"]);
    if (cas === "penche") {
      return {
        text: `${cadre("ces deux droites")} Aucune des deux n'est verticale. ${q}`,
        ...qcm("oui : elles se coupent en formant un angle droit", ["non, car aucune n'est verticale", "non, car elles sont penchées", "on ne peut pas savoir sans droite horizontale"]),
        explanation: "Le codage montre un angle droit : elles sont perpendiculaires, même penchées. Perpendiculaire ne veut pas dire verticale.",
        canvas: paire("perp", [a, b], { angle: un(ANGLES_PENCHES) }),
      };
    }
    if (cas === "verticale") {
      return {
        text: `${cadre("ces deux droites")} La droite ${a} est verticale. ${q}`,
        ...qcm("non : l'angle entre elles n'est pas droit", [`oui, car ${a} est verticale`, "oui, car elles se coupent", "oui, car elles se croisent au milieu"]),
        explanation: `${a} est verticale, mais ${b} la coupe en biais : l'angle n'est pas droit, elles ne sont pas perpendiculaires.`,
        canvas: paire("sec", [a, b], { angle: 90, phi: un([50, 60, 120, 130]) }),
      };
    }
    return {
      text: `${cadre("ces deux droites")} ${a} est horizontale et ${b} verticale. ${q}`,
      ...qcm("oui : elles se coupent en formant un angle droit", ["non, car elles n'ont pas la même couleur", "non, il faudrait qu'elles soient toutes les deux penchées", "non, car elles se coupent"]),
      explanation: "Une horizontale et une verticale se coupent en angle droit : elles sont perpendiculaires.",
      canvas: paire("perp", [a, b], { angle: 0 }),
    };
  }),

  PERP(106, 2, "Pose ton équerre au croisement : quelle droite fait un coin carré avec elle ?", (): Gen => {
    const noms = melange(["(d)", "(e)", "(f)", "(g)"]) as [string, string, string, string];
    const q = un([(x: string) => `Quelle droite est perpendiculaire à ${x} ?`, (x: string) => `Parmi les autres droites, laquelle est perpendiculaire à ${x} ?`, (x: string) => `Trouve la droite qui coupe ${x} en formant un angle droit.`]);
    return {
      text: `${cadre("ces quatre droites")} ${q(noms[0])}`,
      ...qcm(noms[2], [noms[1], noms[3], "aucune"]),
      explanation: `${noms[2]} coupe ${noms[0]} en formant un angle droit. ${noms[1]} lui est parallèle, ${noms[3]} la coupe en biais.`,
      canvas: plan4(noms, un(ANGLES)),
    };
  }),

  PERP(107, 2, "Cherche deux lignes qui se croisent en formant un coin carré.", (): Gen => {
    const juste = un(vie("perp")).s;
    const faux = [...melange(vie("par")).slice(0, 2), ...melange(vie("sec")).slice(0, 2)].map((v) => cap(v.s));
    const intro = un([`En se promenant, ${un(NOMS)} observe plusieurs choses.`, `Pour son exposé, ${un(NOMS)} cherche des exemples.`, "Le maître pose une devinette.", ""]);
    const q = un(["Lequel de ces exemples montre deux droites perpendiculaires ?", "Où peut-on voir deux droites perpendiculaires ?", "Quel exemple fait penser à des droites perpendiculaires ?", "Dans quel cas les deux lignes se croisent-elles en angle droit ?"]);
    return {
      text: `${intro} ${q}`.trim(),
      ...qcm(cap(juste), faux),
      explanation: `${cap(juste)} se croisent en formant un angle droit : ce sont des droites perpendiculaires.`,
    };
  }),

  PERP(112, 2, "La distance d'un point à une droite se mesure sur la PERPENDICULAIRE : c'est le plus court chemin.", (): Gen => {
    const [A, H, K, L] = lettres(4);
    const s = un(DISTANCE_VIE);
    const q = un([`Quel segment montre ${s.q} ?`, `Sur quel segment faut-il mesurer pour trouver ${s.q} ?`, "Quel segment donne la distance du point à la droite (d) ?"]);
    return {
      text: `${s.t(A)} ${q}`,
      ...qcm(`[${A}${H}]`, [`[${A}${K}]`, `[${A}${L}]`, "les trois : ce sont toutes des distances"]),
      explanation: `[${A}${H}] est perpendiculaire à (d) (le petit carré) : c'est le chemin le plus court, il mesure la distance de ${A} à (d).`,
      canvas: cheminsVersDroite(A, [H, K, L], [un([2.5, 3, 3.5]), un([2, 3, 4])], null, un([0, 0, 10, -12, 180])),
    };
  }),

  /* ═════════════ DROITE_PERPENDICULAIRE ★3 ═════════════ */
  PERP(108, 3, "Sur le plan, cherche la voie qui croise l'autre en faisant un coin carré.", (): Gen => {
    const c = un([
      { t: `Sur le plan du quartier ${deN()}, on voit quatre rues.`, v: "rue", f: true },
      { t: "Sur le plan de la ville, quatre avenues sont dessinées.", v: "avenue", f: true },
      { t: "Sur le plan du camping, quatre allées sont tracées.", v: "allée", f: true },
      { t: "Sur le plan du parc, quatre chemins sont dessinés.", v: "chemin", f: false },
      { t: "Dans un jeu vidéo, quatre routes traversent la ville.", v: "route", f: true },
      { t: "Sur le plan du village, le facteur repère quatre rues.", v: "rue", f: true },
      { t: "Sur la carte de la zone commerciale, quatre voies sont dessinées.", v: "voie", f: true },
      { t: "Sur le plan de la ferme, quatre chemins relient les champs.", v: "chemin", f: false },
    ]);
    const lieux = melange([
      ["des Lilas", "Lilas"], ["des Pins", "Pins"], ["de la Gare", "Gare"], ["du Port", "Port"], ["du Moulin", "Moulin"], ["des Roses", "Roses"],
      ["du Pont", "Pont"], ["de l'École", "École"], ["de la Mer", "Mer"], ["des Fleurs", "Fleurs"], ["du Parc", "Parc"], ["de la Forge", "Forge"],
    ]).slice(0, 4);
    const le = /^[aeéiou]/.test(c.v) ? "l'" : c.f ? "la " : "le ";
    const nom = (i: number) => `${le}${c.v} ${lieux[i][0]}`;
    const a0 = le === "le " ? `au ${c.v} ${lieux[0][0]}` : `à ${nom(0)}`;
    const q = un([`Quel${c.f ? "le" : ""} ${c.v} est perpendiculaire ${a0} ?`, `Quel${c.f ? "le" : ""} ${c.v} croise ${nom(0)} en formant un angle droit ?`, `Au carrefour, quel${c.f ? "le" : ""} ${c.v} fait un coin carré avec ${nom(0)} ?`]);
    return {
      text: `${c.t} ${q}`,
      ...qcm(nom(2), [nom(1), nom(3), "aucune : aucun croisement n'est en angle droit"]),
      explanation: `${cap(nom(2))} croise ${nom(0)} en angle droit : perpendiculaires. ${cap(nom(1))} est parallèle, ${nom(3)} croise en biais.`,
      canvas: plan4(lieux.map((l) => l[1]) as [string, string, string, string], un(ANGLES_PENCHES)),
    };
  }),

  PERP(109, 3, "Pose l'équerre sur le quadrillage : les droites prolongées feraient-elles un angle droit ?", (): Gen => {
    const rel = un(["perp", "perp", "ni"] as const);
    const g = deuxSegmentsGrille(rel);
    const [A, B, C, D] = lettres(4);
    const q = un([`Les droites (${A}${B}) et (${C}${D}) sont-elles perpendiculaires ?`, "Si on prolonge ces segments, obtient-on deux droites perpendiculaires ?", "Ces deux segments sont-ils portés par des droites perpendiculaires ?"]);
    return {
      text: `${cadreGrille(`les segments [${A}${B}] et [${C}${D}]`)} Ils ne se touchent pas. ${q}`,
      ...qcm(rel === "perp" ? "oui : prolongées, elles se couperaient en angle droit" : "non : prolongées, elles se couperaient sans angle droit", ["oui : prolongées, elles se couperaient en angle droit", "non : prolongées, elles se couperaient sans angle droit", "on ne peut pas savoir : les segments ne se touchent pas"]),
      explanation: rel === "perp" ? "Sur le quadrillage, un segment avance de « a à droite, b en haut », l'autre de « b à gauche, a en haut » (ou l'inverse) : c'est un angle droit." : "Les pas sur le quadrillage ne forment pas un angle droit : les droites se couperaient en biais.",
      canvas: segmentsGrille(g, [A, B, C, D]),
    };
  }),

  PERP(110, 3, "Se couper ne suffit pas : il faut un angle droit. Et la position (verticale, penchée) ne compte pas.", (): Gen => {
    const n = un(NOMS);
    const [a, b] = un(NOMS_DROITES);
    const cas = un([
      { rel: "sec" as Rel, ang: un(ANGLES), dit: `${a} et ${b} sont perpendiculaires, car elles se coupent.`, juste: `${n} a tort : se couper ne suffit pas, il faut un angle droit`, faux: [`${n} a raison`, `${n} a tort : elles sont parallèles`] },
      { rel: "perp" as Rel, ang: un(ANGLES_PENCHES), dit: `${a} et ${b} ne sont pas perpendiculaires, car aucune n'est verticale.`, juste: `${n} a tort : elles forment un angle droit, même penchées`, faux: [`${n} a raison`, `${n} a tort : elles sont parallèles`] },
      { rel: "sec" as Rel, ang: 90, dit: `${a} et ${b} sont perpendiculaires, car ${a} est verticale.`, juste: `${n} a tort : l'angle entre elles n'est pas droit`, faux: [`${n} a raison`, `${n} a tort : elles ne se coupent pas`] },
      { rel: "perp" as Rel, ang: un(ANGLES), dit: `${a} et ${b} sont perpendiculaires, car elles se coupent en formant un angle droit.`, juste: `${n} a raison`, faux: [`${n} a tort : il faudrait qu'une droite soit verticale`, `${n} a tort : elles sont parallèles`] },
      { rel: "par" as Rel, ang: un(ANGLES_PENCHES), dit: `${a} et ${b} sont perpendiculaires, car elles ont la même direction.`, juste: `${n} a tort : même direction, ce sont des parallèles`, faux: [`${n} a raison`, `${n} a tort : elles se coupent en biais`] },
    ]);
    const intro = un([`${n} regarde la figure et dit :`, `En corrigeant son exercice, ${n} affirme :`, `Pendant la leçon, ${n} explique :`, `Au tableau, ${n} déclare :`]);
    const q = un(["Qu'en penses-tu ?", "Que réponds-tu ?", "Que dis-tu de son idée ?"]);
    return {
      text: `${intro} « ${cas.dit} » ${q}`,
      ...qcm(cas.juste, cas.faux),
      explanation: "Deux droites sont perpendiculaires quand elles se coupent en formant un angle droit, quelle que soit leur position.",
      canvas: paire(cas.rel, [a, b], { angle: cas.ang, phi: cas.ang === 90 ? un([50, 60, 120, 130]) : undefined }),
    };
  }),

  PERP(111, 3, "Repère chaque coin : est-ce un coin carré, comme celui de l'équerre ?", (): Gen => {
    const f = un(FORMES);
    const o = un(f.objets);
    const q = un(["Combien d'angles droits cette figure a-t-elle ?", "Combien de coins forment un angle droit ?", "Combien de coins carrés compte-t-on sur cette figure ?"]);
    const p = (k: number) => (k === 0 ? "aucun" : String(k));
    return {
      text: `${un(INTROS_FORME)(o)} ${q}`,
      ...qcm(p(f.droits), [0, 1, 2, 3, 4].map(p)),
      explanation: `${cap(f.nom)} : ${f.droits === 0 ? "aucun angle droit" : `${f.droits} angle${f.droits > 1 ? "s" : ""} droit${f.droits > 1 ? "s" : ""}`}. ${f.pourquoiDroits}`,
      canvas: polygone(f.pts, un([0, 0, 8, -10])),
    };
  }),

  PERP(113, 3, "La distance au point, c'est la longueur du segment PERPENDICULAIRE : le plus court des chemins.", (): Gen => {
    const [A, H, K, L] = lettres(4);
    const s = un(DISTANCE_VIE);
    const h = s.u === "cm" ? dec(s.min * 10, s.max * 10) : entre(s.min, s.max);
    const dx0 = un([2, 2.5, 3, 3.5]);
    const dx: [number, number] = [dx0, un([1.5, 3, 4.5].filter((x) => Math.abs(x - dx0) >= 1))];
    const k = h / 3;
    const arr = (x: number) => (s.u === "cm" || s.u === "km" ? Math.round(x * 10) / 10 : Math.round(x));
    const lK = arr(k * Math.hypot(3, dx[0]));
    const lL = arr(k * Math.hypot(3, dx[1]));
    const T = (x: number) => `${fr(x)} ${s.u}`;
    const q = un([`Quelle est ${s.q} ?`, `Quelle est la distance du point ${A} à la droite (d) ?`, `Combien mesure ${s.q} ?`]);
    return {
      text: `${s.t(A)} On a mesuré trois chemins : ${A}${H} = ${T(h)}, ${A}${K} = ${T(lK)} et ${A}${L} = ${T(lL)}. ${q}`,
      ...qcm(T(h), [T(lK), T(lL), T(arr(h + lK + lL)), T(arr((h + lK + lL) / 3))]),
      explanation: `[${A}${H}] est perpendiculaire à (d) : c'est le plus court chemin. La distance de ${A} à (d) est ${T(h)}.`,
      canvas: cheminsVersDroite(A, [H, K, L], dx, [T(h), T(lK), T(lL)], un([0, 0, 8, -10])),
    };
  }),

  /* ═════════════ DROITE_TRACER ★2 ═════════════ */
  TRA(101, 2, "La règle trace des traits droits ; l'équerre donne l'angle droit.", (): Gen => {
    const t = un([
      { t: "tracer la droite qui passe par deux points", j: "la règle", f: ["le compas", "à main levée, sans instrument"] },
      { t: "prolonger un segment pour obtenir une droite", j: "la règle", f: ["le compas", "à main levée, sans instrument"] },
      { t: "tracer une droite perpendiculaire à une autre", j: "l'équerre", f: ["le compas", "la règle seule", "à main levée, sans instrument"] },
      { t: "vérifier qu'un coin forme un angle droit", j: "l'équerre", f: ["le compas", "la règle seule", "à l'œil, sans instrument"] },
      { t: "vérifier que deux droites sont perpendiculaires", j: "l'équerre", f: ["le compas", "la règle seule", "à l'œil, sans instrument"] },
      { t: "tracer une parallèle à une droite", j: "la règle et l'équerre", f: ["le compas seul", "la règle seule, sans rien mesurer", "à main levée, sans instrument"] },
      { t: "mesurer la distance d'un point à une droite", j: "l'équerre puis la règle graduée", f: ["la règle graduée seule, en biais", "le compas seul", "à l'œil, sans instrument"] },
    ]);
    const a = un([
      { q: un(NOMS), sur: "dans son cahier" },
      { q: "le menuisier", sur: "sur une planche" },
      { q: "la couturière", sur: "sur un tissu" },
      { q: "le carreleur", sur: "sur le sol de la salle de bains" },
      { q: "l'architecte", sur: "sur le plan d'une maison" },
      { q: "le maître", sur: "au tableau" },
      { q: "la géomètre", sur: "sur le plan d'un terrain" },
      { q: "le peintre", sur: "sur un mur" },
      { q: un(NOMS), sur: "sur son ardoise" },
      { q: "la dessinatrice de BD", sur: "sur sa planche de dessin" },
      { q: "le maçon", sur: "sur un mur en construction" },
      { q: "l'électricienne", sur: "sur le mur de la cuisine" },
    ]);
    const q = un(["Quel instrument faut-il utiliser ?", "Quel est le bon instrument ?", "Avec quoi faut-il travailler ?"]);
    return {
      text: `${cap(a.q)} veut ${t.t} ${a.sur}. ${q}`,
      ...qcm(t.j, t.f),
      explanation: t.j === "la règle" ? "Pour un trait bien droit, on utilise la règle." : t.j === "l'équerre" ? "L'équerre a un angle droit : elle sert à tracer et à vérifier les angles droits." : t.j === "l'équerre puis la règle graduée" ? "La distance se mesure sur la perpendiculaire : l'équerre la donne, la règle la mesure." : "Pour une parallèle, on fait glisser l'équerre le long de la règle (ou on trace deux perpendiculaires).",
      canvas: paire(t.j === "la règle" ? "sec" : t.j === "la règle et l'équerre" ? "par" : "perp", un(NOMS_DROITES), { angle: un(ANGLES) }),
    };
  }),

  TRA(102, 2, "Deux conditions : un angle droit avec (d), ET passer par le point.", (): Gen => {
    const A = un(LETTRES);
    const noms = melange(["(e)", "(f)", "(g)"]);
    const ang = un([...ANGLES_PENCHES, 0]);
    const intro = un([`Sur son cahier, ${un(NOMS)} a essayé trois tracés.`, "Au tableau, trois élèves ont tracé chacun une droite.", "Sur le plan, l'architecte a dessiné trois traits au crayon.", "Sur sa planche, le menuisier a tracé trois traits.", "Sur le sol du gymnase, la professeure de sport a tracé trois lignes.", "Dans le jeu de géométrie, trois droites sont proposées."]);
    const q = un([`Laquelle est la perpendiculaire à (d) passant par ${A} ?`, `Quelle droite est perpendiculaire à (d) et passe par ${A} ?`, `Quelle droite faut-il garder pour avoir la perpendiculaire à (d) passant par ${A} ?`]);
    return {
      text: `${intro} ${q}`,
      ...qcm(noms[0], [noms[1], noms[2], "aucune des trois"]),
      explanation: `${noms[0]} coupe (d) en angle droit ET passe par ${A}. ${noms[1]} est perpendiculaire mais ne passe pas par ${A} ; ${noms[2]} passe par ${A} sans angle droit.`,
      canvas: candidats(["perpA", "perpNon", "oblA"], ["(d)", ...noms], A, ang),
    };
  }),

  TRA(103, 2, "L'équerre : un côté de l'angle droit sur (d), on glisse jusqu'au point, on trace, on code.", (): Gen => {
    const A = un(LETTRES);
    const E = [
      "placer un côté de l'angle droit de l'équerre le long de la droite (d)",
      `faire glisser l'équerre le long de (d) jusqu'à ce que l'autre côté touche ${A}`,
      `tracer la droite le long de ce côté de l'équerre, en passant par ${A}`,
      "coder l'angle droit avec un petit carré",
    ];
    const k = entre(0, 3);
    const intro = un([
      `${un(NOMS)} veut tracer la perpendiculaire à (d) passant par ${A}.`,
      `Le menuisier veut tracer sur une planche un trait perpendiculaire au bord (d), passant par le point ${A}.`,
      `Le maître montre comment tracer la perpendiculaire à (d) passant par ${A}.`,
      `Pour le plan d'une rue, l'architecte trace la perpendiculaire à (d) passant par ${A}.`,
      `Le carreleur doit tracer un joint perpendiculaire à la ligne (d), passant par ${A}.`,
      `Dans son cahier, ${un(NOMS)} trace la droite perpendiculaire à (d) qui passe par ${A}.`,
    ]);
    const q = k === 0 ? un(["Quelle est la première étape ?", "Par quoi commence-t-on ?"]) : k === 3 && Math.random() < 0.5 ? "Quelle est la dernière étape ?" : `Après « ${E[k - 1]} », que fait-on ?`;
    return {
      text: `${intro} ${q}`,
      ...qcm(cap(E[k]), [...E.filter((_, i) => i !== k && i !== k - 1), `tracer un cercle de centre ${A} avec le compas`, "mesurer la longueur de (d)"].map(cap)),
      explanation: `L'ordre : 1) un côté de l'angle droit sur (d) ; 2) glisser jusqu'à ${A} ; 3) tracer ; 4) coder l'angle droit.`,
      canvas: schema([{ nom: "(d)", a: { x: 0, y: 0 }, b: { x: 10, y: 0 }, couleur: COUL[0] }], { angle: un(ANGLES), points: [{ p: { x: 4, y: 3 }, nom: A }] }),
    };
  }),

  TRA(104, 2, "Deux conditions : le même écart avec (d) partout, ET passer par le point.", (): Gen => {
    const A = un(LETTRES);
    const noms = melange(["(e)", "(f)", "(g)"]);
    const intro = un([`Sur son cahier, ${un(NOMS)} a essayé trois tracés.`, "Au tableau, trois élèves ont tracé chacun une droite.", "Sur le plan d'un potager, le jardinier a tendu trois ficelles.", "Sur sa planche, le menuisier a tracé trois traits.", "Sur le plan d'un stade, la géomètre a tracé trois lignes.", "Dans le jeu de géométrie, trois droites sont proposées."]);
    const q = un([`Laquelle est la parallèle à (d) passant par ${A} ?`, `Quelle droite est parallèle à (d) et passe par ${A} ?`, `Quelle droite faut-il garder pour avoir la parallèle à (d) passant par ${A} ?`]);
    const trois = un([["parA", "parNon", "presqueA"], ["parA", "parNon", "perpA"], ["parA", "presqueA", "perpA"]] as const);
    return {
      text: `${intro} ${q}`,
      ...qcm(noms[0], [noms[1], noms[2], "aucune des trois"]),
      explanation: `${noms[0]} garde le même écart avec (d) ET passe par ${A}.`,
      canvas: candidats([...trois], ["(d)", ...noms], A, un(ANGLES)),
    };
  }),

  TRA(105, 2, "Vérifie les deux conditions : l'angle droit avec (d), et le passage par le point.", (): Gen => {
    const A = un(LETTRES);
    const cas = un(["ok", "angle", "passePas"] as const);
    const intro = un([
      `${un(NOMS)} devait tracer la perpendiculaire à (d) passant par ${A}. Voici son tracé (e).`,
      `Le menuisier devait tracer un trait (e) perpendiculaire au bord (d), passant par le clou ${A}.`,
      `Pour un exercice, ${un(NOMS)} a tracé la droite (e), qui devait être perpendiculaire à (d) et passer par ${A}.`,
      `Au tableau, ${un(NOMS)} a tracé (e) : la consigne demandait la perpendiculaire à (d) passant par ${A}.`,
      `Sur le plan d'un jardin, la paysagiste devait tracer l'allée (e) perpendiculaire à l'allée (d), passant par la fontaine ${A}.`,
    ]);
    const q = un(["Que penses-tu de ce tracé ?", "Le tracé est-il correct ?", "Qu'en dis-tu ?"]);
    const J = { ok: "le tracé est juste", angle: "le tracé est faux : l'angle n'est pas droit", passePas: `le tracé est faux : la droite ne passe pas par ${A}` };
    return {
      text: `${intro} ${q}`,
      ...qcm(J[cas], [...Object.values(J), "le tracé est faux : la droite devrait être verticale"]),
      explanation: cas === "ok" ? `(e) coupe (d) en angle droit et passe par ${A} : c'est juste, même si elle n'est pas verticale.` : cas === "angle" ? "(e) passe par le point, mais l'angle avec (d) n'est pas droit : il fallait utiliser l'équerre." : `(e) fait bien un angle droit avec (d), mais elle ne passe pas par ${A}.`,
      canvas: candidats([cas === "ok" ? "perpA" : cas === "angle" ? "oblA" : "perpNon"], ["(d)", "(e)"], A, un(ANGLES_PENCHES)),
    };
  }),

  /* ═════════════ DROITE_TRACER ★3 ═════════════ */
  TRA(106, 3, "La parallèle avance EXACTEMENT comme (d) sur le quadrillage.", (): Gen => gabaritGrilleTrace("par")),
  TRA(107, 3, "Pour la perpendiculaire, on échange les deux nombres de carreaux et on change un sens.", (): Gen => gabaritGrilleTrace("perp")),

  TRA(108, 3, "Une droite se trace avec deux points : il en faut deux au même écart.", (): Gen => {
    const sit = un([
      { u: "cm", min: 250, max: 400, t: (e: string) => `Le menuisier veut fixer une deuxième étagère parallèle à la première, ${e} cm plus haut. Il fait deux marques à ${e} cm de la première étagère, à deux endroits, puis il les relie à la règle.` },
      { u: "cm", min: 200, max: 500, t: (e: string) => `Le jardinier veut une rangée de salades parallèle à la première. Il plante deux piquets à ${e} cm de la première rangée, à deux endroits, puis il tend une ficelle entre eux.` },
      { u: "cm", min: 50, max: 200, t: (e: string) => `La peintre veut peindre une bande parallèle au bord du mur. Elle fait deux points à ${e} cm du bord, à deux endroits, puis elle les relie.` },
      { u: "cm", min: 20, max: 60, t: (e: string) => `Sur son cahier, ${un(NOMS)} marque deux points à ${e} cm de la droite (d), à deux endroits, puis les relie à la règle pour obtenir une parallèle.` },
      { u: "m", min: 20, max: 90, t: (e: string) => `Le traceur du stade doit peindre une ligne parallèle à la ligne de touche, à ${e} m. Il marque deux points à ${e} m de la ligne de touche, à deux endroits, puis il les relie.` },
      { u: "cm", min: 10, max: 40, t: (e: string) => `La couturière veut une couture parallèle au bord du tissu. Elle marque deux points à ${e} cm du bord, à deux endroits, puis elle les relie à la craie.` },
      { u: "cm", min: 100, max: 300, t: (e: string) => `Le carreleur veut une rangée de carreaux parallèle au mur. Il trace deux marques à ${e} cm du mur, à deux endroits, puis il les relie.` },
      { u: "m", min: 20, max: 50, t: (e: string) => `Pour le parking, l'ouvrière veut peindre une ligne parallèle au trottoir. Elle marque deux points à ${e} m du trottoir, à deux endroits, puis elle les relie.` },
    ]);
    const e = dec(sit.min, sit.max);
    const type = Math.random() < 0.6;
    const q = type ? un(["Pourquoi mesure-t-on à deux endroits ?", "Pourquoi faut-il deux marques ?", "À quoi servent les deux mesures ?"]) : un(["Que se passerait-il si les deux marques n'étaient pas au même écart ?", "Et si la deuxième marque était plus près que la première ?"]);
    return {
      text: `${sit.t(fr(e))} ${q}`,
      ...(type
        ? qcm("pour avoir deux points au même écart, et tracer la ligne qui les relie", ["pour que la nouvelle ligne coupe la première en angle droit", "parce qu'une seule mesure donnerait une ligne plus courte", "pour vérifier que la règle est bien droite"])
        : qcm("la ligne ne serait pas parallèle : elle se rapprocherait de la première", ["la ligne serait perpendiculaire à la première", "la ligne serait quand même parallèle", "la ligne serait seulement plus longue"])),
      explanation: "Une droite est fixée par deux points. Deux points au même écart de la première ligne donnent une parallèle.",
      canvas: schema(
        [
          { a: { x: 0, y: 0 }, b: { x: 10, y: 0 }, couleur: COUL[0] },
          { a: { x: 0, y: 2.5 }, b: { x: 10, y: 2.5 }, couleur: COUL[1], pointille: true },
        ],
        { mesures: [{ a: { x: 2, y: 0 }, b: { x: 2, y: 2.5 }, texte: `${fr(e)} ${sit.u}` }, { a: { x: 8, y: 0 }, b: { x: 8, y: 2.5 }, texte: `${fr(e)} ${sit.u}` }], angle: un([0, 0, 90, 12, -15]) },
      ),
    };
  }),

  TRA(109, 3, "Vérifie le programme mot à mot : la bonne position ET le bon point.", (): Gen => {
    const [A] = lettres(1);
    const par = Math.random() < 0.5;
    const cas = un(par ? (["parA", "parNon", "presqueA"] as const) : (["perpA", "perpNon", "oblA"] as const));
    const prog = par ? `« Trace la parallèle à (d) passant par ${A}. »` : `« Trace la perpendiculaire à (d) passant par ${A}. »`;
    const intro = un([`${un(NOMS)} a suivi ce programme de construction : ${prog}`, `La consigne de l'exercice est : ${prog}`, `Sur la fiche ${deN()}, on lit : ${prog}`, `L'architecte a demandé à son apprenti : ${prog}`]);
    const q = un(["Voici le tracé obtenu, la droite (e). Est-il correct ?", "Le résultat est la droite (e). Qu'en penses-tu ?", "La droite (e) a été tracée. Le tracé respecte-t-il le programme ?"]);
    const J: Record<string, string> = par
      ? { parA: "oui, le tracé est juste", parNon: `non : la droite ne passe pas par ${A}`, presqueA: "non : l'écart avec (d) change, ce n'est pas une parallèle" }
      : { perpA: "oui, le tracé est juste", perpNon: `non : la droite ne passe pas par ${A}`, oblA: "non : l'angle avec (d) n'est pas droit" };
    return {
      text: `${intro} ${q}`,
      ...qcm(J[cas], [...Object.values(J), par ? "non : la droite devrait être horizontale" : "non : la droite devrait être verticale"]),
      explanation: par ? "Une parallèle à (d) passant par le point : même écart partout ET passage par le point." : "Une perpendiculaire à (d) passant par le point : angle droit ET passage par le point. Elle n'a pas à être verticale.",
      canvas: candidats([cas], ["(d)", "(e)"], A, un(ANGLES_PENCHES)),
    };
  }),

  TRA(110, 3, "Deux droites perpendiculaires à une même droite sont parallèles entre elles.", (): Gen => {
    const A = un(LETTRES);
    const intro = un([
      `Pour tracer la parallèle à (d) passant par ${A}, ${un(NOMS)} n'utilise que son équerre.`,
      `Le maître montre une méthode pour tracer la parallèle à (d) passant par ${A}.`,
      `Le menuisier veut un trait parallèle au bord (d) de la planche, passant par le point ${A}.`,
      `L'architecte veut tracer une rue parallèle à la rue (d), passant par ${A}.`,
      `Le jardinier veut une allée parallèle à l'allée (d), passant par le pommier ${A}.`,
    ]);
    const suite = Math.random() < 0.6;
    const base = `D'abord, on trace la perpendiculaire (p) à (d) passant par ${A}.`;
    return {
      text: suite ? `${intro} ${base} ${un(["Que faut-il faire ensuite ?", "Quelle est l'étape suivante ?"])}` : `${intro} ${base} Ensuite, on trace la perpendiculaire à (p) passant par ${A}. Pourquoi la droite obtenue est-elle parallèle à (d) ?`,
      ...(suite
        ? qcm(`tracer la perpendiculaire à (p) passant par ${A}`, [`tracer encore la perpendiculaire à (d) passant par ${A}`, `tracer la parallèle à (p) passant par ${A}`, "prolonger (p) jusqu'au bord de la feuille"])
        : qcm("parce qu'elle est perpendiculaire à (p), tout comme (d)", [`parce qu'elle passe par ${A}`, "parce qu'elle a la même longueur que (d)", "parce qu'elle est horizontale"])),
      explanation: "(d) et la nouvelle droite sont toutes les deux perpendiculaires à (p) : elles sont donc parallèles.",
      canvas: schema(
        [
          { nom: "(d)", a: { x: 0, y: 0 }, b: { x: 10, y: 0 }, couleur: COUL[0] },
          { nom: "(p)", a: { x: 4, y: -1.5 }, b: { x: 4, y: 5 }, couleur: COUL[1], lab: [0.02, 0.14] },
        ],
        { angle: un(ANGLES), points: [{ p: { x: 4, y: 3 }, nom: A }], droits: [[{ x: 4, y: 0 }, { x: 7, y: 0 }, { x: 4, y: 2 }]] },
      ),
    };
  }),

  /* ═════════════ DROITE_TRACER ★4 (CM2) ═════════════ */
  TRA(111, 4, "Suis le programme pas à pas : chaque « perpendiculaire » fait tourner d'un angle droit.", (): Gen => {
    const [A, B] = lettres(2);
    const e = dec(15, 65);
    const fin = un([
      { t: `Trace la droite (e), perpendiculaire à (p), passant par ${B}.` },
      { t: `Trace la droite (e), parallèle à (d), passant par ${B}.` },
    ]);
    const prog = `« Trace une droite (d). Place un point ${A} sur (d). Trace la perpendiculaire (p) à (d) passant par ${A}. Place le point ${B} sur (p), à ${fr(e)} cm de ${A}. ${fin.t} »`;
    const intro = un([`Voici le programme de construction ${deN()} :`, "Le maître dicte ce programme :", "Pour placer deux murs, l'architecte suit ce programme :", "Pour le plan d'un parking, la géomètre suit ce programme :", "Dans un jeu de géométrie, on lit :", "Sur la fiche d'exercices, on lit :", "Pour son robot dessinateur, l'ingénieure écrit :"]);
    const k = un([0, 1, 2]);
    const q = k === 0 ? "Comment sont les droites (d) et (e) ?" : k === 1 ? "Quelle est la distance entre les droites (d) et (e) ?" : `Quelle est la distance du point ${B} à la droite (d) ?`;
    return {
      text: `${intro} ${prog} ${q}`,
      ...(k === 0
        ? qcm("parallèles", ["perpendiculaires", "sécantes, sans angle droit", "on ne peut pas savoir sans tracer"])
        : qcmN(e, [e * 2, e / 2, e + 1], "cm", 0.5)),
      explanation: k === 0 ? "(d) et (e) sont toutes les deux perpendiculaires à (p) (ou (e) est tracée parallèle à (d)) : elles sont parallèles." : `${A}${B} est perpendiculaire à (d) et mesure ${fr(e)} cm : c'est la distance de ${B} à (d), et l'écart entre les parallèles (d) et (e).`,
      canvas: schema(
        [
          { nom: "(d)", a: { x: 0, y: 0 }, b: { x: 10, y: 0 }, couleur: COUL[0] },
          { nom: "(p)", a: { x: 4, y: -1.2 }, b: { x: 4, y: 4.6 }, couleur: COUL[1], lab: [0.86, 0.98] },
          { nom: "(e)", a: { x: 0, y: 3 }, b: { x: 10, y: 3 }, couleur: COUL[2], pointille: true },
        ],
        { angle: un(ANGLES), points: [{ p: { x: 4, y: 0 }, nom: A }, { p: { x: 4, y: 3 }, nom: B }], droits: [[{ x: 4, y: 0 }, { x: 6, y: 0 }, { x: 4, y: 1.6 }]] },
      ),
    };
  }),

  TRA(112, 4, "Pour placer un point à une distance donnée d'une droite, on mesure sur la perpendiculaire.", (): Gen => {
    const sit = un([
      { t: (e: string) => `Le menuisier veut fixer un crochet à ${e} cm du bord de l'étagère.`, u: "cm" },
      { t: (e: string) => `La peintre doit faire un point à ${e} cm du bord du mur.`, u: "cm" },
      { t: (e: string) => `Sur son cahier, ${un(NOMS)} doit placer un point à ${e} cm de la droite (d).`, u: "cm" },
      { t: (e: string) => `La géomètre doit planter un piquet à ${e} m de la route.`, u: "m" },
      { t: (e: string) => `Le jardinier veut planter un arbre à ${e} m de la clôture.`, u: "m" },
      { t: (e: string) => `L'électricienne veut placer une prise à ${e} cm du sol.`, u: "cm" },
      { t: (e: string) => `Le carreleur doit poser une marque à ${e} cm du mur.`, u: "cm" },
      { t: (e: string) => `Sur le terrain, l'arbitre place le ballon à ${e} m de la ligne de but.`, u: "m" },
      { t: (e: string) => `L'architecte doit dessiner une fenêtre à ${e} cm du bord du plan.`, u: "cm" },
      { t: (e: string) => `Le maçon veut sceller un anneau à ${e} cm du haut du mur.`, u: "cm" },
    ]);
    const e = dec(15, 95);
    const n1 = Math.random() < 0.5 ? 1 : 2;
    const n2 = 3 - n1;
    const typeFig = Math.random() < 0.5;
    const intro = sit.t(fr(e));
    const P = { x: 4, y: 3 };
    const oblique = { x: un([1, 1.5, 7, 7.5]), y: 0 };
    const fig = schema(
      [
        { nom: "(d)", a: { x: -0.5, y: 0 }, b: { x: 10, y: 0 }, couleur: "#0f172a" },
        { a: P, b: { x: 4, y: 0 }, segment: true, couleur: COUL[0], pointille: true, nom: typeFig ? `tracé ${n1}` : undefined, lab: [0.35, 0.5] },
        { a: P, b: oblique, segment: true, couleur: COUL[2], pointille: true, nom: typeFig ? `tracé ${n2}` : undefined, lab: [0.45, 0.6] },
      ],
      { angle: un([0, 0, 15, -15, 90]), droits: [[{ x: 4, y: 0 }, { x: 6, y: 0 }, { x: 4, y: 1.5 }]] },
    );
    if (typeFig) {
      const q = un([`Sur quel tracé faut-il mesurer les ${fr(e)} ${sit.u} ?`, "Quel tracé faut-il utiliser pour mesurer ?", "Lequel des deux tracés donne la bonne distance ?"]);
      return {
        text: `${intro} ${q}`,
        ...qcm(`le tracé ${n1} : il est perpendiculaire à la droite`, [`le tracé ${n2} : il est plus long, donc plus sûr`, "les deux tracés donnent la même distance", "aucun : il faut mesurer le long de la droite"]),
        explanation: `La distance à une droite se mesure sur la perpendiculaire (le petit carré) : c'est le tracé ${n1}, le plus court.`,
        canvas: fig,
      };
    }
    const q = un([`Comment faut-il mesurer les ${fr(e)} ${sit.u} ?`, "Quelle méthode est juste ?", "Comment s'y prendre ?"]);
    return {
      text: `${intro} ${q}`,
      ...qcm("tracer la perpendiculaire avec l'équerre, puis mesurer dessus avec la règle", ["mesurer en biais, depuis n'importe quel point du bord", "mesurer le long du bord", "piquer le compas n'importe où sur le bord et tracer un arc"]),
      explanation: "La distance d'un point à une droite se mesure sur la perpendiculaire à cette droite : c'est le plus court chemin.",
      canvas: fig,
    };
  }),

  TRA(113, 4, "Un rectangle se construit avec l'équerre : angles droits, puis côtés reportés à la règle.", (): Gen => {
    const [A, B, C, D] = lettres(4);
    const L = dec(50, 90);
    let l = dec(25, 45);
    if (l >= L) l = L - 1.5;
    const ctx = un([
      `${un(NOMS)} construit un rectangle ${A}${B}${C}${D} de ${fr(L)} cm sur ${fr(l)} cm.`,
      `Le menuisier trace le plan d'une porte : un rectangle ${A}${B}${C}${D} de ${fr(L)} cm sur ${fr(l)} cm.`,
      `Pour le plan d'une piscine, l'architecte trace un rectangle ${A}${B}${C}${D} de ${fr(L)} cm sur ${fr(l)} cm.`,
      `La couturière dessine un patron rectangulaire ${A}${B}${C}${D} de ${fr(L)} cm sur ${fr(l)} cm.`,
      `Sur sa feuille, la dessinatrice trace l'écran d'une tablette : un rectangle ${A}${B}${C}${D} de ${fr(L)} cm sur ${fr(l)} cm.`,
      `Pour son jeu de société, ${un(NOMS)} dessine une carte rectangulaire ${A}${B}${C}${D} de ${fr(L)} cm sur ${fr(l)} cm.`,
    ]);
    const E = [
      `tracer le segment [${A}${B}] de ${fr(L)} cm`,
      `tracer la perpendiculaire à (${A}${B}) passant par ${B}`,
      `placer ${C} sur cette perpendiculaire, à ${fr(l)} cm de ${B}`,
      `tracer la perpendiculaire à (${A}${B}) passant par ${A}`,
      `placer ${D} sur cette perpendiculaire, à ${fr(l)} cm de ${A}, du même côté que ${C}`,
      `tracer le segment [${C}${D}] et coder les angles droits`,
    ];
    const typeEtape = Math.random() < 0.6;
    if (typeEtape) {
      const k = entre(1, 5);
      const q = `Après « ${E[k - 1]} », que fait-on ?`;
      return {
        text: `${ctx} ${q}`,
        ...qcm(cap(E[k]), [...E.filter((_, i) => i !== k && i !== k - 1), `tracer un cercle de centre ${A}`, `tracer la diagonale [${A}${C}]`].map(cap)),
        explanation: `Ordre : [${A}${B}], perpendiculaire en ${B}, ${C} à ${fr(l)} cm, perpendiculaire en ${A}, ${D} à ${fr(l)} cm, puis [${C}${D}].`,
        canvas: rectangleFig([A, B, C, D], `${fr(L)} cm`, `${fr(l)} cm`, un([0, 0, 10, -8])),
      };
    }
    const q = un([`Quelle est la distance entre les droites (${A}${B}) et (${D}${C}) ?`, `À quelle distance de la droite (${A}${B}) se trouve le point ${C} ?`, `Quel écart sépare les côtés parallèles [${A}${B}] et [${D}${C}] ?`]);
    return {
      text: `${ctx} ${q}`,
      ...qcmN(l, [L, L + l, 2 * (L + l)], "cm", 0.5),
      explanation: `[${B}${C}] est perpendiculaire à (${A}${B}) et à (${D}${C}) : il mesure l'écart, ${fr(l)} cm.`,
      canvas: rectangleFig([A, B, C, D], `${fr(L)} cm`, `${fr(l)} cm`, un([0, 0, 10, -8])),
    };
  }),

  TRA(114, 4, "À une distance donnée d'une droite, il y a DEUX parallèles : une de chaque côté.", (): Gen => {
    const e = dec(15, 60);
    const sit = un([
      { t: `Le programme dit : « Trace une droite parallèle à (d), à ${fr(e)} cm de (d). »`, u: "cm" },
      { t: `Le traceur du stade doit peindre une ligne parallèle à la ligne de but, à ${fr(e)} m. On ne lui dit pas de quel côté.`, u: "m" },
      { t: `${un(NOMS)} doit tracer une droite parallèle à (d) et à ${fr(e)} cm d'elle.`, u: "cm" },
      { t: `Le jardinier veut une rangée de fleurs parallèle à l'allée, à ${fr(e)} m. Il peut planter des deux côtés.`, u: "m" },
      { t: `L'architecte doit dessiner un mur parallèle à la rue (d), à ${fr(e)} cm sur le plan, sans savoir encore de quel côté.`, u: "cm" },
      { t: `Dans un jeu, le robot doit rouler en ligne droite, toujours à ${fr(e)} m d'un mur droit.`, u: "m" },
      { t: `La consigne est : « Trace toutes les droites parallèles à (d) situées à ${fr(e)} cm de (d). »`, u: "cm" },
    ]);
    const k = Math.random() < 0.65;
    const q = k ? un(["Combien de droites conviennent ?", "Combien de tracés différents sont possibles ?", "Combien de lignes répondent à la consigne ?"]) : un(["Où sont tous les points situés à cette distance de (d) ?", "Que forment tous les points à cette distance de (d) ?"]);
    return {
      text: `${sit.t} ${q}`,
      ...(k
        ? qcm("2 droites, une de chaque côté", ["1 seule droite", "une infinité de droites", "aucune droite"])
        : qcm("sur deux droites parallèles à (d), une de chaque côté", ["sur une seule droite parallèle à (d)", "sur une droite perpendiculaire à (d)", "sur un cercle autour de (d)"])),
      explanation: `De chaque côté de (d), les points à ${fr(e)} ${sit.u} forment une parallèle : il y en a deux.`,
      canvas: schema(
        [
          { nom: "(d)", a: { x: 0, y: 0 }, b: { x: 10, y: 0 }, couleur: "#0f172a" },
          { a: { x: 0, y: 2.2 }, b: { x: 10, y: 2.2 }, couleur: COUL[1], pointille: true },
          { a: { x: 0, y: -2.2 }, b: { x: 10, y: -2.2 }, couleur: COUL[1], pointille: true },
        ],
        { angle: un([0, 0, 15, -20, 90]), mesures: [{ a: { x: 3, y: 0 }, b: { x: 3, y: 2.2 }, texte: `${fr(e)} ${sit.u}` }, { a: { x: 7, y: 0 }, b: { x: 7, y: -2.2 }, texte: `${fr(e)} ${sit.u}` }] },
      ),
    };
  }),

  /* ═════════════ DROITE_DEFI ★4 ═════════════ */
  DEF(105, 4, "Sur le plan : la parallèle garde l'écart, la perpendiculaire fait un coin carré… et elle est perpendiculaire aux DEUX parallèles.", (): Gen => {
    const lieux = melange([
      ["des Lilas", "Lilas"], ["des Pins", "Pins"], ["de la Gare", "Gare"], ["du Port", "Port"], ["du Moulin", "Moulin"], ["des Roses", "Roses"],
      ["du Pont", "Pont"], ["de l'École", "École"], ["de la Mer", "Mer"], ["des Fleurs", "Fleurs"], ["du Parc", "Parc"], ["de la Forge", "Forge"],
    ]).slice(0, 4);
    const R = (i: number) => `la rue ${lieux[i][0]}`;
    const vrais = [`${cap(R(0))} est parallèle à ${R(1)}.`, `${cap(R(2))} est perpendiculaire à ${R(0)}.`, `${cap(R(2))} est perpendiculaire à ${R(1)}.`, `${cap(R(1))} est parallèle à ${R(0)}.`];
    const faux = [`${cap(R(3))} est parallèle à ${R(0)}.`, `${cap(R(3))} est perpendiculaire à ${R(1)}.`, `${cap(R(1))} est perpendiculaire à ${R(0)}.`, `${cap(R(2))} est parallèle à ${R(1)}.`, `${cap(R(3))} est perpendiculaire à ${R(2)}.`, `${cap(R(0))} est parallèle à ${R(2)}.`];
    const intro = un([`Sur le plan du quartier ${deN()}, voici quatre rues.`, "Le facteur regarde le plan de son quartier.", "Sur le plan de la ville, quatre rues sont tracées.", "Une livreuse étudie le plan du centre-ville.", "Un chauffeur de taxi observe le plan sur son écran."]);
    const q = un(["Quelle phrase est vraie ?", "Une seule phrase est vraie. Laquelle ?", "Quelle affirmation est juste ?"]);
    return {
      text: `${intro} ${q}`,
      ...qcm(un(vrais), faux),
      explanation: `${cap(R(1))} est parallèle à ${R(0)} ; ${R(2)} les coupe toutes les deux en angle droit ; ${R(3)} les croise en biais.`,
      canvas: plan4(lieux.map((l) => l[1]) as [string, string, string, string], un(ANGLES_PENCHES)),
    };
  }),

  DEF(106, 4, "Deux droites perpendiculaires à une même troisième sont parallèles.", (): Gen => {
    const c = un([
      { t: "Deux barreaux d'une échelle sont perpendiculaires au même montant.", q: "Que peut-on dire des deux barreaux ?", g: "ils", s: "pp", l: ["montant", "barreau 1", "barreau 2"] },
      { t: "Deux étagères sont perpendiculaires au même montant de la bibliothèque.", q: "Que peut-on dire des deux étagères ?", g: "elles", s: "pp", l: ["montant", "étagère 1", "étagère 2"] },
      { t: "Deux poteaux bien droits sont perpendiculaires au même sol plat.", q: "Que peut-on dire des deux poteaux ?", g: "ils", s: "pp", l: ["sol", "poteau 1", "poteau 2"] },
      { t: "Deux joints du carrelage sont perpendiculaires au même mur.", q: "Que peut-on dire des deux joints ?", g: "ils", s: "pp", l: ["mur", "joint 1", "joint 2"] },
      { t: "La rue du Port est parallèle à la rue des Lilas. L'avenue des Pins est perpendiculaire à la rue des Lilas.", q: "Que peut-on dire de l'avenue des Pins et de la rue du Port ?", g: "elles", s: "pa", l: ["Lilas", "Port", "Pins"] },
      { t: "Deux lignes du cahier sont parallèles. La marge rouge est perpendiculaire à la première ligne.", q: "Que peut-on dire de la marge et de la deuxième ligne ?", g: "elles", s: "pa", l: ["ligne 1", "ligne 2", "marge"] },
      { t: "Les deux rails sont parallèles. Une traverse est perpendiculaire au premier rail.", q: "Que peut-on dire de la traverse et du deuxième rail ?", g: "ils", s: "pa", l: ["rail 1", "rail 2", "traverse"] },
      { t: "La ligne médiane d'un terrain de foot est parallèle à la ligne de but. La ligne de touche est perpendiculaire à la ligne de but.", q: "Que peut-on dire de la ligne médiane et de la ligne de touche ?", g: "elles", s: "pa", l: ["but", "médiane", "touche"] },
      { t: "Deux cordes de la guitare sont parallèles. Une troisième corde est parallèle à la deuxième.", q: "Que peut-on dire de la première et de la troisième corde ?", g: "elles", s: "aa", l: ["corde 2", "corde 1", "corde 3"] },
      { t: "Deux rangées de vignes sont parallèles. Une troisième rangée est parallèle à la deuxième.", q: "Que peut-on dire de la première et de la troisième rangée ?", g: "elles", s: "aa", l: ["rangée 2", "rangée 1", "rangée 3"] },
    ]);
    const intro = un(["", "Défi ! ", "Réfléchis bien. ", "Question du rallye maths. "]);
    const juste = c.s === "pa" ? `${c.g} sont perpendiculaires` : `${c.g} sont parallèles`;
    const ang = un([0, 10, -15, 25]);
    const fig =
      c.s === "pp"
        ? schema(
            [
              { nom: c.l[0], a: { x: 0, y: -1 }, b: { x: 0, y: 7 }, couleur: COUL[0], lab: [0.85, 0.97] },
              { nom: c.l[1], a: { x: -3, y: 1.5 }, b: { x: 6, y: 1.5 }, couleur: COUL[1] },
              { nom: c.l[2], a: { x: -3, y: 4.5 }, b: { x: 6, y: 4.5 }, couleur: COUL[2] },
            ],
            { angle: ang, droits: [[{ x: 0, y: 1.5 }, { x: 2, y: 1.5 }, { x: 0, y: 3.2 }], [{ x: 0, y: 4.5 }, { x: 2, y: 4.5 }, { x: 0, y: 6.2 }]] },
          )
        : c.s === "pa"
          ? schema(
              [
                { nom: c.l[0], a: { x: 0, y: 0 }, b: { x: 10, y: 0 }, couleur: COUL[0] },
                { nom: c.l[1], a: { x: 0, y: 3 }, b: { x: 10, y: 3 }, couleur: COUL[1] },
                { nom: c.l[2], a: { x: 3, y: -1.5 }, b: { x: 3, y: 5 }, couleur: COUL[2], lab: [0.85, 0.97] },
              ],
              { angle: ang, droits: [[{ x: 3, y: 0 }, { x: 5, y: 0 }, { x: 3, y: 1.7 }]] },
            )
          : schema(
              [
                { nom: c.l[0], a: { x: 0, y: 2 }, b: { x: 10, y: 2 }, couleur: COUL[0] },
                { nom: c.l[1], a: { x: 0, y: 0 }, b: { x: 10, y: 0 }, couleur: COUL[1], lab: [0.05, 0.2] },
                { nom: c.l[2], a: { x: 0, y: 4 }, b: { x: 10, y: 4 }, couleur: COUL[2] },
              ],
              { angle: ang },
            );
    return {
      text: `${intro}${c.t} ${c.q}`,
      ...qcm(juste, [`${c.g} sont parallèles`, `${c.g} sont perpendiculaires`, `${c.g} se coupent sans faire d'angle droit`, "on ne peut pas savoir"]),
      explanation: c.s === "pp" ? "Deux droites perpendiculaires à une même droite sont parallèles entre elles." : c.s === "pa" ? "Une droite perpendiculaire à l'une de deux parallèles est aussi perpendiculaire à l'autre." : "Deux droites parallèles à une même droite sont parallèles entre elles.",
      canvas: fig,
    };
  }),

  DEF(107, 4, "Prolonge les deux segments : se rencontrent-ils ? Si oui, en angle droit ?", (): Gen => {
    const rel = un(["par", "perp", "ni"] as const);
    const g = deuxSegmentsGrille(rel);
    const [A, B, C, D] = lettres(4);
    const q = un([`Comment sont les droites (${A}${B}) et (${C}${D}) ?`, "Si on prolonge les segments, les droites obtenues sont…", "Les droites qui portent ces segments sont…"]);
    return {
      text: `${cadreGrille(`les segments [${A}${B}] et [${C}${D}]`)} ${q}`,
      ...qcm(rel === "ni" ? "ni parallèles ni perpendiculaires" : MOT_REL[rel], ["parallèles", "perpendiculaires", "ni parallèles ni perpendiculaires", "on ne peut pas savoir : les segments ne se touchent pas"]),
      explanation: rel === "par" ? "Même déplacement sur le quadrillage : parallèles." : rel === "perp" ? "Les déplacements forment un angle droit (on échange les carreaux et un sens) : perpendiculaires." : "Prolongées, elles se couperaient en biais : ni parallèles ni perpendiculaires.",
      canvas: segmentsGrille(g, [A, B, C, D]),
    };
  }),

  DEF(108, 4, "Dans un rectangle, les côtés opposés sont parallèles et deux côtés voisins sont perpendiculaires.", (): Gen => {
    const o = un(["une porte", "l'écran d'une tablette", "le tableau de la classe", "un drapeau", "un tapis de yoga", "une feuille de papier", "une tablette de chocolat", "un terrain de basket", "une fenêtre", "un livre fermé", "un terrain de foot", "une carte postale"]);
    const [A, B, C, D] = lettres(4);
    const t = entre(0, 3);
    let q: string, juste: string, faux: string[];
    if (t === 0) [q, juste, faux] = [`Quel côté est parallèle à [${A}${B}] ?`, `[${D}${C}]`, [`[${B}${C}]`, `[${A}${D}]`, `[${A}${C}]`]];
    else if (t === 1) [q, juste, faux] = [`Quel côté est perpendiculaire à [${A}${B}] et part de ${B} ?`, `[${B}${C}]`, [`[${A}${D}]`, `[${D}${C}]`, `[${B}${D}]`]];
    else if (t === 2) [q, juste, faux] = [`Combien de côtés sont perpendiculaires à [${A}${B}] ?`, "2 côtés", ["1 côté", "aucun côté", "3 côtés"]];
    else [q, juste, faux] = [`La droite (${A}${C}) est-elle perpendiculaire à (${A}${B}) ?`, `non : (${A}${C}) est une diagonale, l'angle n'est pas droit`, [`oui : elle part du coin ${A}, où il y a un angle droit`, "oui : dans un rectangle, toutes les lignes sont perpendiculaires", `oui, car elle passe par ${A}`]];
    const intro = un([`${cap(o)} a la forme d'un rectangle ${A}${B}${C}${D}.`, `${un(NOMS)} dessine le contour ${de(o)} : c'est un rectangle ${A}${B}${C}${D}.`, `On schématise ${o} par le rectangle ${A}${B}${C}${D}.`]);
    const pts: Pt[] = [{ x: 0, y: 0 }, { x: 6, y: 0 }, { x: 6, y: 3.6 }, { x: 0, y: 3.6 }];
    const ang = un([0, 0, 15, -12, 25]);
    return {
      text: `${intro} ${q}`,
      ...qcm(juste, faux),
      explanation: `Dans le rectangle ${A}${B}${C}${D} : [${A}${B}] est parallèle à [${D}${C}], et perpendiculaire à [${A}${D}] et à [${B}${C}]. Une diagonale n'est pas un côté.`,
      canvas: {
        kind: "construction",
        points: pts.map((p, i) => ({ id: `s${i}`, ...tourner(p, ang), nom: [A, B, C, D][i] })),
        polygones: [{ sommets: ["s0", "s1", "s2", "s3"] }],
        angles: [0, 1, 2, 3].map((i) => ({ sommet: `s${i}`, de: `s${(i + 1) % 4}`, vers: `s${(i + 3) % 4}`, droit: true })),
      },
    };
  }),

  DEF(109, 4, "Compte les « perpendiculaire » : deux font une parallèle, une seule fait une perpendiculaire.", (): Gen => {
    const n = entre(2, 3);
    const noms = ["(d)", "(e)", "(f)", "(g)"];
    const rels = Array.from({ length: n }, () => (Math.random() < 0.6 ? "perpendiculaire" : "parallèle"));
    const nbPerp = rels.filter((r) => r === "perpendiculaire").length;
    const phrases = rels.map((r, i) => `${noms[i + 1]} est ${r} à ${noms[i]}.`).join(" ");
    const der = noms[n];
    const intro = un([`${un(NOMS)} lit un programme de construction :`, "Voici un défi de géométrie :", "Sans rien tracer, réfléchis :", "Le maître écrit au tableau :"]);
    const q = un([`Que peut-on dire de (d) et ${der} ?`, `Comment sont les droites (d) et ${der} ?`]);
    const juste = nbPerp % 2 === 0 ? "elles sont parallèles" : "elles sont perpendiculaires";
    // Pas de figure : elle donnerait la réponse (« sans rien tracer »).
    return {
      text: `${intro} ${phrases} ${q}`,
      ...qcm(juste, ["elles sont parallèles", "elles sont perpendiculaires", "elles se coupent sans faire d'angle droit", "on ne peut pas savoir"]),
      explanation: "Chaque « perpendiculaire » fait tourner d'un angle droit ; deux angles droits ramènent à la même direction. « Parallèle » garde la direction.",
    };
  }),

  /* ═════════════ DROITE_DEFI ★5 (CM2) ═════════════ */
  DEF(110, 5, "Du même côté de (d) : on soustrait les distances. De part et d'autre : on les ajoute.", (): Gen => {
    const sit = un([
      { d: "Sur un mur, l'étagère du bas est la droite (d).", e: "l'étagère (e)", f: "l'étagère (f)", u: "cm", min: 200, max: 600 },
      { d: "Sur un terrain, la ligne médiane est la droite (d).", e: "la ligne (e)", f: "la ligne (f)", u: "m", min: 50, max: 300 },
      { d: "Dans un champ, une rangée de vignes est la droite (d).", e: "la rangée (e)", f: "la rangée (f)", u: "m", min: 10, max: 60 },
      { d: "Sur son cahier, Nina trace une droite (d).", e: "la droite (e)", f: "la droite (f)", u: "cm", min: 10, max: 60 },
      { d: "Sur un plan, une route droite est la droite (d).", e: "le canal (e)", f: "la voie ferrée (f)", u: "km", min: 5, max: 50 },
      { d: "Sur une piste d'athlétisme, une ligne de couloir est la droite (d).", e: "la ligne (e)", f: "la ligne (f)", u: "m", min: 12, max: 50 },
      { d: "Sur un mur d'escalade, une corde tendue à l'horizontale est la droite (d).", e: "la corde (e)", f: "la corde (f)", u: "m", min: 10, max: 40 },
      { d: "Sur la portée d'une partition, une ligne est la droite (d).", e: "la ligne (e)", f: "la ligne (f)", u: "mm", min: 20, max: 90 },
      { d: "Dans un potager, l'allée centrale est la droite (d).", e: "la rangée de carottes (e)", f: "la rangée de radis (f)", u: "m", min: 5, max: 30 },
      { d: "Sur le plan d'un parking, une bordure est la droite (d).", e: "la ligne (e)", f: "la ligne (f)", u: "m", min: 20, max: 80 },
    ]);
    const a = dec(sit.min, sit.max);
    let b = dec(sit.min, sit.max);
    if (Math.abs(a - b) < 0.3) b = Math.round((a + 1.2) * 10) / 10;
    const meme = Math.random() < 0.5;
    const juste = meme ? Math.abs(a - b) : a + b;
    const autre = meme ? a + b : Math.abs(a - b);
    const U = sit.u;
    const text = `${sit.d.replace("Nina", un(NOMS))} ${cap(sit.e)} est parallèle à (d), à ${fr(a)} ${U}. ${cap(sit.f)} est aussi parallèle à (d), à ${fr(b)} ${U}, ${meme ? "du même côté" : "de l'autre côté de (d)"}. Quelle distance sépare ${sit.e} et ${sit.f} ?`;
    const s = 3.2 / Math.max(a, b);
    const ya = a * s;
    const yb = (meme ? 1 : -1) * b * s;
    return {
      text,
      ...qcmN(juste, [autre, a, b], U, 0.5),
      explanation: meme ? `Du même côté : ${fr(Math.max(a, b))} − ${fr(Math.min(a, b))} = ${fr(juste)} ${U}.` : `De part et d'autre de (d) : ${fr(a)} + ${fr(b)} = ${fr(juste)} ${U}.`,
      canvas: schema(
        [
          { nom: "(d)", a: { x: 0, y: 0 }, b: { x: 10, y: 0 }, couleur: "#0f172a" },
          { nom: "(e)", a: { x: 0, y: ya }, b: { x: 10, y: ya }, couleur: COUL[0] },
          { nom: "(f)", a: { x: 0, y: yb }, b: { x: 10, y: yb }, couleur: COUL[2] },
        ],
        { angle: un([0, 0, 8, -8]), mesures: [{ a: { x: 2.5, y: 0 }, b: { x: 2.5, y: ya }, texte: `${fr(a)} ${U}` }, { a: { x: 6, y: 0 }, b: { x: 6, y: yb }, texte: `${fr(b)} ${U}` }] },
      ),
    };
  }),

  DEF(111, 5, "Suis la chaîne une phrase après l'autre : perpendiculaire tourne d'un angle droit, parallèle garde la direction.", (): Gen => {
    const n = entre(3, 4);
    const noms = ["(a)", "(b)", "(c)", "(d)", "(e)"];
    const sujets = un([
      { intro: "Dans une ville aux rues bien droites, le facteur lit son plan :", m: ["la rue Haute", "la rue Basse", "l'avenue Verte", "la rue Neuve", "le boulevard Nord"] },
      { intro: "Le robot dessinateur suit ce programme :", m: noms },
      { intro: "Le maître écrit au tableau :", m: noms },
      { intro: "Sur le plan d'une serre, le jardinier note :", m: ["la rangée 1", "la rangée 2", "la rangée 3", "la rangée 4", "la rangée 5"] },
      { intro: "Dans un jeu vidéo de course, la carte indique :", m: ["la piste A", "la piste B", "la piste C", "la piste D", "la piste E"] },
      { intro: "Sur le plan d'un atelier, l'ingénieure lit :", m: ["le rail 1", "le rail 2", "le rail 3", "le rail 4", "le rail 5"] },
    ]);
    const m = sujets.m;
    const rels = Array.from({ length: n }, () => (Math.random() < 0.55 ? "perpendiculaire" : "parallèle"));
    if (!rels.includes("perpendiculaire")) rels[0] = "perpendiculaire";
    const nbPerp = rels.filter((r) => r === "perpendiculaire").length;
    // « à le boulevard » → « au boulevard », « de le boulevard » → « du boulevard ».
    const aX = (s: string) => (s.startsWith("le ") ? `au ${s.slice(3)}` : `à ${s}`);
    const deX = (s: string) => (s.startsWith("le ") ? `du ${s.slice(3)}` : `de ${s}`);
    const phrases = rels.map((r, i) => `${cap(m[i + 1])} est ${r} ${aX(m[i])}.`).join(" ");
    const q = un([`Que peut-on dire ${deX(m[0])} et ${deX(m[n])} ?`, `Quelle est la position ${deX(m[0])} par rapport ${aX(m[n])} ?`, `Comment se placent ${m[0]} et ${m[n]} ?`]);
    const R = ["ce sont deux droites parallèles", "ce sont deux droites perpendiculaires", "ce sont deux droites qui se coupent sans angle droit", "on ne peut pas savoir sans dessiner"];
    return {
      text: `${sujets.intro} ${phrases} ${q}`,
      ...qcm(nbPerp % 2 === 0 ? R[0] : R[1], R),
      explanation: `On compte ${nbPerp} « perpendiculaire » : ${nbPerp % 2 === 0 ? "un nombre pair d'angles droits ramène à la même direction, donc parallèles" : "un nombre impair d'angles droits laisse un angle droit, donc perpendiculaires"}.`,
    };
  }),

  DEF(112, 5, "La distance à la droite se lit sur les perpendiculaires. Compare les décimaux chiffre par chiffre.", (): Gen => {
    const sit = un([
      { t: "Trois maisons sont près d'une route droite (d).", o: "maison", f: true, u: "km" },
      { t: "Trois arbres poussent près d'une rivière toute droite (d).", o: "arbre", f: false, u: "m" },
      { t: "Trois bouées flottent près d'une plage droite (d).", o: "bouée", f: true, u: "km" },
      { t: "Trois nageurs sont dans la piscine, près du bord (d).", o: "nageur", f: false, u: "m" },
      { t: "Trois tentes sont plantées près d'un chemin droit (d).", o: "tente", f: true, u: "m" },
      { t: "Trois fermes sont près d'une voie ferrée toute droite (d).", o: "ferme", f: true, u: "km" },
      { t: "Trois vaches broutent près d'une clôture droite (d).", o: "vache", f: true, u: "m" },
      { t: "Trois bateaux naviguent près d'une digue droite (d).", o: "bateau", f: false, u: "km" },
      { t: "Trois joueurs sont près de la ligne de touche (d).", o: "joueur", f: false, u: "m" },
      { t: "Trois drones volent au-dessus d'une autoroute droite (d).", o: "drone", f: false, u: "km" },
    ]);
    const [A, B, C] = lettres(3);
    const base = entre(0, 2);
    let vals: number[] = [];
    for (let k = 0; k < 50; k++) {
      vals = [base + entre(1, 9) / 10, base + entre(10, 99) / 100, base + entre(10, 99) / 100].map((x) => Math.round(x * 100) / 100);
      if (new Set(vals).size === 3 && vals.every((x) => x > 0)) break;
    }
    vals = melange(vals);
    const proche = Math.random() < 0.6;
    const cible = proche ? Math.min(...vals) : Math.max(...vals);
    const P = [A, B, C];
    const idx = vals.indexOf(cible);
    const le = sit.f ? "la" : "le";
    const q = proche ? `Quel${sit.f ? "le" : ""} ${sit.o} est ${le === "la" ? "la" : "le"} plus proche de (d) ?` : `Quel${sit.f ? "le" : ""} ${sit.o} est ${le === "la" ? "la" : "le"} plus éloigné${sit.f ? "e" : ""} de (d) ?`;
    const s = 3.6 / Math.max(...vals);
    return {
      text: `${sit.t} On a mesuré la distance de chacun${sit.f ? "e" : ""} à (d) : ${P.map((p, i) => `${p} : ${fr(vals[i])} ${sit.u}`).join(" ; ")}. ${q}`,
      ...qcm(`${le} ${sit.o} ${P[idx]}`, P.filter((_, i) => i !== idx).map((p) => `${le} ${sit.o} ${p}`).concat([`on ne peut pas savoir sans les chemins en biais`])),
      explanation: `On compare ${vals.map(fr).join(", ")} : les unités, puis les dixièmes, puis les centièmes. ${cap(`${le} ${sit.o} ${P[idx]}`)} est à ${fr(cible)} ${sit.u}.`,
      canvas: schema([{ nom: "(d)", a: { x: -0.5, y: 0 }, b: { x: 10.5, y: 0 }, couleur: "#0f172a" }], {
        angle: un([0, 0, 6, -6]),
        points: P.map((p, i) => ({ p: { x: 1.5 + 3.5 * i, y: vals[i] * s }, nom: p })),
        mesures: P.map((_, i) => ({ a: { x: 1.5 + 3.5 * i, y: 0 }, b: { x: 1.5 + 3.5 * i, y: vals[i] * s }, texte: `${fr(vals[i])} ${sit.u}` })),
        droits: P.map((_, i) => [{ x: 1.5 + 3.5 * i, y: 0 }, { x: 2.3 + 3.5 * i, y: 0 }, { x: 1.5 + 3.5 * i, y: 0.8 }] as [Pt, Pt, Pt]),
      }),
    };
  }),

  DEF(113, 5, "Dans un rectangle, la distance entre deux côtés opposés est la longueur d'un côté voisin.", (): Gen => {
    const [A, B, C, D] = lettres(4);
    const sit = un([
      { t: "Un terrain de foot", L: 100, l: 64, u: "m" },
      { t: "Une piscine olympique", L: 50, l: 25, u: "m" },
      { t: "Un terrain de basket", L: 28, l: 15, u: "m" },
      { t: "Une feuille A4", L: 29.7, l: 21, u: "cm" },
      { t: "Un terrain de handball", L: 40, l: 20, u: "m" },
      { t: "Une table de ping-pong", L: 2.74, l: 1.525, u: "m" },
      { t: "Un terrain de tennis", L: 23.77, l: 10.97, u: "m" },
      { t: "L'écran d'une tablette", L: 24.5, l: 17.2, u: "cm" },
      { t: "Un tapis de judo", L: 12, l: 9.5, u: "m" },
      { t: "Une carte postale", L: 14.8, l: 10.5, u: "cm" },
      { t: "Un potager", L: dec(60, 120), l: dec(25, 55), u: "m" },
      { t: "Une salle de classe", L: dec(80, 110), l: dec(55, 75), u: "m" },
    ]);
    const k = entre(0, 3);
    const Q = [
      { q: `Quelle est la distance du point ${C} à la droite (${A}${B}) ?`, r: sit.l },
      { q: `Quelle est la distance entre les droites (${A}${D}) et (${B}${C}) ?`, r: sit.L },
      { q: `Quelle est la distance du point ${D} à la droite (${B}${C}) ?`, r: sit.L },
      { q: `Quelle est la distance entre les droites (${A}${B}) et (${D}${C}) ?`, r: sit.l },
    ][k];
    const autre = Q.r === sit.l ? sit.L : sit.l;
    const intro = `${sit.t} a la forme d'un rectangle ${A}${B}${C}${D} : ${A}${B} = ${fr(sit.L)} ${sit.u} et ${B}${C} = ${fr(sit.l)} ${sit.u}.`;
    return {
      text: `${intro} ${Q.q}`,
      ...qcm(`${fr(Q.r)} ${sit.u}`, [`${fr(autre)} ${sit.u}`, `${fr(Math.round((sit.L + sit.l) * 1000) / 1000)} ${sit.u}`, `${fr(Math.round(2 * (sit.L + sit.l) * 1000) / 1000)} ${sit.u}`]),
      explanation: `Les côtés voisins sont perpendiculaires : la distance cherchée se mesure le long d'un côté perpendiculaire, qui mesure ${fr(Q.r)} ${sit.u}.`,
      canvas: rectangleFig([A, B, C, D], `${fr(sit.L)} ${sit.u}`, `${fr(sit.l)} ${sit.u}`, un([0, 0, 8, -10])),
    };
  }),
];

/* La parallèle / la perpendiculaire sur quadrillage (déclaration de fonction : remontée). */
function gabaritGrilleTrace(type: "par" | "perp"): Gen {
  let a = entre(1, 4);
  let b = entre(1, 3);
  if (a === b) a = a === 4 ? 3 : a + 1;
  b *= Math.random() < 0.5 ? 1 : -1;
  const u = { x: a, y: b };
  const juste = type === "par" ? u : { x: -b, y: a };
  const pool = [{ x: b, y: a }, { x: a, y: -b }, { x: -b, y: a }, { x: b, y: -a }, { x: -a, y: b }, { x: a, y: b }, { x: Math.abs(b), y: Math.abs(a) }];
  const faux = pool.filter((v) => croix(v, juste) !== 0 && v.x !== 0 && v.y !== 0).map(deplacement);
  let P = { x: 1, y: 1 }, A = { x: 4, y: 4 };
  for (let k = 0; k < 300; k++) {
    P = { x: entre(0, 4), y: entre(1, 5) };
    const Q = plus(P, u);
    A = { x: entre(1, 6), y: entre(1, 5) };
    const A2 = plus(A, juste);
    const surD = croix(u, { x: A.x - P.x, y: A.y - P.y }) === 0;
    if (Q.x >= 1 && Q.x <= 7 && Q.y >= 1 && Q.y <= 5 && A2.x >= 0 && A2.x <= 8 && A2.y >= 0 && A2.y <= 6 && !surD) break;
  }
  const Q = plus(P, u);
  const L = un(LETTRES);
  const q = un(["Comment faut-il se déplacer à partir du point ?", "Quel déplacement faut-il faire depuis ce point ?", "De combien de carreaux faut-il avancer, et dans quel sens ?"]);
  const quoi = type === "par" ? "la parallèle" : "la perpendiculaire";
  return {
    text: `${cadreGrille(`la droite (d) et le point ${L}`)} Pour tracer ${quoi} à (d) passant par ${L}, on place un deuxième point à partir de ${L}. ${q}`,
    ...qcm(deplacement(juste), faux),
    explanation: type === "par" ? `Sur (d), on avance de ${deplacement(u)} : la parallèle fait le même déplacement depuis ${L}.` : `Sur (d), on avance de ${deplacement(u)}. Pour un angle droit, on échange les deux nombres et on change un sens : ${deplacement(juste)}.`,
    canvas: grille(
      [{ id: "d", type: "droite", from: G(P.x, P.y), to: G(Q.x, Q.y), color: COUL[0], label: "(d)" }],
      [
        { ...G(P.x, P.y), color: "#2563eb" },
        { ...G(Q.x, Q.y), color: "#2563eb" },
        { ...G(A.x, A.y), label: L, color: "#ef4444" },
      ],
    ),
  };
}
