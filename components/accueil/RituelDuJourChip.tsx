"use client";

// LE 3e BOUTON DU HERO « Commence ici » — un mini-slide (idée de Frédéric,
// 25/07) : au lieu du seul « Défi du jour », il FAIT DÉFILER les rituels
// quotidiens (défi, dictée, anglais, espagnol, calcul). Le bouton mène toujours
// au rituel affiché ; il se met en PAUSE au survol/focus pour qu'on clique sans
// se faire changer la cible sous le doigt.
//
// Départ déterministe (index 0) pour ne pas casser l'hydratation ; la rotation
// démarre côté client.

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
    const t = setInterval(() => setI((v) => (v + 1) % RITUELS.length), 2600);
    return () => clearInterval(t);
  }, [pause]);

  const r = RITUELS[i];

  return (
    <Link
      href={r.href}
      onMouseEnter={() => setPause(true)}
      onMouseLeave={() => setPause(false)}
      onFocus={() => setPause(true)}
      onBlur={() => setPause(false)}
      aria-label={`Le rituel du jour : ${r.label}`}
      className="group inline-flex items-center gap-2 rounded-sm border-2 border-cyan-800 px-5 py-2.5 text-sm font-black text-cyan-800 transition hover:bg-cyan-800 hover:text-[#f0fafc]"
    >
      {/* Les points de rotation — signalent que ça défile. */}
      <span className="flex items-center gap-1" aria-hidden>
        {RITUELS.map((_, k) => (
          <span
            key={k}
            className={`h-1 w-1 rounded-full transition ${
              k === i ? "bg-current" : "bg-current/30"
            }`}
          />
        ))}
      </span>
      <span aria-hidden>{r.emoji}</span>
      <span>{r.label}</span>
    </Link>
  );
}
