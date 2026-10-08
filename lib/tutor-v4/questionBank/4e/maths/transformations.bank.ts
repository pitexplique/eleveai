// lib/tutor-v4/question-banks/maths/4e/transformations.bank.ts

import type {
  TutorBankItemV4,
  TutorGeneratedQuestionV4,
  TransformationCanvasData,
} from "@/lib/tutor-v4/types";

// Les propositions d'un gabarit sont écrites à la main, et deux d'entre elles
// finissent par coïncider dès qu'un paramètre tombe sur une valeur particulière
// (a = b, un coefficient nul, une fraction qui se simplifie…). L'élève voyait
// alors deux fois la même ligne. On met la bonne réponse de côté, on tire trois
// pièges réellement distincts, puis on mélange l'ensemble.
function makeChoices(correct: string, wrongs: readonly string[]) {
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct),
  ).slice(0, 3);
  return shuffle([correct, ...distracteurs]);
}


function randomChoice<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * ⭐ LES FIGURES DES SYMÉTRIES, ajoutées le 30/08/2026.
 *
 * ⛔ Elles réparent un défaut qui dépassait le compteur de renouvellement :
 * cinq gabarits sur six posaient LA MÊME question sur LA MÊME figure, et
 * attendaient TOUJOURS « oui ». Un élève qui répondait « oui » sans regarder le
 * dessin avait tout juste. La question ne mesurait rien.
 *
 * ⚠️ Les formes sont ASYMÉTRIQUES exprès. Une figure qui a déjà un axe de
 * symétrie ne permet pas de distinguer un demi-tour d'un miroir : les deux
 * donnent le même dessin, et le piège devient injuste.
 *
 * Les champs de langue évitent les « le/la » faux dans l'énoncé généré.
 */
// ⚠️ 03/10/2026 : le fanion, la flèche et la voile d'origine avaient, eux, un
// axe de symétrie (deux triangles isocèles et une voile symétrique). Les neuf
// formes ci-dessous n'en ont AUCUN : côtés tous différents, vérifiés un à un.
type Pt = { x: number; y: number };
type FigureSym = { nom: string; fem: boolean; voyelle?: boolean; points: Pt[] };

const FIGURES_SYM: FigureSym[] = [
  { nom: "triangle", fem: false, points: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 2 }] },
  { nom: "drapeau", fem: false, points: [{ x: 0, y: 0 }, { x: 0, y: 2 }, { x: 1, y: 2 }] },
  { nom: "équerre", fem: true, voyelle: true, points: [{ x: 0, y: 0 }, { x: 2, y: 0 }, { x: 0, y: 1 }] },
  { nom: "fanion", fem: false, points: [{ x: 0, y: 0 }, { x: 0, y: 3 }, { x: 2, y: 1 }] },
  { nom: "flèche", fem: true, points: [{ x: 0, y: 1 }, { x: 2, y: 0 }, { x: 2, y: 3 }] },
  { nom: "voile", fem: true, points: [{ x: 0, y: 0 }, { x: 0, y: 3 }, { x: 2, y: 3 }] },
  { nom: "trapèze", fem: false, points: [{ x: 0, y: 0 }, { x: 3, y: 0 }, { x: 2, y: 2 }, { x: 0, y: 2 }] },
  { nom: "lettre L", fem: true, points: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 2 }, { x: 2, y: 2 }, { x: 2, y: 3 }, { x: 0, y: 3 }] },
  { nom: "quadrilatère", fem: false, points: [{ x: 0, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 2 }, { x: 0, y: 1 }] },
];

function transformationCanvas(
  data: Omit<TransformationCanvasData, "kind">
): TransformationCanvasData {
  return { kind: "transformation", ...data };
}

/* ---------------------------------------------------------------------------
   ⛔⛔ 03/10/2026 — « DES QUESTIONS REVIENNENT SOUVENT ». Mesuré ce jour-là :
   10 à 67 squelettes d'énoncé par micro, 7 à 18 répétitions sur une série de
   20. Chaque gabarit compose désormais une SITUATION (décor ou objet réel :
   frise, carrelage, logo, motif de tissu, roue de vélo, montre, éolienne…) ×
   une TOURNURE × une FIGURE et des NOMS de points variés. Mesure :
   scripts/mesurer-squelettes-coach.ts 4e sym_transformation.
--------------------------------------------------------------------------- */

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
/** « le miroir » → « du miroir », « la ligne » → « de la ligne », « l'axe » → « de l'axe ». */
function de(gn: string): string {
  if (gn.startsWith("le ")) return "du " + gn.slice(3);
  if (gn.startsWith("les ")) return "des " + gn.slice(4);
  return "de " + gn;
}
/** « le triangle » → « au triangle », « la flèche » → « à la flèche ». */
function aa(gn: string): string {
  if (gn.startsWith("le ")) return "au " + gn.slice(3);
  if (gn.startsWith("les ")) return "aux " + gn.slice(4);
  return "à " + gn;
}
/** « 1 carreau », « 3 carreaux » ; « 2 unités ». */
function nb(n: number, mot: string, pluriel = mot + "s"): string {
  return `${n} ${Math.abs(n) > 1 ? pluriel : mot}`;
}

const leF = (f: FigureSym) => (f.voyelle ? `l'${f.nom}` : `${f.fem ? "la" : "le"} ${f.nom}`);
const duF = (f: FigureSym) => de(leF(f));
const auF = (f: FigureSym) => aa(leF(f));
const ilF = (f: FigureSym) => (f.fem ? "elle" : "il");
const bleuF = (f: FigureSym) => (f.fem ? "bleue" : "bleu");
const largeur = (pts: Pt[]) => Math.max(...pts.map((p) => p.x));
const hauteur = (pts: Pt[]) => Math.max(...pts.map((p) => p.y));

const LETTRES = ["A", "B", "C", "D", "E", "G", "H", "K", "L", "M", "N", "P", "R", "S", "T", "U"];
const CENTRES = ["O", "I", "J", "K", "S"];
const AXES = ["(d)", "(Δ)", "(D)", "(L)"];

/** Les décors d'une figure tracée sur quadrillage (la phrase d'ouverture). */
const DECORS = [
  "",
  "Une graphiste prépare un logo sur papier quadrillé. ",
  "Pour une frise, Malo reproduit un motif. ",
  "Sur un carreau de faïence, deux motifs sont peints. ",
  "Sur un motif de tissu, deux formes sont imprimées. ",
  "Dans un jeu vidéo, deux formes s'affichent sur une grille. ",
  "Pour un vitrail, un artisan trace deux pièces de verre. ",
  "Sur une appli de dessin, on transforme une forme. ",
  "Un carreleur dessine le plan d'une mosaïque. ",
  "Sur une affiche, un dessinateur reproduit un pictogramme. ",
  "Une brodeuse prépare le motif d'un coussin. ",
  "Pour un pochoir, on découpe deux formes dans du carton. ",
  "Sur le plan d'un jardin, deux massifs de fleurs sont dessinés. ",
  "Dans son cahier, Inès a tracé deux figures. ",
  "Sur un tapis, deux motifs sont tissés. ",
];

const PRENOMS = [
  { p: "Maëva", il: "elle" }, { p: "Ryan", il: "il" }, { p: "Anaïs", il: "elle" },
  { p: "Loïc", il: "il" }, { p: "Chloé", il: "elle" }, { p: "Théo", il: "il" },
  { p: "Naïla", il: "elle" }, { p: "Kevin", il: "il" }, { p: "Inès", il: "elle" },
  { p: "Malo", il: "il" }, { p: "Yasmine", il: "elle" }, { p: "Hugo", il: "il" },
  { p: "Lina", il: "elle" }, { p: "Nathan", il: "il" },
];

/** Demi-tour de centre c. */
const demiTour = (p: Pt, c: Pt): Pt => ({ x: 2 * c.x - p.x, y: 2 * c.y - p.y });
/** Quart de tour de centre c dans le sens des aiguilles d'une montre À L'ÉCRAN (y vers le bas). */
const quartHoraire = (p: Pt, c: Pt): Pt => ({ x: c.x - (p.y - c.y), y: c.y + (p.x - c.x) });
/** Quart de tour de centre c dans le sens inverse des aiguilles d'une montre. */
const quartAntiHoraire = (p: Pt, c: Pt): Pt => ({ x: c.x + (p.y - c.y), y: c.y - (p.x - c.x) });
/** La figure posée en haut à gauche du centre, sans le toucher. */
const autourDe = (f: FigureSym, c: Pt): Pt[] =>
  f.points.map((p) => ({ x: c.x - 1 - largeur(f.points) + p.x, y: c.y - 1 - hauteur(f.points) + p.y }));

/** Recale tous les groupes de points dans la grille (marge d'un carreau). */
function cadrer(groupes: Pt[][]) {
  const tous = groupes.flat();
  const minX = Math.min(...tous.map((p) => p.x));
  const minY = Math.min(...tous.map((p) => p.y));
  const g = groupes.map((gr) => gr.map((p) => ({ x: p.x - minX + 1, y: p.y - minY + 1 })));
  const plat = g.flat();
  return {
    g,
    cols: Math.max(...plat.map((p) => p.x)) + 1,
    rows: Math.max(...plat.map((p) => p.y)) + 1,
  };
}

/** Coordonnées écrites comme dans le reste du fichier : (3;5). */
const co = (x: number, y: number) => `(${String(x).replace("-", "−")};${String(y).replace("-", "−")})`;

/** Une transformation de 4e, nommée de plusieurs façons. `court` est le nom générique. */
function tirerTransfo(): { nom: string; court: string } {
  const O = randomChoice(CENTRES);
  const axe = randomChoice(AXES);
  return randomChoice([
    { nom: "une translation", court: "une translation" },
    { nom: `une translation de ${randomInt(2, 9)} cm vers la ${randomChoice(["droite", "gauche"])}`, court: "une translation" },
    { nom: `une rotation de centre ${O} et d'angle ${randomChoice([30, 45, 60, 90, 120, 150])}°`, court: "une rotation" },
    { nom: "une rotation", court: "une rotation" },
    { nom: `la symétrie de centre ${O}`, court: "une symétrie centrale" },
    { nom: "une symétrie centrale", court: "une symétrie centrale" },
    { nom: `la symétrie d'axe ${axe}`, court: "une symétrie axiale" },
    { nom: "une symétrie axiale", court: "une symétrie axiale" },
  ]);
}

/** Des longueurs réelles ou dessinées, et leurs unités. */
const LONGUEURS_OBJETS: {
  s: (l: number, P: string, Q: string) => string;
  u: string;
  uMot: string;
  min: number;
  max: number;
}[] = [
  { s: (l) => `Le côté d'un carreau de faïence carré mesure ${l} cm.`, u: "cm", uMot: "centimètres", min: 10, max: 30 },
  { s: (l, P, Q) => `Sur un logo, le segment [${P}${Q}] mesure ${l} cm.`, u: "cm", uMot: "centimètres", min: 2, max: 12 },
  { s: (l) => `Sur le plan d'un parc éolien, une pale d'éolienne est dessinée par un segment de ${l} mm.`, u: "mm", uMot: "millimètres", min: 15, max: 60 },
  { s: (l) => `Sur un motif de tissu, une rayure mesure ${l} cm.`, u: "cm", uMot: "centimètres", min: 3, max: 20 },
  { s: (l) => `Sur le dessin d'un voilier, le mât mesure ${l} cm.`, u: "cm", uMot: "centimètres", min: 5, max: 15 },
  { s: (l) => `Sur une frise, chaque motif a une largeur de ${l} cm.`, u: "cm", uMot: "centimètres", min: 3, max: 12 },
  { s: (l) => `Dans un jeu vidéo, un vaisseau mesure ${l} pixels de long.`, u: "pixels", uMot: "pixels", min: 20, max: 90 },
  { s: (l) => `Sur un vitrail, le bord d'une pièce de verre mesure ${l} cm.`, u: "cm", uMot: "centimètres", min: 5, max: 25 },
  { s: (l) => `Sur le plan d'un jardin, une allée est représentée par un segment de ${l} cm.`, u: "cm", uMot: "centimètres", min: 4, max: 15 },
  { s: (l) => `Sur un panneau de signalisation dessiné, un côté du triangle mesure ${l} mm.`, u: "mm", uMot: "millimètres", min: 30, max: 90 },
  { s: (l) => `Sur le cadran d'une montre dessinée, la grande aiguille mesure ${l} mm.`, u: "mm", uMot: "millimètres", min: 10, max: 40 },
  { s: (l) => `Une pièce de puzzle dessinée mesure ${l} mm de large.`, u: "mm", uMot: "millimètres", min: 15, max: 40 },
  { s: (l, P, Q) => `Sur un pochoir, le trait [${P}${Q}] mesure ${l} cm.`, u: "cm", uMot: "centimètres", min: 3, max: 18 },
  { s: (l, P, Q) => `Le segment [${P}${Q}] mesure ${l} cm.`, u: "cm", uMot: "centimètres", min: 2, max: 15 },
  { s: (l) => `Sur le plan d'une roue de vélo, un rayon est représenté par un segment de ${l} mm.`, u: "mm", uMot: "millimètres", min: 20, max: 45 },
];

/** Des angles réels ou dessinés. */
const ANGLES_OBJETS: { s: (a: number, A: string, B: string, C: string) => string; vals: number[] }[] = [
  { s: (a, A, B, C) => `Dans un triangle ${A}${B}${C}, l'angle ${A}${B}${C} mesure ${a}°.`, vals: [35, 40, 50, 65, 70, 80, 110] },
  { s: (a) => `Sur le dessin d'une maison, l'angle au sommet du toit mesure ${a}°.`, vals: [80, 90, 100, 110, 120] },
  { s: (a) => `Sur un logo, un angle mesure ${a}°.`, vals: [30, 45, 60, 75, 135] },
  { s: (a) => `Sur une roue de vélo dessinée, l'angle entre deux rayons voisins mesure ${a}°.`, vals: [10, 12, 15, 20] },
  { s: (a) => `Sur le dessin d'une voile de bateau, l'angle du haut mesure ${a}°.`, vals: [25, 30, 35, 40] },
  { s: (a) => `Une équerre dessinée a un angle aigu de ${a}°.`, vals: [30, 45, 60] },
  { s: (a) => `Sur un cadran de montre dessiné, les deux aiguilles forment un angle de ${a}°.`, vals: [30, 60, 90, 120, 150] },
  { s: (a) => `Un carreau de faïence en forme de losange a un angle de ${a}°.`, vals: [45, 60, 72, 108, 120] },
  { s: (a) => `Une part de pizza dessinée a un angle de ${a}°.`, vals: [30, 36, 40, 45, 60] },
  { s: (a) => `Sur le dessin d'une éolienne, deux pales forment un angle de ${a}°.`, vals: [90, 120] },
  { s: (a) => `Sur un motif de tissu, une pointe de flèche a un angle de ${a}°.`, vals: [40, 50, 55, 70] },
  { s: (a, A, B, C) => `Sur un vitrail, la pièce ${A}${B}${C} a un angle en ${B} de ${a}°.`, vals: [55, 65, 85, 95, 115] },
  { s: (a) => `Sur le plan d'un jardin, deux allées se croisent en formant un angle de ${a}°.`, vals: [60, 75, 105, 120] },
  { s: (a) => `Un compas dessiné est ouvert d'un angle de ${a}°.`, vals: [20, 25, 30, 35] },
];

/** Des périmètres de formes. */
const PERIMETRES_OBJETS: { s: (p: number) => string; u: string; uMot: string; min: number; max: number }[] = [
  { s: (p) => `Un carreau de faïence a un périmètre de ${p} cm.`, u: "cm", uMot: "centimètres", min: 40, max: 120 },
  { s: (p) => `Un logo en forme de triangle a un périmètre de ${p} cm.`, u: "cm", uMot: "centimètres", min: 9, max: 30 },
  { s: (p) => `Sur le plan d'un jardin, un massif de fleurs a un périmètre de ${p} cm.`, u: "cm", uMot: "centimètres", min: 12, max: 40 },
  { s: (p) => `Un tapis dessiné sur un plan a un périmètre de ${p} cm.`, u: "cm", uMot: "centimètres", min: 10, max: 30 },
  { s: (p) => `Un timbre a un périmètre de ${p} mm.`, u: "mm", uMot: "millimètres", min: 80, max: 140 },
  { s: (p) => `La voile d'un bateau dessiné a un périmètre de ${p} cm.`, u: "cm", uMot: "centimètres", min: 12, max: 35 },
  { s: (p) => `Un panneau de signalisation dessiné a un périmètre de ${p} mm.`, u: "mm", uMot: "millimètres", min: 90, max: 270 },
  { s: (p) => `Sur un motif de tissu, une forme a un périmètre de ${p} cm.`, u: "cm", uMot: "centimètres", min: 8, max: 30 },
  { s: (p) => `Une pièce de puzzle dessinée a un périmètre de ${p} mm.`, u: "mm", uMot: "millimètres", min: 60, max: 150 },
  { s: (p) => `Sur un vitrail, une pièce de verre a un périmètre de ${p} cm.`, u: "cm", uMot: "centimètres", min: 20, max: 80 },
  { s: (p) => `Une figure tracée sur papier quadrillé a un périmètre de ${p} cm.`, u: "cm", uMot: "centimètres", min: 10, max: 32 },
  { s: (p) => `Dans un jeu vidéo, un bouclier a un périmètre de ${p} pixels.`, u: "pixels", uMot: "pixels", min: 60, max: 200 },
  { s: (p) => `Une étiquette autocollante a un périmètre de ${p} mm.`, u: "mm", uMot: "millimètres", min: 50, max: 160 },
];

/** Reflets et miroirs : une droite qui joue le rôle d'axe. */
const REFLETS: ((P: string, axe: string) => {
  s: (d: number) => string;
  x: string;
  img: string;
  ligne: string;
  u: "m" | "cm" | "mm";
  min: number;
  max: number;
})[] = [
  () => ({ s: (d) => `Au bord d'un lac calme, la cime d'un arbre est à ${d} m au-dessus de la surface de l'eau, qui agit comme un miroir.`, x: "la cime de l'arbre", img: "son reflet dans l'eau", ligne: "la surface de l'eau", u: "m", min: 4, max: 15 }),
  () => ({ s: (d) => `Dans une salle de danse, Léo se tient debout à ${d} m du grand miroir mural.`, x: "Léo", img: "son reflet", ligne: "le miroir", u: "m", min: 1, max: 6 }),
  () => ({ s: (d) => `On dépose une goutte d'encre à ${d} cm du pli d'une feuille, puis on replie la feuille : une tache symétrique apparaît.`, x: "la goutte d'encre", img: "la tache symétrique", ligne: "le pli", u: "cm", min: 2, max: 9 }),
  () => ({ s: (d) => `Sur l'aile gauche d'un papillon, une tache est à ${d} mm de l'axe du corps, qui est un axe de symétrie.`, x: "cette tache", img: "la tache de l'aile droite", ligne: "l'axe du corps", u: "mm", min: 5, max: 25 }),
  () => ({ s: (d) => `Sur un terrain de football, un joueur se place à ${d} m de la ligne médiane ; son coéquipier se place à la position symétrique par rapport à cette ligne.`, x: "le joueur", img: "son coéquipier", ligne: "la ligne médiane", u: "m", min: 5, max: 40 }),
  () => ({ s: (d) => `La façade d'un château est symétrique par rapport à son axe central. Une fenêtre est à ${d} m de cet axe.`, x: "cette fenêtre", img: "la fenêtre symétrique", ligne: "l'axe central", u: "m", min: 3, max: 20 }),
  () => ({ s: (d) => `Dans un jardin à la française, l'allée centrale est un axe de symétrie. Une statue est à ${d} m de l'allée.`, x: "la statue", img: "la statue symétrique", ligne: "l'allée centrale", u: "m", min: 4, max: 30 }),
  (P, axe) => ({ s: (d) => `Sur un logo, le point ${P} est à ${d} cm de l'axe de symétrie ${axe}.`, x: P, img: `son image ${P}'`, ligne: `l'axe ${axe}`, u: "cm", min: 2, max: 9 }),
  () => ({ s: (d) => `Un motif de tissu est symétrique par rapport à la couture centrale. Un bouton brodé est à ${d} cm de cette couture.`, x: "le bouton brodé", img: "le bouton symétrique", ligne: "la couture centrale", u: "cm", min: 2, max: 12 }),
  () => ({ s: (d) => `Sur un carreau de faïence, une fleur est peinte à ${d} cm de la diagonale, qui est un axe de symétrie du motif.`, x: "la fleur", img: "la fleur symétrique", ligne: "la diagonale", u: "cm", min: 2, max: 8 }),
  () => ({ s: (d) => `Sur une tablette, une appli de dessin en mode miroir recopie chaque trait de l'autre côté d'un axe vertical. Un point du dessin est à ${d} cm de cet axe.`, x: "ce point", img: "le point recopié", ligne: "l'axe", u: "cm", min: 1, max: 9 }),
  () => ({ s: (d) => `Un vitrail est symétrique par rapport à un axe vertical. Un losange rouge est à ${d} cm de l'axe.`, x: "ce losange", img: "le losange symétrique", ligne: "l'axe", u: "cm", min: 10, max: 40 }),
  () => ({ s: (d) => `Au-dessus d'une piscine à l'eau parfaitement calme, un plongeoir est à ${d} m de la surface.`, x: "le plongeoir", img: "son reflet", ligne: "la surface de l'eau", u: "m", min: 1, max: 5 }),
  () => ({ s: (d) => `Au bord d'un bassin de la rivière Langevin, à La Réunion, le sommet d'un rocher dépasse de ${d} m au-dessus de l'eau calme.`, x: "le sommet du rocher", img: "son reflet", ligne: "la surface de l'eau", u: "m", min: 1, max: 4 }),
  () => ({ s: (d) => `Sur un court de tennis, le filet partage le terrain en deux moitiés symétriques. Une joueuse est à ${d} m du filet ; son adversaire se tient à la place symétrique.`, x: "la joueuse", img: "son adversaire", ligne: "le filet", u: "m", min: 2, max: 11 }),
];

/** Objets qui ont un centre de symétrie, avec un point P, son image P' et le centre O. */
const CENTRALE_MESURES: { s: (P: string, O: string, d: number) => string; u: string; min: number; max: number }[] = [
  { s: (P, O, d) => `Sur une roue de vélo de centre ${O}, la valve ${P} est à ${d} cm de ${O}. Le catadioptre ${P}' est fixé à l'opposé : c'est le symétrique de ${P} par rapport à ${O}.`, u: "cm", min: 25, max: 33 },
  { s: (P, O, d) => `Une grande roue a pour centre ${O}. La nacelle ${P} est à ${d} m de ${O} ; la nacelle ${P}' lui est diamétralement opposée, symétrique par rapport à ${O}.`, u: "m", min: 10, max: 40 },
  { s: (P, O, d) => `Sur une balançoire à bascule de pivot ${O}, le siège ${P} est à ${d} cm du pivot. Le siège ${P}' est son symétrique par rapport à ${O}.`, u: "cm", min: 90, max: 150 },
  { s: (P, O, d) => `Une éolienne à deux pales a pour moyeu ${O}. Le bout ${P} d'une pale est à ${d} m de ${O} ; le bout ${P}' de l'autre pale est son symétrique par rapport à ${O}.`, u: "m", min: 20, max: 60 },
  { s: (P, O, d) => `Une hélice d'avion à deux pales a pour centre ${O}. L'extrémité ${P} d'une pale est à ${d} cm de ${O}, et l'extrémité ${P}' de l'autre pale est son symétrique par rapport à ${O}.`, u: "cm", min: 40, max: 90 },
  { s: (P, O, d) => `Sur une pizza de centre ${O}, une olive ${P} est à ${d} cm du centre. Une deuxième olive ${P}' est placée au symétrique de ${P} par rapport à ${O}.`, u: "cm", min: 5, max: 15 },
  { s: (P, O, d) => `Sur une carte à jouer de centre ${O}, le symbole ${P} est à ${d} mm du centre ; le symbole ${P}' est son image par la symétrie de centre ${O}.`, u: "mm", min: 20, max: 40 },
  { s: (P, O, d) => `Sur le plan d'une place, la fontaine ${O} est un centre de symétrie. Un banc ${P} est à ${d} m de la fontaine ; le banc ${P}' est son symétrique par rapport à ${O}.`, u: "m", min: 5, max: 25 },
  { s: (P, O, d) => `Dans un logo, ${P}' est le symétrique de ${P} par rapport au point ${O}, et ${O}${P} = ${d} cm.`, u: "cm", min: 2, max: 9 },
  { s: (P, O, d) => `Un ventilateur de plafond à deux pales tourne autour de ${O}. Le bout ${P} d'une pale est à ${d} cm de ${O}, et le bout ${P}' de l'autre pale est son symétrique par rapport à ${O}.`, u: "cm", min: 40, max: 70 },
  { s: (P, O, d) => `Un tourniquet d'arrosage à deux bras a pour axe ${O}. La buse ${P} d'un bras est à ${d} cm de ${O} ; la buse ${P}' de l'autre bras est son symétrique par rapport à ${O}.`, u: "cm", min: 15, max: 30 },
  { s: (P, O, d) => `Sur l'écran d'un téléphone, une appli fait faire un demi-tour à une photo autour du centre ${O} de l'écran. Un point ${P} de la photo est à ${d} mm de ${O}, et ${P}' est sa nouvelle position.`, u: "mm", min: 10, max: 60 },
  { s: (P, O, d) => `Sur un carreau de faïence de centre ${O}, le motif est symétrique par rapport à ${O}. Une fleur ${P} est à ${d} cm de ${O} et sa jumelle ${P}' est son symétrique.`, u: "cm", min: 3, max: 9 },
];

/** Ce qui glisse sur une grille repérée. */
const MOBILES: { intro: string; qui: string }[] = [
  { intro: "Dans un jeu vidéo, un personnage se déplace sur une grille.", qui: "le personnage" },
  { intro: "Un robot aspirateur avance dans une pièce quadrillée.", qui: "le robot" },
  { intro: "Un drone survole un champ découpé en carrés.", qui: "le drone" },
  { intro: "Sur un plateau de jeu de société, on avance un pion.", qui: "le pion" },
  { intro: "Dans un jeu de type Tetris, une pièce descend sans tourner.", qui: "la pièce" },
  { intro: "Sur un écran, on déplace le curseur de la souris.", qui: "le curseur" },
  { intro: "Sur une carte marine quadrillée, un bateau change de position.", qui: "le bateau" },
  { intro: "Sur Mars, un robot explorateur se déplace sur une grille de repérage.", qui: "le robot explorateur" },
  { intro: "Dans un entrepôt, un chariot automatique circule sur un sol quadrillé.", qui: "le chariot" },
  { intro: "Sur le plan quadrillé d'une ville, un livreur change de rue.", qui: "le livreur" },
  { intro: "Sur un carrelage, une fourmi marche tout droit.", qui: "la fourmi" },
  { intro: "Dans un parc, une voiture télécommandée roule sur une dalle quadrillée.", qui: "la voiture" },
  { intro: "Sur le schéma quadrillé d'un terrain de handball, l'entraîneur déplace un joueur.", qui: "le joueur" },
  { intro: "Dans une appli de dessin, on fait glisser un autocollant.", qui: "l'autocollant" },
];

/** Cartes et plans pour le défi des deux translations. */
const CARTES = [
  "une carte simplifiée de La Réunion",
  "le plan d'un camping",
  "une carte au trésor quadrillée",
  "la carte d'un jeu de stratégie",
  "le plan d'un zoo",
  "la carte d'un parc national",
  "le plan quadrillé d'une ville",
  "un plateau de jeu de société",
  "la carte d'une course d'orientation",
  "l'écran d'un GPS",
  "le plan d'évacuation d'un collège",
  "le plan d'un port de plaisance",
];
const SYMBOLES = ["un symbole", "un pictogramme", "un pion", "un repère", "un jeton", "un marqueur"];

/** Supports et motifs de frises. */
const FRISES = [
  "Sur une frise de carrelage",
  "Sur la bordure d'un papier peint",
  "Sur un galon de tissu",
  "Sur le bord d'un tapis",
  "Sur une frise peinte au pochoir",
  "Sur un bracelet de perles",
  "Sur la grille d'un portail",
  "Sur la frise d'un temple grec",
  "Sur une broderie",
  "Sur un ruban cadeau",
  "Sur une rangée de tuiles décorées",
  "Sur la nappe d'une table",
];
const MOTIFS = [
  "un motif en forme de feuille",
  "un oiseau stylisé",
  "un poisson stylisé",
  "un motif en forme de flèche",
  "un escargot",
  "un hippocampe",
  "un motif en forme de vague",
  "un éclair",
  "un trèfle penché",
  "un motif en forme de virgule",
];

/** Des pièges qui ne sont jamais aussi justes : la symétrie centrale EST une rotation de 180°. */
const MAUVAISES_REPONSES: Record<string, string[]> = {
  translation: ["rotation", "symétrie centrale", "symétrie axiale", "homothétie"],
  rotation: ["translation", "symétrie axiale", "symétrie centrale", "homothétie"],
  "symétrie centrale": ["translation", "symétrie axiale", "rotation d'un quart de tour", "homothétie"],
  "symétrie axiale": ["translation", "rotation", "symétrie centrale", "homothétie"],
};

/** Des situations réelles, chacune avec SA transformation (jamais 180° pour une « rotation »). */
const SITUATIONS_DEFI: { s: string; r: string; pourquoi: string }[] = [
  { s: "Sur un manège, un cheval de bois passe à la place du suivant en tournant d'un huitième de tour autour de l'axe central.", r: "rotation", pourquoi: "le cheval tourne autour d'un point fixe, l'axe du manège" },
  { s: "Une éolienne a trois pales : en tournant, chaque pale prend la place de la suivante.", r: "rotation", pourquoi: "les pales tournent d'un tiers de tour autour du moyeu" },
  { s: "Une porte s'ouvre en pivotant autour de ses gonds.", r: "rotation", pourquoi: "la porte tourne autour d'un point fixe (les gonds, vus de dessus)" },
  { s: "Un essuie-glace balaie le pare-brise autour de son pivot.", r: "rotation", pourquoi: "le balai tourne autour du pivot" },
  { s: "Une hélice à quatre pales tourne : chaque pale prend la place de la suivante.", r: "rotation", pourquoi: "chaque pale tourne d'un quart de tour autour du centre" },
  { s: "On tourne une face d'un casse-tête cubique d'un quart de tour.", r: "rotation", pourquoi: "la face tourne d'un quart de tour autour de son centre" },
  { s: "Un skieur descend une pente bien droite sans tourner ses skis.", r: "translation", pourquoi: "le skieur glisse tout droit, sans tourner" },
  { s: "La cabine d'un ascenseur monte du rez-de-chaussée au quatrième étage.", r: "translation", pourquoi: "la cabine glisse verticalement sans tourner" },
  { s: "Un tiroir s'ouvre en glissant vers l'avant.", r: "translation", pourquoi: "le tiroir glisse tout droit, sans tourner" },
  { s: "Sur un papier peint, le même motif se répète tous les 50 cm vers le bas.", r: "translation", pourquoi: "le motif glisse toujours du même déplacement" },
  { s: "Une valise avance sur un tapis roulant tout droit.", r: "translation", pourquoi: "la valise glisse sans tourner" },
  { s: "Un tampon encreur laisse son empreinte sur une feuille : le dessin du tampon et celui de l'empreinte sont inversés.", r: "symétrie axiale", pourquoi: "l'empreinte est le dessin retourné comme dans un miroir" },
  { s: "Le mot AMBULANCE est écrit à l'envers sur le capot pour être lu dans un rétroviseur.", r: "symétrie axiale", pourquoi: "le rétroviseur agit comme un miroir" },
  { s: "Un panneau se reflète dans une grande flaque d'eau.", r: "symétrie axiale", pourquoi: "la surface de l'eau agit comme un miroir" },
  { s: "Vues de dessus, la chaussure gauche et la chaussure droite d'une même paire se correspondent.", r: "symétrie axiale", pourquoi: "une chaussure est l'image de l'autre dans un miroir" },
  { s: "Une feuille de papier pliée puis découpée donne une guirlande dont les deux moitiés se superposent par pliage.", r: "symétrie axiale", pourquoi: "le pli joue le rôle d'axe" },
  { s: "Sur une roue de vélo, la valve passe de tout en haut à tout en bas en un demi-tour.", r: "symétrie centrale", pourquoi: "la valve fait un demi-tour autour du centre de la roue" },
  { s: "La lettre N, tournée d'un demi-tour autour de son centre, se superpose à elle-même.", r: "symétrie centrale", pourquoi: "un demi-tour autour d'un point est une symétrie centrale" },
  { s: "Sur une grande roue, deux nacelles sont diamétralement opposées.", r: "symétrie centrale", pourquoi: "l'une est à l'opposé de l'autre par rapport au centre, à la même distance" },
  { s: "Un domino posé sur la table est tourné d'un demi-tour autour de son centre.", r: "symétrie centrale", pourquoi: "le domino fait un demi-tour autour d'un point" },
  { s: "Sur une carte à jouer, le roi du haut et le roi du bas sont tête-bêche autour du centre de la carte.", r: "symétrie centrale", pourquoi: "une moitié est l'image de l'autre par un demi-tour autour du centre" },
];

/** La distance au centre est conservée par une rotation. */
const ROTATION_DISTANCES: { s: (P: string, O: string, d: number, angle: string) => string; u: string; min: number; max: number }[] = [
  { s: (P, O, d, angle) => `Une roue de vélo tourne autour de son axe ${O}. La valve ${P} est à ${d} cm de ${O}. La roue tourne ${angle} : la valve arrive en ${P}'.`, u: "cm", min: 25, max: 33 },
  { s: (P, O, d, angle) => `La grande aiguille d'une horloge de gare mesure ${d} cm. Son extrémité ${P} tourne autour du centre ${O} du cadran, ${angle}, et arrive en ${P}'.`, u: "cm", min: 30, max: 90 },
  { s: (P, O, d, angle) => `Le bout ${P} d'une pale d'éolienne est à ${d} m du moyeu ${O}. L'éolienne tourne ${angle} et le bout de la pale arrive en ${P}'.`, u: "m", min: 20, max: 60 },
  { s: (P, O, d, angle) => `Une nacelle ${P} de grande roue est à ${d} m du centre ${O}. La roue tourne ${angle} : la nacelle arrive en ${P}'.`, u: "m", min: 10, max: 40 },
  { s: (P, O, d, angle) => `Sur un manège, un cheval de bois ${P} est à ${d} m de l'axe ${O}. Le manège tourne ${angle} et le cheval arrive en ${P}'.`, u: "m", min: 2, max: 7 },
  { s: (P, O, d, angle) => `Le bout ${P} d'un essuie-glace est à ${d} cm du pivot ${O}. L'essuie-glace tourne ${angle} et son bout arrive en ${P}'.`, u: "cm", min: 35, max: 60 },
  { s: (P, O, d, angle) => `Vue de dessus, une porte tourne autour de ses gonds ${O}. La poignée ${P} est à ${d} cm des gonds. La porte tourne ${angle} et la poignée arrive en ${P}'.`, u: "cm", min: 70, max: 85 },
  { s: (P, O, d, angle) => `On trace un arc avec un compas : la pointe sèche est en ${O} et la mine, en ${P}, est à ${d} cm de ${O}. On fait tourner le compas ${angle} : la mine arrive en ${P}'.`, u: "cm", min: 3, max: 9 },
  { s: (P, O, d, angle) => `Le bout ${P} d'une pale de ventilateur est à ${d} cm de l'axe ${O}. Le ventilateur tourne ${angle} et le bout arrive en ${P}'.`, u: "cm", min: 15, max: 60 },
  { s: (P, O, d, angle) => `Sur une platine, un point ${P} du bord d'un disque vinyle est à ${d} cm du centre ${O}. Le disque tourne ${angle} et ce point arrive en ${P}'.`, u: "cm", min: 9, max: 15 },
  { s: (P, O, d, angle) => `Le bout ${P} de la trotteuse d'une montre est à ${d} mm du centre ${O}. La trotteuse tourne ${angle} et son bout arrive en ${P}'.`, u: "mm", min: 8, max: 20 },
  { s: (P, O, d, angle) => `Par une rotation de centre ${O}, le point ${P}, situé à ${d} cm de ${O}, tourne ${angle} et devient ${P}'.`, u: "cm", min: 2, max: 9 },
  { s: (P, O, d, angle) => `Sur le volant d'une voiture, de centre ${O}, un repère ${P} est à ${d} cm du centre. Le conducteur tourne le volant ${angle} : le repère arrive en ${P}'.`, u: "cm", min: 17, max: 19 },
];
const ANGLES_DITS = [
  { t: "d'un quart de tour", demi: false },
  { t: "de 30°", demi: false },
  { t: "de 45°", demi: false },
  { t: "de 60°", demi: false },
  { t: "de 120°", demi: false },
  { t: "de 150°", demi: false },
  { t: "d'un demi-tour", demi: true },
  { t: "de 180°", demi: true },
];

/** OP' après une rotation de centre O (et PP' quand c'est un demi-tour). */
function questionDistanceRotation(tournures: (O: string, P: string) => string[]): TutorGeneratedQuestionV4 {
  const [P] = shuffle(LETTRES);
  const O = randomChoice(CENTRES.filter((c) => c !== P));
  const o = randomChoice(ROTATION_DISTANCES);
  const d = randomInt(o.min, o.max);
  const an = randomChoice(ANGLES_DITS);
  const qs = tournures(O, P).map((t) => ({ t, double: false }));
  if (an.demi) qs.push({ t: `Quelle distance sépare ${P} de ${P}' ?`, double: true });
  const q = randomChoice(qs);
  const rep = q.double ? 2 * d : d;
  return {
    text: `${o.s(P, O, d, an.t)} ${q.t}`,
    format: "short",
    expected: [`${rep} ${o.u}`],
    comparator: "number_equal",
    explanation:
      `Définition : une rotation de centre ${O} conserve la distance au centre : ${O}${P} = ${O}${P}', quel que soit l'angle.\n\n` +
      (q.double
        ? `Méthode : un demi-tour envoie ${P} à l'opposé de ${O} : ${P}, ${O} et ${P}' sont alignés, et ${P}${P}' = ${O}${P} + ${O}${P}'.\n\n` +
          `Calcul : ${d} + ${d} = ${rep} ${o.u}.\n\n` +
          `Conclusion : ${P}${P}' = ${rep} ${o.u}.`
        : `Méthode : l'angle (${an.t.replace(/^d'|^de /, "")}) ne change rien à la distance : on reporte ${O}${P}.\n\n` +
          `Calcul : ${O}${P} = ${d} ${o.u}, donc ${O}${P}' = ${d} ${o.u}.\n\n` +
          `Conclusion : ${O}${P}' mesure ${d} ${o.u}.`),
  };
}

export const transformationsBank: TutorBankItemV4[] = [
  /* =========================
     TRANSFO_SYMETRIE_AXIALE
  ========================= */

  {
    kind: "fixed",
    id: "4e_sym_axiale_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_axiale",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle transformation utilise un axe comme un miroir ?",
    format: "qcm",
    choices: ["une symétrie axiale", "une symétrie centrale", "une translation", "une rotation"],
    expected: ["une symétrie axiale"],
    comparator: "mcq_exact",
    hint: "Le mot important est axe.",
    explanation:
      "Définition : une symétrie axiale transforme une figure comme dans un miroir.\n\n" +
      "Méthode : on repère l’axe de symétrie.\n\n" +
      "Calcul : chaque point et son image sont à la même distance de l’axe.\n\n" +
      "Conclusion : la transformation est une symétrie axiale.",
    tags: ["transformation", "symetrie_axiale", "rappel", "qcm", "canvas"],
    canvas: transformationCanvas({
      transformation: "symetrie_axiale",
      grid: { rows: 8, cols: 8 },
      source: {
        label: "F",
        points: [
          { x: 1, y: 2 },
          { x: 3, y: 2 },
          { x: 2, y: 4 },
        ],
      },
      image: {
        label: "F'",
        points: [
          { x: 7, y: 2 },
          { x: 5, y: 2 },
          { x: 6, y: 4 },
        ],
      },
      axis: { type: "vertical", x: 4, label: "axe" },
    }),
  },

  {
    kind: "template",
    id: "4e_sym_axiale_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_axiale",
    difficulty: 2,
    theme: "neutral",
    hint: "Dans une symétrie axiale, l’axe est au milieu entre un point et son image.",
    tags: ["transformation", "symetrie_axiale", "template", "canvas"],
    // ⛔⛔ RÉPARÉ LE 30/08/2026, MÊME DÉFAUT QUE LES SYMÉTRIES CENTRALES : la
    // réponse attendue était TOUJOURS « oui », sur une figure toujours
    // identique. Répondre « oui » sans regarder donnait tout juste.
    // ⭐ Le « non » enseigne ici l'erreur la plus fréquente de la symétrie
    // axiale : la figure GLISSÉE au lieu d'être retournée. Elle est à la bonne
    // distance de l'axe, mais elle a gardé son sens.
    generate: () => {
      const fig = randomChoice(FIGURES_SYM);
      const axe = randomChoice(AXES);
      const [le, du, il, bleu] = [leF(fig), duF(fig), ilF(fig), bleuF(fig)];
      const a = randomInt(5, 6);
      const ecart = randomInt(1, 2);
      const larg = largeur(fig.points);
      const source = fig.points.map((p) => ({ x: a - ecart - larg + p.x, y: 1 + p.y }));
      const juste = source.map((p) => ({ x: 2 * a - p.x, y: p.y }));
      const correcte = Math.random() < 0.5;
      // La figure GLISSÉE : on la translate de l'autre côté de l'axe sans
      // inverser son sens. C'est l'erreur la plus fréquente, et elle se
      // reconnaît à ce que la figure « regarde » toujours du même côté. Elle
      // occupe exactement les mêmes colonnes que la bonne image : la position
      // seule ne trahit pas la réponse.
      const glisse = Math.random() < 0.5;
      const fausse = glisse
        ? source.map((p) => ({ x: p.x + 2 * ecart + larg, y: p.y }))
        : juste.map((p, i) => (i === 1 ? { x: p.x + 1, y: p.y } : p));
      const question = randomChoice([
        `${cap(le)} rouge est-${il} l'image ${du} ${bleu} par la symétrie d'axe ${axe} ?`,
        `Par la symétrie d'axe ${axe}, ${le} ${bleu} a-t-${il} pour image ${le} rouge ?`,
        `Le symétrique ${du} ${bleu} par rapport à la droite ${axe} est-il ${le} rouge ?`,
        `Si l'on plie la feuille le long de la droite ${axe}, ${le} ${bleu} se superpose-t-${il} exactement ${auF(fig)} rouge ?`,
      ]);
      return {
        text: randomChoice(DECORS) + question,
        format: "qcm",
        choices: ["oui", "non"],
        expected: [correcte ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation:
          `Définition : dans une symétrie axiale, l'axe ${axe} est un MIROIR : il est la médiatrice de chaque segment reliant un point à son image.\n\n` +
          `Méthode : on compte les carreaux entre un sommet et ${axe}, puis entre ${axe} et son image. Les deux doivent être égaux — et la figure doit avoir changé de SENS.\n\n` +
          (correcte
            ? `Calcul : chaque sommet ${du} ${bleu} est à la même distance de ${axe} que son image, de l'autre côté.\n\nConclusion : oui, ${le} rouge est bien l'image par la symétrie d'axe ${axe}.`
            : glisse
              ? "Calcul : ⚠️ la figure a été GLISSÉE, pas retournée : elle a gardé son sens, et ses sommets ne sont pas à la bonne distance de l'axe.\n\nConclusion : non. ⭐ Une symétrie axiale INVERSE le sens — c'est ce qu'on vérifie en premier, avant même de compter les carreaux."
              : "Calcul : ⚠️ un sommet est reporté un carreau trop loin : sa distance à l'axe n'est pas la même des deux côtés.\n\nConclusion : non. ⭐ On vérifie TOUS les sommets : deux sur trois qui tombent juste ne prouvent rien."),
        canvas: transformationCanvas({
          transformation: "symetrie_axiale",
          grid: { rows: hauteur(fig.points) + 3, cols: a + ecart + larg + 2 },
          source: { label: "F", points: source },
          image: { label: "F'", points: correcte ? juste : fausse },
          axis: { type: "vertical", x: a, label: axe },
        }),
      };
    },
  },

  {
    kind: "fixed",
    id: "4e_sym_axiale_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_axiale",
    difficulty: 3,
    theme: "neutral",
    // ⛔ 08/10/2026 : question ouverte à mots-clés (« axe » suffisait) → QCM sur les mêmes pièges.
    text: "Comment vérifier qu’un point A' est l’image de A par la symétrie d’axe (d) ?",
    format: "qcm",
    choices: [
      "on vérifie que (d) est la médiatrice de [AA'] : perpendiculaire à [AA'] en son milieu",
      "on vérifie seulement que A et A' sont à la même distance de (d)",
      "on vérifie que (d) passe par A et par A'",
      "on vérifie que [AA'] est parallèle à (d)",
    ],
    expected: ["on vérifie que (d) est la médiatrice de [AA'] : perpendiculaire à [AA'] en son milieu"],
    comparator: "mcq_exact",
    hint: "Parle de l’axe et des distances.",
    explanation:
      "Définition : dans une symétrie axiale, l’axe joue le rôle d’un miroir.\n\n" +
      "Méthode : on vérifie que A et A' sont de part et d’autre de l’axe.\n\n" +
      "Calcul : l’axe doit être la médiatrice du segment [AA'].\n\n" +
      "Conclusion : A' est l’image de A si l’axe est au milieu et perpendiculaire à [AA'].",
    tags: ["transformation", "symetrie_axiale", "open", "methode"],
  },

  /* =========================
     TRANSFO_SYMETRIE_CENTRALE
  ========================= */

  {
    kind: "fixed",
    id: "4e_sym_centrale_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_centrale",
    difficulty: 1,
    theme: "neutral",
    text: "Une symétrie centrale correspond à...",
    format: "qcm",
    choices: ["un demi-tour autour d’un point", "un glissement", "un miroir avec un axe", "un agrandissement"],
    expected: ["un demi-tour autour d’un point"],
    comparator: "mcq_exact",
    hint: "Pense à une rotation de 180°.",
    explanation:
      "Définition : une symétrie centrale est un demi-tour autour d’un point appelé centre.\n\n" +
      "Méthode : on repère le centre de symétrie.\n\n" +
      "Calcul : un point, son image et le centre sont alignés, et le centre est au milieu.\n\n" +
      "Conclusion : une symétrie centrale correspond à un demi-tour autour d’un point.",
    tags: ["transformation", "symetrie_centrale", "definition", "qcm", "canvas"],
    canvas: transformationCanvas({
      transformation: "symetrie_centrale",
      grid: { rows: 8, cols: 8 },
      source: {
        label: "F",
        points: [
          { x: 1, y: 2 },
          { x: 3, y: 2 },
          { x: 2, y: 3 },
        ],
      },
      image: {
        label: "F'",
        points: [
          { x: 7, y: 6 },
          { x: 5, y: 6 },
          { x: 6, y: 5 },
        ],
      },
      center: { point: { x: 4, y: 4 }, label: "O" },
    }),
  },

  {
    kind: "fixed",
    id: "4e_sym_centrale_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_centrale",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la différence principale entre une symétrie axiale et une symétrie centrale ?",
    format: "qcm",
    choices: [
      "la symétrie axiale utilise un axe, la symétrie centrale utilise un point",
      "la symétrie axiale utilise un point, la symétrie centrale utilise un axe",
      "la symétrie axiale utilise un axe, la symétrie centrale utilise un angle",
      "la symétrie axiale conserve les longueurs, la symétrie centrale non",
    ],
    expected: ["la symétrie axiale utilise un axe, la symétrie centrale utilise un point"],
    comparator: "mcq_exact",
    hint: "Axiale vient de axe ; centrale vient de centre.",
    explanation:
      "Définition : une symétrie axiale utilise un axe, tandis qu’une symétrie centrale utilise un centre.\n\n" +
      "Méthode : on identifie l’élément qui définit la transformation.\n\n" +
      "Calcul : axe pour la symétrie axiale ; point O pour la symétrie centrale.\n\n" +
      "Conclusion : la différence principale est axe contre centre.",
    tags: ["transformation", "symetrie_axiale", "symetrie_centrale", "comparaison"],
  },

  {
    kind: "template",
    id: "4e_sym_centrale_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_centrale",
    difficulty: 2,
    theme: "neutral",
    hint: "Le centre est le milieu entre chaque point et son image.",
    tags: ["transformation", "symetrie_centrale", "template", "canvas"],
    // ⛔⛔ RÉPARÉ LE 30/08/2026, ET LE DÉFAUT DÉPASSAIT LE COMPTEUR. Ce gabarit
    // attendait TOUJOURS « oui », sur une figure toujours identique : un élève
    // qui répondait « oui » sans regarder le dessin avait tout juste, à chaque
    // fois. La question ne mesurait rien.
    // 👉 La réponse est maintenant TIRÉE AU SORT, et quand elle vaut « non »
    // l'erreur est NOMMÉE dans le corrigé — c'est ce qui distingue un piège
    // d'une question truquée.
    generate: () => {
      const fig = randomChoice(FIGURES_SYM);
      const [le, du, il, bleu] = [leF(fig), duF(fig), ilF(fig), bleuF(fig)];
      const O = randomChoice(CENTRES);
      const c = { x: randomInt(4, 5), y: randomInt(4, 5) };
      const source = autourDe(fig, c);
      // L'image juste : chaque point à l'opposé du centre, à la même distance.
      const juste = source.map((p) => demiTour(p, c));
      const correcte = Math.random() < 0.5;
      const larg = largeur(fig.points);
      const haut = hauteur(fig.points);
      const faute = randomChoice([
        { quoi: `un sommet est décalé d'un carreau : ${O} n'est plus le milieu de son segment`, f: (p: Pt, i: number) => (i === 0 ? { x: p.x + 1, y: p.y } : p) },
        { quoi: "la figure a été GLISSÉE au lieu d'être retournée : elle garde le même sens", f: (_p: Pt, i: number) => ({ x: source[i].x + larg + 2, y: source[i].y + haut + 2 }) },
        { quoi: "la figure a été retournée dans un miroir, pas par un demi-tour", f: (_p: Pt, i: number) => ({ x: 2 * c.x - source[i].x, y: source[i].y }) },
      ]);
      const image = correcte ? juste : juste.map(faute.f);
      const question = randomChoice([
        `${cap(le)} rouge est-${il} l'image ${du} ${bleu} par la symétrie de centre ${O} ?`,
        `Par la symétrie de centre ${O}, ${le} ${bleu} a-t-${il} pour image ${le} rouge ?`,
        `Le symétrique ${du} ${bleu} par rapport au point ${O} est-il ${le} rouge ?`,
        `En faisant faire un demi-tour ${aa(le)} ${bleu} autour du point ${O}, obtient-on ${le} rouge ?`,
      ]);
      const k = cadrer([source, image, [c]]);
      return {
        text: randomChoice(DECORS) + question,
        format: "qcm",
        choices: ["oui", "non"],
        expected: [correcte ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation:
          `Définition : une symétrie centrale est un DEMI-TOUR autour d'un point. Le centre ${O} doit être le milieu de chaque segment reliant un point à son image.\n\n` +
          `Méthode : on prend un sommet, on trace le segment jusqu'à son image, et on vérifie que ${O} tombe pile au milieu. Puis on recommence sur un autre sommet — un seul qui rate suffit.\n\n` +
          (correcte
            ? `Calcul : chaque sommet image est bien à l'opposé de ${O}, à la même distance. La figure a aussi changé de SENS, ce qui est la signature du demi-tour.\n\nConclusion : oui, ${le} rouge est bien l'image par la symétrie de centre ${O}.`
            : `Calcul : ⚠️ ${faute.quoi}.\n\nConclusion : non. ⭐ Vérifier UN seul point ne suffit jamais — c'est en testant le deuxième qu'on repère ce genre d'erreur.`),
        canvas: transformationCanvas({
          transformation: "symetrie_centrale",
          grid: { rows: k.rows, cols: k.cols },
          source: { label: "F", points: k.g[0] },
          image: { label: "F'", points: k.g[1] },
          center: { point: k.g[2][0], label: O },
        }),
      };
    },
  },

  {
    kind: "fixed",
    id: "4e_sym_centrale_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_centrale",
    difficulty: 4,
    theme: "neutral",
    // ⛔ 08/10/2026 : question ouverte à mots-clés (« centre » suffisait) → QCM sur les mêmes pièges.
    text: "Comment vérifier qu’un point A' est bien l’image de A par la symétrie de centre O ?",
    format: "qcm",
    choices: [
      "on vérifie que O est le milieu de [AA']",
      "on vérifie seulement que OA = OA'",
      "on vérifie seulement que A, O et A' sont alignés",
      "on vérifie que A' est sur la perpendiculaire à (OA) passant par O",
    ],
    expected: ["on vérifie que O est le milieu de [AA']"],
    comparator: "mcq_exact",
    hint: "Il faut parler d’alignement et de milieu.",
    explanation:
      "Définition : dans une symétrie centrale de centre O, A, O et A' sont alignés.\n\n" +
      "Méthode : on vérifie deux choses : l’alignement et l’égalité des distances.\n\n" +
      "Calcul : si OA = OA', alors O est le milieu de [AA'].\n\n" +
      "Conclusion : A' est bien l’image de A si A, O et A' sont alignés et si O est le milieu de [AA'].",
    tags: ["transformation", "symetrie_centrale", "open", "methode"],
  },

  /* =========================
     TRANSFO_TRANSLATION
  ========================= */

  {
    kind: "fixed",
    id: "4e_sym_translation_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_translation",
    difficulty: 1,
    theme: "neutral",
    text: "Une translation est...",
    format: "qcm",
    choices: ["un glissement", "un demi-tour", "un miroir", "un agrandissement"],
    expected: ["un glissement"],
    comparator: "mcq_exact",
    hint: "La figure se déplace sans tourner.",
    explanation:
      "Définition : une translation fait glisser une figure selon un vecteur.\n\n" +
      "Méthode : on observe que tous les points se déplacent de la même façon.\n\n" +
      "Calcul : même direction, même sens et même longueur de déplacement.\n\n" +
      "Conclusion : une translation est un glissement.",
    tags: ["transformation", "translation", "definition", "qcm"],
  },

  {
    kind: "template",
    id: "4e_sym_translation_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_translation",
    difficulty: 2,
    theme: "neutral",
    hint: "Tous les points doivent subir le même déplacement.",
    tags: ["transformation", "translation", "template", "canvas"],
    // ⛔ 03/10/2026 : l'énoncé DISAIT le déplacement puis demandait « quelle
    // transformation ? » — la réponse était dans la question, et toujours
    // « translation ». On montre maintenant une image qui a glissé, ou qui a
    // été retournée, ou qui a tourné : l'élève juge sur le dessin.
    generate: () => {
      const fig = randomChoice(FIGURES_SYM);
      const [le, du, il, bleu] = [leF(fig), duF(fig), ilF(fig), bleuF(fig)];
      const dx = randomChoice([4, 5, 6]);
      const dy = randomInt(-2, 2);
      const source = fig.points;
      const cas = randomChoice(["translation", "translation", "miroir", "quart"] as const);
      let forme: Pt[] = source;
      if (cas === "miroir") forme = source.map((p) => ({ x: largeur(source) - p.x, y: p.y }));
      if (cas === "quart") {
        const r = source.map((p) => ({ x: -p.y, y: p.x }));
        const mx = Math.min(...r.map((p) => p.x));
        forme = r.map((p) => ({ x: p.x - mx, y: p.y }));
      }
      const image = forme.map((p) => ({ x: p.x + dx, y: p.y + dy }));
      const k = cadrer([source, image]);
      const oui = cas === "translation";
      const question = randomChoice([
        `${cap(le)} rouge est-${il} l'image ${du} ${bleu} par une translation ?`,
        `Peut-on passer ${du} ${bleu} ${auF(fig)} rouge par un simple glissement, c'est-à-dire par une translation ?`,
        `${cap(le)} ${bleu} a-t-${il} seulement glissé pour venir sur ${le} rouge ?`,
        `Existe-t-il une translation qui envoie ${le} ${bleu} sur ${le} rouge ?`,
      ]);
      return {
        text: randomChoice(DECORS) + question,
        format: "qcm",
        choices: ["oui", "non"],
        expected: [oui ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation:
          "Définition : une translation est un glissement : tous les points se déplacent de la même façon, et la figure garde son orientation.\n\n" +
          "Méthode : on regarde d'abord si la figure « regarde » toujours du même côté, puis on compare les flèches pointillées : elles doivent être toutes pareilles.\n\n" +
          (oui
            ? `Calcul : chaque sommet a bougé de ${nb(dx, "carreau", "carreaux")} vers la droite${dy === 0 ? "" : ` et de ${nb(Math.abs(dy), "carreau", "carreaux")} vers le ${dy > 0 ? "bas" : "haut"}`}, sans tourner.\n\nConclusion : oui, c'est une translation.`
            : cas === "miroir"
              ? "Calcul : ⚠️ la figure a été RETOURNÉE, comme dans un miroir : les flèches pointillées n'ont pas toutes la même longueur.\n\nConclusion : non, ce n'est pas une translation."
              : "Calcul : ⚠️ la figure a TOURNÉ d'un quart de tour : elle ne regarde plus du même côté.\n\nConclusion : non, ce n'est pas une translation."),
        canvas: transformationCanvas({
          transformation: "translation",
          grid: { rows: k.rows, cols: k.cols },
          source: { label: "F", points: k.g[0] },
          image: { label: "F'", points: k.g[1] },
          display: { showTransformationInfo: false },
        }),
      };
    },
  },

  {
    kind: "fixed",
    id: "4e_sym_translation_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_translation",
    difficulty: 4,
    theme: "neutral",
    // ⛔ 08/10/2026 : question ouverte à mots-clés (« même » suffisait) → QCM sur les mêmes pièges.
    text: "Comment reconnaître qu’une figure est l’image d’une autre par une translation ?",
    format: "qcm",
    choices: [
      "tous les points ont glissé du même déplacement : même direction, même sens, même longueur",
      "la figure a été retournée comme dans un miroir",
      "la figure a tourné autour d’un point",
      "la figure a la même forme, mais une taille différente",
    ],
    expected: ["tous les points ont glissé du même déplacement : même direction, même sens, même longueur"],
    comparator: "mcq_exact",
    hint: "Tous les points se déplacent de la même façon.",
    explanation:
      "Définition : une translation déplace une figure selon un vecteur.\n\n" +
      "Méthode : on compare le déplacement de plusieurs points.\n\n" +
      "Calcul : ils doivent avoir la même direction, le même sens et la même longueur.\n\n" +
      "Conclusion : on reconnaît une translation si tous les points ont le même déplacement.",
    tags: ["transformation", "translation", "open", "methode"],
  },

  /* =========================
     TRANSFO_ROTATION
  ========================= */

  {
    kind: "fixed",
    id: "4e_sym_rotation_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_rotation",
    difficulty: 1,
    theme: "neutral",
    text: "Une rotation est définie par...",
    format: "qcm",
    choices: ["un centre et un angle", "un axe seulement", "un vecteur seulement", "un rapport"],
    expected: ["un centre et un angle"],
    comparator: "mcq_exact",
    hint: "Une rotation tourne autour d’un point.",
    explanation:
      "Définition : une rotation fait tourner une figure autour d’un centre.\n\n" +
      "Méthode : on repère le centre et l’angle de rotation.\n\n" +
      "Calcul : la distance au centre est conservée.\n\n" +
      "Conclusion : une rotation est définie par un centre et un angle.",
    tags: ["transformation", "rotation", "definition", "qcm"],
  },

  {
    kind: "template",
    id: "4e_sym_rotation_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_rotation",
    difficulty: 2,
    theme: "neutral",
    hint: "La figure tourne autour du centre O.",
    tags: ["transformation", "rotation", "template", "canvas"],
    // ⛔ 03/10/2026 : l'énoncé donnait « rotation de centre O et d'angle 90° »
    // puis demandait « quelle transformation ? ». On montre maintenant une
    // image qui a tourné autour du centre… ou qui a glissé, ou qui a tourné
    // autour d'un AUTRE point : l'élève vérifie la distance au centre.
    generate: () => {
      const fig = randomChoice(FIGURES_SYM);
      const [le, du, il, bleu] = [leF(fig), duF(fig), ilF(fig), bleuF(fig)];
      const O = randomChoice(CENTRES);
      const c = { x: 5, y: 5 };
      const source = autourDe(fig, c);
      const cas = randomChoice(["horaire", "antihoraire", "demi", "glisse", "autreCentre"] as const);
      const image =
        cas === "horaire" ? source.map((p) => quartHoraire(p, c))
        : cas === "antihoraire" ? source.map((p) => quartAntiHoraire(p, c))
        : cas === "demi" ? source.map((p) => demiTour(p, c))
        : cas === "glisse" ? source.map((p) => ({ x: p.x + largeur(fig.points) + 2, y: p.y }))
        : source.map((p) => quartHoraire(p, c)).map((p) => ({ x: p.x + 1, y: p.y + 1 }));
      const oui = cas === "horaire" || cas === "antihoraire" || cas === "demi";
      const k = cadrer([source, image, [c]]);
      const question = randomChoice([
        `${cap(le)} rouge est-${il} l'image ${du} ${bleu} par une rotation de centre ${O} ?`,
        `En faisant tourner ${le} ${bleu} autour du point ${O}, peut-on l'amener exactement sur ${le} rouge ?`,
        `Existe-t-il une rotation de centre ${O} qui envoie ${le} ${bleu} sur ${le} rouge ?`,
        `${cap(le)} rouge s'obtient-${il} en faisant tourner ${le} ${bleu} autour de ${O} ?`,
      ]);
      const angle =
        cas === "horaire" ? "un quart de tour (90°) dans le sens des aiguilles d'une montre"
        : cas === "antihoraire" ? "un quart de tour (90°) dans le sens inverse des aiguilles d'une montre"
        : "un demi-tour (180°)";
      return {
        text: randomChoice(DECORS) + question,
        format: "qcm",
        choices: ["oui", "non"],
        expected: [oui ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation:
          `Définition : une rotation de centre ${O} fait tourner la figure autour de ${O} : chaque point reste à la même distance de ${O}.\n\n` +
          `Méthode : on choisit un sommet, on compare sa distance à ${O} avant et après, puis on regarde de quel angle il a tourné.\n\n` +
          (oui
            ? `Calcul : chaque sommet est resté à la même distance de ${O} et a tourné ${angle}.\n\nConclusion : oui, c'est une rotation de centre ${O}.`
            : cas === "glisse"
              ? `Calcul : ⚠️ la figure a GLISSÉ sans tourner : c'est une translation, et les sommets ne sont plus à la même distance de ${O}.\n\nConclusion : non.`
              : `Calcul : ⚠️ la figure a bien tourné, mais pas autour de ${O} : un sommet et son image ne sont pas à la même distance de ${O}.\n\nConclusion : non, le centre n'est pas ${O}.`),
        canvas: transformationCanvas({
          transformation: "rotation",
          grid: { rows: k.rows, cols: k.cols },
          source: { label: "F", points: k.g[0] },
          image: { label: "F'", points: k.g[1] },
          center: { point: k.g[2][0], label: O },
          display: { showTransformationInfo: false },
        }),
      };
    },
  },

  {
    kind: "fixed",
    id: "4e_sym_rotation_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_rotation",
    difficulty: 4,
    theme: "neutral",
    // ⛔ 08/10/2026 : question ouverte à mots-clés (« centre » suffisait) → QCM sur les mêmes pièges.
    text: "Comment reconnaître qu’une figure est l’image d’une autre par une rotation ?",
    format: "qcm",
    choices: [
      "chaque point a tourné du même angle autour d’un même centre, en gardant sa distance au centre",
      "tous les points ont glissé du même déplacement",
      "la figure a été retournée comme dans un miroir",
      "chaque point s’est éloigné du centre",
    ],
    expected: ["chaque point a tourné du même angle autour d’un même centre, en gardant sa distance au centre"],
    comparator: "mcq_exact",
    hint: "Parle du centre et de l’angle.",
    explanation:
      "Définition : une rotation fait tourner une figure autour d’un centre.\n\n" +
      "Méthode : on repère le centre, l’angle et le sens de rotation.\n\n" +
      "Calcul : les distances au centre sont conservées.\n\n" +
      "Conclusion : on reconnaît une rotation grâce à son centre et à son angle.",
    tags: ["transformation", "rotation", "open", "methode"],
  },

  /* =========================
     TRANSFO_PROPRIETES
  ========================= */

  {
    kind: "fixed",
    id: "4e_sym_transformation_propriete_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_transformation_propriete",
    difficulty: 2,
    theme: "neutral",
    text: "La symétrie centrale, la translation et la rotation conservent...",
    format: "qcm",
    choices: ["les longueurs et les angles", "seulement les longueurs", "seulement les aires", "aucune propriété"],
    expected: ["les longueurs et les angles"],
    comparator: "mcq_exact",
    hint: "Ces transformations ne déforment pas les figures.",
    explanation:
      "Définition : ces transformations déplacent ou tournent une figure sans la déformer.\n\n" +
      "Méthode : on compare la figure de départ et la figure image.\n\n" +
      "Calcul : les longueurs, les angles, l’alignement et le parallélisme sont conservés.\n\n" +
      "Conclusion : elles conservent les longueurs et les angles.",
    tags: ["transformation", "propriete", "conservation", "qcm"],
  },

  {
    kind: "template",
    id: "4e_sym_transformation_propriete_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_transformation_propriete",
    difficulty: 3,
    theme: "neutral",
    hint: "Une transformation de 4e conserve la forme et la taille.",
    tags: ["transformation", "propriete", "template"],
    generate: () => {
      const [P, Q] = shuffle(LETTRES).slice(0, 2);
      const o = randomChoice(LONGUEURS_OBJETS);
      const l = randomInt(o.min, o.max);
      const t = tirerTransfo();
      const question = randomChoice([
        "Quelle est la longueur correspondante sur l'image ?",
        `Combien de ${o.uMot} mesure la longueur correspondante sur l'image ?`,
        "Sur l'image obtenue, que vaut cette longueur ?",
        "Donne la longueur correspondante sur l'image.",
      ]);
      return {
        text: `${o.s(l, P, Q)} On applique ${t.nom} à la figure. ${question}`,
        format: "short",
        expected: [`${l} ${o.u}`],
        comparator: "number_equal",
        explanation:
          `Définition : ${t.court} conserve les longueurs : elle déplace, tourne ou retourne la figure sans la déformer.\n\n` +
          "Méthode : on identifie la transformation, puis on reporte la même longueur.\n\n" +
          `Calcul : la longueur de départ est ${l} ${o.u}, donc sur l'image elle vaut aussi ${l} ${o.u}.\n\n` +
          `Conclusion : la longueur image est ${l} ${o.u}.`,
      };
    },
  },

  {
    kind: "fixed",
    id: "4e_sym_transformation_propriete_erreur_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_transformation_propriete",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève dit : une rotation change la taille de la figure. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Une rotation ne déforme pas.",
    explanation:
      "Définition : une rotation fait tourner une figure autour d’un centre.\n\n" +
      "Méthode : on vérifie si la taille change.\n\n" +
      "Calcul : les longueurs sont conservées.\n\n" +
      "Conclusion : l’élève a tort, une rotation ne change pas la taille.",
    tags: ["transformation", "propriete", "erreur", "rotation"],
  },

  {
    kind: "fixed",
    id: "4e_sym_transformation_propriete_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_transformation_propriete",
    difficulty: 4,
    theme: "neutral",
    // ⛔ 08/10/2026 : question ouverte à mots-clés → QCM sur les mêmes pièges.
    text: "Qu’est-ce qui est conservé par une symétrie centrale, une translation ou une rotation ?",
    format: "qcm",
    choices: [
      "les longueurs et les angles",
      "les longueurs, mais pas les angles",
      "les angles, mais pas les longueurs",
      "seulement la position de la figure",
    ],
    expected: ["les longueurs et les angles"],
    comparator: "mcq_exact",
    hint: "Pense à ce qui ne change pas dans la figure.",
    explanation:
      "Définition : ces transformations ne déforment pas les figures.\n\n" +
      "Méthode : on compare la figure initiale et son image.\n\n" +
      "Calcul : les longueurs, les angles, l’alignement et le parallélisme sont conservés.\n\n" +
      "Conclusion : on peut citer par exemple les longueurs et les angles.",
    tags: ["transformation", "propriete", "open"],
  },

  /* =========================
     TRANSFO_DEFIS
  ========================= */

  {
    kind: "fixed",
    id: "4e_sym_transformation_defi_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_transformation_defi",
    difficulty: 3,
    theme: "reunion",
    text: "Sur un plan de Saint-Pierre, un pictogramme est déplacé de 4 carreaux vers la droite et 2 vers le bas, sans tourner. Quelle transformation est utilisée ?",
    format: "qcm",
    choices: ["translation", "rotation", "symétrie centrale", "symétrie axiale"],
    expected: ["translation"],
    comparator: "mcq_exact",
    hint: "La figure glisse sans tourner.",
    explanation:
      "Définition : une translation est un glissement.\n\n" +
      "Méthode : on regarde si la figure se déplace sans changer d’orientation.\n\n" +
      "Calcul : elle avance de 4 carreaux vers la droite et 2 vers le bas.\n\n" +
      "Conclusion : la transformation est une translation.",
    tags: ["transformation", "defi", "translation", "reunion"],
  },

  {
    kind: "template",
    id: "4e_sym_transformation_defi_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_transformation_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Cherche si la figure glisse, tourne ou fait un demi-tour.",
    tags: ["transformation", "defi", "template", "qcm"],
    generate: () => {
      const s = randomChoice(SITUATIONS_DEFI);
      const question = randomChoice([
        "Quelle transformation reconnaît-on ?",
        "Quelle transformation fait passer d'une position à l'autre ?",
        "De quelle transformation s'agit-il ?",
        "Quelle transformation modélise cette situation ?",
      ]);
      return {
        text: `${s.s} ${question}`,
        format: "qcm",
        choices: makeChoices(s.r, MAUVAISES_REPONSES[s.r]),
        expected: [s.r],
        comparator: "mcq_exact",
        explanation:
          "Définition : chaque transformation possède un indice : glissement = translation ; demi-tour = symétrie centrale ; tour autour d'un centre = rotation ; miroir = symétrie axiale.\n\n" +
          "Méthode : on cherche ce qui reste fixe (un point ? une droite ? rien ?) et si la figure est retournée.\n\n" +
          `Calcul : ici, ${s.pourquoi}.\n\n` +
          `Conclusion : la transformation est une ${s.r}.`,
      };
    },
  },

  {
    kind: "fixed",
    id: "4e_sym_transformation_defi_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_transformation_defi",
    difficulty: 5,
    theme: "neutral",
    // ⛔ 08/10/2026 : question ouverte à mots-clés → QCM sur les mêmes pièges.
    text: "Quelle phrase décrit correctement les quatre transformations ?",
    format: "qcm",
    choices: [
      "symétrie axiale : un miroir (un axe) ; symétrie centrale : un demi-tour (un centre) ; translation : un glissement ; rotation : on tourne d’un angle autour d’un centre",
      "symétrie axiale : un demi-tour ; symétrie centrale : un miroir ; translation : un glissement ; rotation : on tourne autour d’un centre",
      "symétrie axiale : un miroir ; symétrie centrale : un glissement ; translation : un demi-tour ; rotation : on tourne autour d’un centre",
      "symétrie axiale : un miroir ; symétrie centrale : un demi-tour ; translation : on tourne autour d’un centre ; rotation : un glissement",
    ],
    expected: ["symétrie axiale : un miroir (un axe) ; symétrie centrale : un demi-tour (un centre) ; translation : un glissement ; rotation : on tourne d’un angle autour d’un centre"],
    comparator: "mcq_exact",
    hint: "Associe chaque transformation à son indice principal.",
    explanation:
      "Définition : les transformations se distinguent par leur élément caractéristique.\n\n" +
      "Méthode : on associe chaque transformation à un indice.\n\n" +
      "Calcul : symétrie axiale = axe ; symétrie centrale = centre et demi-tour ; translation = glissement ; rotation = centre et angle.\n\n" +
      "Conclusion : ces indices permettent de reconnaître rapidement la transformation.",
    tags: ["transformation", "defi", "open", "comparaison"],
  },
    /* =========================
     RENFORT SYMÉTRIE AXIALE
  ========================= */

  {
    kind: "fixed",
    id: "4e_sym_axiale_erreur_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_axiale",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève dit : dans une symétrie axiale, le point A, son image A' et l’axe sont toujours alignés. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Dans une symétrie axiale, l’axe est perpendiculaire au segment [AA'].",
    explanation:
      "Définition : dans une symétrie axiale, l’axe est la médiatrice du segment reliant un point à son image.\n\n" +
      "Méthode : on vérifie la position de l’axe par rapport à [AA'].\n\n" +
      "Calcul : l’axe est perpendiculaire à [AA'] et passe par son milieu.\n\n" +
      "Conclusion : A, A' et l’axe ne sont pas toujours alignés.",
    tags: ["transformation", "symetrie_axiale", "erreur"],
  },

  /* =========================
     RENFORT SYMÉTRIE CENTRALE
  ========================= */

  {
    kind: "fixed",
    id: "4e_sym_centrale_erreur_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_centrale",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève dit : une symétrie centrale fonctionne comme un miroir avec un axe. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "La symétrie centrale utilise un point, pas un axe.",
    explanation:
      "Définition : une symétrie centrale est un demi-tour autour d’un centre.\n\n" +
      "Méthode : on distingue l’axe et le centre.\n\n" +
      "Calcul : symétrie axiale → axe ; symétrie centrale → point centre.\n\n" +
      "Conclusion : l’élève confond symétrie axiale et symétrie centrale.",
    tags: ["transformation", "symetrie_centrale", "erreur", "comparaison"],
  },

  {
    kind: "template",
    id: "4e_sym_centrale_tpl_2_milieu",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_centrale",
    difficulty: 3,
    theme: "neutral",
    hint: "Le centre O est le milieu de [AA'].",
    tags: ["transformation", "symetrie_centrale", "milieu", "template"],
    generate: () => {
      const [P] = shuffle(LETTRES);
      const O = randomChoice(CENTRES.filter((c) => c !== P));
      const o = randomChoice(CENTRALE_MESURES);
      const d = randomInt(o.min, o.max);
      const q = randomChoice([
        { t: `Quelle est la distance ${O}${P}' ?`, double: false },
        { t: `À quelle distance de ${O} se trouve ${P}' ?`, double: false },
        { t: `Calcule ${O}${P}'.`, double: false },
        { t: `Quelle est la longueur ${P}${P}' ?`, double: true },
        { t: `Quelle distance sépare ${P} de ${P}' ?`, double: true },
        { t: `Calcule la longueur du segment [${P}${P}'].`, double: true },
      ]);
      const rep = q.double ? 2 * d : d;
      return {
        text: `${o.s(P, O, d)} ${q.t}`,
        format: "short",
        expected: [`${rep} ${o.u}`],
        comparator: "number_equal",
        explanation:
          `Définition : dans la symétrie de centre ${O}, le centre est le MILIEU du segment qui relie un point à son image : ${P}, ${O} et ${P}' sont alignés et ${O}${P} = ${O}${P}'.\n\n` +
          (q.double
            ? `Méthode : ${P}${P}' = ${O}${P} + ${O}${P}'.\n\n` +
              `Calcul : ${O}${P} = ${d} ${o.u}, donc ${P}${P}' = ${d} + ${d} = ${rep} ${o.u}.\n\n` +
              `Conclusion : ${P}${P}' mesure ${rep} ${o.u}.`
            : `Méthode : on utilise l'égalité ${O}${P} = ${O}${P}'.\n\n` +
              `Calcul : ${O}${P} = ${d} ${o.u}, donc ${O}${P}' = ${d} ${o.u}.\n\n` +
              `Conclusion : ${O}${P}' mesure ${d} ${o.u}.`),
      };
    },
  },

  /* =========================
     RENFORT TRANSLATION
  ========================= */

  {
    kind: "template",
    id: "4e_sym_translation_tpl_2_coordonnees",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_translation",
    difficulty: 3,
    theme: "neutral",
    hint: "Ajoute le même déplacement aux coordonnées du point.",
    tags: ["transformation", "translation", "coordonnees", "template"],
    generate: () => {
      const [P] = shuffle(LETTRES);
      const ctx = randomChoice(MOBILES);
      const gauche = Math.random() < 0.4;
      const dx = randomChoice([2, 3, 4, 5]);
      const dy = randomChoice([1, 2, 3].filter((v) => v !== dx));
      const x = gauche ? randomInt(dx, dx + 4) : randomInt(0, 5);
      const y = randomInt(0, 4);
      const sx = gauche ? -dx : dx;
      const bon = co(x + sx, y + dy);
      const dir = gauche ? "gauche" : "droite";
      const depl = `${nb(dx, "carreau", "carreaux")} vers la ${dir} et ${dy} vers le haut`;
      const t = randomChoice([
        `${ctx.intro} ${cap(ctx.qui)} est au point ${P}${co(x, y)} et se déplace de ${depl}, sans tourner : c'est une translation. Quelles sont les coordonnées de son point d'arrivée ${P}' ?`,
        `${ctx.intro} ${cap(ctx.qui)}, au point ${P}${co(x, y)}, glisse de ${depl}. Donne les coordonnées de son point d'arrivée ${P}'.`,
        `${ctx.intro} Par la translation de ${depl}, le point ${P}${co(x, y)} ${de(ctx.qui)} a pour image ${P}'. Quelles sont les coordonnées de ${P}' ?`,
        `${ctx.intro} Calcule les coordonnées de ${P}', image du point ${P}${co(x, y)} par la translation de ${depl}.`,
      ]);
      return {
        text: t,
        format: "qcm",
        choices: makeChoices(bon, [
          co(x - sx, y + dy),
          co(x + sx, y - dy),
          co(sx, dy),
          co(y + dy, x + sx),
          co(x - sx, y - dy),
          co(x + dy, y + dx),
        ]),
        expected: [bon],
        comparator: "mcq_exact",
        explanation:
          "Définition : une translation déplace tous les points de la même façon.\n\n" +
          `Méthode : vers la ${dir}, on ${gauche ? "RETIRE" : "AJOUTE"} ${dx} à l'abscisse ; vers le haut, on AJOUTE ${dy} à l'ordonnée.\n\n` +
          `Calcul : ${x} ${gauche ? "−" : "+"} ${dx} = ${x + sx} et ${y} + ${dy} = ${y + dy}, donc ${P}${co(x, y)} devient ${P}'${bon}.\n\n` +
          `Conclusion : les coordonnées de ${P}' sont ${bon}. ⚠️ ${co(x + sx, y - dy)} est le piège : c'est le résultat qu'on obtient en comptant l'ordonnée vers le BAS, comme sur un écran d'ordinateur. Dans un repère, l'axe des ordonnées monte.`,
      };
    },
  },

  {
    kind: "fixed",
    id: "4e_sym_translation_erreur_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_translation",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève dit : dans une translation, la figure peut tourner un peu. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Une translation est un glissement.",
    explanation:
      "Définition : une translation est un glissement sans rotation.\n\n" +
      "Méthode : on vérifie que l’orientation de la figure ne change pas.\n\n" +
      "Calcul : tous les points se déplacent selon le même vecteur.\n\n" +
      "Conclusion : l’élève a tort, la figure ne tourne pas.",
    tags: ["transformation", "translation", "erreur"],
  },

  /* =========================
     RENFORT ROTATION
  ========================= */

  {
    kind: "fixed",
    id: "4e_sym_rotation_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_rotation",
    difficulty: 2,
    theme: "neutral",
    text: "Lors d’une rotation de centre O, que devient la distance OA ?",
    format: "qcm",
    choices: [
      "elle est conservée",
      "elle est doublée",
      "elle est divisée par deux",
      "elle disparaît",
    ],
    expected: ["elle est conservée"],
    comparator: "mcq_exact",
    hint: "Une rotation ne déforme pas.",
    explanation:
      "Définition : une rotation fait tourner un point autour d’un centre.\n\n" +
      "Méthode : on compare la distance au centre avant et après rotation.\n\n" +
      "Calcul : OA = OA'.\n\n" +
      "Conclusion : la distance au centre est conservée.",
    tags: ["transformation", "rotation", "distance", "qcm"],
  },

  {
    kind: "template",
    id: "4e_sym_rotation_tpl_2_distance",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_rotation",
    difficulty: 3,
    theme: "neutral",
    hint: "Une rotation conserve la distance au centre.",
    tags: ["transformation", "rotation", "distance", "template"],
    generate: () =>
      questionDistanceRotation((O, P) => [
        `Quelle est la distance ${O}${P}' ?`,
        `À quelle distance de ${O} se trouve ${P}' ?`,
        `Quelle est la longueur ${O}${P}' ?`,
      ]),
  },

  /* =========================
     RENFORT PROPRIÉTÉS
  ========================= */

  {
    kind: "template",
    id: "4e_sym_transformation_propriete_tpl_2_angle",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_transformation_propriete",
    difficulty: 3,
    theme: "neutral",
    hint: "Ces transformations conservent les angles.",
    tags: ["transformation", "propriete", "angle", "template"],
    generate: () => {
      const [A, B, C] = shuffle(LETTRES).slice(0, 3);
      const o = randomChoice(ANGLES_OBJETS);
      const angle = randomChoice(o.vals);
      const t = tirerTransfo();
      const question = randomChoice([
        "Quelle est la mesure de l'angle image ?",
        "Que mesure l'angle correspondant sur l'image ?",
        "Combien de degrés mesure l'angle image ?",
        "Donne la mesure de l'angle image, en degrés.",
      ]);
      return {
        text: `${o.s(angle, A, B, C)} On applique ${t.nom} à la figure. ${question}`,
        format: "short",
        expected: [`${angle}°`],
        comparator: "number_equal",
        explanation:
          `Définition : ${t.court} conserve les angles, comme toutes les symétries, translations et rotations.\n\n` +
          "Méthode : on repère que la transformation ne déforme pas la figure.\n\n" +
          `Calcul : l'angle de départ mesure ${angle}°, donc l'angle image mesure aussi ${angle}°.\n\n` +
          `Conclusion : l'angle image mesure ${angle}°.`,
      };
    },
  },

  {
    kind: "fixed",
    id: "4e_sym_transformation_propriete_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_transformation_propriete",
    difficulty: 3,
    theme: "neutral",
    text: "Une translation transforme un rectangle en...",
    format: "qcm",
    choices: ["un rectangle de même taille", "un triangle", "un rectangle agrandi", "un cercle"],
    expected: ["un rectangle de même taille"],
    comparator: "mcq_exact",
    hint: "La translation conserve la nature et les dimensions de la figure.",
    explanation:
      "Définition : une translation conserve la forme et la taille.\n\n" +
      "Méthode : on regarde la nature de la figure.\n\n" +
      "Calcul : un rectangle reste un rectangle, avec les mêmes dimensions.\n\n" +
      "Conclusion : l’image est un rectangle de même taille.",
    tags: ["transformation", "propriete", "rectangle", "qcm"],
  },

  /* =========================
     RENFORT DÉFIS
  ========================= */

  {
    kind: "template",
    id: "4e_sym_transformation_defi_tpl_2_reunion_canvas",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_transformation_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Fais le bilan : d'abord à gauche-droite, puis en haut-bas.",
    tags: ["transformation", "defi", "translation", "composition", "canvas", "template"],
    // ⭐ 03/10/2026 : ce défi ne demandait que « quelle transformation ? » devant
    // un symbole qui avait glissé — la réponse était écrite dans l'énoncé. Il
    // pose maintenant une vraie question de défi : DEUX translations à la
    // suite en font une seule. La carte de La Réunion reste l'une des cartes.
    generate: () => {
      const carte = randomChoice(CARTES);
      const s1 = randomChoice([1, -1]);
      const s2 = -s1;
      const a = randomInt(2, 5);
      let c = randomInt(1, 4);
      if (c === a) c = a === 5 ? 4 : a + 1;
      const v1 = randomChoice([1, -1]);
      const b = randomInt(1, 3);
      const e = randomInt(1, 3);
      const v2 = Math.random() < 0.5 ? v1 : -v1;
      const ndx = s1 * a + s2 * c;
      let ndy = v1 * b + v2 * e;
      const eFinal = ndy === 0 ? e + 1 : e;
      ndy = v1 * b + v2 * eFinal;
      const h = (s: number) => (s > 0 ? "droite" : "gauche");
      const v = (s: number) => (s > 0 ? "bas" : "haut");
      const desc = (dx: number, dy: number) =>
        `${nb(Math.abs(dx), "carreau", "carreaux")} vers la ${h(dx)} et ${Math.abs(dy)} vers le ${v(dy)}`;
      const bon = desc(ndx, ndy);
      const fig = randomChoice(FIGURES_SYM);
      const source = fig.points;
      const image = source.map((p) => ({ x: p.x + ndx, y: p.y + ndy }));
      const k = cadrer([source, image]);
      const question = randomChoice([
        "Quel déplacement unique donne le même résultat ?",
        "Par quelle translation unique peut-on remplacer ces deux déplacements ?",
        "Au bout du compte, quel est le déplacement total ?",
        "Quelle translation fait passer directement de la position de départ à la position d'arrivée ?",
      ]);
      return {
        text:
          `Sur ${carte}, ${randomChoice(SYMBOLES)} est déplacé deux fois, sans tourner : d'abord de ${desc(s1 * a, v1 * b)}, ` +
          `puis de ${desc(s2 * c, v2 * eFinal)}. ${question}`,
        format: "qcm",
        choices: makeChoices(bon, [
          desc(-ndx, ndy),
          desc(ndx, -ndy),
          desc(-ndx, -ndy),
          desc(s1 * (a + c), v1 * (b + eFinal)),
          ...(Math.abs(ndx) !== Math.abs(ndy) ? [desc(Math.sign(ndx) * Math.abs(ndy), Math.sign(ndy) * Math.abs(ndx))] : []),
        ]),
        expected: [bon],
        comparator: "mcq_exact",
        explanation:
          "Définition : deux translations à la suite donnent UNE translation : on additionne les déplacements, en tenant compte du sens.\n\n" +
          "Méthode : on fait le bilan séparément à gauche-droite, puis en haut-bas.\n\n" +
          `Calcul : à gauche-droite, ${a} vers la ${h(s1)} puis ${c} vers la ${h(s2)} : il reste ${Math.abs(ndx)} vers la ${h(ndx)}. ` +
          `En haut-bas, ${b} vers le ${v(v1)} puis ${eFinal} vers le ${v(v2)} : ${v1 === v2 ? `${b} + ${eFinal} = ${Math.abs(ndy)}` : `il reste ${Math.abs(ndy)}`} vers le ${v(ndy)}.\n\n` +
          `Conclusion : un seul déplacement de ${bon} donne le même résultat.`,
        canvas: transformationCanvas({
          transformation: "translation",
          grid: { rows: k.rows, cols: k.cols },
          source: { label: "S", points: k.g[0] },
          image: { label: "S'", points: k.g[1] },
          display: { showTransformationInfo: false },
        }),
      };
    },
  },
    /* =========================
     RENFORT CANVAS — AXE HORIZONTAL
  ========================= */

  {
    kind: "template",
    id: "4e_sym_axiale_tpl_2_axe_horizontal",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_axiale",
    difficulty: 2,
    theme: "neutral",
    hint: "L’axe horizontal joue le rôle d’un miroir.",
    tags: ["transformation", "symetrie_axiale", "axe_horizontal", "template", "canvas"],
    // ⛔ RÉPARÉ LE 30/08/2026 : réponse toujours « oui », figure toujours la
    // même. ⭐ Ce gabarit garde son rôle propre — l'axe HORIZONTAL, que les
    // élèves traitent moins bien que le vertical parce qu'il faut compter en
    // hauteur — et il fait maintenant varier sa réponse.
    generate: () => {
      const fig = randomChoice(FIGURES_SYM);
      const axe = randomChoice(AXES);
      const [le, du, il, bleu] = [leF(fig), duF(fig), ilF(fig), bleuF(fig)];
      const b = randomInt(5, 6);
      const ecart = randomInt(1, 2);
      const haut = hauteur(fig.points);
      const source = fig.points.map((p) => ({ x: 1 + p.x, y: b - ecart - haut + p.y }));
      const juste = source.map((p) => ({ x: p.x, y: 2 * b - p.y }));
      const correcte = Math.random() < 0.5;
      // Deux fautes : un point mal reporté (une distance à l'axe qui diffère),
      // ou la figure GLISSÉE vers le bas sans être retournée.
      const glisse = Math.random() < 0.5;
      const fausse = glisse
        ? source.map((p) => ({ x: p.x, y: p.y + 2 * ecart + haut }))
        : juste.map((p, i) => (i === 1 ? { x: p.x, y: p.y + 1 } : p));
      const question = randomChoice([
        `Par la symétrie d'axe horizontal ${axe}, ${le} ${bleu} a-t-${il} pour image ${le} rouge ?`,
        `${cap(le)} rouge est-${il} le reflet ${du} ${bleu} dans le miroir horizontal ${axe} ?`,
        `L'image ${du} ${bleu} par la symétrie d'axe ${axe} est-elle ${le} rouge ?`,
        `En pliant la feuille le long de l'axe horizontal ${axe}, ${le} ${bleu} vient-${il} recouvrir exactement ${le} rouge ?`,
      ]);
      return {
        text: randomChoice(DECORS) + question,
        format: "qcm",
        choices: ["oui", "non"],
        expected: [correcte ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation:
          `Définition : l'axe ${axe} est un miroir, et il est la médiatrice de chaque segment reliant un point à son image.\n\n` +
          `Méthode : avec un axe horizontal, on compte les carreaux EN HAUTEUR — au-dessus de ${axe}, puis en dessous.\n\n` +
          (correcte
            ? `Calcul : chaque sommet est à la même hauteur de part et d'autre de ${axe}, et la figure est retournée.\n\nConclusion : oui, ${le} rouge est bien l'image par cette symétrie.`
            : glisse
              ? "Calcul : ⚠️ la figure a été GLISSÉE vers le bas sans être retournée : elle a gardé son sens.\n\nConclusion : non. ⭐ Un miroir horizontal met le haut en bas : la figure doit être à l'envers."
              : "Calcul : ⚠️ un sommet est reporté un carreau trop loin : sa distance à l'axe n'est pas la même de l'autre côté.\n\nConclusion : non. ⭐ Il faut vérifier TOUS les sommets : deux sur trois qui tombent juste ne prouvent rien."),
        canvas: transformationCanvas({
          transformation: "symetrie_axiale",
          grid: { rows: b + ecart + haut + 2, cols: largeur(fig.points) + 3 },
          source: { label: "F", points: source },
          image: {
            label: "F'",
            points: correcte ? juste : fausse,
          },
          axis: { type: "horizontal", y: b, label: axe },
        }),
      };
    },
  },

  /* =========================
     RENFORT CANVAS — SYMÉTRIE CENTRALE PIÈGE
  ========================= */

  {
    kind: "template",
    id: "4e_sym_centrale_tpl_3_piege_non",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_centrale",
    difficulty: 4,
    theme: "neutral",
    hint: "Vérifie si O est vraiment le milieu entre chaque point et son image.",
    tags: ["transformation", "symetrie_centrale", "piege", "template", "canvas"],
    // ⛔ RÉPARÉ LE 30/08/2026. Ce gabarit attendait TOUJOURS « non » sur une
    // figure toujours identique — le pendant exact du défaut de `tpl_1`, qui
    // attendait toujours « oui ». Pris ensemble, les deux apprenaient à
    // reconnaître un DESSIN, pas une symétrie.
    // ⭐ Il garde son rôle de piège, mais il le prend par l'autre bout : c'est
    // un ÉLÈVE qui affirme, et on demande s'il a raison. Le geste devient
    // « juger un raisonnement », pas « regarder une figure ».
    generate: () => {
      const fig = randomChoice(FIGURES_SYM);
      const [le, du, bleu] = [leF(fig), duF(fig), bleuF(fig)];
      const { p: prenom, il } = randomChoice(PRENOMS);
      const O = randomChoice(CENTRES);
      const c = { x: randomInt(4, 5), y: randomInt(4, 5) };
      const source = autourDe(fig, c);
      const juste = source.map((p) => demiTour(p, c));
      const aRaison = Math.random() < 0.5;
      const i0 = randomInt(0, source.length - 1);
      const verticale = Math.random() < 0.5;
      const image = aRaison
        ? juste
        : juste.map((p, i) => (i === i0 ? (verticale ? { x: p.x, y: p.y + 1 } : { x: p.x + 1, y: p.y }) : p));
      const k = cadrer([source, image, [c]]);
      const question = randomChoice([
        `${prenom} affirme que ${le} rouge est l'image ${du} ${bleu} par la symétrie de centre ${O}. A-t-${il} raison ?`,
        `D'après ${prenom}, ${le} rouge est le symétrique ${du} ${bleu} par rapport au point ${O}. Est-ce exact ?`,
        `${prenom} a construit l'image ${du} ${bleu} par la symétrie de centre ${O} : c'est ${le} rouge. Sa construction est-elle juste ?`,
        `${prenom} pense que ${O} est le milieu de chaque segment qui relie un sommet ${du} ${bleu} au sommet correspondant ${du} rouge. A-t-${il} raison ?`,
      ]);
      return {
        text: randomChoice(DECORS) + question,
        format: "qcm",
        choices: ["oui", "non"],
        expected: [aRaison ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation:
          `Définition : ${O} doit être le milieu de CHAQUE segment reliant un point à son image — pas seulement du premier qu'on regarde.\n\n` +
          "Méthode : on vérifie sommet par sommet. Un seul qui rate suffit à conclure que ce n'est pas une symétrie.\n\n" +
          (aRaison
            ? `Calcul : les ${source.length} sommets sont tous à l'opposé de ${O}, à la même distance.\n\nConclusion : ${prenom} a raison.`
            : `Calcul : ⚠️ un sommet est décalé d'un carreau — ${O} n'est pas le milieu de son segment.\n\nConclusion : ${prenom} a tort. ⭐ Le piège tient à ce que la figure RESSEMBLE à l'image : c'est pour cela qu'on vérifie, au lieu de regarder.`),
        canvas: transformationCanvas({
          transformation: "symetrie_centrale",
          grid: { rows: k.rows, cols: k.cols },
          source: { label: "F", points: k.g[0] },
          image: { label: "F'", points: k.g[1] },
          center: { point: k.g[2][0], label: O },
        }),
      };
    },
  },

  /* =========================
     TRANSLATION — VECTEUR ET IMAGE
  ========================= */

  {
    kind: "template",
    id: "4e_sym_translation_tpl_3_trouver_deplacement",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_translation",
    difficulty: 3,
    theme: "neutral",
    hint: "Compare un point et son image.",
    tags: ["transformation", "translation", "vecteur", "template", "canvas"],
    generate: () => {
      const fig = randomChoice(FIGURES_SYM);
      const [le, du, il, bleu] = [leF(fig), duF(fig), ilF(fig), bleuF(fig)];
      const [P] = shuffle(LETTRES);
      const adx = randomChoice([2, 3, 4, 5]);
      // Les deux déplacements doivent différer : à 2 et 2, le piège « on a
      // interverti l'horizontal et le vertical » s'écrit comme la bonne
      // réponse, et l'élève voyait deux fois la même ligne.
      const ady = randomChoice([1, 2, 3].filter((v) => v !== adx));
      const sx = randomChoice([1, -1]);
      const sy = randomChoice([1, -1]);
      const h = (s: number) => (s > 0 ? "à droite" : "à gauche");
      const v = (s: number) => (s > 0 ? "vers le bas" : "vers le haut");
      const desc = (nx: number, ny: number, s1: number, s2: number) =>
        `${nb(nx, "carreau", "carreaux")} ${h(s1)} et ${ny} ${v(s2)}`;
      const bon = desc(adx, ady, sx, sy);
      const source = fig.points;
      const image = source.map((p) => ({ x: p.x + sx * adx, y: p.y + sy * ady }));
      const k = cadrer([source, image]);
      const question = randomChoice([
        `Quel déplacement permet de passer ${du} ${bleu} ${auF(fig)} rouge ?`,
        `Par quelle translation ${le} ${bleu} a-t-${il} pour image ${le} rouge ?`,
        `Décris la translation qui envoie ${le} ${bleu} sur ${le} rouge.`,
        `Le sommet ${P} ${du} ${bleu} a pour image le sommet ${P}' ${du} rouge. Quel déplacement a-t-il subi ?`,
      ]);
      return {
        text: randomChoice(DECORS) + question,
        format: "qcm",
        choices: makeChoices(bon, [
          desc(adx, ady, -sx, sy),
          desc(adx, ady, sx, -sy),
          desc(ady, adx, sx, sy),
          desc(adx, ady, -sx, -sy),
          "un demi-tour autour d'un point",
        ]),
        expected: [bon],
        comparator: "mcq_exact",
        explanation:
          "Définition : une translation est définie par un déplacement, le même pour tous les points.\n\n" +
          `Méthode : on suit un sommet, par exemple ${P}, jusqu'à son image ${P}', en comptant d'abord les carreaux à gauche-droite, puis en haut-bas.\n\n` +
          `Calcul : le déplacement est de ${bon}.\n\n` +
          "Conclusion : ce déplacement définit la translation. ⚠️ On vérifie le SENS : compter juste mais dans le mauvais sens donne la translation inverse.",
        canvas: transformationCanvas({
          transformation: "translation",
          grid: { rows: k.rows, cols: k.cols },
          source: { label: P, points: k.g[0] },
          image: { label: `${P}'`, points: k.g[1] },
          display: { showTransformationInfo: false },
        }),
      };
    },
  },

  /* =========================
     ROTATION — SENS ET ANGLE
  ========================= */

  {
    kind: "fixed",
    id: "4e_sym_rotation_fixed_3_angle_180",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_rotation",
    difficulty: 2,
    theme: "neutral",
    text: "Une rotation de 180° autour d’un point correspond aussi à...",
    format: "qcm",
    choices: [
      "une symétrie centrale",
      "une translation",
      "une symétrie axiale",
      "un agrandissement",
    ],
    expected: ["une symétrie centrale"],
    comparator: "mcq_exact",
    hint: "Un demi-tour autour d’un point.",
    explanation:
      "Définition : une symétrie centrale est un demi-tour autour d’un centre.\n\n" +
      "Méthode : on associe demi-tour et rotation de 180°.\n\n" +
      "Calcul : 180° correspond à un demi-tour.\n\n" +
      "Conclusion : une rotation de 180° correspond à une symétrie centrale.",
    tags: ["transformation", "rotation", "symetrie_centrale", "qcm"],
  },

  {
    kind: "template",
    id: "4e_sym_rotation_tpl_3_angle_qcm",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_rotation",
    difficulty: 3,
    theme: "neutral",
    hint: "Observe l’angle de rotation autour de O.",
    tags: ["transformation", "rotation", "angle", "template", "canvas"],
    // ⚠️ 03/10/2026 : les anciennes propositions « 90° » et « 270° » étaient
    // TOUTES DEUX justes pour un quart de tour (selon le sens). Les choix
    // disent maintenant le sens, et l'angle ne figure plus dans le titre du
    // dessin (il donnait la réponse).
    generate: () => {
      const fig = randomChoice(FIGURES_SYM);
      const [le, du, il, bleu] = [leF(fig), duF(fig), ilF(fig), bleuF(fig)];
      const O = randomChoice(CENTRES);
      const c = { x: 5, y: 5 };
      const source = autourDe(fig, c);
      const H = "un quart de tour dans le sens des aiguilles d'une montre";
      const AH = "un quart de tour dans le sens inverse des aiguilles d'une montre";
      const D = "un demi-tour";
      const N = `aucune rotation de centre ${O} : la figure a glissé`;
      const cas = randomChoice([H, AH, D, H, AH, N]);
      const image =
        cas === H ? source.map((p) => quartHoraire(p, c))
        : cas === AH ? source.map((p) => quartAntiHoraire(p, c))
        : cas === D ? source.map((p) => demiTour(p, c))
        : source.map((p) => ({ x: p.x + largeur(fig.points) + 2, y: p.y }));
      const k = cadrer([source, image, [c]]);
      const question = randomChoice([
        `Quelle rotation de centre ${O} envoie ${le} ${bleu} sur ${le} rouge ?`,
        `Autour du point ${O}, comment ${le} ${bleu} a-t-${il} tourné pour donner ${le} rouge ?`,
        `Observe ${le} ${bleu} et ${le} rouge autour du point ${O}. Quelle description est la bonne ?`,
        `Choisis ce qui fait passer ${du} ${bleu} ${auF(fig)} rouge, autour de ${O}.`,
      ]);
      const angle = cas === D ? 180 : cas === N ? 0 : 90;
      return {
        text: randomChoice(DECORS) + question,
        format: "qcm",
        choices: shuffle([H, AH, D, N]),
        expected: [cas],
        comparator: "mcq_exact",
        explanation:
          "Définition : une rotation est définie par un centre, un angle et un sens. Un quart de tour fait 90°, un demi-tour 180°.\n\n" +
          `Méthode : on suit un sommet autour de ${O} : on regarde dans quel quart de la feuille il arrive, et dans quel sens il a tourné.\n\n` +
          (cas === N
            ? `Calcul : ⚠️ la figure n'a pas tourné, elle a GLISSÉ : les sommets ne restent pas à la même distance de ${O}.\n\nConclusion : ce n'est pas une rotation de centre ${O}.`
            : `Calcul : chaque sommet reste à la même distance de ${O} et tourne de ${angle}°${cas === D ? " : il arrive à l'opposé de " + O : ""}.\n\nConclusion : c'est ${cas}.`),
        canvas: transformationCanvas({
          transformation: "rotation",
          grid: { rows: k.rows, cols: k.cols },
          source: { label: "F", points: k.g[0] },
          image: { label: "F'", points: k.g[1] },
          center: { point: k.g[2][0], label: O },
          display: { showTransformationInfo: false },
        }),
      };
    },
  },

  /* =========================
     PROPRIÉTÉS — ALIGNEMENT / PARALLÉLISME
  ========================= */

  {
    kind: "fixed",
    id: "4e_sym_transformation_propriete_fixed_3_alignement",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_transformation_propriete",
    difficulty: 3,
    theme: "neutral",
    text: "Si trois points sont alignés, leurs images par une translation sont...",
    format: "qcm",
    choices: [
      "alignées",
      "toujours perpendiculaires",
      "toujours confondues",
      "placées au hasard",
    ],
    expected: ["alignées"],
    comparator: "mcq_exact",
    hint: "Une translation conserve l’alignement.",
    explanation:
      "Définition : une translation conserve la forme de la figure.\n\n" +
      "Méthode : on applique la propriété de conservation.\n\n" +
      "Calcul : l’alignement est conservé par translation.\n\n" +
      "Conclusion : les images de trois points alignés sont alignées.",
    tags: ["transformation", "propriete", "alignement"],
  },

  {
    kind: "fixed",
    id: "4e_sym_transformation_propriete_fixed_4_parallelisme",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_transformation_propriete",
    difficulty: 3,
    theme: "neutral",
    text: "Deux droites parallèles restent parallèles après une rotation.",
    format: "qcm",
    choices: ["vrai", "faux"],
    expected: ["vrai"],
    comparator: "mcq_exact",
    hint: "Une rotation conserve le parallélisme.",
    explanation:
      "Définition : une rotation ne déforme pas la configuration.\n\n" +
      "Méthode : on utilise les propriétés conservées par rotation.\n\n" +
      "Calcul : le parallélisme est conservé.\n\n" +
      "Conclusion : l’affirmation est vraie.",
    tags: ["transformation", "propriete", "parallelisme", "qcm"],
  },

  /* =========================
     DÉFIS — TRANSFORMATIONS SUCCESSIVES
  ========================= */

  {
    kind: "fixed",
    id: "4e_sym_transformation_defi_fixed_2_successives",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_transformation_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Une figure subit une translation puis une rotation. Peut-on dire que les longueurs sont conservées après les deux transformations ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Chaque transformation conserve les longueurs.",
    explanation:
      "Définition : une translation et une rotation conservent les longueurs.\n\n" +
      "Méthode : on applique successivement les propriétés de chaque transformation.\n\n" +
      "Calcul : si la première conserve les longueurs et la deuxième aussi, alors la composition conserve les longueurs.\n\n" +
      "Conclusion : les longueurs sont conservées après les deux transformations.",
    tags: ["transformation", "defi", "successives", "propriete"],
  },

  /* =========================================================
     COMPLÉMENTS (top-up ~10 items / microSkill)
  ========================================================= */

  // ---------- SYM_AXIALE ----------
  {
    kind: "fixed",
    id: "4e_sym_axiale_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_axiale",
    difficulty: 2,
    theme: "neutral",
    text: "Dans une symétrie axiale, l’axe est…",
    format: "qcm",
    choices: [
      "la médiatrice du segment reliant un point à son image",
      "la bissectrice de l’angle formé par un point et son image",
      "la parallèle au segment reliant un point à son image",
      "la perpendiculaire au segment passant par l’un de ses points",
    ],
    expected: ["la médiatrice du segment reliant un point à son image"],
    comparator: "mcq_exact",
    hint: "L’axe passe au milieu de [AA'] et lui est perpendiculaire.",
    explanation:
      "Définition : dans une symétrie axiale, l’axe est la médiatrice de [AA'].\n\n" +
      "Méthode : on vérifie que l’axe est perpendiculaire à [AA'] et passe par son milieu.\n\n" +
      "Calcul : c’est la définition de la médiatrice.\n\n" +
      "Conclusion : l’axe est la médiatrice du segment [AA'].",
    tags: ["transformation", "symetrie_axiale", "qcm"],
  },
  {
    kind: "fixed",
    id: "4e_sym_axiale_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_axiale",
    difficulty: 2,
    theme: "neutral",
    text: "Une symétrie axiale conserve-t-elle les longueurs ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Un miroir ne déforme pas.",
    explanation:
      "Définition : une symétrie axiale est une isométrie (elle ne déforme pas).\n\n" +
      "Méthode : on compare la figure et son image.\n\n" +
      "Calcul : les longueurs sont identiques.\n\n" +
      "Conclusion : oui, la symétrie axiale conserve les longueurs.",
    tags: ["transformation", "symetrie_axiale", "propriete", "qcm"],
  },
  {
    kind: "template",
    id: "4e_sym_axiale_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_axiale",
    difficulty: 2,
    theme: "neutral",
    hint: "La distance à l’axe est conservée.",
    tags: ["transformation", "symetrie_axiale", "distance", "template"],
    generate: () => {
      const [P] = shuffle(LETTRES);
      const axe = randomChoice(AXES);
      const r = randomChoice(REFLETS)(P, axe);
      const d = randomInt(r.min, r.max);
      const uMot = { m: "mètres", cm: "centimètres", mm: "millimètres" }[r.u];
      const q = randomChoice([
        { t: `À quelle distance ${de(r.ligne)} se trouve ${r.img} ?`, double: false },
        { t: `Combien de ${uMot} séparent ${r.img} ${de(r.ligne)} ?`, double: false },
        { t: `Quelle est la distance entre ${r.x} et ${r.img} ?`, double: true },
        { t: `Calcule la distance qui sépare ${r.x} ${de(r.img)}.`, double: true },
      ]);
      const rep = q.double ? 2 * d : d;
      return {
        text: `${r.s(d)} ${q.t}`,
        format: "short",
        expected: [`${rep} ${r.u}`],
        comparator: "number_equal",
        explanation:
          `Définition : dans une symétrie axiale, ${r.ligne} joue le rôle du miroir : un point et son image sont à la même distance de l'axe, de part et d'autre.\n\n` +
          (q.double
            ? `Méthode : la distance totale est celle d'un côté plus celle de l'autre côté.\n\n` +
              `Calcul : ${d} + ${d} = ${rep} ${r.u}.\n\n` +
              `Conclusion : ${r.x} et ${r.img} sont à ${rep} ${r.u} l'un de l'autre.`
            : `Méthode : on utilise la conservation de la distance à l'axe.\n\n` +
              `Calcul : ${r.x} est à ${d} ${r.u} ${de(r.ligne)}, donc ${r.img} aussi.\n\n` +
              `Conclusion : ${r.img} est à ${d} ${r.u} ${de(r.ligne)}.`),
      };
    },
  },
  {
    kind: "template",
    id: "4e_sym_axiale_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_axiale",
    difficulty: 2,
    theme: "neutral",
    hint: "Vérifie que chaque point et son image sont à la même distance de l’axe.",
    tags: ["transformation", "symetrie_axiale", "template", "canvas"],
    // ⛔ 03/10/2026 : ce gabarit attendait TOUJOURS « oui », sur la même
    // figure. Il fait maintenant COMPTER les carreaux sur le dessin : la
    // distance d'un sommet à l'axe, ou à son image (le double).
    generate: () => {
      const fig = randomChoice(FIGURES_SYM);
      const [du, bleu] = [duF(fig), bleuF(fig)];
      const axe = randomChoice(AXES);
      const [P] = shuffle(LETTRES);
      const vertical = Math.random() < 0.5;
      const a = randomInt(5, 6);
      const ecart = randomInt(1, 2);
      const larg = largeur(fig.points);
      const haut = hauteur(fig.points);
      const source = vertical
        ? fig.points.map((p) => ({ x: a - ecart - larg + p.x, y: 1 + p.y }))
        : fig.points.map((p) => ({ x: 1 + p.x, y: a - ecart - haut + p.y }));
      const image = source.map((p) => (vertical ? { x: 2 * a - p.x, y: p.y } : { x: p.x, y: 2 * a - p.y }));
      const d0 = vertical ? a - source[0].x : a - source[0].y;
      const q = randomChoice([
        { t: `Combien de carreaux séparent le point ${P} de l'axe ${axe} ?`, double: false },
        { t: `${P}' est l'image de ${P} par la symétrie d'axe ${axe}. À combien de carreaux de cet axe se trouve ${P}' ?`, double: false },
        { t: `Combien de carreaux séparent le point ${P} de son image ${P}' ?`, double: true },
        { t: `Quelle est la longueur du segment [${P}${P}'], en carreaux ?`, double: true },
      ]);
      const rep = q.double ? 2 * d0 : d0;
      return {
        text: `${randomChoice(DECORS)}Le sommet ${P} ${du} ${bleu} a pour image le sommet ${P}' ${du} rouge. ${q.t}`,
        format: "short",
        expected: [String(rep)],
        comparator: "number_equal",
        explanation:
          `Définition : dans une symétrie axiale, l'axe ${axe} est la médiatrice de [${P}${P}'] : ${P} et ${P}' sont à la même distance de l'axe, de part et d'autre.\n\n` +
          `Méthode : on compte les carreaux ${vertical ? "à l'horizontale" : "à la verticale"} entre ${P} et l'axe.\n\n` +
          (q.double
            ? `Calcul : ${P} est à ${nb(d0, "carreau", "carreaux")} de l'axe, ${P}' aussi, donc ${P}${P}' = ${d0} + ${d0} = ${rep} carreaux.\n\nConclusion : ${rep} carreaux.`
            : `Calcul : ${P} est à ${nb(d0, "carreau", "carreaux")} de l'axe, donc ${P}' aussi.\n\nConclusion : ${nb(d0, "carreau", "carreaux")}.`),
        canvas: transformationCanvas({
          transformation: "symetrie_axiale",
          grid: vertical
            ? { rows: haut + 3, cols: a + ecart + larg + 2 }
            : { rows: a + ecart + haut + 2, cols: larg + 3 },
          source: { label: P, points: source },
          image: { label: `${P}'`, points: image },
          axis: vertical ? { type: "vertical", x: a, label: axe } : { type: "horizontal", y: a, label: axe },
        }),
      };
    },
  },
  {
    kind: "fixed",
    id: "4e_sym_axiale_open_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_axiale",
    difficulty: 3,
    theme: "neutral",
    // ⛔ 08/10/2026 : question ouverte à mots-clés (« axe » suffisait) → QCM sur les mêmes pièges.
    text: "Pourquoi l’axe d’une symétrie axiale joue-t-il le rôle d’un miroir ?",
    format: "qcm",
    choices: [
      "chaque point et son image sont de part et d’autre de l’axe, à la même distance, sur une perpendiculaire à l’axe",
      "chaque point et son image sont du même côté de l’axe",
      "l’image est la figure qui a glissé le long de l’axe",
      "l’image est la figure qui a tourné autour de l’axe d’un quart de tour",
    ],
    expected: ["chaque point et son image sont de part et d’autre de l’axe, à la même distance, sur une perpendiculaire à l’axe"],
    comparator: "mcq_exact",
    hint: "Pense à l’effet miroir.",
    explanation:
      "Définition : l’axe agit comme un miroir entre la figure et son image.\n\n" +
      "Méthode : on observe que chaque point et son image sont symétriques par rapport à l’axe.\n\n" +
      "Calcul : ils sont à la même distance de l’axe, de part et d’autre.\n\n" +
      "Conclusion : l’axe est un axe de symétrie car il reflète la figure comme un miroir.",
    tags: ["transformation", "symetrie_axiale", "open"],
  },

  // ---------- SYM_CENTRALE ----------
  {
    kind: "fixed",
    id: "4e_sym_centrale_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_centrale",
    difficulty: 1,
    theme: "neutral",
    text: "Dans une symétrie centrale de centre O, le point O est…",
    format: "qcm",
    choices: [
      "le milieu de [AA']",
      "un sommet de la figure",
      "sur l’axe de symétrie",
      "à l’extérieur du segment [AA']",
    ],
    expected: ["le milieu de [AA']"],
    comparator: "mcq_exact",
    hint: "O est au centre, entre A et A'.",
    explanation:
      "Définition : dans une symétrie centrale, O est le milieu de [AA'].\n\n" +
      "Méthode : on vérifie l’alignement A, O, A' et l’égalité OA = OA'.\n\n" +
      "Calcul : O est exactement au milieu.\n\n" +
      "Conclusion : O est le milieu de [AA'].",
    tags: ["transformation", "symetrie_centrale", "qcm"],
  },
  {
    kind: "template",
    id: "4e_sym_centrale_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_centrale",
    difficulty: 2,
    theme: "neutral",
    hint: "O doit être le milieu entre chaque point et son image.",
    tags: ["transformation", "symetrie_centrale", "template", "canvas"],
    // ⛔ RÉPARÉ LE 30/08/2026 : ce gabarit était le JUMEAU de `tpl_1` — même
    // question, même figure, même réponse « oui » à chaque tirage. Deux
    // gabarits identiques ne font pas deux questions.
    // ⭐ Il porte maintenant la confusion qui coûte le plus cher dans ce
    // chapitre : un DEMI-TOUR n'est pas un MIROIR. Les deux retournent la
    // figure, mais pas de la même façon — et sur une figure asymétrique, la
    // différence se voit.
    generate: () => {
      const fig = randomChoice(FIGURES_SYM);
      const [le, du, il, bleu] = [leF(fig), duF(fig), ilF(fig), bleuF(fig)];
      const O = randomChoice(CENTRES);
      const c = { x: randomInt(4, 5), y: randomInt(4, 5) };
      const source = autourDe(fig, c);
      const demi = source.map((p) => demiTour(p, c));
      // Le miroir passant par le centre : il retourne aussi, mais autrement.
      const horizontalMiroir = Math.random() < 0.5;
      const miroir = source.map((p) => (horizontalMiroir ? { x: p.x, y: 2 * c.y - p.y } : { x: 2 * c.x - p.x, y: p.y }));
      const cEstLeDemiTour = Math.random() < 0.5;
      const k = cadrer([source, cEstLeDemiTour ? demi : miroir, [c]]);
      const question = randomChoice([
        `${cap(le)} rouge est-${il} obtenu${fig.fem ? "e" : ""} à partir ${du} ${bleu} par un demi-tour autour de ${O} ?`,
        `Le point ${O} est-il le centre d'une symétrie qui envoie ${le} ${bleu} sur ${le} rouge ?`,
        `Le point ${O} est-il le milieu de chaque segment qui relie un sommet ${du} ${bleu} au sommet correspondant ${du} rouge ?`,
        `Par la symétrie de centre ${O}, ${le} ${bleu} a-t-${il} pour image ${le} rouge ?`,
      ]);
      return {
        text: randomChoice(DECORS) + question,
        format: "qcm",
        choices: ["oui", "non"],
        expected: [cEstLeDemiTour ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation:
          `Définition : la symétrie centrale est un DEMI-TOUR. Chaque point traverse ${O} et se retrouve de l'autre côté, à la même distance — en hauteur comme en largeur.\n\n` +
          "Méthode : on suit un sommet. S'il n'a changé de côté que dans un sens (à gauche-droite, ou en haut-bas), ce n'est pas un demi-tour.\n\n" +
          (cEstLeDemiTour
            ? `Calcul : chaque sommet a traversé ${O} dans les DEUX directions, et ${O} est le milieu de chaque segment.\n\nConclusion : oui, c'est bien la symétrie de centre ${O}.`
            : horizontalMiroir
              ? "Calcul : ⚠️ la figure a été retournée comme dans un MIROIR horizontal : les sommets ont changé de côté en hauteur, mais pas à gauche-droite.\n\nConclusion : non. ⭐ Miroir et demi-tour retournent tous les deux la figure — c'est pourquoi on les confond, et c'est pourquoi il faut suivre un point plutôt que regarder l'allure générale."
              : "Calcul : ⚠️ la figure a été retournée comme dans un MIROIR vertical : les sommets ont changé de côté à gauche-droite, mais pas en hauteur.\n\nConclusion : non. ⭐ Miroir et demi-tour retournent tous les deux la figure — c'est pourquoi on les confond, et c'est pourquoi il faut suivre un point plutôt que regarder l'allure générale."),
        canvas: transformationCanvas({
          transformation: "symetrie_centrale",
          grid: { rows: k.rows, cols: k.cols },
          source: { label: "F", points: k.g[0] },
          image: { label: "F'", points: k.g[1] },
          center: { point: k.g[2][0], label: O },
        }),
      };
    },
  },
  {
    kind: "fixed",
    id: "4e_sym_centrale_open_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_centrale",
    difficulty: 3,
    theme: "neutral",
    // ⛔ 08/10/2026 : question ouverte à mots-clés (« 180 » seul suffisait) → QCM sur les mêmes pièges.
    text: "Pourquoi une symétrie centrale est-elle aussi appelée « demi-tour » ?",
    format: "qcm",
    choices: [
      "parce qu’elle fait tourner la figure de 180° autour du centre",
      "parce qu’elle fait tourner la figure de 90° autour du centre",
      "parce qu’elle retourne la figure comme dans un miroir",
      "parce qu’elle déplace la figure de la moitié de sa longueur",
    ],
    expected: ["parce qu’elle fait tourner la figure de 180° autour du centre"],
    comparator: "mcq_exact",
    hint: "Pense à une rotation de 180°.",
    explanation:
      "Définition : une symétrie centrale de centre O équivaut à une rotation de 180° autour de O.\n\n" +
      "Méthode : on imagine la figure qui pivote d’un demi-tour autour de O.\n\n" +
      "Calcul : 180° correspond à un demi-tour complet.\n\n" +
      "Conclusion : la symétrie centrale est un demi-tour autour du centre.",
    tags: ["transformation", "symetrie_centrale", "open"],
  },

  // ---------- SYM_TRANSLATION ----------
  {
    kind: "fixed",
    id: "4e_sym_translation_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_translation",
    difficulty: 1,
    theme: "neutral",
    text: "Lors d’une translation, l’orientation de la figure…",
    format: "qcm",
    choices: ["ne change pas", "tourne de 90°", "fait un demi-tour", "est inversée comme un miroir"],
    expected: ["ne change pas"],
    comparator: "mcq_exact",
    hint: "La figure glisse sans tourner.",
    explanation:
      "Définition : une translation est un glissement, sans rotation.\n\n" +
      "Méthode : on observe l’orientation avant et après.\n\n" +
      "Calcul : la figure garde la même orientation.\n\n" +
      "Conclusion : l’orientation ne change pas.",
    tags: ["transformation", "translation", "qcm"],
  },
  {
    kind: "fixed",
    id: "4e_sym_translation_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_translation",
    difficulty: 2,
    theme: "neutral",
    text: "Une translation est définie par…",
    format: "qcm",
    choices: ["un vecteur (déplacement)", "un centre et un angle", "un axe", "un rapport"],
    expected: ["un vecteur (déplacement)"],
    comparator: "mcq_exact",
    hint: "Direction, sens et longueur du glissement.",
    explanation:
      "Définition : une translation est définie par un vecteur (déplacement).\n\n" +
      "Méthode : le vecteur donne la direction, le sens et la longueur.\n\n" +
      "Calcul : tous les points suivent ce même vecteur.\n\n" +
      "Conclusion : une translation est définie par un vecteur.",
    tags: ["transformation", "translation", "qcm"],
  },
  {
    kind: "template",
    id: "4e_sym_translation_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_translation",
    difficulty: 3,
    theme: "neutral",
    hint: "Vers la droite : on ajoute à l’abscisse ; vers le bas : on RETIRE à l’ordonnée.",
    tags: ["transformation", "translation", "coordonnees", "template"],
    generate: () => {
      // ⚠️ L'ORDONNÉE DE DÉPART MONTE À 4 depuis le 30/08/2026. Le déplacement
      // se fait vers le BAS, donc on RETIRE : avec y ∈ {0,1,2} et dy jusqu'à 2,
      // l'image serait tombée sous l'axe, ce qui n'est pas faux mais n'est plus
      // la même question — les relatifs s'y invitent. On part donc assez haut
      // pour rester dans le premier quadrant.
      const dy = randomChoice([1, 2, 3]);
      const x = randomChoice([0, 1, 2, 3, 4, 5]);
      const y = randomChoice([dy, dy + 1, dy + 2, dy + 3]);
      const dx = randomChoice([2, 3, 4, 5]);
      const [P] = shuffle(LETTRES);
      const ctx = randomChoice(MOBILES);
      const depl = `${nb(dx, "carreau", "carreaux")} vers la droite et ${dy} vers le bas`;
      const text = randomChoice([
        `${ctx.intro} ${cap(ctx.qui)} part du point ${P}${co(x, y)} et descend en diagonale : ${depl}, sans tourner. Quelles sont les coordonnées de son point d'arrivée ${P}' ?`,
        `${ctx.intro} Le point ${P}${co(x, y)} ${de(ctx.qui)} subit une translation de ${depl}. Où arrive-t-il ? Donne les coordonnées de ${P}'.`,
        `${ctx.intro} Quelles sont les coordonnées de ${P}', image du point ${P}${co(x, y)} par la translation de ${depl} ?`,
        `${ctx.intro} Par une translation, ${ctx.qui} passe du point ${P}${co(x, y)} au point ${P}', ${dx} carreaux plus à droite et ${dy} plus bas. Calcule les coordonnées de ${P}'.`,
      ]);
      return {
        text,
        format: "qcm",
        // Quand A est à l'origine, « on a pris le déplacement pour l'image »
        // tombe sur la bonne réponse : d'où le piège des coordonnées
        // interverties, gardé en réserve.
        choices: makeChoices(`(${x + dx};${y - dy})`, [
          `(${x - dx};${y - dy})`,
          `(${x + dx};${y + dy})`,
          `(${dx};${dy})`,
          `(${y - dy};${x + dx})`,
          // Cinquième piège : sur certains tirages, les DEUX précédents tombent
          // en même temps sur la bonne réponse. Celui-ci — « on a soustrait des
          // deux côtés » — n'y tombe jamais.
          `(${x - dx};${y + dy})`,
        ]),
        expected: [`(${x + dx};${y - dy})`],
        comparator: "mcq_exact",
        explanation:
          "Définition : une translation déplace tous les points de la même façon.\n\n" +
          `Méthode : vers la droite, on AJOUTE ${dx} à l’abscisse ; vers le bas, on RETIRE ${dy} à l’ordonnée.\n\n` +
          `Calcul : ${x} + ${dx} = ${x + dx} et ${y} − ${dy} = ${y - dy}, donc ${P}(${x};${y}) devient ${P}'(${x + dx};${y - dy}).\n\n` +
          `Conclusion : les coordonnées de ${P}' sont (${x + dx};${y - dy}). ⚠️ (${x + dx};${y + dy}) est le piège : c'est ce qu'on obtient en comptant l'ordonnée vers le BAS, comme sur un écran d'ordinateur. Dans un repère, l'axe des ordonnées monte.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "4e_sym_translation_open_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_translation",
    difficulty: 3,
    theme: "neutral",
    // ⛔ 08/10/2026 : question ouverte à mots-clés → QCM sur les mêmes pièges.
    text: "Que faut-il connaître pour décrire complètement le déplacement d’une translation (sa flèche) ?",
    format: "qcm",
    choices: [
      "sa direction, son sens et sa longueur",
      "seulement sa longueur",
      "sa direction et sa longueur, mais pas son sens",
      "un centre et un angle",
    ],
    expected: ["sa direction, son sens et sa longueur"],
    comparator: "mcq_exact",
    hint: "Trois informations : direction, sens, longueur.",
    explanation:
      "Définition : le vecteur d’une translation indique le déplacement à appliquer à chaque point.\n\n" +
      "Méthode : il précise la direction, le sens et la longueur du glissement.\n\n" +
      "Calcul : tous les points subissent ce même vecteur.\n\n" +
      "Conclusion : le vecteur donne la direction, le sens et la longueur du déplacement.",
    tags: ["transformation", "translation", "open"],
  },

  // ---------- SYM_ROTATION ----------
  {
    kind: "fixed",
    id: "4e_sym_rotation_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_rotation",
    difficulty: 2,
    theme: "neutral",
    text: "Une rotation de 360° autour d’un point ramène la figure…",
    format: "qcm",
    choices: [
      "à sa position de départ",
      "à un demi-tour",
      "à un quart de tour",
      "vers un agrandissement",
    ],
    expected: ["à sa position de départ"],
    comparator: "mcq_exact",
    hint: "360° = un tour complet.",
    explanation:
      "Définition : une rotation de 360° est un tour complet.\n\n" +
      "Méthode : on imagine la figure qui revient à son point de départ.\n\n" +
      "Calcul : un tour complet ne change pas la position.\n\n" +
      "Conclusion : la figure revient à sa position de départ.",
    tags: ["transformation", "rotation", "qcm"],
  },
  {
    kind: "template",
    id: "4e_sym_rotation_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_rotation",
    difficulty: 3,
    theme: "neutral",
    hint: "Une rotation conserve la distance au centre, pas la position.",
    tags: ["transformation", "rotation", "distance", "template"],
    generate: () =>
      questionDistanceRotation((O, P) => [
        `Combien mesure ${O}${P}' ?`,
        `Après la rotation, quelle distance sépare ${P}' du centre ${O} ?`,
        `Calcule la longueur ${O}${P}'.`,
      ]),
  },
  {
    kind: "fixed",
    id: "4e_sym_rotation_open_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_rotation",
    difficulty: 3,
    theme: "neutral",
    // ⛔ 08/10/2026 : question ouverte à mots-clés → QCM sur les mêmes pièges.
    text: "Quelles informations faut-il pour définir une rotation ?",
    format: "qcm",
    choices: [
      "un centre, un angle et un sens de rotation",
      "seulement un angle",
      "un axe et une distance",
      "une direction, un sens et une longueur",
    ],
    expected: ["un centre, un angle et un sens de rotation"],
    comparator: "mcq_exact",
    hint: "Trois éléments dont le centre.",
    explanation:
      "Définition : une rotation est définie par un centre, un angle et un sens.\n\n" +
      "Méthode : on précise autour de quel point, de combien de degrés et dans quel sens.\n\n" +
      "Calcul : ces trois éléments déterminent complètement la rotation.\n\n" +
      "Conclusion : il faut le centre, l’angle et le sens de rotation.",
    tags: ["transformation", "rotation", "open"],
  },

  // ---------- SYM_TRANSFORMATION_PROPRIETE ----------
  {
    kind: "fixed",
    id: "4e_sym_transformation_propriete_fixed_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_transformation_propriete",
    difficulty: 2,
    theme: "neutral",
    text: "Une symétrie centrale conserve-t-elle l’aire d’une figure ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Ces transformations ne déforment pas la figure.",
    explanation:
      "Définition : une symétrie centrale est une isométrie.\n\n" +
      "Méthode : on compare la figure et son image.\n\n" +
      "Calcul : les longueurs sont conservées, donc l’aire aussi.\n\n" +
      "Conclusion : oui, l’aire est conservée.",
    tags: ["transformation", "propriete", "aire", "qcm"],
  },
  {
    kind: "template",
    id: "4e_sym_transformation_propriete_tpl_3_perimetre",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_transformation_propriete",
    difficulty: 3,
    theme: "neutral",
    hint: "Le périmètre est conservé par ces transformations.",
    tags: ["transformation", "propriete", "perimetre", "template"],
    generate: () => {
      const o = randomChoice(PERIMETRES_OBJETS);
      const p = randomInt(o.min, o.max);
      const t = tirerTransfo();
      const question = randomChoice([
        "Quel est le périmètre de l'image ?",
        `Combien de ${o.uMot} mesure le périmètre de la figure image ?`,
        "Que vaut le périmètre de la figure obtenue ?",
        "Donne le périmètre de l'image.",
      ]);
      return {
        text: `${o.s(p)} On applique ${t.nom} à cette forme. ${question}`,
        format: "short",
        expected: [`${p} ${o.u}`],
        comparator: "number_equal",
        explanation:
          `Définition : ${t.court} conserve les longueurs, donc le périmètre.\n\n` +
          "Méthode : on identifie que la figure n'est pas déformée : chaque côté garde sa longueur.\n\n" +
          `Calcul : le périmètre de départ est ${p} ${o.u}, celui de l'image aussi.\n\n` +
          `Conclusion : le périmètre image est ${p} ${o.u}.`,
      };
    },
  },

  // ---------- SYM_TRANSFORMATION_DEFIS ----------
  {
    kind: "fixed",
    id: "4e_sym_transformation_defi_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_transformation_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Une figure est retournée comme dans un miroir par rapport à une droite. Quelle transformation est-ce ?",
    format: "qcm",
    choices: ["symétrie axiale", "translation", "rotation", "symétrie centrale"],
    expected: ["symétrie axiale"],
    comparator: "mcq_exact",
    hint: "Effet miroir = axe.",
    explanation:
      "Définition : un effet miroir par rapport à une droite est une symétrie axiale.\n\n" +
      "Méthode : on repère la droite-miroir.\n\n" +
      "Calcul : la figure est retournée par rapport à l’axe.\n\n" +
      "Conclusion : c’est une symétrie axiale.",
    tags: ["transformation", "defi", "symetrie_axiale", "qcm"],
  },
  {
    kind: "fixed",
    id: "4e_sym_transformation_defi_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_transformation_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Une figure subit une symétrie axiale puis une autre symétrie axiale. Les longueurs sont-elles conservées ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Chaque symétrie axiale conserve les longueurs.",
    explanation:
      "Définition : une symétrie axiale est une isométrie.\n\n" +
      "Méthode : on enchaîne deux transformations qui conservent chacune les longueurs.\n\n" +
      "Calcul : si chaque étape conserve les longueurs, la composition aussi.\n\n" +
      "Conclusion : oui, les longueurs sont conservées.",
    tags: ["transformation", "defi", "successives", "qcm"],
  },
  {
    kind: "template",
    id: "4e_sym_transformation_defi_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_transformation_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Associe l’indice visuel à la bonne transformation.",
    tags: ["transformation", "defi", "template"],
    // ⭐ 03/10/2026 : le jumeau de `defi_tpl_1` (mêmes phrases, mêmes
    // réponses) devient une lecture de DESSIN : la figure a glissé, a été
    // retournée, a fait un demi-tour ou un quart de tour — et rien d'autre que
    // la figure ne le dit (ni axe, ni centre, ni titre).
    generate: () => {
      const fig = randomChoice(FIGURES_SYM);
      const [le, du, bleu] = [leF(fig), duF(fig), bleuF(fig)];
      const T = "translation";
      const A = "symétrie axiale";
      const C = "symétrie centrale";
      const R = "rotation d'un quart de tour";
      const r = randomChoice([T, A, C, R]);
      const c = { x: 5, y: 5 };
      const source = autourDe(fig, c);
      // Le décalage et le sens du quart de tour se tirent UNE fois pour toute la figure.
      const decalage = randomInt(0, 2);
      const quart = Math.random() < 0.5 ? quartHoraire : quartAntiHoraire;
      const image =
        r === T ? source.map((p) => ({ x: p.x + largeur(fig.points) + 2, y: p.y + decalage }))
        : r === A ? source.map((p) => ({ x: 2 * c.x - p.x, y: p.y }))
        : r === C ? source.map((p) => demiTour(p, c))
        : source.map((p) => quart(p, c));
      const k = cadrer([source, image]);
      const question = randomChoice([
        `Quelle transformation envoie ${le} ${bleu} sur ${le} rouge ?`,
        `${cap(le)} rouge est l'image ${du} ${bleu}. Par quelle transformation ?`,
        `Observe bien l'orientation ${du} rouge. Quelle transformation a été appliquée ${aa(le)} ${bleu} ?`,
        `Sans axe ni centre dessiné, reconnais la transformation qui fait passer ${du} ${bleu} ${auF(fig)} rouge.`,
      ]);
      const pourquoi =
        r === T ? "la figure garde exactement la même orientation : elle a seulement glissé"
        : r === A ? "la figure est retournée comme dans un miroir : sa gauche est devenue sa droite"
        : r === C ? "la figure est la tête en bas, et ni retournée en miroir ni simplement couchée : c'est un demi-tour"
        : "la figure est « couchée » : ce qui était vertical est devenu horizontal, sans être retourné";
      return {
        text: randomChoice(DECORS) + question,
        format: "qcm",
        choices: shuffle([T, A, C, R]),
        expected: [r],
        comparator: "mcq_exact",
        explanation:
          "Définition : chaque transformation a un indice : glissement = translation ; miroir = symétrie axiale ; demi-tour = symétrie centrale ; quart de tour = rotation de 90°.\n\n" +
          "Méthode : on compare l'ORIENTATION des deux figures : même sens, retournée, à l'envers, ou couchée.\n\n" +
          `Calcul : ici, ${pourquoi}.\n\n` +
          `Conclusion : la transformation est une ${r}.`,
        canvas: transformationCanvas({
          transformation: r === T ? "translation" : r === A ? "symetrie_axiale" : r === C ? "symetrie_centrale" : "rotation",
          grid: { rows: k.rows, cols: k.cols },
          source: { label: "F", points: k.g[0] },
          image: { label: "F'", points: k.g[1] },
          display: { showTransformationInfo: false },
        }),
      };
    },
  },
  {
    kind: "fixed",
    id: "4e_sym_transformation_defi_open_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_transformation_defi",
    difficulty: 5,
    theme: "neutral",
    // ⛔ 08/10/2026 : question ouverte à mots-clés → QCM sur les mêmes pièges.
    text: "Pourquoi les transformations vues en 4e (symétries, translation, rotation) ne changent-elles pas la taille des figures ?",
    format: "qcm",
    choices: [
      "parce qu’elles conservent les longueurs : elles déplacent la figure sans la déformer",
      "parce qu’elles conservent seulement les angles",
      "parce que l’image est toujours tracée au même endroit",
      "elles la changent : l’image est toujours plus grande",
    ],
    expected: ["parce qu’elles conservent les longueurs : elles déplacent la figure sans la déformer"],
    comparator: "mcq_exact",
    hint: "Pense à ce que ces transformations conservent.",
    explanation:
      "Définition : ces transformations sont des isométries.\n\n" +
      "Méthode : elles déplacent ou retournent la figure sans la déformer.\n\n" +
      "Calcul : les longueurs et les angles sont conservés, donc la taille ne change pas.\n\n" +
      "Conclusion : la taille est inchangée car les longueurs sont conservées.",
    tags: ["transformation", "defi", "open"],
  },
  {
    kind: "template",
    id: "4e_sym_transformation_defi_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_transformation_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Un motif répété par glissement régulier.",
    tags: ["transformation", "defi", "frise", "template"],
    // ⭐ 03/10/2026 : la frise n'était faite que de glissements (réponse
    // toujours « translation »). Une frise se construit aussi par miroirs ou
    // par demi-tours — c'est ce qui en fait un défi.
    generate: () => {
      const support = randomChoice(FRISES);
      const motif = randomChoice(MOTIFS);
      const dx = randomInt(2, 9);
      const rel = randomChoice([
        { r: "translation", d: `chaque motif est recopié ${dx} cm plus à droite, sans tourner ni se retourner`, pq: "le motif garde la même orientation et avance toujours de la même longueur" },
        { r: "translation", d: `on fait glisser le motif de ${dx} cm vers la droite pour obtenir le suivant`, pq: "le motif glisse sans tourner, toujours du même déplacement" },
        { r: "symétrie axiale", d: "chaque motif est le reflet du précédent dans un miroir vertical placé entre les deux", pq: "le motif est retourné comme dans un miroir, de part et d'autre d'une droite" },
        { r: "symétrie axiale", d: "on plie la bande entre deux motifs : chaque motif se superpose exactement au précédent", pq: "le pli joue le rôle d'un axe de symétrie" },
        { r: "symétrie centrale", d: "chaque motif est le précédent tourné d'un demi-tour autour d'un point situé entre les deux", pq: "un demi-tour autour d'un point, c'est une symétrie centrale" },
        { r: "symétrie centrale", d: "chaque motif est le précédent mis tête en bas par un demi-tour autour d'un point placé au milieu", pq: "un demi-tour autour d'un point, c'est une symétrie centrale" },
      ]);
      const question = randomChoice([
        "Quelle transformation fait passer d'un motif au suivant ?",
        "Quelle transformation est utilisée ?",
        "De quelle transformation s'agit-il ?",
        "Quelle transformation permet de construire cette frise ?",
      ]);
      return {
        text: `${support}, ${motif} est reproduit plusieurs fois : ${rel.d}. ${question}`,
        format: "qcm",
        choices: makeChoices(rel.r, MAUVAISES_REPONSES[rel.r]),
        expected: [rel.r],
        comparator: "mcq_exact",
        explanation:
          "Définition : une frise répète un motif ; le passage d'un motif au suivant est une transformation.\n\n" +
          "Méthode : glissement = translation ; miroir ou pliage = symétrie axiale ; demi-tour = symétrie centrale.\n\n" +
          `Calcul : ici, ${rel.pq}.\n\n` +
          `Conclusion : la transformation est une ${rel.r}.`,
      };
    },
  },

  /* =========================================================
     GABARITS DU 03/10/2026 — une étoile qui n'avait que du figé
     (sym_axiale ★3, sym_centrale ★1, sym_translation ★1,
     sym_rotation ★2, propriété ★2, défi ★5) reçoit ses générateurs.
  ========================================================= */

  {
    kind: "template",
    id: "4e_sym_axiale_tpl_5_coordonnees",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_axiale",
    difficulty: 3,
    theme: "neutral",
    hint: "Le point et son image sont à la même distance de l'axe, de part et d'autre ; l'autre coordonnée ne bouge pas.",
    tags: ["transformation", "symetrie_axiale", "coordonnees", "template"],
    generate: () => {
      const [P] = shuffle(LETTRES);
      const axe = randomChoice(AXES);
      const vertical = Math.random() < 0.5;
      const a = randomInt(3, 7);
      // u ≥ 1 : un point SUR l'axe des ordonnées faisait coïncider trois pièges.
      const u = randomInt(1, a - 1);
      const w = randomInt(1, 6);
      const img = 2 * a - u;
      const pt = vertical ? co(u, w) : co(w, u);
      const pv = (k: number) => (vertical ? co(k, w) : co(w, k));
      const bon = pv(img);
      const desc = vertical
        ? `la droite verticale formée des points d'abscisse ${a}`
        : `la droite horizontale formée des points d'ordonnée ${a}`;
      const intro = randomChoice([
        "Dans un jeu vidéo, un personnage se reflète dans un lac.",
        "Sur un plan quadrillé, un architecte dessine une façade symétrique.",
        "Pour un logo symétrique, une graphiste repère ses points.",
        "Sur une carte au trésor quadrillée, le trésor a un double caché.",
        "Un robot dessinateur trace un motif de carrelage symétrique.",
        "Une brodeuse repère les points d'un motif de tissu.",
        "Pour un vitrail, un artisan place les sommets sur un quadrillage.",
        "Sur un écran, une appli de dessin fonctionne en mode miroir.",
        "Dans un jardin à la française, un paysagiste place les massifs.",
        "Dans un logiciel de géométrie, on construit le symétrique d'un point.",
        "",
      ]);
      const t = randomChoice([
        `Dans un repère, ${P}${pt} a pour image ${P}' par la symétrie d'axe ${axe}, ${desc}. Quelles sont les coordonnées de ${P}' ?`,
        `On note ${axe} ${desc}. Donne les coordonnées du symétrique ${P}' du point ${P}${pt} par rapport à ${axe}.`,
        `Le point ${P}${pt} se reflète dans le miroir ${axe}, qui est ${desc}. Où se trouve son reflet ${P}' ?`,
        `Calcule les coordonnées de ${P}', image de ${P}${pt} par la symétrie d'axe ${axe} (${desc}).`,
      ]);
      const ecart = a - u;
      return {
        text: intro ? `${intro} ${t}` : t,
        format: "qcm",
        choices: makeChoices(bon, [
          pv(a - u),
          pv(a + u),
          pv(2 * a + u),
          vertical ? co(u, img) : co(img, u),
          vertical ? co(w, img) : co(img, w),
          pt,
          pv(a),
        ]),
        expected: [bon],
        comparator: "mcq_exact",
        explanation:
          `Définition : par la symétrie d'axe ${axe}, ${P} et ${P}' sont à la même distance de l'axe, de part et d'autre, sur une perpendiculaire à l'axe.\n\n` +
          `Méthode : seule ${vertical ? "l'abscisse" : "l'ordonnée"} change ; ${vertical ? "l'ordonnée" : "l'abscisse"} reste ${w}.\n\n` +
          `Calcul : ${P} est à ${a} − ${u} = ${nb(ecart, "unité")} de l'axe, donc ${P}' est à ${a} + ${ecart} = ${img}.\n\n` +
          `Conclusion : ${P}'${bon}. ⚠️ Ne pas s'arrêter à ${ecart} : c'est la DISTANCE à l'axe, pas la position de l'image.`,
      };
    },
  },

  {
    kind: "template",
    id: "4e_sym_axiale_tpl_6_juger",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_axiale",
    difficulty: 3,
    theme: "neutral",
    hint: "L'axe est la médiatrice de [PP'] ; la symétrie conserve longueurs, angles et aires.",
    tags: ["transformation", "symetrie_axiale", "erreur", "template"],
    generate: () => {
      const [P, Q, R] = shuffle(LETTRES).slice(0, 3);
      const axe = randomChoice(AXES);
      const { p: prenom, il } = randomChoice(PRENOMS);
      const d = randomInt(2, 9);
      const l = randomInt(3, 12);
      const al = randomChoice([35, 40, 50, 65, 70, 110, 125]);
      const s = randomInt(6, 40);
      const affirmation = randomChoice([
        { c: `${P} est à ${d} cm de l'axe ${axe}, donc ${P}${P}' = ${d} cm.`, vrai: false, why: `${P}${P}' = ${d} + ${d} = ${2 * d} cm : il faut compter les deux côtés de l'axe` },
        { c: `${P} est à ${d} cm de l'axe ${axe}, donc ${P}${P}' = ${2 * d} cm.`, vrai: true, why: `${P} et ${P}' sont chacun à ${d} cm de l'axe, de part et d'autre : ${d} + ${d} = ${2 * d} cm` },
        { c: `[${P}${Q}] mesure ${l} cm, donc [${P}'${Q}'] mesure aussi ${l} cm.`, vrai: true, why: "une symétrie axiale conserve les longueurs" },
        { c: `[${P}${Q}] mesure ${l} cm, donc [${P}'${Q}'] mesure ${2 * l} cm, puisqu'on a ajouté l'image.`, vrai: false, why: `l'image a la même longueur que le segment de départ : ${l} cm` },
        { c: `L'angle ${P}${Q}${R} mesure ${al}°, donc l'angle image mesure ${180 - al}°, car la figure est retournée.`, vrai: false, why: `une symétrie axiale conserve les angles : l'angle image mesure ${al}°` },
        { c: `L'angle ${P}${Q}${R} mesure ${al}°, donc l'angle ${P}'${Q}'${R}' mesure aussi ${al}°.`, vrai: true, why: "une symétrie axiale conserve les angles" },
        { c: `Le point ${P} est sur l'axe ${axe}, donc son image ${P}' est le point ${P} lui-même.`, vrai: true, why: "un point de l'axe est à une distance nulle de l'axe : il est sa propre image" },
        { c: `${P}' est à ${d} cm de l'axe ${axe}, donc ${P} est à ${2 * d} cm de l'axe.`, vrai: false, why: `${P} et ${P}' sont à la même distance de l'axe : ${d} cm` },
        { c: `La figure a une aire de ${s} cm², donc son image a aussi une aire de ${s} cm².`, vrai: true, why: "une symétrie axiale ne déforme pas : l'aire est conservée" },
        { c: `Le segment [${P}${P}'] est perpendiculaire à l'axe ${axe}.`, vrai: true, why: `l'axe est la médiatrice de [${P}${P}'], donc il lui est perpendiculaire` },
        { c: `Le segment [${P}${P}'] est parallèle à l'axe ${axe}.`, vrai: false, why: `l'axe est la médiatrice de [${P}${P}'] : il lui est perpendiculaire, pas parallèle` },
      ]);
      const objet = randomChoice([
        "un logo", "un motif de tissu", "un carreau de faïence", "un vitrail", "une aile de papillon dessinée",
        "une feuille pliée", "le plan d'un jardin", "un pochoir", "une frise", "une figure de géométrie",
      ]);
      const question = randomChoice([`A-t-${il} raison ?`, "Est-ce exact ?", "Cette affirmation est-elle juste ?"]);
      return {
        text: `Sur ${objet}, on applique la symétrie d'axe ${axe} ; l'image d'un point est notée avec un prime. ${prenom} affirme : « ${affirmation.c} » ${question}`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: [affirmation.vrai ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation:
          `Définition : dans la symétrie d'axe ${axe}, l'axe est la médiatrice du segment qui relie un point à son image ; les longueurs, les angles et les aires sont conservés.\n\n` +
          `Méthode : on confronte l'affirmation de ${prenom} à ces propriétés.\n\n` +
          `Calcul : ${affirmation.why}.\n\n` +
          `Conclusion : ${prenom} a ${affirmation.vrai ? "raison" : "tort"}.`,
      };
    },
  },

  {
    kind: "template",
    id: "4e_sym_centrale_tpl_5_objets",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_centrale",
    difficulty: 1,
    theme: "neutral",
    hint: "Un demi-tour autour d'un point, c'est une symétrie centrale ; un miroir, une symétrie axiale.",
    tags: ["transformation", "symetrie_centrale", "reconnaitre", "template"],
    generate: () => {
      const C = "une symétrie centrale";
      const A = "une symétrie axiale";
      const T = "une translation";
      const R = "une rotation d'un quart de tour";
      const s = randomChoice([
        { s: "Sur une carte à jouer, la moitié du bas de la dame de pique est l'image de la moitié du haut par un demi-tour autour du centre de la carte.", r: C },
        { s: "Une éolienne a deux pales : on passe d'une pale à l'autre en tournant de 180° autour du moyeu.", r: C },
        { s: "Sur une roue de vélo, le catadioptre est fixé à l'opposé de la valve, à la même distance du centre de la roue.", r: C },
        { s: "Une hélice d'avion à deux pales tourne d'un demi-tour : chaque pale prend la place de l'autre.", r: C },
        { s: "Sur une balançoire à bascule, les deux sièges sont de part et d'autre du pivot, alignés avec lui et à la même distance.", r: C },
        { s: "La lettre S, tournée de 180° autour de son centre, se superpose à elle-même.", r: C },
        { s: "Un domino posé sur la table est tourné d'un demi-tour autour de son centre.", r: C },
        { s: "Un motif de tissu est imprimé tête-bêche : chaque fleur a sa jumelle à l'opposé du centre du motif.", r: C },
        { s: "Sur une pizza, deux olives sont placées de part et d'autre du centre, alignées avec lui et à la même distance.", r: C },
        { s: "Un ventilateur de plafond a deux pales : l'une est l'image de l'autre par un demi-tour autour de l'axe.", r: C },
        { s: "Sur une grande roue, deux nacelles sont diamétralement opposées.", r: C },
        { s: "Un papillon replie ses ailes : l'aile gauche se superpose exactement à l'aile droite.", r: A },
        { s: "Un arbre se reflète dans l'eau calme d'un lac.", r: A },
        { s: "Sur un tapis roulant, une valise avance tout droit sans tourner.", r: T },
        { s: "Dans une frise, chaque motif est recopié un peu plus à droite, sans tourner ni se retourner.", r: T },
        { s: "La grande aiguille d'une montre passe du 12 au 3.", r: R },
      ]);
      const question = randomChoice([
        "Quelle transformation fait passer de l'un à l'autre ?",
        "Quelle transformation reconnaît-on ?",
        "De quelle transformation s'agit-il ?",
        "Quelle transformation est en jeu ici ?",
      ]);
      const pourquoi =
        s.r === C ? "un point et son image sont de part et d'autre d'un centre, alignés avec lui et à la même distance : c'est un demi-tour"
        : s.r === A ? "on retrouve l'effet d'un miroir, de part et d'autre d'une droite"
        : s.r === T ? "tout glisse de la même façon, sans tourner"
        : "l'aiguille tourne de 90° autour du centre du cadran";
      return {
        text: `${s.s} ${question}`,
        format: "qcm",
        choices: shuffle([C, A, T, R]),
        expected: [s.r],
        comparator: "mcq_exact",
        explanation:
          "Définition : une symétrie centrale est un DEMI-TOUR autour d'un point : le centre est le milieu de chaque segment qui relie un point à son image.\n\n" +
          "Méthode : on cherche ce qui reste fixe — un point (demi-tour ou rotation), une droite (miroir) ou rien (glissement).\n\n" +
          `Calcul : ici, ${pourquoi}.\n\n` +
          `Conclusion : c'est ${s.r}.`,
      };
    },
  },

  {
    kind: "template",
    id: "4e_sym_translation_tpl_5_objets",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_translation",
    difficulty: 1,
    theme: "neutral",
    hint: "Un glissement sans tourner, c'est une translation.",
    tags: ["transformation", "translation", "reconnaitre", "template"],
    generate: () => {
      const T = "une translation";
      const R = "une rotation";
      const A = "une symétrie axiale";
      const C = "une symétrie centrale";
      const s = randomChoice([
        { s: "La cabine d'un ascenseur monte du rez-de-chaussée au troisième étage.", r: T },
        { s: "Sur un tapis roulant d'aéroport, une valise avance tout droit sans tourner.", r: T },
        { s: "Une porte coulissante de placard glisse le long de son rail.", r: T },
        { s: "On ouvre un tiroir en le tirant tout droit vers soi.", r: T },
        { s: "Dans une frise, chaque motif est recopié 4 cm plus loin, sans tourner ni se retourner.", r: T },
        { s: "Une cabine de téléphérique glisse le long d'un câble bien droit, sans tourner.", r: T },
        { s: "Dans un jeu de type Tetris, une pièce descend de 5 cases sans tourner.", r: T },
        { s: "Sur un papier peint, le même motif se répète tous les 50 cm vers le bas.", r: T },
        { s: "Un wagon roule sur une voie parfaitement droite.", r: T },
        { s: "Sur une tablette, on fait glisser une icône vers la droite avec le doigt, sans la faire tourner.", r: T },
        { s: "Aux échecs, une tour avance de 3 cases tout droit.", r: T },
        { s: "La grande aiguille d'une montre passe du 12 au 3.", r: R },
        { s: "Une nacelle de grande roue tourne autour du centre de la roue.", r: R },
        { s: "Le sommet d'une montagne se reflète dans un lac.", r: A },
        { s: "Une carte à jouer est tournée d'un demi-tour autour de son centre.", r: C },
      ]);
      const question = randomChoice([
        "Quelle transformation reconnaît-on ?",
        "Quelle transformation modélise ce mouvement ?",
        "De quelle transformation s'agit-il ?",
        "Quelle transformation fait passer de la position de départ à celle d'arrivée ?",
      ]);
      const pourquoi =
        s.r === T ? "l'objet glisse sans tourner : tous ses points font le même déplacement"
        : s.r === R ? "l'objet tourne autour d'un point fixe"
        : s.r === A ? "l'eau agit comme un miroir"
        : "un demi-tour autour d'un point est une symétrie centrale";
      return {
        text: `${s.s} ${question}`,
        format: "qcm",
        // ⚠️ 08/10 : un demi-tour EST une rotation : « une rotation » était alors une seconde bonne réponse.
        choices: shuffle([T, s.r === C ? "une rotation d'un quart de tour" : R, A, C]),
        expected: [s.r],
        comparator: "mcq_exact",
        explanation:
          "Définition : une translation est un GLISSEMENT : tous les points se déplacent de la même façon (même direction, même sens, même longueur), sans tourner.\n\n" +
          "Méthode : on se demande si l'objet tourne, se retourne, ou glisse seulement.\n\n" +
          `Calcul : ici, ${pourquoi}.\n\n` +
          `Conclusion : c'est ${s.r}.`,
      };
    },
  },

  {
    kind: "template",
    id: "4e_sym_rotation_tpl_5_angles",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_rotation",
    difficulty: 2,
    theme: "neutral",
    hint: "Un tour complet fait 360° : on partage 360° en parts égales.",
    tags: ["transformation", "rotation", "angle", "template"],
    generate: () => {
      const gens: (() => { t: string; a: number; why: string })[] = [
        () => {
          const h1 = randomInt(1, 12);
          const k = randomInt(1, 6);
          const h2 = ((h1 + k - 1) % 12) + 1;
          return {
            t: `La grande aiguille d'une horloge passe du ${h1} au ${h2}, dans le sens des aiguilles d'une montre. ${randomChoice(["De quel angle a-t-elle tourné ?", "Quel est l'angle de cette rotation, en degrés ?"])}`,
            a: 30 * k,
            why: `entre deux nombres voisins du cadran, il y a 360° ÷ 12 = 30° ; ici ${nb(k, "intervalle")} : ${k} × 30° = ${30 * k}°`,
          };
        },
        () => {
          const n = randomChoice([5, 10, 15, 20, 25, 30, 40, 45]);
          return {
            t: `En ${n} minutes, de combien de degrés tourne la grande aiguille d'une montre ?`,
            a: 6 * n,
            why: `en 60 minutes elle fait un tour, soit 360° ÷ 60 = 6° par minute : ${n} × 6° = ${6 * n}°`,
          };
        },
        () => {
          const h = randomInt(1, 6);
          return {
            t: `Combien de degrés la petite aiguille d'une horloge parcourt-elle en ${nb(h, "heure")} ?`,
            a: 30 * h,
            why: `en 12 heures elle fait un tour, soit 360° ÷ 12 = 30° par heure : ${h} × 30° = ${30 * h}°`,
          };
        },
        () => {
          const s = randomChoice([5, 10, 15, 20, 30, 45]);
          return {
            t: `En ${s} secondes, de quel angle tourne la trotteuse d'une montre ?`,
            a: 6 * s,
            why: `en 60 secondes elle fait un tour, soit 6° par seconde : ${s} × 6° = ${6 * s}°`,
          };
        },
        () => {
          const N = randomChoice([8, 10, 12, 18, 20, 24]);
          const k = randomInt(1, 3);
          return {
            t: `Une grande roue porte ${N} nacelles régulièrement espacées. Elle tourne jusqu'à ce que chaque nacelle prenne la place de celle située ${nb(k, "rang")} plus loin. De quel angle a-t-elle tourné ?`,
            a: (360 / N) * k,
            why: `deux nacelles voisines sont séparées de 360° ÷ ${N} = ${360 / N}° ; ${k} × ${360 / N}° = ${(360 / N) * k}°`,
          };
        },
        () => {
          const N = randomChoice([18, 20, 24, 36]);
          return {
            t: `Une roue de vélo a ${N} rayons régulièrement espacés. Quel angle sépare deux rayons voisins ?`,
            a: 360 / N,
            why: `le tour complet, 360°, est partagé en ${N} parts égales : 360° ÷ ${N} = ${360 / N}°`,
          };
        },
        () => {
          const n = randomChoice([3, 4, 5, 6]);
          const o = randomChoice(["Une éolienne", "Un ventilateur", "Une hélice de bateau"]);
          return {
            t: `${o} a ${n} pales régulièrement espacées. De quel angle doit-${o.startsWith("Un ") ? "il" : "elle"} tourner, au minimum, pour qu'une pale prenne la place de la suivante ?`,
            a: 360 / n,
            why: `les ${n} pales partagent le tour complet en parts égales : 360° ÷ ${n} = ${360 / n}°`,
          };
        },
        () => {
          const N = randomChoice([6, 8, 10, 12]);
          const k = randomInt(1, 3);
          return {
            t: `Un manège porte ${N} chevaux de bois régulièrement espacés. Il tourne de ${nb(k, "place")} : de quel angle a-t-il tourné ?`,
            a: (360 / N) * k,
            why: `deux chevaux voisins sont séparés de 360° ÷ ${N} = ${360 / N}° ; ${k} × ${360 / N}° = ${(360 / N) * k}°`,
          };
        },
        () => {
          const faces = ["au nord", "à l'est", "au sud", "à l'ouest"];
          const i = randomInt(0, 3);
          const k = randomInt(1, 3);
          return {
            t: `Une randonneuse fait face ${faces[i]}. Elle tourne sur elle-même, dans le sens des aiguilles d'une montre, jusqu'à faire face ${faces[(i + k) % 4]}. De quel angle a-t-elle tourné ?`,
            a: 90 * k,
            why: `d'un point cardinal au suivant, on tourne d'un quart de tour, soit 90° ; ici ${nb(k, "quart")} de tour : ${k} × 90° = ${90 * k}°`,
          };
        },
        () => {
          const N = randomChoice([12, 18, 20, 24, 30, 36, 40]);
          const k = randomInt(1, 5);
          return {
            t: `Une roue dentée de ${N} dents tourne de ${nb(k, "dent")}. De quel angle a-t-elle tourné ?`,
            a: (360 / N) * k,
            why: `une dent correspond à 360° ÷ ${N} = ${360 / N}° ; ${k} × ${360 / N}° = ${(360 / N) * k}°`,
          };
        },
        () => {
          const n = randomChoice([5, 6, 8, 9, 10, 12]);
          return {
            t: `Un logo en forme de rosace a ${n} pétales identiques régulièrement répartis autour du centre. Quel est le plus petit angle de la rotation qui envoie chaque pétale sur le suivant ?`,
            a: 360 / n,
            why: `les ${n} pétales partagent le tour complet : 360° ÷ ${n} = ${360 / n}°`,
          };
        },
        () => {
          const f = randomChoice([
            { w: "un quart de tour", a: 90, c: "360° ÷ 4 = 90°" },
            { w: "un demi-tour", a: 180, c: "360° ÷ 2 = 180°" },
            { w: "trois quarts de tour", a: 270, c: "3 × (360° ÷ 4) = 3 × 90° = 270°" },
            { w: "un tiers de tour", a: 120, c: "360° ÷ 3 = 120°" },
            { w: "un sixième de tour", a: 60, c: "360° ÷ 6 = 60°" },
            { w: "un huitième de tour", a: 45, c: "360° ÷ 8 = 45°" },
          ]);
          const o = randomChoice([
            "Le plateau d'un four à micro-ondes", "Le volant d'une voiture", "Une toupie", "Une porte tournante",
            "Le tourniquet d'un parc", "Un disque sur une platine",
          ]);
          return {
            t: `${o} fait ${f.w}. Quel angle cela représente-t-il, en degrés ?`,
            a: f.a,
            why: `un tour complet fait 360°, donc ${f.w} fait ${f.c}`,
          };
        },
      ];
      const g = randomChoice(gens)();
      return {
        text: g.t,
        format: "short",
        expected: [`${g.a}°`],
        comparator: "number_equal",
        explanation:
          "Définition : une rotation est définie par un centre et un angle ; un tour complet fait 360°.\n\n" +
          "Méthode : on cherche quelle fraction du tour complet a été parcourue.\n\n" +
          `Calcul : ${g.why}.\n\n` +
          `Conclusion : l'angle de rotation est ${g.a}°.`,
      };
    },
  },

  {
    kind: "template",
    id: "4e_sym_transformation_propriete_tpl_4_conserve",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_transformation_propriete",
    difficulty: 2,
    theme: "neutral",
    hint: "Symétries, translations et rotations ne déforment pas : longueurs, angles, aires et périmètres restent les mêmes.",
    tags: ["transformation", "propriete", "conservation", "qcm", "template"],
    generate: () => {
      const v = 2 * randomInt(3, 30);
      const m = randomChoice([
        { sujets: ["Le côté d'un carreau de faïence", "Le mât d'un voilier dessiné", "Une rayure d'un motif de tissu", "Le bord d'une pièce de vitrail", "La grande aiguille d'une montre dessinée"], verbe: "mesure", u: " cm", quoi: "la longueur correspondante sur l'image", pro: "Elle", e: "e" },
        { sujets: ["Un carreau de faïence", "Un logo", "Sur le plan d'un jardin, un massif de fleurs", "La voile d'un bateau dessiné", "Une pièce de puzzle dessinée"], verbe: "a une aire de", u: " cm²", quoi: "l'aire de l'image", pro: "Elle", e: "e" },
        { sujets: ["Un angle d'un logo", "L'angle au sommet d'un toit dessiné", "Un angle d'une pièce de vitrail", "L'angle d'une part de pizza dessinée", "L'angle d'une pointe de flèche sur un tissu"], verbe: "mesure", u: "°", quoi: "l'angle correspondant sur l'image", pro: "Il", e: "" },
        { sujets: ["Un carreau de faïence", "Un panneau de signalisation dessiné", "Un timbre dessiné", "Une étiquette dessinée", "Sur un plan, un tapis"], verbe: "a un périmètre de", u: " cm", quoi: "le périmètre de l'image", pro: "Il", e: "" },
      ]);
      const t = tirerTransfo();
      const bon = `${m.pro} reste égal${m.e} à ${v}${m.u}`;
      const question = randomChoice([
        `Que peut-on dire ${de(m.quoi)} ?`,
        `Que devient ${m.quoi} ?`,
        `Quelle affirmation est vraie pour ${m.quoi} ?`,
      ]);
      return {
        text: `${randomChoice(m.sujets)} ${m.verbe} ${v}${m.u}. On lui applique ${t.nom}. ${question}`,
        format: "qcm",
        choices: makeChoices(bon, [
          `${m.pro} double : ${2 * v}${m.u}`,
          `${m.pro} est divisé${m.e} par 2 : ${v / 2}${m.u}`,
          "On ne peut pas savoir sans mesurer",
          `${m.pro} dépend de la position de l'image`,
        ]),
        expected: [bon],
        comparator: "mcq_exact",
        explanation:
          `Définition : ${t.court} ne déforme pas la figure : elle conserve les longueurs, les angles, les aires et les périmètres.\n\n` +
          "Méthode : on reconnaît la transformation, puis on applique la propriété de conservation — inutile de mesurer.\n\n" +
          `Calcul : au départ, ${v}${m.u} ; sur l'image, la même valeur : ${v}${m.u}.\n\n` +
          `Conclusion : ${bon.charAt(0).toLowerCase() + bon.slice(1)}.`,
      };
    },
  },

  {
    kind: "template",
    id: "4e_sym_transformation_defi_tpl_5_composees",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_transformation_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Enchaîne les deux transformations sur un seul point, puis regarde où il arrive.",
    tags: ["transformation", "defi", "successives", "template"],
    generate: () => {
      const O = randomChoice(CENTRES);
      const axe = randomChoice(AXES);
      const a = randomInt(2, 9);
      let b = randomInt(1, 8);
      if (b === a) b = a + 1;
      const RETOUR = "aucune : la figure revient à sa position de départ";
      const H = "dans le sens des aiguilles d'une montre";
      const al = randomChoice([30, 40, 45, 60]);
      const be = randomChoice([20, 50, 70, 100]);
      const cas = randomChoice([
        { e: `la symétrie de centre ${O}, puis de nouveau la symétrie de centre ${O}`, r: RETOUR, pq: "deux demi-tours autour du même point font un tour complet", w: [`la symétrie de centre ${O}`, `une rotation de centre ${O} d'un quart de tour`, `une translation de ${2 * a} cm vers la droite`, `la symétrie d'axe ${axe}`] },
        { e: `la symétrie d'axe ${axe}, puis de nouveau la symétrie d'axe ${axe}`, r: RETOUR, pq: "le miroir appliqué deux fois remet chaque point à sa place", w: [`la symétrie d'axe ${axe}`, `la symétrie de centre ${O}`, `une translation de ${2 * a} cm vers la droite`, `une rotation de centre ${O} d'un quart de tour`] },
        { e: `une translation de ${a} cm vers la droite, puis une translation de ${a} cm vers la gauche`, r: RETOUR, pq: "le second glissement annule exactement le premier", w: [`une translation de ${2 * a} cm vers la droite`, `une translation de ${2 * a} cm vers la gauche`, `la symétrie de centre ${O}`, `la symétrie d'axe ${axe}`] },
        { e: `un quart de tour de centre ${O} ${H}, puis un autre quart de tour de centre ${O} dans le même sens`, r: `la symétrie de centre ${O}`, pq: `90° + 90° = 180° : c'est un demi-tour autour de ${O}`, w: [RETOUR, `la symétrie d'axe ${axe}`, `une translation de ${a} cm vers la droite`, `une rotation de centre ${O} de 270° ${H}`] },
        { e: `un quart de tour de centre ${O} ${H}, puis un quart de tour de centre ${O} dans le sens inverse`, r: RETOUR, pq: "le second quart de tour défait exactement le premier", w: [`la symétrie de centre ${O}`, `la symétrie d'axe ${axe}`, `une rotation de centre ${O} de 180° ${H}`.replace(` ${H}`, ""), `une translation de ${a} cm vers la droite`] },
        { e: `une translation de ${a} cm vers la droite, puis une translation de ${b} cm vers la droite`, r: `une translation de ${a + b} cm vers la droite`, pq: `${a} + ${b} = ${a + b} : les deux glissements dans le même sens s'additionnent`, w: [`une translation de ${Math.abs(a - b)} cm vers la droite`, `une translation de ${a * b} cm vers la droite`, RETOUR, `une translation de ${a + b} cm vers la gauche`] },
        { e: `trois rotations successives de centre ${O} et d'angle 120°, toutes dans le même sens`, r: RETOUR, pq: "3 × 120° = 360° : c'est un tour complet", w: [`la symétrie de centre ${O}`, `une rotation de centre ${O} de 120° ${H}`, `une rotation de centre ${O} d'un quart de tour`, `la symétrie d'axe ${axe}`] },
        { e: `la symétrie de centre ${O}, puis un quart de tour de centre ${O} ${H}`, r: `une rotation de centre ${O} de 270° ${H}`, pq: `180° + 90° = 270°, dans le même sens`, w: [`la symétrie de centre ${O}`, RETOUR, `une rotation de centre ${O} de 90° ${H}`, `la symétrie d'axe ${axe}`] },
        { e: `une rotation de centre ${O} de ${al}° ${H}, puis une rotation de centre ${O} de ${be}° dans le même sens`, r: `une rotation de centre ${O} de ${al + be}° ${H}`, pq: `${al}° + ${be}° = ${al + be}°, dans le même sens et autour du même centre`, w: [`une rotation de centre ${O} de ${Math.abs(be - al)}° ${H}`, `une rotation de centre ${O} de ${al * 2}° ${H}`, `la symétrie de centre ${O}`, RETOUR] },
        { e: `une translation de ${Math.max(a, b)} cm vers la droite, puis une translation de ${Math.min(a, b)} cm vers la gauche`, r: `une translation de ${Math.abs(a - b)} cm vers la droite`, pq: `${Math.max(a, b)} − ${Math.min(a, b)} = ${Math.abs(a - b)} : le second glissement en défait une partie`, w: [`une translation de ${a + b} cm vers la droite`, `une translation de ${Math.abs(a - b)} cm vers la gauche`, RETOUR, `la symétrie de centre ${O}`] },
      ]);
      const intro = randomChoice([
        "Sur une appli de dessin, on applique à un logo",
        "Un robot de découpe applique à une pièce de tissu",
        "Pour animer un motif de carrelage, on lui applique",
        "Dans un jeu vidéo, on applique à un vaisseau",
        "Une graphiste applique à un pictogramme",
        "Pour une frise, on applique à un motif",
        "Sur un vitrail, on applique à une pièce de verre",
        "Dans un logiciel de géométrie, on applique à un triangle",
        "Un animateur applique à un personnage de dessin animé",
        "Pour un motif de roue, on applique à un rayon dessiné",
      ]);
      const question = randomChoice([
        "Quelle transformation unique donne le même résultat ?",
        "Par quelle seule transformation peut-on remplacer ces étapes ?",
        "Au bout du compte, quelle transformation a été appliquée ?",
        "Que peut-on dire du résultat final ?",
      ]);
      return {
        text: `${intro} ${cas.e}. ${question}`,
        format: "qcm",
        choices: makeChoices(cas.r, cas.w),
        expected: [cas.r],
        comparator: "mcq_exact",
        explanation:
          "Définition : enchaîner deux transformations, c'est appliquer la seconde à l'image obtenue par la première.\n\n" +
          "Méthode : on suit un seul point à travers les étapes, ou on additionne les angles (même centre) et les déplacements (translations).\n\n" +
          `Calcul : ${cas.pq}.\n\n` +
          `Conclusion : ${cas.r}.`,
      };
    },
  },

  {
    kind: "template",
    id: "4e_sym_transformation_defi_tpl_6_enchainement",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_transformation_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Chaque étape conserve les longueurs, les angles et les aires : l'enchaînement aussi.",
    tags: ["transformation", "defi", "successives", "conservation", "template"],
    generate: () => {
      const [A, B, C, D] = shuffle(LETTRES).slice(0, 4);
      const O = randomChoice(CENTRES.filter((x) => x !== A));
      const t1 = tirerTransfo();
      const t2 = tirerTransfo();
      const t3 = Math.random() < 0.4 ? tirerTransfo() : null;
      // « une symétrie axiale, puis une symétrie axiale » → « …, puis une autre symétrie axiale ».
      const autre = (t: { nom: string }, avant: { nom: string }) =>
        t.nom === avant.nom && t.nom.startsWith("une ") ? `une autre ${t.nom.slice(4)}` : t.nom;
      const n2 = autre(t2, t1);
      const etapes = t3 ? `${t1.nom}, puis ${n2}, puis ${autre(t3, t2)}` : `${t1.nom}, puis ${n2}`;
      const decor = randomChoice([
        "Sur un logo, ", "Dans un jeu vidéo, ", "Sur un motif de tissu, ", "Sur le plan d'un jardin, ",
        "Sur un vitrail, ", "Dans un logiciel de géométrie, ", "", "",
      ]);
      const m = randomChoice([
        () => { const v = randomInt(3, 15); return { s: `le segment [${A}${B}] mesure ${v} cm`, q: `Quelle est la longueur de l'image finale de [${A}${B}] ?`, v, u: " cm", prop: "les longueurs" }; },
        () => { const v = randomChoice([25, 35, 48, 55, 72, 105, 130]); return { s: `l'angle ${A}${B}${C} mesure ${v}°`, q: `Combien de degrés mesure l'image finale de l'angle ${A}${B}${C} ?`, v, u: "°", prop: "les angles" }; },
        () => { const v = randomInt(6, 60); return { s: `le triangle ${A}${B}${C} a une aire de ${v} cm²`, q: "Quelle est l'aire du triangle obtenu à la fin, en cm² ?", v, u: " cm²", prop: "les aires" }; },
        () => { const v = randomInt(10, 40); return { s: `le quadrilatère ${A}${B}${C}${D} a un périmètre de ${v} cm`, q: "Quel est le périmètre de la figure finale ?", v, u: " cm", prop: "les longueurs, donc les périmètres" }; },
      ])();
      // Cas à part : deux transformations qui laissent le centre en place.
      const centre = Math.random() < 0.25;
      const d = randomInt(2, 9);
      const text = centre
        ? `${decor}le point ${A} est à ${d} cm du point ${O}. On lui applique une rotation de centre ${O}, puis la symétrie de centre ${O}. À quelle distance de ${O} se trouve le point obtenu à la fin ?`
        : `${decor}${m.s}. On applique à la figure ${etapes}. ${m.q}`;
      const rep = centre ? d : m.v;
      return {
        text: cap(text),
        format: "short",
        expected: [centre ? `${d} cm` : `${m.v}${m.u}`],
        comparator: "number_equal",
        explanation: centre
          ? `Définition : une rotation de centre ${O} et la symétrie de centre ${O} conservent toutes deux la distance à ${O}.\n\n` +
            `Méthode : on suit le point étape par étape : la distance à ${O} ne change à aucune étape.\n\n` +
            `Calcul : ${d} cm, puis ${d} cm, puis ${d} cm.\n\n` +
            `Conclusion : le point final est à ${d} cm de ${O}.`
          : `Définition : chaque symétrie, translation ou rotation conserve ${m.prop}.\n\n` +
            "Méthode : si chaque étape conserve la mesure, l'enchaînement la conserve aussi : inutile de construire les images.\n\n" +
            `Calcul : ${m.v}${m.u} au départ, ${m.v}${m.u} après chaque étape.\n\n` +
            `Conclusion : la mesure finale est ${m.v}${m.u}.`,
      };
    },
  },
];