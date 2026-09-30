// Ti Margo qui parle, pour le MODE CLASSE des fiches de cours (30/09/2026).
//
// ⭐ POURQUOI : Frédéric, en lançant les fiches de cours de 6e : « les fiches
// de cours en mode classe doivent être très visuelles, avec Ti Margo si tu
// veux ». Et : « ce sont des 6e, ils ont parfois du mal à lire ». Ti Margo dit
// la phrase clé en une bulle, à côté du dessin : l'œil de la classe va au
// personnage, puis à ce qu'il dit.
//
// Usage dans une diapo (`ClasseSlide.schema` ou le `contenu` d'un duo) :
//   schema: avecMargo(<CanvasRenderer … />, "Une graduation, c'est 0,1 !")
//   ou seul : <TiMargoBulle texte="…" />
// ⛔ Texte COURT (une phrase, ≤ 70 signes) et sans LaTeX : le mode classe n'a
// pas de rendu KaTeX, le code serait projeté en clair.

import type { ReactNode } from "react";

export type HumeurMargo = "normal" | "joie" | "attention";

const BULLE: Record<HumeurMargo, string> = {
  normal: "border-emerald-300 bg-emerald-50 text-emerald-950",
  joie: "border-amber-300 bg-amber-50 text-amber-950",
  attention: "border-rose-300 bg-rose-50 text-rose-950",
};

/** Ti Margo et sa bulle. Pensé pour la projection : grand, peu de mots. */
export default function TiMargoBulle({ texte, humeur = "normal" }: { texte: string; humeur?: HumeurMargo }) {
  return (
    <div className="flex items-end gap-3">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/cahier-vacances/ti-margo.png"
        alt="Ti Margo"
        width={112}
        height={140}
        className="h-20 w-auto shrink-0 object-contain lg:h-24"
      />
      <p className={`relative mb-3 rounded-3xl border-4 px-4 py-2 text-xl font-black leading-snug lg:text-2xl ${BULLE[humeur]}`}>
        {humeur === "attention" ? "⚠️ " : humeur === "joie" ? "⭐ " : ""}
        {texte}
      </p>
    </div>
  );
}

/** Un dessin, et Ti Margo dessous qui dit la phrase clé. */
export const avecMargo = (dessin: ReactNode, texte: string, humeur?: HumeurMargo) => (
  <div className="grid gap-4">
    {dessin}
    <TiMargoBulle texte={texte} humeur={humeur} />
  </div>
);
