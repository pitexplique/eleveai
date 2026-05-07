// lib/tutor-v4/question-banks/maths/3e/thales.bank.ts

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle<T>(arr: T[]) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function formatNumber(n: number) {
  return Number.isInteger(n) ? String(n) : String(n).replace(".", ",");
}

function thalesCanvas(data: {
  sideLabels?: Record<string, string>;
  labels?: Record<string, string>;
  variant?: "triangle" | "papillon";
  showFormula?: boolean;
}) {
  return {
    kind: "thales" as const,
    variant: data.variant ?? "triangle",

    labels: {
      A: "A",
      B: "B",
      C: "C",
      M: "M",
      N: "N",
      ...(data.labels ?? {}),
    },

    sideLabels: data.sideLabels ?? {},

    display: {
      showPoints: true,
      showLabels: true,
      showSideLabels: true,
      showParallelMarks: true,
      highlightParallel: true,
      showFormula: data.showFormula ?? true,
    },
  };
}

export const thalesBank: TutorBankItemV4[] = [

  /* =========================
     THALES_CONFIGURATION
  ========================= */

  {
    kind: "fixed",
    id: "3e_thales_configuration_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "thales",
    microId: "thales_configuration",
    difficulty: 1,
    theme: "neutral",
    text:
      "Dans une configuration de Thalès, quelles droites doivent être parallèles ?",
    format: "qcm",
    choices: [
      "(MN) et (BC)",
      "(AM) et (AB)",
      "(AN) et (AC)",
      "(AB) et (AC)",
    ],
    expected: ["(MN) et (BC)"],
    comparator: "mcq_exact",
    hint: "Cherche les droites coupées par deux sécantes.",
    explanation:
      "Définition : dans une configuration de Thalès, deux droites parallèles sont coupées par deux droites sécantes.\n\n" +
      "Méthode : on identifie les droites parallèles représentées sur la figure.\n\n" +
      "Calcul : ici, les droites (MN) et (BC) sont parallèles.\n\n" +
      "Conclusion : la configuration permet donc d’utiliser le théorème de Thalès.",
    tags: ["thales", "configuration", "paralleles", "qcm"],

    canvas: thalesCanvas({
      sideLabels: {
        AM: "3",
        AB: "6",
        AN: "2",
        AC: "4",
      },
    }),
  },

  {
    kind: "fixed",
    id: "3e_thales_configuration_fixed_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "thales",
    microId: "thales_configuration",
    difficulty: 2,
    theme: "neutral",
    text:
      "Peut-on utiliser le théorème de Thalès si les droites ne sont pas parallèles ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Les parallèles sont indispensables.",
    explanation:
      "Définition : le théorème de Thalès nécessite une configuration avec des droites parallèles.\n\n" +
      "Méthode : on vérifie toujours l’existence du parallélisme avant d’utiliser Thalès.\n\n" +
      "Calcul : sans droites parallèles, les rapports ne sont pas garantis égaux.\n\n" +
      "Conclusion : on ne peut donc pas appliquer le théorème.",
    tags: ["thales", "configuration", "qcm"],
  },

  {
    kind: "template",
    id: "3e_thales_configuration_tpl_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "thales",
    microId: "thales_configuration",
    difficulty: 2,
    theme: "neutral",
    hint: "Repère les droites parallèles.",
    tags: ["thales", "configuration", "template"],

    generate: () => {
      const correct = randomChoice([
        "(MN) et (BC)",
        "(BC) et (MN)",
      ]);

      return {
        text:
          "Dans cette figure, quelles droites sont parallèles ?",

        format: "qcm",

        choices: shuffle([
          correct,
          "(AB) et (AC)",
          "(AM) et (AN)",
          "(AC) et (BC)",
        ]),

        expected: [correct],

        comparator: "mcq_exact",

        explanation:
          "Définition : dans une configuration de Thalès, deux droites parallèles sont coupées par deux sécantes.\n\n" +
          "Méthode : on repère les marques de parallélisme.\n\n" +
          "Calcul : les droites parallèles sont (MN) et (BC).\n\n" +
          "Conclusion : la figure est bien une configuration de Thalès.",

        canvas: thalesCanvas({
          sideLabels: {
            AM: "4",
            AB: "8",
            AN: "3",
            AC: "6",
          },
        }),
      };
    },
  },

  /* =========================
     THALES_RAPPORTS
  ========================= */

  {
    kind: "fixed",
    id: "3e_thales_rapports_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "thales",
    microId: "thales_rapports",
    difficulty: 2,
    theme: "neutral",
    text:
      "Quelle égalité traduit correctement le théorème de Thalès ?",
    format: "qcm",
    choices: [
      "AM/AB = AN/AC",
      "AM/AN = AB/BC",
      "AB/AC = BC/MN",
      "AM + AB = AC",
    ],
    expected: ["AM/AB = AN/AC"],
    comparator: "mcq_exact",
    hint: "Les rapports doivent comparer les longueurs correspondantes.",
    explanation:
      "Définition : le théorème de Thalès permet d’écrire des rapports égaux.\n\n" +
      "Méthode : on associe les côtés correspondants.\n\n" +
      "Calcul : ici, AM correspond à AB et AN correspond à AC.\n\n" +
      "Conclusion : on écrit donc AM/AB = AN/AC.",
    tags: ["thales", "rapports", "qcm"],
  },

  {
    kind: "template",
    id: "3e_thales_rapports_tpl_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "thales",
    microId: "thales_rapports",
    difficulty: 3,
    theme: "neutral",
    hint: "Associe les côtés correspondants.",
    tags: ["thales", "rapports", "template"],

    generate: () => {
      const a = randomChoice([2, 3, 4, 5]);
      const k = randomChoice([2, 3]);

      return {
        text:
          "Compléter l’égalité de Thalès : AM / AB = ... / AC",

        format: "short",

        expected: ["AN"],

        comparator: "exact_text",

        explanation:
          "Définition : dans le théorème de Thalès, les rapports comparent des côtés correspondants.\n\n" +
          "Méthode : AM correspond à AB et AN correspond à AC.\n\n" +
          "Calcul : on complète donc par AN.\n\n" +
          "Conclusion : l’égalité correcte est AM/AB = AN/AC.",

        canvas: thalesCanvas({
          sideLabels: {
            AM: String(a),
            AB: String(a * k),
            AN: String(a + 1),
            AC: String((a + 1) * k),
          },
        }),
      };
    },
  },
];