// lib/tutor-v4/questionBank/ce1/maths/animaux.bank.ts
//
// ⭐ 14/11/2026 — LES ANIMAUX AU CE1 (bibliothèque `lib/canvas/animaux`). La
// multiplication du CE1 n'avait AUCUN dessin (0 % mesuré le 14/11) : des
// rangées d'animaux montrent le « 3 fois 4 » avant de l'écrire, et les pattes
// le font calculer. S'ajoutent : partager en parts égales, combien de plus.
// Gabarits ajoutés aux étoiles déjà servies par les banques écrites.
// Familles et canvas : `cycle2/maths/animaux.ts`.

import type { TutorBankItemV4, TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import {
  combienDePlus,
  partager,
  pattes,
  rangeesAddition,
  rangeesCommutativite,
  rangeesMultiplication,
  rangeesTotal,
  unParmi,
} from "@/lib/tutor-v4/questionBank/cycle2/maths/animaux";

type Famille = () => TutorGeneratedQuestionV4;

function gab(
  id: string,
  notionId: string,
  microId: string,
  difficulty: 1 | 2 | 3 | 4 | 5,
  hint: string,
  familles: readonly Famille[],
): TutorBankItemV4 {
  return {
    kind: "template",
    id,
    niveau: "ce1",
    matiere: "maths",
    notionId,
    microId,
    difficulty,
    theme: "neutral",
    hint,
    tags: ["ce1", notionId, "animaux", "canvas", "template"],
    generate: () => unParmi(familles)(),
  };
}

export const animauxCe1Bank: TutorBankItemV4[] = [
  gab("ce1_multiplication_sens_animaux_2", "multiplication", "ce1_multiplication_sens", 2,
    "Chaque ligne a le même nombre d'animaux : on ajoute ce nombre autant de fois qu'il y a de lignes.",
    [() => rangeesAddition(4, 5)]),
  gab("ce1_multiplication_symbole_animaux_1", "multiplication", "ce1_multiplication_symbole", 1,
    "« 3 × 4 » veut dire 3 fois 4 : 3 lignes de 4.",
    [() => rangeesMultiplication(4, 5)]),
  gab("ce1_multiplication_commutativite_animaux_3", "multiplication", "ce1_multiplication_commutativite", 3,
    "Compte les colonnes, puis les animaux dans une colonne.",
    [() => rangeesCommutativite(4, 6)]),
  gab("ce1_multiplication_calculer_animaux_3", "multiplication", "ce1_multiplication_calculer", 3,
    "Combien de pattes a UN animal ? Ajoute-le autant de fois qu'il y a d'animaux.",
    [() => pattes(5), () => rangeesTotal(5, 5)]),
  gab("ce1_multiplication_calculer_animaux_4", "multiplication", "ce1_multiplication_calculer", 4,
    "Lignes × animaux par ligne, ou animaux × pattes.",
    [() => pattes(8), () => rangeesTotal(5, 6)]),
  gab("ce1_division_partage_animaux_3", "division_partage", "ce1_division_partage", 3,
    "Distribue un par un dans chaque part, jusqu'à ce qu'il n'en reste plus.",
    [() => partager()]),
  gab("ce1_probleme_comparaison_animaux_3", "probleme", "ce1_probleme_comparaison", 3,
    "Compte chaque collection, puis cherche l'écart entre les deux nombres.",
    [() => combienDePlus(5, 20)]),
];
