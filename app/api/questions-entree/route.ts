// /api/questions-entree — ce que les gens tapent dans « Que veux-tu faire
// aujourd'hui ? », et ce que le moteur en a compris.
//
// Appelée en fire-and-forget par l'entrée : elle ne doit JAMAIS ralentir une
// recherche ni la faire échouer. Toute erreur se termine en 204.
//
// RGPD : aucune identité n'est reçue ni stockée — pas de nom, pas de code, pas
// d'IP, pas d'identifiant de session. Voir supabase/questions_entree.sql.

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

/** Au-delà, ce n'est plus une question : on coupe. */
const MAX_QUESTION = 300;

function texte(valeur: unknown, max: number): string | null {
  if (typeof valeur !== "string") return null;
  const propre = valeur.trim().slice(0, max);
  return propre || null;
}

export async function POST(req: Request) {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const cle = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !cle) return new NextResponse(null, { status: 204 });

    const body = await req.json().catch(() => null);
    const question = texte(body?.question, MAX_QUESTION);
    if (!question) return new NextResponse(null, { status: 204 });

    const trouvesBrut = Number(body?.trouves);
    const trouves = Number.isFinite(trouvesBrut)
      ? Math.max(0, Math.min(99, Math.trunc(trouvesBrut)))
      : 0;

    const { error } = await createClient(url, cle, { auth: { persistSession: false } })
      .from("questions_entree")
      .insert({
        question,
        profil: texte(body?.profil, 20),
        chip: texte(body?.chip, 60),
        notion: texte(body?.notion, 40),
        intention: texte(body?.intention, 20),
        trouves,
        ou: body?.ou === "accueil" ? "accueil" : "page",
      });

    // Table pas encore créée (le SQL n'a pas été passé) : on ne casse rien,
    // on note dans les logs serveur et la recherche continue de vivre.
    if (error) console.error("questions_entree :", error.message);

    return new NextResponse(null, { status: 204 });
  } catch {
    return new NextResponse(null, { status: 204 });
  }
}
