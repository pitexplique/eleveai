// AIRE DU LOSANGE ET DU TRAPÈZE (05/11/2026).
//
// Suisse, Belgique, Sénégal, Côte d'Ivoire. Le programme français n'exige pas ces deux
// formules : micros masquées, voir `lib/tutor-v4/micros-masquees.ts`. Elles vivent dans
// la notion d'aires de la 5e, qui reste visible.
//
// ⛔ ★1-★2 : phrase courte, sans contexte. ★3 : retrouver une dimension, figures en contexte.

import type { QuadrilatereCanvasData } from "@/lib/tutor-v4/types_canvas";
import { entre, expliquer, fabriqueGabarits, fr, mesure, qcm, un, UNITES } from "@/lib/tutor-v4/questionBank/outils-geometrie";

const tpl = fabriqueGabarits("5e", "aire_surface", ["aire", "quadrilatere", "canvas"]);

const DEF_L = "l’aire d’un losange vaut le produit de ses diagonales, divisé par 2 : c’est la moitié du rectangle construit sur ses diagonales.";
const DEF_T = "l’aire d’un trapèze vaut (grande base + petite base) × hauteur ÷ 2 : une diagonale le coupe en deux triangles de même hauteur.";

const phrase = (debuts: readonly string[], fins: readonly string[]) => `${un(debuts)} ${un(fins)}`;
const borne = (x: number, a: number, b: number) => Math.max(a, Math.min(b, x));

/** Le losange, A en haut, B à droite : [AC] verticale, [BD] horizontale. */
function figLosange(ac: number, bd: number, opts: { ac?: string; bd?: string } = {}): QuadrilatereCanvasData {
  const k = Math.min(180 / ac, 230 / bd);
  const v = borne(ac * k, 110, 180) / 2;
  const h = borne(bd * k, 130, 230) / 2;
  return {
    kind: "quadrilatere",
    size: { width: 300, height: 240 },
    points: { A: { x: 150, y: 120 - v }, B: { x: 150 + h, y: 120 }, C: { x: 150, y: 120 + v }, D: { x: 150 - h, y: 120 } },
    sideLabels: { ...(opts.ac ? { AC: opts.ac } : {}), ...(opts.bd ? { BD: opts.bd } : {}) },
    marks: { equalSides: [["AB", "BC"], ["BC", "CD"], ["CD", "DA"]] },
    display: { showPoints: true, showLabels: true, showSides: true, showAngles: false, showDiagonals: true },
  };
}

/**
 * Le trapèze : (AB) et (CD) parallèles, la hauteur issue de D, ou [AD] s'il est rectangle.
 * ⚠️ Le canvas pose le nom de A et de B au-dessus, de C et de D en dessous : la grande base
 * étant en bas, on dessine la figure à l'envers et on la renomme (`labels`), sinon C et D
 * tombent sur les côtés obliques. Sommets du dessin → noms lus : A → D, B → C, C → B, D → A.
 */
function figTrapeze(B: number, b: number, h: number, opts: { B?: string; b?: string; h?: string; rectangle?: boolean; oblique?: string } = {}): QuadrilatereCanvasData {
  const k = 230 / B;
  const hp = borne(h * k, 60, 130);
  const dec = opts.rectangle ? 0 : (B - b) * k * (0.25 + Math.random() * 0.5);
  const y = 190;
  const x = 35;
  return {
    kind: "quadrilatere",
    size: { width: 300, height: 230 },
    points: { A: { x: x + dec, y: y - hp }, B: { x: x + dec + b * k, y: y - hp }, C: { x: x + B * k, y }, D: { x, y } },
    labels: { A: "D", B: "C", C: "B", D: "A" },
    sideLabels: {
      ...(opts.B ? { CD: opts.B } : {}),
      ...(opts.b ? { AB: opts.b } : {}),
      ...(opts.rectangle && opts.h ? { AD: opts.h } : {}),
      ...(opts.oblique ? { BC: opts.oblique } : {}),
    },
    ...(!opts.rectangle ? { height: { fromVertex: "A" as const, onSide: "CD" as const, label: opts.h } } : {}),
    // Les chevrons des parallèles se poseraient sur les longueurs écrites.
    marks: { ...(opts.B ? {} : { parallelSides: [["AB", "CD"] as ["AB", "CD"]] }), ...(opts.rectangle ? { rightAnglesAt: ["A", "D"] as ("A" | "D")[] } : {}) },
    display: { showPoints: true, showLabels: true, showSides: true, showAngles: false },
  };
}

/** Deux diagonales différentes, de produit pair : l'aire tombe juste. */
function diagonales(max = 24): [number, number] {
  for (;;) {
    const D = entre(5, max);
    const d = entre(Math.max(3, Math.ceil(D / 3)), D - 1);
    if ((D * d) % 2 === 0) return [D, d];
  }
}

/** Grande base, petite base, hauteur, de somme pair × hauteur pair. */
function trapeze(): [number, number, number] {
  for (;;) {
    const B = entre(6, 24);
    const b = entre(Math.max(2, Math.ceil(B / 3)), B - 1);
    const h = entre(2, 16);
    if (((B + b) * h) % 2 === 0) return [B, b, h];
  }
}

const FINS_AIRE = ["Calcule son aire.", "Quelle est son aire ?", "Combien vaut son aire ?", "Donne son aire.", "Trouve son aire."];

/* Les figures en contexte : le texte donne toujours les deux diagonales dans cet ordre. */
const LOSANGES: { nom: string; u: string; D: [number, number]; quoi: string }[] = [
  { nom: "Un cerf-volant en losange", u: "cm", D: [60, 120], quoi: "Quelle surface de toile faut-il ?" },
  { nom: "Un vitrail en losange", u: "cm", D: [30, 80], quoi: "Quelle surface de verre faut-il ?" },
  { nom: "Un carreau de faïence en losange", u: "cm", D: [10, 30], quoi: "Quelle surface couvre-t-il ?" },
  { nom: "Le losange d’un drapeau", u: "cm", D: [40, 120], quoi: "Quelle surface de tissu jaune faut-il ?" },
  { nom: "Un panneau de chantier en losange", u: "cm", D: [50, 90], quoi: "Quelle surface de tôle faut-il ?" },
  { nom: "Un pendentif en losange", u: "mm", D: [15, 40], quoi: "Quelle surface d’argent faut-il ?" },
  { nom: "Une pièce de patchwork en losange", u: "cm", D: [8, 24], quoi: "Quelle surface de tissu faut-il ?" },
  { nom: "Une ardoise de toit en losange", u: "cm", D: [20, 50], quoi: "Quelle surface de toit couvre-t-elle ?" },
  { nom: "Une tesselle de mosaïque en losange", u: "mm", D: [12, 40], quoi: "Quelle surface de mur couvre-t-elle ?" },
  { nom: "Une piste de danse en losange", u: "m", D: [6, 20], quoi: "Quelle surface de parquet faut-il ?" },
  { nom: "Un massif de fleurs en losange", u: "m", D: [4, 12], quoi: "Quelle surface faut-il planter ?" },
  { nom: "Une enseigne de boutique en losange", u: "cm", D: [40, 90], quoi: "Quelle surface faut-il peindre ?" },
];

const COLLECTIONS: { nom: string; l: string; u: string; D: [number, number]; n: [number, number] }[] = [
  { nom: "Une fresque compte", l: "tuiles en losange", u: "cm", D: [10, 30], n: [20, 120] },
  { nom: "Un couvre-lit assemble", l: "pièces de tissu en losange", u: "cm", D: [8, 24], n: [30, 150] },
  { nom: "Une façade porte", l: "ardoises en losange", u: "cm", D: [16, 40], n: [50, 300] },
  { nom: "Un sol de hall est fait de", l: "dalles en losange", u: "cm", D: [20, 50], n: [40, 200] },
  { nom: "Une guirlande de fête porte", l: "fanions en losange", u: "cm", D: [12, 30], n: [12, 40] },
  { nom: "Un bracelet aligne", l: "perles plates en losange", u: "mm", D: [6, 16], n: [10, 30] },
  { nom: "Une verrière rassemble", l: "vitres en losange", u: "cm", D: [20, 60], n: [20, 80] },
  { nom: "Une robe de scène porte", l: "sequins en losange", u: "mm", D: [6, 20], n: [100, 400] },
  { nom: "Un parterre réunit", l: "massifs en losange", u: "m", D: [2, 8], n: [4, 16] },
  { nom: "Un mur de piscine compte", l: "carreaux en losange", u: "cm", D: [8, 20], n: [60, 240] },
];

const TRAPEZES: { nom: string; u: string; B: [number, number]; h: [number, number]; quoi: string; mot: string }[] = [
  { nom: "Une voile de bateau en trapèze", u: "m", B: [5, 14], h: [4, 12], quoi: "Quelle surface de toile faut-il ?", mot: "une hauteur" },
  { nom: "Une parcelle de jardin en trapèze", u: "m", B: [12, 40], h: [6, 24], quoi: "Quelle est sa surface ?", mot: "une largeur" },
  { nom: "La coupe d’un canal en trapèze", u: "m", B: [6, 16], h: [2, 6], quoi: "Quelle est l’aire de cette coupe ?", mot: "une profondeur" },
  { nom: "Une terrasse en trapèze", u: "m", B: [5, 14], h: [3, 8], quoi: "Quelle surface de dalles faut-il ?", mot: "une largeur" },
  { nom: "Le pignon d’une grange en trapèze", u: "m", B: [6, 14], h: [2, 6], quoi: "Quelle surface de bardage faut-il ?", mot: "une hauteur" },
  { nom: "Un pan de toit en trapèze", u: "m", B: [8, 18], h: [3, 7], quoi: "Quelle surface de tuiles faut-il ?", mot: "une hauteur" },
  { nom: "Une scène de théâtre en trapèze", u: "m", B: [8, 16], h: [4, 9], quoi: "Quelle surface de plancher faut-il ?", mot: "une profondeur" },
  { nom: "Un abat-jour déplié en trapèze", u: "cm", B: [20, 50], h: [12, 30], quoi: "Quelle surface de papier faut-il ?", mot: "une hauteur" },
  { nom: "Une table de réunion en trapèze", u: "cm", B: [140, 240], h: [60, 110], quoi: "Quelle surface de plateau faut-il ?", mot: "une largeur" },
  { nom: "Un talus en trapèze", u: "m", B: [10, 30], h: [2, 8], quoi: "Quelle surface d’herbe faut-il semer ?", mot: "une hauteur" },
  { nom: "La face d’un sac de sport en trapèze", u: "cm", B: [40, 70], h: [30, 50], quoi: "Quelle surface de toile faut-il ?", mot: "une hauteur" },
  { nom: "Une parcelle de canne à sucre de La Réunion, en trapèze,", u: "m", B: [40, 120], h: [30, 80], quoi: "Quelle est sa surface ?", mot: "une largeur" },
];

const ajuster = (x: number, pair: boolean) => (pair && x % 2 ? x + 1 : x);

export const airesLosangeTrapezeBank = [
  /* ===== AIRE DU LOSANGE ===== */

  tpl("aire_losange", 1, 1, "Aire du losange = diagonale × diagonale ÷ 2.", () => {
    const u = un(UNITES);
    const [D, d] = diagonales();
    const a = (D * d) / 2;
    const text = phrase(
      [
        `Un losange a des diagonales de ${D} ${u} et ${d} ${u}.`,
        `Les diagonales d’un losange mesurent ${D} ${u} et ${d} ${u}.`,
        `Dans un losange, une diagonale fait ${D} ${u} et l’autre ${d} ${u}.`,
        `Ce losange a une grande diagonale de ${D} ${u} et une petite de ${d} ${u}.`,
        `On trace un losange dont les diagonales mesurent ${D} ${u} et ${d} ${u}.`,
        `ABCD est un losange, avec AC = ${D} ${u} et BD = ${d} ${u}.`,
        `Losange : diagonales de ${D} ${u} et de ${d} ${u}.`,
      ],
      FINS_AIRE,
    );
    return { text, format: "short", expected: mesure(a, `${u}²`), comparator: "number_equal", canvas: figLosange(D, d), explanation: expliquer(DEF_L, "on multiplie les diagonales, puis on divise par 2.", `${D} × ${d} ÷ 2 = ${fr(a)}.`, `l’aire est de ${fr(a)} ${u}².`) };
  }),

  tpl("aire_losange", 2, 1, "On multiplie les deux diagonales, puis on divise par 2.", () => {
    const u = un(UNITES);
    const [D, d] = diagonales();
    const text = phrase(
      [
        `Un losange a des diagonales de ${D} ${u} et ${d} ${u}.`,
        `Les diagonales de ce losange mesurent ${D} ${u} et ${d} ${u}.`,
        `Une diagonale d’un losange fait ${D} ${u}, l’autre ${d} ${u}.`,
        `ABCD est un losange : AC = ${D} ${u} et BD = ${d} ${u}.`,
        `On connaît les diagonales d’un losange : ${D} ${u} et ${d} ${u}.`,
      ],
      ["Quel calcul donne son aire ?", "Quel calcul faut-il faire pour trouver son aire ?", "Lequel de ces calculs donne son aire ?", "Comment calculer son aire ?"],
    );
    const juste = `${D} × ${d} ÷ 2`;
    return { text, format: "qcm", choices: qcm(juste, [`${D} × ${d}`, `(${D} + ${d}) × 2`, `${D} + ${d} ÷ 2`, `${D} × ${D} ÷ 2`]), expected: [juste], comparator: "mcq_exact", canvas: figLosange(D, d), explanation: expliquer(DEF_L, "le produit des diagonales est l’aire du rectangle : le losange en est la moitié.", juste + ".", `le bon calcul est ${juste}.`) };
  }),

  tpl("aire_losange", 3, 1, "Lis AC et BD sur la figure, puis applique la formule.", () => {
    const u = un(UNITES);
    const [D, d] = diagonales();
    const a = (D * d) / 2;
    const text = un([
      "Lis les diagonales sur la figure. Quelle est l’aire de ce losange ?",
      "Les diagonales sont écrites sur la figure. Calcule l’aire du losange.",
      "ABCD est un losange. Ses diagonales sont sur la figure. Quelle est son aire ?",
      "Voici un losange et ses diagonales. Combien vaut son aire ?",
      "D’après la figure, quelle est l’aire du losange ABCD ?",
      "Utilise les longueurs de la figure pour calculer l’aire du losange.",
      "Sur cette figure, AC et BD sont les diagonales du losange. Donne son aire.",
      "Cette figure donne AC et BD. Trouve l’aire de ce losange.",
    ]);
    return { text, format: "short", expected: mesure(a, `${u}²`), comparator: "number_equal", canvas: figLosange(D, d, { ac: `${D} ${u}`, bd: `${d} ${u}` }), explanation: expliquer(DEF_L, "on lit les deux diagonales, on les multiplie, on divise par 2.", `${D} × ${d} ÷ 2 = ${fr(a)}.`, `l’aire est de ${fr(a)} ${u}².`) };
  }),

  tpl("aire_losange", 4, 2, "Même formule avec des nombres décimaux.", () => {
    const u = un(["cm", "dm", "m"]);
    const D = entre(9, 41) / 2;
    const d = 2 * entre(2, 9);
    const a = (D * d) / 2;
    const text = phrase(
      [
        `Un losange a des diagonales de ${fr(D)} ${u} et ${d} ${u}.`,
        `Les diagonales d’un losange mesurent ${fr(D)} ${u} et ${d} ${u}.`,
        `Dans un losange, les diagonales font ${fr(D)} ${u} et ${d} ${u}.`,
        `ABCD est un losange tel que AC = ${fr(D)} ${u} et BD = ${d} ${u}.`,
        `On trace un losange de diagonales ${fr(D)} ${u} et ${d} ${u}.`,
      ],
      FINS_AIRE,
    );
    return { text, format: "short", expected: mesure(a, `${u}²`), comparator: "number_equal", canvas: figLosange(D, d), explanation: expliquer(DEF_L, "le produit des diagonales, divisé par 2.", `${fr(D)} × ${d} ÷ 2 = ${fr(a)}.`, `l’aire est de ${fr(a)} ${u}².`) };
  }),

  tpl("aire_losange", 5, 2, "Le centre coupe chaque diagonale en deux : double d’abord.", () => {
    const u = un(UNITES);
    const a = entre(3, 14);
    const b = un(Array.from({ length: 11 }, (_, i) => i + 2).filter((x) => x !== a));
    const o = un(["O", "K", "I", "J"]);
    const aire = 2 * a * b;
    const text = phrase(
      [
        `ABCD est un losange de centre ${o}, avec ${o}A = ${a} ${u} et ${o}B = ${b} ${u}.`,
        `Les diagonales du losange ABCD se coupent en ${o}. On sait que ${o}A = ${a} ${u} et ${o}B = ${b} ${u}.`,
        `Dans le losange ABCD de centre ${o} : ${o}A = ${a} ${u}, ${o}B = ${b} ${u}.`,
        `Le losange ABCD a pour centre ${o}. On mesure ${o}A = ${a} ${u} et ${o}B = ${b} ${u}.`,
      ],
      ["Calcule l’aire du losange.", "Quelle est l’aire de ABCD ?", "Combien vaut l’aire de ce losange ?", "Donne l’aire de ABCD."],
    );
    return { text, format: "short", expected: mesure(aire, `${u}²`), comparator: "number_equal", canvas: figLosange(2 * a, 2 * b), explanation: expliquer(DEF_L, `${o}A et ${o}B sont des moitiés de diagonales : on les double d’abord.`, `AC = ${2 * a}, BD = ${2 * b}, puis ${2 * a} × ${2 * b} ÷ 2 = ${aire}.`, `l’aire est de ${aire} ${u}².`) };
  }),

  tpl("aire_losange", 6, 2, "Le rectangle a pour côtés les diagonales du losange : le losange en est la moitié.", () => {
    const u = un(UNITES);
    const [D, d] = diagonales();
    const a = (D * d) / 2;
    const text = phrase(
      [
        `Un rectangle mesure ${D} ${u} sur ${d} ${u}. On relie les milieux de ses côtés : on obtient un losange.`,
        `On joint les milieux des côtés d’un rectangle de ${D} ${u} sur ${d} ${u}, ce qui forme un losange.`,
        `Un losange a ses sommets aux milieux des côtés d’un rectangle de ${D} ${u} sur ${d} ${u}.`,
        `Dans un rectangle de ${D} ${u} sur ${d} ${u}, on trace le losange qui relie les milieux des côtés.`,
      ],
      ["Quelle est l’aire du losange ?", "Calcule l’aire du losange.", "Combien vaut l’aire de ce losange ?", "Donne l’aire du losange."],
    );
    return { text, format: "short", expected: mesure(a, `${u}²`), comparator: "number_equal", canvas: figLosange(D, d), explanation: expliquer(DEF_L, "les diagonales du losange ont les dimensions du rectangle.", `${D} × ${d} ÷ 2 = ${fr(a)}.`, `l’aire du losange est de ${fr(a)} ${u}².`) };
  }),

  tpl("aire_losange", 7, 2, "Un carré est un losange : ses deux diagonales sont égales.", () => {
    const u = un(UNITES);
    const D = 2 * entre(2, 15);
    const a = (D * D) / 2;
    const text = phrase(
      [
        `Un carré a des diagonales de ${D} ${u}. C’est un losange particulier.`,
        `Les diagonales d’un carré mesurent ${D} ${u}. Un carré est un losange.`,
        `Un carré est un losange dont les diagonales sont égales, ici ${D} ${u}.`,
        `Dans un carré, chaque diagonale fait ${D} ${u}.`,
      ],
      ["Utilise la formule du losange pour calculer son aire.", "Quelle est son aire, avec la formule du losange ?", "Calcule son aire par la formule du losange.", "Donne son aire."],
    );
    return { text, format: "short", expected: mesure(a, `${u}²`), comparator: "number_equal", canvas: figLosange(D, D), explanation: expliquer(DEF_L, "les deux diagonales sont égales.", `${D} × ${D} ÷ 2 = ${fr(a)}.`, `l’aire du carré est de ${fr(a)} ${u}².`) };
  }),

  tpl("aire_losange", 8, 3, "Autre diagonale = aire × 2 ÷ diagonale connue.", () => {
    const u = un(UNITES);
    const [D, d] = diagonales();
    const a = (D * d) / 2;
    const text = phrase(
      [
        `Un losange a une aire de ${fr(a)} ${u}² et une diagonale de ${D} ${u}.`,
        `L’aire d’un losange vaut ${fr(a)} ${u}². Une de ses diagonales mesure ${D} ${u}.`,
        `Un losange d’aire ${fr(a)} ${u}² a une diagonale de ${D} ${u}.`,
        `ABCD est un losange d’aire ${fr(a)} ${u}², et AC = ${D} ${u}.`,
      ],
      ["Combien mesure l’autre diagonale ?", "Quelle est la longueur de l’autre diagonale ?", "Trouve la seconde diagonale.", "Calcule la longueur de l’autre diagonale."],
    );
    return { text, format: "short", expected: mesure(d, u), comparator: "number_equal", canvas: figLosange(D, d), explanation: expliquer(DEF_L, "on remonte le calcul : aire × 2, puis on divise par la diagonale connue.", `${fr(a)} × 2 ÷ ${D} = ${d}.`, `l’autre diagonale mesure ${d} ${u}.`) };
  }),

  tpl("aire_losange", 9, 3, "Repère les deux diagonales dans l’énoncé, puis applique la formule.", () => {
    const o = un(LOSANGES);
    const D = 2 * entre(o.D[0] / 2, o.D[1] / 2);
    const d = entre(Math.ceil(o.D[0] / 2), Math.max(Math.ceil(o.D[0] / 2) + 1, D - 1));
    const a = (D * d) / 2;
    const text = phrase([`${o.nom} a des diagonales de ${D} ${o.u} et ${d} ${o.u}.`, `${o.nom} a pour diagonales ${D} ${o.u} et ${d} ${o.u}.`, `${o.nom} mesure ${D} ${o.u} d’une pointe à l’autre dans un sens, ${d} ${o.u} dans l’autre.`], [o.quoi]);
    return { text, format: "short", expected: mesure(a, `${o.u}²`), comparator: "number_equal", canvas: figLosange(D, d), explanation: expliquer(DEF_L, "les deux longueurs données sont les diagonales.", `${D} × ${d} ÷ 2 = ${fr(a)}.`, `il faut ${fr(a)} ${o.u}².`) };
  }),

  tpl("aire_losange", 10, 3, "On remonte la formule : aire × 2 ÷ diagonale connue.", () => {
    const o = un(LOSANGES);
    const D = 2 * entre(o.D[0] / 2, o.D[1] / 2);
    const d = entre(Math.ceil(o.D[0] / 2), Math.max(Math.ceil(o.D[0] / 2) + 1, D - 1));
    const a = (D * d) / 2;
    const text = phrase(
      [`${o.nom} couvre ${fr(a)} ${o.u}², et sa grande diagonale mesure ${D} ${o.u}.`, `${o.nom} a une aire de ${fr(a)} ${o.u}² pour une diagonale de ${D} ${o.u}.`, `${o.nom} a une surface de ${fr(a)} ${o.u}². Une diagonale fait ${D} ${o.u}.`],
      ["Combien mesure l’autre diagonale ?", "Quelle est la longueur de l’autre diagonale ?", "Que mesure la seconde diagonale ?"],
    );
    return { text, format: "short", expected: mesure(d, o.u), comparator: "number_equal", canvas: figLosange(D, d), explanation: expliquer(DEF_L, "aire × 2, puis on divise par la diagonale connue.", `${fr(a)} × 2 ÷ ${D} = ${d}.`, `l’autre diagonale mesure ${d} ${o.u}.`) };
  }),

  tpl("aire_losange", 11, 3, "L’aire d’un losange, puis multiplie par le nombre de losanges.", () => {
    const o = un(COLLECTIONS);
    const D = 2 * entre(o.D[0] / 2, o.D[1] / 2);
    const d = entre(Math.ceil(o.D[0] / 2), Math.max(Math.ceil(o.D[0] / 2) + 1, D - 1));
    const n = 2 * entre(o.n[0] / 2, o.n[1] / 2);
    const a1 = (D * d) / 2;
    const a = a1 * n;
    const fin = un(["Quelle surface couvrent-ils en tout ?", "Quelle est l’aire totale ?", "Quelle est la surface totale ?"]);
    const text = `${o.nom} ${n} ${o.l}. Chacun a des diagonales de ${D} ${o.u} et ${d} ${o.u}. ${fin}`;
    return { text, format: "short", expected: mesure(a, `${o.u}²`), comparator: "number_equal", canvas: figLosange(D, d), explanation: expliquer(DEF_L, "l’aire d’un losange, multipliée par leur nombre.", `${D} × ${d} ÷ 2 = ${fr(a1)}, puis ${fr(a1)} × ${n} = ${fr(a)}.`, `ils couvrent ${fr(a)} ${o.u}².`) };
  }),

  /* ===== AIRE DU TRAPÈZE ===== */

  tpl("aire_trapeze", 1, 1, "Aire du trapèze = (grande base + petite base) × hauteur ÷ 2.", () => {
    const u = un(UNITES);
    const [B, b, h] = trapeze();
    const a = ((B + b) * h) / 2;
    const text = phrase(
      [
        `Un trapèze a des bases de ${B} ${u} et ${b} ${u}, et une hauteur de ${h} ${u}.`,
        `Les bases d’un trapèze mesurent ${B} ${u} et ${b} ${u}. Sa hauteur fait ${h} ${u}.`,
        `Dans un trapèze, la grande base fait ${B} ${u}, la petite ${b} ${u} et la hauteur ${h} ${u}.`,
        `Ce trapèze a pour grande base ${B} ${u}, pour petite base ${b} ${u} et pour hauteur ${h} ${u}.`,
        `Trapèze : bases de ${B} ${u} et ${b} ${u}, hauteur de ${h} ${u}.`,
        `On trace un trapèze de bases ${B} ${u} et ${b} ${u}, de hauteur ${h} ${u}.`,
      ],
      FINS_AIRE,
    );
    return { text, format: "short", expected: mesure(a, `${u}²`), comparator: "number_equal", canvas: figTrapeze(B, b, h), explanation: expliquer(DEF_T, "on additionne les bases, on multiplie par la hauteur, on divise par 2.", `(${B} + ${b}) × ${h} ÷ 2 = ${fr(a)}.`, `l’aire est de ${fr(a)} ${u}².`) };
  }),

  tpl("aire_trapeze", 2, 1, "D’abord la somme des bases, puis × hauteur, puis ÷ 2.", () => {
    const u = un(UNITES);
    const [B, b, h] = trapeze();
    const text = phrase(
      [
        `Un trapèze a des bases de ${B} ${u} et ${b} ${u}, et une hauteur de ${h} ${u}.`,
        `Les bases de ce trapèze mesurent ${B} ${u} et ${b} ${u} ; sa hauteur, ${h} ${u}.`,
        `Ce trapèze a une grande base de ${B} ${u}, une petite de ${b} ${u}, une hauteur de ${h} ${u}.`,
        `On connaît un trapèze : bases de ${B} ${u} et ${b} ${u}, hauteur de ${h} ${u}.`,
      ],
      ["Quel calcul donne son aire ?", "Quel calcul faut-il faire pour trouver son aire ?", "Lequel de ces calculs donne son aire ?", "Comment calculer son aire ?"],
    );
    const juste = `(${B} + ${b}) × ${h} ÷ 2`;
    return { text, format: "qcm", choices: qcm(juste, [`${B} × ${b} × ${h} ÷ 2`, `(${B} + ${b}) × ${h}`, `${B} + ${b} × ${h} ÷ 2`, `(${B} − ${b}) × ${h} ÷ 2`]), expected: [juste], comparator: "mcq_exact", canvas: figTrapeze(B, b, h), explanation: expliquer(DEF_T, "les parenthèses d’abord : la somme des deux bases.", juste + ".", `le bon calcul est ${juste}.`) };
  }),

  tpl("aire_trapeze", 3, 1, "Lis les deux bases et la hauteur sur la figure.", () => {
    const u = un(UNITES);
    const [B, b, h] = trapeze();
    const a = ((B + b) * h) / 2;
    const text = un([
      "Lis les bases et la hauteur sur la figure. Quelle est l’aire de ce trapèze ?",
      "Les longueurs sont écrites sur la figure. Calcule l’aire du trapèze.",
      "ABCD est un trapèze de bases [AB] et [CD]. Quelle est son aire ?",
      "Voici un trapèze, ses bases et sa hauteur. Combien vaut son aire ?",
      "D’après la figure, quelle est l’aire du trapèze ABCD ?",
      "Utilise les longueurs de la figure pour calculer l’aire du trapèze.",
      "Sur cette figure, (AB) et (CD) sont parallèles. Donne l’aire de ABCD.",
      "Cette figure donne les deux bases et la hauteur. Trouve l’aire.",
    ]);
    return { text, format: "short", expected: mesure(a, `${u}²`), comparator: "number_equal", canvas: figTrapeze(B, b, h, { B: `${B} ${u}`, b: `${b} ${u}`, h: `${h} ${u}` }), explanation: expliquer(DEF_T, "on lit les bases et la hauteur, puis on applique la formule.", `(${B} + ${b}) × ${h} ÷ 2 = ${fr(a)}.`, `l’aire est de ${fr(a)} ${u}².`) };
  }),

  tpl("aire_trapeze", 4, 2, "Même formule avec des nombres décimaux.", () => {
    const u = un(["cm", "dm", "m"]);
    const B = entre(13, 41) / 2;
    const b = entre(5, Math.floor(B) - 1);
    const h = 2 * entre(1, 8);
    const a = ((B + b) * h) / 2;
    const text = phrase(
      [
        `Un trapèze a des bases de ${fr(B)} ${u} et ${b} ${u}, et une hauteur de ${h} ${u}.`,
        `Les bases d’un trapèze mesurent ${fr(B)} ${u} et ${b} ${u}. Sa hauteur fait ${h} ${u}.`,
        `Dans un trapèze, la grande base fait ${fr(B)} ${u}, la petite ${b} ${u} et la hauteur ${h} ${u}.`,
        `On trace un trapèze de bases ${fr(B)} ${u} et ${b} ${u}, de hauteur ${h} ${u}.`,
      ],
      FINS_AIRE,
    );
    return { text, format: "short", expected: mesure(a, `${u}²`), comparator: "number_equal", canvas: figTrapeze(B, b, h), explanation: expliquer(DEF_T, "la somme des bases, × hauteur, ÷ 2.", `(${fr(B)} + ${b}) × ${h} ÷ 2 = ${fr(a)}.`, `l’aire est de ${fr(a)} ${u}².`) };
  }),

  tpl("aire_trapeze", 5, 2, "La hauteur est le côté perpendiculaire aux bases, pas le côté oblique.", () => {
    const u = un(UNITES);
    const [x, h, o] = un([[3, 4, 5], [6, 8, 10], [5, 12, 13], [4, 3, 5], [8, 6, 10], [9, 12, 15], [8, 15, 17]] as const);
    const b = entre(3, 16);
    const B = b + x;
    const a = ((B + b) * h) / 2;
    const text = phrase(
      [
        `ABCD est un trapèze rectangle en A et D : AB = ${B} ${u}, DC = ${b} ${u}, AD = ${h} ${u}, BC = ${o} ${u}.`,
        `Le trapèze ABCD est rectangle en A et D, avec AB = ${B} ${u}, DC = ${b} ${u}, AD = ${h} ${u} et BC = ${o} ${u}.`,
        `Dans le trapèze ABCD, rectangle en A et D, on a AB = ${B} ${u}, DC = ${b} ${u}, AD = ${h} ${u}, BC = ${o} ${u}.`,
      ],
      ["Calcule son aire.", "Quelle est son aire ?", "Combien vaut son aire ?", "Donne son aire.", "Attention au côté oblique : quelle est son aire ?"],
    );
    return { text, format: "short", expected: mesure(a, `${u}²`), comparator: "number_equal", canvas: figTrapeze(B, b, h, { rectangle: true, B: `${B} ${u}`, b: `${b} ${u}`, h: `${h} ${u}`, oblique: `${o} ${u}` }), explanation: expliquer(DEF_T, "[AD] est perpendiculaire aux bases : c’est la hauteur. [BC] est oblique et ne sert pas.", `(${B} + ${b}) × ${h} ÷ 2 = ${fr(a)}.`, `l’aire est de ${fr(a)} ${u}².`) };
  }),

  tpl("aire_trapeze", 6, 2, "Les deux triangles ont la même hauteur : ajoute leurs aires.", () => {
    const u = un(UNITES);
    const [B, b, h] = trapeze();
    const a = ((B + b) * h) / 2;
    const text = phrase(
      [
        `Une diagonale coupe un trapèze en deux triangles de même hauteur ${h} ${u}, de bases ${B} ${u} et ${b} ${u}.`,
        `Un trapèze est partagé par une diagonale en deux triangles, de hauteur ${h} ${u} et de bases ${B} ${u} et ${b} ${u}.`,
        `On trace une diagonale d’un trapèze : deux triangles de hauteur ${h} ${u} apparaissent, de bases ${B} ${u} et ${b} ${u}.`,
      ],
      ["Quelle est l’aire du trapèze ?", "Calcule l’aire du trapèze.", "Additionne les deux aires : que vaut l’aire du trapèze ?", "Combien vaut l’aire du trapèze ?"],
    );
    return { text, format: "short", expected: mesure(a, `${u}²`), comparator: "number_equal", canvas: figTrapeze(B, b, h), explanation: expliquer(DEF_T, "on ajoute les aires des deux triangles.", `${B} × ${h} ÷ 2 + ${b} × ${h} ÷ 2 = ${fr(a)}.`, `l’aire est de ${fr(a)} ${u}².`) };
  }),

  tpl("aire_trapeze", 7, 2, "La hauteur est perpendiculaire aux bases : [AD] ne sert pas.", () => {
    const u = un(UNITES);
    const [B, b, h] = trapeze();
    const o = h + entre(1, 4);
    const a = ((B + b) * h) / 2;
    const text = phrase(
      [
        `Dans le trapèze ABCD, (AB) et (CD) sont parallèles. H est le pied de la hauteur issue de D : AB = ${B} ${u}, CD = ${b} ${u}, DH = ${h} ${u}, AD = ${o} ${u}.`,
        `ABCD est un trapèze de bases [AB] et [CD], et [DH] est sa hauteur : AB = ${B} ${u}, CD = ${b} ${u}, DH = ${h} ${u}, AD = ${o} ${u}.`,
        `Le trapèze ABCD a pour bases [AB] et [CD], et H est sur (AB) avec (DH) perpendiculaire à (AB) : AB = ${B} ${u}, CD = ${b} ${u}, DH = ${h} ${u}, AD = ${o} ${u}.`,
      ],
      ["Calcule son aire.", "Quelle est son aire ?", "Quelle longueur ne sert pas ? Donne l’aire.", "Combien vaut son aire ?", "Donne son aire."],
    );
    return { text, format: "short", expected: mesure(a, `${u}²`), comparator: "number_equal", canvas: figTrapeze(B, b, h, { B: `${B} ${u}`, b: `${b} ${u}`, h: `${h} ${u}` }), explanation: expliquer(DEF_T, "on prend [DH], perpendiculaire aux bases ; [AD] est oblique.", `(${B} + ${b}) × ${h} ÷ 2 = ${fr(a)}.`, `l’aire est de ${fr(a)} ${u}².`) };
  }),

  tpl("aire_trapeze", 8, 3, "Hauteur = aire × 2 ÷ (somme des bases).", () => {
    const u = un(UNITES);
    const [B, b, h] = trapeze();
    const a = ((B + b) * h) / 2;
    const text = phrase(
      [
        `Un trapèze a une aire de ${fr(a)} ${u}², et ses bases mesurent ${B} ${u} et ${b} ${u}.`,
        `L’aire d’un trapèze vaut ${fr(a)} ${u}². Ses bases font ${B} ${u} et ${b} ${u}.`,
        `Un trapèze d’aire ${fr(a)} ${u}² a pour bases ${B} ${u} et ${b} ${u}.`,
        `ABCD est un trapèze d’aire ${fr(a)} ${u}², de bases ${B} ${u} et ${b} ${u}.`,
      ],
      ["Quelle est sa hauteur ?", "Combien mesure sa hauteur ?", "Trouve sa hauteur.", "Calcule sa hauteur."],
    );
    return { text, format: "short", expected: mesure(h, u), comparator: "number_equal", canvas: figTrapeze(B, b, h), explanation: expliquer(DEF_T, "on remonte : aire × 2, puis on divise par la somme des bases.", `${fr(a)} × 2 ÷ (${B} + ${b}) = ${h}.`, `la hauteur mesure ${h} ${u}.`) };
  }),

  tpl("aire_trapeze", 9, 3, "Somme des bases = aire × 2 ÷ hauteur ; on retire la base connue.", () => {
    const u = un(UNITES);
    const [B, b, h] = trapeze();
    const a = ((B + b) * h) / 2;
    const text = phrase(
      [
        `Un trapèze a une aire de ${fr(a)} ${u}², une hauteur de ${h} ${u} et une grande base de ${B} ${u}.`,
        `L’aire d’un trapèze vaut ${fr(a)} ${u}². Sa hauteur fait ${h} ${u}, sa grande base ${B} ${u}.`,
        `Un trapèze d’aire ${fr(a)} ${u}² a pour hauteur ${h} ${u} et pour grande base ${B} ${u}.`,
        `ABCD est un trapèze d’aire ${fr(a)} ${u}², de hauteur ${h} ${u}, de grande base ${B} ${u}.`,
      ],
      ["Combien mesure la petite base ?", "Quelle est sa petite base ?", "Trouve la petite base.", "Calcule la longueur de la petite base."],
    );
    return { text, format: "short", expected: mesure(b, u), comparator: "number_equal", canvas: figTrapeze(B, b, h), explanation: expliquer(DEF_T, "aire × 2 ÷ hauteur donne la somme des bases ; on retire la grande base.", `${fr(a)} × 2 ÷ ${h} = ${B + b}, puis ${B + b} − ${B} = ${b}.`, `la petite base mesure ${b} ${u}.`) };
  }),

  tpl("aire_trapeze", 10, 3, "Repère les bases (parallèles) et la hauteur.", () => {
    const o = un(TRAPEZES);
    const B = entre(o.B[0], o.B[1]);
    const b = entre(Math.ceil(B / 2), B - 1);
    const h = ajuster(entre(o.h[0], o.h[1]), (B + b) % 2 === 1);
    const a = ((B + b) * h) / 2;
    const text = phrase(
      [
        `${o.nom} a des bases de ${B} ${o.u} et ${b} ${o.u}, et ${o.mot} de ${h} ${o.u}.`,
        `${o.nom} mesure ${B} ${o.u} et ${b} ${o.u} sur ses côtés parallèles, pour ${o.mot} de ${h} ${o.u}.`,
        `${o.nom} a des côtés parallèles de ${B} ${o.u} et ${b} ${o.u}, et ${o.mot} de ${h} ${o.u}.`,
      ],
      [o.quoi],
    );
    return { text, format: "short", expected: mesure(a, `${o.u}²`), comparator: "number_equal", canvas: figTrapeze(B, b, h), explanation: expliquer(DEF_T, "les côtés parallèles sont les bases ; la dernière longueur est la hauteur.", `(${B} + ${b}) × ${h} ÷ 2 = ${fr(a)}.`, `il faut ${fr(a)} ${o.u}².`) };
  }),

  tpl("aire_trapeze", 11, 3, "On remonte : aire × 2 ÷ (somme des bases).", () => {
    const o = un(TRAPEZES);
    const B = entre(o.B[0], o.B[1]);
    const b = entre(Math.ceil(B / 2), B - 1);
    const h = ajuster(entre(o.h[0], o.h[1]), (B + b) % 2 === 1);
    const a = ((B + b) * h) / 2;
    const mot = o.mot.replace("une ", "");
    const text = phrase(
      [
        `${o.nom} couvre ${fr(a)} ${o.u}², avec des bases de ${B} ${o.u} et ${b} ${o.u}.`,
        `${o.nom} a une aire de ${fr(a)} ${o.u}² pour des côtés parallèles de ${B} ${o.u} et ${b} ${o.u}.`,
        `${o.nom} a une surface de ${fr(a)} ${o.u}². Ses bases mesurent ${B} ${o.u} et ${b} ${o.u}.`,
      ],
      [`Quelle est sa ${mot} ?`, `Combien mesure sa ${mot} ?`, `Trouve sa ${mot}.`],
    );
    return { text, format: "short", expected: mesure(h, o.u), comparator: "number_equal", canvas: figTrapeze(B, b, h), explanation: expliquer(DEF_T, "aire × 2, puis on divise par la somme des bases.", `${fr(a)} × 2 ÷ (${B} + ${b}) = ${h}.`, `sa ${mot} est de ${h} ${o.u}.`) };
  }),
];
