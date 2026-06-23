// app/remerciements/page.tsx

export { metadata } from "./metadata";

import Link from "next/link";
import { elevesRemercies } from "@/lib/remerciements/eleves";
import { initialePrenom } from "@/lib/prenom";

export default function RemerciementsPage() {
  const total = elevesRemercies.length;

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-sky-950 to-emerald-950 px-4 py-12 text-white">
      <section className="mx-auto max-w-6xl">
        <div className="overflow-hidden rounded-[2rem] border border-white/15 bg-white/10 shadow-2xl backdrop-blur-md">
          {/* HERO */}
          <div className="relative px-6 py-12 text-center md:px-12 md:py-16">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(250,204,21,0.18),_transparent_55%)]" />

            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-full border border-yellow-300/30 bg-yellow-300/10 px-4 py-1.5 text-xs font-black uppercase tracking-[0.18em] text-yellow-200">
                🙏 EleveAI · Merci
              </span>

              <h1 className="mt-6 text-4xl font-black tracking-tight md:text-6xl">
                Remerciements
              </h1>

              <p className="mx-auto mt-6 max-w-3xl text-base font-medium leading-relaxed text-white/80 md:text-lg">
                EleveAI est construit{" "}
                <span className="font-black text-white">avec ses élèves</span>. Merci
                à celles et ceux qui ont testé, donné leur avis, traqué les bugs et
                proposé les idées qui ont fait avancer la plateforme.
              </p>

              <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-4 py-2 text-sm font-black text-white">
                  <span className="text-lg">🏅</span> {total} élèves testeurs
                </span>
                <Link
                  href="/votre-avis"
                  className="inline-flex items-center gap-2 rounded-2xl bg-emerald-500 px-4 py-2 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-emerald-400"
                >
                  Donner mon avis →
                </Link>
              </div>
            </div>
          </div>

          {/* GRILLE */}
          <div className="border-t border-white/10 bg-slate-950/45 px-6 py-12 md:px-12">
            <h2 className="text-center text-2xl font-black text-yellow-300">
              Nos élèves testeurs
            </h2>

            {total > 0 ? (
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {elevesRemercies.map((eleve) => (
                  <div
                    key={`${eleve.prenom}-${eleve.action}`}
                    className="group relative overflow-hidden rounded-2xl border border-white/15 bg-white/[0.07] px-5 py-4 shadow-lg transition hover:-translate-y-1 hover:border-yellow-300/40 hover:bg-white/[0.12]"
                  >
                    <div className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-yellow-300/10 opacity-0 blur-xl transition group-hover:opacity-100" />

                    <div className="relative flex items-center gap-3">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-yellow-300 to-amber-500 text-base font-black text-slate-900 shadow">
                        {eleve.prenom.charAt(0)}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <p className="truncate text-base font-black text-yellow-300">
                            {initialePrenom(eleve.prenom)}
                          </p>
                          {eleve.meta && (
                            <span className="shrink-0 rounded-full bg-emerald-400/20 px-2 py-0.5 text-[10px] font-black uppercase tracking-wide text-emerald-300">
                              ★ {eleve.meta}
                            </span>
                          )}
                        </div>
                        <p className="mt-0.5 text-sm font-medium leading-snug text-white/75">
                          {eleve.action}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-8 text-center text-sm font-semibold text-white/60">
                Les prénoms seront ajoutés prochainement.
              </p>
            )}
          </div>

          {/* CLÔTURE */}
          <div className="border-t border-white/10 px-6 py-10 text-center md:px-12">
            <p className="text-2xl font-black text-emerald-300 md:text-3xl">
              Grâce à vous, EleveAI avance. 🚀
            </p>

            <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-white/70 md:text-base">
              Vos remarques améliorent les parcours, les défis, l'enregistrement des
              scores, le calcul rapide et l'expérience de tous les élèves.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
