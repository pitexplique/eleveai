"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { saveResultat } from "@/lib/resultats";
import { useEleve } from "@/context/EleveContext";

import {
  useClassBoard,
  ClassBoardToggle,
  classText,
} from "@/components/parcours/ClassBoard";

import { getEvalBlanchePixIa, type PixEvalQuestion } from "@/lib/pix-ia/questions";
import { computePixProfile } from "@/lib/pix-ia/score";
import { PIX_DOMAINES } from "@/lib/pix-ia/referentiel";

type EleveSession = {
  code_etablissement?: string | null;
  code_eleve?: string | null;
  code_utilisateur?: string | null;
  nom?: string | null;
  token?: string | null;
};

const domaineColors: Record<string, string> = {
  "1": "bg-sky-500",
  "2": "bg-violet-500",
  "3": "bg-emerald-500",
};

function barColor(pct: number) {
  if (pct >= 60) return "bg-emerald-500";
  if (pct >= 35) return "bg-amber-500";
  return "bg-rose-500";
}

export default function EvalPixIaClient() {
  const eleveContext = useEleve() as unknown as { eleve?: EleveSession | null };
  const eleve = eleveContext.eleve ?? null;
  const codeEtablissement = eleve?.code_etablissement?.trim() ?? "";
  const codeUtilisateur = eleve?.code_eleve?.trim() ?? eleve?.code_utilisateur?.trim() ?? "";

  const { classBoard, toggleClassBoard } = useClassBoard();

  const [started, setStarted] = useState(false);
  const [questions, setQuestions] = useState<PixEvalQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  const profile = useMemo(() => {
    if (!submitted) return null;
    return computePixProfile(
      questions.map((q) => ({
        competenceId: q.competenceId,
        correct: (answers[q.competenceId] ?? "") === q.correct,
      }))
    );
  }, [submitted, questions, answers]);

  function start() {
    setQuestions(getEvalBlanchePixIa());
    setAnswers({});
    setSubmitted(false);
    setStarted(true);
    setSaveMessage(null);
  }

  function reset() {
    setStarted(false);
    setQuestions([]);
    setAnswers({});
    setSubmitted(false);
    setSaveMessage(null);
  }

  async function enregistrer() {
    if (!profile) return;
    if (!codeEtablissement || !codeUtilisateur) {
      setSaveMessage("Tu dois être connecté pour enregistrer.");
      return;
    }
    setSaving(true);
    const { error } = await saveResultat(eleve, "parcours_ia", {
      niveau: "pix-ia",
      score: profile.totalCorrect,
      total: profile.total,
      details: {
        type: "eval-blanche-pix-ia",
        niveauEstime: profile.niveau.label,
        domaines: profile.domaines,
        competences: profile.competences,
        savedAt: new Date().toISOString(),
      },
    });
    setSaving(false);
    setSaveMessage(error ? "Erreur lors de l'enregistrement." : "Score enregistré ✅");
  }

  // ─── Écran de départ ───
  if (!started) {
    return (
      <main className="min-h-screen bg-[#f0f4ff] px-4 py-8">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6">
            <Link href="/parcours-ia" className="text-sm font-bold text-slate-500 hover:text-slate-800">
              ← Parcours IA
            </Link>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
            <p className="mb-1 text-xs font-black uppercase tracking-widest text-indigo-400">Évaluation blanche</p>
            <h1 className="text-3xl font-black text-indigo-600 sm:text-4xl">🎓 Pix IA</h1>
            <p className="mt-2 text-slate-500 font-medium">
              Entraîne-toi pour l&apos;évaluation nationale <strong>Pix IA</strong>. {questionsCountLabel()} sur les
              3 domaines du référentiel, et tu obtiens ton profil de compétences.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {PIX_DOMAINES.map((d) => (
                <div key={d.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                  <div className="flex items-center gap-2">
                    <span className={`inline-block h-3 w-3 rounded-full ${domaineColors[d.id]}`} />
                    <span className="text-xs font-black uppercase tracking-wide text-slate-500">Domaine {d.id}</span>
                  </div>
                  <p className="mt-1 text-sm font-bold text-slate-800">{d.short}</p>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={start}
              className="mt-8 w-full rounded-2xl bg-indigo-600 px-6 py-4 text-base font-black text-white shadow-lg hover:bg-indigo-500 transition"
            >
              Commencer l&apos;éval blanche →
            </button>
            <p className="mt-3 text-center text-xs text-slate-400">
              Référentiel Pix « Compétences numériques en IA » v2.0 (mai 2026).
            </p>
          </div>
        </div>
      </main>
    );
  }

  // ─── Exercice ───
  if (!submitted) {
    return (
      <main className="min-h-screen bg-[#f0f4ff] px-4 py-6">
        <div className="mx-auto max-w-3xl">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <button type="button" onClick={reset} className="text-sm font-bold text-slate-500 hover:text-slate-800">
              ← Retour
            </button>
            <div className="flex flex-wrap items-center gap-2">
              <ClassBoardToggle classBoard={classBoard} onToggle={toggleClassBoard} />
              <span className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-black text-indigo-700">
                Pix IA · {questions.length} questions
              </span>
            </div>
          </div>

          <div className="space-y-4">
            {questions.map((q, index) => {
              const isAnswered = Boolean(answers[q.competenceId]);
              return (
                <article key={q.competenceId} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-600">
                      {index + 1} / {questions.length}
                    </span>
                    <span className="text-xs font-bold text-slate-400">Compétence {q.competenceId}</span>
                  </div>

                  <p className={`mb-4 font-bold text-slate-800 ${classText.question(classBoard)}`}>{q.text}</p>

                  <div className="grid gap-2 sm:grid-cols-2">
                    {q.shuffledChoices.map((choice) => {
                      const selected = answers[q.competenceId] === choice;
                      return (
                        <button
                          key={choice}
                          type="button"
                          onClick={() => setAnswers((prev) => ({ ...prev, [q.competenceId]: choice }))}
                          className={[
                            "rounded-2xl border px-4 py-3 text-left font-bold transition",
                            classText.choice(classBoard),
                            selected
                              ? "border-indigo-500 bg-indigo-100 text-indigo-950"
                              : "border-slate-200 bg-slate-50 text-slate-800 hover:bg-slate-100",
                          ].join(" ")}
                        >
                          {choice}
                        </button>
                      );
                    })}
                  </div>

                  {isAnswered && <p className="mt-2 text-xs font-bold text-slate-400">Réponse enregistrée.</p>}
                </article>
              );
            })}
          </div>

          <div className="mt-6 flex justify-center">
            <button
              type="button"
              onClick={() => setSubmitted(true)}
              disabled={Object.keys(answers).length < questions.length}
              className="rounded-2xl bg-indigo-600 px-8 py-4 text-base font-black text-white shadow-lg hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50 transition"
            >
              Voir mon profil Pix IA →
            </button>
          </div>
        </div>
      </main>
    );
  }

  // ─── Bilan / profil ───
  return (
    <main className="min-h-screen bg-[#f0f4ff] px-4 py-6">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 text-center">
          <p className="text-xs font-black uppercase tracking-widest text-indigo-400">Niveau estimé</p>
          <p className="mt-1 text-4xl font-black text-indigo-600">{profile?.niveau.label}</p>
          <p className="mt-1 text-lg font-bold text-slate-700">
            {profile?.totalCorrect} / {profile?.total} compétences acquises ({profile?.pct}%)
          </p>
        </div>

        {/* Profil par domaine */}
        <div className="mb-6 rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <p className="mb-3 text-sm font-black uppercase tracking-wider text-slate-500">Profil par domaine</p>
          <div className="space-y-3">
            {profile?.domaines.map((d) => (
              <div key={d.domaineId}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="font-bold text-slate-800">
                    D{d.domaineId} · {d.short}
                  </span>
                  <span className="font-black text-slate-500">
                    {d.correct}/{d.total}
                  </span>
                </div>
                <div className="h-3 w-full overflow-hidden rounded-full bg-slate-100">
                  <div className={`h-full rounded-full ${barColor(d.pct)}`} style={{ width: `${d.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Détail par compétence */}
        <div className="mb-6 space-y-2">
          {profile?.competences.map((c) => (
            <div
              key={c.competenceId}
              className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 shadow-sm ring-1 ring-slate-200"
            >
              <span className="text-sm font-bold text-slate-800">
                <span className="text-slate-400">{c.competenceId}</span> · {c.label}
              </span>
              <span
                className={[
                  "rounded-full px-3 py-1 text-xs font-black",
                  c.correct ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800",
                ].join(" ")}
              >
                {c.correct ? "✅ Acquis" : "❌ À travailler"}
              </span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 justify-center mb-4">
          {eleve && (
            <button
              type="button"
              onClick={enregistrer}
              disabled={saving}
              className="rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-black text-white hover:bg-indigo-500 disabled:opacity-60 transition"
            >
              {saving ? "Enregistrement…" : "✅ Enregistrer mon score"}
            </button>
          )}
          <button
            type="button"
            onClick={reset}
            className="rounded-2xl bg-white px-5 py-3 text-sm font-black text-slate-800 ring-1 ring-slate-200 hover:bg-slate-50 transition"
          >
            Recommencer
          </button>
          <Link
            href="/coach-ia/ia"
            className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-black text-white hover:bg-slate-800 transition"
          >
            M&apos;entraîner avec le Coach IA →
          </Link>
        </div>

        {saveMessage && (
          <p
            className={[
              "rounded-2xl px-4 py-3 text-sm font-black text-center",
              saveMessage.includes("✅") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800",
            ].join(" ")}
          >
            {saveMessage}
          </p>
        )}
      </div>
    </main>
  );
}

function questionsCountLabel() {
  return "16 questions";
}
