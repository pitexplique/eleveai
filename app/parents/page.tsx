// app/parents/page.tsx
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Parents — EleveAI",
  description:
    "EleveAI rassure : l’IA est encadrée. Réponse IA + avis critique + amélioration : on apprend, on ne triche pas.",
};

export default function ParentsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <section className="mx-auto max-w-5xl px-4 py-12">
        <p className="text-xs uppercase tracking-wide text-slate-400">Pour les parents</p>

        <h1 className="mt-2 text-3xl font-bold">Parents : une IA encadrée, rassurante et pédagogique</h1>

        <p className="mt-4 text-slate-300">
          EleveAI est conçu pour éviter le “tout fait”. Dans l’espace Parents aussi, on ne se contente pas
          d’une réponse IA : on doit donner un avis critique et proposer une amélioration.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-5">
            <h2 className="text-lg font-semibold">1) Vous expliquez la situation</h2>
            <p className="mt-2 text-sm text-slate-300">
              Devoir, niveau, difficultés, objectifs : comprendre sans faire à la place.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-5">
            <h2 className="text-lg font-semibold">2) L’IA propose une aide</h2>
            <p className="mt-2 text-sm text-slate-300">
              Méthode, questions guidées, conseils de révision, plan d’accompagnement.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-5">
            <h2 className="text-lg font-semibold">3) Vous donnez votre avis</h2>
            <p className="mt-2 text-sm text-slate-300">
              Vous jugez : ce qui est adapté / trop complexe / à reformuler + vos ajustements.
            </p>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/20 p-5">
          <h3 className="text-base font-semibold">La règle EleveAI (partout)</h3>
          <p className="mt-2 text-sm text-slate-300">
            Après une réponse IA, l’utilisateur écrit un avis :
            <span className="block mt-2">
              ✅ ce qui est correct • ⚠️ ce qui est discutable • ❌ ce qui est faux • ✍️ ce que je garde / change
            </span>
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/espace-parents"
            className="inline-flex items-center rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-200 hover:bg-emerald-500/15"
          >
            Accéder à l’espace Parents (générateur)
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
