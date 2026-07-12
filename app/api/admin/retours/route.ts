// Liste des retours élèves (/votre-avis) pour l'administration.
// Protégée par le cookie admin signé (lib/server/adminAuth) : réservée au
// propriétaire du site, pas aux comptes profs. La table retours_eleves est
// sous RLS sans policy, la lecture passe par la clé service role.
//
// GET                       -> page de retours (paramètre ?offset=) + total
// GET ?format=csv           -> export CSV complet (séparateur ; pour Excel FR)
// PATCH { id, traite }      -> marque un retour comme traité / à traiter

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import { verifyAdminCookieValue } from "@/lib/server/adminAuth";

const COLONNES =
  "id, type, page, message, note, code_etablissement, code_eleve, prenom, classe, email, traite, a_lhonneur, amelioration, reponse, reponse_at, created_at";

const PAGE_SIZE = 200;

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
  const url = new URL(request.url);

  if (url.searchParams.get("format") === "csv") {
    // Export complet : Supabase plafonne à 1000 lignes par requête, on boucle.
    const lignes: Record<string, unknown>[] = [];
    const LOT = 1000;
    for (let depart = 0; ; depart += LOT) {
      const { data, error } = await supabase
        .from("retours_eleves")
        .select(COLONNES)
        .order("created_at", { ascending: false })
        .range(depart, depart + LOT - 1);

      if (error) {
        return NextResponse.json(
          { ok: false, error: "Impossible d'exporter les retours." },
          { status: 500 }
        );
      }
      lignes.push(...(data ?? []));
      if (!data || data.length < LOT) break;
    }

    const entetes = [
      "date", "type", "note", "page", "message", "prenom", "classe",
      "code_eleve", "code_etablissement", "email", "traite",
    ];
    const corps = lignes.map((r) =>
      [
        r.created_at, r.type, r.note, r.page, r.message, r.prenom, r.classe,
        r.code_eleve, r.code_etablissement, r.email,
        r.traite ? "oui" : "non",
      ]
        .map(csvCell)
        .join(";")
    );
    // BOM UTF-8 pour qu'Excel détecte l'encodage, séparateur ; (Excel FR).
    const csv = "﻿" + [entetes.join(";"), ...corps].join("\r\n");

    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": 'attachment; filename="retours-eleves.csv"',
      },
    });
  }

  const offsetBrut = Number.parseInt(url.searchParams.get("offset") ?? "0", 10);
  const offset = Number.isFinite(offsetBrut) && offsetBrut > 0 ? offsetBrut : 0;

  const { data, error, count } = await supabase
    .from("retours_eleves")
    .select(COLONNES, { count: "exact" })
    .order("created_at", { ascending: false })
    .range(offset, offset + PAGE_SIZE - 1);

  if (error) {
    return NextResponse.json(
      { ok: false, error: "Impossible de charger les retours." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true, retours: data ?? [], total: count ?? 0 });
}

export async function PATCH(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json(
      { ok: false, error: "Accès réservé à l'administration." },
      { status: 401 }
    );
  }

  const body = await request.json().catch(() => null);
  const id = typeof body?.id === "string" ? body.id : null;
  const traite = typeof body?.traite === "boolean" ? body.traite : null;
  const aLHonneur = typeof body?.a_lhonneur === "boolean" ? body.a_lhonneur : null;
  const aReponse = body?.reponse !== undefined;
  const aAmelioration = body?.amelioration !== undefined;

  if (!id || (traite === null && aLHonneur === null && !aReponse && !aAmelioration)) {
    return NextResponse.json(
      { ok: false, error: "Requête invalide." },
      { status: 400 }
    );
  }

  const update: Record<string, unknown> = {};
  if (traite !== null) update.traite = traite;
  if (aReponse) {
    const reponse = String(body.reponse).trim();
    update.reponse = reponse || null;
    update.reponse_at = reponse ? new Date().toISOString() : null;
  }
  // L'amélioration (« ce que ça a produit ») : le texte publié sur le mur.
  if (aAmelioration) {
    const amelioration = String(body.amelioration).trim().slice(0, 500);
    update.amelioration = amelioration || null;
  }
  // « À l'honneur » : le cran au-dessus. Une contribution retenue est par
  // définition traitée → on coche aussi `traite` pour rester cohérent.
  if (aLHonneur !== null) {
    update.a_lhonneur = aLHonneur;
    if (aLHonneur) update.traite = true;
  }

  const { error } = await serviceClient()
    .from("retours_eleves")
    .update(update)
    .eq("id", id);

  if (error) {
    return NextResponse.json(
      { ok: false, error: "Impossible de mettre à jour le retour." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
