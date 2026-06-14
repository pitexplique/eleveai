// Banniere « Les eleves a l'honneur » : celebre quelques contributeurs par
// categorie. Reutilisable (votre-avis, accueil...). Donnees dans
// lib/ameliorations/aLHonneur.ts.

import { elevesALHonneur } from "@/lib/ameliorations/aLHonneur";

export default function ElevesALHonneur() {
  if (elevesALHonneur.length === 0) return null;

  return (
    <section className="mx-auto max-w-5xl px-4 pt-6 sm:pt-8">
      <div className="overflow-hidden rounded-3xl border border-amber-400/30 bg-gradient-to-br from-amber-500/[0.12] to-yellow-500/[0.06] p-5 sm:p-7">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-2xl font-black text-slate-50 sm:text-3xl">
            🌟 Les élèves à l&apos;honneur
          </h2>
          <span className="inline-flex items-center rounded-full bg-amber-400/20 px-3 py-1 text-xs font-black text-amber-200">
            Cette semaine
          </span>
        </div>
        <p className="mt-2 text-sm font-semibold text-slate-300">
          Merci à celles et ceux qui font grandir EleveAI. La prochaine&nbsp;? Peut-être toi.
        </p>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {elevesALHonneur.map((e, i) => (
            <div
              key={i}
              className="flex items-start gap-3 rounded-2xl border border-amber-300/20 bg-slate-900/50 p-4"
            >
              <span className="text-2xl" aria-hidden>
                {e.emoji}
              </span>
              <div className="min-w-0">
                <p className="text-[11px] font-black uppercase tracking-wide text-amber-300">
                  {e.categorie}
                </p>
                <p className="mt-0.5 text-base font-black text-slate-50">{e.eleve}</p>
                <p className="mt-0.5 text-sm font-medium leading-5 text-slate-300">
                  {e.pour}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
