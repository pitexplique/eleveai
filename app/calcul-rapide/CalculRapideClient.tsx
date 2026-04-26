"use client";

import { useState } from "react";
import Link from "next/link";
import type { NiveauCalculRapide } from "@/lib/calcul-rapide";

const niveaux: NiveauCalculRapide[] = ["6e", "5e", "4e", "3e"];

export default function CalculRapideClient() {
  const [niveau, setNiveau] = useState<NiveauCalculRapide>("6e");

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="relative min-h-screen overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/calcul-rapide/cover.png')",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/45 to-black/85" />

        <div className="absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400/15 blur-3xl" />

        <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-24">
          <div className="w-full max-w-5xl text-center">
            <div className="mx-auto mb-6 inline-flex rounded-full border border-white/25 bg-white/10 px-5 py-2 text-sm font-semibold shadow-lg backdrop-blur-xl">
              ⚡ Défi du jour · 5 minutes
            </div>

            <h1 className="text-5xl font-black tracking-tight drop-shadow-[0_10px_40px_rgba(0,0,0,0.9)] md:text-7xl">
              Calcul rapide
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-xl font-medium text-white/95 drop-shadow md:text-2xl">
              5 minutes pour entraîner ton cerveau, gagner en vitesse et
              progresser en maths.
            </p>

            <div className="mx-auto mt-8 grid max-w-3xl gap-4 md:grid-cols-3">
              <div className="rounded-3xl border border-white/20 bg-white/10 p-5 shadow-xl backdrop-blur-xl">
                <div className="text-3xl">⏱️</div>
                <p className="mt-2 text-lg font-bold">5 minutes</p>
                <p className="text-sm text-white/75">court et efficace</p>
              </div>

              <div className="rounded-3xl border border-white/20 bg-white/10 p-5 shadow-xl backdrop-blur-xl">
                <div className="text-3xl">⚡</div>
                <p className="mt-2 text-lg font-bold">5 calculs</p>
                <p className="text-sm text-white/75">automatismes</p>
              </div>

              <div className="rounded-3xl border border-white/20 bg-white/10 p-5 shadow-xl backdrop-blur-xl">
                <div className="text-3xl">🎯</div>
                <p className="mt-2 text-lg font-bold">2 défis</p>
                <p className="text-sm text-white/75">problèmes courts</p>
              </div>
            </div>

            <div className="mt-8">
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-white/80">
                Choisis ton niveau
              </p>

              <div className="flex flex-wrap justify-center gap-3">
                {niveaux.map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setNiveau(n)}
                    className={`rounded-full px-6 py-3 text-lg font-black shadow-lg transition hover:scale-105 ${
                      niveau === n
                        ? "bg-emerald-400 text-slate-950 shadow-[0_0_24px_rgba(52,211,153,0.8)]"
                        : "bg-white/15 text-white hover:bg-white/25"
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href={`/calcul-rapide/defi?niveau=${niveau}`}
                className="rounded-full bg-emerald-400 px-10 py-5 text-xl font-black text-slate-950 shadow-2xl shadow-emerald-400/30 transition hover:scale-105 hover:bg-emerald-300"
              >
                🚀 Lancer le défi
              </Link>

              <Link
                href="/accueil"
                className="rounded-full border border-white/25 bg-white/10 px-8 py-5 text-lg font-bold text-white shadow-lg backdrop-blur-xl transition hover:bg-white/20"
              >
                Retour accueil
              </Link>
            </div>

            <p className="mt-4 text-sm text-white/80">
              ⚡ 0 configuration • Lance et progresse
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}