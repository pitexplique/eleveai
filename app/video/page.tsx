// La liste de toutes les vidéos hébergées sur R2 : sélecteur de classe et
// recherche (VideosClient). Page de travail : noindex.
import type { Metadata } from "next";
import { toutesLesVideos } from "@/lib/videos/r2";
import VideosClient, { type VideoListe } from "./VideosClient";

export const metadata: Metadata = {
  title: "Les vidéos EleveAI",
  robots: { index: false, follow: false },
};

export default function ListeVideos() {
  // Seulement ce qu'affiche la liste : pas les chemins de fichiers.
  const videos: VideoListe[] = toutesLesVideos().map((v) => ({
    id: v.id,
    titre: v.titre,
    classe: v.fichier.split("/")[0],
    rubrique: v.fichier.split("/")[1] ?? "",
    short: v.short,
    publiee: Boolean(v.youtube),
  }));

  return (
    <main className="min-h-screen bg-[#f5f8ff] text-slate-800">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <h1 className="text-2xl font-black text-slate-900">Les vidéos EleveAI</h1>
        <VideosClient videos={videos} />
      </div>
    </main>
  );
}
