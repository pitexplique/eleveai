"use client";

import { FormEvent, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useEleve } from "@/context/EleveContext";
import GoogleFollowChip from "@/components/GoogleFollowChip";

// ─── Constants ────────────────────────────────────────────────────────────────

const BREVET_DATE = new Date("2026-06-27T08:00:00");
function joursAvantBrevet() {
  const diff = BREVET_DATE.getTime() - Date.now();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}
const jours = joursAvantBrevet();

// ─── Subject cards ────────────────────────────────────────────────────────────

const SUBJECTS = [
  {
    icon: "🧮",
    label: "Maths",
    desc: "Calculer, raisonner, prouver",
    href: "/coach-ia/maths",
    bg: "from-cyan-500 to-blue-600",
    border: "border-cyan-400/50",
    glow: "group-hover:shadow-cyan-500/40",
    cm: true,
  },
  {
    icon: "📖",
    label: "Français",
    desc: "Lire, comprendre, s'exprimer",
    href: "/coach-ia/francais",
    bg: "from-emerald-500 to-green-700",
    border: "border-emerald-400/50",
    glow: "group-hover:shadow-emerald-500/40",
    cm: true,
  },
  {
    icon: "🇬🇧",
    label: "Anglais",
    desc: "Comprendre, parler, progresser",
    href: "/coach-ia/english-maths",
    bg: "from-blue-500 to-indigo-700",
    border: "border-blue-400/50",
    glow: "group-hover:shadow-blue-500/40",
    cm: true,
  },
  {
    icon: "🇪🇸",
    label: "Espagnol",
    desc: "Comprendre, parler, découvrir",
    href: "/coach-ia/espagnol",
    bg: "from-red-500 to-rose-700",
    border: "border-red-400/50",
    glow: "group-hover:shadow-red-500/40",
    cm: false,
  },
  {
    icon: "🔬",
    label: "Sciences",
    desc: "Observer, comprendre, expérimenter",
    href: "/coach-ia/maths",
    bg: "from-violet-500 to-purple-700",
    border: "border-violet-400/50",
    glow: "group-hover:shadow-violet-500/40",
    cm: false,
    soon: true,
  },
  {
    icon: "📊",
    label: "Économie",
    desc: "Comprendre le monde économique",
    href: "/coach-ia/economie",
    bg: "from-amber-500 to-orange-600",
    border: "border-amber-400/50",
    glow: "group-hover:shadow-amber-500/40",
    cm: false,
  },
];

// ─── Bottom features bar ──────────────────────────────────────────────────────

const FEATURES = [
  { icon: "📚", label: "Leçons",     desc: "Cours clairs et illustrés",         href: "/coach-ia/maths"     },
  { icon: "✏️", label: "Exercices",  desc: "Entraîne-toi à ton rythme",         href: "/parcours"           },
  { icon: "🛤️", label: "Parcours",   desc: "Un chemin personnalisé",            href: "/parcours"           },
  { icon: "🏆", label: "Défis",      desc: "Relève des défis chaque jour",      href: "/defis-du-jour"      },
  { icon: "🤖", label: "Coach IA",   desc: "Ton assistant intelligent 24/7",    href: "#coach"              },
];

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
  const codeUtilisateur   = eleve?.code_eleve?.trim()        ?? "";
  const canAskAccueilQuestion = Boolean(codeEtablissement && codeUtilisateur);
  const eleveClasse = eleve?.classe?.toLowerCase() ?? null;
  const prenom      = eleve?.nom ?? null;
  const isCmPrimary = eleveClasse === "cm1" || eleveClasse === "cm2";

  function getHref(href: string) {
    if (!isCmPrimary) return href;
    if (href === "/coach-ia/maths")    return `/coach-ia/maths?classe=${eleveClasse}`;
    if (href === "/coach-ia/francais") return `/coach-ia/francais?classe=${eleveClasse}`;
    return href;
  }

  const visibleSubjects = isCmPrimary ? SUBJECTS.filter(s => s.cm) : SUBJECTS;

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

  function getGreeting() {
    const h = new Date().getHours();
    if (h < 12) return "Bonjour";
    if (h < 18) return "Bon après-midi";
    return "Bonsoir";
  }

  return (
    <main className="min-h-screen bg-[#041B33] text-white overflow-x-hidden">

      <h1 className="sr-only">EleveAI – Coach IA maths, français, anglais et espagnol. Du CP au Bac.</h1>

      <audio
        ref={audioRef}
        src="/audio/accueil/presentation.mp3"
        preload="none"
        onEnded={() => setIsPlaying(false)}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
      />

      {/* ── HERO ────────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col">

        {/* Background image — pleine visibilité */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/accueil-eleveai-reunion.webp"
            alt="EleveAI – Comprendre, S'entraîner, Réussir"
            fill
            priority
            sizes="100vw"
            className="object-cover object-top"
          />
          {/* Gradient sombre sur le bas pour lire les cards */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-[#041B33]" />
          {/* Gradient latéral léger */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#041B33]/30 via-transparent to-[#041B33]/30" />
        </div>

        {/* Contenu du hero */}
        <div className="relative z-10 flex flex-col items-center pt-8 pb-4 px-4 sm:px-6 lg:px-8">

          {/* Badge niveau */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-black/50 border border-white/20 px-5 py-2 text-sm font-black text-white backdrop-blur-sm">
            🎓 CP à Terminale
          </div>

          {/* Greeting personnalisé */}
          {prenom && (
            <p className="text-lg font-semibold text-white/80 mb-1 drop-shadow-lg">
              {getGreeting()}, {prenom} 👋
            </p>
          )}

          {/* Tagline */}
          <p className="text-center text-base font-semibold text-white/70 drop-shadow mb-1">
            Comprendre &bull; S&apos;entraîner &bull; Réussir
          </p>

          {/* Brevet countdown si 3e/4e */}
          {(eleveClasse === "3e" || eleveClasse === "4e") && (
            <Link
              href="/coach-brevet"
              className="mt-3 inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-2 text-sm font-black text-white shadow-lg transition hover:bg-emerald-400 hover:scale-105"
            >
              🎯 Sprint Brevet · J−{jours} → Commencer
            </Link>
          )}
        </div>

        {/* ── SUBJECT CARDS ───────────────────────────────────────────────── */}
        <div className="relative z-10 flex-1 flex items-end pb-16 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-5xl mx-auto">

            {/* Question */}
            <p className="text-center text-xl font-black text-white mb-5 drop-shadow-lg">
              Que veux-tu travailler aujourd&apos;hui ?
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
              {visibleSubjects.map((subject) => (
                <Link
                  key={subject.label}
                  href={subject.soon ? "#" : getHref(subject.href)}
                  className={[
                    "group relative flex flex-col items-center justify-center gap-2 rounded-2xl border p-4 sm:p-5 text-center",
                    "bg-black/40 backdrop-blur-md transition-all duration-300",
                    "hover:-translate-y-2 hover:scale-105",
                    `hover:shadow-2xl ${subject.glow}`,
                    subject.border,
                    subject.soon ? "opacity-70 cursor-not-allowed" : "",
                  ].join(" ")}
                >
                  {/* Gradient bg on hover */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${subject.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                  {/* Soon badge */}
                  {subject.soon && (
                    <span className="absolute -top-2 -right-2 z-20 rounded-full bg-amber-500 px-2 py-0.5 text-[9px] font-black text-white">
                      Bientôt
                    </span>
                  )}

                  <span className="relative z-10 text-3xl sm:text-4xl drop-shadow-lg">
                    {subject.icon}
                  </span>
                  <div className="relative z-10">
                    <p className="text-sm sm:text-base font-black text-white leading-tight">
                      {subject.label}
                    </p>
                    <p className="mt-0.5 text-[10px] sm:text-xs text-white/70 leading-tight hidden sm:block">
                      {subject.desc}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── FEATURES BAR ─────────────────────────────────────────────────────── */}
      <section className="bg-[#071f3a] border-t border-white/10 px-4 py-5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
            {FEATURES.map((f) => (
              <Link
                key={f.label}
                href={f.href}
                className="group flex flex-col items-center gap-1.5 rounded-2xl border border-white/10 bg-white/5 px-3 py-4 text-center transition-all hover:bg-white/10 hover:border-white/25 hover:-translate-y-1"
              >
                <span className="text-2xl group-hover:scale-110 transition-transform">{f.icon}</span>
                <p className="text-xs font-black text-white">{f.label}</p>
                <p className="text-[10px] text-white/50 leading-tight hidden sm:block">{f.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── NOUVEAUTÉS ───────────────────────────────────────────────────────── */}
      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-lg font-black text-white mb-4">✨ Nouveautés</h2>
          <div className="flex gap-3 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {[
              { icon: "🇪🇸", label: "Coach Espagnol",     desc: "A1 → B2, vocabulaire & audio",          href: "/coach-ia/espagnol",           color: "from-red-600 to-rose-800"     },
              { icon: "🇬🇧", label: "Coach English",       desc: "A1 → B2, vocabulaire maths en anglais",  href: "/coach-ia/english-maths",       color: "from-sky-600 to-blue-800"     },
              { icon: "🎧", label: "Parcours English",     desc: "Bilan de niveau CECRL avec audio",        href: "/parcours-english-maths",       color: "from-orange-600 to-amber-700" },
              { icon: "💰", label: "Coach Économie",       desc: "Entreprise, marché, élections…",          href: "/coach-ia/economie",            color: "from-amber-600 to-yellow-700" },
              { icon: "🎯", label: "Défis du jour",        desc: "Maths contextualisés 974",                href: "/defis-du-jour",                color: "from-emerald-600 to-teal-700" },
              { icon: "🌿", label: "Environnement B1",     desc: "Biodiversité, climat, écosystèmes",       href: "/coach-ia/english-maths?niveau=b1", color: "from-lime-600 to-green-700" },
            ].map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="group relative flex h-[110px] w-[190px] shrink-0 flex-col justify-between overflow-hidden rounded-xl border border-white/10 p-4 transition-all hover:-translate-y-1 hover:border-white/30 hover:shadow-lg"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${n.color} opacity-80 transition-opacity group-hover:opacity-100`} />
                <div className="relative z-10 flex items-start justify-between">
                  <span className="text-2xl">{n.icon}</span>
                  <span className="rounded-full bg-white/20 px-2 py-0.5 text-[9px] font-black tracking-wider text-white">NEW</span>
                </div>
                <div className="relative z-10">
                  <p className="text-sm font-black text-white leading-tight">{n.label}</p>
                  <p className="mt-0.5 text-[11px] leading-tight text-white/70">{n.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED BANNER ──────────────────────────────────────────────────── */}
      <section className="px-4 pb-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          {eleveClasse === "3e" || eleveClasse === "4e" ? (
            <Link href="/coach-brevet" className="group relative block h-[220px] overflow-hidden rounded-2xl shadow-2xl sm:h-[280px]">
              <Image src="/images/defis-du-jour/piton-fournaise.webp" alt="Sprint Brevet" fill sizes="(max-width: 1200px) 100vw, 1200px" className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 sm:p-8">
                <span className="mb-3 inline-block rounded-full bg-emerald-500 px-3 py-1 text-[11px] font-black uppercase tracking-[0.2em] text-white">🎯 Sprint Brevet · J−{jours}</span>
                <h3 className="text-2xl font-black leading-tight text-white sm:text-3xl">{jours} jours pour décrocher ton brevet</h3>
                <p className="mt-2 max-w-lg text-sm text-white/75">Fractions, Pythagore, probabilités, équations, Thalès… notion par notion jusqu&apos;au jour J.</p>
                <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-black text-white transition-all group-hover:bg-emerald-400 group-hover:gap-3">Commencer le sprint <span className="transition-transform group-hover:translate-x-1">→</span></div>
              </div>
              <div className="absolute right-6 top-6 rounded-xl border border-white/20 bg-black/60 px-4 py-2 text-center backdrop-blur-sm">
                <p className="text-[10px] font-bold uppercase tracking-wider text-white/60">Compte à rebours</p>
                <p className="text-3xl font-black text-white">J−{jours}</p>
              </div>
            </Link>
          ) : (
            <Link href="/defis-du-jour" className="group relative block h-[220px] overflow-hidden rounded-2xl shadow-2xl sm:h-[280px]">
              <Image src="/images/defis-du-jour/piton-fournaise.webp" alt="Défi du jour" fill sizes="(max-width: 1200px) 100vw, 1200px" className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 sm:p-8">
                <span className="mb-3 inline-block rounded-full bg-orange-500 px-3 py-1 text-[11px] font-black uppercase tracking-[0.2em] text-white">🎯 Défi du jour</span>
                <h3 className="text-2xl font-black leading-tight text-white sm:text-3xl">Le Piton de la Fournaise en chiffres</h3>
                <p className="mt-2 max-w-lg text-sm text-white/75">Altitude, coulées de lave, volume émis… 7 défis maths inspirés du volcan le plus actif de France.</p>
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

      {/* ── GOOGLE FOLLOW ────────────────────────────────────────────────────── */}
      <div className="flex justify-center py-8">
        <GoogleFollowChip />
      </div>

      {/* ── COACH FLOTTANT ───────────────────────────────────────────────────── */}
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
