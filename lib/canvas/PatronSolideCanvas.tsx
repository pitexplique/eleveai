// lib/canvas/PatronSolideCanvas.tsx
"use client";

import type { CanvasFigure } from "@/lib/tutor-v4/types";
import type { CotePatron, PanneauPatron, PointPatron } from "./patron-solide";

// Le dépliage d'un solide, calculé par ./patron-solide.ts. Un panneau seul, grand, pour lire
// des longueurs ; deux à quatre panneaux nommés pour « lequel est un patron ? ».
// Les longueurs écrites se posent DEHORS, du côté opposé au centre du dépliage.

const CELLULE_SEULE = { W: 340, H: 270 };
const CELLULE_GRILLE = { W: 170, H: 150 };

function boite(p: PanneauPatron) {
  const xs: number[] = [];
  const ys: number[] = [];
  for (const piece of p.pieces) for (const [x, y] of piece.points) xs.push(x), ys.push(y);
  for (const d of p.disques ?? []) xs.push(d.x - d.r, d.x + d.r), ys.push(d.y - d.r, d.y + d.r);
  return { x0: Math.min(...xs), x1: Math.max(...xs), y0: Math.min(...ys), y1: Math.max(...ys) };
}

/** Les marges : les longueurs écrites tiennent dans la case. */
const margesDe = (p: PanneauPatron) => ((p.cotes ?? []).length ? { x: 48, y: 28 } : { x: 8, y: 8 });
const titreDe = (p: PanneauPatron) => (p.nom ? 20 : 0);
/** L'échelle qui fait tenir ce panneau dans sa case. */
function echelle(p: PanneauPatron, W: number, H: number) {
  const b = boite(p);
  const m = margesDe(p);
  return Math.min((W - 2 * m.x) / Math.max(b.x1 - b.x0, 1e-6), (H - 2 * m.y - titreDe(p)) / Math.max(b.y1 - b.y0, 1e-6));
}

/** Le tracé d'un panneau dans sa case : même échelle en x et en y, marges pour les cotes. */
function Panneau({ p, ox, oy, W, H, grille, k }: { p: PanneauPatron; ox: number; oy: number; W: number; H: number; grille: boolean; k: number }) {
  const b = boite(p);
  const titre = titreDe(p);
  const m = margesDe(p);
  const larg = W - 2 * m.x;
  const haut = H - 2 * m.y - titre;
  const dx = ox + m.x + (larg - k * (b.x1 - b.x0)) / 2;
  const dy = oy + m.y + titre + (haut - k * (b.y1 - b.y0)) / 2;
  const X = (x: number) => dx + k * (x - b.x0);
  const Y = (y: number) => dy + k * (y - b.y0);
  const cx = (b.x0 + b.x1) / 2;
  const cy = (b.y0 + b.y1) / 2;
  const coteTexte = (c: CotePatron) => {
    const mx = (c.a[0] + c.b[0]) / 2;
    const my = (c.a[1] + c.b[1]) / 2;
    const tx = c.b[0] - c.a[0];
    const ty = c.b[1] - c.a[1];
    const n = Math.hypot(tx, ty) || 1;
    let nx = -ty / n;
    let ny = tx / n;
    const [ox0, oy0] = c.centre ?? [cx, cy];
    if (nx * (mx - ox0) + ny * (my - oy0) < 0) (nx = -nx), (ny = -ny);
    // Un texte large s'écarte davantage sur un côté vertical.
    const ecart = 11 + Math.abs(nx) * (c.texte.length * 3.2);
    const demi = c.texte.length * 4;
    // Un texte plus large que son côté horizontal déborde vers l'extérieur du dépliage, pas sur la pièce voisine.
    const trop = Math.abs(ny) > 0.9 ? Math.max(0, 2 * demi - k * n) : 0;
    const glisse = (mx < cx ? -1 : 1) * (trop > 0 ? trop / 2 + 3 : 0);
    return { x: Math.min(Math.max(X(mx) + nx * ecart + glisse, ox + demi + 1), ox + W - demi - 1), y: Y(my) + ny * ecart + 5 };
  };
  const trait = grille ? 1.3 : 1.7;
  const points = (l: PointPatron[]) => l.map(([x, y]) => `${X(x).toFixed(1)},${Y(y).toFixed(1)}`).join(" ");
  return (
    <g>
      {p.nom ? (
        <text x={ox + W / 2} y={oy + 15} textAnchor="middle" fontSize={15} fontWeight={700} fill="#0f172a">{p.nom}</text>
      ) : null}
      {p.pieces.map((piece, i) => (
        <polygon key={i} points={points(piece.points)} fill={piece.fond ?? "#dbeafe"} stroke="#1e3a8a" strokeWidth={trait} strokeLinejoin="round" />
      ))}
      {(p.disques ?? []).map((d, i) => (
        <circle key={i} cx={X(d.x)} cy={Y(d.y)} r={k * d.r} fill={d.fond ?? "#dbeafe"} stroke="#1e3a8a" strokeWidth={trait} />
      ))}
      {p.pieces.map((piece, i) => {
        if (!piece.nom) return null;
        const px = piece.points.reduce((s, q) => s + q[0], 0) / piece.points.length;
        const py = piece.points.reduce((s, q) => s + q[1], 0) / piece.points.length;
        return <text key={i} x={X(px)} y={Y(py) + 5} textAnchor="middle" fontSize={13} fontWeight={700} fill="#1e3a8a">{piece.nom}</text>;
      })}
      {(p.disques ?? []).map((d, i) =>
        d.nom ? <text key={i} x={X(d.x)} y={Y(d.y) + 5} textAnchor="middle" fontSize={13} fontWeight={700} fill="#1e3a8a">{d.nom}</text> : null,
      )}
      {(p.cotes ?? []).map((c, i) => {
        const t = coteTexte(c);
        return (
          <text key={i} x={t.x} y={t.y} textAnchor="middle" fontSize={14} fontWeight={700} fill={c.inconnue ? "#c2410c" : "#0f172a"} stroke="#ffffff" strokeWidth={3} paintOrder="stroke" strokeLinejoin="round">{c.texte}</text>
        );
      })}
    </g>
  );
}

export default function PatronSolideCanvas({ figure }: { figure: CanvasFigure }) {
  if (figure.kind !== "patron_solide") return null;
  const liste = figure.panneaux;
  const seul = liste.length === 1;
  const { W, H } = seul ? CELLULE_SEULE : CELLULE_GRILLE;
  const cols = seul ? 1 : 2;
  const lignes = Math.ceil(liste.length / cols);
  // ⚠️ Une seule échelle pour tous les panneaux : sinon un rectangle trop court ou un disque
  // trop grand ne se voit plus, chaque dépliage remplissant sa case.
  const k = Math.min(...liste.map((p) => echelle(p, W, H)));
  return (
    <svg
      viewBox={`0 0 ${cols * W} ${lignes * H}`}
      width="100%"
      style={{ maxWidth: seul ? 400 : 500, display: "block", margin: "0 auto" }}
      role="img"
      aria-label={figure.description ?? "Le dépliage d'un solide"}
    >
      {liste.map((p, i) => (
        <Panneau key={i} p={p} ox={(i % cols) * W} oy={Math.floor(i / cols) * H} W={W} H={H} grille={!seul} k={k} />
      ))}
    </svg>
  );
}
