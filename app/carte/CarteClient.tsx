"use client";

import { useState } from "react";
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
  href?: string; // vers le défi Picto Maths, si dispo
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
    x: 216, y: 74, emoji: "🏛️", matiere: "histoire",
    notion: "Dates & repères",
    question: "En quelle année La Réunion devient-elle un département français ?",
    reponse: "En 1946. L'île passe de colonie à département d'outre-mer.",
  },
  {
    id: "saint-pierre",
    lieu: "Marché de Saint-Pierre",
    x: 196, y: 256, emoji: "🍒", matiere: "maths",
    notion: "Proportionnalité",
    question: "3 kg de letchis coûtent 5 €. Combien pour 9 kg ?",
    reponse: "9 kg = 3 × 3 kg, donc 3 × 5 = 15 €.",
    href: "/picto-maths",
  },
  {
    id: "ermitage",
    lieu: "Lagon de l'Ermitage",
    x: 70, y: 162, emoji: "🐠", matiere: "ecologie",
    notion: "Croissance & vitesse",
    question: "Le corail grandit d'environ 1 cm par an. En combien de temps fait-il 15 cm ?",
    reponse: "15 cm à 1 cm/an → 15 ans. Un récif, c'est lent et fragile : on le protège.",
  },
  {
    id: "mafate",
    lieu: "Cirque de Mafate",
    x: 150, y: 134, emoji: "🥾", matiere: "maths",
    notion: "Fractions",
    question: "En rando, j'ai bu le tiers de mes 3 bouteilles d'eau. Ça fait combien ?",
    reponse: "Le tiers de 3 bouteilles = 3 × 1/3 = 1 bouteille.",
    href: "/picto-maths",
  },
  {
    id: "cilaos",
    lieu: "Montée de Cilaos",
    x: 182, y: 206, emoji: "🚴", matiere: "maths",
    notion: "Proportionnalité inverse",
    question: "À vélo, 1 tour de pédales (30 dents) fait tourner la roue (10 dents) combien de fois ?",
    reponse: "30 ÷ 10 = 3 tours de roue pour 1 tour de pédales.",
    href: "/picto-maths",
  },
  {
    id: "piton-des-neiges",
    lieu: "Piton des Neiges",
    x: 220, y: 150, emoji: "🏔️", matiere: "maths",
    notion: "Nombres relatifs",
    question: "Au sommet, il gèle : on repère −4 °C et 2 °C. Où placer le 0 ?",
    reponse: "De −4 à 2 il y a 6 degrés ; le 0 est 4 graduations après −4.",
    href: "/picto-maths",
  },
  {
    id: "fournaise",
    lieu: "Piton de la Fournaise",
    x: 300, y: 194, emoji: "🌋", matiere: "maths",
    notion: "Vitesse · durée",
    question: "La lave avance de 300 m en 2 h. Quand atteint-elle la route, à 1,5 km ?",
    reponse: "Vitesse 150 m/h ; 1 500 ÷ 150 = 10 h.",
    href: "/picto-maths",
  },
  {
    id: "canne-est",
    lieu: "Champs de canne (Est)",
    x: 332, y: 122, emoji: "🌾", matiere: "ecologie",
    notion: "Pourcentage",
    question: "Un planteur récolte 60 t de cannes, à 11 % de sucre. Combien de sucre ?",
    reponse: "60 × 11 ÷ 100 = 6,6 t de sucre.",
  },
];

/* Silhouette stylisée de La Réunion (oval irrégulier + pointe SE du Grand Brûlé). */
const ILE =
  "M 210 45 C 285 42 355 80 372 135 C 380 165 372 190 350 205 C 372 220 360 250 320 258 C 300 275 250 280 205 276 C 130 272 60 235 45 175 C 35 135 60 85 120 60 C 150 47 180 46 210 45 Z";

const FILTRES: { key: Matiere | "tout"; label: string }[] = [
  { key: "tout", label: "Tout" },
  { key: "maths", label: "🔢 Maths" },
  { key: "ecologie", label: "🌱 Écologie" },
  { key: "histoire", label: "📜 Histoire" },
];

export default function CarteClient() {
  const [selId, setSelId] = useState<string | null>(null);
  const [filtre, setFiltre] = useState<Matiere | "tout">("tout");

  const sel = POINTS.find((p) => p.id === selId) ?? null;
  const visible = (p: Point) => filtre === "tout" || p.matiere === filtre;

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
          <p className="inline-flex items-center gap-2 rounded-full bg-cyan-100 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-cyan-700">
            <MapPin className="h-4 w-4" />
            La Réunion, point par point
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
            Carte de l&apos;île de La Réunion 🗺️
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-base font-semibold text-slate-600">
            Clique sur un point de l&apos;île : quelles <span className="text-cyan-700">maths</span>, quelle{" "}
            <span className="text-emerald-700">écologie</span>, quelle <span className="text-amber-700">histoire</span> se cachent là&nbsp;?
          </p>
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
          <svg viewBox="0 0 420 320" className="w-full" role="img" aria-label="Carte de La Réunion avec des points de savoir">
            {/* océan */}
            <rect x={0} y={0} width={420} height={320} className="fill-sky-100" />
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
              {sel.href && (
                <Link
                  href={sel.href}
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-cyan-600 px-5 py-2.5 text-sm font-black text-white shadow transition hover:bg-cyan-500"
                >
                  <Sparkles className="h-4 w-4" />
                  Voir le défi Picto Maths →
                </Link>
              )}
            </article>
          ) : (
            <div className="rounded-3xl border-2 border-dashed border-cyan-200 bg-white/70 p-8 text-center">
              <p className="text-lg font-black text-slate-700">👆 Clique sur un point de la carte</p>
              <p className="mt-1 text-sm font-semibold text-slate-500">
                Chaque lieu cache une question — et la matière qui va avec.
              </p>
            </div>
          )}
        </div>

        <p className="mt-6 rounded-2xl border border-dashed border-cyan-200 bg-white/60 p-4 text-center text-sm font-semibold text-slate-600">
          🚐 Cette carte grandit à chaque étape du tour de l&apos;île. Bientôt&nbsp;: tes vraies rencontres, en photo et en vidéo.
        </p>
      </div>
    </main>
  );
}
