import type { Metadata } from "next";
import Link from "next/link";
import { KIT_MATHS_PREMIERE } from "./maths-premiere/data";
import { KIT_MATHS_SECONDE } from "./maths-seconde/data";
import { KIT_MATHS_TERMINALE } from "./maths-terminale/data";
import { KIT_MATHS_TROISIEME } from "./maths-troisieme/data";
import { KIT_MATHS_QUATRIEME } from "./maths-quatrieme/data";
import { KIT_MATHS_CINQUIEME } from "./maths-cinquieme/data";
import { KIT_MATHS_SIXIEME } from "./maths-sixieme/data";
import { KIT_MATHS_CM2 } from "./maths-cm2/data";
import { KIT_MATHS_CM1 } from "./maths-cm1/data";
import { KIT_FRANCAIS_CM1 } from "./francais-cm1/data";
import { KIT_FRANCAIS_CM2 } from "./francais-cm2/data";
import { KIT_FRANCAIS_6E } from "./francais-6e/data";
import { KIT_FRANCAIS_5E } from "./francais-5e/data";

export const metadata: Metadata = {
  title: "Guides de survie EleveAI — maths et français, du CM1 au lycée (gratuit à imprimer)",
  description:
    "Les guides de survie EleveAI : le programme de maths (du CM1 au lycée) et de français (du CM1 à la 5e) condensé en fiches à imprimer — l'essentiel, réflexes, pièges classiques et tests corrigés, chapitre par chapitre. Gratuit, conforme aux programmes, relié au coach en ligne.",
  alternates: { canonical: "https://eleveai.fr/guide-de-survie" },
};

// La collection grandit niveau par niveau et matière par matière — une carte =
// un guide livré, jamais de carte fantôme.
const KITS_MATHS = [
  {
    slug: "maths-cm1",
    emoji: "🥚",
    titre: KIT_MATHS_CM1.titre,
    niveau: "CM1 · primaire",
    pitch:
      "Les 27 chapitres du programme en 27 fiches : l'essentiel, les réflexes, les pièges, test corrigé.",
    grad: "from-indigo-500 to-sky-500",
  },
  {
    slug: "maths-cm2",
    emoji: "🐣",
    titre: KIT_MATHS_CM2.titre,
    niveau: "CM2 · fin du primaire",
    pitch:
      "Les 28 chapitres du programme en 28 fiches : l'essentiel, les réflexes, les pièges, test corrigé.",
    grad: "from-sky-500 to-emerald-500",
  },
  {
    slug: "maths-sixieme",
    emoji: "🌱",
    titre: KIT_MATHS_SIXIEME.titre,
    niveau: "Sixième · entrée au collège",
    pitch:
      "Les 18 chapitres du programme en 18 fiches : l'essentiel, les réflexes, les pièges, test corrigé.",
    grad: "from-emerald-500 to-lime-600",
  },
  {
    slug: "maths-cinquieme",
    emoji: "📙",
    titre: KIT_MATHS_CINQUIEME.titre,
    niveau: "Cinquième",
    pitch:
      "Les 13 chapitres du programme en 13 fiches : formules, réflexes, pièges, test corrigé.",
    grad: "from-lime-500 to-yellow-600",
  },
  {
    slug: "maths-quatrieme",
    emoji: "📘",
    titre: KIT_MATHS_QUATRIEME.titre,
    niveau: "Quatrième",
    pitch:
      "Les 19 chapitres du programme en 19 fiches : formules, réflexes, pièges, test corrigé.",
    grad: "from-yellow-500 to-amber-600",
  },
  {
    slug: "maths-troisieme",
    emoji: "🎒",
    titre: KIT_MATHS_TROISIEME.titre,
    niveau: "Troisième · brevet",
    pitch:
      "Les 22 chapitres du programme en 22 fiches, spécial brevet : formules, réflexes, pièges, test corrigé.",
    grad: "from-amber-500 to-orange-600",
  },
  {
    slug: "maths-seconde",
    emoji: "🛟",
    titre: KIT_MATHS_SECONDE.titre,
    niveau: "Seconde",
    pitch:
      "Les 22 chapitres du programme en 22 fiches : formules, réflexes, pièges, test corrigé.",
    grad: "from-orange-500 to-red-600",
  },
  {
    slug: "maths-premiere",
    emoji: "🆘",
    titre: KIT_MATHS_PREMIERE.titre,
    niveau: "Première",
    pitch:
      "Les 11 chapitres de la spécialité en 11 fiches : formules, réflexes, pièges, test corrigé.",
    grad: "from-red-500 to-rose-600",
  },
  {
    slug: "maths-terminale",
    emoji: "🎓",
    titre: KIT_MATHS_TERMINALE.titre,
    niveau: "Terminale",
    pitch:
      "Les 18 chapitres de la spécialité en 18 fiches : formules, réflexes, pièges, test corrigé.",
    grad: "from-rose-600 to-fuchsia-700",
  },
];

const KITS_FRANCAIS = [
  {
    slug: "francais-cm1",
    emoji: "📖",
    titre: KIT_FRANCAIS_CM1.titre,
    niveau: "CM1 · primaire",
    pitch:
      "Les 8 domaines du programme en 8 fiches : l'essentiel, les règles qui sauvent, les réflexes, les pièges, test corrigé.",
    grad: "from-violet-500 to-fuchsia-600",
  },
  {
    slug: "francais-cm2",
    emoji: "📚",
    titre: KIT_FRANCAIS_CM2.titre,
    niveau: "CM2 · fin du primaire",
    pitch:
      "Les 9 domaines du programme en 9 fiches (avec la phrase complexe) : l'essentiel, les règles qui sauvent, les réflexes, les pièges, test corrigé.",
    grad: "from-fuchsia-500 to-rose-600",
  },
  {
    slug: "francais-6e",
    emoji: "🏫",
    titre: KIT_FRANCAIS_6E.titre,
    niveau: "6e · entrée au collège",
    pitch:
      "Les 8 domaines du programme en 8 fiches (mise en voix, culture littéraire) : l'essentiel, les règles qui sauvent, les réflexes, les pièges, test corrigé.",
    grad: "from-rose-500 to-red-600",
  },
  {
    slug: "francais-5e",
    emoji: "🏰",
    titre: KIT_FRANCAIS_5E.titre,
    niveau: "5e · collège (cycle 4)",
    pitch:
      "Les 9 domaines du programme en 9 fiches (avec le discours et les registres) : l'essentiel, les règles qui sauvent, les réflexes, les pièges, test corrigé.",
    grad: "from-red-500 to-orange-600",
  },
];

type Kit = (typeof KITS_MATHS)[number];

function CartesKits({ kits }: { kits: Kit[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {kits.map((k) => (
        <Link
          key={k.slug}
          href={`/guide-de-survie/${k.slug}`}
          className={`group rounded-2xl bg-gradient-to-br ${k.grad} p-5 text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-xl`}
        >
          <p className="mb-1 text-3xl transition group-hover:scale-110">{k.emoji}</p>
          <p className="text-[11px] font-bold uppercase tracking-widest text-white/80">{k.niveau}</p>
          <h2 className="mb-1 text-xl font-black leading-tight">{k.titre}</h2>
          <p className="text-[13px] leading-snug text-white/90">{k.pitch}</p>
          <p className="mt-3 text-[13px] font-bold underline underline-offset-2">
            Ouvrir le guide →
          </p>
        </Link>
      ))}
    </div>
  );
}

export default function KitDeSurvieHubPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <header className="mb-8 text-center">
        <p className="mx-auto mb-3 inline-block rounded-full bg-red-600 px-4 py-1 text-xs font-black uppercase tracking-widest text-white">
          🆘 Guides de survie
        </p>
        <h1 className="mb-3 text-4xl font-black leading-tight text-slate-900">
          Le programme, condensé. Imprimé. Survécu.
        </h1>
        <p className="mx-auto max-w-2xl text-[15px] leading-relaxed text-slate-600">
          Un guide de survie = tout un programme en quelques fiches A4 : les{" "}
          <strong>formules et règles qui sauvent</strong>, les <strong>réflexes</strong> devant un
          énoncé, les <strong>pièges qui coûtent des points</strong> — et un test corrigé par
          chapitre. Gratuit, sans inscription, à glisser dans le classeur.
        </p>
      </header>

      {/* ─── Maths ─── */}
      <section className="mb-10">
        <h2 className="mb-3 flex items-center gap-2 text-2xl font-black text-slate-900">
          <span aria-hidden="true">🔢</span> Maths
          <span className="text-sm font-semibold text-slate-400">— du CM1 au lycée</span>
        </h2>
        <CartesKits kits={KITS_MATHS} />
      </section>

      {/* ─── Français ─── */}
      <section className="mb-10">
        <h2 className="mb-3 flex items-center gap-2 text-2xl font-black text-slate-900">
          <span aria-hidden="true">📖</span> Français
          <span className="text-sm font-semibold text-slate-400">— du CM1 à la 5e</span>
          <span className="rounded-full bg-violet-100 px-2 py-0.5 text-[11px] font-bold uppercase tracking-widest text-violet-700">
            Nouveau
          </span>
        </h2>
        <CartesKits kits={KITS_FRANCAIS} />
      </section>

      {/* La réponse sur place : où sont les autres niveaux ? */}
      <section className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center">
        <h2 className="mb-2 text-lg font-black text-slate-900">Une autre matière ? Un autre niveau ?</h2>
        <p className="mx-auto mb-4 max-w-xl text-sm leading-relaxed text-slate-600">
          Les guides arrivent niveau par niveau. En attendant le tien, le{" "}
          <strong>coach en ligne</strong> couvre déjà tout le lycée, chapitre par chapitre — gratuit
          aussi.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Link
            href="/coach-ia/francais?classe=cm1"
            className="rounded-full border-2 border-violet-600 px-4 py-1.5 text-sm font-bold text-violet-700 transition hover:bg-violet-50"
          >
            Coach Français CM1
          </Link>
          <Link
            href="/coach-ia/maths?classe=seconde"
            className="rounded-full border-2 border-teal-600 px-4 py-1.5 text-sm font-bold text-teal-700 transition hover:bg-teal-50"
          >
            Coach Seconde
          </Link>
          <Link
            href="/coach-ia/maths?classe=terminale-spe"
            className="rounded-full border-2 border-teal-600 px-4 py-1.5 text-sm font-bold text-teal-700 transition hover:bg-teal-50"
          >
            Coach Terminale spé
          </Link>
        </div>
      </section>
    </main>
  );
}
