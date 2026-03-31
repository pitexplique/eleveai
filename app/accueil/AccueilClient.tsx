"use client";

import Link from "next/link";

export default function AccueilPage() {
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
        badge: "border-amber-200 bg-amber-50 text-amber-700",
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
        className="rounded-3xl border border-orange-100 bg-white/95 p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
      >
        <div
          className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${current.badge}`}
        >
          {badge}
        </div>

        <h3 className="mt-4 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
          {title}
        </h3>

        <p className="mt-4 text-sm leading-relaxed text-slate-700 sm:text-base">
          {description}
        </p>

        <p className="mt-3 text-sm leading-relaxed text-slate-500">
          {details}
        </p>

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
    <main className="min-h-screen bg-[#fffaf2] text-slate-900">
      <section className="border-y border-orange-100 bg-gradient-to-b from-[#fff6e7] to-[#fffaf2]">
                <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-orange-500">
              Défis du jour
            </p>

            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Trois piliers pour structurer EleveAI
            </h1>

            <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
               “Et si l’IA te donnait toujours la réponse…  saurais-tu encore apprendre ?”
            </p>
           <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
               “”
            </p>
          </div>
        </div>
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
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
        </div>
      </section>
    </main>
  );
}