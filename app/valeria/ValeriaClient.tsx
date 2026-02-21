"use client";

import React from "react";

function YouTubeEmbed({ videoId }: { videoId: string }) {
  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="aspect-video w-full">
        <iframe
          className="h-full w-full"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="Valeria Demonstration"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    </div>
  );
}

export default function ValeriaClient() {
  const videoId = "ykRrez0CVN0"; // 👉 Remplace si besoin

  return (
    <main className="min-h-screen bg-white text-slate-900">

      {/* HERO */}
      <section className="border-b border-slate-200">
        <div className="mx-auto max-w-5xl px-6 py-20 text-center">

          <p className="text-xs uppercase tracking-wider text-slate-500">
            Valeria Consulting — La Réunion
          </p>

          <h1 className="mt-6 text-4xl md:text-5xl font-semibold tracking-tight">
            Architecture & gouvernance structurée de l’IA
          </h1>

          <p className="mt-6 text-lg text-slate-600 max-w-3xl mx-auto">
            J’accompagne les organisations dans l’intégration mesurable,
            sécurisée et structurée de l’intelligence artificielle.
          </p>

          <div className="mt-8">
            <a
              href="#audit"
              className="inline-block rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Demander un diagnostic
            </a>
          </div>
        </div>
      </section>

      {/* PROBLEME */}
      <section className="bg-slate-50 border-b border-slate-200">
        <div className="mx-auto max-w-5xl px-6 py-16">

          <h2 className="text-2xl font-semibold">
            L’IA doit être structurée.
          </h2>

          <p className="mt-4 text-slate-600 max-w-3xl">
            Sans objectifs clairs, sans indicateurs et sans cadre de gouvernance,
            l’usage de l’IA devient fragile, risqué et difficilement mesurable.
          </p>

        </div>
      </section>

      {/* AUDIT */}
      <section id="audit" className="border-b border-slate-200">
        <div className="mx-auto max-w-5xl px-6 py-16">

          <h2 className="text-2xl font-semibold">
            Mission pilote — Audit IA structuré
          </h2>

          <div className="mt-8 grid md:grid-cols-2 gap-8 text-slate-600">

            <div>
              <h3 className="font-semibold text-slate-900">
                Analyse des usages
              </h3>
              <p className="mt-2">
                Cartographie des pratiques existantes, des outils utilisés
                et des résultats attendus.
              </p>

              <h3 className="mt-6 font-semibold text-slate-900">
                Identification des risques
              </h3>
              <p className="mt-2">
                Confidentialité, fiabilité, dépendance, absence de traçabilité.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900">
                Définition d’indicateurs
              </h3>
              <p className="mt-2">
                Mise en place d’indicateurs simples et mesurables.
              </p>

              <h3 className="mt-6 font-semibold text-slate-900">
                Plan d’intégration
              </h3>
              <p className="mt-2">
                Recommandations concrètes et cadre d’amélioration continue.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* VIDEO */}
      <section className="bg-slate-50 border-b border-slate-200">
        <div className="mx-auto max-w-5xl px-6 py-16">

          <h2 className="text-2xl font-semibold">
            Valeria en action
          </h2>

          <p className="mt-4 text-slate-600 max-w-3xl">
            Illustration de la méthode : clarification des objectifs,
            évaluation structurée, itération contrôlée.
          </p>

          <div className="mt-8">
            <YouTubeEmbed videoId={videoId} />
          </div>

        </div>
      </section>

      {/* A PROPOS */}
      <section className="border-b border-slate-200">
        <div className="mx-auto max-w-5xl px-6 py-16">

          <h2 className="text-2xl font-semibold">
            À propos
          </h2>

          <p className="mt-4 text-slate-600 max-w-3xl">
            Ancien consultant en statistiques industrielles, j’interviens
            aujourd’hui sur l’intégration structurée de l’IA, avec une
            approche analytique et orientée indicateurs.
          </p>

        </div>
      </section>

      {/* CONTACT */}
      <section className="bg-slate-900 text-white">
        <div className="mx-auto max-w-5xl px-6 py-16 text-center">

          <h2 className="text-2xl font-semibold">
            Demander un diagnostic IA
          </h2>

          <p className="mt-4 text-slate-300">
            Contact : eleveai974@gmail.com
          </p>

        </div>
      </section>

    </main>
  );
}