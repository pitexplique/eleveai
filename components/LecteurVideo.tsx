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
import { useEffect, useRef, useState, type VideoHTMLAttributes } from "react";
import { useEleve } from "@/context/EleveContext";
import { signalerActivite } from "@/lib/activite";
import VitesseVideo from "@/components/VitesseVideo";

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
  // Shorts en dessin animé : aucun silence entre « f r » et « Mets un pouce ». La coupe vaut
  // « Mets », mesuré dans chaque mp4, + 0,03 s, car l'arrêt précis dépasse de 0,02 s au plus (07/11).
  "4e-relatif-addition-short": 4.54,
  "4e-relatif-soustraction-short": 4.52,
  "4e-relatif-multiplication-short": 4.47,
  "4e-relatif-division-short": 4.52,
  "4e-relatif-calcul-short": 4.52,
  "4e-relatif-probleme-short": 4.57,
  "4e-relatif-defi-short": 4.54,
  "4e-puissance-comprendre-short": 4.22,
  "4e-puissance-calculer-short": 4.21,
  "4e-puissance-dix-short": 4.22,
  "4e-puissance-zero-negatif-short": 4.23,
  "4e-puissance-notation-scientifique-short": 4.24,
  "4e-puissance-comparer-short": 4.21,
  "4e-puissance-calcul-short": 4.22,
  "4e-puissance-defi-short": 4.23,
  "3e-puissance-defi-short": 4.21,
  "seconde-puissance-produit-quotient-short": 4.21,
  "seconde-puissance-enchainer-short": 4.22,
  "premiere-puissance-cinq-regles-short": 4.22,
  "ti-margo-3d-mes-vues-doublent-short": 4.46,
  // Divisibilité 4e : paysage = même fin que les Relatifs ; short = « Mets » (75,63 s) + 0,03 s.
  "4e-div-diviseurs": 8.4,
  "4e-div-diviseurs-short": 4.17,
  "4e-div-multiple": 8.4,
  "4e-div-multiple-short": 4.17,
  "4e-div-critere-2-5-10": 8.4,
  "4e-div-critere-2-5-10-short": 4.17,
  "4e-div-critere-3-9": 8.4,
  "4e-div-critere-3-9-short": 4.18,
  "4e-div-euclidienne": 8.4,
  "4e-div-euclidienne-short": 4.17,
  "4e-div-probleme": 8.4,
  "4e-div-probleme-short": 4.17,
  "4e-div-defi": 8.4,
  "4e-div-defi-short": 4.17,
  "4e-premier-definition": 8.4,
  "4e-premier-definition-short": 4.17,
  "4e-premier-determiner": 8.4,
  "4e-premier-determiner-short": 4.16,
  "4e-premier-decomposer": 8.4,
  "4e-premier-decomposer-short": 4.17,
  "4e-premier-defi": 8.4,
  "4e-premier-defi-short": 4.16,
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
  // Shorts Triangles : même calcul que les shorts Relatifs ci-dessus.
  "6e-triangle-nommer-short": 4.21,
  "6e-triangle-sommet-cote-short": 4.21,
  "6e-triangle-type-cote-short": 4.23,
  "6e-triangle-type-angle-short": 4.21,
  "6e-triangle-defi-short": 4.23,
  "6e-triangle-somme-angle-short": 4.21,
  "6e-triangle-angle-manquant-short": 4.21,
  "6e-triangle-possible-ou-non-short": 4.21,
  "6e-triangle-propriete-defi-short": 4.21,
  // Décimaux 6e : paysage = même fin que les Triangles (pause après « point f r » de 2,42 à 3,38 s
  // dans le clip de fin, mesurée dans chaque mp4) ; short = « Mets », mesuré au son de chaque mp4, + 0,03 s (08/11).
  "6e-decimal-lire-ecrire": 8.4,
  "6e-decimal-lire-ecrire-short": 4.22,
  "6e-decimal-rang": 8.4,
  "6e-decimal-rang-short": 4.23,
  "6e-decimal-comparer": 8.4,
  "6e-decimal-comparer-short": 4.21,
  "6e-decimal-arrondir": 8.4,
  "6e-decimal-arrondir-short": 4.21,
  "6e-decimal-encadrer": 8.4,
  "6e-decimal-encadrer-short": 4.22,
  "6e-decimal-defi": 8.4,
  "6e-decimal-defi-short": 4.21,
  "6e-decimal-additionner": 8.4,
  "6e-decimal-additionner-short": 4.22,
  "6e-decimal-multiplier": 8.4,
  "6e-decimal-multiplier-short": 4.21,
  "6e-decimal-multiplier-decimaux": 8.4,
  "6e-decimal-multiplier-decimaux-short": 4.22,
  "6e-decimal-multiplier-par-01": 8.4,
  "6e-decimal-multiplier-par-01-short": 4.24,
  "6e-decimal-diviser-par-entier": 8.4,
  "6e-decimal-diviser-par-entier-short": 4.24,
  "6e-decimal-calcul-defi": 8.4,
  "6e-decimal-calcul-defi-short": 4.21,
  // Demi-droite graduée 6e + decimal_droite CM1/CM2 (08/11) : paysage = pause après
  // « point f r » (clip de fin + 2,9 s) ; short = « Mets » (86,05 s) + 0,03 s.
  "6e-demi-droite-lire": 8.2,
  "6e-demi-droite-placer": 8.2,
  "6e-demi-droite-fraction": 8.2,
  "6e-demi-droite-graduer": 8.2,
  "cm1-decimal-droite": 8.2,
  "cm2-decimal-droite": 8.2,
  "cm1-decimal-droite-short": 4.22,
  "cm2-decimal-droite-short": 4.22,
  // Carré et cube 5e (08/11) : paysage = même fin que les Relatifs (pause après « point f r »
  // de 8,64 à 7,72 s avant la fin, mesurée dans les 5 mp4) ; short = « Mets » + 0,03 s.
  "5e-puissance-notation": 8.4,
  "5e-puissance-notation-short": 4.17,
  "5e-puissance-valeurs": 8.4,
  "5e-puissance-valeurs-short": 4.16,
  "5e-puissance-ecrire": 8.4,
  "5e-puissance-ecrire-short": 4.17,
  "5e-puissance-calculer": 8.4,
  "5e-puissance-calculer-short": 4.17,
  "5e-puissance-litteral": 8.4,
  "5e-puissance-litteral-short": 4.18,
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
  // Arrêt précis pour les vidéos de la table, dont la coupe tombe entre deux mots :
  // timeupdate ne passe que toutes les 0,25 s. On vérifie donc à chaque image pendant la
  // lecture ; timeupdate reste le filet si l'onglet passe en arrière-plan. Les autres vidéos
  // gardent timeupdate : à 3,6 s, un arrêt exact couperait la fin de « point f r ».
  const surveillerRef = useRef(surveiller);
  useEffect(() => {
    surveillerRef.current = surveiller;
  });
  useEffect(() => {
    const v = ref.current;
    if (!v || COUPE_PAR_VIDEO[videoId] === undefined) return;
    let image = 0;
    const boucle = () => {
      surveillerRef.current();
      if (!v.paused && !v.ended) image = requestAnimationFrame(boucle);
    };
    const lancer = () => {
      cancelAnimationFrame(image);
      image = requestAnimationFrame(boucle);
    };
    const arreter = () => cancelAnimationFrame(image);
    v.addEventListener("play", lancer);
    v.addEventListener("pause", arreter);
    v.addEventListener("ended", arreter);
    if (!v.paused) lancer();
    return () => {
      arreter();
      v.removeEventListener("play", lancer);
      v.removeEventListener("pause", arreter);
      v.removeEventListener("ended", arreter);
    };
  }, [videoId]);
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
    <div>
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
      {/* Sous la vidéo, hors de l'écran de fin : « parfois ça va trop vite » (10/11). */}
      <VitesseVideo video={ref} />
    </div>
  );
}
