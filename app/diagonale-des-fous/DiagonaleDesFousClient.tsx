"use client";

// « La Diagonale des Fous » — l'article-machine du journal (rubrique « Un peu de
// maths »). Le Grand Raid de La Réunion traduit en équation différentielle : la
// RÉSERVE d'énergie du coureur se vide d'autant plus vite qu'il pousse fort (au
// CARRÉ de l'effort) et que la pente monte : dR/dt = −c · effort² · (1 + pente).
// L'élève A LA MAIN sur l'allure. Trop vite, il tape le mur avant l'arrivée ;
// trop lent, la barrière des 66 h le rattrape. Le bon dosage vide la réserve
// PILE à Saint-Denis — la sagesse des traileurs, démontrée.
//
// Contrainte (Frédéric) : IMAGE (le profil) + RÉGLAGE (l'allure) + RÉSULTAT (la
// course) tiennent sur un SEUL écran, pour la vidéoprojection et le mobile. Le
// reste (les maths, les défis, l'histoire) se déroule dessous.

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import DefisSimulateur, {
  type DefiSimulateur,
  type CouleursDefis,
} from "@/components/simulateurs/DefisSimulateur";

const VERT = "#1f6b3a"; // l'encre — le relief
const OR = "#c8962a"; // les repères
const FEU = "#e0561a"; // le coureur, le chemin parcouru

// Le profil (simplifié) de la traversée Saint-Pierre → Saint-Denis : [km, alt m].
// Ordres de grandeur des grands passages du Grand Raid, pas un relevé GPS.
const PTS: [number, number][] = [
  [0, 50],
  [25, 2100],
  [45, 1200],
  [70, 2000],
  [100, 1100],
  [130, 2200],
  [150, 1500],
  [165, 20],
];
const L = 165; // km
const BARRIERE = 66; // h
const DT = 0.1; // pas d'intégration (h)
const C = 0.05; // coefficient de dépense

const WPS: [number, string][] = [
  [0, "St-Pierre"],
  [45, "Cilaos"],
  [100, "Mafate"],
  [130, "Roche Écrite"],
  [165, "St-Denis"],
];

const COULEURS_DEFIS: CouleursDefis = {
  fond: "#f4faf5",
  fondProfond: "#e7f3ea",
  bord: "#bfe0c8",
  accent: VERT,
  texte: "#22402c",
  sousTexte: "#5f8a6d",
  ok: "#1a7f37",
  rate: "#b3261e",
};

// La rampe CP → Terminale : la MÊME question (« comment doser sa course ? »),
// un outil qui grandit — de l'addition à la méthode d'Euler. Réponse numérique
// unique par carte, id stable (ces défis compteront à terme dans l'éval).
const DEFIS: DefiSimulateur[] = [
  {
    id: "raid-cp-montee",
    question:
      "CP · CE1 — Sur un bout de sentier tu montes de 200 m, puis encore de 150 m. Combien de mètres as-tu montés en tout ?",
    reponse: 350,
    unite: "m",
    indice: "C'est une addition : 200 + 150.",
    calcul: "200 + 150 = 350 m de montée.",
    tolerance: 0.5,
  },
  {
    id: "raid-cm1-pente",
    question:
      "CE2 · CM1 — Tu montes de 600 m sur 6 km de sentier. Combien de mètres montes-tu, en moyenne, par kilomètre ?",
    reponse: 100,
    unite: "m/km",
    indice: "La pente = le dénivelé ÷ la distance : 600 ÷ 6.",
    calcul: "600 ÷ 6 = 100 m/km — c'est ça, la pente.",
    tolerance: 0.5,
  },
  {
    id: "raid-cm2-reste",
    question:
      "CM2 — La course fait 165 km. Tu en as parcouru 120. Combien de kilomètres te reste-t-il ?",
    reponse: 45,
    unite: "km",
    indice: "Une soustraction : 165 − 120.",
    calcul: "165 − 120 = 45 km restants.",
    tolerance: 0.5,
  },
  {
    id: "raid-6e-pourcent",
    question:
      "6ᵉ · 5ᵉ — La barrière est à 66 h. Tu cours depuis 33 h. Quel POURCENTAGE du temps limite as-tu déjà utilisé ?",
    reponse: 50,
    unite: "%",
    indice: "Calcule 33 ÷ 66, puis convertis en pourcentage.",
    calcul: "33 ÷ 66 = 0,5 = 50 % du temps limite.",
    tolerance: 0.5,
  },
  {
    id: "raid-4e-vitesse",
    question:
      "4ᵉ · 3ᵉ — Tu parcours 132 km en 44 h. Quelle est ta vitesse moyenne, en km/h ?",
    reponse: 3,
    unite: "km/h",
    indice: "La vitesse = la distance ÷ le temps : 132 ÷ 44.",
    calcul: "132 ÷ 44 = 3 km/h — l'allure moyenne d'un ultra de montagne.",
    tolerance: 0.2,
  },
  {
    id: "raid-2nde-carre",
    question:
      "2ⁿᵈᵉ — La dépense d'énergie est proportionnelle au CARRÉ de l'effort. À l'effort 3, elle vaut 9. Combien vaut-elle à l'effort 6 ?",
    reponse: 36,
    unite: "",
    indice: "Élève l'effort au carré : 6².",
    calcul: "6² = 36 : doubler l'allure ne double pas la dépense, il la quadruple. C'est le cœur de l'équation.",
    tolerance: 0.5,
  },
  {
    id: "raid-1re-vidage",
    question:
      "1ʳᵉ — À allure constante, ta réserve part de 100 et se vide de 2,5 par heure. Au bout de combien d'heures est-elle vide ?",
    reponse: 40,
    unite: "h",
    indice: "Divise la réserve par la vitesse à laquelle elle se vide : 100 ÷ 2,5.",
    calcul: "100 ÷ 2,5 = 40 h : quand dR/dt est constant, la réserve descend en droite.",
    tolerance: 0.5,
  },
  {
    id: "raid-term-euler",
    question:
      "Terminale — Méthode d'Euler, pas de temps 0,5 h. La réserve vaut 80 et se vide à 4 par heure (dR/dt = −4). Quelle réserve estime-t-on au pas suivant ?",
    reponse: 78,
    unite: "",
    indice: "R(t+dt) = R(t) + R′(t) × dt = 80 + (−4) × 0,5.",
    calcul: "80 + (−4) × 0,5 = 78 : un petit pas de la vitesse ajoute un petit morceau à la réserve. C'est exactement ce que fait la machine, image après image.",
    tolerance: 0.5,
  },
];

// --- Le modèle (intégré pas à pas, méthode d'Euler) --------------------------
function segIndex(x: number) {
  let i = 0;
  while (i < PTS.length - 2 && x > PTS[i + 1][0]) i++;
  return i;
}
function altAt(x: number) {
  x = Math.max(0, Math.min(L, x));
  const i = segIndex(x);
  const a = PTS[i];
  const b = PTS[i + 1];
  return a[1] + (b[1] - a[1]) * ((x - a[0]) / (b[0] - a[0]));
}
function gradeAt(x: number) {
  x = Math.max(0, Math.min(L, x));
  const i = segIndex(x);
  const a = PTS[i];
  const b = PTS[i + 1];
  return (b[1] - a[1]) / (b[0] - a[0]); // m/km
}

type Statut = "pret" | "course" | "fini" | "hors-delai";
type Etat = { x: number; t: number; R: number; wall: number | null; status: Statut; v: number };
const ETAT0: Etat = { x: 0, t: 0, R: 100, wall: null, status: "pret", v: 0 };

// Un pas de temps : on connaît la VITESSE à laquelle la réserve se vide ici et
// maintenant (l'effort, la pente), pas la réserve d'avance — on avance d'un cran.
function avancer(s: Etat, e: number) {
  const g = gradeAt(s.x);
  const up = Math.max(g, 0);
  const base = 0.5 + 0.7 * e; // km/h sur le plat
  let v = g >= 0 ? base / (1 + up / 120) : base * (1 + Math.min(-g / 400, 0.4));
  if (s.R <= 0) v = Math.min(v, 1); // le mur : on ne fait plus que marcher
  if (s.R > 0) {
    s.R += -C * e * e * (1 + up / 200) * DT; // dR = −c · effort² · (1 + pente) · dt
    if (s.R <= 0) {
      s.R = 0;
      if (s.wall == null) s.wall = s.x;
    }
  }
  s.x += v * DT;
  s.t += DT;
  s.v = v;
  if (s.x >= L) {
    s.x = L;
    s.status = "fini";
  } else if (s.t >= BARRIERE) {
    s.status = "hors-delai";
  }
}

// --- La carte (viewBox) ------------------------------------------------------
const VBW = 1000;
const VBH = 254;
const padL = 42;
const padR = 16;
const padT = 26;
const padB = 32;
const Xp = (km: number) => padL + (km / L) * (VBW - padL - padR);
const Yp = (al: number) => VBH - padB - (al / 2400) * (VBH - padT - padB);

export default function DiagonaleDesFousClient() {
  const [allure, setAllure] = useState(6); // le RÉGLAGE : 1 = flâner, 10 = sprint
  const [disp, setDisp] = useState<Etat>({ ...ETAT0 });
  const [modeClasse, setModeClasse] = useState(false);

  const simRef = useRef<Etat>({ ...ETAT0 });
  const allureRef = useRef(allure);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    allureRef.current = allure;
  }, [allure]);

  useEffect(() => {
    setModeClasse(localStorage.getItem("eleveai-mode-classe") === "1");
  }, []);
  const basculerModeClasse = () => {
    setModeClasse((v) => {
      localStorage.setItem("eleveai-mode-classe", v ? "0" : "1");
      return !v;
    });
  };

  const stopLoop = () => {
    if (intervalRef.current != null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => () => stopLoop(), []);

  // La course avance par petits pas de temps (méthode d'Euler). setInterval
  // plutôt que requestAnimationFrame : l'animation tourne de façon fiable, même
  // hors du premier plan, et reste fluide côté élève.
  const partir = () => {
    stopLoop();
    simRef.current = { ...ETAT0, status: "course" };
    setDisp({ ...simRef.current });
    intervalRef.current = setInterval(() => {
      const s = simRef.current;
      for (let i = 0; i < 8 && s.status === "course"; i++) avancer(s, allureRef.current);
      setDisp({ ...s });
      if (s.status !== "course") stopLoop();
    }, 30);
  };

  // Régler l'allure quand on n'est pas en course remet le coureur au départ :
  // on invite à relancer avec le nouveau dosage.
  const changerAllure = (val: number) => {
    setAllure(val);
    if (simRef.current.status !== "course") {
      simRef.current = { ...ETAT0 };
      setDisp({ ...ETAT0 });
    }
  };

  // Le profil (statique) et son remplissage — calculés une fois.
  const profil = useMemo(() => {
    let line = `M ${Xp(0).toFixed(1)} ${Yp(altAt(0)).toFixed(1)}`;
    for (let km = 1; km <= L; km++) line += ` L ${Xp(km).toFixed(1)} ${Yp(altAt(km)).toFixed(1)}`;
    const fill = `${line} L ${Xp(L).toFixed(1)} ${VBH - padB} L ${Xp(0).toFixed(1)} ${VBH - padB} Z`;
    return { line, fill };
  }, []);

  // Le chemin parcouru — recalculé au fil de la course.
  const couvert = useMemo(() => {
    let d = `M ${Xp(0).toFixed(1)} ${Yp(altAt(0)).toFixed(1)}`;
    for (let km = 0.5; km <= disp.x; km += 0.5) d += ` L ${Xp(km).toFixed(1)} ${Yp(altAt(km)).toFixed(1)}`;
    d += ` L ${Xp(disp.x).toFixed(1)} ${Yp(altAt(disp.x)).toFixed(1)}`;
    return d;
  }, [disp.x]);

  const up = Math.max(gradeAt(disp.x), 0);
  const depense = disp.status !== "pret" && disp.R <= 0 ? 0 : C * allure * allure * (1 + up / 200);

  const couleurReserve = disp.R > 50 ? "#1a7f37" : disp.R > 20 ? OR : "#b3261e";
  const grand = modeClasse ? "text-2xl sm:text-3xl" : "text-lg sm:text-xl";
  const fWp = modeClasse ? 20 : 14;
  const fAxis = modeClasse ? 17 : 12;

  const verdict = (() => {
    if (disp.status === "pret")
      return { texte: "Règle ton allure, puis « Départ ». Vise à vider la réserve pile à l'arrivée.", couleur: "#3f6650" };
    if (disp.status === "course") return { texte: "En course…", couleur: "#5f8a6d" };
    const mur = disp.wall != null ? ` (mur passé au km ${Math.round(disp.wall)})` : "";
    if (disp.status === "fini")
      return { texte: `Arrivée à Saint-Denis en ${Math.round(disp.t)} h — dans les temps ✓${mur}`, couleur: "#1a7f37" };
    return { texte: `Barrière des 66 h — arrêt au km ${Math.round(disp.x)} ✗${mur}`, couleur: "#b3261e" };
  })();

  const runnerX = Xp(disp.x);
  const runnerY = Yp(altAt(disp.x));

  return (
    <main
      className="min-h-screen pb-14"
      style={{
        backgroundColor: "#fbfdf9",
        backgroundImage:
          "linear-gradient(#cfe8d430 1px, transparent 1px), linear-gradient(90deg, #cfe8d430 1px, transparent 1px)",
        backgroundSize: "25px 25px",
        color: "#22402c",
      }}
    >
      <div className="mx-auto max-w-3xl px-4 pt-6">
        <p className="text-[11px] font-black uppercase tracking-[0.22em]" style={{ color: OR }}>
          Un peu de maths · La rubrique du prof
        </p>
        <h1 className="mt-1 font-serif text-3xl font-black leading-tight sm:text-4xl" style={{ color: VERT }}>
          La Diagonale des Fous
        </h1>
        <p className="mt-1 text-lg font-black" style={{ color: OR }}>
          Doser sa réserve — une équation différentielle
        </p>
        <p className="mt-1 text-[13px]" style={{ color: "#5f8a6d" }}>
          165 km, barrière à 66 h — règle l&apos;allure et lance la course.{" "}
          <a
            href="https://youtu.be/MF7G9VhU07I"
            target="_blank"
            rel="noopener noreferrer"
            className="font-black hover:underline"
            style={{ color: "#c81e1e" }}
          >
            ▶ voir la vidéo (1 min)
          </a>
        </p>

        {/* ── LA MACHINE : image + réglage + résultat, sur un seul écran ── */}
        <div className="mt-3 rounded border p-3 sm:p-4" style={{ borderColor: "#cfe6d5", backgroundColor: "#ffffffcc" }}>
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <p className="text-[11px] font-black uppercase tracking-[0.18em]" style={{ color: OR }}>
              Le profil de l&apos;île — Saint-Pierre → Saint-Denis
            </p>
            <button
              type="button"
              onClick={basculerModeClasse}
              className="rounded border px-2 py-0.5 text-[11px] font-bold"
              style={{ borderColor: "#cfe6d5", color: "#5f8a6d" }}
            >
              {modeClasse ? "🖥️ mode classe : ON" : "🖥️ mode classe"}
            </button>
          </div>

          {/* L'IMAGE : le profil, le chemin parcouru, le coureur */}
          <svg
            viewBox={`0 0 ${VBW} ${VBH}`}
            className="mt-2 w-full"
            role="img"
            aria-label={`Profil d'altitude de la traversée de La Réunion, de Saint-Pierre (0 km) à Saint-Denis (165 km), avec les grands passages Cilaos, Mafate et la Roche Écrite. Le coureur est au kilomètre ${Math.round(
              disp.x,
            )}, réserve d'énergie ${Math.round(disp.R)} %.`}
          >
            {/* altitudes de repère */}
            {[0, 1000, 2000].map((al) => (
              <g key={al}>
                <line x1={padL} y1={Yp(al)} x2={VBW - padR} y2={Yp(al)} stroke="#cfe6d5" strokeWidth="1" />
                <text x={padL - 6} y={Yp(al) + 4} textAnchor="end" fontSize={fAxis} fill="#8bb097">
                  {al}
                </text>
              </g>
            ))}
            {/* la montagne */}
            <path d={profil.fill} fill={VERT} opacity="0.10" />
            <path d={profil.line} fill="none" stroke={VERT} strokeWidth="2" strokeLinejoin="round" />
            {/* le chemin déjà couru */}
            <path d={couvert} fill="none" stroke={FEU} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            {/* les grands passages */}
            {WPS.map(([km, nom], i) => (
              <g key={km}>
                <circle cx={Xp(km)} cy={Yp(altAt(km))} r="2.6" fill={VERT} />
                <text
                  x={Xp(km)}
                  y={Yp(altAt(km)) - 8}
                  textAnchor={i === 0 ? "start" : i === WPS.length - 1 ? "end" : "middle"}
                  fontSize={fWp}
                  fontWeight={700}
                  fill={VERT}
                >
                  {nom}
                </text>
              </g>
            ))}
            {/* le coureur */}
            <circle cx={runnerX} cy={runnerY} r={modeClasse ? 8 : 6} fill={FEU} stroke="#fff" strokeWidth="2" />
            {/* l'arrivée */}
            <text x={Xp(L)} y={VBH - 12} textAnchor="end" fontSize={fAxis} fill="#8bb097">
              165 km 🏁
            </text>
            <text x={Xp(0)} y={VBH - 12} textAnchor="start" fontSize={fAxis} fill="#8bb097">
              0 km
            </text>
          </svg>

          {/* LE RÉSULTAT : les compteurs */}
          <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
            <div className="rounded border p-2 text-center" style={{ borderColor: "#cfe6d5" }}>
              <p className="text-[10.5px] font-bold" style={{ color: "#5f8a6d" }}>Distance</p>
              <p className={`font-black ${grand}`} style={{ color: VERT }}>
                {Math.round(disp.x)}
                <span className="text-[11px] font-bold" style={{ color: "#8bb097" }}> / 165 km</span>
              </p>
            </div>
            <div className="rounded border p-2 text-center" style={{ borderColor: "#cfe6d5" }}>
              <p className="text-[10.5px] font-bold" style={{ color: "#5f8a6d" }}>Temps</p>
              <p className={`font-black ${grand}`} style={{ color: disp.t > BARRIERE * 0.85 ? "#b3261e" : VERT }}>
                {Math.round(disp.t)}
                <span className="text-[11px] font-bold" style={{ color: "#8bb097" }}> / 66 h</span>
              </p>
            </div>
            <div className="rounded border p-2 text-center" style={{ borderColor: "#cfe6d5" }}>
              <p className="text-[10.5px] font-bold" style={{ color: "#5f8a6d" }}>Réserve</p>
              <p className={`font-black ${grand}`} style={{ color: couleurReserve }}>
                {Math.round(disp.R)}<span className="text-[11px] font-bold"> %</span>
              </p>
              <div className="mt-0.5 h-1.5 w-full overflow-hidden rounded-full" style={{ backgroundColor: "#e7f3ea" }}>
                <div className="h-full rounded-full transition-all" style={{ width: `${Math.max(0, disp.R)}%`, backgroundColor: couleurReserve }} />
              </div>
            </div>
            <div className="rounded border p-2 text-center" style={{ borderColor: "#cfe6d5" }}>
              <p className="text-[10.5px] font-bold" style={{ color: "#5f8a6d" }}>Vitesse</p>
              <p className={`font-black ${grand}`} style={{ color: VERT }}>
                {disp.status === "pret" ? "—" : disp.v.toFixed(1)}
                <span className="text-[11px] font-bold" style={{ color: "#8bb097" }}> km/h</span>
              </p>
            </div>
          </div>

          <p className="mt-2 text-center text-[13.5px] font-bold" style={{ color: verdict.couleur }}>
            {verdict.texte}
          </p>

          {/* LE RÉGLAGE : l'allure + le départ */}
          <div className="mt-2 flex flex-wrap items-center gap-3 border-t pt-3" style={{ borderColor: "#e2efe6" }}>
            <label htmlFor="allure" className="flex flex-1 items-center gap-3 text-sm font-black" style={{ color: VERT }}>
              Allure
              <input
                id="allure"
                type="range"
                min={1}
                max={10}
                step={1}
                value={allure}
                onChange={(e) => changerAllure(parseInt(e.target.value, 10))}
                className="h-2 flex-1 cursor-pointer"
                style={{ accentColor: FEU }}
              />
              <span className="w-6 text-right font-mono">{allure}</span>
            </label>
            <button
              type="button"
              onClick={partir}
              className="rounded px-5 py-2 text-sm font-black text-white hover:brightness-110"
              style={{ backgroundColor: FEU }}
            >
              {disp.status === "course" ? "Course…" : disp.status === "pret" ? "Départ" : "Relancer"}
            </button>
          </div>

          <p className="mt-2 rounded border px-3 py-2 text-[12.5px]" style={{ borderColor: "#e2efe6", backgroundColor: "#f7fbf8", color: "#3f6650" }}>
            <span className="font-mono font-bold" style={{ color: VERT }}>dR/dt = −c · effort² · (1 + pente)</span>{" "}
            — <b>dR/dt</b>, c&apos;est la <b>variation de ta réserve</b> à chaque instant. Doubler l&apos;allure = ×4 la dépense ; les montées la vident plus vite. Dépense actuelle :{" "}
            <b className="font-mono">{depense.toFixed(1)}</b> /h.
          </p>
        </div>

        {/* ── CE QUE DIT L'ÉQUATION ── */}
        <div className="mt-5 rounded border p-4 text-[13.5px] leading-6" style={{ borderColor: "#bfe0c8", backgroundColor: "#f4faf5", color: "#22402c" }}>
          <p className="text-[11px] font-black uppercase tracking-[0.18em]" style={{ color: OR }}>
            Ce que dit l&apos;équation — une règle locale qui engendre toute la course
          </p>
          <p className="mt-2">
            Une équation « normale » demande <i>quel nombre&nbsp;?</i>. Une <b>équation différentielle</b>{" "}
            demande <i>quelle fonction&nbsp;?</i> — et son secret, c&apos;est qu&apos;on ne connaît jamais la
            réserve à l&apos;avance, <b>seulement la vitesse à laquelle elle change</b>{" "}
            <span style={{ color: VERT }}>(c&apos;est ça, <b>dR/dt</b>&nbsp;: la variation de ta réserve)</span>, ici et maintenant.
            On avance alors par petits pas&nbsp;:
          </p>
          <p className="mt-2 rounded border border-dashed px-3 py-2 font-mono text-[13px]" style={{ borderColor: OR + "66", color: VERT }}>
            réserve du pas suivant = réserve d&apos;avant + (sa vitesse) × (un petit pas de temps)
          </p>
          <p className="mt-2">
            C&apos;est la <b>méthode d&apos;Euler</b> — exactement ce que fait la machine, image après image.
            La <b>vitesse</b> de vidage dépend de deux choses&nbsp;: ton <b>effort au carré</b> (pousser deux
            fois plus fort coûte quatre fois plus) et la <b>pente</b> (ça grimpe, ça coûte). Deux grandeurs
            évoluent ensemble&nbsp;: <span className="font-mono">x′ = v</span> (tu avances) et{" "}
            <span className="font-mono">R′ = −c · effort² · (1 + pente)</span> (tu te vides) — un petit
            <b> système</b> d&apos;équations différentielles, le cœur du programme de Terminale.
          </p>
        </div>

        {/* ── LE BON DOSAGE ── */}
        <div className="mt-5 rounded border p-4 text-[13.5px] leading-6" style={{ borderColor: "#cfe6d5", backgroundColor: "#ffffffcc" }}>
          <p className="text-[11px] font-black uppercase tracking-[0.18em]" style={{ color: OR }}>
            Le bon dosage — pourquoi partir fort, c&apos;est perdre
          </p>
          <ul className="mt-2 space-y-2">
            <li>
              🥵 <b>Allure trop forte (9–10).</b> La réserve s&apos;effondre bien avant l&apos;arrivée&nbsp;:
              c&apos;est <b>le mur</b>. Tu ne fais plus que marcher (1 km/h) et la barrière te rattrape.
            </li>
            <li>
              🐢 <b>Allure trop douce (1–4).</b> Tu ne tapes jamais le mur… mais tu es trop lent, et les 66 h
              tombent loin de Saint-Denis.
            </li>
            <li>
              🎯 <b>Le bon dosage (autour de 5–6).</b> La réserve se vide <b>pile</b> quand tu franchis la
              ligne. C&apos;est la sagesse des traileurs — l&apos;allure régulière — et c&apos;est un{" "}
              <b>résultat mathématique</b> : la dépense au carré punit tout excès.
            </li>
          </ul>
          <p className="mt-2 text-[12.5px]" style={{ color: "#5f8a6d" }}>
            La même idée sert partout&nbsp;: réviser un contrôle, gérer son temps, tenir une année scolaire —
            on ne tient pas en partant à fond, on tient en dosant.
          </p>
        </div>

        {/* ── LES DÉFIS ── */}
        <DefisSimulateur
          titre="Les défis du raid — du CP à la Terminale"
          coupDePouce="Coup de pouce : lance la course et lis la vitesse, la dépense par heure et la réserve — la machine vérifie pour toi."
          defis={DEFIS}
          couleurs={COULEURS_DEFIS}
        />

        {/* ── LES PONTS ── */}
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <a
            href="https://youtu.be/MF7G9VhU07I"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded px-4 py-2 text-sm font-bold text-white hover:brightness-110"
            style={{ backgroundColor: "#c81e1e" }}
          >
            ▶ La vidéo (1 min) — la course en 3 destins
          </a>
          <Link
            href="/simulateur-volcan"
            className="inline-flex items-center gap-2 rounded px-4 py-2 text-sm font-bold text-white hover:brightness-110"
            style={{ backgroundColor: FEU }}
          >
            🌋 Reste au volcan — règle la lave de la Fournaise
          </Link>
          <Link
            href="/loi-pareto"
            className="inline-flex items-center gap-2 rounded border px-4 py-2 text-sm font-bold hover:brightness-95"
            style={{ borderColor: "#bfe0c8", backgroundColor: "#f4faf5", color: "#22402c" }}
          >
            ⚽ Le but qui sort de la moyenne — la loi de Pareto
          </Link>
        </div>

        {/* ── L'HONNÊTETÉ ── */}
        <p className="mt-6 border-t pt-3 text-[11.5px] leading-5" style={{ borderColor: "#cfe6d5", color: "#5f8a6d" }}>
          Machine pédagogique&nbsp;: le profil et les altitudes sont des ordres de grandeur des grands passages
          du Grand Raid, pas un relevé GPS, et le modèle de fatigue est simplifié (un vrai coureur mange, dort,
          se ravitaille). La barrière des 66 h et les 165 km sont, eux, du bon ordre. L&apos;idée «&nbsp;on tient
          en dosant, pas en partant à fond&nbsp;» se regarde dès qu&apos;on sait lire une pente&nbsp;; le système
          d&apos;équations différentielles se démontre en Terminale.
        </p>
      </div>
    </main>
  );
}
