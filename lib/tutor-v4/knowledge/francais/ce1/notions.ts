// Notions de français pour la classe de CE1.
// Reference : programme officiel du cycle 2,
// BO n. 41 du 31 octobre 2024, applicable a la rentree 2025.

import type { NotionSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

export const notions: NotionSource[] = [
  // Langage oral
  {
    id: "langage_oral",
    label: "Langage oral",
    boId: "BOCE1FO1",
    prerequis: [],
    levels: [1, 2],
  },

  // Lecture – code et fluence
  {
    id: "fluence_lecture",
    label: "Fluence et lecture courante",
    boId: "BOCE1FL1",
    prerequis: [],
    levels: [1, 2, 3],
  },
  {
    id: "sons_complexes",
    label: "Sons complexes et graphemes particuliers",
    boId: "BOCE1FL1",
    prerequis: ["fluence_lecture"],
    levels: [1, 2, 3],
  },

  // Lecture – comprehension
  {
    id: "comprehension_lecture",
    label: "Comprehension de textes",
    boId: "BOCE1FL2",
    prerequis: ["fluence_lecture"],
    levels: [1, 2, 3],
  },
  {
    id: "types_textes",
    label: "Types de textes (narratif, documentaire, poetique)",
    boId: "BOCE1FL2",
    prerequis: ["comprehension_lecture"],
    levels: [1, 2],
  },

  // Ecriture
  {
    id: "copie_fluente",
    label: "Copie fluente et soignee",
    boId: "BOCE1FE1",
    prerequis: [],
    levels: [1, 2],
  },
  {
    id: "ecriture_mots",
    label: "Ecriture de mots et dictee",
    boId: "BOCE1FE1",
    prerequis: ["copie_fluente"],
    levels: [1, 2, 3],
  },
  {
    id: "production_ecrite",
    label: "Production d'ecrits",
    boId: "BOCE1FE1",
    prerequis: ["ecriture_mots"],
    levels: [1, 2, 3],
  },

  // Grammaire
  {
    id: "grammaire_phrase",
    label: "La phrase et ses constituants",
    boId: "BOCE1FG1",
    prerequis: ["fluence_lecture"],
    levels: [1, 2, 3],
  },
  {
    id: "classes_mots",
    label: "Classes de mots (nom, verbe, adjectif, determinant)",
    boId: "BOCE1FG1",
    prerequis: ["grammaire_phrase"],
    levels: [1, 2, 3],
  },

  // Orthographe
  {
    id: "orthographe",
    label: "Orthographe lexicale et grammaticale",
    boId: "BOCE1FG1",
    prerequis: ["ecriture_mots"],
    levels: [1, 2, 3],
  },

  // Conjugaison
  {
    id: "conjugaison",
    label: "Conjugaison – present et passe compose",
    boId: "BOCE1FC1",
    prerequis: ["classes_mots"],
    levels: [1, 2, 3],
  },

  // Vocabulaire
  {
    id: "vocabulaire",
    label: "Vocabulaire et sens des mots",
    boId: "BOCE1FV1",
    prerequis: ["comprehension_lecture"],
    levels: [1, 2, 3],
  },
];
