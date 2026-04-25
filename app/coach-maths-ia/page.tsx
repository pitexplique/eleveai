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

type ViewMode = "competences" | "defis" | "progression";

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
  if (classe === "6e") return "Réussir ma 6e avec mon coach IA";
  if (classe === "5e") return "Réussir ma 5e avec mon coach IA";
  return "Réussir ma 4e avec mon coach IA";
}

function getClasseSubtitle(classe: Classe) {
  if (classe === "6e") {
    return "Choisis ce que tu veux faire aujourd’hui : t’entraîner, relever un défi, ou suivre ta progression.";
  }

  if (classe === "5e") {
    return "Travaille tes compétences, réponds à des défis et progresse pas à pas.";
  }

  return "Renforce l’algèbre, la géométrie et le raisonnement avec un parcours simple et motivant.";
}

function getHeroColor(classe: Classe) {
  if (classe === "6e") return "from-lime-500 to-green-600";
  if (classe === "5e") return "from-sky-500 to-cyan-600";
  return "from-violet-500 to-indigo-600";
}

function getClasseBadgeColor(classe: Classe, item: Classe, active: boolean) {
  if (!active) {
    return "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50";
  }

  if (item === "6e") return "bg-lime-600 text-white";
  if (item === "5e") return "bg-sky-600 text-white";
  return "bg-violet-600 text-white";
}

function getModeCardStyle(mode: ViewMode, current: ViewMode) {
  const isActive = mode === current;

  if (mode === "competences") {
    return isActive
      ? "border-lime-500 bg-lime-500 text-white shadow-lg"
      : "border-lime-200 bg-lime-50 text-lime-900 hover:bg-lime-100";
  }

  if (mode === "defis") {
    return isActive
      ? "border-emerald-500 bg-emerald-500 text-white shadow-lg"
      : "border-emerald-200 bg-emerald-50 text-emerald-900 hover:bg-emerald-100";
  }

  return isActive
    ? "border-sky-500 bg-sky-500 text-white shadow-lg"
    : "border-sky-200 bg-sky-50 text-sky-900 hover:bg-sky-100";
}

function getMicroButtonStyle(microId: string) {
  if (microId.includes("defis")) {
    return "border-emerald-200 bg-emerald-50 text-emerald-900 hover:bg-emerald-100";
  }

  if (
    microId.includes("lire") ||
    microId.includes("reconnaitre") ||
    microId.includes("comparer") ||
    microId.includes("mesurer") ||
    microId.includes("identifier")
  ) {
    return "border-sky-200 bg-sky-50 text-sky-900 hover:bg-sky-100";
  }

  return "border-slate-200 bg-white text-slate-800 hover:bg-amber-50 hover:border-amber-200";
}

function getDomaineAccent(domaineId: string) {
  if (domaineId.includes("nombres")) {
    return {
      title: "text-lime-700",
      pill: "bg-lime-100 text-lime-800",
      card: "bg-white",
    };
  }

  if (domaineId.includes("geometrie") || domaineId.includes("espace")) {
    return {
      title: "text-sky-700",
      pill: "bg-sky-100 text-sky-800",
      card: "bg-white",
    };
  }

  if (domaineId.includes("grandeurs")) {
    return {
      title: "text-amber-700",
      pill: "bg-amber-100 text-amber-800",
      card: "bg-white",
    };
  }

  if (domaineId.includes("donnees")) {
    return {
      title: "text-violet-700",
      pill: "bg-violet-100 text-violet-800",
      card: "bg-white",
    };
  }

  return {
    title: "text-slate-700",
    pill: "bg-slate-100 text-slate-800",
    card: "bg-white",
  };
}

function filterMicrosByMode(micros: string[], mode: ViewMode) {
  if (mode === "defis") {
    return micros.filter((microId) => microId.includes("defis"));
  }

  if (mode === "competences") {
    return micros.filter((microId) => !microId.includes("defis"));
  }

  return [];
}

export default function CoachMathsIA() {
  const router = useRouter();
  const [classe, setClasse] = useState<Classe>("6e");
  const [mode, setMode] = useState<ViewMode>("competences");

  const notionOptions = getNotionOptions(classe);
  const notionMicroMap = getNotionMicroMap(classe);
  const microLabels = getMicroLabelMap(classe);

  const domaines = useMemo(() => {
    const defs = buildDomaines(classe);

    return defs
      .map((domaine) => ({
        ...domaine,
        notions: domaine.notions.filter((id) => notionOptions.includes(id)),
      }))
      .filter((domaine) => domaine.notions.length > 0);
  }, [classe, notionOptions]);

  const totalNotions = notionOptions.length;

  const totalMicros = notionOptions.reduce((sum, notionId) => {
    const micros = notionMicroMap[notionId] ?? [];
    return sum + filterMicrosByMode(micros, mode).length;
  }, 0);

  function handleClick(notionId: string, microId: string) {
    router.push(
      `/tutor-v4?classe=${encodeURIComponent(classe)}&matiere=maths&notion=${encodeURIComponent(
        notionId
      )}&microId=${encodeURIComponent(microId)}`
    );
  }

  return (
    <main className="min-h-screen bg-[#eef7ea] text-slate-800">
      <section
        className={[
          "relative overflow-hidden border-b border-black/5 bg-gradient-to-b",
          getHeroColor(classe),
        ].join(" ")}
      >
        <div className="absolute inset-0 bg-white/12" />
        <div className="absolute -left-16 top-8 h-40 w-40 rounded-full bg-white/15 blur-2xl" />
        <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 h-24 w-24 rounded-full bg-yellow-200/20 blur-2xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div className="rounded-2xl bg-white/95 px-4 py-2 shadow-sm">
              <p className="text-sm font-bold tracking-wide text-slate-700">
                Coach Maths IA
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {CLASSES.map((item) => {
                const active = classe === item;

                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setClasse(item)}
                    className={[
                      "rounded-full px-4 py-2 text-sm font-semibold transition shadow-sm",
                      getClasseBadgeColor(classe, item, active),
                    ].join(" ")}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr] lg:items-center">
            <div className="rounded-[2rem] bg-white/90 p-6 shadow-xl backdrop-blur sm:p-8">
              <p className="mb-3 inline-flex rounded-full bg-lime-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-lime-700">
                Parcours personnalisé
              </p>

              <h1 className="text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl lg:text-4xl">
                {getClasseTitle(classe)}
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
                {getClasseSubtitle(classe)}
              </p>

              <p className="mt-4 text-sm font-medium text-slate-700">
                Aujourd’hui, qu’est-ce qui t’intéresse ?
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
                  📚 {totalNotions} notions
                </span>
                <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
                  🎯 {totalMicros} éléments affichés
                </span>
                <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
                  {mode === "competences" && "Mode compétences"}
                  {mode === "defis" && "Mode défis"}
                  {mode === "progression" && "Mode progression"}
                </span>
              </div>
            </div>

            <div className="grid gap-3">
              <div className="rounded-[2rem] bg-white/85 p-5 shadow-lg">
                <div className="text-3xl">🌞</div>
                <p className="mt-3 text-lg font-semibold text-slate-800">
                  Une page plus claire
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Pour travailler dans une ambiance plus scolaire, plus douce et plus motivante.
                </p>
              </div>

              <div className="rounded-[2rem] bg-white/85 p-5 shadow-lg">
                <div className="text-3xl">⭐</div>
                <p className="mt-3 text-lg font-semibold text-slate-800">
                  Progression visible
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Compétences, défis et futur suivi dans une interface simple.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="grid gap-4 md:grid-cols-3">
          <button
            type="button"
            onClick={() => setMode("competences")}
            className={[
              "rounded-[2rem] border p-6 text-left transition",
              getModeCardStyle(mode, "competences"),
            ].join(" ")}
          >
            <div className="text-3xl">📘</div>
            <h2 className="mt-3 text-lg font-semibold">Améliorer mes compétences</h2>
            <p className="mt-2 text-sm leading-6 opacity-90">
              Travaille une notion précise, étape par étape.
            </p>
          </button>

          <button
            type="button"
            onClick={() => setMode("defis")}
            className={[
              "rounded-[2rem] border p-6 text-left transition",
              getModeCardStyle(mode, "defis"),
            ].join(" ")}
          >
            <div className="text-3xl">🚀</div>
            <h2 className="mt-3 text-lg font-semibold">Répondre à des défis</h2>
            <p className="mt-2 text-sm leading-6 opacity-90">
              Résous des problèmes plus concrets et plus motivants.
            </p>
          </button>

          <button
            type="button"
            onClick={() => setMode("progression")}
            className={[
              "rounded-[2rem] border p-6 text-left transition",
              getModeCardStyle(mode, "progression"),
            ].join(" ")}
          >
            <div className="text-3xl">📈</div>
            <h2 className="mt-3 text-lg font-semibold">Voir ma progression</h2>
            <p className="mt-2 text-sm leading-6 opacity-90">
              Retrouve bientôt tes réussites, tes étoiles et tes points forts.
            </p>
          </button>
        </section>

        {mode === "progression" ? (
          <section className="mt-8 rounded-[2rem] border border-sky-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-semibold text-sky-700">
              Ta progression arrive bientôt
            </h2>

            <p className="mt-3 max-w-2xl text-slate-600">
              Ici, tu pourras voir tes réussites, les notions déjà travaillées,
              les défis réussis et les compétences à revoir.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-[1.5rem] bg-yellow-50 p-5">
                <div className="text-3xl">⭐</div>
                <p className="mt-3 font-semibold text-slate-800">Étoiles gagnées</p>
                <p className="mt-1 text-sm text-slate-600">
                  Tes réussites seront visibles ici.
                </p>
              </div>

              <div className="rounded-[1.5rem] bg-lime-50 p-5">
                <div className="text-3xl">🎯</div>
                <p className="mt-3 font-semibold text-slate-800">
                  Compétences maîtrisées
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  Tu verras ce que tu sais déjà bien faire.
                </p>
              </div>

              <div className="rounded-[1.5rem] bg-sky-50 p-5">
                <div className="text-3xl">🧭</div>
                <p className="mt-3 font-semibold text-slate-800">Prochain objectif</p>
                <p className="mt-1 text-sm text-slate-600">
                  Une direction claire pour progresser.
                </p>
              </div>
            </div>
          </section>
        ) : (
          <div className="mt-8 space-y-8">
            {domaines.map((domaine) => {
              const notionsAvecMicros = domaine.notions
                .map((notionId) => {
                  const micros = notionMicroMap[notionId] || [];
                  const filteredMicros = filterMicrosByMode(micros, mode);

                  return {
                    notionId,
                    micros: filteredMicros,
                  };
                })
                .filter((item) => item.micros.length > 0);

              if (notionsAvecMicros.length === 0) return null;

              const accent = getDomaineAccent(domaine.id);

              return (
                <section
                  key={domaine.id}
                  className="rounded-[2rem] border border-slate-200 bg-[#f8fbf6] p-4 shadow-sm sm:p-6"
                >
                  <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <h2 className={["text-2xl font-semibold", accent.title].join(" ")}>
                      {domaine.label}
                    </h2>

                    <span
                      className={[
                        "w-fit rounded-full px-3 py-1 text-xs font-semibold",
                        accent.pill,
                      ].join(" ")}
                    >
                      {notionsAvecMicros.length} notion
                      {notionsAvecMicros.length > 1 ? "s" : ""}
                    </span>
                  </div>

                  <div className="grid gap-6 xl:grid-cols-2">
                    {notionsAvecMicros.map(({ notionId, micros }) => (
                      <article
                        key={notionId}
                        className="rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-sm"
                      >
                        <div className="mb-4 flex items-start justify-between gap-3">
                          <h3 className="text-xl font-semibold leading-tight text-slate-800 sm:text-2xl">
                            {notionLabel(notionId, classe)}
                          </h3>

                          <span className="shrink-0 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                            {micros.length}
                          </span>
                        </div>

                        <div className="space-y-2">
                          {micros.map((microId, index) => (
                            <button
                              key={microId}
                              type="button"
                              onClick={() => handleClick(notionId, microId)}
                              className={[
                                "flex w-full items-start gap-3 rounded-2xl border px-3 py-3 text-left transition shadow-sm",
                                getMicroButtonStyle(microId),
                              ].join(" ")}
                            >
                              <span className="min-w-[42px] font-bold text-slate-900">
                                {index + 1}.
                              </span>

                              <span className="text-sm leading-5 sm:text-[15px]">
                                {microLabels[microId] || microId}
                              </span>
                            </button>
                          ))}
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}