// lib/tutor-v4/question-banks/maths/cm2/angles.bank.ts

import { anglesReconnaitre } from "@/lib/tutor-v4/questionBank/cm2/maths/angle-reconnaitre.bank";
import { anglesRepereDroit } from "@/lib/tutor-v4/questionBank/cm2/maths/angles-repere-droit.bank";
import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function makeChoices(correct: string, wrongs: readonly string[]) {
  // Jamais deux fois la même ligne. Un gabarit dont le piège coïncide avec la
  // bonne réponse (les coordonnées inversées quand x = y, un arrondi égal à la
  // valeur de départ…) affichait la même proposition deux fois, et l'élève
  // voyait deux réponses justes. Dédupliquer AVANT de couper à quatre laisse
  // aussi une chance aux distracteurs surnuméraires de prendre la place.
  // ⚠️ 04/08/2026 — la bonne réponse était jetée dans le même chapeau que les
  // pièges : à cinq pièges écrits, le mélange pouvait la laisser au fond et
  // le découpage à quatre l'emportait. L'élève voyait alors quatre pièges et
  // rien d'autre. On la met de côté, on tire trois distracteurs, on mélange.
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct),
  ).slice(0, 3);
  return shuffle([correct, ...distracteurs]);
}

function exp(
  definition: string,
  methode: string,
  calcul: string,
  conclusion: string
) {
  return (
    `Définition : ${definition}\n\n` +
    `Méthode : ${methode}\n\n` +
    `Calcul : ${calcul}\n\n` +
    `Conclusion : ${conclusion}`
  );
}

export const anglesBank: TutorBankItemV4[] = [
  // ============================================================
  // ANGLE_RECONNAITRE
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_angle_reconnaitre_fixed_1_definition",
    niveau: "cm2",
    matiere: "maths",
    notionId: "angle",
    microId: "angle_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    text: "Un angle est formé par combien de demi-droites ?",
    format: "qcm",
    choices: ["1", "2", "3", "4"],
    expected: ["2"],
    comparator: "mcq_exact",
    hint: "Les deux demi-droites partent du même point.",
    explanation: exp(
      "Un angle mesure l’ouverture entre deux demi-droites.",
      "On repère les deux côtés de l’angle et leur point commun.",
      "Un angle est formé par deux demi-droites qui partent du même point.",
      "Un angle est formé par 2 demi-droites."
    ),
    tags: ["cm2", "angle", "reconnaitre", "definition", "qcm"],
    canvas: {
      kind: "angle",
      angle: {
        angleDeg: 60,
        labels: {
          vertex: "O",
          left: "A",
          right: "B",
          angle: "angle",
        },
        display: {
          showLabels: true,
          showMeasure: false,
          showArc: true,
          showRightAngle: false,
          placeholder: "",
        },
      },
    },
  },

  {
    kind: "fixed",
    id: "cm2_angle_reconnaitre_fixed_2_sommet",
    niveau: "cm2",
    matiere: "maths",
    notionId: "angle",
    microId: "angle_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    text: "Comment s’appelle le point commun aux deux côtés d’un angle ?",
    format: "qcm",
    choices: ["le sommet", "le milieu", "le centre", "la base"],
    expected: ["le sommet"],
    comparator: "mcq_exact",
    hint: "C’est le point d’où partent les deux côtés de l’angle.",
    explanation: exp(
      "Un angle possède deux côtés et un sommet.",
      "On cherche le point commun aux deux côtés.",
      "Les deux côtés de l’angle partent du même point : ce point est le sommet.",
      "Le point commun s’appelle le sommet."
    ),
    tags: ["cm2", "angle", "reconnaitre", "sommet", "qcm", "canvas"],
    canvas: {
      kind: "angle",
      angle: {
        angleDeg: 75,
        labels: {
          vertex: "O",
          left: "A",
          right: "B",
          angle: "",
        },
        display: {
          showLabels: true,
          showMeasure: false,
          showArc: true,
          showRightAngle: false,
          placeholder: "",
        },
      },
    },
  },

  {
    kind: "fixed",
    id: "cm2_angle_reconnaitre_fixed_3_vocabulaire",
    niveau: "cm2",
    matiere: "maths",
    notionId: "angle",
    microId: "angle_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Dans un angle, les deux demi-droites sont appelées...",
    format: "qcm",
    choices: ["les côtés de l’angle", "les diagonales", "les rayons du cercle", "les hauteurs"],
    expected: ["les côtés de l’angle"],
    comparator: "mcq_exact",
    hint: "Un angle a un sommet et deux côtés.",
    explanation: exp(
      "Un angle est formé par deux demi-droites de même origine.",
      "On utilise le vocabulaire géométrique : sommet et côtés.",
      "Les deux demi-droites qui forment l’angle sont les côtés de l’angle.",
      "On les appelle les côtés de l’angle."
    ),
    tags: ["cm2", "angle", "reconnaitre", "vocabulaire", "qcm", "canvas"],
    canvas: {
      kind: "angle",
      angle: {
        angleDeg: 45,
        labels: {
          vertex: "S",
          left: "A",
          right: "B",
          angle: "",
        },
        display: {
          showLabels: true,
          showMeasure: false,
          showArc: true,
          showRightAngle: false,
          placeholder: "",
        },
      },
    },
  },

  {
    kind: "fixed",
    id: "cm2_angle_reconnaitre_fixed_4_erreur",
    niveau: "cm2",
    matiere: "maths",
    notionId: "angle",
    microId: "angle_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Un élève dit : “Un angle, c’est seulement une longueur.” A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Un angle mesure une ouverture, pas une longueur.",
    explanation: exp(
      "Un angle mesure une ouverture.",
      "On distingue une longueur, qui se mesure en cm ou en m, et un angle, qui dit une ouverture.",
      "Une longueur mesure un segment. Un angle mesure l’ouverture entre deux demi-droites.",
      "L’élève a tort."
    ),
    tags: ["cm2", "angle", "reconnaitre", "erreur", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_angle_reconnaitre_fixed_5_vie_quotidienne",
    niveau: "cm2",
    matiere: "maths",
    notionId: "angle",
    microId: "angle_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Dans quelle situation voit-on facilement un angle ?",
    format: "qcm",
    choices: [
      "l’ouverture d’une porte",
      "la masse d’un cartable",
      "la contenance d’une bouteille",
      "la température d’un four",
    ],
    expected: ["l’ouverture d’une porte"],
    comparator: "mcq_exact",
    hint: "Quand une porte s’ouvre, on voit une ouverture.",
    explanation: exp(
      "Un angle représente une ouverture.",
      "On cherche une situation où une ouverture apparaît.",
      "Quand une porte s’ouvre, elle forme une ouverture avec le mur.",
      "L’ouverture d’une porte permet de voir un angle."
    ),
    tags: ["cm2", "angle", "reconnaitre", "vie_quotidienne", "qcm"],
  },

  // Les gabarits de cette micro : angle-reconnaitre.bank.ts (05/11/2026).
  ...anglesReconnaitre("cm2"),

  // ============================================================
  // ANGLE_DROIT
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_angle_droit_fixed_1_mesure",
    niveau: "cm2",
    matiere: "maths",
    notionId: "angle",
    microId: "angle_droit",
    difficulty: 1,
    theme: "neutral",
    text: "Un angle droit mesure combien de degrés ?",
    format: "qcm",
    choices: ["45°", "90°", "120°", "180°"],
    expected: ["90°"],
    comparator: "mcq_exact",
    hint: "Le coin d’un carré ou d’un rectangle est un angle droit.",
    explanation: exp(
      "Un angle droit est un angle de référence.",
      "On connaît sa mesure par cœur.",
      "Un angle droit mesure 90 degrés.",
      "Un angle droit mesure 90°."
    ),
    tags: ["cm2", "angle", "angle_droit", "qcm", "canvas"],
    canvas: {
      kind: "angle",
      angle: {
        angleDeg: 90,
        labels: {
          vertex: "O",
          left: "A",
          right: "B",
          angle: "90°",
        },
        display: {
          showLabels: true,
          showMeasure: false,
          showArc: true,
          showRightAngle: true,
          placeholder: "",
        },
      },
    },
  },






    // ============================================================
  // ANGLE_TYPE
  // ============================================================












    // ============================================================
  // ANGLE_MESURER
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_angle_mesurer_fixed_1_instrument",
    niveau: "cm2",
    matiere: "maths",
    notionId: "angle",
    microId: "angle_mesurer",
    difficulty: 1,
    theme: "neutral",
    text: "Avec quel instrument mesure-t-on un angle ?",
    format: "qcm",
    choices: ["un rapporteur", "une règle", "un compas", "une balance"],
    expected: ["un rapporteur"],
    comparator: "mcq_exact",
    hint: "C’est l’instrument gradué en degrés.",
    explanation: exp(
      "Un angle se mesure en degrés.",
      "Pour mesurer un angle, on utilise l’instrument adapté.",
      "Le rapporteur est gradué en degrés.",
      "On mesure un angle avec un rapporteur."
    ),
    tags: ["cm2", "angle", "mesurer", "rapporteur", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_angle_mesurer_fixed_2_unite",
    niveau: "cm2",
    matiere: "maths",
    notionId: "angle",
    microId: "angle_mesurer",
    difficulty: 1,
    theme: "neutral",
    text: "En quelle unité mesure-t-on un angle ?",
    format: "qcm",
    choices: ["en degrés", "en centimètres", "en litres", "en kilogrammes"],
    expected: ["en degrés"],
    comparator: "mcq_exact",
    hint: "On écrit souvent cette unité avec le symbole °.",
    explanation: exp(
      "Un angle mesure une ouverture.",
      "On utilise une unité adaptée aux ouvertures.",
      "Les angles se mesurent en degrés, notés °.",
      "On mesure un angle en degrés."
    ),
    tags: ["cm2", "angle", "mesurer", "unite", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_angle_mesurer_fixed_3_lire_mesure",
    niveau: "cm2",
    matiere: "maths",
    notionId: "angle",
    microId: "angle_mesurer",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la mesure de l’angle représenté ?",
    format: "qcm",
    choices: ["60°", "90°", "120°", "30°"],
    expected: ["60°"],
    comparator: "mcq_exact",
    hint: "Regarde la mesure indiquée sur la figure.",
    explanation: exp(
      "Mesurer un angle, c’est donner son ouverture en degrés.",
      "Ici, la mesure est indiquée sur la figure.",
      "L’angle représenté mesure 60°.",
      "La bonne réponse est 60°."
    ),
    tags: ["cm2", "angle", "mesurer", "lecture", "qcm", "canvas"],
    canvas: {
      kind: "angle",
      angle: {
        angleDeg: 60,
        labels: {
          vertex: "O",
          left: "A",
          right: "B",
          angle: "60°",
        },
        display: {
          showLabels: true,
          showMeasure: true,
          showArc: true,
          showRightAngle: false,
          placeholder: "",
        },
      },
    },
  },

  {
    kind: "fixed",
    id: "cm2_angle_mesurer_fixed_4_mesure_cachee",
    niveau: "cm2",
    matiere: "maths",
    notionId: "angle",
    microId: "angle_mesurer",
    difficulty: 2,
    theme: "neutral",
    text: "L’angle représenté mesure 45°. Quelle mesure faut-il écrire ?",
    format: "qcm",
    choices: ["45°", "90°", "120°", "180°"],
    expected: ["45°"],
    comparator: "mcq_exact",
    hint: "La mesure annoncée dans la question est 45°.",
    explanation: exp(
      "La mesure d’un angle s’écrit en degrés.",
      "On identifie la valeur indiquée dans la question.",
      "L’angle mesure 45°.",
      "Il faut écrire 45°."
    ),
    tags: ["cm2", "angle", "mesurer", "mesure_cachee", "qcm", "canvas"],
    canvas: {
      kind: "angle",
      angle: {
        angleDeg: 45,
        labels: {
          vertex: "O",
          left: "A",
          right: "B",
          angle: "?",
        },
        display: {
          showLabels: true,
          showMeasure: false,
          showArc: true,
          showRightAngle: false,
          placeholder: "?",
        },
      },
    },
  },

  {
    kind: "fixed",
    id: "cm2_angle_mesurer_fixed_5_piege_unite",
    niveau: "cm2",
    matiere: "maths",
    notionId: "angle",
    microId: "angle_mesurer",
    difficulty: 2,
    theme: "neutral",
    text: "Un élève écrit : “un angle mesure 70 cm”. Est-ce correct ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Les angles ne se mesurent pas en centimètres.",
    explanation: exp(
      "Un angle mesure une ouverture.",
      "On vérifie l’unité utilisée.",
      "Le centimètre mesure une longueur. Un angle se mesure en degrés.",
      "L’écriture “70 cm” n’est pas correcte pour un angle."
    ),
    tags: ["cm2", "angle", "mesurer", "unite", "erreur", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_angle_mesurer_fixed_6_rapporteur",
    niveau: "cm2",
    matiere: "maths",
    notionId: "angle",
    microId: "angle_mesurer",
    difficulty: 3,
    theme: "neutral",
    text: "Pour mesurer correctement un angle avec un rapporteur, on place le centre du rapporteur...",
    format: "qcm",
    choices: [
      "sur le sommet de l’angle",
      "au milieu de la feuille",
      "sur une extrémité au hasard",
      "sur le nombre 90",
    ],
    expected: ["sur le sommet de l’angle"],
    comparator: "mcq_exact",
    hint: "Le sommet est le point commun aux deux côtés de l’angle.",
    explanation: exp(
      "Le rapporteur sert à mesurer une ouverture à partir du sommet de l’angle.",
      "On place le centre du rapporteur sur le sommet.",
      "Ensuite, on aligne un côté de l’angle avec le zéro du rapporteur.",
      "Le centre du rapporteur se place sur le sommet de l’angle."
    ),
    tags: ["cm2", "angle", "mesurer", "rapporteur", "methode", "qcm"],
  },

  {
    kind: "template",
    id: "cm2_angle_mesurer_tpl_1_lire_mesure",
    niveau: "cm2",
    matiere: "maths",
    notionId: "angle",
    microId: "angle_mesurer",
    difficulty: 2,
    theme: "neutral",
    hint: "Lis la mesure écrite dans l’angle.",
    tags: ["cm2", "angle", "mesurer", "template", "qcm", "canvas"],
    generate: () => {
      const angleDeg = randomChoice([30, 45, 60, 75, 90, 100, 120, 150]);

      return {
        text: "Quelle est la mesure de l’angle représenté ?",
        format: "qcm",
        choices: makeChoices(`${angleDeg}°`, [
          `${Math.max(10, angleDeg - 15)}°`,
          `${angleDeg + 15}°`,
          angleDeg === 90 ? "60°" : "90°",
        ]),
        expected: [`${angleDeg}°`],
        comparator: "mcq_exact",
        explanation: exp(
          "La mesure d’un angle s’exprime en degrés.",
          "On lit la mesure indiquée sur la figure.",
          `La figure indique ${angleDeg}°.`,
          `L’angle mesure ${angleDeg}°.`
        ),
        canvas: {
          kind: "angle",
          angle: {
            angleDeg,
            labels: {
              vertex: "O",
              left: "A",
              right: "B",
              angle: `${angleDeg}°`,
            },
            display: {
              showLabels: true,
              showMeasure: true,
              showArc: true,
              showRightAngle: angleDeg === 90,
              placeholder: "",
            },
          },
        },
      };
    },
  },

  {
    kind: "template",
    id: "cm2_angle_mesurer_tpl_2_mesure_cachee",
    niveau: "cm2",
    matiere: "maths",
    notionId: "angle",
    microId: "angle_mesurer",
    difficulty: 3,
    theme: "neutral",
    hint: "La question donne la mesure à écrire.",
    tags: ["cm2", "angle", "mesurer", "mesure_cachee", "template", "canvas"],
    generate: () => {
      const angleDeg = randomChoice([35, 50, 65, 80, 95, 110, 125]);

      return {
        text: `L’angle représenté mesure ${angleDeg}°. Quelle mesure faut-il écrire à la place du point d’interrogation ?`,
        format: "qcm",
        choices: makeChoices(`${angleDeg}°`, [
          `${angleDeg + 10}°`,
          `${Math.max(5, angleDeg - 10)}°`,
          "90°",
        ]),
        expected: [`${angleDeg}°`],
        comparator: "mcq_exact",
        explanation: exp(
          "Une mesure d’angle s’écrit en degrés.",
          "On reporte la mesure donnée dans l’énoncé.",
          `L’énoncé indique que l’angle mesure ${angleDeg}°.`,
          `Il faut écrire ${angleDeg}°.`
        ),
        canvas: {
          kind: "angle",
          angle: {
            angleDeg,
            labels: {
              vertex: "O",
              left: "A",
              right: "B",
              angle: "?",
            },
            display: {
              showLabels: true,
              showMeasure: false,
              showArc: true,
              showRightAngle: angleDeg === 90,
              placeholder: "?",
            },
          },
        },
      };
    },
  },

  {
    kind: "template",
    id: "cm2_angle_mesurer_tpl_3_instrument",
    niveau: "cm2",
    matiere: "maths",
    notionId: "angle",
    microId: "angle_mesurer",
    difficulty: 1,
    theme: "neutral",
    hint: "L’instrument gradué en degrés sert à mesurer les angles.",
    tags: ["cm2", "angle", "mesurer", "instrument", "template"],
    generate: () => {
      return {
        text: "Quel instrument utilise-t-on pour mesurer précisément un angle ?",
        format: "qcm",
        choices: shuffle(["un rapporteur", "une règle", "un compas", "une balance"]),
        expected: ["un rapporteur"],
        comparator: "mcq_exact",
        explanation: exp(
          "Un angle se mesure en degrés.",
          "On choisit l’instrument adapté à cette mesure.",
          "Le rapporteur est gradué en degrés.",
          "On mesure un angle avec un rapporteur."
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_angle_mesurer_tpl_4_unite",
    niveau: "cm2",
    matiere: "maths",
    notionId: "angle",
    microId: "angle_mesurer",
    difficulty: 1,
    theme: "neutral",
    hint: "Le symbole est °.",
    tags: ["cm2", "angle", "mesurer", "unite", "template"],
    generate: () => {
      return {
        text: "Quelle unité utilise-t-on pour mesurer un angle ?",
        format: "qcm",
        choices: shuffle(["le degré", "le centimètre", "le litre", "le gramme"]),
        expected: ["le degré"],
        comparator: "mcq_exact",
        explanation: exp(
          "Un angle mesure une ouverture.",
          "On utilise une unité adaptée aux ouvertures.",
          "Cette unité est le degré, noté °.",
          "Un angle se mesure en degrés."
        ),
      };
    },
  },

  // ============================================================
  // ANGLE_DEFI
  // ============================================================








  ...anglesRepereDroit("cm2"),
];
