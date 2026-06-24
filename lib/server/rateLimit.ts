// Rate limiting côté serveur, adossé à la fonction SQL public.rate_limit_hit
// (voir supabase/rate_limit.sql). « Fail-open » : si la fonction n'existe pas
// encore en base, ou en cas d'erreur réseau, on AUTORISE — la sécurité ne doit
// pas casser la connexion légitime tant que le SQL n'est pas déployé.
//
// À n'importer que côté serveur (routes API, service-role).

import type { SupabaseClient } from "@supabase/supabase-js";

/** Extrait l'IP cliente derrière le proxy Vercel (best effort). */
export function clientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) {
    const first = xff.split(",")[0]?.trim();
    if (first) return first;
  }
  return req.headers.get("x-real-ip")?.trim() || "unknown";
}

/**
 * Renvoie true si la requête est autorisée pour ce bucket, false si le quota
 * est dépassé. Fail-open en cas d'erreur (fonction SQL absente, etc.).
 */
export async function rateLimitOk(
  admin: SupabaseClient,
  bucket: string,
  limit: number,
  windowSeconds: number
): Promise<boolean> {
  try {
    const { data, error } = await admin.rpc("rate_limit_hit", {
      p_bucket: bucket,
      p_limit: limit,
      p_window_seconds: windowSeconds,
    });
    if (error) return true; // fonction non déployée → on n'empêche rien
    return data !== false;
  } catch {
    return true;
  }
}
