"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import { createClient } from "@/lib/supabase/client";
import { useEleve } from "@/context/EleveContext";

import { problemesFixed } from "@/lib/defis-du-jour/problemes.fixed";
import { problemeDuJourWeekly } from "@/lib/defis-du-jour/weekly";

type EleveSession = {
  acces_id?: string | null;
  code_etablissement?: string | null;
  code_eleve?: string | null;
  code_utilisateur?: string | null;
  nom?: string | null;
  type_utilisateur?: string | null;
};

export default function DefisDuJourPage() {
  const supabase = createClient();

  const eleveContext = useEleve() as unknown as {
    eleve?: EleveSession | null;
    currentUser?: EleveSession | null;
    user?: EleveSession | null;
  };

  const eleve =
    eleveContext.eleve ?? eleveContext.currentUser ?? eleveContext.user ?? null;

  const defi = useMemo(() => {
    const today = new Date().getDay();

    const mapping: Record<number, number> = {
      0: 6,
      1: 0,
      2: 1,
      3: 2,
      4: 3,
      5: 4,
      6: 5,
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

  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [hasSaved, setHasSaved] = useState(false);

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

  const score = selectedDirection?.type === "open" ? 1 : isCorrect ? 1 : 0;
  const total = 1;

  function resetAnswer() {
    setAnswer("");
    setShowCorrection(false);
    setSaveMessage(null);
    setHasSaved(false);
  }

  function handleVerify() {
    setShowCorrection(true);
    setSaveMessage(null);
  }

  async function enregistrerResultatDefiJour() {
    setSaveMessage(null);

    if (!eleve) {
      setSaveMessage("Tu dois être connecté pour enregistrer ton défi.");
      return;
    }

    if (!showCorrection) {
      setSaveMessage("Regarde d’abord la correction avant d’enregistrer.");
      return;
    }

    if (!selectedDirection) {
      setSaveMessage("Choisis d’abord un chemin.");
      return;
    }

    if (hasSaved) {
      setSaveMessage("Défi déjà enregistré ✅");
      return;
    }

    const codeEtablissement = eleve.code_etablissement?.trim() ?? "";
    const codeUtilisateur =
      eleve.code_eleve?.trim() ?? eleve.code_utilisateur?.trim() ?? "";

    if (!codeEtablissement || !codeUtilisateur) {
      setSaveMessage("Impossible d’identifier ton compte élève.");
      return;
    }

    setSaving(true);

    const { error } = await supabase.from("resultats_defis_jour").insert({
      code_etablissement: codeEtablissement,
      code_utilisateur: codeUtilisateur,
      nom: eleve.nom ?? null,

      classe: null,
      niveau: null,
      matiere: "maths",

      defi_id: defi.id,
      titre_defi: defi.title,
      theme: defi.theme,
      direction_id: selectedDirection.id,
      direction_label: selectedDirection.label,
      direction_type: selectedDirection.type,

      score,
      total,

      reponse_eleve: answer,
      reponse_attendue: defi.expectedAnswer,

      details: {
        defi: {
          id: defi.id,
          title: defi.title,
          theme: defi.theme,
          level: defi.level ?? null,
          statement: defi.statement,
          question: defi.question,
          expectedAnswer: defi.expectedAnswer,
          explanation: defi.explanation,
        },
        direction: selectedDirection,
        answer,
        isCorrect:
          selectedDirection.type === "open" ? null : isCorrect,
        score,
        total,
        savedAt: new Date().toISOString(),
      },
    });

    setSaving(false);

    if (error) {
      console.error(error);
      setSaveMessage("Erreur : le défi n’a pas été enregistré.");
      return;
    }

    setHasSaved(true);
    setSaveMessage("Défi enregistré ✅ Tu peux le retrouver dans ton dashboard.");
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

            {eleve ? (
              <div className="mt-3 rounded-2xl border border-emerald-300/30 bg-emerald-300/10 px-3 py-2 text-xs font-black text-emerald-100">
                Connecté : {eleve.nom ?? "Élève"} ·{" "}
                {eleve.code_etablissement ?? ""} ·{" "}
                {eleve.code_eleve ?? eleve.code_utilisateur ?? ""}
              </div>
            ) : (
              <div className="mt-3 rounded-2xl border border-amber-300/30 bg-amber-300/10 px-3 py-2 text-xs font-black text-amber-100">
                Tu peux faire le défi librement. Il faudra être connecté pour
                enregistrer ta progression.
              </div>
            )}
          </div>

          <div className="border-y border-white/10 bg-slate-950/40">
            <img
              src={defi.image ?? "/images/defis-du-jour/grand raid.webp"}
              alt={defi.title}
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
                    setSaveMessage(null);
                    setHasSaved(false);
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
                    setSaveMessage(null);
                    setHasSaved(false);
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

            <div className="mt-4 rounded-3xl border border-white/10 bg-slate-950/50 p-4">
              <p className="text-sm font-bold text-slate-200">
                {eleve
                  ? "Tu peux enregistrer ce défi dans ton tableau de bord."
                  : "Tu peux faire le défi librement, mais il faut être connecté pour enregistrer ta progression."}
              </p>

              <div className="mt-3 flex flex-wrap gap-3">
                {eleve ? (
                  <button
                    type="button"
                    onClick={enregistrerResultatDefiJour}
                    disabled={saving || hasSaved}
                    className="rounded-2xl bg-emerald-400 px-5 py-2.5 text-sm font-black text-slate-950 transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {saving
                      ? "Enregistrement..."
                      : hasSaved
                        ? "✅ Défi enregistré"
                        : "✅ Enregistrer mon défi"}
                  </button>
                ) : (
                  <Link
                    href="/auth/signin-eleve"
                    className="rounded-2xl bg-amber-300 px-5 py-2.5 text-sm font-black text-slate-950 transition hover:bg-amber-200"
                  >
                    Se connecter pour enregistrer
                  </Link>
                )}

                <Link
                  href="/dashboard-eleve"
                  className="rounded-2xl bg-white/10 px-5 py-2.5 text-sm font-black text-white ring-1 ring-white/15 hover:bg-white/15"
                >
                  Mon dashboard
                </Link>
              </div>

              {saveMessage ? (
                <p className="mt-3 rounded-2xl bg-slate-950/80 px-4 py-3 text-sm font-black text-white">
                  {saveMessage}
                </p>
              ) : null}
            </div>
          </section>
        ) : null}
      </section>
    </main>
  );
}