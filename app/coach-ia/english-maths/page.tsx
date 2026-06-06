"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  getNotionOptions,
  getNotionMicroMap,
  getMicroLabelMap,
  getDomaineMap,
  notionLabel,
  type NiveauEnglish,
} from "@/lib/tutor-v4/catalog";

const NIVEAUX: NiveauEnglish[] = ["a1", "a2", "b1", "b2"];

const niveauLabels: Record<NiveauEnglish, string> = {
  a1: "A1",
  a2: "A2",
  b1: "B1",
  b2: "B2",
};

const niveauDescriptions: Record<NiveauEnglish, string> = {
  a1: "Numbers, operations, geometry & basic verbs",
  a2: "Operations verbs — subtract, multiply, divide…",
  b1: "Reasoning verbs — estimate, justify, simplify…",
  b2: "Academic verbs — prove, interpret, derive…",
};

function getNiveauBadgeColor(niveau: NiveauEnglish, active: boolean) {
  if (!active) return "border-slate-200 bg-white text-sky-600 hover:bg-sky-50";
  switch (niveau) {
    case "a1": return "border-lime-500 bg-lime-500 text-white";
    case "a2": return "border-sky-500 bg-sky-500 text-white";
    case "b1": return "border-violet-500 bg-violet-500 text-white";
    case "b2": return "border-rose-500 bg-rose-500 text-white";
  }
}

function getDomaineAccent(domaineId: string) {
  if (domaineId.includes("NUMBERS"))    return { title: "text-green-700",  pill: "bg-green-100 text-green-800" };
  if (domaineId.includes("OPERATIONS")) return { title: "text-orange-600", pill: "bg-orange-100 text-orange-700" };
  if (domaineId.includes("GEOMETRY"))   return { title: "text-sky-700",    pill: "bg-sky-100 text-sky-800" };
  if (domaineId.includes("VERBS"))      return { title: "text-violet-700", pill: "bg-violet-100 text-violet-800" };
  return { title: "text-slate-700", pill: "bg-slate-100 text-slate-800" };
}

function normalizeNiveau(value: string | null): NiveauEnglish {
  return (NIVEAUX as string[]).includes(value ?? "") ? (value as NiveauEnglish) : "a1";
}

function CoachEnglishInner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [niveau, setNiveau] = useState<NiveauEnglish>(() =>
    normalizeNiveau(searchParams.get("niveau"))
  );

  useEffect(() => {
    setNiveau(normalizeNiveau(searchParams.get("niveau")));
  }, [searchParams]);

  const notionOptions = getNotionOptions(niveau, "english-maths");
  const notionMicroMap = getNotionMicroMap(niveau, "english-maths");
  const microLabels = getMicroLabelMap(niveau, "english-maths");
  const domaines = useMemo(() => getDomaineMap(niveau, "english-maths"), [niveau]);

  const totalNotions = notionOptions.length;
  const totalMicros = notionOptions.reduce(
    (sum, id) => sum + (notionMicroMap[id]?.length ?? 0),
    0
  );

  function handleClick(notionId: string, microId: string) {
    router.push(
      `/tutor-v4?classe=${encodeURIComponent(niveau)}&matiere=english-maths&notion=${encodeURIComponent(notionId)}&microId=${encodeURIComponent(microId)}&display=simple`
    );
  }

  return (
    <main className="min-h-screen bg-[#f0f4ff] text-slate-800">
      <div className="flex min-h-screen">
        {/* Sidebar niveaux */}
        <aside className="sticky top-0 hidden h-screen w-24 shrink-0 border-r border-slate-200 bg-white md:flex md:flex-col md:items-center md:gap-3 md:py-6">
          <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-sky-500 text-sm font-black text-white">
            EN
          </div>
          {NIVEAUX.map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setNiveau(n)}
              className={[
                "flex h-14 w-14 items-center justify-center rounded-full border text-sm font-black transition",
                getNiveauBadgeColor(n, niveau === n),
              ].join(" ")}
            >
              {niveauLabels[n]}
            </button>
          ))}
        </aside>

        <section className="w-full px-4 py-5 sm:px-6 lg:px-8">
          <header className="mb-6 border-b border-slate-200 pb-5">
            {/* Niveaux mobiles */}
            <div className="mb-4 flex flex-wrap gap-2 md:hidden">
              {NIVEAUX.map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setNiveau(n)}
                  className={[
                    "rounded-full border px-4 py-2 text-sm font-black transition",
                    getNiveauBadgeColor(n, niveau === n),
                  ].join(" ")}
                >
                  {niveauLabels[n]}
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Coach IA
                </p>
                <h1 className="mt-1 text-4xl font-bold tracking-tight text-sky-600 sm:text-5xl">
                  English Maths — {niveauLabels[niveau]}
                </h1>
                <p className="mt-2 text-sm text-slate-500 font-medium">
                  {niveauDescriptions[niveau]}
                </p>
                <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600 sm:text-base">
                  Choose a category, then a skill to practise.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="rounded-full border border-sky-300 bg-white px-4 py-2 text-sm font-semibold text-sky-600">
                  {totalNotions} notions
                </span>
                <span className="rounded-full border border-violet-300 bg-white px-4 py-2 text-sm font-semibold text-violet-700">
                  {totalMicros} skills
                </span>
                <span className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-600">
                  🔊 Audio available
                </span>
              </div>
            </div>
          </header>

          <div className="columns-1 gap-8 lg:columns-2 2xl:columns-3">
            {domaines.map((domaine) => {
              const notionsAvecMicros = domaine.notions
                .map((notionId) => ({ notionId, micros: notionMicroMap[notionId] ?? [] }))
                .filter((item) => item.micros.length > 0);

              if (notionsAvecMicros.length === 0) return null;

              const accent = getDomaineAccent(domaine.id);

              return (
                <section
                  key={domaine.id}
                  className="mb-8 break-inside-avoid rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200"
                >
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <h2 className={["text-xl font-bold", accent.title].join(" ")}>
                      {domaine.label}
                    </h2>
                    <span className={["rounded-full px-3 py-1 text-xs font-bold", accent.pill].join(" ")}>
                      {notionsAvecMicros.length}
                    </span>
                  </div>

                  <div className="space-y-5">
                    {notionsAvecMicros.map(({ notionId, micros }) => (
                      <article key={notionId}>
                        <h3 className="mb-2 text-base font-bold text-slate-800">
                          {notionLabel(notionId, niveau, "english-maths")}
                        </h3>
                        <ol className="space-y-1">
                          {micros.map((microId, index) => (
                            <li key={microId}>
                              <button
                                type="button"
                                onClick={() => handleClick(notionId, microId)}
                                className="group flex w-full items-start gap-2 rounded-lg px-2 py-1.5 text-left text-sm leading-5 transition text-sky-700 hover:bg-sky-50"
                              >
                                <span className="w-6 shrink-0 font-semibold text-slate-500">
                                  {index + 1}
                                </span>
                                <span className="underline-offset-2 group-hover:underline">
                                  {microLabels[microId] || microId}
                                </span>
                                {microId.includes("listen") && (
                                  <span className="ml-1 rounded-full bg-sky-100 px-2 py-0.5 text-xs font-bold text-sky-600">
                                    🔊
                                  </span>
                                )}
                              </button>
                            </li>
                          ))}
                        </ol>
                      </article>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}

export default function CoachEnglish() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f0f4ff]" />}>
      <CoachEnglishInner />
    </Suspense>
  );
}
