/**
 * ⭐ 25/11/2026 — Le mur des 10 questions offertes (modèle du 22/11).
 *
 * Un visiteur SANS compte a OFFRE.questionsGratuitesParJour réponses par jour
 * au coach. Le compteur vit dans le navigateur (localStorage), remis à 0 chaque
 * jour (date locale). Un élève, un prof ou un parent connecté n'est jamais
 * compté : c'est l'appelant qui ne compte que les visiteurs.
 *
 * Stockage refusé (navigation privée, données bloquées) : on ne bloque pas.
 */
import { OFFRE } from "@/lib/tarifs";

const CLE = "eleveai-questions-offertes";

export const LIMITE_QUESTIONS_OFFERTES = OFFRE.questionsGratuitesParJour;

function aujourdhui(): string {
  const d = new Date();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const j = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${j}`;
}

/** Nombre de questions offertes déjà utilisées aujourd'hui. */
export function questionsOffertesUtilisees(): number {
  try {
    const brut = localStorage.getItem(CLE);
    if (!brut) return 0;
    const v = JSON.parse(brut) as { date?: string; n?: number };
    if (v?.date !== aujourdhui()) return 0;
    const n = Number(v.n);
    return Number.isFinite(n) && n > 0 ? Math.floor(n) : 0;
  } catch {
    return 0;
  }
}

/** Vrai quand les questions offertes du jour sont toutes utilisées. */
export function questionsOffertesEpuisees(): boolean {
  return questionsOffertesUtilisees() >= LIMITE_QUESTIONS_OFFERTES;
}

/** Compte une réponse corrigée ; renvoie le nouveau total du jour. */
export function compterQuestionOfferte(): number {
  const n = questionsOffertesUtilisees() + 1;
  try {
    localStorage.setItem(CLE, JSON.stringify({ date: aujourdhui(), n }));
  } catch {
    /* stockage refusé : on ne bloque pas */
  }
  return n;
}
