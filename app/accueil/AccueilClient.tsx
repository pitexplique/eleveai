"use client";

import Link from "next/link";
import DefiDuJourCard from "@/components/defis/DefiDuJourCard";
import { getDefiDuJour } from "@/lib/defis/helpers";

export default function AccueilPage() {
  // 🔹 Récupère automatiquement le défi du jour
  const defiDuJour = getDefiDuJour();

  // 🔹 Carte réutilisable pour les 3 piliers
  const Card = ({
    id,
    badge,
    title,
    description,
    details,
    href,
    cta,
    variant = "blue",
  }: {
    id: string;
    badge: string;
    title: string;
    description: string;
    details: string;
    href: string;
    cta: string;
    variant?: "blue" | "slate" | "emerald";
  }) => {
    const styles = {
      blue: {
        badge: "border-cyan-200 bg-cyan-50 text-cyan-700",
        button:
          "bg-gradient-to-r from-cyan-500 to-sky-600 text-white hover:from-cyan-400 hover:to-sky-500",
      },
      slate: {
        badge: "border-slate-200 bg-slate-100 text-slate-700",
        button:
          "bg-gradient-to-r from-slate-900 to-slate-700 text-white hover:from-slate-800 hover:to-slate-600",
      },
      emerald: {
        badge: "border-emerald-200 bg-emerald-50 text-emerald-700",
        button:
          "bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-500 hover:to-teal-500",
      },
    };

    const current = styles[variant];

    return (
      <div
        id={id}
        className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
      >
        {/* Badge */}
        <div
          className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${current.badge}`}
        >
          {badge}
        </div>

        {/* Titre */}
        <h3 className="mt-4 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
          {title}
        </h3>

        {/* Description */}
        <p className="mt-4 text-sm leading-relaxed text-slate-700 sm:text-base">
          {description}
        </p>

        {/* Détails */}
        <p className="mt-3 text-sm leading-relaxed text-slate-500">
          {details}
        </p>

        {/* Bouton */}
        <div className="mt-6">
          <Link
            href={href}
            className={`inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold shadow-sm transition ${current.button}`}
          >
            {cta} →
          </Link>
        </div>
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="border-y border-slate-200 bg-gradient-to-b from-white to-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          {/* En-tête principal */}
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-orange-500">
              Mi ed a zot
            </p>

            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Trois piliers pour structurer EleveAI
            </h1>

            <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
              Une architecture simple et lisible : sécuriser les usages,
              optimiser les prompts, développer des systèmes d’apprentissage.
            </p>
          </div>

          {/* Les 3 cartes principales */}
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            <Card
              id="securiser"
              badge="Profs · élèves"
              title="Sécuriser vos prompts"
              description="Un cadre pour produire des demandes plus claires, plus fiables et plus adaptées au contexte scolaire."
              details="Objectif : éviter les prompts flous, les réponses instables, les oublis de critères et les usages peu maîtrisés."
              href="/espace-profs"
              cta="Sécuriser mes prompts"
              variant="emerald"
            />

            <Card
              id="valeria"
              badge="Valeria"
              title="Optimiser vos prompts"
              description="Valeria évalue, score et améliore un prompt pour le rendre plus robuste, plus exploitable et plus constant."
              details="Le prompt devient une vraie base de travail : plus clair, plus structuré, plus facile à réutiliser."
              href="/optimiseur"
              cta="Ouvrir Valeria"
              variant="slate"
            />

            <Card
              id="tutor"
              badge="Tutor"
              title="Système d’apprentissage"
              description="Un tutorat IA orienté progression : adaptation, accompagnement, consolidation et suivi."
              details="L’objectif n’est pas de remplacer l’enseignant, mais de renforcer l’apprentissage par étapes."
              href="/tutor-v4"
              cta="Découvrir Tutor"
              variant="blue"
            />
          </div>

          {/* Bloc Défi IA du jour */}
          <div className="mt-20">
            <div className="mx-auto max-w-4xl text-center">
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-indigo-600">
                Défi IA du jour
              </p>

              <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                Une question pour réfléchir à l’IA
              </h2>

              <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                Réponds en quelques secondes, puis découvre une idée
                essentielle sur l’utilité de l’intelligence artificielle.
              </p>
            </div>

            {/* Carte interactive du défi du jour */}
            <div className="mt-8 mx-auto max-w-3xl">
              <div className="rounded-3xl border border-indigo-100 bg-white p-2 shadow-sm">
                <DefiDuJourCard defi={defiDuJour} />
              </div>
            </div>

            {/* Lien vers le répertoire complet des défis */}
            <div className="mt-6 text-center">
              <Link
                href="/defis"
                className="text-sm font-semibold text-slate-600 transition hover:text-indigo-700"
              >
                Voir tous les défis →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}