"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      {/* HERO */}
      <section className="border-b border-slate-800">
        <div className="mx-auto max-w-6xl px-4 py-16 lg:py-24 grid gap-10 lg:grid-cols-2 items-center">
          <div>
            <p className="inline-flex items-center rounded-full border border-emerald-500/50 bg-emerald-500/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-emerald-300 mb-4">
              IA pédagogique · Eduscol + neurosciences · profs · élèves · parents
            </p>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              EleveAI, l’IA pédagogique
              <span className="block text-emerald-400">
                conçue pour la classe et la maison.
              </span>
            </h1>

            <p className="mt-4 text-slate-300 text-base sm:text-lg max-w-xl">
              Une plateforme d’IA pensée pour les professeurs, les élèves et les parents :
              prompts guidés, exercices, cours, évaluations et accompagnement
              des apprentissages, en respectant les programmes officiels et les
              principes des neurosciences.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/espace-prof"
                className="inline-flex items-center justify-center rounded-lg bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 hover:bg-emerald-400 transition"
              >
                Espace prof
              </Link>

              <Link
                href="/espace-eleve"
                className="inline-flex items-center justify-center rounded-lg border border-slate-700 bg-slate-900 px-5 py-2.5 text-sm font-semibold text-slate-50 hover:bg-slate-800 transition"
              >
                Espace élève
              </Link>

              {/* 🔵 MODIFIÉ : lien correct vers /parents */}
              <Link
                href="/parents"
                className="inline-flex items-center justify-center rounded-lg border border-indigo-400/60 bg-indigo-500/10 px-5 py-2.5 text-xs sm:text-sm font-semibold text-indigo-200 hover:bg-indigo-500/15 transition"
              >
                Espace parents
              </Link>

              <Link
                href="/offre-pilote"
                className="inline-flex items-center justify-center rounded-lg border border-amber-500/60 bg-amber-500/10 px-5 py-2.5 text-xs sm:text-sm font-semibold text-amber-300 hover:bg-amber-500/15 transition"
              >
                Devenir collège pilote
              </Link>
            </div>

            <p className="mt-4 text-xs text-slate-400">
              Projet développé à La Réunion · Objectif : une solution simple et
              accessible pour tous les collèges et lycées de France, en lien avec
              les familles.
            </p>
          </div>

          {/* Bloc “pour qui” */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 sm:p-8 space-y-6">
            <h2 className="text-xl font-semibold text-slate-100">
              Une IA qui comprend les besoins de la classe… et de la maison
            </h2>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-slate-900/80 border border-slate-800 p-4">
                <p className="text-xs font-semibold text-emerald-300 uppercase tracking-wide">
                  Pour les professeurs
                </p>
                <ul className="mt-2 space-y-1.5 text-sm text-slate-200">
                  <li>• Génération de cours, activités et évaluations</li>
                  <li>• Prompts guidés alignés Eduscol</li>
                  <li>• Adaptations DYS et différenciation</li>
                  <li>• Idées de séquences et projets</li>
                </ul>
              </div>

              <div className="rounded-xl bg-slate-900/80 border border-slate-800 p-4">
                <p className="text-xs font-semibold text-sky-300 uppercase tracking-wide">
                  Pour les élèves
                </p>
                <ul className="mt-2 space-y-1.5 text-sm text-slate-200">
                  <li>• Explications pas-à-pas</li>
                  <li>• Exercices guidés et corrigés détaillés</li>
                  <li>• Révisions ciblées et fiches synthèse</li>
                  <li>• Aide à l’oral et aux examens</li>
                </ul>
              </div>
            </div>

            {/* 🔵 Ajout bloc Parents */}
            <div className="rounded-xl bg-slate-900/80 border border-indigo-500/40 p-4">
              <p className="text-xs font-semibold text-indigo-200 uppercase tracking-wide">
                Pour les parents
              </p>
              <ul className="mt-2 space-y-1.5 text-sm text-slate-200">
                <li>• Comprendre ce que l’enfant doit apprendre (Eduscol)</li>
                <li>• Aider sans faire les devoirs à sa place</li>
                <li>• Conseils pour organiser le travail à la maison</li>
                <li>• Réassurance : cadre IA sécurisé et pédagogique</li>
              </ul>
            </div>

            <p className="text-xs text-slate-400">
              Chaque outil suit les principes des neurosciences : progressivité,
              répétition espacée, alternance activités / exemples, test actif.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION VALEURS */}
      <section className="border-b border-slate-800 bg-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16 space-y-8">
          <h2 className="text-2xl sm:text-3xl font-semibold text-slate-50">
            Ce qui rend EleveAI différent
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
              <h3 className="text-sm font-semibold text-emerald-300 uppercase tracking-wide">
                Aligné sur Eduscol
              </h3>
              <p className="mt-2 text-sm text-slate-200">
                Les prompts, explications et activités suivent les programmes
                officiels pour chaque niveau du collège et du lycée.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
              <h3 className="text-sm font-semibold text-sky-300 uppercase tracking-wide">
                Basé sur les neurosciences
              </h3>
              <p className="mt-2 text-sm text-slate-200">
                Notion par notion, exemples gradués, reformulation, rappel actif,
                changement de modalité : une pédagogie scientifiquement étayée.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
              <h3 className="text-sm font-semibold text-amber-300 uppercase tracking-wide">
                Né dans une vraie classe
              </h3>
              <p className="mt-2 text-sm text-slate-200">
                Conçu à La Réunion par un professeur, testé avec des élèves,
                pensé pour les besoins réels de la classe et des familles.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION PROF / ELEVE / PARENTS détail */}
      <section className="border-b border-slate-800 bg-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16 grid gap-10 lg:grid-cols-3">
          {/* PROF */}
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl font-semibold text-slate-50">
              Pour les professeurs : un copilote pédagogique
            </h2>
            <ul className="space-y-2 text-sm text-slate-200">
              <li>• Création d'activités, cours et évaluations</li>
              <li>• Prompts guidés par discipline</li>
              <li>• Différenciation et variantes automatiques</li>
              <li>• Analyse des erreurs fréquentes</li>
            </ul>
            <Link
              href="/espace-prof"
              className="inline-flex mt-4 items-center justify-center rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-400 transition"
            >
              Découvrir l’espace prof
            </Link>
          </div>

          {/* ELEVE */}
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl font-semibold text-slate-50">
              Pour les élèves : comprendre et progresser
            </h2>
            <ul className="space-y-2 text-sm text-slate-200">
              <li>• Explications adaptées au niveau réel</li>
              <li>• Exercices guidés avec indices</li>
              <li>• Fiches de révision personnalisées</li>
              <li>• Préparation aux oraux</li>
            </ul>
            <Link
              href="/espace-eleve"
              className="inline-flex mt-4 items-center justify-center rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-50 hover:bg-slate-800 transition"
            >
              Découvrir l’espace élève
            </Link>
          </div>

          {/* PARENTS */}
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl font-semibold text-slate-50">
              Pour les parents : aider sans stress
            </h2>
            <ul className="space-y-2 text-sm text-slate-200">
              <li>• Comprendre le programme de votre enfant</li>
              <li>• Conseils pour l’aider sans faire à sa place</li>
              <li>• Questions utiles à poser pour l’aider à réfléchir</li>
              <li>• Organisation simple des devoirs et révisions</li>
            </ul>

            {/* 🔵 Lien correct /parents */}
            <Link
              href="/parents"
              className="inline-flex mt-4 items-center justify-center rounded-lg border border-indigo-400 bg-slate-900 px-4 py-2 text-sm font-semibold text-indigo-200 hover:bg-slate-800 transition"
            >
              Découvrir l’espace parents
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION FONDATEUR – humble */}
      <section className="bg-slate-950">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:py-16">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-2">
              À propos
            </p>
            <h2 className="text-xl sm:text-2xl font-semibold text-slate-50">
              Un outil créé par un enseignant de terrain
            </h2>

            <p className="mt-3 text-sm text-slate-200">
              “J’enseigne depuis de nombreuses années au lycée, à La Réunion.
              J’ai créé EleveAI pour aider mes propres élèves à comprendre plus
              facilement, et pour alléger la charge de travail des enseignants.”
            </p>

            <p className="mt-2 text-sm text-slate-200">
              Aujourd’hui, je partage cet outil avec l’ensemble de la communauté
              éducative. EleveAI aide les professeurs, les élèves et les parents
              à avancer ensemble, dans un cadre simple, scientifique et
              pédagogique.”
            </p>

            <p className="mt-3 text-sm font-medium text-emerald-300">
              — Frédéric, professeur de mathématiques et créateur d’EleveAI
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

