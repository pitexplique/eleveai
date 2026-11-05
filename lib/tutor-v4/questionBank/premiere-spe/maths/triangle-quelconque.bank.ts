// TRIANGLE QUELCONQUE : loi des sinus, aire ½ ab sin C, formule de Héron (05/11/2026). Hors programme
// français (registre `hors_france`) ; Al-Kashi reste dans `produit_scalaire`. Lignes visées : Québec
// MES G2b-i et G2b-iii / G3, Maroc TC V-8, Suisse gymnase 3.2b, Côte d'Ivoire 2nde C3-L3.
// Canvas `triangle` : la figure est calculée à l'échelle, la longueur cherchée y porte « ? ».

import type { CanvasFigure, TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { court, entre, expl, fabrique, fr, nL, phrase, qcm, un } from "../../lycee-commun";

const tpl = fabrique("premiere-spe", "triangle_quelconque", "1s_");
const M1 = "trig_loi_sinus";
const M2 = "trig_aire_heron";

const NOMS = [["A", "B", "C"], ["R", "S", "T"], ["M", "N", "P"], ["E", "F", "G"], ["I", "J", "K"], ["D", "E", "F"], ["U", "V", "W"], ["K", "L", "M"]] as const;
const rad = (d: number) => (d * Math.PI) / 180;
const deg = (r: number) => (r * 180) / Math.PI;
const chap = (X: string) => `\\widehat{${X}}`;
const arrondi = (v: number, p: number) => Math.round(v / p) * p;

/**
 * La figure, à l'échelle : le 1er nom en bas à gauche, le 2e en bas à droite, le 3e au-dessus.
 * `cotes` et `angles` se donnent par les noms des sommets (« PQ », « P »).
 */
function figure(n: readonly string[], aDeg: number, bDeg: number, cotes: Record<string, string> = {}, angles: Record<string, string> = {}): CanvasFigure {
  const [P, Q, R] = n;
  // Base de longueur 1 : le troisième sommet est à l'intersection des deux demi-droites.
  const t = Math.sin(rad(bDeg)) / Math.sin(rad(180 - aDeg - bDeg));
  const brut = { x: t * Math.cos(rad(aDeg)), y: t * Math.sin(rad(aDeg)) };
  const xs = [0, 1, brut.x];
  const xmin = Math.min(...xs);
  const k = Math.min(230 / (Math.max(...xs) - xmin), 165 / brut.y);
  const pos = (x: number, y: number) => ({ x: Math.round((45 + (x - xmin) * k) * 100) / 100, y: Math.round((210 - y * k) * 100) / 100 });
  const cote = (a: string, b: string) => cotes[a + b] ?? cotes[b + a];
  const sideLabels = Object.fromEntries(([["AB", cote(P, Q)], ["BC", cote(Q, R)], ["CA", cote(P, R)]] as const).filter(([, v]) => v));
  const angleLabels = Object.fromEntries(([["A", angles[P]], ["B", angles[Q]], ["C", angles[R]]] as const).filter(([, v]) => v));
  return {
    kind: "triangle",
    size: { width: 320, height: 250 },
    points: { A: pos(0, 0), B: pos(1, 0), C: pos(brut.x, brut.y) },
    labels: { A: P, B: Q, C: R },
    sideLabels,
    angleLabels,
    display: { showPoints: true, showLabels: true, showSides: true, showAngles: Object.keys(angleLabels).length > 0, legendesDehors: true },
  } as CanvasFigure;
}
/** Les angles d'un triangle dont on connaît les trois côtés (`a` opposé au 1er sommet…). */
function anglesDeCotes(a: number, b: number, c: number) {
  const A = deg(Math.acos((b * b + c * c - a * a) / (2 * b * c)));
  const B = deg(Math.acos((a * a + c * c - b * b) / (2 * a * c)));
  return [A, B] as const;
}
/** Deux angles différents : aucun n'est trop aigu, le triangle reste lisible. */
function deuxAngles() {
  for (;;) {
    const a = entre(25, 100);
    const b = entre(25, 100);
    if (a !== b && 180 - a - b >= 25) return [a, b, 180 - a - b] as const;
  }
}
const longueur = () => (Math.random() < 0.75 ? entre(4, 24) : entre(9, 99) / 2);
const AU_DIXIEME = ["Arrondis au dixième.", "Donne l'arrondi au dixième.", "Arrondis le résultat au dixième.", "Réponds avec un arrondi au dixième."];
const AU_DEGRE = ["Arrondis au degré.", "Donne l'arrondi au degré.", "Réponds en degrés, arrondi au degré."];
const A_LUNITE = ["Arrondis à l'unité.", "Donne l'arrondi à l'unité.", "Réponds avec un arrondi à l'unité."];
/** Une réponse arrondie : l'écart d'un cran est admis, il vient d'un calcul intermédiaire arrondi. */
/** Retire les tirages où la réponse arrondie retombe par hasard sur un nombre écrit sur la figure. */
function sansCoincidence<T extends { expected: string[]; canvas?: unknown }>(g: () => T): () => T {
  return () => {
    for (;;) {
      const q = g();
      const f = q.canvas as { sideLabels?: Record<string, string>; angleLabels?: Record<string, string> } | undefined;
      const ecrit = [...Object.values(f?.sideLabels ?? {}), ...Object.values(f?.angleLabels ?? {})].map((e) => String(e).replace("°", ""));
      if (!ecrit.includes(String(q.expected[0]))) return q;
    }
  };
}
function rep(text: string, v: number, p: number, explication: string, canvas?: CanvasFigure) {
  const r = arrondi(v, p);
  return court(text, r, explication, canvas, [fr(r - p), fr(r + p)]);
}
const LOI = "Dans tout triangle, le quotient d'un côté par le sinus de l'angle opposé est le même pour les trois côtés.";
const AIRE = "L'aire d'un triangle vaut la moitié du produit de deux côtés par le sinus de l'angle qu'ils forment.";
const HERON = "Avec le demi-périmètre $p$, la formule de Héron donne l'aire : $\\sqrt{p(p-a)(p-b)(p-c)}$.";
const DANS = (t: string) => un([`Dans le triangle $${t}$,`, `Le triangle $${t}$ est tel que`, `Soit $${t}$ un triangle où`, `On considère le triangle $${t}$ :`, `Pour le triangle $${t}$,`]);
const TOUT = (t: string) => un([`Dans un triangle $${t}$ quelconque,`, `Pour tout triangle $${t}$,`, `Quel que soit le triangle $${t}$,`, `Soit $${t}$ un triangle.`, `On regarde un triangle $${t}$.`]);

/* ───────────────── contextes ───────────────── */

const VISEES: ((d: string, a: string, b: string) => string)[] = [
  (d, a, b) => `Deux tours de guet $A$ et $B$, avec $AB = ${d}$ m, repèrent une fumée en $C$. Les angles mesurés valent $\\widehat{A} = ${a}$ et $\\widehat{B} = ${b}$.`,
  (d, a, b) => `Une géomètre veut mesurer une rivière sans la traverser. Sur une rive, elle marque $A$ et $B$ avec $AB = ${d}$ m et vise un arbre $C$ sur l'autre rive : $\\widehat{A} = ${a}$, $\\widehat{B} = ${b}$.`,
  (d, a, b) => `Deux bouées $A$ et $B$ sont séparées de $AB = ${d}$ m. Une équipe de voile vise la troisième bouée $C$ du parcours : $\\widehat{A} = ${a}$, $\\widehat{B} = ${b}$.`,
  (d, a, b) => `Pour localiser le nid $C$ d'un rapace, deux biologistes se placent en $A$ et $B$, à $AB = ${d}$ m l'une de l'autre. Elles mesurent $\\widehat{A} = ${a}$ et $\\widehat{B} = ${b}$.`,
  (d, a, b) => `Sur un chantier archéologique, deux piquets $A$ et $B$ sont plantés avec $AB = ${d}$ m. On vise une colonne $C$ : $\\widehat{A} = ${a}$ et $\\widehat{B} = ${b}$.`,
  (d, a, b) => `Deux antennes $A$ et $B$, avec $AB = ${d}$ m, captent le signal d'une balise $C$. Les angles de réception donnent $\\widehat{A} = ${a}$ et $\\widehat{B} = ${b}$.`,
  (d, a, b) => `Deux stations de secours $A$ et $B$ sur la côte, avec $AB = ${d}$ m, repèrent un voilier $C$ : $\\widehat{A} = ${a}$, $\\widehat{B} = ${b}$.`,
  (d, a, b) => `Pour un film, deux caméras $A$ et $B$ sont posées à $AB = ${d}$ m l'une de l'autre et filment une actrice en $C$ : $\\widehat{A} = ${a}$, $\\widehat{B} = ${b}$.`,
  (d, a, b) => `Deux randonneuses en $A$ et $B$, avec $AB = ${d}$ m, visent le même sommet $C$ et lisent sur leur boussole $\\widehat{A} = ${a}$ et $\\widehat{B} = ${b}$.`,
  (d, a, b) => `Dans un parc naturel, deux capteurs $A$ et $B$, avec $AB = ${d}$ m, détectent un cerf en $C$. On obtient $\\widehat{A} = ${a}$ et $\\widehat{B} = ${b}$.`,
  (d, a, b) => `Sur le stade, deux juges $A$ et $B$, avec $AB = ${d}$ m, visent le point de chute $C$ d'un javelot : $\\widehat{A} = ${a}$, $\\widehat{B} = ${b}$.`,
  (d, a, b) => `Au volcan, deux sismographes $A$ et $B$, avec $AB = ${d}$ m, repèrent une fissure en $C$ : $\\widehat{A} = ${a}$ et $\\widehat{B} = ${b}$.`,
];
const CERCLES: ((c: string, a: string) => string)[] = [
  (c, a) => `Trois antennes $A$, $B$, $C$ sont posées sur un même cercle. On a $BC = ${c}\\text{ m}$ et $\\widehat{A} = ${a}$.`,
  (c, a) => `Un paysagiste plante trois arbres $A$, $B$, $C$ sur le bord d'un bassin circulaire. Il mesure $BC = ${c}\\text{ m}$ et $\\widehat{A} = ${a}$.`,
  (c, a) => `Des archéologues trouvent trois pierres $A$, $B$, $C$ d'une ancienne enceinte ronde, avec $BC = ${c}\\text{ m}$ et $\\widehat{A} = ${a}$.`,
  (c, a) => `Sur une piste circulaire, trois coureuses sont en $A$, $B$, $C$, avec $BC = ${c}\\text{ m}$ et $\\widehat{A} = ${a}$.`,
  (c, a) => `Trois projecteurs $A$, $B$, $C$ sont fixés sur un anneau de scène. On lit $BC = ${c}\\text{ m}$ et $\\widehat{A} = ${a}$.`,
  (c, a) => `Trois ruches $A$, $B$, $C$ sont placées sur un cercle autour d'un verger, avec $BC = ${c}\\text{ m}$ et $\\widehat{A} = ${a}$.`,
];
const PIECES: ((a: string, b: string, al: string) => string)[] = [
  (a, b, al) => `Une voile triangulaire $ABC$ a pour mesures $BC = ${a}\\text{ m}$, $AC = ${b}\\text{ m}$ et $\\widehat{A} = ${al}$.`,
  (a, b, al) => `La charpente d'un abri forme un triangle $ABC$ : $BC = ${a}\\text{ m}$, $AC = ${b}\\text{ m}$, $\\widehat{A} = ${al}$.`,
  (a, b, al) => `Un cerf-volant de compétition contient un triangle $ABC$ avec $BC = ${a}\\text{ dm}$, $AC = ${b}\\text{ dm}$ et $\\widehat{A} = ${al}$.`,
  (a, b, al) => `Sur un plan de parcours, trois balises forment le triangle $ABC$, avec $BC = ${a}\\text{ km}$, $AC = ${b}\\text{ km}$ et $\\widehat{A} = ${al}$.`,
  (a, b, al) => `Une ingénieure dessine une poutre en triangle $ABC$ : $BC = ${a}\\text{ m}$, $AC = ${b}\\text{ m}$, $\\widehat{A} = ${al}$.`,
  (a, b, al) => `Un luthier trace une pièce triangulaire $ABC$ avec $BC = ${a}\\text{ cm}$, $AC = ${b}\\text{ cm}$ et $\\widehat{A} = ${al}$.`,
];
const TERRAINS: ((a: string, b: string, c: string) => string)[] = [
  (a, b, c) => `Un champ triangulaire $ABC$ a pour côtés $AB = ${a}\\text{ m}$, $BC = ${b}\\text{ m}$ et $AC = ${c}\\text{ m}$.`,
  (a, b, c) => `Une voile de bateau a la forme d'un triangle $ABC$ avec $AB = ${a}\\text{ dm}$, $BC = ${b}\\text{ dm}$, $AC = ${c}\\text{ dm}$.`,
  (a, b, c) => `Une couturière découpe un tissu en triangle $ABC$ : $AB = ${a}\\text{ cm}$, $BC = ${b}\\text{ cm}$, $AC = ${c}\\text{ cm}$.`,
  (a, b, c) => `Un parc naturel protège une zone triangulaire $ABC$ avec $AB = ${a}\\text{ hm}$, $BC = ${b}\\text{ hm}$ et $AC = ${c}\\text{ hm}$.`,
  (a, b, c) => `Un toit a un pan en forme de triangle $ABC$, avec $AB = ${a}\\text{ dm}$, $BC = ${b}\\text{ dm}$ et $AC = ${c}\\text{ dm}$.`,
  (a, b, c) => `Une artiste peint une fresque sur un mur triangulaire $ABC$, de côtés $AB = ${a}\\text{ dm}$, $BC = ${b}\\text{ dm}$ et $AC = ${c}\\text{ dm}$.`,
];
const SECTEURS: ((a: string, b: string, g: string) => string)[] = [
  (a, b, g) => `Un jardinier clôt un massif triangulaire $ABC$ avec $CA = ${a}\\text{ m}$, $CB = ${b}\\text{ m}$ et $\\widehat{C} = ${g}$.`,
  (a, b, g) => `Deux caméras de surveillance en $A$ et $B$ sont reliées à un boîtier $C$ par $CA = ${a}\\text{ m}$ et $CB = ${b}\\text{ m}$, avec $\\widehat{C} = ${g}$.`,
  (a, b, g) => `Un filet de pêche est tendu entre trois piquets $A$, $B$, $C$ : $CA = ${a}\\text{ m}$, $CB = ${b}\\text{ m}$, $\\widehat{C} = ${g}$.`,
  (a, b, g) => `Sur un terrain de jeu, on trace le triangle $ABC$ tel que $CA = ${a}\\text{ m}$, $CB = ${b}\\text{ m}$ et $\\widehat{C} = ${g}$.`,
  (a, b, g) => `Un panneau solaire triangulaire $ABC$ a pour mesures $CA = ${a}\\text{ dm}$, $CB = ${b}\\text{ dm}$ et $\\widehat{C} = ${g}$.`,
  (a, b, g) => `Une bâche d'ombre est tendue en triangle $ABC$, avec $CA = ${a}\\text{ m}$, $CB = ${b}\\text{ m}$ et $\\widehat{C} = ${g}$.`,
];

/* Triangles dont l'aire de Héron tombe juste : [a, b, c, aire]. */
const HERONIENS = [[3, 4, 5, 6], [5, 5, 6, 12], [5, 5, 8, 12], [6, 8, 10, 24], [5, 12, 13, 30], [9, 10, 17, 36], [8, 15, 17, 60], [10, 13, 13, 60], [13, 13, 24, 60], [11, 13, 20, 66], [13, 14, 15, 84], [10, 17, 21, 84], [12, 17, 25, 90], [7, 15, 20, 42], [13, 20, 21, 126]] as const;

export const triangleQuelconqueBank: TutorBankItemV4[] = [
  /* ═══════════ Loi des sinus ═══════════ */
  tpl(M1, 1, 1, "Un côté se divise par le sinus de l'angle qui lui fait face.", () => {
    const n = un(NOMS);
    const [P, Q, R] = n;
    const juste = `$\\dfrac{${Q}${R}}{\\sin ${chap(P)}} = \\dfrac{${P}${R}}{\\sin ${chap(Q)}}$`;
    return qcm(
      phrase([TOUT(n.join(""))], ["quelle égalité traduit la loi des sinus ?", "quelle égalité est toujours vraie ?", "quelle égalité relie deux côtés et leurs angles opposés ?", "laquelle de ces égalités est juste ?", "quelle est la bonne écriture de la loi des sinus ?"]),
      juste,
      [`$\\dfrac{${Q}${R}}{\\sin ${chap(Q)}} = \\dfrac{${P}${R}}{\\sin ${chap(P)}}$`, `$\\dfrac{${P}${Q}}{\\sin ${chap(P)}} = \\dfrac{${P}${R}}{\\sin ${chap(Q)}}$`, `$\\dfrac{${Q}${R}}{\\cos ${chap(P)}} = \\dfrac{${P}${R}}{\\cos ${chap(Q)}}$`, `$${Q}${R} \\times \\sin ${chap(P)} = ${P}${R} \\times \\sin ${chap(Q)}$`],
      expl(LOI, `Le côté opposé à $${chap(P)}$ est $${Q}${R}$, celui opposé à $${chap(Q)}$ est $${P}${R}$.`, `On associe chaque côté à l'angle qui lui fait face.`, `L'égalité juste est ${juste}.`),
    );
  }),
  tpl(M1, 2, 1, "Remplace le sinus par sa valeur exacte, puis divise.", () => {
    const [P, Q, R] = un(NOMS);
    const al = un([30, 30, 90, 150]);
    const a = entre(2, 30);
    const m = `\\dfrac{${Q}${R}}{\\sin ${chap(P)}}`;
    const v = Math.round(a / Math.sin(rad(al)));
    return court(
      phrase([`${DANS(`${P}${Q}${R}`)} $${Q}${R} = ${a}$ et $${chap(P)} = ${al}°$.`], [`Calcule $${m}$.`, `Que vaut $${m}$ ?`, `Donne la valeur exacte de $${m}$.`, `Quelle est la valeur de $${m}$ ?`, `Sans calculatrice, calcule $${m}$.`, `Combien vaut $${m}$ ?`]),
      v,
      expl(LOI, `On remplace le côté et le sinus par leurs valeurs.`, `$\\sin ${al}° = ${al === 90 ? "1" : "\\dfrac{1}{2}"}$, donc le quotient vaut $${v}$.`, `Il vaut $${v}$.`),
    );
  }),
  tpl(M1, 3, 1, "Le côté cherché va avec l'angle opposé.", () => {
    const n = un(NOMS);
    const [P, Q, R] = n;
    const [al, be] = deuxAngles();
    const a = entre(4, 24);
    const juste = `$\\dfrac{${P}${R}}{\\sin ${be}°} = \\dfrac{${a}}{\\sin ${al}°}$`;
    return qcm(
      phrase([`${DANS(n.join(""))} $${Q}${R} = ${a}$, $${chap(P)} = ${al}°$ et $${chap(Q)} = ${be}°$.`], [`Quelle égalité permet de trouver $${P}${R}$ ?`, `Quelle égalité écrire pour calculer $${P}${R}$ ?`, `Quelle égalité vérifie $${P}${R}$ ?`, `Pour calculer $${P}${R}$, quelle égalité est juste ?`, `Laquelle de ces égalités donne $${P}${R}$ ?`]),
      juste,
      [`$\\dfrac{${P}${R}}{\\sin ${al}°} = \\dfrac{${a}}{\\sin ${be}°}$`, `$\\dfrac{${P}${R}}{\\cos ${be}°} = \\dfrac{${a}}{\\cos ${al}°}$`, `$${P}${R} \\times \\sin ${be}° = ${a} \\times \\sin ${al}°$`, `$\\dfrac{${P}${R}}{${be}} = \\dfrac{${a}}{${al}}$`],
      expl(LOI, `$${P}${R}$ fait face à $${chap(Q)}$ et $${Q}${R}$ fait face à $${chap(P)}$.`, `On écrit le quotient de chaque côté par le sinus de son angle opposé.`, `L'égalité juste est ${juste}.`),
      figure(n, al, be, { [`${Q}${R}`]: String(a), [`${P}${R}`]: "?" }, { [P]: `${al}°`, [Q]: `${be}°` }),
    );
  }),
  tpl(M1, 4, 1, "Tous les quotients sont égaux : côté = quotient × sinus de l'angle opposé.", () => {
    const [P, Q, R] = un(NOMS);
    const k = entre(2, 40) * 2;
    const s = un([0.5, 0.25, 0.75, 0.4, 0.8, 0.6, 0.2]);
    const v = k * s;
    return court(
      phrase([`${DANS(`${P}${Q}${R}`)} $\\dfrac{${Q}${R}}{\\sin ${chap(P)}} = ${k}$ et $\\sin ${chap(Q)} = ${nL(s)}$.`], [`Calcule $${P}${R}$.`, `Que vaut $${P}${R}$ ?`, `Déduis-en la longueur $${P}${R}$.`, `Quelle est la longueur $${P}${R}$ ?`, `Combien mesure $${P}${R}$ ?`, `Trouve $${P}${R}$.`]),
      v,
      expl(LOI, `Le quotient de $${P}${R}$ par $\\sin ${chap(Q)}$ vaut aussi $${k}$.`, `$${P}${R} = ${k} \\times ${nL(s)} = ${nL(v)}$.`, `$${P}${R} = ${nL(v)}$.`),
    );
  }),
  tpl(M1, 5, 2, "Écris l'égalité, puis isole le côté cherché.", sansCoincidence(() => {
    const n = un(NOMS);
    const [P, Q, R] = n;
    const [al, be] = deuxAngles();
    const a = longueur();
    const v = (a * Math.sin(rad(be))) / Math.sin(rad(al));
    return rep(
      `${DANS(n.join(""))} $${Q}${R} = ${nL(a)}$, $${chap(P)} = ${al}°$ et $${chap(Q)} = ${be}°$. ${un([`Calcule $${P}${R}$.`, `Que vaut $${P}${R}$ ?`, `Trouve la longueur $${P}${R}$.`, `Détermine $${P}${R}$.`, `Quelle est la longueur $${P}${R}$ ?`])} ${un(AU_DIXIEME)}`,
      v,
      0.1,
      expl(LOI, `$\\dfrac{${P}${R}}{\\sin ${be}°} = \\dfrac{${nL(a)}}{\\sin ${al}°}$, donc $${P}${R} = \\dfrac{${nL(a)} \\times \\sin ${be}°}{\\sin ${al}°}$.`, `La calculatrice donne environ $${nL(arrondi(v, 0.1))}$.`, `$${P}${R} \\approx ${nL(arrondi(v, 0.1))}$.`),
      figure(n, al, be, { [`${Q}${R}`]: fr(a), [`${P}${R}`]: "?" }, { [P]: `${al}°`, [Q]: `${be}°` }),
    );
  })),
  tpl(M1, 6, 2, "Le côté donné fait face au troisième angle : calcule-le d'abord.", sansCoincidence(() => {
    const n = un(NOMS);
    const [P, Q, R] = n;
    const [al, be, ga] = deuxAngles();
    const c = longueur();
    const v = (c * Math.sin(rad(al))) / Math.sin(rad(ga));
    return rep(
      `${DANS(n.join(""))} $${P}${Q} = ${nL(c)}$, $${chap(P)} = ${al}°$ et $${chap(Q)} = ${be}°$. ${un([`Calcule $${Q}${R}$.`, `Que vaut $${Q}${R}$ ?`, `Trouve $${Q}${R}$, en passant par le troisième angle.`, `Détermine la longueur $${Q}${R}$.`, `Quelle est la longueur $${Q}${R}$ ?`])} ${un(AU_DIXIEME)}`,
      v,
      0.1,
      expl(LOI, `$${chap(R)} = 180° - ${al}° - ${be}° = ${ga}°$. Puis $\\dfrac{${Q}${R}}{\\sin ${al}°} = \\dfrac{${nL(c)}}{\\sin ${ga}°}$.`, `$${Q}${R} = \\dfrac{${nL(c)} \\times \\sin ${al}°}{\\sin ${ga}°}$.`, `$${Q}${R} \\approx ${nL(arrondi(v, 0.1))}$.`),
    );
  })),
  tpl(M1, 7, 2, "La loi des sinus donne le sinus de l'angle ; ici, cet angle est aigu.", sansCoincidence(() => {
    const n = un(NOMS);
    const [P, Q, R] = n;
    for (;;) {
      const al = entre(30, 110);
      const a = entre(8, 24);
      const b = entre(4, a - 1);
      const be = deg(Math.asin((b * Math.sin(rad(al))) / a));
      if (be < 20 || 180 - al - be < 20) continue;
      return rep(
        `${DANS(n.join(""))} $${Q}${R} = ${a}$, $${P}${R} = ${b}$ et $${chap(P)} = ${al}°$. ${un([`Calcule l'angle $${chap(Q)}$, qui est aigu.`, `L'angle $${chap(Q)}$ est aigu : que vaut-il ?`, `Trouve la mesure de l'angle aigu $${chap(Q)}$.`, `Détermine l'angle aigu $${chap(Q)}$.`, `Quelle est la mesure de l'angle aigu $${chap(Q)}$ ?`])} ${un(AU_DEGRE)}`,
        be,
        1,
        expl(LOI, `$\\sin ${chap(Q)} = \\dfrac{${b} \\times \\sin ${al}°}{${a}}$.`, `On applique la touche arcsin de la calculatrice.`, `$${chap(Q)} \\approx ${Math.round(be)}°$.`),
        figure(n, al, be, { [`${Q}${R}`]: String(a), [`${P}${R}`]: String(b) }, { [P]: `${al}°`, [Q]: "?" }),
      );
    }
  })),
  tpl(M1, 8, 2, "Le quotient commun de la loi des sinus vaut le diamètre du cercle circonscrit.", () => {
    const [P, Q, R] = un(NOMS);
    const al = entre(25, 150);
    const a = longueur();
    const v = a / (2 * Math.sin(rad(al)));
    return rep(
      `${DANS(`${P}${Q}${R}`)} $${Q}${R} = ${nL(a)}$ et $${chap(P)} = ${al}°$. ${un(["Calcule le rayon du cercle circonscrit à ce triangle.", "Quel est le rayon du cercle circonscrit ?", "Trouve le rayon du cercle qui passe par les trois sommets.", "Détermine le rayon du cercle circonscrit au triangle.", "Que vaut le rayon du cercle passant par les trois sommets ?"])} ${un(AU_DIXIEME)}`,
      v,
      0.1,
      expl("Le quotient d'un côté par le sinus de l'angle opposé vaut $2R$, où $R$ est le rayon du cercle circonscrit.", `$2R = \\dfrac{${nL(a)}}{\\sin ${al}°}$.`, `On divise ensuite par 2.`, `$R \\approx ${nL(arrondi(v, 0.1))}$.`),
    );
  }),
  tpl(M1, 9, 3, "Fais un croquis : le côté connu fait face au troisième angle.", sansCoincidence(() => {
    const [al, be, ga] = deuxAngles();
    const d = entre(8, 90) * 10;
    const cible = un(["AC", "BC"]);
    const v = (d * Math.sin(rad(cible === "AC" ? be : al))) / Math.sin(rad(ga));
    return rep(
      `${un(VISEES)(String(d), `${al}°`, `${be}°`)} ${un([`Calcule la distance $${cible}$.`, `Quelle est la distance $${cible}$ ?`, `Détermine la distance $${cible}$.`, `Trouve la longueur $${cible}$.`])} ${un(A_LUNITE)}`,
      v,
      1,
      expl(LOI, `$\\widehat{C} = 180° - ${al}° - ${be}° = ${ga}°$, et $AB$ fait face à $\\widehat{C}$.`, `$${cible} = \\dfrac{${d} \\times \\sin ${cible === "AC" ? be : al}°}{\\sin ${ga}°}$.`, `$${cible} \\approx ${Math.round(v)}$ m.`),
      figure(["A", "B", "C"], al, be, { AB: `${d} m`, [cible]: "?" }, { A: `${al}°`, B: `${be}°` }),
    );
  })),
  tpl(M1, 10, 3, "Compare le côté opposé à la hauteur h = b × sin A et à l'autre côté.", () => {
    const [P, Q, R] = un(NOMS);
    const AUCUN = "Aucun triangle";
    const UN = "Un seul triangle";
    const DEUX = "Deux triangles";
    const INF = "Une infinité de triangles";
    for (;;) {
      const al = entre(20, 70);
      const b = entre(6, 24);
      const h = b * Math.sin(rad(al));
      const a = entre(2, 30);
      if (Math.abs(a - h) < 0.3 || Math.abs(a - b) < 1) continue;
      const nb = a < h ? 0 : a < b ? 2 : 1;
      // Les trois cas à parts à peu près égales : « un seul » sortirait sinon bien plus souvent.
      if (Math.random() < [0.35, 0.8, 0.45][nb]) continue;
      return qcm(
        `${un([`On veut construire un triangle $${P}${Q}${R}$ avec`, `Une élève cherche à tracer un triangle $${P}${Q}${R}$ tel que`, `Un triangle $${P}${Q}${R}$ doit vérifier`, `Sur un plan, on veut dessiner un triangle $${P}${Q}${R}$ où`])} $${Q}${R} = ${a}$, $${P}${R} = ${b}$ et $${chap(P)} = ${al}°$. ${un(["Combien de triangles différents sont possibles ?", "Combien de triangles répondent à ces mesures ?", "Quel est le nombre de solutions ?", "Combien de formes de triangle obtient-on ?"])}`,
        [AUCUN, UN, DEUX][nb],
        [AUCUN, UN, DEUX, INF],
        expl(LOI, `$\\sin ${chap(Q)} = \\dfrac{${b} \\times \\sin ${al}°}{${a}}$ ; si ce sinus est inférieur à 1 et que $${Q}${R} < ${P}${R}$, deux angles conviennent.`, `La hauteur issue de $${R}$ vaut environ $${nL(arrondi(h, 0.1))}$, à comparer à $${a}$ et $${b}$.`, `Réponse : ${[AUCUN, UN, DEUX][nb].toLowerCase()}.`),
      );
    }
  }),
  tpl(M1, 11, 3, "Le rayon vaut le côté divisé par deux fois le sinus de l'angle opposé.", () => {
    const al = entre(25, 150);
    const c = entre(6, 90);
    const v = c / (2 * Math.sin(rad(al)));
    return rep(
      `${un(CERCLES)(String(c), `${al}°`)} ${un(["Quel est le rayon de ce cercle ?", "Calcule le rayon du cercle.", "Trouve le rayon de ce cercle.", "Détermine le rayon du cercle qui passe par ces trois points."])} ${un(A_LUNITE)}`,
      v,
      1,
      expl("Le quotient $\\dfrac{BC}{\\sin \\widehat{A}}$ vaut le diamètre du cercle circonscrit.", `$2R = \\dfrac{${c}}{\\sin ${al}°}$.`, `On divise par 2.`, `Le rayon vaut environ $${Math.round(v)}$ m.`),
    );
  }),
  tpl(M1, 12, 3, "Cherche d'abord le sinus de l'angle voulu ; il est aigu.", sansCoincidence(() => {
    for (;;) {
      const al = entre(30, 110);
      const a = entre(8, 30);
      const b = entre(4, a - 1);
      const be = deg(Math.asin((b * Math.sin(rad(al))) / a));
      if (be < 20 || 180 - al - be < 20) continue;
      return rep(
        `${un(PIECES)(String(a), String(b), `${al}°`)} ${un(["Calcule l'angle aigu $\\widehat{B}$.", "Quelle est la mesure de l'angle aigu $\\widehat{B}$ ?", "Trouve l'angle aigu $\\widehat{B}$.", "L'angle $\\widehat{B}$ est aigu : que vaut-il ?"])} ${un(AU_DEGRE)}`,
        be,
        1,
        expl(LOI, `$\\sin \\widehat{B} = \\dfrac{${b} \\times \\sin ${al}°}{${a}}$.`, `On applique arcsin à ce nombre.`, `$\\widehat{B} \\approx ${Math.round(be)}°$.`),
        figure(["A", "B", "C"], al, be, { BC: String(a), AC: String(b) }, { A: `${al}°`, B: "?" }),
      );
    }
  })),

  /* ═══════════ Aire et Héron ═══════════ */
  tpl(M2, 1, 1, "Aire = ½ × côté × côté × sinus de l'angle entre les deux.", () => {
    const n = un(NOMS);
    const [P, Q, R] = n;
    const ga = un([30, 30, 90, 150]);
    const a = entre(1, 6) * 4;
    const b = entre(3, 20);
    const v = Math.round(0.5 * a * b * Math.sin(rad(ga)));
    return court(
      phrase([`${DANS(n.join(""))} $${P}${Q} = ${a}$, $${P}${R} = ${b}$ et $${chap(P)} = ${ga}°$.`], ["Calcule son aire.", "Quelle est son aire ?", "Donne l'aire de ce triangle.", "Que vaut l'aire du triangle ?", "Sans calculatrice, trouve son aire.", "Combien vaut son aire ?"]),
      v,
      expl(AIRE, `On prend les deux côtés qui forment l'angle $${chap(P)}$.`, `$\\dfrac{1}{2} \\times ${a} \\times ${b} \\times \\sin ${ga}° = ${nL(v)}$.`, `L'aire vaut $${nL(v)}$.`),
    );
  }),
  tpl(M2, 2, 1, "L'angle de la formule est celui que forment les deux côtés.", () => {
    const n = un(NOMS);
    const [P, Q, R] = n;
    const juste = `$\\dfrac{1}{2} \\times ${P}${Q} \\times ${P}${R} \\times \\sin ${chap(P)}$`;
    return qcm(
      phrase([TOUT(n.join(""))], ["quelle expression donne l'aire ?", "comment calcule-t-on l'aire ?", "quelle formule donne l'aire du triangle ?", "à quoi est égale l'aire ?", "quelle écriture de l'aire est juste ?"]),
      juste,
      [`$\\dfrac{1}{2} \\times ${P}${Q} \\times ${P}${R} \\times \\sin ${chap(Q)}$`, `$${P}${Q} \\times ${P}${R} \\times \\sin ${chap(P)}$`, `$\\dfrac{1}{2} \\times ${P}${Q} \\times ${P}${R} \\times \\cos ${chap(P)}$`, `$\\dfrac{1}{2} \\times ${P}${Q} \\times ${Q}${R} \\times \\sin ${chap(R)}$`],
      expl(AIRE, `Les côtés $${P}${Q}$ et $${P}${R}$ forment l'angle $${chap(P)}$.`, `La hauteur issue de $${R}$ vaut $${P}${R} \\times \\sin ${chap(P)}$, et l'aire vaut la moitié de base × hauteur.`, `L'aire vaut ${juste}.`),
    );
  }),
  tpl(M2, 3, 1, "Le demi-périmètre est la moitié de la somme des trois côtés.", () => {
    const [P, Q, R] = un(NOMS);
    const [a, b, c] = un(HERONIENS);
    const v = (a + b + c) / 2;
    return court(
      phrase([`${DANS(`${P}${Q}${R}`)} $${P}${Q} = ${a}$, $${Q}${R} = ${b}$ et $${P}${R} = ${c}$.`], ["Calcule le demi-périmètre $p$.", "Que vaut son demi-périmètre $p$ ?", "Quel est le demi-périmètre $p$ de ce triangle ?", "Donne le nombre $p$ de la formule de Héron.", "Trouve le demi-périmètre $p$."]),
      v,
      expl("Le demi-périmètre $p$ est la moitié du périmètre.", "On additionne les côtés, puis on divise par 2.", `$p = \\dfrac{${a} + ${b} + ${c}}{2} = ${nL(v)}$.`, `$p = ${nL(v)}$.`),
    );
  }),
  tpl(M2, 4, 2, "Aire = ½ × côté × côté × sinus de l'angle entre les deux.", () => {
    const n = un(NOMS);
    const [P, Q, R] = n;
    const ga = entre(25, 150);
    const a = longueur();
    const b = longueur();
    const v = 0.5 * a * b * Math.sin(rad(ga));
    return rep(
      `${DANS(n.join(""))} $${P}${Q} = ${nL(a)}$, $${P}${R} = ${nL(b)}$ et $${chap(P)} = ${ga}°$. ${un(["Calcule son aire.", "Quelle est son aire ?", "Trouve l'aire du triangle.", "Détermine son aire.", "Que vaut son aire ?"])} ${un(AU_DIXIEME)}`,
      v,
      0.1,
      expl(AIRE, `Les côtés donnés forment l'angle donné.`, `$\\dfrac{1}{2} \\times ${nL(a)} \\times ${nL(b)} \\times \\sin ${ga}°$.`, `L'aire vaut environ $${nL(arrondi(v, 0.1))}$.`),
    );
  }),
  tpl(M2, 5, 2, "Calcule p, puis p − a, p − b, p − c.", () => {
    const n = un(NOMS);
    const [P, Q, R] = n;
    const [a, b, c, s] = un(HERONIENS);
    const k = un([1, 1, 2, 3]);
    const [x, y, z] = [a * k, b * k, c * k];
    const p = (x + y + z) / 2;
    const [A, B] = anglesDeCotes(y, z, x);
    return court(
      `${DANS(n.join(""))} $${P}${Q} = ${x}$, $${Q}${R} = ${y}$ et $${P}${R} = ${z}$. ${un(["Calcule son aire avec la formule de Héron.", "Quelle est son aire, d'après la formule de Héron ?", "Par la formule de Héron, que vaut son aire ?", "Détermine son aire : la formule de Héron tombe juste.", "Trouve l'aire de ce triangle, sans chercher de hauteur."])}`,
      s * k * k,
      expl(HERON, `$p = ${nL(p)}$.`, `$\\sqrt{${nL(p)} \\times ${nL(p - x)} \\times ${nL(p - y)} \\times ${nL(p - z)}} = ${s * k * k}$.`, `L'aire vaut $${s * k * k}$.`),
      figure(n, A, B, { [`${P}${Q}`]: String(x), [`${Q}${R}`]: String(y), [`${P}${R}`]: String(z) }),
    );
  }),
  tpl(M2, 6, 2, "Calcule p, puis le produit sous la racine.", () => {
    const n = un(NOMS);
    const [P, Q, R] = n;
    for (;;) {
      const x = entre(4, 20);
      const y = entre(4, 20);
      const z = entre(4, 20);
      if (x + y <= z + 1 || x + z <= y + 1 || y + z <= x + 1) continue;
      const p = (x + y + z) / 2;
      const s = Math.sqrt(p * (p - x) * (p - y) * (p - z));
      return rep(
        `${DANS(n.join(""))} $${P}${Q} = ${x}$, $${Q}${R} = ${y}$ et $${P}${R} = ${z}$. ${un(["Calcule son aire avec la formule de Héron.", "Quelle est son aire ?", "Par la formule de Héron, que vaut son aire ?", "Détermine l'aire de ce triangle.", "Trouve son aire à partir des trois côtés."])} ${un(AU_DIXIEME)}`,
        s,
        0.1,
        expl(HERON, `$p = ${nL(p)}$.`, `$\\sqrt{${nL(p)} \\times ${nL(p - x)} \\times ${nL(p - y)} \\times ${nL(p - z)}}$.`, `L'aire vaut environ $${nL(arrondi(s, 0.1))}$.`),
      );
    }
  }),
  tpl(M2, 7, 2, "Écris l'aire avec la formule, puis isole le côté inconnu.", () => {
    const [P, Q, R] = un(NOMS);
    const ga = un([30, 90, 150]);
    const a = entre(2, 15) * 2;
    const b = entre(3, 20);
    const s = 0.5 * a * b * Math.sin(rad(ga));
    return court(
      phrase([`Un triangle $${P}${Q}${R}$ est tel que l'aire vaut $${nL(s)}$, $${P}${Q} = ${a}$ et $${chap(P)} = ${ga}°$.`, `Dans le triangle $${P}${Q}${R}$, l'aire vaut $${nL(s)}$, $${P}${Q} = ${a}$ et $${chap(P)} = ${ga}°$.`, `Soit $${P}${Q}${R}$ un triangle où l'aire vaut $${nL(s)}$, avec $${P}${Q} = ${a}$ et $${chap(P)} = ${ga}°$.`], [`Calcule $${P}${R}$.`, `Que vaut $${P}${R}$ ?`, `Déduis-en la longueur $${P}${R}$.`, `Trouve $${P}${R}$.`, `Quelle est la longueur $${P}${R}$ ?`]),
      b,
      expl(AIRE, `$${nL(s)} = \\dfrac{1}{2} \\times ${a} \\times ${P}${R} \\times \\sin ${ga}°$.`, `On isole $${P}${R}$.`, `$${P}${R} = ${b}$.`),
    );
  }),
  tpl(M2, 8, 3, "On connaît les trois côtés : c'est le cas de Héron.", () => {
    for (;;) {
      const x = entre(12, 90);
      const y = entre(12, 90);
      const z = entre(12, 90);
      if (x + y <= z + 4 || x + z <= y + 4 || y + z <= x + 4) continue;
      const p = (x + y + z) / 2;
      const s = Math.sqrt(p * (p - x) * (p - y) * (p - z));
      return rep(
        `${un(TERRAINS)(String(x), String(y), String(z))} ${un(["Quelle est son aire ?", "Calcule son aire.", "Détermine son aire à partir des trois côtés.", "Trouve la surface de ce triangle."])} ${un(A_LUNITE)}`,
        s,
        1,
        expl(HERON, `$p = ${nL(p)}$.`, `$\\sqrt{${nL(p)} \\times ${nL(p - x)} \\times ${nL(p - y)} \\times ${nL(p - z)}}$.`, `L'aire vaut environ $${Math.round(s)}$ unités carrées.`),
      );
    }
  }),
  tpl(M2, 9, 3, "Deux côtés et l'angle qu'ils forment : c'est le cas ½ ab sin C.", () => {
    const ga = entre(25, 150);
    const a = entre(6, 60);
    const b = entre(6, 60);
    const v = 0.5 * a * b * Math.sin(rad(ga));
    return rep(
      `${un(SECTEURS)(String(a), String(b), `${ga}°`)} ${un(["Quelle est l'aire de ce triangle ?", "Calcule son aire.", "Détermine la surface de ce triangle.", "Trouve l'aire de la surface couverte."])} ${un(A_LUNITE)}`,
      v,
      1,
      expl(AIRE, `Les deux longueurs données forment l'angle $\\widehat{C}$.`, `$\\dfrac{1}{2} \\times ${a} \\times ${b} \\times \\sin ${ga}°$.`, `L'aire vaut environ $${Math.round(v)}$ unités carrées.`),
    );
  }),
  tpl(M2, 10, 3, "L'aire vaut aussi p × r, où r est le rayon du cercle inscrit.", () => {
    const [P, Q, R] = un(NOMS);
    const [a, b, c, s] = un(HERONIENS);
    const k = un([1, 2, 3]);
    const [x, y, z] = [a * k, b * k, c * k];
    const p = (x + y + z) / 2;
    const v = (s * k * k) / p;
    return rep(
      `${DANS(`${P}${Q}${R}`)} $${P}${Q} = ${x}$, $${Q}${R} = ${y}$ et $${P}${R} = ${z}$. ${un(["Calcule le rayon $r$ du cercle inscrit, sachant que l'aire vaut aussi $p \\times r$.", "Que vaut le rayon $r$ du cercle inscrit, l'aire valant $p \\times r$ ?", "L'aire vaut aussi $p \\times r$ : trouve le rayon $r$ du cercle inscrit.", "Détermine le rayon $r$ du cercle inscrit, avec aire $= p \\times r$."])} ${un(AU_DIXIEME)}`,
      v,
      0.1,
      expl(HERON, `$p = ${nL(p)}$ et l'aire vaut $${s * k * k}$.`, `$r = \\dfrac{${s * k * k}}{${nL(p)}}$.`, `$r \\approx ${nL(arrondi(v, 0.1))}$.`),
    );
  }),
  tpl(M2, 11, 3, "Calcule l'aire par Héron, puis utilise aire = base × hauteur ÷ 2.", () => {
    const n = un(NOMS);
    const [P, Q, R] = n;
    const [a, b, c, s] = un(HERONIENS);
    const k = un([1, 2, 3]);
    const [x, y, z] = [a * k, b * k, c * k];
    const v = (2 * s * k * k) / y;
    return rep(
      `${DANS(n.join(""))} $${P}${Q} = ${x}$, $${Q}${R} = ${y}$ et $${P}${R} = ${z}$. ${un([`Calcule la hauteur issue de $${P}$.`, `Que vaut la hauteur issue de $${P}$ ?`, `Sans tracer, trouve la hauteur issue de $${P}$.`, `Détermine la longueur de la hauteur issue de $${P}$.`])} ${un(AU_DIXIEME)}`,
      v,
      0.1,
      expl(HERON, `L'aire vaut $${s * k * k}$, et la base qui correspond est $${Q}${R}$.`, `$h = \\dfrac{2 \\times ${s * k * k}}{${y}}$.`, `$h \\approx ${nL(arrondi(v, 0.1))}$.`),
    );
  }),
];
