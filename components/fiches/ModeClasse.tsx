"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import { ArrowLeft, Maximize, Minimize, Monitor } from "lucide-react";

/**
 * Mode classe : version vidéoprojetable d'une fiche de cours.
 *
 * Composant autonome : il affiche son propre bouton déclencheur (à glisser
 * dans la barre d'actions de la fiche) puis ouvre un overlay plein écran
 * piloté par des « slides ». Le style est volontairement identique d'une fiche
 * à l'autre (palette emerald/cyan/amber) pour une projection cohérente.
 *
 * Navigation : flèches ← →, Espace/Entrée pour révéler, Échap pour quitter.
 */

type Variante = "info" | "histoire" | "piege" | "ok";

const VARIANTES: Record<Variante, { carte: string; label: string }> = {
  info: { carte: "border-cyan-200 bg-cyan-50", label: "text-cyan-700" },
  histoire: { carte: "border-amber-200 bg-amber-50", label: "text-amber-700" },
  piege: { carte: "border-amber-200 bg-amber-50", label: "text-amber-700" },
  ok: { carte: "border-emerald-200 bg-emerald-50", label: "text-emerald-700" },
};

export type ClasseSection =
  | {
      type: "objectif";
      phrase: string;
      sousPhrase?: string;
      encadre?: { titre: string; texte: string };
    }
  | {
      type: "duo";
      gauche: { variante?: Variante; titre: string; contenu: ReactNode };
      droite: { variante?: Variante; titre: string; contenu: ReactNode };
    }
  | { type: "cartes"; cartes: { titre: string; texte: string }[] }
  | { type: "etapes"; etapes: string[] }
  | {
      type: "exemple";
      enonce: string;
      question: string;
      correction: string;
    }
  | {
      type: "exercice";
      enonce: string;
      question?: string;
      indice?: string;
      correction: string;
    };

export type ClasseSlide = {
  titre: string;
  badge: string;
  section: ClasseSection;
  /**
   * Le DESSIN de la slide, projeté à côté du texte.
   *
   * ⛔ Ajouté le 20/08/2026. Le mode classe était resté un diaporama de texte
   * pendant que les fiches devenaient visuelles : aucune section ne pouvait
   * porter une figure, alors que le prof projette justement pour MONTRER.
   * Frédéric : « le mode classe est vraiment essentiel pour les profs ».
   */
  schema?: ReactNode;
};

const BTN_REVELER =
  "mt-8 self-start rounded-full bg-emerald-500 px-8 py-5 text-2xl font-black text-white shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-400";

function Section({
  section,
  revealed,
  reveal,
}: {
  section: ClasseSection;
  revealed: boolean;
  reveal: () => void;
}) {
  switch (section.type) {
    case "objectif":
      return (
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-5xl font-black leading-tight text-slate-950">
              {section.phrase}
            </p>
            {section.sousPhrase ? (
              <p className="mt-6 text-3xl font-bold leading-snug text-slate-700">
                {section.sousPhrase}
              </p>
            ) : null}
          </div>
          {section.encadre ? (
            <div className="rounded-3xl border-4 border-emerald-200 bg-emerald-50 p-8">
              <p className="text-2xl font-black uppercase text-emerald-700">
                {section.encadre.titre}
              </p>
              <p className="mt-5 text-4xl font-black leading-tight text-slate-950">
                {section.encadre.texte}
              </p>
            </div>
          ) : null}
        </div>
      );

    case "duo":
      return (
        <div className="grid gap-8 lg:grid-cols-2">
          {[section.gauche, section.droite].map((panel, index) => {
            const v = VARIANTES[panel.variante ?? "info"];
            return (
              <div
                key={index}
                className={`rounded-3xl border-4 p-10 ${v.carte}`}
              >
                <p className={`text-3xl font-black uppercase ${v.label}`}>
                  {panel.titre}
                </p>
                <div className="mt-5 text-3xl font-black leading-snug text-slate-950">
                  {panel.contenu}
                </div>
              </div>
            );
          })}
        </div>
      );

    case "cartes":
      return (
        <div className="grid gap-6 lg:grid-cols-3">
          {section.cartes.map((carte, index) => (
            <div
              key={carte.titre}
              className="rounded-3xl border-4 border-slate-200 bg-white p-8 shadow-sm"
            >
              <p className="text-6xl font-black text-emerald-600">
                {index + 1}
              </p>
              <p className="mt-4 text-3xl font-black leading-tight text-slate-950">
                {carte.titre}
              </p>
              <p className="mt-3 text-2xl font-bold leading-snug text-slate-600">
                {carte.texte}
              </p>
            </div>
          ))}
        </div>
      );

    case "etapes":
      return (
        <div className="grid gap-6">
          {section.etapes.map((etape, index) => (
            <div
              key={etape}
              className="grid items-center gap-5 rounded-3xl border-4 border-slate-200 bg-white p-7 shadow-sm md:grid-cols-[120px_1fr]"
            >
              <p className="text-5xl font-black text-emerald-600">
                {index + 1}
              </p>
              <p className="text-3xl font-black leading-tight text-slate-950">
                {etape}
              </p>
            </div>
          ))}
        </div>
      );

    case "exemple":
      return (
        <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
          <div className="rounded-3xl border-4 border-cyan-200 bg-cyan-50 p-10">
            <p className="text-4xl font-black leading-tight text-slate-950">
              {section.enonce}
            </p>
            <p className="mt-8 text-4xl font-black leading-tight text-cyan-700">
              {section.question}
            </p>
          </div>
          <div className="flex flex-col rounded-3xl border-4 border-emerald-200 bg-emerald-50 p-10">
            <p className="text-2xl font-black uppercase text-emerald-700">
              Correction
            </p>
            {revealed ? (
              <p className="mt-6 text-3xl font-black leading-snug text-slate-950">
                {section.correction}
              </p>
            ) : (
              <button type="button" onClick={reveal} className={BTN_REVELER}>
                Révéler la correction
              </button>
            )}
          </div>
        </div>
      );

    case "exercice":
      return (
        <div className="grid gap-8 lg:grid-cols-[1fr_0.85fr]">
          <div className="rounded-3xl border-4 border-cyan-200 bg-cyan-50 p-10">
            <p className="text-5xl font-black leading-tight text-slate-950">
              {section.enonce}
            </p>
            {section.question ? (
              <p className="mt-8 text-5xl font-black leading-tight text-cyan-700">
                {section.question}
              </p>
            ) : null}
          </div>
          <div className="flex flex-col rounded-3xl border-4 border-amber-200 bg-amber-50 p-10">
            <p className="text-3xl font-black uppercase text-amber-700">
              Consigne
            </p>
            {section.indice ? (
              <p className="mt-5 text-4xl font-black leading-tight text-slate-950">
                {section.indice}
              </p>
            ) : null}
            {revealed ? (
              <p className="mt-8 text-4xl font-black leading-tight text-emerald-700">
                {section.correction}
              </p>
            ) : (
              <button type="button" onClick={reveal} className={BTN_REVELER}>
                Révéler la correction
              </button>
            )}
          </div>
        </div>
      );

    default:
      return null;
  }
}

export default function ModeClasse({
  sousTitre,
  slides,
}: {
  sousTitre: string;
  slides: ClasseSlide[];
}) {
  const [ouvert, setOuvert] = useState(false);
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [plein, setPlein] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  function aller(suivant: number) {
    setIndex(Math.max(0, Math.min(slides.length - 1, suivant)));
    setRevealed(false);
  }

  function fermer() {
    setOuvert(false);
    setIndex(0);
    setRevealed(false);
  }

  function basculerPlein() {
    if (typeof document === "undefined") return;
    if (document.fullscreenElement) {
      document.exitFullscreen?.();
    } else {
      overlayRef.current?.requestFullscreen?.();
    }
  }

  useEffect(() => {
    function onFullscreenChange() {
      setPlein(Boolean(document.fullscreenElement));
    }
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  useEffect(() => {
    if (!ouvert) return;
    function handleKey(event: KeyboardEvent) {
      switch (event.key) {
        case "ArrowRight":
        case "PageDown":
          event.preventDefault();
          setIndex((current) => Math.min(slides.length - 1, current + 1));
          setRevealed(false);
          break;
        case "ArrowLeft":
        case "PageUp":
          event.preventDefault();
          setIndex((current) => Math.max(0, current - 1));
          setRevealed(false);
          break;
        case " ":
        case "Enter":
          event.preventDefault();
          setRevealed(true);
          break;
        case "Escape":
          // En plein écran, le 1er Échap sort du fullscreen ;
          // un second Échap quitte le mode classe.
          if (!document.fullscreenElement) fermer();
          break;
        default:
          break;
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ouvert, slides.length]);

  const declencheur = (
    <button
      type="button"
      onClick={() => setOuvert(true)}
      className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-200 bg-white px-5 py-3 text-sm font-black text-emerald-700 shadow-sm transition hover:bg-emerald-50"
    >
      <Monitor className="h-4 w-4" />
      Mode classe
    </button>
  );

  if (!ouvert || typeof document === "undefined") {
    return declencheur;
  }

  const slide = slides[index];

  const overlay = (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex flex-col bg-[#eef8f2] text-slate-950"
    >
      <header className="border-b border-emerald-200 bg-white px-6 py-4">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
          <button
            type="button"
            onClick={fermer}
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-black text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour à la fiche
          </button>
          <div className="text-center">
            <p className="text-sm font-black uppercase text-emerald-700">
              Mode classe
            </p>
            <p className="text-xl font-black text-slate-950">{sousTitre}</p>
            <p className="mt-0.5 text-xs font-bold text-slate-400">
              ← → naviguer · Espace révéler · Échap quitter
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={basculerPlein}
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-black text-slate-700 shadow-sm transition hover:bg-slate-50"
            >
              {plein ? (
                <Minimize className="h-4 w-4" />
              ) : (
                <Maximize className="h-4 w-4" />
              )}
              {plein ? "Quitter" : "Plein écran"}
            </button>
            <button
              type="button"
              onClick={() => aller(index - 1)}
              disabled={index === 0}
              className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-black text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Précédent
            </button>
            <button
              type="button"
              onClick={() => aller(index + 1)}
              disabled={index === slides.length - 1}
              className="rounded-full bg-emerald-500 px-5 py-3 text-sm font-black text-white shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Suivant
            </button>
          </div>
        </div>
      </header>

      <section className="flex flex-1 items-center overflow-y-auto px-6 py-8">
        <div className="mx-auto w-full max-w-7xl rounded-[2rem] border-4 border-white bg-white/90 p-10 shadow-2xl shadow-emerald-900/10">
          <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-2xl font-black uppercase text-emerald-700">
                {slide.badge}
              </p>
              <h2 className="mt-3 text-6xl font-black tracking-normal text-slate-950">
                {slide.titre}
              </h2>
            </div>
            <p className="rounded-full bg-slate-100 px-5 py-3 text-xl font-black text-slate-700">
              {index + 1} / {slides.length}
            </p>
          </div>
          {slide.schema ? (
            // Le dessin à gauche, le texte à droite : en vidéoprojection, la
            // figure est ce qu'on regarde, elle prend la moitié de l'écran.
            <div className="grid gap-10 lg:grid-cols-2">
              <div className="mx-auto w-full max-w-xl [&_svg]:w-full">{slide.schema}</div>
              <Section
                section={slide.section}
                revealed={revealed}
                reveal={() => setRevealed(true)}
              />
            </div>
          ) : (
            <Section
              section={slide.section}
              revealed={revealed}
              reveal={() => setRevealed(true)}
            />
          )}
        </div>
      </section>
    </div>
  );

  return (
    <>
      {declencheur}
      {createPortal(overlay, document.body)}
    </>
  );
}
