// Notions de français pour la classe de CP.
// Référence : programme officiel du cycle 2,
// BO n° 41 du 31 octobre 2024, applicable à la rentrée 2025.
//
// Relu le 09/08/2026 contre le texte intégral (Annexe 3). Trois notions
// ajoutées : « Lire à voix haute » et « Devenir lecteur », qui sont deux des
// quatre objectifs de lecture du BO et n'existaient pas ; la « Conjugaison »,
// parce qu'être et avoir au présent sont un objectif du CP ; et
// « Orthographe lexicale », que le BO range sous Vocabulaire (nommer les
// accents, valeur sonore de s/c/g, an-am/en-em/on-om/in-im, lettre muette).

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
    label: "Correspondances graphème-phonème",
    boId: "BOCPFL1",
    prerequis: ["conscience_phonologique"],
    levels: [1, 2, 3],
  },
  {
    id: "lecture_syllabique",
    label: "Lecture syllabique et déchiffrage",
    boId: "BOCPFL1",
    prerequis: ["grapheme_phoneme"],
    levels: [1, 2, 3],
  },
  {
    id: "lecture_voix_haute",
    label: "Lire à voix haute",
    boId: "BOCPFL1",
    prerequis: ["lecture_syllabique"],
    levels: [1, 2],
  },

  // Lecture – compréhension
  {
    id: "comprehension_lecture",
    label: "Compréhension de textes",
    boId: "BOCPFL2",
    prerequis: ["lecture_syllabique"],
    levels: [1, 2, 3],
  },
  {
    id: "devenir_lecteur",
    label: "Devenir lecteur",
    boId: "BOCPFL2",
    prerequis: ["comprehension_lecture"],
    levels: [1, 2],
  },

  // Écriture
  {
    id: "copie",
    label: "Copie de mots et de phrases",
    boId: "BOCPFE1",
    prerequis: ["grapheme_phoneme"],
    levels: [1, 2],
  },
  {
    id: "ecriture_mots",
    label: "Écriture de mots (dictée)",
    boId: "BOCPFE1",
    prerequis: ["grapheme_phoneme", "copie"],
    levels: [1, 2, 3],
  },
  {
    id: "production_ecrite",
    label: "Production d'écrits simples",
    boId: "BOCPFE1",
    prerequis: ["ecriture_mots"],
    levels: [1, 2],
  },

  // Étude de la langue
  {
    id: "grammaire_phrase",
    label: "La phrase",
    boId: "BOCPFG1",
    prerequis: ["lecture_syllabique"],
    levels: [1, 2, 3],
  },
  /**
   * ⭐⭐ SÉPARÉE DE `grammaire_phrase` LE 02/09/2026, ET CE N'EST PAS UNE
   * INVENTION : LE CP ÉTAIT LA SEULE CLASSE À NE PAS LE FAIRE. Le CE1 et le CE2
   * ont `classes_mots` depuis toujours, avec le même libellé et le même
   * prérequis. Le découpage aligne le CP sur ses voisines.
   *
   * ⭐ Et c'est le GRAPHE DE PRÉRÉQUIS qui l'a montré, pas une impression : les
   * onze micros de `grammaire_phrase` descendaient toutes de
   * `cp_gram_phrase_reconnaitre`, qui avait DEUX enfants que rien ne reliait
   * ensuite — `majuscule_point` (où une phrase commence et finit) d'un côté,
   * `nom_verbe` (comment s'appellent les mots) de l'autre. Deux leçons, deux
   * notions.
   *
   * ⚠️ Les identifiants des micros ne changent PAS (`cp_gram_*`) : ils sont
   * cités par la banque de questions et par les fiches. Seul leur `notionId`
   * bouge — c'est ce qui rend le découpage sûr.
   */
  {
    id: "classes_mots",
    label: "Classes de mots (nom, verbe, adjectif, déterminant, pronom)",
    boId: "BOCPFG1",
    prerequis: ["grammaire_phrase"],
    levels: [1, 2, 3],
  },
  {
    id: "orthographe",
    label: "Orthographe grammaticale",
    boId: "BOCPFG1",
    prerequis: ["ecriture_mots"],
    levels: [1, 2, 3],
  },
  {
    id: "conjugaison",
    label: "Conjugaison – être et avoir au présent",
    boId: "BOCPFG1",
    prerequis: ["grammaire_phrase"],
    levels: [1, 2],
  },

  // Vocabulaire
  {
    id: "orthographe_lexicale",
    label: "Orthographe lexicale",
    boId: "BOCPFV1",
    prerequis: ["grapheme_phoneme"],
    levels: [1, 2, 3],
  },
  {
    id: "vocabulaire",
    label: "Vocabulaire",
    boId: "BOCPFV1",
    prerequis: ["comprehension_lecture"],
    levels: [1, 2],
  },
];
