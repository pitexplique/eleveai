// Aperçu des destinataires de la newsletter (dashboard admin).
// Protégé par le cookie admin signé. Lecture service-role.
//
// GET /api/admin/newsletter
//   → { ok, total, bySource, sample } des comptes users_email ayant consenti
//     (accepte_newsletter = true).

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import { verifyAdminCookieValue } from "@/lib/server/adminAuth";

export const dynamic = "force-dynamic";

export async function GET() {
  const cookieStore = await cookies();
  if (!verifyAdminCookieValue(cookieStore.get("admin-auth")?.value)) {
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
    .from("users_email")
    .select("email, nom, source, created_at")
    .eq("accepte_newsletter", true)
    .not("email", "is", null)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: 500 }
    );
  }

  const rows = data ?? [];
  const bySource: Record<string, number> = {};
  for (const r of rows) {
    const s = (r.source as string) || "direct";
    bySource[s] = (bySource[s] ?? 0) + 1;
  }

  // + les abonnés sans compte (coupon « Recevez le journal » de l'accueil).
  // Dédoublonnés contre les comptes ; tolérant si la table n'existe pas encore.
  let abonnesJournal = 0;
  try {
    const emailsComptes = new Set(
      rows.map((r) => String(r.email ?? "").trim().toLowerCase())
    );
    const { data: abonnes } = await supabase
      .from("newsletter_abonnes")
      .select("email")
      .eq("actif", true);
    abonnesJournal = (abonnes ?? []).filter(
      (a) => !emailsComptes.has(String(a.email ?? "").trim().toLowerCase())
    ).length;
    if (abonnesJournal > 0) {
      bySource["journal (sans compte)"] = abonnesJournal;
    }
  } catch {
    /* table absente : aperçu comptes seulement */
  }

  return NextResponse.json({
    ok: true,
    total: rows.length + abonnesJournal,
    bySource,
    sample: rows.slice(0, 20).map((r) => ({
      email: r.email,
      nom: r.nom,
      source: r.source ?? null,
      created_at: r.created_at,
    })),
  });
}
