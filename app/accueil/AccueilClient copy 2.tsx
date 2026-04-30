"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const HEADER_HEIGHT = 72;

const cards = [
  {
    href: "/calcul-rapide",
    image: "/images/cards/calcul-rapide.png",
    label: "Jouer",
  },
  {
    href: "/coach-maths-ia",
    image: "/images/cards/coach.png",
    label: "S'entraîner",
  },
  {
    href: "/optimiseur",
    image: "/images/cards/valeria.png",
    label: "Valéria",
  },
];

export default function AccueilPage() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => setOffset(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="relative min-h-[120vh] overflow-hidden bg-slate-950 text-white">

      {/* =========================
         🌄 FOND PARALLAX
      ========================= */}
      <div
        className="fixed inset-x-0 bottom-0 -z-10"
        style={{
          top: `${HEADER_HEIGHT}px`,
          transform: `translateY(${offset * 0.25}px)`,
        }}
      >
        <Image
          src="/images/accueil-eleveai-reunion.png"
          alt="EleveAI Réunion"
          fill
          priority
          sizes="100vw"
          className="object-cover object-top"
        />
      </div>

      {/* VOILE POUR LISIBILITÉ */}
      <div
        className="fixed inset-x-0 bottom-0 -z-10 bg-gradient-to-b from-black/0 via-black/10 to-black/40"
        style={{ top: `${HEADER_HEIGHT}px` }}
      />

      {/* =========================
         🧠 CONTENU
      ========================= */}
      <section
        className="relative flex items-end px-4 pb-6"
        style={{
          minHeight: `calc(100vh - ${HEADER_HEIGHT}px)`,
        }}
      >
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-5">

          {/* =========================
             🔥 DÉFI DU JOUR
          ========================= */}
          <div className="w-full max-w-xl rounded-[2rem] border border-white/50 bg-white/90 px-6 py-6 text-center shadow-2xl backdrop-blur-md">
            <p className="text-sm font-extrabold uppercase tracking-wide text-emerald-700">
              🔥 Défi du jour
            </p>

            <h1 className="mt-1 text-2xl font-black text-slate-900 sm:text-3xl">
              Prêt à jouer ?
            </h1>

            <p className="mt-2 text-sm font-semibold text-slate-700">
              ⏱ 1 minute · 7 questions
            </p>

            <Link
              href="/calcul-rapide"
              className="mt-4 inline-flex items-center justify-center rounded-2xl bg-emerald-500 px-8 py-3 text-base font-black text-white shadow-lg transition hover:-translate-y-1 hover:bg-emerald-600"
            >
              🚀 COMMENCER
            </Link>

            <div className="mt-4 flex flex-wrap justify-center gap-2 text-xs font-bold text-slate-700">
              <span className="rounded-full bg-emerald-100 px-3 py-1">
                ⭐ Niveau 6
              </span>
              <span className="rounded-full bg-orange-100 px-3 py-1">
                🔥 Série 3 jours
              </span>
              <span className="rounded-full bg-yellow-100 px-3 py-1">
                🏆 245 pts
              </span>
            </div>
          </div>

          {/* =========================
             🎯 OBJECTIF
          ========================= */}
          <div className="w-full max-w-xl rounded-3xl border border-white/40 bg-white/80 px-5 py-4 shadow-xl backdrop-blur-md">
            <h2 className="text-base font-black text-slate-900">
              🎯 Objectif du jour
            </h2>

            <div className="mt-2 grid gap-2 text-sm font-semibold text-slate-700 sm:grid-cols-3">
              <div className="rounded-xl bg-white px-3 py-2">
                ✔ 2 séries
              </div>
              <div className="rounded-xl bg-white px-3 py-2">
                ✔ 1 défi
              </div>
              <div className="rounded-xl bg-white px-3 py-2">
                ✔ +10 pts
              </div>
            </div>
          </div>

          {/* =========================
             🎮 CARTES
          ========================= */}
          <div className="flex w-full flex-wrap justify-center gap-4 sm:gap-6">
            {cards.map((card, index) => (
              <Link
                key={index}
                href={card.href}
                aria-label={card.label}
                className="
                  group relative h-[115px] w-[220px]
                  overflow-hidden rounded-3xl
                  border border-white/50
                  shadow-xl transition-all duration-300
                  hover:-translate-y-2 hover:scale-[1.05]
                  hover:shadow-[0_0_30px_rgba(255,255,255,0.45)]
                  focus:outline-none focus:ring-4 focus:ring-white/70
                "
              >
                <Image
                  src={card.image}
                  alt={card.label}
                  fill
                  sizes="220px"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                />

                <div className="pointer-events-none absolute -left-20 top-0 h-full w-16 rotate-12 bg-white/30 blur-md transition-transform duration-700 group-hover:translate-x-[300px]" />
              </Link>
            ))}
          </div>

          {/* =========================
             📈 PROGRESSION
          ========================= */}
          <div className="w-full max-w-xl rounded-3xl border border-white/40 bg-slate-900/70 px-5 py-4 text-white shadow-xl backdrop-blur-md">
            <h2 className="text-base font-black">📈 Ta progression</h2>

            <div className="mt-3 space-y-3">
              <Progress label="Calcul mental" value={60} />
              <Progress label="Fractions" value={40} />
              <Progress label="Proportionnalité" value={25} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

/* =========================
   📊 BARRE PROGRESSION
========================= */
function Progress({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-xs font-bold">
        <span>{label}</span>
        <span>{value}%</span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-white/20">
        <div
          className="h-full rounded-full bg-emerald-400"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}