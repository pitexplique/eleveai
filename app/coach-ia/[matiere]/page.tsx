"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  getNotionOptions,
  getNotionMicroMap,
  getMicroLabelMap,
  getDomaineMap,
  notionLabel,
  type Classe,
  type Matiere,
} from "@/lib/tutor-v4/catalog";

const CLASSES: Classe[] = ["cp", "ce1", "ce2", "cm1", "cm2", "6e", "5e", "4e", "3e", "terminale-spe"];
const FRANCAIS_READY_CLASSES: Classe[] = ["cp", "ce1", "ce2", "cm1", "cm2"];

function getClassesForMatiere(matiere: Matiere): Classe[] {
  return matiere === "francais" ? FRANCAIS_READY_CLASSES : CLASSES;
}

function getMatiereTitle(matiere: string, classe: Classe) {
  const classeLabel: Record<Classe, string> = {
    cp: "CP",
    ce1: "CE1",
    ce2: "CE2",
    cm1: "CM1",
    cm2: "CM2",
    "6e": "6e",
    "5e": "5e",
    "4e": "4e",
    "3e": "3e",
    "terminale-spe": "Term Spe",
  };
  const matiereLabel: Record<string, string> = {
    maths: "Maths",
    francais: "Français",
  };
  return `${matiereLabel[matiere] ?? matiere} ${classeLabel[classe] ?? classe}`;
}

function getMatiereColor(matiere: string) {
  switch (matiere) {
    case "maths":    return "text-orange-500";
    case "francais": return "text-sky-600";
    default:         return "text-slate-700";
  }
}

function getClasseBadgeColor(item: Classe, active: boolean) {
  if (!active) {
    return "border-slate-200 bg-white text-orange-500 hover:bg-orange-50";
  }
  if (["cp", "ce1", "ce2", "cm1", "cm2", "6e"].includes(item))
    return "border-lime-500 bg-lime-500 text-white";
  if (["5e", "4e", "3e", "terminale-spe"].includes(item))
    return "border-sky-500 bg-sky-500 text-white";
  return "border-violet-500 bg-violet-500 text-white";
}

function getMicroButtonStyle(microId: string) {
  if (microId.includes("defis")) return "text-orange-700 hover:bg-orange-50";
  return "text-green-800 hover:bg-green-50";
}

function getDomaineAccent(domaineId: string) {
  if (domaineId.includes("N") || domaineId.includes("P"))
    return { title: "text-green-700", pill: "bg-green-100 text-green-800" };
  if (domaineId.includes("G"))
    return { title: "text-sky-700", pill: "bg-sky-100 text-sky-800" };
  if (domaineId.includes("M"))
    return { title: "text-orange-600", pill: "bg-orange-100 text-orange-700" };
  if (domaineId.includes("D"))
    return { title: "text-violet-700", pill: "bg-violet-100 text-violet-800" };
  return { title: "text-slate-700", pill: "bg-slate-100 text-slate-800" };
}

export default function CoachIA() {
  const router = useRouter();
  const params = useParams();
  const matiere = ((params?.matiere as string) ?? "maths") as Matiere;

  const defaultClasse: Classe = matiere === "francais" ? "cp" : "6e";
  const [classe, setClasse] = useState<Classe>(defaultClasse);
  const classes = useMemo(() => getClassesForMatiere(matiere), [matiere]);

  useEffect(() => {
    if (!classes.includes(classe)) {
      setClasse(classes[0] ?? defaultClasse);
    }
  }, [classe, classes, defaultClasse]);

  const notionOptions = getNotionOptions(classe, matiere);
  const notionMicroMap = getNotionMicroMap(classe, matiere);
  const microLabels = getMicroLabelMap(classe, matiere);

  const domaines = useMemo(() => getDomaineMap(classe, matiere), [classe, matiere]);

  const totalNotions = notionOptions.length;
  const totalMicros = notionOptions.reduce((sum, notionId) => {
    return sum + (notionMicroMap[notionId]?.length ?? 0);
  }, 0);

  function handleClick(notionId: string, microId: string) {
    router.push(
      `/tutor-v4?classe=${encodeURIComponent(classe)}&matiere=${encodeURIComponent(matiere)}&notion=${encodeURIComponent(notionId)}&microId=${encodeURIComponent(microId)}`
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f8ef] text-slate-800">
      <div className="flex min-h-screen">
        {/* Sidebar classes */}
        <aside className="sticky top-0 hidden h-screen w-24 shrink-0 border-r border-slate-200 bg-white md:flex md:flex-col md:items-center md:gap-3 md:py-6">
          <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500 text-lg font-bold text-white">
            IA
          </div>
          {classes.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setClasse(item)}
              className={[
                "flex h-14 w-14 items-center justify-center rounded-full border text-lg font-bold transition",
                getClasseBadgeColor(item, classe === item),
              ].join(" ")}
            >
              {item}
            </button>
          ))}
        </aside>

        <section className="w-full px-4 py-5 sm:px-6 lg:px-8">
          <header className="mb-6 border-b border-slate-200 pb-5">
            {/* Classes mobiles */}
            <div className="mb-4 flex flex-wrap gap-2 md:hidden">
              {classes.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setClasse(item)}
                  className={[
                    "rounded-full border px-4 py-2 text-sm font-bold transition",
                    getClasseBadgeColor(item, classe === item),
                  ].join(" ")}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Coach IA
                </p>
                <h1 className={["mt-1 text-4xl font-bold tracking-tight sm:text-5xl", getMatiereColor(matiere)].join(" ")}>
                  {getMatiereTitle(matiere, classe)}
                </h1>
                <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600 sm:text-base">
                  Choisis une compétence, puis une micro-compétence pour t&apos;entraîner.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="rounded-full border border-orange-300 bg-white px-4 py-2 text-sm font-semibold text-orange-600">
                  {totalNotions} notions
                </span>
                <span className="rounded-full border border-green-300 bg-white px-4 py-2 text-sm font-semibold text-green-700">
                  {totalMicros} micro-compétences
                </span>
                {matiere === "francais" ? (
                  <span className="rounded-full border border-sky-200 bg-sky-50 px-4 py-2 text-sm font-semibold text-sky-700">
                    CP, CE1, CE2, CM1 et CM2 ouverts
                  </span>
                ) : null}
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
                          {notionLabel(notionId, classe, matiere)}
                        </h3>
                        <ol className="space-y-1">
                          {micros.map((microId, index) => (
                            <li key={microId}>
                              <button
                                type="button"
                                onClick={() => handleClick(notionId, microId)}
                                className={[
                                  "group flex w-full items-start gap-2 rounded-lg px-2 py-1.5 text-left text-sm leading-5 transition",
                                  getMicroButtonStyle(microId),
                                ].join(" ")}
                              >
                                <span className="w-6 shrink-0 font-semibold text-slate-500">
                                  {index + 1}
                                </span>
                                <span className="underline-offset-2 group-hover:underline">
                                  {microLabels[microId] || microId}
                                </span>
                                {microId.includes("defis") && (
                                  <span className="ml-1 rounded-full bg-orange-100 px-2 py-0.5 text-xs font-bold text-orange-600">
                                    défi
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
