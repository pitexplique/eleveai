// The English simulators hub — the counterpart of /simulateurs, listing the
// machines that already have an English version (grows with each translation).
// Same card component as the French hub; French/English hubs link to each other.

import type { Metadata } from "next";
import Link from "next/link";
import CarteMachine from "@/components/simulateurs/CarteMachine";

const PAPER = "#f6f1e4";
const INK = "#1d1c16";

export const metadata: Metadata = {
  title: "Interactive maths simulators — set them with your fingertips",
  description:
    "Hands-on maths machines you set with a slider to understand a big idea, then check yourself with challenges from age 6 to 18. Why soap bubbles are round (the isoperimetric inequality) and the Kakeya needle (Hong Wang, 2026 Fields Medal).",
  keywords: [
    "maths simulator",
    "interactive maths",
    "isoperimetric inequality",
    "why are bubbles round",
    "Kakeya needle",
    "Hong Wang",
    "Yilin Wang",
    "eleveai",
  ],
  openGraph: {
    title: "Interactive maths simulators — EleveAI",
    description:
      "Set the machine, grasp the idea, then test yourself. Why bubbles are round and the Kakeya needle — with challenges from age 6 to 18.",
    url: "https://www.eleveai.fr/en/simulators",
    siteName: "EleveAI",
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: "/en/simulators",
    languages: { "fr-FR": "/simulateurs", en: "/en/simulators" },
  },
};

type EnMachine = {
  href: string;
  emoji: string;
  nom: string;
  notion: string;
  cta: string;
  image: string;
};

// The machines with an English version — newest first. Add one line per new
// translation (French catalogue lives in lib/simulateurs.ts).
const EN_MACHINES: EnMachine[] = [
  {
    href: "/en/simulators/round-bubbles",
    emoji: "🫧",
    nom: "Why are bubbles round?",
    notion:
      "The isoperimetric idea: same string, the circle holds the most. The score 4πA/P² climbs to 1 — Yilin Wang's childhood question.",
    cta: "Blow the bubble",
    image: "/images/bulles-rondes.svg",
  },
  {
    href: "/en/simulators/kakeya-needle",
    emoji: "🪡",
    nom: "The Kakeya needle",
    notion:
      "Hong Wang, 2026 Fields Medal: the most economical U-turn — the swept area halves with every trick, all the way toward 0.",
    cta: "Spin the needle",
    image: "/images/aiguille-de-kakeya.svg",
  },
];

export default function EnSimulatorsPage() {
  return (
    <main className="min-h-screen px-4 pb-16 pt-8 sm:px-6" style={{ backgroundColor: PAPER, color: INK }}>
      <div className="mx-auto max-w-6xl">
        {/* Masthead */}
        <header className="border-b-4 border-double border-[#1d1c16] pb-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-[11px] font-black uppercase tracking-[0.28em] text-[#1d1c16]/65">
              The journal · A bit of maths
            </p>
            <Link href="/simulateurs" className="text-[12px] font-black text-cyan-800 hover:underline">
              🌐 En français →
            </Link>
          </div>
          <h1 className="mt-2 font-serif text-4xl font-black leading-none tracking-tight sm:text-6xl">
            Maths machines in your hand
          </h1>
          <p className="mt-3 max-w-2xl text-base font-medium leading-7 text-[#1d1c16]/80">
            Move a slider, and a big idea comes to life. You grasp it first — then you take on the{" "}
            <b>challenges, from age 6 to 18</b>. A growing set of machines, translated one by one.
          </p>
        </header>

        <section className="mt-10">
          <h2 className="font-serif text-2xl font-black sm:text-3xl">A bit of maths</h2>
          <p className="mt-1 text-sm text-[#1d1c16]/60">
            Simple stories, maths that go far — great theorems made playable.
          </p>
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {EN_MACHINES.map((m) => (
              <CarteMachine
                key={m.href}
                href={m.href}
                image={m.image}
                emoji={m.emoji}
                titre={m.nom}
                texte={m.notion}
                cta={`🎛️ ${m.cta} →`}
              />
            ))}
          </div>
        </section>

        <div className="mt-12 border-t-2 border-[#1d1c16] pt-5 text-center">
          <p className="mx-auto max-w-2xl font-serif text-lg font-black leading-snug">
            Every machine is a door: it makes you understand — then it sends you off to practise.
          </p>
          <div className="mt-3 flex flex-wrap justify-center gap-3">
            <Link
              href="/simulateurs"
              className="rounded-sm border-2 border-cyan-800 px-5 py-2.5 text-sm font-black text-cyan-800 transition hover:bg-cyan-800 hover:text-[#f0fafc]"
            >
              🌐 Voir tous les simulateurs (français) →
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
