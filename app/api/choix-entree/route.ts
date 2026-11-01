// /api/choix-entree — un clic sur un des chemins de la page d'entrée (app/ChoixEntree.tsx).
// Appelé en fire-and-forget (sendBeacon). RGPD : un compteur par chemin et par
// jour, aucune identité (supabase/choix_entree.sql).

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const CHEMINS = new Set(["coach", "journal", "accueil"]);

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    const chemin = typeof body?.chemin === "string" ? body.chemin : "";
    if (!CHEMINS.has(chemin)) return new NextResponse(null, { status: 204 });

    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
    await supabase.rpc("compter_choix_entree", { p_chemin: chemin });
  } catch {
    // Silencieux : compter ne doit JAMAIS retenir l'élève.
  }
  return new NextResponse(null, { status: 204 });
}
