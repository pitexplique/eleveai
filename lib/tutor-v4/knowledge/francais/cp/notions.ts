// Notions de français pour la classe de CP.
// Reference : programme officiel du cycle 2,
// BO n. 41 du 31 octobre 2024, applicable a la rentree 2025.

import type { NotionSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

export const notions: NotionSource[] = [
  // Langage oral
  {
    id: "langage_oral",
    label: "Langage oral",
    boId: "BOCPFO1",
    prerequis: [],
    levels: [1, 2],
  },

  // Lecture – code
  {
    id: "conscience_phonologique",
    label: "Conscience phonologique",
    boId: "BOCPFL1",
    prerequis: [],
    levels: [1, 2, 3],
  },
  {
    id: "grapheme_phoneme",
    label: "Correspondances grapheme-phoneme",
    boId: "BOCPFL1",
    prerequis: ["conscience_phonologique"],
    levels: [1, 2, 3],
  },
  {
    id: "lecture_syllabique",
    label: "Lecture syllabique et dechiffrage",
    boId: "BOCPFL1",
    prerequis: ["grapheme_phoneme"],
    levels: [1, 2, 3],
  },

  // Lecture – comprehension
  {
    id: "comprehension_lecture",
    label: "Comprehension de textes",
    boId: "BOCPFL2",
    prerequis: ["lecture_syllabique"],
    levels: [1, 2, 3],
  },

  // Ecriture
  {
    id: "copie",
    label: "Copie de mots et de phrases",
    boId: "BOCPFE1",
    prerequis: ["grapheme_phoneme"],
    levels: [1, 2],
  },
  {
    id: "ecriture_mots",
    label: "Ecriture de mots (dictee)",
    boId: "BOCPFE1",
    prerequis: ["grapheme_phoneme", "copie"],
    levels: [1, 2, 3],
  },
  {
    id: "production_ecrite",
    label: "Production d'ecrits simples",
    boId: "BOCPFE1",
    prerequis: ["ecriture_mots"],
    levels: [1, 2],
  },

  // Etude de la langue
  {
    id: "grammaire_phrase",
    label: "La phrase",
    boId: "BOCPFG1",
    prerequis: ["lecture_syllabique"],
    levels: [1, 2, 3],
  },
  {
    id: "orthographe",
    label: "Orthographe de base",
    boId: "BOCPFG1",
    prerequis: ["ecriture_mots"],
    levels: [1, 2, 3],
  },

  // Vocabulaire
  {
    id: "vocabulaire",
    label: "Vocabulaire",
    boId: "BOCPFV1",
    prerequis: ["comprehension_lecture"],
    levels: [1, 2],
  },
];
