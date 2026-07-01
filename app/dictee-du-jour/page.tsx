"use client";

// La dictée du jour — un rituel quotidien : 5 mots à écouter et écrire, de 5
// matières différentes, qui changent chaque jour (« comme un journal »). Les
// mots sont calculés CÔTÉ CLIENT après montage (évite le décalage d'hydratation
// sur la date).

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  getDicteeDuJour,
  reponseCorrecte,
  type DicteeMot,
} from "@/lib/dictee-du-jour/words";
import { speakText } from "@/app/tutor-v4/ListenButton";
import { useEleve } from "@/context/EleveContext";

const STREAK_KEY = "dictee-du-jour-streak";

function jourStr(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

const matiereColor: Record<string, string> = {
  Français: "bg-rose-100 text-rose-700",
  Maths: "bg-violet-100 text-violet-700",
  Anglais: "bg-sky-100 text-sky-700",
  Espagnol: "bg-amber-100 text-amber-700",
  Histoire: "bg-orange-100 text-orange-700",
  Géographie: "bg-emerald-100 text-emerald-700",
  Écologie: "bg-lime-100 text-lime-700",
  Physique: "bg-indigo-100 text-indigo-700",
  SVT: "bg-teal-100 text-teal-700",
  Musique: "bg-fuchsia-100 text-fuchsia-700",
  "Arts plastiques": "bg-pink-100 text-pink-700",
};

export default function DicteeDuJourPage() {
  const [mots, setMots] = useState<DicteeMot[] | null>(null);
  const [dateLabel, setDateLabel] = useState("");
  const [idx, setIdx] = useState(0);
  const [saisie, setSaisie] = useState("");
  const [reveal, setReveal] = useState<{ ok: boolean } | null>(null);
  const [resultats, setResultats] = useState<boolean[]>([]);
  const [fini, setFini] = useState(false);
  const [showIndice, setShowIndice] = useState(false);
  const [streak, setStreak] = useState(0);
  const [dejaFait, setDejaFait] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { eleve } = useEleve();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveMsg, setSaveMsg] = useState<string | null>(null);

  useEffect(() => {
    // Précharge les voix (souvent vides au 1er appel) pour que la voix
    // anglaise/espagnole soit trouvée dès le premier « Écouter ».
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () =>
        window.speechSynthesis.getVoices();
    }

    const now = new Date();
    setMots(getDicteeDuJour(now, 5));
    setDateLabel(
      new Intl.DateTimeFormat("fr-FR", {
        weekday: "long",
        day: "numeric",
        month: "long",
      }).format(now)
    );

    try {
      const raw = localStorage.getItem(STREAK_KEY);
      if (raw) {
        const { last, streak: s } = JSON.parse(raw) as {
          last: string;
          streak: number;
        };
        setStreak(s ?? 0);
        if (last === jourStr(now)) setDejaFait(true);
      }
    } catch {
      /* ignore */
    }
  }, []);

  const total = mots?.length ?? 0;
  const current = mots && idx < total ? mots[idx] : null;
  const score = resultats.filter(Boolean).length;

  // Enregistrement du score sur clic (élève connecté). L'identité est forcée
  // côté serveur depuis le jeton (sécurisé) ; l'élève voit une confirmation.
  async function enregistrerScore() {
    if (!eleve?.token || !mots || saving || saved) return;
    setSaving(true);
    setSaveMsg(null);
    const details = {
      date: jourStr(new Date()),
      mots: mots.map((m, i) => ({
        mot: m.mot,
        matiere: m.matiere,
        ok: !!resultats[i],
      })),
    };
    try {
      const res = await fetch("/api/resultats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: eleve.token,
          type: "dictee",
          resultat: { classe: eleve.classe ?? null, score, total, details },
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data?.ok) {
        setSaved(true);
        setSaveMsg("✅ Score enregistré !");
      } else {
        setSaveMsg(data?.error || "Enregistrement impossible.");
      }
    } catch {
      setSaveMsg("Erreur réseau. Réessaie.");
    } finally {
      setSaving(false);
    }
  }

  // Enregistrement AUTOMATIQUE dès la fin (garantit la remontée dans Supabase =
  // activité élève + dashboard), même si l'élève ne clique pas. Le bouton reste
  // affiché pour la confirmation / un nouvel essai si l'auto-save a échoué.
  useEffect(() => {
    if (fini && eleve?.token && !saved && !saving) {
      void enregistrerScore();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fini]);

  function ecouter() {
    if (current) speakText(current.mot, current.lang);
  }

  function valider() {
    if (!current || reveal) return;
    const ok = reponseCorrecte(saisie, current.mot);
    setReveal({ ok });
    setResultats((r) => [...r, ok]);
  }

  function suivant() {
    setReveal(null);
    setSaisie("");
    setShowIndice(false);
    if (idx + 1 >= total) {
      setFini(true);
      enregistrerReussite();
    } else {
      setIdx(idx + 1);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }

  // Met à jour la série quand la dictée du jour est TERMINÉE (une fois/jour).
  function enregistrerReussite() {
    const now = new Date();
    const today = jourStr(now);
    const yesterday = jourStr(new Date(now.getTime() - 86_400_000));
    try {
      const raw = localStorage.getItem(STREAK_KEY);
      const prev = raw
        ? (JSON.parse(raw) as { last: string; streak: number })
        : null;
      if (prev?.last === today) {
        setStreak(prev.streak);
        setDejaFait(true);
        return;
      }
      const nouvelle = prev && prev.last === yesterday ? prev.streak + 1 : 1;
      localStorage.setItem(
        STREAK_KEY,
        JSON.stringify({ last: today, streak: nouvelle })
      );
      setStreak(nouvelle);
      setDejaFait(true);
    } catch {
      /* ignore */
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-100 via-cyan-50 to-emerald-100 px-4 py-10 text-slate-900">
      <div className="mx-auto max-w-xl">
        <div className="mb-4 text-center">
          <p className="text-sm font-bold uppercase tracking-wide text-sky-600">
            ✍️ La dictée du jour
          </p>
          <p className="mt-1 text-2xl font-black capitalize text-slate-800">
            {dateLabel || "…"}
          </p>
          <p className="mt-1 text-xs font-semibold text-slate-500">
            5 mots, 5 matières. Reviens demain pour une nouvelle dictée ! ☀️
          </p>
        </div>

        {!mots ? (
          <div className="rounded-3xl bg-white p-8 text-center text-slate-400 shadow-sm">
            Chargement…
          </div>
        ) : fini ? (
          /* ── Écran de résultat ─────────────────────────────────────────── */
          <div className="rounded-3xl border border-emerald-200 bg-white p-6 text-center shadow-sm sm:p-8">
            <p className="text-5xl font-black text-emerald-600">
              {score}/{total}
            </p>
            <p className="mt-2 text-lg font-black text-slate-800">
              {score === total
                ? "Sans faute, bravo ! 🎉"
                : score >= 3
                  ? "Bien joué ! 👏"
                  : "Continue, tu progresses ! 💪"}
            </p>
            {streak > 0 && (
              <p className="mt-2 inline-block rounded-full bg-orange-100 px-4 py-1.5 text-sm font-black text-orange-700">
                🔥 {streak} jour{streak > 1 ? "s" : ""} d'affilée
              </p>
            )}

            <ul className="mt-5 space-y-1.5 text-left">
              {mots.map((m, i) => (
                <li
                  key={i}
                  className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-sm"
                >
                  <span className="font-semibold text-slate-700">
                    {resultats[i] ? "✅" : "❌"} {m.mot}
                  </span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-bold ${
                      matiereColor[m.matiere] ?? "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {m.matiere}
                  </span>
                </li>
              ))}
            </ul>

            {/* Enregistrement du score (élève connecté). */}
            {eleve?.token ? (
              <div className="mt-5">
                <button
                  type="button"
                  onClick={enregistrerScore}
                  disabled={saving || saved}
                  className="w-full rounded-xl bg-emerald-600 px-8 py-3 text-base font-black text-white shadow-sm hover:bg-emerald-500 disabled:opacity-60"
                >
                  {saved
                    ? "✅ Score enregistré"
                    : saving
                      ? "Enregistrement…"
                      : "💾 Enregistrer mon score"}
                </button>
                {saveMsg && !saved && (
                  <p className="mt-2 text-sm font-semibold text-rose-600">
                    {saveMsg}
                  </p>
                )}
              </div>
            ) : (
              <p className="mt-5 rounded-lg bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-500">
                Connecte-toi pour enregistrer ton score et suivre ta progression.
              </p>
            )}

            <p className="mt-5 text-sm font-bold text-slate-600">
              Reviens demain pour la prochaine dictée ! ☀️
            </p>
          </div>
        ) : current ? (
          /* ── Un mot de la dictée ───────────────────────────────────────── */
          <div className="rounded-3xl border border-sky-200 bg-white p-6 shadow-sm sm:p-8">
            {/* Progression */}
            <div className="mb-4">
              <div className="mb-1.5 flex items-center justify-between text-xs font-bold text-slate-500">
                <span>
                  Mot {idx + 1} / {total}
                </span>
                {streak > 0 && (
                  <span className="text-orange-600">🔥 {streak}</span>
                )}
              </div>
              <div className="flex gap-1">
                {mots.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 flex-1 rounded-full ${
                      i < resultats.length
                        ? resultats[i]
                          ? "bg-emerald-400"
                          : "bg-rose-300"
                        : i === idx
                          ? "bg-sky-400"
                          : "bg-slate-200"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="mb-4 flex justify-center">
              <span
                className={`rounded-full px-3 py-1 text-sm font-black ${
                  matiereColor[current.matiere] ?? "bg-slate-100 text-slate-700"
                }`}
              >
                {current.matiere}
              </span>
            </div>

            <p className="mb-4 text-center text-lg font-bold text-slate-700">
              Écoute le mot, puis écris-le.
            </p>

            <div className="mb-5 flex justify-center">
              <button
                type="button"
                onClick={ecouter}
                className="inline-flex items-center gap-2 rounded-full bg-sky-600 px-6 py-3 text-base font-black text-white shadow-sm hover:bg-sky-700"
              >
                🔊 Écouter le mot
              </button>
            </div>

            <input
              ref={inputRef}
              value={saisie}
              onChange={(e) => setSaisie(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && (reveal ? suivant() : valider())
              }
              disabled={!!reveal}
              placeholder="Écris le mot ici…"
              aria-label="Ta réponse"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-center text-lg font-semibold text-slate-900 outline-none focus:border-sky-500 disabled:bg-slate-50"
            />

            {!reveal ? (
              <div className="mt-3 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setShowIndice((v) => !v)}
                  className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-500 hover:bg-slate-50"
                >
                  💡 {showIndice ? "Cacher l'indice" : "Indice"}
                </button>
                <button
                  type="button"
                  onClick={valider}
                  disabled={!saisie.trim()}
                  className="rounded-xl bg-lime-500 px-8 py-3 text-base font-black text-white shadow-sm hover:bg-lime-600 disabled:opacity-50"
                >
                  Valider
                </button>
              </div>
            ) : (
              <div className="mt-4">
                <div
                  className={`rounded-2xl p-4 text-center ${
                    reveal.ok ? "bg-emerald-50" : "bg-rose-50"
                  }`}
                >
                  <p
                    className={`text-lg font-black ${
                      reveal.ok ? "text-emerald-700" : "text-rose-700"
                    }`}
                  >
                    {reveal.ok
                      ? "✅ Correct !"
                      : `❌ C'était « ${current.mot} »`}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-600">
                    {current.indice}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={suivant}
                  className="mt-4 w-full rounded-xl bg-sky-600 px-8 py-3 text-base font-black text-white shadow-sm hover:bg-sky-700"
                >
                  {idx + 1 >= total ? "Voir mon résultat →" : "Mot suivant →"}
                </button>
              </div>
            )}

            {showIndice && !reveal && (
              <p className="mt-3 rounded-lg bg-slate-50 px-3 py-2 text-center text-sm font-semibold text-slate-600">
                💡 {current.indice}
              </p>
            )}

            {dejaFait && (
              <p className="mt-4 text-center text-xs font-semibold text-slate-400">
                Tu as déjà fait la dictée d'aujourd'hui — mais tu peux
                t'entraîner encore. 😉
              </p>
            )}
          </div>
        ) : null}

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-sm font-bold text-sky-600 hover:underline"
          >
            ← Retour à l'accueil
          </Link>
        </div>
      </div>
    </main>
  );
}
