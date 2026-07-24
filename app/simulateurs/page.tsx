import type { Metadata } from "next";
import Link from "next/link";
import { MACHINES, NB_MACHINES, type Machine } from "@/lib/simulateurs";
import MachinesPanel from "@/components/simulateurs/MachinesPanel";
import CarteMachine from "@/components/simulateurs/CarteMachine";

const PAPER = "#f6f1e4";
const INK = "#1d1c16";

export const metadata: Metadata = {
  title: "Les machines dans ta main — les simulateurs de La Réunion",
  description:
    "Treize machines à régler du bout des doigts pour comprendre l'île et les maths : le cyclone, le volcan, le barrage, le lagon, la salle de sport, la loi normale, l'exponentielle, la Diagonale des Fous… Chaque machine t'explique, puis t'envoie t'entraîner avec le coach.",
  alternates: { canonical: "/simulateurs" },
  keywords: [
    "simulateur pédagogique",
    "simulateur maths",
    "machines dans ta main",
    "La Réunion",
    "cyclone",
    "volcan",
    "barrage",
    "lagon",
    "loi normale",
    "exponentielle",
    "loi de Pareto",
    "Diagonale des Fous",
  ],
  openGraph: {
    title: "Les machines dans ta main — les simulateurs d'EleveAI",
    description:
      "Règle la machine, comprends l'île et les maths, puis entraîne-toi avec le coach. Douze simulateurs de La Réunion.",
    url: "/simulateurs",
    type: "website",
    siteName: "EleveAI",
    locale: "fr_FR",
  },
};

// Le rendu vit dans CarteMachine (partagé avec l'accueil) : ici, juste le
// passage Machine → carte.
function Carte({ m }: { m: Machine }) {
  return (
    <CarteMachine
      href={m.href}
      image={m.image}
      emoji={m.emoji}
      titre={m.nom}
      texte={m.notion}
      cta={`🎛️ ${m.cta} →`}
    />
  );
}

function Section({
  titre,
  sous,
  machines,
}: {
  titre: string;
  sous: string;
  machines: Machine[];
}) {
  return (
    <section className="mt-10">
      <h2 className="font-serif text-2xl font-black sm:text-3xl">{titre}</h2>
      <p className="mt-1 text-sm text-[#1d1c16]/60">{sous}</p>
      <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {machines.map((m) => (
          <Carte key={m.href} m={m} />
        ))}
      </div>
    </section>
  );
}

export default function SimulateursPage() {
  const reel = MACHINES.filter((m) => m.groupe === "reel");
  const maths = MACHINES.filter((m) => m.groupe === "maths");

  return (
    <main className="min-h-screen px-4 pb-16 pt-8 sm:px-6" style={{ backgroundColor: PAPER, color: INK }}>
      <div className="mx-auto max-w-6xl">
        {/* Manchette */}
        <header className="border-b-4 border-double border-[#1d1c16] pb-6">
          <p className="text-[11px] font-black uppercase tracking-[0.28em] text-[#1d1c16]/65">
            Le journal · Comprendre l&apos;île
          </p>
          <div className="mt-2 grid items-center gap-5 sm:grid-cols-[1fr_auto]">
            <div>
              <h1 className="font-serif text-4xl font-black leading-none tracking-tight sm:text-6xl">
                Les machines dans ta main
              </h1>
              <p className="mt-3 max-w-2xl text-base font-medium leading-7 text-[#1d1c16]/80">
                {NB_MACHINES} machines à régler du bout des doigts. Tu bouges un curseur,
                l&apos;île répond : le cyclone tourne, la lave coule, la cloche se
                forme. Tu comprends d&apos;abord — puis tu{" "}
                <b>t&apos;entraînes avec le coach</b>.
              </p>
            </div>
            <div className="w-full max-w-[280px] justify-self-center border-2 border-cyan-800 bg-cyan-800/[0.05] p-3 sm:justify-self-end">
              <MachinesPanel className="w-full" />
            </div>
          </div>
        </header>

        <Section
          titre="En vrai, à La Réunion"
          sous="Le réel de l'île transformé en machine — trajectoire, énergie, proportions."
          machines={reel}
        />
        <Section
          titre="Un peu de maths"
          sous="Des histoires pour tous, des maths qui vont loin — collège → supérieur."
          machines={maths}
        />

        {/* La règle, rappelée : la machine est une porte, elle ramène au coach. */}
        <div className="mt-12 border-t-2 border-[#1d1c16] pt-5 text-center">
          <p className="mx-auto max-w-2xl font-serif text-lg font-black leading-snug">
            Chaque machine est une porte : elle te fait comprendre — puis elle te
            renvoie t&apos;entraîner.
          </p>
          <div className="mt-3 flex flex-wrap justify-center gap-3">
            <Link
              href="/explorer#coach"
              className="rounded-sm bg-cyan-800 px-5 py-2.5 text-sm font-black text-[#f0fafc] transition hover:bg-[#1d1c16]"
            >
              ✏️ Entraîne-toi avec le Coach →
            </Link>
            <Link
              href="/explorer#parcours"
              className="rounded-sm border-2 border-cyan-800 px-5 py-2.5 text-sm font-black text-cyan-800 transition hover:bg-cyan-800 hover:text-[#f0fafc]"
            >
              🧭 Teste-toi — Parcours →
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
