"use client";

// Le <video> des vidéos R2, qui compte ses lectures (/api/video-vue).
// Une vue = la PREMIÈRE lecture lancée après l'ouverture de la page : rejouer
// ou reprendre après une pause ne recompte pas.
// ⛔ Jamais autoPlay : la vidéo s'ouvre en pause (28/09).
//
// ⭐ 27/10/2026 — Frédéric, premiers retours de ses élèves : « ils adorent
// vidéo puis question mais ne comprennent pas lorsqu'il est demandé de
// s'abonner », sur le site. La phrase de fin « … Et abonne-toi ! » est pour
// YouTube : elle commence 3,3 s avant la fin (mesuré au silencedetect sur
// cm1 01-lire et 6e 03-egale, voix identique). Ici, le lecteur s'arrête juste
// avant et montre « À toi ! » avec le lien vers l'entraînement.

import Link from "next/link";
import { useRef, useState, type VideoHTMLAttributes } from "react";
import { useEleve } from "@/context/EleveContext";
import { signalerActivite } from "@/lib/activite";

const COUPE_FIN = 3.6; // secondes retirées à la fin : « Et abonne-toi ! »

type Props = Omit<VideoHTMLAttributes<HTMLVideoElement>, "autoPlay" | "onPlay"> & {
  videoId: string;
  // Où mène l'écran de fin (le coach de la micro, sinon le coach).
  suite?: { href: string; label: string };
};

export default function LecteurVideo({ videoId, children, suite, ...props }: Props) {
  const compte = useRef(false);
  const ref = useRef<HTMLVideoElement>(null);
  const [fini, setFini] = useState(false);
  // Élève connecté : son prof voit la vidéo sur la page « En direct ».
  const { eleve } = useEleve();
  const finSignalee = useRef(false);
  const signaler = () => {
    if (compte.current) return;
    compte.current = true;
    signalerActivite(eleve?.token, { type: "video_debut", ressource: videoId });
    const corps = JSON.stringify({ id: videoId });
    try {
      if (!navigator.sendBeacon?.("/api/video-vue", new Blob([corps], { type: "application/json" }))) {
        fetch("/api/video-vue", { method: "POST", body: corps, keepalive: true }).catch(() => {});
      }
    } catch {}
  };
  const surveiller = () => {
    const v = ref.current;
    if (!v || fini || !Number.isFinite(v.duration) || v.duration < 20) return;
    if (v.currentTime >= v.duration - COUPE_FIN) {
      v.pause();
      setFini(true);
      if (!finSignalee.current) {
        finSignalee.current = true;
        signalerActivite(eleve?.token, { type: "video_fin", ressource: videoId });
      }
    }
  };
  const revoir = () => {
    const v = ref.current;
    setFini(false);
    if (v) {
      v.currentTime = 0;
      v.play().catch(() => {});
    }
  };
  const lien = suite ?? { href: "/coach-ia/maths", label: "Je m'entraîne avec le coach" };
  return (
    <div className="relative">
      <video ref={ref} {...props} onPlay={signaler} onTimeUpdate={surveiller} onSeeked={surveiller}>
        {children}
      </video>
      {fini && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-2xl bg-slate-950 p-4 text-center text-white">
          <p className="text-2xl font-black sm:text-3xl">À toi !</p>
          <p className="max-w-md text-sm text-slate-200 sm:text-base">Tu as vu la vidéo : maintenant, entraîne-toi sur les mêmes questions.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href={lien.href} className="rounded-2xl bg-emerald-400 px-5 py-3 text-base font-black text-slate-950 hover:bg-emerald-300">
              {lien.label}
            </Link>
            <button type="button" onClick={revoir} className="rounded-2xl px-5 py-3 text-base font-bold text-white ring-1 ring-white/40 hover:bg-white/10">
              Revoir la vidéo
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
