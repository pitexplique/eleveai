// API admin des ressources de notion (vidéos…).
//   GET    : toutes les ressources, pour la gestion.
//   POST   : ajoute une ressource { matiere, classe, notion_id, type, url, titre }.
//   DELETE : supprime une ressource par id (?id=…).
// Réservé à l'admin (cookie signé "admin-auth").

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import { verifyAdminCookieValue } from "@/lib/server/adminAuth";

async function isAdmin() {
  const cookieStore = await cookies();
  return verifyAdminCookieValue(cookieStore.get("admin-auth")?.value);
}

function admin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

function clean(v: unknown, max: number) {
  const s = String(v ?? "").trim().slice(0, max);
  return s.length ? s : null;
}

const SLUG = /^[a-z0-9_-]{1,60}$/;

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ ok: false, error: "Non autorisé." }, { status: 401 });
  }
  const { data, error } = await admin()
    .from("notion_ressources")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    return NextResponse.json({ ok: true, items: [] }); // table absente : liste vide
  }
  return NextResponse.json({ ok: true, items: data ?? [] });
}

export async function POST(req: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ ok: false, error: "Non autorisé." }, { status: 401 });
  }
  const body = await req.json().catch(() => ({}));
  const matiere = clean(body?.matiere, 20)?.toLowerCase();
  const classe = clean(body?.classe, 20)?.toLowerCase();
  const notion_id = clean(body?.notion_id, 60);
  const type = clean(body?.type, 20)?.toLowerCase() ?? "video";
  const url = clean(body?.url, 500);
  const titre = clean(body?.titre, 160);

  if (!matiere || !classe || !notion_id || !url) {
    return NextResponse.json(
      { ok: false, error: "Matière, classe, notion et URL sont obligatoires." },
      { status: 400 }
    );
  }
  if (!SLUG.test(matiere) || !SLUG.test(classe) || !SLUG.test(notion_id)) {
    return NextResponse.json({ ok: false, error: "Identifiants invalides." }, { status: 400 });
  }
  if (!/^https?:\/\//i.test(url)) {
    return NextResponse.json({ ok: false, error: "L'URL doit commencer par http(s)." }, { status: 400 });
  }

  const { error } = await admin()
    .from("notion_ressources")
    .upsert(
      { matiere, classe, notion_id, type, url, titre },
      { onConflict: "matiere,classe,notion_id,url" }
    );
  if (error) {
    return NextResponse.json(
      { ok: false, error: "Enregistrement impossible (table absente ?)." },
      { status: 500 }
    );
  }
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ ok: false, error: "Non autorisé." }, { status: 401 });
  }
  const id = new URL(req.url).searchParams.get("id");
  if (!id) {
    return NextResponse.json({ ok: false, error: "id manquant." }, { status: 400 });
  }
  await admin().from("notion_ressources").delete().eq("id", id);
  return NextResponse.json({ ok: true });
}
