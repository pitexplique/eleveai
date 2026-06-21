import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import { verifyAdminCookieValue } from "@/lib/server/adminAuth";
import { detecterIA } from "@/lib/detection-ia";

const STATUTS = ["new", "in_progress", "done"];

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

export async function GET() {
  if (!(await isAdmin())) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { data, error } = await serviceClient()
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Enrichit chaque message d'un drapeau « IA probable » (calculé à la lecture,
  // pas stocké) → badge dans le dashboard, sans bloquer l'élève à l'envoi.
  const enrichi = (data ?? []).map((m: Record<string, unknown>) => {
    const det = detecterIA(m.message as string | null);
    return { ...m, suspect_ia: det.suspect, raison_ia: det.raison };
  });

  return NextResponse.json(enrichi);
}

// Mise à jour : statut (new / in_progress / done) et/ou réponse du prof.
export async function PATCH(req: Request) {
  if (!(await isAdmin())) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const id = body?.id;
  if (id === undefined || id === null) {
    return NextResponse.json({ error: "id manquant." }, { status: 400 });
  }

  const update: Record<string, unknown> = {};

  if (body?.status !== undefined) {
    if (!STATUTS.includes(body.status)) {
      return NextResponse.json({ error: "Statut invalide." }, { status: 400 });
    }
    update.status = body.status;
  }

  if (body?.reponse !== undefined) {
    const reponse = String(body.reponse).trim();
    update.reponse = reponse || null;
    update.reponse_at = reponse ? new Date().toISOString() : null;
  }

  if (Object.keys(update).length === 0) {
    return NextResponse.json({ error: "Rien à mettre à jour." }, { status: 400 });
  }

  const { error } = await serviceClient()
    .from("contact_messages")
    .update(update)
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

// Suppression définitive d'un message (ex. messages « Écris-moi » des élèves).
export async function DELETE(req: Request) {
  if (!(await isAdmin())) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const id = body?.id;

  if (id === undefined || id === null) {
    return NextResponse.json({ error: "id manquant." }, { status: 400 });
  }

  const { error } = await serviceClient()
    .from("contact_messages")
    .delete()
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
