// app/parents/page.tsx
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Parents — EleveAI",
  description:
    "Une IA qui explique, jamais qui fait à la place. Encadrée par un enseignant, sans publicité, données protégées. Gratuit si le collège l'utilise, sinon offre famille.",
  alternates: { canonical: "https://eleveai.fr/parents" },
};

// Les 4 raisons d'être rassuré — le cœur de la décision d'un parent.
const confiance = [
  {
    emoji: "🧭",
    titre: "Elle explique, elle ne triche pas",
    texte:
      "Après chaque réponse, l'enfant doit donner son avis et l'améliorer : ✅ correct · ⚠️ discutable · ❌ faux · ✍️ ce que je garde. On apprend à réfléchir, pas à copier.",
  },
  {
    emoji: "🔒",
    titre: "Données protégées",
    texte:
      "Aucune adresse e-mail demandée pour un élève de collège. Le prénom n'est jamais relié à une classe précise. Accès et suppression sur simple demande.",
  },
  {
    emoji: "🚫",
    titre: "Zéro publicité",
    texte:
      "Pas de pub, pas de revente de données, aucun piège commercial. Votre enfant est en sécurité, concentré sur l'essentiel.",
  },
  {
    emoji: "🧑‍🏫",
    titre: "Conçu par un enseignant",
    texte:
      "EleveAI est créé par un professeur de maths en activité à La Réunion, en lien avec les programmes officiels. Il ne remplace pas le prof — il l'épaule.",
  },
];

const faq = [
  {
    q: "Est-ce que mon enfant va « tricher » avec l'IA ?",
    a: "Non, c'est justement ce qu'on empêche. À chaque réponse de l'IA, l'élève doit la critiquer et l'améliorer. Le but n'est jamais d'obtenir la réponse toute faite, mais de comprendre.",
  },
  {
    q: "Quelles données collectez-vous ?",
    a: "Le strict minimum. Un élève se connecte avec un code (pas d'e-mail). Le prénom affiché n'est jamais rattaché à une classe identifiable. Vous pouvez demander l'accès ou la suppression à tout moment.",
  },
  {
    q: "Est-ce que ça remplace le professeur ?",
    a: "Non. EleveAI est un outil d'entraînement et de suivi. Le professeur reste la référence — EleveAI aide votre enfant à s'exercer entre les cours, et aide le prof à voir où il en est.",
  },
  {
    q: "Combien ça coûte, pour moi ?",
    a: "Si le collège de votre enfant utilise EleveAI, c'est entièrement gratuit pour vous : l'établissement finance pour tous ses élèves. Sinon, une offre famille existe — et vous pouvez suggérer EleveAI à votre établissement.",
  },
];

export default function ParentsPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-sky-50 via-emerald-50 to-amber-50 text-slate-900">
      <div className="mx-auto max-w-5xl px-4 py-12 space-y-14">

        {/* ── HERO ── */}
        <section className="text-center">
          <p className="inline-flex items-center gap-2 rounded-full bg-sky-100 px-4 py-1.5 text-xs font-black uppercase tracking-wide text-sky-800 ring-1 ring-sky-200">
            👪 Pour les parents
          </p>
          <h1 className="mt-4 text-3xl font-black leading-tight sm:text-5xl">
            Une IA qui <span className="text-emerald-600">explique</span>,
            <br className="hidden sm:block" /> jamais qui fait à la place.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base font-semibold leading-relaxed text-slate-600 sm:text-lg">
            EleveAI aide votre enfant à progresser à son rythme — encadré par un
            enseignant, sans publicité, avec ses données protégées.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/auth/signin?mode=eleve"
              className="rounded-2xl bg-emerald-600 px-7 py-3.5 text-base font-black text-white shadow-lg transition hover:bg-emerald-500 hover:scale-105"
            >
              🎓 J'ai un code établissement — c'est gratuit
            </Link>
            <Link
              href="/tarifs"
              className="rounded-2xl bg-white px-7 py-3.5 text-base font-black text-slate-800 ring-1 ring-slate-200 transition hover:bg-slate-50"
            >
              Voir l'offre famille
            </Link>
          </div>
        </section>

        {/* ── RÉASSURANCE (le cœur pour un parent) ── */}
        <section>
          <h2 className="text-center text-2xl font-black sm:text-3xl">
            Ce qui doit vous rassurer
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {confiance.map((c) => (
              <div
                key={c.titre}
                className="rounded-3xl border border-white bg-white/80 p-6 shadow-md backdrop-blur"
              >
                <div className="text-3xl">{c.emoji}</div>
                <h3 className="mt-3 text-lg font-black">{c.titre}</h3>
                <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-600">
                  {c.texte}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── MAQUETTE « screenshot » : l'IA encadrée en action ── */}
        <section>
          <div className="text-center">
            <h2 className="text-2xl font-black sm:text-3xl">
              L&apos;IA explique. Votre enfant réfléchit.
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-sm font-semibold leading-relaxed text-slate-600">
              Voilà à quoi ressemble une aide EleveAI : jamais la réponse toute
              faite — un coup de pouce, puis votre enfant garde le contrôle.
            </p>
          </div>

          <div className="mx-auto mt-8 max-w-2xl overflow-hidden rounded-3xl border border-slate-800 bg-[#041B33] p-5 text-white shadow-2xl sm:p-7">
            <div className="mb-4 flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-red-400/70" />
              <span className="h-3 w-3 rounded-full bg-amber-400/70" />
              <span className="h-3 w-3 rounded-full bg-emerald-400/70" />
              <span className="ml-3 text-xs font-bold text-white/40">Coach IA · Maths</span>
            </div>

            <div className="rounded-2xl bg-white/5 p-3 text-sm font-semibold text-white/85">
              Combien font 3/4 + 1/8 ?
            </div>

            <div className="mt-3 flex gap-2">
              <span className="text-lg" aria-hidden="true">🤖</span>
              <div className="rounded-2xl border border-cyan-300/20 bg-cyan-400/10 p-3 text-sm font-semibold text-white/80">
                Astuce : mets d&apos;abord les deux fractions sur le même
                dénominateur. Lequel choisir&nbsp;? À toi de trouver la suite.
              </div>
            </div>

            <div className="mt-3 rounded-2xl border border-emerald-300/30 bg-emerald-400/[0.08] p-4">
              <p className="text-xs font-black uppercase tracking-wide text-emerald-200">
                ✍️ À toi de juger cette aide
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {["✅ correct", "⚠️ à revoir", "❌ faux"].map((t) => (
                  <span key={t} className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-white/80">
                    {t}
                  </span>
                ))}
              </div>
              <p className="mt-2 text-xs font-semibold text-white/60">
                Puis «&nbsp;ce que je garde, ce que je change&nbsp;». On apprend à
                réfléchir, pas à copier.
              </p>
            </div>
          </div>

          <div className="mx-auto mt-4 flex max-w-2xl flex-wrap justify-center gap-2">
            {["🔒 Données protégées", "🚫 Zéro publicité", "🌱 On encourage, on ne juge pas"].map((t) => (
              <span key={t} className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-black text-slate-600 shadow-sm">
                {t}
              </span>
            ))}
          </div>
        </section>

        {/* ── LE PRIX = LE FORK (décision CEO : établissement > famille > jamais l'élève) ── */}
        <section>
          <h2 className="text-center text-2xl font-black sm:text-3xl">
            Combien ça vous coûte&nbsp;?
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-center text-sm font-semibold text-slate-500">
            Notre principe : on cherche d'abord à vous le rendre <strong>gratuit</strong>.
          </p>
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {/* Porte 1 — GRATUIT via l'établissement (mise en avant) */}
            <div className="relative rounded-3xl border-2 border-emerald-400 bg-white p-6 shadow-xl">
              <span className="absolute -top-3 left-6 rounded-full bg-emerald-500 px-3 py-1 text-[11px] font-black uppercase tracking-wide text-white">
                Le plus simple
              </span>
              <p className="text-4xl font-black text-emerald-600">Gratuit</p>
              <h3 className="mt-2 font-black">Votre collège l'utilise déjà</h3>
              <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-600">
                L'établissement finance EleveAI pour tous ses élèves. Vous n'avez
                rien à payer : votre enfant se connecte avec son code.
              </p>
              <Link
                href="/auth/signin?mode=eleve"
                className="mt-5 inline-flex rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-black text-white transition hover:bg-emerald-500"
              >
                J'ai un code →
              </Link>
            </div>

            {/* Porte 2 — Offre famille (repli) */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-md">
              <p className="text-4xl font-black text-slate-900">
                Offre famille
              </p>
              <h3 className="mt-2 font-black">Votre collège ne l'a pas encore</h3>
              <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-600">
                Un abonnement famille simple, sans engagement, pour continuer à la
                maison. Prix de lancement bloqué.
              </p>
              <Link
                href="/tarifs"
                className="mt-5 inline-flex rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-black text-white transition hover:bg-slate-700"
              >
                Voir l'offre famille →
              </Link>
            </div>

            {/* Porte 3 — Suggérer à l'établissement (lead B2B) */}
            <div className="rounded-3xl border border-sky-200 bg-sky-50 p-6 shadow-md">
              <p className="text-4xl">🏫</p>
              <h3 className="mt-2 font-black">Faites-le venir dans son collège</h3>
              <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-600">
                La meilleure option pour toutes les familles : suggérez EleveAI à
                l'établissement de votre enfant. Gratuit pour tout le monde.
              </p>
              <Link
                href="/contact?sujet=suggestion-etablissement"
                className="mt-5 inline-flex rounded-xl bg-sky-600 px-5 py-2.5 text-sm font-black text-white transition hover:bg-sky-500"
              >
                Suggérer à mon collège →
              </Link>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section>
          <h2 className="text-center text-2xl font-black sm:text-3xl">
            Vos questions
          </h2>
          <div className="mx-auto mt-6 max-w-3xl space-y-3">
            {faq.map((f) => (
              <details
                key={f.q}
                className="rounded-2xl border border-white bg-white/80 px-6 py-4 shadow-sm backdrop-blur"
              >
                <summary className="cursor-pointer font-black">{f.q}</summary>
                <p className="mt-3 text-sm font-semibold leading-relaxed text-slate-600">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
          <p className="mt-6 text-center text-sm font-semibold text-slate-500">
            Une autre question sur la protection des données&nbsp;?{" "}
            <Link href="/politique-confidentialite" className="font-black text-sky-700 underline">
              Notre politique de confidentialité
            </Link>
          </p>
        </section>

        {/* ── CTA FINAL ── */}
        <section className="rounded-[2rem] bg-emerald-600 p-8 text-center text-white shadow-2xl">
          <h2 className="text-2xl font-black sm:text-3xl">
            Prêt à aider votre enfant, sereinement&nbsp;?
          </h2>
          <p className="mx-auto mt-3 max-w-xl font-semibold text-emerald-50">
            Vérifiez d'abord si son collège l'utilise — c'est gratuit. Sinon,
            l'offre famille ou une suggestion à l'établissement.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/auth/signin?mode=eleve"
              className="rounded-2xl bg-white px-7 py-3.5 text-base font-black text-emerald-700 shadow-lg transition hover:bg-emerald-50"
            >
              🎓 J'ai un code établissement
            </Link>
            <Link
              href="/contact?sujet=suggestion-etablissement"
              className="rounded-2xl border border-white/40 bg-white/10 px-7 py-3.5 text-base font-black text-white transition hover:bg-white/20"
            >
              Suggérer EleveAI à mon collège
            </Link>
          </div>
        </section>

      </div>
    </main>
  );
}
