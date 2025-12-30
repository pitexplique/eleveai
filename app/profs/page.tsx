// app/profs/page.tsx
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profs — EleveAI",
  description:
    "EleveAI aide les professeurs à utiliser l’IA de façon responsable : consigne, réponse IA, puis avis critique et amélioration.",
};

export default function ProfsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <section className="mx-auto max-w-5xl px-4 py-12">
        <p className="text-xs uppercase tracking-wide text-slate-400">Pour les enseignants</p>

        <h1 className="mt-2 text-3xl font-bold">Profs : une IA utile, mais jamais “à la place”</h1>

        <p className="mt-4 text-slate-300">
          EleveAI repose sur une règle simple : <span className="text-slate-100 font-semibold">on ne valide jamais une réponse IA sans avis critique</span>.
          Dans l’espace Profs aussi, vous testez, jugez et améliorez la proposition.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-5">
            <h2 className="text-lg font-semibold">1) Vous formulez une consigne</h2>
            <p className="mt-2 text-sm text-slate-300">
              Objectif, niveau, contraintes, attendus : une consigne claire et réutilisable.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-5">
            <h2 className="text-lg font-semibold">2) L’IA propose</h2>
            <p className="mt-2 text-sm text-slate-300">
              Proposition de consigne, plan, critères de réussite, suggestions d’activité.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-5">
            <h2 className="text-lg font-semibold">3) Vous donnez votre avis</h2>
            <p className="mt-2 text-sm text-slate-300">
              Vous validez, corrigez, nuancez : “ce qui est bon / ce qui manque / ce que je change”.
            </p>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/20 p-5">
          <h3 className="text-base font-semibold">Le cœur EleveAI (dans tous les espaces)</h3>
          <p className="mt-2 text-sm text-slate-300">
            À chaque utilisation, l’utilisateur doit écrire un <span className="text-slate-100 font-semibold">avis critique</span> :
            <span className="block mt-2">
              ✅ ce qui est correct • ⚠️ ce qui est discutable • ❌ ce qui est faux • ✍️ ma version améliorée
            </span>
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/espace-profs"
            className="inline-flex items-center rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-200 hover:bg-emerald-500/15"
          >
            Accéder à l’espace Profs (générateur)
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

