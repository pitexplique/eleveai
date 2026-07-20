// API admin des ARTICLES DE RUBRIQUE du journal (table journal_articles,
// cf. supabase/journal_articles.sql — patron de la régie généralisé).
//   GET    : tous les articles (actifs ET masqués), triés par rubrique puis ordre.
//   POST   : crée un article { titre, lien, rubrique?, accroche?, image_url?, cta?, ordre? }.
//   PATCH  : met à jour un article { id, ...champs } (dont actif et ordre).
//   DELETE : supprime un article { id }.
// Tout est réservé à l'admin (cookie signé "admin-auth").
// L'image peut être un SVG ANIMÉ (/images/….svg) : il joue tout seul dans la carte.

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { createClient } from "@supabase/supabase-js";
import { verifyAdminCookieValue } from "@/lib/server/adminAuth";

// Chaque mutation régénère l'accueil immédiatement (leçon de la régie : sans
// ça, le cache de 5 min fait croire que rien n'a changé).
function republierLaUne() {
  revalidatePath("/accueil");
  revalidatePath("/");
}

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const RUBRIQUE_DEFAUT = "un-peu-de-maths";

async function isAdmin() {
  const cookieStore = await cookies();
  return verifyAdminCookieValue(cookieStore.get("admin-auth")?.value);
}

function db() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

function clean(v: unknown, max: number): string | null {
  const s = String(v ?? "").trim().slice(0, max);
  return s.length ? s : null;
}

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ ok: false, error: "Non autorisé." }, { status: 401 });
  }
  const { data, error } = await db()
    .from("journal_articles")
    .select("*")
    .order("rubrique", { ascending: true })
    .order("ordre", { ascending: true });
  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true, items: data ?? [] });
}

export async function POST(req: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ ok: false, error: "Non autorisé." }, { status: 401 });
  }
  const body = await req.json().catch(() => ({}));

  const titre = clean(body.titre, 200);
  const lien = clean(body.lien, 500);
  if (!titre || !lien) {
    return NextResponse.json(
      { ok: false, error: "Titre et lien sont obligatoires." },
      { status: 400 }
    );
  }

  const ordreNum = Number(body.ordre);
  const insert = {
    rubrique: clean(body.rubrique, 60) ?? RUBRIQUE_DEFAUT,
    titre,
    lien,
    accroche: clean(body.accroche, 600),
    image_url: clean(body.image_url, 500),
    cta: clean(body.cta, 80),
    ordre: Number.isFinite(ordreNum) ? ordreNum : 100,
    actif: body.actif !== false,
  };

  const { data, error } = await db()
    .from("journal_articles")
    .insert(insert)
    .select("*")
    .single();
  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
  republierLaUne();
  return NextResponse.json({ ok: true, item: data });
}

export async function PATCH(req: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ ok: false, error: "Non autorisé." }, { status: 401 });
  }
  const body = await req.json().catch(() => ({}));
  const id = clean(body.id, 60);
  if (!id) {
    return NextResponse.json({ ok: false, error: "id manquant." }, { status: 400 });
  }

  // Seuls les champs PRÉSENTS dans le body sont mis à jour.
  const update: Record<string, unknown> = {};
  if ("titre" in body) {
    const t = clean(body.titre, 200);
    if (!t) return NextResponse.json({ ok: false, error: "Titre vide." }, { status: 400 });
    update.titre = t;
  }
  if ("lien" in body) {
    const l = clean(body.lien, 500);
    if (!l) return NextResponse.json({ ok: false, error: "Lien vide." }, { status: 400 });
    update.lien = l;
  }
  if ("rubrique" in body) update.rubrique = clean(body.rubrique, 60) ?? RUBRIQUE_DEFAUT;
  if ("accroche" in body) update.accroche = clean(body.accroche, 600);
  if ("image_url" in body) update.image_url = clean(body.image_url, 500);
  if ("cta" in body) update.cta = clean(body.cta, 80);
  if ("actif" in body) update.actif = body.actif === true;
  if ("ordre" in body) {
    const n = Number(body.ordre);
    if (Number.isFinite(n)) update.ordre = n;
  }

  const { data, error } = await db()
    .from("journal_articles")
    .update(update)
    .eq("id", id)
    .select("*")
    .single();
  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
  republierLaUne();
  return NextResponse.json({ ok: true, item: data });
}

export async function DELETE(req: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ ok: false, error: "Non autorisé." }, { status: 401 });
  }
  const body = await req.json().catch(() => ({}));
  const id = clean(body.id, 60);
  if (!id) {
    return NextResponse.json({ ok: false, error: "id manquant." }, { status: 400 });
  }
  const { error } = await db().from("journal_articles").delete().eq("id", id);
  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
  republierLaUne();
  return NextResponse.json({ ok: true });
}
