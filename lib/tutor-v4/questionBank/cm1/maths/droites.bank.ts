// lib/tutor-v4/question-banks/maths/cm1/droites.bank.ts

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
  {
    kind: "fixed",
    id: "cm1_droite_reconnaitre_fixed_g1",
    niveau: "cm1",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    text: "Une droite est une ligne qui...",
    format: "qcm",
    choices: ["se prolonge sans fin des deux côtés","a deux extrémités","a une seule origine","forme un carré"],
    expected: ["se prolonge sans fin des deux côtés"],
    comparator: "mcq_exact",
    hint: "Une droite ne s'arrête pas.",
    explanation: "Une droite n'a pas de bout : elle continue sans fin dans les deux sens (contrairement au segment).",
    tags: ["cm1","droite","droite_reconnaitre","guide","qcm"],
  },
  {
    kind: "fixed",
    id: "cm1_droite_parallele_fixed_g1",
    niveau: "cm1",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_parallele",
    difficulty: 1,
    theme: "neutral",
    text: "Deux droites parallèles...",
    format: "qcm",
    choices: ["ne se coupent jamais","se coupent en angle droit","ont un seul point commun","forment un triangle"],
    expected: ["ne se coupent jamais"],
    comparator: "mcq_exact",
    hint: "Elles gardent toujours le même écart.",
    explanation: "Deux droites parallèles gardent le même écart et ne se coupent jamais.",
    tags: ["cm1","droite","droite_parallele","guide","qcm"],
  },
  {
    kind: "fixed",
    id: "cm1_droite_perpendiculaire_fixed_g1",
    niveau: "cm1",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_perpendiculaire",
    difficulty: 2,
    theme: "neutral",
    text: "Deux droites perpendiculaires se coupent en formant...",
    format: "qcm",
    choices: ["un angle droit","un angle aigu","un cercle","un segment"],
    expected: ["un angle droit"],
    comparator: "mcq_exact",
    hint: "Perpendiculaire fait penser à angle droit.",
    explanation: "Deux droites perpendiculaires se coupent en formant un angle droit (90°), souvent codé par un petit carré.",
    tags: ["cm1","droite","droite_perpendiculaire","guide","qcm"],
  },
  {
    kind: "fixed",
    id: "cm1_droite_tracer_fixed_g1",
    niveau: "cm1",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_tracer",
    difficulty: 2,
    theme: "neutral",
    text: "Pour tracer une droite perpendiculaire à une autre, quel instrument utilise-t-on ?",
    format: "qcm",
    choices: ["l'équerre","seulement la règle","le compas","le rapporteur"],
    expected: ["l'équerre"],
    comparator: "mcq_exact",
    hint: "Cet instrument a un angle droit.",
    explanation: "L'équerre a un angle droit : elle sert à tracer les perpendiculaires et les parallèles.",
    tags: ["cm1","droite","droite_tracer","guide","qcm"],
  },
  {
    kind: "fixed",
    id: "cm1_droite_defi_fixed_g1",
    niveau: "cm1",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_defi",
    difficulty: 3,
    theme: "neutral",
    text: "Les deux rails d'une voie ferrée gardent toujours le même écart et ne se croisent jamais. Ils forment deux droites...",
    format: "qcm",
    choices: ["parallèles","perpendiculaires","sécantes","brisées"],
    expected: ["parallèles"],
    comparator: "mcq_exact",
    hint: "Même écart et jamais de croisement.",
    explanation: "Même écart + jamais de croisement = droites parallèles.",
    tags: ["cm1","droite","droite_defi","guide","qcm"],
  },

  // ============================================================
  // DROITE_RECONNAITRE
  // Reconnaître des droites, segments et demi-droites
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_droite_reconnaitre_fixed_001_definition_droite",
    niveau: "cm1",
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
      "qui forme toujours un angle droit",
      "qui mesure toujours 10 cm",
    ],
    expected: ["qui se prolonge sans fin des deux côtés"],
    comparator: "mcq_exact",
    hint: "Une droite ne s’arrête pas.",
    explanation:
      "Une droite est une ligne qui continue sans fin dans les deux sens. " +
      "Sur un dessin, on n’en voit qu’une partie, mais on imagine qu’elle se prolonge. " +
      "C’est ce qui la différencie d’un segment.",
    tags: ["cm1", "droite", "reconnaitre", "definition", "qcm", "canvas"],
    canvas: droitesCanvas({
      lines: [
        {
          id: "d",
          type: "droite",
          from: { x: 60, y: 170 },
          to: { x: 280, y: 80 },
          label: "(d)",
          color: "#2563eb",
        },
      ],
      points: [
        { x: 120, y: 145, label: "A", color: "#ef4444" },
        { x: 220, y: 105, label: "B", color: "#ef4444" },
      ],
    }),
  },

  {
    kind: "template",
    id: "cm1_droite_reconnaitre_tpl_001_type_objet",
    niveau: "cm1",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    hint: "Observe si la figure s’arrête ou continue.",
    tags: ["cm1", "droite", "reconnaitre", "type_objet", "template", "qcm", "canvas"],
    generate: () => {
      const item = randomChoice([
        {
          type: "droite" as const,
          label: "(d)",
          color: "#2563eb",
          correct: "une droite",
          explanation:
            "Une droite se prolonge sans fin dans les deux sens. Même si le dessin est limité, on imagine qu’elle continue.",
          points: [
            { x: 130, y: 137, label: "A", color: "#ef4444" },
            { x: 210, y: 105, label: "B", color: "#ef4444" },
          ],
        },
        {
          type: "segment" as const,
          label: "[AB]",
          color: "#16a34a",
          correct: "un segment",
          explanation:
            "Un segment est limité par deux extrémités. Ici, il commence en A et se termine en B.",
          points: [
            { x: 85, y: 155, label: "A", color: "#ef4444", highlight: true },
            { x: 260, y: 85, label: "B", color: "#ef4444", highlight: true },
          ],
        },
        {
          type: "demi_droite" as const,
          label: "[AB)",
          color: "#8b5cf6",
          correct: "une demi-droite",
          explanation:
            "Une demi-droite a une origine, puis elle continue dans un seul sens. Ici, elle part de A et passe par B.",
          points: [
            { x: 85, y: 155, label: "A", color: "#ef4444", highlight: true },
            { x: 190, y: 112, label: "B", color: "#f97316" },
          ],
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
        explanation: item.explanation,
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
          points: item.points,
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_droite_reconnaitre_tpl_002_definition_segment",
    niveau: "cm1",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    hint: "Un segment a deux extrémités.",
    tags: ["cm1", "droite", "segment", "definition", "template", "qcm", "canvas"],
    generate: () => {
      return {
        text: "Un segment est une partie de droite...",
        format: "qcm",
        choices: makeChoices("limitée par deux extrémités", [
          "qui continue sans fin des deux côtés",
          "qui a une origine et continue dans un seul sens",
          "qui forme toujours un carré",
        ]),
        expected: ["limitée par deux extrémités"],
        comparator: "mcq_exact",
        explanation:
          "Un segment est limité par deux extrémités. " +
          "Par exemple, le segment [AB] commence au point A et se termine au point B.",
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
      };
    },
  },

  {
    kind: "template",
    id: "cm1_droite_reconnaitre_tpl_003_definition_demi_droite",
    niveau: "cm1",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    hint: "Une demi-droite a un point de départ.",
    tags: ["cm1", "droite", "demi_droite", "definition", "template", "qcm", "canvas"],
    generate: () => {
      return {
        text: "Une demi-droite...",
        format: "qcm",
        choices: makeChoices("a une origine et se prolonge dans un seul sens", [
          "a toujours deux extrémités",
          "se prolonge sans fin des deux côtés",
          "est toujours perpendiculaire",
        ]),
        expected: ["a une origine et se prolonge dans un seul sens"],
        comparator: "mcq_exact",
        explanation:
          "Une demi-droite a une origine : c’est son point de départ. " +
          "Ensuite, elle continue dans un seul sens. " +
          "Par exemple, [AB) part de A et passe par B.",
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
      };
    },
  },

  {
    kind: "template",
    id: "cm1_droite_reconnaitre_tpl_004_notation",
    niveau: "cm1",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    hint: "Parenthèses : droite. Crochets : segment. Crochet-parenthèse : demi-droite.",
    tags: ["cm1", "droite", "notation", "template", "qcm", "canvas"],
    generate: () => {
      const item = randomChoice([
        {
          notation: "(AB)",
          correct: "la droite passant par A et B",
          type: "droite" as const,
          color: "#2563eb",
          explanation:
            "La notation (AB), avec des parenthèses, désigne la droite passant par A et B.",
        },
        {
          notation: "[AB]",
          correct: "le segment d’extrémités A et B",
          type: "segment" as const,
          color: "#16a34a",
          explanation:
            "La notation [AB], avec des crochets, désigne le segment d’extrémités A et B.",
        },
        {
          notation: "[AB)",
          correct: "la demi-droite d’origine A passant par B",
          type: "demi_droite" as const,
          color: "#8b5cf6",
          explanation:
            "La notation [AB), avec un crochet puis une parenthèse, désigne la demi-droite d’origine A passant par B.",
        },
      ]);

      return {
        text: `Que désigne la notation ${item.notation} ?`,
        format: "qcm",
        choices: makeChoices(item.correct, [
          "la droite passant par A et B",
          "le segment d’extrémités A et B",
          "la demi-droite d’origine A passant par B",
          "un angle droit",
        ]),
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
    id: "cm1_droite_reconnaitre_tpl_005_difference_droite_segment",
    niveau: "cm1",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    hint: "Le segment s’arrête. La droite continue.",
    tags: ["cm1", "droite", "segment", "difference", "template", "qcm", "canvas"],
    generate: () => {
      return {
        text: "Quelle est la différence principale entre une droite et un segment ?",
        format: "qcm",
        choices: makeChoices("une droite se prolonge sans fin, un segment a deux extrémités", [
          "une droite est toujours rouge",
          "un segment continue sans fin des deux côtés",
          "une droite est toujours verticale",
        ]),
        expected: ["une droite se prolonge sans fin, un segment a deux extrémités"],
        comparator: "mcq_exact",
        explanation:
          "Une droite ne s’arrête pas : on imagine qu’elle continue dans les deux sens. " +
          "Un segment, lui, est limité par deux extrémités. " +
          "C’est la différence essentielle.",
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
            { x: 90, y: 160, label: "A", color: "#ef4444", highlight: true },
            { x: 250, y: 160, label: "B", color: "#ef4444", highlight: true },
          ],
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_droite_reconnaitre_tpl_006_erreur_segment_infini",
    niveau: "cm1",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    hint: "Un segment a deux extrémités.",
    tags: ["cm1", "droite", "segment", "erreur", "template", "qcm", "canvas"],
    generate: () => {
      return {
        text: "Un élève dit : “Le segment [AB] continue sans fin des deux côtés.” A-t-il raison ?",
        format: "qcm",
        choices: ["non", "oui"],
        expected: ["non"],
        comparator: "mcq_exact",
        explanation:
          "L’élève confond droite et segment. " +
          "Un segment a deux extrémités : il commence en A et se termine en B. " +
          "C’est une droite qui continue sans fin des deux côtés.",
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
      };
    },
  },

  {
    kind: "template",
    id: "cm1_droite_reconnaitre_tpl_007_intersection",
    niveau: "cm1",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    hint: "L’intersection est le point où deux lignes se coupent.",
    tags: ["cm1", "droite", "intersection", "vocabulaire", "template", "qcm", "canvas"],
    generate: () => {
      return {
        text: "Le point où deux droites se coupent s’appelle...",
        format: "qcm",
        choices: makeChoices("un point d’intersection", [
          "un périmètre",
          "une fraction",
          "une contenance",
        ]),
        expected: ["un point d’intersection"],
        comparator: "mcq_exact",
        explanation:
          "Quand deux droites se coupent, elles ont un point commun. " +
          "Ce point commun s’appelle un point d’intersection. " +
          "Sur la figure, les deux droites se coupent en O.",
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
      };
    },
  },

  {
    kind: "template",
    id: "cm1_droite_reconnaitre_tpl_008_reunion_routes",
    niveau: "cm1",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_reconnaitre",
    difficulty: 2,
    theme: "reunion",
    hint: "Un plan simplifié peut représenter des routes avec des lignes droites.",
    tags: ["cm1", "droite", "reconnaitre", "reunion", "routes", "template", "qcm", "canvas"],
    generate: () => {
      const lieu = randomChoice([
        "Saint-Pierre",
        "Le Tampon",
        "Saint-Joseph",
        "L’Étang-Salé",
      ]);

      return {
        text: `Sur un plan simplifié de ${lieu}, une rue bien droite peut être représentée par...`,
        format: "qcm",
        choices: makeChoices("une droite ou un segment", [
          "une masse",
          "une durée",
          "une contenance",
        ]),
        expected: ["une droite ou un segment"],
        comparator: "mcq_exact",
        explanation:
          `Sur un plan simplifié de ${lieu}, on peut représenter une rue droite par une droite ou par un segment. ` +
          "Cela dépend si on veut montrer une route qui continue ou seulement une partie de la route.",
        canvas: droitesCanvas({
          lines: [
            {
              id: "rue",
              type: "segment",
              from: { x: 65, y: 150 },
              to: { x: 280, y: 90 },
              label: "Rue",
              color: "#2563eb",
            },
          ],
          points: [
            { x: 65, y: 150, label: "Début", color: "#ef4444" },
            { x: 280, y: 90, label: "Fin", color: "#ef4444" },
          ],
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_droite_reconnaitre_tpl_009_open_difference",
    niveau: "cm1",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    hint: "Explique ce qui continue ou ce qui s’arrête.",
    tags: ["cm1", "droite", "reconnaitre", "open", "difference", "template"],
    generate: () => {
      return {
        text: "Explique avec tes mots la différence entre une droite, un segment et une demi-droite.",
        format: "open",
        expected: ["droite", "segment", "demi", "extrémités"],
        comparator: "contains_keyword",
        explanation:
          "Réponse possible : une droite continue sans fin dans les deux sens. " +
          "Un segment a deux extrémités : il commence et il s’arrête. " +
          "Une demi-droite a une origine et continue dans un seul sens.",
      };
    },
  },

  {
    kind: "template",
    id: "cm1_droite_reconnaitre_tpl_010_open_corriger_erreur",
    niveau: "cm1",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    hint: "Explique qu’un segment s’arrête à ses deux extrémités.",
    tags: ["cm1", "droite", "segment", "open", "erreur", "template"],
    generate: () => {
      return {
        text: "Un élève dit : “Un segment, c’est comme une droite : ça continue sans fin.” Corrige son erreur.",
        format: "open",
        expected: ["segment", "extrémités", "droite"],
        comparator: "contains_keyword",
        explanation:
          "Réponse possible : non, un segment ne continue pas sans fin. " +
          "Un segment a deux extrémités. " +
          "C’est une droite qui se prolonge sans fin dans les deux sens.",
      };
    },
  },
    // ============================================================
  // DROITE_PARALLELE
  // Reconnaître des droites parallèles
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_droite_parallele_fixed_001_definition",
    niveau: "cm1",
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
    explanation:
      "Deux droites parallèles vont dans la même direction et gardent le même écart. " +
      "Elles ne se coupent jamais, même si on les prolonge. " +
      "Sur la figure, les deux droites ont la même direction : elles sont parallèles.",
    tags: ["cm1", "droite", "parallele", "definition", "qcm", "canvas"],
    canvas: droitesCanvas({
      lines: [
        {
          id: "d",
          type: "droite",
          from: { x: 55, y: 90 },
          to: { x: 285, y: 90 },
          label: "(d)",
          color: "#2563eb",
        },
        {
          id: "e",
          type: "droite",
          from: { x: 55, y: 155 },
          to: { x: 285, y: 155 },
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
    kind: "template",
    id: "cm1_droite_parallele_tpl_001_reconnaitre_oui_non",
    niveau: "cm1",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_parallele",
    difficulty: 1,
    theme: "neutral",
    hint: "Regarde si les droites gardent le même écart ou si elles se coupent.",
    tags: ["cm1", "droite", "parallele", "reconnaitre", "template", "qcm", "canvas"],
    generate: () => {
      const isParallel = Math.random() < 0.5;

      if (isParallel) {
        return {
          text: "Les deux droites représentées sont-elles parallèles ?",
          format: "qcm",
          choices: ["oui", "non"],
          expected: ["oui"],
          comparator: "mcq_exact",
          explanation:
            "Deux droites parallèles vont dans la même direction et ne se coupent jamais. " +
            "Ici, les deux droites gardent le même écart. " +
            "Elles sont donc parallèles.",
          canvas: droitesCanvas({
            lines: [
              {
                id: "d",
                type: "droite",
                from: { x: 55, y: 85 },
                to: { x: 285, y: 105 },
                label: "(d)",
                color: "#2563eb",
              },
              {
                id: "e",
                type: "droite",
                from: { x: 55, y: 145 },
                to: { x: 285, y: 165 },
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
        explanation:
          "Deux droites parallèles ne se coupent jamais. " +
          "Ici, les deux droites se coupent en un point. " +
          "Elles ne sont donc pas parallèles.",
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
    id: "cm1_droite_parallele_tpl_002_vocabulaire",
    niveau: "cm1",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_parallele",
    difficulty: 1,
    theme: "neutral",
    hint: "Deux droites parallèles ne se rencontrent pas.",
    tags: ["cm1", "droite", "parallele", "vocabulaire", "template", "qcm", "canvas"],
    generate: () => {
      return {
        text: "Deux droites qui ne se coupent jamais sont dites...",
        format: "qcm",
        choices: makeChoices("parallèles", [
          "perpendiculaires",
          "sécantes",
          "cassées",
        ]),
        expected: ["parallèles"],
        comparator: "mcq_exact",
        explanation:
          "Deux droites parallèles ne se coupent jamais. " +
          "Elles ont la même direction et gardent le même écart. " +
          "Le mot correct est donc : parallèles.",
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
    id: "cm1_droite_parallele_tpl_003_meme_direction",
    niveau: "cm1",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_parallele",
    difficulty: 2,
    theme: "neutral",
    hint: "Même direction et même écart : parallèles.",
    tags: ["cm1", "droite", "parallele", "meme_direction", "template", "qcm", "canvas"],
    generate: () => {
      return {
        text: "Deux droites qui gardent toujours le même écart sont généralement...",
        format: "qcm",
        choices: makeChoices("parallèles", [
          "perpendiculaires",
          "des segments égaux",
          "des points",
        ]),
        expected: ["parallèles"],
        comparator: "mcq_exact",
        explanation:
          "Quand deux droites gardent toujours le même écart, elles ne vont pas se couper. " +
          "Elles ont la même direction. " +
          "On dit qu’elles sont parallèles.",
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
      };
    },
  },

  {
    kind: "template",
    id: "cm1_droite_parallele_tpl_004_non_parallel_intersection",
    niveau: "cm1",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_parallele",
    difficulty: 2,
    theme: "neutral",
    hint: "Si deux droites se coupent, elles ne sont pas parallèles.",
    tags: ["cm1", "droite", "parallele", "intersection", "template", "qcm", "canvas"],
    generate: () => {
      return {
        text: "Deux droites qui se coupent en un point peuvent-elles être parallèles ?",
        format: "qcm",
        choices: ["non", "oui"],
        expected: ["non"],
        comparator: "mcq_exact",
        explanation:
          "Deux droites parallèles ne se coupent jamais. " +
          "Si deux droites ont un point d’intersection, elles ne sont pas parallèles.",
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
      };
    },
  },

  {
    kind: "template",
    id: "cm1_droite_parallele_tpl_005_piege_couleur",
    niveau: "cm1",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_parallele",
    difficulty: 2,
    theme: "neutral",
    hint: "La couleur aide à lire, mais elle ne prouve pas le parallélisme.",
    tags: ["cm1", "droite", "parallele", "erreur", "couleur", "template", "qcm", "canvas"],
    generate: () => {
      return {
        text: "Deux droites sont-elles parallèles simplement parce qu’elles ont la même couleur ?",
        format: "qcm",
        choices: ["non", "oui"],
        expected: ["non"],
        comparator: "mcq_exact",
        explanation:
          "La couleur peut aider à lire une figure, mais elle ne prouve rien. " +
          "Pour reconnaître des droites parallèles, il faut regarder leur direction et vérifier qu’elles ne se coupent pas.",
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
      };
    },
  },

  {
    kind: "template",
    id: "cm1_droite_parallele_tpl_006_segments_supports",
    niveau: "cm1",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_parallele",
    difficulty: 3,
    theme: "neutral",
    hint: "Imagine les droites qui prolongent les segments.",
    tags: ["cm1", "droite", "parallele", "segments", "support", "template", "qcm", "canvas"],
    generate: () => {
      const isParallel = Math.random() < 0.5;

      if (isParallel) {
        return {
          text: "Les deux segments sont-ils portés par des droites parallèles ?",
          format: "qcm",
          choices: ["oui", "non"],
          expected: ["oui"],
          comparator: "mcq_exact",
          explanation:
            "Même si on voit deux segments, on peut imaginer les droites qui les prolongent. " +
            "Ici, les deux segments ont la même direction. " +
            "Ils sont donc portés par des droites parallèles.",
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
        explanation:
          "Pour savoir si deux segments sont portés par des droites parallèles, on imagine les droites qui les prolongent. " +
          "Ici, les directions sont différentes. " +
          "Les droites prolongées finiraient par se couper.",
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

  {
    kind: "template",
    id: "cm1_droite_parallele_tpl_007_reunion_routes",
    niveau: "cm1",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_parallele",
    difficulty: 2,
    theme: "reunion",
    hint: "Deux routes droites qui gardent le même écart sont parallèles.",
    tags: ["cm1", "droite", "parallele", "reunion", "routes", "template", "qcm", "canvas"],
    generate: () => {
      const lieu = randomChoice([
        "Saint-Pierre",
        "Le Tampon",
        "Saint-Joseph",
        "L’Étang-Salé",
      ]);

      return {
        text:
          `Sur un plan simplifié de ${lieu}, deux rues droites gardent toujours le même écart. ` +
          `Elles sont...`,
        format: "qcm",
        choices: makeChoices("parallèles", [
          "perpendiculaires",
          "sécantes",
          "des points",
        ]),
        expected: ["parallèles"],
        comparator: "mcq_exact",
        explanation:
          "Deux droites qui gardent le même écart et ne se coupent pas sont parallèles. " +
          `Sur le plan de ${lieu}, les deux rues ont la même direction : elles sont parallèles.`,
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
      };
    },
  },

  {
    kind: "template",
    id: "cm1_droite_parallele_tpl_008_erreur_intersection",
    niveau: "cm1",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_parallele",
    difficulty: 3,
    theme: "neutral",
    hint: "Deux droites parallèles ne se coupent jamais.",
    tags: ["cm1", "droite", "parallele", "erreur", "intersection", "template", "qcm", "canvas"],
    generate: () => {
      return {
        text: "Un élève dit : “Ces deux droites sont parallèles car elles se coupent en O.” A-t-il raison ?",
        format: "qcm",
        choices: ["non", "oui"],
        expected: ["non"],
        comparator: "mcq_exact",
        explanation:
          "L’élève se trompe. " +
          "Deux droites parallèles ne se coupent jamais. " +
          "Si deux droites se coupent en O, elles sont sécantes, pas parallèles.",
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
      };
    },
  },

  {
    kind: "template",
    id: "cm1_droite_parallele_tpl_009_open_methode",
    niveau: "cm1",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_parallele",
    difficulty: 3,
    theme: "neutral",
    hint: "Parle de même direction, même écart ou du fait qu’elles ne se coupent pas.",
    tags: ["cm1", "droite", "parallele", "open", "methode", "template"],
    generate: () => {
      return {
        text: "Explique comment reconnaître deux droites parallèles.",
        format: "open",
        expected: ["même", "direction", "écart", "coupent"],
        comparator: "contains_keyword",
        explanation:
          "Réponse possible : deux droites parallèles ont la même direction et gardent le même écart. " +
          "Même si on les prolonge, elles ne se coupent pas.",
      };
    },
  },

  {
    kind: "template",
    id: "cm1_droite_parallele_tpl_010_open_corriger_erreur",
    niveau: "cm1",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_parallele",
    difficulty: 3,
    theme: "neutral",
    hint: "Explique que deux droites qui se coupent ne sont pas parallèles.",
    tags: ["cm1", "droite", "parallele", "open", "erreur", "template"],
    generate: () => {
      return {
        text: "Un élève dit : “Deux droites qui se coupent peuvent être parallèles.” Corrige son erreur.",
        format: "open",
        expected: ["parallèles", "coupent", "jamais"],
        comparator: "contains_keyword",
        explanation:
          "Réponse possible : non, deux droites parallèles ne se coupent jamais. " +
          "Si deux droites se coupent, elles sont sécantes. Elles ne sont donc pas parallèles.",
      };
    },
  },
    // ============================================================
  // DROITE_PERPENDICULAIRE
  // Reconnaître des droites perpendiculaires
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_droite_perpendiculaire_fixed_001_definition",
    niveau: "cm1",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_perpendiculaire",
    difficulty: 1,
    theme: "neutral",
    text: "Deux droites perpendiculaires sont deux droites qui se coupent en formant...",
    format: "qcm",
    choices: [
      "un angle droit",
      "un angle aigu",
      "un cercle",
      "un segment",
    ],
    expected: ["un angle droit"],
    comparator: "mcq_exact",
    hint: "Perpendiculaire fait penser à angle droit.",
    explanation:
      "Deux droites perpendiculaires se coupent en formant un angle droit. " +
      "Sur une figure, l’angle droit est souvent codé par un petit carré. " +
      "Ici, les deux droites se coupent en O et forment un angle droit.",
    tags: ["cm1", "droite", "perpendiculaire", "definition", "qcm", "canvas"],
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
    kind: "template",
    id: "cm1_droite_perpendiculaire_tpl_001_reconnaitre_oui_non",
    niveau: "cm1",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_perpendiculaire",
    difficulty: 1,
    theme: "neutral",
    hint: "Cherche si les deux droites se coupent avec un angle droit.",
    tags: ["cm1", "droite", "perpendiculaire", "reconnaitre", "template", "qcm", "canvas"],
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
            "Le petit carré rouge indique l’angle droit. " +
            "Elles sont donc perpendiculaires.",
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
          "Pour être perpendiculaires, deux droites doivent se couper avec un angle droit.",
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
          display: {
            showRightAngleMarkers: false,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_droite_perpendiculaire_tpl_002_vocabulaire",
    niveau: "cm1",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_perpendiculaire",
    difficulty: 1,
    theme: "neutral",
    hint: "Deux droites perpendiculaires forment un angle droit.",
    tags: ["cm1", "droite", "perpendiculaire", "vocabulaire", "template", "qcm", "canvas"],
    generate: () => {
      return {
        text: "Deux droites qui se coupent en formant un angle droit sont dites...",
        format: "qcm",
        choices: makeChoices("perpendiculaires", [
          "parallèles",
          "égales",
          "arrondies",
        ]),
        expected: ["perpendiculaires"],
        comparator: "mcq_exact",
        explanation:
          "Deux droites perpendiculaires sont deux droites qui se coupent en formant un angle droit. " +
          "Le mot correct est donc : perpendiculaires.",
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
    },
  },

  {
    kind: "template",
    id: "cm1_droite_perpendiculaire_tpl_003_angle_droit_indice",
    niveau: "cm1",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_perpendiculaire",
    difficulty: 2,
    theme: "neutral",
    hint: "Le petit carré indique un angle droit.",
    tags: ["cm1", "droite", "perpendiculaire", "angle_droit", "codage", "template", "qcm", "canvas"],
    generate: () => {
      return {
        text: "Quel indice permet souvent de reconnaître deux droites perpendiculaires sur une figure ?",
        format: "qcm",
        choices: makeChoices("le codage de l’angle droit", [
          "la même couleur",
          "la longueur des noms",
          "le nombre de lettres",
        ]),
        expected: ["le codage de l’angle droit"],
        comparator: "mcq_exact",
        explanation:
          "Sur une figure, un angle droit est souvent codé par un petit carré. " +
          "Si deux droites se coupent et que ce codage apparaît, on peut reconnaître des droites perpendiculaires.",
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
      };
    },
  },

  {
    kind: "template",
    id: "cm1_droite_perpendiculaire_tpl_004_piege_couleur",
    niveau: "cm1",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_perpendiculaire",
    difficulty: 2,
    theme: "neutral",
    hint: "La couleur ne suffit pas : il faut un angle droit.",
    tags: ["cm1", "droite", "perpendiculaire", "erreur", "couleur", "template", "qcm", "canvas"],
    generate: () => {
      return {
        text: "Deux droites sont-elles perpendiculaires simplement parce qu’elles ont deux couleurs différentes ?",
        format: "qcm",
        choices: ["non", "oui"],
        expected: ["non"],
        comparator: "mcq_exact",
        explanation:
          "Non. Les couleurs servent seulement à mieux lire la figure. " +
          "Pour savoir si deux droites sont perpendiculaires, il faut vérifier qu’elles se coupent en formant un angle droit.",
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
      };
    },
  },

  {
    kind: "template",
    id: "cm1_droite_perpendiculaire_tpl_005_parallele_pas_perpendiculaire",
    niveau: "cm1",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_perpendiculaire",
    difficulty: 2,
    theme: "neutral",
    hint: "Des droites parallèles ne se coupent pas.",
    tags: ["cm1", "droite", "perpendiculaire", "parallele", "piege", "template", "qcm", "canvas"],
    generate: () => {
      return {
        text: "Deux droites parallèles peuvent-elles être perpendiculaires entre elles ?",
        format: "qcm",
        choices: ["non", "oui"],
        expected: ["non"],
        comparator: "mcq_exact",
        explanation:
          "Non. Des droites parallèles ne se coupent pas. " +
          "Pour être perpendiculaires, deux droites doivent se couper en formant un angle droit.",
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
      };
    },
  },

  {
    kind: "template",
    id: "cm1_droite_perpendiculaire_tpl_006_segments_supports",
    niveau: "cm1",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_perpendiculaire",
    difficulty: 3,
    theme: "neutral",
    hint: "Imagine les droites qui prolongent les segments.",
    tags: ["cm1", "droite", "perpendiculaire", "segments", "support", "template", "qcm", "canvas"],
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
            "Oui. Même si on voit deux segments, on peut imaginer les droites qui les prolongent. " +
            "Elles se coupent en formant un angle droit.",
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
        };
      }

      return {
        text: "Les deux segments sont-ils portés par des droites perpendiculaires ?",
        format: "qcm",
        choices: ["oui", "non"],
        expected: ["non"],
        comparator: "mcq_exact",
        explanation:
          "Non. Pour être portés par des droites perpendiculaires, les segments doivent être dans des directions qui forment un angle droit. " +
          "Ici, les directions ne forment pas un angle droit.",
        canvas: droitesCanvas({
          lines: [
            {
              id: "AB",
              type: "segment",
              from: { x: 70, y: 110 },
              to: { x: 260, y: 135 },
              label: "[AB]",
              color: "#2563eb",
            },
            {
              id: "CD",
              type: "segment",
              from: { x: 110, y: 70 },
              to: { x: 245, y: 170 },
              label: "[CD]",
              color: "#16a34a",
            },
          ],
          points: [
            { x: 70, y: 110, label: "A", color: "#ef4444" },
            { x: 260, y: 135, label: "B", color: "#ef4444" },
            { x: 110, y: 70, label: "C", color: "#f97316" },
            { x: 245, y: 170, label: "D", color: "#f97316" },
          ],
          intersections: [
            { x: 170, y: 123, label: "O", color: "#f97316", highlight: true },
          ],
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_droite_perpendiculaire_tpl_007_reunion_routes",
    niveau: "cm1",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_perpendiculaire",
    difficulty: 2,
    theme: "reunion",
    hint: "Deux rues qui se croisent à angle droit sont perpendiculaires.",
    tags: ["cm1", "droite", "perpendiculaire", "reunion", "routes", "template", "qcm", "canvas"],
    generate: () => {
      const lieu = randomChoice([
        "Saint-Pierre",
        "Le Tampon",
        "Saint-Joseph",
        "L’Étang-Salé",
      ]);

      return {
        text:
          `Sur un plan simplifié de ${lieu}, deux rues droites se croisent en formant un angle droit. ` +
          `Elles sont...`,
        format: "qcm",
        choices: makeChoices("perpendiculaires", [
          "parallèles",
          "identiques",
          "des fractions",
        ]),
        expected: ["perpendiculaires"],
        comparator: "mcq_exact",
        explanation:
          "Deux droites qui se coupent en formant un angle droit sont perpendiculaires. " +
          `Sur le plan de ${lieu}, les deux rues se croisent à angle droit : elles sont perpendiculaires.`,
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
      };
    },
  },

  {
    kind: "template",
    id: "cm1_droite_perpendiculaire_tpl_008_erreur_se_coupent",
    niveau: "cm1",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_perpendiculaire",
    difficulty: 3,
    theme: "neutral",
    hint: "Se couper ne suffit pas : il faut former un angle droit.",
    tags: ["cm1", "droite", "perpendiculaire", "erreur", "sécantes", "template", "qcm", "canvas"],
    generate: () => {
      return {
        text: "Un élève dit : “Ces droites sont perpendiculaires parce qu’elles se coupent.” A-t-il forcément raison ?",
        format: "qcm",
        choices: ["non", "oui"],
        expected: ["non"],
        comparator: "mcq_exact",
        explanation:
          "L’élève oublie une condition importante. " +
          "Deux droites perpendiculaires doivent se couper en formant un angle droit. " +
          "Deux droites peuvent se couper sans être perpendiculaires.",
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
      };
    },
  },

  {
    kind: "template",
    id: "cm1_droite_perpendiculaire_tpl_009_open_methode",
    niveau: "cm1",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_perpendiculaire",
    difficulty: 3,
    theme: "neutral",
    hint: "Parle du point d’intersection et de l’angle droit.",
    tags: ["cm1", "droite", "perpendiculaire", "open", "methode", "template"],
    generate: () => {
      return {
        text: "Explique comment reconnaître deux droites perpendiculaires.",
        format: "open",
        expected: ["coupent", "angle", "droit"],
        comparator: "contains_keyword",
        explanation:
          "Réponse possible : deux droites perpendiculaires se coupent en formant un angle droit. " +
          "Sur une figure, je cherche le point d’intersection et le petit carré qui code l’angle droit.",
      };
    },
  },

  {
    kind: "template",
    id: "cm1_droite_perpendiculaire_tpl_010_open_corriger_erreur",
    niveau: "cm1",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_perpendiculaire",
    difficulty: 3,
    theme: "neutral",
    hint: "Explique que se couper ne suffit pas.",
    tags: ["cm1", "droite", "perpendiculaire", "open", "erreur", "template"],
    generate: () => {
      return {
        text: "Un élève dit : “Toutes les droites qui se coupent sont perpendiculaires.” Corrige son erreur.",
        format: "open",
        expected: ["angle", "droit", "coupent"],
        comparator: "contains_keyword",
        explanation:
          "Réponse possible : non, deux droites qui se coupent sont sécantes. " +
          "Elles sont perpendiculaires seulement si elles se coupent en formant un angle droit.",
      };
    },
  },
    // ============================================================
  // DROITE_TRACER
  // Tracer des droites parallèles ou perpendiculaires
  // Version CM1 : outils, méthode, étapes, erreurs fréquentes
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_droite_tracer_fixed_001_outils",
    niveau: "cm1",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_tracer",
    difficulty: 2,
    theme: "neutral",
    text: "Pour tracer une droite perpendiculaire, l’outil le plus utile est...",
    format: "qcm",
    choices: [
      "une équerre",
      "un verre doseur",
      "une balance",
      "un chronomètre",
    ],
    expected: ["une équerre"],
    comparator: "mcq_exact",
    hint: "Une équerre contient un angle droit.",
    explanation:
      "Pour tracer une droite perpendiculaire, on doit construire un angle droit. " +
      "L’équerre est l’outil adapté, car elle possède un angle droit. " +
      "On peut l’utiliser pour placer une droite qui coupe une autre droite à angle droit.",
    tags: ["cm1", "droite", "tracer", "outil", "equerre", "qcm", "canvas"],
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
          id: "e",
          type: "droite",
          from: { x: 170, y: 50 },
          to: { x: 170, y: 210 },
          label: "(e)",
          color: "#16a34a",
          dashed: true,
        },
      ],
      intersections: [
        { x: 170, y: 130, label: "O", color: "#f97316", highlight: true },
      ],
      markers: {
        rightAngles: [
          {
            x: 170,
            y: 130,
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
    kind: "template",
    id: "cm1_droite_tracer_tpl_001_choisir_outil",
    niveau: "cm1",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_tracer",
    difficulty: 2,
    theme: "neutral",
    hint: "Règle : tracer droit. Équerre : tracer ou vérifier un angle droit.",
    tags: ["cm1", "droite", "tracer", "outil", "template", "qcm"],
    generate: () => {
      const item = randomChoice([
        {
          text: "Quel outil est indispensable pour tracer une droite bien droite ?",
          correct: "une règle",
          wrongs: ["une balance", "un verre doseur", "un compas uniquement"],
          explanation:
            "Pour tracer une droite ou un segment bien droit, on utilise une règle.",
        },
        {
          text: "Quel outil aide à tracer une droite perpendiculaire ?",
          correct: "une équerre",
          wrongs: ["une balance", "un rapporteur uniquement", "un verre doseur"],
          explanation:
            "Une équerre possède un angle droit. Elle aide donc à tracer une droite perpendiculaire.",
        },
        {
          text: "Pour tracer une parallèle avec la méthode classique, on utilise souvent...",
          correct: "une règle et une équerre",
          wrongs: ["une balance et un compas", "un chronomètre", "un verre doseur"],
          explanation:
            "Pour tracer une parallèle, on peut utiliser une règle et une équerre afin de garder la même direction.",
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
    id: "cm1_droite_tracer_tpl_002_tracer_perpendiculaire_methode",
    niveau: "cm1",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_tracer",
    difficulty: 2,
    theme: "neutral",
    hint: "On place l’angle droit de l’équerre sur la droite.",
    tags: ["cm1", "droite", "tracer", "perpendiculaire", "methode", "template", "qcm", "canvas"],
    generate: () => {
      return {
        text: "Pour tracer une droite perpendiculaire à une droite (d), quelle étape est correcte ?",
        format: "qcm",
        choices: makeChoices("placer l’angle droit de l’équerre contre la droite (d)", [
          "choisir une couleur au hasard",
          "tracer une droite sans regarder l’angle",
          "mesurer une masse",
        ]),
        expected: ["placer l’angle droit de l’équerre contre la droite (d)"],
        comparator: "mcq_exact",
        explanation:
          "Pour tracer une perpendiculaire, il faut construire un angle droit. " +
          "On place donc l’angle droit de l’équerre contre la droite donnée, puis on trace la nouvelle droite.",
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
              id: "e",
              type: "droite",
              from: { x: 175, y: 50 },
              to: { x: 175, y: 210 },
              label: "(e)",
              color: "#16a34a",
              dashed: true,
            },
          ],
          intersections: [
            { x: 175, y: 130, label: "O", color: "#f97316", highlight: true },
          ],
          markers: {
            rightAngles: [
              {
                x: 175,
                y: 130,
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
    id: "cm1_droite_tracer_tpl_003_tracer_parallele_methode",
    niveau: "cm1",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_tracer",
    difficulty: 2,
    theme: "neutral",
    hint: "Une parallèle garde la même direction.",
    tags: ["cm1", "droite", "tracer", "parallele", "methode", "template", "qcm", "canvas"],
    generate: () => {
      return {
        text: "Pour tracer une droite parallèle à une droite (d), il faut obtenir une droite qui...",
        format: "qcm",
        choices: makeChoices("garde la même direction que (d)", [
          "coupe forcément (d) en angle droit",
          "change de direction au hasard",
          "est forcément plus courte",
        ]),
        expected: ["garde la même direction que (d)"],
        comparator: "mcq_exact",
        explanation:
          "Deux droites parallèles ont la même direction et gardent le même écart. " +
          "Pour tracer une parallèle, on cherche donc à conserver la direction de la droite donnée.",
        canvas: droitesCanvas({
          lines: [
            {
              id: "d",
              type: "droite",
              from: { x: 55, y: 90 },
              to: { x: 285, y: 110 },
              label: "(d)",
              color: "#2563eb",
            },
            {
              id: "e",
              type: "droite",
              from: { x: 55, y: 155 },
              to: { x: 285, y: 175 },
              label: "(e)",
              color: "#16a34a",
              dashed: true,
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
    id: "cm1_droite_tracer_tpl_004_reconnaitre_trace_correct_perpendiculaire",
    niveau: "cm1",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_tracer",
    difficulty: 2,
    theme: "neutral",
    hint: "La droite tracée doit former un angle droit avec la droite donnée.",
    tags: ["cm1", "droite", "tracer", "perpendiculaire", "verifier", "template", "qcm", "canvas"],
    generate: () => {
      const correct = Math.random() < 0.5;

      if (correct) {
        return {
          text: "La droite tracée semble-t-elle bien perpendiculaire à la droite (d) ?",
          format: "qcm",
          choices: ["oui", "non"],
          expected: ["oui"],
          comparator: "mcq_exact",
          explanation:
            "Oui. La droite tracée coupe la droite (d) en formant un angle droit. " +
            "Le petit carré confirme le tracé perpendiculaire.",
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
                from: { x: 170, y: 45 },
                to: { x: 170, y: 205 },
                label: "(e)",
                color: "#16a34a",
                dashed: true,
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
        text: "La droite tracée semble-t-elle bien perpendiculaire à la droite (d) ?",
        format: "qcm",
        choices: ["oui", "non"],
        expected: ["non"],
        comparator: "mcq_exact",
        explanation:
          "Non. La droite tracée coupe la droite (d), mais elle ne forme pas un angle droit. " +
          "Pour être perpendiculaire, il faut obtenir un angle droit.",
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
              id: "e",
              type: "droite",
              from: { x: 100, y: 55 },
              to: { x: 240, y: 205 },
              label: "(e)",
              color: "#16a34a",
              dashed: true,
            },
          ],
          intersections: [
            { x: 170, y: 130, label: "O", color: "#f97316", highlight: true },
          ],
          display: {
            showRightAngleMarkers: false,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_droite_tracer_tpl_005_reconnaitre_trace_correct_parallele",
    niveau: "cm1",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_tracer",
    difficulty: 2,
    theme: "neutral",
    hint: "La droite tracée doit garder la même direction.",
    tags: ["cm1", "droite", "tracer", "parallele", "verifier", "template", "qcm", "canvas"],
    generate: () => {
      const correct = Math.random() < 0.5;

      if (correct) {
        return {
          text: "La droite tracée semble-t-elle parallèle à la droite (d) ?",
          format: "qcm",
          choices: ["oui", "non"],
          expected: ["oui"],
          comparator: "mcq_exact",
          explanation:
            "Oui. Les deux droites gardent la même direction et le même écart. " +
            "Elles sont parallèles.",
          canvas: droitesCanvas({
            lines: [
              {
                id: "d",
                type: "droite",
                from: { x: 55, y: 85 },
                to: { x: 285, y: 105 },
                label: "(d)",
                color: "#2563eb",
              },
              {
                id: "e",
                type: "droite",
                from: { x: 55, y: 150 },
                to: { x: 285, y: 170 },
                label: "(e)",
                color: "#16a34a",
                dashed: true,
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
        text: "La droite tracée semble-t-elle parallèle à la droite (d) ?",
        format: "qcm",
        choices: ["oui", "non"],
        expected: ["non"],
        comparator: "mcq_exact",
        explanation:
          "Non. Les deux droites n’ont pas la même direction. " +
          "Si on les prolongeait, elles finiraient par se couper. " +
          "Elles ne sont donc pas parallèles.",
        canvas: droitesCanvas({
          lines: [
            {
              id: "d",
              type: "droite",
              from: { x: 55, y: 90 },
              to: { x: 285, y: 110 },
              label: "(d)",
              color: "#2563eb",
            },
            {
              id: "e",
              type: "droite",
              from: { x: 70, y: 175 },
              to: { x: 270, y: 70 },
              label: "(e)",
              color: "#16a34a",
              dashed: true,
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
    id: "cm1_droite_tracer_tpl_006_etapes_perpendiculaire",
    niveau: "cm1",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_tracer",
    difficulty: 3,
    theme: "neutral",
    hint: "On utilise l’équerre pour construire l’angle droit.",
    tags: ["cm1", "droite", "tracer", "perpendiculaire", "etapes", "template", "qcm"],
    generate: () => {
      return {
        text: "Quelle méthode est correcte pour tracer une perpendiculaire à une droite donnée ?",
        format: "qcm",
        choices: makeChoices("placer l’équerre sur la droite, puis tracer le long de l’autre côté de l’équerre", [
          "tracer une ligne au hasard",
          "changer seulement la couleur de la droite",
          "compter les carreaux sans utiliser d’outil",
        ]),
        expected: ["placer l’équerre sur la droite, puis tracer le long de l’autre côté de l’équerre"],
        comparator: "mcq_exact",
        explanation:
          "Pour tracer une perpendiculaire, on utilise l’angle droit de l’équerre. " +
          "On place un côté de l’équerre sur la droite donnée, puis on trace le long de l’autre côté. " +
          "La nouvelle droite forme alors un angle droit avec la première.",
      };
    },
  },

  {
    kind: "template",
    id: "cm1_droite_tracer_tpl_007_etapes_parallele",
    niveau: "cm1",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_tracer",
    difficulty: 3,
    theme: "neutral",
    hint: "Une parallèle garde la même direction que la droite donnée.",
    tags: ["cm1", "droite", "tracer", "parallele", "etapes", "template", "qcm"],
    generate: () => {
      return {
        text: "Quelle idée est correcte pour tracer une parallèle à une droite donnée ?",
        format: "qcm",
        choices: makeChoices("garder la même direction que la droite donnée", [
          "faire un angle droit avec la droite donnée",
          "tracer une droite qui coupe forcément la première",
          "tracer un cercle",
        ]),
        expected: ["garder la même direction que la droite donnée"],
        comparator: "mcq_exact",
        explanation:
          "Deux droites parallèles ont la même direction et ne se coupent pas. " +
          "Pour tracer une parallèle, il faut donc construire une droite qui garde la direction de la droite donnée.",
      };
    },
  },

  {
    kind: "template",
    id: "cm1_droite_tracer_tpl_008_erreur_perpendiculaire_parallele",
    niveau: "cm1",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_tracer",
    difficulty: 3,
    theme: "neutral",
    hint: "Perpendiculaire : angle droit. Parallèle : même direction.",
    tags: ["cm1", "droite", "tracer", "erreur", "parallele", "perpendiculaire", "template", "qcm", "canvas"],
    generate: () => {
      return {
        text: "Un élève veut tracer une parallèle, mais il trace une droite qui coupe la première à angle droit. A-t-il réussi ?",
        format: "qcm",
        choices: ["non", "oui"],
        expected: ["non"],
        comparator: "mcq_exact",
        explanation:
          "L’élève a tracé une perpendiculaire, pas une parallèle. " +
          "Une perpendiculaire coupe la droite à angle droit. " +
          "Une parallèle garde la même direction et ne coupe pas la droite donnée.",
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
              from: { x: 170, y: 45 },
              to: { x: 170, y: 205 },
              label: "(e)",
              color: "#16a34a",
              dashed: true,
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
    id: "cm1_droite_tracer_tpl_009_reunion_plan_rues",
    niveau: "cm1",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_tracer",
    difficulty: 3,
    theme: "reunion",
    hint: "Sur un plan, des rues parallèles gardent la même direction.",
    tags: ["cm1", "droite", "tracer", "reunion", "rues", "parallele", "template", "qcm", "canvas"],
    generate: () => {
      const lieu = randomChoice([
        "Saint-Pierre",
        "Le Tampon",
        "Saint-Joseph",
        "L’Étang-Salé",
      ]);

      return {
        text:
          `Sur un plan simplifié de ${lieu}, on veut tracer une rue parallèle à la Rue 1. ` +
          `Que doit-on respecter ?`,
        format: "qcm",
        choices: makeChoices("garder la même direction que la Rue 1", [
          "couper la Rue 1 à angle droit",
          "tracer une rue au hasard",
          "changer seulement la couleur",
        ]),
        expected: ["garder la même direction que la Rue 1"],
        comparator: "mcq_exact",
        explanation:
          "Pour tracer une rue parallèle, il faut garder la même direction que la rue donnée. " +
          "Deux droites parallèles ne se coupent pas et gardent le même écart.",
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
              from: { x: 55, y: 150 },
              to: { x: 285, y: 170 },
              label: "Rue 2",
              color: "#16a34a",
              dashed: true,
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
    },
  },

  {
    kind: "template",
    id: "cm1_droite_tracer_tpl_010_open_perpendiculaire",
    niveau: "cm1",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_tracer",
    difficulty: 3,
    theme: "neutral",
    hint: "Parle de l’équerre et de l’angle droit.",
    tags: ["cm1", "droite", "tracer", "open", "perpendiculaire", "methode", "template"],
    generate: () => {
      return {
        text: "Explique comment tracer une droite perpendiculaire à une droite donnée.",
        format: "open",
        expected: ["équerre", "angle", "droit"],
        comparator: "contains_keyword",
        explanation:
          "Réponse possible : je place l’angle droit de l’équerre contre la droite donnée. " +
          "Puis je trace une nouvelle droite le long de l’autre côté de l’équerre. " +
          "La nouvelle droite forme un angle droit avec la première.",
      };
    },
  },

  {
    kind: "template",
    id: "cm1_droite_tracer_tpl_011_open_parallele",
    niveau: "cm1",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_tracer",
    difficulty: 3,
    theme: "neutral",
    hint: "Parle de même direction et de droites qui ne se coupent pas.",
    tags: ["cm1", "droite", "tracer", "open", "parallele", "methode", "template"],
    generate: () => {
      return {
        text: "Explique l’idée principale pour tracer une droite parallèle à une droite donnée.",
        format: "open",
        expected: ["même", "direction", "coupent"],
        comparator: "contains_keyword",
        explanation:
          "Réponse possible : une droite parallèle doit garder la même direction que la droite donnée. " +
          "Elle garde le même écart et ne coupe pas la première droite.",
      };
    },
  },
    // ============================================================
  // DROITE_DEFI
  // Résoudre un défi sur les droites
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_droite_defi_fixed_001_parallele_ou_perpendiculaire",
    niveau: "cm1",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_defi",
    difficulty: 3,
    theme: "neutral",
    text: "Deux droites se coupent en formant un angle droit. Elles sont...",
    format: "qcm",
    choices: [
      "perpendiculaires",
      "parallèles",
      "sans point commun",
      "des segments obligatoirement",
    ],
    expected: ["perpendiculaires"],
    comparator: "mcq_exact",
    hint: "Cherche le mot lié à l’angle droit.",
    explanation:
      "Deux droites qui se coupent en formant un angle droit sont perpendiculaires. " +
      "Des droites parallèles, au contraire, ne se coupent jamais.",
    tags: ["cm1", "droite", "defi", "parallele", "perpendiculaire", "qcm", "canvas"],
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
          from: { x: 170, y: 45 },
          to: { x: 170, y: 205 },
          label: "(e)",
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
    kind: "template",
    id: "cm1_droite_defi_tpl_001_choisir_relation",
    niveau: "cm1",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Parallèles : même direction. Perpendiculaires : angle droit.",
    tags: ["cm1", "droite", "defi", "relation", "template", "qcm", "canvas"],
    generate: () => {
      const relation = randomChoice(["paralleles", "perpendiculaires", "secantes"] as const);

      if (relation === "paralleles") {
        return {
          text: "Quelle relation observe-t-on entre les deux droites ?",
          format: "qcm",
          choices: makeChoices("elles sont parallèles", [
            "elles sont perpendiculaires",
            "elles sont confondues",
            "elles sont des demi-droites",
          ]),
          expected: ["elles sont parallèles"],
          comparator: "mcq_exact",
          explanation:
            "Les deux droites ont la même direction et gardent le même écart. " +
            "Elles ne se coupent pas : elles sont parallèles.",
          canvas: droitesCanvas({
            lines: [
              {
                id: "d",
                type: "droite",
                from: { x: 55, y: 90 },
                to: { x: 285, y: 110 },
                label: "(d)",
                color: "#2563eb",
              },
              {
                id: "e",
                type: "droite",
                from: { x: 55, y: 155 },
                to: { x: 285, y: 175 },
                label: "(e)",
                color: "#16a34a",
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

      if (relation === "perpendiculaires") {
        return {
          text: "Quelle relation observe-t-on entre les deux droites ?",
          format: "qcm",
          choices: makeChoices("elles sont perpendiculaires", [
            "elles sont parallèles",
            "elles ne se coupent jamais",
            "elles sont des segments obligatoirement",
          ]),
          expected: ["elles sont perpendiculaires"],
          comparator: "mcq_exact",
          explanation:
            "Les deux droites se coupent en formant un angle droit. " +
            "Le petit carré indique l’angle droit : elles sont perpendiculaires.",
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
                from: { x: 170, y: 45 },
                to: { x: 170, y: 205 },
                label: "(e)",
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
        text: "Quelle relation observe-t-on entre les deux droites ?",
        format: "qcm",
        choices: makeChoices("elles sont sécantes", [
          "elles sont parallèles",
          "elles sont perpendiculaires",
          "elles ne se coupent jamais",
        ]),
        expected: ["elles sont sécantes"],
        comparator: "mcq_exact",
        explanation:
          "Les deux droites se coupent en un point. " +
          "Mais elles ne forment pas d’angle droit. " +
          "Elles sont donc sécantes, mais pas perpendiculaires.",
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
          display: {
            showRightAngleMarkers: false,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_droite_defi_tpl_002_erreur_parallele_perpendiculaire",
    niveau: "cm1",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Une parallèle ne coupe pas. Une perpendiculaire coupe à angle droit.",
    tags: ["cm1", "droite", "defi", "erreur", "parallele", "perpendiculaire", "template", "qcm", "canvas"],
    generate: () => {
      return {
        text: "Un élève dit : “Ces droites sont parallèles car elles se coupent à angle droit.” A-t-il raison ?",
        format: "qcm",
        choices: ["non", "oui"],
        expected: ["non"],
        comparator: "mcq_exact",
        explanation:
          "L’élève confond deux relations. " +
          "Deux droites parallèles ne se coupent pas. " +
          "Deux droites qui se coupent à angle droit sont perpendiculaires.",
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
              from: { x: 170, y: 45 },
              to: { x: 170, y: 205 },
              label: "(e)",
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
    id: "cm1_droite_defi_tpl_003_erreur_couleur",
    niveau: "cm1",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "La couleur aide à lire, mais ne prouve pas une relation géométrique.",
    tags: ["cm1", "droite", "defi", "erreur", "couleur", "template", "qcm", "canvas"],
    generate: () => {
      const relation = randomChoice(["parallele", "perpendiculaire"] as const);

      if (relation === "parallele") {
        return {
          text: "Deux droites sont-elles parallèles simplement parce qu’elles ont la même couleur ?",
          format: "qcm",
          choices: ["non", "oui"],
          expected: ["non"],
          comparator: "mcq_exact",
          explanation:
            "Non. La couleur ne suffit pas. " +
            "Pour reconnaître des droites parallèles, on vérifie qu’elles ont la même direction et qu’elles ne se coupent pas.",
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
        };
      }

      return {
        text: "Deux droites sont-elles perpendiculaires simplement parce qu’elles ont deux couleurs différentes ?",
        format: "qcm",
        choices: ["non", "oui"],
        expected: ["non"],
        comparator: "mcq_exact",
        explanation:
          "Non. Les couleurs servent seulement à distinguer les droites. " +
          "Pour reconnaître des droites perpendiculaires, on vérifie qu’elles se coupent en formant un angle droit.",
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
      };
    },
  },

  {
    kind: "template",
    id: "cm1_droite_defi_tpl_004_type_objet_piege",
    niveau: "cm1",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Observe si l’objet s’arrête ou continue.",
    tags: ["cm1", "droite", "defi", "segment", "demi_droite", "droite", "template", "qcm", "canvas"],
    generate: () => {
      const item = randomChoice([
        {
          type: "droite" as const,
          label: "(AB)",
          correct: "une droite",
          explanation:
            "La notation (AB) et le dessin indiquent une droite. Elle se prolonge dans les deux sens.",
        },
        {
          type: "segment" as const,
          label: "[AB]",
          correct: "un segment",
          explanation:
            "La notation [AB] indique un segment. Il est limité par deux extrémités A et B.",
        },
        {
          type: "demi_droite" as const,
          label: "[AB)",
          correct: "une demi-droite",
          explanation:
            "La notation [AB) indique une demi-droite. Elle part de A et continue dans le sens de B.",
        },
      ]);

      return {
        text: `Que représente ${item.label} ?`,
        format: "qcm",
        choices: makeChoices(item.correct, [
          "une droite",
          "un segment",
          "une demi-droite",
          "une droite perpendiculaire",
        ]),
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
              label: item.label,
              color:
                item.type === "droite"
                  ? "#2563eb"
                  : item.type === "segment"
                    ? "#16a34a"
                    : "#8b5cf6",
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
    id: "cm1_droite_defi_tpl_005_plan_reunion_choisir_relation",
    niveau: "cm1",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_defi",
    difficulty: 3,
    theme: "reunion",
    hint: "Observe si les rues se coupent ou gardent la même direction.",
    tags: ["cm1", "droite", "defi", "reunion", "plan", "routes", "template", "qcm", "canvas"],
    generate: () => {
      const lieu = randomChoice(["Saint-Pierre", "Le Tampon", "Saint-Joseph", "L’Étang-Salé"]);
      const relation = randomChoice(["parallele", "perpendiculaire"] as const);

      if (relation === "parallele") {
        return {
          text:
            `Sur un plan simplifié de ${lieu}, deux rues droites gardent le même écart et ne se coupent pas. ` +
            `Elles sont...`,
          format: "qcm",
          choices: makeChoices("parallèles", [
            "perpendiculaires",
            "sécantes à angle droit",
            "des demi-droites",
          ]),
          expected: ["parallèles"],
          comparator: "mcq_exact",
          explanation:
            "Deux droites qui gardent le même écart et ne se coupent pas sont parallèles. " +
            `Sur ce plan de ${lieu}, les deux rues sont donc parallèles.`,
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
                from: { x: 55, y: 150 },
                to: { x: 285, y: 170 },
                label: "Rue 2",
                color: "#16a34a",
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
        text:
          `Sur un plan simplifié de ${lieu}, deux rues droites se croisent en formant un angle droit. ` +
          `Elles sont...`,
        format: "qcm",
        choices: makeChoices("perpendiculaires", [
          "parallèles",
          "sans point commun",
          "des droites qui ne se coupent jamais",
        ]),
        expected: ["perpendiculaires"],
        comparator: "mcq_exact",
        explanation:
          "Deux droites qui se coupent en formant un angle droit sont perpendiculaires. " +
          `Sur ce plan de ${lieu}, les rues se croisent à angle droit : elles sont perpendiculaires.`,
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
      };
    },
  },

  {
    kind: "template",
    id: "cm1_droite_defi_tpl_006_segments_supports_mixte",
    niveau: "cm1",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Imagine les droites qui prolongent les segments.",
    tags: ["cm1", "droite", "defi", "segments", "supports", "template", "qcm", "canvas"],
    generate: () => {
      const relation = randomChoice(["parallele", "perpendiculaire", "aucune"] as const);

      if (relation === "parallele") {
        return {
          text: "Les deux segments sont-ils portés par des droites parallèles, perpendiculaires ou ni l’un ni l’autre ?",
          format: "qcm",
          choices: [
            "parallèles",
            "perpendiculaires",
            "ni l’un ni l’autre",
          ],
          expected: ["parallèles"],
          comparator: "mcq_exact",
          explanation:
            "On imagine les droites qui prolongent les deux segments. " +
            "Elles ont la même direction et ne se coupent pas : elles sont parallèles.",
          canvas: droitesCanvas({
            lines: [
              {
                id: "AB",
                type: "segment",
                from: { x: 70, y: 85 },
                to: { x: 250, y: 110 },
                label: "[AB]",
                color: "#2563eb",
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

      if (relation === "perpendiculaire") {
        return {
          text: "Les deux segments sont-ils portés par des droites parallèles, perpendiculaires ou ni l’un ni l’autre ?",
          format: "qcm",
          choices: [
            "parallèles",
            "perpendiculaires",
            "ni l’un ni l’autre",
          ],
          expected: ["perpendiculaires"],
          comparator: "mcq_exact",
          explanation:
            "On imagine les droites qui prolongent les deux segments. " +
            "Elles se coupent en formant un angle droit : elles sont perpendiculaires.",
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
        };
      }

      return {
        text: "Les deux segments sont-ils portés par des droites parallèles, perpendiculaires ou ni l’un ni l’autre ?",
        format: "qcm",
        choices: [
          "parallèles",
          "perpendiculaires",
          "ni l’un ni l’autre",
        ],
        expected: ["ni l’un ni l’autre"],
        comparator: "mcq_exact",
        explanation:
          "On imagine les droites qui prolongent les deux segments. " +
          "Elles n’ont pas la même direction, donc elles ne sont pas parallèles. " +
          "Elles ne forment pas non plus un angle droit, donc elles ne sont pas perpendiculaires.",
        canvas: droitesCanvas({
          lines: [
            {
              id: "AB",
              type: "segment",
              from: { x: 70, y: 105 },
              to: { x: 260, y: 135 },
              label: "[AB]",
              color: "#2563eb",
            },
            {
              id: "CD",
              type: "segment",
              from: { x: 105, y: 70 },
              to: { x: 245, y: 170 },
              label: "[CD]",
              color: "#16a34a",
            },
          ],
          points: [
            { x: 70, y: 105, label: "A", color: "#ef4444" },
            { x: 260, y: 135, label: "B", color: "#ef4444" },
            { x: 105, y: 70, label: "C", color: "#f97316" },
            { x: 245, y: 170, label: "D", color: "#f97316" },
          ],
          intersections: [
            { x: 170, y: 122, label: "O", color: "#f97316", highlight: true },
          ],
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_droite_defi_tpl_007_tracer_erreur",
    niveau: "cm1",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Parallèle : même direction. Perpendiculaire : angle droit.",
    tags: ["cm1", "droite", "defi", "tracer", "erreur", "template", "qcm", "canvas"],
    generate: () => {
      const erreur = randomChoice(["parallele_ratee", "perpendiculaire_ratee"] as const);

      if (erreur === "parallele_ratee") {
        return {
          text: "Un élève devait tracer une parallèle à (d), mais il a tracé une droite qui coupe (d) à angle droit. Son tracé est-il correct ?",
          format: "qcm",
          choices: ["non", "oui"],
          expected: ["non"],
          comparator: "mcq_exact",
          explanation:
            "Le tracé n’est pas correct. " +
            "Une droite parallèle doit garder la même direction que (d) et ne pas la couper. " +
            "Ici, l’élève a tracé une perpendiculaire.",
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
                from: { x: 170, y: 45 },
                to: { x: 170, y: 205 },
                label: "(e)",
                color: "#16a34a",
                dashed: true,
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
        text: "Un élève devait tracer une perpendiculaire à (d), mais il a tracé une droite qui garde la même direction que (d). Son tracé est-il correct ?",
        format: "qcm",
        choices: ["non", "oui"],
        expected: ["non"],
        comparator: "mcq_exact",
        explanation:
          "Le tracé n’est pas correct. " +
          "Une droite perpendiculaire doit couper (d) en formant un angle droit. " +
          "Ici, l’élève a tracé une parallèle.",
        canvas: droitesCanvas({
          lines: [
            {
              id: "d",
              type: "droite",
              from: { x: 55, y: 90 },
              to: { x: 285, y: 110 },
              label: "(d)",
              color: "#2563eb",
            },
            {
              id: "e",
              type: "droite",
              from: { x: 55, y: 155 },
              to: { x: 285, y: 175 },
              label: "(e)",
              color: "#16a34a",
              dashed: true,
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
    id: "cm1_droite_defi_tpl_008_open_expliquer_difference",
    niveau: "cm1",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Parle de même direction et d’angle droit.",
    tags: ["cm1", "droite", "defi", "open", "difference", "template"],
    generate: () => {
      return {
        text: "Explique la différence entre deux droites parallèles et deux droites perpendiculaires.",
        format: "open",
        expected: ["parallèles", "perpendiculaires", "angle", "droit"],
        comparator: "contains_keyword",
        explanation:
          "Réponse possible : deux droites parallèles ont la même direction et ne se coupent pas. " +
          "Deux droites perpendiculaires se coupent en formant un angle droit.",
      };
    },
  },

  {
    kind: "template",
    id: "cm1_droite_defi_tpl_009_open_corriger_tracer",
    niveau: "cm1",
    matiere: "maths",
    notionId: "droite",
    microId: "droite_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Explique si l’élève a tracé une parallèle ou une perpendiculaire.",
    tags: ["cm1", "droite", "defi", "open", "tracer", "erreur", "template"],
    generate: () => {
      const item = randomChoice([
        {
          text:
            "Un élève devait tracer une parallèle, mais sa droite coupe la première en formant un angle droit. Corrige son erreur.",
          explanation:
            "Réponse possible : l’élève a tracé une perpendiculaire. " +
            "Pour tracer une parallèle, il faut garder la même direction que la droite donnée et ne pas la couper.",
          expected: ["parallèle", "perpendiculaire", "direction"],
        },
        {
          text:
            "Un élève devait tracer une perpendiculaire, mais sa droite garde la même direction que la première. Corrige son erreur.",
          explanation:
            "Réponse possible : l’élève a tracé une parallèle. " +
            "Pour tracer une perpendiculaire, il faut former un angle droit avec la droite donnée.",
          expected: ["perpendiculaire", "parallèle", "angle"],
        },
      ]);

      return {
        text: item.text,
        format: "open",
        expected: item.expected,
        comparator: "contains_keyword",
        explanation: item.explanation,
      };
    },
  },
];
