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
// La fin du 05/11 (manim/REGLES.md) est plus longue : ces vidéos s'arrêtent juste
// après « Entraîne-toi sur éleveai point f r. » (mesuré dans le WAV de fin et le mp4).
const COUPE_PAR_VIDEO: Record<string, number> = {
  "4e-equation-probleme": 8.6,
  "4e-equation-probleme-short": 4.7,
  // Relatifs 4e : mesuré dans les mp4, la pause après « point f r » (07/11).
  "4e-relatif-addition": 8.4,
  "4e-relatif-soustraction": 8.4,
  "4e-relatif-multiplication": 8.4,
  "4e-relatif-division": 8.4,
  "4e-relatif-calcul": 8.4,
  "4e-relatif-probleme": 8.4,
  "4e-relatif-defi": 8.4,
  "4e-relatif-addition-short": 4.1,
  "4e-relatif-soustraction-short": 4.1,
  "4e-relatif-multiplication-short": 4.1,
  "4e-relatif-division-short": 4.1,
  "4e-relatif-calcul-short": 4.1,
  "4e-relatif-probleme-short": 4.1,
  "4e-relatif-defi-short": 4.1,
  // Triangles 6e : mesuré dans les mp4, la pause après « point f r » (07/11).
  "6e-triangle-nommer": 8.4,
  "6e-triangle-sommet-cote": 8.4,
  "6e-triangle-type-cote": 8.4,
  "6e-triangle-type-angle": 8.4,
  "6e-triangle-defi": 8.4,
  "6e-triangle-somme-angle": 8.4,
  "6e-triangle-angle-manquant": 8.4,
  "6e-triangle-possible-ou-non": 8.4,
  "6e-triangle-propriete-defi": 8.4,
  "6e-triangle-nommer-short": 4.2,
  "6e-triangle-sommet-cote-short": 4.2,
  "6e-triangle-type-cote-short": 4.2,
  "6e-triangle-type-angle-short": 4.2,
  "6e-triangle-defi-short": 4.2,
  "6e-triangle-somme-angle-short": 4.2,
  "6e-triangle-angle-manquant-short": 4.2,
  "6e-triangle-possible-ou-non-short": 4.2,
  "6e-triangle-propriete-defi-short": 4.2,
};

type Props = Omit<VideoHTMLAttributes<HTMLVideoElement>, "autoPlay" | "onPlay"> & {
  videoId: string;
  // Où mène l'écran de fin (le coach de la micro, sinon le coach).
  suite?: { href: string; label: string };
  // Dans le modal du coach : l'écran de fin ramène à la question, sans changer de page.
  retour?: { label: string; action: () => void };
};

export default function LecteurVideo({ videoId, children, suite, retour, ...props }: Props) {
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
    if (v.currentTime >= v.duration - (COUPE_PAR_VIDEO[videoId] ?? COUPE_FIN)) {
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
        // Centré et sans hauteur imposée : sur un petit téléphone, la vidéo paysage
        // est moins haute que ce texte et ses boutons, qui ne doivent pas déborder.
        <div className="absolute inset-x-0 top-1/2 flex min-h-full -translate-y-1/2 flex-col items-center justify-center gap-4 bg-slate-950 p-4 text-center text-white sm:rounded-2xl">
          <p className="text-2xl font-black sm:text-3xl">À toi !</p>
          <p className="max-w-md text-sm text-slate-200 sm:text-base">Tu as vu la vidéo : maintenant, entraîne-toi sur les mêmes questions.</p>
          <div className="flex flex-wrap justify-center gap-3">
            {retour ? (
              <button type="button" onClick={retour.action} className="rounded-2xl bg-emerald-400 px-5 py-3 text-base font-black text-slate-950 hover:bg-emerald-300">
                {retour.label}
              </button>
            ) : (
              <Link href={lien.href} className="rounded-2xl bg-emerald-400 px-5 py-3 text-base font-black text-slate-950 hover:bg-emerald-300">
                {lien.label}
              </Link>
            )}
            <button type="button" onClick={revoir} className="rounded-2xl px-5 py-3 text-base font-bold text-white ring-1 ring-white/40 hover:bg-white/10">
              Revoir la vidéo
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
