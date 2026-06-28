import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Download, Heart, Printer, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Cahiers de vacances à imprimer (PDF gratuit) — CM2, 6e, 5e",
  description:
    "Les cahiers de vacances gratuits d'EleveAI, à imprimer : une page par jour pendant 6 semaines (maths, français, vocabulaire, gestes numériques et défis), avec les corrigés. Du CM1 à la 5e, un voyage à La Réunion avec Ti Margo le margouillat.",
  keywords: [
    "cahier de vacances à imprimer",
    "cahier de vacances PDF gratuit",
    "cahier de vacances CM2",
    "cahier de vacances 6e",
    "cahier de vacances 5e",
    "réviser l'été",
    "cahier de vacances La Réunion",
    "EleveAI",
  ],
  alternates: { canonical: "/cahier-vacances" },
  openGraph: {
    title: "Cahiers de vacances à imprimer (PDF gratuit) — EleveAI",
    description:
      "Une page par jour pendant 6 semaines : maths, français, vocabulaire et défis, à imprimer avec les corrigés. Du CM1 à la 5e, avec Ti Margo.",
    url: "/cahier-vacances",
    type: "website",
    siteName: "EleveAI",
    locale: "fr_FR",
  },
};

/* Catalogue des cahiers de vacances. Un niveau = une carte colorée.
   Les classes de dégradé sont en clair (literals) pour que Tailwind les génère. */
const cahiers = [
  { slug: "vers-le-cp",        niveau: "GS → CP",         titre: "Vers le CP",        theme: "Le tour de chez Ti Margo (sans savoir lire)", emoji: "🧸", grad: "from-pink-400 to-rose-500", duree: "15 jours · 3 semaines" },
  { slug: "vers-le-ce1",       niveau: "CP → CE1",        titre: "Vers le CE1",       theme: "Le tour de l'île avec Ti Margo",        emoji: "🐠", grad: "from-rose-400 to-orange-500", duree: "15 jours · 3 semaines" },
  { slug: "vers-le-ce2",       niveau: "CE1 → CE2",       titre: "Vers le CE2",       theme: "On apprend en jouant",                  emoji: "🎲", grad: "from-orange-400 to-amber-500" },
  { slug: "vers-le-cm1",       niveau: "CE2 → CM1",       titre: "Vers le CM1",       theme: "Ti Margo explore son jardin créole",    emoji: "🌳", grad: "from-lime-400 to-green-600"  },
  { slug: "vers-le-cm2",       niveau: "CM1 → CM2",       titre: "Vers le CM2",       theme: "Ti Margo découvre son île",             emoji: "🏖️", grad: "from-teal-400 to-emerald-600" },
  { slug: "vers-la-6e",        niveau: "CM2 → 6ᵉ",        titre: "Vers la 6ᵉ",        theme: "Le grand voyage vers la 6ᵉ",            emoji: "🎓", grad: "from-yellow-400 to-amber-600" },
  { slug: "vers-la-5e",        niveau: "6ᵉ → 5ᵉ",         titre: "Vers la 5ᵉ",        theme: "Le tour de l'océan Indien",             emoji: "🐋", grad: "from-sky-400 to-blue-600"    },
  { slug: "vers-la-4e",        niveau: "5ᵉ → 4ᵉ",         titre: "Vers la 4ᵉ",        theme: "Le tour du monde en 80 jours",          emoji: "🌍", grad: "from-indigo-400 to-blue-700" },
  { slug: "vers-la-3e",        niveau: "4ᵉ → 3ᵉ",         titre: "Vers la 3ᵉ",        theme: "Le grand voyage spatial",               emoji: "🚀", grad: "from-fuchsia-500 to-purple-700" },
  { slug: "vers-la-2nde",      niveau: "3ᵉ → 2ⁿᵈᵉ",       titre: "Vers la 2ⁿᵈᵉ",      theme: "Le grand zoom, de l'atome à l'univers", emoji: "🔭", grad: "from-rose-400 to-pink-600"  },
  { slug: "vers-la-premiere",  niveau: "2ⁿᵈᵉ → 1ʳᵉ",      titre: "Vers la 1ʳᵉ",       theme: "La créativité pour changer le monde",   emoji: "💡", grad: "from-violet-500 to-fuchsia-600" },
  { slug: "vers-la-terminale", niveau: "1ʳᵉ → Terminale", titre: "Vers la Terminale", theme: "Les maths et l'IA pour changer le monde", emoji: "🤖", grad: "from-emerald-400 to-teal-700" },
  { slug: "vers-le-bac-plus-1", niveau: "Terminale → Bac +1", titre: "Vers le Bac +1", theme: "Inventer les solutions de demain", emoji: "🛠️", grad: "from-cyan-400 to-indigo-600" },
  { slug: "aider-mon-enfant",  niveau: "Pour les parents",   titre: "Aider mon enfant",  theme: "(Re)découvrir l'école d'aujourd'hui pour mieux l'accompagner", emoji: "👨‍👩‍👧", grad: "from-teal-500 to-slate-700", duree: "15 jours · 3 semaines" },
];

export default function CahiersVacancesIndexPage() {
  return (
    <main className="min-h-screen bg-[#f8f6ff] text-slate-800">
      <div className="mx-auto max-w-5xl px-5 py-10 sm:px-8">
        <Link
          href="/fiches-cours"
          className="inline-flex w-fit items-center gap-1.5 rounded-full border border-slate-300 bg-white px-3.5 py-1.5 text-sm font-bold text-slate-700 shadow-sm transition hover:border-slate-400 hover:bg-slate-50"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour
        </Link>

        {/* En-tête */}
        <header className="mt-8 text-center">
          <p className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-1.5 text-xs font-black uppercase tracking-[0.18em] text-amber-700">
            <Sparkles className="h-4 w-4" />
            Spécial été · à imprimer · gratuit
          </p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
            Les cahiers de vacances EleveAI
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base font-semibold leading-7 text-slate-600">
            Une page par jour pendant 6 semaines : maths, français, un mot, un
            geste numérique et un défi — avec, chaque jour, un défi ★★★★★ pour
            les champions. Le tout à imprimer, corrigés inclus, et un voyage à
            La Réunion avec Ti Margo le margouillat. 🦎
          </p>
        </header>

        {/* Cartes des cahiers */}
        <section className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cahiers.map((c) => (
            <Link
              key={c.slug}
              href={`/cahier-vacances/${c.slug}`}
              className={`group relative flex flex-col overflow-hidden rounded-3xl bg-gradient-to-br ${c.grad} p-6 text-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:rotate-[-1.5deg] hover:scale-[1.03] hover:shadow-2xl`}
            >
              <div className="pointer-events-none absolute -right-6 -top-8 h-28 w-28 rounded-full bg-white/25 blur-2xl" />
              <div className="relative z-10 flex items-start justify-between gap-3">
                <span className="inline-block rounded-full bg-white/25 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-white backdrop-blur-sm">
                  {c.niveau}
                </span>
                <span
                  className="text-5xl drop-shadow-md transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-125"
                  aria-hidden="true"
                >
                  {c.emoji}
                </span>
              </div>
              <h2 className="relative z-10 mt-4 text-2xl font-black drop-shadow-sm">{c.titre}</h2>
              <p className="relative z-10 mt-1 flex-1 text-sm font-semibold leading-snug text-white/90">{c.theme}</p>
              <p className="relative z-10 mt-3 text-[11px] font-black uppercase tracking-wider text-white/80">
                {c.duree ?? "30 jours · 6 semaines"} · corrigés inclus
              </p>
              <span className="relative z-10 mt-4 inline-flex w-fit items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-black text-slate-900 shadow-md transition-all group-hover:gap-3">
                <Download className="h-4 w-4" />
                Ouvrir &amp; imprimer
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </span>
            </Link>
          ))}
        </section>

        {/* Bandeau infos */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-5">
            <Printer className="mt-0.5 h-6 w-6 shrink-0 text-teal-500" />
            <div>
              <h3 className="text-base font-black text-slate-900">À imprimer en 1 clic</h3>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                Ouvre le cahier, clique sur « Télécharger en PDF » : chaque jour
                tient sur une page A4, et les corrigés sont à la fin.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-2xl border border-orange-200 bg-orange-50 p-5">
            <Heart className="mt-0.5 h-6 w-6 shrink-0 text-orange-500" />
            <div>
              <h3 className="text-base font-black text-slate-900">Un cahier solidaire</h3>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                Gratuit pour les élèves : en l&apos;utilisant, tu participes à
                offrir l&apos;accès à EleveAI à un élève qui n&apos;en a pas les
                moyens. Merci&nbsp;!
              </p>
            </div>
          </div>
        </div>

        <p className="mt-10 text-center text-lg font-black italic text-teal-600">
          Chaque jour, un pas de plus vers la réussite !
        </p>
      </div>
    </main>
  );
}
