"use client";

import Link from "next/link";
import { useState } from "react";

const EMAIL = "contact@eleveai.fr";

export default function ManifesteClient() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error("Impossible de copier l’email", e);
    }
  };

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
            <span className="text-slate-200">Qui sommes-nous</span>
          </div>

          {/* Header */}
          <header className="space-y-4">
            <p className="inline-flex items-center rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-emerald-300">
              EleveAI · Manifeste pédagogique · Cadre d’usage de l’IA
            </p>

            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-50">
              EleveAI — Une IA pour apprendre, pas pour tricher
            </h1>

            <p className="max-w-2xl text-slate-300">
              EleveAI est un projet éducatif construit sur une idée simple :
              <span className="font-semibold">
                {" "}
                l’IA est utile si elle fait réfléchir
              </span>
              . Elle doit guider l’élève, aider les professeurs, rassurer les
              familles et respecter le rôle de l’école.
            </p>

            {/* À retenir */}
            <div className="rounded-2xl border border-emerald-500/40 bg-slate-900/60 p-4 sm:p-5">
              <p className="text-sm font-semibold text-emerald-300">À retenir</p>
              <ul className="mt-2 text-sm text-slate-200 space-y-1">
                <li>• EleveAI guide, ne fait pas à la place.</li>
                <li>• L’élève doit essayer, se tromper, comprendre, recommencer.</li>
                <li>• Le professeur reste la référence.</li>
                <li>• Transparence et usage responsable.</li>
              </ul>
            </div>
          </header>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-4xl px-4 py-10 sm:py-12 space-y-8">
        {/* Pourquoi */}
        <div className="rounded-2xl border border-emerald-500/40 bg-slate-900/60 p-5 sm:p-6 space-y-3">
          <h2 className="text-xl font-semibold text-emerald-300">
            Pourquoi EleveAI existe
          </h2>
          <p className="text-sm text-slate-200">
            Les élèves utilisent déjà l’IA. Sans cadre, cela mène souvent à la
            copie et à la perte de méthode. EleveAI est conçu pour faire
            l’inverse :
          </p>
          <ul className="text-sm text-slate-200 space-y-1">
            <li>• apprendre par questions et essais ;</li>
            <li>• renforcer l’autonomie et la confiance ;</li>
            <li>• faire gagner du temps aux enseignants ;</li>
            <li>• rassurer les familles et l’institution.</li>
          </ul>
        </div>

        {/* Principes */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 sm:p-6 space-y-4">
          <h2 className="text-xl font-semibold text-slate-50">
            Les principes EleveAI
          </h2>

          <div className="space-y-3 text-sm text-slate-200">
            {[
              ["L’élève doit essayer", "L’IA questionne avant d’expliquer."],
              ["L’erreur est utile", "On comprend d’abord, on corrige ensuite."],
              [
                "Transparence",
                "Prompts, réponses IA et corrections sont visibles.",
              ],
              [
                "Anti-triche par design",
                "Pas de production prête à rendre.",
              ],
              [
                "Le professeur garde la main",
                "L’IA assiste, ne remplace pas.",
              ],
              [
                "Clarté & accessibilité",
                "Documents simples, Word-friendly, DYS-friendly.",
              ],
              [
                "Sobriété & crédibilité",
                "Pas de gadget, seulement de l’utile.",
              ],
            ].map(([title, text]) => (
              <div
                key={title}
                className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4"
              >
                <p className="font-semibold text-slate-50">{title}</p>
                <p className="text-slate-300">{text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Qui sommes-nous */}
        <div className="rounded-2xl border border-emerald-500/40 bg-slate-900/60 p-5 sm:p-6 space-y-3">
          <h2 className="text-xl font-semibold text-emerald-300">
            Qui sommes-nous ?
          </h2>

          <p className="text-sm text-slate-200">
            Je m’appelle{" "}
            <span className="font-semibold">Frédéric Lacoste</span>, enseignant
            de mathématiques à La Réunion, développeur autodidacte et initiateur
            du projet <span className="font-semibold">EleveAI</span>.
          </p>

          <p className="text-sm text-slate-300">
            Ce “nous” représente une intention : construire une IA au service
            réel des élèves, des enseignants et des familles, en lien avec le
            terrain.
          </p>
        </div>

        {/* Contact */}
        <div className="grid gap-6 sm:grid-cols-[1.4fr,1fr] pt-4 border-t border-slate-800">
          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-50">
              Un projet humain avant tout
            </h2>
            <p className="text-sm text-slate-300">
              EleveAI repose sur des principes simples : questionner, faire
              essayer, corriger, expliquer, renforcer. L’IA aide, elle ne
              remplace pas.
            </p>
          </div>

          {/* CONTACT BOX */}
          <div className="rounded-2xl border border-emerald-500/40 bg-slate-900/70 p-4 sm:p-5 space-y-3">
            <h2 className="text-lg font-semibold text-emerald-300">
              Me contacter
            </h2>
            <p className="text-sm text-slate-300">
              Collaboration, atelier IA, retours terrain :
            </p>

            <div className="flex flex-wrap items-center gap-2">
              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex items-center rounded-xl border border-emerald-500/60 bg-emerald-500/10 px-3 py-2 text-sm font-medium text-emerald-200 hover:bg-emerald-500/20 transition"
              >
                {EMAIL}
              </a>

              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center rounded-xl border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm font-medium text-slate-200 hover:bg-slate-800 transition"
                aria-label="Copier l’adresse email"
              >
                {copied ? "✔ Copié" : "Copier"}
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
