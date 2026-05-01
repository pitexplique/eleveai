"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { X, Smartphone, BookOpen, Sparkles } from "lucide-react";

const HEADER_HEIGHT = 72;

const cards = [
  { href: "/coach-maths-ia", image: "/images/cards/coach.png" },
  { href: "/calcul-rapide", image: "/images/cards/calcul-rapide.png" },
  { href: "/optimiseur", image: "/images/cards/valeria.png" },
  { href: "/lecon-du-jour", image: "/images/cards/lecondujour.png" },
];

const MODAL_KEY = "eleveai_home_modal_lecon_seen_daily_v1";

export default function AccueilPage() {
  const [offset, setOffset] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setOffset(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    try {
      const today = new Date().toDateString();
      const lastSeen = localStorage.getItem(MODAL_KEY);

      if (lastSeen !== today) {
        setModalOpen(true);
      }
    } catch {
      setModalOpen(true);
    }
  }, []);

  function closeModal() {
    setModalOpen(false);

    try {
      const today = new Date().toDateString();
      localStorage.setItem(MODAL_KEY, today);
    } catch {}
  }

  return (
    <main className="relative min-h-[120vh] overflow-hidden">
      {/* IMAGE DE FOND */}
      <div
        className="fixed bottom-0 left-0 right-0 top-[72px] -z-10"
        style={{
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

      {/* MODAL INSTALLATION */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-4 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-3xl border border-white/20 bg-white p-6 text-slate-900 shadow-2xl">
            <button
              type="button"
              onClick={closeModal}
              className="absolute right-4 top-4 rounded-full p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
              aria-label="Fermer"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white">
                <Sparkles className="h-6 w-6" />
              </div>

              <div>
                <h2 className="text-xl font-black">EleveAI sur ton téléphone</h2>
                <p className="text-sm text-slate-600">
                  Une leçon de maths par jour, en 1 clic.
                </p>
              </div>
            </div>

            <div className="rounded-2xl bg-blue-50 p-4">
              <p className="mb-2 flex items-center gap-2 font-bold text-blue-900">
                <Smartphone className="h-5 w-5" />
                Installe EleveAI comme une application
              </p>

              <p className="text-sm leading-relaxed text-slate-700">
                Sur iPhone : Safari → Partager → Ajouter à l’écran d’accueil.
                <br />
                Sur Android : Chrome → ⋮ → Ajouter à l’écran d’accueil.
              </p>
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/lecon-du-jour"
                onClick={closeModal}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-yellow-400 px-4 py-3 text-sm font-black text-slate-950 shadow hover:bg-yellow-300"
              >
                <BookOpen className="h-5 w-5" />
                Leçon du jour
              </Link>

              <button
                type="button"
                onClick={closeModal}
                className="inline-flex flex-1 items-center justify-center rounded-2xl border border-slate-300 px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50"
              >
                Continuer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CONTENU */}
      <section
        className="relative flex items-end pb-4 sm:pb-0"
        style={{
          minHeight: `calc(100vh - ${HEADER_HEIGHT}px)`,
        }}
      >
        <div className="mx-auto flex max-w-6xl translate-y-1 flex-wrap justify-center gap-4 px-4 sm:gap-6">
          {cards.map((card, index) => (
            <Link
              key={index}
              href={card.href}
              className="
                group relative h-[115px] w-[220px]
                overflow-hidden rounded-3xl
                border border-white/40
                shadow-lg transition-all duration-300
                hover:-translate-y-2 hover:scale-[1.05]
                hover:shadow-[0_0_30px_rgba(255,255,255,0.35)]
                focus:outline-none focus:ring-4 focus:ring-white/70
              "
            >
              <Image
                src={card.image}
                alt=""
                fill
                sizes="220px"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
              />

              <div className="pointer-events-none absolute -left-20 top-0 h-full w-16 rotate-12 bg-white/30 blur-md transition-transform duration-700 group-hover:translate-x-[300px]" />
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}