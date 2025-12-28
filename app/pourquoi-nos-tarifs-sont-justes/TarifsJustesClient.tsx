"use client";

import Link from "next/link";

export default function TarifsJustesClient() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      {/* HERO */}
      <section className="border-b border-slate-800 bg-gradient-to-b from-slate-900/60 to-slate-950">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:py-16 space-y-8">
          {/* Breadcrumb */}
          <div className="text-sm text-slate-400 flex items-center gap-2">
            <Link href="/" className="hover:text-emerald-300 transition">
              Accueil
            </Link>
            <span className="text-slate-600">/</span>
            <span className="text-slate-200">Pourquoi nos tarifs sont justes</span>
          </div>

          {/* Header */}
          <header className="space-y-4">
            <p className="inline-flex items-center rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-emerald-300">
              Transparence · Confiance · Modèle durable
            </p>

            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-50">
              Pourquoi nos tarifs sont justes
            </h1>

            <p className="max-w-3xl text-slate-300">
              EleveAI est un projet éducatif : utile, sobre, anti-triche, compatible avec
              le cadre scolaire. Pour rester fiable (et ne pas dépendre d’un modèle publicitaire),
              il faut un modèle économique clair. Ici, on explique simplement{" "}
              <span className="font-semibold">ce que finance un abonnement</span>.
            </p>

            {/* Mini "à retenir" */}
            <div className="rounded-2xl border border-emerald-500/30 bg-slate-900/60 p-4 sm:p-5">
              <p className="text-sm font-semibold text-emerald-300">À retenir</p>
              <ul className="mt-2 text-sm text-slate-200 space-y-1">
                <li>• Pas de pub, pas de revente de données.</li>
                <li>• Des plafonds clairs : pas de facture surprise.</li>
                <li>• Un cadre “IA-friendly” et anti-triche par design.</li>
                <li>• Un projet durable, compatible avec l’école.</li>
              </ul>
            </div>
          </header>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-5xl px-4 py-10 sm:py-12 space-y-8">
        {/* 1) Ce que finance un abonnement */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 sm:p-6 space-y-3">
          <h2 className="text-xl font-semibold text-slate-50">
            1) Ce que finance un abonnement EleveAI
          </h2>
          <p className="text-sm text-slate-300">
            Un abonnement finance des coûts réels et continus, même si l’interface
            paraît “simple”.
          </p>
          <ul className="text-sm text-slate-200 space-y-1">
            <li>• l’accès aux modèles IA (coût variable par requête),</li>
            <li>• l’hébergement, la base de données et la sécurité,</li>
            <li>• l’amélioration des “moulinettes” (élèves, profs, parents, établissements),</li>
            <li>• le support, les corrections, et la maintenance,</li>
            <li>• la conformité (RGPD, données, bonnes pratiques).</li>
          </ul>
        </div>

        {/* 2) Pourquoi des quotas */}
        <div className="rounded-2xl border border-emerald-500/25 bg-slate-900/60 p-5 sm:p-6 space-y-3">
          <h2 className="text-xl font-semibold text-emerald-300">
            2) Pourquoi des quotas de requêtes
          </h2>
          <p className="text-sm text-slate-200">
            Les quotas ne servent pas à “brider” : ils permettent de garder un tarif
            accessible, tout en évitant les abus et les coûts incontrôlés.
          </p>
          <ul className="text-sm text-slate-200 space-y-1">
            <li>• Tu sais exactement ce que tu achètes.</li>
            <li>• L’établissement peut piloter sans risque de dérive.</li>
            <li>• Le système reste stable pour tout le monde.</li>
          </ul>
          <p className="text-xs text-slate-400">
            Et si tu as un besoin particulier (atelier, expérimentation), on ajuste proprement.
          </p>
        </div>

        {/* 3) “Anti-triche” = plus coûteux à concevoir */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 sm:p-6 space-y-3">
          <h2 className="text-xl font-semibold text-slate-50">
            3) Une IA “qui fait apprendre” coûte plus cher qu’une IA “qui répond”
          </h2>
          <p className="text-sm text-slate-300">
            Une IA qui donne directement la réponse est facile à vendre… mais elle
            rend l’élève dépendant. EleveAI vise l’inverse :
          </p>
          <ul className="text-sm text-slate-200 space-y-1">
            <li>• questionner, faire essayer, corriger et expliquer ;</li>
            <li>• demander des traces (prompt, réponse, correction personnelle) ;</li>
            <li>• proposer des formats propres (Word-friendly, clairs, structurés).</li>
          </ul>
          <p className="text-xs text-slate-400">
            Concevoir ce cadre (prompts, garde-fous, UX) demande du travail “invisible”.
          </p>
        </div>

        {/* 4) RGPD / confiance */}
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-3">
            <h2 className="text-lg font-semibold text-slate-50">
              4) Sécurité et RGPD : on ne joue pas
            </h2>
            <p className="text-sm text-slate-300">
              Pour un outil éducatif, la confiance est non négociable.
              On vise une approche simple : pas de collecte inutile, pas de revente,
              et des usages compatibles avec l’école.
            </p>
            <ul className="text-sm text-slate-200 space-y-1">
              <li>• minimisation des données,</li>
              <li>• séparation claire des espaces,</li>
              <li>• bonnes pratiques techniques,</li>
              <li>• règles de contact et de sécurité.</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-emerald-500/25 bg-emerald-500/10 p-5 space-y-3">
            <h2 className="text-lg font-semibold text-emerald-200">
              5) Notre promesse : clarté, pas de surprise
            </h2>
            <p className="text-sm text-slate-200">
              Les plafonds sont là pour protéger tout le monde.
              Tu sais où tu vas : pas de “dépassement” facturé sans prévenir.
            </p>
            <ul className="text-sm text-slate-100 space-y-1">
              <li>• tarifs lisibles,</li>
              <li>• quotas explicites,</li>
              <li>• ajustement possible pour les établissements pilotes,</li>
              <li>• accompagnement humain quand nécessaire.</li>
            </ul>
          </div>
        </div>

        {/* 6) CTA */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-2">
              <h2 className="text-lg font-semibold text-slate-50">
                Tu veux un devis ou un cadrage établissement ?
              </h2>
              <p className="text-sm text-slate-300 max-w-2xl">
                En 3 lignes : type d’établissement, nombre de profs concernés, et objectif
                (pilotage, atelier, expérimentation). On te répond avec une proposition simple.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/tarifs"
                className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-950/40 px-5 py-2.5 text-sm font-semibold text-slate-100 hover:bg-slate-900 transition"
              >
                Voir les tarifs
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-slate-950 hover:bg-emerald-400 transition"
              >
                Nous écrire
              </Link>
            </div>
          </div>

          <p className="mt-4 text-xs text-slate-500">
            Objectif : un projet durable, humain, utile, sans dérive “gadget”.
          </p>
        </div>
      </section>
    </main>
  );
}
