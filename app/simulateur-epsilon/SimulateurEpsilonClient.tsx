"use client";

// « Active un epsilon » — la machine à engendrer des infinis.
// L'élève A LA MAIN : il règle le coefficient k (combien d'étincelles chaque
// epsilon allume), la cascade se calcule génération par génération (k^n),
// les repères s'affichent (une classe, un collège, l'île), les défis se
// vérifient sur la machine. Thème papier-cahier : la machine vient d'un
// dessin au stylo bleu ([[/pourquoi-eleveai]]), pas d'une usine.

import { useEffect, useMemo, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import Link from "next/link";
import DefisSimulateur, {
  type DefiSimulateur,
  type CouleursDefis,
} from "@/components/simulateurs/DefisSimulateur";

const ENCRE = "#2b4a9b";
const OR = "#b97e12";

const COULEURS_DEFIS: CouleursDefis = {
  fond: "#fdf9ef",
  fondProfond: "#f6edd8",
  bord: "#e3d3a8",
  accent: OR,
  texte: "#3a3325",
  sousTexte: "#8a7a55",
  ok: "#1a7f37",
  rate: "#b3261e",
};

// Les nombres des défis sont DIFFÉRENTS du curseur par défaut : l'élève règle
// la machine pour vérifier (la machine = l'outil de correction).
const DEFIS: DefiSimulateur[] = [
  {
    id: "epsilon-k2-g10",
    question:
      "Règle k = 2 (chaque étincelle en allume 2). Combien d'étincelles à la génération 10 ?",
    reponse: 1024,
    unite: "étincelles",
    indice: "2 × 2 × 2… dix fois : double de génération en génération.",
    calcul: "2¹⁰ = 2 × 2 × … × 2 (10 fois) = 1 024",
    tolerance: 1,
  },
  {
    id: "epsilon-k3-g4",
    question: "Avec k = 3, combien d'étincelles à la génération 4 ?",
    reponse: 81,
    unite: "étincelles",
    indice: "3 → 9 → 27 → … : triple à chaque génération.",
    calcul: "3⁴ = 3 × 3 × 3 × 3 = 81",
    tolerance: 0.5,
  },
  {
    id: "epsilon-k1-g10",
    question:
      "Avec k = 1 (chaque étincelle n'en allume qu'une), combien reste-t-il à la génération 10 ?",
    reponse: 1,
    unite: "étincelle",
    indice: "1 × 1 × 1… : la flamme ne grandit pas, mais elle ne meurt pas.",
    calcul: "1¹⁰ = 1 — la chaîne survit, tout juste.",
    tolerance: 0.4,
  },
  {
    id: "epsilon-k-ile",
    question:
      "Quel est le plus petit k ENTIER qui dépasse la population de l'île (860 000) en 10 générations ?",
    reponse: 4,
    unite: "(coefficient k)",
    indice: "Essaie k = 3 puis k = 4 sur la machine, et regarde la génération 10.",
    calcul: "3¹⁰ = 59 049 (pas assez) · 4¹⁰ = 1 048 576 > 860 000 ✓",
    tolerance: 0.4,
  },
];

const REPERES: { seuil: number; texte: string }[] = [
  { seuil: 25, texte: "une classe entière (25 élèves)" },
  { seuil: 600, texte: "tout un collège (600 élèves)" },
  { seuil: 85_000, texte: "tout Saint-Pierre (85 000 habitants)" },
  { seuil: 860_000, texte: "toute l'île de La Réunion (860 000)" },
];

const fmt = (n: number) => {
  if (n >= 100 || Math.abs(n - Math.round(n)) < 0.005)
    return Math.round(n).toLocaleString("fr-FR");
  return n.toFixed(n >= 10 ? 1 : 2).replace(".", ",");
};

// « = » si fmt affiche la valeur exacte, « ≈ » s'il l'a arrondie.
const egalOuEnviron = (n: number) => {
  const d = n >= 100 || Math.abs(n - Math.round(n)) < 0.005 ? 0 : n >= 10 ? 1 : 2;
  const m = n * Math.pow(10, d);
  return Math.abs(m - Math.round(m)) < 1e-6 * Math.max(1, m) ? "=" : "≈";
};

// La cascade à cliquer : au-delà de SEUIL_NUAGE étincelles, la génération est
// dessinée en nuage qui porte son nombre.
const SEUIL_NUAGE = 60;
const MAX_DEPART = 5;
const MAX_GEN = 10;
type Etincelle = { id: number; x: number; y: number };
type Pt = { x: number; y: number; id?: number };
// Très petites valeurs (k < 1, génération 10) : chiffres significatifs, pas « 0,00 ».
const fmtCalc = (n: number) => (n > 0 && n < 0.01 ? n.toPrecision(2).replace(".", ",") : fmt(n));
const egalCalc = (n: number) => (n > 0 && n < 0.01 ? "≈" : egalOuEnviron(n));
type Rang = { g: number; valeur: number; compte: number; y: number; pts: Pt[]; nuage: boolean; W: number };

export default function SimulateurEpsilonClient() {
  const [k, setK] = useState(1.2);
  const [run, setRun] = useState(0);
  const [modeClasse, setModeClasse] = useState(false);

  useEffect(() => {
    setModeClasse(localStorage.getItem("eleveai-mode-classe") === "1");
  }, []);
  const basculerModeClasse = () => {
    setModeClasse((v) => {
      localStorage.setItem("eleveai-mode-classe", v ? "0" : "1");
      return !v;
    });
  };

  const generations = useMemo(
    () => Array.from({ length: 11 }, (_, g) => Math.pow(k, g)),
    [k],
  );
  const g10 = generations[10];

  const lecture = useMemo(() => {
    if (k < 1) return "k est sous 1 : chaque génération est plus petite — la chaîne s'éteint doucement.";
    if (k === 1) return "k = 1 : la flamme se transmet une à une — elle survit, tout juste.";
    const repere = [...REPERES].reverse().find((r) => g10 >= r.seuil);
    if (repere) return `À la génération 10 : ${fmt(g10)} étincelles — plus que ${repere.texte} !`;
    return `À la génération 10 : ${fmt(g10)} étincelles allumées par UN SEUL epsilon.`;
  }, [k, g10]);

  // ── LA CASCADE À CLIQUER : u(n) = a × kⁿ ───────────────────────────────
  // Étape 1 : l'élève pose 1 à 5 étincelles (a) dans la zone de départ.
  // Étape 2 : chaque clic allume la génération suivante (n → n + 1).
  const svgRef = useRef<SVGSVGElement>(null);
  const idRef = useRef(1);
  const [etincelles, setEtincelles] = useState<Etincelle[]>([]);
  const [gen, setGen] = useState(0);
  const [avis, setAvis] = useState("");
  const a = etincelles.length;
  const pas = Math.min(48, 470 / Math.max(gen, 1));

  const rangs = useMemo(() => {
    const out: Rang[] = [];
    if (etincelles.length === 0) return out;
    const nb = etincelles.length;
    for (let g = 0; g <= gen; g++) {
      const valeur = nb * Math.pow(k, g);
      // on ne dessine que les étincelles ENTIÈRES (2,9 → 2 allumées)
      const compte = g === 0 ? nb : Math.floor(valeur + 1e-9);
      const y = g === 0 ? 70 : 130 + g * pas;
      let pts: Pt[] = [];
      let nuage = false;
      let W = 0;
      if (g === 0) pts = [...etincelles].sort((p, q) => p.x - q.x).map((s) => ({ x: s.x, y: s.y, id: s.id }));
      else if (compte > SEUIL_NUAGE) {
        nuage = true;
        W = Math.min(840, 260 + 90 * Math.log10(compte));
      } else pts = Array.from({ length: compte }, (_, i) => ({ x: 70 + (i + 0.5) * (890 / compte), y }));
      out.push({ g, valeur, compte, y, pts, nuage, W });
    }
    return out;
  }, [etincelles, k, gen, pas]);

  const genSuivante = () => {
    if (gen >= MAX_GEN) return;
    setAvis("");
    if (etincelles.length === 0) setEtincelles([{ id: idRef.current++, x: 515, y: 70 }]); // a = 1 par défaut
    setGen((m) => Math.min(MAX_GEN, m + 1));
  };
  const recommencer = () => {
    setEtincelles([]);
    setGen(0);
    setAvis("");
  };
  const surDessin = (e: ReactPointerEvent<SVGSVGElement>) => {
    if (gen > 0) {
      genSuivante();
      return;
    }
    const svg = svgRef.current;
    const m = svg?.getScreenCTM();
    if (!svg || !m) return;
    const pt = new DOMPoint(e.clientX, e.clientY).matrixTransform(m.inverse());
    const x = Math.min(960, Math.max(70, pt.x));
    const y = Math.min(100, Math.max(40, pt.y));
    const proche = etincelles.find((s) => Math.hypot(s.x - x, s.y - y) < 36);
    if (proche) {
      setEtincelles((l) => l.filter((s) => s.id !== proche.id));
      setAvis("Étincelle retirée.");
      return;
    }
    if (etincelles.length >= MAX_DEPART) {
      setAvis(`${MAX_DEPART} étincelles de départ au plus — touche ⚡ pour lancer la cascade.`);
      return;
    }
    setEtincelles((l) => [...l, { id: idRef.current++, x, y }]);
    setAvis("");
  };

  const kTxt = k.toFixed(1).replace(".", ",");
  const valeurN = a * Math.pow(k, gen);
  const compteN = rangs.length ? rangs[rangs.length - 1].compte : 0;
  const verdict =
    k < 1
      ? "🌫️ k est plus petit que 1 : chaque génération est plus petite — la chaîne s'éteint."
      : k === 1
        ? "🔁 k = 1 : autant d'étincelles à chaque génération — la chaîne reste allumée."
        : "💥 k est plus grand que 1 : chaque génération est plus grande — ça explose !";

  const grand = modeClasse ? "text-4xl sm:text-5xl" : "text-2xl sm:text-3xl";

  return (
    <main
      className="min-h-screen pb-14"
      style={{
        backgroundColor: "#fcfcf7",
        backgroundImage:
          "linear-gradient(#cfe0f230 1px, transparent 1px), linear-gradient(90deg, #cfe0f230 1px, transparent 1px)",
        backgroundSize: "25px 25px",
        color: "#26324a",
      }}
    >
      <div className="mx-auto max-w-3xl px-4 pt-8">
        <p className="text-[11px] font-black uppercase tracking-[0.22em]" style={{ color: OR }}>
          La machine du cœur · ε → ∞
        </p>
        <h1 className="mt-1 font-serif text-3xl font-black leading-tight sm:text-4xl" style={{ color: ENCRE }}>
          Active un epsilon : la machine à engendrer des infinis
        </h1>
        <p className="mt-3 text-[15px] leading-7">
          Tout part d&apos;<b>UNE</b> étincelle. Toi, par exemple. Chaque étincelle en allume{" "}
          <b>k</b> autres — tu expliques à k camarades, qui expliquent à k camarades…
          Règle le coefficient et regarde ce qu&apos;un seul epsilon peut engendrer.
        </p>

        {/* LE CURSEUR */}
        <div className="mt-6 rounded border p-4" style={{ borderColor: "#d5ddf0", backgroundColor: "#ffffffcc" }}>
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <label htmlFor="coef" className="text-sm font-black" style={{ color: ENCRE }}>
              Le coefficient k — combien d&apos;étincelles chaque epsilon allume
            </label>
            <button
              type="button"
              onClick={basculerModeClasse}
              className="rounded border px-2 py-0.5 text-[11px] font-bold"
              style={{ borderColor: "#d5ddf0", color: "#6b7794" }}
            >
              {modeClasse ? "🖥️ mode classe : ON" : "🖥️ mode classe"}
            </button>
          </div>
          <input
            id="coef"
            type="range"
            min={0.5}
            max={4}
            step={0.1}
            value={k}
            onChange={(e) => setK(parseFloat(e.target.value))}
            className="mt-3 w-full accent-[#b97e12]"
          />
          <div className="mt-1 flex justify-between text-[11px]" style={{ color: "#8a93ab" }}>
            <span>0,5 — ça s&apos;éteint</span>
            <span>1 — ça survit</span>
            <span>4 — l&apos;île entière</span>
          </div>
          <p className={`mt-3 font-black ${grand}`} style={{ color: ENCRE }}>
            k = {k.toFixed(1).replace(".", ",")}{" "}
            <span style={{ color: OR }}>→ génération 10 : {fmt(g10)}</span>
          </p>
          <p className="mt-1 text-[14px] font-semibold" style={{ color: "#4a5570" }}>
            {lecture}
          </p>
        </div>

        {/* À TOI DE JOUER — la cascade qu'on allume au doigt : l'élève pose a
            étincelles, puis chaque clic allume une génération (a × kⁿ). */}
        <div className="mt-5 rounded border p-4" style={{ borderColor: "#e3d3a8", backgroundColor: "#ffffffcc" }}>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-[11px] font-black uppercase tracking-[0.18em]" style={{ color: OR }}>
              À toi — allume ta cascade
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={genSuivante}
                disabled={gen >= MAX_GEN}
                className="rounded px-3 py-1.5 text-sm font-black text-white hover:brightness-110 disabled:opacity-40"
                style={{ backgroundColor: OR }}
              >
                ⚡ Génération suivante
              </button>
              <button
                type="button"
                onClick={recommencer}
                className="rounded border px-3 py-1.5 text-sm font-black hover:brightness-95"
                style={{ borderColor: "#d5ddf0", color: ENCRE, backgroundColor: "#fff" }}
              >
                ↺ Recommencer
              </button>
            </div>
          </div>
          <p className="mt-2 text-[15px] font-bold" style={{ color: "#4a5570" }}>
            {gen === 0
              ? "👆 Clique dans la zone jaune pour poser 1 à 5 étincelles. Puis touche ⚡."
              : gen < MAX_GEN
                ? "👆 Touche le dessin (ou ⚡) : chaque étincelle allumée en allume k."
                : "🏁 Génération 10 ! Bouge le curseur k au-dessus, ou recommence."}
          </p>
          <p className="text-[12px]" style={{ color: "#8a93ab" }}>
            Pour les défis : pose UNE seule étincelle (a = 1) et règle k avec le curseur.
          </p>

          {/* LA LIGNE DE CALCUL — c'est elle qu'on projette */}
          <p className={`mt-3 font-black ${grand}`} style={{ color: ENCRE }}>
            {a === 0 ? (
              <>a = ? <span className="text-[0.6em] font-bold" style={{ color: "#8a93ab" }}>— pose tes étincelles de départ</span></>
            ) : (
              <>
                génération {gen} : {a} × {kTxt}
                <sup className="text-[0.6em]">{gen}</sup>{" "}
                <span style={{ color: OR }}>
                  {egalCalc(valeurN)} {fmtCalc(valeurN)}
                </span>
              </>
            )}
          </p>
          {a > 0 && gen >= 1 && gen <= 5 && (
            <p className="text-[14px] font-bold" style={{ color: "#4a5570" }}>
              car {a} × {Array.from({ length: gen }, () => kTxt).join(" × ")} {egalCalc(valeurN)} {fmtCalc(valeurN)}
            </p>
          )}
          {a > 0 && Math.abs(valeurN - compteN) > 1e-9 && (
            <p className="text-[13px] font-semibold" style={{ color: "#8a7a55" }}>
              On dessine seulement les étincelles entières : {fmt(compteN)} allumée{compteN >= 2 ? "s" : ""}.
            </p>
          )}
          {avis && (
            <p className="mt-1 text-[13px] font-bold" style={{ color: "#b3261e" }}>
              {avis}
            </p>
          )}

          <svg
            ref={svgRef}
            viewBox="0 0 1000 630"
            className="mt-3 w-full select-none"
            style={{ touchAction: "manipulation", cursor: "pointer" }}
            onPointerDown={surDessin}
            role="img"
            aria-label={`Ta cascade : ${a} étincelle${a >= 2 ? "s" : ""} de départ, coefficient ${kTxt}, génération ${gen} : ${fmt(valeurN)} étincelles`}
          >
            <style>{`
              .tpop{animation:tpop .45s ease-out both;transform-box:fill-box;transform-origin:center}
              .tfade{animation:tfade .5s ease both}
              .tvive{animation:tvive 1.4s ease-in-out infinite}
              @keyframes tpop{0%{opacity:0;transform:scale(.2)}70%{opacity:1;transform:scale(1.25)}100%{opacity:1;transform:scale(1)}}
              @keyframes tfade{from{opacity:0}to{opacity:1}}
              @keyframes tvive{0%,100%{opacity:.8}50%{opacity:1}}
            `}</style>

            {/* la zone de départ */}
            <rect x="6" y="8" width="988" height="116" rx="12" fill="#fff7e0" stroke={gen === 0 ? OR : "#e3d3a8"}
              strokeWidth="2" strokeDasharray={gen === 0 ? "8 6" : undefined} />
            <text x="16" y="28" fontSize="13" fontWeight="900" fill="#8a7a55">
              Zone de départ · a = {a}
            </text>
            {a === 0 && (
              <text x="515" y="80" textAnchor="middle" fontSize="26" fontWeight="900" fill={OR}>
                👆 Clique ici pour poser tes étincelles
              </text>
            )}
            {a > 0 && gen === 0 && (
              <text x="500" y="330" textAnchor="middle" fontSize="22" fontWeight="900" fill="#8a93ab">
                Puis touche ⚡ « Génération suivante »
              </text>
            )}

            {/* les traits parents → enfants (dessinés sous les étincelles) */}
            {rangs.slice(1).map((r) => {
              const prev = rangs[r.g - 1];
              const ry = Math.max(13, Math.min(21, pas * 0.42));
              if (prev.compte === 0) return null;
              if (r.compte === 0)
                // la chaîne s'éteint : des traits gris qui retombent dans le vide
                return (
                  <g key={`l${r.g}`} className="tfade">
                    {prev.pts.map((p, i) => (
                      <line key={i} x1={p.x} y1={p.y} x2={p.x} y2={p.y + pas * 0.55}
                        stroke="#c9cfdd" strokeWidth="2" strokeDasharray="4 4" />
                    ))}
                  </g>
                );
              if (r.nuage && prev.nuage)
                return (
                  <g key={`l${r.g}`} className="tfade">
                    {Array.from({ length: 7 }, (_, j) => (
                      <line key={j} x1={515 + (j - 3) * (prev.W / 8)} y1={prev.y + ry * 0.7}
                        x2={515 + (j - 3) * (r.W / 8)} y2={r.y - ry * 0.7} stroke={OR} strokeWidth="2.5" opacity="0.7" />
                    ))}
                  </g>
                );
              if (r.nuage)
                return (
                  <g key={`l${r.g}`} className="tfade">
                    {prev.pts.map((p, i) => (
                      <line key={i} x1={p.x} y1={p.y} x2={515 + (p.x - 515) * (r.W / 1000)} y2={r.y - ry * 0.7}
                        stroke={OR} strokeWidth="1.5" opacity="0.6" />
                    ))}
                  </g>
                );
              if (prev.nuage) return null; // (impossible : la suite est monotone)
              return (
                <g key={`l${r.g}`}>
                  {r.pts.map((c, i) => {
                    const p = prev.pts[Math.min(prev.compte - 1, Math.floor((i * prev.compte) / r.compte))];
                    return (
                      <line key={`${r.compte}-${i}`} className="tfade" x1={p.x} y1={p.y} x2={c.x} y2={c.y}
                        stroke={OR} strokeWidth="1.5" opacity="0.55" />
                    );
                  })}
                </g>
              );
            })}

            {/* les générations */}
            {rangs.map((r) => {
              const derniere = r.g === gen;
              const ry = Math.max(13, Math.min(21, pas * 0.42));
              return (
                <g key={`r${r.g}`} opacity={derniere ? 1 : 0.6} className={derniere ? "tvive" : undefined}>
                  {r.g > 0 && (
                    <>
                      <text x="12" y={r.y + 1} fontSize="14" fontWeight="900" fill={ENCRE}>G{r.g}</text>
                      <text x="12" y={r.y + 16} fontSize="11" fontWeight="700" fill="#8a93ab">{fmt(r.compte)}</text>
                    </>
                  )}
                  {r.g === 0 &&
                    r.pts.map((p, i) => (
                      <g key={p.id ?? i} className="tpop">
                        <circle cx={p.x} cy={p.y} r="20" fill="#e8a013" stroke="#fff" strokeWidth="3" />
                        <text x={p.x} y={p.y + 7} textAnchor="middle" fontSize="20" fontWeight="900" fill="#fff">ε</text>
                      </g>
                    ))}
                  {r.g > 0 && r.compte === 0 && (
                    <text className="tfade" x="515" y={r.y + 6} textAnchor="middle" fontSize="16" fontWeight="900" fill="#a3abbd">
                      {rangs[r.g - 1].compte > 0 ? "💨 éteinte : plus aucune étincelle entière" : "…"}
                    </text>
                  )}
                  {r.g > 0 && r.nuage && (
                    <g className="tpop">
                      {Array.from({ length: 5 }, (_, j) => (
                        <ellipse key={j} cx={515 + (j - 2) * (r.W / 5)} cy={r.y + (j % 2 ? -2 : 2)}
                          rx={(r.W / 5) * 0.78} ry={ry} fill="#f6d27a" stroke={OR} strokeWidth="1.5" />
                      ))}
                      <ellipse cx="515" cy={r.y} rx={r.W * 0.42} ry={ry * 0.8} fill="#f6d27a" />
                      <text x="515" y={r.y + 6} textAnchor="middle" fontSize="17" fontWeight="900" fill="#5a3d05">
                        ☁️ {fmt(r.compte)} étincelles
                      </text>
                    </g>
                  )}
                  {r.g > 0 &&
                    !r.nuage &&
                    r.pts.map((p, i) => (
                      <circle key={`${r.compte}-${i}`} className="tpop"
                        style={{ animationDelay: `${Math.min(0.6, i * 0.012).toFixed(3)}s` }}
                        cx={p.x} cy={p.y} r={r.compte > 30 ? 5.5 : r.compte > 12 ? 7.5 : 10}
                        fill={derniere ? "#e8a013" : OR} />
                    ))}
                </g>
              );
            })}
          </svg>
          {gen >= 1 && (
            <p className={`mt-2 font-black ${modeClasse ? "text-2xl" : "text-[15px]"}`} style={{ color: k < 1 ? "#6b7794" : k === 1 ? ENCRE : OR }}>
              {verdict}
            </p>
          )}
        </div>

        {/* LA SIMULATION — le champ d'étincelles : l'epsilon au centre, chaque
            génération s'embrase en anneau (points dorés qui apparaissent en
            cadence). Au-delà de 96 points par anneau, l'anneau lumineux porte
            le vrai nombre. key={run} relance la cascade à chaque activation. */}
        <div className="mt-5 rounded border p-4" style={{ borderColor: "#d5ddf0", backgroundColor: "#ffffffcc" }}>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-[11px] font-black uppercase tracking-[0.18em]" style={{ color: OR }}>
              La simulation — regarde ta cascade s&apos;allumer
            </p>
            <button
              type="button"
              onClick={() => setRun((r) => r + 1)}
              className="rounded px-3 py-1.5 text-sm font-black text-white hover:brightness-110"
              style={{ backgroundColor: OR }}
            >
              ⚡ Activer l&apos;epsilon
            </button>
          </div>
          <svg key={`${run}-${k}`} viewBox="0 0 1000 620" className="mt-3 w-full" role="img"
            aria-label={`La cascade du dessin : des epsilons s'allument, le réseau de neurones s'allume, puis les infinis — coefficient ${k.toFixed(1)}`}>
            <style>{`
              .spop{opacity:0;animation:spop .5s ease forwards}
              .scentre{animation:scentre 1.6s ease-in-out infinite}
              .nflash{animation:nflash .8s ease forwards}
              .eflash{opacity:0;animation:eflash .6s ease forwards}
              @keyframes spop{to{opacity:1}}
              @keyframes scentre{0%,100%{opacity:.75}50%{opacity:1}}
              @keyframes nflash{40%{fill:#e8a013;r:11}100%{fill:#b97e12;r:9}}
              @keyframes eflash{40%{opacity:1;stroke:#e8a013}100%{opacity:.9;stroke:#b97e12}}
            `}</style>

            {/* 1 — DES EPSILONS S'ALLUMENT (générations 0 → 4, comptes réels) */}
            <circle className="scentre" cx="95" cy="86" r="17" fill="#e8a013" />
            <text x="95" y="93" textAnchor="middle" fontSize="19" fontWeight="900" fill="#fff">ε</text>
            <text x="132" y="92" fontSize="14" fontWeight="700" fill={ENCRE}>toi — G0 : 1</text>
            {[1, 2, 3, 4].map((g) => {
              const compte = Math.round(Math.pow(k, g));
              const visibles = Math.min(compte, 12);
              const y = 178 + (g - 1) * 100;
              const delai = `${(0.45 * g).toFixed(2)}s`;
              return (
                <g key={g} className="spop" style={{ animationDelay: delai }}>
                  <text x="55" y={y - 32} fontSize="12" fontWeight="700" fill="#8a93ab">
                    G{g} : {compte < 1 ? "éteint" : fmt(Math.pow(k, g))}
                  </text>
                  {compte < 1 ? (
                    <text x="55" y={y} fontSize="26" fontWeight="900" fill="#c9cfdd">ε</text>
                  ) : (
                    Array.from({ length: visibles }, (_, i) => (
                      <text key={i} x={55 + i * 23} y={y} fontSize="26" fontWeight="900" fill="#e8a013">ε</text>
                    ))
                  )}
                  {compte > visibles && (
                    <text x={55 + visibles * 23 + 4} y={y} fontSize="15" fontWeight="900" fill={OR}>
                      …
                    </text>
                  )}
                </g>
              );
            })}

            {/* l'étincelle entre dans le réseau */}
            <circle r="6" fill="#e8a013" opacity="0">
              <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.1;.85;1" begin="2.1s" dur="0.9s" fill="freeze" />
              <animateMotion begin="2.1s" dur="0.8s" fill="freeze" path="M330 260 C360 250 385 245 412 252" />
            </circle>

            {/* 2 — LE RÉSEAU DE NEURONES S'ALLUME (2 entrées, 3 cachés, 2 sorties) */}
            {(() => {
              const E = [[420, 190], [420, 320]];
              const C = [[520, 150], [520, 255], [520, 360]];
              const S = [[620, 190], [620, 320]];
              const aretes: number[][][] = [];
              E.forEach((a) => C.forEach((b) => aretes.push([a, b])));
              C.forEach((a) => S.forEach((b) => aretes.push([a, b])));
              return (
                <g>
                  {aretes.map(([a, b], i) => (
                    <line key={`g${i}`} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke="#c9cfdd" strokeWidth="1.5" />
                  ))}
                  {aretes.map(([a, b], i) => (
                    <line key={`o${i}`} className="eflash" style={{ animationDelay: `${(2.7 + i * 0.05).toFixed(2)}s` }}
                      x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke="#e8a013" strokeWidth="2.5" />
                  ))}
                  {[...E, ...C, ...S].map(([x, y], i) => (
                    <circle key={`n${i}`} className="nflash" style={{ animationDelay: `${(2.6 + i * 0.13).toFixed(2)}s` }}
                      cx={x} cy={y} r="8" fill={ENCRE} />
                  ))}
                </g>
              );
            })()}

            {/* l'étincelle ressort, multipliée */}
            <circle r="6" fill="#e8a013" opacity="0">
              <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.1;.85;1" begin="3.8s" dur="0.9s" fill="freeze" />
              <animateMotion begin="3.8s" dur="0.8s" fill="freeze" path="M628 255 C650 250 665 245 688 240" />
            </circle>

            {/* 3 — PUIS LES INFINIS (1 ∞ = 1 000 étincelles à la génération 10) */}
            {(() => {
              const nInf = Math.floor(g10 / 1000);
              if (nInf < 1)
                return (
                  <g className="spop" style={{ animationDelay: "4.2s" }}>
                    <text x="835" y="250" textAnchor="middle" fontSize="42" fontWeight="900" fill="#c9cfdd">∞</text>
                    <text x="835" y="292" textAnchor="middle" fontSize="14" fontWeight="700" fill="#8a93ab">
                      G10 : {fmt(g10)} étincelle{g10 >= 2 ? "s" : ""}
                    </text>
                    <text x="835" y="314" textAnchor="middle" fontSize="13" fontWeight="700" fill={OR}>
                      pas encore un infini — pousse k !
                    </text>
                  </g>
                );
              const visibles = Math.min(nInf, 63);
              return (
                <g>
                  {Array.from({ length: visibles }, (_, i) => (
                    <text key={i} className="spop" style={{ animationDelay: `${(4.2 + i * 0.05).toFixed(2)}s` }}
                      x={700 + (i % 7) * 42} y={150 + Math.floor(i / 7) * 42} fontSize="28" fontWeight="900" fill="#e8a013">
                      ∞
                    </text>
                  ))}
                  <text className="spop" style={{ animationDelay: `${(4.2 + visibles * 0.05 + 0.2).toFixed(2)}s` }}
                    x="835" y={150 + Math.ceil(visibles / 7) * 42 + 22} textAnchor="middle" fontSize="15" fontWeight="900" fill={OR}>
                    {nInf > visibles ? `… ${fmt(nInf)} infinis !` : `${nInf} infini${nInf >= 2 ? "s" : ""} allumé${nInf >= 2 ? "s" : ""}`}
                  </text>
                </g>
              );
            })()}

            {/* les légendes des trois actes */}
            <text x="170" y="600" textAnchor="middle" fontSize="13" fontWeight="900" fill={ENCRE}>1 · des epsilons s&apos;allument</text>
            <text x="520" y="600" textAnchor="middle" fontSize="13" fontWeight="900" fill={ENCRE}>2 · le réseau s&apos;allume</text>
            <text x="835" y="600" textAnchor="middle" fontSize="13" fontWeight="900" fill={ENCRE}>3 · puis les infinis</text>
          </svg>
          <p className="mt-1 text-[11.5px]" style={{ color: "#8a93ab" }}>
            Comme sur le dessin d&apos;origine : les epsilons s&apos;allument génération par
            génération, l&apos;étincelle traverse le réseau de neurones — et les infinis
            s&apos;embrasent. 1 ∞ = 1 000 étincelles à la génération 10 : ton premier
            infini s&apos;allume à k = 2.
          </p>
        </div>

        {/* LA CASCADE — échelle logarithmique, comme sur un cahier */}
        <div className="mt-5 rounded border p-4" style={{ borderColor: "#d5ddf0", backgroundColor: "#ffffffcc" }}>
          <p className="text-[11px] font-black uppercase tracking-[0.18em]" style={{ color: OR }}>
            La cascade, génération par génération
          </p>
          <div className="mt-3 space-y-1.5">
            {generations.map((n, g) => {
              const largeur = Math.max(2, (Math.log10(Math.max(n, 0.001)) + 3) / 9.2 * 100);
              return (
                <div key={g} className="flex items-center gap-2">
                  <span className="w-9 shrink-0 text-right text-[11px] font-bold" style={{ color: "#8a93ab" }}>
                    G{g}
                  </span>
                  <div className="h-4 flex-1 overflow-hidden rounded-sm" style={{ backgroundColor: "#f0ecdd" }}>
                    <div
                      className="h-full rounded-sm transition-all duration-300"
                      style={{
                        width: `${Math.min(largeur, 100).toFixed(2)}%`,
                        background: n >= 1 ? `linear-gradient(90deg, ${ENCRE}, ${OR})` : "#c9cfdd",
                      }}
                    />
                  </div>
                  <span className={`shrink-0 text-right font-black ${modeClasse ? "w-28 text-base" : "w-24 text-[12px]"}`} style={{ color: n >= 1 ? ENCRE : "#8a93ab" }}>
                    {fmt(n)}
                  </span>
                </div>
              );
            })}
          </div>
          <p className="mt-2 text-[11.5px]" style={{ color: "#8a93ab" }}>
            Barres en échelle logarithmique — sinon, dès k = 2, la génération 10 sortirait de ton écran.
          </p>
        </div>

        {/* LES MATHS */}
        <div className="mt-5 rounded border p-4 text-[13.5px] leading-6" style={{ borderColor: "#e3d3a8", backgroundColor: "#fdf9ef", color: "#3a3325" }}>
          <p className="text-[11px] font-black uppercase tracking-[0.18em]" style={{ color: OR }}>
            Les maths de la machine
          </p>
          <p className="mt-2">
            Génération n = k × k × … × k (n fois) = <b>kⁿ</b> — une{" "}
            <b>suite géométrique</b> de raison k. C&apos;est la même mécanique que le{" "}
            <b>R₀</b> des épidémies, les intérêts composés… et l&apos;entraide : k sous 1 tout
            s&apos;éteint, k au-dessus de 1 tout change. En créole&nbsp;:{" "}
            <b>«&nbsp;In min i lav lot&nbsp;»</b> — une main lave l&apos;autre.
          </p>
        </div>

        {/* LES DÉFIS */}
        <DefisSimulateur
          titre="Les défis des epsilons"
          coupDePouce="Coup de pouce : règle k sur la machine — la cascade vérifie pour toi."
          defis={DEFIS}
          couleurs={COULEURS_DEFIS}
          coachHref="/coach/serie?classe=3e&matiere=maths&notion=entier_puissance&display=simple"
          coachLabel="Entraîne-toi sur le coach (puissances, 3e)"
        />

        {/* LES PONTS */}
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Link
            href="/pourquoi-eleveai"
            className="inline-flex items-center gap-2 rounded px-4 py-2 text-sm font-bold text-white hover:brightness-110"
            style={{ backgroundColor: ENCRE }}
          >
            💙 Le dessin d&apos;origine — pourquoi EleveAI existe
          </Link>
          <Link
            href="/besoin-de-vous"
            className="inline-flex items-center gap-2 rounded border px-4 py-2 text-sm font-bold hover:brightness-95"
            style={{ borderColor: "#e3d3a8", backgroundColor: "#fdf9ef", color: "#3a3325" }}
          >
            🤝 Devenir un epsilon — EleveAI a besoin de vous
          </Link>
        </div>

        {/* L'HONNÊTETÉ */}
        <p className="mt-6 border-t pt-3 text-[11.5px] leading-5" style={{ borderColor: "#d5ddf0", color: "#8a93ab" }}>
          Machine pédagogique : dans la vraie vie, personne n&apos;aide un nombre exact de
          camarades à chaque « génération » — les chaînes se croisent, s&apos;arrêtent,
          repartent. Mais la leçon du modèle est vraie, et c&apos;est la même qui gouverne
          les épidémies (R₀) : autour de 1, tout se joue. Née d&apos;un dessin au stylo —{" "}
          <Link href="/pourquoi-eleveai" className="underline underline-offset-2">l&apos;histoire est ici</Link>.
        </p>
      </div>
    </main>
  );
}
