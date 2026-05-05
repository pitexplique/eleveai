"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

const classes = ["6e", "5e", "4e", "3e"] as const;

const competences = [
  {
    nom: "Décimaux",
    notionId: "decimaux",
    niveau: "Bien avancé",
    couleur: "bg-green-500",
    etoiles: "⭐⭐⭐",
  },
  {
    nom: "Fractions",
    notionId: "fractions",
    niveau: "En progression",
    couleur: "bg-yellow-500",
    etoiles: "⭐⭐",
  },
  {
    nom: "Proportionnalité",
    notionId: "proportionnalite",
    niveau: "À renforcer",
    couleur: "bg-red-500",
    etoiles: "⭐",
  },
  {
    nom: "Aires et périmètres",
    notionId: "aires",
    niveau: "Bientôt",
    couleur: "bg-slate-500",
    etoiles: "🔒",
    disabled: true,
  },
];

export default function ParcoursClient() {
  const router = useRouter();
  const [classe, setClasse] = useState<(typeof classes)[number]>("6e");

  const visibleCompetences = useMemo(() => competences, []);

  function startParcours(notionId: string, disabled?: boolean) {
    if (disabled) return;

    router.push(
      `/tutor-v4?classe=${classe}&matiere=maths&notion=${notionId}`
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-white sm:px-6 sm:py-10">
      <section className="mx-auto max-w-5xl">
        <div className="rounded-3xl border border-violet-500/30 bg-slate-900/80 p-5 shadow-xl sm:p-8">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-violet-300">
            Parcours maths
          </p>

          <h1 className="mb-4 text-3xl font-black text-violet-300 sm:text-4xl">
            Parcours EleveAI
          </h1>

          <p className="mb-6 max-w-3xl text-base text-slate-200 sm:text-lg">
            Choisis ta classe, puis une notion. EleveAI te guide ensuite vers
            les exercices adaptés pour progresser étape par étape.
          </p>

          <div className="mb-8">
            <h2 className="mb-3 text-lg font-bold text-violet-200">
              Choisis ta classe
            </h2>

            <div className="grid grid-cols-4 gap-2 sm:flex sm:gap-3">
              {classes.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setClasse(c)}
                  className={[
                    "rounded-2xl px-4 py-3 text-lg font-black transition",
                    classe === c
                      ? "bg-violet-500 text-white shadow-lg shadow-violet-500/30"
                      : "bg-slate-800 text-slate-200 hover:bg-slate-700",
                  ].join(" ")}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h2 className="mb-3 text-lg font-bold text-violet-200">
              Choisis une notion
            </h2>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {visibleCompetences.map((competence) => (
                <button
                  key={competence.notionId}
                  type="button"
                  disabled={competence.disabled}
                  onClick={() =>
                    startParcours(competence.notionId, competence.disabled)
                  }
                  className={[
                    "rounded-2xl border border-white/10 bg-slate-800 p-5 text-left transition",
                    competence.disabled
                      ? "cursor-not-allowed opacity-60"
                      : "cursor-pointer hover:-translate-y-1 hover:bg-slate-700 hover:shadow-lg",
                  ].join(" ")}
                >
                  <div
                    className={`mb-4 h-3 w-16 rounded-full ${competence.couleur}`}
                  />

                  <h3 className="text-lg font-bold">{competence.nom}</h3>

                  <p className="mt-2 text-sm text-slate-300">
                    {competence.niveau}
                  </p>

                  <p className="mt-3 text-xl">{competence.etoiles}</p>

                  {!competence.disabled && (
                    <p className="mt-4 text-sm font-bold text-violet-300">
                      Commencer →
                    </p>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-violet-950/50 p-5 text-slate-100">
            <h2 className="mb-2 text-xl font-semibold text-violet-200">
              Objectif du parcours
            </h2>
            <p>
              Identifier les points forts, repérer les compétences à renforcer,
              proposer des exercices adaptés et garder une trace des progrès.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}