// Jeton de désinscription newsletter, signé HMAC-SHA256.
// Permet un lien « Se désinscrire » dans chaque email SANS table de tokens :
// le jeton = signature de l'email. Un clic sur le lien valide passe
// `users_email.accepte_newsletter` à false (obligation RGPD : opt-out simple).
//
// Ce module ne doit être importé que côté serveur.

import { createHmac, timingSafeEqual } from "node:crypto";

function getSecret(): string {
  // Même secret que la session admin (cf. lib/server/adminAuth.ts).
  const secret =
    process.env.ELEVEAI_SESSION_SECRET || process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!secret) {
    throw new Error(
      "ELEVEAI_SESSION_SECRET (ou SUPABASE_SERVICE_ROLE_KEY) manquant"
    );
  }
  return secret;
}

function normalize(email: string): string {
  return email.trim().toLowerCase();
}

export function unsubToken(email: string): string {
  return createHmac("sha256", getSecret())
    .update(`unsub.${normalize(email)}`)
    .digest("base64url");
}

export function verifyUnsubToken(email: string, token: unknown): boolean {
  if (typeof token !== "string" || !token) return false;
  try {
    const expected = Buffer.from(unsubToken(email));
    const provided = Buffer.from(token);
    return (
      expected.length === provided.length && timingSafeEqual(expected, provided)
    );
  } catch {
    return false;
  }
}

// URL de désinscription absolue à insérer dans les emails.
export function unsubUrl(email: string): string {
  const base = (
    process.env.NEXT_PUBLIC_SITE_URL || "https://eleveai.fr"
  ).replace(/\/$/, "");
  const e = encodeURIComponent(normalize(email));
  const t = unsubToken(email);
  return `${base}/api/newsletter/unsubscribe?e=${e}&t=${t}`;
}
