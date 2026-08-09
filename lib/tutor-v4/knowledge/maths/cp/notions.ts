// Notions de mathématiques pour la classe de CP.
// Référence : programme officiel de mathématiques du cycle 2,
// BO n° 41 du 31 octobre 2024, applicable à la rentrée 2025.

// lib/tutor-v4/knowledge/maths/cp/notions.ts

// ⚠️ Les identifiants ne bougent pas : la progression des élèves est rangée
// dessous. Seuls les intitulés changent — ce sont eux que l'enfant lit.
//
// ⛔ `masse_contenance` garde son identifiant mais s'appelle « Masses ». Les
// contenances n'entrent au programme qu'au CE2 : le tableau du BO laisse la
// ligne vide au CP comme au CE1. Un CP compare des masses en soupesant, il ne
// transvase pas.
//
// ⛔ De même, `duree` s'appelle « Repérage dans le temps » : au CP le BO
// s'arrête aux heures entières. Les durées — l'écart entre deux instants —
// n'arrivent qu'au CE1.

import type { NotionSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

export const notions: NotionSource[] = [
  { id: "nombre_entier", label: "Nombres jusqu'à 100", boId: "BOCPN1", prerequis: [], levels: [1, 2, 3] },
  { id: "suite_nombre", label: "Suites de nombres", boId: "BOCPN1", prerequis: ["nombre_entier"], levels: [1, 2] },
  { id: "addition_soustraction", label: "Additions et soustractions", boId: "BOCPC1", prerequis: ["nombre_entier"], levels: [1, 2, 3] },
  { id: "calcul_mental", label: "Calcul mental", boId: "BOCPC1", prerequis: ["nombre_entier"], levels: [1, 2, 3] },
  { id: "probleme", label: "Problèmes", boId: "BOCPP1", prerequis: ["addition_soustraction"], levels: [1, 2, 3] },
  { id: "longueur", label: "Longueurs", boId: "BOCPM1", prerequis: ["nombre_entier"], levels: [1, 2] },
  { id: "masse_contenance", label: "Masses", boId: "BOCPM1", prerequis: ["nombre_entier"], levels: [1, 2] },
  { id: "duree", label: "Repérage dans le temps", boId: "BOCPM1", prerequis: ["nombre_entier"], levels: [1, 2] },
  { id: "monnaie", label: "Monnaie", boId: "BOCPM1", prerequis: ["addition_soustraction"], levels: [1, 2] },
  { id: "reperage", label: "Repérage dans l'espace", boId: "BOCPG1", prerequis: [], levels: [1, 2] },
  { id: "figures_solides", label: "Figures planes et solides", boId: "BOCPG1", prerequis: ["reperage"], levels: [1, 2] },
  { id: "donnees", label: "Tableaux et diagrammes", boId: "BOCPD1", prerequis: ["nombre_entier"], levels: [1, 2] },
  { id: "algorithmique", label: "Instructions et déplacements codés", boId: "BOCPI1", prerequis: ["reperage"], levels: [1, 2] },
];
