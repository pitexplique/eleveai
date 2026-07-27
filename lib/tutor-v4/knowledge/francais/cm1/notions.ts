// Notions de français pour la classe de CM1.
// Référence : programme officiel du cycle 3,
// BO n° 16 du 17 avril 2025, applicable au CM1 à la rentrée 2025.

import type { NotionSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

export const notions: NotionSource[] = [
  {
    id: "fluence_lecture",
    label: "Lire avec fluidité et expressivité",
    boId: "BOCM1FL1",
    prerequis: [],
    levels: [1, 2, 3],
  },
  {
    id: "comprehension_textes_documents",
    label: "Comprendre textes, documents et images",
    boId: "BOCM1FL1",
    prerequis: ["fluence_lecture"],
    levels: [1, 2, 3],
  },
  {
    id: "lecture_oeuvres",
    label: "Lire une œuvre et se l'approprier",
    boId: "BOCM1FL1",
    prerequis: ["comprehension_textes_documents"],
    levels: [1, 2, 3],
  },
  {
    id: "ecriture",
    label: "Écrire pour apprendre et produire",
    boId: "BOCM1FE1",
    prerequis: [],
    levels: [1, 2, 3],
  },
  {
    id: "oral",
    label: "Écouter, dire et participer aux échanges",
    boId: "BOCM1FO1",
    prerequis: [],
    levels: [1, 2, 3],
  },
  {
    id: "vocabulaire",
    label: "Vocabulaire et relations entre les mots",
    boId: "BOCM1FV1",
    prerequis: ["comprehension_textes_documents"],
    levels: [1, 2, 3],
  },
  {
    id: "grammaire_orthographe",
    label: "Phrase simple, accords et orthographe grammaticale",
    boId: "BOCM1FG1",
    prerequis: ["fluence_lecture"],
    levels: [1, 2, 3],
  },
  {
    id: "conjugaison",
    label: "Conjugaison et valeur des temps",
    boId: "BOCM1FG1",
    prerequis: ["grammaire_orthographe"],
    levels: [1, 2, 3],
  },
];
