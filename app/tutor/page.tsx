"use client";

import { useMemo, useState } from "react";

type StartResponse = {
  sessionId: string;
  question: {
    id: string;
    notionId: string;
    text: string;
    format: "short" | "qcm";
    choices?: string[];
    hint?: string;
  };
  notionCatalog: Array<{ id: string; label: string }>;
  mastery: {
    boMastery: Record<string, number>;
    notionMastery: Record<string, number>;
  };
  mode: "evaluation" | "coaching";
};

type MessageResponse = {
  feedback: string;
  result: { ok: boolean; flags: string[] };
  nextQuestion: {
    id: string;
    notionId: string;
    text: string;
    format: "short" | "qcm";
    choices?: string[];
    hint?: string;
  };
  mastery: {
    boMastery: Record<string, number>;
    notionMastery: Record<string, number>;
  };
  mode: "evaluation" | "coaching";
};

export default function TutorPage() {
  const [classe] = useState("6e");
  const [matiere] = useState("maths");
  const [style, setStyle] = useState<"dys" | "middle" | "challenge">("middle");
  const [notion, setNotion] = useState("fractions");

  const [sessionId, setSessionId] = useState<string | null>(null);
  const [question, setQuestion] = useState<StartResponse["question"] | null>(null);
  const [feedback, setFeedback] = useState("");
  const [answer, setAnswer] = useState("");
  const [mode, setMode] = useState<"evaluation" | "coaching">("evaluation");
  const [notionCatalog, setNotionCatalog] = useState<Array<{ id: string; label: string }>>([]);
  const [boMastery, setBoMastery] = useState<Record<string, number>>({});
  const [notionMastery, setNotionMastery] = useState<Record<string, number>>({});

  const notionLabel = useMemo(() => {
    return notionCatalog.find((n) => n.id === notion)?.label ?? notion;
  }, [notionCatalog, notion]);

  async function startTutor() {
    setFeedback("");
    setAnswer("");

    const res = await fetch("/api/tutor/start", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ classe, matiere, notion, style }),
    });

    const data = (await res.json()) as StartResponse | { error: string };
    if (!res.ok || "error" in data) {
      setFeedback("Impossible de démarrer le tutor.");
      return;
    }

    setSessionId(data.sessionId);
    setQuestion(data.question);
    setNotionCatalog(data.notionCatalog);
    setBoMastery(data.mastery.boMastery);
    setNotionMastery(data.mastery.notionMastery);
    setMode(data.mode);
  }

  async function sendAnswer() {
    if (!sessionId || !question) return;

    const res = await fetch("/api/tutor/message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId, answer }),
    });

    const data = (await res.json()) as MessageResponse | { error: string };
    if (!res.ok || "error" in data) {
      setFeedback("Erreur pendant l'échange.");
      return;
    }

    setFeedback(data.feedback);
    setQuestion(data.nextQuestion);
    setBoMastery(data.mastery.boMastery);
    setNotionMastery(data.mastery.notionMastery);
    setMode(data.mode);
    setAnswer("");
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <header className="space-y-2">
          <div className="inline-flex rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-900">
            Tutor V1 — graphe + moteur déterministe
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900">Tuteur IA — EleveAI</h1>
          <p className="text-sm text-slate-700">
            L’élève choisit une notion. Le tutor démarre avec cette notion, puis revient sur les prérequis si nécessaire.
          </p>
        </header>

        <section className="grid gap-4 md:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <label className="mb-2 block text-xs font-semibold text-slate-600">Classe</label>
            <input
              value={classe}
              disabled
              className="w-full rounded-xl border border-slate-300 bg-slate-100 px-3 py-2 text-sm text-slate-700 shadow-sm"
            />
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <label className="mb-2 block text-xs font-semibold text-slate-600">Matière</label>
            <input
              value={matiere}
              disabled
              className="w-full rounded-xl border border-slate-300 bg-slate-100 px-3 py-2 text-sm text-slate-700 shadow-sm"
            />
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <label className="mb-2 block text-xs font-semibold text-slate-600">Profil</label>
            <select
              value={style}
              onChange={(e) => setStyle(e.target.value as "dys" | "middle" | "challenge")}
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
            >
              <option value="dys">DYS</option>
              <option value="middle">Standard</option>
              <option value="challenge">Challenge</option>
            </select>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <label className="mb-2 block text-xs font-semibold text-slate-600">Notion</label>
            <select
              value={notion}
              onChange={(e) => setNotion(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
            >
              {[
                { id: "decimaux", label: "Nombres décimaux" },
                { id: "fractions", label: "Fractions" },
                { id: "proportionnalite", label: "Proportionnalité" },
                { id: "perimetre", label: "Périmètre" },
                { id: "aires", label: "Aires" },
                { id: "angles", label: "Angles" },
              ].map((n) => (
                <option key={n.id} value={n.id}>
                  {n.label}
                </option>
              ))}
            </select>
          </div>
        </section>

        <div>
          <button
            onClick={startTutor}
            className="rounded-xl bg-sky-700 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-600"
          >
            Démarrer le tutor
          </button>
        </div>

        <section className="grid gap-6 md:grid-cols-[2fr_1fr]">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <div className="text-sm font-semibold text-slate-800">
                {question ? `Notion en cours : ${notionLabel}` : "En attente de démarrage"}
              </div>
              <div
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  mode === "evaluation"
                    ? "bg-amber-100 text-amber-900"
                    : "bg-emerald-100 text-emerald-900"
                }`}
              >
                {mode === "evaluation" ? "Mode évaluation" : "Mode coaching"}
              </div>
            </div>

            {question ? (
              <div className="space-y-4">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 shadow-sm">
                  <p className="text-base font-medium text-slate-900">{question.text}</p>

                  {question.format === "qcm" && question.choices?.length ? (
                    <div className="mt-3 grid gap-2">
                      {question.choices.map((choice, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setAnswer(choice)}
                          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-left text-sm text-slate-900 shadow-sm hover:bg-slate-50"
                        >
                          {choice}
                        </button>
                      ))}
                    </div>
                  ) : null}

                  {mode === "coaching" && question.hint ? (
                    <p className="mt-3 text-xs text-slate-600">
                      <span className="font-semibold">Indice :</span> {question.hint}
                    </p>
                  ) : null}
                </div>

                <div className="flex gap-2">
                  <input
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="Ta réponse..."
                    className="flex-1 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                  />
                  <button
                    onClick={sendAnswer}
                    className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800"
                  >
                    Envoyer
                  </button>
                </div>

                {feedback ? (
                  <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 shadow-sm">
                    {feedback}
                  </div>
                ) : null}
              </div>
            ) : (
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600 shadow-sm">
                Choisis une notion puis clique sur “Démarrer le tutor”.
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <h2 className="mb-3 text-sm font-bold text-slate-900">BO mastery</h2>
              <div className="space-y-3">
                {Object.entries(boMastery).map(([key, value]) => (
                  <div key={key}>
                    <div className="mb-1 flex justify-between text-xs text-slate-700">
                      <span>{key}</span>
                      <span>{Math.round(value)}</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-100">
                      <div
                        className="h-2 rounded-full bg-sky-500"
                        style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <h2 className="mb-3 text-sm font-bold text-slate-900">Notion mastery</h2>
              <div className="space-y-3">
                {Object.entries(notionMastery).map(([key, value]) => (
                  <div key={key}>
                    <div className="mb-1 flex justify-between text-xs text-slate-700">
                      <span>{key}</span>
                      <span>{Math.round(value)}</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-100">
                      <div
                        className="h-2 rounded-full bg-emerald-500"
                        style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}