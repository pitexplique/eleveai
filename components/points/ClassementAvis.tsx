"use client";

import { useEffect, useState } from "react";

type Ligne = { rang: number; prenom: string; points: number; moi: boolean };

const MEDAILLES: Record<number, string> = { 1: "🥇", 2: "🥈", 3: "🥉" };

export default function ClassementAvis({ token }: { token: string }) {
  const [top, setTop] = useState<Ligne[]>([]);
  const [monRang, setMonRang] = useState<number | null>(null);
  const [mesPoints, setMesPoints] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let actif = true;
    (async () => {
      try {
        const res = await fetch("/api/classement", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json().catch(() => ({}));
        if (actif && res.ok && data?.ok) {
          setTop(data.top ?? []);
          setMonRang(data.monRang ?? null);
          setMesPoints(data.mesPoints ?? 0);
        }
      } catch {
        /* silencieux : le classement n'est pas critique */
      }
      if (actif) setLoading(false);
    })();
    return () => {
      actif = false;
    };
  }, [token]);

  if (loading || top.length === 0) return null;

  const jeSuisDansLeTop = top.some((l) => l.moi);

  return (
    <div className="rounded-[2rem] bg-white p-5 shadow-xl ring-1 ring-violet-100">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-xl font-black text-slate-950">🏆 Classement des avis</h2>
        <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-black text-violet-700">
          Ton établissement
        </span>
      </div>
      <p className="mt-1 text-sm font-semibold text-slate-500">
        Les élèves qui font le plus avancer EleveAI.
      </p>

      <ol className="mt-4 space-y-1.5">
        {top.map((l) => (
          <li
            key={l.rang}
            className={[
              "flex items-center justify-between rounded-2xl px-4 py-2.5",
              l.moi
                ? "bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white"
                : "bg-slate-50 text-slate-800",
            ].join(" ")}
          >
            <span className="flex items-center gap-3">
              <span className="w-6 text-center text-base font-black">
                {MEDAILLES[l.rang] ?? l.rang}
              </span>
              <span className="font-black">
                {l.prenom}
                {l.moi ? " (toi)" : ""}
              </span>
            </span>
            <span className="text-sm font-black">{l.points} pts</span>
          </li>
        ))}
      </ol>

      {!jeSuisDansLeTop && monRang ? (
        <p className="mt-3 rounded-2xl bg-violet-50 px-4 py-2.5 text-sm font-bold text-violet-800">
          Toi : {monRang}<sup>e</sup> avec {mesPoints} pts. Donne ton avis pour grimper !
        </p>
      ) : null}
    </div>
  );
}
