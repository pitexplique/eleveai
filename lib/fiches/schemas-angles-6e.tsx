// ─── Dessins d'angles en SVG local, pour les fiches de cours de 6e ─────────────
// (bissectrice d'un angle, angles du triangle — 30/09/2026)
//
// ⛔ POURQUOI UN SVG LOCAL. `AngleCanvas` est en cours de modification (consigne
// du 30/09) et, de toute façon, il ne dessine qu'UN angle : il ne sait ni poser
// une bissectrice, ni coder deux angles égaux, ni mettre trois angles bout à bout.
// `droites` pose des demi-droites mais aucun arc ni aucune mesure. Or tout le
// chapitre se joue sur des ARCS et des MESURES : c'est donc ici.
//
// ⭐ LES FIGURES SONT JUSTES, PAS « À PEU PRÈS ». Chaque demi-droite est placée
// par son angle en degrés (`polaire`) : un arc marqué « 40° » ouvre vraiment 40°.
// Deux angles égaux portent le même petit trait sur leur arc (le codage de la
// classe) ; deux angles différents n'en portent pas.
//
// ⭐ LE CADRE SE SERRE SUR LE DESSIN (REGLES.md § 2 ter). On décrit la figure
// autour d'une origine quelconque ; le `viewBox` est calculé sur ce qui est
// réellement dessiné, textes compris (≈ 0,6 × la police par caractère). Le bloc
// d'un dessin mesure 226 px sur un téléphone, donc ~208 px de SVG : une police
// de 16 dans un cadre de 250 y arrive à 13 px.

import type { ReactNode } from "react";

const RAD = Math.PI / 180;

export type Pt = { x: number; y: number };

/** Le point à `r` de `o` dans la direction `deg` (en degrés, sens des aiguilles
 *  d'une montre inversé : 0° vers la droite, 90° vers le haut). */
export const polaire = (deg: number, r: number, o: Pt = { x: 0, y: 0 }): Pt => ({
  x: o.x + r * Math.cos(deg * RAD),
  y: o.y - r * Math.sin(deg * RAD),
});

export const NOIR = "#0f172a";
export const BLEU = "#2563eb";
export const ORANGE = "#d97706";
export const ROUGE = "#dc2626";
export const VERT = "#16a34a";
export const VIOLET = "#7c3aed";
export const GRIS = "#94a3b8";

export type Trait = { de: Pt; a: Pt; couleur?: string; pointille?: boolean; epaisseur?: number; fleche?: boolean };
/** Un arc d'angle de sommet `o`, de la direction `de` à la direction `a` (a > de). */
export type ArcAngle = {
  o: Pt;
  de: number;
  a: number;
  r: number;
  couleur: string;
  /** La mesure (ou le mot) écrite sur la bissectrice de l'arc. */
  texte?: string;
  rTexte?: number;
  /** Le petit trait qui code deux angles égaux. */
  code?: boolean;
  /** Colorie le secteur (un angle « plein »). */
  plein?: string;
};
export type Texte = { p: Pt; texte: string; couleur?: string; taille?: number; ancre?: "start" | "middle" | "end" };
/** Le petit carré d'angle droit en `o`, entre la direction `dir` et `dir + 90`. */
export type Coin = { o: Pt; dir: number; c?: number; couleur?: string };
/** Une flèche courbe (un pli, un geste) : arc de centre `o`, de `de` à `a`. */
export type Courbe = { o: Pt; de: number; a: number; r: number; couleur?: string };

const TAILLE = 16;

const idFleche = (couleur: string) => `fleche-6e-${couleur.replace("#", "")}`;

const arcPath = (o: Pt, de: number, a: number, r: number) => {
  const d = polaire(de, r, o);
  const f = polaire(a, r, o);
  const grand = Math.abs(a - de) > 180 ? 1 : 0;
  const sens = a > de ? 0 : 1;
  return `M ${d.x} ${d.y} A ${r} ${r} 0 ${grand} ${sens} ${f.x} ${f.y}`;
};

export function Dessin({
  titre,
  traits = [],
  arcs = [],
  textes = [],
  coins = [],
  points = [],
  courbes = [],
  polygones = [],
  marge = 6,
  largeurMax = 260,
}: {
  titre: string;
  traits?: Trait[];
  arcs?: ArcAngle[];
  textes?: Texte[];
  coins?: Coin[];
  points?: Pt[];
  courbes?: Courbe[];
  polygones?: { pts: Pt[]; fond?: string; couleur?: string }[];
  marge?: number;
  largeurMax?: number;
}) {
  // Les textes des arcs deviennent des textes ordinaires, posés sur le milieu.
  const tousTextes: Texte[] = [
    ...textes,
    ...arcs
      .filter((a) => a.texte)
      .map((a) => ({
        p: polaire((a.de + a.a) / 2, a.rTexte ?? a.r + 24, a.o),
        texte: a.texte as string,
        couleur: a.couleur,
      })),
  ];

  // ─── Le cadre, mesuré sur tout ce qui est dessiné ───────────────────────────
  const xs: number[] = [];
  const ys: number[] = [];
  const prendre = (p: Pt, dx = 3, dy = 3) => {
    xs.push(p.x - dx, p.x + dx);
    ys.push(p.y - dy, p.y + dy);
  };
  traits.forEach((t) => {
    prendre(t.de);
    prendre(t.a, t.fleche ? 8 : 3, t.fleche ? 8 : 3);
  });
  polygones.forEach((pg) => pg.pts.forEach((p) => prendre(p)));
  points.forEach((p) => prendre(p, 6, 6));
  const echantillon = (o: Pt, de: number, a: number, r: number) => {
    const pas = (a - de) / 24;
    for (let i = 0; i <= 24; i++) prendre(polaire(de + i * pas, r, o));
  };
  arcs.forEach((a) => echantillon(a.o, a.de, a.a, a.r));
  courbes.forEach((c) => echantillon(c.o, Math.min(c.de, c.a), Math.max(c.de, c.a), c.r + 6));
  tousTextes.forEach((t) => {
    const taille = t.taille ?? TAILLE;
    const large = t.texte.length * taille * 0.6;
    const g = t.ancre === "start" ? t.p.x : t.ancre === "end" ? t.p.x - large : t.p.x - large / 2;
    xs.push(g - 2, g + large + 2);
    ys.push(t.p.y - taille * 0.6, t.p.y + taille * 0.6);
  });
  const couleursFleches = [
    ...new Set([
      ...traits.filter((t) => t.fleche).map((t) => t.couleur ?? NOIR),
      ...courbes.map((c) => c.couleur ?? VIOLET),
    ]),
  ];

  const minX = Math.floor(Math.min(...xs) - marge);
  const minY = Math.floor(Math.min(...ys) - marge);
  const w = Math.ceil(Math.max(...xs) + marge - minX);
  const h = Math.ceil(Math.max(...ys) + marge - minY);

  return (
    <div
      className="mx-auto w-full rounded-xl border border-slate-200 bg-white p-2 shadow-sm"
      style={{ maxWidth: largeurMax }}
    >
      <svg viewBox={`0 0 ${w} ${h}`} className="block h-auto w-full" role="img" aria-label={titre}>
        {/* Une pointe par couleur : `context-stroke` n'est pas lu partout. */}
        <defs>
          {couleursFleches.map((c) => (
            <marker
              key={c}
              id={idFleche(c)}
              markerWidth="10"
              markerHeight="10"
              refX="7"
              refY="5"
              orient="auto"
              markerUnits="userSpaceOnUse"
            >
              <path d="M 0 0 L 10 5 L 0 10 Z" fill={c} />
            </marker>
          ))}
        </defs>
        <g transform={`translate(${-minX} ${-minY})`}>
          {arcs
            .filter((a) => a.plein)
            .map((a, i) => {
              const d = polaire(a.de, a.r, a.o);
              const f = polaire(a.a, a.r, a.o);
              const grand = a.a - a.de > 180 ? 1 : 0;
              return (
                <path
                  key={`s${i}`}
                  d={`M ${a.o.x} ${a.o.y} L ${d.x} ${d.y} A ${a.r} ${a.r} 0 ${grand} 0 ${f.x} ${f.y} Z`}
                  fill={a.plein}
                  stroke="none"
                />
              );
            })}
          {polygones.map((pg, i) => (
            <polygon
              key={`p${i}`}
              points={pg.pts.map((p) => `${p.x},${p.y}`).join(" ")}
              fill={pg.fond ?? "#f8fafc"}
              stroke={pg.couleur ?? NOIR}
              strokeWidth={2.8}
              strokeLinejoin="round"
            />
          ))}
          {traits.map((t, i) => (
            <line
              key={`t${i}`}
              x1={t.de.x}
              y1={t.de.y}
              x2={t.a.x}
              y2={t.a.y}
              stroke={t.couleur ?? NOIR}
              strokeWidth={t.epaisseur ?? 3}
              strokeLinecap="round"
              strokeDasharray={t.pointille ? "8 6" : undefined}
              markerEnd={t.fleche ? `url(#${idFleche(t.couleur ?? NOIR)})` : undefined}
            />
          ))}
          {arcs.map((a, i) => (
            <g key={`a${i}`} stroke={a.couleur} strokeWidth={3} fill="none" strokeLinecap="round">
              <path d={arcPath(a.o, a.de, a.a, a.r)} />
              {a.code ? (
                <line
                  x1={polaire((a.de + a.a) / 2, a.r - 7, a.o).x}
                  y1={polaire((a.de + a.a) / 2, a.r - 7, a.o).y}
                  x2={polaire((a.de + a.a) / 2, a.r + 7, a.o).x}
                  y2={polaire((a.de + a.a) / 2, a.r + 7, a.o).y}
                />
              ) : null}
            </g>
          ))}
          {coins.map((c, i) => {
            const t = c.c ?? 14;
            const p1 = polaire(c.dir, t, c.o);
            const p3 = polaire(c.dir + 90, t, c.o);
            const p2 = { x: p1.x + p3.x - c.o.x, y: p1.y + p3.y - c.o.y };
            return (
              <path
                key={`c${i}`}
                d={`M ${p1.x} ${p1.y} L ${p2.x} ${p2.y} L ${p3.x} ${p3.y}`}
                fill="none"
                stroke={c.couleur ?? ROUGE}
                strokeWidth={3}
                strokeLinejoin="round"
              />
            );
          })}
          {courbes.map((c, i) => (
            <path
              key={`k${i}`}
              d={arcPath(c.o, c.de, c.a, c.r)}
              fill="none"
              stroke={c.couleur ?? VIOLET}
              strokeWidth={3}
              strokeLinecap="round"
              markerEnd={`url(#${idFleche(c.couleur ?? VIOLET)})`}
            />
          ))}
          {points.map((p, i) => (
            <circle key={`o${i}`} cx={p.x} cy={p.y} r={4.5} fill={NOIR} />
          ))}
          {tousTextes.map((t, i) => (
            <text
              key={`x${i}`}
              x={t.p.x}
              y={t.p.y}
              textAnchor={t.ancre ?? "middle"}
              dominantBaseline="central"
              fontSize={t.taille ?? TAILLE}
              fontWeight="900"
              fill={t.couleur ?? NOIR}
              stroke="white"
              strokeWidth={3}
              paintOrder="stroke"
            >
              {t.texte}
            </text>
          ))}
        </g>
      </svg>
    </div>
  );
}

/** Un dessin et sa phrase, sous lui (texte en clair, sans LaTeX). */
export const legende = (dessin: ReactNode, texte: string) => (
  <div>
    {dessin}
    <p className="mt-1 text-center text-xs font-black text-slate-600">{texte}</p>
  </div>
);
