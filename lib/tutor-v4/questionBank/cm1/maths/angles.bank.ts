// lib/tutor-v4/question-banks/maths/cm1/angles.bank.ts

import { anglesReconnaitre } from "@/lib/tutor-v4/questionBank/cm2/maths/angle-reconnaitre.bank";
import { anglesRepereDroit } from "@/lib/tutor-v4/questionBank/cm2/maths/angles-repere-droit.bank";
import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
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

  {
    kind: "template",
    id: "cm1_angle_comparer_tpl_001_plus_petit_plus_grand_droit",
    niveau: "cm1",
    matiere: "maths",
    notionId: "angle",
    microId: "angle_comparer",
    difficulty: 2,
    theme: "neutral",
    hint: "Compare l’ouverture avec celle d’un angle droit.",
    tags: ["cm1", "angle", "comparer", "angle_droit", "template", "qcm", "canvas"],
    generate: () => {
      const angleDeg = randomChoice([30, 45, 60, 75, 90, 105, 120, 140]);

      const correct =
        angleDeg < 90
          ? "plus petit"
          : angleDeg === 90
            ? "égal"
            : "plus grand";

      return {
        text: `L’angle représenté est-il plus petit, égal ou plus grand qu’un angle droit ?`,
        format: "qcm",
        choices: ["plus petit", "égal", "plus grand"],
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Un angle droit sert de repère. " +
          "Il mesure 90°. " +
          (angleDeg < 90
            ? `Ici, l’ouverture est plus petite que celle d’un angle droit. L’angle est donc plus petit qu’un angle droit.`
            : angleDeg === 90
              ? `Ici, l’ouverture est exactement celle d’un angle droit. L’angle est donc égal à un angle droit.`
              : `Ici, l’ouverture est plus grande que celle d’un angle droit. L’angle est donc plus grand qu’un angle droit.`),
        canvas: angleCanvas({
          angleDeg,
          vertex: "O",
          left: "A",
          right: "B",
          label: "",
          showMeasure: false,
          showRightAngle: angleDeg === 90,
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_angle_comparer_tpl_002_comparer_deux_mesures",
    niveau: "cm1",
    matiere: "maths",
    notionId: "angle",
    microId: "angle_comparer",
    difficulty: 2,
    theme: "neutral",
    hint: "La plus grande mesure correspond à la plus grande ouverture.",
    tags: ["cm1", "angle", "comparer", "mesures", "template", "qcm"],
    generate: () => {
      const a = randomChoice([30, 45, 60, 75, 80]);
      const b = randomChoice([95, 105, 120, 135, 150]);

      const firstIsA = randomChoice([true, false]);
      const angleA = firstIsA ? a : b;
      const angleB = firstIsA ? b : a;

      const correct = angleA > angleB ? "l’angle A" : "l’angle B";

      return {
        text: `L’angle A mesure ${angleA}°. L’angle B mesure ${angleB}°. Quel angle est le plus grand ?`,
        format: "qcm",
        choices: ["l’angle A", "l’angle B", "ils sont égaux"],
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Pour comparer deux angles donnés en degrés, on compare leurs mesures. " +
          `${angleA}° et ${angleB}° ne sont pas égaux. ` +
          `La plus grande mesure correspond à la plus grande ouverture. ` +
          `La bonne réponse est : ${correct}.`,
      };
    },
  },

  {
    kind: "template",
    id: "cm1_angle_comparer_tpl_003_memes_mesures",
    niveau: "cm1",
    matiere: "maths",
    notionId: "angle",
    microId: "angle_comparer",
    difficulty: 2,
    theme: "neutral",
    hint: "Si deux angles ont la même ouverture, ils sont égaux.",
    tags: ["cm1", "angle", "comparer", "egalite", "template", "qcm", "canvas"],
    generate: () => {
      const angleDeg = randomChoice([35, 45, 60, 75, 90, 110, 130]);

      return {
        text:
          `Deux angles ont la même ouverture : ${angleDeg}°. ` +
          `Que peut-on dire ?`,
        format: "qcm",
        choices: [
          "ils sont égaux",
          "le premier est forcément plus grand",
          "le deuxième est forcément plus grand",
          "on ne peut jamais comparer deux angles",
        ],
        expected: ["ils sont égaux"],
        comparator: "mcq_exact",
        explanation:
          "Deux angles qui ont la même ouverture sont égaux. " +
          `Ici, les deux angles ont une ouverture de ${angleDeg}°. ` +
          "Ils sont donc égaux.",
        canvas: angleCanvas({
          angleDeg,
          vertex: "O",
          left: "A",
          right: "B",
          label: `${angleDeg}°`,
          showMeasure: true,
          showRightAngle: angleDeg === 90,
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_angle_comparer_tpl_004_piege_longueur_cotes",
    niveau: "cm1",
    matiere: "maths",
    notionId: "angle",
    microId: "angle_comparer",
    difficulty: 3,
    theme: "neutral",
    hint: "La longueur des côtés dessinés ne détermine pas la taille de l’angle.",
    tags: ["cm1", "angle", "comparer", "erreur", "longueur_cotes", "template", "qcm"],
    generate: () => {
      const petit = randomChoice([30, 40, 50, 60]);
      const grand = randomChoice([100, 115, 130, 145]);

      return {
        text:
          `Un élève dit : “L’angle A est plus grand parce que ses côtés sont dessinés plus longs.” ` +
          `A-t-il forcément raison ?`,
        format: "qcm",
        choices: ["non", "oui"],
        expected: ["non"],
        comparator: "mcq_exact",
        explanation:
          "L’élève n’a pas forcément raison. " +
          "Pour comparer deux angles, on ne regarde pas la longueur des côtés dessinés. " +
          "On compare seulement l’ouverture. " +
          `Un angle de ${petit}° avec des côtés longs reste plus petit qu’un angle de ${grand}° avec des côtés courts.`,
      };
    },
  },

  {
    kind: "template",
    id: "cm1_angle_comparer_tpl_005_plus_ouvert_moins_ouvert",
    niveau: "cm1",
    matiere: "maths",
    notionId: "angle",
    microId: "angle_comparer",
    difficulty: 2,
    theme: "neutral",
    hint: "Plus l’ouverture est grande, plus l’angle est grand.",
    tags: ["cm1", "angle", "comparer", "ouverture", "template", "qcm", "canvas"],
    generate: () => {
      const angleDeg = randomChoice([35, 50, 70, 100, 120, 150]);
      const reference = 90;

      const correct =
        angleDeg > reference
          ? "plus ouvert"
          : angleDeg < reference
            ? "moins ouvert"
            : "aussi ouvert";

      return {
        text: `Par rapport à un angle droit, l’angle représenté est...`,
        format: "qcm",
        choices: ["plus ouvert", "moins ouvert", "aussi ouvert"],
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Comparer des angles, c’est comparer leur ouverture. " +
          (angleDeg > reference
            ? "Ici, l’angle est plus ouvert qu’un angle droit."
            : angleDeg < reference
              ? "Ici, l’angle est moins ouvert qu’un angle droit."
              : "Ici, l’angle a exactement la même ouverture qu’un angle droit."),
        canvas: angleCanvas({
          angleDeg,
          vertex: "O",
          left: "A",
          right: "B",
          label: "",
          showMeasure: false,
          showRightAngle: angleDeg === 90,
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_angle_comparer_tpl_006_porte_ouverte",
    niveau: "cm1",
    matiere: "maths",
    notionId: "angle",
    microId: "angle_comparer",
    difficulty: 2,
    theme: "neutral",
    hint: "Une porte plus ouverte forme un angle plus grand.",
    tags: ["cm1", "angle", "comparer", "porte", "vie_quotidienne", "template", "qcm"],
    generate: () => {
      const a = randomChoice([30, 45, 60]);
      const b = randomChoice([100, 120, 140]);

      const order = randomChoice(["A petite", "A grande"]);

      const angleA = order === "A petite" ? a : b;
      const angleB = order === "A petite" ? b : a;
      const correct = angleA > angleB ? "la porte A" : "la porte B";

      return {
        text:
          `La porte A est ouverte à ${angleA}°. ` +
          `La porte B est ouverte à ${angleB}°. ` +
          `Quelle porte est la plus ouverte ?`,
        format: "qcm",
        choices: ["la porte A", "la porte B", "elles sont autant ouvertes"],
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Une porte plus ouverte forme un angle plus grand. " +
          `On compare ${angleA}° et ${angleB}°. ` +
          `La plus grande ouverture est ${Math.max(angleA, angleB)}°. ` +
          `La bonne réponse est : ${correct}.`,
      };
    },
  },

  {
    kind: "template",
    id: "cm1_angle_comparer_tpl_007_reunion_portail",
    niveau: "cm1",
    matiere: "maths",
    notionId: "angle",
    microId: "angle_comparer",
    difficulty: 2,
    theme: "reunion",
    hint: "Le portail le plus ouvert forme le plus grand angle.",
    tags: ["cm1", "angle", "comparer", "reunion", "portail", "template", "qcm"],
    generate: () => {
      const angle1 = randomChoice([35, 45, 60, 75]);
      const angle2 = randomChoice([100, 115, 130, 145]);

      const portailAIsBig = randomChoice([true, false]);
      const angleA = portailAIsBig ? angle2 : angle1;
      const angleB = portailAIsBig ? angle1 : angle2;
      const correct = angleA > angleB ? "le portail A" : "le portail B";

      return {
        text:
          `À La Réunion, deux portails sont ouverts. ` +
          `Le portail A forme un angle de ${angleA}°. ` +
          `Le portail B forme un angle de ${angleB}°. ` +
          `Lequel est le plus ouvert ?`,
        format: "qcm",
        choices: ["le portail A", "le portail B", "ils sont autant ouverts"],
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "On compare l’ouverture des deux portails. " +
          `Le portail A forme ${angleA}° et le portail B forme ${angleB}°. ` +
          `Le plus grand angle correspond au portail le plus ouvert. ` +
          `La bonne réponse est : ${correct}.`,
      };
    },
  },

  {
    kind: "template",
    id: "cm1_angle_comparer_tpl_008_classer_trois_angles",
    niveau: "cm1",
    matiere: "maths",
    notionId: "angle",
    microId: "angle_comparer",
    difficulty: 3,
    theme: "neutral",
    hint: "Compare les mesures : plus la mesure est grande, plus l’ouverture est grande.",
    tags: ["cm1", "angle", "comparer", "classer", "template", "qcm"],
    generate: () => {
      const values = randomChoice([
        [40, 90, 120],
        [30, 75, 110],
        [60, 100, 140],
        [45, 80, 130],
      ]);

      const shuffledValues = shuffle(values);
      const labels = ["A", "B", "C"];

      const angleMap = {
        A: shuffledValues[0],
        B: shuffledValues[1],
        C: shuffledValues[2],
      };

      const biggest = Object.entries(angleMap).sort(([, v1], [, v2]) => v2 - v1)[0][0];

      return {
        text:
          `L’angle A mesure ${angleMap.A}°, l’angle B mesure ${angleMap.B}° et l’angle C mesure ${angleMap.C}°. ` +
          `Quel est le plus grand angle ?`,
        format: "qcm",
        choices: ["A", "B", "C"],
        expected: [biggest],
        comparator: "mcq_exact",
        explanation:
          "Pour trouver le plus grand angle, on compare les ouvertures. " +
          `Ici, on compare ${angleMap.A}°, ${angleMap.B}° et ${angleMap.C}°. ` +
          `La plus grande mesure correspond à l’angle ${biggest}.`,
      };
    },
  },

  {
    kind: "template",
    id: "cm1_angle_comparer_tpl_009_open_expliquer_ouverture",
    niveau: "cm1",
    matiere: "maths",
    notionId: "angle",
    microId: "angle_comparer",
    difficulty: 3,
    theme: "neutral",
    hint: "Explique que la longueur des côtés ne compte pas.",
    tags: ["cm1", "angle", "comparer", "open", "ouverture", "template"],
    generate: () => {
      return {
        text:
          "Explique pourquoi on ne peut pas comparer deux angles seulement en regardant la longueur de leurs côtés dessinés.",
        format: "open",
        expected: ["ouverture", "longueur", "côtés"],
        comparator: "contains_keyword",
        explanation:
          "Réponse possible : la taille d’un angle dépend de son ouverture. " +
          "Les côtés dessinés peuvent être longs ou courts, cela ne change pas l’ouverture de l’angle. " +
          "Pour comparer deux angles, il faut donc comparer leur ouverture.",
      };
    },
  },

  {
    kind: "template",
    id: "cm1_angle_comparer_tpl_010_open_comparer_deux_angles",
    niveau: "cm1",
    matiere: "maths",
    notionId: "angle",
    microId: "angle_comparer",
    difficulty: 3,
    theme: "neutral",
    hint: "Compare les deux ouvertures.",
    tags: ["cm1", "angle", "comparer", "open", "expliquer", "template", "canvas"],
    generate: () => {
      const angleA = randomChoice([35, 45, 60, 75]);
      const angleB = randomChoice([100, 110, 125, 140]);

      const correct = angleB > angleA ? "B" : "A";

      return {
        text:
          `L’angle A mesure ${angleA}°. L’angle B mesure ${angleB}°. ` +
          `L’angle ${correct} est le plus grand. Explique pourquoi.`,
        format: "open",
        expected: ["ouverture", "plus grand", "degrés"],
        comparator: "contains_keyword",
        explanation:
          "Réponse possible : on compare l’ouverture des deux angles. " +
          `L’angle A mesure ${angleA}° et l’angle B mesure ${angleB}°. ` +
          `${angleB}° est plus grand que ${angleA}°, donc l’angle B a la plus grande ouverture.`,
        canvas: angleCanvas({
          angleDeg: angleB,
          vertex: "O",
          left: "A",
          right: "B",
          label: `${angleB}°`,
          showMeasure: true,
          showRightAngle: false,
        }),
      };
    },
  },
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
