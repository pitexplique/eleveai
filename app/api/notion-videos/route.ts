// Lecture publique des VIDÉOS d'une classe, pour le coach.
//   GET ?matiere=maths&classe=6e → { ok, videos: { [notion_id]: [{url, titre}] } }
// Ne renvoie que les ressources de type "video". Aucune donnée sensible.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const SLUG = /^[a-z0-9_-]{1,20}$/;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const matiere = (searchParams.get("matiere") ?? "").toLowerCase();
  const classe = (searchParams.get("classe") ?? "").toLowerCase();
  if (!SLUG.test(matiere) || !SLUG.test(classe)) {
    return NextResponse.json({ ok: true, videos: {} });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
  const { data, error } = await supabase
    .from("notion_ressources")
    .select("notion_id, url, titre")
    .eq("matiere", matiere)
    .eq("classe", classe)
    .eq("type", "video");

  if (error) {
    // Table absente : pas de vidéos, le coach n'affiche aucun badge.
    return NextResponse.json({ ok: true, videos: {} });
  }

  const videos: Record<string, { url: string; titre: string | null }[]> = {};
  for (const row of data ?? []) {
    (videos[row.notion_id] ??= []).push({ url: row.url, titre: row.titre });
  }
  return NextResponse.json({ ok: true, videos });
}
