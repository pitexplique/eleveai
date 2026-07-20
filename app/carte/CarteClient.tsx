"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, MapPin, Sparkles } from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  La Réunion, point par point : à chaque lieu, la matière qui se cache là.  */
/*  Prototype : silhouette SVG maison + points cliquables (multi-matières).   */
/* -------------------------------------------------------------------------- */

type Matiere = "maths" | "ecologie" | "histoire";

type Point = {
  id: string;
  lieu: string;
  x: number; // coordonnées dans le viewBox 0 0 420 320
  y: number;
  emoji: string;
  matiere: Matiere;
  notion: string;
  question: string;
  reponse: string;
  href?: string; // vers le défi Picto Maths ou la machine « dans ta main » du lieu
};

const MAT: Record<Matiere, { label: string; dot: string; text: string; soft: string; border: string; stroke: string }> = {
  maths: { label: "Maths", dot: "bg-cyan-500", text: "text-cyan-700", soft: "bg-cyan-50", border: "border-cyan-300", stroke: "#0891b2" },
  ecologie: { label: "Écologie", dot: "bg-emerald-500", text: "text-emerald-700", soft: "bg-emerald-50", border: "border-emerald-300", stroke: "#059669" },
  histoire: { label: "Histoire", dot: "bg-amber-500", text: "text-amber-800", soft: "bg-amber-50", border: "border-amber-300", stroke: "#d97706" },
};

const POINTS: Point[] = [
  {
    id: "saint-denis",
    lieu: "Saint-Denis",
    x: 161, y: 52, emoji: "🏛️", matiere: "histoire",
    notion: "Dates & repères",
    question: "En quelle année La Réunion devient-elle un département français ?",
    reponse: "En 1946. L'île passe de colonie à département d'outre-mer.",
  },
  {
    id: "saint-pierre",
    lieu: "Marché de Saint-Pierre",
    x: 210, y: 293, emoji: "🍒", matiere: "maths",
    notion: "Proportionnalité",
    question: "3 kg de letchis coûtent 5 €. Combien pour 9 kg ?",
    reponse: "9 kg = 3 × 3 kg, donc 3 × 5 = 15 €.",
    href: "/picto-maths",
  },
  {
    id: "ermitage",
    lieu: "Lagon de l'Ermitage",
    x: 60, y: 166, emoji: "🐠", matiere: "ecologie",
    notion: "Croissance & vitesse",
    question: "Le corail grandit d'environ 1 cm par an. En combien de temps fait-il 15 cm ?",
    reponse: "15 cm à 1 cm/an → 15 ans. Un récif, c'est lent et fragile : on le protège. Règle la houle toi-même sur le simulateur !",
    href: "/simulateur-lagon",
  },
  {
    id: "mafate",
    lieu: "Cirque de Mafate",
    x: 150, y: 128, emoji: "🥾", matiere: "maths",
    notion: "Fractions",
    question: "En rando, j'ai bu le tiers de mes 3 bouteilles d'eau. Ça fait combien ?",
    reponse: "Le tiers de 3 bouteilles = 3 × 1/3 = 1 bouteille.",
    href: "/picto-maths",
  },
  {
    id: "cilaos",
    lieu: "Montée de Cilaos",
    x: 166, y: 186, emoji: "🚴", matiere: "maths",
    notion: "Proportionnalité inverse",
    question: "À vélo, 1 tour de pédales (30 dents) fait tourner la roue (10 dents) combien de fois ?",
    reponse: "30 ÷ 10 = 3 tours de roue pour 1 tour de pédales.",
    href: "/picto-maths",
  },
  {
    id: "piton-des-neiges",
    lieu: "Piton des Neiges",
    x: 186, y: 150, emoji: "🏔️", matiere: "maths",
    notion: "Nombres relatifs",
    question: "Au sommet, il gèle : on repère −4 °C et 2 °C. Où placer le 0 ?",
    reponse: "De −4 à 2 il y a 6 degrés ; le 0 est 4 graduations après −4.",
    href: "/picto-maths",
  },
  {
    id: "fournaise",
    lieu: "Piton de la Fournaise",
    x: 306, y: 224, emoji: "🌋", matiere: "maths",
    notion: "Vitesse · durée",
    question: "La lave avance de 300 m en 2 h. Quand atteint-elle la route, à 1,5 km ?",
    reponse: "Vitesse 150 m/h ; 1 500 ÷ 150 = 10 h. Règle la lave toi-même sur le simulateur !",
    href: "/simulateur-volcan",
  },
  {
    id: "takamaka",
    lieu: "Gorges de Takamaka",
    x: 288, y: 132, emoji: "⚡", matiere: "maths",
    notion: "La formule du barrage",
    question: "L'eau tombe de 500 m, à 5 m³/s. Puissance = 8 × débit × chute : combien de kW ?",
    reponse: "8 × 5 × 500 = 20 000 kW — de quoi éclairer 48 000 familles. Ouvre les vannes toi-même !",
    href: "/simulateur-barrage",
  },
  {
    id: "plaine-des-cafres",
    lieu: "Plaine des Cafres",
    x: 224, y: 232, emoji: "🧀", matiere: "maths",
    notion: "Proportionnalité",
    question: "4 L de lait donnent 1 kg de fromage frais. Combien de litres pour 1 000 pots de 150 g ?",
    reponse: "1 000 × 150 g = 150 kg ; 150 × 4 = 600 L de lait. Vérifie sur la fromagerie !",
    href: "/simulateur-fromage",
  },
  {
    id: "canne-est",
    lieu: "Champs de canne (Est)",
    x: 262, y: 88, emoji: "🌾", matiere: "ecologie",
    notion: "Pourcentage",
    question: "Un planteur récolte 60 t de cannes, à 11 % de sucre. Combien de sucre ?",
    reponse: "60 × 11 ÷ 100 = 6,6 t de sucre. Fais tourner l'usine toi-même !",
    href: "/simulateur-sucre",
  },
];

/* Silhouette de La Réunion, calquée sur la carte réelle (côtes + pointe SE du
   Grand Brûlé / Pointe de la Table). Sens horaire depuis Saint-Denis (Nord). */
const ILE =
  "M 161 35 C 200 30 235 42 262 60 C 295 82 315 100 321 123 C 340 140 352 150 354 164 C 362 185 372 210 367 239 C 360 262 348 282 328 290 C 305 300 288 302 269 302 C 250 306 235 310 216 309 C 188 308 158 300 138 277 C 110 250 88 235 79 214 C 62 188 48 160 46 132 C 44 108 50 88 62 76 C 74 64 84 60 98 57 C 120 52 140 40 161 35 Z";

const FILTRES: { key: Matiere | "tout"; label: string }[] = [
  { key: "tout", label: "Tout" },
  { key: "maths", label: "🔢 Maths" },
  { key: "ecologie", label: "🌱 Écologie" },
  { key: "histoire", label: "📜 Histoire" },
];

const STORAGE_KEY = "carte-tresors-974";

export default function CarteClient() {
  const [selId, setSelId] = useState<string | null>(null);
  const [filtre, setFiltre] = useState<Matiere | "tout">("tout");
  const [found, setFound] = useState<Set<string>>(new Set());

  // Trésors trouvés persistés en local (aucune mise à jour côté serveur).
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setFound(new Set(JSON.parse(raw) as string[]));
    } catch {
      /* ignore */
    }
  }, []);

  function marquerTrouve(id: string) {
    setFound((prev) => {
      const next = new Set(prev);
      next.add(id);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
      } catch {
        /* ignore */
      }
      return next;
    });
  }

  function reinitialiser() {
    setFound(new Set());
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }

  const sel = POINTS.find((p) => p.id === selId) ?? null;
  const visible = (p: Point) => filtre === "tout" || p.matiere === filtre;
  const nbTrouves = found.size;
  const tousTrouves = nbTrouves === POINTS.length;

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#eaf7fb] to-[#d6eef6] text-slate-800">
      <div className="mx-auto max-w-5xl px-5 py-8 sm:px-8">
        <Link
          href="/maths-974"
          className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 bg-white px-3.5 py-1.5 text-sm font-bold text-slate-700 shadow-sm transition hover:border-slate-400 hover:bg-slate-50"
        >
          <ArrowLeft className="h-4 w-4" />
          Maths Réel · 974
        </Link>

        <header className="mt-5 text-center">
          <p className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-amber-700">
            <MapPin className="h-4 w-4" />
            Chasse au trésor · La Réunion
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
            La chasse aux trésors des savoirs 🗺️
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-base font-semibold text-slate-600">
            Clique sur un lieu de l&apos;île, résous l&apos;énigme, et déniche les {POINTS.length} trésors —{" "}
            <span className="text-cyan-700">maths</span>, <span className="text-emerald-700">écologie</span>,{" "}
            <span className="text-amber-700">histoire</span>.
          </p>

          {/* Progression de la chasse */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-400 px-4 py-1.5 text-sm font-black text-amber-950 shadow-sm">
              💎 {nbTrouves} / {POINTS.length} trésors trouvés
            </span>
            {nbTrouves > 0 && (
              <button
                type="button"
                onClick={reinitialiser}
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 bg-white px-3 py-1.5 text-xs font-black text-slate-500 transition hover:border-slate-400 hover:text-slate-700"
              >
                ↻ Recommencer la chasse
              </button>
            )}
          </div>
        </header>

        {/* Filtres par matière */}
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {FILTRES.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setFiltre(f.key)}
              className={`rounded-full border px-4 py-1.5 text-sm font-black transition ${
                filtre === f.key
                  ? "border-slate-800 bg-slate-900 text-white"
                  : "border-slate-300 bg-white text-slate-600 hover:border-slate-400"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* La carte */}
        <div className="mt-6 overflow-hidden rounded-3xl border border-white bg-white/60 p-3 shadow-xl shadow-cyan-900/10">
          <svg viewBox="0 0 420 340" className="w-full" role="img" aria-label="Carte de La Réunion avec des points de savoir">
            {/* océan */}
            <rect x={0} y={0} width={420} height={340} className="fill-sky-100" />
            {[40, 70, 100].map((cy) => (
              <path key={cy} d={`M 20 ${cy} q 15 -8 30 0 t 30 0 t 30 0`} className="fill-none stroke-sky-200" strokeWidth={2} />
            ))}

            {/* île */}
            <path d={ILE} className="fill-[#cfe8c8] stroke-emerald-700/50" strokeWidth={2.5} />
            <path d={ILE} className="fill-none stroke-white/50" strokeWidth={6} transform="scale(0.985)" style={{ transformOrigin: "center" }} />

            {/* boussole */}
            <g transform="translate(388 40)">
              <text x={0} y={0} fontSize={11} fontWeight={800} textAnchor="middle" className="fill-slate-500">N</text>
              <path d="M0 4 l4 12 l-4 -3 l-4 3 Z" className="fill-slate-400" />
            </g>

            {/* points */}
            {POINTS.map((p) => {
              const on = visible(p);
              const isSel = p.id === selId;
              const m = MAT[p.matiere];
              return (
                <g
                  key={p.id}
                  onClick={() => setSelId(p.id)}
                  className="cursor-pointer"
                  style={{ opacity: on ? 1 : 0.2, transition: "opacity .2s" }}
                >
                  {isSel && <circle cx={p.x} cy={p.y} r={20} fill={m.stroke} opacity={0.18} />}
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={isSel ? 15 : 13}
                    className="fill-white"
                    stroke={m.stroke}
                    strokeWidth={isSel ? 3.5 : 2.5}
                  />
                  <text x={p.x} y={p.y + 5} fontSize={14} textAnchor="middle" style={{ pointerEvents: "none" }}>
                    {p.emoji}
                  </text>
                  {found.has(p.id) && (
                    <g style={{ pointerEvents: "none" }}>
                      <circle cx={p.x + 10} cy={p.y - 10} r={6.5} className="fill-emerald-500 stroke-white" strokeWidth={1.5} />
                      <path d={`M${p.x + 7} ${p.y - 10} l2 2 l4 -4`} className="fill-none stroke-white" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
                    </g>
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        {/* Panneau de détail */}
        <div className="mt-5">
          {sel ? (
            <article className={`rounded-3xl border-2 bg-white p-6 shadow-lg ${MAT[sel.matiere].border}`}>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-2xl">{sel.emoji}</span>
                <h2 className="text-xl font-black text-slate-900">{sel.lieu}</h2>
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-black ${MAT[sel.matiere].soft} ${MAT[sel.matiere].text}`}>
                  {MAT[sel.matiere].label}
                </span>
                <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-bold text-slate-600">
                  {sel.notion}
                </span>
              </div>
              <p className="mt-3 text-lg font-black leading-snug text-slate-900">{sel.question}</p>
              <details className="mt-3 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-2">
                <summary className="cursor-pointer text-sm font-black text-slate-700">Voir la réponse</summary>
                <p className="mt-2 text-sm leading-6 text-slate-700">{sel.reponse}</p>
              </details>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                {found.has(sel.id) ? (
                  <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-5 py-2.5 text-sm font-black text-emerald-700">
                    ✓ Trésor trouvé&nbsp;!
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => marquerTrouve(sel.id)}
                    className="inline-flex items-center gap-2 rounded-full bg-amber-400 px-5 py-2.5 text-sm font-black text-amber-950 shadow transition hover:bg-amber-300"
                  >
                    💎 J&apos;ai trouvé le trésor&nbsp;!
                  </button>
                )}
                {sel.href && (
                  <Link
                    href={sel.href}
                    className="inline-flex items-center gap-2 rounded-full bg-cyan-600 px-5 py-2.5 text-sm font-black text-white shadow transition hover:bg-cyan-500"
                  >
                    <Sparkles className="h-4 w-4" />
                    Voir le défi →
                  </Link>
                )}
              </div>
            </article>
          ) : (
            <div className="rounded-3xl border-2 border-dashed border-amber-200 bg-white/70 p-8 text-center">
              <p className="text-lg font-black text-slate-700">👆 Clique sur un trésor de la carte</p>
              <p className="mt-1 text-sm font-semibold text-slate-500">
                Chaque lieu cache une énigme — résous-la, empoche le trésor.
              </p>
            </div>
          )}
        </div>

        {tousTrouves ? (
          <div className="mt-6 rounded-2xl border-2 border-amber-300 bg-gradient-to-r from-amber-100 to-yellow-100 p-5 text-center">
            <p className="text-2xl font-black text-amber-800">🏴‍☠️ Bravo, chasseur de trésors&nbsp;!</p>
            <p className="mt-1 text-sm font-bold text-amber-700">
              Tu as déniché les {POINTS.length} trésors de l&apos;île. Reviens&nbsp;: d&apos;autres apparaîtront au fil du tour&nbsp;! 🚐
            </p>
          </div>
        ) : (
          <p className="mt-6 rounded-2xl border border-dashed border-cyan-200 bg-white/60 p-4 text-center text-sm font-semibold text-slate-600">
            🚐 Cette carte grandit à chaque étape du tour de l&apos;île. Bientôt&nbsp;: tes vraies rencontres, en photo et en vidéo.
          </p>
        )}
      </div>
    </main>
  );
}
