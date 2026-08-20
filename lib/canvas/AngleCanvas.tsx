// tutor-v4/components/AngleCanvas.tsx
"use client";

import type { CanvasFigure } from "@/lib/tutor-v4/types";

type Props = {
  figure: CanvasFigure;
};

const COULEURS = {
  angle: "#3b82f6",
  angleRight: "#ef4444",
  segment: "#0f172a",
  label: "#0f172a",
};

export default function AngleCanvas({ figure }: Props) {
  if (figure.kind !== "angle") return null;

  const width = figure.size?.width ?? 300;
  const height = figure.size?.height ?? 220;

  const angleDeg = figure.angle?.angleDeg ?? 60;

  const showLabels = figure.angle?.display?.showLabels ?? true;
  const showMeasure = figure.angle?.display?.showMeasure ?? true;
  const showArc = figure.angle?.display?.showArc ?? true;
  const showRightAngle =
    figure.angle?.display?.showRightAngle ?? angleDeg === 90;

  const placeholder = figure.angle?.display?.placeholder;

  const labels = figure.angle?.labels ?? {};

  const cx = width / 2;
  const cy = height * 0.75;
  const radius = 82;

  const angleRad = (angleDeg * Math.PI) / 180;

  const rightX = cx + radius;
  const rightY = cy;

  const leftX = cx + radius * Math.cos(-angleRad);
  const leftY = cy + radius * Math.sin(-angleRad);

  const arcRadius = 42;

  const arcStartX = cx + arcRadius;
  const arcStartY = cy;

  const arcEndX = cx + arcRadius * Math.cos(-angleRad);
  const arcEndY = cy + arcRadius * Math.sin(-angleRad);

  const labelAngle = -angleRad / 2;
  const labelX = cx + (arcRadius + 22) * Math.cos(labelAngle);
  const labelY = cy + (arcRadius + 22) * Math.sin(labelAngle);

  const angleLabel = showMeasure
    ? labels.angle ?? `${angleDeg}°`
    : placeholder;

  // ─── Le rapporteur ──────────────────────────────────────────────────────────
  // Aucun canvas ne montrait l'instrument : « centre sur le sommet, 0 sur un
  // côté, on lit sur l'autre » se racontait en trois phrases, sous trois cartes
  // sans image. Le demi-disque est gradué tous les 10°, chiffré tous les 30°, et
  // `protractorStep` allume le geste dont parle la carte.
  const showProtractor = figure.angle?.display?.showProtractor ?? false;
  const step = figure.angle?.display?.protractorStep;
  const rRapporteur = Math.min(radius + 22, height - 40, width / 2 - 12);
  const pointSur = (deg: number, r: number) => ({
    x: cx + r * Math.cos((-deg * Math.PI) / 180),
    y: cy + r * Math.sin((-deg * Math.PI) / 180),
  });

  // ─── Le cadre se serre sur le dessin ────────────────────────────────────────
  // ⛔ LE VIEWBOX NE SE FIXE PLUS À LA TAILLE DEMANDÉE (Frédéric, 20/08 : « tu
  // peux mieux utiliser l'espace », capture à l'appui). Le sommet est posé à
  // 75 % de la hauteur et les côtés partent vers le haut à droite : un angle de
  // 40° n'occupait qu'un quart de son cadre, le reste étant du blanc. Dans une
  // carte de propriété, sur trois colonnes, la figure devenait minuscule.
  //
  // On calcule donc la boîte de ce qui est RÉELLEMENT dessiné, et le viewBox
  // s'y colle. Le SVG est en `w-full h-auto` : un cadre serré, c'est un dessin
  // plus grand à largeur égale, sans toucher à aucune fiche.
  const aCouvrir: Array<{ x: number; y: number }> = [
    { x: cx, y: cy },
    { x: rightX, y: rightY },
    { x: leftX, y: leftY },
  ];
  if (showLabels) {
    aCouvrir.push({ x: cx - 16, y: cy + 24 }); // le O, sous le sommet
    aCouvrir.push({ x: rightX + 22, y: rightY + 6 }); // le B
    aCouvrir.push({ x: leftX - 14, y: leftY - 20 }); // le A
  }
  if (angleLabel && !showRightAngle) {
    const demi = String(angleLabel).length * 4.5 + 4;
    aCouvrir.push({ x: labelX - demi, y: labelY - 10 });
    aCouvrir.push({ x: labelX + demi, y: labelY + 10 });
  }
  if (showProtractor) {
    aCouvrir.push({ x: cx - rRapporteur, y: cy - rRapporteur });
    aCouvrir.push({ x: cx + rRapporteur, y: cy });
  }

  const MARGE = 12;
  const minX = Math.min(...aCouvrir.map((p) => p.x)) - MARGE;
  const maxX = Math.max(...aCouvrir.map((p) => p.x)) + MARGE;
  const minY = Math.min(...aCouvrir.map((p) => p.y)) - MARGE;
  const maxY = Math.max(...aCouvrir.map((p) => p.y)) + MARGE;
  const boiteW = maxX - minX;
  const boiteH = maxY - minY;

  return (
    <div className="mx-auto w-full max-w-[320px] rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
      <svg
        viewBox={`${minX} ${minY} ${boiteW} ${boiteH}`}
        className="block h-auto w-full"
        aria-label="Figure angle"
      >
        <rect x={minX} y={minY} width={boiteW} height={boiteH} fill="white" />

        {/* Rapporteur (posé SOUS l'angle : l'instrument est transparent) */}
        {showProtractor ? (
          <g>
            <path
              d={`M ${cx - rRapporteur} ${cy} A ${rRapporteur} ${rRapporteur} 0 0 1 ${
                cx + rRapporteur
              } ${cy} Z`}
              fill="#e0f2fe"
              fillOpacity={0.55}
              stroke="#0284c7"
              strokeWidth={1.6}
            />
            {Array.from({ length: 19 }, (_, i) => i * 10).map((deg) => {
              const majeur = deg % 30 === 0;
              const a = pointSur(deg, rRapporteur);
              const b = pointSur(deg, rRapporteur - (majeur ? 12 : 7));
              const t = pointSur(deg, rRapporteur - 24);
              const allume =
                (step === "zero" && deg === 0) ||
                (step === "reading" && deg === Math.round(angleDeg / 10) * 10);
              return (
                <g key={`grad-${deg}`}>
                  <line
                    x1={a.x}
                    y1={a.y}
                    x2={b.x}
                    y2={b.y}
                    stroke={allume ? "#dc2626" : "#0284c7"}
                    strokeWidth={allume ? 3 : majeur ? 1.6 : 1}
                  />
                  {majeur ? (
                    <text
                      x={t.x}
                      y={t.y + 4}
                      textAnchor="middle"
                      fontSize="9"
                      fontWeight="800"
                      fill={allume ? "#dc2626" : "#0369a1"}
                    >
                      {deg}
                    </text>
                  ) : null}
                </g>
              );
            })}
            {/* Le repère central de l'instrument, celui qu'on pose sur le sommet */}
            <circle
              cx={cx}
              cy={cy}
              r={step === "vertex" ? 9 : 5}
              fill="none"
              stroke={step === "vertex" ? "#dc2626" : "#0284c7"}
              strokeWidth={step === "vertex" ? 3 : 1.6}
            />
            <line
              x1={cx - 10}
              y1={cy}
              x2={cx + 10}
              y2={cy}
              stroke={step === "vertex" ? "#dc2626" : "#0284c7"}
              strokeWidth={1.6}
            />
          </g>
        ) : null}

        {/* Côtés de l'angle */}
        <line
          x1={cx}
          y1={cy}
          x2={rightX}
          y2={rightY}
          stroke={step === "zero" ? "#dc2626" : COULEURS.segment}
          strokeWidth={step === "zero" ? 4.5 : 3}
          strokeLinecap="round"
        />
        <line
          x1={cx}
          y1={cy}
          x2={leftX}
          y2={leftY}
          stroke={step === "reading" ? "#dc2626" : COULEURS.segment}
          strokeWidth={step === "reading" ? 4.5 : 3}
          strokeLinecap="round"
        />

        {/* Arc coloré */}
        {showArc && !showRightAngle ? (
          <path
            d={`M ${arcStartX} ${arcStartY} A ${arcRadius} ${arcRadius} 0 ${
              angleDeg > 180 ? 1 : 0
            } 0 ${arcEndX} ${arcEndY}`}
            fill="none"
            stroke={COULEURS.angle}
            strokeWidth={4}
            strokeLinecap="round"
          />
        ) : null}

        {/* Angle droit */}
        {showRightAngle ? (
          <path
            d={`M ${cx + 24} ${cy} L ${cx + 24} ${cy - 24} L ${cx} ${
              cy - 24
            }`}
            fill="none"
            stroke={COULEURS.angleRight}
            strokeWidth={4}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : null}

        {/* Sommet */}
        <circle cx={cx} cy={cy} r={4.5} fill={COULEURS.segment} />

        {/* Labels des points */}
        {showLabels ? (
          <>
            <text
              x={cx - 14}
              y={cy + 22}
              fontSize="16"
              fontWeight="900"
              fill={COULEURS.label}
              stroke="white"
              strokeWidth="2"
              paintOrder="stroke"
            >
              {labels.vertex ?? "O"}
            </text>

            <text
              x={rightX + 8}
              y={rightY + 5}
              fontSize="16"
              fontWeight="900"
              fill={COULEURS.label}
              stroke="white"
              strokeWidth="2"
              paintOrder="stroke"
            >
              {labels.right ?? "B"}
            </text>

            <text
              x={leftX - 12}
              y={leftY - 8}
              fontSize="16"
              fontWeight="900"
              fill={COULEURS.label}
              stroke="white"
              strokeWidth="2"
              paintOrder="stroke"
            >
              {labels.left ?? "A"}
            </text>
          </>
        ) : null}

        {/* Mesure ou placeholder */}
        {angleLabel && !showRightAngle ? (
          <text
            x={labelX}
            y={labelY}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="15"
            fontWeight="900"
            fill={COULEURS.angle}
            stroke="white"
            strokeWidth="3"
            paintOrder="stroke"
          >
            {angleLabel}
          </text>
        ) : null}
      </svg>
    </div>
  );
}