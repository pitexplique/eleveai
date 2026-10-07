// ─── La médiatrice d'un segment (6e) ───────────────────────────────────────────
//
// ⛔ POURQUOI CETTE BANQUE EXISTE (22/08/2026). La médiatrice est un chapitre
// entier du programme de 6e — trois objectifs d'apprentissage — et le coach
// n'en avait AUCUNE micro. C'est pourtant la notion qui tient toute la
// géométrie de l'année : la symétrie axiale se DÉFINIT par elle (« (d) est la
// médiatrice de [MM'] »), le cercle circonscrit en découle, et la construction
// du milieu au compas n'est rien d'autre qu'elle.
//
// Les objectifs, mot pour mot (Exemples pour la mise en œuvre des programmes,
// 6e, 2025, p. 12-13) :
//   · « Connaître la définition de la médiatrice d'un segment » ;
//   · « Comprendre et utiliser la propriété caractéristique de la médiatrice
//     d'un segment » ;
//   · « Résoudre des problèmes en s'appuyant sur la propriété caractéristique
//     de la médiatrice ».
//
// ⭐ « PROPRIÉTÉ CARACTÉRISTIQUE » VEUT DIRE DEUX SENS, ET C'EST TOUT L'ENJEU.
// Le BO les énonce séparément, et l'élève n'en retient qu'un :
//   · si un point est SUR la médiatrice, alors il est équidistant de A et B ;
//   · si un point est équidistant de A et B, alors il est SUR la médiatrice.
// C'est le second qui sert à DÉMONTRER — retrouver le centre d'un cercle,
// prouver qu'un point est sur la médiatrice — et c'est celui qu'on oublie.
// `mediatrice_propriete` porte les deux, dans les deux ordres.
//
// Les deux problèmes que le BO cite sont ici : « l'élève place le milieu d'une
// corde d'un cercle de centre connu en utilisant une équerre » et « l'élève
// détermine le centre inconnu d'un cercle et justifie sa construction ».

import type { TutorBankItemV4, DroitesCanvasData, CercleCanvasData, TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { PRENOMS, de, type Prenom } from "./entiers.bank";

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function expl(calcul: string) {
  return (
    "Définition : la médiatrice d'un segment est la droite perpendiculaire à ce segment passant par son milieu.\n\n" +
    "Méthode : on retient la propriété caractéristique dans les DEUX sens — être sur la médiatrice, c'est être à égale distance des deux extrémités, et réciproquement.\n\n" +
    "Calcul : " +
    calcul +
    "\n\nConclusion : on garde la réponse obtenue."
  );
}

const A = { x: 55, y: 175 };
const B = { x: 285, y: 175 };
const M = { x: (A.x + B.x) / 2, y: A.y };

/**
 * [AB] et une droite qui le coupe. `perpendiculaire` et `parMilieu` se règlent
 * séparément — c'est ainsi qu'on montre qu'il FAUT les deux : une droite qui
 * ne remplit qu'une des deux conditions n'est pas la médiatrice.
 */
function segmentEtDroite(opts: {
  perpendiculaire: boolean;
  parMilieu: boolean;
  labelDroite?: string;
  pointSurDroite?: { label: string; hauteur: number };
  marquerMilieu?: boolean;
  /** Les noms des extrémités et du milieu (A, B, M par défaut) : ceux de l'énoncé. */
  noms?: { a: string; b: string; m?: string };
}): DroitesCanvasData {
  const na = opts.noms?.a ?? "A";
  const nb = opts.noms?.b ?? "B";
  const nm = opts.noms?.m ?? "M";
  const xCoupe = opts.parMilieu ? M.x : M.x + 55;
  // ⚠️ 06/10/2026 : la droite oblique doit couper le segment EXACTEMENT en
  // (xCoupe, A.y). Avant, elle était centrée à mi-hauteur du cadre et passait
  // à 4,6 px du milieu — le correcteur l'a vu.
  const pente = 110 / 240;
  const haut = opts.perpendiculaire
    ? { x: xCoupe, y: 45 }
    : { x: xCoupe - pente * (A.y - 45), y: 45 };
  const bas = opts.perpendiculaire
    ? { x: xCoupe, y: 285 }
    : { x: xCoupe + pente * (285 - A.y), y: 285 };

  const points: DroitesCanvasData["points"] = [
    { x: A.x, y: A.y, label: na },
    { x: B.x, y: B.y, label: nb },
  ];
  if (opts.marquerMilieu) {
    points.push({ x: M.x, y: M.y, label: nm, color: "#ef4444", highlight: true });
  }
  if (opts.pointSurDroite) {
    points.push({
      x: xCoupe,
      y: opts.pointSurDroite.hauteur,
      label: opts.pointSurDroite.label,
      color: "#7c3aed",
      highlight: true,
    });
  }

  const lines: DroitesCanvasData["lines"] = [
    { id: "AB", type: "segment", from: A, to: B },
    {
      id: "d",
      type: "droite",
      from: haut,
      to: bas,
      color: "#2563eb",
      label: opts.labelDroite,
      display: { showLabel: Boolean(opts.labelDroite), extend: true },
    },
  ];

  if (opts.pointSurDroite) {
    lines.push(
      {
        id: "PA",
        type: "segment",
        from: { x: xCoupe, y: opts.pointSurDroite.hauteur },
        to: A,
        dashed: true,
        color: "#7c3aed",
      },
      {
        id: "PB",
        type: "segment",
        from: { x: xCoupe, y: opts.pointSurDroite.hauteur },
        to: B,
        dashed: true,
        color: "#7c3aed",
      }
    );
  }

  return {
    kind: "droites",
    size: { width: 340, height: 320 },
    lines,
    points,
    markers: opts.perpendiculaire
      ? { rightAngles: [{ x: xCoupe, y: A.y, lineA: "AB", lineB: "d" }] }
      : undefined,
    display: {
      showLabels: true,
      showPoints: true,
      showRightAngleMarkers: opts.perpendiculaire,
    },
  };
}

/** Un cercle et une corde : le support des deux problèmes du BO. */
function cercleAvecCorde(opts: { centreVisible: boolean; noms?: { o: string; p: string; q: string } }): CercleCanvasData {
  const cx = 170;
  const cy = 140;
  const r = 90;
  const n = opts.noms ?? { o: "O", p: "P", q: "Q" };
  const points: CercleCanvasData["points"] = [
    { id: "P", x: cx - 64, y: cy - 63, label: n.p },
    { id: "Q", x: cx + 80, y: cy + 41, label: n.q },
  ];
  if (opts.centreVisible) {
    points.unshift({ id: "O", x: cx, y: cy, label: n.o, color: "#ef4444", highlight: true });
  }
  return {
    kind: "cercle",
    size: { width: 340, height: 290 },
    circle: { cx, cy, r, showCircle: true },
    points,
    segments: [{ id: "corde", kind: "corde", from: "P", to: "Q", label: "corde", highlight: true }],
    display: { showLabels: true, showPoints: true, showCenter: opts.centreVisible },
  };
}

// =====================================================================
// ⭐ 06/10/2026 — DES SITUATIONS, PAS UNE PHRASE (PASSATION-COACH-MATHS-6E-CONSIGNE.md).
// Mesuré le 05/10 : 7 à 12 squelettes par micro, 13 à 18 répétitions sur 20 —
// le segment s'appelait toujours [AB]. Les gabarits tirent maintenant les noms
// des points, une situation (deux arbres, deux maisons, un rond-point…), une
// tournure et un prénom ; les figures portent les noms de l'énoncé. Les
// questions « Explique… » à mots-clés (« deux » validait n'importe quoi) sont
// devenues des QCM sur les mêmes idées. Correcteurs : correcteurs/mediatrice.ts.
// =====================================================================
type Q = TutorGeneratedQuestionV4;
const pick = <T,>(arr: readonly T[]): T => arr[Math.floor(Math.random() * arr.length)];
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const fr = (n: number) => String(Math.round(n * 100) / 100).replace(".", ",");
const prenom = (): Prenom => pick(PRENOMS);
const il = (P: Prenom) => (P.f ? "elle" : "il");
// Sans O (réservé au centre d'un cercle) ni Q, trop proche de O à l'écran.
const LETTRES = "ABCDEFGHIJKLMNPRSTUVWXYZ".split("");
/** Des lettres distinctes : [E, F] (extrémités, dans l'ordre), puis d'autres points. */
function lettres(n: number) {
  const l = shuffle(LETTRES).slice(0, n);
  const [a, b] = [l[0], l[1]].sort();
  return [a, b, ...l.slice(2)];
}
/** Deux lieux réels et ce qu'on veut placer à égale distance d'eux. */
type Lieux = { quoi: string; entre: string; u: "m" | "km"; min: number; max: number };
const LIEUX: Lieux[] = [
  { quoi: "une fontaine", entre: "deux maisons", u: "m", min: 20, max: 90 },
  { quoi: "un banc", entre: "deux arbres", u: "m", min: 4, max: 20 },
  { quoi: "une poubelle", entre: "deux bancs", u: "m", min: 3, max: 15 },
  { quoi: "un lampadaire", entre: "deux portails", u: "m", min: 6, max: 30 },
  { quoi: "une table de pique-nique", entre: "deux barbecues", u: "m", min: 5, max: 25 },
  { quoi: "un plot", entre: "les deux buts du terrain", u: "m", min: 20, max: 60 },
  { quoi: "une bouée", entre: "deux plongeoirs", u: "m", min: 8, max: 25 },
  { quoi: "une ruche", entre: "deux pommiers", u: "m", min: 5, max: 30 },
  { quoi: "une antenne", entre: "deux villages", u: "km", min: 2, max: 12 },
  { quoi: "un point de rendez-vous", entre: "deux arrêts de bus", u: "m", min: 50, max: 300 },
  { quoi: "un arrosoir", entre: "deux bacs à fleurs", u: "m", min: 2, max: 8 },
  { quoi: "un tapis de gym", entre: "deux espaliers", u: "m", min: 4, max: 12 },
  { quoi: "un feu de camp", entre: "deux tentes", u: "m", min: 6, max: 20 },
  { quoi: "une cabane", entre: "deux chênes", u: "m", min: 8, max: 40 },
];
const distanceLieux = (l: Lieux) => (l.max <= 12 && Math.random() < 0.4 ? randomInt(l.min * 2, l.max * 2) / 2 : randomInt(l.min, l.max));
/** Une phrase d'entrée sur le segment [EF], avec un prénom. */
function introSegment(E: string, F: string, P: Prenom) {
  return pick([
    `${P.nom} a tracé le segment [${E}${F}].`,
    `Sur le cahier ${de(P.nom)}, on voit le segment [${E}${F}].`,
    `${P.nom} étudie le segment [${E}${F}].`,
    `Dans l’exercice ${de(P.nom)}, il y a un segment [${E}${F}].`,
  ]);
}

// ----- MEDIATRICE_DEFINITION
function genMedDefinition(): Q {
  const [E, F] = lettres(2);
  const P = prenom();
  const s = `[${E}${F}]`;
  const mode = pick(["definition", "conditions", "unique"] as const);
  if (mode === "definition") {
    const juste = `la droite perpendiculaire à ${s} qui passe par son milieu`;
    return {
      text: `${introSegment(E, F, P)} ${pick([`Qu’est-ce que la médiatrice de ${s} ?`, `Quelle droite est la médiatrice de ${s} ?`, `Choisis la définition de la médiatrice de ${s}.`])}`,
      format: "qcm",
      choices: shuffle([juste, `la droite qui passe par le milieu de ${s}`, `la droite perpendiculaire à ${s} qui passe par ${E}`, `la droite parallèle à ${s} qui passe par son milieu`]),
      expected: [juste],
      comparator: "mcq_exact",
      explanation: expl(`La médiatrice de ${s} remplit DEUX conditions à la fois : elle est perpendiculaire à ${s}, et elle passe par son milieu. Une seule des deux ne suffit pas.`),
    };
  }
  if (mode === "conditions") {
    const juste = `elle coupe ${s} en son milieu, à angle droit`;
    return {
      text: `${P.nom} trace la médiatrice de ${s}. ${pick(["Que sait-on de cette droite ?", `Comment cette droite coupe-t-elle ${s} ?`])}`,
      format: "qcm",
      choices: shuffle([juste, `elle coupe ${s} en ${E}, à angle droit`, `elle coupe ${s} en son milieu, en biais`, `elle ne coupe pas ${s}`]),
      expected: [juste],
      comparator: "mcq_exact",
      explanation: expl(`La médiatrice de ${s} passe par son milieu ET lui est perpendiculaire : elle le coupe en son milieu, à angle droit.`),
    };
  }
  const juste = "une seule";
  return {
    text: `${introSegment(E, F, P)} ${pick([`Combien de médiatrices le segment ${s} a-t-il ?`, `${P.nom} peut-${il(P)} tracer plusieurs médiatrices de ${s} ? Combien y en a-t-il ?`])}`,
    format: "qcm",
    choices: shuffle([juste, "deux", "une infinité", "aucune"]),
    expected: [juste],
    comparator: "mcq_exact",
    explanation: expl(`${s} n’a qu’un milieu, et par ce point il ne passe qu’une seule perpendiculaire à ${s}. La médiatrice est donc unique.`),
  };
}
/** Les quatre réponses possibles à « (d) est-elle la médiatrice de [EF] ? ». */
function choixMediatrice(s: string) {
  return {
    oui: `oui : elle est perpendiculaire à ${s} et passe par son milieu`,
    pasMilieu: `non : elle est perpendiculaire à ${s}, mais ne passe pas par son milieu`,
    pasPerp: `non : elle passe par le milieu de ${s}, mais n’est pas perpendiculaire`,
    aucune: `non : elle n’est pas perpendiculaire à ${s} et ne passe pas par son milieu`,
  };
}
function genMedFigure(): Q {
  const [E, F, M] = lettres(3);
  const P = prenom();
  const s = `[${E}${F}]`;
  const perpendiculaire = Math.random() < 0.6;
  const parMilieu = Math.random() < 0.6;
  const c = choixMediatrice(s);
  const rep = perpendiculaire && parMilieu ? c.oui : perpendiculaire ? c.pasMilieu : parMilieu ? c.pasPerp : c.aucune;
  return {
    text: `${pick([`${P.nom} a tracé la droite (d) et le segment ${s}.`, `Sur la figure ${de(P.nom)}, ${M} est le milieu de ${s}.`, `Observe la droite (d) et le segment ${s}.`])} ${pick([`La droite (d) est-elle la médiatrice de ${s} ?`, `(d) est-elle la médiatrice de ${s} ?`])}`,
    format: "qcm",
    choices: shuffle(Object.values(c)),
    expected: [rep],
    comparator: "mcq_exact",
    explanation: expl(
      `On vérifie les deux conditions sur la figure : la marque d’angle droit (perpendiculaire ?) et le point ${M}, milieu de ${s} (passe-t-elle par lui ?). ${
        rep === c.oui ? "Les deux sont remplies : c’est la médiatrice." : "Il en manque au moins une : ce n’est pas la médiatrice."
      }`,
    ),
    canvas: segmentEtDroite({ perpendiculaire, parMilieu, labelDroite: "(d)", marquerMilieu: true, noms: { a: E, b: F, m: M } }),
  };
}
function genMedMesures(): Q {
  const [E, F, K] = lettres(3);
  const P = prenom();
  const s = `[${E}${F}]`;
  const L = randomInt(4, 16) + (Math.random() < 0.3 ? 0.5 : 0);
  const milieu = L / 2;
  const parMilieu = Math.random() < 0.55;
  const x = parMilieu ? milieu : pick([milieu - 1, milieu + 1, milieu - 0.5, milieu + 1.5]);
  const perp = Math.random() < 0.55;
  const angle = perp ? 90 : pick([60, 70, 75, 80, 85, 100, 110]);
  const c = choixMediatrice(s);
  const rep = perp && parMilieu ? c.oui : perp ? c.pasMilieu : parMilieu ? c.pasPerp : c.aucune;
  return {
    text: `${pick([`${P.nom} trace un segment ${s} de ${fr(L)} cm.`, `Le segment ${s} mesure ${fr(L)} cm.`, `Sur une feuille, ${P.nom} mesure ${E}${F} = ${fr(L)} cm.`])} Une droite (d) coupe ${s} au point ${K}, avec ${E}${K} = ${fr(x)} cm, et fait avec ${s} un angle de ${angle}°. ${pick([`(d) est-elle la médiatrice de ${s} ?`, `Est-ce la médiatrice de ${s} ?`])}`,
    format: "qcm",
    choices: shuffle(Object.values(c)),
    expected: [rep],
    comparator: "mcq_exact",
    explanation: expl(
      `Le milieu de ${s} est à ${fr(L)} ÷ 2 = ${fr(milieu)} cm de ${E}. ${parMilieu ? `${K} est bien le milieu.` : `${K} est à ${fr(x)} cm de ${E} : ce n’est pas le milieu.`} ${perp ? "L’angle est droit (90°)." : `L’angle mesure ${angle}° : ce n’est pas un angle droit.`}`,
    ),
  };
}
function genMedRaisons(): Q {
  const [E, F] = lettres(2);
  const P = prenom();
  const s = `[${E}${F}]`;
  const cas = pick([
    {
      q: `${P.nom} dit : « Ma droite passe par le milieu de ${s}, donc c’est sa médiatrice. » A-t-${il(P)} raison ?`,
      juste: "non : il faut aussi qu’elle soit perpendiculaire à " + s,
      faux: ["oui : passer par le milieu suffit", "oui, si la droite est assez longue", "non : une médiatrice ne passe jamais par le milieu"],
      r: `Une infinité de droites passent par le milieu de ${s}. Une seule lui est perpendiculaire : c’est elle, la médiatrice.`,
    },
    {
      q: `${P.nom} dit : « Ma droite est perpendiculaire à ${s}, donc c’est sa médiatrice. » A-t-${il(P)} raison ?`,
      juste: `non : il faut aussi qu’elle passe par le milieu de ${s}`,
      faux: ["oui : être perpendiculaire suffit", "oui, si elle coupe le segment", "non : une médiatrice n’est jamais perpendiculaire"],
      r: `Une infinité de droites sont perpendiculaires à ${s}. Une seule passe par son milieu : c’est elle, la médiatrice.`,
    },
    {
      q: `La médiatrice de ${s} est-elle un segment, une demi-droite ou une droite ?`,
      juste: "une droite : elle se prolonge sans fin des deux côtés",
      faux: [`un segment de même longueur que ${s}`, `une demi-droite qui part du milieu de ${s}`, `cela dépend de la longueur de ${s}`],
      r: `C’est une DROITE. On n’en dessine qu’un morceau, mais tous ses points, même très loin, restent à égale distance de ${E} et de ${F}.`,
    },
  ]);
  return {
    text: cas.q,
    format: "qcm",
    choices: shuffle([cas.juste, ...cas.faux]),
    expected: [cas.juste],
    comparator: "mcq_exact",
    explanation: expl(cas.r),
  };
}

// ----- MEDIATRICE_PROPRIETE
/** Une situation : deux lieux en E et F, un point K sur la médiatrice de [EF]. */
function situationLieux() {
  const [E, F, K] = lettres(3);
  const l = pick(LIEUX);
  const P = prenom();
  return { E, F, K, l, P, s: `[${E}${F}]` };
}
function genMedDistance(): Q {
  const { E, F, K, l, P, s } = situationLieux();
  const enSituation = Math.random() < 0.7;
  const d = enSituation ? distanceLieux(l) : randomInt(3, 14) + (Math.random() < 0.3 ? 0.5 : 0);
  const u = enSituation ? l.u : "cm";
  const [X, Y] = Math.random() < 0.5 ? [E, F] : [F, E];
  const text = enSituation
    ? `${cap(l.entre)} sont aux points ${E} et ${F}. ${P.nom} place ${l.quoi} au point ${K}, sur la médiatrice de ${s}. On mesure ${K}${X} = ${fr(d)} ${u}. ${pick([`Combien mesure ${K}${Y} ?`, `À quelle distance de ${Y} se trouve le point ${K} ?`])}`
    : `Le point ${K} est sur la médiatrice de ${s} et ${K}${X} = ${fr(d)} ${u}. ${pick([`Combien mesure ${K}${Y} ?`, `Quelle est la longueur ${K}${Y} ?`])}`;
  return {
    text,
    format: "short",
    expected: [`${fr(d)} ${u}`],
    comparator: "number_equal",
    explanation: expl(`${K} est sur la médiatrice de ${s} : il est à égale distance de ${E} et de ${F}. Donc ${K}${Y} = ${K}${X} = ${fr(d)} ${u}.`),
  };
}
function genMedTrajet(): Q {
  const { E, F, K, l, P, s } = situationLieux();
  const u = l.u;
  const b = distanceLieux(l);
  // K hors du segment : KE plus grand que la moitié de EF.
  const a = Math.round((b / 2 + Math.max(1, Math.round(b * pick([0.2, 0.4, 0.6])))) * 2) / 2;
  if (Math.random() < 0.5) {
    return {
      text: `${cap(l.entre)} sont en ${E} et en ${F}, avec ${E}${F} = ${fr(b)} ${u}. ${cap(l.quoi)} est au point ${K}, sur la médiatrice de ${s}, avec ${K}${E} = ${fr(a)} ${u}. ${P.nom} va de ${E} à ${K}, puis de ${K} à ${F}. ${pick(["Quelle distance parcourt-" + il(P) + " ?", "Combien de chemin fait-" + il(P) + " ?"])}`,
      format: "short",
      expected: [`${fr(2 * a)} ${u}`],
      comparator: "number_equal",
      explanation: expl(`${K} est sur la médiatrice de ${s}, donc ${K}${F} = ${K}${E} = ${fr(a)} ${u}. Le trajet mesure ${fr(a)} + ${fr(a)} = ${fr(2 * a)} ${u}.`),
    };
  }
  return {
    text: `Le point ${K} est sur la médiatrice de ${s}. On sait que ${K}${E} = ${fr(a)} cm et ${E}${F} = ${fr(b)} cm. ${pick([`Quel est le périmètre du triangle ${E}${F}${K} ?`, `Calcule le périmètre du triangle ${E}${F}${K}.`])}`,
    format: "short",
    expected: [`${fr(2 * a + b)} cm`],
    comparator: "number_equal",
    explanation: expl(`${K} est sur la médiatrice de ${s}, donc ${K}${F} = ${K}${E} = ${fr(a)} cm. Périmètre : ${fr(a)} + ${fr(a)} + ${fr(b)} = ${fr(2 * a + b)} cm.`),
  };
}
function genMedReciproque(): Q {
  const { E, F, K, l, P, s } = situationLieux();
  const egales = Math.random() < 0.5;
  const enSituation = Math.random() < 0.6;
  const u = enSituation ? l.u : "cm";
  const a = enSituation ? distanceLieux(l) : randomInt(3, 12);
  const b = egales ? a : a + pick([0.5, 1, 2, 3]);
  const [dE, dF] = Math.random() < 0.5 ? [a, b] : [b, a];
  const oui = `oui : ${K}${E} = ${K}${F}`;
  const non = `non : ${K}${E} et ${K}${F} sont différentes`;
  return {
    text: `${enSituation ? `${cap(l.entre)} sont aux points ${E} et ${F}. ${P.nom} a placé ${l.quoi} au point ${K}.` : `${P.nom} a placé un point ${K}.`} On mesure ${K}${E} = ${fr(dE)} ${u} et ${K}${F} = ${fr(dF)} ${u}. ${pick([`Le point ${K} est-il sur la médiatrice de ${s} ?`, `${K} appartient-il à la médiatrice de ${s} ?`])}`,
    format: "qcm",
    choices: shuffle([oui, non, `oui : ${K} est le milieu de ${s}`, "on ne peut pas savoir sans figure"]),
    expected: [egales ? oui : non],
    comparator: "mcq_exact",
    explanation: expl(
      egales
        ? `${K}${E} = ${K}${F} : ${K} est à égale distance de ${E} et de ${F}, donc il est sur la médiatrice de ${s}. Il n’est pas forcément le milieu : il peut être n’importe où sur cette droite.`
        : `${K}${E} et ${K}${F} sont différentes : ${K} n’est pas à égale distance de ${E} et de ${F}, il n’est donc pas sur la médiatrice.`,
    ),
  };
}
function genMedSens(): Q {
  const [E, F, M] = lettres(3);
  const P = prenom();
  const s = `[${E}${F}]`;
  const cas = pick([
    {
      q: `${P.nom} dit : « ${M}${E} = ${M}${F}, donc ${M} est le milieu de ${s}. » Où est l’erreur ?`,
      juste: `${M} est seulement sur la médiatrice de ${s}, pas forcément sur le segment`,
      faux: [`il n’y a pas d’erreur`, `il faudrait ${M}${E} + ${M}${F} = ${E}${F}`, `${M} n’est jamais sur la médiatrice`],
      r: `De ${M}${E} = ${M}${F}, on déduit que ${M} est sur la MÉDIATRICE de ${s}, une droite entière. Pour être le milieu, ${M} devrait aussi être sur le segment.`,
    },
    {
      q: `On sait que ${M}${E} = ${M}${F}. Que peut-on en déduire ?`,
      juste: `${M} est sur la médiatrice de ${s}`,
      faux: [`${M} est le milieu de ${s}`, `${M} est sur le segment ${s}`, "on ne peut rien en déduire"],
      r: `Tout point à égale distance de ${E} et de ${F} est sur la médiatrice de ${s}. C’est ce sens de la propriété qui sert à démontrer.`,
    },
    {
      q: `Le point ${M} est sur la médiatrice de ${s}. Que peut-on en déduire ?`,
      juste: `${M}${E} = ${M}${F}`,
      faux: [`${M} est le milieu de ${s}`, `${M}${E} + ${M}${F} = ${E}${F}`, `${M}${E} = ${E}${F}`],
      r: `Tout point de la médiatrice de ${s} est à égale distance de ${E} et de ${F} : ${M}${E} = ${M}${F}, où que soit ${M} sur cette droite.`,
    },
    {
      q: `Un point ${M} n’est PAS sur la médiatrice de ${s}. Que peut-on dire de ${M}${E} et ${M}${F} ?`,
      juste: `elles sont différentes`,
      faux: [`elles sont égales quand même`, `${M}${E} + ${M}${F} = ${E}${F}`, "on ne peut rien dire"],
      r: `La médiatrice contient TOUS les points à égale distance de ${E} et de ${F}, et eux seuls. Un point qui n’y est pas est plus près de l’un des deux.`,
    },
  ]);
  return {
    text: cas.q,
    format: "qcm",
    choices: shuffle([cas.juste, ...cas.faux]),
    expected: [cas.juste],
    comparator: "mcq_exact",
    explanation: expl(cas.r),
  };
}

// ----- MEDIATRICE_CONSTRUIRE
function genMedCompas(): Q {
  const [E, F] = lettres(2);
  const P = prenom();
  const s = `[${E}${F}]`;
  if (Math.random() < 0.35) {
    const juste = `la médiatrice de ${s}`;
    return {
      text: `${P.nom} plie sa feuille pour amener le point ${E} exactement sur le point ${F}. ${pick(["Que représente le pli ?", "Quelle droite le pli dessine-t-il ?"])}`,
      format: "qcm",
      choices: shuffle([juste, `le segment ${s}`, `la perpendiculaire à ${s} passant par ${E}`, `une parallèle à ${s}`]),
      expected: [juste],
      comparator: "mcq_exact",
      explanation: expl(`Le pli amène ${E} sur ${F} : chacun de ses points est à égale distance de ${E} et de ${F}. C’est la médiatrice de ${s}.`),
    };
  }
  const L = randomInt(4, 14);
  const demi = L / 2;
  const juste = Math.min(L, Math.floor(demi) + randomInt(1, 3));
  const fausses = [...new Set([demi, Math.max(1, Math.floor(demi) - 1), Math.max(1, Math.floor(demi / 2))])].filter((x) => x <= demi && x !== juste);
  return {
    text: `${introSegment(E, F, P)} Il mesure ${fr(L)} cm. ${P.nom} veut tracer sa médiatrice au compas. ${pick(["Quel écartement de compas convient ?", `Quel écartement peut-${il(P)} prendre ?`])}`,
    format: "qcm",
    choices: shuffle([`${fr(juste)} cm`, ...fausses.slice(0, 3).map((x) => `${fr(x)} cm`)]),
    expected: [`${fr(juste)} cm`],
    comparator: "mcq_exact",
    explanation: expl(
      `Les arcs tracés depuis ${E} et depuis ${F} doivent se couper en deux points. Il faut donc un écartement PLUS GRAND que la moitié de ${E}${F}, soit plus de ${fr(L)} ÷ 2 = ${fr(demi)} cm. Seul ${fr(juste)} cm convient.`,
    ),
  };
}
type Support = { phrase: string; u: "cm" | "m"; min: number; max: number };
const SUPPORTS: Support[] = [
  { phrase: "sur son cahier", u: "cm", min: 4, max: 18 },
  { phrase: "sur une planche", u: "cm", min: 30, max: 120 },
  { phrase: "sur une affiche", u: "cm", min: 20, max: 80 },
  { phrase: "sur le sol de la cour, à la craie", u: "m", min: 2, max: 12 },
  { phrase: "sur une bande de papier", u: "cm", min: 10, max: 40 },
  { phrase: "sur le tableau", u: "cm", min: 40, max: 150 },
];
function genMedMilieu(): Q {
  const [E, F] = lettres(2);
  const P = prenom();
  const sp = pick(SUPPORTS);
  const L = randomInt(sp.min, sp.max) + (sp.u === "m" && Math.random() < 0.4 ? 0.5 : 0);
  const demi = L / 2;
  return {
    text: `${P.nom} trace un segment [${E}${F}] de ${fr(L)} ${sp.u} ${sp.phrase}. ${cap(il(P))} veut tracer sa médiatrice à la règle graduée et à l’équerre. ${pick([`À quelle distance de ${E} doit-${il(P)} poser l’équerre ?`, `À combien de ${E} se trouve le point où poser l’équerre ?`])}`,
    format: "short",
    expected: [`${fr(demi)} ${sp.u}`],
    comparator: "number_equal",
    explanation: expl(`L’équerre se pose au MILIEU de [${E}${F}], donc à ${fr(L)} ÷ 2 = ${fr(demi)} ${sp.u} de ${E}. On y trace ensuite la perpendiculaire au segment.`),
  };
}
function genMedArcs(): Q {
  const [E, F] = lettres(2);
  const P = prenom();
  const s = `[${E}${F}]`;
  const mode = pick(["arcs", "arcs", "deuxPoints", "memeEcartement"] as const);
  if (mode === "arcs") {
    const L = randomInt(4, 14);
    const demi = L / 2;
    const cas = pick(["coupe", "touche", "rate"] as const);
    const x = cas === "coupe" ? Math.floor(demi) + randomInt(1, 3) : cas === "touche" ? demi : Math.max(1, Math.ceil(demi) - randomInt(1, 2));
    const r = {
      coupe: "les arcs se coupent en deux points de la médiatrice",
      touche: `les arcs se touchent en un seul point : le milieu de ${s}`,
      rate: "les arcs ne se coupent pas : l’écartement est trop petit",
    };
    return {
      text: `${introSegment(E, F, P)} Il mesure ${fr(L)} cm. ${P.nom} ouvre son compas de ${fr(x)} cm et trace un arc depuis ${E}, puis un arc depuis ${F}. Que se passe-t-il ?`,
      format: "qcm",
      choices: shuffle([...Object.values(r), `les arcs se coupent en ${E} et en ${F}`]),
      expected: [r[cas]],
      comparator: "mcq_exact",
      explanation: expl(
        `La moitié de ${E}${F} vaut ${fr(L)} ÷ 2 = ${fr(demi)} cm. ${
          cas === "coupe"
            ? `${fr(x)} cm, c’est plus : les arcs se coupent en deux points, tous deux sur la médiatrice.`
            : cas === "touche"
              ? `${fr(x)} cm, c’est exactement la moitié : les arcs se touchent au milieu seulement. Un seul point ne suffit pas pour tracer la droite.`
              : `${fr(x)} cm, c’est moins : les arcs ne se rejoignent pas.`
        }`,
      ),
    };
  }
  if (mode === "deuxPoints") {
    const juste = "par deux points, il ne passe qu’une seule droite";
    return {
      text: `${P.nom} a trouvé deux points à égale distance de ${E} et de ${F}. Pourquoi cela suffit-il pour tracer la médiatrice de ${s} ?`,
      format: "qcm",
      choices: shuffle([juste, "deux points sont toujours alignés avec le milieu", `il faut en fait trois points`, "parce que le compas est précis"]),
      expected: [juste],
      comparator: "mcq_exact",
      explanation: expl(`Les deux points sont sur la médiatrice (égale distance de ${E} et de ${F}). Par deux points il ne passe qu’une droite : c’est forcément la médiatrice.`),
    };
  }
  const juste = `pour que les points obtenus soient à égale distance de ${E} et de ${F}`;
  return {
    text: `Pour tracer la médiatrice de ${s} au compas, ${P.nom} garde le MÊME écartement depuis ${E} et depuis ${F}. Pourquoi ?`,
    format: "qcm",
    choices: shuffle([juste, "pour que le dessin soit plus joli", "pour que la droite soit horizontale", "pour gagner du temps"]),
    expected: [juste],
    comparator: "mcq_exact",
    explanation: expl(`Aux points où les arcs se coupent, la distance à ${E} et la distance à ${F} valent toutes les deux l’écartement : ces points sont sur la médiatrice.`),
  };
}

// ----- MEDIATRICE_PROBLEME
type Rond = { nom: string; u: "cm" | "m"; min: number; max: number };
const RONDS: Rond[] = [
  { nom: "une table ronde", u: "cm", min: 40, max: 80 },
  { nom: "un rond-point", u: "m", min: 8, max: 30 },
  { nom: "un bassin circulaire", u: "m", min: 2, max: 10 },
  { nom: "une piste de cirque", u: "m", min: 6, max: 13 },
  { nom: "une pizza", u: "cm", min: 12, max: 22 },
  { nom: "une horloge", u: "cm", min: 10, max: 30 },
  { nom: "un trampoline", u: "m", min: 1, max: 3 },
  { nom: "une roue de vélo", u: "cm", min: 25, max: 35 },
  { nom: "un manège", u: "m", min: 4, max: 9 },
  { nom: "une assiette", u: "cm", min: 10, max: 14 },
];
function genMedCercle(): Q {
  const ro = pick(RONDS);
  const P = prenom();
  const O = pick(["O", "C", "I", "K"]);
  const [Pp, Qq] = shuffle(LETTRES.filter((x) => x !== O)).slice(0, 2).sort();
  const r = ro.u === "m" && ro.max <= 10 && Math.random() < 0.4 ? randomInt(ro.min * 2, ro.max * 2) / 2 : randomInt(ro.min, ro.max);
  const intro = `${cap(ro.nom)} a la forme d’un cercle de centre ${O}. ${P.nom} relie deux points ${Pp} et ${Qq} du bord : [${Pp}${Qq}] est une corde.`;
  const canvas = cercleAvecCorde({ centreVisible: true, noms: { o: O, p: Pp, q: Qq } });
  const mode = pick(["rayon", "diametre", "isocele", "surMed"] as const);
  if (mode === "rayon" || mode === "diametre") {
    const X = pick([Pp, Qq]);
    return {
      text: `${intro} ${mode === "rayon" ? `Le rayon mesure ${fr(r)} ${ro.u}.` : `Le diamètre mesure ${fr(2 * r)} ${ro.u}.`} ${pick([`Quelle est la distance ${O}${X} ?`, `Combien mesure ${O}${X} ?`])}`,
      format: "short",
      expected: [`${fr(r)} ${ro.u}`],
      comparator: "number_equal",
      explanation: expl(
        `${X} est sur le cercle, donc [${O}${X}] est un rayon${mode === "diametre" ? ` : ${fr(2 * r)} ÷ 2 = ${fr(r)} ${ro.u}` : ""}. Ainsi ${O}${Pp} = ${O}${Qq} = ${fr(r)} ${ro.u}, et ${O} est sur la médiatrice de [${Pp}${Qq}].`,
      ),
      canvas,
    };
  }
  if (mode === "isocele") {
    return {
      text: `${intro} Le triangle ${O}${Pp}${Qq} est isocèle. En quel sommet ?`,
      format: "qcm",
      choices: shuffle([O, Pp, Qq]),
      expected: [O],
      comparator: "mcq_exact",
      explanation: expl(`${O}${Pp} et ${O}${Qq} sont deux rayons : ils sont égaux. Le triangle est isocèle en ${O}, et ${O} est sur la médiatrice de [${Pp}${Qq}].`),
      canvas,
    };
  }
  const juste = `oui : ${O}${Pp} = ${O}${Qq}, ce sont deux rayons`;
  return {
    text: `${intro} Le centre ${O} est-il sur la médiatrice de [${Pp}${Qq}] ?`,
    format: "qcm",
    choices: shuffle([juste, `non : ${O} n’est pas sur la corde`, `oui : ${O} est le milieu de [${Pp}${Qq}]`, "on ne peut pas savoir"]),
    expected: [juste],
    comparator: "mcq_exact",
    explanation: expl(`${O}${Pp} et ${O}${Qq} sont deux rayons, donc ${O}${Pp} = ${O}${Qq} : ${O} est à égale distance de ${Pp} et de ${Qq}, il est sur la médiatrice de [${Pp}${Qq}].`),
    canvas,
  };
}
function genMedProbleme(): Q {
  const P = prenom();
  const cas = pick(["deuxLieux", "deuxLieux", "centre", "troisLieux"] as const);
  if (cas === "deuxLieux") {
    const l = pick(LIEUX);
    const juste = "n’importe où sur la médiatrice du segment qui les joint";
    return {
      text: `${P.nom} veut placer ${l.quoi} exactement à la même distance de ${l.entre}. ${pick(["Où peut-on la placer ?", "Quels emplacements conviennent ?"]).replace("la placer", l.quoi.startsWith("une") ? "la placer" : "le placer")}`,
      format: "qcm",
      choices: shuffle([juste, "seulement au milieu du segment qui les joint", "sur la droite qui les joint", "aucun emplacement ne convient"]),
      expected: [juste],
      comparator: "mcq_exact",
      explanation: expl("Les points à égale distance de deux lieux forment la médiatrice du segment qui les joint : il y en a une infinité. Le milieu en fait partie, mais ce n’est qu’un point parmi d’autres."),
    };
  }
  if (cas === "centre") {
    const ro = pick(RONDS);
    const juste = "tracer deux cordes et leurs médiatrices : le centre est à leur croisement";
    return {
      text: `${P.nom} a dessiné le contour d’${ro.nom.replace(/^une? /, (m) => (m === "une " ? "une " : "un "))} mais a perdu son centre. ${pick(["Comment le retrouver ?", "Quelle méthode permet de le retrouver ?"])}`,
      format: "qcm",
      choices: shuffle([juste, "tracer une seule corde et prendre son milieu", "plier la feuille une seule fois au hasard", "mesurer un rayon au hasard"]),
      expected: [juste],
      comparator: "mcq_exact",
      explanation: expl("Le centre est à égale distance des deux bouts de n’importe quelle corde : il est sur la médiatrice de chaque corde. Une médiatrice donne une droite de candidats ; avec deux cordes, leurs médiatrices se croisent en un seul point, le centre."),
    };
  }
  const l = pick(LIEUX.filter((x) => x.entre.startsWith("deux")));
  const trois = l.entre.replace(/^deux /, "trois ");
  const juste = "au croisement de deux médiatrices";
  return {
    text: `${P.nom} veut placer ${l.quoi} à égale distance de ${trois}, qui ne sont pas sur une même ligne. ${pick(["Où faut-il la placer ?", "Comment trouver l’emplacement ?"]).replace("la placer", l.quoi.startsWith("une") ? "la placer" : "le placer")}`,
    format: "qcm",
    choices: shuffle([juste, "au milieu du segment qui joint deux de ces lieux", "sur une seule médiatrice, n’importe où", "c’est impossible"]),
    expected: [juste],
    comparator: "mcq_exact",
    explanation: expl("La médiatrice des deux premiers donne les points à égale distance de ces deux-là ; celle d’une autre paire, à égale distance d’une autre paire. Leur croisement est à égale distance des trois."),
  };
}

// ----- MEDIATRICE_DEFI
function genMedDefiDistances(): Q {
  const [E, F, S, T, M] = lettres(5);
  const P = prenom();
  const s = `[${E}${F}]`;
  const d = randomInt(4, 12);
  const mode = pick(["SM", "nonEgal", "deuxPoints"] as const);
  if (mode === "SM") {
    const juste = `oui : ${S} et ${M} sont tous les deux sur la médiatrice`;
    return {
      text: `${P.nom} place un point ${S} tel que ${S}${E} = ${S}${F} = ${d} cm. ${M} est le milieu de ${s}. La droite (${S}${M}) est-elle la médiatrice de ${s} ?`,
      format: "qcm",
      choices: shuffle([juste, `non : il faudrait mesurer un angle`, `non : ${S} n’est pas sur ${s}`, `oui : toute droite qui passe par ${M} convient`]),
      expected: [juste],
      comparator: "mcq_exact",
      explanation: expl(`${S}${E} = ${S}${F} place ${S} sur la médiatrice de ${s}, et le milieu ${M} y est aussi. Deux points définissent une seule droite : (${S}${M}) est la médiatrice.`),
    };
  }
  if (mode === "nonEgal") {
    const autre = d + pick([1, 2, 3]);
    const juste = `non : ${S}${E} et ${S}${F} sont différentes`;
    return {
      text: `${P.nom} place un point ${S} tel que ${S}${E} = ${d} cm et ${S}${F} = ${autre} cm. Le point ${S} est-il sur la médiatrice de ${s} ?`,
      format: "qcm",
      choices: shuffle([juste, `oui : ${S}${E} = ${S}${F}`, `oui : ${S} est près de ${s}`, "on ne peut pas savoir"]),
      expected: [juste],
      comparator: "mcq_exact",
      explanation: expl(`${d} cm et ${autre} cm : ${S} n’est pas à égale distance de ${E} et de ${F}. Il n’est pas sur la médiatrice, il est plus près de ${E}.`),
    };
  }
  const d2 = d + pick([2, 3, 4]);
  const juste = `la médiatrice de ${s}`;
  return {
    text: `On sait que ${S}${E} = ${S}${F} = ${d} cm et que ${T}${E} = ${T}${F} = ${d2} cm. ${pick([`Que représente la droite (${S}${T}) ?`, `Quelle est la droite (${S}${T}) ?`])}`,
    format: "qcm",
    choices: shuffle([juste, `la perpendiculaire à ${s} passant par ${E}`, `une parallèle à ${s}`, "une droite quelconque"]),
    expected: [juste],
    comparator: "mcq_exact",
    explanation: expl(`${S} et ${T} sont chacun à égale distance de ${E} et de ${F} : ils sont tous les deux sur la médiatrice de ${s}. Par deux points il ne passe qu’une droite : (${S}${T}) est cette médiatrice.`),
  };
}
function genMedDefiRaisons(): Q {
  const [E, F, G] = lettres(3);
  const P = prenom();
  const cas = pick(["isocele", "symetrie", "trois"] as const);
  if (cas === "isocele") {
    const a = randomInt(4, 12);
    const [S, U, V] = shuffle([E, F, G]);
    const s = `[${[U, V].sort().join("")}]`;
    const juste = `oui : ${S}${U} = ${S}${V}, donc ${S} est à égale distance de ${U} et de ${V}`;
    return {
      text: `Le triangle ${E}${F}${G} est isocèle en ${S}, avec ${S}${U} = ${S}${V} = ${a} cm. ${P.nom} se demande si ${S} est sur la médiatrice de ${s}. Est-ce le cas ?`,
      format: "qcm",
      choices: shuffle([juste, `non : ${S} n’est pas sur le segment ${s}`, `oui : ${S} est le milieu de ${s}`, `cela dépend de la longueur de ${s}`]),
      expected: [juste],
      comparator: "mcq_exact",
      explanation: expl(`Isocèle en ${S} veut dire ${S}${U} = ${S}${V} : ${S} est à égale distance de ${U} et de ${V}, donc sur la médiatrice de ${s}.`),
    };
  }
  if (cas === "symetrie") {
    const s = `[${E}${F}]`;
    const juste = `${E} vient se poser exactement sur ${F}`;
    return {
      text: `${P.nom} plie sa feuille le long de la médiatrice de ${s}. Que devient le point ${E} ?`,
      format: "qcm",
      choices: shuffle([juste, `${E} reste à sa place`, `${E} vient sur le milieu de ${s}`, `${E} disparaît du pli`]),
      expected: [juste],
      comparator: "mcq_exact",
      explanation: expl(`La médiatrice est l’axe de symétrie du segment : en pliant le long d’elle, ${E} vient sur ${F}.`),
    };
  }
  const l = pick(LIEUX.filter((x) => x.entre.startsWith("deux")));
  const trois = l.entre.replace(/^deux /, "trois ");
  const juste = "deux médiatrices suffisent : leur croisement convient";
  return {
    text: `${P.nom} veut placer ${l.quoi} à égale distance de ${trois}, notés ${E}, ${F} et ${G}, qui ne sont pas sur une même ligne. Combien de médiatrices doit-${il(P)} tracer au minimum ?`,
    format: "qcm",
    choices: shuffle([juste, "une seule médiatrice suffit", "il faut tracer trois médiatrices", "aucune : on prend le milieu de [" + E + F + "]"]),
    expected: [juste],
    comparator: "mcq_exact",
    explanation: expl(`La médiatrice de [${E}${F}] donne les points à égale distance de ${E} et de ${F} ; celle de [${F}${G}], à égale distance de ${F} et de ${G}. Leur croisement est à égale distance des trois (la troisième y passe aussi).`),
  };
}

export const mediatriceBank: TutorBankItemV4[] = [
  // =========================
  // MEDIATRICE_DEFINITION — les DEUX conditions
  // =========================
  {
    kind: "fixed",
    id: "mediatrice_definition_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "mediatrice_segment",
    microId: "mediatrice_definition",
    difficulty: 1,
    theme: "neutral",
    text: "Qu'est-ce que la médiatrice d'un segment [AB] ?",
    format: "qcm",
    choices: [
      "la droite perpendiculaire à [AB] qui passe par son milieu",
      "la droite qui passe par le milieu de [AB]",
      "la droite perpendiculaire à [AB]",
      "le segment qui joint le milieu de [AB] à un autre point",
    ],
    expected: ["la droite perpendiculaire à [AB] qui passe par son milieu"],
    comparator: "mcq_exact",
    hint: "Il faut DEUX conditions, pas une.",
    explanation: expl(
      "La médiatrice de [AB] est la droite qui remplit deux conditions à la fois : elle est perpendiculaire à [AB], ET elle passe par son milieu. Une seule des deux ne suffit pas."
    ),
    tags: ["mediatrice_segment", "definition", "canvas", "qcm"],
    canvas: segmentEtDroite({ perpendiculaire: true, parMilieu: true, labelDroite: "(d)", marquerMilieu: true }),
  },
  {
    kind: "fixed",
    id: "mediatrice_definition_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "mediatrice_segment",
    microId: "mediatrice_definition",
    difficulty: 2,
    theme: "neutral",
    text: "Observe la figure. La droite (d) est-elle la médiatrice de [AB] ?",
    format: "qcm",
    choices: [
      "non : elle est bien perpendiculaire à [AB], mais elle ne passe pas par son milieu",
      "oui : elle est perpendiculaire à [AB]",
      "non : elle passe par le milieu, mais elle n'est pas perpendiculaire",
      "oui : elle coupe le segment [AB]",
    ],
    expected: [
      "non : elle est bien perpendiculaire à [AB], mais elle ne passe pas par son milieu",
    ],
    comparator: "mcq_exact",
    hint: "Le petit carré rouge dit qu'elle est perpendiculaire. Et le milieu ?",
    explanation: expl(
      "La marque d'angle droit montre que (d) est perpendiculaire à [AB]. Mais elle coupe le segment à côté du milieu : la seconde condition n'est pas remplie, ce n'est donc pas la médiatrice."
    ),
    tags: ["mediatrice_segment", "definition", "canvas", "piege", "qcm"],
    canvas: segmentEtDroite({ perpendiculaire: true, parMilieu: false, labelDroite: "(d)", marquerMilieu: true }),
  },
  {
    kind: "fixed",
    id: "mediatrice_definition_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "mediatrice_segment",
    microId: "mediatrice_definition",
    difficulty: 2,
    theme: "neutral",
    text: "Observe la figure. La droite (d) est-elle la médiatrice de [AB] ?",
    format: "qcm",
    choices: [
      "non : elle passe bien par le milieu, mais elle n'est pas perpendiculaire",
      "oui : elle passe par le milieu de [AB]",
      "non : elle ne coupe pas le segment",
      "oui : elle est perpendiculaire à [AB]",
    ],
    expected: ["non : elle passe bien par le milieu, mais elle n'est pas perpendiculaire"],
    comparator: "mcq_exact",
    hint: "Aucune marque d'angle droit sur la figure.",
    explanation: expl(
      "La droite coupe [AB] en son milieu, mais elle est penchée : il n'y a pas d'angle droit. La première condition manque, ce n'est donc pas la médiatrice."
    ),
    tags: ["mediatrice_segment", "definition", "canvas", "piege", "qcm"],
    canvas: segmentEtDroite({ perpendiculaire: false, parMilieu: true, labelDroite: "(d)", marquerMilieu: true }),
  },
  {
    kind: "fixed",
    id: "mediatrice_definition_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "mediatrice_segment",
    microId: "mediatrice_definition",
    difficulty: 2,
    theme: "neutral",
    text: "Combien un segment a-t-il de médiatrices ?",
    format: "qcm",
    choices: ["une seule", "deux", "une infinité", "aucune, sauf s'il est horizontal"],
    expected: ["une seule"],
    comparator: "mcq_exact",
    hint: "Le milieu est unique, et la perpendiculaire en ce point aussi.",
    explanation: expl(
      "Un segment n'a qu'un seul milieu, et par un point donné il ne passe qu'une seule perpendiculaire à une droite donnée. La médiatrice est donc unique."
    ),
    tags: ["mediatrice_segment", "definition", "qcm"],
  },
  {
    kind: "fixed",
    id: "mediatrice_definition_fixed_5",
    niveau: "6e",
    matiere: "maths",
    notionId: "mediatrice_segment",
    microId: "mediatrice_definition",
    difficulty: 3,
    theme: "neutral",
    text: "La médiatrice d'un segment est-elle un segment, une demi-droite ou une droite ?",
    format: "qcm",
    choices: [
      "une droite : elle se prolonge des deux côtés, sans fin",
      "un segment, de même longueur que [AB]",
      "une demi-droite, d'origine le milieu de [AB]",
      "cela dépend de la longueur de [AB]",
    ],
    expected: ["une droite : elle se prolonge des deux côtés, sans fin"],
    comparator: "mcq_exact",
    hint: "Les points à égale distance de A et de B ne s'arrêtent nulle part.",
    explanation: expl(
      "C'est une DROITE. On la dessine souvent en trait court, faute de place, mais elle se prolonge indéfiniment des deux côtés : tous ses points, même très éloignés, restent à égale distance de A et de B."
    ),
    tags: ["mediatrice_segment", "definition", "qcm"],
  },
  {
    kind: "template",
    id: "mediatrice_definition_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "mediatrice_segment",
    microId: "mediatrice_definition",
    difficulty: 3,
    theme: "neutral",
    hint: "Vérifie les DEUX conditions, une par une.",
    tags: ["mediatrice_segment", "definition", "template"],
    generate: () => genMedMesures(),
  },
  {
    kind: "template",
    id: "mediatrice_definition_tpl_connaitre",
    niveau: "6e",
    matiere: "maths",
    notionId: "mediatrice_segment",
    microId: "mediatrice_definition",
    difficulty: 1,
    theme: "neutral",
    hint: "Deux conditions : perpendiculaire au segment, et passer par son milieu.",
    tags: ["mediatrice_segment", "definition", "template", "qcm"],
    generate: () => genMedDefinition(),
  },
  {
    kind: "template",
    id: "mediatrice_definition_tpl_figure",
    niveau: "6e",
    matiere: "maths",
    notionId: "mediatrice_segment",
    microId: "mediatrice_definition",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche la marque d’angle droit, puis regarde si la droite passe par le milieu.",
    tags: ["mediatrice_segment", "definition", "template", "canvas", "qcm"],
    generate: () => genMedFigure(),
  },
  {
    kind: "template",
    id: "mediatrice_definition_tpl_ouverte",
    niveau: "6e",
    matiere: "maths",
    notionId: "mediatrice_segment",
    microId: "mediatrice_definition",
    difficulty: 4,
    theme: "neutral",
    hint: "Nomme les deux conditions, et dis ce qui se passe si l'une manque.",
    tags: ["mediatrice_segment", "definition", "template", "qcm"],
    generate: () => genMedRaisons(),
  },

  // =========================
  // MEDIATRICE_PROPRIETE — la propriété caractéristique, DANS LES DEUX SENS
  // =========================
  {
    kind: "fixed",
    id: "mediatrice_propriete_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "mediatrice_segment",
    microId: "mediatrice_propriete",
    difficulty: 2,
    theme: "neutral",
    text: "Le point P est sur la médiatrice de [AB]. Que peut-on en déduire ?",
    format: "qcm",
    choices: [
      "PA = PB",
      "P est le milieu de [AB]",
      "PA + PB = AB",
      "P est à égale distance de A, de B et du milieu",
    ],
    expected: ["PA = PB"],
    comparator: "mcq_exact",
    hint: "La médiatrice est l'ensemble des points équidistants des extrémités.",
    explanation: expl(
      "La médiatrice de [AB] est l'ensemble des points situés à égale distance de A et de B. Si P y est, alors PA = PB — quelle que soit sa position sur la droite."
    ),
    tags: ["mediatrice_segment", "propriete", "canvas", "qcm"],
    canvas: segmentEtDroite({
      perpendiculaire: true,
      parMilieu: true,
      labelDroite: "(d)",
      pointSurDroite: { label: "P", hauteur: 70 },
    }),
  },
  {
    kind: "fixed",
    id: "mediatrice_propriete_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "mediatrice_segment",
    microId: "mediatrice_propriete",
    difficulty: 3,
    theme: "neutral",
    text: "On sait que MA = MB. Que peut-on en déduire sur le point M ?",
    format: "qcm",
    choices: [
      "M est sur la médiatrice de [AB]",
      "M est le milieu de [AB]",
      "M est sur le segment [AB]",
      "on ne peut rien en déduire",
    ],
    expected: ["M est sur la médiatrice de [AB]"],
    comparator: "mcq_exact",
    hint: "C'est le sens de la propriété qui sert à démontrer.",
    explanation: expl(
      "Tout point à égale distance de A et de B appartient à la médiatrice de [AB]. C'est ce sens-là de la propriété qui permet de DÉMONTRER qu'un point est sur la médiatrice — et c'est celui qu'on oublie. Attention : M n'est pas forcément le milieu, il ne l'est que s'il est aussi sur le segment."
    ),
    tags: ["mediatrice_segment", "propriete", "qcm"],
  },
  {
    kind: "fixed",
    id: "mediatrice_propriete_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "mediatrice_segment",
    microId: "mediatrice_propriete",
    difficulty: 2,
    theme: "neutral",
    text: "Le point P est sur la médiatrice de [AB] et PA = 7 cm. Combien mesure PB ?",
    format: "short",
    expected: ["7 cm"],
    comparator: "number_equal",
    hint: "Équidistant veut dire : les deux distances sont égales.",
    explanation: expl("P est sur la médiatrice, donc PA = PB. Comme PA = 7 cm, PB = 7 cm."),
    tags: ["mediatrice_segment", "propriete", "short"],
  },
  {
    kind: "fixed",
    id: "mediatrice_propriete_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "mediatrice_segment",
    microId: "mediatrice_propriete",
    difficulty: 3,
    theme: "neutral",
    text: "Un point N n'est PAS sur la médiatrice de [AB]. Que peut-on dire de NA et NB ?",
    format: "qcm",
    choices: [
      "elles sont différentes : N est plus proche de l'une des deux extrémités",
      "elles sont égales quand même",
      "NA + NB = AB",
      "on ne peut rien dire",
    ],
    expected: ["elles sont différentes : N est plus proche de l'une des deux extrémités"],
    comparator: "mcq_exact",
    hint: "La médiatrice contient TOUS les points équidistants, et eux seuls.",
    explanation: expl(
      "La médiatrice contient exactement les points à égale distance de A et de B. Un point qui n'y est pas ne peut donc pas être équidistant : il est forcément plus proche de A, ou plus proche de B."
    ),
    tags: ["mediatrice_segment", "propriete", "qcm"],
  },
  {
    kind: "template",
    id: "mediatrice_propriete_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "mediatrice_segment",
    microId: "mediatrice_propriete",
    difficulty: 3,
    theme: "neutral",
    hint: "Sur la médiatrice, les deux distances sont égales.",
    tags: ["mediatrice_segment", "propriete", "template"],
    generate: () => genMedTrajet(),
  },
  {
    kind: "template",
    id: "mediatrice_propriete_tpl_distance",
    niveau: "6e",
    matiere: "maths",
    notionId: "mediatrice_segment",
    microId: "mediatrice_propriete",
    difficulty: 2,
    theme: "neutral",
    hint: "Sur la médiatrice, on est à égale distance des deux extrémités.",
    tags: ["mediatrice_segment", "propriete", "template"],
    generate: () => genMedDistance(),
  },
  {
    kind: "template",
    id: "mediatrice_propriete_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "mediatrice_segment",
    microId: "mediatrice_propriete",
    difficulty: 4,
    theme: "neutral",
    hint: "Dans quel sens lit-on la propriété : pour déduire, ou pour démontrer ?",
    tags: ["mediatrice_segment", "propriete", "template"],
    generate: () => genMedReciproque(),
  },
  {
    kind: "template",
    id: "mediatrice_propriete_tpl_ouverte",
    niveau: "6e",
    matiere: "maths",
    notionId: "mediatrice_segment",
    microId: "mediatrice_propriete",
    difficulty: 5,
    theme: "neutral",
    hint: "Une propriété caractéristique se lit dans les deux sens : dis lesquels.",
    tags: ["mediatrice_segment", "propriete", "template", "qcm"],
    generate: () => genMedSens(),
  },

  // =========================
  // MEDIATRICE_CONSTRUIRE
  // =========================
  {
    kind: "fixed",
    id: "mediatrice_construire_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "mediatrice_segment",
    microId: "mediatrice_construire",
    difficulty: 2,
    theme: "neutral",
    text: "Comment construire la médiatrice de [AB] avec un compas et une règle non graduée ?",
    format: "qcm",
    choices: [
      "on trace deux arcs de même écartement depuis A puis depuis B, et on joint les deux points d'intersection",
      "on mesure [AB], on marque le milieu, puis on trace au jugé",
      "on trace le cercle de centre A passant par B",
      "on trace deux arcs d'écartements différents depuis A et depuis B",
    ],
    expected: [
      "on trace deux arcs de même écartement depuis A puis depuis B, et on joint les deux points d'intersection",
    ],
    comparator: "mcq_exact",
    hint: "Les points obtenus sont à égale distance de A et de B — par construction.",
    explanation: expl(
      "Avec le MÊME écartement, les arcs tracés depuis A et depuis B se coupent en deux points situés à égale distance de A et de B. D'après la propriété caractéristique, ces deux points sont sur la médiatrice : la droite qui les joint EST la médiatrice."
    ),
    tags: ["mediatrice_segment", "construire", "qcm"],
  },
  {
    kind: "fixed",
    id: "mediatrice_construire_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "mediatrice_segment",
    microId: "mediatrice_construire",
    difficulty: 3,
    theme: "neutral",
    text: "Pourquoi faut-il garder le MÊME écartement de compas depuis A et depuis B ?",
    format: "qcm",
    choices: [
      "pour que les points obtenus soient à égale distance de A et de B",
      "pour que le dessin soit plus joli",
      "pour que les arcs se coupent, quel que soit l'écartement",
      "pour que la droite obtenue soit horizontale",
    ],
    expected: ["pour que les points obtenus soient à égale distance de A et de B"],
    comparator: "mcq_exact",
    hint: "L'écartement du compas EST une distance.",
    explanation: expl(
      "Un point du premier arc est à une distance de A égale à l'écartement ; un point du second est à cette même distance de B. Aux intersections, les deux distances sont donc égales : ces points sont équidistants de A et de B, donc sur la médiatrice. Avec deux écartements différents, ce raisonnement tombe."
    ),
    tags: ["mediatrice_segment", "construire", "qcm"],
  },
  {
    kind: "fixed",
    id: "mediatrice_construire_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "mediatrice_segment",
    microId: "mediatrice_construire",
    difficulty: 2,
    theme: "neutral",
    text: "On plie une feuille de façon à amener le point A exactement sur le point B. Que représente le pli obtenu ?",
    format: "qcm",
    choices: [
      "la médiatrice de [AB]",
      "le segment [AB]",
      "la perpendiculaire à [AB] passant par A",
      "une droite parallèle à [AB]",
    ],
    expected: ["la médiatrice de [AB]"],
    comparator: "mcq_exact",
    hint: "Le pli est l'axe de symétrie qui échange A et B.",
    explanation: expl(
      "Le pli qui amène A sur B est l'axe de symétrie du segment : chacun de ses points est à égale distance de A et de B. C'est donc la médiatrice de [AB] — et c'est aussi pour cela que la symétrie axiale se définira, plus tard dans l'année, avec la médiatrice."
    ),
    tags: ["mediatrice_segment", "construire", "qcm"],
  },
  {
    kind: "fixed",
    id: "mediatrice_construire_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "mediatrice_segment",
    microId: "mediatrice_construire",
    difficulty: 3,
    theme: "neutral",
    text: "Avec une règle graduée et une équerre, comment tracer la médiatrice de [AB] ?",
    format: "qcm",
    choices: [
      "on mesure [AB], on marque le milieu, puis on trace la perpendiculaire en ce point avec l'équerre",
      "on trace la perpendiculaire à [AB] passant par A, puis on la décale",
      "on mesure [AB] et on trace une parallèle à mi-hauteur",
      "on place l'équerre au hasard : toute perpendiculaire convient",
    ],
    expected: [
      "on mesure [AB], on marque le milieu, puis on trace la perpendiculaire en ce point avec l'équerre",
    ],
    comparator: "mcq_exact",
    hint: "Les deux conditions se construisent l'une après l'autre.",
    explanation: expl(
      "On construit les deux conditions dans l'ordre : d'abord le milieu, à la règle graduée (AB ÷ 2) ; ensuite la perpendiculaire en ce point, à l'équerre. Les deux outils font chacun une moitié du travail."
    ),
    tags: ["mediatrice_segment", "construire", "qcm"],
  },
  {
    kind: "template",
    id: "mediatrice_construire_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "mediatrice_segment",
    microId: "mediatrice_construire",
    difficulty: 3,
    theme: "neutral",
    hint: "Le milieu se calcule, la perpendiculaire se trace.",
    tags: ["mediatrice_segment", "construire", "template"],
    generate: () => genMedMilieu(),
  },
  {
    kind: "template",
    id: "mediatrice_construire_tpl_compas",
    niveau: "6e",
    matiere: "maths",
    notionId: "mediatrice_segment",
    microId: "mediatrice_construire",
    difficulty: 2,
    theme: "neutral",
    hint: "L’écartement du compas doit dépasser la moitié du segment.",
    tags: ["mediatrice_segment", "construire", "template", "qcm"],
    generate: () => genMedCompas(),
  },
  {
    kind: "template",
    id: "mediatrice_construire_tpl_ouverte",
    niveau: "6e",
    matiere: "maths",
    notionId: "mediatrice_segment",
    microId: "mediatrice_construire",
    difficulty: 5,
    theme: "neutral",
    hint: "Justifie la construction par la propriété, pas par le dessin.",
    tags: ["mediatrice_segment", "construire", "template", "qcm"],
    generate: () => genMedArcs(),
  },

  // =========================
  // MEDIATRICE_PROBLEME — les deux problèmes du BO
  // =========================
  {
    kind: "fixed",
    id: "mediatrice_probleme_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "mediatrice_segment",
    microId: "mediatrice_probleme",
    difficulty: 4,
    theme: "neutral",
    text: "Un cercle de centre O est tracé, et [PQ] est une corde de ce cercle. Comment placer le milieu de [PQ] avec une équerre seulement ?",
    format: "qcm",
    choices: [
      "on trace la perpendiculaire à [PQ] passant par O : elle coupe la corde en son milieu",
      "on trace la perpendiculaire à [PQ] passant par P",
      "on joint O à P : le milieu est au croisement avec le cercle",
      "on ne peut pas le faire sans règle graduée",
    ],
    expected: [
      "on trace la perpendiculaire à [PQ] passant par O : elle coupe la corde en son milieu",
    ],
    comparator: "mcq_exact",
    hint: "O est à égale distance de P et de Q — ce sont deux rayons.",
    explanation: expl(
      "OP et OQ sont deux rayons du même cercle, donc OP = OQ : le centre O est à égale distance de P et de Q. D'après la propriété caractéristique, O appartient à la médiatrice de [PQ]. Cette médiatrice est perpendiculaire à [PQ] et passe par son milieu : la perpendiculaire à [PQ] menée depuis O coupe donc la corde exactement en son milieu."
    ),
    tags: ["mediatrice_segment", "probleme", "canvas", "qcm"],
    canvas: cercleAvecCorde({ centreVisible: true }),
  },
  {
    kind: "fixed",
    id: "mediatrice_probleme_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "mediatrice_segment",
    microId: "mediatrice_probleme",
    difficulty: 5,
    theme: "neutral",
    text: "On a tracé un cercle mais on a perdu son centre. Comment le retrouver ?",
    format: "qcm",
    choices: [
      "on trace deux cordes, puis leurs médiatrices : le centre est leur point d'intersection",
      "on trace une seule corde et on prend son milieu",
      "on plie la feuille en deux, une seule fois",
      "on mesure le diamètre au hasard et on divise par deux",
    ],
    expected: [
      "on trace deux cordes, puis leurs médiatrices : le centre est leur point d'intersection",
    ],
    comparator: "mcq_exact",
    hint: "Le centre est à égale distance de TOUS les points du cercle.",
    explanation: expl(
      "Le centre est à égale distance des deux extrémités de n'importe quelle corde (ce sont deux rayons) : il appartient donc à la médiatrice de chaque corde. Une médiatrice ne suffit pas — elle donne une droite entière de candidats. Avec DEUX cordes, on obtient deux médiatrices, et leur unique point d'intersection est le centre."
    ),
    tags: ["mediatrice_segment", "probleme", "canvas", "qcm"],
    canvas: cercleAvecCorde({ centreVisible: false }),
  },
  {
    kind: "fixed",
    id: "mediatrice_probleme_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "mediatrice_segment",
    microId: "mediatrice_probleme",
    difficulty: 4,
    theme: "neutral",
    text: "Deux villages, Saint-Leu et L'Étang-Salé, veulent une antenne située exactement à la même distance de chacun. Où peut-on la placer ?",
    format: "qcm",
    choices: [
      "n'importe où sur la médiatrice du segment qui joint les deux villages",
      "exactement au milieu du segment qui joint les deux villages, et nulle part ailleurs",
      "sur la droite qui joint les deux villages",
      "il n'existe aucun emplacement possible",
    ],
    expected: ["n'importe où sur la médiatrice du segment qui joint les deux villages"],
    comparator: "mcq_exact",
    hint: "Combien de points sont à égale distance de deux points donnés ?",
    explanation: expl(
      "Les emplacements à égale distance des deux villages sont exactement les points de la médiatrice du segment qui les joint : il y en a une infinité. Le milieu en fait partie, mais ce n'est qu'un point parmi tous les autres — ce qui laisse le choix du terrain."
    ),
    tags: ["mediatrice_segment", "probleme", "974", "qcm"],
  },
  {
    kind: "template",
    id: "mediatrice_probleme_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "mediatrice_segment",
    microId: "mediatrice_probleme",
    difficulty: 4,
    theme: "neutral",
    hint: "Deux rayons d'un même cercle ont la même longueur.",
    tags: ["mediatrice_segment", "probleme", "template"],
    generate: () => genMedCercle(),
  },
  {
    kind: "template",
    id: "mediatrice_probleme_tpl_ouverte",
    niveau: "6e",
    matiere: "maths",
    notionId: "mediatrice_segment",
    microId: "mediatrice_probleme",
    difficulty: 5,
    theme: "neutral",
    hint: "Justifie chaque étape par la propriété caractéristique.",
    tags: ["mediatrice_segment", "probleme", "template", "qcm"],
    generate: () => genMedProbleme(),
  },

  // =========================
  // MEDIATRICE_DEFI
  // =========================
  {
    kind: "fixed",
    id: "mediatrice_defi_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "mediatrice_segment",
    microId: "mediatrice_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Le triangle ABC est isocèle en A. Que représente la droite qui passe par A et par le milieu de [BC] ?",
    format: "qcm",
    choices: [
      "la médiatrice de [BC]",
      "la médiatrice de [AB]",
      "une droite quelconque",
      "la parallèle à [BC] passant par A",
    ],
    expected: ["la médiatrice de [BC]"],
    comparator: "mcq_exact",
    hint: "Isocèle en A signifie AB = AC.",
    explanation: expl(
      "Le triangle est isocèle en A, donc AB = AC : le point A est à égale distance de B et de C, il appartient donc à la médiatrice de [BC]. Le milieu de [BC] y appartient aussi, par définition. La droite qui joint ces deux points est donc la médiatrice de [BC]."
    ),
    tags: ["mediatrice_segment", "defi", "qcm"],
  },
  {
    kind: "fixed",
    id: "mediatrice_defi_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "mediatrice_segment",
    microId: "mediatrice_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Peut-on trouver un point à égale distance de A et de B qui soit AUSSI à égale distance de B et de C, si A, B et C ne sont pas alignés ?",
    format: "qcm",
    choices: [
      "oui : c'est le point où les médiatrices de [AB] et de [BC] se coupent",
      "non : c'est impossible",
      "oui, mais seulement si le triangle est équilatéral",
      "oui : c'est le milieu de [AC]",
    ],
    expected: ["oui : c'est le point où les médiatrices de [AB] et de [BC] se coupent"],
    comparator: "mcq_exact",
    hint: "Chaque condition décrit une médiatrice.",
    explanation: expl(
      "« À égale distance de A et de B » décrit la médiatrice de [AB] ; « à égale distance de B et de C » décrit celle de [BC]. Le point cherché est sur les deux à la fois, donc à leur intersection. Ce point sera aussi à égale distance de A et de C — c'est le centre du cercle circonscrit au triangle."
    ),
    tags: ["mediatrice_segment", "defi", "qcm"],
  },
  {
    kind: "template",
    id: "mediatrice_defi_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "mediatrice_segment",
    microId: "mediatrice_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Écris ce que chaque égalité de longueurs t'apprend.",
    tags: ["mediatrice_segment", "defi", "template"],
    generate: () => genMedDefiDistances(),
  },
  {
    kind: "template",
    id: "mediatrice_defi_tpl_ouverte",
    niveau: "6e",
    matiere: "maths",
    notionId: "mediatrice_segment",
    microId: "mediatrice_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Traduis chaque condition en « médiatrice de … ».",
    tags: ["mediatrice_segment", "defi", "template", "qcm"],
    generate: () => genMedDefiRaisons(),
  },
];
