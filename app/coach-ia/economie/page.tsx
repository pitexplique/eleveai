"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  getNotionOptions,
  getNotionMicroMap,
  getMicroLabelMap,
  getDomaineMap,
  type Classe,
} from "@/lib/tutor-v4/catalog";

const MATIERE = "economie" as const;
const CLASSES: Classe[] = ["4e"];

const CLASSE_LABELS: Record<string, string> = {
  "4e": "4e",
  "3e": "3e",
  "5e": "5e",
};

const RUBRIQUE_ICONS: Record<string, string> = {
  ECO_4E_ENTREPRISE: "🏭",
  ECO_4E_MARCHE:     "📈",
  ECO_4E_TRAVAIL:    "💼",
  ECO_4E_MONNAIE:    "💶",
  ECO_4E_BUDGET:     "🧾",
  ECO_4E_FISCALITE:  "⚖️",
  ECO_4E_ELECTIONS:  "🗳️",
};

const RUBRIQUE_COLORS: Record<string, { bg: string; border: string; title: string; pill: string }> = {
  ECO_4E_ENTREPRISE: { bg: "bg-amber-50",   border: "border-amber-200",  title: "text-amber-700",  pill: "bg-amber-100 text-amber-800"  },
  ECO_4E_MARCHE:     { bg: "bg-emerald-50", border: "border-emerald-200",title: "text-emerald-700",pill: "bg-emerald-100 text-emerald-800"},
  ECO_4E_TRAVAIL:    { bg: "bg-sky-50",     border: "border-sky-200",    title: "text-sky-700",    pill: "bg-sky-100 text-sky-800"       },
  ECO_4E_MONNAIE:    { bg: "bg-blue-50",    border: "border-blue-200",   title: "text-blue-700",   pill: "bg-blue-100 text-blue-800"     },
  ECO_4E_BUDGET:     { bg: "bg-violet-50",  border: "border-violet-200", title: "text-violet-700", pill: "bg-violet-100 text-violet-800" },
  ECO_4E_FISCALITE:  { bg: "bg-rose-50",    border: "border-rose-200",   title: "text-rose-700",   pill: "bg-rose-100 text-rose-800"     },
  ECO_4E_ELECTIONS:  { bg: "bg-orange-50",  border: "border-orange-200", title: "text-orange-700", pill: "bg-orange-100 text-orange-800" },
};

const DEFAULT_COLORS = { bg: "bg-slate-50", border: "border-slate-200", title: "text-slate-700", pill: "bg-slate-100 text-slate-800" };

export default function CoachEconomie() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [classe, setClasse] = useState<Classe>(
    (searchParams.get("classe") as Classe) ?? "4e"
  );

  const notionOptions  = getNotionOptions(classe, MATIERE);
  const notionMicroMap = getNotionMicroMap(classe, MATIERE);
  const microLabels    = getMicroLabelMap(classe, MATIERE);
  const domaines       = useMemo(() => getDomaineMap(classe, MATIERE), [classe]);

  const totalNotions = notionOptions.length;
  const totalMicros  = notionOptions.reduce((sum, id) => sum + (notionMicroMap[id]?.length ?? 0), 0);

  function handleClick(notionId: string, microId: string) {
    router.push(
      `/tutor-v4?classe=${encodeURIComponent(classe)}&matiere=${encodeURIComponent(MATIERE)}&notion=${encodeURIComponent(notionId)}&microId=${encodeURIComponent(microId)}&display=simple`
    );
  }

  return (
    <main className="min-h-screen bg-[#f9f6f0] text-slate-800">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">

        {/* ── Header ─────────────────────────────────────────────────────────── */}
        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <span className="text-4xl">💰</span>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-amber-600">Coach IA</p>
              <h1 className="text-4xl font-black text-amber-700 sm:text-5xl">Économie</h1>
            </div>
          </div>
          <p className="mt-2 max-w-2xl text-sm text-slate-500 sm:text-base">
            Entreprise, marché, travail, monnaie, fiscalité, élections… comprends l&apos;économie qui fait l&apos;actualité.
          </p>

          {/* Classe selector */}
          <div className="mt-4 flex flex-wrap gap-2">
            {CLASSES.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setClasse(c)}
                className={[
                  "rounded-full border px-5 py-2 text-sm font-black transition",
                  classe === c
                    ? "border-amber-500 bg-amber-500 text-white shadow"
                    : "border-amber-200 bg-white text-amber-600 hover:bg-amber-50",
                ].join(" ")}
              >
                {CLASSE_LABELS[c] ?? c}
              </button>
            ))}
            <span className="ml-auto flex items-center gap-2 text-xs text-slate-400 font-semibold">
              <span className="rounded-full border border-amber-200 bg-white px-3 py-1.5 text-amber-600">{totalNotions} notions</span>
              <span className="rounded-full border border-amber-200 bg-white px-3 py-1.5 text-amber-600">{totalMicros} exercices</span>
            </span>
          </div>
        </header>

        {/* ── Rubriques ───────────────────────────────────────────────────────── */}
        <div className="flex flex-col gap-6">
          {domaines.map((domaine) => {
            const colors = RUBRIQUE_COLORS[domaine.id] ?? DEFAULT_COLORS;
            const icon   = RUBRIQUE_ICONS[domaine.id] ?? "📚";

            return (
              <div
                key={domaine.id}
                className={[
                  "rounded-2xl border p-5 shadow-sm",
                  colors.bg,
                  colors.border,
                ].join(" ")}
              >
                {/* Titre domaine */}
                <div className="mb-4 flex items-center gap-2">
                  <span className="text-2xl">{icon}</span>
                  <h2 className={["text-lg font-black", colors.title].join(" ")}>
                    {domaine.label}
                  </h2>
                </div>

                {/* Notions + micro-skills */}
                <div className="flex flex-col gap-4">
                  {domaine.notions.map((notionId) => {
                    const micros = notionMicroMap[notionId] ?? [];
                    return (
                      <div key={notionId}>
                        <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500">
                          {notionId.replace(/eco_4e_/i, "").replace(/_/g, " ")}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {micros.map((microId) => (
                            <button
                              key={microId}
                              type="button"
                              onClick={() => handleClick(notionId, microId)}
                              className={[
                                "rounded-full border px-4 py-2 text-sm font-semibold transition hover:scale-[1.03] hover:shadow-sm",
                                colors.pill,
                                colors.border,
                              ].join(" ")}
                            >
                              {microLabels[microId] ?? microId}
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </main>
  );
}
