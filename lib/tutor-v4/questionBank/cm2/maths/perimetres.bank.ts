// lib/tutor-v4/questionBank/cm2/maths/perimetres.bank.ts
//
// Le PÉRIMÈTRE du CM2 : cinq micros, cinq vidéos (paysage + short) tournées le
// 14/11/2026 (manim/scripts/cm2/perimetre_*.py, voix manim/voix/cm2-perimetre-*.json) :
//   - perimetre_comprendre (ceinture jaune) Noah, régisseur : le ruban lumineux
//     fait le TOUR de la scène, le tapis couvre le DEDANS ; m, cm, km ; deux
//     figures différentes, même périmètre ; short : 20 allumettes, deux enclos ;
//   - perimetre_triangle (verte) Maëlle, voilière : « on additionne en alignant
//     les virgules » ; 3 côtés égaux : le côté fois 3 ; le piège des unités
//     (« on convertit d'abord ») ; short : le cerf-volant 60 cm, 60 cm, 1 m ;
//   - perimetre_quadrilatere (verte) Rayan, jardinier de stade : « une longueur
//     plus une largeur, c'est la moitié du tour, on double » ; carré : le côté
//     fois 4 ; short : 2 tours du terrain de basket ;
//   - perimetre_polygone (verte) Inaya, créatrice de bijoux : « on coche chaque
//     côté » ; côtés égaux : un côté fois le nombre de côtés ; quadrillage : on
//     ne compte que le bord ; combien de pendentifs avec la bobine ; short : le
//     train de biscuits ;
//   - perimetre_defi (bleue) Malo, technicien en robotique : les rouleaux de
//     fil, la largeur cachée (« la moitié du tour, puis on enlève la longueur »),
//     le carré (÷ 4), ce qu'il reste à acheter ; short : 36 m de grillage.
//
// ⭐ 15/11/2026 — GÉNÉRATEURS ET DESSINS, sur le modèle du CM1 (commit 73091243).
// Avant : 6 à 10 squelettes par micro, 13 à 18 répétitions sur 20, 0 à 32 % de
// dessins, 20-33 % de Réunion. Chaque gabarit tire une SITUATION (métiers,
// sport, cuisine, jardin, fête…) × une TOURNURE × des nombres (décimaux au
// dixième, grands nombres, conversions m ↔ cm), et pose presque toujours sa
// figure À L'ÉCHELLE (`construction`) ou sur quadrillage (`figure_libre`).
// ⛔ Le dessin porte les DONNÉES, jamais la réponse.
// ⛔ L'unité partout : dans l'énoncé et dans chaque choix (« 24,5 cm »).
// ⛔ CM2 = zéro clavier (index.ts → applyMathsKeyboardFree) : que des QCM, des
// leurres = vraies erreurs d'élève (un côté oublié, la moitié du tour, l'aire
// L × l, l'unité non convertie, un côté compté deux fois, les traits du dedans).
// ⛔ Division : « ÷ ». Nombres : virgule française (fr), jamais « 3.5 ».

import type { DifficultyLevel, TutorBankItemV4, TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import type { ConstructionCanvasData, FigureLibreCanvasData } from "@/lib/tutor-v4/types_canvas";
import { cap, entre, fr, melange, net, un } from "./trous-outils";

type Gen = TutorGeneratedQuestionV4;
type U = "cm" | "m";

function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return `Définition : ${definition}

Méthode : ${methode}

Calcul : ${calcul}

Conclusion : ${conclusion}`;
}

const f = (n: number) => fr(net(n));
const somme = (l: readonly number[]) => net(l.reduce((a, b) => a + b, 0));
const lg = (v: number, u: string) => `${f(v)} ${u}`;
const liste = (l: readonly string[]) => (l.length < 2 ? l.join("") : `${l.slice(0, -1).join(", ")} et ${l[l.length - 1]}`);
const motU = (u: string) => (u === "cm" ? "centimètres" : u === "m" ? "mètres" : u);
/** « 3,5 + 2,5 + 4 ». */
const plus = (l: readonly number[]) => l.map(f).join(" + ");

/* ───────────────────────── Les QCM ───────────────────────── */

type Qcm = Pick<Gen, "format" | "choices" | "expected" | "comparator">;

/** QCM à propositions écrites : jamais deux fois la même, toujours la bonne, 4 au plus. */
function qcm(juste: string, faux: readonly string[]): Qcm {
  const d = melange([...new Set(faux)].filter((x) => x !== juste)).slice(0, 3);
  return { format: "qcm", choices: melange([juste, ...d]), expected: [juste], comparator: "mcq_exact" };
}

/** QCM de longueurs : leurres distincts en VALEUR, positifs, complétés par des voisins s'il en manque. */
function qcmN(juste: number, faux: readonly number[], u: string, pas?: number): Qcm {
  const j = net(juste);
  const p = pas ?? (Number.isInteger(j) ? (j >= 200 ? 10 : 1) : 0.5);
  const vals: number[] = [];
  for (const v of melange(faux.map(net))) if (v > 0 && v !== j && Number.isInteger(net(v * 100)) && !vals.includes(v)) vals.push(v);
  for (let k = 1; vals.length < 3 && k < 30; k++) {
    for (const v of [net(j + k * p), net(j - k * p)]) if (v > 0 && v !== j && !vals.includes(v) && vals.length < 3) vals.push(v);
  }
  return qcm(lg(j, u), vals.slice(0, 3).map((v) => lg(v, u)));
}

/** « Est-ce assez ? » : la bonne phrase, et les phrases des erreurs. */
function assez(dispo: number, besoin: number, besoinFaux: number[], u: string): Qcm {
  const phrase = (d: number) => {
    const x = net(d);
    return x === 0 ? "oui, c'est juste assez" : x > 0 ? `oui, il en reste ${lg(x, u)}` : `non, il en manque ${lg(-x, u)}`;
  };
  const d = net(dispo - besoin);
  const k = Math.abs(d) || 10;
  return qcm(phrase(d), [...besoinFaux.map((b) => phrase(dispo - b)), phrase(-d || k), phrase(d === 0 ? -k : 0), phrase(d === 0 ? k : -d)]);
}

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

const NOMS_F = ["Maëlle", "Inaya", "Zoé", "Lou", "Inès", "Jade", "Maya", "Lina", "Emma", "Léa", "Sarah", "Chloé", "Aya", "Rose", "Anaïs", "Nour"];
const NOMS_M = ["Noah", "Rayan", "Malo", "Téo", "Ravi", "Sacha", "Amir", "Tom", "Yanis", "Noé", "Lucas", "Karim", "Hugo", "Bilal", "Jules", "Adam"];
type Perso = { nom: string; il: "il" | "elle"; txt: string };
/** Un prénom, et parfois son métier : « Maëlle, voilière, ». */
function perso(metier?: readonly [string, string]): Perso {
  const fe = Math.random() < 0.5;
  const nom = un(fe ? NOMS_F : NOMS_M);
  const m = metier ? (fe ? metier[0] : metier[1]) : "";
  return { nom, il: fe ? "elle" : "il", txt: m && Math.random() < 0.75 ? `${nom}, ${m},` : nom };
}

/** Une situation : ce qu'on entoure, avec quoi, qui, et la plage des côtés. */
type Sit = { objet: string; geste: string; fil: string; metier: readonly [string, string]; u: U; min: number; max: number };
const S = (objet: string, geste: string, fil: string, metier: readonly [string, string], u: U, min: number, max: number): Sit => ({ objet, geste, fil, metier, u, min, max });
/** « Maëlle, voilière, coud une bande solide autour d'une voile triangulaire. » */
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
/** Une longueur au dixième (souvent « ,5 ») entre min et max (min ≥ 1). */
function tireD(min: number, max: number): number {
  const r = Math.random();
  const a = Math.ceil(min);
  const b = Math.max(a + 1, Math.floor(max));
  if (r < 0.25) return entre(a, b);
  if (r < 0.7) return net(entre(a, b - 1) + 0.5);
  return net(entre(a * 10, b * 10) / 10);
}
/** La longueur d'une situation : au dixième pour les petits mètres, ronde sinon. */
const longueurSit = (s: Sit) => (s.u === "m" && s.max <= 40 && Math.random() < 0.6 ? tireD(s.min, s.max) : tire(s.min, s.max, pasDe(s.min)));

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
/** Trois côtés [base, droite, gauche] qui forment un vrai triangle ; isocèle : les deux derniers égaux. `deci` : au dixième. */
function cotesTriangle(min: number, max: number, sorte: SorteTri, o: { pas?: number; deci?: boolean } = {}): [number, number, number] {
  const pas = o.pas ?? pasDe(min);
  const t = () => (o.deci ? tireD(min, max) : tire(min, max, pas));
  for (let k = 0; k < 300; k++) {
    const a = t();
    let b = t();
    let c = t();
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

function dessinTriTextes(cotes: readonly number[], textes: (string | null)[], codes?: number[]): ConstructionCanvasData {
  const [a, b, c] = cotes;
  const pts = ptsTriangle(a, b, c) ?? ptsTriangle(a, a, a)!;
  return construction([morceau(pts, textes, { codes })], "Un triangle dont les côtés sont écrits");
}
function dessinTri(cotes: readonly number[], u: string, o: { cache?: number; codes?: number[] } = {}): ConstructionCanvasData {
  return dessinTriTextes(cotes, cotes.map((v, i) => (i === o.cache ? "?" : lg(v, u))), o.codes);
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
/** Rectangle aux côtés écrits librement (unités différentes, « ? »). */
function dessinRectTextes(L: number, l: number, tL: string, tl: string): ConstructionCanvasData {
  return construction([morceau(ptsRectangle(L, l), [tL, tl, null, null], { droits: true, codes: [1, 2, 1, 2] })], "Un rectangle dont la longueur et la largeur sont écrites");
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

/** Un polygone quelconque à n côtés, aux côtés multiples de `pas` mesurés sur le dessin. */
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
    const cotes = d.map((x) => net(Math.round((x * k) / pas) * pas));
    if (cotes.every((c) => c >= 2 * pas) && new Set(cotes).size >= Math.min(n, 3)) return { pts, cotes };
  }
  const c = Math.max(pas, net(Math.round(moyenne / pas) * pas));
  return { pts: ptsRegulier(n, moyenne), cotes: Array(n).fill(c) };
}
/** Un polygone coté ; `deci` : côtés au demi (2,5 ; 3 ; 3,5…), comme dans la vidéo. */
function polyCote(n: number, moyenne: number, u: string, o: { pas?: number; deci?: boolean } = {}) {
  const pas = o.deci ? 0.5 : (o.pas ?? 1);
  const { pts, cotes } = polygoneAuHasard(n, o.deci ? Math.max(moyenne, 2) : moyenne, pas);
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

/** Une figure d'un seul tenant : coin retiré, bosse, creux, L ou marche. */
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
    `Un carreau mesure ${lg(k, u)} de côté.`,
    `Le côté d'un carreau mesure ${lg(k, u)}.`,
    `Chaque côté de carreau fait ${lg(k, u)}.`,
    `Chaque petit carreau a des côtés de ${lg(k, u)}.`,
  ];

/* ───────────────────────── Les fabricants ───────────────────────── */

const atelierP =
  (micro: string) =>
  (suffixe: string, difficulty: DifficultyLevel, hint: string, generate: () => Gen): TutorBankItemV4 => ({
    kind: "template",
    id: `cm2_perimetre_${micro}_tpl_${suffixe}`,
    niveau: "cm2",
    matiere: "maths",
    notionId: "perimetre",
    microId: `perimetre_${micro}`,
    difficulty,
    theme: "neutral",
    hint,
    tags: ["cm2", "perimetre", micro, "template"],
    generate,
  });

type Fixe = Omit<Extract<TutorBankItemV4, { kind: "fixed" }>, "kind" | "niveau" | "matiere" | "notionId" | "format" | "comparator">;
const fixe = (x: Fixe): TutorBankItemV4 => ({ kind: "fixed", niveau: "cm2", matiere: "maths", notionId: "perimetre", format: "qcm", comparator: "mcq_exact", ...x });

/** Leurres d'une somme de côtés : un côté oublié, un côté compté deux fois, une retenue oubliée. */
const leurresSomme = (cotes: readonly number[], pas = 1) => {
  const P = somme(cotes);
  return [P - Math.min(...cotes), P - cotes[cotes.length - 1], P + cotes[0], P + 10 * pas, P - 10 * pas, P + 1, P - 1];
};

/* =========================================================
   PERIMETRE_COMPRENDRE — Noah, régisseur : le ruban fait le tour, le tapis couvre le dedans
========================================================= */
const COMP = atelierP("comprendre");

const ACTIONS_TOUR: readonly (readonly [string, readonly [string, string]])[] = [
  ["poser un ruban lumineux autour d'une scène", ["régisseuse", "régisseur"]],
  ["poser une clôture autour d'un champ", ["agricultrice", "agriculteur"]],
  ["coudre un galon autour d'un coussin", ["couturière", "couturier"]],
  ["poser une baguette autour d'un tableau", ["encadreuse", "encadreur"]],
  ["poser des plinthes le long des murs d'une chambre", ["peintre", "peintre"]],
  ["enterrer un fil autour d'une pelouse pour un robot tondeuse", ["technicienne", "technicien"]],
  ["tracer la ligne blanche autour d'un terrain de foot", ["jardinière de stade", "jardinier de stade"]],
  ["poser du grillage autour d'un poulailler", ["éleveuse", "éleveur"]],
  ["entourer un pendentif d'un fil d'argent", ["créatrice de bijoux", "créateur de bijoux"]],
  ["poser une margelle autour d'une piscine", ["maçonne", "maçon"]],
  ["faire le tour d'un stade en courant", ["athlète", "athlète"]],
  ["coudre une bande solide autour d'une voile", ["voilière", "voilier"]],
  ["coudre de la dentelle autour d'une nappe", ["couturière", "couturier"]],
  ["tendre une corde autour d'une piste de cirque", ["artiste de cirque", "artiste de cirque"]],
  ["poser un joint autour d'une fenêtre", ["vitrière", "vitrier"]],
  ["monter une barrière autour d'un enclos à chevaux", ["éleveuse", "éleveur"]],
  ["poser une bordure autour d'un bac à sable", ["paysagiste", "paysagiste"]],
  ["coller une frise autour d'une affiche", ["graphiste", "graphiste"]],
  ["poser un ruban de chocolat autour d'un gâteau", ["pâtissière", "pâtissier"]],
  ["poser une clôture autour d'un champ de cannes", ["planteuse", "planteur"]],
  ["poser des guirlandes autour d'un stand", ["décoratrice", "décorateur"]],
];
const ACTIONS_DEDANS: readonly (readonly [string, readonly [string, string]])[] = [
  ["poser un tapis noir sur tout le sol d'une scène", ["régisseuse", "régisseur"]],
  ["peindre tout un mur", ["peintre", "peintre"]],
  ["carreler tout le sol d'une cuisine", ["carreleuse", "carreleur"]],
  ["semer du gazon sur tout un jardin", ["jardinière", "jardinier"]],
  ["couvrir toute une table avec une nappe", ["cuisinière", "cuisinier"]],
  ["mettre de la moquette dans toute une chambre", ["décoratrice", "décorateur"]],
  ["poser du parquet dans tout un salon", ["menuisière", "menuisier"]],
  ["étaler du chocolat sur tout le dessus d'un gâteau", ["pâtissière", "pâtissier"]],
  ["coller du papier peint sur tout un mur", ["décoratrice", "décorateur"]],
  ["poser des dalles sur toute une terrasse", ["maçonne", "maçon"]],
  ["couvrir un toit de tuiles", ["couvreuse", "couvreur"]],
  ["tondre toute une pelouse", ["jardinière", "jardinier"]],
  ["vernir tout le dessus d'une table", ["menuisière", "menuisier"]],
  ["recouvrir un terrain de sable", ["paysagiste", "paysagiste"]],
  ["poser des panneaux solaires sur tout un toit", ["électricienne", "électricien"]],
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
      "On se demande si ce qu'on pose suit le BORD (périmètre) ou couvre le DEDANS (aire).",
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

/** Les objets rectangulaires courts, avec leur unité et leur plus grand côté. */
const RECT_COURTS: readonly (readonly [string, U, number])[] = [
  ["un rectangle", "cm", 25], ["un tableau", "cm", 90], ["un cadre", "cm", 30], ["une nappe", "cm", 200], ["un jardin", "m", 30], ["un potager", "m", 20],
  ["une affiche", "cm", 90], ["un tapis", "cm", 200], ["une cour", "m", 60], ["une carte postale", "cm", 15], ["un terrain", "m", 100], ["un enclos", "m", 40],
  ["un livre", "cm", 30], ["une piscine", "m", 25], ["une fenêtre", "cm", 140], ["un drapeau", "cm", 150], ["une scène", "m", 15], ["un terrain de handball", "m", 40],
];
/** Longueur et largeur d'un objet court : petits nombres (parfois au demi), ou dizaines pour les grands objets. */
function dimsCourt(max: number, plafond: number, deci = false): [number, number] {
  if (max <= 30) {
    const L = entre(4, Math.min(max, plafond));
    const l = entre(2, L - 1);
    if (deci && Math.random() < 0.5) return Math.random() < 0.5 ? [net(L + 0.5), l] : [L, net(l + 0.5)];
    return [L, l];
  }
  const L = tire(30, max, 10);
  return [L, tire(10, L - 10, 10)];
}
/** Le côté d'un carré court. */
const coteCourt = (max: number, plafond: number, deci = false) => {
  const c = max <= 30 ? entre(2, Math.min(max, plafond)) : tire(20, max, 10);
  return deci && max <= 30 && Math.random() < 0.5 ? net(c + 0.5) : c;
};

const comprendreItems: TutorBankItemV4[] = [
  fixe({
    id: "cm2_perimetre_comprendre_fixed_1_definition",
    microId: "perimetre_comprendre",
    difficulty: 1,
    theme: "neutral",
    text: "Le périmètre d'une figure correspond à…",
    choices: ["la longueur du contour de la figure", "la surface à l'intérieur de la figure", "le nombre de côtés de la figure", "la longueur de son plus grand côté"],
    expected: ["la longueur du contour de la figure"],
    hint: "Le périmètre, c'est le tour de la figure.",
    explanation: exp(
      "Le périmètre est la longueur du contour d'une figure.",
      "On imagine qu'on fait tout le tour de la figure.",
      "Ce qui est à l'intérieur, c'est l'aire : ça ne compte pas pour le périmètre.",
      "Le périmètre correspond à la longueur du contour.",
    ),
    tags: ["cm2", "perimetre", "comprendre", "definition", "qcm"],
  }),
  fixe({
    id: "cm2_perimetre_comprendre_fixed_2_unite",
    microId: "perimetre_comprendre",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle unité peut convenir pour exprimer un périmètre ?",
    choices: ["cm", "cm²", "L", "kg"],
    expected: ["cm"],
    hint: "Un périmètre est une longueur.",
    explanation: exp(
      "Un périmètre est une longueur.",
      "On utilise donc une unité de longueur.",
      "Le cm est une unité de longueur. Le cm² sert à mesurer une aire.",
      "Une unité possible pour un périmètre est le cm.",
    ),
    tags: ["cm2", "perimetre", "comprendre", "unite", "qcm"],
  }),
  fixe({
    id: "cm2_perimetre_comprendre_fixed_3_aire",
    microId: "perimetre_comprendre",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle phrase est correcte ?",
    choices: ["Le périmètre mesure le contour.", "Le périmètre mesure la surface intérieure.", "Le périmètre se mesure toujours en cm².", "Le périmètre est toujours égal à l'aire."],
    expected: ["Le périmètre mesure le contour."],
    hint: "Attention à ne pas confondre périmètre et aire.",
    explanation: exp(
      "Le périmètre et l'aire ne mesurent pas la même chose.",
      "Le périmètre mesure le contour ; l'aire mesure la surface intérieure.",
      "Quand on calcule le tour d'une figure, on calcule son périmètre.",
      "La phrase correcte est : le périmètre mesure le contour.",
    ),
    tags: ["cm2", "perimetre", "comprendre", "aire", "qcm"],
  }),
  fixe({
    id: "cm2_perimetre_comprendre_fixed_5_erreur_aire",
    microId: "perimetre_comprendre",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève dit : « Pour le périmètre d'un rectangle de 8 m sur 5 m, je fais 8 × 5 = 40 m. » A-t-il raison ?",
    choices: ["non : 8 × 5 donne l'aire ; le périmètre est 26 m", "oui, le périmètre est 40 m", "non : le périmètre est 8 + 5 = 13 m", "non : le périmètre est 8 × 4 = 32 m"],
    expected: ["non : 8 × 5 donne l'aire ; le périmètre est 26 m"],
    hint: "Longueur × largeur sert pour l'aire.",
    explanation: exp(
      "Le périmètre mesure le contour d'une figure.",
      "Pour un rectangle : la longueur plus la largeur, c'est la moitié du tour ; puis on double.",
      "8 + 5 = 13, et 13 × 2 = 26. Le calcul 8 × 5 = 40 donne l'aire (40 m²).",
      "L'élève a tort : le périmètre est 26 m.",
    ),
    tags: ["cm2", "perimetre", "comprendre", "erreur", "aire", "qcm"],
    canvas: dessinRect(8, 5, "m", false),
  }),
  fixe({
    id: "cm2_perimetre_comprendre_fixed_6_tour",
    microId: "perimetre_comprendre",
    difficulty: 1,
    theme: "neutral",
    text: "Faire le tour complet d'une figure permet de trouver son…",
    choices: ["périmètre", "aire", "volume", "poids"],
    expected: ["périmètre"],
    hint: "Le tour d'une figure, c'est son périmètre.",
    explanation: exp(
      "Le périmètre est la longueur du contour d'une figure.",
      "On suit le bord de la figure en faisant tout le tour.",
      "Faire le tour de la figure revient à mesurer son périmètre.",
      "On trouve donc son périmètre.",
    ),
    tags: ["cm2", "perimetre", "comprendre", "tour", "qcm"],
  }),
  fixe({
    id: "cm2_perimetre_comprendre_fixed_7_grillage",
    microId: "perimetre_comprendre",
    difficulty: 2,
    theme: "neutral",
    text: "Pour savoir quelle longueur de grillage il faut pour entourer un champ, on calcule son…",
    choices: ["périmètre", "aire", "volume", "contenance"],
    expected: ["périmètre"],
    hint: "Le grillage suit le bord du champ.",
    explanation: exp(
      "Le périmètre mesure la longueur du contour.",
      "Le grillage est posé tout autour du champ, le long de son bord.",
      "La longueur de grillage nécessaire correspond au périmètre du champ.",
      "On calcule donc son périmètre.",
    ),
    tags: ["cm2", "perimetre", "comprendre", "grillage", "qcm"],
  }),
  fixe({
    id: "cm2_perimetre_comprendre_fixed_9_unite_metre",
    microId: "perimetre_comprendre",
    difficulty: 3,
    theme: "neutral",
    text: "Parmi ces unités, laquelle peut exprimer un périmètre ?",
    choices: ["m", "m²", "L", "kg"],
    expected: ["m"],
    hint: "Un périmètre est une longueur.",
    explanation: exp(
      "Un périmètre est une longueur.",
      "On l'exprime donc avec une unité de longueur.",
      "Le mètre (m) est une unité de longueur ; le m² mesure une aire.",
      "Une unité possible pour un périmètre est le m.",
    ),
    tags: ["cm2", "perimetre", "comprendre", "unite", "qcm"],
  }),
  fixe({
    id: "cm2_perimetre_comprendre_fixed_10_addition_cotes",
    microId: "perimetre_comprendre",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle phrase est correcte ?",
    choices: [
      "Pour trouver le périmètre, on additionne les longueurs de tous les côtés.",
      "Pour trouver le périmètre, on multiplie deux côtés.",
      "Pour trouver le périmètre, on compte les carreaux à l'intérieur.",
      "Pour trouver le périmètre, on mesure un seul côté.",
    ],
    expected: ["Pour trouver le périmètre, on additionne les longueurs de tous les côtés."],
    hint: "Le périmètre, c'est tout le contour, donc tous les côtés.",
    explanation: exp(
      "Le périmètre est la longueur du contour d'une figure.",
      "On parcourt tout le bord, donc on prend en compte chaque côté.",
      "On additionne les longueurs de tous les côtés de la figure.",
      "La phrase correcte est : on additionne les longueurs de tous les côtés.",
    ),
    tags: ["cm2", "perimetre", "comprendre", "methode", "qcm"],
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
          "On suit le bord, tout autour, jusqu'au point de départ.",
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
  COMP("002_combien_de_cotes", 1, "Fais le tour et coche chaque côté.", () => {
    const n = entre(3, 9);
    const quoi = un(["cette figure", "cette étiquette", "ce badge", "ce panneau", "ce jardin", "ce tapis", "ce drapeau", "ce pendentif", "ce plateau", "cet enclos", "ce sticker", "cette broche", "cette scène"]);
    return {
      text: `${un(["", "Regarde bien.", "Observe le dessin.", "Compte bien."])} ${un([
        `Pour le périmètre de ${quoi}, combien de côtés faut-il additionner ?`,
        `Combien de côtés faut-il ajouter pour le tour de ${quoi} ?`,
        `Le périmètre de ${quoi} : combien de longueurs faut-il additionner ?`,
        `Pour faire le tour de ${quoi}, on additionne combien de côtés ?`,
      ])}`.trim(),
      ...qcm(`${n} côtés`, [n - 1, n + 1, n + 2, 4].filter((x) => x !== n && x > 2).map((x) => `${x} côtés`)),
      explanation: exp(
        "Le périmètre est la somme de TOUS les côtés.",
        "On fait le tour, et on coche chaque côté compté.",
        `La figure a ${n} côtés.`,
        `Il faut additionner ${n} côtés.`,
      ),
      canvas: construction([morceau(polygoneAuHasard(n, 5).pts, [])], `Une figure à ${n} côtés`),
    };
  }),

  // ★1 — l'unité d'un périmètre (une longueur) : cm, m ou km
  COMP("003_unite_longueur", 1, "Un périmètre est une LONGUEUR : cm, m ou km.", () => {
    const taille = un(["petit", "grand", "tres_grand"] as const);
    const o =
      taille === "grand"
        ? un(["un stade", "un champ", "une cour d'école", "un jardin", "un parc", "un terrain de basket", "une piscine", "un parking", "une scène", "un enclos"])
        : taille === "petit"
          ? un(["un cahier", "une carte postale", "un cadre photo", "une étiquette", "un livre", "un mouchoir", "un sous-verre", "une enveloppe", "un pendentif", "un ticket"])
          : un(["un lac", "une forêt", "une île", "une grande ville", "un parc naturel", "un circuit de vélo"]);
    const juste = taille === "grand" ? "en mètres (m)" : taille === "petit" ? "en centimètres (cm)" : "en kilomètres (km)";
    const faux =
      taille === "grand"
        ? ["en mètres carrés (m²)", "en kilogrammes (kg)", "en litres (L)", "en heures (h)"]
        : taille === "petit"
          ? ["en centimètres carrés (cm²)", "en grammes (g)", "en litres (L)", "en minutes (min)"]
          : ["en kilomètres carrés (km²)", "en tonnes (t)", "en litres (L)", "en heures (h)"];
    return {
      text: un([`Le tour ${du(o)} se mesure…`, `Dans quelle unité peut-on écrire le périmètre ${du(o)} ?`, `Quelle unité convient pour le tour ${du(o)} ?`, `On mesure le tour ${du(o)}. Quelle unité choisir ?`]),
      ...qcm(juste, faux),
      explanation: exp(
        "Le périmètre est une longueur : il se mesure en centimètres, en mètres, en kilomètres.",
        "Les unités « carrées » (cm², m², km²) servent pour les aires, pas pour le tour.",
        taille === "grand" ? `Le tour ${du(o)} se mesure en mètres.` : taille === "petit" ? `Le tour ${du(o)} est petit : on le mesure en centimètres.` : `Le tour ${du(o)} est très long : on le mesure en kilomètres.`,
        `On l'écrit ${juste.replace(" (", ", ").replace(")", "")}.`,
      ),
    };
  }),

  // ★2 — le tour ou le dedans ? (sans histoire)
  COMP("004_aire_ou_perimetre", 2, "Le bord, c'est le périmètre. Le dedans, c'est l'aire.", () => tourOuDedans(false)),

  // ★2 — quel calcul donne le périmètre ? (la figure cotée)
  COMP("005_quel_calcul", 2, "Le périmètre, c'est le tour : on ADDITIONNE tous les côtés, chacun une fois.", () => {
    const n = entre(3, 5);
    const u = un(["cm", "m"]);
    const { cotes, canvas } = polyCote(n, entre(4, 9), u, { deci: Math.random() < 0.4 });
    const ecr = (l: number[], op: string) => l.map((c) => lg(c, u)).join(` ${op} `);
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
        `Il y a ${n} côtés : ${juste} = ${lg(somme(cotes), u)}.`,
        `Le bon calcul est ${juste}.`,
      ),
      canvas,
    };
  }),

  // ★2 — sur quadrillage : on compte le bord, pas les carreaux du dedans
  COMP("006_quadrillage_bord", 2, "Sur un quadrillage, le tour se compte en côtés de carreaux, sur le BORD.", () => {
    const cases = polyomino(5, 3);
    const P = contour(cases);
    const A = cases.length;
    if (Math.random() < 0.4) {
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

  // ★2 — l'erreur « longueur × largeur » (le piège de la vidéo : la scène de 8 m sur 5 m)
  COMP("007_erreur_longueur_largeur", 2, "Longueur × largeur sert à calculer une AIRE, pas un périmètre.", () => {
    const [o, u, max] = un(RECT_COURTS);
    const [L, l] = dimsCourt(max, 12);
    const p = perso();
    return {
      text: `${p.nom} dit : « Le périmètre de ${ce(o)}, c'est ${f(L)} × ${f(l)} = ${lg(L * l, u)}. » ${un([`A-t-${p.il} raison ?`, "Qu'en penses-tu ?", "Est-ce juste ?", `${cap(p.il)} a raison ?`])}`,
      ...qcm(`non : ${f(L)} × ${f(l)} donne l'aire, pas le tour`, ["oui, c'est bien le périmètre", `non : il faut faire ${f(L)} + ${f(l)}`, `non : il faut faire ${f(L)} × 4`]),
      explanation: exp(
        "Le périmètre est la longueur du tour ; l'aire est la surface du dedans.",
        "Pour le tour d'un rectangle : une longueur plus une largeur, c'est la moitié du tour ; on double.",
        `${f(L)} × ${f(l)} = ${f(L * l)} : c'est l'aire. Le tour : ${f(L)} + ${f(l)} = ${f(L + l)}, puis ${f(L + l)} × 2 = ${lg(2 * (L + l), u)}.`,
        `Non : le périmètre est ${lg(2 * (L + l), u)}.`,
      ),
      canvas: dessinRect(L, l, u, false),
    };
  }),

  // ★2 — laquelle de ces mesures peut être un périmètre ?
  COMP("013_quelle_mesure", 2, "Un périmètre s'écrit avec une unité de LONGUEUR (cm, m, km).", () => {
    const [o, u, max] = un(RECT_COURTS);
    const [L, l] = dimsCourt(max, 12);
    const P = net(2 * (L + l));
    const A = net(L * l);
    const juste = lg(P, u);
    return {
      text: `${un([`Voici ${o}.`, `Regarde ${ce(o)}.`, `Observe ${ce(o)}.`])} ${un([
        "Laquelle de ces mesures peut être son périmètre ?",
        "Quelle mesure peut être la longueur de son tour ?",
        "Choisis la mesure qui peut être son périmètre.",
        "Son périmètre peut s'écrire…",
      ])}`,
      ...qcm(juste, [`${f(A)} ${u}²`, `${f(P)} ${u}²`, `${f(P)} L`, `${f(P)} kg`]),
      explanation: exp(
        "Le périmètre est une longueur : il s'écrit en cm, en m ou en km.",
        "Les unités « carrées » sont pour les aires ; les litres et les kilos ne mesurent pas des longueurs.",
        `Le tour : ${f(L)} + ${f(l)} = ${f(L + l)}, on double : ${f(P)}.`,
        `Le périmètre peut s'écrire ${juste}.`,
      ),
      canvas: dessinRect(L, l, u, false),
    };
  }),

  // ★3 — le tour ou le dedans, avec une histoire
  COMP("008_histoire_tour_dedans", 3, "Ce qui suit le bord : périmètre. Ce qui couvre le dedans : aire.", () => tourOuDedans(true)),

  // ★3 — la ficelle garde sa longueur, quelle que soit la forme
  COMP("009_ficelle", 3, "On ne coupe pas la ficelle : sa longueur ne change pas.", () => {
    const n = entre(3, 5);
    const { cotes, canvas } = polyCote(n, entre(4, 9), "cm", { deci: Math.random() < 0.5 });
    const P = somme(cotes);
    const fil = un(["une ficelle", "un ruban", "un fil de laine", "une cordelette", "une guirlande", "un lacet", "un élastique", "un fil d'argent"]);
    const leFil = fil.replace(/^une /, "la ").replace(/^un /, "le ").replace(/^(la|le) ([aeiouéè])/, "l'$2");
    const forme = un(["un carré", "un rectangle", "un rond", "un triangle", "une étoile"].filter((x) => x !== `un ${nomPoly(n)}`));
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
        `${plus(cotes)} = ${f(P)}. Le fil mesure ${lg(P, "cm")}, et il fait tout le tour de la nouvelle forme.`,
        `Le périmètre est toujours ${lg(P, "cm")}.`,
      ),
      canvas,
    };
  }),

  // ★3 — même aire, périmètres différents
  COMP("010_meme_aire_autre_tour", 3, "Compte le BORD de chaque figure, pas ses carreaux.", () => {
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

  // ★3 — la vidéo : la grande scène (8 m sur 5 m) et la scène carrée (6,5 m) ont le même tour
  COMP("011_rectangle_et_carre", 3, "Calcule le tour de chaque figure, puis compare : deux figures différentes peuvent avoir le même périmètre.", () => {
    const quoi = un([
      ["Deux figures", "le rectangle", "le carré", un(["cm", "m"] as const)],
      ["Deux scènes", "la scène rectangulaire", "la scène carrée", "m"],
      ["Deux enclos", "l'enclos rectangulaire", "l'enclos carré", "m"],
      ["Deux jardins", "le jardin rectangulaire", "le jardin carré", "m"],
      ["Deux tapis", "le tapis rectangulaire", "le tapis carré", "dm"],
      ["Deux nappes", "la nappe rectangulaire", "la nappe carrée", "dm"],
      ["Deux cadres", "le cadre rectangulaire", "le cadre carré", "cm"],
      ["Deux potagers", "le potager rectangulaire", "le potager carré", "m"],
      ["Deux étiquettes", "l'étiquette rectangulaire", "l'étiquette carrée", "cm"],
    ] as const);
    const u = quoi[3];
    const L = entre(6, 14);
    const l = entre(2, L - 2);
    const demi = net((L + l) / 2);
    const c = un([demi, demi, net(demi + un([-1, 1, -0.5, 0.5]))]);
    const Pr = 2 * (L + l);
    const Pc = net(4 * c);
    const juste = Pr === Pc ? "les deux ont le même périmètre" : Pr > Pc ? `${quoi[1]} a le plus grand périmètre` : `${quoi[2]} a le plus grand périmètre`;
    const rectM = morceau(ptsRectangle(L, l), [lg(L, u), lg(l, u), null, null], { droits: true, codes: [1, 2, 1, 2], prefixe: "r" });
    const carM = morceau(ptsRectangle(c, c), [lg(c, u), null, null, null], { droits: true, codes: [3, 3, 3, 3], prefixe: "c", dx: L + Math.max(L, c) * 0.35 });
    return {
      text: `${quoi[0]} : ${quoi[1]} mesure ${lg(L, u)} sur ${lg(l, u)}, ${quoi[2]} a ${lg(c, u)} de côté. ${un(["Que peut-on dire de leurs périmètres ?", "Lequel a le plus grand tour ?", "Compare leurs périmètres.", "Lequel faut-il entourer avec le plus long ruban ?"])}`,
      ...qcm(juste, ["les deux ont le même périmètre", `${quoi[1]} a le plus grand périmètre`, `${quoi[2]} a le plus grand périmètre`, "on ne peut pas comparer des formes différentes"]),
      explanation: exp(
        "Le périmètre est la longueur du tour. Deux figures différentes peuvent avoir le même périmètre.",
        "Rectangle : la longueur plus la largeur, on double. Carré : le côté fois 4.",
        `Rectangle : ${f(L)} + ${f(l)} = ${f(L + l)}, × 2 = ${lg(Pr, u)}. Carré : ${f(c)} × 4 = ${lg(Pc, u)}.`,
        `${cap(juste)}.`,
      ),
      canvas: construction([rectM, carM], "Un rectangle et un carré, côtés écrits", 320),
    };
  }),

  // ★3 — le défi de la vidéo : un rouleau de 25 m pour une scène de 10 m sur 4 m, est-ce assez ?
  COMP("012_est_ce_assez", 3, "Calcule le tour, puis compare avec la longueur que tu as.", () => {
    const [a, metier] = un(ACTIONS_TOUR.filter((x) => /autour d'une? (scène|champ|coussin|tableau|nappe|poulailler|piscine|bac|affiche|stand|enclos)/.test(x[0])));
    const p = perso(metier);
    const u: U = /coussin|tableau|nappe|affiche/.test(a) ? "cm" : "m";
    const [L, l] = u === "cm" ? [tire(40, 150, 10), tire(20, 60, 5)] : [tireD(6, 20), entre(3, 6)];
    const P = net(2 * (L + l));
    const pas = u === "cm" ? 10 : 1;
    const dispo = Math.max(pas, net(Math.round(P / pas) * pas + un([-3, -2, -1, 1, 2, 3]) * pas));
    const quoi = a.replace(/^.*autour d'/, "").replace(/^(une?) /, "$1 ");
    return {
      text: `${p.txt} veut ${a}. ${cap(le(quoi))} est un rectangle de ${lg(L, u)} sur ${lg(l, u)}. ${cap(p.il)} a ${lg(dispo, u)} en tout. ${un(["Est-ce assez ?", "Cela suffit-il ?", `A-t-${p.il} assez ?`, "Est-ce suffisant ?"])}`,
      ...assez(dispo, P, [net(L + l), net(L * l)], u),
      explanation: exp(
        "Ce qui fait le tour se mesure avec le périmètre.",
        "La longueur plus la largeur, c'est la moitié du tour ; on double, puis on compare.",
        `${f(L)} + ${f(l)} = ${f(L + l)}, × 2 = ${f(P)}. ${dispo >= P ? `${f(dispo)} − ${f(P)} = ${f(dispo - P)}.` : `${f(P)} − ${f(dispo)} = ${f(P - dispo)}.`}`,
        dispo === P ? "C'est juste assez." : dispo > P ? `C'est assez : il en reste ${lg(dispo - P, u)}.` : `Ce n'est pas assez : il en manque ${lg(P - dispo, u)}.`,
      ),
      canvas: dessinRect(L, l, u, false),
    };
  }),
];

/* =========================================================
   PERIMETRE_TRIANGLE — Maëlle, voilière : les 3 côtés, en alignant les virgules
========================================================= */
const TRI = atelierP("triangle");

const TRI_SIT: readonly Sit[] = [
  S("une voile de bateau", "coud une bande solide tout autour", "bande", ["voilière", "voilier"], "m", 2, 9),
  S("un fanion", "coud un galon doré autour", "galon", ["décoratrice", "décorateur"], "cm", 10, 40),
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
  S("un cerf-volant", "colle des lumières autour", "guirlande lumineuse", ["créatrice de jouets", "créateur de jouets"], "cm", 30, 80),
  S("un champ", "pose du grillage autour", "grillage", ["agricultrice", "agriculteur"], "m", 20, 90),
  S("une piste de course", "tend une corde autour", "corde", ["entraîneuse", "entraîneur"], "m", 20, 60),
  S("un bac à sable", "pose une bordure en bois autour", "bordure", ["paysagiste", "paysagiste"], "cm", 80, 200),
  S("un pendentif", "entoure d'un fil d'argent le bord", "fil d'argent", ["créatrice de bijoux", "créateur de bijoux"], "cm", 2, 6),
  S("un poster", "colle un ruban adhésif autour", "ruban adhésif", ["graphiste", "graphiste"], "cm", 30, 70),
  S("une tente", "coud une bande réfléchissante autour", "bande réfléchissante", ["campeuse", "campeur"], "m", 1, 4),
  S("une rampe de skate", "colle une bande antidérapante autour", "bande antidérapante", ["skateuse", "skateur"], "m", 1, 5),
  S("un champ de cannes", "pose une clôture autour", "clôture", ["planteuse", "planteur"], "m", 20, 80),
];
/** Les situations dont le geste se lit « … autour d'un X » (le pendentif se dit autrement). */
const TRI_SIT_AUTOUR = TRI_SIT.filter((s) => / autour$/.test(s.geste));
/** Les objets en triangle, en phrase courte (★1-★2). */
const TRI_COURTS: readonly (readonly [string, U | null])[] = [
  ["un triangle", null], ["un fanion", "cm"], ["un badge", "cm"], ["une étiquette", "cm"], ["une voile", "m"], ["un jardin", "m"],
  ["un bout de tissu", "cm"], ["une parcelle", "m"], ["un morceau de carton", "cm"], ["un enclos", "m"], ["une figure", null], ["un sticker", "cm"],
  ["un cerf-volant", "cm"], ["un panneau", "cm"],
];

function triCourt(): { o: string; u: U } {
  const [o, u] = un(TRI_COURTS);
  return { o, u: u ?? un(["cm", "m"] as const) };
}
/** Le côté d'un triangle court : au dixième si `deci`. */
const triPlage = (u: U, deci: boolean): [number, number, { deci?: boolean; pas?: number }] => (deci ? [u === "cm" ? 2 : 2, u === "cm" ? 12 : 9, { deci: true }] : [u === "cm" ? 3 : 4, u === "cm" ? 30 : 40, { pas: 1 }]);

const triangleItems: TutorBankItemV4[] = [
  fixe({
    id: "cm2_perimetre_triangle_fixed_1_simple",
    microId: "perimetre_triangle",
    difficulty: 1,
    theme: "neutral",
    text: "Un triangle a pour côtés 4 cm, 5 cm et 6 cm. Quel est son périmètre ?",
    choices: ["15 cm", "20 cm", "11 cm", "9 cm"],
    expected: ["15 cm"],
    hint: "Additionne les trois côtés.",
    explanation: exp("Le périmètre d'un triangle est la somme de ses trois côtés.", "On additionne les trois longueurs données.", "4 + 5 + 6 = 15.", "Le périmètre du triangle est 15 cm."),
    tags: ["cm2", "perimetre", "triangle", "qcm"],
    canvas: dessinTri([6, 5, 4], "cm"),
  }),
  fixe({
    id: "cm2_perimetre_triangle_fixed_2_equilateral",
    microId: "perimetre_triangle",
    difficulty: 2,
    theme: "neutral",
    text: "Un triangle a ses 3 côtés égaux à 1,5 m. Quel est son périmètre ?",
    choices: ["4,5 m", "3 m", "4,15 m", "6 m"],
    expected: ["4,5 m"],
    hint: "3 côtés égaux : au lieu d'additionner 3 fois, on multiplie par 3.",
    explanation: exp("Un triangle aux 3 côtés égaux : le périmètre, c'est le côté fois 3.", "Au lieu d'additionner 3 fois, on multiplie.", "1,5 × 3 = 4,5.", "Le périmètre est 4,5 m."),
    tags: ["cm2", "perimetre", "triangle", "equilateral", "qcm"],
    canvas: dessinTri([1.5, 1.5, 1.5], "m", { codes: [1, 1, 1] }),
  }),
  fixe({
    id: "cm2_perimetre_triangle_fixed_3_canvas",
    microId: "perimetre_triangle",
    difficulty: 2,
    theme: "neutral",
    text: "Observe la voile triangulaire. Ses côtés mesurent 4 m, 3,5 m et 2,5 m. Quel est son périmètre ?",
    choices: ["10 m", "9,10 m", "7,5 m", "6 m"],
    expected: ["10 m"],
    hint: "On additionne en alignant les virgules.",
    explanation: exp("Le périmètre d'un triangle est la somme de ses 3 côtés.", "On additionne en alignant les virgules.", "3,5 + 2,5 = 6. Plus 4 : 10.", "Le périmètre est 10 m."),
    tags: ["cm2", "perimetre", "triangle", "canvas", "decimaux"],
    canvas: dessinTri([4, 3.5, 2.5], "m"),
  }),
  fixe({
    id: "cm2_perimetre_triangle_fixed_4_erreur_oublier_cote",
    microId: "perimetre_triangle",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève calcule le périmètre d'un triangle de côtés 5 cm, 6 cm et 7 cm en faisant seulement 5 + 6 = 11 cm. A-t-il raison ?",
    choices: ["non : il oublie un côté ; le périmètre est 18 cm", "oui, le périmètre est 11 cm", "non : il faut faire 5 × 6 × 7", "non : le périmètre est 7 × 3 = 21 cm"],
    expected: ["non : il oublie un côté ; le périmètre est 18 cm"],
    hint: "Un triangle a trois côtés.",
    explanation: exp("Le périmètre d'un triangle est la somme de ses trois côtés.", "Il ne faut oublier aucun côté.", "Il fallait calculer 5 + 6 + 7 = 18.", "L'élève a tort : le périmètre est 18 cm."),
    tags: ["cm2", "perimetre", "triangle", "erreur", "qcm"],
    canvas: dessinTri([7, 6, 5], "cm"),
  }),

  // ★1 — le triangle coté, sans histoire
  TRI("001_triangle_quelconque", 1, "Un triangle a 3 côtés : ajoute les 3 longueurs.", () => {
    const { o, u } = triCourt();
    const [mi, ma, opt] = triPlage(u, false);
    const cotes = cotesTriangle(mi, ma, "quelconque", opt);
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
        `${f(cotes[0])} + ${f(cotes[1])} = ${f(cotes[0] + cotes[1])}. Plus ${f(cotes[2])} : ${f(P)}.`,
        `Le périmètre est ${lg(P, u)}.`,
      ),
      canvas: dessinTri(cotes, u),
    };
  }),

  // ★1 — quel calcul fait le tour ?
  TRI("002_quel_calcul", 1, "On fait le tour : on ajoute les 3 côtés, chacun une fois.", () => {
    const { o, u } = triCourt();
    const deci = Math.random() < 0.4;
    const [mi, ma, opt] = triPlage(u, deci);
    const [a, b, c] = cotesTriangle(mi, ma, "quelconque", opt);
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

  // ★1 — les côtés dans l'énoncé
  TRI("003_cotes_dans_l_enonce", 1, "Ajoute les 3 côtés : le premier, plus le deuxième, plus le troisième.", () => {
    const { o, u } = triCourt();
    const [mi, ma, opt] = triPlage(u, false);
    const cotes = cotesTriangle(mi, ma, "quelconque", opt);
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
        `${f(cotes[0])} + ${f(cotes[1])} = ${f(cotes[0] + cotes[1])}. Plus ${f(cotes[2])} : ${f(P)}.`,
        `Le périmètre est ${lg(P, u)}.`,
      ),
      ...(avecDessin ? { canvas: dessinTri(cotes, u) } : {}),
    };
  }),

  // ★2 — l'exercice de la vidéo : la voile de 4 m, 3,5 m et 2,5 m (aligner les virgules)
  TRI("004_cotes_decimaux", 2, "Additionne en alignant les virgules : les dixièmes avec les dixièmes.", () => {
    const { o, u } = triCourt();
    const cotes = cotesTriangle(2, u === "cm" ? 14 : 9, "quelconque", { deci: true });
    const P = somme(cotes);
    const t = liste(cotes.map((c) => lg(c, u)));
    const [a, b, c] = cotes;
    const virguleOubliee = net(Math.trunc(a) + Math.trunc(b) + Math.trunc(c));
    return {
      text: `${un([`Voici ${o}.`, `Regarde ${ce(o)}.`, `Observe ${ce(o)}.`, `${cap(o)} a la forme d'un triangle.`])} ${un([`Ses côtés mesurent ${t}.`, `Ses trois côtés mesurent ${t}.`, "Lis ses côtés sur le dessin."])} ${un(QUEL_P)}`,
      ...qcmN(P, [virguleOubliee, P - c, net(P + 1), net(P - 1), net(P + 0.5)], u),
      explanation: exp(
        "Le périmètre d'un triangle, c'est la somme de ses 3 côtés.",
        "On additionne en alignant les virgules : unités avec unités, dixièmes avec dixièmes.",
        `${f(a)} + ${f(b)} = ${f(a + b)}. Plus ${f(c)} : ${f(P)}.`,
        `Le périmètre est ${lg(P, u)}.`,
      ),
      canvas: dessinTri(cotes, u),
    };
  }),

  // ★2 — les 3 côtés égaux : un côté fois 3 (la petite voile de 1,5 m)
  TRI("005_triangle_equilateral", 2, "Les 3 côtés sont égaux : au lieu d'additionner 3 fois, on fait le côté fois 3.", () => {
    const { o, u } = triCourt();
    const c = Math.random() < 0.5 ? tireD(1, u === "cm" ? 15 : 9) : u === "cm" ? un([entre(4, 15), entre(2, 12) * 5]) : entre(3, 40);
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
        "Si les 3 côtés sont égaux, au lieu d'additionner 3 fois, on multiplie par 3.",
        `${f(c)} + ${f(c)} + ${f(c)}, c'est ${f(c)} × 3 = ${f(3 * c)}.`,
        `Le périmètre est ${lg(3 * c, u)}.`,
      ),
      canvas: dessinTri([c, c, c], u, { codes: [1, 1, 1] }),
    };
  }),

  // ★2 — la question de la vidéo : 2 côtés égaux de 6 cm et une base de 4 cm
  TRI("006_triangle_isocele", 2, "Deux côtés sont égaux : il faut les compter TOUS LES DEUX.", () => {
    const { o, u } = triCourt();
    const deci = Math.random() < 0.4;
    const [a, b] = cotesTriangle(deci ? 2 : u === "cm" ? 4 : 5, deci ? 12 : u === "cm" ? 30 : 40, "isocele", deci ? { deci: true } : { pas: u === "cm" ? un([1, 5]) : 1 });
    const P = net(a + 2 * b);
    return {
      text: `${un([`Voici ${o}.`, `Regarde ${ce(o)}.`, `Observe ${ce(o)}.`])} ${un([
        `Ses côtés mesurent ${lg(a, u)}, ${lg(b, u)} et ${lg(b, u)}.`,
        `Il a 2 côtés égaux de ${lg(b, u)}, et une base de ${lg(a, u)}.`,
        `Deux côtés mesurent ${lg(b, u)} chacun, le troisième ${lg(a, u)}.`,
        `En bas, ${lg(a, u)}. À gauche et à droite, ${lg(b, u)}.`,
      ])} ${un(QUEL_P)}`,
      ...qcmN(P, [a + b, 2 * a + b, 3 * b, 3 * a, P + 10, a * b], u),
      explanation: exp(
        "Le périmètre d'un triangle, c'est la somme de ses 3 côtés.",
        "Les 2 côtés égaux comptent chacun.",
        `${f(b)} + ${f(b)} = ${f(2 * b)}. Plus la base, ${f(a)} : ${f(P)}.`,
        `Le périmètre est ${lg(P, u)}.`,
      ),
      canvas: dessinTri([a, b, b], u, { codes: [0, 1, 1] }),
    };
  }),

  // ★2 — Maëlle et sa bande : une petite histoire, une seule étape
  TRI("007_contexte_bande", 2, "La bande fait le tour : on ajoute les 3 côtés.", () => {
    const s = un(TRI_SIT_AUTOUR);
    const p = perso(s.metier);
    const sorte = un(["quelconque", "quelconque", "isocele"] as const);
    const deci = s.u === "m" && s.max <= 40 && Math.random() < 0.6;
    const cotes = cotesTriangle(s.min, s.max, sorte, deci ? { deci: true } : {});
    const P = somme(cotes);
    const t = liste(cotes.map((c) => lg(c, s.u)));
    return {
      text: `${phraseSit(p, s, "triangulaire")} ${un([`Ses côtés mesurent ${t}.`, `Les 3 côtés mesurent ${t}.`, `Les côtés font ${t}.`])} ${un(QFIL(s))}`,
      ...qcmN(P, leurresSomme(cotes, deci ? 0.1 : pasDe(s.min)), s.u),
      explanation: exp(
        `Le périmètre est la longueur du tour : c'est la longueur ${de(s.fil)} qu'il faut.`,
        "On ajoute les 3 côtés en faisant le tour, chacun une seule fois, en alignant les virgules.",
        `${f(cotes[0])} + ${f(cotes[1])} = ${f(cotes[0] + cotes[1])}. Plus ${f(cotes[2])} : ${f(P)}.`,
        `Il faut ${lg(P, s.u)} ${de(s.fil)}.`,
      ),
      canvas: dessinTri(cotes, s.u, sorte === "isocele" ? { codes: [0, 1, 1] } : {}),
    };
  }),

  // ★3 — le piège de la vidéo : 80 cm, 1 m et 1 m → on convertit d'abord (le short : 60 cm, 60 cm, 1 m)
  TRI("008_unites_differentes", 3, "Les côtés ne sont pas dans la même unité : on convertit d'abord (1 m = 100 cm).", () => {
    const s = un(TRI_SIT.filter((x) => x.u === "cm" && x.max >= 40));
    const p = perso(s.metier);
    let cm = 0;
    let m1 = 1;
    let m2 = 1;
    for (let k = 0; k < 200; k++) {
      cm = tire(40, 95, 5);
      m1 = un([1, 1, 1.2, 1.5, 1.1, 1.4, 1.6]);
      m2 = Math.random() < 0.5 ? m1 : un([1, 1.2, 1.5, 1.3, 1.8]);
      if (ptsTriangle(cm, m1 * 100, m2 * 100)) break;
    }
    const c1 = net(m1 * 100);
    const c2 = net(m2 * 100);
    const P = net(cm + c1 + c2);
    const naif = net(cm + m1 + m2);
    const fois10 = net(cm + m1 * 10 + m2 * 10);
    const textes = [lg(cm, "cm"), lg(m1, "m"), lg(m2, "m")];
    return {
      text: `${phraseSit(p, s, "triangulaire")} ${un([`Ses côtés mesurent ${liste(textes)}.`, `Les côtés : ${liste(textes)}.`, "Lis les côtés sur le dessin : attention aux unités."])} ${un([
        `Combien de centimètres ${de(s.fil)} faut-il ?`,
        "Quel est son périmètre, en centimètres ?",
        `Quelle longueur ${de(s.fil)} faut-il, en cm ?`,
      ])}`,
      ...qcmN(P, [naif, fois10, net(cm + c1 + m2), net(P + 100), net(P - 100)], "cm"),
      explanation: exp(
        "Le périmètre est la somme des 3 côtés, tous dans la MÊME unité.",
        "On convertit d'abord : 1 m = 100 cm. Ensuite on additionne.",
        `${lg(m1, "m")} = ${lg(c1, "cm")} et ${lg(m2, "m")} = ${lg(c2, "cm")}. ${plus([cm, c1, c2])} = ${f(P)}. (Pas ${f(naif)} : on n'ajoute pas des cm et des m !)`,
        `Il faut ${lg(P, "cm")} ${de(s.fil)}.`,
      ),
      canvas: dessinTriTextes([cm, c1, c2], textes),
    };
  }),

  // ★3 — le défi de la vidéo : 3 voiles pareilles, un rouleau de 20 m : combien restera-t-il ?
  TRI("009_plusieurs_et_reste", 3, "D'abord le tour d'UN triangle, puis fois le nombre, enfin ce qui reste.", () => {
    const s = un(TRI_SIT_AUTOUR.filter((x) => x.max <= 120));
    const p = perso(s.metier);
    const k = entre(2, 5);
    const deci = s.u === "m" && s.max <= 40;
    const cotes = cotesTriangle(s.min, s.max, un(["quelconque", "isocele"] as const), deci ? { deci: true } : {});
    const P = somme(cotes);
    const besoin = net(P * k);
    const pas = s.u === "m" ? (besoin > 50 ? 10 : 5) : besoin > 300 ? 50 : 10;
    const dispo = net(Math.ceil(besoin / pas) * pas + entre(0, 2) * pas);
    const reste = net(dispo - besoin);
    const t = liste(cotes.map((c) => lg(c, s.u)));
    const avecReste = reste > 0 && Math.random() < 0.6;
    const fe = estF(s.objet);
    const pareils = fe ? "pareilles" : "pareils";
    const chacun = fe ? "chacune" : "chacun";
    if (avecReste) {
      return {
        text: `${p.txt} prépare ${k} ${pluriel(s.objet)} triangulaires ${pareils}. ${cap(chacun)} a des côtés de ${t}. ${cap(p.il)} a ${lg(dispo, s.u)} ${de(s.fil)}. ${un([
          `Combien ${de(s.fil)} lui restera-t-il ?`,
          `Quelle longueur ${de(s.fil)} lui restera-t-il ?`,
          `Combien de ${motU(s.u)} lui restera-t-il ?`,
        ])}`,
        ...qcmN(reste, [net(dispo - P), besoin, net(dispo - besoin + P), net(reste + 1)], s.u),
        explanation: exp(
          "Le périmètre d'un triangle, c'est la somme de ses 3 côtés.",
          "Un tour, puis fois le nombre de triangles, puis on enlève de ce qu'on a.",
          `Un tour : ${plus(cotes)} = ${f(P)}. Pour ${k} : ${f(P)} × ${k} = ${f(besoin)}. ${f(dispo)} − ${f(besoin)} = ${f(reste)}.`,
          `Il lui restera ${lg(reste, s.u)} ${de(s.fil)}.`,
        ),
        canvas: dessinTri(cotes, s.u),
      };
    }
    return {
      text: `${p.txt} prépare ${k} ${pluriel(s.objet)} triangulaires ${pareils}. ${cap(chacun)} a des côtés de ${t}. ${un([
        `Combien de ${motU(s.u)} ${de(s.fil)} faut-il pour les ${k} ?`,
        `Quelle longueur ${de(s.fil)} faut-il pour faire le tour des ${k} ?`,
        `${cap(p.il)} fait le tour de ${chacun}. Combien ${de(s.fil)} faut-il en tout ?`,
      ])}`,
      ...qcmN(besoin, [P, net(P + k), net(P * (k - 1)), net((P - cotes[2]) * k), net(besoin + 10)], s.u),
      explanation: exp(
        "Le périmètre d'un triangle, c'est la somme de ses 3 côtés.",
        "On calcule le tour d'un seul triangle, puis on multiplie par le nombre de triangles.",
        `Un tour : ${plus(cotes)} = ${f(P)}. Pour ${k} : ${f(P)} × ${k} = ${f(besoin)}.`,
        `Il faut ${lg(besoin, s.u)} ${de(s.fil)}.`,
      ),
      canvas: dessinTri(cotes, s.u),
    };
  }),

  // ★3 — le piège : un côté oublié
  TRI("010_erreur_oublier_un_cote", 3, "Le périmètre, c'est le tour ENTIER : les 3 côtés, chacun une fois.", () => {
    const s = un(TRI_SIT_AUTOUR);
    const p = perso(s.metier);
    const deci = s.u === "m" && s.max <= 40 && Math.random() < 0.5;
    const cotes = cotesTriangle(s.min, s.max, "quelconque", deci ? { deci: true } : {});
    const [a, b, c] = cotes;
    const P = somme(cotes);
    const debut = `${phraseSit(p, s, "triangulaire")} Les côtés mesurent ${liste(cotes.map((x) => lg(x, s.u)))}. ${cap(p.il)} calcule ${f(a)} + ${f(b)} = ${f(a + b)} et achète ${lg(a + b, s.u)} ${de(s.fil)}.`;
    if (Math.random() < 0.5) {
      return {
        text: `${debut} ${un(["Combien lui en manque-t-il ?", `Combien ${de(s.fil)} lui manque-t-il ?`, `Quelle longueur ${de(s.fil)} lui manque-t-il ?`])}`,
        ...qcmN(c, [a, b, P, net(a + b - c), net(c + 10)], s.u),
        explanation: exp(
          "Le périmètre est le tour entier : les 3 côtés.",
          "On compte les 3 côtés, chacun une seule fois. Ici, un côté a été oublié.",
          `Il fallait ${plus(cotes)} = ${f(P)}. ${f(P)} − ${f(a + b)} = ${f(c)} : c'est le côté oublié.`,
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
        `${f(a)} + ${f(b)} = ${f(a + b)}. Plus ${f(c)} : ${f(P)}.`,
        `Il fallait ${lg(P, s.u)} ${de(s.fil)}.`,
      ),
      canvas: dessinTri(cotes, s.u),
    };
  }),

  // ★3 — « j'ai tant de bande, est-ce assez ? »
  TRI("011_est_ce_assez", 3, "Calcule le tour, puis compare avec ce que tu as.", () => {
    const s = un(TRI_SIT_AUTOUR);
    const p = perso(s.metier);
    const deci = s.u === "m" && s.max <= 40 && Math.random() < 0.5;
    const pas = deci ? 0.5 : pasDe(s.min);
    const cotes = cotesTriangle(s.min, s.max, un(["quelconque", "isocele"] as const), deci ? { deci: true } : {});
    const P = somme(cotes);
    const dispo = Math.max(pas * 2, net(Math.round(P / pas) * pas + un([-3, -2, -1, 1, 2, 3]) * pas * (s.u === "cm" && pas === 1 ? 2 : 1)));
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
        `${plus(cotes)} = ${f(P)}. ${dispo === P ? `${f(P)} = ${f(dispo)}.` : dispo > P ? `${f(dispo)} − ${f(P)} = ${f(dispo - P)}.` : `${f(P)} − ${f(dispo)} = ${f(P - dispo)}.`}`,
        dispo === P ? "C'est juste assez." : dispo > P ? `C'est assez : il en reste ${lg(dispo - P, s.u)}.` : `Ce n'est pas assez : il en manque ${lg(P - dispo, s.u)}.`,
      ),
      canvas: dessinTri(cotes, s.u),
    };
  }),

  // ★3 — le short : « 60 + 60 + 1 = 121 ? » (un camarade n'a pas converti)
  TRI("012_erreur_conversion", 3, "Avant d'additionner, tous les côtés dans la même unité.", () => {
    const p = perso();
    const quoi = un(["un cerf-volant", "un fanion géant", "une voile de planche", "une banderole", "un panneau", "un toit de cabane", "une tente", "une rampe"]);
    let cm = 60;
    let m = 1;
    for (let k = 0; k < 100; k++) {
      cm = tire(50, 95, 5);
      m = un([1, 1, 1.2, 1.5]);
      if (ptsTriangle(m * 100, cm, cm)) break;
    }
    const cmM = net(m * 100);
    const P = net(2 * cm + cmM);
    const naif = net(2 * cm + m);
    return {
      text: `${cap(quoi)} en triangle a deux côtés de ${lg(cm, "cm")} et un côté de ${lg(m, "m")}. ${p.nom} calcule ${f(cm)} + ${f(cm)} + ${f(m)} = ${f(naif)}. ${un([
        "Quel est le vrai périmètre ?",
        "Corrige son calcul : quel est le périmètre ?",
        "Combien mesure vraiment le tour ?",
      ])}`,
      ...qcmN(P, [naif, net(2 * cm + m * 10), net(cm + cmM), net(P + 100)], "cm"),
      explanation: exp(
        "Le périmètre est la somme des côtés, tous dans la même unité.",
        "On convertit d'abord : 1 m = 100 cm.",
        `${lg(m, "m")} = ${lg(cmM, "cm")}. ${f(cm)} + ${f(cm)} = ${f(2 * cm)}. Plus ${f(cmM)} : ${f(P)}.`,
        `Le périmètre est ${lg(P, "cm")}, pas ${f(naif)}.`,
      ),
      canvas: dessinTriTextes([cmM, cm, cm], [lg(m, "m"), lg(cm, "cm"), lg(cm, "cm")], [0, 1, 1]),
    };
  }),
];

/* =========================================================
   PERIMETRE_QUADRILATERE — Rayan, jardinier de stade :
   la longueur plus la largeur, c'est la moitié du tour, on double ; carré : côté × 4
========================================================= */
const QUAD = atelierP("quadrilatere");

const RECT_SIT: readonly Sit[] = [
  S("un terrain de foot", "trace la ligne blanche autour", "ligne blanche", ["jardinière de stade", "jardinier de stade"], "m", 50, 120),
  S("un tableau", "pose une baguette autour", "baguette", ["encadreuse", "encadreur"], "cm", 30, 90),
  S("un cadre photo", "colle une frise autour", "frise", ["photographe", "photographe"], "cm", 10, 30),
  S("une nappe", "coud de la dentelle autour", "dentelle", ["couturière", "couturier"], "cm", 80, 200),
  S("un potager", "pose une clôture autour", "clôture", ["jardinière", "jardinier"], "m", 6, 25),
  S("une chambre", "pose des plinthes le long des murs", "plinthe", ["peintre", "peintre"], "m", 3, 7),
  S("un enclos à moutons", "pose du grillage autour", "grillage", ["bergère", "berger"], "m", 10, 40),
  S("une piscine", "pose une margelle autour", "margelle", ["maçonne", "maçon"], "m", 5, 15),
  S("un tapis", "coud une frange autour", "frange", ["tapissière", "tapissier"], "cm", 80, 200),
  S("une affiche", "colle un ruban adhésif autour", "ruban adhésif", ["graphiste", "graphiste"], "cm", 40, 90),
  S("une table", "colle une bande de bois autour", "bande de bois", ["menuisière", "menuisier"], "cm", 80, 180),
  S("un drapeau", "coud un liseré autour", "liseré", ["couturière", "couturier"], "cm", 60, 150),
  S("un champ", "pose une clôture autour", "clôture", ["agricultrice", "agriculteur"], "m", 40, 120),
  S("une fenêtre", "pose un joint autour", "joint", ["vitrière", "vitrier"], "cm", 60, 140),
  S("un gâteau", "pose un ruban de chocolat autour", "ruban de chocolat", ["pâtissière", "pâtissier"], "cm", 20, 40),
  S("une scène", "pose un ruban lumineux autour", "ruban lumineux", ["régisseuse", "régisseur"], "m", 5, 15),
  S("une cour de récréation", "trace une ligne blanche autour", "ligne blanche", ["directrice", "directeur"], "m", 20, 60),
  S("un terrain de pétanque", "pose des planches autour", "planche", ["animatrice", "animateur"], "m", 8, 20),
  S("une pelouse", "enterre un fil autour", "fil", ["technicienne en robotique", "technicien en robotique"], "m", 8, 30),
  S("un miroir", "colle une baguette dorée autour", "baguette dorée", ["encadreuse", "encadreur"], "cm", 40, 90),
  S("un parc à cabris", "pose une clôture autour", "clôture", ["éleveuse", "éleveur"], "m", 8, 25),
];
const CARRE_COURTS: readonly (readonly [string, U, number])[] = [
  ["un carré", "cm", 15], ["un tableau", "cm", 90], ["un coussin", "cm", 60], ["une nappe", "cm", 200], ["un jardin", "m", 30], ["un potager", "m", 20],
  ["une serviette", "cm", 50], ["un tapis", "cm", 200], ["une cour", "m", 60], ["un sous-verre", "cm", 12], ["un enclos", "m", 40], ["une boîte", "cm", 30],
  ["un terrain", "m", 25], ["une scène", "m", 15], ["un bassin", "m", 12],
];
/** « 9 m de long et 5 m de large » : la longueur L et la largeur l. `deci` : au demi pour les petits mètres. */
function dimensions(min: number, max: number, deci = false): [number, number] {
  const pas = pasDe(min);
  const L = tire(Math.max(min, 2 * pas), max, pas);
  const l = tire(Math.max(pas, Math.ceil((L * 0.3) / pas) * pas), L - pas, pas);
  const ll = Math.max(pas, l);
  if (deci && pas === 1 && Math.random() < 0.6) return Math.random() < 0.5 ? [net(L + 0.5), ll] : [L, net(ll + 0.5)];
  return [L, ll];
}
const leurresRect = (L: number, l: number) => [L + l, L * l, 2 * L + l, L + 2 * l, 4 * L, 2 * (L + l) + 10];
const expRect = (L: number, l: number, u: string, conclusion: string) =>
  exp(
    "Le périmètre d'un rectangle est la longueur de son tour : 2 longueurs et 2 largeurs.",
    "La longueur plus la largeur, c'est la moitié du tour. On double.",
    `${f(L)} + ${f(l)} = ${f(L + l)} : la moitié du tour. ${f(L + l)} × 2 = ${f(2 * (L + l))}.`,
    conclusion || `Le périmètre est ${lg(2 * (L + l), u)}.`,
  );

const quadrilatereItems: TutorBankItemV4[] = [
  fixe({
    id: "cm2_perimetre_quadrilatere_fixed_1_rectangle",
    microId: "perimetre_quadrilatere",
    difficulty: 2,
    theme: "neutral",
    text: "Un rectangle mesure 9 m de long et 6 m de large. Quel est son périmètre ?",
    choices: ["30 m", "54 m", "15 m", "24 m"],
    expected: ["30 m"],
    hint: "La longueur plus la largeur : la moitié du tour. On double.",
    explanation: expRect(9, 6, "m", ""),
    tags: ["cm2", "perimetre", "quadrilatere", "rectangle", "qcm"],
  }),
  fixe({
    id: "cm2_perimetre_quadrilatere_fixed_2_carre",
    microId: "perimetre_quadrilatere",
    difficulty: 2,
    theme: "neutral",
    text: "Un carré a un côté de 12,5 m. Quel est son périmètre ?",
    choices: ["50 m", "25 m", "48,20 m", "37,5 m"],
    expected: ["50 m"],
    hint: "Un carré a 4 côtés égaux : le côté fois 4.",
    explanation: exp("Un carré possède quatre côtés de même longueur.", "Pour un carré : le côté fois 4.", "12,5 × 4 = 50 (12 × 4 = 48, et 0,5 × 4 = 2).", "Le périmètre est 50 m."),
    tags: ["cm2", "perimetre", "quadrilatere", "carre", "qcm"],
    canvas: dessinCarre(12.5, "m"),
  }),
  fixe({
    id: "cm2_perimetre_quadrilatere_fixed_3_canvas_rectangle",
    microId: "perimetre_quadrilatere",
    difficulty: 2,
    theme: "neutral",
    text: "Observe le rectangle ABCD. AB = 6 cm et BC = 3 cm. Quel est son périmètre ?",
    choices: ["18 cm", "9 cm", "15 cm", "12 cm"],
    expected: ["18 cm"],
    hint: "Il y a deux côtés de 6 cm et deux côtés de 3 cm.",
    explanation: expRect(6, 3, "cm", ""),
    tags: ["cm2", "perimetre", "quadrilatere", "rectangle", "canvas"],
    canvas: {
      kind: "quadrilatere",
      points: { A: { x: 60, y: 80 }, B: { x: 240, y: 80 }, C: { x: 240, y: 170 }, D: { x: 60, y: 170 } },
      sideLabels: { AB: "6 cm", BC: "3 cm" },
      display: { showPoints: true, showLabels: true, showSides: true, showAngles: false },
      marks: { rightAnglesAt: ["A", "B", "C", "D"], equalSides: [["AB", "CD"], ["BC", "DA"]] },
    },
  }),
  fixe({
    id: "cm2_perimetre_quadrilatere_fixed_4_canvas_carre",
    microId: "perimetre_quadrilatere",
    difficulty: 2,
    theme: "neutral",
    text: "Observe le carré ABCD. Le côté mesure 5 cm. Quel est son périmètre ?",
    choices: ["20 cm", "25 cm", "10 cm", "15 cm"],
    expected: ["20 cm"],
    hint: "Le carré a 4 côtés égaux.",
    explanation: exp("Un carré possède quatre côtés de même longueur.", "Pour un carré : le côté fois 4.", "5 × 4 = 20.", "Le périmètre est 20 cm."),
    tags: ["cm2", "perimetre", "quadrilatere", "carre", "canvas"],
    canvas: {
      kind: "quadrilatere",
      points: { A: { x: 70, y: 70 }, B: { x: 190, y: 70 }, C: { x: 190, y: 190 }, D: { x: 70, y: 190 } },
      sideLabels: { AB: "5 cm" },
      display: { showPoints: true, showLabels: true, showSides: true, showAngles: false },
      marks: { rightAnglesAt: ["A", "B", "C", "D"], equalSides: [["AB", "BC"], ["BC", "CD"], ["CD", "DA"]] },
    },
  }),
  fixe({
    id: "cm2_perimetre_quadrilatere_fixed_5_erreur_rectangle",
    microId: "perimetre_quadrilatere",
    difficulty: 3,
    theme: "neutral",
    text: "Un rectangle mesure 8 cm sur 3 cm. Un élève répond 24 cm, car il a fait 8 × 3. A-t-il raison ?",
    choices: ["non : 8 × 3 donne l'aire ; le périmètre est 22 cm", "oui, le périmètre est 24 cm", "non : le périmètre est 8 + 3 = 11 cm", "non : le périmètre est 8 × 4 = 32 cm"],
    expected: ["non : 8 × 3 donne l'aire ; le périmètre est 22 cm"],
    hint: "8 × 3 donne l'aire, pas le périmètre.",
    explanation: expRect(8, 3, "cm", "L'élève a tort : 8 × 3 donne l'aire. Le périmètre est 22 cm."),
    tags: ["cm2", "perimetre", "quadrilatere", "rectangle", "erreur", "qcm"],
    canvas: dessinRect(8, 3, "cm", false),
  }),

  // ★2 — le rectangle aux 4 côtés écrits : on fait le tour
  QUAD("001_rectangle_quatre_cotes", 2, "Fais le tour : ajoute les 4 côtés.", () => {
    const [o, u, max] = un(RECT_COURTS);
    const [L, l] = dimsCourt(max, u === "cm" ? 15 : 25, true);
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
        `${f(L)} + ${f(l)} = ${f(L + l)}. Plus ${f(L)} : ${f(2 * L + l)}. Plus ${f(l)} : ${f(2 * (L + l))}.`,
        `Le périmètre est ${lg(2 * (L + l), u)}.`,
      ),
      canvas: dessinRect(L, l, u, true),
    };
  }),

  // ★2 — l'exercice de la vidéo : « un rectangle mesure 9 m de long et 6 m de large »
  QUAD("002_rectangle_longueur_largeur", 2, "La longueur plus la largeur : la moitié du tour. On double.", () => {
    const [o, u, max] = un(RECT_COURTS);
    const [L, l] = dimsCourt(max, u === "cm" ? 25 : 30, true);
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

  // ★2 — le grand terrain de la vidéo (100 m sur 64 m → 328 m)
  QUAD("013_grands_nombres", 2, "Moitié du tour : la longueur plus la largeur. Puis on double.", () => {
    const quoi = un(["Un terrain de foot", "Un champ", "Un parking", "Un stade", "Un pré", "Un terrain de rugby", "Une prairie", "Un camping", "Un verger", "Une forêt plantée"]);
    const L = tire(60, 250, un([1, 2, 5]));
    const l = tire(30, L - 10, un([1, 2, 5]));
    const P = 2 * (L + l);
    return {
      text: `${quoi} rectangulaire ${un([`mesure ${lg(L, "m")} de long et ${lg(l, "m")} de large.`, `mesure ${lg(L, "m")} sur ${lg(l, "m")}.`, `a une longueur de ${lg(L, "m")} et une largeur de ${lg(l, "m")}.`])} ${un(QUEL_P)}`,
      ...qcmN(P, [L + l, 2 * L + l, L + 2 * l, 4 * L, P + 100, P - 100], "m", 10),
      explanation: expRect(L, l, "m", ""),
      canvas: dessinRect(L, l, "m", false),
    };
  }),

  // ★2 — le carré : le côté fois 4 (le terrain des petits, 12,5 m)
  QUAD("003_carre", 2, "Pour un carré : le côté fois 4.", () => {
    const [o, u, max] = un(CARRE_COURTS);
    const c = coteCourt(max, 20, true);
    const sujet = o === "un carré" ? o : carreAccorde(o);
    const calc = Math.random() < 0.3;
    const debut = un([`${cap(sujet)} a des côtés de ${lg(c, u)}.`, `${cap(sujet)} a ${lg(c, u)} de côté.`, `Le côté ${du(sujet)} mesure ${lg(c, u)}.`, `Voici ${sujet} de ${lg(c, u)} de côté.`]);
    return {
      text: `${debut} ${calc ? un(["Quel calcul donne son périmètre ?", "Quel calcul rapide donne son tour ?"]) : un(QUEL_P)}`,
      ...(calc ? qcm(`${lg(c, u)} × 4`, [`${lg(c, u)} × 2`, `${lg(c, u)} × ${lg(c, u)}`, `${lg(c, u)} + 4`]) : qcmN(4 * c, [2 * c, c * c, 3 * c, c + 4], u)),
      explanation: exp(
        "Le périmètre d'un carré, c'est le tour de ses 4 côtés égaux.",
        `Pour un carré : le côté fois 4. (${f(c)} × ${f(c)}, ce serait l'aire.)`,
        `${f(c)} × 4 = ${f(4 * c)}.`,
        `Le périmètre est ${lg(4 * c, u)}.`,
      ),
      canvas: dessinCarre(c, u),
    };
  }),

  // ★2 — quel calcul pour le rectangle ?
  QUAD("004_calcul_rectangle", 2, "La moitié du tour (longueur + largeur), puis on double.", () => {
    const [o, u, max] = un(RECT_COURTS);
    const [L, l] = dimsCourt(max, 20, true);
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

  // ★2 — le piège de la vidéo : « 100 + 64, ce n'est que la moitié du tour ! »
  QUAD("005_moitie_du_tour", 2, "Longueur + largeur, ce n'est que la MOITIÉ du tour : il faut doubler.", () => {
    if (Math.random() < 0.45) {
      const p = perso();
      const lieu = un(["la cour", "le terrain de foot", "le gymnase", "le préau", "le jardin", "la salle de classe", "le terrain de basket", "le parking", "le potager", "la piscine"]);
      const L = un([entre(10, 40), entre(2, 9) * 5]);
      const l = entre(4, L - 2);
      return {
        text: `${p.nom} fait le tour ${du(lieu.replace(/^la /, "une ").replace(/^le /, "un "))} en comptant ses pas : ${L} pas de long, ${l} pas de large. ${un([
          "Combien de pas pour tout le tour ?",
          `Combien de pas fait-${p.il} en tout ?`,
          `Combien de pas compte-t-${p.il} pour un tour complet ?`,
        ])}`,
        ...qcmN(2 * (L + l), [L + l, L * l, 2 * L + l, 4 * L], "pas"),
        explanation: expRect(L, l, "pas", `Il faut ${2 * (L + l)} pas pour tout le tour.`),
        canvas: dessinRect(L, l, "pas", false),
      };
    }
    const [o, u, max] = un(RECT_COURTS);
    const [L, l] = dimsCourt(max, 25, true);
    return {
      text: `${cap(o)} rectangulaire mesure ${lg(L, u)} sur ${lg(l, u)}. ${f(L)} + ${f(l)} = ${f(L + l)} : c'est la moitié du tour. ${un(["Combien mesure le tour entier ?", "Quel est le périmètre ?", "Et le tour complet ?"])}`,
      ...qcmN(2 * (L + l), [L + l, (L + l) * 4, L * l, L + l + L], u),
      explanation: expRect(L, l, u, ""),
      canvas: dessinRect(L, l, u, false),
    };
  }),

  // ★2 — la question de la vidéo : un quadrilatère de 3,5 m, 4 m, 2,5 m et 5 m
  QUAD("006_quadrilatere_quelconque", 2, "4 côtés différents : on les ajoute un par un, en alignant les virgules.", () => {
    const u = un(["cm", "m"] as const);
    const { cotes, canvas } = polyCote(4, entre(3, 10), u, { deci: Math.random() < 0.6 });
    const P = somme(cotes);
    const sansVirgule = net(cotes.reduce((a, b) => a + Math.trunc(b), 0));
    return {
      text: `${un(["Voici un quadrilatère.", "Observe ce quadrilatère.", "Ce quadrilatère a 4 côtés différents.", u === "m" ? "Regarde ce champ à 4 côtés." : "Regarde ce carton à 4 côtés."])} ${un([
        `Ses côtés mesurent ${liste(cotes.map((c) => lg(c, u)))}.`,
        "Lis ses côtés sur le dessin.",
      ])} ${un(QUEL_P)}`,
      ...qcmN(P, [...leurresSomme(cotes), sansVirgule], u),
      explanation: exp(
        "Le périmètre est la somme de tous les côtés.",
        "Les côtés ne sont pas égaux : on additionne les 4, en alignant les virgules.",
        `${plus(cotes)} = ${f(P)}.`,
        `Le périmètre est ${lg(P, u)}.`,
      ),
      canvas,
    };
  }),

  // ★3 — en histoire : rectangle ou carré
  QUAD("007_contexte_tour", 3, "Rectangle : (longueur + largeur) × 2. Carré : côté × 4.", () => {
    const s = un(RECT_SIT);
    const p = perso(s.metier);
    if (Math.random() < 0.3) {
      const c = longueurSit(s);
      return {
        text: `${p.txt} ${s.geste} d'${carreAccorde(s.objet)} de ${lg(c, s.u)} de côté. ${un(QFIL(s))}`,
        ...qcmN(4 * c, [2 * c, 3 * c, c + 4, c * c], s.u),
        explanation: exp("Le périmètre d'un carré, c'est le tour de ses 4 côtés égaux.", "Pour un carré : le côté fois 4.", `${f(c)} × 4 = ${f(4 * c)}.`, `Il faut ${lg(4 * c, s.u)} ${de(s.fil)}.`),
        canvas: dessinCarre(c, s.u),
      };
    }
    const [L, l] = dimensions(s.min, s.max, s.u === "m");
    return {
      text: `${phraseSit(p, s, "rectangulaire")} ${un([`${estF(s.objet) ? "Elle" : "Il"} mesure ${lg(L, s.u)} sur ${lg(l, s.u)}.`, `Longueur : ${lg(L, s.u)}. Largeur : ${lg(l, s.u)}.`, `Ses dimensions : ${lg(L, s.u)} sur ${lg(l, s.u)}.`])} ${un(QFIL(s))}`,
      ...qcmN(2 * (L + l), leurresRect(L, l), s.u),
      explanation: expRect(L, l, s.u, `Il faut ${lg(2 * (L + l), s.u)} ${de(s.fil)}.`),
      canvas: dessinRect(L, l, s.u, Math.random() < 0.3),
    };
  }),

  // ★3 — combien en restera-t-il ?
  QUAD("008_reste", 3, "Calcule d'abord le tour, puis enlève-le de ce que tu as.", () => {
    const s = un(RECT_SIT);
    const p = perso(s.metier);
    const pas = pasDe(s.min);
    const [L, l] = dimensions(s.min, s.max, s.u === "m");
    const P = net(2 * (L + l));
    const dispo = net(Math.ceil(P / (pas * 2)) * pas * 2 + entre(1, 6) * (pas === 1 ? 2 : pas * 2));
    return {
      text: `${p.txt} a ${lg(dispo, s.u)} ${de(s.fil)}. ${cap(p.il)} ${s.geste} d'${s.objet} rectangulaire de ${lg(L, s.u)} sur ${lg(l, s.u)}. ${un([
        `Combien ${de(s.fil)} lui restera-t-il ?`,
        `Quelle longueur ${de(s.fil)} lui restera-t-il ?`,
        `Combien de ${motU(s.u)} ${de(s.fil)} restera-t-il ?`,
      ])}`,
      ...qcmN(dispo - P, [dispo - (L + l), P, dispo - (2 * L + l), dispo - 4 * L], s.u),
      explanation: exp(
        "Le périmètre est la longueur du tour.",
        "D'abord le tour (la moitié du tour, on double), ensuite ce qui reste.",
        `${f(L)} + ${f(l)} = ${f(L + l)}. ${f(L + l)} × 2 = ${f(P)}. ${f(dispo)} − ${f(P)} = ${f(dispo - P)}.`,
        `Il restera ${lg(dispo - P, s.u)} ${de(s.fil)}.`,
      ),
      canvas: dessinRect(L, l, s.u, false),
    };
  }),

  // ★3 — le piège : l'aire à la place du périmètre
  QUAD("009_erreur_aire_rectangle", 3, "Longueur × largeur, c'est l'AIRE, pas le tour.", () => {
    const s = un(RECT_SIT);
    const p = perso(s.metier);
    const [L, l] = dimensions(s.min, Math.min(s.max, 60));
    const P = 2 * (L + l);
    const debut = `${p.txt} ${s.geste} d'${s.objet} rectangulaire de ${lg(L, s.u)} sur ${lg(l, s.u)}. ${cap(p.il)} calcule ${f(L)} × ${f(l)} = ${f(L * l)}.`;
    if (Math.random() < 0.5) {
      return {
        text: `${debut} ${un([`A-t-${p.il} raison ?`, "Est-ce le bon calcul ?", "Qu'en penses-tu ?"])}`,
        ...qcm(`non : ${f(L)} × ${f(l)}, c'est l'aire ; il faut ${lg(P, s.u)}`, [
          `oui : il faut ${lg(L * l, s.u)} ${de(s.fil)}`,
          `non : il faut ${f(L)} + ${f(l)} = ${lg(L + l, s.u)}`,
          `non : il faut ${f(L)} × 4 = ${lg(4 * L, s.u)}`,
        ]),
        explanation: expRect(L, l, s.u, `Non : ${f(L)} × ${f(l)} donne l'aire. Il faut ${lg(P, s.u)} ${de(s.fil)}.`),
        canvas: dessinRect(L, l, s.u, false),
      };
    }
    return {
      text: `${debut} ${un(["Quel est le bon résultat ?", `Combien ${de(s.fil)} faut-il vraiment ?`, "Quel est le vrai périmètre ?"])}`,
      ...qcmN(P, [L * l, L + l, 2 * L + l, 4 * L], s.u),
      explanation: expRect(L, l, s.u, `Il faut ${lg(P, s.u)} ${de(s.fil)}, pas ${f(L * l)}.`),
      canvas: dessinRect(L, l, s.u, false),
    };
  }),

  // ★3 — le short : 2 tours du terrain de basket (28 m sur 15 m → 172 m)
  QUAD("010_plusieurs_tours", 3, "Un tour d'abord (moitié du tour, on double), puis fois le nombre de tours.", () => {
    const p = perso();
    const k = entre(2, 5);
    const carre = Math.random() < 0.35;
    const lieu = un(["terrain de basket", "terrain de handball", "terrain de foot", "gymnase", "parc", "stade", "jardin", "terrain de volley", "city-stade", "parking", "skatepark", "pré"]);
    const [L, l] = carre ? (() => { const c = un([entre(8, 40), entre(3, 12) * 5, net(entre(8, 30) + 0.5)]); return [c, c]; })() : dimensions(10, 110, true);
    const T = net(carre ? 4 * L : 2 * (L + l));
    const quoi = carre ? `un ${lieu} carré de ${lg(L, "m")} de côté` : `un ${lieu} rectangulaire de ${lg(L, "m")} sur ${lg(l, "m")}`;
    return {
      text: `${un([`L'entraîneur dit à ${p.nom} : « Fais ${k} tours du ${lieu} ! »`, `${p.nom} fait ${k} fois le tour du ${lieu}.`, `${p.nom} doit courir ${k} tours du ${lieu}.`])} C'est ${quoi}. ${un([`Combien de mètres court-${p.il} ?`, `Quelle distance fait-${p.il} en tout ?`, "Combien de mètres en tout ?"])}`,
      ...qcmN(T * k, [T, net((L + l) * k), net(T + k), net(T * (k - 1)), carre ? net(L * k) : net(L * l)], "m"),
      explanation: exp(
        "Le périmètre est la longueur d'un tour.",
        "D'abord un tour, puis fois le nombre de tours.",
        `Un tour : ${carre ? `${f(L)} × 4 = ${f(T)}` : `${f(L)} + ${f(l)} = ${f(L + l)}, on double : ${f(T)}`}. ${k} tours : ${f(T)} × ${k} = ${f(T * k)}.`,
        `${cap(p.il)} court ${lg(T * k, "m")}.`,
      ),
      canvas: carre ? dessinCarre(L, "m") : dessinRect(L, l, "m", false),
    };
  }),

  // ★3 — le défi de la vidéo : peinture pour 250 m, 2 tours d'un terrain de 40 m sur 20 m : assez ?
  QUAD("011_assez_pour_plusieurs_tours", 3, "Un tour, puis fois le nombre de tours ; enfin, compare avec ce que tu as.", () => {
    const s = un(RECT_SIT.filter((x) => x.u === "m"));
    const p = perso(s.metier);
    const k = entre(2, 3);
    const [L, l] = dimensions(s.min, s.max);
    const T = 2 * (L + l);
    const besoin = T * k;
    const pas = besoin >= 200 ? 10 : 5;
    const dispo = Math.max(pas, Math.round(besoin / pas) * pas + un([-2, -1, 0, 1, 2]) * pas);
    return {
      text: `${p.txt} ${s.geste} d'${s.objet} rectangulaire de ${lg(L, "m")} sur ${lg(l, "m")}, et ${p.il} veut en faire ${k} fois le tour. ${cap(p.il)} a de quoi faire ${lg(dispo, "m")}. ${un(["Est-ce assez ?", "Cela suffit-il ?", "Peut-" + p.il + " le faire ?"])}`,
      ...assez(dispo, besoin, [T, (L + l) * k], "m"),
      explanation: exp(
        "Le périmètre est la longueur d'un tour.",
        "Un tour (la moitié du tour, on double), puis fois le nombre de tours, et on compare.",
        `${f(L)} + ${f(l)} = ${f(L + l)}, × 2 = ${f(T)}. ${k} tours : ${f(T)} × ${k} = ${f(besoin)}.`,
        dispo === besoin ? "C'est juste assez." : dispo > besoin ? `C'est assez : il en reste ${lg(dispo - besoin, "m")}.` : `Ce n'est pas assez : il en manque ${lg(besoin - dispo, "m")}.`,
      ),
      canvas: dessinRect(L, l, "m", false),
    };
  }),

  // ★3 — deux unités : un tableau de 1,2 m sur 80 cm → en cm
  QUAD("012_unites_differentes", 3, "On convertit d'abord : 1 m = 100 cm. Ensuite la moitié du tour, et on double.", () => {
    const s = un(RECT_SIT.filter((x) => x.u === "cm" && x.max >= 90));
    const p = perso(s.metier);
    const Lm = un([1, 1.2, 1.5, 2, 1.4, 1.6, 1.8, 1.1, 2.5]);
    const Lc = net(Lm * 100);
    const lc = tire(30, Math.min(95, Lc - 10), 5);
    const P = net(2 * (Lc + lc));
    const naif = net(2 * (Lm + lc));
    return {
      text: `${p.txt} ${s.geste} d'${s.objet} rectangulaire de ${lg(Lm, "m")} sur ${lg(lc, "cm")}. ${un([`Combien de centimètres ${de(s.fil)} faut-il ?`, "Quel est son périmètre, en centimètres ?", `Quelle longueur ${de(s.fil)} faut-il, en cm ?`])}`,
      ...qcmN(P, [naif, net(Lc + lc), net(2 * (Lm * 10 + lc)), net(Lc * 2 + lc), net(P + 100)], "cm"),
      explanation: exp(
        "Le périmètre se calcule avec des longueurs dans la même unité.",
        "On convertit d'abord, puis la moitié du tour, et on double.",
        `${lg(Lm, "m")} = ${lg(Lc, "cm")}. ${f(Lc)} + ${f(lc)} = ${f(Lc + lc)}, × 2 = ${f(P)}.`,
        `Il faut ${lg(P, "cm")} ${de(s.fil)}.`,
      ),
      canvas: dessinRectTextes(Lc, lc, lg(Lm, "m"), lg(lc, "cm")),
    };
  }),
];

/* =========================================================
   PERIMETRE_POLYGONE — Inaya, créatrice de bijoux : on coche chaque côté ;
   côtés égaux : un côté fois le nombre de côtés ; quadrillage : seulement le bord
========================================================= */
const POLY = atelierP("polygone");

type SitReg = Sit & { ns: number[] };
const R = (s: Sit, ns: number[]): SitReg => ({ ...s, ns });
const POLY_SIT: readonly SitReg[] = [
  R(S("un pendentif", "entoure d'un fil d'argent le bord", "fil d'argent", ["créatrice de bijoux", "créateur de bijoux"], "cm", 1, 4), [5, 6, 8]),
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
  R(S("une broche", "entoure d'un fil doré le bord", "fil doré", ["bijoutière", "bijoutier"], "cm", 1, 4), [5, 6, 8]),
];
const POLY_SIT_AUTOUR = POLY_SIT.filter((s) => / autour$/.test(s.geste));
/** « à 8 côtés égaux » ou « en forme d'octogone ». */
const formeReg = (n: number) => (NOM_POLY[n] && n > 4 && Math.random() < 0.5 ? `en forme ${VOY.test(NOM_POLY[n]) ? "d'" : "de "}${NOM_POLY[n]}` : `à ${n} côtés égaux`);
const leurresRegulier = (n: number, c: number) => [c * (n - 1), c + n, c * (n + 1), ...(n % 2 === 0 ? [(c * n) / 2] : []), c];
const expRegulier = (n: number, c: number, u: string, conclusion: string) =>
  exp(
    "Le périmètre d'un polygone, c'est la somme de tous ses côtés.",
    "On coche les côtés en faisant le tour. Tous les côtés sont égaux : un côté fois le nombre de côtés.",
    `${n} côtés de ${lg(c, u)} : ${f(c)} × ${n} = ${f(c * n)}.`,
    conclusion || `Le périmètre est ${lg(c * n, u)}.`,
  );
/** Une phrase de situation polygonale : « Inaya, créatrice de bijoux, entoure d'un fil d'argent le bord d'un pendentif à 6 côtés égaux. » */
const phrasePoly = (p: Perso, s: Sit, forme: string) => (/ le bord$/.test(s.geste) ? `${p.txt} ${s.geste} d'${s.objet} ${forme}.` : phraseSit(p, s, forme));
/** La longueur d'un côté de polygone : au dixième pour les bijoux et les petits mètres. */
const cotePoly = (s: Sit) => (s.max <= 6 ? tireD(s.min, s.max) : tire(s.min, s.max, pasDe(s.min)));

const polygoneItems: TutorBankItemV4[] = [
  fixe({
    id: "cm2_perimetre_polygone_fixed_1_simple",
    microId: "perimetre_polygone",
    difficulty: 2,
    theme: "neutral",
    text: "Une figure a pour côtés 3 cm, 4 cm, 5 cm et 6 cm. Quel est son périmètre ?",
    choices: ["18 cm", "12 cm", "24 cm", "15 cm"],
    expected: ["18 cm"],
    hint: "Additionne toutes les longueurs du contour.",
    explanation: exp("Le périmètre d'un polygone est la somme des longueurs de tous ses côtés.", "On additionne tous les côtés donnés.", "3 + 4 + 5 + 6 = 18.", "Le périmètre est 18 cm."),
    tags: ["cm2", "perimetre", "polygone", "qcm"],
  }),
  fixe({
    id: "cm2_perimetre_polygone_fixed_2_canvas_carre_cases",
    microId: "perimetre_polygone",
    difficulty: 3,
    theme: "neutral",
    text: "Observe la figure sur quadrillage. Un carreau mesure 1 cm de côté. Quel est son périmètre ?",
    choices: ["8 cm", "4 cm", "12 cm", "6 cm"],
    expected: ["8 cm"],
    hint: "Compte uniquement le contour extérieur.",
    explanation: exp(
      "Le périmètre est la longueur du contour extérieur.",
      "Sur un quadrillage, on compte les côtés de carreaux sur le bord.",
      "La figure forme un carré de 2 carreaux sur 2. Son bord compte 8 côtés de carreaux (les traits du milieu ne comptent pas).",
      "Le périmètre est 8 cm.",
    ),
    tags: ["cm2", "perimetre", "polygone", "figure_libre", "canvas"],
    canvas: quadrillage([rect(2, 2)]),
  }),
  fixe({
    id: "cm2_perimetre_polygone_fixed_3_canvas_l",
    microId: "perimetre_polygone",
    difficulty: 4,
    theme: "neutral",
    text: "Observe la figure en L sur quadrillage. Un carreau mesure 1 cm de côté. Quel est son périmètre ?",
    choices: ["10 cm", "8 cm", "12 cm", "5 cm"],
    expected: ["10 cm"],
    hint: "Compte seulement le contour extérieur, pas les côtés collés entre deux cases.",
    explanation: exp(
      "Le périmètre est le contour extérieur d'une figure.",
      "Sur une figure faite de carreaux collés, les traits à l'intérieur ne font pas partie du tour.",
      "En suivant le bord de la figure en L, on compte 10 côtés de carreaux.",
      "Le périmètre est 10 cm.",
    ),
    tags: ["cm2", "perimetre", "polygone", "figure_libre", "canvas", "qcm"],
    canvas: quadrillage([[[0, 0], [0, 1], [1, 0], [1, 1], [2, 0]]]),
  }),
  fixe({
    id: "cm2_perimetre_polygone_fixed_4_erreur_interieur",
    microId: "perimetre_polygone",
    difficulty: 4,
    theme: "neutral",
    text: "Sur une figure faite de carreaux collés, faut-il compter les traits qui sont à l'intérieur, entre deux carreaux ?",
    choices: ["non : on ne compte que le bord", "oui : on compte tous les traits", "oui, mais seulement ceux du milieu", "seulement si la figure est carrée"],
    expected: ["non : on ne compte que le bord"],
    hint: "Le périmètre ne compte que le contour extérieur.",
    explanation: exp(
      "Le périmètre est le contour extérieur de la figure.",
      "Les traits entre deux carreaux collés sont à l'intérieur de la figure.",
      "Le fil passe seulement sur le bord : on ne les compte pas.",
      "On ne compte que le bord.",
    ),
    tags: ["cm2", "perimetre", "polygone", "erreur", "qcm"],
    canvas: quadrillage([rect(2, 3)]),
  }),

  // ★2 — un polygone aux côtés différents
  POLY("001_cotes_donnes", 2, "Fais le tour, coche chaque côté, et ajoute-les dans l'ordre.", () => {
    const n = entre(5, 8);
    const u = un(["cm", "m"] as const);
    const { cotes, canvas } = polyCote(n, entre(3, 9), u);
    const P = somme(cotes);
    return {
      text: `${un([`Voici un ${nomPoly(n)}.`, `Observe ce polygone à ${n} côtés.`, "Regarde cette figure.", "Voici un polygone."])} ${un([
        `Ses côtés mesurent ${liste(cotes.map((c) => lg(c, u)))}.`,
        "Lis ses côtés sur le dessin.",
        "Ses côtés sont écrits sur le dessin.",
      ])} ${un([...QUEL_P, "Fais le tour et calcule son périmètre.", "Coche les côtés, puis calcule son périmètre."])}`,
      ...qcmN(P, leurresSomme(cotes), u),
      explanation: exp(
        "Le périmètre d'un polygone, c'est la somme de tous ses côtés.",
        "On part d'un coin, on coche chaque côté, on ajoute dans l'ordre du tour.",
        `${n} côtés : ${plus(cotes)} = ${f(P)}.`,
        `Le périmètre est ${lg(P, u)}.`,
      ),
      canvas,
    };
  }),

  // ★2 — la question de la vidéo : l'octogone de 2,5 cm → 20 cm
  POLY("002_polygone_regulier", 2, "Tous les côtés sont égaux : un côté fois le nombre de côtés.", () => {
    const n = un([5, 6, 6, 7, 8, 8, 9, 10, 12]);
    const u = un(["cm", "m"] as const);
    const c = un([tireD(1, 9), tireD(1, 9), entre(2, 15), entre(1, 8) * 5]);
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
  POLY("003_quel_calcul_regulier", 2, "Coche les côtés en faisant le tour, puis : un côté fois le nombre de côtés.", () => {
    const n = un([5, 6, 7, 8, 9, 10]);
    const u = un(["cm", "m"] as const);
    const c = un([entre(2, 12), tireD(1, 6)]);
    const a = lg(c, u);
    return {
      text: `${un(["Ce polygone a tous ses côtés égaux.", `Tous les côtés de ce ${nomPoly(n)} sont égaux.`, "Les côtés de cette figure sont tous égaux."])} ${un(["Quel calcul donne son périmètre ?", "Quel calcul donne son tour ?", "Choisis le bon calcul pour son périmètre.", "Compte ses côtés : quel calcul donne son périmètre ?"])}`,
      ...qcm(`${a} × ${n}`, [`${a} × ${n - 1}`, `${a} + ${n}`, `${a} × ${a}`, `${a} × ${n + 1}`]),
      explanation: expRegulier(n, c, u, `Le bon calcul est ${a} × ${n}.`),
      canvas: dessinRegulier(n, c, u),
    };
  }),

  // ★2 — sur quadrillage : le tour en côtés de carreaux
  POLY("004_figure_libre_simple", 2, "Compte les côtés de carreaux du BORD, pas les traits du dedans.", () => {
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

  // ★3 — le pendentif d'Inaya (6 côtés de 1,2 cm) et ses cousins : côtés égaux en histoire
  POLY("005_regulier_contexte", 3, "Compte les côtés, puis un côté fois le nombre de côtés.", () => {
    const s = un(POLY_SIT);
    const p = perso(s.metier);
    const n = un(s.ns);
    const c = cotePoly(s);
    return {
      text: `${phrasePoly(p, s, formeReg(n))} ${un([`Chaque côté mesure ${lg(c, s.u)}.`, `Ses côtés mesurent tous ${lg(c, s.u)}.`, `Ses ${n} côtés font ${lg(c, s.u)} chacun.`])} ${un(QFIL(s))}`,
      ...qcmN(c * n, leurresRegulier(n, c), s.u),
      explanation: expRegulier(n, c, s.u, `Il faut ${lg(c * n, s.u)} ${de(s.fil)}.`),
      canvas: dessinRegulier(n, c, s.u),
    };
  }),

  // ★3 — l'exercice de la vidéo : 5 côtés différents (2 ; 1,5 ; 3 ; 2,5 ; 1 cm)
  POLY("006_differents_contexte", 3, "On ajoute les côtés dans l'ordre du tour, en cochant chacun, virgules alignées.", () => {
    const n = entre(5, 7);
    if (Math.random() < 0.4) {
      const u = un(["cm", "m"] as const);
      const { cotes, canvas } = polyCote(n, entre(2, 6), u, { deci: true });
      const P = somme(cotes);
      return {
        text: `${un([`Un ${nomPoly(n)} a des côtés de ${liste(cotes.map((c) => lg(c, u)))}.`, `Les ${n} côtés d'un polygone mesurent ${liste(cotes.map((c) => lg(c, u)))}.`])} ${un(QUEL_P)}`,
        ...qcmN(P, leurresSomme(cotes), u),
        explanation: exp("Le périmètre d'un polygone, c'est la somme de tous ses côtés.", "On ajoute les côtés dans l'ordre du tour, en alignant les virgules.", `${plus(cotes)} = ${f(P)}.`, `Le périmètre est ${lg(P, u)}.`),
        ...(Math.random() < 0.7 ? { canvas } : {}),
      };
    }
    const s = un(POLY_SIT);
    const p = perso(s.metier);
    const petit = s.max <= 6;
    const { cotes, canvas } = polyCote(n, (s.min + s.max) / 2, s.u, petit ? { deci: true } : { pas: pasDe(s.min) });
    const P = somme(cotes);
    return {
      text: `${phrasePoly(p, s, `à ${n} côtés`)} ${un([`Les côtés mesurent ${liste(cotes.map((c) => lg(c, s.u)))}.`, "Les côtés sont écrits sur le dessin.", "Lis ses côtés sur le dessin."])} ${un(QFIL(s))}`,
      ...qcmN(P, leurresSomme(cotes, petit ? 0.1 : pasDe(s.min)), s.u),
      explanation: exp(
        "Le périmètre d'un polygone, c'est la somme de tous ses côtés.",
        "On ajoute les côtés dans l'ordre du tour, en cochant chacun.",
        `${plus(cotes)} = ${f(P)}.`,
        `Il faut ${lg(P, s.u)} ${de(s.fil)}.`,
      ),
      canvas,
    };
  }),

  // ★3 — est-ce assez ?
  POLY("007_est_ce_assez", 3, "Calcule le tour (un côté fois le nombre de côtés), puis compare.", () => {
    const s = un(POLY_SIT);
    const p = perso(s.metier);
    const n = un(s.ns);
    const petit = s.max <= 6;
    const pas = petit ? 0.5 : pasDe(s.min);
    const c = cotePoly(s);
    const P = net(c * n);
    const dispo = Math.max(pas, net(Math.round(P / pas) * pas + un([-2, -1, 1, 2]) * Math.max(pas, Math.round(c / 3 / pas) * pas)));
    return {
      text: `${p.txt} veut faire le tour d'${s.objet} à ${n} côtés égaux de ${lg(c, s.u)}. ${cap(p.il)} a ${lg(dispo, s.u)} ${de(s.fil)}. ${un(["Est-ce assez ?", "Cela suffit-il ?", `A-t-${p.il} assez ${de(s.fil)} ?`, "Est-ce suffisant ?"])}`,
      ...assez(dispo, P, [c * (n - 1), n % 2 === 0 ? P / 2 : c * (n + 1)], s.u),
      explanation: expRegulier(
        n,
        c,
        s.u,
        dispo === P ? "C'est juste assez." : dispo > P ? `${f(dispo)} − ${f(P)} = ${f(dispo - P)} : c'est assez, il en reste ${lg(dispo - P, s.u)}.` : `${f(P)} − ${f(dispo)} = ${f(P - dispo)} : ce n'est pas assez, il en manque ${lg(P - dispo, s.u)}.`,
      ),
      canvas: dessinRegulier(n, c, s.u),
    };
  }),

  // ★3 — l'étoile : deux côtés par pointe
  POLY("008_etoile", 3, "Coche les côtés : une étoile a DEUX côtés par pointe.", () => {
    const N = un([4, 5, 5, 6, 8]);
    const u = "cm";
    const c = un([entre(3, 9), entre(2, 6) * 5, tireD(2, 8)]);
    const p = perso();
    const quoi = un(["une étoile pour le sapin", "une étoile de shérif", "une étoile en carton", "une étoile pour la fête", "une étoile pour sa chambre", "un badge en étoile", "un gâteau en étoile", "un pendentif en étoile", "une broche en étoile"]);
    return {
      text: `${p.nom} fabrique ${quoi}, à ${N} pointes. Tous ses côtés mesurent ${lg(c, u)}. ${un([
        `${cap(p.il)} veut une guirlande tout autour. Combien de ${motU(u)} faut-il ?`,
        "Quel est son périmètre ?",
        "Combien mesure le tour de l'étoile ?",
        `${cap(p.il)} colle un ruban autour. Quelle longueur de ruban faut-il ?`,
      ])}`,
      ...qcmN(2 * N * c, [N * c, c + 2 * N, (2 * N - 1) * c, c * N + c], u),
      explanation: exp(
        "Le périmètre est la somme de tous les côtés.",
        "On coche les côtés en faisant le tour : chaque pointe a 2 côtés.",
        `${N} pointes, donc ${2 * N} côtés. ${f(c)} × ${2 * N} = ${f(2 * N * c)}.`,
        `Le périmètre est ${lg(2 * N * c, u)}.`,
      ),
      canvas: dessinEtoile(N, c, u),
    };
  }),

  // ★3 — quadrillage aux carreaux de 2 cm, 1 m ou 5 m (la broche en L de la vidéo)
  POLY("009_quadrillage_carreaux", 3, "Compte les côtés de carreaux du bord, puis multiplie par la longueur d'un côté de carreau.", () => {
    const cases = polyomino(7, 4);
    const n = contour(cases);
    const [k, u] = un<[number, U]>([[1, "cm"], [2, "cm"], [2, "cm"], [1, "m"], [5, "m"], [3, "cm"], [10, "m"], [4, "cm"]]);
    const cadre = un(["", "Voici le plan d'un jardin. ", "Voici une figure. ", "Voici le plan d'une terrasse. ", "Voici un motif de mosaïque. ", "Inaya dessine une broche. ", "Voici le plan d'un parc. "]);
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

  // ★3 — le short : le train de biscuits (4 biscuits carrés de 10 cm → 100 cm, pas 160 cm)
  POLY("010_carres_colles", 3, "Le ruban ne passe pas ENTRE les carrés collés : seulement sur le bord.", () => {
    const [quoi, u, cs, metier] = un<[string, U, number[], readonly [string, string]]>([
      ["biscuits carrés", "cm", [5, 6, 8, 10, 12], ["pâtissière", "pâtissier"]],
      ["carreaux de faïence", "cm", [10, 15, 20], ["carreleuse", "carreleur"]],
      ["tables carrées", "cm", [60, 70, 80, 90], ["serveuse", "serveur"]],
      ["photos carrées", "cm", [9, 10, 12, 15], ["photographe", "photographe"]],
      ["tatamis carrés", "m", [1, 2], ["professeure de judo", "professeur de judo"]],
      ["dalles carrées", "cm", [20, 25, 30, 40, 50], ["maçonne", "maçon"]],
      ["stands carrés", "m", [3, 4, 5], ["organisatrice", "organisateur"]],
      ["coussins carrés", "cm", [30, 40, 45, 50], ["couturière", "couturier"]],
      ["post-it carrés", "cm", [5, 7, 8], ["secrétaire", "secrétaire"]],
      ["cartes carrées", "cm", [6, 8, 10], ["illustratrice", "illustrateur"]],
    ]);
    const p = perso(metier);
    const n = entre(2, 6);
    const h = n >= 3 && Math.random() < 0.3 ? 2 : 1;
    const c = un(cs);
    const total = h * n;
    const P = 2 * (n + h) * c;
    const fil = un(["un ruban", "une guirlande", "un liseré", "une frise"]);
    const ligne = h === 1 ? `${n} ${quoi} de ${lg(c, u)} de côté, collés en ligne` : `${total} ${quoi} de ${lg(c, u)} de côté, sur 2 rangées de ${n}`;
    return {
      text: `${p.txt} assemble ${ligne}. ${cap(p.il)} pose ${fil} tout autour. ${un([`Combien de ${motU(u)} faut-il ?`, "Quelle longueur faut-il ?", "Quel est le périmètre de l'assemblage ?", "Combien mesure le tour ?"])}`,
      ...qcmN(P, [4 * c * total, 2 * n * c, (2 * n + 1) * c, 4 * c, P + 2 * c], u),
      explanation: exp(
        "Le périmètre est le tour de l'assemblage : les traits entre deux carrés collés ne comptent pas.",
        "On compte les côtés sur le bord : en haut, en bas, et à chaque bout.",
        `En haut et en bas : ${n} × ${f(c)} = ${f(n * c)} chacun. Les deux bouts : ${h} × ${f(c)} = ${f(h * c)} chacun. ${f(n * c)} + ${f(n * c)} + ${f(h * c)} + ${f(h * c)} = ${f(P)}.`,
        `Il faut ${lg(P, u)}, pas ${lg(4 * c * total, u)}.`,
      ),
      canvas: quadrillage([rect(h, n)]),
    };
  }),

  // ★4 — le défi de la vidéo : une bobine de 50 cm, combien de pendentifs à 6 côtés de 1,2 cm ?
  POLY("011_combien_de_pendentifs", 4, "Un tour d'abord ; puis combien de tours tiennent dans la bobine (on vérifie en multipliant).", () => {
    const s = un(POLY_SIT.filter((x) => x.u === "cm" && x.max <= 15));
    const p = perso(s.metier);
    const n = un(s.ns);
    const c = s.max <= 6 ? tireD(s.min, s.max) : tire(s.min, s.max, 1);
    const P = net(c * n);
    const k = entre(3, 9);
    const reste = s.max <= 6 ? net(entre(1, Math.max(1, Math.floor(P * 10) - 1)) / 10) : entre(1, Math.max(1, Math.floor(P) - 1));
    const B = net(P * k + reste);
    const objets = pluriel(s.objet);
    return {
      text: `${p.txt} a ${lg(B, s.u)} ${de(s.fil)}. Chaque ${nomDe(s.objet)} a ${n} côtés égaux de ${lg(c, s.u)}, et il faut en faire tout le tour. ${un([
        `Combien ${de(objets)} peut-${p.il} entourer ?`,
        `Combien ${de(objets)} complets peut-${p.il} faire ?`.replace(/complets/, estF(s.objet) ? "complètes" : "complets"),
        `Pour combien ${de(objets)} a-t-${p.il} assez ${de(s.fil)} ?`,
      ])}`,
      ...qcm(`${k} ${objets}`, [k + 1, k - 1, Math.floor(B / c), k + 2].filter((x) => x > 1 && x !== k).map((x) => `${x} ${objets}`)),
      explanation: exp(
        "Le périmètre d'un polygone aux côtés égaux : un côté fois le nombre de côtés.",
        "Un tour d'abord ; puis on cherche combien de tours tiennent dans la longueur qu'on a.",
        `Un tour : ${f(c)} × ${n} = ${f(P)}. ${k} tours : ${f(P)} × ${k} = ${f(P * k)} (assez). ${k + 1} tours : ${f(P * (k + 1))} (trop).`,
        `${cap(p.il)} peut en faire ${k}.`,
      ),
      canvas: dessinRegulier(n, c, s.u),
    };
  }),

  // ★4 — le piège de la vidéo : compter les traits du milieu, « on trouve trop »
  POLY("012_traits_interieurs", 4, "Seulement le bord : les traits entre deux carreaux collés ne sont pas sur le tour.", () => {
    const cases = polyomino(6, 4);
    const P = contour(cases);
    const interieurs = (4 * cases.length - P) / 2;
    const faux = P + interieurs;
    const [k, u] = un<[number, U]>([[1, "cm"], [1, "cm"], [2, "cm"], [1, "m"], [5, "m"]]);
    const p = perso();
    return {
      text: `${un(UN_CARREAU(k, u))} ${p.nom} compte tous les traits de la figure, même ceux du milieu, et trouve ${lg(faux * k, u)}. ${un(["Quel est le vrai périmètre ?", "Corrige : quel est le périmètre de la figure ?", "Combien mesure vraiment le tour ?"])}`,
      ...qcmN(P * k, [faux * k, cases.length * k, (P + 2) * k, 4 * cases.length * k], u),
      explanation: exp(
        "Le périmètre est la longueur du tour : seulement le bord.",
        "On ne compte pas les traits entre deux carreaux collés : le fil ne passe pas par là.",
        `Sur le bord : ${P} côtés de carreaux${k > 1 ? `, × ${k} = ${P * k}` : ""}. Les ${interieurs} traits du milieu, en trop, donnaient ${faux * k}.`,
        `Le périmètre est ${lg(P * k, u)}.`,
      ),
      canvas: quadrillage([cases]),
    };
  }),

  // ★4 — deux rectangles mis bout à bout : le tour de l'assemblage
  POLY("013_rectangles_bout_a_bout", 4, "Dessine le tour de l'assemblage : le côté collé disparaît, il n'est plus sur le bord.", () => {
    const [quoi, u, mi, ma, metier, fe] = un<[string, U, number, number, readonly [string, string], boolean?]>([
      ["deux tables rectangulaires", "cm", 80, 180, ["serveuse", "serveur"], true],
      ["deux tapis rectangulaires", "cm", 60, 200, ["tapissière", "tapissier"]],
      ["deux potagers rectangulaires", "m", 4, 15, ["jardinière", "jardinier"]],
      ["deux scènes rectangulaires", "m", 4, 12, ["régisseuse", "régisseur"], true],
      ["deux plaques de bois rectangulaires", "cm", 40, 120, ["menuisière", "menuisier"], true],
      ["deux affiches rectangulaires", "cm", 30, 90, ["graphiste", "graphiste"], true],
      ["deux enclos rectangulaires", "m", 6, 30, ["éleveuse", "éleveur"]],
      ["deux bacs à fleurs rectangulaires", "cm", 40, 120, ["fleuriste", "fleuriste"]],
    ]);
    const p = perso(metier);
    const [L, l] = dimensions(mi, ma, u === "m");
    const P = net(2 * (2 * L + l));
    const pts: Pt[] = [{ x: 0, y: 0 }, { x: L, y: 0 }, { x: 2 * L, y: 0 }, { x: 2 * L, y: Math.max(l, L / 2.5) }, { x: L, y: Math.max(l, L / 2.5) }, { x: 0, y: Math.max(l, L / 2.5) }];
    const m = morceau(pts, [lg(L, u), lg(L, u), lg(l, u), null, null, null]);
    m.segments.push({ a: "p1", b: "p4", pointille: true });
    return {
      text: `${p.txt} met ${quoi} ${fe ? "pareilles" : "pareils"} bout à bout, par leur petit côté. ${fe ? "Chacune" : "Chacun"} mesure ${lg(L, u)} sur ${lg(l, u)}. ${un(["Quel est le périmètre de l'assemblage ?", "Combien mesure le tour de l'ensemble ?", `${cap(p.il)} pose une bordure tout autour : quelle longueur faut-il ?`])}`,
      ...qcmN(P, [4 * (L + l), 2 * (L + l), 2 * (L + 2 * l), 2 * (2 * L + l) + 2 * l], u),
      explanation: exp(
        "Le périmètre est le tour de l'assemblage, sans le côté collé au milieu.",
        "Une grande longueur de 2 longueurs, et une largeur : moitié du tour, puis on double.",
        `${f(L)} + ${f(L)} = ${f(2 * L)}. ${f(2 * L)} + ${f(l)} = ${f(2 * L + l)}, × 2 = ${f(P)}.`,
        `Le périmètre est ${lg(P, u)}, et pas ${lg(4 * (L + l), u)}.`,
      ),
      canvas: construction([m], "Deux rectangles collés bout à bout"),
    };
  }),

  // ★4 — carreaux de 0,5 cm : on compte le bord, puis × 0,5
  POLY("014_carreaux_decimaux", 4, "Compte les côtés de carreaux du bord, puis multiplie par la longueur d'un côté.", () => {
    const cases = polyomino(7, 4);
    const n = contour(cases);
    const [k, u] = un<[number, U]>([[0.5, "cm"], [0.5, "cm"], [1.5, "cm"], [2.5, "m"], [0.5, "m"], [1.5, "m"]]);
    const cadre = un(["", "Voici une broche. ", "Voici le plan d'un jardin. ", "Voici un motif de broderie. ", "Voici le plan d'une salle. ", "Voici une mosaïque. "]);
    return {
      text: `${cadre}${un(UN_CARREAU(k, u))} ${un(["Quel est le périmètre de la figure ?", "Combien mesure son tour ?", "Trouve son périmètre.", "Combien mesure le contour ?"])}`.trim(),
      ...qcmN(net(n * k), [n, net(cases.length * k), net((n - 2) * k), net((n + 2) * k), net(n / k)], u),
      explanation: exp(
        "Le périmètre est la longueur du tour.",
        "On compte les côtés de carreaux du bord, puis on multiplie par la longueur d'un côté de carreau.",
        `${n} côtés de carreaux de ${lg(k, u)} : ${n} × ${f(k)} = ${f(n * k)}.`,
        `Le périmètre est ${lg(n * k, u)}.`,
      ),
      canvas: quadrillage([cases]),
    };
  }),
];

/* =========================================================
   PERIMETRE_DEFI — Malo, technicien en robotique : les rouleaux, le côté caché, ce qu'il reste à acheter
========================================================= */
const DEFI = atelierP("defi");

/** « 2 rouleaux », « 1 rouleau ». */
const rouleaux = (n: number) => `${n} rouleau${n > 1 ? "x" : ""}`;

const defiItems: TutorBankItemV4[] = [
  fixe({
    id: "cm2_perimetre_defi_fixed_1_jardin",
    microId: "perimetre_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un jardin rectangulaire mesure 18,5 m sur 12 m. Le fil du robot tondeuse est vendu en rouleaux de 50 m. Combien de rouleaux faut-il pour faire tout le tour ?",
    choices: ["2 rouleaux", "1 rouleau", "3 rouleaux", "4 rouleaux"],
    expected: ["2 rouleaux"],
    hint: "Calcule d'abord le périmètre du jardin.",
    explanation: exp(
      "Le fil fait le tour du jardin : c'est son périmètre.",
      "La moitié du tour, on double ; puis on compare avec les rouleaux.",
      "18,5 + 12 = 30,5, × 2 = 61. Un rouleau (50 m) ne suffit pas ; deux rouleaux (100 m), oui.",
      "Il faut 2 rouleaux.",
    ),
    tags: ["cm2", "perimetre", "defi", "rectangle", "rouleaux"],
    canvas: dessinRect(18.5, 12, "m", false),
  }),
  fixe({
    id: "cm2_perimetre_defi_fixed_2_carre_inverse",
    microId: "perimetre_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un carré a un périmètre de 28 cm. Combien mesure un côté ?",
    choices: ["7 cm", "14 cm", "24 cm", "112 cm"],
    expected: ["7 cm"],
    hint: "Dans un carré, les 4 côtés sont égaux.",
    explanation: exp("Le périmètre d'un carré est égal à 4 fois le côté.", "Pour retrouver un côté, on divise le périmètre par 4. On vérifie.", "28 ÷ 4 = 7. On vérifie : 7 × 4 = 28.", "Un côté mesure 7 cm."),
    tags: ["cm2", "perimetre", "defi", "inverse", "carre"],
    canvas: dessinCarre("?", "cm"),
  }),
  fixe({
    id: "cm2_perimetre_defi_fixed_3_rectangle_inverse",
    microId: "perimetre_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Un rectangle a un périmètre de 18 cm. Sa longueur mesure 6 cm. Quelle est sa largeur ?",
    choices: ["3 cm", "12 cm", "6 cm", "9 cm"],
    expected: ["3 cm"],
    hint: "Prends d'abord la moitié du tour.",
    explanation: exp(
      "Dans un rectangle, la moitié du tour, c'est une longueur plus une largeur.",
      "On prend la moitié du périmètre, puis on enlève la longueur.",
      "18 ÷ 2 = 9. 9 − 6 = 3. On vérifie : 6 + 3 = 9, × 2 = 18.",
      "La largeur mesure 3 cm.",
    ),
    tags: ["cm2", "perimetre", "defi", "inverse", "rectangle"],
    canvas: dessinRect(6, 3, "cm", false, 1),
  }),
  fixe({
    id: "cm2_perimetre_defi_fixed_4_meme_perimetre",
    microId: "perimetre_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Un rectangle de 8 m sur 5 m et un carré de 6,5 m de côté ont-ils le même périmètre ?",
    choices: ["oui : 26 m chacun", "non : le rectangle a le plus grand", "non : le carré a le plus grand", "on ne peut pas comparer"],
    expected: ["oui : 26 m chacun"],
    hint: "Calcule les deux tours.",
    explanation: exp(
      "Le périmètre mesure la longueur totale du contour.",
      "Rectangle : moitié du tour, on double. Carré : le côté fois 4.",
      "8 + 5 = 13, × 2 = 26. 6,5 × 4 = 26.",
      "Oui : deux figures différentes peuvent avoir le même périmètre.",
    ),
    tags: ["cm2", "perimetre", "defi", "raisonnement", "qcm"],
  }),

  // ★4 — le carré dont on connaît le tour (34 m → 8,5 m ; le short : 36 m → 9 m)
  DEFI("001_carre_inverse", 4, "Un carré a 4 côtés égaux : on divise le périmètre par 4, et on vérifie.", () => {
    const [o, u, max] = un(CARRE_COURTS);
    const c = Math.random() < 0.4 ? coteCourt(max, 25, true) : coteCourt(max, 25);
    const P = net(4 * c);
    const sujet = o === "un carré" ? o : carreAccorde(o);
    return {
      text: `${un([`${cap(sujet)} a un périmètre de ${lg(P, u)}.`, `Le tour ${du(sujet)} mesure ${lg(P, u)}.`, `Il faut ${lg(P, u)} de ruban pour faire le tour ${du(sujet)}.`, `On utilise ${lg(P, u)} ${un(["de ruban", "de fil", "de cordon", "de galon"])} pour entourer ${sujet}.`])} ${un(["Combien mesure un côté ?", "Quelle est la longueur d'un côté ?", "Combien mesure chaque côté ?"])}`,
      ...qcmN(c, [P / 2, P - 4, P * 4, c * 2, P / 4 + 4], u),
      explanation: exp(
        "Le périmètre d'un carré, c'est le côté fois 4.",
        "Les 4 côtés sont égaux : on divise par 4, puis on vérifie.",
        `${f(P)} ÷ 4 = ${f(c)}. On vérifie : ${f(c)} × 4 = ${f(P)}.`,
        `Un côté mesure ${lg(c, u)}.`,
      ),
      canvas: dessinCarre("?", u),
    };
  }),

  // ★4 — l'exercice de la vidéo : périmètre 50 m, longueur 15 m → largeur 10 m
  DEFI("002_rectangle_largeur", 4, "La moitié du tour (périmètre ÷ 2), c'est longueur + largeur ; on enlève la longueur.", () => {
    const s = un(RECT_SIT);
    const [L, l] = dimensions(s.min, s.max, s.u === "m");
    const P = net(2 * (L + l));
    const p = perso(s.metier);
    const debut = Math.random() < 0.35
      ? `Un rectangle a un périmètre de ${lg(P, s.u)}. Sa longueur mesure ${lg(L, s.u)}.`
      : `${p.txt} a utilisé ${lg(P, s.u)} ${de(s.fil)} pour faire le tour d'${s.objet} rectangulaire. ${cap(le(s.objet))} mesure ${lg(L, s.u)} de long.`;
    return {
      text: `${debut} ${un(["Combien mesure la largeur ?", "Quelle est sa largeur ?", "Et la largeur ?"])}`,
      ...qcmN(l, [P - L, P / 2, P - 2 * L, P / 4, (P - L) / 2], s.u),
      explanation: exp(
        "Le périmètre d'un rectangle : (longueur + largeur) × 2.",
        "On prend la moitié du tour, puis on enlève la longueur. On vérifie.",
        `${f(P)} ÷ 2 = ${f(L + l)} : la moitié du tour. ${f(L + l)} − ${f(L)} = ${f(l)}. On vérifie : ${f(L)} + ${f(l)} = ${f(L + l)}, × 2 = ${f(P)}.`,
        `La largeur mesure ${lg(l, s.u)}.`,
      ),
      canvas: dessinRect(L, l, s.u, false, 1),
    };
  }),

  // ★4 — la vidéo : 61 m de fil, des rouleaux de 50 m → 2 rouleaux
  DEFI("003_rouleaux", 4, "Calcule le tour, puis cherche combien de rouleaux il faut pour le couvrir (un rouleau entamé compte).", () => {
    const s = un(RECT_SIT.filter((x) => x.u === "m" && /clôture|grillage|fil|ruban/.test(x.fil)));
    const p = perso(s.metier);
    const carre = Math.random() < 0.3;
    const [L, l] = carre ? (() => { const c = tireD(s.min, s.max); return [c, c]; })() : dimensions(s.min, s.max, true);
    const P = net(carre ? 4 * L : 2 * (L + l));
    const R = un([10, 20, 25, 50, 100].filter((r) => P / r > 1.2 && P / r < 7)) ?? 10;
    const nOk = Math.ceil(net(P / R));
    const forme = carre ? `${carreAccorde(s.objet)} de ${lg(L, "m")} de côté` : `${s.objet} rectangulaire de ${lg(L, "m")} sur ${lg(l, "m")}`;
    return {
      text: `${p.txt} ${s.geste} d'${forme}. ${un([`On achète ${le("un " + s.fil).replace(/^(le|la) un[e]? /, "")} en rouleaux de ${lg(R, "m")}.`, `Le magasin vend des rouleaux de ${lg(R, "m")}.`, `Cela se vend en rouleaux de ${lg(R, "m")}.`])} ${un(["Combien de rouleaux faut-il acheter ?", `Combien de rouleaux doit-${p.il} acheter ?`, "Combien de rouleaux faut-il, au minimum ?"])}`,
      ...qcm(rouleaux(nOk), [nOk - 1, nOk + 1, Math.floor(P / R) === nOk ? nOk + 2 : Math.floor(P / R), Math.ceil(((carre ? 2 * L : L + l)) / R)].filter((x) => x >= 1 && x !== nOk).map(rouleaux)),
      explanation: exp(
        "Le fil fait le tour : on calcule le périmètre.",
        carre ? "Pour un carré : le côté fois 4. Puis on compare avec les rouleaux." : "La moitié du tour, on double. Puis on compare avec les rouleaux.",
        `${carre ? `${f(L)} × 4 = ${f(P)}` : `${f(L)} + ${f(l)} = ${f(L + l)}, × 2 = ${f(P)}`}. ${nOk - 1 >= 1 ? `${rouleaux(nOk - 1)} : ${f((nOk - 1) * R)} m, pas assez. ` : ""}${rouleaux(nOk)} : ${f(nOk * R)} m, assez.`,
        `Il faut ${rouleaux(nOk)}.`,
      ),
      canvas: carre ? dessinCarre(L, "m") : dessinRect(L, l, "m", false),
    };
  }),

  // ★4 — Karim et ses rangées de fil : un tour, puis fois le nombre de rangées
  DEFI("004_rangees", 4, "D'abord un tour (moitié du tour, on double), puis fois le nombre de rangées.", () => {
    const p = perso(["éleveuse", "éleveur"]);
    const k = entre(2, 5);
    const [L, l] = dimensions(10, 80, true);
    const lieu = un(["un pré", "un enclos à moutons", "un potager", "un champ", "un parc à chevaux", "un poulailler", "un verger", "un enclos à chèvres", "un pré pour les ânes", "un jardin"]);
    const T = net(2 * (L + l));
    const rang = un(["rangées de fil", "rangs de fil de fer", "rangées de corde", "tours de fil"]);
    return {
      text: `${p.txt} pose une clôture autour d'${lieu} rectangulaire de ${lg(L, "m")} sur ${lg(l, "m")}. ${cap(p.il)} met ${k} ${rang}. ${un(["Combien de mètres de fil faut-il ?", "Quelle longueur de fil faut-il en tout ?", `Combien de mètres de fil doit-${p.il} acheter ?`])}`,
      ...qcmN(T * k, [T, (L + l) * k, T + k, T * (k - 1)], "m"),
      explanation: exp(
        "Le périmètre est la longueur d'un tour.",
        "Plusieurs rangées : on calcule un tour, puis on multiplie.",
        `${f(L)} + ${f(l)} = ${f(L + l)} : la moitié du tour. × 2 = ${f(T)}. ${k} rangées : ${f(T)} × ${k} = ${f(T * k)}.`,
        `Il faut ${lg(T * k, "m")} de fil.`,
      ),
      canvas: dessinRect(L, l, "m", false),
    };
  }),

  // ★4 — le défi de la vidéo : un carré de 9,5 m, déjà 15 m de fil : combien acheter ?
  DEFI("005_encore_a_acheter", 4, "Le tour d'abord ; puis on enlève ce qu'on a déjà.", () => {
    const s = un(RECT_SIT.filter((x) => x.u === "m" && /clôture|grillage|fil|ruban/.test(x.fil)));
    const p = perso(s.metier);
    const carre = Math.random() < 0.5;
    const [L, l] = carre ? (() => { const c = tireD(Math.max(3, s.min), Math.min(30, s.max)); return [c, c]; })() : dimensions(s.min, s.max, true);
    const P = net(carre ? 4 * L : 2 * (L + l));
    const deja = net(Math.max(1, Math.floor(P * un([0.2, 0.3, 0.4, 0.5]))));
    const reste = net(P - deja);
    const forme = carre ? `${carreAccorde(s.objet)} de ${lg(L, "m")} de côté` : `${s.objet} rectangulaire de ${lg(L, "m")} sur ${lg(l, "m")}`;
    return {
      text: `${p.txt} ${s.geste} d'${forme}. ${cap(p.il)} a déjà un vieux morceau de ${lg(deja, "m")}. ${un([`Combien de mètres doit-${p.il} encore acheter ?`, `Quelle longueur lui manque-t-il ?`, "Combien de mètres faut-il encore acheter ?"])}`,
      ...qcmN(reste, [P, carre ? net(L * 4 + deja) : net(L + l - deja), net(P + deja), carre ? net(L * 2 - deja) : net(2 * L + l - deja)], "m"),
      explanation: exp(
        "Ce qu'on pose tout autour mesure le périmètre.",
        "Le tour d'abord, puis on enlève ce qu'on a déjà.",
        `${carre ? `${f(L)} × 4 = ${f(P)}` : `${f(L)} + ${f(l)} = ${f(L + l)}, × 2 = ${f(P)}`}. ${f(P)} − ${f(deja)} = ${f(reste)}.`,
        `Il faut encore acheter ${lg(reste, "m")}.`,
      ),
      canvas: carre ? dessinCarre(L, "m") : dessinRect(L, l, "m", false),
    };
  }),

  // ★4 — le piège de la vidéo : « 50 − 15 = 35 », on oublie que le tour contient DEUX longueurs
  DEFI("006_piege_largeur", 4, "Le tour contient DEUX longueurs : d'abord la moitié du tour, puis on enlève la longueur.", () => {
    const s = un(RECT_SIT);
    const [L, l] = dimensions(s.min, s.max);
    const P = 2 * (L + l);
    const p = perso();
    return {
      text: `${cap(s.objet)} rectangulaire a un périmètre de ${lg(P, s.u)} et une longueur de ${lg(L, s.u)}. ${p.nom} calcule ${f(P)} − ${f(L)} = ${f(P - L)} et dit que la largeur mesure ${lg(P - L, s.u)}. ${un(["Quelle est la vraie largeur ?", "Corrige : combien mesure la largeur ?", `${cap(p.il)} se trompe. Quelle est la largeur ?`])}`,
      ...qcmN(l, [P - L, P / 2, P - 2 * L > 0 ? P - 2 * L : P / 4, (P - L) / 2], s.u),
      explanation: exp(
        "Le périmètre contient deux longueurs et deux largeurs.",
        "On prend d'abord la moitié du tour, puis on enlève la longueur.",
        `${f(P)} ÷ 2 = ${f(L + l)}. ${f(L + l)} − ${f(L)} = ${f(l)}. (${f(P)} − ${f(L)} enlevait une seule longueur.)`,
        `La largeur mesure ${lg(l, s.u)}.`,
      ),
      canvas: dessinRect(L, l, s.u, false, 1),
    };
  }),

  // ★4 — le côté qui manque d'un triangle : le périmètre moins les côtés connus
  DEFI("007_cote_manquant_triangle", 4, "Le côté qui manque : le périmètre MOINS les côtés connus.", () => {
    const s = un(TRI_SIT_AUTOUR);
    const deci = s.u === "m" && s.max <= 40;
    const cotes = cotesTriangle(s.min, s.max, "quelconque", deci ? { deci: true } : {});
    const [a, b, c] = cotes;
    const P = somme(cotes);
    const p = perso(s.metier);
    const debut = Math.random() < 0.3
      ? `Un triangle a un périmètre de ${lg(P, s.u)}. Deux de ses côtés mesurent ${lg(a, s.u)} et ${lg(b, s.u)}.`
      : `${p.txt} a ${lg(P, s.u)} ${de(s.fil)} : juste de quoi faire le tour d'${s.objet} triangulaire. Deux côtés mesurent ${lg(a, s.u)} et ${lg(b, s.u)}.`;
    return {
      text: `${debut} ${un(["Combien mesure le troisième côté ?", "Et le troisième côté ?", "Quelle est la longueur du dernier côté ?"])}`,
      ...qcmN(c, [a + b, a + b + P, P - a, P - b, c + 10], s.u),
      explanation: exp(
        "Le périmètre est la somme des 3 côtés.",
        "Un côté qui manque : le périmètre moins les côtés connus. On vérifie.",
        `${f(a)} + ${f(b)} = ${f(a + b)}. ${f(P)} − ${f(a + b)} = ${f(c)}. On vérifie : ${plus(cotes)} = ${f(P)}.`,
        `Le troisième côté mesure ${lg(c, s.u)}.`,
      ),
      canvas: dessinTri(cotes, s.u, { cache: 2 }),
    };
  }),

  // ★4 — le triangle à deux côtés égaux, dont on connaît le tour et la base
  DEFI("008_isocele_inverse", 4, "Enlève la base du périmètre, puis partage le reste en 2 côtés égaux.", () => {
    const s = un(TRI_SIT_AUTOUR);
    const deci = s.u === "m" && s.max <= 40;
    const [a, b] = cotesTriangle(s.min, s.max, "isocele", deci ? { deci: true } : {});
    const P = net(a + 2 * b);
    const p = perso(s.metier);
    const debut = Math.random() < 0.35
      ? `Un triangle a deux côtés égaux. Son périmètre est ${lg(P, s.u)} et son troisième côté mesure ${lg(a, s.u)}.`
      : `${p.txt} a ${lg(P, s.u)} ${de(s.fil)} : juste de quoi faire le tour d'${s.objet} triangulaire aux deux côtés égaux. Le troisième côté mesure ${lg(a, s.u)}.`;
    return {
      text: `${debut} ${un(["Combien mesure chacun des deux côtés égaux ?", "Quelle est la longueur de chaque côté égal ?"])}`,
      ...qcmN(b, [P - a, (P + a) / 2, P / 3, P - 2 * a, P / 2], s.u),
      explanation: exp(
        "Le périmètre est la somme des 3 côtés.",
        "On enlève le côté connu, puis on partage le reste entre les 2 côtés égaux.",
        `${f(P)} − ${f(a)} = ${f(2 * b)}. ${f(2 * b)} ÷ 2 = ${f(b)}.`,
        `Chaque côté égal mesure ${lg(b, s.u)}.`,
      ),
      canvas: dessinTri([a, b, b], s.u, { codes: [0, 1, 1] }),
    };
  }),

  // ★5 — rangées ET rouleaux : un tour, × rangées, puis combien de rouleaux
  DEFI("009_rangees_et_rouleaux", 5, "Un tour, puis fois le nombre de rangées ; enfin combien de rouleaux pour couvrir le tout.", () => {
    const p = perso(["éleveuse", "éleveur"]);
    const k = entre(2, 4);
    const lieu = un(["un pré", "un enclos", "un parc", "un champ", "un potager", "un poulailler", "un verger"]);
    const carre = Math.random() < 0.5;
    const [L, l] = carre ? (() => { const c = entre(3, 12) * 5; return [c, c]; })() : dimensions(10, 60);
    const T = carre ? 4 * L : 2 * (L + l);
    const besoin = T * k;
    const R = un([50, 100, 100, 200].filter((r) => besoin / r > 1.2 && besoin / r < 9)) ?? 100;
    const n = Math.ceil(besoin / R);
    const forme = carre ? `${carreAccorde(lieu)} de ${lg(L, "m")} de côté` : `${lieu} rectangulaire de ${lg(L, "m")} sur ${lg(l, "m")}`;
    return {
      text: `${p.txt} clôture ${forme} avec ${k} rangées de fil. Le fil est vendu en rouleaux de ${lg(R, "m")}. ${un(["Combien de rouleaux faut-il acheter ?", `Combien de rouleaux doit-${p.il} acheter ?`, "Combien de rouleaux, au minimum ?"])}`,
      ...qcm(rouleaux(n), [n - 1, n + 1, Math.ceil(T / R), Math.ceil(((carre ? 2 * L : L + l) * k) / R), n + 2].filter((x) => x >= 1 && x !== n).map(rouleaux)),
      explanation: exp(
        "Un tour de clôture, c'est le périmètre.",
        "Un tour, puis fois le nombre de rangées ; on cherche enfin combien de rouleaux couvrent cette longueur.",
        `Un tour : ${carre ? `${f(L)} × 4` : `(${f(L)} + ${f(l)}) × 2`} = ${f(T)}. ${k} rangées : ${f(T)} × ${k} = ${f(besoin)}. ${rouleaux(n)} : ${f(n * R)} m${n > 1 ? ` ; ${rouleaux(n - 1)} : ${f((n - 1) * R)} m, pas assez` : ""}.`,
        `Il faut ${rouleaux(n)}.`,
      ),
      canvas: carre ? dessinCarre(L, "m") : dessinRect(L, l, "m", false),
    };
  }),

  // ★5 — la figure en L : deux côtés à retrouver
  DEFI("010_figure_en_l", 5, "Retrouve les deux côtés cachés avec les grands côtés, puis fais le tour.", () => {
    const s = un(RECT_SIT.filter((x) => x.u === "m"));
    const p = perso(s.metier);
    const W = entre(8, 24);
    const H = entre(6, Math.min(18, W));
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
        `Côtés cachés : ${W} − ${W - a} = ${a} et ${H} − ${H - b} = ${b}. Tour : ${plus(cotes)} = ${P}.`,
        `Il faut ${lg(P, "m")} ${de(s.fil)}.`,
      ),
      canvas: construction([morceau(ptsEnL(W, H, a, b), textes, { droits: true })], "Une figure en L dont quatre côtés sont écrits"),
    };
  }),

  // ★5 — deux figures sur quadrillage : un coin enlevé ne change pas toujours le tour
  DEFI("011_meme_perimetre_quadrillage", 5, "Compte le bord de chaque figure : enlever un coin ne change pas toujours le tour.", () => {
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
    const [k, u] = un<[number, U]>([[1, "cm"], [2, "cm"], [1, "m"], [5, "m"]]);
    if (Math.random() < 0.5) {
      const juste = pa === pb ? "oui, elles ont le même périmètre" : pa > pb ? "non, celle de gauche a le plus grand périmètre" : "non, celle de droite a le plus grand périmètre";
      return {
        text: `${un(UN_CARREAU(k, u))} ${cas.dit} au rectangle de gauche pour obtenir la figure de droite. ${un(["Ont-elles le même périmètre ?", "Leurs périmètres sont-ils égaux ?"])}`,
        ...qcm(juste, ["oui, elles ont le même périmètre", "non, celle de gauche a le plus grand périmètre", "non, celle de droite a le plus grand périmètre"]),
        explanation: exp(
          "Le périmètre est la longueur du tour, pas le nombre de carreaux.",
          "On compte les côtés de carreaux du bord de chaque figure.",
          `À gauche : ${lg(pa * k, u)}. À droite : ${lg(pb * k, u)}.${pa === pb ? " Le coin enlevé retire 2 bouts de bord, mais en fait apparaître 2 autres." : ""}`,
          `${cap(juste)}.`,
        ),
        canvas: quadrillage([A, B]),
      };
    }
    return {
      text: `${un(UN_CARREAU(k, u))} ${cas.dit} au rectangle de gauche pour obtenir la figure de droite. ${un(["Quel est le périmètre de la figure de droite ?", "Combien mesure le tour de la figure de droite ?"])}`,
      ...qcmN(pb * k, [(pa === pb ? pb - 2 : pa) * k, B.length * k, (pb + 2) * k, (pb - 1) * k], u),
      explanation: exp(
        "Le périmètre est la longueur du tour.",
        "On compte les côtés de carreaux du bord de la figure de droite.",
        `Le rectangle de gauche a un tour de ${lg(pa * k, u)} ; la figure de droite, ${pb} côtés de carreaux : ${lg(pb * k, u)}.`,
        `Le périmètre est ${lg(pb * k, u)}.`,
      ),
      canvas: quadrillage([A, B]),
    };
  }),

  // ★5 — un carré qui a le même tour qu'un rectangle : combien mesure son côté ?
  DEFI("012_carre_meme_tour", 5, "Le tour du rectangle d'abord ; puis ce tour ÷ 4 donne le côté du carré.", () => {
    const quoi = un([
      ["un rectangle", "un carré", un(["cm", "m"] as const)], ["un enclos rectangulaire", "un enclos carré", "m"], ["un jardin rectangulaire", "un jardin carré", "m"],
      ["un cadre rectangulaire", "un cadre carré", "cm"], ["une nappe rectangulaire", "une nappe carrée", "cm"], ["un potager rectangulaire", "un potager carré", "m"],
      ["une étiquette rectangulaire", "une étiquette carrée", "cm"], ["une scène rectangulaire", "une scène carrée", "m"],
    ] as const);
    const u = quoi[2];
    const L = u === "cm" && /nappe/.test(quoi[0]) ? tire(80, 200, 10) : entre(6, 30);
    const l = u === "cm" && /nappe/.test(quoi[0]) ? tire(40, L - 20, 10) : entre(2, L - 2);
    const P = 2 * (L + l);
    const c = net(P / 4);
    const p = perso();
    return {
      text: `${p.nom} a juste assez de ruban pour faire le tour d'${quoi[0]} de ${lg(L, u)} sur ${lg(l, u)}. Avec le même ruban, ${p.il} veut entourer ${quoi[1]}. ${un(["Combien doit mesurer son côté ?", "Quelle longueur doit avoir chaque côté ?", "Combien mesure un côté de cette nouvelle forme ?"])}`,
      ...qcmN(c, [net((L + l) / 4), P, net(P / 2), net(L - l), net(c + 1)], u),
      explanation: exp(
        "Le même ruban fait le même tour : les deux figures ont le même périmètre.",
        "Le tour du rectangle (moitié du tour, on double), puis ÷ 4 pour le côté du carré.",
        `${f(L)} + ${f(l)} = ${f(L + l)}, × 2 = ${f(P)}. ${f(P)} ÷ 4 = ${f(c)}. On vérifie : ${f(c)} × 4 = ${f(P)}.`,
        `Le côté du carré mesure ${lg(c, u)}.`,
      ),
      canvas: dessinRect(L, l, u, false),
    };
  }),

  // ★5 — la longueur est le double (ou le triple) de la largeur
  DEFI("013_longueur_double", 5, "Dessine-le : la moitié du tour, c'est 3 (ou 4) largeurs mises bout à bout.", () => {
    const s = un(RECT_SIT);
    const fois = un([2, 2, 3]);
    const l = s.u === "m" ? entre(2, 20) : tire(10, 60, 5);
    const L = fois * l;
    const P = 2 * (L + l);
    const p = perso(s.metier);
    const mot = fois === 2 ? "le double" : "le triple";
    return {
      text: `${p.txt} fait le tour d'${s.objet} rectangulaire avec ${lg(P, s.u)} ${de(s.fil)}. La longueur est ${mot} de la largeur. ${un(["Combien mesure la largeur ?", "Quelle est la largeur ?", "Trouve la largeur."])}`,
      ...qcmN(l, [P / 2, P / 4, L, P / (2 * fois), P / 3], s.u),
      explanation: exp(
        "La moitié du tour, c'est une longueur plus une largeur.",
        `La longueur vaut ${fois} largeurs : la moitié du tour fait ${fois + 1} largeurs.`,
        `${f(P)} ÷ 2 = ${f(L + l)}. ${f(L + l)} ÷ ${fois + 1} = ${f(l)}. On vérifie : longueur ${f(L)}, ${f(L)} + ${f(l)} = ${f(L + l)}, × 2 = ${f(P)}.`,
        `La largeur mesure ${lg(l, s.u)}.`,
      ),
      canvas: dessinRectTextes(L, l, `${fois} × ?`, "?"),
    };
  }),

  // ★5 — des piquets tout autour : un tous les … mètres
  DEFI("014_piquets", 5, "Autour d'une figure fermée, il y a autant de piquets que d'intervalles : périmètre ÷ écart.", () => {
    const p = perso(un([["éleveuse", "éleveur"], ["jardinière", "jardinier"], ["agricultrice", "agriculteur"], ["paysagiste", "paysagiste"]] as const));
    const e = un([2, 2, 3, 4, 5, 10]);
    const carre = Math.random() < 0.4;
    const L = carre ? e * entre(3, 10) : e * entre(4, 15);
    const l = carre ? L : e * entre(2, L / e - 1);
    const P = carre ? 4 * L : 2 * (L + l);
    const n = P / e;
    const lieu = un(["un enclos", "un pré", "un potager", "un champ", "un verger", "un parc"]);
    const forme = carre ? `${carreAccorde(lieu)} de ${lg(L, "m")} de côté` : `${lieu} rectangulaire de ${lg(L, "m")} sur ${lg(l, "m")}`;
    return {
      text: `${p.txt} plante des piquets tout autour d'${forme}, un piquet tous les ${lg(e, "m")}, en commençant par un coin. ${un(["Combien de piquets faut-il ?", `Combien de piquets plante-t-${p.il} ?`, "Combien de piquets en tout ?"])}`,
      ...qcm(`${n} piquets`, [n + 1, n - 1, n + 4, carre ? L / e : (L + l) / e].filter((x) => x > 1 && x !== n).map((x) => `${x} piquets`)),
      explanation: exp(
        "Les piquets sont posés sur le tour : on calcule le périmètre.",
        "Sur un tour fermé, il y a autant de piquets que d'intervalles : périmètre ÷ écart.",
        `${carre ? `${f(L)} × 4` : `(${f(L)} + ${f(l)}) × 2`} = ${f(P)}. ${f(P)} ÷ ${e} = ${n}.`,
        `Il faut ${n} piquets.`,
      ),
      canvas: carre ? dessinCarre(L, "m") : dessinRect(L, l, "m", false),
    };
  }),

  // ★5 — qui parcourt le plus ? (deux terrains, plusieurs tours)
  DEFI("015_qui_parcourt_le_plus", 5, "Calcule chaque distance (un tour × le nombre de tours), puis la différence.", () => {
    const pa = perso();
    let pb = perso();
    while (pb.nom === pa.nom) pb = perso();
    const c = entre(10, 40);
    const [L, l] = dimensions(15, 80);
    const ka = entre(2, 5);
    const kb = entre(2, 5);
    const da = 4 * c * ka;
    const db = 2 * (L + l) * kb;
    if (da === db) return { ...qcm("autant l'un que l'autre", ["autant l'un que l'autre", `${pa.nom}`, `${pb.nom}`, "on ne peut pas savoir"]), text: `${pa.nom} fait ${ka} tours d'un terrain carré de ${lg(c, "m")} de côté. ${pb.nom} fait ${kb} tours d'un terrain rectangulaire de ${lg(L, "m")} sur ${lg(l, "m")}. Qui parcourt le plus de mètres ?`, explanation: exp("La distance, c'est un tour fois le nombre de tours.", "On calcule chaque distance, puis on compare.", `${pa.nom} : ${c} × 4 × ${ka} = ${da}. ${pb.nom} : (${L} + ${l}) × 2 × ${kb} = ${db}.`, "Ils parcourent la même distance."), canvas: dessinRect(L, l, "m", false) };
    const diff = Math.abs(da - db);
    const plusLoin = da > db ? pa.nom : pb.nom;
    return {
      text: `${pa.nom} fait ${ka} tours d'un terrain carré de ${lg(c, "m")} de côté. ${pb.nom} fait ${kb} tours d'un terrain rectangulaire de ${lg(L, "m")} sur ${lg(l, "m")}. ${un(["Qui parcourt le plus, et de combien de mètres ?", "Lequel des deux court le plus loin, et de combien ?"])}`,
      ...qcm(`${plusLoin}, de ${lg(diff, "m")}`, [
        `${plusLoin === pa.nom ? pb.nom : pa.nom}, de ${lg(diff, "m")}`,
        `${plusLoin}, de ${lg(Math.abs(c * ka - (L + l) * kb) || diff + 10, "m")}`,
        `${plusLoin}, de ${lg(Math.abs(4 * c - 2 * (L + l)) || diff + 20, "m")}`,
        "ils parcourent la même distance",
      ]),
      explanation: exp(
        "La distance parcourue, c'est un tour (le périmètre) fois le nombre de tours.",
        "On calcule chaque distance, puis la différence.",
        `${pa.nom} : ${c} × 4 = ${4 * c}, × ${ka} = ${da}. ${pb.nom} : (${L} + ${l}) × 2 = ${2 * (L + l)}, × ${kb} = ${db}. Différence : ${Math.max(da, db)} − ${Math.min(da, db)} = ${diff}.`,
        `${plusLoin} parcourt ${lg(diff, "m")} de plus.`,
      ),
      canvas: construction(
        [
          morceau(ptsRectangle(c, c), [lg(c, "m"), null, null, null], { droits: true, codes: [3, 3, 3, 3], prefixe: "c" }),
          morceau(ptsRectangle(L, l), [lg(L, "m"), lg(l, "m"), null, null], { droits: true, codes: [1, 2, 1, 2], prefixe: "r", dx: c + Math.max(c, L) * 0.35 }),
        ],
        "Un terrain carré et un terrain rectangulaire, côtés écrits",
        320,
      ),
    };
  }),
];

export const perimetresBank: TutorBankItemV4[] = [...comprendreItems, ...triangleItems, ...quadrilatereItems, ...polygoneItems, ...defiItems];
