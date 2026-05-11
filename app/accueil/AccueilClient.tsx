"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const HEADER_HEIGHT = 72;

const cards = [
  { href: "/coach-maths-ia", image: "/images/cards/coach.png" },
  { href: "/parcours", image: "/images/cards/parcours.png" },
  { href: "/calcul-rapide", image: "/images/cards/calcul-rapide.png" },
  { href: "/lecon-du-jour", image: "/images/cards/lecondujour.png" },
  { href: "/probleme-du-jour", image: "/images/cards/probleme-du-jour.png" },
];

export default function AccueilPage() {
  const [offset, setOffset] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => setOffset(window.scrollY);

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();

    window.addEventListener("resize", checkMobile);
    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const backgroundImage = isMobile
    ? "/images/accueil-eleveai-reunion-mobile.png"
    : "/images/accueil-eleveai-reunion.png";

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
          src={backgroundImage}
          alt="EleveAI Réunion"
          fill
          priority
          sizes="100vw"
          className="
            object-cover
            object-center
            sm:object-top
          "
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/10 sm:bg-black/5" />
      </div>

      {/* CONTENU */}
      <section
        className="relative flex justify-center"
        style={{
          minHeight: `calc(100vh - ${HEADER_HEIGHT}px)`,
        }}
      >
        {/* CARDS */}
<div
  className="
    mt-[30vh]
    grid grid-cols-2
    gap-3 px-4
    sm:mt-[50vh]
    sm:flex sm:max-w-6xl sm:flex-wrap sm:justify-center sm:gap-6
  "
>
          {cards.map((card, index) => (
            <Link
              key={index}
              href={card.href}
              className="
                group relative
                h-[92px] w-[176px]
                sm:h-[115px] sm:w-[220px]
                overflow-hidden rounded-3xl
                border border-white/40
                shadow-xl transition-all duration-300
                hover:-translate-y-2 hover:scale-[1.05]
                hover:shadow-[0_0_30px_rgba(255,255,255,0.35)]
                focus:outline-none focus:ring-4 focus:ring-white/70
              "
            >
              <Image
                src={card.image}
                alt=""
                fill
                sizes="(max-width: 640px) 176px, 220px"
                className="
                  object-cover
                  transition-transform duration-500
                  group-hover:scale-[1.05]
                "
              />

              {/* EFFET LUMIÈRE */}
              <div
                className="
                  pointer-events-none absolute -left-20 top-0
                  h-full w-16 rotate-12 bg-white/30 blur-md
                  transition-transform duration-700
                  group-hover:translate-x-[300px]
                "
              />
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}