// app/profs/page.tsx
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profs — EleveAI",
  description:
    "EleveAI aide les enseignants à créer des consignes IA (prompts) responsables, dans un cadre anti-triche et conforme au rôle de l’enseignant.",
};

export default function ProfsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <section className="mx-auto max-w-5xl px-4 py-12">
        <h1 className="text-3xl font-bold">Profs</h1>
        <p className="mt-3 text-slate-300">
          EleveAI vous aide à rédiger des consignes IA claires et pédagogiques (prompts), avec
          un cadre anti-triche : exigence de justification, de traces et de correction.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-5">
            <h2 className="text-lg font-semibold">Générateur de prompts</h2>
            <p className="mt-2 text-sm text-slate-300">
              Génère une consigne structurée, adaptée à une classe, une matière et un objectif.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-5">
            <h2 className="text-lg font-semibold">Cadre “IA encadrée”</h2>
            <p className="mt-2 text-sm text-slate-300">
              L’IA accompagne l’élève sans remplacer l’effort : reformulation, méthode, analyse critique.
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/espace-profs"
            className="inline-flex items-center rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-200 hover:bg-emerald-500/15"
          >
            Accéder au générateur Profs
          </Link>
          <Link
            href="/atelier-IA"
            className="inline-flex items-center rounded-xl border border-slate-700 px-4 py-2 text-sm text-slate-200 hover:bg-slate-900"
          >
            Découvrir l’Atelier-IA
          </Link>
        </div>
      </section>
    </main>
  );
}
