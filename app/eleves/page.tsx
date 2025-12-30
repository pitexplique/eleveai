// app/eleves/page.tsx
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Élèves — EleveAI",
  description:
    "EleveAI aide les élèves à progresser avec une IA encadrée : réponse IA + avis critique + amélioration personnelle.",
};

export default function ElevesPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <section className="mx-auto max-w-5xl px-4 py-12">
        <p className="text-xs uppercase tracking-wide text-slate-400">Pour les élèves</p>

        <h1 className="mt-2 text-3xl font-bold">Élèves : apprendre avec l’IA… en gardant la main</h1>

        <p className="mt-4 text-slate-300">
          Ici, l’IA ne “fait pas à ta place”. Elle t’aide à comprendre. Ensuite, tu dois donner ton avis
          sur la réponse : c’est ça qui te fait progresser.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-5">
            <h2 className="text-lg font-semibold">1) Tu poses la question</h2>
            <p className="mt-2 text-sm text-slate-300">
              Tu décris l’exercice, ce que tu as tenté, et ce que tu veux comprendre.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-5">
            <h2 className="text-lg font-semibold">2) L’IA répond</h2>
            <p className="mt-2 text-sm text-slate-300">
              Elle explique, propose une méthode, et peut te demander de reformuler.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-5">
            <h2 className="text-lg font-semibold">3) Tu donnes ton avis</h2>
            <p className="mt-2 text-sm text-slate-300">
              Tu écris : ✅ juste / ⚠️ douteux / ❌ faux + ✍️ ta correction ou ta version.
            </p>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/20 p-5">
          <h3 className="text-base font-semibold">Pourquoi “donner ton avis” change tout</h3>
          <p className="mt-2 text-sm text-slate-300">
            Parce que tu apprends à vérifier, justifier, corriger. Tu ne copies pas : tu comprends.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/espace-eleves"
            className="inline-flex items-center rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-200 hover:bg-emerald-500/15"
          >
            Accéder à l’espace Élèves (générateur)
          </Link>
          <Link
            href="/atelier-IA/vision"
            className="inline-flex items-center rounded-xl border border-slate-700 px-4 py-2 text-sm text-slate-200 hover:bg-slate-900"
          >
            Comprendre la pédagogie
          </Link>
        </div>
      </section>
    </main>
  );
}
