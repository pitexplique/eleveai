"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import {
  getNotionOptions,
  getNotionMicroMap,
  getMicroLabelMap,
  getDomaineMap,
  notionLabel,
  type Classe,
  type Matiere,
} from "@/lib/tutor-v4/catalog";
import FloatingCoach from "@/components/FloatingCoach";
import BoiteAOutils from "@/components/BoiteAOutils";

const CLASSES: Classe[] = ["cp", "ce1", "ce2", "cm1", "cm2", "6e", "5e", "4e", "3e", "seconde", "terminale-spe", "adulte"];
const FRANCAIS_READY_CLASSES: Classe[] = ["cp", "ce1", "ce2", "cm1", "cm2", "6e", "5e", "4e", "3e"];
const ECONOMIE_CLASSES: Classe[] = ["eco-decouverte", "eco-college", "eco-lycee"];
const ESPAGNOL_CLASSES: Classe[] = ["a1", "a2", "b1", "b2"];

function getClassesForMatiere(matiere: Matiere): Classe[] {
  if (matiere === "francais") return FRANCAIS_READY_CLASSES;
  if (matiere === "economie") return ECONOMIE_CLASSES;
  if (matiere === "espagnol") return ESPAGNOL_CLASSES;
  return CLASSES;
}

function normalizeClasse(value: string | null, classes: Classe[], fallback: Classe): Classe {
  return classes.includes(value as Classe) ? (value as Classe) : fallback;
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
    seconde: "Seconde",
    "terminale-spe": "Term Spe",
    adulte: "Calculs du quotidien",
    a1: "A1",
    a2: "A2",
    b1: "B1",
    b2: "B2",
    "eco-decouverte": "Déco.",
    "eco-college":    "Collège",
    "eco-lycee":      "Lycée",
  };
  const matiereLabel: Record<string, string> = {
    maths: "Maths",
    francais: "Français",
    economie: "Économie",
    espagnol: "Espagnol",
    "english-maths": "English",
  };
  return `${matiereLabel[matiere] ?? matiere} ${classeLabel[classe] ?? classe}`;
}

function getMatiereColor(matiere: string) {
  switch (matiere) {
    case "maths":    return "text-orange-500";
    case "francais": return "text-sky-600";
    case "economie": return "text-amber-600";
    case "espagnol": return "text-red-600";
    case "english-maths": return "text-sky-600";
    default:         return "text-slate-700";
  }
}

function getClasseBadgeColor(item: Classe, active: boolean) {
  if (!active) {
    return "border-slate-200 bg-white text-orange-500 hover:bg-orange-50";
  }
  if (["cp", "ce1", "ce2", "cm1", "cm2", "6e"].includes(item))
    return "border-lime-500 bg-lime-500 text-white";
  if (["5e", "4e", "3e", "seconde", "terminale-spe"].includes(item))
    return "border-sky-500 bg-sky-500 text-white";
  if (item === "adulte") return "border-violet-500 bg-violet-500 text-white";
  if (item === "eco-decouverte") return "border-lime-500 bg-lime-500 text-white";
  if (item === "eco-college")    return "border-amber-500 bg-amber-500 text-white";
  if (item === "eco-lycee")      return "border-orange-500 bg-orange-500 text-white";
  if (item === "a1") return "border-green-500 bg-green-500 text-white";
  if (item === "a2") return "border-sky-500 bg-sky-500 text-white";
  if (item === "b1") return "border-indigo-500 bg-indigo-500 text-white";
  if (item === "b2") return "border-violet-500 bg-violet-500 text-white";
  return "border-violet-500 bg-violet-500 text-white";
}

function getMicroButtonStyle(microId: string) {
  if (microId.includes("defis")) return "text-orange-700 hover:bg-orange-50";
  return "text-green-800 hover:bg-green-50";
}

function getDomaineAccent(domaineId: string) {
  // Espagnol A1
  if (domaineId === "ESP_A1_DIGITS")    return { title: "text-red-700",    pill: "bg-red-100 text-red-800"    };
  if (domaineId === "ESP_A1_NUMBERS")   return { title: "text-orange-700", pill: "bg-orange-100 text-orange-800" };
  if (domaineId === "ESP_A1_OPERATIONS")return { title: "text-amber-700",  pill: "bg-amber-100 text-amber-800"  };
  if (domaineId === "ESP_A1_SHAPES")    return { title: "text-sky-700",    pill: "bg-sky-100 text-sky-800"    };
  if (domaineId === "ESP_A1_COLORS")    return { title: "text-violet-700", pill: "bg-violet-100 text-violet-800"};
  if (domaineId === "ESP_A1_FAMILY")    return { title: "text-pink-700",   pill: "bg-pink-100 text-pink-800"  };
  if (domaineId === "ESP_A1_SCHOOL")    return { title: "text-emerald-700",pill: "bg-emerald-100 text-emerald-800"};
  if (domaineId === "ESP_A1_BODY")      return { title: "text-teal-700",   pill: "bg-teal-100 text-teal-800"  };
  if (domaineId === "ESP_A1_FOOD")      return { title: "text-lime-700",   pill: "bg-lime-100 text-lime-800"  };
  if (domaineId === "ESP_A1_ANIMALS")   return { title: "text-green-700",  pill: "bg-green-100 text-green-800"};
  if (domaineId === "ESP_A1_CLOTHES")   return { title: "text-indigo-700", pill: "bg-indigo-100 text-indigo-800"};
  if (domaineId === "ESP_A1_HOUSE")     return { title: "text-cyan-700",   pill: "bg-cyan-100 text-cyan-800"  };
  if (domaineId === "ESP_A1_DAYS")      return { title: "text-blue-700",   pill: "bg-blue-100 text-blue-800"  };
  if (domaineId === "ESP_A1_GREETINGS") return { title: "text-rose-700",   pill: "bg-rose-100 text-rose-800"  };
  // Espagnol A2/B1/B2
  if (domaineId.startsWith("ESP_A2_") || domaineId.startsWith("ESP_B1_") || domaineId.startsWith("ESP_B2_"))
    return { title: "text-red-700", pill: "bg-red-100 text-red-800" };
  // Économie
  if (domaineId === "ECO_4E_ENTREPRISE") return { title: "text-amber-700",   pill: "bg-amber-100 text-amber-800"   };
  if (domaineId === "ECO_4E_MARCHE")     return { title: "text-emerald-700", pill: "bg-emerald-100 text-emerald-800"};
  if (domaineId === "ECO_4E_TRAVAIL")    return { title: "text-sky-700",     pill: "bg-sky-100 text-sky-800"       };
  if (domaineId === "ECO_4E_MONNAIE")    return { title: "text-blue-700",    pill: "bg-blue-100 text-blue-800"     };
  if (domaineId === "ECO_4E_BUDGET")     return { title: "text-violet-700",  pill: "bg-violet-100 text-violet-800" };
  if (domaineId === "ECO_4E_FISCALITE")  return { title: "text-rose-700",    pill: "bg-rose-100 text-rose-800"     };
  if (domaineId === "ECO_4E_ELECTIONS")  return { title: "text-orange-700",  pill: "bg-orange-100 text-orange-800" };
  // Maths
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
  const searchParams = useSearchParams();
  const matiere = ((params?.matiere as string) ?? "maths") as Matiere;

  const defaultClasse: Classe =
    matiere === "francais" ? "cp" :
    matiere === "economie" ? "eco-college" :
    matiere === "espagnol" ? "a1" :
    matiere === "english-maths" ? "a1" :
    "6e";
  const classes = useMemo(() => getClassesForMatiere(matiere), [matiere]);
  const [classe, setClasse] = useState<Classe>(() =>
    normalizeClasse(searchParams.get("classe"), classes, defaultClasse)
  );

  useEffect(() => {
    setClasse(normalizeClasse(searchParams.get("classe"), classes, defaultClasse));
  }, [searchParams, classes, defaultClasse]);

  const notionOptions = getNotionOptions(classe, matiere);
  const notionMicroMap = getNotionMicroMap(classe, matiere);
  const microLabels = getMicroLabelMap(classe, matiere);

  const domaines = useMemo(() => getDomaineMap(classe, matiere), [classe, matiere]);

  const [search, setSearch] = useState("");

  const totalNotions = notionOptions.length;
  const totalMicros = notionOptions.reduce((sum, notionId) => {
    return sum + (notionMicroMap[notionId]?.length ?? 0);
  }, 0);

  const searchLower = search.trim().toLowerCase();

  function handleClick(notionId: string, microId: string) {
    router.push(
      `/tutor-v4?classe=${encodeURIComponent(classe)}&matiere=${encodeURIComponent(matiere)}&notion=${encodeURIComponent(notionId)}&microId=${encodeURIComponent(microId)}&display=simple`
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
                    CP a 3e ouverts
                  </span>
                ) : null}
              </div>
            </div>

            {/* Barre de recherche */}
            <div className="mt-4 relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-slate-400 pointer-events-none">🔍</span>
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Rechercher une notion ou micro-compétence…"
                className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-4 text-sm text-slate-800 placeholder-slate-400 shadow-sm outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 sm:max-w-md"
              />
            </div>
          </header>

          <div className="columns-1 gap-8 lg:columns-2 2xl:columns-3">
            {domaines.map((domaine) => {
              const notionsAvecMicros = domaine.notions
                .map((notionId) => ({ notionId, micros: notionMicroMap[notionId] ?? [] }))
                .filter((item) => {
                  if (!searchLower) return item.micros.length > 0;
                  const notionMatch = notionLabel(item.notionId, classe, matiere).toLowerCase().includes(searchLower);
                  const filteredMicros = item.micros.filter((microId) =>
                    (microLabels[microId] || microId).toLowerCase().includes(searchLower)
                  );
                  return notionMatch ? item.micros.length > 0 : filteredMicros.length > 0;
                })
                .map((item) => {
                  if (!searchLower) return item;
                  const notionMatch = notionLabel(item.notionId, classe, matiere).toLowerCase().includes(searchLower);
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

      <FloatingCoach />
      {matiere === "maths" && <BoiteAOutils />}
    </main>
  );
}
