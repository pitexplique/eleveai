"use client";

import Link from "next/link";

export default function AtelierIAVisionPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">

      <section className="border-b border-slate-800 bg-slate-950">
        <div className="mx-auto max-w-4xl px-4 py-12 space-y-6">

          <Link
            href="/atelier-IA"
            className="text-xs text-emerald-300 hover:underline"
          >
            ← Retour à l’Atelier-IA
          </Link>

          <h1 className="text-2xl sm:text-3xl font-extrabold">
            Pourquoi un Atelier-IA au collège ?
          </h1>

          <p className="text-lg font-semibold text-emerald-300">
            Crée ton prompt maintenant.
            <br />
            Garde la main sur ta réflexion.
          </p>

          <p className="text-slate-300 leading-relaxed">
            Les élèves utilisent déjà l’IA.
            <br />
            L’Atelier-IA ne cherche pas à interdire, mais à
            <b> apprendre à bien l’utiliser</b>.
          </p>

          <div className="space-y-4 text-sm text-slate-300">
            <p>
              Dans l’Atelier-IA, l’élève :
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>apprend à formuler une question claire</li>
              <li>analyse la réponse produite par l’IA</li>
              <li>repère les erreurs ou approximations</li>
              <li>corrige avec ses connaissances</li>
              <li>explique son raisonnement</li>
            </ul>

            <p>
              L’IA devient un <b>support de réflexion</b>, pas une béquille.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-xs text-slate-300">
            🎯 Objectifs pédagogiques :
            <ul className="mt-2 list-disc list-inside space-y-1">
              <li>autonomie</li>
              <li>esprit critique</li>
              <li>méthodologie</li>
              <li>responsabilité numérique</li>
            </ul>
          </div>

          <div className="pt-4 flex gap-3">
            <Link
              href="/espace-eleves"
              className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-400"
            >
              🎒 Tester côté élèves
            </Link>

            <Link
              href="/contact"
              className="rounded-lg border border-slate-600 bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-50 hover:bg-slate-800"
            >
              🏫 Présenter au collège
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
