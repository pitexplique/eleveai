"use client";

// Le <video> des vidéos R2, qui compte ses lectures (/api/video-vue).
// Une vue = la PREMIÈRE lecture lancée après l'ouverture de la page : rejouer
// ou reprendre après une pause ne recompte pas.
// ⛔ Jamais autoPlay : la vidéo s'ouvre en pause (28/09).

import { useRef, type VideoHTMLAttributes } from "react";

type Props = Omit<VideoHTMLAttributes<HTMLVideoElement>, "autoPlay" | "onPlay"> & { videoId: string };

export default function LecteurVideo({ videoId, children, ...props }: Props) {
  const compte = useRef(false);
  const signaler = () => {
    if (compte.current) return;
    compte.current = true;
    const corps = JSON.stringify({ id: videoId });
    try {
      if (!navigator.sendBeacon?.("/api/video-vue", new Blob([corps], { type: "application/json" }))) {
        fetch("/api/video-vue", { method: "POST", body: corps, keepalive: true }).catch(() => {});
      }
    } catch {}
  };
  return (
    <video {...props} onPlay={signaler}>
      {children}
    </video>
  );
}
