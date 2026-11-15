// lib/tutor-v4/questionBank/cm2/maths/symetrie.bank.ts
//
// LA SYMÉTRIE AXIALE du CM2 : cinq micros (axe, compléter, construire,
// propriétés, défi). Vocabulaire de la vidéo CM2 (`manim/scripts/cm2/symetrie.py`)
// et du cycle 3 : l'axe = un miroir, le reflet, plier, se superposer, reporter
// carreau par carreau, de l'autre côté, à la même distance.
//
// ⭐ 15/11/2026 — GÉNÉRATEURS ET DESSINS, sur le modèle du jumeau CM1 (commit
// f4ac8236). Avant : 15 à 20 squelettes par micro, 9 à 18 répétitions sur 20,
// des questions « open » (retirées par `applyMathsKeyboardFree`), des QCM
// « oui / non » figés et 5 contextes réunionnais sur ~90. Maintenant chaque
// gabarit tire une SITUATION (logo, vitrail, grille de portail, papier peint…
// et le métier de qui dessine) × une TOURNURE, et pose sa figure : quadrillage
// (`transformation`) ou figure usuelle avec ses axes (`construction`).
// ⭐ Le niveau CM2, au-delà du CM1 :
//  - les axes des FIGURES USUELLES : carré 4, rectangle 2, losange 2, triangle
//    équilatéral 3, triangle isocèle 1, trapèze isocèle 1, parallélogramme 0,
//    cercle une infinité (hexagone régulier 6 en défi) ;
//  - compléter avec un axe vertical, horizontal OU OBLIQUE (on compte en
//    suivant les diagonales des carreaux) ;
//  - les propriétés : même distance à l'axe, segment [point, symétrique]
//    PERPENDICULAIRE à l'axe et coupé en son MILIEU, longueurs, angles et aires
//    conservés (en cm, décimaux à ★4-★5).
// ⛔ Les leurres = vraies erreurs : la figure qui GLISSE, les carreaux comptés
// depuis le BORD, la figure retournée dans le mauvais sens, l'axe oblique traité
// comme un axe vertical, le rectangle « à 4 axes », le losange « à 4 axes »,
// le parallélogramme « à 2 axes », le cercle « à 2 axes », le périmètre doublé.
// ⛔ CM2 = zéro clavier : que des QCM de 3 ou 4 choix.
// Les outils : ./symetrie-outils.ts (qui reprend ceux du CM1).

import type { DifficultyLevel, TutorBankItemV4, TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { atelier, fr, qcm, qcmN } from "../../cm1/maths/trous-outils";
import {
  LIEUX, MEME, OPPOSE, USUELLES, VERDICT, VERDICT_OBLIQUE,
  aire, boite, bouge, cadre, candidat, candidatOblique, cap, car, defiDebut, dessin, dessinUsuelle, entre,
  figureAsym, nbAxes, norm, ouverture, perso, placer, placerOblique, un, unPoint, unPointOblique,
  type Axe, type Cote, type Pt, type Usuelle, type Verdict, type VerdictOblique,
} from "./symetrie-outils";

type Gen = TutorGeneratedQuestionV4;

const court = (methode: string, conclusion: string) => `Méthode : ${methode}\n\nConclusion : ${conclusion}`;

const H_AXE = "Compte les carreaux depuis l'axe, pas depuis le bord de la feuille.";

/* ═════════════════ petites briques ═════════════════ */

const estVertical = (c: Cote) => c === "gauche" || c === "droite";

/** « 3 carreaux à droite de l'axe ». */
const ou = (n: number, c: Cote, meme = false) => `${car(n)} ${meme ? MEME[c] : OPPOSE[c]}`;

/** QCM de carreaux : leurres distincts, voisins s'il en manque. */
function qcmC(juste: number, faux: number[]) {
  const vals: number[] = [];
  for (const v of faux) if (v > 0 && v !== juste && !vals.includes(v)) vals.push(v);
  for (let k = 1; vals.length < 3 && k < 10; k++) for (const v of [juste + k, juste - k]) if (v > 0 && !vals.includes(v) && vals.length < 3) vals.push(v);
  return qcm(car(juste), vals.map(car));
}

/** Les lettres capitales : leurs axes. */
const L_V = ["A", "M", "T", "U", "V", "W", "Y"];
const L_H = ["B", "C", "D", "E", "K"];
const L_2 = ["H", "I", "O", "X"];
const L_0 = ["F", "G", "J", "L", "N", "P", "R", "S", "Z"];

/** Une figure symétrique sur quadrillage (pour « la ligne verte est-elle un axe ? »). */
type SymQ = { nom: string; pts: Pt[]; v?: number; h?: number; diag?: boolean };
const PQ = (...xy: number[]): Pt[] => { const r: Pt[] = []; for (let i = 0; i < xy.length; i += 2) r.push({ x: xy[i], y: xy[i + 1] }); return r; };
const SYMS_Q: readonly SymQ[] = [
  { nom: "une maison", pts: PQ(0, 2, 2, 0, 4, 2, 4, 5, 0, 5), v: 2 },
  { nom: "une flèche", pts: PQ(2, 0, 4, 2, 3, 2, 3, 5, 1, 5, 1, 2, 0, 2), v: 2 },
  { nom: "un sapin", pts: PQ(2, 0, 4, 3, 3, 3, 3, 5, 1, 5, 1, 3, 0, 3), v: 2 },
  { nom: "une couronne", pts: PQ(0, 0, 1, 2, 2, 0, 3, 2, 4, 0, 4, 3, 0, 3), v: 2 },
  { nom: "une fusée", pts: PQ(2, 0, 3, 2, 3, 4, 4, 5, 0, 5, 1, 4, 1, 2), v: 2 },
  { nom: "un nœud papillon", pts: PQ(0, 0, 2, 1, 4, 0, 4, 4, 2, 3, 0, 4), v: 2, h: 2 },
  { nom: "un rectangle", pts: PQ(0, 0, 6, 0, 6, 2, 0, 2), v: 3, h: 1 },
  { nom: "un carré", pts: PQ(0, 0, 4, 0, 4, 4, 0, 4), v: 2, h: 2, diag: true },
  { nom: "une croix", pts: PQ(2, 0, 4, 0, 4, 2, 6, 2, 6, 4, 4, 4, 4, 6, 2, 6, 2, 4, 0, 4, 0, 2, 2, 2), v: 3, h: 3, diag: true },
  { nom: "la lettre H", pts: PQ(0, 0, 1, 0, 1, 2, 3, 2, 3, 0, 4, 0, 4, 6, 3, 6, 3, 4, 1, 4, 1, 6, 0, 6), v: 2, h: 3 },
  { nom: "la lettre T", pts: PQ(0, 0, 4, 0, 4, 1, 3, 1, 3, 5, 1, 5, 1, 1, 0, 1), v: 2 },
  { nom: "la lettre C", pts: PQ(0, 0, 3, 0, 3, 1, 1, 1, 1, 3, 3, 3, 3, 4, 0, 4), h: 2 },
  { nom: "un trapèze", pts: PQ(0, 3, 1, 0, 3, 0, 4, 3), v: 2 },
  { nom: "un écusson", pts: PQ(0, 0, 4, 0, 4, 3, 2, 5, 0, 3), v: 2 },
];

function poserQ(s: SymQ) {
  const pts = bouge(norm(s.pts), 1, 1);
  const b = boite(pts);
  return { pts, b, cols: b.x1 + 1, rows: b.y1 + 1 };
}

/** Les axes vrais d'une figure posée, et des lignes fausses plausibles. */
function lignesQ(s: SymQ, pts: Pt[]) {
  const b = boite(pts);
  const vrais: Axe[] = [];
  const faux: Axe[] = [];
  if (s.v !== undefined) {
    vrais.push({ type: "vertical", x: 1 + s.v });
    if (1 + s.v + 1 < b.x1) faux.push({ type: "vertical", x: 1 + s.v + 1 });
    if (1 + s.v - 1 > b.x0) faux.push({ type: "vertical", x: 1 + s.v - 1 });
  } else faux.push({ type: "vertical", x: (b.x0 + b.x1) / 2 });
  if (s.h !== undefined) {
    vrais.push({ type: "horizontal", y: 1 + s.h });
    if (1 + s.h + 1 < b.y1) faux.push({ type: "horizontal", y: 1 + s.h + 1 });
  } else faux.push({ type: "horizontal", y: Math.round((b.y0 + b.y1) / 2) + 0.5 });
  const d1: Axe = { type: "line", from: { x: b.x0, y: b.y0 }, to: { x: b.x1, y: b.y1 } };
  const d2: Axe = { type: "line", from: { x: b.x1, y: b.y0 }, to: { x: b.x0, y: b.y1 } };
  if (s.diag) vrais.push(d1, d2);
  else if (s.nom === "un rectangle") faux.push(d1);
  return { vrais, faux };
}

const fem = (nom: string) => /^une |^la /.test(nom);

/* ═════════════════ fabricants ═════════════════ */

const A = {
  construire: atelier("cm2", "symetrie", "symetrie_construire", "cm2_"),
  axe: atelier("cm2", "symetrie", "symetrie_axe", "cm2_"),
  completer: atelier("cm2", "symetrie", "symetrie_completer", "cm2_"),
  propriete: atelier("cm2", "symetrie", "symetrie_propriete", "cm2_"),
  defi: atelier("cm2", "symetrie", "symetrie_defi", "cm2_"),
};

/* ═════════════════ construire : un point, un sommet ═════════════════ */

/** Le point bleu à d carreaux : où va son symétrique ? */
function genPointOu(debut: () => string = ouverture): Gen {
  const d = entre(1, 6);
  const u = unPoint(d);
  const juste = ou(d, u.cote);
  return {
    text: `${debut()} ${un(["Le point bleu est à", "Le point bleu se trouve à", "Le point bleu est placé à"])} ${ou(d, u.cote, true)}. ${un([
      "Où places-tu son symétrique ?",
      "Où sera son symétrique ?",
      "Où faut-il dessiner son symétrique ?",
      "Où se trouve son reflet dans le miroir de l'axe ?",
    ])}`,
    ...qcm(juste, [ou(d, u.cote, true), ou(2 * d, u.cote), ou(d + 1, u.cote), "sur l'axe"]),
    explanation: court(`Le symétrique est de l'autre côté de l'axe, à la même distance : ${car(d)}.`, `Il est à ${juste}.`),
    canvas: dessin({ cols: u.cols, rows: u.rows, source: [u.p], axe: u.axe }),
  };
}

/** Le symétrique du sommet le plus éloigné ou le plus proche, piège du bord. */
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
    ? `${ouverture()} ${un(["La moitié bleue est tracée contre l'axe.", "Une moitié est déjà dessinée en bleu.", "On a déjà tracé la moitié bleue."])}`
    : `${ouverture()} ${un(["Il faut construire le symétrique de la figure bleue.", "On construit le symétrique de la figure bleue.", "Tu reportes la figure bleue carreau par carreau."])}`;
  return {
    text: `${debut} ${un([`Où va le symétrique du sommet ${qui} ?`, `Où places-tu le symétrique du sommet ${qui} ?`, `Le sommet ${qui} : où sera son symétrique ?`])}`,
    ...qcm(juste, [ou(D, pl.cote, true), ou(bord, pl.cote), ou(2 * D, pl.cote), ou(D + 1, pl.cote)]),
    explanation: court(`On compte les carreaux entre ce sommet et l'axe (pas depuis le bord) : ${car(D)}. On reporte la même distance de l'autre côté.`, `Son symétrique est à ${juste}.`),
    canvas: dessin({ cols: pl.cols, rows: pl.rows, source: pl.source, axe: pl.axe }),
  };
}

/** Combien de carreaux entre un point et son symétrique ? */
function genSepare(): Gen {
  const d = entre(1, 6);
  const u = unPoint(d);
  return {
    text: `${ouverture()} ${un(["Le point bleu est à", "Le point bleu se trouve à"])} ${car(d)} de l'axe. ${un([
      "Combien de carreaux sépareront ce point et son symétrique ?",
      "Quelle distance y aura-t-il entre ce point et son symétrique ?",
      "Combien de carreaux y aura-t-il entre le point et son reflet ?",
    ])}`,
    ...qcmC(2 * d, [d, 2 * d + 2, d + 1, 2 * d - 1]),
    explanation: court(`${car(d)} jusqu'à l'axe, puis encore ${car(d)} de l'autre côté : ${d} + ${d} = ${2 * d}.`, `${cap(car(2 * d))}.`),
    canvas: dessin({ cols: u.cols, rows: u.rows, source: [u.p], axe: u.axe }),
  };
}

/** La méthode à l'équerre : la perpendiculaire à l'axe. */
function genEquerre(): Gen {
  const d = entre(1, 5);
  const u = unPoint(d);
  const p = perso();
  const etape = un([
    { q: "Quelle est la première étape ?", juste: "tracer la perpendiculaire à l'axe qui passe par le point", faux: ["tracer une droite parallèle à l'axe", "mesurer la distance au bord de la feuille", "tracer un cercle autour du point"] },
    { q: "Sur quelle droite se trouvera le symétrique ?", juste: "sur la perpendiculaire à l'axe qui passe par le point", faux: ["sur la parallèle à l'axe qui passe par le point", "sur l'axe lui-même", "sur le bord de la feuille"] },
    { q: "Une fois la perpendiculaire tracée, que fait-on ?", juste: "on reporte la même distance de l'autre côté de l'axe", faux: ["on reporte deux fois la distance du même côté", "on place le point sur l'axe", "on reporte la distance au bord de la feuille"] },
  ]);
  return {
    text: `${p.txt} veut construire avec son équerre le symétrique du point bleu, sans compter les carreaux. ${etape.q}`,
    ...qcm(etape.juste, etape.faux),
    explanation: court("Le point et son symétrique sont sur une même perpendiculaire à l'axe, de part et d'autre, à la même distance.", cap(etape.juste) + "."),
    canvas: dessin({ cols: u.cols, rows: u.rows, source: [u.p], axe: u.axe }),
  };
}

const EXPLI_VERDICT: Record<Verdict, string> = {
  oui: "Chaque sommet rouge est à la même distance de l'axe que son sommet bleu, de l'autre côté : la figure est retournée comme dans un miroir.",
  glisse: "La figure rouge a gardé le même sens que la bleue : elle a glissé. Un symétrique est RETOURNÉ, comme un reflet.",
  distance: "Compte les carreaux de chaque sommet jusqu'à l'axe : la figure rouge est un carreau trop loin.",
  sens: "La figure rouge est retournée, mais dans l'autre sens (de haut en bas au lieu de gauche à droite, ou l'inverse).",
};

/** La figure rouge est-elle le symétrique de la bleue ? */
function genVerifier(d0: number, d1: number, debut: () => string = ouverture): Gen {
  const pl = placer(figureAsym(), entre(d0, d1));
  const v = un(["oui", "oui", "glisse", "distance", "sens"] as Verdict[]);
  const c = candidat(pl, v);
  const k = cadre(pl.cols, pl.rows, c);
  return {
    text: `${debut()} ${un([
      "La figure rouge doit être le symétrique de la bleue.",
      "On a dessiné en rouge le symétrique de la figure bleue.",
      "La figure rouge est censée être le reflet de la bleue.",
      "Un camarade a construit en rouge le symétrique de la figure bleue.",
    ])} ${un(["Est-ce juste ?", "Le dessin est-il juste ?", "Est-ce bien son symétrique ?", "Qu'en penses-tu ?"])}`,
    ...qcm(VERDICT[v], Object.values(VERDICT)),
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

/** Axe oblique : la figure rouge est-elle le symétrique ? */
function genOblique(debut: () => string = ouverture, moitie = false): Gen {
  for (let k = 0; k < 30; k++) {
    const o = placerOblique();
    const v = un(["oui", "oui", "glisse", "vertical", "horizontal"] as VerdictOblique[]);
    const c = candidatOblique(o, v);
    if (!c) continue;
    const kd = cadre(o.n, o.n, c);
    const n = Math.max(kd.cols, kd.rows);
    if (n > 11) continue;
    return {
      text: `${debut()} ${un([
        "L'axe est oblique : il suit la diagonale des carreaux.",
        "Cette fois, l'axe est en biais, sur la diagonale des carreaux.",
        "L'axe vert est oblique.",
      ])} ${moitie
        ? un(["On complète le motif de l'autre côté de l'axe : la partie rouge est-elle juste ?", "La partie rouge complète-t-elle bien le motif par symétrie ?", "La partie rouge doit compléter le motif : est-ce le symétrique de la bleue ?"])
        : un(["La figure rouge est-elle le symétrique de la bleue ?", "La figure rouge est-elle juste ?", "Est-ce bien le symétrique ?"])}`,
      ...qcm(VERDICT_OBLIQUE[v], Object.values(VERDICT_OBLIQUE)),
      explanation: court(EXPLI_OBLIQUE[v], cap(VERDICT_OBLIQUE[v]) + "."),
      canvas: dessin({ cols: n, rows: n, source: o.source, image: c, axe: { type: "line", from: { x: 0, y: 0 }, to: { x: n, y: n } } }),
    };
  }
  return genVerifier(1, 2, debut);
}

/** Axe oblique : un point à d diagonales de carreau. */
function genPointOblique(debut: () => string = ouverture): Gen {
  const d = entre(1, 3);
  const u = unPointOblique(d);
  const dg = (k: number) => (k === 1 ? "1 diagonale de carreau" : `${k} diagonales de carreau`);
  const cas = Math.random() < 0.5;
  return {
    text: `${debut()} L'axe vert est oblique. ${un(["Le point bleu est à", "Pour rejoindre l'axe, le point bleu traverse"])} ${dg(d)}. ${cas
      ? un(["Combien de diagonales de carreau le séparent de son symétrique ?", "Combien de diagonales de carreau y aura-t-il entre ce point et son symétrique ?"])
      : un(["Comment trouver son symétrique ?", "Où places-tu son symétrique ?"])}`,
    ...(cas
      ? qcm(dg(2 * d), [dg(d), dg(2 * d + 1), dg(d + 1), dg(4 * d)])
      : qcm(`on continue tout droit en diagonale, ${dg(d)} après l'axe`, [
        `on avance de ${car(d)} vers la droite`,
        `on descend de ${car(d)} tout droit`,
        `on continue en diagonale, ${dg(2 * d)} après l'axe`,
      ])),
    explanation: court(`On suit la diagonale des carreaux, qui est perpendiculaire à l'axe : ${dg(d)} jusqu'à l'axe, puis autant de l'autre côté.`, cas ? `${cap(dg(2 * d))}.` : `On continue en diagonale, ${dg(d)} après l'axe.`),
    canvas: dessin({ cols: u.n, rows: u.n, source: [u.p], axe: { type: "line", from: { x: 0, y: 0 }, to: { x: u.n, y: u.n } } }),
  };
}

/** Combien de carreaux entre le sommet le plus éloigné et son symétrique ? */
function genSepareFigure(moitie = false, debut0: () => string = ouverture): Gen {
  const pl = placer(figureAsym(), moitie ? 0 : entre(1, 3));
  const D = pl.dMax;
  const debut = moitie ? `${debut0()} ${un(["La moitié bleue est déjà tracée.", "On a tracé une moitié en bleu, contre l'axe."])}` : debut0();
  return {
    text: `${debut} ${un([
      "Combien de carreaux sépareront le sommet le plus éloigné de l'axe et son symétrique ?",
      "Le sommet le plus éloigné de l'axe et son symétrique : combien de carreaux entre eux ?",
      "Quelle distance séparera le sommet le plus éloigné de l'axe de son symétrique ?",
    ])}`,
    ...qcmC(2 * D, [D, 2 * pl.dMin || D + 1, D + pl.dMin, 2 * D + 2]),
    explanation: court(`Ce sommet est à ${car(D)} de l'axe ; son symétrique aussi, de l'autre côté : ${D} + ${D} = ${2 * D}.`, `${cap(car(2 * D))}.`),
    canvas: dessin({ cols: pl.cols, rows: pl.rows, source: pl.source, axe: pl.axe }),
  };
}

/** Combien de sommets ne bougent pas ? */
function genSommetsFixes(): Gen {
  const pl = placer(figureAsym(), 0);
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

/* ═════════════════ axes ═════════════════ */

const introQ = (nom: string) => {
  const p = perso();
  return un([
    `${p.txt} a dessiné ${nom} ${un(LIEUX)}.`,
    `Voici ${nom}, tracé${fem(nom) ? "e" : ""} par ${p.nom} ${un(LIEUX)}.`,
    `${p.txt} reproduit ${nom} sur quadrillage.`,
  ]);
};

/** La ligne verte est-elle un axe de symétrie ? (quadrillage) */
function genLigneAxe(): Gen {
  const s = un(SYMS_Q);
  const { pts, cols, rows } = poserQ(s);
  const { vrais, faux } = lignesQ(s, pts);
  const oui = vrais.length > 0 && (Math.random() < 0.5 || faux.length === 0);
  const axe = oui ? un(vrais) : un(faux);
  const juste = oui ? "oui, les deux moitiés se superposent" : "non, les deux moitiés ne se superposent pas";
  const pieges = oui
    ? ["non, les deux moitiés ne se superposent pas", "on ne peut pas savoir sans découper", axe.type === "horizontal" ? "non, un axe de symétrie est toujours vertical" : "non, il faudrait une ligne horizontale"]
    : ["oui, les deux moitiés se superposent", "oui, car la ligne coupe la figure en deux", "on ne peut pas savoir sans découper"];
  return {
    text: `${introQ(s.nom)} ${un([
      "La ligne verte est-elle un axe de symétrie de cette figure ?",
      "Est-ce que la ligne verte est un axe de symétrie ?",
      "Si on plie le long de la ligne verte, les deux moitiés se superposent-elles ?",
      "La ligne verte joue-t-elle le rôle d'un miroir pour cette figure ?",
    ])}`,
    ...qcm(juste, pieges),
    explanation: court("On imagine qu'on plie la feuille le long de la ligne verte : si les deux moitiés tombent exactement l'une sur l'autre, c'est un axe de symétrie.", cap(juste) + "."),
    canvas: dessin({ cols, rows, source: pts, axe, points: false }),
  };
}

/** Comment est l'axe entre la figure et son image ? */
function genOrientation(oblique: number): Gen {
  const debut = un([
    `${ouverture()} La figure rouge est le symétrique de la bleue.`,
    `${ouverture()} En rouge, on voit le reflet de la figure bleue.`,
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

/** Où passe l'axe entre deux figures écartées de 2d carreaux ? */
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

/** Le nom de la ligne de pliage. */
function genNomAxe(): Gen {
  const s = un(SYMS_Q);
  const { pts, cols, rows } = poserQ(s);
  const { vrais } = lignesQ(s, pts);
  const p = perso();
  return {
    text: `${p.txt} plie ${s.nom} le long de la ligne verte : les deux moitiés se superposent. ${un([
      "Comment s'appelle cette ligne ?",
      "Quel est le nom de cette ligne ?",
      "Cette ligne verte est…",
    ])}`,
    ...qcm("un axe de symétrie", ["une diagonale", "un côté", "un rayon", "une hauteur"]),
    explanation: court("La ligne de pliage qui superpose les deux moitiés s'appelle un axe de symétrie : elle joue le rôle d'un miroir.", "C'est un axe de symétrie."),
    canvas: dessin({ cols, rows, source: pts, axe: un(vrais), points: false }),
  };
}

/** Les lettres capitales et leurs axes. */
function genLettres(): Gen {
  const p = perso();
  const lieu = un(["sur l'affiche du club", "sur la banderole du tournoi", "sur l'enseigne de la boulangerie", "sur la couverture de son classeur", "sur le panneau du gymnase", "sur un sweat"]);
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

/* ── figures usuelles ── */

const PIEGES_AXES: Record<string, number[]> = {
  carre: [2, 1, 8],
  rectangle: [4, 1, 0],
  losange: [4, 1, 0],
  equilateral: [1, 6, 2],
  isocele: [3, 2, 0],
  trapeze: [2, 0, 4],
  parallelogramme: [2, 4, 1],
  cercle: [1, 2, 4],
  hexagone: [3, 2, 12],
};

const introU = (u: Usuelle) => {
  const p = perso();
  return un([
    `${p.txt} a tracé ${u.nom} ${un(LIEUX)}.`,
    `Voici ${u.nom}, dessiné par ${p.nom} ${un(LIEUX)}.`,
    `${p.txt} découpe ${u.nom} dans du papier de couleur.`,
    `${p.txt} observe ${u.nom} ${un(LIEUX)}.`,
  ]);
};

/** Combien d'axes a cette figure usuelle ? */
function genAxesUsuelle(noms: string[], debut?: () => string): Gen {
  const cle = un(noms);
  const u = USUELLES[cle]();
  return {
    text: `${debut ? `${debut()} Sa figure : ${u.nom}.` : introU(u)} ${un([
      "Combien d'axes de symétrie a cette figure ?",
      "Combien cette figure a-t-elle d'axes de symétrie ?",
      `Combien d'axes de symétrie possède ${u.nom} ?`,
      "Combien a-t-elle d'axes de symétrie (de lignes de pliage) ?",
    ])}`,
    ...qcm(nbAxes(u.n), PIEGES_AXES[cle].filter((k) => k !== u.n).map(nbAxes)),
    explanation: court(`On essaie chaque pliage : ${u.pourquoi}.`, u.n === 0 ? `${cap(u.nom)} n'a aucun axe de symétrie.` : `${cap(u.nom)} a ${nbAxes(u.n)} de symétrie.`),
    canvas: dessinUsuelle(u),
  };
}

/** La ligne verte est-elle un axe de cette figure usuelle ? */
function genLigneUsuelle(noms: string[]): Gen {
  const cle = un(noms);
  const u = USUELLES[cle]();
  const oui = u.axes.length > 0 && Math.random() < 0.5;
  const ligne = oui ? un(u.axes) : un(u.faux);
  const juste = oui ? "oui, en pliant, les deux moitiés se superposent" : "non, en pliant, les deux moitiés ne se superposent pas";
  return {
    text: `${introU(u)} ${un([
      "La ligne verte en pointillés est-elle un axe de symétrie ?",
      "Est-ce que la ligne verte est un axe de symétrie de la figure ?",
      "Si on plie le long de la ligne verte, les deux moitiés se superposent-elles ?",
    ])}`,
    ...qcm(juste, [
      oui ? "non, en pliant, les deux moitiés ne se superposent pas" : "oui, en pliant, les deux moitiés se superposent",
      "oui, car la ligne coupe la figure en deux parts égales",
      "non, un axe de symétrie n'est jamais en biais",
    ]),
    explanation: court(`Plie en pensée le long de la ligne verte : ${u.pourquoi}.`, cap(juste) + "."),
    canvas: dessinUsuelle(u, [ligne]),
  };
}

/** Quelle figure a exactement n axes ? (sans dessin, ou la figure juste dessinée en défi) */
function genQuelleFigure(): Gen {
  const cas = un([
    { n: 3, juste: "le triangle équilatéral", faux: ["le triangle isocèle", "le rectangle", "le losange"] },
    { n: 4, juste: "le carré", faux: ["le rectangle", "le losange", "le triangle équilatéral"] },
    { n: 0, juste: "le parallélogramme", faux: ["le losange", "le trapèze isocèle", "le rectangle"] },
    { n: 1, juste: un(["le triangle isocèle", "le trapèze isocèle"]), faux: ["le carré", "le triangle équilatéral", "le rectangle"] },
    { n: -1, juste: "le cercle", faux: ["le carré", "l'hexagone régulier", "le triangle équilatéral"] },
    { n: 2, juste: un(["le rectangle", "le losange"]), faux: ["le carré", "le triangle équilatéral", "le parallélogramme"] },
  ]);
  const p = perso();
  const q = cas.n < 0 ? "Quelle figure a une infinité d'axes de symétrie ?" : cas.n === 0 ? "Quelle figure n'a aucun axe de symétrie ?" : `Quelle figure a exactement ${nbAxes(cas.n)} de symétrie ?`;
  return {
    text: `${un([`${p.txt} range ses gabarits de géométrie.`, `${p.txt} prépare une affiche sur les figures usuelles.`, `${p.txt} trie des formes découpées dans du carton.`, `${p.txt} révise sa leçon de géométrie.`])} ${q}`,
    ...qcm(cas.juste, cas.faux),
    explanation: court("Carré 4 axes, rectangle 2, losange 2, triangle équilatéral 3, triangle isocèle 1, trapèze isocèle 1, parallélogramme aucun, cercle une infinité.", `C'est ${cas.juste}.`),
  };
}

/** Une diagonale est-elle un axe ? (rectangle, carré, losange, parallélogramme) */
function genDiagonale(): Gen {
  const cle = un(["carre", "rectangle", "losange", "parallelogramme", "rectangle"]);
  const u = USUELLES[cle]();
  const d1: [Pt, Pt] = [u.pts[0], u.pts[2]];
  const oui = cle === "carre" || cle === "losange";
  const juste = oui ? "oui, en pliant, les deux moitiés se superposent" : "non, en pliant, les deux moitiés ne se superposent pas";
  return {
    text: `${introU(u)} ${un(["La ligne verte suit une diagonale de la figure.", "On a tracé en vert une diagonale."])} ${un([
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
      oui ? `En pliant le long de cette diagonale, chaque sommet tombe sur un autre sommet : ${u.pourquoi}.` : `Plie en pensée : les coins ne tombent pas l'un sur l'autre. ${cap(u.pourquoi)}.`,
      cap(juste) + "."
    ),
    canvas: dessinUsuelle(u, [d1]),
  };
}

/** Le cercle : combien d'axes, et lesquels ? */
function genCercle(): Gen {
  const u = USUELLES.cercle();
  const p = perso();
  const debut = un([
    `${p.txt} découpe un disque de papier pour le blason.`,
    `${p.txt} plie une galette de papier ronde.`,
    `${p.txt} trace un cercle au compas ${un(LIEUX)}.`,
  ]);
  if (Math.random() < 0.5) {
    return {
      text: `${debut} ${un(["Quelles droites sont des axes de symétrie du cercle ?", "Par où doit passer un pliage pour que les deux moitiés se superposent ?", "Quelles lignes de pliage partagent le cercle en deux moitiés superposables ?"])}`,
      ...qcm("toutes les droites qui passent par le centre", ["seulement la droite verticale et la droite horizontale", "toutes les droites qui touchent le cercle", "aucune droite"]),
      explanation: court("Tout diamètre partage le cercle en deux moitiés qui se superposent : chaque droite passant par le centre est un axe.", "Toutes les droites qui passent par le centre."),
      canvas: dessinUsuelle(u, u.axes),
    };
  }
  return {
    text: `${debut} ${un(["Combien d'axes de symétrie a un cercle ?", "Combien un cercle a-t-il d'axes de symétrie ?"])}`,
    ...qcm(nbAxes(-1), [nbAxes(2), nbAxes(1), nbAxes(4)]),
    explanation: court(u.pourquoi, "Le cercle a une infinité d'axes de symétrie."),
    canvas: dessinUsuelle(u, u.axes),
  };
}

/* ═════════════════ compléter ═════════════════ */

const moitieDebut = () => `${ouverture()} ${un(["La moitié bleue est déjà tracée.", "Une moitié est dessinée en bleu, contre l'axe.", "On a commencé par la moitié bleue.", "Il ne reste que la moitié bleue à reporter de l'autre côté."])}`;

/** Compléter : le point de la moitié, son reflet (★1). */
function genCompleterPoint(): Gen {
  const d = entre(1, 5);
  const u = unPoint(d);
  const juste = ou(d, u.cote);
  return {
    text: `${ouverture()} Pour compléter la figure, il faut reporter le point bleu, ${ou(d, u.cote, true)}. ${un([
      "Où places-tu le point de l'autre moitié ?",
      "Où sera le point qui lui correspond ?",
      "Où va son reflet ?",
    ])}`,
    ...qcm(juste, [ou(d, u.cote, true), ou(2 * d, u.cote), ou(d + 1, u.cote), "sur l'axe"]),
    explanation: court(`On reporte de l'autre côté de l'axe, à la même distance : ${car(d)}.`, `${cap(juste)}.`),
    canvas: dessin({ cols: u.cols, rows: u.rows, source: [u.p], axe: u.axe }),
  };
}

/** Compléter : que faut-il faire ? (★1) */
function genCompleterSens(): Gen {
  const pl = placer(figureAsym(), 0);
  const vertical = pl.axe.type === "vertical";
  return {
    text: `${moitieDebut()} ${un(["Comment complètes-tu la figure ?", "Que faut-il faire pour finir la figure ?", "Comment dessiner l'autre moitié ?"])}`,
    ...qcm("on dessine son reflet de l'autre côté de l'axe", [
      "on recopie la même moitié juste à côté, sans la retourner",
      "on dessine son reflet du même côté de l'axe",
      `on la retourne ${vertical ? "de haut en bas" : "de gauche à droite"}`,
    ]),
    explanation: court("L'axe est un miroir : l'autre moitié est le reflet de la moitié bleue, retournée de l'autre côté, à la même distance.", "On dessine son reflet de l'autre côté de l'axe."),
    canvas: dessin({ cols: pl.cols, rows: pl.rows, source: pl.source, axe: pl.axe }),
  };
}

/** Jusqu'où ira l'autre moitié ? */
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

/** La largeur (ou la hauteur) du motif complet. */
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
    explanation: court(`La moitié symétrique a la même mesure : ${W} + ${W} = ${2 * W}.`, `${cap(car(2 * W))} ${dim}.`),
    canvas: dessin({ cols: pl.cols, rows: pl.rows, source: pl.source, axe: pl.axe }),
  };
}

/** L'aire du motif complet, en carreaux ou en cm². */
function genAireComplete(cm: boolean): Gen {
  for (let k = 0; k < 20; k++) {
    const f = figureAsym();
    const a = aire(f);
    if (!Number.isInteger(a)) continue;
    const pl = placer(f, 0);
    const canvas = dessin({ cols: pl.cols, rows: pl.rows, source: pl.source, axe: pl.axe });
    if (cm) {
      return {
        text: `${moitieDebut()} Un carreau mesure 1 cm de côté. ${un([`La moitié bleue a une aire de ${a} cm².`, `Cette moitié a une aire de ${a} cm².`])} ${un([
          "Quelle sera l'aire du motif complet ?",
          "Une fois complété, quelle aire aura le motif ?",
          "Quelle surface faudra-t-il peindre en tout ?",
        ])}`,
        ...qcmN(2 * a, [a, 4 * a, a + 2, 2 * a + 1], "cm²"),
        explanation: court(`La symétrie conserve les aires : l'autre moitié mesure aussi ${a} cm². ${a} + ${a} = ${2 * a}.`, `${2 * a} cm².`),
        canvas,
      };
    }
    return {
      text: `${moitieDebut()} ${un([`Elle couvre ${a} carreaux.`, `Cette moitié recouvre ${a} carreaux.`])} ${un([
        "Combien de carreaux couvrira le motif complet ?",
        "Une fois complété, combien de carreaux le motif recouvrira-t-il ?",
        "Combien de carreaux faudra-t-il colorier en tout ?",
      ])}`,
      ...qcmC(2 * a, [a, 2 * a + 2, a + 2, 2 * a - 1]),
      explanation: court(`Le symétrique de la moitié a la même taille : il couvre aussi ${a} carreaux. ${a} + ${a} = ${2 * a}.`, `${2 * a} carreaux.`),
      canvas,
    };
  }
  return genLargeur();
}

/** Le périmètre du rectangle complété : le côté sur l'axe disparaît. */
function genPerimetreComplet(debut: () => string, demi: boolean): Gen {
  const W = entre(1, 3), H = entre(2, 4);
  const rect = [{ x: 0, y: 0 }, { x: W, y: 0 }, { x: W, y: H }, { x: 0, y: H }];
  const vertical = Math.random() < 0.5;
  const f = vertical ? rect : rect.map((p) => ({ x: p.y, y: p.x }));
  const pl = placer(f, 0, vertical ? "vertical" : "horizontal");
  const c = demi ? 0.5 : 1;
  const Pj = 2 * (2 * W + H) * c;
  const u = demi ? "0,5 cm" : "1 cm";
  return {
    text: `${debut()} La moitié bleue est un rectangle de ${car(W)} sur ${car(H)}, collé à l'axe. Un carreau mesure ${u}. ${un([
      "Quel sera le périmètre de la figure complète ?",
      "Combien mesurera le tour de la figure complète ?",
      "Quel périmètre aura le rectangle complet ?",
    ])}`,
    ...qcmN(Pj, [4 * (W + H) * c, 2 * (W + H) * c, 2 * (W + 2 * H) * c, Pj + 2 * c], "cm", c),
    explanation: court(
      `La figure complète est un rectangle de ${2 * W} carreaux sur ${H} carreaux (le côté collé à l'axe disparaît : on ne double pas le périmètre de la moitié). ${2 * W} + ${H} + ${2 * W} + ${H} = ${2 * (2 * W + H)} carreaux${demi ? `, et ${2 * (2 * W + H)} × 0,5 = ${fr(Pj)}` : ""}.`,
      `${fr(Pj)} cm.`
    ),
    canvas: dessin({ cols: pl.cols, rows: pl.rows, source: pl.source, axe: pl.axe }),
  };
}

/** Le périmètre d'un motif en L complété (★5) : deux étapes. */
function genPerimetreL(): Gen {
  // Moitié en L collée à l'axe vertical par son grand côté gauche (hauteur H).
  const a = entre(2, 3), b = 1, H = entre(3, 4), h = entre(1, H - 1);
  // L : (0,0) (a,0) (a,h) (b,h) (b,H) (0,H) — côté collé : x = 0, de 0 à H.
  const L = [{ x: 0, y: 0 }, { x: a, y: 0 }, { x: a, y: h }, { x: b, y: h }, { x: b, y: H }, { x: 0, y: H }];
  const mir = L.map((p) => ({ x: a - p.x, y: p.y })); // le côté collé passe à droite
  const pl = placer(mir, 0, "vertical");
  const Pmoitie = 2 * (a + H);
  const Pj = 2 * Pmoitie - 2 * H;
  return {
    text: `${defiDebut()} La moitié bleue a la forme d'un L, collée à l'axe. Un carreau mesure 1 cm. Son périmètre est de ${Pmoitie} cm et le côté collé à l'axe mesure ${H} cm. ${un([
      "Quel sera le périmètre de la figure complète ?",
      "Combien mesurera le tour du motif complet ?",
    ])}`,
    ...qcmN(Pj, [2 * Pmoitie, 2 * Pmoitie - H, Pmoitie + H, Pj + 2], "cm"),
    explanation: court(`Les deux moitiés ont chacune ${Pmoitie} cm de tour, mais le côté collé à l'axe (${H} cm) est compté deux fois et n'est plus sur le bord : ${Pmoitie} + ${Pmoitie} − ${H} − ${H} = ${Pj}.`, `${Pj} cm.`),
    canvas: dessin({ cols: pl.cols, rows: pl.rows, source: pl.source, axe: pl.axe }),
  };
}

/* ═════════════════ propriétés ═════════════════ */

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

/** Les propriétés, illustrées par une figure et son axe. */
function genFait(): Gen {
  const s = un(SYMS_Q);
  const { pts, cols, rows } = poserQ(s);
  const { vrais } = lignesQ(s, pts);
  const f = un(FAITS);
  return {
    text: `${introQ(s.nom)} ${un(f.q)}`,
    ...qcm(f.juste, f.faux),
    explanation: court(f.m, cap(f.juste) + "."),
    canvas: dessin({ cols, rows, source: pts, axe: un(vrais), points: false }),
  };
}

/** Un rectangle et son symétrique ont les mêmes mesures. */
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
      "Et son reflet, combien mesurera-t-il ?",
    ])}`,
    ...qcm(m(W, H), [m(2 * W, 2 * H), m(H, W), m(W + 1, H + 1), m(W, 2 * H)]),
    explanation: court("La symétrie conserve les longueurs : le symétrique d'un rectangle est un rectangle aux mêmes mesures. Avec un axe vertical ou horizontal, il ne tourne pas d'un quart de tour.", cap(m(W, H)) + "."),
    canvas: dessin({ cols: pl.cols, rows: pl.rows, source: pl.source, axe: pl.axe }),
  };
}

/** Un segment en cm (décimal) et son symétrique. */
function genLongueurCm(): Gen {
  const pl = placer(figureAsym(), entre(1, 2));
  const l = un([2.5, 3.5, 4.2, 4.8, 5.5, 6.3, 7.5, 3.8, 2.7, 6.4]);
  const obj = un(["Le côté le plus long de la figure bleue", "Un côté de la figure bleue", "Le plus grand côté de la figure bleue"]);
  return {
    text: `${ouverture()} ${obj} mesure ${fr(l)} cm. ${un([
      "Combien mesure le côté qui lui correspond sur le symétrique ?",
      "Quelle est la longueur du côté symétrique ?",
      "Combien mesurera ce côté sur la figure rouge ?",
    ])}`,
    ...qcmN(l, [2 * l, l / 2, l + 1], "cm", 0.5),
    explanation: court("La symétrie conserve les longueurs : chaque côté de l'image mesure autant que le côté de départ.", `${fr(l)} cm.`),
    canvas: dessin({ cols: pl.cols, rows: pl.rows, source: pl.source, image: pl.image, axe: pl.axe }),
  };
}

const FLECHE = [{ x: 0, y: 1 }, { x: 2, y: 1 }, { x: 2, y: 0 }, { x: 4, y: 2 }, { x: 2, y: 4 }, { x: 2, y: 3 }, { x: 0, y: 3 }];
const DIRS = ["vers la droite", "vers le bas", "vers la gauche", "vers le haut"];
const tourne = (l: Pt[]) => l.map((p) => ({ x: -p.y, y: p.x }));

/** Vers où pointe la flèche symétrique ? */
function genFleche(): Gen {
  const q = entre(0, 3);
  let f: Pt[] = FLECHE;
  for (let i = 0; i < q; i++) f = tourne(f);
  f = norm(f);
  const pl = placer(f, entre(1, 2));
  const vertical = pl.axe.type === "vertical";
  const horizontale = q % 2 === 0;
  const flip = vertical === horizontale;
  const juste = DIRS[flip ? (q + 2) % 4 : q];
  return {
    text: `${ouverture()} La flèche bleue pointe ${DIRS[q]}. ${un([
      "Vers où pointera sa symétrique ?",
      "Dans quelle direction pointera la flèche symétrique ?",
      "Où sera tournée la pointe de son reflet ?",
    ])}`,
    ...qcm(juste, DIRS),
    explanation: court(
      flip ? "La flèche pointe vers l'axe ou s'en éloigne : en se retournant comme dans un miroir, sa pointe change de sens." : "La flèche est parallèle à l'axe : le miroir la retourne, mais sa pointe garde la même direction.",
      `Elle pointera ${juste}.`
    ),
    canvas: dessin({ cols: pl.cols, rows: pl.rows, source: pl.source, axe: pl.axe }),
  };
}

/** Un point sur l'axe, ou un point et son symétrique écartés de 2d. */
function genPointAxe(): Gen {
  if (Math.random() < 0.4) {
    const u = unPoint(1);
    const p = u.axe.type === "vertical" ? { x: u.axe.x, y: u.p.y } : { x: u.p.x, y: u.axe.type === "horizontal" ? u.axe.y : 0 };
    return {
      text: `${ouverture()} Le point bleu est posé sur l'axe. ${un(["Où est son symétrique ?", "Où faut-il placer son symétrique ?", "Que devient-il par la symétrie ?"])}`,
      ...qcm("au même endroit, sur l'axe", ["à 1 carreau de l'autre côté de l'axe", "contre le bord de la feuille", "il n'a pas de symétrique"]),
      explanation: court("Un point sur l'axe est à 0 carreau de l'axe : son symétrique est à 0 carreau aussi, donc au même endroit.", "Au même endroit, sur l'axe."),
      canvas: dessin({ cols: u.cols, rows: u.rows, source: [p], axe: u.axe }),
    };
  }
  const d = entre(1, 6);
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

/** Le segment [point, symétrique] : perpendiculaire à l'axe, coupé en son milieu. */
function genPerpendiculaire(): Gen {
  const d = entre(1, 5);
  const u = unPoint(d);
  const cas = un([
    { q: ["Comment est le segment pointillé qui relie les deux points, par rapport à l'axe ?", "Le segment qui joint le point à son symétrique est…"], juste: "perpendiculaire à l'axe", faux: ["parallèle à l'axe", "confondu avec l'axe", "en biais par rapport à l'axe"], m: "Le segment qui relie un point à son symétrique coupe l'axe à angle droit." },
    { q: ["Où l'axe coupe-t-il le segment pointillé ?", "En quel point l'axe coupe-t-il le segment qui relie les deux points ?"], juste: "en son milieu", faux: ["à une de ses extrémités", "au tiers du segment", "il ne le coupe pas"], m: "Les deux points sont à la même distance de l'axe : l'axe coupe le segment en son milieu." },
    { q: ["Quel angle font l'axe et le segment pointillé ?", "L'axe et le segment qui relie les deux points forment…"], juste: "un angle droit", faux: ["un angle aigu", "un angle obtus", "aucun angle, ils sont parallèles"], m: "Le segment qui relie un point à son symétrique est perpendiculaire à l'axe : ils forment un angle droit." },
  ]);
  return {
    text: `${ouverture()} Le point rouge est le symétrique du point bleu ; un segment pointillé les relie. ${un(cas.q)}`,
    ...qcm(cas.juste, cas.faux),
    explanation: court(cas.m, cap(cas.juste) + "."),
    canvas: dessin({ cols: u.cols, rows: u.rows, source: [u.p], image: [u.img], axe: u.axe, liens: true }),
  };
}

/** Le nombre de sommets se conserve. */
function genNbSommets(): Gen {
  const pl = placer(figureAsym(), entre(1, 2));
  const n = pl.source.length;
  return {
    text: `${ouverture()} La figure bleue a ${n} sommets. ${un(["Combien de sommets aura son symétrique ?", "Et son symétrique, combien aura-t-il de sommets ?", "Combien de sommets faudra-t-il reporter ?"])}`,
    ...qcmN(n, [2 * n, n - 1, n + 1], "sommets"),
    explanation: court("Chaque sommet a un symétrique, un seul : le symétrique a autant de sommets.", `${n} sommets.`),
    canvas: dessin({ cols: pl.cols, rows: pl.rows, source: pl.source, axe: pl.axe }),
  };
}

const ORTHO = (l: Pt[]) => l.every((p, i) => { const q = l[(i + 1) % l.length]; return p.x === q.x || p.y === q.y; });
const perim = (l: Pt[]) => l.reduce((s, p, i) => { const q = l[(i + 1) % l.length]; return s + Math.abs(p.x - q.x) + Math.abs(p.y - q.y); }, 0);

/** Périmètre, aire, angle droit : tout se conserve (carreau 1 cm ou 0,5 cm). */
function genConserve(): Gen {
  for (let k = 0; k < 30; k++) {
    const f = figureAsym();
    const cas = un(["perimetre", "aire", "angle"] as const);
    if (cas === "perimetre" && !ORTHO(f)) continue;
    if (cas === "aire" && !Number.isInteger(aire(f))) continue;
    const pl = placer(f, entre(1, 2));
    const canvas = dessin({ cols: pl.cols, rows: pl.rows, source: pl.source, image: pl.image, axe: pl.axe });
    if (cas === "perimetre") {
      const c = un([1, 0.5]);
      const P = perim(f) * c;
      return {
        text: `${ouverture()} Un carreau mesure ${fr(c)} cm. La figure bleue a un périmètre de ${fr(P)} cm. ${un(["Quel est le périmètre de son symétrique rouge ?", "Combien mesure le tour de la figure rouge ?", "Quel périmètre a la figure rouge ?"])}`,
        ...qcmN(P, [2 * P, P + 2 * c, P / 2], "cm", c),
        explanation: court("La symétrie conserve les longueurs : chaque côté rouge mesure autant que son côté bleu.", `${fr(P)} cm.`),
        canvas,
      };
    }
    if (cas === "aire") {
      const a = aire(f);
      return {
        text: `${ouverture()} La figure bleue a une aire de ${a} cm² (un carreau = 1 cm²). ${un(["Quelle est l'aire de son symétrique rouge ?", "Et la figure rouge, quelle aire a-t-elle ?", "Quelle surface couvre la figure rouge ?"])}`,
        ...qcmN(a, [2 * a, a + 1, a - 1], "cm²"),
        explanation: court("Le symétrique a la même forme et la même taille : il a la même aire.", `${a} cm².`),
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
      ...qcm("il a aussi un angle droit, au coin correspondant", ["il n'a plus d'angle droit", "il a deux fois plus d'angles droits", "son angle devient plus ouvert"]),
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
  "le segment qui relie un point à son symétrique est perpendiculaire à l'axe",
  "l'axe coupe le segment qui relie un point à son symétrique en son milieu",
  "le symétrique d'un segment a la même longueur",
];
const FAUSSES = [
  "le symétrique d'une figure a seulement glissé de l'autre côté",
  "on compte les carreaux depuis le bord de la feuille",
  "le symétrique d'une figure est deux fois plus grand",
  "un axe de symétrie est toujours vertical",
  "le symétrique d'un point est deux fois plus loin de l'axe",
  "le segment qui relie un point à son symétrique est parallèle à l'axe",
  "le symétrique d'un angle droit n'est plus un angle droit",
];

/** Quelle phrase est vraie ? */
function genPhraseVraie(): Gen {
  const pl = placer(figureAsym(), entre(1, 2));
  const p = perso();
  return {
    text: `${p.txt} ${un(["prépare un exposé sur la symétrie.", "vérifie ses symétries avant de colorier.", "explique la symétrie à sa petite sœur.", "corrige le dessin d'un camarade."])} ${un(["Quelle phrase est vraie ?", "Laquelle de ces phrases est juste ?", "Quelle règle est correcte ?"])}`,
    ...qcm(un(VRAIES), FAUSSES),
    explanation: court("Sur le dessin, la figure rouge est le symétrique de la bleue : même taille, même distance à l'axe, retournée comme dans un miroir, chaque point relié à son symétrique par un segment perpendiculaire à l'axe.", "Seule la phrase juste respecte ces règles."),
    canvas: dessin({ cols: pl.cols, rows: pl.rows, source: pl.source, image: pl.image, axe: pl.axe }),
  };
}

/* ═════════════════ la banque ═════════════════ */

type Fixe = Omit<Extract<TutorBankItemV4, { kind: "fixed" }>, "kind" | "niveau" | "matiere" | "notionId" | "theme">;
const fixe = (f: Fixe): TutorBankItemV4 => ({ kind: "fixed", niveau: "cm2", matiere: "maths", notionId: "symetrie", theme: "neutral", ...f });

const tpl = (fab: ReturnType<typeof atelier>, n: number, d: DifficultyLevel, hint: string, g: () => Gen) => fab(n, d, hint, g);

const TOUTES = ["carre", "rectangle", "losange", "equilateral", "isocele", "trapeze", "parallelogramme", "cercle"];
const PIEGES = ["rectangle", "losange", "parallelogramme", "equilateral", "cercle"];
const USUELLES_SIMPLES = ["carre", "rectangle", "isocele", "trapeze", "equilateral"];

export const symetrieBank: TutorBankItemV4[] = [
  /* ── SYMETRIE_AXE (★1-★4) ── */
  fixe({
    id: "cm2_symetrie_axe_fixed_1_definition",
    microId: "symetrie_axe",
    difficulty: 1,
    text: "Un axe de symétrie fonctionne comme...",
    format: "qcm",
    choices: ["un miroir", "une règle graduée", "un compas", "une loupe"],
    expected: ["un miroir"],
    comparator: "mcq_exact",
    hint: "Imagine que l'on plie la figure.",
    explanation: "Un axe de symétrie fonctionne comme un miroir. Si on plie selon cet axe, les deux parties se superposent.",
    tags: ["cm2", "symetrie", "axe", "definition", "qcm"],
  }),
  tpl(A.axe, 10, 1, "Plie la figure en pensée le long de la ligne verte.", genLigneAxe),
  tpl(A.axe, 11, 1, "Les figures sont-elles côte à côte ou l'une au-dessus de l'autre ?", () => genOrientation(0)),
  tpl(A.axe, 12, 1, "C'est la ligne de pliage.", genNomAxe),
  tpl(A.axe, 13, 2, "L'axe est au milieu de l'écart entre les deux figures.", () => genMilieu(true)),
  tpl(A.axe, 14, 2, "Regarde comment la figure s'est retournée.", () => genOrientation(0.35)),
  tpl(A.axe, 15, 2, "Plie la figure en pensée le long de la ligne verte.", () => genLigneUsuelle(USUELLES_SIMPLES)),
  tpl(A.axe, 16, 2, "Essaie tous les pliages : vertical, horizontal, en diagonale.", () => genAxesUsuelle(["carre", "rectangle", "isocele", "trapeze"])),
  tpl(A.axe, 17, 3, "Imagine chaque lettre pliée.", genLettres),
  tpl(A.axe, 18, 3, "Essaie tous les pliages : vertical, horizontal, en diagonale.", () => genAxesUsuelle(TOUTES)),
  tpl(A.axe, 19, 3, "Compte les carreaux entre les figures, puis prends la moitié.", () => genMilieu(false)),
  tpl(A.axe, 20, 3, "Plie la figure en pensée le long de la ligne verte.", () => genLigneUsuelle(TOUTES)),
  tpl(A.axe, 21, 4, "Une diagonale n'est pas toujours un axe de symétrie.", genDiagonale),
  tpl(A.axe, 22, 4, "Rectangle, losange, parallélogramme : attention aux pièges.", () => genAxesUsuelle(PIEGES)),
  tpl(A.axe, 23, 4, "Un axe peut être vertical, horizontal ou en biais.", () => genOrientation(0.6)),
  tpl(A.axe, 24, 4, "Récite les axes des figures usuelles.", genQuelleFigure),
  tpl(A.axe, 25, 4, "Toute droite qui passe par le centre…", genCercle),

  /* ── SYMETRIE_COMPLETER (★1-★5) ── */
  fixe({
    id: "cm2_symetrie_completer_fixed_7_point_sur_axe",
    microId: "symetrie_completer",
    difficulty: 3,
    text: "Pour compléter une figure, que devient un sommet placé sur l'axe de symétrie ?",
    format: "qcm",
    choices: ["il reste à sa place", "il passe à 1 carreau de l'autre côté", "il va contre le bord de la feuille", "il disparaît"],
    expected: ["il reste à sa place"],
    comparator: "mcq_exact",
    hint: "Il est à 0 carreau de l'axe.",
    explanation: "Un sommet sur l'axe est à 0 carreau de l'axe : son symétrique est lui-même, il reste à sa place.",
    tags: ["cm2", "symetrie", "completer", "point_sur_axe", "qcm"],
  }),
  tpl(A.completer, 10, 1, "Reporte de l'autre côté de l'axe, à la même distance.", genCompleterPoint),
  tpl(A.completer, 11, 1, "L'axe est un miroir.", genCompleterSens),
  tpl(A.completer, 12, 2, "L'autre moitié va aussi loin de l'axe que la moitié bleue.", genJusquou),
  tpl(A.completer, 13, 2, "Vérifie chaque sommet : même distance à l'axe, de l'autre côté, et la moitié doit être retournée.", () => genVerifier(0, 0, moitieDebut)),
  tpl(A.completer, 14, 2, "Les deux moitiés ont la même mesure.", genLargeur),
  tpl(A.completer, 15, 3, "Les deux moitiés couvrent autant de carreaux.", () => genAireComplete(false)),
  tpl(A.completer, 16, 3, "Compte jusqu'à l'axe, puis autant de l'autre côté.", () => genSepareFigure(true)),
  tpl(A.completer, 17, 3, H_AXE, () => genSommet(true)),
  tpl(A.completer, 18, 4, "Avec un axe oblique, suis les diagonales des carreaux.", () => genOblique(ouverture, true)),
  tpl(A.completer, 19, 4, "La symétrie conserve les aires.", () => genAireComplete(true)),
  tpl(A.completer, 20, 4, "Le côté collé à l'axe n'est plus sur le tour de la figure complète.", () => genPerimetreComplet(moitieDebut, false)),
  tpl(A.completer, 21, 5, "Avec un axe oblique, suis les diagonales des carreaux.", () => genPointOblique()),
  tpl(A.completer, 22, 5, "Compte le tour en carreaux, puis multiplie par 0,5.", () => genPerimetreComplet(moitieDebut, true)),
  tpl(A.completer, 23, 5, "Avec un axe oblique, suis les diagonales des carreaux.", () => genOblique(defiDebut, true)),

  /* ── SYMETRIE_CONSTRUIRE (★2-★4) ── */
  fixe({
    id: "cm2_symetrie_construire_fixed_1_point_methode",
    microId: "symetrie_construire",
    difficulty: 2,
    text: "Pour construire le symétrique d'un point, on le place...",
    format: "qcm",
    choices: ["de l'autre côté de l'axe, à la même distance", "du même côté de l'axe, à la même distance", "de l'autre côté de l'axe, deux fois plus loin", "contre le bord de la feuille"],
    expected: ["de l'autre côté de l'axe, à la même distance"],
    comparator: "mcq_exact",
    hint: "L'axe est un miroir.",
    explanation: "Le symétrique d'un point est de l'autre côté de l'axe, sur la perpendiculaire à l'axe, à la même distance.",
    tags: ["cm2", "symetrie", "construire", "methode", "qcm"],
  }),
  tpl(A.construire, 10, 2, "Le symétrique est de l'autre côté de l'axe, à la même distance.", () => genPointOu()),
  tpl(A.construire, 11, 2, H_AXE, () => genSommet(false)),
  tpl(A.construire, 12, 2, "Compte jusqu'à l'axe, puis autant de l'autre côté.", genSepare),
  tpl(A.construire, 13, 3, "Vérifie chaque sommet : même distance à l'axe, de l'autre côté, et la figure doit être retournée.", () => genVerifier(1, 3)),
  tpl(A.construire, 14, 3, "Compte jusqu'à l'axe, puis autant de l'autre côté.", () => genSepareFigure(false)),
  tpl(A.construire, 15, 3, "Le point et son symétrique sont sur une perpendiculaire à l'axe.", genEquerre),
  tpl(A.construire, 16, 4, "Avec un axe oblique, compte en suivant les diagonales des carreaux.", () => genOblique()),
  tpl(A.construire, 17, 4, "Un sommet posé sur l'axe est son propre symétrique.", genSommetsFixes),
  tpl(A.construire, 18, 4, "Vérifie chaque sommet, même ceux qui touchent l'axe.", () => genVerifier(0, 1)),
  tpl(A.construire, 19, 4, "Avec un axe oblique, suis les diagonales des carreaux.", () => genPointOblique()),

  /* ── SYMETRIE_PROPRIETE (★2-★4) ── */
  fixe({
    id: "cm2_symetrie_propriete_fixed_4_conserve_longueurs",
    microId: "symetrie_propriete",
    difficulty: 3,
    text: "Une symétrie axiale conserve...",
    format: "qcm",
    choices: ["les longueurs, les angles et les aires", "seulement les longueurs", "seulement la forme, pas la taille", "rien : tout change"],
    expected: ["les longueurs, les angles et les aires"],
    comparator: "mcq_exact",
    hint: "Pense à un reflet dans un miroir.",
    explanation: "Le reflet a exactement la même forme et la même taille : longueurs, angles et aires sont conservés.",
    tags: ["cm2", "symetrie", "propriete", "conservation", "qcm"],
  }),
  tpl(A.propriete, 10, 2, "Pense au pliage le long de l'axe.", genFait),
  tpl(A.propriete, 11, 2, "La symétrie ne change pas les longueurs.", genMesures),
  tpl(A.propriete, 12, 2, "Un point et son symétrique : même distance à l'axe.", () => genPointOu()),
  tpl(A.propriete, 13, 3, "La flèche pointe-t-elle vers l'axe, ou le long de l'axe ?", genFleche),
  tpl(A.propriete, 14, 3, "L'axe est à mi-chemin entre un point et son symétrique.", genPointAxe),
  tpl(A.propriete, 15, 3, "Le segment qui relie un point à son symétrique coupe l'axe à angle droit.", genPerpendiculaire),
  tpl(A.propriete, 16, 3, "La symétrie conserve les longueurs.", genLongueurCm),
  tpl(A.propriete, 17, 4, "La symétrie conserve les longueurs, les angles et les aires.", genConserve),
  tpl(A.propriete, 18, 4, "Regarde le dessin : même taille, même distance à l'axe, retournée.", genPhraseVraie),
  tpl(A.propriete, 19, 4, "Le symétrique est retourné, pas glissé.", () => genVerifier(1, 2)),
  tpl(A.propriete, 20, 4, "Chaque sommet a un seul symétrique.", genNbSommets),

  /* ── SYMETRIE_DEFI (★4-★5) ── */
  fixe({
    id: "cm2_symetrie_defi_fixed_5_devinette_axe",
    microId: "symetrie_defi",
    difficulty: 4,
    text: "Je suis une droite qui permet de plier une figure en deux parties superposables. Qui suis-je ?",
    format: "qcm",
    choices: ["un axe de symétrie", "une diagonale", "un rayon", "un côté"],
    expected: ["un axe de symétrie"],
    comparator: "mcq_exact",
    hint: "C'est la ligne de pliage, le miroir.",
    explanation: "La droite de pliage qui superpose les deux parties est un axe de symétrie.",
    tags: ["cm2", "symetrie", "defi", "devinette", "qcm"],
  }),
  tpl(A.defi, 10, 4, "Le côté collé à l'axe n'est plus sur le tour de la figure complète.", () => genPerimetreComplet(defiDebut, false)),
  tpl(A.defi, 11, 4, "Avec un axe oblique, compte en suivant les diagonales des carreaux.", () => genOblique(defiDebut)),
  tpl(A.defi, 12, 4, "Une diagonale n'est pas toujours un axe de symétrie.", genDiagonale),
  tpl(A.defi, 13, 4, "Rectangle, losange, parallélogramme, cercle : attention aux pièges.", () => genAxesUsuelle(PIEGES, defiDebut)),
  tpl(A.defi, 14, 4, "Vérifie chaque sommet : même distance à l'axe, de l'autre côté, et retournée.", () => genVerifier(1, 3, defiDebut)),
  tpl(A.defi, 15, 4, "L'autre moitié va aussi loin de l'axe que la moitié bleue.", () => genSepareFigure(true, defiDebut)),
  tpl(A.defi, 16, 5, "Les deux moitiés ont le même tour, mais le côté collé à l'axe disparaît.", genPerimetreL),
  tpl(A.defi, 17, 5, "Compte le tour en carreaux, puis multiplie par 0,5.", () => genPerimetreComplet(defiDebut, true)),
  tpl(A.defi, 18, 5, "Avec un axe oblique, suis les diagonales des carreaux.", () => genPointOblique(defiDebut)),
  tpl(A.defi, 19, 5, "Essaie tous les pliages, même en diagonale.", () => genAxesUsuelle(["hexagone", "equilateral", "losange", "cercle", "parallelogramme"], defiDebut)),
  tpl(A.defi, 20, 5, "Avec un axe oblique, compte en suivant les diagonales des carreaux.", () => genOblique(defiDebut, true)),
];
