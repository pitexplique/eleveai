// lib/tutor-v4/question-banks/maths/5e/angles.bank.ts

import type { TutorBankItemV4, AngleCanvasData } from "@/lib/tutor-v4/types";

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function makeChoices(correct: string, wrongs: string[]) {
  return shuffle([correct, ...wrongs]).slice(0, 4);
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

const anglesAigus = [25, 35, 45, 50, 60, 75];
const anglesObtus = [105, 115, 120, 135, 150];
const anglesClassiques = [30, 45, 60, 75, 90, 105, 120, 135];

export const anglesBank: TutorBankItemV4[] = [
  // =========================
  // ANGLE_LIRE
  // =========================
  {
    kind: "fixed",
    id: "angle_lire_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "angles",
    microId: "angle_lire",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle est la mesure de l’angle représenté ? Réponds par un nombre.",
    format: "short",
    expected: ["60"],
    comparator: "number_equal",
    hint: "Lis la mesure indiquée en bleu.",
    explanation: "La mesure indiquée sur la figure est 60°. La réponse est donc 60.",
    tags: ["angles", "lire", "canvas"],
    canvas: angleCanvas({ angleDeg: 60, showMeasure: true }),
  },
  {
    kind: "fixed",
    id: "angle_lire_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "angles",
    microId: "angle_lire",
    difficulty: 1,
    theme: "neutral",
    text: "Le sommet de l’angle AOB est...",
    format: "qcm",
    choices: ["A", "O", "B", "AB"],
    expected: ["O"],
    comparator: "mcq_exact",
    hint: "Le sommet est le point où les deux côtés de l’angle se rejoignent.",
    explanation: "Dans l’angle AOB, la lettre du milieu indique le sommet : c’est O.",
    tags: ["angles", "lire", "vocabulaire", "qcm"],
    canvas: angleCanvas({ angleDeg: 70, showMeasure: false, placeholder: "?" }),
  },
  {
    kind: "fixed",
    id: "angle_lire_qcm_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "angles",
    microId: "angle_lire",
    difficulty: 2,
    theme: "neutral",
    text: "L’angle représenté est de 90°. Comment l’appelle-t-on ?",
    format: "qcm",
    choices: ["angle aigu", "angle droit", "angle obtus", "angle plat"],
    expected: ["angle droit"],
    comparator: "mcq_exact",
    hint: "Un angle droit mesure 90°.",
    explanation: "Un angle de 90° est un angle droit.",
    tags: ["angles", "lire", "angle_droit", "qcm"],
    canvas: angleCanvas({ angleDeg: 90, showMeasure: false, showRightAngle: true }),
  },
  {
    kind: "fixed",
    id: "angle_lire_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "angles",
    microId: "angle_lire",
    difficulty: 2,
    theme: "neutral",
    text: "Explique comment reconnaître le sommet d’un angle.",
    format: "open",
    expected: ["sommet", "côtés", "rejoignent"],
    comparator: "contains_keyword",
    hint: "Regarde le point commun aux deux côtés de l’angle.",
    explanation: "Le sommet d’un angle est le point où les deux côtés de l’angle se rejoignent.",
    tags: ["angles", "lire", "open", "vocabulaire"],
  },
  {
    kind: "template",
    id: "angle_lire_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "angles",
    microId: "angle_lire",
    difficulty: 2,
    theme: "neutral",
    hint: "Lis la mesure indiquée sur la figure.",
    tags: ["angles", "lire", "template", "canvas"],
    generate: () => {
      const a = randomChoice(anglesClassiques);
      return {
        text: "Quelle est la mesure de l’angle représenté ? Réponds par un nombre.",
        format: "short",
        expected: [String(a)],
        comparator: "number_equal",
        explanation: `La mesure affichée est ${a}°. La réponse est donc ${a}.`,
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
    notionId: "angles",
    microId: "angle_mesurer",
    difficulty: 2,
    theme: "neutral",
    text: "Pour mesurer un angle, quel instrument utilise-t-on ?",
    format: "qcm",
    choices: ["un compas", "un rapporteur", "une équerre seulement", "une balance"],
    expected: ["un rapporteur"],
    comparator: "mcq_exact",
    hint: "L’instrument sert à lire une mesure en degrés.",
    explanation: "On mesure un angle avec un rapporteur.",
    tags: ["angles", "mesurer", "qcm", "instrument"],
  },
  {
    kind: "fixed",
    id: "angle_mesurer_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "angles",
    microId: "angle_mesurer",
    difficulty: 2,
    theme: "neutral",
    text: "La mesure de l’angle est cachée. Quelle est sa mesure ? Réponds par un nombre.",
    format: "short",
    expected: ["45"],
    comparator: "number_equal",
    hint: "L’angle est deux fois plus petit qu’un angle droit.",
    explanation: "L’angle représenté mesure 45°.",
    tags: ["angles", "mesurer", "canvas"],
    canvas: angleCanvas({ angleDeg: 45, showMeasure: false, placeholder: "?" }),
  },
  {
    kind: "fixed",
    id: "angle_mesurer_qcm_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "angles",
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
    explanation: "Si le centre du rapporteur est mal placé, la mesure lue peut être fausse.",
    tags: ["angles", "mesurer", "rapporteur", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "angle_mesurer_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "angles",
    microId: "angle_mesurer",
    difficulty: 3,
    theme: "neutral",
    text: "Explique les deux précautions importantes pour mesurer un angle avec un rapporteur.",
    format: "open",
    expected: ["centre", "sommet", "zéro", "côté"],
    comparator: "contains_keyword",
    hint: "Pense au centre du rapporteur et au zéro.",
    explanation:
      "Il faut placer le centre du rapporteur sur le sommet de l’angle, puis aligner le zéro du rapporteur avec un côté de l’angle.",
    tags: ["angles", "mesurer", "open", "rapporteur"],
  },
  {
    kind: "template",
    id: "angle_mesurer_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "angles",
    microId: "angle_mesurer",
    difficulty: 3,
    theme: "neutral",
    hint: "Compare l’angle à 90° ou lis la valeur attendue.",
    tags: ["angles", "mesurer", "template", "canvas"],
    generate: () => {
      const a = randomChoice([30, 45, 60, 90, 120, 135]);
      return {
        text: "La mesure est cachée. Quelle est la mesure de l’angle ? Réponds par un nombre.",
        format: "short",
        expected: [String(a)],
        comparator: "number_equal",
        explanation: `L’angle représenté mesure ${a}°.`,
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
    notionId: "angles",
    microId: "angle_tracer",
    difficulty: 2,
    theme: "neutral",
    text: "Pour tracer un angle de 50°, quelle mesure doit-on repérer sur le rapporteur ?",
    format: "short",
    expected: ["50"],
    comparator: "number_equal",
    hint: "La mesure demandée est 50°.",
    explanation: "Pour tracer un angle de 50°, on repère la graduation 50° sur le rapporteur.",
    tags: ["angles", "tracer", "rapporteur"],
    canvas: angleCanvas({ angleDeg: 50, showMeasure: true }),
  },
  {
    kind: "fixed",
    id: "angle_tracer_qcm_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "angles",
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
    explanation: "Pour tracer un angle AOB, on commence par placer le sommet O.",
    tags: ["angles", "tracer", "qcm", "methode"],
  },
  {
    kind: "fixed",
    id: "angle_tracer_qcm_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "angles",
    microId: "angle_tracer",
    difficulty: 3,
    theme: "neutral",
    text: "Pour tracer un angle de 120°, que doit-on obtenir ?",
    format: "qcm",
    choices: ["un angle aigu", "un angle droit", "un angle obtus", "un angle nul"],
    expected: ["un angle obtus"],
    comparator: "mcq_exact",
    hint: "120° est plus grand que 90° et plus petit que 180°.",
    explanation: "Un angle de 120° est plus grand que 90° : c’est un angle obtus.",
    tags: ["angles", "tracer", "obtus", "qcm"],
    canvas: angleCanvas({ angleDeg: 120, showMeasure: true }),
  },
  {
    kind: "fixed",
    id: "angle_tracer_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "angles",
    microId: "angle_tracer",
    difficulty: 4,
    theme: "neutral",
    text: "Explique comment tracer un angle de 70° avec un rapporteur.",
    format: "open",
    expected: ["sommet", "rapporteur", "70", "demi-droite"],
    comparator: "contains_keyword",
    hint: "Décris les étapes : sommet, premier côté, rapporteur, graduation.",
    explanation:
      "On place le sommet, on trace un premier côté, on place le centre du rapporteur sur le sommet, on repère 70°, puis on trace le second côté.",
    tags: ["angles", "tracer", "open", "methode"],
  },
  {
    kind: "template",
    id: "angle_tracer_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "angles",
    microId: "angle_tracer",
    difficulty: 3,
    theme: "neutral",
    hint: "Un angle se trace en degrés avec le rapporteur.",
    tags: ["angles", "tracer", "template"],
    generate: () => {
      const a = randomChoice([35, 45, 60, 75, 100, 110, 130]);
      return {
        text: `Pour tracer un angle de ${a}°, quelle graduation dois-tu repérer sur le rapporteur ?`,
        format: "short",
        expected: [String(a)],
        comparator: "number_equal",
        explanation: `Il faut repérer la graduation ${a}° sur le rapporteur.`,
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
    notionId: "angles",
    microId: "angle_estimer",
    difficulty: 2,
    theme: "neutral",
    text: "Sans mesurer précisément, cet angle est plutôt...",
    format: "qcm",
    choices: ["aigu", "droit", "obtus", "plat"],
    expected: ["aigu"],
    comparator: "mcq_exact",
    hint: "Il est plus petit qu’un angle droit.",
    explanation: "L’angle représenté mesure environ 50°. Il est donc aigu.",
    tags: ["angles", "estimer", "aigu", "canvas", "qcm"],
    canvas: angleCanvas({ angleDeg: 50, showMeasure: false, placeholder: "?" }),
  },
  {
    kind: "fixed",
    id: "angle_estimer_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "angles",
    microId: "angle_estimer",
    difficulty: 2,
    theme: "neutral",
    text: "Sans mesurer précisément, cet angle est plutôt...",
    format: "qcm",
    choices: ["aigu", "droit", "obtus", "nul"],
    expected: ["obtus"],
    comparator: "mcq_exact",
    hint: "Il est plus grand qu’un angle droit.",
    explanation: "L’angle représenté mesure environ 120°. Il est donc obtus.",
    tags: ["angles", "estimer", "obtus", "canvas", "qcm"],
    canvas: angleCanvas({ angleDeg: 120, showMeasure: false, placeholder: "?" }),
  },
  {
    kind: "fixed",
    id: "angle_estimer_qcm_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "angles",
    microId: "angle_estimer",
    difficulty: 3,
    theme: "neutral",
    text: "Un angle légèrement plus grand qu’un angle droit mesure probablement...",
    format: "qcm",
    choices: ["45°", "90°", "100°", "180°"],
    expected: ["100°"],
    comparator: "mcq_exact",
    hint: "Un angle droit mesure 90°.",
    explanation: "Un angle légèrement plus grand que 90° peut mesurer environ 100°.",
    tags: ["angles", "estimer", "qcm", "piege"],
  },
  {
    kind: "fixed",
    id: "angle_estimer_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "angles",
    microId: "angle_estimer",
    difficulty: 3,
    theme: "neutral",
    text: "Explique comment savoir si un angle est aigu ou obtus sans le mesurer précisément.",
    format: "open",
    expected: ["90", "droit", "plus petit", "plus grand"],
    comparator: "contains_keyword",
    hint: "Compare l’angle à un angle droit.",
    explanation:
      "On compare l’angle à 90°. S’il est plus petit que 90°, il est aigu. S’il est plus grand que 90° et plus petit que 180°, il est obtus.",
    tags: ["angles", "estimer", "open", "raisonnement"],
  },
  {
    kind: "template",
    id: "angle_estimer_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "angles",
    microId: "angle_estimer",
    difficulty: 3,
    theme: "neutral",
    hint: "Compare avec l’angle droit de 90°.",
    tags: ["angles", "estimer", "template", "canvas"],
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
          type === "aigu"
            ? `${a}° est plus petit que 90°, donc l’angle est aigu.`
            : type === "droit"
            ? `${a}° est égal à 90°, donc l’angle est droit.`
            : `${a}° est plus grand que 90° et plus petit que 180°, donc l’angle est obtus.`,
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
  {
    kind: "fixed",
    id: "angle_defis_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "angles",
    microId: "angle_defis",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève dit : « Cet angle est obtus car il est grand ». Explique pourquoi cette justification est insuffisante.",
    format: "open",
    expected: ["90", "180", "mesure", "obtus"],
    comparator: "contains_keyword",
    hint: "Un angle obtus a une définition précise.",
    explanation:
      "Dire qu’un angle est grand ne suffit pas. Un angle obtus mesure plus de 90° et moins de 180°.",
    tags: ["angles", "defi", "open", "raisonnement", "piege"],
    canvas: angleCanvas({ angleDeg: 120, showMeasure: false, placeholder: "?" }),
  },
  {
    kind: "fixed",
    id: "angle_defis_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "angles",
    microId: "angle_defis",
    difficulty: 4,
    theme: "sport",
    text: "Un skateur tourne d’environ 90°. Quel type d’angle décrit ce virage ?",
    format: "qcm",
    choices: ["angle aigu", "angle droit", "angle obtus", "angle plat"],
    expected: ["angle droit"],
    comparator: "mcq_exact",
    hint: "90° correspond à un angle droit.",
    explanation: "Un virage de 90° correspond à un angle droit.",
    tags: ["angles", "defi", "sport", "angle_droit"],
    canvas: angleCanvas({ angleDeg: 90, showMeasure: false, showRightAngle: true }),
  },
  {
    kind: "fixed",
    id: "angle_defis_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "angles",
    microId: "angle_defis",
    difficulty: 5,
    theme: "reunion",
    text: "Sur une carte de randonnée à La Réunion, deux chemins forment un angle d’environ 120°. Est-ce un angle aigu, droit ou obtus ?",
    format: "qcm",
    choices: ["aigu", "droit", "obtus", "nul"],
    expected: ["obtus"],
    comparator: "mcq_exact",
    hint: "Compare 120° à 90°.",
    explanation: "120° est plus grand que 90° et plus petit que 180°. C’est donc un angle obtus.",
    tags: ["angles", "defi", "reunion", "obtus"],
    canvas: angleCanvas({ angleDeg: 120, showMeasure: true }),
  },
  {
    kind: "template",
    id: "angle_defis_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "angles",
    microId: "angle_defis",
    difficulty: 5,
    theme: "neutral",
    hint: "Compare l’angle à 90°.",
    tags: ["angles", "defi", "template", "raisonnement"],
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
          type === "aigu"
            ? `${a}° est inférieur à 90°, donc l’angle est aigu.`
            : type === "droit"
            ? `${a}° est égal à 90°, donc l’angle est droit.`
            : `${a}° est supérieur à 90° et inférieur à 180°, donc l’angle est obtus.`,
        canvas: angleCanvas({ angleDeg: a, showMeasure: true, showRightAngle: a === 90 }),
      };
    },
  },
  {
    kind: "template",
    id: "angle_defis_open_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "angles",
    microId: "angle_defis",
    difficulty: 5,
    theme: "neutral",
    hint: "Utilise les seuils 90° et 180°.",
    tags: ["angles", "defi", "open", "template"],
    generate: () => {
      const a = randomChoice([35, 60, 110, 135]);
      const type = angleType(a);

      return {
        text: `Explique pourquoi un angle de ${a}° est un angle ${type}.`,
        format: "open",
        expected:
          type === "aigu"
            ? [String(a), "90", "aigu"]
            : [String(a), "90", "180", "obtus"],
        comparator: "contains_keyword",
        explanation:
          type === "aigu"
            ? `${a}° est inférieur à 90°, donc c’est un angle aigu.`
            : `${a}° est supérieur à 90° et inférieur à 180°, donc c’est un angle obtus.`,
        canvas: angleCanvas({ angleDeg: a, showMeasure: true }),
      };
    },
  },
];