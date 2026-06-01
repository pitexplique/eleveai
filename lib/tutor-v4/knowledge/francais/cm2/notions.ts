// Notions de francais pour la classe de CM2.
// Reference : programme officiel du cycle 3,
// BO n. 16 du 17 avril 2025, application progressive au CM2.

import type { NotionSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

export const notions: NotionSource[] = [
  {
    id: "fluence_lecture",
    label: "Lire avec fluidite et expressivite",
    boId: "BOCM2FL1",
    prerequis: [],
    levels: [1, 2, 3],
  },
  {
    id: "comprehension_textes_documents",
    label: "Comprendre des textes et documents complexes",
    boId: "BOCM2FL1",
    prerequis: ["fluence_lecture"],
    levels: [1, 2, 3],
  },
  {
    id: "lecture_oeuvres",
    label: "Lire une oeuvre et construire une culture litteraire",
    boId: "BOCM2FL1",
    prerequis: ["comprehension_textes_documents"],
    levels: [1, 2, 3],
  },
  {
    id: "ecriture",
    label: "Produire, organiser et reviser des ecrits",
    boId: "BOCM2FE1",
    prerequis: [],
    levels: [1, 2, 3],
  },
  {
    id: "oral",
    label: "Ecouter, presenter et argumenter",
    boId: "BOCM2FO1",
    prerequis: [],
    levels: [1, 2, 3],
  },
  {
    id: "vocabulaire",
    label: "Vocabulaire, nuances et orthographe lexicale",
    boId: "BOCM2FV1",
    prerequis: ["comprehension_textes_documents"],
    levels: [1, 2, 3],
  },
  {
    id: "grammaire_orthographe",
    label: "Phrase, groupes, accords et homophones",
    boId: "BOCM2FG1",
    prerequis: ["fluence_lecture"],
    levels: [1, 2, 3],
  },
  {
    id: "phrase_complexe",
    label: "Se reperer dans la phrase complexe",
    boId: "BOCM2FG1",
    prerequis: ["grammaire_orthographe"],
    levels: [2, 3],
  },
  {
    id: "conjugaison",
    label: "Conjugaison et valeur des temps",
    boId: "BOCM2FG1",
    prerequis: ["grammaire_orthographe"],
    levels: [1, 2, 3],
  },
];
