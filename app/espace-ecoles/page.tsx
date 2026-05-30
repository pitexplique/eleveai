import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "EleveAI pour les établissements — Collèges et lycées à La Réunion",
  description:
    "Déployez EleveAI dans votre collège ou lycée : codes élèves, suivi de progression, Coach Maths IA, Brevet, Calcul rapide. Offre pilote sur devis.",
  alternates: { canonical: "https://eleveai.fr/espace-ecoles" },
  openGraph: {
    title: "EleveAI pour les établissements scolaires",
    description:
      "Plusieurs portes pour apprendre les maths, suivi de progression élève par élève. Demandez votre accès pilote.",
    url: "https://eleveai.fr/espace-ecoles",
    siteName: "EleveAI",
    type: "website",
  },
};

const etapes = [
  {
    num: "1",
    title: "Vous nous contactez",
    text: "Un échange de 20 minutes pour comprendre votre contexte, vos classes, vos objectifs.",
    color: "bg-emerald-100 text-emerald-800",
  },
  {
    num: "2",
    title: "Nous créons les comptes",
    text: "Un code établissement + un code par élève et par professeur. Aucune installation, aucune adresse email.",
    color: "bg-sky-100 text-sky-800",
  },
  {
    num: "3",
    title: "Les élèves se connectent",
    text: "En 10 secondes sur eleveai.fr. Tous les outils sont disponibles immédiatement.",
    color: "bg-violet-100 text-violet-800",
  },
  {
    num: "4",
    title: "Vous suivez la progression",
    text: "Dashboard professeur et principal : scores, notions travaillées, élèves actifs — en temps réel.",
    color: "bg-amber-100 text-amber-800",
  },
];

const outils = [
  { emoji: "🧠", title: "Coach Maths IA", text: "Entraînement notion par notion, du CM1 à la Terminale. Missions progressives, score, badges.", href: "/coach-maths-ia" },
  { emoji: "🛤️", title: "Parcours de notions", text: "Bilan 🟢🟡🔴 des notions maîtrisées, à revoir ou fragiles. Idéal avant un contrôle.", href: "/parcours" },
  { emoji: "📚", title: "Coach Brevet", text: "Sprint 30 jours pour le brevet des collèges. Automatismes, problèmes guidés, sujets express.", href: "/coach-brevet" },
  { emoji: "⚡", title: "Calcul rapide", text: "7 questions en 5 minutes. Sessions chronométrées pour muscler les automatismes.", href: "/calcul-rapide" },
  { emoji: "🇬🇧", title: "English Maths", text: "Vocabulaire mathématique bilingue. Utile pour les sections européennes et DNL.", href: "/english-maths" },
  { emoji: "🎯", title: "Défis du jour", text: "Défis maths inspirés de La Réunion : Piton de la Fournaise, Grand Raid, océan.", href: "/defis-du-jour" },
];

const dashboards = [
  { role: "Élève", desc: "Voit ses résultats, son historique et ses notions fragiles.", color: "from-emerald-400 to-teal-500" },
  { role: "Professeur", desc: "Voit tous les élèves de son établissement, leurs scores et leur activité récente.", color: "from-blue-400 to-indigo-500" },
  { role: "Principal", desc: "Vue complète de l'établissement : tous les élèves, tous les modules, moyenne générale.", color: "from-indigo-500 to-violet-600" },
];

const faq = [
  {
    q: "Faut-il installer quelque chose ?",
    a: "Non. EleveAI est une application web. Les élèves y accèdent depuis n'importe quel ordinateur, tablette ou téléphone, sans installation.",
  },
  {
    q: "Les élèves ont-ils besoin d'une adresse email ?",
    a: "Non. La connexion se fait uniquement avec un code établissement et un code élève. Aucune donnée personnelle sensible n'est collectée.",
  },
  {
    q: "Combien ça coûte ?",
    a: "EleveAI est en phase pilote. L'accès est négocié sur devis selon le nombre de classes et d'élèves. Contactez-nous pour une proposition.",
  },
  {
    q: "On peut tester avant de s'engager ?",
    a: "Oui. Nous proposons un accès pilote gratuit pour une classe pendant 4 semaines, avec accompagnement.",
  },
  {
    q: "EleveAI remplace-t-il le professeur ?",
    a: "Non. EleveAI est un outil d'entraînement et de suivi. Le professeur reste la référence pédagogique — EleveAI l'aide à voir où en sont ses élèves.",
  },
];

export default function EspaceEcolesPage() {
  return (
    <main className="relative min-h-screen overflow-hidden text-slate-950">

      {/* FOND SVG */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <svg className="h-full w-full" viewBox="0 0 1440 1200" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="ec-bg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#EFF6FF" />
              <stop offset="50%" stopColor="#F0FDF4" />
              <stop offset="100%" stopColor="#FFFBEB" />
            </linearGradient>
            <radialGradient id="ec-g1" cx="12%" cy="18%" r="50%">
              <stop offset="0%" stopColor="#93C5FD" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#93C5FD" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="ec-g2" cx="88%" cy="15%" r="50%">
              <stop offset="0%" stopColor="#6EE7B7" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#6EE7B7" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="ec-g3" cx="50%" cy="90%" r="55%">
              <stop offset="0%" stopColor="#FDE68A" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#FDE68A" stopOpacity="0" />
            </radialGradient>
            <filter id="ec-blur"><feGaussianBlur stdDeviation="28" /></filter>
          </defs>
          <rect width="1440" height="1200" fill="url(#ec-bg)" />
          <rect width="1440" height="1200" fill="url(#ec-g1)" />
          <rect width="1440" height="1200" fill="url(#ec-g2)" />
          <rect width="1440" height="1200" fill="url(#ec-g3)" />
          <circle cx="130" cy="170" r="140" fill="#60A5FA" opacity="0.18" filter="url(#ec-blur)" />
          <circle cx="1310" cy="160" r="160" fill="#34D399" opacity="0.18" filter="url(#ec-blur)" />
          <circle cx="720" cy="1000" r="200" fill="#FCD34D" opacity="0.14" filter="url(#ec-blur)" />
          <path d="M0 1050 C360 1000 720 1050 1080 1020 C1260 1005 1380 1020 1440 1010 L1440 1200 L0 1200 Z"
            fill="white" opacity="0.55" />
        </svg>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-10 space-y-12">

        {/* ── HERO ── */}
        <section className="rounded-[2rem] border border-white/80 bg-white/80 p-8 shadow-2xl backdrop-blur-xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-xs font-black uppercase tracking-wide text-blue-800 ring-1 ring-blue-200">
            🏫 EleveAI · Établissements scolaires
          </div>
          <h1 className="text-3xl font-black leading-tight text-slate-950 sm:text-5xl">
            EleveAI dans votre collège ou lycée
          </h1>
          <p className="mt-4 mx-auto max-w-2xl text-base font-semibold leading-relaxed text-slate-600 sm:text-lg">
            Plusieurs portes pour apprendre les maths, un suivi de progression élève par élève.
            Déployé en quelques heures, sans installation, sans email.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="rounded-2xl bg-blue-600 px-8 py-4 text-base font-black text-white shadow-lg hover:bg-blue-500 transition"
            >
              📩 Demander un accès pilote gratuit
            </Link>
            <Link
              href="/auth/signin-eleve"
              className="rounded-2xl bg-white px-8 py-4 text-base font-black text-slate-800 ring-1 ring-slate-200 hover:bg-slate-50 transition"
            >
              Voir la connexion élève
            </Link>
          </div>
        </section>

        {/* ── CHIFFRES CLÉS ── */}
        <section className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { val: "GS → Bac", label: "Niveaux couverts" },
            { val: "8+", label: "Outils disponibles" },
            { val: "5", label: "Modules avec suivi" },
            { val: "100 %", label: "Web, sans install" },
          ].map((s) => (
            <div key={s.label} className="rounded-[1.5rem] border border-white/80 bg-white/80 p-5 text-center shadow-md backdrop-blur">
              <p className="text-2xl font-black text-blue-700">{s.val}</p>
              <p className="mt-1 text-xs font-bold text-slate-500">{s.label}</p>
            </div>
          ))}
        </section>

        {/* ── COMMENT ÇA MARCHE ── */}
        <section>
          <h2 className="mb-6 text-2xl font-black text-slate-950 text-center">
            Déployé en 4 étapes
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {etapes.map((e) => (
              <div key={e.num} className="rounded-[1.5rem] border border-white/80 bg-white/80 p-5 shadow-md backdrop-blur">
                <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-2xl text-xl font-black ${e.color}`}>
                  {e.num}
                </div>
                <h3 className="font-black text-slate-950">{e.title}</h3>
                <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-600">{e.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── DASHBOARDS ── */}
        <section className="rounded-[2rem] border border-white/80 bg-white/80 p-8 shadow-xl backdrop-blur-xl">
          <h2 className="mb-2 text-2xl font-black text-slate-950">
            📊 Un tableau de bord pour chaque rôle
          </h2>
          <p className="mb-6 text-sm font-semibold text-slate-500">
            Élève, professeur, principal — chacun voit ce dont il a besoin.
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {dashboards.map((d) => (
              <div key={d.role} className="overflow-hidden rounded-[1.5rem] border border-white/70 shadow-md">
                <div className={`bg-gradient-to-br ${d.color} px-5 py-4`}>
                  <p className="font-black text-white text-lg">{d.role}</p>
                </div>
                <div className="bg-white p-4">
                  <p className="text-sm font-semibold text-slate-600">{d.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── OUTILS ── */}
        <section>
          <h2 className="mb-6 text-2xl font-black text-slate-950 text-center">
            Les outils disponibles
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {outils.map((o) => (
              <Link
                key={o.href}
                href={o.href}
                className="group rounded-[1.5rem] border border-white/70 bg-white/80 p-5 shadow-md backdrop-blur transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mb-2 text-3xl">{o.emoji}</div>
                <h3 className="font-black text-slate-950">{o.title}</h3>
                <p className="mt-1 text-sm font-semibold leading-relaxed text-slate-500">{o.text}</p>
                <p className="mt-3 text-xs font-black text-blue-600 transition group-hover:translate-x-1">
                  Découvrir →
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* ── ANCRÉ RÉUNION ── */}
        <section className="rounded-[2rem] border border-amber-200 bg-white/80 p-8 shadow-xl backdrop-blur text-center">
          <p className="text-4xl">🏝️</p>
          <h2 className="mt-3 text-2xl font-black text-slate-950">
            Conçu à La Réunion, pour La Réunion
          </h2>
          <p className="mt-3 font-semibold text-slate-600 max-w-2xl mx-auto">
            EleveAI est créé par un enseignant de maths en activité à La Réunion.
            Les contenus suivent les programmes officiels français. Les défis s&apos;inspirent
            du Piton de la Fournaise, du Grand Raid, de l&apos;océan Indien.
            Nous connaissons les contraintes du terrain réunionnais.
          </p>
        </section>

        {/* ── FAQ ── */}
        <section>
          <h2 className="mb-6 text-2xl font-black text-slate-950 text-center">
            Questions fréquentes
          </h2>
          <div className="space-y-3">
            {faq.map((f) => (
              <details
                key={f.q}
                className="rounded-[1.5rem] border border-white/80 bg-white/80 px-6 py-4 shadow-md backdrop-blur"
              >
                <summary className="cursor-pointer font-black text-slate-950">
                  {f.q}
                </summary>
                <p className="mt-3 text-sm font-semibold leading-relaxed text-slate-600">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* ── CTA FINAL ── */}
        <section className="rounded-[2rem] bg-blue-600 p-8 shadow-2xl text-center text-white">
          <h2 className="text-2xl font-black sm:text-3xl">
            Prêt à tester EleveAI dans votre établissement ?
          </h2>
          <p className="mt-3 font-semibold text-blue-100 max-w-xl mx-auto">
            Accès pilote gratuit 4 semaines · Accompagnement inclus · Sans engagement
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="rounded-2xl bg-white px-8 py-4 text-base font-black text-blue-700 shadow-lg hover:bg-blue-50 transition"
            >
              📩 Demander le pilote gratuit
            </Link>
            <Link
              href="/pourquoi-eleveai"
              className="rounded-2xl border border-white/40 bg-white/10 px-8 py-4 text-base font-black text-white hover:bg-white/20 transition"
            >
              En savoir plus
            </Link>
          </div>
        </section>

      </div>
    </main>
  );
}
