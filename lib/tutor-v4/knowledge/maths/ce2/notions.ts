// Notions de mathematiques pour la classe de CE2.
// Reference : programme officiel de mathematiques du cycle 2,
// BO n. 41 du 31 octobre 2024, applicable a la rentree 2025.

import type { NotionSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

export const notions: NotionSource[] = [
  { id: "nombre_entier", label: "Nombres jusqu'a 10 000", boId: "BOCE2N1", prerequis: [], levels: [1, 2, 3] },
  { id: "suite_nombre", label: "Suites de nombres", boId: "BOCE2N1", prerequis: ["nombre_entier"], levels: [1, 2] },
  { id: "addition_soustraction", label: "Additions et soustractions", boId: "BOCE2C1", prerequis: ["nombre_entier"], levels: [1, 2, 3] },
  { id: "multiplication", label: "Multiplication", boId: "BOCE2C1", prerequis: ["addition_soustraction"], levels: [1, 2, 3] },
  { id: "division", label: "Division", boId: "BOCE2C1", prerequis: ["multiplication"], levels: [1, 2] },
  { id: "calcul_mental", label: "Calcul mental", boId: "BOCE2C1", prerequis: ["multiplication", "division"], levels: [1, 2, 3] },
  { id: "fraction", label: "Fractions", boId: "BOCE2F1", prerequis: ["division"], levels: [1, 2, 3] },
  { id: "probleme", label: "Problemes", boId: "BOCE2P1", prerequis: ["calcul_mental"], levels: [1, 2, 3] },
  { id: "longueur", label: "Longueurs", boId: "BOCE2M1", prerequis: ["nombre_entier"], levels: [1, 2] },
  { id: "masse", label: "Masses", boId: "BOCE2M1", prerequis: ["nombre_entier"], levels: [1, 2] },
  { id: "contenance", label: "Contenances", boId: "BOCE2M1", prerequis: ["nombre_entier"], levels: [1, 2] },
  { id: "duree", label: "Temps et durees", boId: "BOCE2M1", prerequis: ["nombre_entier"], levels: [1, 2] },
  { id: "monnaie", label: "Monnaie", boId: "BOCE2M1", prerequis: ["addition_soustraction"], levels: [1, 2] },
  { id: "perimetre", label: "Perimetres", boId: "BOCE2M1", prerequis: ["longueur", "addition_soustraction"], levels: [1, 2] },
  { id: "reperage", label: "Reperage sur quadrillage", boId: "BOCE2G1", prerequis: ["nombre_entier"], levels: [1, 2] },
  { id: "droites_angles", label: "Droites et angles droits", boId: "BOCE2G1", prerequis: ["reperage"], levels: [1, 2] },
  { id: "figures_planes", label: "Figures planes", boId: "BOCE2G1", prerequis: ["droites_angles"], levels: [1, 2] },
  { id: "solides", label: "Solides", boId: "BOCE2G1", prerequis: ["figures_planes"], levels: [1, 2] },
  { id: "symetrie", label: "Symetrie axiale", boId: "BOCE2G1", prerequis: ["figures_planes"], levels: [1, 2] },
  { id: "donnees", label: "Tableaux et graphiques", boId: "BOCE2D1", prerequis: ["nombre_entier"], levels: [1, 2] },
  { id: "algorithmique", label: "Programmes et deplacements codes", boId: "BOCE2I1", prerequis: ["reperage"], levels: [1, 2] },
];
