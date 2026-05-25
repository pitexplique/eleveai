"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { problemesFixed } from "@/lib/defis-du-jour/problemes.fixed";
import { problemeDuJourWeekly } from "@/lib/defis-du-jour/weekly";

export default function DefisDuJourPage() {
  const defi = useMemo(() => {
    const today = new Date().getDay();

    // getDay() :
    // dimanche = 0, lundi = 1, mardi = 2, ...
    const mapping: Record<number, number> = {
      0: 6, // dimanche
      1: 0, // lundi
      2: 1, // mardi
      3: 2, // mercredi
      4: 3, // jeudi
      5: 4, // vendredi
      6: 5, // samedi
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

  const selectedDirection = defi.directions.find(
    (d) => d.id === selectedDirectionId
  );

  function normalize(value: string) {
    return value
      .trim()
      .replace(",", ".")
      .replace(/\s+/g, " ")
      .toLowerCase();
  }

  const normalizedAnswer = normalize(answer);

  const isCorrect =
    normalizedAnswer === normalize(defi.expectedAnswer) ||
    normalizedAnswer.includes(normalize(defi.expectedAnswer));

  function resetAnswer() {
    setAnswer("");
    setShowCorrection(false);
  }

  function handleVerify() {
    setShowCorrection(true);
  }

  return (
    <main
      className="relative min-h-screen bg-cover bg-center px-4 py-6 text-white"
      style={{
        backgroundImage: "url('/images/reunion.png')",
      }}
    >
      <div className="absolute inset-0 bg-slate-950/60" />

      <section className="relative z-10 mx-auto max-w-3xl space-y-5">
        <div className="text-xs text-slate-300">
          <Link href="/accueil" className="hover:text-emerald-300">
            Accueil
          </Link>{" "}
          / Défis du jour
        </div>

        <header className="overflow-hidden rounded-3xl border border-emerald-500/30 bg-slate-900/75 shadow-2xl backdrop-blur-sm">
          <div className="p-4">
            <p className="mb-1 text-[11px] font-bold uppercase tracking-wide text-emerald-300">
              Défi du jour · {defi.theme}
            </p>

            <h1 className="text-xl font-black text-white sm:text-2xl">
              {defi.title}
            </h1>
          </div>

          <div className="border-y border-white/10 bg-slate-950/40">
            <img
              src="/images/defis-du-jour/hydro-tanika.webp"
              alt="Projet Hydro Tanika à La Réunion : bassin en altitude et océan"
              className="h-auto w-full object-cover"
            />
          </div>

          <div className="space-y-3 p-4">
            <p className="text-sm leading-relaxed text-slate-100 sm:text-base">
              {defi.statement}
            </p>

            <p className="rounded-2xl bg-emerald-400/10 p-3 text-base font-bold leading-relaxed text-emerald-200">
              {defi.question}
            </p>
          </div>
        </header>

        <section className="rounded-3xl border border-slate-700 bg-slate-900/75 p-4 backdrop-blur-sm">
          <h2 className="mb-3 text-base font-black text-white">
            Choisis ton chemin 🧭
          </h2>

          <div className="grid gap-2 sm:grid-cols-2">
            {defi.directions.map((direction) => {
              const active = selectedDirectionId === direction.id;

              return (
                <button
                  key={direction.id}
                  type="button"
                  onClick={() => {
                    setSelectedDirectionId(direction.id);
                    resetAnswer();
                  }}
                  className={`rounded-2xl border p-3 text-left text-sm font-bold transition ${
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
          <section className="rounded-3xl border border-slate-700 bg-slate-900/75 p-4 backdrop-blur-sm">
            <p className="text-sm font-black text-emerald-300">
              {selectedDirection.label}
            </p>

            <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-slate-100">
              {selectedDirection.content}
            </p>

            <div className="mt-4 space-y-2">
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
                  placeholder="Explique comment tu as réfléchi..."
                  className="min-h-24 w-full rounded-2xl border border-slate-700 bg-slate-950/90 p-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-emerald-400"
                />
              ) : (
                <input
                  value={answer}
                  onChange={(e) => {
                    setAnswer(e.target.value);
                    setShowCorrection(false);
                  }}
                  placeholder="Écris ta réponse..."
                  className="w-full rounded-2xl border border-slate-700 bg-slate-950/90 p-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-emerald-400"
                />
              )}

              <button
                type="button"
                onClick={handleVerify}
                disabled={!answer.trim()}
                className="rounded-2xl bg-emerald-400 px-5 py-2.5 text-sm font-black text-slate-950 transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Voir la correction
              </button>
            </div>
          </section>
        ) : null}

        {showCorrection ? (
          <section className="rounded-3xl border border-emerald-500/30 bg-emerald-500/10 p-4 backdrop-blur-sm">
            {selectedDirection?.type !== "open" ? (
              <p className="text-base font-black text-emerald-300">
                {isCorrect
                  ? "✅ Bonne réponse !"
                  : "🦎 Tu es sur la bonne piste. Regarde la correction."}
              </p>
            ) : (
              <p className="text-base font-black text-emerald-300">
                🦎 Merci pour ton explication.
              </p>
            )}

            <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-slate-100">
              {defi.explanation}
            </p>
          </section>
        ) : null}
      </section>
    </main>
  );
}