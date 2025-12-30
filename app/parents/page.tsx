// app/parents/page.tsx
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Parents — EleveAI",
  description:
    "Comprendre l’IA à l’école et accompagner son enfant avec un cadre clair : progrès, méthode, confiance.",
};

export default function ParentsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <section className="mx-auto max-w-5xl px-4 py-12">
        <h1 className="text-3xl font-bold">Parents</h1>
        <p className="mt-3 text-slate-300">
          EleveAI est conçu pour rassurer : l’IA est autorisée, mais encadrée.
          Objectif : une progression réelle grâce à la méthode, la justification et la correction.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-5">
            <h2 className="text-lg font-semibold">Un cadre lisible</h2>
            <p className="mt-2 text-sm text-slate-300">
              Des règles simples pour éviter le “tout fait” : traces, reformulation, analyse.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-5">
            <h2 className="text-lg font-semibold">Accompagner sans faire à la place</h2>
            <p className="mt-2 text-sm text-slate-300">
              L’outil aide l’élève à comprendre, s’exercer et se corriger — sans remplacer l’effort.
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/espace-parents"
            className="inline-flex items-center rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-200 hover:bg-emerald-500/15"
          >
            Accéder au générateur Parents
          </Link>
          <Link
            href="/faq"
            className="inline-flex items-center rounded-xl border border-slate-700 px-4 py-2 text-sm text-slate-200 hover:bg-slate-900"
          >
            Lire la FAQ
          </Link>
        </div>
      </section>
    </main>
  );
}
