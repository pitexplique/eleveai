// CE QUE L'ÉLÈVE A DÉJÀ VU, D'UNE SÉANCE À L'AUTRE.
//
// POURQUOI (17/08/2026). `recentQuestionIds` repartait vide à chaque
// `startTutorSessionV4` : la mémoire du coach ne survivait pas à la fermeture
// de l'onglet. Un élève revenu le lendemain pouvait retomber sur la question de
// la veille — et un coach sert précisément à revenir. Tout le volume d'une
// banque ne jouait qu'à l'intérieur d'une séance.
//
// OÙ. Dans le navigateur, par classe et par matière. Ce sont des identifiants
// de questions, rien qui décrive l'élève : aucune raison de les envoyer
// ailleurs, et une clé par matière permet d'en oublier une sans toucher aux
// autres.
//
// ⚠️ NE JAMAIS FAIRE ÉCHOUER UNE SÉANCE POUR ÇA. Navigation privée, quota
// dépassé, stockage refusé : tout est enveloppé. Sans mémoire, le coach se
// comporte comme avant — il recommence à zéro, ce qui est un moindre mal
// comparé à un écran qui ne s'ouvre pas.

import { idPourMemoire } from "@/lib/tutor-v4/fingerprint";

/** Au-delà, on oublie le plus ancien. Le moteur borne de son côté. */
const MAX = 150;

function cle(classe: string, matiere: string): string {
  return `eleveai:tutor-vu:${classe}:${matiere}`;
}

export function lireQuestionsVues(classe: string, matiere: string): string[] {
  if (typeof window === "undefined") return [];
  try {
    const brut = window.localStorage.getItem(cle(classe, matiere));
    if (!brut) return [];
    const lu: unknown = JSON.parse(brut);
    if (!Array.isArray(lu)) return [];
    return lu.filter((v): v is string => typeof v === "string").slice(-MAX);
  } catch {
    return [];
  }
}

/**
 * Retient une question qui vient d'être servie.
 *
 * L'identifiant est réduit à sa forme stable (`idPourMemoire`) : sans cela, la
 * même question revue demain s'écrirait autrement — l'horloge est dans l'id —
 * et s'empilerait au lieu de se reconnaître.
 */
export function retenirQuestionVue(
  classe: string,
  matiere: string,
  questionId: string,
): void {
  if (typeof window === "undefined" || !questionId) return;
  try {
    const stable = idPourMemoire(questionId);
    const vues = lireQuestionsVues(classe, matiere).filter((v) => v !== stable);
    vues.push(stable);
    window.localStorage.setItem(
      cle(classe, matiere),
      JSON.stringify(vues.slice(-MAX)),
    );
  } catch {
    /* Stockage indisponible : on continue sans mémoire longue. */
  }
}
