"use client";

// Le calendrier de l'Avent de Ti Margo — voir app/noel/page.tsx et lib/noel/calendrier.ts.
// ⭐ La date est lue SUR L'APPAREIL, après le montage (sinon le rendu serveur
//    et le navigateur ne seraient pas d'accord sur les cases ouvertes).
// 🔍 Pour relire avant l'heure : /noel?apercu=7 ouvre les cases 1 à 7.

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { DEFI_PAR_JOUR, NIVEAUX, dernierJourOuvert, type Niveau, type Question } from "@/lib/noel/calendrier";

type Onglet = "calendrier" | "projeter" | "familles";
const ONGLETS: { id: Onglet; label: string; emoji: string }[] = [
  { id: "calendrier", label: "Calendrier", emoji: "🗓️" },
  { id: "projeter", label: "À projeter", emoji: "📽️" },
  { id: "familles", label: "Familles", emoji: "🏡" },
];
const LETTRES = ["A", "B", "C"];
const CLE_NIVEAU = "noel-niveau";

export default function CalendrierNoel() {
  const [jourMax, setJourMax] = useState<number | null>(null);
  const [jour, setJour] = useState(1);
  const [onglet, setOnglet] = useState<Onglet>("calendrier");
  const [niveau, setNiveau] = useState<Niveau>("cm");
  const zoneDefi = useRef<HTMLDivElement>(null);
  const tablist = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const apercu = Number(q.get("apercu"));
    const max = Number.isInteger(apercu) && apercu >= 1 && apercu <= 24 ? apercu : dernierJourOuvert(new Date());
    setJourMax(max);
    setJour(Math.max(1, max));
    const o = q.get("onglet");
    if (o === "projeter" || o === "familles") setOnglet(o);
    try {
      const n = localStorage.getItem(CLE_NIVEAU);
      if (n === "ecole" || n === "cm" || n === "college") setNiveau(n);
    } catch {}
  }, []);

  function choisirNiveau(n: Niveau) {
    setNiveau(n);
    try {
      localStorage.setItem(CLE_NIVEAU, n);
    } catch {}
  }

  function ouvrir(j: number) {
    setJour(j);
    requestAnimationFrame(() => zoneDefi.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  }

  function clavierOnglets(e: KeyboardEvent<HTMLDivElement>) {
    const i = ONGLETS.findIndex((o) => o.id === onglet);
    let k = -1;
    if (e.key === "ArrowRight") k = (i + 1) % ONGLETS.length;
    if (e.key === "ArrowLeft") k = (i - 1 + ONGLETS.length) % ONGLETS.length;
    if (k < 0) return;
    e.preventDefault();
    setOnglet(ONGLETS[k].id);
    tablist.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[k]?.focus();
  }

  const ouvert = jourMax !== null && jourMax >= 1;

  return (
    <div className="min-h-screen bg-[#0f1d3a] text-white [color-scheme:dark]">
      {/* LE CIEL : étoiles, sapin sous la neige, palmier au soleil, Ti Margo au milieu. */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0b1630] via-[#132a55] to-[#0f1d3a]">
        <Ciel />
        <div className="relative mx-auto max-w-5xl px-4 pb-6 pt-8 text-center sm:pb-10 sm:pt-12">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-amber-300">Du 1er au 24 décembre</p>
          <h1 className="mt-2 text-3xl font-black leading-tight sm:text-5xl">
            Noël avec <span className="text-amber-300">Ti Margo</span>
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-base text-sky-100 sm:text-lg">
            Un défi de maths par jour, sous la neige ou au soleil. Trois niveaux, du CP à la Terminale. Gratuit.
          </p>
          <Image
            src="/ti-margo/animations/salut.png"
            alt="Ti Margo, le margouillat, fait coucou"
            width={240}
            height={240}
            className="mx-auto mt-4 h-24 w-auto drop-shadow-[0_0_18px_rgba(252,211,77,0.35)] sm:h-32"
            priority
          />
        </div>
      </section>

      <main className="mx-auto max-w-5xl px-4 pb-16">
        <div
          ref={tablist}
          role="tablist"
          aria-label="Noël avec Ti Margo"
          onKeyDown={clavierOnglets}
          className="mx-auto -mt-2 flex w-full max-w-md gap-1 rounded-2xl bg-white/10 p-1 ring-1 ring-white/15"
        >
          {ONGLETS.map((o) => {
            const actif = o.id === onglet;
            return (
              <button
                key={o.id}
                role="tab"
                id={`noel-onglet-${o.id}`}
                aria-selected={actif}
                aria-controls="noel-panneau"
                tabIndex={actif ? 0 : -1}
                onClick={() => setOnglet(o.id)}
                className={`flex-1 whitespace-nowrap rounded-xl px-2 py-2.5 text-sm font-black transition sm:text-base ${
                  actif ? "bg-amber-300 text-[#0f1d3a] shadow" : "text-sky-100 hover:bg-white/10"
                }`}
              >
                <span aria-hidden="true" className="hidden sm:inline">{o.emoji} </span>{o.label}
              </button>
            );
          })}
        </div>

        <div id="noel-panneau" role="tabpanel" aria-labelledby={`noel-onglet-${onglet}`} className="mt-6">
          {onglet === "calendrier" && (
            <>
              <ChoixNiveau niveau={niveau} onChoix={choisirNiveau} />
              {jourMax === 0 && <AvantLeDebut />}
              <Grille jourMax={jourMax ?? 0} jour={ouvert ? jour : 0} onOuvrir={ouvrir} />
              {ouvert && (
                <div ref={zoneDefi} className="mt-8 scroll-mt-24">
                  <CarteDefi key={`${jour}-${niveau}`} jour={jour} niveau={niveau} />
                </div>
              )}
              <p className="mt-6 text-center text-sm text-sky-200">
                Une case s&rsquo;ouvre chaque jour à minuit. Tu as raté un jour ? Les cases passées restent ouvertes.
              </p>
            </>
          )}

          {onglet === "projeter" && (
            <Projection jourMax={jourMax ?? 0} jour={jour} setJour={setJour} niveau={niveau} onNiveau={choisirNiveau} />
          )}

          {onglet === "familles" && <Familles onCalendrier={() => setOnglet("calendrier")} />}
        </div>
      </main>
    </div>
  );
}

/* ─── Le dessin du ciel ──────────────────────────────────────────────────── */
function Ciel() {
  const etoiles = [
    [6, 18, 1.6], [14, 52, 1], [22, 12, 1.2], [31, 38, 0.9], [39, 8, 1.4], [47, 28, 1], [58, 14, 1.3],
    [64, 44, 0.9], [72, 9, 1.1], [80, 30, 1.5], [88, 16, 1], [95, 46, 1.2], [53, 50, 0.8], [27, 60, 0.8],
  ];
  return (
    <svg aria-hidden="true" className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
      {etoiles.map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y} r={r * 0.35} fill="#fde68a" opacity={0.85}>
          <animate attributeName="opacity" values="0.3;1;0.3" dur={`${2.5 + (i % 4)}s`} repeatCount="indefinite" />
        </circle>
      ))}
      {/* Sapin sous la neige, à gauche */}
      <g transform="translate(4 62)">
        <polygon points="6,0 0,14 12,14" fill="#166534" />
        <polygon points="6,8 -1.5,24 13.5,24" fill="#15803d" />
        <polygon points="6,0 3.5,6 8.5,6" fill="#f8fafc" />
        <rect x="5" y="24" width="2" height="5" fill="#78350f" />
        <polygon points="6,-3 6.8,-1 9,-1 7.2,0.3 7.8,2.4 6,1.1 4.2,2.4 4.8,0.3 3,-1 5.2,-1" fill="#fcd34d" />
      </g>
      {/* Palmier au soleil, à droite */}
      <g transform="translate(86 60)">
        <path d="M6 30 C 6.5 20, 5.5 12, 7 4" stroke="#a16207" strokeWidth="1.6" fill="none" />
        <path d="M7 4 C 2 2, -1 5, -2 8 M7 4 C 12 1, 15 4, 16 7 M7 4 C 5 -1, 2 -2, 0 -1 M7 4 C 9 -1, 13 -1, 14 0" stroke="#22c55e" strokeWidth="1.4" fill="none" />
        <circle cx="6.5" cy="5" r="0.9" fill="#fcd34d" />
      </g>
      <path d="M0 92 Q 25 86 50 91 T 100 89 L 100 100 L 0 100 Z" fill="#0f1d3a" />
    </svg>
  );
}

/* ─── Les trois niveaux ───────────────────────────────────────────────────── */
function ChoixNiveau({ niveau, onChoix, ardoise = false }: { niveau: Niveau; onChoix: (n: Niveau) => void; ardoise?: boolean }) {
  return (
    <div className="mx-auto flex max-w-lg justify-center gap-2" role="group" aria-label="Choisis ton niveau">
      {NIVEAUX.map((n) => {
        const actif = n.id === niveau;
        return (
          <button
            key={n.id}
            type="button"
            aria-pressed={actif}
            onClick={() => onChoix(n.id)}
            className={`flex-1 rounded-xl border-2 px-2 py-2 text-center font-black transition ${
              actif
                ? "border-amber-300 bg-amber-300/15 text-amber-200"
                : ardoise
                  ? "border-white/20 text-white/80 hover:border-white/50"
                  : "border-white/15 text-sky-100 hover:border-white/40"
            }`}
          >
            <span className="block text-sm sm:text-base">{n.label}</span>
            <span className="block text-xs font-bold opacity-80">{n.classes}</span>
          </button>
        );
      })}
    </div>
  );
}

function AvantLeDebut() {
  const [n, setN] = useState<number | null>(null);
  useEffect(() => {
    const auj = new Date();
    const debut = new Date(2026, 11, 1);
    setN(Math.max(1, Math.ceil((debut.getTime() - new Date(auj.getFullYear(), auj.getMonth(), auj.getDate()).getTime()) / 86400000)));
  }, []);
  return (
    <p className="mx-auto mt-6 max-w-md rounded-2xl bg-amber-300/10 px-4 py-3 text-center font-bold text-amber-100 ring-1 ring-amber-300/30">
      🎄 La première case s&rsquo;ouvre le mardi 1er décembre
      {n !== null && <> — dans {n} jour{n > 1 ? "s" : ""}</>}. Reviens vite !
    </p>
  );
}

/* ─── La grille des 24 cases ──────────────────────────────────────────────── */
function Grille({ jourMax, jour, onOuvrir }: { jourMax: number; jour: number; onOuvrir: (j: number) => void }) {
  return (
    <ol className="mx-auto mt-6 grid max-w-3xl grid-cols-4 gap-2 sm:grid-cols-6 sm:gap-3" aria-label="Les 24 cases du calendrier">
      {Array.from({ length: 24 }, (_, i) => i + 1).map((j) => {
        const ouverte = j <= jourMax;
        const aujourdHui = j === jourMax;
        const choisie = j === jour;
        const defi = DEFI_PAR_JOUR.get(j);
        if (!ouverte) {
          return (
            <li key={j}>
              <div
                className="flex aspect-square flex-col items-center justify-center rounded-2xl border-2 border-dashed border-white/15 bg-white/[0.04] text-sky-200/70"
                aria-label={`Case ${j}, fermée`}
              >
                <span className="text-2xl font-black sm:text-3xl">{j}</span>
                <span aria-hidden="true" className="text-xs">🔒</span>
              </div>
            </li>
          );
        }
        return (
          <li key={j}>
            <button
              type="button"
              onClick={() => onOuvrir(j)}
              aria-current={choisie ? "true" : undefined}
              aria-label={`Case ${j}${defi ? ` : ${defi.lieu}` : ""}${aujourdHui ? ", aujourd'hui" : ""}`}
              className={`flex aspect-square w-full flex-col items-center justify-center rounded-2xl border-2 transition hover:-translate-y-0.5 ${
                choisie
                  ? "border-amber-300 bg-amber-300 text-[#0f1d3a] shadow-[0_0_24px_rgba(252,211,77,0.45)]"
                  : "border-emerald-400/50 bg-emerald-700/40 text-white hover:border-amber-300"
              }`}
            >
              <span aria-hidden="true" className="text-xl sm:text-2xl">{defi?.emoji ?? "🎁"}</span>
              <span className="text-lg font-black leading-none sm:text-xl">{j}</span>
              {aujourdHui && (
                <span className="mt-0.5 text-[10px] font-black uppercase sm:text-xs">
                  <span className="sm:hidden">Auj.</span>
                  <span className="hidden sm:inline">Aujourd&rsquo;hui</span>
                </span>
              )}
            </button>
          </li>
        );
      })}
    </ol>
  );
}

/* ─── Un défi, avec ses trois choix ───────────────────────────────────────── */
function useReponse() {
  const [choisi, setChoisi] = useState<number | null>(null);
  return { choisi, setChoisi };
}

function Choix({ q, choisi, onChoix, grand = false }: { q: Question; choisi: number | null; onChoix: (i: number) => void; grand?: boolean }) {
  return (
    <div className={`grid gap-2 ${grand ? "sm:grid-cols-3 sm:gap-4" : "sm:grid-cols-3"}`}>
      {q.choix.map((c, i) => {
        const fini = choisi !== null;
        const bon = i === q.bonne;
        const etat = !fini
          ? "border-white/25 bg-white/5 hover:border-amber-300 hover:bg-white/10"
          : bon
            ? "border-emerald-400 bg-emerald-500/25"
            : i === choisi
              ? "border-orange-300/70 bg-orange-400/15 opacity-90"
              : "border-white/10 opacity-50";
        return (
          <button
            key={i}
            type="button"
            disabled={fini}
            onClick={() => onChoix(i)}
            className={`flex items-center gap-3 rounded-xl border-2 px-3 text-left font-black transition ${grand ? "py-4 text-2xl sm:text-4xl" : "py-3 text-lg"} ${etat}`}
          >
            <span className={`flex shrink-0 items-center justify-center rounded-lg bg-white/15 ${grand ? "h-10 w-10 text-xl sm:h-12 sm:w-12 sm:text-2xl" : "h-8 w-8 text-base"}`}>
              {LETTRES[i]}
            </span>
            <span>{c}</span>
            {fini && bon && <span aria-hidden="true" className="ml-auto">✅</span>}
          </button>
        );
      })}
    </div>
  );
}

function CarteDefi({ jour, niveau }: { jour: number; niveau: Niveau }) {
  const defi = DEFI_PAR_JOUR.get(jour);
  const { choisi, setChoisi } = useReponse();
  if (!defi) {
    return (
      <div className="rounded-3xl bg-white/5 p-6 text-center ring-1 ring-white/10">
        <p className="text-lg font-black">Case {jour}</p>
        <p className="mt-2 text-sky-100">Ti Margo emballe encore ce défi. Reviens un peu plus tard !</p>
      </div>
    );
  }
  const q = defi.questions[niveau];
  const nv = NIVEAUX.find((n) => n.id === niveau)!;
  return (
    <article className="mx-auto max-w-3xl rounded-3xl bg-white/[0.06] p-5 ring-1 ring-white/15 sm:p-7">
      <p className="text-sm font-black uppercase tracking-wide text-amber-300">
        {defi.emoji} Jour {jour} · {defi.lieu}
      </p>
      <p className="mt-1 text-xs font-bold text-sky-200">
        {nv.label} · {nv.classes}
      </p>
      <h2 className="mt-3 text-xl font-bold leading-snug sm:text-2xl">{q.enonce}</h2>
      <div className="mt-5">
        <Choix q={q} choisi={choisi} onChoix={setChoisi} />
      </div>
      {choisi !== null && (
        <div className="mt-5 rounded-2xl bg-[#0b1630] p-4 ring-1 ring-white/10" aria-live="polite">
          <p className="text-lg font-black">{choisi === q.bonne ? "🎉 Bravo, c'est juste !" : `La bonne réponse est ${LETTRES[q.bonne]}.`}</p>
          <p className="mt-1 text-sky-100">{q.solution}</p>
        </div>
      )}
    </article>
  );
}

/* ─── À projeter : fond ardoise, gros texte, solution sur demande ─────────── */
function Projection({
  jourMax,
  jour,
  setJour,
  niveau,
  onNiveau,
}: {
  jourMax: number;
  jour: number;
  setJour: (j: number) => void;
  niveau: Niveau;
  onNiveau: (n: Niveau) => void;
}) {
  const ardoise = useRef<HTMLDivElement>(null);
  const [solution, setSolution] = useState(false);
  const [choisi, setChoisi] = useState<number | null>(null);
  useEffect(() => {
    setSolution(false);
    setChoisi(null);
  }, [jour, niveau]);

  if (jourMax < 1) {
    return (
      <div className="space-y-4">
        <AvantLeDebut />
        <p className="text-center text-sky-100">Le défi du jour apparaîtra ici, en grand, sur fond d&rsquo;ardoise, pour le tableau de la classe.</p>
      </div>
    );
  }
  const defi = DEFI_PAR_JOUR.get(jour);
  const q = defi?.questions[niveau];

  function plein() {
    const el = ardoise.current;
    if (!el) return;
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    else el.requestFullscreen?.().catch(() => {});
  }

  return (
    <div>
      <div
        ref={ardoise}
        className="relative overflow-auto rounded-3xl border-[10px] border-[#7c5a3a] bg-[#2b3a33] p-5 text-white shadow-2xl sm:p-10 [&:fullscreen]:rounded-none [&:fullscreen]:border-0 [&:fullscreen]:p-[5vw]"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setJour(Math.max(1, jour - 1))}
              disabled={jour <= 1}
              className="rounded-lg border-2 border-white/30 px-3 py-1 text-xl font-black disabled:opacity-30"
              aria-label="Jour précédent"
            >
              ←
            </button>
            <p className="text-lg font-black text-amber-200 sm:text-2xl">
              {defi?.emoji} Jour {jour}
            </p>
            <button
              type="button"
              onClick={() => setJour(Math.min(jourMax, jour + 1))}
              disabled={jour >= jourMax}
              className="rounded-lg border-2 border-white/30 px-3 py-1 text-xl font-black disabled:opacity-30"
              aria-label="Jour suivant"
            >
              →
            </button>
          </div>
          <button type="button" onClick={plein} className="rounded-lg border-2 border-white/30 px-3 py-1 text-sm font-black hover:border-white/60">
            ⛶ Plein écran
          </button>
        </div>

        <div className="mt-4">
          <ChoixNiveau niveau={niveau} onChoix={onNiveau} ardoise />
        </div>

        {q ? (
          <>
            <p className="mt-6 text-sm font-bold uppercase tracking-wide text-white/70 sm:text-base">{defi!.lieu}</p>
            <p className="mt-2 font-[cursive] text-2xl leading-snug sm:text-4xl lg:text-5xl">{q.enonce}</p>
            <div className="mt-6">
              <Choix q={q} choisi={choisi} onChoix={setChoisi} grand />
            </div>
            <div className="mt-6 flex justify-center">
              {!solution ? (
                <button
                  type="button"
                  onClick={() => {
                    setSolution(true);
                    setChoisi((c) => (c === null ? q.bonne : c));
                  }}
                  className="rounded-xl bg-amber-300 px-5 py-3 text-lg font-black text-[#2b3a33]"
                >
                  Montrer la solution
                </button>
              ) : (
                <p className="max-w-3xl text-center text-xl leading-snug text-white/95 sm:text-3xl">{q.solution}</p>
              )}
            </div>
          </>
        ) : (
          <p className="mt-8 text-center text-2xl">Ti Margo emballe encore ce défi.</p>
        )}
      </div>
      <p className="mt-4 text-center text-sm text-sky-200">
        Pour la classe : projetez, laissez chercher deux minutes, faites voter A, B ou C à main levée, puis montrez la solution.
      </p>
    </div>
  );
}

/* ─── Familles : 10 minutes par jour pendant les vacances ─────────────────── */
function Familles({ onCalendrier }: { onCalendrier: () => void }) {
  const etapes = [
    {
      emoji: "🎁",
      titre: "1. Le défi du jour, ensemble",
      texte: "Ouvrez la case du jour. Chacun choisit son niveau : les petits, les moyens, les grands… et les parents !",
      lien: null,
    },
    {
      emoji: "🎯",
      titre: "2. Cinq minutes de coach",
      texte: "Une notion de la classe, quelques questions corrigées tout de suite. On garde la main sans y passer l'après-midi.",
      lien: { href: "/coach-ia/maths", label: "Ouvrir le coach" },
    },
    {
      emoji: "🎬",
      titre: "3. Une vidéo pour revoir",
      texte: "Une notion pas comprise avant les vacances ? Une vidéo courte, à regarder à deux, puis on refait un exercice.",
      lien: { href: "/video", label: "Les vidéos" },
    },
  ];
  return (
    <div>
      <h2 className="text-center text-2xl font-black sm:text-3xl">10 minutes par jour, pendant les vacances</h2>
      <p className="mx-auto mt-2 max-w-xl text-center text-sky-100">
        Pas besoin d&rsquo;un cahier de vacances entier. Un petit rituel chaque jour suffit pour revenir en janvier sans avoir tout oublié.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {etapes.map((e) => (
          <div key={e.titre} className="flex flex-col rounded-3xl bg-white/[0.06] p-5 ring-1 ring-white/15">
            <span aria-hidden="true" className="text-3xl">{e.emoji}</span>
            <h3 className="mt-2 text-lg font-black text-amber-200">{e.titre}</h3>
            <p className="mt-1 flex-1 text-sky-100">{e.texte}</p>
            {e.lien ? (
              <Link href={e.lien.href} className="mt-4 inline-block self-start rounded-xl bg-emerald-600 px-4 py-2 font-black text-white hover:bg-emerald-500">
                {e.lien.label} →
              </Link>
            ) : (
              <button type="button" onClick={onCalendrier} className="mt-4 self-start rounded-xl bg-emerald-600 px-4 py-2 font-black text-white hover:bg-emerald-500">
                Le calendrier →
              </button>
            )}
          </div>
        ))}
      </div>
      <p className="mx-auto mt-6 max-w-xl text-center text-sm text-sky-200">
        Noël sous la neige ou Noël en été, Hanoucca, Saint-Nicolas ou réveillon du Nouvel An : les défis font le tour du monde. Tout est gratuit.
      </p>
    </div>
  );
}
