"use client";

import Link from "next/link";

export default function ManifesteClient() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      {/* HERO */}
      <section className="border-b border-slate-800 bg-gradient-to-b from-slate-900/60 to-slate-950">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:py-16 space-y-8">
          {/* Breadcrumb */}
          <div className="text-sm text-slate-400 flex items-center gap-2">
            <Link href="/" className="hover:text-emerald-300 transition">
              Accueil
            </Link>
            <span className="text-slate-600">/</span>
            <span className="text-slate-200">Manifeste EleveAI</span>
          </div>

          {/* Header */}
          <header className="space-y-4">
            <p className="inline-flex items-center rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-emerald-300">
              EleveAI · Manifeste pédagogique · Cadre d’usage de l’IA
            </p>

            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-50">
              Manifeste EleveAI — Une IA pour apprendre, pas pour tricher
            </h1>

            <p className="max-w-2xl text-slate-300">
              EleveAI est un projet éducatif construit sur une idée simple :
              <span className="font-semibold">{" "}
                l’IA est utile si elle fait réfléchir
              </span>
              . Elle doit guider l’élève, aider les professeurs, rassurer les familles
              et respecter le rôle de l’école.
            </p>

            {/* Mini “à retenir” */}
            <div className="rounded-2xl border border-emerald-500/40 bg-slate-900/60 p-4 sm:p-5">
              <p className="text-sm font-semibold text-emerald-300">À retenir</p>
              <ul className="mt-2 text-sm text-slate-200 space-y-1">
                <li>• EleveAI guide, ne fait pas à la place.</li>
                <li>• L’élève doit essayer, se tromper, comprendre, recommencer.</li>
                <li>• Le professeur reste la référence (exigence + cadre).</li>
                <li>• Transparence : prompts, traces, et usage responsable.</li>
              </ul>
            </div>
          </header>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-4xl px-4 py-10 sm:py-12 space-y-8">
        {/* 1) Pourquoi EleveAI */}
        <div className="rounded-2xl border border-emerald-500/40 bg-slate-900/60 p-5 sm:p-6 space-y-3">
          <h2 className="text-xl font-semibold text-emerald-300">
            Pourquoi EleveAI existe
          </h2>
          <p className="text-sm text-slate-200">
            Les élèves utilisent déjà l’IA. Sans cadre, on obtient souvent :
            copie, réponses “parfaites”, perte de méthode, et confusion.
            EleveAI est conçu pour faire l’inverse :
          </p>
          <ul className="text-sm text-slate-200 space-y-1">
            <li>• faire apprendre par questions, essais, correction expliquée ;</li>
            <li>• favoriser l’autonomie et la confiance ;</li>
            <li>
              • faire gagner du temps aux enseignants (préparation, différenciation) ;
            </li>
            <li>• proposer un cadre clair pour les familles et l’établissement.</li>
          </ul>
        </div>

        {/* 2) Principes */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 sm:p-6 space-y-4">
          <h2 className="text-xl font-semibold text-slate-50">
            Les 7 principes EleveAI (non négociables)
          </h2>

          <div className="space-y-3 text-sm text-slate-200">
            <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4">
              <p className="font-semibold text-slate-50">1) L’élève doit essayer</p>
              <p className="text-slate-300">
                EleveAI commence par questionner, pas par donner la réponse.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4">
              <p className="font-semibold text-slate-50">2) L’erreur est utile</p>
              <p className="text-slate-300">
                On valorise la compréhension : “où ça a bloqué ?” puis on reconstruit.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4">
              <p className="font-semibold text-slate-50">
                3) Transparence (prompts & traces)
              </p>
              <p className="text-slate-300">
                Un usage propre laisse des traces : prompt utilisé, réponse IA, correction
                personnelle.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4">
              <p className="font-semibold text-slate-50">4) Anti-triche par design</p>
              <p className="text-slate-300">
                EleveAI favorise l’explication, la méthode et l’auto-vérification,
                pas la production “prête à rendre”.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4">
              <p className="font-semibold text-slate-50">
                5) Le professeur garde la main
              </p>
              <p className="text-slate-300">
                L’IA assiste. Elle ne remplace ni la pédagogie, ni la relation, ni
                l’exigence.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4">
              <p className="font-semibold text-slate-50">6) Clarté & accessibilité</p>
              <p className="text-slate-300">
                Phrases courtes, structure, “à retenir”, documents Word-friendly et
                DYS-friendly.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4">
              <p className="font-semibold text-slate-50">7) Sobriété & crédibilité</p>
              <p className="text-slate-300">
                Pas de gadget : une IA utile, rassurante, compatible avec le cadre scolaire.
              </p>
            </div>
          </div>
        </div>

        {/* 3) Pour qui */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-2">
            <h3 className="text-base font-semibold text-slate-50">🎒 Élèves</h3>
            <p className="text-sm text-slate-300">
              Réviser, comprendre, s’entraîner, préparer un contrôle — sans copier.
            </p>
            <ul className="text-sm text-slate-200 space-y-1">
              <li>• questions progressives</li>
              <li>• correction expliquée</li>
              <li>• mini-bilan des erreurs</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-2">
            <h3 className="text-base font-semibold text-slate-50">🧑‍🏫 Professeurs</h3>
            <p className="text-sm text-slate-300">
              Générer des prompts et des ressources “Word-friendly” rapidement.
            </p>
            <ul className="text-sm text-slate-200 space-y-1">
              <li>• différenciation</li>
              <li>• rituel / méthodes</li>
              <li>• documents IA-friendly</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-2">
            <h3 className="text-base font-semibold text-slate-50">👨‍👩‍👧‍👦 Parents</h3>
            <p className="text-sm text-slate-300">
              Aider sans faire à la place, garder un cadre simple à la maison.
            </p>
            <ul className="text-sm text-slate-200 space-y-1">
              <li>• prompts “famille”</li>
              <li>• règles anti-conflits</li>
              <li>• signes d’alerte triche</li>
            </ul>
          </div>
        </div>

        {/* 4) Qui sommes-nous */}
        <div className="rounded-2xl border border-emerald-500/40 bg-slate-900/60 p-5 sm:p-6 space-y-3">
          <h2 className="text-xl font-semibold text-emerald-300">
            Qui sommes-nous ?
          </h2>

          <p className="text-sm text-slate-200">
            Je m’appelle <span className="font-semibold">Frédéric Lacoste</span>,
            enseignant de mathématiques dans l’académie de La Réunion, développeur
            autodidacte, et initiateur du projet{" "}
            <span className="font-semibold">EleveAI</span>.
          </p>

          <p className="text-sm text-slate-300">
            Ce “nous” représente l’intention : une IA au service des élèves, des collègues
            et des familles — pas une solution extérieure qui impose un modèle.
            Le projet avance par petites briques, avec des retours de terrain.
          </p>

          <div className="grid gap-4 sm:grid-cols-2 pt-2">
            <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4 space-y-2">
              <p className="text-sm font-semibold text-slate-50">Parcours</p>
              <ul className="text-sm text-slate-200 space-y-1">
                <li>• DESS de mathématiques appliquées</li>
                <li>• Statistiques / modélisation / optimisation</li>
                <li>• Expérience en industrie (données, méthodes)</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4 space-y-2">
              <p className="text-sm font-semibold text-slate-50">Ce qui compte</p>
              <ul className="text-sm text-slate-200 space-y-1">
                <li>• cadre clair et anti-triche</li>
                <li>• exigence + bienveillance</li>
                <li>• sobriété et crédibilité</li>
                <li>• ancrage à La Réunion</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 5) Contact */}
        <div className="grid gap-6 sm:grid-cols-[1.4fr,1fr] pt-4 border-t border-slate-800 mt-4">
          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-50">
              Un projet humain avant tout
            </h2>
            <p className="text-sm text-slate-300">
              EleveAI combine IA générative, documents clairs, et principes pédagogiques
              simples : questionner, faire essayer, corriger, expliquer, renforcer.
              L’objectif : aider sans remplacer.
            </p>
          </div>

          <div className="rounded-2xl border border-emerald-500/40 bg-slate-900/70 p-4 sm:p-5 space-y-3">
            <h2 className="text-lg font-semibold text-emerald-300">Me contacter</h2>
            <p className="text-sm text-slate-300">
              Collaboration, atelier IA, retours terrain, partenariat :
            </p>
            <a
              href="mailto:frederic.lacoste@ac-reunion.fr"
              className="inline-flex items-center rounded-xl border border-emerald-500/60 bg-emerald-500/10 px-3 py-2 text-sm font-medium text-emerald-200 hover:bg-emerald-500/20 transition"
            >
              Frederic.Lacoste@ac-reunion.fr
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
