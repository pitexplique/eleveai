// BARYCENTRE DE 2 À 4 POINTS (06/11/2026). Hors programme français (registre `hors_france`) : il en est
// sorti. Lignes visées : Maroc 1re bac GP-1, Sénégal 2nde AG 2 et 1re GE 1, Côte d'Ivoire 1re C3-L1.
// Poids entiers, résultats exacts : aucune calculatrice.

import { figureConstruction, type P } from "@/lib/canvas/construction";
import type { CanvasFigure, TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { court, entre, expl, fabrique, fr, melange, nL, phrase, qcm, un } from "../../lycee-commun";
import { enonce, frL } from "./trigo-pi-commun";

const tpl = fabrique("premiere-spe", "barycentre", "1s_");
const M1 = "barycentre_deux_points";
const M2 = "barycentre_coordonnees";

const COUPLES = ["AB", "EF", "MN", "PQ", "RS", "KL", "UV", "CD"];
const TRIOS = ["ABC", "EFH", "MNP", "RST", "KLJ", "UVW"];
const QUATUORS = ["ABCD", "EFHI", "MNPQ", "RSTU"];
const pd = (X: string, w: number) => `$(${X}\\,;${w})$`;
const V = (a: string, b: string) => `\\overrightarrow{${a}${b}}`;
/** Un terme d'une somme de vecteurs : coefficient, signe, « 1 » omis. */
function terme(i: number, c: number, v: string) {
  const a = Math.abs(c);
  const co = a === 1 ? "" : String(a);
  return i === 0 ? `${c < 0 ? "-" : ""}${co}${v}` : ` ${c < 0 ? "-" : "+"} ${co}${v}`;
}
const sommeV = (l: [number, string][]) => l.filter(([c]) => c !== 0).map(([c, v], i) => terme(i, c, v)).join("") || "\\vec{0}";
/** k · v avec k = p/q, écrit proprement. */
function fois(p: number, q: number, v: string) {
  const s = frL(p, q);
  return s === "1" ? v : s === "-1" ? `-${v}` : `${s}${v}`;
}
const DEF = "le barycentre de $(A\\,;a)$ et $(B\\,;b)$, avec $a + b \\neq 0$, est l'unique point $G$ tel que $a\\overrightarrow{GA} + b\\overrightarrow{GB} = \\vec{0}$.";
const POS = "$\\overrightarrow{AG} = \\dfrac{b}{a + b}\\overrightarrow{AB}$ : le point $G$ est sur la droite $(AB)$, du côté du poids le plus lourd.";
const REDUC = "si $a + b \\neq 0$, pour tout point $M$, $a\\overrightarrow{MA} + b\\overrightarrow{MB} = (a + b)\\overrightarrow{MG}$ ; si $a + b = 0$, cette somme ne dépend pas de $M$.";
const COORD = "les coordonnées de $G$ sont les moyennes des coordonnées des points, pondérées par leurs poids.";
const ASSOC = "on peut remplacer des points par leur barycentre partiel, affecté de la somme de leurs poids, si cette somme n'est pas nulle.";
const DEUX_POS: [number, number][] = [[1, 2], [2, 1], [1, 3], [3, 1], [2, 3], [3, 2], [1, 4], [4, 1], [3, 4], [4, 3], [2, 5], [5, 2], [3, 5], [5, 3], [1, 5], [5, 1]];
const DEUX_REL: [number, number][] = [...DEUX_POS, [3, -1], [-1, 3], [2, -1], [-1, 2], [4, -1], [-1, 4], [3, -2], [-2, 3], [5, -2], [-2, 5], [4, -3], [-3, 4]];

const D_BAR = (a: string, b: string) => un([`Le point $G$ est le barycentre de ${a} et ${b}.`, `On note $G$ le barycentre de ${a} et ${b}.`, `Soit $G$ le barycentre de ${a} et ${b}.`, `$G$ désigne le barycentre de ${a} et ${b}.`, `On considère le barycentre $G$ de ${a} et ${b}.`]);

const BARRES: ((A: string, B: string, L: number, a: number, b: number) => string)[] = [
  (A, B, L, a, b) => `Une barre d'haltère $${A}${B} = ${L}$ cm, de masse négligeable, porte $${a}$ kg en $${A}$ et $${b}$ kg en $${B}$.`,
  (A, B, L, a, b) => `Un balancier de funambule, $${A}${B} = ${L}$ cm, porte $${a}$ kg en $${A}$ et $${b}$ kg en $${B}$.`,
  (A, B, L, a, b) => `Deux seaux pendent aux extrémités d'une palanche : $${A}${B} = ${L}$ cm, avec $${a}$ kg en $${A}$ et $${b}$ kg en $${B}$.`,
  (A, B, L, a, b) => `Une tige de mobile d'artiste, $${A}${B} = ${L}$ cm, supporte $${a}$ kg en $${A}$ et $${b}$ kg en $${B}$.`,
  (A, B, L, a, b) => `Une grue de chantier répartit une charge sur une poutre $${A}${B} = ${L}$ cm : $${a}$ kg en $${A}$ et $${b}$ kg en $${B}$.`,
  (A, B, L, a, b) => `Une balançoire à bascule, $${A}${B} = ${L}$ cm, porte $${a}$ kg en $${A}$ et $${b}$ kg en $${B}$.`,
  (A, B, L, a, b) => `Un randonneur porte deux sacs au bout d'un bâton : $${A}${B} = ${L}$ cm, avec $${a}$ kg en $${A}$ et $${b}$ kg en $${B}$.`,
  (A, B, L, a, b) => `Une perche de pêcheur, $${A}${B} = ${L}$ cm, porte $${a}$ kg en $${A}$ et $${b}$ kg en $${B}$.`,
  (A, B, L, a, b) => `Un joug de bœufs, $${A}${B} = ${L}$ cm, reçoit une charge de $${a}$ kg en $${A}$ et de $${b}$ kg en $${B}$.`,
  (A, B, L, a, b) => `Un banc d'essai de laboratoire, $${A}${B} = ${L}$ cm, porte $${a}$ kg en $${A}$ et $${b}$ kg en $${B}$.`,
  (A, B, L, a, b) => `Un porte-bagages de vélo, $${A}${B} = ${L}$ cm, reçoit $${a}$ kg en $${A}$ et $${b}$ kg en $${B}$.`,
  (A, B, L, a, b) => `Une enseigne de boutique tient sur une tringle $${A}${B} = ${L}$ cm, avec $${a}$ kg en $${A}$ et $${b}$ kg en $${B}$.`,
];

/* ───────────── coordonnées ───────────── */

/** Des points à coordonnées entières dont le barycentre tombe juste. */
function tirage(noms: string, poids: number[]) {
  const S = poids.reduce((a, b) => a + b, 0);
  for (;;) {
    const pts = noms.split("").map(() => [entre(-6, 9), entre(-6, 9)] as const);
    const sx = pts.reduce((s, p, i) => s + poids[i] * p[0], 0);
    const sy = pts.reduce((s, p, i) => s + poids[i] * p[1], 0);
    if (sx % S === 0 && sy % S === 0) return { pts, sx, sy, gx: sx / S, gy: sy / S, S };
  }
}
const dq = (a: number, S: number) => (a === 0 ? "0" : `\\dfrac{${a}}{${S}}`);
const ptL = (n: string, p: readonly [number, number]) => `$${n}(${p[0]}\\,;${p[1]})$`;
const liste = (l: string[]) => (l.length === 2 ? `${l[0]} et ${l[1]}` : `${l.slice(0, -1).join(", ")} et ${l[l.length - 1]}`);
const G_ = (x: number, y: number) => `$G(${nL(x)}\\,;${nL(y)})$`;
const fauxG = (x: number, y: number, sx?: number, sy?: number) => [G_(y, x), G_(x + 1, y), G_(x, y - 1), G_(-x, y), G_(x, -y), G_(x + 2, y + 1), ...(sx !== undefined ? [G_(sx, sy!)] : [])].filter((c) => c !== G_(x, y));
const F_COORD = ["Quelles sont les coordonnées de $G$ ?", "Où se trouve le point $G$ ?", "Laquelle de ces écritures donne le point $G$ ?", "Calcule les coordonnées de $G$.", "Détermine les coordonnées de $G$."];
const MASSES: string[] = [
  "Un drone de cartographie porte ses charges ainsi :",
  "Sur le plan d'une remorque, un chauffeur répartit les colis :",
  "Une sculptrice fixe des poids sur une plaque légère :",
  "Sur le pont d'un voilier, l'équipage range le matériel :",
  "Un technicien de plateau suspend des projecteurs :",
  "Une ingénieure place les batteries d'un robot :",
  "Sur une table d'équilibre, un physicien pose des masses :",
  "Un luthier colle des renforts à l'intérieur d'une caisse :",
  "Une équipe de fusée amateur dispose ses instruments :",
  "Sur le plateau d'une balance de cuisine géante, on pose :",
  "Un architecte étudie la charge d'une terrasse :",
  "Dans une pirogue de course, l'entraîneuse place les rameurs :",
];
const PLAQUES = ["Une tôle découpée", "Une plaque de contreplaqué", "Un logo en acier", "Une pièce de châssis de drone", "Une plaque de cuivre", "Un panneau de signalisation", "Une étagère d'atelier", "Un vitrail en verre plein", "Une aile de maquette", "Une dalle de terrasse", "Une plaque de liège", "Un socle de sculpture"];

function plaque() {
  for (;;) {
    const forme = un(["L", "T"]);
    const a = un([2, 4, 6, 8]);
    const b = un([2, 3, 4, 6]);
    const c = un([2, 4, 6]);
    const d = un([2, 3, 4, 6, 8]);
    const e = forme === "T" ? (a > c ? (a - c) / 2 : -1) : a;
    if (e < 0 || !Number.isInteger(e)) continue;
    const R2 = forme === "L" ? [a, a + c, 0, d] : [e, e + c, b, b + d];
    const [s1, s2] = [a * b, c * d];
    const x = (s1 * (a / 2) + s2 * ((R2[0] + R2[1]) / 2)) / (s1 + s2);
    const y = (s1 * (b / 2) + s2 * ((R2[2] + R2[3]) / 2)) / (s1 + s2);
    if (!Number.isInteger(x * 10 + 1e-9) && Math.abs(x * 10 - Math.round(x * 10)) > 1e-9) continue;
    if (Math.abs(y * 10 - Math.round(y * 10)) > 1e-9) continue;
    if (forme === "L" && d === b) continue;
    return { a, b, R2, s1, s2, x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 };
  }
}
function figurePlaque(a: number, b: number, R2: number[]): CanvasFigure {
  const pts: Record<string, P> = {
    O: { x: 0, y: 0 }, p1: { x: a, y: 0 }, p2: { x: a, y: b }, p3: { x: 0, y: b },
    q0: { x: R2[0], y: R2[2] }, q1: { x: R2[1], y: R2[2] }, q2: { x: R2[1], y: R2[3] }, q3: { x: R2[0], y: R2[3] },
  };
  return figureConstruction(
    pts,
    {
      polygones: [{ sommets: ["O", "p1", "p2", "p3"], fond: "#dbeafe", contour: "#2563eb" }, { sommets: ["q0", "q1", "q2", "q3"], fond: "#fef3c7", contour: "#d97706" }],
      segments: [{ a: "O", b: "p1", texte: String(a) }, { a: "O", b: "p3", texte: String(b) }, { a: "q2", b: "q3", texte: String(R2[1] - R2[0]) }, { a: "q1", b: "q2", texte: String(R2[3] - R2[2]) }],
      largeur: 280,
      hauteurMax: 240,
      description: "Une plaque formée de deux rectangles accolés, à partir de l'origine O.",
    },
    ["p1", "p2", "p3", "q0", "q1", "q2", "q3"],
  ) as CanvasFigure;
}

/* ───────────── droite graduée : où est G ? ───────────── */

function figureDroite(A: string, B: string, s: number, autres: [string, number][], lo: number, hi: number): CanvasFigure {
  const pts: Record<string, P> = { [A]: { x: 0, y: 0 }, [B]: { x: s, y: 0 }, debut: { x: lo, y: 0 }, fin: { x: hi, y: 0 } };
  for (const [n, x] of autres) pts[n] = { x, y: 0 };
  const segments: { a: string; b: string; couleur?: string; epais?: boolean }[] = [{ a: "debut", b: "fin", couleur: "#475569" }, { a: A, b: B, couleur: "#2563eb", epais: true }];
  const caches = ["debut", "fin"];
  for (let t = lo; t <= hi; t++) {
    pts[`h${t}`] = { x: t, y: 0.14 };
    pts[`b${t}`] = { x: t, y: -0.14 };
    caches.push(`h${t}`, `b${t}`);
    segments.push({ a: `h${t}`, b: `b${t}`, couleur: "#475569" });
  }
  return figureConstruction(pts, { segments, largeur: 320, hauteurMax: 110, description: "Une droite graduée régulièrement, avec les points A et B et quatre points nommés." }, caches) as CanvasFigure;
}

export const barycentreBank: TutorBankItemV4[] = [
  /* ═══════════ deux points ═══════════ */
  tpl(M1, 1, 1, "Chaque poids multiplie le vecteur qui part de G vers son point.", () => {
    const [A, B] = un(COUPLES).split("");
    const [a, b] = un(DEUX_POS);
    const eg = (x: string) => `$${x} = \\vec{0}$`;
    const juste = eg(sommeV([[a, V("G", A)], [b, V("G", B)]]));
    return qcm(
      `${D_BAR(pd(A, a), pd(B, b))} ${un(["Quelle égalité le définit ?", "Quelle égalité vectorielle vérifie-t-il ?", "Laquelle de ces égalités est vraie ?", "Quelle égalité traduit cette définition ?"])}`,
      juste,
      [eg(sommeV([[b, V("G", A)], [a, V("G", B)]])), eg(sommeV([[a, V(A, "G")], [b, V("G", B)]])), eg(sommeV([[a, V("G", A)], [-b, V("G", B)]])), eg(sommeV([[a, V("G", B)], [b, V(A, "G")]])), eg(sommeV([[-a, V("G", A)], [b, V("G", B)]]))],
      expl(DEF, "on remplace $a$ et $b$ par les poids, en gardant les vecteurs issus de $G$.", `Ici, $a = ${a}$ et $b = ${b}$.`, `l'égalité est ${juste}.`),
    );
  }),
  tpl(M1, 2, 1, "Le barycentre existe si la somme des poids n'est pas nulle.", () => {
    const [A, B] = un(COUPLES).split("");
    const a = entre(1, 9);
    const c = (x: number, y: number) => `${pd(A, x)} et ${pd(B, y)}`;
    const juste = un([c(a, -a), c(-a, a)]);
    return qcm(
      phrase(["Un barycentre de deux points pondérés n'existe pas toujours.", "On rappelle la condition d'existence d'un barycentre.", "On étudie plusieurs couples de points pondérés.", "La condition d'existence porte sur la somme des poids."], ["Pour quel couple n'y a-t-il pas de barycentre ?", "Lequel de ces couples n'a pas de barycentre ?", "Dans quel cas le barycentre n'existe-t-il pas ?", "Quel couple ne convient pas ?"]),
      juste,
      [c(a, a), c(a, a + 1), c(a + 1, -a), c(-a, a + 2), c(a + 2, a), c(-a, -a)],
      expl(DEF, "on additionne les deux poids de chaque couple.", `Pour ${juste}, la somme est nulle.`, `c'est ${juste}.`),
    );
  }),
  tpl(M1, 3, 1, "AG = b ÷ (a + b) × AB : au numérateur, le poids de l'AUTRE point.", () => {
    const [A, B] = un(COUPLES).split("");
    const [a, b] = un(DEUX_POS);
    const s = a + b;
    const eg = (p: number, q: number) => `$${V(A, "G")} = ${fois(p, q, V(A, B))}$`;
    const juste = eg(b, s);
    return qcm(
      `${D_BAR(pd(A, a), pd(B, b))} ${un(["Où se trouve-t-il sur la droite ?", "Quelle égalité le place par rapport au segment ?", "Quelle égalité vectorielle situe ce point ?", "Quelle écriture permet de le construire ?"])}`,
      juste,
      [eg(a, s), eg(b, a), eg(a, b), eg(s, b), eg(1, s), eg(b, s + 1)],
      expl(POS, "on écrit le poids de l'autre point sur la somme des poids.", `$\\dfrac{${b}}{${a} + ${b}} = ${frL(b, s)}$.`, `on a ${juste}.`),
    );
  }),
  tpl(M1, 4, 2, "G est plus près du point le plus lourd. Avec un poids négatif, il sort du segment.", () => {
    const [A, B] = un(COUPLES).split("");
    const [a, b] = un(DEUX_REL.filter(([x, y]) => x + y > 0 && x + y <= 7 && x !== y));
    const s = a + b;
    const gx = b;
    const lo = Math.min(0, gx) - 2;
    const hi = Math.max(s, gx) + 2;
    const places: number[] = [];
    for (let t = lo; t <= hi; t++) if (t !== 0 && t !== s && t !== gx) places.push(t);
    const noms = melange("CHIJTVWXYZ".split("").filter((x) => x !== A && x !== B && x !== "G"));
    const posi = melange([gx, ...melange(places).slice(0, 3)]);
    const autres = posi.map((x, i) => [noms[i], x] as [string, number]);
    const Gnom = noms[posi.indexOf(gx)];
    return qcm(
      `${un([`On cherche le barycentre de ${pd(A, a)} et ${pd(B, b)}.`, `Sur cette droite graduée, on place le barycentre de ${pd(A, a)} et ${pd(B, b)}.`, `On veut construire le barycentre de ${pd(A, a)} et ${pd(B, b)}.`, `On repère le barycentre de ${pd(A, a)} et ${pd(B, b)}.`])} ${un(["Quel point de la figure est-ce ?", "Quel point convient ?", "Compte les graduations : quel point est-ce ?", "Aide-toi des graduations : quel point convient ?"])}`,
      `Le point $${Gnom}$`,
      noms.slice(0, 4).map((n) => `Le point $${n}$`),
      expl(POS, "on calcule $\\dfrac{b}{a + b}$, puis on compte les graduations depuis le premier point.", `$${A}${B}$ mesure ${s} graduation${s > 1 ? "s" : ""} ; $\\dfrac{${b}}{${s}} \\times ${s} = ${b}$.`, `le barycentre est le point $${Gnom}$.`),
      figureDroite(A, B, s, autres, lo, hi),
    );
  }),
  tpl(M1, 5, 2, "Calcule AG = |b ÷ (a + b)| × AB, puis déduis ce qu'on demande.", () => {
    const [A, B] = un(COUPLES).split("");
    const [a, b] = un(DEUX_REL.filter(([x, y]) => x + y !== 0));
    const s = Math.abs(a + b);
    const L = s * entre(2, 8);
    const u = un(["cm", "m", "mm", "dm"]);
    const X = un([A, B]);
    const d = X === A ? Math.abs(b / (a + b)) * L : Math.abs(a / (a + b)) * L;
    return court(
      `${D_BAR(pd(A, a), pd(B, b))} ${un([`On a $${A}${B} = ${L}$ ${u}.`, `Le segment vérifie $${A}${B} = ${L}$ ${u}.`, `La longueur $${A}${B} = ${L}$ ${u} est connue.`])} ${un(["Quelle est la longueur", "Que vaut la longueur", "Combien mesure", "Quelle valeur prend la longueur"])} $${X}G$, en ${u} ?`,
      fr(d),
      expl(POS, "on calcule la fraction de $AB$, en valeur absolue si un poids est négatif.", `On obtient $${X}G = ${nL(d)}$.`, `$${X}G = ${nL(d)}$ ${u}.`),
    );
  }),
  tpl(M1, 6, 2, "Si AG = (p ÷ q) AB, alors G est barycentre de (A ; q − p) et (B ; p), à un facteur près.", () => {
    const [A, B] = un(COUPLES).split("");
    const [p, q] = un<[number, number]>([[1, 3], [2, 3], [1, 4], [3, 4], [2, 5], [3, 5], [1, 5], [4, 5], [3, 2], [5, 3], [4, 3], [5, 2], [1, 6], [5, 6], [2, 7], [5, 7]]);
    const c = (x: number, y: number) => `${pd(A, x)} et ${pd(B, y)}`;
    const juste = c(q - p, p);
    return qcm(
      enonce(un(["On sait que le point $G$ vérifie :", "Un point $G$ est placé par :", "Sur la droite, le point $G$ est tel que :", "On a construit le point $G$ tel que :", "Une construction donne le point $G$ :"]), `${V(A, "G")} = ${fois(p, q, V(A, B))}`, un(["De quels points pondérés est-il le barycentre ?", "Quelle pondération convient ?", "Pour quels poids est-il le barycentre ?", "Quels poids font de $G$ un barycentre ?"])),
      juste,
      [c(p, q - p), c(p, q), c(q, p), c(q - p, q), c(q + p, p), c(p, q + p)],
      expl(POS, "on identifie $\\dfrac{b}{a + b}$ à la fraction donnée : on peut prendre $b = p$ et $a + b = q$.", `Ici, $b = ${p}$ et $a = ${q} - ${p} = ${q - p}$.`, `$G$ est le barycentre de ${juste}.`),
    );
  }),
  tpl(M1, 7, 3, "Le point d'équilibre est le barycentre des deux masses : il est plus près de la plus lourde.", () => {
    const [A, B] = un(COUPLES).split("");
    const [a, b] = un(DEUX_POS);
    const L = (a + b) * entre(2, 12);
    const d = (b * L) / (a + b);
    return court(
      `${un(BARRES)(A, B, L, a, b)} ${un(["Le point d'équilibre est le barycentre de ces deux masses.", "Le centre de gravité de l'ensemble est le barycentre des deux masses.", "Le point où tout tient en équilibre est le barycentre des deux masses."])} ${un([`À quelle distance de $${A}$ se trouve-t-il, en cm ?`, `Combien de centimètres le séparent de $${A}$ ?`, `Quelle est sa distance à $${A}$, en cm ?`])}`,
      fr(d),
      expl(POS, "on prend les masses pour poids, puis on calcule la fraction de la longueur.", `$\\dfrac{${b}}{${a + b}} \\times ${L} = ${d}$.`, `il est à $${d}$ cm de $${A}$.`),
    );
  }),
  tpl(M1, 8, 3, "Si a + b ≠ 0, la somme vaut (a + b) MG. Si a + b = 0, elle ne dépend pas de M : passe par Chasles.", () => {
    const [A, B] = un(COUPLES.filter((c) => !c.includes("M"))).split("");
    const nul = Math.random() < 0.3;
    const M = "M";
    if (nul) {
      const a = entre(2, 9);
      const juste = `$${a}${V(B, A)}$`;
      return qcm(
        enonce(un(["Pour tout point $M$, on simplifie :", "On réduit, pour tout point $M$ :", "Pour tout $M$ du plan, on regarde :", "En mécanique, on additionne, pour tout point $M$ :"]), sommeV([[a, V(M, A)], [-a, V(M, B)]]), un(["Que vaut cette somme ?", "À quoi est-elle égale ?", "Quelle écriture réduite obtient-on ?", "Quelle est sa forme réduite ?"])),
        juste,
        [`$${a}${V(A, B)}$`, "$\\vec{0}$", `$${2 * a}${V(M, A)}$`, `$${a}${V(M, A)}$`, `$${2 * a}${V(B, A)}$`],
        expl(REDUC, "on écrit la somme en facteur, puis on applique la relation de Chasles.", `$${V(M, A)} - ${V(M, B)} = ${V(B, A)}$.`, `elle vaut ${juste}.`),
      );
    }
    const [a, b] = un(DEUX_REL.filter(([x, y]) => x + y !== 1));
    const s = a + b;
    const c = (k: number, v: string) => `$${k === 1 ? "" : k === -1 ? "-" : k}${v}$`;
    const juste = c(s, V(M, "G"));
    return qcm(
      `${D_BAR(pd(A, a), pd(B, b))} ${un(["Pour tout point $M$, on réduit :", "Pour tout point $M$ du plan, on considère :", "On simplifie, pour tout point $M$ :", "Pour tout point $M$, on regarde :"])}\n\n$${sommeV([[a, V(M, A)], [b, V(M, B)]])}$\n\n${un(["À quoi cette somme est-elle égale ?", "Quelle écriture réduite obtient-on ?", "Que vaut cette somme ?", "Quelle est sa forme réduite ?"])}`,
      juste,
      [c(s, V("G", M)), c(a, V(M, "G")), c(b, V(M, "G")), c(s + 1, V(M, "G")), c(-s, V(M, "G")), c(s, V(M, A))].filter((x) => x !== juste),
      expl(REDUC, "on décompose chaque vecteur en passant par $G$ ; la définition du barycentre fait disparaître le reste.", `La somme des poids vaut $${s}$.`, `elle vaut ${juste}.`),
    );
  }),
  tpl(M1, 9, 3, "AG = b ÷ (m + b) × AB : écris l'égalité avec la fraction donnée, puis isole m.", () => {
    const [A, B] = un(COUPLES).split("");
    const [p, q] = un<[number, number]>([[1, 3], [2, 3], [1, 4], [3, 4], [2, 5], [3, 5], [1, 5], [4, 5], [3, 2], [5, 3], [1, 2]]);
    const c = entre(1, 5);
    const b = p * c;
    const m = (q - p) * c;
    return court(
      `${un([`On cherche le poids $m$ à placer en $${A}$ :`, `Une ingénieure équilibre une pièce entre $${A}$ et $${B}$ :`, `Un menuisier cherche la masse à poser en $${A}$ :`, `Pour régler un mobile, on cherche le poids en $${A}$ :`, `Un entraîneur place des poids sur une barre $${A}${B}$ :`, `Sur la tige d'une balance romaine, on cherche le poids en $${A}$ :`])} ${un([`$G$ est le barycentre de $(${A}\\,;m)$ et ${pd(B, b)}, et on veut :`, `le point $G$, barycentre de $(${A}\\,;m)$ et ${pd(B, b)}, doit vérifier :`, `avec $G$ barycentre de $(${A}\\,;m)$ et ${pd(B, b)}, on impose :`])}\n\n$${V(A, "G")} = ${fois(p, q, V(A, B))}$\n\n${un(["Quelle est la valeur de $m$ ?", "Que vaut $m$ ?", "Calcule $m$.", "Détermine la valeur de $m$."])}`,
      fr(m),
      expl(POS, "on écrit $\\dfrac{b}{m + b}$ égal à la fraction donnée, puis on résout.", `$\\dfrac{${b}}{m + ${b}} = ${frL(p, q)}$ donne $m + ${b} = ${b + m}$.`, `$m = ${m}$.`),
    );
  }),

  /* ═══════════ coordonnées ═══════════ */
  tpl(M2, 1, 1, "x_G = (a x_A + b x_B) ÷ (a + b), et de même pour y.", () => {
    const n = un(COUPLES);
    const [a, b] = un(DEUX_POS);
    const t = tirage(n, [a, b]);
    const [A, B] = n.split("");
    return qcm(
      `${un(["On donne les points", "Dans un repère, on place", "Dans le plan muni d'un repère, on a", "Un repère porte les points"])} ${liste([ptL(A, t.pts[0]), ptL(B, t.pts[1])])}. ${D_BAR(pd(A, a), pd(B, b))} ${un(F_COORD)}`,
      G_(t.gx, t.gy),
      fauxG(t.gx, t.gy, t.sx, t.sy),
      expl(COORD, "on multiplie chaque coordonnée par son poids, on additionne, puis on divise par la somme des poids.", `$x_G = ${dq(t.sx, t.S)}$ et $y_G = ${dq(t.sy, t.S)}$.`, `on trouve ${G_(t.gx, t.gy)}.`),
    );
  }),
  tpl(M2, 2, 1, "L'isobarycentre : tous les poids sont égaux, on fait la moyenne des coordonnées.", () => {
    const n = un(TRIOS);
    const t = tirage(n, [1, 1, 1]);
    const [A, B, C] = n.split("");
    const qui = un([`l'isobarycentre $G$ de $${A}$, $${B}$ et $${C}$`, `le centre de gravité $G$ du triangle $${n}$`, `le point $G$, barycentre de $${A}$, $${B}$, $${C}$ affectés de poids égaux`, `le point $G$, isobarycentre du triangle $${n}$`]);
    return qcm(
      `${un(["On donne les points", "Dans un repère, on place", "Dans le plan muni d'un repère, on a", "Un repère porte les points"])} ${liste([ptL(A, t.pts[0]), ptL(B, t.pts[1]), ptL(C, t.pts[2])])}. ${un([`On s'intéresse ${qui.startsWith("le ") ? `au ${qui.slice(3)}` : `à ${qui}`}.`, `On cherche ${qui}.`, `On étudie ${qui}.`])} ${un(F_COORD)}`,
      G_(t.gx, t.gy),
      fauxG(t.gx, t.gy, t.sx, t.sy),
      expl(COORD, "les poids sont égaux : on calcule la moyenne des abscisses, puis celle des ordonnées.", `$x_G = ${dq(t.sx, 3)}$ et $y_G = ${dq(t.sy, 3)}$.`, `on trouve ${G_(t.gx, t.gy)}.`),
    );
  }),
  tpl(M2, 3, 1, "Au numérateur, chaque coordonnée avec son poids ; au dénominateur, la somme des poids.", () => {
    const [A, B, C] = un(TRIOS).split("");
    const [a, b, c] = melange([1, 2, 3, 4, 5]).slice(0, 3);
    const S = a + b + c;
    const v = un(["x", "y"]);
    const nom = v === "x" ? "abscisse" : "ordonnée";
    const t = (k: number, X: string, i: number) => `${i ? " + " : ""}${k === 1 ? "" : k}${v}_${X}`;
    const f = (p: number, q: number, r: number, d: number) => `$\\footnotesize ${v}_G = \\dfrac{${t(p, A, 0)}${t(q, B, 1)}${t(r, C, 2)}}{${d}}$`;
    const juste = f(a, b, c, S);
    return qcm(
      `${un(["On note $G$ le barycentre de", "Le point $G$ est le barycentre de", "Soit $G$ le barycentre de", "$G$ désigne le barycentre de"])} ${liste([pd(A, a), pd(B, b), pd(C, c)])}. ${un([`Quelle formule donne son ${nom} ?`, `Laquelle de ces écritures donne son ${nom} ?`, `Comment calcule-t-on son ${nom} ?`, `Quelle est la bonne formule pour son ${nom} ?`])}`,
      juste,
      [f(a, b, c, 3), f(b, a, c, S), f(c, b, a, S), f(a, c, b, S), f(a, b, c, S + 1), f(1, 1, 1, 3), f(1, 1, 1, S)],
      expl(COORD, "chaque coordonnée est multipliée par le poids de son point, et on divise par la somme des poids.", `La somme des poids vaut $${S}$.`, `la formule est ${juste}.`),
    );
  }),
  tpl(M2, 4, 2, "Fais le calcul coordonnée par coordonnée ; un poids négatif se garde avec son signe.", () => {
    const n = un(TRIOS);
    const [A, B, C] = n.split("");
    let p: number[];
    do p = [un([1, 2, 3, 4, 5, -1, -2]), un([1, 2, 3, 4, 5, -1]), un([1, 2, 3, 4])];
    while (p[0] + p[1] + p[2] <= 0);
    const t = tirage(n, p);
    return qcm(
      `${un(["On donne les points", "Dans un repère, on place", "Dans le plan muni d'un repère, on a", "Un repère porte les points"])} ${liste([ptL(A, t.pts[0]), ptL(B, t.pts[1]), ptL(C, t.pts[2])])}. ${un(["Le point $G$ est le barycentre de", "On note $G$ le barycentre de", "Soit $G$ le barycentre de", "$G$ désigne le barycentre de"])} ${liste([pd(A, p[0]), pd(B, p[1]), pd(C, p[2])])}. ${un(F_COORD)}`,
      G_(t.gx, t.gy),
      fauxG(t.gx, t.gy, t.sx, t.sy),
      expl(COORD, "on multiplie chaque coordonnée par son poids, on additionne, puis on divise par la somme des poids.", `La somme des poids vaut $${t.S}$ ; $x_G = ${dq(t.sx, t.S)}$ et $y_G = ${dq(t.sy, t.S)}$.`, `on trouve ${G_(t.gx, t.gy)}.`),
    );
  }),
  tpl(M2, 5, 2, "Quatre points : même méthode, quatre produits au numérateur.", () => {
    const n = un(QUATUORS);
    const noms = n.split("");
    const p = noms.map(() => entre(1, 4));
    const t = tirage(n, p);
    const quoi = un(["abscisse", "ordonnée"]);
    const v = quoi === "abscisse" ? t.gx : t.gy;
    return court(
      `${un(["Quatre points sont donnés :", "On place quatre points dans un repère :", "Dans un repère, on a :", "Le plan contient ces quatre points :"])} ${liste(noms.map((x, i) => ptL(x, t.pts[i])))}. ${un(["Le point $G$ est le barycentre de", "On note $G$ le barycentre de", "Soit $G$ le barycentre de"])} ${liste(noms.map((x, i) => pd(x, p[i])))}. ${un([`Quelle est l'${quoi} de $G$ ?`, `Calcule l'${quoi} de $G$.`, `Donne l'${quoi} de $G$.`])}`,
      fr(v),
      expl(COORD, "on additionne les quatre produits, puis on divise par la somme des poids.", `La somme des poids vaut $${t.S}$.`, `l'${quoi} de $G$ vaut $${nL(v)}$.`),
    );
  }),
  tpl(M2, 6, 2, "Associativité : H remplace A et B, avec pour poids la somme de leurs poids.", () => {
    const [A, B, C] = un(TRIOS.filter((c) => !c.includes("H"))).split("");
    const a = entre(1, 5);
    const b = entre(1, 5);
    const c = entre(1, 6);
    const s = a + b;
    const f = (x: number, y: number) => `${pd("H", x)} et ${pd(C, y)}`;
    const juste = f(s, c);
    return qcm(
      `${un(["Le point $G$ est le barycentre de", "On note $G$ le barycentre de", "Soit $G$ le barycentre de"])} ${liste([pd(A, a), pd(B, b), pd(C, c)])}. ${un(["Le point $H$ est le barycentre de", "On note $H$ le barycentre de", "De plus, $H$ est le barycentre de"])} ${pd(A, a)} et ${pd(B, b)}. ${un(["De quels points pondérés $G$ est-il aussi le barycentre ?", "Par quels points pondérés peut-on remplacer les trois points ?", "Quel couple a aussi $G$ pour barycentre ?", "Que donne l'associativité pour $G$ ?"])}`,
      juste,
      [f(a, c), f(b, c), f(c, s), f(s, a), f(s, b), f(1, c), f(s + 1, c), f(s, c + 1)].filter((x) => x !== juste && !proportionnel(x, s, c)),
      expl(ASSOC, "on remplace $A$ et $B$ par $H$, affecté de la somme de leurs poids.", `$${a} + ${b} = ${s}$.`, `$G$ est le barycentre de ${juste}.`),
    );
  }),
  tpl(M2, 7, 3, "Si la somme des poids n'est pas nulle, tout se réduit à S × MG ; sinon, passe par Chasles en B.", () => {
    const [A, B, C] = un(TRIOS.filter((c) => !c.includes("M"))).split("");
    const M = "M";
    const nul = Math.random() < 0.35;
    if (nul) {
      const a = un([1, 2, 3, 4]);
      const c = un([1, 2, 3, 5]);
      const b = -(a + c);
      const S = (x: number, X: string, y: number, Y: string) => `$${sommeV([[x, X], [y, Y]])}$`;
      const juste = S(a, V(B, A), c, V(B, C));
      return qcm(
        enonce(un(["Pour tout point $M$ du plan, on réduit :", "On simplifie, pour tout point $M$ :", "Une résultante de forces s'écrit, pour tout point $M$ :", "Pour tout point $M$, on regarde :"]), sommeV([[a, V(M, A)], [b, V(M, B)], [c, V(M, C)]]), un(["À quoi cette somme est-elle égale ?", "Quelle écriture sans $M$ obtient-on ?", "Que vaut cette somme ?", "Quelle est sa forme réduite ?"])),
        juste,
        [S(a, V(A, B), c, V(C, B)), S(a, V(B, A), -c, V(B, C)), S(c, V(B, A), a, V(B, C)), "$\\vec{0}$", S(-a, V(B, A), c, V(B, C))].filter((x) => x !== juste),
        expl("si la somme des poids est nulle, la somme vectorielle ne dépend pas de $M$.", `on écrit chaque vecteur en passant par $${B}$ : $${V(M, A)} = ${V(M, B)} + ${V(B, A)}$, et de même pour $${C}$.`, `Les termes en $${V(M, B)}$ s'annulent.`, `elle vaut ${juste}.`),
      );
    }
    let p: number[];
    do p = [un([1, 2, 3, 4, -1]), un([1, 2, 3, 5, -2]), un([1, 2, 3, 4])];
    while (p[0] + p[1] + p[2] <= 1);
    const s = p[0] + p[1] + p[2];
    const c = (k: number, v: string) => `$${k === 1 ? "" : k === -1 ? "-" : k}${v}$`;
    const juste = c(s, V(M, "G"));
    return qcm(
      `${un(["Le point $G$ est le barycentre de", "On note $G$ le barycentre de", "Soit $G$ le barycentre de"])} ${liste([pd(A, p[0]), pd(B, p[1]), pd(C, p[2])])}. ${un(["Pour tout point $M$, on réduit :", "On simplifie, pour tout point $M$ :", "Pour tout point $M$ du plan, on considère :"])}\n\n$${sommeV([[p[0], V(M, A)], [p[1], V(M, B)], [p[2], V(M, C)]])}$\n\n${un(["À quoi cette somme est-elle égale ?", "Quelle écriture réduite obtient-on ?", "Que vaut cette somme ?"])}`,
      juste,
      [c(s, V("G", M)), c(s + 1, V(M, "G")), c(-s, V(M, "G")), c(s + 2, V(M, "G")), c(s, V(M, A)), c(3, V(M, "G"))].filter((x) => x !== juste),
      expl("pour tout point $M$, $a\\overrightarrow{MA} + b\\overrightarrow{MB} + c\\overrightarrow{MC} = (a + b + c)\\overrightarrow{MG}$.", "on décompose chaque vecteur en passant par $G$ ; la définition du barycentre fait disparaître le reste.", `La somme des poids vaut $${s}$.`, `elle vaut ${juste}.`),
    );
  }),
  tpl(M2, 8, 3, "Chaque rectangle compte pour son aire, placée en son centre : le centre d'inertie est leur barycentre.", () => {
    const P_ = plaque();
    const rect = (x0: number, x1: number, y0: number, y1: number) => `${x0} \\leqslant x \\leqslant ${x1} \\text{ et } ${y0} \\leqslant y \\leqslant ${y1}`;
    return qcm(
      `${un(PLAQUES)} homogène ${un(["se compose de deux rectangles :", "a la forme de deux rectangles accolés :", "réunit deux rectangles :"])}\n\n$${rect(0, P_.a, 0, P_.b)}$\n\n$${rect(P_.R2[0], P_.R2[1], P_.R2[2], P_.R2[3])}$\n\n${un(["Quelles sont les coordonnées de son centre d'inertie $G$ ?", "Où se trouve son centre d'inertie $G$ ?", "Laquelle de ces écritures donne son centre d'inertie $G$ ?", "Calcule les coordonnées de son centre d'inertie $G$."])}`,
      G_(P_.x, P_.y),
      [G_(P_.y, P_.x), G_((P_.a / 2 + (P_.R2[0] + P_.R2[1]) / 2) / 2, (P_.b / 2 + (P_.R2[2] + P_.R2[3]) / 2) / 2), G_(P_.x + 1, P_.y), G_(P_.x, P_.y + 1), G_(P_.x + 0.5, P_.y - 0.5)].filter((c) => c !== G_(P_.x, P_.y)),
      expl("le centre d'inertie d'une plaque homogène est le barycentre des centres de ses morceaux, affectés de leurs aires.", "on calcule l'aire et le centre de chaque rectangle, puis les moyennes pondérées.", `Les aires valent $${P_.s1}$ et $${P_.s2}$.`, `le centre d'inertie est ${G_(P_.x, P_.y)}.`),
      figurePlaque(P_.a, P_.b, P_.R2),
    );
  }),
  tpl(M2, 9, 3, "Le centre de gravité est le barycentre des points, avec les masses pour poids.", () => {
    const n = un([...TRIOS, ...QUATUORS]);
    const noms = n.split("");
    const p = noms.map(() => entre(1, 6));
    const t = tirage(n, p);
    const quoi = un(["abscisse", "ordonnée"]);
    const v = quoi === "abscisse" ? t.gx : t.gy;
    return court(
      `${un(MASSES)} ${noms.map((x, i) => `$${p[i]}$ kg en ${ptL(x, t.pts[i])}`).join(", ")}. ${un([`Quelle est l'${quoi} du centre de gravité de l'ensemble ?`, `Calcule l'${quoi} du centre de gravité de ces masses.`, `Où est le centre de gravité ? Donne son ${quoi}.`])}`,
      fr(v),
      expl("le centre de gravité d'un système de masses ponctuelles est leur barycentre.", "on additionne les produits masse par coordonnée, puis on divise par la masse totale.", `La masse totale vaut $${t.S}$ kg.`, `son ${quoi} vaut $${nL(v)}$.`),
    );
  }),
];

/** Écarte un piège qui resterait vrai : (H ; x), (C ; y) avec x/y = s/c. */
function proportionnel(c: string, s: number, k: number) {
  const m = [...c.matchAll(/;(-?\d+)\)/g)].map((x) => Number(x[1]));
  return m.length === 2 && m[0] * k === m[1] * s;
}
