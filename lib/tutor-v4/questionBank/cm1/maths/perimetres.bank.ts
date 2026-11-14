// lib/tutor-v4/questionBank/cm1/maths/perimetres.bank.ts
//
// Le PÉRIMÈTRE du CM1 : cinq micros, quatre vidéos (paysage + short) tournées
// les 13 et 14/11/2026 (manim/scripts/cm1/perimetre_*.py) :
//   - perimetre_triangle    (ceinture jaune)  Nina, décoratrice : le galon du fanion ;
//     short « La guirlande du fanion » ;
//   - perimetre_quadrilatere (jaune) Lucas, encadreur : « une longueur plus une
//     largeur, c'est la moitié du tour, puis fois 2 » ; « un carré : le côté
//     fois 4 » ; short « La moitié du tour » (les pas autour du terrain) ;
//   - perimetre_polygone (verte) Emma, menuisière : l'octogone, « on compte les
//     côtés avec une croix », « un côté fois le nombre de côtés » ; short
//     « L'étoile à 10 côtés » ;
//   - perimetre_defi (bleue) Karim, éleveur : plusieurs tours (« on calcule un
//     tour, puis on multiplie »), le côté qui manque (« le périmètre moins les
//     côtés connus ») ; short : la piste des escargots.
// perimetre_comprendre n'a pas de vidéo : le tour ou le dedans (l'aire).
//
// ⭐ 14/11/2026 — GÉNÉRATEURS ET DESSINS. Avant : 9 à 19 squelettes par micro,
// 11 à 18 répétitions sur 20 ; 0 à 50 % de dessins. Chaque gabarit tire
// maintenant une SITUATION (métiers, jardin, cuisine, sport, fête…) × une
// TOURNURE × des nombres, et presque tous posent leur figure À L'ÉCHELLE
// (`construction`, côtés écrits « 25 cm ») ou sur quadrillage (`figure_libre`).
// ⛔ Le dessin porte les DONNÉES, jamais la réponse.
// ⛔ L'unité partout : dans l'énoncé et dans chaque choix (« 24 cm »).
// ⛔ CM1 = zéro clavier : que des QCM, des leurres = vraies erreurs d'élève
// (un côté oublié, la moitié du tour L + l, l'aire L × l, les côtés égaux non
// répétés, un côté compté deux fois, ajouter au lieu d'enlever).
// ⛔ Division : « ÷ ».

import type { DifficultyLevel, TutorBankItemV4, TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import type { ConstructionCanvasData, FigureLibreCanvasData } from "@/lib/tutor-v4/types_canvas";
import { cap, entre, fr, qcm, qcmN, un } from "./trous-outils";

type Gen = TutorGeneratedQuestionV4;
type U = "cm" | "m";

function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return `Définition : ${definition}

Méthode : ${methode}

Calcul : ${calcul}

Conclusion : ${conclusion}`;
}

const somme = (l: readonly number[]) => l.reduce((a, b) => a + b, 0);
const lg = (v: number, u: string) => `${fr(v)} ${u}`;
const liste = (l: readonly string[]) => (l.length < 2 ? l.join("") : `${l.slice(0, -1).join(", ")} et ${l[l.length - 1]}`);
const motU = (u: string) => (u === "cm" ? "centimètres" : u === "m" ? "mètres" : u);

/* ───────────────────────── Les mots ───────────────────────── */

const VOY = /^[aeiouyàâéèêëîïôûh]/i;
const nomDe = (o: string) => o.replace(/^une? /, "");
const estF = (o: string) => o.startsWith("une ");
/** « le fanion », « la nappe », « l'enclos ». */
const le = (o: string) => (VOY.test(nomDe(o)) ? `l'${nomDe(o)}` : `${estF(o) ? "la" : "le"} ${nomDe(o)}`);
/** « du fanion », « de la nappe », « de l'enclos ». */
const du = (o: string) => {
  const d = le(o);
  return d.startsWith("le ") ? `du ${d.slice(3)}` : `de ${d}`;
};
/** « ce fanion », « cette nappe », « cet enclos ». */
const ce = (o: string) => (estF(o) ? `cette ${nomDe(o)}` : VOY.test(nomDe(o)) ? `cet ${nomDe(o)}` : `ce ${nomDe(o)}`);
/** « de galon », « d'élastique ». */
const de = (mot: string) => (VOY.test(mot) ? `d'${mot}` : `de ${mot}`);
const carreAccorde = (o: string) => `${o} ${estF(o) ? "carrée" : "carré"}`;
/** « fanions », « panneaux de signalisation ». */
const pluriel = (o: string) => {
  const [w, ...r] = nomDe(o).split(" ");
  const p = /[sxz]$/.test(w) ? w : /(eau|au|eu)$/.test(w) ? `${w}x` : `${w}s`;
  return [p, ...r].join(" ");
};

const NOMS_F = ["Nina", "Zoé", "Lou", "Inès", "Jade", "Maya", "Lina", "Emma", "Léa", "Sarah", "Chloé", "Aya", "Naïa", "Rose"];
const NOMS_M = ["Téo", "Ravi", "Malo", "Sacha", "Amir", "Tom", "Yanis", "Noé", "Lucas", "Karim", "Hugo", "Enzo", "Bilal", "Jules"];
type Perso = { nom: string; il: "il" | "elle"; txt: string };
/** Un prénom, et parfois son métier : « Nina, décoratrice, ». */
function perso(metier?: readonly [string, string]): Perso {
  const f = Math.random() < 0.5;
  const nom = un(f ? NOMS_F : NOMS_M);
  const m = metier ? (f ? metier[0] : metier[1]) : "";
  return { nom, il: f ? "elle" : "il", txt: m && Math.random() < 0.75 ? `${nom}, ${m},` : nom };
}

/** Une situation : ce qu'on entoure, avec quoi, qui, et la plage des côtés. */
type Sit = { objet: string; geste: string; fil: string; metier: readonly [string, string]; u: U; min: number; max: number };
const S = (objet: string, geste: string, fil: string, metier: readonly [string, string], u: U, min: number, max: number): Sit => ({ objet, geste, fil, metier, u, min, max });
/** « Nina, décoratrice, coud un galon doré autour d'un fanion triangulaire. » */
const phraseSit = (p: Perso, s: Sit, forme: string) => `${p.txt} ${s.geste} d'${s.objet}${forme ? ` ${forme}` : ""}.`;

const QFIL = (s: Sit) => [
  `Combien de ${motU(s.u)} ${de(s.fil)} faut-il ?`,
  `Quelle longueur ${de(s.fil)} faut-il ?`,
  `Quelle longueur ${de(s.fil)} faut-il pour tout le tour ?`,
  `Combien ${de(s.fil)} faut-il pour faire le tour ?`,
  `Quelle longueur ${de(s.fil)} faut-il prévoir ?`,
];

const QUEL_P = [
  "Quel est son périmètre ?",
  "Calcule son périmètre.",
  "Combien mesure son tour ?",
  "Quelle est la longueur de son tour ?",
  "Trouve son périmètre.",
  "Combien mesure le tour complet ?",
];

/** Un nombre de la plage, multiple de `pas`. */
const tire = (min: number, max: number, pas: number) => entre(Math.ceil(min / pas), Math.floor(max / pas)) * pas;
const pasDe = (min: number) => (min >= 80 ? 10 : min >= 10 ? 5 : 1);

/* ───────────────────────── Les dessins ───────────────────────── */

type Pt = { x: number; y: number };
type Morceau = Required<Pick<ConstructionCanvasData, "points" | "polygones" | "segments" | "angles">>;

/** Un polygone : sommets cachés, côtés écrits là où `textes[i]` est donné, `codes` = tirets des côtés égaux. */
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
  // ⚠️ (vu au rendu par le CE2, 10/11) le cadre ne garde que 30 px autour de la
  // figure : deux points invisibles l'agrandissent, sinon la longueur du côté
  // du bas passait DANS la figure.
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

/** Le triangle de côtés a (en bas), b (à droite), c (à gauche), ou null s'il est trop plat. */
function ptsTriangle(a: number, b: number, c: number): Pt[] | null {
  const x = (a * a + c * c - b * b) / (2 * a);
  const y2 = c * c - x * x;
  if (y2 <= 0) return null;
  const y = Math.sqrt(y2);
  if (y < 0.3 * Math.max(a, b, c)) return null;
  return [{ x: 0, y: 0 }, { x: a, y: 0 }, { x, y }];
}

type SorteTri = "quelconque" | "isocele" | "equilateral";
/** Trois côtés [base, droite, gauche] qui forment un vrai triangle ; isocèle : les deux derniers égaux. */
function cotesTriangle(min: number, max: number, sorte: SorteTri, pas = pasDe(min)): [number, number, number] {
  for (let k = 0; k < 300; k++) {
    let a = tire(min, max, pas);
    let b = tire(min, max, pas);
    let c = tire(min, max, pas);
    if (sorte === "equilateral") b = c = a;
    if (sorte === "isocele") {
      c = b;
      if (a === b) continue;
    }
    if (sorte === "quelconque" && new Set([a, b, c]).size < 3) continue;
    if (!ptsTriangle(a, b, c)) continue;
    return [a, b, c];
  }
  const m = tire(min, max, pas);
  return [m, m, m];
}

function dessinTri(cotes: readonly number[], u: string, o: { cache?: number; codes?: number[] } = {}): ConstructionCanvasData {
  const [a, b, c] = cotes;
  const pts = ptsTriangle(a, b, c) ?? ptsTriangle(a, a, a)!;
  const textes = cotes.map((v, i) => (i === o.cache ? "?" : lg(v, u)));
  return construction([morceau(pts, textes, { codes: o.codes })], "Un triangle dont les côtés sont écrits");
}

/** Rectangle de L sur l (on évite seulement les rubans trop plats). */
function ptsRectangle(L: number, l: number): Pt[] {
  const h = Math.max(l, L / 3.2);
  return [{ x: 0, y: 0 }, { x: L, y: 0 }, { x: L, y: h }, { x: 0, y: h }];
}
/** `tous` : les 4 côtés écrits ; sinon la longueur en bas, la largeur à droite, et les côtés d'en face codés. */
function dessinRect(L: number, l: number, u: string, tous: boolean, cache?: number): ConstructionCanvasData {
  const t = (v: number, i: number) => (i === cache ? "?" : lg(v, u));
  const textes = tous ? [t(L, 0), t(l, 1), t(L, 2), t(l, 3)] : [t(L, 0), t(l, 1), null, null];
  return construction([morceau(ptsRectangle(L, l), textes, { droits: true, codes: tous ? undefined : [1, 2, 1, 2] })], "Un rectangle dont les côtés sont écrits");
}
function dessinCarre(c: number | "?", u: string): ConstructionCanvasData {
  return construction([morceau(ptsRectangle(4, 4), [c === "?" ? "?" : lg(c, u), null, null, null], { droits: true, codes: [1, 1, 1, 1] })], "Un carré : ses 4 côtés sont égaux");
}

/** Le polygone régulier : tous ses côtés égaux, le côté 0 en bas. */
function ptsRegulier(n: number, cote: number): Pt[] {
  const r = cote / (2 * Math.sin(Math.PI / n));
  const depart = -Math.PI / 2 - Math.PI / n;
  return Array.from({ length: n }, (_, i) => ({ x: r * Math.cos(depart + (2 * Math.PI * i) / n), y: r * Math.sin(depart + (2 * Math.PI * i) / n) }));
}
function dessinRegulier(n: number, c: number | "?", u: string): ConstructionCanvasData {
  const textes = Array.from({ length: n }, (_, i) => (i === 0 ? (c === "?" ? "?" : lg(c, u)) : null));
  return construction([morceau(ptsRegulier(n, 5), textes, { codes: Array(n).fill(1) })], `Un polygone à ${n} côtés égaux`);
}

/** Un polygone quelconque à n côtés, aux côtés ENTIERS (multiples de `pas`) mesurés sur le dessin. */
function polygoneAuHasard(n: number, moyenne: number, pas = 1): { pts: Pt[]; cotes: number[] } {
  for (let essai = 0; essai < 80; essai++) {
    const base = Math.random() * 2 * Math.PI;
    const brut = Array.from({ length: n }, (_, i) => {
      const a = base + (2 * Math.PI * i) / n + (Math.random() - 0.5) * (Math.PI / n) * 0.7;
      const r = 0.8 + Math.random() * 0.35;
      return { x: r * Math.cos(a), y: r * Math.sin(a) };
    });
    const d = brut.map((p, i) => Math.hypot(brut[(i + 1) % n].x - p.x, brut[(i + 1) % n].y - p.y));
    const k = moyenne / (somme(d) / n);
    const pts = brut.map((p) => ({ x: p.x * k, y: p.y * k }));
    const cotes = d.map((x) => Math.round((x * k) / pas) * pas);
    if (cotes.every((c) => c >= 2 * pas) && new Set(cotes).size >= Math.min(n, 3)) return { pts, cotes };
  }
  const c = Math.max(pas, Math.round(moyenne / pas) * pas);
  return { pts: ptsRegulier(n, moyenne), cotes: Array(n).fill(c) };
}
function polyCote(n: number, moyenne: number, u: string, pas = 1) {
  const { pts, cotes } = polygoneAuHasard(n, moyenne, pas);
  const textes = cotes.map((c) => lg(c, u));
  return { cotes, textes, canvas: construction([morceau(pts, textes)], `Un polygone à ${n} côtés dont les côtés sont écrits`) };
}

/** L'étoile à N pointes : 2N côtés égaux. */
function dessinEtoile(N: number, c: number, u: string): ConstructionCanvasData {
  const pts = Array.from({ length: 2 * N }, (_, i) => {
    const r = i % 2 === 0 ? 5 : 2.2;
    const a = -Math.PI / 2 + (Math.PI * i) / N;
    return { x: r * Math.cos(a), y: r * Math.sin(a) };
  });
  const textes = pts.map((_, i) => (i === N ? lg(c, u) : null));
  return construction([morceau(pts, textes, { codes: pts.map(() => 1) })], `Une étoile à ${N} pointes, tous ses côtés égaux`);
}

/** Une figure en L : un rectangle W × H privé d'un coin a × b (en haut à droite). */
function ptsEnL(W: number, H: number, a: number, b: number): Pt[] {
  return [{ x: 0, y: 0 }, { x: W, y: 0 }, { x: W, y: H - b }, { x: W - a, y: H - b }, { x: W - a, y: H }, { x: 0, y: H }];
}

const NOM_POLY: Record<number, string> = { 3: "triangle", 4: "quadrilatère", 5: "pentagone", 6: "hexagone", 8: "octogone" };
const nomPoly = (n: number) => NOM_POLY[n] ?? `polygone à ${n} côtés`;

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
  const v = un(["coin", "bosse", "creux", "L", "bosse", "marche"]);
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
  if (v === "marche" && h >= 2) {
    for (let r = 1; r < 1 + Math.ceil(h / 2); r++) cases = sans(cases, [r, w - 1]);
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

const UN_CARREAU = (k = 1, u: U = "cm") =>
  [
    `Un carreau mesure ${k} ${u} de côté.`,
    `Le côté d'un carreau mesure ${k} ${u}.`,
    `Chaque côté de carreau fait ${k} ${u}.`,
    `Chaque petit carreau a des côtés de ${k} ${u}.`,
  ];

/* ───────────────────────── Les fabricants ───────────────────────── */

const atelierP =
  (micro: string) =>
  (suffixe: string, difficulty: DifficultyLevel, hint: string, generate: () => Gen): TutorBankItemV4 => ({
    kind: "template",
    id: `cm1_perimetre_${micro}_tpl_${suffixe}`,
    niveau: "cm1",
    matiere: "maths",
    notionId: "perimetre",
    microId: `perimetre_${micro}`,
    difficulty,
    theme: "neutral",
    hint,
    tags: ["cm1", "perimetre", micro, "template"],
    generate,
  });

type Fixe = Omit<Extract<TutorBankItemV4, { kind: "fixed" }>, "kind" | "niveau" | "matiere" | "notionId" | "format" | "comparator">;
const fixe = (f: Fixe): TutorBankItemV4 => ({ kind: "fixed", niveau: "cm1", matiere: "maths", notionId: "perimetre", format: "qcm", comparator: "mcq_exact", ...f });

/** Leurres d'une somme de côtés : un côté oublié, un côté compté deux fois, une retenue oubliée. */
const leurresSomme = (cotes: readonly number[], pas = 1) => {
  const P = somme(cotes);
  return [P - Math.min(...cotes), P - cotes[cotes.length - 1], P + cotes[0], P + 10 * pas, P - 10 * pas];
};

/** « Est-ce assez ? » : la bonne phrase, et les phrases des erreurs. */
function assez(dispo: number, besoin: number, besoinFaux: number[], u: string) {
  const phrase = (d: number) => (d === 0 ? "oui, c'est juste assez" : d > 0 ? `oui, il en reste ${lg(d, u)}` : `non, il en manque ${lg(-d, u)}`);
  const d = dispo - besoin;
  const k = Math.abs(d) || 10;
  return qcm(phrase(d), [...besoinFaux.map((b) => phrase(dispo - b)), phrase(-d || k), phrase(d === 0 ? -k : 0), phrase(d === 0 ? k : -d)]);
}

/* =========================================================
   PERIMETRE_COMPRENDRE — le tour, pas le dedans
========================================================= */
const COMP = atelierP("comprendre");

const ACTIONS_TOUR: readonly (readonly [string, readonly [string, string]])[] = [
  ["poser une clôture autour d'un champ", ["agricultrice", "agriculteur"]],
  ["coudre un galon autour d'un coussin", ["couturière", "couturier"]],
  ["poser une baguette autour d'un tableau", ["encadreuse", "encadreur"]],
  ["poser des plinthes le long des murs d'une chambre", ["peintre", "peintre"]],
  ["accrocher une guirlande autour d'une fenêtre", ["décoratrice", "décorateur"]],
  ["poser une bordure autour d'un massif de fleurs", ["jardinière", "jardinier"]],
  ["peindre la ligne du bord d'un terrain de foot", ["animatrice", "animateur"]],
  ["poser du grillage autour d'un poulailler", ["éleveuse", "éleveur"]],
  ["coller un ruban autour d'une carte d'anniversaire", ["illustratrice", "illustrateur"]],
  ["poser une margelle autour d'une piscine", ["maçonne", "maçon"]],
  ["faire le tour d'un stade en courant", ["athlète", "athlète"]],
  ["coller une bande de bois autour d'une table", ["menuisière", "menuisier"]],
  ["coudre de la dentelle autour d'une nappe", ["couturière", "couturier"]],
  ["tendre une corde autour d'une piste de cirque", ["artiste de cirque", "artiste de cirque"]],
  ["poser un joint autour d'une fenêtre", ["vitrière", "vitrier"]],
  ["monter une barrière autour d'un enclos à chevaux", ["éleveuse", "éleveur"]],
  ["poser une bordure autour d'un bac à sable", ["paysagiste", "paysagiste"]],
  ["coller une frise autour d'une affiche", ["graphiste", "graphiste"]],
  ["poser un ruban de chocolat autour d'un gâteau", ["pâtissière", "pâtissier"]],
  ["poser une clôture autour d'un champ de cannes", ["planteuse", "planteur"]],
];
const ACTIONS_DEDANS: readonly (readonly [string, readonly [string, string]])[] = [
  ["peindre tout un mur", ["peintre", "peintre"]],
  ["carreler tout le sol d'une cuisine", ["carreleuse", "carreleur"]],
  ["semer du gazon sur tout un jardin", ["jardinière", "jardinier"]],
  ["couvrir toute une table avec une nappe", ["cuisinière", "cuisinier"]],
  ["mettre de la moquette dans toute une chambre", ["décoratrice", "décorateur"]],
  ["couvrir un cahier avec du papier", ["maîtresse", "maître"]],
  ["poser du parquet dans tout un salon", ["menuisière", "menuisier"]],
  ["étaler du chocolat sur tout le dessus d'un gâteau", ["pâtissière", "pâtissier"]],
  ["coller du papier peint sur tout un mur", ["décoratrice", "décorateur"]],
  ["poser des dalles sur toute une terrasse", ["maçonne", "maçon"]],
  ["couvrir un toit de tuiles", ["couvreuse", "couvreur"]],
  ["tondre toute une pelouse", ["jardinière", "jardinier"]],
  ["vernir tout le dessus d'une table", ["menuisière", "menuisier"]],
  ["recouvrir un terrain de sable", ["paysagiste", "paysagiste"]],
];

const CHOIX_TOUR = ["le périmètre (le tour)", "l'aire (la surface du dedans)", "le nombre de côtés", "la longueur d'un seul côté"];

function tourOuDedans(ctx: boolean): Gen {
  const tour = Math.random() < 0.55;
  const [a, metier] = tour ? un(ACTIONS_TOUR) : un(ACTIONS_DEDANS);
  const p = perso(metier);
  const text = ctx
    ? `${p.txt} veut ${a}. ${un([`Que doit-${p.il} calculer ?`, `De quoi a-t-${p.il} besoin ?`, `Que doit-${p.il} mesurer ?`, `Quelle grandeur doit-${p.il} calculer ?`, `${cap(p.il)} hésite : le périmètre ou l'aire ?`])}`
    : un([`Pour ${a}, faut-il calculer le périmètre ou l'aire ?`, `On veut ${a}. Que faut-il calculer ?`, `Pour ${a}, que faut-il connaître ?`, `${cap(a)} : périmètre ou aire ?`, `Pour ${a}, de quoi a-t-on besoin ?`]);
  const juste = tour ? CHOIX_TOUR[0] : CHOIX_TOUR[1];
  return {
    text,
    ...qcm(juste, CHOIX_TOUR),
    explanation: exp(
      "Le périmètre est la longueur du tour. L'aire est la surface du dedans.",
      "On se demande si l'objet suit le BORD (périmètre) ou s'il remplit le DEDANS (aire).",
      tour ? `Pour ${a}, on suit le bord : c'est le tour.` : `Pour ${a}, on couvre tout le dedans : c'est la surface.`,
      tour ? "Il faut le périmètre." : "Il faut l'aire, pas le périmètre.",
    ),
  };
}

const NOMS_FIG = ["triangle", "carré", "rectangle", "losange", "pentagone", "hexagone", "octogone", "quadrilatère"];
function figureNue(nom: string): Morceau {
  if (nom === "carré") return morceau(ptsRectangle(4, 4), [], { droits: true });
  if (nom === "rectangle") return morceau(ptsRectangle(entre(6, 8), 3), [], { droits: true });
  if (nom === "losange") return morceau([{ x: 0, y: -2 }, { x: 3, y: 0 }, { x: 0, y: 2 }, { x: -3, y: 0 }], []);
  if (nom === "octogone") return morceau(ptsRegulier(8, 3), []);
  const n = { triangle: 3, quadrilatère: 4, pentagone: 5, hexagone: 6 }[nom] ?? 4;
  return morceau(polygoneAuHasard(n, 5).pts, []);
}

/** Les objets rectangulaires courts, avec leur unité. */
const RECT_COURTS: readonly (readonly [string, U, number])[] = [
  ["un rectangle", "cm", 15], ["un tableau", "cm", 90], ["un cadre", "cm", 30], ["une nappe", "cm", 200], ["un jardin", "m", 30], ["un potager", "m", 20],
  ["une affiche", "cm", 90], ["un tapis", "cm", 200], ["une cour", "m", 60], ["une carte postale", "cm", 15], ["un terrain", "m", 60], ["un enclos", "m", 40],
  ["un livre", "cm", 30], ["une piscine", "m", 25], ["une fenêtre", "cm", 140], ["un drapeau", "cm", 150],
];
/** Longueur et largeur d'un objet court : petits nombres, ou dizaines pour les grands objets. */
function dimsCourt(max: number, plafond: number): [number, number] {
  if (max <= 30) {
    const L = entre(4, Math.min(max, plafond));
    return [L, entre(2, L - 1)];
  }
  const L = tire(30, max, 10);
  return [L, tire(10, L - 10, 10)];
}
/** Le côté d'un carré court. */
const coteCourt = (max: number, plafond: number) => (max <= 30 ? entre(2, Math.min(max, plafond)) : tire(20, max, 10));

const comprendreItems: TutorBankItemV4[] = [
  fixe({
    id: "cm1_perimetre_comprendre_fixed_001_definition",
    microId: "perimetre_comprendre",
    difficulty: 1,
    theme: "neutral",
    text: "Le périmètre d'une figure correspond à…",
    choices: ["la longueur du contour de la figure", "la surface à l'intérieur de la figure", "le nombre de côtés de la figure", "la longueur de son plus grand côté"],
    expected: ["la longueur du contour de la figure"],
    hint: "Le périmètre, c'est le tour de la figure.",
    explanation: exp(
      "Le périmètre est la longueur du contour d'une figure.",
      "On imagine qu'on fait tout le tour de la figure avec le doigt.",
      "Ce qui est à l'intérieur, c'est l'aire : ça ne compte pas pour le périmètre.",
      "C'est la longueur du contour.",
    ),
    tags: ["cm1", "perimetre", "comprendre", "definition", "qcm"],
  }),
  fixe({
    id: "cm1_perimetre_comprendre_fixed_002_addition_cotes",
    microId: "perimetre_comprendre",
    difficulty: 1,
    theme: "neutral",
    text: "Pour calculer le périmètre d'une figure, on additionne…",
    choices: ["les longueurs de tous les côtés", "seulement deux côtés", "la longueur et la largeur multipliées", "le nombre de sommets"],
    expected: ["les longueurs de tous les côtés"],
    hint: "Le périmètre fait le tour complet de la figure.",
    explanation: exp(
      "Le périmètre est la longueur du contour d'une figure.",
      "On fait le tour de la figure en ajoutant chaque côté, une seule fois.",
      "On additionne donc les longueurs de tous les côtés.",
      "On additionne les longueurs de tous les côtés.",
    ),
    tags: ["cm1", "perimetre", "comprendre", "qcm"],
  }),
  fixe({
    id: "cm1_perimetre_comprendre_fixed_003_unite",
    microId: "perimetre_comprendre",
    difficulty: 2,
    theme: "neutral",
    text: "Dans quelle unité peut-on écrire le périmètre d'une feuille de cahier ?",
    choices: ["en centimètres (cm)", "en centimètres carrés (cm²)", "en kilogrammes (kg)", "en litres (L)"],
    expected: ["en centimètres (cm)"],
    hint: "Un périmètre est une longueur.",
    explanation: exp(
      "Le périmètre est une longueur.",
      "On choisit une unité de longueur, pas une unité d'aire, de masse ou de contenance.",
      "Les cm² servent pour les aires, les kg pour les masses, les litres pour les contenances.",
      "On l'écrit en centimètres.",
    ),
    tags: ["cm1", "perimetre", "comprendre", "unite", "qcm"],
  }),
  fixe({
    id: "cm1_perimetre_comprendre_fixed_004_cloture",
    microId: "perimetre_comprendre",
    difficulty: 2,
    theme: "neutral",
    text: "On veut poser une clôture tout autour d'un jardin. Quelle grandeur faut-il calculer ?",
    choices: ["le périmètre du jardin", "l'aire du jardin", "la masse du jardin", "le nombre de côtés du jardin"],
    expected: ["le périmètre du jardin"],
    hint: "La clôture fait le tour du jardin.",
    explanation: exp(
      "Le périmètre est la longueur du tour.",
      "La clôture suit le bord du jardin, elle ne couvre pas le dedans.",
      "On cherche donc la longueur du tour du jardin.",
      "Il faut calculer le périmètre du jardin.",
    ),
    tags: ["cm1", "perimetre", "comprendre", "cloture", "qcm"],
  }),

  // ★1 — le mot « périmètre » (sur une figure, ou pour un vrai objet)
  COMP("001_vocabulaire_tour", 1, "Le périmètre, c'est le TOUR de la figure.", () => {
    if (Math.random() < 0.55) {
      const nom = un(NOMS_FIG);
      const c = ce(`un ${nom}`);
      const juste = un(["la longueur de son tour", "la longueur de son contour"]);
      return {
        text: un([`Le périmètre de ${c}, c'est…`, `Que veut dire « le périmètre de ${c} » ?`, `Qu'est-ce que le périmètre de ${c} ?`, `Choisis ce qu'est le périmètre de ${c}.`, `${cap(c)} a un périmètre. C'est…`]),
        ...qcm(juste, ["la surface de son intérieur (son aire)", "le nombre de ses côtés", "la longueur de son plus grand côté", "le nombre de ses sommets"]),
        explanation: exp(
          "Le périmètre est la longueur du contour d'une figure.",
          "On suit le bord avec le doigt, tout autour, jusqu'au point de départ.",
          "Le dedans, c'est l'aire : il ne compte pas pour le périmètre.",
          `C'est ${juste}.`,
        ),
        canvas: construction([figureNue(nom)], `Un ${nom}`),
      };
    }
    const [a] = un(ACTIONS_TOUR);
    return {
      text: un([`Pour ${a}, on calcule…`, `Pour savoir quelle longueur il faut pour ${a}, on cherche…`, `On veut ${a}. On calcule…`]),
      ...qcm("le périmètre", ["l'aire", "la masse", "la contenance"]),
      explanation: exp(
        "Le périmètre est la longueur du tour.",
        "Ce qu'on pose suit le bord : on cherche la longueur du tour.",
        `Pour ${a}, on suit tout le bord.`,
        "On calcule le périmètre.",
      ),
    };
  }),

  // ★1 — combien de côtés faut-il additionner ? (compter sur le dessin)
  COMP("007_combien_de_cotes", 1, "Compte les côtés avec ton doigt : fais une petite croix sur chacun.", () => {
    const n = entre(3, 8);
    const quoi = un(["cette figure", "cette étiquette", "ce badge", "ce panneau", "ce jardin", "ce tapis", "ce drapeau", "ce bout de papier", "ce plateau", "cet enclos", "ce sticker", "cette carte"]);
    return {
      text: `${un(["", "Regarde bien.", "Observe le dessin.", "Compte bien."])} ${un([
        `Pour le périmètre de ${quoi}, combien de côtés faut-il additionner ?`,
        `Combien de côtés faut-il ajouter pour le tour de ${quoi} ?`,
        `Le périmètre de ${quoi} : combien de longueurs faut-il additionner ?`,
        `Pour faire le tour de ${quoi}, on additionne combien de côtés ?`,
      ])}`.trim(),
      ...qcmN(n, [n - 1, n + 1, n + 2, 4], "côtés"),
      explanation: exp(
        "Le périmètre est la somme de TOUS les côtés.",
        "On compte les côtés en faisant le tour, avec une croix sur chaque côté compté.",
        `La figure a ${n} côtés.`,
        `Il faut additionner ${n} côtés.`,
      ),
      canvas: construction([morceau(polygoneAuHasard(n, 5).pts, [])], `Une figure à ${n} côtés`),
    };
  }),

  // ★1 — l'unité d'un périmètre (une longueur)
  COMP("002_unite_longueur", 1, "Un périmètre est une LONGUEUR.", () => {
    const grand = Math.random() < 0.5;
    const o = grand
      ? un(["un stade", "un champ", "une cour d'école", "un jardin", "un parc", "un terrain de basket", "une piscine", "un parking", "un potager", "un enclos"])
      : un(["un cahier", "une carte postale", "un cadre photo", "une étiquette", "un livre", "un mouchoir", "un sous-verre", "une enveloppe", "une gomme", "un ticket"]);
    const juste = grand ? "en mètres (m)" : "en centimètres (cm)";
    return {
      text: un([`Le périmètre ${du(o)} se mesure…`, `Dans quelle unité peut-on écrire le périmètre ${du(o)} ?`, `Quelle unité convient pour le tour ${du(o)} ?`, `On mesure le tour ${du(o)}. Quelle unité choisir ?`]),
      ...qcm(juste, grand ? ["en mètres carrés (m²)", "en kilogrammes (kg)", "en litres (L)", "en heures (h)"] : ["en centimètres carrés (cm²)", "en grammes (g)", "en litres (L)", "en minutes (min)"]),
      explanation: exp(
        "Le périmètre est une longueur : il se mesure en cm, en m…",
        "Les unités « carrées » (cm², m²) servent pour les aires, pas pour le tour.",
        grand ? `Le tour ${du(o)} est grand : on le mesure en mètres.` : `Le tour ${du(o)} est petit : on le mesure en centimètres.`,
        `On l'écrit ${juste.replace(" (", ", ").replace(")", "")}.`,
      ),
    };
  }),

  // ★2 — le tour ou le dedans ? (sans histoire)
  COMP("003_aire_ou_perimetre", 2, "Le bord, c'est le périmètre. Le dedans, c'est l'aire.", () => tourOuDedans(false)),

  // ★2 — quel calcul donne le périmètre ? (la figure cotée)
  COMP("008_quel_calcul", 2, "Le périmètre, c'est le tour : on ADDITIONNE tous les côtés, chacun une fois.", () => {
    const n = entre(3, 5);
    const u = un(["cm", "m"]);
    const { cotes, canvas } = polyCote(n, entre(4, 9), u);
    const ecr = (l: number[], op: string) => l.map((c) => `${c} ${u}`).join(` ${op} `);
    const juste = ecr(cotes, "+");
    return {
      text: `${un(["Regarde la figure.", `Voici un ${nomPoly(n)}.`, `Observe ce ${nomPoly(n)}.`, "Lis les côtés sur le dessin."])} ${un([
        "Quel calcul donne son périmètre ?",
        "Quel calcul donne la longueur de son tour ?",
        "Quel calcul faut-il faire pour trouver son périmètre ?",
        "Comment calcule-t-on son périmètre ?",
        "Choisis le bon calcul pour son périmètre.",
      ])}`,
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

  // ★2 — sur quadrillage : on compte le bord, pas les carreaux du dedans
  COMP("009_quadrillage_bord", 2, "Sur un quadrillage, le tour se compte en côtés de carreaux, sur le BORD.", () => {
    const cases = polyomino(5, 3);
    const P = contour(cases);
    const A = cases.length;
    if (Math.random() < 0.45) {
      return {
        text: un([
          "Pour trouver le périmètre de cette figure, que compte-t-on ?",
          "Que faut-il compter pour le périmètre de cette figure ?",
          "Sur le quadrillage, comment trouve-t-on le périmètre de la figure ?",
          "Le périmètre de cette figure : que faut-il compter ?",
        ]),
        ...qcm("les côtés de carreaux sur le bord", ["les carreaux de l'intérieur", "les coins de la figure", "les carreaux d'une seule ligne"]),
        explanation: exp(
          "Le périmètre est la longueur du tour.",
          "Sur un quadrillage, on suit le bord et on compte les côtés de carreaux.",
          `Ici, le bord compte ${P} côtés de carreaux. Les ${A} carreaux du dedans, c'est l'aire.`,
          "On compte les côtés de carreaux sur le bord.",
        ),
        canvas: quadrillage([cases]),
      };
    }
    return {
      text: `${un(UN_CARREAU())} ${un(["Combien mesure le tour de cette figure ?", "Quel est le périmètre de cette figure ?", "Trouve le périmètre de la figure.", "Combien mesure son contour ?"])}`,
      ...qcmN(P, [A, P - 2, P + 2, P + 4], "cm"),
      explanation: exp(
        "Le périmètre est la longueur du tour.",
        "On suit le bord et on compte les côtés de carreaux, sans compter les carreaux du dedans.",
        `Le bord compte ${P} côtés de carreaux de 1 cm. (Les ${A} carreaux du dedans donnent l'aire.)`,
        `Le périmètre est ${P} cm.`,
      ),
      canvas: quadrillage([cases]),
    };
  }),

  // ★2 — l'erreur « longueur × largeur »
  COMP("005_erreur_longueur_largeur", 2, "Longueur × largeur sert à calculer une AIRE, pas un périmètre.", () => {
    const [o, u, max] = un(RECT_COURTS);
    const [L, l] = dimsCourt(max, 12);
    const p = perso();
    return {
      text: `${p.nom} dit : « Le périmètre de ${ce(o)}, c'est ${L} × ${l} = ${L * l} ${u}. » ${un([`A-t-${p.il} raison ?`, "Qu'en penses-tu ?", "Est-ce juste ?", `${cap(p.il)} a raison ?`])}`,
      ...qcm(`non : ${L} × ${l} donne l'aire, pas le tour`, ["oui, c'est bien le périmètre", `non : il faut faire ${L} + ${l}`, `non : il faut faire ${L} × 4`]),
      explanation: exp(
        "Le périmètre est la longueur du tour ; l'aire est la surface du dedans.",
        "Pour le tour d'un rectangle : une longueur plus une largeur, c'est la moitié du tour, puis fois 2.",
        `${L} × ${l} = ${L * l} : ce sont les carreaux du dedans (l'aire). Le tour : ${L} + ${l} = ${L + l}, puis ${L + l} × 2 = ${2 * (L + l)} ${u}.`,
        `Non : le périmètre est ${2 * (L + l)} ${u}.`,
      ),
      canvas: dessinRect(L, l, u, false),
    };
  }),

  // ★3 — le tour ou le dedans, avec une histoire
  COMP("010_histoire_tour_dedans", 3, "Ce qui suit le bord : périmètre. Ce qui couvre le dedans : aire.", () => tourOuDedans(true)),

  // ★3 — la ficelle garde sa longueur, quelle que soit la forme
  COMP("011_ficelle", 3, "On ne coupe pas la ficelle : sa longueur ne change pas.", () => {
    const n = entre(3, 5);
    const { cotes, canvas } = polyCote(n, entre(4, 9), "cm");
    const P = somme(cotes);
    const fil = un(["une ficelle", "un ruban", "un fil de laine", "une cordelette", "une guirlande", "un lacet", "un élastique"]);
    const leFil = fil.replace(/^une /, "la ").replace(/^un /, "le ").replace(/^(la|le) ([aeiouéè])/, "l'$2");
    const forme = un(["un carré", "un rectangle", "un rond", "un triangle", "une étoile"].filter((f) => f !== `un ${nomPoly(n)}`));
    const p = perso();
    return {
      text: `${p.nom} forme ce ${nomPoly(n)} avec ${fil}. Puis ${p.il} reprend ${leFil} pour former ${forme}. ${un([
        `Quel est le périmètre de ${ce(forme)} ?`,
        `Combien mesure le tour de ${ce(forme)} ?`,
        "Quelle est la longueur du tour, maintenant ?",
      ])}`,
      ...qcmN(P, [P - cotes[0], P + 4, P - 2, P + 10, cotes[0] * 4], "cm"),
      explanation: exp(
        "Le périmètre est la longueur du contour. Avec le même fil, le contour garde la même longueur.",
        "On calcule le tour du premier dessin : c'est toute la longueur du fil.",
        `${cotes.join(" + ")} = ${P}. Le fil mesure ${P} cm, et il fait tout le tour de la nouvelle forme.`,
        `Le périmètre est toujours ${P} cm.`,
      ),
      canvas,
    };
  }),

  // ★3 — même aire, périmètres différents
  COMP("012_meme_aire_autre_tour", 3, "Compte le BORD de chaque figure, pas ses carreaux.", () => {
    const PAIRES: [number, number, number, number][] = [
      [2, 6, 3, 4], [2, 8, 4, 4], [2, 9, 3, 6], [1, 8, 2, 4], [1, 6, 2, 3], [1, 9, 3, 3], [3, 8, 4, 6], [1, 4, 2, 2], [2, 5, 1, 10], [1, 7, 1, 7],
    ];
    let A: Case[];
    let B: Case[];
    let memeAire = true;
    if (Math.random() < 0.6) {
      const [h1, w1, h2, w2] = un(PAIRES.filter((p) => p[1] + p[3] <= 14 && !(p[0] === p[2] && p[1] === p[3])));
      [A, B] = Math.random() < 0.5 ? [rect(h1, w1), rect(h2, w2)] : [rect(h2, w2), rect(h1, w1)];
    } else {
      A = polyomino(5, 3);
      B = polyomino(5, 3);
      memeAire = A.length === B.length;
    }
    const pa = contour(A);
    const pb = contour(B);
    const juste = pa > pb ? "celle de gauche a le plus grand périmètre" : pa < pb ? "celle de droite a le plus grand périmètre" : "elles ont le même périmètre";
    return {
      text: `${un(UN_CARREAU())} ${memeAire ? `Ces deux figures ont ${A.length} carreaux chacune. ` : ""}${un(["Laquelle a le plus grand périmètre ?", "Que peut-on dire de leurs périmètres ?", "Compare leurs périmètres.", "Laquelle a le plus long tour ?"])}`,
      ...qcm(juste, ["celle de gauche a le plus grand périmètre", "celle de droite a le plus grand périmètre", "elles ont le même périmètre", "on ne peut pas savoir"]),
      explanation: exp(
        "Le périmètre est la longueur du tour ; le nombre de carreaux, c'est l'aire.",
        "On compte les côtés de carreaux sur le bord de chaque figure, puis on compare.",
        `À gauche : ${pa} cm. À droite : ${pb} cm.${memeAire && pa !== pb ? " Même nombre de carreaux, et pourtant pas le même tour !" : ""}`,
        `${cap(juste)}.`,
      ),
      canvas: quadrillage([A, B]),
    };
  }),
];

/* =========================================================
   PERIMETRE_TRIANGLE — Nina, décoratrice : on ajoute les 3 côtés
========================================================= */
const TRI = atelierP("triangle");

const TRI_SIT: readonly Sit[] = [
  S("un fanion", "coud un galon doré autour", "galon", ["décoratrice", "décorateur"], "cm", 10, 40),
  S("une voile de bateau", "coud une corde tout autour", "corde", ["voilière", "voilier"], "m", 2, 9),
  S("un panneau de signalisation", "colle une bande blanche autour", "bande blanche", ["peintre", "peintre"], "cm", 40, 90),
  S("une étiquette", "colle un fil doré autour", "fil doré", ["libraire", "libraire"], "cm", 4, 12),
  S("un jardin", "pose une clôture autour", "clôture", ["jardinière", "jardinier"], "m", 8, 30),
  S("un enclos", "monte une barrière autour", "barrière", ["éleveuse", "éleveur"], "m", 10, 40),
  S("un massif de fleurs", "pose une bordure autour", "bordure", ["fleuriste", "fleuriste"], "m", 2, 9),
  S("un foulard", "coud un ruban autour", "ruban", ["couturière", "couturier"], "cm", 30, 90),
  S("une table de jardin", "colle une bande de bois autour", "bande de bois", ["menuisière", "menuisier"], "cm", 60, 120),
  S("un terrain de jeu", "trace une ligne blanche autour", "ligne blanche", ["animatrice", "animateur"], "m", 10, 40),
  S("un tapis de gym", "coud un galon autour", "galon", ["professeure de sport", "professeur de sport"], "cm", 60, 150),
  S("une carte de vœux", "colle un ruban autour", "ruban", ["illustratrice", "illustrateur"], "cm", 8, 20),
  S("un cerf-volant", "colle un liseré autour", "liseré", ["créatrice de jouets", "créateur de jouets"], "cm", 30, 80),
  S("un champ", "pose du grillage autour", "grillage", ["agricultrice", "agriculteur"], "m", 20, 90),
  S("une piste de course", "tend une corde autour", "corde", ["entraîneuse", "entraîneur"], "m", 20, 60),
  S("un bac à sable", "pose une bordure en bois autour", "bordure", ["paysagiste", "paysagiste"], "cm", 80, 200),
  S("un sandwich", "pose une ficelle autour", "ficelle", ["cuisinière", "cuisinier"], "cm", 8, 15),
  S("un poster", "colle un ruban adhésif autour", "ruban adhésif", ["graphiste", "graphiste"], "cm", 30, 70),
  S("un champ de cannes", "pose une clôture autour", "clôture", ["planteuse", "planteur"], "m", 20, 80),
];
/** Les objets en triangle, en phrase courte (★1-★2). */
const TRI_COURTS: readonly (readonly [string, U | null])[] = [
  ["un triangle", null], ["un fanion", "cm"], ["un badge", "cm"], ["une étiquette", "cm"], ["une voile", "m"], ["un jardin", "m"],
  ["un bout de tissu", "cm"], ["une parcelle", "m"], ["un morceau de carton", "cm"], ["un enclos", "m"], ["une figure", null], ["un sticker", "cm"],
];

function triCourt(): { o: string; u: U } {
  const [o, u] = un(TRI_COURTS);
  return { o, u: u ?? un(["cm", "m"] as const) };
}

const triangleItems: TutorBankItemV4[] = [
  fixe({
    id: "cm1_perimetre_triangle_fixed_001_canvas_modele",
    microId: "perimetre_triangle",
    difficulty: 1,
    theme: "neutral",
    text: "Observe le triangle. Ses côtés mesurent 4 cm, 5 cm et 6 cm. Quel est son périmètre ?",
    choices: ["15 cm", "9 cm", "11 cm", "19 cm"],
    expected: ["15 cm"],
    hint: "Additionne les trois côtés du triangle.",
    explanation: exp(
      "Le périmètre d'un triangle, c'est la somme de ses 3 côtés.",
      "On ajoute les 3 côtés en faisant le tour, chacun une seule fois.",
      "4 + 5 = 9. Plus 6 : 15.",
      "Le périmètre est 15 cm.",
    ),
    tags: ["cm1", "perimetre", "triangle", "modele", "canvas"],
    canvas: dessinTri([6, 5, 4], "cm"),
  }),
  fixe({
    id: "cm1_perimetre_triangle_fixed_002_quelconque",
    microId: "perimetre_triangle",
    difficulty: 2,
    theme: "neutral",
    text: "Un triangle a des côtés de 7 cm, 8 cm et 10 cm. Quel est son périmètre ?",
    choices: ["25 cm", "15 cm", "18 cm", "32 cm"],
    expected: ["25 cm"],
    hint: "Additionne les trois côtés.",
    explanation: exp(
      "Le périmètre d'un triangle, c'est la somme de ses 3 côtés.",
      "On ajoute les 3 côtés en faisant le tour.",
      "7 + 8 = 15. Plus 10 : 25.",
      "Le périmètre est 25 cm.",
    ),
    tags: ["cm1", "perimetre", "triangle", "qcm"],
  }),
  fixe({
    id: "cm1_perimetre_triangle_fixed_003_equilateral",
    microId: "perimetre_triangle",
    difficulty: 2,
    theme: "neutral",
    text: "Un triangle a ses 3 côtés égaux : 6 cm chacun. Quel est son périmètre ?",
    choices: ["18 cm", "12 cm", "9 cm", "24 cm"],
    expected: ["18 cm"],
    hint: "Les 3 côtés sont égaux : un côté fois 3.",
    explanation: exp(
      "Le périmètre d'un triangle, c'est la somme de ses 3 côtés.",
      "Si les 3 côtés sont égaux, on multiplie un côté par 3.",
      "6 × 3 = 18.",
      "Le périmètre est 18 cm.",
    ),
    tags: ["cm1", "perimetre", "triangle", "equilateral", "qcm"],
    canvas: dessinTri([6, 6, 6], "cm", { codes: [1, 1, 1] }),
  }),

  // ★1 — le triangle coté, sans histoire
  TRI("001_triangle_quelconque", 1, "Un triangle a 3 côtés : ajoute les 3 longueurs.", () => {
    const { o, u } = triCourt();
    const cotes = cotesTriangle(u === "cm" ? 3 : 4, u === "cm" ? 12 : 20, "quelconque", 1);
    const P = somme(cotes);
    const t = cotes.map((c) => lg(c, u));
    return {
      text: `${un([`Voici ${o}.`, `Regarde ${ce(o)}.`, `Observe ${ce(o)}.`])} ${un([
        `Ses côtés mesurent ${liste(t)}.`,
        `Ses trois côtés mesurent ${liste(t)}.`,
        `Les côtés mesurent ${liste(t)}.`,
        "Lis les longueurs sur le dessin.",
      ])} ${un(QUEL_P)}`,
      ...qcmN(P, leurresSomme(cotes), u),
      explanation: exp(
        "Le périmètre d'un triangle, c'est la somme de ses 3 côtés.",
        "On ajoute les 3 côtés en faisant le tour, chacun une seule fois.",
        `${cotes[0]} + ${cotes[1]} = ${cotes[0] + cotes[1]}. Plus ${cotes[2]} : ${P}.`,
        `Le périmètre est ${lg(P, u)}.`,
      ),
      canvas: dessinTri(cotes, u),
    };
  }),

  // ★1 — quel calcul fait le tour ?
  TRI("002_quel_calcul", 1, "On fait le tour : on ajoute les 3 côtés, chacun une fois.", () => {
    const { o, u } = triCourt();
    const [a, b, c] = cotesTriangle(u === "cm" ? 3 : 4, u === "cm" ? 12 : 20, "quelconque", 1);
    const e = (l: number[], op: string) => l.map((x) => lg(x, u)).join(` ${op} `);
    const juste = e([a, b, c], "+");
    return {
      text: `${un([`Voici ${o}.`, `Regarde ${ce(o)}.`, `Observe ${ce(o)}.`])} ${un([
        "Quel calcul donne son périmètre ?",
        "Quel calcul faut-il faire pour trouver son périmètre ?",
        "Choisis le bon calcul pour faire le tour.",
        "Comment calcule-t-on la longueur de son tour ?",
        "Quel calcul donne la longueur de son contour ?",
      ])}`,
      ...qcm(juste, [e([a, b], "+"), e([a, b, c, a], "+"), e([a, b, c], "×"), e([b, c], "+")]),
      explanation: exp(
        "Le périmètre d'un triangle, c'est la somme de ses 3 côtés.",
        "On ajoute les 3 côtés en faisant le tour, chacun une seule fois : ni oubli, ni double.",
        `${juste} = ${lg(a + b + c, u)}.`,
        `Le bon calcul est ${juste}.`,
      ),
      canvas: dessinTri([a, b, c], u),
    };
  }),

  // ★1 — l'exercice de la vidéo : « un triangle a des côtés de 6 cm, 8 cm et 10 cm »
  TRI("008_cotes_dans_l_enonce", 1, "Ajoute les 3 côtés : le premier, plus le deuxième, plus le troisième.", () => {
    const { o, u } = triCourt();
    const cotes = cotesTriangle(u === "cm" ? 3 : 4, u === "cm" ? 15 : 25, "quelconque", 1);
    const P = somme(cotes);
    const t = liste(cotes.map((c) => lg(c, u)));
    const sujet = o === "un triangle" || o === "une figure" ? cap(o) : `${cap(o)} en triangle`;
    const avecDessin = Math.random() < 0.75;
    return {
      text: `${un([`${sujet} a des côtés de ${t}.`, `Les côtés ${du(o)}${o === "un triangle" ? "" : " en triangle"} mesurent ${t}.`, `${sujet} : ses 3 côtés mesurent ${t}.`])} ${un(QUEL_P)}`,
      ...qcmN(P, leurresSomme(cotes), u),
      explanation: exp(
        "Le périmètre d'un triangle, c'est la somme de ses 3 côtés.",
        "On ajoute les 3 côtés en faisant le tour.",
        `${cotes[0]} + ${cotes[1]} = ${cotes[0] + cotes[1]}. Plus ${cotes[2]} : ${P}.`,
        `Le périmètre est ${lg(P, u)}.`,
      ),
      ...(avecDessin ? { canvas: dessinTri(cotes, u) } : {}),
    };
  }),

  // ★2 — les 3 côtés égaux : un côté fois 3
  TRI("003_triangle_equilateral", 2, "Les 3 côtés sont égaux : au lieu d'ajouter 3 fois, on fait le côté fois 3.", () => {
    const { o, u } = triCourt();
    const c = u === "cm" ? un([entre(4, 12), entre(2, 9) * 5]) : entre(3, 25);
    const calc = Math.random() < 0.3;
    const debut = `${un([`Voici ${o}.`, `Regarde ${ce(o)}.`, `Observe ${ce(o)}.`])} ${un([
      `Ses 3 côtés sont égaux : ${lg(c, u)} chacun.`,
      `Ses trois côtés mesurent tous ${lg(c, u)}.`,
      `Chacun de ses 3 côtés mesure ${lg(c, u)}.`,
      `Ses 3 côtés ont la même longueur : ${lg(c, u)}.`,
    ])}`;
    return {
      text: `${debut} ${calc ? un(["Quel calcul rapide donne son périmètre ?", "Quel calcul est le plus rapide pour son tour ?"]) : un(QUEL_P)}`,
      ...(calc ? qcm(`${lg(c, u)} × 3`, [`${lg(c, u)} × 2`, `${lg(c, u)} + 3`, `${lg(c, u)} × 4`]) : qcmN(3 * c, [2 * c, c + 3, 4 * c, c], u)),
      explanation: exp(
        "Le périmètre d'un triangle, c'est la somme de ses 3 côtés.",
        "Si les 3 côtés sont égaux, on multiplie un côté par 3.",
        `${c} + ${c} + ${c}, c'est ${c} × 3 = ${3 * c}.`,
        `Le périmètre est ${lg(3 * c, u)}.`,
      ),
      canvas: dessinTri([c, c, c], u, { codes: [1, 1, 1] }),
    };
  }),

  // ★2 — deux côtés égaux : ne pas oublier de compter les deux
  TRI("004_triangle_isocele", 2, "Deux côtés sont égaux : il faut les compter TOUS LES DEUX.", () => {
    const { o, u } = triCourt();
    const [a, b] = cotesTriangle(u === "cm" ? 4 : 5, u === "cm" ? 30 : 40, "isocele", u === "cm" ? un([1, 5]) : 1);
    const P = a + 2 * b;
    return {
      text: `${un([`Voici ${o}.`, `Regarde ${ce(o)}.`, `Observe ${ce(o)}.`])} ${un([
        `Ses côtés mesurent ${lg(a, u)}, ${lg(b, u)} et ${lg(b, u)}.`,
        `Deux côtés mesurent ${lg(b, u)} chacun, le troisième ${lg(a, u)}.`,
        `En bas, ${lg(a, u)}. À gauche et à droite, ${lg(b, u)}.`,
      ])} ${un(QUEL_P)}`,
      ...qcmN(P, [a + b, 2 * a + b, 3 * b, 3 * a, P + 10], u),
      explanation: exp(
        "Le périmètre d'un triangle, c'est la somme de ses 3 côtés.",
        "On ajoute les 3 côtés en faisant le tour : les deux côtés égaux comptent chacun.",
        `${a} + ${b} = ${a + b}. Plus ${b} : ${P}.`,
        `Le périmètre est ${lg(P, u)}.`,
      ),
      canvas: dessinTri([a, b, b], u, { codes: [0, 1, 1] }),
    };
  }),

  // ★2 — Nina et son galon : une petite histoire, une seule étape
  TRI("010_contexte_galon", 2, "Le galon fait le tour : on ajoute les 3 côtés.", () => {
    const s = un(TRI_SIT);
    const p = perso(s.metier);
    const sorte = un(["quelconque", "quelconque", "isocele"] as const);
    const cotes = cotesTriangle(s.min, s.max, sorte);
    const P = somme(cotes);
    const t = liste(cotes.map((c) => lg(c, s.u)));
    return {
      text: `${phraseSit(p, s, "triangulaire")} ${un([`Ses côtés mesurent ${t}.`, `Les 3 côtés mesurent ${t}.`, `Les côtés font ${t}.`])} ${un(QFIL(s))}`,
      ...qcmN(P, leurresSomme(cotes, pasDe(s.min)), s.u),
      explanation: exp(
        "Le périmètre est la longueur du tour : c'est ce que le " + s.fil + " doit couvrir.",
        "On ajoute les 3 côtés en faisant le tour, chacun une seule fois.",
        `${cotes[0]} + ${cotes[1]} = ${cotes[0] + cotes[1]}. Plus ${cotes[2]} : ${P}.`,
        `Il faut ${lg(P, s.u)} ${de(s.fil)}.`,
      ),
      canvas: dessinTri(cotes, s.u, sorte === "isocele" ? { codes: [0, 1, 1] } : {}),
    };
  }),

  // ★2 — le panneau aux 3 côtés égaux, en histoire
  TRI("011_contexte_cotes_egaux", 2, "3 côtés égaux : le côté fois 3.", () => {
    const s = un(TRI_SIT);
    const p = perso(s.metier);
    const c = tire(s.min, s.max, pasDe(s.min));
    return {
      text: `${phraseSit(p, s, "triangulaire")} ${un([`Ses 3 côtés sont égaux : ${lg(c, s.u)} chacun.`, `Ses trois côtés mesurent tous ${lg(c, s.u)}.`, `Chaque côté mesure ${lg(c, s.u)}.`])} ${un(QFIL(s))}`,
      ...qcmN(3 * c, [2 * c, c + 3, 4 * c, c], s.u),
      explanation: exp(
        "Le périmètre d'un triangle, c'est la somme de ses 3 côtés.",
        "Si les 3 côtés sont égaux, on multiplie un côté par 3.",
        `${c} × 3 = ${3 * c}.`,
        `Il faut ${lg(3 * c, s.u)} ${de(s.fil)}.`,
      ),
      canvas: dessinTri([c, c, c], s.u, { codes: [1, 1, 1] }),
    };
  }),

  // ★3 — le défi de la vidéo : une guirlande de plusieurs fanions
  TRI("012_plusieurs_triangles", 3, "D'abord le tour d'UN triangle, puis fois le nombre de triangles.", () => {
    const s = un(TRI_SIT.filter((x) => x.u === "cm" && x.max <= 120));
    const p = perso(s.metier);
    const k = entre(2, 6);
    const cotes = cotesTriangle(s.min, s.max, un(["quelconque", "isocele"] as const));
    const P = somme(cotes);
    const t = liste(cotes.map((c) => lg(c, s.u)));
    return {
      text: `${p.txt} prépare ${k} ${pluriel(s.objet)} triangulaires identiques. Chacun a des côtés de ${t}. ${un([
        `Combien de ${motU(s.u)} ${de(s.fil)} faut-il pour les ${k} ?`,
        `Quelle longueur ${de(s.fil)} faut-il pour faire le tour des ${k} ?`,
        `Il veut un ${s.fil} autour de chacun. Combien en faut-il en tout ?`.replace("Il veut", `${cap(p.il)} veut`),
      ])}`,
      ...qcmN(P * k, [P, P + k, P * (k - 1), (P - cotes[2]) * k, P * k + 10], s.u),
      explanation: exp(
        "Le périmètre d'un triangle, c'est la somme de ses 3 côtés.",
        "On calcule le tour d'un seul triangle, puis on multiplie par le nombre de triangles.",
        `Un tour : ${cotes.join(" + ")} = ${P}. Pour ${k} : ${P} × ${k} = ${P * k}.`,
        `Il faut ${lg(P * k, s.u)} ${de(s.fil)}.`,
      ),
      canvas: dessinTri(cotes, s.u),
    };
  }),

  // ★3 — le piège : un côté oublié
  TRI("006_erreur_oublier_un_cote", 3, "Le périmètre, c'est le tour ENTIER : les 3 côtés, chacun une fois.", () => {
    const s = un(TRI_SIT);
    const p = perso(s.metier);
    const cotes = cotesTriangle(s.min, s.max, "quelconque");
    const [a, b, c] = cotes;
    const P = a + b + c;
    const debut = `${phraseSit(p, s, "triangulaire")} Les côtés mesurent ${liste(cotes.map((x) => lg(x, s.u)))}. ${cap(p.il)} calcule ${a} + ${b} = ${a + b} et achète ${lg(a + b, s.u)} ${de(s.fil)}.`;
    if (Math.random() < 0.5) {
      return {
        text: `${debut} ${un(["Combien lui en manque-t-il ?", `Combien ${de(s.fil)} lui manque-t-il ?`, `Quelle longueur ${de(s.fil)} lui manque-t-il ?`])}`,
        ...qcmN(c, [a, b, P, a + b - c, c + 10], s.u),
        explanation: exp(
          "Le périmètre est le tour entier : les 3 côtés.",
          "On compte les 3 côtés, chacun une seule fois. Ici, un côté a été oublié.",
          `Il fallait ${a} + ${b} + ${c} = ${P}. ${P} − ${a + b} = ${c} : c'est le côté oublié.`,
          `Il manque ${lg(c, s.u)} ${de(s.fil)}.`,
        ),
        canvas: dessinTri(cotes, s.u),
      };
    }
    return {
      text: `${debut} ${un(["Quelle longueur fallait-il vraiment ?", `Combien ${de(s.fil)} fallait-il en réalité ?`, "Quel est le vrai périmètre ?"])}`,
      ...qcmN(P, [a + b, P + a, P - 10, a + c], s.u),
      explanation: exp(
        "Le périmètre est le tour entier : les 3 côtés.",
        "On compte les 3 côtés, chacun une seule fois.",
        `${a} + ${b} = ${a + b}. Plus ${c} : ${P}.`,
        `Il fallait ${lg(P, s.u)} ${de(s.fil)}.`,
      ),
      canvas: dessinTri(cotes, s.u),
    };
  }),

  // ★3 — le short : « j'ai 100 cm de guirlande, ça suffit ? »
  TRI("013_est_ce_assez", 3, "Calcule le tour, puis compare avec ce que tu as.", () => {
    const s = un(TRI_SIT);
    const p = perso(s.metier);
    const pas = pasDe(s.min);
    const cotes = cotesTriangle(s.min, s.max, un(["quelconque", "isocele"] as const));
    const P = somme(cotes);
    const dispo = Math.max(pas * 2, P + un([-3, -2, -1, 0, 1, 2, 3]) * pas * (s.u === "cm" && pas === 1 ? 2 : 1));
    return {
      text: `${p.txt} a ${lg(dispo, s.u)} ${de(s.fil)} pour faire le tour d'${s.objet} triangulaire. Les côtés mesurent ${liste(cotes.map((x) => lg(x, s.u)))}. ${un([
        "Est-ce assez ?",
        "Cela suffit-il ?",
        `A-t-${p.il} assez ${de(s.fil)} ?`,
        "Est-ce suffisant ?",
      ])}`,
      ...assez(dispo, P, [P - cotes[2], P - cotes[0]], s.u),
      explanation: exp(
        "Le périmètre est la longueur du tour.",
        "On ajoute les 3 côtés, puis on compare avec la longueur qu'on a.",
        `${cotes.join(" + ")} = ${P}. ${dispo === P ? `${P} = ${dispo}.` : dispo > P ? `${dispo} − ${P} = ${dispo - P}.` : `${P} − ${dispo} = ${P - dispo}.`}`,
        dispo === P ? "C'est juste assez." : dispo > P ? `C'est assez : il en reste ${lg(dispo - P, s.u)}.` : `Ce n'est pas assez : il en manque ${lg(P - dispo, s.u)}.`,
      ),
      canvas: dessinTri(cotes, s.u),
    };
  }),
];

/* =========================================================
   PERIMETRE_QUADRILATERE — Lucas, encadreur :
   longueur + largeur = la moitié du tour, puis fois 2 ; carré : côté × 4
========================================================= */
const QUAD = atelierP("quadrilatere");

const RECT_SIT: readonly Sit[] = [
  S("un tableau", "pose une baguette autour", "baguette", ["encadreuse", "encadreur"], "cm", 30, 90),
  S("un cadre photo", "colle une frise autour", "frise", ["photographe", "photographe"], "cm", 10, 30),
  S("une nappe", "coud de la dentelle autour", "dentelle", ["couturière", "couturier"], "cm", 80, 200),
  S("un potager", "pose une clôture autour", "clôture", ["jardinière", "jardinier"], "m", 6, 25),
  S("une chambre", "pose des plinthes le long des murs", "plinthe", ["peintre", "peintre"], "m", 3, 7),
  S("un enclos à moutons", "pose du grillage autour", "grillage", ["bergère", "berger"], "m", 10, 40),
  S("une piscine", "pose une margelle autour", "margelle", ["maçonne", "maçon"], "m", 5, 15),
  S("un coussin", "coud un galon autour", "galon", ["couturière", "couturier"], "cm", 30, 60),
  S("un tapis", "coud une frange autour", "frange", ["tapissière", "tapissier"], "cm", 80, 200),
  S("une affiche", "colle un ruban adhésif autour", "ruban adhésif", ["graphiste", "graphiste"], "cm", 40, 90),
  S("une table", "colle une bande de bois autour", "bande de bois", ["menuisière", "menuisier"], "cm", 80, 180),
  S("un bac à sable", "pose une bordure autour", "bordure", ["paysagiste", "paysagiste"], "cm", 100, 300),
  S("un drapeau", "coud un liseré autour", "liseré", ["couturière", "couturier"], "cm", 60, 150),
  S("un champ", "pose une clôture autour", "clôture", ["agricultrice", "agriculteur"], "m", 40, 120),
  S("une fenêtre", "pose un joint autour", "joint", ["vitrière", "vitrier"], "cm", 60, 140),
  S("un gâteau", "pose un ruban de chocolat autour", "ruban de chocolat", ["pâtissière", "pâtissier"], "cm", 20, 40),
  S("un parking à vélos", "peint une ligne autour", "ligne", ["peintre", "peintre"], "m", 6, 20),
  S("une cour de récréation", "trace une ligne blanche autour", "ligne blanche", ["directrice", "directeur"], "m", 20, 60),
  S("un terrain de pétanque", "pose des planches autour", "planche", ["animatrice", "animateur"], "m", 8, 20),
  S("un miroir", "colle une baguette dorée autour", "baguette dorée", ["encadreuse", "encadreur"], "cm", 40, 90),
  S("un parc à cabris", "pose une clôture autour", "clôture", ["éleveuse", "éleveur"], "m", 8, 25),
];
const CARRE_COURTS: readonly (readonly [string, U, number])[] = [
  ["un carré", "cm", 15], ["un tableau", "cm", 90], ["un coussin", "cm", 60], ["une nappe", "cm", 200], ["un jardin", "m", 30], ["un potager", "m", 20],
  ["une serviette", "cm", 50], ["un tapis", "cm", 200], ["une cour", "m", 60], ["un sous-verre", "cm", 12], ["un enclos", "m", 40], ["une boîte", "cm", 30],
];
/** « 9 cm de long et 5 cm de large » : la longueur L et la largeur l. */
function dimensions(min: number, max: number): [number, number] {
  const pas = pasDe(min);
  const L = tire(Math.max(min, 2 * pas), max, pas);
  const l = tire(Math.max(pas, Math.ceil((L * 0.3) / pas) * pas), L - pas, pas);
  return [L, Math.max(pas, l)];
}
const leurresRect = (L: number, l: number) => [L + l, L * l, 2 * L + l, L + 2 * l, 4 * L, 2 * (L + l) + 10];
const expRect = (L: number, l: number, u: string, conclusion: string) =>
  exp(
    "Le périmètre d'un rectangle est la longueur de son tour : 2 longueurs et 2 largeurs.",
    "Une longueur plus une largeur, c'est la moitié du tour. Puis fois 2.",
    `${L} + ${l} = ${L + l} : la moitié du tour. ${L + l} × 2 = ${2 * (L + l)}.`,
    conclusion || `Le périmètre est ${lg(2 * (L + l), u)}.`,
  );

const quadrilatereItems: TutorBankItemV4[] = [
  fixe({
    id: "cm1_perimetre_quadrilatere_fixed_g1",
    microId: "perimetre_quadrilatere",
    difficulty: 2,
    theme: "neutral",
    text: "Un rectangle mesure 8 cm de long et 5 cm de large. Quel est son périmètre ?",
    choices: ["26 cm", "13 cm", "40 cm", "21 cm"],
    expected: ["26 cm"],
    hint: "Une longueur plus une largeur : la moitié du tour. Puis fois 2.",
    explanation: expRect(8, 5, "cm", ""),
    tags: ["cm1", "perimetre", "perimetre_quadrilatere", "guide", "qcm"],
  }),
  fixe({
    id: "cm1_perimetre_quadrilatere_fixed_001_rectangle_canvas",
    microId: "perimetre_quadrilatere",
    difficulty: 2,
    theme: "neutral",
    text: "Observe le rectangle. Il mesure 6 cm de long et 3 cm de large. Quel est son périmètre ?",
    choices: ["18 cm", "9 cm", "15 cm", "12 cm"],
    expected: ["18 cm"],
    hint: "Un rectangle a deux longueurs et deux largeurs.",
    explanation: expRect(6, 3, "cm", ""),
    tags: ["cm1", "perimetre", "quadrilatere", "rectangle", "canvas", "modele"],
    canvas: dessinRect(6, 3, "cm", false),
  }),

  // ★1 — le rectangle aux 4 côtés écrits : on fait le tour
  QUAD("001_rectangle_short", 1, "Fais le tour : ajoute les 4 côtés.", () => {
    const [o, u, max] = un(RECT_COURTS);
    const [L, l] = dimsCourt(max, u === "cm" ? 12 : 20);
    const t = [L, l, L, l].map((x) => lg(x, u));
    return {
      text: `${un([`Voici ${o}.`, `Regarde ${ce(o)}.`, `Observe ${ce(o)}.`])} ${un([
        `Ses côtés mesurent ${liste(t)}.`,
        "Ses 4 côtés sont écrits sur le dessin.",
        "Lis ses 4 côtés sur le dessin.",
        `Ses 4 côtés : ${liste(t)}.`,
      ])} ${un(QUEL_P)}`,
      ...qcmN(2 * (L + l), leurresRect(L, l), u),
      explanation: exp(
        "Le périmètre est la longueur du tour : on ajoute les 4 côtés.",
        "On fait le tour du rectangle, côté après côté.",
        `${L} + ${l} = ${L + l}. Plus ${L} : ${2 * L + l}. Plus ${l} : ${2 * (L + l)}.`,
        `Le périmètre est ${lg(2 * (L + l), u)}.`,
      ),
      canvas: dessinRect(L, l, u, true),
    };
  }),

  // ★1 — le carré : 4 côtés égaux
  QUAD("003_carre_short", 1, "Un carré a 4 côtés égaux : le côté fois 4.", () => {
    const [o, u, max] = un(CARRE_COURTS);
    const c = coteCourt(max, 12);
    const sujet = o === "un carré" ? o : carreAccorde(o);
    return {
      text: `${un([`Voici ${sujet}.`, `Regarde ${ce(sujet)}.`, `Observe ${ce(sujet)}.`])} ${un([
        `Son côté mesure ${lg(c, u)}.`,
        `Ses 4 côtés mesurent ${lg(c, u)}.`,
        `Chaque côté mesure ${lg(c, u)}.`,
      ])} ${un(QUEL_P)}`,
      ...qcmN(4 * c, [2 * c, c * c, 3 * c, c + 4], u),
      explanation: exp(
        "Le périmètre d'un carré, c'est le tour de ses 4 côtés égaux.",
        "Un carré : le côté fois 4.",
        `${c} × 4 = ${4 * c}.`,
        `Le périmètre est ${lg(4 * c, u)}.`,
      ),
      canvas: dessinCarre(c, u),
    };
  }),

  // ★2 — l'exercice de la vidéo : « un rectangle mesure 9 cm de long et 5 cm de large »
  QUAD("002_rectangle_qcm", 2, "Une longueur plus une largeur : la moitié du tour. Puis fois 2.", () => {
    const [o, u, max] = un(RECT_COURTS);
    const [L, l] = dimsCourt(max, u === "cm" ? 15 : 30);
    const sujet = o === "un rectangle" ? o : `${o} rectangulaire`;
    return {
      text: `${un([
        `${cap(sujet)} mesure ${lg(L, u)} de long et ${lg(l, u)} de large.`,
        `${cap(sujet)} a une longueur de ${lg(L, u)} et une largeur de ${lg(l, u)}.`,
        `${cap(sujet)} fait ${lg(L, u)} sur ${lg(l, u)}.`,
        `La longueur ${du(o)} est ${lg(L, u)}, sa largeur ${lg(l, u)}.`,
      ])} ${un(QUEL_P)}`,
      ...qcmN(2 * (L + l), leurresRect(L, l), u),
      explanation: expRect(L, l, u, ""),
      canvas: dessinRect(L, l, u, false),
    };
  }),

  // ★2 — le carré de la vidéo (12 cm → 48 cm)
  QUAD("004_carre_qcm", 2, "Un carré : le côté fois 4.", () => {
    const [o, u, max] = un(CARRE_COURTS);
    const c = coteCourt(max, 15);
    const sujet = o === "un carré" ? o : carreAccorde(o);
    const calc = Math.random() < 0.35;
    const debut = un([`${cap(sujet)} a des côtés de ${lg(c, u)}.`, `${cap(sujet)} a ${lg(c, u)} de côté.`, `Le côté ${du(sujet)} mesure ${lg(c, u)}.`]);
    return {
      text: `${debut} ${calc ? un(["Quel calcul donne son périmètre ?", "Quel calcul rapide donne son tour ?"]) : un(QUEL_P)}`,
      ...(calc ? qcm(`${lg(c, u)} × 4`, [`${lg(c, u)} × 2`, `${lg(c, u)} × ${lg(c, u)}`, `${lg(c, u)} + 4`]) : qcmN(4 * c, [2 * c, c * c, 3 * c, c + 4], u)),
      explanation: exp(
        "Le périmètre d'un carré, c'est le tour de ses 4 côtés égaux.",
        `Un carré : le côté fois 4. (${c} × ${c}, ce serait l'aire.)`,
        `${c} × 4 = ${4 * c}.`,
        `Le périmètre est ${lg(4 * c, u)}.`,
      ),
      canvas: dessinCarre(c, u),
    };
  }),

  // ★2 — quel calcul pour le rectangle ?
  QUAD("010_calcul_rectangle", 2, "La moitié du tour (longueur + largeur), puis fois 2.", () => {
    const [o, u, max] = un(RECT_COURTS);
    const [L, l] = dimsCourt(max, 15);
    const a = lg(L, u);
    const b = lg(l, u);
    const sujet = o === "un rectangle" ? o : `${o} rectangulaire`;
    const juste = `(${a} + ${b}) × 2`;
    return {
      text: `${cap(sujet)} mesure ${a} sur ${b}. ${un(["Quel calcul donne son périmètre ?", "Quel calcul donne son tour ?", "Choisis le bon calcul pour son périmètre.", "Comment calcule-t-on son périmètre ?"])}`,
      ...qcm(juste, [`${a} + ${b}`, `${a} × ${b}`, `${a} × 2 + ${b}`, `${a} × 4`]),
      explanation: expRect(L, l, u, `Le bon calcul est ${juste}.`),
      canvas: dessinRect(L, l, u, false),
    };
  }),

  // ★2 — le short : « tu n'as fait que la moitié du tour ! »
  QUAD("011_moitie_du_tour", 2, "Longueur + largeur, ce n'est que la MOITIÉ du tour.", () => {
    if (Math.random() < 0.5) {
      const p = perso();
      const lieu = un(["la cour", "le terrain de foot", "le gymnase", "le préau", "le jardin", "la salle de classe", "le terrain de basket", "le parking", "le potager", "la piscine"]);
      const L = un([entre(10, 30), entre(2, 8) * 5]);
      const l = entre(4, L - 2);
      return {
        text: `${p.nom} fait le tour ${du(lieu.replace(/^la /, "une ").replace(/^le /, "un "))} en comptant ses pas : ${L} pas de long, ${l} pas de large. ${un([
          "Combien de pas pour tout le tour ?",
          "Combien de pas fait-il en tout ?".replace("fait-il", `fait-${p.il}`),
          "Combien de pas compte-t-il pour un tour complet ?".replace("compte-t-il", `compte-t-${p.il}`),
        ])}`,
        ...qcmN(2 * (L + l), [L + l, L * l, 2 * L + l, 4 * L], "pas"),
        explanation: expRect(L, l, "pas", `Il faut ${2 * (L + l)} pas pour tout le tour.`),
        canvas: dessinRect(L, l, "pas", false),
      };
    }
    const [o, u, max] = un(RECT_COURTS);
    const [L, l] = dimsCourt(max, 20);
    return {
      text: `${cap(o)} rectangulaire mesure ${lg(L, u)} sur ${lg(l, u)}. ${lg(L, u)} + ${lg(l, u)} = ${lg(L + l, u)} : c'est la moitié du tour. ${un(["Combien mesure le tour entier ?", "Quel est le périmètre ?", "Et le tour complet ?"])}`,
      ...qcmN(2 * (L + l), [L + l, (L + l) * 4, L * l, L + l + L], u),
      explanation: expRect(L, l, u, ""),
      canvas: dessinRect(L, l, u, false),
    };
  }),

  // ★2 — un quadrilatère quelconque : on ajoute les 4 côtés
  QUAD("005_quadrilatere_quelconque", 2, "4 côtés différents : on les ajoute un par un, en faisant le tour.", () => {
    const u = un(["cm", "m"] as const);
    const { cotes, canvas } = polyCote(4, entre(4, 12), u);
    const P = somme(cotes);
    return {
      text: `${un(["Voici un quadrilatère.", "Observe ce quadrilatère.", "Ce quadrilatère a 4 côtés différents.", "Regarde ce champ à 4 côtés.".replace("champ", u === "m" ? "champ" : "carton")])} ${un([
        `Ses côtés mesurent ${liste(cotes.map((c) => lg(c, u)))}.`,
        "Lis ses côtés sur le dessin.",
      ])} ${un(QUEL_P)}`,
      ...qcmN(P, leurresSomme(cotes), u),
      explanation: exp(
        "Le périmètre est la somme de tous les côtés.",
        "Les côtés ne sont pas égaux : on les ajoute un par un, en faisant le tour.",
        `${cotes.join(" + ")} = ${P}.`,
        `Le périmètre est ${lg(P, u)}.`,
      ),
      canvas,
    };
  }),

  // ★3 — Lucas encadre un tableau : rectangle ou carré, en histoire
  QUAD("006_contexte_baguette", 3, "Rectangle : (longueur + largeur) × 2. Carré : côté × 4.", () => {
    const s = un(RECT_SIT);
    const p = perso(s.metier);
    if (Math.random() < 0.3) {
      const c = tire(s.min, s.max, pasDe(s.min));
      return {
        text: `${p.txt} ${s.geste} d'${carreAccorde(s.objet)} de ${lg(c, s.u)} de côté. ${un(QFIL(s))}`,
        ...qcmN(4 * c, [2 * c, 3 * c, c + 4, c * c], s.u),
        explanation: exp("Le périmètre d'un carré, c'est le tour de ses 4 côtés égaux.", "Un carré : le côté fois 4.", `${c} × 4 = ${4 * c}.`, `Il faut ${lg(4 * c, s.u)} ${de(s.fil)}.`),
        canvas: dessinCarre(c, s.u),
      };
    }
    const [L, l] = dimensions(s.min, s.max);
    return {
      text: `${phraseSit(p, s, "rectangulaire")} ${un([`Il mesure ${lg(L, s.u)} sur ${lg(l, s.u)}.`.replace("Il", estF(s.objet) ? "Elle" : "Il"), `Longueur : ${lg(L, s.u)}. Largeur : ${lg(l, s.u)}.`, `Ses dimensions : ${lg(L, s.u)} sur ${lg(l, s.u)}.`])} ${un(QFIL(s))}`,
      ...qcmN(2 * (L + l), leurresRect(L, l), s.u),
      explanation: expRect(L, l, s.u, `Il faut ${lg(2 * (L + l), s.u)} ${de(s.fil)}.`),
      canvas: dessinRect(L, l, s.u, Math.random() < 0.3),
    };
  }),

  // ★3 — le défi de la vidéo : combien de baguette restera-t-il ?
  QUAD("012_reste", 3, "Calcule d'abord le tour, puis enlève-le de ce que tu as.", () => {
    const s = un(RECT_SIT);
    const p = perso(s.metier);
    const pas = pasDe(s.min);
    const [L, l] = dimensions(s.min, s.max);
    const P = 2 * (L + l);
    const dispo = P + entre(1, 6) * (pas === 1 ? 2 : pas * 2);
    return {
      text: `${p.txt} a ${lg(dispo, s.u)} ${de(s.fil)}. ${cap(p.il)} ${s.geste} d'${s.objet} rectangulaire de ${lg(L, s.u)} sur ${lg(l, s.u)}. ${un([
        `Combien ${de(s.fil)} lui restera-t-il ?`,
        `Quelle longueur ${de(s.fil)} lui restera-t-il ?`,
        `Combien de ${motU(s.u)} ${de(s.fil)} restera-t-il ?`,
      ])}`,
      ...qcmN(dispo - P, [dispo - (L + l), P, dispo - (2 * L + l), dispo - 4 * L], s.u),
      explanation: exp(
        "Le périmètre est la longueur du tour.",
        "D'abord le tour (la moitié du tour, puis fois 2), ensuite ce qui reste.",
        `${L} + ${l} = ${L + l}. ${L + l} × 2 = ${P}. ${dispo} − ${P} = ${dispo - P}.`,
        `Il restera ${lg(dispo - P, s.u)} ${de(s.fil)}.`,
      ),
      canvas: dessinRect(L, l, s.u, false),
    };
  }),

  // ★3 — le piège : l'aire à la place du périmètre
  QUAD("007_erreur_aire_rectangle", 3, "Longueur × largeur, c'est l'AIRE (les carreaux du dedans), pas le tour.", () => {
    const s = un(RECT_SIT);
    const p = perso(s.metier);
    const [L, l] = dimensions(s.min, Math.min(s.max, 60));
    const P = 2 * (L + l);
    const debut = `${p.txt} ${s.geste} d'${s.objet} rectangulaire de ${lg(L, s.u)} sur ${lg(l, s.u)}. ${cap(p.il)} calcule ${L} × ${l} = ${fr(L * l)}.`;
    if (Math.random() < 0.5) {
      return {
        text: `${debut} ${un([`A-t-${p.il} raison ?`, "Est-ce le bon calcul ?", "Qu'en penses-tu ?"])}`,
        ...qcm(`non : ${L} × ${l}, c'est l'aire ; il faut ${lg(P, s.u)}`, [
          `oui : il faut ${lg(L * l, s.u)} ${de(s.fil)}`,
          `non : il faut ${L} + ${l} = ${lg(L + l, s.u)}`,
          `non : il faut ${L} × 4 = ${lg(4 * L, s.u)}`,
        ]),
        explanation: expRect(L, l, s.u, `Non : ${L} × ${l} donne l'aire. Il faut ${lg(P, s.u)} ${de(s.fil)}.`),
        canvas: dessinRect(L, l, s.u, false),
      };
    }
    return {
      text: `${debut} ${un(["Quel est le bon résultat ?", `Combien ${de(s.fil)} faut-il vraiment ?`, "Quel est le vrai périmètre ?"])}`,
      ...qcmN(P, [L * l, L + l, 2 * L + l, 4 * L], s.u),
      explanation: expRect(L, l, s.u, `Il faut ${lg(P, s.u)} ${de(s.fil)}, pas ${fr(L * l)}.`),
      canvas: dessinRect(L, l, s.u, false),
    };
  }),
];

/* =========================================================
   PERIMETRE_POLYGONE — Emma, menuisière : une croix sur chaque côté ;
   côtés égaux : un côté fois le nombre de côtés
========================================================= */
const POLY = atelierP("polygone");

type SitReg = Sit & { ns: number[] };
const R = (s: Sit, ns: number[]): SitReg => ({ ...s, ns });
const POLY_SIT: readonly SitReg[] = [
  R(S("une table", "colle une bande de bois autour", "bande de bois", ["menuisière", "menuisier"], "cm", 30, 60), [6, 8]),
  R(S("un panneau stop", "colle une bande blanche autour", "bande blanche", ["peintre", "peintre"], "cm", 20, 40), [8]),
  R(S("un bac à sable", "pose une bordure autour", "bordure", ["paysagiste", "paysagiste"], "cm", 100, 200), [5, 6]),
  R(S("un kiosque", "accroche une guirlande autour", "guirlande", ["décoratrice", "décorateur"], "m", 2, 6), [6, 8]),
  R(S("un enclos", "pose une clôture autour", "clôture", ["éleveuse", "éleveur"], "m", 5, 20), [5, 6, 7, 8]),
  R(S("un sous-verre", "colle un fil doré autour", "fil doré", ["créatrice", "créateur"], "cm", 3, 6), [6, 8]),
  R(S("une piste de danse", "pose une bande lumineuse autour", "bande lumineuse", ["animatrice", "animateur"], "m", 2, 6), [6, 8]),
  R(S("un tapis", "coud un galon autour", "galon", ["couturière", "couturier"], "cm", 30, 60), [6, 8]),
  R(S("un massif de fleurs", "pose une bordure autour", "bordure", ["jardinière", "jardinier"], "m", 2, 6), [5, 6]),
  R(S("un carreau de mosaïque", "trace un trait doré autour", "trait doré", ["mosaïste", "mosaïste"], "cm", 4, 9), [6]),
  R(S("un bassin", "pose une margelle autour", "margelle", ["maçonne", "maçon"], "m", 2, 5), [6, 8]),
  R(S("un gâteau", "pose un ruban autour", "ruban", ["pâtissière", "pâtissier"], "cm", 8, 15), [6, 8]),
  R(S("un terrain de jeu", "trace une ligne autour", "ligne", ["animatrice", "animateur"], "m", 5, 15), [5, 6, 7, 8]),
  R(S("une fenêtre", "pose un joint autour", "joint", ["vitrière", "vitrier"], "cm", 20, 40), [8]),
  R(S("un plateau", "colle une bande de bois autour", "bande de bois", ["menuisière", "menuisier"], "cm", 20, 50), [5, 6, 7, 8, 10]),
  R(S("une cabane", "peint une ligne au sol autour", "ligne", ["architecte", "architecte"], "m", 2, 5), [5, 6, 8]),
  R(S("un écusson", "coud un fil rouge autour", "fil rouge", ["brodeuse", "brodeur"], "cm", 2, 6), [5, 6, 8]),
];
/** « à 8 côtés égaux » ou « en forme d'octogone ». */
const formeReg = (n: number) => (NOM_POLY[n] && n > 4 && Math.random() < 0.5 ? `en forme ${VOY.test(NOM_POLY[n]) ? "d'" : "de "}${NOM_POLY[n]}` : `à ${n} côtés égaux`);
const leurresRegulier = (n: number, c: number) => [c * (n - 1), c + n, c * (n + 1), ...(n % 2 === 0 ? [(c * n) / 2] : []), c];
const expRegulier = (n: number, c: number, u: string, conclusion: string) =>
  exp(
    "Le périmètre d'un polygone, c'est la somme de tous ses côtés.",
    "On compte les côtés avec une croix. Tous les côtés sont égaux : un côté fois le nombre de côtés.",
    `${n} côtés de ${lg(c, u)} : ${c} × ${n} = ${fr(c * n)}.`,
    conclusion || `Le périmètre est ${lg(c * n, u)}.`,
  );

const polygoneItems: TutorBankItemV4[] = [
  fixe({
    id: "cm1_perimetre_polygone_fixed_001_figure_libre_modele",
    microId: "perimetre_polygone",
    difficulty: 2,
    theme: "neutral",
    text: "Un carreau mesure 1 cm de côté. Quel est le périmètre de la figure ?",
    choices: ["8 cm", "4 cm", "6 cm", "10 cm"],
    expected: ["8 cm"],
    hint: "Compte seulement les côtés de carreaux du bord.",
    explanation: exp(
      "Le périmètre est la longueur du tour.",
      "Sur un quadrillage, chaque côté de carreau du bord compte pour 1 cm.",
      "La figure est un carré de 2 carreaux sur 2 : son bord compte 8 côtés de carreaux. (Les 4 carreaux du dedans, c'est l'aire.)",
      "Le périmètre est 8 cm.",
    ),
    tags: ["cm1", "perimetre", "polygone", "figure_libre", "quadrillage", "canvas", "modele"],
    canvas: quadrillage([rect(2, 2)]),
  }),
  fixe({
    id: "cm1_perimetre_polygone_fixed_002_pentagone_regulier",
    microId: "perimetre_polygone",
    difficulty: 2,
    theme: "neutral",
    text: "Un pentagone a 5 côtés égaux de 4 cm chacun. Quel est son périmètre ?",
    choices: ["20 cm", "16 cm", "9 cm", "24 cm"],
    expected: ["20 cm"],
    hint: "Un côté fois le nombre de côtés.",
    explanation: expRegulier(5, 4, "cm", ""),
    tags: ["cm1", "perimetre", "polygone", "regulier", "qcm"],
    canvas: dessinRegulier(5, 4, "cm"),
  }),
  fixe({
    id: "cm1_perimetre_polygone_fixed_003_cotes_donnes",
    microId: "perimetre_polygone",
    difficulty: 2,
    theme: "neutral",
    text: "Un polygone a des côtés de 3 cm, 4 cm, 5 cm et 6 cm. Quel est son périmètre ?",
    choices: ["18 cm", "12 cm", "21 cm", "15 cm"],
    expected: ["18 cm"],
    hint: "Additionne toutes les longueurs des côtés.",
    explanation: exp("Le périmètre d'un polygone, c'est la somme de tous ses côtés.", "On ajoute les côtés dans l'ordre du tour.", "3 + 4 = 7. Plus 5 : 12. Plus 6 : 18.", "Le périmètre est 18 cm."),
    tags: ["cm1", "perimetre", "polygone", "qcm"],
  }),

  // ★2 — un polygone aux côtés différents
  POLY("001_cotes_donnes", 2, "Fais une croix sur chaque côté compté, et ajoute-les dans l'ordre du tour.", () => {
    const n = entre(5, 8);
    const u = un(["cm", "m"] as const);
    const { cotes, canvas } = polyCote(n, entre(3, 9), u);
    const P = somme(cotes);
    return {
      text: `${un([`Voici un ${nomPoly(n)}.`, `Observe ce polygone à ${n} côtés.`, "Regarde cette figure.", "Voici un polygone."])} ${un([
        `Ses côtés mesurent ${liste(cotes.map((c) => lg(c, u)))}.`,
        "Lis ses côtés sur le dessin.",
        "Ses côtés sont écrits sur le dessin.",
      ])} ${un([...QUEL_P, "Fais le tour et calcule son périmètre.", "Compte les côtés, puis calcule son périmètre."])}`,
      ...qcmN(P, leurresSomme(cotes), u),
      explanation: exp(
        "Le périmètre d'un polygone, c'est la somme de tous ses côtés.",
        "On part d'un coin, on fait une croix sur chaque côté, on ajoute dans l'ordre du tour.",
        `${n} côtés : ${cotes.join(" + ")} = ${P}.`,
        `Le périmètre est ${lg(P, u)}.`,
      ),
      canvas,
    };
  }),

  // ★2 — le polygone aux côtés égaux : un côté fois le nombre de côtés
  POLY("003_polygone_regulier", 2, "Tous les côtés sont égaux : un côté fois le nombre de côtés.", () => {
    const n = un([5, 6, 6, 7, 8, 8, 9, 10, 12]);
    const u = un(["cm", "m"] as const);
    const c = un([entre(2, 9), entre(2, 9), entre(1, 6) * 5]);
    return {
      text: `${un([`Voici un ${nomPoly(n)}.`, `Observe ce ${nomPoly(n)}.`, "Regarde ce polygone.", "Voici une figure."])} ${un([
        `Ses ${n} côtés mesurent tous ${lg(c, u)}.`,
        `Il a ${n} côtés égaux de ${lg(c, u)}.`,
        `Chacun de ses ${n} côtés mesure ${lg(c, u)}.`,
        `Tous ses côtés sont égaux : ${lg(c, u)}.`,
      ])} ${un(QUEL_P)}`,
      ...qcmN(c * n, leurresRegulier(n, c), u),
      explanation: expRegulier(n, c, u, ""),
      canvas: dessinRegulier(n, c, u),
    };
  }),

  // ★2 — quel calcul ? (côté × nombre de côtés)
  POLY("002_quel_calcul_regulier", 2, "Compte les côtés avec une croix, puis : un côté fois le nombre de côtés.", () => {
    const n = un([5, 6, 7, 8, 9, 10]);
    const u = un(["cm", "m"] as const);
    const c = entre(2, 12);
    const a = lg(c, u);
    return {
      text: `${un(["Ce polygone a tous ses côtés égaux.", `Tous les côtés de ce ${nomPoly(n)} sont égaux.`, "Les côtés de cette figure sont tous égaux."])} ${un(["Quel calcul donne son périmètre ?", "Quel calcul donne son tour ?", "Choisis le bon calcul pour son périmètre.", "Compte ses côtés : quel calcul donne son périmètre ?"])}`,
      ...qcm(`${a} × ${n}`, [`${a} × ${n - 1}`, `${a} + ${n}`, `${a} × ${a}`, `${a} × ${n + 1}`]),
      explanation: expRegulier(n, c, u, `Le bon calcul est ${a} × ${n}.`),
      canvas: dessinRegulier(n, c, u),
    };
  }),

  // ★2 — sur quadrillage : le tour en côtés de carreaux
  POLY("004_figure_libre_simple", 2, "Compte les côtés de carreaux du BORD, pas les carreaux du dedans.", () => {
    const cases = polyomino(6, 4);
    const P = contour(cases);
    return {
      text: `${un(UN_CARREAU())} ${un(["Quel est le périmètre de cette figure ?", "Combien mesure le tour de la figure ?", "Trouve le périmètre de la figure.", "Combien mesure son contour ?", "Fais le tour de la figure : combien mesure-t-il ?"])}`,
      ...qcmN(P, [cases.length, P - 2, P + 2, P - 1], "cm"),
      explanation: exp(
        "Le périmètre est la longueur du tour.",
        "On part d'un coin et on compte les côtés de carreaux du bord jusqu'à revenir au départ.",
        `Le bord compte ${P} côtés de carreaux de 1 cm. (Les ${cases.length} carreaux, c'est l'aire.)`,
        `Le périmètre est ${P} cm.`,
      ),
      canvas: quadrillage([cases]),
    };
  }),

  // ★3 — l'octogone d'Emma, et ses cousins : côtés égaux en histoire
  POLY("008_regulier_contexte", 3, "Compte les côtés, puis un côté fois le nombre de côtés.", () => {
    const s = un(POLY_SIT);
    const p = perso(s.metier);
    const n = un(s.ns);
    const c = tire(s.min, s.max, pasDe(s.min));
    return {
      text: `${phraseSit(p, s, formeReg(n))} ${un([`Chaque côté mesure ${lg(c, s.u)}.`, `Ses côtés mesurent tous ${lg(c, s.u)}.`, `Ses ${n} côtés font ${lg(c, s.u)} chacun.`])} ${un(QFIL(s))}`,
      ...qcmN(c * n, leurresRegulier(n, c), s.u),
      explanation: expRegulier(n, c, s.u, `Il faut ${lg(c * n, s.u)} ${de(s.fil)}.`),
      canvas: dessinRegulier(n, c, s.u),
    };
  }),

  // ★3 — l'exercice de la vidéo : 5 côtés différents (7, 4, 6, 4 et 5 cm)
  POLY("009_differents_contexte", 3, "On ajoute les côtés dans l'ordre du tour : une croix sur chacun.", () => {
    const n = entre(5, 7);
    if (Math.random() < 0.4) {
      const u = un(["cm", "m"] as const);
      const { cotes, canvas } = polyCote(n, entre(4, 9), u);
      const P = somme(cotes);
      return {
        text: `${un([`Un ${nomPoly(n)} a des côtés de ${liste(cotes.map((c) => lg(c, u)))}.`, `Les ${n} côtés d'un polygone mesurent ${liste(cotes.map((c) => lg(c, u)))}.`])} ${un(QUEL_P)}`,
        ...qcmN(P, leurresSomme(cotes), u),
        explanation: exp("Le périmètre d'un polygone, c'est la somme de tous ses côtés.", "On ajoute les côtés dans l'ordre du tour.", `${cotes.join(" + ")} = ${P}.`, `Le périmètre est ${lg(P, u)}.`),
        ...(Math.random() < 0.6 ? { canvas } : {}),
      };
    }
    const s = un(POLY_SIT);
    const p = perso(s.metier);
    const pas = pasDe(s.min);
    const { cotes, canvas } = polyCote(n, (s.min + s.max) / 2, s.u, pas);
    const P = somme(cotes);
    return {
      text: `${phraseSit(p, s, `à ${n} côtés`)} ${un([`Les côtés mesurent ${liste(cotes.map((c) => lg(c, s.u)))}.`, "Les côtés sont écrits sur le dessin.", "Lis ses côtés sur le dessin."])} ${un(QFIL(s))}`,
      ...qcmN(P, leurresSomme(cotes, pas), s.u),
      explanation: exp(
        "Le périmètre d'un polygone, c'est la somme de tous ses côtés.",
        "On ajoute les côtés dans l'ordre du tour, avec une croix sur chacun.",
        `${cotes.join(" + ")} = ${P}.`,
        `Il faut ${lg(P, s.u)} ${de(s.fil)}.`,
      ),
      canvas,
    };
  }),

  // ★3 — le défi de la vidéo : 700 cm de bordure, est-ce assez ?
  POLY("010_est_ce_assez", 3, "Calcule le tour (un côté fois le nombre de côtés), puis compare.", () => {
    const s = un(POLY_SIT);
    const p = perso(s.metier);
    const n = un(s.ns);
    const pas = pasDe(s.min);
    const c = tire(s.min, s.max, pas);
    const P = c * n;
    const dispo = Math.max(pas, P + un([-2, -1, 0, 1, 2]) * Math.max(pas, Math.round(c / 3 / pas) * pas));
    return {
      text: `${p.txt} veut faire le tour d'${s.objet} à ${n} côtés égaux de ${lg(c, s.u)}. ${cap(p.il)} a ${lg(dispo, s.u)} ${de(s.fil)}. ${un(["Est-ce assez ?", "Cela suffit-il ?", `A-t-${p.il} assez ${de(s.fil)} ?`, "Est-ce suffisant ?"])}`,
      ...assez(dispo, P, [c * (n - 1), n % 2 === 0 ? P / 2 : c * (n + 1)], s.u),
      explanation: expRegulier(
        n,
        c,
        s.u,
        dispo === P ? "C'est juste assez." : dispo > P ? `${dispo} − ${P} = ${dispo - P} : c'est assez, il en reste ${lg(dispo - P, s.u)}.` : `${P} − ${dispo} = ${P - dispo} : ce n'est pas assez, il en manque ${lg(P - dispo, s.u)}.`,
      ),
      canvas: dessinRegulier(n, c, s.u),
    };
  }),

  // ★3 — le short : l'étoile à 5 pointes a 10 côtés
  POLY("011_etoile", 3, "Compte les côtés avec des croix : une étoile a DEUX côtés par pointe.", () => {
    const N = un([4, 5, 5, 6]);
    const u = "cm";
    const c = un([entre(3, 9), entre(2, 6) * 5]);
    const p = perso();
    const quoi = un(["une étoile pour le sapin", "une étoile de shérif", "une étoile en carton", "une étoile pour la fête", "une étoile pour sa chambre", "un badge en étoile", "un gâteau en étoile", "une étoile de mer en papier"]);
    return {
      text: `${p.nom} fabrique ${quoi}, à ${N} pointes. Tous ses côtés mesurent ${lg(c, u)}. ${un([
        `${cap(p.il)} veut une guirlande tout autour. Combien de ${motU(u)} faut-il ?`,
        "Quel est son périmètre ?",
        `Combien mesure le tour de l'étoile ?`,
        `${cap(p.il)} colle un ruban autour. Quelle longueur de ruban faut-il ?`,
      ])}`,
      ...qcmN(2 * N * c, [N * c, c + 2 * N, (2 * N - 1) * c, c * N + c], u),
      explanation: exp(
        "Le périmètre est la somme de tous les côtés.",
        "On compte les côtés avec une croix : chaque pointe a 2 côtés.",
        `${N} pointes, donc ${2 * N} côtés. ${c} × ${2 * N} = ${2 * N * c}.`,
        `Le périmètre est ${lg(2 * N * c, u)}.`,
      ),
      canvas: dessinEtoile(N, c, u),
    };
  }),

  // ★3 — quadrillage plus grand, carreaux de 2 cm ou 1 m
  POLY("005_figure_en_l", 3, "Compte les côtés de carreaux du bord, puis multiplie par la longueur d'un côté de carreau.", () => {
    const cases = polyomino(7, 4);
    const n = contour(cases);
    const [k, u] = un<[number, U]>([[1, "cm"], [2, "cm"], [2, "cm"], [1, "m"], [5, "m"], [3, "cm"]]);
    const cadre = un(["", "Voici le plan d'un jardin. ", "Voici une figure. ", "Voici le plan d'une terrasse. ", "Voici un motif de mosaïque. "]);
    return {
      text: `${cadre}${un(UN_CARREAU(k, u))} ${un(["Quel est le périmètre de la figure ?", "Combien mesure son tour ?", "Trouve son périmètre.", "Combien mesure le contour ?"])}`.trim(),
      ...qcmN(n * k, [n, cases.length * k, (n - 2) * k, (n + 2) * k], u),
      explanation: exp(
        "Le périmètre est la longueur du tour.",
        "On compte les côtés de carreaux du bord, puis on multiplie par la longueur d'un côté de carreau.",
        `${n} côtés de carreaux${k > 1 ? ` de ${lg(k, u)} : ${n} × ${k} = ${n * k}` : ` de ${lg(1, u)}`}.`,
        `Le périmètre est ${lg(n * k, u)}.`,
      ),
      canvas: quadrillage([cases]),
    };
  }),
];

/* =========================================================
   PERIMETRE_DEFI — Karim, éleveur : plusieurs tours ; le côté qui manque
========================================================= */
const DEFI = atelierP("defi");

const PISTES: readonly (readonly [string, string])[] = [
  ["une piste de vélo", "roule"],
  ["une piste d'athlétisme", "court"],
  ["le stade", "court"],
  ["le parc", "marche"],
  ["le lac", "marche"],
  ["la cour", "court"],
  ["une piste de roller", "patine"],
  ["un circuit de karting", "roule"],
  ["le pâté de maisons", "court"],
  ["une piste de course à pied", "court"],
  ["le terrain de foot", "court"],
  ["un chemin autour du jardin", "marche"],
];

const defiItems: TutorBankItemV4[] = [
  fixe({
    id: "cm1_perimetre_defi_fixed_001_erreur_aire_rectangle",
    microId: "perimetre_defi",
    difficulty: 3,
    theme: "neutral",
    text: "Un rectangle mesure 8 cm de long et 3 cm de large. Un élève dit : « Son périmètre est 24 cm, car 8 × 3 = 24. » A-t-il raison ?",
    choices: ["non : 8 × 3 donne l'aire ; le périmètre est 22 cm", "oui, le périmètre est 24 cm", "non : le périmètre est 8 + 3 = 11 cm", "non : le périmètre est 8 × 4 = 32 cm"],
    expected: ["non : 8 × 3 donne l'aire ; le périmètre est 22 cm"],
    hint: "8 × 3 donne l'aire du rectangle, pas son tour.",
    explanation: expRect(8, 3, "cm", "Non : le périmètre est 22 cm, pas 24 cm."),
    tags: ["cm1", "perimetre", "defi", "erreur", "aire", "rectangle", "qcm"],
    canvas: dessinRect(8, 3, "cm", false),
  }),

  // ★3 — plusieurs tours : on calcule un tour, puis on multiplie
  DEFI("010_plusieurs_tours", 3, "Plusieurs tours : un tour, puis fois le nombre de tours.", () => {
    const p = perso();
    const k = entre(2, 6);
    if (Math.random() < 0.5) {
      const [piste, verbe] = un(PISTES);
      const T = un([entre(2, 9) * 50, entre(3, 9) * 100, entre(12, 40) * 10]);
      return {
        text: `${un([`Le tour ${du(piste.replace(/^le /, "un ").replace(/^la /, "une "))} mesure ${lg(T, "m")}.`, `${cap(piste)} fait ${lg(T, "m")} de tour.`])} ${p.nom} ${verbe} ${k} tours. ${un([
          `Combien de mètres a-t-${p.il} parcouru ?`,
          "Quelle distance a-t-" + p.il + " faite ?",
          `Combien de mètres fait-${p.il} en tout ?`,
        ])}`,
        ...qcmN(T * k, [T + k, T * (k - 1), T * (k + 1), T * 2], "m"),
        explanation: exp(
          "Le périmètre est la longueur d'un tour.",
          "Plusieurs tours : on calcule un tour, puis on multiplie par le nombre de tours.",
          `${T} × ${k} = ${fr(T * k)}.`,
          `${cap(p.il)} a parcouru ${lg(T * k, "m")}.`,
        ),
      };
    }
    const carre = Math.random() < 0.4;
    const [L, l] = carre ? (() => { const c = entre(4, 30) * 5; return [c, c]; })() : dimensions(20, 150);
    const T = 2 * (L + l);
    const lieu = un(["un parc", "un champ", "un pré", "un stade", "un terrain", "une cour", "un jardin"]);
    return {
      text: `${p.nom} fait ${k} fois le tour d'${lieu} ${carre ? `${estF(lieu) ? "carrée" : "carré"} de ${lg(L, "m")} de côté` : `rectangulaire de ${lg(L, "m")} sur ${lg(l, "m")}`}. ${un(["Combien de mètres parcourt-" + p.il + " ?", "Quelle distance fait-" + p.il + " en tout ?"])}`,
      ...qcmN(T * k, [T, (L + l) * k, T + k, T * (k - 1)], "m"),
      explanation: exp(
        "Le périmètre est la longueur d'un tour.",
        "D'abord un tour, puis fois le nombre de tours.",
        `Un tour : ${carre ? `${L} × 4 = ${T}` : `${L} + ${l} = ${L + l}, fois 2 : ${T}`}. ${k} tours : ${T} × ${k} = ${fr(T * k)}.`,
        `${cap(p.il)} parcourt ${lg(T * k, "m")}.`,
      ),
      canvas: carre ? dessinCarre(L, "m") : dessinRect(L, l, "m", false),
    };
  }),

  // ★3 — le côté qui manque d'un triangle : le périmètre moins les côtés connus
  DEFI("011_cote_manquant_triangle", 3, "Le côté qui manque : le périmètre MOINS les côtés connus.", () => {
    const s = un([...TRI_SIT, S("une piste pour escargots", "tend un ruban autour", "ruban", ["jardinière", "jardinier"], "m", 5, 15)]);
    const pas = pasDe(s.min);
    const cotes = cotesTriangle(s.min, s.max, "quelconque");
    const [a, b, c] = cotes;
    const P = a + b + c;
    const p = perso(s.metier);
    const debut = Math.random() < 0.3
      ? `Un triangle a un périmètre de ${lg(P, s.u)}. Deux de ses côtés mesurent ${lg(a, s.u)} et ${lg(b, s.u)}.`
      : `${p.txt} a ${lg(P, s.u)} ${de(s.fil)} : juste de quoi faire le tour d'${s.objet} triangulaire. Deux côtés mesurent ${lg(a, s.u)} et ${lg(b, s.u)}.`;
    return {
      text: `${debut} ${un(["Combien mesure le troisième côté ?", "Et le troisième côté ?", "Quelle est la longueur du dernier côté ?"])}`,
      ...qcmN(c, [a + b, a + b + P, P - a, P - b, c + 10 * pas], s.u),
      explanation: exp(
        "Le périmètre est la somme des 3 côtés.",
        "Un côté qui manque : le périmètre moins les côtés connus.",
        `${a} + ${b} = ${a + b}. ${P} − ${a + b} = ${c}.`,
        `Le troisième côté mesure ${lg(c, s.u)}.`,
      ),
      canvas: dessinTri(cotes, s.u, { cache: 2 }),
    };
  }),

  // ★3 — le carré dont on connaît le tour (36 cm → 9 cm)
  DEFI("003_carre_inverse_simple", 3, "Un carré a 4 côtés égaux : partage le périmètre en 4.", () => {
    const [o, u, max] = un(CARRE_COURTS);
    const c = coteCourt(max, 15);
    const P = 4 * c;
    const sujet = o === "un carré" ? o : carreAccorde(o);
    return {
      text: `${un([`${cap(sujet)} a un périmètre de ${lg(P, u)}.`, `Le tour ${du(sujet)} mesure ${lg(P, u)}.`, `Il faut ${lg(P, u)} de ruban pour faire le tour ${du(sujet)}.`])} ${un(["Combien mesure un côté ?", "Quelle est la longueur d'un côté ?", "Combien mesure chaque côté ?"])}`,
      ...qcmN(c, [P / 2, P - 4, P * 4, c * 2, P / 4 + 4], u),
      explanation: exp(
        "Le périmètre d'un carré, c'est le côté fois 4.",
        "On cherche le nombre qui, fois 4, donne le périmètre : on partage en 4.",
        `${P} ÷ 4 = ${c}, car ${c} × 4 = ${P}.`,
        `Un côté mesure ${lg(c, u)}.`,
      ),
      canvas: dessinCarre("?", u),
    };
  }),

  // ★3 — tous les côtés égaux, le tour connu : périmètre ÷ nombre de côtés
  DEFI("012_regulier_inverse", 3, "Tous les côtés sont égaux : partage le périmètre par le nombre de côtés.", () => {
    const n = un([3, 5, 6, 8]);
    const u = un(["cm", "m"] as const);
    const c = entre(2, 12);
    const P = c * n;
    const nom = n === 3 ? "triangle" : nomPoly(n);
    return {
      text: `${un([`Un ${nom} a ${n} côtés égaux.`, `Les ${n} côtés de ce ${nom} sont égaux.`])} ${un([`Son périmètre est ${lg(P, u)}.`, `Son tour mesure ${lg(P, u)}.`])} ${un(["Combien mesure un côté ?", "Quelle est la longueur d'un côté ?"])}`,
      ...qcmN(c, [P - n, P / 2, P * n, c + 1, c * 2].filter((x) => Number.isInteger(x)), u),
      explanation: exp(
        "Le périmètre est la somme des côtés : ici, un côté fois " + n + ".",
        `On partage le périmètre en ${n} côtés égaux.`,
        `${P} ÷ ${n} = ${c}, car ${c} × ${n} = ${P}.`,
        `Un côté mesure ${lg(c, u)}.`,
      ),
      canvas: n === 3 ? dessinTri([c, c, c], u, { cache: 0, codes: [1, 1, 1] }) : dessinRegulier(n, "?", u),
    };
  }),

  // ★3 — le piège de la vidéo : on ajoute au lieu d'enlever
  DEFI("007_erreur_ajouter_au_lieu_d_enlever", 3, "Le côté qui manque est PLUS PETIT que le périmètre : on enlève les côtés connus.", () => {
    const s = un(TRI_SIT);
    const cotes = cotesTriangle(s.min, s.max, "quelconque");
    const [a, b, c] = cotes;
    const P = a + b + c;
    const p = perso();
    return {
      text: `Un ${s.u === "m" ? un(["pré", "jardin", "enclos", "terrain", "champ", "parc"]) : un(["fanion", "foulard", "morceau de tissu", "cerf-volant", "carton", "badge"])} en triangle a un périmètre de ${lg(P, s.u)}. Deux côtés mesurent ${lg(a, s.u)} et ${lg(b, s.u)}. ${p.nom} calcule ${a} + ${b} + ${P} = ${a + b + P} pour le troisième côté. ${un(["Quel est le bon résultat ?", "Combien mesure vraiment le troisième côté ?", "Corrige son calcul : combien mesure le troisième côté ?"])}`,
      ...qcmN(c, [a + b + P, a + b, P - a, P + a - b], s.u),
      explanation: exp(
        "Le périmètre est la somme des 3 côtés : un seul côté est forcément plus petit que le tour.",
        "Un côté qui manque : on enlève les côtés connus du périmètre, on ne les ajoute pas.",
        `${a} + ${b} = ${a + b}. ${P} − ${a + b} = ${c}.`,
        `Le troisième côté mesure ${lg(c, s.u)}.`,
      ),
      canvas: dessinTri(cotes, s.u, { cache: 2 }),
    };
  }),

  // ★4 — Karim et ses 3 rangées de fil : un tour, puis fois le nombre de rangées
  DEFI("013_rangees", 4, "D'abord un tour (moitié du tour, fois 2), puis fois le nombre de rangées.", () => {
    const p = perso(["éleveuse", "éleveur"]);
    const k = entre(2, 5);
    const [L, l] = dimensions(10, 60);
    const lieu = un(["un pré", "un enclos à moutons", "un potager", "un champ", "un parc à chevaux", "un poulailler", "un verger", "un enclos à chèvres", "un pré pour les ânes", "un jardin"]);
    const T = 2 * (L + l);
    const rang = un(["rangées de fil", "rangs de fil de fer", "rangées de corde", "tours de fil"]);
    return {
      text: `${p.txt} pose une clôture autour d'${lieu} rectangulaire de ${lg(L, "m")} sur ${lg(l, "m")}. ${cap(p.il)} met ${k} ${rang}. ${un(["Combien de mètres de fil faut-il ?", "Quelle longueur de fil faut-il en tout ?", `Combien de mètres de fil doit-${p.il} acheter ?`])}`,
      ...qcmN(T * k, [T, (L + l) * k, T + k, T * (k - 1)], "m"),
      explanation: exp(
        "Le périmètre est la longueur d'un tour.",
        "Plusieurs tours : on calcule un tour, puis on multiplie.",
        `${L} + ${l} = ${L + l} : la moitié du tour. ${L + l} × 2 = ${T}. ${k} rangées : ${T} × ${k} = ${fr(T * k)}.`,
        `Il faut ${lg(T * k, "m")} de fil.`,
      ),
      canvas: dessinRect(L, l, "m", false),
    };
  }),

  // ★4 — le défi de la vidéo : 300 m de fil, pré carré de 25 m, 3 rangées : assez ?
  DEFI("014_assez_de_fil", 4, "Un tour, puis fois le nombre de rangées ; enfin, compare avec ce qu'on a.", () => {
    const p = perso(["éleveuse", "éleveur"]);
    const k = entre(2, 4);
    const c = entre(3, 12) * 5;
    const T = 4 * c;
    const besoin = T * k;
    const dispo = besoin + un([-2, -1, 0, 0, 1, 2]) * un([10, 20, 50]);
    const lieu = un(["un pré", "un enclos", "un parc", "un champ", "un potager", "un poulailler"]);
    return {
      text: `${p.txt} a ${lg(dispo, "m")} de fil. ${cap(p.il)} veut clôturer ${carreAccorde(lieu)} de ${lg(c, "m")} de côté, avec ${k} rangées de fil. ${un([`A-t-${p.il} assez de fil ?`, "Est-ce assez ?", "Cela suffit-il ?"])}`,
      ...assez(dispo, besoin, [T, c * k, 2 * c * k], "m"),
      explanation: exp(
        "Le périmètre est la longueur d'un tour.",
        "Un tour (le côté fois 4), puis fois le nombre de rangées, et on compare.",
        `Un tour : ${c} × 4 = ${T}. ${k} rangées : ${T} × ${k} = ${fr(besoin)}. ${dispo === besoin ? "C'est exactement ce qu'il a." : dispo > besoin ? `${fr(dispo)} − ${fr(besoin)} = ${fr(dispo - besoin)}.` : `${fr(besoin)} − ${fr(dispo)} = ${fr(besoin - dispo)}.`}`,
        dispo === besoin ? "C'est juste assez, il ne reste rien." : dispo > besoin ? `C'est assez : il en reste ${lg(dispo - besoin, "m")}.` : `Ce n'est pas assez : il en manque ${lg(besoin - dispo, "m")}.`,
      ),
      canvas: dessinCarre(c, "m"),
    };
  }),

  // ★4 — le rectangle dont on connaît le tour et la longueur
  DEFI("006_rectangle_cote_manquant", 4, "Le périmètre ÷ 2 donne la moitié du tour : longueur + largeur.", () => {
    const s = un(RECT_SIT);
    const [L, l] = dimensions(s.min, s.max);
    const P = 2 * (L + l);
    const p = perso(s.metier);
    const debut = Math.random() < 0.35
      ? `Un rectangle a un périmètre de ${lg(P, s.u)}. Sa longueur mesure ${lg(L, s.u)}.`
      : `${p.txt} a utilisé ${lg(P, s.u)} ${de(s.fil)} pour faire le tour d'${s.objet} rectangulaire. ${cap(le(s.objet))} mesure ${lg(L, s.u)} de long.`;
    return {
      text: `${debut} ${un(["Combien mesure la largeur ?", "Quelle est sa largeur ?", "Et la largeur ?"])}`,
      ...qcmN(l, [P - L, P / 2, P - 2 * L, P / 4, (P - L) / 2].filter((x) => Number.isInteger(x)), s.u),
      explanation: exp(
        "Le périmètre d'un rectangle : (longueur + largeur) × 2.",
        "La moitié du tour, c'est longueur + largeur. On enlève ensuite la longueur.",
        `${P} ÷ 2 = ${L + l} : la moitié du tour. ${L + l} − ${L} = ${l}.`,
        `La largeur mesure ${lg(l, s.u)}.`,
      ),
      canvas: dessinRect(L, l, s.u, false, 1),
    };
  }),

  // ★4 — le triangle à deux côtés égaux, dont on connaît le tour et la base
  DEFI("015_isocele_inverse", 4, "Enlève la base du périmètre, puis partage le reste en 2 côtés égaux.", () => {
    const s = un(TRI_SIT);
    const [a, b] = cotesTriangle(s.min, s.max, "isocele");
    const P = a + 2 * b;
    const p = perso(s.metier);
    const debut = Math.random() < 0.35
      ? `Un triangle a deux côtés égaux. Son périmètre est ${lg(P, s.u)} et son troisième côté mesure ${lg(a, s.u)}.`
      : `${p.txt} a ${lg(P, s.u)} ${de(s.fil)} : juste de quoi faire le tour d'${s.objet} triangulaire aux deux côtés égaux. Le troisième côté mesure ${lg(a, s.u)}.`;
    return {
      text: `${debut} ${un(["Combien mesure chacun des deux côtés égaux ?", "Quelle est la longueur de chaque côté égal ?"])}`,
      ...qcmN(b, [P - a, (P + a) / 2, P / 3, P - 2 * a, P / 2].filter((x) => Number.isInteger(x)), s.u),
      explanation: exp(
        "Le périmètre est la somme des 3 côtés.",
        "On enlève le côté connu, puis on partage le reste entre les 2 côtés égaux.",
        `${P} − ${a} = ${2 * b}. ${2 * b} ÷ 2 = ${b}.`,
        `Chaque côté égal mesure ${lg(b, s.u)}.`,
      ),
      canvas: dessinTri([a, b, b], s.u, { codes: [0, 1, 1] }),
    };
  }),

  // ★4 — la figure en L : deux côtés à retrouver
  DEFI("005_figure_en_l", 4, "Retrouve les deux côtés cachés avec les grands côtés, puis fais le tour.", () => {
    const s = un(RECT_SIT.filter((x) => x.u === "m"));
    const p = perso(s.metier);
    const W = entre(8, 20);
    const H = entre(6, Math.min(15, W));
    const a = entre(2, W - 3);
    const b = entre(2, H - 3);
    const cotes = [W, H - b, a, b, W - a, H];
    const P = 2 * (W + H);
    const montres = [W, H - b, W - a, H];
    const textes = [lg(W, "m"), lg(H - b, "m"), null, null, lg(W - a, "m"), lg(H, "m")];
    return {
      text: `${p.txt} ${s.geste} d'${s.objet} en forme de L. ${un(["Deux côtés ne sont pas écrits.", "Il manque la longueur de deux côtés.", "Deux longueurs sont cachées."])} ${un(QFIL(s))}`,
      ...qcmN(P, [somme(montres), W * H, P - a, P - b, P + a], "m"),
      explanation: exp(
        "Le périmètre est la somme de tous les côtés : ici, 6 côtés.",
        "On retrouve les côtés cachés avec les grands côtés, puis on fait le tour.",
        `Côtés cachés : ${W} − ${W - a} = ${a} et ${H} − ${H - b} = ${b}. Tour : ${cotes.join(" + ")} = ${P}.`,
        `Il faut ${lg(P, "m")} ${de(s.fil)}.`,
      ),
      canvas: construction([morceau(ptsEnL(W, H, a, b), textes, { droits: true })], "Une figure en L dont quatre côtés sont écrits"),
    };
  }),

  // ★4 — deux figures sur quadrillage : un coin enlevé ne change pas le tour
  DEFI("004_meme_perimetre", 4, "Compte le bord de chaque figure : enlever un coin ne change pas toujours le tour.", () => {
    const w = entre(3, 5);
    const h = entre(2, 4);
    const A = rect(h, w);
    const cas = un([
      { B: sans(A, [0, w - 1]), dit: "On a enlevé un coin" },
      { B: sans(A, [0, entre(1, w - 2)]), dit: "On a enlevé un carreau au milieu du bord du haut" },
      { B: [...rect(h, w, 1, 0), [0, entre(0, w - 1)] as Case], dit: "On a ajouté un carreau sur le bord du haut" },
      { B: sans(A, [h - 1, 0]), dit: "On a enlevé un coin" },
    ]);
    const B = normaliser(cas.B);
    const pa = contour(A);
    const pb = contour(B);
    if (Math.random() < 0.5) {
      const juste = pa === pb ? "oui, elles ont le même périmètre" : pa > pb ? "non, celle de gauche a le plus grand périmètre" : "non, celle de droite a le plus grand périmètre";
      return {
        text: `${un(UN_CARREAU())} ${cas.dit} au rectangle de gauche pour obtenir la figure de droite. ${un(["Ont-elles le même périmètre ?", "Leurs périmètres sont-ils égaux ?"])}`,
        ...qcm(juste, ["oui, elles ont le même périmètre", "non, celle de gauche a le plus grand périmètre", "non, celle de droite a le plus grand périmètre"]),
        explanation: exp(
          "Le périmètre est la longueur du tour, pas le nombre de carreaux.",
          "On compte les côtés de carreaux du bord de chaque figure.",
          `À gauche : ${pa} cm. À droite : ${pb} cm.${pa === pb ? " Le coin enlevé retire 2 bouts de bord, mais en fait apparaître 2 autres." : ""}`,
          `${cap(juste)}.`,
        ),
        canvas: quadrillage([A, B]),
      };
    }
    return {
      text: `${un(UN_CARREAU())} ${cas.dit} au rectangle de gauche pour obtenir la figure de droite. ${un(["Quel est le périmètre de la figure de droite ?", "Combien mesure le tour de la figure de droite ?"])}`,
      ...qcmN(pb, [pa === pb ? pb - 2 : pa, B.length, pb + 2, pb - 1], "cm"),
      explanation: exp(
        "Le périmètre est la longueur du tour.",
        "On compte les côtés de carreaux du bord de la figure de droite.",
        `Le rectangle de gauche a un tour de ${pa} cm ; la figure de droite, ${pb} cm.`,
        `Le périmètre est ${pb} cm.`,
      ),
      canvas: quadrillage([A, B]),
    };
  }),
];

export const perimetresBank: TutorBankItemV4[] = [...comprendreItems, ...triangleItems, ...quadrilatereItems, ...polygoneItems, ...defiItems];
