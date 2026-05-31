// Notions de francais pour la classe de CE2.
// Reference : programme officiel du cycle 2,
// BO n. 41 du 31 octobre 2024, applicable a la rentree 2025.

import type { NotionSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

export const notions: NotionSource[] = [
  {
    id: "langage_oral",
    label: "Langage oral",
    boId: "BOCE2FO1",
    prerequis: [],
    levels: [1, 2],
  },
  {
    id: "fluence_lecture",
    label: "Fluence et lecture expressive",
    boId: "BOCE2FL1",
    prerequis: [],
    levels: [1, 2, 3],
  },
  {
    id: "comprehension_lecture",
    label: "Comprehension de textes",
    boId: "BOCE2FL1",
    prerequis: ["fluence_lecture"],
    levels: [1, 2, 3],
  },
  {
    id: "copie_fluente",
    label: "Copie fluente et soignee",
    boId: "BOCE2FE1",
    prerequis: [],
    levels: [1, 2],
  },
  {
    id: "production_ecrite",
    label: "Production d'ecrits courts",
    boId: "BOCE2FE1",
    prerequis: ["copie_fluente"],
    levels: [1, 2, 3],
  },
  {
    id: "grammaire_phrase",
    label: "La phrase et ses constituants",
    boId: "BOCE2FG1",
    prerequis: ["fluence_lecture"],
    levels: [1, 2, 3],
  },
  {
    id: "classes_mots",
    label: "Classes de mots",
    boId: "BOCE2FG1",
    prerequis: ["grammaire_phrase"],
    levels: [1, 2, 3],
  },
  {
    id: "orthographe",
    label: "Orthographe lexicale et grammaticale",
    boId: "BOCE2FG1",
    prerequis: ["classes_mots"],
    levels: [1, 2, 3],
  },
  {
    id: "conjugaison",
    label: "Conjugaison - temps simples",
    boId: "BOCE2FC1",
    prerequis: ["classes_mots"],
    levels: [1, 2, 3],
  },
  {
    id: "vocabulaire",
    label: "Vocabulaire et relations entre les mots",
    boId: "BOCE2FV1",
    prerequis: ["comprehension_lecture"],
    levels: [1, 2, 3],
  },
];
