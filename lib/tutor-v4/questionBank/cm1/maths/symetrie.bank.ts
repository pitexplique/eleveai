// lib/tutor-v4/questionBank/cm1/maths/symetrie.bank.ts
//
// LA SYMÉTRIE AXIALE du CM1 : cinq micros, sans vidéo (vocabulaire du cycle 3 :
// axe de symétrie, symétrique, plier, se superposer, quadrillage, carreaux).
//
// ⭐ 14/11/2026 — GÉNÉRATEURS ET DESSINS. Avant : 3 à 13 squelettes par micro,
// 12 à 18 répétitions sur 20, et des questions de 6e (« la droite x = 4 »,
// « le point (2 ; 3) ») qu'aucun élève de CM1 ne peut lire : le quadrillage
// du dessin ne porte aucun nombre. Tout se dit maintenant en CARREAUX comptés
// depuis l'axe. Chaque gabarit tire une SITUATION (papillon, masque, logo,
// rosace, carrelage, lettres, drapeau… et le métier de qui dessine) × une
// TOURNURE, et pose presque toujours sa figure (`transformation`).
// ⛔ Les leurres = vraies erreurs : la figure qui GLISSE, les carreaux comptés
// depuis le BORD, la figure retournée tête en bas, l'axe OBLIQUE traité comme
// un axe vertical, le rectangle « à 4 axes », le parallélogramme « à 2 axes ».
// ⛔ CM1 = zéro clavier : que des QCM de 3 ou 4 choix.
// Les outils (figures, situations, placements) : ./symetrie-outils.ts.

import type { DifficultyLevel, TutorBankItemV4, TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { atelier, qcm, qcmN } from "./trous-outils";
import {
  LIEUX, MEME, OPPOSE, SITUATIONS, SYMS, VERDICT, VERDICT_OBLIQUE,
  aire, boite, bouge, cadre, candidat, candidatOblique, cap, car, dessin, entre, figureAsym, norm,
  ouverture, perso, placer, placerOblique, un,
  type Axe, type Cote, type Pt, type Sym, type Verdict, type VerdictOblique,
} from "./symetrie-outils";

type Gen = TutorGeneratedQuestionV4;

function exp(definition: string, methode: string, observation: string, conclusion: string) {
  return `Définition : ${definition}\n\nMéthode : ${methode}\n\nObservation : ${observation}\n\nConclusion : ${conclusion}`;
}
const court = (methode: string, conclusion: string) => `Méthode : ${methode}\n\nConclusion : ${conclusion}`;

const H_AXE = "Compte les carreaux depuis l'axe, pas depuis le bord de la feuille.";

/* ═════════════════ petites briques ═════════════════ */

const estVertical = (c: Cote) => c === "gauche" || c === "droite";

/** Un point seul à `d` carreaux de l'axe. */
function unPoint(d: number) {
  const vertical = Math.random() < 0.5;
  const m = entre(1, 2);
  const A = d + m;
  const autre = entre(1, 4);
  const avant = Math.random() < 0.5;
  if (vertical) {
    const p = { x: avant ? A - d : A + d, y: autre };
    return { p, img: { x: 2 * A - p.x, y: p.y }, axe: { type: "vertical", x: A } as Axe, cols: 2 * A, rows: 5, cote: (avant ? "gauche" : "droite") as Cote };
  }
  const p = { x: autre, y: avant ? A - d : A + d };
  return { p, img: { x: p.x, y: 2 * A - p.y }, axe: { type: "horizontal", y: A } as Axe, cols: 5, rows: 2 * A, cote: (avant ? "haut" : "bas") as Cote };
}

/** « 3 carreaux à droite de l'axe ». */
const ou = (n: number, c: Cote, meme = false) => `${car(n)} ${meme ? MEME[c] : OPPOSE[c]}`;

/** Une figure symétrique posée avec un carreau de marge. */
function poser(s: Sym) {
  const pts = bouge(norm(s.pts), 1, 1);
  const b = boite(pts);
  return { pts, b, cols: b.x1 + 1, rows: b.y1 + 1 };
}

/** QCM de carreaux : « 1 carreau », « 3 carreaux » ; leurres distincts, voisins s'il en manque. */
function qcmC(juste: number, faux: number[]) {
  const vals: number[] = [];
  for (const v of faux) if (v > 0 && v !== juste && !vals.includes(v)) vals.push(v);
  for (let k = 1; vals.length < 3 && k < 10; k++) for (const v of [juste + k, juste - k]) if (v > 0 && !vals.includes(v) && vals.length < 3) vals.push(v);
  return qcm(car(juste), vals.map(car));
}

const nbAxes = (n: number) => (n === 0 ? "aucun axe" : n === 1 ? "1 axe" : `${n} axes`);

/* ═════════════════ fabricants ═════════════════ */

const A = {
  construire: atelier("cm1", "symetrie", "symetrie_construire", "cm1_"),
  axe: atelier("cm1", "symetrie", "symetrie_axe", "cm1_"),
  completer: atelier("cm1", "symetrie", "symetrie_completer", "cm1_"),
  propriete: atelier("cm1", "symetrie", "symetrie_propriete", "cm1_"),
  defi: atelier("cm1", "symetrie", "symetrie_defi", "cm1_"),
};

/* ═════════════════ générateurs partagés ═════════════════ */

/** Le point bleu à d carreaux : où va son symétrique ? (★1) */
function genPointOu(): Gen {
  const d = entre(1, 4);
  const u = unPoint(d);
  const juste = ou(d, u.cote);
  return {
    text: `${ouverture()} ${un(["Le point bleu est à", "Le point bleu se trouve à", "Le point bleu est placé à"])} ${ou(d, u.cote, true)}. ${un([
      "Où places-tu son symétrique ?",
      "Où sera son symétrique ?",
      "Où faut-il dessiner son symétrique ?",
      "Où se trouve son symétrique ?",
    ])}`,
    ...qcm(juste, [ou(d, u.cote, true), ou(2 * d, u.cote), ou(d + 1, u.cote), "sur l'axe"]),
    explanation: court(`Le symétrique est de l'autre côté de l'axe, à la même distance : ${car(d)}.`, `Il est à ${juste}.`),
    canvas: dessin({ cols: u.cols, rows: u.rows, source: [u.p], axe: u.axe }),
  };
}

/** De quel côté, à quelle distance ? (★1) */
function genCote(): Gen {
  const u = unPoint(entre(1, 4));
  return {
    text: `${ouverture()} ${un([
      "Où dessine-t-on le symétrique du point bleu ?",
      "Comment place-t-on le symétrique du point bleu ?",
      "Où faut-il mettre le symétrique du point bleu ?",
      "Le symétrique du point bleu se place…",
    ])}`,
    ...qcm("de l'autre côté de l'axe, à la même distance", [
      "du même côté de l'axe, à la même distance",
      "de l'autre côté de l'axe, deux fois plus loin",
      "sur l'axe, juste en face",
      "de l'autre côté, contre le bord de la feuille",
    ]),
    explanation: court("L'axe est un miroir : le symétrique passe de l'autre côté, à la même distance de l'axe.", "De l'autre côté de l'axe, à la même distance."),
    canvas: dessin({ cols: u.cols, rows: u.rows, source: [u.p], axe: u.axe }),
  };
}

/** Le symétrique du sommet le plus éloigné ou le plus proche (★2), piège du bord. */
function genSommet(moitie = false): Gen {
  const f = figureAsym();
  const d = moitie ? 0 : entre(1, 3);
  const pl = placer(f, d);
  const loin = moitie || Math.random() < 0.6;
  const D = loin ? pl.dMax : pl.dMin;
  const bord = loin ? pl.dBord : pl.dBord + (pl.dMax - pl.dMin);
  const juste = ou(D, pl.cote);
  const qui = loin ? "le plus éloigné de l'axe" : "le plus proche de l'axe";
  const debut = moitie
    ? `${ouverture()} ${un(["La moitié bleue est tracée.", "Une moitié est déjà dessinée en bleu.", "On a déjà tracé la moitié bleue."])}`
    : `${ouverture()} ${un(["Il faut construire le symétrique de la figure bleue.", "On construit le symétrique de la figure bleue.", "Tu construis le symétrique de la figure bleue."])}`;
  return {
    text: `${debut} ${un([`Où va le symétrique du sommet ${qui} ?`, `Où places-tu le symétrique du sommet ${qui} ?`, `Le sommet ${qui} : où sera son symétrique ?`])}`,
    ...qcm(juste, [ou(D, pl.cote, true), ou(bord, pl.cote), ou(2 * D, pl.cote), ou(D + 1, pl.cote)]),
    explanation: court(`On compte les carreaux entre ce sommet et l'axe (pas depuis le bord) : ${car(D)}. On reporte la même distance de l'autre côté.`, `Son symétrique est à ${juste}.`),
    canvas: dessin({ cols: pl.cols, rows: pl.rows, source: pl.source, axe: pl.axe }),
  };
}

/** Combien de carreaux entre un point et son symétrique ? (★2) */
function genSepare(): Gen {
  const d = entre(1, 4);
  const u = unPoint(d);
  return {
    text: `${ouverture()} ${un(["Le point bleu est à", "Le point bleu se trouve à"])} ${car(d)} de l'axe. ${un([
      "Combien de carreaux sépareront ce point et son symétrique ?",
      "Quelle distance y aura-t-il entre ce point et son symétrique ?",
      "Combien de carreaux y aura-t-il entre le point et son symétrique ?",
    ])}`,
    ...qcmC(2 * d, [d, 2 * d + 2, d + 1, 2 * d - 1]),
    explanation: court(`${car(d)} jusqu'à l'axe, puis encore ${car(d)} de l'autre côté : ${d} + ${d} = ${2 * d}.`, `${car(2 * d)}.`),
    canvas: dessin({ cols: u.cols, rows: u.rows, source: [u.p], axe: u.axe }),
  };
}

const EXPLI_VERDICT: Record<Verdict, string> = {
  oui: "Chaque sommet rouge est à la même distance de l'axe que son sommet bleu, de l'autre côté : la figure est retournée comme dans un miroir.",
  glisse: "La figure rouge a gardé le même sens que la bleue : elle a glissé. Un symétrique est RETOURNÉ, comme dans un miroir.",
  distance: "Compte les carreaux de chaque sommet jusqu'à l'axe : la figure rouge est un carreau trop loin.",
  sens: "La figure rouge est retournée, mais dans l'autre sens (de haut en bas au lieu de gauche à droite, ou l'inverse).",
};

/** La figure rouge est-elle le symétrique de la bleue ? (★2-★4) */
function genVerifier(d0: number, d1: number, debut?: () => string): Gen {
  const f = figureAsym();
  const pl = placer(f, entre(d0, d1));
  const v = un(["oui", "oui", "glisse", "distance", "sens"] as Verdict[]);
  const c = candidat(pl, v);
  const k = cadre(pl.cols, pl.rows, c);
  const toutes = Object.values(VERDICT);
  return {
    text: `${(debut ?? ouverture)()} ${un([
      "La figure rouge doit être le symétrique de la bleue.",
      "On a dessiné en rouge le symétrique de la figure bleue.",
      "La figure rouge est censée être le symétrique de la bleue.",
    ])} ${un(["Est-ce juste ?", "Le dessin est-il juste ?", "Est-ce bien son symétrique ?", "Qu'en penses-tu ?"])}`,
    ...qcm(VERDICT[v], toutes),
    explanation: court(EXPLI_VERDICT[v], cap(VERDICT[v]) + "."),
    canvas: dessin({ cols: k.cols, rows: k.rows, source: pl.source, image: c, axe: pl.axe }),
  };
}

const EXPLI_OBLIQUE: Record<VerdictOblique, string> = {
  oui: "Avec un axe oblique, on suit les diagonales des carreaux : chaque sommet rouge est en face de son sommet bleu, à la même distance de l'axe.",
  glisse: "La figure rouge a le même sens que la bleue : elle a seulement glissé.",
  vertical: "On a retourné la figure de gauche à droite, comme si l'axe était vertical. Avec un axe oblique, on compte en suivant les diagonales des carreaux.",
  horizontal: "On a retourné la figure de haut en bas, comme si l'axe était horizontal. Avec un axe oblique, on compte en suivant les diagonales des carreaux.",
};

/** Axe oblique : la figure rouge est-elle le symétrique ? (★4) */
function genOblique(debut?: () => string): Gen {
  for (let k = 0; k < 30; k++) {
    const o = placerOblique();
    const v = un(["oui", "oui", "glisse", "vertical", "horizontal"] as VerdictOblique[]);
    const c = candidatOblique(o, v);
    if (!c) continue;
    const kd = cadre(o.n, o.n, c);
    const n = Math.max(kd.cols, kd.rows);
    if (n > 11) continue;
    return {
      text: `${(debut ?? ouverture)()} ${un([
        "L'axe est oblique : il suit la diagonale des carreaux.",
        "Cette fois, l'axe est en biais, sur la diagonale des carreaux.",
        "L'axe vert est oblique.",
      ])} ${un(["La figure rouge est-elle le symétrique de la bleue ?", "La figure rouge est-elle juste ?", "Est-ce bien le symétrique ?"])}`,
      ...qcm(VERDICT_OBLIQUE[v], Object.values(VERDICT_OBLIQUE)),
      explanation: court(EXPLI_OBLIQUE[v], cap(VERDICT_OBLIQUE[v]) + "."),
      canvas: dessin({ cols: n, rows: n, source: o.source, image: c, axe: { type: "line", from: { x: 0, y: 0 }, to: { x: n, y: n } } }),
    };
  }
  return genVerifier(1, 2, debut);
}

/** Combien de carreaux entre le sommet le plus éloigné et son symétrique ? (★3) */
function genSepareFigure(moitie = false): Gen {
  const f = figureAsym();
  const pl = placer(f, moitie ? 0 : entre(1, 3));
  const D = pl.dMax;
  const debut = moitie ? `${ouverture()} ${un(["La moitié bleue est déjà tracée.", "On a tracé une moitié en bleu."])}` : ouverture();
  return {
    text: `${debut} ${un([
      "Combien de carreaux sépareront le sommet le plus éloigné de l'axe et son symétrique ?",
      "Le sommet le plus éloigné de l'axe et son symétrique : combien de carreaux entre eux ?",
      "Quelle distance séparera le sommet le plus éloigné de l'axe de son symétrique ?",
    ])}`,
    ...qcmC(2 * D, [D, 2 * pl.dMin || D + 1, D + pl.dMin, 2 * D + 2]),
    explanation: court(`Ce sommet est à ${car(D)} de l'axe ; son symétrique aussi, de l'autre côté : ${D} + ${D} = ${2 * D}.`, `${car(2 * D)}.`),
    canvas: dessin({ cols: pl.cols, rows: pl.rows, source: pl.source, axe: pl.axe }),
  };
}

/** Combien de sommets ne bougent pas ? (★4) */
function genSommetsFixes(): Gen {
  const f = figureAsym();
  const pl = placer(f, 0);
  const surAxe = pl.source.filter((p) => (pl.axe.type === "vertical" ? p.x === pl.axe.x : pl.axe.type === "horizontal" ? p.y === pl.axe.y : false)).length;
  const n = pl.source.length;
  const ecr = (k: number) => (k === 0 ? "aucun sommet" : k === 1 ? "1 sommet" : `${k} sommets`);
  return {
    text: `${ouverture()} ${un(["On construit le symétrique de la figure bleue.", "Il faut construire le symétrique de la figure bleue."])} ${un([
      "Combien de ses sommets restent à leur place ?",
      "Combien de sommets ne bougent pas ?",
      "Combien de sommets sont leur propre symétrique ?",
    ])}`,
    ...qcm(ecr(surAxe), [ecr(0), ecr(n), ecr(surAxe + 1), ecr(Math.max(surAxe - 1, 0))]),
    explanation: court("Un sommet posé SUR l'axe est à 0 carreau de l'axe : son symétrique est lui-même. Les autres passent de l'autre côté.", `${cap(ecr(surAxe))} sur l'axe : ${surAxe === 1 ? "il ne bouge" : "ils ne bougent"} pas.`),
    canvas: dessin({ cols: pl.cols, rows: pl.rows, source: pl.source, axe: pl.axe }),
  };
}

/* ── axes ── */

const fem = (s: Sym) => /^une |^la /.test(s.nom);
const intro = (s: Sym) => {
  const p = perso();
  return un([
    `${p.txt} a dessiné ${s.nom} ${un(LIEUX)}.`,
    `Voici ${s.nom}, tracé${fem(s) ? "e" : ""} par ${p.nom} ${un(LIEUX)}.`,
    `${p.txt} reproduit ${s.nom} sur quadrillage.`,
  ]);
};

/** Les axes vrais d'une figure posée, et des lignes fausses plausibles. */
function lignes(s: Sym, pts: Pt[]) {
  const b = boite(pts);
  const vrais: Axe[] = [];
  const faux: Axe[] = [];
  const mx = (b.x0 + b.x1) / 2, my = (b.y0 + b.y1) / 2;
  if (s.v !== undefined) {
    vrais.push({ type: "vertical", x: 1 + s.v });
    if (1 + s.v + 1 < b.x1) faux.push({ type: "vertical", x: 1 + s.v + 1 });
    if (1 + s.v - 1 > b.x0) faux.push({ type: "vertical", x: 1 + s.v - 1 });
  } else faux.push({ type: "vertical", x: mx });
  if (s.h !== undefined) {
    vrais.push({ type: "horizontal", y: 1 + s.h });
    if (1 + s.h + 1 < b.y1) faux.push({ type: "horizontal", y: 1 + s.h + 1 });
  } else faux.push({ type: "horizontal", y: my });
  const d1: Axe = { type: "line", from: { x: b.x0, y: b.y0 }, to: { x: b.x1, y: b.y1 } };
  const d2: Axe = { type: "line", from: { x: b.x1, y: b.y0 }, to: { x: b.x0, y: b.y1 } };
  if (s.diag) vrais.push(d1, d2);
  else if (s.nom.includes("rectangle") || s.nom.includes("parallélogramme")) faux.push(d1);
  return { vrais, faux };
}

/** La ligne verte est-elle un axe de symétrie ? (★1) */
function genLigneAxe(): Gen {
  const s = un(SYMS);
  const { pts, cols, rows } = poser(s);
  const { vrais, faux } = lignes(s, pts);
  const oui = vrais.length > 0 && (Math.random() < 0.5 || faux.length === 0);
  const axe = oui ? un(vrais) : un(faux);
  const juste = oui ? "oui, les deux moitiés se superposent" : "non, les deux moitiés ne se superposent pas";
  const pieges = oui
    ? ["non, les deux moitiés ne se superposent pas", "on ne peut pas savoir sans découper", axe.type === "horizontal" ? "non, un axe de symétrie est toujours vertical" : "non, il faudrait une ligne horizontale"]
    : ["oui, les deux moitiés se superposent", "oui, car la ligne coupe la figure en deux", "on ne peut pas savoir sans découper"];
  return {
    text: `${intro(s)} ${un([
      "La ligne verte est-elle un axe de symétrie de cette figure ?",
      "Est-ce que la ligne verte est un axe de symétrie ?",
      "Si on plie le long de la ligne verte, les deux moitiés se superposent-elles ?",
      "La ligne verte est-elle une bonne ligne de pliage ?",
    ])}`,
    ...qcm(juste, pieges),
    explanation: court("On imagine qu'on plie la feuille le long de la ligne verte : si les deux moitiés tombent exactement l'une sur l'autre, c'est un axe de symétrie.", cap(juste) + "."),
    canvas: dessin({ cols, rows, source: pts, axe, points: false }),
  };
}

/** Comment est l'axe entre la figure et son image ? (★1, ★2, ★4) */
function genOrientation(oblique: number): Gen {
  const debut = un([
    `${ouverture()} La figure rouge est le symétrique de la bleue.`,
    `${ouverture()} En rouge, on voit le symétrique de la figure bleue.`,
  ]);
  const Q = un(["Comment est l'axe de symétrie ?", "Comment est placé l'axe de symétrie ?", "L'axe de symétrie est…"]);
  const choix = ["il est vertical", "il est horizontal", "il est oblique (en biais)", "il n'y a pas d'axe"];
  if (Math.random() < oblique) {
    const o = placerOblique();
    return {
      text: `${debut} ${Q}`,
      ...qcm(choix[2], choix),
      explanation: court("La figure s'est retournée par-dessus la diagonale des carreaux : chaque sommet a son symétrique en face, en biais.", "L'axe est oblique."),
      canvas: dessin({ cols: o.n, rows: o.n, source: o.source, image: o.image }),
    };
  }
  const pl = placer(figureAsym(), entre(1, 2));
  const v = pl.axe.type === "vertical";
  return {
    text: `${debut} ${Q}`,
    ...qcm(v ? choix[0] : choix[1], choix),
    explanation: court(v ? "Les deux figures sont l'une à côté de l'autre, retournées de gauche à droite : l'axe est une ligne debout entre elles." : "Les deux figures sont l'une au-dessus de l'autre, retournées de haut en bas : l'axe est une ligne couchée entre elles.", v ? "L'axe est vertical." : "L'axe est horizontal."),
    canvas: dessin({ cols: pl.cols, rows: pl.rows, source: pl.source, image: pl.image }),
  };
}

/** Où passe l'axe entre deux figures écartées de 2d carreaux ? (★2, ★3) */
function genMilieu(donne: boolean): Gen {
  const pl = placer(figureAsym(), entre(1, 3));
  const d = pl.dMin;
  const juste = `à ${car(d)} de chaque figure`;
  return {
    text: `${ouverture()} La figure rouge est le symétrique de la bleue. ${donne ? `Il y a ${car(2 * d)} entre les deux figures. ` : un(["Compte les carreaux entre les deux figures. ", "Regarde l'écart entre les deux figures. "])}${un(["Où passe l'axe de symétrie ?", "Où faut-il tracer l'axe de symétrie ?", "Où se trouve l'axe de symétrie ?"])}`,
    ...qcm(juste, [`à ${car(2 * d)} de la figure bleue`, `à ${car(d + 1)} de la figure bleue`, d > 1 ? `à ${car(d - 1)} de la figure bleue` : "contre la figure bleue", "contre la figure rouge"]),
    explanation: court(`L'axe est au milieu de l'écart : ${2 * d} ÷ 2 = ${d}.`, `L'axe passe ${juste}.`),
    canvas: dessin({ cols: pl.cols, rows: pl.rows, source: pl.source, image: pl.image }),
  };
}

/** Le nom de la ligne de pliage. (★2) */
function genNomAxe(): Gen {
  const s = un(SYMS.filter((x) => x.n > 0));
  const { pts, cols, rows } = poser(s);
  const { vrais } = lignes(s, pts);
  const p = perso();
  return {
    text: `${p.txt} plie ${s.nom} le long de la ligne verte : les deux moitiés se superposent. ${un([
      "Comment s'appelle cette ligne ?",
      "Quel est le nom de cette ligne ?",
      "Cette ligne verte est…",
    ])}`,
    ...qcm("un axe de symétrie", ["une diagonale", "un côté", "un rayon", "une hauteur"]),
    explanation: court("La ligne de pliage qui superpose les deux moitiés s'appelle un axe de symétrie.", "C'est un axe de symétrie."),
    canvas: dessin({ cols, rows, source: pts, axe: un(vrais), points: false }),
  };
}

const L_V = ["A", "M", "T", "U", "V", "W", "Y"];
const L_H = ["B", "C", "D", "E", "K"];
const L_2 = ["H", "I", "O", "X"];
const L_0 = ["F", "G", "J", "L", "N", "P", "R", "S", "Z"];

/** Les lettres capitales et leurs axes (sans dessin). (★3) */
function genLettres(): Gen {
  const p = perso();
  const lieu = un(["sur l'affiche de la fête", "sur la banderole du match", "sur l'enseigne du magasin", "sur la couverture de son cahier", "sur le panneau de la classe", "sur un tee-shirt"]);
  const debut = un([`${p.txt} écrit en lettres capitales ${lieu}.`, `${p.txt} découpe des lettres capitales pour les coller ${lieu}.`, `${p.txt} peint des lettres capitales ${lieu}.`]);
  const cas = un(["v", "h", "0", "2"] as const);
  const pick = (l: string[], k: number) => [...l].sort(() => Math.random() - 0.5).slice(0, k);
  const [juste, faux, q, expl]: [string, string[], string, string] =
    cas === "v" ? [un(L_V), pick([...L_H, ...L_0], 4), "Quelle lettre a un axe de symétrie vertical ?", "on la plie de gauche à droite"]
    : cas === "h" ? [un(L_H), pick([...L_V, ...L_0], 4), "Quelle lettre a un axe de symétrie horizontal ?", "on la plie de haut en bas"]
    : cas === "0" ? [un(L_0), pick(["A", "T", "U", "C", "E", "H", "M"], 4), "Quelle lettre n'a aucun axe de symétrie ?", "aucun pliage ne superpose ses deux moitiés (N, S et Z se retournent par un demi-tour, pas par un pliage)"]
    : [un(L_2), pick(["A", "T", "U", "C", "E", "B", "M"], 4), "Quelle lettre a deux axes de symétrie ?", "on peut la plier de gauche à droite ET de haut en bas"];
  return {
    text: `${debut} ${q}`,
    ...qcm(juste, faux),
    explanation: court(`Pour chaque lettre, on imagine le pliage : ${expl}.`, `C'est la lettre ${juste}.`),
  };
}

const PIEGE_AXES: Record<number, number> = { 0: 2, 1: 2, 2: 4, 4: 2 };

/** Combien d'axes a cette figure ? (★3, ★4 avec les figures pièges) */
function genCompterAxes(filtre: (s: Sym) => boolean, ton: "axe" | "defi"): Gen {
  const s = un(SYMS.filter(filtre));
  const { pts, cols, rows } = poser(s);
  const debut = ton === "axe" ? intro(s) : un([
    `${perso().txt} veut plier ${s.nom} pour que les deux moitiés se superposent.`,
    `Défi : ${s.nom} est tracé${fem(s) ? "e" : ""} sur quadrillage.`,
    `${perso().txt} découpe ${s.nom} dans du papier.`,
  ]);
  const Q = ton === "axe"
    ? un(["Combien d'axes de symétrie a cette figure ?", "Combien cette figure a-t-elle d'axes de symétrie ?", "Combien d'axes de symétrie (de lignes de pliage) a cette figure ?"])
    : un(["Combien d'axes de symétrie trouve-t-on ?", "Combien d'axes de symétrie a cette figure ?", "Combien cette figure a-t-elle d'axes de symétrie ?"]);
  return {
    text: `${debut} ${Q}`,
    ...qcm(nbAxes(s.n), [0, 1, 2, 4, PIEGE_AXES[s.n] ?? 1].filter((k) => k !== s.n).map(nbAxes)),
    explanation: court(`On essaie chaque pliage possible : vertical, horizontal, en diagonale${s.piege ? ` ; ${s.piege}` : ""}.`, s.n === 0 ? `${cap(s.nom)} n'a aucun axe de symétrie.` : `${cap(s.nom)} a ${nbAxes(s.n)} de symétrie.`),
    canvas: dessin({ cols, rows, source: pts, points: false }),
  };
}

/** Une diagonale est-elle un axe ? (★4) — le rectangle « à 4 axes ». */
function genDiagonale(): Gen {
  const s = un(SYMS.filter((x) => ["un rectangle", "un carré", "un parallélogramme", "un losange", "une croix de pharmacie", "un trapèze isocèle"].includes(x.nom)));
  const { pts, cols, rows } = poser(s);
  const b = boite(pts);
  let axe: Axe;
  let oui: boolean;
  if (s.nom === "un losange") {
    axe = { type: "vertical", x: (b.x0 + b.x1) / 2 };
    oui = true;
  } else if (s.nom === "un parallélogramme") {
    axe = { type: "line", from: pts[0], to: pts[2] };
    oui = false;
  } else if (s.nom === "un trapèze isocèle") {
    axe = { type: "line", from: pts[0], to: pts[2] };
    oui = false;
  } else {
    axe = { type: "line", from: { x: b.x0, y: b.y0 }, to: { x: b.x1, y: b.y1 } };
    oui = !!s.diag;
  }
  const juste = oui ? "oui, en pliant, les deux moitiés se superposent" : "non, en pliant, les deux moitiés ne se superposent pas";
  return {
    text: `${intro(s)} ${un(["La ligne verte suit une diagonale de la figure.", "On a tracé en vert une diagonale."])} ${un([
      "Est-ce un axe de symétrie ?",
      "Cette diagonale est-elle un axe de symétrie ?",
      "Peut-on plier la figure le long de cette diagonale pour superposer les deux moitiés ?",
    ])}`,
    ...qcm(juste, [
      oui ? "non, en pliant, les deux moitiés ne se superposent pas" : "oui, en pliant, les deux moitiés se superposent",
      "oui, une diagonale est toujours un axe de symétrie",
      "non, un axe de symétrie n'est jamais en biais",
    ]),
    explanation: court(
      oui ? "En pliant le long de cette diagonale, chaque coin tombe sur un autre coin : les deux moitiés se superposent." : "Plie en pensée : les coins ne tombent pas l'un sur l'autre. Une diagonale n'est pas toujours un axe (celle du rectangle n'en est pas un).",
      cap(juste) + "."
    ),
    canvas: dessin({ cols, rows, source: pts, axe, points: false }),
  };
}

/* ── compléter ── */

const moitieDebut = () => `${ouverture()} ${un(["La moitié bleue est déjà tracée.", "Une moitié est dessinée en bleu, contre l'axe.", "On a commencé par la moitié bleue."])}`;

/** Jusqu'où ira l'autre moitié ? (★2) */
function genJusquou(): Gen {
  const pl = placer(figureAsym(), 0);
  const W = pl.dMax;
  const juste = ou(W, pl.cote);
  return {
    text: `${moitieDebut()} ${un([
      "Jusqu'où ira l'autre moitié ?",
      "Où s'arrêtera l'autre moitié ?",
      "Jusqu'à quel carreau ira l'autre moitié, en partant de l'axe ?",
    ])}`,
    ...qcm(`jusqu'à ${juste}`, [`jusqu'à ${ou(2 * W, pl.cote)}`, `jusqu'à ${ou(W + 1, pl.cote)}`, `jusqu'à ${ou(pl.dBord, pl.cote)}`, W > 1 ? `jusqu'à ${ou(W - 1, pl.cote)}` : `jusqu'à ${ou(W, pl.cote, true)}`]),
    explanation: court(`La moitié bleue va jusqu'à ${car(W)} de l'axe : l'autre moitié ira aussi loin, de l'autre côté.`, `Jusqu'à ${juste}.`),
    canvas: dessin({ cols: pl.cols, rows: pl.rows, source: pl.source, axe: pl.axe }),
  };
}

/** La largeur (ou la hauteur) du motif complet. (★2) */
function genLargeur(): Gen {
  const pl = placer(figureAsym(), 0);
  const W = pl.dMax;
  const dim = estVertical(pl.cote) ? "de large" : "de haut";
  return {
    text: `${moitieDebut()} ${un([`Elle mesure ${car(W)} ${dim}.`, `Cette moitié fait ${car(W)} ${dim}.`])} ${un([
      `Combien de carreaux ${dim} fera le motif complet ?`,
      `Quelle sera la mesure ${dim === "de large" ? "en largeur" : "en hauteur"} du motif complet ?`,
      `Une fois complété, combien mesurera le motif ${dim} ?`,
    ])}`,
    ...qcmC(2 * W, [W, 2 * W + 1, W + 2, 2 * W - 1]),
    explanation: court(`La moitié symétrique a la même mesure : ${W} + ${W} = ${2 * W}.`, `${car(2 * W)} ${dim}.`),
    canvas: dessin({ cols: pl.cols, rows: pl.rows, source: pl.source, axe: pl.axe }),
  };
}

/** L'aire du motif complet. (★3) */
function genAireComplete(): Gen {
  for (let k = 0; k < 20; k++) {
    const f = figureAsym();
    const a = aire(f);
    if (!Number.isInteger(a)) continue;
    const pl = placer(f, 0);
    return {
      text: `${moitieDebut()} ${un([`Elle couvre ${a} carreaux.`, `Cette moitié recouvre ${a} carreaux.`])} ${un([
        "Combien de carreaux couvrira le motif complet ?",
        "Une fois complété, combien de carreaux le motif recouvrira-t-il ?",
        "Combien de carreaux faudra-t-il colorier en tout ?",
      ])}`,
      ...qcmC(2 * a, [a, 2 * a + 2, a + 2, 2 * a - 1]),
      explanation: court(`Le symétrique de la moitié a la même taille : il couvre aussi ${a} carreaux. ${a} + ${a} = ${2 * a}.`, `${2 * a} carreaux.`),
      canvas: dessin({ cols: pl.cols, rows: pl.rows, source: pl.source, axe: pl.axe }),
    };
  }
  return genLargeur();
}

/* ── propriétés ── */

const FAITS = [
  {
    q: ["Si on plie le long de l'axe vert, que se passe-t-il ?", "En pliant la feuille sur l'axe vert, que remarque-t-on ?"],
    juste: "les deux moitiés se superposent exactement",
    faux: ["les deux moitiés se croisent", "une moitié dépasse de l'autre", "les deux moitiés restent côte à côte"],
    m: "Le pliage le long de l'axe superpose exactement les deux moitiés : c'est le test de la symétrie.",
  },
  {
    q: ["Que peut-on dire d'un point et de son symétrique ?", "Un point d'une moitié et son symétrique dans l'autre moitié sont…"],
    juste: "à la même distance de l'axe",
    faux: ["du même côté de l'axe", "deux fois plus loin l'un que l'autre", "collés à l'axe"],
    m: "Un point et son symétrique sont de part et d'autre de l'axe, à la même distance.",
  },
  {
    q: ["Comment sont les deux moitiés de la figure ?", "Si on compare les deux moitiés, elles ont…"],
    juste: "la même forme et la même taille",
    faux: ["la même forme mais pas la même taille", "des formes différentes", "la même taille mais pas la même forme"],
    m: "La symétrie ne change ni la forme ni la taille : seule la position change, retournée comme dans un miroir.",
  },
];

/** Les propriétés, illustrées par une figure et son axe. (★2) */
function genFait(): Gen {
  const s = un(SYMS.filter((x) => x.n > 0));
  const { pts, cols, rows } = poser(s);
  const { vrais } = lignes(s, pts);
  const f = un(FAITS);
  return {
    text: `${intro(s)} ${un(f.q)}`,
    ...qcm(f.juste, f.faux),
    explanation: court(f.m, cap(f.juste) + "."),
    canvas: dessin({ cols, rows, source: pts, axe: un(vrais), points: false }),
  };
}

/** Un rectangle et son symétrique ont les mêmes mesures. (★2) */
function genMesures(): Gen {
  let W = entre(2, 4), H = entre(1, 3);
  if (W === H) W += 1;
  const rect = [{ x: 0, y: 0 }, { x: W, y: 0 }, { x: W, y: H }, { x: 0, y: H }];
  const pl = placer(rect, entre(1, 2));
  const m = (a: number, b: number) => `${car(a)} de large et ${car(b)} de haut`;
  return {
    text: `${ouverture()} Le rectangle bleu mesure ${m(W, H)}. ${un([
      "Combien mesurera son symétrique ?",
      "Quelles seront les mesures de son symétrique ?",
      "Et son symétrique, combien mesurera-t-il ?",
    ])}`,
    ...qcm(m(W, H), [m(2 * W, 2 * H), m(H, W), m(W + 1, H + 1), m(W, 2 * H)]),
    explanation: court("La symétrie conserve les longueurs : le symétrique d'un rectangle est un rectangle aux mêmes mesures. Avec un axe vertical ou horizontal, il ne tourne pas d'un quart de tour.", cap(m(W, H)) + "."),
    canvas: dessin({ cols: pl.cols, rows: pl.rows, source: pl.source, axe: pl.axe }),
  };
}

const FLECHE = [{ x: 0, y: 1 }, { x: 2, y: 1 }, { x: 2, y: 0 }, { x: 4, y: 2 }, { x: 2, y: 4 }, { x: 2, y: 3 }, { x: 0, y: 3 }];
const DIRS = ["vers la droite", "vers le bas", "vers la gauche", "vers le haut"];
const tourne = (l: Pt[]) => l.map((p) => ({ x: -p.y, y: p.x })); // quart de tour (y vers le bas)

/** Vers où pointe la flèche symétrique ? (★3) — elle se retourne… ou pas. */
function genFleche(): Gen {
  const q = entre(0, 3);
  let f: Pt[] = FLECHE;
  for (let i = 0; i < q; i++) f = tourne(f);
  f = norm(f);
  const pl = placer(f, entre(1, 2));
  const vertical = pl.axe.type === "vertical";
  const horizontale = q % 2 === 0; // la flèche pointe à gauche ou à droite
  const flip = vertical === horizontale;
  const juste = DIRS[flip ? (q + 2) % 4 : q];
  return {
    text: `${ouverture()} La flèche bleue pointe ${DIRS[q]}. ${un([
      "Vers où pointera sa symétrique ?",
      "Dans quelle direction pointera la flèche symétrique ?",
      "Où sera tournée la pointe de la flèche symétrique ?",
    ])}`,
    ...qcm(juste, DIRS),
    explanation: court(
      flip ? "La flèche pointe vers l'axe ou s'en éloigne : en se retournant comme dans un miroir, sa pointe change de sens." : "La flèche est parallèle à l'axe : le miroir la retourne, mais sa pointe garde la même direction.",
      `Elle pointera ${juste}.`
    ),
    canvas: dessin({ cols: pl.cols, rows: pl.rows, source: pl.source, axe: pl.axe }),
  };
}

/** Un point sur l'axe, ou un point et son symétrique écartés de 2d. (★3) */
function genPointAxe(): Gen {
  if (Math.random() < 0.45) {
    const u = unPoint(1);
    const p = u.axe.type === "vertical" ? { x: u.axe.x, y: u.p.y } : { x: u.p.x, y: u.axe.type === "horizontal" ? u.axe.y : 0 };
    return {
      text: `${ouverture()} Le point bleu est posé sur l'axe. ${un(["Où est son symétrique ?", "Où faut-il placer son symétrique ?", "Que devient-il par la symétrie ?"])}`,
      ...qcm("au même endroit, sur l'axe", ["à 1 carreau de l'autre côté de l'axe", "contre le bord de la feuille", "il n'a pas de symétrique"]),
      explanation: court("Un point sur l'axe est à 0 carreau de l'axe : son symétrique est à 0 carreau aussi, donc au même endroit.", "Au même endroit, sur l'axe."),
      canvas: dessin({ cols: u.cols, rows: u.rows, source: [p], axe: u.axe }),
    };
  }
  const d = entre(1, 4);
  const u = unPoint(d);
  return {
    text: `${ouverture()} Le point bleu et son symétrique rouge sont à ${car(2 * d)} l'un de l'autre. ${un([
      "À combien de carreaux de l'axe est chacun d'eux ?",
      "Quelle est la distance de chaque point à l'axe ?",
      "À quelle distance de l'axe se trouve le point bleu ?",
    ])}`,
    ...qcmC(d, [2 * d, d + 1, 4 * d, d - 1]),
    explanation: court(`L'axe est au milieu : ${2 * d} ÷ 2 = ${d}.`, `${cap(car(d))}.`),
    canvas: dessin({ cols: u.cols, rows: u.rows, source: [u.p], image: [u.img], axe: u.axe, liens: true }),
  };
}

/** Le nombre de sommets se conserve. (★3) */
function genNbSommets(): Gen {
  const pl = placer(figureAsym(), entre(1, 2));
  const n = pl.source.length;
  return {
    text: `${ouverture()} La figure bleue a ${n} sommets. ${un(["Combien de sommets aura son symétrique ?", "Et son symétrique, combien aura-t-il de sommets ?"])}`,
    ...qcmN(n, [2 * n, n - 1, n + 1], "sommets"),
    explanation: court("Chaque sommet a un symétrique, un seul : le symétrique a autant de sommets.", `${n} sommets.`),
    canvas: dessin({ cols: pl.cols, rows: pl.rows, source: pl.source, axe: pl.axe }),
  };
}

const ORTHO = (l: Pt[]) => l.every((p, i) => { const q = l[(i + 1) % l.length]; return p.x === q.x || p.y === q.y; });
const perim = (l: Pt[]) => l.reduce((s, p, i) => { const q = l[(i + 1) % l.length]; return s + Math.abs(p.x - q.x) + Math.abs(p.y - q.y); }, 0);

/** Périmètre, aire, angle droit : tout se conserve. (★4) */
function genConserve(): Gen {
  for (let k = 0; k < 30; k++) {
    const f = figureAsym();
    const cas = un(["perimetre", "aire", "angle"] as const);
    if (cas === "perimetre" && !ORTHO(f)) continue;
    if (cas === "aire" && !Number.isInteger(aire(f))) continue;
    const pl = placer(f, entre(1, 2));
    const canvas = dessin({ cols: pl.cols, rows: pl.rows, source: pl.source, image: pl.image, axe: pl.axe });
    if (cas === "perimetre") {
      const P = perim(f);
      return {
        text: `${ouverture()} Un carreau mesure 1 cm. La figure bleue a un périmètre de ${P} cm. ${un(["Quel est le périmètre de son symétrique rouge ?", "Combien mesure le tour de la figure rouge ?", "Quel périmètre a la figure rouge ?"])}`,
        ...qcmN(P, [2 * P, P + 2, P % 2 === 0 ? P / 2 : P - 2], "cm"),
        explanation: court("La symétrie conserve les longueurs : chaque côté rouge mesure autant que son côté bleu.", `${P} cm.`),
        canvas,
      };
    }
    if (cas === "aire") {
      const a = aire(f);
      return {
        text: `${ouverture()} La figure bleue couvre ${a} carreaux. ${un(["Combien de carreaux couvre son symétrique rouge ?", "Et la figure rouge, combien de carreaux couvre-t-elle ?", "Quelle surface, en carreaux, couvre la figure rouge ?"])}`,
        ...qcmC(a, [2 * a, a + 1, a - 1]),
        explanation: court("Le symétrique a la même forme et la même taille : il couvre autant de carreaux.", `${a} carreaux.`),
        canvas,
      };
    }
    const droit = f.some((p, i) => {
      const a = f[(i + f.length - 1) % f.length], c = f[(i + 1) % f.length];
      return (a.x - p.x) * (c.x - p.x) + (a.y - p.y) * (c.y - p.y) === 0;
    });
    if (!droit) continue;
    return {
      text: `${ouverture()} La figure bleue a un angle droit. ${un(["Et son symétrique rouge ?", "Que peut-on dire de la figure rouge ?", "Son symétrique a-t-il un angle droit ?"])}`,
      ...qcm("il a aussi un angle droit, au même coin", ["il n'a plus d'angle droit", "il a deux fois plus d'angles droits", "son angle devient plus ouvert"]),
      explanation: court("La symétrie conserve les angles : un angle droit reste un angle droit.", "Il a aussi un angle droit."),
      canvas,
    };
  }
  return genNbSommets();
}

const VRAIES = [
  "le symétrique d'un point est à la même distance de l'axe",
  "une figure et son symétrique ont la même taille",
  "un point posé sur l'axe reste à sa place",
  "le symétrique d'une figure est retourné, comme dans un miroir",
  "en pliant sur l'axe, une figure et son symétrique se superposent",
  "le symétrique d'un segment a la même longueur",
];
const FAUSSES = [
  "le symétrique d'une figure a seulement glissé de l'autre côté",
  "on compte les carreaux depuis le bord de la feuille",
  "le symétrique d'une figure est deux fois plus grand",
  "un axe de symétrie est toujours vertical",
  "le symétrique d'un point est deux fois plus loin de l'axe",
  "une figure et son symétrique sont du même côté de l'axe",
  "le symétrique d'un angle droit n'est plus un angle droit",
];

/** Quelle phrase est vraie ? (★4) */
function genPhraseVraie(): Gen {
  const pl = placer(figureAsym(), entre(1, 2));
  const p = perso();
  return {
    text: `${p.txt} ${un(["prépare un exposé sur la symétrie.", "vérifie ses symétries avant de colorier.", "explique la symétrie à son petit frère.", "corrige le dessin d'un camarade."])} ${un(["Quelle phrase est vraie ?", "Laquelle de ces phrases est juste ?", "Quelle règle est correcte ?"])}`,
    ...qcm(un(VRAIES), FAUSSES),
    explanation: court("Sur le dessin, la figure rouge est le symétrique de la bleue : même taille, même distance à l'axe, retournée comme dans un miroir.", "Seule la phrase juste respecte ces règles."),
    canvas: dessin({ cols: pl.cols, rows: pl.rows, source: pl.source, image: pl.image, axe: pl.axe }),
  };
}

/* ── défis ── */

const defiDebut = () => {
  const s = un(SITUATIONS);
  const p = perso(s);
  return un([`Défi ! ${p.txt} dessine ${s.o} sur quadrillage.`, `Défi : ${p.txt} prépare ${s.o}.`, `${p.txt} relève un défi pour ${s.o}.`]);
};

/** Le périmètre du rectangle complété : le côté sur l'axe disparaît. (★4) */
function genPerimetreComplet(): Gen {
  const W = entre(1, 3), H = entre(2, 4);
  const rect = [{ x: 0, y: 0 }, { x: W, y: 0 }, { x: W, y: H }, { x: 0, y: H }];
  const vertical = Math.random() < 0.5;
  const f = vertical ? rect : rect.map((p) => ({ x: p.y, y: p.x }));
  const pl = placer(f, 0, vertical ? "vertical" : "horizontal");
  const Pj = 2 * (2 * W + H);
  return {
    text: `${defiDebut()} La moitié bleue est un rectangle de ${car(W)} sur ${car(H)}, collé à l'axe. Un carreau mesure 1 cm. ${un([
      "Quel sera le périmètre de la figure complète ?",
      "Combien mesurera le tour de la figure complète ?",
      "Quel périmètre aura le rectangle complet ?",
    ])}`,
    ...qcmN(Pj, [4 * (W + H), 2 * (W + H), 2 * (W + 2 * H), Pj + 2], "cm"),
    explanation: court(`La figure complète est un rectangle de ${2 * W} cm sur ${H} cm (le côté collé à l'axe disparaît : on ne double pas le périmètre de la moitié). ${2 * W} + ${H} + ${2 * W} + ${H} = ${Pj}.`, `${Pj} cm.`),
    canvas: dessin({ cols: pl.cols, rows: pl.rows, source: pl.source, axe: pl.axe }),
  };
}

/* ═════════════════ la banque ═════════════════ */

type Fixe = Omit<Extract<TutorBankItemV4, { kind: "fixed" }>, "kind" | "niveau" | "matiere" | "notionId" | "theme">;
const fixe = (f: Fixe): TutorBankItemV4 => ({ kind: "fixed", niveau: "cm1", matiere: "maths", notionId: "symetrie", theme: "neutral", ...f });

const tpl = (fab: ReturnType<typeof atelier>, n: number, d: DifficultyLevel, hint: string, g: () => Gen) => fab(n, d, hint, g);

export const symetrieBank: TutorBankItemV4[] = [
  /* ── SYMETRIE_CONSTRUIRE ── */
  fixe({
    id: "cm1_symetrie_construire_fixed_g1",
    microId: "symetrie_construire",
    difficulty: 2,
    text: "Pour construire le symétrique d'un point situé à 3 carreaux de l'axe, on place son image de l'autre côté à...",
    format: "qcm",
    choices: ["3 carreaux", "6 carreaux", "1 carreau", "0 carreau"],
    expected: ["3 carreaux"],
    comparator: "mcq_exact",
    hint: "Le symétrique garde la même distance à l'axe.",
    explanation: "Le symétrique est de l'autre côté de l'axe, à la même distance : 3 carreaux.",
    tags: ["cm1", "symetrie", "symetrie_construire", "guide", "qcm"],
  }),
  tpl(A.construire, 10, 1, "Le symétrique est de l'autre côté de l'axe, à la même distance.", genPointOu),
  tpl(A.construire, 11, 1, "Pense à un miroir posé sur l'axe.", genCote),
  tpl(A.construire, 12, 2, H_AXE, () => genSommet(false)),
  tpl(A.construire, 13, 2, "Compte jusqu'à l'axe, puis autant de l'autre côté.", genSepare),
  tpl(A.construire, 14, 3, "Vérifie chaque sommet : même distance à l'axe, de l'autre côté, et la figure doit être retournée.", () => genVerifier(1, 3)),
  tpl(A.construire, 15, 3, "Compte jusqu'à l'axe, puis autant de l'autre côté.", () => genSepareFigure(false)),
  tpl(A.construire, 16, 4, "Avec un axe oblique, compte en suivant les diagonales des carreaux.", () => genOblique()),
  tpl(A.construire, 17, 4, "Un sommet posé sur l'axe est son propre symétrique.", genSommetsFixes),
  tpl(A.construire, 18, 4, "Vérifie chaque sommet, même ceux qui touchent l'axe.", () => genVerifier(0, 1)),

  /* ── SYMETRIE_AXE ── */
  fixe({
    id: "cm1_symetrie_axe_fixed_6_concept",
    microId: "symetrie_axe",
    difficulty: 1,
    text: "Une figure et son image par symétrie sont placées comme dans un miroir. Qu'est-ce qui les sépare ?",
    format: "qcm",
    choices: ["un axe de symétrie", "un sommet", "un cercle", "un angle droit"],
    expected: ["un axe de symétrie"],
    comparator: "mcq_exact",
    hint: "C'est la ligne qui sert de miroir.",
    explanation: exp(
      "Une symétrie axiale se fait toujours par rapport à une droite.",
      "On cherche le nom de la ligne qui sert de miroir.",
      "C'est cette droite qui sépare la figure de son image.",
      "Les deux figures sont séparées par un axe de symétrie."
    ),
    tags: ["cm1", "symetrie", "axe", "concept", "qcm"],
  }),
  tpl(A.axe, 10, 1, "Plie la figure en pensée le long de la ligne verte.", genLigneAxe),
  tpl(A.axe, 11, 1, "Les figures sont-elles côte à côte ou l'une au-dessus de l'autre ?", () => genOrientation(0)),
  tpl(A.axe, 12, 2, "L'axe est au milieu de l'écart entre les deux figures.", () => genMilieu(true)),
  tpl(A.axe, 13, 2, "C'est la ligne de pliage.", genNomAxe),
  tpl(A.axe, 14, 2, "Regarde comment la figure s'est retournée.", () => genOrientation(0.35)),
  tpl(A.axe, 15, 3, "Imagine chaque lettre pliée.", genLettres),
  tpl(A.axe, 16, 3, "Essaie tous les pliages : vertical, horizontal, en diagonale.", () => genCompterAxes(() => true, "axe")),
  tpl(A.axe, 17, 3, "Compte les carreaux entre les figures, puis prends la moitié.", () => genMilieu(false)),
  tpl(A.axe, 18, 4, "Une diagonale n'est pas toujours un axe de symétrie.", genDiagonale),
  tpl(A.axe, 19, 4, "Essaie aussi les pliages en diagonale.", () => genCompterAxes((s) => ["un rectangle", "un carré", "un parallélogramme", "un losange", "une croix de pharmacie", "la lettre Z"].includes(s.nom), "axe")),
  tpl(A.axe, 20, 4, "Un axe peut être vertical, horizontal ou en biais.", () => genOrientation(0.6)),

  /* ── SYMETRIE_COMPLETER ── */
  fixe({
    id: "cm1_symetrie_completer_fixed_7_distance",
    microId: "symetrie_completer",
    difficulty: 2,
    text: "Un point est à 3 carreaux à gauche d'un axe vertical. Son image est à combien de carreaux à droite de l'axe ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "Le point et son image sont à la même distance de l'axe.",
    explanation: exp(
      "En symétrie axiale, le point et son image sont à la même distance de l'axe.",
      "On reporte simplement la même distance de l'autre côté.",
      "3 carreaux à gauche donnent 3 carreaux à droite.",
      "L'image est à 3 carreaux à droite de l'axe."
    ),
    tags: ["cm1", "symetrie", "completer", "distance", "short"],
  }),
  {
    kind: "template",
    id: "cm1_symetrie_completer_tpl_2_distance_doublee",
    niveau: "cm1",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_completer",
    difficulty: 3,
    theme: "neutral",
    hint: "Le point et son image sont à la même distance de l'axe, de part et d'autre.",
    tags: ["cm1", "symetrie", "completer", "template", "distance", "short"],
    generate: () => {
      const distance = entre(1, 4);
      const u = unPoint(distance);
      return {
        text: `${ouverture()} Le point bleu est à ${ou(distance, u.cote, true)}. ${un([
          "Combien de carreaux séparent ce point de son image ?",
          "Combien de carreaux y aura-t-il entre ce point et son symétrique ?",
          "Quelle distance séparera ce point de son image ?",
        ])}`,
        canvas: dessin({ cols: u.cols, rows: u.rows, source: [u.p], axe: u.axe }),
        ...qcmC(2 * distance, [distance, 2 * distance + 2, distance + 1]),
        explanation: exp(
          "Le point et son image sont à la même distance de l'axe, chacun d'un côté.",
          "On additionne la distance à gauche et la distance à droite.",
          `${car(distance)} à gauche et ${car(distance)} à droite font ${2 * distance} carreaux.`,
          `Le point et son image sont séparés de ${2 * distance} carreaux.`
        ),
      };
    },
  },
  tpl(A.completer, 10, 2, "L'autre moitié va aussi loin de l'axe que la moitié bleue.", genJusquou),
  tpl(A.completer, 11, 2, "Vérifie chaque sommet : même distance à l'axe, de l'autre côté, et la moitié doit être retournée.", () => genVerifier(0, 0, moitieDebut)),
  tpl(A.completer, 12, 2, "Les deux moitiés ont la même mesure.", genLargeur),
  tpl(A.completer, 13, 3, "Les deux moitiés couvrent autant de carreaux.", genAireComplete),
  tpl(A.completer, 14, 3, "Compte jusqu'à l'axe, puis autant de l'autre côté.", () => genSepareFigure(true)),
  tpl(A.completer, 15, 3, H_AXE, () => genSommet(true)),
  tpl(A.completer, 16, 3, "Vérifie chaque sommet, et le sens de la moitié.", () => genVerifier(0, 0, moitieDebut)),

  /* ── SYMETRIE_PROPRIETE ── */
  fixe({
    id: "cm1_symetrie_propriete_fixed_3_point_sur_axe",
    microId: "symetrie_propriete",
    difficulty: 3,
    text: "Que devient un point placé sur l'axe de symétrie ?",
    format: "qcm",
    choices: ["il reste au même endroit", "il passe de l'autre côté de l'axe", "il s'éloigne de l'axe d'un carreau", "il disparaît"],
    expected: ["il reste au même endroit"],
    comparator: "mcq_exact",
    hint: "Un point sur l'axe est déjà sur la ligne miroir.",
    explanation: exp(
      "Un point placé sur l'axe est confondu avec son image.",
      "Comme il est déjà sur la ligne miroir, il ne bouge pas.",
      "Il est à 0 carreau de l'axe.",
      "Le point reste au même endroit."
    ),
    tags: ["cm1", "symetrie", "propriete", "axe", "qcm"],
  }),
  fixe({
    id: "cm1_symetrie_propriete_fixed_4_longueurs",
    microId: "symetrie_propriete",
    difficulty: 3,
    text: "La symétrie axiale conserve-t-elle les longueurs ?",
    format: "qcm",
    choices: ["oui, les longueurs sont conservées", "non, les longueurs changent", "seulement parfois", "non, les longueurs doublent"],
    expected: ["oui, les longueurs sont conservées"],
    comparator: "mcq_exact",
    hint: "Pense à une image dans un miroir : elle a la même taille.",
    explanation: exp(
      "La symétrie axiale est comme un reflet dans un miroir.",
      "On compare la figure et son image.",
      "L'image a exactement la même taille que la figure de départ.",
      "Oui, les longueurs sont conservées."
    ),
    tags: ["cm1", "symetrie", "propriete", "longueur", "qcm"],
  }),
  fixe({
    id: "cm1_symetrie_propriete_fixed_5_forme",
    microId: "symetrie_propriete",
    difficulty: 3,
    text: "L'image d'une figure par symétrie axiale a...",
    format: "qcm",
    choices: ["la même forme et la même taille", "une forme différente", "une taille plus grande", "une taille plus petite"],
    expected: ["la même forme et la même taille"],
    comparator: "mcq_exact",
    hint: "Le miroir ne change ni la forme ni la taille.",
    explanation: exp(
      "La symétrie axiale conserve la forme et la taille.",
      "On observe la figure et son reflet.",
      "Seule la position change, pas la forme ni la taille.",
      "L'image a la même forme et la même taille."
    ),
    tags: ["cm1", "symetrie", "propriete", "forme", "qcm"],
  }),
  fixe({
    id: "cm1_symetrie_propriete_fixed_6_segment",
    microId: "symetrie_propriete",
    difficulty: 4,
    text: "L'image d'un segment par une symétrie axiale est...",
    format: "qcm",
    choices: ["un segment de même longueur", "un point", "un cercle", "un segment plus long"],
    expected: ["un segment de même longueur"],
    comparator: "mcq_exact",
    hint: "La symétrie conserve les longueurs.",
    explanation: exp(
      "La symétrie axiale transforme un segment en un segment.",
      "Comme les longueurs sont conservées, la longueur ne change pas.",
      "L'image d'un segment est donc un segment de même longueur.",
      "C'est un segment de même longueur."
    ),
    tags: ["cm1", "symetrie", "propriete", "segment", "qcm"],
  }),
  fixe({
    id: "cm1_symetrie_propriete_fixed_7_distance_axe",
    microId: "symetrie_propriete",
    difficulty: 3,
    text: "Un point et son image sont toujours à la même distance...",
    format: "qcm",
    choices: ["de l'axe de symétrie", "du bord de la feuille", "du sommet le plus proche", "du coin de la feuille"],
    expected: ["de l'axe de symétrie"],
    comparator: "mcq_exact",
    hint: "Le miroir est à mi-chemin entre le point et son image.",
    explanation: exp(
      "En symétrie axiale, l'axe joue le rôle de miroir.",
      "On compte les carreaux entre chaque point et l'axe.",
      "Le point et son image sont toujours à la même distance de l'axe.",
      "Ils sont à la même distance de l'axe de symétrie."
    ),
    tags: ["cm1", "symetrie", "propriete", "distance", "qcm"],
  }),
  fixe({
    id: "cm1_symetrie_propriete_fixed_8_pliage",
    microId: "symetrie_propriete",
    difficulty: 4,
    text: "Si on plie la feuille le long de l'axe, la figure et son image...",
    format: "qcm",
    choices: ["se superposent exactement", "ne se touchent pas", "se croisent en un point", "forment un cercle"],
    expected: ["se superposent exactement"],
    comparator: "mcq_exact",
    hint: "C'est le test du pliage pour vérifier une symétrie.",
    explanation: exp(
      "Le pliage le long de l'axe est un test de symétrie.",
      "On plie la feuille sur l'axe et on regarde si les deux parties coïncident.",
      "La figure tombe exactement sur son image.",
      "Elles se superposent exactement."
    ),
    tags: ["cm1", "symetrie", "propriete", "pliage", "qcm"],
  }),
  fixe({
    id: "cm1_symetrie_propriete_fixed_9_nom_axe",
    microId: "symetrie_propriete",
    difficulty: 2,
    text: "Dans un dessin symétrique, la droite qui joue le rôle de miroir s'appelle...",
    format: "qcm",
    choices: ["l'axe de symétrie", "la diagonale", "le rayon", "la hauteur"],
    expected: ["l'axe de symétrie"],
    comparator: "mcq_exact",
    hint: "C'est la ligne de pliage.",
    explanation: exp(
      "La droite-miroir d'une symétrie a un nom précis.",
      "On cherche le mot qui désigne cette ligne.",
      "C'est la droite sur laquelle on plie pour superposer la figure et son image.",
      "Cette droite s'appelle l'axe de symétrie."
    ),
    tags: ["cm1", "symetrie", "propriete", "vocabulaire", "qcm"],
  }),
  tpl(A.propriete, 10, 2, "Pense au pliage le long de l'axe.", genFait),
  tpl(A.propriete, 11, 2, "La symétrie ne change pas les longueurs.", genMesures),
  tpl(A.propriete, 12, 2, "Un point et son symétrique : même distance à l'axe.", genPointOu),
  tpl(A.propriete, 13, 3, "La flèche pointe-t-elle vers l'axe, ou le long de l'axe ?", genFleche),
  tpl(A.propriete, 14, 3, "L'axe est à mi-chemin entre un point et son symétrique.", genPointAxe),
  tpl(A.propriete, 15, 3, "Chaque sommet a un seul symétrique.", genNbSommets),
  tpl(A.propriete, 16, 4, "La symétrie conserve les longueurs, les angles et les aires.", genConserve),
  tpl(A.propriete, 17, 4, "Regarde le dessin : même taille, même distance à l'axe, retournée.", genPhraseVraie),
  tpl(A.propriete, 18, 4, "Le symétrique est retourné, pas glissé.", () => genVerifier(1, 2)),

  /* ── SYMETRIE_DEFI ── */
  fixe({
    id: "cm1_symetrie_defi_fixed_4_axes_carre",
    microId: "symetrie_defi",
    difficulty: 3,
    text: "Combien d'axes de symétrie possède un carré ?",
    format: "qcm",
    choices: ["4", "2", "1", "0"],
    expected: ["4"],
    comparator: "mcq_exact",
    hint: "Pense aux 2 droites qui passent par le milieu des côtés et aux 2 diagonales.",
    explanation: exp(
      "Un axe de symétrie partage la figure en deux moitiés superposables.",
      "On cherche toutes les droites de pliage du carré.",
      "Il y a les 2 droites qui passent par le milieu des côtés et les 2 diagonales.",
      "Le carré possède 4 axes de symétrie."
    ),
    tags: ["cm1", "symetrie", "defi", "carre", "qcm"],
  }),
  fixe({
    id: "cm1_symetrie_defi_fixed_5_axes_rectangle",
    microId: "symetrie_defi",
    difficulty: 3,
    text: "Combien d'axes de symétrie possède un rectangle qui n'est pas un carré ?",
    format: "qcm",
    choices: ["2", "4", "1", "0"],
    expected: ["2"],
    comparator: "mcq_exact",
    hint: "Les diagonales du rectangle ne sont pas des axes de symétrie.",
    explanation: exp(
      "Un axe de symétrie plie la figure en deux moitiés qui se superposent.",
      "On teste les droites de pliage du rectangle.",
      "Seules les 2 droites passant par le milieu des côtés conviennent ; les diagonales non.",
      "Le rectangle possède 2 axes de symétrie."
    ),
    tags: ["cm1", "symetrie", "defi", "rectangle", "qcm"],
  }),
  fixe({
    id: "cm1_symetrie_defi_fixed_8_vocabulaire",
    microId: "symetrie_defi",
    difficulty: 3,
    text: "Une figure que l'on peut replier exactement sur elle-même possède...",
    format: "qcm",
    choices: ["un axe de symétrie", "un seul sommet", "un angle droit", "un cercle"],
    expected: ["un axe de symétrie"],
    comparator: "mcq_exact",
    hint: "C'est la ligne de pliage qui superpose les deux moitiés.",
    explanation: exp(
      "Une figure symétrique se replie exactement sur elle-même.",
      "On cherche le nom de la ligne de pliage.",
      "Cette ligne de pliage est une droite particulière de la figure.",
      "La figure possède un axe de symétrie."
    ),
    tags: ["cm1", "symetrie", "defi", "vocabulaire", "qcm"],
  }),
  tpl(A.defi, 10, 3, "Imagine chaque pliage de la lettre.", () => genCompterAxes((s) => !!s.lettre || s.nom === "une croix de pharmacie", "defi")),
  tpl(A.defi, 11, 3, "Essaie tous les pliages : vertical, horizontal, en diagonale.", () => genCompterAxes((s) => !s.lettre, "defi")),
  tpl(A.defi, 12, 3, "Vérifie chaque sommet : même distance à l'axe, de l'autre côté, et retournée.", () => genVerifier(1, 3, defiDebut)),
  tpl(A.defi, 13, 3, "L'autre moitié va aussi loin de l'axe que la moitié bleue.", () => genSepareFigure(true)),
  tpl(A.defi, 14, 4, "Le côté collé à l'axe n'est plus sur le tour de la figure complète.", genPerimetreComplet),
  tpl(A.defi, 15, 4, "Avec un axe oblique, compte en suivant les diagonales des carreaux.", () => genOblique(defiDebut)),
  tpl(A.defi, 16, 4, "Une diagonale n'est pas toujours un axe de symétrie.", genDiagonale),
  tpl(A.defi, 17, 4, "Le parallélogramme et le rectangle sont des pièges.", () => genCompterAxes((s) => ["un rectangle", "un carré", "un parallélogramme", "un losange", "la lettre Z", "la lettre H"].includes(s.nom), "defi")),
];
