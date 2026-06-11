// app/remerciements/page.tsx

export { metadata } from "./metadata";

import { elevesRemercies } from "@/lib/remerciements/eleves";

export default function RemerciementsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-sky-950 to-emerald-950 px-4 py-12 text-white">
      <section className="mx-auto max-w-6xl">
        <div className="overflow-hidden rounded-[2rem] border border-white/15 bg-white/10 shadow-2xl backdrop-blur-md">
          <div className="relative px-6 py-10 text-center md:px-12 md:py-14">
            <div className="absolute left-6 top-6 hidden rounded-full bg-yellow-300/20 px-4 py-2 text-sm font-black text-yellow-200 md:block">
              EleveAI
            </div>

            <p className="text-sm font-black uppercase tracking-[0.25em] text-yellow-300">
              EleveAI
            </p>

            <h1 className="mt-4 text-4xl font-black tracking-tight md:text-6xl">
              Remerciements
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-base font-medium leading-relaxed text-white/80 md:text-lg">
              Merci aux élèves qui ont testé EleveAI, donné leur avis, signalé
              des problèmes, proposé des idées et aidé à améliorer la
              plateforme.
            </p>

            <div className="mx-auto mt-6 max-w-3xl rounded-2xl border border-yellow-300/20 bg-yellow-300/10 px-5 py-4 text-sm font-bold leading-relaxed text-yellow-100">
              Seuls les prénoms sont affichés. Aucun nom de famille n'est publié.
            </div>
          </div>

          <div className="border-t border-white/10 bg-slate-950/45 px-6 py-10 md:px-12">
            <h2 className="text-center text-2xl font-black text-yellow-300">
              Élèves testeurs
            </h2>

            {elevesRemercies.length > 0 ? (
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {elevesRemercies.map((eleve) => (
                  <div
                    key={eleve.prenom}
                    className="rounded-2xl border border-white/15 bg-white/10 px-5 py-4 shadow-lg transition hover:-translate-y-1 hover:bg-white/15"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-base font-black text-yellow-300">
                        {eleve.prenom}
                      </p>
                      {eleve.meta && (
                        <span className="rounded-full bg-emerald-400/20 px-2 py-0.5 text-[10px] font-black text-emerald-300">
                          {eleve.meta}
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-sm font-medium text-white/75">
                      {eleve.action}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-8 text-center text-sm font-semibold text-white/60">
                Les prénoms seront ajoutés prochainement.
              </p>
            )}
          </div>

          <div className="border-t border-white/10 px-6 py-8 text-center md:px-12">
            <p className="text-2xl font-black text-emerald-300">
              Grâce à vous, EleveAI avance.
            </p>

            <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-white/70 md:text-base">
              Vos remarques permettent d'améliorer les parcours, les défis,
              l'enregistrement des scores, le calcul rapide et l'expérience des
              élèves.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
