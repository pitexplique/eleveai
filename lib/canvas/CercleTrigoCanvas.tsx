// lib/canvas/CercleTrigoCanvas.tsx
//
// LE CERCLE TRIGONOMÉTRIQUE (26/09/2026, 1re spé). Frédéric : « créer un canvas
// cercle avec valeurs remarquables ».
//
// Ce qu'il MONTRE : le repère, le cercle de rayon 1, les réels remarquables
// posés sur le cercle en fractions de π, et pour un point étudié l'arc parcouru
// depuis I et ses projections — le cosinus au pied sur l'axe des abscisses, le
// sinus sur l'axe des ordonnées.
//
// ⭐ Les valeurs écrites sont CALCULÉES (`cercle-trigo-valeurs.ts`), jamais
// passées par l'appelant : on décrit un réel, le dessin en déduit le reste.
// ⚠️ Repère SVG : l'axe des ordonnées descend. Un réel θ se place en
// (cx + r·cos θ ; cy − r·sin θ).
"use client";

import type { CercleTrigoCanvasData, AngleTrigo } from "@/lib/tutor-v4/types_canvas";
import {
  REPERES_PREMIER_QUADRANT,
  REPERES_QUARTS,
  REPERES_TOUS,
  angleFraction,
  cosExact,
  reduirePositif,
  reduirePrincipal,
  simplifier,
  sinExact,
  valeurFraction,
  valeurNumerique,
  type ValeurExacte,
} from "./cercle-trigo-valeurs";

type Props = { figure: CercleTrigoCanvasData };

const C = {
  fond: "#ffffff",
  cercle: "#2563eb",
  axe: "#64748b",
  repere: "#334155",
  point: "#dc2626",
  arc: "#f59e0b",
  titre: "#0f172a",
  // `axesCouleur` : la convention rouge (cos) / vert (sin) de Frédéric.
  cos: "#dc2626",
  sin: "#16a34a",
  pointNeutre: "#0f172a",
};

const TAILLE = 12;

/** Une fraction empilée (ou un nombre seul), centrée en (x ; y). */
function Frac({
  x,
  y,
  f,
  couleur,
  gras = false,
  enLigne,
}: {
  x: number;
  y: number;
  f: { signe: string; num: string; den?: string };
  couleur: string;
  gras?: boolean;
  /** Sur une ligne (« √3/2 »), calée à droite ou à gauche de x : l'axe vertical n'a pas la hauteur d'une fraction empilée. */
  enLigne?: "gauche" | "droite";
}) {
  const poids = gras ? 900 : 700;
  const halo = { stroke: "white", strokeWidth: 3, paintOrder: "stroke" as const };
  if (!f.den || enLigne) {
    const texte = `${f.signe}${f.num}${f.den ? `/${f.den}` : ""}`;
    const ancre = enLigne === "gauche" ? "end" : enLigne === "droite" ? "start" : "middle";
    return (
      <text x={x} y={y} textAnchor={ancre} dominantBaseline="central" fontSize={TAILLE + 1} fontWeight={poids} fill={couleur} {...halo}>
        {texte}
      </text>
    );
  }
  const largeur = Math.max(f.num.length, f.den.length) * 7 + 2;
  const decalSigne = f.signe ? 4 : 0;
  const xf = x + decalSigne;
  return (
    <g>
      <rect x={xf - largeur / 2 - 2 - decalSigne * 2} y={y - 15} width={largeur + 4 + decalSigne * 2} height={30} fill="white" opacity={0.85} rx={3} />
      {f.signe ? (
        <text x={xf - largeur / 2} y={y} textAnchor="end" dominantBaseline="central" fontSize={TAILLE + 1} fontWeight={poids} fill={couleur}>
          {f.signe}
        </text>
      ) : null}
      <text x={xf} y={y - 7} textAnchor="middle" dominantBaseline="central" fontSize={TAILLE} fontWeight={poids} fill={couleur}>
        {f.num}
      </text>
      <line x1={xf - largeur / 2} y1={y} x2={xf + largeur / 2} y2={y} stroke={couleur} strokeWidth={1.4} />
      <text x={xf} y={y + 8} textAnchor="middle" dominantBaseline="central" fontSize={TAILLE} fontWeight={poids} fill={couleur}>
        {f.den}
      </text>
    </g>
  );
}

/**
 * Le représentant qu'on DESSINE pour un réel : un tour au plus, dans le sens du
 * réel. 47π/6 → 11π/6 (et non −π/6) ; 7π/6 → 7π/6 ; −17π/6 → −5π/6. C'est
 * aussi le nom écrit sur le cercle : l'élève doit y reconnaître son réel.
 */
function representant(a: AngleTrigo): AngleTrigo {
  const s = simplifier(a);
  const p = reduirePositif(s);
  if (s.n >= 0 || p.n === 0) return p;
  return { n: p.n - 2 * p.d, d: p.d };
}

function memePoint(a: AngleTrigo, b: AngleTrigo) {
  const ra = reduirePrincipal(a);
  const rb = reduirePrincipal(b);
  return ra.n * rb.d === rb.n * ra.d;
}

export default function CercleTrigoCanvas({ figure }: Props) {
  if (figure.kind !== "cercle_trigo") return null;

  const haut = figure.titre ? 30 : 0;
  const width = figure.size?.width ?? 320;
  const height = figure.size?.height ?? 310 + haut;
  const cx = width / 2;
  const cy = haut + (height - haut) / 2;
  const r = 100;
  const R = r + 30; // rayon des étiquettes

  const pos = (theta: number, rayon = r) => ({
    x: cx + rayon * Math.cos(theta),
    y: cy - rayon * Math.sin(theta),
  });

  const reperes =
    figure.reperes === "aucun"
      ? []
      : figure.reperes === "quarts"
        ? REPERES_QUARTS
        : figure.reperes === "premier_quadrant"
          ? REPERES_PREMIER_QUADRANT
          : REPERES_TOUS;

  const points = figure.points ?? [];

  // Là où une projection écrit sa valeur, les graduations grises se taisent :
  // on retire celles qui tomberaient à moins de 26 px d'une valeur projetée.
  // Et la graduation qui porte la MÊME valeur qu'une projection ne se répète pas.
  const occupes: { x: number; y: number }[] = [];
  const dejaEcrits = new Set<string>();
  for (const q of points) {
    if (!q.projections) continue;
    const c = cosExact(q.angle);
    const s = sinExact(q.angle);
    if (c) dejaEcrits.add(`x:${c}`);
    if (s) dejaEcrits.add(`y:${s}`);
    const t = (Math.PI * q.angle.n) / q.angle.d;
    const px = cx + r * Math.cos(t);
    const py = cy - r * Math.sin(t);
    occupes.push({ x: px, y: cy + (Math.sin(t) >= 0 ? 20 : -20) });
    occupes.push({ x: cx + (Math.cos(t) >= 0 ? -20 : 20), y: py });
  }
  // Deux points qui partagent une valeur (π/6 et 5π/6 ont le même sinus) ne
  // l'écrivent qu'UNE fois : le premier qui la projette.
  const ecrit = new Set<string>();
  const ecrire = points.map((q) => {
    const c = q.projections ? cosExact(q.angle) : null;
    const s = q.projections ? sinExact(q.angle) : null;
    const res = { cos: !!c && !ecrit.has(`x:${c}`), sin: !!s && !ecrit.has(`y:${s}`) };
    if (c) ecrit.add(`x:${c}`);
    if (s) ecrit.add(`y:${s}`);
    return res;
  });
  const libre = (x: number, y: number) => occupes.every((o) => Math.abs(o.x - x) > 26 || Math.abs(o.y - y) > 26);

  const rv = !!figure.axesCouleur;
  const axeX = rv ? C.cos : C.axe;
  const axeY = rv ? C.sin : C.axe;
  const pointDefaut = rv ? C.pointNeutre : C.point;

  const graduations: { v: ValeurExacte; cote: 1 | -1 }[] = [
    { v: "1/2", cote: 1 },
    { v: "r2/2", cote: -1 },
    { v: "r3/2", cote: 1 },
  ];

  return (
    <div className="mx-auto w-full max-w-[380px] rounded-xl border border-slate-200 bg-white p-3 shadow-sm print:max-w-[15rem] print:p-1 print:shadow-none">
      <svg viewBox={`0 0 ${width} ${height}`} className="block h-auto w-full" role="img" aria-label="Cercle trigonométrique">
        <rect x={0} y={0} width={width} height={height} rx={14} fill={C.fond} />

        {figure.titre ? (
          <text x={cx} y={20} textAnchor="middle" fontSize={15} fontWeight={900} fill={C.titre}>
            {figure.titre}
          </text>
        ) : null}

        <defs>
          <marker id="ct-fleche-axe" viewBox="0 0 10 10" refX={8} refY={5} markerWidth={7} markerHeight={7} orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill={C.axe} />
          </marker>
          <marker id="ct-fleche-cos" viewBox="0 0 10 10" refX={8} refY={5} markerWidth={7} markerHeight={7} orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill={C.cos} />
          </marker>
          <marker id="ct-fleche-sin" viewBox="0 0 10 10" refX={8} refY={5} markerWidth={7} markerHeight={7} orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill={C.sin} />
          </marker>
        </defs>

        {/* Axes */}
        <line x1={cx - r - 12} y1={cy} x2={cx + r + 14} y2={cy} stroke={axeX} strokeWidth={rv ? 2.2 : 1.5} markerEnd={rv ? "url(#ct-fleche-cos)" : "url(#ct-fleche-axe)"} />
        <line x1={cx} y1={cy + r + 12} x2={cx} y2={cy - r - 14} stroke={axeY} strokeWidth={rv ? 2.2 : 1.5} markerEnd={rv ? "url(#ct-fleche-sin)" : "url(#ct-fleche-axe)"} />
        {rv ? (
          <>
            <text x={cx + r + 10} y={cy + 19} textAnchor="start" fontSize={12} fontWeight={900} fill={C.cos} stroke="white" strokeWidth={3} paintOrder="stroke">cos</text>
            <text x={cx - 8} y={cy - r - 14} textAnchor="end" fontSize={12} fontWeight={900} fill={C.sin} stroke="white" strokeWidth={3} paintOrder="stroke">sin</text>
          </>
        ) : null}
        <text x={cx - 9} y={cy + 14} textAnchor="middle" fontSize={12} fontWeight={700} fill={C.repere}>O</text>
        <text x={cx + r + 8} y={cy - 6} textAnchor="middle" fontSize={12} fontWeight={800} fill={C.repere}>I</text>
        <text x={cx + 9} y={cy - r - 5} textAnchor="middle" fontSize={12} fontWeight={800} fill={C.repere}>J</text>

        {/* Le cercle */}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={C.cercle} strokeWidth={3} />

        {/* Graduations des demi-axes positifs */}
        {figure.valeursAxes
          ? graduations.map(({ v, cote }) => {
              const d = valeurNumerique(v) * r;
              return (
                <g key={v}>
                  <line x1={cx + d} y1={cy - 4} x2={cx + d} y2={cy + 4} stroke={axeX} strokeWidth={1.5} />
                  <line x1={cx - 4} y1={cy - d} x2={cx + 4} y2={cy - d} stroke={axeY} strokeWidth={1.5} />
                  {libre(cx + d, cy + cote * 20) && !dejaEcrits.has(`x:${v}`) ? (
                    <Frac x={cx + d} y={cy + cote * 20} f={valeurFraction(v)} couleur={axeX} />
                  ) : null}
                  {!libre(cx - 20, cy - d) || dejaEcrits.has(`y:${v}`) ? null : (
                    <Frac x={cx - 7} y={cy - d} f={valeurFraction(v)} couleur={axeY} enLigne="gauche" />
                  )}
                </g>
              );
            })
          : null}

        {/* Les réels remarquables posés sur le cercle */}
        {reperes.map((a) => {
          const t = (Math.PI * a.n) / a.d;
          const p = pos(t);
          const e = pos(t, R);
          const pointEtudie = points.find((q) => memePoint(q.angle, a));
          const couleur = pointEtudie ? (pointEtudie.couleur ?? pointDefaut) : C.repere;
          return (
            <g key={`${a.n}/${a.d}`}>
              <circle cx={p.x} cy={p.y} r={3} fill={C.repere} />
              <Frac
                x={e.x}
                y={e.y}
                f={angleFraction(pointEtudie ? representant(pointEtudie.angle) : a)}
                couleur={couleur}
                gras={!!pointEtudie}
              />
            </g>
          );
        })}

        {/* Les points étudiés, en DEUX passes : tous les traits d'abord, toutes
            les valeurs ensuite — sinon le pointillé d'un point barre la valeur
            écrite par le précédent. */}
        {(() => {
          const rendus = points.map((q, i) => {
            const couleur = q.couleur ?? pointDefaut;
            // Rouge-vert : la projection sur l'axe des cos est rouge, sur l'axe des sin verte.
            const coulCos = rv ? C.cos : couleur;
            const coulSin = rv ? C.sin : couleur;
            const s = simplifier(q.angle);
            const rep = representant(s);
            const theta = (Math.PI * rep.n) / rep.d;
            const p = pos(theta);
            const cosV = cosExact(s);
            const sinV = sinExact(s);
            const surRepere = reperes.some((a) => memePoint(a, s));

            let arc: string | null = null;
            if (q.arc && Math.abs(theta) > 1e-9) {
              const pas = 48;
              const pts = Array.from({ length: pas + 1 }, (_, k) => pos((theta * k) / pas, r + 7));
              arc = pts.map((m, k) => `${k ? "L" : "M"}${m.x.toFixed(1)},${m.y.toFixed(1)}`).join(" ");
            }

            const etiquette = q.label === undefined ? (surRepere ? "" : null) : q.label;
            const posEtiq = pos(theta, r - 22);

            const traits = (
              <g key={`t${i}`}>
                {arc ? (
                  <>
                    <defs>
                      <marker id={`ct-fleche-arc-${i}`} viewBox="0 0 10 10" refX={6} refY={5} markerWidth={5} markerHeight={5} orient="auto">
                        <path d="M0,0 L10,5 L0,10 z" fill={C.arc} />
                      </marker>
                    </defs>
                    <path d={arc} fill="none" stroke={C.arc} strokeWidth={5} strokeLinecap="round" markerEnd={`url(#ct-fleche-arc-${i})`} />
                  </>
                ) : null}
                {q.projections && Math.abs(p.y - cy) > 1 ? (
                  <line x1={p.x} y1={p.y} x2={p.x} y2={cy} stroke={coulCos} strokeWidth={1.8} strokeDasharray="5 4" />
                ) : null}
                {q.projections && Math.abs(p.x - cx) > 1 ? (
                  <line x1={p.x} y1={p.y} x2={cx} y2={p.y} stroke={coulSin} strokeWidth={1.8} strokeDasharray="5 4" />
                ) : null}
                {/* Rouge-vert : le cosinus et le sinus en barres épaisses depuis O. */}
                {rv && q.projections && Math.abs(p.x - cx) > 1 ? (
                  <line x1={cx} y1={cy} x2={p.x} y2={cy} stroke={C.cos} strokeWidth={6} strokeLinecap="round" opacity={0.85} />
                ) : null}
                {rv && q.projections && Math.abs(p.y - cy) > 1 ? (
                  <line x1={cx} y1={cy} x2={cx} y2={p.y} stroke={C.sin} strokeWidth={6} strokeLinecap="round" opacity={0.85} />
                ) : null}
                <line x1={cx} y1={cy} x2={p.x} y2={p.y} stroke={couleur} strokeWidth={2} />
                <circle cx={p.x} cy={p.y} r={6} fill={couleur} stroke="#0f172a" strokeWidth={1.5} />
              </g>
            );

            const textes = (
              <g key={`e${i}`}>
                {q.projections && ecrire[i].cos && cosV && cosV !== "0" && sinV !== "0" ? (
                  <Frac
                    // Près du bord (±√3/2), l'étiquette rentre vers le centre : son signe mordait sur le cercle.
                    x={p.x - (Math.abs(valeurNumerique(cosV)) > 0.8 ? Math.sign(valeurNumerique(cosV)) * 10 : 0)}
                    y={cy + (valeurNumerique(sinV ?? "0") >= 0 ? 20 : -20)}
                    f={valeurFraction(cosV)}
                    couleur={coulCos}
                    gras
                  />
                ) : null}
                {q.projections && ecrire[i].sin && sinV && sinV !== "0" && cosV !== "0" ? (
                  <Frac
                    x={cx + (valeurNumerique(cosV ?? "0") >= 0 ? -7 : 7)}
                    y={p.y}
                    f={valeurFraction(sinV)}
                    couleur={coulSin}
                    gras
                    enLigne={valeurNumerique(cosV ?? "0") >= 0 ? "gauche" : "droite"}
                  />
                ) : null}
                {etiquette === null ? (
                  <Frac x={pos(theta, R).x} y={pos(theta, R).y} f={angleFraction(rep)} couleur={couleur} gras />
                ) : etiquette ? (
                  <text x={posEtiq.x} y={posEtiq.y} textAnchor="middle" dominantBaseline="central" fontSize={13} fontWeight={900} fill={couleur} stroke="white" strokeWidth={3} paintOrder="stroke">
                    {etiquette}
                  </text>
                ) : null}
              </g>
            );
            return { traits, textes };
          });
          return (
            <>
              {rendus.map((x) => x.traits)}
              {rendus.map((x) => x.textes)}
            </>
          );
        })()}
      </svg>
    </div>
  );
}
