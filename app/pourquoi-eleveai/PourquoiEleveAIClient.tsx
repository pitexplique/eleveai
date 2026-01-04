"use client";

import Link from "next/link";
import Script from "next/script";

export default function PourquoiEleveAIClient() {
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "EleveAI",
    url: "https://eleveai.fr",
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: "contact@eleveai.fr",
        availableLanguage: ["fr"],
      },
    ],
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <Script
        id="org-eleveai"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />

      {/* HERO */}
      <section className="border-b border-slate-800 bg-gradient-to-b from-slate-900/60 to-slate-950">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:py-16 space-y-8">
          <div className="text-sm text-slate-400 flex items-center gap-2">
            <Link href="/" className="hover:text-emerald-300 transition">
              Accueil
            </Link>
            <span className="text-slate-600">/</span>
            <span className="text-slate-200">Pourquoi EleveAI</span>
          </div>

          <header className="space-y-4">
            <p className="inline-flex items-center rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-emerald-300">
              EleveAI · Marque éducative · IA encadrée
            </p>

            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Pourquoi EleveAI ?
            </h1>

            <p className="max-w-2xl text-slate-300">
              Le nom{" "}
              <span className="font-semibold text-slate-100">EleveAI</span>{" "}
              ressemble à “élève” — et c’est volontaire : notre objectif n’est pas
              de faire à la place, mais d’aider à{" "}
              <span className="font-semibold">apprendre</span>,{" "}
              <span className="font-semibold">comprendre</span> et{" "}
              <span className="font-semibold">devenir autonome</span>.
            </p>

            <div className="rounded-2xl border border-emerald-500/40 bg-slate-900/60 p-4 sm:p-5">
              <p className="text-sm font-semibold text-emerald-300">En une phrase</p>
              <p className="mt-2 text-sm text-slate-200">
                EleveAI est une IA pédagogique{" "}
                <span className="font-semibold">encadrée</span> — conçue pour
                professeurs, parents et établissements — afin de favoriser la
                méthode et la compréhension, pas la triche.
              </p>
            </div>
          </header>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-4xl px-4 py-10 sm:py-12 space-y-8">
        {/* Pourquoi (fond) */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 sm:p-6 space-y-3">
          <h2 className="text-xl font-semibold text-slate-50">
            Le problème : l’IA existe déjà… souvent sans cadre
          </h2>
          <p className="text-sm text-slate-300">
            Les élèves utilisent l’IA. Sans règles, cela mène facilement à la copie,
            à la perte de méthode et à une fausse impression de réussite.
            EleveAI part de l’idée inverse :{" "}
            <span className="font-semibold text-slate-100">
              l’IA doit obliger à réfléchir
            </span>
            .
          </p>
        </div>

        {/* Ce qui rend EleveAI différente */}
        <div className="rounded-2xl border border-emerald-500/40 bg-slate-900/60 p-5 sm:p-6 space-y-4">
          <h2 className="text-xl font-semibold text-emerald-300">
            Ce qui rend EleveAI différente
          </h2>

          <div className="grid gap-3 sm:grid-cols-2 text-sm">
            {[
              ["Anti-triche par design", "Pas de production prête à rendre : méthode, justification, correction."],
              ["Transparence", "L’élève apprend à montrer sa démarche et ses choix."],
              ["Le professeur reste la référence", "L’IA assiste, ne remplace pas le métier."],
              ["Accessible", "Reformulation, pas à pas, supports simples et DYS-friendly."],
            ].map(([t, d]) => (
              <div
                key={t}
                className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4"
              >
                <p className="font-semibold text-slate-50">{t}</p>
                <p className="mt-1 text-slate-300">{d}</p>
              </div>
            ))}
          </div>

          <div className="text-sm text-slate-400">
            Pour le cadre complet :{" "}
            <Link href="/charte" className="text-emerald-300 font-semibold hover:text-emerald-200">
              lire la charte
            </Link>
            {" · "}
            <Link href="/faq" className="text-emerald-300 font-semibold hover:text-emerald-200">
              consulter la FAQ
            </Link>
          </div>
        </div>

        {/* Conversion : 3 publics */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 sm:p-6 space-y-4">
          <h2 className="text-xl font-semibold text-slate-50">
            Choisissez votre accès
          </h2>

          <div className="grid gap-4 sm:grid-cols-3">
            {/* Profs */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4">
              <p className="font-semibold text-emerald-300">Professeurs</p>
              <p className="mt-2 text-sm text-slate-300">
                Préparer, différencier, remédier, encadrer l’IA en classe.
              </p>
              <div className="mt-3 flex flex-col gap-2">
                <Link
                  href="/espace-profs"
                  className="rounded-xl border border-emerald-500/60 bg-emerald-500/10 px-3 py-2 text-sm font-semibold text-emerald-200 hover:bg-emerald-500/20 transition text-center"
                >
                  Accès prof
                </Link>
                <Link
                  href="/tarifs"
                  className="text-xs text-slate-400 hover:text-slate-200 text-center"
                >
                  Voir l’abonnement prof
                </Link>
              </div>
            </div>

            {/* Parents */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4">
              <p className="font-semibold text-emerald-300">Parents</p>
              <p className="mt-2 text-sm text-slate-300">
                Aider sans faire à la place. Suivre la méthode et la progression.
              </p>
              <div className="mt-3 flex flex-col gap-2">
                <Link
                  href="/espace-parents"
                  className="rounded-xl border border-emerald-500/60 bg-emerald-500/10 px-3 py-2 text-sm font-semibold text-emerald-200 hover:bg-emerald-500/20 transition text-center"
                >
                  Accès parent
                </Link>
                <Link
                  href="/tarifs"
                  className="text-xs text-slate-400 hover:text-slate-200 text-center"
                >
                  Voir l’abonnement parent
                </Link>
              </div>
            </div>

            {/* Établissements */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4">
              <p className="font-semibold text-emerald-300">Établissements</p>
              <p className="mt-2 text-sm text-slate-300">
                Pilote encadré, charte, gouvernance, accompagnement.
              </p>
              <div className="mt-3 flex flex-col gap-2">
                <Link
                  href="/offre-pilote"
                  className="rounded-xl border border-sky-500 bg-sky-500/10 px-3 py-2 text-sm font-semibold text-sky-100 hover:bg-sky-500/20 transition text-center"
                >
                  Offre pilote
                </Link>
                <Link
                  href="/contact"
                  className="text-xs text-slate-400 hover:text-slate-200 text-center"
                >
                  Demander un devis
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Preuve & confiance */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 sm:p-6 space-y-3">
          <h2 className="text-xl font-semibold text-slate-50">
            Une marque, pas un gadget
          </h2>
          <p className="text-sm text-slate-300">
            EleveAI met l’humain au centre : le professeur garde la main, l’élève apprend
            par étapes, et les familles sont rassurées par un cadre clair.
          </p>
          <div className="text-sm text-slate-400">
            En savoir plus :{" "}
            <Link href="/qui-sommes-nous" className="text-emerald-300 font-semibold hover:text-emerald-200">
              Qui sommes-nous
            </Link>
            {" · "}
            <Link href="/faq" className="text-emerald-300 font-semibold hover:text-emerald-200">
              FAQ
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
