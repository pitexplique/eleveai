// Session admin (cookie "admin-auth") signée HMAC-SHA256.
// Avant : le cookie valait littéralement "true", donc n'importe qui pouvait
// le forger depuis son navigateur (document.cookie = "admin-auth=true") et
// accéder à /admin/dashboard et aux API admin. La valeur est désormais une
// signature à expiration, vérifiable uniquement côté serveur.
//
// Ce module ne doit être importé que côté serveur.

import { createHmac, timingSafeEqual } from "node:crypto";

const VALIDITY_SECONDS = 60 * 60 * 24; // 1 jour (comme le maxAge du cookie)

function getSecret(): string {
  const secret =
    process.env.ELEVEAI_SESSION_SECRET || process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!secret) {
    throw new Error(
      "ELEVEAI_SESSION_SECRET (ou SUPABASE_SERVICE_ROLE_KEY) manquant"
    );
  }
  return secret;
}

function sign(exp: number): Buffer {
  return createHmac("sha256", getSecret()).update(`admin.${exp}`).digest();
}

export function createAdminCookieValue(): string {
  const exp = Math.floor(Date.now() / 1000) + VALIDITY_SECONDS;
  return `${exp}.${sign(exp).toString("base64url")}`;
}

export function verifyAdminCookieValue(value: unknown): boolean {
  if (typeof value !== "string" || value.length > 256) return false;

  const dot = value.indexOf(".");
  if (dot <= 0) return false;

  const exp = Number(value.slice(0, dot));
  if (!Number.isFinite(exp) || exp < Math.floor(Date.now() / 1000)) {
    return false;
  }

  try {
    const expected = sign(exp);
    const provided = Buffer.from(value.slice(dot + 1), "base64url");
    return (
      expected.length === provided.length && timingSafeEqual(expected, provided)
    );
  } catch {
    return false;
  }
}
