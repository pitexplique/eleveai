// knowledge/maths/5e/notions.ts

import type { NotionSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

export const notions: NotionSource[] = [
  {
    id: "nombres_relatifs",
    label: "Nombres relatifs",
    boId: "BO5N1",
    prerequis: [],
    levels: [1, 2, 3],
  },
  {
    id: "operations_relatifs",
    label: "Opérations sur les relatifs",
    boId: "BO5N1",
    prerequis: ["nombres_relatifs"],
    levels: [1, 2, 3],
  },
  {
    id: "fractions",
    label: "Fractions",
    boId: "BO5N2",
    prerequis: [],
    levels: [1, 2, 3],
  },
  {
    id: "proportionnalite",
    label: "Proportionnalité",
    boId: "BO5N2",
    prerequis: ["fractions", "operations_relatifs"],
    levels: [1, 2, 3],
  },
  {
    id: "calcul_litteral",
    label: "Calcul littéral",
    boId: "BO5A1",
    prerequis: [],
    levels: [1, 2, 3],
  },
  {
    id: "angles",
    label: "Angles",
    boId: "BO5G1",
    prerequis: [],
    levels: [1, 2],
  },
  {
    id: "triangles",
    label: "Triangles",
    boId: "BO5G1",
    prerequis: ["angles"],
    levels: [1, 2, 3],
  },
  {
    id: "symetrie_centrale",
    label: "Symétrie centrale",
    boId: "BO5G1",
    prerequis: ["angles"],
    levels: [1, 2],
  },
  {
    id: "aires",
    label: "Aires",
    boId: "BO5G2",
    prerequis: [],
    levels: [1, 2],
  },
  {
    id: "volumes",
    label: "Volumes",
    boId: "BO5G2",
    prerequis: ["aires"],
    levels: [1, 2],
  },
  {
    id: "statistiques",
    label: "Statistiques",
    boId: "BO5D1",
    prerequis: [],
    levels: [1, 2],
  },
];