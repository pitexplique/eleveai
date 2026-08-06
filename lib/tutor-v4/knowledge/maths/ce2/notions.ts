// Notions de mathématiques pour la classe de CE2.
// Référence : programme officiel de mathématiques du cycle 2,
// BO n° 41 du 31 octobre 2024, applicable à la rentrée 2025.

// lib/tutor-v4/knowledge/maths/ce2/notions.ts

import type { NotionSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

export const notions: NotionSource[] = [
  { id: "nombre_entier", label: "Nombres jusqu'à 10 000", boId: "BOCE2N1", prerequis: [], levels: [1, 2, 3] },
  { id: "suite_nombre", label: "Suites de nombres", boId: "BOCE2N1", prerequis: ["nombre_entier"], levels: [1, 2] },
  { id: "addition_soustraction", label: "Additions et soustractions posées", boId: "BOCE2C1", prerequis: ["nombre_entier"], levels: [1, 2, 3] },
  { id: "multiplication", label: "Multiplication", boId: "BOCE2C1", prerequis: ["addition_soustraction"], levels: [1, 2, 3] },
  // Le sens de la division, pas la division posée : elle n'est pas au CE2.
  { id: "division", label: "Partages et groupements", boId: "BOCE2C1", prerequis: ["multiplication"], levels: [1, 2] },
  { id: "calcul_mental", label: "Calcul mental et fluence", boId: "BOCE2C1", prerequis: ["multiplication", "division"], levels: [1, 2, 3] },
  { id: "fraction", label: "Fractions inférieures ou égales à 1", boId: "BOCE2F1", prerequis: ["division"], levels: [1, 2, 3] },
  { id: "probleme", label: "Résolution de problèmes", boId: "BOCE2P1", prerequis: ["calcul_mental"], levels: [1, 2, 3] },
  { id: "longueur", label: "Longueurs", boId: "BOCE2M1", prerequis: ["nombre_entier"], levels: [1, 2] },
  { id: "masse", label: "Masses", boId: "BOCE2M1", prerequis: ["nombre_entier"], levels: [1, 2] },
  { id: "contenance", label: "Contenances", boId: "BOCE2M1", prerequis: ["nombre_entier"], levels: [1, 2] },
  { id: "duree", label: "Temps et durées", boId: "BOCE2M1", prerequis: ["nombre_entier"], levels: [1, 2] },
  { id: "monnaie", label: "Monnaie et écriture à virgule", boId: "BOCE2M1", prerequis: ["addition_soustraction"], levels: [1, 2] },
  { id: "perimetre", label: "Périmètres", boId: "BOCE2M1", prerequis: ["longueur", "addition_soustraction"], levels: [1, 2] },
  { id: "reperage", label: "Repérage sur quadrillage", boId: "BOCE2G1", prerequis: ["nombre_entier"], levels: [1, 2] },
  { id: "droites_angles", label: "Droites, angles droits et codages", boId: "BOCE2G1", prerequis: ["reperage"], levels: [1, 2] },
  { id: "figures_planes", label: "Figures planes", boId: "BOCE2G1", prerequis: ["droites_angles"], levels: [1, 2] },
  { id: "solides", label: "Solides", boId: "BOCE2G1", prerequis: ["figures_planes"], levels: [1, 2] },
  { id: "symetrie", label: "Symétrie axiale", boId: "BOCE2G1", prerequis: ["figures_planes"], levels: [1, 2] },
  { id: "donnees", label: "Tableaux et diagrammes en barres", boId: "BOCE2D1", prerequis: ["nombre_entier"], levels: [1, 2] },
  { id: "algorithmique", label: "Programmes et déplacements codés", boId: "BOCE2I1", prerequis: ["reperage"], levels: [1, 2] },
];
