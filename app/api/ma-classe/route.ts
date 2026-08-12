// LA CLASSE DE L'ÉLÈVE CONNECTÉ, LUE EN BASE À CHAQUE FOIS.
//
// POURQUOI CETTE ROUTE EXISTE (12/08/2026). La classe vivait à deux endroits
// qui mentaient tous les deux au lendemain d'un passage d'année :
//
//   1. le jeton de session, qui la fige à la connexion et vit 30 jours ;
//   2. le CODE de l'élève, dont le navigateur la DEVINAIT quand elle manquait
//      (« 6C19 » → « 6e », via inferClasseFromCode, supprimée ce jour).
//
// Le second était le pire : un code ne bouge jamais — c'est une identité —
// donc il continuait d'annoncer « 6e » pour un élève passé en 5e. Et c'est le
// coach qui lit cette valeur pour choisir le niveau des exercices.
//
// La table est la seule source qui dit la vérité du jour. Cette route la lit,
// et rien d'autre. Une ligne, sur un index.

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { verifySessionToken } from "@/lib/server/session";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const auth = req.headers.get("authorization") ?? "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  const session = verifySessionToken(token);
  if (!session) {
    return NextResponse.json(
      { ok: false, error: "Session expirée. Reconnecte-toi." },
      { status: 401 }
    );
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // Repli sur le jeton : les comptes e-mail n'ont pas de ligne
  // `acces_etablissement`, leur classe vit dans `users_email` et arrive déjà
  // par le jeton. En cas d'échec de lecture, on ne renvoie jamais moins que ce
  // que l'appelant avait déjà.
  let classe = session.classe ?? null;
  try {
    const { data } = await supabase
      .from("acces_etablissement")
      .select("classe")
      .eq("code_etablissement", session.code_etablissement)
      .eq("code_utilisateur", session.code_utilisateur)
      .maybeSingle();
    if (data && "classe" in data) classe = (data.classe as string | null) ?? null;
  } catch {
    // compte e-mail, ou base injoignable : le jeton fait foi.
  }

  return NextResponse.json({ ok: true, classe });
}
