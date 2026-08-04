// API admin de « Les maths en vrai — 974 ».
//   GET    : liste de toutes les captures (visibles ET masquées) pour la gestion.
//   POST   : crée une capture (multipart) — photo optionnelle uploadée dans le
//            bucket, lien YouTube optionnel (on ne garde que l'ID), + les textes.
//   PATCH  : masque/affiche une capture.
//   DELETE : supprime une capture (et sa photo dans le bucket).
// Tout est réservé à l'admin (cookie signé "admin-auth").

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { verifyAdminCookieValue } from "@/lib/server/adminAuth";
import { maths974Client, parseYoutubeId, MATHS974_BUCKET } from "@/lib/server/maths974";

// 04/08 : /maths-974 est passée de `force-dynamic` à une ISR d'une heure
// (quota ISR Reads). Pour que l'attente ne se voie pas, chaque mutation
// régénère la page IMMÉDIATEMENT — même patron que la régie du journal.
// L'accueil aussi : sa vitrine affiche les 3 dernières captures.
function republierLes974() {
  revalidatePath("/maths-974");
  revalidatePath("/accueil");
}

const MAX_BYTES = 10 * 1024 * 1024; // 10 Mo (photos de téléphone)

const TYPES: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
  "image/gif": "gif",
};

async function isAdmin() {
  const cookieStore = await cookies();
  return verifyAdminCookieValue(cookieStore.get("admin-auth")?.value);
}

function clean(v: unknown, max: number) {
  const s = String(v ?? "").trim().slice(0, max);
  return s.length ? s : null;
}

function numOrNull(v: unknown) {
  const n = Number(String(v ?? "").trim().replace(",", "."));
  return Number.isFinite(n) ? n : null;
}

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ ok: false, error: "Non autorisé." }, { status: 401 });
  }
  const { data, error } = await maths974Client()
    .from("maths_974")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true, items: data ?? [] });
}

export async function POST(req: Request) {
  try {
    if (!(await isAdmin())) {
      return NextResponse.json({ ok: false, error: "Non autorisé." }, { status: 401 });
    }

    const form = await req.formData().catch(() => null);
    if (!form) {
      return NextResponse.json({ ok: false, error: "Requête invalide." }, { status: 400 });
    }

    const lieu = clean(form.get("lieu"), 120);
    const titre = clean(form.get("titre"), 160);
    const situation = clean(form.get("situation"), 2000);
    if (!lieu || !titre || !situation) {
      return NextResponse.json(
        { ok: false, error: "Lieu, titre et situation sont obligatoires." },
        { status: 400 }
      );
    }

    const youtube_id = parseYoutubeId(form.get("youtube"));
    const supabase = maths974Client();

    // Photo optionnelle.
    let image_path: string | null = null;
    let image_url: string | null = null;
    const file = form.get("file");
    if (file instanceof File && file.size > 0) {
      const ext = TYPES[file.type];
      if (!ext) {
        return NextResponse.json(
          { ok: false, error: "Photo : format non accepté (PNG, JPG, WEBP ou GIF)." },
          { status: 400 }
        );
      }
      if (file.size > MAX_BYTES) {
        return NextResponse.json(
          { ok: false, error: "Photo trop lourde (10 Mo maximum)." },
          { status: 400 }
        );
      }
      const slug = lieu.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 30) || "974";
      image_path = `${slug}-${Date.now()}.${ext}`;
      const bytes = Buffer.from(await file.arrayBuffer());
      const up = await supabase.storage.from(MATHS974_BUCKET).upload(image_path, bytes, {
        contentType: file.type,
        upsert: false,
      });
      if (up.error) throw up.error;
      image_url = supabase.storage.from(MATHS974_BUCKET).getPublicUrl(image_path).data.publicUrl;
    }

    const { data, error } = await supabase
      .from("maths_974")
      .insert({
        lieu,
        titre,
        situation,
        notion: clean(form.get("notion"), 200),
        niveau: clean(form.get("niveau"), 60),
        question: clean(form.get("question"), 1000),
        reponse: clean(form.get("reponse"), 1000),
        emerveillement: clean(form.get("emerveillement"), 500),
        coach_classe: clean(form.get("coach_classe"), 20),
        lat: numOrNull(form.get("lat")),
        lng: numOrNull(form.get("lng")),
        youtube_id,
        image_path,
        image_url,
      })
      .select("id")
      .single();

    if (error) {
      if (image_path) await supabase.storage.from(MATHS974_BUCKET).remove([image_path]);
      throw error;
    }

    republierLes974();
    return NextResponse.json({ ok: true, id: data?.id });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e?.message || "Erreur serveur" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ ok: false, error: "Non autorisé." }, { status: 401 });
  }
  const body = await req.json().catch(() => null);
  const id = body?.id;
  if (!id) {
    return NextResponse.json({ ok: false, error: "id manquant." }, { status: 400 });
  }
  const { error } = await maths974Client()
    .from("maths_974")
    .update({ masque: Boolean(body?.masque) })
    .eq("id", id);
  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
  republierLes974();
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ ok: false, error: "Non autorisé." }, { status: 401 });
  }
  const body = await req.json().catch(() => null);
  const id = body?.id;
  if (!id) {
    return NextResponse.json({ ok: false, error: "id manquant." }, { status: 400 });
  }
  const supabase = maths974Client();
  const { data: row } = await supabase
    .from("maths_974")
    .select("image_path")
    .eq("id", id)
    .single();
  const { error } = await supabase.from("maths_974").delete().eq("id", id);
  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
  if (row?.image_path) {
    await supabase.storage.from(MATHS974_BUCKET).remove([row.image_path]);
  }
  republierLes974();
  return NextResponse.json({ ok: true });
}
