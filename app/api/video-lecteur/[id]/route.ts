// Ce qu'il faut au modal vidéo du coach pour lire une vidéo sans quitter la page.
// La table R2 reste au serveur (~160 Ko, voir lib/videos/r2.ts) : le navigateur
// ne demande que la ligne de la vidéo ouverte. Aucune donnée sensible.
import { NextResponse } from "next/server";
import { trouverVideo, urlR2 } from "@/lib/videos/r2";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const v = trouverVideo(id);
  if (!v) return NextResponse.json({ ok: false }, { status: 404 });
  return NextResponse.json(
    {
      ok: true,
      id: v.id,
      titre: v.titre,
      short: v.short,
      src: urlR2(v.fichier),
      poster: v.poster ? urlR2(v.poster) : null,
      coach: v.coach ?? null,
    },
    { headers: { "Cache-Control": "public, max-age=300, s-maxage=3600" } }
  );
}
