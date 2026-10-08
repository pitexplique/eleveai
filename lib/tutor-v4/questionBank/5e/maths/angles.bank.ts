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
function paralleleCanvas(): DroitesCanvasData {
  return {
    kind: "droites",
    size: { width: 340, height: 240 },
    display: { showGrid: false },
    lines: [
      { id: "d1", type: "droite", from: { x: 25, y: 75 }, to: { x: 315, y: 75 }, label: "(d1)" },
      { id: "d2", type: "droite", from: { x: 25, y: 175 }, to: { x: 315, y: 175 }, label: "(d2)" },
      { id: "s", type: "droite", from: { x: 60, y: 215 }, to: { x: 270, y: 35 }, label: "(s)" },
    ],
    intersections: [
      { x: 223, y: 75, label: "A", highlight: true },
      { x: 107, y: 175, label: "B", highlight: true },
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
    hint: "Lis la mesure indiquée sur la figure.",
    tags: ["angle_mesure", "lire", "template", "canvas"],
    generate: () => {
      const a = randomChoice(anglesClassiques);
      return {
        text: "Quelle est la mesure de l’angle représenté ? Réponds par un nombre.",
        format: "short",
        expected: [String(a)],
        comparator: "number_equal",
        explanation: "Définition : un angle mesure l’ouverture entre deux demi-droites et s’exprime en degrés.\n\n" +
          "Méthode : on identifie le sommet, les côtés ou la mesure, puis on utilise la règle ou le rapporteur.\n\nCalcul : " +
          (`La mesure affichée est ${a}°. La réponse est donc ${a}.`) +
          "\n\nConclusion : la mesure ou le nom trouvé convient pour cet angle.",
        canvas: angleCanvas({
          angleDeg: a,
          showMeasure: true,
          showRightAngle: a === 90,
        }),
      };
    },
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
    hint: "Compare l’angle à 90° ou lis la valeur attendue.",
    tags: ["angle_mesure", "mesurer", "template", "canvas"],
    generate: () => {
      const a = randomChoice([30, 45, 60, 90, 120, 135]);
      return {
        text: "La mesure est cachée. Quelle est la mesure de l’angle ? Réponds par un nombre.",
        format: "short",
        expected: [String(a)],
        comparator: "number_equal",
        explanation: "Définition : un angle mesure l’ouverture entre deux demi-droites et s’exprime en degrés.\n\n" +
          "Méthode : on identifie le sommet, les côtés ou la mesure, puis on utilise la règle ou le rapporteur.\n\nCalcul : " +
          (`L’angle représenté mesure ${a}°.`) +
          "\n\nConclusion : la mesure ou le nom trouvé convient pour cet angle.",
        canvas: angleCanvas({
          angleDeg: a,
          showMeasure: false,
          placeholder: "?",
          showRightAngle: a === 90,
        }),
      };
    },
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
    hint: "Un angle se trace en degrés avec le rapporteur.",
    tags: ["angle_mesure", "tracer", "template"],
    generate: () => {
      const a = randomChoice([35, 45, 60, 75, 100, 110, 130]);
      return {
        text: `Pour tracer un angle de ${a}°, quelle graduation dois-tu repérer sur le rapporteur ?`,
        format: "short",
        expected: [String(a)],
        comparator: "number_equal",
        explanation: "Définition : un angle mesure l’ouverture entre deux demi-droites et s’exprime en degrés.\n\n" +
          "Méthode : on identifie le sommet, les côtés ou la mesure, puis on utilise la règle ou le rapporteur.\n\nCalcul : " +
          (`Il faut repérer la graduation ${a}° sur le rapporteur.`) +
          "\n\nConclusion : la mesure ou le nom trouvé convient pour cet angle.",
        canvas: angleCanvas({ angleDeg: a, showMeasure: true }),
      };
    },
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
    hint: "Compare avec l’angle droit de 90°.",
    tags: ["angle_mesure", "estimer", "template", "canvas"],
    generate: () => {
      const a = randomChoice([...anglesAigus, 90, ...anglesObtus]);
      const type = angleType(a);
      return {
        text: "Sans mesurer précisément, cet angle est de quel type ?",
        format: "qcm",
        choices: makeChoices(type, ["aigu", "droit", "obtus", "plat"].filter((x) => x !== type)),
        expected: [type],
        comparator: "mcq_exact",
        explanation:
          "Définition : un angle mesure l’ouverture entre deux demi-droites et s’exprime en degrés.\n\n" +
          "Méthode : on identifie le sommet, les côtés ou la mesure, puis on utilise la règle ou le rapporteur.\n\nCalcul : " +
          (type === "aigu"
            ? `${a}° est plus petit que 90°, donc l’angle est aigu.`
            : type === "droit"
            ? `${a}° est égal à 90°, donc l’angle est droit.`
            : `${a}° est plus grand que 90° et plus petit que 180°, donc l’angle est obtus.`) +
          "\n\nConclusion : la mesure ou le nom trouvé convient pour cet angle.",
        canvas: angleCanvas({
          angleDeg: a,
          showMeasure: false,
          placeholder: "?",
          showRightAngle: a === 90,
        }),
      };
    },
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
    hint: "Compare l’angle à 90°.",
    tags: ["angle_mesure", "defi", "template", "raisonnement"],
    generate: () => {
      const a = randomChoice([40, 55, 80, 95, 110, 140]);
      const type = angleType(a);

      return {
        text: `Un élève trace un angle de ${a}°. Quel est son type ?`,
        format: "qcm",
        choices: makeChoices(type, ["aigu", "droit", "obtus", "plat"].filter((x) => x !== type)),
        expected: [type],
        comparator: "mcq_exact",
        explanation:
          "Définition : un angle mesure l’ouverture entre deux demi-droites et s’exprime en degrés.\n\n" +
          "Méthode : on identifie le sommet, les côtés ou la mesure, puis on utilise la règle ou le rapporteur.\n\nCalcul : " +
          (type === "aigu"
            ? `${a}° est inférieur à 90°, donc l’angle est aigu.`
            : type === "droit"
            ? `${a}° est égal à 90°, donc l’angle est droit.`
            : `${a}° est supérieur à 90° et inférieur à 180°, donc l’angle est obtus.`) +
          "\n\nConclusion : la mesure ou le nom trouvé convient pour cet angle.",
        canvas: angleCanvas({ angleDeg: a, showMeasure: true, showRightAngle: a === 90 }),
      };
    },
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
    hint: "Utilise les seuils 90° et 180°.",
    tags: ["angle_mesure", "defi", "qcm", "template"],
    generate: () => {
      const a = randomChoice([35, 60, 85, 95, 110, 135, 150]);
      const type = angleType(a);

      return {
        text: `Un angle mesure ${a}°. Quelle est sa nature ?`,
        format: "qcm",
        choices: ["aigu", "droit", "obtus", "plat"],
        expected: [type],
        comparator: "mcq_exact",
        explanation: expl(
          type === "aigu"
            ? `${a}° est plus petit que 90° : l’angle est aigu.`
            : `${a}° est plus grand que 90° et plus petit que 180° : l’angle est obtus.`,
        ),
        canvas: angleCanvas({ angleDeg: a, showMeasure: true }),
      };
    },
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
    hint: "Lis la mesure indiquée.",
    tags: ["angle_mesure", "lire", "template", "canvas"],
    generate: () => {
      const a = randomChoice(anglesClassiques);
      return {
        text: "Quelle est la mesure de l’angle représenté ? Réponds par un nombre.",
        format: "short",
        expected: [String(a)],
        comparator: "number_equal",
        explanation: expl(`La mesure indiquée sur la figure est ${a}°.`),
        canvas: angleCanvas({ angleDeg: a, showMeasure: true, showRightAngle: a === 90 }),
      };
    },
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
    hint: "Lis la valeur attendue.",
    tags: ["angle_mesure", "mesurer", "template", "canvas"],
    generate: () => {
      const a = randomChoice([20, 40, 55, 70, 110, 125, 150]);
      return {
        text: "La mesure est cachée. Quelle est la mesure de l’angle ? Réponds par un nombre.",
        format: "short",
        expected: [String(a)],
        comparator: "number_equal",
        explanation: expl(`L’angle représenté mesure ${a}°.`),
        canvas: angleCanvas({ angleDeg: a, showMeasure: false, placeholder: "?" }),
      };
    },
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
    hint: "Le type dépend de la comparaison à 90°.",
    tags: ["angle_mesure", "tracer", "template"],
    generate: () => {
      const a = randomChoice([30, 50, 70, 100, 120, 140]);
      const type = angleType(a);
      return {
        text: `Si on trace un angle de ${a}°, quel est son type ?`,
        format: "qcm",
        choices: makeChoices(type, ["aigu", "droit", "obtus", "plat"].filter((x) => x !== type)),
        expected: [type],
        comparator: "mcq_exact",
        explanation: expl(
          type === "aigu"
            ? `${a}° est inférieur à 90° : c’est un angle aigu.`
            : `${a}° est supérieur à 90° et inférieur à 180° : c’est un angle obtus.`
        ),
        canvas: angleCanvas({ angleDeg: a, showMeasure: true }),
      };
    },
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
    hint: "Compare l’angle à 90°.",
    tags: ["angle_mesure", "estimer", "template", "canvas"],
    generate: () => {
      const a = randomChoice([30, 55, 75, 105, 125, 150]);
      const type = angleType(a);
      return {
        text: "Sans mesurer précisément, cet angle est plutôt...",
        format: "qcm",
        choices: makeChoices(type, ["aigu", "droit", "obtus", "plat"].filter((x) => x !== type)),
        expected: [type],
        comparator: "mcq_exact",
        explanation: expl(
          type === "aigu"
            ? `L’angle mesure environ ${a}°, inférieur à 90° : il est aigu.`
            : `L’angle mesure environ ${a}°, supérieur à 90° : il est obtus.`
        ),
        canvas: angleCanvas({ angleDeg: a, showMeasure: false, placeholder: "?" }),
      };
    },
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
    hint: "Complément : 90 − a. Supplément : 180 − a.",
    tags: ["angle_mesure", "defi", "template", "calcul"],
    generate: () => {
      const a = randomChoice([20, 35, 50, 65, 80]);
      const complement = randomChoice([true, false]);
      const res = complement ? 90 - a : 180 - a;
      return {
        text: complement
          ? `Un angle mesure ${a}°. Quelle est la mesure de son complément (pour atteindre 90°) ?`
          : `Un angle mesure ${a}°. Quelle est la mesure de son supplément (pour atteindre 180°) ?`,
        format: "short",
        expected: [String(res)],
        comparator: "number_equal",
        explanation: expl(
          complement
            ? `Complément = 90 - ${a} = ${res}°.`
            : `Supplément = 180 - ${a} = ${res}°.`
        ),
      };
    },
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
    hint: "Opposé par le sommet : même mesure. Angle voisin : 180 moins la mesure.",
    tags: ["angle_mesure", "paires", "oppose_sommet", "template"],
    generate: () => {
      const a = randomChoice([35, 48, 55, 62, 74, 105, 118, 130]);
      const oppose = randomChoice([true, false]);
      const res = oppose ? a : 180 - a;
      return {
        text: oppose
          ? `Deux droites se croisent. Un des quatre angles mesure ${a}°. Quelle est la mesure de l’angle opposé par le sommet ? Réponds par un nombre.`
          : `Deux droites se croisent. Un des quatre angles mesure ${a}°. Quelle est la mesure de l’angle juste à côté ? Réponds par un nombre.`,
        format: "short",
        expected: [String(res)],
        comparator: "number_equal",
        explanation: expl(
          oppose
            ? `Deux angles opposés par le sommet ont la même mesure : l’angle cherché mesure ${a}°.`
            : `Les deux angles voisins forment un angle plat : 180 - ${a} = ${res}°.`,
        ),
      };
    },
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
    hint: "Deux angles complémentaires font 90° à eux deux.",
    tags: ["angle_mesure", "paires", "short", "template"],
    generate: () => {
      const a = randomChoice([22, 38, 41, 57, 63, 78]);
      return {
        text: `Un angle mesure ${a}°. Combien mesure son complémentaire ?`,
        format: "short",
        expected: [String(90 - a)],
        comparator: "number_equal",
        explanation: expl(
          `Deux angles complémentaires font 90° à eux deux. On calcule 90 − ${a} = ${90 - a}. Le complémentaire mesure ${90 - a}°.`,
        ),
      };
    },
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
    canvas: paralleleCanvas(),
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
    canvas: paralleleCanvas(),
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
    generate: () => {
      const a = randomChoice([38, 52, 61, 65, 74, 108, 115, 124]);
      const paire = randomChoice(["alternes-internes", "correspondants", "du même côté"]);
      const egaux = paire !== "du même côté";
      const res = egaux ? a : 180 - a;
      return {
        text:
          `Les droites (d1) et (d2) sont parallèles, coupées par la sécante (s) en A et en B. ` +
          `En A, l’angle mesure ${a}°. ` +
          (egaux
            ? `Quelle est la mesure de l’angle ${paire} en B ? Réponds par un nombre.`
            : `Quelle est la mesure de l’angle en B situé du même côté de la sécante, entre les deux parallèles ? Réponds par un nombre.`),
        format: "short",
        expected: [String(res)],
        comparator: "number_equal",
        explanation: expl(
          egaux
            ? `Les droites sont parallèles, donc deux angles ${paire} sont égaux : l’angle cherché mesure ${a}°.`
            : `Deux angles internes du même côté de la sécante sont supplémentaires : 180 - ${a} = ${res}°.`,
        ),
        canvas: paralleleCanvas(),
      };
    },
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
    hint: "Droites parallèles : deux angles correspondants sont égaux.",
    tags: ["angle_mesure", "paralleles", "short", "template"],
    generate: () => {
      const a = randomChoice([42, 56, 63, 71, 84]);
      return {
        text: `Les droites (d1) et (d2) sont parallèles, coupées par une sécante. Un angle mesure ${a}°. Combien mesure son angle correspondant ?`,
        format: "short",
        expected: [String(a)],
        comparator: "number_equal",
        explanation: expl(
          `Les droites sont parallèles. Donc deux angles correspondants ont la même mesure. Pas de calcul : l’angle cherché mesure ${a}°.`,
        ),
      };
    },
  },
];