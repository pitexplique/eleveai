// app/eleves/page.tsx
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Élèves — EleveAI",
  description:
    "S’entraîner avec une IA encadrée : comprendre, justifier, corriger et progresser sans tricher.",
};

export default function ElevesPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <section className="mx-auto max-w-5xl px-4 py-12">
        <h1 className="text-3xl font-bold">Élèves</h1>
        <p className="mt-3 text-slate-300">
          EleveAI t’aide à progresser avec une IA encadrée : on apprend en expliquant,
          en justifiant et en corrigeant — pas en copiant-collant.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-5">
            <h2 className="text-lg font-semibold">Progresser vraiment</h2>
            <p className="mt-2 text-sm text-slate-300">
              L’IA te guide avec des questions, te fait reformuler et vérifier.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-5">
            <h2 className="text-lg font-semibold">Anti-triche</h2>
            <p className="mt-2 text-sm text-slate-300">
              Tu gardes des traces : prompt, réponse, correction personnelle et analyse.
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/espace-eleves"
            className="inline-flex items-center rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-200 hover:bg-emerald-500/15"
          >
            Accéder au générateur Élèves
          </Link>
          <Link
            href="/atelier-IA/programme"
            className="inline-flex items-center rounded-xl border border-slate-700 px-4 py-2 text-sm text-slate-200 hover:bg-slate-900"
          >
            Voir le programme
          </Link>
        </div>
      </section>
    </main>
  );
}
