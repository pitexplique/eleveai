// lib/canvas/DeuxAnglesCanvas.tsx
"use client";

import type { CanvasFigure } from "@/lib/tutor-v4/types";

// Comparer des angles SANS les mesurer (CM2) : côte à côte, ou collés par un côté
// pour voir leur somme. Aucune mesure n'est écrite : l'élève regarde l'ouverture.

const COULEURS = ["#3b82f6", "#ef4444", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899"];
const TRAIT = "#0f172a";

const rad = (d: number) => (d * Math.PI) / 180;
/** Un point, à un angle compté vers le haut (y de l'écran inversé). */
const pt = (cx: number, cy: number, r: number, d: number) => ({ x: cx + r * Math.cos(rad(d)), y: cy - r * Math.sin(rad(d)) });

function secteur(cx: number, cy: number, r: number, de: number, a: number) {
  const p = pt(cx, cy, r, de);
  const q = pt(cx, cy, r, a);
  const grand = a - de > 180 ? 1 : 0;
  return `M ${cx} ${cy} L ${p.x} ${p.y} A ${r} ${r} 0 ${grand} 0 ${q.x} ${q.y} Z`;
}

function coinDroit(cx: number, cy: number, de: number, couleur: string, c = 14) {
  const p = pt(cx, cy, c, de);
  const q = pt(cx, cy, c, de + 90);
  const m = pt(cx, cy, c * Math.SQRT2, de + 45);
  return <path d={`M ${p.x} ${p.y} L ${m.x} ${m.y} L ${q.x} ${q.y}`} fill="none" stroke={couleur} strokeWidth={1.6} />;
}

export default function DeuxAnglesCanvas({ figure }: { figure: CanvasFigure }) {
  if (figure.kind !== "deux_angles") return null;
  const angles = figure.angles;

  if (figure.mode === "juxtaposes") {
    const L = 100;
    const total = angles.reduce((s, a) => s + a.deg, 0);
    const depart = figure.angles[0].rotation ?? 0;
    // Le cadre suit l'éventail : le sommet n'est jamais coupé.
    const pts = [{ x: 0, y: 0 }];
    for (let d = 0; d <= total; d += 5) pts.push(pt(0, 0, L + 18, depart + d));
    pts.push(pt(0, 0, L + 18, depart + total));
    const minX = Math.min(...pts.map((p) => p.x)) - 10;
    const maxX = Math.max(...pts.map((p) => p.x)) + 10;
    const minY = Math.min(...pts.map((p) => p.y)) - 10;
    const maxY = Math.max(...pts.map((p) => p.y)) + 10;
    let cumul = depart;
    return (
      <svg viewBox={`${minX} ${minY} ${maxX - minX} ${maxY - minY}`} width="100%" style={{ maxWidth: 320, display: "block", margin: "0 auto" }} role="img" aria-label="Des angles collés par un côté">
        {angles.map((a, i) => {
          const de = cumul;
          cumul += a.deg;
          const c = a.couleur ?? COULEURS[i % COULEURS.length];
          const milieu = pt(0, 0, 58, de + a.deg / 2);
          return (
            <g key={i}>
              <path d={secteur(0, 0, 42, de, de + a.deg)} fill={c} fillOpacity={0.22} stroke="none" />
              {a.nom ? <text x={milieu.x} y={milieu.y + 5} textAnchor="middle" fontSize={14} fontWeight={700} fill={c}>{a.nom}</text> : null}
            </g>
          );
        })}
        {(() => {
          let d = depart;
          const traits = [d];
          for (const a of angles) { d += a.deg; traits.push(d); }
          return traits.map((t, i) => {
            const p = pt(0, 0, L, t);
            return <line key={i} x1={0} y1={0} x2={p.x} y2={p.y} stroke={TRAIT} strokeWidth={2} strokeLinecap="round" />;
          });
        })()}
      </svg>
    );
  }

  // Côte à côte : chaque angle est centré dans sa case.
  const parLigne = angles.length === 4 ? 2 : angles.length;
  const W = 150;
  const H = 130;
  const lignes = Math.ceil(angles.length / parLigne);
  // Trois angles côte à côte rétrécissent le dessin : la lettre grossit pour rester lisible à 375 px.
  const tailleNom = parLigne >= 3 ? 23 : 15;
  return (
    <svg viewBox={`0 0 ${parLigne * W} ${lignes * (H + 24)}`} width="100%" style={{ maxWidth: parLigne * W, display: "block", margin: "0 auto" }} role="img" aria-label="Des angles à comparer">
      {angles.map((a, i) => {
        const L = a.longueur ?? 85;
        const rot = a.rotation ?? 0;
        const c = a.couleur ?? COULEURS[i % COULEURS.length];
        const p1 = pt(0, 0, L, rot);
        const p2 = pt(0, 0, L, rot + a.deg);
        const xs = [0, p1.x, p2.x];
        const ys = [0, p1.y, p2.y];
        // On ramène l'angle au centre de sa case, et on le réduit s'il déborde.
        const larg = Math.max(...xs) - Math.min(...xs);
        const haut = Math.max(...ys) - Math.min(...ys);
        const e = Math.min(1, (W - 20) / Math.max(larg, 1), (H - 20) / Math.max(haut, 1));
        const col = i % parLigne;
        const lig = Math.floor(i / parLigne);
        const cx = col * W + W / 2 - (e * (Math.max(...xs) + Math.min(...xs))) / 2;
        const cy = lig * (H + 24) + H / 2 - (e * (Math.max(...ys) + Math.min(...ys))) / 2;
        const q1 = { x: cx + e * p1.x, y: cy + e * p1.y };
        const q2 = { x: cx + e * p2.x, y: cy + e * p2.y };
        return (
          <g key={i}>
            <path d={secteur(cx, cy, 24, rot, rot + a.deg)} fill={c} fillOpacity={0.2} stroke="none" />
            <line x1={cx} y1={cy} x2={q1.x} y2={q1.y} stroke={TRAIT} strokeWidth={2} strokeLinecap="round" />
            <line x1={cx} y1={cy} x2={q2.x} y2={q2.y} stroke={TRAIT} strokeWidth={2} strokeLinecap="round" />
            {a.deg === 90 ? coinDroit(cx, cy, rot, c) : null}
            {a.nom ? <text x={col * W + W / 2} y={lig * (H + 24) + H + (parLigne >= 3 ? 20 : 16)} textAnchor="middle" fontSize={tailleNom} fontWeight={700} fill={c}>{a.nom}</text> : null}
          </g>
        );
      })}
    </svg>
  );
}
