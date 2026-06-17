"use client";

// components/remerciements/RemerciementsBar.tsx

import { usePathname } from "next/navigation";
import { elevesRemercies } from "@/lib/remerciements/eleves";

export default function RemerciementsBar() {
  const pathname = usePathname();

  if (pathname.startsWith("/fiches-cours")) return null;
  if (elevesRemercies.length === 0) return null;

  return (
    <section className="remerciements-bar w-full border-t border-yellow-300/20 bg-[#171b2b] px-4 py-4 text-white shadow-[0_-10px_30px_rgba(0,0,0,0.25)] backdrop-blur-md">
      <div className="mx-auto max-w-7xl text-center">
        <p className="mb-3 text-sm font-black uppercase tracking-[0.18em] text-yellow-300">
          Remerciements
        </p>

        <div className="flex flex-wrap justify-center gap-2.5">
          {/* clé prénom + action : deux élèves peuvent porter le même prénom (deux Maëlle) */}
          {elevesRemercies.map((eleve) => (
            <span
              key={`${eleve.prenom}-${eleve.action}`}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-sm font-bold text-white/90 shadow-sm transition hover:-translate-y-0.5 hover:border-yellow-300/45 hover:bg-white/15"
            >
              <span className="text-[15px] font-black text-yellow-300">{eleve.prenom}</span>
              <span className="text-white/50">·</span>
              <span className="text-white/75">{eleve.action}</span>
            </span>
          ))}
        </div>

        <p className="mt-3 text-xs font-semibold text-white/55">
          Merci aux élèves testeurs qui aident EleveAI à progresser.
        </p>
      </div>
    </section>
  );
}
