"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getNotionOptions,
  getNotionMicroMap,
  getMicroLabelMap,
  notionLabel,
  type Classe,
} from "@/lib/tutor-v4/catalog";

const CLASSES: Classe[] = ["6e", "5e"];

type Domaine = {
  id: string;
  label: string;
  notions: string[];
};

function buildDomaines(classe: Classe): Domaine[] {
  if (classe === "6e") {
    return [
      {
        id: "nombres-calculs",
        label: "Nombres et calculs",
        notions: ["decimaux", "fractions", "proportionnalite", "calcul_mental"],
      },
      {
        id: "grandeurs-mesures",
        label: "Grandeurs et mesures",
        notions: ["perimetres", "aires", "longueurs", "volumes"],
      },
      {
        id: "espace-geometrie",
        label: "Espace et géométrie",
        notions: ["angles", "triangles", "quadrilateres"],
      },
      {
        id: "donnees",
        label: "Données",
        notions: ["statistiques", "probabilites"],
      },
    ];
  }

  return [
    {
      id: "nombres-calculs",
      label: "Nombres et calculs",
      notions: [
        "nombres_relatifs",
        "operations_relatifs",
        "fractions",
        "proportionnalite",
        "calcul_litteral",
      ],
    },
    {
      id: "geometrie-plane",
      label: "Géométrie plane",
      notions: ["angles", "triangles", "symetrie_centrale"],
    },
    {
      id: "grandeurs-mesures",
      label: "Grandeurs et mesures",
      notions: ["aires", "volumes"],
    },
    {
      id: "donnees",
      label: "Données",
      notions: ["statistiques", "probabilites"],
    },
  ];
}

function getClasseTitle(classe: Classe) {
  return classe === "6e" ? "Réussir ma 6e" : "Réussir ma 5e";
}

function getClasseSubtitle(classe: Classe) {
  return classe === "6e"
    ? "Voici les compétences essentielles en mathématiques de Sixième, organisées pour travailler pas à pas."
    : "Voici les compétences essentielles en mathématiques de Cinquième, organisées pour progresser avec méthode.";
}

function getMicroButtonStyle(microId: string) {
  if (microId.includes("defis")) {
    return "border-emerald-200 bg-emerald-50 text-emerald-800 hover:bg-emerald-100";
  }

  if (
    microId.includes("lire") ||
    microId.includes("reconnaitre") ||
    microId.includes("comparer") ||
    microId.includes("mesurer") ||
    microId.includes("identifier")
  ) {
    return "border-sky-200 bg-sky-50 text-sky-800 hover:bg-sky-100";
  }

  return "border-slate-200 bg-white text-slate-800 hover:bg-orange-50 hover:border-orange-200";
}

export default function CoachMathsIA() {
  const router = useRouter();
  const [classe, setClasse] = useState<Classe>("6e");

  const notionOptions = getNotionOptions(classe);
  const notionMicroMap = getNotionMicroMap(classe);
  const microLabels = getMicroLabelMap(classe);

  const totalNotions = notionOptions.length;
  const totalMicros = notionOptions.reduce((sum, notionId) => {
    return sum + (notionMicroMap[notionId]?.length ?? 0);
  }, 0);

  const domaines = useMemo(() => {
    const defs = buildDomaines(classe);

    return defs
      .map((domaine) => ({
        ...domaine,
        notions: domaine.notions.filter((id) => notionOptions.includes(id)),
      }))
      .filter((domaine) => domaine.notions.length > 0);
  }, [classe, notionOptions]);

  function handleClick(notionId: string, microId: string) {
    router.push(
      `/tutor-v4?classe=${encodeURIComponent(classe)}&matiere=maths&notion=${encodeURIComponent(
        notionId
      )}&microId=${encodeURIComponent(microId)}`
    );
  }

  return (
    <main className="min-h-screen bg-[#f6f6f4]">
      <div className="mx-auto flex max-w-[1400px]">
        <aside className="hidden min-h-screen w-[96px] flex-col items-center border-r border-slate-200 bg-white pt-8 shadow-sm md:flex">
          <div className="flex flex-col gap-4">
            {CLASSES.map((item) => {
              const active = classe === item;

              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => setClasse(item)}
                  className={[
                    "h-16 w-16 rounded-full text-xl font-bold transition",
                    active
                      ? "bg-orange-500 text-white shadow-lg"
                      : "border border-slate-300 bg-white text-orange-500 hover:bg-orange-50",
                  ].join(" ")}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </aside>

        <div className="flex-1 px-5 py-8 sm:px-8 md:px-10">
          <header className="max-w-5xl">
            <h1 className="text-4xl font-light tracking-tight text-orange-600 sm:text-5xl">
              {getClasseTitle(classe)}
            </h1>

            <p className="mt-4 max-w-4xl text-base leading-7 text-slate-700">
              {getClasseSubtitle(classe)} Clique sur une micro-compétence pour
              démarrer un entraînement ciblé avec le tutor.
            </p>

            <div className="mt-5 flex gap-3 md:hidden">
              {CLASSES.map((item) => {
                const active = classe === item;

                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setClasse(item)}
                    className={[
                      "rounded-full px-4 py-2 text-sm font-semibold transition",
                      active
                        ? "bg-orange-500 text-white"
                        : "border border-slate-300 bg-white text-orange-600",
                    ].join(" ")}
                  >
                    {item}
                  </button>
                );
              })}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <span className="rounded-lg border border-orange-200 bg-white px-4 py-2 text-sm font-medium text-orange-700 shadow-sm">
                📚 {totalNotions} notions
              </span>
              <span className="rounded-lg border border-orange-200 bg-white px-4 py-2 text-sm font-medium text-orange-700 shadow-sm">
                🎯 {totalMicros} micro-compétences
              </span>
              <span className="rounded-lg border border-orange-200 bg-white px-4 py-2 text-sm font-medium text-orange-700 shadow-sm">
                🚀 progression guidée
              </span>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              {domaines.map((domaine) => (
                <span
                  key={domaine.id}
                  className="rounded-lg border border-orange-200 bg-white px-4 py-2 text-sm font-medium text-orange-700 shadow-sm"
                >
                  {domaine.label}
                </span>
              ))}
            </div>
          </header>

          <div className="mt-10 space-y-10">
            {domaines.map((domaine) => (
              <section key={domaine.id}>
                <h2 className="mb-6 text-2xl font-semibold text-orange-600">
                  {domaine.label}
                </h2>

                <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
                  {domaine.notions.map((notionId) => {
                    const micros = notionMicroMap[notionId] || [];

                    return (
                      <article key={notionId} className="min-w-0">
                        <div className="mb-3 flex items-center justify-between gap-3">
                          <h3 className="text-[32px] font-semibold leading-tight text-lime-600">
                            {notionLabel(notionId, classe)}
                          </h3>
                          <span className="shrink-0 rounded-full bg-lime-50 px-3 py-1 text-xs font-semibold text-lime-700">
                            {micros.length} micro{micros.length > 1 ? "s" : ""}
                          </span>
                        </div>

                        <div className="space-y-2">
                          {micros.map((microId, index) => (
                            <button
                              key={microId}
                              onClick={() => handleClick(notionId, microId)}
                              className={[
                                "flex w-full items-start gap-3 rounded-xl border px-3 py-3 text-left transition",
                                getMicroButtonStyle(microId),
                              ].join(" ")}
                            >
                              <span className="min-w-[42px] font-bold text-slate-900">
                                {String.fromCharCode(65 + (index % 26))}.{index + 1}
                              </span>

                              <span className="text-sm leading-5">
                                {microLabels[microId] || microId}
                              </span>
                            </button>
                          ))}
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}