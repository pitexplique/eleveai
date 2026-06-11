// Liste des retours élèves (/votre-avis) pour les professeurs.
// Protégée par le jeton de session signé : rôles prof / principal / boss
// uniquement. La table retours_eleves est sous RLS sans policy, la lecture
// passe donc par la clé service role.
//   - prof / principal : retours de LEUR établissement ;
//   - boss : tous les retours (y compris anonymes et comptes e-mail).

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { verifySessionToken } from "@/lib/server/session";

const ROLES_AUTORISES = new Set(["prof", "principal", "boss"]);

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
  if (!ROLES_AUTORISES.has(session.type_utilisateur)) {
    return NextResponse.json(
      { ok: false, error: "Accès réservé aux professeurs." },
      { status: 403 }
    );
  }

  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  let q = supabaseAdmin
    .from("retours_eleves")
    .select(
      "id, type, page, message, note, code_etablissement, code_eleve, prenom, classe, email, created_at"
    )
    .order("created_at", { ascending: false })
    .limit(500);

  if (session.type_utilisateur !== "boss") {
    q = q.eq("code_etablissement", session.code_etablissement);
  }

  const { data, error } = await q;

  if (error) {
    return NextResponse.json(
      { ok: false, error: "Impossible de charger les retours." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true, retours: data ?? [] });
}
