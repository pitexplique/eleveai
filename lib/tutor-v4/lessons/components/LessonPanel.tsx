import type { TutorLesson } from "../types";

export function LessonPanel({
  lesson,
  onClose,
}: {
  lesson: TutorLesson | null;
  onClose: () => void;
}) {
  if (!lesson) {
    return (
      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <Mascotte message="Hmm… je n’ai pas encore de leçon pour ça 🤔" />

        <div className="mb-3 text-lg font-black text-slate-900">
          📘 Leçon écrite
        </div>

        <p className="text-sm text-slate-600">
          Aucune leçon disponible pour cette mission.
        </p>

        <button
          type="button"
          onClick={onClose}
          className="mt-4 rounded-2xl bg-slate-900 px-4 py-2 text-sm font-black text-white"
        >
          Retour à la mission
        </button>
      </section>
    );
  }

  return (
    <section className="relative rounded-3xl border border-sky-200 bg-white p-5 shadow-xl">
      {/* Mascotte */}
      <Mascotte message="Je t’explique ça simplement 👇" />

      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h2 className="text-xl font-black text-slate-900">
            📘 {lesson.title}
          </h2>

          {lesson.subtitle ? (
            <p className="mt-1 text-sm font-semibold text-sky-700">
              {lesson.subtitle}
            </p>
          ) : null}
        </div>

        <button
          type="button"
          onClick={onClose}
          className="rounded-full bg-slate-100 px-3 py-1 text-sm font-bold text-slate-700 hover:bg-slate-200"
        >
          ✕
        </button>
      </div>

      <div className="space-y-5">
        {lesson.blocks.map((block) => (
          <div key={block.title}>
            <h3 className="mb-2 text-base font-black text-orange-600">
              {block.title}
            </h3>

            <div className="space-y-2">
              {block.items.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl bg-slate-50 p-3 text-sm leading-relaxed text-slate-800 transition hover:bg-slate-100"
                >
                  💡 {item}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* encouragement */}
      <div className="mt-5 rounded-2xl bg-emerald-50 p-3 text-sm font-semibold text-emerald-800">
        🦎 Astuce : Lis une idée, puis retourne essayer la question !
      </div>

      <button
        type="button"
        onClick={onClose}
        className="mt-5 w-full rounded-2xl bg-sky-500 px-4 py-3 text-sm font-black text-white shadow hover:bg-sky-600"
      >
        🚀 Retour à l’exercice
      </button>
    </section>
  );
}

/* =========================
   MASCOTTE
========================= */

function Mascotte({ message }: { message: string }) {
  return (
    <div className="mb-4 flex items-center gap-3 rounded-2xl bg-amber-50 p-3">
      <div className="text-3xl">🦎</div>

      <div className="rounded-xl bg-white px-3 py-2 text-sm font-semibold text-slate-800 shadow-sm">
        {message}
      </div>
    </div>
  );
}