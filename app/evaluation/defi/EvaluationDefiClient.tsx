"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function EvaluationDefiClient() {
  const searchParams = useSearchParams();

  const classe = searchParams.get("classe") ?? "6e";
  const type = searchParams.get("type") ?? "diagnostique";

  const title =
    type === "bilan"
      ? "Évaluation de fin d’année"
      : "Évaluation de début d’année";

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-white">
      <section className="mx-auto max-w-4xl">
        <Link
          href="/evaluation"
          className="mb-6 inline-flex rounded-full border border-white/20 px-4 py-2 text-sm text-slate-200 hover:bg-white/10"
        >
          ← Retour aux évaluations
        </Link>

        <div className="rounded-3xl border border-emerald-300/30 bg-white/10 p-6 shadow-2xl backdrop-blur">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-emerald-300">
            {classe} · maths
          </p>

          <h1 className="text-3xl font-black md:text-5xl">{title}</h1>

          <p className="mt-4 text-slate-200">
            Ici, on branchera bientôt les questions depuis{" "}
            <code className="rounded bg-black/30 px-1">
              lib/evaluation/data
            </code>
            .
          </p>

          <div className="mt-8 rounded-2xl bg-white p-5 text-slate-900">
            <p className="text-sm font-bold text-emerald-700">
              Question exemple
            </p>

            <h2 className="mt-2 text-2xl font-black">Calcule : 7 × 8</h2>

            <input
              className="mt-5 w-full rounded-xl border border-slate-300 px-4 py-3 text-lg outline-none focus:border-emerald-500"
              placeholder="Ta réponse..."
            />

            <button className="mt-5 rounded-xl bg-emerald-500 px-5 py-3 font-bold text-white hover:bg-emerald-600">
              Valider
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}