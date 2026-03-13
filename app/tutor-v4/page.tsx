// tutor-v4/page.tsx
"use client";

import { useState } from "react";

type StudentStyle = "dys" | "middle" | "challenge";
type TutorMode = "evaluation" | "coaching";
type StarLevel = 1 | 2 | 3 | 4 | 5;
type DifficultyLevel = 1 | 2 | 3 | 4 | 5;
type ConfidenceLevel = 1 | 2 | 3;

type HiddenStarId =
  | "starter"
  | "confidence"
  | "regularity"
  | "autonomy"
  | "precision"
  | "perseverance"
  | "theme_explorer"
  | "micro_mastery";

type HiddenStarState = {
  id: HiddenStarId;
  label: string;
  description: string;
  unlocked: boolean;
  unlockedAt?: number;
  relatedMicroIds?: string[];
};

type VisibleProgress = {
  unlockedStars: HiddenStarState[];
  lastUnlockedStar?: HiddenStarState;
  encouragement: string;
  streak: number;
  sessionStep: number;
};

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
    difficulty: DifficultyLevel;
    starLevel: StarLevel;
  };
};

type TutorQuestionPair = {
  pairId: string;
  notionId: string;
  microId: string;
  recommendedDifficulty: DifficultyLevel;
  recommendedStar: StarLevel;
  optionA: TutorQuestionOption;
  optionB: TutorQuestionOption;
};

type StartResponse = {
  sessionId: string;
  pair: TutorQuestionPair;
  mode: TutorMode;
  recommendedStar: StarLevel;
  recommendedDifficulty: DifficultyLevel;
  notionCatalog: Array<{ id: string; label: string }>;
  visibleProgress: VisibleProgress;
};

type AnswerResponse = {
  feedback: string;
  result: {
    ok: boolean;
    flags: string[];
  };
  pair: TutorQuestionPair;
  mode: TutorMode;
  recommendedStar: StarLevel;
  recommendedDifficulty: DifficultyLevel;
  visibleProgress: VisibleProgress;
};

function stars(level: number) {
  return "⭐".repeat(Math.max(1, Math.min(5, level)));
}

export default function TutorV4Page() {
  const [classe] = useState("6e");
  const [matiere] = useState("maths");
  const [style, setStyle] = useState<StudentStyle>("middle");
  const [notion, setNotion] = useState("fractions");

  const [sessionId, setSessionId] = useState<string | null>(null);
  const [pair, setPair] = useState<TutorQuestionPair | null>(null);
  const [mode, setMode] = useState<TutorMode>("evaluation");
  const [recommendedStar, setRecommendedStar] = useState<StarLevel>(2);

  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [confidence, setConfidence] = useState<ConfidenceLevel | null>(null);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [sessionResults, setSessionResults] = useState<boolean[]>([]);
  const [visibleProgress, setVisibleProgress] = useState<VisibleProgress>({
    unlockedStars: [],
    lastUnlockedStar: undefined,
    encouragement: "Bienvenue. On avance étape par étape.",
    streak: 0,
    sessionStep: 0,
  });

  const [busy, setBusy] = useState(false);

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
        setFeedback(data?.error ?? "Erreur au démarrage du tutor.");
        return;
      }

      const typed = data as StartResponse;

      setSessionId(typed.sessionId);
      setPair(typed.pair);
      setMode(typed.mode);
      setRecommendedStar(typed.recommendedStar);
      setVisibleProgress(typed.visibleProgress);
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
        setFeedback(
          data?.error ?? "Erreur pendant l’enregistrement de la confiance."
        );
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
      setFeedback("Choisis une question.");
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
      setVisibleProgress(typed.visibleProgress);

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
    <main className="min-h-screen bg-gradient-to-b from-sky-50 to-white px-4 py-6">
      <div className="mx-auto max-w-4xl space-y-5">
        <header className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-1">
              <div className="inline-flex rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-900">
                Tutor de maths
              </div>
              <h1 className="text-2xl font-extrabold text-slate-900">
                Je m’entraîne
              </h1>
              <p className="text-sm text-slate-600">
                Choisis une question et essaie d’améliorer ton score.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 md:min-w-[300px]">
              <BigStat
                label="Score séance"
                value={`${scoreSeanceSur20}/20`}
                accent="bg-sky-100 text-sky-900"
              />
              <BigStat
                label="Bonnes réponses"
                value={`${bonnesReponses}/${nbTentatives}`}
                accent="bg-emerald-100 text-emerald-900"
              />
            </div>
          </div>
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
              onChange={(e) => setStyle(e.target.value as StudentStyle)}
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
            className="rounded-2xl bg-sky-700 px-5 py-3 text-sm font-bold text-white hover:bg-sky-600 disabled:opacity-50"
          >
            Démarrer
          </button>

          <MiniPill>
            {mode === "evaluation" ? "Mode évaluation" : "Mode coaching"}
          </MiniPill>
          <MiniPill>Niveau {stars(recommendedStar)}</MiniPill>
          <MiniPill>Série {visibleProgress.streak}</MiniPill>
        </div>

        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="text-sm font-semibold text-slate-800">
              {visibleProgress.encouragement}
            </div>

            {visibleProgress.unlockedStars.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {visibleProgress.unlockedStars.map((star) => (
                  <span
                    key={star.id}
                    className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-900"
                  >
                    ⭐ {star.label}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </section>

        {pair ? (
          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="space-y-1">
              <div className="text-lg font-bold text-slate-900">
                Choisis ta question
              </div>
              <p className="text-sm text-slate-500">
                Tu peux prendre la question A ou la question B.
              </p>
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {[pair.optionA, pair.optionB].map((option, idx) => {
                const active = selectedOptionId === option.id;

                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => chooseOption(option.id)}
                    disabled={busy}
                    className={`rounded-3xl border p-5 text-left transition ${
                      active
                        ? "border-sky-500 bg-sky-50 ring-2 ring-sky-200"
                        : "border-slate-200 bg-white hover:bg-slate-50"
                    }`}
                  >
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <span className="text-base font-bold text-slate-900">
                        Question {idx === 0 ? "A" : "B"}
                      </span>
                      <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-900">
                        {stars(option.meta.starLevel)}
                      </span>
                    </div>

                    <div className="mb-3 flex flex-wrap gap-2">
                      <Tag>{option.format === "qcm" ? "QCM" : "Réponse libre"}</Tag>
                    </div>

                    <p className="text-base leading-6 text-slate-900">
                      {option.text}
                    </p>
                  </button>
                );
              })}
            </div>

            {chosenOption ? (
              <div className="mt-5 space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="text-base font-bold text-slate-900">
                  Ta question
                </div>

                <div className="rounded-2xl bg-white p-4 text-base text-slate-900 ring-1 ring-slate-200">
                  {chosenOption.text}
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-semibold text-slate-800">
                    Comment tu te sens ?
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {[1, 2, 3].map((level) => {
                      const active = confidence === level;
                      const label =
                        level === 1
                          ? "Pas sûr"
                          : level === 2
                          ? "Assez sûr"
                          : "Très sûr";

                      return (
                        <button
                          key={level}
                          type="button"
                          onClick={() => sendConfidence(level as ConfidenceLevel)}
                          disabled={busy}
                          className={`rounded-2xl px-4 py-2 text-sm font-medium ${
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
                  <div className="space-y-3">
                    <div className="text-sm font-semibold text-slate-800">
                      Choisis ta réponse
                    </div>

                    <div className="grid gap-2">
                      {chosenOption.choices.map((choice, idx) => (
                        <button
                          key={`${choice}-${idx}`}
                          type="button"
                          onClick={() => setAnswer(choice)}
                          disabled={busy}
                          className={`rounded-2xl border px-4 py-3 text-left text-sm font-medium ${
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
                    <div className="text-sm font-semibold text-slate-800">
                      Écris ta réponse
                    </div>
                    <input
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      placeholder="Ta réponse..."
                      className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900"
                    />
                  </div>
                )}

                {mode === "coaching" && chosenOption.hint ? (
                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
                    <span className="font-bold">Indice :</span> {chosenOption.hint}
                  </div>
                ) : null}

                <button
                  onClick={sendAnswer}
                  disabled={busy}
                  className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-bold text-white hover:bg-slate-800 disabled:opacity-50"
                >
                  Valider ma réponse
                </button>
              </div>
            ) : (
              <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                Choisis une question pour commencer.
              </div>
            )}

            {feedback ? (
              <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-800">
                {feedback}
              </div>
            ) : null}
          </section>
        ) : (
          <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-600 shadow-sm">
            Clique sur <span className="font-semibold">Démarrer</span> pour lancer
            une séance.
          </div>
        )}
      </div>
    </main>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      {children}
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="mb-2 block text-xs font-semibold text-slate-600">
      {children}
    </label>
  );
}

function MiniPill({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200">
      {children}
    </div>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-slate-100 px-2 py-1 text-[11px] font-semibold text-slate-700">
      {children}
    </span>
  );
}

function BigStat({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent: string;
}) {
  return (
    <div className={`rounded-2xl px-4 py-3 ${accent}`}>
      <div className="text-xs font-semibold opacity-80">{label}</div>
      <div className="text-2xl font-extrabold">{value}</div>
    </div>
  );
}