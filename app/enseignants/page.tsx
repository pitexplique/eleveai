// app/enseignants/page.tsx
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Enseignants — EleveAI",
  description:
    "Un tableau de bord de vos élèves et des outils à utiliser en classe : Calcul rapide en direct, résultats validés, notions travaillées et progression, élève par élève.",
  alternates: { canonical: "https://eleveai.fr/enseignants" },
};

const usages = [
  {
    emoji: "📊",
    titre: "Le tableau de bord de vos élèves",
    texte:
      "Scores, notions travaillées, élèves actifs, points à renforcer — en temps réel, élève par élève. Vous voyez qui décroche et sur quoi.",
    cta: { label: "Voir le tableau de bord", href: "/dashboard-prof" },
  },
  {
    emoji: "⚡",
    titre: "Utilisez EleveAI en cours",
    texte:
      "Lancez un Calcul rapide ou un défi en classe, au vidéoprojecteur ou sur les postes. Les résultats des élèves remontent et sont validés automatiquement.",
    cta: { label: "Essayer le calcul rapide", href: "/calcul-rapide" },
  },
  {
    emoji: "🎯",
    titre: "Une remédiation ciblée",
    texte:
      "Quand un élève bute, le coach reroute vers le prérequis fragile. Vous récupérez le « à renforcer » de chacun, sans corriger 30 copies.",
    cta: { label: "Découvrir le coach", href: "/coach-ia/maths" },
  },
];

export default function EnseignantsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <section className="mx-auto max-w-5xl px-4 py-12">
        <p className="text-xs font-black uppercase tracking-wide text-emerald-300">
          Pour les enseignants
        </p>
        <h1 className="mt-2 text-3xl font-black sm:text-4xl">
          Enseignants : un tableau de bord de vos élèves, et des outils pour la classe
        </h1>
        <p className="mt-4 max-w-2xl text-slate-300">
          EleveAI n&apos;est pas qu&apos;un outil pour la maison. Vous suivez la
          progression de chaque élève et vous vous en servez <strong>en cours</strong> :
          un Calcul rapide en direct, un défi du jour, un point de remédiation — et les
          résultats remontent, validés, sans saisie manuelle.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {usages.map((u) => (
            <div
              key={u.titre}
              className="flex flex-col rounded-2xl border border-slate-800 bg-slate-900/40 p-5"
            >
              <span className="text-3xl" aria-hidden="true">
                {u.emoji}
              </span>
              <h2 className="mt-3 text-lg font-bold">{u.titre}</h2>
              <p className="mt-2 flex-1 text-sm text-slate-300">{u.texte}</p>
              <Link
                href={u.cta.href}
                className="mt-4 inline-flex w-fit items-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-sm font-black text-slate-950 transition hover:bg-emerald-400"
              >
                {u.cta.label} →
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-slate-800 bg-slate-900/30 p-6">
          <h2 className="text-xl font-bold">Comment démarrer avec votre classe</h2>
          <p className="mt-2 text-sm text-slate-300">
            Les comptes élèves et professeurs sont créés au niveau de
            l&apos;établissement : un code établissement, un code par élève et par
            professeur, sans installation ni adresse e-mail. La mise en place se fait
            avec votre collège.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/espace-ecoles"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-black text-slate-950 transition hover:bg-slate-200"
            >
              🏫 Déployer dans mon établissement
            </Link>
            <Link
              href="/dashboard-prof"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-2.5 text-sm font-black text-white transition hover:bg-white/10"
            >
              Accéder à mon tableau de bord
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
