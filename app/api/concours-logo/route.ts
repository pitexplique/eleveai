// Concours logo EleveAI.
//   POST : un élève CONNECTÉ téléverse une image. Vérifie le jeton signé,
//          valide le fichier (type/taille), l'upload dans le bucket Storage
//          (clé service role) et insère la ligne de métadonnées.
//   GET  : liste publique des logos visibles, pour la galerie.
// Remplace l'envoi par e-mail : tout est stocké sur Supabase au même endroit.

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { verifySessionToken } from "@/lib/server/session";

const BUCKET = "concours-logos";
const MAX_BYTES = 5 * 1024 * 1024; // 5 Mo
const MAX_PAR_ELEVE = 5; // anti-spam : 5 propositions max par élève

// Types acceptés -> extension du fichier stocké.
const TYPES: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/svg+xml": "svg",
};

function admin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

function clean(v: unknown, max: number) {
  return String(v ?? "").trim().slice(0, max);
}

export async function POST(req: Request) {
  try {
    const auth = req.headers.get("authorization") ?? "";
    const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
    const session = verifySessionToken(token);
    if (!session) {
      return NextResponse.json(
        { ok: false, error: "Connecte-toi pour envoyer ton logo." },
        { status: 401 }
      );
    }

    const form = await req.formData().catch(() => null);
    const file = form?.get("file");
    if (!form || !(file instanceof File)) {
      return NextResponse.json(
        { ok: false, error: "Aucun fichier reçu." },
        { status: 400 }
      );
    }

    const ext = TYPES[file.type];
    if (!ext) {
      return NextResponse.json(
        { ok: false, error: "Format non accepté (PNG, JPG, WEBP, GIF ou SVG)." },
        { status: 400 }
      );
    }
    if (file.size === 0 || file.size > MAX_BYTES) {
      return NextResponse.json(
        { ok: false, error: "Image vide ou trop lourde (5 Mo maximum)." },
        { status: 400 }
      );
    }

    const supabase = admin();

    // Anti-spam : limite de propositions par élève.
    const { count } = await supabase
      .from("concours_logos")
      .select("id", { count: "exact", head: true })
      .eq("code_etablissement", session.code_etablissement)
      .eq("code_utilisateur", session.code_utilisateur);
    if ((count ?? 0) >= MAX_PAR_ELEVE) {
      return NextResponse.json(
        { ok: false, error: `Tu as déjà envoyé ${MAX_PAR_ELEVE} logos, merci !` },
        { status: 429 }
      );
    }

    const prenom = clean(form.get("prenom"), 60) || null;
    const classe = clean(form.get("classe"), 20) || session.classe || null;

    const safe = (s: string) => s.replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 40) || "x";
    const path = `${safe(session.code_etablissement)}/${safe(
      session.code_utilisateur
    )}-${Date.now()}.${ext}`;

    const bytes = Buffer.from(await file.arrayBuffer());
    const up = await supabase.storage.from(BUCKET).upload(path, bytes, {
      contentType: file.type,
      upsert: false,
    });
    if (up.error) throw up.error;

    const { data: pub } = supabase.storage.from(BUCKET).getPublicUrl(path);

    const { error } = await supabase.from("concours_logos").insert({
      code_etablissement: session.code_etablissement,
      code_utilisateur: session.code_utilisateur,
      prenom,
      classe,
      image_path: path,
      image_url: pub.publicUrl,
    });
    if (error) {
      // Ligne non insérée : on retire le fichier orphelin.
      await supabase.storage.from(BUCKET).remove([path]);
      throw error;
    }

    return NextResponse.json({ ok: true, url: pub.publicUrl });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e?.message || "Erreur serveur" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const supabase = admin();
    const { data, error } = await supabase
      .from("concours_logos")
      .select("id, prenom, classe, image_url, created_at")
      .eq("masque", false)
      .order("created_at", { ascending: false })
      .limit(300);
    if (error) throw error;
    return NextResponse.json({ ok: true, logos: data ?? [] });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e?.message || "Erreur serveur", logos: [] },
      { status: 500 }
    );
  }
}
