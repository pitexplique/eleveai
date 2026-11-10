// ─── La bissectrice d'un angle (6e) ────────────────────────────────────────────
//
// ⛔ POURQUOI CETTE BANQUE EXISTE (22/08/2026). « Bissectrice d'un angle
// saillant » est une section entière du chapitre « Étude de configurations
// planes » du programme de 6e, et le coach n'en avait AUCUNE micro. Le canvas
// `angle` savait pourtant déjà poser un rapporteur sur une figure et mettre en
// avant chaque geste de la mesure.
//
// Les objectifs, mot pour mot (Exemples pour la mise en œuvre des programmes,
// 6e, 2025, p. 14) :
//   · « Connaître la définition de la bissectrice d'un angle saillant » ;
//   · « Utiliser la définition de la bissectrice d'un angle pour effectuer des
//     constructions et résoudre des problèmes ».
//
// Et les exemples de réussite :
//   « La bissectrice d'un angle saillant est définie comme la droite qui
//   partage cet angle en deux angles adjacents égaux. » · « L'élève observe,
//   puis admet, que la bissectrice d'un angle est l'axe de symétrie de cet
//   angle. » · « L'élève construit la bissectrice d'un angle par pliage, puis à
//   l'aide d'un rapporteur. » · « L'élève élabore un programme de construction
//   permettant à un camarade de reproduire la figure. »
//
// ⭐ LA BISSECTRICE EST À L'ANGLE CE QUE LA MÉDIATRICE EST AU SEGMENT : la
// droite qui le coupe en deux parts égales, et son axe de symétrie. Les deux
// notions se construisent au compas de la même façon, et se plient de la même
// façon. Plusieurs items le disent explicitement — un élève qui voit le
// parallèle retient les deux au lieu d'une.
//
// ⚠️ « SAILLANT » N'EST PAS UN DÉTAIL. Deux demi-droites de même origine
// définissent DEUX angles : le saillant (le plus petit, celui qu'on dessine) et
// le rentrant. Le programme se limite au saillant, et le mot est dans
// l'intitulé même de l'objectif.

import type { TutorBankItemV4, DroitesCanvasData, AngleCanvasData, TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { PRENOMS, type Prenom } from "./entiers.bank";
import { melangeEnPlace } from "@/lib/tutor-v4/questionBank/melange";

function shuffle<T>(arr: T[]): T[] {
  return melangeEnPlace([...arr]);
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function expl(calcul: string) {
  return (
    "Définition : la bissectrice d'un angle saillant est la droite qui le partage en deux angles adjacents égaux.\n\n" +
    "Méthode : on mesure l'angle et on prend sa moitié, ou on plie de façon à amener un côté sur l'autre.\n\n" +
    "Calcul : " +
    calcul +
    "\n\nConclusion : on garde la réponse obtenue."
  );
}

/** Un angle seul, avec sa mesure — le point de départ avant de le partager. */
function angleSeul(deg: number, mesure?: string, noms?: { s: string; u: string; v: string }): AngleCanvasData {
  return {
    kind: "angle",
    size: { width: 300, height: 240 },
    angle: {
      angleDeg: deg,
      labels: { vertex: noms?.s ?? "O", left: noms?.u ?? "A", right: noms?.v ?? "B", angle: mesure },
      display: { showLabels: true, showMeasure: Boolean(mesure), showArc: true },
    },
  };
}

/**
 * L'angle AOB et sa bissectrice [OC) : trois demi-droites de même origine.
 * Le canvas `angle` ne sait dessiner qu'un angle ; `droites` sait poser
 * plusieurs demi-droites au même point, et c'est ce qu'il faut ici.
 */
function angleEtBissectrice(
  deg: number,
  opts: { bissectriceJuste?: boolean; partage?: number; noms?: { s: string; u: string; v: string; w: string } } = {},
): DroitesCanvasData {
  // ⛔ 07/11/2026 : au-delà de 110°, le côté [OA) sortait à gauche du dessin (son
  // point et sa lettre disparaissaient) : le sommet se décale, la figure s'élargit.
  const L = 175;
  const O = { x: Math.max(60, Math.round(30 - L * Math.cos((deg * Math.PI) / 180))), y: 225 };
  // `partage` : l'angle, en degrés, entre le côté [OB) et la demi-droite [OC).
  const partage = opts.partage ?? (opts.bissectriceJuste === false ? deg * 0.3 : deg / 2);
  const n = opts.noms ?? { s: "O", u: "A", v: "B", w: "C" };
  const rad = (d: number) => (d * Math.PI) / 180;
  const bout = (d: number) => ({
    x: O.x + L * Math.cos(rad(d)),
    y: O.y - L * Math.sin(rad(d)),
  });
  const A = bout(deg);
  const B = bout(0);
  const C = bout(partage);
  return {
    kind: "droites",
    size: { width: Math.max(320, O.x + L + 45), height: 265 },
    lines: [
      { id: "OA", type: "demi_droite", from: O, to: A },
      { id: "OB", type: "demi_droite", from: O, to: B },
      {
        id: "OC",
        type: "demi_droite",
        from: O,
        to: C,
        color: "#2563eb",
        dashed: true,
      },
    ],
    points: [
      { x: O.x, y: O.y, label: n.s, highlight: true },
      { x: A.x, y: A.y, label: n.u },
      { x: B.x, y: B.y, label: n.v },
      { x: C.x, y: C.y, label: n.w, color: "#2563eb" },
    ],
    display: { showLabels: true, showPoints: true },
  };
}

// =====================================================================
// ⭐ 06/10/2026 — DES SITUATIONS, PAS UNE PHRASE (PASSATION-COACH-MATHS-6E-CONSIGNE.md).
// Mesuré le 05/10 : 5 à 9 squelettes par micro, 14 à 18 répétitions sur 20 —
// l'angle s'appelait toujours AOB. Les gabarits tirent maintenant les noms
// des points, un angle de la vie (éventail, ciseaux, coin de jardin…), une
// tournure et un prénom ; les figures portent les noms et les mesures de
// l'énoncé. Les « Explique… » à mots-clés (« 180 » validait n'importe quelle
// réponse contenant ce nombre) sont devenus des QCM sur les mêmes pièges.
// Correcteurs : correcteurs/bissectrice.ts.
// =====================================================================
type Q = TutorGeneratedQuestionV4;
const pick = <T,>(arr: readonly T[]): T => arr[Math.floor(Math.random() * arr.length)];
const fr = (n: number) => String(Math.round(n * 100) / 100).replace(".", ",");
const prenom = (): Prenom => pick(PRENOMS);
const il = (P: Prenom) => (P.f ? "elle" : "il");
const LETTRES = "ABCDEFGHIJKLMNPRSTUVWXYZ".split("");
/** Les noms d'un angle USV (sommet S) et de sa bissectrice [SW). */
function nomsAngle() {
  const [s, u, v, w] = shuffle(LETTRES).slice(0, 4);
  return { s, u, v, w, nom: `${u}${s}${v}` };
}
/** Des angles de la vie, avec leurs mesures plausibles (en degrés). */
type AngleReel = { nom: string; min: number; max: number };
// 07/11/2026 : quatre mots au plus, pour tenir les 25 mots de ★3.
const ANGLES_REELS: AngleReel[] = [
  { nom: "l’ouverture d’un éventail", min: 90, max: 170 },
  { nom: "l’ouverture des ciseaux", min: 20, max: 70 },
  { nom: "l’ouverture d’un compas", min: 20, max: 90 },
  { nom: "le coin d’un jardin", min: 60, max: 130 },
  { nom: "le croisement de deux routes", min: 30, max: 150 },
  { nom: "l’ouverture d’une porte", min: 30, max: 120 },
  { nom: "une part de tarte", min: 30, max: 72 },
  { nom: "l’ouverture d’un livre", min: 60, max: 160 },
  { nom: "l’écart entre deux branches", min: 25, max: 80 },
  { nom: "le faisceau d’un phare", min: 20, max: 60 },
  { nom: "la pente d’une rampe", min: 20, max: 60 },
  { nom: "l’ouverture des bras", min: 60, max: 170 },
  { nom: "l’écart entre deux aiguilles", min: 30, max: 150 },
  { nom: "le coin d’une voile", min: 30, max: 90 },
];
const angleReel = () => pick(ANGLES_REELS);
/** Une mesure d'angle entière dans [min, max] ; `pair` pour une moitié entière. */
function mesureDe(a: AngleReel, pair = false) {
  const x = randomInt(a.min, a.max);
  return pair && x % 2 ? x + 1 : x;
}
/** La phrase qui pose l'angle USV dans sa situation. */
function introAngle(n: ReturnType<typeof nomsAngle>, a: AngleReel, mesure: number, P: Prenom) {
  return pick([
    `${P.nom} mesure ${a.nom} : l’angle ${n.nom} mesure ${fr(mesure)}°.`,
    `Ici, l’angle ${n.nom}, qui mesure ${fr(mesure)}°, représente ${a.nom}.`,
    `L’angle ${n.nom} représente ${a.nom}. Il mesure ${fr(mesure)}°.`,
    `${P.nom} dessine ${a.nom} : un angle ${n.nom} de ${fr(mesure)}°.`,
  ]);
}

// ----- BISSECTRICE_DEFINITION
// ⛔ 03/11/2026 — ★1-★2 = questions SIMPLES (Frédéric : « le contexte est
// réservé aux trois étoiles ») : ni prénom, ni éventail, ni ciseaux ; un angle
// nommé, sa mesure, une phrase courte. Les situations restent à ★3 et plus.
function genBisConnaitre(): Q {
  const n = nomsAngle();
  const mode = pick(["definition", "symetrie", "unique"] as const);
  // ★1 : 12 mots au plus (REGLES-6E.md) — une intro de 3 mots au plus.
  const intro = pick([`Voici l’angle ${n.nom}.`, `Soit l’angle ${n.nom}.`, `Regarde l’angle ${n.nom}.`, ""]);
  if (mode === "definition") {
    const juste = `la droite qui partage l’angle ${n.nom} en deux angles égaux`;
    return {
      text: `${intro}${intro ? " " : ""}${pick([`Qu’est-ce que la bissectrice de l’angle ${n.nom} ?`, `Donne la définition de la bissectrice de l’angle ${n.nom}.`])}`,
      format: "qcm",
      choices: shuffle([juste, `la droite qui passe par le sommet ${n.s}`, `la droite perpendiculaire au côté [${n.s}${n.u})`, `le segment [${n.u}${n.v}]`]),
      expected: [juste],
      comparator: "mcq_exact",
      explanation: expl(`La bissectrice partage l’angle ${n.nom} en DEUX ANGLES ÉGAUX, côte à côte. Passer par le sommet ${n.s} ne suffit pas : une infinité de droites le font.`),
    };
  }
  if (mode === "symetrie") {
    const juste = "son axe de symétrie";
    return {
      text: `${intro}${intro ? " " : ""}${pick([`Que représente aussi la bissectrice de l’angle ${n.nom} ?`, `La bissectrice de l’angle ${n.nom} est aussi…`])}`,
      format: "qcm",
      choices: shuffle([juste, "un de ses côtés", "la perpendiculaire à un côté", `la médiatrice de [${n.u}${n.v}], toujours`]),
      expected: [juste],
      comparator: "mcq_exact",
      explanation: expl(`En pliant le long de la bissectrice, le côté [${n.s}${n.u}) vient sur le côté [${n.s}${n.v}) : c’est l’axe de symétrie de l’angle.`),
    };
  }
  const juste = "une seule";
  return {
    text: `${intro}${intro ? " " : ""}${pick([`Combien de bissectrices l’angle ${n.nom} a-t-il ?`, `L’angle ${n.nom} a combien de bissectrices ?`])}`,
    format: "qcm",
    choices: shuffle([juste, "deux", "une infinité", "aucune"]),
    expected: [juste],
    comparator: "mcq_exact",
    explanation: expl("Une seule demi-droite partage l’angle en deux parts égales : si on la tourne un peu, une part grandit et l’autre rétrécit."),
  };
}
/** La phrase qui pose l'angle USV, SANS situation (★1-★2). */
function introAngleSimple(n: ReturnType<typeof nomsAngle>, mesure: number) {
  // 7 mots au plus : l'énoncé ★2 entier tient en 15 mots (REGLES-6E.md).
  return pick([
    `L’angle ${n.nom} mesure ${fr(mesure)}°.`,
    `Voici un angle ${n.nom} de ${fr(mesure)}°.`,
    `Soit un angle ${n.nom} de ${fr(mesure)}°.`,
    `On trace un angle ${n.nom} de ${fr(mesure)}°.`,
  ]);
}
function genBisMoitie(): Q {
  const n = nomsAngle();
  const m = randomInt(20, 170);
  const moitie = m / 2;
  return {
    text: `${introAngleSimple(n, m)} ${pick([
      `[${n.s}${n.w}) est sa bissectrice. Combien mesure l’angle ${n.w}${n.s}${n.v} ?`,
      `[${n.s}${n.w}) est sa bissectrice. Calcule l’angle ${n.u}${n.s}${n.w}.`,
      `Sa bissectrice est [${n.s}${n.w}). Calcule l’angle ${n.u}${n.s}${n.w}.`,
      `Sa bissectrice est [${n.s}${n.w}). Combien mesure l’angle ${n.w}${n.s}${n.v} ?`,
      `Trace sa bissectrice [${n.s}${n.w}). Calcule l’angle ${n.w}${n.s}${n.v}.`,
      `Trace sa bissectrice [${n.s}${n.w}). Combien mesure l’angle ${n.u}${n.s}${n.w} ?`,
    ])}`,
    format: "short",
    expected: [`${fr(moitie)}°`],
    comparator: "number_equal",
    explanation: expl(`La bissectrice partage l’angle en deux angles égaux : ${fr(m)} ÷ 2 = ${fr(moitie)}°.`),
    canvas: angleSeul(m, `${fr(m)}°`, { s: n.s, u: n.u, v: n.v }),
  };
}
/** ★3 (03/11/2026) : la même moitié, posée dans un angle de la vie. */
function genBisMoitieSituation(): Q {
  const n = nomsAngle();
  const P = prenom();
  const a = angleReel();
  const m = mesureDe(a);
  const moitie = m / 2;
  return {
    text: `${introAngle(n, a, m, P)} ${pick([
      `La bissectrice [${n.s}${n.w}) le partage en deux angles égaux. Combien mesure chacun ?`,
      `Combien mesure l’angle ${n.u}${n.s}${n.w}, si [${n.s}${n.w}) est la bissectrice ?`,
      `${P.nom} trace sa bissectrice [${n.s}${n.w}). Combien mesure l’angle ${n.w}${n.s}${n.v} ?`,
    ])}`,
    format: "short",
    expected: [`${fr(moitie)}°`],
    comparator: "number_equal",
    explanation: expl(`La bissectrice partage l’angle en deux angles égaux : ${fr(m)} ÷ 2 = ${fr(moitie)}°.`),
    canvas: angleSeul(m, `${fr(m)}°`, { s: n.s, u: n.u, v: n.v }),
  };
}
function genBisFigure(): Q {
  const n = nomsAngle();
  const P = prenom();
  const a = angleReel();
  const m = mesureDe(a, true);
  const juste = Math.random() < 0.5;
  const ecart = Math.min(pick([6, 8, 10, 12, 14]), m / 2 - 5);
  const p1 = juste ? m / 2 : m / 2 + (Math.random() < 0.5 ? ecart : -ecart);
  const p2 = m - p1;
  const c = {
    oui: `oui : les angles ${n.u}${n.s}${n.w} et ${n.w}${n.s}${n.v} sont égaux`,
    non: `non : les angles ${n.u}${n.s}${n.w} et ${n.w}${n.s}${n.v} ne sont pas égaux`,
    sommet: `oui : elle passe par le sommet ${n.s}`,
    quarante: "non : une bissectrice fait toujours 45°",
  };
  return {
    text: `${introAngle(n, a, m, P)} L’angle ${n.u}${n.s}${n.w} mesure ${fr(p2)}° et l’angle ${n.w}${n.s}${n.v} mesure ${fr(p1)}°. [${n.s}${n.w}) est-elle la bissectrice ?`,
    format: "qcm",
    choices: shuffle(Object.values(c)),
    expected: [juste ? c.oui : c.non],
    comparator: "mcq_exact",
    explanation: expl(juste ? `${fr(p2)}° et ${fr(p1)}° : les deux angles sont égaux, [${n.s}${n.w}) est la bissectrice.` : `${fr(p2)}° et ${fr(p1)}° : les deux parts sont différentes. Passer par le sommet ne suffit pas, ce n’est pas la bissectrice.`),
    canvas: angleEtBissectrice(m, { partage: p1, noms: n }),
  };
}
function genBisRaisons(): Q {
  const n = nomsAngle();
  const P = prenom();
  const cas = pick([
    {
      q: `${P.nom} dit : « Ma demi-droite part du sommet ${n.s}, donc c’est la bissectrice de l’angle ${n.nom}. » A-t-${il(P)} raison ?`,
      juste: "non : il faut aussi qu’elle partage l’angle en deux angles égaux",
      faux: ["oui : partir du sommet suffit", "oui, si elle est à l’intérieur de l’angle", "non : une bissectrice ne part jamais du sommet"],
      r: "Une infinité de demi-droites partent du sommet. Une seule partage l’angle en deux angles égaux : c’est la bissectrice.",
    },
    {
      q: `En quoi la bissectrice de l’angle ${n.nom} ressemble-t-elle à la médiatrice d’un segment ?`,
      juste: "les deux partagent en deux parts égales et sont des axes de symétrie",
      faux: ["les deux sont perpendiculaires à un côté", "les deux passent par un sommet", "elles ne se ressemblent pas du tout"],
      r: "La médiatrice partage un segment en deux longueurs égales, la bissectrice partage un angle en deux angles égaux ; toutes deux sont des axes de symétrie et s’obtiennent par pliage.",
    },
    {
      q: `Pourquoi précise-t-on « angle saillant » quand on parle de la bissectrice de l’angle ${n.nom} ?`,
      juste: "deux demi-droites forment deux angles : on partage le plus petit",
      faux: ["parce que l’angle dépasse de la figure", "parce que l’angle mesure plus de 180°", "ce mot ne sert à rien"],
      r: "Deux demi-droites de même origine forment deux angles : le saillant, plus petit que 180°, et le rentrant. En 6e, on partage le saillant.",
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

// ----- BISSECTRICE_CONSTRUIRE
function genBisRapporteurQcm(): Q {
  const n = nomsAngle();
  if (Math.random() < 0.3) {
    const juste = `la bissectrice de l’angle ${n.nom}`;
    return {
      // 03/11/2026 : ★2, sans personnage.
      text: `On plie la feuille : [${n.s}${n.u}) ${pick(["va", "vient", "arrive"])} sur [${n.s}${n.v}). ${pick(["Que représente le pli ?", "Que trace le pli ?"])}`,
      format: "qcm",
      choices: shuffle([juste, `la médiatrice de [${n.u}${n.v}]`, `la perpendiculaire à [${n.s}${n.u})`, `un nouveau côté de l’angle`]),
      expected: [juste],
      comparator: "mcq_exact",
      explanation: expl("Le pli amène un côté sur l’autre : les deux parts de l’angle se superposent, elles sont égales. Le pli est la bissectrice."),
    };
  }
  const m = randomInt(20, 170);
  const moitie = m / 2;
  const pieges = [45, m, Math.min(180, 2 * m), moitie + 10, moitie - 10, 90].filter((x) => x > 0 && x <= 180 && x !== moitie);
  return {
    text: `${introAngleSimple(n, m)} ${pick([
      "Quelle graduation viser pour sa bissectrice ?",
      "À quelle graduation marquer sa bissectrice ?",
      "Quelle graduation marquer pour la bissectrice ?",
      "Où marquer sa bissectrice au rapporteur ?",
    ])}`,
    format: "qcm",
    choices: shuffle([`${fr(moitie)}°`, ...shuffle([...new Set(pieges)]).slice(0, 3).map((x) => `${fr(x)}°`)]),
    expected: [`${fr(moitie)}°`],
    comparator: "mcq_exact",
    explanation: expl(`La bissectrice est à la moitié de l’angle, en partant du côté où est le zéro : ${fr(m)} ÷ 2 = ${fr(moitie)}°.`),
    canvas: angleSeul(m, `${fr(m)}°`, { s: n.s, u: n.u, v: n.v }),
  };
}
function genBisGraduation(): Q {
  const n = nomsAngle();
  const P = prenom();
  const a = angleReel();
  const m = mesureDe(a);
  const moitie = m / 2;
  return {
    text: `${introAngle(n, a, m, P)} ${pick([
      `À quelle graduation marquer un point pour sa bissectrice ?`,
      `Pour la bissectrice, ${P.nom} pose le zéro sur [${n.s}${n.v}). Quelle graduation marque-t-${il(P)} ?`,
    ])}`,
    format: "short",
    expected: [`${fr(moitie)}°`],
    comparator: "number_equal",
    explanation: expl(`${fr(m)} ÷ 2 = ${fr(moitie)}. On aligne le zéro du rapporteur sur un côté, le centre sur le sommet, et on marque la graduation ${fr(moitie)}°.`),
    canvas: angleSeul(m, `${fr(m)}°`, { s: n.s, u: n.u, v: n.v }),
  };
}
function genBisConstruireRaisons(): Q {
  const n = nomsAngle();
  const P = prenom();
  const mode = pick(["quarante", "quarante", "etapes", "pliage"] as const);
  if (mode === "quarante") {
    let m = randomInt(50, 170);
    if (m === 90) m = 100;
    const autre = m - 45;
    const juste = `les deux parts font 45° et ${autre}° : ce n’est pas la bissectrice`;
    return {
      text: `L’angle ${n.nom} mesure ${m}°. Pour le partager en deux, ${P.nom} trace une demi-droite à 45° du côté [${n.s}${n.v}). Que se passe-t-il ?`,
      format: "qcm",
      choices: shuffle([juste, "c’est juste : 45° est toujours la bonne mesure", "les deux parts font 45° chacune", "l’angle devient un angle droit"]),
      expected: [juste],
      comparator: "mcq_exact",
      explanation: expl(`De l’autre côté, il reste ${m} − 45 = ${autre}° : les deux parts sont différentes. La bonne mesure était ${m} ÷ 2 = ${fr(m / 2)}°. 45° ne convient que pour un angle droit.`),
    };
  }
  if (mode === "etapes") {
    const juste = "mesurer l’angle, diviser par 2, puis marquer cette graduation";
    return {
      text: `${P.nom} écrit le programme pour tracer au rapporteur la bissectrice de l’angle ${n.nom}. Quel est le bon ordre ?`,
      format: "qcm",
      choices: shuffle([juste, "marquer 45°, puis mesurer l’angle", "diviser par 2, puis mesurer l’angle", "mesurer l’angle, multiplier par 2, puis marquer"]),
      expected: [juste],
      comparator: "mcq_exact",
      explanation: expl("On mesure d’abord l’angle, on calcule sa moitié, puis on marque cette graduation en partant d’un côté, et on trace la demi-droite depuis le sommet."),
    };
  }
  const juste = "les deux parts se superposent : elles sont égales";
  return {
    text: `${P.nom} trouve la bissectrice de l’angle ${n.nom} par pliage, sans rien mesurer. Pourquoi est-ce juste ?`,
    format: "qcm",
    choices: shuffle([juste, "le pli fait toujours 45°", "le pli passe par le milieu de [" + [n.u, n.v].sort().join("") + "]", "parce que la feuille est carrée"]),
    expected: [juste],
    comparator: "mcq_exact",
    explanation: expl(`En amenant [${n.s}${n.u}) sur [${n.s}${n.v}), les deux parts de l’angle se superposent : elles sont égales, quelle que soit la mesure de l’angle.`),
  };
}

// ----- BISSECTRICE_PROBLEME
function genBisDoubleMoitie(): Q {
  const n = nomsAngle();
  const P = prenom();
  const a = angleReel();
  const m = mesureDe(a);
  const moitie = m / 2;
  const canvas = angleEtBissectrice(m, { noms: n });
  if (Math.random() < 0.5) {
    return {
      text: `${P.nom} trace [${n.s}${n.w}), bissectrice de l’angle ${n.nom}, qui représente ${a.nom}. L’angle ${n.u}${n.s}${n.w} mesure ${fr(moitie)}°. ${pick([`Combien mesure l’angle ${n.nom} ?`, `Quelle est la mesure de l’angle ${n.nom} ?`])}`,
      format: "short",
      expected: [`${fr(m)}°`],
      comparator: "number_equal",
      explanation: expl(`Les angles ${n.u}${n.s}${n.w} et ${n.w}${n.s}${n.v} sont égaux, donc l’angle ${n.nom} vaut ${fr(moitie)} + ${fr(moitie)} = ${fr(m)}°.`),
      canvas,
    };
  }
  return {
    text: `${introAngle(n, a, m, P)} [${n.s}${n.w}) est sa bissectrice. ${pick([`Combien mesure l’angle ${n.w}${n.s}${n.v} ?`, `Calcule l’angle ${n.u}${n.s}${n.w}.`])}`,
    format: "short",
    expected: [`${fr(moitie)}°`],
    comparator: "number_equal",
    explanation: expl(`${fr(m)} ÷ 2 = ${fr(moitie)}°.`),
    canvas,
  };
}
function genBisProblemes(): Q {
  const P = prenom();
  const [E, F, G] = shuffle(LETTRES).slice(0, 3);
  const mode = pick(["plat", "equilateral", "isocele", "triangle", "droit"] as const);
  if (mode === "plat")
    return {
      text: `${P.nom} trace la bissectrice d’un angle plat ${E}${F}${G}. Combien mesure chacun des deux angles obtenus ?`,
      format: "short",
      expected: ["90°"],
      comparator: "number_equal",
      explanation: expl("Un angle plat mesure 180°. Sa bissectrice le partage en deux angles de 180 ÷ 2 = 90° : elle est perpendiculaire aux deux côtés."),
    };
  if (mode === "droit")
    return {
      text: `${P.nom} trace la bissectrice de l’angle droit ${E}${F}${G}. Combien mesure chacun des deux angles obtenus ?`,
      format: "short",
      expected: ["45°"],
      comparator: "number_equal",
      explanation: expl("Un angle droit mesure 90°. Sa bissectrice forme deux angles de 90 ÷ 2 = 45°."),
    };
  if (mode === "equilateral")
    return {
      text: `Le triangle ${E}${F}${G} est équilatéral. ${P.nom} trace la bissectrice de l’angle en ${E}. Combien mesurent les deux angles obtenus ?`,
      format: "short",
      expected: ["30°"],
      comparator: "number_equal",
      explanation: expl("Chaque angle d’un triangle équilatéral mesure 180 ÷ 3 = 60°. La bissectrice le partage en deux : 60 ÷ 2 = 30°."),
    };
  if (mode === "isocele") {
    const base = randomInt(20, 80);
    const sommet = 180 - 2 * base;
    return {
      text: `Le triangle ${E}${F}${G} est isocèle en ${E}, et ses angles à la base mesurent ${base}°. ${P.nom} trace la bissectrice de l’angle en ${E}. Combien mesure chacun des deux angles obtenus ?`,
      format: "short",
      expected: [`${fr(sommet / 2)}°`],
      comparator: "number_equal",
      explanation: expl(`L’angle en ${E} mesure 180 − ${base} − ${base} = ${sommet}°. Sa bissectrice le partage en deux : ${sommet} ÷ 2 = ${fr(sommet / 2)}°.`),
    };
  }
  const x = randomInt(30, 80);
  const y = randomInt(30, 80);
  const z = 180 - x - y;
  return {
    text: `Dans le triangle ${E}${F}${G}, l’angle en ${E} mesure ${x}° et l’angle en ${F} mesure ${y}°. ${P.nom} trace la bissectrice de l’angle en ${G}. Combien mesure chacun des deux angles obtenus ?`,
    format: "short",
    expected: [`${fr(z / 2)}°`],
    comparator: "number_equal",
    explanation: expl(`L’angle en ${G} mesure 180 − ${x} − ${y} = ${z}°. Sa bissectrice le partage en deux : ${z} ÷ 2 = ${fr(z / 2)}°.`),
  };
}

// ----- BISSECTRICE_DEFI
function genBisQuart(): Q {
  const n = nomsAngle();
  const P = prenom();
  const a = angleReel();
  const m = mesureDe(a);
  const quart = m / 4;
  return {
    text: `${introAngle(n, a, m, P)} ${P.nom} trace sa bissectrice, puis la bissectrice de l’une des deux moitiés. ${pick(["Combien mesure le plus petit angle obtenu ?", "Quelle est la mesure du plus petit angle ?"])}`,
    format: "short",
    expected: [`${fr(quart)}°`],
    comparator: "number_equal",
    explanation: expl(`Première bissectrice : ${fr(m)} ÷ 2 = ${fr(m / 2)}°. Seconde : ${fr(m / 2)} ÷ 2 = ${fr(quart)}°.`),
    canvas: angleSeul(m, `${fr(m)}°`, { s: n.s, u: n.u, v: n.v }),
  };
}
function genBisDefiRaisons(): Q {
  const n = nomsAngle();
  const P = prenom();
  const mode = pick(["tourner", "entiers", "medtriatrice"] as const);
  if (mode === "tourner") {
    const m = 2 * randomInt(20, 85);
    const d = pick([1, 2, 3, 5]);
    const juste = `${m / 2 + d}° et ${m / 2 - d}° : ce n’est plus la bissectrice`;
    return {
      text: `L’angle ${n.nom} mesure ${m}°, et [${n.s}${n.w}) est sa bissectrice. ${P.nom} tourne [${n.s}${n.w}) de ${d}° vers [${n.s}${n.u}). Que deviennent les deux angles ?`,
      format: "qcm",
      choices: shuffle([juste, `${m / 2}° et ${m / 2}° : rien ne change`, `${m / 2 + d}° et ${m / 2 + d}°`, `${m / 2 - d}° et ${m / 2 - d}°`]),
      expected: [juste],
      comparator: "mcq_exact",
      explanation: expl(`L’angle ${n.w}${n.s}${n.v} gagne ${d}° et l’angle ${n.u}${n.s}${n.w} perd ${d}° : ${m / 2 + d}° et ${m / 2 - d}°. Une seule position partage l’angle en deux parts égales : la bissectrice est unique.`),
    };
  }
  if (mode === "entiers") {
    // Des angles dont la 3e moitié n'est plus entière (90 → 45 → 22,5 → 11,25).
    const m = pick([90, 60, 100, 140, 180, 20, 36, 44, 52, 76, 84]);
    const suite = [m / 2, m / 4, m / 8];
    const juste = `non : ${fr(m)}°, puis ${suite.map((x) => `${fr(x)}°`).join(", puis ")}`;
    return {
      text: `${P.nom} part d’un angle de ${m}° et trace des bissectrices de plus en plus petites. ${P.nom} affirme qu’on tombe toujours sur un nombre entier de degrés. A-t-${il(P)} raison ?`,
      format: "qcm",
      choices: shuffle([juste, "oui : une moitié de nombre entier est toujours entière", "oui, si on s’arrête à deux bissectrices", "non : on finit par tomber sur des nombres négatifs"]),
      expected: [juste],
      comparator: "mcq_exact",
      explanation: expl(`On divise par 2 à chaque fois : ${[m, ...suite].map((x) => `${fr(x)}°`).join(" → ")}. Un nombre décimal apparaît vite : une mesure d’angle n’est pas forcément entière.`),
    };
  }
  const juste = "on partage une longueur pour l’une, un angle pour l’autre";
  return {
    text: `${P.nom} compare la bissectrice de l’angle ${n.nom} et la médiatrice du segment [${[n.u, n.v].sort().join("")}]. Qu’est-ce qui change entre les deux ?`,
    format: "qcm",
    choices: shuffle([juste, "l’une est un axe de symétrie, l’autre non", "l’une s’obtient par pliage, l’autre jamais", "rien ne change, c’est la même droite"]),
    expected: [juste],
    comparator: "mcq_exact",
    explanation: expl("Toutes deux partagent en deux parts égales, sont des axes de symétrie et s’obtiennent par pliage. Ce qui change, c’est ce qu’on partage : une LONGUEUR pour la médiatrice, une MESURE D’ANGLE pour la bissectrice."),
  };
}

// =====================================================================
// ⭐ 07/11/2026 — LA MÊME PHRASE REVENAIT À ★1-★2 (scripts/mesurer-squelettes-coach.ts
// --lettres : 5,5 à 5,6 répétitions sur 20). Une autre lettre ne fait pas une autre
// question : chaque gabarit ci-dessous demande AUTRE CHOSE (lire la figure, juger
// une phrase, prendre le double, soustraire, nommer, ordonner les gestes…).
// ★1 : 12 mots au plus ; ★2 : 15 ; ni prénom ni objet (../REGLES-6E.md).
// Correcteurs : correcteurs/bissectrice.ts, section du 07/11.
// =====================================================================
type Figure = AngleCanvasData | DroitesCanvasData;
const qc = (text: string, juste: string, faux: string[], calcul: string, canvas?: Figure): Q => ({
  text, format: "qcm", choices: shuffle([juste, ...faux]), expected: [juste], comparator: "mcq_exact", explanation: expl(calcul), ...(canvas ? { canvas } : {}),
});
/** Une mesure en degrés : le nombre seul est accepté aussi (comparateur number_equal). */
const dg = (text: string, v: number, calcul: string, canvas?: Figure): Q => ({
  text, format: "short", expected: [`${fr(v)}°`], comparator: "number_equal", explanation: expl(calcul), ...(canvas ? { canvas } : {}),
});
const lt = (text: string, justes: string[], calcul: string, canvas?: Figure): Q => ({
  text, format: "short", expected: justes, comparator: "exact_text", explanation: expl(calcul), ...(canvas ? { canvas } : {}),
});
const ouiNon = (text: string, oui: boolean, calcul: string, canvas?: Figure) => qc(text, oui ? "oui" : "non", [oui ? "non" : "oui"], calcul, canvas);
const vraiFaux = (text: string, vrai: boolean, calcul: string, canvas?: Figure) => qc(text, vrai ? "vrai" : "faux", [vrai ? "faux" : "vrai"], calcul, canvas);
const mesureRonde = (min: number, max: number) => 10 * randomInt(Math.ceil(min / 10), Math.floor(max / 10));
/** Les noms d'un angle : USV, ses parts USW et WSV, et une écriture à l'envers. */
const partsDe = (n: ReturnType<typeof nomsAngle>) => ({ uw: `${n.u}${n.s}${n.w}`, wv: `${n.w}${n.s}${n.v}`, seg: `[${n.s}${n.w})` });
/** L'angle, sa bissectrice [SW) et une autre demi-droite [ST), de même allure : le dessin ne désigne pas la bonne. */
function angleDeuxDemiDroites(deg: number, n: ReturnType<typeof nomsAngle>, t: string, partageT: number): DroitesCanvasData {
  const f = angleEtBissectrice(deg, { noms: n });
  const g = angleEtBissectrice(deg, { partage: partageT, noms: { ...n, w: t } });
  return { ...f, lines: [...f.lines, { ...g.lines[2], id: "OT" }], points: [...(f.points ?? []), g.points![3]] };
}

// ----- BISSECTRICE_DEFINITION, ★1
/** Deux demi-droites dans l'angle : laquelle est la bissectrice ? La réponse se LIT. */
function genBisE1Figure(): Q {
  const n = nomsAngle();
  const t = LETTRES.filter((l) => ![n.s, n.u, n.v, n.w].includes(l))[randomInt(0, 15)];
  const m = mesureRonde(80, 150);
  const fig = angleDeuxDemiDroites(m, n, t, m * pick([0.2, 0.8]));
  const { seg } = partsDe(n);
  const faux = [`[${n.s}${t})`, `[${n.s}${n.u})`, `[${n.s}${n.v})`];
  const pourquoi = `${seg} partage l’angle ${n.nom} en deux angles égaux. [${n.s}${t}) laisse une part plus grande que l’autre.`;
  return qc(
    pick([
      `Observe la figure. Quelle demi-droite est la bissectrice de l’angle ${n.nom} ?`,
      `Regarde l’angle ${n.nom}. Quelle demi-droite le partage en deux parts égales ?`,
      `Trouve la bissectrice de l’angle ${n.nom} sur la figure.`,
      `Sur la figure, choisis la bissectrice de l’angle ${n.nom}.`,
      `Quelle demi-droite coupe l’angle ${n.nom} en deux angles égaux ?`,
      `Laquelle est la bissectrice de l’angle ${n.nom} ?`,
    ]),
    seg, faux, pourquoi, fig,
  );
}
/** Une demi-droite : est-ce la bissectrice ? Sur le dessin, on compare les deux parts. */
function genBisE1FigureOui(): Q {
  const n = nomsAngle();
  const m = mesureRonde(80, 150);
  const oui = Math.random() < 0.5;
  const fig = angleEtBissectrice(m, { partage: oui ? m / 2 : m * pick([0.2, 0.25, 0.75, 0.8]), noms: n });
  const { seg } = partsDe(n);
  const pourquoi = oui ? `${seg} laisse deux parts égales : c’est la bissectrice.` : `${seg} laisse une part plus grande que l’autre : ce n’est pas la bissectrice.`;
  return pick([
    () => ouiNon(`Observe la figure. ${seg} est-elle la bissectrice de l’angle ${n.nom} ?`, oui, pourquoi, fig),
    () => ouiNon(`Regarde l’angle ${n.nom}. ${seg} le partage-t-elle en deux angles égaux ?`, oui, pourquoi, fig),
    () => ouiNon(`Sur la figure, ${seg} est-elle la bissectrice de l’angle ${n.nom} ?`, oui, pourquoi, fig),
    () => ouiNon(`${seg} coupe-t-elle l’angle ${n.nom} en deux parts égales ?`, oui, pourquoi, fig),
    () => ouiNon(`La bissectrice de l’angle ${n.nom} est-elle ${seg} ?`, oui, pourquoi, fig),
    () => vraiFaux(`Vrai ou faux : ${seg} est la bissectrice de l’angle ${n.nom}.`, oui, pourquoi, fig),
  ])();
}
/** La bissectrice part du sommet : la lettre du milieu du nom. */
function genBisE1Sommet(): Q {
  const n = nomsAngle();
  const pourquoi = `La bissectrice part du sommet de l’angle. Le sommet est la lettre du milieu de ${n.nom} : ${n.s}.`;
  const faux = [n.u, n.v];
  return pick([
    () => qc(`La bissectrice de l’angle ${n.nom} part de quel point ?`, n.s, faux, pourquoi),
    () => qc(`D’où part la bissectrice de l’angle ${n.nom} ?`, n.s, faux, pourquoi),
    () => qc(`Par quel point passe la bissectrice de l’angle ${n.nom} ?`, n.s, faux, pourquoi),
    () => qc(`Quel point est commun à l’angle ${n.nom} et à sa bissectrice ?`, n.s, faux, pourquoi),
    () => lt(`Écris le point de départ de la bissectrice de l’angle ${n.nom}.`, [n.s], pourquoi),
    () => lt(`Bissectrice de l’angle ${n.nom} : écris la lettre de son origine.`, [n.s], pourquoi),
  ])();
}
/** Une part est donnée, on demande l'AUTRE : pas de calcul, l'égalité seule. */
function genBisE1Egal(): Q {
  const n = nomsAngle();
  const v = 5 * randomInt(3, 16);
  const { uw, wv, seg } = partsDe(n);
  const [x, y] = shuffle([uw, wv]);
  const fig = angleEtBissectrice(2 * v, { noms: n });
  const pourquoi = `La bissectrice donne deux parts égales : les deux mesurent ${v}°.`;
  return dg(
    pick([
      `${seg} est la bissectrice. L’angle ${x} mesure ${v}°. Calcule l’angle ${y}.`,
      `${seg} est la bissectrice. L’angle ${x} mesure ${v}°. Et l’angle ${y} ?`,
      `L’angle ${x} mesure ${v}°. ${seg} est la bissectrice. Combien mesure l’angle ${y} ?`,
      `Bissectrice ${seg} : l’angle ${x} mesure ${v}°. Combien mesure l’angle ${y} ?`,
      `${seg} partage l’angle en deux parts égales. L’une mesure ${v}°. Et l’autre ?`,
      `Une part mesure ${v}°. ${seg} est la bissectrice. Que mesure l’autre part ?`,
    ]),
    v, pourquoi, fig,
  );
}
/** La définition, à juger phrase par phrase. Les phrases sont dans le correcteur aussi. */
function genBisE1Vrai(): Q {
  const [t, v] = pick([
    ["la bissectrice partage l’angle en deux angles égaux.", true],
    ["la bissectrice part du sommet de l’angle.", true],
    ["un angle a une seule bissectrice.", true],
    ["la bissectrice est à l’intérieur de l’angle.", true],
    ["la bissectrice est l’axe de symétrie de l’angle.", true],
    ["la bissectrice partage l’angle en trois angles égaux.", false],
    ["un angle a deux bissectrices.", false],
    ["la bissectrice est un côté de l’angle.", false],
    ["une bissectrice fait toujours 45°.", false],
    ["la bissectrice est à l’extérieur de l’angle.", false],
  ] as const);
  const pourquoi = "La bissectrice part du sommet, passe à l’intérieur de l’angle et le partage en deux angles égaux. Il n’y en a qu’une, et c’est l’axe de symétrie de l’angle.";
  return Math.random() < 0.5 ? vraiFaux(`Vrai ou faux : ${t}`, v, pourquoi) : ouiNon(`Est-ce juste ? ${t[0].toUpperCase()}${t.slice(1)}`, v, pourquoi);
}
/** Une moitié ronde, sans nom de point : le geste nu. */
function genBisE1Moitie(): Q {
  const n = nomsAngle();
  const m = mesureRonde(20, 160);
  const pourquoi = `Deux parts égales : ${m} ÷ 2 = ${m / 2}°.`;
  return dg(
    pick([
      `Un angle de ${m}° : combien mesure chaque moitié ?`,
      `La bissectrice coupe un angle de ${m}° en deux. Calcule chaque part.`,
      `Partage un angle de ${m}° en deux angles égaux. Combien mesure chacun ?`,
      `Quelle est la moitié d’un angle de ${m}° ?`,
      `La bissectrice d’un angle de ${m}° donne deux angles de combien ?`,
      `Chaque moitié d’un angle de ${m}° mesure combien ?`,
      `Bissectrice d’un angle de ${m}° : combien mesure chaque part ?`,
    ]),
    m / 2, pourquoi, angleSeul(m, `${m}°`, { s: n.s, u: n.u, v: n.v }),
  );
}
/** Le nom : deux angles égaux, c'est la bissectrice ; elle partage un angle. */
function genBisE1Nom(): Q {
  const n = nomsAngle();
  const { uw, wv, seg } = partsDe(n);
  const v = 5 * randomInt(4, 16);
  const fig = angleEtBissectrice(2 * v, { noms: n });
  const juste = "la bissectrice";
  const faux = ["un côté", "la médiatrice", "le sommet"];
  const pourquoi = `${seg} partage l’angle ${n.nom} en deux angles égaux : c’est sa bissectrice.`;
  const quoi = "un angle";
  const pasQuoi = ["un segment", "un triangle", "un cercle"];
  const r = "La bissectrice partage un ANGLE en deux. C’est la médiatrice qui partage un segment.";
  return pick([
    () => qc(`Les angles ${uw} et ${wv} sont égaux. Comment s’appelle ${seg} ?`, juste, faux, pourquoi, fig),
    () => qc(`${seg} coupe l’angle ${n.nom} en deux parts égales. Quel est son nom ?`, juste, faux, pourquoi, fig),
    () => qc(`Sur la figure, les deux parts sont égales. Que représente ${seg} ?`, juste, faux, pourquoi, fig),
    () => qc(`Les angles ${uw} et ${wv} mesurent ${v}°. Que représente ${seg} ?`, juste, faux, pourquoi, fig),
    () => qc("La médiatrice partage un segment. Que partage la bissectrice ?", quoi, pasQuoi, r),
    () => qc("Que coupe en deux une bissectrice ?", quoi, pasQuoi, r),
    () => qc("Une bissectrice partage en deux parts égales. Mais quelle figure ?", quoi, pasQuoi, r),
  ])();
}

// ----- BISSECTRICE_DEFINITION, ★2
/** D'une part vers l'angle entier : le double. */
function genBisE2Double(): Q {
  const n = nomsAngle();
  const v = randomInt(12, 85);
  const { uw, seg } = partsDe(n);
  const pourquoi = `La bissectrice donne deux parts égales : ${v} + ${v} = ${2 * v}°.`;
  const fig = angleEtBissectrice(2 * v, { noms: n });
  return dg(
    pick([
      `L’angle ${uw} mesure ${v}°. ${seg} est la bissectrice de l’angle ${n.nom}. Calcule l’angle ${n.nom}.`,
      `${seg} est la bissectrice de l’angle ${n.nom}. L’angle ${uw} mesure ${v}°. Combien mesure l’angle ${n.nom} ?`,
      `${seg} coupe l’angle ${n.nom} en deux angles de ${v}°. Combien mesure l’angle ${n.nom} ?`,
      `Les deux moitiés de l’angle ${n.nom} mesurent ${v}°. Calcule l’angle ${n.nom}.`,
      `Chaque moitié de l’angle ${n.nom} mesure ${v}°. Combien mesure l’angle entier ?`,
      `La moitié de l’angle ${n.nom} mesure ${v}°. Trouve l’angle ${n.nom}.`,
      `Sa bissectrice partage l’angle ${n.nom} en ${v}° et ${v}°. Calcule l’angle ${n.nom}.`,
      `Un angle est partagé en deux parts de ${v}°. Combien mesure-t-il ?`,
    ]),
    2 * v, pourquoi, fig,
  );
}
/** Deux parts ou un total et une part : est-ce la bissectrice ? */
function genBisE2Verdict(): Q {
  const n = nomsAngle();
  const { uw, wv, seg } = partsDe(n);
  const oui = Math.random() < 0.5;
  const t = 2 * randomInt(20, 80);
  const d = oui ? 0 : pick([6, 8, 10, 12]);
  const [a, b] = [t / 2 - d, t / 2 + d];
  const pourquoi = oui ? `${a}° et ${b}° : les deux parts sont égales, c’est la bissectrice.` : `${a}° et ${b}° : les deux parts diffèrent, ce n’est pas la bissectrice.`;
  const fig = angleEtBissectrice(t, { partage: b, noms: n });
  return pick([
    () => ouiNon(`L’angle ${uw} mesure ${a}° et l’angle ${wv} ${b}°. ${seg} est-elle la bissectrice ?`, oui, pourquoi, fig),
    () => ouiNon(`Un angle est coupé en deux parts : ${a}° et ${b}°. Est-ce sa bissectrice ?`, oui, pourquoi),
    () => ouiNon(`${seg} donne deux angles : ${a}° et ${b}°. Est-ce la bissectrice ?`, oui, pourquoi, fig),
    () => ouiNon(`L’angle ${n.nom} mesure ${t}°. L’angle ${uw} mesure ${a}°. ${seg} est-elle sa bissectrice ?`, oui, pourquoi, fig),
    () => ouiNon(`L’angle ${n.nom} mesure ${t}°. ${seg} le coupe en ${a}° et ${b}°. Est-ce sa bissectrice ?`, oui, pourquoi, fig),
    () => ouiNon(`Un angle de ${t}° est coupé en ${a}° et ${b}°. Bissectrice ou non ?`, oui, pourquoi),
    () => vraiFaux(`Parts de ${a}° et ${b}° : c’est une bissectrice. Vrai ou faux ?`, oui, pourquoi),
  ])();
}
/** Une demi-droite quelconque dans l'angle : ce qui reste, par soustraction. */
function genBisE2Reste(): Q {
  const n = nomsAngle();
  const { uw, wv, seg } = partsDe(n);
  const t = 10 * randomInt(6, 16);
  let a = 5 * randomInt(3, t / 5 - 3);
  if (a === t / 2) a += 5;
  const pourquoi = `Les deux parts font l’angle entier : ${t} − ${a} = ${t - a}°.`;
  const fig = angleEtBissectrice(t, { partage: t - a, noms: n });
  return dg(
    pick([
      `L’angle ${n.nom} mesure ${t}°. L’angle ${uw} mesure ${a}°. Calcule l’angle ${wv}.`,
      `${seg} est dans l’angle ${n.nom} de ${t}°. L’angle ${uw} mesure ${a}°. Calcule l’angle ${wv}.`,
      `Dans l’angle ${n.nom} de ${t}°, l’angle ${uw} mesure ${a}°. Trouve l’angle ${wv}.`,
      `Un angle de ${t}° est coupé en deux parts. Une part fait ${a}°. Et l’autre ?`,
      `Une part fait ${a}° dans un angle de ${t}°. Combien fait l’autre part ?`,
      `Retire ${a}° à un angle de ${t}°. Combien reste-t-il ?`,
    ]),
    t - a, pourquoi, fig,
  );
}
/** La phrase juste (ou la seule fausse) : le correcteur les évalue toutes. */
function genBisE2Phrase(): Q {
  const n = nomsAngle();
  const { uw, wv, seg } = partsDe(n);
  const vraies = [`${uw} et ${wv} sont égaux`, `${n.nom} est le double de ${uw}`, `${n.nom} est le double de ${wv}`, `${uw} est la moitié de ${n.nom}`, `${wv} est la moitié de ${n.nom}`];
  const fausses = [`${uw} et ${n.nom} sont égaux`, `${uw} est le double de ${n.nom}`, `${n.nom} est la moitié de ${wv}`, `${wv} est le double de ${uw}`, `${wv} et ${n.nom} sont égaux`];
  const intro = `${seg} est la bissectrice de l’angle ${n.nom}.`;
  const juste = pick([true, true, true, true, false, false]);
  const q = juste ? pick(["Quelle phrase est juste ?", "Choisis la phrase juste.", "Trouve la phrase vraie.", "Une seule phrase est juste : laquelle ?"]) : pick(["Quelle phrase est fausse ?", "Trouve la phrase fausse."]);
  const [bonnes, autres] = juste ? [vraies, fausses] : [fausses, vraies];
  return qc(`${intro} ${q}`, pick(bonnes), shuffle(autres).slice(0, 3), `Les deux parts ${uw} et ${wv} sont égales ; l’angle ${n.nom} vaut leur double.`, angleEtBissectrice(pick([60, 80, 100]), { noms: n }));
}
/** Nommer l'angle demandé : la réponse est un NOM. */
function genBisE2QuelAngle(): Q {
  const n = nomsAngle();
  const { uw, wv, seg } = partsDe(n);
  const fig = angleEtBissectrice(pick([60, 70, 80, 90, 100]), { noms: n });
  const intro = `${seg} est la bissectrice de l’angle ${n.nom}.`;
  const dos = (x: string) => x[2] + x[1] + x[0];
  const pourquoi = `Les angles ${uw} et ${wv} sont égaux, et l’angle ${n.nom} vaut leur double.`;
  const faux = [`${n.u}${n.w}${n.v}`, `${n.w}${n.u}${n.s}`];
  return pick([
    () => qc(`${intro} Quel angle est égal à ${uw} ?`, wv, [n.nom, ...faux], pourquoi, fig),
    () => qc(`${intro} Choisis l’angle égal à ${wv}.`, uw, [n.nom, ...faux], pourquoi, fig),
    () => lt(`${intro} Écris l’angle égal à ${uw}.`, [wv, dos(wv)], pourquoi, fig),
    () => lt(`${intro} Écris l’angle égal à ${wv}.`, [uw, dos(uw)], pourquoi, fig),
    () => qc(`${intro} Quel angle vaut le double de ${uw} ?`, n.nom, [wv, ...faux], pourquoi, fig),
    () => lt(`${intro} Quel angle vaut le double de ${wv} ?`, [n.nom, dos(n.nom)], pourquoi, fig),
  ])();
}
/** Les deux angles qui ont un nom : droit et plat. */
function genBisE2DroitPlat(): Q {
  const plat = Math.random() < 0.4;
  const [nom, m] = plat ? ["angle plat", 180] : ["angle droit", 90];
  const pourquoi = `Un ${nom} mesure ${m}°. Sa bissectrice le partage en deux : ${m} ÷ 2 = ${m / 2}°.`;
  return dg(
    pick([
      `La bissectrice d’un ${nom} donne deux angles. Combien mesure chacun ?`,
      `Un ${nom} a une bissectrice. Combien mesure chaque part ?`,
      `On partage un ${nom} en deux parts égales. Calcule une part.`,
      `Combien mesure la moitié d’un ${nom} ?`,
      `Sa bissectrice coupe un ${nom} en deux. Que mesure chaque angle ?`,
      `Trace la bissectrice d’un ${nom}. Quelle mesure a chaque part ?`,
    ]),
    m / 2, pourquoi,
  );
}
/** La nature des deux moitiés : aigu, droit… (le lien avec le chapitre des angles). */
function genBisE2Nature(): Q {
  const n = nomsAngle();
  const m = pick([60, 80, 100, 120, 130, 140, 150, 160, 170, 180]);
  const juste = m === 180 ? "droit" : "aigu";
  const faux = ["aigu", "droit", "obtus", "plat"].filter((x) => x !== juste);
  const pourquoi = `${m} ÷ 2 = ${m / 2}° : ${juste === "droit" ? "exactement 90°, un angle droit" : "moins de 90°, un angle aigu"}.`;
  const fig = m < 180 ? angleSeul(m, `${m}°`, { s: n.s, u: n.u, v: n.v }) : undefined;
  return pick([
    () => qc(`La bissectrice coupe un angle de ${m}°. Chaque moitié est de quelle nature ?`, juste, faux, pourquoi),
    () => qc(`Un angle de ${m}° a une bissectrice. Quelle est la nature de chaque moitié ?`, juste, faux, pourquoi, fig),
    () => qc(`L’angle ${n.nom} mesure ${m}°. Quelle est la nature de sa moitié ?`, juste, faux, pourquoi, fig),
    () => qc(`Chaque moitié d’un angle de ${m}° est un angle…`, juste, faux, pourquoi),
    () => ouiNon(`La moitié d’un angle de ${m}° est-elle un angle aigu ?`, juste === "aigu", pourquoi),
    () => ouiNon(`L’angle ${n.nom} mesure ${m}°. Sa moitié est-elle un angle droit ?`, juste === "droit", pourquoi, fig),
  ])();
}

// ----- BISSECTRICE_CONSTRUIRE, ★2
const ETAPES_RAPPORTEUR = ["mesurer l’angle", "diviser sa mesure par 2", "marquer cette graduation", "tracer la demi-droite"];
/** Les gestes dans l'ordre. L'ordre est relu dans le correcteur, qui a sa propre table. */
function genBisCOrdre(): Q {
  const i = randomInt(0, 3);
  const juste = ETAPES_RAPPORTEUR[i];
  const faux = ETAPES_RAPPORTEUR.filter((e) => e !== juste);
  const pourquoi = `Au rapporteur : ${ETAPES_RAPPORTEUR.join(", puis ")}.`;
  const rang = ["première", "deuxième", "troisième", "dernière"][i];
  const formes: (() => Q)[] = [
    () => qc(`Au rapporteur, quelle est la ${rang} étape pour tracer la bissectrice ?`, juste, faux, pourquoi),
    () => qc(`Bissectrice au rapporteur : quelle est la ${rang} étape ?`, juste, faux, pourquoi),
    () => qc(`Pour tracer une bissectrice, choisis la ${rang} étape.`, juste, faux, pourquoi),
  ];
  if (i > 0) formes.push(() => qc(`Bissectrice au rapporteur : que fais-tu juste après « ${ETAPES_RAPPORTEUR[i - 1]} » ?`, juste, faux, pourquoi));
  if (i < 3) formes.push(() => qc(`Bissectrice au rapporteur : que fais-tu juste avant « ${ETAPES_RAPPORTEUR[i + 1]} » ?`, juste, faux, pourquoi));
  return pick(formes)();
}
/** Où poser le rapporteur : le centre sur le sommet, le zéro sur un côté. */
function genBisCPoser(): Q {
  const n = nomsAngle();
  const centre = `sur le sommet ${n.s}`;
  const cote = "sur un côté de l’angle";
  const dedans = "à l’intérieur de l’angle";
  const loin = `sur le point ${n.u}`;
  const r = `Le centre du rapporteur va sur le sommet ${n.s}, et le zéro sur un côté de l’angle.`;
  return pick([
    () => qc(`Où place-t-on le centre du rapporteur pour l’angle ${n.nom} ?`, centre, [cote, dedans, loin], r),
    () => qc(`Angle ${n.nom} : où va le centre du rapporteur ?`, centre, [cote, dedans, loin], r),
    () => lt(`Angle ${n.nom} : sur quel point va le centre du rapporteur ?`, [n.s], r),
    () => lt(`Écris le point où poser le centre du rapporteur sur l’angle ${n.nom}.`, [n.s], r),
    () => qc(`Où aligne-t-on le zéro du rapporteur pour l’angle ${n.nom} ?`, cote, [centre, dedans, loin], r),
    () => qc(`Angle ${n.nom} : où va le zéro du rapporteur ?`, cote, [centre, dedans, loin], r),
  ])();
}
/** Le pliage, sans rien mesurer. */
function genBisCPli(): Q {
  const n = nomsAngle();
  const [c1, c2] = [`[${n.s}${n.u})`, `[${n.s}${n.v})`];
  const plie = `On plie : ${c1} arrive sur ${c2}.`;
  const r = `Le pli amène ${c1} sur ${c2} : il part du sommet ${n.s}, et les deux parts se superposent.`;
  return pick([
    () => lt(`${plie} Par quel point passe le pli ?`, [n.s], r),
    () => qc(`${plie} De quel point part le pli ?`, n.s, [n.u, n.v], r),
    () => qc(`On plie l’angle ${n.nom}. Quel côté doit arriver sur ${c1} ?`, c2, [`[${n.u}${n.v})`, `[${n.u}${n.s})`], r),
    () => ouiNon(`${plie} Le pli est-il la bissectrice ?`, true, r),
    () => ouiNon(`On plie pour trouver la bissectrice. Faut-il d’abord mesurer l’angle ?`, false, "Le pliage amène un côté sur l’autre, sans rien mesurer."),
    () => qc(`${plie} Combien de parts égales obtient-on ?`, "2", ["1", "3", "4"], r),
    () => qc(`${plie} Comment sont les deux parts de l’angle ?`, "égales", ["différentes", "droites", "plates"], r),
  ])();
}
/** La graduation est connue : l'angle entier vaut le double. */
function genBisCInverse(): Q {
  const v = randomInt(12, 85);
  const pourquoi = `La graduation marque la moitié de l’angle : 2 × ${v} = ${2 * v}°.`;
  return dg(
    pick([
      `On marque la graduation ${v}° pour la bissectrice. Combien mesure l’angle ?`,
      `La bissectrice est marquée à ${v}°. Quelle est la mesure de l’angle ?`,
      `Pour la bissectrice, la graduation est ${v}°. Calcule l’angle entier.`,
      `Graduation ${v}° pour la bissectrice : combien mesure l’angle entier ?`,
      `La moitié de l’angle est marquée à ${v}°. Trouve l’angle entier.`,
      `La bissectrice passe à ${v}° d’un côté. Combien mesure l’angle ?`,
    ]),
    2 * v, pourquoi,
  );
}
/** Une graduation est marquée : est-ce la bonne ? */
function genBisCVerifie(): Q {
  const n = nomsAngle();
  const m = 2 * randomInt(20, 80);
  const oui = Math.random() < 0.5;
  const a = oui ? m / 2 : pick([m / 2 + 10, m / 2 - 10, m === 90 ? 40 : 45].filter((x) => x !== m / 2));
  const pourquoi = `La moitié de ${m}° est ${m / 2}°. ${oui ? "La graduation est juste." : `${a}° ne partage pas l’angle en deux parts égales.`}`;
  const fig = angleSeul(m, `${m}°`, { s: n.s, u: n.u, v: n.v });
  return pick([
    () => ouiNon(`L’angle ${n.nom} mesure ${m}°. On marque la graduation ${a}°. Est-ce la bissectrice ?`, oui, pourquoi, fig),
    () => ouiNon(`Angle de ${m}° : marquer ${a}° donne-t-il sa bissectrice ?`, oui, pourquoi),
    () => ouiNon(`Pour un angle de ${m}°, la bissectrice est-elle à ${a}° ?`, oui, pourquoi),
    () => ouiNon(`L’angle ${n.nom} mesure ${m}°. Faut-il marquer ${a}° pour sa bissectrice ?`, oui, pourquoi, fig),
    () => vraiFaux(`Vrai ou faux : la bissectrice d’un angle de ${m}° est à ${a}°.`, oui, pourquoi),
    () => vraiFaux(`Un angle mesure ${m}°. Sa bissectrice est à ${a}°. Vrai ou faux ?`, oui, pourquoi),
  ])();
}
/** Quel outil pour quel geste. */
function genBisCOutil(): Q {
  const n = nomsAngle();
  const OUTILS = ["le rapporteur", "la règle", "le compas", "l’équerre"];
  const quiz = (t: string, juste: string, r: string) => qc(t, juste, OUTILS.filter((o) => o !== juste), r);
  const rap = "Le rapporteur mesure les angles et marque les graduations.";
  const reg = "La règle trace la demi-droite, du sommet au point marqué.";
  const plier = "plier la feuille";
  return pick([
    () => quiz(`Quel outil mesure l’angle ${n.nom} ?`, "le rapporteur", rap),
    () => quiz(`Avec quel outil marque-t-on la graduation de la bissectrice ?`, "le rapporteur", rap),
    () => quiz(`L’angle ${n.nom} mesure combien ? Quel outil le dit ?`, "le rapporteur", rap),
    () => quiz(`Quel outil trace la demi-droite de la bissectrice ?`, "la règle", reg),
    () => quiz(`Le point est marqué. Avec quoi trace-t-on la bissectrice ?`, "la règle", reg),
    () => qc(`Sans outil, comment trouver la bissectrice de l’angle ${n.nom} ?`, plier, ["regarder à l’œil", "tracer au hasard", "couper l’angle"], "Le pli amène un côté sur l’autre : c’est la bissectrice."),
    () => qc(`Tu n’as pas de rapporteur. Comment trouver la bissectrice ?`, plier, ["regarder à l’œil", "tracer au hasard", "couper l’angle"], "Le pli amène un côté sur l’autre : c’est la bissectrice."),
  ])();
}
/** La graduation, en réponse courte. */
function genBisCCalcul(): Q {
  const n = nomsAngle();
  const m = randomInt(20, 170);
  const pourquoi = `${m} ÷ 2 = ${fr(m / 2)}. On marque la graduation ${fr(m / 2)}°.`;
  const fig = angleSeul(m, `${m}°`, { s: n.s, u: n.u, v: n.v });
  return dg(
    pick([
      `Bissectrice de l’angle ${n.nom} de ${m}° : calcule la graduation à marquer.`,
      `Calcule la graduation de la bissectrice d’un angle de ${m}°.`,
      `Angle de ${m}°. Quelle graduation donne sa bissectrice ?`,
      `Pour la bissectrice d’un angle de ${m}°, quelle graduation marquer ?`,
      `Le zéro est sur [${n.s}${n.v}). L’angle ${n.nom} mesure ${m}°. Quelle graduation pour sa bissectrice ?`,
      `Tu traces la bissectrice d’un angle de ${m}°. Quelle graduation vises-tu ?`,
    ]),
    m / 2, pourquoi, fig,
  );
}

const gabBis = (id: string, microId: string, difficulty: 1 | 2, hint: string, generate: () => Q): TutorBankItemV4 => ({
  kind: "template", id, niveau: "6e", matiere: "maths", notionId: "bissectrice_angle", microId, difficulty, theme: "neutral", hint, tags: ["bissectrice_angle", "template"], generate,
});

export const bissectriceBank: TutorBankItemV4[] = [
  // =========================
  // BISSECTRICE_DEFINITION
  // =========================
  {
    kind: "fixed",
    id: "bissectrice_definition_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "bissectrice_angle",
    microId: "bissectrice_definition",
    difficulty: 1,
    theme: "neutral",
    text: "Qu'est-ce que la bissectrice d'un angle saillant ?",
    format: "qcm",
    choices: [
      "la droite qui partage l'angle en deux angles adjacents égaux",
      "la droite qui passe par le sommet de l'angle",
      "la droite perpendiculaire à l'un des côtés de l'angle",
      "la droite qui joint les extrémités des deux côtés",
    ],
    expected: ["la droite qui partage l'angle en deux angles adjacents égaux"],
    comparator: "mcq_exact",
    hint: "Elle coupe l'angle en deux parts identiques.",
    explanation: expl(
      "La bissectrice partage l'angle en DEUX ANGLES ÉGAUX, côte à côte (on dit adjacents). Passer par le sommet ne suffit pas : une infinité de droites le font, et une seule partage l'angle en deux parts égales."
    ),
    tags: ["bissectrice_angle", "definition", "canvas", "qcm"],
    canvas: angleEtBissectrice(80),
  },
  {
    kind: "fixed",
    id: "bissectrice_definition_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "bissectrice_angle",
    microId: "bissectrice_definition",
    difficulty: 2,
    theme: "neutral",
    text: "La bissectrice d'un angle de 80° le partage en deux angles. Combien mesure chacun ?",
    format: "short",
    expected: ["40°"],
    comparator: "number_equal",
    hint: "Deux parts égales, donc la moitié.",
    explanation: expl("80 ÷ 2 = 40. Chacun des deux angles mesure 40°."),
    tags: ["bissectrice_angle", "definition", "canvas", "short"],
    canvas: angleSeul(80, "80°"),
  },
  {
    kind: "fixed",
    id: "bissectrice_definition_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "bissectrice_angle",
    microId: "bissectrice_definition",
    difficulty: 3,
    theme: "neutral",
    text: "Que représente aussi la bissectrice d'un angle ?",
    format: "qcm",
    choices: [
      "l'axe de symétrie de l'angle",
      "la médiatrice du segment qui joint les deux côtés",
      "la hauteur de l'angle",
      "la perpendiculaire à l'angle",
    ],
    expected: ["l'axe de symétrie de l'angle"],
    comparator: "mcq_exact",
    hint: "Si on plie la feuille le long de la bissectrice, que devient l'angle ?",
    explanation: expl(
      "En pliant la feuille le long de la bissectrice, un côté de l'angle vient exactement sur l'autre : c'est donc l'axe de symétrie de l'angle. La bissectrice est à l'angle ce que la médiatrice est au segment."
    ),
    tags: ["bissectrice_angle", "definition", "qcm"],
  },
  {
    kind: "fixed",
    id: "bissectrice_definition_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "bissectrice_angle",
    microId: "bissectrice_definition",
    difficulty: 3,
    theme: "neutral",
    text: "Observe la figure. La demi-droite [OC) est-elle la bissectrice de l'angle AOB ?",
    format: "qcm",
    choices: [
      "non : elle partage l'angle en deux parts inégales",
      "oui : elle passe par le sommet O",
      "oui : elle est à l'intérieur de l'angle",
      "non : une bissectrice ne peut pas être en pointillés",
    ],
    expected: ["non : elle partage l'angle en deux parts inégales"],
    comparator: "mcq_exact",
    hint: "Compare les deux parts de part et d'autre de [OC).",
    explanation: expl(
      "[OC) passe bien par le sommet et se trouve à l'intérieur de l'angle, mais elle le coupe en deux parts visiblement différentes. Or la bissectrice partage l'angle en deux angles ÉGAUX : ce n'est donc pas elle."
    ),
    tags: ["bissectrice_angle", "definition", "canvas", "piege", "qcm"],
    canvas: angleEtBissectrice(90, { bissectriceJuste: false }),
  },
  {
    kind: "fixed",
    id: "bissectrice_definition_fixed_5",
    niveau: "6e",
    matiere: "maths",
    notionId: "bissectrice_angle",
    microId: "bissectrice_definition",
    difficulty: 3,
    theme: "neutral",
    text: "Que veut dire « angle saillant » ?",
    format: "qcm",
    choices: [
      "l'angle le plus petit des deux formés par les deux demi-droites",
      "un angle qui mesure plus de 180°",
      "un angle qui dépasse de la figure",
      "un angle dont les côtés sont tracés en gras",
    ],
    expected: ["l'angle le plus petit des deux formés par les deux demi-droites"],
    comparator: "mcq_exact",
    hint: "Deux demi-droites de même origine découpent le plan en deux morceaux.",
    explanation: expl(
      "Deux demi-droites de même origine définissent deux angles : le SAILLANT, inférieur à 180°, et le RENTRANT, qui est l'autre morceau. Le programme de 6e s'en tient au saillant — c'est celui qu'on dessine et qu'on mesure au rapporteur."
    ),
    tags: ["bissectrice_angle", "definition", "vocabulaire", "qcm"],
  },
  {
    kind: "template",
    id: "bissectrice_definition_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "bissectrice_angle",
    microId: "bissectrice_definition",
    difficulty: 2,
    theme: "neutral",
    hint: "La bissectrice coupe l'angle en deux moitiés.",
    tags: ["bissectrice_angle", "definition", "template"],
    generate: () => genBisMoitie(),
  },
  {
    kind: "template",
    id: "bissectrice_definition_tpl_connaitre",
    niveau: "6e",
    matiere: "maths",
    notionId: "bissectrice_angle",
    microId: "bissectrice_definition",
    difficulty: 1,
    theme: "neutral",
    hint: "La bissectrice coupe l’angle en deux angles égaux.",
    tags: ["bissectrice_angle", "definition", "template", "qcm"],
    generate: () => genBisConnaitre(),
  },
  {
    kind: "template",
    id: "bissectrice_definition_tpl_situation",
    niveau: "6e",
    matiere: "maths",
    notionId: "bissectrice_angle",
    microId: "bissectrice_definition",
    difficulty: 3,
    theme: "neutral",
    hint: "La bissectrice coupe l'angle en deux moitiés.",
    tags: ["bissectrice_angle", "definition", "template"],
    // 03/11/2026 : les situations de `…_tpl_1` (éventail, ciseaux…), montées à ★3.
    generate: () => genBisMoitieSituation(),
  },
  {
    kind: "template",
    id: "bissectrice_definition_tpl_figure",
    niveau: "6e",
    matiere: "maths",
    notionId: "bissectrice_angle",
    microId: "bissectrice_definition",
    difficulty: 3,
    theme: "neutral",
    hint: "Compare les deux angles de part et d’autre de la demi-droite.",
    tags: ["bissectrice_angle", "definition", "template", "canvas", "qcm"],
    generate: () => genBisFigure(),
  },
  {
    kind: "template",
    id: "bissectrice_definition_tpl_ouverte",
    niveau: "6e",
    matiere: "maths",
    notionId: "bissectrice_angle",
    microId: "bissectrice_definition",
    difficulty: 4,
    theme: "neutral",
    hint: "Dis ce qu'il faut vérifier, pas seulement ce qu'on voit.",
    tags: ["bissectrice_angle", "definition", "template", "qcm"],
    generate: () => genBisRaisons(),
  },

  // =========================
  // BISSECTRICE_CONSTRUIRE
  // =========================
  {
    kind: "fixed",
    id: "bissectrice_construire_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "bissectrice_angle",
    microId: "bissectrice_construire",
    difficulty: 2,
    theme: "neutral",
    // 03/11/2026 : ★2 en 15 mots au plus.
    text: "On plie l'angle pour amener un côté sur l'autre. Que représente le pli ?",
    format: "qcm",
    choices: [
      "la bissectrice de l'angle",
      "la médiatrice de l'angle",
      "la perpendiculaire à l'un des côtés",
      "un côté de l'angle",
    ],
    expected: ["la bissectrice de l'angle"],
    comparator: "mcq_exact",
    hint: "Le pli est l'axe de symétrie de la figure pliée.",
    explanation: expl(
      "Le pli qui amène un côté sur l'autre est l'axe de symétrie de l'angle : de part et d'autre, les deux parts se superposent exactement, donc elles sont égales. C'est la bissectrice."
    ),
    tags: ["bissectrice_angle", "construire", "qcm"],
  },
  {
    kind: "fixed",
    id: "bissectrice_construire_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "bissectrice_angle",
    microId: "bissectrice_construire",
    difficulty: 2,
    theme: "neutral",
    text: "Comment tracer la bissectrice d'un angle avec un rapporteur ?",
    format: "qcm",
    choices: [
      "on mesure l'angle, on divise sa mesure par 2, puis on trace la demi-droite à cette mesure",
      "on mesure l'angle, puis on trace une demi-droite à 45° d'un côté",
      "on pose le rapporteur au hasard à l'intérieur de l'angle",
      "on mesure l'angle et on multiplie sa mesure par 2",
    ],
    expected: [
      "on mesure l'angle, on divise sa mesure par 2, puis on trace la demi-droite à cette mesure",
    ],
    comparator: "mcq_exact",
    hint: "La bissectrice est à la moitié de la mesure, en partant d'un côté.",
    explanation: expl(
      "On mesure d'abord l'angle au rapporteur — par exemple 74°. On calcule sa moitié : 37°. On repose le rapporteur, le centre sur le sommet et le zéro sur un côté, et on marque 37°. La demi-droite tracée est la bissectrice."
    ),
    tags: ["bissectrice_angle", "construire", "qcm"],
  },
  {
    kind: "fixed",
    id: "bissectrice_construire_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "bissectrice_angle",
    microId: "bissectrice_construire",
    difficulty: 3,
    theme: "neutral",
    text: "Un angle mesure 110°. À quelle graduation faut-il marquer un point pour tracer sa bissectrice ?",
    format: "short",
    expected: ["55°"],
    comparator: "number_equal",
    hint: "La moitié de la mesure, en partant d'un côté.",
    explanation: expl(
      "110 ÷ 2 = 55. On marque un point à la graduation 55°, en comptant depuis le côté sur lequel le zéro du rapporteur est aligné."
    ),
    tags: ["bissectrice_angle", "construire", "canvas", "short"],
    canvas: angleSeul(110, "110°"),
  },
  {
    kind: "fixed",
    id: "bissectrice_construire_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "bissectrice_angle",
    microId: "bissectrice_construire",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève trace une demi-droite à 45° pour partager un angle de 110°. Que se passe-t-il ?",
    format: "qcm",
    choices: [
      "les deux parts font 45° et 65° : ce n'est pas la bissectrice",
      "c'est correct : 45° est toujours la bonne mesure",
      "les deux parts font 45° chacune",
      "l'angle devient un angle droit",
    ],
    expected: ["les deux parts font 45° et 65° : ce n'est pas la bissectrice"],
    comparator: "mcq_exact",
    hint: "45°, c'est la moitié de 90°, pas de 110°.",
    explanation: expl(
      "Il reste 110 − 45 = 65° de l'autre côté : les deux parts sont inégales. La moitié dépend de l'angle qu'on partage — ici 110 ÷ 2 = 55°, et non 45°, qui n'est la bonne réponse que pour un angle droit."
    ),
    tags: ["bissectrice_angle", "construire", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "bissectrice_construire_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "bissectrice_angle",
    microId: "bissectrice_construire",
    difficulty: 3,
    theme: "neutral",
    hint: "On divise la mesure par 2, puis on marque cette graduation.",
    tags: ["bissectrice_angle", "construire", "template"],
    generate: () => genBisGraduation(),
  },
  {
    kind: "template",
    id: "bissectrice_construire_tpl_rapporteur",
    niveau: "6e",
    matiere: "maths",
    notionId: "bissectrice_angle",
    microId: "bissectrice_construire",
    difficulty: 2,
    theme: "neutral",
    hint: "La bissectrice est à la moitié de la mesure de l’angle.",
    tags: ["bissectrice_angle", "construire", "template", "qcm"],
    generate: () => genBisRapporteurQcm(),
  },
  {
    kind: "template",
    id: "bissectrice_construire_tpl_ouverte",
    niveau: "6e",
    matiere: "maths",
    notionId: "bissectrice_angle",
    microId: "bissectrice_construire",
    difficulty: 5,
    theme: "neutral",
    hint: "Écris des étapes qu'un camarade peut suivre sans te voir faire.",
    tags: ["bissectrice_angle", "construire", "template", "qcm"],
    generate: () => genBisConstruireRaisons(),
  },

  // =========================
  // BISSECTRICE_PROBLEME
  // =========================
  {
    kind: "fixed",
    id: "bissectrice_probleme_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "bissectrice_angle",
    microId: "bissectrice_probleme",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la mesure des deux angles formés par la bissectrice d'un angle droit ?",
    format: "short",
    expected: ["45°"],
    comparator: "number_equal",
    hint: "Un angle droit mesure 90°.",
    explanation: expl("Un angle droit mesure 90°, donc sa bissectrice forme deux angles de 90 ÷ 2 = 45°."),
    tags: ["bissectrice_angle", "probleme", "short"],
  },
  {
    kind: "fixed",
    id: "bissectrice_probleme_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "bissectrice_angle",
    microId: "bissectrice_probleme",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle est la mesure des deux angles formés par la bissectrice d'un angle plat ?",
    format: "short",
    expected: ["90°"],
    comparator: "number_equal",
    hint: "Un angle plat mesure 180°.",
    explanation: expl(
      "Un angle plat mesure 180°, donc sa bissectrice forme deux angles de 180 ÷ 2 = 90° : elle est perpendiculaire aux deux côtés."
    ),
    tags: ["bissectrice_angle", "probleme", "short"],
  },
  {
    kind: "fixed",
    id: "bissectrice_probleme_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "bissectrice_angle",
    microId: "bissectrice_probleme",
    difficulty: 3,
    theme: "neutral",
    text: "La demi-droite [OC) est la bissectrice de l'angle AOB, et l'angle AOC mesure 37°. Combien mesure l'angle AOB ?",
    format: "short",
    expected: ["74°"],
    comparator: "number_equal",
    hint: "L'angle entier vaut deux fois la moitié.",
    explanation: expl(
      "[OC) est la bissectrice, donc les angles AOC et COB sont égaux : chacun mesure 37°. L'angle AOB vaut la somme des deux : 37 + 37 = 74°."
    ),
    tags: ["bissectrice_angle", "probleme", "canvas", "short"],
    canvas: angleEtBissectrice(74),
  },
  {
    kind: "fixed",
    id: "bissectrice_probleme_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "bissectrice_angle",
    microId: "bissectrice_probleme",
    difficulty: 4,
    theme: "neutral",
    text: "Dans un triangle équilatéral, combien mesurent les deux angles formés par la bissectrice d'un de ses angles ?",
    format: "short",
    expected: ["30°"],
    comparator: "number_equal",
    hint: "Commence par la mesure d'un angle du triangle équilatéral.",
    explanation: expl(
      "Dans un triangle équilatéral, chaque angle mesure 60° (180 ÷ 3). La bissectrice le partage en deux : 60 ÷ 2 = 30°."
    ),
    tags: ["bissectrice_angle", "probleme", "short"],
  },
  {
    kind: "template",
    id: "bissectrice_probleme_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "bissectrice_angle",
    microId: "bissectrice_probleme",
    difficulty: 3,
    theme: "neutral",
    hint: "Selon ce qu'on te donne, tu divises ou tu multiplies par 2.",
    tags: ["bissectrice_angle", "probleme", "template"],
    generate: () => genBisDoubleMoitie(),
  },
  {
    kind: "template",
    id: "bissectrice_probleme_tpl_ouverte",
    niveau: "6e",
    matiere: "maths",
    notionId: "bissectrice_angle",
    microId: "bissectrice_probleme",
    difficulty: 5,
    theme: "neutral",
    hint: "Appuie-toi sur l'égalité des deux angles, pas sur le dessin.",
    tags: ["bissectrice_angle", "probleme", "template"],
    generate: () => genBisProblemes(),
  },

  // =========================
  // BISSECTRICE_DEFI
  // =========================
  {
    kind: "fixed",
    id: "bissectrice_defi_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "bissectrice_angle",
    microId: "bissectrice_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Un angle mesure 90°. On trace sa bissectrice, puis la bissectrice de l'une des deux moitiés. Combien mesure le plus petit angle obtenu ?",
    format: "short",
    expected: ["22,5°"],
    comparator: "number_equal",
    hint: "On divise deux fois par 2.",
    explanation: expl(
      "La première bissectrice donne 90 ÷ 2 = 45°. La seconde partage ce 45° en deux : 45 ÷ 2 = 22,5°. Une mesure d'angle n'est pas forcément un nombre entier."
    ),
    tags: ["bissectrice_angle", "defi", "short"],
  },
  {
    kind: "fixed",
    id: "bissectrice_defi_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "bissectrice_angle",
    microId: "bissectrice_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Combien de bissectrices un angle saillant possède-t-il ?",
    format: "qcm",
    choices: [
      "une seule",
      "deux : une de chaque côté",
      "une infinité",
      "aucune, si l'angle n'est pas droit",
    ],
    expected: ["une seule"],
    comparator: "mcq_exact",
    hint: "Combien de demi-droites partagent l'angle en deux parts égales ?",
    explanation: expl(
      "Une seule demi-droite issue du sommet partage l'angle en deux parts égales : si on la déplace d'un degré, une part grandit et l'autre diminue. La bissectrice est donc unique, comme la médiatrice d'un segment."
    ),
    tags: ["bissectrice_angle", "defi", "qcm"],
  },
  {
    kind: "template",
    id: "bissectrice_defi_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "bissectrice_angle",
    microId: "bissectrice_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Partage deux fois de suite.",
    tags: ["bissectrice_angle", "defi", "template"],
    generate: () => genBisQuart(),
  },
  {
    kind: "template",
    id: "bissectrice_defi_tpl_ouverte",
    niveau: "6e",
    matiere: "maths",
    notionId: "bissectrice_angle",
    microId: "bissectrice_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Compare avec la médiatrice, et dis ce qui joue le rôle de quoi.",
    tags: ["bissectrice_angle", "defi", "template", "qcm"],
    generate: () => genBisDefiRaisons(),
  },
  // =========================
  // ⭐ 07/11/2026 — ★1-★2 : d'autres questions, pas d'autres lettres
  // =========================
  gabBis("bissectrice_definition_tpl_e1_figure", "bissectrice_definition", 1, "Compare les deux parts de l’angle.", genBisE1Figure),
  gabBis("bissectrice_definition_tpl_e1_figure_oui", "bissectrice_definition", 1, "Les deux parts sont-elles égales ?", genBisE1FigureOui),
  gabBis("bissectrice_definition_tpl_e1_sommet", "bissectrice_definition", 1, "Le sommet est la lettre du milieu du nom de l’angle.", genBisE1Sommet),
  gabBis("bissectrice_definition_tpl_e1_egal", "bissectrice_definition", 1, "La bissectrice donne deux parts égales.", genBisE1Egal),
  gabBis("bissectrice_definition_tpl_e1_vrai", "bissectrice_definition", 1, "Bissectrice : elle part du sommet et donne deux angles égaux.", genBisE1Vrai),
  gabBis("bissectrice_definition_tpl_e1_moitie", "bissectrice_definition", 1, "Divise la mesure par 2.", genBisE1Moitie),
  gabBis("bissectrice_definition_tpl_e1_nom", "bissectrice_definition", 1, "Deux parts égales dans un angle : quel est ce mot ?", genBisE1Nom),
  gabBis("bissectrice_definition_tpl_e2_double", "bissectrice_definition", 2, "L’angle entier vaut deux parts.", genBisE2Double),
  gabBis("bissectrice_definition_tpl_e2_verdict", "bissectrice_definition", 2, "Compare les deux parts : sont-elles égales ?", genBisE2Verdict),
  gabBis("bissectrice_definition_tpl_e2_reste", "bissectrice_definition", 2, "L’angle entier, moins la part connue.", genBisE2Reste),
  gabBis("bissectrice_definition_tpl_e2_phrase", "bissectrice_definition", 2, "Deux parts égales ; l’angle entier en vaut le double.", genBisE2Phrase),
  gabBis("bissectrice_definition_tpl_e2_quel_angle", "bissectrice_definition", 2, "Regarde la figure : quel angle est de l’autre côté ?", genBisE2QuelAngle),
  gabBis("bissectrice_definition_tpl_e2_droit_plat", "bissectrice_definition", 2, "Droit : 90°. Plat : 180°. Puis la moitié.", genBisE2DroitPlat),
  gabBis("bissectrice_definition_tpl_e2_nature", "bissectrice_definition", 2, "Calcule la moitié, puis compare à 90°.", genBisE2Nature),
  gabBis("bissectrice_construire_tpl_e2_ordre", "bissectrice_construire", 2, "On ne peut pas diviser une mesure qu’on n’a pas encore.", genBisCOrdre),
  gabBis("bissectrice_construire_tpl_e2_poser", "bissectrice_construire", 2, "Le centre du rapporteur va au sommet.", genBisCPoser),
  gabBis("bissectrice_construire_tpl_e2_pli", "bissectrice_construire", 2, "Le pli amène un côté sur l’autre.", genBisCPli),
  gabBis("bissectrice_construire_tpl_e2_inverse", "bissectrice_construire", 2, "La graduation est la moitié de l’angle.", genBisCInverse),
  gabBis("bissectrice_construire_tpl_e2_verifie", "bissectrice_construire", 2, "Calcule la moitié de l’angle, puis compare.", genBisCVerifie),
  gabBis("bissectrice_construire_tpl_e2_outil", "bissectrice_construire", 2, "Rapporteur : les angles. Règle : les traits.", genBisCOutil),
  gabBis("bissectrice_construire_tpl_e2_calcul", "bissectrice_construire", 2, "Divise la mesure par 2.", genBisCCalcul),
];
