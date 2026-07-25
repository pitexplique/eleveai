import type { Metadata } from "next";
import Link from "next/link";
import { KIT_MATHS_PREMIERE } from "./maths-premiere/data";

export const metadata: Metadata = {
  title: "Kit de survie maths lycée — l'essentiel à imprimer (gratuit)",
  description:
    "Les kits de survie EleveAI : le programme de maths du lycée condensé en fiches à imprimer — formules essentielles, réflexes, pièges classiques et tests corrigés, chapitre par chapitre. Gratuit, conforme aux programmes, relié au coach en ligne.",
  alternates: { canonical: "https://eleveai.fr/kit-de-survie" },
};

// La collection démarre par la Première (spé maths). Les kits suivants
// s'ajoutent ici — une carte = un kit livré, jamais de carte fantôme.
const KITS = [
  {
    slug: "maths-premiere",
    emoji: "🆘",
    titre: KIT_MATHS_PREMIERE.titre,
    niveau: "Première",
    pitch:
      "Les 11 chapitres de la spécialité en 11 fiches : formules, réflexes, pièges, test corrigé.",
    grad: "from-red-500 to-rose-600",
  },
];

export default function KitDeSurvieHubPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <header className="mb-8 text-center">
        <p className="mx-auto mb-3 inline-block rounded-full bg-red-600 px-4 py-1 text-xs font-black uppercase tracking-widest text-white">
          🆘 Kits de survie
        </p>
        <h1 className="mb-3 text-4xl font-black leading-tight text-slate-900">
          Le programme, condensé. Imprimé. Survécu.
        </h1>
        <p className="mx-auto max-w-2xl text-[15px] leading-relaxed text-slate-600">
          Un kit de survie = tout un programme en quelques fiches A4 : les{" "}
          <strong>formules qui sauvent</strong>, les <strong>réflexes</strong> devant un énoncé, les{" "}
          <strong>pièges qui coûtent des points</strong> — et un test corrigé par chapitre.
          Gratuit, sans inscription, à glisser dans le classeur.
        </p>
      </header>

      <section className="mb-10 grid gap-4 sm:grid-cols-2">
        {KITS.map((k) => (
          <Link
            key={k.slug}
            href={`/kit-de-survie/${k.slug}`}
            className={`group rounded-2xl bg-gradient-to-br ${k.grad} p-5 text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-xl`}
          >
            <p className="mb-1 text-3xl transition group-hover:scale-110">{k.emoji}</p>
            <p className="text-[11px] font-bold uppercase tracking-widest text-white/80">{k.niveau}</p>
            <h2 className="mb-1 text-xl font-black leading-tight">{k.titre}</h2>
            <p className="text-[13px] leading-snug text-white/90">{k.pitch}</p>
            <p className="mt-3 text-[13px] font-bold underline underline-offset-2">
              Ouvrir le kit →
            </p>
          </Link>
        ))}
      </section>

      {/* La réponse sur place : où sont les autres niveaux ? */}
      <section className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center">
        <h2 className="mb-2 text-lg font-black text-slate-900">Seconde ? Terminale ? Une autre matière ?</h2>
        <p className="mx-auto mb-4 max-w-xl text-sm leading-relaxed text-slate-600">
          Les kits arrivent niveau par niveau. En attendant le tien, le{" "}
          <strong>coach en ligne</strong> couvre déjà tout le lycée, chapitre par chapitre — gratuit
          aussi.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Link
            href="/coach-ia/maths?classe=seconde"
            className="rounded-full border-2 border-teal-600 px-4 py-1.5 text-sm font-bold text-teal-700 transition hover:bg-teal-50"
          >
            Coach Seconde
          </Link>
          <Link
            href="/coach-ia/maths?classe=premiere-spe"
            className="rounded-full border-2 border-teal-600 px-4 py-1.5 text-sm font-bold text-teal-700 transition hover:bg-teal-50"
          >
            Coach Première spé
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
