// Export CSV des emails ayant consenti à la newsletter (secours : envoi depuis
// un outil externe). Protégé par le cookie admin signé.
//
// GET /api/admin/newsletter/export  → text/csv

import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { verifyAdminCookieValue } from "@/lib/server/adminAuth";

export const dynamic = "force-dynamic";

function csvCell(v: unknown): string {
  const s = String(v ?? "");
  // Échappe les guillemets et encadre si nécessaire (RFC 4180).
  return /[",\n;]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

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
    .select("email, nom, type_utilisateur, source, created_at")
    .eq("accepte_newsletter", true)
    .not("email", "is", null)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: 500 }
    );
  }

  const header = ["email", "nom", "type", "source", "created_at"];
  const lines = [header.join(",")];
  for (const r of data ?? []) {
    lines.push(
      [
        csvCell(r.email),
        csvCell(r.nom),
        csvCell(r.type_utilisateur),
        csvCell(r.source),
        csvCell(r.created_at),
      ].join(",")
    );
  }

  // BOM UTF-8 pour qu'Excel affiche correctement les accents.
  const csv = "﻿" + lines.join("\r\n");

  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="newsletter-consentants.csv"`,
    },
  });
}
