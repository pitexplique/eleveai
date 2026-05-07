"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { problemesFixed } from "@/lib/probleme-du-jour/problemes.fixed";
import { problemeDuJourWeekly } from "@/lib/probleme-du-jour/weekly";

export default function ProblemeDuJourPage() {
  const probleme = useMemo(() => {
    const today = new Date().getDay();

    const mapping: Record<number, number> = {
      1: 0, // lundi
      2: 1, // mardi
      3: 2, // mercredi
      4: 3, // jeudi
      5: 4, // vendredi
      6: 4, // samedi
      0: 4, // dimanche
    };

    const index = mapping[today] ?? 0;
    const dayConfig = problemeDuJourWeekly.days[index];

    return (
      problemesFixed.find((p) => p.id === dayConfig.problemId) ??
      problemesFixed[0]
    );
  }, []);

  const [selectedDirectionId, setSelectedDirectionId] = useState<string | null>(
    null
  );

  const [answer, setAnswer] = useState("");
  const [showCorrection, setShowCorrection] = useState(false);

  const selectedDirection = probleme.directions.find(
    (d) => d.id === selectedDirectionId
  );

  function normalize(value: string) {
    return value.trim().replace(",", ".").toLowerCase();
  }

  const normalizedAnswer = normalize(answer);

  const isCorrect =
    normalizedAnswer === normalize(probleme.expectedAnswer) ||
    normalizedAnswer.includes(normalize(probleme.expectedAnswer));

  return (
    <main
      className="min-h-screen bg-cover bg-center bg-fixed px-4 py-8 text-white"
      style={{
        backgroundImage: "url('/images/reunion.png')",
      }}
    >
      {/* overlay sombre */}
      <div className="absolute inset-0 bg-slate-950/55" />

      {/* contenu */}
      <section className="relative z-10 mx-auto max-w-3xl space-y-6">
        <div className="text-sm text-slate-300">
          <Link href="/accueil" className="hover:text-emerald-300">
            Accueil
          </Link>{" "}
          / Problème du jour
        </div>

        <header className="rounded-3xl border border-emerald-500/30 bg-slate-900/85 p-6 shadow-2xl backdrop-blur-sm">
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-emerald-300">
            Problème du jour · {probleme.theme}
          </p>

          <h1 className="text-2xl font-black text-white">
            {probleme.title}
          </h1>

          <p className="mt-4 text-base leading-relaxed text-slate-100">
            {probleme.statement}
          </p>

          <p className="mt-4 rounded-2xl bg-emerald-400/10 p-4 text-lg font-bold text-emerald-200">
            {probleme.question}
          </p>
        </header>

        <section className="rounded-3xl border border-slate-700 bg-slate-900/85 p-5 backdrop-blur-sm">
          <h2 className="mb-4 text-lg font-black text-white">
            Par quelle direction veux-tu commencer ?
          </h2>

          <div className="grid gap-3 sm:grid-cols-2">
            {probleme.directions.map((direction) => {
              const active = selectedDirectionId === direction.id;

              return (
                <button
                  key={direction.id}
                  type="button"
                  onClick={() => {
                    setSelectedDirectionId(direction.id);
                    setAnswer("");
                    setShowCorrection(false);
                  }}
                  className={`rounded-2xl border p-4 text-left text-sm font-bold transition ${
                    active
                      ? "border-emerald-400 bg-emerald-400/10 text-emerald-200"
                      : "border-slate-700 bg-slate-950/80 text-slate-200 hover:bg-slate-800"
                  }`}
                >
                  {direction.label}
                </button>
              );
            })}
          </div>
        </section>

        {selectedDirection ? (
          <section className="rounded-3xl border border-slate-700 bg-slate-900/85 p-5 backdrop-blur-sm">
            <p className="text-sm font-black text-emerald-300">
              {selectedDirection.label}
            </p>

            <p className="mt-3 text-sm leading-relaxed text-slate-100">
              {selectedDirection.content}
            </p>

            <div className="mt-5 space-y-3">
              <label className="block text-sm font-bold text-slate-200">
                Ta réponse
              </label>

              {selectedDirection.type === "open" ? (
                <textarea
                  value={answer}
                  onChange={(e) => {
                    setAnswer(e.target.value);
                    setShowCorrection(false);
                  }}
                  placeholder="Explique ta méthode avec tes mots..."
                  className="min-h-28 w-full rounded-2xl border border-slate-700 bg-slate-950/90 p-4 text-sm text-white outline-none focus:border-emerald-400"
                />
              ) : (
                <input
                  value={answer}
                  onChange={(e) => {
                    setAnswer(e.target.value);
                    setShowCorrection(false);
                  }}
                  placeholder="Exemple : 15"
                  className="w-full rounded-2xl border border-slate-700 bg-slate-950/90 p-4 text-sm text-white outline-none focus:border-emerald-400"
                />
              )}

              <button
                type="button"
                onClick={() => setShowCorrection(true)}
                disabled={!answer.trim()}
                className="rounded-2xl bg-emerald-400 px-5 py-3 text-sm font-black text-slate-950 hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Vérifier
              </button>
            </div>
          </section>
        ) : null}

        {showCorrection ? (
          <section className="rounded-3xl border border-emerald-500/30 bg-emerald-500/10 p-5 backdrop-blur-sm">
            {selectedDirection?.type !== "open" ? (
              <p className="text-lg font-black text-emerald-300">
                {isCorrect
                  ? "✅ Bonne réponse !"
                  : "🦎 Tu es sur la bonne piste."}
              </p>
            ) : (
              <p className="text-lg font-black text-emerald-300">
                🦎 Merci pour ton explication.
              </p>
            )}

            <p className="mt-3 text-sm leading-relaxed text-slate-100">
              {probleme.explanation}
            </p>
          </section>
        ) : null}
      </section>
    </main>
  );
}