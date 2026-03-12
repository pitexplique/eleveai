"use client";

import { useState } from "react";

type StarLevel = 1 | 2 | 3 | 4 | 5;
type ConfidenceLevel = 1 | 2 | 3;

type TutorQuestionOption = {
  id: string;
  notionId: string;
  microId: string;
  text: string;
  format: "short" | "qcm";
  choices?: string[];
  expected: string[];
  comparator:
    | "exact_text"
    | "mcq_exact"
    | "number_equal"
    | "fraction_decimal_equivalent"
    | "contains_keyword";
  hint?: string;
  meta: {
    familyId: string;
    theme: "neutral" | "reunion" | "sport" | "cuisine" | "jeux_video";
    supportLevel: "low" | "medium" | "high";
    readingLoad: "short" | "medium" | "long";
    challengeType: "direct" | "guided" | "transfer" | "challenge";
    starLevel: StarLevel;
  };
};

type TutorQuestionPair = {
  pairId: string;
  notionId: string;
  microId: string;
  recommendedStar: StarLevel;
  optionA: TutorQuestionOption;
  optionB: TutorQuestionOption;
};

type StartResponse = {
  sessionId: string;
  pair: TutorQuestionPair;
  mode: "evaluation" | "coaching";
  recommendedStar: StarLevel;
  notionCatalog: Array<{ id: string; label: string }>;
  mastery: {
    boMastery: Record<string, number>;
    notionMastery: Record<string, number>;
    microMastery: Record<string, number>;
  };
};

type AnswerResponse = {
  feedback: string;
  result: {
    ok: boolean;
    flags: string[];
  };
  pair: TutorQuestionPair;
  mode: "evaluation" | "coaching";
  recommendedStar: StarLevel;
  mastery: {
    boMastery: Record<string, number>;
    notionMastery: Record<string, number>;
    microMastery: Record<string, number>;
  };
};

function stars(level: StarLevel) {
  return "⭐".repeat(level);
}

export default function TutorV4Page() {
  const [classe] = useState("6e");
  const [matiere] = useState("maths");
  const [style, setStyle] = useState<"dys" | "middle" | "challenge">("middle");
  const [notion, setNotion] = useState("fractions");

  const [sessionId, setSessionId] = useState<string | null>(null);
  const [pair, setPair] = useState<TutorQuestionPair | null>(null);
  const [mode, setMode] = useState<"evaluation" | "coaching">("evaluation");
  const [recommendedStar, setRecommendedStar] = useState<StarLevel>(2);

  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [confidence, setConfidence] = useState<ConfidenceLevel | null>(null);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");

  const [boMastery, setBoMastery] = useState<Record<string, number>>({});
  const [notionMastery, setNotionMastery] = useState<Record<string, number>>({});
  const [microMastery, setMicroMastery] = useState<Record<string, number>>({});
  const [sessionResults, setSessionResults] = useState<boolean[]>([]);

  const [busy, setBusy] = useState(false);

  const workedMicros = Object.values(microMastery).filter((v) => v !== 50);

  const averageWorkedMicro =
    workedMicros.length > 0
      ? workedMicros.reduce((a, b) => a + b, 0) / workedMicros.length
      : 50;

  const niveauGlobalSur100 = Math.round(averageWorkedMicro);
  const scoreGlobalSur20 = ((averageWorkedMicro / 100) * 20).toFixed(1);

  const bonnesReponses = sessionResults.filter(Boolean).length;
  const nbTentatives = sessionResults.length;

  const scoreSeanceSur20 =
    nbTentatives > 0 ? ((bonnesReponses / nbTentatives) * 20).toFixed(1) : "0.0";

  async function startSession() {
    try {
      setBusy(true);
      setFeedback("");
      setSelectedOptionId(null);
      setConfidence(null);
      setAnswer("");
      setSessionResults([]);

      const res = await fetch("/api/tutor-v4/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ classe, matiere, notion, style }),
      });

      const data = await res.json();

      if (!res.ok) {
        setFeedback(data?.error ?? "Erreur au démarrage du tutor V4.");
        return;
      }

      const typed = data as StartResponse;

      setSessionId(typed.sessionId);
      setPair(typed.pair);
      setMode(typed.mode);
      setRecommendedStar(typed.recommendedStar);
      setBoMastery(typed.mastery.boMastery);
      setNotionMastery(typed.mastery.notionMastery);
      setMicroMastery(typed.mastery.microMastery);
    } finally {
      setBusy(false);
    }
  }

  async function chooseOption(optionId: string) {
    if (!sessionId) {
      setFeedback("Aucune session active.");
      return;
    }

    try {
      setBusy(true);

      const res = await fetch("/api/tutor-v4/choose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, optionId }),
      });

      const data = await res.json();

      if (!res.ok) {
        setFeedback(data?.error ?? "Erreur pendant le choix de la question.");
        return;
      }

      setSelectedOptionId(optionId);
      setFeedback("");
      setAnswer("");
    } finally {
      setBusy(false);
    }
  }

  async function sendConfidence(level: ConfidenceLevel) {
    if (!sessionId) {
      setFeedback("Aucune session active.");
      return;
    }

    try {
      setBusy(true);

      const res = await fetch("/api/tutor-v4/confidence", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, level }),
      });

      const data = await res.json();

      if (!res.ok) {
        setFeedback(data?.error ?? "Erreur pendant l’enregistrement de la confiance.");
        return;
      }

      setConfidence(level);
    } finally {
      setBusy(false);
    }
  }

  async function sendAnswer() {
    if (!sessionId) {
      setFeedback("Aucune session active.");
      return;
    }

    if (!selectedOptionId) {
      setFeedback("Choisis d’abord une des deux questions.");
      return;
    }

    if (!answer.trim()) {
      setFeedback("Entre une réponse ou clique sur un choix.");
      return;
    }

    try {
      setBusy(true);

      const res = await fetch("/api/tutor-v4/answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, answer }),
      });

      const data = await res.json();

      if (!res.ok) {
        setFeedback(data?.error ?? "Erreur pendant la correction.");
        return;
      }

      const typed = data as AnswerResponse;

      setSessionResults((prev) => [...prev, typed.result.ok]);

      setFeedback(typed.feedback);
      setPair(typed.pair);
      setMode(typed.mode);
      setRecommendedStar(typed.recommendedStar);
      setBoMastery(typed.mastery.boMastery);
      setNotionMastery(typed.mastery.notionMastery);
      setMicroMastery(typed.mastery.microMastery);

      setSelectedOptionId(null);
      setConfidence(null);
      setAnswer("");
    } finally {
      setBusy(false);
    }
  }

  const chosenOption =
    pair?.optionA.id === selectedOptionId
      ? pair.optionA
      : pair?.optionB.id === selectedOptionId
      ? pair.optionB
      : null;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <header className="space-y-2">
          <div className="inline-flex rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-900">
            Tutor V4 — page de test
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900">Tutor V4</h1>
          <p className="text-sm text-slate-700">
            Test du moteur V4 : 2 questions au choix, étoiles, confiance, adaptation.
          </p>
        </header>

        <section className="grid gap-4 md:grid-cols-4">
          <Card>
            <Label>Classe</Label>
            <input
              value={classe}
              disabled
              className="w-full rounded-xl border border-slate-300 bg-slate-100 px-3 py-2 text-sm text-slate-700"
            />
          </Card>

          <Card>
            <Label>Matière</Label>
            <input
              value={matiere}
              disabled
              className="w-full rounded-xl border border-slate-300 bg-slate-100 px-3 py-2 text-sm text-slate-700"
            />
          </Card>

          <Card>
            <Label>Profil</Label>
            <select
              value={style}
              onChange={(e) => setStyle(e.target.value as "dys" | "middle" | "challenge")}
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
            >
              <option value="dys">DYS</option>
              <option value="middle">Standard</option>
              <option value="challenge">Challenge</option>
            </select>
          </Card>

          <Card>
            <Label>Notion</Label>
            <select
              value={notion}
              onChange={(e) => setNotion(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
            >
              <option value="decimaux">Nombres décimaux</option>
              <option value="fractions">Fractions</option>
              <option value="proportionnalite">Proportionnalité</option>
              <option value="perimetre">Périmètre</option>
              <option value="aires">Aires</option>
              <option value="angles">Angles</option>
            </select>
          </Card>
        </section>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={startSession}
            disabled={busy}
            className="rounded-xl bg-sky-700 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-600 disabled:opacity-50"
          >
            Démarrer le tutor V4
          </button>

          <Pill>Mode : {mode === "evaluation" ? "évaluation" : "coaching"}</Pill>
          <Pill>Recommandé : {stars(recommendedStar)}</Pill>
          <Pill>Score séance : {scoreSeanceSur20}/20</Pill>
          <Pill>Niveau global estimé : {scoreGlobalSur20}/20</Pill>
          <Pill>Maîtrise travaillée : {niveauGlobalSur100}/100</Pill>
          {sessionId ? <Pill>Session active</Pill> : null}
        </div>

        {pair ? (
          <section className="grid gap-6 md:grid-cols-[2fr_1fr]">
            <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="space-y-2">
                <div className="text-sm font-semibold text-slate-800">
                  Deux questions au choix
                </div>
                <p className="text-xs text-slate-500">
                  Même micro-compétence, deux variantes possibles.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {[pair.optionA, pair.optionB].map((option, idx) => {
                  const active = selectedOptionId === option.id;

                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => chooseOption(option.id)}
                      disabled={busy}
                      className={`rounded-2xl border p-4 text-left shadow-sm transition ${
                        active
                          ? "border-sky-500 bg-sky-50 ring-2 ring-sky-200"
                          : "border-slate-200 bg-white hover:bg-slate-50"
                      }`}
                    >
                      <div className="mb-3 flex items-center justify-between gap-3">
                        <span className="text-sm font-bold text-slate-900">
                          Question {idx === 0 ? "A" : "B"}
                        </span>
                        <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-900">
                          {stars(option.meta.starLevel)}
                        </span>
                      </div>

                      <div className="mb-2 flex flex-wrap gap-2">
                        <span className="rounded-full bg-slate-100 px-2 py-1 text-[11px] font-semibold text-slate-700">
                          thème : {option.meta.theme}
                        </span>
                        <span className="rounded-full bg-slate-100 px-2 py-1 text-[11px] font-semibold text-slate-700">
                          format : {option.format}
                        </span>
                      </div>

                      <p className="text-sm text-slate-900">{option.text}</p>
                    </button>
                  );
                })}
              </div>

              {chosenOption ? (
                <div className="space-y-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <div className="text-sm font-semibold text-slate-800">
                    Question choisie : {chosenOption.text}
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-semibold text-slate-800">
                      Confiance avant réponse
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {[1, 2, 3].map((level) => {
                        const active = confidence === level;
                        const label =
                          level === 1
                            ? "⭐ Pas sûr"
                            : level === 2
                            ? "⭐⭐ Assez sûr"
                            : "⭐⭐⭐ Très sûr";

                        return (
                          <button
                            key={level}
                            type="button"
                            onClick={() => sendConfidence(level as ConfidenceLevel)}
                            disabled={busy}
                            className={`rounded-xl px-3 py-2 text-sm font-medium ${
                              active
                                ? "bg-emerald-100 text-emerald-900 ring-2 ring-emerald-200"
                                : "bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50"
                            }`}
                          >
                            {label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {chosenOption.format === "qcm" && chosenOption.choices?.length ? (
                    <div className="space-y-2">
                      <div className="text-sm font-semibold text-slate-800">
                        Réponses possibles
                      </div>

                      <div className="grid gap-2">
                        {chosenOption.choices.map((choice, idx) => (
                          <button
                            key={`${choice}-${idx}`}
                            type="button"
                            onClick={() => setAnswer(choice)}
                            disabled={busy}
                            className={`rounded-lg border px-3 py-2 text-left text-sm ${
                              answer === choice
                                ? "border-sky-500 bg-sky-50 text-sky-900"
                                : "border-slate-300 bg-white text-slate-900 hover:bg-slate-50"
                            }`}
                          >
                            {choice}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="text-sm font-semibold text-slate-800">Réponse</div>
                      <input
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        placeholder="Ta réponse..."
                        className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                      />
                    </div>
                  )}

                  {mode === "coaching" && chosenOption.hint ? (
                    <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800">
                      <span className="font-semibold">Indice :</span> {chosenOption.hint}
                    </div>
                  ) : null}

                  <button
                    onClick={sendAnswer}
                    disabled={busy}
                    className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-50"
                  >
                    Envoyer la réponse
                  </button>
                </div>
              ) : (
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                  Choisis d’abord une des deux questions.
                </div>
              )}

              {feedback ? (
                <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800">
                  {feedback}
                </div>
              ) : null}
            </div>

            <div className="space-y-4">
              <ScoreCard title="BO mastery" data={boMastery} color="bg-sky-500" />
              <ScoreCard title="Notion mastery" data={notionMastery} color="bg-emerald-500" />
              <ScoreCard title="Micro mastery" data={microMastery} color="bg-violet-500" />
            </div>
          </section>
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-sm">
            Démarre une session pour afficher la première paire de questions.
          </div>
        )}
      </div>
    </main>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">{children}</div>;
}

function Label({ children }: { children: React.ReactNode }) {
  return <label className="mb-2 block text-xs font-semibold text-slate-600">{children}</label>;
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200">
      {children}
    </div>
  );
}

function ScoreCard({
  title,
  data,
  color,
}: {
  title: string;
  data: Record<string, number>;
  color: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <h2 className="mb-3 text-sm font-bold text-slate-900">{title}</h2>
      <div className="space-y-3">
        {Object.entries(data).map(([key, value]) => (
          <div key={key}>
            <div className="mb-1 flex justify-between text-xs text-slate-700">
              <span>{key}</span>
              <span>{Math.round(value)}</span>
            </div>
            <div className="h-2 rounded-full bg-slate-100">
              <div
                className={`h-2 rounded-full ${color}`}
                style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}