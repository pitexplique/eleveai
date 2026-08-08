import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "EleveAI pour les établissements — Collèges et lycées à La Réunion",
  description:
    "Un coach IA multi-matières et un suivi élève par élève, déployé en quelques heures. Financé par l'établissement, gratuit pour les familles. RGPD maîtrisé, conçu par un enseignant.",
  alternates: { canonical: "https://eleveai.fr/espace-ecoles" },
  openGraph: {
    title: "EleveAI pour les établissements scolaires",
    description:
      "Coach IA multi-matières + suivi élève par élève. Financé par l'établissement, gratuit pour les familles. Offre pilote sur devis.",
    url: "https://eleveai.fr/espace-ecoles",
    siteName: "EleveAI",
    type: "website",
  },
};

// Le compte à rebours doit rester juste : sans revalidation, une page
// statique figerait le J−N au jour du build. Une heure suffit largement.
export const revalidate = 3600;

// LES ÉVALUATIONS NATIONALES (Frédéric, 03/08 : « ce qui va l'intéresser
// c'est la préparation aux évaluations nationales »). Un principal est jugé
// dessus, et cette page — qui répond déjà au financement, au RGPD et à la
// souveraineté des données — n'en disait pas un mot.
const EVAL_NATIONALE_DATE = new Date("2026-09-07T08:00:00+04:00");

function joursAvantEvalNationale(): number {
  const diff = EVAL_NATIONALE_DATE.getTime() - Date.now();
  return Math.max(0, Math.ceil(diff / 86_400_000));
}

const EPREUVES = [
  { niveau: "6ᵉ", matiere: "Français", duree: "25 min", href: "/evaluation-nationale-college/6e-francais" },
  { niveau: "6ᵉ", matiere: "Mathématiques", duree: "20 min", href: "/evaluation-nationale-college/6e-maths" },
  { niveau: "4ᵉ", matiere: "Français", duree: "25 min", href: "/evaluation-nationale-college/4e-francais" },
  { niveau: "4ᵉ", matiere: "Mathématiques", duree: "20 min", href: "/evaluation-nationale-college/4e-maths" },
];

// Le modèle économique = l'argument CEO n°1 pour un établissement.
const modele = [
  {
    emoji: "🏫",
    titre: "Vous financez, à prix viable par élève",
    texte:
      "Un tarif par élève, négocié sur devis selon vos effectifs. Un seul interlocuteur, une seule facture — pas de gestion de paiements familles.",
  },
  {
    emoji: "🤝",
    titre: "Gratuit pour toutes les familles",
    texte:
      "Aucun élève exclu pour raisons financières. C'est le cœur de notre mission : l'égalité d'accès, financée par l'institution, pas par les foyers.",
  },
  {
    emoji: "🔒",
    titre: "Données de mineurs maîtrisées",
    texte:
      "Pas d'adresse e-mail élève, prénom jamais relié à une classe identifiable, DPD consultée. Souveraineté et RGPD au cœur de la conception.",
  },
];

// La couverture — montre que ce n'est plus « maths only ».
const couverture = [
  { emoji: "🧠", titre: "5 coachs par matière", texte: "Maths, Français, Anglais, Espagnol, IA — du CP à la Terminale, notion par notion." },
  { emoji: "🛤️", titre: "Parcours & diagnostics", texte: "Bilan par notion 🟢🟡🔴 : maîtrisé, à revoir, fragile. Idéal avant un contrôle ou une évaluation nationale." },
  { emoji: "☀️", titre: "Rituels quotidiens", texte: "Dictée du jour, calcul rapide, défis — de courts rendez-vous pour installer l'habitude de travail." },
  { emoji: "🎓", titre: "Prépa examens", texte: "Sprint Brevet, Bac spé maths, éval blanche Pix IA — l'entraînement ciblé jusqu'au jour J." },
  { emoji: "📊", titre: "Suivi & remédiation", texte: "Progression élève par élève ; à l'échec, l'élève est rerouté vers le prérequis fragile, automatiquement." },
  { emoji: "🔊", titre: "Accessibilité", texte: "Lecture vocale et compatibilité lecteurs d'écran (NVDA, VoiceOver) : un élève déficient visuel travaille en autonomie." },
];

const dashboards = [
  { role: "Élève", desc: "Ses résultats, son historique, ses notions fragiles et sa reco du jour.", color: "from-emerald-400 to-teal-500" },
  { role: "Professeur", desc: "Tous ses élèves : scores, notions travaillées, activité récente, points à renforcer.", color: "from-blue-400 to-indigo-500" },
  { role: "Principal", desc: "Vue complète de l'établissement : tous les élèves, tous les modules, engagement global.", color: "from-indigo-500 to-violet-600" },
];

const etapes = [
  { num: "1", title: "Un échange de 20 min", text: "On comprend votre contexte, vos classes, vos objectifs — et on cadre le pilote.", color: "bg-emerald-100 text-emerald-800" },
  { num: "2", title: "On crée les comptes", text: "Un code établissement, un code par élève et par professeur. Sans installation, sans e-mail.", color: "bg-sky-100 text-sky-800" },
  { num: "3", title: "Les élèves se connectent", text: "En 10 secondes sur eleveai.fr. Tous les outils disponibles immédiatement.", color: "bg-violet-100 text-violet-800" },
  { num: "4", title: "Vous pilotez", text: "Dashboards professeur et principal : progression et engagement, en temps réel.", color: "bg-amber-100 text-amber-800" },
];

const faq = [
  {
    q: "Combien ça coûte pour l'établissement ?",
    a: "Un tarif par élève, sur devis selon vos effectifs, pensé pour rester viable. En contrepartie, c'est gratuit pour toutes les familles et il n'y a aucun paiement à gérer côté foyers.",
  },
  {
    q: "Et pour les familles ?",
    a: "Rien. Quand l'établissement finance, l'accès est entièrement gratuit pour les élèves et leurs parents. C'est le principe : l'égalité d'accès portée par l'institution.",
  },
  {
    q: "Comment sont protégées les données des élèves ?",
    a: "Connexion par code (pas d'e-mail élève), prénom jamais relié à une classe identifiable, droit d'accès et de suppression. La déléguée à la protection des données a été consultée ; la démarche est menée en lien avec le rectorat.",
  },
  {
    q: "Faut-il installer quelque chose ?",
    a: "Non. EleveAI est une application web : n'importe quel ordinateur, tablette ou téléphone, sans installation ni configuration.",
  },
  {
    q: "EleveAI remplace-t-il le professeur ?",
    a: "Non. C'est un outil d'entraînement et de suivi. Le professeur reste la référence pédagogique — EleveAI l'aide à voir où en sont ses élèves et à cibler la remédiation.",
  },
  {
    q: "On peut tester avant de s'engager ?",
    a: "Oui : un pilote gratuit de 4 semaines pour une classe, avec accompagnement. Sans engagement.",
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

      <div className="mx-auto max-w-5xl px-4 py-10 space-y-14">

        {/* ── HERO ── */}
        <section className="rounded-[2rem] border border-white/80 bg-white/80 p-8 shadow-2xl backdrop-blur-xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-xs font-black uppercase tracking-wide text-blue-800 ring-1 ring-blue-200">
            🏫 EleveAI · Établissements scolaires
          </div>
          <h1 className="text-3xl font-black leading-tight text-slate-950 sm:text-5xl">
            Un coach IA multi-matières, un suivi élève par élève
          </h1>
          <p className="mt-4 mx-auto max-w-2xl text-base font-semibold leading-relaxed text-slate-600 sm:text-lg">
            Déployé dans votre collège ou lycée en quelques heures, sans installation.
            <span className="font-black text-slate-800"> Financé par l'établissement, gratuit pour les familles.</span>
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact?sujet=pilote-etablissement"
              className="rounded-2xl bg-blue-600 px-8 py-4 text-base font-black text-white shadow-lg hover:bg-blue-500 hover:scale-105 transition"
            >
              📩 Demander un pilote gratuit
            </Link>
            <Link
              href="/contact?sujet=etablissement"
              className="rounded-2xl bg-white px-8 py-4 text-base font-black text-slate-800 ring-1 ring-slate-200 hover:bg-slate-50 transition"
            >
              Parler à un responsable
            </Link>
          </div>
        </section>

        {/* ── LE MODÈLE (argument CEO n°1) ── */}
        {/* ── LES ÉVALUATIONS NATIONALES ──
            Placée haut, avant le modèle économique : c'est l'échéance qui
            occupe un chef d'établissement en août, pas le prix.
            ⚠️ Cadrée « collège » explicitement. Les évaluations nationales
            existent aussi en CP, CE1 et CM1 — mais notre hub ne couvre que la
            6ᵉ et la 4ᵉ. Un directeur d'école primaire qui cliquerait sans
            trouver son CP perdrait la confiance que cette page construit. */}
        <section className="rounded-[2rem] border border-sky-200 bg-white/80 p-8 shadow-xl backdrop-blur">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">
            Pour les collèges · Rentrée 2026
          </p>
          <h2 className="mt-2 text-2xl font-black text-slate-950 sm:text-3xl">
            Vos élèves peuvent préparer les évaluations nationales
          </h2>

          <div className="mt-5 flex flex-wrap items-center gap-5 border-y border-slate-200 py-5">
            {joursAvantEvalNationale() > 0 && (
              <p className="text-5xl font-black leading-none tracking-tight text-blue-700">
                J−{joursAvantEvalNationale()}
              </p>
            )}
            <p className="min-w-0 flex-1 text-sm font-semibold leading-relaxed text-slate-600">
              Les épreuves de 6ᵉ et de 4ᵉ ont lieu à partir du 7 septembre.
              Chaque élève peut passer les quatre épreuves en blanc et repart
              avec un <strong className="text-slate-900">bilan par
              compétence</strong> — de quoi vous dire, avant le jour J, où en
              est chaque classe.
            </p>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {EPREUVES.map((e) => (
              <Link
                key={e.href}
                href={e.href}
                className="group rounded-[1.25rem] border border-slate-200 bg-white/70 p-4 transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md"
              >
                <p className="font-black text-slate-950">
                  {e.niveau} {e.matiere}
                </p>
                <p className="mt-1 text-xs font-bold text-blue-700 group-hover:underline">
                  Épreuve blanche · {e.duree} →
                </p>
              </Link>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-4">
            <Link
              href="/evaluation-nationale-college"
              className="rounded-full bg-blue-600 px-6 py-3 text-sm font-black text-white shadow-lg transition hover:brightness-110"
            >
              Voir le détail des épreuves →
            </Link>
            <p className="text-xs font-semibold text-slate-500">
              Gratuit, sans compte, sans installation.
            </p>
          </div>
        </section>

        <section>
          <h2 className="mb-2 text-center text-2xl font-black text-slate-950 sm:text-3xl">
            Le modèle : vous financez, tout le monde y accède
          </h2>
          <p className="mx-auto mb-6 max-w-2xl text-center text-sm font-semibold text-slate-500">
            L'établissement paie une fois, à prix viable — et aucune famille n'est laissée de côté.
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {modele.map((m) => (
              <div key={m.titre} className="rounded-[1.5rem] border border-white/80 bg-white/80 p-6 shadow-md backdrop-blur">
                <div className="text-3xl">{m.emoji}</div>
                <h3 className="mt-3 font-black text-slate-950">{m.titre}</h3>
                <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-600">{m.texte}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CHIFFRES CLÉS ── */}
        <section className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { val: "6", label: "Matières coachées" },
            { val: "CP → Bac", label: "Niveaux couverts" },
            { val: "Temps réel", label: "Suivi de progression" },
            { val: "100 %", label: "Web, sans install" },
          ].map((s) => (
            <div key={s.label} className="rounded-[1.5rem] border border-white/80 bg-white/80 p-5 text-center shadow-md backdrop-blur">
              <p className="text-2xl font-black text-blue-700">{s.val}</p>
              <p className="mt-1 text-xs font-bold text-slate-500">{s.label}</p>
            </div>
          ))}
        </section>

        {/* ── CE QUE ÇA COUVRE (multi-matières) ── */}
        <section>
          <h2 className="mb-6 text-center text-2xl font-black text-slate-950 sm:text-3xl">
            Bien plus que les maths
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {couverture.map((o) => (
              <div key={o.titre} className="rounded-[1.5rem] border border-white/70 bg-white/80 p-5 shadow-md backdrop-blur">
                <div className="mb-2 text-3xl">{o.emoji}</div>
                <h3 className="font-black text-slate-950">{o.titre}</h3>
                <p className="mt-1 text-sm font-semibold leading-relaxed text-slate-500">{o.texte}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── PILOTAGE / DASHBOARDS ── */}
        <section className="rounded-[2rem] border border-white/80 bg-white/80 p-8 shadow-xl backdrop-blur-xl">
          <h2 className="mb-2 text-2xl font-black text-slate-950">
            📊 Un tableau de bord pour chaque rôle
          </h2>
          <p className="mb-6 text-sm font-semibold text-slate-500">
            Élève, professeur, principal — chacun voit ce dont il a besoin, en temps réel.
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

        {/* ── MAQUETTE « screenshot » : le tableau de bord principal ── */}
        <section>
          <h2 className="text-center text-2xl font-black text-slate-950 sm:text-3xl">
            Le pilotage, en temps réel
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-center text-sm font-semibold text-slate-500">
            Ce que voit le principal : l&apos;engagement de tout l&apos;établissement,
            classe par classe.
          </p>

          <div className="mx-auto mt-8 max-w-2xl overflow-hidden rounded-3xl border border-slate-800 bg-[#041B33] p-5 text-white shadow-2xl sm:p-7">
            <div className="mb-4 flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-red-400/70" />
              <span className="h-3 w-3 rounded-full bg-amber-400/70" />
              <span className="h-3 w-3 rounded-full bg-emerald-400/70" />
              <span className="ml-3 text-xs font-bold text-white/40">Tableau de bord · Principal</span>
            </div>

            {/* KPIs établissement */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { v: "412", l: "élèves" },
                { v: "78 %", l: "actifs / semaine" },
                { v: "1 240", l: "exercices / semaine" },
                { v: "6", l: "matières" },
              ].map((k) => (
                <div key={k.l} className="rounded-2xl bg-white/5 p-3 text-center">
                  <p className="text-xl font-black text-white">{k.v}</p>
                  <p className="mt-0.5 text-[11px] font-semibold text-white/50">{k.l}</p>
                </div>
              ))}
            </div>

            {/* Engagement par niveau */}
            <p className="mt-4 text-xs font-black uppercase tracking-wide text-blue-200">
              Engagement par niveau
            </p>
            <div className="mt-2 space-y-2">
              {[
                { n: "6e", v: 82, c: "from-emerald-400 to-teal-500", s: "🟢" },
                { n: "5e", v: 74, c: "from-emerald-400 to-teal-500", s: "🟢" },
                { n: "4e", v: 61, c: "from-amber-400 to-orange-500", s: "🟠" },
                { n: "3e", v: 88, c: "from-emerald-400 to-teal-500", s: "🟢" },
              ].map((r) => (
                <div key={r.n} className="flex items-center gap-3">
                  <span className="w-8 text-xs font-black text-white/70">{r.n}</span>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
                    <div className={`h-full rounded-full bg-gradient-to-r ${r.c}`} style={{ width: `${r.v}%` }} />
                  </div>
                  <span className="w-14 text-right text-xs font-black">{r.s} {r.v}%</span>
                </div>
              ))}
            </div>

            <p className="mt-3 inline-flex items-center gap-1 rounded-full bg-amber-400/15 px-3 py-1 text-xs font-black text-amber-200">
              👀 À suivre : 4e B — engagement en baisse cette semaine
            </p>
          </div>

          <p className="mx-auto mt-4 max-w-2xl text-center text-xs font-semibold text-slate-500">
            Une vue d&apos;ensemble claire, en temps réel — et respectueuse du RGPD :
            aucune donnée nominative exposée au-delà du nécessaire.
          </p>
        </section>

        {/* ── RGPD & SOUVERAINETÉ ── */}
        <section className="rounded-[2rem] border border-sky-200 bg-white/80 p-8 shadow-xl backdrop-blur">
          <div className="flex flex-wrap items-start gap-4">
            <div className="text-4xl">🔒</div>
            <div className="flex-1">
              <h2 className="text-2xl font-black text-slate-950">
                Données de mineurs : notre priorité
              </h2>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {[
                  "Connexion par code — aucune adresse e-mail élève",
                  "Prénom jamais relié à une classe identifiable",
                  "Droit d'accès et de suppression sur simple demande",
                  "DPD consultée · démarche menée avec le rectorat",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2 text-sm font-semibold text-slate-600">
                    <span className="mt-0.5 text-emerald-600">✓</span> {t}
                  </li>
                ))}
              </ul>
              <Link href="/politique-confidentialite" className="mt-4 inline-flex text-sm font-black text-sky-700 underline">
                Lire la politique de confidentialité →
              </Link>
            </div>
          </div>
        </section>

        {/* ── DÉPLOIEMENT ── */}
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

        {/* ── ANCRÉ RÉUNION ── */}
        <section className="rounded-[2rem] border border-amber-200 bg-white/80 p-8 shadow-xl backdrop-blur text-center">
          <p className="text-4xl">🏝️</p>
          <h2 className="mt-3 text-2xl font-black text-slate-950">
            Conçu à La Réunion, pour les enfants du monde entier
          </h2>
          <p className="mt-3 font-semibold text-slate-600 max-w-2xl mx-auto">
            EleveAI est créé et utilisé au quotidien par un enseignant de maths en
            activité à La Réunion. Les contenus suivent les programmes officiels ;
            les défis s&apos;inspirent du Piton de la Fournaise, du Grand Raid, de
            l&apos;océan Indien. Un outil du terrain, qui connaît vos contraintes.
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
            Pilote gratuit 4 semaines · Accompagnement inclus · Sans engagement
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact?sujet=pilote-etablissement"
              className="rounded-2xl bg-white px-8 py-4 text-base font-black text-blue-700 shadow-lg hover:bg-blue-50 hover:scale-105 transition"
            >
              📩 Demander le pilote gratuit
            </Link>
            <Link
              href="/espace-profs"
              className="rounded-2xl border border-white/40 bg-white/10 px-8 py-4 text-base font-black text-white hover:bg-white/20 transition"
            >
              Voir l'espace enseignant
            </Link>
          </div>
        </section>

      </div>
    </main>
  );
}
