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
import { displayParamForClasse } from "@/lib/tutor-v4/displayMode";

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

  const [search, setSearch] = useState("");
  const searchLower = search.trim().toLowerCase();

  const totalNotions = notionOptions.length;
  const totalMicros = notionOptions.reduce(
    (sum, id) => sum + (notionMicroMap[id]?.length ?? 0),
    0
  );

  function handleClick(notionId: string, microId: string) {
    router.push(
      `/tutor-v4?classe=${encodeURIComponent(niveau)}&matiere=english-maths&notion=${encodeURIComponent(notionId)}&microId=${encodeURIComponent(microId)}&${displayParamForClasse(niveau)}`
    );
  }

  return (
    <main className="min-h-screen bg-[#f0f4ff] text-slate-800">
      <div className="flex min-h-screen">
        {/* Sidebar niveaux */}
        <aside className="sticky top-0 hidden h-screen w-24 shrink-0 border-r border-slate-200 bg-white md:flex md:flex-col md:items-center md:gap-3 md:py-6">
          {/* ⛔ 10/09/2026 — LA PASTILLE « EN » EST PARTIE, comme la « IA » de
              /coach-ia/[matiere] : même forme et même taille que les niveaux
              juste dessous, sans en être un — la seule de la colonne où le
              clic ne fait rien. Les quatre coachs se ressemblent, leur colonne
              aussi. */}
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
            {/* ⭐⭐ 10/09/2026 — LE CHAMP PASSE EN TÊTE, comme sur les autres
                coachs et sur `/accueil` : ce qu'on cherche avant ce qu'on nous
                dit — et, sur téléphone, DEVANT les pastilles de niveau, qui ne
                vivent que dans le bloc `md:hidden` juste en dessous. C'est LE
                MÊME champ (état `search`, filtrage à la frappe), pas un
                second — seules sa place et sa taille changent. Il était sous le
                titre, en `text-sm` et `sm:max-w-md`, plus petit que les trois
                compteurs posés à côté de lui.
                ⚠️ Le placeholder reste en anglais : toute cette page l'est, et
                c'est son objet même — faire des maths en anglais. */}
            <div className="relative mb-6">
              <span className="pointer-events-none absolute inset-y-0 left-5 flex items-center text-lg text-slate-400">
                🔍
              </span>
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search a skill…"
                aria-label="Search a category or skill"
                className={[
                  "w-full rounded-full border-2 border-slate-300 bg-white py-4 pl-14 text-base text-slate-800 shadow-sm outline-none placeholder:text-slate-400 focus:border-sky-600 focus:ring-2 focus:ring-sky-600/20 sm:text-lg",
                  "[&::-webkit-search-cancel-button]:appearance-none",
                  search ? "pr-14" : "pr-5",
                ].join(" ")}
              />
              {search ? (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  aria-label="Clear the search"
                  className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-sky-600 text-lg text-white transition hover:bg-sky-700"
                >
                  <span aria-hidden="true">×</span>
                </button>
              ) : null}
            </div>

            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                {/* ⛔ Le surtitre « Coach IA » est parti, comme sur
                    /coach-ia/[matiere] : Frédéric a dicté l'ordre — barre de
                    recherche, puis le titre, puis ce que la page offre. Le
                    surtitre s'intercalait entre les deux premiers.
                    ⚠️ La ligne du bas reprend la promesse française du jour
                    (« séries d'exercices avec correction et score ! »), en
                    anglais parce que toute la page l'est. */}
                <h1 className="text-4xl font-bold tracking-tight text-sky-600 sm:text-5xl">
                  English Maths — {niveauLabels[niveau]}
                </h1>
                <p className="mt-2 text-sm text-slate-500 font-medium">
                  {niveauDescriptions[niveau]}
                </p>
                <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600 sm:text-base">
                  Exercise sets with corrections and a score!
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

            {/* ⭐ Les niveaux descendent sous le titre, sur téléphone seulement
                (`md:hidden` : au-delà, c'est l'`<aside>` qui les porte). Même
                raison que sur /coach-ia/[matiere] — l'ordre demandé est barre,
                titre, promesse, et les pastilles s'y intercalaient. */}
            <div className="mt-5 flex flex-wrap gap-2 md:hidden">
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
          </header>

          <div className="columns-1 gap-8 lg:columns-2 2xl:columns-3">
            {domaines.map((domaine) => {
              const notionsAvecMicros = domaine.notions
                .map((notionId) => ({ notionId, micros: notionMicroMap[notionId] ?? [] }))
                .filter((item) => {
                  if (!searchLower) return item.micros.length > 0;
                  const notionMatch = notionLabel(item.notionId, niveau, "english-maths")
                    .toLowerCase()
                    .includes(searchLower);
                  const filteredMicros = item.micros.filter((microId) =>
                    (microLabels[microId] || microId).toLowerCase().includes(searchLower)
                  );
                  return notionMatch ? item.micros.length > 0 : filteredMicros.length > 0;
                })
                .map((item) => {
                  if (!searchLower) return item;
                  const notionMatch = notionLabel(item.notionId, niveau, "english-maths")
                    .toLowerCase()
                    .includes(searchLower);
                  return {
                    ...item,
                    micros: notionMatch
                      ? item.micros
                      : item.micros.filter((microId) =>
                          (microLabels[microId] || microId).toLowerCase().includes(searchLower)
                        ),
                  };
                });

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
