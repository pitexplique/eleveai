import Link from "next/link";

const lessons = [
  {
    day: 1,
    title: "Jour 1 — Calculer 10%",
    rule: "10%, c’est diviser par 10.",
    example: "10% de 80 = 80 ÷ 10 = 8",
    remember: "Pour trouver 10%, je décale mentalement ou je divise par 10.",
  },
  {
    day: 2,
    title: "Jour 2 — Calculer 50% et 25%",
    rule: "50%, c’est la moitié. 25%, c’est le quart.",
    example: "50% de 40 = 20 et 25% de 40 = 10",
    remember: "25%, c’est diviser par 4.",
  },
  {
    day: 3,
    title: "Jour 3 — Calculer 20% et 30%",
    rule: "20% = 2 × 10% et 30% = 3 × 10%.",
    example: "30% de 70 : 10% de 70 = 7, donc 30% = 21",
    remember: "Je calcule d’abord 10%, puis je multiplie.",
  },
  {
    day: 4,
    title: "Jour 4 — 100%, 200%, 300%",
    rule: "100%, c’est tout. 200%, c’est le double. 300%, c’est le triple.",
    example: "200% de 45 = 90",
    remember: "100% = la quantité entière.",
  },
  {
    day: 5,
    title: "Jour 5 — Calculer 1%, 2%, 3%",
    rule: "1%, c’est diviser par 100.",
    example: "3% de 200 : 1% = 2, donc 3% = 6",
    remember: "Je calcule 1%, puis je multiplie.",
  },
  {
    day: 6,
    title: "Jour 6 — Révision",
    rule: "On choisit la méthode la plus rapide.",
    example: "25% de 80 = 80 ÷ 4 = 20",
    remember: "10%, 50%, 25% sont des raccourcis très utiles.",
  },
  {
    day: 7,
    title: "Jour 7 — Défi final",
    rule: "Je combine les méthodes.",
    example: "75% de 60 = 50% de 60 + 25% de 60 = 30 + 15 = 45",
    remember: "Je peux décomposer un pourcentage pour aller plus vite.",
  },
];

export default function LeconPourcentagesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-emerald-50 px-4 py-6 text-slate-900">
      <section className="mx-auto max-w-3xl">
        <Link
          href="/lecon-du-jour"
          className="mb-4 inline-flex rounded-full bg-white px-4 py-2 text-sm font-bold text-orange-700 shadow hover:bg-orange-50"
        >
          ← Retour à la leçon audio
        </Link>

        <div className="rounded-[2rem] border border-orange-200 bg-white/95 p-5 shadow-xl sm:p-7">
          <p className="text-sm font-black uppercase tracking-wide text-orange-600">
            Leçon écrite
          </p>

          <h1 className="mt-2 text-3xl font-black sm:text-4xl">
            📖 Pourcentages
          </h1>

          <p className="mt-3 text-slate-600">
            Une semaine pour apprendre les pourcentages essentiels, étape par
            étape.
          </p>

          <div className="mt-6 grid gap-4">
            {lessons.map((lesson) => (
              <article
                key={lesson.day}
                className="rounded-3xl border border-orange-100 bg-gradient-to-br from-orange-50 to-yellow-50 p-4 shadow-sm"
              >
                <div className="mb-2 flex items-center justify-between gap-3">
                  <h2 className="text-xl font-black text-orange-700">
                    {lesson.title}
                  </h2>

                  <span className="rounded-full bg-orange-500 px-3 py-1 text-xs font-black text-white">
                    J{lesson.day}
                  </span>
                </div>

                <div className="mt-3 space-y-3 text-base leading-relaxed">
                  <p>
                    <span className="font-black text-slate-900">Règle : </span>
                    {lesson.rule}
                  </p>

                  <p className="rounded-2xl bg-white p-3 font-bold text-slate-800">
                    Exemple : {lesson.example}
                  </p>

                  <p className="text-emerald-700">
                    ✅ À retenir : {lesson.remember}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <Link
              href="/lecon-du-jour"
              className="rounded-2xl bg-orange-500 px-5 py-3 text-center font-black text-white shadow hover:bg-orange-600"
            >
              🎧 Écouter la leçon
            </Link>

            <Link
              href="/coach-ia/maths"
              className="rounded-2xl bg-purple-500 px-5 py-3 text-center font-black text-white shadow hover:bg-purple-600"
            >
              🧠 Coach IA
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}