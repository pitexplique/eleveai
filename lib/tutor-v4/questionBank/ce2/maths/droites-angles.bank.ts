// lib/tutor-v4/questionBank/ce2/maths/droites-angles.bank.ts
//
// Les droites, les angles droits et les codages du CE2, écrits à la main. Six
// micro-compétences qui passaient par le constructeur commun.
//
// PÉRIMÈTRE BO (n° 41 du 31 octobre 2024, cycle 2) : reconnaître et tracer des
// alignements, des droites et des segments ; reconnaître et tracer un angle
// droit à l'équerre ; UTILISER les codages — le petit carré de l'angle droit et
// les traits des segments de même longueur ; repérer deux côtés perpendiculaires
// dans une figure.
// ⛔ Pas de parallèles au cycle 2, pas de mesure d'angle en degrés : le
// rapporteur arrive au cycle 3. Ici l'équerre décide, ou le codage l'affirme.
//
// LE PIÈGE DE LA NOTION : croire ses yeux. Trois points qui semblent alignés ne
// le sont pas forcément, et un coin qui a l'air droit ne l'est pas forcément.
// C'est la règle qu'on pose, c'est l'équerre qu'on présente — l'œil ne tranche
// rien. Et son revers, tout aussi coûteux : quand le CODAGE est là, il n'y a
// plus rien à vérifier. Le petit carré AFFIRME que l'angle est droit ; le
// mesurer à nouveau, c'est n'avoir pas compris ce qu'est un codage.
//
// ⚠️ PAS DE QUESTION À RÉDIGER. `applyMathsKeyboardFree` retire les items
// `format: "open"` (cf. ce2/maths/index.ts) : un CE2 clique, il ne tape pas.

import type {
  CanvasFigure,
  DroitesCanvasData,
  QuadrilatereCanvasData,
  TriangleCanvasData,
  TutorBankItemV4,
  TutorGeneratedQuestionV4,
} from "@/lib/tutor-v4/types";
import { atelier, cap, entre, melange, qcm, qcmN, un } from "../../cm1/maths/trous-outils";

function droites(data: Omit<DroitesCanvasData, "kind">): DroitesCanvasData {
  return {
    kind: "droites",
    size: { width: 340, height: 240 },
    display: {
      showGrid: false,
      showLabels: true,
      showPoints: true,
      showRightAngleMarkers: true,
    },
    ...data,
  };
}

function quadrilatere(data: Omit<QuadrilatereCanvasData, "kind">): QuadrilatereCanvasData {
  return { kind: "quadrilatere", ...data };
}

function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return `Définition : ${definition}

Méthode : ${methode}

Calcul : ${calcul}

Conclusion : ${conclusion}`;
}

/* ─── Trois points : vraiment alignés, ou seulement à l'œil ──────────────────
   Sur la version alignée, B tombe exactement sur la droite (AC) : la pente vaut
   −0,5 tout rond. Sur l'autre, B est décalé de trois pixels — invisible à
   l'œil, net dès qu'on pose la règle. C'est toute la leçon. */

const POINTS_ALIGNES = { A: { x: 40, y: 180 }, B: { x: 160, y: 120 }, C: { x: 280, y: 60 } };
const POINTS_PRESQUE = { A: { x: 40, y: 180 }, B: { x: 150, y: 120 }, C: { x: 280, y: 55 } };

function troisPoints(alignes: boolean): DroitesCanvasData {
  const p = alignes ? POINTS_ALIGNES : POINTS_PRESQUE;
  return droites({
    lines: [],
    points: [
      { x: p.A.x, y: p.A.y, label: "A" },
      { x: p.B.x, y: p.B.y, label: "B" },
      { x: p.C.x, y: p.C.y, label: "C" },
    ],
  });
}

/** Deux droites qui se coupent : perpendiculaires, ou franchement pas. */
function deuxDroites(perpendiculaires: boolean, codage: boolean): DroitesCanvasData {
  // Direction (4, 3) puis sa perpendiculaire (−3, 4) : l'angle est droit au
  // pixel près, et rien n'est aligné sur le bord de la feuille.
  const centre = { x: 170, y: 120 };
  const d1 = {
    from: { x: centre.x - 120, y: centre.y - 90 },
    to: { x: centre.x + 120, y: centre.y + 90 },
  };
  const d2 = perpendiculaires
    ? { from: { x: centre.x + 60, y: centre.y - 80 }, to: { x: centre.x - 60, y: centre.y + 80 } }
    : { from: { x: centre.x + 110, y: centre.y - 60 }, to: { x: centre.x - 110, y: centre.y + 20 } };

  return droites({
    lines: [
      { id: "d1", type: "droite", from: d1.from, to: d1.to, label: "(d1)" },
      { id: "d2", type: "droite", from: d2.from, to: d2.to, label: "(d2)" },
    ],
    intersections: perpendiculaires ? [{ x: centre.x, y: centre.y, highlight: true }] : [],
    markers:
      perpendiculaires && codage
        ? { rightAngles: [{ x: centre.x, y: centre.y, lineA: "d1", lineB: "d2" }] }
        : undefined,
  });
}

function rectangleCode(): QuadrilatereCanvasData {
  return quadrilatere({
    points: {
      A: { x: 55, y: 60 },
      B: { x: 245, y: 60 },
      C: { x: 245, y: 170 },
      D: { x: 55, y: 170 },
    },
    display: { showPoints: true, showLabels: true, showSides: false },
    marks: {
      rightAnglesAt: ["A", "B", "C", "D"],
      equalSides: [["AB", "CD"], ["BC", "DA"]],
    },
  });
}

/* ═══════════════════════════════════════════════════════════════════════════
   LES GABARITS (10/11/2026) — des GÉNÉRATEURS, plus des listes de trois cas.
   Mesuré avant : 7 à 11 squelettes par micro, 12 à 17 répétitions sur 20.
   Chaque gabarit tire une FAMILLE de question, une situation (à ★3+) et une
   tournure, puis fabrique son dessin. ⛔ Le dessin porte la question, il ne
   donne jamais la réponse : l'angle qu'on demande de reconnaître n'a pas de
   petit carré ; le petit carré n'apparaît que quand on demande de LIRE le
   codage — c'est alors lui, l'objet de la question.
   ★1-★2 : une phrase courte, sans histoire. ★3+ : la troupe (Nina, Téo, Zoé,
   Ravi, Pic le paille-en-queue), des prénoms, des métiers.
═══════════════════════════════════════════════════════════════════════════ */

type Pt = { x: number; y: number };
type Q = Omit<TutorGeneratedQuestionV4, "canvas"> & { canvas?: CanvasFigure };

const ENFANTS = ["Nina", "Téo", "Zoé", "Ravi", "Lou", "Malo", "Inès", "Sacha", "Amir", "Jade", "Naïa", "Tom", "Lina", "Yanis", "Léa", "Hugo"];
/** « de Téo », « d'Amir » : l'élision devant une voyelle. */
const de = (p: string) => (/^[AEIOUÉÈÎ]/.test(p) ? `d'${p}` : `de ${p}`);
const DEBUT = ["Regarde le dessin.", "Observe bien.", "Voici un dessin.", "Regarde bien la figure.", "Observe le dessin.", "Voici la figure."];
const NOMS4 = [["A", "B", "C", "D"], ["E", "F", "G", "H"], ["M", "N", "P", "R"], ["K", "L", "M", "N"], ["R", "S", "T", "U"], ["I", "J", "K", "L"]];
const NOMS_DROITES = ["d", "e", "f", "g", "h", "k"];

const rad = (d: number) => (d * Math.PI) / 180;
const rond = (p: Pt): Pt => ({ x: Math.round(p.x), y: Math.round(p.y) });
const dir = (deg: number): Pt => ({ x: Math.cos(rad(deg)), y: -Math.sin(rad(deg)) }); // y vers le haut à l'écran
const plus = (p: Pt, v: Pt, k: number): Pt => ({ x: p.x + v.x * k, y: p.y + v.y * k });

/** Tourne puis cadre une figure dans w × h (échelle uniforme : les angles droits restent droits). */
function cadrer(pts: Pt[], tourne: number, w: number, h: number, marge: number): Pt[] {
  const c = Math.cos(rad(tourne));
  const s = Math.sin(rad(tourne));
  const r = pts.map((p) => ({ x: p.x * c - p.y * s, y: p.x * s + p.y * c }));
  const xs = r.map((p) => p.x);
  const ys = r.map((p) => p.y);
  const [x0, x1, y0, y1] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
  const k = Math.min((w - 2 * marge) / (x1 - x0 || 1), (h - 2 * marge) / (y1 - y0 || 1));
  const dx = (w - k * (x1 - x0)) / 2;
  const dy = (h - k * (y1 - y0)) / 2;
  return r.map((p) => rond({ x: dx + (p.x - x0) * k, y: dy + (p.y - y0) * k }));
}

/* ─── Les quadrilatères : la forme, ses angles droits, ses côtés égaux ─────── */
type Cote = "AB" | "BC" | "CD" | "DA";
type Forme4 = { nom: string; pts: Pt[]; droits: number[]; egaux: Array<[Cote, Cote]> };
const SOMMETS = ["A", "B", "C", "D"] as const;

function forme4(quoi: "rectangle" | "carre" | "trapeze" | "un_droit" | "parallelogramme" | "losange"): Forme4 {
  const w = entre(150, 200);
  const h = entre(80, 120);
  switch (quoi) {
    case "rectangle":
      return { nom: "rectangle", pts: [{ x: 0, y: 0 }, { x: w, y: 0 }, { x: w, y: h }, { x: 0, y: h }], droits: [0, 1, 2, 3], egaux: [["AB", "CD"], ["BC", "DA"]] };
    case "carre":
      return { nom: "carré", pts: [{ x: 0, y: 0 }, { x: h, y: 0 }, { x: h, y: h }, { x: 0, y: h }], droits: [0, 1, 2, 3], egaux: [["AB", "BC"], ["BC", "CD"], ["CD", "DA"]] };
    case "trapeze":
      return { nom: "quadrilatère", pts: [{ x: 0, y: 0 }, { x: w - 60, y: 0 }, { x: w, y: h }, { x: 0, y: h }], droits: [0, 3], egaux: [] };
    case "un_droit":
      return { nom: "quadrilatère", pts: [{ x: 0, y: 0 }, { x: w, y: 0 }, { x: w - 45, y: h - 10 }, { x: 0, y: h + 30 }], droits: [0], egaux: [] };
    case "parallelogramme":
      return { nom: "quadrilatère", pts: [{ x: 0, y: 0 }, { x: w - 40, y: 0 }, { x: w, y: h }, { x: 40, y: h }], droits: [], egaux: [["AB", "CD"], ["BC", "DA"]] };
    case "losange":
      return { nom: "losange", pts: [{ x: 70, y: 0 }, { x: 140, y: 55 }, { x: 70, y: 110 }, { x: 0, y: 55 }], droits: [], egaux: [["AB", "BC"], ["BC", "CD"], ["CD", "DA"]] };
  }
}

function dessin4(
  f: Forme4,
  noms: string[],
  o: { tourne?: number; codeDroits?: number[]; codeEgaux?: boolean; cotes?: Partial<Record<Cote, string>>; noms?: boolean } = {},
): QuadrilatereCanvasData {
  const p = cadrer(f.pts, o.tourne ?? 0, 300, 220, o.cotes ? 52 : 42);
  return {
    kind: "quadrilatere",
    size: { width: 300, height: 220 },
    points: { A: p[0], B: p[1], C: p[2], D: p[3] },
    labels: { A: noms[0], B: noms[1], C: noms[2], D: noms[3] },
    display: { showPoints: true, showLabels: o.noms !== false, showSides: !!o.cotes, showAngles: false },
    sideLabels: o.cotes,
    marks: {
      rightAnglesAt: (o.codeDroits ?? []).map((i) => SOMMETS[i]),
      equalSides: o.codeEgaux ? f.egaux : [],
    },
  };
}

/** Triangle : A en haut, B en bas à gauche, C en bas à droite (là où le canvas pose les noms). */
function dessin3(
  quoi: "rectangle" | "isocele" | "equilateral" | "quelconque",
  noms: string[],
  o: { droitEn?: "A" | "B" | "C"; code?: boolean; cotes?: Partial<Record<"AB" | "BC" | "CA", string>> } = {},
): TriangleCanvasData {
  const w = 200;
  const h = entre(110, 140);
  let pts: Pt[];
  let egaux: Array<["AB" | "BC" | "CA", "AB" | "BC" | "CA"]> = [];
  let droit: "A" | "B" | "C" | undefined;
  if (quoi === "rectangle") {
    droit = o.droitEn ?? un(["B", "C"] as const);
    pts = droit === "B" ? [{ x: 0, y: 0 }, { x: 0, y: h }, { x: w, y: h }] : [{ x: w, y: 0 }, { x: 0, y: h }, { x: w, y: h }];
  } else if (quoi === "isocele") {
    pts = [{ x: w / 2, y: 0 }, { x: 0, y: h + 20 }, { x: w, y: h + 20 }];
    egaux = [["AB", "CA"]];
  } else if (quoi === "equilateral") {
    pts = [{ x: 100, y: 0 }, { x: 0, y: 173 }, { x: 200, y: 173 }];
    egaux = [["AB", "BC"], ["BC", "CA"]];
  } else {
    pts = [{ x: 60, y: 0 }, { x: 0, y: h }, { x: w, y: h - 30 }];
  }
  const p = cadrer(pts, 0, 280, 220, o.cotes ? 50 : 40);
  return {
    kind: "triangle",
    size: { width: 280, height: 220 },
    points: { A: p[0], B: p[1], C: p[2] },
    labels: { A: noms[0], B: noms[1], C: noms[2] },
    display: { showPoints: true, showLabels: true, showSides: !!o.cotes, showAngles: false, legendesDehors: true },
    sideLabels: o.cotes,
    marks: { rightAngleAt: o.code && droit ? droit : undefined, equalSides: o.code ? egaux : [] },
  };
}

/* ─── Les points et les traits (canvas `droites`) ─────────────────────────── */
function cadreDroites(lines: DroitesCanvasData["lines"], points: DroitesCanvasData["points"], h = 240): DroitesCanvasData {
  return {
    kind: "droites",
    size: { width: 340, height: h },
    lines,
    points,
    display: { showGrid: false, showLabels: true, showPoints: true, showRightAngleMarkers: false, showIntersections: false },
  };
}

/** n points sur une ligne penchée ; ceux de `dehors` en sont écartés de `ecart` pixels. */
function pointsEnLigne(n: number, dehors: number[], ecart: number, noms: string[]) {
  // ⚠️ Lignes DESCENDANTES : le canvas pose le nom en haut à droite du point, donc sur le trait quand la ligne monte.
  const pente = un([-28, -22, -16, -10]);
  const d = dir(pente);
  const nrm = { x: -d.y, y: d.x };
  const depart = { x: 45, y: 120 + Math.sin(rad(pente)) * 120 };
  const L = 250 / Math.cos(rad(pente));
  const pts = Array.from({ length: n }, (_, i) => {
    const t = (L * (i + 0.15 * (Math.random() - 0.5) + 0.0)) / (n - 1);
    const p = plus(depart, d, Math.min(L, Math.max(0, t)));
    const s = un([-1, 1]);
    return rond(dehors.includes(i) ? plus(p, nrm, s * ecart) : p);
  });
  return { pts: pts.map((p, i) => ({ ...p, label: noms[i] })), depart, fin: plus(depart, d, L) };
}

/** Un angle dessiné par deux segments issus d'un sommet. */
function brasAngle(id: string, s: Pt, depart: number, ouverture: number, long: number) {
  const a = rond(plus(s, dir(depart), long));
  const b = rond(plus(s, dir(depart + ouverture), long));
  return [
    { id: `${id}1`, type: "segment" as const, from: s, to: a },
    { id: `${id}2`, type: "segment" as const, from: s, to: b },
  ];
}

const PAS_DROITS_NETS = [40, 45, 55, 60, 125, 130, 140];
const PAS_DROITS_PROCHES = [65, 70, 72, 108, 110, 115];
function verdictAngle(deg: number) {
  return deg === 90 ? "oui, c'est un angle droit" : deg < 90 ? "non, il est plus fermé qu'un angle droit" : "non, il est plus ouvert qu'un angle droit";
}
const VERDICTS_ANGLE = ["oui, c'est un angle droit", "non, il est plus fermé qu'un angle droit", "non, il est plus ouvert qu'un angle droit", "on ne peut pas le savoir"];

/* ═════════════════ ce2_droite_alignement ═════════════════ */
const C_ALIGN = [
  (p: string) => `${p} plante trois piquets pour une clôture.`,
  (p: string) => `Pour jouer aux quilles, ${p} pose trois quilles.`,
  () => "La jardinière plante trois arbres le long d'une allée.",
  () => "Au cirque, trois clowns attendent leur tour.",
  (p: string) => `${p} colle trois gommettes sur son cahier.`,
  (p: string) => `La nuit, ${p} regarde trois étoiles.`,
  () => "Un pirate a caché trois trésors sur son île.",
  () => "L'entraîneuse pose trois plots dans la cour.",
  (p: string) => `${p} pose trois bougies sur un gâteau.`,
  () => "Pic le paille-en-queue se pose sur trois poteaux.",
  () => "L'astronaute repère trois planètes.",
  (p: string) => `Au potager, ${p} sème trois graines.`,
  () => "Trois bateaux flottent sur le lac.",
  () => "Le maçon plante trois piquets pour un mur.",
  (p: string) => `${p} pose trois dinosaures en jouet sur la table.`,
  () => "Le facteur s'arrête à trois boîtes aux lettres.",
];

function alignement1(): Q {
  const noms = un(NOMS4);
  const fam = un([1, 2, 3]);
  if (fam === 1) {
    const ok = Math.random() < 0.5;
    const { pts } = pointsEnLigne(3, ok ? [] : [1], 28, noms);
    const juste = ok ? "oui, ils sont alignés" : "non, ils ne sont pas alignés";
    return {
      text: `${un(DEBUT)} ${un([
        "Les trois points sont-ils alignés ?",
        "Ces trois points sont-ils sur une même ligne droite ?",
        "Peut-on tracer une droite qui passe par les trois points ?",
        `${noms[0]}, ${noms[1]} et ${noms[2]} sont-ils alignés ?`,
      ])}`,
      ...qcm(juste, ["oui, ils sont alignés", "non, ils ne sont pas alignés", "oui, parce qu'ils sont proches", "on ne peut pas le savoir"]),
      explanation: exp(
        "Trois points sont alignés quand une même droite passe par les trois.",
        "On pose la règle sur deux points et on regarde le troisième.",
        ok ? `La règle posée sur ${noms[0]} et ${noms[2]} passe aussi par ${noms[1]}.` : `${noms[1]} est à côté de la règle posée sur ${noms[0]} et ${noms[2]}.`,
        cap(juste) + ".",
      ),
      canvas: cadreDroites([], pts),
    };
  }
  if (fam === 2) {
    const intrus = entre(0, 3);
    const { pts, depart, fin } = pointsEnLigne(4, [intrus], 30, noms);
    return {
      text: `${un(DEBUT)} ${un(["Quel point n'est pas sur la droite ?", "Un point n'est pas sur la droite. Lequel ?", "Quel point est à côté de la droite ?"])}`,
      ...qcm(`le point ${noms[intrus]}`, noms.filter((_, i) => i !== intrus).map((n) => `le point ${n}`)),
      explanation: exp(
        "Un point est sur la droite quand le trait passe exactement par lui.",
        "On suit la droite du bout du doigt et on regarde chaque point.",
        `La droite passe par trois points, mais pas par ${noms[intrus]}.`,
        `C'est le point ${noms[intrus]}.`,
      ),
      canvas: cadreDroites([{ id: "d", type: "droite", from: rond(depart), to: rond(fin) }], pts),
    };
  }
  const k = entre(2, 4);
  const dehors = melange([0, 1, 2, 3, 4]).slice(0, 5 - k);
  const { pts, depart, fin } = pointsEnLigne(5, dehors, 30, ["A", "B", "C", "D", "E"]);
  return {
    text: `${un(DEBUT)} ${un(["Combien de points sont sur la droite ?", "Compte les points qui sont sur la droite.", "Combien de points la droite touche-t-elle ?"])}`,
    ...qcm(String(k), ["1", "2", "3", "4", "5"]),
    explanation: exp(
      "Un point est sur la droite quand le trait passe exactement par lui.",
      "On suit la droite et on compte les points qu'elle traverse.",
      `La droite traverse ${k} points ; les ${5 - k} autres sont à côté.`,
      `Il y en a ${k}.`,
    ),
    canvas: cadreDroites([{ id: "d", type: "droite", from: rond(depart), to: rond(fin) }], pts.map((p) => ({ x: p.x, y: p.y }))),
  };
}

const TRAITS = [
  { type: "segment" as const, nom: "un segment", bouts: "deux extrémités", a: "a deux extrémités" },
  { type: "demi_droite" as const, nom: "une demi-droite", bouts: "une seule extrémité", a: "a une seule extrémité" },
  { type: "droite" as const, nom: "une droite", bouts: "aucune extrémité", a: "n'a aucune extrémité" },
];
const COULEURS = [
  { nom: "rouge", hex: "#dc2626" },
  { nom: "bleu", hex: "#2563eb" },
  { nom: "vert", hex: "#16a34a" },
];

function alignement2(): Q {
  const fam = un([1, 2, 3, 4]);
  const noms = un(NOMS4);
  if (fam <= 2) {
    const t = un(TRAITS);
    const pente = un([-18, -12, -6, 0]);
    const d = dir(pente);
    const a = rond({ x: 105, y: 100 - d.y * 70 });
    const b = rond(plus(a, d, 140));
    // Une droite « extend » sort du cadre et perd ses flèches : on la dessine en deux
    // demi-droites partant de son milieu, et la demi-droite dépasse son second point.
    const m = rond(plus(a, d, 70));
    const lines: DroitesCanvasData["lines"] =
      t.type === "segment"
        ? [{ id: "t", type: "segment", from: a, to: b, strokeWidth: 4 }]
        : t.type === "demi_droite"
          ? [{ id: "t", type: "demi_droite", from: a, to: rond(plus(b, d, 60)), strokeWidth: 4 }]
          : [
              { id: "t1", type: "demi_droite", from: m, to: rond(plus(b, d, 55)), strokeWidth: 4 },
              { id: "t2", type: "demi_droite", from: m, to: rond(plus(a, d, -55)), strokeWidth: 4 },
            ];
    const canvas = cadreDroites(lines, [{ ...a, label: noms[0] }, { ...b, label: noms[1] }], 200);
    if (fam === 1)
      return {
        text: `${un(DEBUT)} ${un(["Comment s'appelle ce trait ?", "Quel est le nom de ce tracé ?", "Ce trait est-il un segment, une droite ou une demi-droite ?", `Le trait passe par ${noms[0]} et ${noms[1]}. Comment s'appelle-t-il ?`])}`,
        ...qcm(t.nom, ["un segment", "une demi-droite", "une droite", "un cercle"]),
        explanation: exp(
          "Un segment a deux extrémités, une demi-droite une seule, une droite aucune.",
          "On regarde les bouts du trait : une flèche veut dire qu'il continue sans fin.",
          `Ici le trait ${t.a} : c'est ${t.nom}.`,
          `C'est ${t.nom}.`,
        ),
        canvas,
      };
    const juste = t.type === "segment" ? "deux" : t.type === "demi_droite" ? "une seule" : "aucune";
    return {
      text: `${un(DEBUT)} ${un(["Combien d'extrémités a ce trait ?", "Ce trait s'arrête combien de fois ?", "Combien de bouts ce trait a-t-il ?"])}`,
      ...qcm(juste, ["aucune", "une seule", "deux", "trois"]),
      explanation: exp(
        "Une flèche au bout d'un trait veut dire qu'il continue sans fin : là, il n'y a pas d'extrémité.",
        "On regarde chaque bout du trait.",
        `Ce trait est ${t.nom} : il ${t.a}.`,
        `Réponse : ${juste}.`,
      ),
      canvas,
    };
  }
  if (fam === 3) {
    const ordre = melange([0, 1, 2]);
    const cible = un(TRAITS);
    const lines = ordre.flatMap((k, i): DroitesCanvasData["lines"] => {
      const y = 45 + i * 65;
      const from = { x: 95, y };
      const to = { x: 235, y: y + 10 };
      const c = { color: COULEURS[i].hex, strokeWidth: 4 };
      const d = dir(-4);
      if (TRAITS[k].type === "segment") return [{ id: `t${i}`, type: "segment" as const, from, to, ...c }];
      if (TRAITS[k].type === "demi_droite") return [{ id: `t${i}`, type: "demi_droite" as const, from, to: rond(plus(to, d, 55)), ...c }];
      const m = { x: 165, y: y + 5 };
      return [
        { id: `t${i}a`, type: "demi_droite" as const, from: m, to: rond(plus(to, d, 55)), ...c },
        { id: `t${i}b`, type: "demi_droite" as const, from: m, to: rond(plus(from, d, -55)), ...c },
      ];
    });
    const pts = ordre.flatMap((k, i) => (TRAITS[k].type === "droite" ? [] : TRAITS[k].type === "segment" ? [{ x: 95, y: 45 + i * 65 }, { x: 235, y: 55 + i * 65 }] : [{ x: 95, y: 45 + i * 65 }]));
    const ici = ordre.indexOf(TRAITS.indexOf(cible));
    return {
      text: `${un(DEBUT)} ${un([`Quel trait est ${cible.nom} ?`, `Trouve ${cible.nom}.`, `Lequel de ces traits est ${cible.nom} ?`])}`,
      ...qcm(`le trait ${COULEURS[ici].nom}`, COULEURS.map((c) => `le trait ${c.nom}`)),
      explanation: exp(
        "Un segment a deux extrémités, une demi-droite une seule, une droite aucune (des flèches aux deux bouts).",
        "On regarde les bouts de chaque trait.",
        `Le trait ${COULEURS[ici].nom} ${cible.a} : c'est ${cible.nom}.`,
        `C'est le trait ${COULEURS[ici].nom}.`,
      ),
      canvas: cadreDroites(lines, pts, 220),
    };
  }
  const t = un(TRAITS);
  return {
    text: un([
      `Comment appelle-t-on un trait qui ${t.a} ?`,
      `Un trait droit ${t.a}. Comment s'appelle-t-il ?`,
      `Quel trait droit ${t.a} ?`,
    ]),
    ...qcm(t.nom, ["un segment", "une demi-droite", "une droite", "un cercle"]),
    explanation: exp(
      "Un segment a deux extrémités, une demi-droite une seule, une droite aucune.",
      "On compte les bouts du trait : là où il s'arrête pour de bon.",
      `Un trait qui ${t.a}, c'est ${t.nom}.`,
      `C'est ${t.nom}.`,
    ),
  };
}

function alignement3(): Q {
  const noms = un(NOMS4);
  const ok = Math.random() < 0.5;
  const { pts } = pointsEnLigne(3, ok ? [] : [1], 11, noms);
  const regle = { id: "r", type: "droite" as const, from: { x: pts[0].x, y: pts[0].y }, to: { x: pts[2].x, y: pts[2].y }, dashed: true, color: "#f59e0b" };
  const p = un(ENFANTS);
  const juste = ok ? "oui, la règle touche les trois points" : `non, ${noms[1]} est à côté de la règle`;
  return {
    text: `${un(C_ALIGN)(p)} On pose la règle sur ${noms[0]} et ${noms[2]}. ${un([
      "Les trois points sont-ils alignés ?",
      `${noms[1]} est-il sur la même ligne que les deux autres ?`,
      "Que montre la règle ?",
    ])}`,
    ...qcm(juste, ["oui, la règle touche les trois points", `non, ${noms[1]} est à côté de la règle`, "non, ils sont trop loin", "on ne peut pas le savoir"]),
    explanation: exp(
      "Trois points sont alignés quand une même droite passe par les trois.",
      "On pose la règle sur deux points, puis on regarde le troisième.",
      ok ? `La règle (en pointillés) passe exactement par ${noms[1]}.` : `Un petit espace sépare ${noms[1]} de la règle : presque aligné veut dire pas aligné.`,
      cap(juste) + ".",
    ),
    canvas: cadreDroites([regle], pts),
  };
}

const C_ALIGN4 = [
  (p: string) => `${p} veut planter un troisième arbre aligné avec les deux premiers.`,
  (p: string) => `${p} veut poser un plot aligné avec les deux autres.`,
  () => "Le jardinier veut un troisième piquet aligné avec les deux premiers.",
  () => "Pic le paille-en-queue veut se poser dans l'alignement de deux poteaux.",
  (p: string) => `${p} veut coller une gommette alignée avec les deux autres.`,
  () => "L'architecte veut placer une colonne alignée avec les deux premières.",
  (p: string) => `Pour sa chasse au trésor, ${p} cherche le point aligné avec deux cailloux.`,
  () => "La pompière place un troisième cône aligné avec les deux premiers.",
];

function alignement4(): Q {
  const tous = un(NOMS4);
  const [a, b] = [tous[0], tous[1]];
  const cand = ["E", "F", "G"].map((n) => (tous.includes(n) ? ({ E: "X", F: "Y", G: "Z" } as Record<string, string>)[n] : n));
  const bon = entre(0, 2);
  const pente = un([-24, -18, -12]);
  const d = dir(pente);
  const nrm = { x: -d.y, y: d.x };
  const A = rond({ x: 50, y: 120 + Math.sin(rad(pente)) * 110 });
  const B = rond(plus(A, d, 80));
  const places = melange([150, 200, 250]);
  const pts = [
    { ...A, label: a },
    { ...B, label: b },
    ...cand.map((n, i) => ({ ...rond(plus(plus(A, d, places[i]), nrm, i === bon ? 0 : un([-1, 1]) * entre(22, 32))), label: n })),
  ];
  const p = un(ENFANTS);
  return {
    text: `${un(C_ALIGN4)(p)} ${un([`Quel point est aligné avec ${a} et ${b} ?`, `Où est la bonne place : en ${cand[0]}, en ${cand[1]} ou en ${cand[2]} ?`, `Quel point est sur la droite qui passe par ${a} et ${b} ?`])}`,
    ...qcm(`en ${cand[bon]}`, cand.map((n) => `en ${n}`)),
    explanation: exp(
      "Trois points sont alignés quand une même droite passe par les trois.",
      `On pose la règle sur ${a} et ${b}, et on la prolonge.`,
      `La règle prolongée passe par ${cand[bon]} ; elle laisse les deux autres points à côté.`,
      `Il faut le placer en ${cand[bon]}.`,
    ),
    canvas: cadreDroites([], pts),
  };
}

/* ═════════════════ ce2_angle_droit ═════════════════ */
function unAngle(deg: number, nomSommet?: string): DroitesCanvasData {
  const s = { x: 170, y: 130 };
  const depart = entre(0, 359);
  const lines = brasAngle("a", s, depart, deg, 95);
  // Recentre : on décale le sommet pour que les deux bras tiennent dans le cadre.
  const xs = [s.x, lines[0].to.x, lines[1].to.x];
  const ys = [s.y, lines[0].to.y, lines[1].to.y];
  const dx = Math.round(170 - (Math.min(...xs) + Math.max(...xs)) / 2);
  const dy = Math.round(120 - (Math.min(...ys) + Math.max(...ys)) / 2);
  const t = (p: Pt) => ({ x: p.x + dx, y: p.y + dy });
  return cadreDroites(
    lines.map((l) => ({ ...l, from: t(l.from), to: t(l.to), strokeWidth: 4 })),
    nomSommet ? [{ ...t(s), label: nomSommet }] : [t(s)],
  );
}

function angle1(): Q {
  const deg = Math.random() < 0.4 ? 90 : un(PAS_DROITS_NETS);
  const juste = verdictAngle(deg);
  return {
    text: `${un(DEBUT)} ${un(["Cet angle est-il droit ?", "Est-ce un angle droit ?", "Le coin de l'équerre irait-il pile dans cet angle ?", "Cet angle est-il un angle droit ?"])}`,
    ...qcm(juste, VERDICTS_ANGLE),
    explanation: exp(
      "Un angle droit a exactement l'ouverture du coin de l'équerre.",
      "On pose le coin de l'équerre sur le sommet, un bord le long d'un côté.",
      deg === 90 ? "L'autre côté longe exactement l'autre bord de l'équerre." : deg < 90 ? "L'autre côté passe à l'intérieur de l'équerre : l'angle est plus fermé." : "L'autre côté passe à l'extérieur de l'équerre : l'angle est plus ouvert.",
      cap(juste) + ".",
    ),
    canvas: unAngle(deg),
  };
}

/** Trois angles côte à côte, un seul droit. */
function troisAngles(noms: string[], ecarts: number[]) {
  const droitEn = entre(0, 2);
  const degs = [0, 1, 2].map((i) => (i === droitEn ? 90 : ecarts[i]));
  const lines = degs.flatMap((deg, i) => {
    // Un angle très ouvert part vers la gauche : son sommet se décale dans sa case.
    const s = { x: 25 + i * 110 + (deg > 100 ? 28 : 0), y: 115 };
    return brasAngle(`a${i}`, s, entre(0, 12), deg, 50).map((l) => ({ ...l, strokeWidth: 4 }));
  });
  const sommets = degs.map((deg, i) => ({ x: 25 + i * 110 + (deg > 100 ? 28 : 0), y: 115, label: noms[i] }));
  return { droitEn, canvas: cadreDroites(lines, sommets, 150) };
}

const OBJETS_ANGLE = [
  { nom: "le coin d'une feuille de cahier", droit: true },
  { nom: "le coin d'une porte", droit: true },
  { nom: "le coin d'une table carrée", droit: true },
  { nom: "le coin d'un livre", droit: true },
  { nom: "le coin d'une fenêtre", droit: true },
  { nom: "le coin d'une boîte à chaussures", droit: true },
  { nom: "le coin d'un tableau de la classe", droit: true },
  { nom: "le coin d'une carte à jouer", droit: true },
  { nom: "le coin d'un écran de tablette", droit: true },
  { nom: "le coin d'une tablette de chocolat", droit: true },
  { nom: "le coin d'une enveloppe", droit: true },
  { nom: "le coin d'un tapis rectangulaire", droit: true },
  { nom: "la pointe d'un crayon taillé", droit: false },
  { nom: "la pointe d'une part de pizza", droit: false },
  { nom: "le bord d'une assiette ronde", droit: false },
  { nom: "la pointe d'une étoile de Noël", droit: false },
  { nom: "le bout d'une flèche", droit: false },
  { nom: "le bord d'un ballon", droit: false },
  { nom: "le haut d'un toit très pointu", droit: false },
  { nom: "la pointe d'un cornet de glace", droit: false },
  { nom: "le bec de Pic le paille-en-queue", droit: false },
  { nom: "la pointe d'un chapeau de sorcière", droit: false },
];

function angle2(): Q {
  if (Math.random() < 0.55) {
    const noms = un(NOMS4);
    const { droitEn, canvas } = troisAngles(noms, melange([...PAS_DROITS_NETS]).slice(0, 3));
    return {
      text: `${un(DEBUT)} ${un(["Lequel de ces angles est droit ?", "Un seul angle est droit. Lequel ?", "Quel angle a la forme du coin de l'équerre ?", "Trouve l'angle droit."])}`,
      ...qcm(`l'angle en ${noms[droitEn]}`, [0, 1, 2].map((i) => `l'angle en ${noms[i]}`)),
      explanation: exp(
        "Un angle droit a exactement l'ouverture du coin de l'équerre.",
        "On présente l'équerre dans chaque angle, l'un après l'autre.",
        `Seul l'angle en ${noms[droitEn]} remplit le coin de l'équerre ; les autres sont trop fermés ou trop ouverts.`,
        `C'est l'angle en ${noms[droitEn]}.`,
      ),
      canvas,
    };
  }
  const o = un(OBJETS_ANGLE);
  const juste = o.droit ? "oui" : "non";
  return {
    text: un([
      `${cap(o.nom)} : est-ce un angle droit ?`,
      `Imagine ${o.nom}. Est-ce un angle droit ?`,
      `Tu poses l'équerre sur ${o.nom}. Trouves-tu un angle droit ?`,
    ]),
    ...qcm(juste, ["oui", "non", "seulement si on le tourne", "on ne peut pas le vérifier"]),
    explanation: exp(
      "Un angle droit remplit exactement le coin de l'équerre.",
      "On imagine qu'on pose l'équerre sur l'objet.",
      o.droit ? `${cap(o.nom)} remplit le coin de l'équerre : c'est un angle droit.` : `${cap(o.nom)} est trop pointu, ou n'a pas de coin du tout : ce n'est pas un angle droit.`,
      `Réponse : ${juste}.`,
    ),
  };
}

const C_CROISE = [
  "Sur le plan du parc, deux allées se croisent.",
  "Deux fils de la toile d'araignée se croisent.",
  (p: string) => `Voici les deux baguettes du cerf-volant ${de(p)}.`,
  "Sur la carte du facteur, deux rues se croisent.",
  "Le menuisier cloue deux planches l'une sur l'autre.",
  "Dans la fusée, deux rayons de lumière se croisent.",
  (p: string) => `Dans la cour, ${p} trace deux traits à la craie.`,
  "Deux branches se croisent dans la cabane.",
  (p: string) => `Sur son drapeau de pirate, ${p} dessine deux os croisés.`,
  "Le chef cuisinier pose deux baguettes de pain en croix.",
  "Au château, deux épées de bois sont accrochées en croix.",
  (p: string) => `${p} construit un épouvantail avec deux bâtons.`,
  "Sur le terrain de foot, deux lignes de craie se croisent.",
  "La couturière coud deux rubans en croix.",
];
const txt = (c: string | ((p: string) => string)) => (typeof c === "string" ? c : c(un(ENFANTS)));

function deuxTraitsCroises(deg: number, noms?: [string, string]): DroitesCanvasData {
  const c = { x: 170, y: 120 };
  const a = entre(0, 179);
  const d1 = dir(a);
  const d2 = dir(a + deg);
  if (noms) {
    // Des droites : le nom se pose au milieu de from–to, donc loin du croisement.
    return cadreDroites(
      [
        { id: "d1", type: "droite", from: rond(plus(c, d1, 25)), to: rond(plus(c, d1, 135)), strokeWidth: 3, label: `(${noms[0]})`, color: "#ea580c" },
        { id: "d2", type: "droite", from: rond(plus(c, d2, 25)), to: rond(plus(c, d2, 135)), strokeWidth: 3, label: `(${noms[1]})`, color: "#2563eb" },
      ],
      [],
    );
  }
  return cadreDroites(
    [
      { id: "d1", type: "segment", from: rond(plus(c, d1, -105)), to: rond(plus(c, d1, 105)), strokeWidth: 4 },
      { id: "d2", type: "segment", from: rond(plus(c, d2, -95)), to: rond(plus(c, d2, 95)), strokeWidth: 4 },
    ],
    [],
  );
}

function angle3(): Q {
  if (Math.random() < 0.5) {
    const droit = Math.random() < 0.5;
    const deg = droit ? 90 : un(PAS_DROITS_PROCHES);
    const juste = droit ? "oui, c'est un angle droit" : "non, ce n'est pas un angle droit";
    return {
      text: `${txt(un(C_CROISE))} ${un(["Les deux traits forment-ils un angle droit ?", "Y a-t-il un angle droit au croisement ?", "L'équerre irait-elle pile dans le coin du croisement ?"])}`,
      ...qcm(juste, ["oui, c'est un angle droit", "non, ce n'est pas un angle droit", "oui, parce qu'ils se croisent", "non, parce qu'ils sont penchés"]),
      explanation: exp(
        "Un angle est droit quand il remplit exactement le coin de l'équerre, même s'il est penché.",
        "On pose l'équerre au croisement, sans s'occuper de l'inclinaison.",
        droit ? "Le coin de l'équerre se loge exactement dans l'angle." : "L'équerre ne se loge pas exactement : se croiser ne suffit pas.",
        cap(juste) + ".",
      ),
      canvas: deuxTraitsCroises(deg),
    };
  }
  return compterAngles(false);
}

const C_FIGURE = [
  (p: string) => `${p} découpe une carte d'anniversaire.`,
  () => "Voici la fenêtre de la cabane.",
  () => "Voici la voile du bateau de Pic.",
  (p: string) => `${p} dessine le cerf-volant de ses rêves.`,
  () => "Voici le tapis de la bibliothèque.",
  (p: string) => `Voici la boîte à goûter ${de(p)}.`,
  () => "Voici un panneau du zoo.",
  () => "Voici l'étiquette d'un pot de confiture.",
  () => "Voici un carreau de la piscine.",
  () => "Voici la porte du château.",
  () => "L'architecte dessine le plan d'une maison.",
  (p: string) => `${p} plie une feuille pour faire un avion.`,
  () => "La maîtresse dessine une figure au tableau.",
  (p: string) => `Voici le jardin de la mamie ${de(p)}.`,
];
const FORMES_COMPTE = ["rectangle", "carre", "trapeze", "un_droit", "parallelogramme", "losange"] as const;

function compterAngles(penche: boolean): Q {
  const f = forme4(un(FORMES_COMPTE));
  const n = f.droits.length;
  return {
    text: `${un(C_FIGURE)(un(ENFANTS))} ${un(["Combien d'angles droits a cette figure ?", "Combien de coins droits comptes-tu ?", "Avec l'équerre, combien d'angles droits trouves-tu ?"])}${penche ? " Attention, elle est penchée." : ""}`,
    ...qcm(String(n), ["0", "1", "2", "3", "4"]),
    explanation: exp(
      "Un angle droit remplit exactement le coin de l'équerre, même si la figure est penchée.",
      "On présente l'équerre dans chaque coin, un par un, et on compte.",
      n === 0 ? "Aucun coin ne remplit l'équerre : ils sont tous trop fermés ou trop ouverts." : `${n} coin${n > 1 ? "s" : ""} rempli${n > 1 ? "ssent" : "t"} exactement l'équerre.`,
      `Il y en a ${n}.`,
    ),
    canvas: dessin4(f, un(NOMS4), { tourne: penche ? un([-30, -20, 20, 30, 45]) : 0, noms: false }),
  };
}

function angle4(): Q {
  if (Math.random() < 0.55) return compterAngles(true);
  const deg = un([90, 90, ...PAS_DROITS_PROCHES]);
  const juste = verdictAngle(deg);
  const p = un(ENFANTS);
  return {
    text: `${p} ${un(["a tourné sa feuille.", "a dessiné un angle tout penché.", "trace un angle pour son robot.", "dessine le toit de sa cabane."])} ${un(["Cet angle est-il droit ?", "Est-ce un angle droit ?", "L'équerre irait-elle pile dans cet angle ?"])}`,
    ...qcm(juste, VERDICTS_ANGLE),
    explanation: exp(
      "Un angle droit peut être penché : c'est son ouverture qui compte, pas sa position.",
      "On tourne l'équerre pour poser un bord le long d'un côté.",
      deg === 90 ? "L'autre côté longe exactement l'autre bord de l'équerre." : deg < 90 ? "L'autre côté passe à l'intérieur de l'équerre." : "L'autre côté passe à l'extérieur de l'équerre.",
      cap(juste) + ".",
    ),
    canvas: unAngle(deg),
  };
}

/* ═════════════════ ce2_angle_droit_codage ═════════════════ */
const Q_CODE = [
  "Quel angle est codé droit ?",
  "Où est le petit carré ?",
  "Le codage dit qu'un angle est droit. Lequel ?",
  "Quel angle porte le petit carré ?",
  "Où le codage annonce-t-il un angle droit ?",
  "Quel coin est marqué comme un angle droit ?",
  "D'après le codage, quel angle est droit ?",
];

function codage2(): Q {
  const noms = un(NOMS4);
  if (Math.random() < 0.5) {
    const droitEn = un(["B", "C"] as const);
    const idx = { A: 0, B: 1, C: 2 }[droitEn];
    return {
      text: `${un(["Regarde ce triangle.", "Voici un triangle.", "Observe le triangle.", "Voici un triangle codé.", "Regarde bien ce triangle.", "Voici le triangle."])} ${un(Q_CODE)}`,
      ...qcm(`l'angle en ${noms[idx]}`, [0, 1, 2].map((i) => `l'angle en ${noms[i]}`)),
      explanation: exp(
        "Le petit carré dans un coin dit que cet angle est droit.",
        "On cherche le petit carré sur la figure.",
        `Le petit carré est dans le coin ${noms[idx]}.`,
        `C'est l'angle en ${noms[idx]}.`,
      ),
      canvas: dessin3("rectangle", noms, { droitEn, code: true }),
    };
  }
  const f = forme4(un(["trapeze", "un_droit"] as const));
  const code = f.droits.length === 1 ? f.droits : [un(f.droits)];
  const i = code[0];
  return {
    text: `${un(["Regarde ce quadrilatère.", "Voici un quadrilatère.", "Observe la figure.", "Voici une figure codée.", "Regarde bien la figure.", "Voici le quadrilatère."])} ${un(Q_CODE)}`,
    ...qcm(`l'angle en ${noms[i]}`, [0, 1, 2, 3].map((k) => `l'angle en ${noms[k]}`)),
    explanation: exp(
      "Le petit carré dans un coin dit que cet angle est droit.",
      "On cherche le petit carré sur la figure.",
      `Le petit carré est dans le coin ${noms[i]}.`,
      `C'est l'angle en ${noms[i]}.`,
    ),
    canvas: dessin4(f, noms, { codeDroits: code }),
  };
}

const C_PLAN = [
  (p: string) => `Voici le plan de la cabane ${de(p)}.`,
  () => "L'architecte a codé son plan.",
  (p: string) => `${p} a codé la figure de son cahier.`,
  () => "Voici le plan du potager de l'école.",
  () => "La maîtresse a codé une figure au tableau.",
  () => "Voici le plan de la piscine.",
  (p: string) => `${p} a dessiné la carte au trésor du pirate.`,
  () => "Voici le plan du terrain de jeu.",
  () => "Le menuisier a codé le plan d'une table.",
  () => "Voici le plan de l'enclos des chèvres de la ferme.",
  (p: string) => `${p} recopie le plan d'une salle du musée.`,
  () => "Voici le plan de la base sur la Lune.",
];

function codage3(): Q {
  if (Math.random() < 0.5) {
    const f = forme4(un(["rectangle", "carre", "trapeze", "un_droit"] as const));
    const code = melange([...f.droits]).slice(0, entre(1, f.droits.length));
    const n = code.length;
    return {
      text: `${un(C_PLAN)(un(ENFANTS))} ${un(["Combien d'angles droits sont codés ?", "Combien de petits carrés vois-tu ?", "Combien d'angles le codage dit-il droits ?"])}`,
      ...qcm(String(n), ["0", "1", "2", "3", "4"]),
      explanation: exp(
        "Chaque petit carré dessiné dans un coin code un angle droit.",
        "On fait le tour de la figure en comptant les petits carrés.",
        `On compte ${n} petit${n > 1 ? "s" : ""} carré${n > 1 ? "s" : ""}.`,
        `${n} angle${n > 1 ? "s sont codés" : " est codé"}.`,
      ),
      canvas: dessin4(f, un(NOMS4), { codeDroits: code, noms: false }),
    };
  }
  const f = forme4(un(FORMES_COMPTE));
  const n = f.droits.length;
  const p = un(ENFANTS);
  return {
    text: `${p} ${un(["recopie cette figure.", "veut coder sa figure.", "finit le dessin de sa figure.", "code le plan de sa chambre."])} ${un(["Combien de petits carrés faut-il dessiner ?", "Combien d'angles droits faut-il coder ?", "Combien de petits carrés faut-il ?"])}`,
    ...qcm(String(n), ["0", "1", "2", "3", "4"]),
    explanation: exp(
      "On dessine un petit carré dans chaque angle droit, et seulement là.",
      "On cherche les angles droits à l'équerre, puis on les code.",
      n === 0 ? "Aucun coin ne remplit l'équerre : on ne dessine aucun petit carré." : `${n} coin${n > 1 ? "s" : ""} rempli${n > 1 ? "ssent" : "t"} l'équerre : il faut ${n} petit${n > 1 ? "s" : ""} carré${n > 1 ? "s" : ""}.`,
      `Il en faut ${n}.`,
    ),
    canvas: dessin4(f, un(NOMS4), { noms: false }),
  };
}

function codage4(): Q {
  const noms = un(NOMS4);
  const f = forme4(un(["rectangle", "carre", "trapeze"] as const));
  const code = melange([...f.droits]).slice(0, Math.max(1, f.droits.length - entre(1, 2)));
  const nonCode = [0, 1, 2, 3].filter((i) => !code.includes(i));
  const demande = Math.random() < 0.5 ? un(code) : un(nonCode);
  const oui = code.includes(demande);
  const juste = oui ? "oui, le codage l'affirme" : "on ne sait pas : il n'est pas codé";
  return {
    text: `${un(C_PLAN)(un(ENFANTS))} ${un([`D'après le codage, l'angle en ${noms[demande]} est-il droit ?`, `Que dit le codage de l'angle en ${noms[demande]} ?`, `Le codage annonce-t-il un angle droit en ${noms[demande]} ?`])}`,
    ...qcm(juste, ["oui, le codage l'affirme", "on ne sait pas : il n'est pas codé", "non, jamais", "oui, puisqu'il en a l'air"]),
    explanation: exp(
      "Un codage affirme exactement ce qu'il montre, ni plus, ni moins.",
      "On regarde s'il y a un petit carré dans ce coin-là.",
      oui ? `Le coin ${noms[demande]} porte le petit carré : l'angle est droit, sans rien vérifier.` : `Le coin ${noms[demande]} n'a pas de petit carré : le codage ne dit rien. Il faudrait l'équerre.`,
      cap(juste) + ".",
    ),
    canvas: dessin4(f, noms, { codeDroits: code }),
  };
}

/* ═════════════════ ce2_segments_codage ═════════════════ */
/* ⛔ UN SEUL GROUPE DE PETITS TRAITS PAR FIGURE (10/11/2026). QuadrilatereCanvas
   décale les deux traits d'un second groupe le long de la NORMALE au côté : ils se
   superposent et se lisent comme un seul trait, plus long. Tant que ce n'est pas
   réparé, un rectangle ou un cerf-volant ne code ici qu'une paire de côtés. */
type Fig2 = { canvas: CanvasFigure; groupe: string[]; cotes: string[] };
function figureCodee(noms: string[], cote?: string): Fig2 {
  const k = un(["rectangle", "losange", "isocele", "cerf", "carre"] as const);
  const n = (s: string) => s.split("").map((l) => noms["ABCD".indexOf(l)]).join("");
  if (k === "isocele") {
    return {
      canvas: dessin3("isocele", noms, { code: true, cotes: cote ? { AB: cote } : undefined }),
      groupe: [n("AB"), n("CA")],
      cotes: [n("AB"), n("BC"), n("CA")],
    };
  }
  const cotes4 = [n("AB"), n("BC"), n("CD"), n("DA")];
  const f: Forme4 =
    k === "cerf"
      ? { nom: "cerf-volant", pts: [{ x: 90, y: 0 }, { x: 180, y: 55 }, { x: 90, y: 150 }, { x: 0, y: 55 }], droits: [], egaux: [["AB", "DA"]] }
      : k === "rectangle"
        ? { ...forme4("rectangle"), egaux: [["AB", "CD"]] }
        : forme4(k);
  return {
    canvas: dessin4(f, noms, { codeEgaux: true, codeDroits: k === "carre" ? [0, 1, 2, 3] : [] }),
    groupe: k === "cerf" ? [n("AB"), n("DA")] : k === "rectangle" ? [n("AB"), n("CD")] : cotes4,
    cotes: cotes4,
  };
}

function segments2(): Q {
  const noms = un(NOMS4);
  const fig = figureCodee(noms);
  if (fig.groupe.length === 2 && Math.random() < 0.65) {
    const [x, y] = melange([...fig.groupe]);
    return {
      text: `${un(DEBUT)} ${un([`Quel côté a la même longueur que ${x} ?`, `Le côté ${x} porte un petit trait. Quel autre côté a le même codage ?`, `D'après le codage, quel côté est aussi long que ${x} ?`, `Quel côté porte le même codage que ${x} ?`, `Trouve le côté qui mesure autant que ${x}.`, `Un autre côté a la même longueur que ${x}. Lequel ?`])}`,
      ...qcm(y, [...fig.cotes.filter((c) => c !== x), "aucun côté"]),
      explanation: exp(
        "Deux côtés qui portent le même petit trait ont la même longueur.",
        `On regarde le trait sur ${x}, puis on cherche l'autre côté qui porte le même.`,
        `${y} porte le même codage que ${x} : ils ont la même longueur.`,
        `C'est ${y}.`,
      ),
      canvas: fig.canvas,
    };
  }
  const x = fig.groupe[0];
  const n = fig.groupe.length - 1;
  return {
    text: `${un(DEBUT)} ${un([`Combien d'autres côtés ont la même longueur que ${x} ?`, `Combien de côtés ont le même codage que ${x}, sans compter ${x} ?`, `À part ${x}, combien de côtés portent le même codage ?`, `Combien d'autres côtés sont aussi longs que ${x} ?`])}`,
    ...qcm(String(n), ["0", "1", "2", "3"]),
    explanation: exp(
      "Deux côtés qui portent le même codage ont la même longueur.",
      `On cherche tous les côtés qui portent le même petit trait que ${x}.`,
      `${n} autre${n > 1 ? "s" : ""} côté${n > 1 ? "s" : ""} porte${n > 1 ? "nt" : ""} le même codage que ${x}.`,
      `Il y en a ${n}.`,
    ),
    canvas: fig.canvas,
  };
}

const C_OBJET = [
  (p: string) => `${p} a codé une figure.`,
  () => "Voici un panneau du zoo.",
  () => "Voici le patron d'un coussin.",
  (p: string) => `Voici l'étiquette du cadeau ${de(p)}.`,
  () => "Voici un drapeau du château.",
  (p: string) => `Voici une gommette géante ${de(p)}.`,
  () => "La maîtresse a codé une figure.",
  () => "Pic le paille-en-queue a dessiné une figure codée.",
  () => "Voici le plan d'un massif de fleurs.",
  () => "La couturière a codé une pièce de tissu.",
  () => "L'architecte a codé une figure.",
  (p: string) => `Voici une pièce du puzzle ${de(p)}.`,
  () => "Voici le plan d'une piste de danse.",
]

function segments3(): Q {
  const noms = un(NOMS4);
  const m = entre(3, 14);
  const fig = figureCodee(noms, `${m} cm`);
  const x = fig.groupe[0];
  const y = un(fig.groupe.filter((c) => c !== x));
  return {
    text: `${un(C_OBJET)(un(ENFANTS))} ${x} mesure ${m} cm. ${un([`Combien mesure ${y} ?`, `Quelle est la longueur de ${y} ?`, `Sans règle, trouve la longueur de ${y}.`])}`,
    ...qcmN(m, [m + 1, m - 1, m * 2, m + 2, m + 10], "cm"),
    explanation: exp(
      "Deux côtés qui portent le même codage ont la même longueur.",
      "On reporte la longueur connue sur le côté qui porte le même codage.",
      `${y} porte le même codage que ${x} : il mesure aussi ${m} cm.`,
      `${y} mesure ${m} cm.`,
    ),
    canvas: fig.canvas,
  };
}

function segments4(): Q {
  const noms = un(NOMS4);
  if (Math.random() < 0.5) {
    const m = entre(3, 12);
    const fig = figureCodee(noms, `${m} cm`);
    const n = fig.groupe.length;
    return {
      text: `${un(C_OBJET)(un(ENFANTS))} ${fig.groupe[0]} mesure ${m} cm. ${un([`Combien de côtés mesurent ${m} cm ?`, `D'après le codage, combien de côtés font ${m} cm ?`, "Combien de côtés ont cette longueur ?"])}`,
      ...qcm(String(n), ["1", "2", "3", "4"]),
      explanation: exp(
        "Tous les côtés qui portent le même codage ont la même longueur.",
        `On compte les côtés qui portent le même petit trait que ${fig.groupe[0]}, sans oublier ${fig.groupe[0]}.`,
        `${n} côtés portent ce codage : ils mesurent tous ${m} cm.`,
        `${n} côtés mesurent ${m} cm.`,
      ),
      canvas: fig.canvas,
    };
  }
  const cas = un([
    { desc: "les quatre côtés portent le même trait", bonne: "les quatre côtés sont égaux" },
    { desc: "deux côtés portent un trait, les deux autres en portent deux", bonne: "les côtés sont égaux deux par deux" },
    { desc: "aucun côté ne porte de trait", bonne: "rien n'est affirmé sur les longueurs" },
    { desc: "trois côtés portent un trait, le dernier n'en a pas", bonne: "trois côtés sont égaux" },
  ]);
  const p = un(ENFANTS);
  return {
    text: `${un([`${p} a codé un quadrilatère :`, `Sur le plan ${de(p)},`, "Sur la figure de la maîtresse,", "Sur un quadrilatère,", "Sur le plan de l'architecte,", `Sur le dessin ${de(p)},`])} ${cas.desc}. ${un(["Que sait-on des longueurs ?", "Que dit ce codage ?", "Qu'apprend-on sur les côtés ?"])}`,
    ...qcm(cas.bonne, ["les quatre côtés sont égaux", "les côtés sont égaux deux par deux", "rien n'est affirmé sur les longueurs", "trois côtés sont égaux", "tous les côtés sont différents"]),
    explanation: exp(
      "Deux côtés sont égaux quand ils portent le même nombre de traits.",
      "On range les côtés par codage et on compte les groupes.",
      `Ici, ${cas.desc} : ${cas.bonne}.`,
      cap(cas.bonne) + ".",
    ),
  };
}

/* ═════════════════ ce2_droite_perpendiculaire ═════════════════ */
function perp2(): Q {
  const [a, b, c] = melange([...NOMS_DROITES]);
  if (Math.random() < 0.5) {
    const droit = Math.random() < 0.5;
    const juste = droit ? "oui, elles sont perpendiculaires" : "non, elles ne sont pas perpendiculaires";
    return {
      text: `${un(DEBUT)} ${un([`Les droites (${a}) et (${b}) sont-elles perpendiculaires ?`, `(${a}) et (${b}) forment-elles un angle droit ?`, `Les deux droites sont-elles perpendiculaires ?`])}`,
      ...qcm(juste, ["oui, elles sont perpendiculaires", "non, elles ne sont pas perpendiculaires", "non, elles ne se coupent pas", "oui, parce qu'elles se croisent"]),
      explanation: exp(
        "Deux droites sont perpendiculaires quand elles se coupent en formant un angle droit.",
        "On pose l'équerre au point de croisement.",
        droit ? "L'équerre se loge exactement dans l'angle du croisement." : "Elles se coupent, mais l'angle n'est pas droit : se croiser ne suffit pas.",
        cap(juste) + ".",
      ),
      canvas: deuxTraitsCroises(droit ? 90 : un(PAS_DROITS_NETS), [a, b]),
    };
  }
  return troisDroites(a, b, c, false);
}

/** Trois droites : (a) coupe (b) à angle droit, (c) coupe (a) de travers. */
function troisDroites(a: string, b: string, c: string, ctx: boolean): Q {
  const o = { x: 170, y: 120 };
  const t = entre(0, 179);
  const da = dir(t);
  const db = dir(t + 90);
  const dc = dir(t + un([50, 130]));
  // Les croisements tombent à −65 et +65 sur (a) ; chaque nom se pose au milieu de
  // from–to, donc loin des croisements, et du côté où il reste de la place.
  const pa = plus(o, da, -65);
  const pc = plus(o, da, 65);
  const versLaPlace = (p: Pt, d: Pt) => {
    const m1 = plus(p, d, 75);
    const m2 = plus(p, d, -75);
    const marge = (m: Pt) => Math.min(m.x, 340 - m.x, m.y, 240 - m.y);
    return marge(m1) >= marge(m2) ? 1 : -1;
  };
  const sb = versLaPlace(pa, db);
  const sc = versLaPlace(pc, dc);
  const lines = [
    { id: "a", type: "droite" as const, from: rond(plus(o, da, -25)), to: rond(plus(o, da, 25)), label: `(${a})`, strokeWidth: 3, color: "#ea580c" },
    { id: "b", type: "droite" as const, from: rond(plus(pa, db, sb * 40)), to: rond(plus(pa, db, sb * 110)), label: `(${b})`, strokeWidth: 3, color: "#2563eb" },
    { id: "c", type: "droite" as const, from: rond(plus(pc, dc, sc * 40)), to: rond(plus(pc, dc, sc * 110)), label: `(${c})`, strokeWidth: 3, color: "#16a34a" },
  ];
  const debut = ctx ? `${txt(un(C_CARTE))} ` : `${un(DEBUT)} `;
  return {
    text: `${debut}${un([`Quelle droite est perpendiculaire à (${a}) ?`, `Laquelle coupe (${a}) en formant un angle droit ?`, `Trouve la perpendiculaire à (${a}).`])}`,
    ...qcm(`(${b})`, [`(${c})`, "aucune des deux", "les deux"]),
    explanation: exp(
      "Deux droites sont perpendiculaires quand elles se coupent en formant un angle droit.",
      `On pose l'équerre là où chaque droite coupe (${a}).`,
      `(${b}) coupe (${a}) à angle droit ; (${c}) la coupe de travers.`,
      `C'est (${b}).`,
    ),
    canvas: cadreDroites(lines, []),
  };
}
const C_CARTE = [
  "Sur la carte au trésor, trois chemins se croisent.",
  "Sur le plan de la ville, trois rues se croisent.",
  (p: string) => `${p} trace trois droites sur son cahier.`,
  "Le jardinier tend trois cordes dans le potager.",
  "Au cirque, trois fils sont tendus pour l'acrobate.",
  "Sur le plan du zoo, trois allées se croisent.",
  (p: string) => `Dans la cour, ${p} trace trois lignes à la craie.`,
  "Sur la carte de la forêt, trois sentiers se croisent.",
  "Le peintre trace trois traits sur un mur.",
  "Sur le plan de la gare, trois voies se croisent.",
];

const FIG_PERP: Array<{ quoi: "rectangle" | "carre" | "trapeze"; mot: string }> = [
  { quoi: "rectangle", mot: "le rectangle" },
  { quoi: "carre", mot: "le carré" },
  { quoi: "trapeze", mot: "ce quadrilatère" },
];

function perp3(): Q {
  if (Math.random() < 0.4) {
    const [a, b, c] = melange([...NOMS_DROITES]);
    return troisDroites(a, b, c, true);
  }
  const noms = un(NOMS4);
  const fp = un(FIG_PERP);
  const f = forme4(fp.quoi);
  const s = un(f.droits); // un sommet à angle droit
  const prec = (s + 3) % 4;
  const suiv = (s + 1) % 4;
  const cote = (i: number, j: number) => noms[i] + noms[j];
  const donne = Math.random() < 0.5 ? cote(prec, s) : cote(s, suiv);
  const juste = donne === cote(prec, s) ? cote(s, suiv) : cote(prec, s);
  const p = un(ENFANTS);
  return {
    text: `${un([`Voici le plan de la chambre ${de(p)}.`, "Voici le terrain de foot de l'école.", `${p} dessine une figure.`, "Voici la porte du château fort.", "Voici le plan d'un aquarium.", "Voici l'enclos des lapins de la ferme.", `Voici la carte de visite ${de(p)}.`, "La maîtresse a dessiné une figure codée."])} ${un([`Quel côté est perpendiculaire à ${donne}, au point ${noms[s]} ?`, `Au point ${noms[s]}, quel côté fait un angle droit avec ${donne} ?`])}`,
    ...qcm(juste, [cote((s + 1) % 4, (s + 2) % 4), cote((s + 2) % 4, (s + 3) % 4), "aucun côté"]),
    explanation: exp(
      "Deux côtés sont perpendiculaires quand ils se rejoignent en formant un angle droit.",
      `On regarde les deux côtés qui partent du point ${noms[s]}.`,
      `Au point ${noms[s]}, ${donne} et ${juste} se rejoignent, et le petit carré dit que l'angle est droit.`,
      `C'est ${juste}.`,
    ),
    canvas: dessin4(f, noms, { codeDroits: f.droits }),
  };
}

function perp4(): Q {
  if (Math.random() < 0.5) {
    const droit = Math.random() < 0.5;
    const [a, b] = melange([...NOMS_DROITES]);
    const juste = droit ? "oui, elles se coupent en formant un angle droit" : "non, elles se coupent mais l'angle n'est pas droit";
    return {
      text: `${txt(un(C_CROISE))} ${un([`Les droites (${a}) et (${b}) sont-elles perpendiculaires ?`, "Ces deux droites sont-elles perpendiculaires ?", `(${a}) est-elle perpendiculaire à (${b}) ?`])}`,
      ...qcm(juste, ["oui, elles se coupent en formant un angle droit", "non, elles se coupent mais l'angle n'est pas droit", "non, elles ne se coupent pas", "oui, parce qu'elles sont penchées pareil"]),
      explanation: exp(
        "Deux droites sont perpendiculaires si elles se coupent ET si l'angle est droit.",
        "On vérifie le croisement, puis on pose l'équerre.",
        droit ? "Elles se croisent, et l'équerre se loge exactement dans l'angle." : "Elles se croisent, mais l'équerre ne se loge pas dans l'angle.",
        cap(juste) + ".",
      ),
      canvas: deuxTraitsCroises(droit ? 90 : un(PAS_DROITS_PROCHES), [a, b]),
    };
  }
  // Une figure penchée et codée : quelle paire de côtés est perpendiculaire ?
  const noms = un(NOMS4);
  const f = forme4(un(["trapeze", "un_droit"] as const));
  const s = un(f.droits);
  const cote = (i: number, j: number) => noms[i] + noms[j];
  const juste = `${cote((s + 3) % 4, s)} et ${cote(s, (s + 1) % 4)}`;
  const faux = [0, 1, 2, 3].filter((k) => !f.droits.includes(k)).map((k) => `${cote((k + 3) % 4, k)} et ${cote(k, (k + 1) % 4)}`);
  faux.push(`${cote(0, 1)} et ${cote(2, 3)}`);
  return {
    text: `${un(C_PLAN)(un(ENFANTS))} La figure est penchée. ${un(["Quels côtés sont perpendiculaires ?", "Quels deux côtés forment un angle droit ?"])}`,
    ...qcm(juste, faux),
    explanation: exp(
      "Deux côtés sont perpendiculaires quand ils se rejoignent en formant un angle droit, même sur une figure penchée.",
      "On cherche le petit carré, puis les deux côtés qui partent de ce coin.",
      `Le petit carré est en ${noms[s]} : ${juste} sont perpendiculaires.`,
      `Ce sont ${juste}.`,
    ),
    canvas: dessin4(f, noms, { codeDroits: [s], tourne: un([-25, -15, 15, 25]) }),
  };
}

/* ═════════════════ ce2_droite_defi ═════════════════ */
const C_DEFI = [
  (p: string) => `${p} a codé une figure secrète.`,
  () => "Ti Margo a caché une figure derrière ses codages.",
  () => "Pic le paille-en-queue a dessiné une figure codée.",
  (p: string) => `Pour une énigme, ${p} code une figure.`,
  () => "L'architecte a codé le plan d'une pièce.",
  () => "La maîtresse propose une devinette.",
  (p: string) => `${p} prépare un défi pour la classe.`,
  () => "Dans la chasse au trésor, l'indice est une figure codée.",
  (p: string) => `${p} et sa classe jouent aux devinettes de figures.`,
  () => "Le magicien du cirque montre une figure codée.",
];

function defi1(): Q {
  const noms = un(NOMS4);
  const k = un(["carre", "rectangle", "losange", "tri"] as const);
  const bonne = { carre: "un carré", rectangle: "un rectangle", losange: "un losange", tri: "un triangle rectangle" }[k];
  const canvas: CanvasFigure =
    k === "tri"
      ? dessin3("rectangle", noms, { code: true })
      : dessin4(forme4(k), noms, { codeDroits: k === "losange" ? [] : [0, 1, 2, 3], codeEgaux: k !== "rectangle", tourne: un([0, 0, -15, 15]) });
  const mot = k === "tri" ? "triangle" : "quadrilatère";
  return {
    text: `${un(C_DEFI)(un(ENFANTS))} ${un(["Lis tous les codages. Quelle figure est-ce ?", "Quelle est cette figure ?", `Ce ${mot} est codé. Comment s'appelle-t-il ?`])}`,
    ...qcm(bonne, ["un carré", "un rectangle", "un losange", "un triangle rectangle"]),
    explanation: exp(
      "Les codages se lisent ensemble : les petits carrés parlent des angles, les traits parlent des côtés.",
      "On traduit chaque codage, puis on cherche la figure qui a tout cela.",
      k === "carre"
        ? "Quatre angles droits et quatre côtés au même codage : c'est un carré."
        : k === "rectangle"
          ? "Quatre angles droits, et rien ne dit que les quatre côtés sont égaux : c'est un rectangle."
          : k === "losange"
            ? "Quatre côtés au même codage, sans angle droit : c'est un losange."
            : "Trois côtés et un petit carré : c'est un triangle rectangle.",
      `C'est ${bonne}.`,
    ),
    canvas,
  };
}

const C_TOUR = [
  (p: string) => `${p} colle un ruban tout autour d'une carte.`,
  () => "Le jardinier pose une clôture autour du potager.",
  (p: string) => `${p} fait le tour du tapis en marchant au bord.`,
  () => "La couturière coud une dentelle autour d'un coussin.",
  () => "Pic le paille-en-queue vole tout autour du jardin.",
  (p: string) => `${p} met une guirlande autour d'une fenêtre.`,
  () => "Le pâtissier pose un ruban autour d'une boîte de gâteaux.",
  () => "La gardienne du zoo fait le tour de l'enclos.",
  (p: string) => `${p} entoure son dessin d'un cadre.`,
  () => "Le peintre trace une bordure autour d'un tableau.",
];

function defi2(): Q {
  const L = entre(5, 15);
  const l = entre(2, Math.min(9, L - 1));
  const tour = 2 * (L + l);
  const noms = un(NOMS4);
  const f = forme4("rectangle");
  return {
    text: `${un(C_TOUR)(un(ENFANTS))} ${noms[0]}${noms[1]} mesure ${L} cm et ${noms[1]}${noms[2]} mesure ${l} cm. ${un(["Combien mesure le tour de ce rectangle ?", "Quelle est la longueur du tour du rectangle ?", "Quel est le tour de ce rectangle ?"])}`,
    ...qcmN(tour, [L + l, 2 * L + l, L + 2 * l, tour + 2, tour - 2], "cm"),
    explanation: exp(
      "Dans un rectangle, les côtés qui se font face ont la même longueur.",
      "On additionne les quatre côtés, sans en oublier : deux longueurs et deux largeurs.",
      `${L} + ${l} + ${L} + ${l} = ${tour}.`,
      `Le tour mesure ${tour} cm.`,
    ),
    canvas: dessin4(f, noms, { codeDroits: [0, 1, 2, 3] }),
  };
}


const G = (micro: string) => atelier("ce2", "droites_angles", micro);
const AL = G("ce2_droite_alignement");
const AD = G("ce2_angle_droit");
const ADC = G("ce2_angle_droit_codage");
const SC = G("ce2_segments_codage");
const PP = G("ce2_droite_perpendiculaire");
const DF = G("ce2_droite_defi");

export const droitesAnglesBank: TutorBankItemV4[] = [
  {
    kind: "fixed",
    id: "ce2_droite_alignement_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "droites_angles",
    microId: "ce2_droite_alignement",
    difficulty: 1,
    theme: "neutral",
    text: "Comment vérifie-t-on que trois points sont alignés ?",
    format: "qcm",
    choices: [
      "on pose la règle et on regarde si elle touche les trois points",
      "on regarde bien de loin",
      "on les compte",
      "on mesure la distance entre eux",
    ],
    expected: ["on pose la règle et on regarde si elle touche les trois points"],
    comparator: "mcq_exact",
    hint: "L'œil se trompe. Un instrument, non.",
    explanation: exp(
      "Trois points sont alignés quand une même droite les traverse tous les trois.",
      "On pose le bord de la règle sur deux des points, puis on regarde le troisième.",
      "Si la règle touche aussi le troisième point, ils sont alignés. Si un tout petit espace apparaît, ils ne le sont pas — même si à l'œil, cela ne se voyait pas.",
      "On pose la règle.",
    ),
    tags: ["ce2", "droites_angles", "alignement", "methode", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_droite_alignement_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "droites_angles",
    microId: "ce2_droite_alignement",
    difficulty: 4,
    theme: "neutral",
    text: "Ces trois points ont l'air alignés. Léa pose sa règle sur A et C : elle voit un petit espace au niveau de B. Que faut-il conclure ?",
    format: "qcm",
    choices: [
      "les trois points ne sont pas alignés",
      "ils sont alignés, l'espace ne compte pas",
      "il faut regarder de plus loin",
      "on ne peut pas savoir",
    ],
    expected: ["les trois points ne sont pas alignés"],
    comparator: "mcq_exact",
    hint: "La règle a tranché. L'œil n'a pas son mot à dire.",
    explanation: exp(
      "Trois points sont alignés seulement si une même droite les traverse tous les trois.",
      "On pose la règle sur deux points et on observe le troisième.",
      "B n'est pas sur la droite qui passe par A et C : il s'en écarte d'un cheveu. Ce n'est pas « presque aligné » — en géométrie, presque aligné veut dire pas aligné.",
      "Les trois points ne sont pas alignés.",
    ),
    tags: ["ce2", "droites_angles", "alignement", "piege", "qcm", "canvas"],
    canvas: troisPoints(false),
  },
  {
    kind: "fixed",
    id: "ce2_droite_alignement_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "droites_angles",
    microId: "ce2_droite_alignement",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la différence entre un segment et une droite ?",
    format: "qcm",
    choices: [
      "le segment a deux extrémités, la droite continue sans fin",
      "le segment est courbe, la droite est droite",
      "le segment est plus court à dessiner",
      "il n'y a aucune différence",
    ],
    expected: ["le segment a deux extrémités, la droite continue sans fin"],
    comparator: "mcq_exact",
    hint: "Peux-tu dessiner une droite EN ENTIER sur ta feuille ?",
    explanation: exp(
      "Un segment est limité par deux extrémités ; une droite se prolonge sans fin des deux côtés.",
      "On regarde si le trait s'arrête à des points précis ou s'il déborde de la feuille.",
      "Le segment [AB] va de A à B et s'arrête là. La droite (AB) passe par A et B mais continue au-delà : on n'en dessine qu'un morceau, faute de place. La demi-droite, elle, s'arrête d'un seul côté.",
      "Le segment a deux extrémités, la droite n'en a aucune.",
    ),
    tags: ["ce2", "droites_angles", "alignement", "definition", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_angle_droit_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "droites_angles",
    microId: "ce2_angle_droit",
    difficulty: 1,
    theme: "neutral",
    text: "Comment vérifie-t-on qu'un angle est droit ?",
    format: "qcm",
    choices: [
      "on présente le coin de l'équerre dans l'angle",
      "on le mesure avec la règle graduée",
      "on regarde s'il est joli",
      "on le compare au coin de la gomme",
    ],
    expected: ["on présente le coin de l'équerre dans l'angle"],
    comparator: "mcq_exact",
    hint: "L'équerre porte elle-même un angle droit : c'est son étalon.",
    explanation: exp(
      "L'équerre porte un angle droit qui sert de modèle.",
      "On glisse le coin de l'équerre dans l'angle à vérifier, en faisant coïncider les deux bords.",
      "Si l'angle remplit exactement le coin de l'équerre, sans jour ni dépassement, il est droit. La règle graduée mesure des longueurs, pas des angles.",
      "On présente le coin de l'équerre.",
    ),
    tags: ["ce2", "droites_angles", "angle_droit", "methode", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_angle_droit_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "droites_angles",
    microId: "ce2_angle_droit",
    difficulty: 4,
    theme: "neutral",
    text: "Ces deux droites sont penchées, aucune n'est horizontale. L'équerre montre qu'elles forment un angle droit. Est-ce vraiment un angle droit ?",
    format: "qcm",
    choices: [
      "oui, un angle droit peut être penché",
      "non, un angle droit doit avoir un trait horizontal",
      "non, il faut que les droites soient droites sur la feuille",
      "on ne peut pas savoir",
    ],
    expected: ["oui, un angle droit peut être penché"],
    comparator: "mcq_exact",
    hint: "Tourne la feuille : l'angle change-t-il ?",
    explanation: exp(
      "Un angle droit est un angle qui remplit exactement le coin de l'équerre, quelle que soit son orientation.",
      "On présente l'équerre en la tournant comme il faut, sans exiger que les traits soient horizontaux.",
      "L'équerre remplit l'angle : il est droit. En tournant la feuille, les deux droites se retrouveraient l'une horizontale, l'autre verticale — sans que l'angle ait bougé.",
      "Oui, c'est bien un angle droit.",
    ),
    tags: ["ce2", "droites_angles", "angle_droit", "piege", "qcm", "canvas"],
    canvas: deuxDroites(true, true),
  },
  {
    kind: "fixed",
    id: "ce2_angle_droit_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "droites_angles",
    microId: "ce2_angle_droit",
    difficulty: 2,
    theme: "neutral",
    text: "Combien d'angles droits y a-t-il dans un rectangle ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "Vérifie les quatre coins avec l'équerre.",
    explanation: exp(
      "Un rectangle a quatre angles droits : c'est ce qui le définit.",
      "On présente l'équerre dans chacun des quatre coins.",
      "Les quatre coins remplissent exactement l'équerre. C'est vrai aussi pour le carré, qui est un rectangle avec en plus quatre côtés égaux.",
      "Il y en a 4.",
    ),
    tags: ["ce2", "droites_angles", "angle_droit", "remarquable"],
  },
  {
    kind: "fixed",
    id: "ce2_angle_droit_codage_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "droites_angles",
    microId: "ce2_angle_droit_codage",
    difficulty: 2,
    theme: "neutral",
    text: "Sur une figure, que veut dire le petit carré dessiné dans un coin ?",
    format: "qcm",
    choices: [
      "cet angle est droit",
      "cet angle est à mesurer",
      "ce coin est important",
      "ce coin est un carré",
    ],
    expected: ["cet angle est droit"],
    comparator: "mcq_exact",
    hint: "C'est un message écrit par celui qui a fait le dessin.",
    explanation: exp(
      "Le codage est un message : il dit ce qui est vrai sur la figure sans qu'on ait à le mesurer.",
      "On lit les codages avant de commencer, comme on lit une consigne.",
      "Le petit carré dans un coin annonce que cet angle est droit. Ce n'est pas une question, c'est une information donnée.",
      "Il veut dire que cet angle est droit.",
    ),
    tags: ["ce2", "droites_angles", "codage", "definition", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_angle_droit_codage_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "droites_angles",
    microId: "ce2_angle_droit_codage",
    difficulty: 4,
    theme: "neutral",
    text: "Un angle porte déjà le petit carré du codage. Faut-il quand même le vérifier à l'équerre ?",
    format: "qcm",
    choices: [
      "non, le codage l'affirme déjà",
      "oui, toujours",
      "oui, si la figure est penchée",
      "seulement si l'angle a l'air bizarre",
    ],
    expected: ["non, le codage l'affirme déjà"],
    comparator: "mcq_exact",
    hint: "Le codage n'est pas une question posée : c'est une réponse donnée.",
    explanation: exp(
      "Un codage affirme une propriété de la figure : il n'y a rien à vérifier derrière.",
      "On lit le codage et on l'utilise comme une information sûre.",
      "Le petit carré dit que l'angle EST droit. Le dessin n'est peut-être pas parfait, mais le codage, lui, est exact — c'est justement à cela qu'il sert.",
      "Non, le codage suffit.",
    ),
    tags: ["ce2", "droites_angles", "codage", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_angle_droit_codage_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "droites_angles",
    microId: "ce2_angle_droit_codage",
    difficulty: 3,
    theme: "neutral",
    text: "Sur cette figure, combien d'angles droits sont codés ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "Compte les petits carrés dessinés dans les coins.",
    explanation: exp(
      "Chaque petit carré dessiné dans un coin code un angle droit.",
      "On fait le tour de la figure en comptant les petits carrés.",
      "Les quatre coins portent chacun un petit carré : quatre angles droits sont codés. Cette figure est donc un rectangle.",
      "Il y en a 4.",
    ),
    tags: ["ce2", "droites_angles", "codage", "canvas"],
    canvas: rectangleCode(),
  },
  {
    kind: "fixed",
    id: "ce2_segments_codage_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "droites_angles",
    microId: "ce2_segments_codage",
    difficulty: 2,
    theme: "neutral",
    text: "Deux côtés d'une figure portent chacun un petit trait. Que veut dire ce codage ?",
    format: "qcm",
    choices: [
      "ces deux côtés ont la même longueur",
      "ces deux côtés sont droits",
      "ces deux côtés forment un angle droit",
      "ces deux côtés sont à mesurer",
    ],
    expected: ["ces deux côtés ont la même longueur"],
    comparator: "mcq_exact",
    hint: "C'est un message sur les LONGUEURS.",
    explanation: exp(
      "Les petits traits sur les côtés codent l'égalité des longueurs.",
      "On regroupe les côtés qui portent le même codage.",
      "Deux côtés marqués du même trait ont la même longueur, même si le dessin les fait paraître différents. Le petit carré, lui, parle des angles ; ce codage-ci parle des côtés.",
      "Ces deux côtés ont la même longueur.",
    ),
    tags: ["ce2", "droites_angles", "segments_codage", "definition", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_segments_codage_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "droites_angles",
    microId: "ce2_segments_codage",
    difficulty: 4,
    theme: "neutral",
    text: "Sur un quadrilatère, deux côtés portent UN trait et les deux autres portent DEUX traits. Les quatre côtés sont-ils égaux ?",
    format: "qcm",
    choices: [
      "non, ils sont égaux deux par deux",
      "oui, tous les quatre",
      "non, aucun n'est égal à un autre",
      "on ne peut pas savoir",
    ],
    expected: ["non, ils sont égaux deux par deux"],
    comparator: "mcq_exact",
    hint: "Un trait et deux traits, est-ce le même message ?",
    explanation: exp(
      "Deux côtés sont égaux quand ils portent le MÊME nombre de traits.",
      "On range les côtés par codage : ceux à un trait ensemble, ceux à deux traits ensemble.",
      "Les deux côtés à un trait sont égaux entre eux, et les deux côtés à deux traits sont égaux entre eux — mais les deux groupes n'ont pas la même longueur. C'est exactement le codage d'un rectangle.",
      "Non : ils sont égaux deux par deux.",
    ),
    tags: ["ce2", "droites_angles", "segments_codage", "piege", "qcm", "canvas"],
    canvas: rectangleCode(),
  },
  {
    kind: "fixed",
    id: "ce2_segments_codage_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "droites_angles",
    microId: "ce2_segments_codage",
    difficulty: 3,
    theme: "neutral",
    text: "Sur une figure, le côté AB mesure 6 cm. Le côté CD porte le même codage que AB. Combien mesure CD ?",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "Même codage veut dire même longueur.",
    explanation: exp(
      "Deux côtés portant le même codage ont la même longueur.",
      "On lit la longueur connue et on la reporte sur l'autre côté.",
      "AB mesure 6 cm et CD porte le même codage : CD mesure donc 6 cm. Pas besoin de sortir la règle.",
      "CD mesure 6 cm.",
    ),
    tags: ["ce2", "droites_angles", "segments_codage"],
  },
  {
    kind: "fixed",
    id: "ce2_droite_perpendiculaire_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "droites_angles",
    microId: "ce2_droite_perpendiculaire",
    difficulty: 2,
    theme: "neutral",
    text: "Deux droites sont perpendiculaires quand...",
    format: "qcm",
    choices: [
      "elles se coupent en formant un angle droit",
      "elles ne se rencontrent jamais",
      "elles ont la même longueur",
      "elles sont toutes les deux horizontales",
    ],
    expected: ["elles se coupent en formant un angle droit"],
    comparator: "mcq_exact",
    hint: "Perpendiculaire, c'est l'angle droit entre deux traits.",
    explanation: exp(
      "Deux droites perpendiculaires se croisent en formant un angle droit.",
      "On cherche le point de croisement, puis on y présente l'équerre.",
      "Il faut les deux : qu'elles se coupent, ET que l'angle soit droit. Deux droites qui se croisent de travers ne sont pas perpendiculaires.",
      "Elles se coupent en formant un angle droit.",
    ),
    tags: ["ce2", "droites_angles", "perpendiculaire", "definition", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_droite_perpendiculaire_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "droites_angles",
    microId: "ce2_droite_perpendiculaire",
    difficulty: 4,
    theme: "neutral",
    text: "Dans le rectangle ABCD, les côtés AB et CD sont-ils perpendiculaires ?",
    format: "qcm",
    choices: [
      "non, ils se font face et ne se rencontrent pas",
      "oui, comme tous les côtés d'un rectangle",
      "oui, ils forment un angle droit",
      "on ne peut pas savoir",
    ],
    expected: ["non, ils se font face et ne se rencontrent pas"],
    comparator: "mcq_exact",
    hint: "Regarde où sont AB et CD : se touchent-ils quelque part ?",
    explanation: exp(
      "Deux droites perpendiculaires doivent se couper : sans croisement, il n'y a pas d'angle.",
      "On repère les deux côtés sur la figure et on regarde s'ils se rejoignent.",
      "AB et CD sont les deux côtés opposés du rectangle : ils se font face et ne se touchent jamais. Ce sont AB et BC, qui se rejoignent au sommet B, qui sont perpendiculaires.",
      "Non, AB et CD ne sont pas perpendiculaires.",
    ),
    tags: ["ce2", "droites_angles", "perpendiculaire", "piege", "qcm", "canvas"],
    canvas: rectangleCode(),
  },
  {
    kind: "fixed",
    id: "ce2_droite_perpendiculaire_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "droites_angles",
    microId: "ce2_droite_perpendiculaire",
    difficulty: 3,
    theme: "neutral",
    text: "Dans le rectangle ABCD, quel côté est perpendiculaire à AB ?",
    format: "qcm",
    choices: ["BC", "CD", "aucun", "les trois autres"],
    expected: ["BC"],
    comparator: "mcq_exact",
    hint: "Cherche le côté qui rejoint AB en un sommet.",
    explanation: exp(
      "Deux côtés d'une figure sont perpendiculaires s'ils se rejoignent en formant un angle droit.",
      "On cherche les côtés qui partagent un sommet avec AB.",
      "AB rejoint BC au sommet B, et l'angle y est droit : AB et BC sont perpendiculaires. CD, lui, se trouve en face de AB et ne le touche pas.",
      "C'est BC.",
    ),
    tags: ["ce2", "droites_angles", "perpendiculaire", "qcm", "canvas"],
    canvas: rectangleCode(),
  },
  {
    kind: "fixed",
    id: "ce2_droite_defi_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "droites_angles",
    microId: "ce2_droite_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Un quadrilatère porte quatre petits carrés d'angle droit, et ses quatre côtés portent tous le MÊME trait. Quelle figure est-ce ?",
    format: "qcm",
    choices: ["un carré", "un rectangle", "un losange", "un triangle rectangle"],
    expected: ["un carré"],
    comparator: "mcq_exact",
    hint: "Lis les deux codages l'un après l'autre : les angles, puis les côtés.",
    explanation: exp(
      "Les codages se lisent ensemble : chacun apporte une information, et on les cumule.",
      "On traduit le premier codage, puis le second, et on cherche la figure qui satisfait les deux.",
      "Quatre petits carrés : les quatre angles sont droits. Le même trait sur les quatre côtés : les quatre côtés sont égaux. Une figure qui a les deux, c'est un carré. Un rectangle n'aurait pas les quatre côtés au même codage.",
      "C'est un carré.",
    ),
    tags: ["ce2", "droites_angles", "defi", "codage", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_droite_defi_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "droites_angles",
    microId: "ce2_droite_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Pour Léa, trois points ont l'air alignés. Kevin pose sa règle et voit un espace. Malia conclut : « pas alignés ». Qui a apporté la preuve ?",
    format: "qcm",
    choices: [
      "Kevin, parce qu'il a utilisé un instrument",
      "Léa, parce qu'elle a bien regardé",
      "Malia, parce qu'elle a conclu",
      "personne, il faut mesurer",
    ],
    expected: ["Kevin, parce qu'il a utilisé un instrument"],
    comparator: "mcq_exact",
    hint: "Qui a apporté une preuve, et pas seulement une impression ?",
    explanation: exp(
      "En géométrie, une impression ne prouve rien : c'est l'instrument qui tranche.",
      "On repère qui a apporté une observation vérifiable.",
      "Léa a donné une impression, Malia a tiré la conclusion — mais c'est Kevin qui a apporté la preuve, en posant la règle. Sans son geste, personne ne pouvait savoir.",
      "C'est Kevin qui a tranché.",
    ),
    tags: ["ce2", "droites_angles", "defi", "alignement", "qcm", "canvas"],
    canvas: troisPoints(false),
  },

  /* ─── Les gabarits : ids et étoiles d'origine gardés, tpl_3 et tpl_4 ajoutés ─── */
  AL(3, 1, "Pose la règle sur deux points et regarde le troisième.", alignement1),
  AL(2, 2, "Regarde les bouts du trait : une flèche veut dire qu'il continue.", alignement2),
  AL(1, 3, "Pose la règle sur deux points et regarde le troisième.", alignement3),
  AL(4, 4, "Prolonge la règle posée sur les deux premiers points.", alignement4),
  AD(3, 1, "Imagine le coin de l'équerre posé sur le sommet.", angle1),
  AD(2, 2, "Cherche le coin qui a la forme du coin de l'équerre.", angle2),
  AD(1, 3, "Présente le coin de l'équerre : remplit-il l'angle exactement ?", angle3),
  AD(4, 4, "Tourne l'équerre avec la figure : un angle droit peut être penché.", angle4),
  ADC(3, 2, "Cherche le petit carré dans les coins.", codage2),
  ADC(1, 3, "Un petit carré par angle droit, et seulement là.", codage3),
  ADC(2, 4, "Le codage dit ce qui est vrai, ni plus ni moins.", codage4),
  SC(3, 2, "Même nombre de petits traits, même longueur.", segments2),
  SC(1, 3, "Même codage, même longueur.", segments3),
  SC(2, 4, "Range les côtés par codage.", segments4),
  PP(3, 2, "Perpendiculaires : elles se coupent en formant un angle droit.", perp2),
  PP(1, 3, "Deux côtés perpendiculaires partent du même coin, avec un angle droit.", perp3),
  PP(2, 4, "Il faut les DEUX : qu'elles se coupent, et que l'angle soit droit.", perp4),
  DF(1, 5, "Traduis chaque codage, puis cherche la figure qui a tout.", defi1),
  DF(2, 5, "Dans un rectangle, les côtés d'en face sont égaux : additionne les quatre.", defi2),
];
