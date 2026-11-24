// ✉️ MESSAGE À LA CLASSE (24/11/2026) — partie serveur commune aux routes
// /api/prof/messages-classe et /api/eleve/messages-classe.
// Voir supabase/messages_classe.sql pour le pourquoi (sens unique, RLS).

export const LONGUEUR_MAX_MESSAGE = 500;

/**
 * Texte simple : on enlève les caractères de contrôle (sauf le retour à la
 * ligne), on resserre les lignes vides, on coupe à 500 signes. L'affichage se
 * fait en texte React (jamais de HTML injecté) : « <b> » reste écrit « <b> ».
 */
export function nettoyerMessage(brut: unknown): string {
  if (typeof brut !== "string") return "";
  return brut
    .replace(/\r\n?/g, "\n")
    // eslint-disable-next-line no-control-regex
    .replace(/[\u0000-\u0009\u000B-\u001F\u007F​-‏‪-‮⁦-⁩]/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}
