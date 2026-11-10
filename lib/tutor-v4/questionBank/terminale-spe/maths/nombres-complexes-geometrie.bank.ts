// NOMBRES COMPLEXES (06/11/2026), partie GÉOMÉTRIE : affixes, distances, alignement, nature
// d'une figure, lieux, cocyclicité ; écriture complexe des transformations ; similitudes directes.
// Lignes visées : Maroc 2e bac C-1, C-4 ; Sénégal Tle AG 1, AG 3 ; Côte d'Ivoire Tle C1-L1, C3-L1 ;
// Suisse 11H MSN 31-i pour la similitude (Niv 3s), par sa définition géométrique seulement.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { court, entre, expl, phrase, qcm, un } from "../../lycee-commun";
import {
  angT, coefZ, courtZ, fauxAngles, fauxRacines, nz, plan, pose, princ, rem, signe, suite, tpl,
  zAdd, zConj, zEq, zK, zMul, zN2, zP, zPow, zSub, zT, zTire, type A, type Z,
} from "./nombres-complexes-commun";
import { melangeEnPlace } from "@/lib/tutor-v4/questionBank/melange";

const M7 = "cx_geometrie";
const M8 = "cx_transformations";
const M9 = "similitude_directe";

const ex7 = (calcul: string, conclusion: string) =>
  expl(
    "le point $M(a\\,;b)$ a pour affixe $a + bi$. Le vecteur $\\overrightarrow{AB}$ a pour affixe $z_{B} - z_{A}$, et $AB = \\left|z_{B} - z_{A}\\right|$.",
    "on traduit la question par une différence d'affixes, puis on calcule un module ou un quotient.",
    calcul,
    conclusion,
  );
const ex8 = (calcul: string, conclusion: string) =>
  expl(
    "translation : $z' = z + b$. Homothétie de centre $\\Omega$ et de rapport $k$ : $z' - \\omega = k(z - \\omega)$. Rotation de centre $\\Omega$ et d'angle $\\theta$ : $z' - \\omega = \\mathrm{e}^{i\\theta}(z - \\omega)$.",
    "on identifie la transformation, on écrit sa formule, puis on remplace.",
    calcul,
    conclusion,
  );
const ex9 = (calcul: string, conclusion: string) =>
  expl(
    "une similitude directe s'écrit $z' = az + b$, avec $a$ non nul. Son rapport est $\\left|a\\right|$ et son angle est un argument de $a$. Si $a \\neq 1$, son centre a pour affixe $\\omega = \\dfrac{b}{1 - a}$.",
    "on lit $a$ et $b$ sur l'écriture, puis on calcule le module, l'argument ou le point fixe.",
    calcul,
    conclusion,
  );

/* ───────────────── tirages et écritures ───────────────── */

const LETTRES: [string, string, string][] = [["A", "B", "C"], ["M", "N", "P"], ["E", "F", "J"], ["R", "S", "T"], ["U", "V", "W"], ["K", "L", "H"]];
const noms = () => un(LETTRES);
const TRIPLETS: [number, number][] = [[3, 4], [4, 3], [6, 8], [8, 6], [5, 12], [12, 5]];
const dep = (m = 7): Z => [entre(-m, m), entre(-m, m)];
// « z_A = -4 - / 4i » : l'affixe ne se coupe pas.
const entier = (f: string) => f.replace(/ ([+-]) /g, " $1 \\nobreak ");
const zA = (L: string, z: Z) => `z_{${L}} = ${entier(zT(z))}`;
const pt = (z: Z, label: string) => ({ x: z[0], y: z[1], label });

/** « du milieu $I$ de [AB] » : la question sur une affixe, en dix tournures. */
const demande = (objet: string) =>
  un([
    `Quelle est l'affixe ${objet} ?`,
    `Calcule l'affixe ${objet}.`,
    `Donne l'affixe ${objet}, sous la forme $a + bi$.`,
    `Écris l'affixe ${objet} sous forme algébrique.`,
    `Trouve l'affixe ${objet}.`,
    `Que vaut l'affixe ${objet} ?`,
    `Détermine l'affixe ${objet}.`,
    `Sans figure, calcule l'affixe ${objet}.`,
    `Quel nombre complexe est l'affixe ${objet} ?`,
    `Quelle affixe obtient-on ${objet.replace(/^du /, "pour le ")} ?`,
  ]);
const F_IMAGE = [
  "Quelle est l'affixe de l'image de ce point ?",
  "Calcule l'affixe de l'image de ce point.",
  "Où arrive ce point ? Donne l'affixe de son image.",
  "Écris l'affixe de l'image sous la forme $a + bi$.",
  "Trouve l'affixe de l'image de ce point.",
  "Que vaut $z'$ pour ce point ?",
  "Donne l'affixe $z'$ de l'image.",
  "Calcule $z'$.",
  "Détermine l'image de ce point, sous forme algébrique.",
  "Quelle affixe obtient-on pour le point image ?",
  "Applique cette transformation à ce point.",
  "Remplace $z$ et donne $z'$.",
];
const F_NATURE_T = [
  "Quelle transformation cette écriture représente-t-elle ?",
  "Reconnais la transformation donnée par cette écriture.",
  "De quelle transformation s'agit-il ?",
  "Quelle est la nature de cette transformation ?",
  "Quelle transformation a cette écriture complexe ?",
  "Lis le coefficient de $z$ : quelle est cette transformation ?",
  "Quel nom donner à cette transformation ?",
  "Cette écriture décrit une transformation du plan. Laquelle ?",
  "Sans calcul, identifie cette transformation.",
  "Que fait cette transformation aux points du plan ?",
];
const F_ECRITURE = [
  "Quelle est l'écriture complexe de cette transformation ?",
  "Parmi ces écritures, laquelle correspond à cette transformation ?",
  "Quelle formule donne l'image d'un point d'affixe $z$ ?",
  "Choisis l'écriture complexe juste.",
  "Quelle écriture $z' = az + b$ convient ?",
  "Une seule écriture correspond à cette transformation. Laquelle ?",
  "Comment s'écrit cette transformation avec $z$ et $z'$ ?",
  "Repère la bonne écriture complexe.",
  "Trouve l'écriture $z' = az + b$ de cette transformation.",
  "Sous quelle forme cette transformation s'écrit-elle ?",
];

/** z' = az + b, écrit proprement. */
// Le dernier terme ne part pas seul à la ligne ; entière, la formule élargissait le cadre de la bonne réponse.
const finGardee = (f: string) => f.replace(/ ([+-]) (?!.* [+-] )/, " $1 \\nobreak ");
const simT = (a: Z, b: Z) => finGardee(`z' = ${coefZ(a)}${suite(b)}`);

/* ───────────────── situations de géométrie ───────────────── */

type Traj = { t: (A: string, B: string) => string; ech: number };
const TRAJETS: Traj[] = [
  { ech: 100, t: (A, B) => `Un drone passe du point d'affixe $${A}$ au point d'affixe $${B}$, sur une carte graduée en mètres.` },
  { ech: 1, t: (A, B) => `Une joueuse de football passe le ballon d'une partenaire placée en $${A}$ à une autre placée en $${B}$, en mètres.` },
  { ech: 1, t: (A, B) => `Deux bouées d'une course de voile sont repérées par $${A}$ et $${B}$, en milles.` },
  { ech: 10, t: (A, B) => `Un robot de chantier va du point $${A}$ au point $${B}$, sur un plan en mètres.` },
  { ech: 1, t: (A, B) => `Sur l'écran d'un jeu vidéo, deux personnages sont aux points $${A}$ et $${B}$, en centaines de pixels.` },
  { ech: 10, t: (A, B) => `Une architecte place deux piliers en $${A}$ et $${B}$, sur un plan en mètres.` },
  { ech: 1, t: (A, B) => `Un biologiste suit une tortue marine, passée du point $${A}$ au point $${B}$, en kilomètres.` },
  { ech: 1, t: (A, B) => `Une géologue repère deux sources chaudes en $${A}$ et $${B}$, en kilomètres.` },
];
const FIN_TRAJET = ["Quelle distance les sépare ?", "Calcule cette distance.", "Que vaut cette distance ?", "Quelle est la longueur du trajet en ligne droite ?", "Donne la distance entre ces deux points."];

/* Une transformation à faire tourner dans une application. */
const APPLIS = [
  "Une graphiste applique cette transformation à un logo, dans le plan complexe.",
  "Une application de retouche photo déplace chaque point d'affixe $z$ selon cette formule.",
  "Un développeur de jeux vidéo anime un décor avec cette formule.",
  "Une cartographe passe d'un plan à un autre avec cette formule.",
  "Un architecte reproduit un motif de façade avec cette formule.",
  "Une animatrice de dessins animés déplace un personnage selon cette formule.",
  "Un roboticien commande un bras articulé avec cette formule.",
  "Un créateur de motifs textiles répète un dessin avec cette formule.",
];

/* Rapport et angle : a écrit sous forme algébrique, avec module et argument connus. */
function coefRem() {
  const c = un<() => { a: Z; t: string; rT: string; r: number; ang: A }>([
    () => { const k = entre(1, 4); const [sx, sy] = [signe(), signe()]; const R = rem(k, 4, sx, sy); return { a: [sx * k, sy * k], t: R.t, rT: R.rT, r: R.r, ang: R.a }; },
    () => { const k = entre(2, 6); return { a: [0, k], t: `${k}i`, rT: String(k), r: k, ang: [1, 2] }; },
    () => { const k = entre(2, 6); return { a: [0, -k], t: `-${k}i`, rT: String(k), r: k, ang: [-1, 2] }; },
    () => { const k = entre(2, 6); return { a: [-k, 0], t: `-${k}`, rT: String(k), r: k, ang: [1, 1] }; },
    () => ({ a: [0, 1], t: "i", rT: "1", r: 1, ang: [1, 2] }),
    () => ({ a: [0, -1], t: "-i", rT: "1", r: 1, ang: [-1, 2] }),
  ]);
  return c();
}
const COEF_FAUX = ["\\sqrt{2}", "2", "2\\sqrt{2}", "3", "1", "3\\sqrt{2}", "4", "\\dfrac{1}{2}", "4\\sqrt{2}", "5", "6"];

const NATURES = ["Une translation", "Une homothétie", "Une rotation", "Une similitude d'un autre type"];
const FORMES_NATURE: (() => [Z, Z, number])[] = [
  () => [[1, 0], zTire(6), 0],
  () => [[un([2, 3, 4, 5, -2, -3]), 0], zTire(6), 1],
  () => [un<Z>([[0, 1], [0, -1]]), zTire(6), 2],
  () => [un<Z>([[1, 1], [1, -1], [2, 2], [-1, 1], [3, 4], [0, 2], [0, -3], [1, 2]]), zTire(6), 3],
];
const SPIRALES = [
  "Une coquille de nautile se dessine en répétant cette similitude à partir du point d'affixe $z_{0}$.",
  "Un graphiste crée une spirale : chaque point est l'image du précédent.",
  "Une animatrice fait partir une étincelle en spirale : à chaque image, le point est transformé.",
  "Un motif de tournesol est tracé point par point avec cette formule.",
  "Une ingénieure simule un bras qui s'enroule : chaque position est l'image de la précédente.",
  "Dans un jeu vidéo, un projectile suit une spirale : chaque position vient de la précédente.",
];

export const nombresComplexesGeometrieBank: TutorBankItemV4[] = [
  /* ===== cx_geometrie ===== */
  tpl(M7, 1, 1, "L'abscisse donne la partie réelle, l'ordonnée la partie imaginaire.", () => {
    const z: Z = [nz(5), nz(5)];
    const L = un(["A", "B", "M", "P", "N"]);
    const texte = un([
      `Lis l'affixe du point $${L}$ sur cette figure.`,
      `Quelle est l'affixe du point $${L}$ placé dans le plan complexe ?`,
      `Écris l'affixe de $${L}$ sous la forme $a + bi$.`,
      `D'après la figure, quelle est l'affixe de $${L}$ ?`,
      `Le point $${L}$ est placé ci-dessous. Donne son affixe.`,
      `Quel nombre complexe correspond au point $${L}$ ?`,
      `Trouve $z_{${L}}$ sur la figure.`,
      `Que vaut $z_{${L}}$ d'après cette figure ?`,
      `Repère $${L}$, puis écris son affixe.`,
      `Quelle affixe a le point $${L}$ ?`,
      `Lis les coordonnées de $${L}$, puis donne son affixe.`,
      `Donne l'affixe du point $${L}$.`,
    ]);
    return courtZ(texte, z, ex7(`Le point a pour abscisse $${z[0]}$ et pour ordonnée $${z[1]}$.`, `Son affixe est $${zT(z)}$.`), plan([pt(z, L)]));
  }),
  tpl(M7, 2, 1, "L'affixe du vecteur AB est z_B − z_A : arrivée moins départ.", () => {
    const [a, b] = noms();
    const [u, v] = [dep(), dep()];
    if (zEq(u, v)) v[0] += 1;
    const j = zSub(v, u);
    return courtZ(`${un(["On donne", "Soit", "On place", "Prenons"])} $${zA(a, u)}$ et $${zA(b, v)}$. ${demande(`du vecteur $\\overrightarrow{${a}${b}}$`)}`, j, ex7(`$z_{${b}} - z_{${a}} = ${zT(v)} - ${zP(u)}$.`, `L'affixe du vecteur est $${zT(j)}$.`));
  }),
  tpl(M7, 3, 1, "AB = |z_B − z_A| : calcule la différence, puis son module.", () => {
    const [a, b] = noms();
    const [x, y] = un(TRIPLETS);
    const u = dep(6);
    const d: Z = [x * signe(), y * signe()];
    const v = zAdd(u, d);
    return court(`${un(["On donne", "Soit", "On place", "Prenons"])} $${zA(a, u)}$ et $${zA(b, v)}$. ${un(["Calcule cette distance.", "Que vaut cette distance ?", "Quelle est la longueur de ce segment ?", "Donne cette longueur.", "Calcule ce module pour trouver la distance.", "Trouve la distance entre ces deux points.", "Détermine cette longueur.", "Quelle est cette distance ?", "Sans figure, calcule cette distance.", "Combien vaut cette longueur ?"])}\n\n$${a}${b} = \\left|z_{${b}} - z_{${a}}\\right|$`, Math.hypot(x, y), ex7(`$z_{${b}} - z_{${a}} = ${zT(d)}$.`, `$${a}${b} = ${Math.hypot(x, y)}$.`));
  }),
  tpl(M7, 4, 1, "Le milieu a pour affixe la demi-somme des affixes.", () => {
    const [a, b] = noms();
    const I: Z = zTire(6);
    const d: Z = [nz(6), nz(6)];
    const [u, v] = [zAdd(I, d), zSub(I, d)];
    return courtZ(`${un(["On donne", "Soit", "On place", "Prenons"])} $${zA(a, u)}$ et $${zA(b, v)}$. ${demande(`du milieu $I$ du segment $[${a}${b}]$`)}`, I, ex7(`$\\dfrac{z_{${a}} + z_{${b}}}{2} = \\dfrac{${zT(zAdd(u, v))}}{2}$.`, `$z_{I} = ${zT(I)}$.`));
  }),

  tpl(M7, 5, 2, "ABCD est un parallélogramme quand AB et DC ont la même affixe : z_D = z_A + z_C − z_B.", () => {
    const [u, v, w] = [dep(6), dep(6), dep(6)];
    if (zEq(zSub(v, u), zSub(w, v))) w[0] += 1;
    const j = zAdd(u, zSub(w, v));
    return courtZ(`${un(["On donne", "Soit", "On place", "Prenons"])} $z_{A} = ${zT(u)}$, $z_{B} = ${zT(v)}$ et $z_{C} = ${zT(w)}$. ${un(["Calcule l'affixe de $D$ pour que $ABCD$ soit un parallélogramme.", "Le quadrilatère $ABCD$ est un parallélogramme. Quelle est l'affixe de $D$ ?", "Trouve $z_{D}$ pour que $ABCD$ soit un parallélogramme.", "Quel point $D$ fait de $ABCD$ un parallélogramme ? Donne son affixe.", "Complète le parallélogramme $ABCD$ : que vaut $z_{D}$ ?", "Détermine l'affixe du quatrième sommet $D$ du parallélogramme $ABCD$.", "Écris $z_{D}$ sachant que $ABCD$ est un parallélogramme.", "Une graphiste complète le parallélogramme $ABCD$. Où placer $D$ ?"])}`, j, ex7("$\\overrightarrow{AB} = \\overrightarrow{DC}$ donne $z_{D} = z_{A} + z_{C} - z_{B}$.", `$z_{D} = ${zT(j)}$.`));
  }),
  tpl(M7, 6, 2, "A, B, C sont alignés quand (z_C − z_A) ÷ (z_B − z_A) est réel.", () => {
    const [a, b, c] = noms();
    const u = dep(4);
    const d: Z = [nz(3), nz(3)];
    const t = un([2, 3, -1, -2]);
    const v = zAdd(u, d);
    const w = zAdd(u, zK(t, d));
    const texte = phrase(
      [`Les points $${a}$, $${b}$ et $${c}$ sont alignés.`, `On veut aligner $${a}$, $${b}$ et $${c}$.`, `Trois points doivent être alignés.`, `Une géomètre vérifie l'alignement de $${a}$, $${b}$ et $${c}$.`, `Un jardinier aligne trois piquets $${a}$, $${b}$ et $${c}$.`],
      ["Que vaut le réel $y$ ?", "Trouve le réel $y$.", "Quelle valeur du réel $y$ convient ?", "Calcule le réel $y$."],
    );
    return court(`${texte} On donne $${zA(a, u)}$ et $${zA(b, v)}$, et l'affixe de $${c}$ :\n\n$z_{${c}} = ${w[0] === 0 ? "" : `${w[0]} + `}yi$`, w[1], ex7(`$\\dfrac{z_{${c}} - z_{${a}}}{z_{${b}} - z_{${a}}}$ doit être réel : les vecteurs sont colinéaires.`, `$y = ${w[1]}$.`));
  }),
  tpl(M7, 7, 2, "Le centre de gravité d'un triangle a pour affixe le tiers de la somme des affixes.", () => {
    const G = zTire(5);
    const [d, e] = [dep(5), dep(5)];
    const [u, v] = [zAdd(G, d), zAdd(G, e)];
    const w = zSub(zK(3, G), zAdd(u, v));
    const [a, b, c] = noms();
    return courtZ(`${un(["On donne", "Soit", "On place", "Prenons"])} $${zA(a, u)}$, $${zA(b, v)}$ et $${zA(c, w)}$. ${demande(`du centre de gravité $G$ du triangle $${a}${b}${c}$`)}`, G, ex7(`$\\dfrac{z_{${a}} + z_{${b}} + z_{${c}}}{3} = \\dfrac{${zT(zK(3, G))}}{3}$.`, `$z_{G} = ${zT(G)}$.`));
  }),
  tpl(M7, 8, 2, "Calcule la différence des affixes, puis son module : a² + b², et la racine.", () => {
    for (;;) {
      const [a, b] = noms();
      const u = dep(5);
      const d = zTire(6);
      const N = zN2(d);
      if (Number.isInteger(Math.sqrt(N))) continue;
      const v = zAdd(u, d);
      return qcm(`${un(["On donne", "Soit", "On place", "Prenons"])} $${zA(a, u)}$ et $${zA(b, v)}$. ${un(["Quelle est la valeur exacte de cette distance ?", "Que vaut cette longueur, en valeur exacte ?", "Choisis la bonne valeur de cette distance.", "Parmi ces valeurs, laquelle est cette distance ?", "Calcule cette longueur.", "Trouve la valeur exacte de ce module.", "Quelle proposition donne cette distance ?", "Laquelle de ces valeurs est juste pour cette longueur ?"])}\n\n$${a}${b} = \\left|z_{${b}} - z_{${a}}\\right|$`, `$\\sqrt{${N}}$`, fauxRacines(d[0], d[1]).map((s) => `$${s}$`), ex7(`$z_{${b}} - z_{${a}} = ${zT(d)}$, et $${d[0] * d[0]} + ${d[1] * d[1]} = ${N}$.`, `$${a}${b} = \\sqrt{${N}}$.`));
    }
  }),

  tpl(M7, 9, 3, "Calcule AB et AC, puis le quotient (z_C − z_A) ÷ (z_B − z_A) : i ou −i signale un triangle rectangle isocèle.", () => {
    const C = ["Rectangle et isocèle en $A$", "Rectangle en $A$, non isocèle", "Isocèle en $A$, non rectangle", "Ni rectangle ni isocèle en $A$"];
    const u = dep(4);
    let d: Z = zTire(4);
    while (Math.abs(d[0]) === Math.abs(d[1])) d = zTire(4);
    const type = entre(0, 3);
    const s = signe();
    const e: Z = type === 0 ? zMul(d, [0, s]) : type === 1 ? zMul(d, [0, 2 * s]) : type === 2 ? [d[1], d[0]] : [d[0] + 2, d[1] + 1 === 0 ? 3 : d[1] + 1];
    const [v, w] = [zAdd(u, d), zAdd(u, e)];
    const per = d[0] * e[0] + d[1] * e[1] === 0;
    const iso = zN2(d) === zN2(e);
    const j = per && iso ? C[0] : per ? C[1] : iso ? C[2] : C[3];
    return qcm(`${un(["Quelle est la nature du triangle $ABC$ ?", "Que peut-on dire du triangle $ABC$ ?", "Décris le triangle $ABC$ en $A$.", "Calcule, puis donne la nature de $ABC$.", "Le triangle $ABC$ est tracé ci-dessous. Quelle est sa nature ?", "Quelle phrase décrit ce triangle ?", "Une architecte vérifie ce triangle $ABC$. Qu'est-il ?", "Compare $AB$ et $AC$, puis l'angle en $A$ : quelle est la nature de $ABC$ ?"])} On donne $z_{A} = ${zT(u)}$, $z_{B} = ${zT(v)}$ et $z_{C} = ${zT(w)}$.`, j, C, ex7(`$z_{B} - z_{A} = ${zT(d)}$ et $z_{C} - z_{A} = ${zT(e)}$. On compare leurs modules, puis on regarde si le quotient est imaginaire pur.`, `${j}.`), plan([pt(u, "A"), pt(v, "B"), pt(w, "C")], [[pt(u, ""), pt(v, ""), pt(w, ""), pt(u, "")]]));
  }),
  tpl(M7, 10, 3, "Parallélogramme d'abord (mêmes vecteurs), puis compare les côtés et l'angle.", () => {
    const C = ["Un carré", "Un rectangle non carré", "Un losange non carré", "Un parallélogramme quelconque"];
    const u = dep(3);
    let d: Z = zTire(3);
    while (Math.abs(d[0]) === Math.abs(d[1])) d = zTire(3);
    const type = entre(0, 3);
    const s = signe();
    let e: Z = type === 0 ? zMul(d, [0, s]) : type === 1 ? zMul(d, [0, 2 * s]) : type === 2 ? [d[1], d[0]] : [d[0] + 2, d[1] + 1 === 0 ? 3 : d[1] + 1];
    // Jamais de côtés alignés : un parallélogramme aplati n'est pas une figure.
    if (d[0] * e[1] - d[1] * e[0] === 0) e = d[1] !== 0 ? [e[0] + 1, e[1]] : [e[0], e[1] + 1];
    const [B, D, Cc] = [zAdd(u, d), zAdd(u, e), zAdd(zAdd(u, d), e)];
    const per = d[0] * e[0] + d[1] * e[1] === 0;
    const iso = zN2(d) === zN2(e);
    const j = per && iso ? C[0] : per ? C[1] : iso ? C[2] : C[3];
    return qcm(`${un(["Quelle est la nature la plus précise de $ABCD$ ?", "Que peut-on dire de ce quadrilatère $ABCD$ ?", "Quel nom le plus précis donner à $ABCD$ ?", "Calcule, puis donne la nature précise de $ABCD$.", "Ce quadrilatère $ABCD$ est-il particulier ? Choisis le nom le plus précis.", "Un menuisier vérifie ce cadre $ABCD$. Quelle est sa nature la plus précise ?", "Une carreleuse pose cette dalle $ABCD$. Quelle est sa forme exacte ?", "Le quadrilatère $ABCD$ est tracé ci-dessous. Quelle est sa nature ?"])} On donne $z_{A} = ${zT(u)}$, $z_{B} = ${zT(B)}$, $z_{C} = ${zT(Cc)}$ et $z_{D} = ${zT(D)}$.`, j, C, ex7(`$\\overrightarrow{AB}$ et $\\overrightarrow{DC}$ ont la même affixe $${zT(d)}$ : c'est un parallélogramme. On compare $${zT(d)}$ et $${zT(e)}$.`, `${j}.`), plan([pt(u, "A"), pt(B, "B"), pt(Cc, "C"), pt(D, "D")], [[pt(u, ""), pt(B, ""), pt(Cc, ""), pt(D, ""), pt(u, "")]]));
  }),
  tpl(M7, 11, 3, "L'angle orienté (AB, AC) est un argument de (z_C − z_A) ÷ (z_B − z_A).", () => {
    const u = dep(5);
    const R = rem(1, un([4, 4] as const), signe(), signe());
    const type = entre(0, 1);
    const d = zTire(3);
    const q: Z = type === 0 ? un<Z>([[0, 1], [0, -1], [0, 2], [0, -2], [-1, 0], [-2, 0], [3, 0]]) : [Math.sign(R.x), Math.sign(R.y)];
    const a: A = q[1] === 0 ? (q[0] > 0 ? [0, 1] : [1, 1]) : q[0] === 0 ? (q[1] > 0 ? [1, 2] : [-1, 2]) : R.a;
    const [v, w] = [zAdd(u, d), zAdd(u, zMul(d, q))];
    return qcm(`${un(["On donne", "Soit", "On place", "Prenons"])} $z_{A} = ${zT(u)}$, $z_{B} = ${zT(v)}$ et $z_{C} = ${zT(w)}$. ${un(["Quelle est la mesure principale de l'angle orienté de ces deux vecteurs ?", "Quelle mesure principale a cet angle orienté ?", "Calcule le quotient des affixes, puis donne la mesure principale de cet angle.", "Que vaut cet angle orienté, dans $]-\\pi\\,;\\pi]$ ?", "Choisis la mesure principale de cet angle orienté.", "Trouve la mesure principale de cet angle.", "Détermine cet angle orienté.", "Quel est cet angle orienté, à $2\\pi$ près ?"])}\n\n$\\left(\\overrightarrow{AB}, \\overrightarrow{AC}\\right)$`, `$${angT(a)}$`, [...fauxAngles(a), "0", "\\pi"].filter((s) => s !== angT(a)).map((s) => `$${s}$`), ex7(`$\\dfrac{z_{C} - z_{A}}{z_{B} - z_{A}} = ${zT(q)}$, dont un argument est $${angT(a)}$.`, `L'angle mesure $${angT(a)}$.`));
  }),
  tpl(M7, 12, 3, "|z − a| = r : les points à la distance r du point d'affixe a.", () => {
    const a = zTire(5);
    const r = entre(2, 9);
    const opp = zK(-1, a);
    const cercle = (c: Z, R: number | string) => `Le cercle de centre d'affixe $${entier(zT(c))}$ et de rayon $${R}$`;
    const faux = [cercle(opp, r), cercle(a, r * r), cercle(zConj(a), r), cercle(opp, r * r), `La droite d'équation $x = ${a[0]}$`];
    return qcm(pose(["Quel ensemble forment les points $M$ d'affixe $z$ vérifiant cette égalité ?", "Décris l'ensemble des points $M$ d'affixe $z$ tels que :", "Quel est le lieu des points $M$ d'affixe $z$ ?", "Traduis cette égalité par une distance : quel ensemble obtient-on ?", "Où sont les points d'affixe $z$ qui vérifient cette égalité ?", "Quelle figure dessinent les points d'affixe $z$ ?", "Une chèvre tend sa corde, attachée à un piquet : quel lieu cette égalité décrit-elle ?", "Quel ensemble de points cette égalité définit-elle ?", "Quel lieu géométrique correspond à cette égalité ?", "Choisis le lieu des points d'affixe $z$."], `\\left|z - ${zP(a)}\\right| = ${r}`), cercle(a, r), faux, ex7("$\\left|z - z_{\\Omega}\\right|$ est la distance de $M$ au point $\\Omega$.", `C'est le cercle de centre d'affixe $${zT(a)}$ et de rayon $${r}$.`));
  }),
  tpl(M7, 13, 3, "|z − a| = |z − b| : M est à égale distance de deux points, donc sur leur médiatrice.", () => {
    const [u, d] = [dep(4), zTire(4)];
    const v = zAdd(u, zK(2, d));
    const I = zAdd(u, d);
    const k = nz(3);
    const j = zAdd(I, zMul(d, [0, k]));
    const faux = [zAdd(I, d), zAdd(I, zK(2, d)), u, v, zAdd(j, [1, 0]), zAdd(j, [0, 1])];
    return qcm(pose(["Lequel de ces points d'affixe $z$ vérifie cette égalité ?", "Lequel de ces nombres vérifie l'égalité ?", "Quel complexe $z$ vérifie cette égalité ?", "Quel point est sur la médiatrice décrite par cette égalité ?", "Parmi ces affixes, laquelle vérifie cette égalité ?", "Le lieu de cette égalité est une médiatrice. Quel point lui appartient ?", "Un point est à égale distance de deux autres. Quelle est son affixe ?", "Trouve le point de cet ensemble.", "Quelle affixe convient à cette égalité ?", "Repère le seul nombre $z$ qui rend cette égalité vraie."], `\\left|z - ${zP(u)}\\right| = \\left|z - ${zP(v)}\\right|`), `$${zT(j)}$`, faux.map((w) => `$${zT(w)}$`), ex7(`Cette égalité décrit la médiatrice du segment dont les extrémités ont pour affixes $${zT(u)}$ et $${zT(v)}$.`, `$${zT(j)}$ convient.`));
  }),
  tpl(M7, 14, 3, "Des points cocycliques sont à la même distance du centre : compare les modules.", () => {
    const w = dep(4);
    const [x, y] = un<[number, number]>([[3, 4], [6, 8], [5, 12]]);
    const r = Math.hypot(x, y);
    const off: Z[] = [[r, 0], [-r, 0], [0, r], [0, -r], [x, y], [x, -y], [-x, y], [-x, -y], [y, x], [y, -x], [-y, x], [-y, -x]];
    const m = melangeEnPlace([...off]);
    const [A1, B1, D1] = [zAdd(w, m[0]), zAdd(w, m[1]), zAdd(w, m[2])];
    const faux = [zAdd(D1, [1, 0]), zAdd(D1, [0, 1]), zAdd(D1, [-1, 1]), zAdd(w, [x + 1, y]), zAdd(w, [y + 1, x + 1]), zAdd(w, [x + 2, y + 1])].filter((z) => Math.hypot(z[0] - w[0], z[1] - w[1]) !== r);
    return qcm(`Le point $\\Omega$ d'affixe $\\omega = ${zT(w)}$ est le centre d'un cercle passant par $A$ et $B$, avec $z_{A} = ${zT(A1)}$ et $z_{B} = ${zT(B1)}$. ${un(["Lequel de ces points est aussi sur ce cercle ?", "Quel point est cocyclique avec $A$ et $B$ sur ce cercle ?", "Quelle affixe est celle d'un point de ce cercle ?", "Parmi ces affixes, laquelle donne un point de ce cercle ?", "Une ingénieure place un quatrième point sur ce cercle. Quelle affixe convient ?", "Quel point complète $A$ et $B$ sur ce cercle ?", "Calcule les distances à $\\Omega$ : quel point est sur le cercle ?", "Repère l'affixe d'un point du même cercle."])}`, `$${zT(D1)}$`, faux.map((z) => `$${zT(z)}$`), ex7(`$\\Omega A = \\Omega B = ${r}$. Le bon point est à la distance ${r} de $\\Omega$.`, `$${zT(D1)}$ convient.`));
  }),
  tpl(M7, 16, 3, "Le quotient est réel exactement quand les quatre points sont cocycliques : réduis-le et regarde sa partie imaginaire.", () => {
    const C = ["Cocycliques : ce quotient est réel", "Cocycliques : ce quotient est imaginaire pur", "Non cocycliques : ce quotient n'est pas réel", "Non cocycliques : ce quotient est réel"];
    const w = dep(3);
    const [x, y] = un<[number, number]>([[3, 4], [6, 8], [5, 12]]);
    const r = Math.hypot(x, y);
    const off: Z[] = [[r, 0], [-r, 0], [0, r], [0, -r], [x, y], [x, -y], [-x, y], [-x, -y], [y, x], [y, -x], [-y, x], [-y, -x]];
    for (;;) {
      const m = melangeEnPlace([...off]);
      const coc = Math.random() < 0.5;
      const dec: Z = un<Z>([[1, 0], [0, 1], [-1, 0], [0, -1], [1, 1]]);
      const [a, b, c] = [zAdd(w, m[0]), zAdd(w, m[1]), zAdd(w, m[2])];
      const d = coc ? zAdd(w, m[3]) : zAdd(zAdd(w, m[3]), dec);
      if (!coc && Math.hypot(d[0] - w[0], d[1] - w[1]) === r) continue;
      if ([a, b, c].some((p) => zEq(p, d))) continue;
      const N = zMul(zSub(c, a), zSub(d, b));
      const D = zMul(zSub(c, b), zSub(d, a));
      const im = zMul(N, zConj(D))[1];
      const texte = `${un(["On donne", "Soit", "On place", "Prenons"])} $z_{A} = ${zT(a)}$, $z_{B} = ${zT(b)}$, $z_{C} = ${zT(c)}$ et $z_{D} = ${zT(d)}$. ${un(["Les points $A$, $B$ et $C$ ne sont pas alignés.", "Une ingénieure sait que $A$, $B$ et $C$ ne sont pas alignés.", "Les trois premiers points forment un vrai triangle."])} Les quatre points sont cocycliques exactement quand ce quotient est réel. ${un(["Que conclure ?", "Quelle conclusion est juste ?", "Calcule-le, puis conclus.", "Lequel de ces constats est exact ?"])}\n\n$\\dfrac{z_{C} - z_{A}}{z_{C} - z_{B}} \\times \\dfrac{z_{D} - z_{B}}{z_{D} - z_{A}}$`;
      return qcm(texte, coc ? C[0] : C[2], coc ? C.filter((_, k) => k !== 0) : C.filter((_, k) => k !== 2), ex7(`Le quotient vaut $\\dfrac{${zT(N)}}{${zT(D)}}$, et sa partie imaginaire est ${im === 0 ? "nulle" : "non nulle"}.`, coc ? "Les quatre points sont cocycliques." : "Les quatre points ne sont pas cocycliques."));
    }
  }),
  tpl(M7, 15, 3, "La distance est le module de la différence des affixes.", () => {
    const tr = un(TRAJETS);
    const [x, y] = un(TRIPLETS);
    const u: Z = [entre(-9, 9) * tr.ech, entre(-9, 9) * tr.ech];
    const d: Z = [x * tr.ech * signe(), y * tr.ech * signe()];
    const v = zAdd(u, d);
    const texte = tr.t(zT(u), zT(v));
    return court(`${texte} ${un(FIN_TRAJET)}`, Math.hypot(d[0], d[1]), ex7(`La différence des affixes vaut $${zT(d)}$.`, `La distance vaut $${Math.hypot(d[0], d[1])}$.`));
  }),

  /* ===== cx_transformations ===== */
  tpl(M8, 1, 1, "Une translation ajoute l'affixe du vecteur.", () => {
    const [z, b] = [dep(), zTire(6)];
    return courtZ(`La translation a pour vecteur d'affixe $${zT(b)}$. ${un(F_IMAGE)}\n\n$z = ${zT(z)}$`, zAdd(z, b), ex8(`$z' = z + b$.`, `$z' = ${zT(zAdd(z, b))}$.`));
  }),
  tpl(M8, 2, 1, "z + b : translation. kz, avec k réel : homothétie. iz, −z : rotation. z̄ : symétrie.", () => {
    const C = ["Une translation", "Une homothétie de centre $O$", "Une rotation de centre $O$", "La symétrie par rapport à l'axe des réels"];
    const [f, j] = un<[string, string]>([
      [`z' = z${suite(zTire(5))}`, C[0]],
      [`z' = ${un([2, 3, 4, 5, -2, -3])}z`, C[1]],
      [`z' = \\dfrac{z}{${un([2, 3, 4])}}`, C[1]],
      ["z' = iz", C[2]],
      ["z' = -iz", C[2]],
      ["z' = \\overline{z}", C[3]],
    ]);
    return qcm(pose(F_NATURE_T, f), j, C, ex8("Le coefficient de $z$ décide : 1 pour une translation, un réel pour une homothétie, un module 1 pour une rotation.", `${j}.`));
  }),
  tpl(M8, 3, 1, "Homothétie de centre O et de rapport k : on multiplie l'affixe par k.", () => {
    const z = zTire(6);
    const k = un([2, 3, 4, 5, -2, -3]);
    return courtZ(`L'homothétie a pour centre l'origine $O$ et pour rapport $k = ${k}$. ${un(F_IMAGE)}\n\n$z = ${zT(z)}$`, zK(k, z), ex8(`$z' = kz$.`, `$z' = ${zT(zK(k, z))}$.`));
  }),
  tpl(M8, 4, 1, "Rotation de centre O : on multiplie par e^(iθ) ; i pour π ÷ 2, −i pour −π ÷ 2, −1 pour π.", () => {
    const z = zTire(7);
    const [a, m] = un<[A, Z]>([[[1, 2], [0, 1]], [[-1, 2], [0, -1]], [[1, 1], [-1, 0]]]);
    const j = zMul(m, z);
    return courtZ(`La rotation a pour centre l'origine $O$ et pour angle $\\theta = ${angT(a)}$. ${un(F_IMAGE)}\n\n$z = ${zT(z)}$`, j, ex8(`$\\mathrm{e}^{i\\theta} = ${zT(m)}$, et on multiplie $z$ par ce nombre.`, `$z' = ${zT(j)}$.`));
  }),

  tpl(M8, 5, 2, "z' − ω = k(z − ω), puis développe : z' = kz + (1 − k)ω.", () => {
    const w = zTire(5);
    const k = un([2, 3, 4, -2, -3]);
    const b = zK(1 - k, w);
    const faux = [simT([k, 0], w), simT([k, 0], zK(k - 1, w)), simT([1 - k, 0], zK(k, w)), simT([k, 0], zK(1 + k, w)), simT([k, 0], zK(-1, w))];
    return qcm(`${un(F_ECRITURE)} C'est l'homothétie de centre $\\Omega$ d'affixe $\\omega$ et de rapport $k = ${k}$.\n\n$\\omega = ${zT(w)}$`, `$${simT([k, 0], b)}$`, faux.map((s) => `$${s}$`), ex8(`$z' - ${zP(w)} = ${k}(z - ${zP(w)})$ : on développe et on isole $z'$.`, `$${simT([k, 0], b)}$.`));
  }),
  tpl(M8, 6, 2, "z' − ω = e^(iθ)(z − ω), avec e^(iθ) = i ou −i, puis développe.", () => {
    const w = zTire(5);
    const [a, m] = un<[A, Z]>([[[1, 2], [0, 1]], [[-1, 2], [0, -1]], [[1, 1], [-1, 0]]]);
    const b = zMul([1 - m[0], -m[1]], w);
    const faux = [simT(m, w), simT(m, zK(-1, b)), simT(m, zAdd(b, [1, 0])), simT(zConj(m)[0] === m[0] && zConj(m)[1] === m[1] ? [1, 0] : zConj(m), b), simT(m, zMul(m, w))];
    return qcm(`${un(F_ECRITURE)} C'est la rotation de centre $\\Omega$ d'affixe $\\omega$ et d'angle $\\theta = ${angT(a)}$.\n\n$\\omega = ${zT(w)}$`, `$${simT(m, b)}$`, faux.filter((s) => s !== simT(m, b)).map((s) => `$${s}$`), ex8(`$\\mathrm{e}^{i\\theta} = ${zT(m)}$. On développe $z' - ${zP(w)} = ${zP(m)}(z - ${zP(w)})$.`, `$${simT(m, b)}$.`));
  }),
  tpl(M8, 7, 2, "Écris la formule avec le centre, puis remplace z.", () => {
    const [w, z] = [dep(5), dep(6)];
    const d = zSub(z, w);
    const type = entre(0, 2);
    if (type === 0) {
      const k = un([2, 3, -2, -1]);
      return courtZ(`L'homothétie a pour centre le point d'affixe $\\omega = ${zT(w)}$ et pour rapport $k = ${k}$. ${un(F_IMAGE)}\n\n$z = ${zT(z)}$`, zAdd(w, zK(k, d)), ex8(`$z' = \\omega + k(z - \\omega)$.`, `$z' = ${zT(zAdd(w, zK(k, d)))}$.`));
    }
    if (type === 1) {
      return courtZ(`C'est la symétrie de centre le point d'affixe $\\omega = ${zT(w)}$. ${un(F_IMAGE)}\n\n$z = ${zT(z)}$`, zSub(zK(2, w), z), ex8(`Une symétrie centrale est une homothétie de rapport $-1$ : $z' = 2\\omega - z$.`, `$z' = ${zT(zSub(zK(2, w), z))}$.`));
    }
    const [a, m] = un<[A, Z]>([[[1, 2], [0, 1]], [[-1, 2], [0, -1]]]);
    return courtZ(`La rotation a pour centre le point d'affixe $\\omega = ${zT(w)}$ et pour angle $\\theta = ${angT(a)}$. ${un(F_IMAGE)}\n\n$z = ${zT(z)}$`, zAdd(w, zMul(m, d)), ex8(`$z' = \\omega + \\mathrm{e}^{i\\theta}(z - \\omega)$, avec $\\mathrm{e}^{i\\theta} = ${zT(m)}$.`, `$z' = ${zT(zAdd(w, zMul(m, d)))}$.`));
  }),
  tpl(M8, 8, 2, "Le centre est le point fixe : résous z = az + b.", () => {
    const w = zTire(5);
    const a = un<Z>([[2, 0], [3, 0], [-1, 0], [-2, 0], [0, 1], [0, -1], [-3, 0], [4, 0]]);
    const b = zMul(zSub([1, 0], a), w);
    return courtZ(pose(["Quelle est l'affixe du centre de cette transformation ?", "Trouve le point fixe de cette transformation : donne son affixe.", "Quel point ne bouge pas ? Donne son affixe.", "Calcule l'affixe $\\omega$ de son centre.", "Résous $z = az + b$ pour trouver le centre.", "Détermine le centre de cette transformation.", "Quel point reste en place sous cette transformation ?", "Que vaut l'affixe du point invariant ?", "Donne le centre, sous la forme $a + bi$.", "Trouve $\\omega$ tel que l'image de $\\omega$ soit $\\omega$."], simT(a, b)), w, ex8(`On résout $\\omega = ${coefZ(a, "\\omega")}${suite(b)}$, soit $\\omega = \\dfrac{b}{1 - a}$.`, `$\\omega = ${zT(w)}$.`));
  }),

  tpl(M8, 9, 3, "Multiplie par e^(iθ), écrit avec ses valeurs exactes.", () => {
    const k = entre(1, 4);
    const type = un<3 | 6>([3, 6]);
    const [sx, sy] = [1 as const, signe()];
    const R = rem(k, type, sx, sy);
    const faux = [rem(k, type, sx, sy === 1 ? -1 : 1).t, rem(k, type === 3 ? 6 : 3, sx, sy).t, rem(k, type, -1, sy).t, rem(k + 1, type, sx, sy).t, rem(k, type === 3 ? 6 : 3, -1, sy).t];
    return qcm(`La rotation a pour centre $O$ et pour angle $\\theta = ${angT(R.a)}$. ${un(F_IMAGE)}\n\n$z = ${R.rT}$`, `$${R.t}$`, faux.map((s) => `$${s}$`), ex8(`$z' = ${R.rT}\\mathrm{e}^{i\\theta}$, et on remplace par les valeurs exactes de $\\cos$ et de $\\sin$.`, `$z' = ${R.t}$.`));
  }),
  tpl(M8, 10, 3, "Le quotient z' ÷ z donne le coefficient : réel pour une homothétie, de module 1 pour une rotation.", () => {
    const z = zTire(5);
    const [q, nom] = un<[Z, string]>([[[0, 1], "La rotation de centre $O$ et d'angle $\\dfrac{\\pi}{2}$"], [[0, -1], "La rotation de centre $O$ et d'angle $-\\dfrac{\\pi}{2}$"], [[-1, 0], "La rotation de centre $O$ et d'angle $\\pi$"], [[2, 0], "L'homothétie de centre $O$ et de rapport $2$"], [[3, 0], "L'homothétie de centre $O$ et de rapport $3$"], [[-2, 0], "L'homothétie de centre $O$ et de rapport $-2$"]]);
    const C = ["La rotation de centre $O$ et d'angle $\\dfrac{\\pi}{2}$", "La rotation de centre $O$ et d'angle $-\\dfrac{\\pi}{2}$", "La rotation de centre $O$ et d'angle $\\pi$", "L'homothétie de centre $O$ et de rapport $2$", "L'homothétie de centre $O$ et de rapport $3$", "L'homothétie de centre $O$ et de rapport $-2$"];
    const w = zMul(q, z);
    const texte = un([
      "Une transformation de centre $O$ envoie $A$ sur $B$. Laquelle ?",
      "Le point $B$ est l'image de $A$. Quelle transformation de centre $O$ convient ?",
      "Quelle transformation de centre $O$ envoie $A$ sur $B$ ?",
      "Calcule $\\dfrac{z_{B}}{z_{A}}$ pour reconnaître la transformation qui envoie $A$ sur $B$.",
      "Reconnais la transformation de centre $O$ qui envoie $A$ sur $B$.",
      "Une graphiste a déplacé le point $A$ jusqu'en $B$. Quelle transformation de centre $O$ a-t-elle utilisée ?",
      "Quelle transformation de centre $O$ transforme $A$ en $B$ ?",
      "Quel est le lien entre $A$ et $B$ ?",
    ]);
    return qcm(`${texte} On donne $z_{A} = ${zT(z)}$ et $z_{B} = ${zT(w)}$.`, nom, C, ex8(`$\\dfrac{z_{B}}{z_{A}} = ${zT(q)}$.`, `${nom}.`));
  }),
  tpl(M8, 11, 3, "Applique les deux transformations l'une après l'autre.", () => {
    const [z, b] = [dep(5), zTire(5)];
    const k = un([2, 3, -2]);
    const m = un<Z>([[0, 1], [0, -1]]);
    const [t1, t2, j] = un<[string, string, Z]>([
      [`la translation de vecteur d'affixe $${zT(b)}$`, `l'homothétie de centre $O$ et de rapport $${k}$`, zK(k, zAdd(z, b))],
      [`l'homothétie de centre $O$ et de rapport $${k}$`, `la translation de vecteur d'affixe $${zT(b)}$`, zAdd(zK(k, z), b)],
      [`la translation de vecteur d'affixe $${zT(b)}$`, `la rotation de centre $O$ et d'angle $${m[1] > 0 ? "\\dfrac{\\pi}{2}" : "-\\dfrac{\\pi}{2}"}$`, zMul(m, zAdd(z, b))],
      [`la rotation de centre $O$ et d'angle $${m[1] > 0 ? "\\dfrac{\\pi}{2}" : "-\\dfrac{\\pi}{2}"}$`, `la translation de vecteur d'affixe $${zT(b)}$`, zAdd(zMul(m, z), b)],
      [`la rotation de centre $O$ et d'angle $${m[1] > 0 ? "\\dfrac{\\pi}{2}" : "-\\dfrac{\\pi}{2}"}$`, `l'homothétie de centre $O$ et de rapport $${k}$`, zK(k, zMul(m, z))],
    ]);
    const texte = un([`On applique d'abord ${t1}, puis ${t2}.`, `Un point subit ${t1}, puis ${t2}.`, `Une animatrice enchaîne ${t1}, puis ${t2}.`, `Dans un logiciel de dessin, on applique ${t1}, puis ${t2}.`, `Un robot exécute ${t1}, puis ${t2}.`]);
    return courtZ(`${texte} ${un(["Où arrive ce point ?", "Quelle est l'affixe finale ?", "Calcule l'affixe de l'image finale.", "Donne l'affixe du point d'arrivée."])}\n\n$z = ${zT(z)}$`, j, ex8("On applique la première formule, puis la seconde au résultat : l'ordre compte.", `Le point d'arrivée a pour affixe $${zT(j)}$.`));
  }),
  tpl(M8, 12, 3, "Multiplier par i, c'est tourner d'un quart de tour dans le sens direct.", () => {
    const z = zTire(9);
    const n = entre(2, 9);
    const m = un<Z>([[0, 1], [0, -1]]);
    const j = zMul(zPow(m, n), z);
    const objets = [
      "Dans un jeu vidéo, un personnage en $z$ tourne d'un quart de tour autour de l'origine à chaque niveau,",
      "Une éolienne a une pale dont le bout est en $z$. Elle tourne d'un quart de tour à chaque étape,",
      "Une danseuse placée en $z$ pivote d'un quart de tour autour du centre de la scène à chaque temps,",
      "Un drone en $z$ tourne d'un quart de tour autour de sa base à chaque passage,",
      "Une nacelle de manège en $z$ tourne d'un quart de tour autour du centre à chaque arrêt,",
      "Un satellite-jouet en $z$ fait un quart de tour autour de l'origine à chaque impulsion,",
    ];
    return courtZ(`${un(objets)} ${m[1] > 0 ? "dans le sens direct" : "dans le sens indirect"}. ${un(["Quelle est la position", "Quelle affixe obtient-on", "Où arrive ce point", "Quel point atteint-on"])} après ${n} étapes ?\n\n$z = ${zT(z)}$`, j, ex8(`On multiplie $z$ par $${zP(m)}^{${n}} = ${zT(zPow(m, n))}$.`, `La position est $${zT(j)}$.`));
  }),

  /* ===== similitude_directe ===== */
  tpl(M9, 1, 1, "Le rapport est le module du coefficient de z.", () => {
    const [x, y] = un(TRIPLETS);
    const a: Z = un<Z>([[x * signe(), y * signe()], [0, nz(9)], [nz(9), 0], [x * signe(), y * signe()]]);
    const b = zTire(6);
    return court(pose(["Quel est le rapport de cette similitude ?", "Que vaut le rapport de cette similitude directe ?", "Calcule le rapport $k$ de cette similitude.", "Donne le rapport de cette transformation.", "Par combien cette similitude multiplie-t-elle les longueurs ?", "Quel réel positif est le rapport de cette similitude ?", "Lis $a$, puis calcule le rapport.", "Trouve le rapport de cette similitude.", "Quel est le coefficient d'agrandissement de cette similitude ?", "Détermine le rapport de cette similitude."], simT(a, b)), Math.hypot(a[0], a[1]), ex9(`$a = ${zT(a)}$, et son module vaut $${Math.hypot(a[0], a[1])}$.`, `Le rapport est $${Math.hypot(a[0], a[1])}$.`));
  }),
  tpl(M9, 2, 1, "L'angle est un argument du coefficient de z.", () => {
    const c = coefRem();
    const b = zTire(6);
    const a: Z = c.a;
    return qcm(pose(["Quel est l'angle de cette similitude ?", "Quelle est la mesure principale de l'angle de cette similitude ?", "Donne l'angle de cette similitude directe.", "Lis $a$ : quel est l'angle de cette transformation ?", "Quel angle cette similitude fait-elle tourner les figures ?", "Trouve l'angle de cette similitude.", "Choisis la mesure principale de l'angle.", "Quelle mesure a l'angle de cette similitude ?", "Détermine son angle.", "De quel angle tournent les figures sous cette similitude ?"], simT(a, b)), `$${angT(c.ang)}$`, fauxAngles(c.ang).map((s) => `$${s}$`), ex9(`$a = ${c.t}$ a pour argument $${angT(c.ang)}$.`, `L'angle est $${angT(c.ang)}$.`));
  }),
  tpl(M9, 3, 1, "Remplace z par l'affixe du point, puis calcule.", () => {
    const [a, b, z] = [zTire(3), zTire(5), zTire(4)];
    const j = zAdd(zMul(a, z), b);
    return courtZ(`La similitude est donnée par $${simT(a, b)}$. ${un(F_IMAGE)}\n\n$z = ${zT(z)}$`, j, ex9(`$${zP(a)} \\times ${zP(z)}$, puis on ajoute $${zT(b)}$.`, `$z' = ${zT(j)}$.`));
  }),
  tpl(M9, 4, 1, "Le centre est le point fixe : résous ω = aω + b.", () => {
    const w = zTire(5);
    let a = zTire(3);
    while (a[0] === 1) a = zTire(3);
    const b = zMul(zSub([1, 0], a), w);
    return courtZ(pose(["Quelle est l'affixe du centre de cette similitude ?", "Trouve le point fixe de cette similitude.", "Calcule l'affixe $\\omega$ du centre.", "Quel point reste en place ? Donne son affixe.", "Résous $\\omega = a\\omega + b$ pour trouver le centre.", "Détermine le centre de cette similitude directe.", "Donne le centre, sous la forme $a + bi$.", "Que vaut l'affixe du centre ?", "Quel est le point invariant de cette transformation ?", "Trouve $\\omega$ dans cette écriture."], simT(a, b)), w, ex9(`$\\omega = \\dfrac{b}{1 - a}$, avec $1 - a = ${zT(zSub([1, 0], a))}$.`, `$\\omega = ${zT(w)}$.`));
  }),

  tpl(M9, 5, 2, "a = k e^(iθ), puis b = (1 − a)ω. Si le centre est O, b = 0.", () => {
    const [k, ang, m] = un<[number, A, Z]>([[2, [1, 2], [0, 2]], [3, [1, 2], [0, 3]], [2, [-1, 2], [0, -2]], [3, [-1, 2], [0, -3]], [2, [1, 1], [-2, 0]], [4, [1, 2], [0, 4]], [5, [-1, 2], [0, -5]]]);
    const w = zTire(4);
    const b = zMul(zSub([1, 0], m), w);
    const faux = [simT(m, w), simT(m, zK(-1, b)), simT(zConj(m), b), simT([k, 0], b), simT(m, zAdd(b, [1, 1]))];
    return qcm(`${un(F_ECRITURE)} La similitude a pour rapport $k = ${k}$, pour angle $\\theta = ${angT(ang)}$ et pour centre le point d'affixe :\n\n$\\omega = ${zT(w)}$`, `$${simT(m, b)}$`, faux.map((s) => `$${s}$`), ex9(`$a = ${k}\\mathrm{e}^{i\\theta} = ${zT(m)}$, puis $b = (1 - a)\\omega = ${zT(b)}$.`, `$${simT(m, b)}$.`));
  }),
  tpl(M9, 6, 2, "a = 1 : translation. a réel : homothétie. |a| = 1 : rotation. Sinon, une similitude plus générale.", () => {
    const [a, b, n] = un(FORMES_NATURE)();
    return qcm(pose(F_NATURE_T, simT(a, b)), NATURES[n], NATURES, ex9(`Ici, $a = ${zT(a)}$ et $\\left|a\\right| = ${Number.isInteger(Math.hypot(a[0], a[1])) ? Math.hypot(a[0], a[1]) : `\\sqrt{${zN2(a)}}`}$.`, `${NATURES[n]}.`));
  }),
  tpl(M9, 7, 2, "Rapport : |a|. Angle : arg(a). Centre : b ÷ (1 − a).", () => {
    const [k, ang, m] = un<[number, A, Z]>([[2, [1, 2], [0, 2]], [3, [-1, 2], [0, -3]], [2, [1, 1], [-2, 0]], [3, [1, 1], [-3, 0]], [4, [1, 2], [0, 4]], [1, [1, 2], [0, 1]], [1, [-1, 2], [0, -1]]]);
    const w = zTire(4);
    const b = zMul(zSub([1, 0], m), w);
    const dire = (r: number, a: A, c: Z) => `Rapport $${r}$, angle $${angT(a)}$, centre d'affixe $${entier(zT(c))}$`;
    const faux = [dire(k, princ([-ang[0], ang[1]]), w), dire(k + 1, ang, w), dire(k, ang, zK(-1, w)), dire(k, ang, b), dire(k + 1, ang, b)];
    return qcm(pose(["Quels sont les éléments caractéristiques de cette similitude ?", "Donne le rapport, l'angle et le centre de cette similitude.", "Quels éléments caractérisent cette transformation ?", "Choisis la bonne description de cette similitude.", "Que valent le rapport, l'angle et le centre ?", "Quelle proposition décrit cette similitude directe ?", "Trouve son rapport, son angle et son centre.", "Quelle description de cette transformation est juste ?", "Détermine ses éléments caractéristiques.", "Une seule description est exacte. Laquelle ?"], simT(m, b)), dire(k, ang, w), faux, ex9(`$\\left|a\\right| = ${k}$, $\\arg(a) = ${angT(ang)}$ et $\\omega = \\dfrac{${zT(b)}}{${zT(zSub([1, 0], m))}}$.`, `${dire(k, ang, w)}.`));
  }),
  tpl(M9, 8, 2, "a = (z_B' − z_A') ÷ (z_B − z_A), puis b = z_A' − a z_A.", () => {
    const [a, b, u, d] = [zTire(3), zTire(5), dep(4), zTire(3)];
    const v = zAdd(u, d);
    const [u2, v2] = [zAdd(zMul(a, u), b), zAdd(zMul(a, v), b)];
    const donnees = `$z_{A} = ${zT(u)}$, $z_{B} = ${zT(v)}$, et leurs images $z_{A'} = ${zT(u2)}$, $z_{B'} = ${zT(v2)}$`;
    const debut = un([`Une similitude directe $z' = az + b$ envoie $A$ sur $A'$ et $B$ sur $B'$, avec ${donnees}.`, `On connaît deux points et leurs images par la similitude $z' = az + b$ : ${donnees}.`, `La transformation $z' = az + b$ vérifie ceci : ${donnees}.`]);
    if (Math.random() < 0.5) return courtZ(`${debut} ${un(["Calcule le coefficient $a$.", "Que vaut $a$ ?", "Trouve $a$ sous la forme $c + di$.", "Détermine le nombre complexe $a$.", "Écris $a$ sous forme algébrique."])}\n\n$a = \\dfrac{z_{B'} - z_{A'}}{z_{B} - z_{A}}$`, a, ex9(`$\\dfrac{${zT(zSub(v2, u2))}}{${zT(d)}}$ : on multiplie par le conjugué du dénominateur.`, `$a = ${zT(a)}$.`));
    return courtZ(`${debut} ${un(["Ici, $a$ vaut :", "On a trouvé $a$ :", "Le coefficient est connu :", "On sait de plus que :"])}\n\n$a = ${zT(a)}$\n\n${un(["Calcule $b$.", "Que vaut $b$ ?", "Trouve $b$ sous la forme $c + di$.", "Déduis-en $b$.", "Écris $b$ sous forme algébrique."])}`, b, ex9("$b = z_{A'} - az_{A}$.", `$b = ${zT(b)}$.`));
  }),
  tpl(M9, 9, 2, "Une similitude de rapport k multiplie les longueurs par k et les aires par k².", () => {
    const [x, y] = un<[number, number]>([[3, 4], [6, 8], [5, 12], [0, 2], [0, 3], [2, 0], [3, 0]]);
    const a: Z = [x * signe() || 0, y * signe() || 0];
    const k = Math.hypot(a[0], a[1]);
    const b = zTire(5);
    const v = entre(2, 9);
    const f = simT(a, b);
    const [objet, val] = un<[string, number]>([[`Un segment mesure $${v}$ cm. Quelle est la longueur de son image, en cm ?`, v * k], [`Un triangle a pour aire $${v}$ cm². Quelle est l'aire de son image, en cm² ?`, v * k * k], [`Un disque a pour aire $${v}$ cm². Quelle est l'aire de son image, en cm² ?`, v * k * k], [`Un cercle a pour rayon $${v}$ cm. Quel est le rayon de son image, en cm ?`, v * k], [`Un carré a pour périmètre $${v}$ cm. Quel est le périmètre de son image, en cm ?`, v * k], [`Un rectangle a pour aire $${v}$ m². Quelle est l'aire de son image, en m² ?`, v * k * k]]);
    return court(`${un(["Cette similitude agrandit la figure.", "On applique cette similitude à une figure.", "Une graphiste agrandit un motif avec cette similitude.", "Une architecte reproduit un plan avec cette similitude.", "Cette transformation s'applique à une figure du plan."])} ${objet}\n\n$${f}$`, val, ex9(`Le rapport vaut $\\left|a\\right| = ${k}$ : les longueurs sont multipliées par ${k}, les aires par ${k * k}.`, `La réponse est $${val}$.`));
  }),

  tpl(M9, 10, 3, "Remplace z' de la première dans la seconde : les coefficients a se multiplient.", () => {
    const [a1, a2] = [zTire(3), zTire(2)];
    const [b1, b2] = [zTire(4), zTire(4)];
    const a = zMul(a2, a1);
    const b = zAdd(zMul(a2, b1), b2);
    const faux = [`z'' = ${coefZ(zAdd(a1, a2))}${suite(b)}`, `z'' = ${coefZ(a)}${suite(zAdd(b1, b2))}`, `z'' = ${coefZ(a)}${suite(zAdd(zMul(a1, b2), b1))}`, `z'' = ${coefZ(a)}${suite(zMul(b1, b2))}`, `z'' = ${coefZ(zConj(a))}${suite(b)}`];
    const texte = phrase(
      ["On applique d'abord $z' = S_{1}(z)$, puis $z'' = S_{2}(z')$.", "Deux similitudes s'enchaînent : $S_{1}$, puis $S_{2}$.", "Une graphiste enchaîne deux similitudes : $S_{1}$, puis $S_{2}$.", "Un logiciel applique $S_{1}$, puis $S_{2}$ au résultat."],
      ["Quelle est l'écriture de la composée ?", "Quelle formule donne $z''$ en fonction de $z$ ?", "Exprime $z''$ en fonction de $z$.", "Écris cette composée.", "Trouve l'écriture complexe de cet enchaînement."],
    );
    return qcm(`${texte}\n\n$S_{1} : ${finGardee(`z' = ${coefZ(a1)}${suite(b1)}`)}$\n\n$S_{2} : ${finGardee(`z'' = ${coefZ(a2, "z'")}${suite(b2)}`)}$`, `$z'' = ${coefZ(a)}${suite(b)}$`, faux.filter((s) => s !== `z'' = ${coefZ(a)}${suite(b)}`).map((s) => `$${s}$`), ex9("On remplace $z'$ dans la seconde formule, puis on développe.", `$z'' = ${coefZ(a)}${suite(b)}$.`));
  }),
  tpl(M9, 11, 3, "Lis a dans la formule : son module agrandit, son argument fait tourner.", () => {
    const c = coefRem();
    const b = zTire(5);
    const app = un(APPLIS);
    const f = simT(c.a, b);
    if (Math.random() < 0.5) {
      const faux = COEF_FAUX.filter((s) => s !== c.rT);
      return qcm(`${app} ${un(["Par quel rapport les longueurs sont-elles multipliées ?", "Quel est le rapport de cette similitude ?", "De combien les longueurs sont-elles multipliées ?", "Quel agrandissement cette formule produit-elle ?"])}\n\n$${f}$`, `$${c.rT}$`, faux.map((s) => `$${s}$`), ex9(`$\\left|${c.t}\\right| = ${c.rT}$.`, `Le rapport est $${c.rT}$.`));
    }
    return qcm(`${app} ${un(["De quel angle les figures tournent-elles ?", "Quel est l'angle de cette similitude ?", "Quelle rotation cette formule contient-elle ?", "De quel angle le motif tourne-t-il ?"])}\n\n$${f}$`, `$${angT(c.ang)}$`, fauxAngles(c.ang).map((s) => `$${s}$`), ex9(`Un argument de $${c.t}$ est $${angT(c.ang)}$.`, `L'angle est $${angT(c.ang)}$.`));
  }),
  tpl(M9, 12, 3, "Après n images, le module de l'affixe est multiplié par |a|ⁿ.", () => {
    const a = un<Z>([[1, 1], [1, -1], [-1, 1], [0, 2], [0, -2], [-2, 0], [3, 4], [0, 3]]);
    const m2 = zN2(a);
    const n = Number.isInteger(Math.sqrt(m2)) ? un([2, 3, 4]) : un([2, 4, 6, 8]);
    const [x0, y0] = un<[number, number]>([[3, 4], [6, 8], [5, 12], [1, 0], [0, 2]]);
    const z0: Z = [x0, y0];
    const v = Math.hypot(x0, y0) * Math.sqrt(m2) ** n;
    return court(`${un(SPIRALES)} ${un(["Calcule le module de $z_{@}$.", "Que vaut le module de $z_{@}$ ?", "À quelle distance de l'origine est le point d'affixe $z_{@}$ ?", "Trouve $\\left|z_{@}\\right|$."]).replace("@", String(n))}\n\n$z_{0} = ${zT(z0)}$\n\n$z_{k+1} = ${coefZ(a, "z_{k}")}$`, Math.round(v), ex9(`À chaque étape, le module est multiplié par $\\left|a\\right|$. Donc $\\left|z_{${n}}\\right| = \\left|a\\right|^{${n}} \\times \\left|z_{0}\\right|$.`, `On trouve $${Math.round(v)}$.`));
  }),
  tpl(M9, 13, 3, "L'image d'un cercle est un cercle : centre image, rayon multiplié par |a|.", () => {
    const [x, y] = un<[number, number]>([[3, 4], [0, 2], [0, 3], [2, 0], [6, 8]]);
    const a: Z = [x * signe() || 0, y * signe() || 0];
    const b = zTire(4);
    const w = zTire(4);
    const r = entre(2, 7);
    const k = Math.hypot(a[0], a[1]);
    const texte = `Un cercle a pour centre le point d'affixe $\\omega = ${zT(w)}$ et pour rayon $r = ${r}$. On lui applique cette similitude.`;
    const f = simT(a, b);
    if (Math.random() < 0.5) return court(`${texte} ${un(["Quel est le rayon du cercle image ?", "Que vaut le rayon de son image ?", "Calcule le rayon de l'image.", "Quel rayon le cercle image a-t-il ?"])}\n\n$${f}$`, k * r, ex9(`Le rapport vaut $${k}$.`, `Le rayon image vaut $${k * r}$.`));
    const j = zAdd(zMul(a, w), b);
    return courtZ(`${texte} ${un(["Quelle est l'affixe du centre du cercle image ?", "Où est le centre de l'image ? Donne son affixe.", "Calcule l'affixe du centre de l'image.", "Quel point est le centre du cercle image ?"])}\n\n$${f}$`, j, ex9("Le centre de l'image est l'image du centre.", `Il a pour affixe $${zT(j)}$.`));
  }),
];
