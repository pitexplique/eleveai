"use client";

import { FormEvent, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useEleve } from "@/context/EleveContext";
import GoogleFollowChip from "@/components/GoogleFollowChip";

// ─── Constants ───────────────────────────────────────────────────────────────

const BREVET_DATE = new Date("2026-06-27T08:00:00");

function joursAvantBrevet() {
  const diff = BREVET_DATE.getTime() - Date.now();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

const jours = joursAvantBrevet();

// ─── Chips "Que veux-tu faire ?" ─────────────────────────────────────────────

type ChipItem = { icon: string; label: string; href: string; desc: string };

type Chip =
  | { type: "link";     icon: string; label: string; href: string; color: string; cm: boolean }
  | { type: "dropdown"; icon: string; label: string; color: string; cm: boolean; items: ChipItem[] };

const CHIPS: Chip[] = [
  {
    type: "dropdown",
    icon: "🧠", label: "Maths", cm: true,
    color: "hover:border-cyan-400/60 hover:bg-cyan-500/20",
    items: [
      { icon: "🧠", label: "Coach Maths IA",   href: "/coach-ia/maths",    desc: "Toutes notions, CP → Terminale" },
      { icon: "🛤️", label: "Parcours Maths",   href: "/parcours",          desc: "Bilan de compétences personnalisé" },
      { icon: "📚", label: "Coach Brevet",      href: "/coach-brevet",      desc: "Sprint J−30, toutes les notions" },
      { icon: "🎓", label: "Coach Bac Spé",     href: "/coach-bac-spe",     desc: "Suites, fonctions, proba" },
      { icon: "⚡", label: "Calcul rapide",     href: "/calcul-rapide",     desc: "5 min d'automatismes" },
      { icon: "🏆", label: "Concours général",  href: "/concours-general",  desc: "Problèmes avancés" },
      { icon: "🎯", label: "Défis du jour",     href: "/defis-du-jour",     desc: "Maths contextualisés 974" },
      { icon: "🎧", label: "Podcast maths",      href: "/podcast-maths",     desc: "Fractions, pourcentages, probas en audio" },
    ],
  },
  {
    type: "dropdown",
    icon: "📖", label: "Français", cm: true,
    color: "hover:border-sky-400/60 hover:bg-sky-500/20",
    items: [
      { icon: "📖", label: "Coach Français IA", href: "/coach-ia/francais",  desc: "Grammaire, conjugaison, vocabulaire" },
      { icon: "🛤️", label: "Parcours Français", href: "/parcours-francais",  desc: "Bilan de compétences français" },
    ],
  },
  {
    type: "dropdown",
    icon: "🇬🇧", label: "Anglais", cm: true,
    color: "hover:border-blue-400/60 hover:bg-blue-500/20",
    items: [
      { icon: "🇬🇧", label: "Coach English Maths", href: "/coach-ia/english-maths", desc: "A1 → B2, vocabulaire maths en anglais" },
      { icon: "🛤️", label: "Parcours English",      href: "/parcours-english-maths", desc: "Bilan de niveau CECRL avec audio" },
      { icon: "📋", label: "English Maths",          href: "/english-maths",          desc: "Accueil & présentation" },
    ],
  },
  {
    type: "dropdown",
    icon: "💰", label: "Économie", cm: false,
    color: "hover:border-amber-400/60 hover:bg-amber-500/20",
    items: [
      { icon: "💰", label: "Coach Économie",          href: "/coach-ia/economie",                         desc: "Entreprise, marché, travail, fiscalité"  },
      { icon: "🏫", label: "Niveau Collège",          href: "/coach-ia/economie?classe=eco-college",      desc: "4e/3e — fiscalité, élections, marché"   },
      { icon: "🎓", label: "Niveau Lycée",            href: "/coach-ia/economie?classe=eco-lycee",        desc: "Macro-économie, politiques publiques"   },
    ],
  },
];

// ─── Netflix rows ─────────────────────────────────────────────────────────────

const MODULES = [
  { href: "/coach-ia/maths",    image: "/images/cards/coach.webp",           label: "Coach Maths IA",     emoji: "🧠" },
  { href: "/parcours",          image: "/images/cards/parcours.webp",         label: "Parcours",           emoji: "🛤️" },
  { href: "/calcul-rapide",     image: "/images/cards/calcul-rapide.webp",    label: "Calcul rapide",      emoji: "⚡" },
  { href: "/podcast-maths",     image: "/images/cards/lecondujour.webp",      label: "Podcast maths",      emoji: "🎧" },
  { href: "/defis-du-jour",     image: "/images/cards/defis-du-jour.webp",    label: "Défis du jour",      emoji: "🎯" },
  { href: "/concours-general",  image: "/images/cards/concours-general.webp", label: "Concours général",   emoji: "🏆" },
  { href: "/coach-brevet",      image: "/images/cards/coach-brevet.webp",     label: "Coach Brevet",       emoji: "📚" },
  { href: "/coach-bac-spe",     image: "/images/cards/coach-bac-spe.webp",    label: "Coach Bac Spé",      emoji: "🎓" },
  { href: "/english-maths",     image: "/images/cards/english-maths.webp",    label: "English Maths",      emoji: "🇬🇧" },
  { href: "/coach-ia/francais", image: "/images/cards/coach.webp",            label: "Coach Français",     emoji: "📖" },
];



// ─── Progressive chips ────────────────────────────────────────────────────────

type ChipStep = "subjects" | string; // string = subject label

function ProgressiveChips({
  chips,
  getHref,
}: {
  chips: Chip[];
  getHref: (href: string) => string;
}) {
  const [step, setStep] = useState<ChipStep>("subjects");

  const activeChip = chips.find((c) => c.label === step);
  const subItems = activeChip?.type === "dropdown" ? activeChip.items : [];

  return (
    <div className="flex flex-col items-center gap-5">

      {/* Étape 1 — Maths | Français | Anglais (affiché par défaut) */}
      {step === "subjects" && (
        <div className="animate-fade-in flex flex-col items-center gap-4">
          {/* Question au-dessus des chips */}
          <p className="text-3xl font-black text-white sm:text-4xl">
            Que veux-tu travailler aujourd&apos;hui ?
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {chips.map((chip) => (
              <button
                key={chip.label}
                type="button"
                onClick={() => setStep(chip.label)}
                className={[
                  "flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-7 py-4 text-xl font-black text-white backdrop-blur-sm transition-all duration-200 hover:scale-[1.06] hover:border-white/50 hover:bg-white/20",
                  chip.color,
                ].join(" ")}
              >
                <span className="text-3xl">{chip.icon}</span>
                {chip.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Étape 2 — sous-chips de la matière choisie */}
      {step !== "subjects" && (
        <div className="animate-fade-in w-full max-w-xl">
          {/* Retour + titre matière */}
          <div className="mb-4 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setStep("subjects")}
              className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-bold text-white/70 transition hover:bg-white/10 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Retour
            </button>
            <span className="text-lg font-black text-white">
              {activeChip?.icon} {activeChip?.label}
            </span>
          </div>

          {/* Sub-chips */}
          <div className="flex flex-wrap justify-center gap-3">
            {subItems.map((item) => (
              <Link
                key={item.href}
                href={getHref(item.href)}
                className="flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-5 py-3 text-base font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:scale-[1.04] hover:border-white/50 hover:bg-white/20"
              >
                <span className="text-xl">{item.icon}</span>
                <div className="text-left">
                  <p className="text-base font-bold leading-tight">{item.label}</p>
                  <p className="text-xs text-white/50 leading-tight">{item.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}

// ─── Nouveautés ──────────────────────────────────────────────────────────────

const NOUVEAUTES = [
  { icon: "🇬🇧", label: "Coach English Maths", desc: "A1 → B2, vocabulaire & audio", href: "/coach-ia/english-maths", badge: "NEW", color: "from-sky-600 to-blue-700" },
  { icon: "🌍", label: "Géographie & Voyage", desc: "Pays, continents, relief", href: "/coach-ia/english-maths?rubrique=geographie-voyage", badge: "NEW", color: "from-emerald-600 to-teal-700" },
  { icon: "🏠", label: "Vie Quotidienne", desc: "Famille, école, couleurs, alimentation", href: "/coach-ia/english-maths?rubrique=vie-quotidienne", badge: "NEW", color: "from-violet-600 to-purple-700" },
  { icon: "🎧", label: "Parcours English", desc: "Bilan de niveau CECRL avec audio", href: "/parcours-english-maths", badge: "NEW", color: "from-orange-600 to-amber-700" },
  { icon: "🌿", label: "Environnement B1", desc: "Biodiversité, climat, écosystèmes", href: "/coach-ia/english-maths?niveau=b1", badge: "NEW", color: "from-lime-600 to-green-700" },
  { icon: "📊", label: "Géopolitique B2", desc: "Mondialisation, diplomatie, stats", href: "/coach-ia/english-maths?niveau=b2", badge: "NEW", color: "from-rose-600 to-red-700" },
  { icon: "💰", label: "Coach Économie", desc: "Entreprise, marché, élections…",    href: "/coach-ia/economie",               badge: "NEW", color: "from-amber-600 to-yellow-700" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function NetflixRow({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-10">
      <h2 className="mb-3 px-4 text-lg font-black text-white sm:px-6 lg:px-8 lg:text-xl">
        {title}
      </h2>
      <div className="flex gap-3 overflow-x-auto px-4 pb-3 sm:px-6 lg:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {children}
      </div>
    </div>
  );
}

function ModuleCard({ href, image, label }: { href: string; image: string; label: string }) {
  return (
    <Link
      href={href}
      className="group relative h-[110px] w-[190px] shrink-0 overflow-hidden rounded-xl border border-white/10 bg-white/5 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-[1.04] hover:border-white/30 hover:shadow-[0_0_24px_rgba(255,255,255,0.15)] focus:outline-none"
    >
      <Image
        src={image}
        alt={label}
        fill
        sizes="190px"
        className="object-cover transition-transform duration-500 group-hover:scale-[1.08]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
      <span className="absolute bottom-2 left-3 right-3 text-xs font-black text-white drop-shadow-sm">
        {label}
      </span>
      {/* Shimmer */}
      <div className="pointer-events-none absolute -left-20 top-0 h-full w-12 rotate-12 bg-white/20 blur-md transition-transform duration-700 group-hover:translate-x-[400px]" />
    </Link>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function AccueilPage() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { eleve } = useEleve();
  const [isPlaying, setIsPlaying] = useState(false);
  const [chatQuestion, setChatQuestion] = useState("");
  const [chatAnswer, setChatAnswer] = useState(
    "Bonjour, je suis le coach EleveAI. Pose-moi une question courte sur tes révisions."
  );
  const [chatLoading, setChatLoading] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  const codeEtablissement = eleve?.code_etablissement?.trim() ?? "";
  const codeUtilisateur = eleve?.code_eleve?.trim() ?? "";
  const canAskAccueilQuestion = Boolean(codeEtablissement && codeUtilisateur);
  const eleveClasse = eleve?.classe?.toLowerCase() ?? null;
  const prenom = eleve?.nom ?? null;
  const isCmPrimary = eleveClasse === "cm1" || eleveClasse === "cm2";

  const visibleModules = isCmPrimary
    ? MODULES.filter(m => !["/concours-general", "/coach-brevet", "/coach-bac-spe"].includes(m.href))
    : MODULES;

  const visibleChips = isCmPrimary
    ? CHIPS.filter(c => c.cm).map(c =>
        c.type === "dropdown"
          ? { ...c, items: c.items.filter(i => !["/coach-brevet", "/coach-bac-spe", "/concours-general"].includes(i.href)) }
          : c
      )
    : CHIPS;

  function getHref(href: string) {
    if (!isCmPrimary) return href;
    if (href === "/coach-ia/maths")    return `/coach-ia/maths?classe=${eleveClasse}`;
    if (href === "/coach-ia/francais") return `/coach-ia/francais?classe=${eleveClasse}`;
    return href;
  }

  async function toggleAudio() {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) { audio.pause(); audio.currentTime = 0; return; }
    try { audio.currentTime = 0; await audio.play(); }
    catch { /* ignore */ }
  }

  async function sendAccueilQuestion(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = chatQuestion.trim();
    if (!trimmed || !canAskAccueilQuestion) return;
    setChatLoading(true);
    setChatAnswer("Je réfléchis…");
    try {
      const res = await fetch("/api/accueil/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ codeEtablissement, codeUtilisateur, studentQuestion: trimmed }),
      });
      const data = (await res.json().catch(() => ({}))) as { answer?: string; error?: string };
      if (!res.ok || !data.answer) throw new Error(data.error ?? "Réponse indisponible.");
      setChatAnswer(data.answer);
      setChatQuestion("");
    } catch {
      setChatAnswer("Je n'arrive pas à répondre pour le moment. Essaie depuis Parcours après une correction.");
    } finally {
      setChatLoading(false);
    }
  }

  // ── Greeting ────────────────────────────────────────────────────────────────
  function getGreeting() {
    const h = new Date().getHours();
    if (h < 12) return "Bonjour";
    if (h < 18) return "Bon après-midi";
    return "Bonsoir";
  }

  return (
    <main className="min-h-screen bg-[#041B33] text-white">

      <h1 className="sr-only">EleveAI – Coach IA maths, français et anglais. Du CP au Bac.</h1>

      {/* ── HERO — ChatGPT style ──────────────────────────────────────────── */}
      <section className="relative flex min-h-[52vh] flex-col items-center justify-center px-4 py-16 text-center sm:px-6 lg:px-8">

        {/* Background — image floue + gradient fort */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src="/images/accueil-eleveai-reunion.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-20 blur-sm"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#041B33]/60 via-[#041B33]/50 to-[#041B33]" />
        </div>

        {/* Audio */}
        <audio
          ref={audioRef}
          src="/audio/accueil/presentation.mp3"
          preload="none"
          onEnded={() => setIsPlaying(false)}
          onPause={() => setIsPlaying(false)}
          onPlay={() => setIsPlaying(true)}
        />

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-3xl">

          {/* Motivational pill */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-500/40 bg-orange-500/15 px-4 py-1.5 text-sm font-bold text-orange-300">
            <span className="h-2 w-2 animate-pulse rounded-full bg-orange-400" />
            🔥 T&apos;as 5 min ? Lance-toi !
          </div>

          {/* Greeting */}
          <p className="mb-2 text-lg font-semibold text-white/60">
            {getGreeting()}{prenom ? `, ${prenom}` : ""} 👋
          </p>

          {/* Progressive chips */}
          <ProgressiveChips chips={visibleChips} getHref={getHref} />

        </div>
      </section>

      {/* ── NETFLIX ROWS ─────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-[1400px] pt-4 pb-16">

        {/* Row 1 — Outils */}
        <NetflixRow title="🔥 Nos coups de cœur pour toi">
          {visibleModules.map((m) => (
            <ModuleCard key={m.href} href={getHref(m.href)} image={m.image} label={m.label} />
          ))}
        </NetflixRow>

        {/* Row 2 — Nouveautés */}
        <NetflixRow title="✨ Nos nouveautés">
          {NOUVEAUTES.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="group relative flex h-[110px] w-[200px] shrink-0 flex-col justify-between overflow-hidden rounded-xl border border-white/10 p-4 transition-all hover:-translate-y-1 hover:border-white/30 hover:shadow-lg focus:outline-none"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${n.color} opacity-80 transition-opacity group-hover:opacity-100`} />
              <div className="relative z-10 flex items-start justify-between">
                <span className="text-2xl">{n.icon}</span>
                <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-black tracking-wider text-white">
                  {n.badge}
                </span>
              </div>
              <div className="relative z-10">
                <p className="text-sm font-black text-white leading-tight">{n.label}</p>
                <p className="mt-0.5 text-[11px] leading-tight text-white/70">{n.desc}</p>
              </div>
            </Link>
          ))}
        </NetflixRow>

      </div>

      {/* ── FEATURED — Banner contextuel selon niveau ────────────────────── */}
      <section className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {eleveClasse === "3e" || eleveClasse === "4e" ? (
            <Link href="/coach-brevet" className="group relative block h-[240px] overflow-hidden rounded-2xl shadow-2xl sm:h-[300px] lg:h-[340px]">
              <Image src="/images/defis-du-jour/piton-fournaise.webp" alt="Sprint Brevet" fill sizes="(max-width: 1200px) 100vw, 1200px" className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 sm:p-8 lg:p-10">
                <span className="mb-3 inline-block rounded-full bg-emerald-500 px-3 py-1 text-[11px] font-black uppercase tracking-[0.2em] text-white">🎯 Sprint Brevet · J−{jours}</span>
                <h3 className="text-2xl font-black leading-tight text-white sm:text-3xl lg:text-4xl">{jours} jours pour décrocher ton brevet</h3>
                <p className="mt-2 max-w-lg text-sm text-white/75 sm:text-base">Fractions, Pythagore, probabilités, équations, Thalès… notion par notion jusqu&apos;au jour J.</p>
                <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-black text-white transition-all group-hover:bg-emerald-400 group-hover:gap-3">Commencer le sprint <span className="transition-transform group-hover:translate-x-1">→</span></div>
              </div>
              <div className="absolute right-6 top-6 rounded-xl border border-white/20 bg-black/60 px-4 py-2 text-center backdrop-blur-sm">
                <p className="text-[10px] font-bold uppercase tracking-wider text-white/60">Compte à rebours</p>
                <p className="text-3xl font-black text-white">J−{jours}</p>
              </div>
            </Link>
          ) : (
            <Link href="/defis-du-jour" className="group relative block h-[240px] overflow-hidden rounded-2xl shadow-2xl sm:h-[300px] lg:h-[340px]">
              <Image src="/images/defis-du-jour/piton-fournaise.webp" alt="Défi du jour" fill sizes="(max-width: 1200px) 100vw, 1200px" className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 sm:p-8 lg:p-10">
                <span className="mb-3 inline-block rounded-full bg-orange-500 px-3 py-1 text-[11px] font-black uppercase tracking-[0.2em] text-white">🎯 Défi du jour</span>
                <h3 className="text-2xl font-black leading-tight text-white sm:text-3xl lg:text-4xl">Le Piton de la Fournaise en chiffres</h3>
                <p className="mt-2 max-w-lg text-sm text-white/75 sm:text-base">Altitude, coulées de lave, volume émis… 7 défis maths inspirés du volcan le plus actif de France.</p>
                <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-orange-500 px-5 py-2.5 text-sm font-black text-white transition-all group-hover:bg-orange-400 group-hover:gap-3">Relever le défi <span className="transition-transform group-hover:translate-x-1">→</span></div>
              </div>
              <div className="absolute right-6 top-6 rounded-xl border border-white/20 bg-black/60 px-4 py-2 text-center backdrop-blur-sm">
                <p className="text-[10px] font-bold uppercase tracking-wider text-white/60">Aujourd&apos;hui</p>
                <p className="text-2xl font-black text-white">🌋</p>
                <p className="text-[10px] font-bold text-white/60">7 défis</p>
              </div>
            </Link>
          )}
        </div>
      </section>

      {/* ── GOOGLE FOLLOW ────────────────────────────────────────────────── */}
      <div className="flex justify-center py-8">
        <GoogleFollowChip />
      </div>

      {/* ── COACH FLOTTANT ────────────────────────────────────────────────── */}
      <AccueilCoachBox
        open={chatOpen}
        canAsk={canAskAccueilQuestion}
        question={chatQuestion}
        answer={chatAnswer}
        loading={chatLoading}
        onOpen={() => setChatOpen(true)}
        onClose={() => setChatOpen(false)}
        onQuestionChange={setChatQuestion}
        onSend={sendAccueilQuestion}
      />

    </main>
  );
}

// ─── Coach Box ────────────────────────────────────────────────────────────────

function AccueilCoachBox({
  open, canAsk, question, answer, loading,
  onOpen, onClose, onQuestionChange, onSend,
}: {
  open: boolean; canAsk: boolean; question: string; answer: string;
  loading: boolean; onOpen: () => void; onClose: () => void;
  onQuestionChange: (v: string) => void; onSend: (e: FormEvent<HTMLFormElement>) => void;
}) {
  if (!open) {
    return (
      <button
        type="button"
        onClick={onOpen}
        className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 via-emerald-500 to-orange-400 px-5 py-3 text-sm font-black text-white shadow-2xl ring-2 ring-white/50 transition hover:scale-105"
      >
        🤖 <span className="hidden sm:inline">Coach IA</span>
      </button>
    );
  }

  return (
    <aside className="fixed bottom-5 right-5 z-50 flex h-[340px] w-[300px] flex-col overflow-hidden rounded-3xl border border-cyan-200/30 bg-[#05213f] text-white shadow-2xl sm:h-[480px] sm:w-[340px]">
      <div className="flex items-center justify-between bg-gradient-to-br from-cyan-500 via-emerald-500 to-orange-400 px-5 py-4">
        <div>
          <p className="font-black text-white">🤖 Coach EleveAI</p>
          <p className="text-[11px] font-bold text-white/80">Pose ta question</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full bg-white/20 px-3 py-1 text-xs font-black text-white hover:bg-white/30"
        >
          ✕
        </button>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto p-4">
        {canAsk ? (
          <div className="rounded-2xl bg-white/10 px-4 py-3 text-sm font-semibold leading-relaxed text-white/90">
            {answer}
          </div>
        ) : (
          <div className="flex h-full items-center text-center">
            <p className="text-sm font-semibold leading-relaxed text-white/70">
              Connecte-toi pour dialoguer avec le coach IA.
            </p>
          </div>
        )}
      </div>

      {canAsk ? (
        <form onSubmit={onSend} className="border-t border-white/10 p-3">
          <textarea
            value={question}
            onChange={(e) => onQuestionChange(e.target.value)}
            placeholder="Ta question…"
            rows={2}
            disabled={loading}
            className="h-16 w-full resize-none rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-sm font-semibold text-white placeholder-white/40 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/30 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!question.trim() || loading}
            className="mt-2 w-full rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 py-2.5 text-sm font-black text-white transition hover:from-cyan-400 hover:to-emerald-400 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {loading ? "Envoi…" : "Envoyer"}
          </button>
        </form>
      ) : (
        <div className="p-3">
          <Link
            href="/auth/signin?mode=eleve"
            className="block rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 py-3 text-center text-sm font-black text-white transition hover:from-cyan-400 hover:to-emerald-400"
          >
            Connexion / inscription
          </Link>
        </div>
      )}
    </aside>
  );
}
