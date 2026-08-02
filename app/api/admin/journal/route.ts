// API admin de la RÉGIE DU RÉDACTEUR EN CHEF : les slides de la Une du journal
// (table journal_une, cf. supabase/journal_une.sql).
//   GET    : tous les slides (actifs ET masqués), triés par ordre.
//   POST   : crée un slide { titre, lien, kicker?, accroche?, youtube?, image_url?, cta?, defi?, ordre?, niveau_mini? }.
//   PATCH  : met à jour un slide { id, ...champs } (dont actif et ordre).
//   DELETE : supprime un slide { id }.
// Tout est réservé à l'admin (cookie signé "admin-auth").

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { createClient } from "@supabase/supabase-js";
import { verifyAdminCookieValue } from "@/lib/server/adminAuth";

// Chaque mutation de la régie régénère la Une IMMÉDIATEMENT (sinon le cache
// de 5 min fait croire que rien n'a changé — vécu trois fois le 17/07).
function republierLaUne() {
  revalidatePath("/accueil");
  revalidatePath("/");
}

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

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

// À QUI S'ADRESSE LE SLIDE — les huit options de « Qui est-ce ? » (02/08).
// Les quatre cycles sont des SEUILS (`cm1-cm2` = « à partir du CM1 », donc un
// lycéen le voit aussi) ; les quatre profils adultes sont des CIBLES (`prof` =
// « pour les professeurs »). null = pas de garde, le slide est vu par tous.
// La liste doit rester alignée sur la contrainte CHECK de journal_une : une
// valeur hors liste ferait échouer l'insertion avec un 23514.
const NIVEAUX = [
  "cp-ce2",
  "cm1-cm2",
  "6e-3e",
  "lycee",
  "parent",
  "prof",
  "etablissement",
  "entreprise",
] as const;

function parseNiveau(v: unknown): string | null {
  if (typeof v !== "string") return null;
  const n = v.trim();
  return (NIVEAUX as readonly string[]).includes(n) ? n : null;
}

// Accepte un ID YouTube nu OU une URL (youtu.be/ID, watch?v=ID, /embed/ID).
function parseYoutube(v: unknown): string | null {
  const s = String(v ?? "").trim();
  if (!s) return null;
  if (/^[A-Za-z0-9_-]{11}$/.test(s)) return s;
  const m = s.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([A-Za-z0-9_-]{11})/);
  return m ? m[1] : null;
}

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ ok: false, error: "Non autorisé." }, { status: 401 });
  }
  const { data, error } = await db()
    .from("journal_une")
    .select("*")
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
    titre,
    lien,
    kicker: clean(body.kicker, 120) ?? "Réfléchir · En vrai, à La Réunion",
    accroche: clean(body.accroche, 600),
    youtube_id: parseYoutube(body.youtube_id),
    image_url: clean(body.image_url, 500),
    cta: clean(body.cta, 80) ?? "Lire →",
    defi: clean(body.defi, 300),
    ordre: Number.isFinite(ordreNum) ? ordreNum : 100,
    actif: body.actif !== false,
    niveau_mini: parseNiveau(body.niveau_mini),
  };

  const { data, error } = await db()
    .from("journal_une")
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
  const update: Record<string, unknown> = { updated_at: new Date().toISOString() };
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
  if ("kicker" in body) update.kicker = clean(body.kicker, 120) ?? "Réfléchir · En vrai, à La Réunion";
  if ("accroche" in body) update.accroche = clean(body.accroche, 600);
  if ("youtube_id" in body) update.youtube_id = parseYoutube(body.youtube_id);
  if ("image_url" in body) update.image_url = clean(body.image_url, 500);
  if ("cta" in body) update.cta = clean(body.cta, 80) ?? "Lire →";
  if ("defi" in body) update.defi = clean(body.defi, 300);
  if ("niveau_mini" in body) update.niveau_mini = parseNiveau(body.niveau_mini);
  if ("actif" in body) update.actif = body.actif === true;
  if ("ordre" in body) {
    const n = Number(body.ordre);
    if (Number.isFinite(n)) update.ordre = n;
  }

  const { data, error } = await db()
    .from("journal_une")
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
  const { error } = await db().from("journal_une").delete().eq("id", id);
  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
  republierLaUne();
  return NextResponse.json({ ok: true });
}
