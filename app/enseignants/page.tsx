// app/enseignants/page.tsx
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Enseignants — EleveAI",
  description:
    "Voyez où en sont vos élèves et utilisez EleveAI en classe : tableau de bord en temps réel, calcul rapide en direct avec résultats validés, remédiation ciblée par prérequis. Vous restez la référence.",
  alternates: { canonical: "https://eleveai.fr/enseignants" },
};

// Ce qu'un prof peut FAIRE avec EleveAI — le cœur de la page.
const capacites = [
  {
    emoji: "📊",
    titre: "Suivez chaque élève, en temps réel",
    texte:
      "Scores, notions travaillées, activité récente, points à renforcer — élève par élève. Un statut d'engagement 🟢🟠🔴 vous montre d'un coup d'œil qui décroche.",
    cta: { label: "Voir le tableau de bord", href: "/dashboard-prof" },
  },
  {
    emoji: "⚡",
    titre: "Lancez une activité en classe",
    texte:
      "Un calcul rapide ou un défi au vidéoprojecteur ou sur les postes. Les résultats des élèves remontent et sont validés automatiquement — aucune saisie de votre part.",
    cta: { label: "Essayer le calcul rapide", href: "/calcul-rapide" },
  },
  {
    emoji: "🎯",
    titre: "Ciblez la remédiation",
    texte:
      "Quand un élève bute, le coach le reroute vers le prérequis fragile. Vous récupérez le « à renforcer » de chacun, prêt à l'emploi, sans corriger 30 copies.",
    cta: { label: "Découvrir le coach", href: "/coach-ia/maths" },
  },
  {
    emoji: "📚",
    titre: "Tout le catalogue à conseiller",
    texte:
      "6 coachs par matière, parcours de diagnostic, dictée du jour, prépa Brevet/Bac/Pix IA. Vous orientez chaque élève vers ce dont il a besoin.",
    cta: { label: "Explorer le catalogue", href: "/explorer" },
  },
];

// Le déroulé concret : comment ça s'insère dans la semaine du prof.
const deroule = [
  { moment: "En classe", texte: "Vous lancez un calcul rapide ou un défi. Les élèves jouent, les scores remontent." },
  { moment: "À la maison", texte: "Les élèves s'entraînent au coach de leur matière, à leur rythme, en autonomie." },
  { moment: "Au retour", texte: "Vous ouvrez le tableau de bord : qui a travaillé, qui a décroché, quoi renforcer." },
];

export default function EnseignantsPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-emerald-50 via-amber-50 to-sky-50 text-slate-900">
      <div className="mx-auto max-w-5xl px-4 py-12 space-y-14">

        {/* ── HERO ── */}
        <section className="text-center">
          <p className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-1.5 text-xs font-black uppercase tracking-wide text-emerald-800 ring-1 ring-emerald-200">
            🍎 Pour les enseignants
          </p>
          <h1 className="mt-4 text-3xl font-black leading-tight sm:text-5xl">
            Voyez où en sont vos élèves.
            <br className="hidden sm:block" /> Utilisez EleveAI <span className="text-emerald-600">en classe</span>.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base font-semibold leading-relaxed text-slate-600 sm:text-lg">
            Un tableau de bord en temps réel et des outils à lancer en cours —
            les résultats remontent, validés, sans saisie. Vous restez la référence.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/dashboard-prof"
              className="rounded-2xl bg-emerald-600 px-7 py-3.5 text-base font-black text-white shadow-lg transition hover:bg-emerald-500 hover:scale-105"
            >
              📊 Accéder à mon tableau de bord
            </Link>
            <Link
              href="/espace-ecoles"
              className="rounded-2xl bg-white px-7 py-3.5 text-base font-black text-slate-800 ring-1 ring-slate-200 transition hover:bg-slate-50"
            >
              Déployer dans mon collège
            </Link>
          </div>
        </section>

        {/* ── CE QUE VOUS POUVEZ FAIRE ── */}
        <section>
          <h2 className="text-center text-2xl font-black sm:text-3xl">
            Ce que vous pouvez faire
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {capacites.map((c) => (
              <div
                key={c.titre}
                className="flex flex-col rounded-3xl border border-white bg-white/80 p-6 shadow-md backdrop-blur"
              >
                <div className="text-3xl">{c.emoji}</div>
                <h3 className="mt-3 text-lg font-black">{c.titre}</h3>
                <p className="mt-2 flex-1 text-sm font-semibold leading-relaxed text-slate-600">
                  {c.texte}
                </p>
                <Link
                  href={c.cta.href}
                  className="mt-4 inline-flex w-fit items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-black text-white transition hover:bg-emerald-500"
                >
                  {c.cta.label} →
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* ── LE DÉROULÉ ── */}
        <section className="rounded-[2rem] border border-white bg-white/70 p-8 shadow-xl backdrop-blur">
          <h2 className="text-center text-2xl font-black sm:text-3xl">
            EleveAI dans votre semaine
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {deroule.map((d, i) => (
              <div key={d.moment} className="relative rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                <span className="absolute -top-3 left-5 flex h-7 w-7 items-center justify-center rounded-full bg-amber-400 text-sm font-black text-white">
                  {i + 1}
                </span>
                <p className="mt-2 text-sm font-black uppercase tracking-wide text-emerald-700">{d.moment}</p>
                <p className="mt-1 text-sm font-semibold leading-relaxed text-slate-600">{d.texte}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── VOUS RESTEZ LA RÉFÉRENCE ── */}
        <section className="rounded-[2rem] border border-amber-200 bg-white/80 p-8 text-center shadow-md backdrop-blur">
          <p className="text-4xl">🧑‍🏫</p>
          <h2 className="mt-3 text-2xl font-black">EleveAI ne vous remplace pas — il vous épaule</h2>
          <p className="mx-auto mt-3 max-w-2xl font-semibold text-slate-600">
            EleveAI est un outil d&apos;entraînement et de suivi. Vous restez la
            référence pédagogique : il vous fait gagner du temps sur le suivi et la
            remédiation, pour que vous en gardiez pour l&apos;essentiel — vos élèves.
          </p>
        </section>

        {/* ── COMMENT DÉMARRER ── */}
        <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-md">
          <h2 className="text-2xl font-black">Comment démarrer avec votre classe</h2>
          <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-600">
            Les comptes élèves et professeurs sont créés au niveau de
            l&apos;établissement : un code établissement, un code par élève et par
            professeur, sans installation ni adresse e-mail. La mise en place se fait
            avec votre collège — souvent en quelques heures.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/espace-ecoles"
              className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-black text-white transition hover:bg-slate-700"
            >
              🏫 Déployer dans mon établissement
            </Link>
            <Link
              href="/dashboard-prof"
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-5 py-2.5 text-sm font-black text-slate-800 transition hover:bg-slate-50"
            >
              Accéder à mon tableau de bord
            </Link>
          </div>
        </section>

      </div>
    </main>
  );
}
