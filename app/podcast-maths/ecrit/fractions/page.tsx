import Link from "next/link";

const lessons = [
  {
    day: 1,
    title: "Jour 1 — Comprendre une fraction",
    rule: "Une fraction représente des parts égales d’un tout.",
    example: "3/4 signifie : on coupe en 4 parts égales et on prend 3 parts.",
    remember:
      "Le nombre du bas indique le nombre de parts égales. Il ne peut jamais être égal à 0.",
  },
  {
    day: 2,
    title: "Jour 2 — Fractions égales à 1",
    rule:
      "Quand le nombre du haut est égal au nombre du bas, la fraction vaut 1.",
    example: "3/3 = 1, 4/4 = 1, 10/10 = 1.",
    remember:
      "Si je prends toutes les parts, j’ai l’unité entière : a/a = 1, avec a différent de 0.",
  },
  {
    day: 3,
    title: "Jour 3 — Les fractions simples",
    rule: "Certaines fractions sont très utiles : 1/2, 1/4, 3/4 et 1/10.",
    example: "1/2 de 80 = 40 et 1/4 de 80 = 20.",
    remember: "1/2, c’est la moitié. 1/4, c’est le quart.",
  },
  {
    day: 4,
    title: "Jour 4 — Comparer des fractions",
    rule:
      "Quand deux fractions ont le même dénominateur, on compare les numérateurs.",
    example: "5/8 est plus grand que 3/8, car 5 parts, c’est plus que 3 parts.",
    remember:
      "Si les parts ont la même taille, la plus grande fraction est celle qui a le plus de parts.",
  },
  {
    day: 5,
    title: "Jour 5 — Fractions équivalentes",
    rule:
      "Deux fractions peuvent représenter la même quantité avec des écritures différentes.",
    example: "1/2 = 2/4 = 5/10.",
    remember:
      "Une même quantité peut avoir plusieurs écritures fractionnaires.",
  },
  {
    day: 6,
    title: "Jour 6 — Additionner des fractions",
    rule:
      "Pour additionner des fractions de même dénominateur, on additionne les numérateurs.",
    example: "2/7 + 3/7 = 5/7.",
    remember:
      "Quand le dénominateur est le même, je le garde et j’additionne les nombres du haut.",
  },
  {
    day: 7,
    title: "Jour 7 — Fraction d’une quantité",
    rule:
      "Pour calculer une fraction d’une quantité, on divise puis on multiplie.",
    example: "3/4 de 80 : 80 ÷ 4 = 20, puis 20 × 3 = 60.",
    remember:
      "Je divise par le dénominateur, puis je multiplie par le numérateur.",
  },
];

export default function LeconFractionsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-50 via-indigo-50 to-purple-50 px-4 py-6 text-slate-900">
      <section className="mx-auto max-w-3xl">
        <Link
          href="/podcast-maths"
          className="mb-4 inline-flex rounded-full bg-white px-4 py-2 text-sm font-bold text-sky-700 shadow hover:bg-sky-50"
        >
          ← Retour à la leçon audio
        </Link>

        <div className="rounded-[2rem] border border-sky-200 bg-white/95 p-5 shadow-xl sm:p-7">
          <p className="text-sm font-black uppercase tracking-wide text-sky-600">
            Leçon écrite
          </p>

          <h1 className="mt-2 text-3xl font-black sm:text-4xl">
            📖 Fractions
          </h1>

          <p className="mt-3 text-slate-600">
            Une semaine pour comprendre les fractions essentielles, étape par
            étape.
          </p>

          <div className="mt-6 grid gap-4">
            {lessons.map((lesson) => (
              <article
                key={lesson.day}
                className="rounded-3xl border border-sky-100 bg-gradient-to-br from-sky-50 to-indigo-50 p-4 shadow-sm"
              >
                <div className="mb-2 flex items-center justify-between gap-3">
                  <h2 className="text-xl font-black text-sky-700">
                    {lesson.title}
                  </h2>

                  <span className="rounded-full bg-sky-500 px-3 py-1 text-xs font-black text-white">
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
              href="/podcast-maths"
              className="rounded-2xl bg-sky-500 px-5 py-3 text-center font-black text-white shadow hover:bg-sky-600"
            >
              🎧 Écouter la leçon
            </Link>

            <Link
              href="/tutor-v4?classe=6e&matiere=maths&notion=fractions&microId=fraction_comprendre"
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