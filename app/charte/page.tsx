// app/charte/page.tsx
"use client";

import Link from "next/link";

export default function ChartePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      {/* HERO */}
      <section className="border-b border-slate-800 bg-gradient-to-b from-slate-900/60 to-slate-950">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:py-16 space-y-6">
          <div className="text-sm text-slate-400 flex items-center gap-2">
            <Link href="/" className="hover:text-emerald-300">
              Accueil
            </Link>
            <span>/</span>
            <span className="text-slate-200">Charte d’usage de l’IA</span>
          </div>

          <header className="space-y-4">
            <p className="inline-flex items-center rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-emerald-300">
              EleveAI · Charte officielle
            </p>

            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Charte d’usage de l’intelligence artificielle
            </h1>

            <p className="max-w-2xl text-slate-300">
              Cette charte définit les règles d’utilisation de l’intelligence
              artificielle au sein d’EleveAI.  
              Elle vise à garantir un usage pédagogique, responsable,
              transparent et conforme au cadre scolaire.
            </p>
          </header>
        </div>
      </section>

      {/* CONTENU */}
      <section className="mx-auto max-w-4xl px-4 py-10 sm:py-12 space-y-8">

        {/* Préambule */}
        <div className="rounded-2xl border border-emerald-500/40 bg-slate-900/60 p-5 space-y-3">
          <h2 className="text-xl font-semibold text-emerald-300">
            1. Préambule
          </h2>
          <p className="text-sm text-slate-200">
            L’intelligence artificielle est déjà utilisée par de nombreux élèves.
            Sans cadre clair, elle peut conduire à la copie, à la perte de méthode
            et à la disparition du raisonnement personnel.
          </p>
          <p className="text-sm text-slate-200">
            EleveAI a été conçue pour faire l’inverse : utiliser l’IA comme
            <strong> outil d’apprentissage</strong>, et non comme un substitut
            au travail de l’élève.
          </p>
        </div>

        {/* Principes */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-3">
          <h2 className="text-xl font-semibold">
            2. Principes fondateurs
          </h2>
          <ul className="text-sm text-slate-200 space-y-1">
            <li>• L’élève doit réfléchir avant d’obtenir une aide.</li>
            <li>• L’erreur fait partie du processus d’apprentissage.</li>
            <li>• L’IA n’écrit pas à la place de l’élève.</li>
            <li>• Le professeur reste la référence pédagogique.</li>
            <li>• Les usages doivent être explicables et traçables.</li>
          </ul>
        </div>

        {/* Engagements EleveAI */}
        <div className="rounded-2xl border border-emerald-500/40 bg-slate-900/60 p-5 space-y-3">
          <h2 className="text-xl font-semibold text-emerald-300">
            3. Engagements d’EleveAI
          </h2>
          <ul className="text-sm text-slate-200 space-y-1">
            <li>• Ne pas fournir de production prête à rendre.</li>
            <li>• Favoriser les questions, étapes et justifications.</li>
            <li>• Permettre la conservation de traces d’usage.</li>
            <li>• Respecter la confidentialité et le RGPD.</li>
            <li>• Concevoir des outils compatibles avec le cadre scolaire.</li>
          </ul>
        </div>

        {/* Élèves */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-3">
          <h2 className="text-xl font-semibold">
            4. Engagements de l’élève
          </h2>
          <ul className="text-sm text-slate-200 space-y-1">
            <li>• Utiliser l’IA pour comprendre, pas pour copier.</li>
            <li>• Reformuler avec ses propres mots.</li>
            <li>• Être capable d’expliquer son raisonnement.</li>
            <li>• Ne pas présenter une réponse IA comme un travail personnel.</li>
          </ul>
        </div>

        {/* Professeurs */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-3">
          <h2 className="text-xl font-semibold">
            5. Engagements du professeur
          </h2>
          <ul className="text-sm text-slate-200 space-y-1">
            <li>• Choisir quand et comment l’IA est autorisée.</li>
            <li>• Exiger des traces, justifications ou analyses.</li>
            <li>• Adapter les consignes et évaluations.</li>
            <li>• Conserver la liberté pédagogique.</li>
          </ul>
        </div>

        {/* Parents */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-3">
          <h2 className="text-xl font-semibold">
            6. Engagements des parents
          </h2>
          <ul className="text-sm text-slate-200 space-y-1">
            <li>• Accompagner sans faire à la place.</li>
            <li>• Encourager l’autonomie et l’effort personnel.</li>
            <li>• Comprendre que l’IA est un outil, pas une solution magique.</li>
          </ul>
        </div>

        {/* Traces */}
        <div className="rounded-2xl border border-emerald-500/40 bg-slate-900/60 p-5 space-y-3">
          <h2 className="text-xl font-semibold text-emerald-300">
            7. Traces et transparence
          </h2>
          <p className="text-sm text-slate-200">
            L’utilisation de l’IA doit pouvoir être expliquée :
            prompts utilisés, réponses obtenues, corrections personnelles.
            Cette transparence est une condition essentielle de l’usage
            pédagogique de l’IA.
          </p>
        </div>

        {/* Établissements */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-3">
          <h2 className="text-xl font-semibold">
            8. Cadre établissement
          </h2>
          <p className="text-sm text-slate-200">
            EleveAI peut être utilisé dans le cadre d’expérimentations,
            d’ateliers IA ou d’usages encadrés, sous la responsabilité
            de l’établissement et de l’équipe pédagogique.
          </p>
        </div>

        {/* Conclusion */}
        <div className="rounded-2xl border border-emerald-600/60 bg-emerald-500/10 p-5 space-y-3">
          <h2 className="text-xl font-semibold text-emerald-200">
            9. Évolution de la charte
          </h2>
          <p className="text-sm text-slate-200">
            Cette charte pourra évoluer afin de s’adapter aux usages,
            aux retours du terrain et aux évolutions réglementaires.
          </p>
          <p className="text-sm text-slate-300">
            EleveAI s’engage à maintenir un cadre clair, humain et responsable.
          </p>
        </div>

      </section>
    </main>
  );
}
