// lib/canvas/DemiPlanCanvas.tsx
//
// LE DEMI-PLAN (05/11/2026) : un repère, une ou plusieurs droites ax + by + c = 0,
// la zone hachurée, un point test. Demandé par le Sénégal, le Maroc, la Côte d'Ivoire
// et le Québec (inéquations à deux inconnues, programmation linéaire).
// La zone n'est jamais saisie : on découpe la fenêtre par chaque demi-plan. Une
// inégalité stricte dessine sa frontière en pointillés, comme au tableau.
"use client";

import { useId } from "react";
import type { DemiPlanCanvasData, DemiPlanDroite } from "@/lib/tutor-v4/types_canvas";

type Props = { figure: DemiPlanCanvasData };
type P = { x: number; y: number };

const COULEURS = ["#2563eb", "#059669", "#c026d3", "#d97706"];
const LARGEUR = 320;

const valeur = (d: DemiPlanDroite, p: P) => d.a * p.x + d.b * p.y + d.c;

/** Sutherland-Hodgman : ce qui reste du polygone du côté demandé de la droite. */
function couper(poly: P[], d: DemiPlanDroite): P[] {
  if (!d.sens) return poly;
  const signe = d.sens === "<=" || d.sens === "<" ? -1 : 1;
  const dedans = (p: P) => signe * valeur(d, p) >= -1e-9;
  const res: P[] = [];
  poly.forEach((p, i) => {
    const q = poly[(i + 1) % poly.length];
    const [vp, vq] = [valeur(d, p), valeur(d, q)];
    if (dedans(p)) res.push(p);
    if (dedans(p) !== dedans(q)) {
      const t = vp / (vp - vq);
      res.push({ x: p.x + t * (q.x - p.x), y: p.y + t * (q.y - p.y) });
    }
  });
  return res;
}

/** Le morceau de droite visible dans la fenêtre. */
function segment(d: DemiPlanDroite, f: { x0: number; x1: number; y0: number; y1: number }): [P, P] | null {
  const candidats: P[] = [];
  if (d.b !== 0) {
    for (const x of [f.x0, f.x1]) {
      const y = -(d.a * x + d.c) / d.b;
      if (y >= f.y0 - 1e-9 && y <= f.y1 + 1e-9) candidats.push({ x, y });
    }
  }
  if (d.a !== 0) {
    for (const y of [f.y0, f.y1]) {
      const x = -(d.b * y + d.c) / d.a;
      if (x >= f.x0 - 1e-9 && x <= f.x1 + 1e-9) candidats.push({ x, y });
    }
  }
  const uniques = candidats.filter((p, i) => candidats.findIndex((q) => Math.hypot(p.x - q.x, p.y - q.y) < 1e-6) === i);
  return uniques.length >= 2 ? [uniques[0], uniques[1]] : null;
}

const strict = (d: DemiPlanDroite) => d.pointilles ?? (d.sens === "<" || d.sens === ">");

export default function DemiPlanCanvas({ figure }: Props) {
  const idBrut = useId().replace(/:/g, "");
  if (figure.kind !== "demi_plan") return null;

  const f = { x0: figure.xmin ?? -6, x1: figure.xmax ?? 6, y0: figure.ymin ?? -6, y1: figure.ymax ?? 6 };
  const marge = 14;
  const u = (LARGEUR - 2 * marge) / (f.x1 - f.x0);
  const hauteur = (f.y1 - f.y0) * u + 2 * marge;
  const X = (x: number) => marge + (x - f.x0) * u;
  const Y = (y: number) => hauteur - marge - (y - f.y0) * u;
  const fenetre: P[] = [
    { x: f.x0, y: f.y0 },
    { x: f.x1, y: f.y0 },
    { x: f.x1, y: f.y1 },
    { x: f.x0, y: f.y1 },
  ];
  const chemin = (poly: P[]) => poly.map((p, i) => `${i ? "L" : "M"} ${X(p.x)} ${Y(p.y)}`).join(" ") + " Z";
  const couleur = (d: DemiPlanDroite, i: number) => d.couleur ?? COULEURS[i % COULEURS.length];

  const zones: { poly: P[]; couleur: string; id: string }[] =
    figure.zone === "commune"
      ? [{ poly: figure.droites.reduce(couper, fenetre), couleur: "#2563eb", id: `${idBrut}-0` }]
      : figure.droites.filter((d) => d.sens).map((d, i) => ({ poly: couper(fenetre, d), couleur: couleur(d, i), id: `${idBrut}-${i}` }));

  // Une graduation sur deux dès que le repère est grand : les chiffres restent lisibles à 375 px.
  const pas = u >= 24 ? 1 : 2;
  const graduations = (a: number, b: number) => {
    const l: number[] = [];
    for (let v = Math.ceil(a); v <= b; v++) if (v !== 0 && v % pas === 0) l.push(v);
    return l;
  };
  const verticales: number[] = [];
  for (let v = Math.ceil(f.x0); v <= f.x1; v++) verticales.push(v);
  const horizontales: number[] = [];
  for (let v = Math.ceil(f.y0); v <= f.y1; v++) horizontales.push(v);
  const axeX = f.y0 <= 0 && f.y1 >= 0 ? Y(0) : Y(f.y0);
  const axeY = f.x0 <= 0 && f.x1 >= 0 ? X(0) : X(f.x0);

  return (
    <div className="mx-auto w-full max-w-[360px] rounded-xl border border-slate-200 bg-white p-2 shadow-sm">
      <svg viewBox={`0 0 ${LARGEUR} ${hauteur}`} className="block h-auto w-full" role="img" aria-label="Repère, droites et demi-plan">
        <defs>
          {zones.map((z) => (
            <pattern key={z.id} id={z.id} width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <rect width="9" height="9" fill={z.couleur} fillOpacity="0.09" />
              <line x1="0" y1="0" x2="0" y2="9" stroke={z.couleur} strokeWidth="1.5" strokeOpacity="0.7" />
            </pattern>
          ))}
        </defs>

        {verticales.map((v) => (
          <line key={`v${v}`} x1={X(v)} x2={X(v)} y1={Y(f.y0)} y2={Y(f.y1)} stroke="#e2e8f0" strokeWidth="1" />
        ))}
        {horizontales.map((v) => (
          <line key={`h${v}`} x1={X(f.x0)} x2={X(f.x1)} y1={Y(v)} y2={Y(v)} stroke="#e2e8f0" strokeWidth="1" />
        ))}

        {zones.map((z) => (z.poly.length >= 3 ? <path key={`z${z.id}`} d={chemin(z.poly)} fill={`url(#${z.id})`} /> : null))}

        <line x1={X(f.x0)} x2={X(f.x1)} y1={axeX} y2={axeX} stroke="#0f172a" strokeWidth="1.5" />
        <line x1={axeY} x2={axeY} y1={Y(f.y0)} y2={Y(f.y1)} stroke="#0f172a" strokeWidth="1.5" />
        <path d={`M ${X(f.x1)} ${axeX} l -7 -4 v 8 Z`} fill="#0f172a" />
        <path d={`M ${axeY} ${Y(f.y1)} l -4 7 h 8 Z`} fill="#0f172a" />
        <g fontSize="12" fill="#334155" stroke="#ffffff" strokeWidth="3" paintOrder="stroke" fontWeight="600">
          {graduations(f.x0 + 0.5, f.x1 - 0.5).map((v) => (
            <text key={`gx${v}`} x={X(v)} y={axeX + 15} textAnchor="middle">
              {v < 0 ? `−${-v}` : v}
            </text>
          ))}
          {graduations(f.y0 + 0.5, f.y1 - 0.5).map((v) => (
            <text key={`gy${v}`} x={axeY - 6} y={Y(v) + 4} textAnchor="end">
              {v < 0 ? `−${-v}` : v}
            </text>
          ))}
          <text x={axeY - 6} y={axeX + 15} textAnchor="end">
            0
          </text>
        </g>

        {figure.droites.map((d, i) => {
          const s = segment(d, f);
          if (!s) return null;
          const c = couleur(d, i);
          // Le nom se pose le long de la droite, en retrait du bord. Chaque droite nommée
          // descend d'un cran : deux droites qui partent du même bord ne se recouvrent pas.
          const haut = s[0].y >= s[1].y ? s[0] : s[1];
          const bas = haut === s[0] ? s[1] : s[0];
          const rang = figure.droites.slice(0, i).filter((x) => x.nom).length;
          const t = 0.85 - 0.25 * rang;
          const nomP = { x: bas.x + t * (haut.x - bas.x), y: bas.y + t * (haut.y - bas.y) };
          return (
            <g key={`d${i}`}>
              <line x1={X(s[0].x)} y1={Y(s[0].y)} x2={X(s[1].x)} y2={Y(s[1].y)} stroke={c} strokeWidth="2.5" strokeDasharray={strict(d) ? "8 6" : undefined} strokeLinecap="round" />
              {d.nom ? (
                <text x={X(nomP.x) + 7} y={Y(nomP.y) - 5} fontSize="14" fontWeight="800" fill={c} stroke="#ffffff" strokeWidth="3.5" paintOrder="stroke">
                  {d.nom}
                </text>
              ) : null}
            </g>
          );
        })}

        {(figure.points ?? []).map((p, i) => {
          const c = p.test ? "#ea580c" : "#dc2626";
          // L'étiquette passe à gauche au bord droit et juste à gauche de l'axe vertical,
          // dessous juste sous l'axe horizontal : elle ne recouvre jamais une graduation.
          const aGauche = X(p.x) > LARGEUR - 40 || (X(p.x) < axeY && axeY - X(p.x) < 40);
          const dessous = Y(p.y) > axeX && Y(p.y) - axeX < 34;
          return (
            <g key={`p${i}`}>
              <circle cx={X(p.x)} cy={Y(p.y)} r={p.test ? 5.5 : 4} fill={p.test ? "#ffffff" : c} stroke={c} strokeWidth={p.test ? 3 : 1} />
              {p.nom ? (
                <text x={X(p.x) + (aGauche ? -9 : 9)} y={Y(p.y) + (dessous ? 19 : -7)} textAnchor={aGauche ? "end" : "start"} fontSize="15" fontWeight="800" fill={c} stroke="#ffffff" strokeWidth="3.5" paintOrder="stroke">
                  {p.nom}
                </text>
              ) : null}
            </g>
          );
        })}
      </svg>
      {figure.legende ? <p className="mt-1 text-center text-sm font-semibold text-slate-700">{figure.legende}</p> : null}
    </div>
  );
}
