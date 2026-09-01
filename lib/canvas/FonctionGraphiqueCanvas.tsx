// tutor-v4/components/FonctionGraphiqueCanvas.tsx
"use client";

import type { FonctionGraphiqueCanvasData } from "@/lib/tutor-v4/types";

type Props = {
  figure: FonctionGraphiqueCanvasData;
};

type Point = { x: number; y: number };
type CourbeFonction = NonNullable<FonctionGraphiqueCanvasData["courbes"]>[number];

const COULEUR_AXES = "#0f172a";
const COULEUR_GRILLE = "#cbd5e1";
const COULEUR_COURBE = "#2563eb";
const COULEUR_POINT = "#dc2626";
const COULEUR_VERTICALE = "#f97316";
const COULEUR_HORIZONTALE = "#7c3aed";

function toSvgX(x: number, xmin: number, xmax: number, width: number) {
  return ((x - xmin) / (xmax - xmin)) * width;
}

function toSvgY(y: number, ymin: number, ymax: number, height: number) {
  return height - ((y - ymin) / (ymax - ymin)) * height;
}

function formatNumber(n: number) {
  return Number.isInteger(n) ? String(n) : n.toFixed(1);
}

export default function FonctionGraphiqueCanvas({ figure }: Props) {
  if (figure.kind !== "fonctionGraphique") return null;

  const width = figure.size?.width ?? 320;
  const height = figure.size?.height ?? 260;

  const xmin = figure.xmin;
  const xmax = figure.xmax;
  const ymin = figure.ymin;
  const ymax = figure.ymax;

  const courbes = figure.courbes ?? [];
  const points = figure.points ?? [];
  const misesEnEvidence = figure.misesEnEvidence ?? [];

  const xAxisY = ymin <= 0 && ymax >= 0 ? toSvgY(0, ymin, ymax, height) : height;
  const yAxisX = xmin <= 0 && xmax >= 0 ? toSvgX(0, xmin, xmax, width) : 0;

  function pointToSvg(p: Point) {
    return {
      x: toSvgX(p.x, xmin, xmax, width),
      y: toSvgY(p.y, ymin, ymax, height),
    };
  }

  function computeY(courbe: CourbeFonction, x: number) {
    if (courbe.type === "lineaire") return (courbe.a ?? 1) * x;
    if (courbe.type === "affine") return (courbe.a ?? 1) * x + (courbe.b ?? 0);
    if (courbe.type === "quadratique") {
      return (courbe.a ?? 1) * x * x + (courbe.b ?? 0) * x + (courbe.c ?? 0);
    }
    return null;
}

  function pathForCourbe(courbe: NonNullable<typeof figure.courbes>[number]) {
    if (courbe.type === "points") {
      const pts = courbe.points ?? [];
      return pts
        .map((p, index) => {
          const s = pointToSvg(p);
          return `${index === 0 ? "M" : "L"} ${s.x} ${s.y}`;
        })
        .join(" ");
    }

    const steps = 120;
    const parts: string[] = [];

    for (let i = 0; i <= steps; i++) {
      const x = xmin + ((xmax - xmin) * i) / steps;
      const y = computeY(courbe, x);

      if (y === null || y < ymin - 1 || y > ymax + 1) continue;

      const s = pointToSvg({ x, y });
      parts.push(`${parts.length === 0 ? "M" : "L"} ${s.x} ${s.y}`);
    }

    return parts.join(" ");
  }

  return (
    <div className="mx-auto w-full max-w-[360px] rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
      {figure.titre ? (
        <div className="mb-2 text-center text-sm font-black text-slate-800">
          {figure.titre}
        </div>
      ) : null}

      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="block h-auto w-full"
        aria-label="Graphique de fonction"
      >
        {figure.grille !== false &&
          Array.from({ length: xmax - xmin + 1 }, (_, i) => xmin + i).map((x) => {
            const sx = toSvgX(x, xmin, xmax, width);
            return (
              <line
                key={`gx-${x}`}
                x1={sx}
                y1={0}
                x2={sx}
                y2={height}
                stroke={COULEUR_GRILLE}
                strokeWidth={0.8}
              />
            );
          })}

        {figure.grille !== false &&
          Array.from({ length: ymax - ymin + 1 }, (_, i) => ymin + i).map((y) => {
            const sy = toSvgY(y, ymin, ymax, height);
            return (
              <line
                key={`gy-${y}`}
                x1={0}
                y1={sy}
                x2={width}
                y2={sy}
                stroke={COULEUR_GRILLE}
                strokeWidth={0.8}
              />
            );
          })}

        <line x1={0} y1={xAxisY} x2={width} y2={xAxisY} stroke={COULEUR_AXES} strokeWidth={2.2} />
        <line x1={yAxisX} y1={0} x2={yAxisX} y2={height} stroke={COULEUR_AXES} strokeWidth={2.2} />

        {/*
          ⛔⛔ LES GRADUATIONS ÉTAIENT EN 10 px — CORRIGÉ LE 01/09/2026.
          Le plancher de lisibilité mesuré sur téléphone de 375 px est de
          11 px, et le `viewBox` de ce canvas vaut son champ `size` : réduire
          la largeur ne rétrécissait pas davantage les chiffres, mais ne les
          agrandissait pas non plus. Le défaut était donc DANS le canvas, et
          il interdisait de l'employer dans une fiche — une fiche de fonctions
          affines sans droite, ce qui n'avait aucun sens.
          C'est le même remède que pour `solide_3d` le 24/08 : on monte la
          police au lieu d'éviter le canvas.

          ⚠️ MAIS MONTER LA POLICE SEULE AURAIT FAIT CHEVAUCHER LES GRANDES
          PLAGES. Ce canvas étiquette CHAQUE entier : sur −8..8 dans une carte
          de 222 px, cela fait 17 étiquettes à 13,9 px d'intervalle, pour des
          libellés comme « −8 » qui en mesurent 14. D'où le PAS ADAPTATIF :
          on n'écrit un chiffre que s'il reste au moins 22 px depuis le
          précédent, sinon on saute. Les traits de graduation, eux, restent
          tous tracés — c'est le CHIFFRE qui s'espace, pas la graduation.
        */}
        {(() => {
          const nbX = xmax - xmin + 1;
          const ecartX = width / Math.max(1, nbX - 1);
          const pasX = Math.max(1, Math.ceil(22 / ecartX));
          return Array.from({ length: nbX }, (_, i) => xmin + i)
            .filter((x) => x === 0 || (x - xmin) % pasX === 0)
            .map((x) => {
              const sx = toSvgX(x, xmin, xmax, width);
              // ⚠️ L'ÉTIQUETTE EST CENTRÉE SUR SA VALEUR, et `toSvgX` envoie
              // `xmin` sur 0 et `xmax` sur `width` : aux deux extrémités, la
              // moitié du chiffre sortait du viewBox. Mesuré le 01/09/2026 —
              // quatre graduations débordaient sur la fiche des fonctions
              // affines. On les ramène dans le cadre plutôt que de les
              // supprimer : un axe sans ses bornes se lit mal.
              const marge = 10;
              // Le « 0 » est centré sur l'origine, donc TRAVERSÉ par l'axe
              // vertical, qui lui barre le ventre. On le décale de quelques
              // pixels vers la droite : la place à gauche est prise par la
              // colonne des ordonnées.
              const decalZero = x === 0 ? 8 : 0;
              const sxClamp =
                Math.min(width - marge, Math.max(marge, sx)) + decalZero;
              return (
                <text key={`tx-${x}`} x={sxClamp} y={xAxisY + 17} textAnchor="middle" fontSize="12" fill="#334155">
                  {x !== 0 ? formatNumber(x) : "0"}
                </text>
              );
            });
        })()}

        {(() => {
          const nbY = ymax - ymin + 1;
          const ecartY = height / Math.max(1, nbY - 1);
          const pasY = Math.max(1, Math.ceil(16 / ecartY));
          return Array.from({ length: nbY }, (_, i) => ymin + i)
            .filter((y) => y !== 0 && (y - ymin) % pasY === 0)
            .map((y) => {
              const sy = toSvgY(y, ymin, ymax, height);
              // ⛔⛔ LE « −1 » DE L'AXE VERTICAL SE LISAIT COMME UNE ABSCISSE —
              // corrigé le 01/09/2026, sur signalement de Frédéric. L'axe
              // horizontal semblait porter « −2  −1  −1  0  1  2 » : le second
              // « −1 » était l'ordonnée.
              //
              // ⚠️ ET LE CONTRÔLE AUTOMATIQUE DISAIT « AUCUN CHEVAUCHEMENT ».
              // Il ne mentait pas — les boites ne se touchaient pas — mais il
              // répondait à la mauvaise question. La gêne ne vient PAS d'un
              // recouvrement : elle vient de ce que les deux étiquettes sont
              // sur LA MÊME RANGÉE. Les ordonnées étaient écrites en `sy − 4`,
              // ce qui place le « −1 » (un cran sous l'axe, ~22 px) en
              // `xAxisY + 18` — quand les abscisses sont en `xAxisY + 17`. Un
              // pixel d'écart : l'œil lit une seule ligne de chiffres.
              //
              // DEUX CORRECTIONS, ET IL FALLAIT LES DEUX :
              // ⭐ 1. À GAUCHE de l'axe, alignées à droite — la convention des
              //    manuels. Seule, elle ne suffisait pas : le « −1 » restait
              //    dans la rangée des abscisses, simplement de l'autre côté.
              // ⭐ 2. CENTRÉES SUR LEUR GRADUATION (`dominantBaseline`), et non
              //    posées 4 px au-dessus. Le « −1 » descend alors à
              //    `xAxisY + 25` tandis que les abscisses culminent vers
              //    `xAxisY + 17` : deux rangées distinctes, et le regard suit
              //    enfin une colonne verticale au lieu d'une ligne.
              //
              // ⚠️ Sauf quand l'axe vertical est collé au bord gauche — cas
              // `xmin = 0`, fréquent dans les banques : il n'y a alors pas la
              // place à gauche, et on revient à droite.
              const placeAGauche = yAxisX > 26;
              // Centrer sur la graduation sortirait la moitié du chiffre du
              // cadre aux deux extrémités, exactement comme pour les abscisses.
              const syClamp = Math.min(height - 7, Math.max(7, sy));
              return (
                <text
                  key={`ty-${y}`}
                  x={placeAGauche ? yAxisX - 6 : yAxisX + 6}
                  y={syClamp}
                  textAnchor={placeAGauche ? "end" : "start"}
                  dominantBaseline="central"
                  fontSize="12"
                  fill="#334155"
                >
                  {formatNumber(y)}
                </text>
              );
            });
        })()}

        {courbes.map((courbe) => (
          <path
            key={courbe.id}
            d={pathForCourbe(courbe)}
            fill="none"
            stroke={courbe.couleur ?? COULEUR_COURBE}
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}

        {misesEnEvidence.map((m, index) => {
          const elements = [];

          if (m.verticale) {
            const sx = toSvgX(m.verticale.x, xmin, xmax, width);
            elements.push(
              <line
                key={`v-${index}`}
                x1={sx}
                y1={0}
                x2={sx}
                y2={height}
                stroke={m.verticale.couleur ?? COULEUR_VERTICALE}
                strokeWidth={2}
                strokeDasharray="6 5"
              />
            );
          }

          if (m.horizontale) {
            const sy = toSvgY(m.horizontale.y, ymin, ymax, height);
            elements.push(
              <line
                key={`h-${index}`}
                x1={0}
                y1={sy}
                x2={width}
                y2={sy}
                stroke={m.horizontale.couleur ?? COULEUR_HORIZONTALE}
                strokeWidth={2}
                strokeDasharray="6 5"
              />
            );
          }

          if (m.point) {
            const s = pointToSvg(m.point);
            elements.push(
              <g key={`p-${index}`}>
                <circle cx={s.x} cy={s.y} r={5} fill={m.point.couleur ?? COULEUR_POINT} />
                {m.point.label ? (
                  <text
                    x={s.x + 8}
                    y={s.y - 8}
                    fontSize="13"
                    fontWeight="900"
                    fill={m.point.couleur ?? COULEUR_POINT}
                    stroke="white"
                    strokeWidth="2"
                    paintOrder="stroke"
                  >
                    {m.point.label}
                  </text>
                ) : null}
              </g>
            );
          }

          return <g key={`mise-${index}`}>{elements}</g>;
        })}

        {points.map((p, index) => {
          const s = pointToSvg(p);
          return (
            <g key={`pt-${index}`}>
              <circle cx={s.x} cy={s.y} r={4.5} fill={p.couleur ?? COULEUR_POINT} />
              {p.label ? (
                <text
                  x={s.x + 7}
                  y={s.y - 7}
                  fontSize="12"
                  fontWeight="900"
                  fill={p.couleur ?? COULEUR_POINT}
                  stroke="white"
                  strokeWidth="2"
                  paintOrder="stroke"
                >
                  {p.label}
                </text>
              ) : null}
            </g>
          );
        })}
      </svg>
    </div>
  );
}