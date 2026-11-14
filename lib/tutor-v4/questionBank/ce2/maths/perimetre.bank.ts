// lib/tutor-v4/questionBank/ce2/maths/perimetre.bank.ts
//
// Les périmètres du CE2, écrits à la main. Cinq micro-compétences qui passaient
// par le constructeur commun.
//
// PÉRIMÈTRE BO (n° 41 du 31 octobre 2024, applicable à la rentrée 2025,
// cycle 2) : comprendre ce qu'est le périmètre, le déterminer pour un polygone
// en additionnant les côtés, comparer des périmètres, et traiter le cas du
// rectangle et du carré.
//
// ⚠️ DEUX FAÇONS DE COMPARER, et le texte les demande toutes les deux. La
// seconde est longtemps restée absente d'ici : « Comparer le périmètre de
// plusieurs polygones SANS RÈGLE GRADUÉE, en utilisant un COMPAS. » La méthode
// est décrite mot pour mot : « reporter au compas les longueurs des côtés d'un
// polygone sur une droite afin d'obtenir un segment ayant une longueur égale au
// périmètre du polygone ».
// Ce n'est pas une variante folklorique. C'est la seule façon de comparer deux
// figures dont les côtés ne tombent pas sur des nombres entiers — et elle
// montre qu'un périmètre est une LONGUEUR qu'on peut déplier, pas seulement un
// calcul.
// ⛔ Pas d'AIRE au cycle 2 : la surface arrive au CM1. On ne parle donc jamais
// de cm² ici, et on ne demande jamais « combien de carreaux à l'intérieur ».
// ⛔ Pas de formule à retenir non plus : au CE2 on ADDITIONNE les côtés. Pour
// le rectangle on peut regrouper (deux longueurs et deux largeurs), mais la
// formule 2 × (L + l) est une écriture de cycle 3.
//
// LE PIÈGE DE LA NOTION : le tour et le dedans. « Combien de peinture pour la
// pièce » et « combien de plinthes autour de la pièce » ne se calculent pas
// pareil, et l'élève qui ne s'est pas posé la question multiplie au lieu
// d'additionner. Chaque question de cette banque parle donc d'un objet réel
// qu'on entoure : une clôture, un ruban, une bordure.
// Son cousin : le côté qu'on oublie. Un polygone à cinq côtés en additionne
// cinq, pas quatre.
//
// ⚠️ PAS DE QUESTION À RÉDIGER. `applyMathsKeyboardFree` retire les items
// `format: "open"` (cf. ce2/maths/index.ts) : un CE2 clique, il ne tape pas.
//
// ⭐ 10/11/2026 — GÉNÉRATEURS ET DESSINS. Frédéric : « robustesse coach cp ce1
// ce2 », des images, « un peu fun », « attention à leur âge ». Avant : 4 à 16
// squelettes par micro, 8 à 18 répétitions sur 20 ; 18 % des énoncés avec un
// dessin. Chaque étoile servie a maintenant au moins deux gabarits riches
// (situation × tournure × nombres), et presque tous posent leur figure :
//   - `construction` : le polygone À L'ÉCHELLE, ses côtés écrits (« 6 cm ») ;
//   - `figure_libre` : la figure sur quadrillage, dont on compte le contour.
// ⛔ Le dessin porte les DONNÉES, jamais la réponse : aucun périmètre écrit.
// ⛔ L'unité partout : dans l'énoncé (« 6 cm ») et dans chaque choix (« 24 cm »).
// ⚠️ `figure_libre` numérote ses cases à partir de 0 (vérifié au rendu).

import type { DifficultyLevel, TutorBankItemV4, TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import type {
  ConstructionCanvasData,
  FigureLibreCanvasData,
  QuadrilatereCanvasData,
} from "@/lib/tutor-v4/types_canvas";
import { cap, entre, qcm, qcmN, un } from "../../cm1/maths/trous-outils";

type Gen = TutorGeneratedQuestionV4;

function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return `Définition : ${definition}

Méthode : ${methode}

Calcul : ${calcul}

Conclusion : ${conclusion}`;
}

const somme = (l: readonly number[]) => l.reduce((a, b) => a + b, 0);

/* ───────────────────────── Les personnages et les mondes ───────────────────────── */

const NOMS = ["Nina", "Téo", "Zoé", "Ravi", "Lou", "Malo", "Inès", "Sacha", "Amir", "Jade", "Naïa", "Tom", "Lina", "Yanis", "Maya", "Noé"];
/** Pour « celui de … » : pas d'élision à gérer. */
const NOMS_CONSONNE = NOMS.filter((n) => !/^[AEIOUÉÈ]/.test(n));
const METIERS = ["La couturière", "Le menuisier", "La maîtresse", "Le décorateur", "La fleuriste", "Le jardinier", "La pâtissière", "Le peintre"];
const qui = () => (Math.random() < 0.7 ? un(NOMS) : un(METIERS));
const deuxNoms = () => {
  const a = un(NOMS_CONSONNE);
  return [a, un(NOMS_CONSONNE.filter((x) => x !== a))] as const;
};

/** Ce qu'on ENTOURE, en centimètres. « autour d' » + « un/une … ». */
const PETITS = [
  { objet: "une carte d'anniversaire", geste: "coller un ruban doré", fil: "ruban" },
  { objet: "un cadre photo", geste: "coller une frise", fil: "frise" },
  { objet: "un napperon", geste: "coudre de la dentelle", fil: "dentelle" },
  { objet: "un coussin", geste: "coudre un galon", fil: "galon" },
  { objet: "un drapeau de pirate", geste: "coudre un fil rouge", fil: "fil rouge" },
  { objet: "une carte au trésor", geste: "coller un liseré", fil: "liseré" },
  { objet: "un set de table", geste: "coudre un biais", fil: "biais" },
  { objet: "une affiche", geste: "coller du scotch", fil: "scotch" },
  { objet: "un badge", geste: "tracer une bordure", fil: "bordure" },
  { objet: "un mouchoir", geste: "broder un fil bleu", fil: "fil bleu" },
  { objet: "un écusson de foot", geste: "coudre un galon", fil: "galon" },
  { objet: "une étiquette", geste: "coller de la laine", fil: "laine" },
  { objet: "un tapis de poupée", geste: "coudre une frange", fil: "frange" },
  { objet: "un cerf-volant", geste: "coller un ruban", fil: "ruban" },
  { objet: "un tableau", geste: "poser une baguette", fil: "baguette" },
  { objet: "une page d'album", geste: "dessiner une frise", fil: "frise" },
] as const;

/** Ce qu'on CLÔTURE, en mètres. */
const GRANDS = [
  { objet: "un potager", geste: "poser une clôture", fil: "clôture" },
  { objet: "un poulailler", geste: "poser du grillage", fil: "grillage" },
  { objet: "un bac à sable", geste: "poser une bordure", fil: "bordure" },
  { objet: "un parc à poneys", geste: "monter une barrière", fil: "barrière" },
  { objet: "une piste de cirque", geste: "accrocher une guirlande", fil: "guirlande" },
  { objet: "un stand", geste: "accrocher une guirlande", fil: "guirlande" },
  { objet: "un champ de fraises", geste: "poser une clôture", fil: "clôture" },
  { objet: "un terrain de jeu", geste: "monter une barrière", fil: "barrière" },
  { objet: "un enclos de girafes", geste: "poser une clôture", fil: "clôture" },
  { objet: "une mare", geste: "monter une barrière", fil: "barrière" },
  { objet: "un massif de fleurs", geste: "poser une bordure", fil: "bordure" },
  { objet: "un parking à vélos", geste: "peindre une ligne blanche", fil: "ligne blanche" },
  { objet: "un enclos de cabris", geste: "poser une clôture", fil: "clôture" },
  { objet: "une aire de pique-nique", geste: "tendre une corde", fil: "corde" },
  { objet: "un carré de salades", geste: "tendre une ficelle", fil: "ficelle" },
  { objet: "un terrain de pétanque", geste: "poser une bordure", fil: "bordure" },
] as const;

type Monde = { objet: string; geste: string; fil: string; u: "cm" | "m" };
const monde = (u?: "cm" | "m"): Monde => {
  const unite = u ?? (Math.random() < 0.6 ? "cm" : "m");
  return { ...(unite === "cm" ? un(PETITS) : un(GRANDS)), u: unite };
};
/** « poser une clôture autour d'un potager » */
const autour = (m: Monde) => `${m.geste} autour d'${m.objet}`;
const QUESTION_FIL = (m: Monde) => [
  `Quelle longueur de ${m.fil} faut-il ?`,
  `Combien de ${m.fil} faut-il ?`,
  `Quelle longueur de ${m.fil} prévoir ?`,
  `Il faut combien de ${m.fil} ?`,
];

/* ───────────────────────── Les dessins ───────────────────────── */

type Pt = { x: number; y: number };
type Morceau = Required<Pick<ConstructionCanvasData, "points" | "polygones" | "segments" | "angles">>;

/** Un polygone : sommets cachés, côtés écrits là où `textes[i]` est donné. */
function morceau(pts: Pt[], textes: (string | null)[], o: { prefixe?: string; codes?: number[]; droits?: boolean; dx?: number } = {}): Morceau {
  const n = pts.length;
  const p = o.prefixe ?? "p";
  const ids = pts.map((_, i) => `${p}${i}`);
  const dx = o.dx ?? 0;
  const segments: Morceau["segments"] = [];
  pts.forEach((_, i) => {
    const t = textes[i];
    const c = o.codes?.[i];
    if (t || c) segments.push({ a: ids[i], b: ids[(i + 1) % n], ...(t ? { texte: t } : {}), ...(c ? { code: c } : {}) });
  });
  return {
    points: pts.map((q, i) => ({ id: ids[i], x: q.x + dx, y: q.y, cache: true })),
    polygones: [{ sommets: ids }],
    segments,
    angles: o.droits ? ids.map((id, i) => ({ sommet: id, de: ids[(i + n - 1) % n], vers: ids[(i + 1) % n], droit: true })) : [],
  };
}

function construction(ms: Morceau[], description: string, largeur = 300, hauteurMax = 210): ConstructionCanvasData {
  // ⚠️ Le cadre ne garde que 30 px autour de la figure : une longueur écrite
  // sous le côté du bas n'y tenait pas, et le canvas la rangeait DANS la figure
  // (vu au rendu, 10/11). Deux points invisibles agrandissent le cadre.
  const tous = ms.flatMap((m) => m.points);
  const xs = tous.map((p) => p.x);
  const ys = tous.map((p) => p.y);
  const rx = Math.max(...xs) - Math.min(...xs);
  const ry = Math.max(Math.max(...ys) - Math.min(...ys), rx * 0.3);
  const coins = [
    { id: "cadre1", x: Math.min(...xs) - rx * 0.05, y: Math.min(...ys) - ry * 0.16, cache: true },
    { id: "cadre2", x: Math.max(...xs) + rx * 0.05, y: Math.max(...ys) + ry * 0.16, cache: true },
  ];
  return {
    kind: "construction",
    points: [...tous, ...coins],
    polygones: ms.flatMap((m) => m.polygones),
    segments: ms.flatMap((m) => m.segments),
    angles: ms.flatMap((m) => m.angles),
    largeur,
    hauteurMax,
    description,
  };
}

const largeurDe = (pts: Pt[]) => Math.max(...pts.map((p) => p.x)) - Math.min(...pts.map((p) => p.x));
const aGauche = (pts: Pt[]) => {
  const mx = Math.min(...pts.map((p) => p.x));
  const my = Math.min(...pts.map((p) => p.y));
  return pts.map((p) => ({ x: p.x - mx, y: p.y - my }));
};

type Fig = { pts: Pt[]; textes: (string | null)[]; droits?: boolean; codes?: number[] };
/** Deux figures côte à côte, posées sur la même ligne de base, à la même échelle. */
function deuxFigures(a: Fig, b: Fig, description: string) {
  const A = aGauche(a.pts);
  const B = aGauche(b.pts);
  // ⚠️ Le canvas place une longueur loin du centre du CADRE, pas de sa figure :
  // sur un côté tourné vers l'autre figure, elle peut passer à l'intérieur
  // (collée à son côté, lisible). Un couloir moyen garde des figures assez grandes.
  const ecart = Math.max(largeurDe(A), largeurDe(B)) * 0.6 + 1.5;
  const total = largeurDe(A) + ecart + largeurDe(B);
  const haut = Math.max(...A.map((p) => p.y), ...B.map((p) => p.y));
  // Deux points invisibles élargissent le cadre : sans eux, une longueur écrite
  // au bord droit mordait sur le côté (vu au rendu, 10/11).
  const marge = total * 0.1;
  const bords: Morceau = {
    points: [
      { id: "margeG", x: -marge, y: haut / 2, cache: true },
      { id: "margeD", x: total + marge, y: haut / 2, cache: true },
    ],
    polygones: [],
    segments: [],
    angles: [],
  };
  return construction(
    [
      morceau(A, a.textes, { prefixe: "a", droits: a.droits, codes: a.codes }),
      morceau(B, b.textes, { prefixe: "b", droits: b.droits, codes: b.codes, dx: largeurDe(A) + ecart }),
      bords,
    ],
    description,
    340,
    200,
  );
}

/** Rectangle de L sur l, à l'échelle (on évite seulement les rubans trop plats). */
function ptsRectangle(L: number, l: number): Pt[] {
  const h = Math.max(l, L / 3.2);
  return [{ x: 0, y: 0 }, { x: L, y: 0 }, { x: L, y: h }, { x: 0, y: h }];
}
/** Côtés écrits : la longueur en bas, la largeur à droite. */
const texteRect = (L: string | null, l: string | null): (string | null)[] => [L, l, null, null];

/** Un polygone quelconque à n côtés, aux côtés ENTIERS mesurés sur le dessin. */
function polygoneAuHasard(n: number, moyenne: number): { pts: Pt[]; cotes: number[] } {
  for (let essai = 0; essai < 60; essai++) {
    const base = Math.random() * 2 * Math.PI;
    const brut = Array.from({ length: n }, (_, i) => {
      const a = base + (2 * Math.PI * i) / n + (Math.random() - 0.5) * (Math.PI / n) * 0.7;
      const r = 0.8 + Math.random() * 0.35;
      return { x: r * Math.cos(a), y: r * Math.sin(a) };
    });
    const d = brut.map((p, i) => Math.hypot(brut[(i + 1) % n].x - p.x, brut[(i + 1) % n].y - p.y));
    const k = moyenne / (somme(d) / n);
    const pts = brut.map((p) => ({ x: p.x * k, y: p.y * k }));
    const cotes = d.map((x) => Math.round(x * k));
    if (cotes.every((c) => c >= 2) && new Set(cotes).size >= Math.min(n, 3)) return { pts, cotes };
  }
  const pts = ptsRegulier(n, moyenne);
  return { pts, cotes: pts.map(() => Math.round(moyenne)) };
}

/** Le polygone régulier : tous ses côtés égaux. */
function ptsRegulier(n: number, cote: number): Pt[] {
  const r = cote / (2 * Math.sin(Math.PI / n));
  const depart = -Math.PI / 2 - Math.PI / n;
  return Array.from({ length: n }, (_, i) => ({ x: r * Math.cos(depart + (2 * Math.PI * i) / n), y: r * Math.sin(depart + (2 * Math.PI * i) / n) }));
}

const NOM_POLY: Record<number, string> = { 3: "triangle", 4: "quadrilatère", 5: "pentagone", 6: "hexagone", 7: "polygone à 7 côtés", 8: "polygone à 8 côtés" };

/** Le dessin d'un polygone tiré au hasard, côtés écrits avec leur unité (`cache` : le côté « ? »). */
function polyCote(n: number, moyenne: number, u: string, cache?: number) {
  const { pts, cotes } = polygoneAuHasard(n, moyenne);
  const textes = cotes.map((c, i) => (i === cache ? "?" : `${c} ${u}`));
  return { pts, cotes, textes, canvas: construction([morceau(pts, textes)], `Un ${NOM_POLY[n]} dont les côtés sont écrits`) };
}

/* Le quadrillage — `filledCells` en [ligne, colonne], à partir de 0. */
type Case = [number, number];
const cle = ([r, c]: Case) => `${r},${c}`;
function contour(cases: Case[]): number {
  const s = new Set(cases.map(cle));
  let n = 0;
  for (const [r, c] of cases) for (const v of [[r - 1, c], [r + 1, c], [r, c - 1], [r, c + 1]] as Case[]) if (!s.has(cle(v))) n++;
  return n;
}
function rect(h: number, w: number, r0 = 0, c0 = 0): Case[] {
  const out: Case[] = [];
  for (let r = 0; r < h; r++) for (let c = 0; c < w; c++) out.push([r0 + r, c0 + c]);
  return out;
}
const sans = (cases: Case[], x: Case) => cases.filter((k) => cle(k) !== cle(x));
function normaliser(cases: Case[]): Case[] {
  const r0 = Math.min(...cases.map((k) => k[0]));
  const c0 = Math.min(...cases.map((k) => k[1]));
  return cases.map(([r, c]) => [r - r0, c - c0] as Case);
}
const largeurCases = (cases: Case[]) => Math.max(...cases.map((k) => k[1])) + 1;

/** Une figure d'un seul tenant : coin retiré, bosse, creux ou L. */
function polyomino(maxW = 6, maxH = 4): Case[] {
  const w = entre(3, maxW);
  const h = entre(2, maxH);
  let cases = rect(h, w, 1, 0);
  const v = un(["coin", "bosse", "creux", "L", "bosse"]);
  if (v === "coin") cases = sans(cases, un<Case>([[1, w - 1], [1, 0], [h, 0], [h, w - 1]]));
  if (v === "creux") cases = sans(cases, [1, entre(1, w - 2)]);
  if (v === "bosse") {
    const k = entre(1, w - 1);
    const d = entre(0, w - k);
    for (let c = d; c < d + k; c++) cases.push([0, c]);
  }
  if (v === "L") {
    const kw = entre(1, w - 2);
    for (let r = 1; r < h; r++) for (let c = w - kw; c < w; c++) cases = sans(cases, [r, c]);
  }
  return normaliser(cases);
}

/** Une ou deux figures sur le même quadrillage (la seconde à droite). */
function quadrillage(groupes: Case[][]): FigureLibreCanvasData {
  const tout: Case[] = [];
  let decalage = 1;
  for (const g of groupes) {
    for (const [r, c] of g) tout.push([r + 1, c + decalage]);
    decalage += largeurCases(g) + 2;
  }
  const rows = Math.max(...tout.map((k) => k[0])) + 2;
  const cols = decalage - 1;
  const cellSize = Math.min(30, Math.floor(320 / cols));
  return {
    kind: "figure_libre",
    size: { cellSize, padding: 8 },
    grid: { rows, cols, filledCells: tout },
    display: { showGrid: true, showFilled: true, showPerimeter: true },
  };
}

const UN_CARREAU = (u: "cm" | "m") =>
  u === "cm"
    ? ["Un carreau a 1 cm de côté.", "Un carreau mesure 1 cm de côté.", "Le côté d'un carreau fait 1 cm."]
    : ["Un côté de carreau vaut 1 m.", "Ici, un côté de carreau fait 1 m."];

/* ───────────────────────── Les fabricants ───────────────────────── */

const gabarit =
  (microId: string) =>
  (n: number, difficulty: DifficultyLevel, hint: string, generate: () => Gen, theme: "neutral" | "reunion" = "neutral"): TutorBankItemV4 => ({
    kind: "template",
    id: `${microId}_tpl_${n}`,
    niveau: "ce2",
    matiere: "maths",
    notionId: "perimetre",
    microId,
    difficulty,
    theme,
    hint,
    tags: ["ce2", "perimetre", microId.replace("ce2_perimetre_", ""), "template"],
    generate,
  });

type Fixe = Omit<Extract<TutorBankItemV4, { kind: "fixed" }>, "kind" | "niveau" | "matiere" | "notionId">;
const fixe = (f: Fixe): TutorBankItemV4 => ({ kind: "fixed", niveau: "ce2", matiere: "maths", notionId: "perimetre", ...f });

function rectangleCote(longueur: number, largeur: number): QuadrilatereCanvasData {
  return {
    kind: "quadrilatere",
    points: { A: { x: 50, y: 60 }, B: { x: 250, y: 60 }, C: { x: 250, y: 170 }, D: { x: 50, y: 170 } },
    display: { showPoints: true, showLabels: true, showSides: true },
    sideLabels: { AB: `${longueur} cm`, BC: `${largeur} cm`, CD: `${longueur} cm`, DA: `${largeur} cm` },
    marks: { rightAnglesAt: ["A", "B", "C", "D"] },
  };
}

const QUEL_PERIMETRE = [
  "Quel est son périmètre ?",
  "Combien mesure son tour ?",
  "Quelle est la longueur de son contour ?",
  "Trouve son périmètre.",
  "Combien mesure le tour complet ?",
  "Calcule son périmètre.",
];

/* =========================================================
   CE2_PERIMETRE_COMPRENDRE — le tour, pas le dedans
========================================================= */
const COMP = gabarit("ce2_perimetre_comprendre");

const ACTIONS_TOUR = [
  "poser une bordure autour d'un massif de fleurs",
  "coller un ruban tout autour d'un cadre",
  "poser une clôture autour d'un champ",
  "coudre un galon autour d'un coussin",
  "faire le tour d'un stade en courant",
  "accrocher une guirlande autour d'une fenêtre",
  "mettre une barrière autour d'un enclos",
  "coller une frise autour d'une affiche",
  "tracer le bord d'un terrain de foot",
  "entourer un dessin d'un trait de feutre",
  "poser des planches autour d'un bac à sable",
  "coudre de la dentelle autour d'un mouchoir",
  "poser des plinthes le long des murs d'une chambre",
  "tendre une corde autour de la piste du cirque",
  "faire rouler un petit train tout autour d'un tapis",
  "poser du grillage autour du poulailler",
] as const;
const ACTIONS_DEDANS = [
  "peindre tout un mur",
  "carreler tout le sol d'une cuisine",
  "semer du gazon sur tout un jardin",
  "couvrir toute une table avec une nappe",
  "colorier tout l'intérieur d'un dessin",
  "mettre de la moquette dans toute une chambre",
  "couvrir un cahier avec du papier",
  "coller des gommettes partout dans un carré",
] as const;

function tourOuDedans(ctx: boolean): Gen {
  const tour = Math.random() < 0.6;
  const a = tour ? un(ACTIONS_TOUR) : un(ACTIONS_DEDANS);
  const S = qui();
  const ouiNon = Math.random() < 0.4;
  const debut = ctx ? `${S} veut ${a}.` : "";
  const text = ouiNon
    ? ctx
      ? `${debut} ${un(["A-t-on besoin du périmètre ?", "Faut-il connaître le périmètre ?", "Est-ce une question de périmètre ?"])}`
      : un([`Pour ${a}, a-t-on besoin du périmètre ?`, `Pour ${a}, faut-il connaître le périmètre ?`, `${cap(a)} : est-ce une question de périmètre ?`])
    : ctx
      ? `${debut} ${un(["Que faut-il connaître ?", "Que faut-il mesurer ?", "De quoi a-t-on besoin ?"])}`
      : un([`Pour ${a}, que faut-il connaître ?`, `On veut ${a}. Que faut-il mesurer ?`, `Pour ${a}, de quoi a-t-on besoin ?`]);
  const juste = ouiNon ? (tour ? "oui, c'est le tour" : "non, c'est le dedans") : tour ? "le périmètre (le tour)" : "le dedans (pas le périmètre)";
  const faux = ouiNon
    ? ["oui, c'est le tour", "non, c'est le dedans", "on ne peut pas savoir"]
    : ["le périmètre (le tour)", "le dedans (pas le périmètre)", "le nombre de côtés", "la longueur d'un seul côté"];
  return {
    text: text.trim(),
    ...qcm(juste, faux),
    explanation: exp(
      "Le périmètre est la longueur du contour : il sert à tout ce qui ENTOURE.",
      "On se demande si l'objet suit le bord ou s'il remplit le dedans.",
      tour ? `Pour ${a}, on suit le bord : c'est bien le périmètre.` : `Pour ${a}, on remplit le dedans, pas le bord : ce n'est pas le périmètre. Cette question-là arrive au CM1.`,
      tour ? "C'est le périmètre." : "Ce n'est pas le périmètre.",
    ),
  };
}

/** Une figure de base, sans mesure (pour reconnaître ou compter). */
function figureNue(nom: string): Morceau {
  if (nom === "carré") return morceau(ptsRectangle(4, 4), [], { droits: true });
  if (nom === "rectangle") return morceau(ptsRectangle(entre(6, 8), 3), [], { droits: true });
  if (nom === "losange") return morceau([{ x: 0, y: -2 }, { x: 3, y: 0 }, { x: 0, y: 2 }, { x: -3, y: 0 }], []);
  const n = { triangle: 3, quadrilatère: 4, pentagone: 5, hexagone: 6 }[nom] ?? 4;
  return morceau(polygoneAuHasard(n, 5).pts, []);
}

const NOMS_FIG = ["triangle", "carré", "rectangle", "losange", "pentagone", "hexagone", "quadrilatère"];

const comprendreItems: TutorBankItemV4[] = [
  fixe({
    id: "ce2_perimetre_comprendre_fixed_1",
    microId: "ce2_perimetre_comprendre",
    difficulty: 1,
    theme: "neutral",
    text: "Qu'est-ce que le périmètre d'une figure ?",
    format: "qcm",
    choices: ["la place qu'elle occupe à l'intérieur", "la longueur de son contour", "le nombre de ses côtés", "la longueur de son plus grand côté"],
    expected: ["la longueur de son contour"],
    comparator: "mcq_exact",
    hint: "Imagine que tu fais le tour de la figure à pied.",
    explanation: exp(
      "Le périmètre est la longueur du contour d'une figure : le chemin qu'on parcourt en en faisant le tour.",
      "On suit le bord de la figure en additionnant tous les côtés rencontrés.",
      "C'est une longueur, donc elle se mesure en centimètres ou en mètres. Ce qui se trouve à l'intérieur ne compte pas.",
      "C'est la longueur de son contour.",
    ),
    tags: ["ce2", "perimetre", "comprendre", "definition", "qcm"],
  }),
  fixe({
    id: "ce2_perimetre_comprendre_fixed_2",
    microId: "ce2_perimetre_comprendre",
    difficulty: 3,
    theme: "reunion",
    text: "On veut poser un grillage tout autour du potager de l'école. Que faut-il calculer ?",
    format: "qcm",
    choices: ["ce qu'il y a à l'intérieur du potager", "la longueur du plus grand côté", "le périmètre du potager", "le nombre de plants"],
    expected: ["le périmètre du potager"],
    comparator: "mcq_exact",
    hint: "Le grillage se pose sur le bord, pas au milieu.",
    explanation: exp(
      "Le périmètre sert à tout ce qui entoure : une clôture, un ruban, une bordure.",
      "On se demande si l'objet fait le TOUR ou s'il remplit le dedans.",
      "Le grillage se pose sur le contour : c'est donc le périmètre qu'il faut. Pour savoir combien de plants entrent dedans, on aurait regardé l'intérieur — mais ça, c'est une autre question.",
      "Il faut calculer le périmètre.",
    ),
    tags: ["ce2", "perimetre", "comprendre", "reunion", "piege", "qcm"],
  }),
  fixe({
    id: "ce2_perimetre_comprendre_fixed_3",
    microId: "ce2_perimetre_comprendre",
    difficulty: 4,
    theme: "neutral",
    text: "Deux figures de formes très différentes peuvent-elles avoir le même périmètre ?",
    format: "qcm",
    choices: [
      "non, deux formes différentes ont toujours des périmètres différents",
      "oui, la forme ne décide pas du périmètre",
      "oui, seulement si ce sont deux rectangles",
      "on ne peut pas savoir",
    ],
    expected: ["oui, la forme ne décide pas du périmètre"],
    comparator: "mcq_exact",
    hint: "Prends une ficelle de 20 cm et forme-la en carré, puis en rectangle tout plat.",
    explanation: exp(
      "Le périmètre est la longueur du contour : deux contours de même longueur peuvent dessiner des formes très différentes.",
      "On imagine une ficelle de longueur fixe qu'on déforme sans la couper.",
      "Une ficelle de 20 cm peut former un carré de 5 cm de côté, ou un rectangle tout plat de 9 cm sur 1 cm. Les deux figures ne se ressemblent pas du tout, et pourtant leur périmètre vaut 20 cm dans les deux cas.",
      "Oui, c'est possible.",
    ),
    tags: ["ce2", "perimetre", "comprendre", "piege", "qcm"],
  }),

  // ★2 — le tour ou le dedans ? (sans histoire)
  COMP(1, 2, "Demande-toi si l'objet fait le TOUR, ou s'il remplit le dedans.", () => tourOuDedans(false)),

  // ★3 — combien de côtés additionner, pour un vrai objet
  COMP(2, 3, "Le périmètre est une longueur : on l'additionne côté après côté.", () => {
    const n = entre(3, 6);
    const m = monde();
    const S = qui();
    const text = `${S} veut ${autour(m)}. ${un([
      "Combien de longueurs faut-il additionner ?",
      "Combien de côtés faut-il additionner ?",
      "Combien de côtés additionner ?",
    ])}`;
    return {
      text,
      ...qcmN(n, [n - 1, n + 1, 2, n * 2]),
      explanation: exp(
        "Le périmètre est la somme de TOUS les côtés de la figure.",
        "On compte les côtés de la figure, puis on les additionne un par un sans en oublier.",
        `Un ${NOM_POLY[n]} a ${n} côtés : il faut donc additionner ${n} longueurs.`,
        `Il faut en additionner ${n}.`,
      ),
      canvas: construction([morceau(polygoneAuHasard(n, 5).pts, [])], `Un ${NOM_POLY[n]}`),
    };
  }),

  // ★2 — quel calcul donne le périmètre ? (la figure cotée)
  COMP(6, 2, "Le périmètre, c'est le tour : on ADDITIONNE tous les côtés.", () => {
    const n = entre(3, 5);
    const u = un(["cm", "m"]);
    const { cotes, canvas } = polyCote(n, entre(4, 9), u);
    const avecU = Math.random() < 0.5;
    const ecr = (l: number[], op: string) => l.map((c) => (avecU ? `${c} ${u}` : String(c))).join(` ${op} `);
    const juste = ecr(cotes, "+");
    const text = `${un(["Regarde la figure.", "Voici un " + NOM_POLY[n] + ".", "Les côtés sont en " + u + ".", "Observe ce " + NOM_POLY[n] + "."])} ${un([
      "Quel calcul donne son périmètre ?",
      "Quel calcul donne la longueur de son tour ?",
      "Quel calcul faut-il faire pour trouver son périmètre ?",
      "Comment calcule-t-on son périmètre ?",
      "Quelle opération donne son contour ?",
      "Choisis le bon calcul pour son périmètre.",
    ])}`;
    return {
      text,
      ...qcm(juste, [ecr(cotes, "×"), ecr(cotes.slice(0, -1), "+"), ecr([...cotes, cotes[0]], "+")]),
      explanation: exp(
        "Le périmètre est la somme de tous les côtés.",
        "On fait le tour de la figure et on ajoute chaque côté rencontré, une seule fois.",
        `Il y a ${n} côtés : ${juste}.`,
        `Le bon calcul est ${juste}.`,
      ),
      canvas,
    };
  }),

  // ★1 — le mot « périmètre », sur une figure
  COMP(7, 1, "Imagine que tu fais le tour de la figure avec ton doigt.", () => {
    const nom = un(NOMS_FIG);
    const juste = un(["la longueur de son tour", "la longueur de son contour", "la longueur de tous ses bords"]);
    return {
      text: un([
        `Le périmètre de ce ${nom}, c'est…`,
        `Que veut dire « le périmètre de ce ${nom} » ?`,
        `Pic regarde ce ${nom}. Son périmètre, c'est quoi ?`,
        `Qu'est-ce que le périmètre de ce ${nom} ?`,
        `Choisis ce qu'est le périmètre de ce ${nom}.`,
        `Ce ${nom} a un périmètre. C'est…`,
      ]),
      ...qcm(juste, ["ce qu'il y a à l'intérieur", "le nombre de ses côtés", "la longueur de son plus grand côté", "le nombre de ses coins"]),
      explanation: exp(
        "Le périmètre est la longueur du contour d'une figure.",
        "On suit le bord avec le doigt, tout autour, jusqu'au point de départ.",
        "Ce qui est à l'intérieur ne compte pas : seul le bord compte.",
        `C'est ${juste}.`,
      ),
      canvas: construction([figureNue(nom)], `Un ${nom}`),
    };
  }),

  // ★1 — combien de côtés à additionner, en comptant sur le dessin
  COMP(8, 1, "Compte les côtés avec ton doigt, sans en sauter.", () => {
    const n = entre(3, 8);
    const quoi = un(["cette figure", "cette étiquette", "ce badge", "ce panneau", "ce jardin", "ce tapis", "ce drapeau", "ce bout de papier"]);
    return {
      text: `${un(["", "Regarde bien.", "Voici " + quoi + ".", "Compte bien."])} ${un([
        `Pour le périmètre de ${quoi}, combien de côtés faut-il additionner ?`,
        `Combien de côtés faut-il ajouter pour le tour de ${quoi} ?`,
        `Le périmètre de ${quoi} : combien de longueurs à additionner ?`,
        `Pour faire le tour de ${quoi}, on additionne combien de côtés ?`,
        `Combien de côtés compte-t-on pour le périmètre de ${quoi} ?`,
      ])}`.trim(),
      ...qcmN(n, [n - 1, n + 1, n + 2, 4]),
      explanation: exp(
        "Le périmètre est la somme de TOUS les côtés.",
        "On compte les côtés en faisant le tour, sans en oublier.",
        `La figure a ${n} côtés.`,
        `Il faut additionner ${n} côtés.`,
      ),
      canvas: construction([morceau(polygoneAuHasard(n, 5).pts, [])], `Une figure à ${n} côtés`),
    };
  }),

  // ★3 — le tour ou le dedans, avec une histoire
  COMP(9, 3, "Le bord, c'est le périmètre. Le dedans, ce n'est pas le périmètre.", () => tourOuDedans(true)),

  // ★4 — la ficelle garde sa longueur, quelle que soit la forme
  COMP(10, 4, "On ne coupe pas la ficelle : sa longueur ne change pas.", () => {
    const n = entre(3, 5);
    const { cotes, canvas } = polyCote(n, entre(4, 8), "cm");
    const P = somme(cotes);
    const fil = un(["une ficelle", "un ruban", "un fil de laine", "une cordelette", "une guirlande", "un lacet"]);
    const forme = un(["un carré", "un rectangle", "un rond", "un triangle"].filter((f) => f !== `un ${NOM_POLY[n]}`));
    const S = qui();
    return {
      text: `${S} forme ce ${NOM_POLY[n]} avec ${fil}. On en fait ${forme}. ${un([
        `Quel est le périmètre ${forme.replace("un ", "du ")} ?`,
        `Combien mesure le tour ${forme.replace("un ", "du ")} ?`,
        "Combien mesure le tour, maintenant ?",
      ])}`,
      ...qcmN(P, [P - cotes[0], P + 4, P - 2, P + 10, cotes[0] * 4], "cm"),
      explanation: exp(
        "Le périmètre est la longueur du contour. Si on garde le même fil, le contour garde la même longueur.",
        "On calcule le tour du premier dessin : c'est toute la longueur du fil.",
        `${cotes.join(" + ")} = ${P}. Le fil mesure ${P} cm, et il fait tout le tour de la nouvelle forme.`,
        `Le périmètre est toujours ${P} cm.`,
      ),
      canvas,
    };
  }),

  // ★4 — on enlève ou on ajoute un carreau : le tour change-t-il ?
  COMP(11, 4, "Compte les côtés de carreaux du bord avant, puis après.", () => {
    const w = entre(3, 6);
    const h = entre(2, 4);
    const k = entre(1, w - 2);
    const plein = rect(h, w, 1, 0);
    const creux = sans(plein, [1, k]);
    const cas = un([
      { avant: plein, apres: sans(plein, [1, w - 1]), dit: "On enlève le carreau en haut à droite." },
      { avant: plein, apres: creux, dit: "On enlève un carreau au milieu du haut." },
      { avant: plein, apres: [...plein, [0, k] as Case], dit: "On colle un carreau de plus en haut." },
      { avant: creux, apres: plein, dit: "On bouche le creux avec un carreau." },
    ]);
    const a = contour(cas.avant);
    const b = contour(cas.apres);
    const chiffre = Math.random() < 0.5;
    const juste = b > a ? "il augmente" : b < a ? "il diminue" : "il ne change pas";
    return {
      text: chiffre
        ? `Son périmètre : ${a} cm. ${cas.dit} ${un(["Quel est le nouveau périmètre ?", "Combien mesure le tour maintenant ?"])}`
        : `${cas.dit} ${un(["Que devient le périmètre ?", "Le tour de la figure change-t-il ?", "Que se passe-t-il pour le périmètre ?"])}`,
      ...(chiffre ? qcmN(b, [a, a + 1, a - 1, b + 2, b - 2, a + 4], "cm") : qcm(juste, ["il augmente", "il diminue", "il ne change pas"])),
      explanation: exp(
        "Le périmètre se compte sur le BORD, côté de carreau par côté de carreau.",
        "On compte le tour avant, puis le tour après, et on compare.",
        `Avant : ${a} cm. Après : ${b} cm.${b === a ? " Le coin enlevé retire deux bouts de bord, mais en fait apparaître deux autres." : ""}`,
        chiffre ? `Le nouveau périmètre est ${b} cm.` : `Le périmètre ${juste.replace("il ", "")}.`,
      ),
      canvas: quadrillage([normaliser(cas.avant)]),
    };
  }),
];

/* =========================================================
   CE2_PERIMETRE_POLYGONE — additionner tous les côtés
   Le piège : le côté qu'on oublie.
========================================================= */
const POLY = gabarit("ce2_perimetre_polygone");

/** Leurres d'une somme : un côté oublié, un côté compté deux fois, ±1, ±10. */
const leurresSomme = (cotes: number[]) => {
  const P = somme(cotes);
  return [P - Math.min(...cotes), P - cotes[cotes.length - 1], P + cotes[0], P + 10, P - 10, P + 1, P - 1];
};

const polygoneItems: TutorBankItemV4[] = [
  fixe({
    id: "ce2_perimetre_polygone_fixed_1",
    microId: "ce2_perimetre_polygone",
    difficulty: 2,
    theme: "neutral",
    text: "Un triangle a pour côtés 6 cm, 8 cm et 5 cm. Quel est son périmètre ?",
    format: "qcm",
    choices: ["14 cm", "19 cm", "13 cm", "20 cm"],
    expected: ["19 cm"],
    comparator: "mcq_exact",
    hint: "Additionne les trois côtés.",
    explanation: exp(
      "Le périmètre d'un polygone est la somme de tous ses côtés.",
      "On additionne les côtés un par un, en faisant le tour de la figure.",
      "6 + 8 + 5 = 19.",
      "Le périmètre est 19 cm.",
    ),
    tags: ["ce2", "perimetre", "polygone"],
  }),
  fixe({
    id: "ce2_perimetre_polygone_fixed_2",
    microId: "ce2_perimetre_polygone",
    difficulty: 4,
    theme: "neutral",
    text: "Côtés d'un pentagone : 4, 6, 3, 5 et 7 cm. Un élève trouve 18 cm. Où s'est-il trompé ?",
    format: "qcm",
    choices: ["il a compté un côté deux fois", "il a multiplié au lieu d'additionner", "il a oublié un côté", "il n'y a pas d'erreur"],
    expected: ["il a oublié un côté"],
    comparator: "mcq_exact",
    hint: "Additionne les cinq côtés : 4 + 6 + 3 + 5 + 7. Que trouve l'élève sans le 7 ?",
    explanation: exp(
      "Le périmètre est la somme de TOUS les côtés : il en faut autant que la figure en possède.",
      "On compte d'abord les côtés, puis on vérifie qu'on en a additionné le bon nombre.",
      "4 + 6 + 3 + 5 + 7 = 25. L'élève a trouvé 18, c'est-à-dire 25 - 7 : il a fait le tour en sautant le dernier côté. Marquer chaque côté d'un point au crayon pendant qu'on additionne évite cette erreur.",
      "Il a oublié un côté.",
    ),
    tags: ["ce2", "perimetre", "polygone", "piege", "qcm"],
  }),
  fixe({
    id: "ce2_perimetre_polygone_fixed_3",
    microId: "ce2_perimetre_polygone",
    difficulty: 3,
    theme: "reunion",
    text: "Un foulard carré a 35 cm de côté. Quelle longueur de biais faut-il pour le border ?",
    format: "qcm",
    choices: ["105 cm", "70 cm", "150 cm", "140 cm"],
    expected: ["140 cm"],
    comparator: "mcq_exact",
    hint: "Dans un carré, les quatre côtés sont égaux.",
    explanation: exp(
      "Le périmètre d'un carré est la somme de ses quatre côtés, tous égaux.",
      "On additionne quatre fois le côté, ce qui revient à multiplier par 4.",
      "35 + 35 + 35 + 35 = 140, ou plus vite : 35 × 4 = 140.",
      "Il faut 140 cm de biais.",
    ),
    tags: ["ce2", "perimetre", "polygone", "reunion"],
  }),

  // ★3 — un vrai objet à entourer, ses côtés sur le dessin
  POLY(1, 3, "Additionne tous les côtés, sans en sauter un seul.", () => {
    const n = entre(3, 5);
    const m = monde();
    const { cotes, canvas } = polyCote(n, m.u === "cm" ? entre(5, 15) : entre(4, 20), m.u);
    const P = somme(cotes);
    return {
      text: `${qui()} veut ${autour(m)}. ${un(QUESTION_FIL(m))}`,
      ...qcmN(P, leurresSomme(cotes), m.u),
      explanation: exp(
        "Le périmètre d'un polygone est la somme de tous ses côtés.",
        "On additionne les côtés un par un en faisant le tour de la figure, sans en oublier.",
        `${cotes.join(" + ")} = ${P}. Il y avait bien ${n} côtés à additionner.`,
        `Il faut ${P} ${m.u} de ${m.fil}.`,
      ),
      canvas,
    };
  }),

  // ★4 — une figure sur quadrillage, à contour biscornu
  POLY(2, 4, "Compte les côtés de carreaux du CONTOUR, pas les carreaux de l'intérieur.", () => {
    const cases = polyomino();
    const P = contour(cases);
    const u = un(["cm", "m"] as const);
    const quoi = u === "cm" ? un(["ce badge", "ce tapis de poupée", "cette étiquette", "ce motif", "ce morceau de tissu", "ce gâteau vu de haut"]) : un(["ce jardin", "ce potager", "ce bassin", "ce parc", "ce champ", "cette cour", "cet enclos"]);
    return {
      text: `${un(UN_CARREAU(u))} ${un([`Quel est le périmètre de ${quoi} ?`, `Combien mesure le tour de ${quoi} ?`, `Calcule le périmètre de ${quoi}.`])}`,
      ...qcmN(P, [cases.length, P - 2, P + 2, P - 1, P + 1], u),
      explanation: exp(
        "Le périmètre est la longueur du contour : on compte les côtés de carreaux qui bordent la figure.",
        "On fait le tour avec le doigt en comptant, sans compter les traits de l'intérieur ni les carreaux eux-mêmes.",
        `En faisant tout le tour, on compte ${P} côtés de carreaux. (Il y a ${cases.length} carreaux, mais ce n'est pas la question.)`,
        `Le périmètre est ${P} ${u}.`,
      ),
      canvas: quadrillage([cases]),
    };
  }),

  // ★2 — la figure cotée, calcul direct
  POLY(3, 2, "Additionne tous les côtés écrits sur le dessin.", () => {
    const n = entre(3, 6);
    const u = un(["cm", "m"]);
    const { cotes, canvas } = polyCote(n, entre(3, 9), u);
    const P = somme(cotes);
    return {
      text: `${un([`Ce ${NOM_POLY[n]} a des côtés en ${u}.`, `Les côtés de ce ${NOM_POLY[n]} sont écrits en ${u}.`, `Voici un ${NOM_POLY[n]}, mesuré en ${u}.`, `Regarde les côtés de ce ${NOM_POLY[n]}, en ${u}.`])} ${un(QUEL_PERIMETRE)}`,
      ...qcmN(P, leurresSomme(cotes), u),
      explanation: exp(
        "Le périmètre d'un polygone est la somme de tous ses côtés.",
        "On additionne les côtés un par un en faisant le tour.",
        `${cotes.join(" + ")} = ${P}.`,
        `Le périmètre est ${P} ${u}.`,
      ),
      canvas,
    };
  }),

  // ★2 — un rectangle sur quadrillage
  POLY(4, 2, "Fais le tour avec ton doigt et compte les côtés de carreaux.", () => {
    const w = entre(2, 6);
    const h = entre(2, 4);
    const cases = rect(h, w);
    const P = contour(cases);
    const quoi = un(["cette figure", "ce dessin", "ce tapis", "ce drapeau", "cette étiquette", "ce morceau de tissu", "ce badge", "ce napperon"]);
    return {
      text: `${un(UN_CARREAU("cm"))} ${un([`Quel est le périmètre de ${quoi} ?`, `Combien mesure le tour de ${quoi} ?`, `Calcule le périmètre de ${quoi}.`])}`,
      ...qcmN(P, [w * h, w + h, P + 2, P - 2, P + 1], "cm"),
      explanation: exp(
        "Le périmètre est la longueur du contour.",
        "On compte les côtés de carreaux sur le bord, tout autour.",
        `${w} + ${h} + ${w} + ${h} = ${P}.`,
        `Le périmètre est ${P} cm.`,
      ),
      canvas: quadrillage([cases]),
    };
  }),

  // ★3 — tous les côtés égaux : on additionne le même nombre plusieurs fois
  POLY(5, 3, "Tous les côtés ont la même longueur : compte-les bien.", () => {
    const f = un([
      { n: 3, nom: "triangle aux 3 côtés égaux" },
      { n: 4, nom: "carré" },
      { n: 4, nom: "losange" },
      { n: 5, nom: "pentagone aux 5 côtés égaux" },
      { n: 6, nom: "hexagone aux 6 côtés égaux" },
    ]);
    const m = monde();
    const c = m.u === "cm" ? entre(3, 15) : entre(2, 12);
    const P = f.n * c;
    let pts = ptsRegulier(f.n, c);
    if (f.nom === "carré") pts = ptsRectangle(c, c);
    if (f.nom === "losange") pts = [{ x: 0, y: 0 }, { x: c, y: 0 }, { x: c * 1.6, y: c * 0.8 }, { x: c * 0.6, y: c * 0.8 }];
    const textes = pts.map((_, i) => (i === 0 ? `${c} ${m.u}` : null));
    return {
      text: `${qui()} veut ${autour(m)}. Ses côtés sont égaux. ${un(QUESTION_FIL(m))}`,
      ...qcmN(P, [(f.n - 1) * c, (f.n + 1) * c, c + f.n, 4 * c, P + 10], m.u),
      explanation: exp(
        "Le périmètre est la somme de tous les côtés.",
        `Les ${f.n} côtés sont égaux : on additionne ${f.n} fois la même longueur.`,
        `${Array(f.n).fill(c).join(" + ")} = ${P}, ou plus vite ${c} × ${f.n} = ${P}.`,
        `Il faut ${P} ${m.u} de ${m.fil}.`,
      ),
      canvas: construction([morceau(pts, textes, { codes: pts.map(() => 1), droits: f.nom === "carré" })], `Un ${f.nom}`),
    };
  }),

  // ★4 — le côté qui manque, quand on connaît le tour
  POLY(6, 4, "Additionne les côtés connus, puis cherche ce qui manque pour arriver au périmètre.", () => {
    const n = entre(3, 5);
    const u = un(["cm", "m"]);
    const cache = entre(0, n - 1);
    const { cotes, canvas } = polyCote(n, entre(4, 10), u, cache);
    const P = somme(cotes);
    const x = cotes[cache];
    const connus = cotes.filter((_, i) => i !== cache);
    const S = qui();
    return {
      text: `${un([
        `Le périmètre de ce ${NOM_POLY[n]} est ${P} ${u}.`,
        `${S} a fait le tour de ce ${NOM_POLY[n]} : ${P} ${u} en tout.`,
        `Pour entourer ce ${NOM_POLY[n]}, il a fallu ${P} ${u} de ruban.`,
      ])} ${un(["Combien mesure le côté marqué « ? » ?", "Quelle est la longueur du côté « ? » ?", "Trouve le côté qui manque."])}`,
      ...qcmN(x, [somme(connus), x + 1, x - 1, x + 2, P], u),
      explanation: exp(
        "Le périmètre est la somme de TOUS les côtés, celui qui manque compris.",
        "On additionne les côtés connus, puis on cherche combien il manque pour arriver au périmètre.",
        `${connus.join(" + ")} = ${somme(connus)}. Puis ${P} - ${somme(connus)} = ${x}.`,
        `Le côté « ? » mesure ${x} ${u}.`,
      ),
      canvas,
    };
  }),
];

/* =========================================================
   CE2_PERIMETRE_COMPARER
   Deux méthodes. On calcule quand on a les mesures ; on
   REPORTE AU COMPAS quand on ne les a pas. Les figés du bas
   de section couvrent la seconde : elle ne demande aucun
   nombre, et elle tranche quand même.
========================================================= */
const COMPA = gabarit("ce2_perimetre_comparer");

const GAUCHE_DROITE = ["la figure de gauche", "la figure de droite", "elles ont le même périmètre"];
const verdict = (a: number, b: number) => (a === b ? GAUCHE_DROITE[2] : a > b ? GAUCHE_DROITE[0] : GAUCHE_DROITE[1]);
const QUI_GAGNE = [
  "Quelle figure a le plus grand périmètre ?",
  "Quelle figure a le plus long tour ?",
  "Quelle figure a le contour le plus long ?",
  "Quelle figure demande le plus de ruban ?",
];

/** Une petite figure cotée pour comparer : triangle, rectangle ou carré. */
function petiteFigure(u: string): Fig & { cotes: number[]; nom: string } {
  const t = un(["triangle", "rectangle", "carré", "quadrilatère"]);
  if (t === "rectangle") {
    const L = entre(4, 9);
    const l = entre(2, L - 1);
    return { nom: "rectangle", pts: ptsRectangle(L, l), textes: texteRect(`${L} ${u}`, `${l} ${u}`), droits: true, cotes: [L, l, L, l] };
  }
  if (t === "carré") {
    const c = entre(3, 7);
    return { nom: "carré", pts: ptsRectangle(c, c), textes: [`${c} ${u}`, null, null, null], droits: true, codes: [1, 1, 1, 1], cotes: [c, c, c, c] };
  }
  const n = t === "triangle" ? 3 : 4;
  const { pts, cotes } = polygoneAuHasard(n, entre(4, 7));
  return { nom: NOM_POLY[n], pts, textes: cotes.map((c) => `${c} ${u}`), cotes };
}

const comparerItems: TutorBankItemV4[] = [
  fixe({
    id: "ce2_perimetre_comparer_fixed_1",
    microId: "ce2_perimetre_comparer",
    difficulty: 3,
    theme: "neutral",
    text: "Triangle : 3 côtés de 5 cm. Carré : 4 côtés de 4 cm. Lequel a le plus grand périmètre ?",
    format: "qcm",
    choices: ["le triangle", "ils ont le même périmètre", "le carré", "on ne peut pas savoir"],
    expected: ["le carré"],
    comparator: "mcq_exact",
    hint: "Calcule les deux périmètres avant de comparer.",
    explanation: exp(
      "Pour comparer deux périmètres, on les calcule d'abord tous les deux.",
      "On additionne les côtés de chaque figure, puis on compare les deux résultats.",
      "Triangle : 5 + 5 + 5 = 15 cm. Carré : 4 × 4 = 16 cm. Le carré a des côtés plus courts, mais il en a un de plus : c'est lui qui gagne.",
      "C'est le carré, avec 16 cm.",
    ),
    tags: ["ce2", "perimetre", "comparer", "piege", "qcm"],
  }),
  fixe({
    id: "ce2_perimetre_comparer_fixed_2",
    microId: "ce2_perimetre_comparer",
    difficulty: 5,
    theme: "neutral",
    text: "Carré de 5 cm de côté, rectangle de 9 cm sur 1 cm : que dire de leurs périmètres ?",
    format: "qcm",
    choices: ["le carré a le plus grand", "ils sont égaux : 20 cm tous les deux", "le rectangle a le plus grand", "on ne peut pas comparer des formes différentes"],
    expected: ["ils sont égaux : 20 cm tous les deux"],
    comparator: "mcq_exact",
    hint: "Calcule les deux, malgré l'allure très différente des deux figures.",
    explanation: exp(
      "Deux figures de formes très différentes peuvent avoir exactement le même périmètre.",
      "On calcule chaque périmètre séparément, sans se fier à l'allure des figures.",
      "Carré : 5 × 4 = 20 cm. Rectangle : 9 + 1 + 9 + 1 = 20 cm. Le rectangle est long et plat, le carré est compact — leurs contours mesurent pourtant la même chose.",
      "Ils sont égaux : 20 cm chacun.",
    ),
    tags: ["ce2", "perimetre", "comparer", "piege", "qcm"],
  }),

  // ★4 — un carré, un rectangle : on calcule les deux
  COMPA(1, 4, "Calcule les deux périmètres, puis compare.", () => {
    const c = entre(3, 9);
    const Pc = 4 * c;
    const ecart = un([-4, -2, 0, 2, 4]);
    const Pr = Pc + ecart;
    const L = entre(Math.ceil(Pr / 4) + 1, Pr / 2 - 1);
    const l = Pr / 2 - L;
    const u = un(["cm", "m"]);
    const juste = Pc === Pr ? "ils ont le même périmètre" : Pc > Pr ? "le carré" : "le rectangle";
    const carreAGauche = Math.random() < 0.5;
    const fc: Fig = { pts: ptsRectangle(c, c), textes: [`${c} ${u}`, null, null, null], droits: true, codes: [1, 1, 1, 1] };
    const fr: Fig = { pts: ptsRectangle(L, l), textes: texteRect(`${L} ${u}`, `${l} ${u}`), droits: true };
    return {
      text: `${un(["", `${qui()} compare deux ${u === "cm" ? "cartes" : "jardins"}.`, `${qui()} hésite entre deux ${u === "cm" ? "napperons" : "enclos"}.`])} ${un(["Lequel a le plus grand périmètre : le carré ou le rectangle ?", "Lequel a le plus long tour : le carré ou le rectangle ?"])}`.trim(),
      ...qcm(juste, ["le carré", "le rectangle", "ils ont le même périmètre", "on ne peut pas savoir"]),
      explanation: exp(
        "Pour comparer deux périmètres, on les calcule d'abord tous les deux.",
        "On additionne les côtés de chaque figure, puis on compare les résultats.",
        `Carré : ${c} × 4 = ${Pc} ${u}. Rectangle : ${L} + ${l} + ${L} + ${l} = ${Pr} ${u}.`,
        Pc === Pr ? "Ils ont le même périmètre." : `${cap(juste)} a le plus grand périmètre.`,
      ),
      canvas: carreAGauche ? deuxFigures(fc, fr, "Un carré et un rectangle") : deuxFigures(fr, fc, "Un rectangle et un carré"),
    };
  }),

  // ★4 — figure A, figure B : le nombre de côtés ne décide pas
  COMPA(2, 4, "Additionne les côtés de chaque figure avant de choisir.", () => {
    // Les longueurs sont MESURÉES sur le dessin : le triangle et le quadrilatère
    // tirés au hasard donnent leurs côtés, le dessin les écrit.
    const pa = polygoneAuHasard(3, entre(4, 8));
    const pb = polygoneAuHasard(4, entre(3, 6));
    const a = pa.cotes;
    const b = pb.cotes;
    const sa = somme(a);
    const sb = somme(b);
    const juste = sa === sb ? "les deux ont le même périmètre" : sa > sb ? "la figure A" : "la figure B";
    const S = qui();
    return {
      text: `${un(["", `${S} compare deux étiquettes.`, `${S} a découpé deux badges.`])} ${un(["Quelle figure a le plus grand périmètre", "Quelle figure a le plus long tour"])} : A, à gauche, ou B, à droite ?`.trim(),
      ...qcm(juste, ["la figure A", "la figure B", "les deux ont le même périmètre", "on ne peut pas comparer un triangle et un quadrilatère"]),
      explanation: exp(
        "Le périmètre est la somme des côtés : le nombre de côtés ne décide de rien tout seul.",
        "On calcule chaque périmètre, puis on compare les deux nombres.",
        `Figure A : ${a.join(" + ")} = ${sa} cm. Figure B : ${b.join(" + ")} = ${sb} cm.`,
        `${cap(juste)}.`,
      ),
      // Le dessin porte les deux figures et leurs mesures (l'énoncé ne les recopie plus).
      canvas: deuxFigures({ pts: pa.pts, textes: a.map((c) => `${c} cm`) }, { pts: pb.pts, textes: b.map((c) => `${c} cm`) }, "La figure A et la figure B"),
    };
  }),

  // ★4 — au compas : un report par côté
  COMPA(3, 4, "Un report par côté. Compte les côtés de la figure.", () => {
    const n = entre(3, 8);
    const S = qui();
    return {
      text: `${un(["", `${S} n'a qu'un compas.`, "Pas de règle, juste un compas."])} ${un([
        "Combien de reports pour le périmètre de cette figure ?",
        "Pour déplier le tour de cette figure, combien de reports ?",
        "On reporte bout à bout les côtés de cette figure. Combien de reports ?",
      ])}`.trim(),
      ...qcm(`${n} fois`, [`${n - 1} fois`, `${n + 1} fois`, "une seule fois", `${n * 2} fois`]),
      explanation: exp(
        "Le périmètre est la somme de TOUS les côtés : au compas, cela fait un report par côté.",
        "On compte les côtés de la figure, et on reporte autant de fois, bout à bout.",
        `La figure a ${n} côtés : il faut ${n} reports. En oublier un, c'est laisser un morceau du tour de côté — le segment serait trop court.`,
        `Il faut reporter ${n} fois.`,
      ),
      canvas: construction([morceau(polygoneAuHasard(n, 5).pts, [])], `Une figure à ${n} côtés`),
    };
  }),

  // ★3 — deux figures cotées, côte à côte
  COMPA(4, 3, "Calcule le tour de chaque figure, puis compare.", () => {
    const u = un(["cm", "m"]);
    const fa = petiteFigure(u);
    let fb = petiteFigure(u);
    for (let k = 0; k < 5 && fb.nom === fa.nom; k++) fb = petiteFigure(u);
    const pa = somme(fa.cotes);
    const pb = somme(fb.cotes);
    const [A, B] = deuxNoms();
    const objet = u === "cm" ? un(["badge", "drapeau", "napperon", "coussin", "set de table", "cadre"]) : un(["jardin", "potager", "enclos", "bassin", "parc", "champ"]);
    const avecNoms = Math.random() < 0.6;
    const juste = avecNoms ? (pa === pb ? "les deux ont le même périmètre" : pa > pb ? `celui de ${A}` : `celui de ${B}`) : verdict(pa, pb);
    return {
      text: avecNoms
        ? `À gauche, le ${objet} de ${A} ; à droite, celui de ${B}. ${un(["Lequel a le plus grand périmètre ?", "Lequel a le plus long tour ?", "Lequel a le contour le plus long ?"])}`
        : `${un(["Regarde ces deux figures.", "Voici deux figures, mesurées en " + u + ".", "Compare ces deux figures."])} ${un(QUI_GAGNE)}`,
      ...qcm(juste, avecNoms ? [`celui de ${A}`, `celui de ${B}`, "les deux ont le même périmètre"] : GAUCHE_DROITE),
      explanation: exp(
        "Pour comparer deux périmètres, on calcule le tour de chaque figure.",
        "On additionne tous les côtés de chacune, puis on compare les deux nombres.",
        `À gauche : ${fa.cotes.join(" + ")} = ${pa} ${u}. À droite : ${fb.cotes.join(" + ")} = ${pb} ${u}.`,
        `Réponse : ${juste}.`,
      ),
      canvas: deuxFigures(fa, fb, "Deux figures cotées"),
    };
  }),

  // ★3 — deux figures sur le même quadrillage
  COMPA(5, 3, "Compte les côtés de carreaux du bord, pour chaque figure.", () => {
    const a = Math.random() < 0.5 ? rect(entre(2, 3), entre(2, 4)) : polyomino(4, 3);
    const b = Math.random() < 0.5 ? rect(entre(2, 3), entre(2, 4)) : polyomino(4, 3);
    const pa = contour(a);
    const pb = contour(b);
    const quoi = un(["deux figures", "deux tapis", "deux jardins", "deux dessins", "deux étiquettes", "deux enclos"]);
    return {
      text: `${un(["Voici " + quoi + ".", qui() + " a dessiné " + quoi + "."])} ${un(UN_CARREAU("cm"))} ${un(QUI_GAGNE)}`,
      ...qcm(verdict(pa, pb), GAUCHE_DROITE),
      explanation: exp(
        "Le périmètre est la longueur du bord : on compte les côtés de carreaux tout autour.",
        "On fait le tour de chaque figure en comptant, puis on compare.",
        `À gauche : ${pa} cm. À droite : ${pb} cm.`,
        `Réponse : ${verdict(pa, pb)}.`,
      ),
      canvas: quadrillage([a, b]),
    };
  }),

  // ★5 — même périmètre, formes très différentes ?
  COMPA(6, 5, "Calcule les deux, sans te fier à l'allure des figures.", () => {
    const c = entre(3, 8);
    let ecart = un([0, 0, -2, 2, -1, 1]);
    if (2 * c + ecart - 1 < c + 2) ecart = 0;
    const demi = 2 * c + ecart;
    const L = entre(c + 2, demi - 1);
    const l = demi - L;
    const u = un(["cm", "m"]);
    const Pc = 4 * c;
    const Pr = 2 * demi;
    const juste = Pc === Pr ? "ils ont le même périmètre" : Pc > Pr ? "le carré a le plus grand périmètre" : "le rectangle a le plus grand périmètre";
    return {
      text: `${un(["", "Deux figures, deux allures.", `${qui()} compare deux ${u === "cm" ? "tapis" : "potagers"}.`, `${qui()} hésite entre deux ${u === "cm" ? "cadres" : "parcs"}.`])} ${un(["Que dire des périmètres du carré et du rectangle ?", "Compare les périmètres du carré et du rectangle.", "Lequel a le plus long tour : le carré ou le rectangle ?"])}`.trim(),
      ...qcm(juste, ["ils ont le même périmètre", "le carré a le plus grand périmètre", "le rectangle a le plus grand périmètre", "on ne peut pas comparer des formes différentes"]),
      explanation: exp(
        "Deux figures de formes très différentes peuvent avoir le même périmètre — ou pas : il faut calculer.",
        "On calcule chaque périmètre, sans se fier à l'allure.",
        `Carré : ${c} × 4 = ${Pc} ${u}. Rectangle : ${L} + ${l} + ${L} + ${l} = ${Pr} ${u}.`,
        `${cap(juste)}.`,
      ),
      canvas: deuxFigures(
        { pts: ptsRectangle(c, c), textes: [`${c} ${u}`, null, null, null], droits: true, codes: [1, 1, 1, 1] },
        { pts: [{ x: 0, y: 0 }, { x: L, y: 0 }, { x: L, y: l }, { x: 0, y: l }], textes: texteRect(`${L} ${u}`, `${l} ${u}`), droits: true },
        "Un carré et un rectangle allongé",
      ),
    };
  }),

  // ★5 — la plus « grosse » figure n'a pas forcément le plus long tour
  COMPA(7, 5, "Ne regarde pas la taille du dedans : compte seulement le bord.", () => {
    let a: Case[] = rect(3, 3);
    let b: Case[] = rect(1, 6);
    // Le piège : la figure qui a le plus de carreaux n'a PAS le plus long tour
    // (strictement plus court le plus souvent, parfois égal).
    const strict = Math.random() < 0.7;
    for (let k = 0; k < 60; k++) {
      a = rect(entre(2, 4), entre(2, 4));
      b = Math.random() < 0.5 ? rect(1, entre(4, 7)) : polyomino(5, 3);
      if (a.length > b.length && (strict ? contour(a) < contour(b) : contour(a) === contour(b))) break;
    }
    const gauche = Math.random() < 0.5;
    const [g, d] = gauche ? [a, b] : [b, a];
    const pg = contour(g);
    const pd = contour(d);
    return {
      text: `${un(["Une figure a plus de carreaux que l'autre.", "Une des figures paraît plus grosse.", "Regarde bien le bord."])} ${un(QUI_GAGNE)}`,
      ...qcm(verdict(pg, pd), GAUCHE_DROITE),
      explanation: exp(
        "Le périmètre est la longueur du bord. Le nombre de carreaux de l'intérieur ne le dit pas.",
        "On compte les côtés de carreaux du bord de chaque figure, puis on compare.",
        `À gauche : ${pg} cm (${g.length} carreaux). À droite : ${pd} cm (${d.length} carreaux). Une figure plus « grosse » peut avoir un tour plus court.`,
        `Réponse : ${verdict(pg, pd)}.`,
      ),
      canvas: quadrillage([g, d]),
    };
  }),

  // --- Comparer SANS RÈGLE GRADUÉE, au compas ---------------
  // Le compas ne mesure rien : il garde un écartement et le
  // repose ailleurs. On déplie le contour sur une droite.
  fixe({
    id: "ce2_perimetre_comparer_fixed_3",
    microId: "ce2_perimetre_comparer",
    difficulty: 4,
    theme: "neutral",
    text: "Sans règle graduée, avec un seul compas : comment comparer les périmètres de deux polygones ?",
    format: "qcm",
    choices: [
      "on lit la longueur de chaque côté sur le compas",
      "on reporte les côtés bout à bout sur une droite, pour chaque figure, puis on compare les deux segments obtenus",
      "on regarde laquelle des deux figures est la plus grande",
      "c'est impossible sans règle graduée",
    ],
    expected: ["on reporte les côtés bout à bout sur une droite, pour chaque figure, puis on compare les deux segments obtenus"],
    comparator: "mcq_exact",
    hint: "Le compas ne donne aucun nombre. Mais il garde un écartement, et il peut le reposer ailleurs.",
    explanation: exp(
      "Un compas ne mesure pas : il garde un écartement et le reporte où l'on veut.",
      "On ouvre le compas sur un côté, on le reporte sur une droite ; on repart de la pointe d'arrivée pour le côté suivant, et ainsi de suite jusqu'au dernier côté.",
      "À la fin, chaque figure a donné un segment aussi long que son contour déplié. Le plus long des deux segments désigne le plus grand périmètre — et on n'a écrit aucun nombre.",
      "On reporte les côtés bout à bout sur une droite, puis on compare les deux segments.",
    ),
    tags: ["ce2", "perimetre", "comparer", "compas", "methode", "qcm"],
  }),
  fixe({
    id: "ce2_perimetre_comparer_fixed_4",
    microId: "ce2_perimetre_comparer",
    difficulty: 4,
    theme: "neutral",
    text: "On reporte au compas les cinq côtés d'un pentagone, bout à bout. Que représente le segment obtenu ?",
    format: "qcm",
    choices: ["le plus grand côté du pentagone", "la moitié du périmètre", "le périmètre du pentagone", "le nombre de côtés du pentagone"],
    expected: ["le périmètre du pentagone"],
    comparator: "mcq_exact",
    hint: "On a posé le tour de la figure, morceau après morceau, sur une ligne droite.",
    explanation: exp(
      "Le périmètre est la longueur du contour : on peut le déplier sans le raccourcir.",
      "On met les cinq côtés bout à bout sur une droite, dans n'importe quel ordre.",
      "Les cinq côtés mis l'un derrière l'autre font exactement le tour de la figure, mais tendu. Le segment obtenu a donc la même longueur que le contour : c'est le périmètre.",
      "C'est le périmètre du pentagone.",
    ),
    tags: ["ce2", "perimetre", "comparer", "compas", "qcm"],
  }),
  fixe({
    id: "ce2_perimetre_comparer_fixed_5",
    microId: "ce2_perimetre_comparer",
    difficulty: 5,
    theme: "neutral",
    text: "En reportant ses côtés au compas, la figure A donne un segment plus long que B. Que conclure ?",
    format: "qcm",
    choices: [
      "on ne peut rien conclure tant qu'on n'a pas mesuré en centimètres",
      "A a plus de côtés que B",
      "A a le plus grand périmètre, même sans connaître une seule mesure",
      "A occupe plus de place sur la feuille que B",
    ],
    expected: ["A a le plus grand périmètre, même sans connaître une seule mesure"],
    comparator: "mcq_exact",
    hint: "Comparer, ce n'est pas mesurer. Il suffit de savoir lequel est le plus long.",
    explanation: exp(
      "Comparer deux longueurs ne demande pas de les mesurer : il suffit de les mettre côte à côte.",
      "Chaque segment reporté vaut le périmètre de sa figure. On compare les deux segments directement.",
      "Le segment de A est plus long, donc le contour de A est plus long : A a le plus grand périmètre. Le nombre de côtés ne dit rien — une figure à trois grands côtés peut battre une figure à six petits. Et la place occupée sur la feuille, c'est l'intérieur, pas le contour.",
      "A a le plus grand périmètre.",
    ),
    tags: ["ce2", "perimetre", "comparer", "compas", "piege", "qcm"],
  }),
];

/* =========================================================
   CE2_PERIMETRE_RECTANGLE — le cas du rectangle et du carré
   Le piège : multiplier les deux côtés au lieu de les
   additionner.
========================================================= */
const RECT = gabarit("ce2_perimetre_rectangle");

const leurresRect = (L: number, l: number) => [L + l, L * l, 2 * L + l, L + 2 * l, 2 * (L + l) + 2, 2 * (L + l) - 2];
const dessinRect = (L: number, l: number, u: string, tl: string | null = `${L} ${u}`, tL: string | null = `${l} ${u}`) =>
  construction([morceau(ptsRectangle(L, l), texteRect(tl, tL), { droits: true })], "Un rectangle");
const dessinCarre = (c: number, t: string) => construction([morceau(ptsRectangle(c, c), [t, null, null, null], { droits: true, codes: [1, 1, 1, 1] })], "Un carré");

const rectangleItems: TutorBankItemV4[] = [
  fixe({
    id: "ce2_perimetre_rectangle_fixed_1",
    microId: "ce2_perimetre_rectangle",
    difficulty: 2,
    theme: "neutral",
    text: "Un rectangle mesure 8 cm de long et 3 cm de large. Quel est son périmètre ?",
    format: "qcm",
    choices: ["11 cm", "24 cm", "22 cm", "19 cm"],
    expected: ["22 cm"],
    comparator: "mcq_exact",
    hint: "Un rectangle a DEUX longueurs et DEUX largeurs.",
    explanation: exp(
      "Le périmètre d'un rectangle est la somme de ses quatre côtés : deux longueurs et deux largeurs.",
      "On additionne les quatre côtés, ou on double la longueur, on double la largeur, et on additionne.",
      "8 + 3 + 8 + 3 = 22. Autrement dit : 16 + 6 = 22.",
      "Le périmètre est 22 cm.",
    ),
    tags: ["ce2", "perimetre", "rectangle", "canvas"],
    canvas: rectangleCote(8, 3),
  }),
  fixe({
    id: "ce2_perimetre_rectangle_fixed_2",
    microId: "ce2_perimetre_rectangle",
    difficulty: 4,
    theme: "neutral",
    text: "Rectangle de 8 cm sur 3 cm : un élève calcule 8 × 3 = 24 cm de périmètre. Où s'est-il trompé ?",
    format: "qcm",
    choices: ["il a oublié de doubler", "le périmètre s'additionne, il ne se multiplie pas", "il fallait faire 8 + 3", "il n'y a pas d'erreur"],
    expected: ["le périmètre s'additionne, il ne se multiplie pas"],
    comparator: "mcq_exact",
    hint: "Fais le tour du rectangle à pied : que rencontres-tu ?",
    explanation: exp(
      "Le périmètre est la longueur du contour : on parcourt les côtés les uns après les autres, donc on les additionne.",
      "On fait le tour de la figure en additionnant chaque côté rencontré.",
      "8 + 3 + 8 + 3 = 22, et non 24. Multiplier la longueur par la largeur, c'est une autre question — celle de ce qu'il y a à l'intérieur, qui s'apprend au CM1.",
      "Le périmètre s'additionne : il vaut 22 cm.",
    ),
    tags: ["ce2", "perimetre", "rectangle", "piege", "qcm"],
  }),
  fixe({
    id: "ce2_perimetre_rectangle_fixed_3",
    microId: "ce2_perimetre_rectangle",
    difficulty: 3,
    theme: "neutral",
    text: "Un carré a un côté de 9 cm. Quel est son périmètre ?",
    format: "qcm",
    choices: ["18 cm", "27 cm", "81 cm", "36 cm"],
    expected: ["36 cm"],
    comparator: "mcq_exact",
    hint: "Les quatre côtés sont égaux : c'est le seul cas où une multiplication va plus vite.",
    explanation: exp(
      "Le périmètre d'un carré est la somme de ses quatre côtés, tous égaux.",
      "On additionne quatre fois le côté, ce qui revient à le multiplier par 4.",
      "9 + 9 + 9 + 9 = 36, ou plus vite : 9 × 4 = 36. Ici la multiplication est légitime — elle remplace une addition de termes égaux, elle ne calcule pas l'intérieur.",
      "Le périmètre est 36 cm.",
    ),
    tags: ["ce2", "perimetre", "rectangle", "remarquable"],
  }),

  // ★3 — un objet rectangulaire à entourer
  RECT(1, 3, "Deux longueurs et deux largeurs.", () => {
    const m = monde();
    const L = m.u === "cm" ? entre(6, 30) : entre(5, 25);
    const l = entre(2, L - 1);
    const P = 2 * (L + l);
    return {
      text: `${qui()} veut ${autour(m)} rectangulaire. ${un(QUESTION_FIL(m))}`,
      ...qcmN(P, leurresRect(L, l), m.u),
      explanation: exp(
        "Le périmètre d'un rectangle est la somme de ses quatre côtés : deux longueurs et deux largeurs.",
        "On double la longueur, on double la largeur, puis on additionne.",
        `${L} + ${l} + ${L} + ${l} = ${P}. Autrement dit ${2 * L} + ${2 * l} = ${P}.`,
        `Il faut ${P} ${m.u} de ${m.fil}.`,
      ),
      canvas: dessinRect(L, l, m.u),
    };
  }),

  // ★3 — le carré, dans les deux sens
  RECT(2, 3, "Dans un carré, les quatre côtés sont égaux.", () => {
    const m = monde();
    const c = m.u === "cm" ? entre(3, 25) : entre(2, 20);
    const S = qui();
    const versPerimetre = Math.random() < 0.55;
    return versPerimetre
      ? {
          text: `${S} veut ${autour(m)} carré${m.objet.startsWith("une") ? "e" : ""}. ${un(QUESTION_FIL(m))}`,
          ...qcmN(4 * c, [2 * c, 3 * c, c * c, c + 4, 4 * c + 4], m.u),
          explanation: exp(
            "Le périmètre d'un carré est la somme de ses quatre côtés, tous égaux.",
            "On multiplie le côté par 4.",
            `${c} + ${c} + ${c} + ${c} = ${4 * c}, ou ${c} × 4 = ${4 * c}.`,
            `Il faut ${4 * c} ${m.u} de ${m.fil}.`,
          ),
          canvas: dessinCarre(c, `${c} ${m.u}`),
        }
      : {
          text: `${S} fait tout le tour d'un carré avec ${4 * c} ${m.u} de ${m.fil}. ${un(["Combien mesure un côté ?", "Quelle est la longueur d'un côté ?", "Trouve le côté du carré."])}`,
          ...qcmN(c, [2 * c, c + 4, 4 * c - 4, c - 1, c + 1], m.u),
          explanation: exp(
            "Le périmètre d'un carré vaut quatre fois son côté.",
            "Pour revenir au côté, on partage le périmètre en quatre parts égales.",
            `${4 * c} ÷ 4 = ${c}.`,
            `Le côté mesure ${c} ${m.u}.`,
          ),
          canvas: dessinCarre(c, "?"),
        };
  }),

  // ★2 — le rectangle coté, calcul direct
  RECT(3, 2, "Un rectangle a DEUX longueurs et DEUX largeurs.", () => {
    const u = un(["cm", "m"]);
    const L = entre(4, 15);
    const l = entre(2, L - 1);
    const P = 2 * (L + l);
    return {
      text: `${un([`Ce rectangle mesure ${L} ${u} sur ${l} ${u}.`,  `Voici un rectangle de ${L} ${u} sur ${l} ${u}.`, `Ce rectangle fait ${L} ${u} de long et ${l} ${u} de large.`])} ${un(QUEL_PERIMETRE)}`,
      ...qcmN(P, leurresRect(L, l), u),
      explanation: exp(
        "Le périmètre d'un rectangle est la somme de ses quatre côtés.",
        "Deux longueurs et deux largeurs : on les additionne toutes.",
        `${L} + ${l} + ${L} + ${l} = ${P}.`,
        `Le périmètre est ${P} ${u}.`,
      ),
      canvas: dessinRect(L, l, u),
    };
  }),

  // ★2 — le carré coté, calcul direct
  RECT(4, 2, "Les quatre côtés d'un carré sont égaux.", () => {
    const u = un(["cm", "m"]);
    const c = entre(2, 12);
    return {
      text: `${un([`Ce carré a ${c} ${u} de côté.`, `Le côté de ce carré mesure ${c} ${u}.`, `Voici un carré de ${c} ${u} de côté.`, `Chaque côté de ce carré fait ${c} ${u}.`])} ${un(QUEL_PERIMETRE)}`,
      ...qcmN(4 * c, [2 * c, 3 * c, c * c, c + 4, 4 * c + 2], u),
      explanation: exp(
        "Le périmètre d'un carré est la somme de ses quatre côtés, tous égaux.",
        "On additionne quatre fois le côté.",
        `${c} + ${c} + ${c} + ${c} = ${4 * c}.`,
        `Le périmètre est ${4 * c} ${u}.`,
      ),
      canvas: dessinCarre(c, `${c} ${u}`),
    };
  }),

  // ★4 — trouver l'erreur d'un camarade
  RECT(5, 4, "Refais le calcul juste, puis compare avec celui de l'enfant.", () => {
    let L = 8;
    let l = 3;
    for (let k = 0; k < 30; k++) {
      L = entre(4, 12);
      l = entre(2, L - 1);
      if (new Set([L * l, L + l, 2 * L + l, 2 * (L + l)]).size === 4) break;
    }
    const P = 2 * (L + l);
    const e = un([
      { v: L * l, dit: "il a multiplié au lieu d'additionner" },
      { v: L + l, dit: "il n'a compté qu'une longueur et une largeur" },
      { v: 2 * L + l, dit: "il a oublié un côté" },
      { v: P, dit: "il ne s'est pas trompé" },
    ]);
    const S = un(NOMS_CONSONNE.filter((x) => ["Téo", "Ravi", "Malo", "Sacha", "Tom", "Yanis", "Noé"].includes(x)));
    return {
      text: `Rectangle de ${L} cm sur ${l} cm : ${S} ${un(["trouve", "annonce", "écrit"])} un périmètre de ${e.v} cm. ${un(["Qu'a-t-il fait ?", "Que s'est-il passé ?", "A-t-il raison ?"])}`,
      ...qcm(e.dit, ["il a multiplié au lieu d'additionner", "il n'a compté qu'une longueur et une largeur", "il a oublié un côté", "il ne s'est pas trompé"]),
      explanation: exp(
        "Le périmètre d'un rectangle : deux longueurs et deux largeurs, additionnées.",
        "On refait le calcul juste, puis on cherche d'où vient le nombre de l'enfant.",
        `${L} + ${l} + ${L} + ${l} = ${P}. ${L} × ${l} = ${L * l} ; ${L} + ${l} = ${L + l} ; ${L} + ${l} + ${L} = ${2 * L + l}.`,
        `${cap(e.dit)}.`,
      ),
      canvas: dessinRect(L, l, "cm"),
    };
  }),

  // ★4 — combien de ruban reste-t-il ?
  RECT(6, 4, "Calcule d'abord le tour, puis enlève-le de ce qu'on avait.", () => {
    const m = monde("cm");
    const L = entre(6, 25);
    const l = entre(3, L - 1);
    const P = 2 * (L + l);
    const N = P + entre(3, 40);
    return {
      text: `${qui()} a ${N} cm de ${m.fil} pour faire le tour de ce rectangle. ${un([`Combien de ${m.fil} reste-t-il ?`, "Combien en reste-t-il ?", "Combien de centimètres restent ?"])}`,
      ...qcmN(N - P, [N - (L + l), P, N - P + 2, N - P - 2, N - L * l > 0 ? N - L * l : N - P + 10], "cm"),
      explanation: exp(
        "Le tour du rectangle, c'est son périmètre : deux longueurs et deux largeurs.",
        "On calcule le périmètre, puis on l'enlève de la longueur qu'on avait.",
        `${L} + ${l} + ${L} + ${l} = ${P}. Puis ${N} - ${P} = ${N - P}.`,
        `Il reste ${N - P} cm de ${m.fil}.`,
      ),
      canvas: dessinRect(L, l, "cm"),
    };
  }),
];

/* =========================================================
   CE2_PERIMETRE_DEFI — les défis
========================================================= */
const DEFI = gabarit("ce2_perimetre_defi");

const defiItems: TutorBankItemV4[] = [
  fixe({
    id: "ce2_perimetre_defi_fixed_1",
    microId: "ce2_perimetre_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Un rectangle a un périmètre de 20 cm. Sa longueur mesure 7 cm. Combien mesure sa largeur ?",
    format: "qcm",
    choices: ["6 cm", "13 cm", "3 cm", "4 cm"],
    expected: ["3 cm"],
    comparator: "mcq_exact",
    hint: "Enlève les DEUX longueurs du périmètre : ce qui reste, ce sont les deux largeurs.",
    explanation: exp(
      "Le périmètre d'un rectangle est fait de deux longueurs et de deux largeurs.",
      "On retire les deux longueurs du périmètre, puis on partage le reste en deux.",
      "Les deux longueurs font 7 + 7 = 14 cm. Il reste 20 - 14 = 6 cm pour les deux largeurs, donc 6 ÷ 2 = 3 cm chacune.",
      "La largeur mesure 3 cm.",
    ),
    tags: ["ce2", "perimetre", "defi", "deux_etapes"],
  }),
  fixe({
    id: "ce2_perimetre_defi_fixed_2",
    microId: "ce2_perimetre_defi",
    difficulty: 5,
    theme: "reunion",
    text: "Potager de 12 m sur 5 m : on le clôture, sauf 2 m pour le portail. Combien de grillage ?",
    format: "qcm",
    choices: ["34 m", "36 m", "32 m", "15 m"],
    expected: ["32 m"],
    comparator: "mcq_exact",
    hint: "Calcule d'abord tout le tour, puis enlève le portail.",
    explanation: exp(
      "Le grillage suit le contour, sauf là où on laisse une ouverture.",
      "On calcule le périmètre complet, puis on retire la largeur du portail.",
      "Le tour complet : 12 + 5 + 12 + 5 = 34 m. On enlève les 2 m du portail : 34 - 2 = 32.",
      "Il faut 32 m de grillage.",
    ),
    tags: ["ce2", "perimetre", "defi", "reunion", "deux_etapes"],
  }),

  // ★5 — la largeur qui manque
  DEFI(1, 5, "Enlève les deux longueurs connues, puis partage le reste en deux.", () => {
    const u = un(["cm", "m"]);
    const L = entre(5, 15);
    const l = entre(2, L - 1);
    const P = 2 * (L + l);
    const m = monde(u as "cm" | "m");
    const histoire = Math.random() < 0.6;
    return {
      text: histoire
        ? `${qui()} fait le tour de ce rectangle avec ${P} ${u} de ${m.fil}. ${un(["Combien mesure la largeur ?", "Quelle est sa largeur ?", "Trouve la largeur."])}`
        : `${un(["Un rectangle a un périmètre de", "Le tour de ce rectangle mesure", "Ce rectangle a un contour de"])} ${P} ${u}. Sa longueur mesure ${L} ${u}. ${un(["Combien mesure sa largeur ?", "Quelle est sa largeur ?", "Trouve le côté « ? »."])}`,
      ...qcmN(l, [2 * l, P - L, P - 2 * L, l + 1, l - 1], u),
      explanation: exp(
        "Le périmètre d'un rectangle est fait de deux longueurs et de deux largeurs.",
        "On retire les deux longueurs du périmètre, puis on partage le reste en deux.",
        `Les deux longueurs font ${L} + ${L} = ${2 * L} ${u}. Il reste ${P} - ${2 * L} = ${2 * l} ${u} pour les deux largeurs, donc ${2 * l} ÷ 2 = ${l} ${u} chacune.`,
        `La largeur mesure ${l} ${u}.`,
      ),
      canvas: dessinRect(L, l, u, `${L} ${u}`, "?"),
    };
  }),

  // ★5 — clôturer en laissant une ouverture
  DEFI(2, 5, "Le tour complet d'abord, l'ouverture ensuite.", () => {
    const m = monde("m");
    const L = entre(8, 20);
    const l = entre(4, L - 1);
    const P = 2 * (L + l);
    const o = entre(1, 4);
    const passage = un(["un portail", "une entrée", "une porte", "un passage"]);
    // Le rectangle tracé côté par côté : le bas est coupé par l'ouverture, en pointillés orange.
    const g = Math.max(l, L / 3.2);
    const x1 = L / 2 - o / 2;
    const dessin: ConstructionCanvasData = {
      kind: "construction",
      points: [
        { id: "A", x: 0, y: 0, cache: true },
        { id: "B", x: L, y: 0, cache: true },
        { id: "C", x: L, y: g, cache: true },
        { id: "D", x: 0, y: g, cache: true },
        { id: "E", x: x1, y: 0, cache: true },
        { id: "F", x: x1 + o, y: 0, cache: true },
      ],
      segments: [
        { a: "A", b: "E" },
        { a: "F", b: "B" },
        { a: "E", b: "F", pointille: true, couleur: "#c2410c", texte: `${passage.split(" ")[1]} : ${o} m` },
        { a: "B", b: "C", texte: `${l} m` },
        { a: "C", b: "D", texte: `${L} m` },
        { a: "D", b: "A" },
      ],
      largeur: 300,
      hauteurMax: 200,
      description: "Un rectangle avec une ouverture",
    };
    return {
      text: `${qui()} veut ${autour(m)}, sauf ${passage}. ${un(QUESTION_FIL(m))}`,
      ...qcmN(P - o, [P, P + o, L + l - o, P - 2 * o], "m"),
      explanation: exp(
        "La clôture suit le contour, sauf là où on laisse une ouverture.",
        "On calcule le périmètre complet, puis on retire la largeur de l'ouverture.",
        `Le tour complet : ${L} + ${l} + ${L} + ${l} = ${P} m. On enlève les ${o} m de l'ouverture : ${P} - ${o} = ${P - o}.`,
        `Il faut ${P - o} m de ${m.fil}.`,
      ),
      canvas: dessin,
    };
  }),

  // ★5 — des carrés collés : les côtés collés ne sont plus sur le tour
  DEFI(3, 5, "Les côtés collés l'un contre l'autre sont à l'intérieur : ils ne font plus partie du tour.", () => {
    const k = un([2, 3]);
    const c = entre(2, 9);
    const u = un(["cm", "m"]);
    const [quoi, colles] = u === "cm"
      ? un([["cartes carrées", "collées"], ["gommettes carrées", "collées"], ["photos carrées", "collées"], ["carreaux de chocolat", "collés"]] as const)
      : un([["tapis carrés", "serrés"], ["dalles carrées", "serrées"], ["tables carrées", "collées"], ["bacs à fleurs carrés", "collés"]] as const);
    const P = (2 * k + 2) * c;
    const pts: Pt[] = [{ x: 0, y: 0 }, { x: k * c, y: 0 }, { x: k * c, y: c }, { x: 0, y: c }];
    const interieurs = Array.from({ length: k - 1 }, (_, i) => i + 1);
    const dessin: ConstructionCanvasData = {
      kind: "construction",
      points: [
        ...pts.map((p, i) => ({ id: `p${i}`, x: p.x, y: p.y, cache: true })),
        ...interieurs.flatMap((i) => [
          { id: `h${i}`, x: i * c, y: 0, cache: true },
          { id: `b${i}`, x: i * c, y: c, cache: true },
        ]),
        { id: "q0", x: 0, y: 0, cache: true },
        { id: "q1", x: c, y: 0, cache: true },
      ],
      polygones: [{ sommets: ["p0", "p1", "p2", "p3"] }],
      segments: [...interieurs.map((i) => ({ a: `h${i}`, b: `b${i}`, pointille: true })), { a: "q0", b: "q1", texte: `${c} ${u}` }],
      largeur: 300,
      hauteurMax: 170,
      description: `${k} carrés collés`,
    };
    return {
      text: `${qui()} pose ${k === 2 ? "deux" : "trois"} ${quoi} ${colles} côte à côte. ${un(["Quel est le périmètre de l'ensemble ?", "Combien mesure le tour de l'ensemble ?", "Quel est le tour de l'ensemble ?"])}`,
      ...qcmN(P, [4 * k * c, 4 * c, P + c, P - c, 2 * k * c], u),
      explanation: exp(
        "Le périmètre est le tour de la grande figure : les côtés collés sont à l'intérieur, ils ne comptent plus.",
        "On fait le tour de la grande figure et on compte les côtés de carré rencontrés.",
        `En haut ${k} côtés, en bas ${k} côtés, plus 1 à gauche et 1 à droite : ${2 * k + 2} côtés de ${c} ${u}. ${2 * k + 2} × ${c} = ${P}.`,
        `Le périmètre est ${P} ${u}.`,
      ),
      canvas: dessin,
    };
  }),
];

export const perimetreBank: TutorBankItemV4[] = [...comprendreItems, ...polygoneItems, ...comparerItems, ...rectangleItems, ...defiItems];
