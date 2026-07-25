"use client";

// LE 3e BOUTON DU HERO « Commence ici » — un mini-slide des rituels quotidiens
// (défi, dictée, anglais, espagnol, calcul). Retours de Frédéric (25/07) :
// des FLÈCHES ‹ › de part et d'autre pour naviguer à la main (les points de
// rotation étaient trop petits dans un bouton aussi étroit → retirés). Ça
// défile tout seul, se met en PAUSE au survol, et la partie centrale mène
// toujours au rituel affiché.

import Link from "next/link";
import { useEffect, useState } from "react";

const RITUELS = [
  { emoji: "🎯", label: "Défi du jour", href: "/defis-du-jour" },
  { emoji: "✍️", label: "Dictée du jour", href: "/dictee-du-jour" },
  { emoji: "🇬🇧", label: "Anglais du jour", href: "/anglais-du-jour" },
  { emoji: "🇪🇸", label: "Espagnol du jour", href: "/espagnol-du-jour" },
  { emoji: "⚡", label: "Calcul rapide", href: "/calcul-rapide" },
];

export default function RituelDuJourChip() {
  const [i, setI] = useState(0);
  const [pause, setPause] = useState(false);

  useEffect(() => {
    if (pause) return;
    const t = setInterval(() => setI((v) => (v + 1) % RITUELS.length), 3000);
    return () => clearInterval(t);
  }, [pause]);

  const r = RITUELS[i];
  const go = (d: number) => setI((v) => (v + d + RITUELS.length) % RITUELS.length);

  const fleche =
    "flex items-center px-2 text-base font-black text-cyan-800 transition hover:bg-cyan-800 hover:text-[#f0fafc]";

  return (
    <span
      onMouseEnter={() => setPause(true)}
      onMouseLeave={() => setPause(false)}
      onFocusCapture={() => setPause(true)}
      onBlurCapture={() => setPause(false)}
      className="inline-flex items-stretch overflow-hidden rounded-sm border-2 border-cyan-800"
    >
      <button
        type="button"
        onClick={() => go(-1)}
        aria-label="Rituel précédent"
        className={fleche}
      >
        ‹
      </button>

      {/* Le cœur cliquable — mène au rituel affiché. Largeur fixe pour que les
          flèches ne sautent pas quand le libellé change. */}
      <Link
        href={r.href}
        aria-label={`Le rituel du jour : ${r.label}`}
        className="flex min-w-[150px] items-center justify-center gap-2 border-x-2 border-cyan-800 px-3 py-2.5 text-sm font-black text-cyan-800 transition hover:bg-cyan-800 hover:text-[#f0fafc]"
      >
        <span aria-hidden>{r.emoji}</span>
        <span>{r.label}</span>
      </Link>

      <button
        type="button"
        onClick={() => go(1)}
        aria-label="Rituel suivant"
        className={fleche}
      >
        ›
      </button>
    </span>
  );
}
