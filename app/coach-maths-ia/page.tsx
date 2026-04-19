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

const CLASSES: Classe[] = ["6e", "5e", "4e"];

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

  if (classe === "5e") {
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

  return [
    {
      id: "nombres-calculs",
      label: "Nombres et calculs",
      notions: [
        "nombres_relatifs",
        "operations_relatifs",
        "fractions",
        "proportionnalite",
      ],
    },
    {
      id: "algebre",
      label: "Algèbre",
      notions: [
        "expressions_litterales",
        "distributivite",
        "identites_remarquables",
        "factorisation",
        "equations",
      ],
    },
    {
      id: "geometrie-plane",
      label: "Géométrie plane",
      notions: [
        "triangles",
        "pythagore",
        "transformations",
        "parallelogrammes",
      ],
    },
    {
      id: "grandeurs-mesures",
      label: "Grandeurs et mesures",
      notions: ["grandeurs", "perimetres", "aires", "volumes"],
    },
    {
      id: "donnees",
      label: "Données",
      notions: ["statistiques", "probabilites"],
    },
  ];
}

function getClasseTitle(classe: Classe) {
  if (classe === "6e") return "Réussir ma 6 ème";
  if (classe === "5e") return "Réussir ma 5 ème";
  return "Réussir ma 4 ème";
}

function getClasseSubtitle(classe: Classe) {
  if (classe === "6e") {
    return "Voici les compétences essentielles en mathématiques de Sixième, organisées pour travailler pas à pas.";
  }

  if (classe === "5e") {
    return "Voici les compétences essentielles en mathématiques de Cinquième, organisées pour progresser avec méthode.";
  }

  return "Voici les compétences essentielles en mathématiques de Quatrième, avec un accent particulier sur l’algèbre, la géométrie et le raisonnement.";
}

function getMicroButtonStyle(microId: string) {
  if (microId.includes("defis")) {
    return "border-emerald-200 bg-emerald-50/95 text-emerald-900 hover:bg-emerald-100";
  }

  if (
    microId.includes("lire") ||
    microId.includes("reconnaitre") ||
    microId.includes("comparer") ||
    microId.includes("mesurer") ||
    microId.includes("identifier")
  ) {
    return "border-sky-200 bg-sky-50/95 text-sky-900 hover:bg-sky-100";
  }

  return "border-slate-200 bg-white/95 text-slate-800 hover:bg-orange-50 hover:border-orange-200";
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
    <main className="min-h-screen w-full bg-[url('/images/reunion.png')] bg-cover bg-center bg-fixed">
      <div className="min-h-screen w-full bg-gradient-to-b from-black/40 via-black/30 to-black/50">
        <div className="mx-auto flex max-w-[1400px]">
          <aside className="hidden min-h-screen w-[96px] flex-col items-center border-r border-white/15 bg-white/10 pt-8 shadow-sm backdrop-blur-sm md:flex">
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
                        ? "bg-orange-500 text-white shadow-lg ring-4 ring-white/20"
                        : "border border-white/30 bg-white/90 text-orange-500 hover:bg-orange-50",
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
              <h1 className="text-4xl font-light tracking-tight text-white sm:text-5xl">
                {getClasseTitle(classe)}
              </h1>

              <p className="mt-4 max-w-4xl text-base leading-7 text-white/90">
                {getClasseSubtitle(classe)} Clique sur une micro-compétence pour
                démarrer un entraînement ciblé avec le tutor.
              </p>

              <p className="mt-3 text-sm italic text-white/90 sm:text-base">
                "Ici à La Réunion, on avance pas à pas… mais on avance toujours."
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
                          : "border border-white/30 bg-white/90 text-orange-600",
                      ].join(" ")}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <span className="rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white shadow-sm backdrop-blur-sm">
                  📚 {totalNotions} notions
                </span>
                <span className="rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white shadow-sm backdrop-blur-sm">
                  🎯 {totalMicros} micro-compétences
                </span>
                <span className="rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white shadow-sm backdrop-blur-sm">
                  🚀 progression guidée
                </span>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                {domaines.map((domaine) => (
                  <span
                    key={domaine.id}
                    className="rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white shadow-sm backdrop-blur-sm"
                  >
                    {domaine.label}
                  </span>
                ))}
              </div>
            </header>

            <div className="mt-10 space-y-10">
              {domaines.map((domaine) => (
                <section
                  key={domaine.id}
                  className="rounded-3xl border border-white/15 bg-white/10 p-5 shadow-xl backdrop-blur-sm sm:p-6"
                >
                  <h2 className="mb-6 text-2xl font-semibold text-orange-300">
                    {domaine.label}
                  </h2>

                  <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
                    {domaine.notions.map((notionId) => {
                      const micros = notionMicroMap[notionId] || [];

                      return (
                        <article key={notionId} className="min-w-0">
                          <div className="mb-3 flex items-center justify-between gap-3">
                            <h3 className="text-[32px] font-semibold leading-tight text-lime-300">
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
                                  "shadow-sm",
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
      </div>
    </main>
  );
}