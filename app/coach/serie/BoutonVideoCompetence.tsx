"use client";

// ⛔ 22/10/2026 — Frédéric : l'icône vidéo du coach envoyait sur une RECHERCHE
// YouTube. Elle ouvre maintenant la vidéo du site (R2) associée à la compétence :
// la paysage de la micro, sinon son short, sinon la vidéo de la notion. Sans
// vidéo, pas d'icône. Utilisée par le mode simple ET le mode complet.

import { useEffect, useState } from "react";
import { Video } from "lucide-react";
import { estShortVideo, lienVideo } from "@/lib/videos/lienVideo";

type VideoCoach = { url: string; titre: string | null };
type Videos = { notion: Record<string, VideoCoach[]>; micro: Record<string, VideoCoach[]> };

// Une requête par classe et matière, partagée entre les deux modes.
const cache = new Map<string, Promise<Videos>>();
function chargerVideos(matiere: string, classe: string): Promise<Videos> {
  const cle = `${matiere}/${classe}`;
  if (!cache.has(cle)) {
    cache.set(
      cle,
      fetch(`/api/notion-videos?matiere=${matiere}&classe=${classe}`)
        .then((r) => r.json())
        .then((d) => (d?.ok ? { notion: d.videos ?? {}, micro: d.videosMicro ?? {} } : { notion: {}, micro: {} }))
        .catch(() => ({ notion: {}, micro: {} }))
    );
  }
  return cache.get(cle)!;
}

export default function BoutonVideoCompetence({
  matiere,
  classe,
  microId,
  notionId,
  className = "",
}: {
  matiere: string;
  classe: string;
  microId?: string | null;
  notionId?: string | null;
  className?: string;
}) {
  const [videos, setVideos] = useState<Videos | null>(null);
  useEffect(() => {
    let annule = false;
    chargerVideos(matiere, classe).then((v) => {
      if (!annule) setVideos(v);
    });
    return () => {
      annule = true;
    };
  }, [matiere, classe]);

  const deLaMicro = (microId && videos?.micro[microId]) || [];
  const deLaNotion = (notionId && videos?.notion[notionId]) || [];
  const video =
    deLaMicro.find((v) => !estShortVideo(v.url)) ??
    deLaMicro[0] ??
    deLaNotion.find((v) => !estShortVideo(v.url)) ??
    deLaNotion[0];
  if (!video) return null;

  return (
    <a
      href={lienVideo(video.url).replace(/^https:\/\/www\.eleveai\.fr(?=\/video\/)/, "")}
      target="_blank"
      rel="noopener noreferrer"
      title={video.titre ?? "Regarder la vidéo de cette compétence"}
      aria-label="Regarder la vidéo de cette compétence"
      className={`inline-flex h-10 w-10 items-center justify-center rounded-full bg-sky-600 text-white shadow-sm hover:bg-sky-500 ${className}`}
    >
      <Video aria-hidden="true" size={18} strokeWidth={2.5} />
    </a>
  );
}
