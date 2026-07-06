"use client";

import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import { ArrowLeft, Download, Sparkles, MapPin } from "lucide-react";
import { LIVRET, PICTOS, type Cell, type Picto } from "./data";

const SIGNUP_URL = "https://eleveai.fr/auth/signin?from=picto";
const TI_MARGO = "/cahier-vacances/ti-margo.png";

/* -------------------------------------------------------------------------- */
/*  Illustration : composition d'icônes + valeurs (façon ardoise)             */
/* -------------------------------------------------------------------------- */

function Icones({ e, n = 1, cap }: { e: string; n?: number; cap?: string }) {
  const affichees = Math.min(n, 6);
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="flex items-end gap-0.5">
        {Array.from({ length: affichees }).map((_, i) => (
          <span key={i} className="text-3xl leading-none print:text-2xl" aria-hidden>
            {e}
          </span>
        ))}
        {n > affichees && <span className="text-2xl font-black text-slate-400">…</span>}
      </div>
      {cap && <span className="text-center text-xs font-black text-slate-600">{cap}</span>}
    </div>
  );
}

function Cellule({ c }: { c: Cell }) {
  if (c.t === "ic") return <Icones e={c.e} n={c.n} cap={c.cap} />;
  if (c.t === "val")
    return (
      <div className="flex flex-col items-center gap-1">
        <span className="rounded-xl border-2 border-cyan-300 bg-cyan-50 px-3 py-1.5 text-base font-black text-cyan-800 print:text-sm">
          {c.v}
        </span>
        {c.cap && <span className="text-xs font-black text-slate-600">{c.cap}</span>}
      </div>
    );
  if (c.t === "qm")
    return (
      <div className="flex flex-col items-center gap-1">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl border-2 border-dashed border-amber-400 bg-amber-50 text-2xl font-black text-amber-600">
          ?
        </span>
        {c.cap && <span className="text-xs font-black text-slate-600">{c.cap}</span>}
      </div>
    );
  // op
  return <span className="px-0.5 text-2xl font-black text-slate-400 print:text-xl">{c.v}</span>;
}

function Illustration({ scene }: { scene: Cell[][] }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {scene.map((row, i) => (
        <div key={i} className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
          {row.map((c, j) => (
            <Cellule key={j} c={c} />
          ))}
        </div>
      ))}
    </div>
  );
}

/* Un carré partagé en 6 carrés : un bloc 2×2 + cinq carrés unité (L).
   Sert d'exemple visuel au défi « partage d'un carré en n carrés ». */
function DiagrammeCarres() {
  const U = 34; // taille d'un carré unité (px)
  const units = [
    [2, 0], [2, 1], [2, 2], // colonne de droite
    [0, 2], [1, 2], // bas gauche
  ];
  return (
    <div className="flex flex-col items-center gap-2">
      <svg viewBox="0 0 102 102" className="h-44 w-44" role="img" aria-label="Un jardin carré partagé en 6 parcelles carrées">
        {/* grande parcelle 2×2 */}
        <rect x={0} y={0} width={2 * U} height={2 * U} className="fill-emerald-100 stroke-emerald-700" strokeWidth={2} />
        {/* cinq parcelles unité */}
        {units.map(([x, y], i) => (
          <rect
            key={i}
            x={x * U}
            y={y * U}
            width={U}
            height={U}
            className="fill-amber-100 stroke-amber-600"
            strokeWidth={2}
          />
        ))}
        {/* contour du jardin */}
        <rect x={1} y={1} width={100} height={100} className="fill-none stroke-slate-800" strokeWidth={2.5} />
        <text x={100} y={99} fontSize={5} textAnchor="end" className="fill-slate-400" style={{ letterSpacing: "0.5px", fontWeight: 700 }}>
          eleveai.fr
        </text>
      </svg>
      <span className="text-xs font-black text-slate-600">Exemple : 6 parcelles carrées</span>
    </div>
  );
}

/* Le chat & la tortue : deux tables identiques, animaux échangés, avec les
   crochets de mesure 130 cm / 50 cm (façon schéma « hauteur de la table »). */
function DiagrammeTable() {
  return (
    <div className="flex flex-col items-center gap-2">
      <svg viewBox="0 0 350 210" className="w-full max-w-md" role="img" aria-label="Deux tables identiques : à gauche le chat sur la table et la tortue au sol (130 cm), à droite la tortue sur la table et le chat au sol (50 cm)">
        {/* ── Table de gauche : chat en haut, tortue en bas ── */}
        <g className="fill-slate-800">
          <rect x={25} y={118} width={110} height={6} rx={2} />
          <rect x={74} y={124} width={6} height={54} />
          <rect x={45} y={178} width={64} height={6} rx={2} />
        </g>
        <text x={80} y={114} fontSize={26} textAnchor="middle">🐱</text>
        <text x={92} y={177} fontSize={20} textAnchor="middle">🐢</text>
        {/* crochet 130 cm */}
        <g className="stroke-cyan-600" strokeWidth={2} fill="none">
          <path d="M150 90 h-8 M150 90 V180 M150 180 h-8" />
        </g>
        <text x={150} y={84} fontSize={13} fontWeight={800} textAnchor="middle" className="fill-cyan-700">
          130 cm
        </text>

        {/* ── Table de droite : tortue en haut, chat au sol (dressé) ── */}
        <g className="fill-slate-800">
          <rect x={200} y={118} width={110} height={6} rx={2} />
          <rect x={249} y={124} width={6} height={54} />
          <rect x={220} y={178} width={64} height={6} rx={2} />
        </g>
        <text x={255} y={114} fontSize={22} textAnchor="middle">🐢</text>
        <text x={272} y={206} fontSize={26} textAnchor="middle">🐱</text>
        {/* crochet 50 cm */}
        <g className="stroke-cyan-600" strokeWidth={2} fill="none">
          <path d="M322 100 h-8 M322 100 V152 M322 152 h-8" />
        </g>
        <text x={322} y={94} fontSize={13} fontWeight={800} textAnchor="middle" className="fill-cyan-700">
          50 cm
        </text>

        {/* sol */}
        <line x1={10} y1={186} x2={340} y2={186} className="stroke-slate-300" strokeWidth={1.5} strokeDasharray="3 3" />
        <text x={340} y={205} fontSize={9} textAnchor="end" className="fill-slate-400" style={{ letterSpacing: "0.5px", fontWeight: 700 }}>
          eleveai.fr
        </text>
      </svg>
      <span className="text-center text-xs font-black text-slate-600">
        La table est la même des deux côtés.
      </span>
    </div>
  );
}

/* Le carton (pavé droit) en perspective : l'aire de ses trois faces visibles.
   Façon schéma « quel est le volume de la boîte ? ». */
function DiagrammeBoite() {
  return (
    <div className="flex flex-col items-center gap-2">
      <svg viewBox="0 0 300 220" className="w-full max-w-sm" role="img" aria-label="Un carton (pavé droit) avec l'aire de ses trois faces : 135 cm² de face, 60 cm² sur le dessus, 36 cm² sur le côté">
        {/* dessus */}
        <polygon points="40,110 200,110 245,78 85,78" className="fill-slate-600 stroke-slate-900" strokeWidth={2} strokeLinejoin="round" />
        {/* côté droit */}
        <polygon points="200,110 245,78 245,168 200,200" className="fill-slate-700 stroke-slate-900" strokeWidth={2} strokeLinejoin="round" />
        {/* face avant */}
        <rect x={40} y={110} width={160} height={90} className="fill-slate-900 stroke-slate-900" strokeWidth={2} />

        {/* aires */}
        <text x={120} y={160} fontSize={22} fontWeight={800} textAnchor="middle" className="fill-white">135 cm²</text>
        <text x={143} y={99} fontSize={13} fontWeight={800} textAnchor="middle" className="fill-white">60 cm²</text>
        <text x={222} y={140} fontSize={13} fontWeight={800} textAnchor="middle" className="fill-white">36 cm²</text>

        <text x={245} y={214} fontSize={9} textAnchor="end" className="fill-slate-400" style={{ letterSpacing: "0.5px", fontWeight: 700 }}>
          eleveai.fr
        </text>
      </svg>
      <span className="text-center text-xs font-black text-slate-600">
        L&apos;aire des trois faces du carton
      </span>
    </div>
  );
}

/* Fraction dessinée (numérateur / barre / dénominateur) centrée en (cx, cy). */
function Frac({ cx, cy, n, d }: { cx: number; cy: number; n: number; d: number }) {
  return (
    <g className="fill-slate-800">
      <text x={cx} y={cy - 3} fontSize={13} fontWeight={800} textAnchor="middle">{n}</text>
      <line x1={cx - 9} y1={cy + 1} x2={cx + 9} y2={cy + 1} className="stroke-slate-800" strokeWidth={1.5} />
      <text x={cx} y={cy + 15} fontSize={13} fontWeight={800} textAnchor="middle">{d}</text>
    </g>
  );
}

/* Carré magique 3×3 de fractions : 3 cases connues, à compléter.
   Façon slide « découvre la somme totale et complète le carré ». */
function DiagrammeCarreMagique() {
  const O = 8; // origine
  const C = 44; // taille d'une case
  const centres = [O + C / 2, O + C + C / 2, O + 2 * C + C / 2]; // centres des 3 lignes/colonnes
  return (
    <div className="flex flex-col items-center gap-2">
      <svg viewBox="0 0 160 172" className="h-52 w-52" role="img" aria-label="Carré magique 3 sur 3 de fractions : centre 1/3, milieu-droite 1/3, bas-gauche 4/9, les autres cases sont à compléter">
        {/* grille */}
        <g className="fill-none stroke-slate-800" strokeWidth={2}>
          <rect x={O} y={O} width={3 * C} height={3 * C} />
          <line x1={O + C} y1={O} x2={O + C} y2={O + 3 * C} />
          <line x1={O + 2 * C} y1={O} x2={O + 2 * C} y2={O + 3 * C} />
          <line x1={O} y1={O + C} x2={O + 3 * C} y2={O + C} />
          <line x1={O} y1={O + 2 * C} x2={O + 3 * C} y2={O + 2 * C} />
        </g>
        {/* cases connues */}
        <Frac cx={centres[1]} cy={centres[1]} n={1} d={3} />
        <Frac cx={centres[2]} cy={centres[1]} n={1} d={3} />
        <Frac cx={centres[0]} cy={centres[2]} n={4} d={9} />

        <text x={O + 3 * C} y={168} fontSize={9} textAnchor="end" className="fill-slate-400" style={{ letterSpacing: "0.5px", fontWeight: 700 }}>
          eleveai.fr
        </text>
      </svg>
      <span className="text-center text-xs font-black text-slate-600">
        Complète les cases vides.
      </span>
    </div>
  );
}

/* Une roue dentée : corps + dents réparties + moyeu. `rot` décale l'angle des
   dents pour les imbriquer avec la roue voisine (engrènement). */
function Gear({ cx, cy, r, teeth, cls, hub, rot = 0 }: { cx: number; cy: number; r: number; teeth: number; cls: string; hub: string; rot?: number }) {
  const th = Math.max(6, Math.round(r * 0.2)); // hauteur de dent
  const tw = Math.max(4, ((2 * Math.PI * r) / teeth) * 0.55); // largeur de dent
  return (
    <g className={cls} strokeWidth={1.5} strokeLinejoin="round" transform={rot ? `rotate(${rot} ${cx} ${cy})` : undefined}>
      {Array.from({ length: teeth }).map((_, i) => (
        <rect
          key={i}
          x={cx - tw / 2}
          y={cy - r - th}
          width={tw}
          height={th + 3}
          rx={1}
          transform={`rotate(${(360 / teeth) * i} ${cx} ${cy})`}
        />
      ))}
      <circle cx={cx} cy={cy} r={r} />
      <circle cx={cx} cy={cy} r={r * 0.3} className={hub} strokeWidth={1.5} />
    </g>
  );
}

/* Deux roues qui engrènent (proportionnalité inverse) : la grande B (30 dents)
   entraîne la petite A (10 dents). Façon slide « engrenages ». */
function DiagrammeEngrenages() {
  return (
    <div className="flex flex-col items-center gap-2">
      <svg viewBox="0 0 225 200" className="w-full max-w-sm" role="img" aria-label="Deux roues dentées qui engrènent : la grande B a 30 dents, la petite A a 10 dents">
        <Gear cx={82} cy={105} r={50} teeth={30} cls="fill-amber-300 stroke-amber-600" hub="fill-white stroke-amber-600" />
        <Gear cx={164} cy={105} r={18} teeth={10} rot={18} cls="fill-rose-300 stroke-rose-600" hub="fill-white stroke-rose-600" />

        {/* lettres dans les moyeux */}
        <text x={82} y={111} fontSize={17} fontWeight={800} textAnchor="middle" className="fill-amber-800">B</text>
        <text x={164} y={110} fontSize={12} fontWeight={800} textAnchor="middle" className="fill-rose-800">A</text>

        {/* nombres de dents */}
        <text x={82} y={180} fontSize={13} fontWeight={800} textAnchor="middle" className="fill-slate-700">30 dents</text>
        <text x={164} y={150} fontSize={12} fontWeight={800} textAnchor="middle" className="fill-slate-700">10 dents</text>

        {/* tours */}
        <text x={82} y={38} fontSize={13} fontWeight={800} textAnchor="middle" className="fill-amber-700">↻ 1 tour</text>
        <text x={164} y={72} fontSize={12} fontWeight={800} textAnchor="middle" className="fill-rose-700">↻ ? tours</text>

        <text x={220} y={196} fontSize={9} textAnchor="end" className="fill-slate-400" style={{ letterSpacing: "0.5px", fontWeight: 700 }}>
          eleveai.fr
        </text>
      </svg>
      <span className="text-center text-xs font-black text-slate-600">
        Les deux roues engrènent.
      </span>
    </div>
  );
}

/* Une bouteille remplie d'eau à la fraction `fill` (0 → 1), depuis le bas. */
function Bouteille({ x, fill }: { x: number; fill: number }) {
  const bodyY = 32;
  const bodyH = 46;
  const waterH = bodyH * fill;
  return (
    <g>
      <rect x={x + 6} y={22} width={6} height={12} className="fill-white stroke-slate-500" strokeWidth={1.5} />
      <rect x={x} y={bodyY} width={18} height={bodyH} rx={4} className="fill-white stroke-slate-500" strokeWidth={1.5} />
      {fill > 0 && (
        <rect x={x + 1.5} y={bodyY + bodyH - waterH} width={15} height={waterH} rx={2} className="fill-sky-400" />
      )}
    </g>
  );
}

/* « Y a-t-il une réponse fausse ? » : le tiers de 3 bouteilles, montré de deux
   façons (Maya : 1 pleine ; Noé : 1/3 de chacune). Même quantité. */
function DiagrammeBouteilles() {
  const t = 1 / 3;
  return (
    <div className="flex flex-col items-center gap-2">
      <svg viewBox="0 0 236 120" className="w-full max-w-md" role="img" aria-label="Deux réponses : Maya colorie 1 bouteille entière sur 3 ; Noé colorie le tiers de chacune des 3 bouteilles">
        {/* Réponse de Maya : 1 pleine + 2 vides */}
        <Bouteille x={16} fill={1} />
        <Bouteille x={42} fill={0} />
        <Bouteille x={68} fill={0} />
        <text x={53} y={104} fontSize={12} fontWeight={800} textAnchor="middle" className="fill-slate-700">Maya</text>

        {/* séparateur */}
        <line x1={120} y1={20} x2={120} y2={88} className="stroke-slate-300" strokeWidth={1.5} strokeDasharray="3 3" />

        {/* Réponse de Noé : 1/3 de chacune */}
        <Bouteille x={150} fill={t} />
        <Bouteille x={176} fill={t} />
        <Bouteille x={202} fill={t} />
        <text x={185} y={104} fontSize={12} fontWeight={800} textAnchor="middle" className="fill-slate-700">Noé</text>

        <text x={232} y={116} fontSize={9} textAnchor="end" className="fill-slate-400" style={{ letterSpacing: "0.5px", fontWeight: 700 }}>
          eleveai.fr
        </text>
      </svg>
      <span className="text-center text-xs font-black text-slate-600">
        Le bleu = l&apos;eau déjà bue.
      </span>
    </div>
  );
}

/* Un verre (trapèze) rempli de chocolat (marron) ou de lait (crème). */
function Verre({ x, kind }: { x: number; kind: "choc" | "lait" }) {
  const topY = 30;
  const w = 20;
  const h = 32;
  const inset = 3;
  const cls =
    kind === "choc" ? "fill-amber-800 stroke-amber-900" : "fill-amber-50 stroke-slate-400";
  return (
    <path
      d={`M${x},${topY} L${x + w},${topY} L${x + w - inset},${topY + h} L${x + inset},${topY + h} Z`}
      className={cls}
      strokeWidth={1.5}
      strokeLinejoin="round"
    />
  );
}

/* « Quel mélange a le plus le goût de chocolat ? » : comparer deux proportions.
   A = 3 chocolat / 2 lait (3/5) ; B = 2 chocolat / 1 lait (2/3). */
function DiagrammeChocolat() {
  // suites de verres, marron (choc) puis crème (lait)
  const A: ("choc" | "lait")[] = ["choc", "choc", "choc", "lait", "lait"];
  const B: ("choc" | "lait")[] = ["choc", "choc", "lait"];
  return (
    <div className="flex flex-col items-center gap-2">
      <svg viewBox="0 0 232 96" className="w-full max-w-md" role="img" aria-label="Mélange A : 3 verres de chocolat et 2 de lait. Mélange B : 2 verres de chocolat et 1 de lait.">
        {A.map((k, i) => (
          <Verre key={`a${i}`} x={8 + i * 22} kind={k} />
        ))}
        <text x={55} y={80} fontSize={12} fontWeight={800} textAnchor="middle" className="fill-slate-700">Mélange A</text>

        <line x1={128} y1={22} x2={128} y2={68} className="stroke-slate-300" strokeWidth={1.5} strokeDasharray="3 3" />

        {B.map((k, i) => (
          <Verre key={`b${i}`} x={140 + i * 22} kind={k} />
        ))}
        <text x={173} y={80} fontSize={12} fontWeight={800} textAnchor="middle" className="fill-slate-700">Mélange B</text>

        <text x={228} y={92} fontSize={9} textAnchor="end" className="fill-slate-400" style={{ letterSpacing: "0.5px", fontWeight: 700 }}>
          eleveai.fr
        </text>
      </svg>
      <span className="text-center text-xs font-black text-slate-600">
        Marron = chocolat · blanc = lait
      </span>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Une page-défi (une par picto)                                             */
/* -------------------------------------------------------------------------- */

function PagePicto({ p, index, total }: { p: Picto; index: number; total: number }) {
  return (
    <section className="picto-page mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-300/40 print:mt-0 print:rounded-none print:border-0 print:shadow-none">
      {/* Bandeau thème */}
      <header className="flex items-center justify-between gap-3 bg-gradient-to-r from-cyan-600 to-teal-600 px-6 py-3 text-white">
        <span className="inline-flex items-center gap-2 text-sm font-black">
          <span className="text-xl leading-none">{p.emoji}</span>
          {p.theme}
        </span>
        <span className="rounded-full border border-white/40 px-2 py-0.5 text-[11px] font-black tabular-nums">
          {p.ref}
        </span>
      </header>

      <div className="flex flex-col gap-5 px-6 py-6 print:py-5">
        <p className="inline-flex items-center gap-1.5 text-xs font-black text-cyan-700">
          <MapPin className="h-3.5 w-3.5" />
          {p.lieu}
        </p>

        {/* La grande question */}
        <h2 className="text-center text-2xl font-black leading-tight text-slate-900 sm:text-3xl print:text-2xl">
          {p.question}
        </h2>

        {/* Ardoise : l'illustration */}
        <div className="relative rounded-2xl border-2 border-slate-200 bg-slate-50/60 px-4 py-7 print:py-6">
          {p.enonce && (
            <p className="mb-5 text-center text-sm font-bold text-slate-600 print:text-xs">{p.enonce}</p>
          )}
          {p.diagram === "carres" ? (
            <DiagrammeCarres />
          ) : p.diagram === "table" ? (
            <DiagrammeTable />
          ) : p.diagram === "boite" ? (
            <DiagrammeBoite />
          ) : p.diagram === "carremagique" ? (
            <DiagrammeCarreMagique />
          ) : p.diagram === "engrenages" ? (
            <DiagrammeEngrenages />
          ) : p.diagram === "bouteilles" ? (
            <DiagrammeBouteilles />
          ) : p.diagram === "chocolat" ? (
            <DiagrammeChocolat />
          ) : (
            <Illustration scene={p.scene} />
          )}
          {/* Marque gravée dans le visuel : voyage avec le défi si on le partage seul */}
          <span className="pointer-events-none absolute bottom-2 right-3 select-none text-[9px] font-black uppercase tracking-[0.15em] text-slate-300">
            eleveai.fr
          </span>
        </div>

        {/* Pistes + place pour chercher */}
        <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
          <div className="rounded-xl border border-dashed border-amber-300 bg-amber-50/60 px-4 py-3">
            <p className="text-xs font-black uppercase tracking-wide text-amber-700">💡 Un coup de pouce</p>
            <p className="mt-1 text-sm font-semibold leading-snug text-slate-700 print:text-xs">{p.piste}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2 self-start">
            <span className="rounded-full bg-cyan-100 px-2.5 py-1 text-xs font-black text-cyan-700">
              {p.niveau}
            </span>
            <span className="rounded-full bg-teal-100 px-2.5 py-1 text-xs font-black text-teal-700">
              {p.notion}
            </span>
          </div>
        </div>

        {/* Zone de recherche (ardoise effaçable / brouillon) */}
        <div className="rounded-2xl border-2 border-dashed border-slate-200 px-4 py-6 text-center print:py-10">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-300">
            Mon ardoise — je cherche ici
          </p>
        </div>

        <div className="flex items-center justify-between border-t border-slate-100 pt-3">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wide text-slate-400">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={TI_MARGO} alt="" className="h-4 w-4 object-contain opacity-70" />
            {LIVRET.titre} · {LIVRET.domaine}
          </span>
          <span className="flex flex-col items-end gap-0.5 text-[11px] font-black text-slate-400">
            <span className="tabular-nums">Défi {index + 1} / {total} · eleveai.fr</span>
            <span className="inline-flex items-center gap-1 text-[10px] font-bold normal-case text-slate-400">
              <span aria-hidden>{LIVRET.creditEmoji}</span>
              {LIVRET.credit}
            </span>
          </span>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Page corrigés (regroupés à la fin)                                        */
/* -------------------------------------------------------------------------- */

function PageCorriges() {
  return (
    <section className="picto-page mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-300/40 print:mt-0 print:rounded-none print:border-0 print:p-6 print:shadow-none">
      <header className="mb-5 flex items-center gap-2 border-b border-slate-100 pb-4">
        <span className="text-2xl">✅</span>
        <div>
          <h2 className="text-2xl font-black text-slate-900">Les corrigés</h2>
          <p className="text-sm font-semibold text-slate-500">À regarder après avoir cherché !</p>
        </div>
      </header>
      <ol className="space-y-3">
        {PICTOS.map((p) => (
          <li key={p.ref} className="rounded-xl border border-slate-100 bg-slate-50/60 px-4 py-3">
            <p className="flex flex-wrap items-center gap-2 text-sm font-black text-slate-800">
              <span className="rounded border border-slate-300 px-1.5 py-0.5 text-[11px] tabular-nums text-slate-500">
                {p.ref}
              </span>
              <span>{p.emoji}</span>
              {p.question}
            </p>
            <p className="mt-1.5 text-sm leading-6 text-slate-700 print:text-xs">{p.reponse}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Livret complet                                                            */
/* -------------------------------------------------------------------------- */

export default function PictoMathsClient() {
  return (
    <main className="relative isolate min-h-screen bg-[#f2fbfd] text-slate-800">
      {/* Barre écran */}
      <div className="screen-only border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl flex-col gap-4 px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <Link
            href="/maths-974"
            className="inline-flex w-fit items-center gap-1.5 rounded-full border border-slate-300 bg-white px-3.5 py-1.5 text-sm font-bold text-slate-700 shadow-sm transition hover:border-slate-400 hover:bg-slate-50"
          >
            <ArrowLeft className="h-4 w-4" />
            Maths Réel · 974
          </Link>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex w-fit items-center gap-2 rounded-full bg-cyan-600 px-5 py-3 text-sm font-black text-white shadow-lg shadow-cyan-600/30 transition hover:bg-cyan-500"
          >
            <Download className="h-4 w-4" />
            Imprimer / PDF
          </button>
        </div>
      </div>

      {/* CTA aimant (écran) */}
      <div className="screen-only mx-auto max-w-4xl px-5 pt-5 sm:px-8">
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-cyan-300 bg-gradient-to-r from-cyan-50 to-teal-50 p-4 text-center shadow-sm sm:flex-row sm:justify-between sm:text-left">
          <p className="text-sm font-black text-slate-900 sm:text-base">
            🦎 Ces défis plaisent&nbsp;? Le <span className="text-cyan-700">coach IA</span> continue en
            ligne — <span className="text-cyan-700">gratuit</span>, à ton rythme et sans jugement.
          </p>
          <Link
            href="/explorer?from=picto"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-cyan-600 px-5 py-3 text-sm font-black text-white shadow-lg shadow-cyan-600/30 transition hover:bg-cyan-500 hover:scale-105"
          >
            <Sparkles className="h-4 w-4" />
            Commencer gratuitement →
          </Link>
        </div>
      </div>

      <article className="mx-auto max-w-4xl px-5 py-8 sm:px-8 print:max-w-none print:px-0 print:py-0">
        {/* Couverture */}
        <section className="picto-page couverture-page flex flex-col items-center justify-center overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-cyan-50 via-white to-amber-50 p-8 text-center shadow-xl shadow-slate-300/40 print:rounded-none print:border-0 print:shadow-none">
          <span className="text-6xl">🌋</span>
          <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-cyan-100 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-cyan-700">
            <Sparkles className="h-4 w-4" />
            Défis à imprimer · gratuit
          </p>
          <h1 className="mt-3 text-6xl font-black tracking-tight text-slate-900 print:text-5xl">
            {LIVRET.titre}
            <span className="ml-2 rounded-2xl bg-amber-300 px-3 text-slate-900">{LIVRET.domaine}</span>
          </h1>
          <p className="mt-3 max-w-md text-base font-bold text-slate-500">{LIVRET.baseline}</p>
          <p className="mt-4 max-w-lg text-sm font-semibold leading-6 text-slate-600">{LIVRET.intro}</p>
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            <span className="rounded-full bg-cyan-50 px-2.5 py-1 text-xs font-black text-cyan-700">
              {PICTOS.length} défis
            </span>
            <span className="rounded-full bg-teal-50 px-2.5 py-1 text-xs font-black text-teal-700">
              CM2 → 3ᵉ
            </span>
            <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-black text-amber-700">
              1 image · 1 question
            </span>
          </div>
          <div className="mt-6 flex flex-col items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={TI_MARGO} alt="Ti Margo" className="h-16 w-16 object-contain" />
            <QRCodeSVG value={SIGNUP_URL} size={84} />
            <p className="text-sm font-black text-cyan-700">eleveai.fr</p>
            <p className="text-[10px] font-black uppercase tracking-wide text-slate-400">
              une autre façon d&apos;apprendre
            </p>
            <p className="mt-1 inline-flex items-center gap-1 text-[11px] font-bold text-slate-500">
              <span aria-hidden>{LIVRET.creditEmoji}</span>
              {LIVRET.credit}
            </p>
            <p className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-500">
              <span aria-hidden>🏫</span>
              pour les collèges en progrès
            </p>
          </div>
        </section>

        {/* Les défis, un par page */}
        {PICTOS.map((p, i) => (
          <PagePicto key={p.ref} p={p} index={i} total={PICTOS.length} />
        ))}

        {/* Corrigés */}
        <PageCorriges />
      </article>

      <style jsx global>{`
        @media print {
          @page {
            size: A4;
            margin: 8mm;
          }
          html,
          body {
            background: white !important;
            color: #0f172a !important;
          }
          body > header,
          body > footer,
          .screen-only {
            display: none !important;
          }
          main {
            min-height: auto !important;
            background: white !important;
          }
          .picto-page {
            break-after: page;
            page-break-after: always;
            break-inside: avoid;
          }
          .picto-page:last-child {
            break-after: auto;
            page-break-after: auto;
          }
          .couverture-page {
            min-height: 262mm;
            padding: 12mm !important;
          }
        }
      `}</style>
    </main>
  );
}
