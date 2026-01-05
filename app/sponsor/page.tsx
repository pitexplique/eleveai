// app/sponsor/page.tsx
"use client";

import Link from "next/link";

const MOOJO_URL = "https://app.mymoojo.com/project/eleveai"; // <-- remplace quand tu auras le bon lien EleveAI

export default function SponsorPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      {/* HERO */}
      <section className="border-b border-slate-800 bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900/40">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:py-16 space-y-6">
          {/* Fil d’Ariane */}
          <div className="text-xs text-slate-500 flex items-center gap-2">
            <Link href="/" className="hover:text-sky-200 transition">
              Accueil
            </Link>
            <span>/</span>
            <span>Sponsor</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold">Soutenir EleveAI</h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-3xl">
            EleveAI est un projet éducatif indépendant : une IA{" "}
            <strong>autorisée mais encadrée</strong>, pensée pour aider les élèves à
            apprendre <strong>sans tricher</strong> et pour aider les professeurs à cadrer l’usage.
          </p>

          <div className="flex flex-wrap gap-3 text-xs sm:text-sm">
            <span className="inline-flex items-center gap-2 rounded-full border border-sky-600/60 bg-sky-500/10 px-3 py-1 text-sky-100">
              🤝 Soutien volontaire
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1 text-slate-200">
              🛡️ Anti-triche + traces
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1 text-slate-200">
              🔒 RGPD & sobriété
            </span>
          </div>

          {/* CTA */}
          <div className="pt-4 flex flex-wrap gap-3">
            <a
              href={MOOJO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-slate-950 hover:bg-sky-400 transition"
            >
              🤝 Soutenir EleveAI
            </a>

            <Link
              href="/tarifs"
              className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-950/40 px-6 py-3 text-sm font-semibold text-slate-100 hover:bg-slate-900 transition"
            >
              Voir les tarifs
            </Link>
          </div>

          <p className="text-[11px] text-slate-400 max-w-3xl">
            Le soutien n’est pas nécessaire pour utiliser EleveAI : c’est un geste volontaire pour
            accélérer le développement (contenus, sécurité, maintenance).
          </p>
        </div>
      </section>

      {/* CONTENU */}
      <section className="mx-auto max-w-5xl px-4 py-10 sm:py-12 space-y-8">
        {/* À quoi sert le soutien */}
        <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-6">
          <h2 className="text-lg font-semibold text-slate-50">À quoi sert ton soutien ?</h2>
          <p className="mt-2 text-sm text-slate-300 max-w-3xl">
            Ton soutien finance concrètement :
          </p>

          <ul className="mt-4 grid gap-3 sm:grid-cols-2 text-sm text-slate-200">
            <li className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
              ✅ Hébergement, maintenance, sécurité
            </li>
            <li className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
              ✅ Développement des espaces élèves / profs / parents
            </li>
            <li className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
              ✅ Nouveaux presets & parcours “IA-friendly”
            </li>
            <li className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
              ✅ Amélioration du cadre anti-triche + transparence
            </li>
          </ul>
        </div>

        {/* Transparence */}
        <div className="rounded-2xl border border-sky-600/40 bg-sky-500/10 p-6">
          <h2 className="text-lg font-semibold text-sky-100">Transparence</h2>
          <p className="mt-2 text-sm text-slate-200 max-w-3xl">
            EleveAI suit une approche simple : pas de pub intrusive, pas de revente de données.
            Le soutien ne donne aucun droit sur les contenus pédagogiques ni sur les décisions éducatives.
          </p>
          <p className="mt-3 text-xs text-sky-100/90">
            Objectif : une IA utile, humaine et rassurante, au service réel de l’école.
          </p>
        </div>

        {/* Merci */}
        <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-6">
          <h2 className="text-lg font-semibold text-slate-50">Merci ❤️</h2>
          <p className="mt-2 text-sm text-slate-300 max-w-3xl">
            Chaque soutien compte. Même un petit montant : ça permet de garder EleveAI simple,
            indépendant, et aligné avec le cadre scolaire.
          </p>

          <div className="mt-4">
            <a
              href={MOOJO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-slate-950 hover:bg-sky-400 transition"
            >
              🤝 Soutenir EleveAI
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
