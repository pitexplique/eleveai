// Notions de français pour la classe de CE2.
// Référence : programme officiel du cycle 2,
// BO n° 41 du 31 octobre 2024, applicable à la rentrée 2025.
//
// Relu le 09/08/2026 contre le texte intégral (Annexe 3). Trois notions
// ajoutées : « Écriture de mots et dictée », qui manquait alors que le BO a
// « Encoder puis écrire sous dictée » aux trois niveaux ; « Types de textes »,
// parce que le CE2 doit différencier le narratif de l'informatif et du
// prescriptif ; et « Orthographe lexicale », que le BO range sous Vocabulaire.

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
    label: "Compréhension de textes",
    boId: "BOCE2FL1",
    prerequis: ["fluence_lecture"],
    levels: [1, 2, 3],
  },
  {
    id: "types_textes",
    label: "Types de textes (narratif, informatif, prescriptif, poétique, théâtral)",
    boId: "BOCE2FL1",
    prerequis: ["comprehension_lecture"],
    levels: [1, 2, 3],
  },
  {
    id: "copie_fluente",
    label: "Copie fluente et soignée",
    boId: "BOCE2FE1",
    prerequis: [],
    levels: [1, 2],
  },
  {
    id: "ecriture_mots",
    label: "Écriture de mots et dictée",
    boId: "BOCE2FE1",
    prerequis: ["copie_fluente"],
    levels: [1, 2, 3],
  },
  {
    id: "production_ecrite",
    label: "Production d'écrits",
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
    label: "Classes de mots (avec l'adverbe)",
    boId: "BOCE2FG1",
    prerequis: ["grammaire_phrase"],
    levels: [1, 2, 3],
  },
  {
    id: "orthographe",
    label: "Orthographe grammaticale",
    boId: "BOCE2FG1",
    prerequis: ["classes_mots"],
    levels: [1, 2, 3],
  },
  {
    id: "orthographe_lexicale",
    label: "Orthographe lexicale",
    boId: "BOCE2FV1",
    prerequis: ["ecriture_mots"],
    levels: [1, 2, 3],
  },
  {
    id: "conjugaison",
    label: "Conjugaison – quatre temps, être, avoir, 1ᵉʳ groupe et huit irréguliers",
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
