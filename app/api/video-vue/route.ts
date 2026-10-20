// /api/video-vue — une LECTURE lancée dans le lecteur EleveAI (vidéos sur R2).
// Appelé en fire-and-forget par LecteurVideo (sendBeacon) au premier « play ».
// RGPD : un compteur par vidéo et par jour, aucune identité (supabase/video_vues.sql).

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { trouverVideo } from "@/lib/videos/r2";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    const cle = typeof body?.id === "string" ? body.id.slice(0, 120) : "";
    // Seules les vidéos de la table comptent : pas de lignes inventées.
    const v = cle ? trouverVideo(cle) : null;
    if (!v) return new NextResponse(null, { status: 204 });

    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
    await supabase.rpc("compter_vue_video", { p_video: v.id });
  } catch {
    // Silencieux : compter ne doit JAMAIS gêner la lecture.
  }
  return new NextResponse(null, { status: 204 });
}
