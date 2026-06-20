import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import { verifyAdminCookieValue } from "@/lib/server/adminAuth";

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

  return NextResponse.json(data);
}

// Mise à jour du statut (new / in_progress / done).
export async function PATCH(req: Request) {
  if (!(await isAdmin())) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const id = body?.id;
  const status = body?.status;

  if (id === undefined || id === null || !STATUTS.includes(status)) {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const { error } = await serviceClient()
    .from("contact_messages")
    .update({ status })
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
