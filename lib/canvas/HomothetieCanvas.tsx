// tutor-v4/components/HomothetieCanvas.tsx
"use client";

import type { CanvasFigure, HomothetieCanvasData } from "@/lib/tutor-v4/types";

// ─── Pourquoi ce canvas existe ──────────────────────────────────────────────
//
// ⛔⛔ L'HOMOTHÉTIE N'AVAIT JAMAIS ÉTÉ DESSINÉE. `TransformationCanvas` accepte
// `transformation: "homothetie"` depuis toujours : il en écrit le nom en titre,
// pose un point orange au centre, trace les deux figures — et s'arrête là. Or
// ce qu'il faut VOIR dans une homothétie, ce sont les droites issues de O : que
// A, O et A' soient alignés, et que le même rapport revienne sur chacune. Sans
// elles, l'élève regarde deux triangles et un point, et la figure ne prouve
// rien. Le catalogue le disait déjà, ligne 44 : « transformation — ⛔ pas pour
// un agrandissement ».
//
// ⭐ L'IMAGE EST CALCULÉE, JAMAIS SAISIE. C'est la décision de conception qui
// compte ici. La banque donne le centre, le rapport et la figure de départ ;
// l'image s'en déduit par A' = O + k·(A − O). Une image saisie à la main
// pourrait contredire le rapport annoncé — et un dessin qui ment est pire que
// pas de dessin, parce qu'on le croit. C'est exactement ce qui a rendu
// possibles les 24 questions de 3e qui affichaient leur réponse : la figure
// et l'énoncé étaient deux sources de vérité au lieu d'une.
//
// ⚠️ LE TITRE DONNE LA RÉPONSE, ET C'EST VOULU — MAIS PAS PARTOUT. `showInfo`
// écrit « Homothétie — k = 2 » au-dessus du dessin. Dans une fiche, c'est ce
// qu'on veut. Dans le coach, dès que la question porte sur la nature ou sur le
// rapport, il faut le mettre à `false`, sous peine de répéter le bug de
// `showSectionName`. Le défaut est donc `false` ici, à l'inverse de
// `TransformationCanvas` : mieux vaut une fiche qui oublie son titre qu'une
// question qui affiche sa réponse.

type Props = {
  figure: CanvasFigure;
};

type Point = { x: number; y: number };

const COULEUR_SOURCE = "#2563eb";
const COULEUR_IMAGE = "#dc2626";
const COULEUR_CENTRE = "#f97316";
const COULEUR_RAYON = "#94a3b8";
const COULEUR_GRILLE = "#e2e8f0";

function estHomothetie(figure: CanvasFigure): figure is HomothetieCanvasData {
  return figure.kind === "homothetie";
}

function formatRapport(k: number) {
  return Number.isInteger(k) ? String(k) : String(k).replace(".", ",");
}

export default function HomothetieCanvas({ figure }: Props) {
  if (!estHomothetie(figure)) return null;

  const cellSize = figure.size?.cellSize ?? 26;
  const padding = figure.size?.padding ?? 18;
  const cols = figure.grid?.cols ?? 10;
  const rows = figure.grid?.rows ?? 10;

  const width = figure.size?.width ?? cols * cellSize + padding * 2;
  const height = figure.size?.height ?? rows * cellSize + padding * 2;

  const showGrid = figure.display?.showGrid ?? true;
  const showRayons = figure.display?.showRayons ?? true;
  const showLabels = figure.display?.showLabels ?? true;
  const showInfo = figure.display?.showInfo ?? false;

  const k = figure.rapport;
  const O = figure.centre;

  // A' = O + k·(A − O). Toute la notion tient dans cette ligne.
  const image = figure.source.points.map((p) => ({
    x: O.x + k * (p.x - O.x),
    y: O.y + k * (p.y - O.y),
    label: p.label ? `${p.label}'` : undefined,
  }));

  const versSvg = (p: Point): Point => ({
    x: padding + p.x * cellSize,
    y: padding + p.y * cellSize,
  });

  const svgO = versSvg(O);
  const svgSource = figure.source.points.map(versSvg);
  const svgImage = image.map(versSvg);

  const enPolygone = (pts: Point[]) => pts.map((p) => `${p.x},${p.y}`).join(" ");

  // ⚠️ UNE ÉTIQUETTE POSÉE EN HAUT À DROITE DU POINT SORT DU CADRE dès que le
  // point touche un bord — et un point d'image touche souvent le bord, c'est
  // même le signe qu'on a bien rempli le quadrillage. Mesuré sur la fiche de
  // 3e : « B' » débordait de 7 px. L'étiquette bascule donc du côté où il
  // reste de la place, plutôt que d'être rognée ou déplacée arbitrairement.
  const posePourEtiquette = (p: Point) => {
    const aDroite = p.x < width - 22;
    return {
      x: aDroite ? p.x + 7 : p.x - 7,
      y: p.y > 20 ? p.y - 6 : p.y + 16,
      anchor: aDroite ? ("start" as const) : ("end" as const),
    };
  };

  // Le rayon est PROLONGÉ au-delà du point le plus éloigné, jusqu'au bord du
  // cadre : une droite qui s'arrête pile sur l'image ressemble à un segment de
  // construction, pas à la droite (OA) qu'on demande de tracer.
  function boutDuRayon(p: Point): Point {
    const dx = p.x - svgO.x;
    const dy = p.y - svgO.y;
    if (dx === 0 && dy === 0) return p;
    // On cherche le plus grand t tel que O + t·(p − O) reste dans le cadre.
    const ts: number[] = [];
    if (dx > 0) ts.push((width - svgO.x) / dx);
    if (dx < 0) ts.push((0 - svgO.x) / dx);
    if (dy > 0) ts.push((height - svgO.y) / dy);
    if (dy < 0) ts.push((0 - svgO.y) / dy);
    const t = Math.min(...ts);
    return { x: svgO.x + t * dx, y: svgO.y + t * dy };
  }

  const couleurSource = figure.source.color ?? COULEUR_SOURCE;
  const couleurImage = figure.image?.color ?? COULEUR_IMAGE;

  return (
    // ⚠️ 340 px, la même borne que `solide_3d` et `section_solide` : au-delà,
    // le dessin est rétréci par la carte qui l'accueille et la police descend
    // sous le plancher de 11 px mesuré sur un téléphone de 375 px.
    <div className="mx-auto w-full max-w-[340px] rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
      {showInfo ? (
        <div className="mb-2 text-center text-sm font-black text-slate-800">
          Homothétie — k = {formatRapport(k)}
        </div>
      ) : null}

      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="block h-auto w-full"
        aria-label="Homothétie"
      >
        <rect x={0} y={0} width={width} height={height} rx={10} fill="white" />

        {showGrid
          ? [
              ...Array.from({ length: rows + 1 }, (_, r) => (
                <line
                  key={`gh-${r}`}
                  x1={padding}
                  y1={padding + r * cellSize}
                  x2={padding + cols * cellSize}
                  y2={padding + r * cellSize}
                  stroke={COULEUR_GRILLE}
                  strokeWidth={1}
                />
              )),
              ...Array.from({ length: cols + 1 }, (_, c) => (
                <line
                  key={`gv-${c}`}
                  x1={padding + c * cellSize}
                  y1={padding}
                  x2={padding + c * cellSize}
                  y2={padding + rows * cellSize}
                  stroke={COULEUR_GRILLE}
                  strokeWidth={1}
                />
              )),
            ]
          : null}

        {/* LES DROITES ISSUES DE O — c'est pour elles que ce canvas existe. */}
        {showRayons
          ? svgSource.map((p, i) => {
              const bout = boutDuRayon(k < 0 ? svgImage[i] : p);
              const autre = boutDuRayon(k < 0 ? p : svgImage[i]);
              return (
                <g key={`rayon-${i}`}>
                  <line
                    x1={bout.x}
                    y1={bout.y}
                    x2={autre.x}
                    y2={autre.y}
                    stroke={COULEUR_RAYON}
                    strokeWidth={1.4}
                    strokeDasharray="5 4"
                  />
                </g>
              );
            })
          : null}

        <polygon
          points={enPolygone(svgSource)}
          fill={figure.source.fill ?? "rgba(37, 99, 235, 0.12)"}
          stroke={couleurSource}
          strokeWidth={2.4}
          strokeLinejoin="round"
        />

        <polygon
          points={enPolygone(svgImage)}
          fill={figure.image?.fill ?? "rgba(220, 38, 38, 0.10)"}
          stroke={couleurImage}
          strokeWidth={2.4}
          strokeLinejoin="round"
        />

        {svgSource.map((p, i) => (
          <circle key={`ps-${i}`} cx={p.x} cy={p.y} r={3.4} fill={couleurSource} />
        ))}
        {svgImage.map((p, i) => (
          <circle key={`pi-${i}`} cx={p.x} cy={p.y} r={3.4} fill={couleurImage} />
        ))}

        {showLabels
          ? figure.source.points.map((p, i) =>
              p.label ? (
                <text
                  key={`ls-${i}`}
                  x={posePourEtiquette(svgSource[i]).x}
                  y={posePourEtiquette(svgSource[i]).y}
                  textAnchor={posePourEtiquette(svgSource[i]).anchor}
                  fontSize="13"
                  fontWeight="900"
                  fill={couleurSource}
                  stroke="white"
                  strokeWidth="2.5"
                  paintOrder="stroke"
                >
                  {p.label}
                </text>
              ) : null
            )
          : null}

        {showLabels
          ? image.map((p, i) =>
              p.label ? (
                <text
                  key={`li-${i}`}
                  x={posePourEtiquette(svgImage[i]).x}
                  y={posePourEtiquette(svgImage[i]).y}
                  textAnchor={posePourEtiquette(svgImage[i]).anchor}
                  fontSize="13"
                  fontWeight="900"
                  fill={couleurImage}
                  stroke="white"
                  strokeWidth="2.5"
                  paintOrder="stroke"
                >
                  {p.label}
                </text>
              ) : null
            )
          : null}

        {/* LE CENTRE EN DERNIER : il passe au-dessus des droites qui en partent. */}
        <circle cx={svgO.x} cy={svgO.y} r={5} fill={COULEUR_CENTRE} />
        {/* ⚠️ LE CENTRE EST SOUVENT DANS UN COIN — c'est même la bonne place,
            parce que les droites s'ouvrent alors en éventail sur toute la
            figure. Mais une étiquette posée en haut à gauche de O sort du
            cadre. Elle bascule donc du côté où il reste de la place. */}
        {showLabels ? (
          <text
            x={svgO.x > 30 ? svgO.x - 8 : svgO.x + 9}
            y={svgO.y > 24 ? svgO.y - 9 : svgO.y + 18}
            textAnchor={svgO.x > 30 ? "end" : "start"}
            fontSize="13"
            fontWeight="900"
            fill={COULEUR_CENTRE}
            stroke="white"
            strokeWidth="2.5"
            paintOrder="stroke"
          >
            {O.label ?? "O"}
          </text>
        ) : null}
      </svg>
    </div>
  );
}
