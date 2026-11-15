// lib/tutor-v4/question-banks/maths/cm2/droites.bank.ts

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { gabaritsDroitesCm2 } from "./droites-outils";

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
      "une gomme seule",
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


  // ⭐ 15/11/2026 — gabarits SITUATION × TOURNURE × FIGURE (droites-outils.ts)
  ...gabaritsDroitesCm2,
];
