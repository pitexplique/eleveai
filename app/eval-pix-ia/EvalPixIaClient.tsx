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

import { getEvalBlanchePixIa, type PixEvalQuestion, type PixNiveau } from "@/lib/pix-ia/questions";
import { computePixProfile } from "@/lib/pix-ia/score";
import {
  coachPourCompetence,
  ficheDeCompetence,
} from "@/lib/pix-ia/fiches";
import { PIX_DOMAINES } from "@/lib/pix-ia/referentiel";

const NIVEAUX: { id: PixNiveau; label: string; desc: string }[] = [
  { id: "college", label: "Collège", desc: "Novice / indépendant" },
  { id: "lycee", label: "Lycée", desc: "Avancé / expert · dès la 2de" },
];

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

  const [niveau, setNiveau] = useState<PixNiveau>("college");
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
    // Anti-répétition : on mémorise les questions déjà vues d'une session à
    // l'autre (localStorage) et on en privilégie d'inédites. Fenêtre glissante
    // pour finir par autoriser de nouveau les anciennes quand le pool est épuisé.
    const seen = readSeen(niveau);
    const qs = getEvalBlanchePixIa(seen, niveau);
    writeSeen(niveau, [...seen, ...qs.map((q) => q.id)]);
    setQuestions(qs);
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
      niveau: `pix-ia-${niveau}`,
      score: profile.totalCorrect,
      total: profile.total,
      details: {
        type: "eval-blanche-pix-ia",
        niveauScolaire: niveau,
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

            <div className="mt-6">
              <p className="mb-2 text-sm font-black uppercase tracking-wider text-slate-500">Ton niveau</p>
              <div className="grid grid-cols-2 gap-3">
                {NIVEAUX.map((n) => (
                  <button
                    key={n.id}
                    type="button"
                    onClick={() => setNiveau(n.id)}
                    className={[
                      "rounded-2xl border p-3 text-left transition",
                      niveau === n.id
                        ? "border-indigo-500 bg-indigo-50 text-indigo-900"
                        : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
                    ].join(" ")}
                  >
                    <div className="text-sm font-black">{n.label}</div>
                    <div className="text-xs text-slate-400">{n.desc}</div>
                  </button>
                ))}
              </div>
            </div>

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
                Pix IA · {niveau === "lycee" ? "Lycée" : "Collège"} · {questions.length} questions
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

        {/* Détail par compétence.
            LES FRAGILES D'ABORD. Le référentiel range de 1.1 à 3.5 ; un
            résultat, lui, se lit par ce qu'il reste à faire. Acquises et
            fragiles mélangées, l'élève relit seize lignes pour retrouver les
            trois qui le concernent. */}
        <div className="mb-6 space-y-2">
          {[...(profile?.competences ?? [])]
            .sort((a, b) => Number(a.correct) - Number(b.correct))
            .map((c) => {
              const fiche = ficheDeCompetence(c.competenceId);
              return (
                <div
                  key={c.competenceId}
                  className="rounded-2xl bg-white px-4 py-3 shadow-sm ring-1 ring-slate-200"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-bold text-slate-800">
                      <span className="text-slate-400">{c.competenceId}</span> · {c.label}
                    </span>
                    <span
                      className={[
                        "shrink-0 rounded-full px-3 py-1 text-xs font-black",
                        c.correct ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800",
                      ].join(" ")}
                    >
                      {c.correct ? "✅ Acquis" : "❌ À travailler"}
                    </span>
                  </div>

                  {/* Le pont : de « c'est fragile » à « voilà où travailler ».
                      On l'affiche sur les compétences à travailler — sur une
                      compétence acquise, ce serait du bruit. */}
                  {!c.correct && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {fiche && (
                        <Link
                          href={fiche}
                          className="rounded-xl bg-slate-100 px-3 py-1.5 text-xs font-black text-slate-700 hover:bg-slate-200 transition"
                        >
                          📘 Lire la fiche
                        </Link>
                      )}
                      <Link
                        href={coachPourCompetence(c.competenceId, niveau)}
                        className="rounded-xl bg-indigo-600 px-3 py-1.5 text-xs font-black text-white hover:bg-indigo-500 transition"
                      >
                        M&apos;entraîner sur {c.competenceId} →
                      </Link>
                    </div>
                  )}
                </div>
              );
            })}
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
            href={coachPourCompetence("", niveau).split("&notion=")[0]}
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

// Suivi « déjà vu » (anti-répétition entre entraînements). Fenêtre glissante :
// on ne garde que les N derniers ids, pour finir par réautoriser les anciennes.
const SEEN_MAX = 150;
const seenKey = (niveau: PixNiveau) => `pixia-seen-${niveau}`;

function readSeen(niveau: PixNiveau): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(seenKey(niveau));
    const arr = raw ? (JSON.parse(raw) as unknown) : [];
    return Array.isArray(arr) ? arr.filter((x): x is string => typeof x === "string") : [];
  } catch {
    return [];
  }
}

function writeSeen(niveau: PixNiveau, ids: string[]) {
  if (typeof window === "undefined") return;
  try {
    // dédoublonne en gardant l'ordre, puis ne conserve que les SEEN_MAX derniers
    const unique = Array.from(new Set(ids));
    const trimmed = unique.slice(-SEEN_MAX);
    window.localStorage.setItem(seenKey(niveau), JSON.stringify(trimmed));
  } catch {
    /* localStorage indisponible : on ignore */
  }
}
