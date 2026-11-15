// lib/tutor-v4/question-banks/maths/cm2/angles.bank.ts

import { anglesReconnaitre } from "@/lib/tutor-v4/questionBank/cm2/maths/angle-reconnaitre.bank";
import { anglesRepereDroit } from "@/lib/tutor-v4/questionBank/cm2/maths/angles-repere-droit.bank";
import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { melangeEnPlace } from "@/lib/tutor-v4/questionBank/melange";
import { angleMesurerGabarits } from "./angles-cm2-outils";

function shuffle<T>(arr: T[]): T[] {
  return melangeEnPlace([...arr]);
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

  // Mesurer au rapporteur, classer, estimer, additionner (15/11/2026) : angles-cm2-outils.ts.
  ...angleMesurerGabarits,

  // ============================================================
  // ANGLE_DEFI
  // ============================================================








  ...anglesRepereDroit("cm2"),
];
