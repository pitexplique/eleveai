"use client";

// « Le traîneau du Père Noël » — idée de Frédéric (27/11 au soir, « go ») :
// ses élèves adorent le cyclone parce qu'ils POSENT eux-mêmes les points.
// Ici, l'élève clique 5 arrêts sur la route dorée autour de la Terre (vue du
// pôle Nord), puis lance le traîneau : il suit minuit d'est en ouest, et le
// simulateur distribue les cadeaux.
//
// Quatre niveaux, quatre maths :
//   CP-CE2 : additionner les cadeaux, le sac se vide (QCM seulement) ;
//   CM     : enfants × cadeaux, le sac suffit-il ? ;
//   6e-5e  : fuseaux horaires, minuit avance de 15° par heure ;
//   4e-3e  : vitesse = distance ÷ temps, un tour ≈ 40 000 km.
// ⚠️ Les villages et les nombres d'enfants sont INVENTÉS — c'est écrit à
// l'écran. Dessins calmes : Terre, route, traîneau, nuit étoilée.

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

type Niveau = "cp" | "cm" | "6e" | "4e";

const NIVEAUX: { id: Niveau; label: string; maths: string }[] = [
  { id: "cp", label: "CP-CE2", maths: "Additionner les cadeaux" },
  { id: "cm", label: "CM1-CM2", maths: "Enfants × cadeaux" },
  { id: "6e", label: "6e-5e", maths: "Les fuseaux horaires" },
  { id: "4e", label: "4e-3e", maths: "La vitesse du traîneau" },
];

// Villages IMAGINAIRES (tous inventés, aucun n'existe).
const NOMS = [
  "Flocon", "Pain-d'Épice", "Cannelle", "Lagon-Doré", "Mont-Étoile",
  "Ti-Bois", "Port-Lumière", "Vanille", "Boule-de-Neige", "Bambou",
  "Sucre-d'Orge", "Grelot", "Coco-Plage", "Sapinette", "Lune-Bleue",
];

const NB_ARRETS = 5;
const SAC_CP = 20;
const REUNION_LON = 55.5; // La Réunion, 55,5° E, fuseau UTC+4
const REUNION_FUSEAU = 4;
const DUREE_VOL = 9000; // ms

type Arret = { lon: number; nom: string; cadeaux: number; enfants: number };

type Question = {
  texte: string;
  indice: string;
  explication: string;
} & (
  | { type: "qcm"; choix: string[]; bonne: string }
  | { type: "pave"; reponse: number; unite: string }
);

// ── Petits outils ───────────────────────────────────────────────────────────
const fr = (n: number) => n.toLocaleString("fr-FR");
const hasard = (min: number, max: number) => min + Math.floor(Math.random() * (max - min + 1));
function melange<T>(t: T[]): T[] {
  const a = [...t];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
/** Position sur le dessin : longitude 180° (ligne de changement de date) en
 *  haut, 0° en bas, l'est tourne dans le sens inverse des aiguilles. */
const pos = (lon: number, r: number): [number, number] => {
  const a = (lon * Math.PI) / 180;
  return [200 + r * Math.sin(a), 200 + r * Math.cos(a)];
};
const pas = (n: Niveau) => (n === "4e" ? 9 : 15); // 9° = 1 000 km ; 15° = 1 h
const fuseau = (lon: number) => Math.round(lon / 15);
const signe = (h: number) => (h >= 0 ? `+${h}` : `${h}`);

/** Trois choix distincts autour de la bonne réponse (jamais négatifs). */
function choixAutour(bonne: number, ecarts: number[]): string[] {
  const s = new Set<number>([bonne]);
  for (const e of melange(ecarts)) {
    if (s.size >= 3) break;
    if (bonne + e >= 0) s.add(bonne + e);
  }
  return melange([...s]).map(fr);
}

function fabriquerQuestions(niveau: Niveau, arrets: Arret[], k: number, sacCm: number): Question[] {
  const ordre = [...arrets].sort((a, b) => b.lon - a.lon); // ordre de passage
  if (niveau === "cp") {
    const total = arrets.reduce((s, a) => s + a.cadeaux, 0);
    return [
      {
        type: "qcm",
        texte: "Combien de cadeaux en tout ?",
        choix: choixAutour(total, [-2, -1, 1, 2]),
        bonne: fr(total),
        indice: "Compte les cadeaux de chaque village, puis ajoute.",
        explication: ordre.map((a) => a.cadeaux).join(" + ") + ` = ${total}`,
      },
      {
        type: "qcm",
        texte: `Le sac avait ${SAC_CP} cadeaux. Combien en reste-t-il ?`,
        choix: choixAutour(SAC_CP - total, [-2, -1, 1, 2]),
        bonne: fr(SAC_CP - total),
        indice: `Enlève les cadeaux donnés : ${SAC_CP} − ${total}.`,
        explication: `${SAC_CP} − ${total} = ${SAC_CP - total}`,
      },
    ];
  }
  if (niveau === "cm") {
    const a0 = ordre[0];
    const total = arrets.reduce((s, a) => s + a.enfants * k, 0);
    return [
      {
        type: "pave",
        texte: `${a0.nom} : ${a0.enfants} enfants, ${k} cadeaux chacun. Combien de cadeaux ?`,
        reponse: a0.enfants * k,
        unite: "cadeaux",
        indice: `Multiplie : ${a0.enfants} × ${k}.`,
        explication: `${a0.enfants} × ${k} = ${a0.enfants * k}`,
      },
      {
        type: "pave",
        texte: "Combien de cadeaux pour les 5 villages ?",
        reponse: total,
        unite: "cadeaux",
        indice: `Ajoute les enfants, puis multiplie par ${k}.`,
        explication: `(${ordre.map((a) => a.enfants).join(" + ")}) × ${k} = ${arrets.reduce((s, a) => s + a.enfants, 0)} × ${k} = ${fr(total)}`,
      },
      {
        type: "qcm",
        texte: `Le sac contient ${fr(sacCm)} cadeaux. Est-ce assez ?`,
        choix: ["Oui, il en reste", "Non, il en manque"],
        bonne: sacCm >= total ? "Oui, il en reste" : "Non, il en manque",
        indice: "Compare le sac avec le total des 5 villages.",
        explication:
          sacCm >= total
            ? `${fr(sacCm)} ≥ ${fr(total)} : il reste ${fr(sacCm - total)} cadeaux.`
            : `${fr(sacCm)} < ${fr(total)} : il manque ${fr(total - sacCm)} cadeaux.`,
      },
    ];
  }
  if (niveau === "6e") {
    const premier = ordre[0];
    const dernier = ordre[ordre.length - 1];
    const autres = melange(ordre.slice(1)).slice(0, 2).map((a) => a.nom);
    const x = melange(arrets.filter((a) => fuseau(a.lon) !== REUNION_FUSEAU))[0];
    const xEst = fuseau(x.lon) > REUNION_FUSEAU;
    const heures = (premier.lon - dernier.lon) / 15;
    return [
      {
        type: "qcm",
        texte: "Quel village reçoit ses cadeaux en premier ?",
        choix: melange([premier.nom, ...autres]),
        bonne: premier.nom,
        indice: "Minuit arrive d'abord à l'est : cherche le plus grand fuseau.",
        explication: `${premier.nom} est en UTC${signe(fuseau(premier.lon))}, le fuseau le plus à l'est.`,
      },
      {
        type: "qcm",
        texte: `Le Père Noël passe-t-il à La Réunion avant ou après ${x.nom} ?`,
        choix: [`Avant ${x.nom}`, `Après ${x.nom}`],
        bonne: xEst ? `Après ${x.nom}` : `Avant ${x.nom}`,
        indice: `La Réunion est en UTC+4, ${x.nom} en UTC${signe(fuseau(x.lon))}.`,
        explication: xEst
          ? `${x.nom} (UTC${signe(fuseau(x.lon))}) est plus à l'est : minuit y arrive avant.`
          : `${x.nom} (UTC${signe(fuseau(x.lon))}) est plus à l'ouest : minuit y arrive après La Réunion.`,
      },
      {
        type: "pave",
        texte: `Combien d'heures de vol entre ${premier.nom} et ${dernier.nom} ?`,
        reponse: heures,
        unite: "h",
        indice: "Un fuseau de plus = 1 heure. Fais la différence des fuseaux.",
        explication: `${signe(fuseau(premier.lon))} − (${signe(fuseau(dernier.lon))}) = ${heures} h (${premier.lon - dernier.lon}° ÷ 15°)`,
      },
    ];
  }
  // 4e-3e
  const [a, b] = ordre;
  const d = ((a.lon - b.lon) / 9) * 1000;
  const t = melange([2, 4, 5])[0];
  return [
    {
      type: "pave",
      texte: `Quelle distance entre ${a.nom} et ${b.nom} ?`,
      reponse: d,
      unite: "km",
      indice: `9° = 1 000 km. L'écart est de ${a.lon - b.lon}°.`,
      explication: `${a.lon - b.lon}° ÷ 9° = ${(a.lon - b.lon) / 9}, donc ${(a.lon - b.lon) / 9} × 1 000 = ${fr(d)} km`,
    },
    {
      type: "pave",
      texte: `Il met ${t} h pour ce trajet. Quelle est sa vitesse ?`,
      reponse: d / t,
      unite: "km/h",
      indice: "v = d ÷ t.",
      explication: `v = ${fr(d)} ÷ ${t} = ${fr(d / t)} km/h`,
    },
    {
      type: "qcm",
      texte: "Le tour complet : 40 000 km en 24 h. Sa vitesse moyenne est d'environ…",
      choix: melange(["1 700 km/h", "17 km/h", "960 000 km/h"]),
      bonne: "1 700 km/h",
      indice: "v = d ÷ t = 40 000 ÷ 24.",
      explication: "40 000 ÷ 24 ≈ 1 667 km/h, presque 2 fois un avion de ligne (≈ 900 km/h).",
    },
  ];
}

// Étoiles fixes (graine) : même ciel au serveur et au client.
const ETOILES = (() => {
  let g = 7;
  const r = () => ((g = (g * 16807) % 2147483647) / 2147483647);
  return Array.from({ length: 70 }, () => ({ x: -60 + r() * 520, y: -20 + r() * 440, t: 0.4 + r() * 1.3, o: 0.3 + r() * 0.6 }));
})();

const COULEURS = { fond: "#0b1530", carte: "#121f42", bord: "#243660", or: "#f5c84b", texte: "#eef2fb", sous: "#a8b6d6", ok: "#45d18a", rate: "#ff9d6b", rouge: "#e0453a" };

export default function SimulateurPereNoelClient({ embed = false }: { embed?: boolean }) {
  const [niveau, setNiveau] = useState<Niveau>("cp");
  const [arrets, setArrets] = useState<Arret[]>([]);
  const [k, setK] = useState(2); // CM : cadeaux par enfant
  const [sacCm, setSacCm] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [reponses, setReponses] = useState<Record<number, { val: string; etat: "ok" | "rate" | null }>>({});
  const [message, setMessage] = useState<string | null>(null);
  const [vol, setVol] = useState<"pret" | "en-vol" | "fini">("pret");
  const [p, setP] = useState(0); // progression du vol, 0 → 1
  const svgRef = useRef<SVGSVGElement>(null);

  // MODE CLASSE (vidéoprojecteur) : même réglage que le cyclone.
  const [modeClasse, setModeClasse] = useState(false);
  useEffect(() => {
    try { setModeClasse(localStorage.getItem("eleveai-mode-classe") === "1"); } catch {}
  }, []);
  const basculerModeClasse = () =>
    setModeClasse((v) => {
      try { localStorage.setItem("eleveai-mode-classe", v ? "0" : "1"); } catch {}
      return !v;
    });

  const nouveauTour = (n: Niveau = niveau) => {
    setNiveau(n);
    setArrets([]);
    setQuestions([]);
    setReponses({});
    setMessage(null);
    setVol("pret");
    setP(0);
  };

  // ── Le clic : un arrêt sur la route ───────────────────────────────────────
  const cliquer = (e: React.MouseEvent<SVGSVGElement>) => {
    if (vol !== "pret" || arrets.length >= NB_ARRETS) return;
    const svg = svgRef.current;
    const ctm = svg?.getScreenCTM();
    if (!svg || !ctm) return;
    const pt = new DOMPoint(e.clientX, e.clientY).matrixTransform(ctm.inverse());
    const dx = pt.x - 200, dy = pt.y - 200;
    if (Math.hypot(dx, dy) < 30) return; // le pôle : pas de village
    const s = pas(niveau);
    let lon = Math.round((Math.atan2(dx, dy) * 180) / Math.PI / s) * s;
    const lim = 180 - s; // pas d'arrêt sur la ligne de départ
    if (lon > lim) lon = lim;
    if (lon < -lim) lon = -lim;
    if (arrets.some((a) => a.lon === lon)) {
      setMessage("Il y a déjà un village ici : clique ailleurs sur la route.");
      return;
    }
    const libres = NOMS.filter((n) => !arrets.some((a) => a.nom === n));
    const arret: Arret = {
      lon,
      nom: libres[Math.floor(Math.random() * libres.length)],
      cadeaux: hasard(1, 4),
      enfants: hasard(12, 48),
    };
    const suivants = [...arrets, arret];
    setArrets(suivants);
    setMessage(null);
    if (suivants.length === NB_ARRETS) {
      const kk = melange([2, 3])[0];
      const total = suivants.reduce((t, a) => t + a.enfants * kk, 0);
      let sac = Math.round(total / 50) * 50 + melange([-50, 50, 100])[0];
      if (sac === total) sac += 50;
      setK(kk);
      setSacCm(sac);
      setQuestions(fabriquerQuestions(niveau, suivants, kk, sac));
      setReponses({});
    }
  };

  // ── Le vol : minuit avance, le traîneau suit ─────────────────────────────
  useEffect(() => {
    if (vol !== "en-vol") return;
    let raf = 0;
    const debut = performance.now();
    const pas_ = (now: number) => {
      const q = Math.min(1, (now - debut) / DUREE_VOL);
      setP(q);
      if (q < 1) raf = requestAnimationFrame(pas_);
      else setVol("fini");
    };
    raf = requestAnimationFrame(pas_);
    return () => cancelAnimationFrame(raf);
  }, [vol]);

  const lonTraineau = 180 - 360 * p;
  const ordre = useMemo(() => [...arrets].sort((a, b) => b.lon - a.lon), [arrets]);
  const servi = (a: Arret) => vol !== "pret" && lonTraineau <= a.lon;
  const reunionServie = vol !== "pret" && lonTraineau <= REUNION_LON;
  const cadeauxDonnes = arrets.filter(servi).reduce((s, a) => s + (niveau === "cm" ? a.enfants * k : a.cadeaux), 0);
  const heuresVol = Math.round(((180 - lonTraineau) / 15) * 10) / 10;
  const kmVol = Math.round(((180 - lonTraineau) / 360) * 40000);

  const verifier = (i: number, val: string) => {
    const q = questions[i];
    let ok: boolean;
    if (q.type === "qcm") ok = val === q.bonne;
    else {
      const n = parseFloat(val.replace(/\s| /g, "").replace(",", "."));
      ok = Number.isFinite(n) && Math.abs(n - q.reponse) < 0.01;
    }
    setReponses((r) => ({ ...r, [i]: { val, etat: ok ? "ok" : "rate" } }));
  };

  const t = modeClasse ? "text-lg" : "text-[15px]";
  const [sx, sy] = pos(lonTraineau, 150);

  return (
    <div className="min-h-screen text-[#eef2fb]" style={{ background: COULEURS.fond }}>
      <style>{`
        @keyframes pn-scintille { 0%,100% { opacity: var(--o); } 50% { opacity: .15; } }
        .pn-etoile { animation: pn-scintille 4s ease-in-out infinite; }
        @keyframes pn-pop { from { transform: translateY(6px) scale(.6); opacity: 0; } to { transform: none; opacity: 1; } }
        .pn-pop { animation: pn-pop .45s ease-out both; transform-box: fill-box; transform-origin: center; }
        @media (prefers-reduced-motion: reduce) { .pn-etoile, .pn-pop { animation: none; } }
      `}</style>

      {/* Manchette */}
      <header className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b px-4 pb-2.5 pt-3.5 sm:px-5" style={{ borderColor: COULEURS.bord }}>
        <h1 className="m-0 text-[17px] font-extrabold uppercase tracking-[0.2em]">
          Le traîneau du <span style={{ color: COULEURS.or }}>Père Noël</span>
        </h1>
        <span className="font-serif text-sm italic" style={{ color: COULEURS.sous }}>
          Pose ses 5 arrêts autour de la Terre — le simulateur d&apos;eleveai.fr
        </span>
        <button
          type="button"
          onClick={basculerModeClasse}
          aria-pressed={modeClasse}
          className="ml-auto rounded-sm border px-2.5 py-1 font-mono text-[11px] font-bold tracking-wider transition"
          style={modeClasse ? { borderColor: COULEURS.or, background: COULEURS.or, color: COULEURS.fond } : { borderColor: "rgba(245,200,75,.4)", color: COULEURS.or }}
        >
          🖥️ MODE CLASSE {modeClasse ? "✓" : ""}
        </button>
      </header>

      {/* Le niveau */}
      <nav aria-label="Choisis ton niveau" className="flex flex-wrap gap-2 px-4 pt-3 sm:px-5">
        {NIVEAUX.map((n) => (
          <button
            key={n.id}
            type="button"
            onClick={() => nouveauTour(n.id)}
            aria-pressed={niveau === n.id}
            className={`rounded-full border px-3.5 py-1.5 font-bold transition ${modeClasse ? "text-lg" : "text-sm"}`}
            style={niveau === n.id ? { background: COULEURS.or, borderColor: COULEURS.or, color: COULEURS.fond } : { borderColor: COULEURS.bord, color: COULEURS.texte, background: COULEURS.carte }}
          >
            {n.label}
            <span className="ml-1.5 hidden font-normal opacity-80 sm:inline">· {n.maths}</span>
          </button>
        ))}
      </nav>

      <main className="grid grid-cols-1 gap-4 px-4 py-3 sm:px-5 lg:grid-cols-[minmax(0,1fr)_380px]">
        {/* ── Le dessin ── */}
        <div className="relative overflow-hidden rounded-2xl border" style={{ borderColor: COULEURS.bord, background: "#0a1228" }}>
          <p className={`mx-auto mt-2 w-fit rounded-full border px-3 py-1 text-center ${modeClasse ? "text-lg" : "text-[13px]"}`} style={{ borderColor: "rgba(245,200,75,.35)", background: "rgba(10,18,40,.9)" }}>
            {vol === "pret" && arrets.length < NB_ARRETS
              ? `👆 Clique sur la route dorée : arrêt ${arrets.length + 1} / ${NB_ARRETS}`
              : vol === "en-vol"
                ? "🛷 Le traîneau suit minuit…"
                : vol === "fini"
                  ? "⭐ Tour du monde terminé !"
                  : "✅ 5 arrêts posés : lance le traîneau !"}
          </p>
          <svg
            ref={svgRef}
            viewBox="-60 -20 520 440"
            style={{ maxHeight: "72vh" }}
            className={`mx-auto block w-full select-none ${vol === "pret" && arrets.length < NB_ARRETS ? "cursor-crosshair" : ""}`}
            onClick={cliquer}
            role="img"
            aria-label="La Terre vue du pôle Nord, la route du traîneau et les villages"
          >
            {ETOILES.map((e, i) => (
              <circle key={i} className="pn-etoile" cx={e.x} cy={e.y} r={e.t} fill="#fff" style={{ ["--o" as string]: e.o, opacity: e.o, animationDelay: `${(i % 9) * 0.45}s` }} />
            ))}
            <defs>
              <radialGradient id="pn-ocean" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#2f7fb3" />
                <stop offset="100%" stopColor="#174a73" />
              </radialGradient>
            </defs>
            {/* La Terre vue du pôle Nord */}
            <circle cx="200" cy="200" r="118" fill="url(#pn-ocean)" />
            {Array.from({ length: 24 }, (_, i) => {
              const lon = i * 15 + 7.5;
              const [x1, y1] = pos(lon, 30), [x2, y2] = pos(lon, 118);
              return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#fff" strokeOpacity={niveau === "6e" ? 0.22 : 0.1} />;
            })}
            {niveau === "6e" &&
              Array.from({ length: 24 }, (_, i) => {
                const h = i - 11; // −11 … +12
                const [x, y] = pos(h * 15, 100);
                return (
                  <text key={h} x={x} y={y + 3.5} textAnchor="middle" fontSize="10" fontWeight={h === REUNION_FUSEAU ? 800 : 600} fill={h === REUNION_FUSEAU ? COULEURS.or : "#d6e4f5"}>
                    {signe(h)}
                  </text>
                );
              })}
            <circle cx="200" cy="200" r="30" fill="#e8f4fb" />
            <text x="200" y="203" textAnchor="middle" fontSize="9" fill="#5a7a96">pôle Nord</text>

            {/* La Réunion */}
            {(() => {
              const [x, y] = pos(REUNION_LON, niveau === "6e" ? 84 : 104);
              return (
                <g>
                  <circle cx={x} cy={y} r={reunionServie ? 6 : 4.5} fill={COULEURS.or} stroke="#fff" strokeWidth="1.2" />
                  <text x={x} y={y - 9} textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">La Réunion</text>
                </g>
              );
            })()}

            {/* Minuit : la ligne qui avance de 15° par heure */}
            {vol !== "pret" && (() => {
              const [x, y] = pos(lonTraineau, 118);
              return <line x1="200" y1="200" x2={x} y2={y} stroke={COULEURS.or} strokeWidth="1.5" strokeDasharray="3 3" opacity="0.8" />;
            })()}

            {/* La route dorée */}
            <circle cx="200" cy="200" r="150" fill="none" stroke={COULEURS.or} strokeWidth="2" strokeDasharray="2 6" strokeLinecap="round" opacity="0.75" />
            {/* Départ : ligne de changement de date */}
            <g>
              <path d="M200 44 l3 6 6 1 -4.5 4 1 6 -5.5 -3 -5.5 3 1 -6 -4.5 -4 6 -1z" fill={COULEURS.or} />
              <text x="200" y="38" textAnchor="middle" fontSize="10" fill={COULEURS.sous}>départ</text>
            </g>

            {/* Les villages */}
            {arrets.map((a) => {
              const [x, y] = pos(a.lon, 150);
              const [lx, ly] = pos(a.lon, 172);
              const ancre = lx > 215 ? "start" : lx < 185 ? "end" : "middle";
              const ok = servi(a);
              return (
                <g key={a.lon} className="pn-pop">
                  <rect x={x - 7} y={y - 4} width="14" height="10" fill={ok ? "#ffe9a8" : "#d9c7a3"} stroke="#5a3b1e" strokeWidth="1" />
                  <path d={`M${x - 9} ${y - 3} L${x} ${y - 12} L${x + 9} ${y - 3}Z`} fill={COULEURS.rouge} />
                  <rect x={x - 2} y={y + 1} width="4" height="5" fill={ok ? COULEURS.or : "#5a3b1e"} />
                  {ok && <text x={x} y={y - 15} textAnchor="middle" fontSize="13" className="pn-pop">🎁</text>}
                  <text x={lx} y={ly + 4} textAnchor={ancre} fontSize="13.5" fontWeight="700" fill={ok ? COULEURS.or : "#fff"}>
                    {a.nom}
                  </text>
                  {niveau === "6e" && (
                    <text x={lx} y={ly + 18} textAnchor={ancre} fontSize="11.5" fill={COULEURS.sous}>UTC{signe(fuseau(a.lon))}</text>
                  )}
                  {niveau === "4e" && (
                    <text x={lx} y={ly + 18} textAnchor={ancre} fontSize="11.5" fill={COULEURS.sous}>{Math.abs(a.lon)}° {a.lon >= 0 ? "E" : "O"}</text>
                  )}
                </g>
              );
            })}

            {/* Le traîneau */}
            {vol !== "pret" && (
              <g transform={`translate(${sx} ${sy})`}>
                <path d="M-16 5 Q-18 10 -12 10 L14 10" fill="none" stroke={COULEURS.or} strokeWidth="2" strokeLinecap="round" />
                <path d="M-13 -2 L10 -2 Q14 -2 13 3 L12 7 L-11 7 Q-15 4 -13 -2Z" fill={COULEURS.rouge} stroke="#7a1a14" strokeWidth="1" />
                <circle cx="-2" cy="-8" r="5" fill={COULEURS.rouge} />
                <circle cx="-2" cy="-6" r="3.2" fill="#fff" />
                <circle cx="-2" cy="-10" r="2.2" fill="#f2c9a6" />
                <rect x="4" y="-9" width="7" height="7" rx="1.5" fill="#8b5a2b" />
              </g>
            )}
          </svg>
          <p className="px-3 pb-2 text-center text-xs" style={{ color: COULEURS.sous }}>
            La Terre vue du pôle Nord. Le Père Noël part de la ligne de changement de date et vole vers l&apos;ouest, avec minuit.
          </p>
        </div>

        {/* ── Le pupitre ── */}
        <aside className={`flex flex-col gap-3 ${t}`}>
          {/* Compteur du vol */}
          <div className="rounded-2xl border p-4" style={{ borderColor: COULEURS.bord, background: COULEURS.carte }}>
            {niveau === "cp" && (
              <>
                <p className="font-bold">🛷 Le sac du traîneau : <span style={{ color: COULEURS.or }}>{SAC_CP - cadeauxDonnes}</span> cadeaux</p>
                <div className="mt-2 grid grid-cols-10 gap-1" aria-hidden="true">
                  {Array.from({ length: SAC_CP }, (_, i) => (
                    <span key={i} className="text-center text-lg leading-none transition-opacity duration-300" style={{ opacity: i < SAC_CP - cadeauxDonnes ? 1 : 0.15 }}>🎁</span>
                  ))}
                </div>
              </>
            )}
            {niveau === "cm" && (
              <p className="font-bold">
                🛷 Le sac : {arrets.length === NB_ARRETS ? <span style={{ color: COULEURS.or }}>{fr(sacCm - cadeauxDonnes)}</span> : "…"} cadeaux
                {arrets.length === NB_ARRETS && <span className="block text-sm font-normal" style={{ color: COULEURS.sous }}>au départ : {fr(sacCm)} · {k} cadeaux par enfant</span>}
              </p>
            )}
            {niveau === "6e" && (
              <p className="font-bold">
                🕛 Heures de vol : <span style={{ color: COULEURS.or }}>{fr(heuresVol)} h</span>
                <span className="block text-sm font-normal" style={{ color: COULEURS.sous }}>Minuit avance de 15° par heure. La Réunion : UTC+4.</span>
              </p>
            )}
            {niveau === "4e" && (
              <p className="font-bold">
                📏 Distance parcourue : <span style={{ color: COULEURS.or }}>{fr(kmVol)} km</span>
                <span className="block text-sm font-normal" style={{ color: COULEURS.sous }}>Un tour = 360° = 40 000 km, donc 9° = 1 000 km.</span>
              </p>
            )}
            {reunionServie && <p className="mt-2 text-sm" style={{ color: COULEURS.ok }}>🦎 Ti Margo a reçu son cadeau à La Réunion !</p>}
            {message && <p className="mt-2 text-sm" style={{ color: COULEURS.rate }}>{message}</p>}
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                disabled={arrets.length < NB_ARRETS || vol === "en-vol"}
                onClick={() => { setP(0); setVol("en-vol"); }}
                className="rounded-xl px-4 py-2 font-black transition disabled:opacity-40"
                style={{ background: COULEURS.or, color: COULEURS.fond }}
              >
                🛷 {vol === "fini" ? "Relancer" : "Lancer le traîneau"}
              </button>
              <button type="button" onClick={() => nouveauTour()} className="rounded-xl border px-4 py-2 font-bold" style={{ borderColor: COULEURS.bord }}>
                ↺ Nouveau tour
              </button>
            </div>
          </div>

          {/* Les villages, dans l'ordre de passage */}
          {arrets.length > 0 && (
            <div className="rounded-2xl border p-4" style={{ borderColor: COULEURS.bord, background: COULEURS.carte }}>
              <p className="font-bold">🏘️ Les villages {niveau === "6e" ? "(dans l'ordre où tu les as posés)" : "(ordre de passage)"}</p>
              <ul className="mt-2 space-y-1.5">
                {(niveau === "6e" ? arrets : ordre).map((a) => (
                  <li key={a.lon} className="flex flex-wrap items-center gap-x-2" style={{ color: servi(a) ? COULEURS.or : undefined }}>
                    <b>{a.nom}</b>
                    {niveau === "cp" && <span aria-label={`${a.cadeaux} cadeaux`}>{"🎁".repeat(a.cadeaux)}</span>}
                    {niveau === "cm" && <span>{a.enfants} enfants × {k} cadeaux</span>}
                    {niveau === "6e" && <span style={{ color: COULEURS.sous }}>UTC{signe(fuseau(a.lon))}</span>}
                    {niveau === "4e" && <span style={{ color: COULEURS.sous }}>{Math.abs(a.lon)}° {a.lon >= 0 ? "est" : "ouest"}</span>}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Les questions */}
          {questions.length > 0 && (
            <div className="rounded-2xl border p-4" style={{ borderColor: COULEURS.bord, background: COULEURS.carte }}>
              <p className="font-bold" style={{ color: COULEURS.or }}>🎄 À toi de calculer</p>
              <p className="text-sm" style={{ color: COULEURS.sous }}>Le traîneau vérifie pour toi : lance-le !</p>
              <ol className="mt-3 space-y-4">
                {questions.map((q, i) => {
                  const r = reponses[i];
                  return (
                    <li key={i}>
                      <p className="font-semibold">{i + 1}. {q.texte}</p>
                      {q.type === "qcm" ? (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {q.choix.map((c) => {
                            const choisi = r?.val === c;
                            return (
                              <button
                                key={c}
                                type="button"
                                onClick={() => verifier(i, c)}
                                className="rounded-xl border px-3.5 py-2 font-bold transition"
                                style={{
                                  borderColor: choisi ? (r?.etat === "ok" ? COULEURS.ok : COULEURS.rate) : COULEURS.bord,
                                  background: choisi ? (r?.etat === "ok" ? "rgba(69,209,138,.15)" : "rgba(255,157,107,.12)") : "#0b1530",
                                }}
                              >
                                {c}
                              </button>
                            );
                          })}
                        </div>
                      ) : (
                        <form
                          className="mt-2 flex flex-wrap items-center gap-2"
                          onSubmit={(e) => {
                            e.preventDefault();
                            const v = new FormData(e.currentTarget).get("rep");
                            verifier(i, String(v ?? ""));
                          }}
                        >
                          <input
                            name="rep"
                            inputMode="decimal"
                            autoComplete="off"
                            aria-label={`Réponse à la question ${i + 1}`}
                            placeholder="Ta réponse"
                            className="w-32 rounded-lg border px-3 py-2 text-[#eef2fb]"
                            style={{ borderColor: COULEURS.bord, background: "#0b1530" }}
                          />
                          <span style={{ color: COULEURS.sous }}>{q.unite}</span>
                          <button type="submit" className="rounded-xl px-3.5 py-2 font-black" style={{ background: COULEURS.or, color: COULEURS.fond }}>
                            Vérifier
                          </button>
                        </form>
                      )}
                      {r?.etat === "ok" && <p className="mt-1.5 text-sm" style={{ color: COULEURS.ok }}>✅ Bravo ! {q.explication}</p>}
                      {r?.etat === "rate" && <p className="mt-1.5 text-sm" style={{ color: COULEURS.rate }}>Pas encore. Indice : {q.indice}</p>}
                    </li>
                  );
                })}
              </ol>
            </div>
          )}

          {!embed && (
            <Link href="/noel" className="self-start rounded-xl border px-4 py-2 font-bold hover:bg-white/5" style={{ borderColor: COULEURS.bord }}>
              🎄 Le calendrier de l&apos;Avent des maths →
            </Link>
          )}
        </aside>
      </main>

      <footer className="flex flex-wrap items-center gap-x-4 gap-y-1.5 border-t px-5 py-2.5 text-[11.5px]" style={{ borderColor: COULEURS.bord, color: COULEURS.sous }}>
        <span className="flex items-center gap-2">
          <span className="h-2 w-2 flex-none rounded-full" style={{ background: COULEURS.or }} />
          Villages imaginaires : les noms et les nombres d&apos;enfants sont inventés.
        </span>
        {embed ? (
          <a href="https://www.eleveai.fr/simulateur-pere-noel?utm_source=widget&utm_medium=embed&utm_campaign=pere-noel" target="_blank" rel="noopener noreferrer" className="ml-auto font-mono underline underline-offset-2">
            Un jeu du <b style={{ color: COULEURS.or }}>Journal d&apos;EleveAI</b> 🦎 — eleveai.fr
          </a>
        ) : (
          <span className="ml-auto font-mono">
            Un jeu du <b style={{ color: COULEURS.or }}>Journal d&apos;EleveAI</b> 🦎
          </span>
        )}
      </footer>
    </div>
  );
}
