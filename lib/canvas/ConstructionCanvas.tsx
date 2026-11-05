// lib/canvas/ConstructionCanvas.tsx
"use client";

import type { CanvasFigure } from "@/lib/tutor-v4/types";

// LA FIGURE DE GÉOMÉTRIE TRACÉE (05/11/2026) : points, segments codés, droites,
// cercles, arcs, angles, polygones remplis. Les coordonnées sont des coordonnées de
// mathématiques (y vers le haut), le cadre s'ajuste tout seul, et chaque nom se pose
// là où il touche le moins de traits : il cherche sa place, on ne la lui donne pas.

const TRAIT = "#0f172a";
const BLEU = "#2563eb";
const FOND_DEFAUT = "rgba(37, 99, 235, 0.10)";

type Pt = { x: number; y: number };
const sous = (a: Pt, b: Pt) => ({ x: a.x - b.x, y: a.y - b.y });
const norme = (a: Pt) => Math.hypot(a.x, a.y);
const unitaire = (a: Pt) => {
  const n = norme(a) || 1;
  return { x: a.x / n, y: a.y / n };
};

function distanceSegment(p: Pt, a: Pt, b: Pt) {
  const d = sous(b, a);
  const l2 = d.x * d.x + d.y * d.y || 1;
  const t = Math.max(0, Math.min(1, ((p.x - a.x) * d.x + (p.y - a.y) * d.y) / l2));
  return norme(sous(p, { x: a.x + t * d.x, y: a.y + t * d.y }));
}

export default function ConstructionCanvas({ figure }: { figure: CanvasFigure }) {
  if (figure.kind !== "construction") return null;

  const W = figure.largeur ?? 320;
  const HMAX = figure.hauteurMax ?? 270;
  const M = 30;

  // Le cadre : les points et les cercles entiers.
  const xs: number[] = [];
  const ys: number[] = [];
  const parId = new Map(figure.points.map((p) => [p.id, p]));
  for (const p of figure.points) {
    xs.push(p.x);
    ys.push(p.y);
  }
  for (const c of figure.cercles ?? []) {
    const o = parId.get(c.centre);
    if (!o) continue;
    xs.push(o.x - c.rayon, o.x + c.rayon);
    ys.push(o.y - c.rayon, o.y + c.rayon);
  }
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const s = Math.min((W - 2 * M) / Math.max(maxX - minX, 1e-6), (HMAX - 2 * M) / Math.max(maxY - minY, 1e-6));
  const H = (maxY - minY) * s + 2 * M;
  const dx = (W - (maxX - minX) * s) / 2;
  const ecran = (p: Pt): Pt => ({ x: dx + (p.x - minX) * s, y: M + (maxY - p.y) * s });
  const pos = (id: string): Pt => {
    const p = parId.get(id);
    return p ? ecran(p) : { x: 0, y: 0 };
  };

  // Ce qu'un nom doit éviter : tout ce qui est tracé.
  const traits: [Pt, Pt][] = [];
  for (const g of figure.polygones ?? []) g.sommets.forEach((id, i) => traits.push([pos(id), pos(g.sommets[(i + 1) % g.sommets.length])]));
  for (const g of figure.segments ?? []) traits.push([pos(g.a), pos(g.b)]);

  /** Les droites vont jusqu'au bord du cadre. */
  const prolonger = (a: Pt, b: Pt): [Pt, Pt] => {
    const u = unitaire(sous(b, a));
    const L = W + H;
    const depart = { x: a.x - u.x * L, y: a.y - u.y * L };
    const dans: Pt[] = [];
    for (let t = 0; t <= 800; t++) {
      const q = { x: depart.x + (u.x * 2 * L * t) / 800, y: depart.y + (u.y * 2 * L * t) / 800 };
      if (q.x >= 6 && q.x <= W - 6 && q.y >= 6 && q.y <= H - 6) dans.push(q);
    }
    return dans.length >= 2 ? [dans[0], dans[dans.length - 1]] : [a, b];
  };
  const droites = (figure.droites ?? []).map((d) => ({ ...d, bouts: prolonger(pos(d.a), pos(d.b)) }));
  for (const d of droites) traits.push(d.bouts);
  const cerclesEcran = (figure.cercles ?? []).map((c) => ({ ...c, o: pos(c.centre), r: c.rayon * s }));

  const place: { p: Pt; r: number }[] = [];
  const degagement = (q: Pt, rayon: number) => {
    let d = Infinity;
    for (const [a, b] of traits) d = Math.min(d, distanceSegment(q, a, b));
    for (const c of cerclesEcran) d = Math.min(d, Math.abs(norme(sous(q, c.o)) - c.r));
    for (const l of place) d = Math.min(d, norme(sous(q, l.p)) - l.r);
    return d - rayon;
  };
  const centre = ecran({ x: (minX + maxX) / 2, y: (minY + maxY) / 2 });
  const chercher = (autour: Pt, loin: number, rayon: number, demiHaut = rayon, normale?: Pt) => {
    let mieux = { x: autour.x, y: autour.y + loin };
    let note = -Infinity;
    for (let k = 0; k < 24; k++) {
      const q = { x: autour.x + loin * Math.cos((k * Math.PI) / 12), y: autour.y + loin * Math.sin((k * Math.PI) / 12) };
      if (q.x < rayon || q.x > W - rayon || q.y < demiHaut || q.y > H - demiHaut) continue;
      // Un nom sort de la figure quand il le peut : à dégagement égal, le plus loin du centre.
      // Une légende reste en face du milieu de son segment, sur la perpendiculaire.
      const enFace = normale ? Math.abs((q.x - autour.x) * normale.x + (q.y - autour.y) * normale.y) * 0.05 : 0;
      const n = Math.min(degagement(q, rayon), 5) + norme(sous(q, centre)) * 0.01 + enFace;
      if (n > note) {
        note = n;
        mieux = q;
      }
    }
    place.push({ p: mieux, r: rayon });
    return mieux;
  };

  // Les angles d'abord : leur secteur occupe la place avant les noms.
  const angles = (figure.angles ?? []).map((a) => {
    const o = pos(a.sommet);
    const u = unitaire(sous(pos(a.de), o));
    const v = unitaire(sous(pos(a.vers), o));
    const r = a.rayon ?? 22;
    const biss = unitaire({ x: u.x + v.x, y: u.y + v.y });
    const balayage = u.x * v.y - u.y * v.x > 0 ? 1 : 0;
    const loin = r + (a.rayonTexte ?? 15);
    const texte = a.texte ? { x: o.x + biss.x * loin, y: o.y + biss.y * loin } : null;
    place.push({ p: { x: o.x + (biss.x * r) / 2, y: o.y + (biss.y * r) / 2 }, r: a.droit ? 7 : r / 2 });
    if (texte) place.push({ p: texte, r: 7 + String(a.texte).length * 3 });
    return { a, o, u, v, r, biss, balayage, texte };
  });

  // Puis les noms des points, prioritaires sur les légendes.
  const visibles = figure.points.filter((p) => !p.cache).map((p) => ({ p, c: ecran(p) }));
  for (const { c } of visibles) place.push({ p: c, r: 4 });
  const noms = visibles.map(({ p, c }) => ({ p, c, q: chercher(c, 15, 8) }));

  const halo = { paintOrder: "stroke" as const, stroke: "#ffffff", strokeWidth: 3.5, strokeLinejoin: "round" as const };

  const legendes = (figure.segments ?? [])
    .filter((g) => g.texte)
    .map((g) => {
      const a = pos(g.a);
      const b = pos(g.b);
      const m = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
      const larg = Math.max(10, String(g.texte).length * 3.7);
      const t = unitaire(sous(b, a));
      return { g, q: chercher(m, larg + 6, larg, 9, { x: -t.y, y: t.x }) };
    });

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      style={{ maxWidth: W, display: "block", margin: "0 auto" }}
      role="img"
      aria-label={figure.description ?? "Une figure de géométrie"}
    >
      {cerclesEcran
        .filter((c) => c.fond)
        .map((c, i) => (
          <circle key={`cf${i}`} cx={c.o.x} cy={c.o.y} r={c.r} fill={c.fond} stroke="none" />
        ))}
      {(figure.polygones ?? []).map((g, i) => (
        <polygon
          key={`p${i}`}
          points={g.sommets
            .map((id) => {
              const q = pos(id);
              return `${q.x},${q.y}`;
            })
            .join(" ")}
          fill={g.fond === undefined ? FOND_DEFAUT : g.fond}
          stroke={g.contour ?? TRAIT}
          strokeWidth={2}
          strokeLinejoin="round"
        />
      ))}
      {cerclesEcran.map((c, i) => (
        <circle key={`c${i}`} cx={c.o.x} cy={c.o.y} r={c.r} fill="none" stroke={c.couleur ?? TRAIT} strokeWidth={2} strokeDasharray={c.pointille ? "6 5" : undefined} />
      ))}
      {(figure.arcs ?? []).map((g, i) => {
        const o = pos(g.centre);
        const a = pos(g.de);
        const b = pos(g.vers);
        const r = norme(sous(a, o));
        const tour = (x: number) => ((x % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
        const va = Math.atan2(a.y - o.y, a.x - o.x);
        const vb = Math.atan2(b.y - o.y, b.x - o.x);
        // Sur l'écran, le balayage 1 fait croître l'angle atan2.
        const direct = tour(vb - va);
        let sens = direct <= Math.PI ? 1 : 0;
        if (g.eviter) {
          const e = pos(g.eviter);
          sens = tour(Math.atan2(e.y - o.y, e.x - o.x) - va) < direct ? 0 : 1;
        }
        const longueur = sens === 1 ? direct : 2 * Math.PI - direct;
        return <path key={`a${i}`} d={`M ${a.x} ${a.y} A ${r} ${r} 0 ${longueur > Math.PI ? 1 : 0} ${sens} ${b.x} ${b.y}`} fill="none" stroke={g.couleur ?? "#dc2626"} strokeWidth={4} strokeLinecap="round" />;
      })}
      {droites.map((d, i) => (
        <line key={`d${i}`} x1={d.bouts[0].x} y1={d.bouts[0].y} x2={d.bouts[1].x} y2={d.bouts[1].y} stroke={d.couleur ?? BLEU} strokeWidth={1.8} strokeDasharray={d.pointille ? "6 5" : undefined} />
      ))}
      {(figure.segments ?? []).map((g, i) => {
        const a = pos(g.a);
        const b = pos(g.b);
        const u = unitaire(sous(b, a));
        const n = { x: -u.y, y: u.x };
        const m = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
        const c = g.couleur ?? TRAIT;
        return (
          <g key={`s${i}`}>
            {g.sansTrait ? null : <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={c} strokeWidth={g.epais ? 3 : 2} strokeLinecap="round" strokeDasharray={g.pointille ? "6 5" : undefined} />}
            {Array.from({ length: g.code ?? 0 }, (_, k) => {
              const d = (k - ((g.code ?? 1) - 1) / 2) * 5;
              const t = { x: m.x + u.x * d, y: m.y + u.y * d };
              return <line key={k} x1={t.x - n.x * 6} y1={t.y - n.y * 6} x2={t.x + n.x * 6} y2={t.y + n.y * 6} stroke={c} strokeWidth={2} />;
            })}
          </g>
        );
      })}
      {angles.map(({ a, o, u, v, r, biss, balayage, texte }, i) => {
        const c = a.couleur ?? "#dc2626";
        if (a.droit) {
          const k = 11;
          const p1 = { x: o.x + u.x * k, y: o.y + u.y * k };
          const p2 = { x: o.x + v.x * k, y: o.y + v.y * k };
          const p3 = { x: o.x + (u.x + v.x) * k, y: o.y + (u.y + v.y) * k };
          return <path key={`g${i}`} d={`M ${p1.x} ${p1.y} L ${p3.x} ${p3.y} L ${p2.x} ${p2.y}`} fill="none" stroke={c} strokeWidth={1.8} />;
        }
        const p1 = { x: o.x + u.x * r, y: o.y + u.y * r };
        const p2 = { x: o.x + v.x * r, y: o.y + v.y * r };
        const tirets = Array.from({ length: a.code ?? 0 }, (_, k) => {
          const dec = (k - ((a.code ?? 1) - 1) / 2) * 0.2;
          const co = Math.cos(dec);
          const si = Math.sin(dec);
          const d = { x: biss.x * co - biss.y * si, y: biss.x * si + biss.y * co };
          return <line key={k} x1={o.x + d.x * (r - 5)} y1={o.y + d.y * (r - 5)} x2={o.x + d.x * (r + 5)} y2={o.y + d.y * (r + 5)} stroke={c} strokeWidth={1.8} />;
        });
        return (
          <g key={`g${i}`}>
            <path d={`M ${o.x} ${o.y} L ${p1.x} ${p1.y} A ${r} ${r} 0 0 ${balayage} ${p2.x} ${p2.y} Z`} fill={c} fillOpacity={0.14} stroke="none" />
            <path d={`M ${p1.x} ${p1.y} A ${r} ${r} 0 0 ${balayage} ${p2.x} ${p2.y}`} fill="none" stroke={c} strokeWidth={1.8} />
            {tirets}
            {texte ? (
              <text x={texte.x} y={texte.y} textAnchor="middle" dominantBaseline="central" fontSize={14} fontWeight={700} fill={c} style={halo}>
                {a.texte}
              </text>
            ) : null}
          </g>
        );
      })}
      {noms.map(({ p, c, q }) => (
        <g key={p.id}>
          <circle cx={c.x} cy={c.y} r={3.2} fill={p.couleur ?? TRAIT} />
          <text x={q.x} y={q.y} textAnchor="middle" dominantBaseline="central" fontSize={15} fontWeight={700} fill={p.couleur ?? TRAIT} style={halo}>
            {p.nom ?? p.id}
          </text>
        </g>
      ))}
      {legendes.map(({ g, q }, i) => (
        <text key={`l${i}`} x={q.x} y={q.y} textAnchor="middle" dominantBaseline="central" fontSize={13} fontWeight={600} fill={g.couleur ?? TRAIT} style={halo}>
          {g.texte}
        </text>
      ))}
    </svg>
  );
}
