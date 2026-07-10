// app/api/admin/calls/route.ts — inscriptions aux calls « En direct » pour le
// dashboard admin. Protégée par le cookie admin signé (lib/server/adminAuth).
// La table call_messages est sous RLS sans policy : lecture via service role.
//
// GET             -> les calls (lib/calls.ts) + leurs inscrits + compteurs
// GET ?format=csv -> export CSV complet (séparateur ; pour Excel FR) — pratique
//                    pour envoyer le lien visio aux inscrits via Resend.

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import { verifyAdminCookieValue } from "@/lib/server/adminAuth";
import { CALLS } from "@/lib/calls";

async function isAdmin() {
  const cookieStore = await cookies();
  return verifyAdminCookieValue(cookieStore.get("admin-auth")?.value);
}

function serviceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

function csvCell(value: unknown): string {
  if (value === null || value === undefined) return "";
  const text = String(value);
  if (/[";\n\r]/.test(text)) {
    return `"${text.replace(/"/g, '""')}"`;
  }
  return text;
}

export async function GET(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json(
      { ok: false, error: "Accès réservé à l'administration." },
      { status: 401 }
    );
  }

  const supabase = serviceClient();
  const { data, error } = await supabase
    .from("call_messages")
    .select(
      "call_id, email, prenom, role, consentement_newsletter, present, created_at"
    )
    .order("created_at", { ascending: false })
    .limit(5000);

  if (error) {
    return NextResponse.json(
      { ok: false, error: "Impossible de charger les inscriptions." },
      { status: 500 }
    );
  }

  const lignes = data ?? [];
  const url = new URL(request.url);

  if (url.searchParams.get("format") === "csv") {
    const entetes = ["call", "date_call", "email", "prenom", "role", "newsletter", "present", "inscrit_le"];
    const corps = lignes.map((r) => {
      const call = CALLS.find((c) => c.id === r.call_id);
      return [
        call?.titre ?? r.call_id,
        call?.date ?? "",
        r.email,
        r.prenom,
        r.role,
        r.consentement_newsletter ? "oui" : "non",
        r.present === null ? "" : r.present ? "oui" : "non",
        r.created_at,
      ]
        .map(csvCell)
        .join(";");
    });
    // BOM UTF-8 pour qu'Excel détecte l'encodage, séparateur ; (Excel FR).
    const csv = "﻿" + [entetes.join(";"), ...corps].join("\r\n");
    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": 'attachment; filename="inscriptions-calls.csv"',
      },
    });
  }

  // Groupement par call, dans l'ordre de lib/calls.ts (source de vérité).
  const calls = CALLS.map((c) => ({
    id: c.id,
    titre: c.titre,
    date: c.date,
    actif: c.actif,
    lienVisioRenseigne: Boolean(c.lienVisio),
    inscrits: lignes.filter((r) => r.call_id === c.id),
  }));
  // Inscriptions orphelines (call retiré de lib/calls.ts) : on les montre aussi.
  const idsConnus = new Set(CALLS.map((c) => c.id));
  const orphelines = lignes.filter((r) => !idsConnus.has(r.call_id));

  return NextResponse.json({ ok: true, calls, orphelines });
}
