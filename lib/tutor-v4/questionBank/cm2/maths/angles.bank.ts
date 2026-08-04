// lib/tutor-v4/question-banks/maths/cm2/angles.bank.ts

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
      "On distingue une longueur, qui se mesure en cm ou en m, et un angle, qui se mesure en degrés.",
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

  {
    kind: "template",
    id: "cm2_angle_reconnaitre_tpl_1_definition",
    niveau: "cm2",
    matiere: "maths",
    notionId: "angle",
    microId: "angle_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    hint: "Un angle a deux côtés et un sommet.",
    tags: ["cm2", "angle", "reconnaitre", "template", "qcm", "canvas"],
    generate: () => {
      const angleDeg = randomChoice([35, 45, 60, 75, 110]);

      return {
        text: "Un angle est formé par...",
        format: "qcm",
        choices: shuffle([
          "deux demi-droites de même origine",
          "trois droites parallèles",
          "un cercle et un segment",
          "deux points isolés",
        ]),
        expected: ["deux demi-droites de même origine"],
        comparator: "mcq_exact",
        explanation: exp(
          "Un angle mesure l’ouverture entre deux demi-droites.",
          "On repère les deux côtés et leur origine commune.",
          "Deux demi-droites de même origine forment un angle.",
          "Un angle est formé par deux demi-droites de même origine."
        ),
        canvas: {
          kind: "angle",
          angle: {
            angleDeg,
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
    id: "cm2_angle_reconnaitre_tpl_2_sommet",
    niveau: "cm2",
    matiere: "maths",
    notionId: "angle",
    microId: "angle_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    hint: "Le sommet est le point commun aux deux côtés.",
    tags: ["cm2", "angle", "reconnaitre", "sommet", "template", "canvas"],
    generate: () => {
      const vertex = randomChoice(["O", "S", "A"]);
      const angleDeg = randomChoice([40, 65, 80, 100, 120]);

      return {
        text: `Sur la figure, le sommet de l’angle est le point ${vertex}. Vrai ou faux ?`,
        format: "qcm",
        choices: ["vrai", "faux"],
        expected: ["vrai"],
        comparator: "mcq_exact",
        explanation: exp(
          "Le sommet d’un angle est le point commun aux deux côtés.",
          "On regarde le point d’où partent les deux demi-droites.",
          `Sur la figure, les deux côtés partent du point ${vertex}.`,
          `Le sommet est bien le point ${vertex}.`
        ),
        canvas: {
          kind: "angle",
          angle: {
            angleDeg,
            labels: {
              vertex,
              left: "B",
              right: "C",
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
      };
    },
  },

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

  {
    kind: "fixed",
    id: "cm2_angle_droit_fixed_2_coin_rectangle",
    niveau: "cm2",
    matiere: "maths",
    notionId: "angle",
    microId: "angle_droit",
    difficulty: 1,
    theme: "neutral",
    text: "Le coin d’un rectangle est généralement...",
    format: "qcm",
    choices: ["un angle droit", "un angle plat", "un angle nul", "un angle de 45°"],
    expected: ["un angle droit"],
    comparator: "mcq_exact",
    hint: "Tous les coins d’un rectangle sont droits.",
    explanation: exp(
      "Un rectangle possède quatre angles droits.",
      "On utilise cette propriété pour reconnaître les angles droits.",
      "Chaque coin d’un rectangle mesure 90°.",
      "Le coin d’un rectangle est un angle droit."
    ),
    tags: ["cm2", "angle", "angle_droit", "rectangle", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_angle_droit_fixed_3_reconnaitre_canvas",
    niveau: "cm2",
    matiere: "maths",
    notionId: "angle",
    microId: "angle_droit",
    difficulty: 2,
    theme: "neutral",
    text: "L’angle représenté est-il un angle droit ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Le petit carré rouge indique un angle droit.",
    explanation: exp(
      "Un angle droit mesure 90°.",
      "On peut le reconnaître grâce au codage en petit carré.",
      "Sur la figure, l’angle est codé comme un angle droit.",
      "Oui, l’angle représenté est un angle droit."
    ),
    tags: ["cm2", "angle", "angle_droit", "reconnaitre", "qcm", "canvas"],
    canvas: {
      kind: "angle",
      angle: {
        angleDeg: 90,
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
          showRightAngle: true,
          placeholder: "",
        },
      },
    },
  },

  {
    kind: "fixed",
    id: "cm2_angle_droit_fixed_4_piege",
    niveau: "cm2",
    matiere: "maths",
    notionId: "angle",
    microId: "angle_droit",
    difficulty: 2,
    theme: "neutral",
    text: "Un angle de 80° est-il un angle droit ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Un angle droit mesure exactement 90°.",
    explanation: exp(
      "Un angle droit mesure exactement 90°.",
      "On compare la mesure proposée avec 90°.",
      "80° est plus petit que 90°.",
      "Un angle de 80° n’est pas un angle droit."
    ),
    tags: ["cm2", "angle", "angle_droit", "piege", "qcm"],
    canvas: {
      kind: "angle",
      angle: {
        angleDeg: 80,
        labels: {
          vertex: "O",
          left: "A",
          right: "B",
          angle: "80°",
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
    id: "cm2_angle_droit_fixed_5_vie_quotidienne",
    niveau: "cm2",
    matiere: "maths",
    notionId: "angle",
    microId: "angle_droit",
    difficulty: 2,
    theme: "neutral",
    text: "Quel objet aide à vérifier si un angle est droit ?",
    format: "qcm",
    choices: ["une équerre", "une balance", "un verre doseur", "un chronomètre"],
    expected: ["une équerre"],
    comparator: "mcq_exact",
    hint: "L’équerre possède un angle droit.",
    explanation: exp(
      "Un angle droit mesure 90°.",
      "Pour le vérifier, on peut utiliser un objet qui possède un angle droit.",
      "Une équerre possède un angle droit et permet de vérifier les angles droits.",
      "L’objet utile est une équerre."
    ),
    tags: ["cm2", "angle", "angle_droit", "equerre", "vie_quotidienne", "qcm"],
  },

  {
    kind: "template",
    id: "cm2_angle_droit_tpl_1_reconnaitre_mesure",
    niveau: "cm2",
    matiere: "maths",
    notionId: "angle",
    microId: "angle_droit",
    difficulty: 2,
    theme: "neutral",
    hint: "Un angle droit mesure exactement 90°.",
    tags: ["cm2", "angle", "angle_droit", "template", "qcm", "canvas"],
    generate: () => {
      const angleDeg = randomChoice([60, 75, 90, 105, 120]);
      const isRight = angleDeg === 90;

      return {
        text: `Un angle de ${angleDeg}° est-il un angle droit ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: [isRight ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation: exp(
          "Un angle droit mesure 90°.",
          "On compare la mesure de l’angle avec 90°.",
          `${angleDeg}° ${isRight ? "est égal" : "n’est pas égal"} à 90°.`,
          isRight
            ? "C’est un angle droit."
            : "Ce n’est pas un angle droit."
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
              showRightAngle: isRight,
              placeholder: "",
            },
          },
        },
      };
    },
  },

  {
    kind: "template",
    id: "cm2_angle_droit_tpl_2_choisir_mesure",
    niveau: "cm2",
    matiere: "maths",
    notionId: "angle",
    microId: "angle_droit",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche 90°.",
    tags: ["cm2", "angle", "angle_droit", "template", "qcm"],
    generate: () => {
      return {
        text: "Choisis la mesure d’un angle droit.",
        format: "qcm",
        choices: shuffle(["45°", "60°", "90°", "180°"]),
        expected: ["90°"],
        comparator: "mcq_exact",
        explanation: exp(
          "Un angle droit est un angle de référence.",
          "Il faut connaître sa mesure.",
          "Un angle droit mesure exactement 90°.",
          "La bonne réponse est 90°."
        ),
      };
    },
  },
    // ============================================================
  // ANGLE_TYPE
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_angle_type_fixed_1_aigu",
    niveau: "cm2",
    matiere: "maths",
    notionId: "angle",
    microId: "angle_type",
    difficulty: 2,
    theme: "neutral",
    text: "Un angle plus petit qu’un angle droit est appelé...",
    format: "qcm",
    choices: ["un angle aigu", "un angle obtus", "un angle plat", "un angle droit"],
    expected: ["un angle aigu"],
    comparator: "mcq_exact",
    hint: "Un angle aigu est plus petit que 90°.",
    explanation: exp(
      "Un angle aigu est un angle plus petit qu’un angle droit.",
      "On compare l’angle avec 90°.",
      "Un angle plus petit que 90° est aigu.",
      "La bonne réponse est : un angle aigu."
    ),
    tags: ["cm2", "angle", "type", "aigu", "qcm"],
    canvas: {
      kind: "angle",
      angle: {
        angleDeg: 45,
        labels: {
          vertex: "O",
          left: "A",
          right: "B",
          angle: "45°",
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
    id: "cm2_angle_type_fixed_2_obtus",
    niveau: "cm2",
    matiere: "maths",
    notionId: "angle",
    microId: "angle_type",
    difficulty: 2,
    theme: "neutral",
    text: "Un angle plus grand qu’un angle droit et plus petit qu’un angle plat est appelé...",
    format: "qcm",
    choices: ["un angle obtus", "un angle aigu", "un angle droit", "un angle nul"],
    expected: ["un angle obtus"],
    comparator: "mcq_exact",
    hint: "Un angle obtus est plus grand que 90°.",
    explanation: exp(
      "Un angle obtus est plus grand qu’un angle droit et plus petit qu’un angle plat.",
      "On compare l’angle avec 90° et 180°.",
      "Un angle entre 90° et 180° est obtus.",
      "La bonne réponse est : un angle obtus."
    ),
    tags: ["cm2", "angle", "type", "obtus", "qcm"],
    canvas: {
      kind: "angle",
      angle: {
        angleDeg: 120,
        labels: {
          vertex: "O",
          left: "A",
          right: "B",
          angle: "120°",
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
    id: "cm2_angle_type_fixed_3_droit",
    niveau: "cm2",
    matiere: "maths",
    notionId: "angle",
    microId: "angle_type",
    difficulty: 2,
    theme: "neutral",
    text: "Un angle de 90° est...",
    format: "qcm",
    choices: ["un angle droit", "un angle aigu", "un angle obtus", "un angle plat"],
    expected: ["un angle droit"],
    comparator: "mcq_exact",
    hint: "90° correspond à l’angle droit.",
    explanation: exp(
      "Un angle droit est un angle qui mesure 90°.",
      "On compare la mesure donnée avec les angles de référence.",
      "90° correspond exactement à un angle droit.",
      "Un angle de 90° est un angle droit."
    ),
    tags: ["cm2", "angle", "type", "droit", "qcm", "canvas"],
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

  {
    kind: "fixed",
    id: "cm2_angle_type_fixed_4_plat",
    niveau: "cm2",
    matiere: "maths",
    notionId: "angle",
    microId: "angle_type",
    difficulty: 3,
    theme: "neutral",
    text: "Un angle plat mesure...",
    format: "qcm",
    choices: ["180°", "90°", "45°", "120°"],
    expected: ["180°"],
    comparator: "mcq_exact",
    hint: "Un angle plat forme une ligne droite.",
    explanation: exp(
      "Un angle plat forme une ligne droite.",
      "On connaît sa mesure comme angle de référence.",
      "Un angle plat mesure 180°.",
      "La bonne réponse est 180°."
    ),
    tags: ["cm2", "angle", "type", "plat", "qcm"],
    canvas: {
      kind: "angle",
      angle: {
        angleDeg: 180,
        labels: {
          vertex: "O",
          left: "A",
          right: "B",
          angle: "180°",
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
    id: "cm2_angle_type_fixed_5_identifier_aigu",
    niveau: "cm2",
    matiere: "maths",
    notionId: "angle",
    microId: "angle_type",
    difficulty: 2,
    theme: "neutral",
    text: "L’angle représenté est de 60°. Quel est son type ?",
    format: "qcm",
    choices: ["aigu", "droit", "obtus", "plat"],
    expected: ["aigu"],
    comparator: "mcq_exact",
    hint: "60° est plus petit que 90°.",
    explanation: exp(
      "Un angle aigu est plus petit qu’un angle droit.",
      "On compare 60° avec 90°.",
      "60° < 90°.",
      "L’angle est aigu."
    ),
    tags: ["cm2", "angle", "type", "aigu", "qcm", "canvas"],
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
    id: "cm2_angle_type_fixed_6_identifier_obtus",
    niveau: "cm2",
    matiere: "maths",
    notionId: "angle",
    microId: "angle_type",
    difficulty: 2,
    theme: "neutral",
    text: "L’angle représenté est de 130°. Quel est son type ?",
    format: "qcm",
    choices: ["obtus", "aigu", "droit", "plat"],
    expected: ["obtus"],
    comparator: "mcq_exact",
    hint: "130° est plus grand que 90° et plus petit que 180°.",
    explanation: exp(
      "Un angle obtus est plus grand qu’un angle droit et plus petit qu’un angle plat.",
      "On compare 130° avec 90° et 180°.",
      "90° < 130° < 180°.",
      "L’angle est obtus."
    ),
    tags: ["cm2", "angle", "type", "obtus", "qcm", "canvas"],
    canvas: {
      kind: "angle",
      angle: {
        angleDeg: 130,
        labels: {
          vertex: "O",
          left: "A",
          right: "B",
          angle: "130°",
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
    id: "cm2_angle_type_fixed_7_piege_90",
    niveau: "cm2",
    matiere: "maths",
    notionId: "angle",
    microId: "angle_type",
    difficulty: 3,
    theme: "neutral",
    text: "Un angle de 90° est-il aigu ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Un angle aigu est strictement plus petit que 90°.",
    explanation: exp(
      "Un angle aigu est strictement plus petit qu’un angle droit.",
      "On compare 90° avec 90°.",
      "90° n’est pas plus petit que 90° : c’est exactement un angle droit.",
      "Un angle de 90° n’est pas aigu."
    ),
    tags: ["cm2", "angle", "type", "piege", "aigu", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_angle_type_fixed_8_vie_quotidienne",
    niveau: "cm2",
    matiere: "maths",
    notionId: "angle",
    microId: "angle_type",
    difficulty: 3,
    theme: "neutral",
    text: "Une porte très peu ouverte forme plutôt...",
    format: "qcm",
    choices: ["un angle aigu", "un angle obtus", "un angle plat", "un angle de 180°"],
    expected: ["un angle aigu"],
    comparator: "mcq_exact",
    hint: "Très peu ouverte : l’ouverture est petite.",
    explanation: exp(
      "Un angle aigu correspond à une petite ouverture, plus petite qu’un angle droit.",
      "On observe la situation de vie quotidienne.",
      "Une porte très peu ouverte forme une petite ouverture.",
      "Elle forme plutôt un angle aigu."
    ),
    tags: ["cm2", "angle", "type", "vie_quotidienne", "porte", "qcm"],
  },

  {
    kind: "template",
    id: "cm2_angle_type_tpl_1_identifier",
    niveau: "cm2",
    matiere: "maths",
    notionId: "angle",
    microId: "angle_type",
    difficulty: 2,
    theme: "neutral",
    hint: "Compare la mesure avec 90° et 180°.",
    tags: ["cm2", "angle", "type", "template", "qcm", "canvas"],
    generate: () => {
      const angleDeg = randomChoice([30, 45, 60, 90, 110, 120, 150, 180]);

      const correct =
        angleDeg < 90
          ? "aigu"
          : angleDeg === 90
            ? "droit"
            : angleDeg === 180
              ? "plat"
              : "obtus";

      return {
        text: `L’angle mesure ${angleDeg}°. Quel est son type ?`,
        format: "qcm",
        choices: shuffle(["aigu", "droit", "obtus", "plat"]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On classe les angles grâce aux angles de référence.",
          "On compare la mesure avec 90° et 180°.",
          angleDeg < 90
            ? `${angleDeg}° est plus petit que 90°.`
            : angleDeg === 90
              ? `${angleDeg}° est exactement égal à 90°.`
              : angleDeg === 180
                ? `${angleDeg}° est exactement égal à 180°.`
                : `${angleDeg}° est plus grand que 90° et plus petit que 180°.`,
          `L’angle est ${correct}.`
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
    id: "cm2_angle_type_tpl_2_plus_petit_droit",
    niveau: "cm2",
    matiere: "maths",
    notionId: "angle",
    microId: "angle_type",
    difficulty: 2,
    theme: "neutral",
    hint: "Un angle plus petit que l’angle droit est aigu.",
    tags: ["cm2", "angle", "type", "aigu", "template"],
    generate: () => {
      const angleDeg = randomChoice([25, 35, 45, 55, 70, 80]);

      return {
        text: `Un angle de ${angleDeg}° est-il aigu, droit ou obtus ?`,
        format: "qcm",
        choices: shuffle(["aigu", "droit", "obtus"]),
        expected: ["aigu"],
        comparator: "mcq_exact",
        explanation: exp(
          "Un angle aigu est plus petit qu’un angle droit.",
          "On compare la mesure avec 90°.",
          `${angleDeg}° est plus petit que 90°.`,
          "L’angle est aigu."
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
              showRightAngle: false,
              placeholder: "",
            },
          },
        },
      };
    },
  },

  {
    kind: "template",
    id: "cm2_angle_type_tpl_3_plus_grand_droit",
    niveau: "cm2",
    matiere: "maths",
    notionId: "angle",
    microId: "angle_type",
    difficulty: 2,
    theme: "neutral",
    hint: "Un angle plus grand que l’angle droit et plus petit que l’angle plat est obtus.",
    tags: ["cm2", "angle", "type", "obtus", "template"],
    generate: () => {
      const angleDeg = randomChoice([100, 110, 120, 130, 140, 150]);

      return {
        text: `Un angle de ${angleDeg}° est-il aigu, droit ou obtus ?`,
        format: "qcm",
        choices: shuffle(["aigu", "droit", "obtus"]),
        expected: ["obtus"],
        comparator: "mcq_exact",
        explanation: exp(
          "Un angle obtus est plus grand qu’un angle droit et plus petit qu’un angle plat.",
          "On compare la mesure avec 90° et 180°.",
          `${angleDeg}° est plus grand que 90° et plus petit que 180°.`,
          "L’angle est obtus."
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
              showRightAngle: false,
              placeholder: "",
            },
          },
        },
      };
    },
  },

  {
    kind: "template",
    id: "cm2_angle_type_tpl_4_vocabulaire",
    niveau: "cm2",
    matiere: "maths",
    notionId: "angle",
    microId: "angle_type",
    difficulty: 3,
    theme: "neutral",
    hint: "Aigu : plus petit que 90°. Obtus : entre 90° et 180°.",
    tags: ["cm2", "angle", "type", "vocabulaire", "template"],
    generate: () => {
      const item = randomChoice([
        {
          text: "Comment appelle-t-on un angle plus petit qu’un angle droit ?",
          expected: "un angle aigu",
          wrongs: ["un angle obtus", "un angle plat", "un angle de 180°"],
          conclusion: "On l’appelle un angle aigu.",
        },
        {
          text: "Comment appelle-t-on un angle plus grand qu’un angle droit mais plus petit qu’un angle plat ?",
          expected: "un angle obtus",
          wrongs: ["un angle aigu", "un angle droit", "un angle nul"],
          conclusion: "On l’appelle un angle obtus.",
        },
        {
          text: "Comment appelle-t-on un angle de 180° ?",
          expected: "un angle plat",
          wrongs: ["un angle aigu", "un angle droit", "un angle obtus"],
          conclusion: "On l’appelle un angle plat.",
        },
      ]);

      return {
        text: item.text,
        format: "qcm",
        choices: makeChoices(item.expected, item.wrongs),
        expected: [item.expected],
        comparator: "mcq_exact",
        explanation: exp(
          "Les angles se classent selon leur ouverture.",
          "On compare l’angle avec les angles de référence : 90° et 180°.",
          item.conclusion,
          item.conclusion
        ),
      };
    },
  },
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

  {
    kind: "fixed",
    id: "cm2_angle_defi_fixed_1_comparer_droit",
    niveau: "cm2",
    matiere: "maths",
    notionId: "angle",
    microId: "angle_defi",
    difficulty: 3,
    theme: "neutral",
    text: "Un angle de 100° est-il plus petit, égal ou plus grand qu’un angle droit ?",
    format: "qcm",
    choices: ["plus petit", "égal", "plus grand"],
    expected: ["plus grand"],
    comparator: "mcq_exact",
    hint: "Un angle droit mesure 90°.",
    explanation: exp(
      "Un angle droit mesure 90°.",
      "On compare 100° avec 90°.",
      "100° est plus grand que 90°.",
      "Un angle de 100° est plus grand qu’un angle droit."
    ),
    tags: ["cm2", "angle", "defi", "comparer", "angle_droit", "qcm"],
    canvas: {
      kind: "angle",
      angle: {
        angleDeg: 100,
        labels: {
          vertex: "O",
          left: "A",
          right: "B",
          angle: "100°",
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
    id: "cm2_angle_defi_fixed_2_proche_droit",
    niveau: "cm2",
    matiere: "maths",
    notionId: "angle",
    microId: "angle_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Parmi 80°, 90°, 120° et 45°, quel angle est exactement un angle droit ?",
    format: "qcm",
    choices: ["80°", "90°", "120°", "45°"],
    expected: ["90°"],
    comparator: "mcq_exact",
    hint: "Un angle droit mesure exactement 90°.",
    explanation: exp(
      "Un angle droit est un angle de référence.",
      "On cherche la mesure exacte de l’angle droit.",
      "Un angle droit mesure 90°.",
      "L’angle exactement droit est 90°."
    ),
    tags: ["cm2", "angle", "defi", "angle_droit", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_angle_defi_fixed_3_porte",
    niveau: "cm2",
    matiere: "maths",
    notionId: "angle",
    microId: "angle_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Une porte est ouverte à 120°. L’ouverture est-elle plutôt aiguë, droite ou obtuse ?",
    format: "qcm",
    choices: ["aiguë", "droite", "obtuse"],
    expected: ["obtuse"],
    comparator: "mcq_exact",
    hint: "120° est plus grand que 90° et plus petit que 180°.",
    explanation: exp(
      "Un angle obtus est plus grand qu’un angle droit et plus petit qu’un angle plat.",
      "On compare 120° avec 90° et 180°.",
      "90° < 120° < 180°.",
      "L’ouverture est obtuse."
    ),
    tags: ["cm2", "angle", "defi", "vie_quotidienne", "porte", "qcm"],
    canvas: {
      kind: "angle",
      angle: {
        angleDeg: 120,
        labels: {
          vertex: "O",
          left: "Mur",
          right: "Porte",
          angle: "120°",
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
    id: "cm2_angle_defi_fixed_4_reunion",
    niveau: "cm2",
    matiere: "maths",
    notionId: "angle",
    microId: "angle_defi",
    difficulty: 4,
    theme: "reunion",
    text: "Sur un dessin de case créole, un coin de fenêtre forme un angle de 90°. Quel type d’angle est-ce ?",
    format: "qcm",
    choices: ["droit", "aigu", "obtus", "plat"],
    expected: ["droit"],
    comparator: "mcq_exact",
    hint: "90° correspond à l’angle droit.",
    explanation: exp(
      "Un angle de 90° est un angle droit.",
      "On compare la mesure avec les angles de référence.",
      "90° correspond exactement à un angle droit.",
      "C’est un angle droit."
    ),
    tags: ["cm2", "angle", "defi", "reunion", "case_creole", "qcm"],
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

  {
    kind: "fixed",
    id: "cm2_angle_defi_fixed_5_erreur_obtus",
    niveau: "cm2",
    matiere: "maths",
    notionId: "angle",
    microId: "angle_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Un élève dit : “Un angle de 95° est aigu car il est proche de 90°.” A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Un angle aigu est strictement plus petit que 90°.",
    explanation: exp(
      "Un angle aigu est plus petit qu’un angle droit.",
      "On compare 95° avec 90°.",
      "95° est plus grand que 90°, donc c’est un angle obtus.",
      "L’élève a tort."
    ),
    tags: ["cm2", "angle", "defi", "erreur", "obtus", "qcm"],
    canvas: {
      kind: "angle",
      angle: {
        angleDeg: 95,
        labels: {
          vertex: "O",
          left: "A",
          right: "B",
          angle: "95°",
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
    kind: "template",
    id: "cm2_angle_defi_tpl_1_comparer_angle_droit",
    niveau: "cm2",
    matiere: "maths",
    notionId: "angle",
    microId: "angle_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Compare la mesure avec 90°.",
    tags: ["cm2", "angle", "defi", "template", "qcm", "canvas"],
    generate: () => {
      const angleDeg = randomChoice([35, 60, 80, 90, 100, 125, 150]);

      const correct =
        angleDeg < 90 ? "plus petit" : angleDeg === 90 ? "égal" : "plus grand";

      return {
        text: `Un angle de ${angleDeg}° est-il plus petit, égal ou plus grand qu’un angle droit ?`,
        format: "qcm",
        choices: ["plus petit", "égal", "plus grand"],
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Un angle droit mesure 90°.",
          "On compare la mesure donnée avec 90°.",
          angleDeg < 90
            ? `${angleDeg}° est plus petit que 90°.`
            : angleDeg === 90
              ? `${angleDeg}° est exactement égal à 90°.`
              : `${angleDeg}° est plus grand que 90°.`,
          `L’angle est ${correct} qu’un angle droit.`
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
    id: "cm2_angle_defi_tpl_2_identifier_erreur",
    niveau: "cm2",
    matiere: "maths",
    notionId: "angle",
    microId: "angle_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Vérifie si l’angle est plus petit ou plus grand que 90°.",
    tags: ["cm2", "angle", "defi", "erreur", "template"],
    generate: () => {
      const angleDeg = randomChoice([95, 100, 110, 120, 130]);
      return {
        text: `Un élève dit : “${angleDeg}° est un angle aigu.” A-t-il raison ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: ["non"],
        comparator: "mcq_exact",
        explanation: exp(
          "Un angle aigu est plus petit qu’un angle droit.",
          "On compare la mesure avec 90°.",
          `${angleDeg}° est plus grand que 90° : ce n’est pas un angle aigu.`,
          "L’élève a tort."
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
              showRightAngle: false,
              placeholder: "",
            },
          },
        },
      };
    },
  },

  {
    kind: "template",
    id: "cm2_angle_defi_tpl_3_vie_quotidienne",
    niveau: "cm2",
    matiere: "maths",
    notionId: "angle",
    microId: "angle_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Petite ouverture : aiguë. Grande ouverture après 90° : obtuse.",
    tags: ["cm2", "angle", "defi", "vie_quotidienne", "template"],
    generate: () => {
      const item = randomChoice([
        {
          situation: "Une porte est très peu ouverte",
          angleDeg: 35,
          expected: "aiguë",
        },
        {
          situation: "Une porte est ouverte plus qu’à angle droit",
          angleDeg: 120,
          expected: "obtuse",
        },
        {
          situation: "Un coin de cahier forme un angle de 90°",
          angleDeg: 90,
          expected: "droite",
        },
      ]);

      return {
        text: `${item.situation}. L’ouverture est plutôt aiguë, droite ou obtuse ?`,
        format: "qcm",
        choices: shuffle(["aiguë", "droite", "obtuse"]),
        expected: [item.expected],
        comparator: "mcq_exact",
        explanation: exp(
          "On peut reconnaître un type d’angle dans des situations de la vie quotidienne.",
          "On compare l’ouverture avec l’angle droit.",
          item.angleDeg < 90
            ? `${item.angleDeg}° est plus petit que 90°.`
            : item.angleDeg === 90
              ? `${item.angleDeg}° est exactement égal à 90°.`
              : `${item.angleDeg}° est plus grand que 90° et plus petit que 180°.`,
          `L’ouverture est ${item.expected}.`
        ),
        canvas: {
          kind: "angle",
          angle: {
            angleDeg: item.angleDeg,
            labels: {
              vertex: "O",
              left: "A",
              right: "B",
              angle: `${item.angleDeg}°`,
            },
            display: {
              showLabels: true,
              showMeasure: true,
              showArc: true,
              showRightAngle: item.angleDeg === 90,
              placeholder: "",
            },
          },
        },
      };
    },
  },
];
