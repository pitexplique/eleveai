// lib/tutor-v4/question-banks/maths/cm1/angles.bank.ts

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

/* =========================
   HELPERS
========================= */

function randomChoice<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffle<T>(items: T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

function makeChoices(correct: string, wrongs: string[]) {
  return shuffle([correct, ...wrongs])
    .filter((choice, index, arr) => arr.indexOf(choice) === index)
    .slice(0, 4);
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
    explanation: "Le coin d'un carré forme un angle droit, qui mesure 90°.",
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
    explanation: "Un angle aigu est plus petit que l'angle droit (moins de 90°).",
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

  {
    kind: "template",
    id: "cm1_angle_reconnaitre_tpl_001_definition_angle",
    niveau: "cm1",
    matiere: "maths",
    notionId: "angle",
    microId: "angle_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    hint: "Un angle a un sommet et deux côtés.",
    tags: ["cm1", "angle", "reconnaitre", "definition", "template", "qcm", "canvas"],
    generate: () => {
      const angleDeg = randomChoice([35, 45, 60, 75, 100, 120]);

      return {
        text: "Un angle est formé par...",
        format: "qcm",
        choices: makeChoices("deux demi-droites qui partent du même point", [
          "un seul segment",
          "trois cercles",
          "deux points sans trait",
        ]),
        expected: ["deux demi-droites qui partent du même point"],
        comparator: "mcq_exact",
        explanation:
          "Un angle est formé par deux côtés qui partent du même point. " +
          "Ce point commun s’appelle le sommet de l’angle. " +
          "Ce qui compte surtout, c’est l’ouverture entre les deux côtés.",
        canvas: angleCanvas({
          angleDeg,
          vertex: "O",
          left: "A",
          right: "B",
          showMeasure: false,
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_angle_reconnaitre_tpl_002_sommet_angle",
    niveau: "cm1",
    matiere: "maths",
    notionId: "angle",
    microId: "angle_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    hint: "Le sommet est le point d’où partent les deux côtés de l’angle.",
    tags: ["cm1", "angle", "reconnaitre", "sommet", "template", "qcm", "canvas"],
    generate: () => {
      const vertex = randomChoice(["O", "S", "M", "A"]);
      const angleDeg = randomChoice([40, 55, 70, 85, 110]);

      return {
        text: `Sur la figure, les deux côtés de l’angle partent du point ${vertex}. Comment s’appelle ce point ?`,
        format: "qcm",
        choices: makeChoices("le sommet", [
          "le milieu",
          "le centre",
          "la base",
        ]),
        expected: ["le sommet"],
        comparator: "mcq_exact",
        explanation:
          "Le sommet d’un angle est le point commun aux deux côtés. " +
          `Ici, les deux côtés de l’angle partent du point ${vertex}. ` +
          `Le point ${vertex} est donc le sommet de l’angle.`,
        canvas: angleCanvas({
          angleDeg,
          vertex,
          left: "B",
          right: "C",
          showMeasure: false,
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_angle_reconnaitre_tpl_003_cotes_angle",
    niveau: "cm1",
    matiere: "maths",
    notionId: "angle",
    microId: "angle_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    hint: "Un angle possède deux côtés.",
    tags: ["cm1", "angle", "reconnaitre", "cotes", "template", "qcm", "canvas"],
    generate: () => {
      const angleDeg = randomChoice([30, 50, 65, 80, 115]);

      return {
        text: "Dans un angle, les deux traits qui forment l’ouverture s’appellent...",
        format: "qcm",
        choices: makeChoices("les côtés de l’angle", [
          "les diagonales de l’angle",
          "les masses de l’angle",
          "les carreaux de l’angle",
        ]),
        expected: ["les côtés de l’angle"],
        comparator: "mcq_exact",
        explanation:
          "Un angle a un sommet et deux côtés. " +
          "Les côtés sont les deux demi-droites qui partent du sommet. " +
          "L’ouverture entre ces deux côtés forme l’angle.",
        canvas: angleCanvas({
          angleDeg,
          vertex: "O",
          left: "A",
          right: "B",
          showMeasure: false,
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_angle_reconnaitre_tpl_004_vie_quotidienne",
    niveau: "cm1",
    matiere: "maths",
    notionId: "angle",
    microId: "angle_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    hint: "Cherche une situation où il y a une ouverture.",
    tags: ["cm1", "angle", "reconnaitre", "vie_quotidienne", "template", "qcm"],
    generate: () => {
      const item = randomChoice([
        {
          text: "Dans quelle situation voit-on facilement un angle ?",
          correct: "l’ouverture d’une porte",
          explanation:
            "Quand une porte s’ouvre, elle forme une ouverture avec le mur. Cette ouverture peut représenter un angle.",
        },
        {
          text: "Quel objet peut faire penser à un angle quand on l’ouvre ?",
          correct: "une paire de ciseaux",
          explanation:
            "Quand on ouvre des ciseaux, les deux branches forment une ouverture. Cette ouverture fait penser à un angle.",
        },
        {
          text: "Dans quelle situation peut-on observer une ouverture comme un angle ?",
          correct: "un livre entrouvert",
          explanation:
            "Un livre entrouvert forme une ouverture entre ses deux parties. Cette ouverture peut faire penser à un angle.",
        },
      ]);

      return {
        text: item.text,
        format: "qcm",
        choices: makeChoices(item.correct, [
          "la masse d’un cartable",
          "la contenance d’une bouteille",
          "la durée d’une chanson",
        ]),
        expected: [item.correct],
        comparator: "mcq_exact",
        explanation: item.explanation,
      };
    },
  },

  {
    kind: "template",
    id: "cm1_angle_reconnaitre_tpl_005_angle_pas_longueur",
    niveau: "cm1",
    matiere: "maths",
    notionId: "angle",
    microId: "angle_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    hint: "Un angle mesure une ouverture, pas une longueur.",
    tags: ["cm1", "angle", "reconnaitre", "erreur", "longueur", "template", "qcm"],
    generate: () => {
      const angleDeg = randomChoice([35, 50, 70, 100, 125]);

      return {
        text: "Un élève dit : “Un angle, c’est une longueur.” A-t-il raison ?",
        format: "qcm",
        choices: ["non", "oui"],
        expected: ["non"],
        comparator: "mcq_exact",
        explanation:
          "L’élève confond deux notions. " +
          "Une longueur mesure un segment, par exemple en centimètres. " +
          "Un angle mesure une ouverture entre deux côtés. " +
          "Donc un angle n’est pas une longueur.",
        canvas: angleCanvas({
          angleDeg,
          vertex: "O",
          left: "A",
          right: "B",
          showMeasure: false,
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_angle_reconnaitre_tpl_006_reunion_case_creole",
    niveau: "cm1",
    matiere: "maths",
    notionId: "angle",
    microId: "angle_reconnaitre",
    difficulty: 2,
    theme: "reunion",
    hint: "Un coin de fenêtre ou de porte peut former un angle.",
    tags: ["cm1", "angle", "reconnaitre", "reunion", "case_creole", "template"],
    generate: () => {
      const lieu = randomChoice([
        "une fenêtre de case créole",
        "une porte de maison à La Réunion",
        "un coin de tableau dans une classe",
        "un portail entrouvert",
      ]);

      return {
        text: `Dans ${lieu}, on peut observer...`,
        format: "qcm",
        choices: makeChoices("un angle", [
          "une masse",
          "une contenance",
          "une durée",
        ]),
        expected: ["un angle"],
        comparator: "mcq_exact",
        explanation:
          `Dans ${lieu}, on peut observer une ouverture ou un coin. ` +
          "Cela permet de reconnaître un angle dans une situation réelle.",
      };
    },
  },

  {
    kind: "template",
    id: "cm1_angle_reconnaitre_tpl_007_open_expliquer_angle",
    niveau: "cm1",
    matiere: "maths",
    notionId: "angle",
    microId: "angle_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    hint: "Utilise les mots ouverture, sommet ou côtés.",
    tags: ["cm1", "angle", "reconnaitre", "open", "expliquer", "template", "canvas"],
    generate: () => {
      const angleDeg = randomChoice([45, 60, 75, 105]);

      return {
        text: "Explique avec tes mots ce qu’est un angle.",
        format: "open",
        expected: ["ouverture", "sommet", "côtés"],
        comparator: "contains_keyword",
        explanation:
          "Réponse possible : un angle est une ouverture entre deux côtés. " +
          "Les deux côtés partent du même point, appelé le sommet. " +
          "La taille de l’angle dépend de l’ouverture.",
        canvas: angleCanvas({
          angleDeg,
          vertex: "O",
          left: "A",
          right: "B",
          showMeasure: false,
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_angle_reconnaitre_tpl_008_open_objet_angle",
    niveau: "cm1",
    matiere: "maths",
    notionId: "angle",
    microId: "angle_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    hint: "Pense à une porte, des ciseaux ou un livre entrouvert.",
    tags: ["cm1", "angle", "reconnaitre", "open", "vie_quotidienne", "template"],
    generate: () => {
      const objet = randomChoice([
        "une porte ouverte",
        "une paire de ciseaux ouverte",
        "un livre entrouvert",
        "un portail ouvert",
      ]);

      return {
        text: `Explique pourquoi ${objet} peut faire penser à un angle.`,
        format: "open",
        expected: ["ouverture", "angle"],
        comparator: "contains_keyword",
        explanation:
          `Réponse possible : ${objet} forme une ouverture. ` +
          "Un angle représente justement une ouverture entre deux côtés.",
      };
    },
  },
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

  {
    kind: "template",
    id: "cm1_angle_droit_tpl_001_reconnaitre_canvas",
    niveau: "cm1",
    matiere: "maths",
    notionId: "angle",
    microId: "angle_droit",
    difficulty: 1,
    theme: "neutral",
    hint: "Un angle droit a la même ouverture que le coin d’un carré.",
    tags: ["cm1", "angle", "droit", "reconnaitre", "template", "qcm", "canvas"],
    generate: () => {
      const angleDeg = randomChoice([60, 75, 90, 105, 120]);
      const isRight = angleDeg === 90;

      return {
        text: "L’angle représenté est-il un angle droit ?",
        format: "qcm",
        choices: ["oui", "non"],
        expected: [isRight ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation:
          "Un angle droit a une ouverture particulière : c’est celle du coin d’un carré ou d’un rectangle. " +
          (isRight
            ? "Ici, l’angle est codé comme un angle droit. La bonne réponse est oui."
            : "Ici, l’ouverture n’est pas celle d’un angle droit. La bonne réponse est non."),
        canvas: angleCanvas({
          angleDeg,
          vertex: "O",
          left: "A",
          right: "B",
          showMeasure: false,
          showRightAngle: isRight,
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_angle_droit_tpl_002_coin_rectangle",
    niveau: "cm1",
    matiere: "maths",
    notionId: "angle",
    microId: "angle_droit",
    difficulty: 1,
    theme: "neutral",
    hint: "Un rectangle possède quatre angles droits.",
    tags: ["cm1", "angle", "droit", "rectangle", "template", "qcm"],
    generate: () => {
      const objet = randomChoice([
        "un rectangle",
        "un carré",
        "une feuille rectangulaire",
        "un cahier fermé",
        "un tableau rectangulaire",
      ]);

      return {
        text: `Le coin de ${objet} forme généralement...`,
        format: "qcm",
        choices: makeChoices("un angle droit", [
          "un angle aigu",
          "un angle obtus",
          "une contenance",
        ]),
        expected: ["un angle droit"],
        comparator: "mcq_exact",
        explanation:
          `Le coin de ${objet} ressemble au coin d’un rectangle ou d’un carré. ` +
          "Ce type de coin forme un angle droit.",
      };
    },
  },

  {
    kind: "template",
    id: "cm1_angle_droit_tpl_003_equerre",
    niveau: "cm1",
    matiere: "maths",
    notionId: "angle",
    microId: "angle_droit",
    difficulty: 1,
    theme: "neutral",
    hint: "L’équerre possède un angle droit.",
    tags: ["cm1", "angle", "droit", "equerre", "template", "qcm"],
    generate: () => {
      return {
        text: "Quel objet peut aider à vérifier si un angle est droit ?",
        format: "qcm",
        choices: makeChoices("une équerre", [
          "une balance",
          "un verre doseur",
          "un chronomètre",
        ]),
        expected: ["une équerre"],
        comparator: "mcq_exact",
        explanation:
          "Une équerre possède un angle droit. " +
          "On peut placer l’angle droit de l’équerre sur l’angle à vérifier. " +
          "Si les côtés coïncident, l’angle est droit.",
      };
    },
  },

  {
    kind: "template",
    id: "cm1_angle_droit_tpl_004_90_degres_repere",
    niveau: "cm1",
    matiere: "maths",
    notionId: "angle",
    microId: "angle_droit",
    difficulty: 2,
    theme: "neutral",
    hint: "Un angle droit mesure 90°.",
    tags: ["cm1", "angle", "droit", "90_degres", "template", "qcm", "canvas"],
    generate: () => {
      const angleDeg = randomChoice([45, 60, 80, 90, 100, 120]);
      const isRight = angleDeg === 90;

      return {
        text: `Un angle de ${angleDeg}° est-il un angle droit ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: [isRight ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation:
          "Un angle droit mesure exactement 90°. " +
          (isRight
            ? `${angleDeg}° est égal à 90°, donc c’est un angle droit.`
            : `${angleDeg}° n’est pas égal à 90°, donc ce n’est pas un angle droit.`),
        canvas: angleCanvas({
          angleDeg,
          vertex: "O",
          left: "A",
          right: "B",
          label: `${angleDeg}°`,
          showMeasure: true,
          showRightAngle: isRight,
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_angle_droit_tpl_005_vie_quotidienne",
    niveau: "cm1",
    matiere: "maths",
    notionId: "angle",
    microId: "angle_droit",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche un objet avec un coin comme celui d’un carré.",
    tags: ["cm1", "angle", "droit", "vie_quotidienne", "template", "qcm"],
    generate: () => {
      const item = randomChoice([
        {
          text: "Quel objet contient souvent des angles droits ?",
          correct: "une feuille rectangulaire",
          explanation:
            "Une feuille rectangulaire possède quatre coins. Chaque coin forme un angle droit.",
        },
        {
          text: "Quel élément de la classe peut faire penser à un angle droit ?",
          correct: "le coin du tableau",
          explanation:
            "Un tableau rectangulaire a des coins droits. Le coin du tableau peut donc représenter un angle droit.",
        },
        {
          text: "Dans quel objet retrouve-t-on facilement un angle droit ?",
          correct: "le coin d’un cahier",
          explanation:
            "Le coin d’un cahier rectangulaire forme un angle droit.",
        },
      ]);

      return {
        text: item.text,
        format: "qcm",
        choices: makeChoices(item.correct, [
          "une corde souple",
          "une bouteille ronde",
          "une balle",
        ]),
        expected: [item.correct],
        comparator: "mcq_exact",
        explanation: item.explanation,
      };
    },
  },

  {
    kind: "template",
    id: "cm1_angle_droit_tpl_006_reunion_case_creole",
    niveau: "cm1",
    matiere: "maths",
    notionId: "angle",
    microId: "angle_droit",
    difficulty: 2,
    theme: "reunion",
    hint: "Un coin de fenêtre rectangulaire forme souvent un angle droit.",
    tags: ["cm1", "angle", "droit", "reunion", "case_creole", "template", "qcm", "canvas"],
    generate: () => {
      const lieu = randomChoice([
        "une fenêtre de case créole",
        "une porte rectangulaire",
        "un tableau dans une classe à La Réunion",
        "un cadre photo rectangulaire",
      ]);

      return {
        text: `Le coin de ${lieu} forme généralement quel type d’angle ?`,
        format: "qcm",
        choices: makeChoices("un angle droit", [
          "un angle aigu",
          "un angle obtus",
          "une longueur",
        ]),
        expected: ["un angle droit"],
        comparator: "mcq_exact",
        explanation:
          `Le coin de ${lieu} ressemble au coin d’un rectangle. ` +
          "Un coin de rectangle forme un angle droit.",
        canvas: angleCanvas({
          angleDeg: 90,
          vertex: "O",
          left: "A",
          right: "B",
          showMeasure: false,
          showRightAngle: true,
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_angle_droit_tpl_007_erreur_presque_droit",
    niveau: "cm1",
    matiere: "maths",
    notionId: "angle",
    microId: "angle_droit",
    difficulty: 2,
    theme: "neutral",
    hint: "Un angle droit doit être exactement comme le coin d’un carré.",
    tags: ["cm1", "angle", "droit", "erreur", "presque_droit", "template", "qcm", "canvas"],
    generate: () => {
      const angleDeg = randomChoice([80, 85, 95, 100]);
      const plusPetitOuGrand = angleDeg < 90 ? "plus petit" : "plus grand";

      return {
        text:
          `Un élève dit : “Cet angle de ${angleDeg}° est droit, car il est presque comme 90°.” ` +
          `A-t-il raison ?`,
        format: "qcm",
        choices: ["non", "oui"],
        expected: ["non"],
        comparator: "mcq_exact",
        explanation:
          "L’élève n’a pas raison. " +
          "Un angle droit doit être exactement égal à 90°. " +
          `${angleDeg}° est ${plusPetitOuGrand} que 90°. ` +
          "Il n’est donc pas exactement droit.",
        canvas: angleCanvas({
          angleDeg,
          vertex: "O",
          left: "A",
          right: "B",
          label: `${angleDeg}°`,
          showMeasure: true,
          showRightAngle: false,
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_angle_droit_tpl_008_open_expliquer_angle_droit",
    niveau: "cm1",
    matiere: "maths",
    notionId: "angle",
    microId: "angle_droit",
    difficulty: 2,
    theme: "neutral",
    hint: "Tu peux parler du coin d’un carré, d’un rectangle ou de l’équerre.",
    tags: ["cm1", "angle", "droit", "open", "expliquer", "template", "canvas"],
    generate: () => {
      return {
        text: "Explique comment on peut reconnaître un angle droit.",
        format: "open",
        expected: ["équerre", "carré", "rectangle"],
        comparator: "contains_keyword",
        explanation:
          "Réponse possible : un angle droit ressemble au coin d’un carré ou d’un rectangle. " +
          "On peut aussi le vérifier avec l’angle droit d’une équerre. " +
          "Sur un dessin, il est parfois codé par un petit carré.",
        canvas: angleCanvas({
          angleDeg: 90,
          vertex: "O",
          left: "A",
          right: "B",
          showMeasure: false,
          showRightAngle: true,
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_angle_droit_tpl_009_open_corriger_erreur",
    niveau: "cm1",
    matiere: "maths",
    notionId: "angle",
    microId: "angle_droit",
    difficulty: 3,
    theme: "neutral",
    hint: "Explique qu’un angle droit est exactement l’angle du coin d’un carré.",
    tags: ["cm1", "angle", "droit", "open", "erreur", "template", "canvas"],
    generate: () => {
      const angleDeg = randomChoice([80, 85, 95, 100]);

      return {
        text:
          `Un élève dit : “Un angle de ${angleDeg}° est droit parce qu’il est presque droit.” ` +
          `Corrige son erreur.`,
        format: "open",
        expected: ["90", "droit", "exactement"],
        comparator: "contains_keyword",
        explanation:
          "Réponse possible : un angle droit doit être exactement égal à 90°. " +
          `${angleDeg}° est proche de 90°, mais ce n’est pas 90°. ` +
          "Donc cet angle n’est pas un angle droit.",
        canvas: angleCanvas({
          angleDeg,
          vertex: "O",
          left: "A",
          right: "B",
          label: `${angleDeg}°`,
          showMeasure: true,
          showRightAngle: false,
        }),
      };
    },
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

  {
    kind: "template",
    id: "cm1_angle_type_tpl_001_identifier_par_mesure_simple",
    niveau: "cm1",
    matiere: "maths",
    notionId: "angle",
    microId: "angle_type",
    difficulty: 2,
    theme: "neutral",
    hint: "Compare avec l’angle droit : 90°.",
    tags: ["cm1", "angle", "type", "aigu", "droit", "obtus", "template", "qcm", "canvas"],
    generate: () => {
      const angleDeg = randomChoice([30, 45, 60, 75, 90, 100, 120, 140]);

      const correct =
        angleDeg < 90
          ? "aigu"
          : angleDeg === 90
            ? "droit"
            : "obtus";

      return {
        text: `L’angle représenté mesure ${angleDeg}°. Quel est son type ?`,
        format: "qcm",
        choices: shuffle(["aigu", "droit", "obtus"]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Pour reconnaître le type d’un angle, on le compare à l’angle droit. " +
          (angleDeg < 90
            ? `${angleDeg}° est plus petit que 90° : l’angle est aigu.`
            : angleDeg === 90
              ? `${angleDeg}° est exactement égal à 90° : l’angle est droit.`
              : `${angleDeg}° est plus grand que 90° : l’angle est obtus.`),
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
    id: "cm1_angle_type_tpl_002_plus_petit_angle_droit",
    niveau: "cm1",
    matiere: "maths",
    notionId: "angle",
    microId: "angle_type",
    difficulty: 2,
    theme: "neutral",
    hint: "Plus petit qu’un angle droit : aigu.",
    tags: ["cm1", "angle", "type", "aigu", "template", "qcm", "canvas"],
    generate: () => {
      const angleDeg = randomChoice([25, 35, 45, 55, 70, 80]);

      return {
        text: `Un angle de ${angleDeg}° est-il aigu, droit ou obtus ?`,
        format: "qcm",
        choices: shuffle(["aigu", "droit", "obtus"]),
        expected: ["aigu"],
        comparator: "mcq_exact",
        explanation:
          "Un angle aigu est plus petit qu’un angle droit. " +
          `Un angle droit mesure 90°. Ici, ${angleDeg}° est plus petit que 90°. ` +
          "L’angle est donc aigu.",
        canvas: angleCanvas({
          angleDeg,
          vertex: "O",
          left: "A",
          right: "B",
          label: `${angleDeg}°`,
          showMeasure: true,
          showRightAngle: false,
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_angle_type_tpl_003_plus_grand_angle_droit",
    niveau: "cm1",
    matiere: "maths",
    notionId: "angle",
    microId: "angle_type",
    difficulty: 2,
    theme: "neutral",
    hint: "Plus grand qu’un angle droit : obtus.",
    tags: ["cm1", "angle", "type", "obtus", "template", "qcm", "canvas"],
    generate: () => {
      const angleDeg = randomChoice([100, 110, 120, 130, 145, 160]);

      return {
        text: `Un angle de ${angleDeg}° est-il aigu, droit ou obtus ?`,
        format: "qcm",
        choices: shuffle(["aigu", "droit", "obtus"]),
        expected: ["obtus"],
        comparator: "mcq_exact",
        explanation:
          "Un angle obtus est plus grand qu’un angle droit. " +
          `Un angle droit mesure 90°. Ici, ${angleDeg}° est plus grand que 90°. ` +
          "L’angle est donc obtus.",
        canvas: angleCanvas({
          angleDeg,
          vertex: "O",
          left: "A",
          right: "B",
          label: `${angleDeg}°`,
          showMeasure: true,
          showRightAngle: false,
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_angle_type_tpl_004_droit_repere",
    niveau: "cm1",
    matiere: "maths",
    notionId: "angle",
    microId: "angle_type",
    difficulty: 2,
    theme: "neutral",
    hint: "90° correspond à un angle droit.",
    tags: ["cm1", "angle", "type", "droit", "template", "qcm", "canvas"],
    generate: () => {
      return {
        text: "Un angle de 90° est...",
        format: "qcm",
        choices: shuffle(["aigu", "droit", "obtus"]),
        expected: ["droit"],
        comparator: "mcq_exact",
        explanation:
          "90° est la mesure de l’angle droit. " +
          "Un angle de 90° n’est ni aigu ni obtus : il est exactement droit.",
        canvas: angleCanvas({
          angleDeg: 90,
          vertex: "O",
          left: "A",
          right: "B",
          label: "90°",
          showMeasure: true,
          showRightAngle: true,
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_angle_type_tpl_005_vocabulaire_type",
    niveau: "cm1",
    matiere: "maths",
    notionId: "angle",
    microId: "angle_type",
    difficulty: 2,
    theme: "neutral",
    hint: "Aigu : plus petit que droit. Obtus : plus grand que droit.",
    tags: ["cm1", "angle", "type", "vocabulaire", "template", "qcm"],
    generate: () => {
      const item = randomChoice([
        {
          text: "Comment appelle-t-on un angle plus petit qu’un angle droit ?",
          correct: "un angle aigu",
          wrongs: ["un angle obtus", "un angle droit", "une aire"],
          explanation:
            "Un angle plus petit qu’un angle droit est appelé un angle aigu.",
        },
        {
          text: "Comment appelle-t-on un angle plus grand qu’un angle droit ?",
          correct: "un angle obtus",
          wrongs: ["un angle aigu", "un angle droit", "un segment"],
          explanation:
            "Un angle plus grand qu’un angle droit est appelé un angle obtus.",
        },
        {
          text: "Comment appelle-t-on un angle qui a exactement l’ouverture du coin d’un carré ?",
          correct: "un angle droit",
          wrongs: ["un angle aigu", "un angle obtus", "une longueur"],
          explanation:
            "Le coin d’un carré forme un angle droit.",
        },
      ]);

      return {
        text: item.text,
        format: "qcm",
        choices: makeChoices(item.correct, item.wrongs),
        expected: [item.correct],
        comparator: "mcq_exact",
        explanation: item.explanation,
      };
    },
  },

  {
    kind: "template",
    id: "cm1_angle_type_tpl_006_porte_ouverte",
    niveau: "cm1",
    matiere: "maths",
    notionId: "angle",
    microId: "angle_type",
    difficulty: 2,
    theme: "neutral",
    hint: "Petite ouverture : aiguë. Ouverture plus grande que l’angle droit : obtuse.",
    tags: ["cm1", "angle", "type", "vie_quotidienne", "porte", "template", "qcm", "canvas"],
    generate: () => {
      const item = randomChoice([
        {
          situation: "Une porte est très peu ouverte",
          angleDeg: 35,
          correct: "aigu",
          explanation:
            "La porte forme une petite ouverture. Une ouverture plus petite qu’un angle droit est aiguë.",
        },
        {
          situation: "Une porte est ouverte comme le coin d’un carré",
          angleDeg: 90,
          correct: "droit",
          explanation:
            "Une ouverture comme le coin d’un carré correspond à un angle droit.",
        },
        {
          situation: "Une porte est très largement ouverte",
          angleDeg: 125,
          correct: "obtus",
          explanation:
            "La porte forme une grande ouverture, plus grande qu’un angle droit. L’angle est obtus.",
        },
      ]);

      return {
        text: `${item.situation}. L’angle est plutôt...`,
        format: "qcm",
        choices: shuffle(["aigu", "droit", "obtus"]),
        expected: [item.correct],
        comparator: "mcq_exact",
        explanation: item.explanation,
        canvas: angleCanvas({
          angleDeg: item.angleDeg,
          vertex: "O",
          left: "Mur",
          right: "Porte",
          label: "",
          showMeasure: false,
          showRightAngle: item.angleDeg === 90,
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_angle_type_tpl_007_reunion_case_creole",
    niveau: "cm1",
    matiere: "maths",
    notionId: "angle",
    microId: "angle_type",
    difficulty: 2,
    theme: "reunion",
    hint: "Compare l’ouverture avec un angle droit.",
    tags: ["cm1", "angle", "type", "reunion", "case_creole", "template", "qcm", "canvas"],
    generate: () => {
      const item = randomChoice([
        {
          lieu: "le coin d’une fenêtre de case créole",
          angleDeg: 90,
          correct: "droit",
          explanation:
            "Le coin d’une fenêtre rectangulaire forme généralement un angle droit.",
        },
        {
          lieu: "un portail très peu ouvert à La Réunion",
          angleDeg: 40,
          correct: "aigu",
          explanation:
            "Un portail très peu ouvert forme une petite ouverture : l’angle est aigu.",
        },
        {
          lieu: "une porte largement ouverte dans une classe",
          angleDeg: 120,
          correct: "obtus",
          explanation:
            "Une porte largement ouverte forme une ouverture plus grande qu’un angle droit : l’angle est obtus.",
        },
      ]);

      return {
        text: `Dans ${item.lieu}, l’angle représenté est plutôt...`,
        format: "qcm",
        choices: shuffle(["aigu", "droit", "obtus"]),
        expected: [item.correct],
        comparator: "mcq_exact",
        explanation: item.explanation,
        canvas: angleCanvas({
          angleDeg: item.angleDeg,
          vertex: "O",
          left: "A",
          right: "B",
          showMeasure: false,
          showRightAngle: item.angleDeg === 90,
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_angle_type_tpl_008_erreur_90_aigu",
    niveau: "cm1",
    matiere: "maths",
    notionId: "angle",
    microId: "angle_type",
    difficulty: 3,
    theme: "neutral",
    hint: "Un angle aigu est strictement plus petit qu’un angle droit.",
    tags: ["cm1", "angle", "type", "erreur", "aigu", "90", "template", "qcm", "canvas"],
    generate: () => {
      return {
        text: "Un élève dit : “Un angle de 90° est aigu.” A-t-il raison ?",
        format: "qcm",
        choices: ["non", "oui"],
        expected: ["non"],
        comparator: "mcq_exact",
        explanation:
          "L’élève n’a pas raison. " +
          "Un angle aigu est plus petit qu’un angle droit. " +
          "Un angle de 90° est exactement un angle droit, donc il n’est pas aigu.",
        canvas: angleCanvas({
          angleDeg: 90,
          vertex: "O",
          left: "A",
          right: "B",
          label: "90°",
          showMeasure: true,
          showRightAngle: true,
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_angle_type_tpl_009_erreur_obtus_proche",
    niveau: "cm1",
    matiere: "maths",
    notionId: "angle",
    microId: "angle_type",
    difficulty: 3,
    theme: "neutral",
    hint: "Dès que l’angle est plus grand que 90°, il est obtus.",
    tags: ["cm1", "angle", "type", "erreur", "obtus", "template", "qcm", "canvas"],
    generate: () => {
      const angleDeg = randomChoice([95, 100, 105]);

      return {
        text:
          `Un élève dit : “${angleDeg}° est un angle droit car c’est presque 90°.” ` +
          `A-t-il raison ?`,
        format: "qcm",
        choices: ["non", "oui"],
        expected: ["non"],
        comparator: "mcq_exact",
        explanation:
          "Un angle droit mesure exactement 90°. " +
          `${angleDeg}° est plus grand que 90°. ` +
          "Ce n’est donc pas un angle droit : c’est un angle obtus.",
        canvas: angleCanvas({
          angleDeg,
          vertex: "O",
          left: "A",
          right: "B",
          label: `${angleDeg}°`,
          showMeasure: true,
          showRightAngle: false,
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_angle_type_tpl_010_open_expliquer_type",
    niveau: "cm1",
    matiere: "maths",
    notionId: "angle",
    microId: "angle_type",
    difficulty: 3,
    theme: "neutral",
    hint: "Explique en comparant avec l’angle droit.",
    tags: ["cm1", "angle", "type", "open", "expliquer", "template", "canvas"],
    generate: () => {
      const item = randomChoice([
        {
          angleDeg: 50,
          type: "aigu",
          reason: "plus petit qu’un angle droit",
        },
        {
          angleDeg: 90,
          type: "droit",
          reason: "exactement égal à un angle droit",
        },
        {
          angleDeg: 120,
          type: "obtus",
          reason: "plus grand qu’un angle droit",
        },
      ]);

      return {
        text:
          `L’angle représenté est ${item.type}. ` +
          `Explique pourquoi.`,
        format: "open",
        expected: ["angle droit", "plus", "petit"],
        comparator: "contains_keyword",
        explanation:
          `Réponse possible : on compare l’angle avec l’angle droit. ` +
          `Cet angle mesure ${item.angleDeg}°. Il est ${item.reason}. ` +
          `Donc c’est un angle ${item.type}.`,
        canvas: angleCanvas({
          angleDeg: item.angleDeg,
          vertex: "O",
          left: "A",
          right: "B",
          label: `${item.angleDeg}°`,
          showMeasure: true,
          showRightAngle: item.angleDeg === 90,
        }),
      };
    },
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

  {
    kind: "template",
    id: "cm1_angle_defi_tpl_001_comparer_angle_droit",
    niveau: "cm1",
    matiere: "maths",
    notionId: "angle",
    microId: "angle_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Un angle droit mesure 90°.",
    tags: ["cm1", "angle", "defi", "comparer", "angle_droit", "template", "qcm", "canvas"],
    generate: () => {
      const angleDeg = randomChoice([35, 50, 75, 90, 105, 125, 150]);

      const correct =
        angleDeg < 90
          ? "plus petit"
          : angleDeg === 90
            ? "égal"
            : "plus grand";

      return {
        text: `Un angle de ${angleDeg}° est-il plus petit, égal ou plus grand qu’un angle droit ?`,
        format: "qcm",
        choices: ["plus petit", "égal", "plus grand"],
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Un angle droit sert de repère. Il mesure 90°. " +
          (angleDeg < 90
            ? `${angleDeg}° est plus petit que 90° : l’angle est plus petit qu’un angle droit.`
            : angleDeg === 90
              ? `${angleDeg}° est exactement égal à 90° : l’angle est égal à un angle droit.`
              : `${angleDeg}° est plus grand que 90° : l’angle est plus grand qu’un angle droit.`),
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
    id: "cm1_angle_defi_tpl_002_identifier_type",
    niveau: "cm1",
    matiere: "maths",
    notionId: "angle",
    microId: "angle_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Aigu : plus petit que droit. Droit : 90°. Obtus : plus grand que droit.",
    tags: ["cm1", "angle", "defi", "type", "aigu", "droit", "obtus", "template", "qcm", "canvas"],
    generate: () => {
      const angleDeg = randomChoice([25, 40, 60, 80, 90, 100, 115, 135, 155]);

      const correct =
        angleDeg < 90
          ? "aigu"
          : angleDeg === 90
            ? "droit"
            : "obtus";

      return {
        text: `Quel est le type d’un angle de ${angleDeg}° ?`,
        format: "qcm",
        choices: shuffle(["aigu", "droit", "obtus"]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "On compare l’angle avec l’angle droit. " +
          (angleDeg < 90
            ? `${angleDeg}° est plus petit que 90° : c’est un angle aigu.`
            : angleDeg === 90
              ? `${angleDeg}° est égal à 90° : c’est un angle droit.`
              : `${angleDeg}° est plus grand que 90° : c’est un angle obtus.`),
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
    id: "cm1_angle_defi_tpl_003_erreur_aigu_obtus",
    niveau: "cm1",
    matiere: "maths",
    notionId: "angle",
    microId: "angle_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Un angle aigu est plus petit que 90°.",
    tags: ["cm1", "angle", "defi", "erreur", "aigu", "obtus", "template", "qcm", "canvas"],
    generate: () => {
      const angleDeg = randomChoice([95, 100, 110, 120, 135]);

      return {
        text: `Un élève dit : “${angleDeg}° est un angle aigu.” A-t-il raison ?`,
        format: "qcm",
        choices: ["non", "oui"],
        expected: ["non"],
        comparator: "mcq_exact",
        explanation:
          "L’élève n’a pas raison. " +
          "Un angle aigu est plus petit qu’un angle droit. " +
          `Or ${angleDeg}° est plus grand que 90°. ` +
          "Cet angle est donc obtus, pas aigu.",
        canvas: angleCanvas({
          angleDeg,
          vertex: "O",
          left: "A",
          right: "B",
          label: `${angleDeg}°`,
          showMeasure: true,
          showRightAngle: false,
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_angle_defi_tpl_004_erreur_presque_droit",
    niveau: "cm1",
    matiere: "maths",
    notionId: "angle",
    microId: "angle_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Un angle droit est exactement égal à 90°.",
    tags: ["cm1", "angle", "defi", "erreur", "presque_droit", "template", "qcm", "canvas"],
    generate: () => {
      const angleDeg = randomChoice([80, 85, 95, 100]);
      const type = angleDeg < 90 ? "aigu" : "obtus";

      return {
        text:
          `Un élève dit : “${angleDeg}° est un angle droit, parce que c’est presque 90°.” ` +
          `A-t-il raison ?`,
        format: "qcm",
        choices: ["non", "oui"],
        expected: ["non"],
        comparator: "mcq_exact",
        explanation:
          "Un angle droit doit être exactement égal à 90°. " +
          `${angleDeg}° est proche de 90°, mais ce n’est pas 90°. ` +
          `Cet angle n’est donc pas droit : il est ${type}.`,
        canvas: angleCanvas({
          angleDeg,
          vertex: "O",
          left: "A",
          right: "B",
          label: `${angleDeg}°`,
          showMeasure: true,
          showRightAngle: false,
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_angle_defi_tpl_005_porte_ouverte",
    niveau: "cm1",
    matiere: "maths",
    notionId: "angle",
    microId: "angle_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Petite ouverture : aiguë. Grande ouverture : obtuse.",
    tags: ["cm1", "angle", "defi", "porte", "vie_quotidienne", "template", "qcm", "canvas"],
    generate: () => {
      const item = randomChoice([
        {
          situation: "Une porte est très peu ouverte",
          angleDeg: 30,
          correct: "aigu",
          explanation:
            "Une porte très peu ouverte forme une petite ouverture. L’angle est donc aigu.",
        },
        {
          situation: "Une porte est ouverte comme le coin d’un carré",
          angleDeg: 90,
          correct: "droit",
          explanation:
            "Une ouverture comme le coin d’un carré correspond à un angle droit.",
        },
        {
          situation: "Une porte est largement ouverte",
          angleDeg: 130,
          correct: "obtus",
          explanation:
            "Une porte largement ouverte forme une ouverture plus grande qu’un angle droit. L’angle est donc obtus.",
        },
      ]);

      return {
        text: `${item.situation}. Quel type d’angle forme-t-elle ?`,
        format: "qcm",
        choices: shuffle(["aigu", "droit", "obtus"]),
        expected: [item.correct],
        comparator: "mcq_exact",
        explanation: item.explanation,
        canvas: angleCanvas({
          angleDeg: item.angleDeg,
          vertex: "O",
          left: "Mur",
          right: "Porte",
          label: "",
          showMeasure: false,
          showRightAngle: item.angleDeg === 90,
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_angle_defi_tpl_006_reunion_case_creole",
    niveau: "cm1",
    matiere: "maths",
    notionId: "angle",
    microId: "angle_defi",
    difficulty: 3,
    theme: "reunion",
    hint: "Compare l’ouverture avec l’angle droit.",
    tags: ["cm1", "angle", "defi", "reunion", "case_creole", "template", "qcm", "canvas"],
    generate: () => {
      const item = randomChoice([
        {
          text: "Sur une case créole, le coin d’une fenêtre rectangulaire forme un angle de 90°. Quel type d’angle est-ce ?",
          angleDeg: 90,
          correct: "droit",
          explanation:
            "Un angle de 90° est un angle droit. Le coin d’une fenêtre rectangulaire forme généralement un angle droit.",
        },
        {
          text: "Un portail à La Réunion est très peu ouvert. Quel type d’angle forme-t-il plutôt ?",
          angleDeg: 35,
          correct: "aigu",
          explanation:
            "Un portail très peu ouvert forme une petite ouverture. L’angle est donc aigu.",
        },
        {
          text: "Une porte de classe est largement ouverte. Quel type d’angle forme-t-elle plutôt ?",
          angleDeg: 120,
          correct: "obtus",
          explanation:
            "Une porte largement ouverte forme une ouverture plus grande qu’un angle droit. L’angle est donc obtus.",
        },
      ]);

      return {
        text: item.text,
        format: "qcm",
        choices: shuffle(["aigu", "droit", "obtus"]),
        expected: [item.correct],
        comparator: "mcq_exact",
        explanation: item.explanation,
        canvas: angleCanvas({
          angleDeg: item.angleDeg,
          vertex: "O",
          left: "A",
          right: "B",
          showMeasure: false,
          showRightAngle: item.angleDeg === 90,
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_angle_defi_tpl_007_classer_trois_angles",
    niveau: "cm1",
    matiere: "maths",
    notionId: "angle",
    microId: "angle_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Compare chaque mesure avec 90°.",
    tags: ["cm1", "angle", "defi", "classer", "aigu", "droit", "obtus", "template", "qcm"],
    generate: () => {
      const values = randomChoice([
        [45, 90, 120],
        [30, 90, 140],
        [60, 90, 110],
        [75, 90, 150],
      ]);

      const shuffledValues = shuffle(values);
      const labels = ["A", "B", "C"];

      const angleMap = {
        A: shuffledValues[0],
        B: shuffledValues[1],
        C: shuffledValues[2],
      };

      const obtusEntry = Object.entries(angleMap).find(([, value]) => value > 90);
      const obtusLabel = obtusEntry ? obtusEntry[0] : "A";

      return {
        text:
          `L’angle A mesure ${angleMap.A}°, l’angle B mesure ${angleMap.B}° et l’angle C mesure ${angleMap.C}°. ` +
          `Quel angle est obtus ?`,
        format: "qcm",
        choices: ["A", "B", "C"],
        expected: [obtusLabel],
        comparator: "mcq_exact",
        explanation:
          "Un angle obtus est plus grand qu’un angle droit. " +
          "On compare donc chaque angle avec 90°. " +
          `L’angle ${obtusLabel} est celui qui est plus grand que 90° : il est obtus.`,
      };
    },
  },

  {
    kind: "template",
    id: "cm1_angle_defi_tpl_008_plus_grand_ouverture",
    niveau: "cm1",
    matiere: "maths",
    notionId: "angle",
    microId: "angle_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Plus la mesure est grande, plus l’ouverture est grande.",
    tags: ["cm1", "angle", "defi", "comparer", "ouverture", "template", "qcm"],
    generate: () => {
      const a = randomChoice([30, 45, 60, 75]);
      const b = randomChoice([100, 115, 130, 145]);
      const swap = randomChoice([true, false]);

      const angleA = swap ? b : a;
      const angleB = swap ? a : b;

      const correct = angleA > angleB ? "l’angle A" : "l’angle B";

      return {
        text:
          `L’angle A mesure ${angleA}°. L’angle B mesure ${angleB}°. ` +
          `Lequel a la plus grande ouverture ?`,
        format: "qcm",
        choices: ["l’angle A", "l’angle B", "ils ont la même ouverture"],
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Pour comparer deux angles, on compare leur ouverture. " +
          `Ici, on compare ${angleA}° et ${angleB}°. ` +
          `Le plus grand angle est celui qui a la plus grande mesure. ` +
          `La bonne réponse est : ${correct}.`,
      };
    },
  },

  {
    kind: "template",
    id: "cm1_angle_defi_tpl_009_open_corriger_longueur",
    niveau: "cm1",
    matiere: "maths",
    notionId: "angle",
    microId: "angle_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Explique que la taille d’un angle dépend de l’ouverture.",
    tags: ["cm1", "angle", "defi", "open", "erreur", "longueur_cotes", "template"],
    generate: () => {
      return {
        text:
          "Un élève dit : “Plus les côtés d’un angle sont longs, plus l’angle est grand.” " +
          "Corrige son erreur.",
        format: "open",
        expected: ["ouverture", "longueur", "côtés"],
        comparator: "contains_keyword",
        explanation:
          "Réponse possible : ce n’est pas la longueur des côtés qui rend un angle plus grand. " +
          "La taille d’un angle dépend de son ouverture. " +
          "On peut allonger les côtés d’un angle sans changer son ouverture.",
      };
    },
  },

  {
    kind: "template",
    id: "cm1_angle_defi_tpl_010_open_type_angle",
    niveau: "cm1",
    matiere: "maths",
    notionId: "angle",
    microId: "angle_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Compare l’angle avec l’angle droit.",
    tags: ["cm1", "angle", "defi", "open", "type", "template", "canvas"],
    generate: () => {
      const item = randomChoice([
        {
          angleDeg: 45,
          type: "aigu",
          reason: "plus petit qu’un angle droit",
        },
        {
          angleDeg: 90,
          type: "droit",
          reason: "égal à un angle droit",
        },
        {
          angleDeg: 120,
          type: "obtus",
          reason: "plus grand qu’un angle droit",
        },
      ]);

      return {
        text:
          `L’angle représenté est ${item.type}. ` +
          `Explique pourquoi.`,
        format: "open",
        expected: ["angle droit", "plus", "ouverture"],
        comparator: "contains_keyword",
        explanation:
          "Réponse possible : on compare l’ouverture avec celle d’un angle droit. " +
          `Cet angle mesure ${item.angleDeg}°. Il est ${item.reason}. ` +
          `Donc c’est un angle ${item.type}.`,
        canvas: angleCanvas({
          angleDeg: item.angleDeg,
          vertex: "O",
          left: "A",
          right: "B",
          label: `${item.angleDeg}°`,
          showMeasure: true,
          showRightAngle: item.angleDeg === 90,
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_angle_defi_tpl_011_open_situation_reelle",
    niveau: "cm1",
    matiere: "maths",
    notionId: "angle",
    microId: "angle_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Pense à une ouverture : porte, ciseaux, livre.",
    tags: ["cm1", "angle", "defi", "open", "vie_quotidienne", "template"],
    generate: () => {
      const situation = randomChoice([
        "une porte très peu ouverte",
        "une paire de ciseaux largement ouverte",
        "un livre entrouvert",
        "un portail presque fermé",
      ]);

      return {
        text: `Explique pourquoi ${situation} peut faire penser à un angle.`,
        format: "open",
        expected: ["ouverture", "angle"],
        comparator: "contains_keyword",
        explanation:
          `Réponse possible : ${situation} forme une ouverture. ` +
          "Un angle représente justement une ouverture entre deux côtés.",
      };
    },
  },
];
