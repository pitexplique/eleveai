"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const CLASSES = ["6e", "5e", "4e"] as const;

export default function EvaluationClient() {
  const [classe, setClasse] = useState<(typeof CLASSES)[number]>("6e");
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const targetDate = new Date("2026-06-01T00:00:00");

    const updateTimer = () => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft("C’est disponible !");
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft(`${days}j ${hours}h ${minutes}m ${seconds}s`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000); // 🔥 MAJ chaque seconde

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden px-4 py-10 text-slate-900">
      {/* Fond SVG */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <svg
          className="absolute inset-0 h-full w-full opacity-95"
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="centerGlow" cx="50%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </radialGradient>

            <radialGradient id="g1" cx="20%" cy="20%" r="60%">
              <stop offset="0%" stopColor="#6EE7B7" stopOpacity="1" />
              <stop offset="100%" stopColor="#6EE7B7" stopOpacity="0" />
            </radialGradient>

            <radialGradient id="g2" cx="80%" cy="15%" r="55%">
              <stop offset="0%" stopColor="#7DD3FC" stopOpacity="1" />
              <stop offset="100%" stopColor="#7DD3FC" stopOpacity="0" />
            </radialGradient>

            <radialGradient id="g3" cx="50%" cy="85%" r="55%">
              <stop offset="0%" stopColor="#FDE047" stopOpacity="1" />
              <stop offset="100%" stopColor="#FDE047" stopOpacity="0" />
            </radialGradient>

            <linearGradient id="wave" x1="0" x2="1">
              <stop offset="0%" stopColor="#F0FDF4" />
              <stop offset="50%" stopColor="#E0F2FE" />
              <stop offset="100%" stopColor="#FEFCE8" />
            </linearGradient>
          </defs>

          <rect width="1440" height="900" fill="url(#wave)" />
          <rect width="1440" height="900" fill="url(#centerGlow)" />
          <rect width="1440" height="900" fill="url(#g1)" />
          <rect width="1440" height="900" fill="url(#g2)" />
          <rect width="1440" height="900" fill="url(#g3)" />

          <circle cx="180" cy="170" r="60" fill="#34D399" opacity="0.35" />
          <circle cx="1240" cy="180" r="80" fill="#38BDF8" opacity="0.35" />
          <circle cx="1120" cy="720" r="70" fill="#FACC15" opacity="0.35" />
          <circle cx="260" cy="720" r="85" fill="#A78BFA" opacity="0.25" />

          <path
            d="M0 700 C220 620 340 760 560 690 C780 620 930 720 1140 660 C1280 620 1370 640 1440 610 V900 H0 Z"
            fill="#FFFFFF"
            opacity="0.75"
          />

          <text x="170" y="480" fontSize="50" opacity="0.18">⭐</text>
          <text x="1180" y="520" fontSize="60" opacity="0.18">🏆</text>
          <text x="720" y="760" fontSize="55" opacity="0.18">🚀</text>
        </svg>
      </div>

      <section className="relative z-10 mx-auto max-w-5xl">
        <div className="rounded-[2rem] border border-white/70 bg-white/85 p-6 shadow-2xl backdrop-blur md:p-8">
          <p className="mb-2 text-sm font-black uppercase tracking-wide text-emerald-600">
            EleveAI · Évaluations
          </p>

          <h1 className="text-3xl font-black md:text-5xl">
            Où en es-tu en maths ?
          </h1>

          <p className="mt-4 max-w-3xl text-lg font-medium text-slate-700">
            Un test court pour voir tes forces, repérer ce qu’il faut
            retravailler et mesurer tes progrès.
          </p>

          {/* 🔥 Bloc chrono */}
          <div className="mt-4 rounded-xl border border-emerald-300 bg-gradient-to-r from-emerald-100 to-sky-100 px-4 py-4 text-sm font-semibold text-slate-800">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                🚧 <span className="font-black">Disponible le 1er juin</span>
                <div className="mt-1 text-xs text-slate-600">
                  En attendant, entraîne-toi avec le calcul rapide, Coach-IA et améliore tes prompts 🚀
                </div>
              </div>

              <div className="rounded-2xl bg-white/80 px-4 py-3 text-left shadow sm:text-right">
                <div className="text-xs font-bold text-slate-500">
                  ⏱️ Ouverture dans
                </div>
                <div className="text-lg font-black text-emerald-600 animate-pulse">
                  {timeLeft}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-7 rounded-3xl bg-gradient-to-r from-emerald-400 to-sky-400 p-1">
            <div className="rounded-[1.35rem] bg-white/90 p-4">
              <p className="mb-3 text-sm font-black text-slate-700">
                Choisis ton niveau
              </p>

              <div className="grid grid-cols-3 gap-2">
                {CLASSES.map((c) => (
                  <button
                    key={c}
                    onClick={() => setClasse(c)}
                    className={`rounded-2xl px-4 py-4 text-xl font-black shadow transition hover:scale-[1.03] ${
                      classe === c
                        ? "bg-emerald-500 text-white"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <Link
              href={`/evaluation/defi?classe=${classe}&type=diagnostique`}
              className="group rounded-3xl bg-gradient-to-br from-emerald-400 to-lime-300 p-5 text-slate-950 shadow-xl transition hover:-translate-y-1 hover:shadow-2xl"
            >
              🚀 Début d’année
            </Link>

            <Link
              href={`/evaluation/defi?classe=${classe}&type=bilan`}
              className="group rounded-3xl bg-gradient-to-br from-sky-400 to-indigo-300 p-5 text-slate-950 shadow-xl transition hover:-translate-y-1 hover:shadow-2xl"
            >
              🏆 Fin d’année
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}