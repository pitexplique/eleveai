"use client";

// ─── Le MODE CLASSE d'une carte mentale : au tableau, les encadrés un à un ────
// ⭐ 27/10/2026 — Frédéric : « il faut rajouter un mode classe, classe au tableau,
// où on affiche les encadrés un à un ». Écran 0 : la notion et ses micros ;
// puis une micro par écran, en très grand, pour faire lever les mains (compris,
// pas tout à fait, pas compris) et noter ensemble ce qu'on a retenu.
// Flèches ← →, espace, Échap pour sortir.

import { useCallback, useEffect, useState } from "react";

type Props = { notion: string; classe: string; micros: string[] };

export default function ModeTableau({ notion, classe, micros }: Props) {
  const [ouvert, setOuvert] = useState(false);
  const [i, setI] = useState(0); // 0 = la carte entière, puis 1..n
  const dernier = micros.length;

  const fermer = useCallback(() => {
    setOuvert(false);
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
  }, []);
  const ouvrir = () => {
    setI(0);
    setOuvert(true);
    document.documentElement.requestFullscreen?.().catch(() => {});
  };

  useEffect(() => {
    if (!ouvert) return;
    const touche = (e: KeyboardEvent) => {
      if (e.key === "Escape") fermer();
      else if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
        e.preventDefault();
        setI((x) => Math.min(dernier, x + 1));
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        setI((x) => Math.max(0, x - 1));
      }
    };
    window.addEventListener("keydown", touche);
    return () => window.removeEventListener("keydown", touche);
  }, [ouvert, dernier, fermer]);

  return (
    <>
      <button
        type="button"
        onClick={ouvrir}
        className="rounded-xl bg-teal-600 px-4 py-2 text-sm font-bold text-white hover:bg-teal-500 print:hidden"
      >
        Mode classe (au tableau)
      </button>

      {ouvert && (
        <div className="fixed inset-0 z-[200] flex flex-col bg-white text-slate-900 print:hidden">
          <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-6 py-3">
            <p className="text-lg font-black text-teal-800">
              {notion} <span className="font-bold text-slate-400">· Maths {classe}</span>
            </p>
            <div className="flex items-center gap-3">
              <span className="text-base font-bold text-slate-500">
                {i === 0 ? "La carte" : `${i} / ${dernier}`}
              </span>
              <button type="button" onClick={fermer} className="rounded-lg px-3 py-1.5 text-sm font-bold text-slate-600 ring-1 ring-slate-300 hover:bg-slate-50">
                Fermer (Échap)
              </button>
            </div>
          </div>

          <div className="flex min-h-0 flex-1 flex-col px-[5vw] py-[4vh]">
            {i === 0 ? (
              <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-[4vh]">
                <div className="rounded-[50%] border-[6px] border-teal-600 bg-teal-50 px-[5vw] py-[4vh] text-center text-[5vw] font-black leading-tight text-teal-900">
                  {notion}
                </div>
                <ol className="grid w-full max-w-6xl grid-cols-2 gap-x-[3vw] gap-y-[1.5vh] text-[2.2vw] font-bold leading-snug">
                  {micros.map((m, k) => (
                    <li key={k} className="flex gap-3">
                      <span className="text-teal-700">{k + 1}.</span>
                      {m}
                    </li>
                  ))}
                </ol>
              </div>
            ) : (
              <div className="flex min-h-0 flex-1 flex-col gap-[3vh]">
                <div className="flex items-start gap-[2vw]">
                  <span className="flex h-[10vh] w-[10vh] shrink-0 items-center justify-center rounded-full bg-teal-600 text-[5vh] font-black text-white">
                    {i}
                  </span>
                  <p className="text-[4vw] font-black leading-tight">{micros[i - 1]}</p>
                </div>
                <div className="flex flex-wrap gap-[2vw] text-[2.2vw] font-black">
                  <span className="rounded-2xl bg-emerald-100 px-[2vw] py-[1vh] text-emerald-800">J&apos;ai compris</span>
                  <span className="rounded-2xl bg-amber-100 px-[2vw] py-[1vh] text-amber-800">Pas tout à fait</span>
                  <span className="rounded-2xl bg-rose-100 px-[2vw] py-[1vh] text-rose-800">Pas compris</span>
                </div>
                <div className="flex min-h-0 flex-1 flex-col rounded-3xl border-[4px] border-slate-400 p-[2vw]">
                  <p className="text-[2vw] font-black uppercase tracking-wide text-slate-400">Ce que nous avons retenu</p>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between border-t border-slate-200 px-6 py-3">
            <button
              type="button"
              onClick={() => setI((x) => Math.max(0, x - 1))}
              disabled={i === 0}
              className="rounded-xl px-5 py-3 text-lg font-black text-slate-700 ring-1 ring-slate-300 hover:bg-slate-50 disabled:opacity-30"
            >
              ← Précédent
            </button>
            <button
              type="button"
              onClick={() => (i === dernier ? fermer() : setI((x) => x + 1))}
              className="rounded-xl bg-teal-600 px-6 py-3 text-lg font-black text-white hover:bg-teal-500"
            >
              {i === dernier ? "Terminer" : i === 0 ? "Commencer →" : "Suivant →"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
