"use client";

import Link from "next/link";
import { useEleve } from "@/context/EleveContext";

type EleveSession = {
  nom?: string | null;
  code_etablissement?: string | null;
  code_eleve?: string | null;
  code_utilisateur?: string | null;
};

const outils = [
  {
    emoji: "🧠",
    title: "Coach Maths IA",
    description: "Travaille une notion précise, notion par notion, avec des missions adaptées à ton niveau.",
    href: "/coach-maths-ia",
    color: "from-orange-400 to-red-500",
    badge: null,
  },
  {
    emoji: "🛤️",
    title: "Parcours",
    description: "Fais un bilan de tes notions et vois lesquelles sont maîtrisées, à revoir ou fragiles.",
    href: "/parcours",
    color: "from-violet-500 to-indigo-600",
    badge: null,
  },
  {
    emoji: "📚",
    title: "Coach Brevet",
    description: "Sprint 30 jours pour préparer le brevet : fractions, Pythagore, probabilités, équations…",
    href: "/coach-brevet",
    color: "from-emerald-400 to-teal-600",
    badge: "J−30",
  },
  {
    emoji: "⚡",
    title: "Calcul rapide",
    description: "7 questions en 5 minutes pour renforcer tes automatismes de calcul.",
    href: "/calcul-rapide",
    color: "from-lime-400 to-green-600",
    badge: null,
  },
  {
    emoji: "🎓",
    title: "Coach Bac Spé",
    description: "Suites, fonctions, probabilités, logarithme — automatismes et problèmes guidés pour le 16 juin.",
    href: "/coach-bac-spe",
    color: "from-blue-600 to-violet-700",
    badge: "16 juin",
  },
  {
    emoji: "🇬🇧",
    title: "English Maths",
    description: "5 mots de vocabulaire mathématique en anglais par jour, avec audio et mini-défi.",
    href: "/english-maths",
    color: "from-sky-500 to-blue-600",
    badge: null,
  },
  {
    emoji: "🎯",
    title: "Défis du jour",
    description: "Des défis maths inspirés de La Réunion — volcan, Grand Raid, océan…",
    href: "/defis-du-jour",
    color: "from-pink-500 to-rose-600",
    badge: null,
  },
  {
    emoji: "🏆",
    title: "Concours général",
    description: "Des questions de haut niveau pour les élèves qui veulent se dépasser.",
    href: "/concours-general",
    color: "from-amber-400 to-orange-500",
    badge: null,
  },
];

const classes = [
  { label: "CM1", href: "/coach-maths-ia?classe=cm1" },
  { label: "CM2", href: "/coach-maths-ia?classe=cm2" },
  { label: "6e",  href: "/coach-maths-ia?classe=6e" },
  { label: "5e",  href: "/coach-maths-ia?classe=5e" },
  { label: "4e",  href: "/coach-maths-ia?classe=4e" },
  { label: "3e",  href: "/coach-maths-ia?classe=3e" },
];

export default function EspaceElevesClient() {
  const eleveContext = useEleve() as unknown as { eleve?: EleveSession | null };
  const eleve = eleveContext.eleve ?? null;

  return (
    <main className="relative min-h-screen overflow-hidden text-slate-950">

      {/* ── FOND SVG JOYEUX ─────────────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <svg
          className="h-full w-full"
          viewBox="0 0 1440 1000"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="ee-bg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ECFDF5" />
              <stop offset="40%" stopColor="#EFF6FF" />
              <stop offset="100%" stopColor="#FFF7ED" />
            </linearGradient>
            <radialGradient id="ee-g1" cx="15%" cy="20%" r="50%">
              <stop offset="0%" stopColor="#6EE7B7" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#6EE7B7" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="ee-g2" cx="85%" cy="15%" r="50%">
              <stop offset="0%" stopColor="#93C5FD" stopOpacity="0.65" />
              <stop offset="100%" stopColor="#93C5FD" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="ee-g3" cx="50%" cy="90%" r="55%">
              <stop offset="0%" stopColor="#FDE68A" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#FDE68A" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="ee-g4" cx="80%" cy="70%" r="40%">
              <stop offset="0%" stopColor="#F9A8D4" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#F9A8D4" stopOpacity="0" />
            </radialGradient>
            <filter id="ee-blur">
              <feGaussianBlur stdDeviation="25" />
            </filter>
          </defs>

          <rect width="1440" height="1000" fill="url(#ee-bg)" />
          <rect width="1440" height="1000" fill="url(#ee-g1)" />
          <rect width="1440" height="1000" fill="url(#ee-g2)" />
          <rect width="1440" height="1000" fill="url(#ee-g3)" />
          <rect width="1440" height="1000" fill="url(#ee-g4)" />

          {/* Cercles décoratifs */}
          <circle cx="160" cy="180" r="140" fill="#34D399" opacity="0.18" filter="url(#ee-blur)" />
          <circle cx="1260" cy="160" r="160" fill="#60A5FA" opacity="0.2" filter="url(#ee-blur)" />
          <circle cx="720" cy="820" r="200" fill="#FBBF24" opacity="0.15" filter="url(#ee-blur)" />
          <circle cx="1100" cy="650" r="130" fill="#F472B6" opacity="0.18" filter="url(#ee-blur)" />
          <circle cx="280" cy="700" r="110" fill="#A78BFA" opacity="0.18" filter="url(#ee-blur)" />

          {/* Étoiles / formes géométriques joyeuses */}
          <polygon points="1350,80 1360,110 1390,110 1366,128 1375,158 1350,140 1325,158 1334,128 1310,110 1340,110"
            fill="#FDE68A" opacity="0.5" />
          <polygon points="90,600 100,630 130,630 106,648 115,678 90,660 65,678 74,648 50,630 80,630"
            fill="#6EE7B7" opacity="0.45" />
          <circle cx="1380" cy="400" r="18" fill="#F9A8D4" opacity="0.6" />
          <circle cx="60" cy="350" r="14" fill="#93C5FD" opacity="0.6" />
          <circle cx="700" cy="60" r="22" fill="#FDE68A" opacity="0.5" />
          <rect x="1200" y="500" width="30" height="30" rx="6" fill="#6EE7B7" opacity="0.4" transform="rotate(20,1215,515)" />
          <rect x="200" y="440" width="24" height="24" rx="5" fill="#F9A8D4" opacity="0.45" transform="rotate(-15,212,452)" />

          {/* Symboles maths discrets */}
          <g opacity="0.12" fill="#1E40AF" fontFamily="serif" fontSize="52" fontWeight="900">
            <text x="100" y="280">+</text>
            <text x="1320" y="300">÷</text>
            <text x="640" y="940">×</text>
            <text x="1100" y="200">π</text>
            <text x="300" y="880">%</text>
          </g>

          {/* Vague basse blanche */}
          <path
            d="M0 870 C240 820 480 870 720 840 C960 810 1200 860 1440 830 L1440 1000 L0 1000 Z"
            fill="white"
            opacity="0.6"
          />
        </svg>
      </div>

      {/* ── CONTENU ─────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-6xl px-4 py-10">

        {/* HERO */}
        <section className="mb-10 rounded-[2rem] border border-white/80 bg-white/75 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-xs font-black uppercase tracking-wide text-emerald-800 ring-1 ring-emerald-200">
                🚀 EleveAI · Espace élèves
              </div>

              <h1 className="text-3xl font-black leading-tight text-slate-950 sm:text-5xl">
                Ton espace pour progresser en maths 🎯
              </h1>

              <p className="mt-4 max-w-2xl text-base font-semibold leading-relaxed text-slate-700 sm:text-lg">
                Coach personnalisé, parcours de révision, calcul rapide, English Maths…
                Tous tes outils au même endroit, du CM1 au Bac.
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                {eleve ? (
                  <Link
                    href="/dashboard-eleve"
                    className="rounded-2xl bg-emerald-500 px-6 py-3 text-sm font-black text-white shadow-lg transition hover:bg-emerald-400"
                  >
                    📊 Voir mon tableau de bord
                  </Link>
                ) : (
                  <Link
                    href="/auth/signin-eleve"
                    className="rounded-2xl bg-emerald-500 px-6 py-3 text-sm font-black text-white shadow-lg transition hover:bg-emerald-400"
                  >
                    🔐 Me connecter
                  </Link>
                )}
                <Link
                  href="/parcours"
                  className="rounded-2xl bg-white px-6 py-3 text-sm font-black text-slate-800 shadow-sm ring-1 ring-slate-200 transition hover:bg-slate-50"
                >
                  🛤️ Faire mon bilan
                </Link>
              </div>
            </div>

            {/* Infos élève connecté */}
            {eleve && (
              <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-5 text-center lg:min-w-[220px]">
                <div className="text-4xl">👋</div>
                <p className="mt-2 text-xl font-black text-emerald-950">
                  {eleve.nom ?? "Élève"}
                </p>
                <p className="mt-1 text-xs font-bold text-emerald-700">
                  {eleve.code_etablissement} · {eleve.code_eleve ?? eleve.code_utilisateur}
                </p>
                <Link
                  href="/dashboard-eleve"
                  className="mt-4 block rounded-2xl bg-emerald-600 px-4 py-2 text-sm font-black text-white hover:bg-emerald-500"
                >
                  Mon dashboard →
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* CHOISIR SA CLASSE */}
        <section className="mb-8">
          <p className="mb-4 text-xs font-black uppercase tracking-[0.25em] text-slate-500">
            Commencer par ma classe
          </p>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
            {classes.map((c) => (
              <Link
                key={c.label}
                href={c.href}
                className="group rounded-2xl border border-white/80 bg-white/80 p-4 text-center shadow-lg backdrop-blur transition hover:-translate-y-1 hover:border-emerald-300 hover:bg-white hover:shadow-xl"
              >
                <span className="text-2xl font-black text-slate-950">{c.label}</span>
                <div className="mt-2 rounded-full bg-emerald-400 px-2 py-0.5 text-[10px] font-black text-slate-950 transition group-hover:scale-110">
                  Go →
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* OUTILS */}
        <section>
          <p className="mb-4 text-xs font-black uppercase tracking-[0.25em] text-slate-500">
            Tous mes outils
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {outils.map((outil) => (
              <Link
                key={outil.href}
                href={outil.href}
                className="group relative overflow-hidden rounded-[1.5rem] border border-white/70 bg-white/80 shadow-lg backdrop-blur transition hover:-translate-y-1 hover:shadow-2xl"
              >
                {outil.badge && (
                  <div className="absolute right-3 top-3 rounded-full bg-amber-400 px-2 py-0.5 text-[10px] font-black text-slate-950">
                    {outil.badge}
                  </div>
                )}

                <div className={`bg-gradient-to-br ${outil.color} px-5 py-5`}>
                  <span className="text-4xl">{outil.emoji}</span>
                </div>

                <div className="p-4">
                  <h2 className="text-base font-black text-slate-950">{outil.title}</h2>
                  <p className="mt-1 text-xs font-semibold leading-relaxed text-slate-600">
                    {outil.description}
                  </p>
                  <p className="mt-3 text-xs font-black text-emerald-700 transition group-hover:translate-x-1">
                    Commencer →
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA CONNEXION si non connecté */}
        {!eleve && (
          <section className="mt-10 rounded-[2rem] border border-emerald-200 bg-white/80 p-6 text-center shadow-xl backdrop-blur">
            <p className="text-2xl font-black text-slate-950">
              Tu veux suivre ta progression ?
            </p>
            <p className="mt-2 font-semibold text-slate-600">
              Connecte-toi avec ton code élève pour enregistrer tes résultats et voir ton évolution.
            </p>
            <Link
              href="/auth/signin-eleve"
              className="mt-5 inline-flex rounded-2xl bg-emerald-500 px-8 py-4 text-base font-black text-white shadow-lg transition hover:bg-emerald-400"
            >
              🔐 Me connecter avec mon code élève
            </Link>
          </section>
        )}

      </div>
    </main>
  );
}
