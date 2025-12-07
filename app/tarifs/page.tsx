"use client";

import Link from "next/link";

export default function TarifsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="max-w-5xl mx-auto px-4 py-10 sm:py-16 space-y-10">

        {/* Header */}
        <header className="space-y-4 text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-emerald-300/80">
            EleveAI • Tarifs
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold">
            Des offres simples pour toute la communauté scolaire
          </h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
            Élèves, parents, professeurs et établissements accèdent à la même
            plateforme, avec des plafonds de requêtes IA pensés pour un usage
            responsable et maîtrisé.
          </p>
        </header>

        {/* Badges contexte */}
        <div className="flex flex-wrap gap-2 justify-center text-xs sm:text-sm">
          <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/40">
            Sans engagement
          </span>
          <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-200 border border-slate-700">
            Plafonds de requêtes inclus
          </span>
          <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-200 border border-slate-700">
            Adapté aux profils DYS
          </span>
        </div>

        {/* Cartes principales */}
        <section className="grid gap-6 md:grid-cols-3">

          {/* Élèves */}
          <article className="flex flex-col rounded-2xl border border-slate-800 bg-slate-900/70 p-6 sm:p-7 shadow-lg">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-emerald-300">
                  Élèves
                </h2>
                <p className="text-xs text-slate-400 mt-1">Pour comprendre et réviser.</p>
              </div>
              <span className="text-[11px] px-2 py-1 rounded-full bg-slate-800 text-slate-200 border border-slate-700">
                Compte élève
              </span>
            </div>

            <div className="flex items-baseline gap-1 mb-4">
              <p className="text-3xl sm:text-4xl font-bold">5,99 €</p>
              <span className="text-sm text-slate-400">/ mois</span>
            </div>

            <p className="text-sm text-slate-400 mb-4">
              <strong className="text-slate-100">150 requêtes IA / mois</strong>  
              pour l’aide aux devoirs et les révisions régulières.
            </p>

            <ul className="space-y-2 text-sm text-slate-200 flex-1">
              <li>✔ Aide aux devoirs</li>
              <li>✔ Explications adaptées au niveau</li>
              <li>✔ Mode DYS (mise en forme et vocabulaire)</li>
              <li>✔ Historique des demandes</li>
            </ul>

            <button className="mt-6 w-full rounded-xl bg-emerald-600 py-3 text-sm font-semibold text-white hover:bg-emerald-500 transition">
              Créer un compte élève
            </button>
          </article>

          {/* Parents */}
          <article className="flex flex-col rounded-2xl border border-slate-800 bg-slate-900/70 p-6 sm:p-7 shadow-lg">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-emerald-300">
                  Parents
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Pour accompagner son enfant efficacement.
                </p>
              </div>
              <span className="text-[11px] px-2 py-1 rounded-full bg-slate-800 text-slate-200 border border-slate-700">
                Compte parent
              </span>
            </div>

            <div className="flex items-baseline gap-1">
              <p className="text-3xl sm:text-4xl font-bold">9,99 €</p>
              <span className="text-sm text-slate-400">/ mois</span>
            </div>

            <p className="text-xs text-slate-400 mb-4">
              <strong className="text-emerald-300">5,99 € / mois</strong> si un enfant est abonné en Élève.
            </p>

            <p className="text-sm text-slate-400 mb-4">
              <strong className="text-slate-100">250 requêtes IA / mois</strong>,  
              pour suivre un ou plusieurs enfants.
            </p>

            <ul className="space-y-2 text-sm text-slate-200 flex-1">
              <li>✔ Explications adaptées au profil de l'enfant</li>
              <li>✔ Exercices personnalisés</li>
              <li>✔ Aide à décoder les consignes scolaires</li>
              <li>✔ Espace &quot;Vous qui connaissez votre marmaille&quot;</li>
            </ul>

            <button className="mt-6 w-full rounded-xl bg-emerald-600 py-3 text-sm font-semibold text-white hover:bg-emerald-500 transition">
              Créer un compte parent
            </button>
          </article>

          {/* Profs */}
          <article className="relative flex flex-col rounded-2xl border border-emerald-500/60 bg-slate-900 p-6 sm:p-7 shadow-xl md:-mt-4">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-emerald-500 text-slate-950 text-xs font-semibold shadow">
              Le plus choisi
            </div>

            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-emerald-300">
                  Profs
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Pour gagner du temps et différencier facilement.
                </p>
              </div>
              <span className="text-[11px] px-2 py-1 rounded-full bg-slate-800 text-emerald-200 border border-emerald-500/60">
                IA pédagogique
              </span>
            </div>

            <div className="flex items-baseline gap-1">
              <p className="text-3xl sm:text-4xl font-bold">9,99 €</p>
              <span className="text-sm text-slate-400">/ mois</span>
            </div>

            <p className="text-xs text-slate-400 mb-4">
              ou <strong className="text-slate-100">79 € / an</strong> (≈ 2 mois offerts)
            </p>

            <p className="text-sm text-slate-400 mb-4">
              <strong className="text-slate-100">300 requêtes IA / mois</strong>,  
              pour un usage régulier.
            </p>

            <ul className="space-y-2 text-sm text-slate-200 flex-1">
              <li>✔ Générateur de cours, séquences et évaluations</li>
              <li>✔ Adaptations DYS avancées</li>
              <li>✔ Export PDF</li>
              <li>✔ Historique & duplication rapide</li>
            </ul>

            <button className="mt-6 w-full rounded-xl bg-emerald-600 py-3 text-sm font-semibold text-white hover:bg-emerald-500 transition">
              S'abonner en tant que prof
            </button>
          </article>
        </section>

        {/* Offre pilotes */}
        <section className="bg-slate-900/70 border border-emerald-500/40 rounded-2xl p-6 sm:p-7 mt-8 shadow-lg">
          <h3 className="text-xl sm:text-2xl font-semibold text-emerald-300 mb-4 text-center">
            ⭐ Offre Pilote – Collèges & Lycées
          </h3>

          <p className="text-slate-300 text-sm mb-4 text-center">
            Testez EleveAI gratuitement dans votre établissement pendant 8 semaines.
            Aucun engagement, aucun paiement, un simple code établissement suffit.
          </p>

          <ul className="text-slate-200 text-sm space-y-2 mb-6 max-w-xl mx-auto">
            <li>✔ Accès complet pour élèves, parents, profs et personnels</li>
            <li>✔ Plafonds de requêtes élargis</li>
            <li>✔ Accompagnement au lancement</li>
            <li>✔ Tableau de bord de suivi</li>
            <li>✔ Rapport final d’usage</li>
          </ul>

          <div className="flex justify-center">
            <Link
              href="/contact-etablissement"
              className="px-6 py-3 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-500 transition"
            >
              Devenir établissement pilote
            </Link>
          </div>
        </section>

        {/* Offres Établissements */}
        <section className="space-y-4 mt-4">
          <h2 className="text-xl sm:text-2xl font-semibold text-center text-emerald-300">
            Offres pour collèges et lycées
          </h2>

          <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 sm:p-7 shadow-lg space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">

              {/* Forfait simple */}
              <div className="rounded-xl border border-slate-700 bg-slate-950/50 p-4 space-y-2">
                <p className="text-sm font-semibold text-slate-100">Forfait simple</p>
                <p className="text-2xl font-bold">
                  149 €<span className="text-sm text-slate-400"> / mois</span>
                </p>
                <p className="text-xs text-slate-400">
                  <strong className="text-slate-100">10 000 requêtes IA / mois</strong>
                  &nbsp;pour l’ensemble de la communauté éducative.
                </p>
              </div>

              {/* Formule mixte */}
              <div className="rounded-xl border border-slate-700 bg-slate-950/50 p-4 space-y-2">
                <p className="text-sm font-semibold text-slate-100">Formule mixte</p>
                <p className="text-base text-slate-200">
                  99 € / mois + <strong>5 € / élève / an</strong> et <strong>5 € / prof / an</strong>
                </p>
                <p className="text-xs text-slate-400">
                  Plafond indicatif :
                  <strong className="text-emerald-300"> 25 × élèves + 120 × profs</strong> requêtes IA / mois.
                </p>
              </div>
            </div>
          </article>
        </section>

      </div>
    </main>
  );
}

