// Garde de session pour les routes API coûteuses (appels LLM).
// L'optimiseur est réservé aux connectés : chaque requête doit porter
// le jeton signé délivré au login (Authorization: Bearer <token>).

import { NextResponse } from "next/server";
import {
  verifySessionToken,
  type SessionTokenPayload,
} from "@/lib/server/session";

export function sessionFromRequest(req: Request): SessionTokenPayload | null {
  const auth = req.headers.get("authorization") || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  return verifySessionToken(token);
}

/** Réponse 401 standard quand aucun jeton valide n'accompagne la requête. */
export function reponseNonConnecte() {
  return NextResponse.json(
    {
      error:
        "L'optimiseur est réservé aux utilisateurs connectés. Connecte-toi pour continuer.",
    },
    { status: 401 }
  );
}
