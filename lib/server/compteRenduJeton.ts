// Le jeton du lien « ne plus recevoir ce compte rendu » (06/11/2026). Il empêche
// d'arrêter les courriels d'un autre parent. Il ne sert qu'à ça : préfixé, il ne
// vaut ni pour la lettre d'information ni pour une session.
import { createHmac, timingSafeEqual } from "node:crypto";

function signer(userId: string): string {
  const secret = process.env.ELEVEAI_SESSION_SECRET || process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!secret) throw new Error("Secret de signature manquant");
  return createHmac("sha256", secret).update(`compte-rendu:${userId}`).digest("base64url");
}

export function verifierJetonArret(userId: string, jeton: string): boolean {
  if (!userId || !jeton) return false;
  const attendu = Buffer.from(signer(userId));
  const recu = Buffer.from(jeton);
  return attendu.length === recu.length && timingSafeEqual(attendu, recu);
}

export function lienArret(userId: string): string {
  return `https://www.eleveai.fr/api/suivi/compte-rendu/arret?u=${encodeURIComponent(userId)}&t=${signer(userId)}`;
}
