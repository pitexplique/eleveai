// CalculRapideClient.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import type { NiveauCalculRapide } from "@/lib/calcul-rapide";

const niveaux: NiveauCalculRapide[] = [
  "CM1",
  "CM2",
  "6e",
  "5e",
  "4e",
  "3e",
  "terminale-spe",
  "adulte",
];

const niveauLabels: Record<NiveauCalculRapide, string> = {
  CM1: "CM1",
  CM2: "CM2",
  "6e": "6e",
  "5e": "5e",
  "4e": "4e",
  "3e": "3e",
  "terminale-spe": "Terminale spé",
  adulte: "Calculs du quotidien",
};

export default function CalculRapideClient() {
  const [niveau, setNiveau] = useState<NiveauCalculRapide>("6e");

  return (
    <main className="min-h-[100svh] bg-slate-950 text-white">
      <section className="relative min-h-[100svh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/calcul-rapide/cover.png')",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/45 to-black/85" />

        <div className="absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400/15 blur-3xl md:h-[520px] md:w-[520px]" />

        <div className="relative z-10 flex min-h-[100svh] items-center justify-center px-4 py-4 sm:py-6">
          <div className="w-full max-w-5xl text-center">
            <div className="mx-auto mb-3 inline-flex rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold shadow-lg backdrop-blur-xl sm:mb-4 sm:text-sm">
              ⚡ Défi du jour · 5 minutes
            </div>

            <h1 className="text-4xl font-black tracking-tight drop-shadow-[0_10px_40px_rgba(0,0,0,0.9)] sm:text-5xl md:text-6xl lg:text-7xl">
              Calcul rapide
            </h1>

            <p className="mx-auto mt-3 max-w-2xl text-base font-medium text-white/95 drop-shadow sm:text-lg md:text-xl lg:text-2xl">
              Chaque jour, 5 minutes pour entraîner ton cerveau, gagner en vitesse et progresser en
              maths.
            </p>

            <div className="mx-auto mt-5 grid max-w-3xl grid-cols-3 gap-2 sm:mt-6 sm:gap-4">
              <div className="rounded-2xl border border-white/20 bg-white/10 p-3 shadow-xl backdrop-blur-xl sm:rounded-3xl sm:p-5">
                <div className="text-2xl sm:text-3xl">⏱️</div>
                <p className="mt-1 text-sm font-bold sm:text-lg">
                  5 minutes
                </p>
                <p className="hidden text-sm text-white/75 sm:block">
                  court et efficace
                </p>
              </div>

              <div className="rounded-2xl border border-white/20 bg-white/10 p-3 shadow-xl backdrop-blur-xl sm:rounded-3xl sm:p-5">
                <div className="text-2xl sm:text-3xl">⚡</div>
                <p className="mt-1 text-sm font-bold sm:text-lg">Calculs</p>
                <p className="hidden text-sm text-white/75 sm:block">
                  automatismes
                </p>
              </div>

              <div className="rounded-2xl border border-white/20 bg-white/10 p-3 shadow-xl backdrop-blur-xl sm:rounded-3xl sm:p-5">
                <div className="text-2xl sm:text-3xl">🎯</div>
                <p className="mt-1 text-sm font-bold sm:text-lg">Défis</p>
                <p className="hidden text-sm text-white/75 sm:block">
                  problèmes courts
                </p>
              </div>
            </div>

            <div className="mt-5 sm:mt-7">
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-white/80 sm:text-sm">
                Choisis ton niveau
              </p>

              <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                {niveaux.map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setNiveau(n)}
                    className={`rounded-full px-5 py-2.5 text-base font-black shadow-lg transition hover:scale-105 sm:px-6 sm:py-3 sm:text-lg ${
                      niveau === n
                        ? "bg-emerald-400 text-slate-950 shadow-[0_0_24px_rgba(52,211,153,0.8)]"
                        : "bg-white/15 text-white hover:bg-white/25"
                    }`}
                  >
                    {niveauLabels[n]}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:mt-8 sm:flex-row sm:gap-4">
              <Link
                href={`/calcul-rapide/defi?niveau=${niveau}`}
                className="rounded-full bg-emerald-400 px-8 py-4 text-lg font-black text-slate-950 shadow-2xl shadow-emerald-400/30 transition hover:scale-105 hover:bg-emerald-300 sm:px-10 sm:py-5 sm:text-xl"
              >
                🚀 Lancer le défi
              </Link>

              <Link
                href="/accueil"
                className="rounded-full border border-white/25 bg-white/10 px-7 py-4 text-base font-bold text-white shadow-lg backdrop-blur-xl transition hover:bg-white/20 sm:px-8 sm:py-5 sm:text-lg"
              >
                Retour accueil
              </Link>
            </div>

            <p className="mt-3 text-xs text-white/80 sm:text-sm">
              ⚡ 0 configuration • Lance et progresse
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
