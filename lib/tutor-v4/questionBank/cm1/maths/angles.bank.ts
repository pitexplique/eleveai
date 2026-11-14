// lib/tutor-v4/question-banks/maths/cm1/angles.bank.ts

import { anglesReconnaitre } from "@/lib/tutor-v4/questionBank/cm2/maths/angle-reconnaitre.bank";
import { anglesRepereDroit } from "@/lib/tutor-v4/questionBank/cm2/maths/angles-repere-droit.bank";
import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { angleComparerGabarits } from "./angles-outils";
import { melangeEnPlace } from "@/lib/tutor-v4/questionBank/melange";

/* =========================
   HELPERS
========================= */

function randomChoice<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffle<T>(items: T[]): T[] {
  return melangeEnPlace([...items]);
}

function makeChoices(correct: string, wrongs: string[]) {
  // La bonne réponse ne doit JAMAIS sauter au découpage : on la met de côté,
  // on tire trois distracteurs distincts, puis on mélange l'ensemble.
  // ⚠️ 05/08/2026 — les versions précédentes jetaient la bonne réponse dans le
  // même chapeau que les pièges avant de couper à quatre. Avec quatre pièges
  // écrits, elle pouvait rester au fond : l'élève voyait alors quatre
  // propositions dont aucune n'était bonne, sans que rien ne le signale.
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct),
  ).slice(0, 3);
  return shuffle([correct, ...distracteurs]);
}

function expSimple(message: string) {
  return message;
}

function angleCanvas(args: {
  angleDeg: number;
  vertex?: string;
  left?: string;
  right?: string;
  label?: string;
  showMeasure?: boolean;
  showRightAngle?: boolean;
  placeholder?: string;
}) {
  return {
    kind: "angle" as const,
    angle: {
      angleDeg: args.angleDeg,
      labels: {
        vertex: args.vertex ?? "O",
        left: args.left ?? "A",
        right: args.right ?? "B",
        angle: args.label ?? "",
      },
      display: {
        showLabels: true,
        showMeasure: args.showMeasure ?? false,
        showArc: true,
        showRightAngle: args.showRightAngle ?? args.angleDeg === 90,
        placeholder: args.placeholder ?? "",
      },
    },
  };
}

export const anglesBank: TutorBankItemV4[] = [
  {
    kind: "fixed",
    id: "cm1_angle_reconnaitre_fixed_g1",
    niveau: "cm1",
    matiere: "maths",
    notionId: "angle",
    microId: "angle_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    text: "Un angle est formé par...",
    format: "qcm",
    choices: ["deux demi-droites qui partent du même point","un seul point","un cercle","une seule ligne droite"],
    expected: ["deux demi-droites qui partent du même point"],
    comparator: "mcq_exact",
    hint: "Pense au sommet et aux deux côtés.",
    explanation: "Un angle est l'ouverture entre deux demi-droites (les côtés) qui partent du même point, le sommet.",
    tags: ["cm1","angle","angle_reconnaitre","guide","qcm"],
  },
  {
    kind: "fixed",
    id: "cm1_angle_droit_fixed_g1",
    niveau: "cm1",
    matiere: "maths",
    notionId: "angle",
    microId: "angle_droit",
    difficulty: 1,
    theme: "neutral",
    text: "Le coin d'une feuille ou d'un carré est un angle...",
    format: "qcm",
    choices: ["droit","aigu","obtus","plat"],
    expected: ["droit"],
    comparator: "mcq_exact",
    hint: "C'est le coin qui sert de repère.",
    explanation: "Le coin d'un carré forme un angle droit.",
    tags: ["cm1","angle","angle_droit","guide","qcm"],
  },
  {
    kind: "fixed",
    id: "cm1_angle_type_fixed_g1",
    niveau: "cm1",
    matiere: "maths",
    notionId: "angle",
    microId: "angle_type",
    difficulty: 2,
    theme: "neutral",
    text: "Un angle plus petit qu'un angle droit s'appelle un angle...",
    format: "qcm",
    choices: ["aigu","obtus","droit","plat"],
    expected: ["aigu"],
    comparator: "mcq_exact",
    hint: "Compare l'ouverture avec le coin d'un carré.",
    explanation: "Un angle aigu est plus petit que l'angle droit : il reste caché sous le coin d'une feuille.",
    tags: ["cm1","angle","angle_type","guide","qcm"],
  },

  // ============================================================
  // ANGLE_RECONNAITRE
  // Reconnaître un angle
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_angle_reconnaitre_fixed_001_definition",
    niveau: "cm1",
    matiere: "maths",
    notionId: "angle",
    microId: "angle_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    text: "Un angle représente surtout...",
    format: "qcm",
    choices: [
      "une ouverture",
      "une masse",
      "une contenance",
      "une durée",
    ],
    expected: ["une ouverture"],
    comparator: "mcq_exact",
    hint: "Pense à une porte qui s’ouvre.",
    explanation: expSimple(
      "Un angle représente une ouverture entre deux côtés qui partent du même point. " +
        "Par exemple, quand une porte s’ouvre, on voit une ouverture : c’est une image simple d’un angle."
    ),
    tags: ["cm1", "angle", "reconnaitre", "definition", "qcm", "canvas"],
    canvas: angleCanvas({
      angleDeg: 60,
      vertex: "O",
      left: "A",
      right: "B",
      label: "angle",
      showMeasure: false,
      showRightAngle: false,
    }),
  },

  // Les gabarits de cette micro : angle-reconnaitre.bank.ts (05/11/2026).
  ...anglesReconnaitre("cm1"),

    // ============================================================
  // ANGLE_DROIT
  // Reconnaître un angle droit
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_angle_droit_fixed_001_modele",
    niveau: "cm1",
    matiere: "maths",
    notionId: "angle",
    microId: "angle_droit",
    difficulty: 1,
    theme: "neutral",
    text: "L’angle représenté est-il un angle droit ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Le petit carré indique un angle droit.",
    explanation:
      "Un angle droit est l’angle que l’on retrouve dans le coin d’un carré ou d’un rectangle. " +
      "Sur la figure, le petit carré code un angle droit. " +
      "Donc oui, l’angle représenté est un angle droit.",
    tags: ["cm1", "angle", "droit", "modele", "qcm", "canvas"],
    canvas: angleCanvas({
      angleDeg: 90,
      vertex: "O",
      left: "A",
      right: "B",
      showMeasure: false,
      showRightAngle: true,
    }),
  },









    // ============================================================
  // ANGLE_TYPE
  // Reconnaître un angle aigu, obtus ou droit
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_angle_type_fixed_001_aigu_droit_obtus",
    niveau: "cm1",
    matiere: "maths",
    notionId: "angle",
    microId: "angle_type",
    difficulty: 2,
    theme: "neutral",
    text: "Un angle plus petit qu’un angle droit est appelé...",
    format: "qcm",
    choices: ["un angle aigu", "un angle droit", "un angle obtus", "une longueur"],
    expected: ["un angle aigu"],
    comparator: "mcq_exact",
    hint: "Un angle aigu est plus petit qu’un angle droit.",
    explanation:
      "Un angle aigu est un angle dont l’ouverture est plus petite que celle d’un angle droit. " +
      "L’angle droit sert de repère. " +
      "Si l’angle est moins ouvert qu’un angle droit, c’est un angle aigu.",
    tags: ["cm1", "angle", "type", "aigu", "qcm", "canvas"],
    canvas: angleCanvas({
      angleDeg: 45,
      vertex: "O",
      left: "A",
      right: "B",
      label: "",
      showMeasure: false,
      showRightAngle: false,
    }),
  },










    // ============================================================
  // ANGLE_COMPARER
  // Comparer des angles
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_angle_comparer_fixed_001_ouverture",
    niveau: "cm1",
    matiere: "maths",
    notionId: "angle",
    microId: "angle_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Pour comparer deux angles, il faut surtout comparer...",
    format: "qcm",
    choices: [
      "leur ouverture",
      "la longueur de leurs côtés",
      "leur couleur",
      "leur nom",
    ],
    expected: ["leur ouverture"],
    comparator: "mcq_exact",
    hint: "Un angle mesure une ouverture.",
    explanation:
      "Pour comparer deux angles, on compare leur ouverture. " +
      "La longueur des côtés dessinés ne change pas la taille de l’angle. " +
      "Un angle avec des côtés très longs peut être plus petit qu’un angle avec des côtés courts.",
    tags: ["cm1", "angle", "comparer", "ouverture", "qcm"],
  },

  // Les gabarits de cette micro, sans aucune mesure : angles-outils.ts (14/11/2026).
  ...angleComparerGabarits,

    // ============================================================
  // ANGLE_DEFI
  // Résoudre un défi sur les angles
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_angle_defi_fixed_001_erreur_longueur_cotes",
    niveau: "cm1",
    matiere: "maths",
    notionId: "angle",
    microId: "angle_defi",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève dit : “Cet angle est plus grand parce que ses côtés sont plus longs.” A-t-il forcément raison ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Un angle dépend de son ouverture.",
    explanation:
      "L’élève n’a pas forcément raison. " +
      "La taille d’un angle ne dépend pas de la longueur des côtés dessinés. " +
      "Elle dépend de l’ouverture entre les deux côtés. " +
      "Pour comparer deux angles, il faut donc comparer leur ouverture.",
    tags: ["cm1", "angle", "defi", "erreur", "longueur_cotes", "qcm"],
  },











  ...anglesRepereDroit("cm1"),
];
