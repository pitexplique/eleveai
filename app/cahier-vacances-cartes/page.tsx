import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Printer, Dumbbell, Sparkles, Scissors } from "lucide-react";

export const metadata: Metadata = {
  title:
    "Le corps & l’esprit — Cartes de révision à imprimer (gratuit) · 6e, 1re",
  description:
    "Les cartes de révision gratuites d'EleveAI, à imprimer et découper : 4 questions par carte (maths, français, anglais, sport, nutrition) + un défi sport. On révise en bougeant, réponses au dos. « Le corps & l’esprit ».",
  keywords: [
    "cartes de révision à imprimer",
    "cartes de révision gratuites",
    "réviser en s'amusant",
    "cartes de révision 6e",
    "cartes de révision première",
    "réviser avant la 6e",
    "réviser avant la première",
    "le corps et l’esprit",
    "EleveAI",
  ],
  alternates: { canonical: "/cahier-vacances-cartes" },
  openGraph: {
    title: "Le corps & l’esprit — Cartes de révision à imprimer (gratuit)",
    description:
      "4 questions par carte + un défi sport. À imprimer, découper et défier. On révise en bougeant.",
    url: "/cahier-vacances-cartes",
    type: "website",
    siteName: "EleveAI",
    locale: "fr_FR",
  },
};

/* Catalogue des decks « Cartes défis ». Un niveau = une carte colorée.
   Dégradés en clair (literals) pour que Tailwind les génère. */
const decks = [
  { slug: "vers-le-cm2", niveau: "CM1 → CM2", titre: "Vers le CM2", theme: "Maths, français, anglais + du sport et de la nutrition fun (bien manger, ça s'apprend tôt !)", emoji: "🐠", grad: "from-teal-400 to-cyan-600" },
  { slug: "vers-la-6e", niveau: "CM2 → 6ᵉ", titre: "Vers la 6ᵉ", theme: "Maths, français, anglais, sport… + un défi sport à chaque carte", emoji: "🎒", grad: "from-yellow-400 to-amber-600" },
  { slug: "vers-la-5e", niveau: "6ᵉ → 5ᵉ", titre: "Vers la 5ᵉ", theme: "Maths, français, anglais + sport et nutrition pour bouger et bien manger", emoji: "🐋", grad: "from-sky-400 to-blue-600" },
  { slug: "vers-la-4e", niveau: "5ᵉ → 4ᵉ", titre: "Vers la 4ᵉ", theme: "Maths (démonstration, Pythagore), sport, nutrition + 📱 numérique et réseaux sociaux", emoji: "🌍", grad: "from-indigo-400 to-blue-700" },
  { slug: "vers-la-3e", niveau: "4ᵉ → 3ᵉ", titre: "Vers la 3ᵉ", theme: "Brevet : maths (démonstration), 🌋 La Réunion, 🤝 respect et émotions, 📱 jeux vidéo", emoji: "🚀", grad: "from-fuchsia-500 to-purple-700" },
  { slug: "vers-la-premiere", niveau: "2ⁿᵈᵉ → 1ʳᵉ", titre: "Vers la 1ʳᵉ", theme: "Révise + bouge : maths, français, sport, nutrition (l'apparence, ça motive !)", emoji: "🎓", grad: "from-orange-400 to-violet-600" },
];

export default function CartesVacancesIndexPage() {
  return (
    <main className="min-h-screen bg-[#f8f6ff] text-slate-800">
      <div className="mx-auto max-w-5xl px-5 py-10 sm:px-8">
        <Link
          href="/"
          className="inline-flex w-fit items-center gap-1.5 rounded-full border border-slate-300 bg-white px-3.5 py-1.5 text-sm font-bold text-slate-700 shadow-sm transition hover:border-slate-400 hover:bg-slate-50"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour
        </Link>

        {/* En-tête */}
        <header className="mt-8 text-center">
          <p className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-1.5 text-xs font-black uppercase tracking-[0.18em] text-orange-700">
            <Sparkles className="h-4 w-4" />
            À imprimer · découper · gratuit
          </p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
            🧠 Le corps &amp; l’esprit 💪
          </h1>
          <p className="mt-2 text-sm font-black italic text-orange-600">
            «&nbsp;Un esprit sain dans un corps sain&nbsp;»
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-base font-semibold leading-7 text-slate-600">
            Des cartes de révision à imprimer et découper : <strong>4 questions</strong>{" "}
            par carte (maths, français, anglais, <span className="text-orange-600">sport, nutrition</span>){" "}
            + un <span className="text-orange-600">défi sport</span>. Les réponses
            sont au dos. On révise… <strong>en bougeant</strong>. 💪
          </p>
        </header>

        {/* Cartes des decks */}
        <section className="mt-10 grid gap-5 sm:grid-cols-2">
          {decks.map((d) => (
            <Link
              key={d.slug}
              href={`/cahier-vacances-cartes/${d.slug}`}
              className={`group relative flex flex-col overflow-hidden rounded-3xl bg-gradient-to-br ${d.grad} p-6 text-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:rotate-[-1.5deg] hover:scale-[1.03] hover:shadow-2xl`}
            >
              <div className="pointer-events-none absolute -right-6 -top-8 h-28 w-28 rounded-full bg-white/25 blur-2xl" />
              <div className="relative z-10 flex items-start justify-between gap-3">
                <span className="inline-block rounded-full bg-white/25 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-white backdrop-blur-sm">
                  {d.niveau}
                </span>
                <span
                  className="text-5xl drop-shadow-md transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-125"
                  aria-hidden="true"
                >
                  {d.emoji}
                </span>
              </div>
              <h2 className="relative z-10 mt-4 text-2xl font-black drop-shadow-sm">{d.titre}</h2>
              <p className="relative z-10 mt-1 flex-1 text-sm font-semibold leading-snug text-white/90">{d.theme}</p>
              <span className="relative z-10 mt-4 inline-flex w-fit items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-black text-slate-900 shadow-md transition-all group-hover:gap-3">
                <Scissors className="h-4 w-4" />
                Imprimer &amp; découper
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </span>
            </Link>
          ))}
        </section>

        {/* Bandeau infos */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-5">
            <Printer className="mt-0.5 h-6 w-6 shrink-0 text-violet-500" />
            <div>
              <h3 className="text-base font-black text-slate-900">À imprimer &amp; découper</h3>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                Ouvre le deck, clique sur « Imprimer / PDF », découpe les cartes le
                long des bords. Les réponses sont au dos.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-2xl border border-orange-200 bg-orange-50 p-5">
            <Dumbbell className="mt-0.5 h-6 w-6 shrink-0 text-orange-500" />
            <div>
              <h3 className="text-base font-black text-slate-900">Le corps ET l’esprit</h3>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                «&nbsp;Un esprit sain dans un corps sain&nbsp;»&nbsp;: on nourrit
                l&apos;<em>esprit</em> avec les questions <em>et</em> le{" "}
                <em>corps</em> avec le défi sport. 💪
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
