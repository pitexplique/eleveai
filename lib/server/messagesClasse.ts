// ✉️ MESSAGE À LA CLASSE (24/11/2026) — partie serveur commune aux routes
// /api/prof/messages-classe et /api/eleve/messages-classe.
// Voir supabase/messages_classe.sql pour le pourquoi (sens unique, RLS).

import type { SupabaseClient } from "@supabase/supabase-js";

export const LONGUEUR_MAX_MESSAGE = 500;

// ⭐ 24/11/2026 — Frédéric : « 7 j, effacé à 30 j ».
const JOUR_MS = 24 * 3600 * 1000;
/** L'élève ne voit que les messages des 7 derniers jours. */
export const VISIBLE_ELEVE_MS = 7 * JOUR_MS;
/** Au-delà de 30 jours, le message est effacé (les « lu » suivent : cascade). */
export const EFFACE_APRES_MS = 30 * JOUR_MS;

/**
 * Efface les messages de plus de 30 jours, toutes classes confondues. Sans
 * pg_cron : appelé par les routes (prof GET/POST, élève GET). Une erreur ici
 * ne bloque jamais la route.
 */
export async function purgerVieuxMessages(admin: SupabaseClient): Promise<void> {
  try {
    await admin
      .from("messages_classe")
      .delete()
      .lt("created_at", new Date(Date.now() - EFFACE_APRES_MS).toISOString());
  } catch {
    /* rien : la purge se refera au prochain appel */
  }
}

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

/**
 * 📤 SÉANCE ENVOYÉE À LA CLASSE (24/11/2026) — le lien d'un message.
 * ⛔ Seulement un CHEMIN INTERNE vers le coach (« /coach/serie?… »,
 * « /coach-ia/… »). Une URL complète du site (copiée du « 🔗 Lien élèves »)
 * est ramenée à son chemin si son hôte est eleveai.fr ou localhost ; tout le
 * reste (autre site, « // », « \ », javascript:…) est refusé → null.
 */
export function nettoyerLienSeance(brut: unknown): string | null {
  if (typeof brut !== "string") return null;
  let s = brut.trim();
  if (!s) return null;
  if (/^https?:\/\//i.test(s)) {
    try {
      const u = new URL(s);
      const hote = u.hostname.toLowerCase();
      const interne = hote === "eleveai.fr" || hote.endsWith(".eleveai.fr") || hote === "localhost" || hote === "127.0.0.1";
      if (!interne) return null;
      s = u.pathname + u.search;
    } catch {
      return null;
    }
  }
  if (!s.startsWith("/coach")) return null;
  if (s.includes("//") || s.includes("\\") || s.length > 1000) return null;
  // eslint-disable-next-line no-control-regex
  if (/[\u0000-\u001F\u007F\s]/.test(s)) return null;
  return s;
}
