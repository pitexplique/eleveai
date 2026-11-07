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
  // ⭐ 07/11/2026 : le nom de la droite s'écrit au milieu de from-to. Pris en bas du
  // cadre, il ne recouvre plus la marque d'angle droit ni le point du haut ; la droite,
  // prolongée jusqu'aux bords par le canvas, reste la même.
  const haut = opts.perpendiculaire
    ? { x: xCoupe, y: 215 }
    : { x: xCoupe + pente * (215 - A.y), y: 215 };
  const bas = opts.perpendiculaire
    ? { x: xCoupe, y: 295 }
    : { x: xCoupe + pente * (295 - A.y), y: 295 };

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
  { quoi: "un plot", entre: "les deux buts", u: "m", min: 20, max: 60 },
  { quoi: "une bouée", entre: "deux plongeoirs", u: "m", min: 8, max: 25 },
  { quoi: "une ruche", entre: "deux pommiers", u: "m", min: 5, max: 30 },
  { quoi: "une antenne", entre: "deux villages", u: "km", min: 2, max: 12 },
  { quoi: "un abri", entre: "deux arrêts de bus", u: "m", min: 50, max: 300 },
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

/* ⛔⛔ 03/11/2026 — D'ABORD DES QUESTIONS SIMPLES (Frédéric) : « le contexte est
   réservé aux étoiles ★3 et plus ». À ★1-★2 : ni prénom, ni métier, ni situation
   de la vie ; la figure reste, la phrase va droit au but. */
// Et COURTE (REGLES-6E.md) : ★1 en 12 mots au plus, ★2 en 15, ponctuation comprise.
function introSimple(E: string, F: string) {
  return pick([`Voici le segment [${E}${F}].`, `Observe le segment [${E}${F}].`, ``]);
}
const motsM = (t: string) => t.trim().split(/\s+/).length;
/** Une intro et une question qui tiennent ensemble dans `max` mots (sinon la plus courte, sans intro). */
function courtM(intros: string[], questions: string[], max: number) {
  const paires = intros.flatMap((i) => questions.map((q) => (i ? `${i} ${q}` : q))).filter((t) => motsM(t) <= max);
  return paires.length ? pick(paires) : [...questions].sort((x, y) => motsM(x) - motsM(y))[0];
}
// ⭐ 07/11/2026 : compte comme la mesure (« = », « : », « ? » ne sont pas des mots).
const motsV = (t: string) => t.trim().split(/\s+/).filter((x) => /[\p{L}\d]/u.test(x)).length;
/** Une phrase prise parmi celles qui tiennent en `max` mots. */
function tient(phrases: string[], max: number) {
  const ok = phrases.filter((t) => motsV(t) <= max);
  return ok.length ? pick(ok) : [...phrases].sort((x, y) => motsV(x) - motsV(y))[0];
}
const croise = (a: string[], b: string[]) => a.flatMap((x) => b.map((y) => `${x} ${y}`));

// ----- MEDIATRICE_DEFINITION
function genMedDefinition(): Q {
  const [E, F] = lettres(2);
  const s = `[${E}${F}]`;
  const mode = pick(["definition", "conditions", "unique"] as const);
  if (mode === "definition") {
    const juste = `la droite perpendiculaire à ${s} qui passe par son milieu`;
    return {
      text: courtM([introSimple(E, F)], [`Qu’est-ce que la médiatrice de ${s} ?`, `Quelle droite est la médiatrice de ${s} ?`, `Choisis la définition de la médiatrice de ${s}.`], 12),
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
      text: courtM([introSimple(E, F)], [`Que sait-on de la médiatrice de ${s} ?`, `Comment la médiatrice de ${s} coupe-t-elle ${s} ?`, `Où la médiatrice coupe-t-elle ${s} ?`], 12),
      format: "qcm",
      choices: shuffle([juste, `elle coupe ${s} en ${E}, à angle droit`, `elle coupe ${s} en son milieu, en biais`, `elle ne coupe pas ${s}`]),
      expected: [juste],
      comparator: "mcq_exact",
      explanation: expl(`La médiatrice de ${s} passe par son milieu ET lui est perpendiculaire : elle le coupe en son milieu, à angle droit.`),
    };
  }
  const juste = "une seule";
  return {
    text: courtM([introSimple(E, F)], [`Combien de médiatrices le segment ${s} a-t-il ?`, `Combien de médiatrices peut-on tracer pour ${s} ?`, `Combien ${s} a-t-il de médiatrices ?`], 12),
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
  const s = `[${E}${F}]`;
  const perpendiculaire = Math.random() < 0.6;
  const parMilieu = Math.random() < 0.6;
  const c = choixMediatrice(s);
  const rep = perpendiculaire && parMilieu ? c.oui : perpendiculaire ? c.pasMilieu : parMilieu ? c.pasPerp : c.aucune;
  return {
    text: courtM([`Observe la figure.`, `Regarde la figure.`, `${M} est le milieu de ${s}.`, `Sur la figure, ${M} est le milieu de ${s}.`, ``], [`La droite (d) est-elle la médiatrice de ${s} ?`, `(d) est-elle la médiatrice de ${s} ?`, `Peut-on dire que (d) est la médiatrice de ${s} ?`, `Cette droite (d) convient-elle comme médiatrice de ${s} ?`], 15),
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
  const L = randomInt(4, 16);
  const milieu = L / 2;
  const parMilieu = Math.random() < 0.55;
  const x = parMilieu ? milieu : pick([milieu - 1, milieu + 1, milieu - 0.5, milieu + 1.5]);
  const perp = Math.random() < 0.55;
  const angle = perp ? 90 : pick([60, 70, 75, 80, 85, 100, 110]);
  const c = choixMediatrice(s);
  const rep = perp && parMilieu ? c.oui : perp ? c.pasMilieu : parMilieu ? c.pasPerp : c.aucune;
  return {
    // 07/11/2026 : 34 mots ramenés à 25 au plus (★3).
    text: `${pick([`${P.nom} trace un segment ${s} de ${fr(L)} cm.`, `Le segment ${s} mesure ${fr(L)} cm.`, `Sur une feuille, ${P.nom} mesure ${E}${F} = ${fr(L)} cm.`, `${P.nom} dessine ${s}, long de ${fr(L)} cm.`])} ${pick([`(d) coupe ${s} en ${K}, à ${angle}°, avec ${E}${K} = ${fr(x)} cm.`, `À ${angle}°, (d) coupe ${s} en ${K}, avec ${E}${K} = ${fr(x)} cm.`])} ${pick([`(d) est-elle sa médiatrice ?`, `Est-ce la médiatrice de ${s} ?`, `Est-ce sa médiatrice ?`])}`,
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
/** Qui place l'objet : un prénom ou un métier (vocations), ★3 seulement. */
const QUI_PLACE: ((P: Prenom) => string)[] = [
  (P) => P.nom,
  (P) => P.nom,
  () => "une urbaniste",
  () => "un paysagiste",
  () => "une ingénieure",
  () => "un jardinier",
  () => "une architecte",
  () => "un géomètre",
];
function genMedDistance(situation = false): Q {
  const { E, F, K, l, P, s } = situationLieux();
  // 03/11/2026 : ★2 sans situation ; la situation (lieux, métiers) monte à ★3.
  const enSituation = situation;
  const d = enSituation ? distanceLieux(l) : randomInt(3, 14) + (Math.random() < 0.3 ? 0.5 : 0);
  const u = enSituation ? l.u : "cm";
  const [X, Y] = Math.random() < 0.5 ? [E, F] : [F, E];
  // 07/11/2026 : ★3 ramené à 25 mots au plus ; ★2 à plusieurs tournures.
  const qui = cap(pick(QUI_PLACE)(P));
  const text = enSituation
    ? tient(
        croise(
          croise([`${cap(l.entre)} sont en ${E} et ${F}.`], [`${cap(l.quoi)} est en ${K}, sur la médiatrice de ${s}.`, `${qui} place ${l.quoi} en ${K}, sur la médiatrice de ${s}.`]),
          [`${K}${X} = ${fr(d)} ${u}. Combien mesure ${K}${Y} ?`, `${K}${X} = ${fr(d)} ${u}. À quelle distance de ${Y} est ${K} ?`, `${K}${X} = ${fr(d)} ${u}. Quelle est la distance ${K}${Y} ?`],
        ),
        25,
      )
    : courtM([`${K} est sur la médiatrice de ${s}. ${K}${X} = ${fr(d)} ${u}.`, `Le point ${K} est sur la médiatrice de ${s}. ${K}${X} = ${fr(d)} ${u}.`, `${K} appartient à la médiatrice de ${s}. ${K}${X} = ${fr(d)} ${u}.`, `${K}${X} = ${fr(d)} ${u}, et ${K} est sur la médiatrice de ${s}.`], [`Combien mesure ${K}${Y} ?`, `Que vaut ${K}${Y} ?`, `Trouve ${K}${Y}.`, `Calcule ${K}${Y}.`, `Donne la longueur ${K}${Y}.`], 16);
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
    // 07/11/2026 : 46 mots ramenés à 25 au plus (★3) ; [EF] n'y est plus mesuré, on n'en a pas besoin.
    const objet = pick(LIEUX.filter((x) => x.u === u && motsV(x.quoi) <= 2));
    return {
      text: tient(
        croise(
          [`${cap(objet.quoi)} est en ${K}, sur la médiatrice de ${s}. ${K}${E} = ${fr(a)} ${u}.`, `${K}${E} = ${fr(a)} ${u}. ${cap(objet.quoi)} est en ${K}, sur la médiatrice de ${s}.`],
          [`${P.nom} va de ${E} à ${K}, puis à ${F}. Quelle distance parcourt-${il(P)} ?`, `${P.nom} va de ${E} à ${K}, puis à ${F}. Combien de chemin fait-${il(P)} ?`, `${P.nom} va de ${E} à ${K}, puis à ${F}. Calcule son trajet.`],
        ),
        25,
      ),
      format: "short",
      expected: [`${fr(2 * a)} ${u}`],
      comparator: "number_equal",
      explanation: expl(`${K} est sur la médiatrice de ${s}, donc ${K}${F} = ${K}${E} = ${fr(a)} ${u}. Le trajet mesure ${fr(a)} + ${fr(a)} = ${fr(2 * a)} ${u}.`),
    };
  }
  return {
    text: `${pick([`Le point ${K} est`, `${K} est`])} sur la médiatrice de ${s}. ${K}${E} = ${fr(a)} cm et ${E}${F} = ${fr(b)} cm. ${pick([`Quel est le périmètre du triangle ${E}${F}${K} ?`, `Calcule le périmètre du triangle ${E}${F}${K}.`, `Trouve le périmètre de ${E}${F}${K}.`])}`,
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
      q: pick([`${P.nom} dit : « ${M}${E} = ${M}${F}, donc ${M} est le milieu de ${s}. » Où est l’erreur ?`, `${M}${E} = ${M}${F}, donc ${M} est le milieu de ${s}, écrit ${P.nom}. Que faut-il corriger ?`]),
      juste: `${M} est seulement sur la médiatrice de ${s}, pas forcément sur le segment`,
      faux: [`il n’y a pas d’erreur`, `il faudrait ${M}${E} + ${M}${F} = ${E}${F}`, `${M} n’est jamais sur la médiatrice`],
      r: `De ${M}${E} = ${M}${F}, on déduit que ${M} est sur la MÉDIATRICE de ${s}, une droite entière. Pour être le milieu, ${M} devrait aussi être sur le segment.`,
    },
    {
      q: pick([`${M}${E} = ${M}${F}. Que peut-on en déduire ?`, `${P.nom} mesure : ${M}${E} = ${M}${F}. Que peut-${il(P)} en déduire ?`]),
      juste: `${M} est sur la médiatrice de ${s}`,
      faux: [`${M} est le milieu de ${s}`, `${M} est sur le segment ${s}`, "on ne peut rien en déduire"],
      r: `Tout point à égale distance de ${E} et de ${F} est sur la médiatrice de ${s}. C’est ce sens de la propriété qui sert à démontrer.`,
    },
    {
      q: pick([`Le point ${M} est sur la médiatrice de ${s}. Que peut-on en déduire ?`, `${P.nom} place ${M} sur la médiatrice de ${s}. Quelle égalité est sûre ?`]),
      juste: `${M}${E} = ${M}${F}`,
      faux: [`${M} est le milieu de ${s}`, `${M}${E} + ${M}${F} = ${E}${F}`, `${M}${E} = ${E}${F}`],
      r: `Tout point de la médiatrice de ${s} est à égale distance de ${E} et de ${F} : ${M}${E} = ${M}${F}, où que soit ${M} sur cette droite.`,
    },
    {
      q: pick([`Un point ${M} n’est PAS sur la médiatrice de ${s}. Que peut-on dire de ${M}${E} et ${M}${F} ?`, `${P.nom} place ${M} hors de la médiatrice de ${s}. Compare ${M}${E} et ${M}${F}.`]),
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
  const s = `[${E}${F}]`;
  if (Math.random() < 0.35) {
    const juste = `la médiatrice de ${s}`;
    return {
      text: courtM([`On plie la feuille : ${E} vient sur ${F}.`, `Plie la feuille pour poser ${E} sur ${F}.`, `Plie la feuille : ${F} se pose sur ${E}.`], ["Que représente le pli ?", "Quelle droite trace le pli ?", "Quelle droite forme le pli ?", "Que trace le pli ?"], 16),
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
    text: courtM([`${s} mesure ${fr(L)} cm.`, `Le segment ${s} mesure ${fr(L)} cm.`, `${E}${F} = ${fr(L)} cm.`], ["Quel écartement de compas convient pour sa médiatrice ?", "Quelle ouverture de compas pour tracer sa médiatrice ?", "Choisis l’écartement du compas pour tracer sa médiatrice.", "Quel écartement choisir pour tracer sa médiatrice ?", "Quel écartement permet aux arcs de se couper ?"], 16),
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
  { phrase: "à la craie dans la cour", u: "m", min: 2, max: 12 },
  { phrase: "sur une bande de papier", u: "cm", min: 10, max: 40 },
  { phrase: "sur le tableau", u: "cm", min: 40, max: 150 },
];
function genMedMilieu(): Q {
  const [E, F] = lettres(2);
  const P = prenom();
  const sp = pick(SUPPORTS);
  const L = randomInt(sp.min, sp.max);
  const demi = L / 2;
  return {
    // 07/11/2026 : 40 mots ramenés à 25 au plus (★3).
    text: `${P.nom} trace un segment [${E}${F}] de ${fr(L)} ${sp.u} ${sp.phrase}. ${pick([`Pour sa médiatrice, à quelle distance de ${E} pose-t-${il(P)} l’équerre ?`, `Pour tracer sa médiatrice, à combien de ${E} pose-t-${il(P)} l’équerre ?`, `Où poser l’équerre pour sa médiatrice : à combien de ${E} ?`])}`,
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

// =====================================================================
// ⭐ 07/11/2026 — LA MÊME PHRASE REVENAIT (scripts/mesurer-squelettes-coach.ts
// --lettres : jusqu'à 12 répétitions sur 20). Pour tomber à 4 au plus, il faut une
// quarantaine de phrases à peu près équiprobables par étoile : chaque gabarit
// ci-dessous pose une AUTRE question (lire la figure, trouver la droite, vrai ou
// faux, compléter, calculer, prendre la question par l'autre bout).
// ★1 : 12 mots au plus. ★2 : 15 mots au plus. Aucun prénom, aucun objet à ★1-★2.
// Correcteurs : correcteurs/mediatrice.ts, section du 07/11.
// =====================================================================
const qc = (text: string, juste: string, faux: string[], calcul: string, canvas?: DroitesCanvasData): Q => ({
  text, format: "qcm", choices: shuffle([juste, ...faux]), expected: [juste], comparator: "mcq_exact", explanation: expl(calcul), ...(canvas ? { canvas } : {}),
});
const ouiNon = (text: string, oui: boolean, calcul: string, canvas?: DroitesCanvasData) => qc(text, oui ? "oui" : "non", [oui ? "non" : "oui"], calcul, canvas);
const vraiFaux = (text: string, vrai: boolean, calcul: string) => qc(text, vrai ? "vrai" : "faux", [vrai ? "faux" : "vrai"], calcul);
/** Réponse courte : une longueur avec son unité. */
const lg = (text: string, v: number, u: string, calcul: string, canvas?: DroitesCanvasData): Q => ({
  text, format: "short", expected: [`${fr(v)} ${u}`], comparator: "number_equal", explanation: expl(calcul), ...(canvas ? { canvas } : {}),
});
/** Réponse courte en degrés. */
const dg = (text: string, v: number, calcul: string, canvas?: DroitesCanvasData): Q => ({
  text, format: "short", expected: [`${v}°`, String(v)], comparator: "number_equal", explanation: expl(calcul), ...(canvas ? { canvas } : {}),
});
/** Réponse courte : un nombre sans unité. */
const nb = (text: string, n: number, calcul: string): Q => ({
  text, format: "short", expected: [String(n)], comparator: "number_equal", explanation: expl(calcul),
});
/** Réponse courte en lettres : toutes les écritures justes sont acceptées. */
const lt = (text: string, justes: string[], calcul: string): Q => ({
  text, format: "short", expected: justes, comparator: "exact_text", explanation: expl(calcul),
});
const DEF_COURTE = (s: string) => `La médiatrice de ${s} est perpendiculaire à ${s} et passe par son milieu.`;

// ----- MEDIATRICE_DEFINITION, ★1
function genDefVraiFaux(): Q {
  const [E, F] = lettres(2);
  const s = `[${E}${F}]`;
  const cas = pick([
    { f: `passe par son milieu`, v: true },
    { f: `est perpendiculaire à ${s}`, v: true },
    { f: `coupe ${s} en son milieu`, v: true },
    { f: `coupe ${s} à angle droit`, v: true },
    { f: `est une droite`, v: true },
    { f: `est parallèle à ${s}`, v: false },
    { f: `passe par le point ${E}`, v: false },
    { f: `est un segment`, v: false },
    { f: `coupe ${s} en biais`, v: false },
  ]);
  const enonce = `la médiatrice de ${s} ${cas.f}`;
  return vraiFaux(pick([`Vrai ou faux : ${enonce}.`, `${cap(enonce)}. Vrai ou faux ?`]), cas.v, `${DEF_COURTE(s)} La phrase est donc ${cas.v ? "vraie" : "fausse"}.`);
}
function genDefCompleter(): Q {
  const [E, F] = lettres(2);
  const s = `[${E}${F}]`;
  const r = DEF_COURTE(s);
  return pick([
    () => qc(pick([`Complète : la médiatrice de ${s} est … à ${s}.`, `Quel mot manque : la médiatrice de ${s} est … à ${s} ?`]), "perpendiculaire", ["parallèle", "égale", "extérieure"], r),
    () => qc(pick([`Complète : la médiatrice de ${s} passe par son …`, `Quel mot manque : la médiatrice de ${s} passe par son … ?`]), "milieu", ["sommet", "côté", "rayon"], r),
    () => qc(pick([`Complète : la médiatrice de ${s} est une …`, `Quel mot manque : la médiatrice de ${s} est une … ?`]), "droite", ["demi-droite", "longueur", "mesure"], `${r} C’est une droite : elle se prolonge sans fin.`),
    () => dg(pick([`Combien de degrés entre ${s} et sa médiatrice ?`, `Quel angle en degrés fait la médiatrice avec ${s} ?`]), 90, `${r} L’angle est droit : 90°.`),
    () => qc(pick([`Quelle sorte d’angle forme la médiatrice avec ${s} ?`, `La médiatrice de ${s} forme quel angle avec ${s} ?`]), "un angle droit", ["un angle aigu", "un angle obtus", "un angle plat"], r),
    () => qc(pick([`Par quel point de ${s} passe sa médiatrice ?`, `Quel point de ${s} est sur sa médiatrice ?`]), "son milieu", [E, F, `aucun point de ${s}`], r),
  ])();
}
/** [EF], son milieu et trois droites : la médiatrice, une perpendiculaire à côté du milieu, une penchée par le milieu. */
function figureTroisDroites(noms: { a: string; b: string; m: string }, labels: { med: string; cote: string; penchee: string }): DroitesCanvasData {
  const sens = pick([1, -1]);
  const pente = 110 / 240;
  const xCote = M.x + sens * 55;
  const xPenchee = (y: number) => M.x - sens * pente * (A.y - y);
  // Le nom d'une droite s'écrit au milieu de from-to : on les prend en haut du cadre pour les séparer.
  const droite = (label: string, from: { x: number; y: number }, to: { x: number; y: number }, color: string) => ({
    id: label.replace(/[()]/g, ""), type: "droite" as const, from, to, color, label, display: { showLabel: true, extend: true },
  });
  const COULEURS: Record<string, string> = { "(d1)": "#2563eb", "(d2)": "#059669", "(d3)": "#d97706" };
  return {
    kind: "droites",
    size: { width: 340, height: 320 },
    lines: [
      { id: "AB", type: "segment", from: A, to: B },
      droite(labels.med, { x: M.x, y: 55 }, { x: M.x, y: 95 }, COULEURS[labels.med]),
      droite(labels.cote, { x: xCote, y: 55 }, { x: xCote, y: 95 }, COULEURS[labels.cote]),
      droite(labels.penchee, { x: xPenchee(55), y: 55 }, { x: xPenchee(95), y: 95 }, COULEURS[labels.penchee]),
    ],
    points: [
      { x: A.x, y: A.y, label: noms.a },
      { x: B.x, y: B.y, label: noms.b },
      { x: M.x, y: M.y, label: noms.m, color: "#ef4444", highlight: true },
    ],
    markers: {
      rightAngles: [
        { x: M.x, y: A.y, lineA: "AB", lineB: labels.med.replace(/[()]/g, "") },
        { x: xCote, y: A.y, lineA: "AB", lineB: labels.cote.replace(/[()]/g, "") },
      ],
    },
    display: { showLabels: true, showPoints: true, showRightAngleMarkers: true },
  };
}
function genDefTroisDroites(): Q {
  const [E, F, K] = lettres(3);
  const s = `[${E}${F}]`;
  const [med, cote, penchee] = shuffle(["(d1)", "(d2)", "(d3)"]);
  const canvas = figureTroisDroites({ a: E, b: F, m: K }, { med, cote, penchee });
  const choix = (juste: string) => shuffle(["(d1)", "(d2)", "(d3)"]).filter((x) => x !== juste);
  const r = `${K} est le milieu de ${s}. ${med} passe par ${K} avec un angle droit : c’est la médiatrice. ${cote} a un angle droit, mais à côté de ${K}. ${penchee} passe par ${K}, mais en biais.`;
  const mode = pick(["med", "med", "penchee", "cote"] as const);
  if (mode === "med")
    return qc(pick([`${K} est le milieu de ${s}. Quelle droite est sa médiatrice ?`, `${K} est le milieu de ${s}. Trouve sa médiatrice.`, `Observe la figure. Quelle droite est la médiatrice de ${s} ?`, `Regarde les marques. Quelle droite est la médiatrice de ${s} ?`, `Choisis la médiatrice de ${s} sur la figure.`]), med, choix(med), r, canvas);
  if (mode === "penchee")
    return qc(pick([`Quelle droite coupe ${s} en son milieu, mais en biais ?`, `Quelle droite passe par ${K} sans angle droit ?`]), penchee, choix(penchee), r, canvas);
  return qc(pick([`Quelle droite est perpendiculaire à ${s}, mais loin du milieu ?`, `Quelle droite fait un angle droit, à côté de ${K} ?`]), cote, choix(cote), r, canvas);
}
function genDefNombre(): Q {
  const [E, F, K] = lettres(3);
  const s = `[${E}${F}]`;
  const canvas = segmentEtDroite({ perpendiculaire: true, parMilieu: true, labelDroite: "(d)", marquerMilieu: true, noms: { a: E, b: F, m: K } });
  const intros = [`(d) est la médiatrice de ${s}.`, `${s} a pour médiatrice (d).`];
  if (Math.random() < 0.2)
    return dg(tient(croise(intros, ["Combien mesure l’angle marqué ?", "Quelle est la mesure de l’angle marqué ?"]), 12), 90, `La médiatrice est perpendiculaire à ${s} : l’angle marqué est droit, il mesure 90°.`, canvas);
  const demi = randomInt(2, 10);
  const L = 2 * demi;
  const verbes = (X: string) => [`Calcule ${X}.`, `Combien mesure ${X} ?`, `Trouve ${X}.`, `Que vaut ${X} ?`];
  if (Math.random() < 0.6) {
    const X = pick([`${E}${K}`, `${K}${F}`]);
    return lg(tient(croise(intros.flatMap((i) => [`${i} ${s} mesure ${L} cm.`, `${i} ${E}${F} = ${L} cm.`]), verbes(X)), 12), demi, "cm", `${K} est le milieu de ${s} : ${X} = ${L} ÷ 2 = ${demi} cm.`, canvas);
  }
  const X = pick([`${K}${F}`, `${E}${F}`]);
  const v = X === `${E}${F}` ? L : demi;
  return lg(tient(croise(intros.map((i) => `${i} ${E}${K} = ${demi} cm.`), verbes(X)), 12), v, "cm", `${K} est le milieu de ${s}, donc ${K}${F} = ${E}${K} = ${demi} cm et ${E}${F} = ${L} cm.`, canvas);
}
function genDefNom(): Q {
  const [E, F] = lettres(2);
  const s = `[${E}${F}]`;
  const juste = `la médiatrice de ${s}`;
  const faux = [`une parallèle à ${s}`, `le milieu de ${s}`, `le prolongement de ${s}`];
  const r = DEF_COURTE(s);
  if (Math.random() < 0.2)
    return qc(pick(["Combien de conditions doit remplir une médiatrice ?", "Une médiatrice doit remplir combien de conditions ?", "Pour être une médiatrice, combien de conditions faut-il ?"]), "2", ["1", "3", "4"], `Deux conditions : être perpendiculaire au segment, et passer par son milieu.`);
  const txt = tient(
    [
      ...croise([`(d) est perpendiculaire à ${s} en son milieu.`, `(d) coupe ${s} en son milieu, à angle droit.`], ["Comment s’appelle (d) ?", "Que représente (d) ?", `Quel nom donner à (d) ?`]),
      `Perpendiculaire à ${s} en son milieu : quelle droite est-ce ?`,
      `Droite perpendiculaire à ${s} par son milieu : comment l’appelle-t-on ?`,
      `Perpendiculaire à ${s} par son milieu : quel nom porte cette droite ?`,
    ],
    12,
  );
  return qc(txt, juste, faux, r);
}

// ----- MEDIATRICE_DEFINITION, ★2
function genDefLireFigure(): Q {
  const [E, F, K] = lettres(3);
  const s = `[${E}${F}]`;
  const perp = Math.random() < 0.5;
  const mil = Math.random() < 0.5;
  const canvas = segmentEtDroite({ perpendiculaire: perp, parMilieu: mil, labelDroite: "(d)", marquerMilieu: true, noms: { a: E, b: F, m: K } });
  const mode = pick(["perp", "milieu", "manque", "manque"] as const);
  if (mode === "perp")
    return ouiNon(pick([`Sur la figure, (d) est-elle perpendiculaire à ${s} ?`, `(d) fait-elle un angle droit avec ${s} ?`, `Regarde la marque. (d) est-elle perpendiculaire à ${s} ?`]), perp, perp ? "La marque d’angle droit le montre." : "Il n’y a pas de marque d’angle droit : la droite est penchée.", canvas);
  if (mode === "milieu")
    return ouiNon(pick([`${K} est le milieu de ${s}. (d) passe-t-elle par ${K} ?`, `${K} est le milieu de ${s}. (d) coupe-t-elle ${s} en ${K} ?`, `Sur la figure, ${K} est le milieu. (d) passe-t-elle par ${K} ?`]), mil, mil ? `(d) coupe ${s} en ${K}, son milieu.` : `(d) coupe ${s} à côté de ${K}.`, canvas);
  const reps = { rien: "rien : c’est la médiatrice", milieu: `passer par ${K}`, perp: `être perpendiculaire à ${s}`, deux: "les deux conditions" };
  const juste = perp && mil ? reps.rien : perp ? reps.milieu : mil ? reps.perp : reps.deux;
  return qc(
    pick([`${K} est le milieu de ${s}. Que manque-t-il à (d) ?`, `${K} est le milieu. Que manque-t-il à (d) pour être médiatrice ?`, `Pour être médiatrice de ${s}, que manque-t-il à (d) ? ${K} est le milieu.`, `${K} est le milieu de ${s}. Que faut-il encore à (d) ?`]),
    juste, Object.values(reps).filter((x) => x !== juste),
    `Il faut un angle droit et passer par le milieu ${K}. Ici : ${perp ? "angle droit oui" : "angle droit non"}, ${mil ? "milieu oui" : "milieu non"}.`, canvas,
  );
}
function genDefMesuresCourtes(): Q {
  const [E, F, K] = lettres(3);
  const s = `[${E}${F}]`;
  const ang = Math.random() < 0.55 ? 90 : pick([60, 70, 75, 80, 100, 110, 120]);
  const mil = Math.random() < 0.55;
  const d = mil
    ? pick([`(d) coupe ${s} en son milieu, à ${ang}°.`, `(d) coupe ${s} en ${K}, à ${ang}°, avec ${E}${K} = ${K}${F}.`, `À ${ang}°, (d) coupe ${s} en son milieu.`])
    : pick([`(d) coupe ${s} à ${ang}°, mais pas en son milieu.`, `(d) coupe ${s} à ${ang}°, à côté de son milieu.`, `(d) coupe ${s} à ${ang}°, en ${E}.`]);
  return ouiNon(
    tient(croise([d], [`Est-ce la médiatrice de ${s} ?`, `Est-ce sa médiatrice ?`, `(d) est-elle sa médiatrice ?`, `(d) est-elle la médiatrice de ${s} ?`]), 15),
    ang === 90 && mil,
    `Il faut un angle de 90° ET le milieu. Ici : ${ang}°, ${mil ? "par le milieu" : "pas par le milieu"}.`,
  );
}
function genDefNombreK(): Q {
  const [E, F, K] = lettres(3);
  const s = `[${E}${F}]`;
  const intros = [`La médiatrice de ${s} le coupe en ${K}.`, `La médiatrice de ${s} coupe ${s} en ${K}.`, `${s} et sa médiatrice se coupent en ${K}.`];
  const verbes = (X: string) => [`Calcule ${X}.`, `Combien mesure ${X} ?`, `Trouve ${X}.`, `Que vaut ${X} ?`];
  const L = randomInt(4, 18);
  if (Math.random() < 0.6) {
    const X = pick([`${E}${K}`, `${K}${F}`]);
    return lg(tient(croise(intros.flatMap((i) => [`${i} ${s} mesure ${L} cm.`, `${i} ${E}${F} = ${L} cm.`]), verbes(X)), 15), L / 2, "cm", `${K} est le milieu de ${s} : ${X} = ${L} ÷ 2 = ${fr(L / 2)} cm.`);
  }
  const demi = L / 2;
  const X = pick([`${K}${F}`, `${E}${F}`]);
  return lg(tient(croise(intros.map((i) => `${i} ${E}${K} = ${fr(demi)} cm.`), verbes(X)), 15), X === `${E}${F}` ? L : demi, "cm", `${K} est le milieu de ${s}, donc ${K}${F} = ${E}${K} = ${fr(demi)} cm et ${E}${F} = ${L} cm.`);
}
function genDefCombien(): Q {
  const [E, F] = lettres(2);
  const s = `[${E}${F}]`;
  const fem = ["une seule", "une infinité", "deux", "aucune"];
  const mas = ["un seul", "une infinité", "deux", "aucun"];
  const cas = pick([
    { t: `Combien de droites passent par le milieu de ${s} ?`, j: "une infinité", c: fem, r: `Par un point, il passe une infinité de droites.` },
    { t: `Combien de droites sont perpendiculaires à ${s} ?`, j: "une infinité", c: fem, r: `Il y en a une en chaque point de ${s}, et même au-delà.` },
    { t: `Combien de droites perpendiculaires à ${s} passent par son milieu ?`, j: "une seule", c: fem, r: `C’est la médiatrice de ${s} : elle est unique.` },
    { t: `Combien de médiatrices a le segment ${s} ?`, j: "une seule", c: fem, r: `${s} a un seul milieu, et une seule perpendiculaire y passe.` },
    { t: `Combien de droites passent par ${E} et sont perpendiculaires à ${s} ?`, j: "une seule", c: fem, r: `Par un point, il passe une seule perpendiculaire à une droite.` },
    { t: `Combien de milieux a le segment ${s} ?`, j: "un seul", c: mas, r: `Un segment a un seul milieu.` },
    { t: `Combien de points de ${s} sont sur sa médiatrice ?`, j: "un seul", c: mas, r: `La médiatrice coupe ${s} en un seul point : son milieu.` },
    { t: `${s} et sa médiatrice ont combien de points communs ?`, j: "un seul", c: mas, r: `Ils se coupent en un seul point : le milieu de ${s}.` },
  ]);
  return qc(cas.t, cas.j, cas.c.filter((x) => x !== cas.j), cas.r);
}
function genDefManque(): Q {
  const [E, F] = lettres(2);
  const s = `[${E}${F}]`;
  const r = DEF_COURTE(s);
  const VRAIES = [`elle passe par le milieu de ${s}`, `elle est perpendiculaire à ${s}`, `elle coupe ${s} à angle droit`, `c’est une droite`];
  const FAUSSES = [`elle passe par ${E}`, `elle est parallèle à ${s}`, `elle passe par ${F}`, `c’est un segment`, `elle coupe ${s} en biais`];
  return pick([
    () => qc(pick([`Une droite passe par le milieu de ${s}. Que lui manque-t-il pour être sa médiatrice ?`, `Une droite passe par le milieu de ${s}. Que faut-il encore pour sa médiatrice ?`]), `être perpendiculaire à ${s}`, [`passer par ${E}`, `être parallèle à ${s}`, "rien"], r),
    () => qc(pick([`Une droite est perpendiculaire à ${s}. Que lui manque-t-il pour être sa médiatrice ?`, `Une droite est perpendiculaire à ${s}. Que faut-il encore pour sa médiatrice ?`]), `passer par le milieu de ${s}`, [`passer par ${E}`, `être parallèle à ${s}`, "rien"], r),
    () => ouiNon(`Une droite passe par ${E} et est perpendiculaire à ${s}. Est-ce sa médiatrice ?`, false, r),
    () => ouiNon(`Une droite passe par le milieu de ${s}, en biais. Est-ce sa médiatrice ?`, false, r),
    () => ouiNon(`Une droite est perpendiculaire à ${s}, en son milieu. Est-ce sa médiatrice ?`, true, r),
    () => qc(pick([`Quelle phrase est vraie sur la médiatrice de ${s} ?`, `Coche la phrase vraie sur la médiatrice de ${s}.`]), pick(VRAIES), shuffle(FAUSSES).slice(0, 3), r),
    () => qc(pick([`Quelle phrase est fausse sur la médiatrice de ${s} ?`, `Coche la phrase fausse sur la médiatrice de ${s}.`, `Trouve l’erreur sur la médiatrice de ${s}.`]), pick(FAUSSES), shuffle(VRAIES).slice(0, 3), r),
  ])();
}

// ----- MEDIATRICE_DEFINITION, ★3 : une situation simple
const BOUTS = ["deux arbres", "deux poteaux", "deux plots", "deux piquets", "deux bornes", "deux lampadaires", "deux maisons", "deux bancs"];
const TRAITS = ["une rue", "une allée", "une clôture", "une haie", "une ficelle", "une ligne de craie", "une corde", "une barrière"];
function genDefSituation(): Q {
  const [E, F] = lettres(2);
  const s = `[${E}${F}]`;
  const bout = cap(pick(BOUTS));
  const trait = pick(TRAITS);
  const intro = `${bout} sont en ${E} et ${F}.`;
  const r = DEF_COURTE(s);
  if (Math.random() < 0.35)
    return qc(tient(croise([`${intro} ${cap(trait)} coupe ${s} en son milieu, à 90°.`], [`Que représente ${trait.replace(/^une /, "cette ")} pour ${s} ?`, `Que représente-t-elle pour ${s} ?`]), 25), "sa médiatrice", ["son milieu", "une parallèle à ce segment", "son prolongement"], r);
  const cas = pick([
    { d: `coupe ${s} en son milieu, à 90°.`, oui: true },
    { d: `coupe ${s} en son milieu, à ${pick([60, 70, 80, 110, 120])}°.`, oui: false },
    { d: `coupe ${s} à 90°, à côté de son milieu.`, oui: false },
  ]);
  return ouiNon(tient(croise([`${intro} ${cap(trait)} ${cas.d}`], [`Est-ce la médiatrice de ${s} ?`, `Est-ce sa médiatrice ?`, `${cap(trait.replace(/^une /, "cette "))} est-elle la médiatrice de ${s} ?`]), 25), cas.oui, r);
}
function genDefSituationCalcul(): Q {
  const [E, F] = lettres(2);
  const s = `[${E}${F}]`;
  const bout = cap(pick(BOUTS));
  const trait = cap(pick(TRAITS.filter((x) => motsV(x) <= 2)));
  const L = randomInt(4, 40);
  const mode = pick(["distance", "distance", "angle", "inverse"] as const);
  if (mode === "inverse") {
    const x = randomInt(2, 25);
    return lg(tient(croise([`${trait} est la médiatrice de ${s}. Elle coupe ${s} à ${x} m de ${E}.`], [`Combien mesure ${E}${F} ?`, `Quelle est la longueur de ${s} ?`, `Calcule ${E}${F}.`]), 25), 2 * x, "m", `Elle coupe ${s} en son milieu : ${E}${F} = 2 × ${x} = ${2 * x} m.`);
  }
  const intro = `${bout} sont en ${E} et ${F}, avec ${E}${F} = ${L} m. ${trait} est la médiatrice de ${s}.`;
  if (mode === "angle") return dg(tient(croise([intro], [`Quel angle fait-elle avec ${s} ?`, `Quel angle, en degrés, fait-elle avec ${s} ?`]), 25), 90, `La médiatrice est perpendiculaire à ${s} : 90°.`);
  return lg(tient(croise([intro], [`À quelle distance de ${E} coupe-t-elle ${s} ?`, `À combien de ${E} coupe-t-elle ${s} ?`]), 25), L / 2, "m", `Elle coupe ${s} en son milieu : ${L} ÷ 2 = ${fr(L / 2)} m.`);
}

// ----- MEDIATRICE_PROPRIETE, ★2
function genPropDeduire(): Q {
  const [E, F, K] = lettres(3);
  const s = `[${E}${F}]`;
  const [X, Y] = Math.random() < 0.5 ? [E, F] : [F, E];
  const intros = [`${K} est sur la médiatrice de ${s}.`, `Le point ${K} est sur la médiatrice de ${s}.`, `${K} appartient à la médiatrice de ${s}.`];
  const r = `Tout point de la médiatrice de ${s} est à égale distance de ${E} et de ${F} : ${K}${E} = ${K}${F}.`;
  if (Math.random() < 0.35)
    return lt(tient(croise(intros, [`Quelle longueur est égale à ${K}${X} ?`, `Écris la longueur égale à ${K}${X}.`]), 15), [`${K}${Y}`, `${Y}${K}`], r);
  return qc(
    tient(croise(intros, ["Que peut-on en déduire ?", "Quelle égalité est vraie ?", `Que sait-on de ${K}${E} et ${K}${F} ?`]), 15),
    `${K}${E} = ${K}${F}`, [`${K} est le milieu de ${s}`, `${K}${E} + ${K}${F} = ${E}${F}`, `${K}${E} = ${E}${F}`], r,
  );
}
function genPropReciproqueCourte(): Q {
  const [E, F, K] = lettres(3);
  const s = `[${E}${F}]`;
  const r = `Si ${K}${E} = ${K}${F}, ${K} est à égale distance de ${E} et de ${F} : il est sur la médiatrice de ${s}.`;
  if (Math.random() < 0.5) {
    const a = randomInt(3, 12);
    const eg = Math.random() < 0.5;
    const b = eg ? a : a + pick([1, 2, 3]);
    const [u, v] = Math.random() < 0.5 ? [a, b] : [b, a];
    return ouiNon(
      tient(croise([`${K}${E} = ${u} cm et ${K}${F} = ${v} cm.`, `${K}${F} = ${v} cm et ${K}${E} = ${u} cm.`], [`${K} est-il sur la médiatrice de ${s} ?`, `${K} appartient-il à la médiatrice de ${s} ?`, `Le point ${K} est-il sur la médiatrice de ${s} ?`]), 15),
      eg, eg ? r : `${u} cm et ${v} cm : ${K} n’est pas à égale distance de ${E} et de ${F}.`,
    );
  }
  const juste = `sur la médiatrice de ${s}`;
  return qc(
    pick([`${K}${E} = ${K}${F}. Où est ${K} ?`, `${K}${E} = ${K}${F}. Où se trouve le point ${K} ?`, `Que déduis-tu de ${K}${E} = ${K}${F} pour le point ${K} ?`, `${K} est à égale distance de ${E} et ${F}. Où est ${K} ?`, `${K} est aussi près de ${E} que de ${F}. Où est ${K} ?`]),
    juste, [`au milieu de ${s}`, `sur le segment ${s}`, `sur la droite (${E}${F})`], r,
  );
}
/** La médiatrice (d) de [EF] et des points placés dessus (`sur`) ou à côté, à la hauteur donnée. */
function figurePoints(E: string, F: string, pts: { label: string; sur: boolean; hauteur: number; traits?: boolean }[]) {
  const f = segmentEtDroite({ perpendiculaire: true, parMilieu: true, labelDroite: "(d)", noms: { a: E, b: F } });
  for (const pt of pts) {
    const x = pt.sur ? M.x : M.x + pick([-70, -45, 45, 70]);
    f.points?.push({ x, y: pt.hauteur, label: pt.label, color: "#7c3aed", highlight: true });
    if (pt.traits) f.lines.push({ id: `${pt.label}A`, type: "segment", from: { x, y: pt.hauteur }, to: A, dashed: true, color: "#7c3aed" }, { id: `${pt.label}B`, type: "segment", from: { x, y: pt.hauteur }, to: B, dashed: true, color: "#7c3aed" });
  }
  return f;
}
function genPropFigure(): Q {
  const [E, F, K, T] = lettres(4);
  const s = `[${E}${F}]`;
  const intros = [`(d) est la médiatrice de ${s}.`, `Sur la figure, (d) est la médiatrice de ${s}.`, `${s} a pour médiatrice (d).`];
  const mode = pick(["longueur", "egal", "lequel"] as const);
  if (mode === "longueur") {
    const v = randomInt(3, 14);
    const [X, Y] = Math.random() < 0.5 ? [E, F] : [F, E];
    return lg(tient(croise(intros.map((i) => `${i} ${K}${X} = ${v} cm.`), [`Trouve ${K}${Y}.`, `Calcule ${K}${Y}.`, `Combien mesure ${K}${Y} ?`]), 15), v, "cm", `${K} est sur (d), la médiatrice : ${K}${Y} = ${K}${X} = ${v} cm.`, figurePoints(E, F, [{ label: K, sur: true, hauteur: pick([60, 75, 90]), traits: true }]));
  }
  if (mode === "egal") {
    const sur = Math.random() < 0.5;
    return ouiNon(
      tient(croise(intros, [`${K} est-il à égale distance de ${E} et ${F} ?`, `A-t-on ${K}${E} = ${K}${F} ?`, `Regarde ${K}. A-t-on ${K}${E} = ${K}${F} ?`]), 15),
      sur, sur ? `${K} est sur la médiatrice : ${K}${E} = ${K}${F}.` : `${K} n’est pas sur la médiatrice : il est plus près d’une extrémité.`,
      figurePoints(E, F, [{ label: K, sur, hauteur: pick([60, 75, 90]), traits: true }]),
    );
  }
  const haut = Math.random() < 0.5;
  return qc(
    tient(croise(intros, [`Quel point est à égale distance de ${E} et ${F} ?`, `Quel point est aussi près de ${E} que de ${F} ?`]), 15),
    K, [T, "aucun des deux"], `${K} est sur la médiatrice : il est à égale distance de ${E} et de ${F}. ${T} n’y est pas.`,
    figurePoints(E, F, [{ label: K, sur: true, hauteur: haut ? 70 : 285 }, { label: T, sur: false, hauteur: haut ? 270 : 70 }]),
  );
}
function genPropSommeTriangle(): Q {
  const [E, F, K] = lettres(3);
  const s = `[${E}${F}]`;
  const i = `${K} est sur la médiatrice de ${s}.`;
  const v = randomInt(3, 14);
  const r = `${K} est sur la médiatrice de ${s} : ${K}${E} = ${K}${F}.`;
  return pick([
    () => lg(`${i} ${K}${E} + ${K}${F} = ${2 * v} cm. ${pick([`Calcule ${K}${E}.`, `Trouve ${K}${F}.`, `Combien mesure ${K}${E} ?`])}`, v, "cm", `${r} Chacune vaut ${2 * v} ÷ 2 = ${v} cm.`),
    () => lg(`${i} ${K}${E} = ${v} cm. ${pick([`Calcule ${K}${E} + ${K}${F}.`, `Que vaut ${K}${E} + ${K}${F} ?`])}`, 2 * v, "cm", `${r} La somme vaut ${v} + ${v} = ${2 * v} cm.`),
    () => qc(`${i} ${pick([`Quelle est la nature du triangle ${E}${F}${K} ?`, `Comment est le triangle ${E}${F}${K} ?`])}`, `isocèle en ${K}`, [`isocèle en ${E}`, `isocèle en ${F}`, `rectangle en ${K}`], `${r} Deux côtés égaux partent de ${K}.`),
    () => qc(`Le triangle ${E}${F}${K} est isocèle en ${K}. ${pick([`Où se trouve ${K} ?`, `Sur quelle droite est ${K} ?`])}`, `sur la médiatrice de ${s}`, [`sur la droite (${E}${F})`, `sur la parallèle à ${s}`, `au milieu de ${s}`], `Isocèle en ${K} : ${K}${E} = ${K}${F}, donc ${K} est sur la médiatrice de ${s}.`),
  ])();
}
function genPropVraiFaux(): Q {
  const [E, F, K] = lettres(3);
  const s = `[${E}${F}]`;
  const cas = pick([
    { f: `si ${K}${E} = ${K}${F}, ${K} est sur la médiatrice de ${s}`, v: true },
    { f: `si ${K} est sur la médiatrice de ${s}, alors ${K}${E} = ${K}${F}`, v: true },
    { f: `si ${K}${E} = ${K}${F}, ${K} est le milieu de ${s}`, v: false },
    { f: `si ${K} est sur la médiatrice de ${s}, ${K} est sur ${s}`, v: false },
    { f: `si ${K} est sur la médiatrice de ${s}, alors ${K}${E} + ${K}${F} = ${E}${F}`, v: false },
    { f: `le milieu de ${s} est à égale distance de ${E} et ${F}`, v: true },
    { f: `tout point de la médiatrice de ${s} est sur ${s}`, v: false },
  ]);
  return vraiFaux(pick([`Vrai ou faux : ${cas.f}.`, `${cap(cas.f)}. Vrai ou faux ?`]), cas.v, `Être sur la médiatrice de ${s}, c’est être à égale distance de ${E} et de ${F}. Le milieu de ${s} est un de ces points, mais il y en a d’autres, hors du segment.`);
}

// ----- MEDIATRICE_PROPRIETE, ★5
function genPropPerimetre(): Q {
  const [E, F, K, T] = lettres(4);
  const s = `[${E}${F}]`;
  const l = pick(LIEUX.filter((x) => x.u === "m" && x.max >= 15));
  const situation = Math.random() < 0.4;
  const u = situation ? "m" : "cm";
  const a = randomInt(5, 14);
  const mode = pick(["triangle", "triangle", "quadri", "somme"] as const);
  const intro = situation ? `${cap(l.entre)} sont en ${E} et ${F}. ${cap(l.quoi)} est en ${K}, sur la médiatrice de ${s}.` : `${K} est sur la médiatrice de ${s}.`;
  if (mode === "triangle") {
    const b = randomInt(3, 2 * a - 2);
    const P = 2 * a + b;
    const [X] = Math.random() < 0.5 ? [E] : [F];
    return lg(
      `${intro} ${pick([`Le triangle ${E}${F}${K} a pour périmètre ${P} ${u}.`, `Le périmètre de ${E}${F}${K} est ${P} ${u}.`, `Le tour du triangle ${E}${F}${K} mesure ${P} ${u}.`])} ${E}${F} = ${b} ${u}. ${pick([`Combien mesure ${K}${X} ?`, `Calcule ${K}${X}.`, `Déduis-en ${K}${X}.`])}`,
      a, u, `${K}${E} = ${K}${F}. Les deux côtés égaux font ${P} − ${b} = ${P - b} ${u}, donc chacun mesure ${P - b} ÷ 2 = ${a} ${u}.`,
    );
  }
  const c = randomInt(5, 14);
  const deux = `${K} et ${T} sont sur la médiatrice de ${s}, de part et d’autre de ${s}. ${K}${E} = ${a} cm et ${T}${F} = ${c} cm.`;
  if (mode === "quadri")
    return lg(`${deux} ${pick([`Quel est le périmètre du quadrilatère ${E}${K}${F}${T} ?`, `Calcule le périmètre de ${E}${K}${F}${T}.`])}`, 2 * (a + c), "cm", `${K}${F} = ${K}${E} = ${a} cm et ${T}${E} = ${T}${F} = ${c} cm. Périmètre : ${a} + ${a} + ${c} + ${c} = ${2 * (a + c)} cm.`);
  return lg(`${deux} ${pick([`Combien mesure ${K}${F} + ${T}${E} ?`, `Calcule ${K}${F} + ${T}${E}.`])}`, a + c, "cm", `${K}${F} = ${K}${E} = ${a} cm et ${T}${E} = ${T}${F} = ${c} cm. Somme : ${a + c} cm.`);
}
function genPropCote(): Q {
  const [E, F, K] = lettres(3);
  const s = `[${E}${F}]`;
  const l = pick(LIEUX);
  const a = l.u === "km" ? randomInt(2, 9) : randomInt(3, 15);
  const b = a + pick([1, 2, 3]);
  const [dE, dF] = Math.random() < 0.5 ? [a, b] : [b, a];
  const pres = dE < dF ? E : F;
  const pourquoi = `${K} n’est pas à égale distance de ${E} et de ${F} : il n’est pas sur la médiatrice. Il est du côté de l’extrémité la plus proche.`;
  const mode = pick(["cote", "proche", "lieu", "compare"] as const);
  if (mode === "cote")
    return qc(
      `${pick([`Un point ${K} vérifie ${K}${E} = ${dE} cm et ${K}${F} = ${dF} cm.`, `On mesure ${K}${E} = ${dE} cm et ${K}${F} = ${dF} cm.`])} ${pick([`De quel côté de la médiatrice de ${s} se trouve ${K} ?`, `Où est ${K} par rapport à la médiatrice de ${s} ?`])}`,
      `du côté de ${pres}`, [`du côté de ${pres === E ? F : E}`, `sur la médiatrice de ${s}`, "on ne peut pas savoir"], pourquoi,
    );
  if (mode === "proche")
    return qc(`${K} est à ${dE} cm de ${E} et à ${dF} cm de ${F}. ${pick([`${K} est-il plus près de ${E} ou de ${F} ?`, `De quelle extrémité de ${s} ${K} est-il le plus proche ?`])}`, `de ${pres}`, [`de ${pres === E ? F : E}`, "des deux pareil"], pourquoi);
  if (mode === "lieu")
    return qc(`${cap(l.entre)} sont en ${E} et ${F}. ${cap(l.quoi)} est en ${K}, avec ${K}${E} = ${dE} ${l.u} et ${K}${F} = ${dF} ${l.u}. ${pick([`De quel côté de la médiatrice de ${s} est ${K} ?`, `Où est ${K} par rapport à la médiatrice de ${s} ?`])}`, `du côté de ${pres}`, [`du côté de ${pres === E ? F : E}`, `sur la médiatrice de ${s}`, "on ne peut pas savoir"], pourquoi);
  const cote = pick([E, F]);
  const autre = cote === E ? F : E;
  return qc(
    pick([`${K} est du côté de ${cote} par rapport à la médiatrice de ${s}. Compare ${K}${E} et ${K}${F}.`, `La médiatrice de ${s} coupe le plan en deux parties. ${K} est dans la partie qui contient ${cote}. Quelle phrase est juste ?`]),
    `${K}${cote} < ${K}${autre}`, [`${K}${cote} > ${K}${autre}`, `${K}${E} = ${K}${F}`, "on ne peut pas savoir"], `Du côté de ${cote}, on est plus près de ${cote} que de ${autre}.`,
  );
}
function genPropTableau(): Q {
  const [E, F, R, S, T] = lettres(5);
  const s = `[${E}${F}]`;
  const mode = pick(["sur", "sur", "pasSur", "combien"] as const);
  const nbEg = mode === "sur" ? 1 : mode === "pasSur" ? 2 : randomInt(0, 3);
  const noms = shuffle([R, S, T]);
  const data = noms.map((n, i) => {
    const a = randomInt(3, 12);
    const b = i < nbEg ? a : a + pick([1, 2, 3, 4]);
    const [u, v] = Math.random() < 0.5 ? [a, b] : [b, a];
    return { n, eg: i < nbEg, txt: `${n}${E} = ${u} cm et ${n}${F} = ${v} cm.` };
  });
  const lignes = shuffle(data).map((d) => d.txt).join(" ");
  const intro = pick(["", "Voici trois points. ", "On mesure trois points. "]);
  const r = `Un point est sur la médiatrice de ${s} quand ses distances à ${E} et à ${F} sont égales.`;
  const ordre = shuffle([R, S, T]);
  if (mode === "sur") return qc(`${intro}${lignes} ${pick([`Quel point est sur la médiatrice de ${s} ?`, `Quel point appartient à la médiatrice de ${s} ?`])}`, data[0].n, ordre.filter((x) => x !== data[0].n), r);
  if (mode === "pasSur") return qc(`${intro}${lignes} ${pick([`Quel point n’est PAS sur la médiatrice de ${s} ?`, `Quel point est hors de la médiatrice de ${s} ?`])}`, data[2].n, ordre.filter((x) => x !== data[2].n), r);
  return nb(`${intro}${lignes} ${pick([`Combien de ces points sont sur la médiatrice de ${s} ?`, `Sur la médiatrice de ${s}, combien de ces points trouve-t-on ?`])}`, nbEg, `${r} Ici : ${nbEg}.`);
}
function genPropCercle(): Q {
  const [E, F, K] = lettres(3);
  const s = `[${E}${F}]`;
  const r = randomInt(3, 12);
  return pick([
    () => {
      const juste = `oui : ${K}${E} = ${K}${F}, ce sont deux rayons de même longueur`;
      return qc(`${pick([`Deux cercles de même rayon, de centres ${E} et ${F}, se coupent en ${K}.`, `Deux cercles de rayon ${r} cm ont pour centres ${E} et ${F}. Ils se coupent en ${K}.`])} ${K} est-il sur la médiatrice de ${s} ?`, juste, [`non : ${K} n’est pas sur ${s}`, `oui : ${K} est le milieu de ${s}`, "on ne peut pas savoir"], `${K} est sur les deux cercles : ${K}${E} et ${K}${F} sont deux rayons égaux, donc ${K} est sur la médiatrice de ${s}.`);
    },
    () => {
      const r2 = r + pick([1, 2, 3]);
      const juste = `non : ${K}${E} et ${K}${F} sont différentes`;
      return qc(`${pick([`Le cercle de centre ${E} a pour rayon ${r} cm, celui de centre ${F} a pour rayon ${r2} cm. Ils se coupent en ${K}.`, `Un cercle de centre ${E} et de rayon ${r} cm coupe en ${K} un cercle de centre ${F} et de rayon ${r2} cm.`])} ${K} est-il sur la médiatrice de ${s} ?`, juste, [`oui : ${K} est sur les deux cercles`, `oui : ${K} est le milieu de ${s}`, "on ne peut pas savoir"], `${K}${E} = ${r} cm et ${K}${F} = ${r2} cm : ${K} n’est pas à égale distance de ${E} et de ${F}.`);
    },
    () => qc(pick([`Un cercle de centre ${K} passe par ${E} et par ${F}. Où se trouve ${K} ?`, `${E} et ${F} sont sur un cercle de centre ${K}. Sur quelle droite est ${K} ?`]), `sur la médiatrice de ${s}`, [`sur la droite (${E}${F})`, `au milieu de ${s}`, `sur la perpendiculaire à ${s} en ${E}`], `${K}${E} et ${K}${F} sont deux rayons : ${K} est à égale distance de ${E} et de ${F}.`),
    () => lg(pick([`${E} et ${F} sont sur un cercle de centre ${K} et de rayon ${r} cm. Combien mesure ${K}${E} + ${K}${F} ?`, `Un cercle de centre ${K} et de rayon ${r} cm passe par ${E} et ${F}. Calcule ${K}${E} + ${K}${F}.`]), 2 * r, "cm", `${K}${E} et ${K}${F} sont deux rayons : ${r} + ${r} = ${2 * r} cm.`),
    () => ouiNon(pick([`${K} est sur la médiatrice de ${s}. Le cercle de centre ${K} passe par ${E}. Passe-t-il par ${F} ?`, `Un cercle de centre ${K} passe par ${E}, et ${K} est sur la médiatrice de ${s}. ${F} est-il sur ce cercle ?`]), true, `${K}${F} = ${K}${E} : ${F} est à la même distance de ${K} que ${E}, il est sur le cercle.`),
  ])();
}
function genPropArgument(): Q {
  const [E, F, K, G] = lettres(4);
  const s = `[${E}${F}]`;
  return pick([
    () => qc(pick([`Pour prouver que ${K} est sur la médiatrice de ${s}, que suffit-il de montrer ?`, `Quelle égalité prouve que ${K} est sur la médiatrice de ${s} ?`]), `${K}${E} = ${K}${F}`, [`${K}${E} + ${K}${F} = ${E}${F}`, `${K}${E} = ${E}${F}`, `${K}${F} = ${E}${F}`], `Un point à égale distance de ${E} et de ${F} est sur la médiatrice de ${s}.`),
    () => qc(pick([`Que faut-il mesurer pour savoir si ${K} est sur la médiatrice de ${s} ?`, `Sans tracer la médiatrice de ${s}, que mesurer pour savoir si ${K} y est ?`]), `les distances ${K}${E} et ${K}${F}`, [`la distance ${K}${E} seulement`, `la longueur ${E}${F} seulement`, `la longueur ${E}${F} et la distance ${K}${E}`], `Il suffit de comparer ${K}${E} et ${K}${F}.`),
    () => qc(pick([`${K} est sur la médiatrice de ${s} et aussi sur le segment ${s}. Que peut-on dire de ${K} ?`, `Le point ${K} est à la fois sur ${s} et sur sa médiatrice. Qui est ${K} ?`]), `${K} est le milieu de ${s}`, [`${K} est en ${E}`, `${K} est en ${F}`, "on ne peut rien dire"], `La médiatrice coupe ${s} en un seul point : son milieu.`),
    () => qc(pick([`${K} est sur la médiatrice de ${s} et sur celle de [${F}${G}]. Compare ${K}${E} et ${K}${G}.`, `${K} est sur les médiatrices de ${s} et de [${F}${G}]. Que peut-on dire de ${K}${E} et ${K}${G} ?`]), `${K}${E} = ${K}${G}`, [`${K}${E} > ${K}${G}`, `${K}${E} < ${K}${G}`, "on ne peut pas savoir"], `${K}${E} = ${K}${F} et ${K}${F} = ${K}${G}, donc ${K}${E} = ${K}${G}.`),
    () => qc(pick([`${K} et ${G} sont à égale distance de ${E} et de ${F}. Que représente (${K}${G}) ?`, `${K}${E} = ${K}${F} et ${G}${E} = ${G}${F}. Quelle est la droite (${K}${G}) ?`]), `la médiatrice de ${s}`, [`la parallèle à ${s} passant par ${K}`, `la droite (${E}${F})`, "une droite quelconque"], `${K} et ${G} sont sur la médiatrice de ${s} : par deux points, il ne passe qu’une droite.`),
  ])();
}

// ----- MEDIATRICE_CONSTRUIRE, ★2
function genConsOutils(): Q {
  const [E, F] = lettres(2);
  const s = `[${E}${F}]`;
  const RE = "la règle graduée";
  const EQ = "l’équerre";
  const pourquoi = `La règle graduée donne le milieu de ${s}, l’équerre donne l’angle droit, le compas garde le même écartement.`;
  return pick([
    () => qc(pick([`Règle graduée ou équerre : quel outil donne le milieu de ${s} ?`, `Pour le milieu de ${s}, prends-tu la règle graduée ou l’équerre ?`]), RE, [EQ], pourquoi),
    () => qc(pick([`Règle graduée ou équerre : quel outil donne l’angle droit ?`, `Pour l’angle droit, prends-tu la règle graduée ou l’équerre ?`]), EQ, [RE], pourquoi),
    () => qc(pick([`Pour mesurer ${E}${F}, quel outil prends-tu ?`, `Quel outil mesure la longueur ${E}${F} ?`]), RE, [EQ, "le compas", "le rapporteur"], pourquoi),
    () => qc(pick([`Quel outil garde le même écartement depuis ${E} et ${F} ?`, `Quel outil trace des arcs depuis ${E} et ${F} ?`]), "le compas", [RE, EQ, "le rapporteur"], pourquoi),
    () => qc(pick([`Sans compas, quels outils tracent la médiatrice de ${s} ?`, `Sans compas, avec quoi trace-t-on la médiatrice de ${s} ?`]), "la règle graduée et l’équerre", ["la règle graduée seule", "l’équerre seule", "le rapporteur seul"], pourquoi),
    () => qc(pick([`Au compas, combien de fois change-t-on l’écartement ?`, `Entre ${E} et ${F}, combien de fois change-t-on l’écartement ?`]), "jamais", ["une fois", "deux fois", "à chaque arc"], "On garde le même écartement : les points obtenus sont à égale distance des deux extrémités."),
  ])();
}
function genConsEtapes(): Q {
  const [E, F] = lettres(2);
  const s = `[${E}${F}]`;
  const r = `À l’équerre : le milieu d’abord, puis la perpendiculaire en ce point. Au compas : deux arcs de même écartement depuis ${E} et ${F}, puis on joint les deux points obtenus.`;
  return pick([
    () => qc(pick([`À l’équerre, que fait-on en premier pour la médiatrice de ${s} ?`, `Que marque-t-on d’abord pour tracer la médiatrice à l’équerre ?`]), `le milieu de ${s}`, [`un arc depuis ${E}`, `une parallèle à ${s}`, `le point ${E}`], r),
    () => qc(pick([`Le milieu de ${s} est marqué. Que trace-t-on à l’équerre ?`, `Le milieu de ${s} est placé. Que trace-t-on ensuite ?`]), `la perpendiculaire à ${s} en ce point`, [`la parallèle à ${s} en ce point`, `la perpendiculaire à ${s} en ${E}`, `un cercle de centre ${E}`], r),
    () => qc(pick([`Au compas, de quels points partent les arcs ?`, `Pour la médiatrice de ${s}, d’où partent les arcs ?`]), `de ${E} et de ${F}`, [`du milieu de ${s}`, `de ${E} seulement`, `de ${F} seulement`], r),
    () => qc(pick([`Les arcs se coupent en deux points. Que fait-on ensuite ?`, `Deux points sont trouvés au compas. Que fait-on ensuite ?`]), "on joint ces deux points", ["on efface ces deux points", "on change l’écartement", "on trace un cercle"], r),
    () => qc(pick([`Au compas, que garde-t-on identique depuis ${E} et ${F} ?`, `Que ne change-t-on pas entre l’arc de ${E} et celui de ${F} ?`]), "l’écartement", ["le centre de l’arc", "la position de la pointe"], r),
    () => qc(pick([`Au compas, combien de points faut-il pour tracer la médiatrice ?`, `Combien de points d’intersection faut-il pour tracer la médiatrice ?`]), "2", ["1", "3", "4"], `Par deux points, il passe une seule droite : la médiatrice de ${s}.`),
    () => qc(pick([`On joint les deux points d’intersection des arcs. Qu’obtient-on ?`, `Quelle droite joint les deux points d’intersection des arcs ?`]), `la médiatrice de ${s}`, [`une parallèle à ${s}`, `le segment ${s}`, `la perpendiculaire à ${s} en ${E}`], r),
  ])();
}
function genConsMilieuNombre(): Q {
  const [E, F] = lettres(2);
  const s = `[${E}${F}]`;
  const L = randomInt(4, 20);
  const donnee = pick([`${s} mesure ${L} cm.`, `Le segment ${s} mesure ${L} cm.`]);
  const X = pick([E, F]);
  if (Math.random() < 0.65)
    return lg(
      `${donnee} ${pick([`À quelle distance de ${X} poser l’équerre ?`, `À combien de ${X} est son milieu ?`, `Où poser l’équerre : à combien de ${X} ?`, `Son milieu est à combien de ${X} ?`])}`,
      L / 2, "cm", `L’équerre se pose au milieu : ${L} ÷ 2 = ${fr(L / 2)} cm.`,
    );
  const x = randomInt(2, 12);
  return lg(
    pick([`Le milieu de ${s} est à ${x} cm de ${X}. Combien mesure ${s} ?`, `L’équerre est posée au milieu de ${s}, à ${x} cm de ${X}. Calcule ${E}${F}.`, `Le milieu de ${s} est à ${x} cm de ${X}. Trouve ${E}${F}.`]),
    2 * x, "cm", `Le segment mesure deux fois ${x} cm : ${2 * x} cm.`,
  );
}
function genConsEcartement(): Q {
  const [E, F] = lettres(2);
  const s = `[${E}${F}]`;
  const L = randomInt(4, 16);
  const demi = L / 2;
  const donnee = pick([`${s} mesure ${L} cm.`, `${E}${F} = ${L} cm.`]);
  const grand = () => Math.floor(demi) + randomInt(1, 3);
  const petit = () => Math.max(1, Math.ceil(demi) - randomInt(1, 2));
  const r = `L’écartement doit dépasser la moitié de ${E}${F} : plus de ${L} ÷ 2 = ${fr(demi)} cm.`;
  return pick([
    () => {
      const ok = Math.random() < 0.5;
      const x = ok ? grand() : petit();
      return ouiNon(`${donnee} ${pick([`Un écartement de ${x} cm convient-il ?`, `Avec ${x} cm d’écartement, les arcs se coupent-ils ?`, `Peut-on tracer la médiatrice en ouvrant de ${x} cm ?`])}`, ok, r);
    },
    () => lg(`${donnee} ${pick(["L’écartement du compas doit dépasser combien ?", "L’écartement du compas doit être plus grand que combien ?", "Quelle longueur l’écartement du compas doit-il dépasser ?"])}`, demi, "cm", r),
    () => {
      const x = Math.max(1, Math.ceil(demi) - 1);
      const bons = [Math.floor(demi) + 1, Math.floor(demi) + 2, Math.floor(demi) + 3];
      return qc(`${donnee} ${pick(["Quel écartement est trop petit ?", "Quel écartement ne convient pas ?", "Avec quel écartement les arcs ne se coupent-ils pas ?"])}`, `${x} cm`, bons.map((b) => `${b} cm`), r);
    },
    () => {
      const cas = pick([{ t: "vaut la moitié de", n: 1 }, { t: "vaut moins que la moitié de", n: 0 }, { t: "vaut plus que la moitié de", n: 2 }]);
      return qc(`L’écartement ${cas.t} ${s}. ${pick(["Combien de points communs ont les arcs ?", "Les arcs se coupent combien de fois ?"])}`, String(cas.n), ["0", "1", "2", "3"].filter((x) => x !== String(cas.n)), r);
    },
  ])();
}
function genConsArcs(): Q {
  const [E, F, S, T] = lettres(4);
  const s = `[${E}${F}]`;
  const x = randomInt(4, 12);
  const canvas: DroitesCanvasData = {
    kind: "droites",
    size: { width: 340, height: 320 },
    lines: [{ id: "AB", type: "segment", from: A, to: B }],
    points: [
      { x: A.x, y: A.y, label: E },
      { x: B.x, y: B.y, label: F },
      { x: M.x, y: A.y - 105, label: S, color: "#7c3aed", highlight: true },
      { x: M.x, y: A.y + 105, label: T, color: "#7c3aed", highlight: true },
    ],
    display: { showLabels: true, showPoints: true },
  };
  const r = `${S} et ${T} sont à égale distance de ${E} et de ${F} : ils sont sur la médiatrice de ${s}.`;
  return pick([
    () => qc(pick([`Les arcs depuis ${E} et ${F} se coupent en ${S} et ${T}. Que représente (${S}${T}) ?`, `Les arcs de même écartement se coupent en ${S} et ${T}. Qu’est-ce que (${S}${T}) ?`]), `la médiatrice de ${s}`, [`une parallèle à ${s}`, `la perpendiculaire à ${s} en ${E}`, `le segment ${s}`], r, canvas),
    () => qc(pick([`Les arcs se coupent en ${S} et ${T}. Quelle droite faut-il tracer ?`, `Les arcs se coupent en ${S} et ${T}. Quelle droite est la médiatrice ?`]), `(${S}${T})`, [`(${E}${F})`, `(${E}${S})`, `(${F}${T})`], r, canvas),
    () => {
      const Y = pick([E, F]);
      return lg(`${pick([`Écartement de ${x} cm.`, `Compas ouvert de ${x} cm.`])} Les arcs se coupent en ${S}. ${pick([`Combien mesure ${S}${Y} ?`, `Trouve ${S}${Y}.`])}`, x, "cm", `${S} est sur les deux arcs : il est à ${x} cm de ${E} et de ${F}.`, canvas);
    },
    () => lg(`${pick([`Écartement de ${x} cm.`, `Compas ouvert de ${x} cm.`])} Les arcs se coupent en ${S}. Calcule ${S}${E} + ${S}${F}.`, 2 * x, "cm", `${S}${E} = ${S}${F} = ${x} cm : la somme vaut ${2 * x} cm.`, canvas),
    () => lg(pick([`Même écartement depuis ${E} et ${F}. ${S}${E} = ${x} cm. Combien mesure ${S}${F} ?`, `${S} est à ${x} cm de ${E}. Même écartement : à combien de ${F} est-il ?`]), x, "cm", `Le même écartement donne la même distance : ${S}${F} = ${S}${E} = ${x} cm.`, canvas),
  ])();
}

const gabarit = (microId: string, id: string, difficulty: number, hint: string, tag: string, generate: () => Q) =>
  ({ kind: "template", id, niveau: "6e", matiere: "maths", notionId: "mediatrice_segment", microId, difficulty, theme: "neutral", hint, tags: ["mediatrice_segment", tag, "template"], generate }) as TutorBankItemV4;

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
    text: "P est sur la médiatrice de [AB]. PA = 7 cm. Combien mesure PB ?",
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
    id: "mediatrice_propriete_tpl_distance_situation",
    niveau: "6e",
    matiere: "maths",
    notionId: "mediatrice_segment",
    microId: "mediatrice_propriete",
    difficulty: 3,
    theme: "neutral",
    hint: "Un point de la médiatrice est à la même distance des deux extrémités.",
    tags: ["mediatrice_segment", "propriete", "template", "situation"],
    // 03/11/2026 : les lieux de la vie (fontaine, antenne…) et les métiers montent à ★3.
    generate: () => genMedDistance(true),
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
    text: "Plie la feuille pour poser A sur B. Que représente le pli ?",
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

  // =========================
  // ⭐ 07/11/2026 — d'autres questions, pour que la phrase ne revienne plus
  // =========================
  gabarit("mediatrice_definition", "mediatrice_definition_tpl_vrai_faux", 1, "Deux conditions : perpendiculaire au segment, et passer par son milieu.", "definition", () => genDefVraiFaux()),
  gabarit("mediatrice_definition", "mediatrice_definition_tpl_completer", 1, "Pense à l’angle droit et au milieu.", "definition", () => genDefCompleter()),
  gabarit("mediatrice_definition", "mediatrice_definition_tpl_trois_droites", 1, "Cherche la marque d’angle droit, puis le milieu.", "definition", () => genDefTroisDroites()),
  gabarit("mediatrice_definition", "mediatrice_definition_tpl_nombre", 1, "La médiatrice coupe le segment en son milieu, à angle droit.", "definition", () => genDefNombre()),
  gabarit("mediatrice_definition", "mediatrice_definition_tpl_nom", 1, "Perpendiculaire + par le milieu : quel mot de ce chapitre ?", "definition", () => genDefNom()),
  gabarit("mediatrice_definition", "mediatrice_definition_tpl_lire_figure", 2, "Regarde la marque d’angle droit, puis le milieu.", "definition", () => genDefLireFigure()),
  gabarit("mediatrice_definition", "mediatrice_definition_tpl_mesures_courtes", 2, "Il faut 90° ET le milieu.", "definition", () => genDefMesuresCourtes()),
  gabarit("mediatrice_definition", "mediatrice_definition_tpl_nombre_k", 2, "La médiatrice coupe le segment en son milieu.", "definition", () => genDefNombreK()),
  gabarit("mediatrice_definition", "mediatrice_definition_tpl_combien", 2, "Un seul milieu, et une seule perpendiculaire en ce point.", "definition", () => genDefCombien()),
  gabarit("mediatrice_definition", "mediatrice_definition_tpl_manque", 2, "Vérifie les deux conditions, une par une.", "definition", () => genDefManque()),
  gabarit("mediatrice_definition", "mediatrice_definition_tpl_situation", 3, "Il faut 90° ET le milieu.", "definition", () => genDefSituation()),
  gabarit("mediatrice_definition", "mediatrice_definition_tpl_situation_calcul", 3, "La médiatrice coupe le segment en son milieu, à angle droit.", "definition", () => genDefSituationCalcul()),

  gabarit("mediatrice_propriete", "mediatrice_propriete_tpl_deduire", 2, "Sur la médiatrice, on est à égale distance des deux extrémités.", "propriete", () => genPropDeduire()),
  gabarit("mediatrice_propriete", "mediatrice_propriete_tpl_reciproque_courte", 2, "Compare les deux distances.", "propriete", () => genPropReciproqueCourte()),
  gabarit("mediatrice_propriete", "mediatrice_propriete_tpl_figure", 2, "Un point de (d) est à égale distance des deux extrémités.", "propriete", () => genPropFigure()),
  gabarit("mediatrice_propriete", "mediatrice_propriete_tpl_somme_triangle", 2, "Les deux distances sont égales.", "propriete", () => genPropSommeTriangle()),
  gabarit("mediatrice_propriete", "mediatrice_propriete_tpl_vrai_faux", 2, "Être sur la médiatrice, c’est être à égale distance. Pas forcément au milieu.", "propriete", () => genPropVraiFaux()),
  gabarit("mediatrice_propriete", "mediatrice_propriete_tpl_perimetre", 5, "Remplace une distance par l’autre : elles sont égales.", "propriete", () => genPropPerimetre()),
  gabarit("mediatrice_propriete", "mediatrice_propriete_tpl_cote", 5, "Compare les deux distances : le point est du côté de la plus petite.", "propriete", () => genPropCote()),
  gabarit("mediatrice_propriete", "mediatrice_propriete_tpl_tableau", 5, "Pour chaque point, compare ses deux distances.", "propriete", () => genPropTableau()),
  gabarit("mediatrice_propriete", "mediatrice_propriete_tpl_cercle", 5, "Deux rayons d’un même cercle ont la même longueur.", "propriete", () => genPropCercle()),
  gabarit("mediatrice_propriete", "mediatrice_propriete_tpl_argument", 5, "Traduis « sur la médiatrice » par une égalité de longueurs.", "propriete", () => genPropArgument()),

  gabarit("mediatrice_construire", "mediatrice_construire_tpl_outils", 2, "Règle graduée : le milieu. Équerre : l’angle droit. Compas : l’écartement.", "construire", () => genConsOutils()),
  gabarit("mediatrice_construire", "mediatrice_construire_tpl_etapes", 2, "Les deux conditions se construisent l’une après l’autre.", "construire", () => genConsEtapes()),
  gabarit("mediatrice_construire", "mediatrice_construire_tpl_milieu_nombre", 2, "L’équerre se pose au milieu du segment.", "construire", () => genConsMilieuNombre()),
  gabarit("mediatrice_construire", "mediatrice_construire_tpl_ecartement", 2, "L’écartement doit dépasser la moitié du segment.", "construire", () => genConsEcartement()),
  gabarit("mediatrice_construire", "mediatrice_construire_tpl_arcs", 2, "Le même écartement donne la même distance.", "construire", () => genConsArcs()),
];
