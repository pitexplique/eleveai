// Angles (5e).
// ⚠️ C'est le microId de chaque item qui fait foi, PAS le commentaire de
// section au-dessus : les items déplacés le 04/08/2026 vers angle_paires sont
// restés à leur place dans le fichier pour garder leur id, et donc l'historique
// des réponses des élèves.

import type {
  TutorBankItemV4,
  AngleCanvasData,
  DroitesCanvasData,
} from "@/lib/tutor-v4/types";
import { PRENOMS, pick, de, type Prenom } from "@/lib/tutor-v4/questionBank/6e/maths/entiers.bank";

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function makeChoices(correct: string, wrongs: readonly string[]) {
  // Jamais deux fois la même ligne. Un gabarit dont le piège coïncide avec la
  // bonne réponse (les coordonnées inversées quand x = y, un arrondi égal à la
  // valeur de départ…) affichait la même proposition deux fois, et l'élève
  // voyait deux réponses justes.
  // ⚠️ 04/08/2026 — la version précédente dédoublonnait PUIS coupait à quatre :
  // avec cinq distracteurs, le mélange pouvait renvoyer la bonne réponse en
  // cinquième position et le découpage l'emportait. L'élève ne pouvait alors
  // pas réussir, et rien ne le signalait. On met désormais la bonne réponse de
  // côté, on tire trois distracteurs, puis on mélange l'ensemble.
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct),
  ).slice(0, 3);
  return shuffle([correct, ...distracteurs]);
}

function angleType(angle: number) {
  if (angle < 90) return "aigu";
  if (angle === 90) return "droit";
  if (angle < 180) return "obtus";
  return "plat";
}

function angleCanvas(params: {
  angleDeg: number;
  showMeasure?: boolean;
  placeholder?: string;
  showRightAngle?: boolean;
  labels?: {
    vertex?: string;
    left?: string;
    right?: string;
    angle?: string;
  };
}): AngleCanvasData {
  return {
    kind: "angle",
    angle: {
      angleDeg: params.angleDeg,
      labels: {
        vertex: params.labels?.vertex ?? "O",
        left: params.labels?.left ?? "A",
        right: params.labels?.right ?? "B",
        angle: params.labels?.angle ?? `${params.angleDeg}°`,
      },
      display: {
        showLabels: true,
        showMeasure: params.showMeasure ?? true,
        showArc: true,
        showRightAngle: params.showRightAngle ?? params.angleDeg === 90,
        placeholder: params.placeholder,
      },
    },
  };
}

// Deux parallèles couchées, une sécante en travers, et les deux points de
// croisement nommés A et B. Le dessin ne porte AUCUNE mesure : c'est l'énoncé
// qui les donne, sinon l'élève lirait la réponse au lieu de la chercher.
// 13/10/2026 : la sécante fait l'angle aigu `theta` de l'énoncé (65° écrit,
// 65° dessiné) ; 41° par défaut, l'ancien dessin, quand le texte ne donne rien.
function paralleleCanvas(theta = 41): DroitesCanvasData {
  const t = (theta * Math.PI) / 180;
  const cot = 1 / Math.tan(t);
  const A = { x: Math.round(170 + 50 * cot), y: 75 };
  const B = { x: Math.round(170 - 50 * cot), y: 175 };
  return {
    kind: "droites",
    size: { width: 340, height: 240 },
    display: { showGrid: false },
    lines: [
      { id: "d1", type: "droite", from: { x: 25, y: 75 }, to: { x: 315, y: 75 }, label: "(d1)" },
      { id: "d2", type: "droite", from: { x: 25, y: 175 }, to: { x: 315, y: 175 }, label: "(d2)" },
      {
        id: "s",
        type: "droite",
        from: { x: Math.round(B.x - 45 * Math.cos(t)), y: Math.round(175 + 45 * Math.sin(t)) },
        to: { x: Math.round(A.x + 45 * Math.cos(t)), y: Math.round(75 - 45 * Math.sin(t)) },
        label: "(s)",
      },
    ],
    intersections: [
      { ...A, label: "A", highlight: true },
      { ...B, label: "B", highlight: true },
    ],
    markers: {
      parallels: [{ lineA: "d1", lineB: "d2", markCount: 1 }],
    },
  };
}

const anglesAigus = [25, 35, 45, 50, 60, 75];
const anglesObtus = [105, 115, 120, 135, 150];
const anglesClassiques = [30, 45, 60, 75, 90, 105, 120, 135];

function expl(calcul: string) {
  return (
    "Définition : un angle mesure l’ouverture entre deux demi-droites et s’exprime en degrés.\n\n" +
    "Méthode : on identifie le sommet, les côtés ou la mesure, puis on utilise la règle ou le rapporteur.\n\nCalcul : " +
    calcul +
    "\n\nConclusion : la mesure ou le nom trouvé convient pour cet angle."
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// GABARITS VARIÉS (13/10/2026). Mesuré le 13/10 : 8 à 17 squelettes par
// micro, jusqu'à 18 répétitions sur 20. Chaque gabarit compose maintenant une
// SITUATION × une TOURNURE × des PRÉNOMS × des NOMS DE POINTS ; la figure est
// calculée à partir des mesures de l'énoncé, avec les mêmes noms de points.
// Correcteurs : correcteurs/angles.ts.
// ═══════════════════════════════════════════════════════════════════════════

type Gen = ReturnType<Extract<TutorBankItemV4, { kind: "template" }>["generate"]>;
const LETTRES = "ABCDEFGHKLMNPRSTUVXYZ".split("");
/** n lettres distinctes. */
function lettres(n: number) {
  return shuffle(LETTRES).slice(0, n);
}
const ri = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1));
/** Un multiple de `pas` entre a et b. */
const multiple = (a: number, b: number, pas: number) => pas * ri(Math.ceil(a / pas), Math.floor(b / pas));
const il = (p: Prenom) => (p.f ? "elle" : "il");
const Il = (p: Prenom) => (p.f ? "Elle" : "Il");
const accord = (p: Prenom, mot: string) => (p.f ? `${mot}e` : mot);

/** Les objets où l'on voit un angle. */
const OBJETS = [
  "l’ouverture d’un éventail",
  "les deux branches d’un compas",
  "les lames d’une paire de ciseaux",
  "les deux aiguilles d’une horloge",
  "le dossier et l’assise d’une chaise longue",
  "une part de tarte",
  "les deux pages d’un livre ouvert",
  "l’écran et le clavier d’un ordinateur portable",
  "la rampe d’un skatepark et le sol",
  "le toboggan et le sol du parc",
  "le toit d’une niche",
  "la flèche d’une grue et son mât",
  "les deux branches d’une pince à linge",
  "la canne à pêche et la surface du lac",
  "le sentier du Piton des Neiges et la route",
];
const INTROS: ((p: string, o: string) => string)[] = [
  (p, o) => `${p} a pris en photo ${o}.`,
  (p, o) => `${p} a dessiné ${o} sur son cahier.`,
  (p, o) => `Sur le schéma ${de(p)}, on voit ${o}.`,
  (p, o) => `${p} observe ${o}.`,
];
function situation() {
  return pick(INTROS)(pick(PRENOMS).nom, pick(OBJETS));
}
/** Un angle nommé : un côté, le sommet, l'autre côté (« l’angle GSD »). */
function troisPoints() {
  const [g, s, d] = lettres(3);
  return { g, s, d, nom: `${g}${s}${d}` };
}
/** La figure d'un angle : `d` sur le côté horizontal (le 0 du rapporteur), `g` sur l'autre. */
function figureAngle(
  a: number,
  n: { g: string; s: string; d: string },
  opts: { mesure?: boolean; rapporteur?: "simple" | "double"; etape?: "vertex" | "zero" | "reading" } = {},
): AngleCanvasData {
  return {
    kind: "angle",
    angle: {
      angleDeg: a,
      labels: { vertex: n.s, left: n.g, right: n.d, angle: `${a}°` },
      display: {
        showLabels: true,
        showMeasure: opts.mesure ?? false,
        showArc: true,
        showRightAngle: a === 90,
        placeholder: "?",
        ...(opts.rapporteur ? { showProtractor: true, protractorScale: opts.rapporteur } : {}),
        ...(opts.etape ? { protractorStep: opts.etape } : {}),
      },
    },
  };
}
const NATURES = ["aigu", "droit", "obtus", "plat"];
/** Un gabarit ajouté le 13/10/2026. */
function tpl(id: string, microId: string, difficulty: number, hint: string, generate: () => Gen): TutorBankItemV4 {
  return {
    kind: "template",
    id,
    niveau: "5e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId,
    difficulty,
    theme: "neutral",
    hint,
    tags: ["angle_mesure", microId.replace("angle_", ""), "template"],
    generate,
  } as TutorBankItemV4;
}

// ─── ANGLE_LIRE ────────────────────────────────────────────────────────────
function genLire(etoile: 1 | 2): Gen {
  const n = troisPoints();
  const forme = pick(etoile === 1 ? ["mesure", "mesure", "sommet", "sommet"] : ["mesure", "cotes", "nature", "nom", "sommet"]);
  if (forme === "mesure") {
    const a = etoile === 1 ? multiple(20, 160, 10) : multiple(15, 165, 5);
    const text = pick([
      `Quelle est la mesure de l’angle ${n.nom} ? Lis-la sur la figure.`,
      `Lis la mesure écrite sur la figure. Combien mesure l’angle ${n.nom} ?`,
      `${situation()} L’angle ${n.nom} est marqué sur la figure. Quelle est sa mesure ?`,
      `Recopie la mesure de l’angle ${n.nom} écrite sur la figure.`,
      `${situation()} Combien de degrés mesure l’angle ${n.nom} sur la figure ?`,
    ]);
    return {
      text,
      format: "short",
      expected: [`${a}°`],
      comparator: "number_equal",
      explanation: expl(`La mesure est écrite dans l’ouverture de l’angle ${n.nom} : ${a}°.`),
      canvas: figureAngle(a, n, { mesure: true }),
    };
  }
  const a = multiple(20, 160, 5);
  if (forme === "sommet") {
    const text = pick([
      `Quel point est le sommet de l’angle ${n.nom} ?`,
      `Dans l’angle ${n.nom}, quelle lettre désigne le sommet ?`,
      `${situation()} On nomme cet angle ${n.nom}. Quel est son sommet ?`,
      `Les deux côtés de l’angle ${n.nom} partent du même point. Lequel ?`,
    ]);
    return {
      text,
      format: "qcm",
      choices: shuffle([n.g, n.s, n.d]),
      expected: [n.s],
      comparator: "mcq_exact",
      explanation: expl(`Dans le nom ${n.nom}, la lettre du milieu est le sommet : ${n.s}. Les deux côtés partent de ${n.s}.`),
      canvas: figureAngle(a, n, { mesure: Math.random() < 0.5 }),
    };
  }
  if (forme === "cotes") {
    const juste = `[${n.s}${n.g}) et [${n.s}${n.d})`;
    const text = pick([
      `Quels sont les côtés de l’angle ${n.nom} ?`,
      `${situation()} On nomme cet angle ${n.nom}. Quels sont ses côtés ?`,
      `L’angle ${n.nom} est formé par deux demi-droites. Lesquelles ?`,
    ]);
    return {
      text,
      format: "qcm",
      choices: shuffle([juste, `[${n.g}${n.s}) et [${n.d}${n.s})`, `[${n.g}${n.s}) et [${n.g}${n.d})`, `[${n.d}${n.g}) et [${n.d}${n.s})`]),
      expected: [juste],
      comparator: "mcq_exact",
      explanation: expl(`Les côtés d’un angle sont deux demi-droites qui partent du sommet ${n.s} : [${n.s}${n.g}) et [${n.s}${n.d}).`),
      canvas: figureAngle(a, n),
    };
  }
  if (forme === "nature") {
    const b = Math.random() < 0.15 ? 90 : multiple(15, 165, 5);
    const nat = angleType(b);
    const text = pick([
      `L’angle ${n.nom} mesure ${b}°. Est-il aigu, droit, obtus ou plat ?`,
      `Lis la mesure de l’angle ${n.nom} sur la figure. Quelle est sa nature ?`,
      `${situation()} L’angle ${n.nom} mesure ${b}°. Comment est cet angle ?`,
    ]);
    return {
      text,
      format: "qcm",
      choices: shuffle([...NATURES]),
      expected: [nat],
      comparator: "mcq_exact",
      explanation: expl(`${b}° est ${b < 90 ? "moins de 90°" : b === 90 ? "exactement 90°" : "entre 90° et 180°"} : l’angle ${n.nom} est ${nat}.`),
      canvas: figureAngle(b, n, { mesure: true }),
    };
  }
  // nom : le sommet au milieu.
  const juste = `l’angle ${n.g}${n.s}${n.d}`;
  const text = pick([
    `Le sommet de l’angle est ${n.s}. Ses côtés passent par ${n.g} et par ${n.d}. Comment le nomme-t-on ?`,
    `${situation()} L’angle a pour sommet ${n.s} ; ses côtés passent par ${n.g} et ${n.d}. Quel est son nom ?`,
    `Observe la figure : quel est le nom de l’angle de sommet ${n.s} ?`,
  ]);
  return {
    text,
    format: "qcm",
    choices: shuffle([juste, `l’angle ${n.s}${n.g}${n.d}`, `l’angle ${n.g}${n.d}${n.s}`, `l’angle ${n.s}${n.d}${n.g}`]),
    expected: [juste],
    comparator: "mcq_exact",
    explanation: expl(`On écrit le sommet ${n.s} au milieu : l’angle ${n.g}${n.s}${n.d} (ou ${n.d}${n.s}${n.g}).`),
    canvas: figureAngle(a, n),
  };
}

// ─── ANGLE_TRACER ──────────────────────────────────────────────────────────
const TRACES = [
  "la pente de la rampe de sa maquette",
  "le toit de sa cabane en carton",
  "une part de son diagramme circulaire",
  "la voile de son bateau en papier",
  "le bras de la grue de son dessin",
  "le dossier d’une chaise sur son plan",
  "l’ouverture d’un éventail sur son affiche",
  "la trajectoire d’un ballon sur son schéma",
  "le toboggan de son plan du parc",
  "les aiguilles d’une horloge sur son exposé",
];
function genTracer(etoile: 2 | 3 | 4): Gen {
  const n = troisPoints();
  const P = pick(PRENOMS);
  const ctx = `${P.nom} doit tracer l’angle ${n.nom} de A° pour ${pick(TRACES)}.`;
  const formes = { 2: ["graduation", "centre", "etape"], 3: ["graduation", "nature", "double"], 4: ["erreur", "verifier", "endroit"] }[etoile];
  const forme = pick(formes);
  const a = pick([20, 30, 40, 50, 60, 70, 80, 100, 110, 120, 130, 140, 150, 160]);
  const avec = (s: string) => s.replace("A°", `${a}°`);
  if (forme === "graduation") {
    const text = pick([
      `Pour tracer l’angle ${n.nom} de ${a}°, tu poses le centre du rapporteur sur ${n.s} et le 0 sur [${n.s}${n.d}). Quelle graduation repères-tu ?`,
      `${avec(ctx)} Le centre du rapporteur est sur ${n.s}, le 0 sur [${n.s}${n.d}). Quelle graduation doit-${il(P)} repérer ?`,
      `On trace l’angle ${n.nom} de ${a}°. [${n.s}${n.d}) est déjà tracé, sur le 0 du rapporteur. Quel nombre faut-il repérer pour placer ${n.g} ?`,
    ]);
    return {
      text,
      format: "short",
      expected: [`${a}°`],
      comparator: "number_equal",
      explanation: expl(`Le 0 est sur [${n.s}${n.d}) : on repère ${a} sur la graduation qui part de ce 0, on place ${n.g}, puis on trace [${n.s}${n.g}).`),
      canvas: figureAngle(a, n, { rapporteur: "simple", etape: "zero" }),
    };
  }
  if (forme === "centre") {
    const text = pick([
      `Pour tracer l’angle ${n.nom} de ${a}°, où pose-t-on le centre du rapporteur ?`,
      `${avec(ctx)} Où pose-t-${il(P)} le centre du rapporteur ?`,
    ]);
    return {
      text,
      format: "qcm",
      choices: shuffle([`sur le point ${n.s}`, `sur le point ${n.g}`, `sur le point ${n.d}`]),
      expected: [`sur le point ${n.s}`],
      comparator: "mcq_exact",
      explanation: expl(`Le centre du rapporteur se pose sur le sommet : dans ${n.nom}, c’est la lettre du milieu, ${n.s}.`),
    };
  }
  if (forme === "etape") {
    const juste = `tracer une demi-droite d’origine ${n.s}`;
    const text = pick([
      `Pour tracer l’angle ${n.nom} de ${a}°, que fait-on en premier ?`,
      `${avec(ctx)} Par quoi commence-t-${il(P)} ?`,
      `Quelle est la première étape pour tracer l’angle ${n.nom} de ${a}° ?`,
    ]);
    return {
      text,
      format: "qcm",
      choices: shuffle([juste, `tracer le segment [${[n.g, n.d].sort().join("")}]`, `tracer un cercle de centre ${n.g}`, `placer ${n.g} au hasard`]),
      expected: [juste],
      comparator: "mcq_exact",
      explanation: expl(`On trace d’abord un côté : une demi-droite qui part du sommet ${n.s}. Ensuite le rapporteur, puis le second côté.`),
    };
  }
  if (forme === "nature" || forme === "verifier") {
    const b = Math.random() < 0.15 ? 90 : a;
    const nat = angleType(b);
    const text =
      forme === "nature"
        ? pick([
            `${P.nom} trace l’angle ${n.nom} de ${b}°. Quel type d’angle doit-${il(P)} obtenir ?`,
            `${ctx.replace("A°", `${b}°`)} Son angle sera-t-il aigu, droit, obtus ou plat ?`,
            `On trace l’angle ${n.nom} de ${b}°. De quelle nature est-il ?`,
          ])
        : pick([
            `${P.nom} vient de tracer l’angle ${n.nom} de ${b}°. Pour vérifier son tracé, l’angle doit être :`,
            `Tu as tracé l’angle ${n.nom} de ${b}°. Pour repérer une erreur de graduation, ton angle doit être :`,
          ]);
    return {
      text,
      format: "qcm",
      choices: forme === "nature" ? shuffle([...NATURES]) : shuffle(["aigu", "droit", "obtus"]),
      expected: [nat],
      comparator: "mcq_exact",
      explanation: expl(`${b}° est ${b < 90 ? "moins de 90°" : b === 90 ? "exactement 90°" : "entre 90° et 180°"} : l’angle est ${nat}. Si le tracé ne l’est pas, on a lu la mauvaise graduation.`),
    };
  }
  if (forme === "double") {
    const zero = pick(["extérieure", "intérieure"]);
    const juste = `la graduation ${zero}`;
    const autre = `la graduation ${zero === "extérieure" ? "intérieure" : "extérieure"}`;
    const text = pick([
      `Pour tracer l’angle ${n.nom} de ${a}°, le 0 de la graduation ${zero} est sur [${n.s}${n.d}). Sur quelle graduation repère-t-on ${a} ?`,
      `${avec(ctx)} Son rapporteur a deux graduations ; le 0 de la graduation ${zero} est sur [${n.s}${n.d}). Où lit-${il(P)} ${a} ?`,
    ]);
    return {
      text,
      format: "qcm",
      choices: shuffle([juste, autre]),
      expected: [juste],
      comparator: "mcq_exact",
      explanation: expl(`On compte à partir du 0 posé sur [${n.s}${n.d}) : c’est ${juste} qui commence là. On y repère ${a}.`),
    };
  }
  if (forme === "endroit") {
    const text = pick([
      `Sur un rapporteur double, la graduation extérieure montre ${a}. Quel nombre la graduation intérieure montre-t-elle au même endroit ?`,
      `${P.nom} repère ${a} sur la graduation extérieure de son rapporteur. Quel nombre lit-${il(P)} au même endroit sur la graduation intérieure ?`,
    ]);
    return {
      text,
      format: "short",
      expected: [`${180 - a}°`],
      comparator: "number_equal",
      explanation: expl(`Les deux graduations vont de 0 à 180 en sens contraires : au même endroit, les deux nombres font 180 au total. 180 − ${a} = ${180 - a}.`),
    };
  }
  // erreur : la mauvaise graduation, le dessin est celui de l'élève.
  const faux = 180 - a;
  const text = pick([
    `${P.nom} veut tracer l’angle ${n.nom} de ${a}°. ${Il(P)} obtient un angle ${angleType(faux)} : ${il(P)} a lu la mauvaise graduation. Combien mesure l’angle qu’${il(P)} a tracé ?`,
    `Voici l’angle ${n.nom} tracé par ${P.nom}, qui voulait ${a}°. L’angle est ${angleType(faux)} : la graduation était la mauvaise. Quelle mesure a-t-${il(P)} tracée ?`,
  ]);
  return {
    text,
    format: "short",
    expected: [`${faux}°`],
    comparator: "number_equal",
    explanation: expl(`${a}° est ${angleType(a)}, mais l’angle tracé est ${angleType(faux)} : ${P.nom} a lu ${a} sur l’autre graduation. ${Il(P)} a donc tracé 180 − ${a} = ${faux}°.`),
    canvas: figureAngle(faux, n, { rapporteur: "double" }),
  };
}

// ─── ANGLE_ESTIMER ─────────────────────────────────────────────────────────
// Le dessin seul, sans mesure : l'angle est assez loin de 90° pour que l'œil
// tranche, et les mesures proposées sont écartées d'au moins 35°.
function genEstimer(etoile: 2 | 3): Gen {
  const n = troisPoints();
  const P = pick(PRENOMS);
  const sit = situation();
  if (etoile === 2) {
    const a = Math.random() < 0.15 ? 90 : pick([multiple(20, 65, 5), multiple(115, 160, 5)]);
    const text = pick([
      `${sit} Sans rapporteur, l’angle ${n.nom} est-il aigu, droit, obtus ou plat ?`,
      `À vue d’œil, de quelle nature est l’angle ${n.nom} ?`,
      `Compare l’angle ${n.nom} à un angle droit, sans mesurer. Il est :`,
      `${P.nom} regarde l’angle ${n.nom} sans rapporteur. Quelle est sa nature ?`,
      `${sit} Sans mesurer, l’angle ${n.nom} est plutôt :`,
    ]);
    return {
      text,
      format: "qcm",
      choices: shuffle([...NATURES]),
      expected: [angleType(a)],
      comparator: "mcq_exact",
      explanation: expl(
        a === 90
          ? `Le petit carré code un angle droit : l’angle ${n.nom} est droit.`
          : `L’angle ${n.nom} est ${a < 90 ? "moins ouvert" : "plus ouvert"} que le coin d’une feuille : il est ${angleType(a)} (il mesure ${a}°).`,
      ),
      canvas: figureAngle(a, n),
    };
  }
  const a = multiple(20, 160, 5);
  const loin = shuffle([10, 20, 30, 45, 60, 80, 100, 120, 135, 150, 170].filter((x) => Math.abs(x - a) >= 35)).slice(0, 3);
  const text = pick([
    `${sit} À vue d’œil, quelle mesure est la plus proche de l’angle ${n.nom} ?`,
    `${P.nom} estime l’angle ${n.nom} sans rapporteur. Quelle estimation est la bonne ?`,
    `Sans mesurer, l’angle ${n.nom} mesure environ :`,
    `Observe l’angle ${n.nom}. Laquelle de ces mesures lui va le mieux ?`,
  ]);
  return {
    text,
    format: "qcm",
    choices: shuffle([`${a}°`, ...loin.map((x) => `${x}°`)]),
    expected: [`${a}°`],
    comparator: "mcq_exact",
    explanation: expl(`On compare au coin d’une feuille (90°) et au demi-tour (180°). L’angle ${n.nom} est ${angleType(a)} ; la seule mesure proche du dessin est ${a}°.`),
    canvas: figureAngle(a, n),
  };
}

// ─── ANGLE_DEFI ────────────────────────────────────────────────────────────
const HORLOGES = ["L’horloge de la cuisine", "La pendule du salon", "L’horloge de la gare", "L’horloge du gymnase", "L’horloge de la classe", "L’horloge de la mairie"];
const DIRECTIONS: [string, number][] = [
  ["le nord", 0], ["le nord-est", 45], ["l’est", 90], ["le sud-est", 135],
  ["le sud", 180], ["le sud-ouest", 225], ["l’ouest", 270], ["le nord-ouest", 315],
];
const ROBOTS = ["Le robot aspirateur", "Le robot du club de sciences", "La tortue du logiciel de programmation", "Le petit robot de la classe"];
function genDefi(etoile: 4 | 5): Gen {
  const P = pick(PRENOMS);
  const forme = pick(etoile === 4 ? ["heure", "heure", "parts", "parts", "natureHeure"] : ["demie", "demie", "boussole", "boussole", "robot", "parts"]);
  if (forme === "heure" || forme === "natureHeure") {
    const h = ri(1, 11);
    const x = Math.min(30 * h, 360 - 30 * h);
    const intro = pick([`${pick(HORLOGES)} indique ${h} h pile.`, `Le réveil ${de(P.nom)} indique ${h} h pile.`]);
    const calc = `Le cadran est partagé en 12 heures : 360 ÷ 12 = 30°. Entre les aiguilles, il y a ${Math.min(h, 12 - h)} intervalle${Math.min(h, 12 - h) > 1 ? "s" : ""} d’une heure : ${Math.min(h, 12 - h)} × 30 = ${x}°.`;
    if (forme === "natureHeure")
      return {
        text: `${intro} Le plus petit angle formé par les deux aiguilles est-il aigu, droit, obtus ou plat ?`,
        format: "qcm",
        choices: shuffle([...NATURES]),
        expected: [angleType(x)],
        comparator: "mcq_exact",
        explanation: expl(`${calc} L’angle est ${angleType(x)}.`),
      };
    return {
      text: `${intro} ${pick(["Combien mesure le plus petit angle formé par ses deux aiguilles ?", "Quel est le plus petit angle entre la petite et la grande aiguille ?", "Calcule le plus petit angle formé par les aiguilles."])}`,
      format: "short",
      expected: [`${x}°`],
      comparator: "number_equal",
      explanation: expl(calc),
    };
  }
  if (forme === "parts") {
    const objet = pick([
      { t: (k: number) => `La roue du vélo ${de(P.nom)} a ${k} rayons régulièrement espacés. Quel angle forment deux rayons voisins ?`, k: [8, 9, 10, 12, 18, 20, 24, 30, 36] },
      { t: (k: number) => `${P.nom} coupe une tarte ronde en ${k} parts égales depuis le centre. Quel angle mesure chaque part, au centre ?`, k: [4, 5, 6, 8, 9, 10, 12] },
      { t: (k: number) => `Une grande roue a ${k} nacelles régulièrement espacées autour du centre. Quel angle sépare deux nacelles voisines, vu du centre ?`, k: [8, 9, 10, 12, 15, 18, 20, 24] },
      { t: (k: number) => `Le ventilateur ${de(P.nom)} a ${k} pales régulièrement espacées. Quel angle sépare deux pales voisines ?`, k: [3, 4, 5, 6] },
      { t: (k: number) => `${P.nom} partage un disque de carton en ${k} secteurs égaux pour une roue de loterie. Quel angle mesure chaque secteur ?`, k: [4, 5, 6, 8, 9, 10, 12, 15, 18] },
    ]);
    const k = pick(objet.k);
    return {
      text: objet.t(k),
      format: "short",
      expected: [`${360 / k}°`],
      comparator: "number_equal",
      explanation: expl(`Un tour complet mesure 360°, partagé en ${k} angles égaux : 360 ÷ ${k} = ${360 / k}°.`),
    };
  }
  if (forme === "demie") {
    const h = ri(1, 11);
    const heure = 30 * h + 15;
    let x = Math.abs(180 - heure);
    if (x > 180) x = 360 - x;
    return {
      text: `${pick(HORLOGES)} indique ${h} h 30. Attention : à la demie, la petite aiguille est à mi-chemin entre le ${h} et le ${h + 1}. ${pick(["Combien mesure le plus petit angle formé par les deux aiguilles ?", "Quel est le plus petit angle entre la petite et la grande aiguille ?"])}`,
      format: "short",
      expected: [`${x}°`],
      comparator: "number_equal",
      explanation: expl(`Depuis le 12 : la grande aiguille est sur le 6, à 180°. La petite est à mi-chemin entre ${h} et ${h + 1} : ${h} × 30 + 15 = ${heure}°. L’écart vaut ${x}°.`),
    };
  }
  if (forme === "boussole") {
    let [d1, d2] = shuffle(DIRECTIONS).slice(0, 2);
    let x = Math.abs(d1[1] - d2[1]);
    if (x > 180) x = 360 - x;
    const text = pick([
      `${P.nom} regarde vers ${d1[0]}, puis se tourne vers ${d2[0]}. De quel angle a-t-${il(P)} tourné, au plus court ?`,
      `Sur une rose des vents, quel est le plus petit angle entre la direction ${d1[0].replace(/^le |^l’/, "")} et la direction ${d2[0].replace(/^le |^l’/, "")} ?`,
      `Un bateau avançait vers ${d1[0]}. Il change de cap et avance maintenant vers ${d2[0]}. De quel angle a-t-il tourné, au plus court ?`,
    ]);
    return {
      text,
      format: "short",
      expected: [`${x}°`],
      comparator: "number_equal",
      explanation: expl(`La rose des vents a 8 directions, espacées de 360 ÷ 8 = 45°. De ${d1[0]} à ${d2[0]}, au plus court : ${x / 45} écart${x > 45 ? "s" : ""} de 45°, soit ${x}°.`),
    };
  }
  // robot
  const demi = Math.random() < 0.5;
  const tot = demi ? 180 : 360;
  const a = multiple(15, demi ? 90 : 170, 5);
  const b = multiple(15, tot - a - 15, 5);
  return {
    text: `${pick(ROBOTS)} tourne de ${a}°, puis de ${b}° dans le même sens. De combien doit-il encore tourner, dans ce sens, pour avoir fait ${demi ? "un demi-tour" : "un tour complet"} ?`,
    format: "short",
    expected: [`${tot - a - b}°`],
    comparator: "number_equal",
    explanation: expl(`${demi ? "Un demi-tour" : "Un tour complet"} mesure ${tot}°. Déjà tourné : ${a} + ${b} = ${a + b}°. Il reste ${tot} − ${a + b} = ${tot - a - b}°.`),
  };
}

// ─── ANGLE_PAIRES ──────────────────────────────────────────────────────────
// Chaque texte porte le mot de la relation (complémentaires, supplémentaires,
// opposé par le sommet, voisin, adjacents) : le correcteur la relit.
function genPaires(etoile: 1 | 2 | 3 | 4 | 5): Gen {
  const P = pick(PRENOMS);
  const [A, B, C, D, O] = lettres(5);
  const tire = (min: number, max: number) => (etoile === 1 ? multiple(min, max, 10) : etoile === 2 ? multiple(min, max, 5) : ri(min, max));
  const formes = {
    1: ["comp", "supp", "classer"],
    2: ["opp", "vois", "comp", "supp"],
    3: ["comp", "supp", "opp", "adj"],
    4: ["vois", "classer", "supp", "adj"],
    5: ["compsupp", "adj3", "sommeVois"],
  }[etoile];
  const forme = pick(formes);
  const rep = (x: number, e: string): Gen => ({ text: "", format: "short", expected: [`${x}°`], comparator: "number_equal", explanation: expl(e) });
  if (forme === "comp") {
    const a = tire(10, 80);
    const q = rep(90 - a, `Les deux angles font un angle droit à eux deux : 90 − ${a} = ${90 - a}°.`);
    q.text = pick([
      `Deux angles sont complémentaires. L’un mesure ${a}°. Combien mesure l’autre ?`,
      `${P.nom} dessine deux angles complémentaires. L’un mesure ${a}°. Combien mesure l’autre ?`,
      `L’angle ${A}${O}${B} mesure ${a}°. Combien mesure un angle complémentaire de ${A}${O}${B} ?`,
      `Le coin d’une feuille est un angle droit. ${P.nom} le partage en deux angles par un trait. L’un mesure ${a}°. Combien mesure l’autre ?`,
      `L’angle droit d’une équerre est partagé en deux par un trait de crayon. L’un des deux angles mesure ${a}°. Combien mesure l’autre ?`,
      `Un mur et le sol forment un angle droit. Un balai posé dans le coin partage cet angle droit en deux angles. L’un mesure ${a}°. Combien mesure l’autre ?`,
    ]);
    return q;
  }
  if (forme === "supp") {
    const a = tire(20, 160);
    const q = rep(180 - a, `Les deux angles forment un angle plat à eux deux : 180 − ${a} = ${180 - a}°.`);
    q.text = pick([
      `Deux angles sont supplémentaires. L’un mesure ${a}°. Combien mesure l’autre ?`,
      `${P.nom} dessine deux angles supplémentaires. L’un mesure ${a}°. Combien mesure l’autre ?`,
      `L’angle ${A}${O}${B} mesure ${a}°. Combien mesure un angle supplémentaire de ${A}${O}${B} ?`,
      `Une échelle est posée sur un sol plat. D’un côté, elle fait un angle de ${a}° avec le sol. Quel angle fait-elle avec le sol de l’autre côté ?`,
      `Un tuteur est planté de travers dans le potager ${de(P.nom)}. Il fait un angle de ${a}° avec le sol plat. Quel angle fait-il avec le sol de l’autre côté ?`,
      `Le mât de la tente ${de(P.nom)} penche : il fait un angle de ${a}° avec le sol plat. Quel angle fait-il avec le sol de l’autre côté ?`,
    ]);
    return q;
  }
  if (forme === "opp") {
    const a = tire(20, 160);
    const q = rep(a, `Deux angles opposés par le sommet ont la même mesure : ${a}°.`);
    q.text = pick([
      `Les droites (${A}${C}) et (${B}${D}) se coupent en ${O}. L’angle ${A}${O}${B} mesure ${a}°. Combien mesure l’angle ${C}${O}${D}, opposé par le sommet ?`,
      `Les lames d’une paire de ciseaux se croisent. D’un côté, elles forment un angle de ${a}°. Quel angle forment-elles du côté opposé ?`,
      `Deux routes droites se croisent. D’un côté du carrefour, l’angle mesure ${a}°. Combien mesure l’angle du côté opposé ?`,
      `Les pieds de la chaise pliante ${de(P.nom)} forment un X. En haut, ils forment un angle de ${a}°. Quel angle forment-ils en bas, du côté opposé ?`,
      `Sur le plan ${de(P.nom)}, deux allées droites se croisent. D’un côté, l’angle mesure ${a}°. Combien mesure l’angle du côté opposé ?`,
      `${P.nom} trace deux droites (${A}${C}) et (${B}${D}) qui se coupent en ${O}. L’angle ${A}${O}${B} mesure ${a}°. Combien mesure l’angle ${C}${O}${D}, opposé par le sommet ?`,
    ]);
    return q;
  }
  if (forme === "vois") {
    const a = tire(20, 160);
    const q = rep(180 - a, `Deux angles voisins le long d’une droite forment un angle plat : 180 − ${a} = ${180 - a}°.`);
    q.text = pick([
      `Les droites (${A}${C}) et (${B}${D}) se coupent en ${O}. L’angle ${A}${O}${B} mesure ${a}°. Combien mesure l’angle ${B}${O}${C}, voisin de ${A}${O}${B} ?`,
      `Deux routes droites se croisent. Un des angles du carrefour mesure ${a}°. Combien mesure l’angle voisin, juste à côté ?`,
      `Deux droites se coupent. Un des quatre angles mesure ${a}°. Combien mesure un angle voisin, juste à côté ?`,
      `Sur le plan ${de(P.nom)}, deux allées droites se croisent. L’un des angles mesure ${a}°. Combien mesure l’angle voisin, juste à côté ?`,
      `${P.nom} trace deux droites qui se coupent en ${O}. Un des quatre angles mesure ${a}°. Combien mesure un angle voisin, juste à côté ?`,
    ]);
    return q;
  }
  if (forme === "adj") {
    const a = tire(15, 100);
    const b = tire(15, 170 - a);
    const q = rep(a + b, `Les deux angles sont collés l’un à l’autre : ${a} + ${b} = ${a + b}°.`);
    q.text = pick([
      `Les angles ${A}${O}${B} et ${B}${O}${C} sont adjacents. ${A}${O}${B} mesure ${a}° et ${B}${O}${C} mesure ${b}°. Combien mesure l’angle ${A}${O}${C} ?`,
      `Deux parts de pizza adjacentes ont des angles de ${a}° et de ${b}° au centre. Quel angle forment-elles ensemble ?`,
      `${P.nom} ouvre son éventail en deux temps : un angle de ${a}°, puis un angle adjacent de ${b}°. Quel est l’angle total ?`,
    ]);
    return q;
  }
  if (forme === "classer") {
    const type = pick(["complémentaires", "supplémentaires", "ni l’un ni l’autre"]);
    let a: number, b: number;
    if (type === "complémentaires") { a = tire(10, 80); b = 90 - a; }
    else if (type === "supplémentaires") { a = tire(20, 160); b = 180 - a; }
    else {
      const cible = pick([90, 180]) + pick([-1, 1]) * (etoile === 1 ? pick([10, 20]) : ri(3, 20));
      a = tire(Math.max(10, cible - 170), Math.min(170, cible - 10));
      b = cible - a;
    }
    const text = pick([
      `Deux angles mesurent ${a}° et ${b}°. Sont-ils complémentaires, supplémentaires, ou ni l’un ni l’autre ?`,
      `Sur le dessin ${de(P.nom)}, deux angles mesurent ${a}° et ${b}°. Comment sont ces deux angles ?`,
      `Un angle mesure ${a}°, un autre ${b}°. Ces deux angles sont :`,
    ]);
    return {
      text,
      format: "qcm",
      choices: shuffle(["complémentaires", "supplémentaires", "ni l’un ni l’autre"]),
      expected: [type],
      comparator: "mcq_exact",
      explanation: expl(`${a} + ${b} = ${a + b}. Complémentaires : la somme fait 90°. Supplémentaires : elle fait 180°. Ici, ils sont ${type}.`),
    };
  }
  if (forme === "compsupp") {
    const a = ri(10, 80);
    const q = rep(90 + a, `${B}${O}${C} est le complémentaire : 90 − ${a} = ${90 - a}°. Son supplémentaire : 180 − ${90 - a} = ${90 + a}°.`);
    q.text = pick([
      `Les angles ${A}${O}${B} et ${B}${O}${C} sont complémentaires. ${A}${O}${B} mesure ${a}°. Combien mesure un angle supplémentaire de ${B}${O}${C} ?`,
      `Deux angles sont complémentaires ; le premier mesure ${a}°. Combien mesure un angle supplémentaire du second ?`,
      `${P.nom} trace deux angles complémentaires, ${A}${O}${B} et ${B}${O}${C}. ${A}${O}${B} mesure ${a}°. Combien mesure un angle supplémentaire de ${B}${O}${C} ?`,
      `Sur le cahier ${de(P.nom)}, deux angles sont complémentaires. Le premier mesure ${a}°. Combien mesure un angle supplémentaire du second ?`,
    ]);
    return q;
  }
  if (forme === "adj3") {
    const a = ri(20, 100);
    const b = ri(15, 160 - a);
    const q = rep(180 - a - b, `${A}, ${O} et ${D} sont alignés : les trois angles forment un angle plat. 180 − ${a} − ${b} = ${180 - a - b}°.`);
    const debut = pick(["Les angles", `${P.nom} trace trois angles. Les angles`, `Sur la figure ${de(P.nom)}, les angles`]);
    q.text = `${debut} ${A}${O}${B}, ${B}${O}${C} et ${C}${O}${D} sont adjacents, et les points ${A}, ${O} et ${D} sont alignés. ${A}${O}${B} mesure ${a}° et ${B}${O}${C} mesure ${b}°. ${pick([`Combien mesure l’angle ${C}${O}${D} ?`, `Calcule la mesure de l’angle ${C}${O}${D}.`])}`;
    return q;
  }
  // sommeVois
  const a = ri(20, 160);
  const q = rep(2 * (180 - a), `Chaque angle voisin mesure 180 − ${a} = ${180 - a}°. Les deux ensemble : 2 × ${180 - a} = ${2 * (180 - a)}°.`);
  q.text = pick([
    `Deux droites se coupent en ${O}. Un des quatre angles mesure ${a}°. Combien vaut la somme des deux angles voisins de cet angle ?`,
    `Deux routes droites se croisent. Un des angles du carrefour mesure ${a}°. Combien vaut la somme des deux angles voisins de cet angle ?`,
    `Sur le plan ${de(P.nom)}, deux allées droites se croisent. L’un des angles mesure ${a}°. Combien vaut la somme des deux angles voisins de cet angle ?`,
    `Les droites (${A}${C}) et (${B}${D}) se coupent en ${O}. L’angle ${A}${O}${B} mesure ${a}°. Calcule la somme des deux angles voisins de cet angle.`,
  ]);
  return q;
}

// ─── ANGLE_PARALLELES ──────────────────────────────────────────────────────
// La figure est CALCULÉE : la sécante fait avec les parallèles l'angle aigu θ
// tiré, et les huit points sont nommés comme dans le texte. Sur (d1) : e, A, f ;
// sur (d2) : g, B, h ; sur (s) : m au-dessus de A, n au-dessous de B.
type Pt = { x: number; y: number };
function angleEn(V: Pt, P1: Pt, P2: Pt) {
  const a = Math.atan2(P1.y - V.y, P1.x - V.x) - Math.atan2(P2.y - V.y, P2.x - V.x);
  let d = Math.abs((a * 180) / Math.PI);
  if (d > 180) d = 360 - d;
  return d;
}
function figureParalleles(theta: number) {
  const [e, A, f, g, B, h, m, nn] = lettres(8);
  const t = (theta * Math.PI) / 180;
  const cot = 1 / Math.tan(t);
  const miroir = Math.random() < 0.5;
  const X = (x: number) => Math.round((miroir ? 340 - x : x) * 10) / 10;
  const Y = (y: number) => Math.round(y * 10) / 10;
  const pA = { x: 170 + 50 * cot, y: 75 };
  const pB = { x: 170 - 50 * cot, y: 175 };
  const P: Record<string, Pt> = {
    [A]: pA,
    [B]: pB,
    [e]: { x: pA.x - 75, y: 75 },
    [f]: { x: pA.x + 75, y: 75 },
    [g]: { x: pB.x - 75, y: 175 },
    [h]: { x: pB.x + 75, y: 175 },
    [m]: { x: pA.x + 50 * Math.cos(t), y: 75 - 50 * Math.sin(t) },
    [nn]: { x: pB.x - 50 * Math.cos(t), y: 175 + 50 * Math.sin(t) },
  };
  for (const k of Object.keys(P)) P[k] = { x: X(P[k].x), y: Y(P[k].y) };
  const canvas: DroitesCanvasData = {
    kind: "droites",
    size: { width: 340, height: 250 },
    display: { showGrid: false },
    lines: [
      // Les étiquettes se posent au milieu de from–to : là où aucun point n'est nommé.
      { id: "d1", type: "droite", from: { x: X(20), y: 75 }, to: { x: X(80), y: 75 }, label: "(d1)" },
      { id: "d2", type: "droite", from: { x: X(260), y: 175 }, to: { x: X(320), y: 175 }, label: "(d2)" },
      { id: "s", type: "droite", from: P[nn], to: P[m], label: "(s)" },
    ],
    points: [e, A, f, g, B, h, m, nn].map((k) => ({ ...P[k], label: k, highlight: k === A || k === B })),
    markers: { parallels: [{ lineA: "d1", lineB: "d2", markCount: 1 }] },
  };
  // Les huit angles, nommés « côté, sommet, côté ».
  const angles = {
    mf: `${m}${A}${f}`, fb: `${f}${A}${B}`, be: `${B}${A}${e}`, em: `${e}${A}${m}`,
    ah: `${A}${B}${h}`, hn: `${h}${B}${nn}`, ng: `${nn}${B}${g}`, ga: `${g}${B}${A}`,
  };
  const mesure = (nom: string) => Math.round(angleEn(P[nom[1]], P[nom[0]], P[nom[2]]));
  return { canvas, angles, mesure, A, B };
}
const CORRESPONDANTS: [string, string][] = [["mf", "ah"], ["em", "ga"], ["fb", "hn"], ["be", "ng"]];
const ALTERNES: [string, string][] = [["fb", "ga"], ["be", "ah"]];
const OPPOSES: [string, string][] = [["mf", "be"], ["fb", "em"], ["ah", "ng"], ["hn", "ga"]];
const SIT_PARA = [
  (p: string) => `Sur le plan ${de(p)}, deux rues parallèles sont coupées par une avenue.`,
  () => `Les deux rails d’une voie ferrée sont parallèles ; une route les traverse en biais.`,
  () => `Deux étagères parallèles sont reliées par une planche en biais.`,
  (p: string) => `Sur la page du cahier ${de(p)}, deux lignes parallèles sont coupées par un trait en biais.`,
  () => `Deux bandes d’un passage piéton sont parallèles ; la trace d’un vélo les coupe en biais.`,
  () => `Les deux bords d’un canal sont parallèles ; une passerelle le traverse en biais.`,
  (p: string) => `Sur le terrain de hand ${de(p)}, deux lignes parallèles sont coupées par la trajectoire du ballon.`,
];
function genParalleles(etoile: 2 | 3 | 4 | 5): Gen {
  const P = pick(PRENOMS);
  const theta = ri(35, 80);
  const F = figureParalleles(theta);
  const sit = Math.random() < 0.5 ? `${pick(SIT_PARA)(P.nom)} On les représente par les droites parallèles (d1) et (d2), coupées par la sécante (s) en ${F.A} et ${F.B}.` : `Les droites (d1) et (d2) sont parallèles. La sécante (s) les coupe en ${F.A} et ${F.B}.`;
  const forme = pick({ 2: ["nom", "nom", "egal"], 3: ["egal", "egal", "nom"], 4: ["deuxPas", "supp", "reciproque"], 5: ["supp", "deuxPas", "libre"] }[etoile]);
  if (forme === "reciproque") {
    const rel = pick(["alternes-internes", "correspondants"]);
    const a = ri(35, 145);
    const oui = Math.random() < 0.5;
    const b = oui ? a : a + pick([-1, 1]) * ri(2, 9);
    return {
      text: pick([
        `Une sécante coupe les droites (d1) et (d2). Deux angles ${rel} mesurent ${a}° et ${b}°. Les droites (d1) et (d2) sont-elles parallèles ?`,
        `${P.nom} mesure deux angles ${rel} formés par une sécante et deux droites : ${a}° et ${b}°. Les deux droites sont-elles parallèles ?`,
      ]),
      format: "qcm",
      choices: ["oui", "non"],
      expected: [oui ? "oui" : "non"],
      comparator: "mcq_exact",
      explanation: expl(
        oui
          ? `Les deux angles ${rel} sont égaux (${a}°) : les droites sont parallèles.`
          : `Si les droites étaient parallèles, les angles ${rel} seraient égaux. Or ${a}° ≠ ${b}° : elles ne sont pas parallèles.`,
      ),
    };
  }
  if (forme === "nom") {
    const rel = pick(["alternes-internes", "correspondants", "opposés par le sommet"]);
    const [x, y] = shuffle([...pick(rel === "alternes-internes" ? ALTERNES : rel === "correspondants" ? CORRESPONDANTS : OPPOSES)]);
    const nx = F.angles[x as keyof typeof F.angles], ny = F.angles[y as keyof typeof F.angles];
    return {
      text: `${sit} ${pick([`Comment appelle-t-on les angles ${nx} et ${ny} ?`, `Les angles ${nx} et ${ny} sont :`, `Observe la figure. Que sont les angles ${nx} et ${ny} l’un pour l’autre ?`])}`,
      format: "qcm",
      choices: shuffle(["alternes-internes", "correspondants", "opposés par le sommet"]),
      expected: [rel],
      comparator: "mcq_exact",
      explanation: expl(
        rel === "alternes-internes"
          ? `${nx} et ${ny} sont entre les deux droites, de part et d’autre de la sécante : alternes-internes.`
          : rel === "correspondants"
            ? `${nx} et ${ny} sont du même côté de la sécante, et placés de la même façon par rapport à chaque droite : correspondants.`
            : `${nx} et ${ny} ont le même sommet et leurs côtés se prolongent : opposés par le sommet.`,
      ),
      canvas: F.canvas,
    };
  }
  // Un angle donné, un angle cherché.
  let x: string, y: string, raison: string;
  if (forme === "egal") {
    const rel = pick(["alternes-internes", "correspondants"]);
    [x, y] = shuffle([...pick(rel === "alternes-internes" ? ALTERNES : CORRESPONDANTS)]);
    raison = `Les droites sont parallèles : deux angles ${rel} sont égaux.`;
  } else if (forme === "deuxPas") {
    // opposé par le sommet, puis correspondant (ou alterne-interne).
    const [c1, c2] = shuffle([...pick(CORRESPONDANTS)]);
    const op = OPPOSES.find((o) => o.includes(c1))!;
    x = op[0] === c1 ? op[1] : op[0];
    y = c2;
    raison = `${F.angles[x as keyof typeof F.angles]} et ${F.angles[c1 as keyof typeof F.angles]} sont opposés par le sommet, donc égaux. Puis ${F.angles[c1 as keyof typeof F.angles]} et ${F.angles[y as keyof typeof F.angles]} sont correspondants, et les droites sont parallèles : égaux aussi.`;
  } else {
    // supp / libre : n'importe quel angle en B à partir d'un angle en A.
    const enA = ["mf", "fb", "be", "em"], enB = ["ah", "hn", "ng", "ga"];
    [x, y] = shuffle([pick(enA), pick(enB)]);
    if (forme === "supp") while (F.mesure(F.angles[x as keyof typeof F.angles]) === F.mesure(F.angles[y as keyof typeof F.angles])) y = pick(x.length && enA.includes(x) ? enB : enA);
    raison = `Avec des parallèles, les angles aigus de la figure mesurent tous ${theta}° et les angles obtus ${180 - theta}° (un aigu et un obtus voisins font 180°).`;
  }
  const nx = F.angles[x as keyof typeof F.angles], ny = F.angles[y as keyof typeof F.angles];
  const vx = F.mesure(nx), vy = F.mesure(ny);
  return {
    text: `${sit} L’angle ${nx} mesure ${vx}°. ${pick([`Combien mesure l’angle ${ny} ?`, `Calcule la mesure de l’angle ${ny}.`, `Quelle est la mesure de l’angle ${ny} ?`])}`,
    format: "short",
    expected: [`${vy}°`],
    comparator: "number_equal",
    explanation: expl(`${raison} L’angle ${ny} mesure ${vy}°${vy !== vx ? ` (180 − ${vx} = ${vy})` : ""}.`),
    canvas: F.canvas,
  };
}

// ─── ANGLE_MESURER ─────────────────────────────────────────────────────────
// Le côté [SD) est horizontal, sur le 0 de la graduation extérieure (dessin du
// moteur) ; le rapporteur est gradué de 10 en 10 : les angles mesurés le sont.
function genMesurer(etoile: 2 | 3): Gen {
  const n = troisPoints();
  const P = pick(PRENOMS);
  const forme = pick(etoile === 2 ? ["lire", "lire", "centre"] : ["double", "double", "texte", "piege"]);
  if (forme === "centre") {
    const a = multiple(20, 160, 10);
    const text = pick([
      `Où pose-t-on le centre du rapporteur pour mesurer l’angle ${n.nom} ?`,
      `${P.nom} veut mesurer l’angle ${n.nom}. Où doit-${il(P)} placer le centre du rapporteur ?`,
      `${situation()} Pour mesurer l’angle ${n.nom}, sur quel point pose-t-on le centre du rapporteur ?`,
    ]);
    return {
      text,
      format: "qcm",
      choices: shuffle([`sur le point ${n.s}`, `sur le point ${n.g}`, `sur le point ${n.d}`, `au milieu de [${[n.g, n.d].sort().join("")}]`]),
      expected: [`sur le point ${n.s}`],
      comparator: "mcq_exact",
      explanation: expl(`Le centre du rapporteur se pose sur le sommet de l’angle. Dans ${n.nom}, le sommet est la lettre du milieu : ${n.s}.`),
      canvas: figureAngle(a, n, { rapporteur: "simple", etape: "vertex" }),
    };
  }
  if (forme === "lire") {
    const a = multiple(20, 170, 10);
    const text = pick([
      `Le rapporteur est posé sur l’angle ${n.nom}. Combien mesure cet angle ?`,
      `Lis le rapporteur : quelle est la mesure de l’angle ${n.nom} ?`,
      `${situation()} Le rapporteur est posé sur l’angle ${n.nom}. Quelle mesure lis-tu ?`,
      `Le centre du rapporteur est sur ${n.s} et le 0 sur le côté [${n.s}${n.d}). Combien mesure l’angle ${n.nom} ?`,
      `${P.nom} mesure l’angle ${n.nom} avec son rapporteur. Quelle mesure ${il(P)} lit-${il(P)} ?`,
    ]);
    return {
      text,
      format: "short",
      expected: [`${a}°`],
      comparator: "number_equal",
      explanation: expl(`Le centre est sur ${n.s}, le 0 sur [${n.s}${n.d}). Le côté [${n.s}${n.g}) passe par la graduation ${a} : l’angle ${n.nom} mesure ${a}°.`),
      canvas: figureAngle(a, n, { rapporteur: "simple" }),
    };
  }
  const a = pick([20, 30, 40, 50, 60, 70, 80, 100, 110, 120, 130, 140, 150, 160]);
  if (forme === "double") {
    const text = pick([
      `Le rapporteur a deux graduations. Le côté [${n.s}${n.d}) passe par le 0 de la graduation extérieure. Combien mesure l’angle ${n.nom} ?`,
      `${P.nom} pose son rapporteur à deux graduations sur l’angle ${n.nom}. Le 0 de la graduation extérieure est sur [${n.s}${n.d}). Quelle est la mesure de l’angle ?`,
      `${situation()} Le rapporteur est posé sur l’angle ${n.nom}, le 0 de la graduation extérieure sur [${n.s}${n.d}). Combien mesure l’angle ?`,
    ]);
    return {
      text,
      format: "short",
      expected: [`${a}°`],
      comparator: "number_equal",
      explanation: expl(`On part du 0 qui est sur [${n.s}${n.d}) : c’est la graduation extérieure. On lit ${a} sur cette graduation (l’intérieure donne ${180 - a}, le piège). L’angle ${n.nom} mesure ${a}° : il est bien ${angleType(a)}.`),
      canvas: figureAngle(a, n, { rapporteur: "double" }),
    };
  }
  if (forme === "texte") {
    const zero = pick(["extérieure", "intérieure"]);
    const lu = zero === "extérieure" ? a : 180 - a;
    const text = pick([
      `Un côté de l’angle ${n.nom} passe par le 0 de la graduation ${zero}. L’autre côté passe par ${a} sur la graduation extérieure et par ${180 - a} sur l’intérieure. Combien mesure l’angle ?`,
      `${P.nom} mesure l’angle ${n.nom}. Le 0 de la graduation ${zero} est sur un côté. L’autre côté passe par ${a} (extérieure) et ${180 - a} (intérieure). Quelle est la mesure de l’angle ?`,
    ]);
    return {
      text,
      format: "short",
      expected: [`${lu}°`],
      comparator: "number_equal",
      explanation: expl(`On lit sur la graduation qui part de 0 sur le premier côté : la graduation ${zero}. L’angle ${n.nom} mesure ${lu}°.`),
    };
  }
  // piege : la mauvaise graduation.
  const faux = 180 - a;
  const text = pick([
    `${P.nom} lit ${faux}° pour l’angle ${n.nom}. Regarde la figure : quelle est la bonne mesure ?`,
    `Sur la figure, ${P.nom} annonce ${faux}° pour l’angle ${n.nom}. ${Il(P)} s’est trompé${P.f ? "e" : ""} de graduation. Quelle est la bonne mesure ?`,
  ]);
  return {
    text,
    format: "qcm",
    choices: shuffle([`${a}°`, `${faux}°`, "90°", `${a === 20 || a === 160 ? 100 : 180}°`]),
    expected: [`${a}°`],
    comparator: "mcq_exact",
    explanation: expl(`L’angle ${n.nom} est ${angleType(a)} sur la figure : ${faux}° ne convient pas. Le 0 est sur [${n.s}${n.d}), sur la graduation extérieure : on lit ${a}°.`),
    canvas: figureAngle(a, n, { rapporteur: "double" }),
  };
}

export const anglesBank: TutorBankItemV4[] = [
  // =========================
  // ANGLE_LIRE
  // =========================
  {
    kind: "fixed",
    id: "angle_lire_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_lire",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle est la mesure de l’angle représenté ? Réponds par un nombre.",
    format: "short",
    expected: ["60"],
    comparator: "number_equal",
    hint: "Lis la mesure indiquée en bleu.",
    explanation: "Définition : un angle mesure l’ouverture entre deux demi-droites et s’exprime en degrés.\n\n" +
          "Méthode : on identifie le sommet, les côtés ou la mesure, puis on utilise la règle ou le rapporteur.\n\nCalcul : " +
          ("La mesure indiquée sur la figure est 60°. La réponse est donc 60.") +
          "\n\nConclusion : la mesure ou le nom trouvé convient pour cet angle.",
    tags: ["angle_mesure", "lire", "canvas"],
    canvas: angleCanvas({ angleDeg: 60, showMeasure: true }),
  },
  {
    kind: "fixed",
    id: "angle_lire_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_lire",
    difficulty: 1,
    theme: "neutral",
    text: "Le sommet de l’angle AOB est...",
    format: "qcm",
    choices: ["A", "O", "B", "AB"],
    expected: ["O"],
    comparator: "mcq_exact",
    hint: "Le sommet est le point où les deux côtés de l’angle se rejoignent.",
    explanation: "Définition : un angle mesure l’ouverture entre deux demi-droites et s’exprime en degrés.\n\n" +
          "Méthode : on identifie le sommet, les côtés ou la mesure, puis on utilise la règle ou le rapporteur.\n\nCalcul : " +
          ("Dans l’angle AOB, la lettre du milieu indique le sommet : c’est O.") +
          "\n\nConclusion : la mesure ou le nom trouvé convient pour cet angle.",
    tags: ["angle_mesure", "lire", "vocabulaire", "qcm"],
    canvas: angleCanvas({ angleDeg: 70, showMeasure: false, placeholder: "?" }),
  },
  {
    kind: "fixed",
    id: "angle_lire_qcm_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_lire",
    difficulty: 2,
    theme: "neutral",
    text: "L’angle représenté est de 90°. Comment l’appelle-t-on ?",
    format: "qcm",
    choices: ["angle aigu", "angle droit", "angle obtus", "angle plat"],
    expected: ["angle droit"],
    comparator: "mcq_exact",
    hint: "Un angle droit mesure 90°.",
    explanation: "Définition : un angle mesure l’ouverture entre deux demi-droites et s’exprime en degrés.\n\n" +
          "Méthode : on identifie le sommet, les côtés ou la mesure, puis on utilise la règle ou le rapporteur.\n\nCalcul : " +
          ("Un angle de 90° est un angle droit.") +
          "\n\nConclusion : la mesure ou le nom trouvé convient pour cet angle.",
    tags: ["angle_mesure", "lire", "angle_droit", "qcm"],
    canvas: angleCanvas({ angleDeg: 90, showMeasure: false, showRightAngle: true }),
  },
  // 08/10/2026 : précise et simple (Frédéric)
  {
    kind: "fixed",
    id: "angle_lire_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_lire",
    difficulty: 2,
    theme: "neutral",
    text: "Observe la figure. Quel point est le sommet de l’angle ?",
    format: "qcm",
    choices: ["D", "E", "F"],
    expected: ["E"],
    comparator: "mcq_exact",
    hint: "Regarde le point commun aux deux côtés de l’angle.",
    explanation: expl("Les deux côtés de l’angle partent du même point : E. C’est le sommet. On note l’angle DEF, avec le sommet au milieu."),
    tags: ["angle_mesure", "lire", "qcm", "vocabulaire", "canvas"],
    canvas: angleCanvas({ angleDeg: 50, showMeasure: false, labels: { vertex: "E", left: "D", right: "F" } }),
  },
  {
    kind: "template",
    id: "angle_lire_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_lire",
    difficulty: 2,
    theme: "neutral",
    hint: "Le sommet est la lettre du milieu du nom ; la mesure s’écrit en degrés.",
    tags: ["angle_mesure", "lire", "template", "canvas"],
    generate: () => genLire(2),
  },

  // =========================
  // ANGLE_MESURER
  // =========================
  {
    kind: "fixed",
    id: "angle_mesurer_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_mesurer",
    difficulty: 2,
    theme: "neutral",
    text: "Pour mesurer un angle, quel instrument utilise-t-on ?",
    format: "qcm",
    choices: ["un compas", "un rapporteur", "une équerre seulement", "une balance"],
    expected: ["un rapporteur"],
    comparator: "mcq_exact",
    hint: "L’instrument sert à lire une mesure en degrés.",
    explanation: "Définition : un angle mesure l’ouverture entre deux demi-droites et s’exprime en degrés.\n\n" +
          "Méthode : on identifie le sommet, les côtés ou la mesure, puis on utilise la règle ou le rapporteur.\n\nCalcul : " +
          ("On mesure un angle avec un rapporteur.") +
          "\n\nConclusion : la mesure ou le nom trouvé convient pour cet angle.",
    tags: ["angle_mesure", "mesurer", "qcm", "instrument"],
  },
  {
    kind: "fixed",
    id: "angle_mesurer_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_mesurer",
    difficulty: 2,
    theme: "neutral",
    text: "La mesure de l’angle est cachée. Quelle est sa mesure ? Réponds par un nombre.",
    format: "short",
    expected: ["45"],
    comparator: "number_equal",
    hint: "L’angle est deux fois plus petit qu’un angle droit.",
    explanation: "Définition : un angle mesure l’ouverture entre deux demi-droites et s’exprime en degrés.\n\n" +
          "Méthode : on identifie le sommet, les côtés ou la mesure, puis on utilise la règle ou le rapporteur.\n\nCalcul : " +
          ("L’angle représenté mesure 45°.") +
          "\n\nConclusion : la mesure ou le nom trouvé convient pour cet angle.",
    tags: ["angle_mesure", "mesurer", "canvas"],
    canvas: angleCanvas({ angleDeg: 45, showMeasure: false, placeholder: "?" }),
  },
  {
    kind: "fixed",
    id: "angle_mesurer_qcm_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_mesurer",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève place mal le centre du rapporteur. Que risque-t-il ?",
    format: "qcm",
    choices: [
      "lire une mesure fausse",
      "obtenir toujours 90°",
      "transformer l’angle en segment",
      "changer le sommet de l’angle",
    ],
    expected: ["lire une mesure fausse"],
    comparator: "mcq_exact",
    hint: "Le centre du rapporteur doit être placé sur le sommet de l’angle.",
    explanation: "Définition : un angle mesure l’ouverture entre deux demi-droites et s’exprime en degrés.\n\n" +
          "Méthode : on identifie le sommet, les côtés ou la mesure, puis on utilise la règle ou le rapporteur.\n\nCalcul : " +
          ("Si le centre du rapporteur est mal placé, la mesure lue peut être fausse.") +
          "\n\nConclusion : la mesure ou le nom trouvé convient pour cet angle.",
    tags: ["angle_mesure", "mesurer", "rapporteur", "piege", "qcm"],
  },
  // 08/10/2026 : précise et simple (Frédéric)
  {
    kind: "fixed",
    id: "angle_mesurer_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_mesurer",
    difficulty: 3,
    theme: "neutral",
    text: "Un côté de l’angle passe par le 0 de la graduation extérieure. L’autre côté passe par 50 (extérieure) et 130 (intérieure). Combien mesure l’angle ?",
    format: "short",
    expected: ["50"],
    comparator: "number_equal",
    hint: "On lit sur la graduation qui part de 0.",
    explanation: expl("Le premier côté est sur le 0 de la graduation extérieure. On lit donc sur la graduation extérieure : 50. L’angle mesure 50°."),
    tags: ["angle_mesure", "mesurer", "short", "rapporteur"],
  },
  {
    kind: "template",
    id: "angle_mesurer_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_mesurer",
    difficulty: 3,
    theme: "neutral",
    hint: "Pars du 0 posé sur un côté, et lis sur CETTE graduation. Vérifie : aigu ou obtus ?",
    tags: ["angle_mesure", "mesurer", "template", "canvas"],
    generate: () => genMesurer(3),
  },

  // =========================
  // ANGLE_TRACER
  // =========================
  {
    kind: "fixed",
    id: "angle_tracer_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_tracer",
    difficulty: 2,
    theme: "neutral",
    text: "Pour tracer un angle de 50°, quelle mesure doit-on repérer sur le rapporteur ?",
    format: "short",
    expected: ["50"],
    comparator: "number_equal",
    hint: "La mesure demandée est 50°.",
    explanation: "Définition : un angle mesure l’ouverture entre deux demi-droites et s’exprime en degrés.\n\n" +
          "Méthode : on identifie le sommet, les côtés ou la mesure, puis on utilise la règle ou le rapporteur.\n\nCalcul : " +
          ("Pour tracer un angle de 50°, on repère la graduation 50° sur le rapporteur.") +
          "\n\nConclusion : la mesure ou le nom trouvé convient pour cet angle.",
    tags: ["angle_mesure", "tracer", "rapporteur"],
    canvas: angleCanvas({ angleDeg: 50, showMeasure: true }),
  },
  {
    kind: "fixed",
    id: "angle_tracer_qcm_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_tracer",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la première étape pour tracer un angle AOB ?",
    format: "qcm",
    choices: [
      "choisir le sommet O",
      "calculer une moyenne",
      "additionner deux côtés",
      "tracer un cercle complet",
    ],
    expected: ["choisir le sommet O"],
    comparator: "mcq_exact",
    hint: "Un angle se construit à partir de son sommet.",
    explanation: "Définition : un angle mesure l’ouverture entre deux demi-droites et s’exprime en degrés.\n\n" +
          "Méthode : on identifie le sommet, les côtés ou la mesure, puis on utilise la règle ou le rapporteur.\n\nCalcul : " +
          ("Pour tracer un angle AOB, on commence par placer le sommet O.") +
          "\n\nConclusion : la mesure ou le nom trouvé convient pour cet angle.",
    tags: ["angle_mesure", "tracer", "qcm", "methode"],
  },
  {
    kind: "fixed",
    id: "angle_tracer_qcm_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_tracer",
    difficulty: 3,
    theme: "neutral",
    text: "Pour tracer un angle de 120°, que doit-on obtenir ?",
    format: "qcm",
    choices: ["un angle aigu", "un angle droit", "un angle obtus", "un angle nul"],
    expected: ["un angle obtus"],
    comparator: "mcq_exact",
    hint: "120° est plus grand que 90° et plus petit que 180°.",
    explanation: "Définition : un angle mesure l’ouverture entre deux demi-droites et s’exprime en degrés.\n\n" +
          "Méthode : on identifie le sommet, les côtés ou la mesure, puis on utilise la règle ou le rapporteur.\n\nCalcul : " +
          ("Un angle de 120° est plus grand que 90° : c’est un angle obtus.") +
          "\n\nConclusion : la mesure ou le nom trouvé convient pour cet angle.",
    tags: ["angle_mesure", "tracer", "obtus", "qcm"],
    canvas: angleCanvas({ angleDeg: 120, showMeasure: true }),
  },
  // 08/10/2026 : précise et simple (Frédéric)
  {
    kind: "fixed",
    id: "angle_tracer_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_tracer",
    difficulty: 4,
    theme: "neutral",
    text: "Tu viens de tracer un angle de 70°. Pour vérifier ton tracé : il doit être aigu ou obtus ?",
    format: "qcm",
    choices: ["obtus", "aigu", "droit"],
    expected: ["aigu"],
    comparator: "mcq_exact",
    hint: "Compare 70° à 90°.",
    explanation: expl("70° est plus petit que 90° : l’angle tracé doit être aigu. S’il est obtus, tu as lu 110 sur la mauvaise graduation."),
    tags: ["angle_mesure", "tracer", "qcm", "verification"],
  },
  {
    kind: "template",
    id: "angle_tracer_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_tracer",
    difficulty: 3,
    theme: "neutral",
    hint: "Centre sur le sommet, 0 sur le premier côté ; un angle de moins de 90° est aigu.",
    tags: ["angle_mesure", "tracer", "template"],
    generate: () => genTracer(3),
  },

  // =========================
  // ANGLE_ESTIMER
  // =========================
  {
    kind: "fixed",
    id: "angle_estimer_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_estimer",
    difficulty: 2,
    theme: "neutral",
    text: "Sans mesurer précisément, cet angle est plutôt...",
    format: "qcm",
    choices: ["aigu", "droit", "obtus", "plat"],
    expected: ["aigu"],
    comparator: "mcq_exact",
    hint: "Il est plus petit qu’un angle droit.",
    explanation: "Définition : un angle mesure l’ouverture entre deux demi-droites et s’exprime en degrés.\n\n" +
          "Méthode : on identifie le sommet, les côtés ou la mesure, puis on utilise la règle ou le rapporteur.\n\nCalcul : " +
          ("L’angle représenté mesure environ 50°. Il est donc aigu.") +
          "\n\nConclusion : la mesure ou le nom trouvé convient pour cet angle.",
    tags: ["angle_mesure", "estimer", "aigu", "canvas", "qcm"],
    canvas: angleCanvas({ angleDeg: 50, showMeasure: false, placeholder: "?" }),
  },
  {
    kind: "fixed",
    id: "angle_estimer_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_estimer",
    difficulty: 2,
    theme: "neutral",
    text: "À vue d’œil, sans rapporteur, comment nomme-t-on cet angle ?",
    format: "qcm",
    choices: ["aigu", "droit", "obtus", "nul"],
    expected: ["obtus"],
    comparator: "mcq_exact",
    hint: "Il est plus grand qu’un angle droit.",
    explanation: "Définition : un angle mesure l’ouverture entre deux demi-droites et s’exprime en degrés.\n\n" +
          "Méthode : on identifie le sommet, les côtés ou la mesure, puis on utilise la règle ou le rapporteur.\n\nCalcul : " +
          ("L’angle représenté mesure environ 120°. Il est donc obtus.") +
          "\n\nConclusion : la mesure ou le nom trouvé convient pour cet angle.",
    tags: ["angle_mesure", "estimer", "obtus", "canvas", "qcm"],
    canvas: angleCanvas({ angleDeg: 120, showMeasure: false, placeholder: "?" }),
  },
  {
    kind: "fixed",
    id: "angle_estimer_qcm_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_estimer",
    difficulty: 3,
    theme: "neutral",
    text: "Un angle légèrement plus grand qu’un angle droit mesure probablement...",
    format: "qcm",
    choices: ["45°", "90°", "100°", "180°"],
    expected: ["100°"],
    comparator: "mcq_exact",
    hint: "Un angle droit mesure 90°.",
    explanation: "Définition : un angle mesure l’ouverture entre deux demi-droites et s’exprime en degrés.\n\n" +
          "Méthode : on identifie le sommet, les côtés ou la mesure, puis on utilise la règle ou le rapporteur.\n\nCalcul : " +
          ("Un angle légèrement plus grand que 90° peut mesurer environ 100°.") +
          "\n\nConclusion : la mesure ou le nom trouvé convient pour cet angle.",
    tags: ["angle_mesure", "estimer", "qcm", "piege"],
  },
  // 08/10/2026 : précise et simple (Frédéric)
  {
    kind: "fixed",
    id: "angle_estimer_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_estimer",
    difficulty: 3,
    theme: "neutral",
    text: "Observe la figure. Compare l’angle à un angle droit. L’angle est :",
    format: "qcm",
    choices: ["aigu", "obtus", "droit"],
    expected: ["obtus"],
    comparator: "mcq_exact",
    hint: "Compare l’angle à un angle droit.",
    explanation: expl("L’angle est plus ouvert qu’un angle droit (90°) et moins qu’un angle plat (180°) : il est obtus."),
    tags: ["angle_mesure", "estimer", "qcm", "canvas"],
    canvas: angleCanvas({ angleDeg: 125, showMeasure: false, placeholder: "?" }),
  },
  {
    kind: "template",
    id: "angle_estimer_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_estimer",
    difficulty: 3,
    theme: "neutral",
    hint: "Compare l’angle au coin d’une feuille (90°) et au demi-tour (180°).",
    tags: ["angle_mesure", "estimer", "template", "canvas"],
    generate: () => genEstimer(3),
  },

  // =========================
  // ANGLE_DEFIS
  // =========================
  // 08/10/2026 : précise et simple (Frédéric)
  {
    kind: "fixed",
    id: "angle_defi_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un angle obtus mesure plus de 90° et moins de 180°. Lequel de ces angles est obtus ?",
    format: "qcm",
    choices: ["85°", "90°", "120°", "180°"],
    expected: ["120°"],
    comparator: "mcq_exact",
    hint: "« Grand » ne suffit pas : regarde les seuils 90° et 180°.",
    explanation: expl("120° est entre 90° et 180° : il est obtus. 180° est grand, mais c’est un angle plat. 90° est droit. 85° est aigu."),
    tags: ["angle_mesure", "defi", "qcm", "raisonnement", "piege"],
  },
  {
    kind: "fixed",
    id: "angle_defi_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_defi",
    difficulty: 4,
    theme: "sport",
    text: "Un skateur tourne d’environ 90°. Quel type d’angle décrit ce virage ?",
    format: "qcm",
    choices: ["angle aigu", "angle droit", "angle obtus", "angle plat"],
    expected: ["angle droit"],
    comparator: "mcq_exact",
    hint: "90° correspond à un angle droit.",
    explanation: "Définition : un angle mesure l’ouverture entre deux demi-droites et s’exprime en degrés.\n\n" +
          "Méthode : on identifie le sommet, les côtés ou la mesure, puis on utilise la règle ou le rapporteur.\n\nCalcul : " +
          ("Un virage de 90° correspond à un angle droit.") +
          "\n\nConclusion : la mesure ou le nom trouvé convient pour cet angle.",
    tags: ["angle_mesure", "defi", "sport", "angle_droit"],
    canvas: angleCanvas({ angleDeg: 90, showMeasure: false, showRightAngle: true }),
  },
  {
    kind: "fixed",
    id: "angle_defi_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_defi",
    difficulty: 5,
    theme: "reunion",
    text: "Sur une carte de randonnée à La Réunion, deux chemins forment un angle d’environ 120°. Est-ce un angle aigu, droit ou obtus ?",
    format: "qcm",
    choices: ["aigu", "droit", "obtus", "nul"],
    expected: ["obtus"],
    comparator: "mcq_exact",
    hint: "Compare 120° à 90°.",
    explanation: "Définition : un angle mesure l’ouverture entre deux demi-droites et s’exprime en degrés.\n\n" +
          "Méthode : on identifie le sommet, les côtés ou la mesure, puis on utilise la règle ou le rapporteur.\n\nCalcul : " +
          ("120° est plus grand que 90° et plus petit que 180°. C’est donc un angle obtus.") +
          "\n\nConclusion : la mesure ou le nom trouvé convient pour cet angle.",
    tags: ["angle_mesure", "defi", "reunion", "obtus"],
    canvas: angleCanvas({ angleDeg: 120, showMeasure: true }),
  },
  {
    kind: "template",
    id: "angle_defi_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Un tour complet fait 360°, un demi-tour 180° ; sur une horloge, une heure fait 30°.",
    tags: ["angle_mesure", "defi", "template", "raisonnement"],
    generate: () => genDefi(5),
  },
  // 08/10/2026 : précise et simple (Frédéric)
  {
    kind: "template",
    id: "angle_defi_open_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Un tour complet fait 360°, un demi-tour 180° ; sur une horloge, une heure fait 30°.",
    tags: ["angle_mesure", "defi", "template"],
    generate: () => genDefi(5),
  },

  // =========================
  // TOP-UP — ANGLE_LIRE (+5)
  // =========================
  {
    kind: "fixed",
    id: "angle_lire_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_lire",
    difficulty: 1,
    theme: "neutral",
    text: "La mesure est écrite sur la figure. Recopie-la en chiffres.",
    format: "short",
    expected: ["50"],
    comparator: "number_equal",
    hint: "Lis la mesure en bleu.",
    explanation: expl("La mesure indiquée sur la figure est 50°. La réponse est donc 50."),
    tags: ["angle_mesure", "lire", "canvas"],
    canvas: angleCanvas({ angleDeg: 50, showMeasure: true }),
  },
  {
    kind: "fixed",
    id: "angle_lire_qcm_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_lire",
    difficulty: 2,
    theme: "neutral",
    text: "Dans l’angle xOy, quels sont les côtés de l’angle ?",
    format: "qcm",
    choices: ["[Ox) et [Oy)", "O seul", "le point x", "l’arc seulement"],
    expected: ["[Ox) et [Oy)"],
    comparator: "mcq_exact",
    hint: "Les côtés partent du sommet O.",
    explanation: expl("Les côtés de l’angle xOy sont les demi-droites [Ox) et [Oy), qui partent du sommet O."),
    tags: ["angle_mesure", "lire", "vocabulaire", "qcm"],
  },
  {
    kind: "fixed",
    id: "angle_lire_qcm_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_lire",
    difficulty: 2,
    theme: "neutral",
    text: "Un angle de 130° est de quel type ?",
    format: "qcm",
    choices: ["aigu", "droit", "obtus", "plat"],
    expected: ["obtus"],
    comparator: "mcq_exact",
    hint: "Compare 130° à 90° et 180°.",
    explanation: expl("130° est compris entre 90° et 180° : c’est un angle obtus."),
    tags: ["angle_mesure", "lire", "obtus", "qcm"],
    canvas: angleCanvas({ angleDeg: 130, showMeasure: true }),
  },
  // 08/10/2026 : précise et simple (Frédéric)
  {
    kind: "fixed",
    id: "angle_lire_open_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_lire",
    difficulty: 2,
    theme: "neutral",
    text: "On note un angle RST. Quel point est son sommet ?",
    format: "qcm",
    choices: ["R", "S", "T"],
    expected: ["S"],
    comparator: "mcq_exact",
    hint: "Le sommet est toujours la lettre du milieu.",
    explanation: expl("Dans l’angle RST, la lettre du milieu est S. C’est le sommet : le point où les deux côtés se rejoignent."),
    tags: ["angle_mesure", "lire", "qcm", "vocabulaire"],
  },
  {
    kind: "template",
    id: "angle_lire_tpl_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_lire",
    difficulty: 2,
    theme: "neutral",
    hint: "Le sommet est la lettre du milieu du nom ; la mesure s’écrit en degrés.",
    tags: ["angle_mesure", "lire", "template", "canvas"],
    generate: () => genLire(2),
  },

  // =========================
  // TOP-UP — ANGLE_MESURER (+5)
  // =========================
  {
    kind: "fixed",
    id: "angle_mesurer_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_mesurer",
    difficulty: 2,
    theme: "neutral",
    text: "Sur quel point doit-on placer le centre du rapporteur pour mesurer un angle ?",
    format: "qcm",
    choices: ["sur le sommet", "sur un côté", "au milieu de l’arc", "n’importe où"],
    expected: ["sur le sommet"],
    comparator: "mcq_exact",
    hint: "Le centre va au point de rencontre des côtés.",
    explanation: expl("Le centre du rapporteur doit être placé exactement sur le sommet de l’angle."),
    tags: ["angle_mesure", "mesurer", "rapporteur", "qcm"],
  },
  {
    kind: "fixed",
    id: "angle_mesurer_fixed_4",
    niveau: "5e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_mesurer",
    difficulty: 2,
    theme: "neutral",
    text: "Un petit carré marque cet angle. Quelle est sa mesure ? Réponds par un nombre.",
    format: "short",
    expected: ["90"],
    comparator: "number_equal",
    hint: "C’est un angle droit.",
    explanation: expl("L’angle représenté est un angle droit : il mesure 90°."),
    tags: ["angle_mesure", "mesurer", "canvas"],
    canvas: angleCanvas({ angleDeg: 90, showMeasure: false, showRightAngle: true, placeholder: "?" }),
  },
  {
    kind: "fixed",
    id: "angle_mesurer_qcm_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_mesurer",
    difficulty: 3,
    theme: "neutral",
    text: "Un rapporteur a deux graduations (0 à 180 dans les deux sens). Comment savoir laquelle lire ?",
    format: "qcm",
    choices: [
      "on part du 0 aligné avec un côté de l’angle",
      "on prend toujours la plus grande",
      "on prend toujours la plus petite",
      "on additionne les deux",
    ],
    expected: ["on part du 0 aligné avec un côté de l’angle"],
    comparator: "mcq_exact",
    hint: "On suit la graduation qui commence à 0 sur un côté.",
    explanation: expl("On lit la graduation qui commence à 0 sur le côté aligné de l’angle, puis on suit jusqu’au second côté."),
    tags: ["angle_mesure", "mesurer", "rapporteur", "qcm"],
  },
  {
    kind: "fixed",
    id: "angle_mesurer_fixed_5",
    niveau: "5e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_mesurer",
    difficulty: 2,
    theme: "neutral",
    text: "Cet angle vaut les deux tiers d’un angle droit. Quelle est sa mesure ? Réponds par un nombre.",
    format: "short",
    expected: ["60"],
    comparator: "number_equal",
    hint: "Un angle droit mesure 90°. Prends-en les deux tiers.",
    explanation: expl("Les deux tiers de 90°, c’est 90 ÷ 3 × 2 = 60. L’angle mesure 60°."),
    tags: ["angle_mesure", "mesurer", "canvas"],
    canvas: angleCanvas({ angleDeg: 60, showMeasure: false, placeholder: "?" }),
  },
  {
    kind: "template",
    id: "angle_mesurer_tpl_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_mesurer",
    difficulty: 3,
    theme: "neutral",
    hint: "Pars du 0 posé sur un côté, et lis sur CETTE graduation. Vérifie : aigu ou obtus ?",
    tags: ["angle_mesure", "mesurer", "template", "canvas"],
    generate: () => genMesurer(3),
  },

  // =========================
  // TOP-UP — ANGLE_TRACER (+5)
  // =========================
  {
    kind: "fixed",
    id: "angle_tracer_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_tracer",
    difficulty: 2,
    theme: "neutral",
    text: "Pour tracer un angle de 35°, quelle graduation repère-t-on sur le rapporteur ?",
    format: "short",
    expected: ["35"],
    comparator: "number_equal",
    hint: "C’est la mesure demandée.",
    explanation: expl("On repère la graduation 35° sur le rapporteur."),
    tags: ["angle_mesure", "tracer", "rapporteur"],
    canvas: angleCanvas({ angleDeg: 35, showMeasure: true }),
  },
  {
    kind: "fixed",
    id: "angle_tracer_qcm_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_tracer",
    difficulty: 2,
    theme: "neutral",
    text: "Après avoir placé le sommet, quelle est l’étape suivante pour tracer un angle ?",
    format: "qcm",
    choices: [
      "tracer un premier côté (demi-droite)",
      "tracer un cercle",
      "calculer une aire",
      "écrire la réponse",
    ],
    expected: ["tracer un premier côté (demi-droite)"],
    comparator: "mcq_exact",
    hint: "On a besoin d’un premier côté avant de poser le rapporteur.",
    explanation: expl("Après le sommet, on trace un premier côté (une demi-droite) qui servira de référence pour le rapporteur."),
    tags: ["angle_mesure", "tracer", "qcm", "methode"],
  },
  {
    kind: "fixed",
    id: "angle_tracer_qcm_4",
    niveau: "5e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_tracer",
    difficulty: 3,
    theme: "neutral",
    text: "Pour tracer un angle de 45°, quel type d’angle obtient-on ?",
    format: "qcm",
    choices: ["un angle aigu", "un angle droit", "un angle obtus", "un angle plat"],
    expected: ["un angle aigu"],
    comparator: "mcq_exact",
    hint: "45° est plus petit que 90°.",
    explanation: expl("45° est inférieur à 90° : on obtient un angle aigu."),
    tags: ["angle_mesure", "tracer", "aigu", "qcm"],
    canvas: angleCanvas({ angleDeg: 45, showMeasure: true }),
  },
  {
    kind: "fixed",
    id: "angle_tracer_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_tracer",
    difficulty: 3,
    theme: "neutral",
    text: "Pour tracer un angle de 90°, quel instrument est le plus rapide à utiliser ?",
    format: "qcm",
    choices: ["l’équerre", "le compas seul", "la calculatrice", "la gomme"],
    expected: ["l’équerre"],
    comparator: "mcq_exact",
    hint: "Un angle droit se trace facilement avec un instrument dédié.",
    explanation: expl("Pour un angle droit (90°), l’équerre est l’instrument le plus rapide."),
    tags: ["angle_mesure", "tracer", "angle_droit", "qcm"],
  },
  {
    kind: "template",
    id: "angle_tracer_tpl_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_tracer",
    difficulty: 3,
    theme: "neutral",
    hint: "Centre sur le sommet, 0 sur le premier côté ; un angle de moins de 90° est aigu.",
    tags: ["angle_mesure", "tracer", "template"],
    generate: () => genTracer(3),
  },

  // =========================
  // TOP-UP — ANGLE_ESTIMER (+5)
  // =========================
  {
    kind: "fixed",
    id: "angle_estimer_qcm_4",
    niveau: "5e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_estimer",
    difficulty: 2,
    theme: "neutral",
    text: "Sans mesurer, cet angle est plutôt...",
    format: "qcm",
    choices: ["aigu", "droit", "obtus", "plat"],
    expected: ["obtus"],
    comparator: "mcq_exact",
    hint: "Il est plus ouvert qu’un angle droit.",
    explanation: expl("L’angle représenté mesure environ 130° : il est plus ouvert qu’un angle droit, donc obtus."),
    tags: ["angle_mesure", "estimer", "obtus", "canvas", "qcm"],
    canvas: angleCanvas({ angleDeg: 130, showMeasure: false, placeholder: "?" }),
  },
  {
    kind: "fixed",
    id: "angle_estimer_qcm_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_estimer",
    difficulty: 2,
    theme: "neutral",
    text: "Parmi ces estimations, laquelle est la plus proche d’un angle droit ?",
    format: "qcm",
    choices: ["88°", "45°", "150°", "20°"],
    expected: ["88°"],
    comparator: "mcq_exact",
    hint: "Un angle droit mesure 90°.",
    explanation: expl("88° est très proche de 90°, la mesure d’un angle droit."),
    tags: ["angle_mesure", "estimer", "angle_droit", "qcm"],
  },
  // 08/10/2026 : précise et simple (Frédéric)
  {
    kind: "fixed",
    id: "angle_estimer_open_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_estimer",
    difficulty: 3,
    theme: "neutral",
    text: "Un angle est plus ouvert que le coin d’une feuille, mais moins qu’une ligne droite. Il est :",
    format: "qcm",
    choices: ["aigu", "plat", "obtus"],
    expected: ["obtus"],
    comparator: "mcq_exact",
    hint: "Le coin d’une feuille est un angle droit (90°).",
    explanation: expl("Le coin d’une feuille fait 90°. Une ligne droite fait 180°. Entre les deux, l’angle est obtus."),
    tags: ["angle_mesure", "estimer", "qcm"],
  },
  {
    kind: "fixed",
    id: "angle_estimer_qcm_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_estimer",
    difficulty: 3,
    theme: "neutral",
    text: "Un angle a une ouverture juste un peu plus petite qu’un coin de feuille. Son type est probablement :",
    format: "qcm",
    choices: ["aigu", "obtus", "plat", "nul"],
    expected: ["aigu"],
    comparator: "mcq_exact",
    hint: "Le coin d’une feuille fait 90°.",
    explanation: expl("Le coin d’une feuille mesure 90°. Un peu plus petit, l’angle est aigu."),
    tags: ["angle_mesure", "estimer", "aigu", "qcm"],
  },
  {
    kind: "template",
    id: "angle_estimer_tpl_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_estimer",
    difficulty: 3,
    theme: "neutral",
    hint: "Compare l’angle au coin d’une feuille (90°) et au demi-tour (180°).",
    tags: ["angle_mesure", "estimer", "template", "canvas"],
    generate: () => genEstimer(3),
  },

  // =========================
  // TOP-UP — ANGLE_DEFI (+5)
  // =========================
  {
    kind: "fixed",
    id: "angle_defi_fixed_4",
    niveau: "5e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_paires",
    difficulty: 4,
    theme: "neutral",
    text: "Deux angles adjacents mesurent 40° et 50°. Quelle est la mesure de l’angle total ?",
    format: "short",
    expected: ["90"],
    comparator: "number_equal",
    hint: "On additionne les deux angles adjacents.",
    explanation: expl("Deux angles adjacents s’additionnent : 40° + 50° = 90°."),
    tags: ["angle_mesure", "defi", "adjacents"],
  },
  {
    kind: "fixed",
    id: "angle_defi_fixed_5",
    niveau: "5e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_paires",
    difficulty: 5,
    theme: "neutral",
    text: "Un angle mesure 70°. Combien mesure son complément (pour atteindre 90°) ?",
    format: "short",
    expected: ["20"],
    comparator: "number_equal",
    hint: "90 - 70.",
    explanation: expl("Le complément d’un angle de 70° est 90 - 70 = 20°."),
    tags: ["angle_mesure", "defi", "complementaire"],
  },
  {
    kind: "fixed",
    id: "angle_defi_qcm_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_paires",
    difficulty: 5,
    theme: "neutral",
    text: "Un angle mesure 110°. Combien mesure son supplément (pour atteindre 180°) ?",
    format: "qcm",
    choices: ["70°", "90°", "80°", "110°"],
    expected: ["70°"],
    comparator: "mcq_exact",
    hint: "180 - 110.",
    explanation: expl("Le supplément d’un angle de 110° est 180 - 110 = 70°."),
    tags: ["angle_mesure", "defi", "supplementaire", "qcm"],
  },
  {
    kind: "fixed",
    id: "angle_defi_fixed_6",
    niveau: "5e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_defi",
    difficulty: 5,
    theme: "reunion",
    text: "Sur un cadran d’horloge à Saint-Denis, il est 3 h. Quel angle forment la petite et la grande aiguille ?",
    format: "qcm",
    choices: ["90°", "45°", "60°", "180°"],
    expected: ["90°"],
    comparator: "mcq_exact",
    hint: "À 3 h, les aiguilles forment un quart de tour.",
    explanation: expl("À 3 h, l’écart est d’un quart de tour, soit 90° (un angle droit)."),
    tags: ["angle_mesure", "defi", "reunion", "qcm"],
    canvas: angleCanvas({ angleDeg: 90, showMeasure: false, showRightAngle: true }),
  },
  {
    kind: "template",
    id: "angle_defi_tpl_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_paires",
    difficulty: 5,
    theme: "neutral",
    hint: "Complémentaires : 90° à eux deux. Supplémentaires, ou alignés : 180°.",
    tags: ["angle_mesure", "defi", "template", "calcul"],
    generate: () => genPaires(5),
  },

  /* ===== ANGLE_PAIRES =====
     Deux angles qui se tiennent : complémentaires, supplémentaires, opposés
     par le sommet. Les items figés portent les propriétés et les valeurs qui
     se retiennent (45° son propre complément, 90° son propre supplément) ;
     les calculs, eux, sont générés. */
  {
    kind: "fixed",
    id: "angle_paires_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_paires",
    difficulty: 1,
    theme: "neutral",
    text: "Deux angles sont complémentaires. Combien vaut la somme de leurs mesures ?",
    format: "qcm",
    choices: ["90°", "180°", "45°", "360°"],
    expected: ["90°"],
    comparator: "mcq_exact",
    hint: "Complémentaires : ensemble, ils forment un angle droit.",
    explanation: expl(
      "Deux angles complémentaires forment ensemble un angle droit : leurs mesures s’additionnent pour faire 90°.",
    ),
    tags: ["angle_mesure", "paires", "complementaire", "propriete", "qcm"],
  },
  {
    kind: "fixed",
    id: "angle_paires_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_paires",
    difficulty: 1,
    theme: "neutral",
    text: "Deux angles sont supplémentaires. Combien vaut la somme de leurs mesures ?",
    format: "qcm",
    choices: ["180°", "90°", "360°", "270°"],
    expected: ["180°"],
    comparator: "mcq_exact",
    hint: "Supplémentaires : mis bout à bout, ils forment un angle plat.",
    explanation: expl(
      "Deux angles supplémentaires forment ensemble un angle plat : leurs mesures s’additionnent pour faire 180°.",
    ),
    tags: ["angle_mesure", "paires", "supplementaire", "propriete", "qcm"],
  },
  {
    kind: "fixed",
    id: "angle_paires_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_paires",
    difficulty: 3,
    theme: "neutral",
    text: "Un angle est complémentaire de lui-même. Quelle est sa mesure ? Réponds par un nombre.",
    format: "short",
    expected: ["45"],
    comparator: "number_equal",
    hint: "Deux angles égaux dont la somme fait 90°.",
    explanation: expl(
      "Si les deux angles sont égaux et que leur somme fait 90°, chacun vaut 90 ÷ 2 = 45°. C’est le seul angle qui est son propre complémentaire.",
    ),
    tags: ["angle_mesure", "paires", "remarquable", "complementaire"],
    canvas: angleCanvas({ angleDeg: 45, showMeasure: false, placeholder: "?" }),
  },
  {
    kind: "fixed",
    id: "angle_paires_fixed_4",
    niveau: "5e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_paires",
    difficulty: 3,
    theme: "neutral",
    text: "Un angle est supplémentaire de lui-même. Quelle est sa mesure ? Réponds par un nombre.",
    format: "short",
    expected: ["90"],
    comparator: "number_equal",
    hint: "Deux angles égaux dont la somme fait 180°.",
    explanation: expl(
      "Si les deux angles sont égaux et que leur somme fait 180°, chacun vaut 180 ÷ 2 = 90°. L’angle droit est son propre supplémentaire.",
    ),
    tags: ["angle_mesure", "paires", "remarquable", "supplementaire"],
    canvas: angleCanvas({ angleDeg: 90, showMeasure: false, showRightAngle: true, placeholder: "?" }),
  },
  {
    kind: "fixed",
    id: "angle_paires_qcm_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_paires",
    difficulty: 3,
    theme: "neutral",
    text: "Un angle mesure 40°, l’autre 50°. Comment sont-ils ?",
    format: "qcm",
    choices: [
      "complémentaires",
      "supplémentaires",
      "opposés par le sommet",
      "ni l’un ni l’autre",
    ],
    expected: ["complémentaires"],
    comparator: "mcq_exact",
    hint: "Additionne-les avant de choisir.",
    explanation: expl(
      "40 + 50 = 90. La somme fait un angle droit, donc les deux angles sont complémentaires. Le piège : on confond souvent avec supplémentaires, qui vaut 180°.",
    ),
    tags: ["angle_mesure", "paires", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "angle_paires_qcm_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_paires",
    difficulty: 2,
    theme: "neutral",
    text: "Deux droites se croisent. Que peut-on dire de deux angles opposés par le sommet ?",
    format: "qcm",
    choices: [
      "ils ont la même mesure",
      "leur somme fait 90°",
      "leur somme fait 180°",
      "on ne peut rien dire",
    ],
    expected: ["ils ont la même mesure"],
    comparator: "mcq_exact",
    hint: "Deux angles opposés par le sommet se font face de part et d’autre du croisement.",
    explanation: expl(
      "Quand deux droites se croisent, elles forment quatre angles. Deux angles qui se font face — opposés par le sommet — ont toujours la même mesure.",
    ),
    tags: ["angle_mesure", "paires", "oppose_sommet", "propriete", "qcm"],
  },
  {
    kind: "fixed",
    id: "angle_paires_fixed_5",
    niveau: "5e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_paires",
    difficulty: 4,
    theme: "reunion",
    text: "À Saint-Pierre, la rue des Bons-Enfants coupe le boulevard Hubert-Delisle. D’un côté du croisement, l’angle mesure 115°. Combien mesure l’angle juste à côté, de l’autre côté de la rue ? Réponds par un nombre.",
    format: "short",
    expected: ["65"],
    comparator: "number_equal",
    hint: "Les deux angles mis bout à bout font un angle plat.",
    explanation: expl(
      "Les deux angles sont adjacents et forment ensemble la ligne droite du boulevard : ils sont supplémentaires. 180 - 115 = 65°.",
    ),
    tags: ["angle_mesure", "paires", "reunion", "supplementaire"],
  },
  // 08/10/2026 : précise et simple (Frédéric)
  {
    kind: "fixed",
    id: "angle_paires_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_paires",
    difficulty: 3,
    theme: "neutral",
    text: "Deux angles mesurent 35° et 55°. Ils sont :",
    format: "qcm",
    choices: ["supplémentaires", "complémentaires", "ni l’un ni l’autre"],
    expected: ["complémentaires"],
    comparator: "mcq_exact",
    hint: "Additionne les deux mesures.",
    explanation: expl("35 + 55 = 90. La somme fait 90° : les angles sont complémentaires. (Supplémentaires : la somme ferait 180°.)"),
    tags: ["angle_mesure", "paires", "qcm", "vocabulaire"],
  },
  // 08/10/2026 : précise et simple (Frédéric)
  {
    kind: "fixed",
    id: "angle_paires_open_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_paires",
    difficulty: 4,
    theme: "neutral",
    text: "Deux droites se croisent. Deux angles voisins forment un angle plat. L’un mesure 130°. Combien mesure l’autre ?",
    format: "short",
    expected: ["50"],
    comparator: "number_equal",
    hint: "Un angle plat mesure 180°.",
    explanation: expl("Les deux angles voisins font 180° : 180 − 130 = 50. L’autre angle mesure 50°. L’angle opposé au 130° est voisin du même angle de 50° : il mesure aussi 180 − 50 = 130°. C’est pour cela que deux angles opposés par le sommet ont la même mesure."),
    tags: ["angle_mesure", "paires", "short", "raisonnement"],
  },
  {
    kind: "template",
    id: "angle_paires_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_paires",
    difficulty: 3,
    theme: "neutral",
    hint: "Complémentaires : 90°. Supplémentaires : 180°. Opposés par le sommet : même mesure. Adjacents : on additionne.",
    tags: ["angle_mesure", "paires", "oppose_sommet", "template"],
    generate: () => genPaires(3),
  },
  // 08/10/2026 : précise et simple (Frédéric)
  {
    kind: "template",
    id: "angle_paires_tpl_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_paires",
    difficulty: 4,
    theme: "neutral",
    hint: "Complémentaires : 90° à eux deux. Supplémentaires, ou voisins sur une droite : 180°.",
    tags: ["angle_mesure", "paires", "short", "template"],
    generate: () => genPaires(4),
  },

  /* ===== ANGLE_PARALLELES =====
     Deux parallèles et une sécante. Les propriétés (alternes-internes égaux,
     correspondants égaux) et les pièges (droites non parallèles, réciproque)
     sont figés ; les mesures à calculer sont générées. */
  {
    kind: "fixed",
    id: "angle_paralleles_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_paralleles",
    difficulty: 2,
    theme: "neutral",
    text: "Deux droites parallèles sont coupées par une sécante. Que peut-on dire de deux angles alternes-internes ?",
    format: "qcm",
    choices: [
      "ils ont la même mesure",
      "leur somme fait 180°",
      "leur somme fait 90°",
      "on ne peut rien dire",
    ],
    expected: ["ils ont la même mesure"],
    comparator: "mcq_exact",
    hint: "Alternes-internes : entre les deux parallèles, de part et d’autre de la sécante.",
    explanation: expl(
      "Quand les deux droites coupées sont parallèles, deux angles alternes-internes ont toujours la même mesure. C’est la propriété qui sert à calculer un angle sans le mesurer.",
    ),
    tags: ["angle_mesure", "paralleles", "alterne_interne", "propriete", "qcm"],
    canvas: paralleleCanvas(),
  },
  {
    kind: "fixed",
    id: "angle_paralleles_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_paralleles",
    difficulty: 2,
    theme: "neutral",
    text: "Deux droites parallèles sont coupées par une sécante. Que peut-on dire de deux angles correspondants ?",
    format: "qcm",
    choices: [
      "ils ont la même mesure",
      "leur somme fait 180°",
      "leur somme fait 90°",
      "l’un est le double de l’autre",
    ],
    expected: ["ils ont la même mesure"],
    comparator: "mcq_exact",
    hint: "Correspondants : même position à chacun des deux croisements.",
    explanation: expl(
      "Deux angles correspondants occupent la même position à chacun des deux croisements. Quand les droites coupées sont parallèles, ils ont la même mesure.",
    ),
    tags: ["angle_mesure", "paralleles", "correspondant", "propriete", "qcm"],
    canvas: paralleleCanvas(),
  },
  {
    kind: "fixed",
    id: "angle_paralleles_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_paralleles",
    difficulty: 4,
    theme: "neutral",
    text: "Une sécante coupe deux droites qui ne sont PAS parallèles. Deux angles correspondants sont-ils quand même égaux ?",
    format: "qcm",
    choices: ["non", "oui", "oui, si la sécante est perpendiculaire", "oui, toujours"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "La propriété commence par « si les droites sont parallèles ».",
    explanation: expl(
      "L’égalité des angles correspondants n’est vraie QUE si les deux droites coupées sont parallèles. Sans le parallélisme, les deux angles n’ont aucune raison d’être égaux.",
    ),
    tags: ["angle_mesure", "paralleles", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "angle_paralleles_fixed_4",
    niveau: "5e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_paralleles",
    difficulty: 4,
    theme: "neutral",
    text: "Une sécante coupe deux droites. Deux angles correspondants mesurent 70° chacun. Que peut-on en conclure ?",
    format: "qcm",
    choices: [
      "les deux droites sont parallèles",
      "les deux droites sont perpendiculaires",
      "les deux droites se coupent",
      "on ne peut rien conclure",
    ],
    expected: ["les deux droites sont parallèles"],
    comparator: "mcq_exact",
    hint: "C’est la propriété lue dans l’autre sens.",
    explanation: expl(
      "La propriété se lit dans les deux sens. Si deux angles correspondants sont égaux, alors les deux droites coupées sont parallèles : c’est ainsi qu’on démontre un parallélisme sans règle ni équerre.",
    ),
    tags: ["angle_mesure", "paralleles", "reciproque", "qcm"],
  },
  {
    kind: "fixed",
    id: "angle_paralleles_fixed_5",
    niveau: "5e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_paralleles",
    difficulty: 3,
    theme: "neutral",
    text: "Les droites (d1) et (d2) sont parallèles, coupées par la sécante (s) en A et en B. En A, l’angle mesure 65°. Quelle est la mesure de l’angle alterne-interne en B ? Réponds par un nombre.",
    format: "short",
    expected: ["65"],
    comparator: "number_equal",
    hint: "Alternes-internes et droites parallèles : les deux angles sont égaux.",
    explanation: expl(
      "Les droites (d1) et (d2) sont parallèles, donc deux angles alternes-internes sont égaux : l’angle en B mesure lui aussi 65°.",
    ),
    tags: ["angle_mesure", "paralleles", "alterne_interne", "canvas"],
    canvas: paralleleCanvas(65),
  },
  {
    kind: "fixed",
    id: "angle_paralleles_fixed_6",
    niveau: "5e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_paralleles",
    difficulty: 5,
    theme: "neutral",
    text: "Les droites (d1) et (d2) sont parallèles, coupées par la sécante (s) en A et en B. En A, l’angle mesure 110°. Un angle en B se trouve du MÊME côté de la sécante, entre les deux parallèles. Combien mesure-t-il ? Réponds par un nombre.",
    format: "short",
    expected: ["70"],
    comparator: "number_equal",
    hint: "Ces deux-là ne sont pas égaux : ils forment un angle plat ensemble.",
    explanation: expl(
      "Deux angles internes situés du même côté de la sécante sont supplémentaires quand les droites sont parallèles : 180 - 110 = 70°. C’est le piège classique, où l’on répond 110 par réflexe.",
    ),
    tags: ["angle_mesure", "paralleles", "piege", "canvas"],
    canvas: paralleleCanvas(70),
  },
  {
    kind: "fixed",
    id: "angle_paralleles_fixed_7",
    niveau: "5e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_paralleles",
    difficulty: 4,
    theme: "reunion",
    text: "Sur la route du littoral, les deux bandes blanches qui bordent la voie sont parallèles. Une flèche peinte au sol les traverse en biais et fait un angle de 55° avec la bande du haut. Quel angle fait-elle avec la bande du bas, du même côté de la flèche ? Réponds par un nombre.",
    format: "short",
    expected: ["55"],
    comparator: "number_equal",
    hint: "Même position aux deux croisements : ce sont des angles correspondants.",
    explanation: expl(
      "Les deux bandes sont parallèles et la flèche joue le rôle de sécante. Les deux angles occupent la même position aux deux croisements : ils sont correspondants, donc égaux. La flèche fait aussi 55° avec la bande du bas.",
    ),
    tags: ["angle_mesure", "paralleles", "reunion", "correspondant"],
  },
  // 08/10/2026 : précise et simple (Frédéric)
  {
    kind: "fixed",
    id: "angle_paralleles_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_paralleles",
    difficulty: 4,
    theme: "neutral",
    text: "Deux angles sont entre les deux droites, et de part et d’autre de la sécante. Comment s’appellent-ils ?",
    format: "qcm",
    choices: ["correspondants", "opposés par le sommet", "alternes-internes"],
    expected: ["alternes-internes"],
    comparator: "mcq_exact",
    hint: "« Internes » : entre les droites. « Alternes » : de part et d’autre de la sécante.",
    explanation: expl("Entre les deux droites : « internes ». De part et d’autre de la sécante : « alternes ». Ce sont des angles alternes-internes."),
    tags: ["angle_mesure", "paralleles", "qcm", "vocabulaire"],
  },
  // 08/10/2026 : précise et simple (Frédéric)
  {
    kind: "fixed",
    id: "angle_paralleles_open_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_paralleles",
    difficulty: 5,
    theme: "neutral",
    text: "Une sécante coupe deux droites. Deux angles correspondants mesurent 60° et 68°. Les deux droites sont-elles parallèles ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Si elles étaient parallèles, les deux angles seraient égaux.",
    explanation: expl("Si les droites étaient parallèles, les angles correspondants seraient égaux. Or 60° n’est pas égal à 68°. Les droites ne sont pas parallèles."),
    tags: ["angle_mesure", "paralleles", "qcm", "raisonnement"],
  },
  {
    kind: "template",
    id: "angle_paralleles_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_paralleles",
    difficulty: 4,
    theme: "neutral",
    hint: "Alternes-internes et correspondants : égaux. Du même côté entre les parallèles : 180 moins la mesure.",
    tags: ["angle_mesure", "paralleles", "template", "canvas"],
    generate: () => genParalleles(4),
  },
  // 08/10/2026 : précise et simple (Frédéric)
  {
    kind: "template",
    id: "angle_paralleles_tpl_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_paralleles",
    difficulty: 5,
    theme: "neutral",
    hint: "Avec des parallèles : alternes-internes et correspondants sont égaux ; un angle aigu et un angle obtus voisins font 180°.",
    tags: ["angle_mesure", "paralleles", "short", "template"],
    generate: () => genParalleles(5),
  },

  // =========================
  // GABARITS AJOUTÉS LE 13/10/2026 (une étoile servie sans gabarit varié)
  // =========================
  tpl("angle_lire_tpl_3", "angle_lire", 1, "Le sommet est la lettre du milieu du nom ; la mesure s’écrit en degrés.", () => genLire(1)),
  tpl("angle_mesurer_tpl_3", "angle_mesurer", 2, "Centre du rapporteur sur le sommet, 0 sur un côté : on lit sur l’autre côté.", () => genMesurer(2)),
  tpl("angle_tracer_tpl_3", "angle_tracer", 2, "Centre du rapporteur sur le sommet, 0 sur le premier côté tracé.", () => genTracer(2)),
  tpl("angle_tracer_tpl_4", "angle_tracer", 4, "Les deux graduations font 180 au total : vérifie si ton angle doit être aigu ou obtus.", () => genTracer(4)),
  tpl("angle_estimer_tpl_3", "angle_estimer", 2, "Compare l’angle au coin d’une feuille : plus fermé, il est aigu ; plus ouvert, obtus.", () => genEstimer(2)),
  tpl("angle_defi_tpl_3", "angle_defi", 4, "Un tour complet fait 360° ; sur une horloge, une heure fait 360 ÷ 12 = 30°.", () => genDefi(4)),
  tpl("angle_paires_tpl_3", "angle_paires", 1, "Complémentaires : 90° à eux deux. Supplémentaires : 180°.", () => genPaires(1)),
  tpl("angle_paires_tpl_4", "angle_paires", 2, "Opposés par le sommet : même mesure. Voisins sur une droite : 180° à eux deux.", () => genPaires(2)),
  tpl("angle_paralleles_tpl_3", "angle_paralleles", 2, "Alternes-internes : entre les droites, de part et d’autre de la sécante. Correspondants : même place à chaque croisement.", () => genParalleles(2)),
  tpl("angle_paralleles_tpl_4", "angle_paralleles", 3, "Avec des parallèles, deux angles alternes-internes ou correspondants sont égaux.", () => genParalleles(3)),
];