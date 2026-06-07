import Link from "next/link";

const lessons = [
  {
    day: 1,
    title: "Jour 1 - Situation de hasard",
    rule:
      "Une situation de hasard est une situation dont on ne peut pas prevoir le resultat avec certitude.",
    example:
      "Quand on lance un de, on ne sait pas a l'avance si le resultat sera 1, 2, 3, 4, 5 ou 6.",
    remember:
      "On parle de hasard quand le resultat n'est pas connu avant l'experience.",
  },
  {
    day: 2,
    title: "Jour 2 - Issues et evenement",
    rule:
      "Les issues sont tous les resultats possibles. Un evenement est une condition que l'on observe parmi ces issues.",
    example:
      "Avec un de, les issues sont 1, 2, 3, 4, 5, 6. L'evenement obtenir un nombre pair contient 2, 4 et 6.",
    remember:
      "Avant de calculer une probabilite, je liste les issues possibles et les issues favorables.",
  },
  {
    day: 3,
    title: "Jour 3 - Impossible, possible, certain",
    rule:
      "Un evenement impossible ne peut jamais arriver. Un evenement certain arrive toujours. Un evenement possible peut arriver ou ne pas arriver.",
    example:
      "Avec un de classique, obtenir 7 est impossible, obtenir un nombre entre 1 et 6 est certain, obtenir 4 est possible.",
    remember:
      "Impossible correspond a 0, certain correspond a 1, possible est entre 0 et 1.",
  },
  {
    day: 4,
    title: "Jour 4 - Probabilite entre 0 et 1",
    rule:
      "Une probabilite est toujours un nombre compris entre 0 et 1.",
    example:
      "0 signifie aucune chance, 1 signifie toutes les chances, et 1/2 signifie une chance sur deux.",
    remember:
      "Une probabilite ne peut pas etre negative et ne peut pas etre plus grande que 1.",
  },
  {
    day: 5,
    title: "Jour 5 - Equiprobabilite",
    rule:
      "Il y a equiprobabilite quand toutes les issues ont la meme chance d'arriver.",
    example:
      "Avec un de bien equilibre, chaque face a la meme chance de sortir : 1 chance sur 6.",
    remember:
      "En equiprobabilite, aucune issue n'est favorisee par rapport aux autres.",
  },
  {
    day: 6,
    title: "Jour 6 - Calculer une probabilite",
    rule:
      "En equiprobabilite, la probabilite d'un evenement se calcule avec la fraction : issues favorables / issues possibles.",
    example:
      "Avec un de, obtenir un nombre pair a 3 issues favorables : 2, 4, 6. Il y a 6 issues possibles. La probabilite est donc 3/6 = 1/2.",
    remember:
      "Je compte les issues favorables, je compte toutes les issues possibles, puis j'ecris la fraction.",
  },
  {
    day: 7,
    title: "Jour 7 - Fraction, decimal, pourcentage",
    rule:
      "Une probabilite peut s'ecrire sous forme de fraction, de nombre decimal ou de pourcentage.",
    example:
      "1/2 = 0,5 = 50%. Ces trois ecritures representent la meme probabilite.",
    remember:
      "Les fractions et les pourcentages servent aussi a exprimer des probabilites.",
  },
];

export default function LeconProbabilitesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-cyan-50 to-violet-50 px-4 py-6 text-slate-900">
      <section className="mx-auto max-w-3xl">
        <Link
          href="/podcast-maths"
          className="mb-4 inline-flex rounded-full bg-white px-4 py-2 text-sm font-bold text-emerald-700 shadow hover:bg-emerald-50"
        >
          Retour a la lecon audio
        </Link>

        <div className="rounded-[2rem] border border-emerald-200 bg-white/95 p-5 shadow-xl sm:p-7">
          <p className="text-sm font-black uppercase tracking-wide text-emerald-600">
            Lecon ecrite
          </p>

          <h1 className="mt-2 text-3xl font-black sm:text-4xl">
            Probabilites
          </h1>

          <p className="mt-3 text-slate-600">
            Une semaine pour comprendre le hasard, les issues,
            l'equiprobabilite et les probabilites entre 0 et 1.
          </p>

          <div className="mt-6 grid gap-4">
            {lessons.map((lesson) => (
              <article
                key={lesson.day}
                className="rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-cyan-50 p-4 shadow-sm"
              >
                <div className="mb-2 flex items-center justify-between gap-3">
                  <h2 className="text-xl font-black text-emerald-700">
                    {lesson.title}
                  </h2>

                  <span className="rounded-full bg-emerald-500 px-3 py-1 text-xs font-black text-white">
                    J{lesson.day}
                  </span>
                </div>

                <div className="mt-3 space-y-3 text-base leading-relaxed">
                  <p>
                    <span className="font-black text-slate-900">Regle : </span>
                    {lesson.rule}
                  </p>

                  <p className="rounded-2xl bg-white p-3 font-bold text-slate-800">
                    Exemple : {lesson.example}
                  </p>

                  <p className="text-emerald-700">
                    A retenir : {lesson.remember}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <Link
              href="/podcast-maths"
              className="rounded-2xl bg-emerald-500 px-5 py-3 text-center font-black text-white shadow hover:bg-emerald-600"
            >
              Ecouter la lecon
            </Link>

            <Link
              href="/tutor-v4?classe=6e&matiere=maths&notion=proba_experience&microId=proba_vocabulaire"
              className="rounded-2xl bg-violet-500 px-5 py-3 text-center font-black text-white shadow hover:bg-violet-600"
            >
              Coach IA
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
