// GABARITS « FIGURES PLANES » CM1 (14/11/2026) : triangles, quadrilatères,
// cercle, propriétés, construire, défis.
//
// ⛔ CM1 = zéro clavier : que des QCM (3 ou 4 choix), leurres = vraies erreurs
// d'élève (carré « pas un rectangle », losange = carré penché, rayon et
// diamètre confondus, isocèle et équilatéral, compas ouvert au diamètre…).
// ⭐ Chaque gabarit tire une SITUATION (objet, métier) × une TOURNURE × des
// nombres : le squelette change même quand les noms de points sont neutralisés
// (`mesurer-squelettes-coach.ts … --lettres`).
// ⭐ Les dessins passent par le canvas `construction` (coordonnées de maths,
// cadre ajusté seul) : polygone rempli, petits carrés des angles droits,
// petits traits des longueurs égales, longueurs écrites sur les côtés.

import type { CanvasFigure, TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { figureConstruction, point, polygoneRegulier, surCercle, type P } from "@/lib/canvas/construction";
import { LETTRES, atelier, entre, etapes, fr, melange, qcm, qcmN, tournure, un } from "./trous-outils";

/* ═════════════════ dessins ═════════════════ */

const lettres = (n: number) => melange([...LETTRES]).slice(0, n);

type Forme =
  | "carre" | "rectangle" | "losange" | "parallelogramme" | "trapeze" | "quadri"
  | "triRect" | "isocele" | "equilateral" | "triQuelconque"
  | "pentagone" | "hexagone" | "octogone";

const SOMMETS: Record<Forme, () => P[]> = {
  carre: () => [point(0, 0), point(4, 0), point(4, 4), point(0, 4)],
  rectangle: () => { const l = un([2.2, 2.6, 3]); return [point(0, 0), point(6, 0), point(6, l), point(0, l)]; },
  losange: () => { const h = un([1.7, 2.1, 2.4]); return [point(0, -h), point(3.3, 0), point(0, h), point(-3.3, 0)]; },
  parallelogramme: () => [point(0, 0), point(5, 0), point(6.5, 3), point(1.5, 3)],
  trapeze: () => [point(0, 0), point(6, 0), point(4.5, 3), point(1.5, 3)],
  quadri: () => [point(0, 0), point(5.5, 0.4), point(4.6, 3.4), point(0.8, 2.6)],
  triRect: () => { const h = un([3, 3.5, 4]); return [point(0, 0), point(5, 0), point(0, h)]; },
  isocele: () => { const h = un([4, 4.6, 5.2]); return [point(-2.4, 0), point(2.4, 0), point(0, h)]; },
  equilateral: () => polygoneRegulier(3, 3, 90),
  triQuelconque: () => [point(0, 0), point(6, 0), point(1.6, 3.4)],
  pentagone: () => polygoneRegulier(5, 3, 90),
  hexagone: () => polygoneRegulier(6, 3, 90),
  octogone: () => polygoneRegulier(8, 3, 112.5),
};

const tourner = (ps: P[], deg: number): P[] => {
  const c = { x: ps.reduce((s, p) => s + p.x, 0) / ps.length, y: ps.reduce((s, p) => s + p.y, 0) / ps.length };
  const a = (deg * Math.PI) / 180;
  return ps.map((p) => ({ x: c.x + (p.x - c.x) * Math.cos(a) - (p.y - c.y) * Math.sin(a), y: c.y + (p.x - c.x) * Math.sin(a) + (p.y - c.y) * Math.cos(a) }));
};

type OptsPoly = {
  /** Noms des sommets ; absents = sommets sans nom (dessin d'objet). */
  noms?: string[];
  /** Indices des sommets qui portent un petit carré. */
  droits?: number[];
  /** [indice du côté, nombre de petits traits] ; le côté i va du sommet i au sommet i + 1. */
  codes?: Array<[number, number]>;
  /** Longueurs écrites sur les côtés. */
  textes?: Record<number, string>;
  /** Segments en plus (diagonales, médianes), par indices de sommets ou points ajoutés. */
  traits?: Array<[number, number]>;
  rot?: number;
  description?: string;
};

/** Le codage complet d'une figure usuelle (ce que l'élève doit lire). */
const CODAGE: Partial<Record<Forme, Pick<OptsPoly, "droits" | "codes">>> = {
  carre: { droits: [0, 1, 2, 3], codes: [[0, 1], [1, 1], [2, 1], [3, 1]] },
  rectangle: { droits: [0, 1, 2, 3] },
  losange: { codes: [[0, 1], [1, 1], [2, 1], [3, 1]] },
  triRect: { droits: [0] },
  isocele: { codes: [[1, 1], [2, 1]] },
  equilateral: { codes: [[0, 1], [1, 1], [2, 1]] },
};

/** Un polygone tracé : sommets, codage, longueurs écrites. */
function poly(forme: Forme, o: OptsPoly = {}): CanvasFigure {
  let ps = SOMMETS[forme]();
  const rot = o.rot ?? un([0, 0, 0, -12, 10, 18, -20]);
  if (rot) ps = tourner(ps, rot);
  const n = ps.length;
  const ids = ps.map((_, i) => o.noms?.[i] ?? `S${i}`);
  const pts: Record<string, P> = Object.fromEntries(ids.map((id, i) => [id, ps[i]]));
  const segments: { a: string; b: string; code?: number; texte?: string; pointille?: boolean }[] = [];
  for (let i = 0; i < n; i++) {
    const code = o.codes?.find((c) => c[0] === i)?.[1];
    const texte = o.textes?.[i];
    if (code || texte) segments.push({ a: ids[i], b: ids[(i + 1) % n], ...(code ? { code } : {}), ...(texte ? { texte } : {}) });
  }
  for (const [a, b] of o.traits ?? []) segments.push({ a: ids[a], b: ids[b] });
  const angles = (o.droits ?? []).map((i) => ({ sommet: ids[i], de: ids[(i + n - 1) % n], vers: ids[(i + 1) % n], droit: true }));
  return figureConstruction(pts, { polygones: [{ sommets: ids }], segments, angles, ...(o.description ? { description: o.description } : {}) }, o.noms ? [] : ids) as CanvasFigure;
}

/** La figure usuelle avec son codage complet. */
const code = (forme: Forme, o: OptsPoly = {}) => poly(forme, { ...CODAGE[forme], ...o });

type OptsRond = {
  montrer?: "rayon" | "diametre" | "centre" | "cercle" | "disque" | "aucun";
  texte?: string;
  centre?: string;
  noms?: [string, string];
  deg?: number;
};

const ROUGE = "#dc2626";

/** Un cercle de centre nommé, avec un élément mis en couleur. */
function rond(o: OptsRond = {}): CanvasFigure {
  const c = o.centre ?? "O";
  const [a, b] = o.noms ?? ["A", "B"];
  const deg = o.deg ?? un([0, 20, 35, -25, 160, 200]);
  const m = o.montrer ?? "aucun";
  const pts: Record<string, P> = { [c]: point(0, 0) };
  const segments: { a: string; b: string; texte?: string; couleur?: string; epais?: boolean }[] = [];
  if (m === "rayon") { pts[a] = surCercle(point(0, 0), 1, deg); segments.push({ a: c, b: a, couleur: ROUGE, epais: true, ...(o.texte ? { texte: o.texte } : {}) }); }
  if (m === "diametre") { pts[a] = surCercle(point(0, 0), 1, deg); pts[b] = surCercle(point(0, 0), 1, deg + 180); segments.push({ a, b, couleur: ROUGE, epais: true, ...(o.texte ? { texte: o.texte } : {}) }); }
  return {
    kind: "construction",
    points: Object.entries(pts).map(([id, p]) => ({ id, x: p.x, y: p.y, ...(id === c && m === "centre" ? { couleur: ROUGE } : {}) })),
    cercles: [{ centre: c, rayon: 1, ...(m === "cercle" ? { couleur: ROUGE } : {}), ...(m === "disque" ? { fond: "rgba(220, 38, 38, 0.22)" } : {}) }],
    segments,
  } as CanvasFigure;
}

/** n cercles de même rayon alignés dans une boîte, un rayon écrit. */
function rangee(n: number, texte: string, boite = true): CanvasFigure {
  const pts: { id: string; x: number; y: number; cache?: boolean }[] = [];
  const cercles: { centre: string; rayon: number }[] = [];
  for (let i = 0; i < n; i++) { pts.push({ id: `O${i}`, x: 1 + 2 * i, y: 1, cache: true }); cercles.push({ centre: `O${i}`, rayon: 1 }); }
  pts.push({ id: "R", x: 2, y: 1, cache: true });
  const coins = [point(0, 0), point(2 * n, 0), point(2 * n, 2), point(0, 2)].map((p, i) => ({ id: `K${i}`, x: p.x, y: p.y, cache: true }));
  return {
    kind: "construction",
    points: [...pts, ...(boite ? coins : [])],
    cercles,
    polygones: boite ? [{ sommets: ["K0", "K1", "K2", "K3"], fond: "rgba(0,0,0,0)" }] : [],
    segments: [{ a: "O0", b: "R", couleur: ROUGE, epais: true, texte }],
  } as CanvasFigure;
}

/** Un cercle juste dans un carré (galette dans sa boîte). */
function rondDansCarre(texte: string, diametre: boolean): CanvasFigure {
  return {
    kind: "construction",
    points: [
      { id: "O", x: 0, y: 0 }, { id: "A", x: diametre ? -1 : 1, y: 0, cache: true }, { id: "B", x: 1, y: 0, cache: true },
      ...[[-1, -1], [1, -1], [1, 1], [-1, 1]].map(([x, y], i) => ({ id: `K${i}`, x, y, cache: true })),
    ],
    cercles: [{ centre: "O", rayon: 1 }],
    polygones: [{ sommets: ["K0", "K1", "K2", "K3"], fond: "rgba(0,0,0,0)" }],
    angles: [{ sommet: "K0", de: "K3", vers: "K1", droit: true }],
    segments: [{ a: diametre ? "A" : "O", b: "B", couleur: ROUGE, epais: true, texte }],
  } as CanvasFigure;
}

/* ═════════════════ situations ═════════════════ */

/** [qui fait quoi, objet au démonstratif, unité vraisemblable] : la figure dessinée est l'objet.
 *  ⛔ L'unité suit l'objet : pas de biscuit de 12 m ni de pelouse de 4 mm. */
const SITU: [string, string, string][] = [
  ["Une couturière découpe", "ce fanion", "cm"], ["Un menuisier scie", "cette planchette", "cm"], ["Une architecte dessine", "ce toit", "m"],
  ["Un marin hisse", "cette voile", "m"], ["Une graphiste dessine", "ce logo", "cm"], ["Un pâtissier découpe", "ce biscuit", "cm"],
  ["Une élève découpe", "cette pièce de puzzle", "cm"], ["Un jardinier trace", "ce massif de fleurs", "m"], ["Une carreleuse pose", "ce carreau", "cm"],
  ["Un vitrier coupe", "cette vitre", "dm"], ["Une peintre colorie", "ce morceau de fresque", "dm"], ["Un cuisinier coupe", "ce sandwich", "cm"],
  ["Une ingénieure dessine", "cette pièce de pont", "m"], ["Un enfant plie", "cette serviette", "cm"], ["Une modéliste découpe", "ce patron", "cm"],
  ["Un paysagiste trace", "cette pelouse", "m"], ["Une décoratrice colle", "cet autocollant", "cm"], ["Un forgeron soude", "cette plaque", "dm"],
];
export const intro = () => { const [q, o, u] = un(SITU); return { phrase: `${q} ${o}.`, objet: o, u }; };

/** Objets ronds, au démonstratif, avec une unité et un rayon vraisemblables. */
const RONDS: [string, string, string, number, number][] = [
  ["Un mécanicien répare", "cette roue de vélo", "cm", 20, 35], ["Une horlogère règle", "cette horloge", "cm", 10, 25], ["Un pâtissier décore", "cette tarte", "cm", 10, 16],
  ["Une architecte dessine", "ce rond-point", "m", 10, 30], ["Un joueur vise", "cette cible", "cm", 10, 30], ["Une musicienne frappe", "ce tambour", "cm", 10, 30],
  ["Un jardinier creuse", "ce bassin", "m", 2, 6], ["Une gymnaste saute sur", "ce trampoline", "dm", 10, 20], ["Un forain repeint", "ce manège", "m", 4, 9],
  ["Un cuisinier pose", "cette assiette", "cm", 10, 14], ["Une marin regarde par", "ce hublot", "cm", 15, 30], ["Un serveur essuie", "cette table ronde", "cm", 40, 70],
  ["Une clown entre sur", "cette piste de cirque", "m", 5, 7], ["Un boulanger cuit", "cette galette", "cm", 10, 20], ["Une potière tourne", "ce vase vu de dessus", "cm", 5, 12],
  ["Un enfant fait rouler", "cette pièce de monnaie", "mm", 8, 14], ["Une astronome observe", "ce cadran solaire", "cm", 20, 50], ["Un pizzaïolo étale", "cette pizza", "cm", 12, 20],
];
export const introRond = () => { const [q, o, u, a, b] = un(RONDS); return { phrase: `${q} ${o}.`, objet: o, u, r: () => entre(a, b) }; };

const PRENOMS = ["Léo", "Inès", "Noah", "Jade", "Sami", "Lina", "Hugo", "Maya", "Adam", "Zoé", "Nina", "Tom", "Yanis", "Chloé", "Ilyes", "Rose"];

/* ═════════════════ noms ═════════════════ */

const NOM_TRI = { triRect: "Un triangle rectangle", isocele: "Un triangle isocèle", equilateral: "Un triangle équilatéral", triQuelconque: "Un triangle quelconque" } as const;
type FormeTri = keyof typeof NOM_TRI;
const NOM_QUAD = { carre: "Un carré", rectangle: "Un rectangle", losange: "Un losange", quadri: "Un quadrilatère quelconque" } as const;
type FormeQuad = keyof typeof NOM_QUAD;
const NOM_COTES: Record<number, string> = { 3: "Un triangle", 4: "Un quadrilatère", 5: "Un pentagone", 6: "Un hexagone", 8: "Un octogone" };
const FORME_COTES: Record<number, Forme[]> = { 3: ["triRect", "isocele", "equilateral", "triQuelconque"], 4: ["carre", "rectangle", "losange", "trapeze", "quadri"], 5: ["pentagone"], 6: ["hexagone"], 8: ["octogone"] };
/** « de » ou « d' » devant le mot. */
const de = (mot: string) => (/^[aeiouéèh]/i.test(mot) ? "d'" : "de ");
const bas = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);
const PRECIS = ["Quel est son nom le plus précis ?", "Donne son nom le plus précis.", "Quel nom précis lui donner ?", "Nomme cette figure le plus précisément possible."];

/* ═════════════════ figure_triangle ═════════════════ */

const T = atelier("cm1", "figure_plane", "figure_triangle", "cm1_");
const HINT_T = "Petit carré : un angle droit. Mêmes petits traits : mêmes longueurs.";

export const triangleGabarits: TutorBankItemV4[] = [
  T(10, 1, "Compte les côtés : 3 côtés, c'est un triangle ; 4 côtés, un quadrilatère.", () => {
    const n = un([3, 3, 3, 4, 5, 6]);
    const s = intro();
    return {
      text: tournure([s.phrase], ["Compte ses côtés.", "Regarde ses côtés.", ""], ["Comment s'appelle cette figure ?", "Quel est le nom de cette forme ?", "Quelle figure reconnais-tu ?", "Quelle est cette figure ?"]),
      ...qcm(NOM_COTES[n], [NOM_COTES[3], NOM_COTES[4], NOM_COTES[5], NOM_COTES[6]]),
      canvas: poly(un(FORME_COTES[n])),
      explanation: etapes("on compte les côtés de la figure.", `elle a ${n} côtés.`, `c'est ${bas(NOM_COTES[n])}.`),
    };
  }),
  T(11, 1, "Un sommet est un coin de la figure. Compte-les un par un.", () => {
    const n = un([3, 3, 3, 4, 5]);
    const quoi = un(["côtés", "sommets"]);
    const s = intro();
    return {
      text: tournure([s.phrase], [`Combien de ${quoi} a cette figure ?`, `Compte ses ${quoi}. Combien y en a-t-il ?`, `Combien de ${quoi} vois-tu ?`, `Combien de ${quoi} possède cette forme ?`]),
      ...qcmN(n, [n - 1, n + 1, n + 2, 2 * n]),
      canvas: poly(un(FORME_COTES[n]), { noms: lettres(n) }),
      explanation: etapes(`on compte les ${quoi} un par un.`, `il y en a ${n}.`, `la figure a ${n} ${quoi}${n === 3 ? " : c'est un triangle" : ""}.`),
    };
  }),
  T(12, 1, HINT_T, () => {
    const f = un<FormeTri>(["triRect", "isocele", "equilateral", "triQuelconque"]);
    const s = intro();
    return {
      text: tournure([s.phrase], ["Lis le codage.", "Regarde les petits traits et les petits carrés.", "Observe les marques.", ""], ["Quel est le nom le plus précis de ce triangle ?", "Donne le nom le plus précis de ce triangle.", "Nomme ce triangle le plus précisément possible."]),
      ...qcm(NOM_TRI[f], Object.values(NOM_TRI)),
      canvas: code(f),
      explanation: etapes("on lit le codage.", f === "triRect" ? "un petit carré : un angle droit." : f === "isocele" ? "deux côtés portent le même trait : 2 côtés égaux." : f === "equilateral" ? "les trois côtés portent le même trait." : "aucun angle droit, aucun côté codé égal.", `c'est ${bas(NOM_TRI[f])}.`),
    };
  }),
  T(13, 2, "Compare les trois longueurs : 2 égales, 3 égales ou toutes différentes ?", () => {
    const f = un<FormeTri>(["isocele", "isocele", "equilateral", "equilateral", "triQuelconque"]);
    const s = intro(), u = s.u;
    const a = entre(4, 12);
    let b = entre(3, 9); while (b === a) b = entre(3, 9);
    const L = f === "equilateral" ? [a, a, a] : f === "isocele" ? [b, a, a] : [a + 3, a + 1, a];
    const fig = f === "triQuelconque" ? poly("triQuelconque", { textes: { 0: `${L[0]} ${u}`, 1: `${L[1]} ${u}`, 2: `${L[2]} ${u}` } }) : poly(f, { textes: { 0: `${L[0]} ${u}`, 1: `${L[1]} ${u}`, 2: `${L[2]} ${u}` } });
    return {
      text: tournure([s.phrase], [`Ses côtés mesurent ${melange(L.map(fr)).join(` ${u}, `)} ${u}.`, `Ses trois côtés mesurent ${melange(L.map(fr)).join(` ${u}, `)} ${u}.`, `Les longueurs des côtés sont ${melange(L.map(fr)).join(` ${u}, `)} ${u}.`], PRECIS),
      ...qcm(NOM_TRI[f], [NOM_TRI.isocele, NOM_TRI.equilateral, NOM_TRI.triQuelconque, NOM_TRI.triRect]),
      canvas: fig,
      explanation: etapes("on compare les longueurs des trois côtés.", f === "equilateral" ? "les 3 côtés ont la même longueur." : f === "isocele" ? "2 côtés seulement ont la même longueur." : "les 3 longueurs sont différentes.", `c'est ${bas(NOM_TRI[f])}.`),
    };
  }),
  T(14, 2, "Les côtés qui portent le même petit trait ont la même longueur.", () => {
    const f = un<"isocele" | "equilateral">(["isocele", "equilateral"]);
    const ls = lettres(3);
    const s = intro(), u = s.u;
    const a = entre(4, 15);
    let b = entre(3, 12); while (b === a) b = entre(3, 12);
    // côté 0 : [ls0 ls1] (base de l'isocèle) ; côtés 1 et 2 codés égaux.
    const connu = `[${ls[1]}${ls[2]}]`, cherche = `[${ls[2]}${ls[0]}]`;
    return {
      text: tournure([s.phrase], f === "isocele" ? [`${connu} mesure ${a} ${u} et [${ls[0]}${ls[1]}] mesure ${b} ${u}.`, `Le côté ${connu} mesure ${a} ${u}, la base [${ls[0]}${ls[1]}] ${b} ${u}.`] : [`${connu} mesure ${a} ${u}.`, `Le côté ${connu} mesure ${a} ${u}.`], [`Combien mesure ${cherche} ?`, `Quelle est la longueur de ${cherche} ?`, `Lis le codage : combien mesure ${cherche} ?`]),
      ...qcmN(a, f === "isocele" ? [b, a + b, 2 * a, a + 1] : [2 * a, 3 * a, a + 1, a - 1], u),
      canvas: code(f, { noms: ls, textes: (f === "isocele" ? { 0: `${b} ${u}`, 1: `${a} ${u}` } : { 1: `${a} ${u}` }) as Record<number, string> }),
      explanation: etapes(`${cherche} porte le même petit trait que ${connu}.`, `ils ont la même longueur : ${a} ${u}.`, `${cherche} mesure ${a} ${u}.`),
    };
  }),
  T(15, 2, HINT_T, () => {
    const f = un<"triRect" | "isocele" | "equilateral">(["triRect", "isocele", "equilateral"]);
    const VRAI = { triRect: "Il a un angle droit.", isocele: "Il a deux côtés de même longueur.", equilateral: "Ses trois côtés ont la même longueur." };
    const FAUX = {
      triRect: ["Il a trois côtés égaux.", "Il a deux angles droits.", "Il a quatre sommets.", "Il n'a aucun angle droit."],
      isocele: ["Il a un angle droit.", "Ses trois côtés ont la même longueur.", "Il a quatre côtés.", "Tous ses côtés sont différents."],
      equilateral: ["Il a un angle droit.", "Ses trois côtés sont différents.", "Il a quatre sommets.", "Un seul côté est codé."],
    };
    const s = intro();
    return {
      text: tournure([s.phrase], ["Quelle phrase est vraie pour ce triangle ?", "Quelle phrase décrit bien ce triangle ?", "Que montre le codage de ce triangle ?", "Quelle affirmation est juste ?"]),
      ...qcm(VRAI[f], FAUX[f]),
      canvas: code(f),
      explanation: etapes("on lit les petits carrés et les petits traits.", f === "triRect" ? "un petit carré : un angle droit." : f === "isocele" ? "deux côtés portent le même trait." : "les trois côtés portent le même trait.", bas(VRAI[f])),
    };
  }),
];

/* ═════════════════ figure_quadrilatere ═════════════════ */

const Q = atelier("cm1", "figure_plane", "figure_quadrilatere", "cm1_");
const HINT_Q = "Carré : 4 angles droits ET 4 côtés égaux. Rectangle : 4 angles droits. Losange : 4 côtés égaux.";

export const quadrilatereGabarits: TutorBankItemV4[] = [
  Q(10, 1, HINT_Q, () => {
    const f = un<FormeQuad>(["carre", "carre", "rectangle", "rectangle", "losange", "losange", "quadri"]);
    const s = intro();
    const pointe = f === "carre" && Math.random() < 0.4;
    return {
      text: tournure([s.phrase], ["Lis le codage.", "Regarde les petits carrés et les petits traits.", "Observe les marques.", ""], ["Quel est le nom le plus précis de ce quadrilatère ?", "Donne le nom le plus précis de cette figure.", "Nomme ce quadrilatère le plus précisément possible."]),
      ...qcm(NOM_QUAD[f], Object.values(NOM_QUAD)),
      canvas: code(f, pointe ? { rot: 45 } : {}),
      explanation: etapes("on lit le codage, même si la figure est penchée.", f === "carre" ? "4 angles droits et 4 côtés égaux." : f === "rectangle" ? "4 angles droits, côtés pas tous égaux." : f === "losange" ? "4 côtés égaux, pas d'angle droit." : "ni angle droit, ni côtés égaux codés.", `c'est ${bas(NOM_QUAD[f])}.`),
    };
  }),
  Q(11, 1, "Regarde les coins : un petit carré = un angle droit.", () => {
    const [f, quoi, n] = un<[FormeQuad, string, number]>([["carre", "angles droits", 4], ["carre", "côtés égaux", 4], ["rectangle", "angles droits", 4], ["losange", "côtés égaux", 4], ["losange", "angles droits", 0], ["rectangle", "sommets", 4], ["losange", "sommets", 4]]);
    const nom = bas(NOM_QUAD[f]).replace(/^un /, "");
    const s = intro();
    return {
      text: tournure([`${s.phrase.replace(/\.$/, "")}, en forme de ${nom}.`], [`Combien ${de(quoi)}${quoi} a ce ${nom} ?`, `Combien ${de(quoi)}${quoi} compte ce ${nom} ?`, `Ce ${nom} a combien ${de(quoi)}${quoi} ?`, `Compte ses ${quoi} : combien y en a-t-il ?`]),
      ...qcmN(n, n === 0 ? [1, 2, 4] : [2, 3, 1, 8]),
      canvas: code(f),
      explanation: etapes(`on lit le codage du ${nom}.`, n === 0 ? "aucun coin ne porte de petit carré." : `on en compte ${n}.`, `un ${nom} a ${n} ${quoi}${f === "losange" && n === 0 ? " (sauf s'il est carré)" : ""}.`),
    };
  }),
  Q(12, 1, HINT_Q, () => {
    const [f, ind] = un<[FormeQuad, string[]]>([
      ["rectangle", ["Il a 4 angles droits, mais ses côtés ne sont pas tous égaux.", "Ses 4 angles sont droits ; ses côtés ne sont pas tous égaux."]],
      ["carre", ["Il a 4 angles droits et 4 côtés égaux.", "Ses 4 côtés sont égaux et ses 4 angles sont droits."]],
      ["losange", ["Il a 4 côtés égaux et aucun angle droit.", "Ses 4 côtés sont égaux, mais il n'a pas d'angle droit."]],
    ]);
    const s = intro();
    return {
      text: tournure([`${s.phrase.replace(/\.$/, "")}, un quadrilatère.`], ind, PRECIS),
      ...qcm(NOM_QUAD[f], [NOM_QUAD.carre, NOM_QUAD.rectangle, NOM_QUAD.losange, NOM_COTES[3]]),
      canvas: code(f),
      explanation: etapes("on lit les propriétés : angles droits, côtés égaux.", f === "carre" ? "4 angles droits et 4 côtés égaux." : f === "rectangle" ? "4 angles droits seulement." : "4 côtés égaux seulement.", `c'est ${bas(NOM_QUAD[f])}.`),
    };
  }),
  Q(13, 2, "Compare les 4 longueurs, puis regarde les angles droits.", () => {
    const f = un<"carre" | "rectangle" | "losange">(["carre", "rectangle", "losange"]);
    const s = intro(), u = s.u;
    const a = entre(3, 12);
    let b = entre(2, 9); while (b === a) b = entre(2, 9);
    const L = f === "rectangle" ? [a, b, a, b] : [a, a, a, a];
    const droits = f === "losange" ? "Il n'a aucun angle droit." : "Ses 4 angles sont droits.";
    return {
      text: tournure([s.phrase], [`Ses côtés mesurent ${L.join(` ${u}, `)} ${u}.`, `Ses quatre côtés mesurent ${L.join(` ${u}, `)} ${u}.`], [droits], PRECIS),
      ...qcm(NOM_QUAD[f], [NOM_QUAD.carre, NOM_QUAD.rectangle, NOM_QUAD.losange, "Un triangle"]),
      canvas: poly(f === "carre" ? "carre" : f, { droits: f === "losange" ? [] : [0, 1, 2, 3], textes: { 0: `${L[0]} ${u}`, 1: `${L[1]} ${u}` } }),
      explanation: etapes("on compare les longueurs et on regarde les angles.", f === "carre" ? "4 côtés égaux et 4 angles droits." : f === "rectangle" ? `4 angles droits, côtés de ${a} ${u} et ${b} ${u}.` : "4 côtés égaux, pas d'angle droit.", `c'est ${bas(NOM_QUAD[f])}.`),
    };
  }),
  Q(14, 2, "Un carré a 4 angles droits (comme un rectangle) et 4 côtés égaux (comme un losange).", () => {
    const [qst, juste, faux, f] = un<[string, string, string[], Forme]>([
      ["Un carré est-il un rectangle ?", "Oui : il a 4 angles droits.", ["Non : ses côtés sont tous égaux.", "Non : un rectangle est plus long que large.", "On ne peut pas savoir."], "carre"],
      ["Un carré est-il un losange ?", "Oui : ses 4 côtés sont égaux.", ["Non : il a des angles droits.", "Non : un losange est penché.", "On ne peut pas savoir."], "carre"],
      ["Un rectangle est-il toujours un carré ?", "Non : ses 4 côtés ne sont pas forcément égaux.", ["Oui : il a 4 angles droits.", "Oui : il a 4 côtés.", "On ne peut pas savoir."], "rectangle"],
      ["Un losange est-il toujours un carré ?", "Non : il n'a pas forcément d'angle droit.", ["Oui : ses 4 côtés sont égaux.", "Oui : il a 4 sommets.", "On ne peut pas savoir."], "losange"],
      ["Un carré posé sur sa pointe est-il encore un carré ?", "Oui : ses côtés et ses angles n'ont pas changé.", ["Non : il devient un losange.", "Non : il devient un rectangle.", "On ne peut pas savoir."], "carre"],
    ]);
    const p = un(PRENOMS);
    return {
      text: tournure([`${p} se demande :`, `${p} pose la question :`, `${p} hésite :`, `Au tableau, ${p} demande :`], [`« ${qst} »`], ["Que réponds-tu ?", "Quelle est la bonne réponse ?", "Que faut-il répondre ?", ""]),
      ...qcm(juste, faux),
      canvas: code(f, qst.includes("pointe") ? { rot: 45 } : {}),
      explanation: etapes("on vérifie les propriétés une par une.", juste, "le nom dépend des propriétés, pas de la position."),
    };
  }),
  Q(15, 2, "Dans un rectangle, les côtés opposés ont la même longueur.", () => {
    const f = un<"rectangle" | "carre" | "losange">(["rectangle", "rectangle", "carre", "losange"]);
    const ls = lettres(4);
    const s = intro(), u = s.u;
    const L = entre(5, 15);
    let l = entre(2, 9); while (l >= L) l = entre(2, 9);
    const nom = bas(NOM_QUAD[f]).replace(/^un /, "");
    const cherche = un([2, 3]); // côté [CD] (opposé à [AB]) ou [DA] (opposé à [BC])
    const cote = (i: number) => `[${ls[i]}${ls[(i + 1) % 4]}]`;
    const rep = f === "rectangle" ? (cherche === 2 ? L : l) : L;
    const donne = f === "rectangle" ? `${cote(0)} mesure ${L} ${u} et ${cote(1)} mesure ${l} ${u}.` : `${cote(0)} mesure ${L} ${u}.`;
    return {
      text: tournure([`${s.phrase.replace(/\.$/, "")}, un ${nom}.`], [donne], [`Combien mesure ${cote(cherche)} ?`, `Quelle est la longueur de ${cote(cherche)} ?`, `Trouve la longueur de ${cote(cherche)}.`]),
      ...qcmN(rep, f === "rectangle" ? [rep === L ? l : L, L + l, 2 * rep] : [L * 2, L * 4, L + 1], u),
      canvas: code(f, { noms: ls, textes: f === "rectangle" ? { 0: `${L} ${u}`, 1: `${l} ${u}` } : { 0: `${L} ${u}` } }),
      explanation: etapes(f === "rectangle" ? "dans un rectangle, les côtés opposés sont égaux." : `les 4 côtés d'un ${nom} sont égaux.`, f === "rectangle" ? `${cote(cherche)} est en face de ${cote(cherche - 2)}.` : `${cote(cherche)} mesure comme ${cote(0)}.`, `${cote(cherche)} mesure ${rep} ${u}.`),
    };
  }),
];

/* ═════════════════ figure_cercle ═════════════════ */

const C = atelier("cm1", "figure_plane", "figure_cercle", "cm1_");
const HINT_C = "Rayon : du centre au cercle. Diamètre : d'un bord à l'autre en passant par le centre.";

export const cercleGabarits: TutorBankItemV4[] = [
  C(10, 1, HINT_C, () => {
    const m = un<"rayon" | "diametre" | "centre" | "cercle" | "disque">(["rayon", "diametre", "centre", "cercle", "disque"]);
    const J = { rayon: "Un rayon", diametre: "Un diamètre", centre: "Le centre", cercle: "Le cercle", disque: "Le disque" };
    const s = introRond();
    return {
      text: tournure([`${s.phrase} Regarde le dessin.`, `${s.phrase} Voici son dessin.`, s.phrase], ["Comment s'appelle ce qui est en rouge ?", "Quel est le nom de l'élément en rouge ?", "Ce qui est tracé en rouge s'appelle…", "Nomme l'élément en rouge."]),
      ...qcm(J[m], Object.values(J)),
      canvas: rond({ montrer: m }),
      explanation: etapes(HINT_C, m === "centre" ? "le point rouge est au milieu, à la même distance de tous les points du cercle." : m === "cercle" ? "le trait rouge est la ligne qui fait le tour." : m === "disque" ? "toute la surface à l'intérieur est coloriée." : m === "rayon" ? "le segment rouge va du centre au cercle." : "le segment rouge traverse en passant par le centre.", `c'est ${bas(J[m])}.`),
    };
  }),
  C(11, 1, "Le diamètre, c'est deux rayons bout à bout : 2 × rayon.", () => {
    const s = introRond();
    const r = s.r(), u = s.u;
    return {
      text: tournure([s.phrase], [`Son rayon mesure ${r} ${u}.`, `Le rayon de ${s.objet} est de ${r} ${u}.`], ["Combien mesure son diamètre ?", "Quel est son diamètre ?", "Trouve son diamètre."]),
      ...qcmN(2 * r, [r, r + 2, 4 * r, r % 2 === 0 ? r / 2 : r + 1], u),
      canvas: rond({ montrer: "rayon", texte: `${r} ${u}` }),
      explanation: etapes("le diamètre vaut deux rayons.", `2 × ${r} = ${2 * r}.`, `le diamètre mesure ${2 * r} ${u}.`),
    };
  }),
  C(12, 2, "Le rayon, c'est la moitié du diamètre : diamètre ÷ 2.", () => {
    const s = introRond();
    const r = s.r(), u = s.u;
    const d = 2 * r;
    return {
      text: tournure([s.phrase], [`Son diamètre mesure ${d} ${u}.`, `Le diamètre de ${s.objet} est de ${d} ${u}.`, `D'un bord à l'autre, en passant par le centre, il y a ${d} ${u}.`], ["Combien mesure son rayon ?", "Quel est son rayon ?", "Trouve son rayon."]),
      ...qcmN(r, [d, 2 * d, d - 2, r + 1], u),
      canvas: rond({ montrer: "diametre", texte: `${d} ${u}` }),
      explanation: etapes("le rayon est la moitié du diamètre.", `${d} ÷ 2 = ${r}.`, `le rayon mesure ${r} ${u}.`),
    };
  }),
  C(13, 2, "Tous les points du cercle sont à la même distance du centre : le rayon.", () => {
    const [c, m] = lettres(2);
    const s = introRond();
    const r = s.r(), u = s.u;
    const parD = Math.random() < 0.4;
    return {
      text: tournure([s.phrase], [`Son centre est ${c} et ${parD ? `son diamètre mesure ${2 * r} ${u}` : `son rayon mesure ${r} ${u}`}.`], [`Le point ${m} est sur le bord.`, `Une fourmi s'arrête au point ${m}, sur le bord.`, `On place le point ${m} sur le cercle.`], [`Combien mesure [${c}${m}] ?`, `Quelle est la distance de ${c} à ${m} ?`, `À quelle distance du centre est ${m} ?`]),
      ...qcmN(r, [2 * r, r + 1, parD ? 4 * r : r + 2, r - 1], u),
      canvas: rond({ montrer: parD ? "diametre" : "rayon", centre: c, noms: [m, "B"], texte: parD ? `${2 * r} ${u}` : `${r} ${u}` }),
      explanation: etapes(`${m} est sur le cercle : [${c}${m}] est un rayon.`, parD ? `${2 * r} ÷ 2 = ${r}.` : `le rayon mesure ${r} ${u}.`, `[${c}${m}] mesure ${r} ${u}.`),
    };
  }),
  C(14, 3, "Chaque rond prend 2 rayons de long : son diamètre.", () => {
    const n = entre(2, 5);
    const [obj, sg, boite, a, b] = un<[string, string, string, number, number]>([["balles de tennis", "balle", "un tube", 3, 4], ["pièces de monnaie", "pièce", "une rangée", 1, 2], ["cookies", "cookie", "une boîte", 3, 5], ["boules de pétanque", "boule", "une boîte", 4, 5], ["billes", "bille", "une réglette", 1, 2], ["oranges", "orange", "une cagette", 3, 5], ["macarons", "macaron", "une boîte", 2, 3], ["galettes", "galette", "un plateau", 5, 9], ["pots de fleurs ronds", "pot", "une jardinière", 5, 8], ["balles de ping-pong", "balle", "une boîte", 2, 2], ["tomates", "tomate", "une barquette", 3, 4], ["bouchons", "bouchon", "une rangée", 1, 2]]);
    const r = entre(a, b);
    const u = "cm";
    return {
      text: tournure([`On aligne ${n} ${obj} dans ${boite}, sans laisser d'espace.`, `On range ${n} ${obj} côte à côte dans ${boite}.`], [`Chaque ${sg} a un rayon de ${r} ${u}.`, `Le rayon de chaque ${sg} mesure ${r} ${u}.`], ["Quelle longueur occupe la rangée ?", "Quelle est la longueur de la rangée ?", "Combien mesure la rangée en tout ?"]),
      ...qcmN(2 * r * n, [r * n, 2 * r, n + 2 * r, 2 * r * (n + 1)], u),
      canvas: rangee(n, `${r} ${u}`),
      explanation: etapes(`un diamètre = 2 × ${r} = ${2 * r} ${u}.`, `${n} diamètres : ${n} × ${2 * r} = ${2 * r * n}.`, `la rangée mesure ${2 * r * n} ${u}.`),
    };
  }),
  C(15, 3, "Le rond touche les deux bords : le côté de la boîte = le diamètre.", () => {
    const r = entre(4, 20);
    const donneD = Math.random() < 0.4;
    const u = "cm";
    const [obj, boite] = un<[string, string]>([["une galette", "une boîte carrée"], ["une pizza", "un carton carré"], ["un gâteau rond", "une boîte carrée"], ["un fromage rond", "une boîte carrée"], ["une horloge", "un cadre carré"], ["un miroir rond", "un cadre carré"], ["une assiette", "un set de table carré"], ["un tambourin", "un étui carré"], ["un bassin rond", "un enclos carré"], ["une tarte", "un plateau carré"]]);
    return {
      text: tournure([`${obj.charAt(0).toUpperCase() + obj.slice(1)} entre juste dans ${boite}.`, `On pose ${obj} dans ${boite} : elle touche les 4 bords.`.replace("elle touche", obj.startsWith("un ") ? "il touche" : "elle touche")], [donneD ? `Son diamètre mesure ${2 * r} ${u}.` : `Son rayon mesure ${r} ${u}.`], ["Combien mesure le côté du carré ?", "Quelle est la longueur d'un côté ?", "Combien mesure un côté de la boîte ?"]),
      ...qcmN(2 * r, donneD ? [r, 4 * r, 2 * r + 2] : [r, 4 * r, r + 2], u),
      canvas: rondDansCarre(donneD ? `${2 * r} ${u}` : `${r} ${u}`, donneD),
      explanation: etapes("le rond touche deux côtés opposés : le côté vaut le diamètre.", donneD ? `le diamètre mesure ${2 * r} ${u}.` : `2 × ${r} = ${2 * r}.`, `le côté mesure ${2 * r} ${u}.`),
    };
  }),
  C(16, 3, "Le cercle est la ligne qui fait le tour ; le disque est toute la surface.", () => {
    const tour = Math.random() < 0.5;
    const s = introRond();
    const action = tour
      ? un(["colle un ruban tout autour de", "pose une bordure sur le tour de", "plante des fleurs tout le long du bord de", "peint une ligne sur le bord de", "coud un galon autour de"])
      : un(["peint toute la surface de", "recouvre entièrement", "sème du gazon sur toute la surface de", "met une nappe sur toute la surface de", "colorie tout l'intérieur de"]);
    const juste = tour ? "Le cercle" : "Le disque";
    return {
      text: tournure([`On ${action} ${s.objet}.`], ["Quelle partie est concernée ?", "Cela concerne quelle partie de la figure ?", "Quel mot de géométrie convient ?", "Sur quoi travaille-t-on ?"]),
      ...qcm(juste, ["Le cercle", "Le disque", "Le rayon", "Le diamètre", "Le centre"]),
      canvas: rond({ montrer: tour ? "cercle" : "disque" }),
      explanation: etapes("le cercle est le bord ; le disque est l'intérieur avec le bord.", tour ? "on travaille seulement sur le tour." : "on travaille sur toute la surface.", `c'est ${bas(juste)}.`),
    };
  }),
];

/* ═════════════════ figure_propriete ═════════════════ */

const PR = atelier("cm1", "figure_plane", "figure_propriete", "cm1_");
const HINT_P = "Récite la carte d'identité de la figure : côtés égaux ? angles droits ?";

type FigP = "carre" | "rectangle" | "losange" | "triRect" | "isocele" | "equilateral";
const NOM_P: Record<FigP, string> = { carre: "carré", rectangle: "rectangle", losange: "losange", triRect: "triangle rectangle", isocele: "triangle isocèle", equilateral: "triangle équilatéral" };

export const proprieteGabarits: TutorBankItemV4[] = [
  PR(10, 1, HINT_P, () => {
    const [f, quoi, n] = un<[FigP, string, number]>([["carre", "angles droits", 4], ["carre", "côtés égaux", 4], ["rectangle", "angles droits", 4], ["losange", "côtés égaux", 4], ["equilateral", "côtés égaux", 3], ["isocele", "côtés égaux", 2], ["triRect", "angles droits", 1], ["triRect", "sommets", 3], ["losange", "sommets", 4]]);
    const s = intro();
    return {
      text: tournure([`${s.phrase.replace(/\.$/, "")} : c'est un ${NOM_P[f]}.`], [`Combien ${de(quoi)}${quoi} a ce ${NOM_P[f]} ?`, `Ce ${NOM_P[f]} a combien ${de(quoi)}${quoi} ?`, `Combien ${de(quoi)}${quoi} compte ce ${NOM_P[f]} ?`]),
      ...qcmN(n, [1, 2, 3, 4].filter((v) => v !== n).concat([n + 2])),
      canvas: code(f),
      explanation: etapes(`on lit le codage du ${NOM_P[f]}.`, `on compte ${n} ${quoi}.`, `un ${NOM_P[f]} a ${n} ${quoi}.`),
    };
  }),
  PR(11, 2, HINT_P, () => {
    const f = un<FigP | "cercle">(["carre", "rectangle", "losange", "triRect", "isocele", "equilateral", "cercle"]);
    const VRAI: Record<FigP | "cercle", string[]> = {
      carre: ["Ses 4 côtés sont égaux et ses 4 angles sont droits."],
      rectangle: ["Ses côtés opposés ont la même longueur.", "Il a 4 angles droits."],
      losange: ["Ses 4 côtés ont la même longueur."],
      triRect: ["Il a un angle droit."],
      isocele: ["Il a deux côtés de même longueur."],
      equilateral: ["Ses 3 côtés ont la même longueur."],
      cercle: ["Le diamètre mesure 2 fois le rayon.", "Tous ses points sont à la même distance du centre."],
    };
    const FAUX: Record<FigP | "cercle", string[]> = {
      carre: ["Il n'a que 2 angles droits.", "Ses côtés opposés sont différents.", "Il a 3 sommets."],
      rectangle: ["Ses 4 côtés sont toujours égaux.", "Il n'a aucun angle droit.", "Il a 3 côtés."],
      losange: ["Il a toujours 4 angles droits.", "Il a 3 côtés égaux.", "Ses côtés sont tous différents."],
      triRect: ["Il a 2 angles droits.", "Il a 4 côtés.", "Ses 3 côtés sont égaux."],
      isocele: ["Il a 4 côtés.", "Ses 3 côtés sont différents.", "Il a 2 angles droits."],
      equilateral: ["Il a un angle droit.", "Il a 4 côtés égaux.", "Il a 2 angles droits."],
      cercle: ["Le rayon mesure 2 fois le diamètre.", "Il a 4 sommets.", "Le diamètre ne passe pas par le centre."],
    };
    const nom = f === "cercle" ? "cercle" : NOM_P[f];
    const s = f === "cercle" ? introRond() : intro();
    return {
      text: tournure([`${s.phrase.replace(/\.$/, "")} : c'est un ${nom}.`], [`Quelle phrase est vraie pour ce ${nom} ?`, "Quelle phrase est juste ?", `Quelle propriété a ce ${nom} ?`, "Laquelle de ces phrases est vraie ?"]),
      ...qcm(un(VRAI[f]), FAUX[f]),
      canvas: f === "cercle" ? rond({ montrer: "diametre" }) : code(f),
      explanation: etapes(`on récite les propriétés du ${nom}.`, `les trois autres phrases sont fausses pour un ${nom}.`, `la phrase vraie est celle qui décrit le ${nom}.`),
    };
  }),
  PR(12, 2, "Les côtés égaux (ou opposés dans un rectangle) ont la même longueur.", () => {
    const f = un<"carre" | "losange" | "equilateral" | "isocele">(["carre", "losange", "equilateral", "isocele"]);
    const n = f === "carre" || f === "losange" ? 4 : 3;
    const ls = lettres(n);
    const a = entre(3, 14);
    const s = intro(), u = s.u;
    const cote = (i: number) => `[${ls[i]}${ls[(i + 1) % n]}]`;
    const connu = f === "isocele" ? 1 : 0;
    const cherche = f === "isocele" ? 2 : un(n === 4 ? [1, 2, 3] : [1, 2]);
    return {
      text: tournure([`${s.phrase.replace(/\.$/, "")} : c'est un ${NOM_P[f]}.`], [`${cote(connu)} mesure ${a} ${u}.`, `Le côté ${cote(connu)} mesure ${a} ${u}.`], [`Combien mesure ${cote(cherche)} ?`, `Quelle est la longueur de ${cote(cherche)} ?`]),
      ...qcmN(a, [2 * a, a + 1, a * n, a - 1], u),
      canvas: code(f, { noms: ls, textes: { [connu]: `${a} ${u}` } }),
      explanation: etapes(`dans un ${NOM_P[f]}, ${f === "isocele" ? "les deux côtés codés" : "tous les côtés"} ont la même longueur.`, `${cote(cherche)} mesure comme ${cote(connu)}.`, `${cote(cherche)} mesure ${a} ${u}.`),
    };
  }),
  PR(13, 3, "Un tour fait de côtés tous égaux : on divise par le nombre de côtés.", () => {
    const f = un<"carre" | "losange" | "equilateral">(["carre", "losange", "equilateral"]);
    const n = f === "equilateral" ? 3 : 4;
    const a = entre(3, 15);
    const s = intro(), u = s.u;
    const p = n * a;
    return {
      text: tournure([`${s.phrase.replace(/\.$/, "")} : c'est un ${NOM_P[f]}.`], [`Son tour mesure ${p} ${u}.`, `Son périmètre est de ${p} ${u}.`, `Une ficelle de ${p} ${u} fait juste son tour.`], ["Combien mesure un côté ?", "Quelle est la longueur d'un côté ?", "Trouve la longueur d'un côté."]),
      ...qcmN(a, [p / 2, n === 4 ? p / 4 + 2 : p / 3 + 2, p - n, n === 4 ? Math.round(p / 3) : p / 2].filter((v) => Number.isInteger(v)), u),
      canvas: code(f),
      explanation: etapes(`les ${n} côtés du ${NOM_P[f]} sont égaux.`, `${p} ÷ ${n} = ${a}.`, `un côté mesure ${a} ${u}.`),
    };
  }),
];

/** Remplace le « vrai ou faux » à 2 choix : une affirmation, oui/non ET la raison. */
export function genProprieteAffirmation() {
  const [aff, juste, faux, f] = un<[string, string, string[], FigP | "cercle"]>([
    ["un carré est aussi un rectangle", "Oui, car il a 4 angles droits.", ["Non, car ses côtés sont tous égaux.", "Non, car un rectangle est plus long que large.", "Oui, car il a 4 côtés égaux."], "carre"],
    ["un losange a toujours 4 angles droits", "Non, il n'en a pas forcément.", ["Oui, comme le carré.", "Oui, car ses côtés sont égaux.", "Non, il en a toujours 2."], "losange"],
    ["un triangle rectangle a deux angles droits", "Non, il en a un seul.", ["Oui, un à chaque bout.", "Oui, comme le rectangle.", "Non, il n'en a aucun."], "triRect"],
    ["le diamètre est la moitié du rayon", "Non, c'est le double du rayon.", ["Oui, il est plus court.", "Non, ils sont égaux.", "Oui, il fait un demi-tour."], "cercle"],
    ["les côtés opposés d'un rectangle sont égaux", "Oui, deux à deux.", ["Non, ils sont tous différents.", "Oui, les 4 sont égaux.", "Non, seuls 2 sont égaux."], "rectangle"],
    ["un triangle équilatéral a 3 côtés égaux", "Oui, c'est sa définition.", ["Non, il en a 2.", "Non, il a un angle droit.", "Oui, et un angle droit."], "equilateral"],
    ["un triangle isocèle a 3 côtés égaux", "Non, il en a au moins 2.", ["Oui, toujours.", "Non, il n'en a aucun.", "Oui, comme le carré."], "isocele"],
    ["un carré a 4 côtés égaux", "Oui, et 4 angles droits.", ["Non, il en a 2.", "Oui, mais aucun angle droit.", "Non, seulement les côtés opposés."], "carre"],
    ["tous les rayons d'un cercle ont la même longueur", "Oui, ils vont tous du centre au cercle.", ["Non, ils changent de longueur.", "Oui, et ils valent le diamètre.", "Non, seul le premier compte."], "cercle"],
    ["un losange penché n'est plus un losange", "Non, il reste un losange.", ["Oui, il devient un carré.", "Oui, il devient un rectangle.", "Non, il devient un triangle."], "losange"],
  ]);
  const p = un(PRENOMS);
  return {
    text: tournure([`${p} affirme :`, `${p} dit :`, `${p} écrit :`, `Au tableau, ${p} écrit :`], [`« ${aff.charAt(0).toUpperCase() + aff.slice(1)}. »`], ["Est-ce vrai ?", "Est-ce juste ?", "Que penses-tu de cette phrase ?"]),
    ...qcm(juste, faux),
    canvas: f === "cercle" ? rond({ montrer: "diametre" }) : code(f),
    explanation: etapes("on compare avec la carte d'identité de la figure.", juste, "les autres réponses se trompent de propriété."),
  };
}

/** Le rayon et le diamètre en situation (remplace le calcul nu). */
export function genProprieteRayonDiametre() {
  const s = introRond();
  const versD = Math.random() < 0.5;
  const r = s.r(), u = s.u;
  return {
    text: tournure([s.phrase], [versD ? `Son rayon mesure ${r} ${u}.` : `Son diamètre mesure ${2 * r} ${u}.`], [versD ? "Combien mesure son diamètre ?" : "Combien mesure son rayon ?", versD ? "Quel est son diamètre ?" : "Quel est son rayon ?"]),
    ...(versD ? qcmN(2 * r, [r, r + 2, 4 * r], u) : qcmN(r, [2 * r, 4 * r, r + 2], u)),
    canvas: rond({ montrer: versD ? "rayon" : "diametre", texte: versD ? `${r} ${u}` : `${2 * r} ${u}` }),
    explanation: etapes("le diamètre vaut 2 rayons.", versD ? `2 × ${r} = ${2 * r}.` : `${2 * r} ÷ 2 = ${r}.`, versD ? `le diamètre mesure ${2 * r} ${u}.` : `le rayon mesure ${r} ${u}.`),
  };
}

/* ═════════════════ figure_construire ═════════════════ */

const K = atelier("cm1", "figure_plane", "figure_construire", "cm1_");
export const METIERS: string[] = ["Une architecte", "Un menuisier", "Une couturière", "Un carreleur", "Une élève", "Un dessinateur", "Une ingénieure", "Un jardinier", "Une graphiste", "Un maçon", "Une paysagiste", "Un charpentier", "Une peintre", "Un géomètre"];

export const construireGabarits: TutorBankItemV4[] = [
  K(10, 1, "Compas : cercles. Équerre : angles droits. Règle graduée : longueurs.", () => {
    const [tache, juste, fig] = un<[string, string, () => CanvasFigure]>([
      ["tracer un cercle", "Un compas", () => rond({ montrer: "rayon" })],
      ["tracer un rond parfait", "Un compas", () => rond({ montrer: "cercle" })],
      ["tracer un angle droit", "Une équerre", () => poly("triRect", { droits: [0] })],
      ["vérifier qu'un coin est bien droit", "Une équerre", () => poly("rectangle", { droits: [0] })],
      [`tracer un segment de ${entre(3, 12)} cm`, "Une règle graduée", () => poly("triQuelconque", { textes: { 0: "? cm" } })],
      ["mesurer la longueur d'un côté", "Une règle graduée", () => poly("rectangle", { textes: { 0: "? cm" } })],
      ["tracer les 4 coins droits d'un rectangle", "Une équerre", () => code("rectangle")],
    ]);
    const qui = un(METIERS);
    return {
      text: tournure([`${qui} veut ${tache}.`, `${qui} doit ${tache}.`, `Pour son plan, ${bas(qui)} va ${tache}.`], ["Quel instrument choisir ?", "Quel outil utiliser ?", "Avec quel instrument ?", "Que faut-il prendre ?"]),
      ...qcm(juste, ["Un compas", "Une équerre", "Une règle graduée"]),
      canvas: fig(),
      explanation: etapes("on associe l'instrument à ce qu'on trace.", juste === "Un compas" ? "le compas trace les cercles." : juste === "Une équerre" ? "l'équerre a un coin en angle droit." : "la règle graduée mesure les longueurs.", `on prend ${bas(juste)}.`),
    };
  }),
  K(11, 2, "L'écartement du compas = le rayon. Si on donne le diamètre, on prend la moitié.", () => {
    const r = entre(2, 9);
    const parD = Math.random() < 0.5;
    const [quoi, ou] = un<[string, string]>([["une horloge", "sur son affiche"], ["une roue", "sur son dessin"], ["un bassin", "sur le plan"], ["un rond-point", "sur le plan"], ["une cible", "sur une feuille"], ["un soleil", "sur son cahier"], ["un logo rond", "sur une carte"], ["une pizza", "sur un menu"], ["un tambour", "sur l'affiche du concert"], ["une piste ronde", "sur le plan du parc"], ["une assiette", "sur un set de table"], ["un hublot", "sur le plan du bateau"]]);
    return {
      text: tournure([`On dessine ${quoi} ${ou}.`, `${un(METIERS)} trace ${quoi} ${ou}.`], [parD ? `Le cercle doit avoir un diamètre de ${2 * r} cm.` : `Le cercle doit avoir un rayon de ${r} cm.`], ["Quel écartement donner au compas ?", "De combien ouvrir le compas ?", "Quel écartement faut-il ?"]),
      ...qcmN(r, parD ? [2 * r, 4 * r, r + 1] : [2 * r, r + 1, r % 2 === 0 ? r / 2 : r + 2], "cm"),
      canvas: rond({ montrer: parD ? "diametre" : "rayon", texte: parD ? `${2 * r} cm` : `${r} cm` }),
      explanation: etapes("l'écartement du compas est le rayon.", parD ? `${2 * r} ÷ 2 = ${r}.` : `le rayon est ${r} cm.`, `on ouvre le compas de ${r} cm.`),
    };
  }),
  K(12, 2, "Suis le programme pas à pas, puis lis ce que tu obtiens.", () => {
    const a = entre(3, 8);
    let b = entre(2, 6); while (b === a) b = entre(2, 6);
    const [prog, juste, f] = un<[string, string, Forme]>([
      [`Trace un segment de ${a} cm. À chaque bout, trace un angle droit et un côté de ${a} cm. Relie les deux bouts.`, "Un carré", "carre"],
      [`Trace un segment de ${a + b} cm. À chaque bout, trace un angle droit et un côté de ${b} cm. Relie les deux bouts.`, "Un rectangle", "rectangle"],
      [`Trace un angle droit. Sur ses côtés, place un point à ${a} cm et un point à ${b} cm. Relie ces deux points.`, "Un triangle rectangle", "triRect"],
      [`Trace un segment de ${b} cm. Avec le compas ouvert de ${Math.max(a, b) + 2} cm, pique à chaque bout et croise les arcs. Relie.`, "Un triangle isocèle", "isocele"],
      [`Trace un segment de ${a} cm. Avec le compas ouvert de ${a} cm, pique à chaque bout et croise les arcs. Relie.`, "Un triangle équilatéral", "equilateral"],
    ]);
    return {
      text: tournure(["Suis ce programme.", "Voici un programme de construction.", "Lis ce programme.", `${un(PRENOMS)} suit ce programme.`], [prog], ["Quelle figure obtiens-tu ?", "Quelle figure est construite ?", "Que trace-t-on ?"]),
      ...qcm(juste, ["Un carré", "Un rectangle", "Un losange", "Un triangle rectangle", "Un triangle isocèle", "Un triangle équilatéral"].filter((x) => x !== juste && (juste.includes("triangle") ? x.includes("triangle") || x === "Un carré" : !x.includes("triangle") || x === "Un triangle rectangle"))),
      canvas: poly(f, { rot: 0, ...(f === "carre" || f === "rectangle" ? { droits: [0, 1] } : f === "triRect" ? { droits: [0] } : {}) }),
      explanation: etapes("on suit les étapes dans l'ordre.", f === "carre" ? "4 côtés égaux et des angles droits." : f === "rectangle" ? "des angles droits, longueur et largeur différentes." : f === "triRect" ? "3 côtés et un angle droit." : f === "isocele" ? "les deux arcs ont le même rayon : 2 côtés égaux." : "les 3 côtés mesurent pareil.", `on obtient ${bas(juste)}.`),
    };
  }),
  K(13, 3, "Pour finir une figure, utilise ses propriétés : côtés opposés, côtés égaux.", () => {
    const ls = lettres(4);
    const u = "cm";
    const L = entre(5, 12);
    let l = entre(2, 8); while (l >= L) l = entre(2, 8);
    const cas = un(["rect", "rect", "equi", "losange"]);
    const qui = un(METIERS);
    if (cas === "rect") {
      return {
        text: tournure([`${qui} construit un rectangle ${ls.join("")}.`, `On construit le rectangle ${ls.join("")}.`], [`[${ls[0]}${ls[1]}] mesure ${L} ${u} et [${ls[1]}${ls[2]}] mesure ${l} ${u}.`], [`Quelle longueur donner à [${ls[2]}${ls[3]}] ?`, `Combien doit mesurer [${ls[2]}${ls[3]}] ?`]),
        ...qcmN(L, [l, L + l, 2 * L], u),
        canvas: poly("rectangle", { noms: ls, droits: [0, 1, 2, 3], textes: { 0: `${L} ${u}`, 1: `${l} ${u}` } }),
        explanation: etapes("dans un rectangle, les côtés opposés sont égaux.", `[${ls[2]}${ls[3]}] est en face de [${ls[0]}${ls[1]}].`, `il mesure ${L} ${u}.`),
      };
    }
    if (cas === "equi") {
      return {
        text: tournure([`${qui} construit un triangle équilatéral de côté ${L} ${u}.`, `On veut un triangle équilatéral de ${L} ${u} de côté.`], [`[${ls[0]}${ls[1]}] est tracé. On place le 3e sommet au compas.`], ["Quel écartement donner au compas ?", "De combien ouvrir le compas ?"]),
        ...qcmN(L, [L % 2 === 0 ? L / 2 : L + 2, 2 * L, 3 * L], u),
        canvas: poly("equilateral", { noms: [ls[2], ls[0], ls[1]], textes: { 1: `${L} ${u}` }, rot: 0 }),
        explanation: etapes("les 3 côtés d'un triangle équilatéral sont égaux.", `les deux côtés à tracer mesurent ${L} ${u}.`, `on ouvre le compas de ${L} ${u}.`),
      };
    }
    return {
      text: tournure([`${qui} construit un losange ${ls.join("")}.`, `On construit le losange ${ls.join("")}.`], [`[${ls[0]}${ls[1]}] mesure ${L} ${u}.`], [`Quelle longueur donner à [${ls[2]}${ls[3]}] ?`, `Combien doit mesurer [${ls[1]}${ls[2]}] ?`]),
      ...qcmN(L, [2 * L, 4 * L, L + 2], u),
      canvas: poly("losange", { noms: ls, codes: [[0, 1], [1, 1], [2, 1], [3, 1]], textes: { 0: `${L} ${u}` } }),
      explanation: etapes("les 4 côtés d'un losange sont égaux.", `tous mesurent comme [${ls[0]}${ls[1]}].`, `il faut ${L} ${u}.`),
    };
  }),
  K(14, 3, "Vérifie TOUTES les propriétés : côtés ET angles.", () => {
    const a = entre(3, 9);
    const p = un(PRENOMS);
    const [desc, juste, faux, f, o] = un<[string, string, string[], Forme, OptsPoly]>([
      [`Ses 4 côtés mesurent ${a} cm, mais ses angles ne sont pas droits.`, "Un losange", ["Un carré", "Un rectangle", "Un triangle"], "losange", { codes: [[0, 1], [1, 1], [2, 1], [3, 1]] }],
      [`Ses 4 angles sont droits, ses côtés mesurent ${a + 2} cm et ${a} cm.`, "Un rectangle", ["Un carré", "Un losange", "Un triangle"], "rectangle", { droits: [0, 1, 2, 3] }],
      [`Ses 4 côtés mesurent ${a} cm et ses 4 angles sont droits.`, "Un carré", ["Un losange aplati", "Un rectangle allongé", "Un triangle"], "carre", CODAGE.carre!],
      [`Ses 3 côtés mesurent ${a} cm.`, "Un triangle équilatéral", ["Un triangle rectangle", "Un carré", "Un triangle quelconque"], "equilateral", CODAGE.equilateral!],
      [`2 de ses 3 côtés mesurent ${a} cm, le troisième ${a + 3} cm.`, "Un triangle isocèle", ["Un triangle équilatéral", "Un triangle rectangle", "Un losange"], "isocele", CODAGE.isocele!],
    ]);
    return {
      text: tournure([`${p} voulait tracer un carré.`, `${p} croit avoir tracé un carré.`, `${p} montre sa figure : « Voici mon carré ! »`], [desc], ["Quelle figure a été tracée en vrai ?", "Quel est le nom exact de cette figure ?", "Quelle figure est-ce vraiment ?"]),
      ...qcm(juste, faux),
      canvas: poly(f, o),
      explanation: etapes("un carré a 4 côtés égaux ET 4 angles droits.", desc, `sa figure est ${bas(juste)}.`),
    };
  }),
];

/* ═════════════════ figure_defi ═════════════════ */

const D = atelier("cm1", "figure_plane", "figure_defi", "cm1_");

/** Un objet de la vie et sa forme : [objet, forme dessinée, réponse]. */
const OBJETS_FORMES: [string, Forme | "rond", string][] = [
  ["Un panneau « stop »", "octogone", "Un octogone"], ["Un panneau « danger »", "equilateral", "Un triangle équilatéral"],
  ["Un écrou", "hexagone", "Un hexagone"], ["Une alvéole d'abeille", "hexagone", "Un hexagone"],
  ["Un cerf-volant", "losange", "Un losange"], ["Un carreau de chocolat", "carre", "Un carré"],
  ["Un terrain de foot", "rectangle", "Un rectangle"], ["Une porte", "rectangle", "Un rectangle"],
  ["Un carreau de carrelage", "carre", "Un carré"], ["Le cadran d'une horloge", "rond", "Un cercle"],
  ["Une équerre", "triRect", "Un triangle rectangle"], ["Un échiquier", "carre", "Un carré"],
  ["Une feuille de cahier", "rectangle", "Un rectangle"], ["Un panneau « cédez le passage »", "equilateral", "Un triangle équilatéral"],
  ["Le logo d'un club", "pentagone", "Un pentagone"], ["Une roue", "rond", "Un cercle"],
];

export const defiGabarits: TutorBankItemV4[] = [
  D(10, 2, "Regarde le codage du dessin : il dit tout.", () => {
    const [obj, f, juste] = un(OBJETS_FORMES);
    return {
      text: tournure([`Regarde ce dessin : ${bas(obj)}.`, `Voici ${bas(obj)}, vu de face.`, `On a dessiné ${bas(obj)}.`], ["Quel est le nom le plus précis de sa forme ?", "Quelle est sa forme exacte ?", "Donne le nom le plus précis de sa forme."]),
      ...qcm(juste, melange([...new Set(OBJETS_FORMES.map((x) => x[2]))].filter((x) => x !== juste)).slice(0, 3)),
      canvas: f === "rond" ? rond({ montrer: "aucun" }) : code(f, { rot: f === "losange" ? 90 : 0 }),
      explanation: etapes("on compte les côtés et on lit le codage.", juste === "Un cercle" ? "un bord rond, tous les points à la même distance du centre." : `on reconnaît ${bas(juste)}.`, `c'est ${bas(juste)}.`),
    };
  }),
  D(11, 2, "Suis les plis : compte les morceaux un par un.", () => {
    const [plis, n, forme, f, traits] = un<[string, number, string, Forme, Array<[number, number]>]>([
      ["selon une diagonale", 2, "Des triangles", "carre", [[0, 2]]],
      ["selon ses deux diagonales", 4, "Des triangles", "carre", [[0, 2], [1, 3]]],
      ["selon une diagonale", 2, "Des triangles", "rectangle", [[0, 2]]],
    ]);
    const objet = un(["Une nappe carrée", "Une serviette carrée", "Une feuille carrée", "Un mouchoir carré", "Un carré de tissu", "Une galette carrée", "Un sandwich carré", "Une plaque de pâte carrée", "Un foulard carré", "Un tapis carré"]);
    const obj = f === "rectangle" ? objet.replace("carrée", "rectangulaire").replace("carré", "rectangulaire").replace("Un rectangulaire de tissu", "Un rectangle de tissu") : objet;
    const qForme = Math.random() < 0.5;
    return {
      text: tournure([`${obj} est coupé${/^Une /.test(obj) ? "e" : ""} ${plis}.`], [qForme ? "Quelle forme a chaque morceau ?" : "Combien de morceaux obtient-on ?", qForme ? "Les morceaux sont…" : "Combien de morceaux y a-t-il ?"]),
      ...(qForme ? qcm(forme, ["Des triangles", "Des carrés", "Des rectangles", "Des losanges"]) : qcmN(n, [n + 1, n * 2, n - 1].filter((v) => v > 0))),
      canvas: poly(f, { rot: 0, traits }),
      explanation: etapes("on suit les coupes sur le dessin.", `on obtient ${n} morceaux à 3 côtés.`, qForme ? "ce sont des triangles." : `${n} morceaux.`),
    };
  }),
  D(12, 3, "Le nom d'une figure dépend de ses propriétés, pas de sa position.", () => {
    const [f, rot, juste, quoi] = un<[Forme, number, string, string]>([
      ["carre", 45, "Un carré", "ses 4 côtés sont égaux et ses 4 angles sont droits"],
      ["carre", 30, "Un carré", "ses 4 côtés sont égaux et ses 4 angles sont droits"],
      ["rectangle", 35, "Un rectangle", "ses 4 angles sont droits"],
      ["losange", 0, "Un losange", "ses 4 côtés sont égaux, sans angle droit"],
      ["triRect", 135, "Un triangle rectangle", "il a un angle droit"],
    ]);
    const s = intro();
    return {
      text: tournure([s.phrase], ["Le dessin est penché.", "On l'a dessiné de travers.", "Le dessin est tourné."], ["Lis le codage."], PRECIS),
      ...qcm(juste, ["Un carré", "Un losange", "Un rectangle", "Un triangle rectangle", "Un quadrilatère quelconque"]),
      canvas: code(f, { rot }),
      explanation: etapes("on oublie la position et on lit le codage.", `${quoi}.`, `c'est ${bas(juste)}.`),
    };
  }),
  D(13, 3, "Lis chaque indice et élimine les figures qui ne vont pas.", () => {
    const [ind, juste, faux] = un<[string, string, string[]]>([
      ["J'ai 4 côtés égaux et un angle droit.", "Un carré", ["Un losange sans angle droit", "Un rectangle allongé", "Un triangle"]],
      ["J'ai 4 angles droits et deux côtés voisins égaux.", "Un carré", ["Un rectangle allongé", "Un losange sans angle droit", "Un triangle"]],
      ["J'ai 3 côtés, dont 2 seulement de même longueur.", "Un triangle isocèle", ["Un triangle équilatéral", "Un triangle rectangle", "Un losange"]],
      ["J'ai 3 côtés égaux.", "Un triangle équilatéral", ["Un triangle à 2 côtés égaux seulement", "Un triangle rectangle", "Un carré"]],
      ["J'ai 3 côtés et un angle droit.", "Un triangle rectangle", ["Un rectangle", "Un triangle équilatéral", "Un carré"]],
      ["J'ai 4 angles droits mais mes 4 côtés ne sont pas égaux.", "Un rectangle", ["Un carré", "Un losange", "Un triangle rectangle"]],
      ["J'ai 4 côtés égaux et aucun angle droit.", "Un losange", ["Un carré", "Un rectangle", "Un triangle équilatéral"]],
      ["Je suis rond : tous mes points sont à la même distance du centre.", "Un cercle", ["Un disque", "Un carré", "Un diamètre"]],
      ["J'ai 6 côtés.", "Un hexagone", ["Un pentagone", "Un octogone", "Un quadrilatère"]],
      ["J'ai 5 côtés.", "Un pentagone", ["Un hexagone", "Un quadrilatère", "Un octogone"]],
      ["Je relie deux points du cercle en passant par le centre.", "Un diamètre", ["Un rayon", "Le centre", "Un disque"]],
    ]);
    const qui = un(["La maîtresse", "Le maître", "Un magicien", "Le robot du club", "Une énigme du jeu vidéo", "La mascotte de la classe", "Le livre de jeux", "Une carte au trésor"]);
    return {
      text: tournure([`${qui} pose une devinette.`, `${qui} propose une énigme.`, `Défi de ${bas(qui)}.`.replace("Défi de le ", "Défi du ").replace("Défi de la ", "Défi de la ")], [`« ${ind} Qui suis-je ? »`, `« ${ind} Qui suis-je ? »`.replace("Qui suis-je", "Quelle figure suis-je"), `« Indice : ${bas(ind)} Qui suis-je ? »`]),
      ...qcm(juste, faux),
      explanation: etapes("on lit les indices un par un.", ind, `c'est ${bas(juste)}.`),
    };
  }),
  D(14, 4, "Le tour est fait de côtés égaux : retire ce qui est connu, puis partage.", () => {
    const cas = un(["equi", "carre", "iso", "iso"]);
    const s = intro(), u = s.u;
    if (cas === "iso") {
      const a = entre(4, 15), b = entre(2, Math.min(12, 2 * a - 2));
      const p = 2 * a + b;
      return {
        text: tournure([`${s.phrase.replace(/\.$/, "")} : un triangle isocèle.`], [`Son tour mesure ${p} ${u} et sa base ${b} ${u}.`, `Son périmètre est ${p} ${u} ; le côté différent mesure ${b} ${u}.`], ["Combien mesure chacun des deux côtés égaux ?", "Quelle est la longueur d'un côté égal ?"]),
        ...qcmN(a, [p - b, (p - b) / 2 + b, Math.round(p / 3), a + b].filter((v) => Number.isInteger(v)), u),
        canvas: code("isocele", { textes: { 0: `${b} ${u}` } }),
        explanation: etapes(`on retire la base : ${p} − ${b} = ${p - b}.`, `on partage en 2 : ${p - b} ÷ 2 = ${a}.`, `chaque côté égal mesure ${a} ${u}.`),
      };
    }
    const n = cas === "equi" ? 3 : 4;
    const a = entre(4, 25);
    const p = n * a;
    const f: Forme = cas === "equi" ? "equilateral" : "carre";
    return {
      text: tournure([`${s.phrase.replace(/\.$/, "")} : un ${cas === "equi" ? "triangle équilatéral" : "carré"}.`], [`Il faut ${p} ${u} de ruban pour en faire le tour.`, `Son tour mesure ${p} ${u}.`, `Son périmètre est de ${p} ${u}.`], ["Combien mesure un côté ?", "Quelle est la longueur d'un côté ?"]),
      ...qcmN(a, [p / 2, n === 3 ? p / 4 : p / 3, p - n].filter((v) => Number.isInteger(v)), u),
      canvas: code(f),
      explanation: etapes(`les ${n} côtés sont égaux.`, `${p} ÷ ${n} = ${a}.`, `un côté mesure ${a} ${u}.`),
    };
  }),
  D(15, 4, "Combien de diamètres tiennent dans la longueur ?", () => {
    const n = entre(3, 8);
    const r = un([1, 2, 3, 4, 5]);
    const L = 2 * r * n;
    const [obj, ou] = un<[string, string]>([["cookies", "une plaque de"], ["pièces", "une réglette de"], ["balles", "un tube de"], ["galets ronds", "une étagère de"], ["boutons", "un ruban de"], ["perles", "un fil de"], ["jetons", "une boîte de"], ["pots ronds", "un rebord de fenêtre de"], ["macarons", "une boîte de"], ["bouchons", "une règle de"]]);
    return {
      text: tournure([`Sur ${ou} ${L} cm de long, on aligne des ${obj} de ${r} cm de rayon.`, `On range des ${obj} de rayon ${r} cm, côte à côte, sur ${ou} ${L} cm.`], ["Combien peut-on en aligner ?", "Combien en tient-il sur la longueur ?", "Combien en faut-il pour remplir la longueur ?"]),
      ...qcmN(n, [L / r, n + 1, n - 1, L - 2 * r].filter((v) => Number.isInteger(v) && v !== n)),
      canvas: rangee(2, `${r} cm`, false),
      explanation: etapes(`chaque ${obj.replace(/s$/, "").replace(/x$/, "")} prend un diamètre : 2 × ${r} = ${2 * r} cm.`, `${L} ÷ ${2 * r} = ${n}.`, `on peut en aligner ${n}.`),
    };
  }),
  D(16, 4, "Pour chaque figure, vérifie la propriété demandée.", () => {
    const [prop, juste, autres] = un<[string, string, string[]]>([
      ["n'a PAS d'angle droit", "Le losange aplati", ["Le carré", "Le rectangle", "Le triangle rectangle"]],
      ["n'a PAS 4 côtés égaux", "Le rectangle allongé", ["Le carré", "Le losange", "Le carré penché"]],
      ["n'a PAS 4 angles droits", "Le losange aplati", ["Le carré", "Le rectangle", "Le carré penché"]],
      ["n'a PAS 3 côtés égaux", "Le triangle à 2 côtés égaux seulement", ["Le triangle équilatéral", "Le panneau « danger »", "Le triangle aux 3 côtés codés"]],
      ["n'est PAS un quadrilatère", "Le triangle rectangle", ["Le carré", "Le losange", "Le rectangle"]],
      ["n'a PAS de côté droit", "Le cercle", ["Le carré", "Le triangle", "Le losange"]],
    ]);
    const qui = un(["Un jeu de l'intrus.", "Défi de l'intrus.", `${un(PRENOMS)} cherche l'intrus.`, "Trouve l'intrus."]);
    return {
      text: tournure([qui], [`Quelle figure ${prop} ?`, `Laquelle de ces figures ${prop} ?`]),
      ...qcm(juste, autres),
      explanation: etapes("on vérifie la propriété pour chaque figure.", `seul${juste.startsWith("La") ? "e" : ""} ${bas(juste)} ${prop.replace("PAS", "pas")}.`, `l'intrus est ${bas(juste)}.`),
    };
  }),
];
