"use client";

// ⭐ 05/11/2026 — Frédéric : « lorsqu'on clique sur vidéo il ouvre une nouvelle
// fenêtre et fait des recommandations, les élèves perdent le fil ». La vidéo
// s'ouvre maintenant PAR-DESSUS la page, sans aucun lien vers ailleurs, et un seul
// chemin de sortie : le bouton « Retour » en haut, qui rend la page telle quelle.
// Sur téléphone, le modal prend tout l'écran et le bouton retour du téléphone le
// ferme (sinon l'élève quittait le coach).
//
// ⛔ Jamais de lecture automatique : la vidéo s'ouvre EN PAUSE (28/09).
// Le lien reste un vrai <a> : Ctrl+clic ouvre encore le lecteur complet /video/<id>.

import { useEffect, useRef, useState, type KeyboardEvent, type MouseEvent, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { ArrowLeft } from "lucide-react";
import LecteurVideo from "@/components/LecteurVideo";
import { lienVideo } from "@/lib/videos/lienVideo";

type VideoLue = {
  id: string;
  titre: string;
  short: boolean;
  src: string;
  poster: string | null;
  coach: string | null;
};

// Une ligne par vidéo : rouvrir la même ne redemande rien.
const cache = new Map<string, Promise<VideoLue | null>>();
function lireVideo(id: string): Promise<VideoLue | null> {
  if (!cache.has(id)) {
    const lecture = fetch(`/api/video-lecteur/${encodeURIComponent(id)}`)
      .then((r) => (r.ok ? r.json() : null))
      .catch(() => {
        cache.delete(id); // panne de réseau : on pourra réessayer
        return null;
      });
    cache.set(id, lecture);
  }
  return cache.get(id)!;
}

const HAUTEUR_VIDEO = "max-h-[calc(100dvh-9rem)] sm:max-h-[calc(100dvh-11rem)]";

function ModalVideo({
  id,
  lien,
  titre,
  libelleRetour,
  retourQuestion,
  onFermer,
}: {
  id: string;
  lien: string;
  titre?: string | null;
  libelleRetour: string;
  retourQuestion: boolean;
  onFermer: () => void;
}) {
  const [video, setVideo] = useState<VideoLue | null | undefined>(undefined);
  const dialogue = useRef<HTMLDivElement>(null);
  const bouton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let annule = false;
    lireVideo(id).then((v) => {
      if (!annule) setVideo(v);
    });
    return () => {
      annule = true;
    };
  }, [id]);

  // Le bouton retour du téléphone ferme le modal au lieu de quitter le coach.
  const entreePosee = useRef(false); // une seule entrée, même si l'effet est rejoué
  useEffect(() => {
    if (!entreePosee.current) {
      entreePosee.current = true;
      window.history.pushState(null, "");
    }
    const surRetour = () => onFermer();
    window.addEventListener("popstate", surRetour);
    return () => window.removeEventListener("popstate", surRetour);
  }, [onFermer]);
  const fermer = () => window.history.back();

  // La page derrière ne défile plus, et le focus revient au lien à la fermeture.
  useEffect(() => {
    const avant = document.activeElement as HTMLElement | null;
    const defilement = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    bouton.current?.focus();
    return () => {
      document.body.style.overflow = defilement;
      avant?.focus?.();
    };
  }, []);

  // Échap ferme ; Tab reste dans le modal. Les raccourcis du coach (écoutés sur
  // window) ne doivent pas répondre à une touche tapée ici : espace = pause.
  useEffect(() => {
    const el = dialogue.current;
    if (!el) return;
    const surTouche = (e: globalThis.KeyboardEvent) => {
      e.stopPropagation();
      if (e.key === "Escape") {
        e.preventDefault();
        window.history.back();
      } else if (e.key === "Tab") {
        const reperes = el.querySelectorAll<HTMLElement>("button, a[href], video[controls]");
        if (!reperes.length) return;
        const premier = reperes[0];
        const dernier = reperes[reperes.length - 1];
        if (e.shiftKey && document.activeElement === premier) {
          e.preventDefault();
          dernier.focus();
        } else if (!e.shiftKey && document.activeElement === dernier) {
          e.preventDefault();
          premier.focus();
        }
      }
    };
    el.addEventListener("keydown", surTouche);
    return () => el.removeEventListener("keydown", surTouche);
  }, []);

  // Les événements d'un portail remontent aux parents React : le clic dans le
  // modal ne doit pas sélectionner la ligne du coach qui porte le lien.
  const arreter = (e: MouseEvent | KeyboardEvent) => e.stopPropagation();

  return createPortal(
    <div
      ref={dialogue}
      role="dialog"
      aria-modal="true"
      aria-label={video?.titre ?? titre ?? "Vidéo"}
      onClick={(e) => {
        arreter(e);
        if (e.target === e.currentTarget) fermer();
      }}
      onKeyDown={arreter}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-950 sm:bg-slate-950/85 sm:p-6"
    >
      <div
        className={[
          // Contour blanc (06/11) ; sur téléphone, plein écran et fond noir autour de la vidéo.
          "flex h-full w-full flex-col bg-slate-950 text-white sm:h-auto sm:rounded-2xl sm:bg-white sm:text-slate-900 sm:shadow-2xl",
          video?.short ? "sm:max-w-md" : "sm:max-w-5xl",
        ].join(" ")}
      >
        <div className="flex items-center gap-3 px-3 py-2 sm:px-4 sm:py-3">
          <button
            ref={bouton}
            type="button"
            onClick={fermer}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white px-3 py-2 text-sm font-black text-slate-950 transition hover:bg-slate-200 sm:bg-slate-900 sm:text-white sm:hover:bg-slate-700"
          >
            <ArrowLeft aria-hidden="true" className="h-4 w-4" strokeWidth={3} />
            {libelleRetour}
          </button>
          <p className="line-clamp-2 min-w-0 text-sm font-bold leading-tight text-slate-200 sm:text-slate-800">{video?.titre ?? titre}</p>
        </div>

        <div className="flex flex-1 items-center justify-center sm:px-4 sm:pb-4">
          {video === undefined ? (
            <p className="py-20 text-sm font-bold text-slate-300 sm:text-slate-600">Chargement de la vidéo…</p>
          ) : video === null ? (
            // Pas encore sur le lecteur du site : le seul cas où YouTube reste possible.
            <p className="px-6 py-16 text-center text-sm text-slate-200 sm:text-slate-700">
              Cette vidéo n&apos;est pas encore sur le site.{" "}
              <a href={lien} target="_blank" rel="noopener noreferrer" className="font-bold underline">
                L&apos;ouvrir à part
              </a>
            </p>
          ) : (
            <div className="w-full">
              <LecteurVideo
                key={video.id}
                videoId={video.id}
                src={video.src}
                poster={video.poster ?? undefined}
                controls
                playsInline
                preload="metadata"
                retour={retourQuestion ? { label: libelleRetour, action: fermer } : undefined}
                suite={video.coach ? { href: video.coach, label: "Je m'entraîne sur ces questions" } : undefined}
                className={
                  video.short
                    ? `mx-auto aspect-[9/16] h-[calc(100dvh-9rem)] max-w-full bg-black object-contain sm:h-[calc(100dvh-11rem)] sm:rounded-2xl`
                    : `aspect-video w-full bg-black object-contain sm:rounded-2xl ${HAUTEUR_VIDEO}`
                }
              >
                Ton navigateur ne lit pas cette vidéo.
              </LecteurVideo>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}

export default function LienVideoModal({
  url,
  titre,
  libelleRetour = "Retour à ma question",
  retourQuestion = true,
  className,
  ariaLabel,
  children,
}: {
  /** L'adresse telle que le coach la connaît (YouTube ou /video/<id>). */
  url: string;
  titre?: string | null;
  libelleRetour?: string;
  /** La fin de vidéo ramène à la question (sinon : au coach de la micro). */
  retourQuestion?: boolean;
  className?: string;
  ariaLabel?: string;
  children: ReactNode;
}) {
  const [ouvert, setOuvert] = useState(false);
  const fermer = useRef(() => setOuvert(false)).current;
  const lien = lienVideo(url).replace(/^https:\/\/www\.eleveai\.fr(?=\/video\/)/, "");
  const id = lien.match(/^\/video\/([^/?#]+)/)?.[1];

  return (
    <>
      <a
        href={lien}
        target="_blank"
        rel="noopener noreferrer"
        title={titre ?? undefined}
        aria-label={ariaLabel}
        className={className}
        onClick={(e) => {
          e.stopPropagation();
          // Ctrl+clic ou clic molette : l'élève a choisi l'onglet, on le laisse.
          if (!id || e.ctrlKey || e.metaKey || e.shiftKey || e.button !== 0) return;
          e.preventDefault();
          setOuvert(true);
        }}
      >
        {children}
      </a>
      {ouvert && id ? (
        <ModalVideo
          id={id}
          lien={lien}
          titre={titre}
          libelleRetour={libelleRetour}
          retourQuestion={retourQuestion}
          onFermer={fermer}
        />
      ) : null}
    </>
  );
}
