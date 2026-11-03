import type { TutorBankItemV4, TutorGeneratedQuestionV4, AngleCanvasData, DroitesCanvasData } from "@/lib/tutor-v4/types";
import { PRENOMS, de, type Prenom } from "./entiers.bank";

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Des noms de points variés : l'angle n'est pas toujours AOB. Pas de O (pris
// pour le zéro) ni de Q (trop proche du O à l'écran).
const LETTRES = "ABCDEFGHIJKLMNPRSTUVWXYZ".split("");
function lettres(k: number): string[] {
  return shuffle(LETTRES).slice(0, k);
}

type NatureAngle = "nul" | "aigu" | "droit" | "obtus" | "plat" | "plein";

function natureAngle(v: number): NatureAngle {
  if (v === 0) return "nul";
  if (v < 90) return "aigu";
  if (v === 90) return "droit";
  if (v < 180) return "obtus";
  if (v === 180) return "plat";
  return "plein";
}

/**
 * Plusieurs demi-droites de même origine, chacune à sa direction (en degrés,
 * sens inverse des aiguilles d'une montre, 0 vers la droite). Le canvas
 * `angle` ne sait dessiner qu'un angle ; `droites` en pose plusieurs au même
 * sommet — angles adjacents, supplémentaires, opposés par le sommet.
 */
function figureRayons(sommet: string, rayons: Array<{ nom: string; deg: number }>): DroitesCanvasData {
  const O = { x: 170, y: 130 };
  const L = 105;
  const rad = (d: number) => (d * Math.PI) / 180;
  const bout = (d: number) => ({
    x: Math.round(O.x + L * Math.cos(rad(d))),
    y: Math.round(O.y - L * Math.sin(rad(d))),
  });
  return {
    kind: "droites",
    size: { width: 340, height: 260 },
    lines: rayons.map((r) => ({ id: `${sommet}${r.nom}`, type: "demi_droite" as const, from: O, to: bout(r.deg) })),
    points: [
      { x: O.x, y: O.y, label: sommet, highlight: true },
      ...rayons.map((r) => ({ ...bout(r.deg), label: r.nom })),
    ],
    display: { showLabels: true, showPoints: true },
  };
}

/** Un angle posé sur son rapporteur, sans la mesure écrite : c'est à l'élève de la lire. */
function angleAuRapporteur(
  deg: number,
  noms: { sommet: string; gauche: string; droite: string },
  echelle: "simple" | "double" = "simple",
): AngleCanvasData {
  return {
    kind: "angle",
    size: { width: 320, height: 240 },
    angle: {
      angleDeg: deg,
      labels: { vertex: noms.sommet, left: noms.gauche, right: noms.droite },
      display: { showLabels: true, showMeasure: false, showArc: true, showProtractor: true, protractorScale: echelle },
    },
  };
}

function expl(calcul: string) {
  return (
    "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
    "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
    "Calcul : " +
    calcul +
    "\n\nConclusion : on garde la réponse obtenue."
  );
}

// =========================
// ⭐ 06/10/2026 — SITUATIONS × TOURNURES × PRÉNOMS × NOMS DE POINTS
// (PASSATION-COACH-MATHS-6E-CONSIGNE.md). Mesuré le 06/10 : 8 à 15 squelettes
// par micro, 12 à 18 répétitions sur 20. Les élèves reconnaissent la PHRASE.
// Chaque gabarit compose maintenant un objet réel où l'on voit un angle, des
// noms de points tirés au sort, un prénom et une tournure. Les correcteurs
// (correcteurs/angles.ts) relisent la mesure, les noms des points ET le canvas.
// =========================

/** Un objet de la vie courante où l'on voit un angle, et les mesures plausibles. */
type ObjetAngle = { phrase: (p: Prenom) => string; cotes: string; min: number; max: number };
const OBJETS_ANGLE: ObjetAngle[] = [
  { phrase: (p) => `${p.nom} ouvre son compas.`, cotes: "les deux branches du compas", min: 10, max: 120 },
  { phrase: (p) => `${p.nom} ouvre une paire de ciseaux.`, cotes: "les deux lames des ciseaux", min: 10, max: 80 },
  { phrase: (p) => `${p.nom} coupe une part de pizza.`, cotes: "les deux bords de la part", min: 20, max: 90 },
  { phrase: (p) => `${p.nom} déplie un éventail.`, cotes: "les deux bords de l’éventail", min: 60, max: 180 },
  { phrase: (p) => `${p.nom} ouvre la porte de sa chambre.`, cotes: "le mur et la porte", min: 10, max: 120 },
  { phrase: (p) => `${p.nom} grimpe en haut du toboggan.`, cotes: "la pente du toboggan et le sol", min: 20, max: 60 },
  { phrase: (p) => `${p.nom} ouvre son ordinateur portable.`, cotes: "l’écran et le clavier", min: 90, max: 140 },
  { phrase: (p) => `${p.nom} ouvre un livre sur la table.`, cotes: "les deux moitiés du livre", min: 30, max: 180 },
  { phrase: (p) => `${p.nom} règle le dossier d’une chaise longue.`, cotes: "le dossier et l’assise", min: 100, max: 170 },
  { phrase: (p) => `${p.nom} pose une échelle contre le mur du jardin.`, cotes: "l’échelle et le sol", min: 60, max: 80 },
  { phrase: (p) => `${p.nom} écarte les bras pour danser.`, cotes: "ses deux bras", min: 30, max: 180 },
  { phrase: (p) => `${p.nom} photographie un oiseau en vol.`, cotes: "les deux ailes de l’oiseau", min: 60, max: 170 },
  { phrase: (p) => `${p.nom} monte sur une rampe de skate.`, cotes: "la rampe et le sol", min: 10, max: 45 },
  { phrase: (p) => `${p.nom} joue avec une grue.`, cotes: "le bras de la grue et le sol", min: 10, max: 80 },
  { phrase: (p) => `${p.nom} regarde l’horloge de la cuisine.`, cotes: "les deux aiguilles de l’horloge", min: 0, max: 180 },
  { phrase: (p) => `${p.nom} arrive à vélo à un carrefour.`, cotes: "les deux routes", min: 30, max: 150 },
];
/** Un objet où la mesure `v` est plausible. */
function objetPour(v: number): ObjetAngle {
  return pick(OBJETS_ANGLE.filter((o) => o.min <= v && v <= o.max));
}
/** « il » ou « elle ». */
const il = (p: Prenom) => (p.f ? "elle" : "il");
/** Un angle nommé : trois lettres, le sommet au milieu. */
type NomAngle = { g: string; s: string; d: string; nom: string };
function nomAngle(): NomAngle {
  const [g, s, d] = lettres(3);
  return { g, s, d, nom: `${g}${s}${d}` };
}
/** Un angle dessiné (sans rapporteur), nommé comme dans l'énoncé. */
function figureAngle(deg: number, n: NomAngle, opts: { mesure?: boolean; droit?: boolean } = {}): AngleCanvasData {
  return {
    kind: "angle",
    size: { width: 320, height: 240 },
    angle: {
      angleDeg: deg,
      labels: { vertex: n.s, left: n.g, right: n.d },
      display: { showLabels: true, showMeasure: !!opts.mesure, showArc: !opts.droit, showRightAngle: !!opts.droit },
    },
  };
}
/** Une mesure multiple de 5 entre a et b, différente de celles de `sauf`. */
function mesure5(a: number, b: number, sauf: number[] = []): number {
  const v = 5 * randomInt(Math.ceil(a / 5), Math.floor(b / 5));
  return sauf.includes(v) ? mesure5(a, b, sauf) : v;
}
function deuxPrenoms(): [Prenom, Prenom] {
  const p = pick(PRENOMS);
  let q = pick(PRENOMS);
  while (q.nom === p.nom) q = pick(PRENOMS);
  return [p, q];
}
/** Des objets qu'on ouvre plus ou moins : « Inès ouvre son compas à 40°. » */
const OUVRABLES = [
  { son: "son compas", sien: "le sien", min: 20, max: 120 },
  { son: "ses ciseaux", sien: "les siens", min: 10, max: 80 },
  { son: "son éventail", sien: "le sien", min: 60, max: 170 },
  { son: "son livre", sien: "le sien", min: 30, max: 170 },
  { son: "son ordinateur portable", sien: "le sien", min: 90, max: 140 },
  { son: "la porte de sa chambre", sien: "la sienne", min: 20, max: 120 },
];

// ⭐ 03/11/2026 (REGLES-6E.md) : à ★1-★2, des énoncés NUS — pas de prénom,
// pas d'objet, ★1 ≤ 12 mots, ★2 ≤ 15 mots. Les situations (compas, ciseaux,
// porte, prénoms…) ne sont pas jetées : elles passent dans les gabarits
// « _ctx3 » (★3), avec les mêmes correcteurs.

/** Comparer DEUX angles : la réponse est la mesure du plus grand ou du plus petit. */
function comparerDeux(plusGrand: boolean, ctx = false) {
  const [p, q] = deuxPrenoms();
  const cas = ctx ? randomInt(0, 2) : 3;
  const obj = pick(OUVRABLES);
  const [lo, hi] = cas === 2 ? [obj.min, obj.max] : [20, 170];
  const a = 10 * randomInt(Math.ceil(lo / 10), Math.floor(hi / 10));
  let b = a;
  while (Math.abs(b - a) < 20) b = 10 * randomInt(Math.ceil(lo / 10), Math.floor(hi / 10));
  const r = plusGrand ? Math.max(a, b) : Math.min(a, b);
  const mot = plusGrand ? "grand" : "petit";
  const [n1, n2] = [nomAngle(), nomAngle()];
  let text: string;
  if (cas === 0)
    text = pick([
      `${p.nom} mesure l’angle ${n1.nom} : ${a}°, puis l’angle ${n2.nom} : ${b}°. Quel angle est le plus ${mot} ? Donne sa mesure.`,
      `${p.nom} compare un angle de ${a}° et un angle de ${b}°. Quelle est la mesure du plus ${mot} ?`,
    ]);
  else if (cas === 1)
    text = pick([
      `${p.nom} trace un angle de ${a}°. ${q.nom} trace un angle de ${b}°. Donne la mesure du plus ${mot} des deux.`,
      `${p.nom} mesure ${a}° et ${q.nom} mesure ${b}°, chacun sur son angle. Quelle est la plus ${mot}e mesure ?`,
    ]);
  else if (cas === 2)
    text = `${p.nom} ouvre ${obj.son} à ${a}°. ${q.nom} ouvre ${obj.sien} à ${b}°. ${plusGrand ? "Quel est le plus grand angle d’ouverture" : "Quel est le plus petit angle d’ouverture"} ? Donne sa mesure.`;
  else
    // ★1 nu : 12 mots au plus.
    text = pick([
      `Quel angle est le plus ${mot} : ${a}° ou ${b}° ?`,
      `Deux angles mesurent ${a}° et ${b}°. Écris la mesure du plus ${mot}.`,
      `${n1.nom} = ${a}° et ${n2.nom} = ${b}°. Donne la mesure du plus ${mot}.`,
      `Écris la mesure du plus ${mot} angle : ${a}° ou ${b}°.`,
    ]);
  return {
    text,
    format: "short" as const,
    expected: [`${r}°`, String(r)],
    comparator: "number_equal" as const,
    explanation: expl(
      `On compare les nombres de degrés : ${Math.min(a, b)} < ${Math.max(a, b)}. Le plus ${mot} angle mesure ${r}°. La longueur des côtés ne compte pas.`,
    ),
  };
}

/** Comparer QUATRE angles nommés : la réponse est un nom d'angle. */
function comparerQuatre(plusGrand: boolean, ctx = false) {
  const ls = lettres(12);
  const noms = [0, 1, 2, 3].map((k) => ls.slice(3 * k, 3 * k + 3).join(""));
  const ms: number[] = [];
  while (ms.length < 4) {
    const v = mesure5(15, 175);
    if (ms.every((m) => Math.abs(m - v) >= 10)) ms.push(v);
  }
  const r = plusGrand ? Math.max(...ms) : Math.min(...ms);
  const bon = noms[ms.indexOf(r)];
  const p = pick(PRENOMS);
  const mot = plusGrand ? "le plus grand" : "le plus petit";
  let text: string;
  if (ctx) {
    const liste = noms.map((n, k) => `${n} mesure ${ms[k]}°`).join(", ");
    text = pick([
      `${p.nom} a mesuré quatre angles : ${liste}. Quel angle est ${mot} ?`,
      `Dans la figure ${de(p.nom)}, ${liste}. Quel angle est ${plusGrand ? "le plus ouvert" : "le moins ouvert"} ?`,
    ]);
  } else {
    // ★2 nu : « ABC = 40° », la liste se lit d'un coup d'œil.
    const liste = noms.map((n, k) => `${n} = ${ms[k]}°`).join(", ");
    text = pick([`Quel angle est ${mot} ? ${liste}.`, `Choisis ${mot} angle : ${liste}.`]);
  }
  return {
    text,
    format: "qcm" as const,
    choices: noms.map((n) => `l’angle ${n}`),
    expected: [`l’angle ${bon}`],
    comparator: "mcq_exact" as const,
    explanation: expl(`On compare les mesures : ${[...ms].sort((x, y) => x - y).join("° < ")}°. ${mot[0].toUpperCase()}${mot.slice(1)} est ${bon} (${r}°).`),
  };
}

/** Comparer un angle à l'angle droit, avec les lettres ou en situation (★3). */
const PETIT = "plus petit qu’un angle droit";
const GRAND = "plus grand qu’un angle droit";
const EGAL = "égal à un angle droit";
function comparerAuDroit(v: number, enSituation: boolean, intrus: string) {
  const p = pick(PRENOMS);
  const n = nomAngle();
  let text: string;
  if (enSituation) {
    const o = objetPour(v);
    text = pick([
      `${o.phrase(p)} L’angle entre ${o.cotes} mesure ${v}°. Cet angle est :`,
      `${o.phrase(p)} ${o.cotes[0].toUpperCase()}${o.cotes.slice(1)} font un angle de ${v}°. Compare-le à un angle droit.`,
      `${o.phrase(p)} ${p.f ? "Elle" : "Il"} mesure ${v}° entre ${o.cotes}. Que peut-on dire de cet angle ?`,
      `${p.nom} a tracé l’angle ${n.nom} de ${v}°. Cet angle est :`,
    ]);
  } else
    text = pick([
      `L’angle ${n.nom} mesure ${v}°. Compare-le à un angle droit.`,
      `Un angle de ${v}° est :`,
      `Compare un angle de ${v}° à un angle droit.`,
    ]);
  const juste = v < 90 ? PETIT : v > 90 ? GRAND : EGAL;
  return {
    text,
    format: "qcm" as const,
    choices: shuffle([PETIT, EGAL, GRAND, intrus]),
    expected: [juste],
    comparator: "mcq_exact" as const,
    explanation: expl(`Un angle droit mesure 90°. ${v} ${v < 90 ? "<" : ">"} 90 : l’angle de ${v}° est ${juste}.`),
    ...(!enSituation && text.includes(n.nom) ? { canvas: figureAngle(v, n, { mesure: true }) } : {}),
  };
}

/** ★2 nu et dessiné : on compare À L'ŒIL l'angle de la figure à un angle droit (pas de mesure écrite). */
function comparerAuDroitDessine(petit: boolean) {
  const n = nomAngle();
  const v = petit ? mesure5(15, 65) : mesure5(115, 170);
  const text = pick([
    `Observe l’angle ${n.nom}. Compare-le à un angle droit.`,
    `Regarde la figure. L’angle ${n.nom} est :`,
    `Sans mesurer, compare l’angle ${n.nom} à un angle droit.`,
  ]);
  const juste = petit ? PETIT : GRAND;
  return {
    text,
    format: "qcm" as const,
    choices: shuffle([PETIT, EGAL, GRAND]),
    expected: [juste],
    comparator: "mcq_exact" as const,
    explanation: expl(
      `Un angle droit a la forme du coin d’une équerre. L’angle ${n.nom} est ${petit ? "plus fermé" : "plus ouvert"} que ce coin : il est ${juste}.`,
    ),
    canvas: figureAngle(v, n),
  };
}

type G = TutorGeneratedQuestionV4;

// ----- Générateurs des gabarits ★1-★2 (nus) et ★3 (_ctx3, en situation).

/** Sommet, côtés, nom d'un angle (★1 nu) ; en situation : l'objet réel (★3). */
function genReconnaitre(ctx: boolean): G {
  const n = nomAngle();
  const v = mesure5(25, 155, [90]);
  const p = pick(PRENOMS);
  const cas = ctx ? pick([0, 1, 2, 2, 3]) : randomInt(0, 3);
  if (cas === 0) {
    const t = ctx
      ? `${p.nom} a tracé l’angle ${n.nom}. Quel point est son sommet ?`
      : pick([`Quel point est le sommet de l’angle ${n.nom} ?`, `Observe l’angle ${n.nom}. Quel est son sommet ?`]);
    return {
      text: t,
      format: "qcm",
      choices: shuffle([`le point ${n.s}`, `le point ${n.g}`, `le point ${n.d}`, "aucun de ces points"]),
      expected: [`le point ${n.s}`],
      comparator: "mcq_exact",
      explanation: expl(`Dans le nom ${n.nom}, la lettre du milieu est le sommet : c’est ${n.s}. Les deux côtés partent de ${n.s}.`),
      canvas: figureAngle(v, n),
    };
  }
  if (cas === 1) {
    const t = ctx
      ? `${p.nom} repasse en rouge les côtés de l’angle ${n.nom}. Lesquels ?`
      : pick([`Quels sont les côtés de l’angle ${n.nom} ?`, `L’angle ${n.nom} a pour côtés :`]);
    return {
      text: t,
      format: "qcm",
      choices: shuffle([
        `[${n.s}${n.g}) et [${n.s}${n.d})`,
        `[${n.g}${n.s}) et [${n.g}${n.d})`,
        `[${n.d}${n.g}) et [${n.d}${n.s})`,
        `[${n.g}${n.d}) et [${n.d}${n.g})`,
      ]),
      expected: [`[${n.s}${n.g}) et [${n.s}${n.d})`],
      comparator: "mcq_exact",
      explanation: expl(`Les côtés d’un angle sont deux demi-droites qui partent du sommet. Le sommet de ${n.nom} est ${n.s} : les côtés sont [${n.s}${n.g}) et [${n.s}${n.d}).`),
      canvas: figureAngle(v, n),
    };
  }
  if (cas === 2) {
    if (ctx) {
      const o = objetPour(v);
      const t = pick([
        `${o.phrase(p)} ${o.cotes[0].toUpperCase()}${o.cotes.slice(1)} forment un angle. Leur point commun s’appelle :`,
        `${o.phrase(p)} On regarde l’angle formé par ${o.cotes}. Comment s’appelle le point de départ commun ?`,
      ]);
      return {
        text: t,
        format: "qcm",
        choices: shuffle(["le sommet", "le centre", "le milieu", "la graduation"]),
        expected: ["le sommet"],
        comparator: "mcq_exact",
        explanation: expl("Les deux côtés d’un angle partent d’un même point : c’est le sommet de l’angle."),
      };
    }
    // Nu : le point du milieu, montré sur la figure.
    return {
      text: pick([`Comment s’appelle le point ${n.s} de l’angle ${n.nom} ?`, `Dans l’angle ${n.nom}, le point ${n.s} est :`]),
      format: "qcm",
      choices: shuffle(["le sommet", "le centre", "le milieu", "un côté"]),
      expected: ["le sommet"],
      comparator: "mcq_exact",
      explanation: expl(`${n.s} est la lettre du milieu de ${n.nom} : les deux côtés partent de ${n.s}. C’est le sommet.`),
      canvas: figureAngle(v, n),
    };
  }
  const t = ctx
    ? `${p.nom} trace [${n.s}${n.g}) et [${n.s}${n.d}). Quel nom donne-t-${il(p)} à l’angle obtenu ?`
    : pick([
        `Les demi-droites [${n.s}${n.g}) et [${n.s}${n.d}) forment un angle. Comment le nomme-t-on ?`,
        `Nomme l’angle formé par [${n.s}${n.g}) et [${n.s}${n.d}).`,
      ]);
  return {
    text: t,
    format: "qcm",
    choices: shuffle([n.nom, `${n.s}${n.g}${n.d}`, `${n.g}${n.d}${n.s}`, `${n.s}${n.d}${n.g}`]),
    expected: [n.nom],
    comparator: "mcq_exact",
    explanation: expl(`Le sommet s’écrit au MILIEU du nom. Le sommet est ${n.s} : l’angle s’appelle ${n.nom} (ou ${n.d}${n.s}${n.g}).`),
    canvas: figureAngle(v, n),
  };
}

/** De quoi est fait un angle, et sa nature d'après sa mesure (★2 nu ; ★3 en situation). */
function genReconnaitreQcm(ctx: boolean): G {
  const n = nomAngle();
  const p = pick(PRENOMS);
  if (Math.random() < 0.3) {
    const t = ctx
      ? `${p.nom} dessine l’angle ${n.nom}. Que trace-t-${il(p)} ?`
      : pick([`L’angle ${n.nom} est formé par :`, `De quoi est fait l’angle ${n.nom} ?`]);
    const v = mesure5(25, 155, [90]);
    return {
      text: t,
      format: "qcm",
      choices: shuffle([
        `deux demi-droites d’origine ${n.s}`,
        `deux demi-droites d’origine ${n.g}`,
        `trois segments [${n.g}${n.s}], [${n.s}${n.d}] et [${n.g}${n.d}]`,
        `un cercle de centre ${n.s}`,
      ]),
      expected: [`deux demi-droites d’origine ${n.s}`],
      comparator: "mcq_exact",
      explanation: expl(`Un angle est formé par deux demi-droites de même origine. Ici, l’origine commune est le sommet ${n.s} : [${n.s}${n.g}) et [${n.s}${n.d}).`),
      canvas: figureAngle(v, n),
    };
  }
  // Nature d'après une mesure franche (loin de 90°) : le piège fin est à ★3.
  const v = pick([mesure5(15, 70), mesure5(15, 70), mesure5(110, 170), mesure5(110, 170), 90, 180]);
  const nature = natureAngle(v);
  const o = objetPour(v);
  const t = ctx
    ? pick([
        `${o.phrase(p)} L’angle ${n.nom} formé par ${o.cotes} mesure ${v}°. C’est un angle :`,
        `${o.phrase(p)} ${p.f ? "Elle" : "Il"} mesure l’angle entre ${o.cotes} : ${v}°. Cet angle est :`,
        `${p.nom} lit ${v}° sur son rapporteur pour l’angle ${n.nom}. Cet angle est :`,
      ])
    : pick([
        `L’angle ${n.nom} mesure ${v}°. Comment s’appelle cet angle ?`,
        `L’angle ${n.nom} mesure ${v}°. C’est un angle :`,
        `Un angle mesure ${v}°. Est-il aigu, droit, obtus ou plat ?`,
      ]);
  const regle: Record<string, string> = {
    aigu: `${v}° est plus petit que 90° : l’angle est aigu.`,
    droit: "90° : c’est un angle droit.",
    obtus: `${v}° est entre 90° et 180° : l’angle est obtus.`,
    plat: "180° : les deux côtés sont alignés, c’est un angle plat.",
  };
  return {
    text: t,
    format: "qcm",
    choices: shuffle(["aigu", "droit", "obtus", "plat"]),
    expected: [nature],
    comparator: "mcq_exact",
    explanation: expl(regle[nature]),
    ...(v < 180 && t.includes(n.nom) ? { canvas: figureAngle(v, n, { mesure: true, droit: v === 90 }) } : {}),
  };
}

/** Le coin d'une figure est droit : 90° (★1 nu) ; le coin d'un objet réel (★3). */
function genDroitCoin(ctx: boolean): G {
  let text: string;
  if (ctx) {
    const p = pick(PRENOMS);
    const coin = pick([
      "le coin d’une feuille de papier", "le coin d’un carreau de la cuisine", "le coin d’une porte",
      "le coin du tableau de la classe", "le coin d’un écran de téléphone", "le coin d’un terrain de foot",
      "le coin d’une boîte à chaussures", "le coin de son cahier", "le coin d’une fenêtre",
      "le coin d’une table rectangulaire", "le coin d’une carte postale", "le coin d’un échiquier",
      "le coin d’un panneau de basket", "le coin d’une tablette de chocolat",
    ]);
    const debut = pick([
      `${p.nom} pose son équerre sur ${coin} : elle colle parfaitement.`,
      `${p.nom} observe ${coin}. C’est un angle droit.`,
      `${coin[0].toUpperCase()}${coin.slice(1)} forme un angle droit, vérifie ${p.nom} avec son équerre.`,
    ]);
    const fin = pick(["Combien mesure cet angle ?", "Quelle est la mesure de cet angle, en degrés ?", "Complète : cet angle mesure … °.", "Donne la mesure de cet angle."]);
    text = `${debut} ${fin}`;
  } else {
    const coin = pick(["Le coin d’un carré", "Le coin d’un rectangle"]);
    text = pick([
      `${coin} est un angle droit. Combien mesure-t-il ?`,
      `${coin} forme un angle droit. Donne sa mesure.`,
      `${coin} est un angle droit. Complète : il mesure … °.`,
    ]);
  }
  return {
    text,
    format: "short",
    expected: ["90°", "90"],
    comparator: "number_equal",
    explanation: expl("Un angle droit mesure toujours 90°, quelle que soit la taille de la figure."),
  };
}

/** Quatre angles nommés, un seul droit : la réponse est un NOM d'angle. */
function genDroitListe(ctx: boolean): G {
  const ls = lettres(12);
  const noms = [0, 1, 2, 3].map((k) => ls.slice(3 * k, 3 * k + 3).join(""));
  const m1 = mesure5(20, 80);
  const m2 = mesure5(100, 175);
  const mesures = shuffle([90, m1, m2, mesure5(20, 175, [90, m1, m2])]);
  const droit = noms[mesures.indexOf(90)];
  const p = pick(PRENOMS);
  let t: string;
  if (ctx) {
    const liste = noms.map((n, k) => `${n} mesure ${mesures[k]}°`).join(", ");
    t = pick([
      `${p.nom} a mesuré quatre angles : ${liste}. Quel angle est droit ?`,
      `Dans la figure ${de(p.nom)}, ${liste}. Où dessine-t-${il(p)} le petit carré ?`,
    ]);
  } else {
    const liste = noms.map((n, k) => `${n} = ${mesures[k]}°`).join(", ");
    t = pick([`Quel angle est droit ? ${liste}.`, `Choisis l’angle droit : ${liste}.`]);
  }
  return {
    text: t,
    format: "qcm",
    choices: noms.map((n) => `l’angle ${n}`),
    expected: [`l’angle ${droit}`],
    comparator: "mcq_exact",
    explanation: expl(`Un angle droit mesure exactement 90°. Ici, c’est l’angle ${droit}.`),
  };
}

/** Cet angle est-il droit ? (★2 nu ; ★3 en situation) */
function genDroitOuiNon(ctx: boolean): G {
  const n = nomAngle();
  const p = pick(PRENOMS);
  const v = Math.random() < 0.4 ? 90 : mesure5(40, 140, [90]);
  const o = objetPour(v);
  const t = ctx
    ? pick([
        `${p.nom} mesure l’angle ${n.nom} : ${v}°. Cet angle est-il droit ?`,
        `${o.phrase(p)} L’angle entre ${o.cotes} mesure ${v}°. Est-ce un angle droit ?`,
        `${p.nom} lit ${v}° sur son rapporteur. A-t-${il(p)} mesuré un angle droit ?`,
      ])
    : pick([
        `L’angle ${n.nom} mesure ${v}°. Est-ce un angle droit ?`,
        `Un angle mesure ${v}°. Est-il droit ?`,
        `Observe l’angle ${n.nom} de ${v}°. Est-il droit ?`,
      ]);
  const juste = v === 90 ? "oui, il mesure 90°" : v < 90 ? "non, il est plus petit qu’un angle droit" : "non, il est plus grand qu’un angle droit";
  return {
    text: t,
    format: "qcm",
    choices: shuffle(["oui, il mesure 90°", "non, il est plus petit qu’un angle droit", "non, il est plus grand qu’un angle droit"]),
    expected: [juste],
    comparator: "mcq_exact",
    explanation: expl(v === 90 ? "90° pile : c’est un angle droit." : `${v}° n’est pas 90°. ${v < 90 ? `${v} < 90 : l’angle est plus petit` : `${v} > 90 : l’angle est plus grand`} qu’un angle droit.`),
    ...(t.includes(n.nom) ? { canvas: figureAngle(v, n, { mesure: true, droit: v === 90 }) } : {}),
  };
}

/** L'instrument ou l'unité pour mesurer un angle (★1 nu, figure dessinée ; ★3 en situation). */
function genMesurerInstrument(ctx: boolean): G {
  const p = pick(PRENOMS);
  const n = nomAngle();
  const instrument = Math.random() < 0.5;
  let t: string;
  if (ctx) {
    const o = pick(OBJETS_ANGLE);
    const quoi = pick([`l’angle ${n.nom} de sa figure`, `l’angle entre ${o.cotes}`, `l’angle ${n.nom} dessiné au tableau`]);
    const intro = quoi.includes("entre") ? `${o.phrase(p)} ${p.f ? "Elle" : "Il"} veut mesurer ${quoi}.` : `${p.nom} veut mesurer ${quoi}.`;
    t = instrument
      ? pick([`${intro} Quel instrument prend-${il(p)} ?`, `${intro} Avec quoi peut-${il(p)} le faire ?`, `${intro} Quel outil faut-il ?`])
      : pick([`${intro} Dans quelle unité va-t-${il(p)} écrire le résultat ?`, `${intro} En quelle unité s’exprime la mesure ?`]);
  } else
    t = instrument
      ? pick([`Avec quel instrument mesures-tu l’angle ${n.nom} ?`, `Mesure l’angle ${n.nom}. Quel instrument prends-tu ?`])
      : pick([`En quelle unité mesures-tu l’angle ${n.nom} ?`, `La mesure de l’angle ${n.nom} s’écrit dans quelle unité ?`]);
  const canvas = ctx ? {} : { canvas: figureAngle(mesure5(30, 150, [90]), n) };
  if (instrument)
    return {
      text: t,
      format: "qcm",
      choices: shuffle(["un rapporteur", "une règle graduée", "un compas", "une équerre"]),
      expected: ["un rapporteur"],
      comparator: "mcq_exact",
      explanation: expl("Le rapporteur est gradué en degrés : il sert à mesurer les angles. L’équerre ne vérifie que l’angle droit, la règle mesure des longueurs."),
      ...canvas,
    };
  return {
    text: t,
    format: "qcm",
    choices: shuffle(["en degrés", "en centimètres", "en mètres", "en grammes"]),
    expected: ["en degrés"],
    comparator: "mcq_exact",
    explanation: expl("Un angle se mesure en degrés (symbole °). La taille des côtés ne compte pas."),
    ...canvas,
  };
}

/** La méthode du rapporteur, avec les noms de points de l'angle (★2 nu ; ★3 avec un prénom). */
function genMesurerMethode(ctx: boolean): G {
  const p = pick(PRENOMS);
  const n = nomAngle();
  const cas = randomInt(0, 2);
  if (cas === 0) {
    const t = ctx
      ? pick([
          `Pour mesurer l’angle ${n.nom}, où ${p.nom} place-t-${il(p)} le centre du rapporteur ?`,
          `${p.nom} mesure l’angle ${n.nom}. Sur quel point pose-t-${il(p)} le centre du rapporteur ?`,
        ])
      : pick([
          `Pour mesurer l’angle ${n.nom}, où poses-tu le centre du rapporteur ?`,
          `On mesure l’angle ${n.nom}. Où met-on le centre du rapporteur ?`,
        ]);
    return {
      text: t,
      format: "qcm",
      choices: shuffle([`sur le point ${n.s}`, `sur le point ${n.g}`, `sur le point ${n.d}`, `au milieu de [${n.g}${n.d}]`]),
      expected: [`sur le point ${n.s}`],
      comparator: "mcq_exact",
      explanation: expl(`Le centre du rapporteur se pose sur le sommet. Le sommet de ${n.nom} est la lettre du milieu : ${n.s}.`),
      canvas: figureAngle(mesure5(30, 150, [90]), n),
    };
  }
  if (cas === 1) {
    const t = ctx
      ? `${p.nom} mesure l’angle ${n.nom}. ${p.f ? "Elle" : "Il"} pose le centre du rapporteur sur ${n.s} et le 0 sur [${n.s}${n.d}). Sur quel côté lit-${il(p)} la mesure ?`
      : pick([
          `Le 0 du rapporteur est sur [${n.s}${n.d}). Où lis-tu la mesure de l’angle ${n.nom} ?`,
          `Angle ${n.nom} : le 0 du rapporteur est sur [${n.s}${n.d}). Où lis-tu la mesure ?`,
        ]);
    return {
      text: t,
      format: "qcm",
      choices: shuffle([`sur [${n.s}${n.g})`, `sur [${n.s}${n.d})`, `sur [${n.g}${n.d}]`, `sur [${n.d}${n.g})`]),
      expected: [`sur [${n.s}${n.g})`],
      comparator: "mcq_exact",
      explanation: expl(`Le 0 est sur un côté, [${n.s}${n.d}). On lit la mesure là où passe l’AUTRE côté : [${n.s}${n.g}).`),
      canvas: figureAngle(mesure5(30, 150, [90]), n),
    };
  }
  // Les deux graduations : aigu ou obtus tranche.
  const v = pick([20, 30, 40, 50, 60, 70, 80, 100, 110, 120, 130, 140, 150, 160]);
  const w = 180 - v;
  const nat = v < 90 ? "aigu" : "obtus";
  const [x, y] = shuffle([v, w]);
  const t = ctx
    ? pick([
        `L’angle ${n.nom} est ${nat}. Sur le rapporteur, ${p.nom} lit ${x}° sur une graduation et ${y}° sur l’autre. Quelle est sa mesure ?`,
        `${p.nom} hésite pour l’angle ${n.nom}, qui est ${nat} : ${x}° ou ${y}° ? Quelle est la bonne mesure ?`,
      ])
    : pick([
        `L’angle ${n.nom} est ${nat}. Le rapporteur indique ${x}° et ${y}°. Quelle est sa mesure ?`,
        `L’angle ${n.nom} est ${nat} : ${x}° ou ${y}° ? Choisis sa mesure.`,
      ]);
  return {
    text: t,
    format: "qcm",
    choices: shuffle([`${v}°`, `${w}°`]),
    expected: [`${v}°`],
    comparator: "mcq_exact",
    explanation: expl(`Un angle ${nat} mesure ${nat === "aigu" ? "moins" : "plus"} de 90°. Entre ${v}° et ${w}°, c’est donc ${v}°.`),
    canvas: figureAngle(v, n),
  };
}

/** Tracer un angle : l'instrument, la graduation, la nature prévue (★2 nu ; ★3 avec un prénom). */
function genTracer(ctx: boolean): G {
  const p = pick(PRENOMS);
  const n = nomAngle();
  const v = mesure5(20, 160, [90]);
  const cas = randomInt(0, 2);
  if (cas === 0) {
    const t = ctx
      ? pick([
          `${p.nom} doit tracer l’angle ${n.nom} de ${v}°. Quel instrument lui faut-il ?`,
          `Pour tracer un angle de ${v}°, ${p.nom} sort sa trousse. Que prend-${il(p)} ?`,
        ])
      : pick([`Quel instrument faut-il pour tracer un angle de ${v}° ?`, `Tu traces l’angle ${n.nom} de ${v}°. Quel instrument prends-tu ?`]);
    return {
      text: t,
      format: "qcm",
      choices: shuffle(["un rapporteur", "une équerre", "un compas", "une gomme"]),
      expected: ["un rapporteur"],
      comparator: "mcq_exact",
      explanation: expl(`Pour obtenir ${v}°, il faut un instrument gradué en degrés : le rapporteur. L’équerre ne donne que 90°.`),
    };
  }
  if (cas === 1) {
    const t = ctx
      ? `${p.nom} trace l’angle ${n.nom} de ${v}°. ${p.f ? "Elle" : "Il"} pose le 0 du rapporteur sur [${n.s}${n.d}). À quelle graduation fait-${il(p)} son repère ?`
      : `Angle ${n.nom} de ${v}° : le 0 du rapporteur est sur [${n.s}${n.d}). Quelle graduation prends-tu ?`;
    const w = 180 - v;
    const leurres = [...new Set([w, v + 10, v - 10, v + 20])].filter((x) => x !== v).slice(0, 3);
    return {
      text: t,
      format: "qcm",
      choices: shuffle([`${v}°`, ...leurres.map((x) => `${x}°`)]),
      expected: [`${v}°`],
      comparator: "mcq_exact",
      explanation: expl(`On compte à partir du 0 posé sur [${n.s}${n.d}) jusqu’à ${v}. Contrôle : ${v < 90 ? "l’angle sera aigu" : "l’angle sera obtus"}, donc ${w}° est la lecture sur la mauvaise graduation.`),
      canvas: figureAngle(v, n, { mesure: true }),
    };
  }
  const t = ctx
    ? `${p.nom} trace au rapporteur un angle ${n.nom} de ${v}°. Quelle sorte d’angle obtient-${il(p)} ?`
    : pick([`Tu traces un angle de ${v}°. Cet angle sera :`, `On trace l’angle ${n.nom} de ${v}°. Cet angle sera :`]);
  return {
    text: t,
    format: "qcm",
    choices: shuffle(["aigu", "droit", "obtus", "plat"]),
    expected: [v < 90 ? "aigu" : "obtus"],
    comparator: "mcq_exact",
    explanation: expl(`${v}° est ${v < 90 ? "plus petit" : "plus grand"} que 90° : l’angle sera ${v < 90 ? "aigu" : "obtus"}.`),
  };
}

/** L'ordre des étapes, avec les lettres de l'angle à tracer. */
function genEtapes(ctx: boolean): G {
  const p = pick(PRENOMS);
  const n = nomAngle();
  const v = mesure5(20, 160, [90]);
  const etapes = [
    `tracer [${n.s}${n.d})`,
    `poser le centre du rapporteur sur ${n.s} et le 0 sur [${n.s}${n.d})`,
    `faire un repère à ${v}°`,
    `tracer [${n.s}${n.g}) en passant par le repère`,
  ];
  const k = randomInt(0, 3);
  const mot = ["la première", "la deuxième", "la troisième", "la dernière"][k];
  const t = ctx
    ? `${p.nom} trace l’angle ${n.nom} de ${v}°. Quelle est ${mot} étape ?`
    : pick([`Pour tracer l’angle ${n.nom} de ${v}° au rapporteur, quelle est ${mot} étape ?`, `Tu traces l’angle ${n.nom} de ${v}°. Quelle est ${mot} étape ?`]);
  return {
    text: t,
    format: "qcm",
    choices: shuffle([...etapes]),
    expected: [etapes[k]],
    comparator: "mcq_exact",
    explanation: expl(`Dans l’ordre : 1) ${etapes[0]} ; 2) ${etapes[1]} ; 3) ${etapes[2]} ; 4) ${etapes[3]}.`),
  };
}

/** Un gabarit de la notion angle_mesure. */
function gabarit(id: string, microId: string, difficulty: number, hint: string, tags: string[], generate: () => G): TutorBankItemV4 {
  return { kind: "template", id, niveau: "6e", matiere: "maths", notionId: "angle_mesure", microId, difficulty, theme: "neutral", hint, tags, generate } as TutorBankItemV4;
}

export const anglesBank: TutorBankItemV4[] = [
  // =========================
  // ANGLE_RECONNAITRE
  // =========================
  {
    kind: "fixed",
    id: "angle_reconnaitre_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    // ⭐ 06/10 : QCM — le mot-clé « 2 » acceptait toute réponse contenant un 2.
    text: "Un angle est formé par combien de demi-droites ?",
    format: "qcm",
    choices: ["une", "deux", "trois", "quatre"],
    expected: ["deux"],
    comparator: "mcq_exact",
    hint: "Elles ont la même origine.",
    explanation:
      "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
      "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
      "Calcul : " +
      ("Un angle est formé par deux demi-droites qui partent du même point. Ce point commun s’appelle le sommet de l’angle.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["angle_mesure", "reconnaitre"],
  },
  {
    kind: "fixed",
    id: "angle_reconnaitre_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    // 08/10/2026 : précise et corrigée strictement (Frédéric).
    text: "Comment s’appelle le point commun aux deux côtés d’un angle ?",
    format: "qcm",
    choices: ["le sommet", "le milieu", "le centre", "le côté"],
    expected: ["le sommet"],
    comparator: "mcq_exact",
    hint: "C’est le point de départ des deux demi-droites.",
    explanation:
      "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
      "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
      "Calcul : " +
      ("Les deux côtés d’un angle partent du même point. Ce point commun s’appelle le sommet.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["angle_mesure", "reconnaitre", "vocabulaire"],
  },
  {
    kind: "fixed",
    id: "angle_reconnaitre_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Un angle est formé par :",
    format: "qcm",
    choices: [
      "deux segments sans lien",
      "deux demi-droites de même origine",
      "trois droites",
      "un cercle et un segment",
    ],
    expected: ["deux demi-droites de même origine"],
    comparator: "mcq_exact",
    hint: "Les deux côtés partent du même point.",
    explanation:
      "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
      "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
      "Calcul : " +
      ("Un angle est formé par deux demi-droites de même origine. Leur point commun est le sommet.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["angle_mesure", "reconnaitre", "qcm"],
  },
  {
    kind: "fixed",
    id: "angle_reconnaitre_qcm_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Dans un angle, le point commun aux deux côtés est :",
    format: "qcm",
    choices: ["le milieu", "le centre", "le sommet", "la base"],
    expected: ["le sommet"],
    comparator: "mcq_exact",
    hint: "C’est le point où les deux côtés se rencontrent.",
    explanation:
      "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
      "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
      "Calcul : " +
      ("Le point commun aux deux côtés d’un angle s’appelle le sommet.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["angle_mesure", "reconnaitre", "qcm"],
  },

  // =========================
  // ANGLE_DROIT
  // =========================
  {
    kind: "fixed",
    id: "angle_droit_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_droit",
    difficulty: 1,
    theme: "neutral",
    text: "Un angle droit mesure combien de degrés ?",
    format: "short",
    expected: ["90", "90°"],
    comparator: "number_equal",
    hint: "Le coin d’un carré mesure 90°.",
    explanation:
      "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
      "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
      "Calcul : " +
      ("Un angle droit a toujours la même mesure : 90 degrés. On le retrouve par exemple dans les coins d’un carré ou d’un rectangle.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["angle_mesure", "angle_droit"],
  },
  {
    kind: "fixed",
    id: "angle_droit_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_droit",
    difficulty: 1,
    theme: "neutral",
    text: "Complète : un angle droit mesure ___ degrés.",
    format: "short",
    expected: ["90", "90°"],
    comparator: "number_equal",
    hint: "Un angle droit vaut toujours 90°.",
    explanation:
      "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
      "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
      "Calcul : " +
      ("Par définition, un angle droit mesure 90 degrés.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["angle_mesure", "angle_droit"],
  },
  {
    kind: "fixed",
    id: "angle_droit_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_droit",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle est la mesure d’un angle droit ?",
    format: "short",
    expected: ["90", "90°"],
    comparator: "number_equal",
    hint: "Toujours 90°.",
    explanation:
      "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
      "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
      "Calcul : " +
      ("Un angle droit se reconnaît à sa mesure : 90°.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["angle_mesure", "angle_droit"],
  },
  {
    kind: "fixed",
    id: "angle_droit_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_droit",
    difficulty: 2,
    theme: "neutral",
    text: "Coche la mesure d’un angle droit.",
    format: "qcm",
    choices: ["45°", "90°", "100°", "180°"],
    expected: ["90°"],
    comparator: "mcq_exact",
    hint: "Un angle droit mesure 90°.",
    explanation:
      "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
      "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
      "Calcul : " +
      ("Parmi les mesures proposées, seule 90° correspond à un angle droit.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["angle_mesure", "angle_droit", "qcm"],
  },
  {
    kind: "fixed",
    id: "angle_droit_qcm_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_droit",
    difficulty: 2,
    theme: "neutral",
    text: "Choisis la mesure d’un angle droit.",
    format: "qcm",
    choices: ["60°", "90°", "120°", "150°"],
    expected: ["90°"],
    comparator: "mcq_exact",
    hint: "Le bon choix est 90°.",
    explanation:
      "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
      "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
      "Calcul : " +
      ("Un angle droit ne mesure ni 60°, ni 120°, ni 150°. Il mesure exactement 90°.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["angle_mesure", "angle_droit", "qcm"],
  },
  {
    kind: "fixed",
    id: "angle_droit_qcm_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_droit",
    difficulty: 2,
    theme: "neutral",
    text: "Quel angle a la même mesure qu’un coin de rectangle ?",
    format: "qcm",
    choices: ["45°", "90°", "135°", "180°"],
    expected: ["90°"],
    comparator: "mcq_exact",
    hint: "Tous les angles d’un rectangle sont droits.",
    explanation:
      "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
      "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
      "Calcul : " +
      ("Les coins d’un rectangle sont des angles droits. Ils mesurent donc 90°.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["angle_mesure", "angle_droit", "qcm"],
  },

  // =========================
  // ANGLE_COMPARE
  // =========================
  {
    kind: "fixed",
    id: "angle_comparer_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_comparer",
    difficulty: 1,
    theme: "neutral",
    text: "Quel angle est le plus grand : 30° ou 80° ?",
    format: "short",
    expected: ["80", "80°"],
    comparator: "number_equal",
    hint: "Compare les nombres.",
    explanation:
      "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
      "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
      "Calcul : " +
      ("Pour comparer deux angles donnés en degrés, on compare leurs mesures. Comme 80 est plus grand que 30, l’angle de 80° est le plus grand.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["angle_mesure", "comparaison"],
  },
  {
    kind: "fixed",
    id: "angle_comparer_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_comparer",
    difficulty: 1,
    theme: "neutral",
    text: "Quel angle est le plus petit : 120° ou 70° ?",
    format: "short",
    expected: ["70", "70°"],
    comparator: "number_equal",
    hint: "Le plus petit angle a la plus petite mesure.",
    explanation:
      "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
      "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
      "Calcul : " +
      ("Comme 70 est plus petit que 120, l’angle de 70° est le plus petit.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["angle_mesure", "comparaison"],
  },
  {
    kind: "fixed",
    id: "angle_comparer_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_comparer",
    difficulty: 1,
    theme: "neutral",
    text: "Quel angle est le plus grand : 45° ou 95° ?",
    format: "short",
    expected: ["95", "95°"],
    comparator: "number_equal",
    hint: "Cherche la plus grande mesure.",
    explanation:
      "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
      "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
      "Calcul : " +
      ("95° est plus grand que 45°. Donc l’angle de 95° est le plus grand.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["angle_mesure", "comparaison"],
  },
  {
    kind: "fixed",
    id: "angle_comparer_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_comparer",
    difficulty: 1,
    theme: "neutral",
    text: "Quel angle est le plus petit : 85° ou 55° ?",
    format: "short",
    expected: ["55", "55°"],
    comparator: "number_equal",
    hint: "Compare les deux nombres.",
    explanation:
      "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
      "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
      "Calcul : " +
      ("Comme 55 est plus petit que 85, l’angle de 55° est le plus petit.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["angle_mesure", "comparaison"],
  },
  {
    kind: "fixed",
    id: "angle_comparer_fixed_5",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_comparer",
    difficulty: 2,
    theme: "neutral",
    // 08/10/2026 : précise et corrigée strictement (Frédéric).
    text: "Un angle mesure 45°. Comparé à un angle droit, il est :",
    format: "qcm",
    choices: ["plus petit", "égal", "plus grand"],
    expected: ["plus petit"],
    comparator: "mcq_exact",
    hint: "Un angle droit mesure 90°.",
    explanation:
      "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
      "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
      "Calcul : " +
      ("Un angle droit mesure 90°. Comme 45° est inférieur à 90°, un angle de 45° est plus petit qu’un angle droit.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["angle_mesure", "comparaison", "angle_droit"],
  },
  {
    kind: "fixed",
    id: "angle_comparer_fixed_6",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_comparer",
    difficulty: 2,
    theme: "neutral",
    // 08/10/2026 : précise et corrigée strictement (Frédéric).
    text: "Un angle mesure 120°. Comparé à un angle droit, il est :",
    format: "qcm",
    choices: ["plus petit", "égal", "plus grand"],
    expected: ["plus grand"],
    comparator: "mcq_exact",
    hint: "Compare 120° à 90°.",
    explanation:
      "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
      "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
      "Calcul : " +
      ("Un angle droit mesure 90°. Comme 120° est supérieur à 90°, un angle de 120° est plus grand qu’un angle droit.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["angle_mesure", "comparaison", "angle_droit"],
  },
  {
    kind: "fixed",
    id: "angle_comparer_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Quel angle est le plus grand ?",
    format: "qcm",
    choices: ["25°", "65°", "85°", "45°"],
    expected: ["85°"],
    comparator: "mcq_exact",
    hint: "Cherche le plus grand nombre.",
    explanation:
      "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
      "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
      "Calcul : " +
      ("Parmi 25°, 65°, 85° et 45°, la plus grande mesure est 85°.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["angle_mesure", "comparaison", "qcm"],
  },
  {
    kind: "fixed",
    id: "angle_comparer_qcm_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Quel angle est le plus petit ?",
    format: "qcm",
    choices: ["110°", "95°", "70°", "100°"],
    expected: ["70°"],
    comparator: "mcq_exact",
    hint: "Cherche le plus petit nombre.",
    explanation:
      "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
      "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
      "Calcul : " +
      ("Parmi les mesures proposées, 70° est la plus petite.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["angle_mesure", "comparaison", "qcm"],
  },
  {
    kind: "fixed",
    id: "angle_comparer_qcm_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Choisis l’angle le plus grand.",
    format: "qcm",
    choices: ["40°", "75°", "55°", "65°"],
    expected: ["75°"],
    comparator: "mcq_exact",
    hint: "Compare les quatre mesures.",
    explanation:
      "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
      "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
      "Calcul : " +
      ("75° est plus grand que 40°, 55° et 65°. C’est donc le plus grand angle.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["angle_mesure", "comparaison", "qcm"],
  },
  {
    kind: "fixed",
    id: "angle_comparer_qcm_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Choisis l’angle le plus petit.",
    format: "qcm",
    choices: ["35°", "25°", "45°", "30°"],
    expected: ["25°"],
    comparator: "mcq_exact",
    hint: "L’angle le plus petit a la mesure la plus petite.",
    explanation:
      "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
      "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
      "Calcul : " +
      ("25° est la plus petite des quatre mesures proposées.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["angle_mesure", "comparaison", "qcm"],
  },
  {
    kind: "fixed",
    id: "angle_comparer_qcm_5",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Un angle de 60° est :",
    format: "qcm",
    choices: [
      "plus petit qu’un angle droit",
      "égal à un angle droit",
      "plus grand qu’un angle droit",
      "impossible à savoir",
    ],
    expected: ["plus petit qu’un angle droit"],
    comparator: "mcq_exact",
    hint: "Un angle droit mesure 90°.",
    explanation:
      "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
      "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
      "Calcul : " +
      ("Comme 60° est inférieur à 90°, cet angle est plus petit qu’un angle droit.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["angle_mesure", "comparaison", "qcm", "angle_droit"],
  },
  {
    kind: "fixed",
    id: "angle_comparer_qcm_6",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Un angle de 100° est :",
    format: "qcm",
    choices: [
      "plus petit qu’un angle droit",
      "égal à un angle droit",
      "plus grand qu’un angle droit",
      "nul",
    ],
    expected: ["plus grand qu’un angle droit"],
    comparator: "mcq_exact",
    hint: "Compare 100° à 90°.",
    explanation:
      "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
      "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
      "Calcul : " +
      ("Comme 100° est supérieur à 90°, cet angle est plus grand qu’un angle droit.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["angle_mesure", "comparaison", "qcm", "angle_droit"],
  },

  // =========================
  // ANGLE_MESURER
  // =========================
  {
    kind: "fixed",
    id: "angle_mesurer_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_mesurer",
    difficulty: 1,
    theme: "neutral",
    // 08/10/2026 : précise et corrigée strictement (Frédéric).
    text: "Avec quel instrument mesure-t-on un angle en degrés ?",
    format: "qcm",
    choices: ["l’équerre", "le rapporteur", "le compas", "la règle graduée"],
    expected: ["le rapporteur"],
    comparator: "mcq_exact",
    hint: "C’est l’instrument gradué utilisé en géométrie.",
    explanation:
      "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
      "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
      "Calcul : " +
      ("Pour mesurer un angle, on utilise un rapporteur. Il est gradué en degrés.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["angle_mesure", "mesure", "instrument"],
  },
  {
    kind: "fixed",
    id: "angle_mesurer_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_mesurer",
    difficulty: 2,
    theme: "neutral",
    // ⭐ 06/10 : QCM — le mot-clé « ° » acceptait toute mesure, « 45° » compris.
    text: "En quelle unité mesure-t-on un angle ?",
    format: "qcm",
    choices: ["en centimètres", "en degrés", "en mètres carrés", "en litres"],
    expected: ["en degrés"],
    comparator: "mcq_exact",
    hint: "On note souvent cette unité avec le symbole °.",
    explanation:
      "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
      "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
      "Calcul : " +
      ("On mesure les angles en degrés. Le symbole utilisé est °.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["angle_mesure", "mesure", "unite"],
  },
  {
    kind: "fixed",
    id: "angle_mesurer_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_mesurer",
    difficulty: 2,
    theme: "neutral",
    text: "Pour mesurer un angle, on utilise :",
    format: "qcm",
    choices: ["une règle", "un compas", "un rapporteur", "une équerre"],
    expected: ["un rapporteur"],
    comparator: "mcq_exact",
    hint: "C’est l’instrument gradué en degrés.",
    explanation:
      "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
      "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
      "Calcul : " +
      ("L’instrument adapté pour mesurer un angle est le rapporteur.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["angle_mesure", "mesure", "qcm"],
  },
  {
    kind: "fixed",
    id: "angle_mesurer_qcm_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_mesurer",
    difficulty: 2,
    theme: "neutral",
    text: "L’unité de mesure d’un angle est :",
    format: "qcm",
    choices: ["le centimètre", "le degré", "le mètre", "le litre"],
    expected: ["le degré"],
    comparator: "mcq_exact",
    hint: "On écrit souvent 90°.",
    explanation:
      "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
      "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
      "Calcul : " +
      ("Les angles se mesurent en degrés. Les autres unités proposées servent à mesurer autre chose.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["angle_mesure", "mesure", "qcm"],
  },

  // =========================
  // ANGLE_TRACER
  // =========================
  {
    kind: "fixed",
    id: "angle_tracer_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_tracer",
    difficulty: 2,
    theme: "neutral",
    // 08/10/2026 : précise et corrigée strictement (Frédéric).
    text: "Quel instrument est le plus utile pour tracer un angle de 40° ?",
    format: "qcm",
    choices: ["le compas", "l’équerre", "le rapporteur", "la règle graduée"],
    expected: ["le rapporteur"],
    comparator: "mcq_exact",
    hint: "C’est le même instrument que pour mesurer un angle.",
    explanation:
      "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
      "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
      "Calcul : " +
      ("Pour tracer précisément un angle de 40°, on utilise un rapporteur, car il permet de placer la bonne mesure en degrés.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["angle_mesure", "tracer", "instrument"],
  },
  {
    kind: "fixed",
    id: "angle_tracer_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_tracer",
    difficulty: 2,
    theme: "neutral",
    // 08/10/2026 : précise et corrigée strictement (Frédéric).
    text: "Pour tracer un angle, que place-t-on en premier ?",
    format: "qcm",
    choices: ["le sommet", "les graduations", "le 2e côté"],
    expected: ["le sommet"],
    comparator: "mcq_exact",
    hint: "Les deux côtés partent de ce point.",
    explanation:
      "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
      "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
      "Calcul : " +
      ("Pour tracer un angle, on commence par placer le sommet, car les deux côtés de l’angle partent de ce point.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["angle_mesure", "tracer", "vocabulaire"],
  },
  {
    kind: "fixed",
    id: "angle_tracer_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_tracer",
    difficulty: 2,
    theme: "neutral",
    text: "Pour tracer un angle de 70°, l’instrument le plus adapté est :",
    format: "qcm",
    choices: ["la règle seule", "le compas seul", "le rapporteur", "la gomme"],
    expected: ["le rapporteur"],
    comparator: "mcq_exact",
    hint: "Il permet de lire les degrés.",
    explanation:
      "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
      "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
      "Calcul : " +
      ("Le rapporteur est l’instrument adapté pour tracer un angle d’une mesure donnée.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["angle_mesure", "tracer", "qcm"],
  },
  {
    kind: "fixed",
    id: "angle_tracer_qcm_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_tracer",
    difficulty: 2,
    theme: "neutral",
    text: "Pour tracer un angle, on part d’abord :",
    format: "qcm",
    choices: [
      "du sommet",
      "de la dernière graduation",
      "du milieu du segment",
      "du nom de la figure",
    ],
    expected: ["du sommet"],
    comparator: "mcq_exact",
    hint: "C’est le point commun des deux côtés.",
    explanation:
      "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
      "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
      "Calcul : " +
      ("On commence par le sommet, car c’est depuis ce point que l’on trace les deux côtés de l’angle.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["angle_mesure", "tracer", "qcm"],
  },

  // =========================
  // ANGLE_DEFIS
  // =========================
  {
    kind: "fixed",
    id: "angle_defi_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_defi",
    difficulty: 3,
    theme: "neutral",
    // 08/10/2026 : précise et corrigée strictement (Frédéric).
    text: "Un angle mesure 90°. Comparé à un angle droit, il est :",
    format: "qcm",
    choices: ["plus petit", "égal", "plus grand"],
    expected: ["égal"],
    comparator: "mcq_exact",
    hint: "Un angle droit mesure 90°.",
    explanation:
      "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
      "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
      "Calcul : " +
      ("Comme un angle droit mesure exactement 90°, un angle de 90° est égal à un angle droit.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["angle_mesure", "defi", "angle_droit"],
  },
  {
    kind: "fixed",
    id: "angle_defi_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_defi",
    difficulty: 3,
    theme: "neutral",
    text: "Parmi 35°, 90°, 120° et 75°, quel est l’angle le plus proche d’un angle droit ?",
    format: "short",
    expected: ["90", "90°"],
    comparator: "number_equal",
    hint: "Un angle droit mesure 90°.",
    explanation:
      "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
      "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
      "Calcul : " +
      ("Un angle droit mesure 90°. Parmi les valeurs proposées, 90° est exactement un angle droit, donc c’est le plus proche.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["angle_mesure", "defi", "comparaison"],
  },
  {
    kind: "fixed",
    id: "angle_defi_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Quel angle est plus petit qu’un angle droit ?",
    format: "qcm",
    choices: ["110°", "90°", "60°", "120°"],
    expected: ["60°"],
    comparator: "mcq_exact",
    hint: "Un angle droit vaut 90°.",
    explanation:
      "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
      "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
      "Calcul : " +
      ("Un angle plus petit qu’un angle droit doit mesurer moins de 90°. Parmi les choix, seul 60° convient.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["angle_mesure", "defi", "qcm"],
  },
  {
    kind: "fixed",
    id: "angle_defi_qcm_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Quel angle est plus grand qu’un angle droit ?",
    format: "qcm",
    choices: ["45°", "75°", "100°", "90°"],
    expected: ["100°"],
    comparator: "mcq_exact",
    hint: "Cherche une mesure supérieure à 90°.",
    explanation:
      "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
      "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
      "Calcul : " +
      ("Un angle plus grand qu’un angle droit mesure plus de 90°. Ici, 100° est le bon choix.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["angle_mesure", "defi", "qcm"],
  },
  {
    kind: "fixed",
    id: "angle_defi_qcm_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_defi",
    difficulty: 4,
    theme: "reunion",
    text: "Sur une rosace observée à La Réunion, un angle mesure 90°. C’est :",
    format: "qcm",
    choices: [
      "un angle plus petit qu’un angle droit",
      "un angle droit",
      "un angle plus grand qu’un angle droit",
      "un angle plat",
    ],
    expected: ["un angle droit"],
    comparator: "mcq_exact",
    hint: "90° correspond à un angle droit.",
    explanation:
      "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
      "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
      "Calcul : " +
      ("Un angle de 90° est exactement un angle droit.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["angle_mesure", "defi", "reunion", "qcm"],
  },

  // =========================
  // TEMPLATES (★1-★2 nus, 03/11/2026 ; les situations sont dans les « _ctx3 » plus bas)
  // =========================
  gabarit("angle_reconnaitre_tpl_1", "angle_reconnaitre", 1, "Un angle a deux côtés et un sommet : le sommet est la lettre du MILIEU.",
    ["angle_mesure", "reconnaitre", "template"], () => genReconnaitre(false)),
  gabarit("angle_reconnaitre_qcm_tpl_1", "angle_reconnaitre", 2, "Aigu : moins de 90°. Droit : 90°. Obtus : entre 90° et 180°. Plat : 180°.",
    ["angle_mesure", "reconnaitre", "qcm", "template"], () => genReconnaitreQcm(false)),
  gabarit("angle_droit_tpl_1", "angle_droit", 1, "Toujours 90°.", ["angle_mesure", "angle_droit", "template"], () => genDroitCoin(false)),
  {
    kind: "template",
    id: "angle_droit_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_droit",
    difficulty: 1,
    theme: "neutral",
    hint: "Le petit carré dans le coin veut dire : angle droit.",
    tags: ["angle_mesure", "angle_droit", "template", "canvas"],
    generate: () => {
      const n = nomAngle();
      const t = pick([
        `Un petit carré code l’angle ${n.nom}. Combien mesure-t-il ?`,
        `L’angle ${n.nom} est un angle droit. Quelle est sa mesure ?`,
        `Complète : l’angle droit ${n.nom} mesure … °.`,
        `Observe le codage de l’angle ${n.nom}. Combien mesure-t-il ?`,
      ]);
      return {
        text: t,
        format: "short",
        expected: ["90°", "90"],
        comparator: "number_equal",
        explanation: expl(`Le petit carré au sommet ${n.s} code un angle droit. Un angle droit mesure toujours 90°.`),
        canvas: figureAngle(90, n, { droit: true }),
      };
    },
  },
  gabarit("angle_droit_qcm_tpl_1", "angle_droit", 2, "Un angle droit mesure 90°.", ["angle_mesure", "angle_droit", "qcm", "template"], () => genDroitListe(false)),
  gabarit("angle_droit_qcm_tpl_2", "angle_droit", 2, "Droit : 90° pile. Moins : plus petit. Plus : plus grand.",
    ["angle_mesure", "angle_droit", "qcm", "template"], () => genDroitOuiNon(false)),
  gabarit("angle_comparer_tpl_1", "angle_comparer", 1, "L’angle le plus grand a la plus grande mesure.", ["angle_mesure", "comparaison", "template"], () => comparerDeux(true)),
  gabarit("angle_comparer_tpl_2", "angle_comparer", 1, "L’angle le plus petit a la plus petite mesure.", ["angle_mesure", "comparaison", "template"], () => comparerDeux(false)),
  gabarit("angle_comparer_tpl_3", "angle_comparer", 2, "Compare à 90°.", ["angle_mesure", "comparaison", "template", "angle_droit"],
    () => comparerAuDroit(mesure5(15, 85), false, "plat")),
  gabarit("angle_comparer_tpl_4", "angle_comparer", 2, "Compare à 90°.", ["angle_mesure", "comparaison", "template", "angle_droit"],
    () => comparerAuDroit(mesure5(95, 175), false, "nul")),
  gabarit("angle_comparer_qcm_tpl_1", "angle_comparer", 2, "Compare toutes les mesures proposées.", ["angle_mesure", "comparaison", "qcm", "template"], () => comparerQuatre(true)),
  gabarit("angle_comparer_qcm_tpl_2", "angle_comparer", 2, "Cherche la plus petite mesure.", ["angle_mesure", "comparaison", "qcm", "template"], () => comparerQuatre(false)),
  // ★2 dessinés : l'angle de la figure, comparé à l'œil au coin de l'équerre.
  gabarit("angle_comparer_qcm_tpl_3", "angle_comparer", 2, "Imagine le coin de ton équerre posé sur le sommet.",
    ["angle_mesure", "comparaison", "qcm", "template", "angle_droit", "canvas"], () => comparerAuDroitDessine(true)),
  gabarit("angle_comparer_qcm_tpl_4", "angle_comparer", 2, "Imagine le coin de ton équerre posé sur le sommet.",
    ["angle_mesure", "comparaison", "qcm", "template", "angle_droit", "canvas"], () => comparerAuDroitDessine(false)),
  gabarit("angle_mesurer_tpl_1", "angle_mesurer", 1, "C’est l’instrument gradué en degrés.", ["angle_mesure", "mesure", "template"], () => genMesurerInstrument(false)),
  gabarit("angle_mesurer_qcm_tpl_1", "angle_mesurer", 2, "Centre sur le sommet, 0 sur un côté, lecture sur l’autre côté.",
    ["angle_mesure", "mesure", "qcm", "template"], () => genMesurerMethode(false)),
  gabarit("angle_tracer_tpl_1", "angle_tracer", 2, "On utilise l’instrument gradué en degrés.", ["angle_mesure", "tracer", "template"], () => genTracer(false)),
  gabarit("angle_tracer_qcm_tpl_1", "angle_tracer", 2, "L’angle part d’un point commun aux deux côtés.", ["angle_mesure", "tracer", "qcm", "template"], () => genEtapes(false)),

  // =========================
  // ★3 EN SITUATION (03/11/2026) : les objets, les prénoms, les tournures
  // qui étaient à ★1-★2 — le geste est su, le contexte arrive.
  // =========================
  gabarit("angle_reconnaitre_tpl_ctx3", "angle_reconnaitre", 3, "Le sommet est le point d’où partent les deux côtés.",
    ["angle_mesure", "reconnaitre", "qcm", "template", "contexte"], () => (Math.random() < 0.5 ? genReconnaitre(true) : genReconnaitreQcm(true))),
  gabarit("angle_droit_tpl_ctx3", "angle_droit", 3, "Un angle droit mesure toujours 90°.", ["angle_mesure", "angle_droit", "template", "contexte"],
    () => pick([genDroitCoin, genDroitListe, genDroitOuiNon])(true)),
  gabarit("angle_comparer_tpl_ctx3", "angle_comparer", 3, "Compare les nombres de degrés, ou compare à 90°.", ["angle_mesure", "comparaison", "template", "contexte"],
    () => {
      const k = randomInt(0, 3);
      if (k === 0) return comparerDeux(Math.random() < 0.5, true);
      if (k === 1) return comparerQuatre(Math.random() < 0.5, true);
      return Math.random() < 0.5 ? comparerAuDroit(mesure5(15, 85), true, "plat") : comparerAuDroit(mesure5(95, 170), true, "nul");
    }),
  gabarit("angle_mesurer_tpl_ctx3", "angle_mesurer", 3, "Le rapporteur : centre sur le sommet, 0 sur un côté.", ["angle_mesure", "mesure", "template", "contexte"],
    () => (Math.random() < 0.4 ? genMesurerInstrument(true) : genMesurerMethode(true))),
  gabarit("angle_tracer_tpl_ctx3", "angle_tracer", 3, "On trace d’abord un côté, puis on utilise le rapporteur.", ["angle_mesure", "tracer", "template", "contexte"],
    () => (Math.random() < 0.6 ? genTracer(true) : genEtapes(true))),

  // =========================
  // TEMPLATES - ANGLE_DEFIS
  // =========================
  {
    kind: "template",
    id: "angle_defi_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Compare à 90°.",
    tags: ["angle_mesure", "defi", "template"],
    // ⭐ 06/10 : réponse libre à mot-clé → partage d'un angle en parts égales
    // (pizza, tarte, roue, angle droit ou plat partagé) et comparaison au
    // droit en QCM, avec lettres et prénoms.
    generate: () => {
      const p = pick(PRENOMS);
      const n = nomAngle();
      const cas = randomInt(0, 2);
      if (cas === 0) {
        const k = pick([3, 4, 5, 6, 8, 10, 12]);
        const r = 360 / k;
        const quoi = pick(["une pizza ronde", "une tarte aux pommes", "un gâteau d’anniversaire", "une galette", "une quiche"]);
        const t = pick([
          `${p.nom} coupe ${quoi} en ${k} parts égales, depuis le centre. Combien mesure l’angle de chaque part ?`,
          `${quoi[0].toUpperCase()}${quoi.slice(1)} est partagée en ${k} parts égales à partir du centre. Quel est l’angle d’une part ?`,
          `Un tour complet fait 360°. ${p.nom} partage ${quoi} en ${k} parts égales. Quel angle mesure une part ?`,
        ]);
        return {
          text: t.replace(/gâteau d’anniversaire est partagée/, "gâteau d’anniversaire est partagé"),
          format: "short",
          expected: [`${r}°`, String(r)],
          comparator: "number_equal",
          explanation: expl(`Le tour complet autour du centre mesure 360°. ${k} parts égales : 360 ÷ ${k} = ${r}°.`),
        };
      }
      if (cas === 1) {
        const [base, total] = pick([["droit", 90], ["plat", 180]] as const);
        const k = total === 90 ? pick([2, 3]) : pick([2, 3, 4, 6]);
        const r = total / k;
        const t = pick([
          `L’angle ${n.nom} est ${base}. ${p.nom} le partage en ${k} angles égaux. Combien mesure chacun ?`,
          `On partage un angle ${base} ${n.nom} en ${k} angles égaux. Quelle est la mesure de chaque angle ?`,
        ]);
        return {
          text: t,
          format: "short",
          expected: [`${r}°`, String(r)],
          comparator: "number_equal",
          explanation: expl(`Un angle ${base} mesure ${total}°. En ${k} angles égaux : ${total} ÷ ${k} = ${r}°.`),
        };
      }
      const v = pick([90, 90, mesure5(40, 85), mesure5(95, 140)]);
      const t = pick([
        `L’angle ${n.nom} mesure ${v}°. Est-il plus petit, égal ou plus grand qu’un angle droit ?`,
        `${p.nom} a mesuré ${v}° pour l’angle ${n.nom}. Compare-le à un angle droit.`,
      ]);
      const juste = v < 90 ? "plus petit qu’un angle droit" : v > 90 ? "plus grand qu’un angle droit" : "égal à un angle droit";
      return {
        text: t,
        format: "qcm",
        choices: shuffle(["plus petit qu’un angle droit", "égal à un angle droit", "plus grand qu’un angle droit"]),
        expected: [juste],
        comparator: "mcq_exact",
        explanation: expl(`On compare ${v}° à 90° : l’angle est ${juste}.`),
        canvas: figureAngle(v, n, { mesure: true, droit: v === 90 }),
      };
    },
  },
  {
    kind: "template",
    id: "angle_defi_qcm_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Cherche la mesure inférieure à 90°.",
    tags: ["angle_mesure", "defi", "qcm", "template"],
    // ⭐ 06/10 : quatre angles nommés, un seul aigu (ou un seul obtus) ; le
    // piège est l'angle droit et les mesures proches de 90°.
    generate: () => {
      const ls = lettres(12);
      const noms = [0, 1, 2, 3].map((k) => ls.slice(3 * k, 3 * k + 3).join(""));
      const veutAigu = Math.random() < 0.5;
      const bon = veutAigu ? mesure5(45, 85) : mesure5(95, 135);
      const autres = veutAigu ? [90, mesure5(95, 170), mesure5(95, 170, [])] : [90, mesure5(20, 85), mesure5(20, 85)];
      const ms = shuffle([bon, ...autres]);
      const nomBon = noms[ms.indexOf(bon)];
      const p = pick(PRENOMS);
      const liste = noms.map((x, k) => `${x} mesure ${ms[k]}°`).join(", ");
      const crit = veutAigu ? "plus petit qu’un angle droit" : "plus grand qu’un angle droit";
      const t = pick([
        `${liste[0].toUpperCase()}${liste.slice(1)}. Quel angle est ${crit} ?`,
        `${p.nom} a mesuré quatre angles : ${liste}. Lequel est ${veutAigu ? "aigu" : "obtus"} ?`,
        `Voici quatre angles : ${liste}. Un seul est ${crit}. Lequel ?`,
      ]);
      return {
        text: t,
        format: "qcm",
        choices: noms.map((x) => `l’angle ${x}`),
        expected: [`l’angle ${nomBon}`],
        comparator: "mcq_exact",
        explanation: expl(`On compare chaque mesure à 90°. Seul ${nomBon} (${bon}°) est ${veutAigu ? "plus petit que 90° : aigu" : "entre 90° et 180° : obtus"}. 90° est droit, ni aigu ni obtus.`),
      };
    },
  },

  // ========== TOP-UP — ANGLE_RECONNAITRE ==========
  {
    kind: "fixed", id: "angle_reconnaitre_topup_1", niveau: "6e", matiere: "maths",
    notionId: "angle_mesure", microId: "angle_reconnaitre", difficulty: 1, theme: "neutral",
    text: "Comment s’appelle un angle qui mesure exactement 90° ?",
    format: "qcm", choices: ["un angle droit", "un angle aigu", "un angle obtus", "un angle plat"],
    expected: ["un angle droit"], comparator: "mcq_exact",
    hint: "90° = angle du coin d’une feuille.",
    explanation: expl("Un angle qui mesure exactement 90° est un angle droit. On le code par un petit carré."),
    tags: ["angle_mesure", "reconnaitre", "qcm"],
  },
  {
    kind: "fixed", id: "angle_reconnaitre_topup_2", niveau: "6e", matiere: "maths",
    notionId: "angle_mesure", microId: "angle_reconnaitre", difficulty: 1, theme: "neutral",
    text: "Comment s’appelle un angle qui mesure moins de 90° ?",
    format: "qcm", choices: ["un angle aigu", "un angle droit", "un angle obtus", "un angle plat"],
    expected: ["un angle aigu"], comparator: "mcq_exact",
    hint: "Plus petit que l’angle droit.",
    explanation: expl("Un angle qui mesure moins de 90° est un angle aigu."),
    tags: ["angle_mesure", "reconnaitre", "qcm"],
  },
  {
    kind: "fixed", id: "angle_reconnaitre_topup_3", niveau: "6e", matiere: "maths",
    notionId: "angle_mesure", microId: "angle_reconnaitre", difficulty: 2, theme: "neutral",
    text: "Comment s’appelle un angle entre 90° et 180° ?",
    format: "qcm", choices: ["un angle obtus", "un angle aigu", "un angle droit", "un angle plat"],
    expected: ["un angle obtus"], comparator: "mcq_exact",
    hint: "Plus grand que l’angle droit.",
    explanation: expl("Un angle qui mesure plus de 90° et moins de 180° est un angle obtus."),
    tags: ["angle_mesure", "reconnaitre", "qcm"],
  },
  {
    kind: "fixed", id: "angle_reconnaitre_topup_4", niveau: "6e", matiere: "maths",
    notionId: "angle_mesure", microId: "angle_reconnaitre", difficulty: 2, theme: "neutral",
    text: "Comment s’appelle un angle de 180° ?",
    format: "qcm", choices: ["un angle plat", "un angle droit", "un angle aigu", "un angle obtus"],
    expected: ["un angle plat"], comparator: "mcq_exact",
    hint: "Les deux demi-droites forment une droite.",
    explanation: expl("Un angle qui mesure exactement 180° est un angle plat : ses deux côtés sont alignés et forment une droite."),
    tags: ["angle_mesure", "reconnaitre", "qcm"],
  },

  // ========== TOP-UP — ANGLE_MESURER ==========
  {
    kind: "fixed", id: "angle_mesurer_topup_1", niveau: "6e", matiere: "maths",
    notionId: "angle_mesure", microId: "angle_mesurer", difficulty: 1, theme: "neutral",
    text: "Combien de degrés mesure un angle droit ?",
    format: "short", expected: ["90", "90°"], comparator: "number_equal",
    hint: "C’est l’angle du coin d’une feuille.",
    explanation: expl("Un angle droit mesure 90°."),
    tags: ["angle_mesure", "mesure"],
  },
  {
    kind: "fixed", id: "angle_mesurer_topup_2", niveau: "6e", matiere: "maths",
    notionId: "angle_mesure", microId: "angle_mesurer", difficulty: 1, theme: "neutral",
    text: "Combien de degrés mesure un angle plat ?",
    format: "short", expected: ["180", "180°"], comparator: "number_equal",
    hint: "Ses deux côtés sont alignés.",
    explanation: expl("Un angle plat mesure 180° : ses deux côtés forment une droite."),
    tags: ["angle_mesure", "mesure"],
  },
  {
    kind: "fixed", id: "angle_mesurer_topup_3", niveau: "6e", matiere: "maths",
    notionId: "angle_mesure", microId: "angle_mesurer", difficulty: 1, theme: "neutral",
    text: "Le rapporteur est gradué dans quelle unité ?",
    format: "qcm", choices: ["en degrés", "en centimètres", "en grammes", "en litres"],
    expected: ["en degrés"], comparator: "mcq_exact",
    hint: "Le symbole est °.",
    explanation: expl("Les angles se mesurent en degrés (symbole °), graduations que l’on lit sur le rapporteur."),
    tags: ["angle_mesure", "mesure", "qcm"],
  },
  {
    kind: "fixed", id: "angle_mesurer_topup_4", niveau: "6e", matiere: "maths",
    notionId: "angle_mesure", microId: "angle_mesurer", difficulty: 2, theme: "neutral",
    text: "Un angle mesure 45°. Est-il aigu, droit ou obtus ?",
    format: "qcm", choices: ["aigu", "droit", "obtus", "plat"], expected: ["aigu"], comparator: "mcq_exact",
    hint: "Compare 45° à 90°.",
    explanation: expl("45° est inférieur à 90°. C’est donc un angle aigu."),
    tags: ["angle_mesure", "mesure", "qcm"],
  },

  // ========== TOP-UP — ANGLE_TRACER ==========
  {
    kind: "fixed", id: "angle_tracer_topup_1", niveau: "6e", matiere: "maths",
    notionId: "angle_mesure", microId: "angle_tracer", difficulty: 1, theme: "neutral",
    // 08/10/2026 : précise et corrigée strictement (Frédéric).
    text: "Quel instrument utilise-t-on pour tracer précisément un angle de 60° ?",
    format: "qcm", choices: ["l’équerre", "le compas", "la règle graduée", "le rapporteur"],
    expected: ["le rapporteur"], comparator: "mcq_exact",
    hint: "Le même que pour mesurer un angle.",
    explanation: expl("Pour tracer précisément un angle de 60°, on utilise un rapporteur, gradué en degrés."),
    tags: ["angle_mesure", "tracer", "instrument"],
  },
  {
    kind: "fixed", id: "angle_tracer_topup_2", niveau: "6e", matiere: "maths",
    notionId: "angle_mesure", microId: "angle_tracer", difficulty: 2, theme: "neutral",
    text: "Quel instrument sert à tracer vite un angle droit ?",
    format: "qcm", choices: ["une équerre", "une balance", "un compas seul", "un chronomètre"],
    expected: ["une équerre"], comparator: "mcq_exact",
    hint: "Son coin forme un angle droit.",
    explanation: expl("L’équerre possède un coin à 90° : elle permet de tracer directement un angle droit."),
    tags: ["angle_mesure", "tracer", "qcm"],
  },
  {
    kind: "fixed", id: "angle_tracer_topup_3", niveau: "6e", matiere: "maths",
    notionId: "angle_mesure", microId: "angle_tracer", difficulty: 3, theme: "neutral",
    text: "Pour tracer un angle au rapporteur, où place-t-on le centre du rapporteur ?",
    format: "qcm", choices: ["sur le sommet de l’angle", "au bout d’un côté", "n’importe où", "sur le milieu d’un côté"],
    expected: ["sur le sommet de l’angle"], comparator: "mcq_exact",
    hint: "Le sommet est le point de départ des deux côtés.",
    explanation: expl("On place le centre du rapporteur sur le sommet de l’angle, et la ligne de base le long d’un côté."),
    tags: ["angle_mesure", "tracer", "qcm"],
  },
  {
    kind: "fixed", id: "angle_tracer_topup_4", niveau: "6e", matiere: "maths",
    notionId: "angle_mesure", microId: "angle_tracer", difficulty: 2, theme: "neutral",
    text: "On veut tracer un angle de 120°. Quel type d’angle obtient-on ?",
    format: "qcm", choices: ["obtus", "aigu", "droit", "plat"], expected: ["obtus"], comparator: "mcq_exact",
    hint: "Compare 120° à 90° et 180°.",
    explanation: expl("120° est plus grand que 90° et plus petit que 180° : c’est un angle obtus."),
    tags: ["angle_mesure", "tracer", "qcm"],
  },

  // ========== TOP-UP — ANGLE_DEFI ==========
  {
    kind: "fixed", id: "angle_defi_topup_1", niveau: "6e", matiere: "maths",
    notionId: "angle_mesure", microId: "angle_defi", difficulty: 3, theme: "neutral",
    text: "Défi : un angle droit est partagé en deux angles égaux. Combien mesure chacun ?",
    format: "short", expected: ["45", "45°"], comparator: "number_equal",
    hint: "90 ÷ 2.",
    explanation: expl("Un angle droit mesure 90°. Partagé en deux angles égaux, chacun mesure 90 ÷ 2 = 45°."),
    tags: ["angle_mesure", "defi"],
  },
  {
    kind: "fixed", id: "angle_defi_topup_2", niveau: "6e", matiere: "maths",
    notionId: "angle_mesure", microId: "angle_defi", difficulty: 3, theme: "neutral",
    text: "Défi : un angle plat est partagé en deux angles égaux. Combien mesure chacun ?",
    format: "short", expected: ["90", "90°"], comparator: "number_equal",
    hint: "180 ÷ 2.",
    explanation: expl("Un angle plat mesure 180°. Partagé en deux angles égaux, chacun mesure 180 ÷ 2 = 90° (deux angles droits)."),
    tags: ["angle_mesure", "defi"],
  },
  {
    kind: "fixed", id: "angle_defi_topup_3", niveau: "6e", matiere: "maths",
    notionId: "angle_mesure", microId: "angle_defi", difficulty: 4, theme: "neutral",
    text: "Défi : deux angles côte à côte forment un angle plat. L’un mesure 110°. Combien mesure l’autre ?",
    format: "short", expected: ["70", "70°"], comparator: "number_equal",
    hint: "Les deux angles ont pour somme 180°.",
    explanation: expl("Les deux angles forment un angle plat de 180°. L’autre angle vaut donc 180 - 110 = 70°."),
    tags: ["angle_mesure", "defi"],
  },

  // =========================
  // GÉNÉRATEURS DU 29/09/2026 — L'ÉVALUATION PAR CHAPITRES
  //
  // Le mode Défi (difficultés 3 à 5) n'offrait que 15 questions distinctes sur
  // « Angles ». Six générateurs, qui couvrent aussi le lexique du programme de
  // 6e resté sans question : angle nul, angle plein, angles adjacents,
  // supplémentaires, opposés par le sommet. Les noms des points changent à
  // chaque tirage.
  // =========================
  {
    kind: "template",
    id: "angle_reconnaitre_qcm_tpl_nature",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    hint: "Compare la mesure à 0°, 90°, 180° et 360°.",
    tags: ["angle_mesure", "reconnaitre", "qcm", "template", "vocabulaire"],
    generate: () => {
      const v =
        Math.random() < 0.25
          ? pick([0, 90, 180, 360])
          : pick(Array.from({ length: 35 }, (_, i) => 5 * (i + 1)).filter((x) => x !== 90));
      const nature = natureAngle(v);
      const voisins: Record<NatureAngle, NatureAngle[]> = {
        nul: ["aigu", "plat", "plein"],
        aigu: ["droit", "obtus", "plat"],
        droit: ["aigu", "obtus", "plat"],
        obtus: ["aigu", "droit", "plat"],
        plat: ["obtus", "droit", "plein"],
        plein: ["plat", "nul", "obtus"],
      };
      const regle: Record<NatureAngle, string> = {
        nul: "Un angle de 0° a ses deux côtés confondus : c’est un angle nul.",
        aigu: `${v}° est compris entre 0° et 90° : c’est un angle aigu.`,
        droit: "Un angle de 90° est un angle droit.",
        obtus: `${v}° est compris entre 90° et 180° : c’est un angle obtus.`,
        plat: "Un angle de 180° a ses deux côtés alignés, dans des sens opposés : c’est un angle plat.",
        plein: "Un angle de 360° fait un tour complet : c’est un angle plein.",
      };
      // ⭐ 06/10 : noms de points, objets réels et tournures (une seule phrase avant).
      const n = nomAngle();
      const p = pick(PRENOMS);
      const enSituation = v > 0 && v < 180 && Math.random() < 0.5;
      const o = enSituation ? objetPour(v) : null;
      const t = o
        ? pick([
            `${o.phrase(p)} L’angle ${n.nom} entre ${o.cotes} mesure ${v}°. Comment l’appelle-t-on ?`,
            `${o.phrase(p)} ${o.cotes[0].toUpperCase()}${o.cotes.slice(1)} forment un angle de ${v}°. Quelle est sa nature ?`,
          ])
        : pick([
            `L’angle ${n.nom} mesure ${v}°. Comment l’appelle-t-on ?`,
            `Un angle mesure ${v}°. Quelle est sa nature ?`,
            `${p.nom} mesure l’angle ${n.nom} et trouve ${v}°. Choisis le bon nom pour cet angle.`,
            `Quel nom donne-t-on à un angle de ${v}° comme l’angle ${n.nom} ?`,
          ]);
      return {
        text: t,
        format: "qcm",
        choices: shuffle([nature, ...voisins[nature]].map((x) => `un angle ${x}`)),
        expected: [`un angle ${nature}`],
        comparator: "mcq_exact",
        explanation: expl(regle[nature]),
      };
    },
  },
  {
    kind: "template",
    id: "angle_mesurer_qcm_tpl_rapporteur",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_mesurer",
    difficulty: 3,
    theme: "neutral",
    hint: "Avant de lire, regarde si l’angle est aigu ou obtus : cela élimine une mauvaise lecture.",
    tags: ["angle_mesure", "mesure", "qcm", "template", "canvas", "rapporteur"],
    generate: () => {
      const v = 10 * randomInt(2, 16);
      const [gauche, sommet, droite] = lettres(3);
      const autre = v === 90 ? 110 : 180 - v;
      // ⭐ 29/09 : une fois sur deux, le rapporteur de classe à DEUX graduations.
      const double = Math.random() < 0.5;
      const p = pick(PRENOMS);
      const nom = `${gauche}${sommet}${droite}`;
      return {
        // ⭐ 06/10 : tournures et prénoms (une seule phrase servait).
        text: pick([
          `Le rapporteur est posé sur l’angle ${nom}. Quelle est la mesure de cet angle ?`,
          `${p.nom} a posé son rapporteur sur l’angle ${nom}. Lis la mesure de l’angle.`,
          `Lis sur le rapporteur la mesure de l’angle ${nom}.`,
          `${p.nom} mesure l’angle ${nom} de sa figure. Que lit-${p.f ? "elle" : "il"} sur le rapporteur ?`,
          `Quelle mesure le rapporteur donne-t-il pour l’angle ${nom} ?`,
        ]),
        format: "qcm",
        choices: shuffle([`${v}°`, `${autre}°`, `${v + 10}°`, `${v - 10}°`]),
        expected: [`${v}°`],
        comparator: "mcq_exact",
        explanation: expl(
          `Le centre du rapporteur est sur le sommet ${sommet} et le 0 sur le côté [${sommet}${droite}). ` +
            (double
              ? `Ce rapporteur a deux graduations : on lit celle dont le 0 est sur [${sommet}${droite}), la graduation extérieure. Le côté [${sommet}${gauche}) y passe par ${v}. `
              : `Le côté [${sommet}${gauche}) passe par la graduation ${v}. `) +
            (v === 90
              ? "C’est un angle droit : 90°."
              : `Vérification : l’angle est ${v < 90 ? "aigu, donc sa mesure est inférieure" : "obtus, donc sa mesure est supérieure"} à 90° — ce qui écarte ${180 - v}°, la lecture sur la mauvaise graduation.`),
        ),
        canvas: angleAuRapporteur(v, { sommet, gauche, droite }, double ? "double" : "simple"),
      };
    },
  },
  {
    kind: "template",
    id: "angle_defi_tpl_supplementaires",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Trois points alignés forment un angle plat : 180°.",
    tags: ["angle_mesure", "defi", "template", "canvas", "supplementaires"],
    generate: () => {
      const [X, O, Y, Z] = lettres(4);
      const a = randomInt(15, 165);
      const r = 180 - a;
      return {
        text: `Les points ${X}, ${O} et ${Z} sont alignés, et ${O} est entre ${X} et ${Z}. L’angle ${X}${O}${Y} mesure ${a}°. Combien mesure l’angle ${Y}${O}${Z} ?`,
        format: "short",
        expected: [`${r}°`, String(r)],
        comparator: "number_equal",
        explanation: expl(
          `L’angle ${X}${O}${Z} est plat : il mesure 180°. Les angles ${X}${O}${Y} et ${Y}${O}${Z} sont adjacents et le remplissent : ils sont supplémentaires. Donc ${Y}${O}${Z} = 180 − ${a} = ${r}°.`,
        ),
        canvas: figureRayons(O, [
          { nom: Z, deg: 0 },
          { nom: Y, deg: 180 - a },
          { nom: X, deg: 180 },
        ]),
      };
    },
  },
  {
    kind: "template",
    id: "angle_defi_tpl_adjacents",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Les deux petits angles, côte à côte, forment le grand.",
    tags: ["angle_mesure", "defi", "template", "canvas", "adjacents"],
    generate: () => {
      const [A, O, B, C] = lettres(4);
      const T = randomInt(50, 170);
      const a = randomInt(10, T - 10);
      const r = T - a;
      return {
        text: `L’angle ${A}${O}${C} mesure ${T}°. La demi-droite [${O}${B}) est à l’intérieur de cet angle, et l’angle ${A}${O}${B} mesure ${a}°. Combien mesure l’angle ${B}${O}${C} ?`,
        format: "short",
        expected: [`${r}°`, String(r)],
        comparator: "number_equal",
        explanation: expl(
          `Les angles ${A}${O}${B} et ${B}${O}${C} sont adjacents : ensemble, ils forment l’angle ${A}${O}${C}. Donc ${B}${O}${C} = ${T} − ${a} = ${r}°.`,
        ),
        canvas: figureRayons(O, [
          { nom: C, deg: 0 },
          { nom: B, deg: r },
          { nom: A, deg: T },
        ]),
      };
    },
  },
  {
    kind: "template",
    id: "angle_defi_tpl_opposes_par_le_sommet",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Deux angles opposés par le sommet ont la même mesure ; deux angles côte à côte sur une droite font 180°.",
    tags: ["angle_mesure", "defi", "template", "canvas", "opposes_par_le_sommet"],
    generate: () => {
      const [A, B, C, D, O] = lettres(5);
      let a = randomInt(20, 160);
      if (a === 90) a = 70;
      const cas = pick([
        {
          angle: `${B}${O}${D}`,
          r: a,
          pourquoi: `Les angles ${A}${O}${C} et ${B}${O}${D} sont opposés par le sommet : ils ont la même mesure, ${a}°.`,
        },
        {
          angle: `${C}${O}${B}`,
          r: 180 - a,
          pourquoi: `${A}, ${O} et ${B} sont alignés : l’angle ${A}${O}${B} est plat. Les angles ${A}${O}${C} et ${C}${O}${B} sont donc supplémentaires : 180 − ${a} = ${180 - a}°.`,
        },
        {
          angle: `${A}${O}${D}`,
          r: 180 - a,
          pourquoi: `${C}, ${O} et ${D} sont alignés : l’angle ${C}${O}${D} est plat. Les angles ${A}${O}${C} et ${A}${O}${D} sont donc supplémentaires : 180 − ${a} = ${180 - a}°.`,
        },
      ]);
      return {
        text: `Les droites (${A}${B}) et (${C}${D}) se coupent en ${O}. L’angle ${A}${O}${C} mesure ${a}°. Combien mesure l’angle ${cas.angle} ?`,
        format: "short",
        expected: [`${cas.r}°`, String(cas.r)],
        comparator: "number_equal",
        explanation: expl(cas.pourquoi),
        canvas: figureRayons(O, [
          { nom: A, deg: 0 },
          { nom: C, deg: a },
          { nom: B, deg: 180 },
          { nom: D, deg: 180 + a },
        ]),
      };
    },
  },
  {
    kind: "template",
    id: "angle_defi_tpl_angle_plein",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Un tour complet, c’est un angle plein : 360°.",
    tags: ["angle_mesure", "defi", "template", "canvas", "angle_plein"],
    generate: () => {
      const [O, P, R, S] = lettres(4);
      // Trois angles saillants (moins de 180° chacun) qui font le tour.
      const a = randomInt(60, 170);
      const b = randomInt(Math.max(60, 185 - a), Math.min(170, 300 - a));
      const c = 360 - a - b;
      return {
        text: `Autour du point ${O}, les trois angles ${P}${O}${R}, ${R}${O}${S} et ${S}${O}${P} font un tour complet. L’angle ${P}${O}${R} mesure ${a}° et l’angle ${R}${O}${S} mesure ${b}°. Combien mesure l’angle ${S}${O}${P} ?`,
        format: "short",
        expected: [`${c}°`, String(c)],
        comparator: "number_equal",
        explanation: expl(
          `Un tour complet est un angle plein : 360°. Donc ${S}${O}${P} = 360 − ${a} − ${b} = ${c}°.`,
        ),
        canvas: figureRayons(O, [
          { nom: P, deg: 0 },
          { nom: R, deg: a },
          { nom: S, deg: a + b },
        ]),
      };
    },
  },
];