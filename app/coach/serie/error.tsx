"use client";

// ⛔ 23/11/2026 — LE FILET DU COACH. Sans ce fichier, une erreur d'affichage
// (un dessin, une formule) remplaçait toute la page par l'écran d'erreur de
// Next : l'élève se croyait « sorti du coach ». Ici il reste sur /coach/serie
// et repart d'un clic.

import { useEffect } from "react";

export default function ErreurCoach({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Coach :", error);
  }, [error]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-100 via-cyan-50 to-emerald-100 px-4 py-10">
      <div className="mx-auto max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <p className="text-xl font-black text-slate-900">Oups, le coach a eu un souci.</p>
        <p className="mt-2 text-sm font-semibold text-slate-600">
          Ce n&rsquo;est pas ta faute. Clique pour reprendre.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-5 rounded-xl bg-lime-500 px-6 py-3 text-base font-black text-white shadow hover:bg-lime-600"
        >
          Reprendre
        </button>
      </div>
    </main>
  );
}
