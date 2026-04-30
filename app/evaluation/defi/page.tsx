import { Suspense } from "react";
import EvaluationDefiClient from "./EvaluationDefiClient";

export default function EvaluationDefiPage() {
  return (
    <Suspense fallback={<EvaluationDefiFallback />}>
      <EvaluationDefiClient />
    </Suspense>
  );
}

function EvaluationDefiFallback() {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-white">
      <section className="mx-auto max-w-4xl">
        <div className="rounded-3xl border border-emerald-300/30 bg-white/10 p-6 shadow-2xl backdrop-blur">
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-300">
            EleveAI · Évaluations
          </p>
          <h1 className="mt-2 text-3xl font-black">
            Chargement de l’évaluation…
          </h1>
        </div>
      </section>
    </main>
  );
}