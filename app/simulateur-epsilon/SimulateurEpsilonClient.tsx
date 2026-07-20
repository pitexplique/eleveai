"use client";

// « Active un epsilon » — la machine à engendrer des infinis.
// L'élève A LA MAIN : il règle le coefficient k (combien d'étincelles chaque
// epsilon allume), la cascade se calcule génération par génération (k^n),
// les repères s'affichent (une classe, un collège, l'île), les défis se
// vérifient sur la machine. Thème papier-cahier : la machine vient d'un
// dessin au stylo bleu ([[/pourquoi-eleveai]]), pas d'une usine.

import { useEffect, useMemo, useState } from "react";
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
          <svg key={`${run}-${k}`} viewBox="0 0 900 780" className="mt-3 w-full" role="img"
            aria-label={`Cascade d'étincelles : une étincelle au centre, puis ${k.toFixed(1)} fois plus à chaque génération`}>
            <style>{`
              .gpop{opacity:0;transform-origin:center;animation:gpop .5s ease forwards}
              .ganneau{opacity:0;animation:ganneau .7s ease forwards}
              .gcentre{animation:gcentre 1.6s ease-in-out infinite}
              @keyframes gpop{0%{opacity:0}60%{opacity:1}100%{opacity:.92}}
              @keyframes ganneau{to{opacity:.85}}
              @keyframes gcentre{0%,100%{opacity:.75}50%{opacity:1}}
            `}</style>
            {generations.map((n, g) => {
              if (g === 0) return null;
              const compte = Math.round(n);
              const rayon = 40 + g * 34;
              const delai = `${(g * 0.45).toFixed(2)}s`;
              if (compte < 1)
                return (
                  <g key={g} className="ganneau" style={{ animationDelay: delai }}>
                    <circle cx="450" cy="390" r={rayon} fill="none" stroke="#c9cfdd" strokeWidth="1.5" strokeDasharray="3 7" />
                    <text x={450} y={390 - rayon - 5} textAnchor="middle" fontSize="13" fontWeight="700" fill="#8a93ab">
                      G{g} : éteint
                    </text>
                  </g>
                );
              const visibles = Math.min(compte, 96);
              const points = Array.from({ length: visibles }, (_, i) => {
                const a = (i / visibles) * 2 * Math.PI + g * 0.35;
                return { x: 450 + rayon * Math.cos(a), y: 390 + rayon * 0.82 * Math.sin(a) };
              });
              return (
                <g key={g} className="gpop" style={{ animationDelay: delai }}>
                  {compte > visibles && (
                    <ellipse cx="450" cy="390" rx={rayon} ry={rayon * 0.82} fill="none" stroke="#e8a013" strokeWidth="10" opacity="0.22" />
                  )}
                  {points.map((p, i) => (
                    <circle key={i} cx={p.x} cy={p.y} r={Math.max(2.6, 7 - g * 0.45)} fill="#e8a013" />
                  ))}
                  <text x={450} y={390 - rayon * 0.82 - 6} textAnchor="middle" fontSize="14" fontWeight="900" fill={OR}>
                    G{g} : {fmt(n)}
                  </text>
                </g>
              );
            })}
            {/* ton epsilon, au centre */}
            <circle className="gcentre" cx="450" cy="390" r="13" fill="#e8a013" />
            <text x="450" y="396" textAnchor="middle" fontSize="15" fontWeight="900" fill="#fff">ε</text>
            <text x="450" y="425" textAnchor="middle" fontSize="13" fontWeight="700" fill={ENCRE}>toi</text>
          </svg>
          <p className="mt-1 text-[11.5px]" style={{ color: "#8a93ab" }}>
            Chaque anneau = une génération. Au-delà de 96 étincelles affichées, l&apos;anneau
            s&apos;embrase et porte le vrai compte — à k = 4, la génération 10 dépasse le million.
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
                        width: `${Math.min(largeur, 100)}%`,
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
