// LES CORRECTEURS DES GABARITS DE MATHS DE 6e (06/10/2026).
//
// ⛔⛔ POURQUOI. Mesuré le 05/10 : 176 micros de maths de 6e sur 177 sous le
// seuil des squelettes (9 phrases en médiane par micro : « Quel nombre est le
// plus grand : # ou # ? » revenait à l'identique, seuls les nombres changeaient).
// Frédéric : « établir une procédure qui rend robuste et que les générateurs
// aient aussi un correcteur ». Le français de 6e a ouvert la voie (`9cf52ca7`).
//
// ⭐ UN CORRECTEUR relit une question TIRÉE sans faire confiance au gabarit :
// il relit les nombres DANS LE TEXTE que voit l'élève (et la figure s'il y en a
// une), refait le calcul ou le raisonnement, et rend la liste des problèmes
// (vide = juste) : bonne réponse attendue, aucune proposition fausse qui serait
// juste, unités, plausibilité (un prix de baguette n'est pas à 40 €).
// `scripts/verifier-correcteurs-maths-6e.ts` le lance sur 500 tirages par
// gabarit : c'est un contrôle bloquant.

import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";

export type CorrecteurMaths = (q: TutorGeneratedQuestionV4) => string[];

/** Clé = `id` EXACT du gabarit (`kind: "template"`). */
export type CorrecteursMaths = Record<string, CorrecteurMaths>;
