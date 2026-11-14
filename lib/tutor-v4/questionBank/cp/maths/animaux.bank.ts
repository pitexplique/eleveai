// lib/tutor-v4/questionBank/cp/maths/animaux.bank.ts
//
// ⭐ 14/11/2026 — LES ANIMAUX À COMPTER AU CP. Frédéric : « on pourra s'en servir
// pour le coach ! » (la bibliothèque `lib/canvas/animaux`). Des gabarits qui
// s'AJOUTENT aux banques écrites, aux étoiles qu'elles servent déjà :
// dénombrer (★2, ★3), comparer deux collections (★2), le rang dans une file
// (★2, ★3), réunir en lignes égales (★4), arriver puis partir (★5).
// Familles et canvas : `cycle2/maths/animaux.ts`. Animaux du monde seulement ;
// aucun nombre n'est écrit sur le dessin ; petites réponses au pavé.

import type { TutorBankItemV4, TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import {
  arriventPuisPartent,
  comparerCollections,
  compterParmi,
  denombrer,
  fileOrdinal,
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
    niveau: "cp",
    matiere: "maths",
    notionId,
    microId,
    difficulty,
    theme: "neutral",
    hint,
    tags: ["cp", notionId, "animaux", "canvas", "template"],
    generate: () => unParmi(familles)(),
  };
}

export const animauxCpBank: TutorBankItemV4[] = [
  gab("cp_entier_denombre_animaux_2", "nombre_entier", "cp_entier_denombre", 2,
    "Compte ligne par ligne : une ligne pleine, c'est cinq.",
    [() => denombrer(6, 20), () => denombrer(6, 15, { vrac: true }), () => compterParmi(4, 10)]),
  gab("cp_entier_denombre_animaux_3", "nombre_entier", "cp_entier_denombre", 3,
    "Une ligne pleine, c'est dix : compte de dix en dix, puis un par un.",
    [() => denombrer(21, 40, { parDix: true }), () => compterParmi(8, 15)]),
  gab("cp_entier_comparer_animaux_2", "nombre_entier", "cp_entier_comparer", 2,
    "Compte chaque collection, puis compare les deux nombres.",
    [() => comparerCollections(12), () => comparerCollections(18)]),
  gab("cp_entier_ordinal_animaux_2", "nombre_entier", "cp_entier_ordinal", 2,
    "Pars de la GAUCHE et compte les places : premier, deuxième…",
    [() => fileOrdinal({ reponse: "animal" })]),
  gab("cp_entier_ordinal_animaux_3", "nombre_entier", "cp_entier_ordinal", 3,
    "Compte les places depuis la gauche. « Devant », c'est sans compter l'animal lui-même.",
    [() => fileOrdinal({ reponse: "rang" })]),
  gab("cp_probleme_multiplicatif_animaux_4", "probleme", "cp_probleme_multiplicatif", 4,
    "Chaque ligne a le même nombre d'animaux : ajoute-le autant de fois qu'il y a de lignes.",
    [() => rangeesTotal(4, 5)]),
  gab("cp_probleme_deux_etapes_animaux_5", "probleme", "cp_probleme_deux_etapes", 5,
    "Fais les étapes dans l'ordre : d'abord ceux qui arrivent, puis ceux qui partent.",
    [() => arriventPuisPartent()]),
];
