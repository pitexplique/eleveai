"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-900 sm:text-slate-50">
      {/* HERO */}
      <section className="border-b border-slate-800">
        <div className="mx-auto max-w-6xl px-4 py-16 lg:py-24 grid gap-10 lg:grid-cols-2 items-center">
          <div>
            <p className="inline-flex items-center rounded-full border border-emerald-500/50 bg-emerald-500/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-emerald-700 sm:text-emerald-300 mb-4">
              IA pédagogique · Eduscol + neurosciences · profs · élèves · parents
            </p>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-slate-900 sm:text-slate-50">
              EleveAI, l’IA pédagogique
              <span className="block text-blue-700 sm:text-emerald-400">
                conçue pour la classe et la maison.
              </span>
            </h1>

            <p className="mt-4 text-slate-900 sm:text-slate-300 text-base sm:text-lg max-w-xl">
              Une plateforme d’IA pensée pour les professeurs, les élèves et les parents :
              prompts guidés, exercices, cours, évaluations et accompagnement
              des apprentissages, en respectant les programmes officiels et les
              principes des neurosciences.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/espace-prof"
                className="inline-flex items-center justify-center rounded-lg bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-slate-900 hover:bg-emerald-400 transition"
              >
                Espace prof
              </Link>

              <Link
                href="/espace-eleve"
                className="inline-flex items-center justify-center rounded-lg border border-slate-700 bg-slate-200 sm:bg-slate-900 px-5 py-2.5 text-sm font-semibold text-slate-900 sm:text-slate-50 hover:bg-slate-300 sm:hover:bg-slate-800 transition"
              >
                Espace élève
              </Link>

              <Link
                href="/parents"
                className="inline-flex items-center justify-center rounded-lg border border-indigo-600 bg-indigo-100 sm:bg-indigo-500/10 px-5 py-2.5 text-xs sm:text-sm font-semibold text-indigo-700 sm:text-indigo-200 transition"
              >
                Espace parents
              </Link>

              <Link
                href="/offre-pilote"
                className="inline-flex items-center justify-center rounded-lg border border-amber-600 bg-amber-100 sm:bg-amber-500/10 px-5 py-2.5 text-xs sm:text-sm font-semibold text-amber-700 sm:text-amber-300 transition"
              >
                Devenir collège pilote
              </Link>
            </div>

          </div>

          {/* Bloc “pour qui” */}
          <div className="rounded-2xl border border-slate-800 bg-slate-100 sm:bg-slate-900/40 p-6 sm:p-8 space-y-6">
            <h2 className="text-xl font-semibold text-slate-900 sm:text-slate-100">
              Une IA qui comprend les besoins de la classe… et de la maison
            </h2>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-white sm:bg-slate-900/80 border border-slate-300 sm:border-slate-800 p-4">
                <p className="text-xs font-semibold text-emerald-700 sm:text-emerald-300 uppercase tracking-wide">
                  Pour les professeurs
                </p>
                <ul className="mt-2 space-y-1.5 text-sm text-slate-900 sm:text-slate-200">
                  <li>• Génération de cours, activités et évaluations</li>
                  <li>• Prompts guidés alignés Eduscol</li>
                  <li>• Adaptations DYS et différenciation</li>
                  <li>• Idées de séquences et projets</li>
                </ul>
              </div>

              <div className="rounded-xl bg-white sm:bg-slate-900/80 border border-slate-300 sm:border-slate-800 p-4">
                <p className="text-xs font-semibold text-blue-700 sm:text-sky-300 uppercase tracking-wide">
                  Pour les élèves
                </p>
                <ul className="mt-2 space-y-1.5 text-sm text-slate-900 sm:text-slate-200">
                  <li>• Explications pas-à-pas</li>
                  <li>• Exercices guidés et corrigés détaillés</li>
                  <li>• Révisions ciblées et fiches synthèse</li>
                  <li>• Aide à l’oral et aux examens</li>
                </ul>
              </div>
            </div>

            <div className="rounded-xl bg-white sm:bg-slate-900/80 border border-indigo-400 sm:border-indigo-500/40 p-4">
              <p className="text-xs font-semibold text-indigo-700 sm:text-indigo-200 uppercase tracking-wide">
                Pour les parents
              </p>
              <ul className="mt-2 space-y-1.5 text-sm text-slate-900 sm:text-slate-200">
                <li>• Comprendre ce que l’enfant doit apprendre</li>
                <li>• Aider sans faire les devoirs à sa place</li>
                <li>• Conseils d’organisation</li>
                <li>• Cadre IA sécurisé</li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION VALEURS */}
      <section className="border-b border-slate-800">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16 space-y-8">
          <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 sm:text-slate-50">
            Ce qui rend EleveAI différent
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-300 sm:border-slate-800 bg-white sm:bg-slate-900/60 p-5">
              <h3 className="text-sm font-semibold text-emerald-700 sm:text-emerald-300 uppercase tracking-wide">
                Aligné Eduscol
              </h3>
              <p className="mt-2 text-sm text-slate-900 sm:text-slate-200">
                Activités et explications conformes aux programmes officiels.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-300 sm:border-slate-800 bg-white sm:bg-slate-900/60 p-5">
              <h3 className="text-sm font-semibold text-blue-700 sm:text-sky-300 uppercase tracking-wide">
                Basé neurosciences
              </h3>
              <p className="mt-2 text-sm text-slate-900 sm:text-slate-200">
                Progressivité, exemples gradués, rappel actif, explications adaptées.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-300 sm:border-slate-800 bg-white sm:bg-slate-900/60 p-5">
              <h3 className="text-sm font-semibold text-amber-700 sm:text-amber-300 uppercase tracking-wide">
                Utilisé en classe
              </h3>
              <p className="mt-2 text-sm text-slate-900 sm:text-slate-200">
                Pensé à partir des besoins réels des professeurs et des élèves.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION PROF / ELEVE / PARENTS DÉTAIL */}
      <section className="border-b border-slate-800">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16 grid gap-10 lg:grid-cols-3">

          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl font-semibold text-slate-900 sm:text-slate-50">
              Pour les professeurs
            </h2>
            <ul className="space-y-2 text-sm text-slate-900 sm:text-slate-200">
              <li>• Activités, cours, évaluations</li>
              <li>• Prompts guidés par discipline</li>
              <li>• Différenciation</li>
              <li>• Analyse des erreurs</li>
            </ul>
            <Link
              href="/espace-prof"
              className="inline-flex mt-4 items-center justify-center rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-emerald-400 transition"
            >
              Découvrir l’espace prof
            </Link>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl font-semibold text-slate-900 sm:text-slate-50">
              Pour les élèves
            </h2>
            <ul className="space-y-2 text-sm text-slate-900 sm:text-slate-200">
              <li>• Explications adaptées</li>
              <li>• Exercices guidés</li>
              <li>• Fiches de révision</li>
              <li>• Préparation aux oraux</li>
            </ul>
            <Link
              href="/espace-eleve"
              className="inline-flex mt-4 items-center justify-center rounded-lg border border-slate-700 bg-white sm:bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-900 sm:text-slate-50 hover:bg-slate-200 sm:hover:bg-slate-800 transition"
            >
              Découvrir l’espace élève
            </Link>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl font-semibold text-slate-900 sm:text-slate-50">
              Pour les parents
            </h2>
            <ul className="space-y-2 text-sm text-slate-900 sm:text-slate-200">
              <li>• Comprendre le programme</li>
              <li>• Aider sans faire à la place</li>
              <li>• Questions utiles</li>
              <li>• Organisation du travail</li>
            </ul>
            <Link
              href="/parents"
              className="inline-flex mt-4 items-center justify-center rounded-lg border border-indigo-600 bg-white sm:bg-slate-900 px-4 py-2 text-sm font-semibold text-indigo-700 sm:text-indigo-200 hover:bg-slate-200 sm:hover:bg-slate-800 transition"
            >
              Découvrir l’espace parents
            </Link>
          </div>

        </div>
      </section>

      {/* FONDATEUR */}
      <section>
        <div className="mx-auto max-w-4xl px-4 py-12 sm:py-16">
          <div className="rounded-2xl border border-slate-300 sm:border-slate-800 bg-white sm:bg-slate-900/60 p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-600 sm:text-slate-400 mb-2">
              À propos
            </p>
            <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 sm:text-slate-50">
              Un outil créé par un enseignant de terrain
            </h2>

            <p className="mt-3 text-sm text-slate-800 sm:text-slate-200">
              “J’enseigne depuis de nombreuses années. EleveAI est né d’un besoin :
              rendre l’apprentissage plus simple, plus clair et plus accessible.”
            </p>

            <p className="mt-2 text-sm text-slate-800 sm:text-slate-200">
              L’objectif est d’offrir un accompagnement fiable et pédagogique
              aux professeurs, aux élèves et aux familles.
            </p>

            <p className="mt-3 text-sm font-medium text-emerald-700 sm:text-emerald-300">
              — Frédéric, professeur et créateur d’EleveAI
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
