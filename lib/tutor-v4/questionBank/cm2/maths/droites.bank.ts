// lib/tutor-v4/question-banks/maths/cm2/droites.bank.ts

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffle<T>(items: T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

function makeChoices(correct: string, wrongs: readonly string[]) {
  // Jamais deux fois la même ligne. Un gabarit dont le piège coïncide avec la
  // bonne réponse (les coordonnées inversées quand x = y, un arrondi égal à la
  // valeur de départ…) affichait la même proposition deux fois, et l'élève
  // voyait deux réponses justes. Dédupliquer AVANT de couper à quatre laisse
  // aussi une chance aux distracteurs surnuméraires de prendre la place.
  return shuffle(Array.from(new Set([correct, ...wrongs]))).slice(0, 4);
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

function droitesCanvas(data: {
  lines: {
    id: string;
    type: "droite" | "segment" | "demi_droite";
    from: { x: number; y: number };
    to: { x: number; y: number };
    label?: string;
    color?: string;
    strokeWidth?: number;
    dashed?: boolean;
    display?: {
      showLabel?: boolean;
      showArrows?: boolean;
      extend?: boolean;
    };
  }[];
  points?: {
    x: number;
    y: number;
    label?: string;
    color?: string;
    highlight?: boolean;
  }[];
  intersections?: {
    x: number;
    y: number;
    label?: string;
    color?: string;
    highlight?: boolean;
  }[];
  markers?: {
    rightAngles?: {
      x: number;
      y: number;
      lineA: string;
      lineB: string;
      size?: number;
      color?: string;
    }[];
    parallels?: {
      lineA: string;
      lineB: string;
      color?: string;
      markCount?: 1 | 2;
    }[];
  };
  display?: {
    showGrid?: boolean;
    showLabels?: boolean;
    showPoints?: boolean;
    showIntersections?: boolean;
    showRightAngleMarkers?: boolean;
    showParallelMarkers?: boolean;
  };
  size?: {
    width?: number;
    height?: number;
  };
}) {
  return {
    kind: "droites" as const,
    size: data.size ?? {
      width: 340,
      height: 240,
    },
    grid: {
      show: true,
      rows: 6,
      cols: 8,
    },
    lines: data.lines,
    points: data.points ?? [],
    intersections: data.intersections ?? [],
    markers: data.markers,
    display: {
      showGrid: true,
      showLabels: true,
      showPoints: true,
      showIntersections: true,
      showRightAngleMarkers: true,
      showParallelMarkers: true,
      ...(data.display ?? {}),
    },
    colors: {
      background: "#ffffff",
      grid: "#e2e8f0",
      text: "#0f172a",
      point: "#ef4444",
      intersection: "#f97316",
      rightAngle: "#ef4444",
      parallel: "#8b5cf6",
    },
  };
}

export const droitesBank: TutorBankItemV4[] = [
  // ============================================================
  // DROITE_RECONNAITRE
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_droite_reconnaitre_fixed_1_definition_droite",
    niveau: "cm2",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    text: "Une droite est une ligne...",
    format: "qcm",
    choices: [
      "qui se prolonge sans fin des deux côtés",
      "qui s’arrête toujours à deux points",
      "qui forme toujours un carré",
      "qui mesure toujours 10 cm",
    ],
    expected: ["qui se prolonge sans fin des deux côtés"],
    comparator: "mcq_exact",
    hint: "Une droite ne s’arrête pas.",
    explanation: exp(
      "Une droite est une ligne qui se prolonge sans fin des deux côtés.",
      "On la reconnaît car elle n’a pas d’extrémité visible.",
      "Dans la figure, la droite continue dans les deux sens.",
      "Une droite se prolonge sans fin des deux côtés."
    ),
    tags: ["cm2", "droite", "reconnaitre", "definition", "qcm", "canvas"],
    canvas: droitesCanvas({
      lines: [
        {
          id: "d",
          type: "droite",
          from: { x: 70, y: 170 },
          to: { x: 270, y: 70 },
          label: "(d)",
          color: "#2563eb",
        },
      ],
      points: [
        { x: 120, y: 145, label: "A", color: "#ef4444" },
        { x: 220, y: 95, label: "B", color: "#ef4444" },
      ],
    }),
  },

  {
    kind: "fixed",
    id: "cm2_droite_reconnaitre_fixed_2_definition_segment",
    niveau: "cm2",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    text: "Un segment est une partie de droite...",
    format: "qcm",
    choices: [
      "limitée par deux extrémités",
      "qui ne finit jamais",
      "qui tourne toujours",
      "qui est toujours verticale",
    ],
    expected: ["limitée par deux extrémités"],
    comparator: "mcq_exact",
    hint: "Un segment a deux bouts.",
    explanation: exp(
      "Un segment est une partie de droite limitée par deux extrémités.",
      "On repère ses deux points de départ et d’arrivée.",
      "Le segment [AB] commence en A et se termine en B.",
      "Un segment est limité par deux extrémités."
    ),
    tags: ["cm2", "droite", "segment", "reconnaitre", "qcm", "canvas"],
    canvas: droitesCanvas({
      lines: [
        {
          id: "AB",
          type: "segment",
          from: { x: 80, y: 150 },
          to: { x: 260, y: 90 },
          label: "[AB]",
          color: "#16a34a",
        },
      ],
      points: [
        { x: 80, y: 150, label: "A", color: "#ef4444", highlight: true },
        { x: 260, y: 90, label: "B", color: "#ef4444", highlight: true },
      ],
    }),
  },

  {
    kind: "fixed",
    id: "cm2_droite_reconnaitre_fixed_3_definition_demi_droite",
    niveau: "cm2",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    text: "Une demi-droite...",
    format: "qcm",
    choices: [
      "a une origine et se prolonge dans un seul sens",
      "a deux extrémités",
      "se prolonge dans les deux sens",
      "est toujours perpendiculaire",
    ],
    expected: ["a une origine et se prolonge dans un seul sens"],
    comparator: "mcq_exact",
    hint: "Demi-droite : un départ, puis ça continue.",
    explanation: exp(
      "Une demi-droite a une origine et se prolonge dans un seul sens.",
      "On repère son point de départ puis le sens dans lequel elle continue.",
      "La demi-droite [AB) part de A et passe par B.",
      "Une demi-droite a une origine et se prolonge dans un seul sens."
    ),
    tags: ["cm2", "droite", "demi_droite", "reconnaitre", "qcm", "canvas"],
    canvas: droitesCanvas({
      lines: [
        {
          id: "AB",
          type: "demi_droite",
          from: { x: 90, y: 150 },
          to: { x: 260, y: 80 },
          label: "[AB)",
          color: "#8b5cf6",
        },
      ],
      points: [
        { x: 90, y: 150, label: "A", color: "#ef4444", highlight: true },
        { x: 190, y: 109, label: "B", color: "#f97316" },
      ],
    }),
  },

  {
    kind: "fixed",
    id: "cm2_droite_reconnaitre_fixed_4_notation_droite",
    niveau: "cm2",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "La notation (AB) désigne...",
    format: "qcm",
    choices: [
      "la droite passant par A et B",
      "le segment limité par A et B",
      "la demi-droite qui part de A",
      "l’angle AB",
    ],
    expected: ["la droite passant par A et B"],
    comparator: "mcq_exact",
    hint: "Les parenthèses désignent une droite.",
    explanation: exp(
      "La droite passant par deux points A et B se note (AB).",
      "On observe les symboles utilisés.",
      "(AB) utilise des parenthèses : cela désigne la droite.",
      "(AB) désigne la droite passant par A et B."
    ),
    tags: ["cm2", "droite", "notation", "droite", "qcm", "canvas"],
    canvas: droitesCanvas({
      lines: [
        {
          id: "AB",
          type: "droite",
          from: { x: 60, y: 170 },
          to: { x: 280, y: 80 },
          label: "(AB)",
          color: "#2563eb",
        },
      ],
      points: [
        { x: 120, y: 145, label: "A", color: "#ef4444" },
        { x: 220, y: 104, label: "B", color: "#ef4444" },
      ],
    }),
  },

  {
    kind: "fixed",
    id: "cm2_droite_reconnaitre_fixed_5_notation_segment",
    niveau: "cm2",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "La notation [AB] désigne...",
    format: "qcm",
    choices: [
      "le segment d’extrémités A et B",
      "la droite qui ne finit jamais",
      "la demi-droite d’origine A",
      "un cercle",
    ],
    expected: ["le segment d’extrémités A et B"],
    comparator: "mcq_exact",
    hint: "Les crochets désignent un segment.",
    explanation: exp(
      "Le segment d’extrémités A et B se note [AB].",
      "On observe les symboles utilisés.",
      "[AB] utilise des crochets : cela désigne un segment.",
      "[AB] désigne le segment d’extrémités A et B."
    ),
    tags: ["cm2", "droite", "segment", "notation", "qcm", "canvas"],
    canvas: droitesCanvas({
      lines: [
        {
          id: "AB",
          type: "segment",
          from: { x: 85, y: 150 },
          to: { x: 255, y: 90 },
          label: "[AB]",
          color: "#16a34a",
        },
      ],
      points: [
        { x: 85, y: 150, label: "A", color: "#ef4444", highlight: true },
        { x: 255, y: 90, label: "B", color: "#ef4444", highlight: true },
      ],
    }),
  },

  {
    kind: "fixed",
    id: "cm2_droite_reconnaitre_fixed_6_notation_demi_droite",
    niveau: "cm2",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "La notation [AB) désigne...",
    format: "qcm",
    choices: [
      "la demi-droite d’origine A passant par B",
      "le segment AB",
      "la droite AB",
      "le point A",
    ],
    expected: ["la demi-droite d’origine A passant par B"],
    comparator: "mcq_exact",
    hint: "Le crochet indique l’origine, la parenthèse indique que cela continue.",
    explanation: exp(
      "La demi-droite [AB) part de A et passe par B.",
      "On observe le crochet du côté de A et la parenthèse du côté de B.",
      "[AB) a pour origine A et se prolonge dans le sens de B.",
      "[AB) désigne la demi-droite d’origine A passant par B."
    ),
    tags: ["cm2", "droite", "demi_droite", "notation", "qcm", "canvas"],
    canvas: droitesCanvas({
      lines: [
        {
          id: "AB",
          type: "demi_droite",
          from: { x: 90, y: 160 },
          to: { x: 270, y: 85 },
          label: "[AB)",
          color: "#8b5cf6",
        },
      ],
      points: [
        { x: 90, y: 160, label: "A", color: "#ef4444", highlight: true },
        { x: 185, y: 120, label: "B", color: "#f97316" },
      ],
    }),
  },

  {
    kind: "fixed",
    id: "cm2_droite_reconnaitre_fixed_7_difference_droite_segment",
    niveau: "cm2",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la différence principale entre une droite et un segment ?",
    format: "qcm",
    choices: [
      "une droite se prolonge sans fin, un segment a deux extrémités",
      "une droite est toujours rouge",
      "un segment n’a jamais de points",
      "une droite est toujours verticale",
    ],
    expected: ["une droite se prolonge sans fin, un segment a deux extrémités"],
    comparator: "mcq_exact",
    hint: "Regarde les extrémités.",
    explanation: exp(
      "Une droite et un segment sont deux objets géométriques différents.",
      "On compare leurs extrémités.",
      "La droite ne s’arrête pas, alors que le segment est limité par deux points.",
      "Une droite se prolonge sans fin, un segment a deux extrémités."
    ),
    tags: ["cm2", "droite", "segment", "difference", "qcm", "canvas"],
    canvas: droitesCanvas({
      lines: [
        {
          id: "d",
          type: "droite",
          from: { x: 60, y: 80 },
          to: { x: 280, y: 80 },
          label: "(d)",
          color: "#2563eb",
        },
        {
          id: "AB",
          type: "segment",
          from: { x: 90, y: 160 },
          to: { x: 250, y: 160 },
          label: "[AB]",
          color: "#16a34a",
        },
      ],
      points: [
        { x: 90, y: 160, label: "A", color: "#ef4444" },
        { x: 250, y: 160, label: "B", color: "#ef4444" },
      ],
    }),
  },

  {
    kind: "fixed",
    id: "cm2_droite_reconnaitre_fixed_8_erreur_segment_droite",
    niveau: "cm2",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève dit : “Le segment [AB] continue sans fin des deux côtés.” A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Un segment a deux extrémités.",
    explanation: exp(
      "Un segment est limité par deux extrémités.",
      "On vérifie si l’objet continue ou s’arrête.",
      "Le segment [AB] commence en A et se termine en B.",
      "L’élève a tort : c’est une droite qui continue sans fin."
    ),
    tags: ["cm2", "droite", "segment", "erreur", "qcm", "canvas"],
    canvas: droitesCanvas({
      lines: [
        {
          id: "AB",
          type: "segment",
          from: { x: 80, y: 130 },
          to: { x: 260, y: 130 },
          label: "[AB]",
          color: "#16a34a",
        },
      ],
      points: [
        { x: 80, y: 130, label: "A", color: "#ef4444", highlight: true },
        { x: 260, y: 130, label: "B", color: "#ef4444", highlight: true },
      ],
    }),
  },

  {
    kind: "fixed",
    id: "cm2_droite_reconnaitre_fixed_9_intersection_vocabulaire",
    niveau: "cm2",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    text: "Le point où deux droites se coupent s’appelle...",
    format: "qcm",
    choices: [
      "un point d’intersection",
      "un périmètre",
      "une fraction",
      "un axe de symétrie",
    ],
    expected: ["un point d’intersection"],
    comparator: "mcq_exact",
    hint: "C’est le point commun aux deux droites.",
    explanation: exp(
      "Deux droites peuvent se couper en un point.",
      "On repère le point commun aux deux droites.",
      "Ici, les deux droites se coupent en O.",
      "O est un point d’intersection."
    ),
    tags: ["cm2", "droite", "intersection", "vocabulaire", "qcm", "canvas"],
    canvas: droitesCanvas({
      lines: [
        {
          id: "d1",
          type: "droite",
          from: { x: 70, y: 180 },
          to: { x: 270, y: 60 },
          label: "(d1)",
          color: "#2563eb",
        },
        {
          id: "d2",
          type: "droite",
          from: { x: 70, y: 60 },
          to: { x: 270, y: 180 },
          label: "(d2)",
          color: "#16a34a",
        },
      ],
      intersections: [
        { x: 170, y: 120, label: "O", color: "#f97316", highlight: true },
      ],
    }),
  },

  {
    kind: "fixed",
    id: "cm2_droite_reconnaitre_fixed_10_open_methode",
    niveau: "cm2",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    text: "Explique avec tes mots la différence entre une droite, un segment et une demi-droite.",
    format: "open",
    expected: ["droite", "segment", "demi", "extrémités"],
    comparator: "contains_keyword",
    hint: "Parle de ce qui s’arrête ou de ce qui continue.",
    explanation: exp(
      "Une droite, un segment et une demi-droite sont trois objets géométriques.",
      "On les distingue grâce à leurs extrémités.",
      "Une droite continue des deux côtés, un segment a deux extrémités, une demi-droite a une origine et continue dans un sens.",
      "La différence vient de la façon dont l’objet commence ou se prolonge."
    ),
    tags: ["cm2", "droite", "reconnaitre", "open", "methode"],
  },

  {
    kind: "template",
    id: "cm2_droite_reconnaitre_tpl_1_type_objet",
    niveau: "cm2",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    hint: "Observe si la figure s’arrête ou continue.",
    tags: ["cm2", "droite", "reconnaitre", "template", "qcm", "canvas"],
    generate: () => {
      const item = randomChoice([
        {
          type: "droite" as const,
          label: "(d)",
          color: "#2563eb",
          correct: "une droite",
          definition: "elle se prolonge sans fin des deux côtés",
        },
        {
          type: "segment" as const,
          label: "[AB]",
          color: "#16a34a",
          correct: "un segment",
          definition: "il est limité par deux extrémités",
        },
        {
          type: "demi_droite" as const,
          label: "[AB)",
          color: "#8b5cf6",
          correct: "une demi-droite",
          definition: "elle a une origine et se prolonge dans un seul sens",
        },
      ]);

      return {
        text: "Quel objet géométrique est représenté ?",
        format: "qcm",
        choices: makeChoices(item.correct, [
          "une droite",
          "un segment",
          "une demi-droite",
          "un angle",
        ]),
        expected: [item.correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On reconnaît un objet géométrique grâce à ses extrémités.",
          "On observe s’il se prolonge ou s’il s’arrête.",
          `Ici, ${item.definition}.`,
          `L’objet représenté est ${item.correct}.`
        ),
        canvas: droitesCanvas({
          lines: [
            {
              id: "x",
              type: item.type,
              from: { x: 85, y: 155 },
              to: { x: 260, y: 85 },
              label: item.label,
              color: item.color,
            },
          ],
          points:
            item.type === "droite"
              ? [
                  { x: 130, y: 137, label: "A", color: "#ef4444" },
                  { x: 210, y: 105, label: "B", color: "#ef4444" },
                ]
              : [
                  { x: 85, y: 155, label: "A", color: "#ef4444", highlight: true },
                  { x: 260, y: 85, label: "B", color: "#ef4444", highlight: item.type === "segment" },
                ],
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_droite_reconnaitre_tpl_2_notation",
    niveau: "cm2",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    hint: "Regarde les symboles : parenthèses, crochets ou mélange des deux.",
    tags: ["cm2", "droite", "notation", "template", "qcm", "canvas"],
    generate: () => {
      const item = randomChoice([
        {
          notation: "(AB)",
          correct: "la droite passant par A et B",
          type: "droite" as const,
          color: "#2563eb",
        },
        {
          notation: "[AB]",
          correct: "le segment d’extrémités A et B",
          type: "segment" as const,
          color: "#16a34a",
        },
        {
          notation: "[AB)",
          correct: "la demi-droite d’origine A passant par B",
          type: "demi_droite" as const,
          color: "#8b5cf6",
        },
      ]);

      return {
        text: `Que désigne la notation ${item.notation} ?`,
        format: "qcm",
        choices: makeChoices(item.correct, [
          "la droite passant par A et B",
          "le segment d’extrémités A et B",
          "la demi-droite d’origine A passant par B",
          "le point d’intersection de A et B",
        ]),
        expected: [item.correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Les notations géométriques indiquent le type d’objet.",
          "On regarde les parenthèses et les crochets.",
          `${item.notation} désigne ${item.correct}.`,
          `La bonne réponse est : ${item.correct}.`
        ),
        canvas: droitesCanvas({
          lines: [
            {
              id: "AB",
              type: item.type,
              from: { x: 85, y: 150 },
              to: { x: 255, y: 90 },
              label: item.notation,
              color: item.color,
            },
          ],
          points: [
            { x: 85, y: 150, label: "A", color: "#ef4444", highlight: item.type !== "droite" },
            { x: 255, y: 90, label: "B", color: "#ef4444", highlight: item.type === "segment" },
          ],
        }),
      };
    },
  },
    // ============================================================
  // DROITE_PARALLELE
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_droite_parallele_fixed_1_definition",
    niveau: "cm2",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_parallele",
    difficulty: 1,
    theme: "neutral",
    text: "Deux droites parallèles sont deux droites...",
    format: "qcm",
    choices: [
      "qui ne se coupent jamais",
      "qui se coupent toujours en angle droit",
      "qui ont toujours un point commun",
      "qui forment toujours un triangle",
    ],
    expected: ["qui ne se coupent jamais"],
    comparator: "mcq_exact",
    hint: "Deux droites parallèles gardent le même écart.",
    explanation: exp(
      "Deux droites parallèles sont deux droites qui ne se coupent jamais.",
      "On observe si les droites gardent le même écart.",
      "Ici, les deux droites vont dans la même direction et ne se rencontrent pas.",
      "Ce sont des droites parallèles."
    ),
    tags: ["cm2", "droite", "parallele", "definition", "qcm", "canvas"],
    canvas: droitesCanvas({
      lines: [
        {
          id: "d1",
          type: "droite",
          from: { x: 55, y: 90 },
          to: { x: 285, y: 90 },
          label: "(d1)",
          color: "#2563eb",
        },
        {
          id: "d2",
          type: "droite",
          from: { x: 55, y: 155 },
          to: { x: 285, y: 155 },
          label: "(d2)",
          color: "#2563eb",
        },
      ],
      markers: {
        parallels: [
          {
            lineA: "d1",
            lineB: "d2",
            color: "#8b5cf6",
            markCount: 1,
          },
        ],
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_droite_parallele_fixed_2_reconnaitre",
    niveau: "cm2",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_parallele",
    difficulty: 1,
    theme: "neutral",
    text: "Les deux droites représentées sont-elles parallèles ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Elles vont dans la même direction et ne se coupent pas.",
    explanation: exp(
      "Deux droites parallèles ne se coupent jamais.",
      "On regarde si elles ont la même direction.",
      "Les deux droites sont horizontales et gardent le même écart.",
      "Oui, elles sont parallèles."
    ),
    tags: ["cm2", "droite", "parallele", "reconnaitre", "qcm", "canvas"],
    canvas: droitesCanvas({
      lines: [
        {
          id: "d",
          type: "droite",
          from: { x: 60, y: 80 },
          to: { x: 280, y: 80 },
          label: "(d)",
          color: "#2563eb",
        },
        {
          id: "e",
          type: "droite",
          from: { x: 60, y: 160 },
          to: { x: 280, y: 160 },
          label: "(e)",
          color: "#2563eb",
        },
      ],
      markers: {
        parallels: [
          {
            lineA: "d",
            lineB: "e",
            color: "#8b5cf6",
            markCount: 1,
          },
        ],
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_droite_parallele_fixed_3_non_paralleles",
    niveau: "cm2",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_parallele",
    difficulty: 2,
    theme: "neutral",
    text: "Les deux droites représentées sont-elles parallèles ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Elles se coupent en un point.",
    explanation: exp(
      "Deux droites parallèles ne se coupent jamais.",
      "On regarde si les droites ont un point commun.",
      "Ici, les deux droites se coupent au point O.",
      "Non, ces droites ne sont pas parallèles."
    ),
    tags: ["cm2", "droite", "parallele", "intersection", "qcm", "canvas"],
    canvas: droitesCanvas({
      lines: [
        {
          id: "d1",
          type: "droite",
          from: { x: 70, y: 180 },
          to: { x: 270, y: 60 },
          label: "(d1)",
          color: "#2563eb",
        },
        {
          id: "d2",
          type: "droite",
          from: { x: 70, y: 60 },
          to: { x: 270, y: 180 },
          label: "(d2)",
          color: "#16a34a",
        },
      ],
      intersections: [
        { x: 170, y: 120, label: "O", color: "#f97316", highlight: true },
      ],
    }),
  },

  {
    kind: "fixed",
    id: "cm2_droite_parallele_fixed_4_meme_direction",
    niveau: "cm2",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_parallele",
    difficulty: 2,
    theme: "neutral",
    text: "Deux droites qui gardent toujours le même écart sont généralement...",
    format: "qcm",
    choices: [
      "parallèles",
      "perpendiculaires",
      "des segments",
      "des points",
    ],
    expected: ["parallèles"],
    comparator: "mcq_exact",
    hint: "Même direction, même écart.",
    explanation: exp(
      "Deux droites parallèles gardent le même écart.",
      "On observe leur direction et la distance entre elles.",
      "Si elles gardent le même écart, elles ne vont pas se couper.",
      "Ces droites sont parallèles."
    ),
    tags: ["cm2", "droite", "parallele", "meme_ecart", "qcm", "canvas"],
    canvas: droitesCanvas({
      lines: [
        {
          id: "a",
          type: "droite",
          from: { x: 65, y: 65 },
          to: { x: 285, y: 120 },
          label: "(a)",
          color: "#2563eb",
        },
        {
          id: "b",
          type: "droite",
          from: { x: 55, y: 125 },
          to: { x: 275, y: 180 },
          label: "(b)",
          color: "#2563eb",
        },
      ],
      markers: {
        parallels: [
          {
            lineA: "a",
            lineB: "b",
            color: "#8b5cf6",
            markCount: 1,
          },
        ],
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_droite_parallele_fixed_5_piege_meme_couleur",
    niveau: "cm2",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_parallele",
    difficulty: 2,
    theme: "neutral",
    text: "Deux droites sont-elles parallèles parce qu’elles ont la même couleur ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "La couleur aide à lire la figure, mais ne prouve pas le parallélisme.",
    explanation: exp(
      "Le parallélisme dépend de la direction des droites.",
      "On ne regarde pas seulement la couleur.",
      "Deux droites de même couleur peuvent se couper si elles n’ont pas la même direction.",
      "La couleur ne suffit pas pour prouver que deux droites sont parallèles."
    ),
    tags: ["cm2", "droite", "parallele", "erreur", "couleur", "qcm", "canvas"],
    canvas: droitesCanvas({
      lines: [
        {
          id: "d",
          type: "droite",
          from: { x: 70, y: 180 },
          to: { x: 270, y: 60 },
          label: "(d)",
          color: "#2563eb",
        },
        {
          id: "e",
          type: "droite",
          from: { x: 80, y: 60 },
          to: { x: 260, y: 170 },
          label: "(e)",
          color: "#2563eb",
        },
      ],
      intersections: [
        { x: 174, y: 117, label: "O", color: "#f97316", highlight: true },
      ],
    }),
  },

  {
    kind: "fixed",
    id: "cm2_droite_parallele_fixed_6_piege_segments",
    niveau: "cm2",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_parallele",
    difficulty: 3,
    theme: "neutral",
    text: "Les deux segments représentés sont-ils portés par des droites parallèles ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Imagine les droites qui prolongent les segments.",
    explanation: exp(
      "Deux segments peuvent être portés par des droites parallèles.",
      "On imagine les droites qui prolongent ces segments.",
      "Les deux segments ont la même direction et gardent le même écart.",
      "Oui, ils sont portés par des droites parallèles."
    ),
    tags: ["cm2", "droite", "parallele", "segment", "qcm", "canvas"],
    canvas: droitesCanvas({
      lines: [
        {
          id: "AB",
          type: "segment",
          from: { x: 70, y: 90 },
          to: { x: 250, y: 90 },
          label: "[AB]",
          color: "#16a34a",
        },
        {
          id: "CD",
          type: "segment",
          from: { x: 100, y: 155 },
          to: { x: 280, y: 155 },
          label: "[CD]",
          color: "#16a34a",
        },
      ],
      points: [
        { x: 70, y: 90, label: "A", color: "#ef4444" },
        { x: 250, y: 90, label: "B", color: "#ef4444" },
        { x: 100, y: 155, label: "C", color: "#f97316" },
        { x: 280, y: 155, label: "D", color: "#f97316" },
      ],
      markers: {
        parallels: [
          {
            lineA: "AB",
            lineB: "CD",
            color: "#8b5cf6",
            markCount: 1,
          },
        ],
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_droite_parallele_fixed_7_reunion_routes",
    niveau: "cm2",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_parallele",
    difficulty: 3,
    theme: "reunion",
    text: "Sur un plan simplifié de Saint-Pierre, deux rues droites gardent toujours le même écart. Elles sont...",
    format: "qcm",
    choices: [
      "parallèles",
      "perpendiculaires",
      "sécantes",
      "confondues avec un point",
    ],
    expected: ["parallèles"],
    comparator: "mcq_exact",
    hint: "Même direction et même écart.",
    explanation: exp(
      "Deux droites parallèles gardent le même écart.",
      "Sur un plan, on observe la direction des rues.",
      "Si deux rues droites gardent toujours le même écart, elles ne se coupent pas.",
      "Ces rues sont parallèles."
    ),
    tags: ["cm2", "droite", "parallele", "reunion", "rues", "qcm", "canvas"],
    canvas: droitesCanvas({
      lines: [
        {
          id: "rue1",
          type: "droite",
          from: { x: 55, y: 85 },
          to: { x: 285, y: 105 },
          label: "Rue 1",
          color: "#2563eb",
        },
        {
          id: "rue2",
          type: "droite",
          from: { x: 50, y: 150 },
          to: { x: 280, y: 170 },
          label: "Rue 2",
          color: "#2563eb",
        },
      ],
      markers: {
        parallels: [
          {
            lineA: "rue1",
            lineB: "rue2",
            color: "#8b5cf6",
            markCount: 1,
          },
        ],
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_droite_parallele_fixed_8_erreur_intersection",
    niveau: "cm2",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_parallele",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève dit : “Ces deux droites sont parallèles car elles se coupent en O.” A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Deux droites parallèles ne se coupent pas.",
    explanation: exp(
      "Deux droites parallèles ne se coupent jamais.",
      "On vérifie s’il existe un point d’intersection.",
      "Ici, les deux droites se coupent en O.",
      "L’élève a tort : ces droites ne sont pas parallèles."
    ),
    tags: ["cm2", "droite", "parallele", "erreur", "intersection", "qcm", "canvas"],
    canvas: droitesCanvas({
      lines: [
        {
          id: "d",
          type: "droite",
          from: { x: 70, y: 180 },
          to: { x: 270, y: 60 },
          label: "(d)",
          color: "#2563eb",
        },
        {
          id: "e",
          type: "droite",
          from: { x: 70, y: 70 },
          to: { x: 270, y: 155 },
          label: "(e)",
          color: "#16a34a",
        },
      ],
      intersections: [
        { x: 170, y: 120, label: "O", color: "#f97316", highlight: true },
      ],
    }),
  },

  {
    kind: "fixed",
    id: "cm2_droite_parallele_fixed_9_open_methode",
    niveau: "cm2",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_parallele",
    difficulty: 4,
    theme: "neutral",
    text: "Explique comment reconnaître deux droites parallèles.",
    format: "open",
    expected: ["même", "direction", "écart", "coupent"],
    comparator: "contains_keyword",
    hint: "Parle de même direction et du fait qu’elles ne se coupent pas.",
    explanation: exp(
      "Deux droites parallèles ne se coupent jamais.",
      "On observe leur direction et l’écart entre elles.",
      "Si elles ont la même direction et gardent le même écart, elles sont parallèles.",
      "On reconnaît deux droites parallèles car elles ne se coupent pas."
    ),
    tags: ["cm2", "droite", "parallele", "open", "methode"],
  },

  {
    kind: "template",
    id: "cm2_droite_parallele_tpl_1_reconnaitre_oui_non",
    niveau: "cm2",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_parallele",
    difficulty: 2,
    theme: "neutral",
    hint: "Regarde si les droites se coupent ou gardent le même écart.",
    tags: ["cm2", "droite", "parallele", "template", "qcm", "canvas"],
    generate: () => {
      const isParallel = Math.random() < 0.5;

      if (isParallel) {
        return {
          text: "Les deux droites représentées sont-elles parallèles ?",
          format: "qcm",
          choices: ["oui", "non"],
          expected: ["oui"],
          comparator: "mcq_exact",
          explanation: exp(
            "Deux droites parallèles ne se coupent jamais.",
            "On regarde si elles gardent la même direction.",
            "Ici, les deux droites ont la même direction et gardent le même écart.",
            "Oui, elles sont parallèles."
          ),
          canvas: droitesCanvas({
            lines: [
              {
                id: "d",
                type: "droite",
                from: { x: 55, y: 80 },
                to: { x: 285, y: 105 },
                label: "(d)",
                color: "#2563eb",
              },
              {
                id: "e",
                type: "droite",
                from: { x: 55, y: 145 },
                to: { x: 285, y: 170 },
                label: "(e)",
                color: "#2563eb",
              },
            ],
            markers: {
              parallels: [
                {
                  lineA: "d",
                  lineB: "e",
                  color: "#8b5cf6",
                  markCount: 1,
                },
              ],
            },
          }),
        };
      }

      return {
        text: "Les deux droites représentées sont-elles parallèles ?",
        format: "qcm",
        choices: ["oui", "non"],
        expected: ["non"],
        comparator: "mcq_exact",
        explanation: exp(
          "Deux droites parallèles ne se coupent jamais.",
          "On vérifie s’il y a un point d’intersection.",
          "Ici, les deux droites se coupent.",
          "Non, elles ne sont pas parallèles."
        ),
        canvas: droitesCanvas({
          lines: [
            {
              id: "d",
              type: "droite",
              from: { x: 70, y: 175 },
              to: { x: 270, y: 65 },
              label: "(d)",
              color: "#2563eb",
            },
            {
              id: "e",
              type: "droite",
              from: { x: 80, y: 65 },
              to: { x: 260, y: 170 },
              label: "(e)",
              color: "#16a34a",
            },
          ],
          intersections: [
            { x: 170, y: 120, label: "O", color: "#f97316", highlight: true },
          ],
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_droite_parallele_tpl_2_vocabulaire",
    niveau: "cm2",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_parallele",
    difficulty: 2,
    theme: "neutral",
    hint: "Deux droites parallèles ne se rencontrent pas.",
    tags: ["cm2", "droite", "parallele", "vocabulaire", "template", "qcm", "canvas"],
    generate: () => {
      return {
        text: "Deux droites qui ne se coupent jamais sont dites...",
        format: "qcm",
        choices: shuffle([
          "parallèles",
          "perpendiculaires",
          "sécantes",
          "confondues avec un segment",
        ]),
        expected: ["parallèles"],
        comparator: "mcq_exact",
        explanation: exp(
          "Deux droites parallèles ne se coupent jamais.",
          "On utilise le bon vocabulaire géométrique.",
          "Quand deux droites ne se rencontrent pas, elles sont parallèles.",
          "La bonne réponse est : parallèles."
        ),
        canvas: droitesCanvas({
          lines: [
            {
              id: "d",
              type: "droite",
              from: { x: 65, y: 90 },
              to: { x: 280, y: 90 },
              label: "(d)",
              color: "#2563eb",
            },
            {
              id: "e",
              type: "droite",
              from: { x: 65, y: 155 },
              to: { x: 280, y: 155 },
              label: "(e)",
              color: "#2563eb",
            },
          ],
          markers: {
            parallels: [
              {
                lineA: "d",
                lineB: "e",
                color: "#8b5cf6",
                markCount: 1,
              },
            ],
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_droite_parallele_tpl_3_segments_supports",
    niveau: "cm2",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_parallele",
    difficulty: 3,
    theme: "neutral",
    hint: "On peut prolonger mentalement les segments.",
    tags: ["cm2", "droite", "parallele", "segments", "template", "qcm", "canvas"],
    generate: () => {
      const isParallel = Math.random() < 0.5;

      if (isParallel) {
        return {
          text: "Les deux segments sont-ils portés par des droites parallèles ?",
          format: "qcm",
          choices: ["oui", "non"],
          expected: ["oui"],
          comparator: "mcq_exact",
          explanation: exp(
            "Des segments peuvent être portés par des droites parallèles.",
            "On imagine les droites qui prolongent les segments.",
            "Les deux segments ont la même direction.",
            "Oui, ils sont portés par des droites parallèles."
          ),
          canvas: droitesCanvas({
            lines: [
              {
                id: "AB",
                type: "segment",
                from: { x: 70, y: 85 },
                to: { x: 250, y: 110 },
                label: "[AB]",
                color: "#16a34a",
              },
              {
                id: "CD",
                type: "segment",
                from: { x: 95, y: 150 },
                to: { x: 275, y: 175 },
                label: "[CD]",
                color: "#16a34a",
              },
            ],
            points: [
              { x: 70, y: 85, label: "A", color: "#ef4444" },
              { x: 250, y: 110, label: "B", color: "#ef4444" },
              { x: 95, y: 150, label: "C", color: "#f97316" },
              { x: 275, y: 175, label: "D", color: "#f97316" },
            ],
            markers: {
              parallels: [
                {
                  lineA: "AB",
                  lineB: "CD",
                  color: "#8b5cf6",
                  markCount: 1,
                },
              ],
            },
          }),
        };
      }

      return {
        text: "Les deux segments sont-ils portés par des droites parallèles ?",
        format: "qcm",
        choices: ["oui", "non"],
        expected: ["non"],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour savoir si deux segments sont portés par des droites parallèles, on compare leur direction.",
          "On imagine les droites qui prolongent les segments.",
          "Ici, les directions sont différentes et les droites prolongées finiraient par se couper.",
          "Non, ils ne sont pas portés par des droites parallèles."
        ),
        canvas: droitesCanvas({
          lines: [
            {
              id: "AB",
              type: "segment",
              from: { x: 70, y: 85 },
              to: { x: 250, y: 115 },
              label: "[AB]",
              color: "#16a34a",
            },
            {
              id: "CD",
              type: "segment",
              from: { x: 95, y: 175 },
              to: { x: 275, y: 130 },
              label: "[CD]",
              color: "#ef4444",
            },
          ],
          points: [
            { x: 70, y: 85, label: "A", color: "#2563eb" },
            { x: 250, y: 115, label: "B", color: "#2563eb" },
            { x: 95, y: 175, label: "C", color: "#f97316" },
            { x: 275, y: 130, label: "D", color: "#f97316" },
          ],
        }),
      };
    },
  },
    // ============================================================
  // DROITE_PERPENDICULAIRE
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_droite_perpendiculaire_fixed_1_definition",
    niveau: "cm2",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_perpendiculaire",
    difficulty: 1,
    theme: "neutral",
    text: "Deux droites perpendiculaires sont deux droites qui se coupent en formant...",
    format: "qcm",
    choices: [
      "un angle droit",
      "un angle plat",
      "un cercle",
      "un segment",
    ],
    expected: ["un angle droit"],
    comparator: "mcq_exact",
    hint: "Perpendiculaire fait penser à angle droit.",
    explanation:
      "Deux droites perpendiculaires se coupent en formant un angle droit. " +
      "Sur la figure, le petit carré rouge indique l’angle droit.",
    tags: ["cm2", "droite", "perpendiculaire", "definition", "qcm", "canvas"],
    canvas: droitesCanvas({
      lines: [
        {
          id: "d",
          type: "droite",
          from: { x: 60, y: 120 },
          to: { x: 280, y: 120 },
          label: "(d)",
          color: "#2563eb",
        },
        {
          id: "e",
          type: "droite",
          from: { x: 170, y: 35 },
          to: { x: 170, y: 210 },
          label: "(e)",
          color: "#16a34a",
        },
      ],
      intersections: [
        { x: 170, y: 120, label: "O", color: "#f97316", highlight: true },
      ],
      markers: {
        rightAngles: [
          {
            x: 170,
            y: 120,
            lineA: "d",
            lineB: "e",
            size: 22,
            color: "#ef4444",
          },
        ],
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_droite_perpendiculaire_fixed_2_reconnaitre_oui",
    niveau: "cm2",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_perpendiculaire",
    difficulty: 1,
    theme: "neutral",
    text: "Les deux droites représentées sont-elles perpendiculaires ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Cherche l’angle droit.",
    explanation:
      "Oui. Les deux droites se coupent et le codage rouge montre un angle droit. " +
      "Elles sont donc perpendiculaires.",
    tags: ["cm2", "droite", "perpendiculaire", "reconnaitre", "qcm", "canvas"],
    canvas: droitesCanvas({
      lines: [
        {
          id: "d1",
          type: "droite",
          from: { x: 65, y: 165 },
          to: { x: 275, y: 75 },
          label: "(d1)",
          color: "#2563eb",
        },
        {
          id: "d2",
          type: "droite",
          from: { x: 125, y: 45 },
          to: { x: 215, y: 195 },
          label: "(d2)",
          color: "#16a34a",
        },
      ],
      intersections: [
        { x: 170, y: 120, label: "O", color: "#f97316", highlight: true },
      ],
      markers: {
        rightAngles: [
          {
            x: 170,
            y: 120,
            lineA: "d1",
            lineB: "d2",
            size: 20,
            color: "#ef4444",
          },
        ],
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_droite_perpendiculaire_fixed_3_reconnaitre_non",
    niveau: "cm2",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_perpendiculaire",
    difficulty: 2,
    theme: "neutral",
    text: "Les deux droites représentées sont-elles perpendiculaires ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Elles se coupent, mais forment-elles un angle droit ?",
    explanation:
      "Non. Deux droites perpendiculaires doivent former un angle droit. " +
      "Ici, les droites se coupent, mais l’angle n’est pas droit.",
    tags: ["cm2", "droite", "perpendiculaire", "non", "qcm", "canvas"],
    canvas: droitesCanvas({
      lines: [
        {
          id: "d",
          type: "droite",
          from: { x: 65, y: 165 },
          to: { x: 280, y: 100 },
          label: "(d)",
          color: "#2563eb",
        },
        {
          id: "e",
          type: "droite",
          from: { x: 100, y: 60 },
          to: { x: 240, y: 185 },
          label: "(e)",
          color: "#16a34a",
        },
      ],
      intersections: [
        { x: 170, y: 133, label: "O", color: "#f97316", highlight: true },
      ],
      display: {
        showRightAngleMarkers: false,
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_droite_perpendiculaire_fixed_4_angle_droit",
    niveau: "cm2",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_perpendiculaire",
    difficulty: 2,
    theme: "neutral",
    text: "Quel indice permet de reconnaître deux droites perpendiculaires sur une figure ?",
    format: "qcm",
    choices: [
      "le codage de l’angle droit",
      "la même couleur",
      "la longueur des noms",
      "le nombre de points sur la figure",
    ],
    expected: ["le codage de l’angle droit"],
    comparator: "mcq_exact",
    hint: "Cherche le petit carré.",
    explanation:
      "Le petit carré indique un angle droit. Quand deux droites se coupent avec ce codage, " +
      "on peut reconnaître des droites perpendiculaires.",
    tags: ["cm2", "droite", "perpendiculaire", "angle_droit", "qcm", "canvas"],
    canvas: droitesCanvas({
      lines: [
        {
          id: "d",
          type: "droite",
          from: { x: 70, y: 120 },
          to: { x: 285, y: 120 },
          label: "(d)",
          color: "#2563eb",
        },
        {
          id: "e",
          type: "droite",
          from: { x: 180, y: 45 },
          to: { x: 180, y: 205 },
          label: "(e)",
          color: "#16a34a",
        },
      ],
      intersections: [
        { x: 180, y: 120, label: "O", color: "#f97316", highlight: true },
      ],
      markers: {
        rightAngles: [
          {
            x: 180,
            y: 120,
            lineA: "d",
            lineB: "e",
            size: 22,
            color: "#ef4444",
          },
        ],
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_droite_perpendiculaire_fixed_5_piege_couleur",
    niveau: "cm2",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_perpendiculaire",
    difficulty: 2,
    theme: "neutral",
    text: "Deux droites sont-elles perpendiculaires parce qu’elles ont deux couleurs différentes ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "La couleur aide à lire, mais ne prouve rien.",
    explanation:
      "Non. Les couleurs aident à distinguer les droites, mais elles ne prouvent pas la perpendicularité. " +
      "Il faut vérifier qu’elles forment un angle droit.",
    tags: ["cm2", "droite", "perpendiculaire", "erreur", "couleur", "qcm", "canvas"],
    canvas: droitesCanvas({
      lines: [
        {
          id: "d",
          type: "droite",
          from: { x: 65, y: 170 },
          to: { x: 280, y: 95 },
          label: "(d)",
          color: "#2563eb",
        },
        {
          id: "e",
          type: "droite",
          from: { x: 80, y: 80 },
          to: { x: 270, y: 160 },
          label: "(e)",
          color: "#16a34a",
        },
      ],
      intersections: [
        { x: 171, y: 133, label: "O", color: "#f97316", highlight: true },
      ],
    }),
  },

  {
    kind: "fixed",
    id: "cm2_droite_perpendiculaire_fixed_6_parallele_pas_perpendiculaire",
    niveau: "cm2",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_perpendiculaire",
    difficulty: 3,
    theme: "neutral",
    text: "Deux droites parallèles peuvent-elles être perpendiculaires entre elles ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Des droites parallèles ne se coupent pas.",
    explanation:
      "Non. Des droites parallèles ne se coupent pas. " +
      "Pour être perpendiculaires, deux droites doivent se couper en formant un angle droit.",
    tags: ["cm2", "droite", "perpendiculaire", "parallele", "qcm", "canvas"],
    canvas: droitesCanvas({
      lines: [
        {
          id: "d",
          type: "droite",
          from: { x: 60, y: 90 },
          to: { x: 280, y: 90 },
          label: "(d)",
          color: "#2563eb",
        },
        {
          id: "e",
          type: "droite",
          from: { x: 60, y: 155 },
          to: { x: 280, y: 155 },
          label: "(e)",
          color: "#2563eb",
        },
      ],
      markers: {
        parallels: [
          {
            lineA: "d",
            lineB: "e",
            color: "#8b5cf6",
            markCount: 1,
          },
        ],
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_droite_perpendiculaire_fixed_7_segment_support",
    niveau: "cm2",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_perpendiculaire",
    difficulty: 3,
    theme: "neutral",
    text: "Les deux segments représentés sont-ils portés par des droites perpendiculaires ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Imagine les droites qui prolongent les segments.",
    explanation:
      "Oui. Même si on voit deux segments, on peut imaginer les droites qui les prolongent. " +
      "Elles se coupent en formant un angle droit.",
    tags: ["cm2", "droite", "perpendiculaire", "segment", "support", "qcm", "canvas"],
    canvas: droitesCanvas({
      lines: [
        {
          id: "AB",
          type: "segment",
          from: { x: 70, y: 125 },
          to: { x: 270, y: 125 },
          label: "[AB]",
          color: "#2563eb",
        },
        {
          id: "CD",
          type: "segment",
          from: { x: 170, y: 55 },
          to: { x: 170, y: 200 },
          label: "[CD]",
          color: "#16a34a",
        },
      ],
      points: [
        { x: 70, y: 125, label: "A", color: "#ef4444" },
        { x: 270, y: 125, label: "B", color: "#ef4444" },
        { x: 170, y: 55, label: "C", color: "#f97316" },
        { x: 170, y: 200, label: "D", color: "#f97316" },
      ],
      intersections: [
        { x: 170, y: 125, label: "O", color: "#f97316", highlight: true },
      ],
      markers: {
        rightAngles: [
          {
            x: 170,
            y: 125,
            lineA: "AB",
            lineB: "CD",
            size: 22,
            color: "#ef4444",
          },
        ],
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_droite_perpendiculaire_fixed_8_reunion_routes",
    niveau: "cm2",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_perpendiculaire",
    difficulty: 3,
    theme: "reunion",
    text: "Sur un plan simplifié, deux rues se croisent en formant un angle droit. Elles sont...",
    format: "qcm",
    choices: [
      "perpendiculaires",
      "parallèles",
      "identiques",
      "des fractions",
    ],
    expected: ["perpendiculaires"],
    comparator: "mcq_exact",
    hint: "Deux droites qui se coupent à angle droit sont perpendiculaires.",
    explanation:
      "Deux rues représentées par des droites qui se coupent à angle droit sont perpendiculaires. " +
      "Le petit carré rouge montre l’angle droit.",
    tags: ["cm2", "droite", "perpendiculaire", "reunion", "rues", "qcm", "canvas"],
    canvas: droitesCanvas({
      lines: [
        {
          id: "rue1",
          type: "droite",
          from: { x: 60, y: 125 },
          to: { x: 285, y: 125 },
          label: "Rue 1",
          color: "#2563eb",
        },
        {
          id: "rue2",
          type: "droite",
          from: { x: 175, y: 45 },
          to: { x: 175, y: 210 },
          label: "Rue 2",
          color: "#16a34a",
        },
      ],
      intersections: [
        { x: 175, y: 125, label: "O", color: "#f97316", highlight: true },
      ],
      markers: {
        rightAngles: [
          {
            x: 175,
            y: 125,
            lineA: "rue1",
            lineB: "rue2",
            size: 22,
            color: "#ef4444",
          },
        ],
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_droite_perpendiculaire_fixed_9_open_methode",
    niveau: "cm2",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_perpendiculaire",
    difficulty: 4,
    theme: "neutral",
    text: "Explique comment reconnaître deux droites perpendiculaires.",
    format: "open",
    expected: ["coupent", "angle", "droit", "90"],
    comparator: "contains_keyword",
    hint: "Parle du point d’intersection et de l’angle droit.",
    explanation:
      "Deux droites perpendiculaires se coupent en formant un angle droit. " +
      "Pour les reconnaître, on cherche le point où elles se coupent et le codage de l’angle droit.",
    tags: ["cm2", "droite", "perpendiculaire", "open", "methode"],
  },

  {
    kind: "template",
    id: "cm2_droite_perpendiculaire_tpl_1_oui_non",
    niveau: "cm2",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_perpendiculaire",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche si les deux droites forment un angle droit.",
    tags: ["cm2", "droite", "perpendiculaire", "template", "qcm", "canvas"],
    generate: () => {
      const isPerpendicular = Math.random() < 0.5;

      if (isPerpendicular) {
        return {
          text: "Les deux droites représentées sont-elles perpendiculaires ?",
          format: "qcm",
          choices: ["oui", "non"],
          expected: ["oui"],
          comparator: "mcq_exact",
          explanation:
            "Oui. Les deux droites se coupent en formant un angle droit. " +
            "Le codage rouge permet de le reconnaître.",
          canvas: droitesCanvas({
            lines: [
              {
                id: "d",
                type: "droite",
                from: { x: 60, y: 120 },
                to: { x: 280, y: 120 },
                label: "(d)",
                color: "#2563eb",
              },
              {
                id: "e",
                type: "droite",
                from: { x: 170, y: 45 },
                to: { x: 170, y: 205 },
                label: "(e)",
                color: "#16a34a",
              },
            ],
            intersections: [
              { x: 170, y: 120, label: "O", color: "#f97316", highlight: true },
            ],
            markers: {
              rightAngles: [
                {
                  x: 170,
                  y: 120,
                  lineA: "d",
                  lineB: "e",
                  size: 22,
                  color: "#ef4444",
                },
              ],
            },
          }),
        };
      }

      return {
        text: "Les deux droites représentées sont-elles perpendiculaires ?",
        format: "qcm",
        choices: ["oui", "non"],
        expected: ["non"],
        comparator: "mcq_exact",
        explanation:
          "Non. Les deux droites se coupent, mais elles ne forment pas un angle droit. " +
          "Elles ne sont donc pas perpendiculaires.",
        canvas: droitesCanvas({
          lines: [
            {
              id: "d",
              type: "droite",
              from: { x: 65, y: 170 },
              to: { x: 280, y: 100 },
              label: "(d)",
              color: "#2563eb",
            },
            {
              id: "e",
              type: "droite",
              from: { x: 95, y: 65 },
              to: { x: 260, y: 175 },
              label: "(e)",
              color: "#16a34a",
            },
          ],
          intersections: [
            { x: 170, y: 136, label: "O", color: "#f97316", highlight: true },
          ],
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_droite_perpendiculaire_tpl_2_vocabulaire",
    niveau: "cm2",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_perpendiculaire",
    difficulty: 2,
    theme: "neutral",
    hint: "Deux droites qui se coupent à angle droit portent un nom spécial.",
    tags: ["cm2", "droite", "perpendiculaire", "vocabulaire", "template", "qcm", "canvas"],
    generate: () => {
      return {
        text: "Deux droites qui se coupent en formant un angle droit sont dites...",
        format: "qcm",
        choices: shuffle([
          "perpendiculaires",
          "parallèles",
          "arrondies",
          "égales",
        ]),
        expected: ["perpendiculaires"],
        comparator: "mcq_exact",
        explanation:
          "Deux droites qui se coupent en formant un angle droit sont des droites perpendiculaires.",
        canvas: droitesCanvas({
          lines: [
            {
              id: "d",
              type: "droite",
              from: { x: 70, y: 125 },
              to: { x: 280, y: 125 },
              label: "(d)",
              color: "#2563eb",
            },
            {
              id: "e",
              type: "droite",
              from: { x: 180, y: 45 },
              to: { x: 180, y: 205 },
              label: "(e)",
              color: "#16a34a",
            },
          ],
          intersections: [
            { x: 180, y: 125, label: "O", color: "#f97316", highlight: true },
          ],
          markers: {
            rightAngles: [
              {
                x: 180,
                y: 125,
                lineA: "d",
                lineB: "e",
                size: 22,
                color: "#ef4444",
              },
            ],
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_droite_perpendiculaire_tpl_3_segment_support",
    niveau: "cm2",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_perpendiculaire",
    difficulty: 3,
    theme: "neutral",
    hint: "Prolonge mentalement les segments.",
    tags: ["cm2", "droite", "perpendiculaire", "segment", "template", "qcm", "canvas"],
    generate: () => {
      const isPerpendicular = Math.random() < 0.5;

      if (isPerpendicular) {
        return {
          text: "Les deux segments sont-ils portés par des droites perpendiculaires ?",
          format: "qcm",
          choices: ["oui", "non"],
          expected: ["oui"],
          comparator: "mcq_exact",
          explanation:
            "Oui. Si on prolonge les deux segments, leurs droites supports se coupent en formant un angle droit.",
          canvas: droitesCanvas({
            lines: [
              {
                id: "AB",
                type: "segment",
                from: { x: 75, y: 125 },
                to: { x: 265, y: 125 },
                label: "[AB]",
                color: "#2563eb",
              },
              {
                id: "CD",
                type: "segment",
                from: { x: 170, y: 55 },
                to: { x: 170, y: 200 },
                label: "[CD]",
                color: "#16a34a",
              },
            ],
            intersections: [
              { x: 170, y: 125, label: "O", color: "#f97316", highlight: true },
            ],
            markers: {
              rightAngles: [
                {
                  x: 170,
                  y: 125,
                  lineA: "AB",
                  lineB: "CD",
                  size: 22,
                  color: "#ef4444",
                },
              ],
            },
          }),
        };
      }

      return {
        text: "Les deux segments sont-ils portés par des droites perpendiculaires ?",
        format: "qcm",
        choices: ["oui", "non"],
        expected: ["non"],
        comparator: "mcq_exact",
        explanation:
          "Non. Les deux segments ont des directions différentes, mais leurs droites supports ne forment pas un angle droit.",
        canvas: droitesCanvas({
          lines: [
            {
              id: "AB",
              type: "segment",
              from: { x: 75, y: 100 },
              to: { x: 265, y: 125 },
              label: "[AB]",
              color: "#2563eb",
            },
            {
              id: "CD",
              type: "segment",
              from: { x: 110, y: 180 },
              to: { x: 245, y: 65 },
              label: "[CD]",
              color: "#16a34a",
            },
          ],
        }),
      };
    },
  },
    // ============================================================
  // DROITE_TRACER
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_droite_tracer_fixed_1_instrument_perpendiculaire",
    niveau: "cm2",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_tracer",
    difficulty: 2,
    theme: "neutral",
    text: "Quel instrument est très utile pour tracer une droite perpendiculaire ?",
    format: "qcm",
    choices: ["une équerre", "un verre doseur", "une balance", "un compas seul"],
    expected: ["une équerre"],
    comparator: "mcq_exact",
    hint: "Une équerre sert à tracer des angles droits.",
    explanation:
      "Pour tracer une droite perpendiculaire, on cherche à former un angle droit. " +
      "L’équerre est l’instrument adapté pour construire cet angle droit.",
    tags: ["cm2", "droite", "tracer", "perpendiculaire", "instrument", "qcm", "canvas"],
    canvas: droitesCanvas({
      lines: [
        {
          id: "d",
          type: "droite",
          from: { x: 65, y: 130 },
          to: { x: 280, y: 130 },
          label: "(d)",
          color: "#2563eb",
        },
        {
          id: "p",
          type: "droite",
          from: { x: 175, y: 55 },
          to: { x: 175, y: 205 },
          label: "à tracer",
          color: "#16a34a",
          dashed: true,
        },
      ],
      intersections: [
        { x: 175, y: 130, label: "A", color: "#f97316", highlight: true },
      ],
      markers: {
        rightAngles: [
          {
            x: 175,
            y: 130,
            lineA: "d",
            lineB: "p",
            size: 22,
            color: "#ef4444",
          },
        ],
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_droite_tracer_fixed_2_instrument_parallele",
    niveau: "cm2",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_tracer",
    difficulty: 2,
    theme: "neutral",
    text: "Pour tracer une droite parallèle à une autre, on peut utiliser...",
    format: "qcm",
    choices: [
      "une règle et une équerre",
      "une balance",
      "un chronomètre",
      "un rapporteur seul",
    ],
    expected: ["une règle et une équerre"],
    comparator: "mcq_exact",
    hint: "On doit garder la même direction.",
    explanation:
      "Pour tracer une parallèle, il faut conserver la même direction que la droite donnée. " +
      "La règle et l’équerre permettent de faire glisser cette direction proprement.",
    tags: ["cm2", "droite", "tracer", "parallele", "instrument", "qcm", "canvas"],
    canvas: droitesCanvas({
      lines: [
        {
          id: "d",
          type: "droite",
          from: { x: 55, y: 90 },
          to: { x: 285, y: 120 },
          label: "(d)",
          color: "#2563eb",
        },
        {
          id: "p",
          type: "droite",
          from: { x: 55, y: 155 },
          to: { x: 285, y: 185 },
          label: "à tracer",
          color: "#16a34a",
          dashed: true,
        },
      ],
      markers: {
        parallels: [
          {
            lineA: "d",
            lineB: "p",
            color: "#8b5cf6",
            markCount: 1,
          },
        ],
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_droite_tracer_fixed_3_perpendiculaire_par_point",
    niveau: "cm2",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_tracer",
    difficulty: 3,
    theme: "neutral",
    text: "On veut tracer une droite perpendiculaire à (d) passant par A. Que doit-on obtenir au point A ?",
    format: "qcm",
    choices: [
      "un angle droit",
      "un angle plat",
      "deux droites parallèles",
      "un segment de 10 cm",
    ],
    expected: ["un angle droit"],
    comparator: "mcq_exact",
    hint: "Perpendiculaire = angle droit.",
    explanation:
      "Une droite perpendiculaire à (d) doit former un angle droit avec (d). " +
      "Si elle passe par A, l’angle droit doit être construit au point A.",
    tags: ["cm2", "droite", "tracer", "perpendiculaire", "point", "qcm", "canvas"],
    canvas: droitesCanvas({
      lines: [
        {
          id: "d",
          type: "droite",
          from: { x: 65, y: 135 },
          to: { x: 280, y: 135 },
          label: "(d)",
          color: "#2563eb",
        },
        {
          id: "p",
          type: "droite",
          from: { x: 175, y: 55 },
          to: { x: 175, y: 205 },
          label: "(p)",
          color: "#16a34a",
          dashed: true,
        },
      ],
      points: [{ x: 175, y: 135, label: "A", color: "#f97316", highlight: true }],
      markers: {
        rightAngles: [
          {
            x: 175,
            y: 135,
            lineA: "d",
            lineB: "p",
            size: 22,
            color: "#ef4444",
          },
        ],
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_droite_tracer_fixed_4_parallele_par_point",
    niveau: "cm2",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_tracer",
    difficulty: 3,
    theme: "neutral",
    text: "On veut tracer une droite parallèle à (d) passant par A. Que doit-on conserver ?",
    format: "qcm",
    choices: [
      "la même direction que (d)",
      "un angle droit avec (d)",
      "le même nom de droite",
      "une longueur de 5 cm",
    ],
    expected: ["la même direction que (d)"],
    comparator: "mcq_exact",
    hint: "Deux parallèles ne se coupent pas.",
    explanation:
      "Pour tracer une droite parallèle, on conserve la direction de la droite donnée. " +
      "La nouvelle droite doit passer par A et ne pas couper (d).",
    tags: ["cm2", "droite", "tracer", "parallele", "point", "qcm", "canvas"],
    canvas: droitesCanvas({
      lines: [
        {
          id: "d",
          type: "droite",
          from: { x: 55, y: 85 },
          to: { x: 285, y: 110 },
          label: "(d)",
          color: "#2563eb",
        },
        {
          id: "p",
          type: "droite",
          from: { x: 55, y: 155 },
          to: { x: 285, y: 180 },
          label: "(p)",
          color: "#16a34a",
          dashed: true,
        },
      ],
      points: [{ x: 170, y: 168, label: "A", color: "#f97316", highlight: true }],
      markers: {
        parallels: [
          {
            lineA: "d",
            lineB: "p",
            color: "#8b5cf6",
            markCount: 1,
          },
        ],
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_droite_tracer_fixed_5_erreur_perpendiculaire",
    niveau: "cm2",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_tracer",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève trace une droite qui coupe (d), mais sans angle droit. A-t-il tracé une perpendiculaire ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Se couper ne suffit pas.",
    explanation:
      "Non. Pour être perpendiculaire, la droite doit couper (d) en formant un angle droit. " +
      "Une simple intersection ne suffit pas.",
    tags: ["cm2", "droite", "tracer", "perpendiculaire", "erreur", "qcm", "canvas"],
    canvas: droitesCanvas({
      lines: [
        {
          id: "d",
          type: "droite",
          from: { x: 60, y: 145 },
          to: { x: 280, y: 105 },
          label: "(d)",
          color: "#2563eb",
        },
        {
          id: "e",
          type: "droite",
          from: { x: 100, y: 65 },
          to: { x: 240, y: 190 },
          label: "(e)",
          color: "#16a34a",
          dashed: true,
        },
      ],
      intersections: [
        { x: 170, y: 125, label: "O", color: "#f97316", highlight: true },
      ],
      display: {
        showRightAngleMarkers: false,
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_droite_tracer_fixed_6_erreur_parallele",
    niveau: "cm2",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_tracer",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève veut tracer une parallèle à (d), mais sa droite finit par couper (d). Est-ce correct ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Deux parallèles ne se coupent jamais.",
    explanation:
      "Non. Une droite parallèle à (d) doit garder la même direction et ne jamais couper (d). " +
      "Si elle coupe (d), elle n’est pas parallèle.",
    tags: ["cm2", "droite", "tracer", "parallele", "erreur", "qcm", "canvas"],
    canvas: droitesCanvas({
      lines: [
        {
          id: "d",
          type: "droite",
          from: { x: 65, y: 95 },
          to: { x: 285, y: 130 },
          label: "(d)",
          color: "#2563eb",
        },
        {
          id: "e",
          type: "droite",
          from: { x: 70, y: 180 },
          to: { x: 270, y: 80 },
          label: "(e)",
          color: "#16a34a",
          dashed: true,
        },
      ],
      intersections: [
        { x: 175, y: 113, label: "O", color: "#f97316", highlight: true },
      ],
    }),
  },

  {
    kind: "fixed",
    id: "cm2_droite_tracer_fixed_7_etapes_perpendiculaire",
    niveau: "cm2",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_tracer",
    difficulty: 4,
    theme: "neutral",
    text: "Pour tracer une perpendiculaire à (d) passant par A, quelle étape est correcte ?",
    format: "qcm",
    choices: [
      "placer l’équerre pour former un angle droit en A",
      "tracer une droite au hasard",
      "choisir une couleur différente",
      "mesurer une aire",
    ],
    expected: ["placer l’équerre pour former un angle droit en A"],
    comparator: "mcq_exact",
    hint: "L’équerre sert à construire l’angle droit.",
    explanation:
      "L’étape essentielle est de placer l’équerre pour former un angle droit au point A. " +
      "Ensuite, on trace la droite le long du bord de l’équerre.",
    tags: ["cm2", "droite", "tracer", "perpendiculaire", "methode", "qcm", "canvas"],
    canvas: droitesCanvas({
      lines: [
        {
          id: "d",
          type: "droite",
          from: { x: 60, y: 130 },
          to: { x: 280, y: 130 },
          label: "(d)",
          color: "#2563eb",
        },
        {
          id: "p",
          type: "droite",
          from: { x: 170, y: 55 },
          to: { x: 170, y: 205 },
          label: "(p)",
          color: "#16a34a",
          dashed: true,
        },
      ],
      points: [{ x: 170, y: 130, label: "A", color: "#f97316", highlight: true }],
      markers: {
        rightAngles: [
          {
            x: 170,
            y: 130,
            lineA: "d",
            lineB: "p",
            size: 22,
            color: "#ef4444",
          },
        ],
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_droite_tracer_fixed_8_etapes_parallele",
    niveau: "cm2",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_tracer",
    difficulty: 4,
    theme: "neutral",
    text: "Pour tracer une parallèle à (d), quelle idée est correcte ?",
    format: "qcm",
    choices: [
      "faire glisser l’équerre en gardant la même direction",
      "chercher un angle droit avec (d)",
      "couper obligatoirement (d)",
      "effacer la droite (d)",
    ],
    expected: ["faire glisser l’équerre en gardant la même direction"],
    comparator: "mcq_exact",
    hint: "Une parallèle garde la même direction.",
    explanation:
      "Pour tracer une parallèle, on garde la direction de la droite donnée. " +
      "On peut utiliser la règle et l’équerre pour faire glisser cette direction.",
    tags: ["cm2", "droite", "tracer", "parallele", "methode", "qcm", "canvas"],
    canvas: droitesCanvas({
      lines: [
        {
          id: "d",
          type: "droite",
          from: { x: 60, y: 95 },
          to: { x: 280, y: 120 },
          label: "(d)",
          color: "#2563eb",
        },
        {
          id: "p",
          type: "droite",
          from: { x: 60, y: 160 },
          to: { x: 280, y: 185 },
          label: "(p)",
          color: "#16a34a",
          dashed: true,
        },
      ],
      markers: {
        parallels: [
          {
            lineA: "d",
            lineB: "p",
            color: "#8b5cf6",
            markCount: 1,
          },
        ],
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_droite_tracer_fixed_9_open_perpendiculaire",
    niveau: "cm2",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_tracer",
    difficulty: 4,
    theme: "neutral",
    text: "Explique comment tracer une droite perpendiculaire à une droite donnée.",
    format: "open",
    expected: ["équerre", "angle", "droit"],
    comparator: "contains_keyword",
    hint: "Utilise les mots équerre et angle droit.",
    explanation:
      "On utilise une équerre pour former un angle droit avec la droite donnée. " +
      "Puis on trace la nouvelle droite le long de l’équerre.",
    tags: ["cm2", "droite", "tracer", "perpendiculaire", "open", "methode"],
  },

  {
    kind: "fixed",
    id: "cm2_droite_tracer_fixed_10_open_parallele",
    niveau: "cm2",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_tracer",
    difficulty: 4,
    theme: "neutral",
    text: "Explique l’idée principale pour tracer une droite parallèle à une droite donnée.",
    format: "open",
    expected: ["même", "direction", "équerre", "règle"],
    comparator: "contains_keyword",
    hint: "Une parallèle garde la même direction.",
    explanation:
      "L’idée principale est de garder la même direction que la droite donnée. " +
      "On peut s’aider d’une règle et d’une équerre pour tracer la parallèle proprement.",
    tags: ["cm2", "droite", "tracer", "parallele", "open", "methode"],
  },

  {
    kind: "template",
    id: "cm2_droite_tracer_tpl_1_instrument",
    niveau: "cm2",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_tracer",
    difficulty: 2,
    theme: "neutral",
    hint: "Choisis l’instrument adapté à la construction.",
    tags: ["cm2", "droite", "tracer", "instrument", "template", "qcm", "canvas"],
    generate: () => {
      const item = randomChoice([
        {
          type: "perpendiculaire",
          text: "Quel instrument est très utile pour tracer une droite perpendiculaire ?",
          correct: "une équerre",
          explanation:
            "L’équerre permet de construire un angle droit, donc elle est très utile pour tracer une perpendiculaire.",
          canvas: droitesCanvas({
            lines: [
              {
                id: "d",
                type: "droite",
                from: { x: 65, y: 130 },
                to: { x: 280, y: 130 },
                label: "(d)",
                color: "#2563eb",
              },
              {
                id: "p",
                type: "droite",
                from: { x: 175, y: 55 },
                to: { x: 175, y: 205 },
                label: "(p)",
                color: "#16a34a",
                dashed: true,
              },
            ],
            intersections: [
              { x: 175, y: 130, label: "A", color: "#f97316", highlight: true },
            ],
            markers: {
              rightAngles: [
                {
                  x: 175,
                  y: 130,
                  lineA: "d",
                  lineB: "p",
                  size: 22,
                  color: "#ef4444",
                },
              ],
            },
          }),
        },
        {
          type: "parallele",
          text: "Quels instruments peuvent aider à tracer une droite parallèle ?",
          correct: "une règle et une équerre",
          explanation:
            "La règle et l’équerre permettent de conserver la même direction pour tracer une parallèle.",
          canvas: droitesCanvas({
            lines: [
              {
                id: "d",
                type: "droite",
                from: { x: 60, y: 95 },
                to: { x: 280, y: 120 },
                label: "(d)",
                color: "#2563eb",
              },
              {
                id: "p",
                type: "droite",
                from: { x: 60, y: 160 },
                to: { x: 280, y: 185 },
                label: "(p)",
                color: "#16a34a",
                dashed: true,
              },
            ],
            markers: {
              parallels: [
                {
                  lineA: "d",
                  lineB: "p",
                  color: "#8b5cf6",
                  markCount: 1,
                },
              ],
            },
          }),
        },
      ]);

      return {
        text: item.text,
        format: "qcm",
        choices: makeChoices(item.correct, [
          "un verre doseur",
          "une balance",
          "un chronomètre",
        ]),
        expected: [item.correct],
        comparator: "mcq_exact",
        explanation: item.explanation,
        canvas: item.canvas,
      };
    },
  },

  {
    kind: "template",
    id: "cm2_droite_tracer_tpl_2_objectif",
    niveau: "cm2",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_tracer",
    difficulty: 3,
    theme: "neutral",
    hint: "Repère si on cherche un angle droit ou une même direction.",
    tags: ["cm2", "droite", "tracer", "objectif", "template", "qcm", "canvas"],
    generate: () => {
      const item = randomChoice([
        {
          correct: "former un angle droit",
          text: "Pour tracer une perpendiculaire, l’objectif est de...",
          wrongs: [
            "garder la même direction",
            "ne jamais toucher la droite",
            "tracer un cercle",
          ],
          canvas: droitesCanvas({
            lines: [
              {
                id: "d",
                type: "droite",
                from: { x: 65, y: 130 },
                to: { x: 280, y: 130 },
                label: "(d)",
                color: "#2563eb",
              },
              {
                id: "p",
                type: "droite",
                from: { x: 175, y: 55 },
                to: { x: 175, y: 205 },
                label: "(p)",
                color: "#16a34a",
                dashed: true,
              },
            ],
            intersections: [
              { x: 175, y: 130, label: "A", color: "#f97316", highlight: true },
            ],
            markers: {
              rightAngles: [
                {
                  x: 175,
                  y: 130,
                  lineA: "d",
                  lineB: "p",
                  size: 22,
                  color: "#ef4444",
                },
              ],
            },
          }),
          explanation:
            "Pour tracer une perpendiculaire, on doit obtenir un angle droit avec la droite donnée.",
        },
        {
          correct: "garder la même direction",
          text: "Pour tracer une parallèle, l’objectif est de...",
          wrongs: [
            "former un angle droit",
            "couper la droite donnée",
            "changer de direction",
          ],
          canvas: droitesCanvas({
            lines: [
              {
                id: "d",
                type: "droite",
                from: { x: 60, y: 95 },
                to: { x: 280, y: 120 },
                label: "(d)",
                color: "#2563eb",
              },
              {
                id: "p",
                type: "droite",
                from: { x: 60, y: 160 },
                to: { x: 280, y: 185 },
                label: "(p)",
                color: "#16a34a",
                dashed: true,
              },
            ],
            markers: {
              parallels: [
                {
                  lineA: "d",
                  lineB: "p",
                  color: "#8b5cf6",
                  markCount: 1,
                },
              ],
            },
          }),
          explanation:
            "Pour tracer une parallèle, on doit garder la même direction que la droite donnée.",
        },
      ]);

      return {
        text: item.text,
        format: "qcm",
        choices: makeChoices(item.correct, item.wrongs),
        expected: [item.correct],
        comparator: "mcq_exact",
        explanation: item.explanation,
        canvas: item.canvas,
      };
    },
  },
    // ============================================================
  // DROITE_DEFI
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_droite_defi_fixed_1_parallele_ou_perpendiculaire",
    niveau: "cm2",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Les droites (d) et (e) sont-elles parallèles ou perpendiculaires ?",
    format: "qcm",
    choices: ["parallèles", "perpendiculaires", "ni l’un ni l’autre", "impossible"],
    expected: ["perpendiculaires"],
    comparator: "mcq_exact",
    hint: "Cherche le codage de l’angle droit.",
    explanation:
      "Les droites (d) et (e) se coupent en formant un angle droit. " +
      "Elles sont donc perpendiculaires.",
    tags: ["cm2", "droite", "defi", "parallele", "perpendiculaire", "qcm", "canvas"],
    canvas: droitesCanvas({
      lines: [
        {
          id: "d",
          type: "droite",
          from: { x: 60, y: 125 },
          to: { x: 280, y: 125 },
          label: "(d)",
          color: "#2563eb",
        },
        {
          id: "e",
          type: "droite",
          from: { x: 175, y: 45 },
          to: { x: 175, y: 205 },
          label: "(e)",
          color: "#16a34a",
        },
      ],
      intersections: [
        { x: 175, y: 125, label: "O", color: "#f97316", highlight: true },
      ],
      markers: {
        rightAngles: [
          {
            x: 175,
            y: 125,
            lineA: "d",
            lineB: "e",
            size: 22,
            color: "#ef4444",
          },
        ],
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_droite_defi_fixed_2_paralleles_reconnaitre",
    niveau: "cm2",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Les droites (a) et (b) sont-elles parallèles ou perpendiculaires ?",
    format: "qcm",
    choices: ["parallèles", "perpendiculaires", "sécantes non perpendiculaires", "segments"],
    expected: ["parallèles"],
    comparator: "mcq_exact",
    hint: "Elles gardent la même direction.",
    explanation:
      "Les droites (a) et (b) ont la même direction et gardent le même écart. " +
      "Elles ne se coupent pas : elles sont parallèles.",
    tags: ["cm2", "droite", "defi", "parallele", "qcm", "canvas"],
    canvas: droitesCanvas({
      lines: [
        {
          id: "a",
          type: "droite",
          from: { x: 55, y: 85 },
          to: { x: 285, y: 115 },
          label: "(a)",
          color: "#2563eb",
        },
        {
          id: "b",
          type: "droite",
          from: { x: 55, y: 150 },
          to: { x: 285, y: 180 },
          label: "(b)",
          color: "#2563eb",
        },
      ],
      markers: {
        parallels: [
          {
            lineA: "a",
            lineB: "b",
            color: "#8b5cf6",
            markCount: 1,
          },
        ],
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_droite_defi_fixed_3_sécantes_non_perpendiculaires",
    niveau: "cm2",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Les deux droites représentées sont...",
    format: "qcm",
    choices: [
      "sécantes mais non perpendiculaires",
      "parallèles",
      "perpendiculaires",
      "des demi-droites",
    ],
    expected: ["sécantes mais non perpendiculaires"],
    comparator: "mcq_exact",
    hint: "Elles se coupent, mais il n’y a pas d’angle droit.",
    explanation:
      "Ces deux droites se coupent : elles sont donc sécantes. " +
      "Mais elles ne forment pas d’angle droit, donc elles ne sont pas perpendiculaires.",
    tags: ["cm2", "droite", "defi", "secantes", "non_perpendiculaires", "qcm", "canvas"],
    canvas: droitesCanvas({
      lines: [
        {
          id: "d",
          type: "droite",
          from: { x: 70, y: 175 },
          to: { x: 270, y: 80 },
          label: "(d)",
          color: "#2563eb",
        },
        {
          id: "e",
          type: "droite",
          from: { x: 75, y: 70 },
          to: { x: 270, y: 170 },
          label: "(e)",
          color: "#16a34a",
        },
      ],
      intersections: [
        { x: 170, y: 128, label: "O", color: "#f97316", highlight: true },
      ],
      display: {
        showRightAngleMarkers: false,
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_droite_defi_fixed_4_point_intersection",
    niveau: "cm2",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Quel est le point d’intersection des droites (d) et (e) ?",
    format: "qcm",
    choices: ["O", "A", "B", "il n’y en a pas"],
    expected: ["O"],
    comparator: "mcq_exact",
    hint: "Le point d’intersection est le point commun aux deux droites.",
    explanation:
      "Le point d’intersection est le point où les deux droites se coupent. " +
      "Sur la figure, les droites (d) et (e) se coupent au point O.",
    tags: ["cm2", "droite", "defi", "intersection", "qcm", "canvas"],
    canvas: droitesCanvas({
      lines: [
        {
          id: "d",
          type: "droite",
          from: { x: 70, y: 175 },
          to: { x: 270, y: 75 },
          label: "(d)",
          color: "#2563eb",
        },
        {
          id: "e",
          type: "droite",
          from: { x: 70, y: 75 },
          to: { x: 270, y: 175 },
          label: "(e)",
          color: "#16a34a",
        },
      ],
      points: [
        { x: 115, y: 152, label: "A", color: "#ef4444" },
        { x: 225, y: 152, label: "B", color: "#ef4444" },
      ],
      intersections: [
        { x: 170, y: 125, label: "O", color: "#f97316", highlight: true },
      ],
    }),
  },

  {
    kind: "fixed",
    id: "cm2_droite_defi_fixed_5_plusieurs_droites",
    niveau: "cm2",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Dans la figure, quelles droites sont parallèles ?",
    format: "qcm",
    choices: ["(d1) et (d2)", "(d1) et (d3)", "(d2) et (d3)", "aucune"],
    expected: ["(d1) et (d2)"],
    comparator: "mcq_exact",
    hint: "Cherche les deux droites qui gardent la même direction.",
    explanation:
      "Les droites (d1) et (d2) ont la même direction et gardent le même écart. " +
      "La droite (d3), elle, coupe les autres. Donc (d1) et (d2) sont parallèles.",
    tags: ["cm2", "droite", "defi", "plusieurs_droites", "paralleles", "qcm", "canvas"],
    canvas: droitesCanvas({
      lines: [
        {
          id: "d1",
          type: "droite",
          from: { x: 55, y: 80 },
          to: { x: 285, y: 105 },
          label: "(d1)",
          color: "#2563eb",
        },
        {
          id: "d2",
          type: "droite",
          from: { x: 55, y: 145 },
          to: { x: 285, y: 170 },
          label: "(d2)",
          color: "#2563eb",
        },
        {
          id: "d3",
          type: "droite",
          from: { x: 95, y: 205 },
          to: { x: 240, y: 45 },
          label: "(d3)",
          color: "#16a34a",
        },
      ],
      markers: {
        parallels: [
          {
            lineA: "d1",
            lineB: "d2",
            color: "#8b5cf6",
            markCount: 1,
          },
        ],
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_droite_defi_fixed_6_plusieurs_perpendiculaires",
    niveau: "cm2",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Dans la figure, quelles droites sont perpendiculaires ?",
    format: "qcm",
    choices: ["(d1) et (d3)", "(d1) et (d2)", "(d2) et (d3)", "aucune"],
    expected: ["(d1) et (d3)"],
    comparator: "mcq_exact",
    hint: "Cherche le petit carré rouge.",
    explanation:
      "Le codage rouge indique un angle droit entre (d1) et (d3). " +
      "Ces deux droites sont donc perpendiculaires.",
    tags: ["cm2", "droite", "defi", "plusieurs_droites", "perpendiculaires", "qcm", "canvas"],
    canvas: droitesCanvas({
      lines: [
        {
          id: "d1",
          type: "droite",
          from: { x: 60, y: 125 },
          to: { x: 280, y: 125 },
          label: "(d1)",
          color: "#2563eb",
        },
        {
          id: "d2",
          type: "droite",
          from: { x: 60, y: 180 },
          to: { x: 280, y: 150 },
          label: "(d2)",
          color: "#8b5cf6",
        },
        {
          id: "d3",
          type: "droite",
          from: { x: 175, y: 45 },
          to: { x: 175, y: 205 },
          label: "(d3)",
          color: "#16a34a",
        },
      ],
      intersections: [
        { x: 175, y: 125, label: "O", color: "#f97316", highlight: true },
      ],
      markers: {
        rightAngles: [
          {
            x: 175,
            y: 125,
            lineA: "d1",
            lineB: "d3",
            size: 22,
            color: "#ef4444",
          },
        ],
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_droite_defi_fixed_7_reunion_plan_ville",
    niveau: "cm2",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_defi",
    difficulty: 5,
    theme: "reunion",
    text: "Sur ce plan simplifié, la Rue 1 et la Rue 2 se croisent à angle droit. Que peut-on dire ?",
    format: "qcm",
    choices: [
      "elles sont perpendiculaires",
      "elles sont parallèles",
      "elles ne se coupent jamais",
      "elles sont des segments égaux",
    ],
    expected: ["elles sont perpendiculaires"],
    comparator: "mcq_exact",
    hint: "Angle droit = perpendicularité.",
    explanation:
      "Deux droites qui se croisent à angle droit sont perpendiculaires. " +
      "Ici, les deux rues se croisent avec un angle droit.",
    tags: ["cm2", "droite", "defi", "reunion", "plan", "perpendiculaires", "qcm", "canvas"],
    canvas: droitesCanvas({
      lines: [
        {
          id: "rue1",
          type: "droite",
          from: { x: 55, y: 125 },
          to: { x: 285, y: 125 },
          label: "Rue 1",
          color: "#2563eb",
        },
        {
          id: "rue2",
          type: "droite",
          from: { x: 175, y: 45 },
          to: { x: 175, y: 205 },
          label: "Rue 2",
          color: "#16a34a",
        },
      ],
      intersections: [
        { x: 175, y: 125, label: "O", color: "#f97316", highlight: true },
      ],
      markers: {
        rightAngles: [
          {
            x: 175,
            y: 125,
            lineA: "rue1",
            lineB: "rue2",
            size: 22,
            color: "#ef4444",
          },
        ],
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_droite_defi_fixed_8_erreur_confusion",
    niveau: "cm2",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Un élève dit : “Ces droites sont perpendiculaires car elles ne se coupent pas.” A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Des droites qui ne se coupent pas sont plutôt parallèles.",
    explanation:
      "Non. Des droites perpendiculaires doivent se couper en formant un angle droit. " +
      "Si deux droites ne se coupent pas, elles peuvent être parallèles, mais pas perpendiculaires entre elles.",
    tags: ["cm2", "droite", "defi", "erreur", "confusion", "qcm", "canvas"],
    canvas: droitesCanvas({
      lines: [
        {
          id: "d",
          type: "droite",
          from: { x: 60, y: 90 },
          to: { x: 280, y: 90 },
          label: "(d)",
          color: "#2563eb",
        },
        {
          id: "e",
          type: "droite",
          from: { x: 60, y: 155 },
          to: { x: 280, y: 155 },
          label: "(e)",
          color: "#2563eb",
        },
      ],
      markers: {
        parallels: [
          {
            lineA: "d",
            lineB: "e",
            color: "#8b5cf6",
            markCount: 1,
          },
        ],
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_droite_defi_fixed_9_open_comparer",
    niveau: "cm2",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Explique la différence entre deux droites parallèles et deux droites perpendiculaires.",
    format: "open",
    expected: ["parallèles", "perpendiculaires", "coupent", "angle droit"],
    comparator: "contains_keyword",
    hint: "Parle du fait qu’elles se coupent ou non.",
    explanation:
      "Deux droites parallèles gardent la même direction et ne se coupent pas. " +
      "Deux droites perpendiculaires se coupent en formant un angle droit.",
    tags: ["cm2", "droite", "defi", "open", "parallele", "perpendiculaire"],
  },

  {
    kind: "fixed",
    id: "cm2_droite_defi_fixed_10_open_notation",
    niveau: "cm2",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Explique la différence entre (AB), [AB] et [AB).",
    format: "open",
    expected: ["droite", "segment", "demi-droite", "extrémités"],
    comparator: "contains_keyword",
    hint: "Regarde les parenthèses et les crochets.",
    explanation:
      "(AB) désigne la droite qui passe par A et B. " +
      "[AB] désigne le segment limité par A et B. " +
      "[AB) désigne la demi-droite qui part de A et passe par B.",
    tags: ["cm2", "droite", "defi", "open", "notation"],
  },

  {
    kind: "template",
    id: "cm2_droite_defi_tpl_1_type_relation",
    niveau: "cm2",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Repère si les droites se coupent, et si l’angle est droit.",
    tags: ["cm2", "droite", "defi", "relation", "template", "qcm", "canvas"],
    generate: () => {
      const type = randomChoice(["paralleles", "perpendiculaires", "secantes"] as const);

      if (type === "paralleles") {
        return {
          text: "Quelle relation reconnais-tu entre les deux droites ?",
          format: "qcm",
          choices: shuffle([
            "elles sont parallèles",
            "elles sont perpendiculaires",
            "elles sont sécantes non perpendiculaires",
            "ce sont deux points",
          ]),
          expected: ["elles sont parallèles"],
          comparator: "mcq_exact",
          explanation:
            "Les deux droites ont la même direction et ne se coupent pas. " +
            "Elles sont parallèles.",
          canvas: droitesCanvas({
            lines: [
              {
                id: "d",
                type: "droite",
                from: { x: 55, y: 85 },
                to: { x: 285, y: 110 },
                label: "(d)",
                color: "#2563eb",
              },
              {
                id: "e",
                type: "droite",
                from: { x: 55, y: 150 },
                to: { x: 285, y: 175 },
                label: "(e)",
                color: "#2563eb",
              },
            ],
            markers: {
              parallels: [
                {
                  lineA: "d",
                  lineB: "e",
                  color: "#8b5cf6",
                  markCount: 1,
                },
              ],
            },
          }),
        };
      }

      if (type === "perpendiculaires") {
        return {
          text: "Quelle relation reconnais-tu entre les deux droites ?",
          format: "qcm",
          choices: shuffle([
            "elles sont parallèles",
            "elles sont perpendiculaires",
            "elles sont sécantes non perpendiculaires",
            "ce sont deux segments égaux",
          ]),
          expected: ["elles sont perpendiculaires"],
          comparator: "mcq_exact",
          explanation:
            "Les deux droites se coupent en formant un angle droit. " +
            "Elles sont perpendiculaires.",
          canvas: droitesCanvas({
            lines: [
              {
                id: "d",
                type: "droite",
                from: { x: 60, y: 125 },
                to: { x: 280, y: 125 },
                label: "(d)",
                color: "#2563eb",
              },
              {
                id: "e",
                type: "droite",
                from: { x: 175, y: 45 },
                to: { x: 175, y: 205 },
                label: "(e)",
                color: "#16a34a",
              },
            ],
            intersections: [
              { x: 175, y: 125, label: "O", color: "#f97316", highlight: true },
            ],
            markers: {
              rightAngles: [
                {
                  x: 175,
                  y: 125,
                  lineA: "d",
                  lineB: "e",
                  size: 22,
                  color: "#ef4444",
                },
              ],
            },
          }),
        };
      }

      return {
        text: "Quelle relation reconnais-tu entre les deux droites ?",
        format: "qcm",
        choices: shuffle([
          "elles sont parallèles",
          "elles sont perpendiculaires",
          "elles sont sécantes non perpendiculaires",
          "ce sont deux demi-droites",
        ]),
        expected: ["elles sont sécantes non perpendiculaires"],
        comparator: "mcq_exact",
        explanation:
          "Les deux droites se coupent, donc elles sont sécantes. " +
          "Mais elles ne forment pas un angle droit : elles ne sont pas perpendiculaires.",
        canvas: droitesCanvas({
          lines: [
            {
              id: "d",
              type: "droite",
              from: { x: 70, y: 175 },
              to: { x: 270, y: 80 },
              label: "(d)",
              color: "#2563eb",
            },
            {
              id: "e",
              type: "droite",
              from: { x: 75, y: 70 },
              to: { x: 270, y: 170 },
              label: "(e)",
              color: "#16a34a",
            },
          ],
          intersections: [
            { x: 170, y: 128, label: "O", color: "#f97316", highlight: true },
          ],
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_droite_defi_tpl_2_point_intersection",
    niveau: "cm2",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Le point d’intersection est le point commun aux deux droites.",
    tags: ["cm2", "droite", "defi", "intersection", "template", "qcm", "canvas"],
    generate: () => {
      const label = randomChoice(["O", "I", "M"]);
      const wrongs = ["A", "B", "C", "il n’y en a pas"].filter((w) => w !== label);

      return {
        text: "Quel est le point d’intersection des deux droites ?",
        format: "qcm",
        choices: makeChoices(label, wrongs),
        expected: [label],
        comparator: "mcq_exact",
        explanation:
          `Les deux droites se coupent au point ${label}. ` +
          `Le point ${label} est donc leur point d’intersection.`,
        canvas: droitesCanvas({
          lines: [
            {
              id: "d",
              type: "droite",
              from: { x: 70, y: 175 },
              to: { x: 270, y: 75 },
              label: "(d)",
              color: "#2563eb",
            },
            {
              id: "e",
              type: "droite",
              from: { x: 70, y: 75 },
              to: { x: 270, y: 175 },
              label: "(e)",
              color: "#16a34a",
            },
          ],
          intersections: [
            { x: 170, y: 125, label, color: "#f97316", highlight: true },
          ],
          points: [
            { x: 115, y: 152, label: "A", color: "#ef4444" },
            { x: 225, y: 152, label: "B", color: "#ef4444" },
          ],
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_droite_defi_tpl_3_erreur",
    niveau: "cm2",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Vérifie la définition exacte.",
    tags: ["cm2", "droite", "defi", "erreur", "template", "qcm", "canvas"],
    generate: () => {
      const item = randomChoice([
        {
          text: "Un élève dit : “Deux droites parallèles se coupent en angle droit.” A-t-il raison ?",
          expected: "non",
          explanation:
            "Non. Deux droites parallèles ne se coupent pas. " +
            "Des droites qui se coupent en angle droit sont perpendiculaires.",
          canvas: droitesCanvas({
            lines: [
              {
                id: "d",
                type: "droite",
                from: { x: 60, y: 90 },
                to: { x: 280, y: 90 },
                label: "(d)",
                color: "#2563eb",
              },
              {
                id: "e",
                type: "droite",
                from: { x: 60, y: 155 },
                to: { x: 280, y: 155 },
                label: "(e)",
                color: "#2563eb",
              },
            ],
            markers: {
              parallels: [
                {
                  lineA: "d",
                  lineB: "e",
                  color: "#8b5cf6",
                  markCount: 1,
                },
              ],
            },
          }),
        },
        {
          text: "Un élève dit : “Deux droites perpendiculaires ne se coupent jamais.” A-t-il raison ?",
          expected: "non",
          explanation:
            "Non. Deux droites perpendiculaires se coupent toujours. " +
            "Elles forment un angle droit.",
          canvas: droitesCanvas({
            lines: [
              {
                id: "d",
                type: "droite",
                from: { x: 60, y: 125 },
                to: { x: 280, y: 125 },
                label: "(d)",
                color: "#2563eb",
              },
              {
                id: "e",
                type: "droite",
                from: { x: 175, y: 45 },
                to: { x: 175, y: 205 },
                label: "(e)",
                color: "#16a34a",
              },
            ],
            intersections: [
              { x: 175, y: 125, label: "O", color: "#f97316", highlight: true },
            ],
            markers: {
              rightAngles: [
                {
                  x: 175,
                  y: 125,
                  lineA: "d",
                  lineB: "e",
                  size: 22,
                  color: "#ef4444",
                },
              ],
            },
          }),
        },
      ]);

      return {
        text: item.text,
        format: "qcm",
        choices: ["oui", "non"],
        expected: [item.expected],
        comparator: "mcq_exact",
        explanation: item.explanation,
        canvas: item.canvas,
      };
    },
  },

  {
    kind: "template",
    id: "cm2_droite_defi_tpl_4_notation",
    niveau: "cm2",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Observe les parenthèses et les crochets.",
    tags: ["cm2", "droite", "defi", "notation", "template", "qcm", "canvas"],
    generate: () => {
      const item = randomChoice([
        {
          notation: "(AB)",
          correct: "une droite",
          type: "droite" as const,
          color: "#2563eb",
          explanation:
            "(AB) désigne la droite passant par A et B. Elle se prolonge dans les deux sens.",
        },
        {
          notation: "[AB]",
          correct: "un segment",
          type: "segment" as const,
          color: "#16a34a",
          explanation:
            "[AB] désigne le segment d’extrémités A et B. Il est limité par deux points.",
        },
        {
          notation: "[AB)",
          correct: "une demi-droite",
          type: "demi_droite" as const,
          color: "#8b5cf6",
          explanation:
            "[AB) désigne la demi-droite d’origine A passant par B. Elle part de A et continue dans un sens.",
        },
      ]);

      return {
        text: `Que représente la notation ${item.notation} ?`,
        format: "qcm",
        choices: shuffle(["une droite", "un segment", "une demi-droite", "un angle droit"]),
        expected: [item.correct],
        comparator: "mcq_exact",
        explanation: item.explanation,
        canvas: droitesCanvas({
          lines: [
            {
              id: "AB",
              type: item.type,
              from: { x: 85, y: 150 },
              to: { x: 255, y: 90 },
              label: item.notation,
              color: item.color,
            },
          ],
          points: [
            { x: 85, y: 150, label: "A", color: "#ef4444", highlight: item.type !== "droite" },
            { x: 255, y: 90, label: "B", color: "#ef4444", highlight: item.type === "segment" },
          ],
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_droite_defi_tpl_5_reunion_routes",
    niveau: "cm2",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_defi",
    difficulty: 5,
    theme: "reunion",
    hint: "Sur un plan, les rues peuvent représenter des droites.",
    tags: ["cm2", "droite", "defi", "reunion", "routes", "template", "qcm", "canvas"],
    generate: () => {
      const type = randomChoice(["paralleles", "perpendiculaires"] as const);

      if (type === "paralleles") {
        return {
          text: "Sur un plan simplifié, deux rues droites gardent le même écart et ne se croisent pas. Elles sont...",
          format: "qcm",
          choices: shuffle(["parallèles", "perpendiculaires", "sécantes", "des angles"]),
          expected: ["parallèles"],
          comparator: "mcq_exact",
          explanation:
            "Deux droites qui gardent la même direction et ne se coupent pas sont parallèles. " +
            "Sur le plan, les deux rues sont donc parallèles.",
          canvas: droitesCanvas({
            lines: [
              {
                id: "rue1",
                type: "droite",
                from: { x: 55, y: 90 },
                to: { x: 285, y: 115 },
                label: "Rue 1",
                color: "#2563eb",
              },
              {
                id: "rue2",
                type: "droite",
                from: { x: 55, y: 150 },
                to: { x: 285, y: 175 },
                label: "Rue 2",
                color: "#2563eb",
              },
            ],
            markers: {
              parallels: [
                {
                  lineA: "rue1",
                  lineB: "rue2",
                  color: "#8b5cf6",
                  markCount: 1,
                },
              ],
            },
          }),
        };
      }

      return {
        text: "Sur un plan simplifié, deux rues droites se croisent à angle droit. Elles sont...",
        format: "qcm",
        choices: shuffle(["parallèles", "perpendiculaires", "sécantes sans angle droit", "des segments égaux"]),
        expected: ["perpendiculaires"],
        comparator: "mcq_exact",
        explanation:
          "Deux droites qui se coupent en formant un angle droit sont perpendiculaires. " +
          "Sur le plan, les deux rues sont donc perpendiculaires.",
        canvas: droitesCanvas({
          lines: [
            {
              id: "rue1",
              type: "droite",
              from: { x: 60, y: 125 },
              to: { x: 280, y: 125 },
              label: "Rue 1",
              color: "#2563eb",
            },
            {
              id: "rue2",
              type: "droite",
              from: { x: 175, y: 45 },
              to: { x: 175, y: 205 },
              label: "Rue 2",
              color: "#16a34a",
            },
          ],
          intersections: [
            { x: 175, y: 125, label: "O", color: "#f97316", highlight: true },
          ],
          markers: {
            rightAngles: [
              {
                x: 175,
                y: 125,
                lineA: "rue1",
                lineB: "rue2",
                size: 22,
                color: "#ef4444",
              },
            ],
          },
        }),
      };
    },
  },
];
