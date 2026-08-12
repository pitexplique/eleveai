// Messages « Écris-moi » d'un élève + la réponse de son prof.
// Lecture sécurisée : on ne renvoie que les messages dont les codes
// correspondent au jeton de session signé (un élève ne voit que les siens).

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

  // 1) Messages « Écris-moi » de l'élève (+ réponse du prof éventuelle).
  const { data, error } = await supabase
    .from("contact_messages")
    .select("id, message, created_at, reponse, reponse_at, status")
    .eq("code_etablissement", session.code_etablissement)
    .eq("code_utilisateur", session.code_utilisateur)
    .eq("source", "eleve-message")
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) {
    return NextResponse.json(
      { ok: false, error: "Impossible de charger tes messages." },
      { status: 500 }
    );
  }

  // 2) Avis / bugs / idées de l'élève AUXQUELS le prof a répondu (on n'affiche
  // que ceux avec une réponse, pour ne pas noyer le dashboard).
  //
  // `archive` écarte les échanges qui n'ont plus lieu d'être — une idée déjà
  // réalisée, un bug corrigé. La LIGNE reste : /api/classement recompte les
  // points à partir de ces lignes, sans jamais regarder `archive`. Archiver
  // nettoie l'écran de l'élève ; ça ne lui retire ni ses points ni sa place.
  const { data: avis } = await supabase
    .from("retours_eleves")
    .select("id, type, note, message, reponse, reponse_at, created_at")
    .eq("code_etablissement", session.code_etablissement)
    .eq("code_eleve", session.code_utilisateur)
    .eq("archive", false)
    .not("reponse", "is", null)
    .order("reponse_at", { ascending: false })
    .limit(50);

  return NextResponse.json({ ok: true, messages: data ?? [], avis: avis ?? [] });
}
