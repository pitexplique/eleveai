// Lecture publique des VIDÉOS d'une classe, pour le coach.
//   GET ?matiere=maths&classe=6e → {
//     ok,
//     videos:      { [notion_id]: [{url, titre, short}] },  // vidéos de la notion (micro_id vide)
//     videosMicro: { [micro_id]:  [{url, titre, short}] },  // vidéos d'une micro-compétence
//   }
// Ne renvoie que les ressources de type "video". Aucune donnée sensible.
//
// ⭐ 27/11/2026 — `short` EST DÉCIDÉ ICI, ET PAS PAR L'URL. Le format d'une vidéo
// est le champ `short` de `videos-r2.json` : c'est lui que lisent le lecteur
// (`app/video/[id]/page.tsx`) et le modal. `?format=short` n'est lu par AUCUNE
// page, et 122 des 2 095 lignes du coach contredisaient le registre — assez pour
// que le bouton ▶ serve un short sur 42 micros qui avaient pourtant un cours
// paysage. La table R2 reste au serveur (~160 Ko) : on ne renvoie qu'un booléen.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { trouverVideo } from "@/lib/videos/r2";
import { estShortVideo } from "@/lib/videos/lienVideo";

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

  // Le format, lu au registre ; si la clé y est inconnue (vidéo pas encore
  // déployée), on retombe sur la forme de l'URL plutôt que de mentir.
  const estShort = (url: string) => {
    const id = String(url).replace(/^https?:\/\/[^/]+/, "").match(/\/video\/([^/?#]+)/)?.[1];
    return (id ? trouverVideo(decodeURIComponent(id))?.short : undefined) ?? estShortVideo(url);
  };

  type Sortie = { url: string; titre: string | null; short: boolean };
  const videos: Record<string, Sortie[]> = {};
  const videosMicro: Record<string, Sortie[]> = {};
  for (const row of lignes) {
    const micro = (row.micro_id ?? "").trim();
    const sortie: Sortie = { url: row.url, titre: row.titre, short: estShort(row.url) };
    if (micro) {
      (videosMicro[micro] ??= []).push(sortie);
    } else {
      (videos[row.notion_id] ??= []).push(sortie);
    }
  }
  return NextResponse.json({ ok: true, videos, videosMicro });
}
