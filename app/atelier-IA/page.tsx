"use client";

import Link from "next/link";

export default function AtelierIAPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">

      {/* HERO */}
      <section className="border-b border-slate-800 bg-gradient-to-b from-slate-900/80 to-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-12 space-y-6">

          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-4 py-1 text-xs font-semibold text-emerald-200">
            🧪 atelier-IA — cadre pédagogique
          </span>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
            atelier-IA
          </h1>

          <p className="text-lg font-semibold text-emerald-300">
            Crée ton prompt maintenant.
            <br />
            Garde la main sur ta réflexion.
          </p>

          <p className="max-w-3xl text-slate-300 leading-relaxed">
            L’atelier-IA est un espace pédagogique encadré où les élèves
            apprennent à utiliser l’intelligence artificielle de façon
            responsable : comprendre, questionner, vérifier, corriger.
            <br />
            <b>Ici, l’IA aide à réfléchir — elle ne fait pas à la place.</b>
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/atelier-IA/vision"
              className="rounded-lg bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-slate-950 hover:bg-emerald-400"
            >
              👀 Découvrir l’atelier-IA
            </Link>

            <Link
              href="/espace-eleves"
              className="rounded-lg border border-slate-600 bg-slate-900 px-5 py-2.5 text-sm font-semibold text-slate-50 hover:bg-slate-800"
            >
              🎒 Tester côté élèves
            </Link>
          </div>
        </div>
      </section>

      {/* À QUOI ÇA SERT */}
      <section className="border-b border-slate-800 bg-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-10 grid gap-6 md:grid-cols-3">

          {[
            {
              title: "Apprendre à poser une bonne question",
              text: "Les élèves découvrent que la qualité d’un résultat dépend d’abord de la qualité de la question posée.",
              icon: "❓",
            },
            {
              title: "Développer l’esprit critique",
              text: "Comparer, vérifier, corriger : l’IA devient un support de réflexion, pas une vérité automatique.",
              icon: "🧠",
            },
            {
              title: "Produire des traces scolaires",
              text: "Prompt, réponse de l’IA, corrections personnelles et analyse critique sont conservées.",
              icon: "📝",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4"
            >
              <p className="text-2xl">{item.icon}</p>
              <p className="mt-2 font-semibold text-slate-100">{item.title}</p>
              <p className="mt-1 text-xs text-slate-300 leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* POUR QUI */}
      <section className="border-b border-slate-800 bg-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-8 space-y-4">
          <h2 className="text-xl font-semibold text-slate-100">
            Pour qui est l’atelier-IA ?
          </h2>

          <div className="grid gap-4 md:grid-cols-3 text-sm">
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
              🎓 <b>Élèves</b>
              <p className="mt-1 text-slate-300 text-xs">
                Comprendre, réviser, créer, sans tricher ni copier aveuglément.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
              🧑‍🏫 <b>Professeurs</b>
              <p className="mt-1 text-slate-300 text-xs">
                Un cadre clair pour autoriser l’IA sans perdre le sens pédagogique.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
              🏫 <b>Établissement</b>
              <p className="mt-1 text-slate-300 text-xs">
                Un levier motivation, compétences numériques et climat scolaire.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="bg-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-10 text-center space-y-4">
          <p className="text-slate-300">
            L’atelier-IA n’est pas un outil magique.
            <br />
            C’est un <b>espace d’apprentissage</b>.
          </p>

          <Link
            href="/atelier-IA/vision"
            className="inline-flex items-center gap-2 rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-5 py-2.5 text-sm font-semibold text-emerald-200 hover:bg-emerald-500/20"
          >
            Découvrir la vision pédagogique →
          </Link>
        </div>
      </section>
    </main>
  );
}

