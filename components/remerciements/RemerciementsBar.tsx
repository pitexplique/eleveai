// components/remerciements/RemerciementsBar.tsx

import { elevesRemercies } from "@/lib/remerciements/eleves";

export default function RemerciementsBar() {
  if (elevesRemercies.length === 0) return null;

  return (
    <section className="w-full border-t border-white/15 bg-slate-950/90 px-4 py-3 text-white backdrop-blur-md">
      <div className="mx-auto max-w-7xl text-center">
        <p className="mb-2 text-xs font-black uppercase tracking-widest text-yellow-300">
          Remerciements
        </p>

        <div className="flex flex-wrap justify-center gap-2">
          {elevesRemercies.map((eleve) => (
            <span
              key={eleve.prenom}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-white/90"
            >
              <span className="font-black text-yellow-300">{eleve.prenom}</span>
              <span className="text-white/50">·</span>
              <span className="text-white/70">{eleve.action}</span>
            </span>
          ))}
        </div>

        <p className="mt-2 text-[11px] font-medium text-white/50">
          Merci aux élèves testeurs qui aident EleveAI à progresser.
        </p>
      </div>
    </section>
  );
}
