"use client";

// ⛔ 22/10/2026 — Frédéric : l'icône vidéo du coach envoyait sur une RECHERCHE
// YouTube. Elle ouvre maintenant la vidéo du site (R2) associée à la compétence :
// la paysage de la micro, sinon son short, sinon la vidéo de la notion. Sans
// vidéo, pas d'icône. Utilisée par le mode simple ET le mode complet.

import { useEffect, useState } from "react";
import { Video } from "lucide-react";
import LienVideoModal from "@/components/LienVideoModal";
import { estShortVideo } from "@/lib/videos/lienVideo";

// ⭐ 27/11/2026 : `short` vient de l'API, qui le lit au registre R2 — pas de la
// forme de l'URL. Le repli `estShortVideo` ne sert plus qu'aux vieilles réponses
// (cache du navigateur) qui n'ont pas encore le champ.
type VideoCoach = { url: string; titre: string | null; short?: boolean };
const estShort = (v: VideoCoach) => v.short ?? estShortVideo(v.url);
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
    deLaMicro.find((v) => !estShort(v)) ??
    deLaMicro[0] ??
    deLaNotion.find((v) => !estShort(v)) ??
    deLaNotion[0];
  if (!video) return null;

  return (
    // ⭐ 05/11/2026 : la vidéo s'ouvre dans un modal, l'élève garde sa question.
    <LienVideoModal
      url={video.url}
      titre={video.titre ?? "Regarder la vidéo de cette compétence"}
      ariaLabel="Regarder la vidéo de cette compétence"
      className={`inline-flex h-10 items-center justify-center gap-1.5 rounded-full bg-sky-600 px-4 text-sm font-black text-white shadow-sm hover:bg-sky-500 ${className}`}
    >
      {/* 24/11/2026 : le mot « Vidéo » à côté de la caméra — seule, l'icône
          ne se lisait pas comme un bouton pour un élève de 6e. */}
      <Video aria-hidden="true" size={18} strokeWidth={2.5} />
      Vidéo
    </LienVideoModal>
  );
}
