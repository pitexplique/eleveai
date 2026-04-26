"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function CalculRapideDefiClient() {
  const searchParams = useSearchParams();
  const niveau = searchParams.get("niveau") ?? "6e";

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-white">
      <section className="w-full max-w-3xl rounded-3xl border border-white/15 bg-white/10 p-8 text-center shadow-2xl backdrop-blur">
        <div className="mx-auto mb-5 inline-flex rounded-full bg-emerald-400 px-5 py-2 font-black text-slate-950">
          Niveau {niveau}
        </div>

        <h1 className="text-4xl font-black md:text-6xl">
          Défi calcul rapide
        </h1>

        <p className="mt-4 text-lg text-white/75">
          La page du défi est créée. Prochaine étape : afficher les 7 questions,
          le chrono et le score final.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/calcul-rapide"
            className="rounded-full bg-white px-6 py-3 font-bold text-slate-950"
          >
            Retour
          </Link>

          <button
            type="button"
            className="rounded-full bg-emerald-400 px-6 py-3 font-black text-slate-950"
          >
            Démarrer bientôt
          </button>
        </div>
      </section>
    </main>
  );
}