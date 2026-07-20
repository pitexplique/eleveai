"use client";

// « Le volcan dans ta main » — l'élève règle le débit de lave, la Fournaise
// travaille sous ses yeux : le magma monte de la chambre (~2,5 km sous le
// sommet), la fissure s'ouvre, les fontaines jaillissent, la coulée descend
// les Grandes Pentes — et quand elle touche l'océan, l'île GRANDIT. Les
// maths (volumes, vitesses, durées) sont AFFICHÉES, jamais cachées.
//
// Chiffres pédagogiques ARRONDIS (assumés « environ ») :
//   débit de lave : de 5 m³/s (petit filet) à 200 m³/s (avril 2007,
//   l'éruption du siècle) · 1 h = 3 600 s
//   une piscine olympique = 2 500 m³ · un terrain de foot = 7 140 m²
//   avril 2007 : la coulée a coupé la route et gagné ~45 ha sur l'océan
//   (~450 000 m², ≈ 63 terrains de foot de terre neuve)
//   t = d ÷ v — la même formule que la vigie cyclone.

import { useEffect, useState } from "react";
import Link from "next/link";
import DefisSimulateur, { type DefiSimulateur } from "@/components/simulateurs/DefisSimulateur";

const PISCINE_M3 = 2500;
const TERRAIN_FOOT_M2 = 7140;
const TERRE_2007_M2 = 450000;

// ── Les défis du volcan (règle du 18/07 : chaque simulateur a les siens) ─────
// Les nombres diffèrent du curseur : la réponse n'est pas à l'écran, mais
// l'élève peut régler le débit pour vérifier — le volcan corrige lui-même.
const DEFIS: DefiSimulateur[] = [
  {
    id: "volume",
    question:
      "L'éruption crache 50 m³ de lave chaque seconde. Quel volume en 1 heure ?",
    reponse: 180000,
    unite: "m³",
    indice: "1 heure = 3 600 secondes.",
    calcul: "50 × 3 600 = 180 000 m³ de lave en une heure",
  },
  {
    id: "piscines",
    question:
      "Ces 180 000 m³ : combien de piscines olympiques (2 500 m³) remplies en une heure ?",
    reponse: 72,
    unite: "piscines",
    indice: "Combien de fois 2 500 rentre dans 180 000 ?",
    calcul: "180 000 ÷ 2 500 = 72 piscines olympiques — chaque heure",
  },
  {
    id: "route",
    question:
      "La coulée est à 8 km de la route, elle avance à 2 km/h. Dans combien d'heures la coupe-t-elle ?",
    reponse: 4,
    unite: "h",
    indice: "La formule de la vigie cyclone : t = d ÷ v.",
    calcul: "t = d ÷ v = 8 ÷ 2 = 4 h — le temps de fermer la route et d'évacuer",
  },
  {
    id: "terre",
    question:
      "En avril 2007, la lave a gagné ~450 000 m² sur l'océan. Combien de terrains de foot (7 140 m²) ? (arrondis)",
    reponse: 63,
    unite: "terrains",
    tolerance: 1,
    indice: "Divise la surface gagnée par celle d'un terrain.",
    calcul: "450 000 ÷ 7 140 ≈ 63 terrains de foot — l'île a grandi !",
  },
];

const COULEURS_DEFIS = {
  fond: "#241108",
  fondProfond: "#140a06",
  bord: "#4a2314",
  accent: "#ff8c42",
  texte: "#f8ede4",
  sousTexte: "#cfa78f",
  ok: "#7fb069",
  rate: "#f2d43b",
};

// Formatage français des grands nombres, sans décimales inutiles.
function fr(n: number, decimales = 0): string {
  return n.toLocaleString("fr-FR", {
    maximumFractionDigits: decimales,
    minimumFractionDigits: 0,
  });
}

// ── Le schéma VIVANT du volcan (SVG animé — un schéma, pas une scène) ────────
// Tout bouge : la chambre magmatique pulse, le magma monte dans la cheminée,
// les fontaines jaillissent, la coulée descend vers l'océan, la vapeur monte
// au point d'entrée en mer. La cadence suit le débit. Pastilles A→H : la
// grammaire des coupes de manuel (on apprend aussi à LIRE un schéma).
function VolcanAnime({ debit }: { debit: number }) {
  // De 3,6 s (5 m³/s, au ralenti) à 0,9 s (200 m³/s, l'éruption du siècle).
  const cadence = (3.6 - (Math.min(debit, 200) / 200) * 2.7).toFixed(2) + "s";

  return (
    <div className="mt-3 overflow-x-auto rounded border border-[#4a2314] bg-[#140a06]">
      <style>{`
        @keyframes vol-flux { to { stroke-dashoffset: -28; } }
        @keyframes vol-monter { 0% { transform: translateY(0); opacity: .95; } 100% { transform: translateY(-30px); opacity: 0; } }
        @keyframes vol-fontaine { 0% { transform: translate(0,0); opacity: 1; } 100% { transform: translate(var(--vx), -46px); opacity: 0; } }
        @keyframes vol-pulse { 0%,100% { opacity: .55; } 50% { opacity: 1; } }
        .v-flux { stroke-dasharray: 10 16; animation: vol-flux var(--cadence) linear infinite; }
        .v-flux-lent { stroke-dasharray: 8 14; animation: vol-flux calc(var(--cadence) * 1.6) linear infinite; }
        .v-vapeur { animation: vol-monter calc(var(--cadence) * 1.6) ease-out infinite; }
        .v-fontaine { animation: vol-fontaine calc(var(--cadence) * 1.1) ease-out infinite; }
        .v-chambre { animation: vol-pulse calc(var(--cadence) * 1.4) ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .v-flux, .v-flux-lent, .v-vapeur, .v-fontaine, .v-chambre { animation-duration: 12s; }
        }
      `}</style>
      <svg
        viewBox="0 0 820 330"
        style={{ ["--cadence" as string]: cadence }}
        className="mx-auto block min-w-[640px] max-w-[900px]"
        aria-label="Schéma animé du volcan : le magma monte de la chambre, jaillit en fontaines au cratère, la coulée descend les Grandes Pentes et gagne de la terre neuve sur l'océan"
      >
        {/* Le profil de l'île : du sommet (gauche) à l'océan (droite) */}
        <path d="M20,300 L120,300 C180,300 220,120 330,116 C420,112 520,220 640,268 L700,286 L700,310 L20,310 Z"
              fill="#241108" stroke="#4a2314" strokeWidth="2" />
        <text x="52" y="286" fill="#cfa78f" fontSize="10" fontWeight="700" fontFamily="monospace">SOUS L&apos;ÎLE</text>
        {/* A · La chambre magmatique (poche qui pulse, ~2,5 km sous le sommet) */}
        <ellipse cx="320" cy="268" rx="52" ry="26" fill="#e0442e" className="v-chambre" />
        <text x="320" y="273" fill="#f8ede4" fontSize="9.5" fontWeight="700" textAnchor="middle" fontFamily="monospace">MAGMA</text>
        <text x="320" y="308" fill="#cfa78f" fontSize="9.5" fontWeight="700" textAnchor="middle" fontFamily="monospace">~2,5 km sous le sommet</text>
        {/* B · La cheminée : le magma MONTE */}
        <path d="M322,244 C326,200 328,160 330,124" fill="none" stroke="#4a2314" strokeWidth="12" />
        <path d="M330,124 C328,160 326,200 322,244" fill="none" stroke="#ff7a33" strokeWidth="6" className="v-flux" />
        {/* C · Le cratère Dolomieu + D · la fissure */}
        <path d="M304,118 L318,110 L342,110 L356,118" fill="none" stroke="#cfa78f" strokeWidth="3" />
        <text x="330" y="96" fill="#cfa78f" fontSize="10" fontWeight="700" textAnchor="middle" fontFamily="monospace">CRATÈRE DOLOMIEU</text>
        {/* E · Les fontaines de lave (particules qui jaillissent) */}
        {[-14, -6, 2, 10].map((dx, i) => (
          <circle
            key={i}
            cx={330 + dx}
            cy={112}
            r={3.4}
            fill={i % 2 ? "#ff7a33" : "#f2d43b"}
            className="v-fontaine"
            style={{ ["--vx" as string]: `${dx * 1.6}px`, animationDelay: `calc(var(--cadence) * ${i * 0.22})` }}
          />
        ))}
        {/* F · La coulée qui descend les Grandes Pentes vers l'océan */}
        <path d="M348,122 C430,124 520,226 634,272" fill="none" stroke="#3a1a0c" strokeWidth="12" />
        <path d="M348,122 C430,124 520,226 634,272" fill="none" stroke="#ff7a33" strokeWidth="6" className="v-flux" />
        <text x="470" y="150" fill="#ff8c42" fontSize="11" fontWeight="700" fontFamily="monospace">LA COULÉE · LES GRANDES PENTES</text>
        {/* G · La route coupée (RN2) : un trait qui croise la coulée */}
        <path d="M560,236 L610,206" stroke="#93a8b8" strokeWidth="5" strokeDasharray="8 6" />
        <text x="618" y="200" fill="#93a8b8" fontSize="9.5" fontWeight="700" fontFamily="monospace">LA ROUTE (RN2)</text>
        {/* H · L'océan + le panache de vapeur + la terre neuve */}
        <rect x="700" y="286" width="100" height="24" fill="#134c5c" />
        <path d="M704,292 C730,288 770,288 796,292" fill="none" stroke="#5bc8dd" strokeWidth="2.5" className="v-flux-lent" />
        <text x="750" y="322" fill="#5bc8dd" fontSize="10" fontWeight="700" textAnchor="middle" fontFamily="monospace">L&apos;OCÉAN</text>
        <path d="M640,270 L700,286 L700,310 L640,310 Z" fill="#3a1a0c" stroke="#ff7a33" strokeWidth="1.5" />
        <text x="668" y="326" fill="#ff8c42" fontSize="9.5" fontWeight="700" textAnchor="middle" fontFamily="monospace">TERRE NEUVE</text>
        {[0, 1, 2].map((i) => (
          <circle key={i} cx={686 + i * 10} cy={272} r={4} fill="#f8ede4" opacity={0.7} className="v-vapeur"
                  style={{ animationDelay: `calc(var(--cadence) * ${i * 0.4})` }} />
        ))}
        <text x="700" y="252" fill="#f8ede4" fontSize="9.5" fontWeight="700" textAnchor="middle" fontFamily="monospace">le panache</text>
        {/* Les pastilles A → H (la grammaire des coupes de manuel) */}
        {([
          ["A", 254, 268],
          ["B", 306, 196],
          ["C", 288, 108],
          ["D", 372, 106],
          ["E", 366, 78],
          ["F", 452, 182],
          ["G", 586, 246],
          ["H", 760, 272],
        ] as const).map(([lettre, x, y]) => (
          <g key={lettre}>
            <circle cx={x} cy={y} r="9" fill="#f2d43b" />
            <text x={x} y={y + 3.5} fill="#140a06" fontSize="11" fontWeight="800" textAnchor="middle" fontFamily="monospace">{lettre}</text>
          </g>
        ))}
      </svg>
      {/* Le vocabulaire du schéma, de A à H — replié pour garder la page courte. */}
      <details className="border-t border-[#4a2314] px-3 py-2">
        <summary className="cursor-pointer text-[11.5px] font-bold text-[#cfa78f] hover:text-[#f8ede4]">
          🔤 Les mots du volcan, de A à H ▾
        </summary>
        <div className="mt-2 grid gap-x-5 gap-y-1.5 pb-1 text-[12px] leading-5 text-[#e8d5c4] sm:grid-cols-2">
          {[
            ["A", "La chambre magmatique : la poche de roche fondue, ~2,5 km sous le sommet."],
            ["B", "La cheminée : le couloir que le magma remonte."],
            ["C", "Le cratère Dolomieu : la bouche principale du sommet."],
            ["D", "La fissure : la fente par où la lave sort vraiment."],
            ["E", "Les fontaines de lave : le magma jaillit — il devient la lave."],
            ["F", "La coulée : la lave qui descend en refroidissant."],
            ["G", "Les Grandes Pentes et la route (RN2), parfois coupée."],
            ["H", "L'océan : la lave fige — l'île gagne de la terre neuve."],
          ].map(([lettre, texte]) => (
            <p key={lettre}>
              <span className="mr-1.5 inline-block w-5 rounded-sm bg-[#f2d43b] text-center font-mono text-[11px] font-black text-[#140a06]">
                {lettre}
              </span>
              {texte}
            </p>
          ))}
        </div>
      </details>
    </div>
  );
}

function Etape({
  nom,
  explication,
  quantite,
  unite,
  pct,
  couleur,
}: {
  nom: string;
  explication: string;
  quantite: number;
  unite: string;
  pct: number; // largeur de la barre, en % du flux
  couleur: string;
}) {
  return (
    <div className="rounded border border-[#4a2314] bg-[#241108] px-3 py-2">
      <div className="flex items-baseline justify-between gap-2">
        <p className="text-[11px] font-black uppercase tracking-[0.14em] text-[#cfa78f]">
          {nom}
        </p>
        <p className="font-mono text-sm font-bold tabular-nums text-[#f8ede4]">
          {fr(quantite, quantite < 10 ? 1 : 0)} <span className="text-[11px] font-normal text-[#cfa78f]">{unite}</span>
        </p>
      </div>
      <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-[#140a06]">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: Math.max(2, Math.min(100, pct)) + "%", backgroundColor: couleur }}
        />
      </div>
      <p className="mt-1.5 text-[12px] leading-5 text-[#e8d5c4]">{explication}</p>
    </div>
  );
}

export default function SimulateurVolcanClient() {
  // Le débit de lave : d'un filet (5 m³/s) à l'éruption du siècle
  // (200 m³/s, avril 2007).
  const [debit, setDebit] = useState(50);

  // MODE CLASSE (vidéoprojecteur) : tout grossit — mémorisé, partagé avec
  // les autres machines (même clé localStorage).
  const [modeClasse, setModeClasse] = useState(false);
  useEffect(() => {
    try {
      setModeClasse(localStorage.getItem("eleveai-mode-classe") === "1");
    } catch {}
  }, []);
  const basculerModeClasse = () => {
    setModeClasse((v) => {
      try {
        localStorage.setItem("eleveai-mode-classe", v ? "0" : "1");
      } catch {}
      return !v;
    });
  };

  const volumeHeure = debit * 3600;
  const piscinesHeure = volumeHeure / PISCINE_M3;
  const volumeJour = volumeHeure * 24;
  const camionsMinute = (debit * 60) / 20; // un camion-toupie ~20 m³
  const terrains2007 = TERRE_2007_M2 / TERRAIN_FOOT_M2;

  return (
    <div className="min-h-screen bg-[#140a06] text-[#f8ede4]">
      {/* Manchette du volcan */}
      <header className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-[#4a2314] px-5 pb-2.5 pt-3.5">
        <h1 className="m-0 text-[17px] font-extrabold uppercase tracking-[0.28em]">
          Le volcan dans ta <span className="text-[#ff8c42]">main</span>
        </h1>
        <span className="font-serif text-sm italic text-[#cfa78f]">
          La Fournaise — le volcan qui fabrique l&apos;île
        </span>
        <button
          type="button"
          onClick={basculerModeClasse}
          aria-pressed={modeClasse}
          className={`ml-auto rounded-sm border px-2.5 py-1 font-mono text-[11px] font-bold tracking-wider transition ${
            modeClasse
              ? "border-[#ff8c42] bg-[#ff8c42] text-[#140a06]"
              : "border-[#ff8c42]/40 bg-transparent text-[#ff8c42] hover:bg-[#ff8c42]/15"
          }`}
        >
          🖥️ MODE CLASSE {modeClasse ? "✓" : ""}
        </button>
        <span className="rounded-sm bg-[#ff8c42] px-2 py-0.5 font-mono text-[11px] font-bold tracking-wider text-[#140a06]">
          PITON DE LA FOURNAISE
        </span>
      </header>

      <main
        className="mx-auto max-w-5xl px-4 py-5 sm:px-6"
        style={modeClasse ? ({ zoom: 1.35 } as React.CSSProperties) : undefined}
      >
        {/* La commande : le débit de lave */}
        <div className="rounded border border-[#4a2314] bg-[#241108] p-4">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#cfa78f]">
              🌋 La lave que la Fournaise donne aujourd&apos;hui
            </p>
            <p className="font-mono text-2xl font-bold tabular-nums text-[#ff8c42]">
              {fr(debit)} <span className="text-sm font-normal text-[#cfa78f]">m³/s</span>
            </p>
          </div>
          <input
            type="range"
            min={5}
            max={200}
            step={5}
            value={debit}
            onChange={(e) => setDebit(+e.target.value)}
            className="mt-3 w-full accent-[#ff8c42]"
            aria-label="Débit de lave, en mètres cubes par seconde"
          />
          <div className="mt-1 flex justify-between font-mono text-[10px] text-[#cfa78f]/70">
            <span>5 — un filet de lave</span>
            <span>200 — avril 2007, l&apos;éruption du siècle</span>
          </div>
          <p className="mt-2 text-[12.5px] leading-5 text-[#e8d5c4]">
            Soit <b className="text-[#f8ede4]">{fr(camionsMinute)} camions-toupies</b> (20 m³)
            déversés <b className="text-[#f8ede4]">chaque minute</b> — et personne ne conduit :
            c&apos;est l&apos;île qui pousse toute seule.
          </p>
        </div>

        {/* LE SCHÉMA VIVANT — le volcan animé, qui accélère avec le débit. */}
        <VolcanAnime debit={debit} />

        {/* La chaîne de l'éruption */}
        <div className="mt-3 space-y-3">
          <Etape
            nom="1 · La chambre magmatique — ça pousse dessous"
            explication="À ~2,5 km sous le sommet, une poche de roche fondue. Quand la pression monte, l'observatoire (OVPF) voit l'île gonfler de quelques millimètres — c'est le signe que ça vient."
            quantite={debit}
            unite="m³/s en montée"
            pct={100}
            couleur="#e0442e"
          />
          <Etape
            nom="2 · La fissure s'ouvre — les fontaines de lave"
            explication="Le magma remonte la cheminée et déchire le flanc : des fontaines orange jaillissent parfois à plus de 100 m. Le magma qui sort change de nom : c'est la lave (~1 100 °C)."
            quantite={debit}
            unite="m³/s crachés"
            pct={100}
            couleur="#ff7a33"
          />
          <Etape
            nom="3 · La coulée — elle descend les Grandes Pentes"
            explication="La lave file vers la mer en refroidissant. Sa vitesse dépend de la pente et du débit — et la question de la vigie est la même que pour un cyclone : t = d ÷ v, quand atteint-elle la route ?"
            quantite={piscinesHeure}
            unite="piscines/h"
            pct={(debit / 200) * 100}
            couleur="#ff8c42"
          />
          <Etape
            nom="4 · L'océan — l'île gagne de la terre neuve"
            explication="Quand la coulée touche l'eau : un panache de vapeur géant, et la lave fige en roche. En avril 2007, l'île a grandi de ~45 hectares. La Fournaise détruit parfois une route — mais elle FABRIQUE l'île."
            quantite={volumeJour / 1_000_000}
            unite="millions de m³/jour"
            pct={(debit / 200) * 100}
            couleur="#f2d43b"
          />
        </div>

        {/* Les sorties du jour */}
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <div className="rounded border-2 border-[#ff8c42] bg-[#241108] p-3 text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#cfa78f]">🏊 En une heure</p>
            <p className="mt-1 font-mono text-2xl font-bold tabular-nums text-[#ff8c42]">{fr(piscinesHeure)} piscines</p>
            <p className="mt-1 text-[11.5px] leading-4 text-[#e8d5c4]">
              olympiques (2 500 m³) remplies de lave — {fr(volumeHeure)} m³
            </p>
          </div>
          <div className="rounded border-2 border-[#f2d43b] bg-[#241108] p-3 text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#cfa78f]">🏝️ La mémoire de 2007</p>
            <p className="mt-1 font-mono text-2xl font-bold tabular-nums text-[#f2d43b]">+{fr(terrains2007)} terrains</p>
            <p className="mt-1 text-[11.5px] leading-4 text-[#e8d5c4]">
              de foot de terre neuve gagnés sur l&apos;océan (~45 ha)
            </p>
          </div>
          <div className="rounded border-2 border-[#5bc8dd] bg-[#241108] p-3 text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#cfa78f]">🔭 La vigie</p>
            <p className="mt-1 font-mono text-2xl font-bold tabular-nums text-[#5bc8dd]">OVPF</p>
            <p className="mt-1 text-[11.5px] leading-4 text-[#e8d5c4]">
              l&apos;observatoire surveille le volcan jour et nuit — l&apos;enclos ferme en éruption
            </p>
          </div>
        </div>

        {/* Les maths du volcan, affichées */}
        <div className="mt-4 rounded border border-dashed border-[#ff8c42]/40 bg-[#241108] px-3 py-2.5 font-mono text-[12.5px] leading-relaxed text-[#ff8c42]">
          volume/h = {fr(debit)} m³/s × 3 600 = <b>{fr(volumeHeure)} m³</b>
          <span className="text-[#cfa78f]"> · </span>
          piscines/h = {fr(volumeHeure)} ÷ 2 500 = <b>{fr(piscinesHeure)}</b>
          <span className="text-[#cfa78f]"> · </span>
          la route : t = d ÷ v
        </div>

        {/* LES DÉFIS — à toi de calculer, le volcan vérifie */}
        <DefisSimulateur
          titre="Les défis du volcan"
          coupDePouce="Coup de pouce : règle le débit du défi — le volcan vérifie pour toi."
          defis={DEFIS}
          couleurs={COULEURS_DEFIS}
        />

        {/* Le pont vers l'épisode et le défi */}
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <a
            href="https://youtu.be/4f2U1RAgk_A"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded bg-[#ff8c42] px-4 py-2 text-sm font-bold text-[#140a06] hover:brightness-110"
          >
            ▶ L&apos;épisode « Le Piton de la Fournaise »
          </a>
          <Link
            href="/defis-du-jour"
            className="inline-flex items-center gap-2 rounded border border-[#4a2314] bg-[#241108] px-4 py-2 text-sm font-bold text-[#f8ede4] hover:brightness-125"
          >
            🎯 Le défi du jour
          </Link>
        </div>
      </main>

      {/* Le garde-fou d'honnêteté — et de sécurité. */}
      <footer className="flex flex-wrap items-center gap-x-4 gap-y-1.5 border-t border-[#4a2314] px-5 py-2.5 text-[11.5px] text-[#cfa78f]">
        <span>
          Chiffres pédagogiques arrondis — repères réels de l&apos;éruption
          d&apos;avril 2007 (OVPF). ⚠️ En éruption, l&apos;enclos est FERMÉ :
          le volcan s&apos;admire depuis les belvédères, en suivant les
          consignes de la préfecture et de l&apos;observatoire.
        </span>
        <span className="ml-auto font-mono">
          Un jeu du <b className="font-bold text-[#ff8c42]">Journal d&apos;EleveAI</b> 🦎
        </span>
      </footer>
    </div>
  );
}
