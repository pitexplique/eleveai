// La PAGE D'ENTRÉE d'eleveai.fr — « choisis ton chemin » (01/11/2026).
//
// Frédéric : « lorsqu'on arrive sur eleveai.fr, il y a une page qui montre un
// choix : soit tu vas dans le coach, soit tu vas dans le journal d'EleveAI. En
// fond, un arbre avec deux branches, et le margouillat qui monte sur les deux
// branches. Choisis le chemin que tu vas prendre. » Et : « qu'on n'atterrisse
// pas directement sur la page d'accueil ».
//
// ⭐ L'ARBRE CHANGE CHAQUE JOUR (« Ti Margo monte sur un arbre, avec son
// contexte, que l'on mettra dans le journal ») : chêne, mélèze, hêtre, érable,
// arganier, baobab, fromager, parfois le tamarin des Hauts — un par pays,
// tiré par lib/accueil/arbre-du-jour.ts ; son histoire est dans le Journal.
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
import type { Arbre } from "@/lib/accueil/arbre-du-jour";

type Branche = "g" | "d";
type Chemin = "coach" | "journal";

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

/** Le feuillage au bout d'une branche (x = 20 à gauche, 80 à droite, x = 50 la couronne
 *  du milieu), selon l'arbre du jour. Il déborde SOUS les panneaux pour qu'on voie l'arbre. */
function Feuillage({ x, d, petit = false }: { x: number; d: Arbre["dessin"]; petit?: boolean }) {
  // Décalage vers l'intérieur de l'arbre : vers la droite à gauche, et inversement.
  const X = (dx: number) => x + (x < 50 ? dx : -dx);
  const k = petit ? 0.6 : 1;
  const y = petit ? 44 : 38;
  if (d.forme === "cone") {
    const cone = (dx: number, haut: number, large: number, bas: number) =>
      `${X(dx * k) - large * k},${y + bas * k} ${X(dx * k)},${y + haut * k} ${X(dx * k) + large * k},${y + bas * k}`;
    return (
      <g>
        <g fill={d.fonce}>
          <polygon points={cone(-9, -10, 6.5, 16)} />
          <polygon points={cone(9, -14, 6.5, 12)} />
          <polygon points={cone(0, -22, 8, 14)} />
        </g>
        <g fill={d.clair}>
          <polygon points={cone(0, -15, 4.5, 6)} />
          <polygon points={cone(-9, -4, 3.5, 11)} />
          <polygon points={cone(9, -8, 3.5, 7)} />
        </g>
      </g>
    );
  }
  if (d.forme === "parasol") {
    return (
      <g>
        <g fill={d.fonce}>
          <ellipse cx={X(1 * k)} cy={y} rx={18 * k} ry={7 * k} />
          <ellipse cx={X(-8 * k)} cy={y + 5 * k} rx={9 * k} ry={4 * k} />
          <ellipse cx={X(7 * k)} cy={y - 5 * k} rx={11 * k} ry={4.5 * k} />
        </g>
        <g fill={d.clair}>
          <ellipse cx={X(2 * k)} cy={y - 2 * k} rx={11 * k} ry={3.2 * k} />
          <ellipse cx={X(-8 * k)} cy={y + 4 * k} rx={5 * k} ry={2 * k} />
        </g>
      </g>
    );
  }
  return (
    <g>
      <g fill={d.fonce} opacity="0.95">
        <circle cx={X(-1 * k)} cy={y} r={13 * k} />
        <circle cx={X(10 * k)} cy={y - 5 * k} r={9 * k} />
        <circle cx={X(-11 * k)} cy={y + 6 * k} r={8 * k} />
        <circle cx={X(4 * k)} cy={y + 8 * k} r={8 * k} />
      </g>
      <g fill={d.clair}>
        <circle cx={X(3 * k)} cy={y - 3 * k} r={7 * k} />
        <circle cx={X(-7 * k)} cy={y + 4 * k} r={5 * k} />
      </g>
    </g>
  );
}

export default function ChoixEntree({ suite, arbre }: { suite: string; arbre: Arbre }) {
  // ⭐ « Le coach » mène à l'ACCUEIL (Frédéric, 01/11 : « si je clique sur le
  // coach, ça doit pas renvoyer à la page d'accueil ? ») : depuis le 31/10,
  // l'accueil EST la page du coach qui suit chaque élève (AccueilSuivi).
  const coach = `/accueil${suite}`;
  const journal = `/journal${suite}`;

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
        {/* L'arbre du jour (lib/accueil/arbre-du-jour.ts) : son histoire est dans le Journal. */}
        <p className="mt-2 text-center text-base font-semibold text-slate-700 sm:text-lg">
          Aujourd&apos;hui, Ti Margo grimpe sur {arbre.unNom} ({arbre.pays}).{" "}
          <a
            href={`${journal}#arbre-du-jour`}
            onClick={() => compter("journal")}
            className="whitespace-nowrap font-black text-emerald-800 underline underline-offset-4 hover:text-emerald-950"
          >
            Son histoire →
          </a>
        </p>

        {/* L'arbre : un carré, les deux panneaux posés au bout des branches. */}
        <div className="relative mt-8 aspect-square w-[min(100%,calc(100dvh-13rem))] min-w-[18rem] max-w-[46rem]">
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
            {/* la colline */}
            <ellipse cx="50" cy="104" rx="70" ry="12" fill="#86c46d" />
            <ellipse cx="50" cy="103" rx="58" ry="8" fill="#9ed37f" />
            {/* les feuillages, derrière les branches */}
            <Feuillage x={50} d={arbre.dessin} petit />
            <Feuillage x={20} d={arbre.dessin} />
            <Feuillage x={80} d={arbre.dessin} />
            {/* le tronc et les deux branches */}
            <g fill="none" stroke={arbre.dessin.tronc} strokeLinecap="round">
              <path d={TRONC} strokeWidth={arbre.dessin.epaisseur} />
              <path d="M50 60 C44 50 34 44 22 36" strokeWidth="5.5" />
              <path d="M50 60 C56 50 66 44 78 36" strokeWidth="5.5" />
            </g>
            <g fill="none" stroke="#000" strokeLinecap="round" strokeWidth="0.6" opacity="0.2">
              <path d="M48 92 C47 82 49 74 48 64" />
              <path d="M52 88 C53 80 51 72 52 66" />
            </g>
            {/* deux petites feuilles le long de chaque branche */}
            <g fill={arbre.dessin.fonce}>
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
      </div>
    </main>
  );
}
