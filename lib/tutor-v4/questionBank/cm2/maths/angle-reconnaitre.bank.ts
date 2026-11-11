// RECONNAÎTRE UN ANGLE AU COURS MOYEN (05/11/2026). CM1 et CM2.
//
// La micro `angle_reconnaitre` tenait sur 15 squelettes en CM1 et 9 en CM2 : des phrases
// fixes, dont la réponse ne changeait jamais (« le sommet est le point O : vrai », toujours
// vrai). Ces gabarits les remplacent. Sommet et côtés se lisent sur la figure, les lettres
// changent, et la réponse avec.
//
// ⛔ Programme du cours moyen et décision de Frédéric : pas de rapporteur, aucun nombre de
// degrés, ni dans le texte ni sur la figure. On compare au coin d'une feuille et à l'équerre.
// ⛔ CM : QCM seulement. ★1-★2 : phrase courte, sans contexte. Contexte à partir de ★3.
// La Réunion n'apparaît que dans deux listes de ★3 (moins de 3 % de ces tirages).
// Le correcteur de chaque gabarit relit le texte ou la figure : correcteurs/angle-reconnaitre.ts.

import type { TutorBankItemV4, TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import type { CanvasFigure } from "@/lib/tutor-v4/types_canvas";
import { entre, exp, melange, qcm, qcmN, typo, un, v } from "./trous-outils";

type Niveau = "cm1" | "cm2";

const LETTRES = "ABCDEFGHJKLMNPRSTUVW".split("");
const OUVERTURES = [25, 35, 40, 50, 55, 65, 70, 105, 115, 125, 135, 145, 155];
const AIGUS = [25, 35, 45, 55, 65];
const OBTUS = [115, 125, 135, 145, 155];
const ROTATIONS = [0, 10, 20, 30, 340, 350];

const quatre = () => melange(LETTRES).slice(0, 4);

const figure = (deg: number, sommet: string, gauche: string, droite: string): CanvasFigure =>
  ({
    kind: "angle",
    angle: {
      angleDeg: deg,
      labels: { vertex: sommet, left: gauche, right: droite, angle: "" },
      display: { showLabels: true, showMeasure: false, showArc: true, showRightAngle: false },
    },
  }) as CanvasFigure;

const dessin = (degs: number[], noms: string[], longueurs?: number[]): CanvasFigure => ({
  kind: "deux_angles",
  mode: "cote_a_cote",
  angles: degs.map((deg, i) => ({ deg, nom: noms[i], rotation: un(ROTATIONS), longueur: longueurs?.[i] ?? entre(60, 95) })),
});

const DEF = "un angle a un sommet et deux côtés ; les côtés partent du sommet.";
const OUVERT = "la taille d'un angle dépend de son ouverture, pas de la longueur de ses côtés.";
const COIN = "on pose le coin d'une feuille sur l'angle et on compare les ouvertures.";
const expSommet = (s: string, a: string, b: string) => exp(DEF, "on cherche le point d'où partent les deux côtés.", `les côtés ${s}${a} et ${s}${b} partent tous les deux du point ${s}.`, `le sommet est le point ${s}.`);

/* ───────────────────────── ★1 : sommet, côtés, ce qu'est un angle ───────────────────────── */

/** Le sommet se lit sur la figure. */
const s1 = () => {
  const [s, a, b] = quatre();
  return qcm(
    `Le point ${s}`,
    [`Le point ${a}`, `Le point ${b}`],
    expSommet(s, a, b),
    v(["Quel point est le sommet de cet angle ?", "Où est le sommet de cet angle ?", "Cet angle a pour sommet :", "Trouve le sommet de cet angle.", "De quel point partent les deux côtés ?", "Quel point est commun aux deux côtés ?", "En quel point les deux côtés se rejoignent-ils ?", "Le sommet de cet angle est :"]),
    figure(un(OUVERTURES), s, a, b),
  );
};

/** Un point est nommé : sommet, ou bout d'un côté ? */
const s2 = () => {
  const [s, a, b] = quatre();
  const x = un([s, s, a, b]);
  const j = x === s ? "Le sommet de l'angle" : "Le bout d'un côté";
  return qcm(
    j,
    ["Le sommet de l'angle", "Le bout d'un côté", "Le centre d'un cercle"],
    exp(DEF, "on regarde si les deux côtés partent de ce point.", x === s ? `les deux côtés partent du point ${x}.` : `un seul côté arrive au point ${x} ; les deux côtés partent du point ${s}.`, `le point ${x} est : ${j.toLowerCase()}.`),
    v([`Sur cette figure, le point ${x} est :`, `Que représente le point ${x} ?`, `Regarde le point ${x}. C'est :`, `Le point ${x} de cette figure est :`, `À quoi correspond le point ${x} ?`, `Quel est le rôle du point ${x} ?`]),
    figure(un(OUVERTURES), s, a, b),
  );
};

/** Vrai ou faux, et la réponse dépend de la lettre tirée. */
const s3 = () => {
  const [s, a, b] = quatre();
  const x = un([s, s, a, b]);
  const j = x === s ? "Vrai" : "Faux";
  return qcm(
    j,
    ["Vrai", "Faux"],
    expSommet(s, a, b),
    v([`Le point ${x} est le sommet de cet angle. Vrai ou faux ?`, `Vrai ou faux : le sommet de cet angle est le point ${x}.`, `Les deux côtés partent du point ${x}. Vrai ou faux ?`, `Vrai ou faux : les deux côtés de cet angle partent du point ${x}.`, `Cet angle a pour sommet le point ${x}. Vrai ou faux ?`]),
    figure(un(OUVERTURES), s, a, b),
  );
};

/** Compter les angles ou les sommets d'un dessin. */
const s4 = () => {
  const k = entre(2, 4);
  const degs = Array.from({ length: k }, () => un(OUVERTURES));
  const quoi = un(["angles", "sommets"]);
  return qcmN(
    k,
    [k + 1, k - 1, 2 * k],
    exp(DEF, quoi === "angles" ? "on compte les ouvertures dessinées." : "chaque angle a un seul sommet : on compte les points d'où partent deux côtés.", `il y a ${k} ${quoi} sur le dessin.`, `la réponse est ${k}.`),
    quoi === "angles"
      ? v(["Combien d'angles vois-tu sur ce dessin ?", "Compte les angles de ce dessin.", "Ce dessin montre combien d'angles ?", "Combien y a-t-il d'angles ici ?"])
      : v(["Combien de sommets vois-tu sur ce dessin ?", "Compte les sommets de ce dessin.", "Ce dessin montre combien de sommets ?", "Combien y a-t-il de sommets en tout ?"]),
    dessin(degs, degs.map(() => "")),
  );
};

/** Ce qui forme un angle. */
const s5 = (niveau: Niveau) => () => {
  const trait = niveau === "cm1" ? "trait" : "demi-droite";
  const traits = niveau === "cm1" ? "traits" : "demi-droites";
  const seul1 = niveau === "cm1" ? "Un seul" : "Une seule";
  return qcm(
    `Deux ${traits} qui partent du même point`,
    [`${seul1} ${trait}`, `Deux ${traits} qui ne se touchent pas`, "Un cercle", "Un point seul", `Trois points sans ${trait}`],
    exp(DEF, "on cherche deux côtés et un point commun.", `deux ${traits} qui partent du même point donnent un sommet et deux côtés.`, `il faut deux ${traits} qui partent du même point.`),
    v(["Qu'est-ce qui forme un angle ?", "Laquelle de ces figures forme un angle ?", "Pour dessiner un angle, il faut :", "Que faut-il pour dessiner un angle ?", "Quel dessin donne un angle ?", "Parmi ces figures, laquelle est un angle ?", "Un angle, c'est :"]),
  );
};

/** Combien de côtés, combien de sommets. */
const s6 = () => {
  const cotes = Math.random() < 0.5;
  const r = cotes ? 2 : 1;
  return qcmN(
    r,
    [1, 2, 3, 4],
    exp(DEF, "on se rappelle les deux mots : sommet et côtés.", cotes ? "deux côtés partent du sommet." : "les deux côtés partent d'un seul point.", cotes ? "un angle a 2 côtés." : "un angle a 1 sommet."),
    cotes
      ? v(["Combien de côtés a un angle ?", "Un angle a combien de côtés ?", "Quel est le nombre de côtés d'un angle ?", "Combien de côtés faut-il pour faire un angle ?"])
      : v(["Combien de sommets a un angle ?", "Un angle a combien de sommets ?", "Quel est le nombre de sommets d'un angle ?", "Combien de sommets compte un seul angle ?"]),
  );
};

/* ───────────────────────── ★2 : nommer les côtés, comparer sans mesurer ───────────────────────── */

/** Un côté parmi des traits qui n'existent pas sur la figure. */
const m1 = () => {
  const [s, a, b, d] = quatre();
  const c = un([a, b]);
  return qcm(
    `${s}${c}`,
    [`${a}${b}`, `${a}${d}`, `${b}${d}`],
    exp(DEF, "un côté part du sommet : on cherche un trait qui part du point " + s + ".", `${s}${c} part du sommet ${s}.`, `${s}${c} est un côté de l'angle.`),
    v(["Lequel est un côté de cet angle ?", "Quel trait est un côté de cet angle ?", "Parmi ces traits, lequel est un côté ?", "Trouve un côté de cet angle.", "Lequel de ces traits forme cet angle ?"]),
    figure(un(OUVERTURES), s, a, b),
  );
};

/** Les deux côtés. */
const m2 = () => {
  const [s, a, b, d] = quatre();
  return qcm(
    `${s}${a} et ${s}${b}`,
    [`${a}${b} et ${s}${a}`, `${a}${b} et ${s}${b}`, `${s}${a} et ${s}${d}`],
    exp(DEF, `les deux côtés partent du sommet ${s}.`, `${s}${a} et ${s}${b} partent du point ${s}.`, `les côtés sont ${s}${a} et ${s}${b}.`),
    v(["Quels sont les côtés de cet angle ?", "Cet angle a pour côtés :", "Quels traits forment cet angle ?", "Trouve les deux côtés de cet angle.", "Les deux côtés de cet angle sont :"]),
    figure(un(OUVERTURES), s, a, b),
  );
};

/** Sans figure : le sommet est la lettre commune. */
const m3 = () => {
  const [s, a, b] = quatre();
  const nom = (x: string) => un([`${s}${x}`, `${x}${s}`]);
  const c1 = nom(a);
  const c2 = nom(b);
  return qcm(
    `Le point ${s}`,
    [`Le point ${a}`, `Le point ${b}`],
    exp(DEF, "le sommet est le point commun aux deux côtés.", `la lettre ${s} se trouve dans ${c1} et dans ${c2}.`, `le sommet est le point ${s}.`),
    `${v([`Les côtés ${c1} et ${c2} forment un angle.`, `Un angle a pour côtés ${c1} et ${c2}.`, `Voici deux côtés : ${c1} et ${c2}.`, `Sans figure : les côtés sont ${c1} et ${c2}.`])} ${v(["Quel est son sommet ?", "Où est le sommet ?", "Quel point est le sommet ?", "Quel point est commun aux deux côtés ?"])}`,
  );
};

/** Compter les côtés d'un dessin. */
const m4 = () => {
  const k = entre(2, 4);
  const degs = Array.from({ length: k }, () => un(OUVERTURES));
  const r = 2 * k;
  return qcmN(
    r,
    [k, r + 1, r - 1, r + 2],
    exp(DEF, "chaque angle a 2 côtés : on les compte tous.", `${k} angles de 2 côtés : ${k} × 2 = ${r}.`, `il y a ${r} côtés.`),
    v(["Combien de côtés vois-tu sur ce dessin ?", "Compte tous les côtés de ces angles.", "Ces angles ont combien de côtés en tout ?", "Combien y a-t-il de côtés sur ce dessin ?"]),
    dessin(degs, degs.map(() => "")),
  );
};

/** Le plus ouvert, sur des ouvertures bien séparées. */
const m5 = () => {
  const k = un([2, 3]);
  const noms = melange(["A", "B", "C", "D"]).slice(0, k).sort();
  const familles = melange([[25, 35], [60, 70], [105, 115], [140, 155]]).slice(0, k);
  const degs = familles.map((f) => un(f));
  const grand = Math.random() < 0.5;
  const cible = grand ? Math.max(...degs) : Math.min(...degs);
  const j = noms[degs.indexOf(cible)];
  return qcm(
    `L'angle ${j}`,
    // ⛔ 11/11/2026 — à deux angles, le QCM n'avait que deux lignes (une chance
    // sur deux au hasard). « Ils sont égaux » est toujours faux ici : les deux
    // ouvertures viennent de familles différentes.
    [...noms.filter((x) => x !== j).map((x) => `L'angle ${x}`), ...(k === 2 ? ["Ils sont égaux"] : [])],
    exp(OUVERT, "on regarde l'écart entre les deux côtés de chaque angle.", `l'angle ${j} est le ${grand ? "plus ouvert" : "moins ouvert"}.`, `la réponse est l'angle ${j}.`),
    `${v(["Sans mesurer.", "Regarde ces angles.", "Observe ces angles.", "Compare ces angles."])} ${grand ? v(["Lequel est le plus ouvert ?", "Lequel est le plus grand ?", "Quel angle est le plus ouvert ?", "Quel est le plus grand angle ?"]) : v(["Lequel est le moins ouvert ?", "Lequel est le plus petit ?", "Quel angle est le moins ouvert ?", "Quel est le plus petit angle ?"])}`,
    dessin(degs, noms),
  );
};

/** Le piège de la longueur : la figure et le texte disent la même chose. */
const m6 = () => {
  const [x, y] = melange(["A", "B", "C", "D"]).slice(0, 2).sort();
  const egaux = Math.random() < 0.4;
  const dx = un([40, 55, 70, 110, 130]);
  const dy = egaux ? dx : dx < 90 ? dx + 45 : dx - 45;
  const longX = Math.random() < 0.5;
  const plusOuvert = dx > dy ? x : y;
  const plusPetit = dx > dy ? y : x;
  // Les côtés les plus longs vont à l'angle le moins ouvert : c'est le piège.
  const longs = egaux ? (longX ? [100, 55] : [55, 100]) : plusPetit === x ? [100, 55] : [55, 100];
  const aLongs = longs[0] > longs[1] ? x : y;
  const j = egaux ? "Ils sont égaux" : `L'angle ${plusOuvert}`;
  const debut = egaux ? `Les angles ${x} et ${y} ont la même ouverture.` : `L'angle ${plusOuvert} est plus ouvert que l'angle ${plusPetit}.`;
  return qcm(
    j,
    [`L'angle ${x}`, `L'angle ${y}`, "Ils sont égaux"],
    exp(OUVERT, "on regarde l'écart entre les côtés, pas leur longueur.", egaux ? "les deux ouvertures sont les mêmes." : `l'angle ${plusOuvert} est le plus ouvert, même avec des côtés plus courts.`, `la réponse est : ${j.toLowerCase()}.`),
    `${debut} Les côtés de ${aLongs} sont plus longs. ${v(["Lequel est le plus grand ?", "Quel angle est le plus grand ?", "Quel est le plus grand angle ?"])}`,
    dessin([dx, dy], [x, y], longs),
  );
};

/** Vrai ou faux sur le vocabulaire. */
const VRAIES = [
  "Un angle a deux côtés.", "Un angle a un seul sommet.", "Les deux côtés d'un angle partent du même point.", "Le sommet est le point commun aux deux côtés.",
  "Un angle montre une ouverture.", "Allonger les côtés ne change pas l'angle.", "Deux angles peuvent être égaux avec des côtés de longueurs différentes.", "On peut comparer deux angles sans instrument de mesure.",
];
const FAUSSES = [
  "Un angle a trois côtés.", "Un angle a deux sommets.", "Un angle, c'est une longueur.", "Allonger les côtés agrandit l'angle.",
  "Le sommet est au milieu d'un côté.", "Deux traits qui ne se touchent pas forment un angle.", "Plus les côtés sont longs, plus l'angle est grand.", "Les côtés d'un angle partent de deux points différents.",
];
const m7 = () => {
  const vraie = Math.random() < 0.5;
  const p = un(vraie ? VRAIES : FAUSSES);
  return qcm(
    vraie ? "Vrai" : "Faux",
    ["Vrai", "Faux"],
    exp(DEF, "on relit la phrase avec les bons mots : sommet, côtés, ouverture. " + OUVERT.charAt(0).toUpperCase() + OUVERT.slice(1), `la phrase « ${p} » est ${vraie ? "vraie" : "fausse"}.`, `la réponse est ${vraie ? "vrai" : "faux"}.`),
    v([`Vrai ou faux : ${p}`, `Cette phrase est-elle vraie ? ${p}`, `Lis bien, vrai ou faux ? ${p}`]),
  );
};

/** On pose le coin d'une feuille : la figure ne code rien, c'est l'œil qui compare. */
const REPONSES_COIN = ["Il reste caché sous le coin", "Il colle au coin", "Il dépasse du coin"];
const m8 = () => {
  const deg = un([...AIGUS, 90, 90, ...OBTUS]);
  const j = deg < 90 ? REPONSES_COIN[0] : deg === 90 ? REPONSES_COIN[1] : REPONSES_COIN[2];
  return qcm(
    j,
    REPONSES_COIN,
    exp("le coin d'une feuille est un angle droit.", COIN, deg < 90 ? "l'angle est moins ouvert que le coin." : deg === 90 ? "l'angle a la même ouverture que le coin." : "l'angle est plus ouvert que le coin.", `${j.toLowerCase()}.`),
    `${v(["On pose le coin d'une feuille sur cet angle.", "Pose le coin d'une feuille sur cet angle.", "On place le coin d'une feuille sur l'angle.", "Imagine le coin d'une feuille posé sur cet angle."])} ${v(["Que voit-on ?", "Que se passe-t-il ?", "Que remarque-t-on ?", "Que fait l'angle ?"])}`,
    figure(deg, ...(quatre().slice(0, 3) as [string, string, string])),
  );
};

/* ───────────────────────── ★3 : des angles dans la vie ───────────────────────── */

type Objet = { n: string; s: string; c: string; fs: string[]; fc: string[] };
const OBJETS: Objet[] = [
  { n: "une paire de ciseaux ouverte", s: "le clou qui tient les lames", c: "les deux lames", fs: ["le bout d'une lame", "une poignée", "le milieu d'une lame"], fc: ["les deux poignées", "le clou et une poignée", "les deux pointes"] },
  { n: "un compas ouvert", s: "la charnière du haut", c: "les deux branches", fs: ["la pointe", "la mine", "le milieu d'une branche"], fc: ["la pointe et la mine", "la charnière et la mine", "la molette et la pointe"] },
  { n: "les aiguilles d'une horloge", s: "le centre du cadran", c: "les deux aiguilles", fs: ["le bout d'une aiguille", "le bord du cadran", "le chiffre du haut"], fc: ["le haut et le bas du cadran", "deux chiffres du cadran", "le bord et le centre du cadran"] },
  { n: "un éventail déplié", s: "le point où les brins se rejoignent", c: "les deux brins du bord", fs: ["le bout d'un brin", "le milieu du papier", "le bord du papier"], fc: ["le papier et la main", "les bouts de deux brins", "le bord du papier et la main"] },
  { n: "une porte entrouverte, vue de dessus", s: "la charnière", c: "la porte et le mur", fs: ["la poignée", "le bord de la porte", "le milieu du mur"], fc: ["la poignée et la serrure", "le sol et le plafond", "la poignée et la charnière"] },
  { n: "un livre entrouvert", s: "le dos du livre", c: "les deux couvertures", fs: ["le coin d'une page", "le titre", "le milieu d'une page"], fc: ["le titre et l'auteur", "deux lignes de texte", "le haut et le bas d'une page"] },
  { n: "deux routes qui partent d'un carrefour", s: "le carrefour", c: "les deux routes", fs: ["le bout d'une route", "un panneau", "le milieu d'une route"], fc: ["deux panneaux", "deux voitures", "le carrefour et un panneau"] },
  { n: "le coin d'une feuille", s: "la pointe du coin", c: "les deux bords du coin", fs: ["le centre de la feuille", "le milieu d'un bord", "le coin opposé"], fc: ["deux lignes du cahier", "le recto et le verso", "le haut et le bas de la feuille"] },
  { n: "une équerre posée sur la table", s: "le coin droit de l'équerre", c: "les deux bords du coin droit", fs: ["le milieu d'un bord", "le bout le plus fin", "le trou de l'équerre"], fc: ["les graduations", "le grand bord et le trou", "le dessus et le dessous"] },
  { n: "un toit à deux pentes", s: "le haut du toit", c: "les deux pentes", fs: ["la gouttière", "le bas d'une pente", "le mur"], fc: ["les deux murs", "la gouttière et le mur", "le sol et le mur"] },
  { n: "le toit d'une case créole", s: "le haut du toit", c: "les deux pentes", fs: ["la varangue", "le bas d'une pente", "le mur"], fc: ["les deux murs", "la varangue et le mur", "le sol et le mur"] },
  { n: "un bras plié", s: "le coude", c: "le bras et l'avant-bras", fs: ["la main", "l'épaule", "le poignet"], fc: ["la main et le poignet", "les doigts et la main", "l'épaule et le cou"] },
  { n: "une jambe pliée", s: "le genou", c: "la cuisse et le mollet", fs: ["le pied", "la hanche", "la cheville"], fc: ["le pied et la cheville", "les orteils et le pied", "la hanche et le dos"] },
  { n: "une pince à linge ouverte", s: "le ressort", c: "les deux branches", fs: ["le bout d'une branche", "le linge", "le fil"], fc: ["le fil et le linge", "le ressort et le fil", "le linge et le ressort"] },
  { n: "un ordinateur portable ouvert", s: "la charnière", c: "l'écran et le clavier", fs: ["une touche", "le coin de l'écran", "la souris"], fc: ["deux touches", "la souris et une touche", "le coin de l'écran et la souris"] },
];
const REGARDE = ["Regarde", "Pense à", "Imagine", "Observe"];

const c1 = () => {
  const o = un(OBJETS);
  return qcm(
    o.s,
    o.fs,
    exp(DEF, "le sommet est l'endroit d'où partent les deux côtés.", `ici, les côtés sont ${o.c}.`, `le sommet est ${o.s}.`),
    `${un(REGARDE)} ${o.n}. ${v(["Où est le sommet de l'angle ?", "Quel endroit joue le rôle du sommet ?", "Le sommet de l'angle, c'est :", "Qu'est-ce qui fait le sommet de l'angle ?"])}`,
  );
};
const c2 = () => {
  const o = un(OBJETS);
  return qcm(
    o.c,
    o.fc,
    exp(DEF, "les côtés sont les deux parties qui partent du sommet.", `ici, le sommet est ${o.s}.`, `les côtés sont ${o.c}.`),
    `${un(REGARDE)} ${o.n}. ${v(["Quels sont les côtés de l'angle ?", "Qu'est-ce qui joue le rôle des côtés ?", "Les côtés de l'angle, ce sont :", "Qu'est-ce qui fait les deux côtés de l'angle ?"])}`,
  );
};

/** Ouvert ou long : seul l'écart compte. */
type Outil = { nom: string; il: string; laquelle: string; ouvert: string; grand: string; parties: string; long: string; court: string };
const OUTILS: Outil[] = [
  { nom: "Le compas", il: "il", laquelle: "Lequel", ouvert: "ouvert", grand: "grand", parties: "branches", long: "longues", court: "courtes" },
  { nom: "L'éventail", il: "il", laquelle: "Lequel", ouvert: "ouvert", grand: "grand", parties: "brins", long: "longs", court: "courts" },
  { nom: "La pince", il: "elle", laquelle: "Laquelle", ouvert: "ouverte", grand: "grande", parties: "branches", long: "longues", court: "courtes" },
  { nom: "La paire de ciseaux", il: "elle", laquelle: "Laquelle", ouvert: "ouverte", grand: "grande", parties: "lames", long: "longues", court: "courtes" },
  { nom: "La tenaille", il: "elle", laquelle: "Laquelle", ouvert: "ouverte", grand: "grande", parties: "mâchoires", long: "longues", court: "courtes" },
  { nom: "Le casse-noix", il: "il", laquelle: "Lequel", ouvert: "ouvert", grand: "grand", parties: "bras", long: "longs", court: "courts" },
  { nom: "Le bras de robot", il: "il", laquelle: "Lequel", ouvert: "ouvert", grand: "grand", parties: "segments", long: "longs", court: "courts" },
];
const c3 = () => {
  const o = un(OUTILS);
  const [x, y] = melange(["A", "B"]);
  const xLong = Math.random() < 0.5;
  const xOuvert = Math.random() < 0.5;
  const phrase = (n: string, long: boolean, ouvert: boolean) =>
    `${o.nom} ${n} a de ${long ? o.long : o.court} ${o.parties} et ${o.il} est ${ouvert ? `${o.grand} ${o.ouvert}` : `à peine ${o.ouvert}`}.`;
  const grand = Math.random() < 0.5;
  const j = xOuvert === grand ? x : y;
  const de = melange([phrase(x, xLong, xOuvert), phrase(y, !xLong, !xOuvert)]);
  return qcm(
    `${o.nom} ${j}`,
    [`${o.nom} A`, `${o.nom} B`, "Les deux forment le même angle"],
    exp(OUVERT, "on ne regarde que l'écart, pas la longueur.", `${o.nom} ${xOuvert ? x : y} est le plus écarté.`.replace(/^L/, "l"), `la réponse est : ${`${o.nom} ${j}`.replace(/^L/, "l")}.`),
    `${de[0]} ${de[1]} ${o.laquelle} forme le plus ${grand ? "grand" : "petit"} angle ?`,
  );
};

/** Le coin d'une feuille entre les aiguilles, à l'heure pile. */
const REPONSES_HEURE = ["Il reste sous le coin", "Il colle au coin", "Il dépasse du coin"];
const c4 = () => {
  const h = un([1, 2, 3, 3, 4, 5, 7, 8, 9, 9, 10, 11]);
  const cases = Math.min(h, 12 - h);
  const j = cases < 3 ? REPONSES_HEURE[0] : cases === 3 ? REPONSES_HEURE[1] : REPONSES_HEURE[2];
  return qcm(
    j,
    REPONSES_HEURE,
    exp("à 3 h et à 9 h pile, les aiguilles forment un angle droit, comme le coin d'une feuille.", "on compte les cases d'une heure entre les aiguilles et on compare à 3.", `à ${h} h, il y a ${cases} ${cases > 1 ? "cases" : "case"} d'une heure entre les aiguilles.`, `${j.toLowerCase()}.`),
    `${v([`Il est ${h} h pile.`, `L'horloge indique ${h} h pile.`, `La pendule du salon marque ${h} h pile.`, `Le réveil affiche ${h} h pile, avec des aiguilles.`])} ${v(["On compare l'angle des aiguilles au coin d'une feuille.", "On pose le coin d'une feuille sur l'angle des aiguilles.", "On glisse le coin d'une feuille entre les aiguilles."])} ${v(["Que fait l'angle ?", "Que voit-on pour l'angle ?", "Que remarque-t-on pour l'angle ?"])}`,
  );
};

/** L'équerre d'un métier. */
const METIERS = ["Une menuisière", "Un maçon", "Une architecte", "Un carreleur", "Une couturière", "Un charpentier", "Une ingénieure", "Un peintre", "Une dessinatrice", "Un électricien", "Une tapissière", "Un plombier"];
const POSES = ["le coin d'une étagère", "l'angle d'une poutre", "le coin d'une dalle", "le coin d'un tissu", "l'angle d'un cadre", "le coin d'un meuble", "l'angle d'un plan", "la pointe d'une tôle", "le coin d'une table", "l'angle d'une planche", "le coin d'une pièce de robot", "le coin d'une fenêtre de case créole"];
const ETATS_EQUERRE = [
  { p: ["Le coin de l'équerre dépasse : l'angle reste caché dessous.", "L'angle reste caché sous le coin de l'équerre."], t: "aigu" },
  { p: ["Les deux côtés collent exactement à l'équerre.", "L'angle a la même ouverture que le coin de l'équerre."], t: "droit" },
  { p: ["L'angle dépasse du coin de l'équerre.", "Un côté de l'angle sort du coin de l'équerre."], t: "obtus" },
];
const c5 = () => {
  const e = un(ETATS_EQUERRE);
  return qcm(
    e.t,
    ["aigu", "droit", "obtus"],
    exp("une équerre a un angle droit ; un angle aigu est plus petit, un angle obtus est plus grand.", "on pose le coin de l'équerre sur l'angle et on compare.", e.t === "aigu" ? "l'angle est moins ouvert que l'équerre." : e.t === "droit" ? "l'angle a la même ouverture que l'équerre." : "l'angle est plus ouvert que l'équerre.", `l'angle est ${e.t}.`),
    `${un(METIERS)} pose une équerre sur ${un(POSES)}. ${un(e.p)} ${v(["Cet angle est :", "De quel type est cet angle ?", "Quel mot convient pour cet angle ?"])}`,
  );
};

/** Un angle vu dans la vie, et dessiné. */
const SCENES = [
  "Deux routes partent d'un même carrefour", "Deux rails se séparent à un aiguillage", "Deux câbles partent du haut d'un pylône", "Deux branches partent d'un même tronc",
  "Deux rayons de lumière partent d'une lampe", "Deux pales d'une éolienne partent de son axe", "Deux baguettes d'un éventail partent du même rivet", "Deux pistes de ski partent de la même crête",
  "Deux rayons d'un vélo partent du moyeu", "Deux fils partent d'un même clou", "Deux mâts se croisent en haut d'une tente", "Deux traits de craie partent d'un même point du terrain",
  "Une charnière tient un volet et son cadre", "Un store s'ouvre sur son axe", "Une rampe de skate part du sol", "Une échelle s'appuie sur un mur",
];
const c6 = () => {
  const deg = un([...AIGUS, 90, ...OBTUS]);
  const t = deg < 90 ? "aigu" : deg === 90 ? "droit" : "obtus";
  const [s, a, b] = quatre();
  return qcm(
    t,
    ["aigu", "droit", "obtus"],
    exp("un angle aigu est plus petit qu'un angle droit ; un angle obtus est plus grand.", COIN, t === "aigu" ? "l'angle reste caché sous le coin." : t === "droit" ? "l'angle colle au coin." : "l'angle dépasse du coin.", `l'angle est ${t}.`),
    `${un(SCENES)}. ${v(["Voici l'angle formé.", "Le dessin montre l'angle formé.", "On a dessiné l'angle formé."])} ${v(["De quel type est-il ?", "Il est :", "Compare au coin d'une feuille : il est :", "Quel mot convient ?"])}`,
    figure(deg, s, a, b),
  );
};

/** Le lieu de départ est le sommet : il se lit sur le plan. */
const PLANS = [
  { d: "Deux routes partent d'un carrefour vers les villages", l: "le carrefour" },
  { d: "Deux câbles partent d'un pylône vers les poteaux", l: "le pylône" },
  { d: "Deux ficelles partent d'un piquet vers les arbres", l: "le piquet" },
  { d: "Deux rayons de lumière partent d'une lampe vers les miroirs", l: "la lampe" },
  { d: "Deux sentiers partent d'un refuge de Mafate vers les cabanes", l: "le refuge" },
  { d: "Deux bateaux partent d'un port vers les îles", l: "le port" },
  { d: "Deux avions partent d'un aéroport vers les villes", l: "l'aéroport" },
  { d: "Deux lignes de bus partent d'une gare vers les quartiers", l: "la gare" },
  { d: "Deux drones partent d'une base vers les balises", l: "la base" },
  { d: "Deux tuyaux partent d'un château d'eau vers les fermes", l: "le château d'eau" },
  { d: "Deux pistes cyclables partent d'une place vers les écoles", l: "la place" },
  { d: "Deux tunnels partent d'une gare de métro vers les stations", l: "la gare de métro" },
];
const c7 = () => {
  const p = un(PLANS);
  const [s, a, b] = quatre();
  return qcm(
    `Le point ${s}`,
    [`Le point ${a}`, `Le point ${b}`],
    exp(DEF, "les deux côtés partent du lieu de départ : c'est le sommet.", `sur le plan, les deux côtés partent du point ${s}.`, `${p.l} est au point ${s}.`),
    `${p.d} ${a} et ${b}. ${v([`Sur le plan, quel point est ${p.l} ?`, `Où se trouve ${p.l} sur ce plan ?`, `Quel point du plan représente ${p.l} ?`])}`,
    figure(un(OUVERTURES), s, a, b),
  );
};

/* ───────────────────────── Le plan ───────────────────────── */

type Gabarit = { cle: string; d: number; hint: string; gen: (n: Niveau) => () => TutorGeneratedQuestionV4 };
const seul = (f: () => TutorGeneratedQuestionV4) => () => f;
const H_SOMMET = "Le sommet est le point d'où partent les deux côtés.";
const H_COTES = "Un côté part toujours du sommet.";
const H_OUVERT = "Regarde l'écart entre les côtés, pas leur longueur.";
const H_COIN = "Pense au coin d'une feuille.";

export const PLAN_ANGLE_RECONNAITRE: Gabarit[] = [
  { cle: "s1", d: 1, hint: H_SOMMET, gen: seul(s1) },
  { cle: "s2", d: 1, hint: H_SOMMET, gen: seul(s2) },
  { cle: "s3", d: 1, hint: H_SOMMET, gen: seul(s3) },
  { cle: "s4", d: 1, hint: "Chaque angle a un seul sommet.", gen: seul(s4) },
  { cle: "s5", d: 1, hint: "Il faut deux côtés et un point commun.", gen: s5 },
  { cle: "s6", d: 1, hint: "Un sommet, et des côtés qui en partent.", gen: seul(s6) },

  { cle: "m1", d: 2, hint: H_COTES, gen: seul(m1) },
  { cle: "m2", d: 2, hint: H_COTES, gen: seul(m2) },
  { cle: "m3", d: 2, hint: "Cherche la lettre présente dans les deux côtés.", gen: seul(m3) },
  { cle: "m4", d: 2, hint: "Chaque angle a 2 côtés.", gen: seul(m4) },
  { cle: "m5", d: 2, hint: H_OUVERT, gen: seul(m5) },
  { cle: "m6", d: 2, hint: H_OUVERT, gen: seul(m6) },
  { cle: "m7", d: 2, hint: "Un angle, c'est une ouverture, avec un sommet et deux côtés.", gen: seul(m7) },
  { cle: "m8", d: 2, hint: H_COIN, gen: seul(m8) },

  { cle: "c1", d: 3, hint: H_SOMMET, gen: seul(c1) },
  { cle: "c2", d: 3, hint: "Les côtés sont les deux parties qui s'écartent.", gen: seul(c2) },
  { cle: "c3", d: 3, hint: H_OUVERT, gen: seul(c3) },
  { cle: "c4", d: 3, hint: "À 3 h pile, l'angle des aiguilles est droit.", gen: seul(c4) },
  { cle: "c5", d: 3, hint: "Le coin de l'équerre est un angle droit.", gen: seul(c5) },
  { cle: "c6", d: 3, hint: H_COIN, gen: seul(c6) },
  { cle: "c7", d: 3, hint: H_SOMMET, gen: seul(c7) },
];

export const idAngleReconnaitre = (niveau: Niveau, g: { cle: string }) => `${niveau}_angle_reconnaitre_gab_${g.cle}`;

/** Vu à 375 px : « Vrai ou faux » et son « ? » se séparaient d'une ligne. Pareil pour « 5 h ». */
const insecables = (t: string) => t.replace(/ ([?:;!])/g, " $1").replace(/(\d) h\b/g, "$1 h");

export function anglesReconnaitre(niveau: Niveau): TutorBankItemV4[] {
  return PLAN_ANGLE_RECONNAITRE.map(
    (g) =>
      ({
        kind: "template",
        id: idAngleReconnaitre(niveau, g),
        niveau,
        matiere: "maths",
        notionId: "angle",
        microId: "angle_reconnaitre",
        difficulty: g.d,
        theme: "neutral",
        hint: typo(g.hint),
        tags: ["angle", "reconnaitre", "template"],
        generate: () => {
          const q = g.gen(niveau)();
          return { ...q, text: insecables(q.text) };
        },
      }) as TutorBankItemV4,
  );
}
