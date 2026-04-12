"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getNotionOptions,
  getNotionMicroMap,
  microLabel,
  notionLabel,
} from "@/lib/tutor-v4/catalog";

export default function CoachMathsIA() {
  const router = useRouter();
  const [classe, setClasse] = useState<"6e" | "5e">("6e");

  const notions = useMemo(() => getNotionOptions(classe), [classe]);
  const notionMicros = useMemo(() => getNotionMicroMap(classe), [classe]);

  function handleClick(notionId: string, microId: string) {
    router.push(`/tutor-v4?classe=${classe}&notion=${notionId}&microId=${microId}`);
  }

  function getColor(microId: string) {
    if (microId.includes("defis")) return "green";

    if (
      microId.includes("angle") ||
      microId.includes("add") ||
      microId.includes("addition") ||
      microId.includes("compare") ||
      microId.includes("comparer") ||
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
        <div className="mx-auto max-w-5xl text-center text-white">
          <h1 className="text-4xl font-extrabold sm:text-5xl">Coach Maths IA</h1>

          <p className="mt-3 text-lg opacity-95 sm:text-xl">
            Choisis une compétence et progresse à ton rythme
          </p>

          <div className="mx-auto mt-4 inline-flex items-center gap-2 rounded-2xl border border-white/30 bg-white/20 p-2">
            <button
              type="button"
              onClick={() => setClasse("6e")}
              className={`rounded-xl px-4 py-2 text-sm font-bold transition ${
                classe === "6e"
                  ? "bg-white text-slate-900"
                  : "bg-transparent text-white hover:bg-white/20"
              }`}
            >
              6e
            </button>
            <button
              type="button"
              onClick={() => setClasse("5e")}
              className={`rounded-xl px-4 py-2 text-sm font-bold transition ${
                classe === "5e"
                  ? "bg-white text-slate-900"
                  : "bg-transparent text-white hover:bg-white/20"
              }`}
            >
              5e
            </button>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-6xl space-y-10">
          {notions.map((notionId) => {
            const micros = notionMicros[notionId] || [];

            return (
              <section
                key={notionId}
                className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-sm"
              >
                <h2 className="mb-5 text-2xl font-bold text-white">
                  {notionLabel(notionId, classe)}
                </h2>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                  {micros.map((microId) => (
                    <button
                      key={microId}
                      onClick={() => handleClick(notionId, microId)}
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
                      {microLabel(microId, classe)}
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
