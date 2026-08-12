// Notions de français pour la classe de CE1.
// Référence : programme officiel du cycle 2,
// BO n° 41 du 31 octobre 2024, applicable à la rentrée 2025.
//
// Relu le 09/08/2026 contre le texte intégral (Annexe 3). Deux notions
// ajoutées : « Écriture cursive », parce que le BO demande au CE1 de
// reconnaitre les lettres dans les quatre écritures et de transcrire la
// scripte en cursive ; et « Orthographe lexicale », que le BO range sous
// Vocabulaire (accents, graphèmes à prononciation variable, lettre muette
// finale anticipée par la famille).
//
// 12/08/2026 — « Devenir lecteur » ajoutée. Le BO découpe la Lecture en QUATRE
// objectifs, aux trois niveaux du cycle : identifier les mots, lire à voix
// haute, comprendre un texte, et devenir lecteur. Le quatrième n'existait pas
// au CE1, ni au CE2 : le parcours de lecteur — les œuvres complètes, le choix
// personnel, la mise en réseau — n'était nulle part.
//
// ⚠️ À ne pas confondre avec `types_textes`, qui est déjà là : celle-là
// reconnait le TYPE d'un texte qu'on a sous les yeux (narratif, documentaire,
// prescriptif, poétique). « Devenir lecteur » ne parle pas d'un texte, elle
// parle du LECTEUR : ce qu'il rapporte d'une lecture à la suivante.

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
    label: "Sons complexes et graphèmes particuliers",
    boId: "BOCE1FL1",
    prerequis: ["fluence_lecture"],
    levels: [1, 2, 3],
  },

  // Lecture – compréhension
  {
    id: "comprehension_lecture",
    label: "Compréhension de textes",
    boId: "BOCE1FL2",
    prerequis: ["fluence_lecture"],
    levels: [1, 2, 3],
  },
  {
    id: "types_textes",
    label: "Types de textes (narratif, documentaire, prescriptif, poétique)",
    boId: "BOCE1FL2",
    prerequis: ["comprehension_lecture"],
    levels: [1, 2],
  },
  {
    id: "devenir_lecteur",
    label: "Devenir lecteur",
    boId: "BOCE1FL2",
    prerequis: ["comprehension_lecture"],
    levels: [1, 2],
  },

  // Écriture
  {
    id: "ecriture_cursive",
    label: "Écriture cursive et quatre écritures",
    boId: "BOCE1FE1",
    prerequis: [],
    levels: [1, 2],
  },
  {
    id: "copie_fluente",
    label: "Copie fluente et soignée",
    boId: "BOCE1FE1",
    prerequis: [],
    levels: [1, 2],
  },
  {
    id: "ecriture_mots",
    label: "Écriture de mots et dictée",
    boId: "BOCE1FE1",
    prerequis: ["copie_fluente"],
    levels: [1, 2, 3],
  },
  {
    id: "production_ecrite",
    label: "Production d'écrits",
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
    label: "Classes de mots (nom, verbe, adjectif, déterminant, pronom)",
    boId: "BOCE1FG1",
    prerequis: ["grammaire_phrase"],
    levels: [1, 2, 3],
  },

  // Orthographe
  {
    id: "orthographe",
    label: "Orthographe grammaticale",
    boId: "BOCE1FG1",
    prerequis: ["ecriture_mots"],
    levels: [1, 2, 3],
  },
  {
    id: "orthographe_lexicale",
    label: "Orthographe lexicale",
    boId: "BOCE1FV1",
    prerequis: ["sons_complexes"],
    levels: [1, 2, 3],
  },

  // Conjugaison
  {
    id: "conjugaison",
    label: "Conjugaison – présent, imparfait, futur, passé composé",
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
