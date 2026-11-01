// La PAGE D'ENTRÉE d'eleveai.fr — « choisis ton chemin » (01/11/2026).
//
// Frédéric : « lorsqu'on arrive sur eleveai.fr, il y a une page qui montre un
// choix : soit tu vas dans le coach, soit tu vas dans le journal d'EleveAI. En
// fond, un arbre avec deux branches, et le margouillat qui monte sur les deux
// branches. Choisis le chemin que tu vas prendre. » Et : « qu'on n'atterrisse
// pas directement sur la page d'accueil ».
//
// Ti Margo grimpe le tronc, hésite à la fourche (un bout de chaque branche),
// file vers la branche que le doigt survole, et court jusqu'au bout de celle
// qu'on clique avant que la page change.
// ⭐ Chaque clic est COMPTÉ dans Supabase (/api/choix-entree → supabase/choix_entree.sql).
// ⚠️ Les liens restent de vrais <a href> : Ctrl-clic, lecteur d'écran et
// « mouvement réduit » vont droit au but, sans animation.

"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import BandePays from "@/components/accueil/BandePays";

type Branche = "g" | "d";
type Chemin = "coach" | "journal" | "accueil";

// Le dessin vit dans un carré 100 × 100. Les deux chemins partagent le tronc.
const TRONC = "M50 97 C49 85 51 72 50 60";
const CHEMIN: Record<Branche, string> = {
  g: `${TRONC} C44 50 34 44 22 36`,
  d: `${TRONC} C56 50 66 44 78 36`,
};

const VITESSE = 0.16; // part du chemin par seconde, en flânant
const VITESSE_COURSE = 0.9;

function compter(chemin: Chemin) {
  try {
    const corps = new Blob([JSON.stringify({ chemin })], { type: "application/json" });
    if (!navigator.sendBeacon?.("/api/choix-entree", corps)) {
      void fetch("/api/choix-entree", { method: "POST", body: corps, keepalive: true });
    }
  } catch {
    // Compter ne doit jamais retenir l'élève.
  }
}

export default function ChoixEntree({ suite }: { suite: string }) {
  const coach = `/coach-ia/maths${suite}`;
  const journal = `/journal${suite}`;
  const accueil = `/accueil${suite}`;

  const chemins = useRef<Record<Branche, SVGPathElement | null>>({ g: null, d: null });
  const margo = useRef<HTMLDivElement>(null);
  // Où est Ti Margo : sur quelle branche, à quelle part du chemin (0 = pied du tronc, 1 = bout).
  const pos = useRef<{ b: Branche; t: number }>({ b: "g", t: 0 });
  const cible = useRef<{ b: Branche; t: number; vite: boolean } | null>(null);
  const survol = useRef<Branche | null>(null);
  const arrivee = useRef<(() => void) | null>(null);
  const [parti, setParti] = useState<Branche | null>(null);

  useEffect(() => {
    const g = chemins.current.g;
    if (!g || !margo.current) return;
    const total = g.getTotalLength();
    const fourche = (() => {
      const tronc = document.createElementNS("http://www.w3.org/2000/svg", "path");
      tronc.setAttribute("d", TRONC);
      return tronc.getTotalLength() / total;
    })();
    const calme = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (calme) pos.current.t = fourche;

    // La promenade quand personne ne choisit : un bout de branche à gauche, la fourche, un bout à droite…
    const balade: { b: Branche; t: number }[] = [
      { b: "g", t: fourche + (1 - fourche) * 0.45 },
      { b: "g", t: fourche },
      { b: "d", t: fourche + (1 - fourche) * 0.45 },
      { b: "d", t: fourche },
    ];
    let etape = 0;
    let pause = 0.5;
    let avant = performance.now();
    let id = 0;

    const placer = () => {
      const p = chemins.current[pos.current.b]!;
      const l = pos.current.t * total;
      const a = p.getPointAtLength(Math.max(0, l - 0.5));
      const z = p.getPointAtLength(Math.min(total, l + 0.5));
      const m = p.getPointAtLength(l);
      const angle = (Math.atan2(z.y - a.y, z.x - a.x) * 180) / Math.PI + 90;
      margo.current!.style.left = `${m.x}%`;
      margo.current!.style.top = `${m.y}%`;
      margo.current!.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
    };

    const tick = (maintenant: number) => {
      const dt = Math.min(0.05, (maintenant - avant) / 1000);
      avant = maintenant;
      if (!calme) {
        let but: { b: Branche; t: number; vite: boolean } | null = cible.current;
        if (!but && survol.current) but = { b: survol.current, t: fourche + (1 - fourche) * 0.7, vite: false };
        if (!but) {
          if (pos.current.t < fourche - 0.001) but = { b: pos.current.b, t: fourche, vite: false }; // la montée du début
          else {
            const ici = balade[etape];
            if (ici.b === pos.current.b && Math.abs(ici.t - pos.current.t) < 0.002) {
              // Arrivé : une petite pause, puis l'étape suivante.
              if (pause > 0) pause -= dt;
              else {
                etape = (etape + 1) % balade.length;
                pause = etape % 2 === 1 ? 0.7 : 0.3;
              }
            } else but = { ...ici, vite: false };
          }
        }
        if (but) {
          // Le tronc est commun ; changer de branche, c'est redescendre à la fourche d'abord.
          let visee = but.t;
          if (but.b !== pos.current.b) {
            if (pos.current.t <= fourche + 0.0001) pos.current.b = but.b;
            else visee = fourche;
          }
          const pas = (but.vite ? VITESSE_COURSE : VITESSE) * dt;
          const ecart = visee - pos.current.t;
          pos.current.t += Math.abs(ecart) <= pas ? ecart : Math.sign(ecart) * pas;
        }
        if (cible.current && pos.current.b === cible.current.b && pos.current.t >= 0.999) {
          arrivee.current?.();
          arrivee.current = null;
        }
      }
      placer();
      id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, []);

  function choisir(e: MouseEvent<HTMLAnchorElement>, chemin: Chemin, href: string, b?: Branche) {
    compter(chemin);
    if (!b || e.ctrlKey || e.metaKey || e.shiftKey || e.button !== 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    e.preventDefault();
    if (parti) return;
    setParti(b);
    let fait = false;
    const aller = () => {
      if (fait) return;
      fait = true;
      window.location.href = href;
    };
    arrivee.current = aller;
    cible.current = { b, t: 1, vite: true };
    window.setTimeout(aller, 1400); // filet : on part même si l'animation traîne
  }

  const survoler = (b: Branche | null) => () => {
    survol.current = b;
  };

  return (
    <main className="fixed inset-0 z-[200] overflow-y-auto bg-gradient-to-b from-sky-200 via-sky-50 to-emerald-50 text-slate-900">
      <div className="mx-auto flex min-h-full max-w-5xl flex-col items-center justify-center px-4 pb-6 pt-3 sm:pt-5">
        {/* Les pays, tout en haut (Frédéric, 01/11 : « rajoute en haut les pays ») :
            la même bande que le Journal, chaque pays mène à son coach. */}
        <div className="mb-4 w-full max-w-4xl [&>section]:justify-center [&>section]:bg-white/80">
          <BandePays />
        </div>
        <p className="text-sm font-black tracking-wide text-emerald-800 sm:text-base">EleveAI</p>
        <h1 className="mt-1 text-center text-3xl font-black leading-tight sm:text-5xl">
          Quel chemin prends-tu&nbsp;?
        </h1>
        <p className="mt-2 text-center text-base font-semibold text-slate-700 sm:text-lg">
          Ti Margo t&apos;attend à la fourche.
        </p>

        {/* L'arbre : un carré, les deux panneaux posés au bout des branches. */}
        <div className="relative mt-8 aspect-square w-[min(100%,calc(100dvh-13rem))] min-w-[18rem] max-w-[46rem]">
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
            {/* la colline */}
            <ellipse cx="50" cy="104" rx="70" ry="12" fill="#86c46d" />
            <ellipse cx="50" cy="103" rx="58" ry="8" fill="#9ed37f" />
            {/* les feuillages, derrière les branches */}
            <g fill="#4f9d3a" opacity="0.95">
              <circle cx="18" cy="31" r="10" />
              <circle cx="28" cy="27" r="8" />
              <circle cx="11" cy="38" r="6" />
              <circle cx="82" cy="31" r="10" />
              <circle cx="72" cy="27" r="8" />
              <circle cx="89" cy="38" r="6" />
            </g>
            <g fill="#6cbf4f">
              <circle cx="22" cy="28" r="6.5" />
              <circle cx="14" cy="34" r="4.5" />
              <circle cx="78" cy="28" r="6.5" />
              <circle cx="86" cy="34" r="4.5" />
            </g>
            {/* le tronc et les deux branches */}
            <g fill="none" stroke="#7a4b2a" strokeLinecap="round">
              <path d={TRONC} strokeWidth="9" />
              <path d="M50 60 C44 50 34 44 22 36" strokeWidth="5.5" />
              <path d="M50 60 C56 50 66 44 78 36" strokeWidth="5.5" />
            </g>
            <g fill="none" stroke="#5d371d" strokeLinecap="round" strokeWidth="0.6" opacity="0.6">
              <path d="M48 92 C47 82 49 74 48 64" />
              <path d="M52 88 C53 80 51 72 52 66" />
            </g>
            {/* deux petites feuilles le long de chaque branche */}
            <g fill="#4f9d3a">
              <ellipse cx="38" cy="45" rx="2.6" ry="1.3" transform="rotate(-35 38 45)" />
              <ellipse cx="62" cy="45" rx="2.6" ry="1.3" transform="rotate(35 62 45)" />
              <ellipse cx="44" cy="54" rx="2.2" ry="1.1" transform="rotate(20 44 54)" />
              <ellipse cx="56" cy="54" rx="2.2" ry="1.1" transform="rotate(-20 56 54)" />
            </g>
            {/* les chemins que suit Ti Margo (invisibles) */}
            <path ref={(p) => { chemins.current.g = p; }} d={CHEMIN.g} fill="none" stroke="none" />
            <path ref={(p) => { chemins.current.d = p; }} d={CHEMIN.d} fill="none" stroke="none" />
          </svg>

          {/* Ti Margo */}
          <div
            ref={margo}
            className="pointer-events-none absolute w-[13%]"
            style={{ left: "50%", top: "97%", transform: "translate(-50%, -50%)" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/cahier-vacances/ti-margo.png" alt="" width={1122} height={1402} className="h-auto w-full drop-shadow" />
          </div>

          {/* Les deux panneaux */}
          <a
            href={coach}
            onClick={(e) => choisir(e, "coach", coach, "g")}
            onMouseEnter={survoler("g")}
            onMouseLeave={survoler(null)}
            onFocus={survoler("g")}
            onBlur={survoler(null)}
            className={`absolute left-[20%] top-[16%] w-[42%] max-w-[17rem] -translate-x-1/2 -translate-y-1/2 rounded-3xl border-4 border-emerald-600 bg-white/95 px-3 py-3 text-center shadow-xl transition hover:-translate-y-[55%] hover:scale-105 focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-400 sm:px-5 sm:py-4 ${
              parti === "d" ? "opacity-40" : ""
            }`}
          >
            <span className="block text-3xl sm:text-5xl" aria-hidden="true">🎯</span>
            <span className="mt-1 block text-lg font-black leading-tight text-emerald-800 sm:text-2xl">Le coach</span>
            <span className="mt-1 block text-xs font-semibold leading-snug text-slate-700 sm:text-base">
              Je m&apos;entraîne, il garde mes progrès.
            </span>
          </a>
          <a
            href={journal}
            onClick={(e) => choisir(e, "journal", journal, "d")}
            onMouseEnter={survoler("d")}
            onMouseLeave={survoler(null)}
            onFocus={survoler("d")}
            onBlur={survoler(null)}
            className={`absolute left-[80%] top-[16%] w-[42%] max-w-[17rem] -translate-x-1/2 -translate-y-1/2 rounded-3xl border-4 border-amber-500 bg-white/95 px-3 py-3 text-center shadow-xl transition hover:-translate-y-[55%] hover:scale-105 focus:outline-none focus-visible:ring-4 focus-visible:ring-amber-300 sm:px-5 sm:py-4 ${
              parti === "g" ? "opacity-40" : ""
            }`}
          >
            <span className="block text-3xl sm:text-5xl" aria-hidden="true">📰</span>
            <span className="mt-1 block text-lg font-black leading-tight text-amber-700 sm:text-2xl">
              Le Journal d&apos;EleveAI
            </span>
            <span className="mt-1 block text-xs font-semibold leading-snug text-slate-700 sm:text-base">
              Une chose utile à apprendre aujourd&apos;hui.
            </span>
          </a>
        </div>

        <a
          href={accueil}
          onClick={(e) => choisir(e, "accueil", accueil)}
          className="mt-3 text-sm font-semibold text-slate-600 underline underline-offset-4 hover:text-slate-900"
        >
          Parent ou professeur&nbsp;? Voir tout le site
        </a>
      </div>
    </main>
  );
}
