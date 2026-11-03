// Les profs de l'aventure, côté administration.
//
// Protégée par le cookie admin signé, comme /api/admin/beta-testeurs. La table
// profs_aventure est sous RLS sans policy : lecture en service role.
//
// GET                    -> les demandes de l'année + le nombre de classes par pays
// PATCH { id, statut }   -> accepter / refuser / terminer / remettre en attente
// PATCH { id, note }     -> note interne

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import { verifyAdminCookieValue } from "@/lib/server/adminAuth";
import { ANNEE_AVENTURE, PAYS_AVENTURE } from "@/lib/aventure/pays";

export const dynamic = "force-dynamic";

const COLONNES =
  "id, created_at, prenom, email, pays, niveaux, etablissement, message, statut, note_interne";

const STATUTS = new Set(["candidat", "accepte", "refuse", "termine"]);

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

function refus() {
  return NextResponse.json(
    { ok: false, error: "Accès réservé à l'administration." },
    { status: 401 }
  );
}

export async function GET() {
  if (!(await isAdmin())) return refus();

  const { data, error } = await serviceClient()
    .from("profs_aventure")
    .select(COLONNES)
    .eq("annee", ANNEE_AVENTURE)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json(
      { ok: false, error: "Impossible de charger les demandes." },
      { status: 500 }
    );
  }

  const lignes = data ?? [];
  // Le plan vise deux classes par pays : c'est ce qui décide qui accepter.
  const parPays = PAYS_AVENTURE.map((p) => ({
    pays: p.slug,
    nom: p.nom,
    acceptes: lignes.filter((l) => l.pays === p.slug && l.statut === "accepte").length,
    enAttente: lignes.filter((l) => l.pays === p.slug && l.statut === "candidat").length,
  }));

  return NextResponse.json({ ok: true, demandes: lignes, parPays });
}

export async function PATCH(req: Request) {
  if (!(await isAdmin())) return refus();

  const body = await req.json().catch(() => null);
  const id = typeof body?.id === "string" ? body.id : null;
  if (!id) return NextResponse.json({ ok: false, error: "id manquant" }, { status: 400 });

  const maj: Record<string, string | null> = {};
  if (typeof body?.statut === "string") {
    if (!STATUTS.has(body.statut)) {
      return NextResponse.json({ ok: false, error: "statut inconnu" }, { status: 400 });
    }
    maj.statut = body.statut;
  }
  if (typeof body?.note === "string") maj.note_interne = body.note.trim().slice(0, 1000) || null;
  if (Object.keys(maj).length === 0) {
    return NextResponse.json({ ok: false, error: "rien à changer" }, { status: 400 });
  }

  const { error } = await serviceClient().from("profs_aventure").update(maj).eq("id", id);
  if (error) {
    return NextResponse.json({ ok: false, error: "Mise à jour impossible." }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
