// Liste des retours élèves (/votre-avis) pour l'administration.
// Protégée par le cookie admin signé (lib/server/adminAuth) : réservée au
// propriétaire du site, pas aux comptes profs. La table retours_eleves est
// sous RLS sans policy, la lecture passe par la clé service role.

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import { verifyAdminCookieValue } from "@/lib/server/adminAuth";

export async function GET() {
  const cookieStore = await cookies();
  const isAuthed = verifyAdminCookieValue(cookieStore.get("admin-auth")?.value);

  if (!isAuthed) {
    return NextResponse.json(
      { ok: false, error: "Accès réservé à l'administration." },
      { status: 401 }
    );
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data, error } = await supabase
    .from("retours_eleves")
    .select(
      "id, type, page, message, note, code_etablissement, code_eleve, prenom, classe, email, created_at"
    )
    .order("created_at", { ascending: false })
    .limit(500);

  if (error) {
    return NextResponse.json(
      { ok: false, error: "Impossible de charger les retours." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true, retours: data ?? [] });
}
