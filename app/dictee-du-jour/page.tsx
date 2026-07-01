"use client";

// La dictée du jour — un rituel quotidien : 1 mot à écouter et écrire, qui
// change chaque jour (« comme un journal »). Le mot est calculé CÔTÉ CLIENT
// après montage pour éviter tout décalage d'hydratation sur la date.

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  getMotDuJour,
  reponseCorrecte,
  type DicteeMot,
} from "@/lib/dictee-du-jour/words";
import { speakText } from "@/app/tutor-v4/ListenButton";

const STREAK_KEY = "dictee-du-jour-streak";

function jourStr(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export default function DicteeDuJourPage() {
  const [mot, setMot] = useState<DicteeMot | null>(null);
  const [dateLabel, setDateLabel] = useState("");
  const [saisie, setSaisie] = useState("");
  const [etat, setEtat] = useState<"idle" | "correct" | "faux">("idle");
  const [showIndice, setShowIndice] = useState(false);
  const [streak, setStreak] = useState(0);
  const [dejaFait, setDejaFait] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const now = new Date();
    setMot(getMotDuJour(now));
    setDateLabel(
      new Intl.DateTimeFormat("fr-FR", {
        weekday: "long",
        day: "numeric",
        month: "long",
      }).format(now)
    );

    // Série (streak) : lecture de l'état stocké.
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

  function ecouter() {
    if (mot) speakText(mot.mot, mot.lang);
  }

  function valider() {
    if (!mot || etat === "correct") return;
    if (reponseCorrecte(saisie, mot.mot)) {
      setEtat("correct");
      enregistrerReussite();
    } else {
      setEtat("faux");
    }
  }

  // Met à jour la série quand la dictée du jour est réussie (une fois/jour).
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
        return; // déjà comptée aujourd'hui
      }
      const nouvelleStreak =
        prev && prev.last === yesterday ? prev.streak + 1 : 1;
      localStorage.setItem(
        STREAK_KEY,
        JSON.stringify({ last: today, streak: nouvelleStreak })
      );
      setStreak(nouvelleStreak);
      setDejaFait(true);
    } catch {
      /* ignore */
    }
  }

  const matiereColor: Record<string, string> = {
    Français: "bg-rose-100 text-rose-700",
    Maths: "bg-violet-100 text-violet-700",
    Anglais: "bg-sky-100 text-sky-700",
    Espagnol: "bg-amber-100 text-amber-700",
    Histoire: "bg-orange-100 text-orange-700",
    Géographie: "bg-emerald-100 text-emerald-700",
    Écologie: "bg-lime-100 text-lime-700",
  };

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
            Un nouveau mot chaque matin. Reviens demain ! ☀️
          </p>
        </div>

        {!mot ? (
          <div className="rounded-3xl bg-white p-8 text-center text-slate-400 shadow-sm">
            Chargement…
          </div>
        ) : (
          <div className="rounded-3xl border border-sky-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-5 flex items-center justify-between">
              <span
                className={`rounded-full px-3 py-1 text-sm font-black ${
                  matiereColor[mot.matiere] ?? "bg-slate-100 text-slate-700"
                }`}
              >
                {mot.matiere}
              </span>
              {streak > 0 && (
                <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-black text-orange-700">
                  🔥 {streak} jour{streak > 1 ? "s" : ""} d'affilée
                </span>
              )}
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
              onChange={(e) => {
                setSaisie(e.target.value);
                if (etat === "faux") setEtat("idle");
              }}
              onKeyDown={(e) => e.key === "Enter" && valider()}
              disabled={etat === "correct"}
              placeholder="Écris le mot ici…"
              aria-label="Ta réponse"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-center text-lg font-semibold text-slate-900 outline-none focus:border-sky-500 disabled:bg-slate-50"
            />

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
                disabled={etat === "correct" || !saisie.trim()}
                className="rounded-xl bg-lime-500 px-8 py-3 text-base font-black text-white shadow-sm hover:bg-lime-600 disabled:opacity-50"
              >
                Valider
              </button>
            </div>

            {showIndice && etat !== "correct" && (
              <p className="mt-3 rounded-lg bg-slate-50 px-3 py-2 text-center text-sm font-semibold text-slate-600">
                💡 {mot.indice}
              </p>
            )}

            {etat === "faux" && (
              <p className="mt-4 rounded-lg bg-rose-50 px-3 py-2 text-center text-sm font-bold text-rose-700">
                Pas encore… réécoute et réessaie. (Attention aux accents !)
              </p>
            )}

            {etat === "correct" && (
              <div className="mt-5 rounded-2xl bg-emerald-50 p-4 text-center">
                <p className="text-lg font-black text-emerald-700">
                  ✅ Bravo, c'était « {mot.mot} »
                </p>
                <p className="mt-1 text-sm font-semibold text-emerald-800">
                  {mot.indice}
                </p>
                <p className="mt-3 text-sm font-bold text-slate-600">
                  Reviens demain pour la prochaine dictée ! ☀️
                </p>
              </div>
            )}

            {dejaFait && etat !== "correct" && (
              <p className="mt-4 text-center text-xs font-semibold text-slate-400">
                Tu as déjà fait la dictée d'aujourd'hui — mais tu peux
                t'entraîner encore. 😉
              </p>
            )}
          </div>
        )}

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
