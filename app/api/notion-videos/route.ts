// Lecture publique des VIDÉOS d'une classe, pour le coach.
//   GET ?matiere=maths&classe=6e → {
//     ok,
//     videos:      { [notion_id]: [{url, titre}] },  // vidéos de la notion (micro_id vide)
//     videosMicro: { [micro_id]:  [{url, titre}] },  // vidéos attachées à une micro-compétence
//   }
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
    .select("*")
    .eq("matiere", matiere)
    .eq("classe", classe)
    .eq("type", "video");

  if (error) {
    // Table absente (ou colonne micro_id pas encore ajoutée) : pas de vidéos,
    // le coach n'affiche aucun badge.
    return NextResponse.json({ ok: true, videos: {}, videosMicro: {} });
  }

  // ⭐ L'ORDRE DES PARTIES (20/09/2026). Une leçon en plusieurs vidéos porte son
  // rang dans le titre — « (1/3) », « (2/3) », « (3/3) » — et la requête ne
  // garantit aucun ordre. Trier par titre ne marcherait pas : « Dériver… (3/3) »
  // passerait devant « La fonction… (1/3) ». On lit donc le rang, et à rang égal
  // (ou sans rang) la plus ancienne d'abord, comme avant.
  const rang = (titre: string | null) =>
    Number(titre?.match(/\((\d+)\s*\/\s*\d+\)/)?.[1] ?? Infinity);
  const lignes = [...(data ?? [])].sort(
    (a, b) =>
      // Infinity − Infinity vaut NaN, donc « faux » : on tombe sur la date.
      rang(a.titre) - rang(b.titre) ||
      String(a.created_at).localeCompare(String(b.created_at))
  );

  const videos: Record<string, { url: string; titre: string | null }[]> = {};
  const videosMicro: Record<string, { url: string; titre: string | null }[]> = {};
  for (const row of lignes) {
    const micro = (row.micro_id ?? "").trim();
    if (micro) {
      (videosMicro[micro] ??= []).push({ url: row.url, titre: row.titre });
    } else {
      (videos[row.notion_id] ??= []).push({ url: row.url, titre: row.titre });
    }
  }
  return NextResponse.json({ ok: true, videos, videosMicro });
}
