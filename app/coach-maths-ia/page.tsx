"use client";

import { useRouter } from "next/navigation";
import {
  NOTION_OPTIONS,
  NOTION_MICRO_MAP,
  MICRO_LABELS,
} from "@/lib/tutor-v4/catalog";

export default function CoachMathsIA() {
  const router = useRouter();

  function handleClick(notionId: string, microId: string) {
    router.push(`/tutor-v4?notion=${notionId}&microId=${microId}`);
  }

  function getColor(microId: string) {
    if (microId.includes("defis")) return "green";
    if (
      microId.includes("angle") ||
      microId.includes("add") ||
      microId.includes("compare") ||
      microId.includes("identifier")
    ) {
      return "blue";
    }
    return "gray";
  }

  function getButtonClasses(microId: string) {
    const color = getColor(microId);

    if (color === "green") {
      return "bg-green-500 text-white hover:bg-green-600";
    }

    if (color === "blue") {
      return "bg-blue-500 text-white hover:bg-blue-600";
    }

    return "bg-white/90 text-slate-800 hover:bg-blue-500 hover:text-white";
  }

  return (
    <div className="min-h-screen w-full bg-[url('/images/reunion.png')] bg-cover bg-center bg-fixed">
      <div className="min-h-screen w-full bg-gradient-to-b from-black/30 via-black/20 to-black/40 px-6 py-10">
        {/* HEADER */}
        <div className="mx-auto max-w-5xl text-center text-white">
          <h1 className="text-4xl font-extrabold sm:text-5xl">
            Coach Maths IA
          </h1>

          <p className="mt-3 text-lg opacity-95 sm:text-xl">
            Choisis une compétence et progresse à ton rythme
          </p>

          <p className="mt-2 text-sm italic opacity-85 sm:text-base">
            "À La Réunion, on avance pas à pas… mais on avance toujours."
          </p>
        </div>

        {/* CONTENU */}
        <div className="mx-auto mt-10 max-w-6xl space-y-10">
          {NOTION_OPTIONS.map((notion) => {
            const micros = NOTION_MICRO_MAP[notion.id] || [];

            return (
              <section
                key={notion.id}
                className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-sm"
              >
                {/* TITRE NOTION */}
                <h2 className="mb-5 text-2xl font-bold text-white">
                  {notion.label}
                </h2>

                {/* GRID MICRO SKILLS */}
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                  {micros.map((microId) => (
                    <button
                      key={microId}
                      onClick={() => handleClick(notion.id, microId)}
                      className={[
                        "rounded-xl",
                        "p-3",
                        "text-sm",
                        "font-semibold",
                        "shadow-md",
                        "transition",
                        "duration-200",
                        "hover:scale-105",
                        "min-h-[84px]",
                        "flex",
                        "items-center",
                        "justify-center",
                        "text-center",
                        getButtonClasses(microId),
                      ].join(" ")}
                    >
                      {MICRO_LABELS[microId] || microId}
                    </button>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}