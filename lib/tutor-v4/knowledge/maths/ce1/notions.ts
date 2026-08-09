// Notions de mathématiques pour la classe de CE1.
// Référence : programme officiel de mathématiques du cycle 2,
// BO n° 41 du 31 octobre 2024, applicable à la rentrée 2025.

// lib/tutor-v4/knowledge/maths/ce1/notions.ts

import type { NotionSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

export const notions: NotionSource[] = [
  { id: "nombre_entier", label: "Nombres jusqu'à 1 000", boId: "BOCE1N1", prerequis: [], levels: [1, 2, 3] },
  { id: "suite_nombre", label: "Suites de nombres", boId: "BOCE1N1", prerequis: ["nombre_entier"], levels: [1, 2] },
  { id: "addition_soustraction", label: "Additions et soustractions", boId: "BOCE1C1", prerequis: ["nombre_entier"], levels: [1, 2, 3] },
  { id: "multiplication", label: "Multiplication", boId: "BOCE1C1", prerequis: ["addition_soustraction"], levels: [1, 2, 3] },
  { id: "division_partage", label: "Partages et groupements", boId: "BOCE1C1", prerequis: ["multiplication"], levels: [1, 2] },
  { id: "calcul_mental", label: "Calcul mental", boId: "BOCE1C1", prerequis: ["addition_soustraction", "multiplication"], levels: [1, 2, 3] },
  { id: "fraction", label: "Fractions simples", boId: "BOCE1F1", prerequis: ["division_partage"], levels: [1, 2] },
  { id: "probleme", label: "Problèmes", boId: "BOCE1P1", prerequis: ["calcul_mental"], levels: [1, 2, 3] },
  { id: "longueur", label: "Longueurs", boId: "BOCE1M1", prerequis: ["nombre_entier"], levels: [1, 2] },
  { id: "masse", label: "Masses", boId: "BOCE1M1", prerequis: ["nombre_entier"], levels: [1, 2] },
  { id: "contenance", label: "Contenances", boId: "BOCE1M1", prerequis: ["nombre_entier"], levels: [1, 2] },
  { id: "duree", label: "Temps et durées", boId: "BOCE1M1", prerequis: ["nombre_entier"], levels: [1, 2] },
  { id: "monnaie", label: "Monnaie", boId: "BOCE1M1", prerequis: ["addition_soustraction"], levels: [1, 2] },
  { id: "reperage", label: "Repérage sur quadrillage", boId: "BOCE1G1", prerequis: ["nombre_entier"], levels: [1, 2] },
  { id: "droites_segments", label: "Droites et segments", boId: "BOCE1G1", prerequis: ["reperage"], levels: [1, 2] },
  { id: "figures_planes", label: "Figures planes", boId: "BOCE1G1", prerequis: ["droites_segments"], levels: [1, 2] },
  { id: "solides", label: "Solides", boId: "BOCE1G1", prerequis: ["figures_planes"], levels: [1, 2] },
  { id: "symetrie", label: "Symétrie axiale", boId: "BOCE1G1", prerequis: ["figures_planes"], levels: [1, 2] },
  { id: "donnees", label: "Tableaux et graphiques simples", boId: "BOCE1D1", prerequis: ["nombre_entier"], levels: [1, 2] },
  { id: "algorithmique", label: "Instructions et déplacements codés", boId: "BOCE1I1", prerequis: ["reperage"], levels: [1, 2] },
];
