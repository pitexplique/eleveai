// Bulletin de l'élève connecté (notes /20, progression, assiduité, appréciation).
// Lecture sécurisée : scope forcé au jeton de session signé (un élève ne voit
// que SON bulletin). On lit d'abord le snapshot pré-calculé (table bulletins,
// alimentée à chaque sauvegarde de résultat) ; s'il n'existe pas encore, on
// calcule à la volée et on tente de le mettre en cache pour la prochaine fois.

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { verifySessionToken } from "@/lib/server/session";
import { computeBulletin } from "@/lib/bulletin/computeBulletin";

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

  // 1) Snapshot pré-calculé (rapide).
  try {
    const { data } = await supabase
      .from("bulletins")
      .select("data")
      .eq("code_etablissement", session.code_etablissement)
      .eq("code_utilisateur", session.code_utilisateur)
      .maybeSingle();
    if (data?.data) {
      return NextResponse.json({ ok: true, bulletin: data.data });
    }
  } catch {
    // table absente / non lisible : on bascule sur le calcul à la volée.
  }

  // 2) Pas de snapshot : calcul à la volée (et mise en cache best-effort).
  const bulletin = await computeBulletin({
    codeEtablissement: session.code_etablissement,
    codeUtilisateur: session.code_utilisateur,
    nom: session.nom,
    classe: session.classe,
  });
  if (!bulletin) {
    return NextResponse.json({ ok: true, bulletin: null });
  }
  try {
    await supabase.from("bulletins").upsert({
      code_etablissement: session.code_etablissement,
      code_utilisateur: session.code_utilisateur,
      data: bulletin,
      updated_at: new Date().toISOString(),
    });
  } catch {
    // table absente : tant pis, le calcul a quand même renvoyé le bulletin.
  }
  return NextResponse.json({ ok: true, bulletin });
}
