"use client";

// Réglage de la VITESSE de lecture des vidéos R2 (10/11/2026) : un élève trouve
// que « parfois ça va trop vite ». Gros boutons, virgule décimale, lisibles par
// des 6e qui lisent mal. La vitesse choisie est retenue (localStorage) et vaut
// pour tous les lecteurs de la page.
// ⛔ Ne lance jamais la lecture : changer la vitesse laisse la vidéo en pause.

import { useEffect, useState, type RefObject } from "react";

export const VITESSES = [0.5, 0.75, 1, 1.25, 1.5] as const;
const CLE = "eleveai-vitesse-video";
const EVENEMENT = "eleveai-vitesse-video";

function lireVitesse(): number {
  try {
    const v = Number(window.localStorage.getItem(CLE));
    return (VITESSES as readonly number[]).includes(v) ? v : 1;
  } catch {
    return 1;
  }
}

export const libelleVitesse = (v: number) => `${String(v).replace(".", ",")}×`;

export default function VitesseVideo({ video }: { video: RefObject<HTMLVideoElement | null> }) {
  const [vitesse, setVitesse] = useState(1);

  // Lue après le montage : le rendu serveur ne connaît pas le localStorage.
  useEffect(() => {
    setVitesse(lireVitesse());
    const surChangement = (e: Event) => setVitesse((e as CustomEvent<number>).detail);
    window.addEventListener(EVENEMENT, surChangement);
    return () => window.removeEventListener(EVENEMENT, surChangement);
  }, []);

  // Le navigateur remet playbackRate à defaultPlaybackRate quand la source se charge :
  // on règle les deux, et on réapplique à chaque chargement.
  useEffect(() => {
    const v = video.current;
    if (!v) return;
    const appliquer = () => {
      v.defaultPlaybackRate = vitesse;
      v.playbackRate = vitesse;
    };
    appliquer();
    v.addEventListener("loadedmetadata", appliquer);
    return () => v.removeEventListener("loadedmetadata", appliquer);
  }, [video, vitesse]);

  const choisir = (v: number) => {
    setVitesse(v);
    try {
      window.localStorage.setItem(CLE, String(v));
    } catch {}
    window.dispatchEvent(new CustomEvent(EVENEMENT, { detail: v }));
  };

  return (
    <div role="group" aria-label="Vitesse de la vidéo" className="mt-2 flex flex-wrap items-center justify-center gap-1.5 px-2 sm:gap-2">
      {/* Sur téléphone, le mot « Vitesse » a sa ligne : les 5 boutons tiennent ensuite sur une seule. */}
      <span className="w-full text-center text-sm font-black text-slate-400 sm:mr-1 sm:w-auto" aria-hidden="true">
        🐢 Vitesse de la vidéo
      </span>
      {VITESSES.map((v) => {
        const actif = v === vitesse;
        return (
          <button
            key={v}
            type="button"
            onClick={() => choisir(v)}
            aria-pressed={actif}
            aria-label={`Vitesse ${libelleVitesse(v)}${v === 1 ? " (normale)" : v < 1 ? " (plus lent)" : " (plus rapide)"}`}
            className={[
              "min-h-[2.5rem] min-w-[3rem] rounded-full px-2.5 py-1.5 text-base font-black transition sm:px-3",
              actif
                ? "bg-amber-400 text-slate-950 ring-2 ring-amber-200"
                : "bg-slate-700 text-white hover:bg-slate-600",
            ].join(" ")}
          >
            {libelleVitesse(v)}
          </button>
        );
      })}
    </div>
  );
}
