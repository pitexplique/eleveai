"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const HEADER_HEIGHT = 72;

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
    <main className="relative min-h-screen overflow-hidden">
      
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
        <div className="absolute inset-0 bg-black/15 sm:bg-black/10" />
      </div>

      {/* CONTENU */}
      <section
        className="relative flex items-start justify-center px-4"
        style={{
          minHeight: `calc(100vh - ${HEADER_HEIGHT}px)`,
        }}
      >
        <div className="mt-10 flex max-w-2xl flex-col items-center text-center">
          
          {/* MARGOUILLAT */}
          <div className="mb-4 text-7xl drop-shadow-2xl sm:text-8xl">
            🦎
          </div>

          {/* PHRASE */}
          <h1
            className="
              rounded-3xl
              bg-black/35
              px-6 py-4
              text-2xl font-black
              text-white
              backdrop-blur-sm
              sm:text-4xl
            "
          >
            Apprendre autrement.
            <br />
            Avancer chaque jour.
          </h1>

        </div>
      </section>
    </main>
  );
}