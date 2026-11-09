"use client";

// « MES NOTIONS » — la version élève du bilan prof (/prof/classes/bilan) :
// chaque notion de maths travaillée au coach, et pour chacune ses micros
// 🟩 compris · 🟧 en cours · 🟥 pas compris, avec réponses justes / réponses.
// Mêmes seuils que le prof : 80 % de justes sur 3 réponses au moins = compris,
// moins de 50 % = pas compris. Données : /api/mes-notions.

import Link from "next/link";
import { useEffect, useState } from "react";
import { displayParamForClasse } from "@/lib/tutor-v4/displayMode";

type Micro = { id: string; libelle: string; j: number; t: number };
type Notion = {
  cle: string;
  titre: string;
  classe: string;
  notionId: string;
  derniere: string;
  nbMicrosNotion: number;
  micros: Micro[];
};

type Verdict = "compris" | "en-cours" | "pas-compris";

function verdict(m: Micro): Verdict {
  if (m.t < 3) return "en-cours";
  const r = m.j / m.t;
  return r >= 0.8 ? "compris" : r < 0.5 ? "pas-compris" : "en-cours";
}

const STYLE: Record<Verdict, { pastille: string; libelle: string }> = {
  compris: { pastille: "bg-emerald-200 text-emerald-900", libelle: "🟩 compris" },
  "en-cours": { pastille: "bg-amber-100 text-amber-900", libelle: "🟧 en cours" },
  "pas-compris": { pastille: "bg-red-200 text-red-900", libelle: "🟥 pas compris" },
};

export default function CarteMesNotions({ token }: { token: string }) {
  const [notions, setNotions] = useState<Notion[] | null>(null);

  useEffect(() => {
    let actif = true;
    fetch("/api/mes-notions", { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then((d) => {
        if (actif) setNotions(d?.ok ? (d.notions as Notion[]) : []);
      })
      .catch(() => actif && setNotions([]));
    return () => {
      actif = false;
    };
  }, [token]);

  if (notions === null) return null;

  return (
    <div className="mt-6 rounded-[2rem] border border-emerald-200 bg-white p-6 shadow-xl">
      <h2 className="text-2xl font-black text-slate-900">🧠 Mes notions et micros compris</h2>
      <p className="mt-1 text-sm font-semibold text-slate-600">
        Toutes tes séances du Coach de maths, cumulées. Compris = 80 % de bonnes réponses ou plus,
        sur 3 réponses au moins.
      </p>

      {notions.length === 0 ? (
        <div className="mt-4 rounded-2xl bg-amber-50 p-4 font-bold text-amber-800">
          Rien encore : fais une série au Coach de maths et tes notions s&apos;afficheront ici.
        </div>
      ) : (
        <ul className="mt-4 space-y-4">
          {notions.map((n) => {
            const compris = n.micros.filter((m) => verdict(m) === "compris").length;
            const total = Math.max(n.nbMicrosNotion, n.micros.length);
            return (
              <li key={n.cle} className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="text-lg font-black text-slate-900">{n.titre}</p>
                    <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                      {n.classe} · {new Date(n.derniere).toLocaleDateString("fr-FR")}
                    </p>
                  </div>
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-black text-emerald-800">
                    {compris} / {total} micro{total > 1 ? "s" : ""} compris
                  </span>
                </div>
                <ul className="mt-3 grid gap-2 md:grid-cols-2">
                  {n.micros.map((m) => {
                    const v = verdict(m);
                    return (
                      <li
                        key={m.id}
                        className="flex items-center justify-between gap-3 rounded-xl bg-white px-3 py-2 ring-1 ring-slate-100"
                      >
                        <span className="text-sm font-semibold text-slate-800">{m.libelle}</span>
                        <span
                          className={`shrink-0 rounded-lg px-2 py-1 text-xs font-black ${STYLE[v].pastille}`}
                          title={STYLE[v].libelle}
                        >
                          {m.j}/{m.t}
                        </span>
                      </li>
                    );
                  })}
                </ul>
                <Link
                  href={`/coach/serie?classe=${encodeURIComponent(n.classe)}&matiere=maths&notion=${encodeURIComponent(
                    n.notionId
                  )}&${displayParamForClasse(n.classe)}`}
                  className="mt-3 inline-block text-sm font-black text-indigo-700 underline underline-offset-2"
                >
                  Continuer cette notion →
                </Link>
              </li>
            );
          })}
        </ul>
      )}

      <p className="mt-4 text-xs font-semibold text-slate-500">
        🟩 compris · 🟧 en cours · 🟥 pas compris (moins de 50 %)
      </p>
    </div>
  );
}
