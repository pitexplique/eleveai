"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const HEADER_HEIGHT = 72;

const cards = [
  { href: "/coach-maths-ia", image: "/images/cards/coach.png" },
  { href: "/calcul-rapide", image: "/images/cards/calcul-rapide.png" },
  { href: "/optimiseur", image: "/images/cards/valeria.png" },
  { href: "/lecon-du-jour", image: "/images/cards/lecondujour.png" },
];

export default function AccueilPage() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => setOffset(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="relative min-h-[120vh] overflow-hidden">
      {/* IMAGE DE FOND (PARALLAX) */}
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