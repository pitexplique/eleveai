"use client";

import { useEffect, useState } from "react";

// Même clé que le tutor : la préférence « affichage classe » est partagée et
// mémorisée entre le tutor et tous les parcours.
const STORAGE_KEY = "tutorv4-class-board";

export function useClassBoard() {
  const [classBoard, setClassBoard] = useState(false);

  // Lecture après montage pour éviter un écart d'hydratation (SSR sans storage).
  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) === "1") setClassBoard(true);
    } catch {
      /* localStorage indisponible : affichage normal. */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, classBoard ? "1" : "0");
    } catch {
      /* ignore */
    }
  }, [classBoard]);

  return {
    classBoard,
    toggleClassBoard: () => setClassBoard((v) => !v),
  };
}

export function ClassBoardToggle({
  classBoard,
  onToggle,
  className,
}: {
  classBoard: boolean;
  onToggle: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={classBoard}
      className={[
        "rounded-2xl border px-4 py-2.5 text-sm font-black shadow-sm transition",
        classBoard
          ? "border-indigo-500 bg-indigo-600 text-white hover:bg-indigo-500"
          : "border-slate-200 bg-white text-slate-800 hover:bg-slate-50",
        className ?? "",
      ].join(" ")}
    >
      {classBoard ? "🔍 Affichage classe : on" : "🔍 Affichage classe"}
    </button>
  );
}

// Le mode classe n'agrandit QUE les questions/réponses (pas le CSS de la page).
// Ces helpers renvoient la taille à utiliser selon l'état du mode classe.
export const classText = {
  question: (on: boolean) =>
    on ? "text-2xl leading-relaxed sm:text-3xl" : "text-base",
  choice: (on: boolean) => (on ? "text-lg sm:text-xl" : "text-sm"),
  input: (on: boolean) => (on ? "text-lg sm:text-xl" : "text-sm"),
};
