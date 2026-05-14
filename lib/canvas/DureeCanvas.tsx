// tutor-v4/components/DureeCanvas.tsx
"use client";

import type { DureeCanvasData } from "@/lib/tutor-v4/types_canvas";

type Props = {
  figure: DureeCanvasData;
};

type Point = {
  x: number;
  y: number;
};

const WATCH_PALETTES = [
  {
    face: "#fefce8",
    bezel: "#0f172a",
    hourHand: "#1d4ed8",
    minuteHand: "#ef4444",
    secondHand: "#22c55e",
    accent: "#f59e0b",
    strap: "#38bdf8",
    text: "#0f172a",
  },
  {
    face: "#ecfeff",
    bezel: "#155e75",
    hourHand: "#7c3aed",
    minuteHand: "#f97316",
    secondHand: "#22c55e",
    accent: "#eab308",
    strap: "#a7f3d0",
    text: "#0f172a",
  },
  {
    face: "#fff1f2",
    bezel: "#be123c",
    hourHand: "#0f172a",
    minuteHand: "#2563eb",
    secondHand: "#16a34a",
    accent: "#facc15",
    strap: "#fecdd3",
    text: "#0f172a",
  },
];

function normalizeHour(hour: number) {
  const h = hour % 12;
  return h < 0 ? h + 12 : h;
}

function polarToCartesian(
  cx: number,
  cy: number,
  radius: number,
  angleDeg: number
): Point {
  const angleRad = ((angleDeg - 90) * Math.PI) / 180;

  return {
    x: cx + radius * Math.cos(angleRad),
    y: cy + radius * Math.sin(angleRad),
  };
}

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

function formatTime(hour: number, minute: number) {
  return `${hour} h ${pad2(minute)}`;
}

function safeTime(time?: { hour: number; minute: number }) {
  return {
    hour: time?.hour ?? 10,
    minute: time?.minute ?? 10,
  };
}

function minutesFromTime(time: { hour: number; minute: number }) {
  return time.hour * 60 + time.minute;
}

function Clock({
  time,
  label,
  colors,
  showNumbers,
  showMinuteTicks,
  showDigital,
}: {
  time: { hour: number; minute: number };
  label?: string;
  colors: Required<NonNullable<DureeCanvasData["colors"]>>;
  showNumbers: boolean;
  showMinuteTicks: boolean;
  showDigital: boolean;
}) {
  const width = 220;
  const height = 250;

  const cx = width / 2;
  const cy = 112;
  const radius = 82;

  const hourAngle = normalizeHour(time.hour) * 30 + time.minute * 0.5;
  const minuteAngle = time.minute * 6;

  const hourEnd = polarToCartesian(cx, cy, radius * 0.5, hourAngle);
  const minuteEnd = polarToCartesian(cx, cy, radius * 0.72, minuteAngle);

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="block h-auto w-full"
      aria-label="Horloge à aiguilles"
    >
      {/* bracelet haut */}
      <rect
        x={cx - 28}
        y={4}
        width={56}
        height={42}
        rx={16}
        fill={colors.strap}
        stroke={colors.bezel}
        strokeWidth={3}
      />

      {/* bracelet bas */}
      <rect
        x={cx - 28}
        y={178}
        width={56}
        height={54}
        rx={16}
        fill={colors.strap}
        stroke={colors.bezel}
        strokeWidth={3}
      />

      {/* cadran */}
      <circle
        cx={cx}
        cy={cy}
        r={radius + 10}
        fill={colors.bezel}
      />
      <circle
        cx={cx}
        cy={cy}
        r={radius}
        fill={colors.face}
        stroke="white"
        strokeWidth={4}
      />

      {/* ticks minutes */}
      {showMinuteTicks &&
        Array.from({ length: 60 }, (_, i) => {
          const angle = i * 6;
          const outer = polarToCartesian(cx, cy, radius - 6, angle);
          const inner = polarToCartesian(
            cx,
            cy,
            i % 5 === 0 ? radius - 17 : radius - 11,
            angle
          );

          return (
            <line
              key={`tick-${i}`}
              x1={outer.x}
              y1={outer.y}
              x2={inner.x}
              y2={inner.y}
              stroke={i % 5 === 0 ? colors.bezel : "#94a3b8"}
              strokeWidth={i % 5 === 0 ? 3 : 1.4}
              strokeLinecap="round"
            />
          );
        })}

      {/* nombres */}
      {showNumbers &&
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((n) => {
          const p = polarToCartesian(cx, cy, radius - 30, n * 30);

          return (
            <text
              key={n}
              x={p.x}
              y={p.y + 5}
              textAnchor="middle"
              fontSize="15"
              fontWeight="900"
              fill={colors.text}
              stroke="white"
              strokeWidth="2"
              paintOrder="stroke"
            >
              {n}
            </text>
          );
        })}

      {/* aiguilles */}
      <line
        x1={cx}
        y1={cy}
        x2={hourEnd.x}
        y2={hourEnd.y}
        stroke={colors.hourHand}
        strokeWidth={7}
        strokeLinecap="round"
      />

      <line
        x1={cx}
        y1={cy}
        x2={minuteEnd.x}
        y2={minuteEnd.y}
        stroke={colors.minuteHand}
        strokeWidth={4.5}
        strokeLinecap="round"
      />

      <circle cx={cx} cy={cy} r={8} fill={colors.accent} stroke={colors.bezel} strokeWidth={2} />

      {/* petit repère 12 */}
      <circle cx={cx} cy={cy - radius + 16} r={5} fill={colors.accent} />

      {label ? (
        <text
          x={cx}
          y={210}
          textAnchor="middle"
          fontSize="15"
          fontWeight="900"
          fill={colors.text}
          stroke="white"
          strokeWidth="3"
          paintOrder="stroke"
        >
          {label}
        </text>
      ) : null}

      {showDigital ? (
        <g>
          <rect
            x={cx - 42}
            y={224}
            width={84}
            height={22}
            rx={8}
            fill="white"
            stroke={colors.bezel}
            strokeWidth={2}
          />
          <text
            x={cx}
            y={240}
            textAnchor="middle"
            fontSize="14"
            fontWeight="900"
            fill={colors.text}
          >
            {formatTime(time.hour, time.minute)}
          </text>
        </g>
      ) : null}
    </svg>
  );
}

function DigitalDisplay({
  text,
  label,
  colors,
}: {
  text: string;
  label?: string;
  colors: Required<NonNullable<DureeCanvasData["colors"]>>;
}) {
  return (
    <div className="mx-auto flex max-w-[280px] flex-col items-center gap-2 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      {label ? (
        <div className="text-sm font-black text-slate-700">{label}</div>
      ) : null}

      <div
        className="rounded-2xl border-4 px-6 py-3 text-3xl font-black tracking-wider shadow-inner"
        style={{
          borderColor: colors.bezel,
          backgroundColor: colors.face,
          color: colors.text,
        }}
      >
        {text}
      </div>
    </div>
  );
}

function Frise({
  frise,
  colors,
}: {
  frise: NonNullable<DureeCanvasData["frise"]>;
  colors: Required<NonNullable<DureeCanvasData["colors"]>>;
}) {
  const width = 340;
  const height = 150;

  const startX = 28;
  const endX = width - 28;
  const axisY = 70;

  const total = Math.max(
    1,
    frise.steps.reduce((sum, step) => sum + step.minutes, 0)
  );

  let currentX = startX;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="block h-auto w-full"
      aria-label="Frise de durée"
    >
      <rect x={0} y={0} width={width} height={height} rx={18} fill="white" />

      <line
        x1={startX}
        y1={axisY}
        x2={endX}
        y2={axisY}
        stroke={colors.bezel}
        strokeWidth={4}
        strokeLinecap="round"
      />

      <text
        x={startX}
        y={axisY + 34}
        textAnchor="middle"
        fontSize="13"
        fontWeight="900"
        fill={colors.text}
      >
        {frise.startLabel}
      </text>

      <text
        x={endX}
        y={axisY + 34}
        textAnchor="middle"
        fontSize="13"
        fontWeight="900"
        fill={colors.text}
      >
        {frise.endLabel}
      </text>

      {frise.steps.map((step, index) => {
        const segmentLength = ((endX - startX) * step.minutes) / total;
        const x1 = currentX;
        const x2 = currentX + segmentLength;
        const midX = (x1 + x2) / 2;

        currentX = x2;

        return (
          <g key={`${step.label}-${index}`}>
            <line
              x1={x1}
              y1={axisY}
              x2={x2}
              y2={axisY}
              stroke={step.color ?? WATCH_PALETTES[index % WATCH_PALETTES.length].minuteHand}
              strokeWidth={10}
              strokeLinecap="round"
            />

            <circle cx={x1} cy={axisY} r={6} fill={colors.bezel} />
            <circle cx={x2} cy={axisY} r={6} fill={colors.bezel} />

            <text
              x={midX}
              y={axisY - 22}
              textAnchor="middle"
              fontSize="13"
              fontWeight="900"
              fill={step.color ?? colors.minuteHand}
              stroke="white"
              strokeWidth="3"
              paintOrder="stroke"
            >
              {step.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export default function DureeCanvas({ figure }: Props) {
  if (figure.kind !== "duree") return null;

  const palette = WATCH_PALETTES[0];

  const colors = {
    face: figure.colors?.face ?? palette.face,
    bezel: figure.colors?.bezel ?? palette.bezel,
    hourHand: figure.colors?.hourHand ?? palette.hourHand,
    minuteHand: figure.colors?.minuteHand ?? palette.minuteHand,
    secondHand: figure.colors?.secondHand ?? palette.secondHand,
    accent: figure.colors?.accent ?? palette.accent,
    strap: figure.colors?.strap ?? palette.strap,
    text: figure.colors?.text ?? palette.text,
  };

  const showNumbers = figure.display?.showNumbers ?? true;
  const showMinuteTicks = figure.display?.showMinuteTicks ?? true;
  const showDigital = figure.display?.showDigital ?? false;
  const showLabels = figure.display?.showLabels ?? true;

  if (figure.variant === "digital") {
    return (
      <DigitalDisplay
        text={figure.digital?.text ?? "10 h 30"}
        label={figure.digital?.label}
        colors={colors}
      />
    );
  }

  if (figure.variant === "frise" && figure.frise) {
    return (
      <div className="mx-auto w-full max-w-[360px] rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
        {figure.title ? (
          <div className="mb-2 text-center text-sm font-black text-slate-800">
            {figure.title}
          </div>
        ) : null}

        <Frise frise={figure.frise} colors={colors} />
      </div>
    );
  }

  if (figure.variant === "double_horloge") {
    const start = safeTime(figure.start);
    const end = safeTime(figure.end);

    return (
      <div className="mx-auto w-full max-w-[420px] rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
        {figure.title ? (
          <div className="mb-2 text-center text-sm font-black text-slate-800">
            {figure.title}
          </div>
        ) : null}

        <div className="grid grid-cols-2 gap-2">
          <Clock
            time={start}
            label={showLabels ? figure.start?.label ?? "Début" : undefined}
            colors={colors}
            showNumbers={showNumbers}
            showMinuteTicks={showMinuteTicks}
            showDigital={showDigital}
          />

          <Clock
            time={end}
            label={showLabels ? figure.end?.label ?? "Fin" : undefined}
            colors={{
              ...colors,
              strap: figure.colors?.strap ?? "#fde68a",
              minuteHand: figure.colors?.minuteHand ?? "#dc2626",
              hourHand: figure.colors?.hourHand ?? "#16a34a",
            }}
            showNumbers={showNumbers}
            showMinuteTicks={showMinuteTicks}
            showDigital={showDigital}
          />
        </div>
      </div>
    );
  }

  const time = safeTime(figure.time);

  return (
    <div className="mx-auto w-full max-w-[300px] rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
      {figure.title ? (
        <div className="mb-2 text-center text-sm font-black text-slate-800">
          {figure.title}
        </div>
      ) : null}

      <Clock
        time={time}
        label={showLabels ? figure.time?.label : undefined}
        colors={colors}
        showNumbers={showNumbers}
        showMinuteTicks={showMinuteTicks}
        showDigital={showDigital}
      />
    </div>
  );
}