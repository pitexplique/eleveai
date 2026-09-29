import type { ParcoursQuestionItem } from "./types";

/**
 * Ce qui fait qu'une question est NOUVELLE pour l'élève : l'énoncé, la réponse
 * attendue et les propositions TRIÉES — un simple mélange des propositions
 * n'est pas une question neuve. Partagée par la page /parcours (pour ne pas
 * servir deux fois la même) et par `scripts/verifier-evaluation-chapitres.ts`
 * (qui mesure ce que la page peut servir) : un seul étalon.
 */
export function cleQuestionParcours(q: ParcoursQuestionItem): string {
  return [
    q.text,
    (q.expected ?? []).join("|"),
    [...(q.choices ?? [])].sort().join("|"),
  ].join("##");
}
