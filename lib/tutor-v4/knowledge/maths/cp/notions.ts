// Notions de mathematiques pour la classe de CP.
// Reference : programme officiel de mathematiques du cycle 2,
// BO n. 41 du 31 octobre 2024, applicable a la rentree 2025.

import type { NotionSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

export const notions: NotionSource[] = [
  {
    id: "nombre_entier",
    label: "Nombres jusqu'a 100",
    boId: "BOCPN1",
    prerequis: [],
    levels: [1, 2, 3],
  },
  {
    id: "suite_nombre",
    label: "Suites de nombres",
    boId: "BOCPN1",
    prerequis: ["nombre_entier"],
    levels: [1, 2],
  },
  {
    id: "addition_soustraction",
    label: "Additions et soustractions",
    boId: "BOCPC1",
    prerequis: ["nombre_entier"],
    levels: [1, 2, 3],
  },
  {
    id: "calcul_mental",
    label: "Calcul mental",
    boId: "BOCPC1",
    prerequis: ["nombre_entier"],
    levels: [1, 2, 3],
  },
  {
    id: "probleme",
    label: "Problemes additifs",
    boId: "BOCPP1",
    prerequis: ["addition_soustraction"],
    levels: [1, 2, 3],
  },
  {
    id: "longueur",
    label: "Longueurs",
    boId: "BOCPM1",
    prerequis: ["nombre_entier"],
    levels: [1, 2],
  },
  {
    id: "masse_contenance",
    label: "Masses et contenances",
    boId: "BOCPM1",
    prerequis: ["nombre_entier"],
    levels: [1, 2],
  },
  {
    id: "duree",
    label: "Temps et durees",
    boId: "BOCPM1",
    prerequis: ["nombre_entier"],
    levels: [1, 2],
  },
  {
    id: "monnaie",
    label: "Monnaie",
    boId: "BOCPM1",
    prerequis: ["addition_soustraction"],
    levels: [1, 2],
  },
  {
    id: "reperage",
    label: "Reperage dans l'espace",
    boId: "BOCPG1",
    prerequis: [],
    levels: [1, 2],
  },
  {
    id: "figures_solides",
    label: "Figures planes et solides",
    boId: "BOCPG1",
    prerequis: ["reperage"],
    levels: [1, 2],
  },
  {
    id: "donnees",
    label: "Tableaux et donnees simples",
    boId: "BOCPD1",
    prerequis: ["nombre_entier"],
    levels: [1, 2],
  },
  {
    id: "algorithmique",
    label: "Suites d'instructions",
    boId: "BOCPI1",
    prerequis: ["reperage"],
    levels: [1, 2],
  },
];
