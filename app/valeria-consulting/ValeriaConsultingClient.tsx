"use client";

import Link from "next/link";

export default function ValeriaConsultingClient() {
  return (
    <main className="min-h-screen bg-white text-slate-900">

      {/* HERO */}
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-5xl px-4 py-16 text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-600">
            Valeria Consulting — La Réunion
          </p>

          <h1 className="mt-4 text-4xl md:text-5xl font-extrabold">
            Consultant IA — Objectifs mesurables & optimisation robuste
          </h1>

          <p className="mt-6 text-lg text-slate-700 max-w-3xl mx-auto">
            J’accompagne établissements scolaires, organismes de formation et
            entreprises dans l’intégration structurée de l’IA :
            clarification des objectifs, critères mesurables, formation et amélioration continue.
          </p>

          <div className="mt-8 flex justify-center gap-4 flex-wrap">
            <Link
              href="/contact"
              className="rounded-xl bg-blue-600 px-6 py-3 font-bold text-white hover:bg-blue-500 transition"
            >
              Demander un rendez-vous →
            </Link>

            <Link
              href="/optimiseur"
              className="rounded-xl border border-slate-300 px-6 py-3 font-bold hover:bg-slate-100 transition"
            >
              Tester Valeria →
            </Link>
          </div>
        </div>
      </section>

      {/* EXPERTISE */}
      <section className="mx-auto max-w-5xl px-4 py-16 space-y-12">

        <div>
          <h2 className="text-2xl font-extrabold mb-4">🎯 Ce que j’apporte</h2>

          <ul className="space-y-3 text-slate-700">
            <li>• Transformation d’intentions floues en objectifs testables</li>
            <li>• Définition de critères mesurables (validation, audit, qualité)</li>
            <li>• Formation à l’usage structuré des IA génératives</li>
            <li>• Méthode d’itération contrôlée (score indicateur + amélioration)</li>
            <li>• Intégration IA sans perte de maîtrise humaine</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-extrabold mb-4">🏫 Pour l’éducation</h2>

          <p className="text-slate-700">
            Clarification des séances, évaluations, séquences.  
            Formation des équipes.  
            Cadre IA encadrée et conforme.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-extrabold mb-4">🏭 Pour les entreprises</h2>

          <p className="text-slate-700">
            Supports de formation interne, procédures structurées,
            critères qualité, optimisation des prompts métiers.
            Adapté aux responsables formation, qualité et RH.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-extrabold mb-4">📍 Ancrage local</h2>

          <p className="text-slate-700">
            Basé à La Réunion.  
            Objectif : développer des usages concrets et responsables de l’IA
            au service du territoire.
          </p>
        </div>

      </section>

      {/* CTA FINAL */}
      <section className="bg-slate-900 text-white py-16">
        <div className="mx-auto max-w-4xl text-center px-4">
          <h2 className="text-3xl font-extrabold">
            L’IA est un outil. La méthode fait la différence.
          </h2>

          <p className="mt-6 text-slate-300">
            Parlons de vos objectifs et transformons-les en résultats mesurables.
          </p>

          <Link
            href="/contact"
            className="mt-8 inline-block rounded-xl bg-white px-6 py-3 font-bold text-slate-900 hover:bg-slate-200 transition"
          >
            Me contacter →
          </Link>
        </div>
      </section>

    </main>
  );
}
