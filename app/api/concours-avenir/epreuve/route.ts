// Tirage d'une épreuve blanche du Concours Avenir.
//
// Le tirage se fait ici, côté serveur, et non dans le navigateur : les banques
// de questions Terminale pèsent trop lourd pour un bundle client.
// Le navigateur envoie les identifiants des questions déjà rencontrées afin
// que chaque nouvelle épreuve soit réellement nouvelle.

import { NextResponse } from "next/server";
import { tirerEpreuve } from "@/lib/concours-avenir/tirage";

export const dynamic = "force-dynamic";

/** Garde-fou : au-delà, l'élève a fait le tour du vivier de toute façon. */
const MAX_DEJA_VUS = 2000;

export async function POST(request: Request) {
  let dejaVus: string[] = [];

  try {
    const body = await request.json();
    if (Array.isArray(body?.dejaVus)) {
      dejaVus = body.dejaVus
        .filter((id: unknown): id is string => typeof id === "string")
        .slice(-MAX_DEJA_VUS);
    }
  } catch {
    // Corps absent ou illisible : on tire une épreuve neutre.
  }

  const epreuve = tirerEpreuve(dejaVus);

  return NextResponse.json(epreuve, {
    headers: { "cache-control": "no-store" },
  });
}
