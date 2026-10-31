import type { Metadata } from "next";
import { Suspense } from "react";
import CalculRapideDefiClient from "./CalculRapideDefiClient";
import { toutesLesVideos } from "@/lib/videos/r2";
import { DOSSIERS_VIDEOS, motsVideo, type VideoDefi } from "@/lib/calcul-rapide/videos";
import type { NiveauCalculRapide } from "@/lib/calcul-rapide/types";

export const metadata: Metadata = {
  title: "Défi calcul rapide",
  description: "Lance le défi du jour en calcul rapide.",
};

// Les paysages des classes du niveau, réduites à leurs racines de mots : le
// bouton « Regarder la vidéo » y choisit celle de la question (pas YouTube).
function videosDuNiveau(niveau: string): VideoDefi[] {
  const dossiers = DOSSIERS_VIDEOS[niveau as NiveauCalculRapide] ?? DOSSIERS_VIDEOS["6e"];
  return toutesLesVideos().flatMap((v) => {
    const rang = dossiers.indexOf(v.fichier.split("/")[0]);
    if (rang < 0 || v.short) return [];
    return [{ id: v.id, mots: motsVideo(v.id, v.titre), publiee: Boolean(v.youtube), rang }];
  });
}

export default async function CalculRapideDefiPage({
  searchParams,
}: {
  searchParams: Promise<{ niveau?: string | string[] }>;
}) {
  const { niveau } = await searchParams;
  const videos = videosDuNiveau(typeof niveau === "string" ? niveau : "6e");

  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
          <p className="text-xl font-bold">Chargement du défi...</p>
        </main>
      }
    >
      <CalculRapideDefiClient videos={videos} />
    </Suspense>
  );
}